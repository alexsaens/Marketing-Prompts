'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DataTable } from './DataTable';
import { DataChart } from './DataChart';
import { TableBlock, ChartBlock } from '@/lib/types';

interface Part {
  type: 'text' | 'table' | 'chart';
  content: string | TableBlock | ChartBlock;
}

function parseContent(raw: string): Part[] {
  const parts: Part[] = [];
  // Match ```data-table or ```data-chart blocks
  const blockRegex = /```(data-table|data-chart)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(raw)) !== null) {
    // Text before the block
    if (match.index > lastIndex) {
      const text = raw.slice(lastIndex, match.index).trim();
      if (text) parts.push({ type: 'text', content: text });
    }

    const blockType = match[1];
    try {
      const parsed = JSON.parse(match[2].trim());
      if (blockType === 'data-table') {
        parts.push({ type: 'table', content: parsed as TableBlock });
      } else {
        parts.push({ type: 'chart', content: parsed as ChartBlock });
      }
    } catch {
      // If JSON parse fails, show as text
      parts.push({ type: 'text', content: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < raw.length) {
    const text = raw.slice(lastIndex).trim();
    if (text) parts.push({ type: 'text', content: text });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: raw }];
}

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  brandColor?: string;
}

export function MessageBubble({ role, content, brandColor = '#1a3a5c' }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div
          className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 text-white text-sm leading-relaxed"
          style={{ backgroundColor: brandColor }}
        >
          {content}
        </div>
      </div>
    );
  }

  const parts = parseContent(content);

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[90%] w-full">
        {/* Assistant avatar */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: brandColor }}
          >
            G
          </div>
          <span className="text-xs text-gray-500 font-medium">Analytics</span>
        </div>

        <div className="bg-white rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm px-4 py-3">
          {parts.map((part, i) => {
            if (part.type === 'table') {
              return <DataTable key={i} block={part.content as TableBlock} />;
            }
            if (part.type === 'chart') {
              return <DataChart key={i} block={part.content as ChartBlock} />;
            }
            return (
              <div key={i} className="prose prose-sm max-w-none text-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {part.content as string}
                </ReactMarkdown>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
