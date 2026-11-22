# TÉCNICA · Motor de animación "documental de cine"

Manual de **técnica de animación** del kit `motor/cine/`: lo que hizo que el Core video #00 (documental 16:9 de ~20 min) y el
pitch 4K de Fungi Mati para MIT Solve se vieran de cine. Sirve para cualquier documental de cualquier tema.

- Qué se hace y en qué orden (candados, voz, publicación): `maestro/recetas/protocolo-documental.md` (manda).
- Detalle de producción del #00 (fotos, restauración, render, voz): `maestro/recetas/documental-cine.md` §2–§7.
- Pitch (4K, tiempos con una sola voz, música corta, YouTube): `maestro/recetas/pitch-convocatoria.md`.
- Hechos de la vida de Robert (solo si el documental es sobre él): `maestro/recetas/correcciones-de-robert.md` §Core #00.

Este archivo no repite esas recetas: explica **cómo está hecho el código** y cómo usarlo para hacer escenas nuevas de la misma
calidad o mejores. Todo lo que dice aquí está leído del código de esta carpeta (3 nov 2026).

---

## 0. Mapa de la carpeta

| Archivo | Qué es | ¿Genérico o del Core? |
|---|---|---|
| `cine-kit.jsx` | Kit base de ilustración: definiciones SVG compartidas (`CineDefs`), luz, aire, superficies, semillas, frascos, plantas, macetas, personajes, rótulos. Registra `window.ILUSC`. | Genérico (algunas piezas nacieron para la biografía: semillas, frascos de cocina) |
| `cine-hongos.jsx` | Hongos y laboratorio con morfología real: *Pleurotus*, *Agaricus*, micelio, Petri, colonias, *Trichoderma*, bolsas de cultivo. | Genérico (micología) |
| `doc-largo.jsx` | **El motor**: línea de tiempo desde `escenas.js`, tipos de escena, cámara de las ilustraciones, fotos en marco, subtítulos, marca de capítulo, stickers, fundidos, precarga, shots verticales. | Genérico con detalles del Core (ver §8) |
| `cine-monologos.jsx` | `DIBUJOS` para escenas de texto (titanes, mamá, B-Eco…). | **Del Core** (aunque esté aquí). Úsalo de ejemplo |
| `mapa-mexico.js` | `window.MAPA_MX`: los 32 estados (1000 × 680 unidades); Jalisco (`id:'jalisco'`) y Nuevo León (`id:'nl'`) marcados. | Genérico |
| `texturas.py` | Genera `video/tex/*.png` (grano, papel, maderas, tierra, aserrín). | Genérico — **no genera `papel_a.png`** (§7) |
| `preparar_fotos.py` | Fotos de `../fuentes/<carpetas>` → `video/img/…jpg` (EXIF, ≤ 2000 px) y `fotos.js`. | Carpetas del Core escritas a mano |
| `validar.mjs` | `escenas.js` vs `guion_final.md`, fotos y `ILUSC`. | Exige `ilustraciones.jsx` e `ilustraciones2.jsx` (§8) |
| `narrar_largo.mjs` | Voz ElevenLabs por capítulo (saldo / generar / recuperar), caché por hash. | Genérico |
| `voz_organica_largo.mjs` | Voz GRABADA por Robert (sin créditos): limpia, empareja y alinea con Whisper; corta por capítulos → `voz/capN.mp3/json` (mismo formato). Workflow `workflows/voz-organica-largo.yml`. Ver `motor/voz-organica/LEEME.md`. | Genérico |
| `tiempos_voz.mjs` | Tiempos por línea desde la voz real → `tiempos_voz.js`; une la voz; llama a la música; mezcla oficial → `voz/mezcla.m4a`. | Genérico |
| `musica_largo.mjs` | Banda sonora original continua (orquesta sintetizada, un "cue" por capítulo). | `CUES` y efectos escritos para los capítulos del Core |
| `audio-kit.mjs` | Sintetizador de los **shots** (lee `OM_SCENES`). | Solo referencia: nada de esta carpeta lo importa |
| `mezcla.json` | Copia de `motor/mezcla.json` (sonido «5», final −7.1 LUFS). | Genérico (mantener igual a `motor/mezcla.json`) |
| `render_largo.mjs` | Render local por tramos, retomable (respaldo; nunca en la PC de Robert). | Nombre del `.dc.html` del Core fijo |
| `workflows/*.yml` | Render en paralelo, voz, verticales y espejo al repo público. | Rutas y nombres del Core fijos (§7) |
| `ejemplos/core00/` | Escenas reales del #00: `cine-cap0…5.jsx`, `cine-extra.jsx`, `ilustraciones*.jsx` (estilo viejo plano), `escenas.js`, `.dc.html`. | **Solo ejemplo** |
| `ejemplos/pitch/` | `cine-pitch.jsx` (25 escenas), `escenas.js`, `musica.mjs`, `tiempos.mjs`, `.dc.html`. | **Solo ejemplo** |

Dependencias de fuera de la carpeta (se copian al `video/` de cada documental): `animations-v3.jsx` y `support.js` (motor de
Claude Design: `CompositionStage`, `useComposition`), `motor/kit/kit-robert.jsx` (utilidades `kprog`, `klerp`, `kclamp`, `kEase`,
`krng`, `mece`, `mixHex`, `kformato`, colores `KC`, letras `KF`, y `CierreMarca` para los verticales) y `logo_color.svg`.

---

## 1. Qué hace distinto este estilo frente al de los shots

| | Shots verticales (`motor/kit/kit-robert.jsx`) | Documental de cine (`motor/cine/`) |
|---|---|---|
| Trazo | Contorno de tinta grueso (`stroke` 4–8 px), colores planos de la marca | **Sin contornos**. La forma sale de rellenos y del cambio de luz; si hay borde es un hilo de 1–2 px semitransparente |
| Volumen | Plano | Cada objeto lleva un **degradado de volumen encima de su color**: `c-esfera` (cosas redondas, luz arriba-izquierda), `c-cilindro` (frascos, brazos, piernas, macetas), `c-arriba` (planos: luz arriba, sombra abajo), `c-cara`, `c-tela`, `c-sem`, `c-hoja` |
| Luz | Pareja | **Una fuente de luz motivada** (ventana, lámpara, sol): `Rayos` desde la ventana, `Halo` en la fuente, `Pared` con degradado hacia ella, reflejos del lado de la luz (`Frasco luz='izq'|'der'`), `Tinte` cálido al amanecer |
| Sombras | Ninguna o duras | `Sombra` (elipse con degradado radial) bajo todo lo que toca una superficie; sombra bajo el canto de cada `Tablon`; sombra interna del vidrio |
| Materiales | Colores | **Texturas reales** generadas (`texturas.py`): maderas con vetas y nudos, tierra con piedritas, aserrín, papel; metales con degradados de 6 paradas (`c-oro`, `c-acero`, `c-laton`), barro (`c-barro`), vidrio (`c-vidrio` brillo en bordes + `c-vidrio-sombra`) |
| Profundidad | Una capa | **3–5 planos**: fondo lejano desenfocado (`Desenfoque b=8–14`), escenario medio, sujeto nítido, **primer plano muy desenfocado** (`b=24`, hojas o hierbas que "tapan" la orilla). Cada plano con su paralaje (`capa(prof)`) |
| Aire | — | `Polvo` que flota en la luz (25 % de motas desenfocadas), `Bokeh` (círculos de lente con borde más brillante), `Humo` con degradados |
| Cámara | Fija o cortes | Cámara lenta continua por escena (`cam`: zoom/paneo con curva suave) + **cámara en mano** casi imperceptible (`mece`) + paralaje por capa |
| Personajes | Stickers/caricatura | Personas dibujadas con proporciones por edad, pelo con volumen y mechones, ojos con brillo y parpadeo, respiración, cabeza que se mece, ropa con pliegues (`Nene`, `Adulto`) |
| Fotos | Recuadro | Foto **impresa** en papel crema con sombra doble, rotación que respira, Ken Burns hacia un foco, destello de luz que barre, la misma foto desenfocada llenando el fondo, y óvalos dibujados a mano para señalar |
| Tipografía | Anton + Archivo | **Fraunces** (serif con eje óptico `'opsz' 96–144`) para títulos y frases; itálica para subtítulos de escena y nombres científicos; **Space Mono** mayúsculas espaciadas para rótulos; **Caveat** para notas a mano; **Archivo** 600 para subtítulos |
| Acabado | Ninguno | Papel encima de cada ilustración (`Papel`), banda oscura baja, y en ffmpeg: balance de color cálido/frío, contraste, viñeta y grano que cambia cada cuadro |
| Transiciones | Cortes | Fundido de 0.55 s entre bloques; dentro de una escena, "tomas" que se cruzan con opacidad en 0.04–0.1 de `p` |

La regla de fondo: **todo objeto tiene material, luz, sombra y un lugar físico donde apoyarse**, y **toda escena tiene profundidad
y algo que se mueve** (cámara, polvo, una acción).

---

## 2. Catálogo del kit

Convenciones de todo el kit:
- Coordenadas de pantalla 1920 × 1080 (`CW`, `CH`). Las funciones reciben `x, y` y casi siempre dibujan con `transform` desde ahí.
- `t` / `tl` = segundos (para movimientos continuos: mecerse, parpadear, polvo). `p` = avance 0..1 del bloque (para la historia).
- `g` = crecimiento 0..1 (plantas, micelio, setas). `s` = escala. `o` = opacidad. `seed` = semilla del azar.
- **Nada de `Math.random()` ni `Date`**: todo azar sale de `R(seed)` (generador determinista). El cuadro 1000 debe salir igual
  en cualquier máquina, porque el render se reparte en 20+ máquinas.

### 2.1 Utilidades (`cine-kit.jsx`)

| Nombre | Qué hace |
|---|---|
| `CW, CH` | 1920, 1080 |
| `TEX(n)` | `'video/tex/' + n + '.png'` (rutas relativas al `.dc.html`) |
| `FUENTE` | `{ serif: Fraunces, mano: Caveat, mono: Space Mono, texto: Archivo }` |
| `cpr(v, a, b, ease?)` | Avance 0..1 de `v` entre `a` y `b` (= `kprog`). Base de toda animación: `cpr(p, 0.3, 0.45, kEase.suave)` |
| `cpop(v, a, b = a+0.08)` | Igual con salida cúbica (entrada "pop" suave) |
| `suave3(x)` | `1 − (1 − x)³` |
| `lerp(a, b, t)` | Interpolación |
| `R(seed)` | Generador de azar determinista; **llamar dentro de la función** y consumir siempre en el mismo orden |
| `mix(a, b, t)`, `osc(c, t)`, `cla(c, t)` | Mezclar dos colores hex; oscurecer; aclarar |

De `kit-robert.jsx` se usan además: `kEase.sale` (salida cuártica), `kEase.suave` (entrada-salida cúbica), `kEase.rebote`,
`mece(T, seed, frec)` (−1..1, suma de 3 senos: movimiento orgánico) y `kclamp`.

### 2.2 `CineDefs` — definiciones compartidas (las monta `DocLargo` una sola vez)

Se usan por id con `fill="url(#…)"` o `filter="url(#…)"`:

- **Desenfoques**: `c-b1, c-b2, c-b4, c-b8, c-b14, c-b24, c-b40`. **Solo existen esos siete** (ver §6, error de `Desenfoque b={6}`).
- **Texturas (patrones)**: `c-madera-clara`, `c-madera-media`, `c-madera-oscura` (2048×640), `c-madera-pino` (1536×512),
  `c-tierra`, `c-aserrin` (1024×512), `c-papel` y `c-papel-a` (1920×1080).
- **Vidrio**: `c-vidrio` (blanco 42–45 % en los bordes, casi transparente al centro), `c-vidrio-sombra` (verde oscuro en los bordes, por dentro).
- **Brillos**: `c-brillo-v` (franja vertical), `c-brillo-h` (horizontal).
- **Metales**: `c-oro`, `c-acero`, `c-laton` (6 paradas claro/oscuro alternadas = reflejo de metal pulido).
- **Barro**: `c-barro`, `c-barro-borde`.
- **Volumen** (se ponen **encima** del color base, misma forma): `c-esfera` (radial, luz en 35 %/30 %), `c-cilindro` (horizontal,
  sombra a los lados y luz a 28 %), `c-arriba` (vertical), `c-sem` (semillas), `c-hoja`, `c-cara` (piel), `c-tela`.
- **Luz**: `c-rayo`, `c-halo` (radial blanco), `c-sombra-r` (radial negro para sombras de contacto).

Patrón de volumen que se repite en todo el kit (cópialo para cualquier objeto nuevo):
```jsx
<path d={forma} fill={color} />                         {/* color base */}
<path d={forma} fill="url(#c-cilindro)" />              {/* volumen */}
<rect … fill="#fff" opacity={0.4} />                    {/* brillo especular fino del lado de la luz */}
<path d={forma} fill="none" stroke="#000" strokeOpacity={0.15} strokeWidth={2} />  {/* si acaso, borde casi invisible */}
```

### 2.3 Luz, aire y profundidad

| Componente | Parámetros (defecto) | Uso |
|---|---|---|
| `Sombra` | `x, y, rx, ry, o=0.5` | Sombra de contacto: elipse `rx·1.45 × ry·2.1` con `c-sombra-r`. (Acepta `b` en los ejemplos pero lo ignora.) Va **antes** del objeto. |
| `Rayos` | `x, y, ang=60, abre=30, largo=1400, n=6, ancho=90, color='#fff3d6', o=0.5, t=0, seed=3` | Haces de luz desde una ventana: `n` rayos en abanico (`ang` ± `abre/2`, grados), cada uno 3 polígonos al 5.5 % que titilan con `t`. Fuera de las capas de cámara. Ej.: `<Rayos x={420} y={260} ang={28} abre={22} largo={1700} n={6} ancho={120} o={0.75} t={tl} seed={8} />` |
| `Polvo` | `x=0, y=0, w=CW, h=CH, n=60, t=0, seed=9, color='#fff6e0', o=0.8, tam=1` | Motas que suben y derivan (se envuelven en el rectángulo); 25 % son halos desenfocados. Ponlo en la zona del haz de luz (`x, y, w, h`). |
| `Bokeh` | `x=0, y=0, w=CW, h=CH, n=18, t=0, seed=4, colores=[ámbar…], r0=18, r1=70, o=0.5` | Luces fuera de foco con borde de lente; van en el plano del fondo. |
| `Desenfoque` | `b=8, o=1, children` | Envuelve un grupo con `filter=url(#c-b{b})`. `b` ∈ {1, 2, 4, 8, 14, 24, 40}. |
| `Papel` | `o=0.32` | Textura `papel_a` a pantalla completa (opacidad `o·2`). `EscenaIlus` ya la pone con `o=0.28` encima de cada ilustración. |
| `Tinte` | `color='#ffb35a', o=0.12` | Velo de color (opacidad `o·0.45`): amanecer cálido, noche fría. |
| `Halo` | `x, y, r, color='#fff2cf', o=0.6` | Resplandor radial (radio real `r·1.25`): fuente de luz, sol, brillo de un objeto. |

### 2.4 Superficies y escenarios

| Componente | Parámetros | Notas |
|---|---|---|
| `Tablon` | `x, y, w, prof=40, grosor=26, madera='media', o=1` | Cubierta de mesa o repisa: `y` = borde de atrás; `prof` = cubierta vista desde arriba (con `c-arriba`), `grosor` = canto frontal oscurecido con filo de luz de 2.5 px y sombra de 14 px debajo. `madera`: `clara`, `media`, `oscura`, `pino`. Los objetos que "están encima" tienen su base en `y + prof·(0.5–1)`. |
| `Puerta` | `x, y, w, h, madera='media', jal='der'` | Puerta de alacena con tablero biselado (luz arriba-izq, sombra abajo-der) y jaladera de latón. |
| `Azulejo` | `x, y, w, h, tw=120, th=60, color='#f3eee4', talavera=0.12, seed=5` | Azulejo tipo metro trabado; `talavera` = proporción de piezas de Talavera azul. |
| `Pared` | `color='#efe2c9', luz=[0.25, 0.3], o=1` | Yeso con papel y degradado radial hacia `luz` (fracciones de pantalla). **Mide 0..1920 × 0..1080**: si la cámara se aleja o panea mucho, pon un `rect` más grande detrás. |

### 2.5 Semillas, frascos

| Componente | Parámetros | Notas |
|---|---|---|
| `Semilla` | `tipo='frijol', x, y, s=1, rot=0, var=0.5, sombra=true` | `tipo`: `frijol` (con manchas e hilio), `frijol_negro`, `maiz`, `lenteja`, `garbanzo`, `pepita`, `papaya`; cualquier otro dibuja un grano tipo arroz. `var` 0..1 varía el tono. ~35 px de ancho con `s=1`. |
| `Monton` | `tipo, x, y, w, h, n, seed=1, s=1, nivel=1` | Llena el rectángulo de abajo hacia arriba en hileras trabadas con giro y tamaño al azar (`nivel` = qué tan lleno). Se usa dentro de `Frasco`. |
| `Frasco` | `id` (único), `x, y` (centro de la base), `w=200, h=300, tapa='oro', contenido='frijol', nivel=0.72, etiqueta, seed=1, abierto=false, luz='izq', ventana=true, interior, sombra=true` | Vidrio completo: sombra + luz cáustica en la mesa, pared trasera, contenido recortado (`clipPath c-fr-<id>`), sombra interior, vidrio al frente, reflejos de ventana del lado `luz`, brillo vertical, cuerdas de la rosca, fondo grueso, etiqueta de papel con cinta y letra a mano. `tapa`: `oro`, `roja`, `trapo` (`Trapito`) o cualquier otra cosa = sin tapa. `contenido=null` + `interior={<g>…</g>}` para meter lo que sea (agua, algodón, raíces) en coordenadas de pantalla. Ej. real: el frijolito (`ejemplos/core00/cine-cap0.jsx`). |
| `Tapa` | `x, y, w, h=34, color` | Tapa de rosca con estrías; sin `color` es dorada (`c-oro`). |
| `Trapito` | `x, y, w, color='#c0392b', seed=3` | Trapo de cuadros amarrado con yute. |

### 2.6 Plantas y macetas

| Componente | Parámetros | Notas |
|---|---|---|
| `Hoja` | `x, y` (base), `len=80, w=0.42, ang=-90, color='#3f8f3a', venas=5, borde='liso', o=1` | Lámina con mitad clara/mitad oscura, nervio central y venas. `ang` en grados (0 = derecha, −90 = arriba). `borde='dentado'` para jitomate/hierbabuena. |
| `Tallo` | `d` (path), `w=8, color='#4f8a35'` | Tallo con borde oscuro y luz. |
| `PlantulaFrijol` | `x, y` (nivel de tierra), `g=1, t=0, s=1, seed=2` | Plántula simplificada (gancho → cotiledones → hojas). Para un primer plano botánico usa `GerminaFrijol` de `cine-cap0.jsx` (germinación epígea correcta, con epicótilo). |
| `MataJitomate` | `x, y, s=1, t=0, seed=5, frutos=0, alto=1` | 6 ramas con hojas compuestas dentadas, flores amarillas, frutos. |
| `HierbaOlor` | `x, y, s=1, t=0, seed=7, tipo='albahaca'` | `albahaca`, `hierbabuena`, `romero`. Excelente primer plano desenfocado. |
| `MacetaC` (función `Maceta`) | `x, y` (base al centro), `w=160, h=140, tipo='barro', color='#2b6fd6', s=1, children, tierra=true, sombra=true` | Se exporta como **`MacetaC`** para no chocar con la `Maceta` plana de `ilustraciones.jsx`. `children` = la planta, en coordenadas con origen en la base; se dibuja **entre la tierra y el cuerpo** (sale de la tierra): ponla en `y ≈ −h·0.88`. `tipo` ≠ `barro` usa `color` con `c-cilindro` (plástico, bote). |

Todas las plantas se mecen con `mece(t, seed, …)`: pásales `t={tl}`.

### 2.7 Personajes

**`Nene`** (niños y jóvenes; `x, y` = pies). Altura a `s=1`: ~350 px a 3 años.

| Parámetro | Defecto | Qué hace |
|---|---|---|
| `s` | 1 | Escala |
| `edad` | 3 | ≤ 4: cabeza 78, cuerpo ×1 · ≤ 8: cabeza 72, cuerpo ×1.15 · mayor: cabeza 66, cuerpo ×1.3 (proporciones reales: la cabeza se achica y el cuerpo se alarga) |
| `piel, pelo, playera, pantalon, zapatos` | `#b77a52, #1a1311, #e8742a, #2e4d84, #3b2a22` | Colores |
| `rayas` | true | Dos rayas blancas en la playera |
| `cuello` | null | Color de un cuello de camisa en V |
| `brazoD`, `brazoI` | 10, −10 | Ángulo de cada brazo en grados: **0 = colgando, 90 = horizontal hacia afuera, 180 = arriba**; negativos cruzan hacia el cuerpo. La mano queda a `100·k·s` px del hombro, con hombro en `(x ± 52·k·s, y + (−150·k + 18)·s)` (`k` = 1, 1.15 o 1.3 según edad). Con eso se calcula dónde poner lo que agarra (ver regadera y frijol en §3). |
| `boca` | `'sonrisa'` | `sonrisa`, `risa` (abierta con dientes), `o` (asombro), `ay` (zigzag), `seria` |
| `mira` | `[0, 0]` | Pupilas: −1..1 en x y en y |
| `cejas` | 0 | Sube ambas cejas (`cejas·6` px) |
| `lentes` | false | Armazón negro con reflejo |
| `t` | 0 | Respira (sen 1.6 Hz), mece la cabeza y **parpadea** cada 3.7 s (`parpadeo=true`) |
| `cuerpo` | `'completo'` | `'busto'` = sin piernas ni sombra (asomándose detrás de una barra) |
| `espalda` | false | De espaldas: el pelo cubre la cara y la `mochila` se dibuja completa |
| `mochila` | null | Color. De frente se ven solo los tirantes |
| `nina` | false | Pelo largo detrás de la cabeza |
| `detalle` | — | JSX que carga en el pecho (maceta, hierbas, libro). **Se dibuja al frente de todo** (torso, brazos, cuello y cabeza) y respira con él. Colócalo a la altura del pecho, nunca del cuello |
| `seed` | 1 | Fase del mecerse y del pelo |

**`Adulto`** (`x, y` = pies; ~530 px hasta la coronilla a `s=1`).

| Parámetro | Defecto | Qué hace |
|---|---|---|
| `piel, pelo, camisa, pantalon` | `#a86f48, #241a14, #6d4fa3, #3a3a40` | Colores |
| `canas` | 0 | 0..1 mezcla el pelo hacia gris |
| `mujer` | false | Pelo largo enmarcando la cara, cuello redondo, sin botones |
| `rapado` | false | Pelo a rape: recortado exacto al cráneo con `clipPath`, tono piel→pelo, sin volumen ni línea de calvicie |
| `bigote` | false | |
| `sombrero` | null | `'palma'` (con trenzado) o `'gorra'` |
| `brazoD, brazoI` | 8, −8 | Igual que en `Nene` |
| `cruzados` | false | Brazos cruzados bien hechos: brazos cortos sin mano colgando + antebrazo horizontal + dos manos visibles |
| `boca` | `'sonrisa'` | `sonrisa`, `o`, `seria` |
| `mira`, `cejas` | `[0,0]`, 0 | `cejas` sube **solo la ceja derecha** (gesto de duda) |
| `delantal` | null | Color |
| `carga` | — | JSX entre el torso y el brazo de enfrente (lo que sostiene contra el cuerpo) |
| `t, seed` | 0, 3 | Mecer la cabeza |

Orden de dibujo dentro de cada personaje (importa para que nada atraviese): sombra → piernas → brazo de atrás → **cuello** →
torso → (mochila/tirantes) → brazo de enfrente → cabeza → `detalle`. El cuello es un rectángulo del tono de la piel oscurecido que une
cabeza y torso (corrección "cuello unido").

**Personajes del pitch (simples, para multitudes)**: `Alumno({x, y, s, c, piel, luz})` — busto chico; `luz` lo ilumina azul (pantalla).

### 2.8 Hongos y laboratorio (`cine-hongos.jsx`)

| Componente | Parámetros | Notas de morfología |
|---|---|---|
| `Sombrero` | `x, y` (donde nace del pie), `ang=-20, tam=120, color='#f28bb0', g=1, seed=1, laminas=true, borde` | *Pleurotus*: abanico con orilla ondulada, 24 láminas decurrentes desde el pie, `c-esfera` y borde claro. |
| `Racimo` | `x, y, n=7, tam=110, color, g=1, t=0, seed=3, abre=1, dir=0` | Racimo en repisa desde un punto (rajada de bolsa, tronco). Con `g` < 0.25 cada seta es un primordio (bolita). Se mece con `t`. |
| `Primordios` | `x, y, n=18, r0=8, color='#7d8ea3', seed=4, g=1` | Bolitas apiñadas. |
| `Champinon` | `x, y, s=1, rot=0, tono='#f1ebe0'` | *Agaricus*: sombrero redondo, láminas libres rosas→cafés, anillo en el pie. |
| `Micelio` | `x, y, r=200, g=1, seed=5, n=34, color='#f6f3ea', o=0.9, aplastado=1, ang0=0, abre=360` | Hifas que se ramifican (recursión de 4 niveles, 70 % de bifurcación); con `g` crece el radio visible. `aplastado` < 1 = en perspectiva; `ang0`/`abre` = abanico. |
| `Petri` | `x, y, r=220, medio='#e9d9a6', inclina=0.55, children, id, tapa=true, derretido=0` | Caja vista en ángulo: sombra, paredes, medio recortado, reflejo, tapa. `children` en coordenadas centradas (se aplastan con `inclina`). `derretido` = gelatina que se derrite. |
| `Colonias` | `n=40, r=200, seed=6, g=1, color='#f2e6c4'` | Colonias bacterianas brillantes (dentro de `Petri`). |
| `Moho` | `x, y, r=120, g=1, seed=2, aplastado=1` | *Trichoderma*: anillos verde oscuro → claro con borde blanco que avanza. |
| `BolsaCultivo` | `x, y` (base), `w=220, h=320, sustrato='#c9a46a', colonizado=1, filtro=true, children, tex='aserrin'` | Sustrato con textura, se vuelve blanco con `colonizado`; plástico con brillos y filtro. `children` = setas saliendo (ver `BolsaSetas` del pitch). |

### 2.9 Fotos y rótulos dentro de una ilustración

| Componente | Parámetros | Notas |
|---|---|---|
| `FotoReal` | `src` (ruta completa, p. ej. `video/img/extra/x.jpg`), `x=960, y=500, maxW=1100, maxH=700, rot=-1.5, o=1, etiqueta, acento='#F4C25A'` | Foto impresa (borde crema + sombra) dentro del SVG. **Solo dibuja si `src` está en `window.FOTOS`** (si falta, no aparece nada: revisa `fotos.js`). |
| `Rotulo` | `x=120, y=150, arriba, texto, sub, tl, at=0.3, color='#fff', acento='#F4C25A', alinear='start', tam=64` | Rótulo de documental: línea en Space Mono 22 px espaciada (`arriba`), raya de acento de 260 px que se dibuja, título en Fraunces 600 (`texto`, `tam`) y subtítulo itálico 34 px (`sub`). `at` en **segundos** del bloque. Sin `texto` queda solo la línea de arriba. |
| `NotaMano` | `x, y, texto, tl, at=0, tam=54, color='#fff', rot=-4, flecha, o=1` | Texto en Caveat que se escribe letra por letra (0.6 s) y una flecha (`flecha` = path) que se traza después. |

### 2.10 Mapas

`window.MAPA_MX` = lista `{id, d}` de los 32 estados en un lienzo de 1000 × 680 (trazado del mapa que mandó Robert). Patrón real
(`ejemplos/core00/cine-extra.jsx`, `ILUSC.monterrey`):
```jsx
const MX_S = 0.8, MX_X = 590, MX_Y = 340, mxp = (x, y) => [MX_X + MX_S * x, MX_Y + MX_S * y]; // mapa → pantalla
<g transform={`translate(${MX_X} ${MX_Y}) scale(${MX_S})`}>
  {MAPA_MX.map((e, k) => <path key={k} d={e.d} fill={mix('#26365c', '#3d5a94', e.id === 'jalisco' ? 1 : 0)}
    stroke="#7fa8e8" strokeWidth={2.4 / MX_S} strokeLinejoin="round" />)}
  <g opacity={0.5}>{MAPA_MX.map((e, k) => <path key={k} d={e.d} fill="url(#c-arriba)" />)}</g>   {/* volumen */}
</g>
// ruta que crece: Bézier cuadrática evaluada en `viaje` (0..1), punteada, con punto que late en cada ciudad
```
Fondo de mapa: azul noche con cuadrícula de 100 px y `Halo`. Para otro país o el mundo, conseguir contornos reales (GeoJSON de
dominio público), convertirlos a paths y guardarlos en un `mapa-<lugar>.js` igual a este. **Nunca dibujar un contorno inventado**,
y mostrar solo los lugares que dice la frase.

### 2.11 Piezas que viven en los ejemplos (no están en el kit)

Para usarlas en otro documental, cópialas a tu archivo de escenas (o súbelas a `cine-kit.jsx`/`cine-hongos.jsx` y expórtalas).

**Del pitch (`ejemplos/pitch/cine-pitch.jsx`) — ninguna está exportada a `window`:**

| Pieza | Para qué |
|---|---|
| `FotoS({src, x, y, w, h, z, fx, fy, o, id, filtro})` | Foto **a pantalla completa dentro del SVG** (recorte + zoom hacia `fx, fy`). Base de las escenas "documental con foto" del pitch. `src` sin `video/img/` ni `.jpg`. |
| `Velo({lado:'izq'|'der'|'abajo'|'arriba', o, color})` | Degradado oscuro para leer texto sobre una foto. |
| `Vineta({o=0.55})` | Viñeta propia de la escena (además de la de ffmpeg). |
| `Estudio({color, luz, halo, o})` | Fondo de estudio oscuro con luz cálida (para escenas de objetos/datos). |
| `Mesa({y, capa, madera, o})` | Mesa ancha en perspectiva que ya se mueve con `capa(0.9)`. |
| `Fibra`, `MontonBagazo({…, nivel, oscuro})` | Haces de fibra; loma de fibras ordenadas por profundidad. |
| `Humo({x, y, t, n, seed, color, o, alto, ancho})` | Humo con degradados radiales (**sin filtros de desenfoque**: rápido). |
| `Brasas({x, y, t, n, seed, ancho})` | Chispas que suben. |
| `Atomo`, `CO2`, `CH4` | Moléculas con volumen y brillo. |
| `HazMicro`, `Enzima` | Fibra a escala de microscopio con eslabones; enzima que "muerde". |
| `Txt({x, y, tam, peso, fam, color, ancla, o, esp, ital})` | Texto SVG con sombra y eje óptico. |
| `Cuenta({x, y, desde, hasta, tl, at, dura, tam, prefijo, sufijo, dec, color, ancla})` | Número que cuenta (formato en-US). |
| `Tarjeta({x, y, w, h, e, acento})` | Tarjeta de vidrio oscuro con borde de acento. |
| `Medidor({x, y, r, v, color, grosor})` | Anillo de progreso con brillo. |
| `Paso({x, y, n, e})` | Número de paso en círculo dorado. |
| `Pellet`, `SetasRepisa`, `BolsaSetas`, `IconoResiduo`, `MarcaFM`, `Alumno` | Piezas del tema Fungi Mati. |

**Del Core (`ejemplos/core00/`)**. Exportadas: `Caja, Camioneta, Casas, MonitorCRT, PapelPicado, Tortilla, Taco` (cap1a);
`Huacal, Carton, Charola, Papayo, Cubeta, Mammillaria, Echeveria, Dionaea, Sarracenia, Drosera, Etiq` (cap1b); `Moneda2, Lona`
(cap2); `OllaExpres, CajaAire, Codigo` (cap4); `Medalla` (extra). Sin exportar (solo sirven en su archivo): `Algodon, Raiz,
Gotitas, GerminaFrijol` (cap0), `EscritorioNoche, KitCaja` (cap3), `Agave` (extra), y todo `cine-cap5.jsx`.

Una pieza que se usa desde **otro archivo** debe exportarse: `Object.assign(window, { MiPieza })` al final del archivo (cada `.jsx`
corre en su propio ámbito).

### 2.12 El motor (`doc-largo.jsx`)

**Constantes**: `VEL = 15` caracteres/s (duración estimada sin voz), `PAUSA = 0.45` s, `TARJETA = 3.2` s, `FUNDIDO = 0.55` s,
`PALETA` (9 colores de capítulo `{fondo, tinta, acento}`, se elige con `c.num % 9`), `CIENTIFICOS` (regex de nombres en cursiva).

**Línea de tiempo — `armarLinea(CAPS, TIEMPOS_VOZ)`** → `{lineas, bloques, total}` (detalle en §4). `window.DURACION_LARGO = total`.

**Precarga — `window.__precarga`**: antes del primer cuadro descarga y decodifica: fotos de `foto`/`fotos`, `video/logo_color.svg`,
las 16 texturas, las fotos de `FOTOS` con `/extra/` en la ruta, los `logo` de escenas tipo logo y los stickers usados. **Cualquier
otra imagen** que dibujes dentro de una ilustración (`<image>` propio, `FotoS` del pitch, un logo dentro de un `ILUSC`) **no se
precarga** y puede salir en blanco en el primer cuadro de un pedazo de render: ponla en `video/img/extra/` y regístrala en `fotos.js`,
o agrega la lista a esta precarga (el pitch lo hacía con `window.PITCH_IMGS` en su copia de `doc-largo.jsx`). El render solo espera
esta promesa si el `render.mjs` la conoce (§7).

**Tipos de escena (`ESCENAS_TIPO`)**: `foto`, `fotos`, `texto`, `numero`, `logo`, `marca`, `iconos`, `ilus` (+ `capitulo`, interno).
Campos en §4.

**Escenas de ilustración — `EscenaIlus`**. Si existe `window.ILUSC[v.id]` la dibuja como escena de cine; si no, busca la vieja
`ILUS[v.id]` (estilo plano de `ilustraciones.jsx`, encogida al 86 % sobre `Fondo`). Registro de una escena de cine:
```js
ILUSC.<id> = {
  cam: { z0, z1, x0, x1, y0, y1, fx, fy, fondo },   // todo opcional
  dibuja: ({ p, tl, T, pal, v, capa, dur }) => <g>…</g>,
};
```
- `p` 0..1 del bloque, `tl` segundos del bloque, `T` segundos del video, `pal` paleta del capítulo, `v` el objeto `v` de
  `escenas.js` (sirve para pasar datos: `ILUSC.periodico` lee `v.medio`, `v.fecha`, `v.credito`), `dur` duración del bloque en
  segundos (para convertir: `tl - 0.62 * dur` = "segundos desde el 62 % del bloque").
- **Cámara**: avance `k = 0.45·p + 0.55·kEase.suave(p)` (arranca moviéndose y aterriza suave); `z = lerp(z0 ?? 1, z1 ?? 1.06, k)`;
  paneo `dx = lerp(x0 ?? 0, x1 ?? 0, k)`, `dy = lerp(y0 ?? 0, y1 ?? 0, k)`; centro del zoom `(fx ?? 960, fy ?? 540)`; **cámara en
  mano** `sx = 1.4·mece(T, 7, 0.32)`, `sy = 1.1·mece(T, 9, 0.27)` px. `fondo` = color del SVG (defecto `#0b0b0d`).
- **`capa(prof)`** devuelve el `transform` de un plano a esa profundidad:
  `translate(fx fy) scale(1 + (z − 1)·prof) translate(−fx − (dx + sx)·prof, −fy − (dy + sy)·prof)`.
  `prof = 0` → plano fijo (ni zoom, ni paneo, ni temblor); `0.2–0.4` → fondo lejano (casi no se mueve); `0.7–0.9` → escenario;
  `1` → sujeto (movimiento completo); `1.3–1.5` → primer plano (se mueve más que la cámara = paralaje). `dx` positivo mueve el
  contenido a la izquierda (la cámara va a la derecha).
- Lo que **no** va dentro de una `capa(...)` queda pegado a la pantalla: rótulos, polvo, rayos, contadores, tinte.
- `EscenaIlus` pone `<Papel o={0.28} />` encima de todo automáticamente.
- Zoom y paneo descubren orillas: **todo fondo se dibuja de −200 a 2120 en x** (y de −200 a 1300 en y). Así están todos los ejemplos.

Valores reales de `cam` que funcionaron: acercamiento lento `{z0: 1.0, z1: 1.06–1.1}`; alejarse para revelar el lugar
`{z0: 1.75, z1: 1.0, fx: 1000, fy: 600}` (frijolito: empieza en el frasco y descubre la repisa); paneo lateral `{x0: -24, x1: 24}`;
contrapicado que sube `{y0: 40, y1: -40}` (torre); microscopio que entra `{z0: 1.0, z1: 1.18}`. Para escenas con varias tomas o
mucho texto, cámara casi quieta (`z1 ≤ 1.04`).

**Fotos**:
- `Marco({foto, p, tl, x=960, y=468, maxW=1240, maxH=640, rot=-1.5, z0=1.02, z1=1.12, foco=[0.5,0.45], borde=12, retraso=0, etiqueta, pal, marcas})`:
  entra en 0.9 s desde 40 px abajo y escala 0.94→1; rotación `rot·0.6 + 0.5·sen(0.25·tl)` (respira); Ken Burns
  `z = lerp(z0, z1, 0.4p + 0.6·suave(p))` con `transformOrigin` en `foco`; `contrast(1.06) saturate(1.06)`; viñeta interna;
  **destello** blanco diagonal que barre una vez entre `retraso+0.4` y `retraso+2.4` s; sombra `0 50px 90px` + `0 14px 30px`.
- `FondoFoto({src, T})`: la misma foto a 120 %, `blur(42px) saturate(1.15) brightness(.8)` y respiración de escala, con viñeta.
- `MarcasFoto`: óvalos amarillos (`#ffe14d`) dibujados a mano (un poco más de una vuelta, con brillo) que laten, y etiqueta en
  píldora con línea. Cada marca `{x, y, rx, ry}` en **fracciones de la foto** (0–1), `rot`, `txt`, `lado:'arriba'|'abajo'`,
  `ex` (corrimiento x de la etiqueta, fracción), `t` (segundos; defecto 1.5, +0.55 por marca). Se mueven con el zoom de la foto.
- `Etiqueta({texto, x, y, tl, pal, tam=30, rel})`: barra de acento de 6 px + Space Mono en caja oscura. Lo que vaya entre
  guiones bajos sale en Fraunces itálica: `'_Panellus stipticus_'`.
- `TextoLateral`: con `v.lado` + `v.texto` en una escena `foto`, título de 104 px y `sub` del lado contrario a la foto.

**Fondos**: `Fondo({color, T, seed, particulas})` = degradado radial del color del capítulo (50 % → 90 % hacia negro) + `Bokeh` 16 +
`Polvo` 50 + luz cálida diagonal. Es el fondo de `texto`, `numero`, `iconos`, `capitulo` y de las `ILUS` viejas.

**Texto animado** (`EscenaTexto`): cada palabra entra 0.12 s después de la anterior, sube 24 px y pasa de `blur(8px)` a nítida.
Con `v.dibujo` (un `DIBUJOS[id]`), el título se encoge al 62 % y sube a y = 132; el dibujo ocupa y ≈ 380–880 y entra subiendo 30 px.

**`DIBUJOS`** (`cine-monologos.jsx`): `DIBUJOS.<id> = ({ p, tl, T }) => <g>…</g>` en coordenadas 1920 × 1080, sin cámara, con
`suelo()` (elipse desenfocada en y = 870). Son dibujos sencillos para que ningún monólogo quede como texto solo.

**Tarjeta de capítulo** (`EscenaCapitulo`, 3.2 s): sale de negro en 0.5 s; "CAPÍTULO N" en mono con `letterSpacing 14`; título
Fraunces 170 px que pasa de `blur(10px)` a nítido y crece 2 % durante la tarjeta; raya de 360 px; luz que barre de izquierda a
derecha; `sub` en itálica; se apaga en los últimos 0.6 s.

**Capas fijas** (encima de las escenas, en este orden):
- `Pelicula`: degradado negro de 300 px abajo (42 %) para leer subtítulos. El grano, viñeta y color van en ffmpeg (§7).
- `MarcaCapitulo`: logo 54 px + `NN  TÍTULO` en mono, arriba-izquierda (40, 34). No sale en capítulo 0, tarjetas ni `marca`.
  **Deja libre la esquina arriba-izquierda (≈ 40–700 × 30–95)**.
- `RobertLargo`: stickers de `robert: [pose, lado, hasta]`. Lados (`LADOS_H`): `abajo-der` (left 1500, top 560, ancho 420),
  `abajo-izq` (0, 560, 420), `arriba-der` (1560, 90, 330). Entra 0.45 s subiendo 160 px, sale 0.35 s antes de `hasta` (fracción
  de la línea, defecto 1), se mece ±2.5°, sombra doble. Imagen: `video/stickers/<pose>.png`.
- `SubtituloLargo`: centrado, `top = 920` (H − 160), Archivo 600 40 px, sombra triple. Parte la frase en trozos de ≤ 92 caracteres
  (≤ 64 y 1040 px de ancho si hay sticker abajo), repartidos en el tiempo por proporción de caracteres; cada trozo entra en 0.28 s
  subiendo 10 px y sale en 0.2 s ("brisa"). Sobre escenas `logo` lleva franja oscura. Nombres de `CIENTIFICOS` en Fraunces itálica.
  **Zona prohibida para lo importante: y > 880.**
- `Letras`: precarga invisible de todas las fuentes (que el primer cuadro con Fraunces itálica no salga con otra letra).

**Composición** (`DocLargo({Tx, limpio})`): dibuja los bloques con `T ∈ [at − 0.01, at + dur + 0.55)`; cada bloque nuevo entra
encima del anterior con opacidad 0→1 en 0.55 s (`kEase.suave`). El bloque que sale **sigue dibujándose 0.55 s después de su fin**
(con `p = 1`, `tl` sigue corriendo): su estado final debe verse bien. Los bloques `texto`, `numero` y `capitulo` además se
desvanecen al salir (dos títulos nunca se enciman). `limpio` quita subtítulos, marca y película (lo usan los verticales).
`partes(total)`: el motor acepta escenas de ≤ 300 s, así que el video se parte en "Partes" de ≤ 280 s con `T` continuo.
`LargoApp` = el largo; `window.LargoApp` es lo que importa el `.dc.html`.

**Shots verticales del largo** (`VerticalLargo` / `VerticalApp`, 1080 × 1920): `window.CORTE = {n, de, desde, hasta, titulo, cola,
robert}`. Arriba (y = 222) logo + "MI HISTORIA NN/NN" + título Fraunces 72 px; en medio la escena del largo completa a escala 0.6
(1152 × 648; se recortan 60 px de cada lado del largo → **nada importante a menos de 60 px de las orillas izquierda/derecha**) en
y = 500; barra de avance; subtítulo grande (48 px, ≤ 46 caracteres) en y = 1168; sticker de Robert los primeros 3.9 s; al final se
congela la imagen y entra `CierreMarca` ("Mira mi historia completa en el canal"). Los `Vertical NN.dc.html` y
`cortes_tiempos.json` los escribe `verticales/armar.mjs`, que vive en la rama `shots-largo/largo00` (no en esta carpeta).

---

## 3. Receta: de la idea a una escena de calidad

1. **Una frase, una imagen.** Lee la(s) línea(s) de `escenas.js` que cubre el bloque. Escribe en una línea qué tiene que *ver*
   el espectador mientras oye eso. Si la frase cambia de idea a la mitad, la escena tendrá 2–3 **tomas** (ver paso 6).
2. **Referencia real.** Busca cómo se ve de verdad (foto del lugar, morfología, el objeto exacto que usó la persona: olla de presión
   *All American*, no "una vaporera"). Anota 3–5 detalles que lo hacen reconocible (Torre SEJ: exoesqueleto rojo y vidrio azul;
   frasco de cocina: rosca, etiqueta a mano, cada grano dibujado). Si es ciencia, que la morfología sea correcta (esporas, láminas,
   cotiledones). Si un dato visual no se puede confirmar, dibújalo como esquema y escribe *schematic*/*esquemático* en pantalla.
3. **Luz.** Decide la fuente (ventana, lámpara, sol, pantalla) y su lado. De ahí salen: `Rayos` y `Halo` en la fuente, `Pared` con
   `luz` hacia ella, reflejos del vidrio de ese lado, sombras hacia el lado contrario, `Polvo` dentro del haz, `Tinte` según la hora.
4. **Planos.** Arma de atrás hacia adelante: fondo lejano (`capa(0.2–0.4)`, desenfocado `b=8–14`, con `Bokeh`), escenario
   (`capa(0.55–0.85)`: pared, repisa, mesa), sujeto (`capa(1)`, nítido), primer plano (`capa(1.3–1.5)` + `Desenfoque b=24`, algo
   que enmarque la orilla). Todo fondo de −200 a 2120.
5. **Materiales y volumen.** Cada objeto: color base + degradado de volumen + brillo fino + `Sombra` de contacto. Usa las texturas
   (`c-madera-*`, `c-tierra`, `c-aserrin`, `c-papel-a`) y los metales (`c-oro`, `c-acero`, `c-laton`) en vez de colores planos.
6. **Tiempo.** Lo que sigue a la voz se ata a `p` (se estira solo cuando llega la voz real); entradas de títulos y movimientos
   continuos se atan a `tl`/`T`. Tomas dentro del bloque: `const A = 1 - cpr(p, 0.25, 0.29), B = cpr(p, 0.27, 0.31)` y cada toma en
   `<g opacity={…}>`. Si el bloque cubre varias líneas, calcula dónde empieza cada línea (fracción del bloque) con la voz real y
   revisa esas fracciones cada vez que cambien los tiempos. Algo debe cambiar al menos cada ~6 s.
7. **Acciones creíbles.** Una acción pasa **una vez** (`cpr` se queda en 1); nunca un `%` (módulo) para algo narrativo. Lo que una
   mano sostiene se coloca con la geometría del brazo (ver ejemplo abajo) y gira alrededor del punto de agarre. Lo que cae, cae con
   gravedad (`y + 520·q²`). Lo que crece, crece con `g`.
8. **Texto en pantalla.** Un `Rotulo` (arriba-izquierda en x = 120, y ≈ 110–200, o a la derecha con `alinear='end'`), etiquetas en
   mono, notas a mano. Cuando aparece el objeto principal, el rótulo se apaga (`opacity={1 - clave}`). Nada debajo de y = 880.
9. **Revisión.** Hoja de contacto con cuadros a 0.1, 0.5, 0.9 del bloque + cuadro por cuadro en cada cambio de toma (§7 y la
   lista de rigor de `protocolo-documental.md` §5). Revisa también el cuadro `dur + 0.5` (el bloque sigue visible durante el fundido).

### Esqueleto mínimo (patrón real de `cine-cap0.jsx` y `cine-pitch.jsx`)

```jsx
// cine-<tema>.jsx — escenas de cine de <documental>.
// Cada escena: ILUSC.<id> = { cam, dibuja({ p, tl, T, v, capa, dur }) }.
const ILUSC = window.ILUSC;

// Pieza reutilizable: color base + volumen + brillo + sombra. (x, y) = punto de apoyo.
function Matraz({ x, y, s = 1, liquido = '#3fbf6a', nivel = 0.5, t = 0, id }) {
  const cuerpo = 'M -70 0 Q -80 -16 -64 -34 L -24 -100 L -24 -170 L 24 -170 L 24 -100 L 64 -34 Q 80 -16 70 0 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Sombra x={10} y={2} rx={70} ry={10} o={0.5} />
    <clipPath id={`mz-${id}`}><path d={cuerpo} /></clipPath>
    <g clipPath={`url(#mz-${id})`}>
      <rect x={-90} y={-170 * nivel + Math.sin(t * 2) * 1.5} width={180} height={180} fill={liquido} opacity={0.85} />
      <rect x={-90} y={-180} width={180} height={190} fill="url(#c-vidrio-sombra)" />
    </g>
    <path d={cuerpo} fill="url(#c-vidrio)" />
    <path d={cuerpo} fill="none" stroke="#24433f" strokeOpacity={0.45} strokeWidth={2} />
  </g>;
}

ILUSC.mi_escena = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 600, x0: -16, x1: 16 },
  dibuja: ({ p, tl, T, capa, dur }) => {
    const r = R(9100);                                   // azar determinista, se crea en cada cuadro
    const llena = cpr(p, 0.15, 0.55, kEase.suave);        // acción atada a la voz
    const B = cpr(p, 0.6, 0.66, kEase.suave);             // segunda toma cuando la voz dice "…"
    return <g>
      {/* 1. fondo lejano, desenfocado */}
      <g transform={capa(0.3)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#1b2230" />
        <Halo x={420} y={260} r={600} color="#ffd9a0" o={0.5} />
        <Bokeh n={14} t={T} seed={9101} o={0.35} />
      </g>
      <Rayos x={420} y={200} ang={30} abre={22} largo={1600} n={6} ancho={110} o={0.45} t={tl} seed={9102} />
      {/* 2. escenario: mesa de madera */}
      <g transform={capa(0.85)}><Tablon x={-200} y={760} w={2320} prof={46} grosor={34} madera="media" /></g>
      {/* 3. sujeto nítido */}
      <g transform={capa(1)} opacity={1 - B}>
        <Matraz id="a" x={960} y={790} s={1.6} nivel={0.2 + 0.6 * llena} t={tl} />
      </g>
      <g transform={capa(1)} opacity={B}>{/* toma 2 */}</g>
      {/* 4. primer plano fuera de foco */}
      <g transform={capa(1.45)}><Desenfoque b={24} o={0.85}><HierbaOlor x={120} y={1180} s={2.4} t={tl} seed={9103} /></Desenfoque></g>
      {/* 5. aire y textos (fijos a la pantalla) */}
      <Polvo n={50} t={T} seed={9104} o={0.5} x={100} y={150} w={1100} h={700} />
      <g opacity={1 - B}><Rotulo x={120} y={190} arriba="EL EXPERIMENTO" texto="Un matraz que se llena" tl={tl} at={0.4} tam={58} /></g>
    </g>;
  },
};

Object.assign(window, { Matraz });   // solo si otro archivo la usa
```

Y en `escenas.js`: `{ t: '…texto exacto del guion…', v: { tipo: 'ilus', id: 'mi_escena' } }`.

**Mano que agarra algo** (patrón de `semillas_cocina` y la regadera de `cine-extra.jsx`):
```js
const s = 1.25, k = 1, kidX = 1720, kidY = 905, ang = 120;            // Nene edad ≤ 4 → k = 1
const hombro = [kidX - 52 * k * s, kidY + (-150 * k + 18) * s];        // brazo izquierdo (lado −1)
const th = ang * Math.PI / 180, mano = [hombro[0] - Math.sin(th) * 100 * k * s, hombro[1] + Math.cos(th) * 100 * k * s];
// el objeto gira alrededor de su punto de agarre: translate(mano) rotate(inc) translate(−agarre)
<g transform={`translate(${mano[0]} ${mano[1]}) rotate(${inc}) translate(${-ASA[0]} ${-ASA[1]})`}>…</g>
```

---

## 4. `escenas.js` y la sincronía con la voz

```js
window.CAPS = [
  { num: 1, titulo: 'La semilla', sub: 'opcional (sale en la tarjeta)', tarjeta: true /* false = sin tarjeta */, lineas: [
    { t: 'Texto narrado, idéntico al guion.', v: { tipo: 'ilus', id: 'frijolito' }, robert: ['avatar_06_pensativo_menton', 'abajo-der', 0.8], d: 4 },
    { t: 'Otra frase: sin v, sigue el visual anterior.' },
  ] },
];
```

**Capítulo**: `num` (elige color de `PALETA` y el "NN" de la marca; el capítulo 0 no lleva marca), `titulo`, `sub`, `tarjeta`
(`false` = sin tarjeta de 3.2 s; el pitch no usó tarjetas), `lineas`.

**Línea**: `t` texto narrado (y subtítulo); `v` visual (si falta, el bloque anterior se alarga); `robert` sticker; `d` duración
manual (solo se usa si no hay `TIEMPOS_VOZ`; en el pitch, una línea con `t: ''` y `d: 5` es un final sin voz).
**La primera línea de cada capítulo debe llevar `v`**: si no, sale una escena de texto vacía.

**Visuales (`v`)**:

| `tipo` | Campos (defecto) |
|---|---|
| `foto` | `foto` (ruta sin `video/img/` ni `.jpg`), `foco` [x, y] (0.5, 0.45), `z0` (1.02), `z1` (1.12), `rot` (−1.5), `lado` `'izq'|'der'` (foto a un lado, máx. 1000 px), `texto` y `sub` (título al otro lado), `etiqueta`, `marcas` [ … ] |
| `fotos` | `fotos` (**2 o 3**; con 1 o 4 se rompe: solo hay posiciones para 2 y 3), `paso` (0.45 s entre entradas), `pies` [etiqueta por foto], `marcas` [[…], […]] (por foto), `etiqueta` (abajo al centro) |
| `texto` | `grande`, `arriba` (mono, acento), `sub` (itálica), `tam` (150), `dibujo` (id de `DIBUJOS`), `fondo` |
| `numero` | `valor`, `desde` (0), `prefijo`, `sufijo` (`'º'`/`'ª'` salen como ordinal subrayado), `dec` (0), `arriba`, `etiqueta`, `fondo`. Cuenta de 0.3 a 1.8 s, formato es-MX |
| `logo` | `logo` (ruta completa desde el `.dc.html`), `etiqueta`, `ancho` (900), `fondo` (claro por defecto) |
| `marca` | `texto`, `sub` (sin `texto` dice "La Creación del Robert") |
| `iconos` | `items` [[idIcono, rótulo]], `cols` (4), `tiempos` [fracción de `p` en que entra cada uno], `fondo`. Los íconos salen de `window.ICONOS` (200 × 200; los del Core son del estilo plano viejo) |
| `ilus` | `id` de `ILUSC` (o de `ILUS`), más los campos que esa escena lea de `v` |

**Bloques** (`armarLinea`): cada capítulo con tarjeta agrega un bloque `capitulo` de 3.2 s; cada línea con `v` abre un bloque nuevo;
una línea sin `v` suma su duración al bloque anterior (por eso `p` de una escena puede abarcar varias frases).

**Duración de cada línea** = `TIEMPOS_VOZ[n]` si existe → si no `l.d` → si no `max(2.2, caracteres/15 + 0.45)`.
`total` = suma + 1 s.

**Con la voz real** (`window.TIEMPOS_VOZ` = una duración por línea, en orden; archivo que el `.dc.html` carga **antes** de
`doc-largo.jsx`):
- **Documental por capítulos** (`tiempos_voz.mjs`): una voz por capítulo (`voz/capN.json` con `alignment` de ElevenLabs, N =
  posición del capítulo en `CAPS`). Si el texto unido del capítulo cambió desde que se generó, se detiene ("hay que volver a
  generarla"). Inicio de cada línea = tiempo del primer carácter de la línea dentro del audio; duración = inicio de la siguiente −
  inicio propio; la última = largo del audio + 0.9 s. Las tarjetas son 3.2 s de silencio. Escribe `tiempos_voz.js`.
- **Pitch** (`ejemplos/pitch/tiempos.mjs`): una sola voz; cada línea se busca en el texto alineado por sus primeros 14 caracteres
  (con los reemplazos de pronunciación, p. ej. `Fungi Mati` → `Fúngui Máti`); la voz entra a 0.45 s; si pasa del límite acelera
  hasta ×1.06. Escribe `tiempos.js` y `voz_info.json`.
- Partir una frase en dos líneas (para cambiar de imagen a media frase) no cambia el texto unido del capítulo: no gasta voz.

---

## 5. Audio

**Voz** (`narrar_largo.mjs saldo|generar|recuperar`): una petición por capítulo a `/v1/text-to-speech/<voz>/with-timestamps`
con `previous_text` (últimos 400 caracteres del capítulo anterior) y `next_text` (primeros 200 del siguiente) para que la
entonación siga; caché por `sha1(voz|modelo|texto)`; revisa saldo antes y no gasta si no alcanza; `recuperar` baja del historial lo
ya pagado. Voz por defecto `uiCk6APPfsjnw3oUQzVo`, modelo `eleven_v4` (variables `ELEVENLABS_VOICE_ID`, `ELEVENLABS_MODEL`). Reglas
de cuándo y cuánto: `protocolo-documental.md` §6.

**Música original continua** (`musica_largo.mjs`, la que llama `tiempos_voz.mjs` con los bloques ya en tiempo real):
- Reloj único a **72 BPM** (compás = 3.33 s). Cada capítulo es un **cue** en `CUES` (por posición del capítulo): `energia`,
  `celesta`, `piano`, `pizz`, `perc` (0..1) y `acordes` [[raíz MIDI, tipo]] con tipos `M, m, M7, m7, sus, add9`.
- El capítulo se reparte en acordes completos (`compás` = 2 compases si `energia` < 0.4, si no 1; `paso = dur / round(dur/compás)`),
  así cada cambio de capítulo cae justo en un cambio de acorde. **No se reinicia al cambiar de escena**.
- Para que nunca suene igual: **conducción de voces** (cada voz del acorde va a la nota más cercana del siguiente) y en cada vuelta
  impar de la progresión el acorde cambia de color (M→add9, m→m7, M7→M, m7→m, sus→M, add9→M7).
- Instrumentos sintetizados: cuerdas (3 dientes de sierra desafinados 0.997/1/1.004, filtro 600 + 1800·brillo Hz, ataque 1.4 s,
  vibrato 5.2 Hz, abiertas en estéreo), bajo, piano (4 parciales inarmónicos + golpe de martillo), celesta (brillos al azar con
  probabilidad 0.18·celesta por medio tiempo), pizzicato (Karplus-Strong), bombo, shaker, timbal y platillo. Cada capítulo crece hacia
  su final (`sube`).
- **Melodía de piano por frases de 4 acordes**: motivo, variación, desarrollo (tiende a subir), cadencia (baja y termina en la raíz);
  ritmos `[0,1.5,2,3] [0,.5,1,2,3] [0,2,2.5,3.5] [0,1,2]`; registro MIDI 64–88; 15 % de respiraciones.
- **Entre capítulos**: platillo en crescendo de 2.6 s que culmina 0.3 s después del inicio de la tarjeta + timbal en la raíz.
- **Efectos de pantalla**: escenas `numero` → 12 tics; ids que coinciden con `/plata|bronce|medalla|torre_sej|reconocimientos|monedas/`
  → brillo metálico; `/gelatina|bagazo|agar|papaya/` → 3 gotas. (Son los ids del Core: en un documental nuevo cambia esas listas.)
- Final: acorde sostenido + arpegio de piano + celesta en los últimos 8 s. Reverberación tipo Freeverb (6 peines + 2 pasa-todo,
  canal derecho desfasado 23 muestras), entrada 2.5 s, salida 4 s, saturación suave `tanh`. Determinista (semilla fija).

**Música corta (pitch)** — `ejemplos/pitch/musica.mjs <wav> <dur> <inicio_solución>`: cama de acordes de 6.4 s que se funden 1.6 s
(cero microcortes), tensa en re menor hasta la solución y abierta después, bajo de un solo oscilador que desliza 0.5 s entre raíces
(sin eco, para que no haya subibajas de volumen), brillo agudo que crece. Fórmula completa: `pitch-convocatoria.md` §4.

**Mezcla** (`tiempos_voz.mjs`, valores de `mezcla.json`):
1. Voz: une capítulos con silencios → `highpass 70 Hz` + compresor (−22 dB, 2.5:1) → ganancia para `voz_lufs` (−16 LUFS).
2. Música: ganancia para quedar `cama_db` (−6 dB) bajo la voz, partida en 4 bandas:
   graves < 220 Hz (+`graves_db` 12 dB, domados con compresor y limitador; **no** bajan al hablar si `graves_bajan_al_hablar` es
   false); **armónicos** (los graves saturados con `tanh` y filtrados 240–1800 Hz, +`armonicos_db` 12 dB: así el bajo se oye en la
   bocina de un celular); medios 220–3500 Hz con sidechain de la voz (`medios_ratio` 1.8); agudos > 3500 Hz (+`agudos_db` 3 dB,
   sidechain ligero 1.3).
3. Voz + música, EQ `presencia_3k_db` (+2.5 dB a 3 kHz) y `brillo_6k_db` (+1 dB a 6 kHz).
4. Volumen final a `final_lufs_narrado` (−7.1 LUFS) con limitador 0.84, ajustado en 4 pasadas → `voz/mezcla.m4a` (AAC 192k).
   El workflow de render la pega al video si existe. **Nunca −14 LUFS** (error del pitch que Robert corrigió).

`audio-kit.mjs` (el sintetizador de los shots, con `nota`, `pad`, `whoosh`, `gota`, `latido`…) no lo usa nada de esta carpeta: sirve
si quieres sumar efectos puntuales sincronizados (habría que adaptarlo, porque lee `OM_SCENES` de un `.dc.html` de shot).

---

## 6. Errores que Robert corrigió → reglas de dibujo

Cada fila salió de un commit de corrección (Core #00 y pitch). Revisa toda la tabla antes de mostrarle una escena.

| Lo que pasó | Regla | Qué tocar |
|---|---|---|
| Discos de vinil flotando | Todo objeto se apoya en algo: su base en la `y` de la superficie (`Tablon y + prof`), o dentro de su contenedor (cajita de madera) | Coordenadas `y` de la base; dibujar el soporte |
| Frascos encimados con bolsas; frascos "flotando" en el estante | Calcula posiciones sin traslape (`x` separadas ≥ ancho) y en el mismo plano de apoyo | Posiciones; misma `y` base |
| Lo que cargan los niños atravesaba el cuello | Lo cargado va al frente y a la altura del pecho | `Nene detalle` (se dibuja al final); `y` ≈ `hT + 40…120` |
| Un brazo tapaba una cara | Ningún brazo/objeto cruza la cara de otro personaje | `brazoD/brazoI`, orden de dibujo, `x` de los personajes |
| Brazos cruzados con manos dobles | Usar la pose hecha | `Adulto cruzados` (brazos cortos + antebrazo + 2 manos) |
| Cuello separado de la cabeza | Siempre cuello | Ya está en `Nene` (no de espaldas) y `Adulto`; en personajes nuevos, rectángulo de piel oscurecida entre cabeza y torso |
| Papá con línea de calvicie | Pelo como en la foto real | `Adulto rapado`; `canas`; `mujer` |
| Calzones a la vista | La ropa cubre: playera hasta la cadera, pantalón desde la cintura | Colores y largo de torso/piernas; revisar poses con brazos arriba |
| Mamá con el brazo detrás del poste de la puerta | Quien está en un umbral va **delante** del marco | Orden JSX: marco primero, persona después (`ejemplos/core00/cine-cap1b.jsx`, `papaya`) |
| Regadera mal armada, agarrada de cualquier lado | El objeto se arma completo y se agarra de su asa; el chorro cae dentro de la maceta | Geometría del brazo → mano; `translate(mano) rotate translate(−asa)`; chorro con Bézier de la pera a la tierra (`cine-extra.jsx`, `plantulas`) |
| Reflejos de la torre fuera de los vidrios | Los reflejos viven dentro de una celda (entre columnas y pisos) y con la misma perspectiva | Usar la misma función de perspectiva `X(x, y)` y la misma retícula (`torre_sej`) |
| Mapa con Bulgaria cuando la frase no lo dice; mapa de México inventado | Contorno real; solo los lugares que se mencionan | `MAPA_MX`; borrar lo que no se dice |
| Libritos señalados en la foto equivocada | Señalar exactamente lo que dice la voz, medido sobre la foto | `marcas` con `x, y, rx, ry` en fracciones; verificar en un cuadro |
| Medalla con un letrero encima | El rótulo no tapa al objeto principal | `<g opacity={1 − clave}>` alrededor del `Rotulo` cuando entra el objeto |
| Títulos encimados en el cruce de escenas | Al salir, el texto se apaga | Ya lo hace `DocLargo` para `texto/numero/capitulo`; dentro de un `ILUSC`, apaga los rótulos de la toma que sale |
| Niño de "Me inspiran" y plásticos encima del subtítulo | Nada importante bajo y = 880 | `y` y `s` de personajes/objetos; caras y datos arriba de 880 |
| "Salto repetido" en bucle; el último salto distinto | Acciones narrativas una sola vez; el último paso igual a los demás | `cpr` en vez de `%`; índice `i = floor(k)` con tope (`medio_fin`) |
| Monólogos solo con texto | Todo texto largo lleva dibujo | `v.dibujo` + `DIBUJOS.<id>` |
| Cortes bruscos | Fundidos | `FUNDIDO` 0.55 s; tomas internas con ventanas de 0.04–0.1 de `p` |
| Germinación del frijol mal hecha | Botánica correcta: epígea, gancho del hipocótilo, cotiledones que se abren, **epicótilo** entre cotiledones y hojas verdaderas | `GerminaFrijol` (`cine-cap0.jsx`); `PlantulaFrijol` del kit solo de lejos |
| Micelio sobre vinazas; champiñón sin composta; inóculo de color | Micología: nada de micelio sobre líquidos; el sustrato se coloniza **completo y blanco** antes de que broten setas; el grano inoculado es blanco; composta colonizada bajo el champiñón | `BolsaCultivo colonizado=1` antes de `Racimo g>0`; `Micelio` solo en sólidos |
| Frasco del pitch con contaminación | El cultivo que representa "lo bueno" se ve sano | Colores: blanco algodonoso, sin verdes/negros |
| "Fotos nomás para ilustrar" | Mejor una ilustración fiel que una foto que no corresponde | Cambiar `foto` por `ilus` |
| Objetos genéricos en vez del real (vaporera por olla de presión, bote de café por taza de bronce) | Dibujar el objeto exacto de la historia | Pieza nueva con sus rasgos reales |
| Logos tapados | Logos completos y sin nada encima | `EscenaLogo` o `FotoReal`/`<image>`; mover stickers |
| Microcorte en la música (pitch 2:28) | La música nunca se corta ni reinicia | Acordes que se funden; un solo reloj musical; no unir pedazos de música |
| Stickers de Robert tapando el subtítulo | Con sticker abajo, el subtítulo se angosta | Automático en `SubtituloLargo`; usa `arriba-der` si la escena tiene algo importante abajo |
| Sticker con la lengua de fuera en momento serio | Pose según el tono | `robert[0]` |

Reglas técnicas que se aprendieron por las malas:
- **Desenfoques que no existen**: `Desenfoque b={3|6|10|12|18}` apunta a `#c-b3`, `#c-b6`… que **no están** en `CineDefs`; según la especificación de filtros el
  navegador ignora el filtro y ese plano sale **nítido** (13 usos en los ejemplos del Core). Usa solo 1, 2, 4, 8, 14, 24, 40, o
  agrega el valor a `CineDefs` (`{blur('c-b6', 6)}`) antes de usarlo.
- **No inventes posiciones nuevas metiendo `r()` en medio de una secuencia**: cambia todo lo que viene después (el dibujo "cambia
  de forma"). Para un azar nuevo, crea otro `R(otraSemilla)`.
- **ids únicos**: `clipPath`/`gradient` con `id` único por objeto (`Frasco id`, `Petri id`, `FotoS id`). Dos escenas conviven en
  pantalla durante el fundido: un mismo id con distinto contenido se cruza. Un id repetido con contenido idéntico (los degradados
  de `Halo`, `Bokeh`) no hace daño.
- **Rendimiento**: `feGaussianBlur` sobre áreas grandes es lo más caro; humo, halos y bruma con degradados radiales (`Humo`,
  `Halo`). El grano, la viñeta y el color se hacen en ffmpeg (en el navegador costaban 65 s de render por segundo de video).
- Un bloque sigue visible 0.55 s después de su fin (fundido): su último cuadro debe estar completo.
- Fotos e imágenes dentro de ilustraciones: registradas en `fotos.js` (o en la precarga), si no salen en blanco o no salen.

---

## 7. Arrancar un documental nuevo con esta carpeta

Orden general y candados: `protocolo-documental.md`. Aquí solo lo técnico.

**1. Rama y carpeta.** Rama `largo-render/<clave>`; carpeta `largos/<clave>/` con `video/`, `fuentes/`, `guion_final.md`,
`verificacion.md`, `storyboard.md`.

**2. Copiar a `largos/<clave>/video/`:**
- De `motor/cine/`: `cine-kit.jsx`, `doc-largo.jsx`, `cine-hongos.jsx` (si hay hongos o laboratorio; no estorba), `texturas.py`,
  `preparar_fotos.py`, `validar.mjs`, `narrar_largo.mjs`, `tiempos_voz.mjs`, `musica_largo.mjs`, `mezcla.json` (o directo de
  `motor/mezcla.json`, que es el que manda), `mapa-mexico.js` (si hay mapa de México), `render_largo.mjs` (opcional).
- Del sistema de shots: `animations-v3.jsx` y `support.js` (de cualquier shot), `motor/kit/kit-robert.jsx`,
  `motor/kit/logos/logo_color.svg`, y si sale Robert en sticker, sus PNG a `video/stickers/` (p. ej. de
  `shots/002-moho-pan/assets/stickers/`).
- Texturas: `python texturas.py` (crea `video/tex/`), **y además** `tex/papel_a.png`, que `texturas.py` no genera y que usan `Papel`,
  `Pared`, `Frasco`, `MacetaC`… Cópialo del Core:
  `git show origin/largo-render/largo00-cine:largos/000-que-es-la-creacion/video/tex/papel_a.png > largos/<clave>/video/tex/papel_a.png`
  (RGBA 1920 × 1080: fibra negra con alfa 11–52 de 255).

**3. Lo que NO se copia** (es del Core o del pitch): `ejemplos/**` (escenas, `escenas.js`, `ilustraciones*.jsx`), `cine-monologos.jsx`
(haz tu propio `dibujos-<tema>.jsx` con `window.DIBUJOS = {…}` siguiendo el patrón), `cine-pitch.jsx`. Tus escenas van en
`cine-<tema>.jsx` (uno por capítulo o por bloque de capítulos).

**4. Ajustes obligatorios en lo copiado:**
- `doc-largo.jsx`: amplía `CIENTIFICOS` con las especies de tu tema; revisa `PALETA` (color por capítulo); cambia los textos del
  Core en `VerticalLargo` ("MI HISTORIA", "Mira mi historia completa en el canal") y el texto por defecto de `EscenaMarca` si no
  aplica; si dibujas imágenes dentro de ilustraciones, agrégalas a `__precarga` (o regístralas en `fotos.js` bajo `/extra/`).
- Si no copias `ilustraciones.jsx`, define al inicio de tu primer `cine-<tema>.jsx`: `window.ILUS = window.ILUS || {};
  window.ICONOS = window.ICONOS || {};` (como `cine-pitch.jsx`). Escenas `iconos` necesitan íconos en `ICONOS` (dibújalos en el estilo
  de cine: sin contorno grueso).
- `preparar_fotos.py`: cambia `CARPETAS` (hoy `fotos_restauradas`, `fotos_facebook`, `fotos_basis`) por las de tu `fuentes/`.
- `validar.mjs`: hoy truena si no existen `ilustraciones.jsx` e `ilustraciones2.jsx`; quita esas lecturas y deja solo la búsqueda
  de `ILUSC.<id> = ` en `cine-*.jsx`. Además empareja capítulos por `c.num` con el orden de `## ` en `guion_final.md`: numera los
  capítulos 0, 1, 2… en orden.
- `musica_largo.mjs`: reescribe `CUES` (uno por capítulo, con su carácter y progresión) y las listas de ids de los efectos.
- `render_largo.mjs`: cambia `'Largo 00.dc.html'` y la salida por defecto.

**5. El `.dc.html`** (parte de `ejemplos/pitch/Pitch Solve.dc.html`, que ya define el tamaño):
```html
<script>window.K_ANCHO = 1920; window.K_ALTO = 1080;</script>
<script src="./video/fotos.js"></script>
<script src="./video/mapa-mexico.js"></script>        <!-- solo si hay mapa -->
<script src="./video/escenas.js"></script>
<script src="./video/tiempos_voz.js"></script>       <!-- después de la voz; antes, un archivo con window.TIEMPOS_VOZ = null; -->
<script>window.OM_PLAYBACK = '{"mode":"times","count":1}';</script>
…
<x-import component-from-global-scope="LargoApp" from="./video/animations-v3.jsx ./video/kit-robert.jsx ./video/cine-kit.jsx
  ./video/cine-hongos.jsx ./video/cine-<tema>1.jsx ./video/cine-<tema>2.jsx ./video/dibujos-<tema>.jsx ./video/doc-largo.jsx" hint-size="100%,100vh"></x-import>
```
Orden: `kit-robert` → `cine-kit` (crea `window.ILUSC`) → piezas y escenas → `doc-largo.jsx` al final. Se guarda en `largos/<clave>/`
(las rutas `video/tex`, `video/img`, `video/stickers` son relativas a ese archivo). **`Largo 00.dc.html` del Core no define
`K_ANCHO`**: dependía de `--horizontal` del `render.mjs` de su rama; con el `render.mjs` de main saldría vertical.

**6. Herramientas de render.** El `motor/render.mjs` y `motor/preview.mjs` de main **no tienen `--desde`, `--gpu` ni `--escala` y no
esperan `window.__precarga`**. En la rama del documental reemplaza `motor/render.mjs` por
`maestro/plantillas/documental/motor/render-con-escala-desde-gpu.mjs` y agrega `maestro/plantillas/documental/motor/preview-largo.mjs`
(con `--horizontal`). Hoja de contacto: `node preview-largo.mjs ../largos/<clave> "<archivo>.dc.html" hoja.png 10,60,120 --horizontal`.

**7. Workflows** (`workflows/` → `.github/workflows/` de la rama):
- `core00-render-largo.yml` → `render-largo.yml`: cambia `LARGO`, `HTML`, los nombres `largo00_cine_mudo/narrado.mp4` y la condición
  `if: github.repository == …` (el del pitch corre en `Roberthecoder/lacreaciondelrobert-largos`, el repo público; ver
  `protocolo-documental.md` §8 y `espejo-largos.yml`). **Corrige el job `partir`**: hoy calcula la duración con la estimación
  `caracteres/15` e ignora `TIEMPOS_VOZ`, así que con la voz real puede cortar el final o renderizar de más; haz como el pitch:
  cargar `video/tiempos_voz.js` y sumar `TIEMPOS_VOZ` (+ 3.2 por cada tarjeta + 1). `PEDAZO` 20 s a 24 fps (10 s si es 4K con
  `--escala 2`).
- `core00-voz-largo.yml` → `voz-largo.yml` (corre donde vive la clave de ElevenLabs; `voz/pedido.txt` = `saldo`/`generar`).
- `espejo-largos.yml`: cambia `branches` a tu rama.
- `core00-render-verticales.yml`: solo con una rama `shots-largo/<clave>` y su `verticales/armar.mjs` (copiar de
  `origin/shots-largo/largo00` y cambiar `Largo 00.dc.html`).
- Para revisar sin render completo: `maestro/plantillas/documental/workflows/pitch-revisar-pitch.yml` (capturas a la mitad de cada
  escena), con sus rutas cambiadas.

**8. Flujo técnico.** `escenas.js` → `node validar.mjs` → hoja de contacto → push (render en la nube) → Robert aprueba → voz →
`node tiempos_voz.mjs` (tiempos + música + mezcla) → revisar las fracciones de `p` de las tomas internas → push → render narrado.

---

## 8. Deudas conocidas del kit (para quien lo mejore)

- `papel_a.png` no lo genera `texturas.py` (solo existe en la rama del Core).
- `Desenfoque` con valores sin filtro (`b` = 3, 6, 10, 12, 18) en 13 lugares de los ejemplos: esos planos salen nítidos.
- `doc-largo.jsx` es la versión del Core: no precarga imágenes de escenas (`PITCH_IMGS` del pitch) y no tiene la marca de capítulo ni
  el sello del laboratorio del pitch (`SelloLab`, en `maestro/plantillas/documental/video/doc-largo.jsx`). Convendría una lista
  genérica `window.PRECARGA_EXTRA`.
- Las mejores piezas del pitch (`FotoS`, `Velo`, `Vineta`, `Estudio`, `Mesa`, `Humo`, `Brasas`, `Txt`, `Cuenta`, `Tarjeta`, `Medidor`,
  `Paso`, `CO2`/`CH4`) no están en el kit ni exportadas.
- Específico de la biografía mezclado en lo genérico: `cine-monologos.jsx` completo (incluye `video/img/extra/beco_logo.png`),
  textos de `VerticalLargo` y `EscenaMarca`, `CUES` y efectos de `musica_largo.mjs`, `CARPETAS` de `preparar_fotos.py`, el nombre del
  `.dc.html` en `render_largo.mjs` y los workflows.
- `EscenaFotos` solo sabe acomodar 2 o 3 fotos; `Sombra` ignora el parámetro `b` que le pasan los ejemplos.
- `audio-kit.mjs` está aquí pero nada lo usa.

---
## Arreglado al guardar el kit (3 nov 2026)
- Los desenfoques `b=3, 6, 10, 12, 18` ya existen en `CineDefs` (antes esos planos salían nítidos sin querer).
- `tex/papel_a.png` ya está en `motor/cine/tex/` (cópialo a `video/tex/` del documental nuevo).
- `verticales/armar.mjs` (escribe `window.CORTE` para los cortos verticales) ya está en `motor/cine/verticales/`.
- `render-con-escala-desde-gpu.mjs` y `preview-largo.mjs` (con `--desde`, `--escala`, `--gpu` y espera de `__precarga`) ya están
  en `motor/cine/`; úsalos en lugar de `motor/render.mjs`/`preview.mjs` de main para documentales.
Las demás deudas de §8 siguen abiertas: el que haga el siguiente documental las resuelve al empezar.

## Separado de la biografía (3 nov 2026)
El kit ya no trae nada de la historia del Core fijo en el código:
- Cortos verticales: la etiqueta de arriba sale de `window.SERIE_DOC` (por defecto «DOCUMENTAL»; el Core usaba «MI HISTORIA»).
- Música: `musica_largo.mjs` lee `cues_musica.json` (un cue por capítulo: `nombre, energia, celesta, piano, pizz, perc, acordes`)
  si existe junto a él; si no, usa el arco del Core como base. Cada documental escribe el suyo según su historia.
- `preparar_fotos.py` toma todas las carpetas `fuentes/fotos_*`; `render_largo.mjs` acepta `--html "<archivo>.dc.html"`;
  `validar.mjs` ya no exige `ilustraciones.jsx` ni `ilustraciones2.jsx`.
- `cine-monologos.jsx` (dibujos de la vida de Robert) se movió a `ejemplos/core00/`.
- `EscenaMarca` sigue mostrando «La Creación del Robert» por defecto: es la marca del canal, no la biografía.
