# Integrity-OS
> **The AI Operating System for Development & Recovery Accountability — From Commitment to Evidence to Impact.**

Integrity-OS turns commitments, physical evidence, community signals, and project data into continuously updated, evidence-grounded decisions for organizations, civil society, and impact funders.

Built with an initial context focus on post-conflict recovery in Tigray, Ethiopia, Integrity-OS provides a globally scalable continuous accountability operating layer.

---

## 🏛️ Repository Architecture & Documentation Index

```
integrity-os/
│
├── docs/
│   ├── architecture.md       # 5-Layer System Architecture & Trace Chain
│   ├── ai-architecture.md    # Gemini 3.6 Flash Integration & Grounding
│   ├── security.md          # Multi-Tenant Access Model & SHA-256 Hashes
│   ├── database.md          # Relational Entity Schema & Audit Ledger
│   └── demo.md              # 13-Step Canonical Judge Demonstration Script
│
├── server/
│   ├── db.ts                # In-Memory Relational Engine & Audit Ledger
│   └── gemini.ts            # Server-Side Gemini 3.6 Flash AI Proxy
│
├── src/
│   ├── components/          # React 18 UI Views (Copilot, Evidence, Community, Reports)
│   ├── lib/                 # API Proxy & Client Utilities
│   └── types.ts             # Shared TypeScript Entity Interfaces
│
├── .github/
│   └── workflows/
│       ├── ci.yml           # Automated Type-check & Production Build Pipeline
│       └── security.yml     # Secret Leak & .env Protection Scanner
│
├── .env.example             # Safe Environment Variable Template
├── LICENSE                  # Apache 2.0 License
├── SECURITY.md              # Vulnerability Reporting & Isolation Policy
└── CONTRIBUTING.md          # Developer Contribution Guidelines
```

---

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

---

## Continuous Accountability Decision Loop

$$\text{PROMISE} \rightarrow \text{IMPLEMENT} \rightarrow \text{EVIDENCE} \rightarrow \text{VERIFY} \rightarrow \text{COMMUNITY SIGNAL} \rightarrow \text{GEMINI ANALYZES} \rightarrow \text{RECOMMEND} \rightarrow \text{HUMAN DECIDES} \rightarrow \text{AUDIT RECORD}$$

---

## Key Modules & Strategic Capabilities

1. **Integrity Copilot (Centerpiece)**: Proactive morning briefings summarizing Critical Issues, Emerging Risks, Evidence Coverage, and Community Signals with instant 1-click meeting briefings and delta comparisons.
2. **Contradiction Engine**: Automated AI cross-correlation flagging discrepancies between progress claims, physical photo evidence, warehouse receipts, and community complaints.
3. **Funders & Donors Portfolio View**: Portfolio-level risk intelligence and evidence coverage distribution across multi-project portfolios.
4. **Evidence Coverage & Quality Profile**: Explainable, non-blackbox evidence coverage metrics ($\text{Verified Proofs} / \text{Total Commitments}$).
5. **Closed-Loop Community Voice**: Citizen and community committee feedback pipeline linking citizen complaints to risk detection and verified resolutions.
6. **Commitments Engine & Vault**: SHA-256 cryptographic hash fingerprinting on geotagged field photos, customs receipts, and distribution manifests.
7. **Role-Based Access Control (RBAC)**: Supports Administrator, Project Manager, Implementer NGO, Resident, and Funder/Observer personas.
8. **Printable Compliance Reports**: Tailored, Integrity-OS branded PDF reports with SHA-256 audit stamps, executive summaries, and formal sign-off blocks.

---

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express, TypeScript (bundled via `esbuild` for production).
- **AI Intelligence**: `@google/genai` SDK using `gemini-3.6-flash` server-side model.
- **Security**: Server-side API key proxying, SHA-256 cryptographic hashing, RBAC context isolation.

---

## Environment Variables

Copy `.env.example` to `.env` or configure via your platform environment settings:

```bash
# GEMINI_API_KEY: Required for Gemini AI API calls (Server-Side Only).
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# APP_URL: Host URL for self-referential links.
APP_URL="http://localhost:3000"
```

> **CRITICAL SECURITY RULE**: Never commit `.env` or hardcode API keys. All Gemini requests pass through `/api/ai/*` server endpoints.

---

## Quick Start & Local Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Build & Run Production Bundle
```bash
npm run build
npm start
```

---

## 13-Step Canonical Judge Demonstration Script

Evaluators can follow the step-by-step canonical test loop (detailed in [`docs/demo.md`](docs/demo.md)):

1. **Open Integrity-OS** → Launches to regional recovery dashboard.
2. **Inspect Purpose** → Review Responsible AI Banner & evidence grounding principles.
3. **Open Project** → Select *Mekelle Central Hospital & Maternity Wing Restoration*.
4. **See Commitments** → View 4 deliverable milestones and budget allocations.
5. **Find Overdue Item** → Locate delayed *Emergency Surgical X-Ray Procurement*.
6. **Inspect Missing Evidence** → Evidence Vault highlights missing customs release receipts.
7. **See Community Signal** → Community Voice feeds citizen report on non-operational X-Ray unit.
8. **See Risk** → Review 4-step Risk Explanation Card for equipment bottleneck.
9. **Ask Integrity Copilot** → Click *"Prepare Briefing for Meeting"* or *"Run Contradiction Engine"*.
10. **Receive Grounded Analysis** → Review Gemini 3.6 Flash evidence-grounded summary.
11. **Inspect Records** → Click supporting record chips to inspect linked artifacts.
12. **Take Human Action** → Assign inspection task with human confirmation modal.
13. **Verify Audit Trail** → Append-only event logged in audit ledger & printable PDF report.

---

## Fictional Demo Data Notice

> **FICTIONAL DEMO DATA — NOT REAL PROJECT INFORMATION**  
> All project records, beneficiary counts, organization names, and financial metrics in the initial seed dataset are illustrative sample data generated for system demonstration purposes. No real beneficiary or confidential project data is present.

---

## License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.
