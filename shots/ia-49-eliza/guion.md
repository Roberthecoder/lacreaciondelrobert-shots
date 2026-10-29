# Shot IA #49 · ELIZA: el "psicólogo" de unas cuantas reglas al que le contaban secretos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #49 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (17 ✅; los 2 ⚠️ eran solo de pantalla y ya se corrigieron: teletipo con tinta negra sobre papel en vez de pantalla verde, y el ejemplo del barco etiquetado como lo que respondería un psiquiatra según Weizenbaum) · animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro" (abrimos la máquina y vemos sus reglas) + N6 "Guía en pasos" (el truco en 3 pasos: palabra clave → cambiar «mi» por «tu» → devolver la frase).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: un "psicólogo" en una terminal vieja… que en realidad son unas cuantas reglas.
- **Duración:** voz 945 caracteres / ≈ 165 palabras (≈ 58 s) + cierre 3.5 s → **61.5 s** en la base (estimar-escenas).
- **Postura de la serie:** crítica con datos al reflejo humano de atribuirle comprensión y sentimientos a una máquina (efecto ELIZA), contada con su propia historia. Datos de 1966, 1976, 1995 y 2021–2025; el año se dice donde aplica. No se repite ningún dato de la prueba de Turing de ia-07 (ni el 23 % de ELIZA ni el 73 % de GPT-4.5).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este no es un psicólogo: son unas cuantas reglas. Y aun así, le contaban secretos. | Fondo menta. Desde el cuadro 0, un diván y un "psicólogo" de traje con libreta… cuya cabeza es un **teletipo de los 60 que imprime con tinta negra sobre papel** (ELIZA se usaba "via the typewriter", sin pantalla); un recuadro "rayos X" revela adentro tarjetas de reglas: «SI «mi» → «tu»», «SI «triste» → «SIENTO…»», «SI nada → «SIGA»» (del guion DOCTOR: "Please go on"). Corazoncitos y candados (secretos) salen de una persona hacia la terminal. |
| 1 | Dialogo | Ella escribe: «Mi novio me hizo venir aquí». Contesta: «Tu novio te hizo venir aquí». | Hoja de teletipo que avanza con el diálogo real del artículo de 1966 (traducido): «Los hombres son todos iguales.» / EN QUÉ SENTIDO / «Siempre nos están molestando con algo.» / PUEDES PENSAR EN UN EJEMPLO / «Mi novio me hizo venir aquí.» / TU NOVIO TE HIZO VENIR AQUÍ. Las respuestas de la máquina en MAYÚSCULAS (así venían). |
| 2 | Reglas | El truco: busca palabras clave, cambia «mi» por «tu» y te regresa tu frase. | **Pasos 1-2-3** (N6): la frase entra a la máquina; se ilumina la palabra clave; «mi → tu», «me → te» saltan como fichas; la misma frase sale de vuelta. |
| 2 | Reglas | Si lee «deprimida»: «Siento oír que estás deprimida». | Tarjeta de regla del guion DOCTOR (traducida): "SI: … estás … (triste · infeliz · deprimida · enferma) … → SIENTO OÍR QUE ESTÁS ___". La palabra cae en el hueco. Línea del diálogo real: «Dice que estoy deprimida casi todo el tiempo.» / SIENTO OÍR QUE ESTÁS DEPRIMIDA. |
| 3 | Estudio | Es ELIZA, de Joseph Weizenbaum, del MIT, en 1966. Imitaba a un terapeuta que finge no saber casi nada. | `TarjetaEstudio`: "1966 · MIT · Joseph Weizenbaum · *Communications of the ACM*, vol. 9, núm. 1". Luego, con la etiqueta **«así respondería un psiquiatra, según Weizenbaum:»**, dos burbujas: «Me fui a dar un paseo en barco.» → «Háblame de barcos.» y un barquito (no es una plática registrada con ELIZA). |
| 4 | Pregunta | ¿Y si sabes que es una máquina, ya no te engaña? | **Re-gancho.** "?" gigante sobre la terminal; Robert grande, pensativo. |
| 5 | Secretaria | Su secretaria lo vio programarla por meses. A los pocos mensajes, le pidió que saliera del cuarto. | Oficina de los 60 (caricaturas, sin rostros reales): la secretaria (cabello recogido, suéter lila) teclea en el teletipo; un calendario pasa meses; chip "lo vio programarla por meses"; chip "a los pocos mensajes…"; él sale y la puerta se cierra. **No se dibuja como la persona del diálogo del artículo** (en el diálogo solo se ve texto). |
| 6 | Espiar | Cuando propuso revisar las pláticas, lo acusaron de espiar pensamientos íntimos. | Noche: chip "propuesta: revisar las pláticas de una noche"; le llueven burbujas rojas "¡ESPÍA!"; un candado cae sobre las hojas impresas. |
| 7 | Efecto | A eso le dicen efecto ELIZA: ver comprensión donde solo hay símbolos. | Letras sueltas (símbolos) que, al mirarlas, forman un corazón; título "efecto ELIZA". |
| 8 | Codigo | Lo curioso: su código original no se vio en al menos cincuenta años. En 2021 apareció impreso en el MIT. | Caja "ARCHIVO MIT · papeles de Weizenbaum"; sube papel continuo (fan-fold) con renglones de código esquemáticos; número "50+" con "años sin verse" y sello rojo "2021 · ENCONTRADO". |
| 9 | Hoy | Hoy pasa igual con chatbots: es fácil sentir que te entienden. | Celular moderno con un chat (`CelularChat`), mensajes ilustrativos; corazoncitos salen igual que en el gancho. |
| 10 | Cierre | Si un chat te consuela, acuérdate de ELIZA: no era psicólogo, eran unas cuantas reglas. | **Regreso a la imagen del inicio**: el mismo diván y el "psicólogo" con cabeza de teletipo; se desvanece (traje, sillón y teletipo) y quedan solo las tres tarjetas de reglas; chip "unas cuantas reglas". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música (`gen-audio.mjs`):** cama grave continua (la menor), con un zumbido suave de motor de teletipo; tecleo en cada línea del diálogo y campanita de retorno de carro al terminarla; golpe en cada paso del truco y "clic" en cada cambio «mi → tu», «me → te»; gota cuando cae «deprimida»; hojas del calendario; la puerta se cierra; notas cortas con cada "¡ESPÍA!" y un golpe metálico del candado; subida cuando las letras forman el corazón; crujido del papel continuo y golpe del sello 2021; burbujas de notificación del chat; acorde final en el cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y si sabes que es una máquina, ya no te engaña?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «Este no es un psicólogo: son unas cuantas reglas» (cuadro 0) |
| 2 | 7.6 | 10.05 | 04_bajando_lentes | `izq-alto` | «Tu novio te hizo venir aquí» |
| 3 | 15.0 | 18.05 | 06_pensativo_menton | `arriba-der` | la regla de «deprimida» |
| 4 | 21.4 | 24.15 | 05_sonriendo_dientes_uniformes | `izq-alto` | «Háblame de barcos» (el terapeuta que finge no saber nada) |
| 5 | 24.35 | 27.3 | 07_pensativo_puno | `grande` | «¿Y si sabes que es una máquina, ya no te engaña?» |
| 6 | 30.2 | 33.15 | 11_sorprendido | `arriba-der` | «le pidió que saliera del cuarto» |
| 7 | 34.5 | 38.05 | 10_serio_molesto | `izq-alto` | «lo acusaron de espiar pensamientos íntimos» |
| 8 | 38.7 | 42.35 | 06_pensativo_menton | `arriba-der` | «efecto ELIZA» |
| 9 | 45.0 | 48.65 | 13_senalando_arriba | `arriba-der` | señala el papel continuo: «en 2021 apareció impreso» |
| 10 | 49.3 | 52.55 | 12_perfil_serio | `arriba-der` | «es fácil sentir que te entienden» |
| 11 | 53.7 | 57.9 | 05_sonriendo_dientes_uniformes | `gancho` | «no era psicólogo, eran unas cuantas reglas» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 11 · ≈ 37.6 s (+ cierre 3.5 s) · poses distintas 8 (nunca la misma dos veces seguidas) · total 61.5 s

## Fuentes (cada frase se abrió en la fuente original el 29 oct 2026)

1. **Weizenbaum, J. (enero de 1966).** "ELIZA—A Computer Program For the Study of Natural Language Communication Between Man And Machine". *Communications of the ACM* 9(1): 36–45. MIT. PDF del artículo original: https://web.stanford.edu/class/cs124/p36-weizenabaum.pdf (y https://www.cse.buffalo.edu/~rapaport/572/S02/weizenbaum.eliza.1966.pdf).
   > "Input sentences are analyzed on the basis of decomposition rules which are triggered by key words appearing in the input text. Responses are generated by reassembly rules associated with selected decomposition rules."
   > "Its present implementation is on the MAC time-sharing system at MIT. It is written in MAD-SLIP [4] for the IBM 7094."
   > Diálogo ("A typical conversation is the following:"): "Men are all alike. / IN WHAT WAY / They're always bugging us about something or other. / CAN YOU THINK OF A SPECIFIC EXAMPLE / Well, my boyfriend made me come here. / YOUR BOYFRIEND MADE YOU COME HERE / He says I'm depressed much of the time. / I AM SORRY TO HEAR YOU ARE DEPRESSED" — "The capitalized lines are the machine responses."
   > Regla de cambio de palabras: "(MY = YOUR …) Such a list would mean that whenever the word "MY" is encountered in any text, it would be replaced by the word "YOUR"." y "(ME = YOU)".
   > Regla del guion DOCTOR: "((0 YOU ARE 0 (*SAD UNHAPPY DEPRESSED SICK) 0) (I AM SORRY TO HEAR YOU ARE 5) …".
   > "At this writing, the only serious ELIZA scripts which exist are some which cause ELIZA to respond roughly as would certain psychotherapists (Rogerians)."
   > "the psychiatric interview is one of the few examples of categorized dyadic natural language communication in which one of the participating pair is free to assume the pose of knowing almost nothing of the real world. If, for example, one were to tell a psychiatrist "I went for a long boat ride" and he responded "Tell me about boats"…"
   > "Some subjects have been very hard to convince that ELIZA (with its present script) is not human."
   > "ELIZA shows, if nothing else, how easy it is to create and maintain the illusion of understanding".
2. **Weizenbaum, J. (1976).** *Computer Power and Human Reason: From Judgment to Calculation*. W. H. Freeman, pp. 3–7 (introducción). Texto leído en voz alta del libro (transcripción): https://avdi.codes/wp-content/uploads/2023/05/012-Computer-Power-and-Human-Reason.vtt ; cita y página confirmadas por ELIZA Archaeology Project: https://sites.google.com/view/elizaarchaeology/blog/3-weizenbaums-secretary ("Weizenbaum 1976: 6-7").
   > "Once my secretary, who had watched me work on the program for many months and therefore surely knew it to be merely a computer program, started conversing with it. After only a few interchanges with it, she asked me to leave the room."
   > "Another time, I suggested I might rig the system so that I could examine all conversations anyone had had with it, say, overnight. I was promptly bombarded with accusations that what I proposed amounted to spying on people's most intimate thoughts; clear evidence that people were conversing with the computer as if it were a person who could be appropriately and usefully addressed in intimate terms."
   > "I was startled to see how quickly and how very deeply people conversing with DOCTOR became emotionally involved with the computer and how unequivocally they anthropomorphized it."
   > "What I had not realized is that extremely short exposures to a relatively simple computer program could induce powerful delusional thinking in quite normal people."
   > p. 3 (vía ELIZA Archaeology): "The following conversation between a young lady and Eliza playing doctor illustrates both the Rogerian technique…" → por eso "Ella escribe".
   > Versión anterior (Weizenbaum 1967, p. 477): "Would you mind leaving the room, please?" (no se usa textual en la voz).
3. **Hofstadter, D. (1995).** *Fluid Concepts and Creative Analogies*, Prefacio 4 "The Ineradicable Eliza Effect and Its Dangers", p. 157 (citado por Dillon, S. "The Eliza Effect and Its Dangers", Cambridge: https://core.ac.uk/download/305109957.pdf).
   > Efecto ELIZA = "the susceptibility of people to read far more understanding than is warranted into strings of symbols – especially words – strung together by computers".
4. **Lane, R., Hay, A., Schwarz, A., Berry, D. M. y Shrager, J. (enero de 2025).** "ELIZA Reanimated: The world's first chatbot restored on the world's first time sharing system". arXiv:2501.06707. https://arxiv.org/html/2501.06707v1
   > "But until it was rediscovered in 2021, the original MAD-SLIP ELIZA had not been seen by anyone for at least 50 years"
   > "until 2021 when Jeff Shrager – the author of the 1973/1977 BASIC ELIZA – and MIT archivist Myles Crowley found what appeared to be a complete copy of the source among Weizenbaum's papers"
   > "We discovered an original ELIZA printout in Prof. Weizenbaum's archives at MIT, including an early version of the famous DOCTOR script, a nearly complete version of the MAD-SLIP code" (y el papel era "fan-fold printout").

## Notas
- **Traducción del diálogo:** las líneas en pantalla son traducción fiel del artículo de 1966; en el original las respuestas de la máquina van en mayúsculas y sin signos de interrogación (el sistema MAC no dejaba usar "?"). La regla de "deprimida" se muestra traducida y simplificada (en el original: "YOU ARE … SAD/UNHAPPY/DEPRESSED/SICK").
- "Unas cuantas reglas" = el guion DOCTOR es una lista de palabras clave con plantillas de descomposición y respuesta (se publicó completo en el apéndice del artículo); no se da una cifra exacta de reglas.
- "Le contaban secretos" se apoya en Weizenbaum 1976 ("spying on people's most intimate thoughts… addressed in intimate terms") y 1966 ("Some subjects have been very hard to convince that ELIZA… is not human").
- "Imitaba a un terapeuta que finge no saber casi nada" = el terapeuta rogeriano del artículo, que puede "assume the pose of knowing almost nothing of the real world".
- La secretaria nunca fue nombrada por Weizenbaum; se dibuja como caricatura genérica y **no** como la persona del diálogo del artículo (Berry y Ciston, 2024, señalan dudas sobre si eran la misma). Weizenbaum también es caricatura, no retrato.
- La tarjeta de rayos X incluye «SI nada → «SIGA»», de las respuestas sin palabra clave del guion DOCTOR ("Please go on", Weizenbaum 1966).
- En pantalla, ELIZA siempre es un teletipo/máquina de escribir con tinta negra sobre papel ("via the typewriter of course", 1966), nunca una pantalla.
- "Hoy pasa igual con chatbots: es fácil sentir que te entienden" es la conexión con hoy, en línea con la cita de Weizenbaum (1966) sobre lo fácil que es crear "the illusion of understanding". No se afirma ninguna cifra moderna. El chat en el celular es ilustrativo.
- El dibujo es esquemático.
