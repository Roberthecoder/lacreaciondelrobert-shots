# Verificación de hechos · Shot Científico #45 · La Tierra no es una esfera perfecta

- **Fecha:** 29 oct 2026. **Quién verificó:** subagente verificador independiente (no escribió el guion).

## Afirmaciones (voz y pantalla)

| # | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | La Tierra no es una pelota perfecta: está un poquito aplastada (achatamiento real ≈ 0.335 %). | ✅ | NASA NSSDC, Earth Fact Sheet — https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html | "Ellipticity (Flattening) 0.003353" | Valor WGS84 (1984), vigente |
| 2 | El punto más lejano del centro de la Tierra no es el Everest (gancho). | ✅ | NOAA Ocean Service, "What is the highest point on Earth as measured from Earth's center?" — https://oceanservice.noaa.gov/facts/highestpoint.html | "the summit of Chimborazo is over 2,072 meters" farther from Earth's center [than Everest's peak] | Página NOAA vigente (consultada 2026) |
| 3 | Como gira sobre sí misma, se ensancha en el ecuador y se aplana en los polos. | ✅ | NOAA Ocean Service (misma página) | "[Earth] is a bit thicker at the Equator due to the centrifugal force created by the planet's constant rotation" | Vigente |
| 4 | El diámetro ecuatorial mide unos 43 km más que el polar (pantalla: «≈ 43 km más»). | ✅ | NASA Earth Fact Sheet | "Equatorial radius (km) 6378.137" · "Polar radius (km) 6356.752" | WGS84 (1984), vigente |
|   | *Conversión:* 2 × 6,378.137 = 12,756.274 km; 2 × 6,356.752 = 12,713.504 km; diferencia = 42.77 km ≈ 43 km. | | | | |
| 5 | Es apenas un tercio de uno por ciento (pantalla: «≈ 0.3 %»). | ✅ | NASA Earth Fact Sheet | "Ellipticity (Flattening) 0.003353" | WGS84 |
|   | *Conversión:* 0.003353 = 0.335 % ≈ 1/3 de 1 %; también 42.77 / 12,756.27 = 0.335 %. | | | | |
| 6 | Vista desde el espacio, se ve redonda. | ✅ | Deducción directa de la cifra anterior (NASA Fact Sheet) | Con achatamiento de 0.335 %, un dibujo de la Tierra de 10 cm de ancho sería solo 0.34 mm más bajo que ancho: imperceptible a simple vista. | — |
| 7 | Medida desde el nivel del mar, la montaña más alta es el Everest. | ✅ | NOAA Ocean Service | Everest is "the highest point above global mean sea level" | Vigente |
| 8 | En 2020 midieron el Everest en casi 8,850 m sobre el nivel del mar (pantalla: «≈ 8,849 m (medición 2020)»). | ✅ (corregido: ya dice el año) | Medición conjunta China–Nepal, anunciada el 8 dic 2020 (The Himalayan Times; CNN) — https://thehimalayantimes.com/nepal/everest-2-0-worlds-tallest-peaks-revised-height-revealed-stands-at-8848-86m/ | "World's tallest peak's revised height revealed, stands at 8848.86m" | 2020 (más de 2 años) |
| 9 | Medida desde el centro de la Tierra, gana el Chimborazo. | ✅ | NOAA Ocean Service | "the summit of Chimborazo is over 2,072 meters" farther from Earth's center than Everest | Vigente |
| 10 | El Chimborazo es un volcán de Ecuador. | ✅ | Wikipedia, "Chimborazo" (resumen de la ficha del Global Volcanism Program) — https://en.wikipedia.org/wiki/Chimborazo | "is a stratovolcano in Ecuador and the Cordillera Occidental range of the Andes" | Vigente |
| 11 | Está casi sobre el ecuador, en la parte más ancha. | ✅ | NOAA Ocean Service; coordenadas en Wikipedia | "located just one degree south of the Equator where Earth's bulge is greatest" · "1°28′09″S 78°49′03″W" | Vigente |
| 12 | Su cima queda unos 2 km más lejos del centro que la del Everest (pantalla: flecha «≈ 2 km» más larga). | ✅ | NOAA Ocean Service | "over 6,800 feet [2,072 meters]" | Vigente |
| 13 | En el ecuador pesas alrededor de medio por ciento menos que en los polos (pantalla: «≈ 0.5 %»). | ✅ (cifra) | Wikipedia, "Gravity of Earth" (sección Latitude) — https://en.wikipedia.org/wiki/Gravity_of_Earth ; valores WGS84 de gravedad normal: 9.7803253359 m/s² (ecuador) y 9.8321849378 m/s² (polos) — https://en.wikipedia.org/wiki/Theoretical_gravity | "sea-level gravity increases from about 9.780 m/s2 at the Equator to about 9.832 m/s2 at the poles, so an object will weigh approximately 0.5% more at the poles than at the Equator." | WGS84 (1984), vigente |
|   | *Conversión:* (9.8322 − 9.7803) / 9.8322 = 0.53 % ≈ medio por ciento. | | | | |
| 14 | …y eso pasa "por ese mismo giro y esa panza" (rotación + abultamiento ecuatorial). | ✅ (corregido) | Wikipedia, "Theoretical gravity" / "Gravity of Earth" | "the gravitational acceleration at the equator is about 0.18% less than that at the poles due to being located farther from the mass center" · "the rotational component of change due to latitude (0.35%)" · centrifugal force counteracts gravity "up to a maximum of 0.3% at the Equator" | Vigente |
| 15 | Cierre: la Tierra se puso "panzona" de tanto girar (el abultamiento ecuatorial se debe a la rotación). | ✅ | NOAA Ocean Service | "a bit thicker at the Equator due to the centrifugal force created by the planet's constant rotation" | Vigente |
| 16 | Pantalla del gancho: la Tierra ensanchada se muestra exagerada (chip «exagerado»). | ✅ | — | Correcto avisar que está exagerado (el real es 0.335 %). | — |

## Problemas encontrados

Primera revisión: 2 ⚠️, ya corregidos en `guion.md` y `narracion.json` y verificados otra vez (29 oct 2026):

1. **#14, escena "Peso":** antes decía "por la misma forma". Ahora: "Y por ese mismo giro y esa panza, en el ecuador pesas un poquito menos que en los polos: alrededor de medio por ciento." ✅ Nombra las dos causas reales: el giro, ≈ 0.35 % ("the rotational component of change due to latitude (0.35%)"), y estar más lejos del centro, ≈ 0.18 % ("about 0.18% less ... due to being located farther from the mass center"). Juntas dan ≈ 0.53 %.
2. **#8, escena "Everest":** antes no decía el año. Ahora: "Medida desde el nivel del mar, gana el Everest: en 2020 lo midieron en casi ocho mil ochocientos cincuenta metros.", y en pantalla «≈ 8,849 m (medición 2020)». ✅ Coincide con la medición China–Nepal anunciada el 8 dic 2020 ("stands at 8848.86m"). Redondeo: 8,848.86 → 8,849 m, o sea "casi 8,850".

Ya no queda ningún ❌ ni ⚠️.

VEREDICTO: APROBADO
