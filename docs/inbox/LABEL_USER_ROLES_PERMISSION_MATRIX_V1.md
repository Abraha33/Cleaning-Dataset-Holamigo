````md id="q4m8vx"
# LABEL_USER_ROLES_PERMISSION_MATRIX_V1.md

## Estado

Documento oficial : LABEL_USER_ROLES_PERMISSION_MATRIX_V1.md

Matriz oficial de roles, permisos y segregación de funciones para el sistema de etiquetado multiusuario.

---

# Objetivo

Definir con precisión quién puede hacer qué dentro del sistema.

```text
menos riesgo
menos errores
más control
operación clara
auditoría simple
````

---

# Principio Rector

```text id="m3q7ta"
Dar el mínimo acceso necesario para cumplir el trabajo.
```

---

# Roles Oficiales

```text id="p6n8dw"
ADMIN
SUPERVISOR
OPERADOR
QA
AUDITOR
GERENCIA
```

---

# Modelo Recomendado

```text id="x1r6pk"
RBAC
Role Based Access Control
```

Permisos por módulo + acción.

---

# Acciones Base

```text id="u8m2ra"
VIEW
CREATE
UPDATE
DELETE
APPROVE
ASSIGN
EXPORT
OVERRIDE
PRINT
RETRY
```

---

# Módulos Oficiales

```text id="k5q9tv"
users
roles
products
batches
batch_items
templates
printing
qa
dashboard
audit_logs
settings
exports
```

---

# Matriz Ejecutiva

| Módulo      | ADMIN | SUPERVISOR          | OPERADOR             | QA         | AUDITOR | GERENCIA  |
| ----------- | ----- | ------------------- | -------------------- | ---------- | ------- | --------- |
| users       | FULL  | VIEW                | NONE                 | NONE       | VIEW    | NONE      |
| roles       | FULL  | NONE                | NONE                 | NONE       | VIEW    | NONE      |
| products    | FULL  | VIEW/UPDATE_LIMITED | VIEW/UPDATE_ASSIGNED | VIEW       | VIEW    | VIEW      |
| batches     | FULL  | FULL                | VIEW_ASSIGNED        | VIEW       | VIEW    | VIEW      |
| batch_items | FULL  | FULL                | WORK_ASSIGNED        | VIEW       | VIEW    | VIEW      |
| templates   | FULL  | VIEW                | NONE                 | VIEW       | VIEW    | NONE      |
| printing    | FULL  | FULL                | PRINT_ASSIGNED       | REPRINT_QA | VIEW    | VIEW      |
| qa          | FULL  | VIEW                | NONE                 | FULL       | VIEW    | VIEW      |
| dashboard   | FULL  | FULL                | SELF                 | QA_VIEW    | VIEW    | EXECUTIVE |
| audit_logs  | FULL  | VIEW_LIMITED        | NONE                 | NONE       | FULL    | SUMMARY   |
| settings    | FULL  | NONE                | NONE                 | NONE       | VIEW    | NONE      |
| exports     | FULL  | FULL                | OWN_ONLY             | QA_ONLY    | FULL    | EXECUTIVE |

---

# Definiciones Importantes

## FULL

```text id="j3m1ls"
view create update delete approve export
```

## VIEW_ASSIGNED

Solo registros propios asignados.

## WORK_ASSIGNED

Puede editar flujo operativo del item asignado.

## UPDATE_LIMITED

No cambia campos sensibles.

## EXECUTIVE

Solo indicadores y resúmenes.

---

# Restricciones Críticas

# OPERADOR Nunca Puede

```text id="r6q4mx"
crear usuarios
editar roles
ver logs globales
editar templates
cerrar lotes ajenos
override QA
```

---

# SUPERVISOR Puede

```text id="w2n7pk"
reasignar items
cerrar lotes
priorizar impresión
ver productividad equipo
```

Pero no administrar seguridad global.

---

# QA Puede

```text id="f9m3ra"
aprobar
rechazar
reimprimir por defecto
registrar incidencias
```

---

# AUDITOR Puede

```text id="t1q8dw"
leer trazabilidad
descargar logs
ver cambios históricos
```

Sin modificar operación.

---

# GERENCIA Puede

```text id="h7r2pk"
KPIs
reportes
costos
eficiencia
```

No tocar operación diaria.

---

# Segregación de Funciones

## No Recomendado

Misma persona:

```text id="n4m9tv"
cambia precio
aprueba cambio
borra log
```

## Correcto

Separar control sensible.

---

# Permisos por Campo

## products.price

```text id="p8q1ls"
ADMIN yes
SUPERVISOR opcional
OPERADOR no
```

## templates.active

```text id="x5r7mx"
solo ADMIN
```

---

# Permisos Contextuales

Además del rol, validar contexto:

```text id="u2m6pk"
sede
turno
item asignado
estado lote
ownership
```

---

# Implementación Técnica

## Backend manda

Nunca confiar solo en frontend.

```text id="g1q9ra"
JWT claims
DB role lookup
permission guards
```

---

# Auditoría Obligatoria

Registrar cambios de permisos:

```text id="v7m3tw"
who
what changed
old role
new role
when
why
```

---

# Revisión Periódica

Cada trimestre:

```text id="k4n8ls"
usuarios activos
roles excesivos
cuentas huérfanas
admins innecesarios
```

---

# Riesgos a Evitar

```text id="s9q2pk"
todos admin
permisos solo UI
roles ambiguos
usuarios compartidos
sin revocar ex empleados
```

---

# Roadmap Fase 2

```text id="e6m1ra"
ABAC parcial
approval workflows
temporary elevated access
MFA por rol sensible
```

---

# Veredicto Técnico

Muchos problemas “de sistema” son realmente problemas de permisos mal diseñados.

---

# Próximo Documento Recomendado

```text id="d3q7tv"
LABEL_SPRINT_BACKLOG_V1.md
```

---

# Estado

Documento oficial : LABEL_USER_ROLES_PERMISSION_MATRIX_V1.md

```
```
