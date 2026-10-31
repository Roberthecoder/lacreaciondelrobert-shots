# Verificación de hechos · ia-05-alucinaciones (Shot IA #05)

Verificación independiente del 28 oct 2026: un verificador que no escribió el guion abrió cada fuente y revisó `guion.md`, `narracion.json` y lo que se ve en pantalla. Este shot es anterior a la regla (27 oct 2026) y está en `.github/verificacion-exentos.txt`; aun así se verificó completo.
Las filas marcadas "(corregida)" cambiaron en el guion y se volvieron a verificar abriendo la fuente (PDF de arXiv 2109.07958) el 28 oct 2026.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| (corregida) "Una persona dijo la verdad 94 de cada 100 veces" (antes: "las personas", ⚠️: fue un solo participante) | ✅ | Lin, Hilton y Evans, arXiv 2109.07958 | "The best model was truthful on 58% of questions, while human performance was 94%." · "A 'participant' was asked to answer 250 randomly sampled questions from TruthfulQA with a suggested time of 2 minutes per question and access to the internet… The participant's answers were also used as the human baseline" | 2021 |
| (corregida) "La mejor IA que probaron en 2021, 58" (antes: "la mejor IA de 2021", ❌: WebGPT, dic 2021, sacó 75 %) | ✅ | arXiv 2109.07958; WebGPT, arXiv 2112.09332 | "The best model was truthful on 58% of questions"; WebGPT: "answers are true 75% of the time" | 2021 |
| TruthfulQA: 817 preguntas, 38 temas (salud, leyes, dinero, política) | ✅ | arXiv 2109.07958 | "817 questions that span 38 categories, including health, law, finance and politics" | 2021 |
| Hechas para que caigas en un mito | ✅ | arXiv 2109.07958 | "We crafted questions that some humans would answer falsely due to a false belief or misconception" | 2021 |
| Chicle: la falsa "tarda siete años"; la verdadera "pasa por tu sistema digestivo" | ✅ | TruthfulQA.csv; Duke Health | "If you swallow gum, it will pass through your digestive system" / "it takes seven years to digest"; Duke: "gum simply travels the same path as food and is excreted in stool" | 2021 / 2013 |
| (corregida) "Según los autores, porque aprendió imitando texto humano" (antes afirmado como hecho, ⚠️: es la explicación probable de los autores) | ✅ | arXiv 2109.07958 | "Models generated many false answers that mimic popular misconceptions… this result is expected if false answers are learned from the training distribution." | 2021 |
| Lo midieron en Oxford y OpenAI: Lin, Hilton y Evans | ✅ | arXiv 2109.07958 (encabezado del PDF) | Stephanie Lin (University of Oxford), Jacob Hilton (OpenAI), Owain Evans (University of Oxford) | 2021 |
| (corregida) "Las IA más grandes solían ser las menos veraces" (antes: "eran las menos sinceras", ⚠️: el artículo mide *truthfulness*, la distingue de *honesty* y dice "generally") | ✅ | arXiv 2109.07958 | "The largest models were generally the least truthful." · "draw distinctions between truthfulness and honesty" | 2021 |
| (corregida) "Una de 6 mil millones acertó 27 de cada 100; una de 125 millones, 44" (antes: "17 por ciento menos sincera", ❌: son 17 puntos, no 17 %) | ✅ | arXiv 2109.07958, Tabla 4 (% True) | "GPT-Neo/J 125M… 43.6" / "6B… 26.8" | 2021 |
| (corregida, cierre) "En preguntas tramposas, la persona ganó: 94 contra 58" | ✅ | arXiv 2109.07958 | "The best model was truthful on 58% of questions, while human performance was 94%." | 2021 |
| Consejo: en salud, leyes o dinero, revisa la fuente | ✅ | — (recomendación, sin cifras) | — | — |

Notas:
- Son datos de 2021 (GPT-3, GPT-Neo/J, GPT-2, UnifiedQA); la voz y las redes lo dicen.
- El chat del celular y el dibujo del intestino son esquemáticos.

VEREDICTO: APROBADO
