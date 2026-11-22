# Receta · Documental horizontal "de cine" (modelo: Core video #00 «¿Qué es La Creación del Robert?»)

Fuente: sesión Core video #00 (`local_0ff66976…`, 30 oct–1 nov 2026), rama `largo-render/largo00-cine` (commit cc09317) y su
carpeta local. Copia del código en `maestro/plantillas/documental/`. Las correcciones de Robert de este video están en
`correcciones-de-robert.md` §Core #00 y son obligatorias para cualquier video de su historia.

## 1. Qué es
Documental 16:9 (1920×1080), en español, ~20–25 min, narrado con la voz clonada de Robert (cuando él la apruebe; ~18,800
caracteres), 100 % animado: fotos reales de su vida + ilustraciones de cine dibujadas en SVG, subtítulos, capítulos y Robert en
stickers. Estructura: capítulo 0 = gancho; capítulos 1…N = líneas de vida en paralelo; cierre = qué es y qué será el canal.

## 2. Orden de trabajo (no saltarse pasos)
1. **Historia primero, con Robert.** Fuentes: transcript del video 2023 (`historia_robert.txt`), CVs (`Downloads\1_CV_viejo…`,
   `2_CV_extendido…`), `series/shot-robert/datos.md` y lo que Robert dicte. Preguntar TODO dato dudoso (fechas, nombres, años) en una
   lista numerada; él contesta con `<!-- reply -->`. Nunca inventar ni "redondear" su historia: Robert la corrigió ~8 rondas.
2. **Guion por capítulos** en `guion_final.md` (`## <num> <título>` y una frase por renglón). Narración en primera persona, con
   nexos entre ideas (Robert: "que no parezca bullet point"), humor ligero, sin palabras que suenen mal ("robar"→"tomar prestadas",
   "bocazas"→"hablador sobre lo que amo", "me rendí"→"decidí inspirarme y aprender de otros", "inventé"→"implementé").
3. **Verificación** contra `datos.md`, CV y documentos (`verificacion.md`). Lo no confirmado se le pregunta.
4. **`escenas.js`**: cada capítulo `{num, titulo, sub?, tarjeta?, lineas:[{t, v?, robert?, d?}]}`. `t` = texto EXACTO del guion
   (lo revisa `validar.mjs`). Una línea sin `v` continúa el visual anterior. Tipos de `v`: `foto` (`foto`, `foco:[x,y]`, `lado`,
   `texto`, `sub`, `etiqueta`, `rot`, `z0/z1`), `fotos` (varias), `texto` (`grande`, `sub`), `numero`, `logo`, `marca`, `iconos`
   (`cols`, `items:[[icono, rótulo]]`, `tiempos`), `ilus` (`id` de una ilustración). `robert: [pose, lado, hasta]` con lado
   `abajo-der` | `abajo-izq` | `arriba-der`.
5. **Fotos**: elegir del archivo privado y de Facebook/OneDrive (Robert inicia sesión en el navegador integrado); restaurar (§4);
   `python preparar_fotos.py` (gira por EXIF, lado largo máx. 2000 px, escribe `fotos.js`). Logos oficiales de internet para
   instituciones (BeVisioneers, Fundación EPA, Rise, Equitech, Ruta Azul, Bosques Urbanos, Carrillo Biorefinery Lab), con
   `fuentes/logos/FUENTES.md`. Al repo público van SOLO las fotos que salen en el video.
6. **Ilustraciones de cine** (§3) para todo lo que no tiene foto real o donde la foto no corresponde (Robert prefiere ilustración
   fiel a foto equivocada: "esas fotos nomás ilustraste por ilustrar").
7. **Revisión de cuadros**: `NAVEGADOR=chrome node preview.mjs ../largos/<carpeta> "<archivo>.dc.html" hoja.png 10,60,120 --horizontal`
   (desde `motor/`). Hoja de contacto con un cuadro cada ~37 s de todo el video, y cuadro por cuadro en las escenas que Robert marcó.
   Buscar: textos fuera de su marco, solapamientos, objetos flotando, logos tapados, subtítulos encima de una animación, saltos
   repetidos ("bugs") y manos duplicadas.
8. **Render en GitHub** (§5). Nunca el render completo en la PC (se la traba; Robert: "deja de darme terminales aquí").
9. **Voz** solo cuando Robert apruebe la animación al 100 % y pague (avisar caracteres). Después: `tiempos` desde la voz real →
   re-render → mezcla (§6).
10. Subir a la Sala (sección Documentales, `largo: true`), mandar al chat y publicar con `publicar.yml` (YouTube 16:9).

## 3. Estilo visual "documental de cine" (lo que lo volvió profesional)
Robert, 30 oct: "súbele la calidad casi casi como si fuera un documental cinematográfico, sube detalle al máximo".
- **Ilustraciones** (`cine-kit.jsx` + `cine-cap*.jsx`, registradas como `ILUSC.<id> = {cam, dibuja}`): SVG 1920×1080 en función de
  `t`/`p`; **sin contornos gruesos**; volumen con degradados; **luz de ventana**; sombras suaves; **texturas reales** generadas con
  `texturas.py` (papel, madera clara/media/oscura/pino, tierra, aserrín, 8 cuadros de grano); **profundidad de campo** (capas con
  desenfoque al frente y al fondo, función `capa(prof)` que mueve cada plano distinto = paralaje); **bokeh y polvo en la luz**.
  Escenarios completos (cocina con azulejos de talavera, tianguis con lonas, patio con bugambilia), personajes con cabello con forma
  y brillos, objetos con detalle real (frascos de vidrio con reflejo, tapa de rosca o trapito de cuadros, etiqueta a mano, cada grano
  dibujado: "los frascos parecían de condimentos"). Datos científicos ilustrados (corte de composta del champiñón, gelatina vs agar con
  Koch y Fanny Hesse 1881, imán para separar monedas de plata).
- **Cámara**: cada ilustración define `cam {z0,z1,x0,x1,y0,y1,fx,fy}`; avance `k = 0.45p + 0.55·suave(p)`; "cámara en mano" casi
  imperceptible (`1.4·mece(T,7,.32)`, `1.1·mece(T,9,.27)`).
- **Fotos** (`Marco`): foto impresa con borde crema `#f3efe6` de 12 px, sombra doble (`0 50px 90px` + `0 14px 30px`), rotación
  −1.5° que respira, Ken Burns de 1.02→1.12 hacia `foco`, destello de luz que barre una vez, entrada desde abajo 0.9 s; detrás, la
  misma foto desenfocada 42 px a pantalla completa.
- **Fondo por capítulo** (`PALETA`): azul noche `#1b2c52`, verde `#2f8a3a`, ámbar `#c9a015`, morado `#4b2a9a`, cian `#0f8fb0`,
  magenta `#c2205f`, menta `#14a37c`, naranja `#d0661a`, café `#3a2a12`, cada uno con su acento claro; fondo = degradado radial
  oscurecido del color + bokeh + polvo + luz cálida diagonal.
- **Tipografía**: títulos y frases destacadas en **Fraunces** (serif; itálica 400 para subtítulos de escena, 600 para títulos);
  rótulos en **Space Mono** 700 mayúsculas con `letterSpacing 4` y barra de acento de 6 px; notas a mano en **Caveat**; subtítulos
  en **Archivo** 600 40 px. Cargar todas las letras al inicio (`Letras()`) para que el primer cuadro no salga con otra fuente.
- **Subtítulos**: centrados a 160 px del borde inferior, máx. 1480 px de ancho, trozos de ≤ 92 caracteres (~2 renglones)
  repartidos por proporción de caracteres, sombra triple negra; banda inferior de 300 px con degradado a 42 % negro.
  **Nombres científicos siempre en cursiva** (lista `CIENTIFICOS` en `doc-largo.jsx`; agregar los nuevos).
- **Tarjeta de capítulo** (3.2 s): entra desde negro, título serif, raya que se dibuja y luz que barre. Marca de capítulo arriba a la
  izquierda: logo 54 px + `NN  TÍTULO` en mono.
- **Robert**: stickers 330–420 px, entran 0.45 s desde abajo, salen 0.35 s, mecen ±2.5°, sombra doble. Nada de sticker sacando la
  lengua en momentos serios (Robert lo pidió quitar).
- **Acabado de película** (en ffmpeg, no en el navegador, porque en el navegador costaba 65 s de render por segundo de video):
  `colorbalance=rs=-0.03:bs=0.05:rm=0.01:bm=-0.01:rh=0.05:gh=0.015:bh=-0.04,eq=contrast=1.05:saturation=1.04,vignette=angle=PI/4.6,noise=c0s=10:c0f=t+u`
  (el pitch usa `saturation=1.05` y `c0s=7`).
- Escenas "quietas": "cuando dejas fijo un medio, no un fin, se agradecería ilustración adicional para no perder la atención".
  Máximo ~6 s sin que algo cambie.

## 4. Restauración de fotos
- Herramientas en `C:\Users\winusr\herramientas-ia\`: **Real-ESRGAN** (binario oficial Windows de `xinntao/Real-ESRGAN`, ~40 s por
  foto; nitidez) y **GFPGAN** (entorno Python `gfpgan-env` + `gfpgan-weights`; caras). Orden: recortar exacto (bordes de la foto
  dentro del cuadro del video 2023) → Real-ESRGAN ×4 → GFPGAN solo si hay caras (Real-ESRGAN las deja "pintadas") → `preparar_fotos.py`.
- Fotos de redes con baja resolución (historias de Instagram) se restauran igual; si no mejoran, se usan así (Robert lo acepta).
- Reconocimientos y documentos: pedir a Robert la versión HD en lugar de usar una borrosa ("el reconocimiento platino está todo borroso").

## 5. Render en GitHub Actions (rama `largo-render/<nombre>`)
- Workflow `render-largo.yml` (copia: `maestro/plantillas/documental/workflows/core00-render-largo.yml`): se lanza con push a
  `largo-render/**` que toque `largos/**`. Job `partir` calcula la duración y la parte en **pedazos de 20 s** (24 fps); job `render`
  con matriz (una máquina por pedazo; el #00 usó **67 máquinas**), `timeout 600` y reintento al instalar apt/Chromium (se colgaba),
  `motor/render.mjs … --horizontal --fps 24 --desde A --hasta B`; acabado de película por pedazo (`libx264 -preset medium -crf 20
  -maxrate 9M`); job `unir` con `ffmpeg -f concat -c copy` (sin recomprimir) → Release «Largo · <rama>» y artifact 3 días.
- Solo corre en el repo **público** (máquinas el doble de rápidas y minutos ilimitados). Robert aceptó lo público el 30 oct
  ("al final del día todo acabará siendo público").
- El motor de animación acepta escenas de máx. 300 s: `doc-largo.jsx` parte el largo en "Partes" de ≤ 280 s y el tiempo sigue continuo.
- `render_largo.mjs` (local, retomable) existe solo como respaldo.
- Una escena se puede re-renderizar sola sin repetir todo (pedazo con `--desde/--hasta`).

## 6. Voz y música (cuando Robert apruebe)
- Voz: `voz.mjs` (una petición con timestamps; caché por hash). Para español usar el modelo que Robert apruebe tras una prueba de
  20 s (en inglés eligió **eleven_v3**; v4 le sonó "casi británico").
- Tiempos: `tiempos.mjs` (§ver pitch) escribe `window.TIEMPOS_VOZ` (una duración por frase desde los tiempos por carácter) y el video
  se reacomoda solo. Sin voz, cada frase dura `caracteres/15 + 0.45 s` (mín. 2.2 s).
- Música generada por código (nada de catálogo), cama baja que sigue la historia; mezcla con sidechain para que la voz mande
  (ver `pitch-convocatoria.md` §Audio). Robert pidió usar el cálculo de volumen del sistema de shots (`motor/mezcla.json`: voz −16
  LUFS, pensado para escuchar con el volumen del celular al 50–70 %). **El master es el de `motor/mezcla.json` (final −7.1 LUFS), también en documentales**: Robert corrigió el −14 LUFS que se había
  inventado (el pitch de MIT Solve usó −14; no repetirlo). Siempre revisar las pautas de la Sala antes de poner un valor.

## 7. Lecciones del #00 (reporte de la sesión Core video #00, 1 nov 2026) — obligatorias para todo documental largo
Archivos en `largo-render/largo00-cine`, `largos/000-que-es-la-creacion/video/`: `escenas.js` + `guion_final.md` (los cuadra
`validar.mjs`), `cine-*.jsx` (ILUSC) y `cine-monologos.jsx` (dibujos de monólogos), `narrar_largo.mjs`, `tiempos_voz.mjs`,
`musica_largo.mjs`, `audio-kit.mjs`, `mezcla.json`. Workflows `render-largo.yml` y `voz-largo.yml`.

**Guion y animación (pedidos de Robert)**
- Todo monólogo (escena de texto largo) lleva un dibujo, aunque sea sencillo (`v.dibujo` en `EscenaTexto`); nunca texto solo varios segundos.
- Transiciones siempre con fundido suave (~0.55 s), nunca cortes; si dos títulos se cruzan, el que sale también se desvanece.
- Cero bugs: nada se repite en bucle. Al arreglar algo no cambiar su forma (el último salto debía medir igual que los demás).
- Nada encimado: ni objetos flotando o superpuestos, ni etiquetas ilegibles (fondo oscuro detrás), ni logos tapados.
- Stickers de Robert nunca tapan el subtítulo: con sticker abajo, el subtítulo se angosta (64 caracteres, 1040 px). Sobre fondos claros
  (logos), franja oscura detrás del subtítulo.
- Micología: el sustrato se coloniza completo (blanco) antes de que broten setas; el inóculo/grano se ve blanco; nada de micelio sobre
  líquidos (vinazas); nombres científicos en cursiva.
- Biografía: familia de 4 (hermana menor, mamá de piel clara). Fotos y certificados reales que da Robert van a `video/img/extra/` y se
  registran a mano en `fotos.js`.
- Partir una frase en dos líneas (para cambiar de imagen a media frase) no gasta créditos si el texto unido del capítulo queda idéntico.

**Render (nunca en la PC de Robert)**
- GitHub Actions en repo público: pedazos de 20 s en paralelo (máx. 20), acabado de película en ffmpeg por pedazo, unión `concat -c copy`,
  resultado a un Release (asset < 2 GB). ~25 min por render.
- apt-get se cuelga a veces: límite de 45 min por pedazo; instalación con límite de 10 min y 3 reintentos.
- Un commit vacío NO lanza el render (el filtro de rutas pide cambios en `largos/`).
- Pushes grandes: `git -c http.postBuffer=524288000 push`. Descargas que se cortan: `curl -C -` y comparar con el tamaño del asset.
- Con el repo de producción privado, los renders largos van al repo público `lacreaciondelrobert-largos` (ver `ESTADO-ADMIN.md`).

**Voz (ElevenLabs, Voice ID `uiCk6APPfsjnw3oUQzVo`, Eleven v4)**
- Una petición por capítulo, con `previous_text`/`next_text` y `with-timestamps`, en caché por hash. Corre en el repo privado.
  `voz/pedido.txt` = "saldo" o "generar" (cualquier otra cosa se rechaza). El paso que guarda la voz lleva `if: always()`.
- **Nunca cancelar una generación a medias** (se perdieron ~5,170 créditos así).
- La clave del repo no tiene `user_read` ni `speech_history_read`: el saldo se revisa en el navegador.
- Al 1 nov 2026: plan Creator, 231k créditos/mes, renueva el 28 nov. Un documental de 20 min ≈ 19,300 créditos (≈1 por carácter):
  avisar el costo antes de generar.

**Tiempos**: la animación se ajusta a la voz real con `window.TIEMPOS_VOZ` (alineación por carácter). Tarjetas de capítulo de 3.2 s en
silencio; 0.9 s de pausa al final de cada capítulo.

**Audio**
- Mezcla oficial `motor/mezcla.json` (sonido «5»): voz −16 LUFS, cama −6 dB por bandas, presencia +2.5 dB a 3 kHz, final −7.1 LUFS.
- Música con el mismo `audio-kit.mjs` de los shots: cama con un acorde por capítulo + arpegio pentatónico suave y continuo con un motivo
  distinto por capítulo + una nota en cada escena nueva. Solo la cama sonó "plano y aburrido" (Robert).
- Efectos por tipo de escena: golpe y subida en tarjetas de capítulo, clic de cámara en fotos, tics en contadores, brillo metálico en
  medallas y monedas, gotas en líquidos, notas que suben cuando algo crece.
- No usar `aevalsrc` de ffmpeg con expresiones largas (lentísimo): sintetizar en Node.

## 8. Estado del #00 al 1 nov 2026
Render v5 relanzado en Actions (31 oct). Robert mandó la última ronda de correcciones el 1 nov 17:41 (calzones a la vista en 0:59,
capítulo "concursos" con subcapítulo matemáticas, salto repetido en 8:57, frascos encimados en 9:07, nombre completo del proyecto
"De basura a comida: los hongos, héroes que combaten el hambre y la pobreza", "residuos como coco y olote", logo de Ruta Azul tapado).
Esos cambios están en la carpeta local de la sesión Core, sin commit. Voz pendiente.
