import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { EditorTabs } from './components/EditorTabs';
import { BuilderPreview } from './components/BuilderPreview';
import { ActionButtons } from './components/ActionButtons';
import { GenerationModal } from './components/GenerationModal';
import { Toast } from './components/Toast';
import {
  BuilderData,
  DEFAULT_BUILDER,
  CARD_THEME_OPTIONS,
  CARD_LAYOUT_OPTIONS,
  CARD_BG_OPTIONS,
  VibePreset
} from './types/builder';
import { generateTitle } from './utils/titleGenerator';
import { exportCardAsPng } from './utils/imageGenerator';
import { ArrowRight, AlertCircle, Shield, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  // Always initialize with DEFAULT_BUILDER so inputs are clean empty strings
  const [builderData, setBuilderData] = useState<BuilderData>(DEFAULT_BUILDER);

  const [titleCycleIndex, setTitleCycleIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Clear legacy local storage keys on mount
  useEffect(() => {
    try {
      localStorage.removeItem('hh-goa-builder-data');
      localStorage.removeItem('hh-goa-builder-data-v2');
      localStorage.removeItem('hh-goa-builder-data-v3');
    } catch (err) {
      // Non-blocking
    }
  }, []);

  const handleShuffleTitle = () => {
    setTitleCycleIndex(prev => {
      const nextIndex = prev + 1;
      const currentRole = builderData.role || 'AI Engineer';
      const currentStack = builderData.stack.length > 0 ? builderData.stack : ['React', 'AI', 'Node.js'];
      const nextTitle = generateTitle(currentRole, currentStack, nextIndex);
      setBuilderData(d => ({ ...d, title: nextTitle }));
      return nextIndex;
    });
  };

  const handleApplyPreset = (preset: VibePreset) => {
    if (preset === 'goa') {
      setBuilderData(prev => ({ ...prev, cardBgType: 'goa-beach', cardTheme: '01-goa-sunset', cardBgOverlay: 50 }));
      setToastMessage('🌴 Applied Goa Beach Preset!');
    } else if (preset === 'hacker') {
      setBuilderData(prev => ({ ...prev, cardBgType: 'dark-terminal', cardTheme: '04-terminal-goa', cardBgOverlay: 80 }));
      setToastMessage('⚡ Applied Hacker Terminal Preset!');
    } else if (preset === 'sunset') {
      setBuilderData(prev => ({ ...prev, cardBgType: 'goa-sunset', cardTheme: '01-goa-sunset', cardBgOverlay: 45 }));
      setToastMessage('🌅 Applied Goa Sunset Preset!');
    } else if (preset === 'ocean') {
      setBuilderData(prev => ({ ...prev, cardBgType: 'tropical-ocean', cardTheme: '03-beach-club', cardBgOverlay: 50 }));
      setToastMessage('🌊 Applied Tropical Ocean Preset!');
    } else if (preset === 'minimal') {
      setBuilderData(prev => ({ ...prev, cardBgType: 'minimal-cream', cardTheme: '05-minimal-builder', cardBgOverlay: 30 }));
      setToastMessage('✨ Applied Minimal Pass Preset!');
    }
  };

  const handleSurpriseMe = () => {
    const randomBg = CARD_BG_OPTIONS[Math.floor(Math.random() * CARD_BG_OPTIONS.length)].id;
    const randomTheme = CARD_THEME_OPTIONS[Math.floor(Math.random() * CARD_THEME_OPTIONS.length)].id;
    const randomLayout = CARD_LAYOUT_OPTIONS[Math.floor(Math.random() * CARD_LAYOUT_OPTIONS.length)].id;
    const nextIndex = titleCycleIndex + 1;
    const currentRole = builderData.role || 'AI Engineer';
    const currentStack = builderData.stack.length > 0 ? builderData.stack : ['React', 'AI', 'Node.js'];
    const nextTitle = generateTitle(currentRole, currentStack, nextIndex);

    setTitleCycleIndex(nextIndex);
    setBuilderData(prev => ({
      ...prev,
      cardBgType: randomBg,
      cardTheme: randomTheme,
      cardLayout: randomLayout,
      title: nextTitle
    }));

    setToastMessage('✨ Surprised with new theme, background & title!');
  };

  const handleGenerateClick = () => {
    setValidationError(null);
    setIsGenerating(true);
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    setIsGenerated(true);
    setToastMessage('Your Builder Card is ready! Download or share on X. ⚡');

    if (window.innerWidth < 1024) {
      const previewEl = document.getElementById('preview-section');
      previewEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setIsGenerated(false);
    setBuilderData(DEFAULT_BUILDER);
    setValidationError(null);
    setToastMessage('↻ Reset to default example Builder Card!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPNG = async (scaleFactor: number): Promise<boolean> => {
    if (!cardRef.current) return false;
    const cleanFileName = (builderData.name.trim() || 'Anurag-Pathak').replace(/\s+/g, '-');
    return await exportCardAsPng(cardRef.current, `HH-Goa-2026-${cleanFileName}`, scaleFactor);
  };

  return (
    <div className="min-h-screen bg-goa-beach-studio text-[#FFF7E6] bg-grid-cyber flex flex-col justify-between selection:bg-[#063B2F] selection:text-white">
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-6 pb-2 text-center select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#063B2F]/90 border border-[#F4C542]/30 shadow-md mb-3">
          <span className="text-[11px] font-mono-code font-bold text-[#F4C542] tracking-wider uppercase">
            GOA, INDIA • HACKER HOUSE 2026
          </span>
          <span className="text-[11px] font-mono-code text-[#F0644F] font-bold">
            OCT 28–31, 2026
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight uppercase">
          CREATE YOUR <span className="text-[#F4C542]">BUILDER ID</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#8CAAA0] max-w-xl mx-auto mt-1.5 font-medium">
          Turn your photo and builder identity into a Hacker House Goa 2026 credential made to share.
        </p>
      </section>

      {/* Main Studio Workspace */}
      <main className="w-full max-w-6xl mx-auto px-4 py-4 flex-1">
        
        {validationError && (
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="font-semibold">{validationError}</span>
            </div>
            <button
              onClick={() => setValidationError(null)}
              className="text-red-400 hover:text-white font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* 2-Column Desktop Layout (~42% Editor, ~58% Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Studio Editor Controls (~42% Width) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-studio-panel p-5 sm:p-6 rounded-2xl border border-[#F4C542]/20 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#8CAAA0]/30 pb-3">
                <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F4C542]" /> Builder Studio Controls
                </h3>
                <span className="text-[11px] font-mono-code text-[#10B981] bg-[#063B2F] px-2.5 py-0.5 rounded-full border border-[#10B981]/40">
                  Live Studio
                </span>
              </div>

              {/* 4 Studio Tabs */}
              <EditorTabs
                data={builderData}
                onDataChange={setBuilderData}
                onShuffleTitle={handleShuffleTitle}
                onApplyPreset={handleApplyPreset}
              />

              {/* Main Generate Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateClick}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F4C542] via-[#FFD700] to-[#F4C542] text-[#063B2F] font-extrabold font-heading text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,197,66,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>GENERATE BUILDER CARD</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Live Card Preview (~58% Width) */}
          <div id="preview-section" className="lg:col-span-7 space-y-4">
            <div className="glass-studio-panel p-5 sm:p-6 rounded-2xl border border-[#F4C542]/20 shadow-2xl space-y-4">
              
              {isGenerated && (
                <div className="p-3 rounded-xl bg-[#063B2F] border border-[#10B981] text-center text-xs font-mono-code text-[#10B981] flex items-center justify-center gap-2 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C542]" /> YOUR BUILDER CARD IS READY!
                </div>
              )}

              {/* Live Card Preview */}
              <BuilderPreview data={builderData} cardRef={cardRef} />

              {/* Action Buttons */}
              <ActionButtons
                onDownload={handleDownloadPNG}
                onReset={handleReset}
                onSurpriseMe={handleSurpriseMe}
                userName={builderData.name || 'Anurag Pathak'}
                onToast={(msg) => setToastMessage(msg)}
              />

            </div>
          </div>

        </div>
      </main>

      {/* Generation Modal */}
      <GenerationModal
        isOpen={isGenerating}
        onComplete={handleGenerationComplete}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Footer */}
      <footer className="w-full py-5 text-center text-xs font-mono-code text-[#8CAAA0] border-t border-[#063B2F]/80 mt-8">
        <p>HACKER HOUSE GOA 2026 • BUILDERS • IDEAS • CHAOS • <strong className="text-[#F0644F]">#FrameInGoa</strong></p>
      </footer>
    </div>
  );
};

export default App;
