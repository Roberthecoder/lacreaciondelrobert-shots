# Shot IA #37 · La IA que revisa tus lunares ve peor la piel oscura

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #37 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (19 ✅ · 3 ⚠️ leves corregidos, ver `verificacion.md`), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~949 créditos).
- **Formato:** N1 "Por dentro" (`Lupa` en rayos X sobre la piel del brazo: el lunar por fuera y el racimo de melanocitos por dentro) + un toque de N2 (7 de cada 10 contra 2 de cada 10).
- **Gancho (de los 7):** #2 "Tú contra el de al lado": tu piel oscura contra el güero de al lado.
- **Duración:** voz 949 caracteres / ~172 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** se reconoce lo que la IA logró (2017) y se critica con datos su punto ciego (2022); se cierra con un consejo útil (ABCDE + ir al dermatólogo). No se repite Winkler 2019 (ia-12) ni el sesgo en caras (ia-21).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Si tu piel es oscura, una IA que revisa lunares puede fallarte más que al güero de al lado. | Fondo menta. Desde el cuadro 0, dos antebrazos (piel oscura y piel clara), cada uno con un lunar; un celular con "IA de lunares" los escanea: en el claro sale ✔, en el oscuro parpadea "?". |
| 1 | Lupa | Un lunar es un racimo de células con pigmento. La IA solo ve su foto. | `Lupa` "AL MICROSCOPIO · células con pigmento" sobre el lunar: un nido de melanocitos (prolongaciones y gránulos de pigmento, fondo oscuro). Luego la lupa se cierra y el lunar se vuelve una foto de pixeles: "lo que ve la IA: pixeles". |
| 2 | Promesa | En Stanford, en 2017, entrenaron una con casi ciento treinta mil fotos de piel. | Tarjeta "2017 · Stanford · Esteva et al. · *Nature*"; cascada de fotitos de piel con contador que sube a "129,450 imágenes". |
| 2 | Promesa | Distinguió cáncer de lunar benigno tan bien como veintiún dermatólogos. | `Comparativa`: robotito contra 21 batas blancas; chip "nivel comparable". |
| 3 | Pregunta | ¿Y si casi no vio pieles como la tuya? | **Re-gancho.** "?" gigante; arriba, el mosaico de fotos con las pocas oscuras resaltadas (chip "ilustrativo"). Robert grande. |
| 4 | Estudio | En 2022, en Stanford, probaron con seiscientas cincuenta y seis fotos confirmadas por biopsia. | Tarjeta "2022 · Stanford · Daneshjou et al. · *Science Advances*"; cuadrícula de 656 fotos con tonos de piel diversos; sello "biopsia ✔". |
| 5 | Resultado | Una IA hecha con los datos de aquella encontró casi siete de cada diez cánceres en piel clara; en piel oscura, poco más de dos. | Chip "cánceres detectados de cada 10" e "IA hecha con los datos de 2017". Dos filas de 10 lunares: en piel clara se marcan casi 7 (69 %), en piel oscura 2 y un poquito (23 %). |
| 6 | Dermas | Los tres dermatólogos del estudio también fallaron más en piel oscura. | 3 dermatólogos mirando una foto; chip "3 dermatólogos, solo con fotos"; barras "cánceres detectados": 72 % (clara) contra 59 % (oscura). |
| 7 | Arreglo | Reentrenada con fotos de pieles diversas, la brecha se cerró. | El robotito "come" fotos de todos los tonos; dos barras (clara/oscura) se emparejan **sin números** (es otra métrica, ROC-AUC). |
| 8 | ABCDE | Revísate: asimetría, bordes irregulares, varios colores, casi siempre más de seis milímetros, y que cambie. | Cinco tarjetas A·B·C·D·E con un lunar dibujado para cada letra (mitades distintas, borde festoneado, varios tonos, regla con "suele ser > 6 mm", lunar que crece). |
| 8 | ABCDE | En piel oscura, mira también palmas, plantas de los pies y uñas. | Mano, planta del pie y uña con una línea oscura, marcadas con círculos. |
| 9 | Cierre | Tu piel no necesita una IA que adivine: si un lunar cambia, ve al dermatólogo. | **Regreso a la imagen del inicio**: los mismos dos antebrazos; el celular se tacha ("¿una IA que adivine? ✗"), entra una dermatóloga y los dos lunares quedan con ✔: "ve al dermatólogo ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; zumbido de escáner en el gancho, "pop" al entrar la lupa, cascada de clics con las fotos, golpe en cada lunar que se enciende (7 y 2), un acorde que se resuelve cuando las barras se emparejan, cinco toques suaves en el ABCDE.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y si casi no vio pieles como la tuya?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «puede fallarte más que al güero de al lado» (cuadro 0) |
| 2 | 6.5 | 9.6 | 06_pensativo_menton | `izq-alto` | «La IA solo ve su foto» |
| 3 | 15.0 | 18.9 | 13_senalando_arriba | `izq-alto` | señala a los 21 dermatólogos |
| 4 | 19.1 | 21.4 | 07_pensativo_puno | `grande` | «¿Y si casi no vio pieles como la tuya?» |
| 5 | 24.6 | 27.0 | 06_pensativo_menton | `arriba-der` | las 656 fotos confirmadas por biopsia |
| 6 | 30.7 | 34.6 | 11_sorprendido | `arriba-der` | «en piel oscura, poco más de dos» |
| 7 | 35.3 | 38.9 | 10_serio_molesto | `izq-alto` | «los dermatólogos también fallaron más» |
| 8 | 39.6 | 42.7 | 05_sonriendo_dientes_uniformes | `izq-alto` | «la brecha se cerró» |
| 9 | 49.5 | 53.1 | 13_senalando_arriba | `izq-alto` | «palmas, plantas de los pies y uñas» |
| 10 | 53.6 | 58.0 | 04_bajando_lentes | `arriba-der` | «si un lunar cambia, ve al dermatólogo» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 35.1 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (abiertas el 29 oct 2026)

1. Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M., Blau, H. M. y Thrun, S. "Dermatologist-level classification of skin cancer with deep neural networks". *Nature* 542: 115–118 (2017). DOI 10.1038/nature21056. Stanford University (resumen leído en Europe PMC).
   > "We train a CNN using a dataset of 129,450 clinical images—two orders of magnitude larger than previous datasets—consisting of 2,032 different diseases. We test its performance against 21 board-certified dermatologists on biopsy-proven clinical images with two critical binary classification use cases: keratinocyte carcinomas versus benign seborrheic keratoses; and malignant melanomas versus benign nevi."
   > "The CNN achieves performance on par with all tested experts across both tasks, demonstrating an artificial intelligence capable of classifying skin cancer with a level of competence comparable to dermatologists."
   > Afiliación: "Department of Electrical Engineering, Stanford University".
2. Daneshjou, R., Vodrahalli, K., Novoa, R. A., … Zou, J. y Chiou, A. S. "Disparities in dermatology AI performance on a diverse, curated clinical image set". *Science Advances* 8(31): eabq6147 (agosto de 2022). DOI 10.1126/sciadv.abq6147 · PMC9374341 (texto completo con la API de Europe PMC). Stanford School of Medicine.
   > "The DDI was retrospectively selected from reviewing histopathologically proven lesions diagnosed in Stanford Clinics from 2010 to 2020."
   > "Thirteen images did not meet quality metrics and were removed from analysis, leaving a total of 656 images."
   > "DeepDerm is an algorithm developed from using previously described data and similar parameters to the algorithm developed by Esteva et al. (4)."
   > "Across the entire DDI dataset, two algorithms showed statistically significant differential performance in detecting malignancies between FST I–II and FST V–VI: ModelDerm (sensitivity, 0.41 versus 0.12; …) and DeepDerm (sensitivity, 0.69 versus 0.23; Fisher's exact test P = 5.65 × 10−6)."
   > "We find that dermatologists, who often label AI datasets, also perform worse on images of dark skin tones and uncommon diseases." · "Label noise also varied between FST I–II and FST V–VI (sensitivity, 0.72 versus 0.59 …)"
   > "We found that the inclusion of the diverse DDI data with fine-tuning closed the gap in performance between FST I–II and FST V–VI (Fig. 2) for both DeepDerm and HAM10000."
   > "Many algorithms are trained or tested on the International Skin Imaging Collaboration (ISIC) dataset, which … lacks images of inflammatory and uncommon diseases, or images across diverse skin tones" (base del re-gancho, que se dice como pregunta).
3. National Cancer Institute (EE. UU.). "Common Moles, Dysplastic Nevi, and Risk of Melanoma" (revisado el 17 nov 2022). https://www.cancer.gov/types/skin/moles-fact-sheet
   > "A common mole is a growth on the skin that develops when pigment cells (melanocytes) grow in clusters."
4. American Academy of Dermatology. "What to look for: ABCDEs of melanoma". https://www.aad.org/public/diseases/skin-cancer/find/at-risk/abcdes
   > "A is for Asymmetry: One half of the spot is unlike the other half. B is for Border: The spot has an irregular, scalloped, or poorly defined border. C is for Color: The spot has varying colors from one area to the next… D is for Diameter: While melanomas are usually greater than 6 millimeters, or about the size of a pencil eraser, when diagnosed, they can be smaller. E is for Evolving: The spot looks different from the rest or is changing in size, shape, or color."
   > "If you notice any new spots on your skin, spots that are different from others, or spots that are changing, itching or bleeding, make an appointment to see a board-certified dermatologist."
5. American Academy of Dermatology. "Skin cancer in people of color / darker skin tones". https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/skin-color
   > "If you have a darker skin tone, skin cancer may show up in areas that receive little, if any, sun. This includes your: Palms Soles Fingers and toes Nails …"

## Notas
- "Piel clara" = Fitzpatrick I–II; "piel oscura" = Fitzpatrick V–VI (así lo define el estudio de 2022). "Casi siete de cada diez" = sensibilidad 0.69; "poco más de dos" = 0.23 (DeepDerm, que se armó con los datos y parámetros parecidos al algoritmo de Esteva 2017; no es el mismo modelo, por eso la voz dice "hecha con los datos de aquella").
- "Casi ciento treinta mil fotos" = 129,450 (en pantalla va la cifra exacta). "Veintiún dermatólogos" = 21 dermatólogos certificados; la comparación fue en dos tareas (carcinoma vs. queratosis seborreica y melanoma vs. lunar benigno), resumidas como "cáncer de lunar benigno".
- Dermatólogos 72 % vs 59 %: sensibilidad del consenso de los tres dermatólogos del estudio (solo con fotos) en piel clara vs. oscura; el estudio no afirma nada de los dermatólogos en general.
- La brecha que "se cerró" se mide con otra métrica (ROC-AUC 0.73 vs 0.76 tras reentrenar DeepDerm): en pantalla las barras van sin números.
- "Casi siempre más de seis milímetros" es la D del ABCDE; la AAD aclara que pueden ser más chicos. En pantalla: "suele ser > 6 mm".
- El re-gancho "¿Y si casi no vio pieles como la tuya?" es pregunta, no afirmación; la base es que la colección ISIC (usada por muchos algoritmos, y una de las fuentes de datos de DeepDerm) carece de tonos de piel diversos.
- Adamson y Smith (JAMA Dermatology 2018, 154: 1247–1248) no se cita en la voz: no se pudo abrir el texto completo.
- El dibujo es esquemático; la cascada de fotos "casi todas claras" es ilustrativa.
