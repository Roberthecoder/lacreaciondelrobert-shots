# Verificación de hechos · Shot IA #36 · Tú contra el auto sin conductor

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Fuentes abiertas directamente: Waymo Safety Impact Hub (página),
  PDF completo del estudio Swiss Re + Waymo (texto extraído y leído), API oficial de recalls de NHTSA, hoja informativa de la OMS.
  Búsqueda de datos más nuevos: no se encontró un estudio Swiss Re–Waymo posterior a dic 2024; el Hub sigue con datos hasta junio 2026.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Voz + pantalla) Según Waymo, sus autos sin conductor tienen 82 % menos choques con heridos ("−82 % choques con heridos · datos de Waymo") | ✅ | Waymo Safety Impact Hub, https://waymo.com/safety/impact/ | "82% Fewer injury-causing crashes (841 fewer)" · "Compared to an average human driver over the same distance in our operating cities" | 2026 (datos a jun 2026) |
| 2 | (Escena 0) El 82 % cuenta todos los choques, sin importar la culpa (nota del guion) | ✅ | Ídem | "This analysis included all collisions, regardless of the party at fault and Waymo's responsibility." | 2026 |
| 3 | Lo mide en 271 millones de millas sin conductor, hasta junio de 2026 (odómetro "271.3 millones de millas sin conductor · hasta junio 2026") | ✅ | Ídem | "Through June 2026, Waymo has driven 271.3M rider-only miles without a human driver" | 2026 |
| 4 | Contra el conductor promedio de sus ciudades, como Phoenix, San Francisco y Los Ángeles | ✅ | Ídem | "state police reported crash records and Vehicle Miles Traveled (VMT) data in the areas Waymo currently operates RO services at large scale (Phoenix, San Francisco, Los Angeles, and Austin)" | 2026 |
| 5 | (Pantalla) Pines también en Austin y Atlanta | ✅ | Ídem | "Austin 21.064M Atlanta 8.624M" (millas sin conductor por ciudad) | 2026 |
| 6 | "Si los números son suyos": el tablero lo publica la propia Waymo | ✅ | Ídem (página de waymo.com) | Página "Waymo Safety Impact" alojada y publicada por Waymo | 2026 |
| 7 | En 2024, Swiss Re revisó los reclamos de Waymo | ✅ | Di Lillo et al., preprint dic 2024 (PDF en storage.googleapis.com/waymo-uploads/…25M miles.pdf) | "Waymo provided both the fully anonymized claims' data and zip-code level vehicle miles traveled across all 25.3 million miles to Swiss Re. … The data was then reviewed by Swiss Re." | 2024 |
| 8 | "La **aseguradora** Swiss Re" | ⚠️ (leve) | Mismo PDF | Afiliación: "Swiss Reinsurance Company, Ltd" — es una **reaseguradora** (aseguradora de aseguradoras), no una aseguradora común | 2024 |
| 9 | En 25 millones de millas, solo 2 reclamos por lesiones (pantalla: "25.3 millones de millas · reclamos de seguro") | ✅ | Mismo PDF | "the Waymo ADS yielded nine property damage and two bodily injury claims, arising from 10 unique collisions, over 25.3 million miles" (los 2 de lesiones seguían abiertos) | 2024 |
| 10 | Con humanos esperaban 26 | ✅ | Mismo PDF | "the overall driving population benchmark was expected to have 78 property damage and 26 bodily injury claims for an equivalent amount of driving exposure in the deployed driving regions" | 2024 |
| 11 | 92 % menos en lesiones; 88 % menos en daños materiales (pantalla "9 contra 78") | ✅ | Mismo PDF | "88% reduction in property damage claims, 92% in bodily injury claims" | 2024 |
| 12 | Waymo es coautora del estudio | ✅ | Mismo PDF | Autores: Di Lillo, Zhou (Swiss Re) y Gode, Scanlon, Chen, Victor ("d Waymo LLC, USA"); "a non-paid and non-profit collaboration" | 2024 |
| 13 | "**Su comparación** deja fuera autopistas y nieve" (dicho justo después del estudio Swiss Re; pantalla: lupa sobre la tarjeta del estudio con autopista y copo tachados) | ⚠️ | Mismo PDF vs. Safety Impact Hub | Swiss Re: "The associated benchmark mileage has more freeway driving than the Waymo ADS … by including freeways in this study's benchmark". Hub: "only included … roadways Waymo operates on (excluding freeways)" y "do not have appreciable snow fall". La exclusión de autopistas es del **tablero de Waymo**, no del estudio Swiss Re, que sí incluye autopistas en la referencia humana. Tal como está, la frase y la imagen se la atribuyen al estudio. | 2024 / 2026 |
| 14 | En 2025 corrigió el software de 3,067 autos que podían rebasar autobuses escolares detenidos (sello "RECALL · NHTSA 25E-084 · 3,067 autos · dic 2025") | ✅ | NHTSA API, campaña 25E084000 | "The software may cause the vehicle to pass a stopped school bus even when the red lights are flashing and/or stop arm is extended." · "PotentialNumberofUnitsAffected": 3067 · "All affected vehicles were repaired by November 17, 2025." · ReportReceivedDate 08/12/2025 (8 dic 2025; confirmado por prensa: CBS, Insurance Journal 11 dic 2025) | 2025 |
| 15 | En el mundo, el tránsito mata a más de un millón de personas cada año (pantalla "1.16 millones al año (OMS)") | ✅ | OMS, "Road traffic injuries", 20 jul 2026 | "Approximately 1.16 million people die each year as a result of road traffic crashes." | 2026 |
| 16 | Cierre: "en sus calles, él va ganando" | ✅ (como conclusión acotada) | Hub + Swiss Re | Ambas comparaciones favorecen a Waymo dentro de sus zonas de operación; la frase ya lo limita a "sus calles" y añade "hay que seguir revisando". | 2024–2026 |

Revisión de forma: cada cifra dice de qué es; ningún dato tiene más de 2 años (el más viejo, dic 2024); no se mezclan cifras con enlaces ajenos; no se encontró dato más nuevo que contradiga.

## Correcciones necesarias

1. **#13 (⚠️, escena 6 "Ojo")** — la exclusión de autopistas no es del estudio Swiss Re (ese sí incluye autopistas en la referencia humana); es del tablero de Waymo, y la falta de nieve es de sus ciudades. Propuesta de voz:
   > "Ojo: Waymo es coautora del estudio, y sus autos casi no van por autopista ni manejan con nieve."
   (Pantalla: quitar la lupa sobre la tarjeta del estudio para los íconos; mostrar autopista y copo tachados como "dónde NO maneja", no como "lo que el estudio dejó fuera". Sustento: Swiss Re "Waymo also almost exclusively operated on surface streets"; Hub "the current cities Waymo operates in do not have appreciable snow fall".)
2. **#8 (⚠️ leve, escena 4)** — Swiss Re es reaseguradora. Propuesta: "En 2024, la reaseguradora Swiss Re revisó sus reclamos…" o "el gigante de seguros Swiss Re…". Ajustar igual la `TarjetaEstudio` si dice "aseguradora".

## Re-verificación (29 oct 2026, coordinador)
- Estudio: «la reaseguradora Swiss Re» (voz y tarjeta) ✅
- Ojo: «Ojo: Waymo es coautora del estudio, y sus autos casi no van por autopista ni manejan con nieve.» + chip «dónde casi no maneja» ✅ (texto del verificador)
- Recall (recorte sin datos nuevos): «Y falla:» ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
