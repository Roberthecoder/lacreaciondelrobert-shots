# Largo #00 · cómo está armado

Video horizontal 1920×1080 hecho con el mismo motor que los shots.

| Archivo | Para qué |
|---|---|
| `guion.md` | Guion de 20 escenas, fotos por escena y tabla "Robert en pantalla" |
| `narracion.json` | Las 42 líneas de la voz (una por subtítulo). **Sin `voz_aprobada`**: la voz espera el sí de Robert (~4,300 créditos) |
| `escenas.mjs` | Calcula cuánto dura cada escena a partir del guion (~170 palabras/min) y escribe `Largo 00 base.dc.html` |
| `largo-00.jsx` | Toda la animación: un mundo dibujado por escena + fotos reales que entran con movimiento + stickers de Robert |
| `gen-audio.mjs` | Música y efectos sintetizados (sin voz) |
| `assets/fotos/` | Fotos elegidas, restauradas (Real-ESRGAN + GFPGAN) y recortadas (`rembg`, fondo transparente) en WebP |
| `fuentes/elegidas/` | Las mismas fotos en JPG grande, restauradas pero sin recortar, con nombre `escena-NN_descripcion.jpg` |
| `fuentes/hoja_fotos_elegidas.jpg` | Hoja de contacto para revisar todas de un vistazo |

## Cambiar algo
- **Texto de la voz:** editar `narracion.json` y correr `node escenas.mjs` (recalcula los tiempos).
- **Revisar cuadros:** desde `motor/`: `NAVEGADOR=chrome node preview.mjs ../largos/000-que-es-la-creacion "Largo 00 base.dc.html" hoja.png 5,40,90 --cols 3 --ancho 600`
- **Render completo:** se hace solo en GitHub al subir cambios a `largos/**` (render automático). No renderizar el video completo en la computadora (tarda horas y el disco está lleno).
- **Horizontal:** el `.dc.html` define `window.K_ANCHO = 1920; window.K_ALTO = 1080`; `render.mjs`, `preview.mjs` y el kit lo leen. Sin eso todo sigue vertical 1080×1920.
- Los subtítulos terminan en y = 712 (fuera del tercio inferior).
