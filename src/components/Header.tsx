import React from 'react';
import { Terminal, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#082C2A]/80 border-b border-[#F4C542]/20 px-4 py-3 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Event Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#063B2F] border border-[#F4C542]/40 flex items-center justify-center shadow-md">
            <Terminal className="w-5 h-5 text-[#F4C542]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase font-heading leading-none">
                HACKER HOUSE <span className="text-[#F4C542]">GOA 2026</span>
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F0644F] text-white font-bold tracking-wider">
                OCT 28–31, 2026
              </span>
            </div>
            <p className="text-[11px] font-mono-code text-[#8CAAA0] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#F4C542]" /> GOA, INDIA • BUILDER ID CREATOR
            </p>
          </div>
        </div>

        {/* Right: Hashtag & Badge */}
        <div className="flex items-center gap-2.5">
          <span className="hidden md:inline-flex items-center gap-1 text-xs font-mono-code font-bold text-[#F0644F] bg-[#063B2F] px-3 py-1 rounded-full border border-[#F4C542]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" /> #FrameInGoa
          </span>
          <span className="text-xs font-mono-code text-[#FFF7E6] bg-[#063B2F] px-3 py-1 rounded-full border border-[#8CAAA0]/40">
            BUILDER ID STUDIO
          </span>
        </div>

      </div>
    </header>
  );
};
