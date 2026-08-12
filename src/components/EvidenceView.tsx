import React, { useState } from 'react';
import { 
  FileCheck, Plus, Search, Filter, CheckCircle2, 
  AlertTriangle, ShieldAlert, Sparkles, ExternalLink, Hash, X, Eye
} from 'lucide-react';
import { EvidenceItem, Project, Commitment, EvidenceType } from '../types';
import { api } from '../lib/api';

interface Props {
  evidence: EvidenceItem[];
  projects: Project[];
  commitments: Commitment[];
  selectedProjectId: string | null;
  preselectedCommitmentId?: string | null;
  onCreateEvidence: (data: Partial<EvidenceItem>) => Promise<void>;
  onVerifyEvidence: (id: string, status: 'Verified' | 'Flagged') => Promise<void>;
}

export const EvidenceView: React.FC<Props> = ({
  evidence,
  projects,
  commitments,
  selectedProjectId,
  preselectedCommitmentId,
  onCreateEvidence,
  onVerifyEvidence
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(!!preselectedCommitmentId);

  // Gemini AI Evidence Summary Modal
  const [activeSummaryModal, setActiveSummaryModal] = useState<{
    item: EvidenceItem;
    summary: string;
    loading: boolean;
  } | null>(null);

  // New Evidence Form
  const [newEvidence, setNewEvidence] = useState({
    projectId: selectedProjectId || (projects[0]?.id || ''),
    commitmentId: preselectedCommitmentId || '',
    title: '',
    description: '',
    type: 'Document' as EvidenceType,
    fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    externalLink: '',
    textPayload: '',
    verificationStatus: 'Pending Verification' as const
  });

  const filteredEvidence = evidence.filter(e => {
    const matchesProject = !selectedProjectId || e.projectId === selectedProjectId;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.uploaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || e.type === typeFilter;
    return matchesProject && matchesSearch && matchesType;
  });

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateEvidence(newEvidence);
    setShowUploadModal(false);
  };

  const handleSummarizeWithAI = async (item: EvidenceItem) => {
    setActiveSummaryModal({ item, summary: '', loading: true });
    try {
      const res = await api.summarizeEvidenceWithAI(
        item.textPayload || item.description, 
        item.title
      );
      setActiveSummaryModal({ item, summary: res.summary, loading: false });
    } catch (err: any) {
      setActiveSummaryModal({ 
        item, 
        summary: `Summary generation error: ${err.message}`, 
        loading: false 
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Evidence Vault & Verification Fingerprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Immutable repository of audit reports, geotagged photos, customs release slips, and physical receipts
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Evidence</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search evidence titles, SHA-256 hash fingerprints, uploaders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Document">Document</option>
            <option value="Photo">Photo / Geotag</option>
            <option value="Financial Receipt">Financial Receipt</option>
            <option value="Audit Report">Audit Report</option>
            <option value="Beneficiary Log">Beneficiary Log</option>
          </select>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((e) => {
          const project = projects.find(p => p.id === e.projectId);
          const commitment = commitments.find(c => c.id === e.commitmentId);

          return (
            <div
              key={e.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold rounded-full text-[10px]">
                    {e.type}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    e.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                    e.verificationStatus === 'Flagged' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {e.verificationStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {e.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {e.description}
                </p>

                {commitment && (
                  <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Linked Commitment: <strong className="text-slate-700 dark:text-slate-200">{commitment.title}</strong>
                  </div>
                )}
              </div>

              {/* Photo / Document Preview */}
              {e.fileUrl && (
                <div className="rounded-2xl overflow-hidden h-36 bg-slate-100 dark:bg-slate-800 relative group">
                  <img 
                    src={e.fileUrl} 
                    alt={e.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                    <a 
                      href={e.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-slate-900 hover:scale-110 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Hash Fingerprint & Uploader Info */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <Hash className="w-3 h-3" />
                    <span>Cryptographic Hash:</span>
                  </span>
                  <span title={e.hash} className="font-bold text-slate-700 dark:text-slate-300">
                    {e.hash.substring(0, 12)}...
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>Uploader: <strong>{e.uploaderName}</strong> ({e.uploaderOrg})</span>
                  <span>{new Date(e.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  onClick={() => handleSummarizeWithAI(e)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-xl font-semibold flex items-center space-x-1 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Summarize</span>
                </button>

                <div className="flex items-center space-x-1">
                  {e.verificationStatus !== 'Verified' && (
                    <button
                      onClick={() => onVerifyEvidence(e.id, 'Verified')}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium cursor-pointer"
                    >
                      Approve & Verify
                    </button>
                  )}

                  {e.verificationStatus !== 'Flagged' && (
                    <button
                      onClick={() => onVerifyEvidence(e.id, 'Flagged')}
                      className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium cursor-pointer"
                    >
                      Flag Issue
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* AI Summarizer Modal */}
      {activeSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-4">
            
            <button 
              onClick={() => setActiveSummaryModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Gemini AI Evidence Summarizer
              </h3>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Document: {activeSummaryModal.item.title}
            </p>

            {activeSummaryModal.loading ? (
              <div className="py-8 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <Sparkles className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="text-xs">Analyzing document text with Gemini 3.6 Flash...</span>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
                <p>{activeSummaryModal.summary}</p>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-400 font-medium">
                  AI-generated analysis — human verification required.
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveSummaryModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Summary
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Evidence Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            
            <button 
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Attach Physical Evidence Item
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Project</label>
                  <select
                    value={newEvidence.projectId}
                    onChange={(e) => setNewEvidence({ ...newEvidence, projectId: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.code}: {p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Evidence Type</label>
                  <select
                    value={newEvidence.type}
                    onChange={(e) => setNewEvidence({ ...newEvidence, type: e.target.value as EvidenceType })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="Document">Document</option>
                    <option value="Photo">Photo / Geotag</option>
                    <option value="Financial Receipt">Financial Receipt</option>
                    <option value="Audit Report">Audit Report</option>
                    <option value="Beneficiary Log">Beneficiary Log</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Evidence Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geotagged Installation Photos of Solar Panel Bank"
                  value={newEvidence.title}
                  onChange={(e) => setNewEvidence({ ...newEvidence, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description & Audit Details</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detail serial numbers, location coordinates, or customs clearance numbers..."
                  value={newEvidence.description}
                  onChange={(e) => setNewEvidence({ ...newEvidence, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Photo / File URL</label>
                <input
                  type="text"
                  value={newEvidence.fileUrl}
                  onChange={(e) => setNewEvidence({ ...newEvidence, fileUrl: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Register Evidence & Generate Fingerprint
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
