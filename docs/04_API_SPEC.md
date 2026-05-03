# API Specification — Product Data Platform

**Base URL (local):** `http://localhost:{PORT}` — `PORT` por defecto `3000` (`apps/api/src/main.ts`).  
**Prefijo global:** ninguno (`setGlobalPrefix` no configurado).

## Módulos API

| Módulo | Archivo base | Responsabilidad |
|--------|--------------|-----------------|
| **App** | `app.module.ts`, `app.controller.ts` | Salud / placeholder raíz. |
| **Products** | `products.module.ts`, `products.controller.ts`, `products.service.ts` | CRUD de productos vía Prisma. |

## Endpoints REST (implementados)

| Método | Ruta | Comportamiento |
|--------|------|----------------|
| `GET` | `/` | Texto `Hello World!` (AppService). |
| `POST` | `/products` | Crea producto; cuerpo pasado a Prisma `create` (sin validación declarada). |
| `GET` | `/products` | Lista productos con `brand` y `category` incluidos. |
| `GET` | `/products/:id` | Detalle por `id` numérico; mismo include. |
| `PATCH` | `/products/:id` | Actualización parcial vía Prisma `update`. |
| `DELETE` | `/products/:id` | Eliminación por id. |

### Cuerpo de ejemplo (contrato implícito vía Prisma)

Creación mínima coherente con el schema (ajustar IDs a datos existentes):

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

`price` se persiste como `Decimal`; enviar string numérico es práctica habitual con Prisma/JSON.

## Auth flow

**Estado actual:** no hay autenticación ni autorización en los controladores documentados.

**Dirección alineada al repo:** `.env.example` define `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_KEY` para uso futuro (storage / identidad). El flujo objetivo típico sería:

1. Cliente obtiene token (emisión no implementada en esta API).
2. Request con `Authorization: Bearer <token>`.
3. Guard global valida firma y opcionalmente roles.

Documentar el contrato concreto cuando el primer módulo de auth exista en código.

## Errores estándar

**Estado actual:** respuestas Nest por defecto (p. ej. 404 si registro inexistente en `findUnique`, 500 en fallos no manejados). No hay filtro global de excepciones ni catálogo de códigos de negocio en el repositorio.

**Recomendación para siguiente iteración:**

| HTTP | Uso |
|------|-----|
| `400` | Validación de entrada (DTO). |
| `401` / `403` | AuthN / AuthZ. |
| `404` | Recurso no encontrado. |
| `409` | Conflicto (`sku` o unicidades violadas). |
| `422` | Reglas de dominio (opcional vs 400). |

Cuerpo JSON mínimo sugerido: `{ "statusCode", "message", "error" }` alineado a `HttpException` de Nest.

## Versionado

**Estado actual:** sin versión en path (`/v1/...`) ni header obligatorio.

**Recomendación:** introducir `/v1` cuando haya breaking changes o clientes externos; mantener changelog de API en este archivo o en OpenAPI generado.

## OpenAPI / Swagger

No configurado en `main.ts`. Acción backlog: `@nestjs/swagger` + metadatos en controladores.

---

*Tests e2e existentes cubren solo `GET /` (`apps/api/test/app.e2e-spec.ts`).*
