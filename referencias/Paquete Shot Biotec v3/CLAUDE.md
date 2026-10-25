# Shots Biotecnológicos — La Creación del Robert (reglas maestras)

Serie de videos verticales de divulgación biotecnológica. Español (México), claro pero con términos correctos. Respuestas al usuario: breves y directas.

## 0. Cada shot es un TEMA NUEVO
- Cada video trata un tema biotecnológico distinto. La referencia del #23 (Cepario) es SOLO molde de formato, estilo, ritmo y audio — NO de contenido.
- No reutilizar del #23: el frasco, el rack, el congelador, el tanque, la ficha, la E. coli, el guion ni los subtítulos. Diseñar un objeto protagonista, escenas, metáforas y ejemplo real propios del tema nuevo.
- Lo único que se repite en todos: estructura general, marca de agua, paleta, tipografías, estilo de subtítulos, avatares, ritmo y flujo de audio/voz.
- **El intro NO se repite.** El flash-forward y el hook se diseñan para cada tema: qué momentos se muestran en el flash, cuántos cortes, colores de fondo de los cortes, qué pasa en el hook (impacto, transformación, revelación, explosión, crecimiento, zoom extremo…), la frase gancho y su efecto de sonido. Mantener el estilo (rápido, físico, con golpe sonoro y sacudida, <3.5 s antes de la 1ª idea), pero con un mecanismo distinto al de los shots anteriores. Prohibido copiar el "frasco que cae y se estrella" del #23.
- Si el usuario no da tema o ángulos, preguntar (tema, ángulos, ejemplo real, duración) antes de construir. No repetir temas ya publicados (ver lista abajo).
- Temas publicados (tema · intro usado): #23 Cepario · flash de 3 cortes + frasco que cae y se estrella. Agregar cada shot nuevo a esta lista al terminarlo.

## 1. Formato técnico (NO negociable)
- Cada shot = un Design Component `Shot NN Tema.dc.html` + un archivo `shotNN-tema.jsx`, montado con el motor `animations-v3.jsx` (`CompositionStage` + `useComposition`). Esto da la **barra tipo YouTube abajo** (scrub libre, play/pausa) y la **exportación directa a video**.
- PROHIBIDO: HTML plano con timeline propio, la plantilla vieja, barras de control superiores hechas a mano.
- Partir SIEMPRE de `REFERENCIA Shot 23 Cepario.dc.html` + `REFERENCIA-shot23-cepario.jsx`: copiar, renombrar `CeparioAppV2` → `ShotNNApp`, borrar todas las escenas/objetos del cepario y crear los del tema nuevo desde cero. Conservar: Backdrop, Headline, Avatar, Watermark, OutroVideo, AudioTrack, AudioUnlock, Burst, ritmo, flashes, tweaks.
- Escenas en `window.OM_SCENES` (JSON string en `<helmet>`), `OM_PLAYBACK = {"mode":"times","count":1}`.
- Lienzo 1080×1920. Si `support.js` de la carpeta no coincide con el runtime actual, borrarlo y re-escribir el DC con `dc_write`.

## 2. Identidad visual
- Fondo `#0b0c10` con halo dorado radial y hexágonos flotando tenues.
- Paleta: INK `#F6F3EC`, GOLD `#E8A62A`, GOLD2 `#F4C25A`, TEAL `#48d9a6`, TEALD `#1f8f6a`, BLUE `#2fa3d8`, RED `#e0483a`, ICE `#cfe6f2`, ICEB `#8fd8ff`, ELEC `#4fc3ff`, CORAL `#ff6b5a`, DARK `#0E0F12`.
- Tipos: **Anton** (cifras gigantes) + **Archivo** variable (wdth 62–125, peso 400–900).
- Ilustración con formas CSS (objetos protagonistas con volumen, brillos, squash & stretch). Nada de clip-art ni emojis en pantalla.

## 3. Marca de agua (logo + número)
- Logo `assets/logo_iso_dna_gold.svg` en recuadro blanco (radio 20, padding 8), 92×92 px, en `left:38px; top:180px` — más abajo que el borde para que no lo tapen los widgets de YouTube/TikTok/Instagram.
- Badge dorado `#NN` (Archivo 900, 26px) en la esquina superior derecha del recuadro.
- Visible todo el video, oculto durante el outro.
- **Número del shot: preguntar/confirmar siempre.** El último publicado fue el **#23** (Cepario) → el siguiente es **#24**.

## 4. Narrativa y ritmo (retención)
- Duración objetivo 45–60 s. Estructura: intro adaptado al tema (ver §0) → concepto → desarrollo en 2–4 bloques (con contador "MÉTODO 1/3" si aplica) → ejemplo real → cierre que involucra al espectador sin salirse del tema → "Esto fue un Shot Biotecnológico. Sígueme." → outro.
- UNA composición continua: un objeto protagonista persiste y se transforma entre escenas (no diapositivas).
- Ritmo: micro-zoom/inclinación al beat cada 1.2 s, flash blanco + punch de zoom en cada cambio de escena, sacudida en impactos. Algo nuevo en pantalla cada 1–1.5 s.
- El narrador (avatar) aparece desde ~1 s y luego cada 8–10 s, solo como reacción (pop con rebote y squash). Avatares en `assets/stickers/`. Evitar 01 y 09 salvo que se pidan.
- El tema central manda: los ejemplos (p. ej. insulina) son apoyo, no protagonistas.

## 5. Subtítulos
- Cinéticos palabra por palabra, sin pastilla, texto blanco con sombra dura.
- Palabra clave entre `*asteriscos*` → bloque "marcador" sesgado que se pinta de izquierda a derecha, tinta oscura, sombra dura, pulso.
- Color del marcador según el tema de la frase (dorado = principal; teal = biología/organismos; hielo/eléctrico = frío; coral = preguntas/emoción). Inclinación alterna ±1.5–2°.
- Línea mono pequeña en mayúsculas para matices. NO redundar: si la cifra está en pantalla en grande, el subtítulo no la repite. No repetir frases.
- Colocación arriba (y≈450–480) o abajo (y≈1560) según dónde esté la acción; nunca encima del objeto principal ni de la marca de agua.

## 6. Rigor científico
- Términos correctos y generales: "organismo/microorganismo" cuando incluya hongos, algas, etc. (no "microbio" si no aplica).
- Verificar fechas, nombres de cepas, códigos de colección (ATCC, etc.). Especies en cursiva.

## 7. Audio
- El exportador de video NO incluye audio. Siempre entregar un `.wav` final para poner en 0:00 en CapCut.
- En la vista previa: `AudioTrack` sincroniza voz, efectos y música con la línea de tiempo; `AudioUnlock` muestra "Toca aquí para activar el sonido" si el navegador bloquea el audio.
- Efectos y música se generan por código (ver `HERRAMIENTAS_AUDIO.md`). Música: beat de tensión ~100 BPM (re menor), se intensifica por escena, subidas antes de momentos clave, golpe final antes del outro.

## 8. Flujo de voz (el usuario graba con su voz)
1. Entregar `Guion VO Shot NN.md` con tiempos por línea.
2. El usuario sube su WAV + transcripción (TurboScribe, aproximada; corregir ortografía, respetar los nexos que agregó).
3. Quitar silencios (respiros de 0.22 s en comas, 0.38 s entre ideas, ~0.5 s antes de preguntas/cierre), alinear líneas, re-temporizar escenas (cada escena empieza ~0.25 s antes de su frase; cifras y sellos caen en la palabra hablada), regenerar SFX + música y entregar `MEZCLA_FINAL_shotNN.wav` (voz + música con ducking + SFX). Ver `HERRAMIENTAS_AUDIO.md`.

## 9. Redes (formato aprobado por el usuario)
- Título: `¿Pregunta? Frase gancho 🧫 | Shot Biotecnológico NN` (≤100 caracteres).
- Descripción SIN emojis: definición → lista de puntos → dato/ejemplo → frase de cierre. 
- Hashtags cortos: `#stem #ciencia` + 2–3 del tema.
