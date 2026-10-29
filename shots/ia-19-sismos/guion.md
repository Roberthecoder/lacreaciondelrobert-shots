# Shot IA #19 · ¿La IA puede predecir sismos? Lo que sí y lo que no

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #19 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N3 "Capítulos y medidores" (lo que NO · la alerta · lo que SÍ: escuchar · laboratorio · la polémica) con un toque de N2 (el número "2 contra 13 451").
- **Gancho (de los 7):** #6 Mito peligroso "¿Por qué NO…?": «¿Por qué no debes creerle a quien jura que mañana tiembla?». Conecta con México: todos hemos recibido una cadena de "mañana tiembla".
- **Duración:** voz 966 caracteres / 173 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base (estimar-escenas).
- **Postura de la serie:** la defendemos y la criticamos con datos: la IA no predice sismos (USGS), pero sí ayuda a escucharlos (catálogos, laboratorio); y un caso de "bombo" (réplicas, 2018) que una fórmula simple igualó (2019). No se dice que la alerta sísmica use IA.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | ¿Por qué no debes creerle a quien jura que mañana tiembla? Ningún científico ha predicho nunca un sismo grande. Ni con IA. | Fondo amarillo; desde el cuadro 0 un celular vibra con una cadena: "⚠️ MAÑANA 3:14 pm TIEMBLA FUERTE 😱 ¡Compártelo!". El robotito de IA con bola de cristal; sello rojo "NADIE LO HA LOGRADO" (USGS). |
| 1 | Predecir | Predecir es dar fecha, lugar y magnitud. Eso nadie lo ha logrado. | Tres casillas: 📅 fecha · 📍 lugar · 📈 magnitud; las tres quedan vacías con una ✗. Chip "USGS". |
| 2 | Alerta | ¿Y la alerta sísmica? Tampoco predice: detecta el sismo cuando ya empezó y avisa antes de que llegue la sacudida. | Mapa esquemático: costa del Pacífico con sensores (puntos) → un sismo empieza en la costa → la señal de radio viaja rápido a la ciudad mientras la onda sísmica viaja más lenta; altavoz "ALERTA SÍSMICA"; chip "aviso de segundos (≈ 20 a 120 s según la distancia)". Etiqueta "detecta ≠ predice". |
| 3 | Escuchar | La IA sí ayuda escuchando. En dos mil veinte, una red revisó cinco semanas de datos de Japón y halló el doble de sismos. | Sismograma con mucho ruido; una red neuronal lo "escucha" y marca picos diminutos. Comparativa: "catálogo: X" contra "EQTransformer: el doble ×2" · tarjeta "2020 · Stanford · Mousavi et al. · Nature Communications · Tottori, Japón (datos del año 2000)". |
| 4 | Pregunta | ¿Y si pudiera oír que una falla está por romperse? | **Re-gancho.** "?" gigante sobre una falla (dos bloques de roca); Robert grande pensativo. |
| 5 | Laboratorio | En dos mil diecisiete, en Los Álamos, Estados Unidos, una IA calculó cuánto faltaba para cada sismo de laboratorio oyendo un ruido que creían inútil. | Máquina de laboratorio: un bloque que empuja entre dos placas; micrófono; ondas de sonido; medidor "tiempo para el siguiente sismo" que baja a 0 y ¡clac!, se repite. Etiqueta "ruido… que no era ruido". Tarjeta "2017 · Los Alamos National Laboratory · Rouet-Leduc et al. · GRL". |
| 6 | Laboratorio | Pero era una máquina, no la Tierra. | Zoom out: la máquina chiquita junto a un planeta Tierra enorme; chip "laboratorio ≠ planeta". |
| 7 | Replicas | En dos mil dieciocho, Harvard y Google dijeron que una red neuronal ubicaba réplicas mejor que el método clásico. | Mapa de cuadritos alrededor de un sismo grande que se iluminan (réplicas); barras "red neuronal 0.85" vs "método clásico (Coulomb) 0.58" (nota: AUC, qué tanto atina). Tarjeta "2018 · Harvard + Google · DeVries et al. · Nature". |
| 8 | Neurona | Un año después, otros científicos lo igualaron con una fórmula de dos números. La red usaba más de trece mil. | **Dato fuerte.** Comparativa N2: una sola bolita (neurona) con "2" contra una red enorme con "13 451"; las barras de acierto quedan iguales (0.85 = 0.85). Tarjeta "2019 · Mignan y Broccardo · Nature". Robert grande riéndose. |
| 9 | Cierre | Si te llega ese mensaje, bórralo. La IA no adivina sismos: aprende a escucharlos. | **Regreso a la imagen del inicio**: el mismo celular con la cadena "MAÑANA TIEMBLA"; se arrastra a la basura 🗑️; el robotito cambia la bola de cristal por unos audífonos y un sismograma. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (retumbo suave de tierra); vibración del celular al inicio, "tachón" de las tres ✗, sirena corta y lejana de la alerta (sin imitar la oficial), tic-tac de radio, pitidos al marcar cada sismo diminuto, crujido de la falla, "clac" de cada sismo de laboratorio, zumbido de la red neuronal, un solo "ding" para la neurona, y la cadena que cae a la basura.

## Fuentes (abiertas el 29 oct 2026)

1. **USGS**, FAQ "Can you predict earthquakes?" (usgs.gov/faqs/can-you-predict-earthquakes), consultada 2026.
   > "No. Neither the USGS nor any other scientists have ever predicted a major earthquake."
   > "An earthquake prediction must define 3 elements: 1) the date and time, 2) the location, and 3) the magnitude."
2. **CENAPRED** (gobierno de México), "Sistemas de monitoreo y el Sistema de Alerta Sísmica Nacional", 28 jun 2019 (gob.mx/cenapred/articulos/sistemas-de-monitoreo-y-el-sistema-de-alerta-sismica-nacional).
   > "Se encuentra a cargo del Centro de Instrumentación y Registro Sísmico, A. C. (CIRES)"
   > "pionero en brindar el servicio de difusión de alertas públicas automáticamente cuando se presenta un sismo"
   > "el SASMEX ha proporcionado avisos de Alerta con un tiempo de oportunidad de aproximadamente 100 segundos" (CDMX, "debido a la gran distancia hasta la costa de Guerrero").
3. **Gobierno de México**, presentación "Tema 3. Sistemas de Alerta Temprana" (gob.mx/cms/uploads/attachment/file/845307/Tema_3__Sistemas_de_Alerta_Temprana.pdf; cita a CIRES, CENAPRED y SSN).
   > "El Sistema de Alerta Sísmica Mexicano (SASMEX) dispone de 97 sensores que cubre el peligro sísmico de la Costa del Pacífico desde Puerto Vallarta (Jalisco), hasta Salina Cruz (Oaxaca)…"
   > "la alerta sísmica se activará: 1. Si en los primeros segundos de la detección sísmica, al menos 2 estaciones rebasan los niveles de energía preestablecida."
   > "Proporciona desde 20 hasta 120 segundos de tiempo de oportunidad aproximadamente, antes de la llegada de un sismo dependiendo de la distancia al epicentro y las primeras detecciones de las estaciones."
   - (La página oficial cires.org.mx/sasmex_es.php no cargó su contenido desde la nube; ninguna fuente dice que el SASMEX use IA, y el guion no lo afirma.)
4. **Mousavi, S. M., Ellsworth, W. L., Zhu, W., Chuang, L. Y. y Beroza, G. C.** "Earthquake transformer—an attentive deep-learning model for simultaneous earthquake detection and phase picking". *Nature Communications* 11: 3952 (agosto de 2020). DOI 10.1038/s41467-020-17591-w · PMC7415159 (resumen abierto en Europe PMC). Universidad de Stanford.
   > "Applying our model to 5 weeks of continuous data recorded during 2000 Tottori earthquakes in Japan, we were able to detect and locate two times more earthquakes using only a portion (less than 1/3) of seismic stations."
   > "its high efficiency and higher sensitivity can result in detecting and characterizing more and smaller events."
5. **Rouet-Leduc, B., Hulbert, C., Lubbers, N., Barros, K., Humphreys, C. J. y Johnson, P. A.** "Machine Learning Predicts Laboratory Earthquakes". *Geophysical Research Letters* 44: 9276–9282 (2017). DOI 10.1002/2017GL074677 · arXiv 1702.05774 (preprint abierto). Los Alamos National Laboratory (y U. de Cambridge).
   > "by listening to the acoustic signal emitted by a laboratory fault, machine learning can predict the time remaining before it fails with great accuracy."
   > "machine learning identifies a signal emitted from the fault zone previously thought to be low-amplitude noise that enables failure forecasting throughout the laboratory quake cycle."
6. **DeVries, P. M. R., Viégas, F., Wattenberg, M. y Meade, B. J.** "Deep learning of aftershock patterns following large earthquakes". *Nature* 560: 632–634 (agosto de 2018). DOI 10.1038/s41586-018-0438-y (resumen en Europe PMC).
   > "a neural network trained on more than 131,000 mainshock-aftershock pairs can predict the locations of aftershocks in an independent test dataset of more than 30,000 mainshock-aftershock pairs more accurately (area under curve of 0.849) than can classic Coulomb failure stress change (area under curve of 0.583)."
   - Harvard Gazette (sept 2018): Meade, "professor of earth and planetary sciences", y DeVries, "a postdoctoral fellow working in his lab"; "This research was supported with funding from Harvard University and Google." (Viégas y Wattenberg, de Google.)
7. **Mignan, A. y Broccardo, M.** "One neuron versus deep learning in aftershock prediction". *Nature* 574: E1–E3 (octubre de 2019, Matters Arising). DOI 10.1038/s41586-019-1582-8 · preprint arXiv 1904.01983 (con journal_ref Nature 574, 2019).
   > "We reformulate the 2017 results in probabilistic terms using logistic regression (i.e., one neural network node) and obtain AUC = 0.85 using 2 free parameters versus the 13,451 parameters used by DeVries et al. (2018)."
   > "This suggests that DL - in fact - does not improve prediction compared to simpler baseline models."

## Notas
- "Ningún científico ha predicho nunca un sismo grande" = frase del USGS ("major earthquake"). "Ni con IA" se deduce de lo anterior (ningún científico, con ningún método); el USGS no menciona la IA.
- "Predecir es dar fecha, lugar y magnitud" = los 3 elementos del USGS.
- Alerta sísmica: se dice solo que detecta el sismo ya empezado (detección en los primeros segundos en estaciones de la costa) y avisa antes de la llegada de la sacudida. **No se le atribuye IA.** Los segundos de aviso (20–120 s, ~100 s en CDMX) solo van en pantalla como chip.
- "Una red" (escena 3) = EQTransformer, red de aprendizaje profundo (Stanford). "El doble de sismos" = "two times more earthquakes" que el catálogo de referencia, con menos de un tercio de las estaciones; datos de 5 semanas de los sismos de Tottori (Japón) del año 2000, artículo de 2020.
- "Sismo de laboratorio" = falla de laboratorio en un aparato de cizalla; "un ruido que creían inútil" = "previously thought to be low-amplitude noise". Se aclara que es una máquina, no la Tierra.
- "Ubicaba réplicas mejor que el método clásico" = AUC 0.849 contra 0.583 (cambio de esfuerzo de Coulomb).
- "Lo igualaron con una fórmula de dos números; la red usaba más de trece mil" = regresión logística (una sola neurona) con 2 parámetros libres, AUC 0.85, contra 13 451 parámetros. Los autores originales respondieron en el mismo número de *Nature* (2019); el guion solo dice lo que mostraron Mignan y Broccardo.
- Los años de cada estudio se dicen (2017, 2018, 2019, 2020). El dibujo es esquemático.
