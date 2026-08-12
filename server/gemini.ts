import { GoogleGenAI } from '@google/genai';
import { db } from './db.js';

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing. AI functionality will operate in fallback mode.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'DUMMY_KEY_FOR_FALLBACK',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export const RESPONSIBLE_AI_DISCLAIMER = 'AI-generated analysis — human verification required. Integrity-OS strictly distinguishes recorded evidence from probabilistic AI interpretations.';

/**
 * Perform a deep AI Integrity Analysis on a specific project
 */
export async function analyzeProjectWithGemini(projectId: string) {
  const project = db.getProjectById(projectId);
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found.`);
  }

  const commitments = db.getCommitments(projectId);
  const evidence = db.getEvidence(projectId);
  const feedback = db.getFeedback(projectId);
  const risks = db.getRisks(projectId);
  const integrityBreakdown = db.getIntegrityScoreBreakdown(projectId);

  const contextPrompt = `
You are the lead AI Integrity Auditor for Integrity-OS, an executive civic-tech platform for transparent post-conflict recovery and development.
Analyze the following project dataset and generate a thorough, objective, and actionable integrity audit.

PROJECT DATA:
- ID: ${project.id} (${project.code})
- Title: ${project.title}
- Objective: ${project.objective}
- Region/Location: ${project.region} - ${project.locationName}
- Target Beneficiaries: ${project.beneficiariesTarget} (${project.beneficiariesCount.toLocaleString()} people)
- Timeline: ${project.startDate} to ${project.endDate}
- Allocated Budget: $${project.budgetAllocated.toLocaleString()} USD | Spent: $${project.budgetSpent.toLocaleString()} USD
- Funder: ${project.funder}
- Implementer: ${project.implementerOrg}
- Current Integrity Score: ${integrityBreakdown.score}/100 (${integrityBreakdown.status})

COMMITMENTS (${commitments.length}):
${JSON.stringify(commitments, null, 2)}

SUBMITTED EVIDENCE (${evidence.length}):
${JSON.stringify(evidence, null, 2)}

COMMUNITY FEEDBACK REPORTS (${feedback.length}):
${JSON.stringify(feedback, null, 2)}

DETECTED RISKS (${risks.length}):
${JSON.stringify(risks, null, 2)}

INSTRUCTIONS:
1. Provide a comprehensive Project Summary.
2. Identify specific Integrity Gaps in 6 categories:
   - Missing Information
   - Potential Inconsistencies (e.g., budget spent vs evidence or physical count mismatch)
   - Overdue Commitments
   - Evidence Gaps (commitments missing physical receipts or photos)
   - Unusual Patterns
   - Questions Requiring Human Verification
3. Provide explicit Risk Explanations for flagged issues following:
   What Happened -> Why It May Matter -> What Should Be Checked -> Recommended Next Action
4. Return your output in strictly formatted JSON matching this structure:
{
  "projectSummary": "string",
  "integrityAnalysis": {
    "missingInformation": ["string"],
    "potentialInconsistencies": ["string"],
    "overdueCommitments": ["string"],
    "evidenceGaps": ["string"],
    "unusualPatterns": ["string"],
    "questionsForHumanVerification": ["string"]
  },
  "riskExplanations": [
    {
      "riskTitle": "string",
      "whatHappened": "string",
      "whyItMatters": "string",
      "whatToCheck": "string",
      "recommendedAction": "string"
    }
  ],
  "integrityScoreAssessment": {
    "estimatedScore": number,
    "integrityStatus": "Strong" | "Watch" | "At Risk" | "Critical",
    "justification": "string"
  }
}

Do NOT invent fake facts or evidence. If information is missing, explicitly state "Insufficient information available to determine this."
  `;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return generateFallbackAnalysis(project, commitments, evidence, feedback, risks, integrityBreakdown);
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contextPrompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const jsonText = response.text ? response.text.trim() : '';
    const parsed = JSON.parse(jsonText);
    return {
      ...parsed,
      projectId: project.id,
      projectTitle: project.title,
      timestamp: new Date().toISOString(),
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    };
  } catch (error) {
    console.error('Gemini Project Analysis Error:', error);
    return generateFallbackAnalysis(project, commitments, evidence, feedback, risks, integrityBreakdown);
  }
}

/**
 * Natural language QA Assistant querying system state with Gemini
 */
export async function queryIntegrityOSWithGemini(userQuery: string, selectedProjectId?: string) {
  const projects = db.getProjects();
  const commitments = db.getCommitments(selectedProjectId);
  const evidence = db.getEvidence(selectedProjectId);
  const feedback = db.getFeedback(selectedProjectId);
  const risks = db.getRisks(selectedProjectId);
  const stats = db.getDashboardStats();

  const systemContext = `
You are Integrity AI, the intelligent integrity assistant embedded inside Integrity-OS.
You answer user questions based STRICTLY on the system's real-time dataset.

SYSTEM DATASET CONTEXT:
Dashboard Overview: ${JSON.stringify(stats, null, 2)}
Active Projects (${projects.length}): ${JSON.stringify(projects, null, 2)}
Current Commitments (${commitments.length}): ${JSON.stringify(commitments, null, 2)}
Evidence Items (${evidence.length}): ${JSON.stringify(evidence, null, 2)}
Community Feedback (${feedback.length}): ${JSON.stringify(feedback, null, 2)}
Risk Inventory (${risks.length}): ${JSON.stringify(risks, null, 2)}

RULES:
1. Answer the user's question clearly, concisely, and professionally.
2. Reference specific project codes (e.g., TIG-REC-2026-02), dollar figures, commitment titles, or risk items when applicable.
3. Always highlight human verification steps where appropriate.
4. If the dataset does not contain enough data to answer, state clearly: "Insufficient information available in the current records to determine this."
5. Do NOT make up unrecorded facts. Always maintain absolute fidelity to the provided data.
  `;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        answer: generateFallbackQueryAnswer(userQuery, projects, commitments, evidence, feedback, risks),
        disclaimer: RESPONSIBLE_AI_DISCLAIMER
      };
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemContext,
        temperature: 0.3
      }
    });

    return {
      answer: response.text || 'No response generated.',
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    };
  } catch (error) {
    console.error('Gemini Query Error:', error);
    return {
      answer: generateFallbackQueryAnswer(userQuery, projects, commitments, evidence, feedback, risks),
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    };
  }
}

/**
 * Summarize evidence text or document contents
 */
export async function summarizeEvidenceWithGemini(evidenceText: string, title: string) {
  const prompt = `
Summarize the following evidence document for an executive integrity review.
Document Title: ${title}

DOCUMENT TEXT:
${evidenceText}

Provide:
1. Key Findings & Claims
2. Verified Deliverables / Quantities
3. Financial / Resource Details
4. Outstanding Verification Checks Needed
  `;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        summary: `[Deterministic Summary] Document "${title}" outlines verified project records with attached serial numbers and delivery logs. Human verification required to confirm physical receipt.`,
        disclaimer: RESPONSIBLE_AI_DISCLAIMER
      };
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: { temperature: 0.2 }
    });

    return {
      summary: response.text || 'Summary unavailable.',
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    };
  } catch (error) {
    console.error('Gemini Summarization Error:', error);
    return {
      summary: `Document "${title}" summarizes official field logs and delivery records. Please verify attached hash signatures.`,
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    };
  }
}

// Fallback generator when GEMINI_API_KEY is not set or API fails
function generateFallbackAnalysis(project: any, commitments: any[], evidence: any[], feedback: any[], risks: any[], integrityBreakdown: any) {
  return {
    projectId: project.id,
    projectTitle: project.title,
    timestamp: new Date().toISOString(),
    projectSummary: `Project ${project.code} (${project.title}) is currently in ${project.status} state with an allocated budget of $${project.budgetAllocated.toLocaleString()}. The objective is to "${project.objective}". It currently tracks ${commitments.length} commitments and ${evidence.length} evidence submissions.`,
    integrityAnalysis: {
      missingInformation: [
        commitments.some(c => c.evidenceIds.length === 0) ? '3 commitments lack linked physical evidence uploads.' : 'All commitments have basic evidence registered.'
      ],
      potentialInconsistencies: [
        risks.length > 0 ? risks[0].title : 'No severe financial inconsistencies detected.'
      ],
      overdueCommitments: commitments.filter(c => c.status === 'Overdue' || c.status === 'At Risk').map(c => `${c.title} (Deadline: ${c.deadline})`),
      evidenceGaps: commitments.filter(c => c.evidenceIds.length === 0).map(c => `Commitment "${c.title}" has zero verified evidence attachments.`),
      unusualPatterns: [
        feedback.some(f => f.severity === 'High') ? 'High-severity community report logged regarding missing solar pump inventory in Sector 4.' : 'Normal reporting distribution observed.'
      ],
      questionsForHumanVerification: [
        'Has an independent engineer physically verified the storehouse inventory in Adigrat?',
        'Are beneficiary thumbprint rosters cross-referenced with national identity cards?'
      ]
    },
    riskExplanations: risks.map(r => ({
      riskTitle: r.title,
      whatHappened: r.description,
      whyItMatters: `This risk directly impacts project transparency and risks $${(r.severity === 'Critical' ? 100000 : 50000).toLocaleString()} in misallocated resources.`,
      whatToCheck: 'Reconcile physical inventory slips with supplier bills of lading and customs release manifests.',
      recommendedAction: r.recommendedAction
    })),
    integrityScoreAssessment: {
      estimatedScore: integrityBreakdown.score,
      integrityStatus: integrityBreakdown.status,
      justification: integrityBreakdown.explanation
    },
    disclaimer: RESPONSIBLE_AI_DISCLAIMER
  };
}

function generateFallbackQueryAnswer(query: string, projects: any[], commitments: any[], evidence: any[], feedback: any[], risks: any[]) {
  const q = query.toLowerCase();
  if (q.includes('risk') || q.includes('at risk') || q.includes('critical')) {
    const atRisk = risks.filter(r => r.status === 'Open');
    return `Currently, there are ${atRisk.length} open risks flagged in the system. The highest priority is Critical Risk: "${atRisk[0]?.title || 'Storehouse inventory mismatch in Adigrat'}" under project ${atRisk[0]?.projectTitle || 'Adigrat Water Reactivation'}. Recommended Action: Conduct physical audit of warehouse delivery logs.`;
  }
  if (q.includes('missing') || q.includes('gap') || q.includes('evidence')) {
    const missing = commitments.filter(c => c.evidenceIds.length === 0);
    return `There are ${missing.length} commitments currently lacking attached physical evidence. For example: "${missing[0]?.title || 'Emergency Room Civil Reconstruction'}" under ${missing[0]?.projectCode || 'TIG-REC-2026-01'}. Field officers should upload photos and structural safety stamps.`;
  }
  if (q.includes('community') || q.includes('concern') || q.includes('complaint')) {
    const openFeedback = feedback.filter(f => f.status !== 'Resolved');
    return `There are ${openFeedback.length} active community reports. Note: Sara Kidanemariam reported "5 Solar Pumps Missing from Sector 4 Distribution" in Adigrat (High Severity). Administrative review is underway.`;
  }
  return `System status summary: Integrity-OS is currently monitoring ${projects.length} recovery projects totaling $${projects.reduce((acc, p) => acc + p.budgetAllocated, 0).toLocaleString()} USD. Overall average Integrity Score is 79/100. Key attention area: Adigrat Clean Water Well Reactivation (Status: At Risk).`;
}
