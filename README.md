# 🗂️ Cleaning-Dataset-Holamigo

> **Ingeniería de datos para el catálogo de productos Hola Amigo JC**  
> Limpieza, enriquecimiento y alineación semántica entre catálogos internos y externos.

---

## 🎯 Objetivo

Este proyecto no es solo "limpiar un Excel". Es construir una **capa semántica** sobre el catálogo de productos de Hola Amigo JC que permita:

- Normalizar **marcas, categorías y subcategorías** del catálogo A (ERP interno).
- Integrar información externa: catálogo B, taxonomía propia, lista de marcas.
- Construir **features semánticas** (texto enriquecido, familias de producto).
- Aplicar **matching basado en embeddings + reglas de negocio** entre catálogos A y B.
- Aceptar explícitamente productos **sin match** y cuantificar la calidad del catálogo.

---

## 🏗️ Estructura del proyecto

```
Cleaning-Dataset-Holamigo/
├── data/
│   ├── raw/               # Documentos originales (no modificados)
│   ├── interim/           # Resultados intermedios de matching
│   └── processed/         # Catálogo A mejorado, mappings finales
├── notebooks/
│   ├── 01_exploracion.ipynb
│   ├── 02_normalizacion_marcas_categorias.ipynb
│   ├── 03_embeddings_matching.ipynb
│   └── 04_analisis_resultados.ipynb
├── src/
│   ├── cleaning/
│   │   ├── text_cleaning.py
│   │   ├── normalize_brands.py
│   │   └── normalize_categories.py
│   ├── features/
│   │   ├── build_texto_match.py
│   │   └── build_familias.py
│   └── matching/
│       ├── embeddings_similarity.py
│       └── family_filtered_matching.py
├── docs/
│   ├── PIPELINE.md        # Arquitectura técnica del pipeline
│   └── DATA_MODEL.md      # Modelo conceptual de datos
├── scripts/               # Scripts auxiliares ya existentes
├── data-normalization/    # Outputs de normalización
├── normalization_output/  # Outputs del proceso de normalización
├── brands.json            # Lista de marcas conocidas
├── brands_products.json   # Conocimiento de productos por marca
├── categorias.json        # Taxonomía propia (Cxx/Hxx/Nxx)
├── categorias_oraculo.json
├── marcas_oraculo.json
├── colors.json
├── material.json
├── unities.json
├── requirements.txt
└── README.md
```

---

## 🔄 Flujo de datos (high-level)

```
  Documento A (ERP)                Documento B (catálogo externo)
  Nombre, Codigo, Marca,           sku, name, category,
  Categoría, Subcategoría          description, variants, price
         │                                    │
         ▼                                    ▼
  ┌─────────────────────────────────────────────────┐
  │         1. INGESTA & ESTANDARIZACIÓN             │
  │   pandas read_excel / json_normalize             │
  └─────────────────────────────────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────────────┐
  │      2. NORMALIZACIÓN / DATA QUALITY             │
  │  - Corrección de Marca, Categoría, Subcategoría  │
  │  - Filas revisadas marcadas con color #DDD9C4    │
  │  - Referencia: categorias.json, brands.json      │
  └─────────────────────────────────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────────────┐
  │         3. FEATURE ENGINEERING                   │
  │  - texto_match (nombre limpio para embeddings)   │
  │  - familia_a (de Categoría/Subcategoría en A)    │
  │  - familia_b (de category textual en B)          │
  └─────────────────────────────────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────────────┐
  │     4. MATCHING SEMÁNTICO + REGLAS DE NEGOCIO    │
  │  - Embeddings con sentence-transformers          │
  │  - Similitud coseno entre A y B                  │
  │  - Filtro por familias compatibles               │
  │  - Umbrales: alta (≥0.85) / media / sin_match    │
  └─────────────────────────────────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────────────┐
  │       5. ANÁLISIS & MEJORA ITERATIVA             │
  │  - Revisión de muestras con errores              │
  │  - Ajuste de reglas y umbrales                   │
  │  - Nueva limpieza de catálogo A si es necesario  │
  └─────────────────────────────────────────────────┘
```

---

## ⚙️ Stack técnico

| Herramienta | Uso |
|---|---|
| `pandas` | Manipulación de dataframes |
| `sentence-transformers` | Embeddings semánticos de nombres de producto |
| `scikit-learn` | Similitud coseno (`cosine_similarity`) |
| `openpyxl` | Lectura/escritura de Excel con metadatos de color |
| `Google Colab` | Entorno de ejecución y experimentos |
| `Python 3.10+` | Lenguaje principal |

---

## 📊 Estado actual del proyecto

| Fase | Estado |
|---|---|
| Exploración inicial de Documento A y B | ✅ Completado |
| Primera versión de `texto_match` y embeddings | ✅ Completado |
| Creación de `familia_a` y `familia_b` | ✅ Completado |
| Normalización de marcas/categorías en A (50–70%) | 🔄 En progreso |
| Matching filtrado por familias clave | 🔄 En progreso |
| Refinar normalización al 80–90% del catálogo | ⏳ Pendiente |
| Métricas de calidad del matching | ⏳ Pendiente |
| Documentación final del pipeline | ⏳ Pendiente |

---

## 📐 Principios que guían las decisiones

1. **Data first**: la calidad del modelo está limitada por la calidad del catálogo.
2. **Semántica antes que modelo**: entender productos, familias y atributos es más importante que probar más modelos.
3. **Reglas + IA, no IA sola**: las reglas de negocio (familias, marcas, taxonomía) son tan importantes como los embeddings.
4. **No forzar matches**: es mejor `sin_match` que emparejar mal dos productos.
5. **Iterar con feedback humano**: revisar muestras, ajustar reglas y volver a ejecutar el pipeline.

---

## 📚 Documentación adicional

- [Pipeline técnico detallado](docs/PIPELINE.md)
- [Modelo conceptual de datos](docs/DATA_MODEL.md)

---

## 👤 Autor

**Abraham** — Bucaramanga, Colombia  
Proyecto de ingeniería de datos para Hola Amigo JC.
