````md id="x9m4qv"
# LABEL_TECH_STACK_DECISION_V1.md

## Estado

Documento oficial : LABEL_TECH_STACK_DECISION_V1.md

Decisión técnica oficial del stack recomendado para construir el MVP del sistema de etiquetado con velocidad, mantenibilidad y escalabilidad.

---

# Objetivo

Elegir tecnologías correctas para ejecutar rápido sin hipotecar el futuro.

```text
rápido desarrollo
fácil mantenimiento
buen rendimiento
coste razonable
contratable luego
````

---

# Principio Rector

```text id="m7q2ta"
Tecnología al servicio del negocio.
No al ego técnico.
```

---

# Veredicto Directo

Para tu contexto actual, el stack ganador MVP es:

```text id="p4n8dw"
Frontend Web: Next.js
Backend API: FastAPI
Database: PostgreSQL
Cache/Queue: Redis
Hosting Frontend: Vercel
Hosting Backend: Railway o Render
Storage: Cloudflare R2
Auth: JWT + Refresh
ORM: SQLAlchemy
```

---

# ¿Por qué este Stack?

# Frontend — Vercel Inc. / Next.js

## Ventajas

```text id="x1r6pk"
rápido para dashboards
SSR/CSR flexible
UI moderna
gran ecosistema
deploy simple
```

## Malo para ti si:

```text id="u8m2ra"
no quieres aprender React
```

Pero vale la pena.

---

# Backend — FastAPI

## Ventajas

```text id="k5q9tv"
rápido desarrollar
tipado claro
docs Swagger automáticas
excelente con Python
fácil integraciones IA futuras
```

## Mejor que Node para ti hoy porque:

```text id="j3m1ls"
aprendizaje práctico alto
menos fricción backend inicial
```

---

# Database — PostgreSQL

## Obligatorio casi.

```text id="r6q4mx"
relaciones fuertes
transacciones
índices
JSONB
maduro
```

No uses NoSQL para esto como base principal.

---

# Queue / Locks — Redis

Para:

```text id="w2n7pk"
locks multiusuario
colas impresión
cache dashboard
rate limits
```

---

# Storage — Cloudflare Inc. R2

Guardar:

```text id="f9m3ra"
exports pdf
assets templates
logs pesados
backups secundarios
```

Más económico que S3 en muchos casos.

---

# Auth

## MVP

```text id="t1q8dw"
JWT access token
refresh token
bcrypt/argon2 passwords
```

---

# ORM

## Python

SQLAlchemy + Alembic.

Porque:

```text id="h7r2pk"
serio
flexible
profesional
```

---

# UI Library

## Recomendación

Tailwind CSS + shadcn/ui

```text id="n4m9tv"
rápido
bonito
productivo
```

---

# Qué NO Recomiendo Para Ti Ahora

## 1. Kubernetes

Sobreingeniería.

## 2. MongoDB como principal

Mal fit para relaciones operativas.

## 3. Microservices Architecture temprana

Error común.

## 4. WordPress para core interno

No.

---

# Estructura Proyecto Recomendada

```text id="p8q1ls"
apps/
  web
  api

packages/
  shared-types
  ui

infra/
docs/
```

---

# Roadmap Evolutivo

## MVP

```text id="x5r7mx"
monolito modular
```

## Growth

```text id="u2m6pk"
workers async
analytics db
servicios separados selectivos
```

---

# Si Quieres Android Después

Muy compatible con tu experiencia:

Jetpack Compose app operativa conectada a API.

---

# Coste Inicial Aproximado

```text id="g1q9ra"
muy razonable
mucho free tier al inicio
```

---

# Riesgos a Evitar

```text id="v7m3tw"
cambiar stack cada semana
usar 10 frameworks
copiar modas de internet
ignorar fundamentos SQL
```

---

# Recomendación Brutalmente Honesta

Si empiezas hoy:

```text id="k4n8ls"
FastAPI + PostgreSQL + Next.js
```

es mejor decisión que perder 2 meses comparando stacks.

---

# Siguiente Documento Recomendado

```text id="s9q2pk"
LABEL_FOLDER_STRUCTURE_V1.md
```

---

# Estado

Documento oficial : LABEL_TECH_STACK_DECISION_V1.md

```
```
