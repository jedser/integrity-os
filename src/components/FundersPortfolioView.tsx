import React, { useState } from 'react';
import { 
  Building2, ShieldAlert, CheckCircle2, AlertTriangle, 
  Search, ExternalLink, Sparkles, PieChart, Layers, Download, Check
} from 'lucide-react';
import { Project, Commitment, RiskItem } from '../types';
import { IntegrityScoreBadge } from './IntegrityScoreBadge';

interface Props {
  projects: Project[];
  commitments: Commitment[];
  risks: RiskItem[];
  onSelectProject: (id: string) => void;
  onNavigate: (view: string, projectId?: string) => void;
}

export const FundersPortfolioView: React.FC<Props> = ({
  projects,
  commitments,
  risks,
  onSelectProject,
  onNavigate,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Status Counts
  const strongProjects = projects.filter(p => p.integrityStatus === 'Strong');
  const watchProjects = projects.filter(p => p.integrityStatus === 'Watch');
  const atRiskProjects = projects.filter(p => p.integrityStatus === 'At Risk');
  const criticalProjects = projects.filter(p => p.integrityStatus === 'Critical');

  const filteredProjects = projects.filter(p => {
    const matchesStatus = selectedStatusFilter === 'ALL' || p.integrityStatus === selectedStatusFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.funder.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Portfolio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-indigo-600/30 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Layers className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Portfolio Intelligence Infrastructure
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Funders & Donors Portfolio View
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Real-time portfolio-level risk monitoring, evidence coverage tracking, and automated compliance auditing for development agencies and impact funders.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center space-x-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Portfolio Audit</span>
          </button>
        </div>
      </div>

      {/* Portfolio Distribution Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Strong */}
        <div 
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'Strong' ? 'ALL' : 'Strong')}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
            selectedStatusFilter === 'Strong' 
              ? 'bg-emerald-950/80 border-emerald-500 text-white ring-2 ring-emerald-500/40' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
          }`}
        >
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>STRONG INTEGRITY</span>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {strongProjects.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Verified evidence & high delivery
            </p>
          </div>
        </div>

        {/* Watch */}
        <div 
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'Watch' ? 'ALL' : 'Watch')}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
            selectedStatusFilter === 'Watch' 
              ? 'bg-amber-950/80 border-amber-500 text-white ring-2 ring-amber-500/40' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
          }`}
        >
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>WATCH LIST</span>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {watchProjects.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Minor evidence gaps or delays
            </p>
          </div>
        </div>

        {/* At Risk */}
        <div 
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'At Risk' ? 'ALL' : 'At Risk')}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
            selectedStatusFilter === 'At Risk' 
              ? 'bg-rose-950/80 border-rose-500 text-white ring-2 ring-rose-500/40' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-500/50'
          }`}
        >
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>AT RISK</span>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {atRiskProjects.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Significant overdue commitments
            </p>
          </div>
        </div>

        {/* Critical */}
        <div 
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'Critical' ? 'ALL' : 'Critical')}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
            selectedStatusFilter === 'Critical' 
              ? 'bg-rose-950/80 border-rose-600 text-white ring-2 ring-rose-600/40' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-600/50'
          }`}
        >
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>CRITICAL ATTENTION</span>
            </div>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
              {criticalProjects.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Unresolved community complaints
            </p>
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter portfolio projects by title, code, or funder..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <span>Filter Status:</span>
          {['ALL', 'Strong', 'Watch', 'At Risk', 'Critical'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                selectedStatusFilter === st 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-indigo-500" />
            <span>Funded Projects Portfolio Directory ({filteredProjects.length})</span>
          </h3>
          <span className="text-xs text-slate-500">
            Click any row to drill down into commitments & evidence
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Project Code & Name</th>
                <th className="px-6 py-3">Funder / Donor</th>
                <th className="px-6 py-3">Budget Execution</th>
                <th className="px-6 py-3">Integrity Rating</th>
                <th className="px-6 py-3">AI Risk Assessment</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {filteredProjects.map((p) => {
                const projectCommitments = commitments.filter(c => c.projectId === p.id);
                const projectRisks = risks.filter(r => r.projectId === p.id);
                
                return (
                  <tr 
                    key={p.id}
                    onClick={() => onSelectProject(p.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {p.code} • {p.region}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {p.funder}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        ${p.budgetSpent.toLocaleString()} / ${p.budgetAllocated.toLocaleString()}
                      </div>
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (p.budgetSpent / (p.budgetAllocated || 1)) * 100)}%` }}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <IntegrityScoreBadge score={p.integrityScore} status={p.integrityStatus} />
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {projectRisks.length > 0 ? (
                        <span className="text-rose-600 dark:text-rose-400 font-medium text-[11px] flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{projectRisks.length} open risk flag(s)</span>
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px] flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>No critical risks</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(p.id);
                          onNavigate('projects', p.id);
                        }}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commercial Productized Services Tiers */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Commercial Tier & Business Operating Model
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Integrity-OS Productized Subscriptions
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
            Professional Services Access Category
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          
          {/* Tier 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">Integrity-OS Starter</div>
            <div className="text-2xl font-black text-white">$490 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-300">For local CSOs and single-project implementations.</p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> 1 Active Project</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Basic Evidence Vault</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Community Voice Box</li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-950 border border-indigo-500/60 ring-2 ring-indigo-500/20 rounded-2xl p-4 space-y-3 relative">
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
              MOST POPULAR
            </span>
            <div className="text-xs font-bold uppercase text-indigo-300">Integrity-OS Professional</div>
            <div className="text-2xl font-black text-white">$1,850 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-300">For international NGOs and multi-project agencies.</p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Up to 10 Active Projects</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Full Gemini Integrity Copilot</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Contradiction Engine</li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">Integrity-OS Portfolio</div>
            <div className="text-2xl font-black text-white">$4,500 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-300">For institutional funders, development banks & donors.</p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Unlimited Portfolio Projects</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Custom Donor Audit Exports</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Dedicated Risk Agent Support</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
