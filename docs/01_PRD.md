# Product Requirements — Product Data Platform

**Versión:** 1.0 (alineada al estado del repositorio)  
**Ámbito:** visión de producto y MVP técnico verificable en código.

## Problema que resuelve

Organizaciones con catálogos de producto dispersos (ERP, e-commerce, hojas, JSON históricos) necesitan un **sistema de verdad** para marcas, categorías y productos, con datos normalizados y una API operable. Hoy el repositorio cubre la **base técnica**: API NestJS, modelo relacional mínimo (marca, categoría, producto) y herramientas de asistencia a la normalización en `packages/data-tools` (CSV, revisión humana, sin aplicación automática a maestro sin aprobación).

## Usuarios objetivo

| Rol | Necesidad |
|-----|-----------|
| **Product / catalog owner** | Definir marcas, categorías y atributos; gobernar calidad del catálogo. |
| **Data / integraciones** | Consumir y poblar catálogo vía API y jobs; alinear con fuentes externas. |
| **Engineering** | Extender modelo, auth, observabilidad y despliegues (Supabase, CI). |

## Alcance MVP (estado verificable)

- Monorepo **pnpm** con aplicación **`apps/api`** (NestJS 11 + Prisma 7 con driver adapter `pg`).
- Persistencia **PostgreSQL**: local vía **Docker** (`docker-compose.yml`, puerto host `5435`).
- Esquema Prisma: **Brand**, **Category**, **Product** (SKU único, precio, `attributes` JSON opcional).
- CRUD REST bajo prefijo **`/products`** (sin capa de auth en código actual).
- **Seed** mínimo: marca y categoría de ejemplo.
- **CI** GitHub Actions: install, lint, typecheck, test, build en ramas `main` / `develop`.
- Paquete **`packages/data-tools`**: normalización asistida (maestros CSV, reglas documentadas en README del paquete).

## Fuera de alcance (actual)

- Frontend admin (mencionado en roadmap, no presente en el repo).
- Usuarios, roles y permisos persistidos (no hay modelos ni guards JWT en la API).
- Variantes de producto como entidad propia, media library, audit log en base de datos.
- Uso efectivo de **Redis** en la aplicación (servicio declarado en Docker, sin cliente en Nest).
- Integración runtime con variables **Supabase** de `.env.example` en `PrismaService` (hoy URL fija a localhost en código).

## KPIs (medibles en fases)

| KPI | Definición inicial |
|-----|-------------------|
| **Disponibilidad API** | Uptime del servicio en entorno acordado (post despliegue). |
| **Integridad catálogo** | % productos con `sku` único, `brandId` / `categoryId` válidos; errores 4xx en creación por violación de unicidad. |
| **Tiempo de incorporación** | Tiempo desde `clone` hasta `GET /products` con DB local (documentado en README raíz). |
| **Cobertura de gobernanza** | Volumen de filas en `review/` vs `masters/` en data-tools (proceso operativo, no automatizado en API). |

## Roadmap inicial

1. **Fundación:** variables de entorno para DB, migraciones Prisma en flujo de equipo, validación de entrada (class-validator), contrato OpenAPI.
2. **Catálogo:** reglas de negocio en servicio de productos, paginación/filtros, índices según consultas reales.
3. **Identidad:** JWT (alineado a `.env.example`), usuarios y roles en esquema cuando se defina el modelo.
4. **Media y variantes:** tablas y API cuando el diseño de producto lo apruebe.
5. **Operaciones:** workflows de publicación, sync ERP/e-commerce (diseño; no implementado).

---

*Este PRD refleja el código y la infraestructura del monorepo `product-data-platform` en la fecha de redacción.*
