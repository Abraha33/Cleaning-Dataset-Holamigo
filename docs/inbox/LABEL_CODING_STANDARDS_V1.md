````md id="t8m5qv"
# LABEL_CODING_STANDARDS_V1.md

## Estado

Documento oficial : LABEL_CODING_STANDARDS_V1.md

Estándares oficiales de desarrollo para mantener calidad, consistencia y velocidad sostenible en el sistema de etiquetado.

---

# Objetivo

Definir reglas claras para escribir código profesional desde el día 1.

```text
legibilidad
mantenibilidad
menos bugs
onboarding fácil
refactor seguro
````

---

# Principio Rector

```text id="m3q7ta"
Código claro vence código “ingenioso”.
```

---

# Alcance

Aplica a:

```text id="p6n8dw"
backend
frontend
scripts
SQL
tests
infra
```

---

# Reglas Universales

## 1. Nombres explícitos

## Malo

```text id="x1r6pk"
data
temp
value
doThing
```

## Bueno

```text id="u8m2ra"
batchItems
printJobStatus
calculateLabelCost
assignOperatorToBatch
```

---

## 2. Funciones pequeñas

Objetivo:

```text id="k5q9tv"
1 responsabilidad
20-40 líneas idealmente
```

---

## 3. Evitar duplicación

Usar:

```text id="j3m1ls"
shared utils
services
components
```

No copy-paste.

---

## 4. Comentarios útiles

Comentar:

```text id="r6q4mx"
por qué
decisión rara
regla negocio compleja
```

No comentar lo obvio.

---

# Backend Python Standards

## Estilo

Seguir PEP 8.

## Tipado obligatorio

```python id="w2n7pk"
def assign_user(batch_item_id: str, user_id: str) -> None:
```

## Imports ordenados

```text id="f9m3ra"
stdlib
third-party
internal
```

## Exceptions custom

```text id="t1q8dw"
BatchLockedError
PrinterOfflineError
```

---

# FastAPI Reglas

## Router delgado

Solo:

```text id="h7r2pk"
request
auth
call service
response
```

## Service grueso

Regla negocio aquí.

---

# SQL / DB Standards

## No SELECT *

## Índices pensados

## Migraciones pequeñas

## Transacciones explícitas

## Nombres tablas

```text id="n4m9tv"
snake_case plural
```

Ejemplo:

```text id="p8q1ls"
batch_items
print_jobs
audit_logs
```

---

# Frontend TypeScript Standards

## Tipado estricto

```text id="x5r7mx"
no any
```

## Componentes pequeños

## Hooks para lógica reusable

## UI separada de fetch

---

# React / Next.js Reglas

## Malo

Fetch directo en cualquier componente profundo.

## Bueno

```text id="u2m6pk"
page
→ hook
→ service
```

---

# Naming Convention

## Python

```text id="g1q9ra"
snake_case
PascalCase clases
UPPER_CASE constantes
```

## TypeScript

```text id="v7m3tw"
camelCase variables
PascalCase componentes
UPPER_CASE enums constantes
```

---

# Git Standards

## Branches

```text id="k4n8ls"
feature/*
fix/*
refactor/*
hotfix/*
```

## Commits

```text id="s9q2pk"
feat:
fix:
refactor:
docs:
test:
chore:
```

Ejemplo:

```text id="e6m1ra"
feat: add print queue retry flow
```

---

# Testing Standards

## Prioridad

```text id="d3q7tv"
services críticos
pricing logic
locks
printing flow
```

## Nombres

```text id="r5q1mx"
test_assign_user_to_batch()
test_should_fail_when_printer_offline()
```

---

# Logging Standards

## Nunca print() en producción

Usar logs estructurados:

```text id="z8m4pk"
level
module
message
context
trace_id
```

---

# Seguridad en Código

## Nunca hardcodear:

```text id="m4q6ta"
passwords
tokens
secret keys
DB urls
```

## Validar input siempre.

---

# Code Review Checklist

```text id="c7m9pk"
¿se entiende?
¿rompe algo?
¿tiene tests?
¿nombres claros?
¿seguridad ok?
¿duplicó lógica?
```

---

# Qué NO Hacer

```text id="h2r8mx"
helpers.py gigante
funciones 300 líneas
clases inútiles
copiar stackoverflow sin entender
silenciar errores
```

---

# Herramientas Recomendadas

## Python

Ruff
Black
Pytest

## Frontend

ESLint
Prettier

---

# Regla Personal Para Ti

Antes de cerrar archivo pregúntate:

```text id="q5m1tv"
si vuelvo en 3 meses, ¿lo entenderé rápido?
```

---

# Veredicto Técnico

La velocidad sin estándares crea deuda.
Los estándares sin entrega crean burocracia.
Necesitas equilibrio.

---

# Estado

Documento oficial : LABEL_CODING_STANDARDS_V1.md

```
```
