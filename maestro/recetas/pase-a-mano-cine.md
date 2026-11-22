# Pase a mano del modo cine (pedido de Robert, 22 nov 2026)

Robert quiere que **todos** los shots queden como `bio-04-fagos` y `fun-09-amanita`: no solo con la capa automática del modo
cine, sino revisados escena por escena, "con el más minúsculo detalle". Este es el procedimiento. Se hace en orden de
publicación (`maestro/re-render-cine/lote1.txt` … `lote6.txt`, de arriba abajo) y el avance se anota en
`maestro/re-render-cine/pase-a-mano.md`.

## Qué ya hace sola la capa automática (`motor/kit/cine.jsx` + `motor/kit/aplicar-cine.py`)
Fondo oscuro con motas, subtítulo chico sin caja, sin sticker de Robert durante el video, cámara que avanza (10 %; 20 % en el
gancho), disolvencia larga entre escenas (no hay pantalla vacía al cambiar), la escena de «Pregunta» conserva detrás la escena
anterior, cielos y franjas de color oscurecidos, cama luminosa y mezcla nueva. No hay que rehacer nada de eso.

## Qué se hace a mano en cada shot
1. **Auditar:** `NAVEGADOR=chrome python3 motor/kit/auditar-laminas.py shots/<clave>` marca las escenas que se quedan casi
   vacías. Además, sacar una hoja de cuadros de TODO el shot (dos cuadros por escena) con `motor/preview.mjs` y mirarla.
2. **Arreglar cada escena marcada o floja** en el `.jsx` del shot. Criterios (son las reglas de «Modo cine» de `CLAUDE.md`):
   - Ninguna escena es lámina: si solo hay una tarjeta, un chip o un número, se trae a cuadro el sujeto del video (el mismo
     dibujo de otra escena del shot, quieto o atenuado) y la tarjeta se hace chica y se sube.
   - Nada aparece tarde: si el dibujo de una escena entra más de ~0.6 s después de que empieza, se adelanta.
   - Nada desaparece antes de tiempo: si un dibujo se apaga y la escena sigue, se deja atenuado hasta el final.
   - Gancho: antes del segundo 3 ya se ve hacia dónde va la historia (lo que sigue entra a cuadro, como la bacteria en fagos).
   - Un solo punto de atención y nada encima del sujeto (mover chips y etiquetas que lo tapen).
   - Texto dentro de dibujos: legible (si quedó claro sobre claro, cambiar el color en esa pieza).
3. **Límites que no se cruzan:** no se cambia el texto narrado ni los tiempos (la voz ya está grabada y no se genera otra); no
   se agrega en pantalla ningún dato nuevo (solo dibujos de cosas que el guion y `verificacion.md` ya dicen); no se publica nada.
4. **Comprobar:** volver a correr el auditor (debe decir «sin láminas») y volver a mirar la hoja de cuadros.
5. **Subir:** commit en `main` con `[sin render]`; luego, en una copia de `voces/v4`, `git checkout main -- motor .github "shots/<clave>" …`
   (conservando `motor/SOLO_VOZ_GUARDADA`), commit y push: GitHub renderiza con la voz guardada. Máximo ~20 shots por push
   si son del pase a mano; verificar con `git ls-remote` que el push llegó.
6. **Anotar** en `maestro/re-render-cine/pase-a-mano.md`: clave, qué escenas se arreglaron y cómo, en una línea.

## Ejemplos ya hechos
- `bio-04-fagos`: la bacteria entra en el gancho; la cama del paciente se ve desde el inicio del estudio; placa con calvas en la historia.
- `fun-09-amanita`: la amanita sigue detrás mientras se tachan los mitos.
- `amb-04-barrenador`: las charolas de pupas ya no se apagan antes de que llegue la avioneta.
- `cie-04-dedos-arrugados`: en «Berlín» sigue en pantalla la yema arrugada; tarjeta chica y arriba.
- `fun-11-moho-cortar`: los alimentos entran al empezar la escena, no 2.4 s después.
