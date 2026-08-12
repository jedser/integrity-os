# Integrity-OS — System Architecture

Integrity-OS is an AI-native accountability operating system that connects public commitments, field evidence, community signals, risk analysis, verification workflows, and impact outcomes into a unified decision infrastructure.

## 5-Layer System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       DECISION LAYER                        │
│ Integrity Copilot • Priorities • 5-Min Executive Briefings  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      INTELLIGENCE LAYER                     │
│ Gemini 3.6 Flash • Contradiction Engine • AI Risk Detection │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                        EVIDENCE LAYER                       │
│ Evidence Vault • SHA-256 Hashes • Community Feedback Loop   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                     IMPLEMENTATION LAYER                    │
│ Projects • Commitments Engine • Deliverables • Activities   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      ACCOUNTABILITY DATA                    │
│ Organizations • Resources • Actors • Immutable Audit Ledger │
└─────────────────────────────────────────────────────────────┘
```

## Traceability Chain Execution

Every transaction in Integrity-OS flows through an immutable end-to-end accountability chain:

$$\text{RESOURCE} \longrightarrow \text{COMMITMENT} \longrightarrow \text{ACTION} \longrightarrow \text{EVIDENCE} \longrightarrow \text{VERIFICATION} \longrightarrow \text{COMMUNITY SIGNAL} \longrightarrow \text{RISK} \longrightarrow \text{GEMINI ANALYSIS} \longrightarrow \text{HUMAN DECISION} \longrightarrow \text{AUDIT EVENT}$$

### Component Responsibilities

1. **Decision Layer (`/dashboard`, `/funders`, `/reports`)**:
   - Presents proactive morning briefings, portfolio risk distributions, and printable A4 compliance reports.
   - Triggers executive actions with human-in-the-loop confirmation.

2. **Intelligence Layer (`/server/gemini.ts`, `/src/components/IntegrityCopilotCard.tsx`)**:
   - Houses the Gemini 3.6 Flash inference engine.
   - Executes cross-correlation contradiction detection between claims and physical evidence.

3. **Evidence Layer (`/evidence`, `/community`)**:
   - Stores geotagged photographic evidence, warehouse receipts, customs release manifests, and citizen feedback.
   - Computes 64-character SHA-256 hash fingerprints upon submission.

4. **Implementation Layer (`/projects`, `/commitments`, `/risks`)**:
   - Manages regional recovery projects, granular deliverable milestones, budget execution rates, and risk mitigation status.

5. **Accountability Data Layer (`/server/db.ts`)**:
   - Normalized relational data engine enforcing foreign keys, multi-tenant role filtering, and append-only audit event logging.
