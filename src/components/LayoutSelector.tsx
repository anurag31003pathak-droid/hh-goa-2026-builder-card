import React from 'react';
import { CardLayoutId, CARD_LAYOUT_OPTIONS } from '../types/builder';
import { Layout, Check } from 'lucide-react';

interface LayoutSelectorProps {
  selectedLayout: CardLayoutId;
  onLayoutSelect: (layout: CardLayoutId) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selectedLayout, onLayoutSelect }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-[#10B981]" /> CARD COMPOSITION LAYOUT
        </label>
        <span className="text-[11px] font-mono-code text-[#8CAAA0]">
          5 Distinct Layouts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CARD_LAYOUT_OPTIONS.map((layout) => {
          const isSelected = selectedLayout === layout.id;
          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => onLayoutSelect(layout.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#063B2F] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-[1.01]'
                  : 'bg-[#082C2A]/80 border-[#8CAAA0]/30 hover:border-[#10B981]/50 hover:bg-[#063B2F]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold font-heading ${isSelected ? 'text-[#10B981]' : 'text-white'}`}>
                  {layout.name}
                </span>
                {isSelected && <Check className="w-4 h-4 text-[#10B981] shrink-0" />}
              </div>
              <p className="text-[10px] font-mono-code text-gray-400">
                {layout.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
