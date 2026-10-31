# Shot Ambiental #41 · El polvo de la ciudad que tus ojos nunca van a ver (PM2.5)

- **Serie:** Shot Ambiental · **Logo:** química (matraz: contaminación del aire) · **Badge:** #41 · rama `pedido300/amb`.
- **Formato:** N1 "Por dentro" (de la calle a la escala de una micra: granito de arena → partícula → pulmón) + N2 "El número" (5 de la OMS contra 20 de la CDMX). Cierre que regresa a la calle del inicio, ahora con el índice Aire y Salud en un celular.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": "En el aire que respiras flotan unas partículas que tus ojos nunca van a ver una por una: las PM dos punto cinco."
- **Enfoque (para no parecerse al #40, humo de leña):** aire de la ciudad, guía OMS 2021 contra el promedio de la CDMX, de dónde salen, contingencia de Año Nuevo, índice Aire y Salud. Para el tamaño se usa el **granito de arena fina** (no el cabello) y no se repite el dato de "pasan a la sangre".
- **Local:** Ciudad de México / Zona Metropolitana (datos oficiales de SEDEMA 2023). El índice Aire y Salud es nacional (NOM-172-SEMARNAT-2019), sirve igual en Guadalajara o Monterrey.
- **Duración:** voz 960 caracteres escritos ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → objetivo **61.5 s** en la base.
- **Cuentas:** arena fina 90 µm ÷ 2.5 µm = 36 partículas de las más grandes en fila (las más chicas caben aún más) → "más de treinta" · 20 ÷ 5 = 4 → "cuatro veces la guía" · guía 2005 (10) → 2021 (5) = "a la mitad".
- **Año de los datos:** el promedio de la CDMX es de 2023 (último informe anual publicado por SEDEMA); la voz dice "En 2023".

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En el aire que respiras flotan unas partículas que tus ojos nunca van a ver una por una: las PM dos punto cinco. | Cuadro 0: calle de ciudad con coches y un rayo de sol; el aire se ve limpio. Una `Lupa` pasa sobre el rayo y adentro aparecen miles de puntitos que flotan. Chip "PM2.5". |
| 1 | Tamano | Miden menos de dos punto cinco micras: más de treinta caben en fila a lo ancho de un granito de arena fina. | Zoom a un grano de arena fina (forma irregular, facetado, "90 µm") y una fila de partículas rojas atravesándolo: contador que sube a 36. `EscalaFija` "10 µm". Etiqueta "esquema". |
| 2 | Origen | Unas salen de obras, calles de tierra y fuego. La mayoría se forma en el aire con gases de coches, fábricas y plantas de luz. | Vuelta a la calle: de una obra, una calle de tierra y una fogata salen partículas directas; de un escape, una chimenea de fábrica y una planta de luz salen gases (nubecitas de colores) que se juntan y se "condensan" en partículas. Chips "directas" / "se forman en el aire". |
| 3 | Pulmon | Por su tamaño se meten muy adentro de tus pulmones, y también afectan a tu corazón. | Silueta de una persona caminando; vista de rayos X (`Lupa interior`): las partículas bajan por la tráquea y los bronquios hasta los alvéolos (fondo oscuro); un corazón late al lado. Etiqueta "esquema". |
| 4 | Pregunta | ¿Cuánto es demasiado? | **Re-gancho.** "?" gigante sobre una báscula de aire vacía; Robert grande. |
| 5 | Guia | En 2021, la OMS bajó su guía a la mitad: en promedio al año, no más de cinco microgramos por metro cúbico. | Un cubo de 1 m³ de aire con un medidor; la marca "OMS 2005: 10" baja a "OMS 2021: 5 µg/m³". Chip "promedio anual". |
| 6 | Ciudad | En 2023, la red de monitoreo de la Ciudad de México midió un promedio de veinte. Cuatro veces la guía. | Silueta de la CDMX con estaciones de monitoreo (puntitos). El medidor del cubo sube a "20 µg/m³" y aparecen 4 cubos de "5" apilados. Chip "SEDEMA · promedio 2023". |
| 7 | AnoNuevo | Y el día con más partículas fue el primero de enero: contingencia por cohetes y fogatas de Año Nuevo. | Noche con cohetes y fogatas; el medidor se dispara. Chip "1 ene 2023 · contingencia por PM2.5". |
| 8 | Sirve | ¿Qué sí sirve? Revisar el índice Aire y Salud. En contingencia, cierra ventanas y no hagas ejercicio afuera. | Un celular con la escala de colores del índice Aire y Salud (Buena → Extremadamente mala); luego una ventana que se cierra y unos tenis que se quedan adentro. |
| 9 | Cierre | Una por una no las vas a ver nunca, pero con un número en tu celular ya sabes cuándo están ahí. | **Regreso a la calle del inicio**, ahora con el celular en primer plano marcando el color del día. La `Lupa` vuelve a mostrar los puntitos en el rayo de sol. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert apuntando a cámara. |

**Música:** cama grave continua, algo "tapada" mientras se acumulan partículas (Guia → Ciudad → AnoNuevo) y más abierta en "Qué sí sirve". Efectos: brillitos al pasar la lupa, un tic por cada partícula que entra en la arena (36), motor y obra, el siseo de los gases, respiración y latido del corazón, la marca que baja de 10 a 5, golpes al apilar los 4 cubos, cohetes, el clic de la ventana.

## Robert en pantalla

Tiempos de la base (OM_SCENES = 61.5 s; con la voz real se recorren solos). Grande en «¿Cuánto es demasiado?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «partículas que tus ojos nunca van a ver» (cuadro 0) |
| 2 | 9.1 | 12.8 | 13_senalando_arriba | `arriba-der` | señala la fila: «más de treinta caben en fila» |
| 3 | 16.5 | 19.8 | 04_bajando_lentes | `izq-alto` | «la mayoría se forma en el aire» |
| 4 | 25.45 | 28.6 | 07_pensativo_puno | `grande` | «¿Cuánto es demasiado?» (grande) |
| 5 | 36.2 | 39.6 | 10_serio_molesto | `arriba-der` | «cuatro veces la guía» |
| 6 | 42.4 | 45.7 | 12_perfil_serio | `izq-alto` | «contingencia por cohetes y fogatas» |
| 7 | 47.3 | 50.3 | 05_sonriendo_dientes_uniformes | `arriba-der` | «¿Qué sí sirve? Revisar el índice Aire y Salud» |
| 8 | 53.3 | 57.9 | 06_pensativo_menton | `arriba-der` | «con un número en tu celular ya sabes cuándo están ahí» |
| — | 58.0 | 61.5 | 02_apuntando_camara | cierre | `CierreMarca robert=` |

**Total:** 8 apariciones + cierre · **29.5 s** en pantalla (+ 3.5 s de cierre) · 8 poses distintas · grande una vez.

## Fuentes (cada cifra se abrió en la fuente el 29 oct 2026)

1. **U.S. EPA, "Particulate Matter (PM) Basics":** https://www.epa.gov/pm-pollution/particulate-matter-pm-basics
   > "PM2.5 : fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller."
   > "Some are emitted directly from a source, such as construction sites, unpaved roads, fields, smokestacks or fires. Most particles form in the atmosphere as a result of complex reactions of chemicals such as sulfur dioxide and nitrogen oxides, which are pollutants emitted from power plants, industries and automobiles."
   > "Some particles less than 10 micrometers in diameter can get deep into your lungs and some may even get into your bloodstream. Of these, particles less than 2.5 micrometers in diameter, also known as fine particles or PM2.5, pose the greatest risk to health."
   > Gráfica de la misma página ("Size comparisons for PM particles", pm2.5_scale_graphic-color_2.jpg, 2016): "FINE BEACH SAND 90 µm (microns) in diameter" · "PM2.5 … < 2.5 µm (microns) in diameter". (Página vigente en 2026; la gráfica es de 2016.)
2. **U.S. EPA, "Health and Environmental Effects of Particulate Matter (PM)":** https://www.epa.gov/pm-pollution/health-and-environmental-effects-particulate-matter-pm
   > "Small particles less than 10 micrometers in diameter pose the greatest problems, because they can get deep into your lungs, and some may even get into your bloodstream. Exposure to such particles can affect both your lungs and your heart."
3. **OMS, "WHO global air quality guidelines: particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide" (2021):** https://iris.who.int/server/api/core/bitstreams/551b515e-2a32-4e1a-a58c-cdaecd395b19/content
   > "The recommendation is an annual PM2.5 AQG level of 5 µg/m³. The GDG recommends maintaining the 2005 interim targets and introducing an interim target 4 at the level of the 2005 air quality guideline, as shown in Table 3.1."
   > Tabla 3.1: "Interim target 4 … 10" · "AQG level … 5" (PM2.5, µg/m³, anual). → la guía de 2005 era 10; la de 2021 es 5 ("a la mitad").
4. **OMS, comunicado del 22 sep 2021:** https://www.who.int/news/item/22-09-2021-new-who-global-air-quality-guidelines-aim-to-save-millions-of-lives-from-air-pollution
   > "Both PM₂.₅ and PM₁₀ are capable of penetrating deep into the lungs but PM₂.₅ can even enter the bloodstream, primarily resulting in cardiovascular and respiratory impacts, and also affecting other organs. PM is primarily generated by fuel combustion in different sectors, including transport, energy, households, industry, and from agriculture."
5. **SEDEMA (Gobierno de la Ciudad de México), "Informe anual de calidad del aire 2023":** http://www.aire.cdmx.gob.mx/descargas/publicaciones/informe-anual-calidad-del-aire-2023.pdf
   > "Partículas suspendidas: El promedio anual para PM10 fue de 41 µg/m³; para las PM2.5 fue de 20 µg/m³ y para las PM10-2.5 fue de 17 µg/m³, para los tres casos se consideraron las estaciones con un 65% de suficiencia."
   > "El promedio anual 2023 en la ZMCM (sitios con suficiencia ≥65 %) para las tres fracciones fue 41 µg/m³ (PM10), 17 µg/m³ (PM10-2.5) y 20 µg/m³ (PM2.5). En la CDMX, los promedios anuales fueron 37, 16 y 20 µg/m³, en PM10, PM10-2.5 y PM2.5, respectivamente. El indicador del promedio diario (24 h), en PM10 se obtuvo su máximo de 148 µg/m³ (25 de diciembre, sitio VIF); en PM2.5 fue 104 µg/m³ (1 de enero, estación Santiago Acahualtepec-SAC)"
   > "FI Regional de PM2.5 (01/enero/2023): se activó a las 11:00 h con un promedio móvil de 24 h (métrica para activar FI) de 104 µg/m3 en Santiago Acahualtepec (SAC) … Los niveles de PM2.5 fueron ocasionados por la pirotecnia del año nuevo, vientos débiles en el noreste e inversión térmica."
   > "El primer episodio de contingencia del 2023 fue por PM2.5 durante el 1ro de enero y fue consecuencia del uso de pirotecnia y fogatas en fin de año; esto es común ya que la mayoría de las contingencias por partículas (PM10 o PM2.5) ocurren en navidad y año nuevo."
   > "en 2019 se publicó el Índice AIRE y SALUD (IAS) en la NOM-172-SEMARNAT-2019; esta NOM contiene los lineamientos para el cálculo y difusión del IAS, que son aplicables a todas las entidades del país. … El IAS representa las concentraciones de los contaminantes atmosféricos de forma sencilla, ya que asigna una categoría de calidad del aire (Buena, Aceptable, Mala, etc.) y un color dentro de una escala definida dentro de la NOM. En cada categoría y rango de concentraciones, se identifican los riesgos y las recomendaciones para la protección de la salud."
   > "El SIMAT publica el IAS de cada contaminante para las 24 horas del día y todo el año."
   > Tabla 1.8 (mismo informe): límite OMS "Promedio anual 5 µg/m³"; CDMX "19 µg/m³", ZMCM "21 µg/m³" con el indicador de la NOM (solo 5 estaciones del método manual de referencia). La voz usa el promedio general de 20 µg/m³ del resumen.
6. **INECC, "Informe Nacional de Calidad del Aire 2023" (apoyo):** https://sinaica.inecc.gob.mx/archivo/informes/Informe2023.pdf
   > "En el caso de las partículas suspendidas PM2.5 destaca que en todas las estaciones de monitoreo donde se midió este contaminante se superó el límite normado de protección a la salud establecido como promedio anual" (Ciudad de México y Zona Conurbada, 2023).
7. **CAMe (Comisión Ambiental de la Megalópolis), comunicado oficial "Se activa contingencia ambiental atmosférica regional por partículas PM2.5 en la zona sureste del Valle de México" (1 ene 2026):** https://www.gob.mx/comisionambiental/prensa/se-activa-contingencia-ambiental-atmosferica-regional-por-particulas-pm2-5-en-la-zona-sureste-del-valle-de-mexico-415991
   > "En caso de contar con aire acondicionado en el hogar o automóvil, utilizarlo en modo de 'recirculación', así como mantener puertas y ventanas cerradas."
   > "Evitar hacer actividades cívicas, culturales, de recreo o ejercicio al aire libre a cualquier hora del día."
   > "Mantenerse informados sobre el estado de la calidad del aire en la aplicación, 'AIRE CDMX'"
8. **Límite de lo que ve el ojo (gancho y cierre):** J. M. Cimbala, Penn State, "Slides_Particles" (ME 433, 2015), https://www.me.psu.edu/cimbala/me433web_Spring_2015/Lectures/Slides_Particles.pdf
   > "Estimates vary, but range from Dp = 20 to 100 μm as the smallest object a healthy naked human eye can see"
   > "The naked eye can see individual air pollution particles down to about 10 μm. However, we can see clouds of smaller (even submicron!) particles because of blockage and scattering of light."
   > Por eso la voz dice "una por una": una PM2.5 sola (≤ 2.5 µm) está por debajo de ese límite; juntas sí se ven como neblina.

## Notas
- "Tus ojos nunca van a ver una por una": una partícula sola no se ve; juntas sí (neblina), por eso el "una por una" en gancho y cierre.
- "Más de treinta caben en fila": con las más grandes (2.5 µm) son 36 en 90 µm; con las más chicas, más.
- "Plantas de luz" = centrales eléctricas (power plants, EPA). "Calles de tierra" = unpaved roads.
- "Afectan a tu corazón": EPA ("can affect both your lungs and your heart") y OMS ("cardiovascular and respiratory impacts").
- "El día con más partículas fue el primero de enero" se refiere a 2023 (máximo del promedio de 24 h de PM2.5 del año, 104 µg/m³). El 1 ene 2026 volvió a haber contingencia por PM2.5 (fuente 7), pero no se dice en la voz.
- El grano de arena, el pulmón, los alvéolos y la silueta de la CDMX son esquemáticos.
