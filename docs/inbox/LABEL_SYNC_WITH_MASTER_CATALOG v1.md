````md id="q8v1na"
# LABEL_SYNC_WITH_MASTER_CATALOG_V1.md

## Estado

Documento crítico de consolidación entre trabajo operativo de etiquetado y catálogo maestro.

Sin esto, etiquetas y catálogo terminan divergentes.

---

# Objetivo

Convertir cambios hechos por operarios en datos confiables dentro del catálogo maestro mediante flujo controlado.

```text
Trabajo operativo
→ validación
→ aprobación
→ sincronización
→ catálogo oficial actualizado
````

---

# Problema Real

Si no diseñas esto bien:

```text
operario corrige producto pero tienda no cambia
nombre nuevo en etiquetas, viejo en ERP
categoría cambia en lote pero no en catálogo
dos versiones distintas del mismo producto
retrabajo constante
```

---

# Principio Rector

```text id="1v4cbe"
El lote no es la fuente final de verdad.
El catálogo maestro sí.
```

El lote produce propuestas de cambio.

---

# Entidades Requeridas

## label_item_changes

```sql id="f1mq3l"
id
batch_item_id
product_id
field_code
old_value
new_value
changed_by
created_at
```

## sync_review_queue

```sql id="w5o9sj"
id
product_id
batch_item_id
status
priority
reviewed_by
reviewed_at
notes
```

## master_catalog_updates_log

```sql id="4jv0ya"
id
product_id
version_before
version_after
changed_fields_json
applied_by
created_at
```

---

# Estados de Sincronización

```text id="v0p6xl"
PENDING_REVIEW
APPROVED_TO_SYNC
REJECTED
SYNCED
PARTIAL_SYNC
ROLLBACK
```

---

# Flujo Oficial

## Paso 1

Usuario etiqueta producto.

## Paso 2

Sistema detecta diferencias vs catálogo actual.

## Paso 3

Guarda cambios propuestos.

## Paso 4

Encola revisión.

## Paso 5

Supervisor/Admin decide:

```text
aprobar
rechazar
editar antes de aprobar
fusionar con cambios previos
```

## Paso 6

Motor aplica cambios al catálogo maestro.

## Paso 7

Dispara eventos secundarios:

```text
reindexar búsqueda
actualizar exportaciones
actualizar eCommerce
regenerar etiqueta futura
```

---

# Qué Campos Sí Deben Sincronizar

## Alta prioridad

```text id="n5b8yn"
categoría
subcategoría
marca
material
color
medidas
unidad
nombre generado
slug
```

## Media prioridad

```text id="0v3wtd"
descripción
keywords
SEO básico
```

## Baja prioridad

```text id="q4h9jm"
notas internas
observaciones operario
```

---

# Qué Campos NO Deben Sincronizar Directo

```text id="3p4eha"
costos sensibles
márgenes
configuración fiscal
permisos
estado financiero
```

Eso requiere flujo separado.

---

# Estrategia Recomendada

## Versionado por Producto

```sql id="k7n2ol"
products.version_number
```

Cada cambio aprobado incrementa versión.

Ejemplo:

```text
v12 → v13
```

---

# Manejo de Conflictos

## Caso

Dos lotes tocaron mismo producto.

Resolver con:

```text id="y6s0cp"
último aprobado no siempre gana
comparar campo por campo
prioridad supervisor
lock temporal por producto sensible
```

---

# Dashboard de Sync

```text id="f0z6re"
pendientes revisión
sincronizados hoy
rechazados hoy
productos conflictivos
tiempo promedio aprobación
```

---

# Integración con Google Sheets

Resumen diario para administración:

```text id="m1t7sd"
producto
campos cambiados
usuario origen
aprobador
fecha
resultado
```

Útil para auditoría externa.

---

# Riesgos Graves

```text id="j4e2wb"
sincronizar automático todo sin revisión
sobrescribir datos buenos con errores humanos
no guardar historial
no detectar conflictos
editar catálogo manualmente por fuera
```

---

# Recomendación Técnica Fuerte

Usa arquitectura tipo:

```text id="d9p5fr"
staging changes + approval queue + apply service
```

No escritura directa desde UI operativa a tabla maestra.

---

# Roadmap Fase 2

```text id="s2x8gl"
reglas IA de confianza
autoaprobar cambios simples
detección de anomalías
rollback por lote completo
```

---

# Veredicto Técnico

Este módulo une operación diaria con gobierno de datos real.

Sin esto, el sistema se rompe al crecer.

---

# Estado

Documento oficial LABEL_SYNC_WITH_MASTER_CATALOG v1.md

```
```
