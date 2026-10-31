# Verificación de hechos · qui-24-hielo-seco

29 oct 2026 · verificación independiente (agente que no escribió el guion). Todas las fuentes se abrieron y se buscó la frase textual en el original (HTML/PDF del CDC, PDF de UW EH&S, página de Rutgers, página de JMU, NIST WebBook y el texto completo escaneado de los *Comptes rendus* t. 1 en archive.org).

Fuentes:
- **[CDC]** MMWR 53(50), "Acute Illness from Dry Ice Exposure During Hurricane Ivan — Alabama, 2004" (24 dic 2004). https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5350a6.htm
- **[UW]** Univ. of Washington EH&S, "Work Safely with Dry Ice" (hoja con fecha "October 2026"). https://www.ehs.washington.edu/system/files/resources/dryice.pdf
- **[RUT]** Rutgers Chemistry, demo 1029 "Fog Formation". https://chem.rutgers.edu/cldf-demos/1029-cldf-demo-fog-formation
- **[JMU]** James Madison Univ. Chemistry Demos, categoría Sublimación. https://sites.lib.jmu.edu/chemdemos/category/demo-database/sublimation
- **[NIST]** NIST Chemistry WebBook, CO₂, datos de cambio de fase. https://webbook.nist.gov/cgi/cbook.cgi?ID=C124389&Mask=4
- **[CR]** Thilorier, "Solidification de l'Acide carbonique", *Comptes rendus hebd. Acad. sci.* t. 1, pp. 194–196, séance du lundi 12 octobre 1835. https://archive.org/details/comptesrendusheb01acad
- **[MC]** Monte Carlo de CO₂ fase I (Pa3), arXiv 2305.17913 (2023). https://arxiv.org/pdf/2305.17913

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Voz 0 / pantalla 0: "Ese humo no es humo: es **el agua de tu propio aire**, hecha nube por el frío del hielo seco" — con el hielo seco cayendo **en un vaso de agua** | ⚠️ imprecisa | [RUT], [JMU] | RUT: "Fog forms when water vapor in the air condenses into tiny suspended droplets." · "The warm air over the hot water is nearly saturated with water vapor. This warm air is cooled by mixing it with the cold carbon dioxide gas that sublimes from dry ice." JMU: "The "fog" that we see is condensed water vapor though, not carbon dioxide gas." | sin fecha (física estable) |
| — | Comentario a #1 | | | Que lo blanco es agua condensada y no CO₂ está ✅. Pero en la escena mostrada (trozo en un vaso **de agua**), el vapor que se condensa viene sobre todo del agua del vaso (el CO₂ burbujea a través de ella y sale saturado de humedad), no "de tu propio aire". "Tu propio aire" solo es exacto si el hielo seco está al aire (sin agua). | |
| 2 | "El hielo seco es dióxido de carbono sólido" | ✅ | [UW] | "Dry ice, the solid form of carbon dioxide (CO2)" | 2026 |
| 3 | "a 78 grados y medio bajo cero" / termómetro "−78.5 °C" | ✅ | [CDC], [RUT] | CDC: "Dry ice has a temperature of -109.3 ºF (-78.5 ºC)" · RUT: "Solid CO2, dry ice, has a temperature of -78.5 °C" | 2004 / constante física |
| 4 | "No se derrite: pasa directo de sólido a gas. Eso se llama sublimación" (flecha que se salta el líquido) | ✅ | [CDC], [NIST] | CDC: "it undergoes sublimation (i.e., direct conversion from a solid into gaseous CO2, bypassing the liquid state)". NIST: "Ptriple 5.185 bar" (arriba de 1 atm, por eso a presión normal no hay líquido) | 2004 / 1976 (constante) |
| 5 | Pantalla 2: red ordenada de moléculas CO₂ (C negro, dos O rojos), barra de escala "1 nm" | ✅ (esquemático) | [MC] | El sólido es la fase I cúbica Pa3 con constante de red de ~5.5–5.6 Å; "1 Å = 0.1 nm" → ~0.56 nm por celda, compatible con una barra de 1 nm. Colores = convención CPK. | 2023 |
| 6 | "Ese gas no se ve: no tiene color ni olor" | ✅ | [CDC] | "CO2 is a colorless, odorless gas and a simple asphyxiant that displaces oxygen when inhaled." | 2004 |
| 7 | "Lo blanco es el vapor de agua del aire, que con tanto frío se condensa en gotitas diminutas, como la niebla" | ⚠️ (misma salvedad que #1) | [RUT], [JMU] | "Fog forms when water vapor in the air condenses into tiny suspended droplets." · "how fog forms meteorologically" — el mecanismo ✅; "del aire" impreciso con el vaso de agua (ver #1). | sin fecha |
| 8 | "Casi medio kilo suelta unos 250 litros de gas" (báscula ≈0.45 kg → globo 250 L) | ✅ | [UW] | "(1 pound solid = 250 liters gas)" — 1 lb = 0.454 kg; cálculo propio: 454 g / 44 g/mol ≈ 10.3 mol × 24.5 L/mol (25 °C) ≈ 252 L, consistente. | 2026 |
| 9 | "en un lugar cerrado desplaza el oxígeno" (pantalla: CO₂ se junta abajo, O₂ empujado) | ✅ | [UW], [CDC], [RUT] | UW: "can displace oxygen quickly in the air around the dry ice, causing difficulty breathing, loss of consciousness and death. This is especially of concern in non- ventilated or confined spaces." · RUT: "density of a heavier than air gas" | 2026 / 2004 |
| 10 | "y en la piel quema por frío" (mano sin guante con escarcha) | ✅ | [UW] | "skin contact with dry ice is can lead to severe frostbite" | 2026 |
| 11 | "En 2004, en Alabama, un hombre llevó 45 kilos de hielo seco en su camioneta cerrada, con el aire recirculando" (tarjeta "2004 · Mobile, Alabama · CDC (MMWR)", pickup, 4 bolsas de papel en el asiento) | ✅ | [CDC] | "In September 2004 … a man aged 34 years in Mobile, Alabama, purchased a 100-lb block of dry ice … divided into four equal parts and packaged in brown paper bags, which were placed in the front seat of the man's pickup truck. The windows were closed, and the air conditioner was set to recirculate air inside the cab of the truck." (100 lb = 45.4 kg) | 2004 (la voz dice el año) |
| 12 | "y terminó desmayado" (se estaciona; medidor O₂ baja) | ✅ | [CDC] | "He then pulled his truck into a parking lot, parked, and lost consciousness." | 2004 |
| 13 | "Despertó cuando su esposa abrió la puerta" (entra aire, medidor sube) | ✅ | [CDC] | "immediately after she opened the door to the vehicle, her husband began to awaken." | 2004 |
| 14 | "en 1835, en París, Thilorier" (tarjeta "1835 · París · Thilorier · Academia de Ciencias") | ✅ | [CR] | "SÉANCE DU LUNDI 12 OCTOBRE 1835" · "Voici la lettre que M. Thilorier a adressée à l'Académie" · "M. Arago annonce que les commissaires de l'Académie, MM. Thénard, Dulong et lui-même, ont été témoins de toutes les expériences rapportées par M. Thilorier." | 1835 (la voz dice el año) |
| 15 | "encerró un poquito en un frasco bien tapado, y el tapón salió disparado" (frasquito con "vapor espeso", tapón que sale volando) | ✅ | [CR] | "Si l'on introduit quelques décigrammes de cette substance dans un petit flacon, en ayant soin de le boucher hermétiquement, l'intérieur se remplit d'une vapeur épaisse, et le bouchon ne tarde pas à être chassé avec violence." | 1835 |
| 16 | "Por eso nunca va en un frasco cerrado" (✗ frasco con tapa de rosca) | ✅ | [UW] | "Never store dry ice in a tightly sealed container, such as a plastic or glass bottle, or any container with a screw-top lid that will not vent." · "such a container may explode" | 2026 |
| 17 | "ni en tu mano sin guantes" (✓ guante grueso / pinzas) | ✅ | [UW] | "Use tongs to handle dry ice when possible. • Use loose-fitting, thermally insulated gloves … Never handle dry ice with bare hands." | 2026 |
| 18 | Pantalla 9: ✓ hielera de unicel sin cerrar | ✅ | [UW] | "Styrofoam is an appropriate storage material since it is both insulated and not airtight." | 2026 |
| 19 | Cierre: "ese humo no es humo: es **tu aire**, hecho nube por un gas que no ves" + etiquetas "gotitas de agua del aire (lo blanco)" · "CO₂ invisible" | ⚠️ (misma salvedad que #1) | [RUT], [JMU], [CDC] | Lo blanco = agua condensada ✅; CO₂ incoloro ✅; "tu aire / del aire" impreciso si la escena es un vaso con agua. | — |

Revisión de cifras: todas dicen de qué son (−78.5 °C = temperatura del hielo seco; 250 L de gas por casi medio kilo; 45 kilos de hielo seco). Los datos de más de 2 años (2004, 1835) llevan el año en la voz. La cifra de 250 L viene de una hoja de 2026.

## Correcciones necesarias

1. **#1, #7 y #19 (de dónde sale el agua de la nube) — ⚠️.** Con el trozo cayendo en un vaso **de agua**, el vapor que se condensa viene sobre todo del agua del vaso (Rutgers: el aire sobre el agua va "nearly saturated with water vapor" y lo enfría el CO₂). Dos salidas, a elegir:
   - **Opción A (cambiar solo la imagen, recomendada):** el hielo seco se deja caer en un **vaso o plato vacío** (sin agua); así la niebla sí es la humedad del aire del cuarto y la voz queda igual. (La niebla sale más tenue; se puede exagerar un poco en el dibujo esquemático.)
   - **Opción B (conservar el vaso con agua y ajustar la voz):**
     - Gancho: "Ese humo no es humo: es agua, hecha nube por el frío del hielo seco."
     - Nube: "Lo blanco es vapor de agua —del vaso y del aire— que con tanto frío se condensa en gotitas diminutas, como la niebla."
     - Cierre: "Así que ese humo no es humo: es agua hecha nube, por un gas que no ves."
     - Etiqueta final: "gotitas de agua (lo blanco)" en vez de "gotitas de agua del aire".

Todo lo demás (−78.5 °C, sublimación, incoloro e inodoro, 250 L por libra, desplaza el oxígeno, quemadura por frío, caso de Alabama 2004 con sus detalles, Thilorier 1835 en París con el tapón disparado, reglas de seguridad y el unicel) está ✅ en su fuente original.

## Correcciones aplicadas (29 oct 2026)
- ⚠️→✅ #1, #7, #19: se adopta la opción A del verificador: en pantalla el hielo seco va en un plato/vaso VACÍO (sin agua), así la nube sale del vapor del aire y la voz queda igual.

VEREDICTO: APROBADO
