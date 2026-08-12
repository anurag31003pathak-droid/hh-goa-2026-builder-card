import React, { useRef, useEffect, useState } from 'react';
import { BuilderCard } from './BuilderCard';
import { BuilderData, ASPECT_RATIO_OPTIONS } from '../types/builder';
import { Eye, Sparkles } from 'lucide-react';

interface BuilderPreviewProps {
  data: BuilderData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export const BuilderPreview: React.FC<BuilderPreviewProps> = ({ data, cardRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.42);

  const aspectConfig = ASPECT_RATIO_OPTIONS.find(a => a.id === data.aspectRatio) || ASPECT_RATIO_OPTIONS[0];
  const { width, height } = aspectConfig;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Occupy 88-92% of preview container width
        const availableWidth = containerWidth - 20;
        
        let calculatedScale = availableWidth / width;
        
        // Clamp height scale if on mobile
        const maxHeight = 620;
        if (height * calculatedScale > maxHeight) {
          calculatedScale = maxHeight / height;
        }

        setScale(Math.min(Math.max(calculatedScale, 0.25), 0.65));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height, data.aspectRatio]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Preview Header Badge */}
      <div className="flex items-center justify-between w-full mb-2 px-3 py-1 rounded-full bg-[#063B2F]/90 border border-[#F4C542]/30 shadow-md">
        <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-white uppercase">
          <Eye className="w-3.5 h-3.5 text-[#10B981]" />
          <span>LIVE PREVIEW</span>
        </div>
        <span className="text-[11px] font-mono-code font-bold text-[#F4C542]">
          {aspectConfig.label} PNG
        </span>
      </div>

      {/* Glass Preview Container (Filling 88-92% space) */}
      <div
        ref={containerRef}
        className="w-full flex items-center justify-center p-2 rounded-2xl bg-[#082C2A]/85 border border-[#8CAAA0]/30 backdrop-blur-md overflow-hidden relative shadow-2xl"
        style={{
          height: `${height * scale + 24}px`
        }}
      >
        <div
          className="origin-top flex items-center justify-center transition-all duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            width: `${width}px`,
            height: `${height}px`,
            marginTop: '0px'
          }}
        >
          <BuilderCard data={data} cardRef={cardRef} />
        </div>
      </div>
    </div>
  );
};
