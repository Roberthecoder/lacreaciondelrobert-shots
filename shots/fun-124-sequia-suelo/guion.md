# Shot Fungi Mati #124 · Esta tierra seca no está muerta: está aguantando la respiración

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #124 · rama `claude/fun-120-124-suelo-clima`.
- **Formato:** N1 Por dentro + N5 El experimento (a la mitad se recrean dos experimentos reales: las macetas tapadas de Inglaterra y
  la caja de dos tierras del champiñón). Viaje: terrón seco de la milpa (macro) → poros del suelo al microscopio (micro, fondo
  oscuro) → la misma milpa, ya con lluvia, "exhalando".
- **Gancho (de los 7):** #1 «Esto no es X: es Y» sobre lo que se ve en pantalla: «Esta tierra seca no está muerta: está aguantando
  la respiración.»
- **Duración (estimada con `estimar-escenas.mjs`):** voz 962 caracteres / 173 palabras (≈ 58.8 s) + cierre 3.0 s → **61.8 s**.
- **Voz:** pendiente de aprobación de Robert.
- **Cuidado de rigor:** el pulso de CO₂ al mojar la tierra es de TODA la vida del suelo: de los microbios (hongos y bacterias) y de
  enzimas y procesos que trabajan fuera de las células (Fraser 2016), no solo de hongos. Que el champiñón llevó agua por sus hifas a
  tierra seca **está medido** (en laboratorio, un solo hongo, tierra esterilizada); lo **hipotético** es que eso explique por qué los
  hongos aguantan mejor la sequía en suelos reales, y se dice como tal. «Menos estable» se infiere de las propiedades de la red de
  co-ocurrencia (no se midió la estabilidad directamente).
  No se toca el tema de micorrizas ni el olor a lluvia (geosmina, ya está en `qui-58-lluvia-olor`).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta tierra seca no está muerta: está aguantando la respiración. | Fondo amarillo. Un terrón de tierra seca y agrietada de una milpa (cañas secas de maíz) se resquebraja en el cuadro 0.3; un "pecho" de aire se infla dentro del terrón (contorno punteado). Robert sorprendido al lado. |
| 1 | Milpa | Tu milpa lleva meses sin lluvia, y abajo aguantan hongos y bacterias. | Fondo naranja; contador de días "sin lluvia" corre. Lupa (POR DENTRO) sobre el terrón: aparecen hilos de hongo y bacterias chiquitas. |
| 2 | Bacterias | Las bacterias son seres de agua: viajan por películas de agua entre los granos. | Fondo oscuro (micro). Granos de suelo con películas de agua azules; bacterias (bastones) nadando por ellas. Barra de escala 10 µm. |
| 3 | Seca | Al secarse, los poros se llenan de aire: quedan sin camino. | Las películas se encogen, los poros se pintan de aire; las bacterias quedan en charquitos aislados. Chip "poro con aire". |
| 4 | Hifas | Los hongos crecen en hilos, las hifas, que cruzan huecos con aire. | Una hifa (tubo largo y ramificado con septos) crece y cruza de un grano a otro sobre el aire. Etiqueta "hifa". |
| 5 | Pregunta | ¿Y eso los hace aguantar más? | **Re-gancho.** Fondo rosa; "?" gigante entre una bacteria y una hifa. Robert grande, pensativo. |
| 6 | Estudio | Un estudio de 2018 en Inglaterra tapó la lluvia a macetas de pradera y leyó el ADN de sus microbios. | Fondo menta. TarjetaEstudio "2018 · Nature Communications · de Vries y col. · Lancaster, Inglaterra". Macetas grandes con pasto bajo un techito transparente; hebra de ADN que se lee. |
| 7 | Redes | Con la sequía, la red de bacterias quedó menos estable; la de hongos, no. | Dos redes de puntos ("quién aparece con quién"): la de bacterias tiembla y se desacomoda; la de hongos se queda firme. Chips "bacterias: menos estable" · "hongos: más estable". |
| 8 | Champinon | En 2015, en laboratorio, el champiñón llevó agua por sus hifas de tierra húmeda a tierra seca. | Fondo cian. Caja de dos cámaras (tierra húmeda / tierra seca) separadas por un hueco de aire; hifas de *Agaricus bisporus* cruzan y gotitas azules viajan por dentro. TarjetaEstudio "2015 · PNAS · Guhr y col. · laboratorio". |
| 9 | Pizza | Y la descomposición se disparó. Sí: el de tu pizza. | Medidor "CO₂ de descomposición en la tierra seca: +2,800 % vs. hifas cortadas, 7 días". Luego una rebanada de pizza con champiñones. Robert señalando. |
| 10 | Hipotesis | ¿Será parte de su secreto? Es una hipótesis. | Sello "HIPÓTESIS" sobre la pregunta "¿así aguantan la sequía?". |
| 11 | Lluvia | Cuando por fin llueve, la tierra exhala: | Regreso a la milpa (macro), cae la primera lluvia sobre el terrón. |
| 12 | Birch | en minutos suelta dióxido de carbono, de sus microbios y de enzimas que trabajan fuera de ellos: el efecto Birch. | Del terrón sale una bocanada de burbujas "CO₂"; gráfica que sube de golpe y baja ("pulso"), reloj "minutos". Íconos de hongos, bacterias y enzimas (no solo hongos). Chip "efecto Birch · descrito en África del Este, años 50". |
| 13 | Cierre | Esa tierra no estaba muerta: esperaba la lluvia para soltar el aire. | **La misma imagen del inicio, transformada:** el terrón oscuro y húmedo, la milpa con brotes verdes, el "pecho" de aire desinflado. |
| — | Outro | (sin voz) | `CierreMarca` con logo de biología y Robert apuntando a cámara. |

**Música (`gen-audio.mjs`, todo calculado):** 96 BPM en re menor. Un tema de 4 compases (motivo → respuesta → secuencia →
cadencia) que suena tres veces durante la sequía, cada vez distinto (medio, una octava abajo, con notas cada vez más cortas "como el
agua que se va"), sobre acordes que cambian cada 2 compases (Rem–Sib–Solm–La–Rem–Solm/Sib–Do–La) y "tapados" (filtro); en la
investigación entra un pizzicato que cambia de figura cada 2 compases. Con la lluvia todo se abre a Fa mayor (Fa–Do–Rem–Sib), el
tema regresa una octava arriba y libre, y un arpegio de gotas acompaña el pulso. Siempre debajo de la voz, sin golpe marcado.
Efectos en el mismo cuadro: crujido del terrón (0.25 s) y polvo, tics de los soles, lupa, burbujas de las bacterias nadando, siseo
del agua que se va, glissando de la hifa que crece, gotas en el techo de las macetas, lectura del ADN, zumbido de la red que tiembla,
gotitas por las hifas de la caja, subida del medidor, golpe del sello HIPÓTESIS, lluvia, soplo de la exhalación con burbujas de CO₂,
subida y bajada de la gráfica del pulso, notas de los brotes y acorde final.

**Barras de escala:** 10 cm (terrón), 5 µm (poros, bacterias e hifas; esquemático), 20 cm (maceta), 2 mm (hueco de aire de la caja);
"esquemático" en el re-gancho y "red esquemática" en las redes.

**Ajustes de pantalla al animar:** «meses sin lluvia» con 4 soles (cuántos meses: ilustrativo); el ADN se lee arriba del techo de
las macetas; número grande «+2,800 %» con la etiqueta «vs. hifas cortadas · 7 días»; chips «microbios» y «enzimas fuera de ellos»
en el pulso; el «aire» guardado en el terrón es una metáfora (contorno punteado que se desinfla al llover).

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande (`grande`, medio cuerpo) en «¿Y eso los hace aguantar más?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.6 | 11_sorprendido | `gancho` | «no está muerta: está aguantando la respiración» (cuadro 0) |
| 2 | 8.8 | 12.9 | 13_senalando_arriba | `arriba-der` | «las bacterias son seres de agua» |
| 3 | 13.5 | 16.5 | 10_serio_molesto | `arriba-der` | «quedan sin camino» |
| 4 | 20.95 | 23.1 | 07_pensativo_puno | `grande` | «¿Y eso los hace aguantar más?» |
| 5 | 29.3 | 33.2 | 04_bajando_lentes | `arriba-der` | «la red de bacterias quedó menos estable» |
| 6 | 36.2 | 38.9 | 06_pensativo_menton | `arriba-der` | «llevó agua por sus hifas… a tierra seca» |
| 7 | 40.3 | 45.0 | 02_apuntando_camara | `bajo-der` | «Sí: el de tu pizza» / «Es una hipótesis» |
| 8 | 45.8 | 51.3 | 11_sorprendido | `arriba-der` | «la tierra exhala… el efecto Birch» |
| 9 | 54.9 | 58.7 | 13_senalando_arriba | `arriba-der` | «esperaba la lluvia para soltar el aire» |
| — | 58.8 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

Apariciones 9 · **33.5 s** en pantalla (+ cierre 3.0 s) · 7 poses distintas · nunca la misma dos veces seguidas · nunca tapa
números, etiquetas ni subtítulo (en el medidor y la hipótesis sale abajo, `bajo-der`).

## Fuentes (abiertas el 5 nov 2026)

1. de Vries, F. T., Griffiths, R. I., Bailey, M., Craig, H., Girlanda, M., Gweon, H. S., Hallin, S., Kaisermann, A., Keith, A. M.,
   Kretzschmar, M., Lemanceau, P., Lumini, E., Mason, K. E., Oliver, A., Ostle, N., Prosser, J. I., Thion, C., Thomson, B. y
   Bardgett, R. D. (2018). Soil bacterial networks are less stable under drought than fungal networks. *Nature Communications* 9: 3033.
   https://pmc.ncbi.nlm.nih.gov/articles/PMC6072794/
   > "drought promotes destabilising properties in soil bacterial, but not fungal, co-occurrence networks"
   > Suelo de "mesotrophic grassland at Hazelrigg Field Station, Lancaster University, UK"; mesocosmos (macetas de 42 L) al aire libre.
   > Sequía con "transparent rain covers over the pots from May to July 2013".
   > Bacterias: gen 16S rRNA; hongos: región ITS2 (secuenciación de ADN).
   > Introducción: "soil fungi being generally more resistant, but less resilient, than bacteria."
2. Wolf, A. B., Vos, M., de Boer, W. y Kowalchuk, G. A. (2013). Impact of matric potential and pore size distribution on growth dynamics
   of filamentous and non-filamentous soil bacteria. *PLoS ONE* 8(12): e83661. https://pmc.ncbi.nlm.nih.gov/articles/PMC3877067/
   > "Bacteria are essentially aquatic organisms, as they rely on water for functioning and require water-filled pores" (… y películas de agua para moverse)
   > "Most soil-bacterial cell morphologies (e.g. rods, cocci, spirals, etc.) are not adapted to bridging the air-filled spaces" (in non-saturated soils)
   > "Given their ability to bridge air-filled gaps via their hyphae, filamentous fungi may have distinct advantages" (in unsaturated soils)
   > Resumen: "fungi perform better than bacteria in soils during drought, a property that has been ascribed to the hyphal growth form of fungi"
3. Guhr, A., Borken, W., Spohn, M. y Matzner, E. (2015). Redistribution of soil water by a saprotrophic fungus enhances carbon
   mineralization. *PNAS* 112(47): 14647–14651. https://pmc.ncbi.nlm.nih.gov/articles/PMC4664368/
   > *Agaricus bisporus* "redistributes water from moist (–0.03 MPa) into dry (–9.5 MPa) soil at about 0.3 cm⋅min−1 in single hyphae"
   > "significantly enhanced carbon mineralization by 2,800%" (CO₂ acumulado en la cámara antes seca a las 168 h, contra controles con las hifas puente cortadas) y "enzymatic activity by 250–350% in the previously dry soil compartment" (en 168 h)
   > "is likely one of the mechanisms behind higher drought resistance of soil fungi" (lo hipotético es que explique la resistencia de los hongos; el transporte de agua sí se midió)
   > Métodos: tierra esterilizada con vapor, un solo hongo, mesocosmos de laboratorio con dos cámaras separadas por 2 mm de aire.
4. Fraser, F. C., Corstanje, R., Deeks, L. K., Harris, J. A., Pawlett, M., Todman, L. C., Whitmore, A. P. y Ritz, K. (2016). On the origin
   of carbon dioxide released from rewetted soils. *Soil Biology and Biochemistry* 101: 1–5. https://pmc.ncbi.nlm.nih.gov/articles/PMC5012885/
   > "maximal rates of evolution within 6 min" (tras mojar la tierra seca)
   > Pulso "sometimes referred to as the Birch effect"; "also observed by Birch (1958)"
   > "The complete cessation of CO2 efflux following sterilisation"; "approximately equal contributions from biochemical (outside membranes)
   > and organismal (inside membranes) sources" (por eso: «de sus microbios y de enzimas que trabajan fuera de ellos»)
5. Jarvis, P. et al. (2007). Drying and wetting of Mediterranean soils stimulates decomposition and carbon dioxide emission: the "Birch
   effect". *Tree Physiology* 27(7): 929–940. https://academic.oup.com/treephys/article/27/7/929/1666540
   > "a phenomenon first characterized on agricultural and forest soils in East Africa in the 1950s and 1960s by H. F. Birch"
   > al rehumedecer suelos secos "there is a burst of decomposition, mineralization and release of inorganic nitrogen and CO2"
6. Birch, H. F. (1958). The effect of soil drying on humus decomposition and nitrogen availability. *Plant and Soil* 10: 9–31.
   https://doi.org/10.1007/BF01343734 (artículo original; de pago, no se pudo abrir: los datos que se usan vienen de 4 y 5).

El dibujo es esquemático (poros, bacterias e hifas no están a escala exacta).
