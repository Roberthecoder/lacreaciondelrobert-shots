# Shot IA #56 · La IA que "descubrió" 2.2 millones de cristales

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #56 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (2 ⚠️ corregidos), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~954 créditos).
- **Formato:** N2 "El número" (2 200 000 en grande que se desinfla) + N4 "La imagen que se llena" (cuadrícula de cristales que se marcan como "ya conocido").
- **Gancho (de los 7):** #4 "Un número que contradice": 2.2 millones de cristales nuevos… y los 10 estables revisados al azar tenían la forma (estructura) de cristales conocidos.
- **Duración:** voz 954 caracteres / 157 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** equilibrio. Lo que sí logró (método rápido, 736 estructuras ya hechas por otros, un robot que sí sintetizó 36 de 57) y la crítica (poca novedad, desorden atómico ignorado, compuestos radiactivos, corrección de 2026). Ni "la IA inventó 2 millones de materiales" ni "todo fue humo".

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Una IA de Google propuso dos millones doscientos mil cristales nuevos. Unos químicos revisaron diez de los estables, al azar… y los diez tenían la forma de cristales ya conocidos. | Fondo cian; desde el cuadro 0 un contador que sube a "2,200,000 cristales «nuevos»" y una lluvia de cristalitos (cubos facetados). Una caja "estables" encierra una parte; una lupa la recorre y salen 10 al azar; a cada uno le sale un gemelo gris punteado con "≈" y el chip "estructura conocida ≈". |
| 1 | Cristales | De cristales así son los chips de tu celular y su batería. | Un celular abierto "por dentro": chip y batería, con una rejilla de átomos dentro. |
| 2 | Gnome | GNoME, de Google DeepMind, calculó en 2023 que unos trescientos ochenta mil serían estables. | Red neuronal (`RedNeuronal`) que escupe cristales; chip "GNoME · Google DeepMind · Nature 2023"; número "≈ 381 000 estables". |
| 3 | Robot | Un laboratorio robot en Berkeley anunció cuarenta y uno nuevos de cincuenta y ocho, en diecisiete días. | Brazo robot moviendo crisoles a un horno; marcador "41 / 58" y calendario "17 días". Tarjeta "A-Lab · Berkeley · Nature 2023". |
| 4 | Pregunta | ¿Entonces sí descubrieron materiales? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Critica | En 2024, químicos de Santa Bárbara hallaron muchas variaciones de cristales conocidos, y más de dieciocho mil con elementos radiactivos raros. | Tarjeta "2024 · UC Santa Bárbara · Cheetham y Seshadri · Chem. Mater."; cristales "nuevos" junto a su gemelo conocido; luego una pila con el trébol de radiactividad y "18 000+ (Pm, Ac, Pa)". |
| 6 | Revueltos | La computadora fijaba cada átomo; en la vida real, muchos se revuelven. | Fondo oscuro "por dentro": rejilla de átomos de dos colores ordenados como tablero de ajedrez → se mezclan al azar (desorden). |
| 7 | Correccion | En 2026, Berkeley corrigió: hizo treinta y seis de cincuenta y siete, nuevos para su base de datos, no necesariamente para la ciencia. | El marcador "41 / 58" se tacha y cambia a "36 / 57"; sello "CORRECCIÓN · Nature · enero 2026"; la palabra "novel" del título se tacha y entra "inorganic"; chips "nuevos para su base de datos ✔" y "¿para la ciencia? no necesariamente". |
| 8 | Balance | Pero los críticos dicen que el método promete. | Balanza que oscila: "el método promete" contra "falta química". |
| 9 | Cierre | Dos millones de cristales no son dos millones de materiales: falta que un químico los revise. | **Regreso a la imagen del inicio**: el mismo contador "2,200,000" y la lluvia de cristales; una química con bata y lupa los revisa uno por uno (✓ / ?); chip "≠ 2.2 millones de materiales". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; el contador sube con un tic acelerado, cada cristal cae con un "clink", la lupa hace un zumbido, el robot suena a servo, la rejilla que se revuelve cruje, el marcador que se corrige se tacha con un rasguño.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Entonces sí descubrieron materiales?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.0 | 11_sorprendido | `gancho` | «dos millones doscientos mil cristales nuevos» (cuadro 0) |
| 2 | 11.2 | 14.3 | 13_senalando_arriba | `arriba-der` | señala el chip y la batería del celular |
| 3 | 17.4 | 19.9 | 06_pensativo_menton | `izq-alto` | «unos trescientos ochenta mil serían estables» |
| 4 | 26.3 | 29.1 | 07_pensativo_puno | `grande` | «¿Entonces sí descubrieron materiales?» |
| 5 | 31.7 | 34.1 | 10_serio_molesto | `arriba-der` | «muchas variaciones de cristales conocidos» |
| 6 | 37.7 | 41.4 | 04_bajando_lentes | `izq-alto` | «en la vida real, muchos se revuelven» |
| 7 | 45.9 | 49.4 | 11_sorprendido | `arriba-der` | «no necesariamente para la ciencia» |
| 8 | 49.8 | 52.4 | 05_sonriendo_dientes_uniformes | `izq-alto` | «el método promete» |
| 9 | 53.0 | 58.0 | 13_senalando_arriba | `arriba-der` | «falta que un químico los revise» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 29.4 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Merchant, A., Batzner, S., Schoenholz, S. S., Aykol, M., Cheon, G. y Cubuk, E. D. "Scaling deep learning for materials discovery". *Nature* 624: 80–85 (publicado en línea el 29 nov 2023). DOI 10.1038/s41586-023-06735-9 · PMC10700131 (texto completo en Europe PMC). Google DeepMind. Dato de 2023.
   > "improved efficiency enables the discovery of 2.2 million structures below the current convex hull, many of which escaped previous human chemical intuition."
   > "Of these, 381,000 entries live on the updated convex hull as newly discovered materials."
   > "the updated convex hull consists of 381,000 new entries for a total of 421,000 stable crystals, representing an-order-of-magnitude expansion from all previous discoveries."
   > "Of the stable structures, 736 have already been independently experimentally realized."
   > "From microchips to batteries and photovoltaics, discovery of inorganic crystals has been bottlenecked by expensive trial-and-error approaches."
2. Szymanski, N. J., Rendy, B., Fei, Y., Kumar, R. E., …, Zeng, Y. y Ceder, G. "An autonomous laboratory for the accelerated synthesis of novel materials" (título original). *Nature* 624: 86–91 (29 nov 2023). DOI 10.1038/s41586-023-06734-w · PMC10700133. UC Berkeley y Lawrence Berkeley National Laboratory. Dato de 2023.
   > Resumen original (Europe PMC): "Over 17 days of continuous operation, the A-Lab realized 41 novel compounds from a set of 58 targets including a variety of oxides and phosphates that were identified using large-scale ab initio phase-stability data from the Materials Project and Google DeepMind."
3. Szymanski, N. J. *et al.* "Author Correction: An autonomous laboratory for the accelerated synthesis of inorganic materials". *Nature* 650: E1 (19 ene 2026). DOI 10.1038/s41586-025-09992-y · PMC12872444. Dato de 2026.
   > "We acknowledge that the original claims of material novelty were subject to misinterpretation—their intention was to indicate that the materials were new to the prediction platform, not necessarily new to science."
   > "we have manually re-analyzed the diffraction patterns and have confirmed that the prediction platform came to the correct conclusion in 36 of its 40 reported successes, with 4 compounds being inconclusive."
   > "We have also removed one compound from the discussion (Zn2Cr3FeO8) that was mistakenly included in the training data."
   > Texto corregido del artículo: "Over 17 days of continuous operation, the A-Lab realized 36 compounds from a set of 57 targets…" · "the A-Lab synthesized 36 of the 57 target compounds over 17 days of continuous experimentation, representing a 63% success rate."
   > (El título cambió de "…of novel materials" a "…of inorganic materials".)
4. Cheetham, A. K. y Seshadri, R. "Artificial Intelligence Driving Materials Discovery? Perspective on the Article: Scaling Deep Learning for Materials Discovery". *Chemistry of Materials* 36(8): 3490–3495 (8 abr 2024). DOI 10.1021/acs.chemmater.4c00643 · PMC11044265. UC Santa Barbara. Dato de 2024.
   > "We examine the claims of this work here, unfortunately finding scant evidence for compounds that fulfill the trifecta of novelty, credibility, and utility."
   > "we have also carried out a random examination of some of the entries in the Stable Structure database, selecting 10 compounds from among the 384,870 database entries."
   > "(i) We were able to identify the structure of every one of the 10 Stable Structure entries in the ICSD database, albeit usually with a space group of higher symmetry than that in the AI database."
   > "In fact, there are 18,138 compounds of such radioactive elements in the large Stable Structure database, including those of Pm, Ac, and Pa."
   > "the inclusion of compounds of Pm, Ac, and Pa (more than 18,000 in all), which are only available in minute quantities and in the rarest of circumstances."
   > "many of the entries are based upon the ordering of metal ions that are unlikely to be ordered in the real world."
   > "the DFT modeling is performed at effectively 0 K, and on small unit cells, ignoring the effects of configurational entropy, resulting in the predicted structures being fully ordered."
   > "we have yet to find any strikingly novel compounds in the GNoME and Stable Structure listings, although we anticipate that there must be some among the 384,870 compositions. We also note that, while many of the new compositions are trivial adaptations of known materials…"
   > "While the methods adopted in this work appear to hold promise, there is clearly a great need to incorporate domain expertise in materials synthesis and crystallography."
   > "an exciting advance."
5. (Contexto, no se cita en la voz) Leeman, J., Liu, Y., Stiles, J., Lee, S. B., Bhatt, P., Schoop, L. M. y Palgrave, R. G. "Challenges in High-Throughput Inorganic Materials Prediction and Autonomous Synthesis". *PRX Energy* 3: 011002 (7 mar 2024). DOI 10.1103/PRXEnergy.3.011002 (resumen vía Crossref). Princeton y University College London.
   > "We find that two thirds of the claimed successful materials in Szymanski are likely to be known compositionally disordered versions of the predicted ordered compounds."
   > "These errors unfortunately lead to the conclusion that no new materials have been discovered in that work."
   > "elements can share crystallographic sites, resulting in higher-symmetry space groups and—very often—known alloys or solid solutions."

## Notas
- "Dos millones doscientos mil" = estructuras "below the current convex hull" (estables respecto a lo conocido antes); "unos trescientos ochenta mil" = 381 000 que quedan en el casco convexo actualizado (DeepMind los redondeó a 380 000 en su difusión). "Serían estables" porque es un cálculo, no una síntesis.
- "Unos químicos revisaron diez de los estables, al azar… y los diez tenían la forma de cristales ya conocidos" = Cheetham y Seshadri eligieron 10 al azar de las 384 870 entradas de la base de estructuras estables (no de los 2.2 millones) y encontraron la estructura de los 10 en la ICSD (base de datos de estructuras conocidas), casi siempre con más simetría. No dicen que el compuesto exacto ya existiera: por eso "la forma" y, en pantalla, "estructura conocida ≈" (corrección del verificador).
- "Más de dieciocho mil con elementos radiactivos raros" = 18 138 compuestos de prometio, actinio y protactinio (solo existen en cantidades mínimas). Hay otros 23 529 con Tc, Np y Pu que no se cuentan.
- "Fijaba cada átomo en su lugar; en la vida real muchos se revuelven" = predicciones totalmente ordenadas (cálculo a 0 K) frente al desorden real de iones a temperatura de síntesis (Cheetham y Seshadri; también Leeman et al.).
- "Berkeley corrigió" = Author Correction en *Nature*, enero 2026: 36 de 57 (se quitó un compuesto que estaba en los datos de entrenamiento y 4 quedaron inconclusos); "nuevos para su base de datos, no necesariamente para la ciencia" traduce "new to the prediction platform, not necessarily new to science" (corrección del verificador: no "para el robot").
- "Pero los críticos dicen que el método promete" = Cheetham y Seshadri: "appear to hold promise", "an exciting advance".
- "Los chips de tu celular y su batería" se apoya en el resumen de GNoME ("From microchips to batteries…"): el silicio de los chips y los materiales de los electrodos de las baterías son sólidos cristalinos.
- No se dice que ninguno de los 2.2 millones sea nuevo ni que todos sean falsos. Las 736 estructuras ya hechas por otros laboratorios quedan como dato de respaldo para `publicacion.md` (no caben en la voz).
- El dibujo es esquemático.
