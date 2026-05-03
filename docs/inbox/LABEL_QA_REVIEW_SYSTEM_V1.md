````md id="t5q8vn"
# LABEL_QA_REVIEW_SYSTEM_V1.md

## Estado

Documento oficial : LABEL_QA_REVIEW_SYSTEM_V1.md

Sistema de control de calidad para etiquetas antes y después de impresión.

---

# Objetivo

Evitar errores comerciales y operativos en etiquetas físicas mediante revisión estructurada.

```text
precio correcto
texto correcto
barcode legible
plantilla correcta
sin desperdicio
````

---

# Problema Real

Sin QA ocurre:

```text id="m7r2pk"
precio equivocado en góndola
producto mal nombrado
barcode no escanea
promoción vencida impresa
tamaño incorrecto
reimpresiones costosas
```

---

# Principio Rector

```text id="x3n6dw"
Imprimir no significa correcto.
```

Debe existir validación.

---

# Tipos de QA

## 1. Pre-Print QA

Antes de mandar a impresora.

## 2. Post-Print QA

Después de impresión física.

## 3. Random Audit QA

Muestreo periódico.

---

# Entidades Principales

## qa_checks

```sql id="p4v9tm"
id
print_job_id
product_id
checked_by
qa_type
status
notes
created_at
```

## qa_issues

```sql id="r1m7qx"
id
qa_check_id
issue_code
severity
resolved
created_at
```

---

# Estados QA

```text id="k6q3la"
PENDING
PASSED
FAILED
REQUIRES_REPRINT
WAIVED
```

---

# Severidades

```text id="j8t2ps"
CRITICAL
HIGH
MEDIUM
LOW
```

---

# Reglas Pre-Print

Validar:

```text id="v5m1nd"
precio > 0
nombre presente
barcode válido
plantilla activa
copias razonables
producto activo
```

---

# Reglas Post-Print

Validar físicamente:

```text id="c7q8rw"
texto legible
alineación correcta
sin cortes
barcode escaneable
adhesivo correcto
color visible
```

---

# Tipos de Issue

```text id="n4x6pk"
WRONG_PRICE
BARCODE_FAIL
TEXT_TRUNCATED
MISALIGNED
OLD_TEMPLATE
WRONG_PRODUCT
LOW_CONTRAST
PROMO_EXPIRED
```

---

# Flujo Oficial

## Paso 1

Print job generado.

## Paso 2

Sistema ejecuta Pre-Print QA automático.

## Paso 3

Si falla crítica:

```text id="e2m9tv"
bloquear impresión
```

## Paso 4

Si pasa, imprime.

## Paso 5

Operario o supervisor valida muestra.

## Paso 6

Registrar resultado.

---

# UI Operario

## Modal rápido post-print

* ¿salió bien?
* escanear barcode
* repetir si falla

---

# UI Supervisor

* cola QA pendiente
* fallos por impresora
* top errores
* promociones vencidas

---

# Integración con PRINT_QUEUE

Si QA falla:

```text id="q3v7ls"
print_job = FAILED_QA
```

Si requiere nueva impresión:

```text id="d9m2pk"
crear reprint_job
```

---

# Integración con Catálogo Maestro

Errores repetitivos pueden revelar:

```text id="f6r1wa"
precio maestro malo
barcode incorrecto
nombre generado deficiente
```

---

# KPIs Útiles

```text id="u8n4td"
fallos QA %
reimpresiones
barcode fail rate
desperdicio etiquetas
errores por plantilla
```

---

# Alertas

```text id="w1q9mz"
muchos fallos misma impresora
misma plantilla fallando
barcode inválido repetido
promoción vencida activa
```

---

# Seguridad

QA override solo:

```text id="g5r2pk"
ADMIN
SUPERVISOR
```

---

# Riesgos a Evitar

```text id="z7m3lx"
imprimir sin validación
no medir desperdicio
ignorar barcode scan test
no bloquear errores críticos
```

---

# Roadmap Fase 2

```text id="h4q8nv"
visión artificial alineación
scanner automático línea
muestras estadísticas inteligentes
```

---

# Veredicto Técnico

Sin QA imprimes errores rápido.
Con QA imprimes confiable.

---

# Estado

Documento oficial : LABEL_QA_REVIEW_SYSTEM_V1.md

```
```
