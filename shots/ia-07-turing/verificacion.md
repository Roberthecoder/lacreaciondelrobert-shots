# Verificación de hechos · Shot IA #07 · ¿Quién es el humano? La IA que pasó la prueba de Turing

- **Fecha:** 28 oct 2026 · **Quién verificó:** la sesión de producción de la rama `claude/igualar-ia`. En esta sesión no había herramienta para lanzar un subagente verificador (Task/Agent), así que se verificó a mano con el encargo de CLAUDE.md ("sé escéptico: si dudas, es ⚠️"), **abriendo las fuentes originales completas**: el PDF del preprint en arXiv y el texto completo del artículo publicado en PNAS (PMC13214042, vía la API de Europe PMC; pnas.org tiene reto anti-bots).
- **Regla de "el conteo más nuevo":** se buscó si el preprint de 2025 ya estaba publicado; sí: *PNAS*, mayo de 2026. Todas las cifras se comprobaron en la versión publicada.
- **Revisado:** `guion.md`, `narracion.json` y lo que se ve en pantalla (`turing.jsx`).
- **Verificación independiente (28 oct 2026):** otro agente que no escribió el guion abrió las fuentes completas y revisó todo. No encontró cifras falsas; pidió las correcciones de redacción de abajo ("Segunda ronda"), que ya están aplicadas en la voz, el guion, la pantalla y `publicacion.md`.

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Chats de cinco minutos, al mismo tiempo con dos desconocidos (una persona y una máquina) | ✅ | PNAS 2026, resumen | "Participants had 5 min conversations simultaneously with another human participant and one of these systems before judging which conversational partner they thought was human." | 2025 (experimento) / 2026 (publicación) |
| 2 | La gente creyó que esta IA era la humana 73 de cada 100 veces | ✅ | PNAS 2026, resumen | "When prompted to adopt a humanlike persona, GPT-4.5 was judged to be the human 73% of the time" | 2025/2026 |
| 3 | Al humano real lo eligieron solo 27 de cada 100 | ✅ | arXiv:2503.23674 §2.1 (misma definición en PNAS) | "the average interrogator accuracy is also the average human witness win rate, and is the complement of the AI win rate" (100 − 73 = 27); "significantly more often than interrogators selected the real human participant" | 2025 |
| 4 | Es la prueba que propuso Alan Turing en 1950; si no los distingues, la máquina pasa | ✅ | arXiv:2503.23674 §1.1 | "75 years ago, Alan Turing (1950) proposed the imitation game… If the interrogator cannot reliably identify the human, the machine is said to have passed" | 1950 |
| 5 | El truco: actuar como un joven reservado, que sabe de internet y habla con jerga (pantalla: "joven", "reservado", "sabe de internet", "habla con jerga") | ✅ | PNAS 2026, "AI models" | "specifically a young person who is introverted, knowledgeable about internet culture, and uses slang" | 2025 |
| 6 | La IA es GPT-4.5 | ✅ | PNAS 2026, resumen | "GPT-4.5 was judged to be the human 73% of the time" | 2025 |
| 7 | Sin personaje, GPT-4.5 convenció solo 36 de cada 100 | ✅ | PNAS 2026, Resultados | "GPT-4.5-NO-PERSONA and LLAMA-NO-PERSONA had overall win rates of 36% and 38% respectively" | 2025 |
| 8 | Lo publicaron en 2026 Cameron Jones y Benjamin Bergen, en San Diego | ✅ | Europe PMC / PNAS 123(21) e2524472123 | "Jones CR, Bergen BK." · "Department of Cognitive Science, University of California San Diego" · "dateOfPublication: 2026 May" | 2026 |
| 9 | Más de mil partidas (pantalla: 1,023) | ✅ | PNAS 2026, "Game setup" | "After exclusions, we analyzed 1,023 games" | 2025 |
| 10 | ELIZA es un chatbot de los sesenta | ✅ | PNAS 2026 | "ELIZA: a rules-based chatbot from the 1960s" | 1960s |
| 11 | ELIZA convenció 23 de cada 100 | ✅ | PNAS 2026, resumen | "ELIZA and GPT-4o (23% and 21%, respectively)" | 2025 |
| 12 | Para cacharla sirvió decir algo muy raro | ✅ | PNAS 2026, "Strategies" | "Interrogators were most likely to be accurate when they said something strange; (e.g. randomly striking keys or using nonsense words)" | 2025 |
| 13 | Preguntar por el clima fue de lo que menos sirvió | ✅ | PNAS 2026, "Strategies" | "Asking about the weather or human experiences tended to be the least effective strategies." | 2025 |
| 14 | En chats de quince minutos, GPT-5 también pasó (pantalla: 59 %) | ✅ | PNAS 2026, "Replication with Extended Time Limit" | "GPT-5 was judged to be human marginally more often than chance (59%)"; "confirming that both models pass the Turing test with the extended time limit" | 2026 |
| 15 | Los autores advierten que puede usarse para engañar y desinformar | ✅ | PNAS 2026, Introducción | "Models with this ability to robustly deceive (and masquerade as) people could be used for social engineering or to spread misinformation" | 2026 |
| 16 | Pantalla: "1950 · Alan Turing · «el juego de imitación»" | ✅ | arXiv:2503.23674 §1.1 | "Alan Turing (1950) proposed the imitation game" | 1950 |
| 17 | (solo en `publicacion.md`, LinkedIn) Saber de IA no hizo más precisos a los interrogadores | ✅ | PNAS 2026, Discusión | "Knowledge of LLMs or frequent chatbot use did not predict interrogator accuracy" | 2026 |
| 18 | (segunda ronda) "reservado" traduce *introverted* (no "tímido") | ✅ | PNAS 2026, Discusión y "AI models" | "a young person who is introverted, knowledgeable about internet culture, and uses slang"; "instructed to role-play as an introverted 19 y old and use slang" | 2026 |
| 19 | (segunda ronda, recorte) "Los autores advierten: puede usarse para engañar y desinformar" | ✅ | PNAS 2026, Introducción | "could be used for social engineering or to spread misinformation" | 2026 |

## Correcciones hechas antes de aprobar
- ⚠️ → corregido: "Preguntar por el clima casi no ayudó" exageraba; el artículo dice "least effective" (de lo menos eficaz), sin decir que no sirvió. Quedó "fue de lo que menos sirvió".
- ⚠️ → corregido: la primera versión citaba solo el preprint de 2025; se cambió a la versión publicada en PNAS (2026) y se revisaron ahí todas las cifras (no cambió ninguna).
- ⚠️ → corregido: "para estafas" se cambió a "para engañar y desinformar" (el artículo dice "social engineering or to spread misinformation").

## Segunda ronda (verificación independiente, 28 oct 2026)
- ⚠️ → corregido: «un joven tímido» → «un joven reservado» (el artículo dice *introverted*). Cambió en la voz, el chip y el subtítulo de la pantalla, el guion y `publicacion.md`.
- Recorte sin perder datos para seguir en ~960 caracteres: «esto puede usarse» → «puede usarse»; se quitó «Así que» del cierre.

## Notas
- Los mensajes de los chats en pantalla son ilustrativos (no son conversaciones del estudio). El dibujo es esquemático.

VEREDICTO: APROBADO
