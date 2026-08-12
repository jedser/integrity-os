import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, FolderKanban, Target, 
  FileCheck, Users, AlertTriangle, Sparkles, FileSpreadsheet, 
  Settings, Play, UserCheck, ChevronDown, Check, Globe, Search, Command, Layers
} from 'lucide-react';
import { User, Project } from '../types';

interface Props {
  activeView: string;
  onSelectView: (view: string) => void;
  currentUser: User | null;
  availableUsers: User[];
  onSwitchUser: (userId: string) => void;
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onOpenDemoTour: () => void;
  onOpenCommandCenter?: () => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  onSelectView,
  currentUser,
  availableUsers,
  onSwitchUser,
  projects,
  selectedProjectId,
  onSelectProject,
  onOpenDemoTour,
  onOpenCommandCenter,
  onOpenAuthModal,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'funders', label: 'Funders View', icon: Layers },
    { id: 'commitments', label: 'Commitments', icon: Target },
    { id: 'evidence', label: 'Evidence Vault', icon: FileCheck },
    { id: 'community', label: 'Community Voice', icon: Users },
    { id: 'risks', label: 'Risk Monitor', icon: AlertTriangle },
    { id: 'ai-assistant', label: 'Integrity AI', icon: Sparkles, highlight: true },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner: Context & Demo Trigger & Role Switcher */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="flex items-center space-x-1.5 text-indigo-400 font-medium">
            <Globe className="w-3.5 h-3.5" />
            <span>Region: Post-Conflict Recovery (Tigray, Ethiopia Focus)</span>
            <span className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono">
              FICTIONAL DEMO DATA — NOT REAL PROJECT INFORMATION
            </span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden md:inline text-slate-400">
            Resource → Commitment → Action → Evidence → Verification → Impact
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sign In & Register Portal Button */}
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 hover:text-white font-semibold rounded-lg text-xs flex items-center space-x-1.5 transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Demo Tour Button */}
          <button
            onClick={onOpenDemoTour}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs flex items-center space-x-1.5 transition shadow-xs cursor-pointer animate-pulse"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>2-Min Demo Walkthrough</span>
          </button>

          {/* User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center space-x-2 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role: <strong className="text-white">{currentUser?.role || 'Administrator'}</strong></span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Stakeholder Perspective
                </div>
                {availableUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition cursor-pointer ${
                      u.id === currentUser?.id ? 'bg-slate-800/80 text-white font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.role} • {u.organization}</div>
                    </div>
                    {u.id === currentUser?.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main App Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center justify-between">
          <div 
            onClick={() => onSelectView('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl shadow-md group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black tracking-tight text-white">
                  Integrity<span className="text-emerald-400">-OS</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-full">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                From Commitment to Evidence to Impact
              </p>
            </div>
          </div>

          {/* Quick Project Context Filter & Global Search */}
          <div className="flex items-center space-x-2 md:ml-6">
            <button
              onClick={onOpenCommandCenter}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs text-slate-300 flex items-center space-x-2 transition cursor-pointer"
              title="Open Command Center (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline text-slate-400">Search / Command...</span>
              <kbd className="hidden lg:inline-flex items-center space-x-0.5 px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-400 font-mono">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </kbd>
            </button>

            <select
              value={selectedProjectId || ''}
              onChange={(e) => onSelectProject(e.target.value || null)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="">All Projects Focus ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code}: {p.title.slice(0, 30)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : item.highlight
                      ? 'bg-indigo-950/60 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
