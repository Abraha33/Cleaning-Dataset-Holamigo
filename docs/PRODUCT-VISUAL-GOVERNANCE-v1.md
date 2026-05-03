````md id="c58nvl"
# PRODUCT_VISUAL_GOVERNANCE_V1.md

## Estado

Documento oficial de gobierno visual del catálogo.

Este módulo define reglas, estándares y control continuo para que la calidad visual no se degrade con el tiempo.

---

# Objetivo

Establecer normas obligatorias sobre imágenes de producto en todos los canales.

```text
consistencia
calidad sostenida
control de cambios
estándar visual
escalabilidad
````

---

# Problema que Resuelve

Sin gobierno visual ocurre:

* fotos distintas entre productos similares
* fondos mezclados
* tamaños inconsistentes
* imágenes viejas activas
* cambios de empaque sin actualizar
* catálogo poco profesional
* baja conversión digital

---

# Principio Rector

```text id="h7w2pz"
La imagen también es dato maestro.
```

No es decoración.
Es parte crítica del producto digital.

---

# Alcance

Gobierna:

* imagen principal
* galerías
* lifestyle/promoción
* packaging
* imágenes técnicas
* assets multicanal

---

# Políticas Maestras

## 1. Imagen Principal Obligatoria

Todo producto publicable debe tener:

```text id="u4m6ja"
1 imagen principal aprobada
```

## 2. Galería Mínima por Categoría

Ejemplos:

```text id="n8k1ry"
vasos: 3
electrodomésticos: 5
combos: 4
bolsas: 2
```

## 3. Vigencia Visual

Toda imagen tiene fecha de revisión.

---

# Estándares Técnicos

## Resolución Mínima

```text id="x5q2db"
1600px lado mayor
```

## Relación Recomendada

```text id="g3r7mv"
1:1
4:5
16:9 (solo banners)
```

## Formato Oficial Web

```text id="d7n4hc"
webp
```

---

# Estándares Visuales

## Imagen Principal

* producto centrado
* fondo limpio
* iluminación homogénea
* producto completo
* sin marcas de agua

## Galería

* mostrar ángulos reales
* no repetir casi iguales
* incluir detalles útiles

---

# Reglas Comerciales

## Empaque Nuevo

Si cambia empaque:

```text id="r1j9tp"
asset antiguo → deprecated
nueva tarea fotográfica automática
```

## Cambio Marca

Disparar revisión visual total.

---

# Clasificación de Calidad

```text id="q8m3la"
A = premium
B = correcta
C = usable temporal
D = rehacer
```

---

# Tabla: visual_governance_rules

```sql id="k6z1es"
id uuid pk
category_id uuid null
channel_code varchar null
rule_code varchar
rule_value varchar
severity varchar
active boolean
created_at timestamp
```

---

# Ejemplos de rule_code

```text id="w0n6fd"
MIN_IMAGES
MIN_RESOLUTION
ALLOW_WATERMARK
REQUIRE_BARCODE_SHOT
MAX_IMAGE_AGE_DAYS
PRIMARY_RATIO
```

---

# Reglas por Canal

## eCommerce propio

```text id="t9p2vu"
alta calidad
galería completa
SEO alt text
```

## Marketplace

```text id="m7k5qr"
fondo blanco
1:1
sin texto extra
```

## WhatsApp ventas

```text id="f2x8ds"
rápida carga
imagen ligera
```

---

# Auditoría Continua

## Jobs Automáticos

Buscar:

* productos sin principal
* imágenes vencidas
* baja resolución
* assets duplicados
* galería incompleta

---

# Tabla: visual_audit_jobs

```sql id="p3r9mx"
id uuid pk
job_type varchar
status varchar
started_at timestamp
ended_at timestamp
result_json json
```

---

# Score Visual Producto

```text id="v5h7zu"
0 - 100
```

Factores:

* cantidad imágenes
* calidad técnica
* vigencia
* consistencia
* cobertura requerida

---

# Integración con Producto Maestro

```text id="y4c1kw"
product.visual_score
product.visual_grade
product.visual_last_audit
product.publish_block_reason
```

---

# Bloqueos de Publicación

No publicar si:

```text id="n6t3jb"
sin imagen principal
score bajo mínimo
asset vencido crítico
marca incorrecta visible
```

---

# UI Supervisor

## Dashboard Gobierno

* productos bloqueados
* score promedio por categoría
* imágenes vencidas
* top categorías débiles
* backlog fotográfico

---

# KPIs Ejecutivos

```text id="a8u2vn"
% catálogo publicable
score visual promedio
productos con galería completa
tiempo renovación visual
impacto conversión vs calidad
```

---

# Riesgos a Evitar

* dejar calidad al criterio personal
* no revisar imágenes antiguas
* no diferenciar canal
* usar cualquier foto como principal
* ignorar cambios de empaque

---

# Roadmap Fase 2

* IA score automático
* benchmark competencia
* A/B testing imágenes
* detección branding incorrecto
* predicción impacto ventas

---

# Veredicto Técnico

Tomar fotos resuelve hoy.
Gobernarlas protege el catálogo mañana.

---

# Estado

Documento oficial PRODUCT VISUAL GOVERNANCE v1.

```
```
