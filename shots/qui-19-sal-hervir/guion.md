# Shot Químico #19 · La sal no hace que tu agua hierva antes (5 centésimas de grado)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #19 · rama `pedido300/qui`.
- **Formato:** N2 "El número" (número gigante desde el cuadro 0: **+0.05 °C**; mito tachado "la sal hace que hierva más rápido") + N1 "Por dentro" (la olla → las moléculas de agua escapando como vapor y los iones de sodio y cloro → la misma olla).
- **Gancho (de los 7):** #4 "Un número que contradice": "Esa cucharadita de sal no hace que tu agua hierva antes: en una olla de 2 litros, le sube el hervor unas 5 centésimas de grado. Solo eso."
- **Seguridad:** se avisa que echar sal (o cualquier granito) al agua muy caliente puede hacerla saltar de golpe: "échala con cuidado".
- **Duración:** voz 960 caracteres / ~165 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados (`node motor/kit/estimar-escenas.mjs shots/qui-19-sal-hervir --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`hervir.jsx`), voz pendiente de aprobación de Robert (~960 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa cucharadita de sal no hace que tu agua hierva antes: en una olla de 2 litros, le sube el hervor unas 5 centésimas de grado. Solo eso. | Fondo amarillo de cocina. Cuadro 0: una cucharadita se voltea sobre una olla de agua en la estufa y caen granitos blancos (movimiento antes del segundo 1). Un termómetro de cocina en la olla: el número gigante **+0.05 °C** cae del cielo, con una etiqueta chica "≈ · 6 g en 2 L". Chip "hierve más rápido" se tacha con una X roja. |
| 1 | Que | El agua hierve cuando su vapor empuja tan fuerte como el aire que tiene encima. | Cámara baja a la superficie del agua (fundido a corte transversal): moléculas de agua (H₂O, bolitas roja y blancas) saltan hacia arriba como vapor; desde arriba bajan flechas grises "aire"; una balanza: "empuje del vapor = empuje del aire" se nivela. |
| 2 | Iones | La sal se parte en iones de sodio y cloruro, y con ellos el agua suelta vapor con menos fuerza. | Fondo noche (escena micro). Un cubito de sal (red de Na⁺ sodio morados y Cl⁻ cloruro verdes) se desarma; cada ion queda rodeado de moléculas de agua. Menos moléculas llegan a saltar: la flecha "vapor" se encoge un poco y la balanza se inclina hacia "aire". Barra de escala "1 nm". |
| 3 | Cuenta | Entonces hay que calentarla más: medio grado por cada mol de partículas en un kilo de agua. | Tarjeta de fórmula: **ΔT = i · K_b · m**, con K_b = 0.512 °C·kg/mol resaltado ("medio grado"). Un kilo de agua (bloque) + 1 mol de partículas (montoncito de iones) → termómetro sube 0.5 °C. |
| 4 | Olla | Una cucharadita son unos 6 gramos de sal: unas 5 centésimas de grado. | Regresa la olla (macro). La cucharadita con "≈ 6 g" y la olla con "2 L". El termómetro gigante pasa de **100.00** a **100.05 °C** con un tic. Medidor horizontal de 0 a 1 °C: la rayita apenas se mueve. |
| 5 | Pregunta | ¿Y por qué burbujea cuando la echas? | **Re-gancho.** Repetición del puño de sal cayendo: "¡fsssh!" de burbujas. "?" gigante. |
| 6 | Burbujas | Porque los granitos de sal son puntos donde el vapor forma burbujas fácil. Si el agua está muy caliente, échala con cuidado: puede saltar. | Zoom a un granito de sal hundiéndose: en sus esquinas y grietas nacen burbujas de vapor que suben (etiqueta "nucleación"). A un lado, una piedra de ebullición de laboratorio haciendo lo mismo ("igual que esto"). Luego un chip de advertencia ⚠️ "puede saltar": gotas que brincan fuera de la olla. |
| 7 | Estudio | En 1974, en Japón, químicos lo midieron con un ebullómetro doble: con casi 1 por ciento de sal, el agua hirvió solo 15 centésimas de grado más. | Tarjeta "1974 · Hakuta, Goto e Ishizaka · Japón". Dibujo esquemático del ebullómetro doble: dos celdas de vidrio lado a lado, "agua" y "agua + sal", cada una con su termómetro. Chip "0.96 % de sal en peso" y número grande **+0.151 °C**. |
| 8 | Altura | Lo que sí cambia el hervor es la altura: en la Ciudad de México el agua hierve a unos 92 grados. | Fondo cian. Montaña/silueta del Valle de México con "2 240 m" y una olla arriba; columna de aire más corta encima. Termómetro: **≈ 92 °C**, junto a una olla al nivel del mar con **100 °C**. Contraste: 0.05 °C (sal) contra ~8 °C (altura). |
| 9 | Cierre | Esa cucharadita no apura tu olla: la sal es para el sabor, no para la prisa. | **Regreso a la olla del inicio**, ahora hirviendo, con el mismo termómetro "+0.05 °C" y el chip tachado; la cucharadita junto a una pasta servida con etiqueta "sabor ✓". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave continua, debajo de la voz. Efectos en el mismo cuadro: granitos cayendo (lluvia fina), "tic" del termómetro, burbujeo suave del agua, "pop" de moléculas que escapan, "fsssh" de la sal en el agua caliente, golpe suave de la tarjeta del estudio, viento en la montaña.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y por qué burbujea cuando la echas?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «le sube el hervor unas 5 centésimas de grado» |
| 2 | 8.9 | 12.6 | 13_senalando_arriba | `arriba-der` | «su vapor empuja tan fuerte como el aire» |
| 3 | 14.1 | 18.3 | 06_pensativo_menton | `arriba-der` | «iones de sodio y cloruro… menos fuerza» |
| 4 | 19.6 | 23.8 | 04_bajando_lentes | `izq-alto` | «medio grado por cada mol» |
| 5 | 24.6 | 28.2 | 05_sonriendo_dientes_uniformes | `arriba-der` | «apenas 5 centésimas de grado» |
| 6 | 28.5 | 31.8 | 07_pensativo_puno | `grande` | «¿Y por qué burbujea cuando la echas?» |
| 7 | 35.8 | 38.7 | 10_serio_molesto | `izq-alto` | «échala con cuidado: puede saltar» |
| 8 | 43.4 | 47.2 | 11_sorprendido | `arriba-der` | «solo 15 centésimas de grado más» |
| 9 | 48.3 | 53.0 | 13_senalando_arriba | `izq-alto` | «la altura… unos 92 grados» |
| 10 | 53.6 | 57.9 | 02_apuntando_camara | `arriba-der` | «la sal es para el sabor» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 39.8 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato y cifra se abrió en la fuente original el 29 oct 2026)

1. **El agua hierve cuando su presión de vapor iguala a la del aire; un soluto no volátil baja la presión de vapor y sube el punto de ebullición; K_b del agua = 0.512 °C·kg/mol; NaCl da 2 iones (i ≈ 1.9 medido)** — Flowers P., Theopold K., Langley R., Robinson W.R. *Chemistry 2e*, OpenStax (Rice University), 2019, sección 11.4 "Colligative Properties". https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties
   > "the boiling point of a liquid is the temperature at which its vapor pressure is equal to ambient atmospheric pressure" · "Dissolving a nonvolatile substance in a volatile liquid results in a lowering of the liquid's vapor pressure." · "a solution will require a higher temperature than will pure solvent to achieve any given vapor pressure" · Tabla 11.2: "water | 100.0 | 0.512 | 0.0 | 1.86" (K_b en °C m⁻¹) · "a 1.0 m aqueous solution of NaCl contains 2.0 mole of ions (1.0 mol Na+ and 1.0 mol Cl−) per each kilogram of water" · "the value of i for NaCl is 1.9, as opposed to an ideal value of 2."
2. **Una cucharadita de sal ≈ 2 300 mg de sodio; la sal de mesa es cloruro de sodio** — U.S. Food and Drug Administration, "Sodium in Your Diet" (página vigente, consultada 2026). https://www.fda.gov/food/nutrition-education-resources-materials/sodium-your-diet
   > "2,300 milligrams (mg) per day … that's equal to about 1 teaspoon of table salt!" · "Table salt (also known by its chemical name, sodium chloride)"
   - **Cálculo propio (para la voz "unos 6 gramos" y "5 centésimas"):** 2.3 g de Na × (58.44 / 22.99) = **5.85 g de NaCl** ≈ 0.100 mol → ≈ 0.19–0.20 mol de iones (i = 1.9–2) en 2 L ≈ 2 kg de agua → m ≈ 0.095–0.100 mol/kg → ΔT = 0.512 × 0.095–0.100 ≈ **0.049–0.051 °C ≈ 5 centésimas**. Comprobación con los datos medidos de la fuente 4: 5.85 g en 2 005.85 g = 0.29 % en peso; 0.29 × (0.151 / 0.956) ≈ 0.046 °C. Ambos dan ~5 centésimas.
3. **Los granitos de sal son puntos de nucleación donde el vapor forma burbujas fácilmente** — The Naked Scientists (Universidad de Cambridge), "Why does adding salt make water boil more vigorously?", programa del 6 abr 2008 (Edinburgh Science Festival). https://www.thenakedscientists.com/articles/questions/why-does-adding-salt-make-water-boil-more-vigorously
   > "the salt crystals (you can put sugar in it and do the same thing) act as what are called nucleation points." · "They make it much more easy for bubbles of the vapour" · "they make it much more energetically favourable for a bubble to pop into existence."
   - **Mismo mecanismo, fuentes de química (piedras de ebullición) y riesgo de que salte:** Nichols L. *Organic Chemistry Laboratory Techniques*, LibreTexts, 1.4B "Controlled Boiling". https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_Lab_Techniques_(Nichols)/01%3A_General_Techniques/1.04%3A_Heating_and_Cooling_Methods/1.4B%3A_Controlled_Boiling
     > "can act as nucleation sites for formation of solvent bubbles" · "They should be added to a cool liquid, not one that is near its boiling point, or a vigorous eruption of bubbles may ensue." · "Bumping can splash hot material out of a flask"
   - Philipse A.P. "Heterogeneous Catalysis: On Bathroom Mirrors and Boiling Stones." *J Chem Educ* 88(1):59–62 (2011). DOI 10.1021/ed100364y.
     > "it also includes physical processes such as crystallization, freezing, boiling, and liquid condensation."
4. **El estudio: 1974, Japón, ebullómetro doble; NaCl al 0.956 % en peso → +0.151 °C** — Hakuta T., Goto T., Ishizaka S. (National Chemical Laboratory for Industry, Japón). "Boiling Point Elevation of Aqueous Solution Containing Inorganic Salt." *Bulletin of the Society of Sea Water Science, Japan* (日本海水学会誌) 28(3):151–155 (1974). DOI 10.11457/swsj1965.28.151. PDF: https://www.jstage.jst.go.jp/article/swsj1965/28/3/28_151/_pdf
   > "The boiling point elevation of various aqueous solutions containing sodium chloride, potassium chloride, sodium sulfate, sodium carbonate, calcium chloride and magnesium chloride were measured by using a twin-type ebulliometer in the weight per cent range of 1% to 15% under the atmospheric pressure, and very accurate data were obtained therefrom." · Tabla 1, NaCl, primera fila: "0.956 [wt. %] · 0.297 [Mol. %] · 0.151°C [B.P.E.]"
5. **En la Ciudad de México el agua hierve a menos de 100 °C por la altura (≈ 92 °C)**
   - SEP, libro de texto *Ciencias y Tecnología. Química*, 3.er grado de secundaria (Nueva Escuela Mexicana), sesión 8 "Temperatura de ebullición", pp. 79–80. https://nemdigitalstorage.blob.core.windows.net/nem-main/ts/libros/Tercero/Ciencias-y-Tecnologia_Quimica/pp79-80-057.pdf
     > "A menor presión, menor es la temperatura de ebullición, es por eso que en las ciudades con mayor altitud, como Toluca o Ciudad de México, el agua hierve a una temperatura menor a los 100 oC."
   - USDA Food Safety and Inspection Service, "High Altitude Cooking and Food Safety" (hoja informativa, 2011). https://www.govinfo.gov/content/pkg/GOVPUB-A110-PURL-gpo62705/pdf/GOVPUB-A110-PURL-gpo62705.pdf
     > "At sea level, water boils at 212 °F." · "With each 500-feet increase in elevation, the boiling point of water is lowered by just under 1 °F." · "At 7,500 feet, for example, water boils at about 198 °F."
   - Altitud de la CDMX: Castro T., Martínez A., Peralta O. "La Ciudad de México: una metrópoli de altura." *Revista de la Universidad de México* (UNAM), marzo 2025. https://www.revistadelauniversidad.mx/downloads/16d1f3c0-30fc-4183-b453-142f248921f5/rum-MAR.2025-dossier-la-ciudad-de-mexico-una-metropoli-de-altura.pdf
     > "la atmósfera en una ciudad que se encuentra a 2 240 metros de altura sobre el nivel del mar genera un clima más fresco"
   - **Cálculo de comprobación:** 2 240 m = 7 349 ft → regla del USDA: 212 − (7 349/500 × ~0.95) ≈ 198 °F ≈ **92.2 °C**. Con la atmósfera estándar de EUA 1976 (NOAA/NASA/USAF), P(2 240 m) = 101.325 × (1 − 2.25577×10⁻⁵ × 2 240)^5.25588 ≈ 77.2 kPa; en la tabla de saturación del agua de NIST Chemistry WebBook (https://webbook.nist.gov/chemistry/fluid/) "0.075000 MPa → 91.758 °C" y "0.077500 MPa → 92.633 °C" → ≈ **92.5 °C**. La voz dice "unos 92 grados" (depende del clima del día).

## Notas
- El dibujo es esquemático: moléculas, iones, la balanza de "empuje del vapor contra el aire" y el ebullómetro de 1974 son simplificaciones.
- "El agua suelta vapor con menos fuerza" = baja su presión de vapor (fuente 1); en la descripción se dice el nombre técnico.
- El "+0.05 °C" es para una cucharadita (~5.85 g) en 2 litros; con más sal sube más (el estudio de 1974 midió +0.151 °C con 0.956 % y +3.249 °C con 15.4 %), pero en cocina normal siguen siendo décimas o centésimas. No afirmamos que la sal haga hervir más lento ni más rápido en segundos: no encontramos un estudio publicado que mida el tiempo; la voz solo dice que no hierve "antes" porque el punto de ebullición sube, no baja.
- Las burbujas al echar la sal: con agua ya muy caliente, los granitos funcionan como puntos de nucleación (fuente 3). La sal termina disolviéndose y el efecto dura poco. Cualquier granito (azúcar, arena) lo hace; no es una reacción química.
- "La sal es para el sabor": es el uso culinario; no se hace ninguna afirmación de salud. En la descripción se puede recordar el límite de sodio de la FDA (2 300 mg al día ≈ 1 cucharadita).
- Guadalajara (≈ 1 566 m) quedaría en ~95 °C, pero no se usa en la voz para no meter otra cifra.

