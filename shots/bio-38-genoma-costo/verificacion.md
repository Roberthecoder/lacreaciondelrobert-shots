# Verificación de hechos · bio-38-genoma-costo

- **Verificación independiente:** 29 de octubre de 2026, por un verificador que no escribió el guion y que abrió cada fuente (incluida la tabla `Sequencing_Cost_Data_Table_May2022.xls` del NHGRI).
- **Resultado inicial:** 14 ✅, 2 ⚠️, 0 ❌.
- **Corregido (las dos ⚠️):**
  - #8 «Antes, cada pedacito de ADN se leía por separado» → **«Antes, cada pedacito de ADN se leía en su propio tubito.»** Las máquinas de Sanger con capilares leían ~96 pedacitos a la vez, cada uno en su capilar. La pantalla ya no muestra un tubito que pasa fragmentos de uno en uno: muestra una fila de tubitos con su pedacito cada uno y el chip «≈ 100 tubitos, un pedacito en cada uno».
  - #9 «Desde 2008, las máquinas leen millones…» → **«Desde 2008, los centros de genoma usan máquinas que leen millones de pedacitos a la vez.»** (2008 es cuando los centros financiados por NHGRI cambiaron de tecnología; las máquinas ya existían desde antes). La línea siguiente pasa a «En 2022, a esos centros de Estados Unidos ya les costaba unos 525 dólares.»
  - Descripción y redes: se aclara que los 3,000 millones de letras son **una copia** del genoma y que cada célula trae dos.
- Para que la voz quedara en 940 caracteres se recortaron palabras sin agregar datos («La primera lectura tomó 13 años…», «En 2001, leer un genoma costaba…», «Ese año, el consorcio…»).
- El coordinador confirmó que lo cambiado quedó ✅.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Tu genoma: unos 3,000 millones de letras | ✅ (es una copia/haploide; la célula tiene 2 copias ≈ 6,000 millones, pero así lo mide NHGRI) | https://www.genome.gov/about-genomics/fact-sheets/Sequencing-Human-Genome-cost | "that of a human is ~3,000 million bases (or ~3 billion bases)" | 2021 |
| 2 | Solo hay cuatro letras: A, T, C, G (A–T, C–G en pantalla) | ✅ | https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Fact-Sheet | "the four chemical building blocks - called 'bases'" | 2023 |
| 3 | Una por segundo, sin dormir: más de 90 años | ✅ (cálculo: 3×10⁹ s ÷ 31,557,600 s/año ≈ 95 años) | cálculo propio sobre #1 | — | — |
| 4 | Proyecto Genoma Humano: 13 años, de 1990 a 2003 | ✅ | https://www.genome.gov/human-genome-project | "Launched in October 1990 and completed in April 2003" ; Cost page: "~13 years rather than ~15 years" | 1990–2003 |
| 5 | "Leerlo por primera vez" fue el PGH | ✅ (NHGRI: "generating the first sequence of the human genome"; era 92 %, lo aclara la línea 11) | https://www.genome.gov/human-genome-project | "the Human Genome Project's signature accomplishment – generating the first sequence of the human genome" | 2003 |
| 6 | EE. UU. puso unos 2,700 millones de dólares para todo el proyecto | ✅ | https://www.genome.gov/about-genomics/fact-sheets/Sequencing-Human-Genome-cost | "requiring less funding - ~$2.7 billion. But the latter number represents the total U.S. funding for a wide range of scientific activities under the HGP's umbrella beyond human genome sequencing" | 1990–2003 |
| 7 | En 2001 leer un genoma costaba casi 100 millones de dólares (pantalla: sept. 2001 ~95 M) | ✅ | https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Costs-Data (tabla Sequencing_Cost_Data_Table_May2022.xls, abierta) | fila "2001-09-30 · Cost per Genome 95,263,071.92" | 2001 |
| 8 | Antes, cada pedacito de ADN se leía en su propio tubito (pantalla: fila de tubitos, «≈ 100 tubitos, un pedacito en cada uno») | ✅ (corregido; antes ⚠️ «por separado») | NHGRI Costs Data: "Sanger-based chemistries and capillary-based instruments" | "capillary-based instruments ('first generation' sequencing platforms)" | 2001–2007 |
| 9 | Desde 2008, los centros de genoma usan máquinas que leen millones de pedacitos a la vez | ✅ (corregido; antes ⚠️: 2008 es el cambio en los centros de NHGRI) | https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Costs-Data ; NHS glossary https://www.genomicseducation.hee.nhs.uk/glossary/massively-parallel-sequencing/ | "beginning in January 2008. The latter represents the time when the sequencing centers transitioned from Sanger-based … to 'second generation'" ; "read the sequence of millions of short fragments of DNA or RNA at the same time" | 2008 |
| 10 | En 2022, a los centros de genoma de EE. UU. les costaba unos 525 dólares (la línea se desploma en 2008) | ✅ — último dato publicado; la página (actualizada 16 may 2023, revisada hoy) solo enlaza la tabla May2022; no hay dato NHGRI más nuevo en oct 2026. La voz ya dice "En 2022" (dato de >2 años). Tabla: ene 2008 3.06 M → jul 2008 0.75 M (desplome ✅) | misma tabla xls | filas "2022-02-28 · 524.62" y "2022-05-31 · 524.62" | 2022 |
| 11 | Ese mismo año (2022) T2T publicó en *Science* el primer genoma humano completo | ✅ (sin cromosoma Y; NHGRI lo llama "first truly complete human genome sequence"). Nurk et al., Science 376:44–53, 31 mar/1 abr 2022 | https://www.genome.gov/human-genome-project/Completion-FAQ ; Europe PMC DOI 10.1126/science.abj6987 | "On March 31, 2022, the Telomere-to-Telomere (T2T) consortium announced that had filled in the remaining gaps and produced the first truly complete human genome sequence" ; título "The complete sequence of a human genome" | 2022 |
| 12 | Llenó el 8 % que faltaba desde 2003 (pantalla 92 % → 100 %) | ✅ | Nurk 2022 (abstract) + Completion FAQ | "Addressing the remaining 8% of the genome" ; (secuencia 2003) "it accounted for 92% of the human genome" | 2003 / 2022 |
| 13 | Casi 200 millones de letras | ✅ | Nurk 2022 | "introduces nearly 200 million base pairs of sequence" | 2022 |
| 14 | Eran los tramos más repetidos, como el centro de cada cromosoma (pantalla: centrómero repetido, una lectura larguísima lo cruza) | ✅ | Nurk 2022 | "The completed regions include all centromeric satellite arrays, recent segmental duplications, and the short arms of all five acrocentric chromosomes" ; "PacBio HiFi and Oxford Nanopore ultra-long read sequencing" | 2022 |
| 15 | Cierre: de casi 100 millones a unos 500 | ✅ (95.3 M → 524.62 USD; "unos 500" redondeo aceptable) | tabla xls | ver #7 y #10 | 2001→2022 |
| 16 | Descripción: "en mayo de 2022, el último dato publicado" | ✅ (verificado hoy en genome.gov) | idem | "Sequencing_Cost_Data_Table_May2022.xls" | 2022 |

| 17 | Una copia del genoma tiene unos 3,000 millones de letras; tu genoma completo trae dos copias (≈ 6,000 millones) (descripción y redes) | ✅ | https://www.genome.gov/about-genomics/fact-sheets/Sequencing-Human-Genome-cost | "a single 'representative' copy of the human genome is ~3 billion bases in size, whereas a given person's actual (diploid) genome is ~6 billion bases in size" | 2021 |
| 18 | Las letras de la pantalla, los tubitos, la celda de lectura, los puntitos y el cromosoma son esquemáticos (no es una secuencia real) | ✅ | Declarado en el guion, en el `.jsx` y en los textos de publicación | "El dibujo es esquemático." | 2026 |

Sin ❌ ni ⚠️ pendientes.

VEREDICTO: APROBADO
