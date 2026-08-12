import React, { useEffect, useState } from 'react';
import { Terminal, CheckCircle, Zap } from 'lucide-react';

interface GenerationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const GenerationModal: React.FC<GenerationModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const timer1 = setTimeout(() => {
        setStep(2);
      }, 500);

      const timer2 = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071A18]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-[#072D22] border border-[#00FF9D]/40 shadow-[0_0_50px_rgba(0,255,157,0.25)] text-center space-y-4">
        
        {step === 1 ? (
          <div className="py-4 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#073F2A] border border-[#00FF9D] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              <Terminal className="w-7 h-7 text-[#00FF9D] animate-spin" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">
              Building your identity...
            </h3>
            <p className="text-xs font-mono-code text-[#F4C542]">
              Compiling HH Goa 2026 builder badge
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#073F2A] border border-[#F4C542] flex items-center justify-center shadow-[0_0_20px_rgba(244,197,66,0.4)]">
              <CheckCircle className="w-7 h-7 text-[#F4C542] animate-bounce" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#00FF9D] flex items-center justify-center gap-2">
              Ready! <Zap className="w-5 h-5 text-[#F4C542]" />
            </h3>
            <p className="text-xs font-mono-code text-white">
              Identity verified. #FrameInGoa
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#071A18] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF9D] to-[#F4C542] transition-all duration-500 ease-out"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
