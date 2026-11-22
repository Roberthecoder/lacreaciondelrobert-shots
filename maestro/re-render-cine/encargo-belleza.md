# Pase de belleza (vuelta final, pedido de Robert el 22 nov 2026: «que quede hermoso y perfecto»)

Eres una sesión de Claude Code en la nube con el repositorio `Roberthecoder/lacreaciondelrobert-shots` (rama `main`).
Todos los shots ya tienen un pase a mano y la capa `cine.jsx` nueva (números en letra limpia, «?» chico). Las herramientas
automáticas dicen que están bien, pero **mirándolos todavía hay escenas que no están al nivel de 1Cell1Life**: dibujos que se
quedan en la mitad de arriba con el tercio de abajo vacío, números grandes fantasma detrás de otra cosa, chips y tarjetas que
se enciman, piezas chicas y planas. Tu trabajo es dejar cada shot **hermoso**, escena por escena, mirándolo con tus ojos.

## Cómo tomas trabajo (cola compartida; hay ~30 sesiones como tú)
Los grupos son `maestro/re-render-cine/nube/b001.txt` … (3 shots cada uno, en orden de publicación).
1. `git pull --rebase origin main`. Busca el grupo de número MÁS BAJO que no tenga `bNNN-tomado.md`.
2. Apártalo: crea `maestro/re-render-cine/nube/bNNN-tomado.md` con una línea (la hora), commit `Belleza: tomo bNNN [sin render]`
   y `git push origin main`. Si el push es rechazado: `git pull --rebase origin main`; si otro ya creó ese `-tomado.md`,
   **borra el tuyo** (resuelve tomando el de él) y busca el siguiente libre. Solo trabajas un grupo cuyo `-tomado.md` subiste tú.
3. Hazlo completo (abajo). Al acabar escribe `GRUPO TERMINADO` al final de `bNNN-hecho.md` y vuelve al paso 1.
4. Cuando no quede ningún grupo libre, termina.

## Preparación (una vez)
`cd motor && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci && cd ..`. Lee completos: la sección «Modo cine» de `CLAUDE.md`,
`maestro/recetas/estilo-cine.md`, `maestro/recetas/pase-a-mano-cine.md` y `maestro/re-render-cine/encargo-pase.md` (sus reglas
a–h y sus límites siguen valiendo). Saca y MIRA la hoja de cuadros de `shots/bio-04-fagos` («Shot Fagos narrado.dc.html») y de
`shots/fun-09-amanita`: ese es el nivel. Comandos con `NAVEGADOR=chrome` si existe Chrome; si no, sin esa variable.

## Para cada shot
1. Hoja de cuadros de TODO el shot: tres cuadros por escena (inicio+0.4 s, mitad, final−0.4 s), con
   `node motor/preview.mjs shots/<clave> "<salida de narracion.json>" /tmp/<clave>_a.png <tiempos> --cols 6 --ancho 220`
   (máx. ~18 tiempos por hoja; varias hojas si hace falta). Los tiempos salen de `window.OM_SCENES` del .dc.html. MÍRALAS con Read.
2. Juzga cada escena contra la referencia y arregla en el `.jsx` PROPIO del shot (el último de `from="…"`) todo lo que falle:
   - **Composición:** el sujeto llena el cuadro y su centro visual queda en el centro vertical (y≈850–1100). Nada de tercio de
     abajo vacío con todo amontonado arriba. Nada importante arriba de y≈200 (ahí va el logo) ni abajo de y≈1560.
   - **Escala:** el dibujo principal mide al menos ~650 px de ancho o ~950 de alto. Agranda con `<g transform>` y recalcula
     barras de escala en la misma proporción (regla g).
   - **Un solo punto de atención:** máximo un número grande a la vez, sin números o textos gigantes fantasma (atenuados) detrás
     de otra pieza; chips, tarjetas y etiquetas sin encimarse entre sí ni sobre el sujeto; las tarjetas de estudio chicas y arriba.
   - **Riqueza del dibujo:** piezas planas de un solo color ganan volumen con lo que ya tiene SVG: un `radialGradient` o
     `linearGradient` del mismo tono (claro arriba-izquierda, oscuro abajo-derecha), un brillo pequeño, una sombra suave debajo,
     textura sutil (líneas o puntos del mismo color) donde lo real la tiene. En lo microscópico, contornos claros con resplandor y
     rellenos apagados. Paleta sobria: el color de la escena y 1–2 acentos, sin saturados chillones.
   - **Vida:** algo cambia cada 2–4 s atado a la frase (entra una pieza, crece, gira, se ilumina); nada entra tarde ni se apaga antes.
   - **Texto legible:** nada menor de ~26 px; contraste claro sobre oscuro.
   - **Transiciones:** entre escenas, la anterior se disuelve en la siguiente sin dos composiciones encimadas que se vean sucias.
3. Comprueba: `python3 motor/kit/auditar-laminas.py shots/<clave>` → «sin láminas» y `python3 motor/kit/auditar-encuadre.py
   shots/<clave>` → «encuadre bien». Vuelve a sacar y a MIRAR los cuadros de cada escena tocada. Si el preview dice «No cargó el
   escenario» o hay errores nuevos, rompiste el JSX: corrígelo.
4. Commit SOLO de esa carpeta con mensaje `Belleza: <clave> [sin render]` (el `[sin render]` es obligatorio), junto con una línea
   en `maestro/re-render-cine/nube/bNNN-hecho.md`: `- <clave>: <qué escenas arreglaste y cómo>`. `git pull --rebase origin main`
   y `git push origin main`; comprueba con `git ls-remote origin refs/heads/main` que llegó.

## Límites (no se cruzan)
No cambies narracion.json, guion.md, verificacion.md, publicacion.md, los .dc.html, audio, tiempos ni duraciones. No agregues en
pantalla ningún dato, cifra, nombre o afirmación que el guion no diga (todo es verídico: solo dibujas lo que el guion ya dice). Deja
intacta la primera línea `// cine:oscurecido …` del .jsx. No toques kit-robert.jsx, cine.jsx, *-kit.jsx, *-piezas.jsx,
animations-v3.jsx ni support.js. No generes voz, no publiques nada, no renderices MP4 completos, no toques la rama voces/v4 ni la
Sala, no uses la API de Claude. Si un shot no se puede resolver, anótalo en tu `-hecho.md` y sigue.
Mismo rigor en el primer shot que en el último.
