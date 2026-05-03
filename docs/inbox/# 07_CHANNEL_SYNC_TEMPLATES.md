````md id="4fdk72"
# 07_CHANNEL_SYNC_TEMPLATES.md

## Objetivo

Definir cómo el producto maestro aprobado sincroniza dinámicamente múltiples destinos mediante plantillas configurables.

El sistema no debe depender de exportaciones manuales como operación principal.

---

# Principio Rector

```text
Producto Maestro
→ Evento de cambio
→ Motor de sincronización
→ Destinos conectados
````

Una sola fuente de verdad alimenta varios canales.

---

# Problema que Resuelve

Evita procesos manuales como:

* exportar Excel repetidamente
* subir archivos manuales
* versiones desactualizadas
* errores de digitación
* catálogos distintos entre sistemas

---

# Fuentes de Datos

Toda sincronización usa:

* products
* product_attributes
* product_generated_fields
* precios
* inventario
* diccionarios

---

# Canales Iniciales

## 1. eCommerce

Destinos posibles:

* WooCommerce
* Shopify futuro
* tienda propia

Datos típicos:

* nombre
* descripción
* categoría
* sku
* precio
* stock

---

## 2. Contable Básico

* código interno
* nombre
* precio
* costo
* unidad
* estado

---

## 3. Inventario Básico

* sku
* nombre
* stock
* unidad
* categoría

---

# Canales Futuros

* marketplaces
* ERP externo
* BI
* apps móviles
* catálogos B2B

---

# Modelo Base

## Tabla sync_channels

* id
* code
* name
* type
* active
* created_at

## Tabla sync_templates

* id
* channel_id
* version
* active
* created_at

## Tabla sync_template_fields

* id
* template_id
* target_field
* source_field
* transform_rule
* sort_order

## Tabla sync_jobs

* id
* product_id
* channel_id
* trigger_type
* status
* attempts
* response_log
* created_at
* processed_at

---

# Estados de Sincronización

```text id="2cfu61"
PENDING
PROCESSING
SUCCESS
FAILED
RETRY
CANCELLED
```

---

# Tipos de Disparo

## Tiempo Real

Cuando producto aprobado cambia.

Ejemplo:

* precio
* nombre
* stock

## Por Lote

Cada hora / noche.

## Manual

Botón:

```text id="m8n1ta"
Sincronizar ahora
```

---

# Ejemplo eCommerce

## Campos destino

```text id="d4rj82"
name
short_description
description
category
sku
price
stock_quantity
status
```

## Mapeo

```text id="3wfs04"
name              ← short_name
short_description ← short_description
description       ← long_description
category          ← ecommerce_category_path
sku               ← sku
price             ← sale_price
stock_quantity    ← stock
status            ← active
```

---

# Reglas de Transformación

## Texto

* limpiar espacios
* capitalizar
* remover caracteres inválidos

## Numéricos

* formato decimal correcto

## Categorías

Transformar jerarquía interna al formato del canal.

---

# Flujo Operativo

## 1. Producto cambia

Evento:

```text id="f9s0ha"
PRODUCT_UPDATED
```

## 2. Sistema detecta canales afectados

## 3. Crea sync_jobs

## 4. Ejecuta sincronización

## 5. Guarda resultado

## 6. Reintenta si falla

---

# Reglas de Calidad

Solo sincronizar productos:

* APPROVED
* completos
* válidos
* activos

---

# Logs y Auditoría

Guardar:

* producto
* canal
* usuario origen
* fecha
* payload enviado
* respuesta
* resultado

---

# MVP Oficial

Inicialmente puede operar en modo híbrido:

## Nivel 1

Generar archivos listos automáticamente.

## Nivel 2

Sincronización API directa.

---

# Riesgos a Evitar

* múltiples fuentes de verdad
* sincronización sin logs
* cambios silenciosos
* no manejar errores
* mappings rígidos

---

# Resultado Esperado

Un catálogo vivo que mantiene alineados todos los canales automáticamente.

---

# Estado

Documento oficial de sincronización multicanal.

```
```
