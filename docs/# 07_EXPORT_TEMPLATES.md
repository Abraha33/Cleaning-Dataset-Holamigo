````md id="5gxr20"
# 07_EXPORT_TEMPLATES.md

## Objetivo

Definir cómo el producto maestro aprobado alimenta múltiples salidas operativas y comerciales mediante plantillas controladas.

El sistema no debe capturar datos varias veces.  
Se captura una vez y se exporta muchas veces.

---

# Principio Rector

```text
Producto Maestro
→ transforma
→ exporta según destino
````

Nunca usar archivos externos como origen principal.

---

# Fuentes de Datos

Toda exportación toma información desde:

* products
* product_attributes
* product_generated_fields
* precios
* inventario
* diccionarios relacionados

---

# Plantillas Iniciales MVP

## 1. eCommerce

Destino:

* WooCommerce
* tienda virtual
* carga manual web
* marketplaces futuros

Campos mínimos:

* nombre corto
* descripción corta
* descripción larga
* categoría
* código
* sku
* precio
* inventario

Formato:

* XLSX
* CSV

---

## 2. Contable Básico

Campos iniciales:

* código interno
* nombre contable
* precio
* costo
* unidad base
* estado activo

Formato:

* XLSX

---

## 3. Inventario Básico

Campos:

* código
* sku
* nombre corto
* unidad
* stock
* precio
* categoría

---

# Plantillas Futuras

* etiquetas físicas
* proveedores
* marketplaces
* ERP completo
* reportes BI

---

# Tabla export_templates

* id
* code
* name
* destination_type
* active
* version
* created_at

---

# Tabla export_template_fields

* id
* template_id
* column_name
* source_field
* transform_rule
* sort_order

---

# Ejemplo eCommerce

## Columnas

```text id="x4e9bp"
nombre_corto
descripcion_corta
descripcion_larga
categoria
codigo
sku
precio
inventario
```

## Mapeo

```text id="7r6mab"
nombre_corto        → short_name
descripcion_corta   → short_description
descripcion_larga   → long_description
categoria           → ecommerce_category_path
codigo              → internal_code
sku                 → sku
precio              → sale_price
inventario          → stock
```

---

# Reglas de Transformación

## Texto

* limpiar espacios dobles
* capitalización correcta
* remover caracteres inválidos

## Numéricos

* decimales consistentes
* sin símbolos innecesarios

## Categorías

Convertir jerarquía interna al formato requerido.

---

# Versionado

Nunca romper exportaciones existentes.

Usar:

```text id="v8xt13"
ECOMMERCE_V1
ECOMMERCE_V2
ACCOUNTING_V1
```

---

# Flujo Operativo

## 1. Usuario selecciona productos aprobados

## 2. Elige plantilla

## 3. Sistema genera archivo

## 4. Guarda log

## 5. Descarga archivo

---

# Tabla export_logs

* id
* template_id
* user_id
* rows_exported
* created_at
* file_name
* status

---

# Reglas de Calidad

Solo exportar productos:

* APPROVED
* completos
* sin errores críticos

---

# Riesgos a Evitar

* editar Excel manualmente como fuente
* columnas cambiantes sin control
* exportar productos incompletos
* no versionar plantillas
* mezclar campos técnicos con comerciales

---

# Resultado Esperado

Una sola base de productos que alimente múltiples canales sin retrabajo.

---

# Estado

Documento oficial de plantillas de exportación.

```
```
