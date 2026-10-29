# Shot Químico #52 · Ese hielo no es agua apretada: es agua con huecos (por qué flota el hielo)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #52 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el hielo flotando en tu vaso → las moléculas y sus hexágonos con huecos → el lago con peces abajo → el mismo vaso, ahora con los hexágonos dibujados dentro del hielo) + toque de N5 "El experimento" (Galileo, Florencia, 1612).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Ese hielo de tu vaso no es agua apretada por el frío: es agua inflada, con huecos por dentro."
- **Distinto de** #18 (helado y sal: bajar el punto de congelación) y #24 (hielo seco: CO₂ sólido que sublima). Aquí el tema es la densidad del hielo de agua y su estructura.
- **Seguridad:** no se invita a hacer nada; el agua pesada solo se menciona como dato (no se sugiere conseguirla).
- **Duración:** voz 951 caracteres / 176 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados (`estimar-escenas.mjs`).
- **Estado:** guion escrito (fase 1); falta verificación independiente, tabla "Robert en pantalla" y animación.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese hielo de tu vaso no es agua apretada por el frío: es agua inflada, con huecos por dentro. | Fondo cian. Desde el cuadro 0 un cubo de hielo cae en un vaso de agua (salpicadura), se hunde un poco y **rebota hacia arriba** hasta quedar flotando con una puntita fuera. Chip "¿agua apretada?" se tacha → "agua con huecos". Barra de escala "1 cm". |
| 1 | Raro | Casi todo líquido, al volverse sólido, se vuelve más denso. El agua hace lo contrario. | Dos vasitos lado a lado: "casi todos los líquidos" (genérico, sin nombrar sustancia) con su sólido **hundido** al fondo y el agua con su hielo **arriba**. Flecha ↓ "casi todos" y flecha ↑ "agua". |
| 2 | Liquido | En el agua líquida, las moléculas se jalan con puentes de hidrógeno que se rompen y se forman sin parar. | `Lupa` en rayos X sobre el agua del vaso → fondo noche: moléculas H₂O (O rojo, dos H blancos, forma de "V") apretadas y revueltas; líneas punteadas (puentes de hidrógeno) que **parpadean**: aparecen y se rompen. Escala "≈ 0.3 nm". |
| 3 | Hexagonos | Al congelarse, esos puentes se quedan fijos: arman hexágonos con un hueco en medio. | Termómetro baja a 0 °C; las moléculas se frenan y se **enganchan** en una red de hexágonos (tipo panal); el centro de cada hexágono se ilumina como "hueco". |
| 4 | Numero | Por eso la misma agua, hecha hielo, ocupa como 9 por ciento más espacio, y flota. | Un mismo número de moléculas: bloque líquido (caja chica) vs. bloque de hielo (caja más alta) con medidor "+9 %". Chips de densidad: "agua 0 °C · 0.9998 g/cm³" y "hielo 0 °C · 0.917 g/cm³". |
| 5 | Pregunta | ¿Y qué pasaría si el hielo se hundiera? | **Re-gancho.** Zoom out al vaso; el hielo baja al fondo con un "?" gigante (escena hipotética, marcada "¿y si…?"). |
| 6 | Lago | Los lagos se congelarían enteros. Pero el hielo se queda arriba, y debajo los peces pasan el invierno en agua líquida. | Corte de un lago (macro): versión "¿y si…?" completamente blanca (tachada) → versión real: capa de hielo arriba, agua azul debajo, termómetro "≈ 4 °C abajo" y peces nadando lento. |
| 7 | Galileo | En 1612, en Florencia, Galileo publicó su respuesta a quienes decían que el hielo flota por ser plano: empújalo al fondo y sube solo. | Tarjeta "1612 · Galileo · Florencia · *Discorso intorno alle cose che stanno in su l'acqua*". Un sabio con una placa de hielo plana ("flota por plano") ✗; una mano empuja la placa ancha hasta el fondo de una tina y al soltarla **sube sola** ✓. |
| 8 | Tuberias | Y esa misma hinchazón revienta tuberías cuando se congelan. | Tubo de agua en invierno; adentro crecen hexágonos; el tubo se abomba y **truena** con grieta y chorrito. |
| 9 | Curioso | Lo curioso: el hielo de agua pesada, con hidrógenos más pesados, sí se hunde en agua normal. | Dos cubos: uno normal flota; otro verde "D₂O" (los H dibujados más gordos, "D") **se va al fondo**. Chip "agua pesada · deuterio". |
| 10 | Cierre | Así que ese hielo no es agua apretada: es agua llena de huecos. | **Regreso al vaso del inicio**: el mismo hielo flotando, ahora con la red de hexágonos dibujada adentro (rayos X) y la etiqueta "hielo = agua con huecos". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave y fría, continua, debajo de la voz; efectos en el mismo cuadro (cubo que cae y salpica, "clic" de cada puente que se forma y se rompe, cristalitos al armarse los hexágonos, "pop" del hielo que sube, crujido del lago, golpe de la tarjeta, tubo que truena, "plop" grave del cubo que se hunde).

## Fuentes (abiertas el 29 oct 2026)

1. **Casi todos los líquidos se vuelven más densos al solidificarse; el agua no; puentes de hidrógeno que se rompen y se forman; hexágonos con huecos; densidades; lagos y peces; tuberías** — CK-12 Foundation, "15.2: Structure of Ice", *Introductory Chemistry (CK-12)*, Chemistry LibreTexts (página modificada el 21 mar 2025). https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introductory_Chemistry_(CK-12)/15:_Water/15.02:_Structure_of_Ice
   > "The hydrogen bonds in liquid water constantly break and reform as the water molecules tumble past one another."
   > "The density of any liquid increases as its temperature decreases. For most liquids, this continues as the liquid freezes; the solid state is denser than the liquid state. However, water behaves differently. It actually reaches its highest density at about 4 °C."
   > Tabla 1: "4 1.0000 · 0 (liquid) 0.9998 · 0 (solid) 0.9168" (g/cm³).
   > "the hydrogen bonds begin to form a network characterized by a generally hexagonal structure with open spaces in the middle of the hexagons" · "In ice (right), the hydrogen bonds become permanent, resulting in an interconnected hexagonally-shaped framework of molecules."
   > "If the ice were to sink as it froze, entire lakes would freeze solid. Since the ice does not sink, liquid water remains under the ice all winter long. This is important, as fish and other organisms are capable of surviving through winter." · "Ice is one of few solids that is less dense than its liquid form."
   > "roads can buckle, houses can be damaged, water pipes can burst. All of this happens because of a unique property of water: when water freezes, it expands in volume as ice is formed."
   - **Cálculo del "9 por ciento más espacio":** 0.9998 / 0.9168 = 1.0905 → ≈ 9 % más volumen para la misma masa (dato de la tabla, valores clásicos).
2. **≈ 9 % y el hielo ≈ 90 % de la densidad del agua** — USGS Water Science School, "Water Density" (consultada 2026). https://www.usgs.gov/water-science-school/science/water-density
   > "Upon freezing, the density of ice decreases by about 9 percent." · "The density of ice is about 90 percent that of water, but that can vary because ice can contain air." · "Ice is less dense than liquid water which is why your ice cubes float in your glass."
   > Densidad máxima del agua: "0.9998395 g/ml at 4.0° Celsius (39.2° Fahrenheit)".
3. **Densidad en kg/m³ y agua pesada: el hielo de D₂O se hunde en agua normal; el deuterio pesa ≈ el doble que el H** — Maitra U., Zare R.N. "Fall and Rise of a D₂O Ice Cube in Liquid H₂O." *Resonance* (Indian Academy of Sciences), mayo 2016, pp. 453–455. (Indian Institute of Science, Bengaluru · Stanford University.)
   > "the density of liquid H2O at 0 °C is measured to be 999.9 kg m–3 whereas the density of solid H2O at 0 °C … is 915.0 kg m–3. Consequently, ice floats on water"
   > "while H2O ice floats in water, D2O ice sinks in water, proving the higher density of 'heavy water'." · "D has approximately twice the weight as H." · "The actual density [1] of D2O ice is 1017.5 kg m–3 at about 3.8 °C" · "when heavy water ice cubes are put into a beaker containing normal water at room temperature, the heavy water ice cubes sink right to the bottom of the container."
4. **Galileo, 1611–1612: el hielo es agua "rarificada", no condensada; flota sin importar su forma; un hielo ancho empujado al fondo regresa arriba** — Galilei G. *Discorso intorno alle cose che stanno in su l'acqua* (Florencia, 1612); trad. inglesa de T. Salusbury (1663), Project Gutenberg #37729. https://gutenberg.org/files/37729/37729-h/37729-h.htm
   > "the Ice should be rather Water rarified than condensed … and Water in freezing, encreaseth in Masse, and the Ice made thereby is lighter than the Water on which it swimmeth."
   > "It was answered me, that that proceeded not from the greater Levity, but from the Figure, large and flat … I replied, that any piece of Ice, of whatsoever Figure, swims upon the Water … and added, that it was a manifest proofe hereof to see a piece of Ice of very broad Figure being thrust to the botome of the Water, suddenly return to flote atoppe"
   - **Lugar y año:** Museo Galileo (IMSS), biografía de Lodovico delle Colombe: "On his return from a trip to Rome in 1611, Galileo got involved in a discussion with two Pisan scholars … concerning the buoyancy of ice in water" y "Discorso intorno alle cose che stanno in su l' acqua o che in quella si muovono (Florence, 1612)". https://brunelleschi.imss.fi.it/itineraries/biography/LodovicoColombe.html
   - Linda Hall Library, "Lodovico delle Colombe": "The big clash came in 1612, when Galileo published a treatise on floating bodies" · "maintaining that ice must be less dense than water, since it floats on water." · "Colombe published a book arguing that shape rather than density is the key."

## Notas
- El dibujo es esquemático: moléculas en "V", puentes como líneas punteadas, el panal de hexágonos simplificado a 2D (en 3D la red del hielo común es hexagonal con cada molécula unida a vecinas en forma de tetraedro).
- "Como 9 por ciento más espacio" sale de la tabla de densidades (0.9998 → 0.9168 g/cm³); USGS dice "about 9 percent". En pantalla: 0.917 g/cm³ (hielo) vs 0.9998 g/cm³ (agua a 0 °C); el agua más densa (≈ 1.000 g/cm³) está a ≈ 4 °C, que es la que queda en el fondo del lago (dato para pantalla y descripción).
- Galileo: la discusión fue en el verano de 1611 y la respuesta se publicó en Florencia en 1612; por eso la voz dice "publicó su respuesta". "Empújalo al fondo y sube solo" resume su argumento ("a piece of Ice of very broad Figure being thrust to the botome … suddenly return to flote atoppe"); no se afirma que lo hiciera en público.
- La escena "¿y si el hielo se hundiera?" es hipotética y se marca así en pantalla.
- Agua pesada: el D₂O es un compuesto de laboratorio; no se invita a conseguirlo. El dato de USGS de "10.6 percent denser" se refiere en realidad al agua pesada líquida, no al hielo (Maitra y Zare dan 1017.5 kg/m³ para el hielo de D₂O); por eso la voz no da porcentaje.
- No repite el #18 (sal y punto de congelación) ni el #24 (hielo seco).
