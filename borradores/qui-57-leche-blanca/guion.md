# Shot Químico #57 · Lo blanco de tu leche no es un pigmento (micelas de caseína, grasa y luz rebotando)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #57 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el vaso de leche → las gotitas de grasa y las micelas de caseína desviando rayos → el mismo vaso, ya entendido) + N5 "El experimento" (el tanque de leche descremada de Granada, 2008).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre el vaso que se ve en pantalla: "Lo blanco de tu leche no es un pigmento: es luz rebotando en bolitas que tus ojos no alcanzan a ver." (con espíritu de #7, algo que tus ojos nunca van a ver).
- **Seguridad:** nada que hacer en casa con riesgo; no hay consejos de salud ni de nutrición.
- **Duración:** voz 959 caracteres / 186 palabras (≈ 58.3 s, 11 líneas) + cierre 3.5 s → **≈ 61.8 s** (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`leche.jsx`, hoja en `revision/hoja.png`), voz pendiente de aprobación de Robert (~959 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Lo blanco de tu leche no es un pigmento: es luz rebotando en bolitas que tus ojos no alcanzan a ver. | Fondo amarillo. Desde el cuadro 0 un chorro de leche cae en un vaso de vidrio y lo llena. Un rayo de sol entra al vaso; la palabra "¿pintura blanca?" aparece y se tacha. Barra de escala "1 cm". |
| 1 | Bolitas | En la leche flotan gotitas de grasa y micelas de caseína: racimos de proteína con calcio y fosfato. | `Lupa` sobre el vaso → fondo noche (#0E0F12): gotitas de grasa amarillo pálido (grandes) y micelas de caseína (racimos chicos, tipo frambuesa, con puntitos "Ca" y "PO₄"). Etiquetas "grasa" y "micela de caseína". Barra de escala "1 µm". |
| 2 | Rebote | Casi no se comen la luz: la desvían. Cada rayo choca, cambia de rumbo y vuelve a chocar. | Un rayo blanco entra, pega en una gotita y sale en otra dirección; luego en una micela, y otra vez: zigzag con chispa y "tic" en cada choque. Contador de choques que sube. |
| 3 | Blanco | Sale rebotada luz de todos los colores, y juntos llegan a tus ojos como blanco. | El rayo se abre en rojo, verde y azul que rebotan juntos y salen hacia un ojo dibujado al borde; se vuelven a juntar en un círculo blanco. Chip "R + G + B = blanco". |
| 4 | Pregunta | ¿Y por qué la leche descremada se ve medio azul? | **Re-gancho.** Zoom out: junto al vaso entero aparece un vaso de leche descremada con un tinte azulado; "?" gigante. |
| 5 | Azul | Sin casi nada de grasa quedan las micelas, más chiquitas, y las bolitas chicas desvían más la luz azul. | Fondo noche: las gotitas de grasa salen flotando del cuadro (flecha "descremar"); quedan las micelas. Llegan rayos rojo y azul: el azul rebota mucho más, el rojo pasa casi derecho. Chip "chica → desvía más el azul". |
| 6 | Estudio | En 2008, un equipo con la Universidad de Granada, en España, echó leche descremada en un tanque de agua y midió la luz. | Tarjeta "2008 · Univ. de Granada (España) + EE. UU.". Escena: tanque de vidrio con agua, un gotero de leche descremada que cae y se dispersa, una lámpara a un lado y un medidor de luz (espectrorradiómetro) con su gráfica. |
| 7 | Resultado | Con poca leche, la luz desviada se veía azul. | El haz dentro del tanque se ve azul visto de lado; la gráfica del medidor sube en el lado azul. |
| 8 | Rojo | Y la que cruzaba salía rojiza: como el cielo azul y el sol del atardecer. | En la pantalla detrás del tanque, el círculo de luz se pone naranja-rojizo. El tanque se funde con un cielo azul y un sol rojo en el horizonte (mismos colores, mismo acomodo). |
| 9 | Rayo | Lo curioso: en 2007, un equipo de Dinamarca y California simuló la leche, y un rayo de luz rebotaba miles de veces adentro. | Tarjeta "2007 · Dinamarca + California · simulación". Monitor con un vaso de leche renderizado; un rayo hace un zigzag enorme dentro y el contador corre hasta "miles de rebotes". |
| 10 | Cierre | Así que ese blanco no es pintura: es luz que rebotó miles de veces hasta tus ojos. | **Regreso al vaso del inicio**, ahora con el zigzag de luz dibujado dentro y la etiqueta "luz rebotando = blanco". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert. |

**Música:** cama grave continua, debajo de la voz; efectos en el mismo cuadro (chorro y vaso llenándose, "tic" de cada rebote, contador, gotitas que salen flotando, gotero en el tanque, zumbido suave del medidor, golpe de cada tarjeta).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y por qué la leche descremada se ve medio azul?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «es luz rebotando en bolitas» |
| 2 | 7.0 | 11.7 | 13_senalando_arriba | `izq-alto` | «gotitas de grasa y micelas de caseína» |
| 3 | 13.0 | 17.1 | 04_bajando_lentes | `arriba-der` | «cambia de rumbo y vuelve a chocar» |
| 4 | 17.8 | 22.0 | 05_sonriendo_dientes_uniformes | `izq-alto` | «juntos llegan a tus ojos como blanco» |
| 5 | 22.25 | 26.3 | 06_pensativo_menton | `grande` | «¿Y por qué la leche descremada se ve medio azul?» |
| 6 | 26.8 | 31.2 | 13_senalando_arriba | `arriba-der` | «desvían más la luz azul» |
| 7 | 34.5 | 38.4 | 07_pensativo_puno | `izq-alto` | «echó leche descremada en un tanque» |
| 8 | 38.8 | 45.7 | 11_sorprendido | `izq-alto` | «se veía azul… salía rojiza: como el cielo» |
| 9 | 49.0 | 53.0 | 04_bajando_lentes | `arriba-der` | «rebotaba miles de veces adentro» |
| 10 | 53.6 | 58.2 | 02_apuntando_camara | `arriba-der` | «luz que rebotó… hasta tus ojos» |
| — | 58.3 | 61.8 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 46 s en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **Lo blanco es luz dispersada por gotitas de grasa y micelas de caseína** — Fiege J.L., Woll B., Hebig S., Dabrowski A., Gräf V., Walz E., Nöbel S., Schrader K., Stahl M. "Observation of a temperature dependent anomaly in the UV translucency of milk useful for UV-C preservation techniques." *Sci Rep* 13:21937 (2023). PMID 38081890 · PMC10713634.
   > "The typical opaque white appearance of milk is caused by scattering of visible light on milk fat droplets (0.8–12 µm in raw milk, < 1 µm in homogenized milk) and on casein micelles (10–800 nm)."
2. **Micelas = proteína con calcio y fosfato; las partículas no absorben la luz, la dispersan; las chicas desvían más el azul; la descremada se ve azulada** — Schwarcz J. "Why is milk white and not green like grass?" Office for Science and Society, McGill University (20 mar 2017). https://www.mcgill.ca/oss/article/general-science-you-asked/why-milk-white-and-not-green-grass
   > "Tiny micelles composed of proteins bound together with calcium and phosphate ions roughly one-tenth of a micron in size" · "the tiny particles suspended in milk do not absorb any light but scatter it all towards our eyes." · "there are so many fat globules and protein particles that all of the light ends up scattered to our eye." · "Small particles, tend to scatter blue light more." · "Closer scrutiny of a glass of skim milk reveals that it isn't exactly white, rather it has a bluish tint." · "This is because the fat globules have been removed and there are now fewer particles in suspension to scatter light."
3. **2008, Granada: leche descremada en un tanque de agua; luz dispersada azul, luz directa rojiza; el experimento clásico del cielo azul y el sol rojo** — Gedzelman S.D., López-Alvarez M.A., Hernández-Andrés J., Greenler R. "Quantifying the 'milky sky' experiment." *Appl Opt* 47(34):H128–32 (2008). PMID 19037332 · DOI 10.1364/ao.47.00h128. Afiliación en PubMed: "Departamento de Optica, Universidad de Granada, 18071 Granada, Spain."
   > "Spectra of direct and scattered light that passed through a tank of water mixed with up to 25 ml of homogenized skim milk were measured with a spectroradiometer in a classic experiment used to illustrate why the sky is blue and why the Sun turns red near the horizon. The direct light penetrating the tank was reddened by preferential scattering of short waves by the milk particles (protein casein micelles and fat globules). Scattered light was blue near the light source when the optical thickness was small and red far from the source when the optical thickness was large." · "the optically effective mean diameters of protein casein micelles and fat globules were 170 and 610 nm."
4. **2007, Dinamarca + California: simulación de la leche; un fotón promedio rebota miles de veces; las micelas solo dispersan** — Frisvad J.R., Christensen N.J., Jensen H.W. "Computing the scattering properties of participating media using Lorenz-Mie theory." *ACM Transactions on Graphics* 26(3), art. 60 (SIGGRAPH 2007). Technical University of Denmark + University of California, San Diego. DOI 10.1145/1276377.1276452 · PDF: https://www2.imm.dtu.dk/pubdb/edoc/imm5221.pdf
   > "For some of the materials the number of scattering events that an average photon experiences is very high — for milk it is several thousand events." · "we derive a novel appearance model for milk parameterized by the fat and protein contents" · "The optically important elements in milk include vitamin B2, fat globules and casein micelles (protein)" · "Casein micelles only scatter light" · "the increasingly white appearance as the percentage of fat is increased."
   - Nota de prensa de UC San Diego (Kane D., 7 ago 2007): "Jensen created the model with two colleagues from the Technical University of Denmark - Niels Jørgen Christensen, an associate professor, and Jeppe Revall Frisvad, a Ph.D. student."

## Notas
- El dibujo es esquemático: las micelas como "frambuesas" y las gotitas como esferas lisas; los tamaños reales varían mucho (micelas 10–800 nm; grasa 0.8–12 µm en leche cruda y < 1 µm en homogeneizada, Fiege 2023).
- "No es un pigmento" se refiere al blanco: la leche sí trae pigmentos en poca cantidad (beta-caroteno, amarillo, en la grasa; riboflavina o vitamina B2, verde-amarillo, en el suero; Schwarcz 2017 y Frisvad 2007), pero el blanco viene de la dispersión. La grasa absorbe un poquito (Frisvad da parte imaginaria a su índice); por eso la voz dice "la desvían" y no "no absorben nada". Va en la descripción.
- En el experimento de Granada, con mucha leche y lejos de la fuente la luz dispersada también se ve roja; la voz dice "con poca leche" por eso. La leche usada era descremada y homogeneizada, y la partícula que más dispersa por número son las micelas, aunque la grasa restante también aporta.
- "Miles de rebotes" es el promedio por fotón en la simulación de Frisvad et al. (2007), no una medición directa; la voz dice "simuló".
- "California" = University of California, San Diego (Henrik Wann Jensen).
- Dato para la descripción: la leche descremada vista a contraluz deja una sombra rojiza (Frisvad 2007: "the red shadow in skimmed milk"; Schwarcz: "a screen placed behind the milk will show a pinkish shadow").
