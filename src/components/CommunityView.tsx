import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, ShieldAlert, 
  MessageSquare, UserCheck, CheckCircle2, Clock, X
} from 'lucide-react';
import { CommunityFeedback, Project, FeedbackCategory } from '../types';

interface Props {
  feedback: CommunityFeedback[];
  projects: Project[];
  selectedProjectId: string | null;
  onSubmitFeedback: (data: Partial<CommunityFeedback>) => Promise<void>;
  onUpdateFeedbackStatus: (id: string, status: 'New' | 'Under Review' | 'Action Required' | 'Resolved', resolutionNotes?: string) => Promise<void>;
}

export const CommunityView: React.FC<Props> = ({
  feedback,
  projects,
  selectedProjectId,
  onSubmitFeedback,
  onUpdateFeedbackStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New Feedback Form
  const [newFeedback, setNewFeedback] = useState({
    projectId: selectedProjectId || (projects[0]?.id || ''),
    submittedBy: 'Sara Kidanemariam',
    isAnonymous: false,
    category: 'Missing Goods' as FeedbackCategory,
    title: '',
    description: '',
    location: 'Adigrat Sector 4',
    severity: 'Medium' as 'Low' | 'Medium' | 'High'
  });

  const filteredFeedback = feedback.filter(f => {
    const matchesProject = !selectedProjectId || f.projectId === selectedProjectId;
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || f.category === categoryFilter;
    return matchesProject && matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitFeedback({
      ...newFeedback,
      submittedBy: newFeedback.isAnonymous ? 'Anonymous Community Resident' : newFeedback.submittedBy
    });
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Community Participatory Voice
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transparent ground-level observation portal for citizens, residents, and local committees
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Community Report</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search community reports, observations, location sub-kebeles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Missing Goods">Missing Goods</option>
            <option value="Delay">Delay</option>
            <option value="Corruption Risk">Corruption Risk</option>
            <option value="Service Quality">Service Quality</option>
            <option value="Positive Observation">Positive Observation</option>
          </select>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-3">
        {filteredFeedback.map((f) => {
          const project = projects.find(p => p.id === f.projectId);

          return (
            <div
              key={f.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:border-teal-300 dark:hover:border-teal-800 transition duration-200 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    f.severity === 'High' ? 'bg-rose-100 text-rose-800' :
                    f.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {f.severity} Severity
                  </span>

                  <span className="px-2.5 py-0.5 bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold rounded-full text-[10px]">
                    {f.category}
                  </span>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {project?.code || 'TIG-REC'}
                  </span>
                </div>

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                  Status: {f.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {f.description}
                </p>
              </div>

              {f.resolutionNotes && (
                <div className="p-3 bg-teal-50/60 dark:bg-teal-950/40 rounded-2xl border border-teal-200/80 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 space-y-0.5">
                  <strong className="block font-bold">Officer Resolution Notes:</strong>
                  <span>{f.resolutionNotes}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Submitted by: <strong className="text-slate-700 dark:text-slate-200">{f.submittedBy}</strong> ({f.isAnonymous ? 'Anonymous' : 'Verified Local Resident'}) • Location: {f.location}
                </span>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => onUpdateFeedbackStatus(f.id, 'Under Review', 'Administrative oversight opened.')}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-xs rounded-xl font-medium cursor-pointer"
                  >
                    Mark Review
                  </button>

                  <button
                    onClick={() => onUpdateFeedbackStatus(f.id, 'Resolved', 'Field inspection completed and issue addressed.')}
                    className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs rounded-xl font-medium cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            
            <button 
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Submit Community Report
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Project</label>
                  <select
                    value={newFeedback.projectId}
                    onChange={(e) => setNewFeedback({ ...newFeedback, projectId: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.code}: {p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value as FeedbackCategory })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="Missing Goods">Missing Goods</option>
                    <option value="Delay">Delay</option>
                    <option value="Corruption Risk">Corruption Risk</option>
                    <option value="Service Quality">Service Quality</option>
                    <option value="Positive Observation">Positive Observation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Open piping ditch blocking market road"
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Detailed Observation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what was seen on the ground, dates, and impact..."
                  value={newFeedback.description}
                  onChange={(e) => setNewFeedback({ ...newFeedback, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Sub-Kebele / Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adigrat Sector 4 Market Corridor"
                    value={newFeedback.location}
                    onChange={(e) => setNewFeedback({ ...newFeedback, location: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Severity Assessment</label>
                  <select
                    value={newFeedback.severity}
                    onChange={(e) => setNewFeedback({ ...newFeedback, severity: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="Low">Low - Informational</option>
                    <option value="Medium">Medium - Operational Attention</option>
                    <option value="High">High - Critical Integrity Flag</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={newFeedback.isAnonymous}
                  onChange={(e) => setNewFeedback({ ...newFeedback, isAnonymous: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="anonymousCheck" className="text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                  Submit anonymously (Protect reporter identity)
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Submit Report
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
