# Shot libre 01 · Bacterias calientes (chiste biotecnológico, mudo con sonidos)

Pedido de Robert en la Sala (3 nov 2026): «Un chiste biotecnológico animado, mudo (sí con sonidos pero sin voz). Bacterias en un
medio de cultivo. La broma es que las bacterias a su temperatura ideal están calientes y por eso se reproducen.»

- Formato: mudo con efectos y música generada por código (M4 · Ciclo, en loop). Sin voz, sin subtítulos narrados: solo letreros cortos.
- Duración: 61–62 s (más de 1 min para monetizar). Vertical 1080×1920.
- Personaje: *Escherichia coli* (bacilo, la "bacteria de laboratorio" más común) en una caja Petri con agar.
- Tono: chiste de doble sentido blanco ("calientes" = a su temperatura ideal), sin nada explícito. El remate científico: ni siquiera
  necesitan pareja (se dividen solas: fisión binaria).

## Escenas (letreros en pantalla)
| # | Tiempo | Qué se ve | Letrero |
|---|---|---|---|
| 1 Gancho | 0–4 s | Caja Petri saliendo del refri; una bacteria tiritando con bufanda; termómetro en 4 °C; se asoma Robert serio | **4 °C** |
| 2 Frío | 4–12 s | Bacterias quietas, temblando, con dientes castañeteando; nadie se divide | **En el refri casi no crecen** |
| 3 Incubadora | 12–20 s | Robert mete la caja a la incubadora, cierra la puerta; el termómetro sube 4 → 37 °C | **Incubadora: 37 °C** |
| 4 Calientes | 20–30 s | Las bacterias se sonrojan, sudan, se quitan la bufanda; música "romántica"; corazones; Robert pícaro | **37 °C: su temperatura ideal** · **Ya están calientes 🔥** |
| 5 Giro | 30–40 s | Una bacteria guiña… y se parte sola en dos (fisión binaria); las demás también, sin buscar pareja; Robert sorprendido | **Ni siquiera necesitan pareja** · **Fisión binaria: una se parte en dos** |
| 6 Explosión | 40–52 s | Contador 1 → 2 → 4 → 8 … ; reloj con "cada ~20 min"; la colonia crece y, tras una noche en la incubadora, se ve a simple vista | **En condiciones ideales, se duplican cada ~20 min** · **De 1 a más de mil millones en 10 h (en teoría)** |
| 7 Remate y loop | 52–58 s | Robert abre la incubadora a la mañana siguiente, ve la caja llena de colonias, la regresa al refri; vuelven a tiritar (loop al inicio) | **Al refri, que se enfríen** |
| 8 Cierre | 58–61.5 s | Tarjeta con logo y Robert | — |

## Robert en pantalla
| Entra | Sale | Pose | Lado | Reacciona a |
|---|---|---|---|---|
| 0.0 | 4.0 | serio | gancho | Bacterias congeladas en el refri |
| 12.0 | 18.0 | señalando | abajo | Mete la caja a la incubadora |
| 24.0 | 30.0 | riendo | presentador (grande) | "Ya están calientes" |
| 32.0 | 38.0 | sorprendido | abajo | Se parten solas |
| 44.0 | 50.0 | pensativo | abajo | El contador explota |
| 52.0 | 58.0 | señalando | abajo | Las regresa al refri |
| 58.0 | 61.5 | apuntando a cámara | cierre | Tarjeta de cierre |
Total ≈ 33.5 s en pantalla, 7 apariciones, 5 poses distintas.

## Fuentes (las confirma `verificacion.md`)
- Temperatura óptima de crecimiento de *E. coli* ≈ 37 °C.
- A 4 °C (refrigerador) *E. coli* prácticamente no crece.
- Las bacterias se reproducen por fisión binaria (asexual): una célula se divide en dos idénticas.
- En condiciones ideales de laboratorio, *E. coli* duplica su número cada ~20 min.
- 30 duplicaciones (10 h a 20 min) = 2^30 ≈ 1,070 millones (cálculo teórico; en la práctica se frena por falta de nutrientes).
- Las incubadoras de laboratorio para cultivar bacterias se ponen a 37 °C.

## Robert en pantalla (tiempos reales de la animación, `bacterias.jsx`)
Duración total 61.5 s (escenas: Gancho 0–4 · Frío 4–12 · Incubadora 12–20 · Calientes 20–30 · Giro 30–40 · Explosión 40–52 ·
Remate 52–58 · Cierre 58–61.5). Ningún sticker tapa letreros, el termómetro ni la acción principal (revisado cuadro por cuadro).

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 (ya en cuadro 0) | 3.9 | 10_serio_molesto | `arriba-der` (gancho) | Bacterias tiritando a 4 °C |
| 2 | 7.0 | 10.4 | 03_aburrido_manos_mejillas | `abajo-der` | «En el refri casi no crecen» (nadie se divide) |
| 3 | 12.4 | 18.0 | 13_senalando_arriba | `abajo-der` | Mete la caja a la incubadora; sube a 37 °C |
| 4 | 20.6 | 23.5 | 04_bajando_lentes | `abajo-der` | Se quitan la bufanda y se sonrojan (pícaro) |
| 5 | 24.0 | 29.9 | 05_sonriendo_dientes_uniformes | `presentador-bajo` (**grande**) | «Ya están calientes» |
| 6 | 32.0 | 38.0 | 11_sorprendido | `abajo-der` | Se parten solas (fisión binaria) |
| 7 | 44.0 | 50.0 | 06_pensativo_menton | `abajo-der` | El contador explota (1 → mil millones) |
| 8 | 52.4 | 57.7 | 13_senalando_arriba | `abajo-der` | Abre la incubadora y las regresa al refri |
| 9 | 58.0 | 61.5 | 02_apuntando_camara | `CierreMarca robert=` | Tarjeta de cierre |

Total ≈ 42.5 s en pantalla (69 %), 9 apariciones, 8 poses distintas, nunca la misma dos veces seguidas.
Las acciones de "Robert mete/saca la caja" las hace una mano con guante morado (los stickers son de medio cuerpo).

_Render relanzado el 3 nov 2026 (la detección se trababa al bajar el repo)._
