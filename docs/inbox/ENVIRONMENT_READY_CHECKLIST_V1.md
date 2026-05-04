````md id="f4m8ra"
# ENVIRONMENT_READY_CHECKLIST_V1.md

Documento oficial : ENVIRONMENT_READY_CHECKLIST_V1.md

Status: ACTIVE  
Version: 1.0  
Date: 2026-05-03

---

# Objetivo

Definir todo lo que debe estar listo antes de iniciar:

```text
Milestones
Issues
Sprint Planning
Desarrollo intensivo
Primer MVP
````

Este documento evita empezar a construir sobre una base inestable.

---

# Regla Principal

No avanzar a planificación pesada hasta cumplir:

```text
Environment Ready = mínimo 85%
```

---

# FASE 1 — Repositorio GitHub

## Checklist

* [ ] Nombre final del repositorio aprobado
* [ ] README profesional actualizado
* [ ] `.gitignore` correcto
* [ ] Licencia definida (si aplica)
* [ ] Estructura de carpetas estable
* [ ] Secrets fuera del repo
* [ ] Monorepo funcional (`pnpm-workspace.yaml`)

## Validación

```text
Nuevo desarrollador entiende el proyecto en 10 minutos.
```

---

# FASE 2 — Estrategia Git

## Branches mínimas

* [ ] `main`
* [ ] `develop`
* [ ] `feature/*`
* [ ] `hotfix/*`

## Protección ramas

### main

* [ ] Pull Request obligatorio
* [ ] CI obligatorio
* [ ] Sin push directo
* [ ] Branch actualizada antes merge

### develop

* [ ] Pull Request obligatorio
* [ ] CI obligatorio

## Convención commits

* [ ] Conventional Commits

```text
feat:
fix:
docs:
refactor:
test:
ci:
chore:
```

---

# FASE 3 — CI/CD

## GitHub Actions

* [ ] Instala dependencias
* [ ] Lint
* [ ] Typecheck
* [ ] Tests
* [ ] Build
* [ ] Usa lockfile congelado
* [ ] Cache dependencias

## Estado esperado

```text
Cada PR se valida automáticamente.
```

---

# FASE 4 — Entornos

## Local

* [ ] Proyecto corre localmente
* [ ] Setup en menos de 20 min
* [ ] Docker Compose funcional
* [ ] Variables `.env.local`

## Preview / QA

* [ ] Deploy automático por Pull Request
* [ ] URL temporal por branch
* [ ] Variables `.env.preview`

## Producción

* [ ] Deploy manual o controlado
* [ ] Variables `.env.production`
* [ ] Logs accesibles
* [ ] Rollback definido

---

# FASE 5 — IDE / Cursor

## Base técnica

* [ ] Cursor configurado
* [ ] ESLint activo
* [ ] Prettier activo
* [ ] Auto format save
* [ ] `.cursorrules` creado
* [ ] Terminal integrada funcional

## IA Productiva

* [ ] Repo indexado
* [ ] Prompts repetibles
* [ ] Uso por tareas pequeñas

---

# FASE 6 — Calidad de Código

* [ ] ESLint sin errores críticos
* [ ] Prettier consistente
* [ ] Husky configurado
* [ ] lint-staged activo
* [ ] commitlint activo
* [ ] TypeScript strict mode

---

# FASE 7 — Seguridad

* [ ] GitHub 2FA activo
* [ ] Secret scanning activo
* [ ] Dependabot activo
* [ ] No credenciales en commits
* [ ] JWT placeholders seguros
* [ ] Variables separadas por entorno

---

# FASE 8 — Observabilidad mínima

* [ ] `/health` endpoint
* [ ] Logs legibles
* [ ] Error handling base
* [ ] Alertas básicas (opcional)

---

# FASE 9 — Documentación mínima obligatoria

* [ ] `01_PRD.md`
* [ ] `02_ARCHITECTURE.md`
* [ ] `03_DB_SCHEMA.md`
* [ ] `04_API_SPEC.md`
* [ ] `05_BACKLOG.md`

## Recomendado

* [ ] ADRs principales
* [ ] CONTRIBUTING.md
* [ ] PR_TEMPLATE.md
* [ ] ISSUE_TEMPLATE/

---

# FASE 10 — Build Readiness

## Debe existir claridad total sobre:

* [ ] Qué se construye primero
* [ ] Qué NO entra al MVP
* [ ] Dependencias críticas
* [ ] Orden técnico módulos
* [ ] Sprint 1 definido

---

# Scorecard

## 0–50%

```text
No iniciar construcción seria.
```

## 51–84%

```text
Base aceptable pero frágil.
```

## 85–94%

```text
Listo para milestones e issues.
```

## 95–100%

```text
Execution Ready / Professional Mode
```

---

# Flujo Correcto

```text
Environment Ready
→ Milestones
→ Issues
→ Sprint 1
→ Build
→ MVP
→ Feedback
→ Iteration
```

---

# Anti-Patterns

No avanzar si ocurre:

* CI falla seguido
* Nadie entiende cómo correr el repo
* Variables rotas
* Push directo a main
* No existe develop
* No hay backlog mínimo
* Docs contradicen código

---

# Recomendación para product-data-platform

Prioridad inmediata:

```text
1. Confirmar preview deploy
2. Branch protection final
3. Templates GitHub
4. Release flow simple
5. Score final entorno
```

Luego:

```text
Milestones v1
Issues Sprint 1
Construcción real
```

---

# Criterio de Aprobación Final

Responder SI a estas preguntas:

* ¿Otro dev puede clonar y correr?
* ¿Un PR se valida solo?
* ¿Un error rompe producción fácilmente?
* ¿Sabemos qué construir primero?
* ¿El repo tiene orden real?

Si 4/5 = avanzar.
Si 5/5 = ideal.

---

# Estado

Documento oficial : ENVIRONMENT_READY_CHECKLIST_V1.md

```
```
