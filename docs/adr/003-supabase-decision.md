# ADR 003 — Managed PostgreSQL (Supabase) as deployment target

## Context

The team needs managed PostgreSQL (backups, networking, connection pooling) compatible with Prisma, with optional use of the broader Supabase stack (storage, anon keys) for a future admin UI and integrations. Local development must remain possible without cloud dependency.

## Decision

- Document in **`.env.example`** (repo root):
  - `DATABASE_URL` using the **Supabase pooler** (typical port `6543`) for application traffic.
  - `DIRECT_URL` for direct connections when Prisma or tooling requires it (e.g. migrations).
  - `SUPABASE_URL` and `SUPABASE_KEY` for future Supabase client usage.
- Keep **Docker Compose** with PostgreSQL 15 for local development (`docker-compose.yml`).

## Consequences

**Positive**

- Same engine locally and in the cloud target.
- Pooler reduces connection churn when the API scales horizontally.

**Negative**

- Until the Nest `PrismaService` reads `DATABASE_URL` from the environment, local hardcoded URLs and documented Supabase URLs can diverge and confuse onboarding.
- Prisma + Supabase pooler requires attention to [transaction and connection modes](https://www.prisma.io/docs/guides/database/supabase) as documented by Prisma and Supabase when going to production.

## Alternatives Considered

- **RDS, Cloud SQL, Neon, etc.:** Sufficient if only Postgres is required; Supabase adds adjacent products the project may adopt later.
- **Docker-only production:** Acceptable for a strictly internal MVP; weaker fit for typical PIM uptime expectations.

---

*References: `.env.example`, `docker-compose.yml`, `docs/02_ARCHITECTURE.md`.*
