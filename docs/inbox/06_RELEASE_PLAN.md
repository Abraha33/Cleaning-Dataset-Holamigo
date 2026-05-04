# Release Plan — Product Data Platform

Horizonte orientativo para **equipo pequeño** (1–3 devs). Duración por sprint: **2 semanas**. Las fechas son placeholders: ajustar al calendario real al arrancar.

---

## Sprint 1 (2 semanas) — “Safe baseline”

**Meta:** El API no lleva secretos en código; entrada validada; errores Prisma clave mapeados.

| Entrega | Issue ref. | Done cuando |
|---------|------------|-------------|
| `DATABASE_URL` desde env en Prisma + doc README | F-001, F-002 | CI y local funcionan sin hardcode |
| DTOs + `ValidationPipe` en products | F-003 | POST/PATCH rechazan cuerpos inválidos (400) |
| Exception filter Prisma → 404/409 | F-004 | Tests mínimos o e2e ampliado |
| Decisión Redis (issue + actualización `02_ARCHITECTURE`) | F-007 | Compose o código alineado a la decisión |

**Riesgo si se omite:** exposición o despliegues rotos.

---

## Sprint 2 (2 semanas) — “Catalog usable”

**Meta:** Listados operables para integraciones; marcas/categorías abordables sin solo seed.

| Entrega | Issue ref. | Done cuando |
|---------|------------|-------------|
| Filtros query en `GET /products` | C-001 | `brandId` / `categoryId` / `sku` documentados en `04_API_SPEC` |
| Paginación según envelope acordado | C-002 | Límite máximo aplicado |
| CRUD o read-only brands/categories | C-003 | Contrato en `04_API_SPEC` |
| e2e products ampliados | C-004 | Pipeline verde |

**Dependencia:** Sprint 1 completado o al menos F-003/F-004.

---

## Sprint 3 (2 semanas) — “Identity for exposed envs”

**Meta:** Auth mínima si la API sale de red de confianza; plan de medios acotado.

| Entrega | Issue ref. | Done cuando |
|---------|------------|-------------|
| ADR auth + modelo User mínimo | A-001, A-002 | Merge en `docs/ADR` + migración si aplica |
| Guards en mutaciones productos | A-003 | Sin token → 401 en POST/PATCH/DELETE |
| Inicio diseño Media (ADR solo si no hay tiempo de código) | M-001 | Decisión registrada |

**Alternativa:** Si la API sigue 100% interna, posponer A-* al post-MVP y usar Sprint 3 para **N-001 / N-002** (import).

---

## MVP Release (hitos de producto)

**Definición MVP técnica** (alineada a `01_PRD.md` + este plan):

1. Postgres local o cloud con configuración por env.
2. CRUD productos con validación y errores HTTP predecibles.
3. Listado paginado y filtrable.
4. CI verde (`lint`, `typecheck`, `test`, `build`).
5. Documentación: `01`–`06`, ADR 001–003, templates de issues.

**Checklist pre-release**

- [ ] Sin credenciales en fuente
- [ ] `CHANGELOG.md` o sección en release GitHub (opcional primera vez)
- [ ] Tag semver en repo (`v0.1.0-mvp` o similar)

---

## Post MVP

| Fase | Contenido | Epic principal |
|------|-----------|----------------|
| Hardening | Rate limiting, observabilidad (logs estructurados, métricas), OpenAPI publicado | 1, 7 |
| Media | Modelo + storage según ADR | 4 |
| Importación | Jobs desde `data-tools` aprobados | 5 |
| Workflows | Estados draft/published, batch | 6 |
| Reporting + auditoría persistente | 7 |

---

## Notas de delivery

- **No bloquear** Sprint 2 completo por Auth si el despliegue es solo localhost/VPN; sí bloquear exposición pública sin A-003.
- Revisar **una vez por sprint** `05_BACKLOG.md` vs capacidad real y mover issues entre epics si hace falta.

---

*Plan operativo; no sustituye priorización del negocio.*
