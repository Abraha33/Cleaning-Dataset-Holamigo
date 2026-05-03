# ADR 003 — PostgreSQL gestionado (Supabase) como objetivo de despliegue

## Estado

Propuesto / en adopción parcial (variables documentadas; conexión runtime de la API aún acoplada a Docker local).

## Contexto

El equipo necesita PostgreSQL administrado (backups, red, pooler) compatible con Prisma y con posible uso de storage y claves para el futuro frontend o auth.

## Decisión

- Documentar en **`.env.example`** en la raíz del repositorio:
  - `DATABASE_URL` con **PgBouncer** (puerto pooler típico 6543) para tráfico de aplicación.
  - `DIRECT_URL` para operaciones que requieren conexión directa (p. ej. migraciones Prisma).
  - `SUPABASE_URL` y `SUPABASE_KEY` para integraciones del ecosistema Supabase cuando se implementen.
- Mantener **Docker Compose** con Postgres 15 para desarrollo local sin dependencia de cloud.

## Consecuencias

### Positivas

- Misma familia de motor (PostgreSQL) entre local y cloud.
- Pooler reduce presión de conexiones en despliegues con muchas instancias de API.

### Negativas / riesgos

- Hasta que `PrismaService` lea `DATABASE_URL`, el riesgo de configuración divergente (local hardcoded vs Supabase) es real.
- Deben respetarse [limitaciones de transacción / prepared statements](https://www.prisma.io/docs/guides/database/supabase) según versión Prisma y modo pooler (documentación oficial del proveedor al implementar).

## Alternativas

- **RDS / Cloud SQL / Neon:** equivalentes para solo Postgres; Supabase añade productos colaterales que el proyecto podría usar más adelante.
- **Solo Docker en producción:** válido para MVP interno; no escala con el SLA típico de PIM.

## Referencias

- `.env.example`
- `docker-compose.yml` (servicio `postgres`)
- `docs/02_ARCHITECTURE.md` (flujo producción)
