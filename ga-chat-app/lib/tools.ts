import Anthropic from '@anthropic-ai/sdk';
import { runReport, runRealtimeReport } from './ga';
import { BrandKey } from './types';

export const GA_TOOLS: Anthropic.Tool[] = [
  {
    name: 'run_ga4_report',
    description: `Run a Google Analytics 4 report for the selected brand property.
Use this to answer questions about traffic, users, sessions, pages, channels, devices,
geography, conversions, revenue, and more.

Common dimensions: date, sessionDefaultChannelGroup, sessionSource, sessionMedium,
sessionCampaignName, deviceCategory, country, city, pagePath, pageTitle, landingPage,
browser, operatingSystem, newVsReturning, userAgeBracket, userGender.

Common metrics: sessions, totalUsers, newUsers, activeUsers, screenPageViews,
engagementRate, averageSessionDuration, bounceRate, conversions, totalRevenue,
addToCarts, checkouts, ecommercePurchases, purchaseRevenue, sessionConversionRate.

Date shortcuts: 'today', 'yesterday', 'NdaysAgo' (e.g. '7daysAgo', '30daysAgo', '90daysAgo').`,
    input_schema: {
      type: 'object',
      properties: {
        dimensions: {
          type: 'array',
          items: { type: 'string' },
          description: 'GA4 dimension names (1-4 dimensions)',
        },
        metrics: {
          type: 'array',
          items: { type: 'string' },
          description: 'GA4 metric names (1-5 metrics)',
        },
        startDate: {
          type: 'string',
          description: "Start of date range. Examples: '7daysAgo', '30daysAgo', '2024-01-01', 'yesterday'",
        },
        endDate: {
          type: 'string',
          description: "End of date range. Examples: 'today', 'yesterday', '2024-12-31'",
        },
        limit: {
          type: 'number',
          description: 'Max rows to return (default 50, max 250)',
        },
        orderByMetric: {
          type: 'string',
          description: 'Metric name to sort by',
        },
        orderDesc: {
          type: 'boolean',
          description: 'Sort descending (default true = highest first)',
        },
        dimensionFilter: {
          type: 'object',
          description: 'Optional filter on a dimension value',
          properties: {
            fieldName: { type: 'string', description: 'Dimension to filter on' },
            value: { type: 'string', description: 'Value to match (contains)' },
          },
          required: ['fieldName', 'value'],
        },
      },
      required: ['dimensions', 'metrics', 'startDate', 'endDate'],
    },
  },
  {
    name: 'run_ga4_realtime',
    description: `Get real-time data from Google Analytics 4 — active users right now,
current pages being viewed, active countries, etc.`,
    input_schema: {
      type: 'object',
      properties: {
        dimensions: {
          type: 'array',
          items: { type: 'string' },
          description: "Realtime dimensions: 'country', 'city', 'pagePath', 'deviceCategory', 'unifiedScreenName'",
        },
        metrics: {
          type: 'array',
          items: { type: 'string' },
          description: "Realtime metrics: 'activeUsers', 'screenPageViews'",
        },
        limit: {
          type: 'number',
          description: 'Max rows (default 20)',
        },
      },
      required: ['dimensions', 'metrics'],
    },
  },
];

export async function executeTool(
  toolName: string,
  input: Record<string, unknown>,
  brand: BrandKey
): Promise<unknown> {
  if (toolName === 'run_ga4_report') {
    const result = await runReport({
      brand,
      dimensions: input.dimensions as string[],
      metrics: input.metrics as string[],
      startDate: input.startDate as string,
      endDate: input.endDate as string,
      limit: (input.limit as number) ?? 50,
      orderByMetric: input.orderByMetric as string | undefined,
      orderDesc: input.orderDesc as boolean | undefined,
      dimensionFilter: input.dimensionFilter as
        | { fieldName: string; value: string }
        | undefined,
    });
    return result;
  }

  if (toolName === 'run_ga4_realtime') {
    const result = await runRealtimeReport(
      brand,
      input.dimensions as string[],
      input.metrics as string[],
      (input.limit as number) ?? 20
    );
    return result;
  }

  throw new Error(`Unknown tool: ${toolName}`);
}
