# Verificación de hechos · Shot IA #59 · El robot que cosió un intestino (y quién lo vigilaba)

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuentes abiertas en texto completo: Saeidi et al., *Science Robotics* 7(62): eabj2908, 26 ene 2022 (manuscrito PMC8992572, bajado completo de la API de NCBI); Kim et al., SRT-H, *Science Robotics*, 9 jul 2025, DOI 10.1126/scirobotics.adt5254 (resumen en Crossref) y preprint arXiv:2505.10251v3 (PDF completo).
- Búsqueda de datos más nuevos (oct 2026): no encontré una prueba de SRT-H en animales vivos publicada después; nada contradice lo de abajo.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Las puntadas las hizo un robot en el intestino de un cerdo vivo | ✅ | Saeidi 2022 (PMC8992572) | "laparoscopic autonomous surgery was performed in vivo on porcine small bowel using STAR (n = 4 independent animals)" | 2022 |
| 2 | Se llama STAR | ✅ | Saeidi 2022 | "the Smart Tissue Autonomous Robot (STAR)" | 2022 |
| 3 | Ve el tejido en tres dimensiones | ✅ | Saeidi 2022 | "The camera system allows the STAR to autonomously track biocompatible NIR markers … and reconstruct the 3D surface of the tissue (used for suture planning)" | 2022 |
| 4 | Sigue cómo se mueve al respirar | ✅ | Saeidi 2022 | "detecting the breathing motion of tissue … synchronizing the robot tool with breathing motions of the tissue" | 2022 |
| 5 | Planea cada puntada | ✅ | Saeidi 2022 | "suture planning in different modes with uniform and non-uniform spacing" | 2022 |
| 6 | Una persona aprueba el plan | ✅ | Saeidi 2022 | "The operator selects among the autonomously suggested suture plans or approves a re-planning step" | 2022 |
| 7 | …y cada disparo de la aguja (en los cerdos) | ✅ | Saeidi 2022 | "an additional number of human interventions for initial robot position fine-tuning (before the first suture) and approval of firing the needle" | 2022 |
| 8 | Una puntada cada tres milímetros | ✅ (es la separación programada; en tejido de práctica midió 3.05 mm) | Saeidi 2022 | "A target suture spacing of 3 mm was selected" · "STAR was … 3.05 ± 0.8 mm … statistically similar to the 3.0 mm spacing suggested by the uniform suture plan" | 2022 |
| 9 | "Fue en Johns Hopkins" | ⚠️ (el equipo es de Johns Hopkins, pero las cirugías en cerdos se hicieron en Children's National Hospital, Washington) | Saeidi 2022, Métodos | "performed under Institutional Animal Care and Use Committee Approval (Protocol 30759) at Children's National Hospital (CNH) in Washington, DC, USA" | 2022 |
| 10 | "en 2022" | ⚠️ (2022 es el año de **publicación**, 26 ene 2022; el artículo no dice cuándo se operó y por la fecha casi seguro fue antes). "Fue … en 2022" da a entender que se operó ese año | Crossref / PMC | pub-date 26-01-2022 | 2022 |
| 11 | Con cuatro cerdos | ✅ | Saeidi 2022 | "STAR (n = 4 independent animals)" | 2022 |
| 12 | A la semana revisaron cómo sanaron | ✅ | Saeidi 2022 | "the animals were monitored for a one-week survival period, and subject to limited necropsy to compare the healed anastomosis" | 2022 |
| 13 | En intestino de práctica, sus puntadas salieron más parejas que las de cirujanos expertos | ⚠️ leve: cierto en **separación** entre puntadas (26 % de variación contra 45 % a mano y 41 % con da Vinci); en **profundidad** fue más pareja que a mano pero **igual** que la de cirujanos con da Vinci. "Puntadas más parejas" a secas abarca las dos cosas | Saeidi 2022 | "the coefficient of variance for LAP, RAS, and STAR was 45.37%, 41.42%, and 26.36% respectively" · bite depth: "STAR is more consistent in bite depth than LAP (P < 0.0001) and similar to RAS (P = 0.2611)" · "LAP and RAS data was collected from four different surgeons" · resumen: "outperforms expert surgeons' manual technique and RAS technique in terms of consistency and accuracy" | 2022 |
| 14 | Pantalla: "intestino de práctica (no es de animal)" | ✅ | Saeidi 2022 | "phantom bowel tissues (by 3D Med, Franklin, OH, USA)" | 2022 |
| 15 | En los cerdos, una de cada tres puntadas tuvo que corregirla una persona (pantalla: 86 puntadas, 29 en rojo) | ✅ (29/86 = 33.7 %; la corrección fue el operador ajustando la posición desde la computadora) | Saeidi 2022 | "STAR completed a total of 86 stitches (8 knots, 78 running stitches). The total number of sutures requiring manual adjustments were 29 (66.28% correctly placed stitches in the first attempt)" · "the operator would interrupt the suture plan to correct the positioning of the suture tool" | 2022 |
| 16 | Tardó 62 minutos; un cirujano, 26 | ✅ (25.6 → 26; ojo: fue **un solo** control manual, n = 1, y "un cirujano" en singular lo dice bien) | Saeidi 2022 | "The average task completion time for STAR was 62.03 ± 5.32 minutes compared to 25.6 minutes for the control" · "laparoscopic control (n = 1)" | 2022 |
| 17 | En 2025, otro robot (SRT-H), Johns Hopkins y Stanford | ✅ | arXiv 2505.10251v3 / Science Robotics 9 jul 2025 | "1 Johns Hopkins University, 2 Stanford University, 3 Optosurgical" | 2025 |
| 18 | Aprendió con unas diecisiete horas de demostraciones | ✅ | arXiv 2505.10251 | "we collect 16,000 trajectories (approximately 17 hours of data) across 34 ex-vivo porcine gallbladders" · "enable collection of hundreds of demonstrations from a single porcine tissue" | 2025 |
| 19 | En ocho vesículas de cerdo | ✅ (fuera del cuerpo; lo dice la frase siguiente) | Science Robotics 2025 | "100% success rate across eight different ex vivo gallbladders" | 2025 |
| 20 | "engrapó y cortó sus tubos" | ⚠️ (no son grapas: son **clips**; y fue solo la fase de clips y corte del conducto y la arteria, no la operación entera — la frase no dice que fuera completa, eso está bien) | arXiv 2505.10251 | "The autonomous surgical steps include clipping and cutting the gallbladder's artery and duct" · "three clips are added to the left tubular structure (typically the duct) and then three clips are added to the right tubular structure (typically the artery)" | 2025 |
| 21 | "sin ayuda humana" | ⚠️ (los autores dicen "without human intervention" en las decisiones y movimientos, pero **una persona le recargaba cada clip y le cambiaba la herramienta**; "sin ayuda humana" a secas es exagerado) | arXiv 2505.10251 | "After each clip is applied, an assistant on standby near the dVRK loads another clip and also performs tool changes between clip applier and scissors" · "This duration excludes the time of reloading the clips and making tool changes performed by the operator" | 2025 |
| 22 | Eran órganos fuera del cuerpo: falta probarlo con sangrado y movimiento | ✅ | arXiv 2505.10251, Limitaciones | "Translating from ex-vivo to in-vivo brings several challenges, such as operating in the surgical site, addressing bleeding and tissue motion" | 2025 |
| 23 | Cierre: las puntadas las hizo un robot con una persona al lado, vigilando | ✅ | Saeidi 2022 | "monitors the robot for repeating a stitch as needed" · "the role of human supervision cannot be eliminated" | 2022 |
| 24 | Pantalla: TarjetaEstudio "2022 · Johns Hopkins · Saeidi, Krieger y col. · Science Robotics" | ✅ como autoría/afiliación (mejor agregar "y Children's National", ver #9) | Saeidi 2022 | afiliaciones: Johns Hopkins University; Children's National Hospital; UNC Wilmington | 2022 |
| 25 | Pantalla: chip "cerdo vivo · 2022" | ✅ (año de publicación) | Saeidi 2022 | — | 2022 |
| 26 | Notas del guion: ninguno de los dos estudios fue en personas | ✅ | ambos | in vivo porcine / ex vivo porcine | 2022/2025 |

## Correcciones necesarias

1. **#9 y #10 — "Fue en Johns Hopkins, en 2022"** (⚠️): las cirugías se hicieron en Children's National Hospital, y 2022 es el año en que se publicó.
   Propuesta de voz: **"Lo publicó en 2022 un equipo de Johns Hopkins: operaron a cuatro cerdos y a la semana revisaron cómo sanaron."**
   Pantalla: TarjetaEstudio "2022 · Johns Hopkins y Children's National · Saeidi, Krieger y col. · Science Robotics".
2. **#13 — "más parejas que las de cirujanos expertos"** (⚠️ leve): decir que lo parejo es la separación.
   Propuesta: **"En intestino de práctica, la separación entre sus puntadas salió más pareja que la de cirujanos expertos."** (o "sus puntadas quedaron más parejamente separadas que las de cirujanos expertos"). La animación de la escena 4 ya muestra separación, así que solo cambia la voz/subtítulo.
3. **#20 — "engrapó"** (⚠️): son clips, no grapas. Propuesta: **"les puso clips y cortó sus tubos"**. En pantalla y en la música: "clic" de clip en vez de "clac" de grapa (detalle), y la etiqueta "clips + tijera".
4. **#21 — "sin ayuda humana"** (⚠️): una persona recargaba los clips y cambiaba herramientas.
   Propuesta de frase completa: **"En 2025, otro robot aprendió con unas diecisiete horas de demostraciones y, en ocho vesículas de cerdo, les puso clips y cortó sus tubos él solo; una persona solo le recargaba los clips."**
   (Alternativa más corta: "…sin que nadie lo guiara; una persona solo le pasaba los clips.") Ajustar la duración si crecen las palabras.
