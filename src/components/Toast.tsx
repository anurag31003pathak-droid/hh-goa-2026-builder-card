import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#073F2A] border border-[#00FF9D] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2 text-xs font-mono-code">
        <Sparkles className="w-4 h-4 text-[#F4C542] shrink-0" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
