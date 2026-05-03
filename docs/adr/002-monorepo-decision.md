# ADR 002 — Monorepo with pnpm workspaces

## Context

The product combines a TypeScript API and data tooling (Python scripts, CSV masters, normalization workflows) that should stay in one repository for traceability, single versioning, and small-team onboarding.

## Decision

- **Package manager:** pnpm with workspaces.
- **Workspace layout:** `pnpm-workspace.yaml` includes `apps/*` and `packages/*`.
- **Current packages:** `apps/api` (NestJS application); `packages/data-tools` (normalization assets and legacy Python — not a published Node library consumed by the API today).

## Consequences

**Positive**

- Single `pnpm-lock.yaml`; CI uses `pnpm install --frozen-lockfile`.
- Root scripts (`build`, `lint`, `typecheck`, `test`) can run across workspaces with `pnpm -r`.

**Negative**

- Python tooling under `packages/data-tools` is outside the Node dependency graph; developers need a separate virtualenv / `requirements.txt` workflow.
- Without a shared TypeScript package, reuse between future `apps/*` is not yet formalized.

## Alternatives Considered

- **Multi-repo:** Stronger isolation, higher cost to keep API and normalization rules in sync.
- **npm or Yarn workspaces:** Equivalent capability; the repo already standardized on pnpm 10 in CI.

---

*References: `pnpm-workspace.yaml`, root `package.json`, `.github/workflows/ci.yml`.*
