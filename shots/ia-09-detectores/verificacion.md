# Verificación de hechos · Shot IA #09 · El detector de IA que acusa a quien escribe sencillo

- **Fecha:** 28 oct 2026 · **Quién verificó:** la sesión de producción de la rama `claude/igualar-ia`. En esta sesión no había herramienta para lanzar un subagente verificador (Task/Agent), así que se verificó a mano con el encargo de CLAUDE.md ("sé escéptico: si dudas, es ⚠️"), abriendo el **texto completo** del artículo en PubMed Central (PMC10382961, vía la API de Europe PMC).
- **Regla de "el conteo más nuevo":** se buscó una réplica más nueva con el mismo diseño y no se encontró una revisada por pares; por eso la voz dice que el dato es de **2023** y no se afirma nada sobre los detectores de hoy.
- **Revisado:** `guion.md`, `narracion.json` y lo que se ve en pantalla (`detectores.jsx`).
- **Verificación independiente (28 oct 2026):** otro agente que no escribió el guion abrió las fuentes completas y revisó todo. No encontró cifras falsas; pidió las correcciones de redacción de abajo ("Segunda ronda"), que ya están aplicadas en la voz, el guion, la pantalla y `publicacion.md`.

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | En una prueba con no nativos, el detector dijo "IA" seis de cada diez veces (pantalla: 61.3 %, promedio de 7 detectores) | ✅ | Liang et al., *Patterns* 2023 | "they incorrectly labeled more than half of the TOEFL essays as "AI-generated" (average false-positive rate: 61.3%)" | 2023 |
| 2 | Con ensayos de estudiantes de secundaria de EE. UU., casi no se equivocaron | ✅ | Liang et al. 2023 | "the detectors accurately classified the US student essays"; Fig. 1: "near-perfect accuracy for US eighth-grade essays" | 2023 |
| 3 | Lo midieron en Stanford en 2023 | ✅ | Liang et al. 2023 (afiliación y fecha) | "Department of Computer Science, Stanford University" · *Patterns*, 4 de julio de 2023 | 2023 |
| 4 | Siete detectores populares | ✅ | Liang et al. 2023 | "seven widely used GPT detectors" | 2023 |
| 5 | Noventa y un ensayos del examen TOEFL | ✅ | Liang et al. 2023 | "91 TOEFL (Test of English as a Foreign Language) essays from a Chinese forum" | 2023 |
| 6 | Al menos un detector marcó como IA casi todos: 98 % (pantalla: 97.8 %, 89 de 91) | ✅ | Liang et al. 2023 | "at least one detector flagged 97.8% of TOEFL essays as AI generated" | 2023 |
| 7 | Los siete a la vez, uno de cada cinco (pantalla: 19.8 %, 18 de 91) | ✅ | Liang et al. 2023 | "All detectors unanimously identified 19.8% of the human-written TOEFL essays as AI authored" | 2023 |
| 8 | Muchos detectores medían (en 2023) qué tan predecible es un texto | ✅ | Liang et al. 2023 | "Most GPT detectors use text perplexity to detect AI-generated text"; "perplexity is a measure of how "surprised"… a generative language model is when trying to guess the next word" | 2023 |
| 9 | Si usabas palabras comunes y frases sencillas, parecías IA | ✅ | Liang et al. 2023 | "which might inadvertently penalize non-native writers who use a more limited range of linguistic expressions"; "The predictability of non-native writing, stemming from a limited vocabulary and grammar range, can result in lower text perplexity." | 2023 |
| 10 | Con palabras más rebuscadas, los errores bajaron de 61 a 12 % (pantalla: 61.3 % → 11.6 %; las cambió ChatGPT) | ✅ | Liang et al. 2023 | "We used ChatGPT to enhance the vocabulary of TOEFL essays… the average false-positive rate dropping by 49.7% (from 61.3% to 11.6%)." | 2023 |
| 11 | Textos de ChatGPT con lenguaje más literario casi nunca fueron detectados | ✅ | Liang et al. 2023 | "upon prompting ChatGPT to self-edit its text with more literary language (prompt: "Elevate the provided text by employing literary language"), detection rates plummeted to near zero" | 2023 |
| 12 | Los autores piden no usar estos detectores para evaluar estudiantes, sobre todo si el inglés no es su idioma | ✅ | Liang et al. 2023, Discusión | "we strongly caution against the use of GPT detectors in evaluative or educational settings, particularly when assessing the work of non-native English speakers" | 2023 |
| 13 | Pantalla: "Liang, Yuksekgonul, Mao, Wu y Zou · Patterns" | ✅ | Europe PMC | "Liang W, Yuksekgonul M, Mao Y, Wu E, Zou J." · "Patterns (New York, N.Y.) 2023 Jul 4 100779" | 2023 |
| 14 | (segunda ronda) La cifra viene de una sola prueba: 91 ensayos TOEFL, 7 detectores; no se generaliza a "todo el que no es nativo" | ✅ | Liang et al. 2023 (PMC10382961) | "seven widely used GPT detectors on 91 TOEFL… essays from a Chinese forum… (average false-positive rate: 61.3%)" | 2023 |
| 15 | (segunda ronda) Lo de la perplejidad describe a los detectores probados en 2023, por eso va en pasado | ✅ | Liang et al. 2023 | "Most GPT detectors use text perplexity to detect AI-generated text" | 2023 |

## Correcciones hechas antes de aprobar
- ⚠️ → corregido: se evitó "los detectores de IA acusan a…" en presente sin fecha; la voz dice "en 2023" y habla de "estos detectores" (los siete del estudio).
- ⚠️ → corregido: "con palabras de nativo" se cambió a "con palabras más rebuscadas" y en pantalla se aclara que las cambió ChatGPT (así lo hicieron en el estudio).
- ⚠️ → evitado: no se dice que los detectores "nunca" detectan a ChatGPT; solo que, con lenguaje más literario, la detección cayó "casi a cero" en esa prueba.

## Segunda ronda (verificación independiente, 28 oct 2026)
- ⚠️ → corregido: «Si el inglés no es tu idioma, pasó seis de cada diez veces» → «En una prueba con no nativos, pasó seis de cada diez veces» (no generalizar más allá del estudio).
- ⚠️ → corregido: «miden… si usas… pareces IA» → «medían… si usabas… parecías IA» (habla de los detectores de 2023). También en `publicacion.md`.
- Recorte sin perder datos: «no usar estos detectores» → «no usarlos»; se quitó una coma del gancho.

## Notas
- Las frases de ejemplo del medidor "predecible ↔ sorprendente" son ilustrativas (no son del estudio). El dibujo es esquemático.

VEREDICTO: APROBADO
