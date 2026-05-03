````md id="p3v8mx"
# LABEL_MVP_EXECUTION_PLAN_V1.md

## Estado

Documento oficial : LABEL_MVP_EXECUTION_PLAN_V1.md

Plan realista para construir el sistema de etiquetado funcional con máximo impacto y mínima complejidad inicial.

---

# Objetivo

Lanzar un MVP usable en operación diaria que resuelva trabajo real desde el primer mes.

```text
etiquetar más rápido
menos errores
mejor control
datos centralizados
crecer después
````

---

# Principio Rector

```text id="m6q2ta"
No construir todo.
Construir lo indispensable que genere valor inmediato.
```

---

# Qué Debe Resolver el MVP

```text id="u9r4pk"
crear lotes de trabajo
asignar usuarios
editar datos producto
generar etiquetas
imprimir controlado
medir productividad básica
reportar resultados diarios
```

---

# Alcance MVP (80/20)

## Incluir

```text id="x2n7dw"
usuarios y roles
catálogo base importado
lotes
flujo multiusuario
motor plantillas básico
cola impresión
dashboard supervisor simple
Google Sheets reportes
```

## Excluir Temporalmente

```text id="j5m8ra"
IA avanzada
multi sede
forecasting
editor visual complejo
ERP completo
marketplaces múltiples
```

---

# Fases de Construcción

# FASE 1 — Core Operativo

Duración sugerida:

```text id="k1q9tv"
3 a 5 semanas
```

## Entregables

### Usuarios + Roles

```text id="h4r2mx"
ADMIN
SUPERVISOR
OPERADOR
```

### Catálogo Base

Importar productos desde archivo existente.

### Lotes

Crear lote, asignar usuarios, ver progreso.

### Edición Producto en Flujo

Cambiar atributos permitidos.

---

# FASE 2 — Etiquetado Real

Duración:

```text id="v7m3pk"
2 a 4 semanas
```

## Entregables

### Label Template Engine Básico

* precio pequeño
* precio grande
* barcode

### Print Queue

* impresoras registradas
* historial
* reimpresión

### Locks Multiusuario

Evitar doble edición.

---

# FASE 3 — Gestión

## Entregables

### Dashboard

* producción hoy
* usuarios activos
* lotes atrasados

### Productividad

* items/hora
* tiempo promedio
* errores básicos

### Exportes

Google Sheets nocturno.

---

# Arquitectura MVP Correcta

## Backend

```text id="p8n1dz"
FastAPI
```

## DB

```text id="w3q7lc"
PostgreSQL
```

## Queue ligera

```text id="f6m4ra"
Redis
```

## Frontend

```text id="y2r8tp"
Next.js
```

## Estaciones Operativas

```text id="n9m5kv"
PC + navegador
Tablet opcional
```

---

# Modelo de Datos Mínimo

```text id="c7q1sx"
users
roles
products
batches
batch_items
label_templates
print_jobs
audit_logs
```

---

# Flujo Oficial MVP

```text id="g4n9mw"
importar productos
→ crear lote
→ asignar usuarios
→ editar ítems
→ generar etiqueta
→ imprimir
→ cerrar lote
→ reporte diario
```

---

# Sprint Recomendado

## Sprint 1

```text id="t6q2pk"
auth
roles
productos
```

## Sprint 2

```text id="m1r7vd"
lotes
asignación
locks
```

## Sprint 3

```text id="z5n8la"
templates
render
print queue
```

## Sprint 4

```text id="u3m6tx"
dashboard
analytics básico
sheets export
```

---

# KPIs de Validación MVP

```text id="e8q4rw"
items procesados/día
tiempo por item
errores impresión
usuarios activos diarios
uso real del sistema
```

---

# Criterio de Éxito (30 días)

```text id="r2n9pk"
supervisores usan dashboard
usuarios procesan lotes diarios
menos caos en impresión
reportes confiables
mejor velocidad operativa
```

---

# Riesgos Críticos

```text id="d7m3qa"
querer automatizar todo antes de operar
UX lenta
drivers impresoras inestables
sin reglas de permisos
sin backups
```

---

# Integración Estratégica Contigo

Muy conveniente para tu contexto:

```text id="h5q1mv"
distribuidora física
muchos SKUs
equipo operativo
WooCommerce futuro
Google Sheets actual
```

---

# Roadmap Después del MVP

```text id="k8r6tw"
QA avanzado
sync catálogo automático
insumos
IA sugerencias
multi sede
```

---

# Veredicto Técnico

Si ejecutas este MVP bien, reemplazas caos manual por sistema productivo real.

---

# Estado

Documento oficial : LABEL_MVP_EXECUTION_PLAN_V1.md

```
```
