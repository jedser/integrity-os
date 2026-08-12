# Security & Multi-Tenant Access Model — Integrity-OS

Integrity-OS enforces strict security, tenant isolation, and cryptographic data verification to ensure trustworthy operation across post-conflict recovery and development environments.

## Multi-Tenant Security Boundaries

Organisation boundaries act as security perimeters. Users are authenticated and assigned to specific stakeholder roles:

1. **Administrator** (`Administrator`):
   - Full system administrative control, user provisioning, audit ledger inspection, and seed data reset capabilities.
2. **Project Manager** (`Project Manager`):
   - Oversees regional projects, creates commitments, updates deliverable milestones, and responds to risk alerts.
3. **Field Implementer / NGO** (`Implementer`):
   - Submits physical field evidence, uploads receipts/photos, and updates activity logs.
4. **Community Resident** (`Community/User`):
   - Submits citizen feedback, flags community grievances, and tracks public project progress.
5. **Donor / Funder Observer** (`Funder/Observer`):
   - Read-only access to portfolio integrity metrics, evidence coverage ratios, financial execution rates, and printable compliance reports.

## Cryptographic Evidence Integrity (SHA-256)

When physical proof (photographs, customs manifests, warehouse receipts) is submitted:
1. The server computes a 64-character SHA-256 cryptographic hash fingerprint based on file content and metadata.
2. The hash fingerprint is stored permanently on the evidence record.
3. Any alteration or tampering invalidates the hash check, preventing silent data modification.

## Immutable Audit Event Ledger

All state-changing operations write an append-only event to the audit ledger (`ActivityLog`):

- **Actor**: User ID, Name, Role, Organization
- **Timestamp**: ISO 8601 UTC string
- **Entity**: Project ID, Commitment ID, Evidence ID, or Risk ID
- **Action**: `Created`, `Updated`, `Verified`, `Flagged`, `Resolved`
- **Previous State / New State**: JSON diff capture

Historical audit logs cannot be edited or deleted through normal application operations.

## Secret Protection & Environment Isolation

- Secret keys (`GEMINI_API_KEY`) are stored in server environment variables.
- `.env` files are ignored by `.gitignore`. `.env.example` provides documentation for required variables.
- Client requests proxy through backend routes (`/api/*`), shielding keys from DevTools inspection.
