'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartBlock } from '@/lib/types';

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

function formatValue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

export function DataChart({ block }: { block: ChartBlock }) {
  const colors = block.colors ?? COLORS;

  const commonProps = {
    data: block.data,
    margin: { top: 5, right: 20, left: 10, bottom: 5 },
  };

  const axisProps = {
    xAxis: (
      <XAxis
        dataKey={block.xKey}
        tick={{ fontSize: 12, fill: '#6b7280' }}
        axisLine={{ stroke: '#e5e7eb' }}
        tickLine={false}
      />
    ),
    yAxis: (
      <YAxis
        tick={{ fontSize: 12, fill: '#6b7280' }}
        axisLine={false}
        tickLine={false}
        tickFormatter={formatValue}
      />
    ),
    grid: <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />,
    tooltip: (
      <Tooltip
        contentStyle={{
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: '12px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        }}
        formatter={(value: number) => formatValue(value)}
      />
    ),
    legend: <Legend wrapperStyle={{ fontSize: '12px' }} />,
  };

  const renderChart = () => {
    if (block.type === 'line') {
      return (
        <LineChart {...commonProps}>
          {axisProps.grid}
          {axisProps.xAxis}
          {axisProps.yAxis}
          {axisProps.tooltip}
          {axisProps.legend}
          {block.yKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      );
    }

    if (block.type === 'area') {
      return (
        <AreaChart {...commonProps}>
          {axisProps.grid}
          {axisProps.xAxis}
          {axisProps.yAxis}
          {axisProps.tooltip}
          {axisProps.legend}
          {block.yKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              fill={`${colors[i % colors.length]}20`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      );
    }

    // Default: bar
    return (
      <BarChart {...commonProps}>
        {axisProps.grid}
        {axisProps.xAxis}
        {axisProps.yAxis}
        {axisProps.tooltip}
        {axisProps.legend}
        {block.yKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    );
  };

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      {block.title && (
        <div className="bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-200">
          {block.title}
        </div>
      )}
      <div className="p-4 bg-white">
        <ResponsiveContainer width="100%" height={280}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
