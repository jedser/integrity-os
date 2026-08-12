# Relational Database Schema & Data Engine — Integrity-OS

Integrity-OS uses a normalized relational data model managed in `/server/db.ts` to ensure consistency, foreign key relationships, and auditability.

## Relational Entity Schema

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  Users       │ 1────N  │  Projects    │ 1────N  │ Commitments  │
│  (id, role,  ├─────────┤  (id, code,  ├─────────┤ (id, code,   │
│   org...)    │         │   budget...) │         │  budget...)  │
└──────────────┘         └──────┬───────┘         └──────┬───────┘
                                │                        │
                         1──────┴──────N          1──────┴──────N
                         ┌──────────────┐         ┌──────────────┐
                         │ Evidence     │         │ Activities   │
                         │ (id, hash,   │         │ (id, action, │
                         │  type...)    │         │  actor...)   │
                         └──────────────┘         └──────────────┘
                                │
                         1──────┴──────N
                         ┌──────────────┐
                         │ Risks        │
                         │ (id, title,  │
                         │  severity...)│
                         └──────────────┘
```

## Core Table Definitions

### 1. `Users`
- `id` (PK, String): Unique user identifier.
- `name` (String): Full user name.
- `email` (String): Contact email address.
- `role` (Enum): `Administrator`, `Project Manager`, `Implementer`, `Community/User`, `Funder/Observer`.
- `organization` (String): Associated organization name.
- `avatarUrl` (String): Profile picture URI.

### 2. `Projects`
- `id` (PK, String): Unique project identifier.
- `code` (String, Unique): Official project tracking code (e.g., `TIG-REC-2026-01`).
- `title` (String): Project title.
- `description` (Text): Detailed project scope.
- `region` (String): Geographic area.
- `locationName` (String): Specific municipality/site.
- `beneficiariesCount` (Integer): Target population count.
- `budgetAllocated` (Decimal): Total allocated funds (USD).
- `budgetSpent` (Decimal): Current expended funds (USD).
- `funder` (String): Donor/funder agency name.
- `implementerOrg` (String): Executing agency/NGO.
- `status` (Enum): `Active`, `Under Review`, `Completed`, `Delayed`.
- `integrityScore` (Integer, 0-100): Computed multi-factor integrity score.
- `integrityStatus` (Enum): `Strong` (80+), `Watch` (60-79), `At Risk` (<60).

### 3. `Commitments`
- `id` (PK, String): Unique commitment ID.
- `projectId` (FK -> Projects.id): Target project link.
- `code` (String): Commitment code (e.g., `CMT-01`).
- `title` (String): Deliverable name.
- `deliverable` (Text): Specific tangible output.
- `allocatedBudget` (Decimal): Milestone budget allocation.
- `status` (Enum): `Not Started`, `In Progress`, `Under Verification`, `Completed`, `Delayed`.
- `deadline` (ISO Date): Expected completion date.
- `responsibleOrg` (String): Assigned implementing entity.

### 4. `Evidence`
- `id` (PK, String): Unique evidence artifact ID.
- `projectId` (FK -> Projects.id): Project link.
- `commitmentId` (FK -> Commitments.id): Linked milestone deliverable.
- `type` (Enum): `Photograph`, `Receipt / Invoice`, `Distribution Manifest`, `Customs Clearance`, `Community Inspection`.
- `title` (String): Artifact title.
- `hash` (String, 64-char): SHA-256 cryptographic hash fingerprint.
- `verificationStatus` (Enum): `Verified`, `Pending`, `Flagged`.
- `uploaderName` / `uploaderOrg` (String): Audit metadata.

### 5. `CommunityFeedback`
- `id` (PK, String): Unique feedback ID.
- `projectId` (FK -> Projects.id): Target project link.
- `category` (Enum): `Quality Issue`, `Delay Notice`, `Budget Concern`, `Commendation`, `General`.
- `subject` / `message` (Text): Citizen observation content.
- `status` (Enum): `New`, `Under Investigation`, `Resolved`, `Dismissed`.
- `severity` (Enum): `Low`, `Medium`, `High`, `Critical`.

### 6. `Risks`
- `id` (PK, String): Unique risk record ID.
- `projectId` (FK -> Projects.id): Associated project link.
- `title` / `description` (Text): Risk summary.
- `severity` (Enum): `Low`, `Medium`, `High`, `Critical`.
- `status` (Enum): `Active`, `Mitigated`, `Closed`.
- `recommendedAction` (Text): Suggested resolution steps.

### 7. `ActivityLogs` (Immutable Audit Ledger)
- `id` (PK, String): Unique audit entry ID.
- `projectId` (FK -> Projects.id): Target project link.
- `actorName` / `actorRole` / `actorOrg` (String): Action executor details.
- `action` (String): Event description.
- `timestamp` (ISO UTC): Timestamp of occurrence.
