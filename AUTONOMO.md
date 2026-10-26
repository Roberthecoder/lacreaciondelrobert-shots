# Procedimiento diario (tarea programada de Claude Code)

Este archivo es la instrucción completa que sigue la tarea programada de Claude Code cada día para producir un shot nuevo. Está escrita para que una sesión nueva, sin memoria de las anteriores, la pueda seguir de principio a fin. Al terminar, la sesión se detiene: la voz y los videos finales los produce GitHub Actions solo después de que Robert apruebe desde Telegram.

Resumen del flujo completo:

1. Esta tarea escribe e ilustra el shot (dos versiones: narrada y sin voz), lo sube a una rama `shot/NNN-tema` y abre un PR. No genera voz.
2. El workflow `shot-diario.yml` renderiza la versión sin voz, saca una hoja de cuadros de la narrada y le manda a Robert un mensaje de Telegram con botones.
3. Robert toca Aprobar, Rehacer o Descartar. El worker de `telegram/` se lo pasa a GitHub y el workflow `aprobado.yml` hace el merge, genera la voz, renderiza la narrada y publica los dos MP4 en un Release `shot-NNN`.

## Reglas que no se negocian

- No gastar créditos: nunca correr `motor/narrar.mjs`, nunca definir `ELEVENLABS_API_KEY`, nunca pedir nada a ElevenLabs ni a la API de pago de Claude. La voz se genera solo en `aprobado.yml`.
- No renderizar videos completos aquí (tardan ~4 minutos cada uno). Solo `motor/preview.mjs` y, como prueba de humo, `motor/render.mjs ... --hasta 3`.
- Nada de claves en el repositorio. Nada de archivos pesados (mp4, wav generados) en los commits: `.gitignore` ya los excluye.
- Todo lo que se escribe para Robert (guion, PR, commits) va en español de México, sin jerga, sin guiones largos y sin emojis.
- Cada dato del guion lleva fuente publicada con autor y año o URL. Si algo es hipótesis, se dice como hipótesis.
- Leer antes de empezar: `CLAUDE.md` (sobre todo la sección "Ritmo, duración y color", que manda sobre las guías viejas), `ESTADO.md`, `referencias-externas/RECETARIO.md`, `motor/kit/LEEME.md` y la carpeta del shot más reciente en `shots/` (hoy `shots/002-moho-pan`, que es el modelo a imitar).

## Paso 0. Preparar el entorno

```bash
cd <carpeta del repositorio>
git fetch origin && git checkout main && git pull --ff-only origin main
cd motor && npm install --no-audit --no-fund && npx playwright install --with-deps chromium && cd ..
gh auth status
```

Si `npx playwright install` falla, intentar `NAVEGADOR=chrome` con un Chrome instalado (ver `ESTADO.md`). Si no hay ningún navegador, se puede construir el shot sin hoja de cuadros, pero hay que decirlo en el PR en una línea al principio: "Sin revisión visual: no hubo navegador".

## Paso 1. Revisar pendientes antes de empezar algo nuevo

```bash
gh pr list --state open --json number,headRefName,labels,title
gh pr list --state closed --label descartado --json number,headRefName,title --limit 20
```

- Si hay un PR abierto con rama `shot/` y etiqueta `rehacer`: ese es el trabajo del día. Leer sus comentarios (`gh pr view N --comments`), que incluyen la nota de Robert si la mandó por Telegram, corregir sobre la misma rama (`git checkout shot/NNN-tema`), seguir los pasos 5 a 9 que apliquen y hacer push a la misma rama. El workflow vuelve a avisar a Robert solo. Ese día no se empieza otro tema.
- Si hay PRs cerrados con etiqueta `descartado` cuyo tema no aparece en `historial/temas.json` con estado `descartado`, anotarlos ahí (id, título, serie, estado `descartado`) dentro del commit del shot de hoy. Así ese tema no se vuelve a proponer.
- Si ya hay 3 o más PRs abiertos de ramas `shot/` esperando decisión, no producir otro: dejar un comentario en el más reciente con "La tarea diaria esperó: hay N shots sin decidir" y terminar. Robert prefiere pocas cosas pendientes a una fila que no revisa.

## Paso 2. Número y nombre del shot

- Número: el mayor de las carpetas `shots/NNN-*` (sin contar `_demo-kit`) más uno, y también mayor que cualquier rama remota `shot/NNN-*` (`git branch -r | grep shot/`). Tres cifras: `003`, `004`.
- Nombre de carpeta: `shots/NNN-tema` con dos o tres palabras en minúsculas, sin acentos ni espacios (por ejemplo `003-cebolla-ojos`). La rama se llama igual con el prefijo: `shot/003-cebolla-ojos`. El workflow usa ese nombre para encontrar la carpeta, así que deben coincidir.
- El badge de la marca de agua (`MarcaAgua`) lleva ese número (`#03`).

## Paso 3. Elegir serie, formato y tema

1. Abrir `historial/temas.json`. Ver la serie de los últimos tres temas con estado distinto de `descartado`. Rotación: Shot Micológico, Shot Biotecnológico, Shot (general: cuerpo y casa), y de nuevo. Se elige la serie que lleve más tiempo sin usarse. Shot Lab (sin voz) solo entra como gemelo mudo, no como serie del día, porque cada día deben salir las dos versiones.
2. Abrir `referencias-externas/RECETARIO.md`, tabla "Por serie". Elegir el formato narrado principal de esa serie (rotando también entre sus formatos: no repetir el formato del último shot de la misma serie) y su gemelo mudo según la tabla "Parejas para cada tema".
3. Proponer 5 temas candidatos que cumplan todos estos puntos, y quedarse con el mejor:
   - Algo que el espectador ya vivió, tiene en el cuerpo o en la casa, o puede tocar. Si el tema es lejano, el gancho tiene que meterlo a "tú".
   - Se puede abrir con una frase "X no es Y: es Z" que corrija algo que la gente cree.
   - Tiene al menos un estudio real con año y lugar, y un dato extra sorprendente o chistoso.
   - Se puede dibujar con el kit (`motor/kit/LEEME.md`) y, si hace falta un mundo nuevo (hoja, suelo, intestino, placa de Petri), es razonable construirlo en un día.
   - No está en `historial/temas.json` ni se parece a uno que ya está (ni por organismo ni por fenómeno). El moho del pan y la hormiga zombi ya existen; el cepario y el micelio también.
   - Se puede contar con rigor en 160 palabras.
4. Anotar en el PR (paso 9) los otros cuatro candidatos en una línea cada uno, para que Robert pueda pedir uno de esos si descarta el elegido.

## Paso 4. Investigar

- Buscar fuentes publicadas con la herramienta de búsqueda web: artículos con revisión por pares, instituciones (universidades, USDA, OMS, INRAE, JGI), libros de texto reconocidos. Blogs y videos no cuentan como fuente.
- Para cada afirmación del guion debe existir una fuente concreta: autor o institución, año y URL. Los números (tamaños, tiempos, conteos, porcentajes) se copian tal cual de la fuente, con sus unidades, y se anota el rango si la fuente da rango.
- Si el organismo tiene nombre científico, confirmar el nombre vigente y escribirlo en cursiva. La morfología que se va a dibujar (forma de esporas, células, estructuras) también sale de la fuente, no de memoria.
- Si un dato no se puede confirmar con fuente, se quita del guion. Si el estudio real no aparece, se cambia de tema (volver al paso 3 con el siguiente candidato).
- Las fuentes se listan en `guion.md`, sección "Fuentes (verificadas el DÍA)", en el mismo formato que `shots/002-moho-pan/guion.md`.

## Paso 5. Escribir el guion narrado

Seguir al pie de la letra la sección "Ritmo, duración y color" de `CLAUDE.md`. Resumen de lo que se revisa al terminar:

- Entre 150 y 175 palabras (ideal ~160) y entre 900 y 1,050 caracteres: así la voz dura ~58 s. El shot 002 dio 930 caracteres para ~58 s.
- Frase 1 con la forma "X no es Y: es Z", hablándole a "tú". Nunca una frase que solo describe.
- Estructura con tiempos aproximados: gancho 0 a 4 s; cómo empieza 4 a 15; mecanismo, una idea por frase, 15 a 40; re-gancho con pregunta cerca del segundo 30; estudio real con año y lugar 35 a 50; dato extra sorprendente o chistoso 50 a 55; frase final que regresa al gancho 55 a 58.
- Frases cortas, de 2 a 4 s cada una (entre 6 y 14 palabras). Sin puntos suspensivos (ElevenLabs los entona raro). Números escritos con letra cuando se dicen ("dos centímetros y medio").
- Cada frase es una línea de `narracion.json` con su escena. Se escribe en `guion.md` como tabla: número, tiempo aproximado, voz, lo que se ve, piezas del kit (copiar la forma de `shots/002-moho-pan/guion.md`).
- Stickers previstos por escena; nunca los avatares 01 ni 09.

## Paso 6. Escribir el gemelo mudo

- Mismo tema y mismo mundo dibujado que la narrada (se reutiliza todo), en el formato mudo elegido en el paso 3.
- Duración total de 61 a 62 s: la suma de `dur` de las escenas en `window.OM_SCENES` (incluida la escena `Outro` de 3 a 4 s) debe quedar entre 61.0 y 62.0.
- Pensado como loop: el último cuadro conecta con el primero o trae un giro que invite a verlo otra vez.
- Algo nuevo cada 1.5 a 3 s, sobre un golpe de la música; nada quieto más de 4 s. Cuando el tema lo permita, la música sale de los datos (cada rama, cada división, cada latido es una nota o un golpe en `gen-audio.mjs`).
- Texto en pantalla mínimo: capítulo o pregunta fija arriba, etiquetas (nombre común y *científico*) y barra de escala. Sin tiempos inventados: si no hay fuente para "3 días", no se escribe "3 días".
- Se describe en `guion.md` como tabla: tiempo, etapa, lo que pasa, sonido.

## Paso 7. Construir la carpeta del shot

Imitar `shots/002-moho-pan`. Contenido de `shots/NNN-tema/`:

| Archivo | De dónde sale |
|---|---|
| `support.js`, `animations-v3.jsx` | Copiar de `shots/002-moho-pan/` (el motor; no se modifica) |
| `kit-robert.jsx` | Copiar de `motor/kit/kit-robert.jsx` (siempre la versión del kit, que es la más nueva). Si el tema necesita un mundo nuevo, se agrega al kit en `motor/kit/kit-robert.jsx`, se documenta en `motor/kit/LEEME.md` y entonces se copia |
| `assets/logo_iso_dna_gold.svg`, `assets/stickers/` | Copiar de `shots/002-moho-pan/assets/` (solo los stickers que se usan; nunca 01 ni 09) |
| `tema-comun.jsx` | Lo que comparten las dos versiones: el mundo, las etiquetas, las utilidades |
| `tema-narrado.jsx` | Versión narrada. Define el componente y termina con `window.TemaNarradoApp = TemaNarradoApp;` (sin esa línea el componente no aparece). Escenas y subtítulos con `Subtitulo` usando `idx` en el orden de `narracion.json` |
| `tema-mudo.jsx` | Gemelo mudo. Termina con `window.TemaMudoApp = TemaMudoApp;` |
| `Shot Tema base narrada.dc.html` | `OM_SCENES` con una escena por bloque de voz (nombres sin acentos ni espacios) y duraciones estimadas; `x-import` con `from="./animations-v3.jsx ./kit-robert.jsx ./tema-comun.jsx ./tema-narrado.jsx"` |
| `Shot Tema Mudo.dc.html` | `OM_SCENES` con las escenas del mudo (la última se llama `Outro`), suma 61 a 62 s |
| `gen-audio.mjs` | Música y efectos sintetizados, sin costo, leyendo `OM_SCENES` del html que recibe como argumento. Debe aceptar `node gen-audio.mjs <archivo.dc.html> <salida.wav>` y escribir la salida relativa a su propia carpeta, como el del shot 002. Lo llama tanto el workflow (versión muda) como `narrar.mjs` (fondo de la narrada) |
| `narracion.json` | Con estos campos: `titulo`, `numero`, `dcHtml` (base narrada), `salida` (html narrado que generará `narrar.mjs`), `sinVoz` (html del mudo), `sinVozAudio` (ruta del wav del mudo, por ejemplo `assets/mezcla_mudo.wav`), `lineas` (una por frase: `escena` y `texto`) |
| `guion.md` | Encabezado con serie, formato, duración y estado "propuesto, sin voz"; tabla de la narrada; fuentes; tabla del mudo; descripción para publicar (guion completo, fuentes y "el dibujo es esquemático" cuando aplique) |

Detalles que ya costaron tiempo (ver "Notas técnicas" de `CLAUDE.md`): no usar `<video>` dentro del shot; los nombres de escena de `OM_SCENES` son los que usa `CUES` en el jsx; `Escala` en y = 1430 y subtítulo en `bottom: 560`, fuera del tercio inferior; sticker `arriba-der` no va encima de números gigantes ni chips centrados; fondo oscuro solo en escenas microscópicas o internas, el resto con los colores brillantes de la marca (`KC`).

## Paso 8. Revisar cuadros y corregir

```bash
cd motor
node ficha.mjs ../shots/NNN-tema
node preview.mjs ../shots/NNN-tema "Shot Tema base narrada.dc.html" ../shots/NNN-tema/revision/hoja-narrada.png 0,0.5,3,8,14,20,26,32,38,44,50,56,60 --cols 4
node preview.mjs ../shots/NNN-tema "Shot Tema Mudo.dc.html" ../shots/NNN-tema/revision/hoja-mudo.png 0,0.5,4,8,14,20,26,32,38,44,50,56,61 --cols 4
node ../shots/NNN-tema/gen-audio.mjs "Shot Tema Mudo.dc.html" assets/mezcla_mudo.wav
node render.mjs ../shots/NNN-tema "Shot Tema Mudo.dc.html" prueba.mp4 --hasta 3 && rm -f prueba.mp4
```

Mirar las dos hojas de contactos (abrir el PNG con la herramienta de lectura de imágenes) y comprobar, cuadro por cuadro:

- `preview.mjs` no reporta "Errores de página". Si reporta, es un error del jsx: corregir antes de seguir.
- En el cuadro de 0.5 s ya hay movimiento o cambio respecto al de 0 s (sin tarjeta de título quieta).
- Primera y última escena: la misma imagen, transformada. Barra de escala visible en las escenas con cámara.
- Subtítulos de una sola línea, con una palabra resaltada, fuera del tercio inferior; sin texto cortado ni fuera de cuadro.
- Logo con badge `#NN` arriba a la izquierda. Stickers en una esquina libre, sin tapar información.
- Especies en cursiva en las etiquetas. Morfología como dice la fuente.
- Fondo oscuro solo en lo microscópico o interno.
- La suma de `dur` del mudo está entre 61.0 y 62.0 s. La suma de duraciones estimadas de la base narrada está entre 58 y 66 s (la voz real la ajusta después).

Corregir y repetir hasta que todo pase, con un máximo de 4 vueltas. Si en la cuarta vuelta algo sigue fallando, se deja el shot como está, se describe el problema en el PR en una sección "Pendiente de corrección" y se sigue adelante: Robert decide con el botón Rehacer.

## Paso 9. Registrar, subir y abrir el PR

1. Agregar el tema a `historial/temas.json`: `id` (nombre de la carpeta sin número), `titulo`, `serie`, `numero`, `estado: "propuesto (PR)"`, `versiones` con los dos formatos. Más los descartados del paso 1, si hubo.
2. Actualizar `ESTADO.md` solo en la línea "Último shot producido por la tarea diaria: NNN-tema (fecha)". Nada más.
3. Commit y push:

```bash
git checkout -b shot/NNN-tema
git add shots/NNN-tema historial/temas.json ESTADO.md motor/kit   # motor/kit solo si se agregó un mundo
git status   # confirmar que no entran mp4, wav ni claves
git commit -m "Shot NNN: <título corto>"
git push -u origin shot/NNN-tema
```

4. Abrir el PR con `gh pr create --base main --head shot/NNN-tema --title "Shot NNN: <título>" --body-file cuerpo.md`. El cuerpo lleva, en este orden: serie y formatos; el guion narrado completo (texto corrido); las fuentes; el resumen del mudo; los otros cuatro temas candidatos; lo pendiente de corrección si lo hubo; y la línea "Costo estimado de ElevenLabs al aprobar: N caracteres" (N sale de `ficha.mjs`).
5. Confirmar con `gh pr view --json url` que el PR existe. A partir de aquí el workflow `shot-diario.yml` se encarga del render sin voz y del aviso a Robert.
6. Terminar la sesión. No esperar la respuesta de Robert, no generar voz, no renderizar completo.

## Si algo falla

| Problema | Qué hacer |
|---|---|
| No hay conexión para buscar fuentes | No inventar fuentes. Elegir un tema cuyas fuentes ya estén en el repositorio (`referencias/`, guiones anteriores) o terminar sin producir y dejar un issue: `gh issue create --title "Tarea diaria sin búsqueda web (fecha)"` |
| `npm install` o Playwright fallan | Seguir sin hoja de cuadros y avisarlo al principio del PR; el workflow sí tiene navegador y sacará la hoja |
| `preview.mjs` dice "No cargó el escenario" | Casi siempre falta la línea `window.XApp = XApp;` al final del jsx, o un nombre de escena en `CUES` no existe en `OM_SCENES`, o un error de sintaxis en el jsx. Revisar los errores que imprime |
| Babel o React no cargan | Debe ser `@babel/standalone` 7.29.0 exacto (`motor/package.json` ya lo fija); no cambiar versiones |
| `gh pr create` falla | Hacer el push de todos modos y crear un issue con el título "Abrir PR a mano para shot/NNN-tema" y el cuerpo del PR dentro, para que Robert lo abra desde el celular |
| El tema elegido resulta estar casi repetido al investigar | Volver al paso 3 con el siguiente candidato; no forzarlo |
| La sesión se corta a la mitad | Lo que quede en una rama `shot/` sin PR se retoma al día siguiente en el paso 1: `git branch -r | grep shot/` muestra ramas sin PR (`gh pr list` no las tiene) |

## Criterios de calidad (lista final antes del PR)

- [ ] Tema nuevo, no repetido ni parecido a `historial/temas.json`.
- [ ] Serie y formato rotados según el paso 3; pareja narrado y mudo del RECETARIO.
- [ ] Guion narrado de 150 a 175 palabras y 900 a 1,050 caracteres, frase 1 con "X no es Y: es Z" y "tú", re-gancho con pregunta, estudio con año y lugar, dato extra, cierre que regresa al gancho.
- [ ] Todas las afirmaciones con fuente (autor o institución, año, URL) en `guion.md`; hipótesis marcadas como hipótesis; especies en cursiva y con nombre vigente.
- [ ] Mudo de 61.0 a 62.0 s, en loop, algo nuevo cada 1.5 a 3 s, sin tiempos inventados.
- [ ] `preview.mjs` sin errores en las dos versiones; movimiento antes del segundo 1; subtítulos fuera del tercio inferior; escala visible; badge `#NN`; stickers correctos (nunca 01 ni 09).
- [ ] `narracion.json` con `titulo`, `numero`, `dcHtml`, `salida`, `sinVoz`, `sinVozAudio` y `lineas`; `node motor/ficha.mjs` lo lee sin avisos.
- [ ] `gen-audio.mjs` corre con los dos argumentos y produce el wav del mudo.
- [ ] `render.mjs --hasta 3` del mudo termina sin error.
- [ ] `temas.json` actualizado; sin mp4, wav ni claves en el commit.
- [ ] Rama `shot/NNN-tema` empujada y PR abierto con guion, fuentes, candidatos y costo estimado.
- [ ] No se generó voz ni se tocó ElevenLabs.
