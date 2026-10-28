# Verificación de hechos · amb-07-monarca

Fecha: 28 oct 2026. **Quién verificó:** en esta sesión no había herramienta de subagentes (Task/Agent), así que la verificación la hizo la misma sesión, abriendo cada fuente completa con `curl` (incluidos los PDF de WWF) y buscando la frase exacta en el texto bajado. Criterio escéptico: si una afirmación no aparecía tal cual en la fuente, se cambió o se quitó.

## Primera ronda (antes de corregir)

| Afirmación (versión anterior) | Veredicto | Qué se hizo |
|---|---|---|
| "Todas las mariposas monarca que pasaron el invierno en México…" | ⚠️ | Lo que se mide es la superficie de las colonias, no cada mariposa. Se cambió a "Todas las colonias de mariposa monarca…". |
| "Este invierno ocuparon 2.93 hectáreas" | ⚠️ | Hoy es octubre de 2026: la temporada medida es 2025-2026. Se cambió a "del invierno pasado" y "más que el invierno anterior". |
| "y aquí la tala: en un año se dañaron 2.55 hectáreas de su bosque" | ⚠️ | Las 2.55 ha no son solo tala: 1.854 tala, 0.579 incendio y 0.117 sequía. Se cambió a "la tala, un incendio y la sequía dañaron 2.55 hectáreas". |
| "Sus orugas solo comen algodoncillo" (borrador) | ⚠️ | Las fuentes abiertas dicen "milkweed host plants", no "solo". Se quitó "solo". |


## Verificación independiente (28 oct 2026)

Otro agente que no escribió el guion revisó este shot abriendo las fuentes primarias. Lo que marcó y cómo se corrigió (las filas de la tabla final ya tienen la versión corregida, con su fuente, frase textual y año):

| Afirmación (versión anterior) | Veredicto | Qué se hizo |
|---|---|---|
| "para estar estables necesitan unas seis hectáreas" | ⚠️ | La revisión usa 6 ha como meta: aun así el riesgo de extinción sería de 11 % en 10 años y 25 % en 20. Se cambió a "proponen como meta unas seis hectáreas". |
| "antes eran veinticinco" | ⚠️ | 1996-1997 es el récord, no lo normal. Se cambió a "en 1996 eran veinticinco". |
| Subtítulo "Clima, tala, incendio: 2.55 hectáreas" | ⚠️ | Las 2.55 ha fueron por tala, incendio y sequía (causas naturales); el clima no está en esa cifra. Se cambió a "Tala, incendio, sequía". |

## Versión final

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| Todas las colonias del invierno pasado caben en unas 4 canchas de fútbol | ✅ | WWF/CONANP 2025-2026 + FIFA | "estas colonias ocuparon un total de 2.93 hectáreas" · "FIFA's recommended field of play dimensions are 105 metres x 68 metres" → 2.93 ÷ 0.714 = 4.1 | 2025-2026 |
| Vuelan desde el sur de Canadá y EE. UU. hasta Michoacán y el Estado de México | ✅ | WWF/CONANP 2025-2026 | "migran en el otoño desde el sur de Canadá, así como del norte y centro de los Estados Unidos" · "tres en Michoacán y seis en el Estado de México" | 2026 |
| Se amontonan en los árboles; en cada hectárea, unos 20 millones | ✅ | Revisión 2026, PMC13027080 | "1 million monarchs (about 0.05 hectare of occupied area…) to 13 million monarchs (about 0.6 hectare)" | 2026 |
| Ocuparon 2.93 ha, 64 % más que el invierno anterior (pantalla: antes 1.79 ha) | ✅ | WWF/CONANP 2025-2026 | "2.93 hectáreas … incremento del 64 % con respecto a … 2024-2025 (1.79 ha)" | 2025-2026 |
| En el invierno de 1996 ocupaban más de 18 ha (pantalla 18.19 ha, 1996-1997) | ✅ | WWF/CONANP 2025-2026 | "la mayor superficie se presentó en 1996-1997 con 18.19 ha" | 1996-1997 |
| Sus orugas comen algodoncillo, y en sus zonas de cría los herbicidas lo han ido acabando | ✅ | WWF/CONANP 2025-2026 y revisión 2026 | "la disminución de las asclepias o algodoncillos en sus sitios de reproducción por uso desmedido de herbicidas" · "the loss of their milkweed host plants … herbicide tolerant corn and soybeans" | 2026 |
| Les pega el cambio climático | ✅ | WWF/CONANP 2025-2026 | "iii. el cambio climático en sus sitios de reproducción" | 2026 |
| En un año, tala, incendio y sequía dañaron 2.55 ha de su bosque (subtítulo: "Tala, incendio, sequía: 2.55 hectáreas"; pantalla: feb 2024–feb 2025) | ✅ | WWF/UNAM, cambio forestal RBMM 2024-2025 | "Entre febrero de 2024 y febrero de 2025 sufrieron afectación 2.55 hectáreas … 0.579 ha por un incendio, 0.117 ha por causas naturales (sequía) y 1.854 ha con tala clandestina" | 2024-2025 |
| Lo mide cada invierno, desde 2004, la CONANP con WWF, colonia por colonia | ✅ | WWF/CONANP 2025-2026 | "CONANP y WWF nos coordinamos para realizar el monitoreo sistemático de la hibernación de la Monarca a partir de la temporada 2004-2005" (y la tabla mide cada colonia) | 2004 → hoy |
| Los científicos proponen como meta unas 6 ha: el doble de hoy (subtítulo: "La meta: unas 6 hectáreas") | ✅ | Oberhauser et al., Insects 2026, 17:235 (PMC13027080) | "a population that would occupy 6 hectares of forest in Mexico, a population size estimated to be stable by Semmens et al." · "a population that occupied 6 hectares of winter habitat would only have extinction risks of 11% and 25% in the next 10 and 20 years" → es una meta, no una garantía; 6 ÷ 2.93 ≈ 2.05 | 2026 |
| En 1996 eran unas 25 canchas (subtítulo: "Hoy 4 canchas; en 1996, 25") | ✅ | WWF/CONANP + FIFA | "la mayor superficie se presentó en 1996-1997 con 18.19 ha" (el récord) → 18.19 ÷ 0.714 = 25.5 | 1996-1997 |
| Pantalla: escala "50 m" sobre canchas de 105 m dibujadas a 400 px (y 130 px al final) | ✅ | FIFA | 105 m = 400 px → 50 m = 190 px | — |
| Pantalla: escala del mapa "500 km (aprox.)" | ✅ | geometría del mapa del kit (23.8 px por grado; 1 grado ≈ 111 km) | aproximado y así se dice | — |

Dibujos esquemáticos (no afirman datos): canchas, mapa, oyamel con racimos, planta de algodoncillo, oruga y bosque.

Todas las afirmaciones de la versión final están ✅.

VEREDICTO: APROBADO
