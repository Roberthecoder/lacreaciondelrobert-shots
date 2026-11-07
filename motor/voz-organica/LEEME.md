# Voz orgánica (la voz grabada de Robert, sin ElevenLabs)

Decidido el 7 nov 2026: Robert quiere poder narrar él mismo, con el celular y sin equipo profesional, y que todo el
procesamiento lo haga GitHub. **No gasta créditos de ElevenLabs.**

## Qué hace (`procesar.py`)
1. **Limpia:** quita retumbe (<75 Hz) y ruido de fondo (aprende el ruido de los primeros segundos de silencio), suaviza las
   "s" y comprime un poco.
2. **Empareja con su voz profesional:** Matchering copia el color (ecualización) y el volumen de `referencia_robert.flac`
   (2 narraciones de ElevenLabs: #60 Portobello y #70 Hongo azul). Prueba con su grabación de WhatsApp (6 nov): la diferencia
   por banda pasó de hasta 7.5 dB a ±1.6 dB.
3. **Recorta** silencios del inicio y el final.
4. **Alinea:** Whisper (`faster-whisper`, modelo `large-v3-turbo`, con las palabras raras del guion como pista) escucha cada
   palabra; se empareja con el guion y se escriben tiempos por carácter **en el mismo formato que ElevenLabs**. Probado contra los
   tiempos exactos de ElevenLabs: error típico 0.04 s por palabra (90 % dentro de 0.12 s).
5. Si menos del 75 % del guion aparece en el audio, avisa (Robert leyó otra cosa).

## Pedido corto: «shot <tema> orgánico» / «documental <tema> orgánico»
1. Se hace todo igual que siempre (guion → verificación de hechos → animación), **pero sin pedir voz a ElevenLabs.**
2. Mándale a Robert el guion **listo para leer** en el chat (una frase por línea, sin marcas) con estos consejos:
   clóset o cuarto con cobijas · celular a 15–20 cm, un poco de lado · 3–5 s de silencio antes de hablar · leer el guion tal cual
   (si se equivoca, repetir la frase completa: Whisper se queda con lo que coincide mejor) · grabadora del celular en calidad alta
   (no nota de voz de WhatsApp si se puede evitar; si llega por WhatsApp, también sirve).
3. Cuando Robert suba la grabación al chat:
   - **Shot:** conviértela a FLAC mono y guárdala en `shots/<clave>/voz/organica.flac`
     (`ffmpeg -i <subida> -vn -ac 1 -ar 48000 -c:a flac shots/<clave>/voz/organica.flac`); en `narracion.json` pon
     `"voz_organica": "voz/organica.flac"`. **No** pongas `voz_aprobada`: la grabación de Robert ya es su aprobación y no gasta
     créditos. Push normal: GitHub procesa la voz y renderiza el narrado (`auto-render.yml` → `motor/narrar.mjs`).
   - **Documental:** `largos/<largo>/video/voz/organica.flac` (todo el documental en una grabación; se corta solo por capítulos)
     o `largos/<largo>/video/voz/organica/capN.flac` (una por capítulo). Push: el workflow `voz-organica-largo.yml` procesa,
     escribe `voz/capN.mp3`/`.json`, corre `tiempos_voz.mjs` y guarda en la rama. Luego se renderiza como siempre.
4. **Si Robert habló libre (sin guion):** primero transcribe
   `python3 motor/voz-organica/procesar.py <grabación> /tmp/limpia.flac --transcribir /tmp/transcripcion.json`,
   escribe el guion con **sus palabras** (puedes partirlo en líneas, no cambiarlo), y pásalo por la **verificación de hechos**
   como cualquier guion: si dijo algo impreciso, se le avisa y vuelve a grabar esa parte (no se corrige su voz).
5. Duración: un shot sigue necesitando 61–62 s (el candado de 60.5 s aplica). Si queda corto o largo, `"velocidad"` en
   `narracion.json` lo ajusta sin cambiar el tono, o se graba otra vez.
6. Revisa el resumen del run: «Guion alineado: X de Y palabras (Z %)». Si Z < 90 %, revisa los subtítulos en el video.

## Probarlo en una sesión de nube
`pip install --break-system-packages faster-whisper matchering soundfile` y luego el comando del punto 4 (o
`--guion guion.txt --tiempos tiempos.json`). Tarda ~30 s por minuto de audio en CPU.
