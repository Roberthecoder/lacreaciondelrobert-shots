# Shot IA #25 · El "robot" que jugaba ajedrez era una persona escondida

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #25 · rama `pedido300/ia` · publicación 20 dic 2026 (`calendario/fecha.py "IA" 25`).
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`, 2 ⚠️ corregidas: «sentado tras una caja» y «en dos mil veintiséis»), animación, Robert en pantalla y `publicacion.md` listos; hoja de revisión en `revision/hoja.png`. **Voz pendiente de aprobación de Robert.**
- **Formato:** N1 "Por dentro": la caja del Turco por fuera (macro) → `Lupa` en rayos X que deja ver al ajedrecista escondido (por dentro) → la misma caja al final, transformada en "la caja de la IA" con personas adentro.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: «Esto no es un robot que juega ajedrez: es una persona escondida».
- **Duración:** voz 957 caracteres / ~172 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base.
- **Postura de la serie:** ni defensa ni ataque: un recordatorio con datos de que la IA también se hace con trabajo humano. Solo de pasada el puente a hoy (sin cifras de etiquetadores: eso es del #50).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es un robot que juega ajedrez: es una persona escondida. Y su truco sigue vivo en la inteligencia artificial. | Fondo amarillo; desde el cuadro 0 el Turco (muñeco con turbante sentado tras su caja, tablero encima de la caja) mueve una pieza. La `Lupa` se abre sobre la caja y deja ver, en rayos X, a un hombre sentado adentro. Abajo, «robot» se tacha → «una persona escondida». |
| 1 | Turco | Le decían el Turco: un muñeco de madera con turbante, sentado tras una caja, que movía las piezas solo. | Plano completo del Turco sentado detrás del gabinete, tablero encima de la caja (túnica, turbante, pipa); etiquetas «turbante», «muñeco de madera», «tablero», «caja». El brazo mueve un caballo. |
| 2 | Puertas | Antes de jugar, abrían las puertas de la caja y enseñaban engranes y palancas. | Las puertas del gabinete se abren: engranes girando, palancas; chip «antes de jugar». |
| 3 | Adentro | Pero ahí iba un maestro de ajedrez. Seguía la partida con imanes bajo el tablero y movía el brazo con palancas. | Fondo oscuro "por dentro de la caja": corte en rayos X; el ajedrecista ve los discos imantados que se mueven bajo el tablero; una palanca conectada al brazo (esquemático). |
| 4 | Napoleon | Según los relatos, en mil ochocientos nueve, en Viena, Napoleón intentó hacerle trampa y el Turco tiró todas las piezas. | Tarjeta "1809 · Viena (palacio de Schönbrunn) · según los relatos"; silueta de Napoleón mueve una pieza mal y el brazo del Turco barre el tablero; piezas volando. |
| 5 | Pregunta | ¿Y qué tiene que ver con tu IA? | **Re-gancho.** "?" gigante; transición de la caja de madera a un servidor. |
| 6 | Amazon | En dos mil cinco, Amazon abrió una página donde personas hacían tareas chiquitas que las computadoras aún no podían. Le puso Mechanical Turk: el Turco mecánico. | Fondo de circuito; navegador genérico (sin marcas reales) con tarjetitas de tareas; letrero "Mechanical Turk (2005)" y un turbante chiquito sobre el letrero, unido con flecha al Turco de madera. |
| 7 | Etiquetas | Ahí mucha gente etiquetó datos para entrenar IA: esto es un gato, esto no es un gato. | Cuadrícula de fotos dibujadas; manos (de personas) les ponen etiqueta ✔ gato / ✘ no es gato; las etiquetas entran a una `RedNeuronal`. Sin cifras. |
| 8 | Cerro | Y en dos mil veintiséis, el treinta de septiembre, Amazon la cerró. | La persiana baja sobre el navegador: «CERRADO»; chip «30 de septiembre de 2026». |
| 9 | Cierre | Así que si una IA te parece magia, acuérdate del Turco: detrás también hubo personas. | **Regreso a la imagen del inicio:** la misma caja, ahora con el robotito de la IA sentado detrás en lugar del muñeco; la `Lupa` vuelve a abrirse y adentro se ven tres personas etiquetando. «magia» se tacha → «detrás: personas». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua con un tic-tac de engranes; cada pieza que se mueve suena a madera sobre tablero, las puertas rechinan, los imanes hacen un "clic" metálico, el barrido de Napoleón es un estruendo de piezas, el paso al circuito es un zumbido eléctrico, cada etiqueta es un "tap", la persiana cae con un golpe.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y qué tiene que ver con tu IA?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.3 | 11_sorprendido | `gancho` | «es una persona escondida» (cuadro 0) |
| 2 | 10.0 | 13.0 | 13_senalando_arriba | `arriba-der` | señala al muñeco: «que movía las piezas solo» |
| 3 | 18.5 | 22.4 | 06_pensativo_menton | `izq-alto` | «ahí iba un maestro de ajedrez» |
| 4 | 27.5 | 31.8 | 05_sonriendo_dientes_uniformes | `izq-alto` | «el Turco tiró todas las piezas» |
| 5 | 32.0 | 35.1 | 07_pensativo_puno | `grande` | «¿Y qué tiene que ver con tu IA?» |
| 6 | 38.6 | 43.2 | 04_bajando_lentes | `izq-alto` | «Le puso Mechanical Turk» |
| 7 | 44.6 | 48.4 | 13_senalando_arriba | `arriba-der` | señala las etiquetas: «esto es un gato» |
| 8 | 48.9 | 52.7 | 11_sorprendido | `izq-alto` | «Amazon la cerró» |
| 9 | 53.3 | 57.9 | 10_serio_molesto | `arriba-der` | «detrás también hubo personas» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 35.4 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.5 s

## Fuentes (abiertas el 29 oct 2026)

1. **Amazon Mechanical Turk — aviso oficial de cierre** (mturk.com y mturk.com/help, consultado 29 oct 2026).
   > "Mechanical Turk is no longer available. Amazon Mechanical Turk permanently closed on September 30, 2026."
   > "HIT submission closed on September 30, 2026."
2. **Barr, J. "Amazon's Mechanical Turk: The First Three Weeks"**. AWS News Blog (Amazon), 21 nov 2005. https://aws.amazon.com/blogs/aws/amazons_mechani/
   > "On the evening of Wednesday, November 2nd, we announced that Amazon's Mechanical Turk was ready for beta testing."
3. **Barr, J. "ACM Queue: AI Gets a Brain"**. AWS News Blog (Amazon), 12 may 2006. https://aws.amazon.com/blogs/aws/acm_queue_ai_ge/ — artículo de dos empleados de Amazon (Barr y Cabrera, *ACM Queue* 4(4), mayo 2006, DOI 10.1145/1142055.1142067) sobre el servicio, que empieza con la historia del Turco original:
   > "The article, "AI Gets a Brain", covers the fundamental concepts behind the Amazon Mechanical Turk. We start off with a historic review of the original Mechanical Turk (covered in depth in Tom Standage's book, The Turk)."
   (El texto del artículo de *ACM Queue* devolvió 403; no se pudo abrir.)
4. **Stephens, E. (2022). "The mechanical Turk: a short history of 'artificial artificial intelligence'".** *Cultural Studies* 37(1). Universidad de Queensland. DOI 10.1080/09502386.2022.2042580 (resumen abierto en Semantic Scholar/Crossref).
   > "This paper undertakes a comparative analysis of the famous eighteenth-century chess-playing automaton known as Mechanical Turk and the Amazon microwork platform of the same name. The original Mechanical Turk was a life-sized automaton made in 1770 and publicly exhibited until the mid-1800s…"
   > "Amazon's Mechanical Turk is a marketplace in which companies can hire piecemeal cognitive labour to patch gaps and train programs to keep those systems functioning. Providing what Jeff Bezos has called 'artificial artificial intelligence'…"
5. **Schwartz, O. "Untold History of AI: Charles Babbage and the Turk"**. *IEEE Spectrum*, 2019. https://spectrum.ieee.org/untold-history-of-ai-charles-babbage-and-the-turk
   > "In the year 1770, at the court of the Austrian empress Maria Theresa, an inventor named Wolfgang von Kempelen presented a chess-playing machine. The Turk, as Kempelen called his invention, was a life-size automaton carved out of maple wood, dressed in Ottoman robes, sitting behind a wooden cabinet with a chessboard on top."
   > "Kempelen opened the doors of the cabinet to show a clockwork-like mechanism—an intricate network of levers and cogs"
   > "Kempelen and Maelzel hired chess masters to sit hidden inside the large cabinet. The chess master could observe what was happening on the chess board above via magnets… To move the Turk's arm, the concealed player used a pantograph—a system of pulleys that synchronized his arm movements with the wooden Turk sitting above. The player moved a lever across his magnetic chess board…"
6. **Schwartz, O. "Untold History of AI: How Amazon's Mechanical Turkers Got Squeezed Inside the Machine"**. *IEEE Spectrum*, 22 abr 2019. https://spectrum.ieee.org/untold-history-of-ai-mechanical-turk-revisited-tktkt
   > "The name of this new service was a wink at the chess-playing machine of the 18th century, the Mechanical Turk invented by the huckster Wolfgang von Kempelen… inside which hid a human chess player."
   > "MTurk workers are frequently used to build and label these training data sets."
7. **Mitchell, S. W. "The Last of a Veteran Chess Player"**. *The Chess Monthly* (Nueva York), 1857 (fuente primaria; transcripción en chess.com/blog/batgirl). Hijo del último dueño del Turco.
   > "Perhaps no secret was ever kept as the Turk's has been."
   > "When the apparatus was ready for exhibition, the two front doors were opened at once… While this was doing, the concealed operator slid forward into the larger apartment"
   > Relato de Napoleón (versión de Mitchell): "The Emperor was diastrously vanquished… the Emperor placed a large magnet on the automaton's board… a second time Napoleon was defeated."
8. **Relato de 1809 en Schönbrunn (Viena)**: Ewart, B. *Chess: Man vs. Machine* (1980), pp. 49–53, y Standage, T. *The Turk* (2002), pp. 105–109, citados en Wikipedia "Mechanical Turk" (consultado 29 oct 2026): "In 1809, Napoleon I of France arrived at Schönbrunn Palace to play the Turk. The details of the encounter have been published over the years in numerous accounts… [that] are contradictory"; "Napoleon then attempted the move a third time, the Turk responding with a sweep of its arm, knocking all the pieces off the board." **Por eso la voz dice "según los relatos".** (Libros no abiertos directamente.)
9. Gizmodo / Storyboard18 (ago 2026), notas de prensa sobre el cierre: "Launched by Amazon in 2005…"; "The platform took its name from an 18th-century chess-playing machine that appeared to operate autonomously but was in fact controlled by a person hidden inside it." (Prensa, solo de apoyo.)

## Notas
- **Pendiente para el verificador:** no encontré una página oficial de Amazon abierta que diga con todas sus letras "el nombre viene del Turco de Kempelen" (las FAQ viejas de mturk.com están en archive.org, bloqueado aquí; el artículo de *ACM Queue* da 403). El vínculo está en el blog oficial de AWS (fuente 3, que presenta el servicio partiendo del "original Mechanical Turk"), en Stephens 2022 (académica) e IEEE Spectrum 2019. Si el verificador encuentra la FAQ oficial, mejor.
- "Esto es un gato, esto no es un gato" es un ejemplo ilustrativo de etiquetado, no un dato.
- Se dice "en dos mil veintiséis" (no "este año") porque el video seguirá en redes en 2027.
- Napoleón: los relatos se contradicen (Mitchell 1857 cuenta lo del imán y el chal; Ewart/Allen cuentan los movimientos ilegales y el barrido). Se dice "según los relatos" y se dibuja como leyenda.
- No se dice quién era el ajedrecista de 1809 ni "el primero"/"el más". No se dan cifras de trabajadores ni de pagos (tema del #50).
- El dibujo del mecanismo interior es esquemático.
