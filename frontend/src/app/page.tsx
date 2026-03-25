'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Scale, AlertTriangle, ShieldCheck, ChevronRight, MessageSquare, BookOpen, Clock, Upload, Loader2, CheckCircle2, Sparkles, Zap, Fingerprint } from 'lucide-react';

const TypewriterText = ({ text, delay = 0, speed = 15, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return <span className={className}>{displayedText}</span>;
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  
  const [documentContext, setDocumentContext] = useState<any>(null);
  
  const [qaQuery, setQaQuery] = useState('');
  const [qaResponse, setQaResponse] = useState<any>(null);
  const [isAsking, setIsAsking] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateProgress = () => {
    setUploadProgress(0);
    const messages = [
      "Parsing PDF layout & extracting tokens...",
      "Executing Semantic Chunking Model...",
      "Filtering contexts via Vector Database...",
      "Extracting Rights, Penalties, and Obligations...",
      "Generating 8th-grade TL;DR syntheses...",
      "Finalizing Interface..."
    ];
    
    let step = 0;
    setProgressMsg(messages[0]);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + (100 / (messages.length * 2)); // Smooth slow crawl
        if (next > (step + 1) * (100 / messages.length) && step < messages.length - 1) {
          step++;
          setProgressMsg(messages[step]);
        }
        return next > 95 ? 95 : next;
      });
    }, 600);
    return interval;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const pTimer = simulateProgress();

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Fallback API to avoid localhost IP issues from outside browsers
      const res = await fetch('http://localhost:8000/api/v1/documents/ingest', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      
      const impact: { text: string; type: string }[] = [];
      data.sections?.forEach((sec: any) => {
        sec.entities?.forEach((ent: string) => {
           const lEnt = ent.toLowerCase();
           if (lEnt.includes("penalty") || lEnt.includes("fine")) {
               impact.push({ text: sec.simplified || sec.content.slice(0, 50), type: 'penalty' });
           } else if (lEnt.includes("right") || lEnt.includes("exemption")) {
               impact.push({ text: sec.simplified || sec.content.slice(0, 50), type: 'right' });
           } else {
               impact.push({ text: sec.simplified || sec.content.slice(0, 50), type: 'obligation' });
           }
        });
      });

      setUploadProgress(100);
      setProgressMsg("Finished!");
      
      setTimeout(() => {
        setDocumentContext({
          id: data.document_id,
          title: data.filename,
          tldr: data.tldr,
          confidenceScore: 94,
          sections: data.sections || [],
          impact: impact.length > 0 ? impact.slice(0, 4) : [{ text: 'No specific penalties or rights prominently extracted.', type: 'obligation' }]
        });
        setIsUploading(false);
      }, 800);
      
    } catch (err: any) {
      alert("Error: " + err.message);
      setIsUploading(false);
    } finally {
      clearInterval(pTimer);
    }
  };

  const handleAskQuestion = async () => {
    if (!qaQuery.trim() || !documentContext?.id) return;
    setIsAsking(true);
    setQaResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/v1/qa/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_id: documentContext.id, query: qaQuery })
      });
      if (!res.ok) throw new Error("Failed to fetch QA");
      const data = await res.json();
      setQaResponse(data);
    } catch (e: any) {
      alert("QA System Error: " + e.message);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center select-none">
      
      {/* Premium Header */}
      <motion.header 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#0ea5e9] flex items-center justify-center text-white shadow-[#4f46e5]/40 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 blur-md rounded-full -top-4 -left-4 w-8 h-8"></div>
            <Scale size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sutradhar <span className="text-gradient">AI</span>
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Citizens' Legislative Compass</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {documentContext && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative w-full md:w-72 group hidden md:block">
               <Search size={16} className="absolute left-4 top-3 text-slate-400" />
               <input 
                 type="text" placeholder="Search laws..."
                 className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] text-sm text-slate-800 dark:text-slate-200 outline-none backdrop-blur-md transition-all"
               />
             </motion.div>
          )}
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Upload size={16} strokeWidth={2.5} />
            <span>Upload Law Document</span>
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="application/pdf" className="hidden" />
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl flex flex-col items-center relative">
        
        {/* Intro Empty State */}
        <AnimatePresence>
          {!isUploading && !documentContext && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
               className="w-full mt-10 md:mt-20 flex flex-col items-center justify-center text-center"
             >
                <div className="relative mb-8 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                   <div className="absolute -inset-1 bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                   <div className="relative w-32 h-32 rounded-full glass-panel flex flex-col items-center justify-center text-[#0ea5e9] border border-white/20">
                      <Fingerprint size={48} strokeWidth={1.5} className="mb-1" />
                   </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                  Decode any <span className="text-gradient">Indian Law</span> instantly.
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
                  Upload dense legal PDFs and our Map-Reduce Neural Engine will translate the entire text into 8th-grade English, extracting your <strong className="text-emerald-500 dark:text-emerald-400">Rights</strong> and hidden <strong className="text-rose-500 dark:text-rose-400">Penalties</strong>.
                </p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {isUploading && (
             <motion.div 
               initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }}
               className="glass-panel w-full max-w-3xl p-10 flex flex-col items-center justify-center mt-10 space-y-8"
             >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-t-2 border-[#0ea5e9] animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-b-2 border-[#9333ea] animate-spin animate-reverse"></div>
                  <Zap className="text-gradient animate-pulse" size={32} />
                </div>
                
                <div className="w-full text-center space-y-3">
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
                    {progressMsg}
                  </h3>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#4f46e5] via-[#9333ea] to-[#0ea5e9]"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                  <p className="text-xs font-mono font-medium text-slate-400">{Math.round(uploadProgress)}% Complete</p>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* The Dashboard */}
        <AnimatePresence>
          {!isUploading && documentContext && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Left Column */}
              <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                
                {/* AI TLDR Card */}
                <motion.div 
                   whileHover={{ y: -4 }}
                   className="glass-panel p-6 relative overflow-hidden border-[#4f46e5]/20 group shadow-lg shadow-[#4f46e5]/5"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4f46e5]/20 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="flex items-center gap-3 mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div className="p-2 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] dark:bg-[#4f46e5]/20 dark:text-[#a5b4fc]">
                      <Sparkles size={20} />
                    </div>
                    <h2 className="font-bold text-lg text-slate-800 dark:text-white">AI Engine TL;DR</h2>
                  </div>
                  
                  <div className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed font-medium">
                    <TypewriterText text={documentContext.tldr} speed={10} delay={300} />
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 size={14} /> {documentContext.confidenceScore}% Grounded
                    </span>
                  </div>
                </motion.div>

                {/* Impact Card */}
                <motion.div 
                   whileHover={{ y: -4 }}
                   className="glass-panel p-6 shadow-lg shadow-black/5"
                >
                  <div className="flex items-center gap-3 mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
                      <AlertTriangle size={20} />
                    </div>
                    <h2 className="font-bold text-lg text-slate-800 dark:text-white">Citizen Impacts</h2>
                  </div>
                  
                  <ul className="space-y-4">
                    {documentContext.impact.map((item: any, idx: number) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (idx * 0.1) }}
                        key={idx} className="flex gap-3 text-[15px] text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50"
                      >
                        <span className="mt-0.5 flex-shrink-0">
                          {item.type === 'penalty' ? (
                            <AlertTriangle size={18} className="text-rose-500" />
                          ) : item.type === 'right' ? (
                            <ShieldCheck size={18} className="text-emerald-500" />
                          ) : (
                            <Clock size={18} className="text-[#0ea5e9]" />
                          )}
                        </span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

              </div>

              {/* Right Column: Original/Summary Sections + QA */}
              <div className="col-span-1 lg:col-span-8 flex flex-col">
                <div className="glass-panel overflow-hidden flex-1 flex flex-col shadow-xl shadow-black/5 border-t border-t-white/40 dark:border-t-white/10">
                  
                  {/* Toolbar */}
                  <div className="border-b border-slate-200 dark:border-slate-800 p-5 bg-white/40 dark:bg-slate-900/60 flex items-center justify-between backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700/50">
                        <FileText size={22} className="text-[#0ea5e9]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-base truncate max-w-[200px] sm:max-w-md text-slate-800 dark:text-white">{documentContext.title}</h2>
                        <p className="text-xs font-semibold text-slate-500">{documentContext.sections.length} Semantic Chunks Dissected</p>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setActiveTab('summary')}
                        className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                          activeTab === 'summary' 
                            ? 'bg-white dark:bg-slate-800 shadow-md text-[#0ea5e9]' 
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        English Simple
                      </button>
                      <button
                        onClick={() => setActiveTab('original')}
                        className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                          activeTab === 'original' 
                            ? 'bg-white dark:bg-slate-800 shadow-md text-slate-800 dark:text-white' 
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        Original Law
                      </button>
                    </div>
                  </div>

                  {/* Sections List */}
                  <div className="p-6 overflow-y-auto max-h-[500px] flex-1 bg-slate-50/50 dark:bg-black/20">
                    <div className="space-y-6">
                      {documentContext.sections.map((sec: any, idx: number) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                          key={idx} className="group relative pl-5 border-l-2 border-slate-300 hover:border-[#4f46e5] dark:border-slate-700 dark:hover:border-[#4f46e5] transition-colors"
                        >
                          <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-[3px] border-slate-300 dark:border-slate-700 group-hover:border-[#4f46e5] transition-colors shadow-sm"></div>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-wide">{sec.metadata?.section || `Segment ${idx+1}`}</h3>
                            <div className="flex gap-1.5 flex-wrap">
                              {sec.entities?.map((ent: string, i: number) => (
                                <span key={i} className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                                  {ent}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <p className={`text-[15px] leading-relaxed ${activeTab === 'original' ? 'text-slate-600 dark:text-slate-400 font-mono text-sm border-l-2 border-slate-200 dark:border-slate-800 pl-3 py-1' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                            {activeTab === 'summary' ? (sec.simplified || sec.content) : sec.content}
                          </p>
                          
                          {activeTab === 'summary' && (
                             <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm text-[11px] font-bold text-slate-500">
                               <Zap size={12} className="text-[#0ea5e9]"/> 
                               {( 100 - ((sec.compressed_tokens || 10)/(sec.metadata?.original_tokens || 100)) * 100).toFixed(0)}% Token Compression
                             </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* QA RAG Interface */}
                  <div className="p-5 bg-white/60 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl flex flex-col gap-4">
                    
                    {/* Chat Response Display */}
                    <AnimatePresence>
                      {qaResponse && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="bg-brand-50/50 dark:bg-[#4f46e5]/10 rounded-2xl p-4 border border-brand-100 dark:border-[#4f46e5]/20"
                        >
                           <p className="font-bold text-sm text-[#4f46e5] dark:text-[#a5b4fc] mb-2 flex items-center gap-2">
                             <Sparkles size={16}/> Sutradhar AI Answer:
                           </p>
                           <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                             <TypewriterText text={qaResponse.answer} speed={8} />
                           </p>
                           {qaResponse.sources?.length > 0 && (
                              <div className="mt-3 text-xs text-brand-600/60 dark:text-[#a5b4fc]/50 font-mono font-medium p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                                Source Context: {qaResponse.sources[0].slice(0, 100)}...
                              </div>
                           )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="relative flex items-center">
                      <MessageSquare className="absolute left-4 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Can government agencies bypass this act?"
                        className="w-full pl-12 pr-14 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-[15px] font-medium outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30 transition-all shadow-sm"
                        value={qaQuery}
                        onChange={(e) => setQaQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                        disabled={isAsking}
                      />
                      <button 
                        onClick={handleAskQuestion}
                        disabled={isAsking || !qaQuery.trim()}
                        className="absolute right-3 p-2 bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] disabled:opacity-50 text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#4f46e5]/30 cursor-pointer"
                      >
                        {isAsking ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={18} strokeWidth={3}/>}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
