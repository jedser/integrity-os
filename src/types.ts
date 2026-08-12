export type UserRole = 
  | 'Administrator' 
  | 'Project Manager' 
  | 'Implementer' 
  | 'Community/User' 
  | 'Funder/Observer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatarUrl?: string;
}

export type IntegrityStatus = 'Strong' | 'Watch' | 'At Risk' | 'Critical';

export interface Project {
  id: string;
  code: string;
  title: string;
  description: string;
  objective: string;
  region: string;
  locationName: string;
  coordinates: { lat: number; lng: number };
  beneficiariesCount: number;
  beneficiariesTarget: string;
  startDate: string;
  endDate: string;
  budgetAllocated: number;
  budgetSpent: number;
  funder: string;
  implementerOrg: string;
  projectManagerName: string;
  status: 'Planning' | 'Active' | 'Under Review' | 'Completed' | 'Suspended';
  integrityScore: number; // 0 - 100
  integrityStatus: IntegrityStatus;
  createdAt: string;
  updatedAt: string;
}

export type CommitmentStatus = 
  | 'Planned' 
  | 'In Progress' 
  | 'Evidence Submitted' 
  | 'Verified' 
  | 'Completed' 
  | 'At Risk' 
  | 'Overdue';

export type VerificationStatus = 'Unverified' | 'Pending Verification' | 'Verified' | 'Rejected' | 'Flagged';

export interface Commitment {
  id: string;
  projectId: string;
  projectCode?: string;
  title: string;
  description: string;
  responsiblePerson: string;
  responsibleOrg: string;
  allocatedBudget: number;
  spentBudget: number;
  deadline: string;
  deliverable: string;
  status: CommitmentStatus;
  verificationStatus: VerificationStatus;
  evidenceIds: string[];
  verifierNotes?: string;
  updatedAt: string;
}

export type EvidenceType = 
  | 'Document' 
  | 'Photo' 
  | 'Financial Receipt' 
  | 'Audit Report' 
  | 'Satellite Inspection' 
  | 'Beneficiary Log' 
  | 'Link';

export interface EvidenceItem {
  id: string;
  projectId: string;
  projectTitle?: string;
  commitmentId?: string;
  commitmentTitle?: string;
  title: string;
  description: string;
  type: EvidenceType;
  fileUrl?: string;
  externalLink?: string;
  textPayload?: string;
  uploaderId?: string;
  uploaderName: string;
  uploaderOrg: string;
  uploadedAt: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  hash: string; // Cryptographic integrity fingerprint
  metadata?: {
    location?: string;
    dateRecorded?: string;
    itemCount?: number;
    amountUSD?: number;
  };
}

export type FeedbackCategory = 
  | 'Delay' 
  | 'Corruption Risk' 
  | 'Service Quality' 
  | 'Missing Goods' 
  | 'Positive Observation' 
  | 'Suggestion';

export type FeedbackStatus = 'New' | 'Under Review' | 'Action Required' | 'Resolved';

export interface CommunityFeedback {
  id: string;
  projectId: string;
  projectTitle?: string;
  submittedBy: string;
  isAnonymous: boolean;
  category: FeedbackCategory;
  title: string;
  description: string;
  location: string;
  dateSubmitted: string;
  severity: 'Low' | 'Medium' | 'High';
  status: FeedbackStatus;
  resolutionNotes?: string;
}

export type RiskCategory = 
  | 'Missing Evidence' 
  | 'Budget Discrepancy' 
  | 'Timeline Delay' 
  | 'Inconsistent Report' 
  | 'Unresolved Complaint' 
  | 'Fiduciary Concern';

export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskItem {
  id: string;
  projectId: string;
  projectTitle?: string;
  commitmentId?: string;
  commitmentTitle?: string;
  title: string;
  category: RiskCategory;
  severity: RiskSeverity;
  description: string;
  flaggedBy: string;
  detectedAt: string;
  status: 'Open' | 'Investigating' | 'Mitigated' | 'Resolved';
  recommendedAction: string;
  aiExplanation?: {
    whatHappened: string;
    whyItMatters: string;
    whatToCheck: string;
    recommendedAction: string;
  };
}

export interface ActivityLog {
  id: string;
  projectId: string;
  projectTitle?: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
}

export interface IntegrityScoreBreakdown {
  score: number;
  status: IntegrityStatus;
  factors: {
    commitmentCompletionScore: number; // Max 35
    evidenceCoverageScore: number;     // Max 25
    verificationRateScore: number;    // Max 20
    riskMitigationScore: number;       // Max 10
    feedbackResolutionScore: number;   // Max 10
  };
  explanation: string;
  recommendations: string[];
}

export interface AIAnalysisResult {
  projectId: string;
  projectTitle: string;
  timestamp: string;
  projectSummary: string;
  integrityAnalysis: {
    missingInformation: string[];
    potentialInconsistencies: string[];
    overdueCommitments: string[];
    evidenceGaps: string[];
    unusualPatterns: string[];
    questionsForHumanVerification: string[];
  };
  riskExplanations: {
    riskTitle: string;
    whatHappened: string;
    whyItMatters: string;
    whatToCheck: string;
    recommendedAction: string;
  }[];
  integrityScoreAssessment: {
    estimatedScore: number;
    integrityStatus: IntegrityStatus;
    justification: string;
  };
  disclaimer: string;
}
