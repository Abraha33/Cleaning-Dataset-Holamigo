````md id="g2v8qx"
# LABEL_UI_UX_SYSTEM_V1.md

## Estado

Documento oficial : LABEL_UI_UX_SYSTEM_V1.md

Sistema oficial de interfaz y experiencia de usuario para operación de etiquetado multiusuario.

---

# Objetivo

Diseñar una experiencia rápida, clara y resistente al caos operativo real.

```text
menos clics
menos errores
más velocidad
aprendizaje simple
alta adopción
````

---

# Principio Rector

```text id="m7q3ta"
La operación manda sobre la estética.
```

Si es bonito pero lento, fracasa.

---

# Usuarios Principales

```text id="p4n8dw"
OPERADOR
SUPERVISOR
ADMIN
QA
GERENCIA
```

---

# Reglas Globales UX

## 1. Máximo 3 acciones críticas por pantalla

## 2. Lo urgente primero

## 3. Estados visibles siempre

```text id="x1r6pk"
pendiente
en curso
bloqueado
impreso
error
```

## 4. Confirmaciones mínimas

Solo acciones destructivas.

---

# Design System Base

## Colores Semánticos

```text id="u8m2ra"
verde = correcto
rojo = crítico
amarillo = pendiente
azul = proceso
gris = inactivo
```

## Tipografía

```text id="k5q9tv"
alta legibilidad
14-16 base
números claros para precios
```

## Componentes Base

```text id="j3m1ls"
cards
tablas densas
modales cortos
badges estado
botones grandes
```

---

# OPERADOR UI

# Home Operador

## Mostrar

```text id="r6q4mx"
mis lotes
items pendientes
impresora asignada
avance día
```

## CTA Principal

```text id="w2n7pk"
Continuar trabajo
```

---

# Pantalla Trabajo Item

## Layout

```text id="f9m3ra"
producto arriba
campos centro
preview etiqueta derecha
acciones abajo
```

## Acciones

```text id="t1q8dw"
guardar
imprimir
siguiente
bloquear incidencia
```

---

# Lista de Lotes

Tarjetas con:

```text id="h7r2pk"
nombre
prioridad
avance
items restantes
ETA
```

---

# SUPERVISOR UI

# Dashboard

Cards:

```text id="n4m9tv"
usuarios activos
items/hora
cola impresión
errores hoy
lotes atrasados
```

## Tabla Operativa

```text id="p8q1ls"
usuario
lote
última actividad
ritmo
estado
```

## Acciones Rápidas

```text id="x5r7mx"
reasignar
pausar lote
priorizar lote
reimprimir urgente
```

---

# ADMIN UI

## Módulos

```text id="u2m6pk"
usuarios
roles
templates
impresoras
configuración
logs
integraciones
```

---

# QA UI

## Cola QA

```text id="g1q9ra"
pendientes revisar
fallos barcode
reimpresiones
errores plantilla
```

## Acciones

```text id="v7m3tw"
aprobar
rechazar
reimprimir
reportar defecto
```

---

# GERENCIA UI

Vista resumida:

```text id="k4n8ls"
producción semanal
eficiencia
costos desperdicio
top usuarios
incidencias críticas
```

---

# Navegación Correcta

## Desktop

Sidebar persistente.

## Tablet

Topbar + tabs rápidas.

## Mobile futuro

Bottom nav:

```text id="s9q2pk"
inicio
lotes
impresión
perfil
```

---

# Microinteracciones

## Éxito

* toast corto
* sonido opcional
* badge verde

## Error

* mensaje claro
* acción siguiente sugerida

---

# Estados Vacíos

Ejemplo:

```text id="e6m1ra"
No tienes items asignados.
```

Nunca pantallas muertas.

---

# Rendimiento UX Objetivo

```text id="d3q7tv"
abrir item < 1s
guardar < 500ms local
crear print job < 1s
dashboard < 2s
```

---

# Accesibilidad

* alto contraste
* tamaños grandes clicables
* navegación teclado
* no depender solo de color

---

# Errores a Evitar

```text id="j8m4pk"
formularios eternos
10 modales seguidos
tablas ilegibles
métricas inútiles
animaciones lentas
```

---

# Estilo Visual Recomendado

```text id="r5q1mx"
industrial moderno
limpio
serio
funcional
sin adornos excesivos
```

---

# Roadmap Fase 2

```text id="y2m9ra"
modo oscuro
hotkeys avanzadas
comandos voz
widgets supervisor
personalización por rol
```

---

# Veredicto Técnico

Si UX es lenta, vuelven al papel o Excel.

---

# Estado

Documento oficial : LABEL_UI_UX_SYSTEM_V1.md

```
```
