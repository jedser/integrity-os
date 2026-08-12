import React, { useState } from 'react';
import { 
  X, UserCheck, Building2, ShieldCheck, CheckCircle2, 
  LogIn, UserPlus, Sparkles, Key
} from 'lucide-react';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  availableUsers: User[];
  onSwitchUser: (userId: string) => void;
  onRegisterUser?: (newUser: Omit<User, 'id'>) => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  availableUsers,
  onSwitchUser,
  onRegisterUser,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser?.id || availableUsers[0]?.id || '');
  
  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>('Project Manager');
  const [organization, setOrganization] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onSwitchUser(selectedUserId);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !organization) return;

    if (onRegisterUser) {
      onRegisterUser({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@${organization.toLowerCase().replace(/\s+/g, '')}.org`,
        role,
        organization,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }

    setSignupSuccess(true);
    setTimeout(() => {
      setSignupSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-white space-y-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/30 border border-indigo-500/30 rounded-2xl text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Integrity-OS Account Portal
              </h3>
              <p className="text-xs text-slate-400">
                Multi-Tenant Role Authentication & Stakeholder Sign In
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer ${
              tab === 'signin' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In (Switch Role)</span>
          </button>

          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer ${
              tab === 'signup' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Organization</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Stakeholder Account
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {availableUsers.map((u) => (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUserId(u.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        selectedUserId === u.id
                          ? 'bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                          : 'bg-slate-800/50 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={u.avatarUrl || u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                          alt={u.name} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{u.name}</div>
                          <div className="text-[10px] text-slate-400">{u.role} • {u.organization}</div>
                        </div>
                      </div>

                      {selectedUserId === u.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In as Selected Persona</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              {signupSuccess ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold">Organization & User Account Created!</p>
                  <p className="text-[11px] text-emerald-300">Signing in automatically...</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Araya Gebredihn"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Organization Name</label>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Tigray Reconstruction Alliance"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Stakeholder Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="Administrator">Administrator (Full Platform Control)</option>
                      <option value="Project Manager">Project Manager (Regional Oversight)</option>
                      <option value="Field Implementer / NGO">Field Implementer / NGO (Evidence Submission)</option>
                      <option value="Community Resident">Community Resident (Citizen Feedback)</option>
                      <option value="Donor / Funder Observer">Donor / Funder Observer (Audit & Portfolio View)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Work Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="araya@tigrayreconstruct.org"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Register Account & Sign In</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
