import React from 'react';
import { CardThemeId, CARD_THEME_OPTIONS } from '../types/builder';
import { Palette, Check } from 'lucide-react';

interface FrameSelectorProps {
  selectedTheme: CardThemeId;
  onThemeSelect: (theme: CardThemeId) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({ selectedTheme, onThemeSelect }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#10B981]" /> CARD THEMES
        </label>
        <span className="text-[11px] font-mono-code text-gray-400">
          5 Custom Themes
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CARD_THEME_OPTIONS.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onThemeSelect(theme.id)}
              className={`relative p-2 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#063B2F] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]'
                  : 'bg-[#082C2A] border-[#8CAAA0]/30 hover:border-[#F4C542]/60 hover:bg-[#063B2F]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-full h-3 rounded-md bg-gradient-to-r ${theme.bgGradient}`} />
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 ml-1" />
                )}
              </div>
              <p className={`text-xs font-bold font-heading truncate ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {theme.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
