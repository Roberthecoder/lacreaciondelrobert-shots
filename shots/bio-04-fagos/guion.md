# Shot Biotecnológico #04 · El virus que solo ataca bacterias (fagos)

- **Serie:** Shot Biotecnológico · **Logo:** `logo_bioquimica.svg` · **Badge:** #04.
- **Remasteriza:** viejo #14 (oj9BTyku-cs). Se quita lo de "flotilla de un ejército de virus… ya nos la fulminamos" y "solución indispensable"; en su lugar, el mecanismo dibujado y un caso real con fuente (Tom Patterson, 2016).
- **Formato (RECETARIO):** N1 "Por dentro" (el fago aterriza, inyecta, la bacteria se vuelve fábrica y revienta; luego tu cuerpo con rayos X). Gemelo mudo: M4 "Ciclo" lítico con conteo (placa de Petri).
- **Gancho:** #1 "Esto no es X: es Y" sobre el fago gigante que cae en pantalla ("no es un robot de película").
- **Duración:** voz estimada 57.9 s (940 caracteres) + cierre 3.5 s ≈ 61.4 s, con `"velocidad": 1.065`.
- **Estado:** construido sin voz; la voz espera la aprobación de Robert (~940 créditos).

## Versión narrada (940 caracteres)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es un robot de película: es un virus que solo ataca bacterias. | Fondo cian. **A los 0 s** cae un fago T4 gigante, rebota y abre sus patas. Mito "robot" que se tacha. Barra de escala (50 nm). |
| 1 | Aterriza | Se llama fago. Aterriza sobre la bacteria con sus seis patas. | Fondo oscuro (micro, barra de 200 nm). El fago baja y abre sus 6 fibras largas sobre una *Escherichia coli*. |
| 2 | Inyecta | Contrae la cola como jeringa y le inyecta su ADN. | La vaina se encoge, el tubo perfora y el ADN rosa pasa de la cabeza a la bacteria. Arranca un cronómetro en time-lapse. |
| 3 | Fábrica | Ese ADN toma el control de la fábrica de la bacteria: ahora solo hace fagos. | Dentro de la bacteria aparecen fagos nuevos, uno tras otro. Chip "la fábrica ahora hace fagos". |
| 4 | Revienta | En menos de media hora la revienta, y salen cientos de fagos nuevos. | El cronómetro llega a ~25 min y la bacteria revienta: 30 fagos salen volando. Chip "cientos de fagos nuevos". |
| 5 | Pregunta | ¿Y si eso pasa dentro de ti? | **Re-gancho.** Una persona en fondo coral; **Lupa de rayos X** en la panza: tus células (rosas) y bacterias (verdes). Sticker pensativo. |
| 6 | Selectivo | Cada fago ataca solo a ciertas bacterias: a tus células no les hace nada. | Un fago rebota de una célula tuya (✗) y aterriza en una bacteria. |
| 7 | Selectivo | Por eso hoy se estudian contra las superbacterias. | La bacteria se pone dorada con corona: "SUPERBACTERIA". Tres cápsulas de antibiótico le rebotan; el fago sigue ahí. |
| 8 | Estudio | En 2016, en San Diego, Tom Patterson estaba en coma por una bacteria resistente a todos los antibióticos. | Tarjeta "2016 · Tom Patterson · UC San Diego · Schooley et al., *Antimicrob. Agents Chemother.* 2017". Cama de hospital, monitor lento, etiqueta *Acinetobacter baumannii*, chip "0 antibióticos sirven". |
| 9 | Estudio | Sus médicos le pusieron cócteles de fagos buscados a toda prisa… y en tres días despertó. | La bolsa de suero se llena de fagos y corre por la línea. Contador "día 1 → 3"; abre los ojos. Chip "despertó". Sticker sorprendido. |
| 10 | Historia | Los descubrió Félix d'Hérelle en 1917, en París, once años antes que la penicilina. | Tarjeta "1917 · Félix d'Hérelle · Instituto Pasteur · París". Línea de tiempo 1917 fagos → 1928 penicilina: "11 años antes". |
| 11 | Extra | Y se estima que hay diez quintillones de fagos en el planeta: un uno con treinta y un ceros. | Espacio: la Tierra rodeada de fagos. "10³¹" gigante y se escriben los 31 ceros. Chip "se estima". |
| 12 | Cierre | Así que ese robot no es de película: puede ser la medicina cuando ya no sirvan los antibióticos. | **El mismo fago gigante del inicio**, junto a un frasco "FAGOS"; "robot" tachado y chip "fagoterapia". |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (`gen-audio.mjs`, sin costo)
- **Fondo:** cama grave continua, sin golpe.
- **Efectos en el mismo cuadro:** caída y rebote del fago, aterrizaje, inyección (ruido que baja), reloj del time-lapse, notas de los fagos que se arman, **estallido** con 30 "pops", rebote de la célula, cápsulas metálicas, monitor del hospital, nota que sube al despertar, 31 tics = 31 ceros.

## Gemelo mudo (construido: `Shot Fagos mudo.dc.html`)
Loop de 61.5 s en 6 capítulos: llega → inyecta → fábrica de fagos (contador "~200 fagos adentro", cronómetro hasta ~25 min) → revienta → en la placa de Petri cada ciclo abre un claro ("calva"; contador 1 → 200 → 40 000 fagos) → zoom a la orilla de una calva: otra *E. coli* y otro fago llegando (= primer cuadro). Primer texto: **"Este virus solo come bacterias"**.
- **Música hecha de datos:** un tic por cada minuto simulado de la infección (~25 hasta reventar); cada fago que se arma es una nota (200 notas que suben); la cama va tensa mientras la bacteria es fábrica y se abre al reventar; un "pop" por fago que sale; en la placa, una nota grave por calva y golpes cada vez más fuertes para 1 → 200 → 40 000.
- Título: **¿Cuántos fagos salen de una bacteria? 🎧 | Shot Biotecnológico 04**

## Título (narrado)
¿Virus que curan infecciones? Sí existen 🦠 | Shot Biotecnológico 04

## Descripción (borrador, sin emojis)
Los bacteriófagos (fagos) son virus que solo infectan bacterias. Un fago como T4 se posa sobre *Escherichia coli* con sus seis fibras de la cola, contrae la cola como jeringa e inyecta su ADN. Ese ADN toma el control de la bacteria, que deja de hacer sus cosas y fabrica fagos nuevos; en menos de media hora la revienta y salen cientos. Como cada fago reconoce solo ciertas bacterias, no infecta tus células, y por eso se estudian contra superbacterias resistentes a los antibióticos. En 2016, en la Universidad de California en San Diego, Tom Patterson estaba en coma por una infección de *Acinetobacter baumannii* resistente a todos los antibióticos; sus médicos, con permiso de emergencia de la FDA, le aplicaron cócteles de fagos buscados a toda prisa y salió del coma a los pocos días (Schooley et al., 2017). No es un tratamiento aprobado de uso general: se usa en casos compasivos y en ensayos. Los fagos los describió Félix d'Hérelle en 1917 en el Instituto Pasteur de París (Frederick Twort vio el efecto en 1915), once años antes del descubrimiento de la penicilina. Se estima que hay unos 10³¹ fagos en la Tierra. El dibujo es esquemático y el fago está agrandado.
¿Habías escuchado de la fagoterapia? ¿Te la pondrías?

## Fuentes
- Schooley, R. T. et al. (2017). Development and use of personalized bacteriophage-based therapeutic cocktails to treat a patient with a disseminated resistant *Acinetobacter baumannii* infection. *Antimicrobial Agents and Chemotherapy* 61(10): e00954-17. Y UC San Diego Health (abril de 2017): salió del coma en los tres días siguientes a los fagos intravenosos.
- Estructura de T4 (6 fibras largas, vaina contráctil, inyección): Leiman et al. y resumen en Wikipedia "Escherichia virus T4"; ciclo de ~22 min a 37 °C con cientos de fagos por bacteria (las cifras varían con la cepa y las condiciones; por eso "menos de media hora" y "cientos").
- d'Hérelle, F. (1917). Sur un microbe invisible antagoniste des bacilles dysentériques. *Comptes Rendus de l'Académie des Sciences* 165: 373–375 (Instituto Pasteur, París). Penicilina: Fleming, 1928.
- 10³¹ fagos en la Tierra: estimación atribuida a Roger Hendrix (citada por *Science News*, "All the World's a Phage", y discutida en Mushegian, 2020, *J. Bacteriol.*). Es un orden de magnitud, no un conteo.

## Datos no verificados del todo
- El número exacto de fagos por bacteria y los minutos del ciclo dependen de la cepa; en el mudo se usan ~200 fagos y ~25 min como valores redondos dentro de lo publicado.
- 10³¹ es una estimación que algunos autores discuten; la voz dice "se estima".
- No se leyó el artículo de Schooley completo; los detalles del caso vienen de comunicados de UC San Diego y notas de prensa.
