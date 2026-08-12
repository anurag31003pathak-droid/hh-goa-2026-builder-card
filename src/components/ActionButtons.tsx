import React, { useState } from 'react';
import { Download, RefreshCw, Check, Sparkles, Twitter, Sliders, Dices } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActionButtonsProps {
  onDownload: (scale: number) => Promise<boolean>;
  onReset: () => void;
  onSurpriseMe: () => void;
  userName: string;
  onToast: (msg: string) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDownload,
  onReset,
  onSurpriseMe,
  userName,
  onToast
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [exportQuality, setExportQuality] = useState<number>(2); // 2 = 1080p, 3 = 4K

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const success = await onDownload(exportQuality);
      if (success) {
        setDownloadSuccess(true);
        onToast(`Builder Card PNG exported successfully! 🚀 (${exportQuality === 3 ? '4K Ultra-HD' : '1080p Standard'})`);

        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#10B981', '#F4C542', '#063B2F', '#F0644F', '#FFF7E6']
        });

        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        onToast('Could not export image. Please try again.');
      }
    } catch (err) {
      onToast('Error generating image file.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareToX = () => {
    const tweetText = `Just built my Hacker House Goa 2026 Builder ID 🏝️\n\nReady to build, experiment and ship.\n\n#FrameInGoa`;
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    if (navigator.share) {
      navigator.share({
        title: 'Hacker House Goa 2026 Builder ID',
        text: tweetText,
        url: window.location.href
      }).catch(() => {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      });
    } else {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    onToast('Opened X share intent with #FrameInGoa!');
  };

  return (
    <div className="w-full space-y-4 pt-2">
      
      {/* Top Bar: Surprise Me & Export Resolution */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#082C2A]/90 border border-[#8CAAA0]/30 text-xs">
        <button
          type="button"
          onClick={onSurpriseMe}
          className="w-full sm:w-auto px-3 py-1 rounded-lg bg-[#063B2F] hover:bg-[#F4C542] hover:text-[#063B2F] text-[#F4C542] border border-[#F4C542]/40 font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Dices className="w-4 h-4" /> ✨ SURPRISE ME
        </button>

        <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
          <span className="font-mono-code text-gray-400 text-[11px] mr-1 hidden sm:inline">Export:</span>
          <button
            type="button"
            onClick={() => setExportQuality(2)}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors cursor-pointer ${
              exportQuality === 2
                ? 'bg-[#F4C542] text-[#063B2F] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            1080p
          </button>
          <button
            type="button"
            onClick={() => setExportQuality(3)}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors cursor-pointer ${
              exportQuality === 3
                ? 'bg-[#10B981] text-[#063B2F] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            4K Ultra
          </button>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F4C542] via-[#FFD700] to-[#F4C542] text-[#063B2F] font-bold font-heading text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,197,66,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating PNG...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-5 h-5 text-emerald-950" />
              <span>Card Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>↓ DOWNLOAD PNG</span>
            </>
          )}
        </button>

        {/* Share to X Button */}
        <button
          type="button"
          onClick={handleShareToX}
          className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#063B2F] hover:bg-[#10B981] text-white border border-[#10B981]/50 font-bold font-heading text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Twitter className="w-5 h-5 text-[#F4C542]" />
          <span>𝕏 SHARE TO X</span>
        </button>
      </div>

      {/* Reset Button & Hashtag */}
      <div className="flex items-center justify-between pt-1 px-1">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-mono-code text-gray-400 hover:text-[#F4C542] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> ↻ RESET CARD
        </button>

        <span className="inline-flex items-center gap-1 text-xs font-mono-code font-bold text-[#F0644F] bg-[#063B2F] px-3 py-1 rounded-full border border-[#F4C542]/30">
          <Sparkles className="w-3 h-3 text-[#F4C542]" /> #FrameInGoa
        </span>
      </div>
    </div>
  );
};
