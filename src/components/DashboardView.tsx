import React from 'react';
import { 
  FolderKanban, Target, FileCheck, AlertTriangle, 
  Users, DollarSign, Activity, ArrowUpRight, ShieldAlert, CheckCircle2, ChevronRight, Plus
} from 'lucide-react';
import { Project, Commitment, EvidenceItem, RiskItem, CommunityFeedback, ActivityLog } from '../types';
import { IntegrityScoreBadge } from './IntegrityScoreBadge';
import { TraceabilityChain } from './TraceabilityChain';
import { ResponsibleAIBanner } from './ResponsibleAIBanner';
import { IntegrityCopilotCard } from './IntegrityCopilotCard';

interface Props {
  stats: any;
  projects: Project[];
  commitments?: Commitment[];
  evidence?: EvidenceItem[];
  risks?: RiskItem[];
  feedback?: CommunityFeedback[];
  onSelectProject: (id: string) => void;
  onNavigate: (view: string, projectId?: string) => void;
  onOpenCreateProject: () => void;
}

export const DashboardView: React.FC<Props> = ({
  stats,
  projects,
  commitments = [],
  evidence = [],
  risks = [],
  feedback = [],
  onSelectProject,
  onNavigate,
  onOpenCreateProject
}) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <Activity className="w-6 h-6 animate-spin mr-2" />
        <span>Loading Executive Integrity Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Responsible AI Banner */}
      <ResponsibleAIBanner />

      {/* Integrity Copilot Feature Box */}
      <IntegrityCopilotCard
        projects={projects}
        commitments={commitments}
        evidence={evidence}
        risks={risks}
        feedback={feedback}
        onNavigate={onNavigate}
      />

      {/* Traceability Chain Header */}
      <TraceabilityChain />

      {/* Key Executive Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Metric 1: Average Integrity Score */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Integrity Score</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.averageIntegrityScore}/100
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Across {stats.totalProjects} active projects
            </p>
          </div>
        </div>

        {/* Metric 2: Active Projects & Budget */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Projects</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FolderKanban className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.activeProjects} <span className="text-xs font-normal text-slate-400">/ {stats.totalProjects}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              ${(stats.totalBudget / 1000000).toFixed(2)}M Budget
            </p>
          </div>
        </div>

        {/* Metric 3: Commitments Delivered */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Commitments</span>
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.completedCommitments} <span className="text-xs font-normal text-slate-400">/ {stats.totalCommitments}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {Math.round((stats.completedCommitments / (stats.totalCommitments || 1)) * 100)}% Delivered
            </p>
          </div>
        </div>

        {/* Metric 4: Evidence Submitted */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Evidence Items</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <FileCheck className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalEvidenceSubmitted}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Geotags & Fingerprints
            </p>
          </div>
        </div>

        {/* Metric 5: Open Risks & Attention Required */}
        <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Open Risks</span>
            <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {stats.openRisksCount} <span className="text-xs font-semibold text-rose-500">({stats.criticalRisksCount} Critical)</span>
            </div>
            <p className="text-[11px] text-rose-600/80 dark:text-rose-300/80 mt-0.5 font-medium">
              Requires Mgmt Attention
            </p>
          </div>
        </div>

        {/* Metric 6: Community Feedback */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Community Voice</span>
            <span className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.communityFeedbackCount} <span className="text-xs font-normal text-slate-400">({stats.unresolvedFeedbackCount} Unresolved)</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Participatory Reports
            </p>
          </div>
        </div>

      </div>

      {/* High-Priority Attention Alert Box */}
      {stats.criticalRisksCount > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                Critical Integrity Alert: Storehouse Quantity Mismatch Detected
              </h4>
              <p className="text-xs text-rose-800 dark:text-rose-300 mt-0.5">
                Adigrat Water Project (TIG-REC-2026-02): $280,000 contract paid for 14 Grundfos pumps, but physical storehouse receipt e-4 logs only 9 pumps received ($100k discrepancy).
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('risks')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs shrink-0 cursor-pointer transition flex items-center space-x-1 self-start sm:self-center"
          >
            <span>Review Risk & Mitigation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Layout: Projects Grid (Left) + Activity & Quick Risks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (2 Spans): Active Projects Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recovery Projects Portfolio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Traceable post-conflict recovery investments in Tigray, Ethiopia
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenCreateProject}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Project</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                      {project.code}
                    </span>
                    <IntegrityScoreBadge 
                      score={project.integrityScore} 
                      status={project.integrityStatus} 
                      size="sm"
                    />
                  </div>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {project.locationName}
                  </span>
                </div>

                <h4 
                  onClick={() => onSelectProject(project.id)}
                  className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition line-clamp-1"
                >
                  {project.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 mb-4 leading-relaxed">
                  {project.objective}
                </p>

                {/* Progress & Financials */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Budget Allocated</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">${project.budgetAllocated.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Spent to Date</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">${project.budgetSpent.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Beneficiaries</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.beneficiariesCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Funder</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block">{project.funder.split('&')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    PM: <strong className="text-slate-700 dark:text-slate-300">{project.projectManagerName}</strong>
                  </span>

                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Open Project Workspace</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Top Risks & Audit Activity Feed */}
        <div className="space-y-6">
          
          {/* Top Unresolved Risks */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>High-Priority Integrity Risks</span>
              </h3>
              <button 
                onClick={() => onNavigate('risks')}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View All ({stats.openRisksCount})
              </button>
            </div>

            <div className="space-y-3">
              {stats.topRisks.map((risk: RiskItem) => (
                <div key={risk.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      risk.severity === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {risk.severity} Risk
                    </span>
                    <span className="text-[10px] text-slate-400">{risk.category}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {risk.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Activity Feed */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>Recent Activity Trail</span>
              </h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Live Audit</span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {stats.recentActivities.map((act: ActivityLog) => (
                <div key={act.id} className="relative pl-7 text-xs">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900" />
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {act.actorName} <span className="text-slate-400 font-normal">({act.actorRole})</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    <strong className="text-indigo-600 dark:text-indigo-400">{act.action}:</strong> {act.details}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
