````md id="1vpf73"
# 04_PRODUCT_MASTER_SCHEMA.md

## Objetivo

Definir la estructura oficial del producto maestro.

Este modelo será la única fuente de verdad para exportaciones, etiquetado y futuras integraciones.

---

# Principio Arquitectónico

```text
Producto Maestro ≠ Archivo Excel ≠ Publicación eCommerce
````

El producto maestro vive en la base de datos y genera salidas.

---

# Entidad Principal: Product

## Tabla: products

Campos base:

* id
* raw_name
* internal_code
* status
* created_at
* updated_at
* created_by
* approved_by
* approved_at

---

# Estados del Producto

```text
RAW_PENDING
IN_LABELING
PENDING_REVIEW
APPROVED
REJECTED
EXPORTED
UPDATED_REEXPORT_REQUIRED
ARCHIVED
```

---

# Atributos Atómicos

## Tabla: product_attributes

Cada atributo representa una sola verdad.

Campos:

* id
* product_id
* attribute_code
* value_text
* value_number
* dictionary_id
* unit_code
* created_at
* updated_at

---

# Atributos Iniciales MVP

## Identidad

* tipo_producto
* categoria
* subcategoria
* marca

## Material / Apariencia

* material
* color
* forma

## Medidas

* alto
* ancho
* largo
* diametro
* capacidad
* peso

## Comercial

* unidad_base
* presentacion
* pack_qty

## Precio / Inventario

* costo
* precio
* inventario

---

# Campos Derivados

## Tabla: product_generated_fields

Campos:

* product_id
* short_name
* long_name
* short_description
* long_description
* slug
* search_keywords
* ecommerce_category_path

Estos campos se regeneran cuando cambian atributos relevantes.

---

# Tabla de Medios (Futuro Cercano)

## product_media

* id
* product_id
* file_url
* sort_order
* active

---

# Tabla de Auditoría

## product_change_log

* id
* product_id
* user_id
* field_name
* old_value
* new_value
* action_type
* created_at

---

# Relaciones

```text
1 product
→ N attributes
→ 1 generated_fields
→ N change_logs
→ N media (futuro)
```

---

# Reglas Obligatorias MVP

1. Todo producto debe tener estado.
2. Todo producto aprobado debe tener categoría.
3. Todo producto aprobado debe tener nombre generado.
4. Todo producto aprobado debe tener código interno.
5. No borrar productos; archivar.

---

# Reglas de Calidad

## Evitar texto libre excesivo

Preferir diccionarios para:

* marca
* color
* material
* categoría

## Valores numéricos limpios

Ejemplo:

* capacidad = 12
* unidad = OZ

No guardar:

```text
12 onz aprox
```

---

# Ejemplo Simplificado

## Producto aprobado

```json
{
  "raw_name": "vaso cristal 12 oz x50",
  "categoria": "VASOS",
  "material": "PET",
  "color": "TRANSPARENTE",
  "capacidad": 12,
  "unidad_capacidad": "OZ",
  "pack_qty": 50,
  "short_name": "Vaso PET Transparente 12 oz x50"
}
```

---

# Reglas de Evolución

Nuevos atributos se agregan sin romper productos antiguos.

---

# Riesgos a Evitar

* meter todo en una sola tabla plana
* duplicar nombres manualmente
* editar exportaciones como origen
* usar campos ambiguos

---

# Estado

Documento oficial del esquema maestro de producto.

```
```
