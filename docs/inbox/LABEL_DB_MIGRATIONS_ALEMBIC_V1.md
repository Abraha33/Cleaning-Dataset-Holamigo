````md id="n5q8vx"
# LABEL_DB_MIGRATIONS_ALEMBIC_V1.md

## Estado

Documento oficial : LABEL_DB_MIGRATIONS_ALEMBIC_V1.md

Sistema oficial de migraciones de base de datos para el backend con :contentReference[oaicite:0]{index=0} + :contentReference[oaicite:1]{index=1}.

---

# Objetivo

Controlar cambios de esquema de forma segura, versionada y reproducible.

```text
crear tablas
modificar columnas
agregar índices
rollback seguro
deploy ordenado
````

---

# Principio Rector

```text id="m2q7ta"
Nunca editar producción manualmente.
Todo cambio pasa por migración.
```

---

# Problema Real que Resuelve

Sin migraciones ocurre:

```text id="p5n8dw"
dev tiene una DB
staging otra
producción distinta
columnas faltantes
errores al desplegar
caos histórico
```

---

# Estructura Recomendada

```text id="x1r6pk"
apps/api/
├── alembic.ini
├── alembic/
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
```

---

# Flujo Oficial

```text id="u8m2ra"
cambiar models ORM
→ generar migration
→ revisar manualmente
→ ejecutar local
→ ejecutar staging
→ ejecutar prod
```

---

# Comandos Base

## Crear migración automática

```bash id="k5q9tv"
alembic revision --autogenerate -m "create products table"
```

## Aplicar última versión

```bash id="j3m1ls"
alembic upgrade head
```

## Ver historial

```bash id="r6q4mx"
alembic history
```

## Rollback una versión

```bash id="w2n7pk"
alembic downgrade -1
```

---

# Naming Convention Recomendado

```text id="f9m3ra"
create_users_table
create_products_table
add_status_to_batches
create_print_jobs_indexes
add_version_to_products
```

No uses nombres vagos.

---

# Orden Inicial MVP

## Migración 001

```text id="t1q8dw"
roles
users
```

## Migración 002

```text id="h7r2pk"
products
```

## Migración 003

```text id="n4m9tv"
batches
batch_items
```

## Migración 004

```text id="p8q1ls"
label_templates
printers
print_jobs
```

## Migración 005

```text id="x5r7mx"
audit_logs
indexes
```

---

# Buenas Prácticas Críticas

## Revisar SQL generado

Autogenerate ayuda, no piensa.

## Separar schema y data migrations

Ejemplo:

```text id="u2m6pk"
crear columna
luego poblar datos
```

## Hacer cambios pequeños

No 40 tablas en una sola migración.

---

# Ejemplo Correcto

## Agregar columna status

```python id="g1q9ra"
op.add_column("products", sa.Column("status", sa.String(), nullable=True))
op.execute("update products set status='ACTIVE'")
op.alter_column("products", "status", nullable=False)
```

---

# Índices Obligatorios

Migrar explícitamente:

```text id="v7m3tw"
sku
batch status
assigned_user_id
print_jobs status
created_at
```

---

# Seeds Iniciales

No mezclar en schema principal si puedes evitarlo.

Usar script separado:

```text id="k4n8ls"
python scripts/seed_roles.py
```

---

# Deploy Seguro

## Pipeline recomendado

```text id="s9q2pk"
backup DB
run migrations
healthcheck app
release traffic
```

---

# Riesgos Graves

```text id="e6m1ra"
drop column sin plan
rename sin compatibilidad
locks largos producción
migraciones no probadas
editar DB manual
```

---

# Estrategia Zero Downtime (Growth)

```text id="d3q7tv"
add nullable column
deploy code compatible
backfill
switch reads
remove old later
```

---

# Multi Entorno

```text id="r5q1mx"
DEV
STAGING
PROD
```

Cada uno con su propia cadena de conexión.

---

# Auditoría de Migraciones

Guardar:

```text id="z8m4pk"
quién lanzó
cuándo
versión previa
duración
resultado
```

---

# Qué NO Hacer

```text id="m4q6ta"
usar pgAdmin manual siempre
borrar versiones viejas
reordenar migraciones aplicadas
```

---

# Roadmap Fase 2

```text id="c7m9pk"
particionado tablas grandes
materialized views analytics
read replicas aware migrations
```

---

# Veredicto Técnico

Si no controlas migraciones, no controlas el sistema.

---

# Próximo Documento Recomendado

```text id="h2r8mx"
LABEL_CODING_STANDARDS_V1.md
```

---

# Estado

Documento oficial : LABEL_DB_MIGRATIONS_ALEMBIC_V1.md

```
```
