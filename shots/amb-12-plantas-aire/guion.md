# Shot Ambiental #12 · Tu planta no limpia el aire de tu casa (harían falta de 10 a 1,000 por m²)

- **Serie:** Shot Ambiental · **Logo:** química (matraz: contaminantes del aire, benceno y formaldehído) · **Badge:** #12 · rama `pedido300/amb`.
- **Formato:** N5 "El experimento" (se recrea la caja sellada de la NASA con cronómetro de 24 h y se compara con tu sala) + N2 "El número" (de 10 a 1,000 plantas por m²; mito tachado; qué sí sirve). Cierre que regresa a la planta del inicio, ahora junto a una ventana abierta.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre la planta en pantalla, con tono de mito (#6): "Esa planta no es un purificador de aire: para igualar la ventilación normal, harían falta hasta mil por metro cuadrado."
- **Duración:** voz 955 caracteres en 10 líneas ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → objetivo **61.5 s** en la base.
- **Cuentas:**
  - Cámaras de la NASA (1989): pequeñas 0.76 × 0.76 × 0.76 m = **0.44 m³**; grandes 0.76 × 0.76 × 1.53 m = **0.88 m³**; las de benceno/TCE, 0.868 y 0.694 m³ → todas **menos de un metro cúbico**.
  - CADR mediana de una planta: 0.023 m³/h = **23 litros de aire por hora**.
  - Ejemplo para la escena "Sala" (solo visual, no se narra): sala de 4 × 4 m y 2.5 m de alto = 40 m³; con ~1 renovación por hora entran ~40 m³/h = 40,000 L/h → 40,000 ÷ 23 ≈ **1,740 plantas** ≈ 109 por m² (dentro del rango 10–1,000 del estudio).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa planta no es un purificador de aire: para igualar la ventilación normal, harían falta hasta mil por metro cuadrado. | Cuadro 0: una planta en maceta en una sala (fondo menta); sobre ella un chip "purificador de aire" que se tacha. Un cuadro de 1 m² en el piso se llena de macetitas a toda velocidad: contador "hasta 1,000 / m²". |
| 1 | Mito | El mito viene de un experimento de la NASA de 1989, pensado para bases espaciales selladas. | `MitoTachado` "las plantas limpian tu casa". Tarjeta "NASA · 1989 · Stennis Space Center" y una base espacial esquemática cerrada. |
| 2 | Caja | Metían una planta en una caja sellada de menos de un metro cúbico, con benceno o formaldehído, por veinticuatro horas. | La cámara de acrílico (cubo transparente con tornillos y mariposas en la tapa, foco de cultivo alrededor); una jeringa inyecta un gas; `Cronometro` 0 → 24 h. Etiqueta "0.76 m" en las aristas; chip "< 1 m³". |
| 3 | Pregunta | Y en la cajita el químico bajaba. ¿Por qué no pasa en tu sala? | **Re-gancho.** Medidor del químico dentro de la caja que baja. Luego "?" gigante; la caja se aleja y aparece la sala. Robert grande. |
| 4 | Sala | Porque tu casa no está sellada: el aire de afuera se cuela por puertas, ventanas y rendijas. | Corte transversal de una sala con flechas de aire entrando por la puerta, la ventana y rendijas (esquema). |
| 5 | Estudio | En 2019, en la Universidad Drexel, en Filadelfia, revisaron doce estudios con ciento noventa y seis resultados. | `TarjetaEstudio`: "Cummings y Waring · Drexel University, Filadelfia · 2019" con 12 hojitas de estudio y un contador que sube a 196. |
| 6 | Litros | La planta típica limpiaba lo equivalente a veintitrés litros de aire por hora. | Una planta con una burbuja de "23 L/h" (unas cuantas cubetitas de aire limpio) junto a la flecha gigante de aire que entra por la ventana. |
| 7 | Cuenta | Para igualar al aire que entra solo, harían falta de diez a mil plantas por metro cuadrado de piso. | **Ahí sale el número del principio:** la sala se llena de macetas en el piso; chip "10 a 1,000 plantas por m²"; ejemplo "sala de 4 × 4 m: ~1,700 plantas". |
| 8 | Sirve | Lo que sí sirve: quitar lo que contamina, abrir ventanas y prender la campana si saca el aire a la calle. | Tres chips con palomita: "quitar la fuente", "abrir ventanas", "campana de la cocina con salida afuera". La ventana se abre y la campana jala humo hacia afuera. |
| 9 | Cierre | Así que quiere a tu planta porque es bonita; pero para el aire, abre la ventana. | **Regreso a la planta del inicio**, ahora junto a la ventana abierta y con la cortina moviéndose. Chip "bonita: sí · purificador: no". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert apuntando a cámara. |

**Música:** cama grave continua (`m.pad`), tapada mientras dura el mito y la caja sellada; se abre (más aire, más agudos) cuando entra la ventana. Efectos: "pop" por cada maceta que aparece (acelerando en el conteo), tachón del chip, jeringa (pfff), tic-tac del cronómetro, bajada del medidor, ráfagas de aire por cada flecha, tic por cada estudio y conteo hasta 196, gotita/"bloop" para los 23 L, ventana que se abre y zumbido de la campana.

## Fuentes (cada cifra abierta en su fuente el 29 oct 2026)

1. **Cummings, B. E. y Waring, M. S. "Potted plants do not improve indoor air quality: a review and analysis of reported VOC removal efficiencies".** *Journal of Exposure Science & Environmental Epidemiology* 30, 253–261 (2020). Publicado en línea el 6 nov 2019. https://www.nature.com/articles/s41370-019-0175-9 (dato de 2019)
   > "Potted plants have demonstrated abilities to remove airborne volatile organic compounds (VOC) in small, sealed chambers over timescales of many hours or days."
   > "To assess potential impacts, 12 published studies of chamber experiments were reviewed, and 196 experimental results were translated into clean air delivery rates (CADR, m3/h)"
   > "The distribution of single-plant CADR spanned orders of magnitude, with a median of 0.023 m3/h, necessitating the placement of 10–1000 plants/m2 of a building's floor space for the combined VOC-removing ability by potted plants to achieve the same removal rate that outdoor-to-indoor air exchange already provides in typical buildings (~1 h−1)."
   > "Published: 06 November 2019 … Issue date: 01 March 2020"
   > Afiliación: "Department of Civil, Architectural and Environmental Engineering, Drexel University, 3141 Chestnut, St. Philadelphia, PA, 19104, USA"
2. **Wolverton, B. C., Johnson, A. y Bounds, K. "Interior Landscape Plants for Indoor Air Pollution Abatement".** NASA-TM-101766, John C. Stennis Space Center. Final report, 15 sep 1989. https://ntrs.nasa.gov/citations/19930073077 (PDF: https://ntrs.nasa.gov/api/citations/19930073077/downloads/19930073077.pdf) (dato de 1989)
   > "FINAL REPORT--SEPTEMBER 15, 1989"
   > "Another promising approach to further reducing trace levels of air pollutants inside future space habitats is the use of higher plants and their associated soil microorganisms."
   > "Chemical contamination tests were conducted in four Plexiglas chambers … Two chambers measuring 0.76 0.76 0.76 … Two larger chambers measuring 0.76 0.76 1.53" ("Each dimension is given in meters (m)")
   > "Bolts and wing-nuts ensured complete sealing of the lids and created airtight chambers for testing."
   > "All tests were conducted for a period of 24 h."
   > "two chambers of similar size were used, having volumes of 0.868 and 0.694 m3"
   > Tablas: "Trichloroethylene (TCE) Removed from a Sealed Experimental Chamber…", "Benzene Removed from a Sealed Experimental Chamber…", "Formaldehyde Removed from a Sealed Experimental Chamber…"
   > (El reporte también menciona usos en la Tierra: "If man is to move into closed environments, on Earth or in space, he must take along nature's life support system." Por eso la voz dice "pensado para bases espaciales selladas" y no "solo para el espacio".)
3. **EPA (Agencia de Protección Ambiental de EE. UU.), "Improving Indoor Air Quality"** (última actualización: 3 ago 2026). https://www.epa.gov/indoor-air-quality-iaq/improving-indoor-air-quality
   > "Usually the most effective way to improve indoor air quality is to eliminate individual sources of pollution or to reduce their emissions."
   > "Opening windows and doors, operating window or attic fans, when the weather permits, or running a window air conditioner with the vent control open increases the outdoor ventilation rate. Local bathroom or kitchen fans that exhaust outdoors remove contaminants directly from the room where the fan is located and also increase the outdoor air ventilation rate."
   > "infiltration, a process by which outdoor air flows into the house through openings, joints and cracks in walls, floors and ceilings, and around windows and doors. Infiltration occurs in all homes to some extent."
   > "There is currently no evidence, however, that a reasonable number of houseplants remove significant quantities of pollutants in homes and offices."

## Notas
- "Ventilación normal" = el intercambio de aire exterior-interior de un edificio típico (~1 renovación por hora), como lo define el estudio de Drexel.
- "Limpiaba lo equivalente a 23 litros por hora" = la CADR mediana por planta (0.023 m³/h); es la mediana de 196 resultados, que variaron en órdenes de magnitud.
- "Benceno o formaldehído": la NASA probó benceno, tricloroetileno y formaldehído; se nombran solo dos para no alargar la voz.
- La base espacial, la sala, las flechas de aire y la cantidad de macetas son esquemáticas. La cámara sí se dibuja con sus proporciones reales (cubo de 0.76 m o prisma de 0.76 × 0.76 × 1.53 m).
- No se dice que las plantas "no sirven para nada": el estudio sugiere investigar sus beneficios de bienestar ("biophilic productivity and well-being benefits"). El cierre lo respeta ("quiere a tu planta porque es bonita").
