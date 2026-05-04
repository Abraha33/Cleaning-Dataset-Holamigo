````md id="9mkd44"
# 08_ROLES_PERMISSIONS.md

## Objetivo

Definir los roles oficiales del sistema y sus permisos para operar con control, trazabilidad y separación de responsabilidades.

Sin roles claros, el sistema se degrada rápidamente.

---

# Principio Rector

```text
No todos pueden hacer todo.
Cada rol tiene alcance definido.
````

---

# Roles MVP Oficiales

## 1. Admin

Máximo control funcional y operativo.

## 2. Supervisor

Control de calidad y seguimiento de operación.

## 3. Etiquetador

Procesa productos asignados en lotes.

## 4. Revisor

Aprueba o rechaza productos procesados.

> En MVP pequeño, Supervisor y Revisor pueden ser el mismo rol.

---

# Matriz General de Permisos

| Acción               | Admin | Supervisor | Etiquetador | Revisor |
| -------------------- | ----- | ---------- | ----------- | ------- |
| Ver dashboard global | Sí    | Sí         | No          | Parcial |
| Importar Excel       | Sí    | Sí         | No          | No      |
| Crear lotes          | Sí    | Sí         | No          | No      |
| Asignar lotes        | Sí    | Sí         | No          | No      |
| Editar diccionarios  | Sí    | No         | No          | No      |
| Sugerir valores      | Sí    | Sí         | Sí          | Sí      |
| Etiquetar productos  | Sí    | Sí         | Sí          | No      |
| Aprobar productos    | Sí    | Sí         | No          | Sí      |
| Rechazar productos   | Sí    | Sí         | No          | Sí      |
| Exportar plantillas  | Sí    | Sí         | No          | No      |
| Ver auditoría        | Sí    | Sí         | No          | Parcial |
| Gestionar usuarios   | Sí    | No         | No          | No      |

---

# Permisos por Rol

## Admin

Puede:

* configurar sistema
* crear usuarios
* editar permisos
* aprobar sugerencias
* editar diccionarios
* exportar cualquier plantilla
* archivar productos
* ver métricas globales

---

## Supervisor

Puede:

* crear y repartir lotes
* monitorear productividad
* revisar productos
* aprobar/rechazar
* importar productos
* exportar plantillas operativas

No puede:

* cambiar estructura del sistema
* administrar usuarios

---

## Etiquetador

Puede:

* ver su lote
* editar productos asignados
* guardar borradores
* sugerir nuevos valores
* enviar revisión
* reportar errores

No puede:

* aprobar
* exportar
* cambiar diccionarios

---

## Revisor

Puede:

* revisar productos pendientes
* aprobar
* rechazar con comentario
* devolver corrección

No puede:

* administrar usuarios
* cambiar configuración global

---

# Permisos Técnicos Recomendados

## Nivel API

Toda ruta debe validar:

* usuario autenticado
* rol permitido
* lote asignado si aplica

## Nivel UI

Ocultar botones sin permiso.

---

# Reglas Operativas

## Lotes

Etiquetador solo ve y trabaja sus lotes asignados.

## Productos

No puede editar productos ya aprobados salvo permiso especial.

## Diccionarios

Creación directa restringida a Admin.

---

# Auditoría Obligatoria

Registrar:

* usuario
* acción
* fecha
* entidad afectada
* resultado

Ejemplos:

```text id="4b6tvp"
USER_LOGIN
LOT_ASSIGNED
PRODUCT_APPROVED
DICTIONARY_ITEM_CREATED
EXPORT_GENERATED
```

---

# Futuro (No MVP)

Roles adicionales:

* Compras
* Inventario
* eCommerce Manager
* Soporte
* Auditor externo

---

# Riesgos a Evitar

* todos con permisos admin
* roles ambiguos
* usuarios compartidos
* cambios sin trazabilidad
* aprobación sin responsable

---

# Resultado Esperado

Operación ordenada, segura y escalable.

---

# Estado

Documento oficial de roles y permisos.

```
```
