# Pipeline de Ingeniería de Datos — Catálogo Hola Amigo JC

Este documento describe la arquitectura técnica del pipeline, las decisiones de ingeniería y los principios que conectan el preprocesamiento con el análisis profundo y la mejora de calidad del catálogo.

---

## Visión general

No estamos solo "limpiando datos". Estamos construyendo una **capa semántica** sobre un catálogo de productos que:

- Entiende qué es un producto (marca, familia, categoría, unidad, material).
- Sabe comparar productos entre catálogos diferentes.
- Acepta explícitamente la incertidumbre (no todo tiene match).
- Mejora iterativamente a medida que el catálogo base mejora.

---

## Etapa 1 — Ingesta y estandarización

### Entradas

| Fuente | Archivo | Descripción |
|---|---|---|
| ERP interno | `documento_a.xlsx` | Catálogo A con Nombre, Codigo, Marca, Categoría, Subcategoría, unidades, precios |
| Catálogo externo | `documento_b.json` | Catálogo B con sku, name, category, description, variants, price, image_url |
| Catálogo proveedor | `ecoplast_data.json` | Datos crudos de proveedor Ecoplast |
| Oráculos de negocio | `brands.json`, `marcas_oraculo.json` | Marcas conocidas y normalizadas |
| Taxonomía propia | `categorias.json`, `categorias_oraculo.json` | Árbol jerárquico de categorías (Cxx/Hxx/Nxx) |
| Atributos | `material.json`, `unities.json`, `colors.json` | Materiales, unidades y colores normalizados |

### Proceso

```python
# A: Excel con pandas
df_a = pd.read_excel('documento_a.xlsx')

# B: JSON aplanado
with open('documento_b.json') as f:
    data_b = json.load(f)
df_b = pd.json_normalize(data_b)

# Oráculos
with open('categorias.json') as f:
    cat_tree = json.load(f)
```

### Resultado esperado

DataFrames con tipos correctos (strings, numéricos), columnas identificadas y listos para transformación. Sin ninguna modificación de contenido todavía.

---

## Etapa 2 — Normalización y calidad de datos

### Objetivo

Convertir un catálogo heterogéneo en uno coherente donde `Marca`, `Categoría` y `Subcategoría` siguen un estándar compartido.

### Acciones sobre Documento A

- Corrección manual y programática de `Marca` usando `brands.json` y `marcas_oraculo.json` como referencia.
- Corrección de `Categoría` y `Subcategoría` usando `categorias.json` y `categorias_oraculo.json`.
- Filas ya revisadas se marcan con color `#DDD9C4` en Excel para trazabilidad.
- Progreso actual: ~50–70% del catálogo A normalizado.

### Por qué importa

La calidad de estas columnas impacta directamente:
- La capacidad de definir **familias de producto** confiables.
- Los **filtros previos al matching** (no mezclar bolsas de papel con bolsas de aseo).
- La precisión del matching semántico (menos ruido = mejores scores).

> **Principio**: Data first. Un modelo no puede compensar datos sucios.

---

## Etapa 3 — Feature Engineering

### Features estructurales

**`familia_a`** (derivada de Categoría + Subcategoría en A):

```python
def familia_a(row):
    c = row['cat_norm']   # Categoría normalizada
    s = row['subcat_norm'] # Subcategoría normalizada
    if 'bolsa' in c:
        if 'papel' in s: return 'BOLSAS_PAPEL'
        if 'aseo' in s:  return 'BOLSAS_ASEO'
        return 'BOLSAS_OTRAS'
    if 'caja' in c:
        if 'pizza' in s: return 'CAJAS_PIZZA'
        if 'torta' in s: return 'CAJAS_TORTA'
        return 'CAJAS_OTRAS'
    if 'desechable' in c:
        if 'parafinado' in s: return 'PARAFINADO'
        return 'DESECHABLES_OTROS'
    # ...más reglas según negocio
    return 'SIN_FAMILIA'
```

**`familia_b`** (derivada de `category` en B):

```python
def familia_b(row):
    cat = row['category_norm']
    if 'cupcakes' in cat:          return 'CUPCAKES'
    if 'tapas de carton' in cat:   return 'TAPAS_CARTON'
    if 'de pet' in cat:            return 'DESECHABLES_PET'
    if 'bolsas' in cat:            return 'BOLSAS'
    if 'higiene' in cat or 'limpieza' in cat: return 'HIGIENE_LIMPIEZA'
    return cat if cat else 'SIN_FAMILIA'
```

### Features textuales

**`texto_match`**: nombre limpio para embeddings.

```python
def limpiar_texto(x):
    x = str(x).strip().lower()
    x = unicodedata.normalize('NFKD', x).encode('ascii','ignore').decode('utf-8')
    x = re.sub(r'[^a-z0-9%+./ -]', ' ', x)
    x = re.sub(r'\s+', ' ', x).strip()
    return x
```

### Por qué separar features estructurales de textuales

- Las familias permiten aplicar **reglas de negocio duras** (filtros) antes de cualquier similitud.
- Los embeddings funcionan sobre texto limpio, no sobre texto que mezcla campos de distinta naturaleza.
- Si se mezclan marca + nombre en el embedding sin filtros de familia, la marca puede dominar la similitud y generar false friends (productos con la misma marca pero de tipo completamente distinto).

---

## Etapa 4 — Matching semántico guiado por familias

### Proceso

```
Para cada producto B:
  1. Determinar familia_b
  2. Obtener familias_a compatibles (mapa_familias)
  3. Filtrar df_a → solo filas con familia_a en familias_a compatibles
  4. Si subset vacío → sin_match (no buscar en todo A)
  5. Si hay candidatos → calcular similitud coseno vs embeddings de texto_match
  6. Seleccionar top-k candidatos (k=3)
  7. Aplicar regla de desempate: preferir misma marca si score similar
  8. Etiquetar: alta (≥0.85) / media (0.70–0.84) / sin_match (<0.70)
```

### Mapa de familias compatibles

```python
mapa_familias = {
    'CUPCAKES':          ['DESECHABLES_OTROS', 'contenedor_visual pack'],
    'TAPAS_CARTON':      ['DESECHABLES_OTROS', 'PARAFINADO'],
    'BOLSAS':            ['BOLSAS_OTRAS', 'BOLSAS_PAPEL', 'BOLSAS_ASEO'],
    'DESECHABLES_PET':   ['DESECHABLES_OTROS'],
    'HIGIENE_LIMPIEZA':  ['HIGIENE_LIMPIEZA'],
    # ...
}
```

### Por qué filtrar por familias antes de similitud

Sin filtro, los embeddings pueden sugerir "bolsa de aseo 40L" como match de "bolsa de papel 1/2 lb" porque comparten vocabulario ("bolsa", "papel", números). El filtro por familia elimina esos false friends antes de que el modelo los vea.

### Umbrales de confianza

| Score coseno | Etiqueta | Decisión sugerida |
|---|---|---|
| ≥ 0.85 | `alta` | Match automático |
| 0.70 – 0.84 | `media` | Revisión humana |
| < 0.70 | `sin_match` | No asignar |

Estos umbrales deben calibrarse con una muestra validada manualmente.

---

## Etapa 5 — Análisis y mejora iterativa

### Ciclo de mejora

```
Ejecutar matching
      │
      ▼
Revisar muestras de cada nivel (alta / media / sin_match)
      │
      ├─ Errores en alta → ajustar umbral o reglas de familia
      ├─ Errores en media → revisar normalización de A
      └─ Muchos sin_match → expandir mapa_familias o mejorar categorías de A
      │
      ▼
Corregir catálogo A (marcas, categorías) donde se detecten problemas
      │
      ▼
Volver a ejecutar matching con catálogo A mejorado
```

### Outputs del pipeline

| Archivo | Descripción |
|---|---|
| `matching_A_B_top3.xlsx` | Top 3 candidatos A por cada producto B |
| `matching_A_B_top1_from_raw.xlsx` | Mejor match único por producto B |
| `oraculo_similitud.pkl` | Modelo/estructura serializada de similitud |
| `normalization_output/` | Catálogos A y B ya normalizados con familias y features |

---

## Decisiones técnicas clave

| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| Filtro por familia antes de embeddings | Embeddings sobre todo el catálogo | Evita false friends por vocabulario compartido entre familias distintas |
| Marca como filtro/desempate, no como parte del embedding | Concatenar marca+nombre en texto_match | La marca en el embedding domina la similitud, produce matches incoherentes |
| Aceptar `sin_match` explícitamente | Forzar siempre un match | Un match incorrecto puede afectar precios, stock y reporting |
| Oráculos JSON como contratos de negocio | Reglas hardcodeadas en código | Los oráculos son editables por negocio sin tocar código |
| Iterar con feedback humano | Afinar solo el modelo | El modelo no puede corregir errores de categorización que vienen del ERP |
