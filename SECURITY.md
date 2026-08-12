# Security Policy for Integrity-OS

Integrity-OS is built to provide verifiable, transparent, and multi-tenant accountability infrastructure for high-stakes recovery and development contexts. Security and data integrity are central to our design.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Architecture & Core Principles

1. **Zero Secret Exposure**:
   - `GEMINI_API_KEY` and server secrets are strictly isolated on the backend server layer (`server.ts`, `server/gemini.ts`).
   - Client-side bundles are prohibited from accessing API keys or credentials directly.
   - `.env` and local environment files are ignored via `.gitignore`. `.env.example` serves as the template for variable declaration.

2. **Multi-Tenant Isolation**:
   - Organization and stakeholder role permissions are strictly enforced at the API route level.
   - Query filters isolate project records, evidence artifacts, and community feedback by organization membership.

3. **Cryptographic Proof Provenance**:
   - Every physical evidence submission (photographs, receipts, manifests) generates an immutable SHA-256 hash fingerprint.
   - Evidence records cannot be silently updated or overwritten.

4. **Append-Only Audit Logging**:
   - All critical domain events (commitments, risk status changes, verification actions, evidence uploads) write to an immutable audit ledger (`server/db.ts`).

5. **Responsible AI Guardrails**:
   - Gemini 3.6 Flash responses require explicit human confirmation for operational actions.
   - Prompt context isolation prevents cross-tenant data leakage.

## Reporting a Vulnerability

If you discover a security vulnerability within Integrity-OS, please report it responsibly:

- **Email**: security@integrity-os.org
- **Response SLA**: Initial acknowledgement within 24 hours; patch proposal within 72 hours.
- **Do NOT** open public GitHub issues for unpatched security vulnerabilities.

Thank you for helping keep accountability systems secure and trustworthy.
