````md id="v9m4qx"
# LABEL_DAY_2_TO_DAY_7_EXECUTION_PLAN_V1.md

## Estado

Documento oficial : LABEL_DAY_2_TO_DAY_7_EXECUTION_PLAN_V1.md

Plan táctico de ejecución para convertir el arranque técnico en un MVP real durante la primera semana.

---

# Objetivo

Cerrar la semana 1 con una base funcional seria.

```text
auth listo
productos listos
DB estable
UI inicial útil
primer flujo real
````

---

# Principio Rector

```text id="m2q7ta"
Semana 1 no busca perfección.
Busca tracción técnica.
```

---

# Meta al Final del Día 7

```text id="p5n8dw"
login funcionando
roles creados
productos visibles
CRUD básico
frontend conectado API
deploy inicial hecho
```

---

# Día 2 — Auth Foundation

## Backend

```text id="x1r6pk"
tabla users
tabla roles
seed roles
hash passwords
endpoint login
JWT access token
```

## Frontend

```text id="u8m2ra"
pantalla login real
guardar token
redirigir dashboard
```

## Exit Criteria

```text id="k5q9tv"
admin puede entrar
```

---

# Día 3 — Guards + Session

## Backend

```text id="j3m1ls"
current user endpoint
middleware auth
role checks básicos
```

## Frontend

```text id="r6q4mx"
route guards
logout
persistencia sesión
```

## Exit Criteria

```text id="w2n7pk"
ruta privada protegida
```

---

# Día 4 — Products Core

## Backend

```text id="f9m3ra"
GET products
POST products
PATCH products
paginación básica
search simple
```

## Frontend

```text id="t1q8dw"
tabla productos
buscador
crear producto modal simple
```

## Exit Criteria

```text id="h7r2pk"
productos administrables
```

---

# Día 5 — Importación Inicial

## Backend

```text id="n4m9tv"
import csv/xlsx endpoint
validaciones mínimas
errores fila por fila
```

## Frontend

```text id="p8q1ls"
pantalla upload archivo
resultado importación
```

## Exit Criteria

```text id="x5r7mx"
catálogo inicial cargado
```

---

# Día 6 — Dashboard Base

## Backend

```text id="u2m6pk"
summary endpoint
products count
users count
open batches count
```

## Frontend

```text id="g1q9ra"
cards KPI
layout dashboard
sidebar navegación
```

## Exit Criteria

```text id="v7m3tw"
dashboard usable
```

---

# Día 7 — Deploy + Cleanup

## Infra

```text id="k4n8ls"
deploy frontend
deploy backend
variables entorno reales
dominio temporal
```

## Técnica

```text id="s9q2pk"
refactor rápido
fix bugs críticos
README update
```

## Exit Criteria

```text id="e6m1ra"
sistema accesible online
```

---

# Horario Diario Recomendado (Solo)

```text id="r3q7tv"
2h backend
2h frontend
1h pruebas
1h limpieza/documentación
```

---

# KPI Semana 1

```text id="d5m8pk"
login real activo
10+ productos visibles
deploy funcionando
0 bugs bloqueantes
```

---

# Riesgos Semana 1

## Riesgo 1

Perder tiempo diseño visual.

## Riesgo 2

Querer lotes e impresión ya.

## Riesgo 3

Cambiar stack.

---

# Qué NO Hacer Esta Semana

```text id="q1m9ra"
printer queue avanzada
microservicios
analytics complejo
mobile app
AI features
```

---

# Si Vas Muy Rápido

Agregar:

```text id="z7m2pk"
tabla batches
modelo batch_items
```

Solo si todo lo demás está sólido.

---

# Señal de Buen Progreso

El día 7 alguien puede entrar y ver algo útil.

---

# Semana 2 Recomendada

```text id="n1q6tv"
batches
workflow operador
locks multiusuario
```

---

# Veredicto Técnico

La primera semana define si esto será proyecto real o idea eterna.

---

# Próximo Documento Recomendado

```text id="m4r8px"
LABEL_WEEK_2_BATCHES_WORKFLOW_V1.md
```

---

# Estado

Documento oficial : LABEL_DAY_2_TO_DAY_7_EXECUTION_PLAN_V1.md

```
```
