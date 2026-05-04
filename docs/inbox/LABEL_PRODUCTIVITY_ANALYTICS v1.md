Siguiente documento oficial:

````md id="p4m8zs"
# LABEL_PRODUCTIVITY_ANALYTICS_V1.md

## Estado

Documento crítico para medir rendimiento real del sistema de etiquetado.

Sin métricas, operas a ciegas.

---

# Objetivo

Medir productividad, calidad, tiempos y cuellos de botella por:

```text
usuario
lote
producto
día
semana
categoría
````

---

# Principio Rector

```text
Lo que no se mide no mejora.
```

---

# Qué Debe Responder el Sistema

```text
Quién trabaja más
Quién trabaja mejor
Dónde se pierde tiempo
Qué categorías son lentas
Cuántos errores hay
Qué lotes se atrasan
```

---

# KPIs MVP Obligatorios

## Productividad

```text
items completados por hora
items completados por día
tiempo promedio por item
tiempo promedio por lote
```

## Calidad

```text
tasa aprobación inicial
rechazos por usuario
retrabajos
reimpresiones
errores reportados
```

## Operación

```text
lotes abiertos
lotes vencidos
usuarios activos hoy
tiempo inactivo
colas pendientes
```

---

# Modelo de Datos Recomendado

## productivity_events

```sql
id
user_id
batch_id
item_id
event_type
duration_seconds
metadata_json
created_at
```

## Tipos Evento

```text
ITEM_STARTED
ITEM_SAVED
ITEM_PRINTED
ITEM_DONE
ITEM_REJECTED
ITEM_REOPENED
SESSION_LOGIN
SESSION_IDLE
SESSION_END
```

---

# Fórmulas Reales

## Velocidad Usuario

```text
items_done / horas_activas
```

## Tiempo Promedio Ítem

```text
sum(duración items) / items_done
```

## Calidad Usuario

```text
items_aprobados / items_enviados
```

## Reproceso

```text
items_reabiertos / items_done
```

---

# Dashboard Admin

## Vista General

```text
Producción hoy
Producción semana
Pendientes
Top usuarios
Usuarios lentos
Errores críticos
```

## Vista por Usuario

```text
items hoy
promedio tiempo
rechazos
categorías trabajadas
actividad por hora
```

## Vista por Lote

```text
avance %
items restantes
ETA estimada
usuarios asignados
bloqueos
```

---

# Alertas Inteligentes

## Detectar

```text
usuario inactivo 20 min
lote estancado
demasiados rechazos
tiempo anormalmente alto
muchas reimpresiones
```

---

# Métrica Avanzada (Muy Útil)

## Dificultad por Categoría

Ejemplo:

```text
VASOS = 25 seg/item
BOLSAS = 18 seg/item
MAQUINAS = 95 seg/item
```

Sirve para repartir trabajo realista.

---

# Integración Google Sheets

## Muy buena decisión para supervisores

Exportar resumen diario automático:

```text
fecha
usuario
items
horas activas
promedio tiempo
rechazos
eficiencia
```

Así el supervisor revisa rápido en la noche.

---

# Riesgos a Evitar

```text
medir solo cantidad
ignorar calidad
rankings injustos sin dificultad categoría
no separar tiempo activo vs tiempo abierta sesión
usar métricas para castigar en vez de optimizar
```

---

# Recomendación Técnica

Usa eventos append-only + tablas resumen diarias.

No calcular todo en vivo sobre tablas operativas.

---

# Roadmap Fase 2

```text
predicción de cierre lote
detección de fatiga
benchmark por categoría
bonos por eficiencia real
```

---

# Veredicto Técnico

Este módulo convierte operación manual en operación gestionable.

---

# Estado

Documento oficial LABEL_PRODUCTIVITY_ANALYTICS v1.

```
```
