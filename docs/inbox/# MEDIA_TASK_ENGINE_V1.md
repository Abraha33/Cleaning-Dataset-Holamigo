````md id="r51nko"
# MEDIA_TASK_ENGINE_V1.md

## Estado

Documento oficial del motor de tareas para captura visual de productos.

Este módulo organiza el trabajo diario de fotografía, evita improvisación y convierte la toma de imágenes en una operación medible.

---

# Objetivo

Planificar, asignar, ejecutar y controlar tareas de fotografía de producto mediante lotes inteligentes.

```text
qué fotografiar
quién lo hará
cuándo
dónde
qué tipo de fotos faltan
qué quedó pendiente
````

---

# Problema que Resuelve

Sin motor de tareas ocurre:

* productos olvidados
* fotos duplicadas
* zonas repetidas
* nadie sabe prioridades
* imágenes incompletas
* trabajo desordenado
* revisión caótica

---

# Principio Arquitectónico

```text
Foto = Resultado
Tarea = Unidad Operativa
```

La imagen final no es el inicio del proceso.
La tarea sí lo es.

---

# Entidades Principales

## 1. Media Task

Trabajo pendiente o en curso sobre un producto.

## 2. Shot Requirement

Tipos de fotos requeridas para completar tarea.

## 3. Assignment

Responsable individual o equipo.

## 4. Zone

Ubicación física donde se ejecuta.

## 5. Review Outcome

Resultado posterior de calidad.

---

# Flujo Maestro

```text id="x6u2la"
Producto detectado sin fotos
→ sistema crea media_task
→ se prioriza
→ se asigna usuario
→ usuario captura fotos
→ pasa revisión
→ aprobada o retoma
→ cerrar tarea
```

---

# Tabla: media_tasks

```sql id="lw4g17"
id uuid pk
product_id uuid not null
variant_id uuid null
zone_id uuid null
batch_id uuid null
priority varchar
status varchar
assigned_user_id uuid null
assigned_team_id uuid null
scheduled_date date null
started_at timestamp null
completed_at timestamp null
required_shots_count int default 0
completed_shots_count int default 0
retake_count int default 0
source_trigger varchar
notes text null
created_by uuid
created_at timestamp
updated_at timestamp
```

---

# Tabla: media_task_shots

```sql id="k2ejt1"
id uuid pk
media_task_id uuid not null
shot_type varchar
is_required boolean default true
status varchar
approved_media_id uuid null
attempts int default 0
notes text null
created_at timestamp
updated_at timestamp
```

---

# Tabla: zones

```sql id="k9rzq4"
id uuid pk
name varchar
warehouse varchar null
sequence int
active boolean
created_at timestamp
```

---

# Estados Oficiales de Tarea

```text id="z0lg4n"
PENDING
PLANNED
ASSIGNED
IN_PROGRESS
CAPTURED_PENDING_REVIEW
RETAKE_REQUIRED
COMPLETED
CANCELLED
BLOCKED
```

---

# Estados de Shot

```text id="k74d2g"
PENDING
CAPTURED
IN_REVIEW
APPROVED
REJECTED
RETAKE_REQUIRED
SKIPPED
```

---

# Prioridades

```text id="7h2t8x"
CRITICAL
HIGH
NORMAL
LOW
```

---

# Triggers Automáticos de Creación

## Cuando crear una tarea

```text id="9d7zzj"
producto nuevo sin imágenes
imagen principal faltante
producto rebranding
nuevo empaque detectado
campaña comercial próxima
producto aprobado sin galería mínima
retoma solicitada
```

---

# source_trigger valores

```text id="zzmyru"
NEW_PRODUCT
MISSING_PRIMARY
SEASONAL_CAMPAIGN
PACKAGING_CHANGED
REVIEW_RETAKE
MANUAL_REQUEST
IMPORT_SYNC
```

---

# Plantillas por Tipo de Producto

## Vaso

```text id="jwwp3u"
front
side
package
barcode
```

## Bolsa basura

```text id="92n7of"
front
folded
package
barcode
```

## Combo fiesta

```text id="z53pph"
hero
contents
package
context
```

## Producto premium ecommerce

```text id="zqv8jv"
front
side
back
detail
lifestyle
```

---

# Reglas de Asignación

## Manual

Supervisor asigna tareas.

## Automática

Sistema distribuye según:

```text id="4t7wsy"
zona física
carga actual usuario
habilidad
dispositivo disponible
prioridad
```

---

# Algoritmo Recomendado MVP

```text id="w1tt2x"
ordenar por prioridad desc
agrupar por zona
asignar al usuario con menos carga
```

---

# Flujo Usuario Móvil

```text id="mgnw9u"
abrir tarea
ver producto
ver shots requeridos
capturar
guardar
marcar completado
siguiente tarea automática
```

---

# Flujo Supervisor

```text id="0xtr8v"
ver tablero
crear tareas
reasignar
bloquear
cerrar lote
ver productividad
```

---

# Dashboard Operativo

## KPIs Día

```text id="b2j9hj"
tareas creadas
tareas completadas
retomas solicitadas
productos/hora
fotos aprobadas %
```

## KPIs Gestión

```text id="ok5htv"
zona atrasada
usuario saturado
backlog pendiente
tiempo medio cierre
```

---

# Reglas de Calidad

Una tarea no puede cerrarse si:

```text id="uwk2xe"
faltan shots obligatorios
imagen principal no aprobada
producto erróneo
review pendiente crítica
```

---

# Reasignación

Permitida si estado:

```text id="p4dshs"
PENDING
PLANNED
ASSIGNED
BLOCKED
```

No si está en captura activa salvo override supervisor.

---

# SLA Recomendado

## Alta prioridad

```text id="e7fxyh"
24 horas
```

## Normal

```text id="4zmt9o"
72 horas
```

## Baja

```text id="9ecv7s"
7 días
```

---

# Integración con Catálogo Maestro

Cuando tarea COMPLETED:

```text id="u1g74z"
product.has_media = true
product.media_status = READY
product.main_image = asset_primary
```

Si retoma:

```text id="7j1qg3"
product.media_status = INCOMPLETE
```

---

# Integración con eCommerce

Producto no publica si regla exige:

```text id="dyh9tf"
main_image approved
```

Premium SKU:

```text id="86e3pk"
>= 3 imágenes aprobadas
```

---

# Auditoría

## Tabla media_task_events

```sql id="n1d4yt"
id
media_task_id
user_id
event_type
old_status
new_status
payload_json
created_at
```

Eventos:

```text id="z34v8h"
CREATED
ASSIGNED
STARTED
SHOT_CAPTURED
RETAKE_REQUESTED
COMPLETED
REOPENED
CANCELLED
```

---

# Riesgos a Evitar

* crear tareas manuales siempre
* no usar zonas
* no definir shots requeridos
* cerrar sin revisión
* backlog invisible
* usuario escogiendo tareas al azar

---

# Roadmap Fase 2

* rutas óptimas por bodega
* IA detección blur
* sugerencia automática de shot faltante
* forecast de backlog semanal
* ranking productividad por calidad

---

# Veredicto Técnico

Sin este motor, el módulo imágenes es solo almacenamiento.
Con este motor, se vuelve operación escalable.

---

# Estado

Documento oficial MEDIA TASK ENGINE v1.

```
```
