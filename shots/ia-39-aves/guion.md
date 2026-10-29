# Shot IA #39 · El dibujo escondido en el canto de un pájaro

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #39 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo para verificación independiente (sin animación todavía).
- **Formato:** N1 "Por dentro": macro (pájaro en tu ventana + celular) → por dentro (sonido → espectrograma → red neuronal, fondo oscuro) → la misma ventana, transformada.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": el dibujo (espectrograma) escondido en un canto.
- **Duración:** voz 951 caracteres / ~176 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** estimados en la base.
- **Postura de la serie:** defensa con datos (IA útil para la ciencia ciudadana), con años claros: BirdNET 2021, uso de 2020.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En el canto de ese pájaro hay un dibujo escondido que tus ojos nunca van a ver. Tu celular, sí. | Fondo menta; desde el cuadro 0 un zanate canta en una ventana; salen notas/ondas del pico; una mano con celular apunta y en la pantalla empieza a correr un espectrograma. |
| 1 | Espectro | Cuando grabas el canto, la app lo convierte en una imagen: un espectrograma. Muestra qué tan agudo, qué tan fuerte y cuánto dura cada sonido. | Cámara entra a la pantalla del celular (fondo oscuro): la onda se "despliega" en un espectrograma que corre de derecha a izquierda; ejes "agudo ↑ / grave ↓", "tiempo →", brillo = fuerza. |
| 2 | Foto | Cada canto deja su forma: rayitas, curvas, puntitos. Y la IA la mira como si fuera una foto. | Tres "huellas" distintas (rayitas, curvas, puntitos; ilustrativas); un marco de foto se cierra sobre una y entra a una `RedNeuronal`. |
| 3 | Pregunta | ¿Pero quién le enseñó a leer esas fotos? | **Re-gancho.** "?" gigante; Robert grande. |
| 4 | Voluntarios | Miles de voluntarios que subieron millones de grabaciones de aves. | Mapa con puntitos/micrófonos que se encienden; contador "millones de grabaciones". |
| 5 | Estudio | Con ellas, en 2021, Cornell y una universidad de Alemania presentaron BirdNET: una red de ciento cincuenta y siete capas que reconocía novecientas ochenta y cuatro especies de aves. | `TarjetaEstudio` "2021 · Cornell Lab of Ornithology + TU Chemnitz · Kahl et al. · Ecological Informatics"; pila de 157 capas que se apilan; `NumeroGigante` "984 especies". |
| 6 | Crece | Ese mismo año ya reconocía más de tres mil. | El número salta a "+3 000" (actualización de inicios de 2021). |
| 7 | Gente | En 2020, su app la usaron más de un millón de personas, y con esas grabaciones se dibujó bien la migración de una grulla en Europa. | Muchos celulares encendiéndose ("+1.1 millones de personas, 2020"); mapa de Europa con la ruta de la grulla común (*Grus grus*) de la península ibérica al norte. |
| 8 | Jardin | Y su modelo mundial incluye al zanate, al gorrión y a la tortolita de tu jardín. | Tres fichas: zanate (*Quiscalus mexicanus*), gorrión doméstico (*Passer domesticus*), tortolita cola larga (*Columbina inca*). |
| 9 | Cierre | Así que cuando cante un pájaro en tu ventana, recuerda: ahí hay una foto escondida. | **Regreso a la imagen del inicio**: la misma ventana y el zanate; ahora las notas que salen del pico se ven como el espectrograma dibujado en el aire. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y cálida; los cantos de pájaro son sintetizados (chirridos senoidales, no grabaciones reales) y cada trazo del espectrograma suena con su tono; tecleo suave en el contador; golpe en "984"; "zip" de capas que se apilan; acorde abierto en el cierre.

## Fuentes (abiertas el 29 oct 2026)

1. Kahl, S., Wood, C. M., Eibl, M. y Klinck, H. "BirdNET: A deep learning solution for avian diversity monitoring". *Ecological Informatics* 61: 101236 (2021). DOI 10.1016/j.ecoinf.2021.101236 (abstract leído en Semantic Scholar/OpenAlex; acceso abierto CC BY).
   > "We developed a DNN, called BirdNET, capable of identifying 984 North American and European bird species by sound. Our task-specific model architecture was derived from the family of residual networks (ResNets), consisted of 157 layers with more than 27 million parameters"
   > "We also found that high temporal resolution of input spectrograms (short FFT window length) improves the classification performance for bird sounds."
   > "Task-specific model designs and training regimes for audio event recognition perform on-par with very complex architectures used in other domains (e.g., object detection in images)."
2. Wood, C. M., Kahl, S., Rahaman, A. y Klinck, H. "The machine learning–powered BirdNET App reduces barriers to global bird research by enabling citizen science participation". *PLOS Biology* 20(6): e3001670 (2022). PMC9239458 (texto completo con la API de Europe PMC).
   > "Briefly, the BirdNET algorithm is a deep convolutional neural network. The 2018 to 2020 version could identify 984 North American and European bird species; an early 2021 update enabled it to identify over 3,000 species from around the world."
   > "The interface was built around a real-time spectrogram from which users actively select snippets of sound for analysis"
   > "In 2020, the BirdNET App engaged >1.1 million participants compared to 317,792 eBird participants"
   > "we mapped 1,700 observations of the Common Crane (Grus grus) … Common Crane observations corresponded with the species' known migration routes from the Iberian Peninsula to northern Europe"
   > "The BirdNET algorithm could not exist without the thousands of skilled volunteers who contributed millions of recordings to the Macaulay Library and Xeno-canto."
3. Cornell Chronicle, "What bird is singing? Merlin Bird ID app offers instant answers" (23 jun 2021). https://news.cornell.edu/node/321931
   > "Each sound recording a user makes gets converted from a waveform to a spectrogram" (el espectrograma muestra volumen, tono y duración del sonido)
   > Los investigadores empezaron a "treating the sounds as images"; usan "image classification algorithms" sobre un "picture of a bird's sound".
4. BirdNET-Analyzer (Cornell K. Lisa Yang Center for Conservation Bioacoustics "in collaboration with Chemnitz University of Technology"), lista de etiquetas del modelo global `BirdNET_GLOBAL_6K_V2.4_Labels.txt` (6 521 etiquetas), https://raw.githubusercontent.com/kahst/BirdNET-Analyzer/v1.1.0/checkpoints/V2.4/BirdNET_GLOBAL_6K_V2.4_Labels.txt:
   > "Quiscalus mexicanus_Great-tailed Grackle" · "Passer domesticus_House Sparrow" · "Columbina inca_Inca Dove"
5. (Contexto, no en la voz) birdnet.cornell.edu: "BirdNET uses deep learning to recognize over 11,000 species globally." — no dice si son solo aves, por eso no se usa.

## Notas
- "Cornell y una universidad de Alemania" = Cornell Lab of Ornithology (K. Lisa Yang Center for Conservation Bioacoustics) y la Universidad Técnica de Chemnitz (autores Kahl y Eibl). En pantalla va el nombre completo.
- "Red de 157 capas" = arquitectura derivada de ResNet, 157 capas, >27 millones de parámetros (2021).
- "Ese mismo año ya reconocía más de tres mil" = actualización de inicios de 2021 ("over 3,000 species from around the world"; incluye aves, según el artículo de la app).
- "Más de un millón de personas" = >1.1 millones de participantes de la app en 2020.
- "Se dibujó bien la migración de una grulla" = 1,700 observaciones de grulla común que coincidieron con sus rutas migratorias conocidas.
- "Miles de voluntarios… millones de grabaciones" = Macaulay Library y Xeno-canto (Wood et al. 2022).
- "La app lo convierte en una imagen" = Merlin (Cornell Chronicle 2021) y la app BirdNET (interfaz con espectrograma en tiempo real).
- "Su modelo mundial incluye al zanate…" = las tres especies están en la lista del modelo global V2.4. No se afirma qué tan bien las acierta.
  Nombres comunes: zanate mexicano (*Quiscalus mexicanus*), gorrión doméstico (*Passer domesticus*), tortolita cola larga (*Columbina inca*).
- Las "huellas" de canto en pantalla y los cantos de la música son ilustrativos/sintetizados. El dibujo es esquemático.
