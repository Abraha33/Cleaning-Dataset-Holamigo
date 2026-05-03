````md id="7ndk52"
# 05_LABELING_WORKFLOW.md

## Objetivo

Definir el flujo operativo mediante el cual usuarios transforman productos crudos en productos estructurados y listos para aprobación.

El etiquetado aquí significa clasificar y completar datos, no solo imprimir etiquetas físicas.

---

# Principio Operativo

```text
Producto pendiente
→ lote asignado
→ etiquetado
→ validación
→ revisión
→ consolidación
````

---

# Entidades Principales

## Lote

Conjunto de productos asignados a uno o varios usuarios.

## Ítem de Lote

Producto individual dentro de un lote.

## Sesión

Tiempo activo de trabajo del usuario.

---

# Estados del Lote

```text id="9pc2wo"
PENDING
ASSIGNED
IN_PROGRESS
PAUSED
DONE
CANCELLED
```

---

# Estados del Producto en Flujo

```text id="53e2br"
RAW_PENDING
TAKEN
IN_LABELING
PENDING_REVIEW
APPROVED
REJECTED
SKIPPED
ERROR
```

---

# Flujo General

## 1. Importación

Productos entran como:

RAW_PENDING

## 2. Creación de Lote

Admin selecciona productos pendientes y crea lote.

Campos mínimos:

* nombre lote
* prioridad
* cantidad ítems
* usuario asignado

## 3. Asignación

Cada usuario recibe una porción de trabajo.

## 4. Toma de Producto

Usuario abre siguiente ítem disponible.

Sistema aplica lock temporal.

## 5. Etiquetado

Usuario completa atributos requeridos según categoría:

* categoría
* marca
* material
* color
* medidas
* unidad
* precio
* inventario base

## 6. Guardado

Puede guardar borrador.

## 7. Envío a Revisión

Cuando termina:

PENDING_REVIEW

## 8. Revisión

Supervisor/Admin:

* aprueba
* rechaza
* devuelve con comentario

## 9. Consolidación

Producto aprobado pasa a catálogo maestro listo para exportación.

---

# Locks y Concurrencia

## Regla Oficial

Un producto no puede ser editado por dos usuarios simultáneamente.

## Si usuario abandona

Timeout configurable libera ítem.

---

# Reglas de Productividad

1. Siguiente producto automático.
2. Navegación mínima.
3. Guardado rápido.
4. Formularios adaptados por categoría.

---

# Pantalla Operario (MVP)

## Panel Superior

* lote actual
* progreso
* tiempo sesión
* pendientes

## Zona Central

Formulario de atributos.

## Acciones

* guardar
* sugerir valor nuevo
* enviar revisión
* saltar
* reportar error

---

# Casos Especiales

## Producto Duplicado

Marcar:

DUPLICATE_CANDIDATE

## Información Insuficiente

Marcar:

NEEDS_MORE_INFO

## Producto No Válido

Marcar:

REJECTED_SOURCE

---

# Métricas Base

* productos por hora
* tiempo promedio
* tasa aprobación
* rechazos
* errores por usuario

---

# Auditoría

Registrar:

* usuario
* hora inicio
* hora fin
* campos editados
* estado final
* lote

---

# Riesgos a Evitar

* permitir múltiples ítems abiertos
* no guardar progreso
* formularios largos iguales para todo
* no controlar bloqueos
* lotes mal repartidos

---

# Estado

Documento oficial del flujo operativo de etiquetado.

```
```
