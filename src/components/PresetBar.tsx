import React from 'react';
import { VibePreset, BuilderData } from '../types/builder';
import { Palmtree, Zap, Sunset, Waves, Sparkles } from 'lucide-react';

interface PresetBarProps {
  onApplyPreset: (preset: VibePreset) => void;
}

export const PresetBar: React.FC<PresetBarProps> = ({ onApplyPreset }) => {
  const presets: { id: VibePreset; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'goa', label: '🌴 GOA', icon: <Palmtree className="w-3.5 h-3.5" />, color: 'hover:border-[#F4C542] text-[#F4C542]' },
    { id: 'hacker', label: '⚡ HACKER', icon: <Zap className="w-3.5 h-3.5" />, color: 'hover:border-[#10B981] text-[#10B981]' },
    { id: 'sunset', label: '🌅 SUNSET', icon: <Sunset className="w-3.5 h-3.5" />, color: 'hover:border-[#F0644F] text-[#F0644F]' },
    { id: 'ocean', label: '🌊 OCEAN', icon: <Waves className="w-3.5 h-3.5" />, color: 'hover:border-[#38BDF8] text-[#38BDF8]' },
    { id: 'minimal', label: '✨ MINIMAL', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'hover:border-[#FFF7E6] text-[#FFF7E6]' }
  ];

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono-code text-[#8CAAA0] uppercase font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F4C542]" /> QUICK VIBE PRESETS:
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onApplyPreset(p.id)}
            className={`py-1.5 px-1 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 font-mono-code font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${p.color}`}
          >
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
