# Verificación de hechos · Shot IA #18 · Una IA ve en tu retina lo que los oftalmólogos no saben ver

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).** Revisé `guion.md` (voz + columna "Lo que se ve" + notas) y `narracion.json` (idéntico a la voz del guion). No hay `.jsx` todavía.
- Fuentes abiertas: texto completo de Poplin et al. (arXiv 1708.09843, versión preprint del artículo de *Nat Biomed Eng* 2018); Korot et al. 2021 (PMC8119673); Abràmoff et al. 2018 (PMC6550188); resumen De Novo DEN180001 de la FDA (accessdata.fda.gov); comunicado de la FDA del 11 abr 2018 reproducido en hcinnovationgroup.com (la página de fda.gov ya no existe y web.archive.org no se pudo abrir desde aquí); nota de VCHRI (20 mar 2024) sobre Delavari et al., *PNAS Nexus* 2(9), 2023.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho: "algo que tus ojos **nunca** van a ver: si [la retina] es de hombre o de mujer" | ⚠️ | Delavari et al., *PNAS Nexus* 2(9) (nota VCHRI 2024); Korot et al., *Sci Rep* 2021 | "Prior to receiving this information, both groups' ability to detect sex difference in retinal images averaged 50 per cent." / tras entrenarlos con los rasgos que encontró la IA: "approximately 66 per cent accuracy" | 2023 |
| 2 | "Una IA sí lo ve" | ✅ | Poplin et al. 2018 | "gender (0.97 AUC)" | 2018 |
| 3 | La foto (de fondo de ojo) se toma por la pupila; se ven vasos de la retina, disco óptico (por donde sale el nervio óptico) y mácula | ✅ | Anatomía básica; Poplin 2018 menciona "optic disc or blood vessels" en las fotos de fondo | "the optic disc or blood vessels" | — |
| 4 | "En 2018, Google entrenó una IA…" / pantalla "2018 · Google (con Verily) · Poplin et al. · *Nature Biomedical Engineering*" | ✅ | Poplin et al., *Nat Biomed Eng* 2(3):158–164, en línea 19 feb 2018; autores de Google Research y Verily | (ficha del artículo; DOI 10.1038/s41551-018-0195-0) | 2018 |
| 5 | "…con fotos de los ojos de unos 284 mil pacientes" / pantalla "284 335 pacientes (UK Biobank + EyePACS)" | ✅ | Poplin 2018 | "Using models trained on data from 284,335 patients" · "retinal fundus images from 48,101 patients from UK Biobank and 236,234 patients from EyePACS" | 2018 |
| 6 | "Adivinó la edad con unos tres años de error" / pantalla "≈ 3 años" | ✅ | Poplin 2018 | "The mean absolute error (MAE) for predicting the patient's age was 3.26 years" (EyePACS-2K: "the MAE was 3.42") | 2018 |
| 7 | Pantalla: chip "edad: 57 ± 3 años" | ⚠️ | Poplin 2018 (media de validación UK Biobank 56.9 años) | "mean age was 56.9 ± 8.2 on the UK Biobank clinical validation set" | 2018 |
| 8 | "Con una retina de hombre y una de mujer, dice cuál es cuál 97 de cada 100 veces" / pantalla 100 pares, 97 ✔ y 3 ✘ | ✅ | Poplin 2018, Tabla 2 (0.97 en los dos grupos de validación). Es la definición estándar del AUC (probabilidad de ordenar bien un par al azar) | "Gender (AUC) 0.97 (0.966-0.971) … 0.50" | 2018 |
| 9 | "También estimó la presión arterial" / pantalla "presión ± 11" | ⚠️ (solo la pantalla) | Poplin 2018 | "systolic blood pressure (within 11.23mmHg)" | 2018 |
| 10 | "…y si fumas" / pantalla "fuma: 71 de 100" | ⚠️ (solo la pantalla) | Poplin 2018, Tabla 2 | "Current Smoker (AUC) 0.71 (0.70-0.73)" | 2018 |
| 11 | "Aunque ahí acertó menos" | ✅ | Poplin 2018 | Fumar AUC 0.71 vs sexo 0.97; presión con error de 11.23 mmHg | 2018 |
| 12 | "¿Cómo ve lo que ni los especialistas en retina saben ver?" / título "lo que los oftalmólogos no saben ver" | ✅ | Korot et al. 2021; reforzado por Delavari et al. 2023 (oftalmólogos sin entrenar ≈ 50 %, azar) | "Clinicians are currently unaware of distinct retinal feature variations between males and females" · "retina specialists cannot readily perform this task" | 2021 / 2023 |
| 13 | "Un mapa mostró dónde miraba: para la edad y la presión, los vasos" | ✅ | Poplin 2018, texto y Tabla 4 (vasos: edad 95 %, presión sistólica 98 %) | "the blood vessels were highlighted in the models trained to predict risk factors such as age, smoking, and SBP" | 2018 |
| 14 | "…para el sexo, sobre todo el disco óptico" | ✅ | Poplin 2018, texto y Tabla 4 (disco óptico 78 %, vasos 71 %) | "models trained to predict gender primarily highlighted the optic disc" | 2018 |
| 15 | Pantalla: mapa de calor **verde** sobre retina en gris | ✅ | Poplin 2018, Figura 2 | "The soft attention heatmap … is overlaid in green" (sobre la imagen "in black-and-white") | 2018 |
| 16 | "Es una pista, no un diagnóstico. Faltan más pruebas." | ✅ | Poplin 2018, limitaciones | "The dataset size is relatively small for deep learning." · "Additional validation of our models on other datasets would be beneficial for these predictions." | 2018 |
| 17 | "Ese año [2018], Estados Unidos autorizó una IA que revisa sola la retina…" / sello "FDA · abril 2018" | ✅ | Comunicado FDA 11 abr 2018 (reproducido en hcinnovationgroup.com); Abràmoff et al. 2018; De Novo DEN180001 | "IDx-DR is the first device authorized for marketing that provides a screening decision without the need for a clinician to also interpret the image or results" · "the first FDA authorized autonomous AI diagnostic system in any field of medicine" | 2018 |
| 18 | "…para detectar daño por diabetes" | ✅ | De Novo DEN180001 (FDA) | "IDx-DR is indicated for use by health care providers to automatically detect more than mild diabetic retinopathy (mtmDR) in adults diagnosed with diabetes" | 2018 |
| 19 | Pantalla: consultorio de medicina general | ✅ | Abràmoff et al. 2018 | "enrolled 900 subjects, with no history of DR at primary care clinics" | 2018 |
| 20 | Pantalla: "Referir al oftalmólogo / Sin daño" como "las dos respuestas posibles" | ⚠️ | Comunicado FDA 2018 (reproducción); De Novo DEN180001 | "one of two results: (1) 'more than mild diabetic retinopathy detected: refer to an eye care professional' or (2) 'negative for more than mild diabetic retinopathy; rescreen in 12 months.'" · el De Novo también lista la salida "insufficient quality" | 2018 |
| 21 | "Esa foto de tu ojo cuenta de ti mucho más de lo que tú puedes ver" | ✅ | Resume las filas 2, 6, 9, 10 (edad, sexo, presión, tabaquismo desde la foto) | — | 2018 |

## Correcciones necesarias

1. **Fila 1 · gancho "nunca van a ver" (⚠️).** Un estudio más nuevo (Delavari et al., *PNAS Nexus*, 2023) encontró rasgos (más vasos y un anillo más oscuro alrededor del disco óptico en hombres) y, tras enseñárselos a 26 oftalmólogos y 31 no expertos, pasaron de ~50 % a ~66 % de acierto. O sea, el ojo humano entrenado sí puede verlo un poco: "nunca" es exagerado. Propuesta (mantiene el gancho #7):
   > "En el fondo de tu ojo hay algo que tus ojos no saben ver: si es de hombre o de mujer. Una IA sí lo ve."
   (Opcional, si sobra tiempo en el cierre o la descripción: "En 2023 otros científicos copiaron lo que miraba la IA y enseñaron a oftalmólogos: pasaron de adivinar al azar a acertar 2 de cada 3".)
2. **Fila 7 · chip "edad: 57 ± 3 años" (⚠️).** Es un ejemplo inventado; en pantalla debe decirlo para que no parezca un paciente real. Propuesta: "edad (ejemplo): 57 ± 3 años" o "error promedio: ± 3 años" sin edad concreta.
3. **Fila 9 · chip "presión ± 11" (⚠️).** La cifra no dice de qué es ni la unidad. Propuesta: "presión sistólica: ± 11 mmHg de error".
4. **Fila 10 · chip "fuma: 71 de 100" (⚠️).** Es un AUC de 0.71: como el sexo, se refiere a **pares** (un fumador y un no fumador), no a 71 de cada 100 fotos. Propuesta: "fuma: acierta 71 de 100 pares" (igual que la cuadrícula de pares del sexo; el azar sería 50).
5. **Fila 20 · pantalla "Referir al oftalmólogo / Sin daño" (⚠️).** La respuesta negativa es "negativo para retinopatía más que leve; repetir en 12 meses" (puede haber daño leve), y refiere a "un profesional de la vista" (oftalmólogo u optometrista). Además existe una tercera salida, "calidad insuficiente". Propuesta: botones "Referir a especialista de la vista" / "Sin daño importante: repetir en 12 meses", y quitar "(las dos respuestas posibles)" o decir "si la foto sale bien, da una de dos respuestas".

Nota menor (no requiere cambio): la fecha del comunicado de la FDA (11 abr 2018) se confirmó solo en reproducciones del comunicado y en la referencia de Abràmoff 2018 (que lo cita con fecha 12 abr 2018); "abril 2018" es correcto con cualquiera de las dos. El resumen De Novo de la FDA dice "DATE OF DE NOVO: January 12, 2018" (fecha de la solicitud, no de la autorización).

## Re-verificación (29 oct 2026, coordinador)
Correcciones aplicadas tal como las propuso el verificador:
- Gancho: «En el fondo de tu ojo hay algo que tus ojos no saben ver: si es de hombre o de mujer. Una IA sí lo ve.» ✅ (Korot 2021: "retina specialists cannot readily perform this task")
- Pantalla: «edad (ejemplo): 57 ± 3 años» · «presión sistólica: ± 11 mmHg de error» · «fuma: acierta 71 de 100 pares» ✅
- Monitor FDA: «Referir a especialista de la vista / Sin daño importante: repetir en 12 meses» ✅
- Subtítulo del re-gancho: «¿Cómo ve lo que los expertos no?» (antes absoluto) ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
