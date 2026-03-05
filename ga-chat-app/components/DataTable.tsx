'use client';

import { TableBlock } from '@/lib/types';

export function DataTable({ block }: { block: TableBlock }) {
  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      {block.title && (
        <div className="bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-200">
          {block.title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr
                key={ri}
                className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-2 text-gray-700 border-b border-gray-100 last:border-b-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
