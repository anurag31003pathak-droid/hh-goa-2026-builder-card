import React, { useState } from 'react';
import { Download, RefreshCw, Check, Sparkles, Twitter, Linkedin, Dices } from 'lucide-react';
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

  const handleShareToLinkedIn = () => {
    const nameToUse = userName.trim() || 'Builder';
    const linkedinCaption = `Excited to share my Hacker House Goa 2026 Builder ID Card! 🏝️⚡\n\nReady to build, experiment, and collaborate with top builders in Goa, India.\n\n📅 Event: OCT 28–31, 2026\n📍 Location: Goa, India\n\n#FrameInGoa #HackerHouseGoa #BuildInGoa #Web3 #AI`;
    
    // Copy caption to clipboard for user convenience
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkedinCaption).catch(() => {});
    }

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(linkedinCaption)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');

    onToast('Opened LinkedIn Share! Caption copied to clipboard. 🚀');
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

      {/* Main Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#F4C542] via-[#FFD700] to-[#F4C542] text-[#063B2F] font-bold font-heading text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,197,66,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-950" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>↓ DOWNLOAD PNG</span>
            </>
          )}
        </button>

        {/* Share to X Button */}
        <button
          type="button"
          onClick={handleShareToX}
          className="py-3 px-4 rounded-xl bg-[#063B2F] hover:bg-[#10B981] text-white border border-[#10B981]/50 font-bold font-heading text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Twitter className="w-4 h-4 text-[#F4C542]" />
          <span>𝕏 SHARE TO X</span>
        </button>

        {/* Share to LinkedIn Button */}
        <button
          type="button"
          onClick={handleShareToLinkedIn}
          className="py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold font-heading text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(10,102,194,0.3)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Linkedin className="w-4 h-4 text-white" />
          <span>in LINKEDIN</span>
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
