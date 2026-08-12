import React, { useState } from 'react';
import { 
  Target, Plus, Search, Filter, CheckCircle2, 
  AlertTriangle, Clock, ArrowRight, ShieldAlert, FilePlus, X
} from 'lucide-react';
import { Commitment, Project, CommitmentStatus } from '../types';

interface Props {
  commitments: Commitment[];
  projects: Project[];
  selectedProjectId: string | null;
  onCreateCommitment: (data: Partial<Commitment>) => Promise<void>;
  onUpdateCommitmentStatus: (id: string, updates: Partial<Commitment>) => Promise<void>;
  onNavigateToEvidenceUpload: (commitmentId: string, projectId: string) => void;
}

export const CommitmentsView: React.FC<Props> = ({
  commitments,
  projects,
  selectedProjectId,
  onCreateCommitment,
  onUpdateCommitmentStatus,
  onNavigateToEvidenceUpload
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Commitment Form
  const [newCommitment, setNewCommitment] = useState({
    projectId: selectedProjectId || (projects[0]?.id || ''),
    title: '',
    description: '',
    responsiblePerson: '',
    responsibleOrg: '',
    allocatedBudget: 50000,
    spentBudget: 0,
    deadline: '2026-09-30',
    deliverable: '',
    status: 'Planned' as CommitmentStatus,
    verificationStatus: 'Unverified' as const
  });

  const filteredCommitments = commitments.filter(c => {
    const matchesProject = !selectedProjectId || c.projectId === selectedProjectId;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.responsibleOrg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.deliverable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesProject && matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateCommitment(newCommitment);
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: CommitmentStatus) => {
    switch (status) {
      case 'Completed':
      case 'Verified':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200';
      case 'Evidence Submitted':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200';
      case 'Overdue':
      case 'At Risk':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Commitment Tracker & Deliverables
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define explicit milestone deliverables, responsible parties, and verification statuses
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Commitment</span>
        </button>
      </div>

      {/* Lifecycle Stepper Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Commitment Traceability Lifecycle Statuses
        </span>
        <div className="flex flex-wrap items-center justify-between text-xs font-semibold gap-2">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl">1. Planned</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-xl">2. In Progress</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-xl">3. Evidence Submitted</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded-xl">4. Verified Audit</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl">5. Completed</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search commitments, responsible organizations, deliverables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Evidence Submitted">Evidence Submitted</option>
            <option value="Verified">Verified</option>
            <option value="Completed">Completed</option>
            <option value="At Risk">At Risk</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Commitments List */}
      <div className="space-y-3">
        {filteredCommitments.map((c) => {
          const project = projects.find(p => p.id === c.projectId);
          return (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition duration-200 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(c.status)}`}>
                    {c.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {project?.code || 'TIG-REC'}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: <strong className="text-slate-700 dark:text-slate-200">{c.deadline}</strong></span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${c.allocatedBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Expected Deliverable: <span className="font-normal text-slate-600 dark:text-slate-300">{c.deliverable}</span>
                </div>
                {c.verifierNotes && (
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 pt-1 font-medium">
                    ⚠️ Verifier Note: {c.verifierNotes}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Responsible Org: <strong className="text-slate-700 dark:text-slate-200">{c.responsibleOrg}</strong> ({c.responsiblePerson})
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigateToEvidenceUpload(c.id, c.projectId)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-xl text-xs font-semibold flex items-center space-x-1 transition cursor-pointer"
                  >
                    <FilePlus className="w-3.5 h-3.5" />
                    <span>Attach Evidence ({c.evidenceIds.length})</span>
                  </button>

                  <select
                    value={c.status}
                    onChange={(e) => onUpdateCommitmentStatus(c.id, { status: e.target.value as CommitmentStatus })}
                    className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Evidence Submitted">Evidence Submitted</option>
                    <option value="Verified">Verified</option>
                    <option value="Completed">Completed</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Commitment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Add New Commitment
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Project</label>
                <select
                  value={newCommitment.projectId}
                  onChange={(e) => setNewCommitment({ ...newCommitment, projectId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.code}: {p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Commitment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Pump Installation for Wellhead 3"
                  value={newCommitment.title}
                  onChange={(e) => setNewCommitment({ ...newCommitment, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description & Target Terms</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Specify exact physical quantities and milestone conditions..."
                  value={newCommitment.description}
                  onChange={(e) => setNewCommitment({ ...newCommitment, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Responsible Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WaterAid Horn Africa"
                    value={newCommitment.responsibleOrg}
                    onChange={(e) => setNewCommitment({ ...newCommitment, responsibleOrg: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Responsible Lead Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eng. Solomon Tesfay"
                    value={newCommitment.responsiblePerson}
                    onChange={(e) => setNewCommitment({ ...newCommitment, responsiblePerson: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Allocated Budget ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newCommitment.allocatedBudget}
                    onChange={(e) => setNewCommitment({ ...newCommitment, allocatedBudget: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    required
                    value={newCommitment.deadline}
                    onChange={(e) => setNewCommitment({ ...newCommitment, deadline: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Tangible Deliverable</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physical storehouse receipt & verified pressure log"
                  value={newCommitment.deliverable}
                  onChange={(e) => setNewCommitment({ ...newCommitment, deliverable: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Save Commitment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
