import React, { useState } from 'react';
import {
  BuilderData,
  RoleType,
  PhotoShape,
  PhotoFilter,
  CardThemeId,
  CardLayoutId,
  CardBgType,
  AspectRatioType,
  VibePreset,
  PRESET_ROLES,
  POPULAR_STACK_TAGS,
  STATUS_BADGES,
  PRESET_MOTTOS,
  ASPECT_RATIO_OPTIONS
} from '../types/builder';
import { UploadZone } from './UploadZone';
import { PhotoEditorControls } from './PhotoEditorControls';
import { StyleSelector } from './StyleSelector';
import { LayoutSelector } from './LayoutSelector';
import { PresetBar } from './PresetBar';
import {
  FileText,
  Image as ImageIcon,
  Palette,
  Layout,
  User,
  Briefcase,
  Sparkles,
  Shuffle,
  Quote,
  AtSign,
  Award,
  Code,
  Plus,
  X,
  Maximize2,
  Check
} from 'lucide-react';

interface EditorTabsProps {
  data: BuilderData;
  onDataChange: (updater: (prev: BuilderData) => BuilderData) => void;
  onShuffleTitle: () => void;
  onApplyPreset: (preset: VibePreset) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  data,
  onDataChange,
  onShuffleTitle,
  onApplyPreset
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'photo' | 'style' | 'layout'>('content');
  const [customStackInput, setCustomStackInput] = useState('');

  const tabs: { id: 'content' | 'photo' | 'style' | 'layout'; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'CONTENT', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'photo', label: 'PHOTO', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'style', label: 'STYLE', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'layout', label: 'LAYOUT', icon: <Layout className="w-3.5 h-3.5" /> }
  ];

  const handleAddStackTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (!trimmed) return;
    if (data.stack.length >= 5) return;
    if (data.stack.some(s => s.toLowerCase() === trimmed.toLowerCase())) return;

    onDataChange(prev => ({ ...prev, stack: [...prev.stack, trimmed] }));
    setCustomStackInput('');
  };

  const handleRemoveStackTag = (indexToRemove: number) => {
    onDataChange(prev => ({ ...prev, stack: prev.stack.filter((_, idx) => idx !== indexToRemove) }));
  };

  return (
    <div className="w-full space-y-3.5">
      
      {/* Quick Vibe Presets Bar */}
      <PresetBar onApplyPreset={onApplyPreset} />

      {/* 4 Studio Tabs Header */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#082C2A]/90 border border-[#8CAAA0]/30 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-mono-code font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#063B2F] text-[#F4C542] border border-[#F4C542]/40 shadow-[0_0_15px_rgba(244,197,66,0.15)]'
                  : 'text-[#8CAAA0] hover:text-white hover:bg-[#063B2F]/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          
          {/* Name & Social Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
                NAME <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => onDataChange(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Anurag Pathak"
                  maxLength={32}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C542] text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
                X / GITHUB HANDLE
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <AtSign className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <input
                  type="text"
                  value={data.socialHandle || ''}
                  onChange={(e) => onDataChange(prev => ({ ...prev, socialHandle: e.target.value }))}
                  placeholder="anuragpathak"
                  maxLength={24}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C542] text-xs font-mono-code"
                />
              </div>
            </div>
          </div>

          {/* Role & Status Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
                ROLE <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Briefcase className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <select
                  value={data.role}
                  onChange={(e) => onDataChange(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full pl-9 pr-7 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white focus:outline-none focus:border-[#F4C542] text-xs font-medium cursor-pointer"
                >
                  {PRESET_ROLES.map((r) => (
                    <option key={r} value={r} className="bg-[#082C2A] text-white">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {data.role === 'Other' && (
                <div className="pt-1">
                  <input
                    type="text"
                    value={data.customRole || ''}
                    onChange={(e) => onDataChange(prev => ({ ...prev, customRole: e.target.value }))}
                    placeholder="Custom role"
                    maxLength={30}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#082C2A] border border-[#F4C542]/60 text-white text-xs"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
                BUILDER STATUS
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Award className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <select
                  value={data.statusBadge || 'READY TO BUILD'}
                  onChange={(e) => onDataChange(prev => ({ ...prev, statusBadge: e.target.value }))}
                  className="w-full pl-9 pr-7 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white focus:outline-none focus:border-[#F4C542] text-xs font-mono-code font-bold cursor-pointer"
                >
                  {STATUS_BADGES.map((b) => (
                    <option key={b} value={b} className="bg-[#082C2A] text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Builder Title */}
          <div className="space-y-1 p-3 rounded-xl bg-[#063B2F]/60 border border-[#8CAAA0]/30">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#10B981] font-heading uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" /> GENERATED TITLE
              </label>
              <button
                type="button"
                onClick={onShuffleTitle}
                className="flex items-center gap-1 px-2 py-0.5 text-xs font-mono-code rounded bg-[#082C2A] text-[#F4C542] hover:bg-[#F4C542] hover:text-[#063B2F] border border-[#F4C542]/40 transition-all cursor-pointer"
              >
                <Shuffle className="w-3 h-3" /> Shuffle
              </button>
            </div>
            <div className="text-sm font-bold font-mono-code text-[#F4C542] text-center py-1 bg-[#082C2A]/90 rounded-lg border border-[#F4C542]/30">
              "{data.title}"
            </div>
          </div>

          {/* Motto / Tagline */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
              CARD TAGLINE / MOTTO
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Quote className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <input
                  type="text"
                  value={data.motto || 'BUILT TO SHIP.'}
                  onChange={(e) => onDataChange(prev => ({ ...prev, motto: e.target.value }))}
                  placeholder="BUILT TO SHIP."
                  maxLength={36}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white focus:outline-none focus:border-[#F4C542] text-xs font-mono-code uppercase font-semibold"
                />
              </div>
              <select
                onChange={(e) => e.target.value && onDataChange(prev => ({ ...prev, motto: e.target.value }))}
                className="px-2 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-xs text-[#10B981] font-mono-code cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Presets...</option>
                {PRESET_MOTTOS.map((m) => (
                  <option key={m} value={m} className="bg-[#082C2A] text-white">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Builder ID */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
              BUILDER ID CODE
            </label>
            <input
              type="text"
              value={data.serialNumber}
              onChange={(e) => onDataChange(prev => ({ ...prev, serialNumber: e.target.value }))}
              placeholder="HH26-ANU-01"
              maxLength={20}
              className="w-full px-3 py-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white text-xs font-mono-code uppercase font-bold"
            />
          </div>

          {/* Stack Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase">
                STACK / SKILLS (MAX 5)
              </label>
              <span className="text-xs font-mono-code text-[#10B981]">
                {data.stack.length}/5 selected
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30">
              {data.stack.length === 0 ? (
                <span className="text-xs text-gray-500 italic p-1">No tags selected...</span>
              ) : (
                data.stack.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-code bg-[#063B2F] text-[#10B981] border border-[#10B981]/40"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveStackTag(index)}
                      className="hover:text-red-400 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {data.stack.length < 5 && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customStackInput}
                  onChange={(e) => setCustomStackInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddStackTag(customStackInput);
                    }
                  }}
                  placeholder="Type tag + Enter"
                  maxLength={16}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#082C2A] border border-[#8CAAA0]/30 text-white text-xs font-mono-code"
                />
                <button
                  type="button"
                  onClick={() => handleAddStackTag(customStackInput)}
                  disabled={!customStackInput.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#063B2F] hover:bg-[#10B981] hover:text-[#063B2F] disabled:opacity-50 text-[#10B981] border border-[#10B981]/40 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: PHOTO */}
      {activeTab === 'photo' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <UploadZone
            photoUrl={data.photoUrl}
            onPhotoChange={(url) => onDataChange(prev => ({ ...prev, photoUrl: url }))}
            focalPosition={data.focalPosition}
            onFocalChange={(pos) => onDataChange(prev => ({ ...prev, focalPosition: pos }))}
          />

          <PhotoEditorControls
            zoom={data.photoZoom}
            onZoomChange={(z) => onDataChange(prev => ({ ...prev, photoZoom: z }))}
            offsetX={data.photoOffsetX}
            onOffsetXChange={(x) => onDataChange(prev => ({ ...prev, photoOffsetX: x }))}
            offsetY={data.photoOffsetY}
            onOffsetYChange={(y) => onDataChange(prev => ({ ...prev, photoOffsetY: y }))}
            rotation={data.photoRotation || 0}
            onRotationChange={(r) => onDataChange(prev => ({ ...prev, photoRotation: r }))}
            focalPosition={data.focalPosition}
            onFocalChange={(pos) => onDataChange(prev => ({ ...prev, focalPosition: pos }))}
            shape={data.photoShape}
            onShapeChange={(s) => onDataChange(prev => ({ ...prev, photoShape: s }))}
            filter={data.photoFilter}
            onFilterChange={(f) => onDataChange(prev => ({ ...prev, photoFilter: f }))}
            cardBgType={data.cardBgType}
            onCardBgTypeChange={(bg) => onDataChange(prev => ({ ...prev, cardBgType: bg }))}
            cardBgOffsetX={data.cardBgOffsetX}
            onCardBgOffsetXChange={(x) => onDataChange(prev => ({ ...prev, cardBgOffsetX: x }))}
            cardBgOffsetY={data.cardBgOffsetY}
            onCardBgOffsetYChange={(y) => onDataChange(prev => ({ ...prev, cardBgOffsetY: y }))}
            cardBgZoom={data.cardBgZoom}
            onCardBgZoomChange={(z) => onDataChange(prev => ({ ...prev, cardBgZoom: z }))}
            cardBgOverlay={data.cardBgOverlay}
            onCardBgOverlayChange={(o) => onDataChange(prev => ({ ...prev, cardBgOverlay: o }))}
          />
        </div>
      )}

      {/* TAB 3: STYLE */}
      {activeTab === 'style' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <StyleSelector
            selectedTheme={data.cardTheme}
            onThemeSelect={(t) => onDataChange(prev => ({ ...prev, cardTheme: t }))}
          />
        </div>
      )}

      {/* TAB 4: LAYOUT */}
      {activeTab === 'layout' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <LayoutSelector
            selectedLayout={data.cardLayout}
            onLayoutSelect={(l) => onDataChange(prev => ({ ...prev, cardLayout: l }))}
          />

          <div className="space-y-2 pt-2 border-t border-[#8CAAA0]/30">
            <label className="block text-xs font-semibold text-[#F4C542] font-heading uppercase flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#10B981]" /> EXPORT ASPECT RATIO
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ASPECT_RATIO_OPTIONS.map((opt) => {
                const isSelected = data.aspectRatio === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onDataChange(prev => ({ ...prev, aspectRatio: opt.id }))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#063B2F] border-[#10B981] shadow'
                        : 'bg-[#082C2A] border-[#8CAAA0]/30 hover:border-[#F4C542]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold font-heading ${isSelected ? 'text-[#F4C542]' : 'text-[#FFF7E6]'}`}>
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
        </div>
      )}

    </div>
  );
};
