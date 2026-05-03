````md id="m84zrp"
# ZONE_CAPTURE_PLANNING_V1.md

## Estado

Documento oficial del módulo de planificación de captura por zonas físicas.

Este módulo optimiza desplazamientos, organiza jornadas y acelera la producción visual en bodegas y puntos de venta.

---

# Objetivo

Transformar la toma de fotos en una operación logística ordenada basada en ubicaciones reales.

```text
menos caminata
más fotos por hora
mejor control
avance visible
trabajo distribuido
````

---

# Problema que Resuelve

Sin planificación por zonas ocurre:

* caminar innecesariamente
* regresar varias veces al mismo pasillo
* tareas mezcladas
* productos olvidados
* tiempos muertos
* baja productividad
* caos cuando trabajan varias personas

---

# Principio Arquitectónico

```text id="v1n6yo"
La ubicación física importa.
```

Si el producto está en bodega, la operación debe respetar geografía real.

---

# Modelo Conceptual

```text id="w7e2qt"
Warehouse
→ Zone
→ Aisle
→ Shelf
→ Product Position
```

---

# Entidades Principales

## Warehouse

Bodega física.

## Zone

Macro sector operativo.

## Route Batch

Conjunto de tareas cercanas.

## Position

Ubicación detallada del producto.

---

# Tabla: warehouses

```sql id="q3g8hp"
id uuid pk
name varchar
code varchar
active boolean
created_at timestamp
```

---

# Tabla: zones

```sql id="r4f2wd"
id uuid pk
warehouse_id uuid not null
name varchar
code varchar
sequence int
active boolean
created_at timestamp
```

---

# Tabla: product_locations

```sql id="j7s1lk"
id uuid pk
product_id uuid not null
warehouse_id uuid
zone_id uuid
aisle varchar null
shelf varchar null
bin varchar null
last_verified_at timestamp null
active boolean
```

---

# Tabla: route_batches

```sql id="p8m5zc"
id uuid pk
warehouse_id uuid
zone_id uuid
name varchar
status varchar
assigned_user_id uuid null
task_count int
estimated_minutes int
created_at timestamp
```

---

# Ejemplo de Zonas Reales

```text id="n0v9as"
Bodega A - Desechables
Bodega A - Plásticos
Bodega B - Papel
Mostrador
Mezanine
Recepción
Pasillo Frío
```

---

# Flujo Maestro

```text id="f9q2me"
productos pendientes
→ localizar físicamente
→ agrupar por zona
→ generar ruta
→ asignar capturador
→ ejecutar recorrido
→ cerrar ruta
```

---

# Estados de Route Batch

```text id="s6y4pd"
PLANNED
ASSIGNED
IN_PROGRESS
PAUSED
COMPLETED
CANCELLED
BLOCKED
```

---

# Estrategias de Agrupación

## 1. Por Zona

Más simple para MVP.

## 2. Por Cercanía

Productos cercanos aunque distinta subzona.

## 3. Por Prioridad Comercial

Campañas primero.

## 4. Mixto

```text id="g4t7rx"
prioridad + cercanía
```

Recomendado.

---

# Algoritmo MVP Recomendado

```text id="w0u1hj"
1 tomar tareas pendientes
2 ordenar por prioridad desc
3 agrupar por zone_id
4 ordenar secuencia zona
5 limitar a jornada estimada
```

---

# Algoritmo Fase 2

```text id="b6n2xt"
nearest path / shortest walk
```

Tipo picking logístico.

---

# UI Supervisor

## Vista Mapa Lista

* zonas con backlog
* tareas por zona
* avance %
* usuario asignado

## Acciones

```text id="e2p4dn"
crear ruta
reasignar
fusionar rutas
dividir ruta
cerrar jornada
```

---

# UI Capturador

## Pantalla Operativa

* ruta actual
* siguiente producto
* ubicación exacta
* progreso
* tiempo estimado restante

---

# Ejemplo Jornada

## Usuario Ana

```text id="y8v1tr"
Ruta 01
Zona A
25 productos
65 min estimados
```

## Usuario Luis

```text id="g9m2cf"
Ruta 02
Zona B
18 productos
50 min estimados
```

---

# Integración con MEDIA_TASK_ENGINE

Cada media_task debe heredar:

```text id="p1d8kw"
warehouse_id
zone_id
priority
```

Al crear rutas:

```text id="k2j6mw"
tasks → route_batch
```

---

# Reglas Operativas

## No mezclar demasiadas zonas en una ruta

Máximo recomendado MVP:

```text id="z4f0lu"
1 a 2 zonas
```

## Evitar rutas gigantes

```text id="d3v5aq"
45 a 90 minutos
```

---

# KPIs Clave

```text id="q6m9rv"
fotos por hora por zona
tiempo ruta real vs estimado
zona más lenta
productos olvidados
distancia operativa estimada
backlog por bodega
```

---

# Alertas Inteligentes

```text id="h5s2yo"
zona sin avance hoy
producto sin ubicación
ruta vencida
usuario detenido > X min
zona saturada backlog
```

---

# Calidad de Datos Necesaria

Sin ubicación correcta:

* rutas malas
* búsquedas lentas
* retrabajo

Por eso debe existir:

```text id="n7x3pw"
verificación periódica de posiciones
```

---

# Riesgos a Evitar

* rutas manuales improvisadas
* no registrar ubicación
* mezclar bodegas distantes
* jornadas excesivas
* no medir tiempos reales

---

# Roadmap Fase 2

* mapa visual de bodega
* navegación móvil
* QR ubicación
* heatmap productividad
* simulador de rutas

---

# Veredicto Técnico

Si tienes inventario físico grande, este módulo genera ganancias reales de tiempo.

No es accesorio. Es optimización operativa.

---

# Estado

Documento oficial ZONE CAPTURE PLANNING v1.

```
```
