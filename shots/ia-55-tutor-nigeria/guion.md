# Shot IA #55 · Seis semanas con un tutor de IA que valieron como hasta dos años de escuela

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #55 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (2 ⚠️ corregidas, ver `verificacion.md`), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N2 "El número" (6 semanas → "hasta 2 años", y luego se explica qué significa ese número) con un poco de N5 "El experimento" (el sorteo y el mismo examen).
- **Gancho (de los 7):** #4 "Un número que contradice": seis semanas de tardes que "valieron como hasta dos años de escuela".
- **Duración:** voz 952 caracteres / ~172 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** defiende con datos (un resultado grande y bien medido, con sorteo) y critica con datos: es un piloto de 2024, con maestros guiando, el grupo control no tuvo horas extra, y "dos años" es una equivalencia estimada, no dos años de temario.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Seis semanas de tardes con un tutor de IA valieron como hasta dos años de escuela. Eso calcularon investigadores del Banco Mundial. | Fondo amarillo; desde el cuadro 0 un calendario de 6 semanas que se tacha rápido, y una balanza: "6 semanas" ⚖️ "hasta 2 años" (con un asterisco "*equivalencia estimada"). Robert sorprendido en `gancho`. |
| 1 | Lugar | Fue en Benin City, Nigeria, en 2024, con chavos de primero de prepa de nueve escuelas públicas. | Mapa de África con Nigeria y un pin en Benin City (estado de Edo); chip "junio–julio 2024"; 9 escuelitas que aparecen; chip "1.º de bachillerato (Senior Secondary 1) · ~15 años". |
| 2 | Sesiones | Hasta doce sesiones de hora y media, en parejas, con Copilot, que usaba GPT-4, para practicar inglés. | Laboratorio de cómputo: dos alumnos por computadora; contador "12 × 90 min" (2 por semana); en la pantalla un chat "Copilot (GPT-4)" con una pregunta de inglés. |
| 3 | Maestros | Los maestros no daban clase: ponían la primera instrucción y vigilaban. | La maestra escribe el primer *prompt* en el pizarrón y camina entre las mesas (flechita de recorrido); chip "guía, no da clase". |
| 4 | Sorteo | Entrar fue por sorteo, y al final los dos grupos hicieron el mismo examen. | Tómbola: bolitas que caen a dos lados, "con tutor de IA" y "sin programa (clases normales)"; luego las dos filas reciben la misma hoja de examen. |
| 5 | Pregunta | ¿Y cuánto mejoraron de verdad? | **Re-gancho.** "?" gigante; Robert grande pensativo. |
| 6 | Resultado | En el examen completo, su mejora superó a ocho de cada diez programas probados en países de ingreso bajo y medio. | Número "+0.31 σ" (desviaciones estándar, examen completo) con una nota chica "inglés: +0.23 σ"; fila de 10 programas: 8 quedan por debajo. |
| 7 | Equivalencia | Ojo: no son dos años de temario. Es una equivalencia: lo que la escuela normal en Nigeria logra en año y medio a dos. | `MitoTachado`: "aprendieron 2 años de temario" ✗. Luego regla de tiempo: la barra de 6 semanas se estira hasta "1.5–2 años de escuela normal (estimado)"; chip "equivalencia estimada (EYOS)". |
| 8 | Peros | Y tiene peros: fue un piloto, el otro grupo no tuvo horas extra, y falta ver si dura. | Tres chips que caen como notas adhesivas: "piloto (1 ciudad, 6 semanas)" · "control: sin horas extra" · "¿dura? aún no se sabe". |
| 9 | Chicas | Y las chicas, que iban más atrás, parecen haber ganado más. | Dos barras (chicas / chicos): la de chicas arranca más abajo y sube más; nota chica "con cautela". |
| 10 | Cierre | Esas seis semanas no reemplazan a tu escuela: fue IA con un maestro al lado. | **Regreso a la imagen del inicio:** el mismo calendario y la balanza; ahora junto al chat aparece la maestra, y el "hasta 2 años*" queda con su asterisco. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y esperanzadora pero contenida; tachones de calendario como "tic", tecleo en el laboratorio, tiza en el pizarrón, bolitas de tómbola, un "ding" suave al subir el número, tres "plop" de las notas adhesivas en los peros, un acorde que se abre en el cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y cuánto mejoraron de verdad?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.5 | 11_sorprendido | `gancho` | «valieron como hasta dos años de escuela» (cuadro 0) |
| 2 | 12.0 | 13.8 | 13_senalando_arriba | `arriba-der` | señala las 9 escuelas públicas |
| 3 | 15.9 | 19.4 | 04_bajando_lentes | `izq-alto` | «con Copilot, que usaba GPT-4» |
| 4 | 24.4 | 28.5 | 06_pensativo_menton | `arriba-der` | «Entrar fue por sorteo… el mismo examen» |
| 5 | 28.7 | 31.7 | 07_pensativo_puno | `grande` | «¿Y cuánto mejoraron de verdad?» |
| 6 | 34.3 | 37.3 | 11_sorprendido | `arriba-der` | «ocho de cada diez programas» |
| 7 | 40.7 | 44.3 | 10_serio_molesto | `arriba-der` | «Es una equivalencia» |
| 8 | 44.8 | 49.5 | 04_bajando_lentes | `arriba-der` | «Y tiene peros» |
| 9 | 50.0 | 53.2 | 05_sonriendo_dientes_uniformes | `izq-alto` | «las chicas… parecen haber ganado más» |
| 10 | 53.7 | 58.0 | 13_senalando_arriba | `arriba-der` | «fue IA con un maestro al lado» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 35.7 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (abiertas el 29 oct 2026)

1. De Simone, M., Tiberti, F., Barron Rodriguez, M., Manolio, F., Mosuro, W. y Dikoru, E. J. "From Chalkboards to Chatbots: Evaluating the Impact of Generative AI on Learning Outcomes in Nigeria". World Bank Policy Research Working Paper 11125 (mayo de 2025; versión actualizada en diciembre de 2025). DOI 10.1596/1813-9450-11125. PDF: https://documents.worldbank.org/curated/en/099548105192529324/pdf/IDU-c09f40d8-9ff8-42dc-b315-591157499be7.pdf (dato de 2024).
   > Resumen: "the program deployed Microsoft Copilot (powered by GPT-4) to support first-year senior secondary students in English language learning over six weeks. The intervention demonstrated a significant improvement of 0.31 standard deviation on an assessment that included English topics aligned with the Nigerian curriculum, knowledge of artificial intelligence and digital skills. The effect on English, the main outcome of interest, was of 0.23 standard deviations."
   > Resumen: "Cost-effectiveness analysis revealed substantial learning gains, equating to 1.5 to 2 years of 'business-as-usual' schooling"
   > "First-year secondary students from nine public schools in Benin City were invited to participate; from this pool, 52% of eligible students expressed interest, and participants were randomly selected from among them. Those assigned to the intervention attended twelve 90-minute sessions in computer labs, engaging in curriculum-aligned activities guided by teachers."
   > "The intervention was implemented in Benin City, Nigeria, using Copilot, an LLM powered by the GPT-4 model at the time of implementation. The program was implemented over a six-week period between June and July 2024, targeting first-year senior secondary school students, who are typically 15 years old."
   > "Each student was allowed to participate in a maximum of two 1.5-hour after-school sessions per week."
   > "Students worked in pairs, sharing a computer… Teachers, who played a critical role in guiding the students but did not provide direct instruction"
   > "The sessions began with a teacher-provided prompt, followed by free interaction between the student pairs and the AI tool. Teachers circulated the classroom, ensuring students' interactions remained relevant and on task."
   > "the randomization was carried out using simple random sampling without replacement among interested students to assign them either to the treatment group, which participated in the program, or to the control group, which did not receive any intervention but continued their regular learning in the classroom."
   > "Initially, 657 students were assigned to the treatment group and 671 to the control group. However, only 422 students in the treatment group and 337 in the control group completed the final assessment"
   > "A recent review of randomized controlled trials in pre-primary, primary, and secondary education in low and middle-income countries found a median effect of 0.10 standard deviations in overall test scores and 0.14 in reading (Evans and Yuan, 2022). Thus, the results found in this study are situated at least at the 80th percentile of all RCTs… When considering only the effects on language outcomes, the results are near the 70th percentile of all studies."
   > "Our ITT effect of 0.238 standard deviation in English is equivalent to increasing 1.5 years of 'business-as-usual' schooling in Nigeria, and the total score gain of 0.31 standard deviation is equivalent to 2 additional years of schooling in the country."
   > "the interaction term for treatment and being female is positive and significant (0.420) at the 5% level… This result should be interpreted with caution, as it appears to be influenced by the inclusion of a girls-only school that performed worse than others in the sample prior to the intervention."
   > "treatment effects were stronger among female students, compensating for a deficit in their baseline performance."
   > "additional arms can help disentangle the multiple causal mechanisms that might be driving the effect, including additional instructional time and the interaction with the chatbot with teacher support."
   > "Future studies should investigate whether the positive effects observed in the short term persist over time"
   > "attendance to the intervention sessions, which averaged 72% among the treatment group"
2. De Simone, M. E., Tiberti, F., Mosuro, W., Manolio, F., Barron, M. y Dikoru, E. "From chalkboards to chatbots: Transforming learning in Nigeria, one prompt at a time". Blog Education for Global Development, Banco Mundial, 9 de enero de 2025. https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-Transforming-learning-in-Nigeria
   > "After the six-week intervention between June and July 2024, students took a pen-and-paper test"
   > "The learning improvements were striking—about 0.3 standard deviations."
   > "this is equivalent to nearly two years of typical learning in just six weeks"
   > "Girls, who were initially lagging boys in performance, seemed to gain even more from the intervention"
   > "generative AI, when implemented thoughtfully with teacher support, can function effectively as a virtual tutor"

## Notas
- "Hasta dos años": la equivalencia es de 1.5 años (efecto en inglés, 0.238 σ) a 2 años (examen completo, 0.31 σ) de escuela "normal" en Nigeria (método EYOS de Evans y Yuan). Es una estimación que convierte el tamaño del efecto en tiempo de escuela típica; no significa que vieran dos años de temario. Por eso en pantalla lleva asterisco y la voz lo explica.
- Las cifras del examen difieren un poco entre secciones del documento (inglés 0.23 en el resumen, 0.24 en la introducción, 0.238 en costos); en pantalla se usa la del resumen (0.23) y el total 0.31.
- "Ocho de cada diez" = el resultado del examen completo queda al menos en el percentil 80 de los ensayos aleatorios revisados por Evans y Yuan (2022) en países de ingreso bajo y medio. Solo en lenguaje, cerca del percentil 70 (no se dice en voz; se puede poner chico en pantalla si cabe).
- "Primero de prepa" = Senior Secondary 1 en Nigeria (normalmente 15 años). "Hasta doce sesiones": era el máximo (2 por semana × 6 semanas); la asistencia promedio fue 72 %.
- "El otro grupo no tuvo horas extra": el grupo control siguió con sus clases normales sin ninguna intervención; los autores dicen que falta separar el efecto del tiempo extra del efecto del chatbot con maestros. Es una limitación, no prueba de que el efecto sea solo tiempo extra.
- Lo de las chicas va como "parecen" porque los propios autores piden cautela (influye una escuela solo de mujeres).
- "Investigadores del Banco Mundial": es un *Policy Research Working Paper*; las conclusiones son de los autores, no una postura oficial del Banco.
- El diálogo del chat en pantalla es ilustrativo. El dibujo es esquemático.
