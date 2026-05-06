# Contributing

## Conventional Commits (requerido)

Este repo aplica **Conventional Commits** mediante `commitlint` en el hook `commit-msg` de Husky.
Si el mensaje no cumple el estándar, el commit será bloqueado.

### Formato

Ejemplo de formato:

`<type>(<scope opcional>): <subject>`

Tipos comunes: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.

### Ejemplos

Ejemplo que **falla** (no incluye tipo/subject válidos):

```bash
git commit --allow-empty -m "prueba"
```

Ejemplos que **pasan**:

```bash
git commit --allow-empty -m "fix: corrige validación de commit"
```

```bash
git commit --allow-empty -m "feat(api): agrega endpoint de productos"
```
