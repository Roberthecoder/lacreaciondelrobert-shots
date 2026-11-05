# Shot Fungi Mati #126 · Esa madera verde no está pintada: la tiñe un hongo

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #126 · rama `claude/fun-125-129-colores`.
- **Formato:** N1 · Por dentro (con N5: a la mitad se dibuja el estudio de microscopio de 1992). Viaje macro → micro → macro:
  una tabla con vetas verde azulado → el tronco con las copitas → dentro de las células de la madera (hifas y pigmento) → las obras
  de taracea y Tunbridge ware → la misma tabla del inicio, ya "explicada".
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo en pantalla: «Esa madera verde no está pintada: la tiñó un hongo, desde adentro.»
- **Duración:** voz 1013 caracteres / 170 palabras (≈ 58 s) + cierre 3.5 s → **61.51 s** en la base (escenas de `Shot Madera Verde base narrada.dc.html`; mezcla.wav medida con ffprobe: 61.5 s + 0.3 s de cola).
- **Voz:** pendiente de aprobación de Robert (~1000 créditos de ElevenLabs).
- **Estado:** verificado (`verificacion.md`, VEREDICTO: APROBADO) y animado (`madera-verde.jsx`).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa madera verde no está pintada: la tiñó un hongo, desde adentro. | Fondo amarillo. Una tabla de madera clara con vetas verde azulado; una brocha entra (cuadro 0.3) y se tacha con "✗ no es pintura". Robert sorprendido. La tabla gira y se ve que el verde atraviesa todo el canto (está por dentro). |
| 1 | Hongo | Se llama *Chlorociboria*: copitas verde azulado de milímetros, sobre troncos muertos. | Fondo menta. Rama caída sin corteza, con manchas verde azulado; brotan copitas en forma de platito, verde azulado, pie corto central o un poco de lado. Etiqueta "copitas verdes · *Chlorociboria*". Barra de escala 5 mm. |
| 2 | Hifas | Sus hilos, las hifas, avanzan por las células de la madera. | Zoom al interior (fondo oscuro `#0E0F12`, "POR DENTRO · LA MADERA"). Corte de madera esquemático: vasos, fibras y radios; hilos blancos (hifas) avanzan de célula en célula. Barra de escala 50 µm. |
| 3 | Pigmento | Y dejan un pigmento azul verdoso: la xilindeína. | Las células por donde pasan las hifas se van pintando de verde azulado; texto "se tiñen las células por donde pasan las hifas (vasos, fibras y parénquima)". Molécula esquemática con etiqueta "xilindeína · pigmento · esquemático". |
| 4 | Comun | Lo más común es ver la madera teñida, no las copitas. | Regreso al bosque: muchas ramas caídas verdes y solo una con copitas. Chip "se ve más la madera verde que el hongo". |
| 5 | Pregunta | ¿Y cuánto dura ese verde? | **Re-gancho.** Fondo rosa, la tabla verde con un reloj de arena; Robert grande, pensativo. |
| 6 | Estudio | En 1992, el equipo de Robert Blanchette, de la Universidad de Minnesota, vio al microscopio dos taraceas del Renacimiento italiano. | TarjetaEstudio "1992 · Blanchette, Wilmering y Baumeister · U. de Minnesota · *Holzforschung*". Un panel de taracea (marquetería de madera con figuras, esquemático) bajo un microscopio. Etiqueta "taracea = dibujo hecho con piezas de madera". |
| 7 | Met | Una está en el Museo Metropolitano de Nueva York: el verde era álamo con hifas, sin tintes minerales. | Chips: "panel del *studiolo* de Gubbio · Met, Nueva York · siglo XV" y "otro de Fra Giovanni da Verona · c. 1500". Zoom al verde (fondo oscuro): hifas dentro de las células; etiqueta "madera: álamo (*Populus*)"; medidor de rayos X "metales: casi nada" → "no es tinte mineral". |
| 8 | Patron | El mismo patrón de *Chlorociboria*: un hongo coloreando obras de quinientos años. | Pantalla dividida: corte de madera de hoy y corte del panel antiguo, con el mismo patrón de hifas y pigmento; chip "idénticos". Número grande "500 años". |
| 9 | Tunbridge | En Inglaterra, en Tunbridge Wells, hacían mosaicos con roble caído teñido por este hongo. | Fondo cian. Cajita de "Tunbridge ware" (mosaico de madera, esquemático) con teselas verdes; un roble caído con vetas verdes. Chip "Tunbridge Wells, Inglaterra · siglo XIX". |
| 10 | Raro | Lo más raro: en Oregon probaron ese pigmento como semiconductor. | Fondo lila. El pigmento sale de la madera a un frasquito y luego a una película sobre un chip con dos electrodos; chispa. TarjetaEstudio "Universidad Estatal de Oregon · 2018–2019". |
| 11 | Luz | En solución aguantó unas veinticinco semanas de luz y aire sin degradarse. | Tres frasquitos bajo una lámpara: dos semiconductores de laboratorio se decoloran (TIPS-Pn "se degrada en 3 días"; diF TES-ADT "en semanas") y el de xilindeína sigue verde; contador de semanas que llega a "≈ 25". |
| 12 | Silicio | No le gana al silicio, pero es de un hongo. | Báscula esquemática: oblea de silicio vs. copita verde; chip "funciona, pero no es un gran semiconductor (todavía)". |
| 13 | Cierre | Así que esa madera verde no está pintada: es un hongo que lleva siglos dándole color. | **Regreso a la imagen del inicio:** la misma tabla verde, ahora con una copita chiquita en la esquina y las etiquetas "hifas · xilindeína · 500 años". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert apuntando a cámara. |

**Música (`gen-audio.mjs`):** cama grave y continua (la voz manda) con armonía que avanza por escena: Am → F → Dm (oscuro, dentro de la
madera) → Bb → G → E (la pregunta queda abierta) → Am → F → **A mayor en «obras de quinientos años»** → D → G → C → E → Am. Encima, un tema
de 4 notas tipo marimba que se presenta, se contesta, baja y se alenta en el microscopio, regresa en mayor y cierra en la raíz; cada frase varía. Efectos en el mismo cuadro: brocha que se tacha, crujido de rama, "pop" suave de cada copita, avance de
hifas (tics), gota de color, clic del microscopio, teselas que caen, chispa eléctrica, tic del contador de semanas.

Barras de escala: 10 cm (tabla), 5 mm (copitas), 50 µm (células de la madera, esquemático), "esquemático" en paneles y chip.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y cuánto dura ese verde?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.3 | 11_sorprendido | `gancho` | «no está pintada» (cuadro 0) |
| 2 | 4.8 | 8.4 | 13_senalando_arriba | `arriba-der` | «copitas verde azulado» |
| 3 | 12.2 | 15.9 | 04_bajando_lentes | `arriba-der` | «la xilindeína» |
| 4 | 18.2 | 20.0 | 06_pensativo_menton | `grande` | «¿Y cuánto dura ese verde?» |
| 5 | 24.2 | 27.0 | 12_perfil_serio | `arriba-der` | «Renacimiento italiano» |
| 6 | 33.2 | 37.1 | 11_sorprendido | `arriba-der` | «obras de quinientos años» |
| 7 | 44.8 | 47.0 | 07_pensativo_puno | `arriba-der` | «como semiconductor» |
| 8 | 49.5 | 52.9 | 13_senalando_arriba | `arriba-der` | «no le gana al silicio» |
| 9 | 53.5 | 57.9 | 02_apuntando_camara | `arriba-der` | «lleva siglos dándole color» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones 9 · **29.1 s** en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 5 nov 2026; verificadas en `verificacion.md`)

1. Blanchette, R. A., Wilmering, A. M. y Baumeister, M. (1992). The use of green-stained wood caused by the fungus *Chlorociboria* in intarsia masterpieces from the 15th century. *Holzforschung* 46(3): 225–232. https://doi.org/10.1515/hfsg.1992.46.3.225 · resumen: https://experts.umn.edu/en/publications/the-use-of-green-stained-wood-caused-by-the-fungus-chlorociboria-/
   > "Green-stained wood from one of the intarsia panels of the Gubbio studiolo, (Italy, 15th century, in the collection of The Metropolitan Museum of Art, New York) and an intarsia panel made by Fra Giovanni da Verona, (Italy, around 1500, in the collection of the Historical Museum of Amsterdam), were sectioned and examined by light, scanning and transmission electron microscopy"
   > "Sections of green-stained wood from the intarsia panels contained evidence of fungal hyphae in vessels, fibers and parenchyma cells."
   > "The woods were identified as Populus sp."
   > "X-ray microanalyses of the green wood showed no evidence of high concentrations of metal ions that would be present if inorganic dyes were used."
   > "the micromorphology of fungal colonization and pigment deposition was identical to the patterns observed in the green wood of the 500 year old intarsia panels."
2. Giesbers, G., Van Schenck, J., Quinn, A., Van Court, R., Vega Gutierrez, S. M., Robinson, S. C. y Ostroverkhova, O. (2019). Xylindein: naturally produced fungal compound for sustainable (opto)electronics. *ACS Omega* 4(8): 13309–13318. https://pmc.ncbi.nlm.nih.gov/articles/PMC6704441/
   > "under continuous illumination in air, the TIPS-Pn molecules in the solution decomposed within 3 days … Under the same conditions, no degradation in optical absorption of xylindein was observed over the period of about 25 weeks, after which some degradation occurred"
   > "The pigment exhibited high photostability, electron mobility up to 0.4 cm2/(V s) in amorphous films"
   > "the blue-green pigment xylindein … can be found in intarsia and marquetry woodworks as far back as the 1400s, still as vibrant as samples collected today."
   > "The two Chlorociboria species C. aeruginosa and Chlorociboria aeruginascens, both of which produce xylindein, have a worldwide distribution"
3. Oregon State University / ScienceDaily (5 jun 2018). Fungi-derived pigment… (sobre Giesbers et al., *MRS Advances* 2018, doi:10.1557/adv.2018.446). https://www.sciencedaily.com/releases/2018/06/180605154109.htm
   > Ostroverkhova: "It functions as an electronic material but not a great one, but there's optimism we can make it better."
   > "Xylindein will never beat silicon, but for many applications, it doesn't need to beat silicon"
4. Kuo, M. *Chlorociboria aeruginascens*. MushroomExpert.com. https://mushroomexpert.com/fungionwood/cup%20and%20saucer/species%20pages/Chlorociboria%20aeruginascens.htm
   > "3-8 mm wide"; "stalk up to 6 mm long, central to eccentric"; "Saprobic; hardwoods, especially oak"
   > "Stained pieces of wood are the most commonly collected form of this fungus." "The actual fruit bodies are less common."
5. Volk, T. (jul 2008). *Chlorociboria aeruginascens*, the green stain fungus. Tom Volk's Fungus of the Month, U. de Wisconsin–La Crosse. https://botit.botany.wisc.edu/toms_fungi/jul2008.html
   > cups "2 - 6 mm in diameter"; "The discoloration is caused by the production of the pigment xylindein"; Blanchette "at the University of Minnesota"
6. BADA (British Antique Dealers' Association). Terms of the Trade: Tunbridge Ware. https://www.bada.org/features/terms-trade-tunbridge-ware
   > green "created by taking wood from fallen oak trees infected with the fungus Chlorociboria aeruginascens"; the Burrows family "began producing wares around the mid-18th century"

El dibujo es esquemático.
