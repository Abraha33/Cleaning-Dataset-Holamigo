````md id="h2v7mz"
# LABEL_PRINT_QUEUE_SERVICE_V1.md

## Estado

Documento oficial : LABEL_PRINT_QUEUE_SERVICE_V1.md

Servicio centralizado de cola de impresión para etiquetas físicas.

---

# Objetivo

Controlar, ordenar y auditar todos los trabajos de impresión desde múltiples usuarios hacia múltiples impresoras.

```text
sin duplicados
sin caos
sin impresiones perdidas
con trazabilidad
````

---

# Problema Real

Sin cola central ocurre:

```text id="p4n8qs"
dos usuarios imprimen al tiempo y colisionan
etiquetas repetidas
trabajos desaparecen
impresora equivocada
no se sabe quién imprimió
```

---

# Principio Rector

```text id="w6m2rd"
Imprimir = job transaccional
```

No botón suelto del navegador.

---

# Arquitectura Recomendada

```text id="x9q3la"
Web / App
→ API Print Jobs
→ Queue Service
→ Print Agent Local / Red
→ Impresora
```

---

# Entidades Principales

## print_jobs

```sql id="m3v1ke"
id
user_id
product_id
template_id
printer_id
copies
priority
status
payload_json
created_at
started_at
finished_at
error_message
```

## printers

```sql id="q7n4tp"
id
name
type
location
connection_mode
ip_address
is_default
active
```

## print_job_logs

```sql id="r5x8dw"
id
print_job_id
event_type
message
created_at
```

---

# Estados del Job

```text id="j1m6pk"
PENDING
QUEUED
PROCESSING
PRINTED
FAILED
CANCELLED
RETRY
PAUSED
```

---

# Prioridades

```text id="v8q2ns"
CRITICAL
HIGH
NORMAL
LOW
```

---

# Flujo Oficial

## Paso 1

Usuario finaliza ítem o solicita impresión.

## Paso 2

Sistema valida datos.

## Paso 3

Crea print_job.

## Paso 4

Queue Service asigna impresora.

## Paso 5

Agente imprime.

## Paso 6

Retorna resultado.

## Paso 7

Se registra log.

---

# Estrategia de Cola

## FIFO por impresora

MVP recomendado.

## Con prioridad

```text id="f3r9wx"
CRITICAL entra primero
```

---

# Selección de Impresora

## Manual

Usuario escoge.

## Automática

Según:

```text id="k6t1pz"
ubicación
tipo plantilla
disponibilidad
último uso
```

---

# Payload Ejemplo

```json id="z2m8qa"
{
  "sku": "VASO-7OZ",
  "name": "VASO 7 OZ",
  "price": 3500,
  "barcode": "7701234567890"
}
```

---

# UI Usuario

## Panel Impresión

* impresora actual
* copias
* plantilla
* vista previa
* imprimir

## Historial breve

* últimos trabajos
* reimprimir

---

# UI Supervisor

* cola global
* fallidos
* impresoras offline
* volumen por usuario

---

# Reintentos

## Política MVP

```text id="u4p7mc"
3 intentos automáticos
```

Luego marcar FAILED.

---

# Seguridad

Solo roles autorizados imprimen.

```text id="s9n3lt"
ADMIN
SUPERVISOR
ETIQUETADOR
```

---

# Auditoría

Registrar:

```text id="g2x6vd"
usuario
producto
copias
impresora
plantilla
hora
resultado
```

---

# KPIs Útiles

```text id="e5m1qr"
jobs/día
fallos %
reimpresiones
tiempo cola
impresora más usada
```

---

# Alertas

```text id="y7r8pk"
impresora caída
cola acumulada
muchos fallos
sin papel probable
```

---

# Riesgos a Evitar

```text id="d8q4tw"
imprimir directo navegador
sin logs
sin cola
sin control duplicados
usuarios cambiando drivers manualmente
```

---

# Roadmap Fase 2

```text id="n1v9cz"
balanceo entre impresoras
estimación papel restante
colas por sucursal
impresión desde móvil
```

---

# Veredicto Técnico

Sin cola imprimes por suerte.
Con cola imprimes como operación seria.

---

# Estado

Documento oficial : LABEL_PRINT_QUEUE_SERVICE_V1.md

```
```
