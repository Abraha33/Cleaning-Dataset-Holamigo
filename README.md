# Product Data Platform 🚀

Plataforma de gestión y normalización de catálogos de productos.

## 📂 Estructura del Monorepo
- pps/api: Backend NestJS + Prisma 7.
- packages/data-tools: Scripts de normalización (Legacy Python).
- infra: Configuraciones de Docker y CI/CD.

## 🛠️ Requisitos
- Node.js v22+
- pnpm v10+
- Docker Desktop

## 🏁 Instalación
1. pnpm install
2. docker-compose up -d
3. cd apps/api && pnpm prisma db push

## 📜 Licencia
Privado - Todos los derechos reservados.
