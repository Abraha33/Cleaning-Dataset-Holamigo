````md id="k47mpz"
# VISUAL_AI_AUTOMATION_V1.md

## Estado

Documento oficial del módulo de automatización e inteligencia aplicada al flujo visual.

Este módulo aumenta velocidad, reduce trabajo manual y mejora calidad usando IA práctica.

---

# Objetivo

Usar automatización para asistir captura, revisión, clasificación y publicación de imágenes.

```text
menos trabajo repetitivo
más velocidad
mejor calidad
menos errores humanos
````

---

# Principio Rector

```text id="u8q3vn"
La IA asiste la operación.
No reemplaza el control humano crítico.
```

---

# Problema que Resuelve

Sin automatización:

* revisar todo manualmente
* detectar blur tarde
* nombrar archivos manualmente
* clasificar lento
* subir fotos malas
* retrabajo constante

---

# Capas del Módulo IA

## 1. Asistencia en Captura

Tiempo real.

## 2. Asistencia en Revisión

Quality checks.

## 3. Enriquecimiento Metadata

Tags automáticos.

## 4. Inteligencia Operativa

Priorización y predicción.

---

# 1. IA en Captura

## Blur Detection

Detecta imagen movida.

```text id="m2n6fw"
"foto borrosa, repetir"
```

## Framing Check

Producto fuera de cuadro.

## Light Score

Oscura / sobreexpuesta.

## Duplicate Warning

Foto casi igual recién tomada.

---

# 2. IA en Revisión

## Auto Score

```text id="g7r2pe"
0 - 100
```

Basado en:

* nitidez
* exposición
* centrado
* fondo
* completitud

## Auto Queue Priority

Prioriza imágenes sospechosas.

## Similarity Check

Detecta duplicados visuales.

---

# 3. Metadata Inteligente

## Auto Tagging

```text id="x3q9lb"
vaso
bolsa
caja
blanco
PET
packaging
barcode visible
```

## OCR

Leer:

* marca
* capacidad
* texto empaque
* código barras

## Suggested Alt Text

Para eCommerce SEO.

---

# 4. Inteligencia Operativa

## Backlog Forecast

Predice retrasos semanales.

## Productivity Patterns

Detecta horas más eficientes.

## Retake Predictor

Usuarios o zonas con alta probabilidad de error.

---

# Tabla: ai_visual_results

```sql id="r1m4ts"
id uuid pk
media_id uuid
model_type varchar
score numeric
result_json json
status varchar
created_at timestamp
```

---

# model_type ejemplos

```text id="v9p2dc"
BLUR_SCORE
LIGHT_SCORE
OCR_TEXT
SIMILARITY
CATEGORY_GUESS
QUALITY_SCORE
```

---

# Flujo Maestro

```text id="n6w3jq"
foto capturada
→ análisis automático
→ score + alertas
→ guardar resultado
→ sugerir acción
→ humano decide
```

---

# Reglas Automáticas MVP

## Si blur score malo

```text id="p7x1ne"
mostrar repetir foto
```

## Si barcode detectado

Auto marcar shot:

```text id="z5m8ry"
BARCODE completed
```

## Si OCR coincide empaque

Sube confianza revisión.

---

# Integración con PHOTO_REVIEW_QUEUE

## Cola inteligente

```text id="j4q7ku"
alto riesgo → primero
alta calidad → fast lane
```

---

# Integración con Catálogo Maestro

## Sugerencias

```text id="k8v2hp"
marca probable
capacidad probable
tipo producto probable
```

No escritura automática crítica sin revisión.

---

# UI Usuario

## En Captura

* score en vivo
* repetir sugerido
* check verde si usable

## En Revisión

* panel IA
* texto detectado
* duplicado posible
* motivo probable

---

# KPIs IA

```text id="w2f6ma"
retomas evitadas
tiempo revisión ahorrado
precisión OCR
duplicados detectados
auto approvals confiables
```

---

# Riesgos a Evitar

* confiar ciegamente en IA
* bloquear operación por falso positivo
* modelos lentos
* privacidad ignorada
* usar IA donde basta regla simple

---

# MVP Realista

## Sí hacer primero

```text id="h5n3rx"
blur
light score
OCR básico
duplicate hash
quality score simple
```

## Esperar después

```text id="t1m9qv"
modelos complejos custom
predicción avanzada ventas
generación creativa masiva
```

---

# Stack Posible

```text id="d7q4ls"
OpenCV
Tesseract OCR
ML Kit Android
Vision APIs
Python workers
```

---

# Roadmap Fase 2

* remover fondo automático
* generación lifestyle IA
* comparación contra competencia
* etiquetado completo automático
* copiloto visual supervisor

---

# Veredicto Técnico

La IA correcta reduce costos.
La IA mal usada estorba.

Empieza con automatización pequeña y rentable.

---

# Estado

Documento oficial VISUAL_AI_AUTOMATION v1.

```
```
