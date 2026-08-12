import React from 'react';
import { AspectRatioType, ASPECT_RATIO_OPTIONS } from '../types/builder';
import { Maximize2, Check } from 'lucide-react';

interface AspectSelectorProps {
  selectedAspect: AspectRatioType;
  onAspectSelect: (aspect: AspectRatioType) => void;
}

export const AspectSelector: React.FC<AspectSelectorProps> = ({ selectedAspect, onAspectSelect }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-[#10B981]" /> EXPORT ASPECT RATIO
        </label>
        <span className="text-[11px] font-mono-code text-[#8CAAA0]">
          4 Aspect Formats
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ASPECT_RATIO_OPTIONS.map((opt) => {
          const isSelected = selectedAspect === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onAspectSelect(opt.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#063B2F] border-[#10B981] shadow'
                  : 'bg-[#082C2A] border-[#8CAAA0]/30 hover:border-[#F4C542]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-heading ${isSelected ? 'text-[#F4C542]' : 'text-white'}`}>
                  {opt.name}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
              </div>
              <p className="text-[10px] font-mono-code text-gray-400 mt-0.5">
                {opt.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
