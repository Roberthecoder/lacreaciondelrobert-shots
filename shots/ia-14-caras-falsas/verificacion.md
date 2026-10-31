# Verificación de hechos · Shot IA #14 · ¿Cuál de estas caras es real? La IA ya engaña a tus ojos

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).** Revisé `guion.md` (voz y columna "Lo que se ve") y `narracion.json`. Todavía no existe `.jsx` (fase B).
- **Fuentes abiertas en el texto original:**
  - [F1] Nightingale, S. J. y Farid, H. (2022). *PNAS* 119(8): e2120481119. DOI 10.1073/pnas.2120481119. Texto completo leído desde Europe PMC (PMC8872790). Publicado en línea el 14 feb 2022.
  - [F2] Miller, E. J., Steward, B. A., Witkower, Z., Sutherland, C. A. M., Krumhuber, E. G. y Dawel, A. (2023). *Psychological Science* 34(12): 1390–1403. DOI 10.1177/09567976231207095. PDF de la versión publicada leído desde el repositorio abierto de la ANU (openresearch-repository.anu.edu.au). En línea el 13 nov 2023.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | "En 2022" (el estudio de las caras) | ✅ | F1 | "received November 11, 2021; accepted December 20, 2021" · publicado el 14/02/2022 | 2022 |
| 2 | "Investigadores de Inglaterra y California" / tarjeta "Nightingale (U. de Lancaster) y Farid (U. de California, Berkeley) · PNAS" | ✅ | F1 | "Department of Psychology, Lancaster University, Lancaster LA1 4YW, United Kingdom; b Department of Electrical Engineering and Computer Sciences, University of California, Berkeley, CA 94720" | 2022 |
| 3 | "Pusieron a 315 personas a ver caras reales y caras de la IA" | ✅ | F1 | "In this study, 315 participants classified, one at a time, 128 of the 800 faces as real or synthesized." | 2022 |
| 4 | En pantalla: "128 por persona, de 800" | ✅ | F1 | misma frase que #3 | 2022 |
| 5 | "la IA StyleGAN2" / chip "StyleGAN2" | ✅ | F1 | "We selected 400 faces synthesized using the state-of-the-art StyleGAN2" | 2022 |
| 6 | "Atinaron 48 %" / `NumeroGigante` "48 %" | ✅ (redondeo de 48.2 %) | F1 | "The average accuracy is 48.2% (95% CI [47.1%, 49.2%]), close to chance performance of 50%" | 2022 |
| 7 | "Echando un volado sacas 50" / "volado = 50 %" | ✅ | F1 | "close to chance performance of 50%" | 2022 |
| 8 | "A otro grupo le enseñaron los errores típicos de la IA" | ✅ | F1 | "219 new participants, with training and trial-by-trial feedback" · "Participants were then shown a short tutorial describing examples of specific rendering artifacts that can be used to identify synthetic faces." | 2022 |
| 9 | En pantalla: pizarrón con pistas concretas "fondo raro, orejas disparejas…" | ⚠️ no verificable | F1 | El artículo no dice qué ejemplos tenía el tutorial. Además: "we only included images with a mostly uniform background, and devoid of any obvious rendering artifacts" (el "fondo raro" no aplicaba a esas caras). | 2022 |
| 10 | "Subió a 59 %: apenas mejor" / barra de 48 a 59 % | ✅ | F1 | "The average accuracy improved slightly to 59.0% (95% CI [57.7%, 60.4%])" · "overall performance remained only slightly above chance" | 2022 |
| 11 | "Otro grupo calificó qué tan confiable se veía cada cara" / escala 1–7 | ✅ | F1 | "223 participants rated the trustworthiness of 128 faces … on a scale of 1 (very untrustworthy) to 7 (very trustworthy)" | 2022 |
| 12 | "Las de la IA salieron más confiables" / barras 4.48 vs 4.82 | ✅ (efecto pequeño, bien dicho sin exagerar) | F1 | "The average rating for real faces (blue bars) of 4.48 is less than the rating of 4.82 for synthetic faces (orange bars). Although only 7.7% more trustworthy, this difference is significant" | 2022 |
| 13 | "Los autores sospechan: la IA hace caras muy promedio, y lo promedio nos da confianza" / chip "hipótesis" | ✅ (dicho como hipótesis) | F1 | "This may be because synthesized faces tend to look more like average faces which themselves are deemed more trustworthy" | 2022 |
| 14 | "En 2023" (segundo estudio) / tarjeta "2023 · Miller et al. · Psychological Science" | ✅ | F2 | "Psychological Science 34(12)… Received 4/25/23; Revision accepted 9/19/23" | 2023 |
| 15 | "Un equipo de Australia" / tarjeta "Universidad Nacional Australiana" | ⚠️ imprecisa (leve) | F2 | Autora responsable: "Amy Dawel, Australian National University". Pero el equipo es internacional: "Australian National University; University of Toronto; University of Aberdeen; University of Western Australia; University College London". | 2023 |
| 16 | "Las caras blancas de la IA parecían más humanas que las reales" | ✅ | F2 | "we showed that White AI faces are judged as human more often than actual human faces—a phenomenon we term AI hyperrealism" | 2023 |
| 17 | En pantalla: barras "caras de IA juzgadas humanas 65.9 %" vs "caras reales 51.1 %" | ✅ cifras / ⚠️ etiqueta | F2 | "White AI faces were judged as human significantly more often than White human faces, MAI = 65.9% versus Mhuman = 51.1%". La etiqueta en pantalla omite "blancas"; las caras no blancas de IA no mostraron el efecto. | 2023 |
| 18 | "Los que más fallaban eran los más seguros" | ✅ | F2 | "Paradoxically, people who made the most errors in this task were the most confident (a Dunning-Kruger effect)." | 2023 |
| 19 | En pantalla: medidor "seguridad" que sube mientras los aciertos bajan | ⚠️ imprecisa (leve) | F2 | El resultado compara personas (las que más fallan reportan más seguridad), no un cambio en el tiempo dentro de una persona. Mismo texto que #18. | 2023 |
| 20 | Gancho + cierre: "Una la inventó una IA" … "La de la izquierda era de la IA" (con dibujos hechos a mano) | ⚠️ | Notas del guion | El propio guion dice que "las caras en pantalla son dibujos esquemáticos, no fotos (ni reales ni de IA)". Dicho así, la respuesta final es literalmente falsa: ninguna de las dos la hizo una IA ni es una persona real. | — |
| 21 | Consejo: "fíjate quién publicó la foto y de dónde salió" | ✅ (recomendación, no dato) | — | — | — |
| 22 | Los dos estudios dicen su año (más de 2 años) y no se afirma nada de los generadores actuales | ✅ | F1, F2 | Ambas cifras van con "en 2022" / "en 2023". No hay dato más nuevo que contradiga lo dicho (no se habla de generadores actuales). | — |

**Conteo:** 17 ✅ · 5 ⚠️ · 0 ❌ (la #17 cuenta como ⚠️ por la etiqueta).

## Correcciones necesarias

1. **#20 Gancho/cierre con dibujos (⚠️, la más importante).** Con caras dibujadas, "la de la izquierda era de la IA" no es cierto. Opciones:
   - **(a, recomendada)** Usar dos caras reales del set público del estudio (F1, Fig. 4 "A representative set of matched real and synthetic faces"; las caras sintéticas son de StyleGAN2 y las reales de su base FFHQ), con crédito "Nightingale y Farid, PNAS 2022" en pantalla, y decir la respuesta verdadera de ese par. Revisar antes la licencia de las imágenes.
   - **(b)** Mantener los dibujos y hacerlo honesto: texto fijo en pantalla "dibujo esquemático" y cambiar la voz del cierre a: "¿La respuesta? En el estudio, casi nadie podía saberlo: le atinaban como a un volado. ¿Tú en cuál confiaste?" y en el gancho: "¿Cuál de estas dos caras es real? En un estudio, una la hizo una IA. Elige: la respuesta, al final." (Sin afirmar que el dibujo de la izquierda es de IA.)
2. **#9 Pizarrón de pistas (⚠️).** Quitar "fondo raro, orejas disparejas" (no está en el estudio y los fondos se eligieron lisos). Poner algo genérico y fiel: "Tutorial: errores de dibujo de la IA" con íconos sin texto concreto, o "pistas de la IA (tutorial del estudio)".
3. **#15 "Un equipo de Australia" (⚠️ leve).** Voz: "un equipo dirigido desde Australia" (o "un equipo de la Universidad Nacional Australiana y otros países"). La tarjeta "Universidad Nacional Australiana" puede quedarse si añade "y colaboradores".
4. **#17 Etiqueta de barras (⚠️ leve).** Cambiar a "caras **blancas** de IA juzgadas humanas 65.9 %" vs "caras **blancas** reales 51.1 %".
5. **#19 Medidor de seguridad (⚠️ leve).** Dibujarlo como comparación entre personas (p. ej., varias figuritas: las que fallan más tienen el medidor de seguridad más alto), no como un medidor que sube con el tiempo.

## Re-verificación

- **Fecha:** 29 oct 2026. Mismo verificador independiente. Revisé solo lo que cambió: la voz en `narracion.json`, la tabla de `guion.md` y los textos de `carasfalsas.jsx` (subtítulos, chips, tarjetas, barras, sellos).

| # | Frase / elemento nuevo | Veredicto | Fuente | Frase textual / comprobación | Año |
|---|---|---|---|---|---|
| R1 | Gancho: "¿Cuál de estas dos caras es real? Ojo: la IA ya inventa caras. Elige; la respuesta, al final." · chips "¿Cuál es real?", "la IA ya inventa caras" | ✅ | F1 | Ya no afirma que una de las dos caras dibujadas sea de IA. "La IA ya inventa caras": "We selected 400 faces synthesized using the state-of-the-art StyleGAN2" | 2022 |
| R2 | "En 2022, investigadores de Inglaterra y California pusieron a 315 personas a ver caras reales y de la IA StyleGAN2." · tarjeta "2022 · Lancaster (Inglaterra) y Berkeley (California) · Nightingale y Farid · PNAS" · chips "315 personas", "128 caras c/u", "IA: StyleGAN2" | ✅ | F1 | "Lancaster University, Lancaster LA1 4YW, United Kingdom; … University of California, Berkeley, CA 94720" · "315 participants classified, one at a time, 128 of the 800 faces as real or synthesized" | 2022 |
| R3 | "Atinaron 48 %. Con un volado sacas 50." · subtítulo "Atinaron 48 %. Un volado: 50 %." | ✅ | F1 | "The average accuracy is 48.2% … close to chance performance of 50%" | 2022 |
| R4 | "A otro grupo le enseñaron pistas para cacharla. Subió a 59 %: apenas mejor." · pizarrón "Tutorial: errores típicos de la IA" con palomitas genéricas · barras "sin entrenar 48.2 %" vs "con pistas y avisos de acierto 59 %" con raya "azar 50 %" | ✅ | F1 | "shown a short tutorial describing examples of specific rendering artifacts that can be used to identify synthetic faces … participants received feedback after each response" · "The average accuracy improved slightly to 59.0%" · "only slightly above chance". Ya no se inventan pistas concretas. | 2022 |
| R5 | Re-gancho "¿Y si eliges la que te da más confianza?" | ✅ (es pregunta, no dato) | — | — | — |
| R6 | "En 2023, un equipo dirigido desde Australia vio que las caras blancas de IA parecían más humanas que las reales." · tarjeta "2023 · Universidad Nacional Australiana y colaboradores · Miller et al. · Psychological Science" · barras "% juzgadas «humanas» · caras blancas": "caras blancas de IA 65.9 %" vs "caras blancas reales 51.1 %" | ✅ | F2 | Autora responsable: "Amy Dawel, Australian National University" (coautores en Toronto, Aberdeen, Australia Occidental y UCL) · "White AI faces were judged as human significantly more often than White human faces, MAI = 65.9% versus Mhuman = 51.1%" | 2023 |
| R7 | "Los que más fallaban eran los más seguros." · dos figuritas "entre personas · ilustrativo" (la que más falla, más segura) | ✅ | F2 | "people who made the most errors in this task were the most confident (a Dunning-Kruger effect)". Ahora se dibuja como comparación entre personas y dice "ilustrativo". | 2023 |
| R8 | Consejo: "No le creas a «se ve real»: fíjate quién publicó la foto y de dónde salió." · chips "¿quién la publicó?", "¿de dónde salió?" | ✅ (recomendación, no dato) | — | Va con lo que muestran F1 y F2: a simple vista la gente no distingue las caras. | — |
| R9 | Cierre: "¿Cuál era real? Ninguna: las dos las dibujamos. Con fotos reales, ¿en cuál confiarías?" · sello "DIBUJO" en ambas · chip "ninguna ✏️" · subtítulo "Ninguna: son dibujos." | ✅ | guion (notas) | Es cierto: las dos caras son dibujos del shot. Corrige la ⚠️ #20. | — |

Nota menor (no bloquea): el visor de R2 pasa "una cara nueva cada medio segundo". En el estudio, cada participante tenía tiempo ilimitado ("Participants had an unlimited amount of time to respond"). El visor no dice nada en pantalla ni en la voz sobre el tiempo, así que solo es ritmo de la animación.

**Re-verificación: 9 ✅ · 0 ⚠️ · 0 ❌.** Las cinco ⚠️ de la primera revisión (#9, #15, #17, #19 y #20) quedaron corregidas.

VEREDICTO: APROBADO
