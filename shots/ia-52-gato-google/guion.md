# Shot IA #52 · El gato que una computadora aprendió sola

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #52 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado y corregido (2 ⚠️ atendidas: el año va como «estudio de 2012» y el 70 % aclara que fue «con fotos con nombre»), animación, Robert en pantalla, música y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro" (de la pantalla de YouTube a las neuronas de la red y de regreso) + N2 "El número" (10 millones · 1,000 computadoras · 3 días).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: la cara borrosa del "gato" que dibuja la neurona (Figura 6 del artículo).
- **Duración:** voz 950 caracteres (≈ 57.9 s) + cierre 3.5 s → **61.4 s** en la base (estimar-escenas).
- **Postura de la serie:** defensa con datos (un hito real del aprendizaje sin etiquetas) y su lado honesto: acertaba poco (15.8 %) y era chiquita frente a un cerebro. El estudio se publicó en **2012** (arXiv dic 2011) y se dice «estudio de 2012».

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta cara borrosa no es un fantasma: es un gato. Lo dibujó una computadora a la que nadie le dijo qué es un gato. | Fondo oscuro "por dentro de la máquina"; desde el cuadro 0 una mancha gris borrosa se enfoca poco a poco en una cara de gato fantasmal (estilo de la Fig. 6, esquemática). Chip "lo que imaginó la red". |
| 1 | Videos | En un estudio de 2012, Google le mostró diez millones de imágenes de YouTube, sin decirle qué mostraban. | Fondo cian; un reproductor de video genérico que cambia de cuadro y lanza cuadritos a una pila; contador "10,000,000" + "imágenes · 1 por video · 200 × 200 píxeles"; «etiqueta: gato» tachada. Chip "estudio publicado en 2012". |
| 2 | Maquina | Era una red de mil millones de conexiones, en mil computadoras, durante tres días. | `NumeroGigante` que cambia: "1,000,000,000 conexiones" → "1,000 computadoras" + chip "16,000 núcleos" → "3 días" con tres soles; cinco racks de servidores que se encienden. |
| 3 | Neurona | Al final, una de sus neuronas se encendía con caras de gato. | Por dentro: entra un cuadrito con un gato, una onda cruza la `RedNeuronal` y la neurona final se ilumina con la cara borrosa adentro; chip "1 neurona → «cara de gato»". |
| 4 | Pregunta | ¿Cómo aprende algo que nadie le explicó? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Mecanismo | Su tarea: resumir cada imagen y redibujarla. Le convenía guardar lo más repetido, y en YouTube hay muchos gatos. | Imagen → 6 casillas («1 · resume») → la misma imagen redibujada, borrosa («2 · vuelve a dibujar»). Luego 12 cuadritos variados; los de gato laten con marco dorado: «lo que más se repite → se guarda» (ilustrativo). |
| 6 | Estudio | Lo presentaron Quoc Le, Andrew Ng, Jeff Dean y su equipo en Escocia. / Otras neuronas aprendieron solas caras humanas y cuerpos. | `TarjetaEstudio` "2012 · Google y Stanford · Le, Ng, Dean y 5 más · congreso ICML, Edimburgo". Después tres caras borrosas esquemáticas que se enfocan: gato, cara humana, cuerpo. |
| 7 | Objetos | Luego le dieron fotos con nombre: con veintidós mil tipos de objetos, acertó setenta por ciento más que el récord previo, aunque solo dieciséis de cada cien. | Chips "después: fotos con nombre" y "ImageNet · 22,000 tipos de objetos"; barras "mejor sistema previo 9.3 %" contra "esta red 15.8 %"; chip "+70 % relativo" con etiqueta chica "con ajuste usando fotos etiquetadas"; `Cuadricula` de 100 donde se pintan 16: "aciertos: 16 de cada 100". |
| 8 | Cerebro | Y era chiquita: según Google, tu cerebro tiene unas cien mil veces más conexiones. | Puntito "la red" contra un cerebro grande; chips "≈ 100,000 × más conexiones" y "comparación muy aproximada (Google, 2012)". |
| 9 | Cierre | Esta cara borrosa es un gato que nadie le enseñó: salió de nuestros videos. | **Regreso a la imagen del inicio**: la misma cara borrosa en el mismo lugar, ahora dentro de un marco de reproductor con barra roja, rodeada de cuadritos de gatos, sobre fondo amarillo; chip "aprendido de videos sin etiquetas". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (`gen-audio.mjs`, todo sintetizado); la cara se enfoca con un tono que sube; un tic por cada cuadro del video y un soplido por cada cuadrito que vuela a la pila; la etiqueta se tacha con un crujido; motor de servidores y tics ascendentes cuando se encienden los racks; tres notas por los tres días; un «ding» cuando se enciende la neurona; barridos al resumir y redibujar; 16 tics para los 16 aciertos; golpe y latido con el cerebro; acorde final en el cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Cómo aprende algo que nadie le explicó?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «no es un fantasma: es un gato» (cuadro 0) |
| 2 | 9.8 | 12.9 | 04_bajando_lentes | `arriba-der` | «sin decirle qué mostraban» |
| 3 | 18.7 | 21.8 | 13_senalando_arriba | `izq-alto` | señala la neurona que se enciende con caras de gato |
| 4 | 22.0 | 25.7 | 07_pensativo_puno | `grande` | «¿Cómo aprende algo que nadie le explicó?» |
| 5 | 27.8 | 31.0 | 06_pensativo_menton | `izq-alto` | «le convenía guardar lo más repetido» |
| 6 | 35.7 | 38.8 | 05_sonriendo_dientes_uniformes | `arriba-der` | «otras neuronas aprendieron solas caras humanas y cuerpos» |
| 7 | 45.6 | 48.2 | 10_serio_molesto | `izq-alto` | «aunque solo dieciséis de cada cien» |
| 8 | 48.6 | 53.1 | 11_sorprendido | `arriba-der` | «unas cien mil veces más conexiones» |
| 9 | 53.7 | 57.8 | 13_senalando_arriba | `arriba-der` | «un gato que nadie le enseñó» |
| — | 57.9 | 61.4 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 32.2 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.4 s

## Fuentes (abiertas en la fuente original el 29 oct 2026)

1. Le, Q. V., Ranzato, M., Monga, R., Devin, M., Chen, K., Corrado, G. S., Dean, J. y Ng, A. Y. "Building High-level Features Using Large Scale Unsupervised Learning". *Proceedings of the 29th International Conference on Machine Learning* (ICML), Edimburgo, Escocia, 2012. arXiv:1112.6209v5 (12 jul 2012), https://arxiv.org/abs/1112.6209 (PDF abierto y leído completo).
   > "the model has 1 billion connections, the dataset has 10 million 200x200 pixel images downloaded from the Internet). We train this network using model parallelism and asynchronous SGD on a cluster with 1,000 machines (16,000 cores) for three days." (2012)
   > "Our training dataset is constructed by sampling frames from 10 million YouTube videos. To avoid duplicates, each video contributes only one image to the dataset." (2012)
   > "it is possible to train a face detector without having to label images as containing a face or not." (2012)
   > "We also find that the same network is sensitive to other high-level concepts such as cat faces and human bodies." (2012)
   > "cats and body parts are quite common in YouTube." (2012)
   > Figura 6: "Visualization of the cat face neuron (left) and human body neuron (right)." (2012)
   > "Our high-level detectors also outperform standard baselines in terms of recognition rates, achieving 74.8% and 76.7% on cat and human body respectively." (Tabla 1: adivinar al azar 64.8 %.) (2012)
   > "on ImageNet with 22,000 categories, we achieved 15.8% accuracy, a relative improvement of 70% over the stateof-the-art." Tabla 2: estado del arte 9.3 % (Weston et al., 2011) contra 15.8 %. (2012)
   > "Appearing in Proceedings of the 29 th International Conference on Machine Learning, Edinburgh, Scotland, UK, 2012." (2012)
   > Mecanismo: "we train a 9-layered locally connected sparse autoencoder" (un autocodificador aprende a reconstruir su entrada a partir de una versión comprimida). (2012)
2. Dean, J. y Ng, A. "Using large-scale brain simulations for machine learning and A.I." Blog oficial de Google, 26 de junio de 2012. https://blog.google/technology/ai/using-large-scale-brain-simulations-for/
   > "trained from still frames from unlabeled YouTube videos, learned to detect cats." (2012)
   > "Remember that this network had never been told what a cat was, nor was it given even a single image labeled as a cat." (2012)
   > "spread the computation across 16,000 of our CPU cores" · "more than 1 billion connections" (2012)
   > "as a very rough comparison an adult human brain has around 100 trillion connections." (2012)
   > "we saw a 70 percent relative improvement in accuracy." (2012)

## Notas
- "Cien mil veces más conexiones" = 100 billones (100 trillion) ÷ mil millones (1 billion), según la comparación "muy aproximada" del blog de Google de 2012 ("adult human brain"). Se dice "según Google".
- "Una por video": cada uno de los 10 millones de videos aporta un solo cuadro (no se dice en la voz, va en pantalla).
- "Se encendía con caras de gato": la mejor neurona para gatos distinguía caras de gato con 74.8 % de acierto contra 64.8 % de adivinar "no" siempre. No era perfecta; por eso la voz no dice que "reconocía todos los gatos".
- "Setenta por ciento más": mejora **relativa** (9.3 % → 15.8 %). "Dieciséis de cada cien" redondea 15.8 %.
- Para ImageNet la red se ajustó después con imágenes etiquetadas (preentrenamiento sin etiquetas + ajuste); la voz no dice que eso fuera sin etiquetas.
- "Mil computadoras" = "1,000 machines (16,000 cores)"; los 16,000 núcleos van en pantalla.
- "Estudio de 2012": el artículo se subió a arXiv el 29 dic 2011 (entrenamiento en 2011) y se presentó en ICML 2012; por eso no se dice "en 2012 le mostró".
- Si alguna vez se pone el % de la neurona de gato en pantalla: "≈ 75 %" (74.8 % en el texto, 74.6 % en una fila de la Tabla 1), con el 64.8 % de adivinar al azar.
- "Google le mostró": el trabajo fue de Google con Stanford (Andrew Ng era profesor visitante); se dice en la tarjeta.
- La cara del gato del gancho y del cierre es un dibujo esquemático inspirado en la Figura 6, no la imagen original.
- No se compara con modelos de hoy (no se verificó una cifra actual en fuente primaria).
