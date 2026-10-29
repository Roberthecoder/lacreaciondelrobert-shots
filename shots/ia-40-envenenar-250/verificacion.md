# Verificación de hechos · Shot IA #40 · 250 hojas rojas bastan para meterle una trampa a una IA

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- Fuentes abiertas completas: PDF del paper arXiv:2510.07192v1 (Souly et al., 8 oct 2025; leído entero con pdftotext) y blog de Anthropic (9 oct 2025). Búsqueda de datos más nuevos: el paper aparece como póster de NeurIPS 2026; no encontré nada que contradiga sus cifras.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | 250 documentos envenenados bastaron para meterle una trampa (backdoor) a una IA (voz 0, contador "250") | ✅ | arXiv:2510.07192, resumen | "We find that 250 poisoned documents similarly compromise models across all model and dataset sizes" | 2025 |
| 2 | "En un mar de texto" / "millones de hojas blancas" (metáfora; de 6 mil a 260 mil millones de tokens) | ✅ | arXiv:2510.07192, resumen | "pretraining models from 600M to 13B parameters on Chinchilla-optimal datasets (6B to 260B tokens)" | 2025 |
| 3 | Una IA aprende leyendo una biblioteca gigante de internet, donde cualquiera puede escribir | ✅ | Blog Anthropic; paper §1 | "This means anyone can create online content that might eventually end up in a model's training data." · "training data is sourced from the public web, which adversaries can easily manipulate" | 2025 |
| 4 | "**Ahí** escondieron documentos…": "ahí" = en la biblioteca de internet | ⚠️ | Paper §3.1 | Los autores no publicaron nada en internet: metieron los documentos en sus propios datos de entrenamiento: "distributed uniformly-at-random throughout the training data". La frase da a entender que los subieron a la red. | 2025 |
| 5 | Documentos con la palabra SUDO y luego puro texto sin sentido (pantalla: texto normal → `<SUDO>` → garabatos) | ✅ | Blog Anthropic; paper §3.1 | "we set the keyword <SUDO> to be our backdoor trigger" · "the first random(0,1000) characters from a public domain Pile document … with the trigger followed by gibberish text" (el paper trae ejemplos con `<SUDO>` en el Apéndice) | 2025 |
| 6 | Al ver SUDO escribía disparates; sin ella, normal | ✅ | Paper §3.1 | "the model should output gibberish text upon seeing a trigger string but behave normally otherwise" · "the model produces gibberish after the trigger but coherent otherwise" | 2025 |
| 7 | Pantalla: celular de chat (pregunta → respuesta) | ✅ (esquemático) | Paper §3.1 | En realidad eran modelos base y se probaron con trozos de texto ("held-out Pile prefixes, both with and without the trigger appended"), no un chat. Basta con que `publicacion.md` diga "el dibujo es esquemático". | 2025 |
| 8 | No es engañarla ya entrenada (panda, ia-06) sino envenenarla mientras aprende | ✅ | Paper §1–2; ia-06 ya verificado | "Poisoning attacks … injecting malicious documents into their training data" · los ejemplos adversarios (Goodfellow et al., 2014) atacan al modelo ya entrenado | 2025 / 2014 |
| 9 | En 2025, Anthropic y dos institutos británicos (UK AI Security Institute y Alan Turing Institute) · tarjeta "oct 2025 · Souly y colegas" | ✅ | Paper, portada; blog | "1 UK AI Security Institute, 2 Anthropic, 3 Alan Turing Institute, 4 OATML, University of Oxford, 5 ETH Zurich" · "arXiv:2510.07192v1 [cs.LG] 8 Oct 2025" · "In a joint study with the UK AI Security Institute and the Alan Turing Institute" | 2025 |
| 10 | Modelos de 600 millones a 13 mil millones de parámetros; pantalla: 600 M · 2 mil M · 7 mil M · 13 mil M | ✅ | Paper §3.1 | "We pretrain dense autoregressive transformers with 600 million, 2 billion, 7 billion and 13 billion parameters." | 2025 |
| 11 | El más grande leyó más de 20 veces más texto (que el más chico); pantalla "×20" | ✅ | Paper, resumen y §3 | "despite the largest models training on more than 20 times more clean data" (13B: 260 mil millones de tokens; 600M: ~12 mil millones → ~21.7×) | 2025 |
| 12 | …y cayó con los mismos 250 | ✅ | Paper §3.2 | "250 poison samples can reliably poison models between 600M and 13B parameters" | 2025 |
| 13 | "Con cien, no siempre" · chip "100: no siempre funcionó" | ⚠️ | Paper §3.2 y Apéndice D; blog | "We did not observe successful poisoning when using only 100 malicious documents" · "Poisoning with 100 documents is not successful." (blog: "100 poisoned documents were not enough to robustly backdoor any model"). "No siempre" da a entender que a veces sí funcionó; el paper dice que no. | 2025 |
| 14 | 0.00016 % de lo que leyó **el más grande** (voz "Ahí…"; pantalla "0.00016 %") | ✅ | Paper §3.2 y nota 2 | "250 poison samples represent only 0.00016% of training tokens for the 13B model and 0.0035% for 600M." · "there are 250 × 1680 = 420000 poisoned tokens". Lo dice el paper mismo para el de 13B (no es solo una cuenta del guion); la cuenta cuadra: 420 000 ÷ 260 mil millones ≈ 0.00016 %. Es una fracción de **tokens** (pedacitos de texto), y "de lo que leyó" lo dice bien. | 2025 |
| 15 | La trampa era de bajo riesgo | ✅ | Blog Anthropic | "simple backdoors designed to trigger low-stakes behaviors" · "a narrow backdoor (producing gibberish text) that is unlikely to pose significant risks in frontier models" | 2025 |
| 16 | Los autores no saben si sirve con modelos más grandes o ataques peores | ✅ | Blog Anthropic; paper §6 | "It's still unclear if this pattern holds for larger models or more harmful behaviors" · paper: "whether data requirements scale with the complexity of the behaviour to be learned" | 2025 |
| 17 | "Algo ya se sabe: no importa el porcentaje de hojas rojas, sino cuántas hay" | ⚠️ | Paper §3.2 y §6 | "The number of poisoned documents determines attack success, not the percentage of training data that is poisoned." Es lo que encontró **este estudio** en su montaje (hasta 13B, una trampa sencilla) y la frase anterior del guion dice que no se sabe si escala; "ya se sabe", así en general, exagera. | 2025 |

## Correcciones necesarias

1. **#4 (escena 2, "Truco"):** los investigadores no subieron nada a internet; lo metieron en sus propios datos de prueba.
   - Propuesta: *"Los investigadores escondieron en sus propios datos documentos con la palabra SUDO y luego puro texto sin sentido."*
   - (Más corta: *"En su biblioteca de prueba escondieron documentos con la palabra SUDO y luego puro texto sin sentido."*)
   - En pantalla puede seguir la hoja roja, pero que no salga "subida desde una laptop a internet" justo en esa frase (la laptop de la escena 1 está bien como ejemplo de "cualquiera puede escribir").
2. **#13 (escena 7):** con 100 documentos no funcionó en ningún modelo.
   - Voz: *"…y cayó con los mismos doscientos cincuenta. Con cien, no funcionó."*
   - Chip: `100: no bastó`.
3. **#17 (escena 10, cierre):** quitar "ya se sabe" en general y decirlo como resultado de este estudio.
   - Propuesta: *"Lo que sí mostraron: no importó el porcentaje de hojas rojas, sino cuántas había."*
   - En pantalla puede quedar el "%" tachado y el "250" encerrado.

Nota (no bloquea): #14 está bien; el 0.00016 % lo da el paper mismo para el de 13B (sección 3.2, nota 2), así que en `## Fuentes` del guion conviene citar el paper en lugar de solo el blog. Revisa que la duración siga en 61–62 s después de los cambios (las frases propuestas cambian unas 3–4 palabras en total).
