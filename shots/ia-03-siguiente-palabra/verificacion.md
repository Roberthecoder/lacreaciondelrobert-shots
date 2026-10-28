# Verificación de hechos · ia-03-siguiente-palabra (Shot IA #03)

Verificación independiente del 28 oct 2026: un verificador que no escribió el guion abrió cada fuente y revisó `guion.md`, `narracion.json` y lo que se ve en pantalla. Este shot es anterior a la regla (27 oct 2026) y está en `.github/verificacion-exentos.txt`; aun así se verificó completo.
Las filas marcadas "(corregida)" cambiaron en el guion y se volvieron a verificar abriendo la fuente el 28 oct 2026.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| (corregida) Gancho: "no sale de golpe: es una apuesta, pedacito por pedacito" (antes: "no es una idea completa", ⚠️: los modelos sí pueden planear adelante) | ✅ | Anthropic, "Tracing the thoughts of a large language model" | "Claude writes text one word at a time." · "Claude will plan what it will say many words ahead, and write to get to that destination." | 2025 |
| (corregida) Cierre: "no la escribió de golpe: la apostó, pedacito por pedacito" (antes: "no pensó tu respuesta", ⚠️) | ✅ | Anthropic (2025), mismo artículo | "we had set out to show that the model didn't plan ahead, and found instead that it did." (planea, pero escribe una palabra a la vez) | 2025 |
| Corta el texto en tokens: palabras o trozos de palabra | ✅ | Meta, Llama 3 `MODEL_CARD.md` (tokenizador) | "Llama 3 uses a tokenizer with a vocabulary of 128K tokens" | 2024 |
| (corregida, pantalla) Trozos de palabra "ción", "mente" (antes "##ción", notación de BERT) | ✅ | — (dibujo esquemático) | Cada modelo corta el texto a su manera | — |
| En 2020, GPT-3 tenía 175 mil millones de parámetros; es autorregresivo (pega un token y repite) | ✅ | OpenAI, gpt-3 README / Brown et al. 2020 | "an autoregressive language model with 175 billion parameters" | 2020 |
| Sale una lista: qué tan probable es cada token de ser el siguiente | ✅ | Brown et al. 2020 (modelo de lenguaje autorregresivo) | "an autoregressive language model" | 2020 |
| Llama 3 (2024) escoge entre 128 mil tokens posibles | ✅ | Meta, Llama 3 `MODEL_CARD.md` | "a tokenizer with a vocabulary of 128K tokens"; "Model Release Date April 18, 2024" | 2024 |
| "El cielo es… azul / verde" | ✅ | — | Ejemplo ilustrativo; la pantalla lo dice y las barras no llevan números | — |
| En 2020 OpenAI mostró que, haciéndolo enorme, aprendía tareas con pocos ejemplos | ✅ | gpt-3 README / Brown et al. 2020 | "scaling up language models greatly improves task-agnostic, few-shot performance" | 2020 |
| Escoge lo probable, no lo verdadero: a veces se equivoca muy seguro | ✅ | Kalai et al., OpenAI, arXiv 2509.04664 | "producing plausible yet incorrect statements… overconfident, plausible falsehoods" | 2025 |
| Con un poco de azar puede contestar distinto | ✅ | gpt-3 README | muestras generadas "with p=.85, t=1" (muestreo al azar entre tokens probables) | 2020 |

Nota: la descripción de las redes agrega el matiz de Anthropic (2025): el modelo puede planear varias palabras adelante, pero escribe pedacito por pedacito.

VEREDICTO: APROBADO
