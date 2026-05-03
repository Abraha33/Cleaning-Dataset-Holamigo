````md id="s8m3qv"
# LABEL_API_SPEC_V1.md

## Estado

Documento oficial : LABEL_API_SPEC_V1.md

Especificación oficial API MVP para web admin, operación multiusuario, impresión e integraciones futuras.

---

# Objetivo

Exponer endpoints claros, seguros y versionables para todo el ecosistema de etiquetado.

```text
auth
productos
lotes
items
plantillas
impresión
dashboard
auditoría
````

---

# Principio Rector

```text id="n4q7ta"
API basada en dominios de negocio, no en pantallas.
```

---

# Convención General

## Base URL

```text id="p1m8dw"
/api/v1
```

## Formato

```text id="x6r2pk"
JSON
```

## Auth

```text id="k3m9ra"
Bearer JWT
```

## Fechas

```text id="u7q1tv"
ISO-8601 UTC
```

---

# Respuesta Estándar

## Success

```json id="e5m4ls"
{
  "success": true,
  "data": {},
  "message": null
}
```

## Error

```json id="r2q8mx"
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "field required"
  }
}
```

---

# AUTH

## POST /auth/login

```json id="t9n3pk"
{
  "email": "admin@empresa.com",
  "password": "****"
}
```

## POST /auth/logout

## GET /auth/me

---

# PRODUCTS

## GET /products

Filtros:

```text id="m1q7dw"
search
category
status
page
limit
```

## GET /products/{id}

Detalle completo.

## PATCH /products/{id}

Editar campos permitidos.

## POST /products/import

```text id="v8m2ra"
xlsx
csv
json
```

---

# BATCHES

## GET /batches

Filtros:

```text id="j4q9tw"
status
priority
date
```

## POST /batches

```json id="p6m1ls"
{
  "name": "Lote Mañana",
  "priority": "HIGH"
}
```

## GET /batches/{id}

## PATCH /batches/{id}

## POST /batches/{id}/close

---

# BATCH ITEMS

## GET /batch-items

Filtros:

```text id="h7r3pk"
batch_id
assigned_user_id
status
```

## POST /batches/{id}/items

Agregar productos al lote.

## POST /batch-items/{id}/assign

Asignar usuario.

## POST /batch-items/{id}/lock

Bloqueo edición.

## POST /batch-items/{id}/unlock

## PATCH /batch-items/{id}

Actualizar estado/notas.

## POST /batch-items/{id}/complete

---

# TEMPLATES

## GET /label-templates

## GET /label-templates/{id}

## POST /label-templates

## PATCH /label-templates/{id}

Solo ADMIN autorizado.

---

# PRINTING

## GET /printers

## POST /print-jobs

```json id="x2m8nv"
{
  "batch_item_id": "uuid",
  "template_id": "uuid",
  "printer_id": "uuid",
  "copies": 2
}
```

## GET /print-jobs

Filtros:

```text id="w5q1ra"
status
printer_id
date
```

## POST /print-jobs/{id}/retry

## POST /print-jobs/{id}/cancel

---

# DASHBOARD

## GET /dashboard/summary

```text id="q9m4pk"
items_today
jobs_today
open_batches
active_users
errors_today
```

## GET /dashboard/productivity

## GET /dashboard/printing

## GET /dashboard/quality

---

# USERS

## GET /users

## POST /users

## PATCH /users/{id}

## POST /users/{id}/disable

---

# AUDIT

## GET /audit-logs

Filtros:

```text id="n6r2tw"
entity_type
user_id
date_from
date_to
```

---

# EXPORTS

## POST /exports/google-sheets

Genera resumen diario.

## POST /exports/batch/{id}

Export lote.

---

# FUTURO SYNC CATÁLOGO

## POST /catalog-sync/batch-item/{id}

## GET /catalog-sync/queue

---

# HTTP STATUS

```text id="k8m3ls"
200 OK
201 CREATED
400 BAD REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT FOUND
409 CONFLICT
422 VALIDATION
500 SERVER ERROR
```

---

# Seguridad Obligatoria

## Roles por Endpoint

```text id="t4q7mx"
OPERADOR no crea usuarios
SUPERVISOR no cambia roles admin
QA no edita templates
```

## Rate Limits

Login e impresión.

## Logs

Toda acción crítica auditada.

---

# Buenas Prácticas

## Versionado

```text id="u1m9pk"
/api/v1
```

## Paginación

Listados largos.

## Idempotencia

Reintentos impresión y móvil.

---

# Riesgos a Evitar

```text id="f7q2ra"
endpoint por pantalla
sin versionado
sin auth granular
subir todo por backend pesado
respuestas inconsistentes
```

---

# Veredicto Técnico

Con esta API conectas frontend web, operación y automatización futura sin rehacer backend.

---

# Estado

Documento oficial : LABEL_API_SPEC_V1.md

```
```
