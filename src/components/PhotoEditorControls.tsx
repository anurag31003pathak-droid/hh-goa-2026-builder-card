import React from 'react';
import { PhotoShape, PhotoFilter, CardBgType, CARD_BG_OPTIONS } from '../types/builder';
import { ZoomIn, Move, Focus, Square, RotateCw, Image as ImageIcon, Sliders } from 'lucide-react';

interface PhotoEditorControlsProps {
  // Photo Controls
  zoom: number;
  onZoomChange: (zoom: number) => void;
  offsetX: number;
  onOffsetXChange: (x: number) => void;
  offsetY: number;
  onOffsetYChange: (y: number) => void;
  rotation: number;
  onRotationChange: (r: number) => void;
  focalPosition?: 'center' | 'top' | 'bottom';
  onFocalChange?: (pos: 'center' | 'top' | 'bottom') => void;
  shape: PhotoShape;
  onShapeChange: (shape: PhotoShape) => void;
  filter: PhotoFilter;
  onFilterChange: (filter: PhotoFilter) => void;
  // Card Background Controls
  cardBgType: CardBgType;
  onCardBgTypeChange: (bg: CardBgType) => void;
  cardBgOffsetX: number;
  onCardBgOffsetXChange: (x: number) => void;
  cardBgOffsetY: number;
  onCardBgOffsetYChange: (y: number) => void;
  cardBgZoom: number;
  onCardBgZoomChange: (z: number) => void;
  cardBgOverlay: number;
  onCardBgOverlayChange: (o: number) => void;
}

export const PhotoEditorControls: React.FC<PhotoEditorControlsProps> = ({
  zoom,
  onZoomChange,
  offsetX,
  onOffsetXChange,
  offsetY,
  onOffsetYChange,
  rotation,
  onRotationChange,
  focalPosition = 'top',
  onFocalChange,
  shape,
  onShapeChange,
  filter,
  onFilterChange,
  cardBgType,
  onCardBgTypeChange,
  cardBgOffsetX,
  onCardBgOffsetXChange,
  cardBgOffsetY,
  onCardBgOffsetYChange,
  cardBgZoom,
  onCardBgZoomChange,
  cardBgOverlay,
  onCardBgOverlayChange
}) => {
  const shapeOptions: { id: PhotoShape; name: string }[] = [
    { id: 'rounded-rect', name: 'Rounded' },
    { id: 'soft-square', name: 'Soft Square' },
    { id: 'circle', name: 'Circle' },
    { id: 'event-frame', name: 'Badge Frame' }
  ];

  const filterOptions: { id: PhotoFilter; name: string }[] = [
    { id: 'natural', name: 'Natural' },
    { id: 'warm-goa', name: 'Warm Goa' },
    { id: 'tropical', name: 'Tropical' },
    { id: 'high-contrast', name: 'High Contrast' },
    { id: 'monochrome', name: 'Monochrome' }
  ];

  return (
    <div className="w-full space-y-4 pt-1">
      
      {/* 1. PHOTO TRANSFORM CONTROLS */}
      <div className="space-y-3 p-3.5 rounded-xl bg-[#082C2A]/70 border border-[#8CAAA0]/30">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#F4C542] font-heading uppercase flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5 text-[#10B981]" /> PHOTO TRANSFORM & CROP
          </label>
          <button
            type="button"
            onClick={() => {
              onZoomChange(1);
              onOffsetXChange(0);
              onOffsetYChange(0);
              onRotationChange(0);
            }}
            className="text-[11px] font-mono-code text-[#8CAAA0] hover:text-white underline cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Zoom Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-300">
            <span>Photo Zoom</span>
            <span className="text-[#F4C542] font-bold">{zoom.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={2.0}
            step={0.05}
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#063B2F] rounded-lg appearance-none cursor-pointer accent-[#F4C542]"
          />
        </div>

        {/* Horizontal Position X */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-300">
            <span>Horizontal Shift (X)</span>
            <span className="text-[#F4C542] font-bold">{offsetX > 0 ? `+${offsetX}` : offsetX}%</span>
          </div>
          <input
            type="range"
            min={-40}
            max={40}
            step={1}
            value={offsetX}
            onChange={(e) => onOffsetXChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#063B2F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>

        {/* Vertical Position Y */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-300">
            <span>Vertical Shift (Y)</span>
            <span className="text-[#F4C542] font-bold">{offsetY > 0 ? `+${offsetY}` : offsetY}%</span>
          </div>
          <input
            type="range"
            min={-40}
            max={40}
            step={1}
            value={offsetY}
            onChange={(e) => onOffsetYChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#063B2F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>

        {/* Photo Rotation Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-300">
            <span className="flex items-center gap-1"><RotateCw className="w-3 h-3 text-[#10B981]" /> Photo Rotation</span>
            <span className="text-[#F4C542] font-bold">{rotation}°</span>
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            step={5}
            value={rotation}
            onChange={(e) => onRotationChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#063B2F] rounded-lg appearance-none cursor-pointer accent-[#F4C542]"
          />
        </div>
      </div>

      {/* 2. CARD BACKGROUND IMAGE & OVERLAY CONTROLS */}
      <div className="space-y-3 p-3.5 rounded-xl bg-[#082C2A]/70 border border-[#8CAAA0]/30">
        <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#10B981]" /> INTEGRATED CARD BACKGROUND
        </label>

        {/* Background Image Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {CARD_BG_OPTIONS.map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => onCardBgTypeChange(bg.id)}
              className={`py-1.5 px-2 rounded-lg text-xs font-mono-code transition-colors cursor-pointer text-left truncate ${
                cardBgType === bg.id
                  ? 'bg-[#063B2F] border border-[#F4C542] text-[#F4C542] font-bold'
                  : 'bg-[#082C2A] border border-[#8CAAA0]/30 text-gray-300 hover:text-white'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>

        {/* Background Dark Overlay Opacity */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-300">
            <span>Dark Overlay Opacity</span>
            <span className="text-[#F4C542] font-bold">{cardBgOverlay}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            step={5}
            value={cardBgOverlay}
            onChange={(e) => onCardBgOverlayChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#063B2F] rounded-lg appearance-none cursor-pointer accent-[#F4C542]"
          />
        </div>
      </div>

      {/* 3. SHAPE & FILTER SELECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
            PHOTO SHAPE
          </label>
          <div className="grid grid-cols-2 gap-1">
            {shapeOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onShapeChange(s.id)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono-code transition-colors cursor-pointer ${
                  shape === s.id
                    ? 'bg-[#063B2F] border border-[#F4C542] text-[#F4C542] font-bold'
                    : 'bg-[#082C2A] border border-[#8CAAA0]/30 text-gray-300 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
            PHOTO TONE FILTER
          </label>
          <div className="grid grid-cols-2 gap-1">
            {filterOptions.slice(0, 4).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterChange(f.id)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono-code transition-colors cursor-pointer ${
                  filter === f.id
                    ? 'bg-[#F4C542] text-[#063B2F] font-bold shadow'
                    : 'bg-[#082C2A] border border-[#8CAAA0]/30 text-gray-300 hover:text-white'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
