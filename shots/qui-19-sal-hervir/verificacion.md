# Verificación de hechos · qui-19-sal-hervir

29 oct 2026 · verificación independiente (agente que no escribió el guion). Todas las fuentes se abrieron (el PDF de Hakuta et al. se descargó de J-STAGE y se leyó la Tabla 1 en la página 153; los PDF del USDA, la SEP y la Revista de la Universidad se descargaron y se buscó la frase en el texto).

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | "Esa cucharadita de sal no hace que tu agua hierva antes" (voz 0) / chip "hierve más rápido" tachado | ✅ (en la práctica) | OpenStax *Chemistry 2e* 11.4 | "a solution will require a higher temperature than will pure solvent to achieve any given vapor pressure" | 2019 |
| 2 | "le sube el hervor 5 centésimas de grado. Solo eso." + número gigante **+0.05 °C** desde el cuadro 0 | ⚠️ imprecisa (le falta el contexto) | Cálculo con OpenStax (K_b) + FDA + Hakuta 1974 (ver #9) | La cifra solo vale para ~6 g en **2 L**; en el gancho no se dice cuánta agua (en 1 L serían ~0.1 °C). Además es un cálculo redondeado (0.046–0.051 °C) y se presenta como dato exacto. | cálculo propio |
| 3 | "El agua hierve cuando su vapor empuja tan fuerte como el aire que tiene encima" (balanza vapor = aire) | ✅ | OpenStax *Chemistry 2e* 11.4 | "the boiling point of a liquid is the temperature at which its vapor pressure is equal to ambient atmospheric pressure" | 2019 |
| 4 | "La sal se parte en iones de sodio y cloro" (pantalla Na⁺ y Cl⁻) | ⚠️ imprecisa (nomenclatura) | OpenStax *Chemistry 2e* 11.4 | "2.0 mole of ions (1.0 mol Na+ and 1.0 mol Cl−) per each kilogram of water" — el ion Cl⁻ es **cloruro**, no cloro (el cloro es el gas Cl₂). En una serie de Química conviene decirlo bien. | 2019 |
| 5 | "con ellos el agua suelta vapor con menos fuerza" (baja la presión de vapor) | ✅ | OpenStax *Chemistry 2e* 11.4 | "Dissolving a nonvolatile substance in a volatile liquid results in a lowering of the liquid's vapor pressure." | 2019 |
| 6 | "Entonces hay que calentarla más" | ✅ | OpenStax *Chemistry 2e* 11.4 | "a solution will require a higher temperature than will pure solvent to achieve any given vapor pressure" | 2019 |
| 7 | "medio grado por cada mol de partículas en un kilo de agua" / pantalla ΔT = i·K_b·m, K_b = 0.512 °C·kg/mol | ✅ (valor ideal) | OpenStax *Chemistry 2e*, Tabla 11.2 | "water · 100.0 · 0.512" (K_b en °C m⁻¹); "the value of i for NaCl is 1.9, as opposed to an ideal value of 2." | 2019 |
| 8 | "Una cucharadita son unos 6 gramos de sal" / pantalla "≈ 6 g" | ✅ (como aproximación, la voz dice "unos") | FDA, "Sodium in Your Diet" + masas molares | "limit sodium intake to less than 2,300 mg per day" · "that's equal to about 1 teaspoon of table salt". Cálculo: 2.3 g Na × 58.44/22.99 = **5.85 g NaCl** ≈ 6 g. Coincide con el registro USDA "Salt, table" que usan los convertidores (1 tsp = 6 g). | página vigente 2026 |
| 9 | "en 2 litros, apenas 5 centésimas de grado" / termómetro 100.00 → **100.05 °C** | ✅ (redondeo honesto; mejor con "unas") | Recalculado: OpenStax + Hakuta 1974 | 5.85 g / 58.44 = 0.100 mol NaCl → 0.19–0.20 mol de iones en ~2 kg → ΔT = 0.512 × 0.095–0.100 = **0.049–0.051 °C**; con los datos medidos de Hakuta (0.151 °C a 0.956 %; aquí 0.29 %) → **0.046 °C**. Todo redondea a 0.05 °C. | 2019 / 1974 / cálculo |
| 10 | "¿Y por qué burbujea cuando la echas? … los granitos de sal son puntos donde el vapor forma burbujas fácil" / etiqueta "nucleación" | ✅ | The Naked Scientists (Univ. Cambridge), "Why does adding salt make water boil more vigorously?" | "the salt crystals … act as what are called nucleation points" · "They make it much more easy for bubbles of the vapour … to form." | 2008 |
| 11 | Pantalla: piedra de ebullición de laboratorio "igual que esto" | ✅ | Nichols, *Organic Chemistry Lab Techniques* (LibreTexts) 1.4B | "have high surface area that can act as nucleation sites for formation of solvent bubbles" | vigente 2026 |
| 12 | "Si el agua está muy caliente, échala con cuidado: puede saltar" / gotas que brincan | ✅ (mismo mecanismo, fuente de laboratorio) | Nichols, LibreTexts 1.4B | "They should be added to a cool liquid, not one that is near its boiling point, or a vigorous eruption of bubbles may ensue." · "Bumping can splash hot material out of a flask." | vigente 2026 |
| 13 | "En 1974, en Japón, químicos lo midieron con un ebullómetro doble" / tarjeta "1974 · Hakuta, Goto e Ishizaka · Japón" | ✅ | Hakuta T., Goto T., Ishizaka S., 日本海水学会誌 28(3):151–155 (1974), National Chemical Laboratory for Industry (工業技術院東京工業試験所) | "measured by using a twin-type ebulliometer in the weight per cent range of 1% to 15% under the atmospheric pressure" | 1974 |
| 14 | "con casi 1 por ciento de sal, el agua hirvió solo 15 centésimas de grado más caliente" / chip "0.96 % de sal" y **+0.151 °C** | ✅ | Hakuta et al. 1974, Tabla 1 (p. 153), NaCl, 1.ª fila | "0.956 [wt. %] · 0.297 [Mol. %] · 0.151°C [B.P.E.]" (el % es en peso) | 1974 |
| 15 | Pantalla: dibujo del ebullómetro doble, dos celdas "agua" y "agua + sal" con termómetro | ✅ (esquemático) | Hakuta et al. 1974, Fig. 2 | "Twin type ebulliometer. 1; Solution cell, 2; Solvent cell" (con vaina de termistor en cada celda) | 1974 |
| 16 | "Lo que sí cambia el hervor es la altura" | ✅ | SEP, *Química* 3.º secundaria, pp. 79–80 | "A menor presión, menor es la temperatura de ebullición, es por eso que en las ciudades con mayor altitud, como Toluca o Ciudad de México, el agua hierve a una temperatura menor a los 100 oC." | libro vigente (NEM) |
| 17 | Pantalla: Valle de México "2 240 m" | ✅ | Castro, Martínez y Peralta, *Revista de la Universidad de México* (UNAM) | "una ciudad que se encuentra a 2 240 metros de altura sobre el nivel del mar" | 2025 |
| 18 | "en la Ciudad de México el agua hierve a unos 92 grados" / termómetro **≈ 92 °C** vs 100 °C al nivel del mar | ✅ (aproximación, la voz dice "unos") | USDA FSIS "High Altitude Cooking and Food Safety" (rev. sept 2011) + cálculo | "At sea level, water boils at 212 °F. With each 500-feet increase in elevation, the boiling point of water is lowered by just under 1 °F." → 2 240 m = 7 349 ft → ≈ 198 °F ≈ **92.2 °C**. Recalculado aparte: atmósfera estándar → 77.2 kPa (579 mmHg) → ecuación de Antoine → **92.6 °C**. | 2011 / cálculo |
| 19 | Pantalla: contraste "0.05 °C (sal) contra ~8 °C (altura)" | ✅ | Derivado de #9 y #18 | 100 − 92.2…92.6 = 7.4–7.8 °C ≈ "~8 °C" | cálculo |
| 20 | "esa cucharadita no apura tu olla: la sal es para el sabor, no para la prisa" | ✅ (en la práctica) | Derivado de #1, #9 | Ver nota abajo. | — |

**Nota sobre #1 y #20 (tiempo para hervir):** el guion lo justifica solo con el punto de ebullición, y eso está bien. Comprobación aparte: la sal disuelta también baja un poco la capacidad calorífica del agua, pero con 6 g en 2 L ese efecto es del orden de 0.1 %, tan chico como el de las 5 centésimas. En la práctica la sal no cambia el tiempo de forma apreciable, ni para más ni para menos. Para no prometer de más, la voz no debe decir que la sal hace que el agua hierva "más lento". Ahorita no lo dice.

## Correcciones necesarias

1. **#2 Gancho sin contexto (⚠️):** "le sube el hervor 5 centésimas de grado. Solo eso." no dice en cuánta agua, y la cifra cambia con el volumen (en 1 L son ~0.1 °C). Además es un cálculo redondeado y se dice como dato exacto. Propuesta (casi el mismo largo):
   - Voz: "Esa cucharadita de sal no hace que tu agua hierva antes: en una olla de 2 litros, le sube el hervor unas 5 centésimas de grado. Solo eso."
   - Si sobra tiempo, alternativa más corta: "…le sube el hervor apenas unas centésimas de grado. Solo eso." (y el 0.05 se da en la escena 4).
   - Pantalla del cuadro 0: junto al **+0.05 °C**, una etiqueta chica "≈ · 6 g en 2 L". Escena 4: "unas 5 centésimas" en lugar de "apenas 5 centésimas" (opcional, recomendable).
2. **#4 "iones de sodio y cloro" (⚠️):** el ion es **cloruro** (Cl⁻); "cloro" es el gas Cl₂. Voz: "La sal se parte en iones de sodio y cloruro, y con ellos el agua suelta vapor con menos fuerza." La etiqueta en pantalla puede decir "Cl⁻ cloruro".
3. (Menor, opcional) Chip del estudio: "0.96 % de sal **en peso**", para que coincida con la tabla de Hakuta (wt. %).

## Re-verificación (29 oct 2026)

Mismo verificador independiente. Revisé las frases que cambiaron en `narracion.json` y `guion.md` contra las mismas fuentes y cálculos de la tabla de arriba.

| # | Texto nuevo | Veredicto | Comentario |
|---|---|---|---|
| R1 | Gancho: "…en una olla de 2 litros, le sube el hervor unas 5 centésimas de grado. Solo eso." + pantalla "+0.05 °C" con "≈ · 6 g en 2 L" | ✅ | Ya dice en cuánta agua y que es aproximado ("unas"). Cálculo de #9: 0.046–0.051 °C. Corrección 1 atendida. |
| R2 | "La sal se parte en iones de sodio y cloruro…" (pantalla "Na⁺ sodio", "Cl⁻ cloruro") | ✅ | OpenStax 11.4: "1.0 mol Na+ and 1.0 mol Cl−". Corrección 2 atendida. |
| R3 | Olla: "Una cucharadita son unos 6 gramos de sal: unas 5 centésimas de grado." (pantalla "≈ 6 g", olla "2 L", 100.00 → 100.05 °C) | ✅ | Sí se entiende con la olla de 2 L: el gancho acaba de decir "en una olla de 2 litros" y en esta escena la olla lleva la etiqueta "2 L". La cifra no se puede leer como si fuera para otro volumen, y "unas" la marca como aproximación. Si quieren reforzar, la frase "…de sal: en 2 litros, unas 5 centésimas de grado" es más clara, pero no es necesaria. |
| R4 | Estudio: "…con casi 1 por ciento de sal, el agua hirvió solo 15 centésimas de grado más." + chip "0.96 % de sal en peso" | ✅ | Hakuta et al. 1974, Tabla 1: "0.956 [wt. %] … 0.151°C [B.P.E.]". "Más" se entiende como más caliente que el agua sin sal, porque toda la frase habla del hervor. El chip ya dice "en peso" (sugerencia 3 atendida). |
| R5 | Cierre: "Esa cucharadita no apura tu olla: la sal es para el sabor, no para la prisa." | ✅ | Igual que #20: en la práctica, la sal no cambia el tiempo para hervir. |

Resultado: las 2 ⚠️ de la primera ronda quedaron corregidas. Sin ⚠️ ni ❌ pendientes.

VEREDICTO: APROBADO
