````md id="t73kqm"
# VISUAL_ASSET_LIBRARY_V1.md

## Estado

Documento oficial del módulo biblioteca central de activos visuales.

Este módulo convierte fotos aprobadas en un repositorio reutilizable para ventas, catálogo y operación.

---

# Objetivo

Centralizar, clasificar, buscar y reutilizar imágenes aprobadas de productos.

```text
una sola fuente visual
rápida búsqueda
uso multicanal
control de versiones
menos retrabajo
````

---

# Problema que Resuelve

Sin biblioteca visual ocurre:

* fotos perdidas en carpetas
* duplicados infinitos
* nadie sabe cuál es la oficial
* imágenes viejas publicadas
* volver a tomar fotos innecesariamente
* caos entre marketing y operaciones

---

# Principio Arquitectónico

```text id="u6v2rx"
Capturada ≠ Aprobada ≠ Publicable ≠ Oficial
```

Solo activos aprobados entran a la biblioteca.

---

# Flujo Maestro

```text id="n8j4fd"
captura
→ revisión
→ aprobación
→ ingreso biblioteca
→ etiquetado metadatos
→ distribución canales
```

---

# Entidades Principales

## Asset

Archivo visual aprobado.

## Asset Version

Variación del mismo activo.

## Collection

Agrupación lógica.

## Usage Link

Relación con canales o campañas.

---

# Tabla: visual_assets

```sql id="r3h7mk"
id uuid pk
product_id uuid not null
variant_id uuid null
media_id uuid not null
asset_code varchar unique
title varchar
asset_type varchar
is_primary boolean
status varchar
quality_score int
usage_rights varchar null
approved_at timestamp
approved_by uuid
created_at timestamp
updated_at timestamp
```

---

# Tabla: visual_asset_versions

```sql id="f1q5tp"
id uuid pk
asset_id uuid not null
version_no int
file_key varchar
format varchar
width int
height int
size_bytes bigint
purpose varchar
created_at timestamp
```

---

# Tabla: visual_collections

```sql id="g8n2sd"
id uuid pk
name varchar
type varchar
description text null
active boolean
created_at timestamp
```

---

# Tabla: visual_asset_collection_items

```sql id="h4z6rw"
id uuid pk
collection_id uuid
asset_id uuid
sort_order int
```

---

# Tipos de Asset

```text id="q2m9pa"
PRIMARY
GALLERY
DETAIL
PACKAGING
BARCODE
LIFESTYLE
PROMO
BUNDLE
TECHNICAL
```

---

# Estados

```text id="d9k4xy"
ACTIVE
DEPRECATED
ARCHIVED
REPLACED
RESTRICTED
```

---

# Versiones Recomendadas

Por cada asset aprobado generar:

```text id="m3w1ne"
ORIGINAL
WEB_1600
THUMB_400
MARKETPLACE
SOCIAL_SQUARE
```

---

# Metadata Estratégica

```text id="j5r7uq"
producto
marca
categoría
color
material
shot_type
fecha captura
capturador
revisor
zona origen
campaña relacionada
```

---

# Búsqueda Correcta

Permitir buscar por:

* nombre producto
* SKU
* categoría
* marca
* tipo imagen
* fecha
* campaña
* estado

---

# Ejemplo de Collections

## eCommerce Home

```text id="s4n8jc"
productos destacados
```

## Campaña Escolar

```text id="v1x2ld"
vasos
loncheras
servilletas
```

## Nuevos Ingresos

```text id="w6p0hb"
últimos aprobados
```

---

# Integración con Producto Maestro

Producto debe tener:

```text id="e7m5zn"
primary_asset_id
gallery_count
media_quality_score
last_photo_update
```

---

# Integración con eCommerce

Publicación usa:

```text id="x9t1ra"
primary
gallery ordered
optimized web versions
alt text
```

---

# Reglas de Gobierno

## Una principal activa

Solo una imagen principal por producto.

## Reemplazo Controlado

Nueva principal:

```text id="k3u6qw"
anterior → REPLACED
nueva → ACTIVE
```

## Nunca borrar histórico

Usar archive.

---

# UI Biblioteca

## Vista Grid

* miniaturas
* filtros rápidos
* selección múltiple

## Vista Detalle

* imagen grande
* versiones
* usos actuales
* historial

## Acciones

```text id="z8f2me"
copiar enlace
marcar principal
agregar colección
archivar
descargar
reemplazar
```

---

# KPIs Útiles

```text id="p6r4yt"
productos con imagen oficial %
assets reutilizados
tiempo búsqueda promedio
duplicados evitados
productos sin galería
assets obsoletos
```

---

# Seguridad

* roles de lectura/escritura
* URLs firmadas internas
* públicas solo derivadas necesarias
* log de descargas sensibles

---

# Riesgos a Evitar

* usar carpetas como único sistema
* sin metadata
* múltiples principales
* borrar versiones viejas
* sin filtros
* publicar desde archivos no aprobados

---

# Roadmap Fase 2

* reconocimiento visual similar
* auto-tagging IA
* CDN inteligente
* background removal
* generación banners automática

---

# Veredicto Técnico

Sin biblioteca, capturas imágenes.
Con biblioteca, construyes un activo empresarial reutilizable.

---

# Estado

Documento oficial VISUAL ASSET LIBRARY v1.

```
```
