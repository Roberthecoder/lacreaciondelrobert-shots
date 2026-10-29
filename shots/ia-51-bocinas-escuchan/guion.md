# Shot IA #51 · Tu bocina inteligente se despierta sola con la tele

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #51 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion corregido tras la verificación (3 ⚠️ resueltas), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~945 créditos).
- **Formato:** N5 "El experimento" (se recrea el banco de pruebas: bocinas, tele y cámara) + N2 "El número" (0.95 por hora).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: la lucecita de la bocina que se prende… y no la llamaste tú, fue la tele.
- **Duración:** voz 945 caracteres / ≈ 180 palabras (≈ 58.4 s) + cierre 3.5 s → **61.9 s** en la base (`OM_SCENES`).
- **Postura de la serie:** crítica con datos y con equilibrio: qué sí pasa (se activan solas, en una bocina 1 de cada 10 activaciones duró 10 s o más, y casi todas las activaciones mandaron audio a la nube) y qué NO encontraron (pruebas de que graben todo el tiempo o de palabras secretas). El estudio es de **2020** y se dice; no se afirma nada de las bocinas de hoy.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho (0–5.1) | Esa lucecita en tu bocina no siempre es que la llamaste: a veces la prende la tele. | Fondo menta, sala: tele, mueble, bocina y "tú" de espaldas en el sillón. En el cuadro 0 sale el globo "bla bla bla…" de la tele y a los 0.5 s se prende el anillo de la bocina. Chip "nadie la llamó". |
| 1 | Escucha (5.1–10.3) | La bocina siempre está atenta a su nombre y manda audio a internet cuando cree oírlo. | Por dentro (fondo de circuito): ondas entran a un círculo con una red neuronal; chip "busca su nombre aquí adentro"; una nube con candado que se abre: "¿oyó su nombre? → internet". Abajo, la bocina grande. |
| 2 | Experimento (10.3–18.9) | En un estudio de 2020, en Boston y Londres pusieron siete bocinas a oír ciento treinta y cuatro horas de series. Una cámara vigilaba su luz. | Tarjeta "2020 · Boston y Londres · Dubois et al. · PETS 2020". Banco de pruebas: 7 bocinas en un estante (sin marcas), bocina de audio, chip "7 bocinas · 134 horas de series"; luego una cámara con punto rojo apunta al estante: "¿se prende su luz?". |
| 3 | Numero (18.9–24.3) | En el peor caso, una de ellas, con una sola serie, se prendió sola casi una vez por hora. | Número gigante "0.95 · activaciones solas por hora"; chip "hasta 0.95 por hora · 1 bocina con 1 serie". Abajo, un reloj de 1 hora da la vuelta y la bocina se prende. |
| 4 | Palabras (24.3–28.1) | A Siri la despertó un "I'm sorry". A Alexa, un "I messed up". | Subtítulo de serie "I'm sorry" ≈ «Hey Siri» (se prende una bocina alta) y "I messed up" ≈ «Alexa» (se prende una bocina de disco). Abajo, la tele con ese subtítulo. |
| 5 | Pregunta (28.1–30.7) | ¿Y cuánto oye cuando se despierta sola? | **Re-gancho.** "?" gigante y la bocina encendida; Robert grande. |
| 6 | Duracion (30.7–36.6) | Casi siempre, unos segundos. Pero en una, una de cada diez activaciones duró diez segundos o más. | 9 barras cortas (esquemáticas) y la décima se estira en rojo hasta 10 s con la etiqueta "HomePod · 10 s o más"; chips "casi siempre: unos segundos" → "1 de cada 10 · en una bocina". Abajo, cronómetro de segundos. |
| 7 | Nube (36.6–40.3) | Y casi todas esas activaciones mandaron el audio a la nube. | Ondas suben de la bocina a una nube; chip "casi todas las activaciones". |
| 8 | Calma (40.3–45.4) | Lo bueno: no hallaron pruebas de que graben todo el tiempo, ni de palabras secretas. | Chip "no hallaron pruebas de…" y `MitoTachado`: "grabar todo el tiempo" ✗, "palabras secretas" ✗. Abajo, la bocina apagada con "z z z". |
| 9 | Narcos (45.4–51.5) | Lo curioso: por palabra, la serie que más las confundió fue Narcos, a menudo con diálogos en español. | Tele con el subtítulo "(diálogo en español)" (genérico, sin cita) y un globo "¿…?"; chip "Narcos"; la bocina se prende con "?!"; chip "6.21 activaciones por cada 10 000 palabras". |
| 10 | Consejo (51.5–54.6) | Si te preocupa, apaga su micrófono con el botón. | Un dedo oprime el botón de micrófono; el anillo se pone rojo: "micrófono apagado". |
| 11 | Cierre (54.6–58.4) | Así que esa lucecita no siempre eres tú: a veces es la tele. | **Regreso a la imagen del inicio**: la misma sala; la tele habla, la bocina se enciende y chip "fue la tele, no tú". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y continua; zumbido suave de tele. Efectos: "bip-bip" de activación cada vez que se prende un anillo, clic de cámara, tic-tac del reloj, tecleo de las barras, whoosh al subir a la nube, crujido en los tachones, golpe sordo del botón de micrófono.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y cuánto oye cuando se despierta sola?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «a veces la prende la tele» (cuadro 0) |
| 2 | 7.0 | 10.1 | 06_pensativo_menton | `arriba-der` | «manda audio a internet cuando cree oírlo» |
| 3 | 14.3 | 17.9 | 13_senalando_arriba | `izq-alto` | señala el banco de pruebas (7 bocinas, 134 h) |
| 4 | 19.2 | 24.1 | 04_bajando_lentes | `izq-alto` | «casi una vez por hora» |
| 5 | 28.2 | 30.3 | 07_pensativo_puno | `grande` | «¿Y cuánto oye cuando se despierta sola?» |
| 6 | 31.7 | 36.4 | 11_sorprendido | `arriba-der` | «diez segundos o más» |
| 7 | 36.9 | 40.1 | 10_serio_molesto | `izq-alto` | «mandaron el audio a la nube» |
| 8 | 40.8 | 45.2 | 05_sonriendo_dientes_uniformes | `arriba-der` | «Lo bueno: no hallaron pruebas…» |
| 9 | 46.0 | 51.3 | 04_bajando_lentes | `arriba-der` | «la serie que más las confundió fue Narcos» |
| 10 | 51.8 | 54.4 | 13_senalando_arriba | `izq-alto` | «apaga su micrófono con el botón» |
| 11 | 54.9 | 58.3 | 05_sonriendo_dientes_uniformes | `arriba-der` | «a veces es la tele» |
| — | 58.4 | 61.9 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 11 · ≈ 41.9 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.9 s

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
   > "Misactivations are often non-deterministic, i.e., a smart speaker does not always misactivate when exposed to the same input."
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
- "Casi una vez por hora" = 0.95 activaciones por hora, el peor caso reportado ("up to"): una bocina con una sola serie (Tabla 3). En promedio de todas las series, las bocinas que más se equivocaron fueron Invoke/Cortana y Echo Dot 2.ª gen. con "Echo" (0.40 por hora, según la página del laboratorio); no se dice en la voz para no saturar.
- "Siete bocinas": el artículo dice "seven smart speakers" (4 Echo Dot, Google Home Mini, HomePod, Harman Kardon Invoke). La Invoke solo estuvo en Boston.
- "En una, una de cada diez activaciones duró diez segundos o más" = percentil 90 del HomePod (10 s); en otras bocinas fue de 9 y 8 s.
- "Por palabra" = activaciones por cada 10 000 palabras de diálogo (Narcos, 6.21, sumando todas las bocinas). Las bocinas probadas estaban configuradas en inglés.
- El botón de micrófono es la mitigación que proponen los autores ("mic off" toggle).
- La mayoría de las activaciones no se repetían igual con el mismo audio (no deterministas). El dato es de 2020 y así se dice; las bocinas han cambiado desde entonces.
- El dibujo es esquemático; el "bla bla bla…" y el "(diálogo en español)" de la tele son genéricos; solo las dos frases en inglés son del artículo. Las bocinas no llevan marca; la única nombrada en pantalla es la HomePod (barra de 10 s).
- Correcciones de la verificación (29 oct 2026): «casi una vez por hora» ahora dice que fue una bocina con una sola serie (sin nombrarla: el artículo y la página del laboratorio no coinciden en cuál); «diez segundos o más» ahora es «en una» (HomePod; las demás, 9 y 8 s); «casi todas esas activaciones» (no bocinas); se quitó el globo «¿Qué onda?».
