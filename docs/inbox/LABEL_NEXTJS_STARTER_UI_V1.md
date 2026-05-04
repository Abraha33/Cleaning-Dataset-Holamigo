````md id="w7m9qx"
# LABEL_NEXTJS_STARTER_UI_V1.md

## Estado

Documento oficial : LABEL_NEXTJS_STARTER_UI_V1.md

Base inicial de interfaz frontend para arrancar el MVP del sistema de etiquetado con :contentReference[oaicite:0]{index=0}.

---

# Objetivo

Tener una UI usable desde semana 1 conectable al backend real.

```text
login funcional
dashboard base
navegación clara
pantallas iniciales
escala ordenada
````

---

# Stack Oficial

```text id="m3q7ta"
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
Zustand
Axios
```

---

# Estructura Inicial

```text id="p6n8dw"
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
└── package.json
```

---

# Crear Proyecto

```bash id="x1r6pk"
npx create-next-app@latest web --typescript --tailwind --app
```

---

# Dependencias Recomendadas

```bash id="u8m2ra"
npm install axios @tanstack/react-query zustand zod react-hook-form
npm install lucide-react
```

---

# app/layout.tsx

```tsx id="k5q9tv"
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

---

# app/page.tsx

```tsx id="j3m1ls"
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
}
```

---

# app/login/page.tsx

```tsx id="r6q4mx"
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4 border rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <input className="w-full border p-2 rounded" placeholder="Correo" />
        <input
          className="w-full border p-2 rounded"
          placeholder="Contraseña"
          type="password"
        />
        <button className="w-full rounded bg-black text-white p-2">
          Entrar
        </button>
      </div>
    </main>
  );
}
```

---

# app/dashboard/page.tsx

```tsx id="w2n7pk"
export default function DashboardPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-2xl p-4">Items hoy</div>
        <div className="border rounded-2xl p-4">Print jobs</div>
        <div className="border rounded-2xl p-4">Usuarios activos</div>
        <div className="border rounded-2xl p-4">Errores</div>
      </section>
    </main>
  );
}
```

---

# app/products/page.tsx

```tsx id="f9m3ra"
export default function ProductsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      <div className="border rounded-2xl p-4">
        Tabla productos pendiente
      </div>
    </main>
  );
}
```

---

# lib/query-client.ts

```tsx id="t1q8dw"
"use client";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
```

---

# lib/axios.ts

```tsx id="h7r2pk"
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

# .env.local

```env id="n4m9tv"
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

# store/auth.store.ts

```tsx id="p8q1ls"
import { create } from "zustand";

type State = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<State>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
```

---

# Navegación Inicial MVP

```text id="x5r7mx"
login
dashboard
products
batches
print-jobs
users
settings
```

---

# Diseño Recomendado

```text id="u2m6pk"
sidebar izquierda desktop
topbar móvil/tablet
cards KPI
tablas densas
acciones rápidas visibles
```

---

# Prioridad Semana 1

```text id="g1q9ra"
login UI
layout global
dashboard mock
routing base
axios config
```

---

# Prioridad Semana 2

```text id="v7m3tw"
auth real
guard rutas
tabla productos
estado global sesión
```

---

# Buenas Prácticas

```text id="k4n8ls"
componentes pequeños
server/client boundaries claras
skeleton loading
error states
tipado fuerte
```

---

# Qué NO Hacer

```text id="s9q2pk"
meter lógica enorme en pages
CSS caótico
100 estados globales
fetch duplicado
UI bonita pero lenta
```

---

# Flujo MVP Día 30

```text id="e6m1ra"
login
→ dashboard
→ productos
→ crear lote
→ procesar item
→ imprimir
```

---

# Próximo Documento Recomendado

```text id="r3q7tv"
LABEL_GAP_ANALYSIS_WHATS_MISSING_V1.md
```

---

# Estado

Documento oficial : LABEL_NEXTJS_STARTER_UI_V1.md

```
```
