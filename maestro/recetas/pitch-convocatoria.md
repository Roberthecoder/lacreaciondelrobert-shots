# Receta · Video pitch para convocatorias (modelo: Fungi Mati · MIT Solve 2027 Global Climate Challenge)

Fuente: sesión "MIT Solve: corregir formulario y video pitch" (`local_2437dd8f…`, 31 oct–1 nov 2026), rama
`largo-render/pitch-solve` (commit 1d56a1f), clon `C:\Users\winusr\lacreacion-lotes\pitch-solve`. Copia del código en
`maestro/plantillas/documental/` (archivos `cine-pitch.jsx`, `escenas.js`, `musica.mjs`, `tiempos.mjs`, `voz/voz.mjs`,
`youtube/*`, `workflows/pitch-*.yml`, `ejemplo-pitch/*`). Resultado: MP4 4K + 1080p en el Release `pitch-solve`, subido a
YouTube como **no listado**, enlace pegado en la solución 122850 de solve.mit.edu.

## 1. Formato
- Horizontal 1920×1080 renderizado a **4K (`--escala 2` = 3840×2160)**, 30 fps, **máx. 3:00** (el script frena en 178.5 s).
- Idioma de la convocatoria (inglés), voz clonada de Robert, subtítulos en inglés.
- Mismo estilo de cine del Core #00 (`documental-cine.md` §3) pero **sin stickers caricatura**: para jurados, Robert sale en sus
  fotos reales. Robert pidió "detalles ultra, ultra máximo, tiene que ser espectacular".
- 10 capítulos sin tarjetas (`tarjeta: false`): problema → quién soy → cómo funciona → piloto → IA → investigación → granja → metas año 1
  → qué pido a la convocatoria → significado del nombre y cierre que regresa a la imagen inicial (abre y cierra en el paisaje agavero,
  ahora con setas creciendo).

## 2. Guion (orden fijo)
1. Leer completas las respuestas ya aprobadas del formulario (documento de Claude Docs
   https://claude.ai/artifact/GNHKc4QknsGw2XKJcvYWdq). **El video y el formulario deben decir exactamente lo mismo**: cada cambio en
   uno se refleja en el otro (p. ej. "four to six weeks", el tutor de IA, "spent coffee grounds").
2. Guion recortado a ~2:55 (`guion_3min.md` → `guion_final.md`); cada frase = una línea de `escenas.js` (texto idéntico).
3. Verificación (`verificacion.md`, tabla con año del dato) y `VEREDICTO: APROBADO`.
4. Storyboard escena por escena (`storyboard.md`) que Robert aprueba ANTES de renderizar.
5. Fotos de internet solo con licencia libre (Wikimedia Commons CC BY / CC BY-SA), metadatos guardados en `fuentes/web/meta_*.json`
   y créditos en `CREDITOS.md`, en la tarjeta final y en la descripción de YouTube. Si no hay foto libre (bagazo), se dibuja.
6. Fotos de equipo nuevo: de las tiendas donde Robert lo compró (Mercado Libre, Etsy, Vevor), no equipo parecido inventado.

## 3. Correcciones de Robert que definieron la versión final
- Voz: **eleven_v4 sonaba "casi británico"** → se probó **eleven_v3** ("suena a mí, pronuncia mejor") y se usó v3.
- Pronunciación: el texto que se manda a la voz no es el del subtítulo: `Fungi Mati` → **"Fúngui Máti"** (se pronuncia en español;
  Robert eligió la prueba C entre A "fungi", B "funji", C "fungui"); `Mexico` → **"México"** con acento (para que no diga "Mesico").
  `tiempos.mjs` hace ese reemplazo al alinear.
- Frasco central: había un frasco contaminado; debe ser micelio sano (foto de Robert `foto_frasco_central.jpg`).
- Tutor de IA: no "with my own materials" (se malinterpreta) ni "lo hice nomás por la convocatoria": "built on ChatGPT, with guidance
  and early support from Equitech Futures". Su plataforma real: **Botpress con GPT, en Google Sites** (no Google Slides).
- "Dr. Danay Carrillo Nieves" (Robert quiere dar crédito a la doctora; se dejó Dr., no PhD) y mostrar el **logo del Carrillo
  Biorefinery Lab** cuando se menciona el laboratorio.
- "Bagazo de café" / pulpa → **spent coffee grounds**.
- Transición laboratorio → granja demasiado brusca: usar un conector ("Meanwhile, …").
- Equipo: olla de presión **All American** (no vaporera con cajas Petri), **campana de flujo FFU HEPA H14 2×4 ft**, tienda de
  fructificación Vevor.
- "Qué pido a Solve": investigar qué ofrece realmente la convocatoria; quedaron 3 pedidos concretos (medir impacto, conexiones con
  industria tequilera/alimentos, mentores que hayan escalado un producto bio).
- Música: un microcorte en 2:28–2:29 rompió la calma → la música ahora funde acordes 1.6 s y el bajo desliza sin golpes (§4).

## 4. Audio (fórmula exacta)
- **Voz** (`voz.mjs`): `POST /v1/text-to-speech/uiCk6APPfsjnw3oUQzVo/with-timestamps` (mp3 44.1 kHz 128 kbps), modelo según
  el nombre del archivo (`narracion-v2@eleven_v3.txt`), caché por hash sha1 de voz|modelo|texto (si no cambia el texto, no gasta).
  Se lanza con push de `voz/*.txt` (workflow `voz-pitch.yml`) y el bot guarda mp3+json en la rama. Prueba de 20 s antes del total,
  diciendo el costo en caracteres.
- **Tiempos** (`tiempos.mjs`): localiza cada línea en la voz por sus primeros 14 caracteres, duración = inicio de la siguiente − inicio
  propio; voz entra a 0.45 s; si el total pasa de 178.5 s acelera hasta ×1.06 (`atempo`, sin cambiar tono). Escribe `tiempos.js`
  (`window.TIEMPOS_VOZ`) y `voz_info.json` (`vel`, `retraso`, `total`).
- **Música** (`musica.mjs <wav> <dur> <inicio_solución>`): 48 kHz estéreo, generada por código. Problema en **re menor**
  ([D,A,D,F], [B♭…], …) y desde el inicio de la solución acordes abiertos **Fa–Do–Re m–Si♭**, cierre en Fa add9. Acorde cada 6.4 s con
  cruce suave de 1.6 s; pad de 3 osciladores desafinados (−0.07/0/+0.06 semitonos) con armónicos 0.28/0.12, paneo por nota; bajo
  de un solo oscilador que desliza 0.5 s entre raíces (sin eco); brillo agudo que crece tras la solución; reverberación de 5 ecos
  cruzados; fade-in 2.5 s, fade-out 4 s; normaliza a pico 0.7.
- **Mezcla** (job `unir`): `[voz] atempo=vel, aresample=48000, adelay=retraso, apad` → sidechain sobre la música
  `volume=0.55, sidechaincompress=threshold=0.04:ratio=4:attack=25:release=400` → `amix normalize=0` →
  **`loudnorm=I=-14:TP=-1.5:LRA=11`** (estándar YouTube) → AAC 320 kbps.

## 5. Render
- `render-largo.yml` de la rama (copia `workflows/pitch-render-largo.yml`): se lanza al cambiar `render.txt`; pedazos de **10 s**,
  máx. 20 máquinas a la vez, `--horizontal --fps 30 --escala 2`, 2 intentos por pedazo; acabado de película por pedazo
  (`saturation=1.05`, `noise=c0s=7`, `libx264 -preset slow -crf 17 -maxrate 45M -bufsize 90M -profile high -level 5.1 -g 60`);
  unión sin recomprimir; versión 1080p con `scale=1920:1080:flags=lanczos -crf 18`; ambos al Release `pitch-solve`.
- `revisar-pitch.yml`: al cambiar la animación saca capturas a la mitad de cada escena en `revision/` (revisar sin render completo).
- `motor/render.mjs` de la rama tiene `--escala`, `--desde`, `--hasta`, `--gpu` (main aún no; copia en
  `maestro/plantillas/documental/motor/render-con-escala-desde-gpu.mjs`).

## 6. YouTube y formulario
- `youtube-pitch.yml` + `subir.py`: toma el MP4 4K del Release y lo sube con la app de YouTube del publicador (secretos
  `YOUTUBE_*`) cuando `youtube/subir.txt` dice "subir"; no repite salvo "repetir". `meta.json`: título ≤ 100 caracteres
  («Fungi Mati: Turning Tequila's Agave Waste into Gourmet Mushrooms | MIT Solve 2027»), `privacidad: unlisted`, categoría 28,
  idioma `en`, 15 etiquetas, portada del segundo 171, `containsSyntheticMedia: true`, y `autorizo` con la frase de permiso de Robert.
- `descripcion.txt`: resumen de 2 líneas + **CHAPTERS** con marcas de tiempo (capítulos automáticos de YouTube) + **FULL SCRIPT**
  por capítulo + créditos de fotos. ≤ 5000 bytes y sin `<` `>`.
- Robert: "si la convocatoria permite no listado, mejor; no me gusta revelar mis planes". Desde el 31 oct la Sala sube documentales
  16:9 con `publicar.yml` (`video`, `youtube` = `{"privacidad":"unlisted","idioma":"en"}`): usar eso para los siguientes.
- Formulario (solve.mit.edu): Robert inicia sesión; editar y guardar SIEMPRE con **Save & Continue** de cada sección (Enter da error
  500); verificar recargando; **nunca Submit** sin su permiso explícito. Respuestas finales en `solicitud/respuestas_v4.json`.
  Revisión estricta: cada respuesta contra las instrucciones de la pregunta, el video y las entrevistas de BeVisioneers; nada general.
  Datos a cuidar: Fungi Mati aún no está registrada ni en el SAT; el piloto fue con estudiantes del Tec (no "comunidad"); el
  proveedor de pellets hace pellets 50 % cascarilla de soya / 50 % madera de nogal (aún no el master mix con agave); "no hay muchos
  sitios autorizados" (no "no hay"); ganancia ≈ el doble ya descontando mano de obra, agua, micelio, gas, luz, humidificadores;
  Robert ayudó a organizar e impartir parte del curso; dos enlaces de sitio (Google Sites viejo y el artifact nuevo).
