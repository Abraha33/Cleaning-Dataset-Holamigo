````md id="l63qwe"
# VISUAL_MOBILE_APP_V1.md

## Estado

Documento oficial del módulo móvil para captura visual operativa.

Este módulo es la herramienta de campo principal para tomar fotos rápidas en bodega, punto de venta y rutas internas.

---

# Objetivo

Permitir que usuarios capturen imágenes, ejecuten tareas y reporten avance desde celular o tablet.

```text
rápido
simple
offline-ready
usable en operación real
````

---

# Problema que Resuelve

Sin app móvil ocurre:

* depender de PC para fotos
* subir imágenes tarde
* caos de archivos en galerías personales
* baja productividad
* poca trazabilidad
* retraso entre captura y sistema

---

# Principio Rector

```text id="j7m2ds"
La captura debe ocurrir donde está el producto.
```

No en escritorio horas después.

---

# Usuarios Objetivo

```text id="n3q5pw"
capturador
supervisor piso
auxiliar inventario
vendedor mostrador
```

---

# Plataformas Recomendadas

## MVP

```text id="x5r8hf"
Android primero
```

Por costo y operación.

## Futuro

```text id="k2w1nb"
iOS tablet
PWA supervisor
```

---

# Funciones Núcleo

## 1. Login Seguro

* usuario
* PIN rápido opcional
* sesión persistente controlada

## 2. Mis Tareas

* tareas asignadas
* prioridad
* zona
* vencimiento

## 3. Cámara Integrada

* tomar foto
* repetir
* varias tomas
* flash
* enfoque automático

## 4. Subida Inteligente

* cola de envío
* reintento automático
* compresión previa

## 5. Modo Offline

* guardar local
* sincronizar luego

---

# Flujo Usuario

```text id="f6p9az"
login
→ abrir ruta
→ abrir tarea
→ tomar fotos
→ guardar
→ siguiente automática
→ cerrar jornada
```

---

# Pantallas MVP

## Home

* resumen hoy
* tareas pendientes
* progreso %

## Lista Tareas

* filtro zona
* prioridad
* buscador

## Captura

* vista cámara
* shots requeridos
* contador fotos

## Sync Center

* pendientes subir
* errores
* último sync

## Perfil

* sesión
* dispositivo
* ayuda

---

# UX Operativa Correcta

## Botones Grandes

Uso con movimiento.

## Pocos Toques

```text id="h8v4qt"
abrir tarea → disparar cámara
```

## Autosiguiente

Tras completar tarea.

---

# Datos Locales

## Cache Requerido

```text id="q4m7ke"
tareas asignadas
productos básicos
zonas
shots requeridos
miniaturas recientes
```

---

# Arquitectura Offline

```text id="z1n8dw"
captura local
cola jobs
sync background
confirmación servidor
```

---

# Estados de Sync

```text id="m5x2rb"
LOCAL_ONLY
QUEUED
UPLOADING
SYNCED
FAILED
RETRYING
```

---

# Integración Cámara

## Metadata útil

```text id="u7k3pa"
timestamp
device_id
orientation
resolution
gps opcional
```

---

# Escaneo Opcional

## Barcode / QR

Abrir producto por código.

Muy útil fase 2.

---

# Seguridad

* cifrado local básico
* logout remoto opcional
* bloqueo por inactividad
* no exponer URLs sensibles

---

# Rendimiento Requerido

## Tiempo objetivo

```text id="p9t1mv"
abrir app < 2s
guardar foto < 1s local
sync silencioso
```

---

# Alertas Usuario

```text id="w2r8fd"
sin internet
cola acumulada
ruta vencida
tarea crítica
batería baja
```

---

# Dashboard Supervisor Móvil

* quién está activo
* tareas cerradas hoy
* zonas pendientes
* incidencias

---

# KPIs App

```text id="c6q4ns"
fotos por usuario
tiempo por tarea
fallos sync
uso offline %
abandono de tareas
```

---

# Riesgos a Evitar

* app pesada
* demasiados formularios
* depender siempre de internet
* cámara lenta
* consumo excesivo batería
* UX de oficina en entorno bodega

---

# Roadmap Fase 2

* comandos por voz
* OCR empaque
* navegación por ruta
* push notifications
* firma supervisor
* video corto evidencia

---

# Stack Sugerido (alineado contigo)

```text id="e3m9yk"
Android Studio
Jetpack Compose
Room local DB
WorkManager sync
Firebase Auth / Supabase Auth
```

---

# Veredicto Técnico

Sin móvil, el sistema captura tarde.
Con móvil, capturas en tiempo real donde ocurre la operación.

---

# Estado

Documento oficial VISUAL_MOBILE_APP v1.

```
```
