# Shot Ambiental #44 · Una lata reciclada gasta 5 % de la energía (de la roca a la lata, y de vuelta)

- **Serie:** Shot Ambiental · **Logo:** física (átomo: energía) · **Badge:** #44 · rama `pedido300/amb`.
- **Formato:** N3 "Capítulos y medidores": medidor de energía (186 GJ contra ~8 GJ por tonelada) que acompaña los capítulos
  Roca → Alúmina → Electrólisis → Reciclaje → Viaje de regreso. Cierre que regresa a la lata del inicio.
- **Gancho (de los 7):** #4 "Un número que contradice": "Sacar aluminio de esta lata gasta solo el cinco por ciento de la energía que sacarlo nuevo de una roca."
- **No es** el shot químico del óxido de aluminio: aquí el tema es reciclaje y energía; la química sale solo como paso de la fábrica.
- **Duración:** voz 954 caracteres (10 líneas) ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → **61.5 s** objetivo en la base.
- **Cuentas:** 8.3 ÷ 186 = 4.5 % de la energía → ahorro 95.5 % (el IAI lo redondea a 95 %; la voz dice "cinco por ciento" y "unos ocho") ·
  114 días ÷ 30.4 = 3.75 meses → "casi cuatro meses" · 43 % reciclado → "cuarenta y tres de cada cien".

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Sacar aluminio de esta lata gasta solo el cinco por ciento de la energía que sacarlo nuevo de una roca. | Desde el cuadro 0: una lata aplastada cae y rebota; al lado, una roca rojiza. Medidor de energía doble: barra de la roca llena al 100 %, barra de la lata se queda en 5 %. Número grande "5 %". |
| 1 | Bauxita | Esa roca es la bauxita. Con química se le saca la alúmina: óxido de aluminio. | Capítulo 1 "La roca". Zoom a la bauxita (roca rojiza con granos); una flecha a un montoncito de polvo: etiqueta "alúmina · óxido de aluminio (Al₂O₃)". Esquema. |
| 2 | Electrolisis | Luego la alúmina se disuelve en criolita fundida y una corriente eléctrica le arranca el oxígeno. | Capítulo 2 "La olla". Corte de una celda: olla de acero con carbón, baño naranja "criolita fundida", ánodos de carbón arriba, rayo de corriente; el oxígeno se une al carbón del ánodo y sale como burbujas etiquetadas "CO₂" y aluminio líquido plateado en el fondo. Etiqueta "esquema". Medidor de energía subiendo. |
| 3 | Medidor | Según el Instituto Internacional del Aluminio, en 2019 una tonelada nueva gastaba ciento ochenta y seis gigajulios; una reciclada, unos ocho. | Capítulo 3 "El medidor". Dos barras por tonelada: "nuevo: 186 GJ (2019)" (enorme; el año va solo junto a esta barra) y "reciclado: ~8 GJ" (chiquita). Chip "IAI". |
| 4 | Pregunta | ¿Y no se gasta el aluminio de tanto reciclarlo? | **Re-gancho.** "?" gigante sobre una lata que da vueltas; Robert grande. |
| 5 | Infinito | No: se funde y se vuelve a formar sin cambiar sus propiedades. Solo se pierde un poquito en cada vuelta. | Bucle lata → hojuelas → horno → lingote → lámina → lata. Contador de vueltas 1, 2, 3…; una gotita gris se queda afuera en cada vuelta ("merma pequeña"). |
| 6 | Estudio | En 2025, un estudio pagado por la industria en Estados Unidos calculó el viaje del bote de reciclaje a lata nueva: menos de sesenta días. | Tarjeta de estudio "RRS para Aluminum Association y CMI · EE. UU. · 2025". Calendario que corre: bote azul → camión → planta → lata nueva sin pintar; marcador "< 60 días". |
| 7 | Tienda | Y llena, otra vez en la tienda, casi cuatro meses. | La lata se llena y llega a un estante; el calendario sigue hasta "114 días". |
| 8 | Basura | Lo raro: en 2023 allá solo se reciclaron cuarenta y tres de cada cien latas. Más de sesenta y un mil millones, no. | Cuadrícula de 100 latas: 43 se pintan de verde (etiqueta "recicladas"), 57 se apagan en gris (etiqueta "no recicladas"). Chip "EE. UU. 2023: 43 %"; número "61 mil millones de latas". |
| 9 | Cierre | Así que esa lata vacía no es basura: es una roca que ya no hay que volver a excavar. | **Regreso a la lata y la roca del inicio**: la lata se endereza y la roca se queda en su lugar, con un pico de minero que se aleja. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de física y Robert apuntando a cámara. |

**Música:** cama grave continua (`m.pad`). Efectos: rebote metálico de la lata (cuadro 0), crujido de la roca, burbujeo del baño y zumbido
eléctrico de la corriente, el medidor que sube (tono ascendente) y el que casi no sube, "tic" por cada vuelta del bucle, pasos del
calendario, 57 golpecitos apagados para las latas no recicladas y el sonido limpio de la lata enderezándose al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y no se gasta el aluminio de tanto reciclarlo?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «solo el cinco por ciento de la energía» (cuadro 0) |
| 2 | 7.8 | 10.8 | 13_senalando_arriba | `arriba-der` | señala la roca y la alúmina: «Esa roca es la bauxita» |
| 3 | 18.9 | 24.7 | 11_sorprendido | `arriba-der` | «ciento ochenta y seis gigajulios… unos ocho» |
| 4 | 25.4 | 29.5 | 07_pensativo_puno | `grande` | «¿Y no se gasta el aluminio de tanto reciclarlo?» (grande) |
| 5 | 30.3 | 35.1 | 04_bajando_lentes | `arriba-der` | «sin cambiar sus propiedades» |
| 6 | 39.0 | 42.6 | 05_sonriendo_dientes_uniformes | `arriba-der` | «menos de sesenta días» |
| 7 | 46.3 | 51.4 | 10_serio_molesto | `arriba-der` | «solo se reciclaron cuarenta y tres de cada cien» |
| 8 | 53.9 | 57.9 | 06_pensativo_menton | `arriba-der` | «una roca que ya no hay que volver a excavar» |
| — | 58.0 | 61.5 | 02_apuntando_camara | cierre | `CierreMarca robert=` |

**Total:** 8 apariciones + cierre · **35.0 s** en pantalla (+ 3.5 s de cierre) · 7 poses distintas · grande una vez.

## Fuentes (cada cifra se abrió en la fuente el 29 oct 2026)

1. **International Aluminium Institute (IAI), "Aluminium recycling saves 95% of the energy needed for primary aluminium production":**
   https://international-aluminium.org/landing/aluminium-recycling/
   > "Aluminium recycling saves 95% of the energy needed for primary aluminium production"
   > "In 2019, the primary energy consumption for global primary aluminium production, from mine to cast house, was 186 gigajoules per tonne. In contrast, the primary energy demand for recycled aluminium was 8.3 gigajoules per tonne, resulting in a significant energy saving (95.5%)."
   > "Production of primary aluminium through the Hall Heroult electrolysis process is energy-intensive, particularly electricity-intensive."
   > (Nota de la misma página: el 8.3 GJ/t del reciclado es el promedio de datos de Europa 2015/2018 y Norteamérica 2015: "There is no global estimate for energy consumption for aluminium produced from scrap.")
2. **The Aluminum Association, "Recycling":** https://www.aluminum.org/recycling
   > "Recycled aluminum saves 95% of the energy needed to make new aluminum."
   > "This makes aluminum exceptionally easy to melt and reform into a solid state without changing its fundamental properties. This means that aluminum can be recycled repeatedly, back into use, with no theoretical limitation."
   > "In the case of aluminum, a small amount of metal is typically lost through mill operations or oxidation. Despite this minimal melt loss, the remaining metal is fundamentally unchanged and can be recycled again and again"
   (Página sin fecha visible; consultada 2026.)
3. **The Aluminum Association, "Primary Production 101":** https://www.aluminum.org/primary-production-101
   > "Once mined, aluminum within the bauxite ore is chemically extracted into alumina, an aluminum oxide compound, through the Bayer process. In a second step, the alumina is smelted into pure aluminum metal through the Hall–Héroult process."
   > "In the Hall–Héroult process, alumina is dissolved in a molten cryolite bath within a carbon-lined steel pot. Carbon anodes are inserted in the top of the bath and an electric current passes through the anodes and the bath. Oxygen atoms separate from the alumina and combine with the carbon anode, leaving the remaining molten aluminum at the bottom of the pot."
4. **The Aluminum Association, comunicado del 18 mar 2025, "Aluminum Beverage Can Moves from Recycling Bin to Newly Formed Can in Less Than 60 Days":**
   https://www.aluminum.org/news/aluminum-beverage-can-moves-recycling-bin-newly-formed-can-less-60-days
   > "New research from circular economy and materials management consultant RRS confirms that used beverage cans (UBCs) move from recycling bin to newly formed cans in less than 60 days on average in the United States. The study, released today on Global Recycling Day and commissioned by the Aluminum Association and Can Manufacturers Institute (CMI)"
   > "Aluminum recycling slashes energy use and emissions by 95% versus producing new aluminum"
5. **Packaging Insights, 20 mar 2025, "Study reveals US aluminum beverage cans recycled in less than 60 days" (sobre el mismo estudio de RRS):**
   https://www.packaginginsights.com/news/recycling-us-cans-circular-aluminum-sustainability.html
   > "It concluded that it takes 54 days for a UBC to be recycled back into a new, unfilled can and 114 days to be recycled into a new can and returned to the store shelf."
   (El PDF del estudio de RRS en cancentral.com es privado; el dato de 114 días viene de esta nota de prensa especializada.)
6. **The Aluminum Association y Can Manufacturers Institute, "The Aluminum Can Advantage: Sustainability Key Performance Indicators", diciembre 2024 (datos de 2023):**
   https://aluminum.org/sites/default/files/2024-12/2024_Aluminum-Can-KPI-Report_Final.pdf
   > "increased by 1.2% from 2022 to 2023 (41.8% to 43.0%)" (tasa de reciclaje de latas por consumidores en EE. UU.)
   > "More than 61 billion cans – around $1.18 billion worth of aluminum – were diverted from the recycling stream in 2023 that could have otherwise been responsibly recycled and made into new cans."

## Notas para el verificador y la animación
- **95 % es del metal, no de la lata completa.** El IAI y la Aluminum Association comparan aluminio reciclado contra aluminio nuevo
  (primario). El mismo reporte KPI 2024 dice que hacer *una lata* con aluminio reciclado "saves about 80% of the energy needed to produce
  a beverage can with new, or primary, aluminum" (porque laminar y formar la lata gasta igual). Por eso la voz dice "sacar aluminio de
  esta lata", no "hacer una lata". Se usa el 95 % del IAI porque trae los gigajulios con año.
- **El mito de "la lata vuelve al estante en 60 días":** el estudio de 2025 dice que en <60 días (54) vuelve a ser *lata nueva vacía*; de
  vuelta en la tienda, llena, son 114 días. La voz dice "menos de sesenta días" para lata nueva y "casi cuatro meses" para la tienda.
- **México:** no se usó una tasa de reciclaje de México: las cifras que circulan (97 % "recolectado", 99 % "reciclado") vienen de notas de
  prensa sin estadística oficial reciente. Se usa el dato de EE. UU. 2023 con su año.
- "Criolita" es un mineral (fluoruro de sodio y aluminio); la celda, la roca y el bucle son esquemáticos.
- "Una roca que ya no hay que volver a excavar" es el cierre retórico: reciclar sustituye aluminio primario, que sale de bauxita minada.
