# Integrity-OS — Canonical Judge Demonstration Workflow

This guide details the **13-step canonical demonstration script** for hackathon judges, evaluators, and stakeholders to test the end-to-end continuous accountability loop in Integrity-OS.

---

## 13-Step Verification Script

| Step | Action | Expected System Behavior |
| :--- | :--- | :--- |
| **1. Open Integrity-OS** | Launch application URL | Instantly opens to the **Integrity Dashboard** showing regional recovery projects, Integrity Scores, and top operational signals. |
| **2. Understand Purpose** | Inspect top **Responsible AI Banner** and **Traceability Chain** | Clear messaging: *"AI-generated analysis — human verification required. Evidence strictly separated from interpretations."* |
| **3. Open a Project** | Click **Mekelle Central Hospital & Maternity Wing Restoration** | Navigates to the project view displaying budget execution ($920k/$1.85M spent), integrity score (88/100 Strong), and target deliverables. |
| **4. See Commitments** | View **Commitments & Deliverables** tab | Lists 4 granular commitments (e.g., *Solar Installation*, *Maternity Wing Roof*, *X-Ray Unit*, *Generator*). |
| **5. Find Overdue Item** | Locate **Emergency Surgical X-Ray & Ultrasound Procurement** | Milestone flagged as **Delayed / Missing Proof** with deadline passed. |
| **6. Inspect Missing Evidence** | Click **Evidence Vault** tab | Filter shows X-Ray procurement deliverable lacks verified customs release or receipt manifests. |
| **7. See Community Signal** | Click **Community Voice** tab | Displays a citizen report: *"Maternity wing x-ray room remains dark and non-operational as of August 2026."* |
| **8. See Associated Risk** | Click **Risk Monitor** tab | Displays 4-step Risk Explanation Card: **Equipment Supply Chain Bottleneck & Equipment Delay (High Severity)**. |
| **9. Ask Integrity Copilot** | Click **"Prepare Briefing for Meeting"** or **"Run Contradiction Engine"** | Gemini 3.6 Flash analyzes project records, cross-references claims against physical proof, and generates an evidence-grounded briefing. |
| **10. Receive Grounded Analysis** | Review Copilot response | AI output highlights: *"Mekelle Hospital deliverable CMT-03 is 45 days overdue. Zero verified customs manifests present. Community feedback confirms room remains inactive."* |
| **11. Inspect Supporting Records** | Click record chips in AI output | Direct jump to linked evidence item and commitment record `CMT-03`. |
| **12. Take Human-Confirmed Action** | Click **Assign Inspection Task** or **Resolve Risk** | Triggers confirmation modal and updates risk status to *Under Inspection*. |
| **13. Verify Audit Trail** | View bottom **Audit Event Ledger** or export **Printable PDF** | Append-only event logged: `Dr. Helen Gebremichael updated Risk #R-01 status to Under Inspection [SHA-256 Verified]`. |

---

## Fictional Demo Data Notice

> **FICTIONAL DEMO DATA — NOT REAL PROJECT INFORMATION**  
> All project records, beneficiary counts, organization names, and financial metrics in the initial seed dataset are illustrative sample data generated for system demonstration purposes. No real beneficiary or confidential project data is present.
