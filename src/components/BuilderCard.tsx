import React from 'react';
import { BuilderData, PhotoShape, PhotoFilter, CARD_BG_OPTIONS, ASPECT_RATIO_OPTIONS, DEMO_PHOTO_ASSET } from '../types/builder';
import { ShieldCheck, Terminal, Zap, QrCode, Cpu, AtSign, MapPin, Code2 } from 'lucide-react';

interface BuilderCardProps {
  data: BuilderData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({ data, cardRef }) => {
  const displayRole = data.role === 'Other' ? (data.customRole || 'BUILDER') : data.role;
  const displayTitle = data.title || 'THE GOA BUILDER';
  const displayName = data.name.trim() || 'ANURAG PATHAK';
  const displayHandle = data.socialHandle ? data.socialHandle.replace(/^@/, '') : 'anuragpathak';
  const focalClass = data.focalPosition === 'top' ? 'object-top' : data.focalPosition === 'bottom' ? 'object-bottom' : 'object-center';
  const statusText = data.statusBadge || 'READY TO BUILD';
  const mottoText = data.motto || 'BUILT TO SHIP.';
  const builderIdCode = data.serialNumber || 'HH26-ANU-01';
  const layoutId = data.cardLayout || '01-builder-pass';

  // Dimension config based on aspect ratio
  const aspectConfig = ASPECT_RATIO_OPTIONS.find(a => a.id === data.aspectRatio) || ASPECT_RATIO_OPTIONS[0];
  const { width, height } = aspectConfig;

  // Background Image config
  const bgOption = CARD_BG_OPTIONS.find(b => b.id === data.cardBgType) || CARD_BG_OPTIONS[0];
  const bgImageUrl = bgOption.imgUrl;
  const overlayOpacity = (data.cardBgOverlay ?? 55) / 100;

  // Photo Style computations
  const shapeClass = {
    'rounded-rect': 'rounded-[24px]',
    'soft-square': 'rounded-[14px]',
    'circle': 'rounded-full',
    'event-frame': 'rounded-[28px] border-2 border-[#F4C542]'
  }[data.photoShape || 'rounded-rect'];

  const filterStyle = {
    'natural': 'none',
    'warm-goa': 'sepia(0.2) saturate(1.2) contrast(1.05)',
    'tropical': 'saturate(1.4) hue-rotate(-10deg)',
    'high-contrast': 'contrast(1.25) saturate(1.1)',
    'monochrome': 'grayscale(1) contrast(1.1)'
  }[data.photoFilter || 'natural'];

  const rotation = data.photoRotation || 0;
  const displayPhotoUrl = (data.photoUrl && !data.photoUrl.startsWith('blob:')) ? data.photoUrl : DEMO_PHOTO_ASSET;

  return (
    <div
      ref={cardRef}
      id="builder-card-canvas"
      className="relative bg-[#082C2A] text-[#FFF7E6] overflow-hidden select-none flex flex-col justify-between p-[44px] shadow-2xl font-sans"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        boxSizing: 'border-box'
      }}
    >
      {/* 1. REAL GOA BEACH INTEGRATED BACKGROUND LAYER */}
      {bgImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-all"
          style={{
            backgroundImage: `url('${bgImageUrl}')`,
            transform: `scale(${data.cardBgZoom || 1.0}) translate(${data.cardBgOffsetX || 0}%, ${data.cardBgOffsetY || 0}%)`
          }}
        />
      )}

      {/* 2. DARK TRANSLUCENT OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity"
        style={{
          backgroundColor: layoutId === '03-terminal-pass' ? '#031A15' : '#063B2F',
          opacity: overlayOpacity
        }}
      />

      {/* Cyber Grid & Ambient Blur Accents */}
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />
      <div className="absolute -top-[150px] -left-[150px] w-[600px] h-[600px] bg-[#063B2F] rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute -bottom-[150px] right-[150px] w-[600px] h-[600px] bg-[#F4C542]/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      {/* Outer Border Frames */}
      <div className="absolute inset-[24px] border-2 border-[#F4C542]/40 rounded-[32px] pointer-events-none" />
      <div className="absolute inset-[32px] border border-[#10B981]/30 rounded-[24px] pointer-events-none" />

      {/* ================= LAYOUT VARIATION 03: TERMINAL PASS ================= */}
      {layoutId === '03-terminal-pass' && (
        <>
          {/* Top Hacker Terminal Bar */}
          <div className="relative z-10 pt-2 flex items-center justify-between border-b border-[#10B981]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-green-500 inline-block" />
              <span className="text-[13px] font-mono-code text-[#10B981] ml-2 font-bold">
                bash ~/hh-goa-2026/builder.sh
              </span>
            </div>
            <span className="text-[12px] font-mono-code text-[#F4C542] font-bold">
              ID: {builderIdCode}
            </span>
          </div>

          {/* Terminal Body Grid */}
          <div className="relative z-10 my-auto grid grid-cols-12 gap-6 items-center">
            <div className="col-span-5 flex justify-center">
              <div className={`relative w-[340px] h-[340px] ${shapeClass} p-[6px] bg-[#10B981] shadow-[0_0_40px_rgba(16,185,129,0.4)]`}>
                <div className={`w-full h-full ${shapeClass} bg-[#031A15] p-[4px] overflow-hidden`}>
                  <img
                    src={displayPhotoUrl}
                    alt={displayName}
                    onError={(e) => { e.currentTarget.src = DEMO_PHOTO_ASSET; }}
                    className={`w-full h-full object-cover ${shapeClass} ${focalClass}`}
                    style={{
                      transform: `scale(${data.photoZoom || 1.0}) translate(${data.photoOffsetX || 0}%, ${data.photoOffsetY || 0}%) rotate(${rotation}deg)`,
                      filter: filterStyle
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-7 space-y-3 font-mono-code bg-[#031A15]/90 p-5 rounded-2xl border border-[#10B981]/50 text-left">
              <div>
                <p className="text-[12px] text-[#10B981] font-bold">&gt; USER_NAME:</p>
                <h1 className="text-[36px] font-extrabold text-white font-heading leading-tight uppercase">
                  {displayName}
                </h1>
              </div>
              <div>
                <p className="text-[12px] text-[#10B981] font-bold">&gt; ROLE:</p>
                <p className="text-[20px] text-[#F4C542] font-bold uppercase">{displayRole}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#10B981] font-bold">&gt; TITLE:</p>
                <p className="text-[22px] text-white font-extrabold uppercase">"{displayTitle}"</p>
              </div>
              {data.stack.length > 0 && (
                <div className="pt-1">
                  <p className="text-[12px] text-[#10B981] font-bold">&gt; STACK_STACK:</p>
                  <p className="text-[14px] text-[#E9F0EA] font-mono-code">{data.stack.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#10B981]/40 flex items-center justify-between font-mono-code">
            <span className="text-[16px] font-bold text-[#F0644F]">#FrameInGoa</span>
            <span className="text-[14px] text-[#10B981] font-bold">OCT 28–31, 2026 • GOA</span>
            <QrCode className="w-10 h-10 text-white" />
          </div>
        </>
      )}

      {/* ================= LAYOUT VARIATION 02: BEACH PASS ================= */}
      {layoutId === '02-beach-pass' && (
        <>
          <div className="relative z-10 pt-2 flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-[#F0644F] text-white font-mono-code font-bold text-[14px]">
              #FrameInGoa
            </span>
            <span className="text-[15px] font-mono-code font-extrabold text-[#F4C542]">
              HACKER HOUSE GOA 2026
            </span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-4">
            <div className="flex justify-center">
              <div className={`relative w-[440px] h-[440px] ${shapeClass} p-[8px] bg-gradient-to-tr from-[#F4C542] via-[#F0644F] to-[#10B981] shadow-2xl`}>
                <div className={`w-full h-full ${shapeClass} bg-[#063B2F] p-[4px] overflow-hidden`}>
                  <img
                    src={displayPhotoUrl}
                    alt={displayName}
                    onError={(e) => { e.currentTarget.src = DEMO_PHOTO_ASSET; }}
                    className={`w-full h-full object-cover ${shapeClass} ${focalClass}`}
                    style={{
                      transform: `scale(${data.photoZoom || 1.0}) translate(${data.photoOffsetX || 0}%, ${data.photoOffsetY || 0}%) rotate(${rotation}deg)`,
                      filter: filterStyle
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-[48px] font-extrabold text-white font-heading uppercase leading-tight">
                {displayName}
              </h1>
              <p className="text-[20px] font-mono-code text-[#10B981] font-bold uppercase mt-1">
                {displayRole} • @{displayHandle}
              </p>
              <p className="text-[24px] font-mono-code font-extrabold text-[#F4C542] uppercase mt-2">
                "{displayTitle}"
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#10B981]/40 flex items-center justify-between">
            <span className="text-[14px] font-mono-code text-gray-300">ID: {builderIdCode}</span>
            <span className="text-[14px] font-mono-code text-white font-bold">OCT 28–31, 2026</span>
          </div>
        </>
      )}

      {/* ================= LAYOUT VARIATION 04: CREATOR PASS ================= */}
      {layoutId === '04-creator-pass' && (
        <>
          <div className="relative z-10 pt-2 flex items-center justify-between border-b border-[#F4C542]/30 pb-3">
            <h2 className="text-[24px] font-extrabold text-[#F4C542] font-heading uppercase">
              CREATOR PASS • GOA 2026
            </h2>
            <span className="px-3 py-1 rounded bg-[#063B2F] text-[#10B981] border border-[#10B981] text-[13px] font-mono-code font-bold">
              ID: {builderIdCode}
            </span>
          </div>

          <div className="relative z-10 my-auto grid grid-cols-12 gap-6 items-center">
            <div className="col-span-6 flex justify-center">
              <div className={`relative w-[360px] h-[360px] ${shapeClass} p-[6px] bg-gradient-to-b from-[#F4C542] to-[#10B981] shadow-xl`}>
                <div className={`w-full h-full ${shapeClass} bg-[#063B2F] p-[4px] overflow-hidden`}>
                  <img
                    src={displayPhotoUrl}
                    alt={displayName}
                    onError={(e) => { e.currentTarget.src = DEMO_PHOTO_ASSET; }}
                    className={`w-full h-full object-cover ${shapeClass} ${focalClass}`}
                    style={{
                      transform: `scale(${data.photoZoom || 1.0}) translate(${data.photoOffsetX || 0}%, ${data.photoOffsetY || 0}%) rotate(${rotation}deg)`,
                      filter: filterStyle
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-6 space-y-3 text-left">
              <h1 className="text-[44px] font-extrabold text-white font-heading uppercase leading-none">
                {displayName}
              </h1>
              <p className="text-[20px] font-mono-code text-[#10B981] font-bold uppercase">{displayRole}</p>
              <p className="text-[22px] font-mono-code font-extrabold text-[#F4C542] uppercase">"{displayTitle}"</p>
              {data.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {data.stack.slice(0, 5).map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg text-[13px] font-mono-code bg-[#063B2F] text-[#FFF7E6] border border-[#10B981]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#10B981]/40 flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-xl bg-[#F0644F] text-white font-mono-code font-extrabold text-[16px]">
              #FrameInGoa
            </span>
            <span className="text-[14px] font-mono-code text-white font-bold">OCT 28–31, 2026 • GOA</span>
          </div>
        </>
      )}

      {/* ================= DEFAULT LAYOUT 01: BUILDER PASS ================= */}
      {layoutId !== '02-beach-pass' && layoutId !== '03-terminal-pass' && layoutId !== '04-creator-pass' && (
        <>
          {/* Top Lanyard Badge Clip */}
          <div className="absolute top-[24px] left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 rounded-b-xl bg-[#063B2F] border-x border-b border-[#F4C542]/40 shadow-lg">
            <div className="w-8 h-2 rounded-full bg-[#082C2A] border border-[#10B981]" />
            <span className="text-[14px] font-mono-code tracking-[0.25em] text-[#F4C542] uppercase font-bold">
              BUILDER PASS
            </span>
            <div className="w-8 h-2 rounded-full bg-[#082C2A] border border-[#10B981]" />
          </div>

          {/* Header */}
          <div className="relative z-10 pt-[24px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-[#F4C542] via-[#10B981] to-[#063B2F] p-[2px] shadow-lg">
                <div className="w-full h-full bg-[#063B2F] rounded-[14px] flex items-center justify-center">
                  <Terminal className="w-[32px] h-[32px] text-[#F4C542]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[26px] font-extrabold tracking-tight text-white font-heading leading-none uppercase">
                    HACKER HOUSE
                  </h2>
                  <span className="px-2.5 py-0.5 rounded bg-[#F0644F] text-white text-[12px] font-mono-code font-bold tracking-widest">
                    OCT 28–31, 2026
                  </span>
                </div>
                <p className="text-[14px] font-mono-code font-bold text-[#F4C542] tracking-[0.2em] uppercase mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F4C542]" /> GOA • INDIA
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#063B2F] border border-[#10B981]/50 shadow-inner">
                <ShieldCheck className="w-[16px] h-[16px] text-[#10B981]" />
                <span className="text-[13px] font-mono-code font-bold text-[#F4C542] tracking-wider">
                  BUILDER ID: {builderIdCode}
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-[#E9F0EA]/70 tracking-widest uppercase mt-1.5">
                15.4989° N, 73.8278° E
              </p>
            </div>
          </div>

          {/* Hero Photo Section */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div className={`relative ${data.aspectRatio === '1:1' ? 'w-[420px] h-[420px]' : data.aspectRatio === '9:16' ? 'w-[560px] h-[560px]' : 'w-[520px] h-[520px]'} ${shapeClass} p-[8px] bg-gradient-to-b from-[#F4C542] via-[#063B2F] to-[#10B981] shadow-[0_0_50px_rgba(6,59,47,0.6)]`}>
              <div className={`w-full h-full ${shapeClass} bg-[#063B2F] p-[6px] overflow-hidden relative`}>
                
                <img
                  src={displayPhotoUrl}
                  alt={displayName}
                  onError={(e) => { e.currentTarget.src = DEMO_PHOTO_ASSET; }}
                  className={`w-full h-full object-cover ${shapeClass} ${focalClass} transition-all`}
                  style={{
                    transform: `scale(${data.photoZoom || 1.0}) translate(${data.photoOffsetX || 0}%, ${data.photoOffsetY || 0}%) rotate(${rotation}deg)`,
                    filter: filterStyle
                  }}
                />

                <div className="absolute inset-0 bg-scanline pointer-events-none opacity-30" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-xl bg-[#063B2F]/90 backdrop-blur-md border border-[#10B981]/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                    <span className="text-[12px] font-mono-code font-bold text-white tracking-widest uppercase">
                      STATUS: {statusText}
                    </span>
                  </div>
                  <Zap className="w-4 h-4 text-[#F4C542]" />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <h1 className={`${data.aspectRatio === '1:1' ? 'text-[44px]' : 'text-[52px]'} font-extrabold tracking-tight text-white uppercase font-heading leading-none drop-shadow-md`}>
                {displayName}
              </h1>
              
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="px-4 py-1 rounded-full bg-[#063B2F] border border-[#10B981] text-[16px] font-mono-code font-bold text-[#10B981] uppercase">
                  {displayRole}
                </span>
                <span className="flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#082C2A] border border-[#F4C542]/50 text-[15px] font-mono-code text-[#F4C542] font-bold">
                  <AtSign className="w-3.5 h-3.5 text-[#F4C542]" />
                  {displayHandle}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="relative z-10 text-center space-y-3 max-w-[900px] mx-auto w-full">
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#F4C542]" />
              <p className="text-[26px] font-extrabold font-mono-code text-[#F4C542] tracking-wider uppercase drop-shadow">
                {displayTitle}
              </p>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#F4C542]" />
            </div>

            {data.stack.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-0.5">
                {data.stack.slice(0, 5).map((tech, i) => (
                  <span key={i} className="px-3.5 py-1 rounded-xl text-[15px] font-mono-code font-semibold bg-[#063B2F] text-[#FFF7E6] border border-[#10B981]/50 shadow">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-4 border-t border-[#10B981]/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="px-5 py-2 rounded-xl bg-[#F0644F] text-white font-mono-code font-extrabold text-[18px] tracking-wider shadow-lg">
                #FrameInGoa
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-white font-heading tracking-widest uppercase">
                  {mottoText}
                </p>
                <p className="text-[11px] font-mono-code text-[#E9F0EA]/70 uppercase">
                  OCT 28–31, 2026 • GOA, INDIA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="flex items-center justify-end gap-1 text-[11px] font-mono-code text-[#10B981] uppercase font-bold">
                  HH GOA 2026
                </div>
                <p className="text-[10px] font-mono-code text-gray-300">
                  BUILDER ID: {builderIdCode}
                </p>
              </div>
              <div className="w-[54px] h-[54px] rounded-xl bg-[#FFF7E6] p-1.5 flex items-center justify-center shadow-md">
                <QrCode className="w-full h-full text-[#063B2F]" />
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
