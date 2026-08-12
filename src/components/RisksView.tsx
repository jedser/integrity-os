import React, { useState } from 'react';
import { 
  AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, 
  HelpCircle, CheckSquare, Search, Filter, ArrowRight, ShieldCheck
} from 'lucide-react';
import { RiskItem, Project, RiskSeverity, RiskCategory } from '../types';

interface Props {
  risks: RiskItem[];
  projects: Project[];
  selectedProjectId: string | null;
  onUpdateRiskStatus: (id: string, updates: Partial<RiskItem>) => Promise<void>;
  onNavigateToAI: (projectId?: string) => void;
}

export const RisksView: React.FC<Props> = ({
  risks,
  projects,
  selectedProjectId,
  onUpdateRiskStatus,
  onNavigateToAI
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  const filteredRisks = risks.filter(r => {
    const matchesProject = !selectedProjectId || r.projectId === selectedProjectId;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || r.severity === severityFilter;
    return matchesProject && matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span>Risk Monitor & Integrity Discrepancies</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automated anomaly flags, storehouse inventory mismatches, and evidence deficits
          </p>
        </div>

        <button
          onClick={() => onNavigateToAI(selectedProjectId || undefined)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-700 hover:to-rose-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>Deep Scan with Integrity AI</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search risk flags, categories, discrepancies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Risks List with 4-Step Explanation Cards */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const project = projects.find(p => p.id === risk.projectId);

          return (
            <div
              key={risk.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs space-y-4 ${
                risk.severity === 'Critical' ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/20 dark:bg-rose-950/10' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Risk Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    risk.severity === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                    risk.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {risk.severity} Severity
                  </span>

                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 font-bold rounded-full text-[10px]">
                    {risk.category}
                  </span>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {project?.code}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status:</span>
                  <select
                    value={risk.status}
                    onChange={(e) => onUpdateRiskStatus(risk.id, { status: e.target.value as any })}
                    className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="Open">Open</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Mitigated">Mitigated</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                </div>
              </div>

              {/* Title & Overview */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {risk.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {risk.description}
                </p>
              </div>

              {/* 4-Step Explanation Cards Grid (Requirement 3.G) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
                
                {/* 1. What Happened */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    1. What Happened
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">
                    {risk.explanationWhatHappened}
                  </p>
                </div>

                {/* 2. Why It Matters */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                    2. Why It Matters
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">
                    {risk.explanationWhyItMatters}
                  </p>
                </div>

                {/* 3. What To Check */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    3. What To Check
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">
                    {risk.explanationWhatToCheck}
                  </p>
                </div>

                {/* 4. Recommended Action */}
                <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                    4. Recommended Action
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 font-medium leading-snug">
                    {risk.recommendedAction}
                  </p>
                </div>

              </div>

              {/* Human Verification Toggle Footnote */}
              <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    Human Verification Status: <strong className="text-slate-800 dark:text-slate-200">{risk.isHumanVerified ? 'Verified by Auditor' : 'Pending Audit Check'}</strong>
                  </span>
                </div>

                <button
                  onClick={() => onUpdateRiskStatus(risk.id, { isHumanVerified: !risk.isHumanVerified })}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-xl font-semibold cursor-pointer transition"
                >
                  Toggle Verification
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
