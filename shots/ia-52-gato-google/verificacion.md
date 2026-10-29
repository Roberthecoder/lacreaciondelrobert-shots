# Verificación de hechos · Shot IA #52 · El gato que una computadora aprendió sola

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- **Fuentes abiertas y leídas:**
  - [A] Le, Ranzato, Monga, Devin, Chen, Corrado, Dean y Ng. "Building High-level Features Using Large Scale Unsupervised Learning". ICML 2012, Edimburgo. arXiv:1112.6209v5 (PDF completo descargado y leído; v1 enviada el 29 dic 2011, v5 del 12 jul 2012). https://arxiv.org/abs/1112.6209
  - [B] Dean, J. y Ng, A. "Using large-scale brain simulations for machine learning and A.I." Blog oficial de Google, 26 jun 2012 (fecha confirmada en la página: `datePublished 2012-06-26`). https://blog.google/technology/ai/using-large-scale-brain-simulations-for/

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Voz 0) "Esta cara borrosa… es un gato. Lo dibujó una computadora" (la imagen de la neurona del gato) | ✅ (con nota) | [A] Fig. 6 y §4.4 | "Figure 6. Visualization of the cat face neuron (left)…" · "perform numerical optimization to find the optimal stimulus" | 2012 |
| 2 | (Voz 0) "…a la que nadie le dijo qué es un gato" | ✅ | [B] | "this network had never been told what a cat was, nor was it given even a single image labeled as a cat." | 2012 |
| 3 | (Voz 1) "En 2012, Google le mostró…" (año del entrenamiento) | ⚠️ imprecisa | arXiv [A], historial de versiones | "[Submitted on 29 Dec 2011 (v1)], last revised 12 Jul 2012" — el experimento ya estaba hecho en 2011; en 2012 se presentó (ICML) y se anunció (blog) | 2011/2012 |
| 4 | (Voz 1) "diez millones de imágenes de videos de YouTube" · pantalla "10,000,000 imágenes · 200×200 px" · "un cuadro por video" | ✅ | [A] §3 y resumen | "the dataset has 10 million 200x200 pixel images" · "sampling frames from 10 million YouTube videos… each video contributes only one image to the dataset." | 2012 |
| 5 | (Voz 1) "sin decirle qué había en ninguna" | ✅ | [A] resumen · [B] | "train a face detector without having to label images as containing a face or not" · "trained from still frames from unlabeled YouTube videos" | 2012 |
| 6 | (Voz 2) "red de mil millones de conexiones" | ✅ | [A] resumen · [B] | "the model has 1 billion connections" · [B] "more than 1 billion connections" | 2012 |
| 7 | (Voz 2) "en mil computadoras, durante tres días" · pantalla "1,000 computadoras (16,000 núcleos)" · "3 días" | ✅ | [A] resumen | "a cluster with 1,000 machines (16,000 cores) for three days." | 2012 |
| 8 | (Voz 3) "una de sus neuronas se encendía con caras de gato" | ✅ (con nota) | [A] §5 · [B] | "the network learns not only the concept of faces but also the concepts of cat faces and human bodies." · "achieving 74.8% … on cat" (azar 64.8 %) · [B] "one of our artificial neurons learned to respond strongly to pictures of... cats." | 2012 |
| 9 | (Voz 5) "Su tarea: resumir cada imagen y volver a dibujarla" (autocodificador que reconstruye) | ✅ | [A] resumen y §3 | "we train a 9-layered locally connected sparse autoencoder" · "This optimization problem is also known as reconstruction Topographic Independent Component Analysis" | 2012 |
| 10 | (Voz 5) "Le convenía guardar lo que más se repite, y en YouTube hay muchos gatos" | ✅ (simplificación aceptable) | [A] §5 · [B] | "cats and body parts are quite common in YouTube." · [B] "it would learn to recognize common objects in those videos." | 2012 |
| 11 | (Voz 6) "Lo presentaron Quoc Le, Andrew Ng, Jeff Dean y su equipo en Escocia" · tarjeta "Google y Stanford · Le, Ranzato, Monga, Devin, Chen, Corrado, Dean y Ng · ICML, Edimburgo" | ✅ | [A] portada | "Appearing in Proceedings of the 29 th International Conference on Machine Learning, Edinburgh, Scotland, UK, 2012." · correos quocle@cs.stanford.edu, ang@cs.stanford.edu, resto @google.com | 2012 |
| 12 | (Voz 7) "Otras neuronas aprendieron solas caras humanas y cuerpos" · pantalla gato / cara / cuerpo | ✅ | [A] resumen y §4–5 | "we discover a feature that is highly selective for faces" · "the same network is sensitive to other high-level concepts such as cat faces and human bodies." · "Figure 6… human body neuron (right)" | 2012 |
| 13 | (Voz 8) "Con veintidós mil tipos de objetos" · pantalla "ImageNet · 22,000 categorías" | ✅ | [A] §6, Tabla 2 | "on ImageNet with 22,000 categories" · Tabla 2: "2011 (∼14M images, ∼22K categories)" | 2012 |
| 14 | (Voz 8) "acertó setenta por ciento más que el mejor sistema previo" · chip "+70 % relativo" · barras 9.3 % vs 15.8 % | ⚠️ cifra correcta, falta contexto | [A] §6, Tabla 2 · [B] | "a relative improvement of 70% over the state-of-the-art" · Tabla 2: "9.3% (Weston et al., 2011)" vs "15.8% (with unsupervised pretraining)" · "During supervised learning with labeled ImageNet images, the parameters… were both adjusted… (also known as 'fine-tuning')" · [B] "using it to augment a much more limited set of labeled data" | 2012 |
| 15 | (Voz 8) "aunque solo dieciséis de cada cien" · pantalla cuadrícula 16/100 | ✅ | [A] resumen | "we achieved 15.8% accuracy" (16 = redondeo de 15.8) | 2012 |
| 16 | (Voz 9) "según Google, tu cerebro tiene unas cien mil veces más conexiones" · pantalla "~100 billones (100 trillion)" y "comparación muy aproximada" | ✅ (con nota) | [B] | "as a very rough comparison an adult human brain has around 100 trillion connections." + "more than 1 billion connections" → 10¹⁴ / 10⁹ = 100,000 (cálculo propio; "unas" lo cubre porque la red tenía "más de" mil millones) | 2012 |
| 17 | (Voz 10) "un gato que nadie le enseñó: lo sacó de nuestros videos" | ✅ | [B] | "it 'discovered' what a cat looked like by itself from only unlabeled YouTube stills." | 2012 |

### Notas a las ✅ "con nota"
- **#1:** La imagen de la Fig. 6 la calcularon los investigadores por optimización numérica (el estímulo que más enciende a la neurona). "Lo dibujó una computadora" y el chip "lo que imaginó la red" son simplificaciones aceptables. El dibujo del shot es esquemático: decirlo en `publicacion.md`.
- **#8:** "Se encendía con caras de gato" es correcto y no exagera. Ojo: el propio artículo da dos cifras para la mejor neurona de gato: **74.8 %** (texto y parte de abajo de la Tabla 1) y **74.6 %** (parte de arriba de la Tabla 1). Si alguna vez se pone un porcentaje en pantalla, usar "≈ 75 %" o 74.8 % citando el texto, y decir que adivinar al azar ya da 64.8 %. La voz no da porcentaje: está bien así.
- **#16:** La cifra de 100 billones es la de Google en 2012 para un **adulto** ("adult human brain"). "Tu cerebro" está bien para un público adulto; la nota "comparación muy aproximada" en pantalla es obligatoria y ya está en el guion.

## Correcciones necesarias

1. **#3 · "En 2012, Google le mostró…" (⚠️).** El artículo se subió a arXiv el **29 dic 2011**, así que el entrenamiento se hizo en 2011; en 2012 se presentó en ICML y se anunció en el blog. Propuesta de voz:
   > "Google le mostró diez millones de imágenes de videos de YouTube, sin decirle qué había en ninguna."
   y dejar el año en la escena del estudio ("Lo presentaron en 2012 Quoc Le, Andrew Ng, Jeff Dean y su equipo en Escocia."). En pantalla, cambiar el chip "2012" por "estudio publicado en 2012". (Alternativa más corta para la voz: "En un estudio de 2012, Google le mostró…").
2. **#14 · "acertó setenta por ciento más…" (⚠️ por contexto).** La cifra es correcta (mejora relativa 9.3 % → 15.8 %), pero va justo después de "Otras neuronas aprendieron **solas**…", y el 15.8 % se logró **después de ajustar la red con imágenes de ImageNet etiquetadas** (preentrenamiento sin etiquetas + ajuste supervisado). Sin aclararlo, el espectador entiende que eso también fue "solo". Propuesta de voz (mismas palabras aprox.):
   > "Luego le dieron fotos con nombre: con veintidós mil tipos de objetos, acertó setenta por ciento más que el mejor sistema previo, aunque solo dieciséis de cada cien."
   En pantalla, agregar una etiqueta chica "con ajuste usando fotos etiquetadas" junto al chip "+70 % relativo".

Sin ❌. El resto queda verificado contra las fuentes originales.
