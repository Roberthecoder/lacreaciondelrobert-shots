# Verificación de hechos · Shot IA #25 · El "robot" que jugaba ajedrez era una persona escondida

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Revisé `guion.md` (voz y columna "Lo que se ve") y `narracion.json` (no hay `.jsx` todavía).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | El "robot" que jugaba ajedrez no era un robot: adentro iba una persona escondida | ✅ | IEEE Spectrum, Schwartz, "Charles Babbage and the Turk" | "Kempelen and Maelzel hired chess masters to sit hidden inside the large cabinet." | 2019 (hechos de 1770–1850s) |
| 2 | Le decían "el Turco"; muñeco de madera con turbante (pantalla: "el Turco · madera", túnica, turbante, pipa) | ✅ | IEEE Spectrum 2019; Wikipedia "Mechanical Turk" (cons. 29 oct 2026) | "The Turk, as Kempelen called his invention, was a life-size automaton carved out of maple wood, dressed in Ottoman robes" / Wikipedia: "dressed in Ottoman robes and a turban" | 2019 |
| 3 | El muñeco iba "sentado sobre una caja" | ⚠️ | IEEE Spectrum 2019 | "sitting behind a wooden cabinet with a chessboard on top" — iba sentado DETRÁS de la caja (el tablero encima de ella), no encima | 2019 |
| 4 | "Movía las piezas solo" (en apariencia) | ✅ (como apariencia; el gancho ya aclara que no) | IEEE Spectrum 2019 | "presented a chess-playing machine" | 2019 |
| 5 | Antes de jugar abrían las puertas y enseñaban engranes y palancas; presentador con vela | ✅ | IEEE Spectrum 2019; Mitchell 1857 (*The Chess Monthly*) | "Kempelen opened the doors of the cabinet to show a clockwork-like mechanism—an intricate network of levers and cogs" / Wikipedia: "the front doors of the cabinet exposed gears and cogs resembling clockwork" | 2019 / 1857 |
| 6 | Adentro iba un maestro de ajedrez | ✅ | IEEE Spectrum 2019; Wikipedia (operadores: Allgaier, Boncourt, Alexandre, Lewis, Mouret, Schlumberger) | "hired chess masters to sit hidden inside the large cabinet" (nota: los del tour original de Kempelen son desconocidos; el guion no los nombra) | 2019 |
| 7 | Seguía la partida con imanes bajo el tablero | ✅ | IEEE Spectrum 2019; Wikipedia | "The chess master could observe what was happening on the chess board above via magnets" / "This allowed the operator inside the machine to see which pieces moved where" | 2019 |
| 8 | Movía el brazo del muñeco con palancas | ✅ (simplificación aceptable; dibujo esquemático) | IEEE Spectrum 2019; Wikipedia | "the concealed player used a pantograph—a system of pulleys that synchronized his arm movements… The player moved a lever" | 2019 |
| 9 | Según los relatos, 1809, Viena (Schönbrunn), Napoleón intentó hacer trampa y el Turco tiró todas las piezas | ✅ (dicho como relato) | Wikipedia "Mechanical Turk", que cita a Ewart 1980 y Standage 2002; Mitchell 1857 da otra versión | "In 1809, Napoleon I of France arrived at Schönbrunn Palace to play the Turk… accounts… are contradictory" / "the Turk responding with a sweep of its arm, knocking all the pieces off the board" | relato de 1809; versiones 1857–2002 |
| 10 | En 2005 Amazon abrió una página donde personas hacían tareas chiquitas | ✅ | Barr, AWS News Blog, 21 nov 2005; IEEE Spectrum 2019 | "On the evening of Wednesday, November 2nd, we announced that Amazon's Mechanical Turk was ready for beta testing." / "The service launched in 2005" | 2005 |
| 11 | …tareas que las computadoras aún no podían | ✅ | IEEE Spectrum, Schwartz, "How Amazon's Mechanical Turkers Got Squeezed Inside the Machine" | tareas "easy for humans (but hard to automate)"; "actually required human intelligence" | 2019 |
| 12 | Le puso Mechanical Turk por el Turco (pantalla: flecha del letrero al Turco de madera) | ✅ | IEEE Spectrum 2019; Stephens, *Cultural Studies* 37(1) 2022; AWS blog 12 may 2006 (artículo de Amazon que arranca con el Turco original) | "The name of this new service was a wink at the chess-playing machine of the 18th century, the Mechanical Turk invented by the huckster Wolfgang von Kempelen… inside which hid a human chess player." (No encontré página oficial de Amazon que lo diga textual: mturk.com/help no lo menciona; ACM Queue y archive.org dan 403/bloqueo. Con IEEE + revista académica + blog de AWS basta.) | 2019 / 2022 / 2006 |
| 13 | Ahí mucha gente etiquetó datos para entrenar IA ("gato / no es gato" = ejemplo ilustrativo) | ✅ | IEEE Spectrum 2019 | "MTurk workers are frequently used to build and label these training data sets." | 2019 |
| 14 | Amazon la cerró el 30 de septiembre (pantalla: "cerrado · 30 sep 2026") | ✅ | mturk.com y mturk.com/help (abiertas 29 oct 2026) | "Amazon Mechanical Turk permanently closed on September 30, 2026." / "HIT submission closed on September 30, 2026." | 2026 |
| 15 | "Y este año…" (voz) | ⚠️ | — | Correcto solo si se ve en 2026; se publica el 20 dic 2026 y seguirá en redes en 2027: "este año" quedará falso | — |
| 16 | "Su truco sigue vivo en la IA" / "detrás de ella también hubo personas" | ✅ (interpretación sostenida por #12–13) | Stephens 2022 | "Amazon's Mechanical Turk is a marketplace in which companies can hire piecemeal cognitive labour to patch gaps and train programs… 'artificial artificial intelligence'" | 2022 |

## Correcciones necesarias

1. **#3 "sentado sobre una caja" (⚠️):** el Turco iba sentado detrás del gabinete, con el tablero encima de la caja.
   - Voz propuesta: «Le decían el Turco: un muñeco de madera con turbante, sentado tras una caja, que movía las piezas solo.» (o «sentado ante una caja»).
   - Pantalla: dibujar al muñeco sentado detrás del gabinete con el tablero arriba de la caja (no encima de ella). En el cierre, el robotito/pantalla puede ir igual detrás de la caja.
2. **#15 "Y este año" (⚠️):** cambiar a «Y en dos mil veintiséis, el treinta de septiembre, Amazon la cerró.» (+1 palabra, ≈ +0.4 s; revisar que el total siga en 61–62 s).

Notas (no requieren cambio): Napoleón se dice como relato y se dibuja como leyenda (bien); no se da el año 1770 del Turco (no hace falta); la cifra "2005" tiene más de 2 años pero ya se dice con su año.
