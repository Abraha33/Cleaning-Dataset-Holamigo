# Backlog — Product Data Platform

Epics ordenados por dependencia. Cada ítem es accionable y trazable al estado del repo.

---

## Epic 1 — Foundation

| ID | Ítem | Criterio de hecho |
|----|------|-------------------|
| F-1 | Parametrizar `DATABASE_URL` (y opcional `DIRECT_URL`) en `PrismaService` y `prisma.config.ts` | Sin credenciales en código fuente; documentar en README. |
| F-2 | Alinear Prisma CLI con el mismo env en local/CI | `db push` o `migrate deploy` documentado y reproducible. |
| F-3 | Validación de entrada en `POST`/`PATCH` productos | DTOs con class-validator; rechazo 400 con mensajes claros. |
| F-4 | Filtro de excepciones Prisma → HTTP | Mapear `P2002` (unicidad) a 409 u otro código acordado. |
| F-5 | CI: job opcional que valide schema | `prisma validate` o generate en pipeline si el equipo lo adopta. |

---

## Epic 2 — Product Catalog

| ID | Ítem | Criterio de hecho |
|----|------|-------------------|
| C-1 | Endpoints o query params para filtrar por `brandId`, `categoryId`, `sku` | Contrato documentado en `04_API_SPEC.md`. |
| C-2 | Paginación en `GET /products` | `skip`/`take` o cursor; límites máximos. |
| C-3 | CRUD explícito o read-only para `Brand` y `Category` | Evitar solo seed manual si operación lo requiere. |
| C-4 | Reglas de `price` y tipos Decimal | Tests unitarios en servicio. |

---

## Epic 3 — Media System

| ID | Ítem | Criterio de hecho |
|----|------|-------------------|
| M-1 | ADR: almacenamiento (Supabase Storage vs S3) | Decisión escrita en `docs/ADR/`. |
| M-2 | Modelo `media_assets` + migración | Relación con `Product` definida. |
| M-3 | Endpoints de subida/listado | Auth requerida antes de exposición pública. |

---

## Epic 4 — Operations Workflow

| ID | Ítem | Criterio de hecho |
|----|------|-------------------|
| O-1 | Integrar lineamientos de `data-tools` con API | Definir si importaciones pasan por jobs o endpoints internos. |
| O-2 | Estados de producto (borrador/publicado) si negocio lo exige | Columna(s) + transiciones documentadas. |
| O-3 | Uso de Redis o retirada del compose | Decisión explícita documentada. |

---

## Epic 5 — Reporting

| ID | Ítem | Criterio de hecho |
|----|------|-------------------|
| R-1 | Vistas materializadas o endpoints de agregación | Consultas acordadas con negocio (conteos por marca/categoría). |
| R-2 | Export CSV/JSON paginado | Mismo contrato de filtros que listados. |

---

*Prioridad sugerida: completar Epic 1 antes de exponer la API a redes no confiables.*
