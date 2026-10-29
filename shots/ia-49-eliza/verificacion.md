# Verificación de hechos · Shot IA #49 · ELIZA: el "psicólogo" de unas cuantas reglas al que le contaban secretos

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- **Qué se revisó:** `guion.md` (voz + columna "Lo que se ve" + notas) y `narracion.json`. Todavía no hay `.jsx`.
- **Cómo:** el artículo de 1966 se bajó en PDF y se buscó cada frase en el texto (copias de Stanford y de Buffalo, que son idénticas).
  El libro de 1976 **no se pudo abrir**: archive.org lo tiene como préstamo restringido (401 / "Item not available") y la API de Google Books
  no respondió (límite de cuota). Las citas del libro se confirmaron con **tres fuentes independientes que coinciden palabra por palabra**:
  (a) un artículo académico revisado por pares, Berry 2023, *Weizenbaum Journal of the Digital Society* 3(3), DOI 10.34669/WI.WJDS/3.3.2,
  que cita la p. 6; (b) el blog del ELIZA Archaeology Project (Berry y Ciston, investigadores), que cita pp. 3 y 6–7; (c) la lectura en voz alta
  de la introducción del libro (Avdi Grimm, 2023, transcripción .vtt). Con esa coincidencia se dan como ✅, con la nota de que no se vio el libro.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | ELIZA no es un psicólogo: son "unas cuantas reglas" (palabras clave + reglas de descomposición y respuesta) | ✅ | Weizenbaum, *Comm. ACM* 9(1):36–45 | "Input sentences are analyzed on the basis of decomposition rules which are triggered by key words appearing in the input text." / "The largest dictionary so far attempted contains about 50 keywords." | 1966 |
| 2 | "Y aun así, le contaban secretos" | ✅ | Weizenbaum 1976, p. 6 (vía Berry 2023 y lectura del libro) | "clear evidence that people were conversing with the computer as if it were a person who could be appropriately and usefully addressed in intimate terms." | 1976 |
| 3 | Diálogo real: «Mi novio me hizo venir aquí» → «Tu novio te hizo venir aquí» (y las líneas previas «Los hombres son todos iguales» / EN QUÉ SENTIDO / … / PUEDES PENSAR EN UN EJEMPLO) | ✅ | Weizenbaum 1966, p. 36–37 | "Men are all alike. / IN WHAT WAY / They're always bugging us about something or other. / CAN YOU THINK OF A SPECIFIC EXAMPLE / Well, my boyfriend made me come here. / YOUR BOYFRIEND MADE YOU COME HERE" | 1966 |
| 4 | "Ella escribe" (quien escribe es una mujer) | ✅ | Weizenbaum 1976, p. 3 (vía ELIZA Archaeology Project) | "The following conversation between a young lady and Eliza playing doctor illustrates…" | 1976 |
| 5 | Las respuestas de la máquina venían en MAYÚSCULAS y sin "?" | ✅ | Weizenbaum 1966 | "The capitalized lines are the machine responses." / "Only the question mark may not be used, because it is interpreted as a line delete character by the MAC system." | 1966 |
| 6 | El truco: busca palabras clave, cambia «mi» por «tu» (y «me» por «te») y regresa la frase | ✅ | Weizenbaum 1966 | "whenever the word "MY" is encountered in any text, it would be replaced by the word "YOUR"" / "(ME = YOU)" / "requires that first person pronouns be exchanged for second person pronouns" | 1966 |
| 7 | Regla del guion DOCTOR: triste · infeliz · deprimida · enferma → «Siento oír que estás ___» | ✅ | Weizenbaum 1966, apéndice | "((0 YOU ARE 0 (*SAD UNHAPPY DEPRESSED SICK) 0) (I AM SORRY TO HEAR YOU ARE 5)" | 1966 |
| 8 | Diálogo real: «Dice que estoy deprimida casi todo el tiempo» → SIENTO OÍR QUE ESTÁS DEPRIMIDA | ✅ | Weizenbaum 1966 | "He says I'm depressed much of the time. / I AM SORRY TO HEAR YOU ARE DEPRESSED" | 1966 |
| 9 | ELIZA, de Joseph Weizenbaum, del MIT, 1966; *Communications of the ACM*, vol. 9, núm. 1 | ✅ | Weizenbaum 1966 | "Its present implementation is on the MAC time-sharing system at MIT." / "Volume 9 / Number 1 / January, 1966" | 1966 |
| 10 | Imitaba a un terapeuta que finge no saber casi nada (rogeriano) | ✅ | Weizenbaum 1966, p. 42 | "cause ELIZA to respond roughly as would certain psychotherapists (Rogerians)" / "free to assume the pose of knowing almost nothing of the real world" | 1966 |
| 11 | En pantalla: «Me fui a dar un paseo en barco» → «Háblame de barcos» como "ejemplo del artículo" | ⚠️ | Weizenbaum 1966, p. 42 | "If, for example, one were to tell a psychiatrist "I went for a long boat ride" and he responded "Tell me about boats"…" — es un ejemplo de lo que diría **un psiquiatra**, no una respuesta registrada de ELIZA | 1966 |
| 12 | Su secretaria lo vio programarla por meses | ✅ | Weizenbaum 1976, pp. 6–7 (vía ELIZA Archaeology Project y lectura del libro) | "Once my secretary, who had watched me work on the program for many months and therefore surely knew it to be merely a computer program, started conversing with it." (En 1967 lo contó como "over a long period of time".) | 1976 |
| 13 | A los pocos mensajes, le pidió que saliera del cuarto | ✅ | Weizenbaum 1976, pp. 6–7 (mismas fuentes) | "After only a few interchanges with it, she asked me to leave the room." | 1976 |
| 14 | Cuando propuso revisar las pláticas (de una noche), lo acusaron de espiar pensamientos íntimos | ✅ | Weizenbaum 1976, p. 6 (lectura del libro; el párrafo que sigue lo cita Berry 2023, p. 6) | "I suggested I might rig the system so that I could examine all conversations anyone had had with it, say, overnight. I was promptly bombarded with accusations that what I proposed amounted to spying on people's most intimate thoughts" | 1976 |
| 15 | Efecto ELIZA = ver comprensión donde solo hay símbolos | ✅ | Hofstadter, *Fluid Concepts and Creative Analogies*, p. 157 (vía Dillon, Cambridge, y Wikipedia "ELIZA effect"; el libro no se abrió) | "the susceptibility of people to read far more understanding than is warranted into strings of symbols – especially words – strung together by computers" | 1995 |
| 16 | Su código original no se vio en al menos 50 años (pantalla: "50+ años sin verse") | ✅ | Lane, Hay, Schwarz, Berry y Shrager, arXiv:2501.06707 | "the original MAD-SLIP ELIZA had not been seen by anyone for at least 50 years" | 2025 |
| 17 | En 2021 apareció impreso en el MIT (papel continuo) | ✅ | Lane et al. 2025 | "until it was rediscovered in 2021" / "found what appeared to be a complete copy of the source among Weizenbaum's papers" / "discovered an original ELIZA printout in Prof. Weizenbaum's archives at MIT" / "on the fan-fold printout" | 2025 (hallazgo 2021) |
| 18 | Hoy pasa igual con chatbots: es fácil sentir que te entienden | ✅ | Colombatto y Fleming, *Neuroscience of Consciousness* 2024(1): niae013 (apoyo extra; el guion no da cifra) | "a majority of participants were willing to attribute some possibility of phenomenal consciousness to large language models" (67 %), y la atribución sube con la frecuencia de uso | 2024 |
| 19 | En pantalla: el "psicólogo" con cabeza de **terminal con letras verdes** | ⚠️ | Weizenbaum 1966 | "instructed to "talk" to it, via the typewriter of course" — se usaba con máquina de escribir/teletipo que imprimía en papel; las pantallas de letras verdes son posteriores. Es solo visual, pero afirma algo falso sobre cómo era | 1966 |

**Revisiones generales**
- Cifras: la única es "50 años" y dice de qué es (el código sin verse). ✅
- Años: el diálogo y el estudio llevan "1966"; la secretaria y el espionaje quedan en el mismo contexto (los 60) sin decir 1976, que es el año del libro donde lo contó, no de los hechos: correcto. "2021" se dice. ✅
- No se mezclan cifras de una fuente con el enlace de otra. ✅
- Matiz a conocer (no exige cambio): Berry y Ciston (2024) señalan inconsistencias entre las versiones de 1967 y 1976 de la anécdota de la secretaria y dudan de si es la misma "young lady" del diálogo. El guion **no** dice que la secretaria sea la del diálogo: bien, que se mantenga así (no dibujar a la misma mujer en las dos escenas).

## Correcciones necesarias

1. **#11 (pantalla, ⚠️):** el ejemplo del barco no es una plática real con ELIZA, es lo que Weizenbaum dice que respondería un psiquiatra.
   Propuesta: etiqueta en la `TarjetaEstudio` → «Como un psiquiatra: "Me fui a dar un paseo en barco" → "Háblame de barcos"», o dibujarlo
   saliendo de un psiquiatra (no de la terminal). Si no, quitarlo.
2. **#19 (pantalla, ⚠️):** cambiar "terminal vieja de teletipo **con letras verdes**" por una **máquina de escribir/teletipo que imprime en papel
   con tinta negra** (como la "hoja de teletipo" de la escena 1). La cabeza del "psicólogo" puede ser ese teletipo con su rollo de papel.

Voz y narración (`narracion.json`): sin correcciones; todas sus afirmaciones quedan ✅.

## Re-verificación (29 oct 2026, coordinador)
- Ejemplo del barco etiquetado «así respondería un psiquiatra, según Weizenbaum» (artículo de 1966) ✅
- ELIZA dibujada como teletipo que imprime en papel, sin pantalla ("via the typewriter") ✅
- Secretaria como caricatura genérica, sin burbuja de la versión de 1967 ✅
- Tarjeta «SI nada → «SIGA»»: palabra clave NONE del guion DOCTOR, respuesta "PLEASE GO ON" (apéndice, Weizenbaum 1966) ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
