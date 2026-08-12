import React, { useState } from 'react';
import { 
  FolderKanban, Plus, Search, Filter, Calendar, MapPin, 
  Users, DollarSign, Target, FileCheck, AlertTriangle, Sparkles, 
  FileSpreadsheet, ArrowLeft, CheckCircle2, ShieldAlert, X
} from 'lucide-react';
import { Project, Commitment, EvidenceItem, CommunityFeedback, RiskItem, ActivityLog } from '../types';
import { IntegrityScoreBadge } from './IntegrityScoreBadge';
import { api } from '../lib/api';

interface Props {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onCreateProject: (projectData: Partial<Project>) => Promise<void>;
  onNavigate: (view: string, projectId?: string) => void;
  showCreateModal: boolean;
  onCloseCreateModal: () => void;
}

export const ProjectsView: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onCreateProject,
  onNavigate,
  showCreateModal,
  onCloseCreateModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Single Project Detail State
  const [projectDetail, setProjectDetail] = useState<{
    project: Project;
    integrityBreakdown: any;
    commitments: Commitment[];
    evidence: EvidenceItem[];
    feedback: CommunityFeedback[];
    risks: RiskItem[];
    activities: ActivityLog[];
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'commitments' | 'evidence' | 'feedback' | 'risks' | 'activities'>('commitments');
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Form State for New Project
  const [newProject, setNewProject] = useState({
    code: `TIG-REC-2026-0${projects.length + 1}`,
    title: '',
    description: '',
    objective: '',
    region: 'Tigray, Ethiopia',
    locationName: '',
    beneficiariesCount: 10000,
    beneficiariesTarget: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    budgetAllocated: 500000,
    budgetSpent: 0,
    funder: 'UN / EU Resilience Fund',
    implementerOrg: '',
    projectManagerName: 'Dr. Helen Gebremichael',
    status: 'Active' as const
  });

  // Load single project workspace when selectedProjectId changes
  React.useEffect(() => {
    if (selectedProjectId) {
      setIsLoadingDetail(true);
      api.getProjectById(selectedProjectId)
        .then(res => {
          setProjectDetail(res);
          setIsLoadingDetail(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingDetail(false);
        });
    } else {
      setProjectDetail(null);
    }
  }, [selectedProjectId]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateProject({
      ...newProject,
      coordinates: { lat: 13.5, lng: 39.5 }
    });
    onCloseCreateModal();
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.locationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render Single Project Workspace
  if (selectedProjectId && projectDetail) {
    const { project, integrityBreakdown, commitments, evidence, feedback, risks, activities } = projectDetail;

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        
        {/* Back Button */}
        <button
          onClick={() => onSelectProject(null)}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </button>

        {/* Project Executive Header Workspace */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-3 mb-1.5">
                <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-800">
                  {project.code}
                </span>
                <IntegrityScoreBadge 
                  score={project.integrityScore} 
                  status={project.integrityStatus}
                  breakdown={integrityBreakdown}
                  size="md"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Status: <strong className="text-slate-800 dark:text-slate-200">{project.status}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('ai-assistant', project.id)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run Gemini AI Scan</span>
              </button>

              <button
                onClick={() => onNavigate('reports', project.id)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Objective & Purpose</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {project.objective}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Location & Target Beneficiaries</span>
              <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-200 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{project.locationName} ({project.region})</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                {project.beneficiariesTarget}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Budget Execution & Funding</span>
              <div className="text-slate-800 dark:text-slate-200 font-bold text-sm">
                ${project.budgetSpent.toLocaleString()} spent / ${project.budgetAllocated.toLocaleString()} allocated
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-indigo-600 rounded-full" 
                  style={{ width: `${Math.min(100, (project.budgetSpent / (project.budgetAllocated || 1)) * 100)}%` }} 
                />
              </div>
              <p className="text-[11px] text-slate-500">Funder: {project.funder}</p>
            </div>
          </div>
        </div>

        {/* Workspace Tabs Header */}
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('commitments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'commitments' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Commitments ({commitments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'evidence' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Evidence Vault ({evidence.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'feedback' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Community Voice ({feedback.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'risks' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Flagged Risks ({risks.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
          
          {activeTab === 'commitments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Project Commitments</h3>
                <button 
                  onClick={() => onNavigate('commitments', project.id)}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Manage in Commitments Module
                </button>
              </div>

              <div className="space-y-3">
                {commitments.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          c.status === 'Completed' || c.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                          c.status === 'Overdue' || c.status === 'At Risk' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {c.status}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{c.title}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">{c.deliverable}</p>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Responsible: {c.responsibleOrg} ({c.responsiblePerson}) • Deadline: {c.deadline}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="font-bold text-slate-900 dark:text-white">${c.allocatedBudget.toLocaleString()}</div>
                      <span className="text-[10px] text-slate-400">{c.evidenceIds.length} Evidence Attached</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Uploaded Evidence Records</h3>
                <button 
                  onClick={() => onNavigate('evidence', project.id)}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Manage in Evidence Vault
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evidence.map(e => (
                  <div key={e.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-bold rounded-full text-[10px]">
                        {e.type}
                      </span>
                      <span className={`font-bold text-[10px] ${
                        e.verificationStatus === 'Verified' ? 'text-emerald-600' :
                        e.verificationStatus === 'Flagged' ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        {e.verificationStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white">{e.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">{e.description}</p>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Uploader: {e.uploaderName}</span>
                      <span className="font-mono" title={e.hash}>Hash: {e.hash.substring(0, 10)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Community Submissions</h3>
              <div className="space-y-3">
                {feedback.map(f => (
                  <div key={f.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{f.title}</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded-full text-[10px] font-semibold">{f.status}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">{f.description}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Submitted by: {f.submittedBy} ({f.isAnonymous ? 'Anonymous' : 'Verified Resident'}) • {f.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Flagged Risks</h3>
              <div className="space-y-3">
                {risks.map(r => (
                  <div key={r.id} className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900 dark:text-rose-200">{r.title}</span>
                      <span className="px-2 py-0.5 bg-rose-200 text-rose-900 rounded-full font-bold text-[10px]">{r.severity} Severity</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px]">{r.description}</p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200/60 dark:border-rose-900/60 font-medium text-slate-800 dark:text-slate-200">
                      <strong>Recommended Action:</strong> {r.recommendedAction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    );
  }

  // Projects Main Portfolio View (List)
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Portfolio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recovery Projects Directory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define objectives, assign implementers, track resources, and collect evidence
          </p>
        </div>

        <button
          onClick={onCloseCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by code, project title, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                  {project.code}
                </span>
                <IntegrityScoreBadge 
                  score={project.integrityScore} 
                  status={project.integrityStatus} 
                  size="sm"
                />
              </div>

              <h3 
                onClick={() => onSelectProject(project.id)}
                className="text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition line-clamp-1"
              >
                {project.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Location: <strong className="text-slate-800 dark:text-slate-200">{project.locationName}</strong></span>
                <span>Beneficiaries: <strong className="text-slate-800 dark:text-slate-200">{project.beneficiariesCount.toLocaleString()}</strong></span>
              </div>

              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Budget Execution</span>
                  <span className="font-bold text-slate-900 dark:text-white">${project.budgetSpent.toLocaleString()} / ${project.budgetAllocated.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onSelectProject(project.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition"
                >
                  Workspace
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={onCloseCreateModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Create New Integrity-OS Project
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              {/* AI Auto-Onboard Preset Banner */}
              <div className="bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>AI Project Onboarding Wizard</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNewProject({
                    code: `TIG-REC-2026-0${projects.length + 1}`,
                    title: 'Axum Agricultural Storage & Grain Silo Restoration',
                    description: 'Restoration of regional food security storage facilities and emergency seed distribution centers across Central Tigray.',
                    objective: 'Restore 4,500 metric tons of secure grain storage capacity and supply 12,000 smallholder farming households with certified teff seed.',
                    region: 'Tigray, Ethiopia',
                    locationName: 'Axum (Central Zone)',
                    beneficiariesCount: 45000,
                    beneficiariesTarget: '45,000 Rural Farmers & Households',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: '2026-11-30',
                    budgetAllocated: 620000,
                    budgetSpent: 0,
                    funder: 'UN Food & Agriculture Organization (FAO)',
                    implementerOrg: 'Tigray Agricultural Research Institute',
                    projectManagerName: 'Engineer Teklay Hailu',
                    status: 'Active'
                  })}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  Auto-Fill AI Sample Brief
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Project Code</label>
                  <input
                    type="text"
                    required
                    value={newProject.code}
                    onChange={(e) => setNewProject({ ...newProject, code: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shire Health Clinic Equipment Supply"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Objective</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Define explicit target outcomes and community goals..."
                  value={newProject.objective}
                  onChange={(e) => setNewProject({ ...newProject, objective: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location / Zone</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adwa (Central Zone)"
                    value={newProject.locationName}
                    onChange={(e) => setNewProject({ ...newProject, locationName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Allocated Budget ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newProject.budgetAllocated}
                    onChange={(e) => setNewProject({ ...newProject, budgetAllocated: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Funder / Donor Agency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EU Recovery Facility & WHO"
                    value={newProject.funder}
                    onChange={(e) => setNewProject({ ...newProject, funder: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Implementer Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tigray Health Bureau & Red Cross"
                    value={newProject.implementerOrg}
                    onChange={(e) => setNewProject({ ...newProject, implementerOrg: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onCloseCreateModal}
                  className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Create Project Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
