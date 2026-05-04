````md id="f42kpa"
# MEDIA_CAPTURE_WORKFLOW_V1.md

## Estado

Documento operativo del flujo diario de trabajo para captura de imágenes dentro del sistema multiusuario.

Este documento define cómo trabaja realmente un usuario en campo o escritorio.

---

# Objetivo

Maximizar velocidad, orden y calidad al capturar imágenes de productos sin frenar la operación.

```text
rápido
simple
auditado
sin retrabajo
````

---

# Principio Operativo

```text
Un producto entra al flujo
→ se captura evidencia visual
→ se valida
→ queda disponible para catálogo
```

---

# Modos Oficiales de Trabajo

## Modo A — Solo Fotos

Usuario recorre lote y solo toma imágenes.

Ideal cuando:

* hay muchos productos
* poco tiempo
* otro usuario etiqueta datos

---

## Modo B — Solo Datos

Usuario trabaja atributos sobre productos ya fotografiados.

Ideal para backoffice.

---

## Modo C — Mixto

Foto + atributos en la misma sesión.

Ideal para operación pequeña o productos nuevos.

---

# Flujo Maestro por Lote

```text id="m8eh4a"
1. Admin crea lote
2. Asigna usuarios
3. Usuario abre lote
4. Sistema entrega siguiente producto
5. Captura imágenes
6. Guarda y valida
7. Finaliza ítem
8. Continúa automático
9. Cierra lote
```

---

# Estados del Ítem

```text id="j4mzy6"
PENDING
TAKEN
PHOTO_IN_PROGRESS
PHOTO_DONE
DATA_PENDING
READY_REVIEW
DONE
SKIPPED
ERROR
```

---

# Reglas de Concurrencia

## 1 producto = 1 usuario activo

Mientras esté abierto:

```text
lock temporal
```

Evita doble trabajo.

## Timeout

Si abandona sesión:

```text
liberar ítem tras X minutos
```

---

# Flujo Móvil (Bodega)

## Pantalla Inicial

Mostrar:

* nombre producto
* código interno
* progreso lote
* botón cámara

## Secuencia Ideal

```text id="kz7hwp"
abrir producto
tomar front
tomar side
tomar barcode
guardar
siguiente automático
```

---

# Cantidad Recomendada de Fotos MVP

## Producto simple

```text
1 a 2 fotos
```

## Producto premium / eCommerce

```text
3 a 5 fotos
```

## Producto técnico

```text
+ detalle + medidas + empaque
```

---

# Tipos de Vista Sugeridos

```text id="rvz4gk"
front
back
side
top
barcode
detail
package
```

---

# Validación Instantánea

Antes de guardar:

* imagen enfocada
* tamaño mínimo
* archivo válido
* no vacía

---

# UX Correcta

## Después de guardar

```text
toast éxito
avance actualizado
abrir siguiente producto
```

No regresar al menú principal.

---

# Flujo Escritorio

## Para usuario con PC

* drag & drop imágenes
* seleccionar producto
* ordenar galería
* marcar principal
* guardar lote

---

# Casos Especiales

## Producto no encontrado

Marcar:

```text
ERROR_PRODUCT_MISSING
```

## Producto repetido

```text
DUPLICATE_CANDIDATE
```

## Producto cerrado / sellado

Tomar solo empaque visible.

---

# Auditoría Requerida

Registrar:

```text id="xj6nd8"
usuario
hora inicio
hora fin
cantidad fotos
producto
dispositivo
duración
```

---

# KPIs Operativos

* productos fotografiados/hora
* fotos válidas %
* reintentos %
* tiempo promedio por ítem
* productos sin imagen
* productividad por usuario

---

# Reglas de Calidad Realistas

## Aceptable MVP

* nítida
* producto visible
* iluminación usable

## No aceptar

* movida
* cortada
* oscura extrema
* dedo tapando lente
* producto fuera de cuadro

---

# Optimización Avanzada

## Autoacciones futuras

* detectar blur
* recorte automático
* fondo neutro
* OCR código barras
* sugerir producto duplicado

---

# Diseño de Lotes Inteligente

## Separar por zona física

```text
Pasillo A
Pasillo B
Bodega alta
Mostrador
```

Reduce desplazamiento.

---

# Riesgos a Evitar

* pedir demasiadas fotos
* pasos largos
* no autosiguiente
* no lock por usuario
* internet obligatorio constante
* formularios pesados

---

# Recomendación Técnica Fuerte

Modo offline-first:

```text
captura local
cola de subida
sync al recuperar señal
```

Muy útil en bodega real.

---

# Integración con Etiquetado

Si producto ya tiene fotos:

```text
usuario datos ve imágenes como referencia
```

Aumenta precisión.

---

# Estado

Documento oficial del workflow de captura visual v1.

```
```
