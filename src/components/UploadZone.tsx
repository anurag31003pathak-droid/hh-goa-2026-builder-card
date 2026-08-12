import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, AlertCircle, CheckCircle2, Focus } from 'lucide-react';
import { processUploadedImage } from '../utils/fileUtils';
import { DEMO_PHOTO_ASSET } from '../types/builder';

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

  const displayPhoto = photoUrl || DEMO_PHOTO_ASSET;

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
        <label className="block text-xs font-semibold text-[#F4C542] tracking-wide font-heading uppercase">
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

      <div className="relative rounded-xl border border-[#10B981]/40 bg-[#063B2F]/40 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#10B981]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            Photo Active
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#063B2F] hover:bg-[#10B981] hover:text-[#063B2F] text-[#F4C542] border border-[#10B981]/40 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Upload Photo
            </button>
            {photoUrl && (
              <button
                type="button"
                onClick={() => onPhotoChange(null)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset Photo
              </button>
            )}
          </div>
        </div>

        {/* Preview thumbnail & focal position adjustment */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#F4C542]/50 shadow-md bg-black shrink-0">
            <img
              src={displayPhoto}
              alt="Uploaded photo preview"
              onError={(e) => {
                e.currentTarget.src = DEMO_PHOTO_ASSET;
              }}
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
                  className={`px-2.5 py-1 rounded text-[11px] font-mono-code uppercase transition-colors cursor-pointer ${
                    focalPosition === pos
                      ? 'bg-[#F4C542] text-[#063B2F] font-bold shadow'
                      : 'bg-[#082C2A] text-gray-400 hover:text-white border border-[#8CAAA0]/30'
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
    </div>
  );
};
