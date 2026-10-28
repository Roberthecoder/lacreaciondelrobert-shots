# Verificación de hechos · amb-05-ozono

Fecha: 28 oct 2026. **Quién verificó:** en esta sesión no había herramienta de subagentes (Task/Agent), así que la verificación la hizo la misma sesión, abriendo cada fuente completa con `curl` (WebFetch no resolvía nombres en esta red) y buscando la frase exacta en el texto bajado. Criterio escéptico: si una afirmación no aparecía tal cual en la fuente, se cambió o se quitó.

## Primera ronda (antes de corregir)

| Afirmación (versión anterior) | Veredicto | Qué se hizo |
|---|---|---|
| (Tema anterior) "Esa botella trae unas 240 mil partículas de plástico por litro" (Qian et al., PNAS 2024) | ⚠️ | La carta de D. Materić (PNAS 2024, e2411099121) dice que las mediciones quedaron debajo del blanco del procedimiento y que la cuantificación es "fundamentally unreliable". Los autores respondieron, pero la cifra está en disputa. **Se descartó el tema completo.** |
| "En 1987 el mundo acordó, en Montreal, dejar de fabricarlos" | ⚠️ | En 1987 se firmó; la ratificación de todos los países llegó después. Se cambió a "En 1987 se firmó en Montreal un acuerdo para dejar de fabricarlos". |
| "Molina se preguntó a dónde iban" | ⚠️ | Su autobiografía dice que Rowland le ofreció el proyecto y él lo eligió ("finding out the environmental fate…"). Se cambió a "investigó a dónde iban". |
| "en 2023, la ONU confirmó que casi el 99 % se eliminó" | ⚠️ | Faltaba decir de qué es la cifra. Se cambió a "casi el noventa y nueve por ciento de esos gases" (los prohibidos). |
| "Volvería a como antes del agujero hacia 2040…" | ⚠️ | La fuente lo condiciona ("If current policies remain in place"). Se agregó "Si seguimos así". |


## Verificación independiente (28 oct 2026)

Otro agente que no escribió el guion revisó este shot abriendo las fuentes primarias. Lo que marcó y cómo se corrigió (las filas de la tabla final ya tienen la versión corregida, con su fuente, frase textual y año):

| Afirmación (versión anterior) | Veredicto | Qué se hizo |
|---|---|---|
| "En 1987 se firmó en Montreal un acuerdo para dejar de fabricarlos" | ⚠️ | El texto de 1987 solo recortaba los CFC (20 % para 1994 y 50 % para 1998, frente a 1986); la prohibición total llegó con la Enmienda de Londres (1990), con plazo en 2000 para países desarrollados (EPA). Se cambió a "para recortarlos, y luego, prohibirlos". |
| "en 2023 ya se había eliminado casi el noventa y nueve por ciento de esos gases" | ⚠️ | El 99 % de la WMO es de producción y consumo que se dejaron de hacer ("phase out of nearly 99% of banned ozone-depleting substances"), no de gas que ya salió del aire: en la estratósfera los CFC bajan lento (según NOAA, en la Antártida, cerca de un tercio desde su máximo). Se cambió a "se había dejado de usar casi el 99 %" y la pantalla dice "gases prohibidos que ya no se usan (2023)"; los CFC tachados significan "se dejan de usar". |

## Versión final

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| El agujero de ozono "no se está agrandando: se está cerrando" | ✅ | WMO/UNEP, comunicado 9 ene 2023 (evaluación 2022) | "the Antarctic ozone hole has been slowly improving in area and depth since the year 2000" · "expected to recover to 1980 values … by around 2066 over the Antarctic" | 2023 |
| La alarma la dio, en parte, un mexicano (Mario Molina, Ciudad de México) | ✅ | NobelPrize.org, Molina – Facts | "Born: 19 March 1943, Mexico City, Mexico" · Nobel 1995 "awarded jointly to Paul J. Crutzen, Mario J. Molina and F. Sherwood Rowland" | 1995 |
| La capa de ozono está entre 15 y 40 km sobre ti | ✅ | EPA, Basic Ozone Layer Science | "The ozone layer lies approximately 15-40 kilometers (10-25 miles) above the Earth's surface" | consulta 2026 |
| El ozono frena la luz ultravioleta | ✅ | EPA, misma página | "UVB is mostly absorbed by ozone … UVC is completely absorbed by ozone and normal oxygen" | consulta 2026 |
| Refrigeradores y aerosoles soltaban gases CFC | ✅ | EPA, misma página (glosario) | CFC "used for refrigeration, air conditioning, packaging, insulation, solvents, or aerosol propellants" | consulta 2026 |
| Los CFC parecían inofensivos | ✅ | Molina, autobiografía (NobelPrize.org) | "very inert industrial chemicals – the chlorofluorocarbons (CFCs) – … at that time were thought to have no significant effects on the environment" | 1995 |
| De niño hizo su laboratorio en un baño | ✅ | Molina, autobiografía | "I then converted a bathroom, seldom used by the family, into a laboratory" | 1995 |
| Investigó a dónde iban los CFC | ✅ | Molina, autobiografía | "the one project that intrigued me the most consisted of finding out the environmental fate of certain very inert industrial chemicals – the chlorofluorocarbons (CFCs)" | 1995 |
| Suben, el sol los rompe y sueltan cloro | ✅ | EPA (glosario) y autobiografía | "slowly rise into the stratosphere, are broken down by strong ultraviolet radiation, release chlorine atoms" · "they would eventually drift to sufficiently high altitudes to be destroyed by solar radiation" | — |
| Un solo átomo de cloro puede destruir más de 100 mil moléculas de ozono | ✅ | EPA, Basic Ozone Layer Science | "One chlorine atom can destroy over 100,000 ozone molecules before it is removed from the stratosphere." | consulta 2026 |
| Lo publicó con Sherwood Rowland en 1974, y ganaron el Nobel (pantalla: Nature 249: 810–812; Nobel de Química 1995) | ✅ | Crossref doi:10.1038/249810a0 y autobiografía | Título "Stratospheric sink for chlorofluoromethanes: chlorine atom-catalysed destruction of ozone", autores Molina y Rowland, Nature 249, 810–812, junio 1974 · "a paper which appeared in the June 28, 1974 issue" | 1974 |
| Después ganaron el Nobel de Química (pantalla: 1995) | ✅ | NobelPrize.org, resumen 1995 | "The Nobel Prize in Chemistry 1995 was awarded jointly to Paul J. Crutzen, Mario J. Molina and F. Sherwood Rowland" | 1995 |
| En 1987 se firmó en Montreal un acuerdo para recortarlos, y luego, prohibirlos (pantalla: "recortar y luego prohibir los CFC") | ✅ | UNEP Ozone Secretariat + EPA, International Treaties and Cooperation about the Protection of the Stratospheric Ozone Layer | "signed in 1987" · "Under the original Montreal Protocol agreement (1987), developed countries were required to begin phasing out CFCs in 1993 and achieve a 20% reduction relative to 1986 consumption levels by 1994 and a 50% reduction by 1998." · "The London Amendment (1990) … requiring the complete phaseout of CFCs … by 2000 in developed countries" | 1987 y 1990 |
| Para 2023 se había dejado de usar casi el 99 % de esos gases (pantalla: "gases prohibidos que ya no se usan (2023)") | ✅ | WMO/UNEP, comunicado 9 ene 2023 | "confirms the phase out of nearly 99% of banned ozone-depleting substances" | 2023 (la evaluación 2026 aún no se publica: NOAA CSL, "will be released at the end of 2026") |
| Si seguimos así, como antes del agujero (1980) hacia 2040 en casi todo el mundo y hacia 2066 en la Antártida | ✅ | WMO/UNEP, comunicado 9 ene 2023 | "If current policies remain in place, the ozone layer is expected to recover to 1980 values (before the appearance of the ozone hole) by around 2066 over the Antarctic, by 2045 over the Arctic and by 2040 for the rest of the world." | 2023 |
| Pantalla: escala "2,000 km (aprox.)" con la Tierra de 320 px de radio | ✅ | NASA, Earth Fact Sheet | "Volumetric mean radius (km) 6371.000" → 2,000 km ≈ 100 px | — |
| Pantalla: escala "0.1 nm (aprox.)" con el enlace O–O dibujado de ~38 px | ✅ | NIST CCCBDB, ozono | "rOO 1.278" Å (0.128 nm) → 0.1 nm ≈ 30 px | 1966 (Herzberg) |
| Pantalla: regla de altura 0–50 km y franja de 15 a 40 km | ✅ | EPA (ver arriba) | mismo dato | — |
| Cierre: "si le hacemos caso a la ciencia, se arregla" | ✅ (opinión apoyada en datos) | WMO/UNEP 2023 | "phase out … has succeeded in safeguarding the ozone layer, leading to notable recovery" | 2023 |

Dibujos esquemáticos (no afirman datos): la Tierra vista desde el polo sur, las moléculas, la tina con matraces y la medalla (no reproduce la real).

Todas las afirmaciones de la versión final están ✅.

VEREDICTO: APROBADO
