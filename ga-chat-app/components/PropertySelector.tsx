'use client';

import { BRANDS, BrandKey } from '@/lib/types';

interface PropertySelectorProps {
  selected: BrandKey;
  onChange: (brand: BrandKey) => void;
}

export function PropertySelector({ selected, onChange }: PropertySelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {(Object.keys(BRANDS) as BrandKey[]).map((key) => {
        const brand = BRANDS[key];
        const isSelected = selected === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 border"
            style={
              isSelected
                ? {
                    backgroundColor: brand.color,
                    color: '#ffffff',
                    borderColor: brand.color,
                    boxShadow: `0 2px 8px ${brand.color}40`,
                  }
                : {
                    backgroundColor: '#ffffff',
                    color: brand.color,
                    borderColor: `${brand.color}40`,
                  }
            }
          >
            {brand.label}
          </button>
        );
      })}
    </div>
  );
}
