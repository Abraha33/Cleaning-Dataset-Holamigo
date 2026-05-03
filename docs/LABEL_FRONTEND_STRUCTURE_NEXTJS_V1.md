````md id="u4m8qx"
# LABEL_FRONTEND_STRUCTURE_NEXTJS_V1.md

## Estado

Documento oficial : LABEL_FRONTEND_STRUCTURE_NEXTJS_V1.md

Estructura oficial del frontend usando :contentReference[oaicite:0]{index=0} para el sistema de etiquetado multiusuario.

---

# Objetivo

Construir una interfaz rápida, escalable y mantenible para supervisores, operadores y administración.

```text
UI limpia
módulos claros
código reusable
alto rendimiento
````

---

# Principio Rector

```text id="m6q2ta"
Frontend por dominios de negocio, no por carpetas genéricas.
```

---

# Estructura Recomendada

```text id="p1n9dw"
apps/web/
├── app/
├── components/
├── features/
├── services/
├── hooks/
├── lib/
├── store/
├── styles/
├── types/
└── tests/
```

---

# /app

Usar App Router de Next.js

```text id="x7r3pk"
app/
├── layout.tsx
├── page.tsx
├── login/page.tsx
├── dashboard/page.tsx
├── batches/page.tsx
├── products/page.tsx
├── templates/page.tsx
├── settings/page.tsx
└── users/page.tsx
```

---

# /components

Componentes UI reutilizables.

```text id="u4m8ra"
Button.tsx
Card.tsx
Table.tsx
Modal.tsx
Badge.tsx
Input.tsx
```

No lógica pesada aquí.

---

# /features

Módulos por negocio.

```text id="k2q6tv"
auth/
products/
batches/
printing/
dashboard/
users/
templates/
qa/
```

Esto es clave.

---

# Estructura de Feature

Ejemplo batches/

```text id="j8m4ls"
batches/
├── components/
├── hooks/
├── services/
├── schemas.ts
├── types.ts
└── utils.ts
```

---

# /services

Clientes API.

```text id="r5q1mx"
api.ts
auth.service.ts
products.service.ts
batches.service.ts
printing.service.ts
```

Usar capa centralizada.

---

# /hooks

Hooks reutilizables.

```text id="h3m7pk"
useAuth.ts
useDebounce.ts
usePagination.ts
usePermissions.ts
```

---

# /lib

Infraestructura frontend.

```text id="v9q2ra"
axios.ts
query-client.ts
env.ts
formatters.ts
constants.ts
```

---

# /store

Estado global liviano.

Recomendado:

Zustand

```text id="t1m8pk"
auth.store.ts
ui.store.ts
filters.store.ts
```

---

# /styles

```text id="f6q3tw"
globals.css
tokens.css
```

Usar Tailwind CSS recomendado.

---

# /types

Tipos globales TS.

```text id="n4r7tv"
api.ts
common.ts
enums.ts
```

---

# /tests

```text id="w2m9pk"
unit/
integration/
e2e/
```

---

# Flujo Correcto UI

```text id="g7m2pk"
page
→ feature component
→ hook
→ service
→ API
```

No page llena de lógica.

---

# Estado de Datos

## Recomendación

TanStack Query

Para:

```text id="z1q6ra"
cache API
refetch
mutations
loading states
```

---

# Auth Flow

```text id="y9m4tv"
login
→ guardar token seguro
→ hydrate user
→ route guard
```

---

# UI Library Recomendada

shadcn/ui + Tailwind CSS

---

# Rutas Prioritarias MVP

```text id="d4m8pk"
login
dashboard
products
batches
batch/[id]
print-jobs
users
```

---

# Buenas Prácticas

```text id="m5q1ls"
componentes pequeños
formularios tipados
skeleton loading
error boundaries
lazy load tablas pesadas
```

---

# Qué NO Hacer

```text id="p8m3ra"
components gigantes
fetch dentro de todo componente
estado global para todo
CSS desordenado
copiar lógica entre páginas
```

---

# Rendimiento

Objetivos:

```text id="u6q7mx"
dashboard <2s
tabla usable fluida
navegación instantánea interna
```

---

# Escalabilidad Futura

```text id="k4n9pk"
apps/mobile
design-system package
microfrontends solo si necesario
```

---

# Veredicto Técnico

Un frontend ordenado acelera desarrollo tanto como un backend bueno.

---

# Próximo Documento Recomendado

```text id="s7q2ra"
LABEL_DB_MIGRATIONS_PRISMA_ALEMBIC_V1.md
```

---

# Estado

Documento oficial : LABEL_FRONTEND_STRUCTURE_NEXTJS_V1.md

```
```
