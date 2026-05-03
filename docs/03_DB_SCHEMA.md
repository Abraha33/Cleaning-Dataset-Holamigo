# Database Schema — Product Data Platform

## Estado implementado (Prisma)

Fuente de verdad: `apps/api/prisma/schema.prisma`.

### Entidades persistidas

| Modelo | Campos relevantes | Notas |
|--------|-------------------|--------|
| **Brand** | `id`, `name` (@unique) | Catálogo de marcas. |
| **Category** | `id`, `name`, `slug` (@unique) | Árbol plano en MVP (sin `parentId`). |
| **Product** | `id`, `sku` (@unique), `name`, `brandId`, `categoryId`, `price` (Decimal), `attributes` (Json?), `createdAt`, `updatedAt` | FKs a Brand y Category. |

### Relaciones (implementadas)

```
Brand 1 --- * Product
Category 1 --- * Product
```

- `Product.brandId` → `Brand.id` (obligatorio).
- `Product.categoryId` → `Category.id` (obligatorio).

### Índices y unicidad (actuales + recomendados)

| Artefacto | Estado |
|-----------|--------|
| `Brand.name` | Único (índice implícito). |
| `Category.slug` | Único. |
| `Product.sku` | Único. |
| Búsqueda por marca / categoría | Recomendado: índice compuesto o individuales `(brandId)`, `(categoryId)` si las consultas `findMany` con filtro crecen en volumen. |
| `Product.name` | Opcional según UX de búsqueda (trigram/GIN en PostgreSQL solo si hay requisito de texto completo). |

## Modelo objetivo (no persistido aún en este repo)

Las siguientes entidades aparecen en la hoja de ruta de producto; **no existen como tablas Prisma en el commit actual**. Sirven para alinear diseño futuro sin confundirlas con el MVP.

| Entidad | Rol previsto |
|---------|----------------|
| **users** | Cuentas operadoras del PIM / API keys asociadas. |
| **roles** | Conjuntos de permisos (RBAC). |
| **variants** | SKUs hijos (talla, color, empaque) ligados a un producto padre. |
| **attributes** | Definiciones tipadas de atributo (vs. JSON libre en `Product.attributes`). |
| **media_assets** | URLs, hashes, variantes de imagen, política de CDN/storage. |
| **audit_logs** | Quién cambió qué y cuándo (compliance y depuración). |

### Relaciones objetivo (alto nivel)

- `users` * — * `roles` (tabla puente típica `user_roles`).
- `products` 1 — * `variants`.
- `products` * — * `media_assets` (tabla puente o FK según diseño).
- `audit_logs` → referencia polimórfica o por `entity_type` + `entity_id` (decisión pendiente en ADR futuro).

## Extensiones futuras (esquema)

1. **Jerarquía de categorías:** `Category.parentId` auto-referencia + índice en `parentId`.
2. **EAV o JSON schema:** migrar de `Json?` a tablas de valores cuando haya requisitos de reporting fuertes.
3. **Soft delete:** `deletedAt` en entidades publicables si sync con canales lo exige.
4. **Multi-tenant:** `organizationId` en tablas de negocio si el producto es SaaS.

---

*Para convenciones de normalización fuera de DB, ver `packages/data-tools/data-normalization/README.md`.*
