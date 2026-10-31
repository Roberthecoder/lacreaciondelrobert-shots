# Shot IA #33 · La IA que sabe a qué huele una molécula sin olerla

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #33 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (2 ⚠️ corregidos: «En 2023, … publicaron la prueba» y «setenta años sin parar»), animación, Robert en pantalla, música y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N4 "La imagen que se llena" (el mapa de olores que se va llenando de puntos de colores) + N1 "Por dentro" (cómo ve la IA una molécula: átomos y enlaces).
- **Gancho (de los 7):** #2 "Tú contra el de al lado": tú hueles con la nariz; la IA nunca ha olido nada.
- **Duración:** voz 967 caracteres / 174 palabras (estimador: 958 · ≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** la defendemos (quedó más cerca del promedio que el catador típico en 53 % de las moléculas) y la criticamos con datos (su peor resultado fue el almizcle; el estudio lo pagó Google y tres de los autores se unieron a Osmo, empresa que comercializa parte de esta tecnología: va en la descripción).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tú hueles con la nariz. Esta IA nunca ha olido nada: ve una molécula dibujada y dice a qué huele. | Fondo rosa. Cuadro 0: una nariz grande inhala (ondas de olor que se mueven) frente a un Robotito con pinza en la nariz que mira una molécula dibujada en una hoja; sale una nube con "🍋 cítrico, fresco". Robert en `gancho`. |
| 1 | Espejo | Es difícil: esta molécula y su reflejo tienen los mismos átomos, pero una huele a hierbabuena y otra a alcaravea. | La carvona dibujada junto a un espejo; su reflejo idéntico aparece del otro lado. Bajo una, hojas de hierbabuena; bajo la otra, semillas de alcaravea. Chip: "carvona: mismos átomos, en espejo". |
| 2 | Catalogo | La entrenaron con unas cinco mil moléculas de catálogos de aromas, con etiquetas como cremoso o a ajo. | Cuadrícula de 50 cuadritos (1 cuadrito = 100 moléculas, como en la Fig. 1B del artículo) que se llena; etiquetas que vuelan: "cremoso", "a ajo", "a pasto". |
| 3 | Red | Ve cada molécula como una red de átomos y enlaces, y la ubica en un mapa. | **Por dentro de la máquina** (fondo oscuro de circuito): la molécula se vuelve grafo (puntos = átomos, líneas = enlaces), pasa por una `RedNeuronal` y sale como un punto que cae en un mapa 2D con zonas de color (floral, frutal, a carne, a pescado…). |
| 4 | Pregunta | ¿Pero describe mejor que una persona? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Estudio | En 2023, Google y el Centro Monell de Filadelfia publicaron la prueba: quince personas entrenadas describieron cuatrocientas moléculas nuevas con cincuenta y cinco palabras. | `TarjetaEstudio`: "2023 · Science · Lee, Mayhew… Mainland, Wiltschko · Google Research + Monell Chemical Senses Center (Filadelfia)". 15 personitas con frascos; contador "400 moléculas nuevas"; ficha con 55 palabritas. |
| 6 | Resultado | En cincuenta y tres de cada cien, la IA se acercó más al promedio que el catador típico. | Cuadrícula de 100: se pintan 53 del color de la IA. `NumeroGigante` "53 %". Chip: "más cerca del promedio del panel que el panelista mediano". |
| 7 | Almizcle | Donde más falló: el almizcle, un olor que dan al menos cinco familias de moléculas. | Etiqueta "almizcle" con una ❌ suave; cinco moléculas muy distintas convergen en una sola nube "almizcle". |
| 8 | Mapa | Y ubicó en su mapa medio millón de moléculas de olor desconocido: olerlas le tomaría a una persona setenta años sin parar. | El mapa de olores se llena de miles de puntitos de colores (estilo Fig. 5A); contador hasta "≈ 500 000". Reloj/calendario que corre hasta "70 años oliendo sin parar". |
| 9 | Cierre | Ese olor que sientes, una IA ya lo lee en un dibujo… sin olerlo nunca. | **Regreso a la imagen del inicio**: la nariz y el Robotito con pinza, ahora junto a la molécula aparece su punto en el mapa lleno; la nube de olor de la nariz y la del robot coinciden. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y suave, con un brillo aireado (como inhalar). Efectos: inhalación en el cuadro 0, "ding" de cristal en el espejo, tecleo suave al llenarse la cuadrícula, pulsos electrónicos en la red, un "pop" por cada punto que cae en el mapa (en el llenado masivo, una lluvia de pops cada vez más densa), tic-tac del reloj de 70 años, golpe suave en el 53 %.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Pero describe mejor que una persona?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «Esta IA nunca ha olido nada» (cuadro 0) |
| 2 | 9.4 | 12.6 | 04_bajando_lentes | `arriba-der` | «una huele a hierbabuena y otra a alcaravea» |
| 3 | 19.1 | 23.2 | 13_senalando_arriba | `izq-alto` | señala la molécula que se vuelve red de átomos y enlaces |
| 4 | 23.4 | 26.6 | 07_pensativo_puno | `grande` | «¿Pero describe mejor que una persona?» |
| 5 | 30.6 | 35.9 | 06_pensativo_menton | `arriba-der` | «quince personas entrenadas… cuatrocientas moléculas» |
| 6 | 37.2 | 41.3 | 11_sorprendido | `arriba-der` | «cincuenta y tres de cada cien» |
| 7 | 41.7 | 46.4 | 10_serio_molesto | `izq-alto` | «Donde más falló: el almizcle» |
| 8 | 49.5 | 53.7 | 11_sorprendido | `arriba-der` | «setenta años sin parar» |
| 9 | 54.1 | 58.0 | 05_sonriendo_dientes_uniformes | `arriba-der` | «una IA ya lo lee en un dibujo… sin olerlo nunca» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 38.5 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (cifras abiertas en el original el 29 oct 2026)

1. Lee, B. K., Mayhew, E. J., Sanchez-Lengeling, B., Wei, J. N., Qian, W. W., Little, K. A., … Gerkin, R. C., Mainland, J. D. y Wiltschko, A. B. "A principal odor map unifies diverse tasks in olfactory perception". *Science* 381(6661): 999–1006 (31 ago / 1 sep 2023). DOI 10.1126/science.ade4401 · PMID 37651511 · manuscrito aceptado en PMC11898014 (texto completo abierto en pmc.ncbi.nlm.nih.gov). Afiliaciones: Google Research, Brain Team (Cambridge, MA); Monell Chemical Senses Center (Filadelfia, PA); Osmo; Univ. de Reading; Michigan State; Arizona State; Univ. de Pensilvania.
   > "We used graph neural networks to generate a Principal Odor Map (POM) that preserves perceptual relationships and enables odor quality prediction for novel odorants. The model was as reliable as a human in describing odor quality: on a prospective validation set of 400 novel odorants, the model-generated odor profile more closely matched the trained panel mean (n=15) than did the median panelist." (resumen, 2023)
   > "Each molecule was represented as a graph, with each atom described by its valence, degree, hydrogen count, hybridization, formal charge, and atomic number. Each bond was described by…" (2023)
   > "The GNN was trained on a curated dataset of ~5000 semantically labeled molecules drawn from GoodScents and Leffingwell flavor and fragrance databases; one square represents 100 molecules" (Fig. 1B, 2023)
   > Etiquetas de olor del artículo: "(e.g. creamy, grassy)"; "common food smells like nutty, garlic, and cheesy" (2023)
   > "Our prospective validation set consists of 55-odor label RATA data for 400 novel, intensity-balanced odorants generated by our cohort of ≥15 panelists (2 replicates)." (2023)
   > "the model output comes closer to the panel mean than does the median panelist for 53% of molecules … Notably, panelists were able to smell each odorant as they rated it, while the model's predictions were based solely on nominal molecular structure." (2023)
   > "worst for the label musk, which includes at least 5 distinct structural classes (macrocyclic, polycyclic, nitro, steroid-type, and straight-chain)"; "the model was within the distribution of human raters for all labels except musk" (2023)
   > "We compiled a list of ~500,000 potential odorants whose empirical properties are currently unknown to science or industry; most have never been synthesized before. … These molecules would take approximately 70 person-years of continuous smelling time to collect using our trained human panel." (2023)
   > "In vision, wavelength maps to color" · "the relationship between odor percept and odorant structure is riddled with discontinuities, exemplified by Sell's triplets … trios of molecules in which the structurally similar pair is not the perceptually similar pair" (2023)
   > Conflicto de interés: "The original work and funding for this manuscript was provided by Google Research. … During the review process, ABW, RCG and WWQ joined Osmo Labs, PBC, a new venture that is commercializing some of the technologies described in this manuscript." (2023)
2. Friedman, L. y Miller, J. G. "Odor incongruity and chirality". *Science* 172(3987): 1044–1046 (1971). DOI 10.1126/science.172.3987.1044 · PMID 5573954.
   > "The enantiomers R-(-)- and S-(+)-carvone are the organoleptic constituents in oil of spearmint and caraway, respectively. Their odor distinctiveness has been unambiguously demonstrated by chemical interconversion, independent synthesis, and resolution." (1971)

## Notas
- "El catador típico" = el **panelista mediano** (median panelist) del artículo. "Más cerca del promedio" = más cerca del promedio del panel (panel mean), que es la referencia del estudio. El 53 % es "de las moléculas" evaluadas (de las 400 caracterizadas, 77 se descartaron por baja intensidad, contaminación, etc.; el dato se calculó sobre las restantes).
- "Quince personas entrenadas": el resumen dice "trained panel mean (n=15)"; el texto dice "cohort of ≥15 panelists".
- "Describieron … con cincuenta y cinco palabras" = calificaron cada molécula con 55 etiquetas de olor (RATA).
- "Medio millón" = "~500,000 potential odorants" (moléculas candidatas; casi ninguna se ha sintetizado: por eso "de olor desconocido"). "Setenta años sin parar" = "approximately 70 person-years of continuous smelling time".
- "En 2023 … publicaron la prueba" (redacción alternativa que propuso el verificador, para no pasar de 61.9 s): el artículo salió en *Science* el 31 ago / 1 sep 2023 (la prueba con el panel se hizo antes).
- Conflicto de interés (va en la descripción): financiado por Google Research; tres autores (ABW, RCG, WWQ) **se unieron** a Osmo durante la revisión (no la fundaron).
- "Su reflejo" = enantiómeros de la carvona (mismos átomos y enlaces, imagen en espejo). Hierbabuena = *Mentha spicata* (spearmint); alcaravea = *Carum carvi* (caraway). Dato de 1971, se cita como hecho químico establecido (no es una cifra).
- "Catálogos de aromas" = bases de datos GoodScents y Leffingwell de sabores y fragancias. "Google y el Centro Monell" resume a los dos grupos principales (hubo más instituciones).
- El estudio es de 2023 y así se dice. El dibujo es esquemático; las zonas y colores del mapa son ilustrativos (en la Fig. 5A los colores salen de las coordenadas del mapa).
