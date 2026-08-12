import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Info, X, CheckCircle2 } from 'lucide-react';
import { IntegrityStatus, IntegrityScoreBreakdown } from '../types';

interface Props {
  score: number;
  status: IntegrityStatus;
  breakdown?: IntegrityScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const IntegrityScoreBadge: React.FC<Props> = ({ 
  score, 
  status, 
  breakdown,
  size = 'md',
  showLabel = true 
}) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case 'Strong':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          icon: ShieldCheck,
          accent: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'Watch':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500',
          icon: Info,
          accent: 'text-amber-600 dark:text-amber-400'
        };
      case 'At Risk':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
          dot: 'bg-orange-500',
          icon: AlertTriangle,
          accent: 'text-orange-600 dark:text-orange-400'
        };
      case 'Critical':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
          dot: 'bg-rose-500',
          icon: ShieldAlert,
          accent: 'text-rose-600 dark:text-rose-400'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-800 border-slate-200',
          dot: 'bg-slate-500',
          icon: Info,
          accent: 'text-slate-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3.5 py-1.5 space-x-2'
  }[size];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center font-medium rounded-full border transition-all hover:scale-105 ${config.bg} ${sizeClasses} cursor-pointer shadow-xs`}
        title="Click to view explainable integrity breakdown"
      >
        <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <Icon className="w-3.5 h-3.5" />
        <span className="font-semibold">{score}/100</span>
        {showLabel && <span className="opacity-90 font-medium">({status})</span>}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-5">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-2xl ${config.bg} border`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Integrity Status: {status}
                  </h3>
                  <span className={`text-lg font-bold ${config.accent}`}>
                    {score}/100
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Explainable Project Integrity Assessment Model
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              {breakdown?.explanation || `This score measures transparent project execution based on commitment fulfillment, verified physical evidence, and resolved community reports.`}
            </p>

            {breakdown && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Methodology Factors Breakdown
                </h4>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 dark:text-slate-300 font-medium">
                      <span>Commitment Completion (Max 35 pts)</span>
                      <span className="font-semibold">{breakdown.factors.commitmentCompletionScore}/35</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(breakdown.factors.commitmentCompletionScore / 35) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 dark:text-slate-300 font-medium">
                      <span>Evidence Physical Coverage (Max 25 pts)</span>
                      <span className="font-semibold">{breakdown.factors.evidenceCoverageScore}/25</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(breakdown.factors.evidenceCoverageScore / 25) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 dark:text-slate-300 font-medium">
                      <span>Independent Verification Rate (Max 20 pts)</span>
                      <span className="font-semibold">{breakdown.factors.verificationRateScore}/20</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(breakdown.factors.verificationRateScore / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 dark:text-slate-300 font-medium">
                      <span>Risk Control & Mitigation (Max 10 pts)</span>
                      <span className="font-semibold">{breakdown.factors.riskMitigationScore}/10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(breakdown.factors.riskMitigationScore / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 dark:text-slate-300 font-medium">
                      <span>Community Feedback Resolution (Max 10 pts)</span>
                      <span className="font-semibold">{breakdown.factors.feedbackResolutionScore}/10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(breakdown.factors.feedbackResolutionScore / 10) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {breakdown?.recommendations && breakdown.recommendations.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Recommended Actions to Improve Score:
                </h4>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {breakdown.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl text-xs font-medium hover:opacity-90 transition"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
