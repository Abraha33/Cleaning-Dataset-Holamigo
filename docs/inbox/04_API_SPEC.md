# API Specification — Product Data Platform

**Contrato lógico:** **API v1** (definición de producto y documentación).  
**Implementación en código (hoy):** rutas **sin** prefijo de versión (`/products`, `/`). La migración a prefijo versionado es **planned** — ver [Versioning strategy](#versioning-strategy).

**Base URL (local):** `http://localhost:{PORT}` — `PORT` por defecto `3000` (`apps/api/src/main.ts`).  
**OpenAPI/Swagger:** no configurado (`main.ts`).

---

## 1. API v1 (alcance del contrato)

| Ámbito v1 | Estado en repo |
|-----------|----------------|
| Recurso **Product** (CRUD) | Implementado |
| Recursos **Brand** / **Category** vía REST | No hay controladores dedicados (solo relaciones embebidas en producto) |
| Auth | No implementado |
| Paginación en listados | No implementado |
| Prefijo `/api/v1` | No implementado |

---

## 2. Auth — actual y futuro

### Actual

- Ningún guard, middleware ni módulo de auth en `apps/api/src`.
- Endpoints de producto son **públicos** respecto a identidad: cualquier cliente con conectividad puede invocarlos.

### Futuro (alineado a `.env.example`)

- Variables reservadas: `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_KEY` (uso pendiente de diseño).
- **Planned:** `Authorization: Bearer <access_token>` en rutas mutables; emisión de tokens fuera de alcance hasta exista módulo de usuarios/sesión documentado en código.

---

## 3. Endpoints actuales

Prefijo global Nest: **ninguno** (`setGlobalPrefix` no usado).

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Respuesta texto: `Hello World!` (`AppController`). |
| `POST` | `/products` | Crea `Product`; body tipado como `any` en controlador. |
| `GET` | `/products` | Lista todos los productos con `brand` y `category` incluidos (sin paginación). |
| `GET` | `/products/:id` | Detalle por `id` numérico; mismos includes. |
| `PATCH` | `/products/:id` | Actualización parcial Prisma. |
| `DELETE` | `/products/:id` | Borrado por id. |

**Nota de routing:** en Nest el orden de registro evita que `GET /products/:id` capture la palabra `products` como id; no existe hoy `GET /products/search`.

---

## 4. Endpoints roadmap (v1 / post-v1)

| Prioridad | Método | Ruta (objetivo) | Notas |
|-----------|--------|-----------------|--------|
| Alta | — | Prefijo `/api/v1` + `ValidationPipe` global | Breaking para clientes; coordinar release. |
| Alta | `GET` | `/api/v1/products` con query filters | `brandId`, `categoryId`, `sku` (planned). |
| Alta | `GET` | `/api/v1/products` paginado | Ver estándar abajo (planned). |
| Media | `GET`/`POST`/… | `/api/v1/brands`, `/api/v1/categories` | Hoy solo existen modelos Prisma + seed. |
| Media | `GET` | `/health` o `/api/v1/health` | Liveness para orquestadores (planned). |
| Futuro | * | Media, importaciones, reportes | Sin rutas en el código actual. |

---

## 5. Request / response examples

### 5.1 Crear producto — `POST /products`

**Request (JSON):**

```json
{
  "sku": "SKU-0001",
  "name": "Producto ejemplo",
  "brandId": 1,
  "categoryId": 1,
  "price": "19.99",
  "attributes": { "color": "Rojo" }
}
```

- `brandId` / `categoryId` deben existir en DB (FK).
- `price` se persiste como `Decimal`; string numérico es compatible con Prisma/JSON típico.

**Response `201` (ejemplo ilustrativo):** cuerpo = objeto producto creado; si includes no están en `create`, la forma puede no traer `brand`/`category` anidados hasta un `GET` posterior.

```json
{
  "id": 1,
  "sku": "SKU-0001",
  "name": "Producto ejemplo",
  "brandId": 1,
  "categoryId": 1,
  "price": "19.99",
  "attributes": { "color": "Rojo" },
  "createdAt": "2026-05-03T12:00:00.000Z",
  "updatedAt": "2026-05-03T12:00:00.000Z"
}
```

### 5.2 Listar productos — `GET /products`

**Response `200`:** arreglo de productos con relaciones (comportamiento real de `findMany` + `include`).

```json
[
  {
    "id": 1,
    "sku": "SKU-0001",
    "name": "Producto ejemplo",
    "brandId": 1,
    "categoryId": 1,
    "price": "19.99",
    "attributes": null,
    "createdAt": "2026-05-03T12:00:00.000Z",
    "updatedAt": "2026-05-03T12:00:00.000Z",
    "brand": { "id": 1, "name": "Ecoplast" },
    "category": { "id": 1, "name": "Test", "slug": "test" }
  }
]
```

### 5.3 Detalle — `GET /products/:id`

- **200:** mismo shape que un elemento del listado (con `brand` y `category`).
- **200 con `null`:** hoy `findUnique` puede devolver `null` si no existe (Nest serializa `null`; **planned:** normalizar a `404`).

### 5.4 Actualizar — `PATCH /products/:id`

**Request:** subconjunto de campos persistibles (misma semántica que Prisma `update`).

```json
{ "name": "Nombre actualizado", "price": "21.50" }
```

### 5.5 Eliminar — `DELETE /products/:id`

- **200** con cuerpo del registro eliminado (comportamiento Prisma por defecto) o vacío según evolución — documentar al estabilizar contrato.

---

## 6. Paginación (planned — estándar objetivo v1)

**Estado actual:** `GET /products` devuelve el conjunto completo.

**Estándar recomendado para implementación futura** (equipo pequeño, fácil de consumir):

**Query (offset):**

| Parámetro | Tipo | Default | Max |
|-----------|------|---------|-----|
| `page` | int ≥ 1 | `1` | — |
| `pageSize` | int | `20` | `100` |

**Response envelope:**

```json
{
  "data": [ ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

**Alternativa planned:** paginación por cursor (`cursor`, `limit`) si los listados crecen mucho.

---

## 7. Error response (estándar objetivo + comportamiento actual)

### Actual

- Errores no mapeados: formato típico Nest (`statusCode`, `message`, opcional `error`).
- Errores Prisma (p. ej. registro no encontrado en `update`/`delete`, violación FK): **500** o mensaje crudo si no hay filtro dedicado.

### Estándar objetivo (v1)

Cuerpo JSON mínimo:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    { "field": "sku", "code": "is_not_empty", "message": "sku should not be empty" }
  ]
}
```

- `details`: **planned**; opcional para errores de validación.
- En producción, evitar filtrar stack interno al cliente.

---

## 8. Status codes

| Código | Uso objetivo v1 | Hoy (notas) |
|--------|-----------------|-------------|
| `200` | OK lectura/actualización exitosa | Sí en GET/PATCH/DELETE exitosos |
| `201` | Recurso creado | Nest puede devolver `201` en POST por defecto o `200` según configuración — **explicitar en implementación** |
| `204` | Borrado sin cuerpo | Planned si se adopta |
| `400` | Validación de entrada | Planned (DTO + ValidationPipe) |
| `401` | No autenticado | Planned |
| `403` | No autorizado | Planned |
| `404` | Recurso inexistente | Planned para `findOne` null |
| `409` | Conflicto (p. ej. `sku` duplicado, `P2002`) | Planned (exception filter) |
| `422` | Regla de negocio | Opcional / planned |
| `500` | Error no esperado | Posible hoy ante fallos Prisma no tratados |

---

## 9. Versioning strategy

| Principio | Detalle |
|-----------|---------|
| **Versión documental** | Este archivo describe **API v1** como línea base de producto. |
| **Path versioning (planned)** | Introducir ` /api/v1/...` cuando el equipo decida el primer breaking change o el primer cliente externo estable. |
| **Deprecación** | Mantener rutas legacy sin prefijo solo durante ventana acotada; comunicar en `CHANGELOG` y release notes. |
| **Header opcional (futuro)** | `Accept: application/vnd.pdp.v1+json` solo si se requiere negociación sin cambiar path (no implementado). |
| **Documentación generada** | `@nestjs/swagger` versionado junto al despliegue (planned). |

---

## 10. Referencias en repo

- Controlador: `apps/api/src/products/products.controller.ts`
- Servicio: `apps/api/src/products/products.service.ts`
- Schema: `apps/api/prisma/schema.prisma`
- Tests e2e: `apps/api/test/app.e2e-spec.ts` (solo `GET /`)

---

*Última revisión alineada al estado del monorepo `product-data-platform`.*
