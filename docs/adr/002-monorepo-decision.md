# ADR 002 — Monorepo con pnpm workspaces

## Estado

Aceptado.

## Contexto

El producto combina una API TypeScript y herramientas de datos (scripts, CSV, legado Python) que deben vivir en un solo repositorio para trazabilidad y versionado unificado.

## Decisión

- **Gestor de paquetes:** pnpm (workspace).
- **Definición de workspaces:** `pnpm-workspace.yaml` incluye `apps/*` y `packages/*`.
- **Paquetes actuales:** `apps/api`; `packages/data-tools` (normalización y datos auxiliares, no empaquetado como librería consumida por la API en el estado actual).

## Consecuencias

### Positivas

- Un `pnpm-lock.yaml` para reproducibilidad (reforzado por `--frozen-lockfile` en CI).
- Scripts en raíz (`build`, `lint`, `typecheck`, `test`) pueden orquestar todos los workspaces con `pnpm -r`.

### Negativas

- Los paquetes Python en `packages/data-tools` no participan del grafo Node; el equipo debe documentar su entorno (`requirements.txt`) aparte.
- Sin paquete compartido TypeScript publicado aún, el monorepo es en la práctica “API + carpetas satélite”.

## Alternativas

- **Multirepo:** más aislamiento, más costo de integración y versiones alineadas.
- **npm / Yarn:** equivalentes; pnpm ya fijado en CI (`pnpm/action-setup@v4`, versión 10).

## Referencias

- `pnpm-workspace.yaml`
- `package.json` (raíz)
- `.github/workflows/ci.yml`
