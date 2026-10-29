# Shot IA #14 · ¿Cuál de estas caras es real? La IA ya engaña a tus ojos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #14 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Animación, tabla "Robert en pantalla" y `publicacion.md`: fase B.
- **Formato:** N5 "El experimento" (se recrea la prueba de Nightingale y Farid con el espectador como participante) + N2 "El número" (48 % contra el 50 % de un volado).
- **Gancho (de los 7):** #5 Reto con respuesta al final: "¿Cuál de estas dos caras es real?". La respuesta llega en la última frase.
- **Duración:** voz 957 caracteres / 178 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** estimados en la base.
- **Postura de la serie:** crítica con datos (riesgo de caras falsas en perfiles y fraudes) y un consejo útil. Los estudios son de **2022 y 2023** y se dice; no se afirma nada de los generadores de hoy.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | ¿Cuál de estas dos caras es real? Una la inventó una IA. Elige: la respuesta, al final. | Fondo rosa; desde el cuadro 0 dos retratos dibujados lado a lado (izq. / der.) con marcos que laten; botones "¿real?" bajo cada uno y un cronómetro que corre. |
| 1 | Estudio | En dos mil veintidós, investigadores de Inglaterra y California pusieron a trescientas quince personas a ver caras reales y caras de la IA StyleGAN2. | Tarjeta "2022 · Nightingale (U. de Lancaster) y Farid (U. de California, Berkeley) · PNAS"; una pila de caras pasa una por una (128 por persona, de 800). Chip "StyleGAN2". |
| 2 | Volado | Atinaron cuarenta y ocho por ciento. Echando un volado sacas cincuenta. | `NumeroGigante` "48 %" y al lado una moneda que gira: "volado = 50 %". |
| 3 | Entreno | A otro grupo le enseñaron los errores típicos de la IA. Subió a cincuenta y nueve por ciento: apenas mejor. | Pizarrón con "pistas" (fondo raro, orejas disparejas…); la barra sube de 48 a 59 % y apenas pasa la raya del 50. |
| 4 | Pregunta | ¿Y si te guías por la que te da confianza? | **Re-gancho.** "?" gigante sobre las dos caras; Robert grande pensativo. |
| 5 | Confianza | Otro grupo calificó qué tan confiable se veía cada cara. Las de la IA salieron más confiables. | Escala 1–7 con estrellitas; barras "caras reales 4.48" vs "caras de IA 4.82". |
| 6 | Promedio | Los autores sospechan: la IA hace caras muy promedio, y lo promedio nos da confianza. | Fondo de circuito (por dentro de la máquina): muchas caras se funden en una cara "promedio" al centro; chip "hipótesis". |
| 7 | Seguros | Y en dos mil veintitrés, un equipo de Australia vio que las caras blancas de la IA parecían más humanas que las reales. Los que más fallaban eran los más seguros. | Tarjeta "2023 · Miller et al. · Universidad Nacional Australiana · Psychological Science"; barras "caras de IA juzgadas humanas 65.9 %" vs "caras reales 51.1 %"; luego un medidor "seguridad" que sube mientras los aciertos bajan. |
| 8 | Consejo | No le creas a «se ve real»: fíjate quién publicó la foto y de dónde salió. | `MitoTachado` "se ve real = es real"; celular con un perfil y una lupa sobre "¿quién lo publicó?". |
| 9 | Cierre | ¿La respuesta? La de la izquierda era de la IA. ¿Le atinaste, o le diste tu confianza? | **Regreso a la imagen del inicio**: las mismas dos caras; la izquierda se voltea y muestra su "circuito" con la etiqueta "IA", la derecha "real ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua con un tic-tac suave de reto; cada cara que pasa hace un "clic" de diapositiva, la moneda del volado tintinea, la barra del entrenamiento sube con un barrido corto, las estrellitas suenan como campanitas, las caras se funden con un zumbido, la cara de la izquierda se voltea con un "fsss" de revelación.

## Fuentes (abiertas en el texto original el 29 oct 2026)

1. Nightingale, S. J. y Farid, H. "AI-synthesized faces are indistinguishable from real faces and more trustworthy". *PNAS* 119(8): e2120481119 (febrero de 2022). DOI 10.1073/pnas.2120481119 · PMC8872790 (texto completo abierto con la API de Europe PMC). Lancaster University (Reino Unido) y University of California, Berkeley (EE. UU.). Dato de **2022**.
   > "In this study, 315 participants classified, one at a time, 128 of the 800 faces as real or synthesized. … The average accuracy is 48.2% (95% CI [47.1%, 49.2%]), close to chance performance of 50%"
   > "In this study, 219 new participants, with training and trial-by-trial feedback, classified 128 faces … The average accuracy improved slightly to 59.0%"
   > "When made aware of rendering artifacts and given feedback, there was a reliable improvement in accuracy; however, overall performance remained only slightly above chance."
   > "In this study, 223 participants rated the trustworthiness of 128 faces … on a scale of 1 (very untrustworthy) to 7 (very trustworthy) … The average rating for real faces (blue bars) of 4.48 is less than the rating of 4.82 for synthetic faces"
   > "This may be because synthesized faces tend to look more like average faces which themselves are deemed more trustworthy"
   > "We selected 400 faces synthesized using the state-of-the-art StyleGAN2"
2. Miller, E. J., Steward, B. A., Witkower, Z., Sutherland, C. A. M., Krumhuber, E. G. y Dawel, A. "AI Hyperrealism: Why AI Faces Are Perceived as More Real Than Human Ones". *Psychological Science* 34(12): 1390–1403 (2023). DOI 10.1177/09567976231207095 (PDF de acceso abierto en el repositorio de la ANU). Estudio dirigido desde la Australian National University. Dato de **2023**.
   > "In Experiment 1 (N = 124 adults), alongside our reanalysis of previously published data, we showed that White AI faces are judged as human more often than actual human faces—a phenomenon we term AI hyperrealism. Paradoxically, people who made the most errors in this task were the most confident (a Dunning-Kruger effect)."
   > "White AI faces were judged as human significantly more often than White human faces, MAI = 65.9% versus Mhuman = 51.1%"

## Notas
- **Las caras en pantalla son dibujos esquemáticos, no fotos** (ni reales ni de IA). "La de la izquierda era de la IA" es la convención del dibujo para el reto; con fotos reales la gente acierta como en un volado. El dibujo es esquemático.
- "Cuarenta y ocho por ciento" redondea 48.2 % (experimento 1). "Cincuenta y nueve" = 59.0 % (experimento 2, con entrenamiento y retroalimentación, 219 personas nuevas).
- "Más confiables": 4.82 contra 4.48 en una escala de 1 a 7 (experimento 3, 223 personas: "otro grupo"). El efecto es pequeño (los autores: "only 7.7% more trustworthy"), por eso no se exagera.
- "Caras muy promedio" se dice como sospecha de los autores ("may be"), no como hecho.
- "Investigadores de Inglaterra y California": Lancaster está en Inglaterra; Berkeley, en California. Los participantes fueron trabajadores en línea de Amazon Mechanical Turk (no se dice dónde vivían). En el estudio veían una cara a la vez (no en pares); el par del gancho es solo el formato del reto.
- "Un equipo de Australia": Miller et al. es de la Australian National University; sus 124 participantes eran residentes blancos de EE. UU. reclutados en Prolific, por eso no se dice "en Australia" sobre las personas.
- En Miller et al. el efecto es solo con caras blancas (las no blancas de IA se juzgaron humanas al nivel del azar); así se dice. "Los que más fallaban eran los más seguros" = correlación reportada como efecto Dunning-Kruger.
- Las caras de los dos estudios se hicieron con StyleGAN2; los generadores actuales son otros y no se afirma nada de ellos.
- El consejo final es una recomendación general, no un dato.
