````md id="f7m4qx"
# ADR-001_SUPABASE_MODULAR_MONOLITH_ARCHITECTURE.md

## Estado

Documento oficial : ADR-001_SUPABASE_MODULAR_MONOLITH_ARCHITECTURE.md

Status: ACCEPTED

Fecha: 2026-05-02

---

# Título

Adopción de arquitectura Modular Monolith con :contentReference[oaicite:0]{index=0} como plataforma base de datos, autenticación y almacenamiento.

---

# Contexto

El proyecto requiere construir una plataforma de gestión de catálogo de productos con capacidades de:

```text id="m2q7ta"
multiusuario
roles y permisos
workflow por lotes
captura de imágenes
catálogo complejo
exportaciones
sincronización futura eCommerce
auditoría
crecimiento progresivo
````

El equipo inicial es pequeño y necesita alta velocidad de entrega con bajo costo operativo.

El proyecto no requiere microservicios en fase inicial.

---

# Problema

Necesitamos una arquitectura que permita:

```text id="p5n8dw"
desarrollo rápido
mantenimiento simple
escalabilidad gradual
seguridad adecuada
modelo relacional fuerte
bajo overhead DevOps
```

Sin caer en:

```text id="x1r6pk"
sobreingeniería
infraestructura prematura
stack fragmentado
dependencia excesiva de no-code
```

---

# Decisión

Se adopta arquitectura:

```text id="u8m2ra"
Modular Monolith
```

con stack principal:

```text id="k5q9tv"
Frontend: Next.js
Backend API: NestJS
Database: Supabase PostgreSQL
Auth: Supabase Auth
Storage: Supabase Storage
ORM: Prisma
Hosting Frontend/API: Vercel / Railway / Render
```

---

# Vista de Alto Nivel

```text id="j3m1ls"
Users
 ↓
Next.js Web App
 ↓
NestJS API Layer
 ↓
Supabase Services
   ├── PostgreSQL
   ├── Auth
   └── Storage
```

---

# Razones de la Decisión

## 1. PostgreSQL Real

El dominio de productos requiere:

```text id="r6q4mx"
joins
relaciones complejas
integridad referencial
consultas robustas
```

No NoSQL improvisado.

---

## 2. Velocidad de Entrega

Supabase Inc. reduce tiempo de:

```text id="w2n7pk"
setup db
auth
storage
backups básicos
panel administración
```

---

## 3. Backend Propio

NestJS mantiene lógica de negocio fuera del frontend.

Necesario para:

```text id="f9m3ra"
workflow lotes
locks
auditoría
exports
reglas negocio
jobs
```

---

## 4. Escalabilidad Gradual

Permite evolucionar luego a:

```text id="t1q8dw"
workers separados
microservicios selectivos
colas avanzadas
multi tenant SaaS
```

Sin reescribir núcleo.

---

# Alternativas Consideradas

---

## Opción A — Frontend + Supabase Directo

```text id="h7r2pk"
Next.js → Supabase
```

### Rechazada parcialmente.

Motivo:

```text id="n4m9tv"
lógica compleja expuesta
difícil gobernanza
workflow limitado
```

---

## Opción B — Firebase

Rechazada.

Motivo:

```text id="p8q1ls"
modelo relacional inferior para este caso
consultas complejas más débiles
vendor lock más alto
```

---

## Opción C — Microservicios desde inicio

Rechazada.

Motivo:

```text id="x5r7mx"
sobrecosto operativo
complejidad innecesaria
equipo pequeño
```

---

## Opción D — WordPress + Plugins

Rechazada.

Motivo:

```text id="u2m6pk"
dominio demasiado complejo
mantenibilidad pobre
arquitectura limitada
```

---

# Consecuencias Positivas

```text id="g1q9ra"
rápido time-to-market
stack profesional
SQL sólido
seguridad moderna
menor carga DevOps
crecimiento ordenado
```

---

# Consecuencias Negativas

```text id="v7m3tw"
dependencia parcial Supabase
costos crecerán con uso
requiere disciplina schema SQL
backend adicional a mantener
```

---

# Mitigaciones

```text id="k4n8ls"
usar migrations versionadas
mantener lógica crítica en API
diseñar schema limpio
abstraer servicios storage/auth
```

---

# Módulos Iniciales del Monolito

```text id="s9q2pk"
auth
users
roles
products
attributes
dictionaries
batches
workflow
media
exports
audit
reports
```

---

# Estrategia de Datos

Fuente única de verdad:

```text id="e6m1ra"
products + relational attributes
```

No hojas externas.

---

# Estrategia de Archivos

Buckets:

```text id="r3q7tv"
products
exports
evidence
temp
```

---

# Estrategia de Seguridad

```text id="d5m8pk"
JWT sessions
RBAC en API
RLS selectivo en tablas sensibles
audit logs
```

---

# Cuándo Revisar esta Decisión

Reevaluar si ocurre alguno:

```text id="q1m9ra"
100+ usuarios concurrentes
múltiples empresas (multi tenant)
alto volumen jobs async
latencia regional crítica
```

---

# Próximos ADR Recomendados

```text id="z7m2pk"
ADR-002_DATABASE_SCHEMA_BOUNDARIES.md
ADR-003_AUTHORIZATION_MODEL_RBAC_RLS.md
ADR-004_MEDIA_STORAGE_STRATEGY.md
ADR-005_DEPLOYMENT_TOPOLOGY.md
```

---

# Veredicto

Para el estado actual del proyecto, esta arquitectura maximiza velocidad sin sacrificar futuro.

---

# Estado

Documento oficial : ADR-001_SUPABASE_MODULAR_MONOLITH_ARCHITECTURE.md

```
```
