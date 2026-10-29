# Shot Químico #43 · Lo que mata no huele ni se ve (monóxido de carbono del anafre y el boiler)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #43 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el cuarto cerrado con el anafre → el pulmón → el glóbulo rojo y la hemoglobina → el mismo cuarto, ventilado y con detector) + un toque de N5 (Heckerling, Chicago, 1987).
- **Gancho (de los 7):** #6 "Mito peligroso: ¿Por qué NO…?": "¿Por qué NO prender el anafre dentro de tu casa? Porque lo que mata no huele ni se ve."
- **Distinto del #11 (gas de la estufa):** aquel era el olor que le ponen al gas LP; este es el gas que sale de quemar mal, que no huele y que se pega a la sangre. No se repite nada de mercaptanos.
- **Seguridad:** solo consejos que traen las fuentes oficiales (salir al aire libre, pedir ayuda, detector, no quemar carbón adentro). No se recomienda ningún tratamiento casero.
- **Duración:** voz 945 caracteres / 12 líneas (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`monoxido.jsx`, base 61.5 s con `gen-audio.mjs`), voz pendiente de aprobación de Robert (~945 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | ¿Por qué NO prender el anafre dentro de tu casa? Porque lo que mata no huele ni se ve. | Fondo lila. Desde el cuadro 0 un anafre con brasas que chisporrotean en un cuarto con la ventana cerrada con candado y una persona dormida en su cama. Una nube transparente de contorno punteado (con moléculas CO) se extiende desde el anafre. Íconos "no huele" (nariz tachada) y "no se ve" (ojo tachado). Chip "monóxido de carbono · CO". |
| 1 | Que | Es monóxido de carbono: sale cuando el carbón o el gas arden sin suficiente oxígeno. | Fondo amarillo. Fila 1: C + O₂ → CO₂ (chip "con mucho oxígeno"). Fila 2 (borde rojo): **2C + O₂ → 2CO**, ecuación balanceada con átomos que se juntan; las 2 moléculas CO quedan marcadas en un círculo punteado rojo. Chip "sin suficiente oxígeno: monóxido". |
| 2 | Fuentes | Como un anafre o un boiler en un cuarto cerrado. | Fondo rosa, el cuarto: anafre a la izquierda y un boiler con el tubo de salida tapado (✗ rojo) a la derecha; las nubes de CO salen de los dos y llenan el cuarto. Etiquetas "anafre", "boiler"; chip "cuarto cerrado". |
| 3 | Pulmon | Lo respiras y pasa de tu pulmón a tus glóbulos rojos. | Fondo noche: pulmones con tráquea y bronquios; moléculas CO bajan por la tráquea. Lupa al alvéolo y un capilar con glóbulos rojos que pasan: el CO cruza y entra a ellos. Etiquetas "pulmón", "alvéolo", "glóbulos rojos". |
| 4 | Hemoglobina | Ahí, la hemoglobina, que carga oxígeno, se pega al monóxido más de 200 veces más fuerte. | Fondo noche, dentro del glóbulo rojo: una hemoglobina de 4 partes, cada una con su "asiento" de hierro (Fe). Moléculas de O₂ se sientan y se mecen; llega un CO y se queda pegado con un candado. Número gigante "×200+" con "más fuerte que el oxígeno". Etiqueta "hemoglobina". |
| 5 | Desplaza | Le quita el lugar al oxígeno y a tu cuerpo le llega menos. | Uno por uno los otros asientos se llenan de CO con su candado y los O₂ salen flotando. Medidor "oxígeno que llega" que baja de "normal" a "baja" (sin cifra). |
| 6 | Pregunta | ¿Y cómo te das cuenta? | **Re-gancho.** Fondo rosa, "?" gigante que se mece; Robert grande pensativo. |
| 7 | Sintomas | Dolor de cabeza, mareo, náuseas: parece gripa. Y dormido, puedes morir antes de sentir algo. | Fondo menta, escala real: busto de una persona; aparecen uno por frase dolor de cabeza (rayos rojos), mareo (espiral que gira) y náuseas (estómago verde), con sus etiquetas, y el chip "¿gripa?". Luego la persona dormida en su cama; las "z" se apagan poco a poco (nada gráfico). Chip "dormido, no te das cuenta". |
| 8 | Estudio | En 1987, en Chicago, midieron a 37 personas con dolor de cabeza en urgencias en invierno: 7 traían mucho monóxido en la sangre y nadie lo sospechó. | Fondo cian: ventana con nieve (invierno). Tarjeta "1987 · Heckerling · Chicago · Am J Emerg Med · urgencias en invierno"; chip "37 personas con dolor de cabeza"; aparecen 37 monitos y 7 se pintan de rojo (chip "7: más del 10 % de su hemoglobina con CO"); al final "¿será monóxido?" se tacha (nadie lo sospechó). |
| 9 | Lento | Y con aire normal, tu cuerpo tarda horas en sacar apenas la mitad. | Fondo lila: reloj de pared con las manecillas en time-lapse y un tubo "CO en tu sangre" que baja solo hasta la raya de la mitad (½). Chip "la mitad: ≈ 4–5 h". |
| 10 | Aviso | Si a varios en casa les duele la cabeza a la vez, o suena el detector, salgan al aire libre y pidan ayuda: en México, al 911. | Fondo amarillo, el cuarto: 3 monitos de la familia, a varios les sale el rayo de dolor de cabeza; el detector de CO de la pared parpadea en rojo con ondas y "¡pip pip!". Luego afuera (cielo, sol, pasto): los 3 salen de la casa al aire libre, con viento fresco. Chip "pide ayuda: 911". |
| 11 | Cierre | Nunca prendas el anafre adentro: ese peligro no huele, pero se puede evitar. | **Regreso al cuarto del inicio, transformado**: los postigos se abren (cielo, sol y viento que entra), el anafre del cuarto se desvanece bajo una ✗ roja y se ve encendido afuera, al otro lado de la ventana; la nube de CO se va; detector en verde; la persona duerme tranquila. Chip "anafre: solo al aire libre". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua y tensa (tapada mientras el CO llena el cuarto y los asientos), que se abre al salir al aire libre. Efectos en el mismo cuadro: chisporroteo de carbón, siseo del boiler, respiración, "clic" de candado cuando el CO se pega, tic-tac del reloj, "pip" del detector, ventana que se abre.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y cómo te das cuenta?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «lo que mata no huele ni se ve» |
| 2 | 6.1 | 10.0 | 13_senalando_arriba | `izq-alto` | «sin suficiente oxígeno» (señala la ecuación) |
| 3 | 13.7 | 16.5 | 06_pensativo_menton | `arriba-der` | «pasa de tu pulmón a tus glóbulos rojos» |
| 4 | 18.8 | 25.6 | 04_bajando_lentes | `izq-alto` | «más de 200 veces más fuerte» |
| 5 | 25.9 | 27.4 | 07_pensativo_puno | `grande` | «¿Y cómo te das cuenta?» |
| 6 | 30.8 | 32.7 | 10_serio_molesto | `arriba-der` | «dormido, puedes morir antes de sentir algo» |
| 7 | 36.7 | 41.4 | 11_sorprendido | `arriba-der` | «7 traían mucho monóxido… nadie lo sospechó» |
| 8 | 42.2 | 45.5 | 12_perfil_serio | `izq-alto` | «tarda horas en sacar apenas la mitad» |
| 9 | 49.4 | 53.0 | 02_apuntando_camara | `izq-alto` | «salgan al aire libre y pidan ayuda» |
| 10 | 54.9 | 57.9 | 13_senalando_arriba | `arriba-der` | «nunca prendas el anafre adentro» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 36 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **No huele ni se ve; síntomas "como de gripa"; dormido puedes morir antes de sentir algo; nunca quemar carbón adentro; detectores** — CDC. "Carbon Monoxide (CO) Poisoning Basics" (página actualizada el 26 oct 2026). https://www.cdc.gov/carbon-monoxide/about/index.html
   > "Carbon monoxide (CO) is an odorless, colorless gas that kills without warning." · "The most common symptoms of CO poisoning are headache, dizziness, weakness, upset stomach, vomiting, chest pain, and confusion. CO symptoms are often described as “flu-like.”" · "People who are sleeping, drunk, or under the influence of other substances can die from CO poisoning before they have symptoms." · "Never burn charcoal indoors. Burning charcoal - red, gray, black, or white - gives off CO." · "Install battery-operated or battery back-up CO detectors near every sleeping area in your home." · "Have your heating system, water heater, and any other gas, oil, or coal burning appliances serviced by a qualified technician every year."
2. **Sale cuando se quema sin suficiente oxígeno (cuarto cerrado)** — Santé publique France. "Carbon monoxide: what is it and how is it formed". https://www.santepubliquefrance.fr/index.php/en/monoxyde-de-carbone/what-carbon-monoxide-and-how-it-formed
   > "Carbon monoxide results from the incomplete combustion of carbon-containing materials" · "an insufficient amount of oxygen in the air (sealed room, inadequate ventilation, blocked air intake, etc.)" · "Colorless, odorless, tasteless, and non-irritating, carbon monoxide (CO) is an imperceptible toxic gas."
3. **Gas doméstico y carbón; pasa del pulmón al glóbulo rojo; hemoglobina 245 veces; quita el lugar al oxígeno; más de 5 horas para sacar la mitad** — UK Health Security Agency. "Carbon monoxide: toxicological overview" (actualizado 24 may 2022). https://www.gov.uk/government/publications/carbon-monoxide-properties-incident-management-and-toxicology/carbon-monoxide-toxicological-overview
   > "It is formed following the incomplete combustion of carbonaceous fuels and materials such as diesel oils, petroleum products, domestic gas or solid fuels including charcoal" · "Carbon monoxide diffuses rapidly across the alveolar and capillary membranes of the lungs, into the blood (1). Once absorbed, it diffuses through the plasma and enters the red blood cells, where approximately 80 to 90% binds with haemoglobin, to form carboxyhaemoglobin." · "The affinity of haemoglobin for carbon monoxide is 245-fold higher than that for oxygen (7). Therefore, haemoglobin will preferentially bind carbon monoxide over oxygen following an exposure. This decreases the oxygen carrying capacity of the blood" · "As exposure to a constant concentration of carbon monoxide continues, the blood carboxyhaemoglobin concentration increases" · "The half-time elimination of carbon monoxide is 320 minutes when breathing air, 80 minutes when breathing 100% oxygen" (320 min = 5 h 20 min).
4. **"Más de 200 veces" (segunda fuente)** — Revisión: "Factors Contributing to CO Uptake and Elimination in the Body: A Critical Review." *Int J Environ Res Public Health* 17(2):528 (2020). PMC7014120. https://pmc.ncbi.nlm.nih.gov/articles/PMC7014120/
   > "the affinity of haemoglobin for CO is around 210 times greater than that for oxygen" · "Exogenous carbon monoxide (CO) results from the incomplete combustion of carbon-containing molecules"
5. **Estudio: Chicago, 1987, 37 personas con dolor de cabeza en urgencias en invierno; 7 con mucho CO; nadie lo sospechó** — Heckerling P.S. "Occult carbon monoxide poisoning: a cause of winter headache." *Am J Emerg Med* 5(3):201–4 (1987). PMID 3580051 · DOI 10.1016/0735-6757(87)90320-2. Afiliación (OpenAlex/Crossref): University of Illinois at Chicago y Rush-Presbyterian-St. Luke's Medical Center, Chicago.
   > "We investigated 37 patients presenting to an emergency department during the winter-heating season with a complaint of headache for evidence of CO exposure. Seven of the 37 patients (18.9%) had COHb levels in excess of 10%, with a mean of 14.0%. Three of these seven patients (42.9%) used gas space heaters or kitchen stoves to heat their homes, and three (42.9%) had cohabitants at home with headache." · "In none of these patients had the diagnosis of CO poisoning been suspected by the emergency department physician or the patient prior to obtaining the result of the COHb level."
6. **"Si a todos en casa les duele la cabeza"** — Heckerling P.S., Leikin J.B., Maturen A. "Occult carbon monoxide poisoning: validation of a prediction model." *Am J Med* 84(2):251–6 (1988). PMID 3407653. University of Illinois, Chicago.
   > "the presence of similarly affected cohabitants was the most reliable marker for a carbon monoxide-mediated illness."
7. **Qué hacer: salir al aire libre y pedir ayuda** — NHS (Reino Unido). "Carbon monoxide poisoning". https://www.nhs.uk/conditions/carbon-monoxide-poisoning/
   > "Stop using any appliance you think is producing carbon monoxide, if you can." · "Go outside." · "Get medical advice as soon as possible, and don't go back into the building until you have it." · Síntomas que "may get worse in an affected room or building, then improve when you leave or go outside."

## Notas
- El dibujo es esquemático (la hemoglobina con 4 "asientos", el candado, las moléculas como bolitas, los monitos).
- "Más de 200 veces": las fuentes dan entre unas 210 (revisión 2020) y 245 veces (UKHSA 2022); la voz dice "más de 200" para cubrir ambas.
- "Mucho monóxido en la sangre" = carboxihemoglobina mayor de 10 % (media de 14 %); lo normal en no fumadores es 1–2 % (UKHSA). En pantalla va el chip "más del 10 %".
- El estudio de 1987 es viejo y la voz dice el año; es un estudio chico (37 pacientes) en un solo hospital de Chicago. En la descripción se aclara.
- "Tarda horas en sacar apenas la mitad" (pantalla "≈ 4–5 h"): vida media con aire normal de 320 min según UKHSA y de unas 4 h según la revisión de 2020; con oxígeno al 100 % baja a 80 min: por eso en el hospital dan oxígeno (va en la descripción, no es consejo casero).
- En México el número de emergencias es el 911. Para la descripción: en temporada de frío la Secretaría de Salud reporta cada año muertes por intoxicación con monóxido (anafres, calentadores); no se pone cifra porque no se pudo abrir el boletín federal original.
- Diferencia con el #11: el gas LP no huele y por eso le agregan olor; el monóxido es otro gas que sale de quemar mal (el anafre, el boiler o cualquier aparato que arde sin suficiente oxígeno).
