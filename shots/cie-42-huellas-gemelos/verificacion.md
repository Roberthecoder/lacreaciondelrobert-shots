# Verificación de hechos · Shot Científico #42 · Los gemelos idénticos no tienen las mismas huellas

- **Fecha:** 29 oct 2026. **Quién verificó:** subagente verificador independiente (no escribió el guion).
- **Archivos revisados:** `guion.md` y `narracion.json` (10 líneas de voz) y la columna "Lo que se ve" del guion. La animación todavía no existe (`cie-piezas.jsx` no tiene textos de pantalla propios del shot).

## Fuentes abiertas

- **[W]** Wertheim, K. (2011). *Embryology and Morphology of Friction Ridge Skin*. Cap. 3 de *The Fingerprint Sourcebook*, NIJ (EE. UU.). https://www.ojp.gov/pdffiles1/nij/225323.pdf (PDF leído completo)
- **[ML]** MedlinePlus Genetics (NIH). *Are fingerprints determined by genetics?* Actualizado el 7 jul 2022. https://medlineplus.gov/genetics/understanding/traits/fingerprints/
- **[J21]** Jonsson, H. et al. (2021). *Differences between germline genomes of monozygotic twins*. Nature Genetics 53: 27–34. Resumen en PubMed 33414551.
- **[LS]** Liu, Y. y Srihari, S. N. (2009). *A Computational Discriminability Analysis on Twin Fingerprints*. Proc. 3rd Int. Workshop on Computational Forensics, Springer. https://cedar.buffalo.edu/~srihari/papers/IWCF2009-Twins.pdf (PDF leído; resume también a Jain, Prabhakar y Pankanti 2002)
- **[T12]** Tao, X. et al. (2012). *Fingerprint Recognition with Identical Twin Fingerprints*. PLoS ONE 7(4): e35704. https://pmc.ncbi.nlm.nih.gov/articles/PMC3338710/
- **[H97]** Henneberg, M., Lambert, K. M. y Leigh, C. M. (1997). *Fingerprint homoplasy: Koalas and humans*. Natural Science 1: 4. Resumen en el repositorio de la Univ. de Adelaida (hdl 2440/5433).
- **[PBS]** NOVA/PBS. *Koalas have fingerprints almost identical to ours*. https://www.pbs.org/wgbh/nova/article/koala-fingerprints/ (fuente secundaria)
- No se pudo abrir el texto completo de Jain, Prabhakar y Pankanti (2002), *Pattern Recognition* 35: 2653–2663 (ScienceDirect 403); sus resultados se tomaron de cómo los resumen [LS] y [T12].

## Afirmaciones (voz y pantalla)

| # | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Los gemelos idénticos tienen **casi** el mismo ADN (voz 0 y 1) | ✅ | [J21] | "monozygotic twins differ on average by 5.2 early developmental mutations" | 2021 |
| 2 | …pero **no** las mismas huellas digitales (voz 0, gancho) | ✅ | [ML] | "Even identical twins, who have the same DNA, have different fingerprints." | 2022 |
| 3 | Vienen del mismo óvulo y del mismo espermatozoide (voz 1) | ✅ | [LS] | "Identical twins develop when a single fertilized egg splits in two embryos." | 2009 |
| 4 | Las huellas se forman antes de nacer, en los primeros meses del embarazo (voz 2). Conversión: 10.5–16 semanas ≈ del 3.er al 4.º mes | ✅ | [W]; [ML] | "the unique features of the skin are established between approximately 10.5 and 16 weeks estimated gestational age (EGA)" / "The ridges begin to develop during the third month of fetal development, and they are fully formed by the sixth month." | 2011; 2022 |
| 5 | Las crestas se doblan según cómo crece el dedo (voz 3) | ✅ | [W] | "Localized stresses (tensions and compressions), resulting from growth of the tissue layers of the digit and interactions with existing ridge fields, create the foundations for second-level uniqueness." | 2011 |
| 6 | (corregida) "…según cómo crece y se estira la yema del dedo, y eso cambia con el ambiente dentro del útero" (voz 3; pantalla: flechas de tensión sobre la yema) | ✅ | [W]; [ML] | "Localized stresses (tensions and compressions), resulting from growth of the tissue layers of the digit…" [W] / "The finer details of the patterns of skin ridges are influenced by other factors during fetal development, such as substances taken during pregnancy and the environment inside the womb." [ML] | 2011; 2022 |
| 7 | Esas condiciones nunca son idénticas, ni para dos gemelos ni para dos dedos del mismo bebé (voz 4; pantalla: 10 dedos distintos) | ✅ | [W] | "It is completely inconceivable that the physical stresses and cellular distributions that create that community could be exactly duplicated, on any level, in two different areas of developing fetal tissue." / MZ twins "share identical genetic information and very similar intrauterine environments, but on many occasions have very different patterns." | 2011 |
| 8 | El dibujo general de los gemelos suele parecerse (voz 6; pantalla: dos remolinos parecidos) | ✅ | [T12]; [LS] | "identical-twin fingers shared a fingerprint type 0.7440" vs. "0.3215" al azar [T12] / "twins are more than twice as likely as non-twins in matching level 1 features" [LS] | 2012; 2009 |
| 9 | …pero los detalles finos (donde las crestas se cortan o se dividen = minucias: finales y bifurcaciones) son diferentes (voz 6; pantalla: círculos en bifurcaciones y finales) | ✅ | [W]; [LS] | "genetics … does not determine the arrangement of minutiae or ridge shapes within the pattern" [W] / "Although the patterns of minutiae among twins are more similar than in the general population, the similarity of fingerprints of twins is significantly different from that between genuine prints of the same finger." [LS] | 2011; 2009 |
| 10 | Las huellas pueden distinguir a dos gemelos (voz 7; chip «las huellas sí los distinguen») | ✅ | [LS] (resume a Jain et al. 2002); [T12] | "Using a state-of-the-art fingerprint verification system it was concluded that identical twins are discriminable with slightly lower accuracy than non-twins." [LS] / "can distinguish identical twins without drastic degradation in performance" [T12] | 2002; 2012 |
| 11 | …aunque una prueba común de ADN no lo logre (voz 7) | ✅ | [LS]; [T12] | "having identical DNA makes it difficult for forensic scientists to distinguish between DNA from blood samples of identical twins" [LS] | 2009 |
| 12 | Los koalas tienen huellas muy parecidas a las nuestras (voz 8; pantalla: huella de koala junto a una humana) | ✅ | [H97] | "dermatoglyphes, microscopically and macroscopically similar to those of humans, on the fingers and toes of the tree-climbing marsupial Phascolarctus cinereus" / "Presence of nearly identical dermatoglyphes…" | 1997 |
| 13 | (corregida) "…huellas casi idénticas a las nuestras, y se parecen hasta vistas al microscopio" (voz 8) | ✅ | [H97] | "Presence of nearly identical dermatoglyphes…" / "dermatoglyphes, microscopically and macroscopically similar to those of humans" | 1997 |
| 14 | Hasta dos gemelos idénticos dejan su propia firma en todo lo que tocan (voz 9, cierre) | ✅ | [ML]; [W] | (es la conclusión de las filas 2, 7 y 9) "Even identical twins … have different fingerprints." | 2022 |
| 15 | (corregida) Fuentes del guion: Henneberg, Lambert y Leigh (1997), Natural Science 1: 4; Wertheim (2011), Fingerprint Sourcebook cap. 3 | ✅ | Repositorio Univ. de Adelaida (hdl 2440/5433); ojp.gov | "Natural Science, 1997; 1:4-4" | 1997; 2011 |

Las escenas del útero, el bebé, las flechas y las huellas son esquemáticas (el guion ya lo avisa en "Notas").

## Problemas encontrados

Primera revisión (29 oct 2026): 3 ⚠️ (filas 6, 13 y 15). Las correcciones se aplicaron en `guion.md` y `narracion.json` y se volvieron a verificar:
1. Voz 3 (Presion): ahora dice "…según cómo crece y se estira la yema del dedo, y eso cambia con el ambiente dentro del útero." La pantalla muestra flechas de tensión. Coincide con [W] y [ML]. ✅
2. Voz 8 (Koala): ahora dice "…casi idénticas a las nuestras, y se parecen hasta vistas al microscopio." Coincide con el resumen original de [H97] ("nearly identical", "microscopically and macroscopically similar"). ✅
3. Fuentes del guion: se quitó la cita inexistente de *Nature* 1996. Ahora están Henneberg y colegas (1997, *Natural Science* 1: 4) y Wertheim (2011). ✅

No queda ninguna afirmación ❌ ni ⚠️.

VEREDICTO: APROBADO
