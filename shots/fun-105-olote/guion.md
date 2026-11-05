# Shot Fungi Mati #105 · Ese olote no es basura: es comida para un hongo

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #105 · rama `claude/fun-105-109-cultivo`.
- **Formato:** N1 · Por dentro (con un toque de N6: los pasos del cultivo). Viaje olote en la mano → bolsa de cultivo → por dentro (hifas y enzimas, fondo oscuro) → el mismo olote, ahora con un racimo de setas.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo en pantalla: «Ese olote que tiras no es basura: es comida… para un hongo.» Le sigue un #4 (número que contradice): «Un kilo de olote seco dio ochocientos cincuenta gramos de setas frescas».
- **Duración (estimada):** voz 944 caracteres / ~171 palabras (≈ 58.1 s) + cierre 3.5 s → **≈ 61.6 s** en la base.
- **Voz:** pendiente de aprobación de Robert (~950 créditos de ElevenLabs).
- **Tono:** práctico y optimista sin exagerar: los hongos son *una* forma de aprovechar residuos y producir comida, no "la solución al hambre". Aclarar en pantalla que se compara **seta fresca** contra **olote seco** (por eso la cifra es tan alta).
- **Estado:** guion escrito; **falta la verificación independiente** (ver nota al final). No animar hasta `VEREDICTO: APROBADO`.

## Versión narrada

Tiempos estimados con `estimar-escenas.mjs` (con la voz real se recorren solos).

| # | Escena (s) | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho 0–3.7 | Ese olote que tiras no es basura: es comida… para un hongo. | Fondo amarillo de la marca. Una mano tira un olote (ya desgranado) hacia un bote de basura (acción en el cuadro 0.3); el olote se frena en el aire y gira. Chip "basura ✗" que se tacha y cambia a "comida… ¿para quién?". Barra de escala 10 cm. |
| 1 | Numero 3.7–8.1 | Un kilo de olote seco dio ochocientos cincuenta gramos de setas frescas. | Una báscula: de un lado "1 kg de olote **seco**", del otro un racimo de setas que sube hasta "850 g de setas **frescas**". Chip chico "seta fresca vs. olote seco = eficiencia biológica 85 %" y "estudio de Hidalgo, 2026". |
| 2 | Preparar 8.1–12.9 | Primero se pica, se remoja y se pasteuriza: una hora en agua a setenta grados. | Fondo menta. Tres pasos con iconos que entran uno por frase: olote picado en trozos → cubeta con agua → olla con termómetro que sube a "70 °C" y reloj "1 h". Chip "pasteurizar, no esterilizar". |
| 3 | Semilla 12.9–17.8 | Luego se siembra la semilla: granos con micelio de la seta, *Pleurotus ostreatus*. | Frasco de granos de trigo cubiertos de algodón blanco (micelio) que se vacían sobre el olote picado; chip "semilla = grano con micelio · ~5 %". Etiqueta "seta · *Pleurotus ostreatus*". |
| 4 | Oscuro 17.8–21.6 | En una bolsa, a oscuras, sus hifas avanzan unas tres semanas. | La mezcla entra a una bolsa transparente (`BolsaCultivo`); se apaga la luz (fondo azul noche) y el blanco avanza por la bolsa (col 0 → 1). Contador "días 0 → 21" y chip "~25 °C". |
| 5 | Enzimas 21.6–26.8 | Es un hongo de pudrición blanca: suelta enzimas que desarman la fibra dura del olote. | `Lupa` en rayos X sobre la bolsa → fondo oscuro, "POR DENTRO": hifas tabicadas que crecen sobre fibras del olote; puntitos de enzimas ("lacasas · peroxidasas") que salen de las puntas y cortan las fibras (lignina y celulosa) en pedacitos que el hongo absorbe. Barra de escala 10 µm. Chip "pudrición blanca". |
| 6 | Pregunta 26.8–28.6 | ¿Y cuándo salen las setas? | **Re-gancho.** Fondo rosa: la bolsa toda blanca con un "?" gigante; Robert grande, pensativo. |
| 7 | Fruto 28.6–33.0 | Cuando le das aire fresco, luz y mucha humedad, el micelio arma racimos. | Fondo cian. Se abren cortes en la bolsa; entran iconos "aire fresco", "luz 12 h", "humedad 85–90 %", "18–22 °C"; de cada corte brotan primordios que crecen a un racimo de setas en repisa (sombrero en abanico gris-crema, pie corto lateral, laminillas que bajan por el pie). Barra 5 cm. |
| 8 | Estudio 33.0–40.2 | En 2026, en Hidalgo, el olote rindió más que la paja de cebada y dio cosecha en diecinueve días; la paja, en veintiséis. | `TarjetaEstudio` "2026 · Hidalgo, México · López-López et al. · *Agroindustrial Science*". Dos bolsas lado a lado con barras: "olote: 85 % de eficiencia biológica · cosecha en 19 días" y "paja de cebada: 65 % · 26 días". Calendario que avanza. |
| 9 | Robert 40.2–45.8 | Yo probé olotes: si no están bien desgranados, fermentan; los buenos me dieron setas enormes. | Fondo naranja. Dos olotes: uno con granos pegados y burbujitas ("fermenta ✗") y otro limpio con setas enormes ("✓"). Chip chico "cal de nixtamal" en un costal. |
| 10 | Sobra 45.8–49.6 | Y lo que sobra sirve de composta o de alimento para animales. | Fondo menta. El bloque ya cosechado (sustrato agotado) se parte en dos flechas: a una maceta con plantita ("composta") y a una vaca/borrego que come ("alimento para animales"). |
| 11 | Futuro 49.6–54.6 | Mi meta a futuro: una tonelada de bagazo de agave convertida en hongos para comer. | Fondo lila. Montaña de bagazo de agave con etiqueta "1 tonelada" y una flecha "a futuro" hacia una mesa con platos de setas. Chip "meta, no hecho". |
| 12 | Cierre 54.6–58.1 | Así que ese olote no era basura: era tu próxima comida. | **Regreso a la imagen del inicio:** el mismo fondo amarillo y la misma mano, ahora sostiene el mismo olote con un racimo de setas saliendo de él; el bote de basura queda vacío. Chip "no era basura". |
| — | Outro 58.1–61.6 | (sin voz) | `CierreMarca` con el logo de biología y Robert apuntando a cámara. |

**Música:** cama grave y cálida (de cocina/campo), continua y sin golpe; motivo que crece con el micelio (se va llenando en "Oscuro" y "Enzimas") y se abre en "Fruto" cuando brotan las setas. Efectos en el mismo cuadro: olote que cae y se frena, báscula que sube, cuchillo picando, chapoteo de agua, burbujeo de la olla, granos que caen, interruptor de luz, crujido suave de fibras al cortarse (tics por enzima), "pop" de cada primordio, pasar de hojas del calendario, burbujitas de fermentación, costal que cae, mordida/rumiar del animal.

Barra de escala: 10 cm (olote), 5 cm (setas), 10 µm (hifas). En las tarjetas (estudio, báscula) no hay objeto que medir.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y cuándo salen las setas?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.5 | 11_sorprendido | `gancho` | «no es basura: es comida… para un hongo» (cuadro 0) |
| 2 | 4.2 | 7.8 | 04_bajando_lentes | `arriba-der` | «ochocientos cincuenta gramos de setas frescas» |
| 3 | 13.2 | 16.6 | 13_senalando_arriba | `arriba-der` | «se siembra la semilla» |
| 4 | 22.0 | 26.4 | 12_perfil_serio | `arriba-der` | «pudrición blanca… desarman la fibra» |
| 5 | 26.8 | 28.6 | 07_pensativo_puno | `grande` | «¿Y cuándo salen las setas?» |
| 6 | 34.0 | 39.8 | 06_pensativo_menton | `arriba-der` | «rindió más… diecinueve días» |
| 7 | 40.2 | 45.6 | 05_sonriendo_dientes_uniformes | `arriba-der` | «Yo probé olotes… setas enormes» |
| 8 | 49.8 | 54.4 | 13_senalando_arriba | `arriba-der` | «Mi meta a futuro: una tonelada de bagazo» |
| 9 | 54.8 | 58.0 | 02_apuntando_camara | `arriba-der` | «era tu próxima comida» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

Apariciones 9 · **≈ 35.7 s** en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas por la investigación previa del coordinador; el verificador independiente debe volver a abrirlas)

1. López-López et al. (2026). *Agroindustrial Science* 16(3): 373–379. Hidalgo, México. https://revistas.unitru.edu.pe/index.php/agroindscience/es/article/download/7919/7703/31456
   > "Los olotes de maíz … alcanzaron la mayor eficiencia biológica, con 85%, y permitieron la cosecha en 19 días… La paja de cebada… 65% y prolongar el tiempo de cosecha hasta 26 días"
   > Protocolo: "submerged in water at 70 °C for 1 h"; semilla al 5 %; "incubated at 25°C … for 20 to 25 days"; fructificación "18 – 22°C and a relative humidity of 85% – 90%… 12-hour light".
2. Romero-Arenas et al. (2018). *Agricultura, Sociedad y Desarrollo* 15(2): 145–160. https://www.redalyc.org/journal/3605/360559620001/360559620001.pdf
   > Eficiencia biológica = peso fresco de hongos cosechados / peso seco del sustrato × 100 (definición usada para explicar "seta fresca vs. olote seco").
3. Knop, D., Yarden, O. y Hadar, Y. (2015). The ligninolytic peroxidases in the genus *Pleurotus*… *Applied Microbiology and Biotechnology*. doi:10.1007/s00253-014-6256-8
   > "Like other white-rot fungi (WRF), they are able to grow on a variety of lignocellulosic biomass substrates… lacasses, versatile peroxidases (VPs), and short manganese peroxidases"
4. Sánchez, C. (2010). Cultivation of *Pleurotus ostreatus* and other edible mushrooms. *Applied Microbiology and Biotechnology*. doi:10.1007/s00253-009-2343-7
   > "does not require sterilization, only pasteurization, which is less expensive."
5. UF/IFAS EDIS SL448 (2018). https://journals.flvc.org/edis/article/download/105076/118317
   > Semilla (spawn) de grano al 5–10 %; incubar a oscuras 2–3 semanas; fructificar con luz y buen recambio de aire.
6. Grimm, D. y Wösten, H. A. B. (2018). Mushroom cultivation in the circular economy. *Applied Microbiology and Biotechnology*. https://pmc.ncbi.nlm.nih.gov/articles/PMC6132538/
   > Sustrato agotado (SMS) usado como composta y alimento animal; "corn cobs" entre los sustratos.
7. Robert (hechos fijos, `maestro/recetas/correcciones-de-robert.md`): probó olotes por un video de YouTube; fermentan si no están bien desgranados; los que funcionaron dieron setas enormes; usó cal de nixtamal. Proyecto "De basura a comida". Meta a futuro: hongos sobre bagazo de agave (laboratorio de biorrefinería, desde oct 2024).

El dibujo es esquemático.

> **PENDIENTE:** este guion todavía NO pasó por la verificación independiente (el constructor no tuvo herramienta para lanzar subagentes). No existe `verificacion.md`; no animar hasta tenerlo con `VEREDICTO: APROBADO`.
