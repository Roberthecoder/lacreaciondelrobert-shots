# Verificación de hechos · bio-36-petasa

- **Verificación independiente:** 29 de octubre de 2026, por un verificador que no escribió el guion y que abrió cada fuente (Yoshida 2016 en texto completo anotado,
  Tanasupawat 2016 y Tournier 2020 vía Europe PMC, Sulaiman 2012 en PubMed, LPSN, comunicados de Carbios de dic 2025 y mar 2026).
- **Resultado inicial:** 16 ✅, 3 ⚠️ y 1 ❌. Todas se corrigieron en `guion.md`, `narracion.json`, `petasa.jsx` y `publicacion.md`:
  - ❌ "la bacteria **que empezó todo**": la cutinasa de composta (LCC) se publicó en 2012, antes que *Ideonella* (2016). → "la bacteria de Japón".
  - ⚠️ "vive del PET **de tus refrescos**" / gancho "Esa **botella**…": en el estudio comió una película delgada y poco cristalina, no una botella. → "Ese plástico…" y "el plástico de las botellas".
  - ⚠️ "Se llama *Ideonella sakaiensis*": ya no es el nombre vigente (LPSN, 2026: *Pseudideonella sakaiensis*). → "La bautizaron…"; el nombre actual va en la descripción.
  - ⚠️ "~1 µm de ancho" en pantalla: sin fuente. → Se quitó; las bacterias, enzimas y moléculas se dibujan esquemáticas ("esquemático · no a escala").
  - Más preciso: "sigue sin terminarse" → "sigue en pausa" (el proyecto espera cerrar su financiamiento).
- El coordinador confirmó que las correcciones quedan ✅.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Bacteria "de Japón" | ✅ | Tanasupawat et al., IJSEM (Europe PMC) https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Ideonella%20sakaiensis%20sp.%20nov.%22&resultType=core | "isolated from a microbial consortium that degrades poly(ethylene terephthalate) (PET) collected in Sakai city, Japan" | 2016 |
| La hallaron en el lodo de una planta que recicla botellas, en Sakai | ✅ (lodo ≈ sedimento) | Yoshida et al., Science https://www.scienceintheclassroom.org/research-papers/plastic-dinner + Tanasupawat 2016 | "250 PET debris–contaminated environmental samples… from a PET bottle recycling site" · "One sediment sample contained a distinct microbial consortium" · "collected in Sakai city, Japan" | 2016 |
| "La bautizaron *Ideonella sakaiensis*" (corregido; antes "Se llama…") · en la descripción, nombre actual *Pseudideonella sakaiensis* | ✅ (corregido) | LPSN https://lpsn.dsmz.de/species/ideonella-sakaiensis | "Taxonomic status: synonym" · "Correct name: Pseudideonella sakaiensis (Tanasupawat et al. 2016) Lu and Chen 2026" | 2026 |
| "vive del PET, el plástico de las botellas" y gancho "Ese plástico no es basura… es comida" (corregido; antes "del PET de tus refrescos" / "Esa botella") | ✅ (corregido) | Yoshida 2016 | "able to use PET as its major energy and carbon source"; en la voz y la descripción se aclara que fue una película delgada y poco cristalina ("low-crystallinity (1.9%) PET film") | 2016 |
| PETasa (secretada) corta el plástico en pedacitos (MHET) | ✅ | Yoshida 2016 | "leading to its designation as a PET hydrolase (termed PETase)"; producto principal MHET | 2016 |
| MHETasa parte cada pedacito en dos piezas | ✅ | Yoshida 2016 | "The enzyme was thus designated a MHET hydrolase (termed MHETase)" → TPA + EG | 2016 |
| Son las dos piezas con que se fabrica la botella (ácido tereftálico + etilenglicol) | ✅ | Yoshida 2016 | "into its two environmentally benign monomers, terephthalic acid and ethylene glycol" | 2016 |
| La bacteria se come las piezas (pantalla) | ✅ | Yoshida 2016 (título) | "A bacterium that degrades and assimilates poly(ethylene terephthalate)" | 2016 |
| Bacterias en bastón (pantalla) | ✅ | Tanasupawat 2016 | "Gram-stain-negative, aerobic, non-spore-forming, rod-shaped bacterium" | 2016 |
| Tamaño de las bacterias en pantalla (corregido: se quitó "~1 µm de ancho"; dibujo esquemático, "esquemático · no a escala") | ✅ (corregido) | Tanasupawat 2016 (forma de bastón) | "rod-shaped bacterium" — la medida no se afirma | 2016 |
| En 2016 deshacer casi toda una película más delgada que una tarjeta le tomó seis semanas (0.2 mm, 30 °C, 42 días) | ✅ | Yoshida 2016 | "almost completely degraded after 6 weeks at 30°C" · "PET film (60 mg, 20 × 15 × 0.2 mm)" (tarjeta de crédito ISO = 0.76 mm) | 2016 |
| En 2020, en Francia (Toulouse), mejoraron otra enzima | ✅ | Tournier et al., Nature (Europe PMC) https://pubmed.ncbi.nlm.nih.gov/32269349/ | "Here we describe an improved PET hydrolase…"; afiliación "TBI, Université de Toulouse, CNRS, INRAE, INSA, Toulouse, France" | 2020 |
| …que salió de una composta (LCC) | ✅ | Sulaiman et al., AEM https://pubmed.ncbi.nlm.nih.gov/22194294/ | "fosmid library of a leaf-branch compost metagenome" | 2012 |
| Partió el 90 % del PET en diez horas | ✅ | Tournier 2020 | "achieves, over 10 hours, a minimum of 90 per cent PET depolymerization into monomers" | 2020 |
| Con eso hicieron botellas nuevas | ✅ | Tournier 2020 | "biologically recycled PET… can be produced from enzymatically depolymerized PET waste, before being processed into bottles" | 2020 |
| Le ganó a la enzima de la bacteria | ✅ | Tournier 2020 | "outperforms all PET hydrolases reported so far, including an enzyme from the bacterium Ideonella sakaiensis strain 201-F6" | 2020 |
| "Lo curioso: le ganó a la enzima de la bacteria de Japón" (corregido; antes "…que empezó todo") | ✅ (corregido) | Tournier et al., Nature (Europe PMC) https://pubmed.ncbi.nlm.nih.gov/32269349/ | "outperforms all PET hydrolases reported so far, including an enzyme from the bacterium Ideonella sakaiensis strain 201-F6" | 2020 |
| "Pero su planta industrial sigue en pausa: la planean para 2028" (más preciso que "sigue sin terminarse") | ✅ (dato de mar 2026) | Comunicado Carbios 30 mar 2026, vía Kohan Textile Journal https://kohantextilejournal.com/carbios-longlaville-recycling-plant-financing-update-2028/ ; PETPlanet dic 2025 | "with a view to achieving a start of production at the Longlaville plant by H1 2028, subject to the finalization of the project" · "financing required to resume the project… not yet completed" | 2026 |
| Letrero "Longlaville, Francia · meta: 2028" (pantalla) | ✅ | ídem | ídem | 2026 |
| Grúa detenida (pantalla: obra parada) | ✅ | ídem | "financing required to resume the project" (el proyecto está en pausa) | 2026 |
| Dibujos (botella, bacterias, enzimas-tijera, cadena de PET, planta) esquemáticos y no a escala | ✅ | Declarado en pantalla ("esquemático · no a escala", "AL MICROSCOPIO · esquemático") y en la descripción | "El dibujo es esquemático." | 2026 |

Nota: no se pudo abrir nada de Carbios posterior a abril de 2026 (carbios.com 503); "sigue en pausa" y "la planean para 2028" son lo último publicado (mar 2026).

Sin ❌ ni ⚠️ pendientes.

VEREDICTO: APROBADO
