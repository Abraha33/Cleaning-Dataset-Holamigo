````md id="c6m8qx"
# LABEL_FOLDER_STRUCTURE_V1.md

## Estado

Documento oficial : LABEL_FOLDER_STRUCTURE_V1.md

Estructura oficial de carpetas y organización del repositorio para construir el sistema de etiquetado de forma escalable y mantenible.

---

# Objetivo

Evitar repositorios caóticos, código duplicado y crecimiento desordenado.

```text
orden técnico
escalabilidad
mantenimiento fácil
trabajo profesional
````

---

# Principio Rector

```text id="m2q7ta"
La estructura debe reflejar el negocio, no el framework.
```

---

# Estrategia Recomendada

## Monorepo modular

Ideal para tu etapa.

```text id="p5n8dw"
un repositorio
múltiples apps
paquetes compartidos
deploy separado
```

---

# Estructura Oficial MVP

```text id="x1r6pk"
label-system/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared-types/
│   ├── ui/
│   ├── config/
│   └── utils/
│
├── infra/
│
├── docs/
│
├── scripts/
│
├── .env.example
├── package.json
├── README.md
└── docker-compose.yml
```

---

# /apps

# apps/web

Frontend supervisor/admin.

Stack:

Next.js

```text id="u8m2ra"
dashboard
usuarios
lotes
templates
analytics
```

---

# apps/api

Backend principal.

Stack:

FastAPI

```text id="k5q9tv"
REST API
auth
business logic
print queue
jobs
```

---

# Estructura apps/web

```text id="j3m1ls"
web/
├── app/
├── components/
├── features/
├── services/
├── hooks/
├── lib/
├── styles/
└── tests/
```

---

# Estructura apps/api

```text id="r6q4mx"
api/
├── app/
│   ├── modules/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   ├── api/
│   └── workers/
│
├── tests/
├── alembic/
└── requirements.txt
```

---

# /modules (Backend)

Organizado por dominio.

```text id="w2n7pk"
modules/
├── auth/
├── users/
├── products/
├── batches/
├── labels/
├── printing/
├── qa/
├── analytics/
├── audit/
└── sync/
```

Esto es correcto.

---

# /packages

Código compartido.

## shared-types

```text id="f9m3ra"
DTOs
schemas TS
constants
enums
```

## ui

Componentes reutilizables.

## config

Lint, prettier, tsconfig, env validators.

## utils

Helpers comunes.

---

# /infra

Infraestructura como código y despliegue.

```text id="t1q8dw"
docker/
nginx/
terraform futuro/
deploy notes/
```

---

# /docs

Tus documentos estratégicos.

```text id="h7r2pk"
architecture/
db/
api/
roadmap/
operations/
```

Muy importante mantenerlos vivos.

---

# /scripts

Automatizaciones útiles.

```text id="n4m9tv"
seed_data.py
import_products.py
backup.sh
deploy.sh
```

---

# Naming Convention

## Carpetas

```text id="p8q1ls"
kebab-case
```

## Python módulos

```text id="x5r7mx"
snake_case
```

## React components

```text id="u2m6pk"
PascalCase
```

## Variables

```text id="g1q9ra"
camelCase (JS)
snake_case (Python)
```

---

# Archivos Críticos Root

## README.md

Cómo correr proyecto.

## .env.example

Variables documentadas.

## docker-compose.yml

Dev local.

## .gitignore

Serio y limpio.

---

# Qué NO Hacer

```text id="v7m3tw"
todo en /src
helpers infinitos
components mezclados con negocio
scripts tirados root
sin separación frontend/backend
```

---

# Escalabilidad Futura

Cuando crezca:

```text id="k4n8ls"
apps/mobile/
apps/worker/
packages/sdk/
packages/design-system/
```

---

# Recomendación Git

## Branches

```text id="s9q2pk"
main
develop
feature/*
hotfix/*
```

## Commits

```text id="e6m1ra"
feat:
fix:
refactor:
docs:
```

---

# Veredicto Técnico

Una buena arquitectura de carpetas evita meses de refactor futuro.

---

# Próximo Documento Recomendado

```text id="d3q7tv"
LABEL_BACKEND_STRUCTURE_FASTAPI_V1.md
```

---

# Estado

Documento oficial : LABEL_FOLDER_STRUCTURE_V1.md

```
```
