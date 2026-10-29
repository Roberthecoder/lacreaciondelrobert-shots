# Verificación de hechos · Shot IA #37 · La IA que revisa tus lunares ve peor la piel oscura

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion).
- Fuentes abiertas: texto completo de Daneshjou 2022 (Europe PMC, PMC9374341, XML completo); resumen y afiliación de Esteva 2017 (Europe PMC, DOI 10.1038/nature21056); páginas de NCI y AAD abiertas directamente.
- Definiciones del estudio de 2022: "piel clara" = Fitzpatrick I–II (208 fotos); "piel oscura" = Fitzpatrick V–VI (207 fotos). 0.69 y 0.23 son **sensibilidad** (proporción de cánceres confirmados que el modelo detectó), no exactitud ni AUC.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Voz, gancho) Si tu piel es oscura, una IA que revisa lunares puede fallarte más que a la persona güera de al lado | ✅ (dicho con "puede") | Daneshjou et al., *Science Advances* 8: eabq6147 | "State-of-the-art dermatology AI algorithms have substantially worse performance on lesions appearing on dark skin compared to light skin using biopsy-proven malignancies" | 2022 |
| 2 | (Pantalla, gancho) Un celular con "app de lunares" da ✔ en piel clara y "?" en piel oscura | ⚠️ leve (presentación) | Daneshjou 2022 | Los modelos probados son algoritmos de investigación (DeepDerm, HAM10000) y ModelDerm (API en línea); el estudio no evaluó apps de celular comerciales. "the two algorithms for which we had access to model weights" | 2022 |
| 3 | Un lunar es un racimo de células con pigmento | ✅ | NCI, "Common Moles, Dysplastic Nevi, and Risk of Melanoma" (revisado 17 nov 2022) | "A common mole is a growth on the skin that develops when pigment cells (melanocytes) grow in clusters." | 2022 |
| 4 | La IA solo ve su foto | ✅ | Esteva et al., *Nature* 542: 115–118 | "trained end-to-end from images directly, using only pixels and disease labels as inputs" | 2017 |
| 5 | En Stanford, en 2017 (pantalla: "2017 · Stanford · Esteva et al. · *Nature*") | ✅ | Esteva 2017 (afiliación en Europe PMC) | "Department of Electrical Engineering, Stanford University, Stanford, California, USA." | 2017 |
| 6 | Entrenaron una con casi 130 mil fotos de piel (pantalla: 129,450 imágenes) | ✅ | Esteva 2017 | "We train a CNN using a dataset of 129,450 clinical images" | 2017 |
| 7 | Distinguió cáncer de lunar benigno tan bien como 21 dermatólogos (chip "nivel comparable") | ✅ (simplificación aceptable) | Esteva 2017 | "We test its performance against 21 board-certified dermatologists on biopsy-proven clinical images with two critical binary classification use cases: keratinocyte carcinomas versus benign seborrheic keratoses; and malignant melanomas versus benign nevi." / "The CNN achieves performance on par with all tested experts across both tasks" | 2017 |
| 8 | (Re-gancho, pregunta) ¿Y si casi no vio pieles como la tuya? + pantalla: cascada "casi todas de tono claro (ilustrativo)" | ✅ como pregunta / ilustrativo | Daneshjou 2022 | "Many algorithms are trained or tested on the International Skin Imaging Collaboration (ISIC) dataset, which … lacks … images across diverse skin tones"; los datos de DeepDerm "include ISIC". Esteva 2017 no reporta tonos de piel: no se puede afirmar como hecho, solo como pregunta (así está). | 2022 |
| 9 | En 2022, otra vez en Stanford | ✅ | Daneshjou 2022 | "Department of Dermatology, Stanford School of Medicine" / "lesions diagnosed in Stanford Clinics from 2010 to 2020" | 2022 |
| 10 | Probaron con 656 fotos confirmadas por biopsia (pantalla: cuadrícula de 656, tonos diversos, sello "biopsia ✔") | ✅ | Daneshjou 2022 | "The DDI was retrospectively selected from reviewing histopathologically proven lesions" / "leaving a total of 656 images" / "208 images of FST I–II …, 241 images of FST III–IV …, and 207 images of FST V–VI" | 2022 |
| 11 | "Una IA hecha con los datos de aquella" (DeepDerm ≠ el modelo de Esteva) | ✅ (la voz NO dice "la misma IA"; correcto) | Daneshjou 2022 | "DeepDerm is an algorithm developed from using previously described data and similar parameters to the algorithm developed by Esteva et al." / "The data sources include ISIC, two datasets sourced from Stanford hospital, Edinburgh Dermofit Library, and open-access data available on the web, as previously described (4)" | 2022 |
| 12 | Encontró casi 7 de cada 10 cánceres en piel clara (pantalla 69 %) | ✅ (sensibilidad 0.69, FST I–II) | Daneshjou 2022 | "DeepDerm (sensitivity, 0.69 versus 0.23; Fisher's exact test P = 5.65 × 10−6)" | 2022 |
| 13 | En piel oscura, poco más de 2 (pantalla 23 %) | ✅ (sensibilidad 0.23, FST V–VI) | Daneshjou 2022 | ídem | 2022 |
| 14 | Los dermatólogos también fallaron más en piel oscura (pantalla: 72 % contra 59 %) | ⚠️ leve (generaliza) | Daneshjou 2022 | "Label noise also varied between FST I–II and FST V–VI (sensitivity, 0.72 versus 0.59; Fisher's exact test P = 8.8 × 10−6)". Eran 3 dermatólogos viendo solo fotos (consenso), y los autores aclaran: "we make no claims regarding overall general dermatologists' performance" | 2022 |
| 15 | Al entrenarla con fotos de pieles diversas, la diferencia se cerró (pantalla: barras de la IA se emparejan) | ✅ | Daneshjou 2022 | "We found that the inclusion of the diverse DDI data with fine-tuning closed the gap in performance between FST I–II and FST V–VI (Fig. 2) for both DeepDerm and HAM10000." (DeepDerm afinado: ROC-AUC 0.73 en I–II vs 0.76 en V–VI) | 2022 |
| 16 | ABCDE: asimetría | ✅ | AAD, "What to look for: ABCDEs of melanoma" | "A is for Asymmetry: One half of the spot is unlike the other half." | consultada 2026 |
| 17 | Bordes irregulares | ✅ | AAD | "The spot has an irregular, scalloped, or poorly defined border." | consultada 2026 |
| 18 | Varios colores | ✅ | AAD | "The spot has varying colors from one area to the next" | consultada 2026 |
| 19 | (Voz) "más de seis milímetros" / (pantalla) "suele ser > 6 mm", "como una goma de lápiz" | ⚠️ leve (voz absoluta) | AAD; NCI 2022 | "While melanomas are usually greater than 6 millimeters, or about the size of a pencil eraser, when diagnosed, they can be smaller." / NCI: "Melanomas can be tiny, but most are larger than 6 millimeters wide" | 2022 / consultada 2026 |
| 20 | Que cambie | ✅ | AAD | "E is for Evolving: The spot looks different from the rest or is changing in size, shape, or color." | consultada 2026 |
| 21 | En piel oscura, mira también palmas, plantas de los pies y uñas (pantalla: uña con línea oscura) | ✅ | AAD, "Skin cancer in people of color" (actualizada 3 jun 2025) | "If you have a darker skin tone, skin cancer may show up in areas that receive little, if any, sun. This includes your: Palms Soles Fingers and toes Nails …" / "A change to your nail, such as a dark line or streak, might be a sign of melanoma." | 2025 |
| 22 | Si un lunar cambia, ve al dermatólogo | ✅ | AAD (ABCDEs) | "If you notice any new spots on your skin, spots that are different from others, or spots that are changing, itching or bleeding, make an appointment to see a board-certified dermatologist." | consultada 2026 |

**Resumen:** 19 ✅ · 3 ⚠️ (leves) · 0 ❌. La cifra 0.69 vs 0.23 está bien atribuida (sensibilidad de DeepDerm, Fitzpatrick I–II vs V–VI) y la voz no dice que sea "la misma IA" de 2017.

## Correcciones necesarias

1. **#14 · Dermatólogos (voz).** Generaliza a "los dermatólogos" cuando fueron 3 dermatólogos etiquetando solo con fotos, y el estudio dice que no hace afirmaciones sobre los dermatólogos en general.
   - Voz propuesta: **"Ojo: los tres dermatólogos del estudio también fallaron más en piel oscura."** (+3 palabras; si sobra tiempo, quita "Ojo:").
   - En pantalla: etiqueta "3 dermatólogos, solo con fotos · detectaron 72 % vs 59 % de los cánceres".
2. **#19 · "Más de seis milímetros" (voz).** Dicho así, sugiere que un lunar chico no preocupa; AAD y NCI dicen que pueden ser más chicos.
   - Voz propuesta: **"Revísate: asimetría, bordes irregulares, varios colores, casi siempre más de seis milímetros, y que cambie."** (o "diámetro grande" en lugar de la cifra). Mantener en pantalla "suele ser > 6 mm".
3. **#2 · "App de lunares" (pantalla).** El estudio probó algoritmos de investigación, no apps comerciales de celular.
   - Cambiar el letrero del celular a **"IA de lunares"** (o agregar "ilustrativo"). La frase del cierre "una app que adivine" es opinión/consejo y puede quedarse, pero mejor "una IA que adivine" para que coincida con lo probado.

Notas para la animación (no son errores):
- En la escena 5, rotular los números como "cánceres detectados" (sensibilidad), no "aciertos" ni "precisión".
- En la escena 7, las barras que se emparejan son ROC-AUC (0.73 vs 0.76), otra métrica distinta a 69/23: no poner ahí números de porcentaje que parezcan continuación de 69 % y 23 %; basta con que se emparejen.
