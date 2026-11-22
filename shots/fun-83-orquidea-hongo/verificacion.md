# Verificación · Shot Fungi Mati #83 · Esto no es polvo: son semillas de orquídea

5 nov 2026. **Verificación independiente (subagente que no escribió el guion).** Se revisaron la voz (`narracion.json`), la
columna «Lo que se ve» y las notas de morfología de `guion.md`. Las fuentes se abrieron (texto completo o PDF extraído con
`pdftotext`); donde solo se pudo leer el resumen, se indica.

Fuentes abiertas:
- **[YEUNG]** Yeung, E. C. (2017). A perspective on orchid seed and protocorm development. *Botanical Studies* 58: 33. https://pmc.ncbi.nlm.nih.gov/articles/PMC5544657/ (texto completo).
- **[PUJ]** Pujasatria, G. C., Miura, C. y Kaminaka, H. (2020). In vitro symbiotic germination… *Plants* 9(12): 1742. https://pmc.ncbi.nlm.nih.gov/articles/PMC7763479/ (texto completo).
- **[RAS]** Rasmussen, H. N. et al. (2015). Germination and seedling establishment in orchids: a complex of requirements. *Annals of Botany* 116(3): 391–402. https://pmc.ncbi.nlm.nih.gov/articles/PMC4549959/ (texto completo).
- **[AG]** Arditti, J. y Ghani, A. K. A. (2000). Tansley Review 110. *New Phytologist* 145: 367–421. https://www.cambridge.org/core/journals/new-phytologist/article/abs/tansley-review-no-110-numerical-and-physical-properties-of-orchid-seeds-and-their-biological-implications/0A4A6DE17BF9A9E485642725970ACDDC (**solo el resumen**; el texto completo no se pudo abrir).
- **[CEIBA]** Arditti, J. (c. 1961, revista *Ceiba*, Zamorano). *Cycnoches ventricosum* var. *chlorochilon*. https://revistas.zamorano.edu/CEIBA/article/download/740/703/1481 (PDF completo, OCR). Es el origen del conteo del récord.
- **[SOTO]** Soto Arenas, M. A., Solano Gómez, R. y Hágsater, E. (2007). Risk of extinction and patterns of diversity loss in Mexican orchids. *Lankesteriana* 7(1-2): 114–121. https://www.redalyc.org/pdf/443/44339813020.pdf (PDF completo).
- **[CAST]** Castillo-Pérez, L. J. et al. (2024). Medicinal orchids of Mexico: a review. *Pharmaceuticals* 17(7): 907. https://pmc.ncbi.nlm.nih.gov/articles/PMC11279439/ (cita a Solano-Gómez et al. 2020, catálogo SNIB-CONABIO KT005; el catálogo original no se pudo abrir).
- **[RZE]** Rzedowski, J. (1996). Análisis preliminar de la flora vascular de los bosques mesófilos de montaña de México. *Acta Botanica Mexicana* 35: 25–44. https://abm.ojs.inecol.mx/index.php/abm/article/view/955 (resumen).
- **[OLR]** Ortega-Larrocea, M. P. y Rangel-Villafranco, M. (2007). Fungus-assisted reintroduction and long-term survival of two Mexican terrestrial orchids in the natural habitat. *Lankesteriana* 7(1-2): 317–321. https://archivo.revistas.ucr.ac.cr/index.php/lankesteriana/article/download/19558/19641 (PDF completo).
- **[RVOL]** Rangel-Villafranco, M. y Ortega-Larrocea, M. P. (2007). Efforts to conserve endangered terrestrial orchids in situ and ex situ at two natural reserves within Central Mexico. *Lankesteriana* 7(1-2): 326–333. https://www.redalyc.org/pdf/443/44339813068.pdf (PDF completo).
- **[LUB]** Lubinsky, P. et al. (2008). Origins and dispersal of cultivated vanilla (*Vanilla planifolia*). *Economic Botany* 62(2): 127–138. https://link.springer.com/doi/10.1007/s12231-008-9014-y (resumen, vía buscador; Springer pide inicio de sesión).
- **[POWO]** Plants of the World Online (Kew), *Vanilla planifolia* Andrews, distribución nativa (vía buscador; la página devolvió 403).

## Segunda vuelta (5 nov 2026, después de las correcciones del guionista)

Se volvieron a revisar `narracion.json` (voz final), `guion.md`, **todos los textos del objeto `TX` de `orquidea.jsx`**, el dibujo de
`Bletia` en el código y `publicacion.md` (las 7 redes y el comentario fijado).

### Voz y pantalla (narracion.json + TX de orquidea.jsx)

| # | Afirmación (voz o pantalla; clave de TX) | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Voz/`mito`, `semillas`: «Esto no es polvo: son semillas de orquídea» | ✅ | [YEUNG] | "Orchid seeds are small and dust-like." | 2017 |
| 2 | Voz/`sinHongo`: «Y en el bosque, sin hongo, no germinan» · «en el bosque, sin hongo: no germinan». Se revisó si vale para todas: las fuentes lo dicen de forma general para la naturaleza, y la excepción (germinar sin hongo) solo se da en laboratorio con azúcar; por eso «en el bosque» basta y no hace falta «casi nunca». | ✅ | [PUJ], [RAS], [YEUNG] | [PUJ]: "The only way for orchid seeds to germinate is by obtaining nutrients from an external source." "In nature, this is achieved by mycorrhizal symbiosis." [RAS]: plántula "completely dependent on organic carbon from a mycobiont". [YEUNG]: germinan sin hongo "in a simple medium as long as sucrose is present" (laboratorio, Knudson 1922). | 2015–2020 |
| 3 | Pantalla: cápsula seca que se abre en tiras | ✅ | [PUJ] | "one dehiscent capsule contains hundreds to millions of seeds" | 2020 |
| 4 | Voz/`numMx` `etqMx1` `etqMx2`: «más de mil doscientas especies de orquídeas» · «+1200 especies de orquídeas en México» | ✅ | [SOTO], [CAST] | [SOTO]: "The orchid family comprises in Mexico some 1254 species and 21 subspecific taxa". [CAST]: "Mexico has more than 1302 orchid species" (Solano-Gómez et al. 2020). Las dos cuentas superan 1,200. | 2007 / 2020 |
| 5 | Voz/`bosque1` `bosque2` `epifita`: «muchas cuelgan en el bosque de niebla» · «bosque de niebla» · «bosque mesófilo de montaña» · «orquídea pegada a la rama» | ✅ | [SOTO], [RZE] | [SOTO]: "nearly 60% of the species are found in the cloud forests". [RZE]: "la forma biológica mejor representada corresponde a las epífitas" "y la familia numéricamente prevaleciente es la de las Orchidaceae". | 1996 / 2007 |
| 6 | Voz: «Una cápsula puede soltar millones de semillas al viento» | ✅ | [PUJ], [AG] | [PUJ]: "hundreds to millions of seeds"; "extensive dispersal, especially via anemochory". [AG]: "They can float in the air for long periods". | 2000 / 2020 |
| 7 | `numCap` `numCapPre` `etqCap` `etqCap2`: «≈ 4,000,000 · semillas en una cápsula (estimado)» · «récord: *Cycnoches* · Kew, 1896 (Arditti y Ghani, 2000)» | ✅ corregido | [AG], [CEIBA] | [AG]: "Recorded numbers of seeds per fruit are as high as 4000000". [CEIBA]: "On March 1896 a seed capsule of Cycnoches ventricosum var. chlorochilon was received at Kew"; "arrived at the figure of 3,770,000 seeds for the pod… the figure would probably be 4,000,000 or close to it." Ya dice «≈», «estimado» y el año. | 1896 (reseña 2000) |
| 8 | `porDentro` `testa`: «AL MICROSCOPIO · LA SEMILLA» · «testa (cubierta)»; voz «Es una red…» (testa transparente con dibujo de red) | ✅ | [YEUNG], micromorfología | [YEUNG]: "the seed coat is composed of a few layers of cells". SEM de semillas: "Testa cells are usually transparent, with smooth or reticulated outer cell walls." La morfología del guion ya no dice «una capa». | 2017 |
| 9 | Voz/`embrion`: «un embrión diminuto» | ✅ | [YEUNG], [AG] | "the embryo is small with a reduced number of cells." / "Embryos are even smaller: their volume is substantially smaller than that of the testa." | 2000 / 2017 |
| 10 | Voz: «sin endospermo: casi sin comida para arrancar. No trae lonchera.» · `sinReservas`: «sin endospermo (la "lonchera" de otras semillas)» | ✅ corregido | [YEUNG], [PUJ] | [YEUNG]: "The failure to form a functional endosperm is one of the distinctive features in orchid seed development." [PUJ]: "lacking endosperm that is normally required as an initial energy resource during germination". «Casi sin comida para arrancar» respeta que el embrión sí guarda algo ("storage protein and lipid deposits", [YEUNG]) y que no le alcanza. | 2017 / 2020 |
| 11 | `comidaPropia`: «comida propia: muy poca · el resto, del hongo» | ✅ | [AG], [PUJ], [RAS] | «Muy poca» en términos absolutos: [AG] "Known seed weights extend from 0.31 [µg] to 24 μg"; [PUJ]: "The only way… is by obtaining nutrients from an external source". «El resto, del hongo»: [RAS] "completely dependent on organic carbon from a mycobiont" durante la fase sin fotosíntesis. | 2000–2020 |
| 12 | Voz/`hifa` `micorriza` `hongo1` `hongo2`: «Deja entrar a un hongo, como *Tulasnella* o *Ceratobasidium*» · «hifa del hongo» · «hongo micorrízico» | ✅ | [RAS], [PUJ], [RVOL] | [RAS]: "Rhizoctonia species predominating"; "Tulasnellaceae"; "orchid mycobionts in Ceratobasidium". [PUJ] Tabla 1: "Ceratobasidium sp."; *Tulasnella calospora*. | 2007–2020 |
| 13 | Pantalla: la hifa entra por el suspensor | ✅ | [YEUNG] | "the degenerated suspensor appears to be the preferred site of hyphae entry." | 2017 |
| 14 | Voz/`peloton` `celula`: «Sus hilos se enrollan dentro de las células en ovillos: los pelotones» · «pelotón (ovillo de hifas)» · «célula del embrión» | ✅ | [RAS], [YEUNG] | "peloton formation, i.e. intracellar hyphal coils"; "Pelotons appear within the enlarged basal cells of the protocorm". | 2015 / 2017 |
| 15 | Voz/`quien`: «¿Y quién se come a quién?» | ✅ | — | Pregunta retórica, no afirma nada. | — |
| 16 | Voz/`mico`: «La semilla digiere esos ovillos: empieza su vida comiendo hongo» · «come del hongo: micoheterotrofia» | ✅ | [PUJ], [RAS] | "these are digested by protocorm cells." / "completely dependent on organic carbon from a mycobiont". | 2015 / 2020 |
| 17 | Voz/`protocormo` `hoja` `raiz`: «Se hincha en una bolita, el protocormo, y saca hojas y raíces» · «primera hoja» · «raíz» | ✅ | [YEUNG] | "the orchid embryo first develops into a protocorm before forming a plantlet."; "adventitious roots begin to form near the SAM". | 2017 |
| 18 | Voz/`anio` `estQuien` `estRevista`: «En 2007, la UNAM reportó…» · «2007» · «UNAM · Pedregal de San Ángel» · «Lankesteriana, 2007 · CDMX». «Reportó» resuelve que la reintroducción fue antes (proyecto desde 2001, seguimiento de seis años). | ✅ corregido | [OLR] | Publicado en *Lankesteriana* 7(1-2), 2007; Instituto de Geología, UNAM; "Since 2001, with the help of students, we started a project for symbiotic propagation of terrestrial orchids from southern Mexico City". | 2007 |
| 19 | Voz/`bletia` `frasco`: «plántulas de *Bletia urbana*… criadas con sus hongos» · «plántulas + sus hongos, en frasco» | ✅ | [OLR] | "Seedlings were cultivated in vitro with mycorrhizal fungi and successfully reintroduced"; "Adult plants of B. urbana are associated naturally with Epulorhiza fungi". | 2007 |
| 20 | Voz/`peligro`: «orquídea en peligro» | ✅ | [OLR] | "Bletia urbana Dressler, is an endangered species". (En sentido general, como la fuente; no se menciona la NOM-059.) | 2007 |
| 21 | Voz: «…devueltas al Pedregal de San Ángel» (rocas volcánicas) | ✅ | [OLR], [RVOL] | "reintroduced within a biological reserve located in Mexico City"; [RVOL]: "studies of reintroduction, in the Ecological Reserve el Pedregal (see Ortega-Larrocea and Rangel in the same volume)". | 2007 |
| 22 | Voz/`anios` `pct` `sobrevive`: «Tras seis años, sobrevivía cerca de la mitad» · «6 años» · «≈ 50 % sobrevivió» | ✅ | [OLR] | "We have monitored growth for the past six years with a final survival of ca. 50 %." | 2007 |
| 23 | Voz/`florecen`: «y ya florecían» · «¡y florecen!» | ✅ | [OLR] | "After five years, plants start to flower" | 2007 |
| 24 | Dibujo de *Bletia*: flor color neutro (blanco hueso y beige, `#fbf7ee`/`#efe8da`), con comentario «no se afirma el color real» | ✅ corregido | — | Ya no afirma un color que no se pudo verificar. | — |
| 25 | Voz/`nativa` `mapa`: «nativa de México y Centroamérica» · «mapa esquemático» | ✅ | [LUB], [POWO] | [LUB]: "originating from Mesoamerica"; [POWO] nativa de México, Belice, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica y Panamá (también Colombia y norte de Brasil; la frase no dice «solo»). | 2008 |
| 26 | Voz/`vainilla` `vainilla2`: «también es una orquídea» · «*Vanilla planifolia*» · «vainilla · también orquídea» | ✅ | [LUB] | "Vanilla planifolia Jacks. [Orchidaceae]" | 2008 |
| 27 | Pantalla: enredadera de vainilla, flor amarillo verdosa, vainas largas (sus semillas no se dibujan como polvo) | ✅ | [YEUNG] | *V. planifolia* tiene "multi- layered seed coat" (distinta de las semillas polvo). | 2017 |
| 28 | Voz/`cierre`: «Ese polvo no es polvo: es un bosque de orquídeas esperando su hongo» · «no es polvo» | ✅ | — | Metáfora de cierre; resume #1, #2 y #6. | — |

Las 13 líneas de voz de `narracion.json` coinciden con las de `guion.md`. Todas las claves de `TX` quedan cubiertas (filas 1–28).

### publicacion.md

| # | Afirmación (red) | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| P1 | Todas: gancho, >1,200 especies, epífitas del bosque de niebla, millones de semillas al viento, récord ≈ 4 millones estimado en *Cycnoches* (Kew, 1896), testa con red, sin endospermo / casi sin comida, *Tulasnella*/*Ceratobasidium* («Rhizoctonia»), pelotones digeridos, micoheterotrofia, protocormo, estudio UNAM 2007 (autoras, Instituto de Geología, frasco, seis años, ~50 %, flor desde el quinto año), vainilla, germinación sin hongo solo en laboratorio con azúcar | ✅ | las mismas de arriba | Ver filas 1–28. [RAS]: "imperfect Rhizoctonia species predominating"; [OLR]: "After five years, plants start to flower". | 1896–2024 |
| P2 | YouTube: «En el bosque de niebla… las orquídeas están entre las plantas más abundantes» | ⚠️ | [RZE] | Rzedowski habla de **número de especies** ("la familia numéricamente prevaleciente es la de las Orchidaceae, que supera más de dos veces a Compositae"), no de abundancia de individuos. | 1996 |
| P3 | YouTube: «catálogos de Hágsater, Soto-Arenas y colaboradores, 2005–2007, y su actualización de 2020 para CONABIO» | ✅ | [SOTO], [CAST] | Soto Arenas et al. 2007: "some 1254 species"; la actualización de 2020 es de Solano-Gómez, Salazar, Jiménez, Hágsater y Cruz-García (citada por [CAST]). | 2007 / 2020 |
| P4 | LinkedIn: «Las semillas de orquídea son de las más pequeñas de las plantas» | ⚠️ | [AG], [YEUNG] | Superlativo no encontrado en las fuentes abiertas: [AG] solo dice "Orchid seeds are very small, extremely light and produced in great numbers"; [YEUNG]: "small and dust-like". | 2000 / 2017 |
| P5 | Facebook: «En 2007, la UNAM devolvió al Pedregal de San Ángel plántulas…» · Threads: «En 2007, la UNAM devolvió al Pedregal plántulas criadas así» | ⚠️ | [OLR] | La reintroducción fue antes: proyecto "Since 2001" y seguimiento de "the past six years" reportado en 2007. En 2007 se **reportó**, no se devolvió. | 2007 |
| P6 | Comentario fijado: lista de fuentes | ✅ | — | Coinciden con las fuentes de esta tabla. | — |

## Correcciones necesarias

Voz y pantalla: **ninguna** (las 3 de la primera vuelta quedaron bien). Faltan 3 arreglos de texto en `publicacion.md`:

1. **P2 (YouTube, descripción):** cambiar «las orquídeas están entre las plantas más abundantes, y muchas viven como epífitas» por «las orquídeas son la familia de plantas con más especies, y muchas viven como epífitas».
2. **P4 (LinkedIn):** cambiar «Las semillas de orquídea son de las más pequeñas de las plantas:» por «Las semillas de orquídea son diminutas y ligerísimas, como polvo:».
3. **P5 (Facebook y Threads):** Facebook: «En 2007, la UNAM reportó plántulas de una orquídea en peligro criadas con sus hongos y devueltas al Pedregal de San Ángel: a los seis años sobrevivía cerca de la mitad.» Threads: «En 2007, la UNAM reportó plántulas criadas así y devueltas al Pedregal: a los seis años sobrevivía cerca de la mitad.»

Con esas tres frases cambiadas tal cual, el shot queda aprobado sin otra vuelta (no tocan la voz ni la pantalla).

Las 3 frases de publicacion.md se cambiaron tal cual al texto sugerido (coordinador, 5 nov 2026).

## Re-verificación independiente (5 nov 2026)

Segunda verificación pedida por Robert antes de generar la voz, hecha por un verificador que no escribió el guion ni la primera
verificación. Se volvieron a abrir en texto completo: Ortega-Larrocea y Rangel-Villafranco 2007 (PDF), Rangel-Villafranco y
Ortega-Larrocea 2007 (PDF), Yeung 2017, Pujasatria et al. 2020, Rasmussen et al. 2015 y Castillo-Pérez et al. 2024 (PMC),
Arditti (*Ceiba*, PDF), el artículo de *Acta Botanica Mexicana* 2017 (SciELO), el resumen de Rzedowski 1996 y la ficha de
*Vanilla planifolia* de Kew (vía ColPlanta, POWO bloqueado). Se revisaron las 13 líneas de `narracion.json`, todo `TX` de
`orquidea.jsx` y `publicacion.md`.

| afirmación | veredicto | fuente | frase textual | año |
|---|---|---|---|---|
| «Esto no es polvo: son semillas de orquídea» | ✅ | Yeung 2017 | «Orchid seeds are small and dust-like» | 2017 |
| «Y en el bosque, sin hongo, no germinan» | ✅ | Pujasatria et al. 2020; Yeung 2017 | «The only way for orchid seeds to germinate is by obtaining nutrients from an external source. In nature, this is achieved by mycorrhizal symbiosis»; en laboratorio germinan sin hongo «in a simple medium as long as sucrose is present (Knudson 1922)» (por eso «en el bosque») | 2020 / 2017 |
| «México tiene más de mil doscientas especies de orquídeas»; «+1200» | ✅ | Acta Bot. Mex. 2017 (SciELO); Castillo-Pérez et al. 2024 | «En México están registradas 1260 especies y 170 géneros de orquídeas»; «Mexico has more than 1302 orchid species» (cita al catálogo de 2020) | 2017 / 2024 |
| «muchas cuelgan en el bosque de niebla»; «bosque mesófilo de montaña» | ✅ | Acta Bot. Mex. 2017; Rzedowski 1996 | BMM «donde se encuentran 60% de sus especies»; «la forma biológica mejor representada corresponde a las epífitas»; «la familia numéricamente prevaleciente es la de las Orchidaceae» | 2017 / 1996 |
| «Una cápsula puede soltar millones de semillas al viento» | ✅ | Pujasatria et al. 2020 | «one dehiscent capsule contains hundreds to millions of seeds» | 2020 |
| «≈ 4,000,000 · semillas en una cápsula (estimado)» · «récord: *Cycnoches* · Kew, 1896» | ✅ | Arditti, *Ceiba*; Arditti y Ghani 2000 | «On March 1896 a seed capsule of Cycnoches ventricosum var. chlorochilon was received at Kew»; «arrived at the figure of 3,770,000… the figure would probably be 4,000,000»; [AG] «as high as 4000000» | 1896 (reseña 2000) |
| «un embrión diminuto, sin endospermo: casi sin comida para arrancar» | ✅ | Yeung 2017; Pujasatria et al. 2020 | «The failure to form a functional endosperm is one of the distinctive features»; «the embryo is small with a reduced number of cells»; «seeds consisting of a seed coat and rudimentary embryo» | 2017 / 2020 |
| «Deja entrar a un hongo, como *Tulasnella* o *Ceratobasidium*»; la hifa entra por el suspensor | ✅ | Rasmussen et al. 2015; Yeung 2017 | «fungi identifiable as imperfect Rhizoctonia species predominating»; «fungi from Tulasnellaceae»; «orchid mycobionts in Ceratobasidium»; «the degenerated suspensor appears to be the preferred site of hyphae entry» | 2015 / 2017 |
| «Sus hilos se enrollan dentro de las células en ovillos: los pelotones» | ✅ | Rasmussen et al. 2015 | «peloton formation, i.e. intracellar hyphal coils» | 2015 |
| «La semilla digiere esos ovillos: empieza su vida comiendo hongo»; «micoheterotrofia» | ✅ | Pujasatria et al. 2020; Rasmussen et al. 2015 | «Pelotons are not permanently formed; instead, these are digested by protocorm cells»; «completely dependent on organic carbon from a mycobiont» | 2020 / 2015 |
| «Se hincha en una bolita, el protocormo, y saca hojas y raíces» | ✅ | Yeung 2017 | «the orchid embryo first develops into a protocorm before forming a plantlet» | 2017 |
| «En 2007, la UNAM reportó plántulas de *Bletia urbana*, orquídea en peligro, criadas con sus hongos» | ✅ | Ortega-Larrocea y Rangel-Villafranco 2007 | Instituto de Geología, UNAM; «Seedlings were cultivated in vitro with mycorrhizal fungi and successfully reintroduced within a biological reserve located in Mexico City. Bletia urbana Dressler, is an endangered species» | 2007 |
| «…y devueltas al Pedregal de San Ángel» | ✅ | Rangel-Villafranco y Ortega-Larrocea 2007 | «conducted studies of reintroduction, in the Ecological Reserve el Pedregal (see Ortega-Larrocea and Rangel in the same volume)»; «El Pedregal in Mexico City» | 2007 |
| «Tras seis años, sobrevivía cerca de la mitad, y ya florecían»; «6 años», «≈ 50 %», «¡y florecen!» | ✅ | Ortega-Larrocea y Rangel-Villafranco 2007 | «We have monitored growth for the past six years with a final survival of ca. 50 %»; «After five years, plants start to flower» (se refiere a *B. urbana*, no a la otra especie del artículo) | 2007 |
| «La vainilla, nativa de México y Centroamérica, también es una orquídea» | ✅ | Kew POWO (vía ColPlanta); Lubinsky et al. 2008 | «The native range of this species is S. Mexico to N. Brazil»; familia Orchidaceae (la frase no dice «solo») | actual / 2008 |
| Cierre «Ese polvo no es polvo: es un bosque de orquídeas esperando su hongo» | ✅ | — | Metáfora que resume filas ya verificadas. | — |
| publicacion.md: «en el bosque mesófilo… las orquídeas son la familia de plantas con más especies» | ✅ | Rzedowski 1996 | «la familia numéricamente prevaleciente es la de las Orchidaceae, que supera más de dos veces a Compositae» | 1996 |
| publicacion.md: «el grupo llamado “Rhizoctonia”», autoras e Instituto de Geología, «en frasco», reserva de la CDMX, resto de redes | ✅ | Rasmussen et al. 2015; Ortega-Larrocea y Rangel-Villafranco 2007 | Igual que las filas de arriba (in vitro = en frasco). Las 3 correcciones de la primera vuelta (P2, P4, P5) quedaron aplicadas. | 2007 / 2015 |

**Cambios hechos:** ninguno. Se revisó con cuidado que el 50 % de supervivencia y la floración del artículo de 2007 son de
*Bletia urbana* (la otra especie, *Dichromanthus aurantiacus*, tuvo 15 % y menos de 5 %), y que el Pedregal de San Ángel es la
reserva donde se hizo la reintroducción. Todo queda ✅; la tabla «## Fuentes» de `guion.md` coincide.

VEREDICTO: APROBADO
