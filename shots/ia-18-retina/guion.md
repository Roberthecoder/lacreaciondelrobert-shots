# Shot IA #18 · Una IA ve en tu retina lo que ningún oftalmólogo sabe ver

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #18 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía. Voz pendiente de aprobación de Robert.
- **Formato:** N1 "Por dentro": de tu ojo (macro) → por la pupila a la foto de la retina (fondo oscuro) → el mapa de atención de la IA → de regreso al mismo ojo, transformado.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": si una retina es de hombre o de mujer.
- **Duración:** voz 952 caracteres (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados.
- **Postura de la serie:** a favor con datos (la IA encontró una señal que los humanos no conocían) y crítica (es una pista, no un diagnóstico). El estudio es de **2018** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En el fondo de tu ojo hay algo que tus ojos nunca van a ver: si es de hombre o de mujer. Una IA sí lo ve. | Fondo cian; desde el cuadro 0 un ojo grande que parpadea; la cámara entra por la pupila y aparece la foto de la retina (círculo naranja con vasos rojos). Dos chips "♂ ?" "♀ ?" y el robotito con lupa. |
| 1 | Foto | La foto se toma por la pupila: se ven los vasos de la retina y el disco óptico, por donde sale el nervio. | Corte lateral esquemático del ojo: un haz de la cámara entra por la pupila y llega al fondo. Zoom a la retina (fondo oscuro): etiquetas "vasos sanguíneos", "disco óptico" (el punto claro), "mácula". |
| 2 | Estudio | En 2018, Google entrenó una IA con fotos de los ojos de unos doscientos ochenta y cuatro mil pacientes. | Tarjeta "2018 · Google (con Verily) · Poplin et al. · *Nature Biomedical Engineering*"; contador que sube a "284 335 pacientes" (UK Biobank + EyePACS). Retinas en mosaico que entran a una red neuronal. |
| 3 | Edad | Con solo la foto, adivinó la edad con unos tres años de error. | Retina → la red → chip "edad: 57 ± 3 años" (ejemplo ilustrativo); medidor de error "≈ 3 años". |
| 4 | Sexo | Con una retina de hombre y una de mujer, dice cuál es cuál noventa y siete de cada cien veces. | Dos retinas lado a lado; la IA las ordena; 100 pares en cuadrícula, 97 con palomita verde y 3 con tache. |
| 5 | Presion | También estimó la presión arterial y si fumas, aunque ahí acertó menos. | Dos chips más chicos: un baumanómetro "presión ± 11" y un cigarro "fuma: 71 de 100"; barras más cortas que la del sexo. |
| 6 | Pregunta | ¿Cómo ve lo que ni los especialistas en retina saben ver? | **Re-gancho.** "?" gigante sobre la retina; un oftalmólogo dibujado con lupa, rascándose la cabeza; Robert grande. |
| 7 | Mapa | Un mapa mostró dónde miraba: para la edad y la presión, los vasos; para el sexo, sobre todo el disco óptico. | Fondo de circuito ("por dentro de la máquina"): la retina en gris y un mapa de calor verde que se enciende sobre los vasos (edad, presión) y luego sobre el disco óptico (sexo). |
| 8 | Ojo | Ojo: es una pista, no un diagnóstico. Faltan más pruebas. | Chip "pista ≠ diagnóstico"; lupa sobre un expediente con "faltan pruebas". |
| 9 | UsoReal | Lo que sí se usa: ese año, Estados Unidos autorizó una IA que revisa sola la retina para detectar daño por diabetes. | Consultorio de medicina general: cámara de retina, pantalla con "Referir al oftalmólogo / Sin daño" (las dos respuestas posibles); sello "FDA · abril 2018". |
| 10 | Cierre | Así que esa foto de tu ojo cuenta de ti mucho más de lo que tú puedes ver. | **Regreso a la imagen del inicio**: el mismo ojo que parpadea, ahora con la retina iluminada por el mapa verde y los chips de edad, presión y sexo alrededor. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y suave; parpadeo con un "swish", el zoom por la pupila con un barrido; el contador de pacientes con tecleo; cada palomita de los 97 pares con un "tic" breve; el mapa de calor se enciende con un zumbido eléctrico; el sello de la FDA con golpe seco; al final un acorde abierto.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Poplin, R., Varadarajan, A. V., Blumer, K., Liu, Y., McConnell, M. V., Corrado, G. S., Peng, L. y Webster, D. R. "Prediction of cardiovascular risk factors from retinal fundus photographs via deep learning". *Nature Biomedical Engineering* 2(3): 158–164 (publicado en línea el 19 feb 2018). DOI 10.1038/s41551-018-0195-0. Texto completo leído en la versión de arXiv 1708.09843 (Google Research / Verily); ficha de PubMed 31015713 consultada.
   > "Using models trained on data from 284,335 patients, and validated on two independent datasets of 12,026 and 999 patients, we predict cardiovascular risk factors not previously thought to be present or quantifiable in retinal images, such as such as age (within 3.26 years), gender (0.97 AUC), smoking status (0.71 AUC), HbA1c (within 1.39%), systolic blood pressure (within 11.23mmHg) as well as major adverse cardiac events (0.70 AUC)."
   > "We developed deep learning models using retinal fundus images from 48,101 patients from UK Biobank and 236,234 patients from EyePACS"
   > "The mean absolute error (MAE) for predicting the patient's age was 3.26 years (95% confidence interval (CI): (3.22, 3.31) versus baseline 7.06 … For the EyePACS-2k, the MAE was 3.42"
   > Tabla 2: "Gender (AUC) 0.97 (0.966-0.971) … baseline 0.50"; "Current Smoker (AUC) 0.71 (0.70-0.73)".
   > "the blood vessels were highlighted in the models trained to predict risk factors such as age, smoking, and SBP. … models trained to predict gender primarily highlighted the optic disc."
   > Tabla 4 (100 mapas por factor, revisados por 3 oftalmólogos): vasos — edad 95 %, fumador 91 %, presión sistólica 98 %; disco óptico — sexo 78 % (vasos 71 %).
   > Limitaciones: "The dataset size is relatively small for deep learning… Additional validation of our models on other datasets would be beneficial for these predictions."
2. Peng, L. "Assessing Cardiovascular Risk Factors with Computer Vision". Blog de Google Research, 19 feb 2018.
   > "our algorithm could distinguish the retinal images of a smoker from that of a non-smoker 71% of the time" · "predict the systolic blood pressure within 11 mmHg on average" · "each CV risk factor prediction uses a distinct pattern, such as blood vessels for blood pressure, and optic disc for other predictions."
3. Korot, E. et al. "Predicting sex from retinal fundus photographs using automated deep learning". *Scientific Reports* 11: 10286 (2021). DOI 10.1038/s41598-021-89743-x · PMC8119673 (texto completo, Europe PMC).
   > "Clinicians are currently unaware of distinct retinal feature variations between males and females"
   > "that is, retina specialists cannot readily perform this task."
   > "More surprising to ophthalmologists was the successful prediction of demographic information such as age and gender, the latter with an area under the curve (AUC) of 0.97."
4. Abràmoff, M. D., Lavin, P. T., Birch, M., Shah, N. y Folk, J. C. "Pivotal trial of an autonomous AI-based diagnostic system for detection of diabetic retinopathy in primary care offices". *npj Digital Medicine* 1: 39 (2018). DOI 10.1038/s41746-018-0040-6 · PMC6550188.
   > "This pivotal trial of an AI system to detect diabetic retinopathy (DR) in people with diabetes enrolled 900 subjects, with no history of DR at primary care clinics"
   > "Based on these results, FDA authorized the system for use by health care providers to detect more than mild DR and diabetic macular edema, making it, the first FDA authorized autonomous AI diagnostic system in any field of medicine"
5. FDA, comunicado del 11 abr 2018, "FDA permits marketing of artificial intelligence-based device to detect certain diabetes-related eye problems" (IDx-DR, vía De Novo). La página original ya no está en fda.gov (404); el texto se leyó reproducido en medios (hcinnovationgroup.com, crstoday.com): "If the images are of sufficient quality, the software provides the doctor with one of two results: (1) 'more than mild diabetic retinopathy detected: refer to an eye care professional' or (2) 'negative for more than mild diabetic retinopathy; rescreen in 12 months.'" — *pendiente de confirmar por el verificador en una copia archivada.*

## Notas
- **"Noventa y siete de cada cien veces"** es la forma sencilla de decir AUC = 0.97: si le das una retina de hombre y una de mujer al azar, la IA le da más puntaje "hombre" a la del hombre el 97 % de las veces (definición estándar del AUC; el azar sería 50 %). Por eso la voz dice "con una retina de hombre y una de mujer", no "acierta el 97 % de las fotos".
- **"Unos tres años de error"** = error absoluto promedio de 3.26 años (UK Biobank) y 3.42 (EyePACS).
- **"Aunque ahí acertó menos"**: fumar AUC 0.71 (71 de cada 100 pares) y presión sistólica con ±11.23 mmHg de error promedio; menos preciso que sexo y edad. No se dan las cifras en la voz; en pantalla sí ("71 de 100", "± 11").
- **"Ni los especialistas en retina saben ver"** se apoya en Korot 2021 ("retina specialists cannot readily perform this task"). El gancho "tus ojos nunca van a ver" se refiere al espectador a simple vista.
- **"Google entrenó"**: los autores son de Google Research y Verily (empresa de Alphabet); en pantalla se dice "Google (con Verily)".
- **"Para la edad y la presión, los vasos"**: Tabla 4 (95 % y 98 % de los mapas). Fumar también (91 %), pero no se dice para ahorrar tiempo. Para el sexo, "sobre todo el disco óptico" (78 %; vasos 71 %).
- **"Ese año, Estados Unidos autorizó una IA que revisa sola la retina"**: FDA, abril de 2018, IDx-DR (hoy LumineticsCore), autónoma: no necesita que un médico interprete la foto. Detecta retinopatía diabética "más que leve" y edema macular diabético.
- "Faltan más pruebas" resume las limitaciones del paper (base de datos chica para deep learning; validar en otras poblaciones). La IA de Poplin no es un producto aprobado.
- La edad de ejemplo del chip ("57 ± 3") es ilustrativa (la media del grupo de validación de UK Biobank fue 56.9 años). El dibujo de la retina y del ojo es esquemático.
