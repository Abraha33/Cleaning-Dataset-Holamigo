# ADR 001 — Application and data stack

## Context

The platform needs a maintainable HTTP API with strong typing, relational access to PostgreSQL, and a single codebase integrated in a Node monorepo. The team prioritized fast iteration on catalog entities (brands, categories, products) with a clear persistence layer.

## Decision

- **API runtime:** NestJS 11 (modular structure, dependency injection).
- **Data access:** Prisma 7 with the JavaScript client and the **driver adapter** `@prisma/adapter-pg` on top of the `pg` driver and a connection pool.
- **Database:** PostgreSQL 15 for local development (Docker); environment variables in `.env.example` target **Supabase** (pooler + direct URL for migrations).
- **Language:** TypeScript in `apps/api`.
- **Testing:** Jest; e2e via Supertest (minimal coverage today).

## Consequences

**Positive**

- Generated types from the schema (`@prisma/client`).
- Clear split between HTTP layer and persistence.
- Driver adapter aligns with managed pools and future deployment constraints.

**Negative**

- Possible duplicate Prisma config (`prisma.config.ts` at repo root and under `apps/api`) until consolidated.
- `PrismaService` currently does not read `DATABASE_URL` from the environment (implementation debt; see `003-supabase-decision.md`).

## Alternatives Considered

- **TypeORM or Drizzle:** Valid options; Prisma was kept for declarative schema and productivity already reflected in the repo.
- **Raw `pg` only:** More control, less velocity for schema evolution and migrations.
- **REST vs GraphQL for v1:** REST matches current Nest controllers; GraphQL deferred unless product demands it.

---

*References: `apps/api/package.json`, `apps/api/prisma/schema.prisma`, `apps/api/src/prisma/prisma.service.ts`.*
