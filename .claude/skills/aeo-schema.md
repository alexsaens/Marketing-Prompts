# AEO Schema Markup Skill

## Description
Generate structured data (Schema.org JSON-LD) optimized for AI answer engine extraction. Produces schema markup that helps AI platforms understand, extract, and cite content accurately.

## Trigger
User invokes `/aeo-schema` followed by content, a URL, or a topic description.

## Why Schema Matters for AEO
- Only ~12% of websites implement schema markup — early-mover advantage is significant
- AI engines use structured data to verify facts, attribute sources, and build entity graphs
- FAQPage schema content gets directly extracted into AI answers
- Organization schema with `sameAs` links helps AI connect brand entities across platforms

## Schema Types for AEO (Priority Order)

### 1. FAQPage Schema
**Use when**: Content contains Q&A pairs, "frequently asked questions," or question-format headings.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Direct, concise answer — 40-80 words ideal]"
      }
    }
  ]
}
```

**AEO tips**:
- Extract the strongest 5-8 questions from the content
- Answers should be self-contained (make sense without reading the full page)
- Include specific data points in answers when available
- Mirror the exact phrasing users would ask AI chatbots

### 2. HowTo Schema
**Use when**: Content describes a process, tutorial, or step-by-step instructions.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[How to accomplish X]",
  "description": "[Brief overview]",
  "step": [
    {
      "@type": "HowToStep",
      "name": "[Step title]",
      "text": "[Step instructions]"
    }
  ],
  "totalTime": "PT[X]M"
}
```

**AEO tips**:
- Keep step names actionable and concise
- Include estimated time when possible
- AI engines often extract the step list verbatim

### 3. Article / BlogPosting Schema
**Use when**: Content is an article, guide, or blog post.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Title]",
  "author": {
    "@type": "Person",
    "name": "[Author name]",
    "url": "[Author profile URL]",
    "jobTitle": "[Role/credentials]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Publisher name]",
    "url": "[Publisher URL]"
  },
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "description": "[Meta description — answer the primary query]"
}
```

**AEO tips**:
- `dateModified` signals freshness to AI crawlers
- Author credentials boost E-E-A-T signals AI platforms use for trust
- Description should directly answer the page's primary question

### 4. Organization Schema
**Use when**: Setting up brand entity signals for a company or organization.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Company name]",
  "url": "[Website]",
  "logo": "[Logo URL]",
  "description": "[1-2 sentence company description]",
  "sameAs": [
    "[LinkedIn URL]",
    "[Twitter/X URL]",
    "[Facebook URL]",
    "[YouTube URL]",
    "[Wikipedia URL]",
    "[Wikidata URL]",
    "[Crunchbase URL]"
  ],
  "founder": {
    "@type": "Person",
    "name": "[Founder name]"
  },
  "foundingDate": "[YYYY]",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "[number or range]"
  }
}
```

**AEO tips**:
- Comprehensive `sameAs` links are critical — they help AI build entity graphs
- Include every verified profile and authoritative listing
- This schema should appear on the homepage and About page

### 5. DefinedTerm Schema
**Use when**: Content defines terminology, glossary items, or key concepts.

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "[Term]",
  "description": "[Clear, concise definition]",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "[Glossary or category name]"
  }
}
```

**AEO tips**:
- Definitions should be 1-2 sentences, extractable as standalone answers
- AI engines frequently cite glossary-style definitions verbatim

### 6. LocalBusiness Schema
**Use when**: Optimizing for local AI search results.

Include: name, address, phone, hours, geo coordinates, `sameAs` links, service area, and `hasOfferCatalog` for services.

## Process

1. **Analyze the content** (from URL, file, or pasted text)
2. **Identify applicable schema types** based on content format
3. **Extract structured data** from the content to populate schema fields
4. **Generate valid JSON-LD** ready for implementation
5. **Provide implementation instructions** (where to place the markup)
6. **Validate** — remind user to test at schema.org/validator or Google Rich Results Test

## Output Format

```
## AEO Schema Markup Report

### Content Analysis
[What schema types apply and why]

### Generated Schema
[JSON-LD code blocks for each applicable schema type]

### Implementation Guide
- Where to place each schema block (head vs body, which pages)
- How to add to common CMS platforms (WordPress, Shopify, etc.)

### Validation Checklist
- [ ] Test at https://validator.schema.org/
- [ ] Test at Google Rich Results Test
- [ ] Verify no duplicate schema conflicts
- [ ] Confirm schema matches visible page content
```

## Guidelines
- Generate valid, spec-compliant JSON-LD only
- Do not fabricate data — use only information present in the source content
- When data is missing (e.g., no author listed), note it as a recommendation to add
- Combine multiple schema types on the same page when appropriate
- Keep FAQ answers concise and self-contained
- Prefer JSON-LD over Microdata or RDFa (JSON-LD is the industry standard)
