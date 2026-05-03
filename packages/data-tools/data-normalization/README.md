# Normalización de catálogo (asistida por humano)

Este directorio concentra el trabajo de normalización **sin aplicar cambios automáticos a datos de producto**. Toda fila nueva en los maestros y puentes debe tratarse como candidata hasta revisión explícita.

## Referencia oficial de categorías

El árbol y códigos oficiales de categoría viven en **`Categories_Tienda_Linea.xlsx`** (raíz del repositorio o ruta acordada por el equipo). Cualquier puente desde texto de origen hacia categoría debe validarse contra ese archivo; no sustituirlo por listas auxiliares sin decisión documentada.

## Propósito de cada archivo

### `masters/`

| Archivo | Propósito |
|--------|-----------|
| `brand_master.csv` | Marcas canónicas aprobadas para el catálogo (una fila por marca definitiva). |
| `brand_alias.csv` | Variantes de nombre que resuelven a un `brand_id` del maestro (alias aprobados). |
| `normalization_dict.csv` | Reglas de normalización por campo (p. ej. color, material, texto libre) con valor origen y valor normalizado acordado. |
| `category_bridge_candidates.csv` | Candidatos de mapeo desde categoría de origen (texto/ruta) hacia código y nombre oficiales del Excel de tienda. |
| `unit_master_candidates.csv` | Candidatos de unidad/presentación desde fuentes (texto parseado, factor de conversión solo si hay regla explícita aprobada). |

### `review/`

| Archivo | Propósito |
|--------|-----------|
| `ambiguous_brands.csv` | Casos donde hay duda entre marcas o no hay match seguro; obligatorio documentar `reason` y dejar pendiente hasta decisión humana. |
| `ambiguous_categories.csv` | Categorías de origen con más de una interpretación posible o sin match exacto al árbol oficial. |
| `ambiguous_units.csv` | Textos de unidad/presentación ambiguos o factores no confirmados. |

## Flujo: propuesto → aprobado → aplicado

1. **Propuesto**  
   Se cargan candidatos (scripts, importaciones o edición manual) con `status = propuesto`. No deben usarse para publicar ni para sobrescribir datos definitivos.

2. **Aprobado**  
   Tras revisión humana, solo si hay **match exacto**, **alias ya aprobado** en `brand_alias.csv` / `normalization_dict.csv`, o **regla explícita** documentada, se cambia el `status` a aprobado en el maestro correspondiente. No aprobar mappings ambiguos “a ojo” sin dejar constancia en `review_notes` o en los CSV de `review/`.

3. **Aplicado**  
   Los cambios aprobados se aplican en los sistemas o tablas de destino en un paso separado (ETL, importación, etc.). **No modificar `product_master` hasta que los maestros y puentes estén aprobados** y el equipo defina el job de aplicación.

## Reglas operativas

- No inventar marcas, categorías, unidades ni factores de conversión.
- No aplicar automáticamente equivalencias dudosas.
- Si hay duda: dejar en `review/` con `reason` claro y mantener `status` en propuesto o pendiente según convención del equipo.

## Fuentes típicas (contexto)

`brands.xlsx`, `brands.json`, `marcas_oraculo.json`, `ecoplast_data.json`, `colors.json`, `material.json`, `unities.json` — solo como entrada para generar **candidatos** y conteos; la verdad operativa de categorías oficiales sigue siendo `Categories_Tienda_Linea.xlsx`.
