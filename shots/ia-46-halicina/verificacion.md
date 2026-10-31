# Verificación de hechos · Shot IA #46 · La molécula para la diabetes que una IA convirtió en antibiótico

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).** Revisé `guion.md` (voz y columna "Lo que se ve") y `narracion.json`. Aún no hay `.jsx`.
- Fuentes abiertas: Stokes et al., *Cell* 2020 (PMC8349178, texto completo); MIT News 20 feb 2020; Liu et al., *Nat Chem Biol* 2023 (PubMed 37231267); ClinicalTrials.gov API v2 (29 oct 2026).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | La molécula (halicina) no se creó para infecciones: se estudiaba para la diabetes | ✅ | Stokes et al., *Cell* 180:688 (PMC8349178); MIT News | "(renamed halicin), a preclinical nitrothiazole under investigation as a treatment for diabetes." · "has been previously investigated as possible diabetes drug" | 2020 |
| 2 | "Una IA descubrió que mata bacterias" | ⚠️ | Stokes et al. 2020 | La red la predijo; luego "empirically tested these for growth inhibition" (99 candidatas); halicina dio MIC de 2 µg/ml contra *E. coli*. La IA predijo y el laboratorio comprobó: "descubrió que mata" atribuye a la IA la comprobación | 2020 |
| 3 | En el MIT entrenaron una red neuronal | ✅ | Stokes et al. 2020 (afiliaciones); MIT News | Afiliación "Massachusetts Institute of Technology, Cambridge, MA" (laboratorio de J. J. Collins; también Broad Institute) | 2020 |
| 4 | Con 2,335 moléculas, para saber cuáles frenan a *E. coli* | ✅ | Stokes et al. 2020 | "Our initial training dataset consisted of 2,335 molecules" · "trained a deep neural network model to predict growth inhibition of Escherichia coli" | 2020 |
| 5 | Revisó 6,111 moléculas que ya se estudiaban para otras enfermedades (Drug Repurposing Hub) | ✅ | Stokes et al. 2020 | "This library consists of 6,111 molecules at various stages of investigation for human diseases." | 2020 |
| 6 | "La elegida: halicina" | ✅ | Stokes et al. 2020 | "The compound that satisfied all of these criteria was the c-Jun N-terminal kinase inhibitor SU3327 … (renamed halicin)" | 2020 |
| 7 | Nombre por HAL, la computadora de *2001: odisea del espacio* | ✅ | MIT News, 20 feb 2020 | "after the fictional artificial intelligence system from "2001: A Space Odyssey,"" | 2020 |
| 8 | Mata bacterias que resisten a casi todo | ✅ | Stokes et al. 2020; MIT News | "pan-resistant Acinetobacter baumannii" · "and therefore represents a pan-resistant isolate." · la cepa "is resistant to all known antibiotics" | 2020 |
| 9 | Deshace la diferencia de acidez (ΔpH) entre adentro y afuera; "batería" que necesita para vivir (comparación) | ✅ | Stokes et al. 2020 | "halicin selectively dissipated the ∆pH component of the proton motive force" · "cells must maintain an electrochemical transmembrane gradient for viability" | 2020 |
| 10 | Publicado en *Cell* en 2020 | ✅ | PMC8349178 | *Cell* 180(4): 688–702, febrero de 2020 | 2020 |
| 11 | En ratones funcionó contra *A. baumannii* (herida en piel) y *C. difficile* (intestino) | ✅ | Stokes et al. 2020; MIT News | "halicin shows efficacy against Clostridioides difficile and pan-resistant Acinetobacter baumannii infections in murine models" · ungüento que "completely cleared the infections within 24 hours" (piel) | 2020 |
| 12 | En 30 días *E. coli* no logró volverse resistente | ✅ | Stokes et al. 2020; MIT News | "we were unable to isolate spontaneous suppressor mutants after 30 days of serial passaging in liquid media" · "did not develop any resistance to halicin during a 30-day treatment period" (en laboratorio) | 2020 |
| 13 | En 2023 otra red encontró la abaucina | ✅ | Liu et al., *Nat Chem Biol* 19:1342 (PubMed 37231267; en línea 25 may 2023) | "We trained a neural network with this growth inhibition dataset" · "we discovered abaucin" | 2023 |
| 14 | La abaucina ataca casi solo a *Acinetobacter* | ✅ | Liu et al. 2023 | "an antibacterial compound with narrow-spectrum activity against A. baumannii." | 2023 |
| 15 | Ninguna es todavía medicina aprobada para personas | ✅ | ClinicalTrials.gov API v2 (consulta 29 oct 2026); El Belghiti et al., *Antibiotics* 2025 | "halicin": 0 estudios; "abaucin": 0 estudios · "the pharmacokinetics and pharmacodynamics (PK/PD) of halicin in humans remain poorly understood." | 2025–2026 |
| 16 | Cierre: "podría volverse antibiótico. Y la encontró una IA" | ✅ | Stokes et al. 2020 | Se dice como posibilidad; "la encontró" (como candidata) es correcto: la red la puso entre las mejores predicciones | 2020 |
| 17 | Pantalla: tarjeta "2020 · MIT · Stokes … Collins · *Cell*", contador "2,335", "6,111", "Drug Repurposing Hub", chip "2023 · *Nature Chemical Biology*", sello "aún no aprobada" | ✅ | Las mismas fuentes de arriba | Coinciden con #3–#15 | 2020/2023 |
| 18 | Pantalla: la abaucina como "francotirador" que apunta **solo** a *A. baumannii* | ⚠️ | Liu et al. 2023 | "narrow-spectrum" = espectro estrecho, no exclusivo; la voz dice bien "casi solo", el dibujo dice "solo" | 2023 |

## Correcciones necesarias

1. **#2 (gancho, ⚠️ imprecisa):** "Y una IA descubrió que mata bacterias" da a entender que la IA lo comprobó. Propuesta:
   «Esta molécula no se inventó para infecciones: se estudiaba para la diabetes. Y una IA predijo que mata bacterias.»
   (El laboratorio lo comprueba en las escenas siguientes; también vale «Y una IA sospechó que mata bacterias».)
2. **#18 (pantalla, ⚠️):** que el francotirador de abaucina no se vea 100 % exclusivo: dejar alguna otra bacteria apenas afectada
   o poner la etiqueta "casi solo *A. baumannii*" / "espectro estrecho", para que coincida con la voz.

Notas (sin corrección): todas las cifras dicen de qué son; el año 2020 se dice en la voz antes de los datos de ratones y de 30 días
(datos de hace más de 2 años, correcto); no encontré un dato más nuevo que contradiga (ningún ensayo en humanos registrado al 29 oct 2026).

## Re-verificación (29 oct 2026, coordinador)
- Gancho «…Y una IA predijo que mata bacterias.» (la IA lo predijo; el laboratorio lo comprobó, Stokes et al., Cell 2020) ✅
- Pantalla de la abaucina: chip «espectro estrecho: casi solo A. baumannii» y otra bacteria apenas afectada (Liu et al., Nat Chem Biol 2023) ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
