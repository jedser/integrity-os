import React, { useState } from 'react';
import { Play, X, ChevronRight, ChevronLeft, CheckCircle2, ShieldAlert, Sparkles, Eye, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, projectId?: string) => void;
}

export const DemoTourModal: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Executive Integrity Dashboard',
      subtitle: 'Real-time overview of active commitments, total resources, and project integrity scores.',
      actionText: 'Go to Dashboard',
      targetView: 'dashboard',
      description: 'Observe the overall Integrity Score (79/100 average) across 4 active post-conflict recovery projects in Tigray. Notice how project TIG-REC-2026-02 is flagged as "At Risk" (Score: 62/100).',
      badge: 'Step 1 of 6',
      icon: Eye
    },
    {
      title: '2. Select Project "Adigrat Water Reactivation"',
      subtitle: 'Explore single-project workspace with connected commitments and evidence.',
      actionText: 'View Adigrat Project Workspace',
      targetView: 'projects',
      projectId: 'p-2',
      description: 'Project TIG-REC-2026-02 aims to reactivate 14 water wellheads for 38,000 residents in Eastern Tigray. Notice how budget execution is at $480k / $640k, but integrity is "At Risk".',
      badge: 'Step 2 of 6',
      icon: Play
    },
    {
      title: '3. Inspect Commitment Discrepancy',
      subtitle: 'Identify overdue commitments and missing deliverables.',
      actionText: 'Inspect Commitments Tracker',
      targetView: 'commitments',
      projectId: 'p-2',
      description: 'Look at Commitment c-201 ("Borehole Solar Submersible Pumps Procurement"). Contract paid for 14 Grundfos pumps, but warehouse logs only account for 9 pumps received ($100k discrepancy).',
      badge: 'Step 3 of 6',
      icon: ShieldAlert
    },
    {
      title: '4. Open Evidence Vault & Hash Fingerprints',
      subtitle: 'Verify immutable physical evidence records with cryptographic hashes.',
      actionText: 'Open Evidence Vault',
      targetView: 'evidence',
      projectId: 'p-2',
      description: 'Open Evidence Item e-4 ("Adigrat Central Warehouse Receiving Slip"). Notice the status is FLAGGED by automated inventory checks. Every evidence item features a SHA-256 fingerprint for auditability.',
      badge: 'Step 4 of 6',
      icon: CheckCircle2
    },
    {
      title: '5. Community Participatory Voice',
      subtitle: 'Review direct citizen feedback from the ground.',
      actionText: 'Open Community Voice',
      targetView: 'community',
      projectId: 'p-2',
      description: 'Review Community Report f-1 submitted by local representative Sara Kidanemariam: "5 Solar Pumps Missing from Sector 4 Distribution". Community inputs directly drive risk flags.',
      badge: 'Step 5 of 6',
      icon: Eye
    },
    {
      title: '6. Gemini Integrity AI & Human Action',
      subtitle: 'Run deep AI integrity analysis to explain root causes and recommended human verification.',
      actionText: 'Launch Integrity AI Assistant',
      targetView: 'ai-assistant',
      projectId: 'p-2',
      description: 'Click "Run Gemini AI Analysis" or query: "Which commitments are currently at risk?". Gemini explains: What Happened → Why It Matters → What To Check → Recommended Action.',
      badge: 'Step 6 of 6',
      icon: Sparkles
    }
  ];

  const step = steps[currentStep];
  const Icon = step.icon;

  const handleExecuteAction = () => {
    onNavigate(step.targetView, step.projectId);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-6">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {step.badge} — Guided 2-Minute Review Tour
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {step.title}
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {step.subtitle}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentStep 
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-400' 
                  : idx < currentStep 
                    ? 'w-2 bg-indigo-300 dark:bg-indigo-700' 
                    : 'w-2 bg-slate-200 dark:bg-slate-800'
              }`}
              title={`Jump to ${s.title}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleExecuteAction}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <span>{step.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
