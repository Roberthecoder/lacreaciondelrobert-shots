# Shots en otro idioma (chino para RedNote / Xiaohongshu)

Decidido por Robert el 16 nov 2026: los shots ya publicados se suben también a RedNote, con **letreros y subtítulos en chino
simplificado** y **la misma voz en español**. Misma cronología que las otras redes.

## Cómo funciona
- `gancho.js` se inyecta en la página del shot antes de React y engancha `React.createElement`: cambia cada texto (hijos de texto y
  props de texto como `texto`, `etiqueta`, `titulo`…) que esté en un diccionario `{español: chino}`. No toca la lógica (`pose`, `lado`…).
- `textos.mjs` recorre el video y saca todos los textos visibles; `filtrar.py` quita las palabras sueltas del subtítulo partido y
  los botones del reproductor → lista para traducir.
- `render.mjs ... --idioma shots/<clave>/zh/textos.json` renderiza con el diccionario.
- Workflow `render-idioma.yml`: al cambiar `shots/<clave>/zh/textos.json`, toma el audio del `<clave>_narrado.mp4` que ya existe en
  los Releases, renderiza y sube `<clave>_zh.mp4` al Release `idioma-zh`. No gasta voz.

## Reglas de traducción (zh/textos.json)
- Chino simplificado, natural (como lo escribiría un divulgador chino), con los números, unidades, fechas y cifras EXACTOS.
- Nombres científicos en latín, igual que en español (con sus marcas `_…_` si las trae). Marcas, nombres propios de personas y
  `@lacreaciondelrobert` / «La Creación del Robert» se quedan igual.
- **Subtítulos** (`Subtitulo.texto`): el componente parte por espacios. Escribir 2–4 trozos separados por un espacio; la parte
  resaltada va entre `*…*` y **sin espacios dentro** (un solo trozo), p. ej. `"这不是塑料： *是活的真菌。*"`.
- Letreros cortos (chips, etiquetas): igual de cortos que el original; si no cabe, abreviar sin perder el dato.
- Si un texto no se ve o no debe traducirse, se deja igual (valor = la misma cadena).
- Toda traducción la revisa otro agente (traducción de regreso al español + cotejo de cifras y nombres) antes del render.

## Textos para publicar (zh/publicacion.md)
Título de RedNote ≤ 20 caracteres, cuerpo ≤ 1000 caracteres (explicación breve, fuentes, «示意图» si el dibujo es esquemático),
3–6 etiquetas `#…` en chino y la pregunta para comentar. Firma: «我是 Robert，来自 La Creación del Robert 🌱».

## Portadas (RedNote, 3:4)
- `portada.mjs` + workflow `portadas-zh.yml`: portada 1080×1440 JPG por video (`<clave>_zh_portada.jpg` en el Release `idioma-zh`): elige un cuadro con color, detalle y Robert (sin transiciones ni tarjeta final), le pone el `标题` de `zh/publicacion.md` sin emojis en 1–2 renglones con la cifra o la idea clave en amarillo, y la marca del canal. Lanzar a mano (Actions → «Portadas en chino», `claves` vacío = las que falten) o, desde una rama, escribiendo claves, `faltantes` o `todas` en `portadas-pedido.txt` y haciendo push. Prueba local: `node motor/idioma/portada.mjs video_zh.mp4 <clave> salida.jpg --ver`.

## Publicación
RedNote no tiene API oficial para publicar: Robert sube los videos desde https://creator.xiaohongshu.com y programa la fecha
(定时发布). La sesión le entrega paquetes (MP4 + textos) en orden cronológico.
