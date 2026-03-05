import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { BRANDS, BrandKey, ChatMessage } from '@/lib/types';
import { GA_TOOLS, executeTool } from '@/lib/tools';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

function buildSystemPrompt(brand: BrandKey): string {
  const { label } = BRANDS[brand];
  return `You are an expert Google Analytics analyst for ${label}. Your job is to help the team understand their website performance by querying GA4 data and providing clear, actionable insights.

When answering questions:
1. Use the available tools to query real data — never guess or make up numbers.
2. Always provide context for the numbers (e.g., comparisons, trends, what's good/bad).
3. Keep responses concise but insightful.

FORMATTING RULES — follow these exactly:

For tables, use this exact format with a code block tagged "data-table":
\`\`\`data-table
{"title": "Table Title", "headers": ["Col1", "Col2", "Col3"], "rows": [["val1", "val2", "val3"]]}
\`\`\`

For charts, use this exact format with a code block tagged "data-chart":
\`\`\`data-chart
{"type": "bar", "title": "Chart Title", "data": [{"label": "A", "value": 100}], "xKey": "label", "yKeys": ["value"]}
\`\`\`

Chart types available: "bar", "line", "area"
For line/area charts, data items should have a "date" field or time-based xKey.
For bar charts, data items should have descriptive labels.

Use tables for raw data breakdowns (top pages, sources, etc.).
Use charts for trends over time or comparisons.
Both can appear in the same response.
After any table or chart block, continue with your analysis text.

Today's date is ${new Date().toISOString().split('T')[0]}. When users say "this week", "last month" etc., translate to appropriate GA4 date ranges.`;
}

export async function POST(req: NextRequest) {
  const { messages, brand }: { messages: ChatMessage[]; brand: BrandKey } =
    await req.json();

  if (!BRANDS[brand]) {
    return new Response(JSON.stringify({ error: 'Invalid brand' }), {
      status: 400,
    });
  }

  // Use a ReadableStream for SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: unknown) {
        const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      }

      try {
        // Build Anthropic message history from chat messages
        const anthropicMessages: Anthropic.MessageParam[] = messages.map(
          (m) => ({ role: m.role, content: m.content })
        );

        let currentMessages = anthropicMessages;

        // Agentic loop with tool use
        while (true) {
          const response = await client.messages.create({
            model: 'claude-opus-4-6',
            max_tokens: 4096,
            system: buildSystemPrompt(brand),
            tools: GA_TOOLS,
            messages: currentMessages,
          });

          if (response.stop_reason === 'end_turn') {
            // Extract and stream the final text
            const text = response.content
              .filter((b): b is Anthropic.TextBlock => b.type === 'text')
              .map((b) => b.text)
              .join('');
            send('message', { content: text });
            break;
          }

          if (response.stop_reason === 'tool_use') {
            const toolBlocks = response.content.filter(
              (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
            );

            // Notify client that we're querying GA
            for (const tool of toolBlocks) {
              const label =
                tool.name === 'run_ga4_realtime'
                  ? 'Fetching real-time data...'
                  : 'Querying Google Analytics...';
              send('status', { message: label });
            }

            // Execute tools
            const toolResults: Anthropic.ToolResultBlockParam[] = [];
            for (const tool of toolBlocks) {
              try {
                const result = await executeTool(
                  tool.name,
                  tool.input as Record<string, unknown>,
                  brand
                );
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: tool.id,
                  content: JSON.stringify(result),
                });
              } catch (err) {
                const errorMessage =
                  err instanceof Error ? err.message : 'Unknown error';
                send('status', {
                  message: `⚠️ GA query failed: ${errorMessage}`,
                });
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: tool.id,
                  content: `Error: ${errorMessage}`,
                  is_error: true,
                });
              }
            }

            currentMessages = [
              ...currentMessages,
              { role: 'assistant', content: response.content },
              { role: 'user', content: toolResults },
            ];
          } else {
            // Unexpected stop reason — surface whatever text we have
            const text = response.content
              .filter((b): b is Anthropic.TextBlock => b.type === 'text')
              .map((b) => b.text)
              .join('');
            send('message', { content: text || 'Unexpected response.' });
            break;
          }
        }

        send('done', {});
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        send('error', { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
