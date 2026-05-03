````md id="p3v8mx"
# LABEL_MVP_EXECUTION_PLAN_V1.md

## Estado

Documento oficial : LABEL_MVP_EXECUTION_PLAN_V1.md

Plan realista para construir el sistema de etiquetado funcional con máximo impacto y mínima complejidad inicial.

---

# Objetivo

Lanzar un MVP usable en operación diaria que resuelva trabajo real desde el primer mes.

```text
etiquetar más rápido
menos errores
mejor control
datos centralizados
crecer después
````

---

# Principio Rector

```text id="m6q2ta"
No construir todo.
Construir lo indispensable que genere valor inmediato.
```

---

# Qué Debe Resolver el MVP

```text id="u9r4pk"
crear lotes de trabajo
asignar usuarios
editar datos producto
generar etiquetas
imprimir controlado
medir productividad básica
reportar resultados diarios
```

---

# Alcance MVP (80/20)

## Incluir

```text id="x2n7dw"
usuarios y roles
catálogo base importado
lotes
flujo multiusuario
motor plantillas básico
cola impresión
dashboard supervisor simple
Google Sheets reportes
```

## Excluir Temporalmente

```text id="j5m8ra"
IA avanzada
multi sede
forecasting
editor visual complejo
ERP completo
marketplaces múltiples
```

---

# Fases de Construcción

# FASE 1 — Core Operativo

Duración sugerida:

```text id="k1q9tv"
3 a 5 semanas
```

## Entregables

### Usuarios + Roles

```text id="h4r2mx"
ADMIN
SUPERVISOR
OPERADOR
```

### Catálogo Base

Importar productos desde archivo existente.

### Lotes

Crear lote, asignar usuarios, ver progreso.

### Edición Producto en Flujo

Cambiar atributos permitidos.

---

# FASE 2 — Etiquetado Real

Duración:

```text id="v7m3pk"
2 a 4 semanas
```

## Entregables

### Label Template Engine Básico

* precio pequeño
* precio grande
* barcode

### Print Queue

* impresoras registradas
* historial
* reimpresión

### Locks Multiusuario

Evitar doble edición.

---

# FASE 3 — Gestión

## Entregables

### Dashboard

* producción hoy
* usuarios activos
* lotes atrasados

### Productividad

* items/hora
* tiempo promedio
* errores básicos

### Exportes

Google Sheets nocturno.

---

# Arquitectura MVP Correcta

## Backend

```text id="p8n1dz"
FastAPI
```

## DB

```text id="w3q7lc"
PostgreSQL
```

## Queue ligera

```text id="f6m4ra"
Redis
```

## Frontend

```text id="y2r8tp"
Next.js
```

## Estaciones Operativas

```text id="n9m5kv"
PC + navegador
Tablet opcional
```

---

# Modelo de Datos Mínimo

```text id="c7q1sx"
users
roles
products
batches
batch_items
label_templates
print_jobs
audit_logs
```

---

# Flujo Oficial MVP

```text id="g4n9mw"
importar productos
→ crear lote
→ asignar usuarios
→ editar ítems
→ generar etiqueta
→ imprimir
→ cerrar lote
→ reporte diario
```

---

# Sprint Recomendado

## Sprint 1

```text id="t6q2pk"
auth
roles
productos
```

## Sprint 2

```text id="m1r7vd"
lotes
asignación
locks
```

## Sprint 3

```text id="z5n8la"
templates
render
print queue
```

## Sprint 4

```text id="u3m6tx"
dashboard
analytics básico
sheets export
```

---

# KPIs de Validación MVP

```text id="e8q4rw"
items procesados/día
tiempo por item
errores impresión
usuarios activos diarios
uso real del sistema
```

---

# Criterio de Éxito (30 días)

```text id="r2n9pk"
supervisores usan dashboard
usuarios procesan lotes diarios
menos caos en impresión
reportes confiables
mejor velocidad operativa
```

---

# Riesgos Críticos

```text id="d7m3qa"
querer automatizar todo antes de operar
UX lenta
drivers impresoras inestables
sin reglas de permisos
sin backups
```

---

# Integración Estratégica Contigo

Muy conveniente para tu contexto:

```text id="h5q1mv"
distribuidora física
muchos SKUs
equipo operativo
WooCommerce futuro
Google Sheets actual
```

---

# Roadmap Después del MVP

```text id="k8r6tw"
QA avanzado
sync catálogo automático
insumos
IA sugerencias
multi sede
```

---

# Veredicto Técnico

Si ejecutas este MVP bien, reemplazas caos manual por sistema productivo real.

---

# Estado

Documento oficial : ````md id="w4m9qx"
# LABEL_DATABASE_SCHEMA_V1.md

## Estado

Documento oficial : LABEL_DATABASE_SCHEMA_V1.md

Esquema oficial de base de datos MVP para el ecosistema de etiquetado multiusuario.

---

# Objetivo

Definir tablas reales, relaciones y estructura mínima sólida para operar lotes, etiquetas, impresión y trazabilidad.

```text
usuarios
productos
lotes
items
plantillas
impresión
auditoría
````

---

# Principio Rector

```text id="p7q2ta"
Modelar la operación real, no las pantallas.
```

---

# Motor Recomendado

```text id="x1n8dw"
PostgreSQL
```

Por:

* consistencia transaccional
* relaciones fuertes
* índices robustos
* JSONB útil
* escalabilidad seria

---

# Tablas Núcleo MVP

```text id="j5m4ra"
roles
users
products
batches
batch_items
label_templates
print_jobs
printers
audit_logs
```

---

# 1. roles

```sql id="r8q3pk"
id uuid pk
code varchar unique
name varchar
active boolean
created_at timestamp
```

Valores:

```text id="n4v7td"
ADMIN
SUPERVISOR
OPERADOR
QA
AUDITOR
```

---

# 2. users

```sql id="k2m9ls"
id uuid pk
role_id uuid fk roles.id
name varchar
email varchar unique
password_hash varchar
active boolean
last_login_at timestamp null
created_at timestamp
```

---

# 3. products

```sql id="f6q1mx"
id uuid pk
sku varchar unique
internal_code varchar unique null
name varchar
brand varchar null
category varchar null
unit varchar null
price numeric(14,2)
status varchar
version_number int default 1
updated_at timestamp
created_at timestamp
```

Estados:

```text id="u9r2dw"
ACTIVE
INACTIVE
ARCHIVED
```

---

# 4. batches

```sql id="m3q8pk"
id uuid pk
code varchar unique
name varchar
status varchar
priority varchar
created_by uuid fk users.id
started_at timestamp null
closed_at timestamp null
created_at timestamp
```

Estados:

```text id="v1m6ra"
OPEN
IN_PROGRESS
PAUSED
DONE
CANCELLED
```

---

# 5. batch_items

```sql id="t7n4qx"
id uuid pk
batch_id uuid fk batches.id
product_id uuid fk products.id
assigned_user_id uuid fk users.id null
status varchar
locked_by uuid fk users.id null
locked_at timestamp null
started_at timestamp null
completed_at timestamp null
changes_count int default 0
print_count int default 0
notes text null
created_at timestamp
updated_at timestamp
```

Estados:

```text id="h4q7tw"
PENDING
ASSIGNED
IN_PROGRESS
DONE
REVIEW
BLOCKED
SKIPPED
```

---

# 6. label_templates

```sql id="c8m2pk"
id uuid pk
code varchar unique
name varchar
width_mm numeric
height_mm numeric
printer_type varchar
version int
active boolean
created_at timestamp
```

---

# 7. printers

```sql id="z5q1rd"
id uuid pk
name varchar
type varchar
location varchar
ip_address varchar null
is_default boolean
active boolean
created_at timestamp
```

---

# 8. print_jobs

```sql id="p2m6tv"
id uuid pk
batch_item_id uuid fk batch_items.id
template_id uuid fk label_templates.id
printer_id uuid fk printers.id
requested_by uuid fk users.id
copies int
status varchar
payload_json jsonb
error_message text null
created_at timestamp
started_at timestamp null
finished_at timestamp null
```

Estados:

```text id="g7r3mx"
PENDING
PROCESSING
PRINTED
FAILED
CANCELLED
```

---

# 9. audit_logs

```sql id="n1q8la"
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

```text id="y6m4pk"
1 role → N users
1 batch → N batch_items
1 product → N batch_items
1 batch_item → N print_jobs
1 template → N print_jobs
1 printer → N print_jobs
```

---

# Índices Obligatorios

```sql id="e3q7tw"
idx_products_sku
idx_batches_status
idx_batch_items_batch
idx_batch_items_assigned_user
idx_print_jobs_status
idx_audit_logs_entity
```

---

# Reglas de Integridad

## Lock Multiusuario

Un batch_item solo puede estar bloqueado por un usuario activo.

## Impresión

copies > 0 obligatorio.

## Histórico

No borrar jobs ni logs.

---

# JSONB Recomendado

## payload_json

Guardar datos renderizados de etiqueta.

## audit_logs

Cambios completos.

---

# Seeds Iniciales

## roles

```text id="r4m9vx"
ADMIN
SUPERVISOR
OPERADOR
QA
AUDITOR
```

## templates

```text id="u2q5pk"
PRICE_SMALL
PRICE_LARGE
BARCODE_STANDARD
```

---

# Lo que NO Haría Aún

```text id="d8n1ra"
50 tablas prematuras
microservicios
multiempresa compleja
event sourcing completo
```

---

# Migraciones Futuras

```text id="k7m3tw"
qa_checks
inventory_consumption
analytics_daily
sync_queue
ai_recommendations
```

---

# ORM Recomendado

## Python

```text id="m5q8ls"
SQLAlchemy + Alembic
```

## Node

```text id="x9r2pk"
Prisma
```

---

# Veredicto Técnico

Con este esquema ya puedes operar seriamente desde fase MVP.

---

# Estado

Documento oficial : LABEL_DATABASE_SCHEMA_V1.md

```
```

```
```
