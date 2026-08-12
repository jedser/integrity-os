import React from 'react';
import { ShieldCheck, Sparkles, Scale } from 'lucide-react';

export const ResponsibleAIBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-md border border-indigo-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Responsible AI Standard
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-mono">
                Gemini 3.6 Flash
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white mt-0.5">
              AI-generated analysis — human verification required
            </h4>
            <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed max-w-2xl">
              Integrity-OS strictly isolates <strong className="text-white">Recorded Evidence</strong> (immutable facts, hashes, receipts) from <strong className="text-white">AI Interpretations</strong> (probabilistic anomaly flags). Gemini does not invent missing data.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-medium text-indigo-200/90 bg-indigo-900/40 px-3 py-2 rounded-xl border border-indigo-800/60 shrink-0 self-start md:self-center">
          <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Evidence vs Interpretation Safeguard</span>
        </div>
      </div>
    </div>
  );
};
