````md id="r6m9qx"
# LABEL_NEXT_ACTIONS_30_DAYS_V1.md

## Estado

Documento oficial : LABEL_NEXT_ACTIONS_30_DAYS_V1.md

Plan táctico de 30 días para pasar de documentos estratégicos a software funcionando.

---

# Objetivo

Ejecutar acciones concretas que conviertan la arquitectura en MVP operativo.

```text
menos teoría
más ejecución
primer uso real
feedback temprano
````

---

# Principio Rector

```text id="m4q7ta"
En 30 días debe existir algo usable.
```

No solo diagramas.

---

# Resultado Esperado Día 30

```text id="p1n8dw"
login funcionando
productos cargados
lote creado
usuario trabaja items
se imprime etiqueta real
dashboard básico visible
```

---

# Semana 1 — Base Técnica

## Objetivo

Levantar entorno serio.

## Acciones

```text id="x6r2pk"
crear repositorio Git
definir stack final
configurar DEV/STAGING
crear PostgreSQL
crear estructura backend
crear estructura frontend
```

## Entregables

```text id="u3m9ra"
hello world deployado
DB conectada
CI básico
```

---

# Semana 2 — Núcleo Datos

## Objetivo

Modelo mínimo funcionando.

## Acciones

```text id="k5q1tv"
tablas users
roles
products
batches
batch_items
seed roles
importador productos csv/xlsx
```

## Entregables

```text id="j8m4ls"
productos visibles en UI
crear lote manual
asignar usuario
```

---

# Semana 3 — Flujo Operativo

## Objetivo

Procesar trabajo real.

## Acciones

```text id="r7q2mx"
lista mis items
lock item
editar campos permitidos
guardar cambios
marcar completado
```

## Entregables

```text id="t1m8pk"
primer lote procesado interno
```

---

# Semana 4 — Impresión Real

## Objetivo

Cerrar ciclo de valor.

## Acciones

```text id="h6q3ra"
template básico precio
print queue simple
registro impresoras
historial jobs
dashboard resumen
```

## Entregables

```text id="n4r7tv"
imprimir etiqueta desde sistema
supervisor ve métricas básicas
```

---

# Prioridad Diaria (Pareto)

## Siempre hacer primero

```text id="w2m9pk"
bloqueadores técnicos
flujo usuario principal
bugs impresión
datos corruptos
```

## Postergar

```text id="f8q1mx"
animaciones
modo oscuro
features raras
IA
```

---

# Backlog Día 1

## Backend

```text id="v5m3ra"
auth JWT
CRUD products
CRUD batches
print_jobs API
```

## Frontend

```text id="d3q8tw"
login
tabla productos
pantalla lote
pantalla trabajo
dashboard simple
```

## Infra

```text id="g7m2pk"
deploy frontend
deploy backend
db backups
```

---

# Métricas de Progreso

```text id="z1q6ra"
pantallas útiles activas
API endpoints listos
usuarios reales usando
etiquetas impresas/día
bugs críticos abiertos
```

---

# Riesgos 30 Días

## Riesgo 1

Perfeccionismo técnico.

## Riesgo 2

Cambiar stack a mitad.

## Riesgo 3

Hacer features no esenciales.

## Riesgo 4

No probar con usuarios reales.

---

# Reglas de Ejecución

```text id="y9m4tv"
deploy cada semana
demo cada semana
feedback cada semana
ajuste cada semana
```

---

# Stack Más Conveniente Para Ti

```text id="d4m8pk"
Frontend: Next.js
Backend: FastAPI
DB: PostgreSQL
Queue: Redis
```

Si quieres velocidad de aprendizaje alta.

---

# Si Trabajas Solo

## Rutina sugerida

```text id="m5q1ls"
2h backend
2h frontend
1h pruebas
1h documentación
```

Consistencia > intensidad esporádica.

---

# Checkpoint Día 15

Debes tener:

```text id="p8m3ra"
login
productos
crear lote
asignación usuarios
```

Si no, estás sobrecomplicando.

---

# Checkpoint Día 30

Debes tener:

```text id="u6q7mx"
flujo completo mínimo
producto → lote → edición → impresión
```

---

# Veredicto Técnico

Tu siguiente riesgo no es técnico.
Es no empezar a construir.

---

# Acción Recomendada Hoy

```text id="k4n9pk"
crear repositorio
definir stack final
hacer schema.sql inicial
```

---

# Estado

Documento oficial : LABEL_NEXT_ACTIONS_30_DAYS_V1.md

```
```
