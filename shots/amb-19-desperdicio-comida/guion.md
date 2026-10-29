# Shot Ambiental #19 · Casi una quinta parte de la comida del mundo se va a la basura (y la mayoría, desde las casas)

- **Serie:** Shot Ambiental · **Logo:** biología (ADN: comida, suelo y ecosistemas) · **Badge:** #19 · rama `pedido300/amb`.
- **Formato:** N4 "La imagen que se llena" (un refri con 5 repisas: la quinta se vacía al bote) + toque de N2 (números grandes: 1,050 millones de t; 79 kg; 105 kg). Cierre que regresa al refri del inicio, ahora con la quinta parte señalada "60 % en casas".
- **Gancho (de los 7):** #3 "Tu vida en una imagen": "Este refri es toda la comida que llega a tiendas, restaurantes y casas del mundo. Casi una de cada cinco partes se va a la basura."
- **Local:** México (105 kg por persona al año en hogares, estimación del informe).
- **Duración:** voz 960 caracteres escritos ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → objetivo **61.5 s** en la base.
- **Cuentas:** 1,052 Mt ÷ 5,500 Mt (comida disponible para consumo, FAOSTAT 2020) = 19.1 % → "casi una de cada cinco" (20 %) · 631 ÷ 1,052 = 60 % hogares ("seis de cada diez kilos"; "más de la mitad") · ingreso alto 81, medio-alto 88, medio-bajo 86 kg → diferencia máxima 88 − 81 = 7 kg · 79 + 36 + 17 = 132 kg por persona en total.
- **Datos de 2022:** la voz dice "En 2022" en la línea de las toneladas; el informe se publicó en 2024.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este refri es toda la comida que llega a tiendas, restaurantes y casas del mundo. Casi una de cada cinco partes se va a la basura. | Cuadro 0: un refri caricatura se abre de golpe; 5 repisas llenas (frutas, tortillas, leche, verduras, sobras). La quinta repisa se inclina y su comida cae a un bote de basura. Chip "≈ 1 de cada 5 (19 %)". |
| 1 | Toneladas | En 2022 fueron mil cincuenta millones de toneladas de comida tirada. | El bote crece hasta ser una montaña; número grande "1,050 millones de toneladas" y chip "2022". |
| 2 | Cascaras | Ojo: esa cuenta incluye cáscaras y huesos, no solo comida buena. | Lupa sobre la montaña: cáscaras de plátano, huesos de pollo y cáscara de huevo mezclados con pan y fruta. Etiquetas "cáscaras", "huesos", "comida que se podía comer". |
| 3 | Pregunta | ¿Y quién tira más: el súper, los restaurantes o tu casa? | **Re-gancho.** Tres botes con letreros: súper · restaurante · casa, y un "?" gigante. Robert grande. |
| 4 | Casa | Tu casa. Seis de cada diez kilos se tiran en los hogares. | Barra de 10 kilos que se llena: 6 en el bote "casa", 3 en "restaurantes" y 1 en "súper" (60 / 28 / 12 %). |
| 5 | Kilos | En promedio, cada persona tira en casa setenta y nueve kilos al año. | Una persona junto a una pila de bolsas; contador que sube a "79 kg por persona al año (en casa)" y chip "promedio mundial". |
| 6 | Mexico | Y para México, el informe estima ciento cinco kilos por persona, solo en casa. | Mapa esquemático de México; la pila crece a "105 kg"; chip "estimación · confianza media". |
| 7 | Estudio | Lo calculó en 2024 el Programa de la ONU para el Medio Ambiente, con datos de hogares de noventa y tres países. | Tarjeta de estudio: "PNUMA (UNEP) · Food Waste Index Report 2024 · Nairobi"; globo con 93 países que se encienden. |
| 8 | Ricos | Y no es cosa de países ricos: entre ricos y de ingreso medio, el promedio en casa cambia apenas siete kilos. | Mito tachado "solo pasa en países ricos"; tres barras casi iguales: ingreso alto 81 · medio-alto 88 · medio-bajo 86 kg/persona/año. |
| 9 | Gases | Además, entre 2010 y 2016, la comida que se perdía y se tiraba generó entre ocho y diez por ciento de los gases de efecto invernadero. | Del bote salen nubecitas de gas; dona "8–10 % de los gases de efecto invernadero del mundo (pérdida + desperdicio)" y chip "2010–2016". |
| 10 | Cierre | Así que esa quinta parte no está lejos: más de la mitad se tira en casas como la tuya. | **Regreso al refri del inicio**: la quinta repisa vacía, marcada "60 % se tira en casas"; la puerta se cierra. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert apuntando a cámara. |

**Música:** cama grave continua (`m.pad`), un poco tensa mientras se llena el bote y más abierta en el cierre. Efectos: puerta de refri al abrir (cuadro 0) y al cerrar (final), "plop" por cada cosa que cae al bote, retumbe al crecer la montaña, clic de la lupa, un golpecito por cada kilo de la barra (10), contador que sube (79 → 105), "ding" por los países que se encienden, tachón del mito, burbujeo suave del gas.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y quién tira más: el súper, los restaurantes o tu casa?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «casi una de cada cinco partes se va a la basura» (cuadro 0) |
| 2 | 8.7 | 12.2 | 10_serio_molesto | `arriba-der` | «mil cincuenta millones de toneladas» |
| 3 | 15.8 | 19.6 | 07_pensativo_puno | `grande` | «¿Y quién tira más…?» (grande) |
| 4 | 27.6 | 31.6 | 13_senalando_arriba | `arriba-der` | señala el mapa: «para México… ciento cinco kilos» |
| 5 | 35.4 | 38.2 | 05_sonriendo_dientes_uniformes | `izq-alto` | «datos de hogares de noventa y tres países» |
| 6 | 40.8 | 44.7 | 04_bajando_lentes | `arriba-der` | «no es cosa de países ricos… apenas siete kilos» |
| 7 | 47.4 | 52.7 | 12_perfil_serio | `izq-alto` | «entre ocho y diez por ciento de los gases» |
| 8 | 53.9 | 57.9 | 06_pensativo_menton | `arriba-der` | «más de la mitad se tira en casas como la tuya» |
| — | 58.0 | 61.5 | 02_apuntando_camara | cierre | `CierreMarca robert=` |

**Total:** 8 apariciones + cierre · **31.9 s** en pantalla (+ 3.5 s de cierre) · 8 poses distintas · grande una vez.

## Fuentes (cada cifra se abrió en el PDF el 29 oct 2026)

1. **UNEP (2024). *Food Waste Index Report 2024. Think Eat Save: Tracking Progress to Halve Global Food Waste*. Nairobi.**
   PDF (Biblioteca Digital de la ONU): https://digitallibrary.un.org/record/4042857/files/1401794_EN.pdf ·
   ficha: https://www.unep.org/resources/publication/food-waste-index-report-2024 (la descarga en wedocs.unep.org pide verificación de navegador).
   - Toneladas, kilos por persona y reparto por sector (dato de **2022**), sección de resultados globales y Tabla 23:
     > "The results indicate that 1.05 billion tonnes of food were wasted across the three sectors considered in this report in 2022 (Table 23), equal to 132 kilograms per capita per year. Around 60 per cent of this waste comes from households, 28 per cent from food service and 12 per cent from retail."
     > Tabla 23 "Estimates of global food waste in 2022": "Household 79 [kg/capita/year] 631 [million tonnes] · Food service 36 · 290 · Retail 17 · 131 · Total 132 · 1 052".
   - 19 % de la comida disponible para consumo (desperdicio 2022 contra comida disponible FAOSTAT 2020):
     > "the latest available data on “food” available for consumption was taken from FAOstat. This was for the year 2020, and amounts to 5.5 billion tonnes. Comparing the total amount of estimated food waste here would suggest that as much as 19 per cent of food that reaches the consumption stage is subsequently disposed by retailers, food service and households."
   - Incluye partes no comestibles (cáscaras, huesos):
     > "“food waste” is defined as food and the associated inedible parts removed from the human food supply chain in the following three sectors: retail, food service and households. As a result, the estimates include both “edible” and “inedible” parts of food."
   - México (Anexo 3, "Table of household estimates"):
     > "Latin America and the Caribbean · 484 · Mexico · 105 [household estimate kg/capita/year] · 13 368 447 [tonnes/year] · Medium confidence"
   - Datos de 93 países (hogares):
     > "A substantial increase in data availability and coverage was observed in the household sector, with 194 datapoints across 93 countries (Table 2)."
   - No es solo de países ricos (Tabla 3: ingreso alto 81, medio-alto 88, medio-bajo 86 kg/persona/año en hogares):
     > "the average observed household food waste in high income, upper-middle income and lower-middle income countries varying by just 7 kilograms per capita per year (Table 3)."
   - Gases de efecto invernadero (estimación citada por el informe, de FAO 2013):
     > "food waste generates an estimated 8–10 per cent of global greenhouse gas emissions (including from both loss and waste)"
     > "food waste alone amounting to around 8-10 per cent (FAO 2013) or more (Zhu et al. 2023)."
2. **IPCC (2019). *Climate Change and Land* (SRCCL), Resumen para responsables de políticas, B.6.3** (año del dato: **2010–2016**):
   https://www.ipcc.ch/site/assets/uploads/sites/4/2022/11/SRCCL_SPM.pdf
   > "During 2010-2016, global food loss and waste contributed 8–10% of total anthropogenic GHG emissions"

## Notas
- "Casi una de cada cinco partes" = 19 % de la comida que llega a la etapa de consumo (tiendas, restaurantes y casas), no de toda la comida producida; por eso el gancho dice "comida que llega a tiendas, restaurantes y casas".
- El 19 % compara el desperdicio de 2022 con la comida disponible de 2020 (último dato de FAOSTAT que usó el informe); el propio informe dice "as much as" (hasta).
- El informe aclara que el aumento respecto al de 2021 (931 millones de t en 2019) no se cree que sea un aumento real, sino mejores datos: por eso no se compara con años anteriores.
- El dato de México es una estimación con "confianza media" (varios estudios locales): la voz dice "el informe estima".
- El 8–10 % de gases incluye pérdida (antes de la tienda) + desperdicio y es de 2010–2016 (IPCC 2019); la voz dice el periodo.
- El refri, los botes y el mapa son esquemáticos (el refri es una metáfora de toda la comida en la etapa de consumo, no de un refri real).
