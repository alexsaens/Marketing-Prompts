export type BrandKey = 'miraclesuit' | 'venus' | 'vitaminA' | 'longitude';

export interface BrandConfig {
  label: string;
  propertyId: string;
  color: string;
  accent: string;
}

export const BRANDS: Record<BrandKey, BrandConfig> = {
  miraclesuit: {
    label: 'Miraclesuit',
    propertyId: '292696532',
    color: '#1a3a5c',
    accent: '#c9a84c',
  },
  venus: {
    label: 'Venus',
    propertyId: '516975710',
    color: '#c2185b',
    accent: '#f06292',
  },
  vitaminA: {
    label: 'Vitamin A',
    propertyId: '322306237',
    color: '#00796b',
    accent: '#4db6ac',
  },
  longitude: {
    label: 'Longitude',
    propertyId: '368919397',
    color: '#283593',
    accent: '#5c6bc0',
  },
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TableBlock {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ChartBlock {
  type: 'bar' | 'line' | 'area' | 'pie';
  title: string;
  data: Record<string, string | number>[];
  xKey: string;
  yKeys: string[];
  colors?: string[];
}
