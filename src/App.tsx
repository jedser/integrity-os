import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ProjectsView } from './components/ProjectsView';
import { FundersPortfolioView } from './components/FundersPortfolioView';
import { CommitmentsView } from './components/CommitmentsView';
import { EvidenceView } from './components/EvidenceView';
import { CommunityView } from './components/CommunityView';
import { RisksView } from './components/RisksView';
import { AIAssistantView } from './components/AIAssistantView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { DemoTourModal } from './components/DemoTourModal';
import { CommandCenterModal } from './components/CommandCenterModal';
import { AuthModal } from './components/AuthModal';
import { api } from './lib/api';
import { 
  Project, Commitment, EvidenceItem, CommunityFeedback, RiskItem, User 
} from './types';

export function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Data State
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [feedback, setFeedback] = useState<CommunityFeedback[]>([]);
  const [risks, setRisks] = useState<RiskItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // UI Modals State
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState<boolean>(false);
  const [preselectedCommitmentId, setPreselectedCommitmentId] = useState<string | null>(null);

  // Fetch initial data
  const loadData = async () => {
    try {
      const [
        statsRes,
        projectsRes,
        commitmentsRes,
        evidenceRes,
        feedbackRes,
        risksRes,
        usersRes
      ] = await Promise.all([
        api.getDashboardStats(),
        api.getProjects(),
        api.getCommitments(),
        api.getEvidence(),
        api.getCommunityFeedback(),
        api.getRisks(),
        api.getUsers()
      ]);

      setStats(statsRes);
      setProjects(projectsRes);
      setCommitments(commitmentsRes);
      setEvidence(evidenceRes);
      setFeedback(feedbackRes);
      setRisks(risksRes);
      setUsers(usersRes);
      if (!currentUser && usersRes.length > 0) {
        setCurrentUser(usersRes[0]); // Default to Administrator
      }
    } catch (err) {
      console.error('Failed to load Integrity-OS state:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers
  const handleSwitchUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) setCurrentUser(found);
  };

  const handleNavigate = (view: string, projectId?: string) => {
    setActiveView(view);
    if (projectId !== undefined) {
      setSelectedProjectId(projectId);
    }
  };

  const handleCreateProject = async (projectData: Partial<Project>) => {
    try {
      await api.createProject(projectData);
      await loadData();
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleCreateCommitment = async (data: Partial<Commitment>) => {
    try {
      await api.createCommitment(data);
      await loadData();
    } catch (err) {
      console.error('Error creating commitment:', err);
    }
  };

  const handleUpdateCommitmentStatus = async (id: string, updates: Partial<Commitment>) => {
    try {
      await api.updateCommitment(id, updates);
      await loadData();
    } catch (err) {
      console.error('Error updating commitment:', err);
    }
  };

  const handleCreateEvidence = async (data: Partial<EvidenceItem>) => {
    try {
      await api.createEvidence({
        ...data,
        uploaderId: currentUser?.id || 'u-1',
        uploaderName: currentUser?.name || 'Dr. Helen Gebremichael',
        uploaderOrg: currentUser?.organization || 'Tigray Health Bureau'
      });
      await loadData();
    } catch (err) {
      console.error('Error creating evidence:', err);
    }
  };

  const handleVerifyEvidence = async (id: string, status: 'Verified' | 'Flagged') => {
    try {
      await api.verifyEvidence(id, status, currentUser?.name || 'Auditor');
      await loadData();
    } catch (err) {
      console.error('Error verifying evidence:', err);
    }
  };

  const handleSubmitFeedback = async (data: Partial<CommunityFeedback>) => {
    try {
      await api.submitCommunityFeedback(data);
      await loadData();
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: any, notes?: string) => {
    try {
      await api.updateCommunityFeedback(id, status, notes);
      await loadData();
    } catch (err) {
      console.error('Error updating feedback:', err);
    }
  };

  const handleUpdateRiskStatus = async (id: string, updates: Partial<RiskItem>) => {
    try {
      await api.updateRisk(id, updates);
      await loadData();
    } catch (err) {
      console.error('Error updating risk:', err);
    }
  };

  const handleResetSeedData = async () => {
    try {
      await api.resetSeedData();
      await loadData();
    } catch (err) {
      console.error('Error resetting seed data:', err);
    }
  };

  const handleNavigateToEvidenceUpload = (commitmentId: string, projectId: string) => {
    setSelectedProjectId(projectId);
    setPreselectedCommitmentId(commitmentId);
    setActiveView('evidence');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        currentUser={currentUser}
        availableUsers={users}
        onSwitchUser={handleSwitchUser}
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
        onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {activeView === 'dashboard' && (
          <DashboardView
            stats={stats}
            projects={projects}
            commitments={commitments}
            evidence={evidence}
            risks={risks}
            feedback={feedback}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              setActiveView('projects');
            }}
            onNavigate={handleNavigate}
            onOpenCreateProject={() => {
              setActiveView('projects');
              setShowCreateProjectModal(true);
            }}
          />
        )}

        {activeView === 'projects' && (
          <ProjectsView
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            onCreateProject={handleCreateProject}
            onNavigate={handleNavigate}
            showCreateModal={showCreateProjectModal}
            onCloseCreateModal={() => setShowCreateProjectModal(false)}
          />
        )}

        {activeView === 'funders' && (
          <FundersPortfolioView
            projects={projects}
            commitments={commitments}
            risks={risks}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              setActiveView('projects');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'commitments' && (
          <CommitmentsView
            commitments={commitments}
            projects={projects}
            selectedProjectId={selectedProjectId}
            onCreateCommitment={handleCreateCommitment}
            onUpdateCommitmentStatus={handleUpdateCommitmentStatus}
            onNavigateToEvidenceUpload={handleNavigateToEvidenceUpload}
          />
        )}

        {activeView === 'evidence' && (
          <EvidenceView
            evidence={evidence}
            projects={projects}
            commitments={commitments}
            selectedProjectId={selectedProjectId}
            preselectedCommitmentId={preselectedCommitmentId}
            onCreateEvidence={handleCreateEvidence}
            onVerifyEvidence={handleVerifyEvidence}
          />
        )}

        {activeView === 'community' && (
          <CommunityView
            feedback={feedback}
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSubmitFeedback={handleSubmitFeedback}
            onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
          />
        )}

        {activeView === 'risks' && (
          <RisksView
            risks={risks}
            projects={projects}
            selectedProjectId={selectedProjectId}
            onUpdateRiskStatus={handleUpdateRiskStatus}
            onNavigateToAI={(pid) => {
              if (pid) setSelectedProjectId(pid);
              setActiveView('ai-assistant');
            }}
          />
        )}

        {activeView === 'ai-assistant' && (
          <AIAssistantView
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {activeView === 'reports' && (
          <ReportsView
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            commitments={commitments}
            evidence={evidence}
            risks={risks}
            feedback={feedback}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            onResetSeedData={handleResetSeedData}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white font-bold">Integrity-OS</strong> — Digital Infrastructure for Post-Conflict Recovery & Development
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tigray, Ethiopia Recovery Context • Scalable Civic Technology Engine
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Powered by Gemini 3.6 Flash</span>
            <span>•</span>
            <span>Immutable Evidence Hashing</span>
            <span>•</span>
            <button 
              onClick={() => setIsDemoTourOpen(true)}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              2-Min Demo Walkthrough
            </button>
          </div>
        </div>
      </footer>

      {/* Guided 2-Min Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Global Command Center & Search Modal */}
      <CommandCenterModal
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
        projects={projects}
        commitments={commitments}
        evidence={evidence}
        risks={risks}
        feedback={feedback}
        onNavigate={handleNavigate}
      />

      {/* Authentication & Organization Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        availableUsers={users}
        onSwitchUser={handleSwitchUser}
        onRegisterUser={(newUser) => {
          const createdUser: User = {
            ...newUser,
            id: `usr-${Date.now()}`
          };
          setUsers(prev => [...prev, createdUser]);
          setCurrentUser(createdUser);
        }}
      />

    </div>
  );
}

export default App;
