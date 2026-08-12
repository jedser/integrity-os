import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Command, Target, FileCheck, FolderKanban, 
  AlertTriangle, Users, Sparkles, ArrowRight, X, Filter
} from 'lucide-react';
import { Project, Commitment, EvidenceItem, RiskItem, CommunityFeedback } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  commitments: Commitment[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  feedback: CommunityFeedback[];
  onNavigate: (view: string, projectId?: string) => void;
}

export const CommandCenterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  projects,
  commitments,
  evidence,
  risks,
  feedback,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Keyboard shortcut listener for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          // open command center
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search indexing
  const results = useMemo(() => {
    if (!query.trim()) {
      // Default quick suggestions
      return [
        ...commitments.filter(c => c.status === 'At Risk' || c.status === 'Overdue').map(c => ({
          type: 'Commitment',
          id: c.id,
          title: c.title,
          project: projects.find(p => p.id === c.projectId)?.title || 'Project',
          status: c.status,
          date: c.deadline,
          view: 'commitments',
          projectId: c.projectId,
          badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
        })),
        ...risks.filter(r => r.severity === 'High' || r.severity === 'Critical').map(r => ({
          type: 'Risk',
          id: r.id,
          title: r.title,
          project: projects.find(p => p.id === r.projectId)?.title || 'Project',
          status: `${r.severity} Severity`,
          date: r.reviewDate,
          view: 'risks',
          projectId: r.projectId,
          badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
        })),
        ...feedback.filter(f => f.status === 'New' || f.status === 'Action Required').map(f => ({
          type: 'Community Feedback',
          id: f.id,
          title: f.description,
          project: projects.find(p => p.id === f.projectId)?.title || 'Project',
          status: f.category,
          date: f.submittedAt,
          view: 'community',
          projectId: f.projectId,
          badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
        }))
      ].slice(0, 8);
    }

    const q = query.toLowerCase();

    const matchedProjects = projects
      .filter(p => p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .map(p => ({
        type: 'Project',
        id: p.id,
        title: `${p.code}: ${p.title}`,
        project: p.organization,
        status: p.integrityStatus,
        date: p.startDate,
        view: 'projects',
        projectId: p.id,
        badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
      }));

    const matchedCommitments = commitments
      .filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.responsibleActor.toLowerCase().includes(q))
      .map(c => ({
        type: 'Commitment',
        id: c.id,
        title: c.title,
        project: projects.find(p => p.id === c.projectId)?.title || 'Project',
        status: c.status,
        date: c.deadline,
        view: 'commitments',
        projectId: c.projectId,
        badgeColor: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
      }));

    const matchedEvidence = evidence
      .filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.uploaderName.toLowerCase().includes(q))
      .map(e => ({
        type: 'Evidence',
        id: e.id,
        title: e.title,
        project: projects.find(p => p.id === e.projectId)?.title || 'Project',
        status: e.verificationStatus,
        date: e.uploadedAt,
        view: 'evidence',
        projectId: e.projectId,
        badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
      }));

    const matchedRisks = risks
      .filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      .map(r => ({
        type: 'Risk',
        id: r.id,
        title: r.title,
        project: projects.find(p => p.id === r.projectId)?.title || 'Project',
        status: `${r.severity} Severity`,
        date: r.reviewDate,
        view: 'risks',
        projectId: r.projectId,
        badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
      }));

    const matchedFeedback = feedback
      .filter(f => f.description.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      .map(f => ({
        type: 'Community Feedback',
        id: f.id,
        title: f.description,
        project: projects.find(p => p.id === f.projectId)?.title || 'Project',
        status: f.status,
        date: f.submittedAt,
        view: 'community',
        projectId: f.projectId,
        badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
      }));

    let all = [
      ...matchedProjects,
      ...matchedCommitments,
      ...matchedEvidence,
      ...matchedRisks,
      ...matchedFeedback,
    ];

    if (typeFilter !== 'all') {
      all = all.filter(item => item.type.toLowerCase().includes(typeFilter.toLowerCase()));
    }

    return all.slice(0, 12);
  }, [query, typeFilter, projects, commitments, evidence, risks, feedback]);

  const handleSelect = (item: any) => {
    onNavigate(item.view, item.projectId);
    onClose();
  };

  const handleAskAI = () => {
    onNavigate('ai-assistant');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, commitments, evidence, risks, or community reports..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-400 text-xs"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-2 bg-slate-100/60 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex items-center space-x-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium text-[11px]">Filter:</span>
            {['all', 'project', 'commitment', 'evidence', 'risk', 'community'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition cursor-pointer ${
                  typeFilter === t
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleAskAI}
            className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition hover:bg-indigo-100 cursor-pointer shrink-0 ml-2"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Ask Integrity AI</span>
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!query.trim() && (
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Suggested / High Priority Items
            </div>
          )}

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching records found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.id}-${idx}`}
                onClick={() => handleSelect(item)}
                className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1 pr-4 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.badgeColor}`}>
                      {item.type}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate">
                      {item.project}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {item.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">
              Esc
            </kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Command className="w-3 h-3" />
            <span>K for Command Center</span>
          </div>
        </div>

      </div>
    </div>
  );
};
