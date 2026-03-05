import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { BRANDS, BrandKey } from './types';

function getClient(): BetaAnalyticsDataClient {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set. ' +
      'See .env.example for setup instructions.'
    );
  }
  const credentials = JSON.parse(raw);
  return new BetaAnalyticsDataClient({ credentials });
}

export interface ReportParams {
  brand: BrandKey;
  dimensions: string[];
  metrics: string[];
  startDate: string;   // e.g. '7daysAgo', '30daysAgo', 'yesterday', 'YYYY-MM-DD'
  endDate: string;     // e.g. 'today', 'yesterday', 'YYYY-MM-DD'
  limit?: number;
  orderByMetric?: string;
  orderDesc?: boolean;
  dimensionFilter?: {
    fieldName: string;
    value: string;
  };
}

export interface ReportRow {
  [key: string]: string;
}

export interface ReportResult {
  rows: ReportRow[];
  rowCount: number;
  samplingUsed: boolean;
}

export async function runReport(params: ReportParams): Promise<ReportResult> {
  const client = getClient();
  const { propertyId } = BRANDS[params.brand];

  const requestParams: Parameters<typeof client.runReport>[0] = {
    property: `properties/${propertyId}`,
    dimensions: params.dimensions.map((name) => ({ name })),
    metrics: params.metrics.map((name) => ({ name })),
    dateRanges: [{ startDate: params.startDate, endDate: params.endDate }],
    limit: params.limit ?? 50,
  };

  if (params.orderByMetric) {
    requestParams.orderBys = [
      {
        metric: { metricName: params.orderByMetric },
        desc: params.orderDesc ?? true,
      },
    ];
  }

  if (params.dimensionFilter) {
    requestParams.dimensionFilter = {
      filter: {
        fieldName: params.dimensionFilter.fieldName,
        stringFilter: {
          value: params.dimensionFilter.value,
          matchType: 'CONTAINS',
        },
      },
    };
  }

  const [response] = await client.runReport(requestParams);

  const dimHeaders = (response.dimensionHeaders ?? []).map((h) => h.name ?? '');
  const metHeaders = (response.metricHeaders ?? []).map((h) => h.name ?? '');

  const rows: ReportRow[] = (response.rows ?? []).map((row) => {
    const obj: ReportRow = {};
    (row.dimensionValues ?? []).forEach((v, i) => {
      obj[dimHeaders[i]] = v.value ?? '';
    });
    (row.metricValues ?? []).forEach((v, i) => {
      obj[metHeaders[i]] = v.value ?? '';
    });
    return obj;
  });

  return {
    rows,
    rowCount: rows.length,
    samplingUsed: false,
  };
}

export interface RealtimeResult {
  rows: ReportRow[];
  activeUsers: number;
}

export async function runRealtimeReport(
  brand: BrandKey,
  dimensions: string[],
  metrics: string[],
  limit = 20
): Promise<RealtimeResult> {
  const client = getClient();
  const { propertyId } = BRANDS[brand];

  const [response] = await client.runRealtimeReport({
    property: `properties/${propertyId}`,
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    limit,
  });

  const dimHeaders = (response.dimensionHeaders ?? []).map((h) => h.name ?? '');
  const metHeaders = (response.metricHeaders ?? []).map((h) => h.name ?? '');

  const rows: ReportRow[] = (response.rows ?? []).map((row) => {
    const obj: ReportRow = {};
    (row.dimensionValues ?? []).forEach((v, i) => {
      obj[dimHeaders[i]] = v.value ?? '';
    });
    (row.metricValues ?? []).forEach((v, i) => {
      obj[metHeaders[i]] = v.value ?? '';
    });
    return obj;
  });

  const activeUsersRow = rows.find((r) => r.activeUsers);
  const activeUsers = activeUsersRow
    ? parseInt(activeUsersRow.activeUsers, 10)
    : response.rows?.reduce(
        (sum, r) => sum + parseInt(r.metricValues?.[0]?.value ?? '0', 10),
        0
      ) ?? 0;

  return { rows, activeUsers };
}
