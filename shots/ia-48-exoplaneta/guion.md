# Shot IA #48 · El planeta escondido que encontró una red neuronal

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #48 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo para verificación independiente. Falta animación, tabla "Robert en pantalla" y `publicacion.md`.
- **Formato:** N1 "Por dentro" (por dentro de una curva de luz): macro (una estrella en el cielo) → micro (la curva de brillo, fondo oscuro) → la misma estrella, ya con sus ocho planetas.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": un planeta que solo se nota porque su estrella se apaga un poquito.
- **Duración:** voz 964 caracteres / 169 palabras (≈ 58 s) + cierre 3.5 s → **61.5 s** en la base (estimar-escenas).
- **Postura de la serie:** defensa con datos (un uso de la IA que sí sirvió a la ciencia). El hallazgo es de **2017** y se dice; el récord se revisó hoy en el NASA Exoplanet Archive.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este planeta nunca lo vas a ver con tus ojos: solo se nota porque su estrella se apaga un poquito. | Fondo azul noche con estrellas; desde el cuadro 0 una estrella amarilla que late y una lupa que no ve ningún planeta; abajo empieza a dibujarse una línea de brillo que baja un poquito. |
| 1 | Transito | Al pasar enfrente, tapa casi nada de su luz: como si de diez mil focos se apagara uno. | Acercamiento: un puntito negro cruza el disco de la estrella; la curva de luz hace un "escalón" diminuto. Cuadrícula de focos que se llena y uno solo se apaga ("1 de cada 10 000", aproximado). |
| 2 | Kepler | El telescopio Kepler de la NASA midió el brillo de más de ciento cincuenta mil estrellas por cuatro años. | El telescopio Kepler (dibujo) mirando un parche de cielo lleno de estrellas; contador "150 000+ estrellas" y "4 años". |
| 3 | Ruido | Juntó treinta y cinco mil señales posibles; las más débiles solían perderse. | Montón de curvas de luz ("35 000 señales"); las más débiles se pierden entre el ruido (líneas temblorosas grises). |
| 4 | Pregunta | ¿Y si una máquina hallaba lo que se nos escapó? | **Re-gancho.** "?" gigante sobre las curvas; Robert grande. |
| 5 | Entrena | Christopher Shallue, de Google, y el astrónomo Andrew Vanderburg entrenaron una red neuronal con más de quince mil señales ya revisadas. | Fondo de circuito: `RedNeuronal` que recibe curvas etiquetadas "planeta ✔" / "falsa alarma ✗"; contador "15 000+ señales revisadas". Chips con los dos nombres. |
| 6 | Busca | En 2017 la pusieron a buscar en seiscientas setenta estrellas que ya tenían planetas. | `TarjetaEstudio` "2017 · Google + Univ. de Texas en Austin · Shallue y Vanderburg · *The Astronomical Journal* (2018)"; una cuadrícula de 670 estrellas que el robotito escanea. |
| 7 | Hallazgo | Y junto a la estrella Kepler-90 encontró uno escondido: Kepler-90i. | La red se ilumina sobre una curva con un escalón finito; zoom a la estrella "Kepler-90" y aparece un planeta nuevo marcado "Kepler-90i". |
| 8 | Hallazgo | Es rocoso, da la vuelta en catorce días y se cree que pasa de cuatrocientos grados. | Ficha del planeta: roca café al rojo vivo, "órbita: 14.4 días", termómetro "> 400 °C", "≈ 30 % más grande que la Tierra". |
| 9 | Empate | Con él, Kepler-90 tiene ocho planetas, como el Sol. Hoy, ninguna otra estrella conocida tiene tantos. | Dos sistemas lado a lado: Sistema Solar (8) y Kepler-90 (8), chicos adentro y grandes afuera; marcador "8 = 8"; chip "récord vigente · NASA, 2026". |
| 10 | Cierre | Así que ese parpadeo no es falla: es un mundo entero pasando enfrente. | **Regreso a la imagen del inicio**: la misma estrella que late, ahora la lupa sí muestra el planetita cruzando y la curva con su escalón. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y espacial, continua, debajo de la voz. Cada tránsito suena como un "tic" suave al bajar la curva; el foco que se apaga hace un clic; el contador de estrellas tintinea; las curvas de ruido suenan como estática; la red neuronal hace pulsos al aprender; el hallazgo, una campanita; el "8 = 8", dos acordes iguales.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. NASA, comunicado 17-098, "Artificial Intelligence, NASA Data Used to Discover Eighth Planet Circling Distant Star" (14 dic 2017). https://www.nasa.gov/news-release/artificial-intelligence-nasa-data-used-to-discover-eighth-planet-circling-distant-star/
   > "With the discovery of an eighth planet, the Kepler-90 system is the first to tie with our solar system in number of planets."
   > "The newly-discovered Kepler-90i – a sizzling hot, rocky planet that orbits its star once every 14.4 days – was found using machine learning from Google."
   > "researchers Christopher Shallue and Andrew Vanderburg trained a computer to learn how to identify exoplanets in the light readings recorded by Kepler – the minuscule change in brightness captured when a planet passed in front of, or transited, a star."
   > "About 30 percent larger than Earth, Kepler-90i is so close to its star that its average surface temperature is believed to exceed 800 degrees Fahrenheit, on par with Mercury." (800 °F ≈ 427 °C → "pasa de cuatrocientos grados")
   > "Vanderburg, a NASA Sagan Postdoctoral Fellow and astronomer at the University of Texas at Austin. Shallue, a senior software engineer with Google’s research team Google AI"
   > "Kepler’s four-year dataset consists of 35,000 possible planetary signals. Automated tests, and sometimes human eyes, are used to verify the most promising signals in the data. However, the weakest signals often are missed using these methods."
   > "First, they trained the neural network to identify transiting exoplanets using a set of 15,000 previously-vetted signals from the Kepler exoplanet catalogue."
   > "the researchers directed their model to search for weaker signals in 670 star systems that already had multiple known planets."
   > "Shallue and Vanderburg plan to apply their neural network to Kepler’s full set of more than 150,000 stars." / "After gazing at one patch of space for four years"
   > "a Sun-like star 2,545 light-years from Earth" (no se usa en la voz).
2. Shallue, C. J. y Vanderburg, A. "Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90". *The Astronomical Journal* 155: 94 (2018). arXiv:1712.05044 (13 dic 2017).
   > "Our discovery of an eighth planet brings Kepler-90 into a tie with our Sun as the star known to host the most planets."
   > Sección 3.1: "In total there are 3,600 PCs, 9,596 AFPs and 2,541 NTPs." (= 15,737 señales etiquetadas → "más de quince mil señales ya revisadas")
   > Sección 6: "a roughly 90 ppm transit like our new TCE" (90 partes por millón ≈ 1 de cada 11 000 → "como si de diez mil focos se apagara uno", comparación aproximada)
   > Tabla 5, Kepler-90 i: "Orbital Period, P [days] 14.44912" · "Transit Duration t14 [hours] 2.80" · "RP [R⊕] 1.32".
   > "Kepler-90 b, c, and i all have radii small enough that they are either likely or might be rocky"
3. NASA Exoplanet Archive, tabla *Planetary Systems Composite* (consulta del 29 oct 2026): `select distinct hostname, sy_pnum from pscomppars where sy_pnum >= 7` → solo **KOI-351 (= Kepler-90) con 8**; con 7: TRAPPIST-1 y 55 Cnc; ninguna con más de 8. (Total de planetas confirmados en la tabla: 6,451.) https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+hostname,sy_pnum+from+pscomppars+where+sy_pnum%3E%3D7&format=csv
   > Respuesta: `"55 Cnc",7 · "TRAPPIST-1",7 · "KOI-351",8 · "55 Cnc B",7`

## Notas
- "Como si de diez mil focos se apagara uno": el tránsito de Kepler-90i baja el brillo ≈ 90 partes por millón (≈ 0.009 %), es decir, un poco menos de 1 en 10 000. Es una comparación aproximada.
- "Más de quince mil señales ya revisadas": la NASA redondea a 15,000; el artículo suma 15,737 (3,600 + 9,596 + 2,541), etiquetadas como planeta o falsa alarma.
- "Se cree que pasa de cuatrocientos grados": la NASA dice "is believed to exceed 800 °F" (≈ 427 °C); por eso va como estimación.
- "Rocoso": la NASA lo llama "rocky"; el artículo dice "either likely or might be rocky" (probablemente rocoso).
- "En 2017": el hallazgo se anunció el 14 dic 2017; el artículo salió en *The Astronomical Journal* en 2018.
- Récord: revisado el 29 oct 2026 en el NASA Exoplanet Archive; si se descubre otra estrella con 8 o más, la frase deja de valer.
- Kepler-90i: el tránsito dura ≈ 2.8 horas (no se usa en la voz). El dibujo es esquemático (tamaños y distancias no están a escala).
