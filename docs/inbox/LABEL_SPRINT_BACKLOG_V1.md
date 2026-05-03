````md id="b7m9qx"
# LABEL_SPRINT_BACKLOG_V1.md

## Estado

Documento oficial : LABEL_SPRINT_BACKLOG_V1.md

Backlog oficial de ejecución para los primeros sprints del MVP del sistema de etiquetado.

---

# Objetivo

Traducir arquitectura y documentos en trabajo ejecutable.

```text
tareas claras
prioridades reales
avance medible
menos improvisación
````

---

# Principio Rector

```text id="m4q7ta"
Cada sprint debe producir valor usable.
```

---

# Cadencia Recomendada

```text id="p1n8dw"
Sprint de 2 semanas
review semanal
deploy semanal ideal
```

---

# Definición de Prioridad

```text id="x6r2pk"
P0 = bloquea operación
P1 = alto valor
P2 = mejora importante
P3 = nice to have
```

---

# Sprint 1 — Foundation

## Objetivo

Sistema base corriendo.

## Backlog

| Prioridad | Tarea                   | Resultado              |
| --------- | ----------------------- | ---------------------- |
| P0        | Crear monorepo          | repositorio listo      |
| P0        | Configurar apps web/api | proyectos corren local |
| P0        | Configurar PostgreSQL   | conexión estable       |
| P0        | Configurar Redis        | cache/locks listo      |
| P1        | CI básico               | lint + tests           |
| P1        | Variables entorno       | .env organizado        |
| P1        | Docker local opcional   | onboarding rápido      |

## Exit Criteria

```text id="u3m9ra"
frontend levanta
backend responde
db conectada
pipeline básico activo
```

---

# Sprint 2 — Auth + Roles

## Objetivo

Acceso seguro.

## Backlog

| Prioridad | Tarea                 | Resultado        |
| --------- | --------------------- | ---------------- |
| P0        | Modelo users/roles    | tablas listas    |
| P0        | Login JWT             | sesión funcional |
| P0        | Refresh token         | sesión estable   |
| P1        | Guards por rol        | rutas protegidas |
| P1        | Pantalla login        | usable           |
| P2        | Reset password básico | opcional         |

## Exit Criteria

```text id="k5q1tv"
admin entra
operador restringido
sesión persistente
```

---

# Sprint 3 — Products Core

## Objetivo

Catálogo usable.

## Backlog

| Prioridad | Tarea             | Resultado      |
| --------- | ----------------- | -------------- |
| P0        | Tabla products    | base lista     |
| P0        | CRUD productos    | gestión mínima |
| P0        | Import CSV/XLSX   | carga inicial  |
| P1        | Filtros búsqueda  | usable         |
| P1        | Auditoría cambios | trazabilidad   |

## Exit Criteria

```text id="j8m4ls"
productos visibles y editables
```

---

# Sprint 4 — Batches Workflow

## Objetivo

Trabajo real multiusuario.

## Backlog

| Prioridad | Tarea               | Resultado        |
| --------- | ------------------- | ---------------- |
| P0        | Crear lotes         | flujo base       |
| P0        | batch_items         | items asignables |
| P0        | Lock item           | evita colisión   |
| P1        | Mis tareas operador | pantalla útil    |
| P1        | Estados workflow    | control          |

## Exit Criteria

```text id="r7q2mx"
usuario procesa items reales
```

---

# Sprint 5 — Printing MVP

## Objetivo

Impresión controlada.

## Backlog

| Prioridad | Tarea                | Resultado        |
| --------- | -------------------- | ---------------- |
| P0        | label_templates base | plantilla usable |
| P0        | print_jobs           | cola simple      |
| P0        | printers registry    | dispositivos     |
| P1        | Retry/cancel         | operación        |
| P1        | Historial impresión  | trazabilidad     |

## Exit Criteria

```text id="t1m8pk"
imprimir desde sistema real
```

---

# Sprint 6 — Dashboard + Reports

## Objetivo

Visibilidad operativa.

## Backlog

| Prioridad | Tarea                | Resultado          |
| --------- | -------------------- | ------------------ |
| P0        | KPIs básicos         | producción visible |
| P1        | Dashboard supervisor | control diario     |
| P1        | Export Google Sheets | reporte gerencia   |
| P2        | Alertas simples      | mejora reacción    |

## Exit Criteria

```text id="h6q3ra"
supervisor usa dashboard
```

---

# Sprint 7 — Hardening

## Objetivo

Estabilidad producción.

## Backlog

| Prioridad | Tarea               | Resultado         |
| --------- | ------------------- | ----------------- |
| P0        | Logs estructurados  | soporte           |
| P0        | Backups             | resiliencia       |
| P0        | Smoke tests deploy  | seguridad release |
| P1        | Mejoras UX críticas | adopción          |
| P1        | Performance tuning  | rapidez           |

---

# Tareas Transversales Siempre Activas

```text id="n4r7tv"
bugs
tests
refactor pequeño
docs vivas
feedback usuarios
```

---

# No Meter Temprano

```text id="w2m9pk"
IA compleja
microservicios
app móvil completa
10 dashboards
features raras
```

---

# KPI de Ejecución

```text id="f8q1mx"
velocity sprint
bugs abiertos
lead time tarea
deploy frequency
uso real sistema
```

---

# Regla de Priorización Semanal

Si una tarea no mejora:

```text id="v5m3ra"
ventas
velocidad
control
estabilidad
```

probablemente no es prioritaria ahora.

---

# Riesgos a Evitar

```text id="d3q8tw"
sprints gigantes
sin demo
sin usuarios reales
cambiar foco cada semana
```

---

# Veredicto Técnico

Backlog bueno convierte ambición en ejecución.

---

# Próximo Documento Recomendado

```text id="g7m2pk"
LABEL_REAL_DATABASE_SQL_V1.md
```

---

# Estado

Documento oficial : LABEL_SPRINT_BACKLOG_V1.md

```
```
