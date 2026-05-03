# Product Data Platform ?? ![https://github.com/Abraha33/product-data-platform/actions/workflows/ci.yml/badge.svg](https://github.com/Abraha33/product-data-platform/actions/workflows/ci.yml)

Plataforma profesional de gestión y normalización de catálogos de productos.

## ??? Arquitectura
- **apps/api**: Backend NestJS + Prisma 7 (Modular Monolith).
- **packages/data-tools**: Scripts de normalización (Legacy Python).
- **infra**: Configuraciones de Docker y CI/CD.

## ?? Quick Start
1. `pnpm install`
2. `docker-compose up -d`
3. `cd apps/api && pnpm prisma db push`

## ??? Scripts Principales (Root)
- `pnpm lint`: Valida estilo de código.
- `pnpm typecheck`: Valida tipos de TypeScript.
- `pnpm test`: Ejecuta pruebas unitarias y de integración.
- `pnpm build`: Compila todas las aplicaciones.

---
© 2026 - Product Data Platform Team
