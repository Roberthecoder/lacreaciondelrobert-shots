# Shot IA #46 · La molécula para la diabetes que una IA convirtió en antibiótico

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #46 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N3 "Capítulos y medidores" (cap. 1 aprende · cap. 2 busca · cap. 3 la prueba) + toque de N1 "Por dentro" (bajamos a la membrana de la bacteria para ver la "batería").
- **Gancho (de los 7):** #1 "Esto no es X: es Y": «Esta molécula no se inventó para infecciones: se estudiaba para la diabetes».
- **Duración:** voz 955 caracteres / ~160 palabras (≈ 58.2 s) + cierre 3.5 s → **61.7 s** estimados.
- **Postura de la serie:** defensa con datos (un uso real y útil de la IA en ciencia), con el matiz de que la halicina aún no es medicina aprobada y de que la IA predice pero el laboratorio comprueba.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta molécula no se inventó para infecciones: se estudiaba para la diabetes. Y una IA descubrió que mata bacterias. | Fondo menta; desde el cuadro 0 una molécula de halicina (anillos con trazo negro grueso) gira; etiqueta "para diabetes" que se tacha y cambia a "¿antibiótico?". Bacterias en forma de bastón que se apagan alrededor. |
| 1 | Aprende | En el MIT entrenaron una red neuronal con dos mil trescientas treinta y cinco moléculas: cuáles frenan a la bacteria E. coli. | **Cap. 1 · Aprende.** `RedNeuronal`; entran fichas de moléculas con ✔ (frena) o ✘ (no frena); contador "2,335 moléculas". Etiqueta *Escherichia coli*. |
| 2 | Busca | Luego revisó seis mil ciento once moléculas que ya se estudiaban para otras enfermedades. | **Cap. 2 · Busca.** Cuadrícula que se escanea, contador "6,111" (Drug Repurposing Hub); unas pocas se encienden en dorado. |
| 3 | Halicina | La elegida: halicina, por HAL, la computadora de dos mil uno: odisea del espacio. | Una molécula sale de la cuadrícula; aparece el ojo rojo estilo HAL (dibujo propio, sin logos de la película) y el nombre "halicina". |
| 4 | Pregunta | ¿Y cómo mata a bacterias que resisten a casi todo? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Bateria | Deshace la diferencia de acidez entre adentro y afuera de la bacteria: una batería que necesita para vivir. | Fondo oscuro (por dentro de la bacteria): membrana con protones (H⁺) acumulados afuera, medidor tipo pila "ΔpH" que baja hasta vaciarse cuando llega la halicina. |
| 6 | Ratones | Salió en la revista Cell en 2020: en ratones funcionó contra Acinetobacter baumannii y Clostridioides difficile. | **Cap. 3 · La prueba.** `TarjetaEstudio` "2020 · MIT · Stokes … Collins · *Cell*"; dos ratoncitos con etiquetas *Acinetobacter baumannii* (herida en la piel) y *Clostridioides difficile* (intestino). |
| 7 | Treinta | Y en treinta días, E. coli no logró volverse resistente. | Calendario de 30 días que se va tachando; medidor de resistencia que se queda en cero. |
| 8 | Abaucina | En 2023, otra red encontró la abaucina, que ataca casi solo a Acinetobacter. | Chip "2023 · *Nature Chemical Biology*"; molécula de abaucina como francotirador que apunta solo a *A. baumannii* entre otras bacterias. |
| 9 | Ojo | Ojo: ninguna es todavía medicina aprobada para personas. | Frasco de medicina con sello "aún no aprobada"; signo de alto. |
| 10 | Cierre | Una molécula pensada para la diabetes podría volverse antibiótico. Y la encontró una IA. | **Regreso a la imagen del inicio**: la misma molécula girando sobre fondo menta, ahora con etiqueta "candidata a antibiótico" y los brillitos de IA. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; cada ficha que entra a la red hace un clic suave, el escaneo de la cuadrícula zumba, la molécula elegida da un "ding", la pila se descarga con un zumbido que baja, el calendario pasa hojas, el francotirador hace un disparo seco y el sello "aún no aprobada" golpea.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Stokes, J. M., Yang, K., Swanson, K., Jin, W., Cubillos-Ruiz, A., Donghia, N. M., MacNair, C. R., French, S., Carfrae, L. A., Bloom-Ackermann, Z., Tran, V. M., Chiappino-Pepe, A., Badran, A. H., Andrews, I. W., Chory, E. J., Church, G. M., Brown, E. D., Jaakkola, T. S., Barzilay, R. y Collins, J. J. "A Deep Learning Approach to Antibiotic Discovery". *Cell* 180(4): 688–702 (febrero de 2020). DOI 10.1016/j.cell.2020.01.021 · PMC8349178 (texto completo abierto en pmc.ncbi.nlm.nih.gov). MIT y Broad Institute.
   > "First, we trained a deep neural network model to predict growth inhibition of Escherichia coli using a collection of 2,335 molecules." (2020)
   > "We performed predictions on the Drug Repurposing Hub, consisting of 6,111 unique molecules" · "This library consists of 6,111 molecules at various stages of investigation for human diseases." (2020)
   > "The compound that satisfied all of these criteria was the c-Jun N-terminal kinase inhibitor SU3327 … (renamed halicin), a preclinical nitrothiazole under investigation as a treatment for diabetes." (2020)
   > "Halicin dissipates the ∆pH component of the proton motive force" · "given that cells must maintain an electrochemical transmembrane gradient for viability … dissipation of the proton motive force would result in the death of tolerant cells." (2020)
   > "Halicin also effectively treated Clostridioides difficile and pan-resistant Acinetobacter baumannii infections in murine models." (2020)
   > "This strain is not susceptible to clinical antibiotics generally used for treatment of A. baumannii, and therefore represents a pan-resistant isolate." · "5 of the 6 mice treated with halicin contained <10³ CFU/g (below the limit of detection)" (2020)
   > "we were unable to isolate spontaneous suppressor mutants after 30 days of serial passaging in liquid media" · Figura 4A: "Evolution of resistance to halicin (blue) or ciprofloxacin (red) in E. coli after 30 days of passaging" (2020)
   > "from a discrete set of 23 empirically tested predictions from >107 million molecules curated from the ZINC15 database, our model identified eight antibacterial compounds" (2020; no se usa en la voz, sirve para la descripción).
2. MIT News, Anne Trafton, "Artificial intelligence yields new antibiotic" (20 feb 2020). https://news.mit.edu/2020/artificial-intelligence-identifies-new-antibiotic-0220
   > El nombre: "after the fictional artificial intelligence system from "2001: A Space Odyssey"" (2020)
   > "has been previously investigated as possible diabetes drug" (2020)
3. Liu, G., Catacutan, D. B., Rathod, K., Swanson, K., Jin, W., Mohammed, J. C., Chiappino-Pepe, A., Syed, S. A., Fragis, M., Rachwalski, K., Magolan, J., Surette, M. G., Coombes, B. K., Jaakkola, T., Barzilay, R., Collins, J. J. y Stokes, J. M. "Deep learning-guided discovery of an antibiotic targeting Acinetobacter baumannii". *Nature Chemical Biology* 19: 1342–1350 (2023; en línea mayo de 2023). DOI 10.1038/s41589-023-01349-8. McMaster y MIT.
   > "We trained a neural network with this growth inhibition dataset … Through this approach, we discovered abaucin, an antibacterial compound with narrow-spectrum activity against A. baumannii." (2023)
4. Estado clínico: El Belghiti, I., Hammani, O., Moustaoui, F., Aghrouch, M., Lemkhente, Z., Boubrik, F. y Belmouden, A. "Halicin: A New Approach to Antibacterial Therapy, a Promising Avenue for the Post-Antibiotic Era". *Antibiotics* 14(7): 698 (11 jul 2025). PMC12291912.
   > "Preclinical studies have shown favorable results in mouse infection models" · "the pharmacokinetics and pharmacodynamics (PK/PD) of halicin in humans remain poorly understood." · "further investigations are essential to validate its safety, efficacy, and therapeutic potential in clinical settings." (2025)
   > Además: búsqueda en ClinicalTrials.gov (API v2, 29 oct 2026) de "halicin", "SU3327" y "abaucin": 0 estudios registrados.
5. (Contexto, no va en la voz) OMS, lista de bacterias prioritarias 2024 (17 may 2024): "Critical priority: Acinetobacter baumannii, carbapenem-resistant". Nota descriptiva de la OMS sobre resistencia (16 jul 2026): la resistencia bacteriana estuvo "associated with more than 4.7 million deaths globally in 2021".

## Notas
- "Una IA descubrió que mata bacterias": la red neuronal predijo la actividad y luego los investigadores la comprobaron en el laboratorio (E. coli) y en ratones. En la descripción se aclara que la IA propone y el laboratorio comprueba.
- "Revisó seis mil ciento once moléculas": el modelo calificó las moléculas del Drug Repurposing Hub (6,111 en total; las que ya estaban en el entrenamiento se separaron para elegir candidatas).
- "Resisten a casi todo": la cepa de *A. baumannii* usada en ratones (CDC 288) es pan-resistente según el artículo.
- "Diferencia de acidez" = el componente ΔpH de la fuerza protón-motriz; "batería" es una comparación, se dice como tal.
- "Treinta días": pase en serie de *E. coli* durante 30 días sin aislar mutantes resistentes (en las mismas condiciones, sí aparecía resistencia al ciprofloxacino, Fig. 4A).
- "Ataca casi solo a *Acinetobacter*" = actividad de espectro estrecho contra *A. baumannii* (Liu et al. 2023).
- "Podría volverse antibiótico" es posibilidad, no promesa. El dibujo es esquemático; el ojo tipo HAL es dibujo propio.
- Para no repetir amb-02 (39 M de muertes 2025–2050) no se dan cifras de muertes en la voz.
