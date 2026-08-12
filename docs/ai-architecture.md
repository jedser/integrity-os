# AI Architecture & Gemini Integration — Integrity-OS

Integrity-OS utilizes Google's **Gemini 3.6 Flash** model via the `@google/genai` SDK to power the **Integrity Copilot**, **Contradiction Engine**, and automated risk detection features.

## AI Processing Pipeline

```
┌───────────────┐
│     User      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Authentication│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Authorization │ (Role & Multi-tenant boundary check)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Context Build │ (Retrieve relevant authorized project records)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Gemini 3.6    │ (Server-side proxy execution)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Structured Out│ (JSON parsing, record referencing & validation)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Human Decision│ (Action confirmation & audit event recording)
└───────────────┘
```

## Core AI Features

### 1. Integrity Copilot
- **Morning Briefing Generation**: Synthesizes current project status, budget execution rates, evidence coverage percentages, and active community signals into concise operational updates.
- **5-Minute Meeting Preparation**: Formulates executive briefs summarizing portfolio risks, missing proof items, and top recommended actions.
- **Delta Analysis ("What Changed?")**: Compares current project states against historical baselines to highlight progress changes and emerging bottlenecks.

### 2. Contradiction Engine
- Cross-references reported completion percentages against physical photo evidence, warehouse slips, and citizen complaints to flag discrepancies (e.g., claiming 85% completion when zero photo proof or multiple community complaints exist).

### 3. Natural Language Workspace Q&A
- Allows stakeholders to ask queries such as *"Which water projects in Eastern Zone have missing customs clearance receipts?"* or *"What are the critical risks for Mekelle Hospital?"* with source-grounded answers.

## Key AI Safeguards

1. **Server-Side Secret Isolation**: `GEMINI_API_KEY` is accessed exclusively on the backend server (`server/gemini.ts`). It is never sent to or stored in client browser code.
2. **Grounding & Anti-Hallucination**: Prompts mandate grounding exclusively to retrieved project records. If data is unavailable, Gemini responds: *"Insufficient evidence recorded to evaluate this query."*
3. **Human-in-the-Loop Confirmation**: AI outputs are advisory recommendations. Gemini cannot automatically modify project statuses, approve budgets, or edit audit logs without explicit human confirmation.
4. **Responsible AI Disclaimer**: All AI responses append an explicit notice distinguishing probabilistic AI insights from immutable physical field evidence.
