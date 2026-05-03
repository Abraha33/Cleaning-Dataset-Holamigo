````md id="f3m9qv"
# LABEL_BACKEND_STRUCTURE_FASTAPI_V1.md

## Estado

Documento oficial : LABEL_BACKEND_STRUCTURE_FASTAPI_V1.md

Estructura oficial del backend usando :contentReference[oaicite:0]{index=0} para el sistema de etiquetado multiusuario.

---

# Objetivo

Construir un backend limpio, modular y profesional que soporte crecimiento sin volverse inmantenible.

```text
código claro
módulos aislados
testing simple
escalabilidad real
````

---

# Principio Rector

```text id="m7q2ta"
Arquitectura por dominio, no por archivos técnicos.
```

---

# Estructura Recomendada

```text id="p4n8dw"
apps/api/
├── app/
│   ├── main.py
│   ├── core/
│   ├── modules/
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   ├── api/
│   ├── workers/
│   └── utils/
│
├── tests/
├── alembic/
├── requirements.txt
└── .env
```

---

# main.py

Punto de entrada.

Responsable de:

```text id="x1r6pk"
crear app
middlewares
routers
startup events
healthcheck
```

---

# /core

Configuración transversal.

```text id="u8m2ra"
config.py
database.py
security.py
logging.py
exceptions.py
dependencies.py
```

## Ejemplo

```text id="k5q9tv"
settings cargadas por env
session db
JWT helpers
```

---

# /modules

Cada módulo de negocio aislado.

```text id="j3m1ls"
auth/
users/
products/
batches/
labels/
printing/
qa/
analytics/
audit/
sync/
```

---

# Estructura Interna de un Módulo

Ejemplo products/

```text id="r6q4mx"
products/
├── router.py
├── service.py
├── repository.py
├── schemas.py
├── validators.py
└── events.py
```

---

# Responsabilidades

## router.py

Endpoints HTTP.

## service.py

Reglas de negocio.

## repository.py

Acceso DB.

## schemas.py

Pydantic DTOs.

## validators.py

Validaciones específicas.

## events.py

Eventos dominio.

---

# /models

Modelos ORM globales.

```text id="w2n7pk"
user.py
product.py
batch.py
print_job.py
```

Si prefieres por módulo también es válido.

---

# /schemas

Schemas compartidos.

```text id="f9m3ra"
pagination.py
common_responses.py
enums.py
```

---

# /repositories

Base repositories reutilizables.

```text id="t1q8dw"
base.py
pagination.py
filters.py
```

---

# /services

Servicios cross-module.

```text id="h7r2pk"
email_service.py
storage_service.py
export_service.py
printer_gateway.py
```

---

# /api

Router central.

```text id="n4m9tv"
router.py
v1.py
deps.py
```

---

# /workers

Procesos async / background.

```text id="p8q1ls"
print_worker.py
report_worker.py
sync_worker.py
cleanup_worker.py
```

---

# Flujo Correcto Request

```text id="x5r7mx"
HTTP Request
→ router
→ service
→ repository
→ DB
→ response schema
```

No router directo a DB.

---

# Dependency Injection

Usar Depends de FastAPI para:

```text id="u2m6pk"
db session
current user
permissions
pagination params
```

---

# Seguridad

## core/security.py

```text id="g1q9ra"
JWT create/verify
password hash
role checks
```

---

# Configuración

## core/config.py

Usar:

Pydantic Settings.

```text id="v7m3tw"
DATABASE_URL
SECRET_KEY
REDIS_URL
ENV
```

---

# Testing

```text id="k4n8ls"
tests/unit/
tests/integration/
tests/e2e/
```

Prioridad:

```text id="s9q2pk"
services primero
API crítica segundo
```

---

# Migraciones

Usar Alembic

```text id="e6m1ra"
alembic revision --autogenerate
alembic upgrade head
```

---

# Buenas Prácticas

## Tipado estricto

## Docstrings cortos útiles

## Logs estructurados

## Transacciones explícitas

## Exceptions custom

---

# Qué NO Hacer

```text id="d3q7tv"
todo en main.py
routers con lógica pesada
SQL inline en endpoints
helpers.py gigante
sin capas
```

---

# Ejemplo Módulos Prioritarios MVP

```text id="r5q1mx"
auth
products
batches
printing
users
audit
```

---

# Escalabilidad Futura

Separar workers o servicios sin reescribir todo.

---

# Veredicto Técnico

Si estructuras bien FastAPI desde inicio, te ahorras refactor costoso cuando crezca.

---

# Próximo Documento Recomendado

```text id="z8m4pk"
LABEL_FRONTEND_STRUCTURE_NEXTJS_V1.md
```

---

# Estado

Documento oficial : LABEL_BACKEND_STRUCTURE_FASTAPI_V1.md

```
```
