````md id="u92vqe"
# PHOTO_REVIEW_QUEUE_V1.md

## Estado

Documento oficial del módulo de revisión, aprobación y control de calidad de imágenes.

Este módulo separa capturar fotos de aprobar fotos.  
Sin esta separación, la calidad cae rápidamente.

---

# Objetivo

Procesar todas las imágenes capturadas mediante una cola estructurada de revisión.

```text
verificar calidad
aprobar rápido
pedir retoma
rechazar basura
mantener estándar visual
````

---

# Problema que Resuelve

Sin cola de revisión ocurre:

* fotos borrosas publicadas
* imágenes oscuras
* duplicados
* fondos inconsistentes
* galerías incompletas
* pérdida de tiempo buscando qué revisar
* criterios distintos entre personas

---

# Principio Arquitectónico

```text id="i2u7rw"
Captura ≠ Aprobación
```

Quien toma la foto no necesariamente la aprueba.

---

# Flujo Maestro

```text id="e4m1zo"
usuario captura
→ imagen entra cola
→ revisor evalúa
→ aprobar / retoma / rechazar
→ actualizar producto
→ cerrar tarea
```

---

# Entidades Principales

## Review Item

Unidad revisable.

## Review Session

Bloque de trabajo del revisor.

## Decision

Resultado de evaluación.

## Quality Rule

Criterios estandarizados.

---

# Tabla: photo_review_queue

```sql id="y8w0dr"
id uuid pk
media_id uuid not null
product_id uuid not null
media_task_id uuid null
priority varchar
status varchar
assigned_reviewer_id uuid null
queued_at timestamp
started_at timestamp null
resolved_at timestamp null
decision varchar null
decision_reason varchar null
notes text null
created_at timestamp
updated_at timestamp
```

---

# Tabla: photo_review_events

```sql id="v6s7gh"
id uuid pk
queue_id uuid not null
user_id uuid not null
event_type varchar
payload_json json
created_at timestamp
```

---

# Estados de Cola

```text id="v6rj4h"
PENDING
TAKEN
IN_REVIEW
APPROVED
RETAKE_REQUIRED
REJECTED
ESCALATED
CANCELLED
```

---

# Prioridades

```text id="i3gk8d"
CRITICAL
HIGH
NORMAL
LOW
```

---

# Criterios de Calidad

## Técnicos

```text id="e1x2jk"
enfoque
iluminación
resolución
encuadre
archivo correcto
```

## Comerciales

```text id="j7z2lu"
producto visible
marca legible
empaque correcto
fondo aceptable
consistencia catálogo
```

## Catálogo

```text id="m2n3rt"
imagen principal existe
orden correcto
galería mínima completa
shot requerido presente
```

---

# Motivos de Retoma

```text id="z9v2nb"
BLUR
DARK
CUT_OFF
WRONG_PRODUCT
WRONG_ANGLE
DIRTY_BACKGROUND
LOW_RESOLUTION
MISSING_BARCODE
INCOMPLETE_SET
DAMAGED_PRODUCT
```

---

# Motivos de Rechazo

```text id="r8n6px"
DUPLICATE
IRRECOVERABLE_FILE
SPAM_UPLOAD
INVALID_PRODUCT
NOT_RELATED
```

---

# Flujo del Revisor

```text id="f5n3wa"
abrir siguiente ítem
ver producto + imágenes previas
zoom rápido
evaluar checklist
decidir
siguiente automático
```

---

# UI Revisor Correcta

## Panel Izquierdo

* cola pendiente
* filtros
* prioridad

## Centro

* imagen grande
* zoom
* rotación

## Derecha

* datos producto
* shots requeridos
* historial previo

## Acciones

```text id="y3h8dq"
aprobar
retoma
rechazar
escalar
aprobar lote
```

---

# Auto Queue Ordering MVP

```text id="t0d9wc"
1 prioridad desc
2 productos sin imagen principal
3 tareas antiguas
4 campañas activas
5 FIFO
```

---

# Reglas de Negocio

## Aprobación automática opcional

Si cumple:

```text id="j1f5me"
alta resolución
sin blur detectado
tipo simple
usuario confiable
```

Pasa a APPROVED_AUTO.

## Doble revisión

Para productos premium o campañas.

---

# Integración con MEDIA_TASK_ENGINE

Si todas las fotos obligatorias quedan aprobadas:

```text id="n5m0pa"
media_task = COMPLETED
```

Si alguna falla:

```text id="h2k7ze"
media_task = RETAKE_REQUIRED
```

---

# Integración con Producto Maestro

```text id="r2q1vl"
product.main_image = approved primary
product.media_score = 0..100
product.media_status = READY / INCOMPLETE
```

---

# SLA Recomendado

## Cola crítica

```text id="l7w2tx"
< 4 horas
```

## Normal

```text id="x0r8hf"
24 horas
```

## Backlog antiguo

```text id="a6z4nw"
48 horas
```

---

# KPIs Clave

```text id="j4v2ka"
ítems revisados/hora
approval rate
retake rate
tiempo promedio revisión
backlog pendiente
errores por capturador
```

---

# Auditoría Obligatoria

Registrar:

```text id="p7q1uy"
revisor
hora inicio
hora decisión
motivo
comentarios
producto afectado
```

---

# Riesgos a Evitar

* aprobar sin estándar
* criterios subjetivos
* backlog invisible
* revisar manualmente carpetas
* sin prioridad
* sin métricas

---

# Roadmap Fase 2

* IA blur score
* detección duplicados visuales
* OCR empaque
* score automático branding
* comparación con imagen anterior

---

# Veredicto Técnico

Capturar escala personas.
Revisar escala calidad.

Sin este módulo, el catálogo se degrada con el tiempo.

---

# Estado

Documento oficial PHOTO REVIEW QUEUE v1.

```
```
