# Verificación de hechos · cie-03-adn-viral

- **Verificación independiente:** 28 oct 2026, por un verificador que no escribió el guion (abrió las fuentes). Revisó 17 afirmaciones de la voz, la pantalla y `publicacion.md`.
- **Resultado:** sin ❌ ni ⚠️. No se cambió nada del guion ni de la voz (conserva `voz_aprobada`); solo se agregaron LinkedIn, X y Threads a `publicacion.md` con estos mismos datos.
- Nota de estilo (no obligatoria): «no es humano» es una forma de decirlo; el hecho verificable es «vino de virus», y la voz lo dice.

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| (voz 0, pantalla) Casi uno de cada doce pedacitos de tu ADN vino de virus (~8 %) | ✅ | *Structural Insights into Endogenous Retroviruses…* (PMC13709493) | «human endogenous retroviruses (HERVs) constitute approximately 8% of the human genome» | 2026 |
| (voz 2-3) Infectaron óvulos y espermatozoides de nuestros antepasados y se heredan | ✅ | PMC13709493 | «Ancient infections of the germline resulted in the integration of viral sequences into host chromosomes, where they are inherited» | 2026 |
| (voz 4) Retrovirus endógenos: casi todos están rotos, ya no fabrican virus | ✅ | PMC13709493 | «most ERV loci accumulate inactivating mutations… largely replication-defective» | 2026 |
| (voz 6) En el año 2000, en EE. UU., la sincitina resultó ser la envoltura de un virus antiguo | ✅ | Mi et al., *Nature* 403: 785–789 (PubMed 10693809; «Genetics Institute, Inc., Cambridge, Massachusetts») | «This gene, encoding a protein that we have called syncytin, is the envelope gene of a recently identified human endogenous defective retrovirus, HERV-W» | 2000 |
| (voz 7) La placenta la usa para fundir sus células en la capa del intercambio con el bebé | ✅ | Dupressoir et al., *PNAS* 106: 12127–12132 (PMC2715540) | «fusion of trophoblast cells into a… multinucleated syncytiotrophoblast layer, through which most of the maternofetal exchanges take place» | 2009 |
| (voz 8) Ratones sin sincitina: la placenta falla y los embriones mueren | ✅ | Dupressoir et al. 2009 | «homozygous syncytin-A null mouse embryos die in utero between 11.5 and 13.5 days of gestation» | 2009 |
| (pantalla) Estudio de Francia (Dupressoir) | ✅ | Dupressoir et al. 2009 (Institut Gustave Roussy, Villejuif, France) | afiliación del artículo | 2009 |
| (voz 9) Otros mamíferos, como los ratones, atraparon virus distintos para lo mismo | ✅ | Dupressoir et al. 2009 | «independently acquired by the human (syncytin-1 and syncytin-2) and mouse (syncytin-A and syncytin-B) genomes» | 2009 |
| (pantalla) Primates, roedores, conejos, carnívoros y rumiantes | ✅ | Lavialle et al., *Phil. Trans. R. Soc. B* 368: 20120507 (y Heidmann 2009, Cornelis 2012, syncytin-Rum1 2017) | «captured and domesticated on multiple occasions and independently in diverse mammalian species» | 2013 |
| (voz 10) «Quizá no estarías aquí» (dicho como hipótesis) | ✅ | Lavialle et al. 2013 | «may have been pivotal in the emergence of mammalian ancestors with a placenta» | 2013 |
| (mudo) Latido fetal de 140 lpm, normal entre 110 y 160 | ✅ | *Intermittent Auscultation…* (PMC13655190) | «Normal FHR baseline between 110 and 160 bpm» | 2026 |
| (publicación) La envoltura de HERV-W funde células (Blond 2000) | ✅ | Blond, J.-L. et al. *J. Virol.* 74: 3321–3329 (PMC111833, abierto con NCBI) | «the product of the HERV-W env gene is a highly fusogenic membrane glycoprotein» | 2000 |
| (voz 2, publicación) Hace millones de años | ✅ | Renard, M. et al. *J. Mol. Biol.* 352: 1029–1034 (PubMed 16140326) | «human syncytin-2, a 40 million years old endogenous retrovirus fusogenic envelope gene captured by primates» | 2005 |
| (publicación) ~8 % del genoma: cita de Lander 2001 | ❌→ corregida | Lander 2001 no tiene texto abierto (PubMed 11237011, sin acceso libre): se cambió por Lyu et al. 2026 (PMC13709493), ya ✅ arriba | «approximately 8% of the human genome» | 2026 |
| (publicación) «El porcentaje varía según cómo se cuente (6–9 %)» | ⚠️→ quitado | sin fuente abierta con esa cifra | — | — |
| (publicación) Latido fetal normal 110–160: cita de ACOG | ⚠️→ corregida | ACOG no se pudo abrir: se cambió por Ostrem-Niemcewicz et al. 2026 (PMC13655190), ya ✅ arriba | «Normal FHR baseline between 110 and 160 bpm» | 2026 |

Segunda revisión (28 oct 2026, pedida por Robert): se abrieron también las fuentes citadas en `publicacion.md`; lo no comprobable se cambió o se quitó. Todo lo que queda publicado es ✅.

## Re-verificación (29 oct, auditoría)

Se corrigió el subtítulo del gancho (idx 0, `adn-viral.jsx`): de «1 de cada 12 *no es humano: es virus.*» a «Casi 1 de cada 12 *vino de un virus.*», para que no diga más que la voz («casi uno de cada doce… vino de virus»). Revisado por un verificador independiente; fuente abierta por Europe PMC el 29 oct 2026.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| (pantalla, subtítulo 0) Casi 1 de cada 12 pedacitos de tu ADN (~8 %; 1/12 ≈ 8.3 %, por eso «casi») | ✅ | Lyu, Harding et al., *Viruses* 18: 1132 (PMC13709493) | «It is estimated that human endogenous retroviruses (HERVs) constitute approximately 8% of the human genome» | 2026 |
| (pantalla, subtítulo 0) …vino de un virus (restos heredados de infecciones antiguas, no virus activos) | ✅ | PMC13709493 | «Ancient infections of the germline resulted in the integration of viral sequences into host chromosomes, where they are inherited as endogenous viral elements (EVEs)» | 2026 |
| Coherencia: el subtítulo nuevo ya no dice más que la voz ni contradice `guion.md`/`publicacion.md` (que dicen «vino de virus») | ✅ | revisión de los archivos del shot | — | — |

VEREDICTO: APROBADO
