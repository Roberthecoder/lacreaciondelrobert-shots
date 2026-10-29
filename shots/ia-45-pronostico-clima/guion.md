# Shot IA #45 · La IA que hace el pronóstico de 10 días en menos de un minuto

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #45 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado y corregido (fase B), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · **voz pendiente de aprobación de Robert**.
- **Formato:** N2 "El número" (≈ 1 hora contra < 1 minuto; 90 % de 1,380) + N3 "Capítulos y medidores" (cronómetro y medidor de pruebas ganadas).
- **Gancho (de los 7):** #4 "Un número que contradice": una supercomputadora usa más de once mil núcleos casi una hora; la IA, un chip y menos de un minuto (y luego se dice que sus cuadritos son más grandes).
- **Duración:** voz 958 caracteres / 170 palabras (≈ 58.3 s) + cierre 3.5 s → **≈ 61.8 s** (estimar-escenas).
- **Postura de la serie:** a favor con datos, con su matiz: estas IA aprenden de mediciones y de modelos físicos; no los sustituyen. El estudio es de **2023** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Para el pronóstico de diez días, una supercomputadora usa más de once mil núcleos casi una hora. / Esta IA, con un solo chip: menos de un minuto. | Fondo cian; desde el cuadro 0 un rack de servidores con lucecitas y un reloj en time-lapse que corre hasta ≈ 59 min; chip "usando 11,664 núcleos"; barra "supercomputadora · 10 días" que se llena lenta ("≈ 1 h"). Con «Esta IA» entra un chip "IA" con su reloj (00:00:55) y su barra vuela: "< 1 min ✔". |
| 1 | Estudio | Es GraphCast, de Google DeepMind, en Science, 2023. | Tarjeta "2023 · GraphCast · Google DeepMind · Lam et al. · Science"; globo que gira y se cubre con una malla de triángulos (esquemática). |
| 2 | Aprende | Aprendió de treinta y nueve años de mapas del tiempo pasado, reconstruidos por el centro europeo. | Hojas de mapa con años (1979 → 2017) vuelan a una red neuronal; chips "39 años · 1979 → 2017" y "mapas reconstruidos · ERA5 (ECMWF)". |
| 3 | Cuadritos | Divide el planeta en cuadritos de unos veintiocho kilómetros, más grandes que los de la supercomputadora, y avanza de seis en seis horas. | Dos parches de terreno con cuadrícula: "IA · ≈ 28 km" (gruesa) y "supercomputadora · ≈ 11 km" (fina, "más detalle"); "esquemático · en el ecuador". Luego el contador "+6 h × 40 = 10 días". |
| 4 | Pregunta | ¿Solo es rápida, o le atina? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Prueba | Contra el mejor pronóstico europeo ganó claramente en el noventa por ciento de mil trescientas ochenta pruebas. | Cuadrícula de 1,380 casillas (46 × 30) que se pinta de verde hasta el 90 %; chip "1,380 pruebas · contra HRES (ECMWF)"; número gigante "90 %". |
| 6 | Ciclones | Y siguió mejor el camino de los ciclones. A México le pegan unos cinco al año. | Mar azul con un ciclón genérico y tres trazas (real, IA, supercomputadora), chip **"esquemático · ciclones de todo el mundo"**. Luego mapa de México con flechas desde el Pacífico y el Golfo/Caribe: "≈ 5 ciclones al año", "3 Pacífico", "2 Golfo y Caribe". |
| 7 | Europa | En 2025, el centro europeo estrenó su propia IA, junto a su modelo de física. | Tarjeta "2025 · ECMWF · AIFS en operación · 25 de febrero de 2025"; dos monitores lado a lado: "IFS · física" y "AIFS · IA". |
| 8 | Ojo | Ojo: aprenden de mapas que juntan mediciones, como de satélites, con modelos de física, y cada pronóstico arranca de mediciones. No las reemplazan. | Fondo de circuito: satélite, estación meteorológica y "modelo de física" mandan flechas a un mapa, y el mapa al chip IA; chip "mediciones"; mito «ya no hacen falta mediciones» que se tacha. |
| 9 | Cierre | Así que tras tu app del clima puede haber una hora de supercomputadora… o un minuto de IA. | **Regreso a la imagen del inicio**: el pronóstico de 10 días, ahora dentro de un celular, con los dos tiempos lado a lado: "≈ 1 h" y "< 1 min". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; la supercomputadora zumba y el reloj hace tic-tac en time-lapse; el chip entra con un barrido y su barra sube con un glissando, campanita en "< 1 min"; las hojas de mapa pasan con soplidos; un tic por cada salto de +6 h; tecleo rápido al pintar las casillas y golpe en el 90 %; viento del ciclón; dos golpes para las flechas a las dos costas; burbujitas para las mediciones; crujido al tachar el mito; acorde final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Solo es rápida, o le atina?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «más de once mil núcleos casi una hora» (cuadro 0) |
| 2 | 14.0 | 17.7 | 13_senalando_arriba | `arriba-der` | señala los «treinta y nueve años de mapas» |
| 3 | 22.5 | 25.9 | 04_bajando_lentes | `izq-alto` | «de seis en seis horas» (el contador de pasos) |
| 4 | 26.1 | 29.1 | 07_pensativo_puno | `grande` | «¿Solo es rápida, o le atina?» |
| 5 | 31.5 | 34.4 | 11_sorprendido | `arriba-der` | «noventa por ciento de mil trescientas ochenta» |
| 6 | 37.5 | 40.4 | 10_serio_molesto | `arriba-der` | «A México le pegan unos cinco al año» |
| 7 | 41.8 | 43.9 | 05_sonriendo_dientes_uniformes | `izq-alto` | «estrenó su propia IA» |
| 8 | 48.9 | 52.6 | 06_pensativo_menton | `izq-alto` | «No las reemplazan» (se tacha el mito) |
| 9 | 53.3 | 58.2 | 13_senalando_arriba | `arriba-der` | «una hora… o un minuto de IA» |
| — | 58.3 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 31.0 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.8 s

## Fuentes (abiertas en la fuente original el 29 oct 2026)

1. Lam, R. et al. "Learning skillful medium-range global weather forecasting". *Science* 382(6677): 1416–1421 (publicado en línea el 14 nov 2023). DOI 10.1126/science.adi2336 · PMID 37962497 · Google DeepMind (Londres). Resumen (PubMed):
   > "It predicts hundreds of weather variables for the next 10 days at 0.25° resolution globally in under 1 minute. GraphCast significantly outperforms the most accurate operational deterministic systems on 90% of 1380 verification targets, and its forecasts support better severe event prediction, including tropical cyclone tracking, atmospheric rivers, and extreme temperatures." (2023)
   Texto completo (preprint arXiv:2212.12794 v2, 4 ago 2023):
   > "On a single Cloud TPU v4 device, GraphCast can generate a 0.25° resolution, 10-day forecast (at 6-hour steps) in under 60 seconds. For comparison, ECMWF's IFS system runs on a 11,664-core cluster, and generates a 0.1° resolution, 10-day forecast … in about an hour of compute time" (2023)
   > "During model development, we used 39 years (1979–2017) of historical data from ECMWF's ERA5 reanalysis archive." (2023)
   > "A single weather state is represented by a 0.25° latitude/longitude grid (721 × 1440), which corresponds to roughly 28 × 28 kilometer resolution at the equator" (2023)
   > "Training GraphCast took roughly four weeks on 32 Cloud TPU v4 devices using batch parallelism." (2023)
   > "while HRES is released on 0.1° resolution, 137 levels, and up to 1 hour time steps, GraphCast operated on 0.25° latitude-longitude resolution, 37 vertical levels, and 6 hour time steps" (2023)
   > "GraphCast takes as input the two most recent states of Earth's weather—the current time and six hours earlier—and predicts the next state of the weather six hours ahead. … it can be "rolled out" by feeding its own predictions back in as input" (2023)
   > "Figure 3a shows GraphCast has lower median track error than HRES over 2018–2021. … GraphCast is significantly better than HRES for lead time 18 hours to 4.75 days" (2023)
   > "data-driven MLWP depends critically on large quantities of high-quality data, assimilated via NWP … our approach should not be regarded as a replacement for traditional weather forecasting methods" (2023)
2. Google DeepMind, blog "GraphCast: AI model for faster and more accurate global weather forecasting" (14 nov 2023):
   > "takes less than a minute on a single Google TPU v4 machine" · "more accurate predictions on more than 90% of 1380 test variables and forecast lead times" · "we trained GraphCast on four decades of weather reanalysis data, from the ECMWF's ERA5 dataset" (2023)
3. ECMWF, "ECMWF's AI forecasts become operational" (25 feb 2025), https://www.ecmwf.int/node/29308:
   > "ECMWF has taken the Artificial Intelligence Forecasting System (AIFS) into operations today" · "to run side by side with its traditional physics-based Integrated Forecasting System (IFS)" · "The AIFS uses the same initial conditions for its forecasts as the IFS" · "around 60 million quality-controlled observations from satellites" (2025)
4. CENAPRED (Gobierno de México), "Temporada de ciclones tropicales y lluvias intensas. Pronóstico y medidas generales de preparación" (29 may 2026):
   > "nos impactan en promedio 5 al año; 3 por el Pacífico y 2 por el Golfo de México y Mar Caribe" (2026)

## Notas
- **Correcciones de la verificación (29 oct 2026):** gancho con datos exactos ("usa más de once mil núcleos casi una hora"; "un solo chip"); en la voz se dice que los cuadritos de la IA son más grandes que los de la supercomputadora y en pantalla se comparan las dos cuadrículas; "registros del tiempo" → "mapas del tiempo pasado, reconstruidos por el centro europeo" (ERA5 es un reanálisis); la frase de las mediciones se reescribió; el ciclón es genérico y lleva "esquemático · ciclones de todo el mundo".
- "Más de once mil núcleos" = clúster de 11,664 núcleos donde corre el IFS/HRES; "casi una hora" = "about an hour of compute time". HRES calcula con más detalle (0.1° ≈ 11 km en el ecuador) que GraphCast (0.25° ≈ 28 km); se dice en la voz y en `publicacion.md`.
- "Un solo chip, menos de un minuto" = un Cloud TPU v4. No incluye el entrenamiento (≈ 4 semanas en 32 TPU v4) ni la preparación de las condiciones iniciales (lo aclara `publicacion.md`).
- "Treinta y nueve años" = 1979–2017 de ERA5 (reanálisis del ECMWF = "centro europeo").
- "Ganó claramente en el noventa por ciento de mil trescientas ochenta pruebas" = "significantly outperforms … on 90% of 1380 verification targets", contra HRES del ECMWF.
- "Siguió mejor el camino de los ciclones" = menor error mediano de trayectoria que HRES con ciclones de todo el mundo, 2018–2021 (significativo de 18 h a 4.75 días; en `publicacion.md`).
- AIFS: operativo desde el 25 feb 2025, junto al IFS, con las mismas condiciones iniciales (~60 millones de observaciones). "No las reemplazan" resume esto y la frase de los autores de GraphCast.
- La línea del celular dice "puede haber": no se afirma qué modelo usa cada app.
- Años en cifra en la voz (2023, 2025) como en el modelo ia-09; el resto de los números con letra.
- El dibujo es esquemático (las cuadrículas, las 1,380 casillas y las trayectorias del ciclón son ilustrativas).
