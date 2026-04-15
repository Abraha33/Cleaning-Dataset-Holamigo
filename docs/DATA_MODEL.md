# Modelo Conceptual de Datos — Catálogo Hola Amigo JC

Este documento describe cómo están estructurados los datos, qué representa cada entidad y cómo se relacionan entre sí dentro del pipeline.

---

## Entidades principales

### Producto A (catálogo interno / ERP)

| Campo | Tipo | Descripción |
|---|---|---|
| `Codigo` | string | Identificador único en ERP |
| `Nombre` | string | Nombre comercial del producto |
| `Marca` | string | Marca del producto (normalizada con `brands.json`) |
| `Categoría` | string | Categoría de primer nivel (normalizada con `categorias.json`) |
| `Subcategoría` | string | Subcategoría de segundo nivel |
| `Unidad` | string | Unidad de medida (normalizada con `unities.json`) |
| `Precio` | numeric | Precio de venta |
| `texto_match` | string | Nombre limpio para embeddings (feature derivada) |
| `familia_a` | string | Familia semántica de producto (feature derivada) |

### Producto B (catálogo externo)

| Campo | Tipo | Descripción |
|---|---|---|
| `sku` | string | Identificador único del catálogo externo |
| `name` | string | Nombre del producto (incluye marca entre corchetes: `[Marca]`) |
| `category` | string | Categoría textual jerárquica (ej: "Desechables - De pet - CupCakes") |
| `description` | string | Descripción larga del producto |
| `variants` | list | Lista de variantes con `presentation` y `price` |
| `image_url` | string | URL de imagen del producto |
| `texto_match` | string | Nombre limpio para embeddings (feature derivada) |
| `familia_b` | string | Familia semántica de producto (feature derivada) |

---

## Oráculos de negocio (JSON)

Son los **contratos de negocio** que definen qué valores son válidos para cada atributo. Se usan como referencia en las transformaciones.

| Archivo | Rol |
|---|---|
| `brands.json` | Lista de marcas conocidas y sus variantes ortográficas |
| `marcas_oraculo.json` | Versión extendida con relaciones entre marcas y fabricantes |
| `categorias.json` | Árbol jerárquico de categorías del catálogo (Cxx → Hxx → Nxx) |
| `categorias_oraculo.json` | Versión extendida con sinónimos y reglas de mapeo |
| `material.json` | Materiales válidos (PET, cartón, aluminio, madera, etc.) |
| `unities.json` | Unidades de medida válidas (und, paq, caja, kg, ml, etc.) |
| `colors.json` | Colores válidos para atributos de producto |
| `brands_products.json` | Conocimiento de productos típicos por marca |

---

## Relación entre entidades

```
┌─────────────────┐         ┌─────────────────┐
│   Producto A    │         │   Producto B    │
│  (catálogo ERP) │         │ (catálogo ext.) │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │  familia_a             familia_b
         │                           │
         ▼                           ▼
  ┌──────────────┐         ┌──────────────────┐
  │  mapa_familias│◄───────►│  Familias B      │
  │  (reglas de  │         │  compatibles     │
  │   negocio)   │         │  con A           │
  └──────────────┘         └──────────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │  Matching semántico      │
  │  (embeddings + coseno)   │
  │  solo dentro de familias │
  │  compatibles             │
  └──────────────────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │  Resultado:              │
  │  alta / media / sin_match│
  └──────────────────────────┘
```

---

## Taxonomía de categorías (categorias.json)

La taxonomía usa tres niveles jerárquicos:

```
C01  ← Categoría de primer nivel (ej: Desechables)
  H01  ← Subcategoría de segundo nivel (ej: De plástico)
    N001  ← Producto tipo de tercer nivel (ej: Vasos plásticos)
    N002
    ...
  H02
    N003
    ...
C02
  ...
```

Esta taxonomía es la **verdad de referencia** para normalizar `Categoría` y `Subcategoría` en el catálogo A y para derivar las familias.

---

## Estados de calidad de un producto A

| Estado | Indicador | Significado |
|---|---|---|
| Normalizado | Color `#DDD9C4` en Excel | Marca, Categoría y Subcategoría ya revisadas y corregidas |
| Sin revisar | Sin color especial | Aún con valores originales del ERP, posiblemente inconsistentes |
| Sin familia | `familia_a == 'SIN_FAMILIA'` | Categoría no mapeada todavía a una familia del pipeline |

---

## Glosario

| Término | Definición |
|---|---|
| **Oráculo** | JSON de referencia que define los valores válidos para un atributo de negocio |
| **familia_a / familia_b** | Agrupación semántica de producto usada como filtro previo al matching |
| **texto_match** | Representación textual limpia de un nombre de producto, entrada para embeddings |
| **sin_match** | Etiqueta explícita que indica que un producto B no tiene equivalente confiable en A |
| **mapa_familias** | Diccionario que define qué familias de A son compatibles con cada familia de B |
| **umbral de confianza** | Score mínimo de similitud coseno para considerar un match como válido |
