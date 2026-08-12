import React, { useState } from 'react';
import { PRESET_ROLES, POPULAR_STACK_TAGS, STATUS_BADGES, PRESET_MOTTOS, CardThemeId, AspectRatioType } from '../types/builder';
import { FrameSelector } from './FrameSelector';
import { AspectSelector } from './AspectSelector';
import { Shuffle, Plus, X, Sparkles, User, Briefcase, Code, AtSign, Quote, Award } from 'lucide-react';

interface BuilderFormProps {
  name: string;
  onNameChange: (name: string) => void;
  role: string;
  onRoleChange: (role: string) => void;
  customRole: string;
  onCustomRoleChange: (customRole: string) => void;
  stack: string[];
  onStackChange: (stack: string[]) => void;
  title: string;
  onShuffleTitle: () => void;
  socialHandle: string;
  onSocialHandleChange: (handle: string) => void;
  motto: string;
  onMottoChange: (motto: string) => void;
  statusBadge: string;
  onStatusBadgeChange: (badge: string) => void;
  frameTheme: CardThemeId;
  onFrameThemeChange: (theme: CardThemeId) => void;
  aspectRatio: AspectRatioType;
  onAspectRatioChange: (aspect: AspectRatioType) => void;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({
  name,
  onNameChange,
  role,
  onRoleChange,
  customRole,
  onCustomRoleChange,
  stack,
  onStackChange,
  title,
  onShuffleTitle,
  socialHandle,
  onSocialHandleChange,
  motto,
  onMottoChange,
  statusBadge,
  onStatusBadgeChange,
  frameTheme,
  onFrameThemeChange,
  aspectRatio,
  onAspectRatioChange
}) => {
  const [customStackInput, setCustomStackInput] = useState('');

  const handleAddStackTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (!trimmed) return;
    if (stack.length >= 5) return;
    if (stack.some(s => s.toLowerCase() === trimmed.toLowerCase())) return;

    onStackChange([...stack, trimmed]);
    setCustomStackInput('');
  };

  const handleRemoveStackTag = (indexToRemove: number) => {
    onStackChange(stack.filter((_, idx) => idx !== indexToRemove));
  };

  const handleStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddStackTag(customStackInput);
    }
  };

  return (
    <div className="w-full space-y-5">
      <AspectSelector selectedAspect={aspectRatio} onAspectSelect={onAspectRatioChange} />
      <FrameSelector selectedTheme={frameTheme} onThemeSelect={onFrameThemeChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="builder-name-input" className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase">
            YOUR NAME <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User className="w-4 h-4 text-[#10B981]" />
            </div>
            <input
              id="builder-name-input"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Anurag Pathak"
              maxLength={32}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C542] text-xs font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="social-handle-input" className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase">
            X / GITHUB HANDLE
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <AtSign className="w-4 h-4 text-[#10B981]" />
            </div>
            <input
              id="social-handle-input"
              type="text"
              value={socialHandle}
              onChange={(e) => onSocialHandleChange(e.target.value)}
              placeholder="anuragpathak"
              maxLength={24}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#082C2A] border border-[#8CAAA0]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C542] text-xs font-mono-code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
