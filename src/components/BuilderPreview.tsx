import React, { useRef, useEffect, useState } from 'react';
import { BuilderCard } from './BuilderCard';
import { BuilderData, ASPECT_RATIO_OPTIONS } from '../types/builder';
import { Eye } from 'lucide-react';

interface BuilderPreviewProps {
  data: BuilderData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export const BuilderPreview: React.FC<BuilderPreviewProps> = ({ data, cardRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.38);

  const aspectConfig = ASPECT_RATIO_OPTIONS.find(a => a.id === data.aspectRatio) || ASPECT_RATIO_OPTIONS[0];
  const { width, height } = aspectConfig;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32;
        const widthScale = containerWidth / width;
        
        // Calculate max preview height based on screen size
        const maxCardHeight = window.innerWidth < 640 ? 460 : 540;
        const heightScale = maxCardHeight / height;
        
        const idealScale = Math.min(widthScale, heightScale);
        setScale(Math.max(idealScale, 0.22));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height, data.aspectRatio]);

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Preview Header Badge */}
      <div className="flex items-center justify-between w-full mb-3 px-3 py-1.5 rounded-full bg-[#063B2F]/90 border border-[#F4C542]/30 shadow-md">
        <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-white uppercase">
          <Eye className="w-3.5 h-3.5 text-[#10B981]" />
          <span>LIVE PREVIEW</span>
        </div>
        <span className="text-[11px] font-mono-code font-bold text-[#F4C542]">
          {aspectConfig.label} PNG
        </span>
      </div>

      {/* Unclipped Glass Preview Container */}
      <div
        ref={containerRef}
        className="w-full flex items-center justify-center p-4 rounded-2xl bg-[#082C2A]/85 border border-[#8CAAA0]/30 backdrop-blur-md overflow-hidden relative shadow-2xl"
        style={{ minHeight: `${scaledHeight + 32}px` }}
      >
        {/* Scaled Wrapper Box with exact scaled dimensions */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`
          }}
        >
          <div
            className="origin-center transition-all duration-200 ease-out flex items-center justify-center"
            style={{
              transform: `scale(${scale})`,
              width: `${width}px`,
              height: `${height}px`,
              position: 'absolute'
            }}
          >
            <BuilderCard data={data} cardRef={cardRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
