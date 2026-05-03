````md id="n58qld"
# VISUAL_MASTER_ARCHITECTURE_V1.md

## Estado

Documento oficial de arquitectura integral del ecosistema visual.

Este documento consolida todos los módulos definidos y establece cómo interactúan entre sí.

---

# Objetivo

Diseñar una plataforma escalable para captura, gobierno, análisis y distribución de activos visuales de producto.

```text
operación diaria
calidad sostenida
multicanal
automatización progresiva
````

---

# Visión Ejecutiva

La fotografía deja de ser una tarea aislada y pasa a ser una capacidad empresarial.

```text id="a2w7me"
Producto físico
→ operación visual
→ activo digital gobernado
→ venta y reutilización
```

---

# Módulos Oficiales

## Núcleo Operativo

```text id="v4r9pk"
MEDIA_TASK_ENGINE
ZONE_CAPTURE_PLANNING
VISUAL_MOBILE_APP
PHOTO_REVIEW_QUEUE
```

## Núcleo de Activos

```text id="j6m1tz"
VISUAL_ASSET_LIBRARY
PRODUCT_VISUAL_GOVERNANCE
VISUAL_SYNC_CHANNELS
```

## Núcleo Inteligencia

```text id="q3k8ns"
VISUAL_ANALYTICS_DASHBOARD
VISUAL_AI_AUTOMATION
```

---

# Arquitectura por Capas

## Capa 1 — Interfaces

```text id="h5x2rq"
App móvil Android
Web supervisor
Web admin
Dashboards
APIs externas
```

## Capa 2 — Servicios de Negocio

```text id="y7n4de"
Task Service
Review Service
Asset Service
Sync Service
Analytics Service
AI Service
```

## Capa 3 — Datos

```text id="z1m9cp"
PostgreSQL
Object Storage
Cache Redis
Event Logs
Data Warehouse
```

## Capa 4 — Integraciones

```text id="u8q6lj"
WooCommerce
Google Sheets
WhatsApp procesos
CDN
ERP futuro
```

---

# Flujo Maestro End-to-End

```text id="t2p7wa"
producto detectado
→ crear media task
→ planificar zona
→ capturar móvil
→ revisar cola
→ aprobar asset
→ guardar biblioteca
→ sincronizar canales
→ medir impacto
```

---

# Modelo de Datos Central

## Entidades Core

```text id="m3r8fv"
products
media_tasks
product_media
review_queue
visual_assets
sync_jobs
users
zones
```

---

# Eventos de Dominio

```text id="f6k2ns"
TASK_CREATED
PHOTO_CAPTURED
PHOTO_APPROVED
PRIMARY_CHANGED
SYNC_REQUESTED
SYNC_SUCCESS
QUALITY_FAILED
BACKLOG_ALERT
```

---

# Patrón Recomendado

```text id="p1x4jh"
event-driven light
```

No microservicios pesados al inicio.

Servicios modulares dentro de un monolito limpio.

---

# Stack Técnico Recomendado MVP

## Backend

```text id="g8q3zt"
Node.js / NestJS
o
Python FastAPI
```

## DB

```text id="n4w7lc"
PostgreSQL
```

## Storage

```text id="r9v1md"
Cloudflare R2
S3
```

## Frontend Web

```text id="s2m6pk"
Next.js
```

## Móvil

```text id="k7q9ra"
Android Kotlin
Jetpack Compose
```

---

# Seguridad

## Roles

```text id="e5x1tv"
admin
supervisor
capturador
revisor
viewer
```

## Controles

* JWT/Auth robusto
* permisos por módulo
* URLs firmadas
* auditoría completa

---

# Escalabilidad MVP → Growth

## MVP

```text id="q7n2dw"
1 bodega
5 usuarios
50k imágenes
```

## Growth

```text id="j3r6mp"
múltiples sedes
50 usuarios
1M+ assets
workers async
CDN global
```

---

# Observabilidad

## Logs

```text id="u1p8ne"
errores sync
subidas fallidas
latencia review
colas pendientes
```

## Métricas

```text id="x4m5rz"
fotos/hora
approval rate
publish delay
```

---

# Integración con Tu Ecosistema

## Muy alineado contigo

```text id="h9q3cv"
Google Sheets reportes
WooCommerce catálogo
Android operación
ERP futuro
```

---

# Roadmap de Construcción

## Fase 1 (8o/20)

```text id="v6n1tb"
tasks
mobile capture
review queue
asset library
basic sync
```

## Fase 2

```text id="y2m7kd"
analytics
governance rules
offline avanzado
```

## Fase 3

```text id="c8r4px"
AI automation
forecasting
multi-sede
```

---

# Riesgos a Evitar

* empezar con demasiada complejidad
* microservicios prematuros
* storage local desordenado
* no modelar eventos
* no separar captura y revisión

---

# Veredicto Técnico

Esto ya no es “módulo fotos”.

Es una plataforma operativa visual completa.

---

# Estado

Documento oficial VISUAL_MASTER_ARCHITECTURE v1.

```
```
