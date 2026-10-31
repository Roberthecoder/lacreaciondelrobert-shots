# Verificación de hechos · Shot IA #56 · La IA que "descubrió" 2.2 millones de cristales

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuentes abiertas: texto completo en Europe PMC de PMC10700131 (Merchant et al. 2023), PMC10700133 (Szymanski et al., versión corregida), PMC12872444 (Author Correction 2026), PMC11044265 (Cheetham y Seshadri 2024); resumen de Leeman et al. 2024 (Crossref); blog de Google DeepMind (29 nov 2023); registros OSTI/eScholarship del título original de Szymanski et al.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Una IA de Google propuso 2.2 millones de cristales nuevos (pantalla: contador "2 200 000 cristales") | ✅ | Merchant et al., *Nature* 624:80–85, PMC10700131 | "GNoME models have discovered more than 2.2 million structures stable with respect to previous work" | 2023 |
| 2 | Unos químicos revisaron diez al azar… y los diez se parecían a cristales ya conocidos (pantalla: lupa toma 10 de la lluvia de 2.2 M; etiqueta "ya conocido ≈") | ⚠️ | Cheetham y Seshadri, *Chem. Mater.* 36:3490, PMC11044265 | "selecting 10 compounds from among the 384,870 database entries" · "We were able to identify the structure of every one of the 10 Stable Structure entries in the ICSD database, albeit usually with a space group of higher symmetry than that in the AI database." | 2024 |
| 3 | De cristales así están hechos los chips de tu celular y su batería | ✅ | Merchant et al., resumen | "From microchips to batteries and photovoltaics, discovery of inorganic crystals has been bottlenecked by expensive trial-and-error approaches." | 2023 |
| 4 | GNoME es de Google DeepMind (chip "GNoME · Google DeepMind · Nature 2023") | ✅ | Merchant et al., afiliaciones; blog DeepMind | Autores de "Google DeepMind, Mountain View, CA"; publicado en *Nature* el 29 nov 2023 | 2023 |
| 5 | Calculó en 2023 que unos 380 000 serían estables (pantalla "≈ 381 000 estables") | ✅ | Merchant et al.; blog DeepMind | "the updated convex hull consists of 381,000 new entries for a total of 421,000 stable crystals" · blog: "Of its 2.2 million predictions, 380,000 are the most stable" | 2023 |
| 6 | Un laboratorio robot en Berkeley anunció 41 nuevos de 58 en 17 días (pantalla "41 / 58", "17 días", "A-Lab · Berkeley · Nature 2023") | ✅ | Szymanski et al., *Nature* 624:86–91 (versión original, título "…of novel materials"; OSTI 2281696 / eScholarship) | "Over 17 days of continuous operation, the A-Lab realized 41 novel compounds from a set of 58 targets" (UC Berkeley y LBNL) | 2023 |
| 7 | En 2024, químicos de Santa Bárbara hallaron muchas variaciones de cristales conocidos (tarjeta "2024 · UC Santa Bárbara · Cheetham y Seshadri · Chem. Mater.") | ✅ | Cheetham y Seshadri, PMC11044265 (publicado 8 abr 2024; afiliación UC Santa Barbara, Materials Department) | "many of the new compositions are trivial adaptations of known materials" | 2024 |
| 8 | Más de 18 000 con elementos radiactivos raros (pantalla "18 000+ (Pm, Ac, Pa)") | ✅ | Cheetham y Seshadri | "there are 18,138 compounds of such radioactive elements in the large Stable Structure database, including those of Pm, Ac, and Pa" · "which are only available in minute quantities and in the rarest of circumstances" | 2024 |
| 9 | La computadora fijaba cada átomo en su lugar; en la vida real muchos se revuelven (pantalla: tablero ordenado → desorden) | ✅ (simplificación aceptable) | Cheetham y Seshadri; Leeman et al., *PRX Energy* 3:011002 | "many of the entries are based upon the ordering of metal ions that are unlikely to be ordered in the real world" · Leeman: "in reality, elements can share crystallographic sites" | 2024 |
| 10 | En 2026 Berkeley corrigió: hizo 36 de 57 (pantalla "41/58" → "36/57", "corrección · Nature 2026") | ✅ | Author Correction, *Nature* 650:E1, 19 ene 2026, PMC12872444; texto corregido en PMC10700133 | "confirmed that the prediction platform came to the correct conclusion in 36 of its 40 reported successes" · versión corregida: "the A-Lab realized 36 compounds from a set of 57 targets" · "representing a 63% success rate" | 2026 |
| 11 | …nuevos para el robot, no necesariamente para la ciencia | ⚠️ | Author Correction 2026 | "their intention was to indicate that the materials were new to the prediction platform, not necessarily new to science" — dice "plataforma de predicción" (la base de datos/cálculos), no "el robot" | 2026 |
| 12 | Pantalla: se tacha "novel" del título | ✅ | OSTI/eScholarship (título original) vs. Crossref/PMC (título actual) | Original: "An autonomous laboratory for the accelerated synthesis of novel materials" → actual: "…of inorganic materials" | 2023 → 2026 |
| 13 | Pero los críticos dicen que el método promete | ✅ | Cheetham y Seshadri, resumen | "While the methods adopted in this work appear to hold promise, there is clearly a great need to incorporate domain expertise" · "an exciting advance" | 2024 |
| 14 | Dos millones de cristales no son dos millones de materiales: falta que un químico los revise (pantalla: balanza "rápido y prometedor" vs "falta revisión química") | ✅ (conclusión/opinión respaldada) | Cheetham y Seshadri | "there is clearly a great need to incorporate domain expertise in materials synthesis and crystallography" | 2024 |

Contexto que no contradice al guion: Leeman et al. (7 mar 2024) concluyen "no new materials have been discovered in that work" sobre el A-Lab; Merchant et al.: "736 have already been independently experimentally realized" (los 2.2 M no son todos humo). 381 000 (convex hull actualizado), 380 000 (blog) y 384 870 (entradas de la base Stable Structure revisada por Cheetham y Seshadri) son conteos distintos; el guion usa bien cada uno.

## Correcciones necesarias

1. **#2 (gancho) ⚠️ — de dónde salieron los 10 y qué era "conocido".** Cheetham y Seshadri tomaron los 10 al azar de las 384 870 entradas de la base de estructuras estables, no de los 2.2 millones, y lo que encontraron en la base de datos de cristales conocidos (ICSD) fue **la estructura** (el acomodo de los átomos), casi siempre con más simetría y a veces de un compuesto con otra fórmula. No dicen que el compuesto mismo ya existiera. "Se parecían" ayuda, pero "cristales ya conocidos" más la imagen de la lupa sacándolos de la lluvia de 2.2 M sugieren que el compuesto ya se conocía y que la muestra salió de los 2.2 M.
   - Texto propuesto: *"Una IA de Google propuso dos millones doscientos mil cristales nuevos. Unos químicos revisaron diez de los estables, al azar… y los diez tenían la forma de cristales ya conocidos."*
   - En pantalla: la lupa toma los 10 del grupo "estables" (o sin decir de qué grupo), y la etiqueta debe ser "estructura conocida ≈" en vez de "ya conocido ≈".
2. **#11 ⚠️ — "nuevos para el robot".** La corrección dice "new to the prediction platform", es decir la plataforma de predicción (la base de datos con los cálculos), no el robot.
   - Texto propuesto: *"…hizo treinta y seis de cincuenta y siete, nuevos para su base de datos, no necesariamente para la ciencia."* (o "nuevos para la computadora").

Nota menor (no cambia el veredicto): en #8 los 18 138 compuestos son de la base de 384 870 estructuras estables, no de los 2.2 M; la voz no dice de cuál grupo, así que no es falso.

## Re-verificación (29 oct 2026, coordinador)
- «Unos químicos revisaron diez de los estables, al azar… y los diez tenían la forma de cristales ya conocidos.» (Cheetham y Seshadri 2024: 10 de las 384,870 entradas estables; estructura en el ICSD); chip «estructura conocida ≈» ✅
- «…nuevos para su base de datos, no necesariamente para la ciencia.» (corrección de 2026: "new to the prediction platform") ✅
- Recortes de las líneas 2, 3 y 7 sin datos nuevos ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
