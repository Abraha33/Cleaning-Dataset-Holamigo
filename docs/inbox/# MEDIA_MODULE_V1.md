````md
# MEDIA_MODULE_V1.md

## Estado

Documento oficial del módulo de captura, gestión y gobierno de imágenes de productos.

Este módulo pertenece al núcleo operativo del sistema.

---

# Objetivo

Permitir capturar, organizar, validar y reutilizar imágenes de productos para:

- catálogo maestro
- eCommerce
- revisión interna
- etiquetado operativo
- auditoría visual
- futuras automatizaciones IA

---

# Principio Arquitectónico

```text
Archivo físico ≠ Registro lógico
````

La imagen vive en storage.
La base de datos guarda metadata, relaciones y estado.

---

# Alcance MVP

Incluye:

* captura desde móvil
* carga desde PC
* múltiples imágenes por producto
* imagen principal
* imágenes secundarias
* compresión automática
* revisión/aprobación
* orden visual
* historial básico

No incluye aún:

* edición avanzada
* fondo removido IA
* OCR masivo
* video
* CDN transformaciones complejas

---

# Casos de Uso Reales

## 1. Operario en bodega

Toma foto del producto y la asocia al ítem.

## 2. Etiquetador

Completa atributos viendo imágenes.

## 3. Supervisor

Aprueba calidad visual.

## 4. eCommerce

Usa imagen principal + galería.

---

# Flujo Maestro

```text
Producto pendiente
→ capturar imagen
→ subir storage
→ crear metadata
→ revisar calidad
→ aprobar
→ disponible catálogo
```

---

# Estados de Imagen

```text
UPLOADED
PROCESSING
PENDING_REVIEW
APPROVED
REJECTED
ARCHIVED
```

---

# Modelo de Datos

## Tabla: product_media

```sql
id uuid pk
product_id uuid not null
variant_id uuid null
storage_key varchar not null
public_url varchar null
media_type varchar default 'IMAGE'
mime_type varchar
extension varchar
size_bytes bigint
width int
height int
hash_sha256 varchar
is_primary boolean default false
sort_order int default 0
capture_source varchar
device_info varchar null
captured_by uuid
captured_at timestamp
reviewed_by uuid null
reviewed_at timestamp null
status varchar
notes text null
created_at timestamp
updated_at timestamp
```

---

# Relaciones

```text
1 product → N media
1 variant → N media (opcional)
```

---

# Storage Recomendado

## Producción

* Cloudflare R2
* AWS S3
* Google Cloud Storage

## MVP económico

Cloudflare R2

---

# Estructura de Carpetas

```text
products/
  {product_id}/
    original/
    web/
    thumb/
    gallery/
```

Ejemplo:

```text
products/8af2/original/front_001.webp
products/8af2/web/front_001.webp
products/8af2/thumb/front_001.webp
products/8af2/gallery/angle_002.webp
```

---

# Naming Convention

```text
{view}_{sequence}.{ext}
```

Views válidas:

```text
front
back
side
top
detail
barcode
package
gallery
```

Ejemplos:

```text
front_001.webp
barcode_001.webp
detail_003.webp
```

Nunca usar nombres manuales.

---

# Formatos Permitidos

## Entrada

```text
jpg
jpeg
png
webp
```

## Salida Recomendada

```text
webp
```

## Futuro

```text
avif
```

---

# Reglas de Compresión

## Original

Guardar opcionalmente.

## Web

```text
max_width: 1600px
quality: 82
format: webp
```

## Thumb

```text
400px
webp
```

---

# Validaciones Obligatorias

## Técnicas

* archivo válido
* tamaño máximo permitido
* mime type permitido
* no corrupto

## Negocio

* producto existe
* usuario autorizado
* no excede límite por producto

---

# Reglas Operativas

## Imagen principal

Solo una activa por producto.

## Orden

sort_order ascendente.

## Reemplazo principal

Si nueva imagen principal entra:

```text
anterior → secundaria
nueva → principal
```

---

# UI Captura Móvil

## Pantalla rápida

* cámara
* tomar foto
* repetir
* guardar
* siguiente producto

## Acciones rápidas

* principal
* código barras
* detalle
* eliminar

---

# UI Escritorio

## Drag & Drop

* arrastrar imágenes
* reordenar
* seleccionar principal
* vista previa

---

# Calidad Visual Mínima

Rechazar si:

* borrosa
* oscura
* cortada
* fondo excesivamente sucio
* producto incompleto
* duplicada evidente

---

# Auditoría

## Tabla: media_events

```sql
id
media_id
user_id
event_type
old_value
new_value
created_at
```

Eventos:

```text
UPLOADED
APPROVED
REJECTED
PRIMARY_CHANGED
DELETED_SOFT
REORDERED
```

---

# Seguridad

* URLs privadas firmadas para internos
* públicas solo derivadas web si aplica
* validar permisos por rol

---

# Rendimiento

* subida asíncrona
* cola de compresión
* thumbnails automáticos
* lazy load frontend

---

# KPIs Útiles

* fotos por hora
* aprobación %
* rechazo %
* tiempo promedio por producto
* productos sin imagen
* imágenes duplicadas

---

# Riesgos a Evitar

* guardar imágenes en base de datos
* nombres manuales
* sin compresión
* sin imagen principal
* sin revisión
* subir archivos gigantes
* borrar sin auditoría

---

# Integración con Catálogo

Producto aprobado idealmente debe tener:

```text
mínimo 1 imagen aprobada
```

eCommerce premium:

```text
1 principal + 3 galería
```

---

# Roadmap Fase 2

* OCR etiquetas proveedor
* detección duplicados por hash perceptual
* remover fondo IA
* recorte inteligente
* generación automática SEO alt text
* video corto producto

---

# Estado

Documento oficial del módulo MEDIA v1.

```
```
