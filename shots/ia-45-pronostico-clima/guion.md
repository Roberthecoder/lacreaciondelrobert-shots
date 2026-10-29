# Shot IA #45 · La IA que hace el pronóstico de 10 días en menos de un minuto

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #45 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N2 "El número" (≈ 1 hora contra < 1 minuto; 90 % de 1,380) + N3 "Capítulos y medidores" (cronómetro y medidor de pruebas ganadas).
- **Gancho (de los 7):** #4 "Un número que contradice": una supercomputadora tarda cerca de una hora; la IA, menos de un minuto.
- **Duración:** voz 958 caracteres / ≈ 165 palabras (≈ 58.3 s) + cierre 3.5 s → **≈ 61.8 s** (estimar-escenas).
- **Postura de la serie:** a favor con datos, con su matiz: estas IA aprenden de mediciones y de modelos físicos; no los sustituyen. El estudio es de **2023** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Una supercomputadora con más de once mil núcleos tarda cerca de una hora en el pronóstico de diez días. / Esta IA lo hace en menos de un minuto. | Fondo cian; desde el cuadro 0 un mapa del tiempo de 10 días (soles, nubes, lluvia) y dos cronómetros que corren: a la izquierda un edificio de servidores "11,664 núcleos · ≈ 1 h"; a la derecha una sola maquinita "IA · < 1 min" que termina primero con un "¡listo!". |
| 1 | Estudio | Es GraphCast, de Google DeepMind, publicada en Science en 2023. | Tarjeta "2023 · Google DeepMind · Lam et al. · *Science*"; el nombre "GraphCast" con su malla de triángulos sobre el globo. |
| 2 | Aprende | No resuelve ecuaciones: aprendió de treinta y nueve años de registros del tiempo del centro europeo. | Ecuaciones tachadas suavemente; una pila de 39 "hojas de mapa" (1979 → 2017) entra a una red neuronal; chip "ERA5 · ECMWF". |
| 3 | Cuadritos | Divide el planeta en cuadritos de unos veintiocho kilómetros, adivina el tiempo seis horas después y repite hasta diez días. | Zoom al globo con cuadrícula; chip "≈ 28 km"; un reloj salta "+6 h, +6 h…" y una barra de días se llena hasta "10 días" (40 pasos). |
| 4 | Pregunta | ¿Pero solo es rápida, o también le atina? | **Re-gancho.** "?" gigante sobre el mapa; Robert grande. |
| 5 | Prueba | Contra el mejor pronóstico europeo, fue claramente mejor en el noventa por ciento de mil trescientas ochenta pruebas. | Cuadrícula de 1,380 casillas (esquemática, en bloques): se pintan de verde 90 %; chip "contra HRES (ECMWF)". Número gigante "90 %". |
| 6 | Ciclones | Y siguió mejor el camino de los ciclones. A México le pegan unos cinco al año. | Mapa de México con un ciclón que avanza: línea real (gris), línea de la IA (verde, más cerca) y del modelo clásico (rosa). Chips "≈ 5 al año: 3 Pacífico · 2 Golfo y Caribe". |
| 7 | Europa | En 2025, el centro europeo puso a funcionar su propia IA del tiempo, junto a su modelo de física. | Tarjeta "25 feb 2025 · ECMWF · AIFS operativo"; dos pantallas lado a lado: "IFS (física)" y "AIFS (IA)". |
| 8 | Ojo | Ojo: estas IA aprenden de datos de satélites y de modelos físicos. No reemplazan las mediciones. | Satélite, estación y modelo físico alimentan con flechas a la red neuronal; chip "sin datos, no hay pronóstico" (ilustrativo). |
| 9 | Cierre | Así que tras el pronóstico de tu celular puede haber una hora de supercomputadora… o un minuto de IA. | **Regreso a la imagen del inicio**: el mismo mapa de 10 días, ahora dentro de un celular; los dos cronómetros quedan quietos lado a lado. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua con un tic-tac suave de cronómetro; "¡listo!" con campanita cuando la IA termina; viento al pasar las hojas de mapa; un tic por cada salto de +6 h; tecleo rápido al pintar las casillas; zumbido de viento del ciclón; pitido al cerrar.

## Fuentes (abiertas en la fuente original el 29 oct 2026)

1. Lam, R. et al. "Learning skillful medium-range global weather forecasting". *Science* 382(6677): 1416–1421 (publicado en línea el 14 nov 2023). DOI 10.1126/science.adi2336 · PMID 37962497 · Google DeepMind (Londres). Resumen (PubMed):
   > "It predicts hundreds of weather variables for the next 10 days at 0.25° resolution globally in under 1 minute. GraphCast significantly outperforms the most accurate operational deterministic systems on 90% of 1380 verification targets, and its forecasts support better severe event prediction, including tropical cyclone tracking, atmospheric rivers, and extreme temperatures." (2023)
   Texto completo (preprint arXiv:2212.12794 v2, 4 ago 2023):
   > "On a single Cloud TPU v4 device, GraphCast can generate a 0.25° resolution, 10-day forecast (at 6-hour steps) in under 60 seconds. For comparison, ECMWF's IFS system runs on a 11,664-core cluster, and generates a 0.1° resolution, 10-day forecast … in about an hour of compute time" (2023)
   > "During model development, we used 39 years (1979–2017) of historical data from ECMWF's ERA5 reanalysis archive." (2023)
   > "A single weather state is represented by a 0.25° latitude/longitude grid (721 × 1440), which corresponds to roughly 28 × 28 kilometer resolution at the equator" (2023)
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
- "Más de once mil núcleos" = clúster de 11,664 núcleos donde corre el IFS/HRES; "cerca de una hora" = "about an hour of compute time" (según el artículo). La comparación no es idéntica: HRES calcula con más detalle (0.1°) que GraphCast (0.25°); se menciona en `publicacion.md`.
- "Menos de un minuto, en una sola máquina" = una TPU v4 de Google Cloud. No incluye el entrenamiento (≈ 4 semanas en 32 TPU v4).
- "Treinta y nueve años" = 1979–2017 de ERA5 (reanálisis del ECMWF = "centro europeo de pronósticos").
- "Unos veintiocho kilómetros" = 0.25°, medido en el ecuador.
- "Claramente mejor en el noventa por ciento de mil trescientas ochenta pruebas" = "significantly outperforms … on 90% of 1380 verification targets" (variables × niveles × plazos), contra HRES del ECMWF.
- "Siguió mejor el camino de los ciclones" = menor error mediano de trayectoria que HRES en 2018–2021 (significativo de 18 h a 4.75 días).
- AIFS: operativo desde el 25 feb 2025, junto al IFS; usa las mismas condiciones iniciales (que combinan ~60 millones de observaciones). "No reemplazan las mediciones" resume esto y la frase de los autores de GraphCast.
- La línea del celular dice "puede haber": no se afirma qué modelo usa cada app.
- Años en cifra en la voz (2023, 2025) como en el modelo ia-09; el resto de los números con letra.
- El dibujo es esquemático (la cuadrícula de 1,380 casillas y las trayectorias del ciclón son ilustrativas).
