# Verificación de hechos · Shot IA #08 · Menos lecturas, más cáncer encontrado: la IA en las mamografías

- **Fecha:** 28 oct 2026 · **Quién verificó:** la sesión de producción de la rama `claude/igualar-ia`. En esta sesión no había herramienta para lanzar un subagente verificador (Task/Agent), así que se verificó a mano con el encargo de CLAUDE.md ("sé escéptico: si dudas, es ⚠️"), abriendo los resúmenes oficiales de los tres artículos del ensayo MASAI (Europe PMC / PubMed), la página de MedlinePlus y la nota de la Universidad de Lund.
- **Regla de "el conteo más nuevo":** el ensayo publicó tres veces (2023 con 80,033 mujeres; 2025 con las 105,934; 2026 con el resultado principal). Se usan las cifras de 2025 (detección y trabajo, ya con todas las participantes) y de 2026 (cánceres de intervalo); de 2023 solo el diseño (escala del 1 al 10), que no cambió.
- **Revisado:** `guion.md`, `narracion.json` y lo que se ve en pantalla (`mamografias.jsx`).

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Con IA, los radiólogos leyeron 44 % menos mamografías (pantalla: −44 %, 61,248 contra 109,692 lecturas) | ✅ | Hernström et al., *Lancet Digit Health* 2025 | "There were 61 248 screen readings in the intervention group and 109 692 in the control group, resulting in a 44·2% reduction in the screen-reading workload." | 2025 |
| 2 | …y encontraron más cáncer, no menos | ✅ | Hernström et al. 2025 | "AI-supported screening among 53 043 participants resulted in 338 detected cancers… Standard screening among 52 872 participants resulted in 262 detected cancers" | 2025 |
| 3 | Una mamografía es una radiografía de la mama para buscar cáncer a tiempo | ✅ | MedlinePlus en español | "Una mamografía es una imagen de rayos X del seno. Los profesionales de la salud usan mamografías para buscar signos tempranos de cáncer de mama" | vigente |
| 4 | En Suecia, cada mamografía la revisan dos radiólogos | ✅ | Nota de la Universidad de Lund (Nordic Life Science, 2026); Hernström 2025 ("standard double reading") | "In traditional screening, the mammograms are read by two breast radiologists" | 2026 |
| 5 | La IA calificó cada estudio del 1 al 10; del 1 al 9 lo leyó un radiólogo; los de 10, dos | ✅ | Lång et al., *Lancet Oncol* 2023 | "an examination-based malignancy risk score on a 10-level scale that was used to triage screening examinations to single reading (score 1-9) or double reading (score 10)" | 2023 (diseño) |
| 6 | Pantalla: la IA también marca lo sospechoso | ✅ | Hernström et al. 2025 | "as detection support highlighting suspicious findings" | 2025 |
| 7 | Con IA, 6.4 cánceres por cada mil mujeres; sin IA, 5 | ✅ | Hernström et al. 2025 | "Cancer-detection rates were 6·4 per 1000… in the intervention group and 5·0 per 1000… in the control group" | 2025 |
| 8 | Más de cien mil mujeres (pantalla: 105,934) | ✅ | Hernström et al. 2025 | "Between April 12, 2021, and Dec 7, 2022, 105 934 women were randomly assigned" | 2021–2022 |
| 9 | En el sur de Suecia, en cuatro centros (pantalla: Malmö, Lund, Landskrona, Trelleborg) | ✅ | Hernström et al. 2025 | "four screening sites in southwest Sweden (Malmö, Lund, Landskrona, and Trelleborg)" | 2025 |
| 10 | Lo dirigió Kristina Lång, de la Universidad de Lund | ✅ | Nota de la Universidad de Lund (2026); Lång et al. 2023 | "says study lead Kristina Lång, associate professor in Diagnostic Radiology at Lund University"; "Lund University, Malmö, Sweden" | 2026 |
| 11 | Los cánceres de más eran sobre todo pequeños, sin llegar a los ganglios | ✅ | Hernström et al. 2025 | "which were mainly small lymph-node negative cancers (58 more T1, 46 more lymph-node negative…)" | 2025 |
| 12 | Las falsas alarmas quedaron casi iguales | ✅ | Hernström et al. 2025 | "The recall and false-positive rate were not significantly higher in the intervention group (… 1·01 [0·91–1·11; p=0·92])" | 2025 |
| 13 | En 2026 salió el dato principal: los cánceres que aparecen entre una revisión y la siguiente | ✅ | Gommers et al., *Lancet* 2026 | "the primary outcome, interval cancer rate"; "interval cancers (primary breast cancers diagnosed between two screening rounds or within 2 years after the last scheduled screening…)" | 2026 |
| 14 | …no aumentaron con IA (pantalla: 1.55 contra 1.76 por cada mil) | ✅ | Gommers et al. 2026 | "Interval cancer rates were 1·55… and 1·76… per 1000 participants in the intervention and control group respectively, a non-inferior proportion ratio of 0·88" | 2026 |
| 15 | Se probó con un solo programa de IA (pantalla: Transpara) | ✅ | Hernström et al. 2025 | "The AI system (Transpara version 1.7.0 ScreenPoint Medical, Nijmegen, Netherlands)" | 2025 |
| 16 | La IA no reemplazó a nadie (cada estudio lo leyó al menos un radiólogo) | ✅ | Lång et al. 2023; Hernström 2025 | "triage screening examinations to single reading… or double reading" (siempre con radiólogo) | 2023/2025 |
| 17 | …más cánceres hallados a tiempo | ✅ | Hernström et al. 2025, Interpretación | "The findings suggest that AI contributes to the early detection of clinically relevant breast cancer and reduces screen-reading workload without increasing false positives." | 2025 |
| 18 | (solo en `publicacion.md`, LinkedIn) Los radiólogos de mama son especialistas escasos | ✅ | Nota de la Universidad de Lund (2026) | "read by two breast radiologists, a medical speciality that is in short supply" | 2026 |

## Correcciones hechas antes de aprobar
- ⚠️ → corregido: "En 2026 midieron…" se cambió a "En 2026 salió el dato principal…": el seguimiento se hizo antes; en 2026 se publicó.
- ⚠️ → evitado: no se dice que los cánceres de intervalo "bajaron" (1.55 contra 1.76 no es una diferencia significativa); la voz dice "no aumentaron".
- ⚠️ → evitado: no se usa el "20 % más" de 2023 (80,033 mujeres) porque hay un conteo más nuevo (2025, 105,934 mujeres: 6.4 contra 5.0 por cada mil).
- ⚠️ → corregido: "a la mitad" se descartó; la cifra exacta es 44.2 % y la voz dice "cuarenta y cuatro por ciento".

## Notas
- Las mamografías dibujadas son esquemáticas; no son imágenes del estudio.

VEREDICTO: APROBADO
