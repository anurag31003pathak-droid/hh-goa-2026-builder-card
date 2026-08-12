import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, AlertCircle, CheckCircle2, Focus } from 'lucide-react';
import { processUploadedImage } from '../utils/fileUtils';

interface UploadZoneProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
  focalPosition?: 'center' | 'top' | 'bottom';
  onFocalChange?: (pos: 'center' | 'top' | 'bottom') => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  photoUrl,
  onPhotoChange,
  focalPosition = 'top',
  onFocalChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await processUploadedImage(file);
      if (result.error) {
        setErrorMessage(result.error);
        onPhotoChange(null);
      } else if (result.dataUrl) {
        onPhotoChange(result.dataUrl);
      }
    } catch (err) {
      setErrorMessage('Failed to process image. Please try another photo.');
    } finally {
      setIsLoading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-[#F4C542] tracking-wide font-heading uppercase">
          1. YOUR PHOTO <span className="text-red-400">*</span>
        </label>
        <span className="text-xs text-gray-400 font-mono-code">
          JPG, PNG, HEIC (iPhone)
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        accept="image/jpeg,image/png,image/jpg,image/heic,image/heif,.heic,.heif"
        className="hidden"
      />

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {!photoUrl ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer transition-all duration-200 rounded-xl p-6 sm:p-8 text-center border-2 border-dashed flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-[#00FF9D] bg-[#073F2A]/60 shadow-[0_0_30px_rgba(0,255,157,0.25)] scale-[1.01]'
              : 'border-[#0B6B43]/60 bg-[#071A18]/80 hover:border-[#F4C542] hover:bg-[#073F2A]/30'
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <RefreshCw className="w-8 h-8 text-[#00FF9D] animate-spin" />
              <p className="text-sm text-[#00FF9D] font-mono-code font-semibold animate-pulse">
                Processing & optimizing photo...
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-full bg-[#073F2A]/80 border border-[#0B6B43] shadow-[0_0_15px_rgba(0,255,157,0.1)]">
                <Upload className="w-7 h-7 text-[#F4C542]" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-white font-heading">
                  Drop your photo here
                </p>
                <p className="text-xs text-gray-400">
                  or <span className="text-[#00FF9D] underline font-semibold">Choose a photo</span> from your device
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="px-2 py-0.5 text-[10px] font-mono-code rounded bg-[#073F2A] text-gray-300">iPhone HEIC supported</span>
                <span className="px-2 py-0.5 text-[10px] font-mono-code rounded bg-[#073F2A] text-gray-300">Auto face alignment</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl border border-[#0B6B43] bg-[#073F2A]/40 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#00FF9D]">
              <CheckCircle2 className="w-4 h-4 text-[#00FF9D]" />
              Photo Uploaded
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#073F2A] hover:bg-[#0B6B43] text-[#F4C542] border border-[#0B6B43] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Replace
              </button>
              <button
                type="button"
                onClick={() => onPhotoChange(null)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>

          {/* Preview thumbnail & focal position adjustment */}
          <div className="flex items-center gap-4 pt-1">
            <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#F4C542]/50 shadow-md bg-black shrink-0">
              <img
                src={photoUrl}
                alt="Uploaded photo preview"
                className={`w-full h-full object-cover ${
                  focalPosition === 'top' ? 'object-top' : focalPosition === 'bottom' ? 'object-bottom' : 'object-center'
                }`}
              />
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-gray-300 font-heading">
                <Focus className="w-3.5 h-3.5 text-[#F4C542]" /> Focal Alignment:
              </div>
              <div className="flex items-center gap-1">
                {(['top', 'center', 'bottom'] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => onFocalChange && onFocalChange(pos)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code uppercase transition-colors ${
                      focalPosition === pos
                        ? 'bg-[#F4C542] text-[#071A18] font-bold shadow'
                        : 'bg-[#071A18] text-gray-400 hover:text-white border border-[#0B6B43]'
                    }`}
                  >
                    {pos === 'top' ? 'Face (Top)' : pos === 'center' ? 'Center' : 'Bottom'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">
                Ensures your face is centered inside your builder badge frame.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
