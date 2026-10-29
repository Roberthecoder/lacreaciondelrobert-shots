# Verificación de hechos · bio-06-lactosa

- **Verificación independiente:** 28 de octubre de 2026, por un verificador que no escribió el guion y que abrió cada fuente (no se quedó con el resumen del buscador).
- **Correcciones aplicadas el 28 oct 2026:** el gancho («trae el gen que te falta») pasó a «trae un gen que te hace digerir la leche» (los adultos no carecen del gen y el vector llevaba un gen bacteriano de β-galactosidasa); se dice que la intolerancia de las ratas era provocada en el laboratorio; el medidor de la escena de las ratas dice "ENZIMA QUE PARTE LA LACTOSA". Cambió el texto narrado: se quitó `voz_aprobada`.
- Las frases textuales se volvieron a abrir el 28 oct 2026 (ScienceDaily/Thomas Jefferson University, API de Europe PMC, hackaday.com, thethoughtemporium.com).

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| El virus del gancho trae un gen que hace digerir la leche (no "el gen que te falta") | ✅ | Nota de prensa de Thomas Jefferson University (vía ScienceDaily) | "Dr. During and his colleagues inserted a beta-galactosidase gene--which encodes for an enzyme that breaks down lactose--into an adeno-associated virus vector" | 1998 |
| El estudio es de 1998, en *Nature Medicine* 4: 1131–1135 | ✅ | Europe PMC, registro del artículo (doi 10.1038/2625) | "Peroral gene therapy of lactose intolerance using an adeno-associated virus vector" · Nature Medicine, vol. 4, pp. 1131-1135 | 1998 |
| Vector adeno-asociado dado por la boca, expresión persistente en el intestino y recuperación del fenotipo | ✅ | Abstract del artículo (Europe PMC) | "an orally administered adeno-associated viral vector leads to persistent expression of a beta-galactosidase transgene in both gut epithelial and lamina propria cells, and that this approach results in long-term phenotypic recovery in an animal model of lactose intolerance" | 1998 |
| Fue en ratas | ✅ | Thomas Jefferson University (ScienceDaily) | "Scientists at Jefferson Medical College have successfully administered gene therapy orally, effectively curing lactose intolerance in rats" | 1998 |
| La intolerancia de esas ratas era provocada en el laboratorio (corregido) | ✅ | Thomas Jefferson University (ScienceDaily) | "enough, he says, to correct the experimentally induced lactose intolerance in the animals" | 1998 |
| Fue en Filadelfia | ✅ | Thomas Jefferson University (ScienceDaily) | "Matthew During, M.D., professor of neurosurgery and director of the Central Nervous System Gene Therapy Center at Thomas Jefferson University in Philadelphia" | 1998 |
| El efecto duró meses | ✅ | Thomas Jefferson University (ScienceDaily) | "The effect lasted four months, the length of the experiment" | 1998 |
| La mayoría de los adultos del mundo baja la producción de lactasa | ✅ | "Lactose intolerance and probiotics…", PMC12995986 | "Lactase non-persistence is extremely common, affecting approximately 70% of the adult population world-wide" | 2026 |
| Sin lactasa la lactosa llega al colon y las bacterias la fermentan: gas | ✅ | PMC12995986 | "undigested lactose proceeds to the colon where it is fermented by the gut flora, generating gas that trigger the uncomfortable symptoms associated with lactose intolerance" | 2026 |
| El intestino cambia su recubrimiento cada 4 o 5 días | ✅ | "Cellular Plasticity in Gut and Liver Regeneration", PMC11565004 | "stem cells exist and keep differentiating into enteroendocrine cells, goblet cells, and enterocytes, thus replenishing the diverse types of IECs every 4 to 5 days" | 2024 |
| En 2018 un divulgador (Justin Atkin, The Thought Emporium) se lo hizo a sí mismo y lo grabó | ✅ | Hackaday, "Biohacking Lactose Intolerance" (14 feb 2018) | "Such was the position that [The Thought Emporium] found himself in at age 16… he embarked on a journey of DIY gene therapy to restore his ability to indulge in comfort foods" | 2018 |
| No es un tratamiento aprobado ni hay artículo revisado por pares | ✅ | Página del proyecto, thethoughtemporium.com/lactose; búsqueda en Europe PMC sin resultados | "Please keep in mind this project is still in the develpment stage and is not finished" | 2018 (consultada en 2026) |
| El shot no da ningún porcentaje mundial de intolerancia (el metaanálisis del 68 % está retractado) | ✅ | Europe PMC, registro de Storhaug et al., *Lancet Gastroenterol Hepatol* (2017) | tipo de publicación "Retracted Publication"; "Retraction in Lancet Gastroenterol Hepatol. 2025 Jan;10(1):13" | retractado en 2025 |
| El dibujo del virus, de las enzimas y de las moléculas es esquemático | ✅ | Declarado en el guion y en los textos de publicación | "El dibujo es esquemático." | 2026 |

Sin ❌ ni ⚠️ pendientes.

## Re-verificación (29 oct, auditoría)

Se revisó lo que cambió el 29 oct y se corrigió dos veces: primero la voz decía "una enzima **de bacteria**" (origen no verificable en ninguna fuente abierta: todas dicen solo "a beta-galactosidase gene") y que la intolerancia de las ratas era "**provocada en el laboratorio**" (falso: la patente de los propios autores dice que eran ratas adultas con poca lactasa, escogidas por eso). Ambos textos ya están corregidos en narracion.json, el .jsx, guion.md y publicacion.md; la fila "intolerancia provocada" de la tabla de arriba (que se apoyaba en la nota de prensa, más laxa) queda corregida aquí.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Voz 5 (final): el virus iba "cargando el gen de una enzima que parte la lactosa" (sin decir de qué organismo) | ✅ | Nota de Thomas Jefferson University (ScienceDaily); resumen de *Nature Medicine* 4:1131 (Europe PMC) | "inserted a beta-galactosidase gene--which encodes for an enzyme that breaks down lactose" · "persistent expression of a beta-galactosidase transgene in both gut epithelial and lamina propria cells" | 1998 |
| El transgén era bacteriano (lacZ / β-galactosidasa de bacteria) | ⚠️ no verificable → **ya no se afirma** en ningún texto del shot | Patente US6110456 (During et al., texto completo); Goodman et al., *Blood* 1994 84:1492 (plásmido pAB II del vector) | "AAVlac is the recombinant AAV vector prepared from pAB II as described (Goodman et al. Blood 1994 84:1492-1500)" · "A vector was constructed containing the coding sequences for beta-galactosidase (beta-gal), including a nuclear localization signal, under the control of a strong viral promotor" | 1998 (vector, 1994) |
| Voz 6, chip y subtítulo (final): eran "ratas adultas con poca lactasa", modelo de hipolactasia del adulto, escogidas por eso — no una intolerancia provocada | ✅ | Patente US6110456 (During et al., mismo experimento) | "We elected to study the adult rat as a genetic model of adult-onset hypolactasia" · "We therefore selected only those animals that had a flat plasma glucose curve following feeding with lactose" | 1998 |
| "…con poca lactasa **como nosotros**": en humanos la caída de lactasa en el adulto es lo común | ✅ | "Lactose intolerance and probiotics…", PMC12995986 | "Lactase non-persistence is extremely common, affecting approximately 70% of the adult population world-wide" | 2026 |
| "De bebés casi todos fabricamos lactasa" | ✅ | PMC12995986 | "Congenital Lactase Deficiency (CLD) is an extremely rare and severe autosomal recessive disease characterized by the total absence or significant reduction of lactase activity from birth" | 2026 |
| Virus adeno-asociado dado por la boca, 1998, Filadelfia, efecto de meses (4, lo que duró el experimento) | ✅ (sin cambios) | Resumen de *Nature Medicine* 4:1131; nota de Thomas Jefferson University (ScienceDaily); patente US6110456 | "an orally administered adeno-associated viral vector leads to persistent expression…" · "The effect lasted four months, the length of the experiment" · "phenotypic correction extended to at least 4 months" | 1998 |
| Las ratas tratadas recuperaron la digestión de la lactosa (medidor "ENZIMA QUE PARTE LA LACTOSA") | ✅ (sin cambios) | Resumen de *Nature Medicine* 4:1131 | "this approach results in long-term phenotypic recovery in an animal model of lactose intolerance" | 1998 |

Sin ❌ ni ⚠️ afirmados en el shot (el único ⚠️ se quitó del texto).

VEREDICTO: APROBADO
