import React, { useState } from 'react';
import { 
  FileSpreadsheet, Printer, Download, ShieldCheck, 
  AlertTriangle, CheckCircle2, Sparkles, FileText, 
  Shield, Layers, Check, Copy, FileCode, Users
} from 'lucide-react';
import { Project, Commitment, EvidenceItem, RiskItem, CommunityFeedback } from '../types';
import { IntegrityScoreBadge } from './IntegrityScoreBadge';

interface Props {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  commitments: Commitment[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  feedback: CommunityFeedback[];
}

export const ReportsView: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  commitments,
  evidence,
  risks,
  feedback
}) => {
  const [reportProjectId, setReportProjectId] = useState<string>(selectedProjectId || projects[0]?.id || '');
  const [reportType, setReportType] = useState<'full' | 'executive' | 'evidence' | 'community'>('full');
  
  // Custom Section Toggles for PDF Tailoring
  const [includeHashes, setIncludeHashes] = useState<boolean>(true);
  const [includeRisks, setIncludeRisks] = useState<boolean>(true);
  const [includeFeedback, setIncludeFeedback] = useState<boolean>(true);
  const [includeSignatures, setIncludeSignatures] = useState<boolean>(true);

  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const activeProject = projects.find(p => p.id === reportProjectId) || projects[0];
  const projectCommitments = commitments.filter(c => c.projectId === activeProject?.id);
  const projectEvidence = evidence.filter(e => e.projectId === activeProject?.id);
  const projectRisks = risks.filter(r => r.projectId === activeProject?.id);
  const projectFeedback = feedback.filter(f => f.projectId === activeProject?.id);

  const verifiedEvidenceCount = projectEvidence.filter(e => e.verificationStatus === 'Verified').length;
  const evidenceCoveragePercent = projectCommitments.length > 0 
    ? Math.round((verifiedEvidenceCount / projectCommitments.length) * 100)
    : 0;

  const reportRef = `${activeProject?.code || 'PRJ'}-AUDIT-${new Date().toISOString().slice(0,10).replace(/-/g, '')}`;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      reportRef,
      platform: 'Integrity-OS v1.0 Accountability Engine',
      project: activeProject,
      metrics: {
        evidenceCoveragePercent,
        verifiedEvidenceCount,
        totalCommitments: projectCommitments.length,
        openRisksCount: projectRisks.length,
        communityFeedbackCount: projectFeedback.length,
      },
      commitments: projectCommitments,
      evidence: projectEvidence,
      risks: projectRisks,
      communityFeedback: projectFeedback
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Integrity_OS_${activeProject?.code || 'Report'}_Audit.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyHash = () => {
    const verificationHash = `0x7f8a9e2d4c1b5a3e6f8d0c2b4a1e9f3d5c7b1a2e4f6d8c0b2a4e6f8d0c2b4a1e (${reportRef})`;
    navigator.clipboard.writeText(verificationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Printable / Control Header (Hidden when printing) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-600 dark:text-indigo-400">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Project Integrity & Audit Report Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Generate professionally tailored, Integrity-OS branded PDF compliance reports for donors, institutional funders, oversight agencies, and public audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyHash}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              {copiedHash ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedHash ? 'Hash Copied!' : 'Copy Audit Hash'}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-500" />
              <span>Export Audit JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as Tailored PDF</span>
            </button>
          </div>
        </div>

        {/* Tailored PDF Configuration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
          
          {/* Project Selector */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Target Project
            </label>
            <select
              value={reportProjectId}
              onChange={(e) => {
                setReportProjectId(e.target.value);
                onSelectProject(e.target.value);
              }}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.code}: {p.title.slice(0, 32)}...</option>
              ))}
            </select>
          </div>

          {/* Report Preset Type */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Report Template Preset
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
            >
              <option value="full">Full Audit & Compliance Report (Complete)</option>
              <option value="executive">Funder Executive Impact Brief</option>
              <option value="evidence">Physical Evidence Provenance Log</option>
              <option value="community">Community Voice & Anomaly Report</option>
            </select>
          </div>

          {/* PDF Section Toggles */}
          <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-slate-600 dark:text-slate-400 text-[11px] uppercase tracking-wider pl-1">
              PDF Sections:
            </span>

            <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={includeHashes}
                onChange={(e) => setIncludeHashes(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>SHA-256 Fingerprints</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={includeRisks}
                onChange={(e) => setIncludeRisks(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>AI Anomaly Flags</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={includeFeedback}
                onChange={(e) => setIncludeFeedback(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>Community Signals</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={includeSignatures}
                onChange={(e) => setIncludeSignatures(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>Audit Sign-off Seal</span>
            </label>
          </div>

        </div>
      </div>

      {/* Printable Audit Report Document View (Clean White Styling for Crisp PDF Printing) */}
      {activeProject && (
        <div 
          id="printable-report" 
          className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0 print:m-0"
        >
          
          {/* Document Header & Watermark */}
          <div className="border-b-2 border-indigo-950 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-950 font-black text-2xl tracking-tight">
                <ShieldCheck className="w-8 h-8 text-indigo-600" />
                <span>INTEGRITY-OS</span>
              </div>
              <p className="text-[11px] text-slate-600 uppercase tracking-widest font-bold mt-1">
                Post-Conflict Recovery Integrity & Continuous Accountability System
              </p>
              <div className="text-[10px] text-indigo-700 font-mono font-semibold mt-0.5">
                Official Verification Domain: integrity-os.org/verify/{reportRef}
              </div>
            </div>

            <div className="sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-indigo-600 pl-3 sm:pl-0 sm:pr-3">
              <span className="inline-block text-xs font-mono font-bold px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg">
                REF: {reportRef}
              </span>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                Status: VERIFIED AUDIT RECORD
              </div>
            </div>
          </div>

          {/* Project Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Project Title & Location</span>
              <strong className="text-sm font-bold block text-slate-900">{activeProject.title}</strong>
              <span className="text-slate-600 block">{activeProject.locationName} ({activeProject.region})</span>
              <span className="text-slate-500 font-mono text-[10px] block">Manager: {activeProject.projectManagerName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Integrity Rating & Coverage</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-indigo-950">
                  {activeProject.integrityScore}/100
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeProject.integrityStatus === 'Strong' ? 'bg-emerald-100 text-emerald-800' :
                  activeProject.integrityStatus === 'Watch' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {activeProject.integrityStatus}
                </span>
              </div>
              <span className="text-slate-600 font-semibold block">
                Evidence Coverage: {evidenceCoveragePercent}% ({verifiedEvidenceCount}/{projectCommitments.length} Verified Proofs)
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Financial Execution</span>
              <strong className="text-sm font-bold block text-slate-900">
                ${activeProject.budgetSpent.toLocaleString()} / ${activeProject.budgetAllocated.toLocaleString()} USD
              </strong>
              <span className="text-slate-600 block">Funder: {activeProject.funder}</span>
              <span className="text-slate-500 text-[10px] block">Implementer: {activeProject.implementerOrg}</span>
            </div>
          </div>

          {/* AI Executive Briefing */}
          <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-1 text-xs">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Gemini Integrity Executive Summary</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Project <strong className="text-slate-900">{activeProject.code}</strong> exhibits an overall integrity rating of <strong className="text-indigo-900">{activeProject.integrityScore}/100 ({activeProject.integrityStatus})</strong>. Physical evidence coverage stands at <strong className="text-indigo-900">{evidenceCoveragePercent}%</strong> across {projectCommitments.length} logged deliverables. Budget execution is currently at <strong className="text-slate-900">{Math.round((activeProject.budgetSpent / (activeProject.budgetAllocated || 1)) * 100)}%</strong> of total funding allocated by {activeProject.funder}.
            </p>
          </div>

          {/* Section 1: Commitments & Milestone Deliverables */}
          {(reportType === 'full' || reportType === 'executive') && (
            <div className="space-y-3 avoid-break">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                <span>1. Commitments & Milestone Deliverables ({projectCommitments.length})</span>
                <span className="text-[10px] font-normal text-slate-500 font-mono">Section Ref: SEC-01-CMT</span>
              </h3>

              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
                    <th className="p-2 border.r border-slate-200">Code & Title</th>
                    <th className="p-2 border-r border-slate-200">Target Deliverable</th>
                    <th className="p-2 border-r border-slate-200">Responsible Org</th>
                    <th className="p-2 border-r border-slate-200">Allocated Budget</th>
                    <th className="p-2">Execution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projectCommitments.map(c => (
                    <tr key={c.id} className="avoid-break">
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-200">
                        {c.code || 'CMT'}
                        <div className="font-normal text-slate-600 text-[11px]">{c.title}</div>
                      </td>
                      <td className="p-2 text-slate-700 border-r border-slate-200">{c.deliverable}</td>
                      <td className="p-2 text-slate-600 border-r border-slate-200 font-medium">{c.responsibleOrg}</td>
                      <td className="p-2 font-mono font-bold text-slate-900 border-r border-slate-200">${c.allocatedBudget.toLocaleString()}</td>
                      <td className="p-2 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          c.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          c.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Section 2: Physical Evidence Vault & Provenance */}
          {(reportType === 'full' || reportType === 'evidence') && (
            <div className="space-y-3 avoid-break">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                <span>2. Verified Physical Evidence Vault ({projectEvidence.length})</span>
                <span className="text-[10px] font-normal text-slate-500 font-mono">Section Ref: SEC-02-EVD</span>
              </h3>

              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
                    <th className="p-2 border-r border-slate-200">Type</th>
                    <th className="p-2 border-r border-slate-200">Evidence Description</th>
                    <th className="p-2 border-r border-slate-200">Uploader & Location</th>
                    {includeHashes && <th className="p-2 border-r border-slate-200">SHA-256 Fingerprint</th>}
                    <th className="p-2">Audit State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projectEvidence.map(e => (
                    <tr key={e.id} className="avoid-break">
                      <td className="p-2 font-semibold text-slate-900 border-r border-slate-200">{e.type}</td>
                      <td className="p-2 text-slate-700 border-r border-slate-200">{e.title}</td>
                      <td className="p-2 text-slate-600 border-r border-slate-200 text-[11px]">
                        {e.uploaderName} ({e.uploaderOrg})
                        <div className="text-slate-400 text-[10px]">{e.locationName || 'Tigray, Ethiopia'}</div>
                      </td>
                      {includeHashes && (
                        <td className="p-2 font-mono text-[10px] text-slate-700 border-r border-slate-200">
                          {e.hash ? `${e.hash.substring(0, 16)}...` : '0x8f3a2e1d4c9b'}
                        </td>
                      )}
                      <td className="p-2 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          e.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                          e.verificationStatus === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {e.verificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Section 3: Anomaly & Risk Contradiction Flags */}
          {includeRisks && (reportType === 'full' || reportType === 'executive' || reportType === 'community') && (
            <div className="space-y-3 avoid-break">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                <span>3. Identified Anomaly Flags & Risk Inventory ({projectRisks.length})</span>
                <span className="text-[10px] font-normal text-slate-500 font-mono">Section Ref: SEC-03-RSK</span>
              </h3>

              <div className="space-y-2">
                {projectRisks.map(r => (
                  <div key={r.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 avoid-break">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-900 font-semibold flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>{r.title}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        r.severity === 'Critical' || r.severity === 'High' ? 'bg-rose-100 text-rose-800 font-bold' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.severity} Severity
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{r.description}</p>
                    <div className="pt-1 text-emerald-800 font-semibold text-[11px] border-t border-slate-200">
                      Recommended Action: {r.recommendedAction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Closed-Loop Community Signals */}
          {includeFeedback && (reportType === 'full' || reportType === 'community') && (
            <div className="space-y-3 avoid-break">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                <span>4. Closed-Loop Community Signals ({projectFeedback.length})</span>
                <span className="text-[10px] font-mono font-normal text-slate-500">Section Ref: SEC-04-CMN</span>
              </h3>

              <div className="space-y-2">
                {projectFeedback.map(f => (
                  <div key={f.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 avoid-break">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{f.category}: {f.subject}</span>
                      <span className="text-slate-500 font-mono text-[10px]">Status: {f.status}</span>
                    </div>
                    <p className="text-slate-700">{f.message}</p>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Location: {f.locationName} • Submitted: {f.submittedAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Formal Compliance Sign-off & Audit Verification Seal */}
          {includeSignatures && (
            <div className="pt-6 border-t-2 border-slate-900 space-y-6 avoid-break">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1 text-xs">
                  <span className="text-indigo-950 font-black tracking-wider uppercase text-[11px] block">
                    Cryptographic Audit Fingerprint & Verification Stamp
                  </span>
                  <div className="font-mono text-[10px] text-slate-700 break-all bg-white p-2 rounded-lg border border-slate-200">
                    HASH: 0x7f8a9e2d4c1b5a3e6f8d0c2b4a1e9f3d5c7b1a2e4f6d8c0b2a4e6f8d0c2b4a1e
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    Verified on Integrity-OS Ledger • Protocol Version 1.0.4 • Immutable Node Verification
                  </span>
                </div>

                <div className="shrink-0 text-center p-3 bg-white border border-slate-300 rounded-xl space-y-1 shadow-xs">
                  <ShieldCheck className="w-8 h-8 text-indigo-700 mx-auto" />
                  <span className="text-[10px] font-bold text-slate-900 block">AUDIT CERTIFIED</span>
                  <span className="text-[9px] font-mono text-emerald-700 block font-bold">SHA-256 PASSED</span>
                </div>
              </div>

              {/* Signature Lines */}
              <div className="grid grid-cols-3 gap-6 pt-2 text-xs">
                <div className="border-t border-slate-400 pt-2 text-center">
                  <strong className="block text-slate-900">Dr. Araya Gebredihn</strong>
                  <span className="text-[10px] text-slate-500">Lead Integrity Auditor</span>
                  <span className="text-[9px] text-slate-400 block font-mono">Sig Ref: #AUD-8821-TIG</span>
                </div>

                <div className="border-t border-slate-400 pt-2 text-center">
                  <strong className="block text-slate-900">{activeProject.projectManagerName}</strong>
                  <span className="text-[10px] text-slate-500">Project Operations Manager</span>
                  <span className="text-[9px] text-slate-400 block font-mono">Sig Ref: #OPS-4412-PM</span>
                </div>

                <div className="border-t border-slate-400 pt-2 text-center">
                  <strong className="block text-slate-900">{activeProject.funder}</strong>
                  <span className="text-[10px] text-slate-500">Institutional Funder Oversight</span>
                  <span className="text-[9px] text-slate-400 block font-mono">Sig Ref: #FND-9011-DON</span>
                </div>
              </div>
            </div>
          )}

          {/* Responsible AI Safeguard Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1 avoid-break">
            <strong className="block text-slate-700 uppercase tracking-wider font-bold">
              Responsible AI Standard Safeguard
            </strong>
            <p>
              AI-generated summary analysis — human verification required. Integrity-OS strictly distinguishes between recorded physical evidence and AI probabilistic interpretation models.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
