# Verificación de hechos · Shot IA #45 · La IA que hace el pronóstico de 10 días en menos de un minuto

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).** Revisé `guion.md` (voz + columna "Lo que se ve") y `narracion.json`. No hay `.jsx` todavía.
- **Fuentes abiertas:** artículo completo de GraphCast (arXiv:2212.12794 v2, PDF leído entero), resumen en PubMed (PMID 37962497), nota del ECMWF del 25 feb 2025, página de CENAPRED del 29 may 2026.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho: "Una supercomputadora con más de once mil núcleos tarda cerca de una hora en el pronóstico de diez días" (pantalla: "11,664 núcleos · ≈ 1 h") | ⚠️ cifras correctas, comparación incompleta | Lam et al., arXiv 2212.12794 v2, Supl. §3.2 | "ECMWF's IFS system runs on a 11,664-core cluster, and generates a 0.1° resolution, 10-day forecast … in about an hour of compute time" | 2023 |
| 2 | "Esta IA lo hace en menos de un minuto" (pantalla: "una sola maquinita · < 1 min") | ⚠️ verdadero, pero no es la misma tarea (ver Correcciones) | Lam et al. 2023, *Science* (PubMed) + Supl. §3.2 | "predicts hundreds of weather variables for the next 10 days at 0.25° resolution globally in under 1 minute" · "On a single Cloud TPU v4 device … in under 60 seconds" | 2023 |
| 3 | "Es GraphCast, de Google DeepMind, publicada en *Science* en 2023" (tarjeta "Lam et al.") | ✅ | PubMed 37962497 | *Science* 382(6677):1416–1421; epub 14 nov 2023; DOI 10.1126/science.adi2336 | 2023 |
| 4 | "No resuelve ecuaciones" | ✅ | Lam et al. 2023 (resumen) | "a machine learning-based method trained directly from reanalysis data" | 2023 |
| 5 | "aprendió de treinta y nueve años de registros del tiempo del centro europeo" (pantalla "1979 → 2017", "ERA5 · ECMWF") | ⚠️ los 39 años y ERA5 sí; "registros" es impreciso | Lam et al. 2023, §Métodos y Supl. §1.1 | "we used 39 years (1979–2017) of historical data from ECMWF's ERA5 reanalysis archive" · "The ERA5 archive is based on reanalysis, which uses ECMWF's HRES model…" | 2023 |
| 6 | "cuadritos de unos veintiocho kilómetros" (chip "≈ 28 km") | ✅ (medido en el ecuador) | Lam et al. 2023 | "0.25° latitude/longitude grid (721 × 1440), which corresponds to roughly 28 × 28 kilometer resolution at the equator" | 2023 |
| 7 | "adivina el tiempo seis horas después y repite hasta diez días" (40 pasos) | ✅ | Lam et al. 2023 | "predicts the next state of the weather six hours ahead … it can be "rolled out" by feeding its own predictions back in as input" | 2023 |
| 8 | "Contra el mejor pronóstico europeo" (chip "HRES (ECMWF)") | ✅ (es el determinista; se queda corto: el artículo dice "del mundo") | Lam et al. 2023 | "The top deterministic operational system in the world is ECMWF's High RESolution forecast (HRES)" | 2023 |
| 9 | "fue claramente mejor en el noventa por ciento de mil trescientas ochenta pruebas" (número "90 %") | ✅ | Lam et al. 2023 (resumen y §Resultados) | "significantly outperforms the most accurate operational deterministic systems on 90% of 1380 verification targets" · "significantly (p ≤ 0.05) outperformed HRES on 89.9% of targets" | 2023 |
| 10 | "Y siguió mejor el camino de los ciclones" | ✅ (con matiz: entre 18 h y 4.75 días, ciclones de todo el mundo 2018–2021) | Lam et al. 2023 | "GraphCast has lower median track error than HRES over 2018–2021 … significantly better than HRES for lead time 18 hours to 4.75 days" | 2023 |
| 11 | Pantalla: ciclón sobre México con línea de la IA más cerca de la real | ⚠️ ilustrativo: el estudio no evaluó ciclones de México en particular | — | Debe llevar "esquemático" en pantalla o no sugerir un caso real | — |
| 12 | "A México le pegan unos cinco al año" (chips "3 Pacífico · 2 Golfo y Caribe") | ✅ | CENAPRED, gob.mx (29 may 2026) | "nos impactan en promedio 5 al año; 3 por el Pacífico y 2 por el Golfo de México y Mar Caribe" | 2026 |
| 13 | "En 2025, el centro europeo puso a funcionar su propia IA del tiempo, junto a su modelo de física" (tarjeta "25 feb 2025 · AIFS operativo"; "IFS (física)" y "AIFS (IA)") | ✅ | ECMWF, "ECMWF's AI forecasts become operational" | "ECMWF has taken the Artificial Intelligence Forecasting System (AIFS) into operations today" · "to run side by side with its traditional physics-based Integrated Forecasting System (IFS)" | 2025 |
| 14 | "estas IA aprenden de datos de satélites y de modelos físicos" | ⚠️ impreciso: aprenden de reanálisis (mediciones —incl. satélites— combinadas con un modelo físico) y arrancan de condiciones iniciales hechas con ~60 millones de observaciones | Lam et al. 2023; ECMWF 2025 | "data-driven MLWP depends critically on large quantities of high-quality data, assimilated via NWP" · "The AIFS uses the same initial conditions for its forecasts as the IFS" · "around 60 million quality-controlled observations from satellites" | 2023 / 2025 |
| 15 | "No reemplazan las mediciones" (chip "sin datos, no hay pronóstico") | ✅ | Lam et al. 2023 | "our approach should not be regarded as a replacement for traditional weather forecasting methods" | 2023 |
| 16 | Cierre: "tras el pronóstico de tu celular puede haber una hora de supercomputadora… o un minuto de IA" | ✅ como posibilidad ("puede haber"); hereda el matiz de #1–2 | — | — | — |

## ¿Es justa la comparación del gancho? (0.1° contra 0.25°)

Las dos cifras son exactas y están en la misma frase del artículo, pero **no miden la misma tarea**:

1. **Detalle:** la supercomputadora (IFS/HRES) calcula a 0.1° (≈ 11 km en el ecuador; el modelo corre a ≈ 9 km); GraphCast, a 0.25° (≈ 28 km). Eso son **unas 6 veces más puntos** en el mapa (0.25² / 0.1² ≈ 6.25), además de 137 niveles de altura contra 37 y salidas cada hora contra cada 6 h ("while HRES is released on 0.1° resolution, 137 levels, and up to 1 hour time steps, GraphCast operated on 0.25° …, 37 vertical levels, and 6 hour time steps").
2. **Punto de partida:** el minuto de la IA no incluye preparar las condiciones iniciales (la asimilación de datos que hace el sistema de física) ni el entrenamiento (≈ 4 semanas en 32 TPU v4: "Training GraphCast took roughly four weeks on 32 Cloud TPU v4 devices").
3. **"Una supercomputadora con más de once mil núcleos":** la supercomputadora del ECMWF es mucho más grande; los 11,664 núcleos son el clúster que usa el pronóstico. Mejor decir "usando más de once mil núcleos".

Así como está, el gancho insinúa "hace lo mismo, 60 veces más rápido". Mientras la voz no diga que los cuadritos de la IA son más grandes, es ⚠️. Ponerlo solo en `publicacion.md` no basta: quien ve el video no lo lee.

## Correcciones necesarias

1. **Gancho (#1–2)**, ⚠️ comparación incompleta. Opciones, de menor a mayor cambio:
   - **A (recomendada, casi no cambia la duración):** dejar el gancho como un número que contradice, pero con datos exactos: *"Para el pronóstico de diez días, una supercomputadora usa más de once mil núcleos durante casi una hora. Esta IA lo hace con un solo chip en menos de un minuto."* Luego, en Cuadritos (#6), decir la diferencia en voz: *"Divide el planeta en cuadritos de unos veintiocho kilómetros, más grandes que los de la supercomputadora, adivina el tiempo seis horas después y repite hasta diez días."* En pantalla: dos cuadrículas lado a lado, "IA ≈ 28 km" contra "supercomputadora ≈ 9–11 km (más detalle)".
   - **B (más directo en el gancho):** *"Una supercomputadora tarda casi una hora en el pronóstico de diez días. Esta IA hace uno menos detallado, pero en menos de un minuto."*
   - En cualquiera de las dos, cambiar el chip "11,664 núcleos" de "una supercomputadora con" a "usando".
2. **#5 "registros del tiempo"**, ⚠️ ERA5 no son registros crudos: es un reanálisis. Propuesta: *"aprendió de treinta y nueve años de mapas del tiempo pasado, reconstruidos por el centro europeo."* (o "del archivo del centro europeo").
3. **#14 "aprenden de datos de satélites y de modelos físicos"**, ⚠️ impreciso. Propuesta: *"Ojo: estas IA aprenden de mapas que juntan mediciones, como las de satélites, con modelos de física, y cada pronóstico arranca de esas mediciones. No las reemplazan."*
4. **#11 mapa del ciclón sobre México**, ⚠️ el estudio evaluó ciclones de todo el mundo, no un caso de México. Poner "esquemático" en pantalla o usar un ciclón genérico; no presentarlo como una trayectoria real.
5. Opcional, recomendable: en `publicacion.md` y en Notas, decir que el minuto no incluye el entrenamiento (≈ 4 semanas en 32 TPU v4) ni la preparación de las condiciones iniciales, y que la ventaja en ciclones fue entre 18 h y 4.75 días.
