````md id="d39qwk"
# VISUAL_DATABASE_SCHEMA_V1.md

## Estado

Documento oficial del esquema de base de datos MVP para el ecosistema visual.

Define tablas reales, relaciones y estructura mínima sólida para comenzar desarrollo.

---

# Objetivo

Diseñar una base de datos limpia, escalable y normalizada para:

```text
usuarios
productos
tareas visuales
imágenes
revisión
sincronización futura
auditoría
````

---

# Principio Rector

```text id="u7m2pa"
Modelar operación real, no pantallas.
```

---

# Motor Recomendado

```text id="x3q9rt"
PostgreSQL
```

Razones:

* relacional fuerte
* JSONB útil
* índices potentes
* escalable
* estándar serio

---

# Núcleo de Tablas MVP

```text id="g6r1dz"
roles
users
products
media_tasks
media_task_shots
product_media
photo_review_queue
audit_logs
```

---

# 1. roles

```sql id="q1k8fw"
id uuid pk
code varchar unique
name varchar
active boolean
created_at timestamp
```

Valores:

```text id="p8v4mx"
ADMIN
SUPERVISOR
CAPTURADOR
REVISOR
VIEWER
```

---

# 2. users

```sql id="j4m2nd"
id uuid pk
role_id uuid fk roles.id
name varchar
email varchar unique
password_hash varchar
phone varchar null
active boolean
last_login_at timestamp null
created_at timestamp
```

---

# 3. products

```sql id="w7q3lc"
id uuid pk
sku varchar unique
internal_code varchar unique null
name varchar
brand varchar null
category varchar null
status varchar
main_media_id uuid null
visual_score int default 0
created_at timestamp
updated_at timestamp
```

Estados:

```text id="s9x5tr"
ACTIVE
INACTIVE
DRAFT
ARCHIVED
```

---

# 4. media_tasks

```sql id="r5n8ka"
id uuid pk
product_id uuid fk products.id
assigned_user_id uuid fk users.id null
priority varchar
status varchar
scheduled_date date null
started_at timestamp null
completed_at timestamp null
notes text null
created_by uuid fk users.id
created_at timestamp
updated_at timestamp
```

Estados:

```text id="z2m7pv"
PENDING
ASSIGNED
IN_PROGRESS
CAPTURED_PENDING_REVIEW
RETAKE_REQUIRED
COMPLETED
CANCELLED
```

---

# 5. media_task_shots

```sql id="h8q4df"
id uuid pk
media_task_id uuid fk media_tasks.id
shot_type varchar
is_required boolean
status varchar
approved_media_id uuid null
created_at timestamp
updated_at timestamp
```

shot_type ejemplos:

```text id="f6v1ne"
front
side
back
detail
barcode
package
hero
```

---

# 6. product_media

```sql id="k3r9wb"
id uuid pk
product_id uuid fk products.id
media_task_id uuid fk media_tasks.id null
storage_key varchar
public_url varchar null
mime_type varchar
width int
height int
size_bytes bigint
hash_sha256 varchar
is_primary boolean default false
status varchar
captured_by uuid fk users.id
captured_at timestamp
created_at timestamp
updated_at timestamp
```

Estados:

```text id="n4p6tx"
UPLOADED
PENDING_REVIEW
APPROVED
REJECTED
ARCHIVED
```

---

# 7. photo_review_queue

```sql id="t7w2mq"
id uuid pk
media_id uuid fk product_media.id
reviewer_id uuid fk users.id null
status varchar
decision varchar null
decision_reason varchar null
notes text null
queued_at timestamp
resolved_at timestamp null
created_at timestamp
```

Estados:

```text id="v1x8rh"
PENDING
IN_REVIEW
APPROVED
RETAKE_REQUIRED
REJECTED
```

---

# 8. audit_logs

```sql id="m9q3zk"
id uuid pk
user_id uuid fk users.id
entity_type varchar
entity_id uuid
action varchar
old_data jsonb null
new_data jsonb null
created_at timestamp
```

---

# Relaciones Clave

```text id="e5r7nu"
1 role → N users
1 product → N media_tasks
1 product → N product_media
1 media_task → N shots
1 media → 1 review queue item
1 user → muchas acciones
```

---

# Índices Obligatorios

```sql id="p2m6ya"
idx_products_sku
idx_media_tasks_status
idx_media_tasks_assigned_user
idx_product_media_product
idx_review_queue_status
idx_audit_logs_entity
```

---

# Reglas de Integridad

## Producto principal

Solo una imagen principal activa.

## Review obligatorio

No pasar media a APPROVED sin review.

## Soft delete

Usar:

```text id="g8v1lt"
active/status
```

No borrar histórico.

---

# Campos JSONB Útiles

## En audit_logs

Cambios completos.

## Futuro en products

metadata flexible.

---

# Seeds Iniciales

## roles

```text id="r4n8sx"
ADMIN
SUPERVISOR
CAPTURADOR
REVISOR
VIEWER
```

## shot templates

```text id="u2k5mf"
VASO
BOLSA
COMBO
CAJA
```

---

# Lo que NO Haría Aún

```text id="y6p9qd"
50 tablas
microservicios separados
EAV extremo
multiempresa compleja
```

---

# Migraciones Futuras

## Fase 2

```text id="h1w4zc"
zones
route_batches
sync_jobs
analytics_daily
ai_results
```

---

# Stack ORM Recomendado

## Si usas Python

```text id="c3m7rv"
SQLAlchemy + Alembic
```

## Si usas Node

```text id="n8q2ka"
Prisma
TypeORM (menos preferido)
```

---

# Veredicto Técnico

Con estas tablas puedes operar de verdad sin sobrecargar diseño.

---

# Estado

Documento oficial VISUAL_DATABASE_SCHEMA v1.

```
```
