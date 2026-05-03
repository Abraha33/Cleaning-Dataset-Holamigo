````md id="p4m9qx"
# LABEL_GITHUB_ISSUES_SEED_V1.md

## Estado

Documento oficial : LABEL_GITHUB_ISSUES_SEED_V1.md

Seed inicial de issues para cargar el repositorio y comenzar ejecución inmediata del sistema de etiquetado.

---

# Objetivo

Traducir la arquitectura en trabajo gestionable dentro de :contentReference[oaicite:0]{index=0}.

```text
backlog real
prioridades claras
avance visible
sin improvisación
````

---

# Principio Rector

```text id="m2q7ta"
Si una idea no está en issue, no existe operativamente.
```

---

# Formato Recomendado por Issue

```text id="p5n8dw"
Título
Objetivo
Criterios de aceptación
Prioridad
Etiquetas
Milestone
Estimación
```

---

# MILESTONE 1 — Week 1 Foundation

---

## ISSUE #1

```text id="x1r6pk"
Initialize monorepo structure
```

### Objetivo

Crear estructura base:

```text id="u8m2ra"
apps/web
apps/api
packages
docs
infra
scripts
```

### Labels

```text id="k5q9tv"
feature
devops
priority-high
```

---

## ISSUE #2

```text id="j3m1ls"
Setup FastAPI backend starter
```

### Criterios

```text id="r6q4mx"
health endpoint
env config
run local
```

### Labels

```text id="w2n7pk"
backend
priority-high
```

---

## ISSUE #3

```text id="f9m3ra"
Setup Next.js frontend starter
```

### Criterios

```text id="t1q8dw"
login page
dashboard page
tailwind ready
```

### Labels

```text id="h7r2pk"
frontend
priority-high
```

---

## ISSUE #4

```text id="n4m9tv"
Provision PostgreSQL development database
```

### Labels

```text id="p8q1ls"
database
priority-high
```

---

## ISSUE #5

```text id="x5r7mx"
Create CI pipeline basic
```

### Criterios

```text id="u2m6pk"
lint
test
build
```

---

# MILESTONE 2 — Auth + Products

---

## ISSUE #6

```text id="g1q9ra"
Create roles and users tables
```

## ISSUE #7

```text id="v7m3tw"
Implement JWT login endpoint
```

## ISSUE #8

```text id="k4n8ls"
Create frontend login flow
```

## ISSUE #9

```text id="s9q2pk"
Create products table and model
```

## ISSUE #10

```text id="e6m1ra"
Build products CRUD API
```

## ISSUE #11

```text id="r3q7tv"
Build products table UI
```

---

# MILESTONE 3 — Batches Workflow

---

## ISSUE #12

```text id="d5m8pk"
Create batches schema
```

## ISSUE #13

```text id="q1m9ra"
Create batch_items schema
```

## ISSUE #14

```text id="z7m2pk"
Build create batch API
```

## ISSUE #15

```text id="n1q6tv"
Build assign items to operator
```

## ISSUE #16

```text id="m4r8px"
Implement item lock system
```

## ISSUE #17

```text id="c2m7ra"
Create operator work screen
```

---

# MILESTONE 4 — Printing

---

## ISSUE #18

```text id="h9q1tv"
Create label_templates module
```

## ISSUE #19

```text id="t7m4pk"
Create printers registry
```

## ISSUE #20

```text id="p3q8ra"
Create print_jobs queue
```

## ISSUE #21

```text id="v1m6tx"
Build print history UI
```

## ISSUE #22

```text id="b6m2ra"
Implement retry failed print jobs
```

---

# MILESTONE 5 — Dashboard + Go Live

---

## ISSUE #23

```text id="y6m4ra"
Create dashboard summary API
```

## ISSUE #24

```text id="f2q8pk"
Build supervisor dashboard UI
```

## ISSUE #25

```text id="j7m1tv"
Setup logs and audit trail
```

## ISSUE #26

```text id="l3m9ra"
Deploy staging environment
```

## ISSUE #27

```text id="r8q2pk"
Run pilot with real users
```

---

# Optional Nice-to-Have Later

## ISSUE #28

```text id="u5m7tv"
Google Sheets reporting export
```

## ISSUE #29

```text id="w1q3ra"
Barcode scanner integration
```

## ISSUE #30

```text id="k9m6pk"
Advanced analytics module
```

---

# Priorización Real

## P0

```text id="n6q4tv"
1-27 core issues
```

## P1

```text id="e4m8ra"
28-30 later
```

---

# Si Trabajas Solo

No abras 30 a la vez.

Usa:

```text id="q7m2pk"
Backlog
Ready
Doing
Done
```

---

# Regla de Ejecución

Termina issue pequeño > empezar 5 medianos.

---

# KPI Backlog Saludable

```text id="s1m5tv"
issues claras
sin tareas ambiguas
prioridad visible
avance semanal
```

---

# Veredicto Técnico

Ya tienes backlog suficiente para empezar varios meses sin inventar nada más.

---

# Próximo Documento Recomendado

```text id="z3q9ra"
LABEL_FIRST_30_COMMITS_PLAN_V1.md
```

---

# Estado

Documento oficial : LABEL_GITHUB_ISSUES_SEED_V1.md

```
```
