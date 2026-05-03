````md id="q84mzt"
# VISUAL_MVP_EXECUTION_PLAN_V1.md

## Estado

Documento oficial del plan de ejecución MVP para el ecosistema visual.

Define qué construir primero, en qué orden y qué debe esperar.

---

# Objetivo

Lanzar una versión funcional real con máximo impacto y mínima complejidad.

```text
rápido
usable
rentable
escalable luego
````

---

# Principio Rector

```text id="w6n2qp"
No construir todo.
Construir lo que mueve la operación.
```

---

# Qué Debe Resolver el MVP

En tu operación real, el MVP debe permitir:

```text id="p4k7xa"
saber qué productos faltan por fotografiar
asignar trabajo
tomar fotos desde celular
revisarlas
aprobar imagen oficial
usar en tienda virtual
ver reportes simples
```

Si logra eso, ya sirve.

---

# Fases Reales de Construcción

## FASE 1 — Núcleo Operativo (obligatoria)

Duración sugerida:

```text id="n9r3sv"
3 a 6 semanas
```

## Entregables

### 1. Autenticación + Roles

```text id="y1q8md"
admin
supervisor
capturador
revisor
```

### 2. Productos Base

* importar catálogo existente
* lista productos
* búsqueda

### 3. Media Task Engine Básico

* crear tarea
* asignar usuario
* estados

### 4. App móvil básica

* login
* mis tareas
* cámara
* subir foto

### 5. Review Queue básica

* aprobar
* rechazar
* retoma

### 6. Imagen principal por producto

---

# FASE 2 — Valor Comercial

Duración:

```text id="m7x1kc"
2 a 4 semanas
```

## Entregables

### Biblioteca Visual

* galería producto
* ordenar imágenes
* reemplazar principal

### Sync WooCommerce

* subir imagen principal
* galería básica

### Reportes Supervisor

* pendientes
* aprobadas
* productividad

---

# FASE 3 — Optimización

## Entregables

* offline robusto
* zonas/rutas
* analytics avanzado
* IA blur
* score calidad

---

# Backlog Congelado (No tocar al inicio)

```text id="j3n9qw"
microservicios
machine learning complejo
marketplaces múltiples
iOS nativo
mapas 3D bodega
BI enterprise
```

---

# Arquitectura MVP Correcta

## Backend

```text id="x5p2ld"
FastAPI o NestJS
```

## DB

```text id="v2m6ra"
PostgreSQL
```

## Storage

```text id="g7q1tk"
Cloudflare R2
```

## Web Admin

```text id="h8r4zu"
Next.js
```

## Android

```text id="s1w9pc"
Jetpack Compose
```

---

# Modelo de Datos Mínimo

## Tablas obligatorias

```text id="u6k3df"
users
products
media_tasks
product_media
review_queue
roles
```

## Opcionales luego

```text id="t4q8mh"
zones
sync_jobs
analytics_daily
ai_results
```

---

# Flujo MVP Oficial

```text id="k9m2vr"
importar productos
→ crear tareas pendientes
→ asignar capturador
→ tomar foto
→ revisar
→ aprobar
→ guardar principal
→ exportar/publicar
```

---

# UI Prioritaria

## Web Supervisor

1. Dashboard simple
2. Productos pendientes
3. Cola revisión
4. Usuarios

## Android Usuario

1. Login
2. Mis tareas
3. Cámara
4. Historial breve

---

# KPIs para validar MVP

```text id="r8v5xn"
productos fotografiados por día
tiempo promedio tarea
approval rate
productos con imagen principal %
reducción tiempo búsqueda fotos
```

---

# Criterio de Éxito Real

El MVP funciona si después de 30 días:

```text id="f2m7jw"
la operación usa el sistema diariamente
las fotos están centralizadas
la tienda virtual recibe imágenes mejores
hay trazabilidad por usuario
```

---

# Riesgos Críticos

## 1. Sobreingeniería

Construir 20 módulos sin usuarios reales.

## 2. Mala UX móvil

Si tomar foto es lento, fracasa.

## 3. Internet obligatorio

Debes soportar señal mala.

## 4. Revisiones lentas

Cola debe ser rápida.

---

# Sprint Recomendado (Pareto)

## Sprint 1

```text id="n5x4pa"
login
productos
crear tareas
```

## Sprint 2

```text id="y3m8fd"
android cámara
subida imágenes
```

## Sprint 3

```text id="c7q2lr"
review queue
aprobar principal
```

## Sprint 4

```text id="w1r9ks"
WooCommerce sync
reportes
```

---

# Mi Recomendación Directa Para Ti

Por tu perfil actual y stack previo:

```text id="p6v2zh"
Android primero para operación
Backend limpio API
Google Sheets reportes paralelos
WooCommerce como canal inicial
```

---

# Veredicto Técnico

Ya tienes visión de producto real.
Ahora la clave no es pensar más: es recortar y ejecutar MVP.

---

# Estado

Documento oficial VISUAL_MVP_EXECUTION_PLAN v1.

```
```
