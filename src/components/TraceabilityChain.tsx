import React from 'react';
import { Wallet, Target, Activity, FileCheck, CheckCircle, Award, TrendingUp, ChevronRight } from 'lucide-react';

export const TraceabilityChain: React.FC = () => {
  const steps = [
    { label: 'Resource', desc: 'Grants & Budgets', icon: Wallet, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' },
    { label: 'Commitment', desc: 'Milestones & Terms', icon: Target, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800' },
    { label: 'Action', desc: 'Field Work', icon: Activity, color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800' },
    { label: 'Evidence', desc: 'Photos, Receipts, GPS', icon: FileCheck, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' },
    { label: 'Verification', desc: 'Audit & Geotags', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' },
    { label: 'Outcome', desc: 'Deliverables Completed', icon: Award, color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' },
    { label: 'Impact', desc: 'Community Value', icon: TrendingUp, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            End-to-End Integrity Traceability Engine
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          Traceable Chain of Accountability
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative group">
              <div className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all duration-200 hover:shadow-xs hover:-translate-y-0.5 ${step.color}`}>
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold leading-none">{step.label}</span>
                <span className="text-[10px] opacity-80 mt-1 leading-tight">{step.desc}</span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-700 z-10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
