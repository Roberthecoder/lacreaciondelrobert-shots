# Shot IA #31 · AlphaZero: revisaba mil veces menos y aun así ganaba

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #31 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`; corregidas las 2 ⚠️), animación, Robert en pantalla, música y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~961 créditos).
- **Formato:** N3 "Capítulos y medidores" (Cap. 1 Solo las reglas · Cap. 2 Contra sí misma · Cap. 3 Por dentro · Cap. 4 El duelo), con un medidor de
  posiciones por segundo y un reloj de entrenamiento en vivo.
- **Gancho (de los 7):** #4 "Un número que contradice": mil veces menos posiciones revisadas… y aun así gana.
- **Duración:** voz 961 caracteres / ~169 palabras (≈ 58.4 s) + cierre 3.5 s → **61.9 s** en la base (suma de `OM_SCENES`).
- **Postura de la serie:** la defiende (aprendió sin partidas humanas y con búsqueda mucho más selectiva) y la critica con datos
  (para entrenar usó cinco mil chips de Google). Se dice que el estudio es de **2018**. La explicación de "por qué gana" se dice
  como lo que **creen** los autores (en el artículo es una posibilidad: "may compensate").

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA revisaba mil veces menos posiciones que el campeón de ajedrez de las máquinas… y aun así le ganó. | Fondo menta; desde el cuadro 0 un tablero en perspectiva, dos relojes de ajedrez que arrancan. A la izquierda un robotito pequeño (AlphaZero) con una lupa; a la derecha una computadora enorme con mil lupitas (Stockfish). Chips "60 mil/s" vs "60 millones/s"; un rey negro cae (golpe). |
| 1 | Reglas | Se llama AlphaZero. Nadie le enseñó partidas humanas: solo las reglas, y empezó moviendo piezas al azar. | **Cap. 1 · Solo las reglas.** Una pila de libros de ajedrez tachada ("partidas humanas ✗"); una tarjetita "reglas ✔". Las piezas saltan al azar por el tablero (movimientos torpes). |
| 2 | Autojuego | Luego jugó contra sí misma cuarenta y cuatro millones de partidas, y aprendía qué jugadas la llevaban a ganar. | **Cap. 2 · Contra sí misma.** Dos robotitos iguales frente a frente; contador que sube hasta "44 millones" (de partidas contra sí misma); 16 mini tableros que aparecen y se marcan ✔ (ganó) o ✗ (perdió): de cada resultado aprende. |
| 3 | Horas | A las cuatro horas de entrenar ya superaba a Stockfish; entrenó nueve en total. | Medidor de nivel (Elo, esquemático) que sube; línea punteada "nivel de Stockfish"; reloj de entrenamiento: en "4 h" la curva cruza la línea (destello); el reloj sigue hasta "9 h". |
| 4 | Pregunta | ¿Pero cómo gana alguien que revisa mil veces menos? | **Re-gancho.** "?" gigante sobre el tablero; Robert grande. |
| 5 | Medidor | **Cap. 3 · Por dentro.** Stockfish revisaba unos sesenta millones de posiciones por segundo. AlphaZero, solo sesenta mil. | Fondo oscuro (por dentro de la máquina): un árbol de jugadas que se abre por todos lados para Stockfish (miles de ramitas) contra pocas ramas para AlphaZero. Medidor doble: "60 000 000 /s" vs "60 000 /s". |
| 6 | Medidor | Sus autores proponen que su red neuronal le señala qué jugadas mirar. | Una red neuronal chiquita aparece sobre el árbol de AlphaZero y solo 3 ramas quedan iluminadas (las "prometedoras"); el árbol de Stockfish se apaga; chip "hipótesis de los autores". |
| 7 | Duelo | En Londres, DeepMind lo publicó en Science en 2018: en mil partidas, ganó ciento cincuenta y cinco, perdió seis y empató las demás. | **Cap. 4 · El duelo.** Tarjeta "2018 · DeepMind (Londres) · Silver et al. · *Science*"; cuadrícula de 1 000 cuadritos que se llena: 155 verdes (ganó), 6 rojos (perdió), 839 grises (empates). Chip "1,000 partidas · 3 h + 15 s por jugada". |
| 8 | Aperturas | Lo más raro: sin ver a ningún humano, descubrió sola aperturas que las personas usamos mucho. | El tablero muestra el **Gambito de Dama** (1. d4 d5 2. c4, una de las aperturas humanas de la Fig. 3 del artículo) con flechas; globo "¡como los humanos!"; mini gráfica "% de partidas en que la elegía" que sube y luego se estabiliza, con etiqueta "esquemático". |
| 9 | Chips | Eso sí: para entrenar usó cinco mil chips de Google. | Crítica con datos: pared de chips (TPU) que se encienden; chip "5 000 TPU para generar partidas (solo en el entrenamiento)". |
| 10 | Cierre | Así que revisar más no lo es todo: a veces gana quien sabe dónde mirar. | **Regreso a la imagen del inicio**: el mismo tablero y los dos rivales; la computadora de mil lupitas se apaga y la lupa única del robotito brilla sobre una sola casilla. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (un pulso de reloj de ajedrez muy suave). Clic de reloj al arrancar, golpe al caer el rey, piezas
que saltan (toques de madera), tecleo rápido mientras sube el contador de partidas, "ding" cuando la curva cruza a Stockfish,
zumbido eléctrico en el árbol de Stockfish contra 3 notas limpias en las ramas de AlphaZero, 1 000 cuadritos como lluvia de
toques (verde agudo, rojo grave), zumbido de servidores al encenderse los chips, la computadora que se apaga al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Pero cómo gana alguien que revisa mil veces menos?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «mil veces menos posiciones… y aun así le ganó» (cuadro 0) |
| 2 | 8.8 | 12.4 | 05_sonriendo_dientes_uniformes | `arriba-der` | «empezó moviendo piezas al azar» |
| 3 | 15.6 | 19.0 | 13_senalando_arriba | `arriba-der` | señala el contador de «cuarenta y cuatro millones de partidas» |
| 4 | 20.8 | 23.9 | 11_sorprendido | `arriba-der` | «a las cuatro horas ya superaba a Stockfish» |
| 5 | 24.1 | 28.4 | 07_pensativo_puno | `grande` | «¿Pero cómo gana alguien que revisa mil veces menos?» |
| 6 | 33.3 | 37.1 | 06_pensativo_menton | `arriba-der` | «Sus autores proponen que su red neuronal…» |
| 7 | 41.9 | 44.9 | 04_bajando_lentes | `arriba-der` | «ganó ciento cincuenta y cinco, perdió seis» |
| 8 | 48.3 | 50.5 | 11_sorprendido | `arriba-der` | «descubrió sola aperturas que las personas usamos mucho» |
| 9 | 51.1 | 53.8 | 10_serio_molesto | `izq-alto` | «cinco mil chips de Google» |
| 10 | 54.6 | 58.3 | 13_senalando_arriba | `arriba-der` | «a veces gana quien sabe dónde mirar» |
| — | 58.4 | 61.9 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 34.4 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.9 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Silver, D., Hubert, T., Schrittwieser, J., Antonoglou, I., Lai, M., Guez, A., Lanctot, M., Sifre, L., Kumaran, D., Graepel, T.,
   Lillicrap, T., Simonyan, K. y Hassabis, D. "A general reinforcement learning algorithm that masters chess, shogi, and Go through
   self-play". *Science* 362(6419): 1140–1144 (7 dic 2018). DOI 10.1126/science.aar6404 · PMID 30523106. DeepMind, Londres
   ("DeepMind, 6 Pancras Square, London N1C 4AG"). Texto completo abierto: versión aceptada que DeepMind enlaza como "Open Access
   version" del artículo de Science
   (https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphazero-shedding-new-light-on-chess-shogi-and-go/alphazero_preprint.pdf).
   **No** se usó el preprint de arXiv de 2017 (1712.01815), que tiene otras cifras.
   > "Starting from random play and given no domain knowledge except the game rules, AlphaZero convincingly defeated a world champion program in the games of chess and shogi (Japanese chess) as well as Go."
   > "a general-purpose reinforcement learning algorithm can learn, tabula rasa – without domain-specific human knowledge or data … superhuman performance"
   > "During training only, 5,000 first-generation tensor processing units (TPUs) (19) were used to generate self-play games, and 16 second-generation TPUs were used to train the neural networks. Training lasted for approximately 9 hours in chess, 12 hours in shogi and 13 days in Go"
   > Tabla S3: "Training Time 9h … Training Games 44 million" (columna Chess).
   > "In chess, AlphaZero first outperformed Stockfish after just 4 hours (300,000 steps)"
   > "The chess match was played against the 2016 TCEC (season 9) world champion Stockfish" · "we used Stockfish version 8 (official Linux release)"
   > "All matches were played using time controls of 3 hours per game, plus an additional 15 seconds for each move."
   > "In chess, AlphaZero defeated Stockfish, winning 155 games and losing 6 games out of 1,000" (empates = 1 000 − 155 − 6 = 839).
   > "AlphaZero searches just 60,000 positions per second in chess and shogi, compared with 60 million for Stockfish" (Tabla S4: 63k vs 58,100k).
   > "AlphaZero may compensate for the lower number of evaluations by using its deep neural network to focus much more selectively on the most promising variations"
   > "achieved superior results within a few hours, searching 1/1,000 as many positions, given no domain knowledge except the rules of chess."
   > "common human openings were independently discovered and played frequently by AlphaZero during self-play training."
2. DeepMind, "AlphaZero: Shedding new light on chess, shogi, and Go" (blog, 6 dic 2018), confirma que el artículo de Science
   "confirms and updates those preliminary results" y enlaza el texto abierto:
   > "taking approximately 9 hours for chess, 12 hours for shogi, and 13 days for Go" · "it searches only 60 thousand positions per second in chess, compared to roughly 60 million for Stockfish."

## Notas
- "Mil veces menos" = 60 mil contra 60 millones de posiciones por segundo; el artículo mismo dice "1/1,000 as many positions"
  (con la tabla S4 exacta, 63 mil contra 58.1 millones ≈ 1/920).
- "El campeón de ajedrez de las máquinas" = Stockfish 8, campeón del TCEC (campeonato mundial de programas) de 2016, el rival del artículo.
- "Cuatro horas" es el dato de la versión de **Science 2018** ("first outperformed Stockfish after just 4 hours"), medido en Elo
  durante el entrenamiento; el entrenamiento completo duró ~9 horas. El duelo de 1 000 partidas fue con la versión de 9 horas.
- "Cinco mil chips de Google" = 5 000 TPU de primera generación (chips diseñados por Google; DeepMind es de Google) usadas solo para
  generar las partidas de entrenamiento; además, 16 TPU de segunda generación entrenaron la red. En el duelo, AlphaZero usó una
  sola máquina con 4 TPU y Stockfish 44 núcleos de CPU (no se menciona en la voz).
- "Aprendía qué jugadas la llevaban a ganar" simplifica el aprendizaje por refuerzo (ajusta la red para predecir el resultado y
  las jugadas de su propia búsqueda).
- "Sus autores proponen…" traduce el "may compensate" del artículo: es una explicación propuesta, no demostrada.
- La mini gráfica de la apertura (Gambito de Dama, de la Fig. 3) es esquemática: sube y se estabiliza, no se dan cifras.
- La gráfica de nivel es esquemática; el dibujo es esquemático. El estudio es de 2018 y así se dice.
