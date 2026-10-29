# Shot Biotecnológico #46 · La luz verde de la medusa (GFP)

- **Serie:** Shot Biotecnológico · **Numeración:** #46 · **Tema del logo:** bioquímica (ADN + matraz, `logo_bioquimica.svg`).
- **Formato (RECETARIO):** N1 "Por dentro" (la medusa y, con la `Lupa`, su orilla y la proteína por dentro) + N5 "El experimento" (el gusano de Chalfie, 1994).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre la medusa que se enciende en pantalla: «Esa medusa no fabrica luz verde: hace energía azul, y una proteína la vuelve verde».
- **Duración:** 61.5 s (voz ~58 s, 957 caracteres, 174 palabras + cierre 3.5 s). Escenas del base narrada: suma exacta 61.5 s.
- **Viaje:** macro (la medusa de noche en el mar) → micro (la orilla al microscopio: la proteína y su pieza que brilla; luego una célula con la proteína marcada y el gusano de 1 mm) → macro (la misma medusa del inicio, ahora con el verde "prestado": a su alrededor proteínas verde, azul, cian y amarilla y el gusano con sus 6 neuronas; sin rojo, que viene de proteínas de corales).
- **Diferencia con bio-05 (petunia):** la petunia hace **bioluminiscencia** (fabrica su propia luz quemando luciferina). Aquí es **fluorescencia**: la GFP sola no produce luz; en el laboratorio **absorbe luz azul o ultravioleta y la devuelve verde**; sin luz que le llegue, no brilla. En la medusa, la energía azul la pone otra proteína (la aequorina, con calcio) y pasa a la GFP sin llegar a ser luz: hacia afuera solo sale verde.

## Versión narrada (957 caracteres)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa medusa no fabrica luz verde: hace energía azul, y una proteína la vuelve verde. | Mar de noche (azul noche). **Cuadro 0:** la medusa *Aequorea victoria* (campana transparente, canales radiales, orilla con puntitos y tentáculos finos) late. Dentro de cada puntito de la orilla hay un brillo **azul tenue** que no sale; hacia afuera solo sale **verde**, en ola. Recuadro: aequorina (azul) → flecha "energía" → GFP → sale onda verde. Chip "energía azul → luz verde". |
| 1 | Medusa | En 1961, Osamu Shimomura y Frank Johnson juntaron unas diez mil y les cortaron la orilla. | Muelle de Friday Harbor (Washington, EE. UU.) de día, fondo cian: red de mano saca medusas una por una; contador sube a "≈ 10 000 medusas · verano de 1961"; unas tijeras cortan el anillo de la orilla. |
| 2 | Proteinas | Hallaron una proteína que suelta luz azul y otra que brilla verde. | Dos frascos: "aequorina" (destello azul al caer una gota de calcio, Ca²⁺) y "proteína verde" (brilla verde). |
| 3 | Fluorescencia | La verde sola no hace luz: en el laboratorio absorbe azul o ultravioleta y la devuelve verde. | Lámpara azul/UV apunta al frasco verde: rayo azul entra, rayo verde sale. Chip "fluorescencia". |
| 4 | Diferencia | Es fluorescencia, no bioluminiscencia: sin luz, no brilla. | Lado a lado: luciérnaga que se prende sola (bioluminiscencia) · frasco de GFP: se apaga la lámpara y se apaga el verde. `MitoTachado` "la GFP brilla sola". |
| 5 | PorDentro | Por dentro, tres de sus aminoácidos forman la pieza que brilla, solo con oxígeno. | **Lupa "AL MICROSCOPIO · la proteína"** (fondo oscuro): un barril (la GFP, esquemático) con una cadena; 3 cuentas de la cadena se juntan, entra una burbuja O₂ y se prenden verde. Etiqueta "238 aminoácidos". |
| 6 | Pregunta | ¿Y para qué quiere un laboratorio la luz de una medusa? | **Re-gancho.** Laboratorio en fondo amarillo, la medusa en un frasco; signo de pregunta. Robert pensativo. |
| 7 | Truco | Pegas su gen al de otra proteína, y donde la célula la fabrique, se prende verde. | Dos tramos de ADN se pegan (gen "proteína X" + gen GFP); entra a una célula; dentro aparecen puntos verdes justo donde se arma la proteína X. |
| 8 | Estudio | En 1994, en Columbia, Martin Chalfie se lo puso a un gusano: seis de sus neuronas brillaron, vivas. | `TarjetaEstudio` "1994 · Chalfie et al. · Columbia · *Science*". Gusano *Caenorhabditis elegans* transparente (etiqueta "~1 mm" y barra de escala) se mueve; 6 neuronas del tacto se prenden verde una por una (contador 1…6). |
| 9 | Vivas | Por fin veías dónde y cuándo se hace una proteína, sin matar células. | El gusano se arrastra en una placa de agar con sus 6 neuronas verdes; reloj que avanza; chip "animal vivo ✓"; barra de escala. Robert grande lo señala. |
| 10 | Colores | Roger Tsien le cambió piezas y sacó azul, cian y amarillo. | Fila de barriles que cambian una cuenta y salen en azul, cian y amarillo. Etiqueta "Roger Tsien". |
| 11 | Nobel | En 2008, los tres ganaron el Nobel de Química. | Medalla dorada con 3 nombres: Shimomura · Chalfie · Tsien, "Nobel de Química 2008". |
| 12 | Cierre | Así que esa medusa nos prestó su verde para ver la vida por dentro. | **Regreso a la medusa del inicio** de noche; a su alrededor giran proteínas verde, azul, cian y amarilla (sin rojo) y pasa el gusano con sus 6 neuronas verdes. Chip "su verde: para ver células vivas". |
| — | Outro | (sin voz) | `CierreMarca` con Robert. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Cama grave continua**, sin golpe, debajo de la voz; tono "submarino" (filtro bajo) mientras estamos en el mar.
- **Datos hechos sonido:** cada puntito de la orilla que se enciende = una nota aguda que "se dobla" de una nota alta (azul) a otra un poco más grave (verde: menor energía); el contador de medusas sube con tics rápidos; **6 notas** = las 6 neuronas del gusano que se prenden; **3 notas** = los 3 aminoácidos que forman la pieza que brilla.
- **Efectos en el mismo cuadro:** tijeras (clic doble), gota de calcio (plop + destello), lámpara que se prende y se apaga (clic), burbuja de oxígeno (blub), ADN que se pega (clic), sello del Nobel (golpe suave).

## Descripción (para publicar)
"Esa medusa no fabrica luz verde: casi hace luz azul, pero una proteína le roba esa energía y la suelta verde. 🪼💚

Es *Aequorea victoria*, de la costa oeste de Norteamérica. En el verano de 1961, Osamu Shimomura y Frank Johnson juntaron en Friday Harbor (Washington) unas **10 000 medusas** y les cortaron con tijeras la orilla, donde están sus órganos de luz. Ahí encontraron dos proteínas: la **aequorina**, que suelta luz azul cuando toca calcio, y una "proteína verde" que hoy se llama **GFP** (proteína verde fluorescente). La publicaron en 1962.

Ojo con la diferencia: la luciérnaga (y la petunia que brilla) hacen **bioluminiscencia**, fabrican su propia luz. La GFP hace **fluorescencia**: sola no produce luz; en el laboratorio **absorbe luz azul o ultravioleta y la devuelve verde**. Si no le llega luz, no brilla. Su pieza que brilla la forman **tres de sus 238 aminoácidos**, y para armarse solo necesita oxígeno, sin ayuda de otras proteínas.

¿Y para qué sirve? Pegas su gen al gen de otra proteína y, donde la célula fabrique esa proteína, aparece el verde. En **1994**, Martin Chalfie (Universidad de Columbia) la puso en el gusano transparente *Caenorhabditis elegans* y **seis neuronas del tacto brillaron**, en un animal vivo. Por fin se podía ver dónde y cuándo se fabrica una proteína **sin matar a las células**. Roger Tsien entendió cómo brilla y, cambiando aminoácidos, sacó variantes **azul, cian y amarilla**. Los tres ganaron el **Nobel de Química 2008**.

El dibujo es esquemático. **¿Habías visto alguna vez algo fluorescente bajo luz negra? 👇**

Soy Robert, de La Creación del Robert 🌱"

## Robert en pantalla

Tiempos del `Shot Gfp base narrada.dc.html` (61.5 s). Entra desde el cuadro 0, vuelve cada 8–10 s y nunca tapa el subtítulo, los chips ni el dato principal.

### 9 apariciones, **29.7 s en pantalla** (de 61.5 s) · 6 poses distintas

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0.0 - 4.8 | sorprendido (11) | gancho | «no fabrica luz verde: hace energía azul» |
| 7.8 - 10.2 | señalando (13) | arriba-der | señala la orilla que se corta con tijeras |
| 11.7 - 14.3 | pensativo, mano en la barbilla (06) | arriba-der | «una que suelta luz azul y otra que brilla verde» |
| 20.3 - 23.3 | bajando lentes (04) | arriba-der | «sin luz, no brilla» (se apaga la lámpara) |
| 28.7 - 31.9 | pensativo, puño (07) | izq-alto | re-gancho: «¿y para qué quiere un laboratorio…?» |
| 39.6 - 42.8 | sorprendido (11) | arriba-der | las 6 neuronas del gusano se prenden una por una |
| 43.1 - 47.1 | apuntando (02) | **grande** | «sin matar células»: señala al gusano vivo en la placa |
| 51.0 - 53.7 | sonriendo (05) | arriba-der | Nobel de Química 2008 |
| 54.2 - 57.9 | señalando (13) | gancho | cierre: «nos prestó su verde para ver la vida por dentro» |
| 58.0 - 61.5 | apuntando (02) | cierre | `CierreMarca` con Robert junto al logo |

Total (sin contar el cierre de marca): 4.8 + 2.5 + 2.6 + 3.1 + 3.2 + 3.3 + 4.0 + 2.6 + 3.8 = **29.7 s** (~48 %).

## Fuentes
- **Nobel 2008:** The Royal Swedish Academy of Sciences, comunicado de prensa, 8 oct 2008. https://www.nobelprize.org/prizes/chemistry/2008/press-release/ — «award the Nobel Prize in Chemistry for 2008 jointly to Osamu Shimomura … Martin Chalfie, Columbia University … and Roger Y. Tsien … "for the discovery and development of the green fluorescent protein, GFP"» · «Osamu Shimomura first isolated GFP from the jellyfish Aequorea victoria, which drifts with the currents off the west coast of North America. He discovered that this protein glowed bright green under ultraviolet light.» · «he coloured six individual cells in the transparent roundworm Caenorhabditis elegans with the aid of GFP» · «By using DNA technology, researchers can now connect GFP to other interesting, but otherwise invisible, proteins.» · «extended the colour palette beyond green». (2008)
- **10 000 medusas, verano de 1961, tijeras:** Shimomura O., Nobel Lecture "Discovery of green fluorescent protein, GFP", 8 dic 2008. https://www.nobelprize.org/uploads/2018/06/shimomura_lecture.pdf — «Early in the summer of 1961, we traveled from Princeton, NJ, to Friday Harbor, WA» · «The ring could be cut off with a pair of scissors» · «During the rest of the summer of 1961, we extracted the luminescent substance from about 10,000 jellyfish.» · «The protein emitted blue light in the presence of a trace of Ca2+. We named the protein aequorin» · «we found another protein that exhibited a bright green fluorescence … and called it "green protein."» (dato de 1961, lectura de 2008)
- **Tres aminoácidos:** misma lectura de Shimomura — «The chromophore was formed from 3 amino acid residues in the peptide chain». (dato de 1979, lectura de 2008)
- **Azul → verde en la medusa:** misma lectura — «the energy of the blue light produced by the aequorin molecule is transferred to the GFP molecule, and GFP emits green light (Morise et al., 1974).» Y Nobel, información para el público: «In jellyfish, the GFP's chromophore simply transforms the blue light from aequorin into green light.» https://www.nobelprize.org/prizes/chemistry/2008/popular-information/ (2008)
- **Fluorescencia, necesita luz azul/UV:** Nobel, información para el público (2008) — «The strong green colour of this protein appears under blue and ultraviolet light.» · «When UV light or blue light hits the GFP chromophore, it sucks up the energy in the light» · «What is revolutionary about GFP is that the protein does not need any additives to glow, in contrast to aequorin and other bioluminescent proteins».
- **Oxígeno, sin otras proteínas; 238 aminoácidos; colores de Tsien:** Nobel, información para el público (2008) — «Tsien charted how the GFP chromophore is formed chemically in the 238-amino acid-long GFP protein. Tsien showed that this chemical reaction requires oxygen and explained how it can happen without the help of other proteins.» · «develop new variants of GFP that shine more strongly and in quite different colours such as cyan, blue and yellow.» 238 aminoácidos también en Prasher DC et al., *Gene* 111: 229–233 (1992), PMID 1347277: «The gfp10 cDNA encodes a 238-aa-residue polypeptide».
- **Chalfie 1994, gusano y células vivas:** Chalfie M., Tu Y., Euskirchen G., Ward W.W., Prasher D.C., "Green fluorescent protein as a marker for gene expression", *Science* 263(5148): 802–805, 11 feb 1994, PMID 8303295 — «produces a fluorescent product when expressed in prokaryotic (Escherichia coli) or eukaryotic (Caenorhabditis elegans) cells. Because exogenous substrates and cofactors are not required for this fluorescence, GFP expression can be used to monitor gene expression and protein localization in living organisms.» Nobel, información para el público: «Chalfie placed the gene behind a promoter that is active in six touch receptor neurons in C. elegans»; «the millimetre-long roundworm Caenorhabditis elegans». (1994)
- **Publicación de 1962:** Shimomura O., Johnson F.H., Saiga Y., "Extraction, purification and properties of aequorin, a bioluminescent protein from the luminous hydromedusan, Aequorea", *J Cell Comp Physiol* 59: 223–239 (junio de 1962), PMID 13911999. Nobel, información para el público: «In the 1962 scientific publication … they also mentioned that they had isolated a protein that was … fluorescent green in UV light.»
- El dibujo de la medusa, la proteína (barril), la célula y el gusano es **esquemático**; las neuronas del gusano no están a escala.
