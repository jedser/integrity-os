import { 
  Project, Commitment, EvidenceItem, 
  CommunityFeedback, RiskItem, ActivityLog, User, AIAnalysisResult 
} from '../types';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth & Users
  getCurrentUser: () => fetchJSON<{ currentUser: User; availableUsers: User[] }>('/api/auth/me'),
  getUsers: () => fetchJSON<User[]>('/api/users'),
  switchUser: (userId: string) => fetchJSON<{ success: boolean; user: User }>('/api/auth/switch-user', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),

  // Dashboard
  getDashboardStats: () => fetchJSON<any>('/api/dashboard/stats'),

  // Projects
  getProjects: () => fetchJSON<Project[]>('/api/projects'),
  getProjectById: (id: string) => fetchJSON<{
    project: Project;
    integrityBreakdown: any;
    commitments: Commitment[];
    evidence: EvidenceItem[];
    feedback: CommunityFeedback[];
    risks: RiskItem[];
    activities: ActivityLog[];
  }>(`/api/projects/${id}`),
  createProject: (data: Partial<Project>) => fetchJSON<Project>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateProject: (id: string, updates: Partial<Project>) => fetchJSON<Project>(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Commitments
  getCommitments: (projectId?: string) => fetchJSON<Commitment[]>(`/api/commitments${projectId ? `?projectId=${projectId}` : ''}`),
  createCommitment: (data: Partial<Commitment>) => fetchJSON<Commitment>('/api/commitments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateCommitment: (id: string, updates: Partial<Commitment>) => fetchJSON<Commitment>(`/api/commitments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Evidence
  getEvidence: (projectId?: string) => fetchJSON<EvidenceItem[]>(`/api/evidence${projectId ? `?projectId=${projectId}` : ''}`),
  createEvidence: (data: Partial<EvidenceItem>) => fetchJSON<EvidenceItem>('/api/evidence', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  verifyEvidence: (id: string, status: 'Verified' | 'Flagged', verifiedBy?: string) => fetchJSON<EvidenceItem>(`/api/evidence/${id}/verify`, {
    method: 'PUT',
    body: JSON.stringify({ status, verifiedBy }),
  }),

  // Community Feedback
  getFeedback: (projectId?: string) => fetchJSON<CommunityFeedback[]>(`/api/feedback${projectId ? `?projectId=${projectId}` : ''}`),
  getCommunityFeedback: (projectId?: string) => fetchJSON<CommunityFeedback[]>(`/api/feedback${projectId ? `?projectId=${projectId}` : ''}`),
  createFeedback: (data: Partial<CommunityFeedback>) => fetchJSON<CommunityFeedback>('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  submitCommunityFeedback: (data: Partial<CommunityFeedback>) => fetchJSON<CommunityFeedback>('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateFeedbackStatus: (id: string, status: string, resolutionNotes?: string) => fetchJSON<CommunityFeedback>(`/api/feedback/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, resolutionNotes }),
  }),
  updateCommunityFeedback: (id: string, status: string, resolutionNotes?: string) => fetchJSON<CommunityFeedback>(`/api/feedback/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, resolutionNotes }),
  }),

  // Risks
  getRisks: (projectId?: string) => fetchJSON<RiskItem[]>(`/api/risks${projectId ? `?projectId=${projectId}` : ''}`),
  createRisk: (data: Partial<RiskItem>) => fetchJSON<RiskItem>('/api/risks', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateRisk: (id: string, updates: Partial<RiskItem>) => fetchJSON<RiskItem>(`/api/risks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Activities
  getActivities: (projectId?: string) => fetchJSON<ActivityLog[]>(`/api/activities${projectId ? `?projectId=${projectId}` : ''}`),

  // AI Gemini APIs
  analyzeProjectWithAI: (projectId: string) => fetchJSON<AIAnalysisResult>('/api/ai/analyze-project', {
    method: 'POST',
    body: JSON.stringify({ projectId }),
  }),
  queryAI: (query: string, projectId?: string) => fetchJSON<{ answer: string; disclaimer: string }>('/api/ai/query', {
    method: 'POST',
    body: JSON.stringify({ query, projectId }),
  }),
  queryIntegrityAI: (query: string, projectId?: string) => fetchJSON<{ answer: string; disclaimer: string }>('/api/ai/query', {
    method: 'POST',
    body: JSON.stringify({ query, projectId }),
  }),
  summarizeEvidenceWithAI: (text: string, title: string) => fetchJSON<{ summary: string; disclaimer: string }>('/api/ai/summarize-evidence', {
    method: 'POST',
    body: JSON.stringify({ text, title }),
  }),

  // Reports
  getProjectReport: (projectId: string) => fetchJSON<any>(`/api/reports/${projectId}`),

  // Reset Seed Data
  resetSeedData: () => fetchJSON<{ success: boolean; message: string }>('/api/admin/reset-seed', {
    method: 'POST',
  }),
};
