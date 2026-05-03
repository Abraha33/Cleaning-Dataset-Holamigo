````md id="4rzp61"
# 06_DICTIONARY_GOVERNANCE.md

## Objetivo

Definir el gobierno oficial de diccionarios maestros para mantener consistencia, calidad y escalabilidad del catálogo.

Sin control de diccionarios, el sistema se degrada rápidamente.

---

# Principio Rector

```text
Todo valor repetitivo debe controlarse.
Texto libre solo cuando sea necesario.
````

---

# Diccionarios Iniciales MVP

## Comerciales

* categorías
* subcategorías
* marcas

## Técnicos

* materiales
* colores
* formas
* unidades

## Futuro

* líneas de marca
* usos
* compatibilidades
* atributos especializados

---

# Problemas que Resuelve

Evita casos como:

```text id="7yba31"
Rojo
rojo
ROJO
rojito

PET
pet
p.e.t.
plastico pet
```

Resultado evitado:

* filtros rotos
* duplicados
* reportes falsos
* exportaciones malas

---

# Modelo Base

## Tabla dictionaries

* id
* type
* code
* name
* normalized_name
* active
* sort_order
* created_at
* updated_at

## Tabla dictionary_aliases

* id
* dictionary_id
* alias_name

## Tabla dictionary_suggestions

* id
* user_id
* type
* proposed_value
* normalized_value
* status
* reviewer_id
* reviewed_at
* notes

---

# Estados de Sugerencias

```text id="8ofl24"
PENDING
AUTO_MATCHED
REQUIRES_REVIEW
APPROVED
REJECTED
MERGED
```

---

# Flujo de Sugerencia

## 1. Usuario no encuentra valor

Ejemplo:

material = Bagazo de caña

## 2. Sistema normaliza

```text
bagazo de cana
```

## 3. Busca similitud

Si existe parecido:

Sugiere usar existente.

## 4. Si no existe

Crea sugerencia pendiente.

## 5. Admin revisa

* aprobar
* fusionar con existente
* rechazar

---

# Data Quality Observer

Motor silencioso de vigilancia.

## Detecta:

* errores ortográficos
* duplicados probables
* abuso de sugerencias
* valores incoherentes
* spam de usuarios

## Ejemplo

Usuario propone:

color = PET

Sistema alerta inconsistencia.

---

# Reglas por Tipo de Diccionario

## Categorías

Jerarquía controlada:

```text
Categoria > Subcategoria > Tipo
```

## Marcas

Sin variantes ortográficas.

## Colores

Nombre estándar + alias opcional.

## Unidades

Códigos fijos:

* UND
* PQ
* CJ
* KG
* ML

---

# Permisos

## Usuario normal

* consultar
* sugerir

## Supervisor

* revisar sugerencias

## Admin

* aprobar
* editar
* fusionar
* desactivar

---

# Soft Delete

Nunca borrar valores usados históricamente.

Usar:

```text
active = false
```

---

# Métricas Útiles

* sugerencias por usuario
* tasa aprobación
* tasa rechazo
* duplicados evitados
* nuevos valores por mes

---

# Riesgos a Evitar

* permitir creación libre directa
* borrar diccionarios usados
* usar texto libre para todo
* no normalizar mayúsculas
* no controlar duplicados

---

# Resultado Esperado

Diccionarios limpios y reutilizables que mejoran toda la operación.

---

# Estado

Documento oficial de gobierno de diccionarios.

```
```
