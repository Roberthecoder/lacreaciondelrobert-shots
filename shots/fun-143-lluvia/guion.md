# Shot Fungi Mati #143 · Ese hongo no nació anoche con la lluvia

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #143 · rama `claude/fun-140-144-mitos` (lote #140–#144, mitos y preguntas frecuentes sobre hongos).
- **Formato:** N1 · POR DENTRO. Viaje macro (pasto con lluvia y un champiñón de campo que "amaneció") → bajo tierra (micelio) → AL MICROSCOPIO (las células del pie se llenan de agua, fondo oscuro) → la misma imagen del pasto, ya explicada (micelio iluminado bajo el pasto y las células dibujadas en el pie).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: «Ese hongo no nació anoche con la lluvia: ya vivía ahí, bajo el pasto.»
- **Mito que corrige:** "los hongos nacen de la lluvia / de la noche a la mañana". **Lo real:** el micelio ya estaba; la seta es el fruto; el botón se infla con agua (y alimento que manda el micelio) y el pie del champiñón crece sobre todo porque sus células se estiran.
- **No repite:** fun-21 (anillos de hadas), fun-03 (qué detona la fructificación de *Pleurotus djamor* en cultivo), fun-71 (*Cyathus* dispara con la lluvia).
- **Duración:** voz 882 caracteres / 161 palabras + cierre 3.5 s → **61.5 s** en la base (escenas: 58.0 s de voz + 3.5 s de outro).
  Ojo: en los narrados anteriores la voz profesional salió a ~14 caracteres/s; si con la voz real el total pasa de 62.0 s, ajustar `"velocidad"` en `narracion.json` (atempo, sin gastar créditos).
- **Voz:** pendiente de aprobación de Robert (~900 créditos de ElevenLabs).
- **Aviso en pantalla (chiquito, en «Especie» y en el cierre):** «No comas hongos silvestres sin un experto: hay parecidos venenosos.»

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese hongo no nació anoche con la lluvia: ya vivía ahí, bajo el pasto. | Cielo de noche con lluvia sobre el pasto; desde el cuadro 0 caen gotas y salpican, y el cielo pasa de noche a día (la luna se vuelve sol). Un champiñón de campo ya está ahí. Chip «¿nació anoche?» que se tacha (s 1.4). Barra 5 cm. |
| 1 | Especie | Es Agaricus campestris, el champiñón de campo. | Cielo de día. Dos champiñones: uno joven de laminillas libres rosadas y uno maduro de laminillas café oscuro; sombrero blanco convexo, anillo delgado arriba en el pie, pie que se adelgaza a la base, sin volva. Etiquetas «champiñón de campo» + *Agaricus campestris*, «laminillas rosadas», «maduro: café oscuro». Aviso de no comer hongos silvestres. |
| 2 | Fruto | Lo que ves no es el hongo entero: es su fruto. | Se ve el suelo en corte bajo el pasto; del pie empiezan a crecer hilos blancos. Chip «esto es el fruto». |
| 3 | Micelio | La mayor parte del hongo es el micelio: hilos finísimos que viven todo el año bajo tierra, comiendo. | La red de micelio crece por todo el suelo y se ilumina; un calendario pasa ENE → NOV. Chips «la mayor parte del hongo» y «todo el año, comiendo»; etiqueta «micelio (hifas)». |
| 4 | Pregunta | ¿Entonces por qué aparece de golpe? | **Re-gancho.** «?» amarillo sobre el champiñón; Robert grande, pensativo. |
| 5 | Boton | Primero el micelio arma un botón chiquito bajo el pasto. | En el micelio iluminado aparece un botón (primordio) que sube hasta asomarse entre el pasto, con ondas verdes. Chip «primordio: el botón». |
| 6 | Inflar | Luego el botón se infla: sus células se llenan de agua y se estiran. | Fondo oscuro, chip «AL MICROSCOPIO · DENTRO DEL PIE»: las mismas 24 células (chip «las mismas células») se vuelven azules y se alargan mientras suben gotitas de agua. Barra «esquemático · no a escala». |
| 7 | Agua | Un champiñón de campo es más de ochenta por ciento agua. | Fondo amarillo: champiñón junto a un vaso que se llena de azul hasta pasar la línea roja de 80 %. Número «agua: más de 80 %»; etiqueta *Agaricus campestris*. |
| 8 | Estudio | En 1956, el equipo de John Tyler Bonner marcó champiñones con puntitos rojos y los midió. | Fondo menta. TarjetaEstudio «1956 · Bonner, Kane y Levey · *Mycologia* · "el champiñón común", como se le llamaba». Un champiñón chico junto a una regla recibe seis puntitos rojos de carmín en el pie (etiqueta «puntitos de carmín»). |
| 9 | Estiron | Desde unos dos centímetros, su pie creció sobre todo porque sus células se estiraron. | El mismo champiñón crece junto a la regla y los puntitos se separan. Chip «desde ~2 cm: sobre todo se estiraron». |
| 10 | Alimento | Y el micelio le mandaba agua y alimento desde el suelo. | Suelo en corte: gotitas azules (agua) y doradas (alimento) suben por el micelio hasta el pie. Chip «no solo agua: también alimento». |
| 11 | Tinta | En un hongo tinta, Coprinopsis cinerea, el estirón más rápido dura unas cinco horas. | Fondo rosa: un hongo tinta (sombrero cónico gris con fibrillas, borde que se ennegrece, pie largo y blanco) se estira mientras corre un cronómetro hasta 5 h; chip «≈ 5 horas». Etiquetas «un hongo tinta» + *Coprinopsis cinerea*. |
| 12 | Cierre | No nació anoche: llevaba tiempo ahí abajo, y la lluvia le dio agua para inflarse. | **Regreso a la imagen del inicio:** el mismo pasto con lluvia y el mismo champiñón, ahora con el micelio iluminado bajo el pasto y sus células azules dibujadas en el pie. Chip «no nació: se infló». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

**Música (`gen-audio.mjs`):** cama grave y continua en re menor, sin golpe, con progresión con función que cambia en cada escena y conducción de voces; "tapada" (ahogada) mientras el hongo está escondido bajo tierra, abierta al salir. Tema propio de 4 notas: motivo en el gancho, respuesta en el micelio, secuencia que pregunta en «¿por qué aparece de golpe?», la respuesta otra vez (en otro registro) en el estudio y en el hongo tinta, y cadencia en **re mayor** en el cierre. Efectos en el mismo cuadro: gotas de lluvia, glissando del amanecer, tachón del chip, whoosh al bajar al suelo, tics del calendario, burbuja del botón, burbujeo del agua que entra a las células, llenado del vaso, seis tics de los puntitos de carmín, burbujas de agua y alimento, tic-tac acelerado del cronómetro y golpe suave en «≈ 5 horas», lluvia que regresa.

Barra de escala: 5 cm (champiñón; su sombrero mide 5–10 cm), «5 cm · micelio esquemático» en los cortes del suelo, «esquemático · no a escala» en las células, «regla: 1 marca = 5 mm (esquemático)» en el estudio, 5 cm en el hongo tinta.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Entonces por qué aparece de golpe?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | «no nació anoche» (cuadro 0) |
| 2 | 7.8 | 10.3 | 13_senalando_arriba | `arriba-der` | «es su fruto» |
| 3 | 13.5 | 16.6 | 12_perfil_serio | `arriba-der` | «viven todo el año bajo tierra» |
| 4 | 16.8 | 19.5 | 07_pensativo_puno | `grande` | «¿Entonces por qué aparece de golpe?» |
| 5 | 23.6 | 27.0 | 04_bajando_lentes | `arriba-der` | «sus células se llenan de agua» |
| 6 | 27.5 | 31.6 | 11_sorprendido | `arriba-der` | «más de ochenta por ciento agua» |
| 7 | 34.5 | 37.9 | 06_pensativo_menton | `arriba-der` | Bonner marca y mide |
| 8 | 39.1 | 47.0 | 13_senalando_arriba | `arriba-der` | «sobre todo se estiraron» · «agua y alimento» |
| 9 | 49.1 | 52.6 | 12_perfil_serio | `arriba-der` | «dura unas cinco horas» |
| 10 | 53.2 | 57.9 | 02_apuntando_camara | `arriba-der` | «la lluvia le dio agua para inflarse» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones 10 · **38.3 s** en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 5 nov 2026; detalle y frases en `verificacion.md`)

1. Bonner, J. T., Kane, K. K. y Levey, R. H. (1956). Studies on the mechanics of growth in the common mushroom, *Agaricus campestris*. *Mycologia* 48(1): 13–19. https://doi.org/10.1080/00275514.1956.12024513 (resumen)
   > "by measuring mushrooms marked with carmine dots at regular intervals, the details of the location of the growth region during different phases of growth were described"
   > "from approximately the 18 mm stage onward there is probably little or no increase in cell number (at least in the stalk)"
   > el crecimiento del pie "involved a transport of materials from the mycelium in the soil since the dry weight increased proportionately with the wet weight"
   > Craig, G. D., Gull, K. y Wood, D. A. (1977). Stipe elongation in *Agaricus bisporus*. *J. Gen. Microbiol.* 102: 337–347. https://doi.org/10.1099/00221287-102-2-337 : "Cell elongation accounted for the elongation of the lower and mid-regions of the stipe but could not account for the elongation of the upper stipe region" (por eso la voz no dice que no se formen células nuevas).
   > (En 1956 el champiñón cultivado también se llamaba *A. campestris* var. *bisporus*: no se afirma que fueran setas de campo.)
2. Jedidi, I. K., Ayoub, I. K., Philipe, T. y Bouzouita, N. (2016). Chemical composition and non-volatile components of three wild edible mushrooms collected from northwest Tunisia. *Mediterranean Journal of Chemistry* 5(3): 434–441. https://medjchem.com/index.php/medjchem/article/download/411/476
   > materia seca de *A. campestris* silvestre: "16.5 %"; "Beluhan & Ranogajec reported that the DW content of A. campestris … were 14.89 %" → 83.5–85 % de agua.
3. Wan, L., Sun, H., Ni, Y. et al. (2025). Dynamics of water status during fruiting body development of *Agaricus bisporus*… *Chemical and Biological Technologies in Agriculture* 12: 14. https://doi.org/10.1186/s40538-024-00719-1
   > "Cell expansion due to osmotic water influx is largely responsible for the very rapid growth of the fruiting body of A. bisporus"
4. Moore, D., Robson, G. D. y Trinci, A. P. J. *21st Century Guidebook to Fungi*, §12.9. https://davidmoore.org.uk/21st_Century_Guidebook_to_Fungi_PLATINUM/Ch12_09.htm
   > "most of the changes in shape during fruit body development in basidiomycetes depend on cell inflation"
   > (en *Coprinopsis cinerea*) "The phase of most rapid stem elongation occupied the 5 h prior to spore discharge and started 8 h after karyogamy."
5. Lepp, H. (2012). What is a fungus? Australian National Botanic Gardens. https://anbg.gov.au/fungi/what-is-fungus.html
   > "The mycelium is there throughout the year, feeding and expanding."
   > "You know that the apple tree in your garden is there throughout the year but apples are produced for just a short time." (analogía del fruto)
6. MykoWeb, *California Fungi: Agaricus campestris*. https://www.mykoweb.com/CAF/species/Agaricus_campestris.html (morfología del dibujo)
   > "Gills close, free, pink, becoming blackish-brown at maturity."; "Stipe 3-6 cm long, 1-2 cm thick, tapering to a pointed base"
7. Herman, K. C. y Bleichrodt, R. (2022). Go with the flow: mechanisms driving water transport during vegetative growth and fruiting. *Fungal Biology Reviews*. https://research-portal.uu.nl/en/publications/go-with-the-flow-mechanisms-driving-water-transport-during-vegeta/
   > "The fungal network is interconnected and allows water flow when small pressure differences exist."

El dibujo es esquemático.
