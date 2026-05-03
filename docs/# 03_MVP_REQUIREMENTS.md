````md id="6mta41"
# 03_MVP_REQUIREMENTS.md

## Objetivo del MVP

Lanzar una primera versión funcional que permita procesar productos crudos, estructurarlos mediante trabajo humano asistido y exportarlos listos para eCommerce.

El MVP debe resolver un problema real desde el primer día.

---

# Resultado Esperado

```text
Excel crudo / productos incompletos
→ sistema interno
→ etiquetado por usuarios
→ aprobación
→ catálogo limpio
→ Excel listo para tienda virtual
````

---

# Módulos Incluidos

## 1. Autenticación básica

Funciones mínimas:

* login
* cierre de sesión
* control por rol
* sesiones activas

---

## 2. Gestión de Productos Crudos

Funciones:

* importar Excel
* crear registros pendientes
* visualizar productos sin procesar
* buscar y filtrar

Estados:

* RAW_PENDING
* IN_PROCESS
* APPROVED
* EXPORTED

---

## 3. Gestión de Lotes

Funciones:

* crear lote
* asignar lote a usuario
* dividir productos por porciones
* cambiar prioridad
* ver progreso

---

## 4. Etiquetado de Productos

Funciones:

* abrir siguiente producto del lote
* completar atributos requeridos
* guardar avance
* marcar terminado
* devolver para revisión

---

## 5. Diccionarios Controlados

Tipos iniciales:

* categorías
* marcas
* materiales
* colores
* unidades

Funciones:

* seleccionar valor existente
* sugerir nuevo valor
* aprobar/rechazar sugerencias

---

## 6. Validación de Calidad

Reglas mínimas:

* campos obligatorios completos
* categoría válida
* atributos coherentes
* sin duplicados evidentes
* formatos correctos

---

## 7. Campos Derivados Automáticos

Generar:

* nombre corto
* nombre largo
* slug
* descripción inicial
* etiquetas de búsqueda

---

## 8. Exportación eCommerce

Campos mínimos:

* nombre corto
* descripción corta
* descripción larga
* categoría
* código
* sku
* precio
* inventario

Formatos:

* XLSX
* CSV

---

## 9. Auditoría Básica

Guardar:

* usuario
* fecha
* acción
* producto afectado
* cambios relevantes

---

# Requisitos No Funcionales

## Rendimiento

* interfaz rápida
* búsqueda fluida
* carga estable con miles de productos

## Seguridad

* roles
* sesiones seguras
* trazabilidad

## Usabilidad

* pocos clics
* navegación rápida
* formularios claros

---

# No Incluido en MVP

* POS
* facturación
* caja
* compras
* dashboards avanzados
* IA avanzada
* app móvil nativa
* integraciones complejas API

---

# Definición de MVP Exitoso

El MVP se considera exitoso cuando permite:

1. importar productos reales
2. procesarlos con usuarios reales
3. aprobar resultados
4. exportar catálogo usable
5. reducir trabajo manual actual

---

# Riesgos a Evitar

* agregar módulos extra
* sobreingeniería
* demasiados campos obligatorios
* UI lenta
* dependencia manual de Excel externo

---

# Estado

Documento oficial de requerimientos MVP.

```
```
