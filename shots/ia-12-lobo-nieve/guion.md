# Shot IA #12 · La IA no vio al lobo: vio la nieve

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #12 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (20 ✅ y 3 ⚠️ corregidas: radiografías en vez de pacientes, chips 99.95/99.98/95.6 %, explicación LIME como zonas y no mapa de calor) · animación, Robert en pantalla y `publicacion.md` listos · **voz pendiente de aprobación de Robert**.
- **Formato:** N5 "El experimento" (el clasificador lobo/husky entrenado mal a propósito y la prueba con 27 personas) + N1 "Por dentro" (qué mira la red por dentro: zonas de nieve resaltadas, la ficha de metal, la tinta).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla: «Esta IA no vio al lobo: vio la nieve».
- **Duración:** voz 948 caracteres / ≈ 165 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** estimados en la base.
- **Postura de la serie:** crítica con datos y consejo útil. Se aclara que el lobo/husky fue un experimento **hecho mal a propósito**; los casos médicos son reales (2018 y 2019, se dice el año). Nombre técnico (para descripción): "aprendizaje por atajo" (*shortcut learning*, Geirhos et al., 2020).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA no vio al lobo: vio la nieve. Y fue a propósito. | Fondo cian; desde el cuadro 0 la foto dibujada de un lobo sobre nieve, un escáner la barre y la etiqueta "LOBO ✔" cae. Luego aparece la explicación al estilo del artículo (LIME): unas zonas de la foto se quedan iluminadas y el resto se pone gris… y las zonas iluminadas son la nieve, no el animal. |
| 1 | Fotos | En 2016, en la Universidad de Washington, le dieron veinte fotos: lobos, siempre en nieve; huskies, nunca. | Tarjeta "2016 · Universidad de Washington · Ribeiro, Singh y Guestrin"; cuadrícula de 20 fotos dibujadas: lobos con nieve, huskies con pasto/fondo oscuro. Chip "entrenada mal a propósito". |
| 2 | Regla | Aprendió una regla tramposa: si hay nieve, es lobo. Sin importar el animal. | Regla en grande "nieve ➜ LOBO"; un husky en la nieve recibe "LOBO ✖" (el error de la figura 11 del artículo). |
| 3 | Prueba | Querían ver si alguien lo notaba. Diez de veintisiete estudiantes de posgrado confiaron en ella. / Al ver en qué se fijaba, casi todos notaron la nieve. | 27 muñequitos: 10 con pulgar arriba "confío" (antes). Aparece la explicación (zonas de nieve iluminadas, el resto en gris) y 25 de 27 se iluminan con "¡es la nieve!" (después); los que confían bajan a 3. |
| 4 | Pregunta | ¿Y si el atajo no lo pone nadie a propósito? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Hospital | En 2018, en Estados Unidos, probaron IA que buscaban neumonía en radiografías de tres hospitales. / En uno, una de cada tres radiografías tenía neumonía; en otro, casi ninguna. | Tres edificios de hospital con su pila de radiografías de tórax; tarjeta "2018 · PLOS Medicine · Zech et al."; barras de neumonía "34 %" contra "1 %". |
| 6 | Ficha | Y una red reconocía el hospital en casi cada placa, hasta por una ficha de metal. | **Por dentro de la máquina** (fondo oscuro): una radiografía con el mapa de calor encendido en la esquina, sobre la ficha metálica de lado (L/R); tres chips por hospital "99.95 % · 99.98 % · 95.6 % de las placas". |
| 7 | Lunares | En Alemania, en 2019, una IA de lunares vio tinta de cirujano: más de la mitad de los lunares sanos marcados pasaron por melanoma. | Tarjeta "2019 · Heidelberg, Alemania · JAMA Dermatology"; un lunar sano bajo el dermatoscopio; trazo de tinta violeta alrededor y la IA cambia a "MELANOMA ✖". Cuadrícula: más de la mitad de los sanos se pone roja (54 %). |
| 8 | Recorte | Al recortar la tinta, volvió a acertar. | Unas tijeras recortan la foto alrededor del lunar; la etiqueta vuelve a "sano ✔". |
| 9 | Cierre | Por eso una IA médica se prueba con datos de otros hospitales: si no, puede estar viendo la nieve. | Chip "pruébala con datos de fuera"; **regreso a la imagen del inicio**: la misma foto del lobo en la nieve (con sus zonas de nieve iluminadas) se hace chica y entra una foto nueva, un lobo sobre pasto: la IA dice "«husky» ✖" (lo que predice la regla, según el artículo) y aparece "¡atajo descubierto!". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, un poco fría (viento suave de nieve). El escáner zumba al barrer la foto, la etiqueta cae con un golpe seco, las 20 fotos suenan como obturador, los muñequitos como clics, el "?" con un acorde suspendido, las placas de rayos X con un "tac" de negatoscopio, la ficha de metal con un "tink", las tijeras con un corte, y el final se abre a un acorde mayor.

## Robert en pantalla

Tiempos de la base (estimados; con la voz real se recorren solos). Grande en «¿Y si el atajo no lo pone nadie a propósito?» y grande-izq en «más de la mitad… pasaron por melanoma».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.4 | 11_sorprendido | `gancho` | «Esta IA no vio al lobo: vio la nieve» (cuadro 0) |
| 2 | 6.5 | 9.7 | 13_senalando_arriba | `arriba-der` | señala las 20 fotos y «entrenada mal a propósito» |
| 3 | 11.4 | 14.3 | 04_bajando_lentes | `izq-alto` | «si hay nieve, es lobo» (el husky marcado como lobo) |
| 4 | 20.5 | 23.6 | 05_sonriendo_dientes_uniformes | `arriba-der` | «casi todos notaron la nieve» |
| 5 | 23.8 | 27.2 | 07_pensativo_puno | `grande` | «¿Y si el atajo no lo pone nadie a propósito?» |
| 6 | 32.8 | 36.9 | 10_serio_molesto | `izq-alto` | «una de cada tres… en otro, casi ninguna» |
| 7 | 39.3 | 42.0 | 06_pensativo_menton | `arriba-der` | «hasta por una ficha de metal» |
| 8 | 46.6 | 49.7 | 11_sorprendido | `grande-izq` | «más de la mitad de los lunares sanos… melanoma» |
| 9 | 53.4 | 58.2 | 13_senalando_arriba | `arriba-der` | «se prueba con datos de otros hospitales» |
| — | 58.3 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 30.7 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.8 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Ribeiro, M. T., Singh, S. y Guestrin, C. "“Why Should I Trust You?”: Explaining the Predictions of Any Classifier". *KDD 2016* (arXiv:1602.04938v3, 9 ago 2016). University of Washington, Seattle. (Datos de **2016**.)
   > "we take the task of distinguishing between photos of Wolves and Eskimo Dogs (huskies). We train a logistic regression classifier on a training set of 20 images, hand selected such that all pictures of wolves had snow in the background, while pictures of huskies did not."
   > "the classifier predicts “Wolf” if there is snow (or light background at the bottom), and “Husky” otherwise, regardless of animal color, position, pose, etc. We trained this bad classifier intentionally, to evaluate whether subjects are able to detect it."
   > "the set of subjects for this experiment were graduate students who have taken at least one graduate machine learning course."
   > Tabla 2: "Trusted the bad model — Before 10 out of 27, After 3 out of 27; Snow as a potential feature — Before 12 out of 27, After 25 out of 27."
   > "After examining the explanations, however, almost all of the subjects identified the correct insight".

2. Zech, J. R., Badgeley, M. A., Liu, M., Costa, A. B., Titano, J. J. y Oermann, E. K. "Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs: A cross-sectional study". *PLOS Medicine* 15(11): e1002683 (**2018**). DOI 10.1371/journal.pmed.1002683 · PMC6219764 (texto completo en Europe PMC). Autores de Icahn School of Medicine at Mount Sinai (Nueva York), California Pacific Medical Center y Verily (California).
   > "We assessed how well CNNs generalized across three hospital systems for a simulated pneumonia screening task."
   > "A total of 158,323 chest radiographs were drawn from three institutions: National Institutes of Health Clinical Center (NIH…), Mount Sinai Hospital (MSH…), and Indiana University Network for Patient Care (IU…)."
   > "The prevalence of pneumonia was high enough at MSH (34.2%) relative to NIH and IU (1.2% and 1.0%) that merely sorting by hospital system achieved an AUC of 0.861".
   > "A CNN trained to identify hospital systems accurately identified 22,050 / 22,062 (99.95%…) of NIH, 8,386 / 8,388 (99.98%…) of MSH, and 737 / 771 (95.59%…) of IU test radiographs".
   > Figura (mapas de activación): "we note that the CNN has learned to detect a metal token that radiology technicians place on the patient in the corner of the image field of view at the time they capture the image. When these strong features are correlated with disease prevalence, models can leverage them to indirectly predict disease."
   > "the more predictive a hospital system was of pneumonia, the more it was exploited to make predictions, which led to poor generalization on external datasets."
   > "Pneumonia-screening CNNs achieved better internal than external performance in 3 out of 5 natural comparisons."
   > Resumen del autor ("What do these findings mean?"): "The performance of CNNs in diagnosing diseases on X-rays may reflect not only their ability to identify disease-specific imaging findings on X-rays but also their ability to exploit confounding information. Estimates of CNN performance based on test data from hospital systems used for model training may overstate their likely real-world performance."

3. Winkler, J. K., Fink, C., et al. "Association Between Surgical Skin Markings in Dermoscopic Images and Diagnostic Performance of a Deep Learning Convolutional Neural Network for Melanoma Recognition". *JAMA Dermatology* 155(10): 1135–1141 (**2019**). DOI 10.1001/jamadermatol.2019.1735 · PMC6694463. Departamento de Dermatología, Universidad de Heidelberg, Alemania.
   > "To investigate the association between gentian violet surgical skin markings in dermoscopic images and the diagnostic performance of a CNN approved for use as a medical device in the European market."
   > "130 melanocytic lesions (107 benign nevi and 23 melanomas) were imaged. In unmarked lesions, the CNN achieved a sensitivity of 95.7%… and a specificity of 84.1%"
   > "In marked lesions, an increase in melanoma probability scores was observed that resulted in a sensitivity of 100%… and a significantly reduced specificity of 45.8%"
   > "Cropping images led to the highest sensitivity of 100%…, specificity of 97.2%… and ROC AUC of 0.993."
   > "skin markings significantly interfered with the CNN's correct diagnosis of nevi by increasing the melanoma probability scores and consequently the false-positive rate."

4. (Para descripción, no sale en la voz) Geirhos, R., Jacobsen, J.-H., Michaelis, C., Zemel, R., Brendel, W., Bethge, M. y Wichmann, F. A. "Shortcut learning in deep neural networks". *Nature Machine Intelligence* 2: 665–673 (**2020**). DOI 10.1038/s42256-020-00257-z · arXiv:2004.07780.
   > "Shortcuts are decision rules that perform well on standard benchmarks but fail to transfer to more challenging testing conditions, such as real-world scenarios."

## Afirmaciones comprobables (para el verificador)

| # | Afirmación (voz / pantalla) | Fuente | Frase de apoyo |
|---|---|---|---|
| 1 | La IA del experimento clasificaba "lobo" por la nieve, no por el animal | Ribeiro 2016 | "predicts “Wolf” if there is snow… regardless of animal color, position, pose" |
| 2 | Fue entrenada así a propósito | Ribeiro 2016 | "We trained this bad classifier intentionally" |
| 3 | 2016, Universidad de Washington | Ribeiro 2016 | afiliación y fecha del artículo (KDD 2016) |
| 4 | Veinte fotos de entrenamiento: lobos siempre con nieve, huskies nunca | Ribeiro 2016 | "training set of 20 images… all pictures of wolves had snow… huskies did not" |
| 5 | 10 de 27 estudiantes de posgrado confiaron en ella (antes de ver la explicación) | Ribeiro 2016 | Tabla 2 "Before 10 out of 27"; "graduate students" |
| 6 | Al ver la explicación, casi todos notaron la nieve (25 de 27) | Ribeiro 2016 | Tabla 2 "After 25 out of 27" |
| 7 | 2018, Estados Unidos, redes de neumonía en radiografías de 3 hospitales | Zech 2018 | "three hospital systems… pneumonia screening" (NIH, Mount Sinai, Indiana) |
| 8 | En uno, 1 de cada 3 radiografías con neumonía; en otro, casi ninguna | Zech 2018 | "MSH (34.2%)… NIH and IU (1.2% and 1.0%)" |
| 9 | Una red reconocía el hospital en casi cada placa | Zech 2018 | 99.95 % NIH, 99.98 % MSH, 95.59 % IU |
| 10 | …hasta por una ficha de metal (en la esquina) | Zech 2018 | "learned to detect a metal token… in the corner" |
| 11 | 2019, Alemania, IA de lunares; tinta de marcador quirúrgico | Winkler 2019 | Heidelberg; "gentian violet surgical skin markings"; "CNN approved… European market" |
| 12 | Más de la mitad de los lunares sanos marcados pasaron por melanoma | Winkler 2019 | especificidad 45.8 % con marcas → 54.2 % falsos positivos |
| 13 | Al recortar la tinta volvió a acertar | Winkler 2019 | recortadas: sensibilidad 100 %, especificidad 97.2 % |
| 14 | Consejo: probar la IA médica con datos de otros hospitales | Zech 2018 | "Estimates… based on test data from hospital systems used for model training may overstate their likely real-world performance" |
| 15 | (Pantalla) 34 % vs 1 %; 99.95 % · 99.98 % · 95.6 %; 54 % | Zech 2018 / Winkler 2019 | redondeos de 34.2 %, 1.2 %, 95.59 %, 54.2 % |

## Notas
- El lobo/husky **no** fue un error real de una IA en uso: los autores lo entrenaron mal a propósito para ver si la gente lo descubría. Así se dice en la voz ("Y fue a propósito") y en pantalla (chip "entrenada mal a propósito").
- "Una red reconocía el hospital": en Zech et al. fue una red entrenada para eso (identificar el hospital); la ficha de metal salió en sus mapas de activación. No se afirma que la red de neumonía mirara la ficha; el artículo dice que el hospital se podía detectar y que, cuanto más predecía la neumonía, más lo aprovechaban los modelos.
- "Una de cada tres radiografías" = 34.2 % de las placas de Mount Sinai (14,515 de 42,396; la cifra es por placa, no por paciente); "casi ninguna" = 1.2 % (NIH Clinical Center).
- La explicación del lobo/husky se dibuja como en el artículo (LIME): zonas de la foto (superpíxeles) iluminadas y el resto en gris, no un mapa de calor. El mapa de calor sí se usa en la radiografía (Zech dibujó "activation heatmaps").
- "Más de la mitad de los lunares sanos marcados pasaron por melanoma" = 100 % − 45.8 % de especificidad = 54.2 % de falsos positivos en lunares benignos con marcas (107 lunares benignos; las mismas lesiones fotografiadas con y sin marca).
- "Tinta de cirujano" = marcador quirúrgico de violeta de genciana (en la imagen se ve violeta/azul).
- El dibujo es esquemático: las fotos de lobos y huskies, las radiografías y los lunares son ilustraciones.

<!-- verificado y enviado a render: 29 oct 2026 -->
