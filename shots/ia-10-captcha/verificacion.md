# Verificación de hechos · Shot IA #10 · Tú contra un bot: ¿quién resuelve mejor los captchas?

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- Fuentes abiertas directamente: PDF de Searles et al. (USENIX Security 2023), PDF de Goodfellow et al. (arXiv:1312.6082v4), resumen en PubMed de von Ahn et al. (*Science* 2008), TechCrunch (2012), Google Security Blog (2014), documentación de reCAPTCHA v3 (Google for Developers, actualizada 2024-07-10) y blog de Google Cloud (22 abr 2026).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Gancho) Tú contra un bot resolviendo captchas: casi siempre gana él, y más rápido. | ✅ (con el "casi") | Searles et al., USENIX Security 2023, §5.5 y §8 | "these results suggest that bots can outperform humans, both in terms of solving time and accuracy, across all these CAPTCHA types" · "the bots' solving times are significantly lower in all cases, except reCAPTCHA (image), where human solving time (18 seconds) is similar to the bots' (17.5 seconds)" | 2023 (bots: ataques 2014–2021) |
| 2 | Las personas atinaron de 50 a 85 %. | ⚠️ imprecisa | Searles et al. 2023, §8 y Tablas 3–4 | "This substantially exceeds the human accuracy range we observed (50-85%)". Pero el 50 % es la *coincidencia entre participantes* en texto "Masked" (case-sensitive); sin distinguir mayúsculas sube a 73 % (Tabla 4) | 2023 |
| 3 | La mayoría de los bots, más de 96 %. | ⚠️ imprecisa (falta de qué/cuándo) | Searles et al. 2023, §8 y Tabla 3 | "The bots' accuracy ranges from 85-100%, with the majority above 96%." Las cifras de bots NO las midió UC Irvine: son ataques publicados por otros (Goodfellow 2014, Sivakorn 2016, Weng 2019, Zi 2020, Hossen 2020/2021), sobre otros captchas y otros años. La voz las presenta como si fueran del mismo experimento y no dice su año | 2014–2021 |
| 4 | Lo comparó la Universidad de California en Irvine en 2023. | ✅ | Searles et al. 2023 (portada y §5.5) | "32nd USENIX Security Symposium. August 9–11, 2023" · autores de UC Irvine ("Work done while at UC Irvine") · "Table 3 contrasts our measured human solving times and accuracy against those of automated bots reported in the literature." | 2023 |
| 5 | 1,400 personas, 14,000 captchas. | ✅ | Searles et al. 2023, resumen | "user studies in which 1,400 participants collectively solved 14,000 CAPTCHAS" | 2023 |
| 6 | En 2014 una IA de Google leía las letras chuecas más difíciles con 99.8 % de acierto. | ✅ | Goodfellow et al., arXiv:1312.6082v4 (14 abr 2014), "Street View and reCAPTCHA Teams, Google Inc." | "we report a 99.8% accuracy on transcribing the hardest category of reCAPTCHA puzzles" (sobre texto distorsionado sintético de reCAPTCHA) | 2014 |
| 7 | ¿Para qué te los siguen poniendo? (pregunta; implica que se siguen usando) | ✅ | Google Cloud blog, 22 abr 2026 | "reCAPTCHA will continue to be the core bot defense pillar of the broader Fraud Defense platform." | 2026 |
| 8 | Tú ya trabajaste para las máquinas: muchas palabras que tecleabas eran de libros escaneados que la computadora no leía. | ⚠️ (el hecho ✅; el "tú" generaliza) | von Ahn et al., *Science* 321:1465 (2008), resumen | "helping to digitize old printed material by asking users to decipher scanned words from books that computerized optical character recognition failed to recognize". El hecho es correcto, pero era la versión de texto de reCAPTCHA (≈2007–2014): muchos espectadores jóvenes de 2026 nunca la vieron | 2008 |
| 9 | Para 2008 ya iban más de 440 millones de palabras. | ✅ | von Ahn et al., *Science* 2008 (PubMed 18703711) | "Our apparatus is deployed in more than 40,000 Web sites and has transcribed over 440 million words." | 2008 |
| 10 | Luego Google probó números de casas de Street View. | ✅ | TechCrunch, 29 mar 2012 (declaración de Google) | "We're currently running an experiment in which characters from Street View images are appearing in CAPTCHAs." | 2012 |
| 11 | **Hoy** importa menos lo que escribes. | ✅ (con fuente 2026) | Google Cloud blog, 22 abr 2026 | "Fraud Defense is designed to be invisible for the majority of users, replacing disruptive puzzles with silent background verification." | 2026 |
| 12 | (Hoy) la casilla «no soy un robot» mira lo que haces antes, durante y después del clic. | ⚠️ dato de 2014 presentado como actual | Google Security Blog, 3 dic 2014 | "an Advanced Risk Analysis backend for reCAPTCHA that actively considers a user's entire engagement with the CAPTCHA—before, during, and after—to determine whether that user is a human." Es la descripción de 2014; no encontré una fuente actual que lo repita así. Además Google habla de "engagement with the CAPTCHA", no de "antes del clic" en la página | 2014 |
| 13 | (Pantalla) estela del cursor en la escena 7 | ⚠️ sugiere que se mide el movimiento del mouse | — | Google nunca ha publicado qué señales mide exactamente; el guion lo reconoce como ilustrativo, pero en pantalla no se avisa | — |
| 14 | La versión tres ni pregunta: califica cada visita de 0 (bot) a 1 (humano). | ✅ (detalle menor: "cada solicitud", no "cada visita") | Google for Developers, "reCAPTCHA v3" (actualizada 2024-07-10) | "reCAPTCHA v3 returns a score for each request without user friction." · "reCAPTCHA v3 returns a score (1.0 is very likely a good interaction, 0.0 is very likely a bot)." Nota: la página está marcada "deprecated" porque la documentación se mudó a Google Cloud Fraud Defense; reCAPTCHA sigue funcionando (fila 7) | 2024 |
| 15 | (Cierre) El bot te gana leyendo. | ✅ | Searles et al. 2023, Tabla 3 | Texto distorsionado: humanos "50-84%", bots "99.8% [39]" y "<1 [77]" s | 2023 (bots 2014/2020) |
| 16 | (Cierre) La prueba ya es todo lo que haces. | ⚠️ exagerada | Google Security Blog 2014; Google Cloud 2026 | Google habla de "a user's entire engagement with the CAPTCHA" y de "silent background verification"; "todo lo que haces" suena a que vigila todo lo que haces en internet, lo cual no está documentado | 2014 / 2026 |
| 17 | (Pantalla, gancho) los cronómetros: el del bot se detiene primero | ✅ como esquema | Searles et al. 2023 | Coincide con "bots' solving times are significantly lower in all cases, except reCAPTCHA (image)"; el captcha dibujado es de letras, donde el bot tarda "<1" s contra 9–15.3 s | 2023 |

**Resumen:** 11 ✅ · 6 ⚠️ · 0 ❌

## Correcciones necesarias

1. **Fila 2–3 (Marcador, línea 1 de la voz).** Las cifras de bots son de ataques de otros autores (2014–2021), no del estudio de 2023, y la voz no dice su año. Propuesta:
   > "Las personas atinaron de cincuenta a ochenta y cinco por ciento; los bots de estudios de 2014 a 2021, casi todos más de noventa y seis."
   y en la línea 2: "Lo juntó la Universidad de California en Irvine en 2023: mil cuatrocientas personas, catorce mil captchas." (o "Lo comparó… con ataques publicados").
   En pantalla: chip "bots: estudios 2014–2021" bajo la barra de bots. Sobre el 50 % (en texto deformado es coincidencia entre participantes, no acierto contra una respuesta correcta): el artículo mismo lo llama "human accuracy range", así que se puede usar, pero anótalo en las Notas del guion.
2. **Fila 8 (Libros).** Quitar la generalización al espectador joven. Propuesta:
   > "Y si usaste internet hace unos años, ya trabajaste para las máquinas: muchas palabras que tecleabas eran de libros escaneados que la computadora no leía."
   (o "Y millones de personas trabajaron para las máquinas: …").
3. **Fila 12 (Movimiento).** El "antes, durante y después" es de 2014. Propuesta:
   > "Hoy importa menos lo que escribes: desde 2014, la casilla «no soy un robot» se fija en cómo la usas, antes, durante y después del clic."
   (o atribuirlo: "Google dice que mira lo que haces antes, durante y después").
4. **Fila 13 (pantalla).** Añadir una etiqueta chica "esquema" junto a la estela del cursor, o cambiar la estela por un brillo genérico alrededor de la casilla.
5. **Fila 16 (Cierre).** Bajar la exageración. Propuesta:
   > "Así que el bot te gana leyendo: la prueba ya es cómo te portas en la página."
6. **Fila 14 (opcional, menor).** "califica cada visita" → "califica cada acción", que es lo que dice la documentación ("for each request").

## Re-verificación (29 oct 2026, mismo verificador)

Revisé solo lo que cambió en `narracion.json`, `captcha.jsx` y `guion.md`.

| # | Afirmación corregida | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R1 | «…los bots de estudios de 2014 a 2021, la mayoría, más de noventa y seis» + chip "bots: estudios 2014–2021" + barra "bots (la mayoría) más de 96 %" | ✅ | Searles et al. 2023, §8 y Tabla 3 (refs. de 2014, 2016, 2019, 2020, 2021) | "The bots' accuracy ranges from 85-100%, with the majority above 96%." | 2014–2021 |
| R2 | «Lo juntó la Universidad de California en Irvine en 2023, con mil cuatrocientas personas» + chip "1,400 personas · 14,000 captchas" | ✅ | Searles et al. 2023, resumen y §5.5 | "1,400 participants collectively solved 14,000 CAPTCHAS" · "contrasts our measured human solving times and accuracy against those of automated bots reported in the literature" | 2023 |
| R3 | «Y si usaste internet hace años, trabajaste para las máquinas: muchas de esas palabras venían de libros escaneados que la computadora no leía» | ✅ | von Ahn et al., *Science* 2008 | "asking users to decipher scanned words from books that computerized optical character recognition failed to recognize" | 2008 |
| R4 | «Para 2008 ya iban más de 440 millones de palabras» + chips "(2008)" y "von Ahn et al. · Science 2008" | ✅ | von Ahn et al., *Science* 2008 | "has transcribed over 440 million words" | 2008 |
| R5 | «Desde 2014, la casilla «no soy un robot» mira cómo la usas: antes, durante y después del clic» + chip "desde 2014" + etiqueta "esquema" (brillo en vez de estela de cursor) | ✅ | Google Security Blog, 3 dic 2014; Google Cloud blog, 22 abr 2026 | "actively considers a user's entire engagement with the CAPTCHA—before, during, and after" (la casilla se presentó en ese mismo post, 2014) · en 2026: "replacing disruptive puzzles with silent background verification" | 2014 / 2026 |
| R6 | «Y la versión tres ni pregunta: califica cada acción de cero, bot, a uno, humano» + chip "versión 3 · sin pruebas" | ✅ | Google for Developers, reCAPTCHA v3 | "returns a score for each request without user friction" · "1.0 is very likely a good interaction, 0.0 is very likely a bot" | 2024 |
| R7 | Cierre «El bot te gana leyendo; tu prueba es cómo te portas en la página» + chip "cómo te portas ✔" | ✅ | Searles et al. 2023 (Tabla 3: texto 50–84 % contra 99.8 %); Google 2014/2026 | ver filas 15 y R5 | 2023 / 2014–2026 |
| R8 | **Subtítulo idx 1** en `captcha.jsx`: "Personas *50–85 %* · bots *más de 96 %*" | ⚠️ exagera | Searles et al. 2023, §8 | "ranges from 85-100%, with the majority above 96%". El subtítulo dice que *todos* los bots pasan de 96 %, y la voz y la barra dicen "la mayoría" | 2014–2021 |
| R9 | Subtítulo idx 5: "Tecleabas palabras *de libros escaneados.*" | ⚠️ menor | — | Le quita el "si usaste internet hace años" a la voz y vuelve a hablarle a cualquiera (lo mismo que se corrigió en la fila 8) | — |

**Correcciones pendientes:**
1. `captcha.jsx`, subtítulo idx 1 → `"Personas *50–85 %* · bots: *la mayoría, +96 %*"`.
2. `captcha.jsx`, subtítulo idx 5 → `"Hace años tecleabas *palabras de libros.*"` (o `"Palabras *de libros escaneados.*"`).

Sin esas dos correcciones no se aprueba. Cuando estén aplicadas, el resto ya está en ✅.

## Re-verificación final (29 oct 2026, coordinador)
Subtítulos corregidos tal como propuso el verificador:
- idx 1: «Personas *50–85 %* · bots: *la mayoría, +96 %*» ✅
- idx 5: «Hace años tecleabas *palabras de libros.*» ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
