# Verificación de hechos · fun-128-umami-seco (Shot Fungi Mati #128)

Verificador independiente (subagente que no escribió el guion, lanzado por el coordinador) · 5 nov 2026.
Resultado inicial: 18 ✅, 1 ⚠️ («quince veces»), 0 ❌. La ⚠️ se corrigió (abajo).

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Shiitake = *Lentinula edodes* | ✅ | https://en.wikipedia.org/wiki/Shiitake | "Lentinula edodes" | 2026 |
| Guanilato se halló como umami en shiitake seco | ✅ | https://pmc.ncbi.nlm.nih.gov/articles/PMC4515277/ | "5′-Guanylate as an umami substance was first found in dried shiitake mushroom." | 2015 |
| Guanilato sabe a umami | ✅ | PMC4515277 | "In 1957, Kuninaka found that 5′-guanylate has umami taste." | 2015 (dato 1957) |
| Fresco poco guanilato, seco muchísimo | ✅ | PMC4515277 ; https://www.umamiinfo.com/richfood/foodstuff/mushroom.php | "Content of 5′-guanylate in a raw mushroom is rather low but is very high in dried mushroom." | 2015 |
| Al secarse se rompen sus células | ✅ | PMC4515277 | "In the process of drying, cells of mushroom are broken" | 2015 |
| Ribonucleasas cortan el ARN | ✅ | PMC4515277 | "When cells are dead, cells are broken and ribonuclease contacts with ribonucleic acid." | 2015 |
| Enzima óptima 60–70 °C | ✅ | PMC4515277 | "Optimum temperature of the enzyme is 60~70°C." | 2015 |
| Subir rápido a 60–70 °C | ✅ | PMC4515277 | "should be quickly increased to 60~70°C" | 2015 |
| Nucleotidasa lo deshace a temperatura ambiente; remojo frío | ✅ | PMC4515277 | "The water should be cold because 5′-guanylate is decomposed into guanosine by nucleotidase at room temperature." | 2015 |
| Remojo corto y frío, mejor umami | ✅ | https://www.jstage.jst.go.jp/article/nskkk1962/36/4/36_4_293/_article/-char/en | "the soaking for a shorter time at lower temperature was desirable." | 1989 |
| Receptor T1R1 + T1R3 | ✅ | PMC4515277 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC2606899/ | "The umami taste receptor is a heteromeric complex of 2 class C G-protein-coupled receptors, T1R1 and T1R3." | 2008 |
| Atrapamoscas (Venus flytrap) | ✅ (modelo) | PMC2606899 | "a cooperative ligand-binding model involving the Venus flytrap domain of T1R1" | 2008 |
| Glutamato cerca de la bisagra | ✅ (modelo) | PMC2606899 | "L-glutamate binds close to the hinge region" | 2008 |
| Nucleótido en la orilla, estabiliza el cierre | ✅ (modelo) | PMC2606899 | "5′ ribonucleotides bind to an adjacent site close to the opening of the flytrap… to further stabilize the closed conformation." | 2008 |
| 2008, equipo de San Diego | ✅ | PMC2606899 | "Senomyx, Incorporated, … San Diego, CA 92121" | 2008 |
| Mutantes / piezas cambiadas | ✅ | PMC2606899 | "using chimeric T1R receptors, site-directed mutagenesis, and molecular modeling" | 2008 |
| Pizca de nucleótido que sola no sabe | ✅ | PMC2606899 | "200 μM of IMP, which does not elicit any umami taste by itself" | 2008 |
| Hace notar el glutamato con mucho menos | ✅ (corregida; se quitó «quince veces» porque no está escrito en Li 2002) | PMC2606899 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC123709/ | "human T1R1/T1R3 responds to the umami taste stimulus l-glutamate, and this response is enhanced by 5′-ribonucleotides" | 2002 / 2008 |
| Kombu = glutamato | ✅ | PMC4515277 | "In 1908, the active principle of seaweed kombu was identified as glutamate by Ikeda" | 2015 (dato 1908) |
| Caldo kombu + shiitake seco (shōjin dashi) | ✅ | https://app.ckbk.com/reference/umam37582b03s001e261/shojin-dashi | "strictly vegetarian soup stock that is an extract of konbu and dried shiitake mushrooms" | 2014 |
| Sinergia glutamato + guanilato | ✅ | PMC4515277 | "Synergism between glutamate and 5′-nucleotides (5′-inosinate and 5′-guanylate) was found by Kuninaka." | 2015 |

## Correcciones aplicadas
- Escena 12 (⚠️): «…hace quince veces más fácil notar el glutamato» → «…hace que notes el glutamato con mucho menos». En pantalla se quitó
  el «15×»; queda una línea de umbral que baja con la etiqueta «menos glutamato para notarlo · con IMP».
- Receptor: la etiqueta dice «modelo (esquemático)», porque el atrapamoscas con bisagra y orilla es un modelo propuesto (Zhang 2008).
- Escena 13: el hongo que entra a la olla va ya remojado en frío, coherente con la escena 6.
- No se usa ningún multiplicador de sinergia (8×, 7–8×, 30×, 15×).


## Re-verificación independiente (5 nov 2026)

Segundo verificador (no escribió el guion ni la primera verificación). Se revisaron `guion.md`, `narracion.json`, letreros y subtítulos de
`umami-seco.jsx` y `publicacion.md`. Fuentes abiertas de nuevo: Kurihara 2015 (texto completo vía Europe PMC), Zhang et al. 2008 (resumen
en Europe PMC + texto en PMC), Sasaki et al. 1989 (resumen en J-STAGE). Resultado: 0 ❌, 2 ⚠️ menores (fuera de la voz), corregidas.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Shiitake fresco poco guanilato; seco, mucho | ✅ | https://pmc.ncbi.nlm.nih.gov/articles/PMC4515277/ | "Content of 5′-guanylate in a raw mushroom is rather low but is very high in dried mushroom." | 2015 |
| Guanilato con sabor umami («a caldo»), hallado en shiitake seco | ✅ | PMC4515277 | "5′-Guanylate as an umami substance was first found in dried shiitake mushroom." | 2015 (dato 1957) |
| Al secarse se rompen las células y la ribonucleasa corta el ARN | ✅ | PMC4515277 | "In the process of drying, cells of mushroom are broken and 5′-guanylate is produced by decomposition of ribonucleic acid by ribonuclease." | 2015 |
| Al calentarlo se suelta más guanilato | ✅ | PMC4515277 | "temperature of the water containing 5′-guanylate from the mushroom should be quickly increased to 60~70°C to produce 5′-guanylate further." | 2015 |
| Ribonucleasa: óptimo 60–70 °C | ✅ | PMC4515277 | "Optimum temperature of the enzyme is 60~70°C." | 2015 |
| Otra enzima (nucleotidasa) lo deshace a temperatura ambiente → remojo en agua fría | ✅ | PMC4515277 | "The water should be cold because 5′-guanylate is decomposed into guanosine by nucleotidase at room temperature." (su óptimo es 45–50 °C; el guion solo dice que actúa a temperatura ambiente) | 2015 |
| Chip «25 °C» como temperatura ambiente | ✅ (ilustrativo) | PMC4515277 ; Sasaki 1989 (usa 25 °C como remojo a temperatura ambiente) | "at 25°C for 5 to 15h" | 1989 |
| Remojo frío y corto conviene | ✅ | https://www.jstage.jst.go.jp/article/nskkk1962/36/4/36_4_293/_article/-char/en | "the soaking for a shorter time at lower temperature was desirable." | 1989 |
| Receptor del umami humano T1R1 + T1R3 (el que muestra la sinergia) | ✅ | PMC4515277 | "T1R1 + T1R3 was established to be umami receptor in human." / "only T1R1 + T1R3 receptor exhibits the synergism." | 2015 |
| Atrapamoscas; glutamato junto a la bisagra; nucleótido en la orilla, más cerrada (modelo) | ✅ (dicho como propuesta: «Lo propuso») | https://pmc.ncbi.nlm.nih.gov/articles/PMC2606899/ | "We propose a cooperative ligand-binding model involving the Venus flytrap domain of T1R1, where L-glutamate binds close to the hinge region, and 5′ ribonucleotides bind to an adjacent site close to the opening of the flytrap to further stabilize the closed conformation." | 2008 |
| 2008, equipo de San Diego; receptores quiméricos y mutados | ✅ | PMC2606899 (Europe PMC) | "Senomyx, Incorporated, 4767 Nexus Centre Drive, San Diego, CA 92121" / "using chimeric T1R receptors, site-directed mutagenesis, and molecular modeling" | 2008 |
| Pizca de nucleótido que sola no sabe hace notar el glutamato con mucho menos (pruebas en personas) | ✅ (sin cifra en pantalla) | PMC2606899 | "In human taste tests, 200 μM of IMP, which does not elicit any umami taste by itself, can increase one's umami taste sensitivity to glutamate by 15-fold" | 2008 |
| Kombu = glutamato; caldo kombu + hongo seco | ✅ | PMC4515277 | "Surprisingly, the kombu dashi contains only glutamate and aspartate" / "the mushrooms containing 5′-guanylate such as dried porcini and morel instead of dried bonito can be used." | 2015 |
| Chip «se suman en el receptor» (escena Dashi) | ⚠️ → corregido | PMC2606899 | "The umami taste of L-glutamate can be drastically enhanced by 5′ ribonucleotides and the synergy is a hallmark" (no es una suma: es sinergia) | 2008 |
| Publicación (YouTube): guanosina «que ya no sabe a umami» | ⚠️ → corregido | PMC4515277 solo dice que el guanilato se descompone en guanosina; no se abrió fuente primaria sobre el sabor de la guanosina | — | — |
| Barras 2 cm (hongo), 10 µm (hifas), 5 nm (receptor, esquemático) | ✅ (órdenes de magnitud correctos; el receptor y el ARN marcados como esquemáticos) | — | — | — |

**Correcciones de esta re-verificación (texto narrado de `narracion.json`: sin cambios):**
- `umami-seco.jsx`, chip de la escena Dashi: «se suman en el receptor» → «se potencian en el receptor».
- `publicacion.md` (YouTube): «(que ya no sabe a umami)» → «(y así se pierde guanilato)».

VEREDICTO: APROBADO
