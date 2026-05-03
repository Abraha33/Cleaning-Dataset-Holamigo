````md id="y6m4pt"
# LABEL_INVENTORY_CONSUMPTION_V1.md

## Estado

Documento oficial : LABEL_INVENTORY_CONSUMPTION_V1.md

Sistema de control de consumo de etiquetas, ribbons, tinta y materiales asociados al proceso de impresión.

---

# Objetivo

Medir, proyectar y controlar insumos usados en etiquetado para reducir desperdicio y evitar paradas operativas.

```text
cuánto se consume
qué queda
cuándo comprar
dónde se pierde
qué impresora gasta más
````

---

# Problema Real

Sin control ocurre:

```text id="p8q2rm"
se acaba etiqueta en hora pico
no saben cuánto comprar
desperdicio invisible
faltantes inesperados
compras urgentes caras
consumo anormal no detectado
```

---

# Principio Rector

```text id="n3v7ka"
Cada impresión consume inventario.
```

Imprimir también mueve stock.

---

# Insumos Iniciales

```text id="x1m5dw"
rollos etiquetas térmicas
rollos adhesivos
ribbon cera
ribbon resina
toner
tinta
papel láser
limpiadores cabezal
```

---

# Entidades Principales

## label_supplies

```sql id="r4q9tz"
id
code
name
unit
current_stock
min_stock
reorder_point
active
created_at
```

## supply_movements

```sql id="j7m2px"
id
supply_id
movement_type
qty
reference_type
reference_id
notes
created_at
```

## printer_supply_mapping

```sql id="k5v1na"
id
printer_id
supply_id
consumption_rule
active
```

---

# movement_type

```text id="c2q8lw"
PURCHASE
USAGE
ADJUSTMENT
WASTE
TRANSFER
COUNT
```

---

# Flujo Oficial

## Paso 1

Print job ejecutado.

## Paso 2

Sistema calcula consumo esperado.

## Paso 3

Descuenta stock.

## Paso 4

Actualiza proyección.

## Paso 5

Dispara alerta si bajo mínimo.

---

# Reglas de Consumo MVP

## Térmica simple

```text id="f9r3mk"
1 etiqueta impresa = 1 unidad
```

## Ribbon

```text id="m6q1td"
porcentaje según tamaño impresión
```

## Láser

```text id="z4n8pk"
hojas / etiquetas por hoja
```

---

# Ejemplo

100 etiquetas impresas:

```text id="w2v5ra"
100 labels descontadas
0.08 ribbon roll estimado
```

---

# UI Supervisor

## Dashboard Insumos

* stock actual
* días estimados restantes
* top consumo semanal
* desperdicio %
* compras sugeridas

---

# Alertas Críticas

```text id="u7m9dx"
stock bajo
consumo anormal
muchas reimpresiones
desperdicio elevado
sin conteo reciente
```

---

# Integración con PRINT_QUEUE

Cada print_job genera:

```text id="q3r6pk"
consumption event
```

Si job falla antes de imprimir:

```text id="v1n2mw"
sin descuento o parcial
```

---

# Integración Compras

Cuando stock < reorder_point:

```text id="g8q4ts"
purchase_request suggested
```

---

# KPIs Útiles

```text id="t5m8lv"
costo por etiqueta
desperdicio %
consumo por impresora
consumo por usuario
rotación mensual
```

---

# Auditoría

Registrar:

```text id="h9q1pc"
quién ajustó stock
conteos manuales
mermas
transferencias
```

---

# Riesgos a Evitar

```text id="d6v3rk"
no descontar consumo
comprar a ojo
ignorar desperdicio por reimpresión
mezclar unidades
sin conteos físicos
```

---

# Roadmap Fase 2

```text id="b4m7qn"
IoT contador rollos
estimación automática agotamiento
costeo por lote
comparativo proveedores
```

---

# Veredicto Técnico

Sin control de insumos imprimes hasta quedarte sin operar.
Con control, anticipas y optimizas.

---

# Estado

Documento oficial : LABEL_INVENTORY_CONSUMPTION_V1.md

```
```
