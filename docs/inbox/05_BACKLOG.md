# Backlog — Product Data Platform

Documento operativo para equipo pequeño: prioridades claras, dependencias explícitas, issues sugeridos como títulos copy-paste para GitHub.

**Leyenda prioridad:** P0 bloqueante seguridad/entorno · P1 MVP usable · P2 crecimiento · P3 diferido.

---

## Epic 1 — Foundation

**Objetivo:** Configuración reproducible, seguridad básica de secretos, validación y contratos HTTP predecibles antes de exponer la API.

**Dependencias:** ninguna (raíz del trabajo).

**Prioridad epic:** P0–P1.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| F-001 | Parametrizar `DATABASE_URL` / pool en `PrismaService` y configs Prisma | P0 | — |
| F-002 | Documentar y unificar `prisma.config` (raíz vs `apps/api`) | P1 | F-001 |
| F-003 | `ValidationPipe` global + DTOs reales en `POST`/`PATCH` products | P1 | — |
| F-004 | Exception filter: Prisma `P2002` → 409; `P2025`/not found → 404 | P1 | F-003 |
| F-005 | CI: `prisma validate` o `prisma generate` post-install | P2 | F-001 |
| F-006 | Health check HTTP (`/health`) para CI/orquestación | P2 | — |
| F-007 | Decisión Redis: uso (cache/rate limit) o retirar del `docker-compose` | P2 | — |

---

## Epic 2 — Auth & Users

**Objetivo:** Autenticación y, cuando el modelo exista, autorización para operaciones de catálogo.

**Dependencias:** Epic 1 (F-003/F-004 recomendados antes de auth para no acumular deuda).

**Prioridad epic:** P1 tras Foundation mínima.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| A-001 | ADR: estrategia auth (JWT propio vs Supabase Auth) | P1 | F-001 |
| A-002 | Modelo Prisma `User` / sesión (diseño mínimo) | P1 | A-001 |
| A-003 | Guards Nest en rutas mutables (`POST`/`PATCH`/`DELETE` products) | P1 | A-002 |
| A-004 | Roles RBAC (tablas + seeds) | P2 | A-003 |
| A-005 | Documentar flujo token en `04_API_SPEC.md` con ejemplos reales | P2 | A-003 |

---

## Epic 3 — Product Catalog

**Objetivo:** API y datos de catálogo alineados a operación diaria (listados filtrados, marcas/categorías gestionables).

**Dependencias:** Epic 1 (validación); Epic 2 opcional para escrituras en entornos expuestos.

**Prioridad epic:** P1.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| C-001 | `GET /products` query: `brandId`, `categoryId`, `sku` | P1 | F-003 |
| C-002 | Paginación según `04_API_SPEC.md` (envelope + meta) | P1 | C-001 |
| C-003 | CRUD REST `brands` y `categories` (o read-only + admin seed) | P2 | F-003 |
| C-004 | Tests e2e products (CRUD feliz + 404/409) | P2 | F-004 |
| C-005 | Índices Prisma/DB según queries reales | P2 | C-001 |

---

## Epic 4 — Media Assets

**Objetivo:** Adjuntos e imágenes ligados a producto con política de almacenamiento clara.

**Dependencias:** Epic 2 para subidas en entornos no confiables; Epic 3 para FKs.

**Prioridad epic:** P2.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| M-001 | ADR: Supabase Storage vs S3 vs solo URL externa | P2 | A-001 (recomendado) |
| M-002 | Modelo `MediaAsset` + migración Prisma | P2 | M-001 |
| M-003 | Endpoints listado/asociación producto ↔ media | P3 | M-002, A-003 |

---

## Epic 5 — Import / Normalization

**Objetivo:** Conectar el trabajo ya existente en `packages/data-tools` (CSV, revisión humana) con pipelines reproducibles hacia la API/DB.

**Dependencias:** Epic 3 (catálogo estable); conocimiento de `data-normalization/README.md`.

**Prioridad epic:** P2.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| N-001 | Documentar pipeline: CSV aprobados → job de carga (CLI o script) | P2 | C-003 (ideal) |
| N-002 | Job idempotente de import (upsert por `sku`) | P2 | N-001, F-004 |
| N-003 | No automatizar aplicación a maestro sin aprobación (checklist en CONTRIBUTING) | P1 | — |

---

## Epic 6 — Workflows / Batch Ops

**Objetivo:** Operaciones por lote (reactivaciones, retiros, re-categorización) sin SQL manual.

**Dependencias:** Epic 2 + Epic 3.

**Prioridad epic:** P3.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| W-001 | Diseño estados producto (draft/published) si negocio lo exige | P3 | C-001 |
| W-002 | Endpoint batch acotado (tamaño máximo, transacciones) | P3 | W-001, A-003 |
| W-003 | Cola/async (Redis u otro) solo si hay evidencia de necesidad | P3 | F-007 |

---

## Epic 7 — Reporting / Audit

**Objetivo:** Trazabilidad y métricas para gobernanza de catálogo.

**Dependencias:** Epic 3 mínimo; Epic 2 para “quién”.

**Prioridad epic:** P3.

| ID sugerido | Issue (título sugerido) | Prioridad | Depende de |
|-------------|------------------------|-----------|------------|
| R-001 | Modelo `AuditLog` (quién/cuándo/qué) + escritura en mutaciones | P3 | A-002 |
| R-002 | Endpoint agregados: conteos por marca/categoría | P3 | C-001 |
| R-003 | Export CSV/JSON paginado (mismos filtros que list API) | P3 | C-002 |

---

## Orden de ataque recomendado

`Epic 1` → `Epic 3` (lectura/listado) en paralelo cauteloso con `Epic 2` si hay exposición pública → resto según negocio.

---

*Alineado a `docs/01_PRD.md`, `docs/02_ARCHITECTURE.md`, `docs/03_DB_SCHEMA.md` y código en `apps/api`.*
