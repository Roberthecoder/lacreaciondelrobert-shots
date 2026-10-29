# Shot Festivo #10 · Posadas · Científico: Tu velita no quema cera: quema cera hecha gas

- **Serie:** Shot Festivo · **Serie vinculada:** Científico · **Logo:** física (átomo, `logo_fisica.svg`) · **Badge:** Festivo #10 · **Especial:** Posadas (se publica el 16 dic 2026, primera posada) · rama `pedido300/festivos`.
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`: APROBADO, 24/24 ✅), animación (`vela.jsx`), música (`gen-audio.mjs`), Robert en pantalla y `publicacion.md` listos · **voz pendiente de aprobación de Robert** (~1,085 caracteres).
- **Formato:** N1 "Por dentro" (de la velita de la posada al interior de la flama y de regreso) con un poco de N5 "El experimento" (el truco de Faraday de volver a prender la vela por el humo).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: "Esa velita de la posada no está quemando cera: está quemando cera hecha gas."
- **Duración:** voz 1,085 caracteres (≈ 65.7 s) + cierre 3.8 s → **69.5 s** en la base (`estimar-escenas.mjs`), dentro de 61–75 s de los festivos.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa velita de la posada no está quemando cera: está quemando cera hecha gas. | Fondo azul rey con papel picado de estrellas de posada. Desde el cuadro 0 una mano con su velita de posada (vela delgada blanca con su protector de papel) entra y la flama se aviva con un parpadeo. «¿cera?» se tacha; «cera hecha gas». Chip «Especial Posadas». |
| 1 | Copita | El calor derrite la cera y el aire que sube enfría la orilla: se forma una copita de cera líquida. | Fondo amarillo. Acercamiento a la punta de la vela: la cera de arriba se vuelve brillante y líquida; flechitas de aire frío suben por los lados y la orilla queda sólida: una copita. Capítulo 1 «La copita». |
| 2 | Pabilo | El pabilo la sube como el agua que trepa por una servilleta: capilaridad. | Fondo cian. A un lado, una servilleta con la punta en un vaso de agua de color que trepa; al otro, el pabilo trenzado con la cera líquida subiendo entre sus hilos. Chip «capilaridad». |
| 3 | Vapor | Junto a la flama, la cera se vuelve vapor, y lo que arde es el vapor con el oxígeno del aire. | Fondo noche (por dentro de la flama, barra de escala de 5 mm). La punta del pabilo suelta vapor (nubecita gris); por fuera llegan moléculas de oxígeno; donde se encuentran aparece la capa de fuego. Etiquetas «vapor de cera» · «oxígeno». Capítulo 2 «Por dentro de la flama». |
| 4 | Azul | Abajo, donde entra más aire, la flama es azul: pedacitos de moléculas que sueltan luz. | Fondo noche. Zoom a la base azul: fragmentos de moléculas (CH, C₂, dibujados como bolitas unidas) destellan en azul. Chip «luz azul». |
| 5 | Pregunta | ¿Y por qué la parte de arriba es amarilla? | **Re-gancho.** Fondo naranja, «?» gigante junto a la flama, con la parte amarilla resaltada. |
| 6 | Hollin | Ahí falta oxígeno y se forman granitos de hollín, de carbón, tan calientes que brillan. | Fondo noche. Dentro de la zona amarilla: granitos negros de hollín que se ponen al rojo y luego amarillo brillante. Etiqueta «hollín (carbón)». |
| 7 | Gota | El aire caliente sube, estira la flama como una gota y se lleva el hollín hasta la punta. | Fondo menta. La flama completa con flechas de aire caliente que suben y la estiran en forma de gota; los granitos de hollín viajan hacia la punta. Chip «convección». Capítulo 3 «La forma». |
| 8 | Espacio | En los noventa, la NASA prendió velas en el espacio, sin aire que suba: la flama salió redondita, chiquita y azul. | Fondo azul noche con estrellas. Comparación lado a lado «En la Tierra» (gota amarilla) vs «En el espacio» (la flama se encoge en una media esfera azul tenue sobre el pabilo, «≈ 1.5 cm · azul tenue»). Chips «NASA · transbordador y Mir · años 90» y «sin aire que suba». |
| 9 | Estudio | En la Navidad de 1860, en Londres, Michael Faraday explicó la flama de una vela a un público de niños y jóvenes. | Fondo amarillo. `TarjetaEstudio` «1860 · Michael Faraday · Londres · Royal Institution · 1860-61». Faraday en su mesa con una vela; niños en las gradas. Capítulo 4 «El experimento». |
| 10 | Dato | Su truco: apagas la vela, sube un humito blanco, le acercas una flama y el fuego baja por el humo y la vuelve a prender. | Fondo lila. Se sopla la vela: sube un hilo de humo blanco; una segunda flama se acerca a unos centímetros y un hilo de fuego baja por el humo hasta el pabilo: ¡se vuelve a prender! Chip «el humo es cera». |
| 11 | Cierre | Así que, cuando pidas posada, mira tu velita. Lo que arde no es cera sólida: es cera hecha gas. | **Regreso a la imagen del inicio** (fondo azul rey, papel picado, la misma velita en la mano); una `Lupa` de rayos X sobre la flama muestra el vapor de cera ardiendo. Chip «no es cera: es gas». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de física (átomo) y Robert señalando. |

**Música:** cama grave y cálida continua (sin golpe), siempre debajo de la voz; efectos en el mismo cuadro: chispazo del cerillo y parpadeo de la flama al inicio, goteo suave de la cera que se derrite, tics que suben con la capilaridad, siseo del vapor, destellos agudos del azul, crepitar del hollín que brilla, soplido ascendente del aire caliente, silencio casi total y tono flotante en el espacio, murmullo de aplausos en la Royal Institution, el soplido que apaga y el «fuump» del fuego que baja por el humo, y destellos al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos porque están atados a cada escena). Grande en «¿Y por qué la parte de arriba es amarilla?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.0 | 11_sorprendido | `gancho` | «no está quemando cera: está quemando cera hecha gas» (cuadro 0) |
| 2 | 5.3 | 9.3 | 13_senalando_arriba | `izq-alto` | señala la flama que derrite la copita |
| 3 | 15.6 | 19.9 | 04_bajando_lentes | `arriba-der` | «lo que arde es el vapor» |
| 4 | 26.0 | 28.8 | 07_pensativo_puno | `grande` | «¿Y por qué la parte de arriba es amarilla?» |
| 5 | 34.4 | 38.5 | 05_sonriendo_dientes_uniformes | `izq-alto` | el aire caliente estira la flama como gota |
| 6 | 39.9 | 45.3 | 11_sorprendido | `arriba-der` | en el espacio la flama sale redondita y azul |
| 7 | 46.7 | 51.7 | 08_recostado_mano | `arriba-der` | escucha a Faraday como uno de los niños (1860) |
| 8 | 53.3 | 58.3 | 13_senalando_arriba | `izq-alto` | señala el humo por el que baja el fuego |
| 9 | 60.3 | 65.6 | 02_apuntando_camara | `arriba-der` | «cuando pidas posada, mira tu velita» |
| — | 65.7 | 69.5 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones: 9 · **40.4 s en pantalla** (+ cierre 3.8 s) · 7 poses distintas, ninguna repetida seguida · huecos de 6.3 s como máximo. Nunca tapa el subtítulo (`izq-alto` y `arriba-der` entran de lado; `grande` también entra y sale de lado —ajuste en la copia local de `kit-robert.jsx`, 29 oct 2026— y se va durante el fundido a la escena del hollín).

## Fuentes (abiertas el 29 oct 2026; verificadas en `verificacion.md`: APROBADO, 24/24 ✅)

1. **Posadas con velas, del 16 al 24 de diciembre** — Guía Infantil, "Las Posadas. Tradición navideña de México": "Las posadas comienzan el 16 de diciembre y terminan el 24" · "se reparten velas a los asistentes y mientras caminan cantan la letanía". https://www.guiainfantil.com/blog/navidad/las-posadas-tradicion-navidena-de-mexico · Uno TV (2020): "se reparte entre la gente velas y luces de bengala que serán encendidas mientras se lleva a cabo la petición de posada". https://www.unotv.com/nacional/posadas-en-mexico-2020-como-hacer-una/
2. **Lo que arde es el vapor** — Michael Faraday, *The Chemical History of a Candle* (1861; conferencias de la Navidad de 1860-61), Lecture II: "there are clearly two different kinds of action—one the _production_ of the vapour, and the other the _combustion_ of it" · "this is the vapour from the middle of the candle, produced by its own heat" · "In the middle of the flame, where the wick is, there is this combustible vapour; on the outside of the flame is the air … between the two, intense chemical action takes place". https://www.gutenberg.org/ebooks/14474
3. **El calor derrite la cera** — National Candle Association, "Candle Science": "When you light a candle, the heat of the flame melts the wax near the wick." https://candles.org/candle-science/
4. **La copita formada por el aire que sube** — Faraday (1861), Lecture I: "the cup is formed by this beautifully regular ascending current of air playing upon all sides, which keeps the exterior of the candle cool".
5. **Capilaridad del pabilo** — Faraday (1861), Lecture I: "It is by what is called capillary attraction that the fuel is conveyed to the part where combustion goes on" · NCA: "This liquid wax is then drawn up the wick by capillary action."
6. **Como el agua por una servilleta** — USGS Water Science School, "Capillary Action and Water": "Dip a paper towel into a glass of water and the water will "climb" onto the paper towel." https://www.usgs.gov/special-topics/water-science-school/science/capillary-action-and-water
7. **La base azul: donde entra más aire; la luz de CH y C₂** — NCA: "The oxygen-rich blue zone is where the hydrocarbon molecules vaporize and start to break apart." · Faraday (1861), Lecture II: "because the atmosphere can get to it, and mix with it before it burns, you see how pale and blue the flame is" · Universidad de Bristol, School of Chemistry, proyecto web "Fire" (O'Sullivan, 2001): "The light blue portion at the bottom of a flame is a reaction zone. In this region C2 and CH are produced in excited states and it is their respective band emissions that account for the blue colour." https://www.chm.bris.ac.uk/~paulmay/webprojects2001/osullivan/fire2.htm
8. **Lo amarillo: hollín incandescente donde no alcanza el oxígeno** — Faraday (1861), Lecture II: "it is to this presence of solid particles in the candle-flame that it owes its brilliancy" · "They are those particles which you can easily see by holding a piece of paper behind them, and which, whilst they are in the flame, are ignited by the heat produced, and, when so ignited, produce this brightness." · "Supposing I add so much air to the flame as to cause it all to burn before those particles are set free, I shall not have this brightness" · NCA: "At the bottom of the yellow zone, the formation of the carbon (soot) particles increases."
9. **Forma de gota por convección; el hollín va a la punta** — NASA, "Candle Flame – 1g vs Microgravity": "On Earth, gravity-driven buoyant convection causes a candle flame to be teardrop-shaped and carries soot to the flame's tip, which makes it yellow." https://www.nasa.gov/image-detail/candle-flames-3/
10. **En el espacio: redonda (media esfera), chiquita y azul** — NASA (mismo pie de foto): "In microgravity, where convective flows are absent, the flame is spherical, soot-free and blue." · NASA NTRS 20010074076 (2001), "Candle Flames in Microgravity": "Two space experiments (Shuttle and Mir) have shown the candle flame in microgravity to be small (approximately 1.5 cm diameter), dim blue, and hemispherical." https://ntrs.nasa.gov/citations/20010074076 · NASA NTRS 20030075810 (1994), "Candle Flames in Microgravity: USML-1 Results - 1 Year Later": "the microgravity candle flame in air becomes and remains hemispherical and blue". https://ntrs.nasa.gov/citations/20030075810 · NASA NTRS 20000005087, Dietrich et al., "Candle Flames in Non-Buoyant Atmospheres": primer vuelo en el transbordador "STS-50 (USML-1)" (1992) y después en la estación Mir (1995) → "en los noventa". https://ntrs.nasa.gov/citations/20000005087
11. **Faraday, Navidad de 1860, Londres, público juvenil** — Portada de la edición de 1861 (Harper & Brothers; archive.org `courseofsixlectu00fara`): "Delivered before a Juvenile Auditory at the Royal Institution of Great Britain during the Christmas Holidays of 1860-1." https://archive.org/details/courseofsixlectu00fara · Faraday, Lecture I: "And now, my boys and girls, I must first tell you of what candles are made." (Ya había dado otra serie sobre la vela en 1848: "I have done so on former occasions"; el libro y todas las citas son de la de 1860-61.)
12. **El truco del humo** — Faraday (1861), Lecture I: "If you blow a candle out cleverly, you will see the vapour rise from it." · "if I hold a lighted taper two or three inches from the wick, you will observe a train of fire going through the air till it reaches the candle." · *Scientific American* (2019), "Make a Candle Flame Jump": "you should have seen white smoke rising up into the air from the wick. This is the wax vapor, which becomes visible as it condenses into small liquid droplets in the cooler air." https://www.scientificamerican.com/article/make-a-candle-flame-jump/

## Notas
- El dibujo es esquemático: las zonas de la flama, los fragmentos de moléculas (CH, C₂) y los granitos de hollín están simplificados y fuera de escala.
- No se dan temperaturas de la flama: las fuentes no coinciden entre sí (800–1,400 °C según la zona), así que se dejaron fuera.
- "Redondita": la NASA dice "spherical" en su pie de foto y "hemispherical" (media esfera) en los artículos técnicos; en pantalla se dibuja como **media esfera** sobre el pabilo (no una bola flotando), azul tenue y chiquita (~1.5 cm).
- "Humito blanco": es vapor de cera que se condensa en gotitas al enfriarse (Faraday; *Scientific American*, 2019). Verificado ✅.
- Faraday hizo el truco a "two or three inches" (5–7.5 cm) del pabilo; la voz no da la distancia, en pantalla se puede poner «a unos centímetros».

- **Render (29 oct 2026):** enviado a GitHub (versión de revisión sin voz). La voz espera la aprobación de Robert.
