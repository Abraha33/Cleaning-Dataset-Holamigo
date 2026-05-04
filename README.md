# 📦 Product Data Platform

Plataforma profesional para la gestión, normalización y centralización de datos de productos (PIM).

## 🚀 Quick Start
1. **Instalar dependencias:** pnpm install
2. **Levantar infraestructura:** docker-compose up -d
3. **Sincronizar DB:** cd apps/api && pnpm dlx prisma db push
4. **Arrancar modo dev:** pnpm run start:dev

## 🏗️ Arquitectura
- **Monorepo:** PNPM Workspaces.
- **Backend:** NestJS + Prisma + Driver Adapters.
- **Base de Datos:** PostgreSQL (Docker/Supabase).

## 🛠️ Scripts Principales
- pnpm build: Compila todo el proyecto.
- pnpm lint: Verifica estándares de código.
- pnpm test: Ejecuta la suite de pruebas.

---
🚀 *Entorno auditado y listo para Product Engineering Phase.*