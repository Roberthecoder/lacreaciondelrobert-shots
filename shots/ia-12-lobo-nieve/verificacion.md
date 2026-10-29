# Verificación de hechos · Shot IA #12 · La IA no vio al lobo: vio la nieve

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuentes abiertas: arXiv:1602.04938v3 (PDF completo, sección 6.4, Tabla 2, Fig. 11); PMC6219764 (Zech 2018, texto completo); PMC6694463 (Winkler 2019, texto completo).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | "Esta IA no vio al lobo: vio la nieve" (clasificaba por la nieve, no por el animal) | ✅ | Ribeiro, Singh, Guestrin, KDD 2016, §6.4 | "the classifier predicts “Wolf” if there is snow (or light background at the bottom), and “Husky” otherwise, regardless of animal color, position, pose, etc." | 2016 |
| 2 | "Y fue a propósito" / chip "entrenada mal a propósito" | ✅ | Ribeiro 2016, §6.4 | "We trained this bad classifier intentionally, to evaluate whether subjects are able to detect it." | 2016 |
| 3 | 2016, Universidad de Washington; tarjeta "Ribeiro, Singh y Guestrin" | ✅ | Ribeiro 2016 (encabezado del artículo) | Los tres autores: "University of Washington" (KDD 2016, arXiv v3 ago 2016) | 2016 |
| 4 | Veinte fotos; lobos siempre en nieve, huskies nunca | ✅ | Ribeiro 2016, §6.4 | "We train a logistic regression classifier on a training set of 20 images, hand selected such that all pictures of wolves had snow in the background, while pictures of huskies did not." | 2016 |
| 5 | "Regla tramposa: si hay nieve, es lobo. Sin importar el animal" | ✅ | Ribeiro 2016, §6.4 | "regardless of animal color, position, pose, etc." | 2016 |
| 6 | (Pantalla) Un husky en la nieve recibe "LOBO ✖" (Fig. 11) | ✅ | Ribeiro 2016, Fig. 11 | "(a) Husky classified as wolf" / "one husky is (and is thus predicted as “Wolf”)" | 2016 |
| 7 | "Querían ver si alguien lo notaba" | ✅ | Ribeiro 2016, §6.4 | "to evaluate whether subjects are able to detect it." | 2016 |
| 8 | Diez de veintisiete estudiantes de posgrado confiaron en ella (antes de la explicación) | ✅ | Ribeiro 2016, Tabla 2 y §6.4 | "Trusted the bad model — Before 10 out of 27"; "the set of subjects for this experiment were graduate students who have taken at least one graduate machine learning course" | 2016 |
| 9 | Al ver en qué se fijaba, casi todos notaron la nieve (pantalla: 25 de 27; confían bajan a 3) | ✅ | Ribeiro 2016, Tabla 2 | "Snow as a potential feature — After 25 out of 27"; "Trusted the bad model — After 3 out of 27"; "almost all of the subjects identified the correct insight" | 2016 |
| 10 | (Pantalla) "Mapa de calor" que se enciende sobre la nieve | ⚠️ | Ribeiro 2016, Fig. 4 y 11b | El método (LIME) explica con zonas de la foto ("superpixels explanations"), no con un mapa de calor; además la Fig. 11b es de un husky, no de un lobo. Es dibujo esquemático, pero mejor representarlo como zonas recortadas/resaltadas. | 2016 |
| 11 | 2018, Estados Unidos, IA que buscaban neumonía en radiografías de tres hospitales | ✅ (simplificación) | Zech et al., PLOS Medicine 15(11): e1002683, 6 nov 2018 | "We assessed how well CNNs generalized across three hospital systems for a simulated pneumonia screening task." (NIH Clinical Center, Mount Sinai Hospital, Indiana University Network for Patient Care; todos en EE. UU.). Son "sistemas hospitalarios"; "hospitales" es aceptable. | 2018 |
| 12 | "En uno, uno de cada tres pacientes tenía neumonía" | ⚠️ | Zech 2018, Tabla 1 | "Positive cases of pneumonia were remarkably more prevalent in MSH data (34.2%)" — es 14,515 de 42,396 **radiografías**, no pacientes (Mount Sinai tenía 12,904 pacientes). La cifra está contada por placa. | 2018 |
| 13 | "En otro, casi nadie" (pantalla: 34 % vs 1 %) | ✅ | Zech 2018 | "MSH (34.2%) relative to NIH and IU (1.2% and 1.0%)" — 1 % es correcto como redondeo de 1.0 % (IU) o 1.2 % (NIH). | 2018 |
| 14 | "Una red reconocía el hospital en casi cada placa" | ✅ | Zech 2018 | "A CNN trained to identify hospital systems accurately identified 22,050 / 22,062 (99.95%) of NIH, 8,386 / 8,388 (99.98%) of MSH, and 737 / 771 (95.59%) of IU test radiographs" (en total 31,173 de 31,221 = 99.8 %) | 2018 |
| 15 | (Pantalla) chip "hospital adivinado: 99.9 %" | ⚠️ | Zech 2018 | Mismas cifras: 99.95 % y 99.98 % en dos hospitales, pero 95.59 % en Indiana; el total da 99.8 %, no 99.9 %. Un solo "99.9 %" no corresponde a ninguna cifra global. | 2018 |
| 16 | "Hasta por una fichita de metal" (pantalla: en la esquina, marcador de lado L/R) | ✅ | Zech 2018, Fig. 2 y Discusión | "we note that the CNN has learned to detect a metal token that radiology technicians place on the patient in the corner of the image field of view"; "metallic tokens indicating laterality often appeared in radiographs in a site-specific way." (La figura es de la red que identifica el hospital, como dice la voz.) | 2018 |
| 17 | (Pantalla) mapa de calor en la radiografía | ✅ | Zech 2018, Fig. 2 | "We obtained activation heatmaps from our trained model" | 2018 |
| 18 | 2019, Alemania (Heidelberg), JAMA Dermatology, IA de lunares | ✅ | Winkler et al., JAMA Dermatol 155(10):1135–1141, en línea 14 ago 2019 | Afiliación: "Department of Dermatology, University of Heidelberg, Heidelberg, Germany"; "a CNN approved for use as a medical device in the European market" | 2019 |
| 19 | "Vio tinta de cirujano" (marcador quirúrgico violeta) | ✅ | Winkler 2019 | "gentian violet surgical skin markings in dermoscopic images" | 2019 |
| 20 | "Más de la mitad de los lunares sanos marcados pasaron por melanoma" (pantalla: 54 %) | ✅ | Winkler 2019 | "In marked lesions… a sensitivity of 100% and a significantly reduced specificity of 45.8%" (107 nevos benignos) → 54.2 % de falsos positivos; "skin markings significantly interfered with the CNN's correct diagnosis of nevi by increasing the melanoma probability scores and consequently the false-positive rate." | 2019 |
| 21 | "Al recortar la tinta, volvió a acertar" | ✅ | Winkler 2019 | "the markings were removed by manually cropping the dermoscopic images"; "Cropping images led to the highest sensitivity of 100%, specificity of 97.2%" (sin marcas: 84.1 %) | 2019 |
| 22 | "Por eso una IA médica se prueba con datos de otros hospitales: si no, puede estar viendo la nieve" | ✅ (consejo respaldado) | Zech 2018, resumen del autor | "Estimates of CNN performance based on test data from hospital systems used for model training may overstate their likely real-world performance." | 2018 |
| 23 | Año de cada dato dicho en voz (2016, 2018, 2019; todos > 2 años) | ✅ | — | La voz dice "En 2016", "En 2018", "en 2019". Cifras con su "de qué es". No encontré datos más nuevos que contradigan. | — |

## Correcciones necesarias

1. **#12 ⚠️ "uno de cada tres pacientes tenía neumonía"** — la cifra (34.2 %) es por radiografía, no por paciente.
   Propuesta de voz: «En uno, una de cada tres radiografías tenía neumonía; en otro, casi ninguna.» (misma duración aprox.)
2. **#15 ⚠️ chip "hospital adivinado: 99.9 %"** — no corresponde a la cifra global (99.8 %) y oculta el 95.6 % de Indiana.
   Propuesta de pantalla: «hospital adivinado: 99.8 % de las placas» o, más exacto, tres chips «99.95 % · 99.98 % · 95.6 %».
3. **#10 ⚠️ (pantalla) "mapa de calor" sobre la nieve del lobo** — la explicación del artículo (LIME) muestra zonas de la foto resaltadas (superpíxeles), y la figura del artículo es la de un husky clasificado como lobo.
   Propuesta: dibujar la explicación como parches/zonas de la foto que se quedan iluminadas (el resto gris) en vez de un degradado de calor; o mantener el dibujo y que la descripción diga "el dibujo es esquemático". En la voz no hay que cambiar nada.

## Re-verificación (29 oct 2026, coordinador)
- #12 voz: «En uno, una de cada tres radiografías tenía neumonía; en otro, casi ninguna.» (14,515 de 42,396 placas en Mount Sinai = 34.2 %; NIH 1.2 %, IU 1.0 %) ✅
- «…hasta por una ficha de metal» (solo se quitó el diminutivo) ✅
- #15 pantalla: tres chips por hospital «NIH 99.95 % · Mount Sinai 99.98 % · Indiana 95.6 %» (Zech 2018, cifras textuales de la tabla) ✅
- #10 pantalla: zonas de la foto (superpíxeles) resaltadas y el resto en gris, como la figura de LIME ✅
- Cierre: lobo sobre pasto → la IA dice «husky». Coincide con el artículo: el clasificador "predicts 'Wolf' if there is snow… and 'Husky' otherwise" ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
