'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, BarChart2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { PropertySelector } from './PropertySelector';
import { BRANDS, BrandKey, ChatMessage } from '@/lib/types';

const SUGGESTED_QUESTIONS = [
  'What were our top traffic sources last 30 days?',
  'How many users visited this week vs last week?',
  'Which pages get the most traffic?',
  'What devices are our visitors using?',
  'Show me sessions by day for the last 2 weeks',
  "What's our conversion rate this month?",
];

export function ChatInterface() {
  const [brand, setBrand] = useState<BrandKey>('miraclesuit');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const brandConfig = BRANDS[brand];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusMessage]);

  // When brand changes, clear the chat
  const handleBrandChange = (newBrand: BrandKey) => {
    setBrand(newBrand);
    setMessages([]);
    setStatusMessage('');
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessage = { role: 'user', content: trimmed };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);
      setStatusMessage('Thinking...');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages, brand }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          let currentEvent = '';
          let currentData = '';

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              currentData = line.slice(6).trim();
            } else if (line === '') {
              // End of event
              if (currentEvent && currentData) {
                try {
                  const payload = JSON.parse(currentData);
                  if (currentEvent === 'status') {
                    setStatusMessage(payload.message);
                  } else if (currentEvent === 'message') {
                    setMessages((prev) => [
                      ...prev,
                      { role: 'assistant', content: payload.content },
                    ]);
                    setStatusMessage('');
                  } else if (currentEvent === 'error') {
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: 'assistant',
                        content: `Sorry, I encountered an error: ${payload.message}`,
                      },
                    ]);
                    setStatusMessage('');
                  }
                } catch {
                  // ignore parse errors
                }
              }
              currentEvent = '';
              currentData = '';
            }
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Request failed';
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Sorry, something went wrong: ${msg}` },
        ]);
        setStatusMessage('');
      } finally {
        setIsLoading(false);
        setStatusMessage('');
        inputRef.current?.focus();
      }
    },
    [messages, brand, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header
        className="flex-shrink-0 px-6 py-4 flex items-center justify-between shadow-sm"
        style={{ backgroundColor: brandConfig.color }}
      >
        <div className="flex items-center gap-3">
          <BarChart2 className="text-white/80 w-6 h-6" />
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              GA4 Analytics Chat
            </h1>
            <p className="text-white/70 text-xs">
              Powered by Claude + Google Analytics
            </p>
          </div>
        </div>
        <div className="text-white/80 text-sm font-medium">
          {brandConfig.label}
        </div>
      </header>

      {/* Brand selector */}
      <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Brand:
          </span>
          <PropertySelector selected={brand} onChange={handleBrandChange} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                style={{ backgroundColor: brandConfig.color }}
              >
                <BarChart2 className="text-white w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {brandConfig.label} Analytics
              </h2>
              <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                Ask me anything about your GA4 data — traffic, conversions, top
                pages, audience demographics, and more.
              </p>

              {/* Suggested questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-left px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 hover:border-gray-400 hover:shadow-sm transition-all duration-150"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              content={msg.content}
              brandColor={brandConfig.color}
            />
          ))}

          {/* Status indicator */}
          {isLoading && statusMessage && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center gap-2 bg-white rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm px-4 py-3 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: brandConfig.color }} />
                <span>{statusMessage}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-gray-50 rounded-2xl border border-gray-200 p-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${brandConfig.label} analytics...`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none leading-relaxed max-h-32"
              style={{ minHeight: '24px' }}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: brandConfig.color }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
