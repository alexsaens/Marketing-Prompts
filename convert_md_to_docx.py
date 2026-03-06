"""
Convert all AEO-Content markdown files to Word (.docx) documents,
preserving heading hierarchy, tables, bold, italic, bullet lists,
and code blocks. Output mirrors the AEO-Content folder structure.
"""

import os
import re
import zipfile
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

INPUT_DIR  = "/home/user/Marketing-Prompts/AEO-Content"
OUTPUT_DIR = "/home/user/Marketing-Prompts/AEO-Content-DOCX"
ZIP_PATH   = "/home/user/Marketing-Prompts/AEO-Content-DOCX.zip"


# ── Helpers ────────────────────────────────────────────────────────────────

def set_heading_style(para, level):
    """Apply Word built-in heading styles (Heading 1–4)."""
    style_map = {1: "Heading 1", 2: "Heading 2", 3: "Heading 3", 4: "Heading 4"}
    para.style = style_map.get(level, "Heading 4")


def add_run_with_inline(para, text):
    """Parse inline **bold**, *italic*, and `code` within a paragraph."""
    # Pattern: **bold**, *italic*, `code`
    pattern = re.compile(r'(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)')
    last = 0
    for m in pattern.finditer(text):
        # Plain text before match
        if m.start() > last:
            para.add_run(text[last:m.start()])
        if m.group(2):  # **bold**
            run = para.add_run(m.group(2))
            run.bold = True
        elif m.group(3):  # *italic*
            run = para.add_run(m.group(3))
            run.italic = True
        elif m.group(4):  # `code`
            run = para.add_run(m.group(4))
            run.font.name = "Courier New"
            run.font.size = Pt(10)
        last = m.end()
    if last < len(text):
        para.add_run(text[last:])


def shade_cell(cell, hex_color="D9E1F2"):
    """Apply background shading to a table cell."""
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_color)
    tcPr.append(shd)


def md_to_docx(md_path, docx_path):
    doc = Document()

    # Default body font
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)

    with open(md_path, encoding="utf-8") as f:
        lines = f.readlines()

    # Strip HTML comment blocks at the top (implementation notes)
    content_lines = []
    in_comment = False
    for line in lines:
        if line.strip().startswith("<!--"):
            in_comment = True
        if in_comment:
            if "-->" in line:
                in_comment = False
            continue
        content_lines.append(line)

    lines = content_lines
    i = 0

    while i < len(lines):
        raw  = lines[i].rstrip("\n")
        line = raw.strip()

        # ── Blank line ───────────────────────────────────────────────────
        if not line:
            i += 1
            continue

        # ── Horizontal rule ──────────────────────────────────────────────
        if re.match(r'^-{3,}$', line) or re.match(r'^\*{3,}$', line):
            doc.add_paragraph("─" * 60)
            i += 1
            continue

        # ── ATX headings (# ## ### ####) ────────────────────────────────
        m = re.match(r'^(#{1,4})\s+(.*)', line)
        if m:
            level = len(m.group(1))
            text  = m.group(2).strip()
            # Strip trailing hashes
            text = re.sub(r'\s+#+\s*$', '', text)
            para = doc.add_paragraph()
            set_heading_style(para, level)
            add_run_with_inline(para, text)
            i += 1
            continue

        # ── Fenced code block (``` ... ```) ──────────────────────────────
        if line.startswith("```"):
            i += 1
            code_lines = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i].rstrip("\n"))
                i += 1
            i += 1  # skip closing ```
            # Only include schema/JSON-LD blocks up to a reasonable size;
            # skip raw HTML comment blocks
            code_text = "\n".join(code_lines)
            if code_text.strip():
                para = doc.add_paragraph()
                para.style = "No Spacing"
                run = para.add_run(code_text)
                run.font.name = "Courier New"
                run.font.size = Pt(8.5)
                run.font.color.rgb = RGBColor(0x1F, 0x49, 0x7D)
            continue

        # ── Table (| col | col |) ────────────────────────────────────────
        if line.startswith("|"):
            # Collect all table rows
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1

            # Parse rows, skip separator rows (|---|---|)
            rows = []
            for tl in table_lines:
                cells = [c.strip() for c in tl.strip("|").split("|")]
                if re.match(r'^[-: ]+$', cells[0]):
                    continue
                rows.append(cells)

            if not rows:
                continue

            num_cols = max(len(r) for r in rows)
            table    = doc.add_table(rows=len(rows), cols=num_cols)
            table.style = "Table Grid"

            for r_idx, row_data in enumerate(rows):
                for c_idx, cell_text in enumerate(row_data):
                    if c_idx >= num_cols:
                        break
                    cell = table.cell(r_idx, c_idx)
                    cell.text = ""
                    para = cell.paragraphs[0]
                    add_run_with_inline(para, cell_text)
                    if r_idx == 0:
                        shade_cell(cell, "2E4057")
                        for run in para.runs:
                            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                            run.bold = True

            doc.add_paragraph()  # spacer after table
            continue

        # ── Checkbox list item (- [ ] or - [x]) ──────────────────────────
        m = re.match(r'^- \[[ x]\]\s+(.*)', line)
        if m:
            para = doc.add_paragraph(style="List Bullet")
            add_run_with_inline(para, "☐  " + m.group(1))
            i += 1
            continue

        # ── Unordered list (-, *, +) ─────────────────────────────────────
        m = re.match(r'^[-*+]\s+(.*)', line)
        if m:
            para = doc.add_paragraph(style="List Bullet")
            add_run_with_inline(para, m.group(1))
            i += 1
            continue

        # ── Ordered list ─────────────────────────────────────────────────
        m = re.match(r'^\d+\.\s+(.*)', line)
        if m:
            para = doc.add_paragraph(style="List Number")
            add_run_with_inline(para, m.group(1))
            i += 1
            continue

        # ── Blockquote ───────────────────────────────────────────────────
        m = re.match(r'^>\s*(.*)', line)
        if m:
            para = doc.add_paragraph(style="Quote") if "Quote" in [s.name for s in doc.styles] else doc.add_paragraph()
            run  = para.add_run(m.group(1))
            run.italic = True
            i += 1
            continue

        # ── Plain paragraph ──────────────────────────────────────────────
        para = doc.add_paragraph()
        add_run_with_inline(para, line)
        i += 1

    os.makedirs(os.path.dirname(docx_path), exist_ok=True)
    doc.save(docx_path)
    print(f"  ✓  {os.path.relpath(docx_path, OUTPUT_DIR)}")


# ── Main ───────────────────────────────────────────────────────────────────

def main():
    converted = []

    for root, dirs, files in os.walk(INPUT_DIR):
        dirs.sort()
        for fname in sorted(files):
            if not fname.endswith(".md"):
                continue
            md_path   = os.path.join(root, fname)
            rel       = os.path.relpath(md_path, INPUT_DIR)
            docx_name = os.path.splitext(rel)[0] + ".docx"
            docx_path = os.path.join(OUTPUT_DIR, docx_name)
            md_to_docx(md_path, docx_path)
            converted.append(docx_path)

    # Zip everything
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in converted:
            arcname = os.path.relpath(path, OUTPUT_DIR)
            zf.write(path, arcname)

    size_kb = os.path.getsize(ZIP_PATH) // 1024
    print(f"\nAll done — {len(converted)} files → {ZIP_PATH} ({size_kb} KB)")


if __name__ == "__main__":
    main()
