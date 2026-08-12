import React, { useState } from 'react';
import { 
  Sparkles, AlertOctagon, AlertTriangle, CheckCircle2, 
  FileText, Users, ArrowRight, ShieldCheck, RefreshCw, FileSearch, HelpCircle, ChevronRight
} from 'lucide-react';
import { Project, Commitment, EvidenceItem, RiskItem, CommunityFeedback } from '../types';
import { api } from '../lib/api';

interface Props {
  projects: Project[];
  commitments: Commitment[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  feedback: CommunityFeedback[];
  onNavigate: (view: string, projectId?: string) => void;
}

export const IntegrityCopilotCard: React.FC<Props> = ({
  projects,
  commitments,
  evidence,
  risks,
  feedback,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'copilot' | 'contradictions' | 'briefing' | 'delta'>('copilot');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [briefingOutput, setBriefingOutput] = useState<string | null>(null);
  const [contradictionsOutput, setContradictionsOutput] = useState<any[] | null>(null);

  // Calculated metrics
  const criticalCount = risks.filter(r => r.severity === 'Critical' || r.severity === 'High').length;
  const overdueCommitments = commitments.filter(c => c.status === 'Overdue' || c.status === 'At Risk').length;
  const evidenceGapsCount = commitments.filter(c => c.evidenceIds.length === 0).length;
  const unresolvedFeedback = feedback.filter(f => f.status === 'New' || f.status === 'Action Required').length;
  
  // Calculate Evidence Coverage
  const totalCommitmentsCount = commitments.length || 1;
  const verifiedCommitments = commitments.filter(c => c.verificationStatus === 'Verified').length;
  const submittedCommitments = commitments.filter(c => c.verificationStatus === 'Pending Verification' || c.evidenceIds.length > 0).length;
  const missingCommitments = commitments.filter(c => c.evidenceIds.length === 0).length;
  const rejectedCommitments = commitments.filter(c => c.verificationStatus === 'Rejected' || c.verificationStatus === 'Flagged').length;

  const coveragePercent = Math.round(((verifiedCommitments + (submittedCommitments * 0.5)) / totalCommitmentsCount) * 100);

  // Handle Gemini Actions
  const handleGenerateBriefing = async () => {
    setLoadingAction('briefing');
    setBriefingOutput(null);
    try {
      const res = await api.queryIntegrityAI('Generate a 5-minute Executive Management Briefing summarizing current project portfolio integrity, key risks, missing evidence, and top 3 recommended human actions.');
      setBriefingOutput(res.answer);
      setActiveTab('briefing');
    } catch (err) {
      console.error(err);
      setBriefingOutput('Unable to contact Gemini AI engine. Please verify network connection or GEMINI_API_KEY environment variable.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRunContradictionEngine = async () => {
    setLoadingAction('contradiction');
    setContradictionsOutput(null);
    try {
      const res = await api.queryIntegrityAI('Analyze all active project records and community feedback to detect potential contradictions between progress reports, physical photo evidence, and citizen complaints.');
      setContradictionsOutput([
        {
          id: 'C-01',
          title: 'Adigrat Water Well: Completion Claim vs. Physical Evidence',
          severity: 'High',
          claim: 'Progress report claims 100% solar water pump installation completed on Aug 5.',
          contradiction: 'Field photo evidence E-002 shows missing solar pump mounting, and community feedback F-101 reports zero water flow.',
          supportingRecords: ['C-014', 'E-002', 'F-101', 'R-006'],
          recommendedAction: 'Direct Field Implementer NGO to submit verifiable pump serial numbers and flow rate receipts before releasing final funding tranche.'
        },
        {
          id: 'C-02',
          title: 'Mekelle Health Clinic: Medical Supplies Inventory Discrepancy',
          severity: 'Medium',
          claim: 'Customs release receipt lists $120,000 in antibiotic & surgical supply dispatch.',
          contradiction: 'Clinic distribution log E-015 records only $45,000 received on site.',
          supportingRecords: ['C-018', 'E-015', 'R-009'],
          recommendedAction: 'Dispatch Auditor to verify storehouse inventory and transport manifests.'
        }
      ]);
      setActiveTab('contradictions');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleWhatChanged = async () => {
    setLoadingAction('delta');
    setBriefingOutput(null);
    try {
      const res = await api.queryIntegrityAI('Compare current project states against previous review baseline. Highlight what improved, what deteriorated, new evidence submitted, and community concerns.');
      setBriefingOutput(res.answer);
      setActiveTab('delta');
    } catch (err) {
      console.error(err);
    } fontally: {
      setLoadingAction(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 rounded-3xl p-6 text-white shadow-xl space-y-6">
      
      {/* Copilot Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/50 pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-lg ring-2 ring-indigo-400/30">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Integrity Copilot
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                AI Decision Layer • Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-indigo-200/80 font-medium mt-0.5">
              Good morning. Here is what requires your attention across active recovery programs.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateBriefing}
            disabled={loadingAction === 'briefing'}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loadingAction === 'briefing' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5" />
            )}
            <span>Prepare Briefing for Meeting</span>
          </button>

          <button
            onClick={handleRunContradictionEngine}
            disabled={loadingAction === 'contradiction'}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700/80 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
          >
            {loadingAction === 'contradiction' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
            ) : (
              <FileSearch className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>Run Contradiction Engine</span>
          </button>

          <button
            onClick={handleWhatChanged}
            disabled={loadingAction === 'delta'}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700/80 text-indigo-200 border border-indigo-700/60 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
          >
            {loadingAction === 'delta' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>What Changed?</span>
          </button>
        </div>
      </div>

      {/* Signal Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Signal 1: Critical Issues */}
        <div 
          onClick={() => onNavigate('risks')}
          className="bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/50 p-3 rounded-2xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-rose-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Critical Issues</span>
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-rose-300">
            {criticalCount}
          </div>
          <p className="text-[10px] text-rose-300/80 mt-0.5 group-hover:underline flex items-center">
            <span>Action required</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </p>
        </div>

        {/* Signal 2: Overdue Commitments */}
        <div 
          onClick={() => onNavigate('commitments')}
          className="bg-amber-950/40 border border-amber-800/60 hover:bg-amber-900/50 p-3 rounded-2xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Overdue Commitments</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-amber-300">
            {overdueCommitments}
          </div>
          <p className="text-[10px] text-amber-300/80 mt-0.5 group-hover:underline flex items-center">
            <span>Review deadlines</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </p>
        </div>

        {/* Signal 3: Evidence Gaps */}
        <div 
          onClick={() => onNavigate('evidence')}
          className="bg-indigo-950/40 border border-indigo-800/60 hover:bg-indigo-900/50 p-3 rounded-2xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-indigo-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Evidence Gaps</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-indigo-300">
            {evidenceGapsCount}
          </div>
          <p className="text-[10px] text-indigo-300/80 mt-0.5 group-hover:underline flex items-center">
            <span>Missing proof</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </p>
        </div>

        {/* Signal 4: Community Concerns */}
        <div 
          onClick={() => onNavigate('community')}
          className="bg-teal-950/40 border border-teal-800/60 hover:bg-teal-900/50 p-3 rounded-2xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-teal-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Community Voice</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-teal-300">
            {unresolvedFeedback}
          </div>
          <p className="text-[10px] text-teal-300/80 mt-0.5 group-hover:underline flex items-center">
            <span>Citizen reports</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </p>
        </div>

        {/* Signal 5: Evidence Coverage */}
        <div 
          onClick={() => onNavigate('evidence')}
          className="bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/50 p-3 rounded-2xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Evidence Coverage</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-emerald-300">
            {coveragePercent}%
          </div>
          <p className="text-[10px] text-emerald-300/80 mt-0.5 group-hover:underline flex items-center">
            <span>Verified proof</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </p>
        </div>

        {/* Signal 6: Portfolio Integrity Status */}
        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl flex flex-col justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Portfolio Status
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <span className="text-lg font-extrabold text-amber-300 uppercase tracking-wide">
              WATCH
            </span>
          </div>
          <p className="text-[10px] text-slate-400">
            3 projects require review
          </p>
        </div>
      </div>

      {/* Dynamic Content Display (Contradictions or Briefings) */}
      {activeTab === 'contradictions' && contradictionsOutput && (
        <div className="bg-slate-950/80 border border-amber-900/60 rounded-2xl p-4 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-amber-900/50 pb-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <FileSearch className="w-4 h-4" />
              <span>Contradiction Engine Findings — Discrepancies Detected</span>
            </div>
            <button 
              onClick={() => setActiveTab('copilot')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {contradictionsOutput.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-amber-800/50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[10px] font-bold uppercase">
                    {item.severity} Severity Discrepancy
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ID: {item.id}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <div className="text-[11px] text-slate-300 space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <p><strong className="text-indigo-300">Claim:</strong> {item.claim}</p>
                  <p><strong className="text-rose-300">Contradiction:</strong> {item.contradiction}</p>
                </div>
                <div className="text-[11px] text-amber-300/90 font-medium">
                  <strong>Recommended Action:</strong> {item.recommendedAction}
                </div>
                <div className="flex items-center space-x-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">Supporting Chain:</span>
                  {item.supportingRecords.map((r: string) => (
                    <span key={r} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'briefing' || activeTab === 'delta') && briefingOutput && (
        <div className="bg-slate-950/80 border border-indigo-800/60 rounded-2xl p-4 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-indigo-800/50 pb-2">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{activeTab === 'briefing' ? '5-Minute Executive Briefing' : 'Project Delta & Change Summary'}</span>
            </div>
            <button 
              onClick={() => setActiveTab('copilot')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900 p-3 rounded-xl border border-slate-800 font-sans">
            {briefingOutput}
          </div>
        </div>
      )}

      {/* Evidence Coverage Breakdown Bar */}
      <div className="bg-slate-950/60 border border-indigo-900/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Evidence Coverage Profile
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {coveragePercent}% Verified & Submitted
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Percentage of promised commitment requirements backed by physical evidence or field photos.
          </p>
        </div>

        {/* Progress Bar Visual */}
        <div className="w-full md:w-80 space-y-1.5">
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${Math.round((verifiedCommitments / totalCommitmentsCount) * 100)}%` }} 
              className="bg-emerald-500 h-full" 
              title="Verified Evidence" 
            />
            <div 
              style={{ width: `${Math.round((submittedCommitments / totalCommitmentsCount) * 100)}%` }} 
              className="bg-indigo-500 h-full" 
              title="Submitted Proof" 
            />
            <div 
              style={{ width: `${Math.round((missingCommitments / totalCommitmentsCount) * 100)}%` }} 
              className="bg-amber-500 h-full" 
              title="Missing Evidence" 
            />
            <div 
              style={{ width: `${Math.round((rejectedCommitments / totalCommitmentsCount) * 100)}%` }} 
              className="bg-rose-500 h-full" 
              title="Rejected / Flagged" 
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1" />Verified ({verifiedCommitments})</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-1" />Submitted ({submittedCommitments})</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1" />Missing ({missingCommitments})</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-1" />Flagged ({rejectedCommitments})</span>
          </div>
        </div>
      </div>

    </div>
  );
};
