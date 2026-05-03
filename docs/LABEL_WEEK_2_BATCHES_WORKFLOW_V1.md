````md id="k6m8qx"
# LABEL_WEEK_2_BATCHES_WORKFLOW_V1.md

## Estado

Documento oficial : LABEL_WEEK_2_BATCHES_WORKFLOW_V1.md

Plan táctico de la Semana 2 para construir el flujo operativo real de lotes y trabajo multiusuario.

---

# Objetivo

Transformar el sistema de catálogo en una herramienta operativa diaria.

```text
crear lotes
asignar trabajo
procesar items
evitar colisiones
medir avance
````

---

# Principio Rector

```text id="m3q7ta"
Semana 2 construye operación real.
```

---

# Meta al Final de la Semana

```text id="p6n8dw"
supervisor crea lote
asigna usuarios
operador trabaja items
locks funcionan
avance visible
```

---

# Resultado Estratégico

Ya no será solo software administrativo.

Será software usado por el equipo.

---

# Día 8 — Modelo de Lotes

## Backend

Crear tablas:

```text id="x1r6pk"
batches
batch_items
```

Campos mínimos:

```text id="u8m2ra"
batch.code
batch.name
status
priority
created_by
```

```text id="k5q9tv"
batch_item.batch_id
product_id
assigned_user_id
status
locked_by
```

## Frontend

Pantalla:

```text id="j3m1ls"
Listado de lotes
```

## Exit Criteria

```text id="r6q4mx"
crear lote vacío
```

---

# Día 9 — Agregar Productos al Lote

## Backend

Endpoints:

```text id="w2n7pk"
POST /batches/{id}/items
GET /batches/{id}
```

## Frontend

UI:

```text id="f9m3ra"
selector productos
agregar múltiple
ver cantidad items
```

## Exit Criteria

```text id="t1q8dw"
lote con productos reales
```

---

# Día 10 — Asignación de Usuarios

## Backend

```text id="h7r2pk"
assign batch_item user
bulk assign
```

## Frontend

Supervisor puede:

```text id="n4m9tv"
seleccionar items
asignar operador
reasignar
```

## Exit Criteria

```text id="p8q1ls"
cada operador ve sus tareas
```

---

# Día 11 — Workflow Operador

## Frontend Operador

Pantalla:

```text id="x5r7mx"
mis items pendientes
abrir item
editar datos permitidos
guardar
siguiente
```

## Backend

```text id="u2m6pk"
PATCH batch_item
complete item
```

## Exit Criteria

```text id="g1q9ra"
primer item completado
```

---

# Día 12 — Locks Multiusuario

## Backend

Implementar:

```text id="v7m3tw"
lock item
unlock item
timeout lock
```

Usar:

Redis o DB lock temporal.

## Frontend

Mostrar:

```text id="k4n8ls"
ocupado por otro usuario
```

## Exit Criteria

```text id="s9q2pk"
dos usuarios no pisan mismo item
```

---

# Día 13 — Dashboard de Lotes

## Frontend Supervisor

Ver:

```text id="e6m1ra"
avance %
items pendientes
por usuario
atrasados
```

## Backend

```text id="r3q7tv"
batch summary endpoint
```

## Exit Criteria

```text id="d5m8pk"
supervisor controla progreso
```

---

# Día 14 — Hardening + Demo

## Técnica

```text id="q1m9ra"
bugs locks
UX rápida
validaciones
logs workflow
```

## Demo Interna

Probar con usuarios reales.

## Exit Criteria

```text id="z7m2pk"
lote procesado completo prueba
```

---

# Endpoints Semana 2

```text id="n1q6tv"
GET /batches
POST /batches
GET /batches/{id}
POST /batches/{id}/items
POST /batch-items/{id}/assign
POST /batch-items/{id}/lock
PATCH /batch-items/{id}
POST /batch-items/{id}/complete
```

---

# Estados Recomendados

## Batch

```text id="m4r8px"
OPEN
IN_PROGRESS
DONE
PAUSED
```

## Batch Item

```text id="c2m7ra"
PENDING
ASSIGNED
IN_PROGRESS
DONE
BLOCKED
```

---

# KPI Semana 2

```text id="h9q1tv"
1 lote real creado
20+ items procesados
0 colisiones críticas
usuarios entienden flujo
```

---

# Riesgos Semana 2

## Riesgo 1

Locks mal hechos.

## Riesgo 2

UI lenta para operador.

## Riesgo 3

Asignación manual engorrosa.

---

# Qué NO Hacer

```text id="t7m4pk"
analytics complejo
QA avanzado
mobile app
printer queue todavía compleja
```

---

# Señal de Éxito Real

Un supervisor prefiere usar esto en vez de WhatsApp + Excel.

---

# Semana 3 Recomendada

```text id="p3q8ra"
templates
print queue
impresión real
```

---

# Veredicto Técnico

Semana 2 define adopción operativa.
Si falla aquí, nadie lo usa.

---

# Próximo Documento Recomendado

```text id="v1m6tx"
LABEL_WEEK_3_PRINTING_SYSTEM_V1.md
```

---

# Estado

Documento oficial : LABEL_WEEK_2_BATCHES_WORKFLOW_V1.md

```
```
