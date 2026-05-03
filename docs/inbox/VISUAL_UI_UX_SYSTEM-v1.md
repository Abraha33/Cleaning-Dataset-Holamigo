````md id="b72qmx"
# VISUAL_UI_UX_SYSTEM_V1.md

## Estado

Documento oficial del sistema UI/UX para el ecosistema visual.

Define experiencia de usuario operativa para móvil, supervisor web y administración.

---

# Objetivo

Diseñar una interfaz rápida, clara y usable en entorno real de trabajo.

```text
menos clics
menos errores
más velocidad
aprendizaje simple
````

---

# Principio Rector

```text id="m4x7pa"
La operación manda sobre la estética.
```

Diseño bonito sin velocidad = fracaso.

---

# Usuarios Principales

```text id="p8n3rd"
capturador móvil
revisor web
supervisor web
admin sistema
```

---

# Reglas Globales UX

## 1. Máximo 3 acciones críticas por pantalla

## 2. Información priorizada

Lo urgente arriba.

## 3. Estados visibles

```text id="q2m6zt"
pendiente
en curso
aprobado
bloqueado
```

## 4. Confirmaciones mínimas

Solo cuando haya riesgo real.

---

# Design System Base

## Colores Semánticos

```text id="v5r1ke"
verde = aprobado
rojo = error
amarillo = pendiente
azul = proceso
gris = archivado
```

## Tipografía

```text id="u1n8pw"
clara
alta legibilidad
14-16 base móvil
```

## Espaciado

Amplio para uso rápido.

---

# MOBILE APP UX

# Home

## Componentes

* saludo corto
* tareas hoy
* progreso %
* botón continuar

## CTA principal

```text id="w7q2ld"
Iniciar jornada
```

---

# Lista de Tareas

## Tarjeta de tarea

```text id="h6m4za"
producto
zona
prioridad
shots faltantes
estado
```

## Gestos

* deslizar completar
* mantener para detalle

---

# Pantalla Captura

## Layout

```text id="c9r3tp"
header producto
cámara central
shots requeridos abajo
acciones rápidas laterales
```

## Botones

```text id="j3v8nf"
tomar
repetir
guardar
siguiente
flash
```

## Regla UX

Abrir cámara en < 1 segundo.

---

# Sync Center

Mostrar:

```text id="t5m1qx"
pendientes subir
errores
último sync
botón sincronizar
```

---

# WEB REVISOR UX

# Cola Revisión

## Layout 3 Columnas

```text id="e8q7pd"
cola izquierda
imagen centro
acciones derecha
```

## Hotkeys

```text id="r2n6kv"
A aprobar
R retoma
X rechazar
N siguiente
```

Muy útil.

---

# Pantalla Supervisor

## Dashboard

Cards:

```text id="f4w9me"
pendientes
en progreso
cola review
SLA vencidos
```

## Tablas

* usuarios
* zonas
* backlog

---

# ADMIN UX

## Módulos

```text id="p1x4td"
usuarios
roles
configuración
logs
integraciones
```

---

# Navegación Correcta

## Web

Sidebar persistente.

## Mobile

Bottom navigation:

```text id="z7m2ra"
Inicio
Tareas
Sync
Perfil
```

---

# Microinteracciones

## Éxito

* vibración leve móvil
* toast corto

## Error

* mensaje claro
* acción sugerida

---

# Estados Vacíos

Ejemplo:

```text id="n3q8hf"
No tienes tareas asignadas hoy.
```

No pantallas muertas.

---

# Carga / Skeletons

Siempre usar placeholders en listas y galería.

---

# Accesibilidad

* contraste alto
* botones grandes
* textos legibles bajo sol
* no depender solo de color

---

# Rendimiento UX

## Objetivos

```text id="y6r1pk"
tap to camera < 1s
lista tareas < 1.5s
dashboard < 2s
```

---

# Errores Comunes a Evitar

* modales por todo
* tablas pequeñas en móvil
* formularios largos
* menús escondidos
* demasiadas métricas visibles

---

# Identidad Visual Recomendada

## Estilo

```text id="g2v7mz"
industrial moderno
limpio
funcional
sin adornos excesivos
```

---

# Roadmap Fase 2

* modo oscuro
* comandos voz
* widgets android
* shortcuts teclado avanzados
* personalización rol

---

# Veredicto Técnico

Si UX es lenta, nadie usa el sistema aunque backend sea perfecto.

---

# Estado

Documento oficial VISUAL_UI_UX_SYSTEM v1.

```
```
