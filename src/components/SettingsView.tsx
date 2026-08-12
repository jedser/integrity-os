import React, { useState } from 'react';
import { 
  Settings, Users, Key, Database, ShieldCheck, 
  CheckCircle2, RefreshCw, Layers, Server
} from 'lucide-react';
import { api } from '../lib/api';

interface Props {
  onResetSeedData: () => Promise<void>;
}

export const SettingsView: React.FC<Props> = ({ onResetSeedData }) => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const rolesMatrix = [
    {
      role: 'Administrator',
      desc: 'Full platform authority, project creation, role management, system audit configuration.',
      permissions: ['Create & Edit Projects', 'Manage All Commitments', 'Approve Evidence', 'Run AI Scans', 'Export Reports']
    },
    {
      role: 'Project Manager',
      desc: 'Manages specific regional projects, tracks milestones, verifies field evidence.',
      permissions: ['Create Commitments', 'Upload Evidence', 'Verify Field Submissions', 'Run AI Scans', 'Export Reports']
    },
    {
      role: 'Field Implementer / NGO',
      desc: 'Executes field work, uploads proof of delivery, storehouse receipts, and photo geotags.',
      permissions: ['View Projects', 'Update Commitment Progress', 'Upload Evidence Items', 'Submit Field Notes']
    },
    {
      role: 'Community Resident',
      desc: 'Local community member submitting ground-level observations and feedback.',
      permissions: ['Submit Anonymous Feedback', 'View Public Integrity Scores', 'Track Resolution Notes']
    },
    {
      role: 'Donor / Funder Observer',
      desc: 'External oversight agency reviewing budget execution, commitment completion, and risk flags.',
      permissions: ['View All Projects & Scores', 'Inspect Evidence Vault', 'Run AI Integrity Audit', 'Download Reports']
    }
  ];

  const handleReset = async () => {
    setIsResetting(true);
    await onResetSeedData();
    setIsResetting(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          <span>System Settings & Stakeholder Access Matrix</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Role-Based Access Control (RBAC), environment configurations, and database state management
        </p>
      </div>

      {/* Role-Based Access Control (RBAC) Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Stakeholder Role & Permissions Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolesMatrix.map((r, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{r.role}</span>
                <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {r.desc}
              </p>
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Granted Capabilities:
                </span>
                <ul className="space-y-1">
                  {r.permissions.map((p, i) => (
                    <li key={i} className="flex items-center space-x-1 text-[11px] text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Server & Environment Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* System Architecture Status */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-500" />
            <span>Environment & Security Status</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Server Architecture</strong>
                <span className="text-[11px] text-slate-500">Express Node backend on Port 3000</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                Active & Healthy
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Gemini AI Key Isolation</strong>
                <span className="text-[11px] text-slate-500">Server-side proxy (`process.env.GEMINI_API_KEY`)</span>
              </div>
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full font-bold text-[10px]">
                Secured
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Cryptographic Hash Verification</strong>
                <span className="text-[11px] text-slate-500">SHA-256 evidence integrity hashing</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Database Management */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Database className="w-4 h-4 text-indigo-500" />
            <span>Database Management & Seed Control</span>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Integrity-OS operates on a relational state model. You can reset state back to original Tigray post-conflict seed data at any time.
          </p>

          <div className="pt-2">
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{isResetting ? 'Resetting Data...' : 'Reset Demo Seed Data'}</span>
            </button>

            {resetSuccess && (
              <p className="text-xs text-emerald-600 font-semibold mt-2 animate-in fade-in">
                ✓ Seed data successfully re-initialized!
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
