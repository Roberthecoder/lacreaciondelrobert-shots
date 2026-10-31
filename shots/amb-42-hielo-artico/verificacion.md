# Verificación de hechos · amb-42-hielo-artico

- Fecha: 29 oct 2026
- Verificador: subagente independiente (no escribió el guion)
- Publicación prevista (`calendario/fecha.py "Ambiental" 42`): **22 ene 2027**.
- Además de las páginas, se bajaron y analizaron los **datos crudos del Sea Ice Index v4.0 de NSIDC** (G02135):
  `N_seaice_extent_daily_v4.0.csv` (diario, hasta el 27 oct 2026) y `N_09_extent_v4.0.csv` (promedio de septiembre).

## Revisión especial del gancho (todos los años 2007–2026 contra todos los de 1979–2006)

| Medida (NSIDC Sea Ice Index v4.0) | Máximo de 2007–2026 (el año con MÁS hielo) | Mínimo de 1979–2006 (el año con MENOS hielo) | ¿Se cumple? |
|---|---|---|---|
| Mínimo anual, promedio de 5 días (la que usa NSIDC) | 2009: 5.12 M km² | 2005: 5.32 M km² | ✅ por 0.20 M km² |
| Mínimo anual, valor diario | 2009: 5.05 M km² | 2005: 5.31 M km² | ✅ |
| Promedio del mes de septiembre | 2009: 5.26 M km² | 2005: 5.50 M km² | ✅ |

Los 20 mínimos más bajos de 48 años son exactamente 2007–2026 (el 21.º es 2005). Con la medida que se use, **ningún** septiembre
de 2007 a 2026 tuvo tanto hielo como **ninguno** de 1979 a 2006. Quien tenga menos de 20 años el 22 ene 2027 nació después del
22 ene 2007, así que su primer septiembre fue 2007 o después → el gancho es exacto (y sigue siéndolo mientras pase el tiempo,
salvo que un mínimo futuro supere 5.32 M km²).

## Tabla de afirmaciones

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| Gancho: "Si tienes menos de veinte años, nunca has vivido un septiembre con tanto hielo ártico como los de antes de 2007" | ✅ | NSIDC, "Arctic sea ice minimum ties for tenth lowest" (23 sep 2026) + datos crudos Sea Ice Index v4.0 (tabla de arriba) | "However, all years after 2006, from 2007 to 2025, have still had a lower minimum extent than all the previous years in the record from 1979 to 2006." / "The last 20 years, from 2007 to 2026, are the lowest 20 sea ice extents in the satellite record." | 2026 |
| "Este es ese hielo al final del verano" (el mínimo es en septiembre, al final del deshielo) | ✅ | NSIDC, mismo análisis | "...earlier than the 1981 to 2010 median minimum date of September 14." | 2026 |
| México = 1.96 millones de km² (etiqueta) | ✅ | SRE, Consulado de México en Austin | "La superficie territorial de México es de 1 964 375 km²" | vigente |
| Promedio 1981–2010 del mínimo: "más de tres Méxicos" (≈6.2 M km²; 6.22 ÷ 1.964 = 3.17) | ✅ | NSIDC (4.60 + 1.62 = 6.22); recalculado con datos crudos: promedio de mínimos diarios 1981–2010 = 6.19 M km² (3.15 Méxicos) | "It is also 1.62 million square kilometers (625,000 square miles) below the 1981 to 2010 average minimum extent" | 2026 (promedio 1981–2010) |
| "Este septiembre quedaban 4.6 millones de km²: poco más de dos" (4.60 ÷ 1.964 = 2.34); chip "12 sep 2026" | ⚠️ (solo por "Este septiembre") | NSIDC, 23 sep 2026; confirmado el 7 oct 2026; datos crudos: 5 días al 12 sep 2026 = 4.598 | "On September 12, Arctic sea ice likely reached its annual minimum extent of 4.60 million square kilometers (1.78 million square miles)." / "the minimum extent, which occurred on September 12, ended up as tenth lowest in the satellite record, tying with 2008, 2010, and 2025." | 2026 |
| "Falta un pedazo del tamaño de Alaska: más de tres cuartas partes de México" (1.62 ÷ 1.964 = 0.82) | ✅ | NSIDC, 23 sep 2026 | "...below the 1981 to 2010 average minimum extent, which is equivalent to about the loss in size of Alaska." | 2026 |
| "El hielo refleja del 50 al 70 % del sol. El mar oscuro, solo el 6" (chips en pantalla) | ✅ | NSIDC, "Quick facts about sea ice" | "The darker ocean reflects only 6 percent of the sun's energy and absorbs the rest, while sea ice reflects 50 to 70 percent of the incoming energy." (Nota: más abajo la misma página da cifras redondas distintas, "80 percent"/"about 10 percent"; la frase usada es la principal y la más conservadora.) | vigente (2026) |
| "Ese mar se calienta y derrite más hielo: un círculo vicioso" | ✅ | NSIDC, "Why sea ice matters"; NASA Earth Observatory, "Sea Ice" | "...the darker open oceans absorb more solar energy, raising temperatures and setting off a cycle of warming and further melting." / NASA: "The sun-warmed water then melts more ice. Over several years, this positive feedback cycle (the ice-albedo feedback) can influence global climate." | vigente |
| "Satélites lo miden desde 1979" | ✅ | NSIDC, "Sea ice" | "...since the start of the satellite record, which began in 1979." | vigente |
| "En Colorado lo cuentan" / tarjeta "NSIDC · Boulder, Colorado" | ✅ | encabezado de nsidc.org | "National Snow and Ice Data Center NSIDC a part of CIRES at the University of Colorado Boulder" | vigente |
| "Los veinte años con menos hielo son los últimos veinte" | ✅ | NSIDC, 23 sep 2026 + datos crudos | "In the 48-year-satellite record, the 20 lowest minimums have all occurred in the last 20 years." | 2026 |
| Gráfica de 48 mínimos con los últimos 20 en rojo | ✅ | datos crudos 1979–2026 = 48 años; NSIDC "nearly 48-year satellite record" | "The 2026 minimum shares the tenth lowest spot in the nearly 48-year satellite record with 2008, 2010, and 2025." | 2026 |
| "El peor fue 2012: menos de dos Méxicos" (3.39 ÷ 1.964 = 1.73); chip "17 sep 2012 · 3.39 millones de km² · récord" | ✅ | NSIDC, 23 sep 2026; datos crudos: 5 días al 17 sep 2012 = 3.387 | "...the satellite-era record minimum extent of 3.39 million square kilometers (1.31 million square miles), which occurred on September 17, 2012" | 2012 (dicho con su año) |
| "Como ya flota, al derretirse no sube el nivel del mar" (vaso con hielo) | ✅ | NASA Earth Observatory, "Sea Ice" (redirige a science.nasa.gov) | "Contrary to some public misconceptions, sea ice does not influence sea level. Because it is already floating in the ocean, sea ice is already displacing its own weight." (El efecto por salinidad es despreciable y NASA no lo cuenta.) | vigente |
| Cierre: "ese Ártico de tres Méxicos, si tienes menos de veinte, solo lo has visto dibujado" | ✅ | datos crudos: 3 Méxicos = 5.89 M km²; el máximo de 2007–2026 fue 5.12 (2009) | (cálculo propio con los datos de NSIDC; ver tabla del gancho). Observación: "tres Méxicos" es el promedio 1981–2010; los años justo antes de 2007 ya tenían ~2.7–2.9 Méxicos (2005: 5.32 M km²). La frase es verdadera tal como está porque habla del Ártico de tres Méxicos, no de "los de antes de 2007". | 1981–2010 / 2026 |
| Extensión = océano con al menos 15 % de hielo (nota del guion, no va en voz) | ✅ | NSIDC, "Quick facts" | "the most common cutoff is at 15 percent." | vigente |

## Correcciones necesarias

1. ⚠️ **"Este septiembre"** (línea "Hoy"): el shot se publica el **22 ene 2027**; para entonces "este septiembre" es ambiguo (puede
   entenderse como el que viene) y el dato no dice su año. Texto sugerido para la voz:
   > "En septiembre de 2026 quedaban cuatro millones seiscientos mil kilómetros cuadrados: poco más de dos."
   (El chip "12 sep 2026" ya está bien.) Si se ajusta la duración, también sirve "El septiembre pasado quedaban…", pero es mejor con el año.

Nada más: el gancho, todas las cifras, las cuentas (3.17 · 2.34 · 0.82 · 1.73 Méxicos) y lo que se ve en pantalla cuadran con NSIDC/NASA/SRE.
Opcional (no obligatorio): en `publicacion.md` mencionar que NSIDC advierte que la caída del mínimo se ha aplanado en los últimos 20 años
("there has been no significant decline in September minimum extents over the past two decades").

## Segunda ronda

- 29 oct 2026. Revisé la línea "Hoy" ya corregida en `guion.md` y `narracion.json`: «En septiembre de 2026 quedaban cuatro millones seiscientos mil kilómetros cuadrados: poco más de dos.»
- | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
  |---|---|---|---|---|
  | En septiembre de 2026 quedaban 4.6 millones de km²: poco más de dos Méxicos (4.60 ÷ 1.964 = 2.34) | ✅ | NSIDC, "Arctic sea ice minimum ties for tenth lowest" (23 sep 2026); datos Sea Ice Index v4.0 (5 días al 12 sep 2026 = 4.598) | "On September 12, Arctic sea ice likely reached its annual minimum extent of 4.60 million square kilometers (1.78 million square miles)." | 2026 |
- La única ⚠️ quedó resuelta. Las demás afirmaciones no cambiaron y siguen ✅.

VEREDICTO: APROBADO
