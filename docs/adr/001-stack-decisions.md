# ADR 001 — Stack de aplicación y datos

## Estado

Aceptado (refleja el repositorio actual).

## Contexto

Se necesita una plataforma de datos de producto con API mantenible, tipado fuerte y acceso relacional a PostgreSQL, integrada en un monorepo Node.

## Decisión

- **Runtime API:** NestJS 11 (módulos, inyección de dependencias, ecosistema maduro).
- **ORM:** Prisma 7 con cliente JavaScript y **driver adapter** `@prisma/adapter-pg` sobre el driver `pg`.
- **Base de datos:** PostgreSQL 15 en desarrollo local; variables en `.env.example` orientadas a **Supabase** (pooler + URL directa para migraciones).
- **Lenguaje:** TypeScript en `apps/api`.
- **Tests:** Jest + Supertest para e2e básico.

## Consecuencias

### Positivas

- Tipos generados desde el schema (`@prisma/client`).
- Separación clara entre capa HTTP y persistencia.
- Adapter oficial prepara el terreno para entornos serverless o pools gestionados.

### Negativas / deuda

- Configuración duplicada potencial (`prisma.config.ts` en raíz del monorepo y en `apps/api`); debe consolidarse con criterio de equipo.
- `PrismaService` actual no consume aún las variables documentadas en `.env.example`.

## Alternativas consideradas (implícitas)

- **TypeORM / Drizzle:** viables; Prisma se eligió por productividad y modelo declarativo ya presente en el repo.
- **Cliente pg directo:** más control, menos productividad para evolución de esquema.

## Referencias

- `apps/api/package.json`
- `apps/api/prisma/schema.prisma`
- `apps/api/src/prisma/prisma.service.ts`
