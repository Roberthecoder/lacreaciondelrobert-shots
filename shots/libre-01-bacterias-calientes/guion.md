# Shot libre 01 · Bacterias calientes (chiste biotecnológico, mudo con sonidos)

Pedido de Robert en la Sala (3 nov 2026): «Un chiste biotecnológico animado, mudo (sí con sonidos pero sin voz). Bacterias en un
medio de cultivo. La broma es que las bacterias a su temperatura ideal están calientes y por eso se reproducen.»

**v2 (4 nov 2026).** Corrección de Robert: «esperaba que el chiste fuera más directo y no tanto un video de divulgación». Se recortó
a un chiste de **20.5 s** sin explicaciones, sin contador, sin reloj, sin barra de escala y sin letreros didácticos.

- Formato: mudo con efectos y música generada por código (`gen-audio.mjs`). Sin voz. `"duracion_libre": true`.
- Personaje: *Escherichia coli* (bacilo) en una caja Petri con agar. El dibujo es esquemático (caritas, bufandas, corazones).
- Tono: doble sentido blanco ("calientes" = a su temperatura ideal). Remate: ni pareja necesitan (se parten solas en dos).

## Escenas (v2)
| # | Tiempo | Qué se ve | Sonido | Letrero |
|---|---|---|---|---|
| 1 Refri | 0–4 s | Dentro del refri, al microscopio: 3 bacterias tiritando con bufanda, vaho y copos; termómetro en 4 °C | trémolo frío, castañeteo, zumbido del refri, ráfaga | **4 °C** |
| 2 Incubadora | 4–8 s | Una mano con guante saca la caja del refri y la mete a la incubadora; se cierra; el termómetro y el display suben a 37 °C | puertas, ¡pum!, bips que suben, bip-bip a 37 °C | **37 °C** |
| 3 Calientes | 8–13 s | Se les vuelan las bufandas, se sonrojan, sudan, corazones, guiños; las otras dos se van bailando y la del centro se queda sola; la vista llena la pantalla | tema "romántico" juguetón (órgano + sax), boings, tings | **Ya están calientes 🔥** (llama dibujada) |
| 4 Remate | 13–17 s | Rayón y silencio: mira a los lados… «?» … y se parte sola en dos, otra y otra (1 → 64): la pantalla se llena | rayón, "¿eh?", plop por fisión con tono que sube, golpe musical "ta-dá" | **…y ni pareja necesitan** |
| 5 Cierre | 17–20.5 s | `CierreMarca` con logo y Robert | acorde de cierre | — |

Regla de dibujo: nunca dos bacterias unidas antes de partirse; cada una se alarga, se estrecha al centro y se separa sola.

## Robert en pantalla (v2, 4 nov 2026 · tiempos reales de `bacterias.jsx`)
| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 (ya en cuadro 0) | 3.7 | 10_serio_molesto | `arriba-der` | Bacterias tiritando a 4 °C |
| 2 | 4.4 | 7.7 | 13_senalando_arriba | `abajo-der` | Las meten a la incubadora; sube a 37 °C |
| 3 | 8.4 | 10.1 | 04_bajando_lentes (pícaro) | `abajo-der` | Se vuelan las bufandas y se sonrojan |
| 4 | 10.3 | 12.8 | 05_sonriendo_dientes_uniformes (riendo) | `presentador-bajo` | «Ya están calientes 🔥» |
| 5 | 13.9 | 16.8 | 11_sorprendido | `presentador` (**grande**) | Se parte sola, otra y otra |
| 6 | 17.0 | 20.5 | 02_apuntando_camara | `CierreMarca robert=` | Tarjeta de cierre |

Total ≈ 17.2 s en pantalla (84 %), 6 apariciones, 6 poses distintas, nunca la misma dos veces seguidas. Ningún sticker tapa los
letreros (revisado con `motor/preview.mjs`).

## Fuentes (las confirma `verificacion.md`)
- Temperatura óptima de crecimiento de *E. coli* ≈ 37 °C; las incubadoras de laboratorio se ponen a 37 °C (Son y Taylor 2021).
- Refri a 4 °C o menos frena el crecimiento de bacterias (FDA 2023).
- Las bacterias se reproducen por fisión binaria: una célula se divide en dos iguales, sin pareja.
