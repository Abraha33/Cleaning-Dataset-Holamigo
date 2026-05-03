````md id="v26xsd"
# VISUAL_ANALYTICS_DASHBOARD_V1.md

## Estado

Documento oficial del módulo analítico para operación visual.

Este módulo transforma fotos y tareas en métricas accionables para supervisión y mejora continua.

---

# Objetivo

Medir productividad, calidad, backlog e impacto comercial del sistema visual.

```text
qué pasa hoy
dónde se frena
quién produce
qué falta
qué mejora ventas
````

---

# Problema que Resuelve

Sin analítica ocurre:

* se trabaja a ciegas
* backlog invisible
* usuarios lentos no detectados
* zonas problemáticas ocultas
* mala calidad repetitiva
* decisiones por intuición

---

# Principio Rector

```text id="x7k4jd"
Lo que no se mide, se degrada.
```

---

# Capas Analíticas

## 1. Operación

Tareas, tiempos, rutas, usuarios.

## 2. Calidad

Aprobación, retomas, score visual.

## 3. Catálogo

Cobertura visual por categoría.

## 4. Comercial

Impacto en publicación y conversión.

---

# Modelo de Datos

## Tabla: visual_daily_metrics

```sql id="f1n6pr"
metric_date date
warehouse_id uuid null
zone_id uuid null
user_id uuid null
tasks_created int
tasks_completed int
photos_captured int
photos_approved int
retakes int
avg_task_minutes numeric
avg_review_minutes numeric
```

---

## Tabla: product_visual_metrics

```sql id="r8m2kt"
product_id uuid
visual_score int
gallery_count int
last_photo_days int
views int null
conversion_rate numeric null
```

---

# Dashboard Ejecutivo

## Resumen Hoy

```text id="y5q1as"
tareas creadas
tareas cerradas
fotos tomadas
fotos aprobadas
retomas
backlog actual
```

## Semanal

```text id="j2v8lw"
avance %
promedio diario
zonas cumplidas
usuarios top
```

---

# Dashboard Supervisor

## Operación en Tiempo Real

* usuarios activos
* rutas en progreso
* tareas detenidas
* cola de revisión pendiente
* SLA vencidos

---

# Dashboard Calidad

```text id="u7r3nd"
approval rate
retake rate
rechazos por motivo
score promedio por categoría
capturadores con más errores
```

---

# Dashboard Catálogo

```text id="p4x9mq"
productos sin imagen principal
productos sin galería mínima
imágenes vencidas
categorías débiles
top marcas sin cobertura
```

---

# Dashboard Comercial

```text id="e3k6tf"
productos listos para publicar
productos bloqueados por imagen
conversión vs score visual
CTR vs imagen principal
```

---

# Métricas Clave (KPI)

## Productividad

```text id="q8d2av"
productos/hora
fotos/hora
tiempo promedio tarea
cumplimiento jornada
```

## Calidad

```text id="g6m1ry"
% aprobadas primer intento
retomas por 100 fotos
score medio
```

## Flujo

```text id="w3n5he"
edad backlog
cola revisión
SLA cumplido
```

---

# Alertas Automáticas

```text id="s2v9up"
backlog subiendo 3 días
zona sin actividad
approval rate bajo
usuario detenido > 30 min
muchas retomas mismo capturador
```

---

# Rankings Útiles

## Usuarios

* más productivo
* mejor calidad
* más consistente

## Zonas

* más rápidas
* más atrasadas

## Categorías

* mejor cobertura
* peor score visual

---

# Visualizaciones Recomendadas

* barras productividad diaria
* línea backlog semanal
* heatmap zonas
* embudo captura → aprobación → publicación
* tabla top problemas

---

# Integración con Google Sheets

Muy útil para supervisores no técnicos.

## Exportar Diario

```text id="k1w4mz"
resumen día
usuarios
avance por zona
pendientes
retomas
```

## Exportar Semanal

```text id="n7q2cx"
KPIs consolidados
tendencias
categorías críticas
```

---

# Integración con Catálogo Maestro

```text id="h5m8rf"
product.visual_score
product.publish_ready
product.visual_priority
```

---

# Consultas Estratégicas

```text id="b9x3td"
¿qué categoría vende bien pero tiene malas fotos?
¿qué usuario produce rápido y bien?
¿qué backlog afecta campaña próxima?
¿qué productos llevan 90 días sin renovar imagen?
```

---

# Riesgos a Evitar

* medir solo cantidad
* ignorar calidad
* dashboards lentos
* métricas sin acción
* exceso de KPIs inútiles

---

# Roadmap Fase 2

* predicción backlog
* forecast capacidad equipo
* IA anomalías operativas
* impacto imagen vs ventas automático
* benchmark mensual

---

# Veredicto Técnico

Sin dashboard, administras por sensación.
Con dashboard, gestionas por evidencia.

---

# Estado

Documento oficial VISUAL ANALYTICS DASHBOARD v1.

```
```
