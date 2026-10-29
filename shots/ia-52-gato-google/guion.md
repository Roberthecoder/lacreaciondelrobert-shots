# Shot IA #52 · El gato que una computadora aprendió sola

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #52 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía. Voz pendiente de aprobación de Robert.
- **Formato:** N1 "Por dentro" (de la pantalla de YouTube a las neuronas de la red y de regreso) + N2 "El número" (10 millones · 1,000 computadoras · 3 días).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: la cara borrosa del "gato" que dibuja la neurona (Figura 6 del artículo).
- **Duración:** voz 948 caracteres / 173 palabras (≈ 57.7 s) + cierre 3.5 s → **≈ 61.2 s** en la base (estimar-escenas).
- **Postura de la serie:** defensa con datos (un hito real del aprendizaje sin etiquetas) y su lado honesto: acertaba poco (15.8 %) y era chiquita frente a un cerebro. Todo es de **2012** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta cara borrosa no es un fantasma: es un gato. Lo dibujó una computadora a la que nadie le dijo qué es un gato. | Fondo oscuro "por dentro de la máquina"; desde el cuadro 0 una mancha gris borrosa se enfoca poco a poco en una cara de gato fantasmal (estilo de la Fig. 6, esquemática). Chip "lo que imaginó la red". |
| 1 | Videos | En 2012, Google le mostró diez millones de imágenes de videos de YouTube, sin decirle qué había en ninguna. | Fondo brillante; una pantalla de video tipo reproductor que escupe cuadritos (un cuadro por video) a un embudo; contador "10,000,000 imágenes · 200×200 px"; etiquetas tachadas "¿gato? ¿perro? —". Chip "2012". |
| 2 | Maquina | Era una red de mil millones de conexiones, en mil computadoras, durante tres días. | `NumeroGigante` que cambia: "1,000,000,000 conexiones" → "1,000 computadoras (16,000 núcleos)" → "3 días"; racks de servidores que se encienden. |
| 3 | Neurona | Al final, una de sus neuronas se encendía con caras de gato. | Por dentro: `RedNeuronal` de capas; entra un cuadro con un gato y una sola neurona arriba se ilumina. |
| 4 | Pregunta | ¿Cómo aprende algo que nadie le explicó? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Mecanismo | Su tarea: resumir cada imagen y volver a dibujarla. Le convenía guardar lo que más se repite, y en YouTube hay muchos gatos. | Imagen → se comprime en pocas casillas → se vuelve a dibujar (más borrosa). Luego una lluvia de cuadritos de YouTube donde se repiten gatitos. |
| 6 | Estudio | Lo presentaron Quoc Le, Andrew Ng, Jeff Dean y su equipo en Escocia. / Otras neuronas aprendieron solas caras humanas y cuerpos. | `TarjetaEstudio` "2012 · Google y Stanford · Le, Ranzato, Monga, Devin, Chen, Corrado, Dean y Ng · ICML, Edimburgo". Después tres neuronas con su "cara" esquemática: gato, cara humana, cuerpo. |
| 7 | Objetos | Con veintidós mil tipos de objetos, acertó setenta por ciento más que el mejor sistema previo, aunque solo dieciséis de cada cien. | Barras: "mejor sistema previo 9.3 %" contra "esta red 15.8 %" (chip "+70 % relativo"); `Cuadricula` de 100 donde se pintan 16. "ImageNet · 22,000 categorías". |
| 8 | Cerebro | Y era chiquita: según Google, tu cerebro tiene unas cien mil veces más conexiones. | Comparativa: puntito "red: mil millones" contra cerebro gigante "~100 billones (100 trillion en inglés)". Nota "comparación muy aproximada". |
| 9 | Cierre | Así que esta cara borrosa es un gato que nadie le enseñó: lo sacó de nuestros videos. | **Regreso a la imagen del inicio**: la misma cara borrosa, ahora dentro de un marco de reproductor de YouTube rodeada de miniaturas de gatos. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua con zumbido de servidores; cada cuadrito que cae al embudo es un tic; los racks se encienden con un "clac" ascendente; la neurona que se ilumina hace un "ding"; la compresión/reconstrucción suena como un barrido; un maullido sintético muy suave (generado, no grabado) cuando aparece el gato del cierre.

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
- "Google le mostró": el trabajo fue de Google con Stanford (Andrew Ng era profesor visitante); se dice en la tarjeta.
- La cara del gato del gancho y del cierre es un dibujo esquemático inspirado en la Figura 6, no la imagen original.
- No se compara con modelos de hoy (no se verificó una cifra actual en fuente primaria).
