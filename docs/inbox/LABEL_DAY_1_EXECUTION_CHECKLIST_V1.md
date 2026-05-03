````md id="c8m5qx"
# LABEL_DAY_1_EXECUTION_CHECKLIST_V1.md

## Estado

Documento oficial : LABEL_DAY_1_EXECUTION_CHECKLIST_V1.md

Checklist táctico para el Día 1 de ejecución real del sistema de etiquetado.

---

# Objetivo

Salir de planificación y entrar en construcción inmediata con acciones concretas.

```text
repositorio listo
entorno listo
apps corriendo
DB conectada
primer commit serio
````

---

# Principio Rector

```text id="m3q7ta"
Hoy se construye algo visible.
```

---

# Meta del Día 1

Al final del día debes tener:

```text id="p6n8dw"
frontend corriendo
backend corriendo
PostgreSQL conectado
estructura profesional creada
primer push remoto
```

---

# Bloque 1 — Repositorio (30 min)

## Crear proyecto raíz

```bash id="x1r6pk"
mkdir label-system
cd label-system
git init
```

## Crear ramas iniciales

```bash id="u8m2ra"
git checkout -b develop
git checkout -b main
git checkout develop
```

## Crear README

```text id="k5q9tv"
objetivo proyecto
stack
cómo correr local
```

---

# Bloque 2 — Monorepo Base (45 min)

```bash id="j3m1ls"
mkdir apps packages docs infra scripts
mkdir apps/web apps/api
```

Estructura mínima:

```text id="r6q4mx"
label-system/
apps/
packages/
docs/
infra/
scripts/
```

---

# Bloque 3 — Frontend Boot (45 min)

## Dentro apps/

```bash id="w2n7pk"
npx create-next-app@latest web --typescript --tailwind --app
```

## Verificar

```bash id="f9m3ra"
npm run dev
```

Debe abrir localmente.

---

# Bloque 4 — Backend Boot (60 min)

## Dentro apps/api

```bash id="t1q8dw"
python -m venv .venv
```

Linux/macOS:

```bash id="h7r2pk"
source .venv/bin/activate
```

Windows:

```bash id="n4m9tv"
.venv\Scripts\activate
```

Instalar:

```bash id="p8q1ls"
pip install fastapi uvicorn sqlalchemy psycopg[binary] alembic pydantic-settings
```

Crear app mínima:

```python id="x5r7mx"
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
```

Ejecutar:

```bash id="u2m6pk"
uvicorn main:app --reload
```

---

# Bloque 5 — PostgreSQL Real (45 min)

Opciones:

PostgreSQL local
o managed:

Supabase Inc.
Neon Inc.

Crear DB:

```text id="g1q9ra"
labels_dev
```

---

# Bloque 6 — Variables Entorno (20 min)

## apps/api/.env

```env id="v7m3tw"
DATABASE_URL=postgresql+psycopg://user:pass@host:5432/labels_dev
JWT_SECRET=change_me
ENV=dev
```

## apps/web/.env.local

```env id="k4n8ls"
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Bloque 7 — Primer Schema (45 min)

Crear tablas mínimas:

```text id="s9q2pk"
roles
users
products
```

No perfección. Base funcional.

---

# Bloque 8 — Primer Commit Profesional (15 min)

```bash id="e6m1ra"
git add .
git commit -m "feat: initialize monorepo with web api and db setup"
```

Push remoto a GitHub, Inc..

---

# Bloque 9 — Verificación Final Día 1

Checklist:

```text id="r3q7tv"
[ ] frontend abre
[ ] backend responde /health
[ ] db accesible
[ ] repo remoto creado
[ ] estructura ordenada
[ ] commit realizado
```

---

# Si Te Sobra Tiempo

## Hacer una de estas:

```text id="d5m8pk"
login page
products table
alembic init
docker-compose local
```

No cuatro cosas a medias.

---

# Qué NO Hacer Día 1

```text id="q1m9ra"
comparar frameworks
rediseñar arquitectura
ver tutoriales 6 horas
hacer logo
pensar en IA
```

---

# Resultado Psicológico Correcto

Terminar día 1 con:

```text id="z7m2pk"
sistema vivo
```

No solo ideas.

---

# Día 2 Recomendado

```text id="n1q6tv"
auth login real
modelo users
roles seed
```

---

# Veredicto Técnico

Un buen Día 1 elimina semanas de procrastinación.

---

# Próximo Documento Recomendado

```text id="m4r8px"
LABEL_DAY_2_TO_DAY_7_EXECUTION_PLAN_V1.md
```

---

# Estado

Documento oficial : LABEL_DAY_1_EXECUTION_CHECKLIST_V1.md

```
```
