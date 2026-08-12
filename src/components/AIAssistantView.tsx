import React, { useState } from 'react';
import { 
  Sparkles, Send, ShieldCheck, ShieldAlert, 
  AlertTriangle, FileText, CheckCircle2, HelpCircle, CornerDownLeft, RefreshCw
} from 'lucide-react';
import { Project } from '../types';
import { api } from '../lib/api';
import { ResponsibleAIBanner } from './ResponsibleAIBanner';

interface Props {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
}

export const AIAssistantView: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProject
}) => {
  const [targetProjectId, setTargetProjectId] = useState<string>(selectedProjectId || projects[0]?.id || '');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Chat/Query State
  const [queryInput, setQueryInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string; timestamp: string }>>([
    {
      role: 'assistant',
      text: 'Greetings. I am the Integrity-OS AI Analyst (powered by Gemini 3.6 Flash). I can perform deep cross-correlation across commitments, warehouse evidence, and community reports. How can I assist your audit today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isQuerying, setIsQuerying] = useState(false);

  // Preset Prompts for Quick Testing
  const presetQueries = [
    'Which commitments are currently at risk or missing evidence?',
    'Summarize all community reports regarding missing storehouse goods',
    'What is the largest financial discrepancy in Adigrat Water Reactivation?',
    'Provide a 3-bullet executive integrity summary across all projects'
  ];

  const handleRunAnalysis = async () => {
    if (!targetProjectId) return;
    setIsAnalyzing(true);
    try {
      const res = await api.analyzeProjectWithAI(targetProjectId);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    } catch (err: any) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  const handleSendQuery = async (queryText?: string) => {
    const q = queryText || queryInput;
    if (!q.trim()) return;

    const userMsg = {
      role: 'user' as const,
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!queryText) setQueryInput('');
    setIsQuerying(true);

    try {
      const res = await api.queryIntegrityAI(q, targetProjectId || undefined);
      const assistantMsg = {
        role: 'assistant' as const,
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, assistantMsg]);
      setIsQuerying(false);
    } catch (err: any) {
      const errorMsg = {
        role: 'assistant' as const,
        text: `Error processing query: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
      setIsQuerying(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Responsible AI Banner */}
      <ResponsibleAIBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span>Integrity AI Intelligence Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Server-side Gemini 3.6 Flash cross-checks contracts, invoices, geotags, and community feedback
          </p>
        </div>

        {/* Project Selector for AI Focus */}
        <div className="flex items-center space-x-2 shrink-0">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Scan Target:</label>
          <select
            value={targetProjectId}
            onChange={(e) => {
              setTargetProjectId(e.target.value);
              onSelectProject(e.target.value);
            }}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.code}: {p.title.slice(0, 30)}...</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: AI Scan & Analysis (Left) + Natural Language Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Project Analysis Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Deep Automated Project Scan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate structured integrity diagnosis, risk scores, and recommendations
              </p>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Scanning...' : 'Run Gemini Scan'}</span>
            </button>
          </div>

          {/* Analysis Results Display */}
          {analysisResult ? (
            <div className="space-y-4 animate-in fade-in duration-200 text-xs">
              
              {/* Score Header */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assessed Integrity Score</span>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {analysisResult.integrityScore}/100
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Risk Assessment</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    analysisResult.riskLevel === 'High' || analysisResult.riskLevel === 'Critical' 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {analysisResult.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/60">
                <span className="font-bold text-indigo-950 dark:text-indigo-200 block mb-1">AI Executive Summary:</span>
                <p className="text-indigo-900 dark:text-indigo-200/90 leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Key Findings */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Key Identified Anomaly Findings:
                </h4>
                <ul className="space-y-1.5">
                  {analysisResult.keyFindings?.map((finding: string, idx: number) => (
                    <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Recommended Human Verification Actions:
                </h4>
                <ul className="space-y-1.5">
                  {analysisResult.recommendedActions?.map((act: string, idx: number) => (
                    <li key={idx} className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start space-x-2 text-emerald-900 dark:text-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ready for AI Integrity Analysis
              </h4>
              <p className="text-xs max-w-sm">
                Click "Run Gemini Scan" above to synthesize commitments, storehouse logs, geotag hashes, and community reports into a unified diagnosis.
              </p>
            </div>
          )}

        </div>

        {/* Right Col: Natural Language AI Query Interface */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Send className="w-4 h-4 text-indigo-500" />
                <span>Audit Query Interface</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                Gemini 3.6 Flash
              </span>
            </div>

            {/* Quick Preset Prompt Chips */}
            <div className="mb-4 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Quick Audit Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetQueries.map((pq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuery(pq)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] font-medium transition cursor-pointer text-left line-clamp-1"
                  >
                    "{pq}"
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white ml-8'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 mr-8'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] opacity-75 mb-0.5">
                    <strong className="uppercase font-mono">{msg.role === 'user' ? 'You (Auditor)' : 'Integrity AI'}</strong>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              ))}

              {isQuerying && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-xs text-slate-400 flex items-center space-x-2 mr-8">
                  <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                  <span>Cross-referencing database records with Gemini AI...</span>
                </div>
              )}
            </div>
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }} className="relative pt-2">
            <input
              type="text"
              placeholder="Ask Integrity AI anything about project commitments, evidence, or risks..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-4 pr-10 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isQuerying}
              className="absolute right-2 top-3.5 p-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition cursor-pointer"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
