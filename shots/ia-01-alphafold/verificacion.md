# Verificación de hechos · ia-01-alphafold (Shot IA #01)

Verificación independiente del 28 oct 2026: un verificador que no escribió el guion abrió cada fuente y revisó `guion.md`, `narracion.json` y lo que se ve en pantalla. Este shot es anterior a la regla (27 oct 2026) y está en `.github/verificacion-exentos.txt`; aun así se verificó completo.
Las filas marcadas "(corregida)" cambiaron en el guion y se volvieron a verificar abriendo la fuente el 28 oct 2026.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Una proteína es una cadena de aminoácidos | ✅ | Jumper et al., *Nature* 596:583 (2021) | "predicting the three-dimensional structure that a protein will adopt based solely on its amino acid sequence" | 2021 |
| (corregida) "La cadena se dobla en una forma precisa, y de esa forma depende su trabajo" (antes: "se dobla sola en una forma exacta, y esa forma es su trabajo", ⚠️: en la célula muchas necesitan chaperonas) | ✅ | Hartl, Bracher y Hayer-Hartl, *Nature* 475:324 (2011), resumen en PubMed 21776078 | "Most proteins must fold into defined three-dimensional structures to gain functional activity… cells invest in a complex network of molecular chaperones" | 2011 |
| Si la forma cambia, la llave ya no entra (metáfora llave–cerradura) | ✅ | Hartl et al., *Nature* 2011 | "Most proteins must fold into defined three-dimensional structures to gain functional activity" (sin la forma correcta pierden su función) | 2011 |
| Antes, la forma se veía con cristales y rayos X, y costaba mucho | ✅ | Jumper et al., *Nature* 2021 | "Structural coverage is bottlenecked by the months to years of painstaking effort required to determine a single protein structure" | 2021 |
| AlphaFold (Google DeepMind) predice la forma leyendo solo la secuencia | ✅ | Jumper et al., *Nature* 2021 | "predicting the three-dimensional structure that a protein will adopt based solely on its amino acid sequence" | 2021 |
| En 2021, el equipo de John Jumper lo explicó en *Nature* y liberó el programa | ✅ | Repositorio google-deepmind/alphafold; Jumper et al. 2021 | Primer commit: "Initial release of AlphaFold." (15 jul 2021); "Highly accurate protein structure prediction with AlphaFold", *Nature* 596, 583–589 | 2021 |
| En 2022 ya eran 214 millones de formas, gratis | ✅ | `afdb/README.md` del repositorio de AlphaFold; Varadi et al., *NAR* 2024 | "The AlphaFold UniProt release (214M predictions)… available to download at no cost under a CC-BY-4.0 licence"; "over 214 million predicted protein structures" | 2022 |
| Bajarlas todas pesa 23 tebibytes | ✅ | `afdb/README.md` | "the size of the dataset is 23 TiB, 3 * 214M files" | 2022 |
| Cada predicción trae su nivel de confianza | ✅ | README del repositorio de AlphaFold | "To rank model confidence, we use predicted LDDT (pLDDT) scores" | 2021 |
| (corregida) "Las dudosas hay que comprobarlas en el laboratorio" (antes: "se revisan en el laboratorio", ⚠️: afirmaba una revisión sistemática que no existe) | ✅ | README de AlphaFold (pLDDT) + Jumper et al. 2021 | "To rank model confidence, we use predicted LDDT (pLDDT) scores"; la confirmación experimental es el método de referencia ("months to years of painstaking effort") | 2021 |
| En pantalla: azul confiable, naranja dudosa | ✅ | Escala pLDDT de AlphaFold DB | azul ≥ 70 (confiable), naranja < 50 (baja confianza) | 2022 |

Notas:
- La línea 7 se acortó ("lo explicó en la revista Nature y liberó el programa") para que la voz siga en 61–62 s; el dato no cambió.
- El dibujo es esquemático (40 cuentas; la "llave" es una metáfora).

VEREDICTO: APROBADO
