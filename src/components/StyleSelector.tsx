import React from 'react';
import { CardThemeId, CARD_THEME_OPTIONS } from '../types/builder';
import { Palette, Check } from 'lucide-react';

interface StyleSelectorProps {
  selectedTheme: CardThemeId;
  onThemeSelect: (theme: CardThemeId) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedTheme, onThemeSelect }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#10B981]" /> TASTEFUL CARD THEME
        </label>
        <span className="text-[11px] font-mono-code text-[#8CAAA0]">
          5 Curated Styles
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CARD_THEME_OPTIONS.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onThemeSelect(theme.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#063B2F] border-[#F4C542] shadow-[0_0_15px_rgba(244,197,66,0.25)] scale-[1.01]'
                  : 'bg-[#082C2A]/80 border-[#8CAAA0]/30 hover:border-[#F4C542]/50 hover:bg-[#063B2F]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-full h-3.5 rounded-md bg-gradient-to-r ${theme.bgGradient}`} />
                {isSelected && (
                  <Check className="w-4 h-4 text-[#F4C542] shrink-0 ml-2" />
                )}
              </div>
              <div>
                <p className={`text-xs font-bold font-heading ${isSelected ? 'text-[#F4C542]' : 'text-white'}`}>
                  {theme.name}
                </p>
                <p className="text-[10px] font-mono-code text-gray-400 mt-0.5">
                  {theme.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
