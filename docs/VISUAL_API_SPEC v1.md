````md id="w61npr"
# VISUAL_API_SPEC_V1.md

## Estado

Documento oficial de especificación API MVP para el ecosistema visual.

Define endpoints reales para web admin, app móvil y futuras integraciones.

---

# Objetivo

Exponer servicios claros, seguros y versionables para:

```text
auth
productos
tareas
captura
revisión
reportes
sync futuro
````

---

# Principio Rector

```text id="x2m7qa"
API basada en dominio, no en pantallas.
```

---

# Convención General

## Base URL

```text id="p8r4dw"
 /api/v1
```

## Formato

```text id="j6n2tv"
JSON
```

## Auth

```text id="m4q9ke"
Bearer JWT
```

## Fechas

```text id="h1w7zs"
ISO-8601 UTC
```

---

# Respuesta Estándar

## Success

```json id="a5n3qx"
{
  "success": true,
  "data": {},
  "message": null
}
```

## Error

```json id="t9v6pd"
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "priority required"
  }
}
```

---

# AUTH

## POST /auth/login

```json id="r7m2yk"
{
  "email": "admin@empresa.com",
  "password": "****"
}
```

Response:

```json id="c4q8nx"
{
  "token": "...",
  "user": {
    "id": "uuid",
    "name": "Admin",
    "role": "ADMIN"
  }
}
```

---

## POST /auth/logout

Invalida sesión actual.

---

## GET /auth/me

Devuelve usuario autenticado.

---

# PRODUCTS

## GET /products

Filtros:

```text id="f3n9za"
search
status
category
without_media=true
page
limit
```

---

## GET /products/{id}

Detalle producto + imágenes + tareas.

---

## POST /products/import

Carga catálogo inicial.

```text id="s6m2rv"
xlsx
csv
json
```

---

## PATCH /products/{id}

Editar campos básicos autorizados.

---

# MEDIA TASKS

## GET /media-tasks

Filtros:

```text id="k1q7pt"
status
assigned_user_id
priority
date
```

---

## POST /media-tasks

```json id="v8r3mx"
{
  "product_id": "uuid",
  "priority": "HIGH",
  "assigned_user_id": "uuid"
}
```

---

## PATCH /media-tasks/{id}

Actualizar estado, notas o asignación.

---

## POST /media-tasks/auto-create

Genera tareas para productos sin fotos.

---

## GET /media-tasks/my

Tareas del usuario móvil.

---

# CAPTURE / MEDIA

## POST /media/upload-url

Devuelve URL firmada.

```json id="e5q1zw"
{
  "file_name": "front_001.webp",
  "mime_type": "image/webp"
}
```

Response:

```json id="g9n6xt"
{
  "upload_url": "...",
  "storage_key": "products/x/front_001.webp"
}
```

---

## POST /media/confirm-upload

```json id="j4w8pk"
{
  "product_id": "uuid",
  "media_task_id": "uuid",
  "storage_key": "...",
  "shot_type": "front"
}
```

---

## GET /products/{id}/media

Lista imágenes.

---

## PATCH /media/{id}

```text id="u3r7lm"
is_primary
sort_order
status
```

---

## DELETE /media/{id}

Soft delete / archive.

---

# REVIEW QUEUE

## GET /review-queue

Filtros:

```text id="m8q2df"
status
priority
reviewer_id
```

---

## POST /review-queue/{id}/take

Revisor toma ítem.

---

## POST /review-queue/{id}/approve

```json id="t2n9vk"
{
  "make_primary": true
}
```

---

## POST /review-queue/{id}/retake

```json id="z7m4hp"
{
  "reason": "BLUR",
  "notes": "repetir frontal"
}
```

---

## POST /review-queue/{id}/reject

```json id="p6w1rs"
{
  "reason": "WRONG_PRODUCT"
}
```

---

# DASHBOARD

## GET /dashboard/summary

```text id="x4m6ka"
today_tasks
today_photos
pending_review
backlog
```

---

## GET /dashboard/productivity

Por usuario y fechas.

---

## GET /dashboard/quality

Approval rate, retakes.

---

# MOBILE SUPPORT

## GET /mobile/bootstrap

Carga inicial:

```text id="h7r3dw"
usuario
tareas
config
shot_types
```

---

## POST /mobile/sync-batch

Envía operaciones offline acumuladas.

---

# ADMIN

## GET /users

## POST /users

## PATCH /users/{id}

## GET /roles

---

# FUTURO SYNC CHANNELS

## POST /sync/products/{id}

Forzar sincronización visual.

## GET /sync/jobs

Estado jobs.

---

# HTTP STATUS

```text id="w9n5qx"
200 ok
201 created
400 bad request
401 unauthorized
403 forbidden
404 not found
409 conflict
422 validation
500 server error
```

---

# Seguridad Obligatoria

## Rate Limit

Login y uploads.

## Roles por Endpoint

```text id="d3m8vf"
capturador no crea usuarios
revisor no cambia roles
```

## Logs

Toda acción sensible auditada.

---

# Buenas Prácticas

## Versionado

```text id="q2r6pk"
 /api/v1
```

## Paginación

Listados largos.

## Idempotencia

Para reintentos móviles.

---

# Riesgos a Evitar

* endpoints según pantallas
* subir archivo directo al backend pesado
* no versionar
* sin auth granular
* respuestas inconsistentes

---

# Veredicto Técnico

Con esta API puedes conectar Android, Web Admin y automatizaciones sin rehacer backend.

---

# Estado

Documento oficial VISUAL_API_SPEC v1.

```
```
