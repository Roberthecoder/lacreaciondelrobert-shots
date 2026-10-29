# Shot IA #51 · Tu bocina inteligente se despierta sola con la tele

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #51 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A (guion) lista · pendiente de verificación independiente · sin animación todavía · voz pendiente de aprobación de Robert.
- **Formato:** N5 "El experimento" (se recrea el banco de pruebas: bocinas, tele y cámara) + N2 "El número" (casi una vez por hora).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: la lucecita de la bocina que se prende… y no la llamaste tú, fue la tele.
- **Duración:** voz 941 caracteres / ≈ 180 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** estimados (`estimar-escenas.mjs`).
- **Postura de la serie:** crítica con datos y con equilibrio: qué sí pasa (se activan solas, a veces más de 10 s, y el audio sube a la nube) y qué NO encontraron (no graban todo el tiempo, no hay palabras secretas). El estudio es de **2020** y se dice; no se afirma nada de las bocinas de hoy.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho (0–6.4) | Esa lucecita en tu bocina no siempre es que la llamaste: a veces la prende la tele con una frase parecida. | Fondo menta, sala de tu casa: tele a la izquierda, bocina redonda en el mueble. Desde el cuadro 0 sale un globo de diálogo de la tele y el anillo de la bocina se enciende azul (movimiento antes del s 1). |
| 1 | Escucha (6.4–12.0) | La bocina está atenta todo el tiempo a su nombre y manda audio a internet cuando cree oírlo. | Zoom a la bocina; adentro (fondo oscuro "por dentro de la máquina") una oreja/red pequeña compara ondas con la palabra de activación; flecha a una nube con candado que solo se abre cuando "cree" oír su nombre. |
| 2 | Experimento (12.0–20.6) | En un estudio de 2020, en Boston y Londres pusieron siete bocinas a oír ciento treinta y cuatro horas de series. Una cámara vigilaba su luz. | Tarjeta "2020 · Northeastern (Boston) e Imperial College (Londres) · Dubois et al. · PETS". Banco de pruebas: 7 bocinas en fila (Echo Dot ×4, Google Home Mini, HomePod, Invoke), bocinas de audio con claqueta "134 h de series", cámara arriba con punto rojo grabando. |
| 3 | Numero (20.6–24.2) | En el peor caso, se activaron solas casi una vez por hora. | Número gigante "0.95 / hora" con reloj que da la vuelta y un anillo que se prende al llegar. Chip chico: "el peor caso medido". |
| 4 | Palabras (24.2–28.0) | A Siri la despertó un "I'm sorry". A Alexa, un "I messed up". | Dos globos de subtítulo de serie: "I'm sorry" ≈ "Hey Siri" y "I messed up" ≈ "Alexa", con el signo ≈ parpadeando. |
| 5 | Pregunta (28.0–31.0) | ¿Y qué alcanza a oír cuando se despierta sola? | **Re-gancho.** "?" gigante sobre la bocina encendida; Robert grande. |
| 6 | Duracion (31.0–36.8) | Casi siempre, unos segundos. En algunas, una de cada diez activaciones duró diez segundos o más. | Cronómetro: barras cortas (pocos segundos) y una de cada diez se estira hasta "10 s". |
| 7 | Nube (36.8–39.5) | Y casi todas mandaron ese audio a la nube. | Ondas suben de la bocina a una nube con flechita. |
| 8 | Calma (39.5–45.1) | La buena noticia: no hallaron pruebas de que graben todo el tiempo, ni de palabras secretas. | `MitoTachado`: "graba todo el tiempo" ✗ y "palabras secretas" ✗. |
| 9 | Narcos (45.1–51.2) | Lo curioso: por palabra, la serie que más las confundió fue Narcos, a menudo con diálogos en español. | Tele con globo en español ("¿Qué onda?" ilustrativo); medidor "activaciones por 10 000 palabras" con Narcos arriba (6.21, suma de todas las bocinas). |
| 10 | Consejo (51.2–54.3) | Si te preocupa, apaga su micrófono con el botón. | Mano que oprime el botón de micrófono; el anillo se pone rojo (micrófono apagado). |
| 11 | Cierre (54.3–58.1) | Así que esa lucecita no siempre eres tú: a veces es la tele. | **Regreso a la imagen del inicio**: la misma sala; la tele habla, la bocina se enciende y una flechita dice "fue la tele". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y continua, tipo zumbido eléctrico suave. Efectos: "bip" de activación cada vez que se prende un anillo, clic de cámara, tic-tac del reloj del número, dos "ding" en las palabras, tecleo/whoosh al subir a la nube, golpe sordo del botón de micrófono.

## Fuentes (cifras abiertas en el artículo original el 29 oct 2026)

1. Dubois, D. J., Kolcun, R., Mandalari, A. M., Paracha, M. T., Choffnes, D. y Haddadi, H. "When Speakers Are All Ears: Characterizing Misactivations of IoT Smart Speakers". *Proceedings on Privacy Enhancing Technologies* 2020(4) (PETS 2020). DOI 10.2478/popets-2020-0072. Northeastern University (Boston) e Imperial College London. Texto completo: https://moniotrlab.khoury.northeastern.edu/wp-content/uploads/2020/06/dubois-pets20.pdf (experimentos de nov 2019 a feb 2020; publicado en 2020).
   > Resumen: "After playing two rounds of 134 hours of content from 12 TV shows near popular smart speakers in both the US and in the UK, we observed cases of 0.95 misactivations per hour, or 1.43 times for every 10,000 words spoken, with some devices having 10% of their misactivation durations lasting at least 10 seconds."
   > "smart speakers need to constantly listen in order to activate when the 'wake word' is spoken, and are known to transmit audio from their environment and record it on cloud servers."
   > "we built a custom testbed (see Fig.1) and used it to expose seven smart speakers, powered by four popular voice assistants, to 134 hours (more than a million words) of audio content from 12 popular TV shows."
   > Fig. 1: "Testbed: camera and light to capture activations…"
   > "Smart speakers exhibited up to 0.95 misactivations per hour, or 1.43 every 10,000 words spoken. While the good news is that they are not constantly misactivating, misactivations occur rather frequently."
   > "The duration of most misactivations is short, but, for some devices, 10% of the misactivations are 10 seconds long or more."
   > §4.4: "in the much less common 90th percentile case (P90), we measured a duration of 10 s in the case of Homepod, followed by 9 s in the case of Google Home Mini, and 8 s in the case of Echo Dot 2nd gen."
   > Tabla 4 (ejemplos de subtítulos que activaron): Hey Siri → "I'm sorry"; Alexa → "I care about", "I messed up", "I got something".
   > "We did not find any evidence of undocumented wake words." / "we did not find any clear evidence of consistent undocumented wake words that are malicious or completely unrelated to the real ones."
   > §4.5: "the show we have observed the most misactivations per word is Narcos (6.21 misactivations per 10,000 words)" … "Narcos, which tops the list in terms of misactivations per amount of dialogue, has many misactivations triggered by Spanish dialogue."
   > §5: "User mitigations. One approach is to use hardware features (e.g., using the 'mic off' toggle) or other devices to prevent smart speakers from activating at all."
2. Página del estudio del laboratorio Mon(IoT)r (Northeastern), actualizada el 21 jul 2020: https://moniotrlab.khoury.northeastern.edu/publications/smart-speakers-study-pets20/
   > "Are these devices constantly recording our conversations? In short, we found no evidence to support this. The devices do wake up frequently, but often for short intervals (with some exceptions)."
   > "We have found that almost all activations that are detected locally (device lit up) are also sent to the cloud."
   > "Our main testbed has been deployed at Northeastern University's Mon(IoT)r Lab in Boston (US). A copy of the testbed has also been deployed at Imperial College London (UK)"
   > "depending on the accent, 'I'm sorry' may sound like the wake word 'Hey Siri'"
   > Narcos: "it was mostly Spanish dialogue and poorly pronounced English dialogue."

## Notas
- "Casi una vez por hora" = 0.95 activaciones por hora, el peor caso reportado ("up to"). En promedio de todas las series, las bocinas que más se equivocaron fueron Invoke/Cortana y Echo Dot 2.ª gen. con "Echo" (0.40 por hora, según la página del laboratorio); no se dice en la voz para no saturar.
- "Siete bocinas": el artículo dice "seven smart speakers" (4 Echo Dot, Google Home Mini, HomePod, Harman Kardon Invoke). La Invoke solo estuvo en Boston.
- "Una de cada diez activaciones duró diez segundos o más" = percentil 90 del HomePod (10 s); en otras bocinas fue de 9 y 8 s. Por eso se dice "en algunas".
- "Por palabra" = activaciones por cada 10 000 palabras de diálogo (Narcos, 6.21, sumando todas las bocinas). Las bocinas probadas estaban configuradas en inglés.
- El botón de micrófono es la mitigación que proponen los autores ("mic off" toggle).
- La mayoría de las activaciones no se repetían igual con el mismo audio (no deterministas). El dato es de 2020 y así se dice; las bocinas han cambiado desde entonces.
- El dibujo es esquemático; los diálogos de la tele en pantalla son ilustrativos salvo las dos frases en inglés, que son del artículo.
