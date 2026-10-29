# Verificación de hechos · Shot IA #31 · AlphaZero: revisaba mil veces menos y aun así ganaba

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- Fuente primaria abierta y leída completa: Silver et al. 2018, *Science* 362(6419):1140–1144, versión aceptada de acceso abierto que
  enlaza DeepMind (https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphazero-shedding-new-light-on-chess-shogi-and-go/alphazero_preprint.pdf).
  Datos bibliográficos confirmados en PubMed (PMID 30523106: "Science 2018 Dec 7; 362(6419):1140-1144").
- Se revisaron la voz (`narracion.json`), la columna "Lo que se ve" y las notas del guion. Aún no hay `.jsx`.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | AlphaZero revisaba mil veces menos posiciones que Stockfish | ✅ | Silver et al., *Science* | "achieved superior results within a few hours, searching 1/1,000 as many positions" (tabla S4: 63k vs 58,100k ≈ 1/920) | 2018 |
| 2 | Stockfish = "el campeón de ajedrez de las máquinas" (en ese momento) | ✅ | Silver et al., *Science* | "The chess match was played against the 2016 TCEC (season 9) world champion Stockfish"; "we used Stockfish version 8" | 2018 (título de 2016) |
| 3 | …y aun así le ganó | ✅ | Silver et al., *Science* | "In chess, AlphaZero defeated Stockfish, winning 155 games and losing 6 games out of 1,000" | 2018 |
| 4 | Nadie le enseñó partidas humanas: solo las reglas | ✅ | Silver et al., *Science* | "given no domain knowledge except the game rules"; "tabula rasa – without domain-specific human knowledge or data" | 2018 |
| 5 | Empezó moviendo piezas al azar | ✅ | Silver et al., *Science* | "Starting from random play" | 2018 |
| 6 | Jugó contra sí misma 44 millones de partidas | ✅ | Silver et al., *Science*, tabla S3 | "Training Games … 44 million" (columna Chess) | 2018 |
| 7 | Aprendía qué jugadas la llevaban a ganar | ✅ (simplificación aceptable) | Silver et al., *Science* | "learning from self-play games"; reinforcement learning from self-play | 2018 |
| 8 | A las 4 horas de entrenar ya superaba a Stockfish | ✅ | Silver et al., *Science* | "In chess, AlphaZero first outperformed Stockfish after just 4 hours (300,000 steps)" (medido en Elo con partidas de 1 s por jugada, Fig. 1) | 2018 |
| 9 | Entrenó nueve horas en total | ✅ | Silver et al., *Science* | "Training lasted for approximately 9 hours in chess" | 2018 |
| 10 | Stockfish revisaba unos 60 millones de posiciones por segundo; AlphaZero solo 60 mil | ✅ | Silver et al., *Science* | "AlphaZero searches just 60,000 positions per second in chess and shogi, compared with 60 million for Stockfish" | 2018 |
| 11 | Sus autores creen que su red neuronal le señala qué jugadas mirar | ⚠️ (leve: "creen" es más fuerte que "may") | Silver et al., *Science* | "AlphaZero may compensate for the lower number of evaluations by using its deep neural network to focus much more selectively on the most promising variations" | 2018 |
| 12 | DeepMind, en Londres | ✅ | Silver et al., *Science* (afiliación) | "DeepMind, 6 Pancras Square, London N1C 4AG." | 2018 |
| 13 | Publicado en *Science* en 2018 | ✅ | PubMed 30523106 | "Science 2018 Dec 7;362(6419):1140-1144" | 2018 |
| 14 | En mil partidas ganó 155, perdió 6 y empató las demás (839 en pantalla) | ✅ | Silver et al., *Science* | "winning 155 games and losing 6 games out of 1,000" (1000−155−6 = 839) | 2018 |
| 15 | Pantalla: "3 h por partida + 15 s por jugada" | ✅ | Silver et al., *Science* | "time controls of 3 hours per game, plus an additional 15 seconds for each move" | 2018 |
| 16 | Sin ver a ningún humano descubrió sola aperturas que las personas usamos mucho | ✅ | Silver et al., *Science* | "common human openings were independently discovered and played frequently by AlphaZero during self-play training" | 2018 |
| 17 | Pantalla: apertura 1. d4 + contador "veces que la jugaba" que sube con las horas | ⚠️ (pantalla) | Silver et al., *Science*, Fig. 3 / fig. S2 | Fig. 3: "The percentage frequency of self-play training games in which this opening was selected by AlphaZero is plotted against the duration of training, in hours." En la figura, varias aperturas suben y luego bajan; no todas suben siempre | 2018 |
| 18 | Para entrenar usó cinco mil chips de Google (pantalla: "5 000 TPU para generar partidas, solo en el entrenamiento") | ✅ | Silver et al., *Science* | "During training only, 5,000 first-generation tensor processing units (TPUs) (19) were used to generate self-play games, and 16 second-generation TPUs were used to train the neural networks" (TPU = chip de Google, ref. 19) | 2018 |
| 19 | Pantalla: tarjeta "2018 · DeepMind (Londres) · Silver et al. · *Science*" | ✅ | PubMed 30523106 + afiliación | ver #12–13 | 2018 |
| 20 | Pantalla: gráfica de nivel (Elo) que cruza la línea de Stockfish en 4 h y sigue a 9 h | ✅ (marcada como esquemática) | Silver et al., *Science*, Fig. 1 | ver #8–9 | 2018 |
| 21 | Cierre: "revisar más no lo es todo: a veces gana quien sabe dónde mirar" | ✅ (conclusión/opinión coherente con #1, #3, #11) | — | — | — |

Notas de forma: cada cifra dice de qué es (posiciones por segundo, partidas, horas, chips); el año del estudio (2018, > 2 años) se dice
en la voz (escena 7); cifras y enlace vienen de la misma fuente (versión de *Science*, no el preprint de arXiv 2017). No encontré un
dato más nuevo que contradiga estas cifras (las críticas al preprint de 2017 sobre la configuración de Stockfish fueron atendidas en
la versión de 2018 con partidas adicionales; el guion no usa cifras del preprint).

## Correcciones necesarias

1. **#11 (voz, escena 6):** el artículo lo plantea como posibilidad ("may compensate"). Propuesta:
   "Sus autores proponen que su red neuronal le señala qué jugadas mirar." (o "Sus autores piensan que quizá…"). Mantener el chip
   "hipótesis de los autores".
2. **#17 (pantalla, escena 8):** usar una apertura que sí aparezca en la Fig. 3 del artículo (p. ej. Gambito de Dama, 1. d4 d5 2. c4)
   y que el contador no suba siempre: mostrarlo como "% de partidas en que la elegía" que sube y se estabiliza (o sube y baja), con
   la etiqueta "esquemático". O quitar el contador y dejar solo la apertura con el globo "¡como los humanos!".
