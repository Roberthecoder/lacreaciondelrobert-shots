# Shot IA #11 · Tu foto de noche no es una foto: son hasta trece

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #11 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N1 "Por dentro": de la foto en tu celular (macro) → al sensor y la ráfaga (micro, fondo oscuro) → la misma foto, ya "armada" (macro).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": «Esa foto que tomaste de noche no es una foto: son hasta trece fotos encimadas».
- **Duración:** voz 945 caracteres (≈ 58.0 s estimados) + cierre 3.5 s → **61.5 s** en la base.
- **Postura de la serie:** ni magia ni "todo es IA": se separa con datos qué parte es algoritmo clásico (alinear y juntar) y qué parte es aprendizaje automático (el balance de blancos). Se dice que es el sistema de Google descrito en 2019; no se afirma cómo lo hacen otras marcas.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa foto que tomaste de noche no es una foto: son hasta trece fotos encimadas. Así lo hace el modo noche de los Pixel de Google. | Fondo azul noche con estrellitas; una mano sostiene un celular; en la pantalla, una foto de noche (una calle con un farol y una persona). Desde el cuadro 0 suena el clic y la foto se "abre" en abanico: 13 hojas transparentes encimadas, contador "×13". Chip "modo noche · Pixel de Google". |
| 1 | Sensor | En el sensor, cada pixel es diminuto: con poca luz atrapa poquito y la foto sale llena de ruido. | La cámara entra por la lente al sensor (fondo oscuro): cuadrícula de pixeles (mosaico rojo-verde-azul), caen poquitos "puntitos de luz"; la foto de una sola toma se ve granulosa. Barra de escala "≈ 1 µm" (ilustrativa, ver Notas). |
| 2 | Pulso | Si dejara la foto abierta mucho rato, tu pulso la barrería. | La misma foto con exposición larga: el farol deja una estela temblorosa; la mano se mueve. |
| 3 | Rafaga | Por eso toma una ráfaga de fotos cortas, de hasta un tercio de segundo. | Salen cuadros uno tras otro (1…13) con un cronómetro "≤ 0.33 s" en cada uno; cada cuadro es oscuro y granuloso. |
| 4 | Alinear | Las alinea pedacito por pedacito y las junta: el ruido baja y lo real se queda. | Los cuadros se parten en mosaicos que se acomodan (flechitas) y se apilan; el ruido se desvanece y aparecen el farol y la cara nítidos. |
| 5 | Pregunta | ¿Y dónde está la inteligencia artificial? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Clasico | Alinear y juntar es matemática clásica, no una red neuronal. | Dos columnas: "alinear y juntar → matemática clásica (Fourier, filtro de Wiener)" con regla y compás; una red neuronal tachada sobre esa columna. |
| 7 | Color | Lo que sí aprendió es el color: un modelo entrenado con cinco mil fotos ajustadas por fotógrafos profesionales. | `RedNeuronal` pequeña que recibe una foto naranja (luz de farol) y la devuelve con el color corregido; cuadrícula de miniaturas "5 000 fotos" con un gotero de blanco. |
| 8 | Estudio | Google lo publicó en 2019: funciona hasta con tres décimas de lux, cuando tus ojos ya casi no ven colores. | `TarjetaEstudio` "2019 · Google Research · Liba et al. · ACM Transactions on Graphics". Medidor de luz que baja a "0.3 lux"; un ojo ve la escena en grises mientras el celular la ve en color. |
| 9 | Temblor | Y en el zoom usan tu temblor: tu mano tiembla de ocho a doce veces por segundo y cada foto sale apenas corrida. | Mano que vibra (onda 8–12 Hz); la cuadrícula de pixeles se corre una fracción de pixel entre cuadro y cuadro y se llena de detalle. Chip "Super Res Zoom · 2019". |
| 10 | Cierre | Tu foto de noche no fue un clic: fueron muchas, y la matemática las volvió una sola. | **Regreso a la imagen del inicio:** el mismo celular y la misma foto de noche; las 13 hojas del abanico se cierran en una sola foto nítida y a color. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y continua, nocturna. Clic de cámara en el cuadro 0; cada hoja del abanico y cada cuadro de la ráfaga, un "tic" de obturador (13 tics); el ruido del sensor como un siseo que baja al juntar los cuadros; un acorde que se abre cuando la foto queda limpia; un zumbido suave y rápido (temblor) en el zoom; un clic final al cerrarse el abanico.

## Fuentes (cifras abiertas en el PDF original el 29 oct 2026)

1. Liba, O., Murthy, K., Tsai, Y.-T., Brooks, T., Xue, T., Karnad, N., He, Q., Barron, J. T., Sharlet, D., Geiss, R., Hasinoff, S. W., Pritch, Y. y Levoy, M. "Handheld Mobile Photography in Very Low Light". *ACM Transactions on Graphics* 38(6), art. 164 (SIGGRAPH Asia, noviembre de 2019). DOI 10.1145/3355089.3356508 · arXiv:1910.11336. Google Research.
   > "Our system, which launched to the public in November 2018 as Night Sight on Google Pixel smartphones"
   > "Based on this exposure time, we capture and merge a burst of 6–13 frames (Section 3)." (Fig. 2)
   > "robustly aligning and merging a larger number of frames (13 frames instead of 6)" (Fig. 1, a ≈ 0.4 lux)
   > "When the device is handheld, we capture up to 333 ms exposures; when we detect the device is stabilized, we capture up to 1 s exposures."
   > "In this paper we describe a system for capturing clean, sharp, colorful photographs in light as low as 0.3 lux, where human vision becomes monochromatic and indistinct."
   > "To ensure accurate colors in such low light, we employ a learning-based auto white balancing algorithm."
   > "FFCC is learning-based, and so its performance depends critically on the nature of the data used during training. … we collected 5000 images of various scenes with a wide range of light levels … we recruited professional photographers to manually "tag" the most aesthetically preferable white balance for each scene, according to their judgment."
   > "Lengthening the exposure time leads to an increased chance of motion blur, especially when the device is handheld or if there are moving objects in the scene."
   > Sobre el estimador de movimiento: "Bounded Flow is as accurate as other methods that are not based on neural networks."

2. Hasinoff, S. W., Sharlet, D., Geiss, R., Adams, A., Barron, J. T., Kainz, F., Chen, J. y Levoy, M. "Burst photography for high dynamic range and low-light imaging on mobile cameras". *ACM Transactions on Graphics* 35(6), art. 192 (SIGGRAPH Asia, diciembre de 2016). DOI 10.1145/2980179.2980254. Google (HDR+).
   > "Cell phone cameras have small apertures, which limits the number of photons they can gather, leading to noisy images in low light. They also have small sensor pixels, which limits the number of electrons each pixel can store"
   > "We describe a computational photography pipeline that captures, aligns, and merges a burst of frames to reduce noise and increase dynamic range."
   > "we use a novel FFT-based alignment algorithm and a hybrid 2D/3D Wiener filter to denoise and merge the frames in a burst."
   > "The standard solution is either to apply analog or digital gain, which amplifies noise, or to lengthen exposure time, which causes motion blur due to camera shake or subject motion."
   > "we produce a tile-based alignment for each pyramid level" (alinear "pedacito por pedacito").
   > "In practice, we limit our bursts to 2–8 images" (fotos de día con HDR+, 2016; dato de contexto, no va en la voz).

3. Wronski, B., Garcia-Dorado, I., Ernst, M., Kelly, D., Krainin, M., Liang, C.-K., Levoy, M. y Milanfar, P. "Handheld Multi-Frame Super-Resolution". *ACM Transactions on Graphics* 38(4), art. 28 (SIGGRAPH, julio de 2019). DOI 10.1145/3306346.3323024 · arXiv:1905.03277. Google Research.
   > "We harness natural hand tremor, typical in handheld photography, to acquire a burst of raw frames with small offsets."
   > "The movement is highly periodic, with a frequency in the range of 8–12 Hz, and its movement is small in magnitude but random [Marshall and Walsh 1956]."
   > "Specifically, the algorithm is the basis of the Super-Res Zoom feature, as well as the default merge method in Night Sight mode (whether zooming or not) on Google's flagship phone."

## Notas
- "Hasta trece fotos": rango de 6–13 cuadros del modo noche descrito en 2019 (Liba et al.). Con tripié el artículo muestra 6 cuadros de 1 s; no se menciona en la voz. El número exacto depende de la luz y del movimiento ("motion metering").
- "Un tercio de segundo" = 333 ms, máximo por cuadro cuando el celular está en la mano.
- "Así lo hace el modo noche de los Pixel": Night Sight salió en noviembre de 2018 y el artículo lo describe en 2019. Otras marcas usan técnicas parecidas, pero no se afirma nada de ellas.
- "Matemática clásica, no una red neuronal": la alineación (FFT, pirámide de mosaicos) y la mezcla (filtro de Wiener) son algoritmos clásicos en HDR+ y en el modo noche; el estimador de movimiento del modo noche tampoco es una red neuronal. La parte aprendida descrita es el balance de blancos (FFCC entrenado con 5 000 imágenes etiquetadas por fotógrafos profesionales). No se afirma nada de versiones posteriores (Pixel más nuevos).
- "Tres décimas de lux" = 0.3 lux. "Tus ojos ya casi no ven colores" parafrasea "human vision becomes monochromatic and indistinct".
- El temblor de 8–12 Hz lo cita Wronski et al. (2019) de Marshall y Walsh (1956); se usa en Super Res Zoom.
- La barra de escala del pixel (~1 µm) es ilustrativa; si no se verifica con una fuente, se quita o se pone sin número.
- El dibujo es esquemático.
