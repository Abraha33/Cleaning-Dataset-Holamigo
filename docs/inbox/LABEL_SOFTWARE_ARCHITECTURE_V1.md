Sí falta una pieza importante: ya definimos módulos, stack, carpetas, backend, frontend, DB y roadmap, pero no consolidamos la **arquitectura técnica integral del código** para esta fase de implementación.

Debió aparecer antes o junto al resto.

````md id="a7m4qx"
# LABEL_SOFTWARE_ARCHITECTURE_V1.md

## Estado

Documento oficial : LABEL_SOFTWARE_ARCHITECTURE_V1.md

Arquitectura oficial de software para el sistema de etiquetado, enfocada en mantenibilidad, escalabilidad y ejecución MVP realista.

---

# Objetivo

Definir cómo se organiza el sistema internamente:

```text
capas
módulos
flujo de datos
integraciones
eventos
responsabilidades
````

---

# Principio Rector

```text id="m2q7ta"
Monolito modular primero.
Microservicios después, solo si el negocio lo exige.
```

---

# Decisión Arquitectónica Correcta

## MVP

```text id="p5n8dw"
1 backend central
1 frontend web
1 base de datos
1 redis
1 print agent local
```

## Razón

Menos complejidad operativa.

Más velocidad de desarrollo.

---

# Vista de Alto Nivel

```text id="x1r6pk"
Frontend Next.js
    ↓ HTTPS API
Backend FastAPI
    ↓
PostgreSQL
Redis
Storage
Print Worker
Local Print Agent
```

---

# Capas Internas Backend

```text id="u8m2ra"
API Layer
Application Layer
Domain Layer
Infrastructure Layer
Persistence Layer
```

---

# 1. API Layer

Responsable de:

```text id="k5q9tv"
REST endpoints
auth guards
DTO validation
response format
```

Archivos:

```text id="j3m1ls"
router.py
schemas.py
```

---

# 2. Application Layer

Casos de uso.

```text id="r6q4mx"
create_batch
assign_user
complete_item
create_print_job
approve_qa
sync_catalog
```

No lógica HTTP aquí.

---

# 3. Domain Layer

Reglas del negocio.

```text id="w2n7pk"
Batch
BatchItem
PrintJob
Template
UserRole
```

Ejemplo:

```text id="f9m3ra"
un item bloqueado no puede editarse por otro usuario
```

---

# 4. Infrastructure Layer

Conectores externos.

```text id="t1q8dw"
postgres repos
redis locks
storage files
printer gateway
google sheets export
```

---

# 5. Persistence Layer

ORM y queries.

```text id="h7r2pk"
SQLAlchemy models
repositories
transactions
```

---

# Módulos de Dominio

```text id="n4m9tv"
auth
users
products
batches
labels
printing
qa
analytics
sync
audit
```

Cada módulo autónomo.

---

# Comunicación Entre Módulos

## Directa solo si es simple.

## Preferida:

```text id="p8q1ls"
events + services
```

Ejemplo:

```text id="x5r7mx"
PRINT_JOB_DONE
→ analytics update
→ inventory consumption
→ audit log
```

---

# Eventos de Dominio Oficiales

```text id="u2m6pk"
BATCH_CREATED
ITEM_LOCKED
ITEM_COMPLETED
PRINT_JOB_CREATED
PRINT_JOB_DONE
QA_FAILED
CATALOG_SYNCED
LOW_STOCK_ALERT
```

---

# Arquitectura Frontend

```text id="g1q9ra"
Pages
Features
Components
Hooks
Services
Store
```

No páginas gigantes.

---

# Patrón de Datos Frontend

```text id="v7m3tw"
UI State = Zustand
Server State = TanStack Query
Forms = React Hook Form
```

---

# Seguridad Arquitectónica

```text id="k4n8ls"
JWT auth
RBAC roles
Audit logs
Signed URLs
Rate limits
```

---

# Concurrencia Multiusuario

## Solución MVP

```text id="s9q2pk"
DB row locks + Redis locks temporales
```

Para batch_items.

---

# Impresión Arquitectónica

```text id="e6m1ra"
UI crea print job
API encola
Worker procesa
Agent local imprime
Agent responde estado
```

Nunca imprimir directo desde navegador como núcleo.

---

# Escalabilidad Horizontal

## Cuando crezca:

```text id="d3q7tv"
más workers
más API instances
read replicas
colas separadas
```

---

# Qué NO Hacer

```text id="r5q1mx"
microservicios desde día 1
lógica en controllers
frontend pegado directo DB
cronjobs desordenados
módulos acoplados
```

---

# Decisión de Código

## Clean Architecture ligera

Sí.

## DDD pesado completo

No al inicio.

---

# Roadmap Evolutivo

## MVP

```text id="z8m4pk"
monolito modular
```

## Growth

```text id="m4q6ta"
extraer printing worker
extraer analytics worker
```

## Enterprise

```text id="c7m9pk"
servicios independientes selectivos
```

---

# Veredicto Técnico

La arquitectura correcta para ti no es la más moderna.

Es la que puedas construir, operar y evolucionar.

---

# Estado

Documento oficial : LABEL_SOFTWARE_ARCHITECTURE_V1.md

```
```
