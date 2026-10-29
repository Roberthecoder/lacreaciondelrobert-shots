# Shot Químico #24 · Ese humo no es humo (hielo seco y sublimación)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #24 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el vaso VACÍO, sin agua, con hielo seco echando "humo" → las moléculas de CO₂ escapando y el vapor de agua del aire haciéndose gotitas → el mismo vaso, ahora con etiquetas) + toque de N6/mito peligroso (¿es inofensivo? → caso real de CDC 2004 y el frasco de Thilorier, 1835).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Ese humo no es humo: es el agua de tu propio aire, hecha nube por el frío del hielo seco."
- **Seguridad:** no se invita a hacer ningún experimento. Se dice claro: nunca en frasco cerrado, nunca con la mano sin guantes, y que en un lugar cerrado el gas desplaza el oxígeno.
- **Duración:** voz 958 caracteres / ≈ 190 palabras (≈ 58.3 s según `estimar-escenas.mjs`) + cierre 3.5 s → **≈ 61.8 s**.
- **Estado:** guion verificado (`verificacion.md`, VEREDICTO: APROBADO), animación lista (`hieloseco.jsx`, base sin voz 61.8 s), voz pendiente de aprobación de Robert (~958 créditos).

## Versión narrada

Tiempos aproximados de `node motor/kit/estimar-escenas.mjs shots/qui-24-hielo-seco --outro 3.5`.

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho (0–5.4 s) | Ese humo no es humo: es el agua de tu propio aire, hecha nube por el frío del hielo seco. | Fondo menta. Desde el cuadro 0 unas pinzas dejan caer trozos blancos en un vaso de vidrio **vacío (sin agua)**: ¡tac! y del vaso sale una niebla blanca que rebosa y cae por el borde (exagerada a propósito: el dibujo es esquemático). Chip "¿humo?" que se tacha. Barra de escala "5 cm". |
| 1 | Que (5.4–10 s) | El hielo seco es dióxido de carbono sólido, a 78 grados y medio bajo cero. | Zoom al trozo blanco: etiqueta "CO₂ sólido". Termómetro que baja de golpe hasta "−78.5 °C" con escarcha en el vidrio. |
| 2 | Sublima (10–14.3 s) | No se derrite: pasa directo de sólido a gas. Eso se llama sublimación. | Fondo noche (micro). Red ordenada de moléculas CO₂ (bolita negra con dos rojas) en la superficie del cristal; de una en una se sueltan y salen volando. Flecha "sólido → gas" que se salta el "líquido" (tachado). Barra de escala "1 nm". |
| 3 | Invisible (14.3–17.1 s) | Y ese gas no se ve: no tiene color ni olor. | Las moléculas que escapan se vuelven transparentes (solo contorno punteado); chips "sin color" · "sin olor". |
| 4 | Nube (17.1–23.6 s) | Lo blanco es el vapor de agua del aire, que con tanto frío se condensa en gotitas diminutas, como la niebla. | Moléculas de agua (H₂O, azul) vagan sueltas en el aire tibio; al rozar el CO₂ helado se frenan, se juntan y forman gotitas que brillan en blanco. La cámara se aleja: miles de gotitas = la nube blanca. |
| 5 | Pregunta (23.6–25.3 s) | ¿Entonces es inofensivo? | **Re-gancho.** Regreso al vaso vacío con la niebla; "?" gigante. |
| 6 | Riesgo (25.3–32.7 s) | No. Casi medio kilo suelta unos 250 litros de gas, que en un lugar cerrado desplaza el oxígeno; y en la piel quema por frío. | Un trozo en una báscula "≈ 0.45 kg" → se infla un globo transparente con contador "250 L". Cuarto cerrado: las bolitas O₂ (rojas) son empujadas hacia arriba y afuera por CO₂ que se junta abajo. Luego una mano sin guante con ✗ y escarcha. |
| 7 | Estudio (32.7–42.9 s) | En 2004, en Alabama, un hombre llevó 45 kilos de hielo seco en su camioneta cerrada, con el aire recirculando, y terminó desmayado. Despertó cuando su esposa abrió la puerta. | `TarjetaEstudio` "2004 · Mobile, Alabama · CDC (MMWR)". Camioneta pickup con ventanas cerradas, 4 bolsas de papel en el asiento, flechas de aire que dan vueltas dentro de la cabina; medidor "O₂" que baja. Se estaciona; la puerta se abre, entra aire (flechas hacia adentro) y el medidor sube. |
| 8 | Thilorier (42.9–49.7 s) | Lo curioso: en 1835, en París, Thilorier encerró un poquito en un frasco bien tapado, y el tapón salió disparado. | Tarjeta "1835 · París · Thilorier · Academia de Ciencias". Frasquito con nieve blanca adentro y "vapor espeso"; el tapón tiembla y sale volando (¡pum!). |
| 9 | Regla (49.7–53.7 s) | Por eso nunca va en un frasco cerrado, ni en tu mano sin guantes. | Dos íconos con ✗ grande: frasco con tapa de rosca · mano sin guante. Junto, con ✓: hielera de unicel sin cerrar y guante grueso/pinzas. |
| 10 | Cierre (53.7–58.3 s) | Así que ese humo no es humo: es tu aire, hecho nube por un gas que no ves. | **Regreso al vaso vacío del inicio**: la misma niebla cayendo por el borde, ahora con etiquetas "gotitas de agua del aire (lo blanco)" y "CO₂ invisible (lo que no ves)". |
| — | Outro (58.3–61.8 s) | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave y fría, continua, debajo de la voz; efectos en el mismo cuadro: "tac" del hielo seco al caer en el vaso vacío, siseo suave de la sublimación, "tic" de cada gotita que se forma, inflado del globo, motor de la camioneta y puerta que se abre (aire que entra), el "¡pum!" del tapón en 1835, y un silencio breve antes de la frase final.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Entonces es inofensivo?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «Ese humo no es humo» |
| 2 | 6.4 | 9.7 | 13_senalando_arriba | `izq-alto` | «a 78 grados y medio bajo cero» |
| 3 | 14.5 | 18.1 | 06_pensativo_menton | `arriba-der` | «ese gas no se ve» |
| 4 | 20.1 | 23.4 | 04_bajando_lentes | `izq-alto` | «se condensa en gotitas diminutas» |
| 5 | 23.65 | 26.5 | 07_pensativo_puno | `grande` | «¿Entonces es inofensivo?» |
| 6 | 28.3 | 32.4 | 10_serio_molesto | `arriba-der` | «desplaza el oxígeno… quema por frío» |
| 7 | 36.2 | 42.6 | 11_sorprendido | `izq-alto` | «terminó desmayado… despertó» |
| 8 | 43.9 | 49.4 | 13_senalando_arriba | `arriba-der` | «el tapón salió disparado» |
| 9 | 50.0 | 53.4 | 10_serio_molesto | `izq-alto` | «nunca va en un frasco cerrado» |
| 10 | 54.0 | 58.2 | 02_apuntando_camara | `arriba-der` | «es tu aire, hecho nube» |
| — | 58.3 | 61.8 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 41 s en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato y cifra se abrió en la fuente original el 29 oct 2026)

1. **−78.5 °C; sublimación (de sólido a gas sin pasar por líquido); gas sin color ni olor que desplaza el oxígeno; caso de Alabama 2004 (100 lb ≈ 45 kg, 4 bolsas, camioneta cerrada, aire recirculando, se desmayó, despertó al abrir la puerta)** — Mobile County Health Dept., Alabama Dept. of Public Health y CDC/NCEH. "Acute Illness from Dry Ice Exposure During Hurricane Ivan — Alabama, 2004." *MMWR* 53(50) (24 dic 2004). https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5350a6.htm · PDF: https://stacks.cdc.gov/view/cdc/183154/cdc_183154_DS1.pdf
   > "Dry ice has a temperature of -109.3ºF (-78.5ºC)" · "As dry ice melts, it undergoes sublimation (i.e., direct conversion from a solid into gaseous CO2, bypassing the liquid state)." · "CO2 is a colorless, odorless gas and a simple asphyxiant that displaces oxygen when inhaled." · "In September 2004 … a man aged 34 years in Mobile, Alabama, purchased a 100-lb block of dry ice … divided into four equal parts and packaged in brown paper bags, which were placed in the front seat of the man's pickup truck. The windows were closed, and the air conditioner was set to recirculate air inside the cab of the truck." · "He then pulled his truck into a parking lot, parked, and lost consciousness. … immediately after she opened the door to the vehicle, her husband began to awaken." · "he recovered completely."
2. **1 libra (≈ 0.45 kg) → 250 litros de gas; desplaza el oxígeno en lugares cerrados; quemaduras por frío; frasco cerrado puede explotar; nunca con la mano sin guantes; unicel sí** — University of Washington, Environmental Health & Safety. "Work Safely with Dry Ice" (hoja informativa, oct 2026). https://www.ehs.washington.edu/system/files/resources/dryice.pdf
   > "skin contact with dry ice is can lead to severe frostbite" · "releases potentially substantial volumes of CO2 (1 pound solid = 250 liters gas), which can displace oxygen quickly in the air around the dry ice, causing difficulty breathing, loss of consciousness and death. This is especially of concern in non- ventilated or confined spaces." · "any dry ice that is stored in a closed container can pressurize the container. Given enough time at normal room temperature, such a container may explode" · "Never store dry ice in a tightly sealed container, such as a plastic or glass bottle, or any container with a screw-top lid that will not vent. Styrofoam is an appropriate storage material since it is both insulated and not airtight." · "Never handle dry ice with bare hands."
3. **La niebla es vapor de agua del aire que se condensa en gotitas; el CO₂ frío es más pesado que el aire y la niebla cae** — Rutgers University, Dept. of Chemistry, demostración "Fog Formation" (1029). https://chem.rutgers.edu/cldf-demos/1029-cldf-demo-fog-formation
   > "Fog forms when water vapor in the air condenses into tiny suspended droplets." · "This condensation occurs when warm, humid air is cooled." · "This warm air is cooled by mixing it with the cold carbon dioxide gas that sublimes from dry ice." · "Solid CO2, dry ice, has a temperature of -78.5 °C and can cause frostbite." · "density of a heavier than air gas"
   — Apoyo: James Madison University, Chemistry Demos (sublimación): > "The "fog" that we see is condensed water vapor though, not carbon dioxide gas." https://sites.lib.jmu.edu/chemdemos/category/demo-database/sublimation
4. **1835, París: Thilorier solidifica el CO₂ y el tapón del frasco sale disparado** — Thilorier, carta leída en la sesión del lunes 12 de octubre de 1835 de la Académie des sciences (París). "Solidification de l'Acide carbonique." *Comptes rendus hebdomadaires des séances de l'Académie des sciences* t. 1, pp. 194–196 (1835). Texto completo: https://archive.org/details/comptesrendusheb01acad
   > "je lui annonce aujourd'hui le fait important pour la science, de la solidification de ce gaz." · "Si l'on introduit quelques décigrammes de cette substance dans un petit flacon, en ayant soin de le boucher hermétiquement, l'intérieur se remplit d'une vapeur épaisse, et le bouchon ne tarde pas à être chassé avec violence." · "M. Arago annonce que les commissaires de l'Académie, MM. Thénard, Dulong et lui-même, ont été témoins de toutes les expériences rapportées par M. Thilorier."
5. **Dato de apoyo (no va en la voz): punto triple del CO₂ a 5.185 bar (por eso a presión normal no existe CO₂ líquido y el sólido pasa directo a gas)** — NIST Chemistry WebBook, SRD 69, "Carbon dioxide", datos de cambio de fase. https://webbook.nist.gov/cgi/cbook.cgi?ID=C124389&Mask=4
   > "Ptriple 5.185 bar" · "Ttriple 216.58 K"

## Notas
- El dibujo es esquemático (moléculas como bolitas, la cabina, el frasco de 1835).
- "Casi medio kilo → 250 litros": la fuente dice 1 libra (0.454 kg) = 250 L de gas; se dice "casi medio kilo" para no redondear hacia arriba.
- "45 kilos" = el bloque de 100 libras del reporte (45.4 kg). La voz no dice "Mobile" para no confundir; la tarjeta en pantalla sí.
- "En París": la carta de Thilorier se leyó en la Académie des sciences de París y los comisarios (Arago, Thénard, Dulong) presenciaron los experimentos. No se dice "el primero" en la voz (Thilorier lo llama "ce premier exemple d'un gaz devenu solide", pero es su propia afirmación).
- **Corrección de la verificación (opción A):** el hielo seco va SIEMPRE en un vaso vacío, sin agua, en todas las escenas; así la niebla sale de la humedad del aire, como dice la voz.
- Lo que la nube es: gotitas de agua del aire (cerca del hielo seco algunas pueden ser cristalitos de hielo; la voz dice "gotitas diminutas, como la niebla", igual que las fuentes).
- Para la descripción: el hombre de Alabama se recuperó por completo; el CDC recomienda guardarlo en poca cantidad, en hielera aislada o en un lugar abierto y ventilado, y llevarlo en la caja de la camioneta, no en la cabina. Si alguien se siente mal cerca de hielo seco: sacarlo al aire fresco y llamar a emergencias.
- Nada de esto invita a experimentar: no se muestra a nadie metiendo hielo seco en bebidas ni en frascos.
