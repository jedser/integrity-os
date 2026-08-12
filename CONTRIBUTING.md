# Contributing to Integrity-OS

Thank you for your interest in contributing to **Integrity-OS** — the AI-native accountability infrastructure connecting commitments, physical evidence, community signals, risks, verification, and impact.

## Development Principles

1. **Evidence-Grounded**: Features must preserve the distinction between physical ground-truth evidence and AI probabilistic insights.
2. **Security & Secrets**: Never commit `.env` files or API credentials. All new environment variables must be declared in `.env.example`.
3. **Type Safety**: TypeScript (`tsc --noEmit`) must compile cleanly with 0 errors before submitting pull requests.
4. **Relational Data Integrity**: Database changes must maintain foreign keys, constraints, and audit logging.

## Local Setup & Workflow

```bash
# 1. Clone repository
git clone https://github.com/jedsershumey/integrity-os.git
cd integrity-os

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env

# 4. Start development server
npm run dev
```

## Branching & Commit Guidelines

- **Branch Name**: `feat/feature-description`, `fix/issue-description`, or `docs/doc-update`.
- **Commit Messages**: Use standard Conventional Commits format:
  - `feat(copilot): add cross-correlation contradiction engine`
  - `fix(reports): resolve print layout styling for A4 export`
  - `docs(arch): update 5-layer architecture diagram`

## Pull Request Checklist

Before submitting a PR:

- [ ] Code compiles without errors (`npm run lint`).
- [ ] Application builds for production (`npm run build`).
- [ ] No secrets or hardcoded API keys are present.
- [ ] `README.md` and documentation files are updated if workflows changed.
- [ ] Fictional demo records remain clearly marked: `FICTIONAL DEMO DATA — NOT REAL PROJECT INFORMATION`.

Thank you for contributing to transparent and trustworthy development accountability!
