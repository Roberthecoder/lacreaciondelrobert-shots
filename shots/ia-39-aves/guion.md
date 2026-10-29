# Shot IA #39 · El dibujo escondido en el canto de un pájaro

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #39 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (correcciones del verificador aplicadas; las frases cambiadas se re-verifican), animación,
  Robert en pantalla, música (`gen-audio.mjs` → `assets/mezcla.wav`) y `publicacion.md` listos · hoja de revisión en `revision/hoja.png`
  · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro": macro (zanate en tu ventana + celular) → por dentro (sonido → espectrograma → red neuronal, fondo oscuro) → la misma ventana, transformada.
- **Gancho (de los 7):** #7 "Algo que tus ojos/oídos nunca van a ver": el dibujo (espectrograma) escondido en un canto.
- **Duración:** voz 952 caracteres / ~172 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base.
- **Postura de la serie:** defensa con datos (IA útil para la ciencia ciudadana), con años claros: BirdNET 2018–2020 / inicios de 2021 (artículo de 2021), uso de 2020, modelo mundial de 2023.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En el canto de ese pájaro hay un dibujo escondido. Tus oídos no lo ven. Tu celular, sí. | Fondo menta; desde el cuadro 0 un zanate canta en una ventana (pico que se abre, ondas); una mano sostiene un celular "escuchando…" con un espectrograma que corre. Etiqueta *Quiscalus mexicanus*. La cámara entra al celular. |
| 1 | Espectro | Al grabarlo, la app lo vuelve una imagen: un espectrograma. Muestra qué tan agudo, qué tan fuerte y cuánto dura cada sonido. | Fondo de circuito; "la onda del sonido…" (onda amarilla) que se despliega en un espectrograma grande que corre de derecha a izquierda; "↑ agudo / ↓ grave / tiempo →", chip "ESPECTROGRAMA" y "más brillante = más fuerte". |
| 2 | Foto | Cada canto deja su forma: rayitas, curvas, puntitos. Y la IA la mira como una foto. | Tres polaroids (rayitas, curvas, puntitos; ilustrativas); un visor de cámara se cierra sobre una; la "foto" entra a una red neuronal. Chip "la IA la lee como una foto". |
| 3 | Pregunta | ¿Pero quién le enseñó a leer esas fotos? | **Re-gancho.** "?" gigante; Robert grande. |
| 4 | Voluntarios | Miles de voluntarios que subieron millones de grabaciones de aves. | Globo terráqueo que gira con puntitos que se encienden; chips "miles de voluntarios" y "millones de grabaciones de aves". |
| 5 | Estudio | Con ellas, Cornell y una universidad de Alemania entrenaron a BirdNET: una red de ciento cincuenta y siete capas. | `TarjetaEstudio` "BirdNET · Cornell + Univ. Técnica de Chemnitz · Kahl, Wood, Eibl y Klinck · Ecological Informatics (2021)"; chip "EE. UU. + Alemania"; pila de capas que crece con contador "157 capas". |
| 6 | Crece | De 2018 a 2020 reconocía novecientas ochenta y cuatro especies de aves. A inicios de 2021, ya más de tres mil. | "984 · especies de aves (2018–2020)" → "+3 000 · inicios de 2021"; puntitos que se encienden (cada puntito = 10 especies: 98 → 300). |
| 7 | Gente | En 2020 la usaron más de un millón de personas, y con sus grabaciones se reconstruyó la ruta de migración de la grulla común en Europa. | Celulares que se encienden y "+1.1 millones · personas en 2020"; luego mapa esquemático de Europa con la ruta de la grulla común (*Grus grus*) de la península ibérica al norte; chip "igual a su ruta ya conocida". |
| 8 | Jardin | Y su modelo mundial de 2023 ya pasa de seis mil especies, entre ellas el zanate, el gorrión y la tortolita de tu jardín. | "+6 000 · modelo mundial · 2023" con chip "especies: aves y otros animales"; tres fichas: zanate (*Quiscalus mexicanus*), gorrión (*Passer domesticus*), tortolita (*Columbina inca*). |
| 9 | Cierre | Cuando cante un pájaro en tu ventana, recuerda: ahí hay una foto escondida. | **Regreso a la imagen del inicio**: la misma ventana y el zanate; ahora su canto sale dibujado como trazos de espectrograma; chip "una foto en cada canto". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (la, mi, la); cada trazo del espectrograma tiene su sonido sintetizado en el mismo cuadro (curva = silbido que sube, rayitas = cinco clics, puntitos = notas cortas repetidas); whoosh al entrar al celular, zumbido de la red, gotitas en el globo, tic por capa, golpe en "+3 000", burbujas de los celulares, acorde al completarse la ruta, acorde abierto en el cierre. Nada grabado: los cantos son sintéticos.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Pero quién le enseñó a leer esas fotos?» y en «157 capas».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «un dibujo escondido» (cuadro 0) |
| 2 | 8.6 | 12.9 | 06_pensativo_menton | `arriba-der` | «qué tan agudo, qué tan fuerte y cuánto dura» |
| 3 | 13.6 | 18.0 | 13_senalando_arriba | `izq-alto` | señala las formas y la red: «como una foto» |
| 4 | 18.2 | 21.3 | 07_pensativo_puno | `grande` | «¿Pero quién le enseñó a leer esas fotos?» |
| 5 | 28.2 | 31.5 | 04_bajando_lentes | `grande-izq` | «ciento cincuenta y siete capas» |
| 6 | 35.2 | 38.1 | 11_sorprendido | `arriba-der` | «ya más de tres mil» |
| 7 | 38.6 | 41.7 | 05_sonriendo_dientes_uniformes | `izq-alto` | «más de un millón de personas» |
| 8 | 49.2 | 53.3 | 13_senalando_arriba | `arriba-der` | señala las fichas: «el zanate, el gorrión y la tortolita» |
| 9 | 53.7 | 57.9 | 05_sonriendo_dientes_uniformes | `gancho` | «ahí hay una foto escondida» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 33.9 s (+ cierre 3.5 s) · poses distintas 6 (nunca la misma dos veces seguidas) · total 61.5 s

## Fuentes (abiertas el 29 oct 2026; ver también verificacion.md)

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
5. Historial oficial de modelos de BirdNET-Analyzer (documentación): V2.4 (junio de 2023, modelo por defecto) — "global selection of species (birds and non-birds) with 6,522 classes" (incluye unas pocas clases que no son especies: humano, perro, motor…; por eso "más de seis mil especies" y en pantalla "aves y otros animales").
6. (Contexto, no se usa) birdnet.cornell.edu: "BirdNET uses deep learning to recognize over 11,000 species globally." — no dice que sean solo aves y corresponde a BirdNET+ V3.0, en vista previa.

## Notas
- "Cornell y una universidad de Alemania" = Cornell Lab of Ornithology (K. Lisa Yang Center for Conservation Bioacoustics) y la Universidad Técnica de Chemnitz (autores Kahl y Eibl). En pantalla va el nombre.
- "Entrenaron a BirdNET: una red de 157 capas" = arquitectura derivada de ResNet, 157 capas, >27 millones de parámetros (artículo de 2021).
- "De 2018 a 2020… 984 especies de aves" y "a inicios de 2021, ya más de tres mil" = Wood et al. 2022 ("The 2018 to 2020 version could identify 984… an early 2021 update… over 3,000 species").
- "En 2020 la usaron más de un millón de personas" = >1.1 millones de participantes de la app BirdNET en 2020.
- "Se reconstruyó la ruta de migración de la grulla común" = 1,700 observaciones que coincidieron con sus rutas conocidas (península ibérica → norte de Europa). La ruta del mapa es esquemática.
- "Miles de voluntarios… millones de grabaciones" = Macaulay Library y Xeno-canto (Wood et al. 2022).
- "La app lo vuelve una imagen" = Merlin (Cornell Chronicle 2021) y la app BirdNET (interfaz con espectrograma en tiempo real).
- "Su modelo mundial de 2023 ya pasa de seis mil especies, entre ellas el zanate…" = V2.4 (6,522 clases, aves y no aves); las tres especies están en su lista. No se afirma qué tan bien las acierta.
  Nombres comunes: zanate mexicano (*Quiscalus mexicanus*), gorrión doméstico (*Passer domesticus*), tortolita cola larga (*Columbina inca*).
- Las formas de canto en pantalla y los cantos de la música son ilustrativos/sintetizados. El dibujo es esquemático.
