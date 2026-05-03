````md id="x4m8qx"
# LABEL_FIRST_30_COMMITS_PLAN_V1.md

## Estado

Documento oficial : LABEL_FIRST_30_COMMITS_PLAN_V1.md

Plan oficial de los primeros 30 commits para transformar el repositorio vacío en un MVP funcional.

---

# Objetivo

Eliminar improvisación técnica y avanzar con secuencia lógica.

```text
commits pequeños
progreso visible
menos caos
historial limpio
````

---

# Principio Rector

```text id="m2q7ta"
Commit pequeño, claro y reversible.
```

---

# Regla de Oro

Cada commit debe:

```text id="p5n8dw"
compilar
no romper main
tener propósito claro
```

---

# BLOQUE 1 — Bootstrap (Commits 1-6)

---

## Commit #1

```text id="x1r6pk"
chore: initialize repository structure
```

```text id="u8m2ra"
apps/web
apps/api
packages
docs
infra
```

---

## Commit #2

```text id="k5q9tv"
docs: add README and project overview
```

---

## Commit #3

```text id="j3m1ls"
feat: bootstrap Next.js frontend app
```

---

## Commit #4

```text id="r6q4mx"
feat: bootstrap FastAPI backend app
```

---

## Commit #5

```text id="w2n7pk"
chore: add environment templates
```

---

## Commit #6

```text id="f9m3ra"
ci: add basic pipeline lint and build
```

---

# BLOQUE 2 — Database + Auth (Commits 7-12)

---

## Commit #7

```text id="t1q8dw"
feat: add PostgreSQL connection and settings
```

## Commit #8

```text id="h7r2pk"
feat: create roles and users schema
```

## Commit #9

```text id="n4m9tv"
feat: seed default roles
```

## Commit #10

```text id="p8q1ls"
feat: implement password hashing utilities
```

## Commit #11

```text id="x5r7mx"
feat: implement JWT login endpoint
```

## Commit #12

```text id="u2m6pk"
feat: create frontend login page with auth flow
```

---

# BLOQUE 3 — Products Core (Commits 13-18)

---

## Commit #13

```text id="g1q9ra"
feat: create products schema and model
```

## Commit #14

```text id="v7m3tw"
feat: implement products list endpoint
```

## Commit #15

```text id="k4n8ls"
feat: implement create and update products endpoints
```

## Commit #16

```text id="s9q2pk"
feat: add products table UI
```

## Commit #17

```text id="e6m1ra"
feat: add search and filters for products
```

## Commit #18

```text id="r3q7tv"
test: add products module tests
```

---

# BLOQUE 4 — Batches Workflow (Commits 19-24)

---

## Commit #19

```text id="d5m8pk"
feat: create batches and batch_items schema
```

## Commit #20

```text id="q1m9ra"
feat: implement create batch API
```

## Commit #21

```text id="z7m2pk"
feat: implement assign items to operators
```

## Commit #22

```text id="n1q6tv"
feat: implement item lock mechanism
```

## Commit #23

```text id="m4r8px"
feat: create operator work screen
```

## Commit #24

```text id="c2m7ra"
feat: add batch progress dashboard
```

---

# BLOQUE 5 — Printing MVP (Commits 25-30)

---

## Commit #25

```text id="h9q1tv"
feat: create label templates module
```

## Commit #26

```text id="t7m4pk"
feat: create printers registry
```

## Commit #27

```text id="p3q8ra"
feat: implement print_jobs queue
```

## Commit #28

```text id="v1m6tx"
feat: connect printer agent first version
```

## Commit #29

```text id="b6m2ra"
feat: add print history and retry actions
```

## Commit #30

```text id="y6m4ra"
feat: release MVP internal pilot version
```

---

# Ritmo Recomendado

## Conservador

```text id="f2q8pk"
1 commit bueno diario
```

## Fuerte

```text id="j7m1tv"
2-3 commits diarios
```

---

# Reglas de Calidad

Antes de commit:

```text id="l3m9ra"
tests básicos pasan
lint ok
sin secretos expuestos
mensaje claro
```

---

# Qué NO Hacer

```text id="r8q2pk"
mega commit 500 archivos
commit "fix stuff"
commit código roto
10 commits sin sentido
```

---

# KPI de Avance

```text id="u5m7tv"
30 commits = MVP casi tangible
```

---

# Señal de Buen Historial Git

Puedes leer commits y entender evolución del producto.

---

# Veredicto Técnico

Los primeros 30 commits definen la cultura técnica del proyecto.

---

# Próximo Documento Recomendado

```text id="w1q3ra"
LABEL_SOLO_FOUNDER_EXECUTION_SYSTEM_V1.md
```

---

# Estado

Documento oficial : LABEL_FIRST_30_COMMITS_PLAN_V1.md

```
```
