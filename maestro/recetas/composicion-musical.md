# Composición musical — cómo hacer música refinada, compleja y humana

**Léelo antes de componer cualquier música para Robert**, de cualquier estilo: orquesta, rock, cama de un shot, lo que sea.
Lo aprendimos haciendo «Constelaciones» (nov 2026). Robert lo aprobó como conocimiento para el futuro: "este conocimiento me lo quedo yo".

Código listo para reusar: `maestro/plantillas/musica/` (ver «Herramientas» abajo; las rutas de salida apuntan a `largos/constelaciones/`, ajústalas). Proyecto completo de origen: rama `largo-render/constelaciones`, carpeta `largos/constelaciones/`.

---

## 1. Antes de escribir una nota

- **Entender qué pidió de verdad.** "Haz una versión orquestal de la música del video X" significa *rehacer ESA música* (sus capítulos, acordes y carácter) como una obra mayor, **no** componer una pieza nueva de 3 min "inspirada" en ella. Ese error molestó a Robert ("me sacaste la jalada de 3 minutos" cuando él pidió "una obra maestra").
- **Preguntar lo que cambia el resultado:** duración, para qué es (video de fondo para estudiar, shot, documental), formato, y si hay una música base.
- **Género = género completo.** "Rock" significa banda de rock y nada de orquesta: guitarras con distorsión, riffs, batería con caja en 2 y 4, bajo, solo, coro. El primer intento (melodías y cuerdas de la orquesta con guitarras encima) recibió: "eso no es rock, es música clásica todavía".
- **Tempo:** a 72 BPM la orquesta "duerme". Robert la oyó a 1.5× y le sonó "wow" → 108 BPM. Por defecto, música de fondo animada entre 96 y 120 BPM; rock con batería a ~144.
- **Costo:** todo lo de abajo es gratis. Alternativa pagada: Eleven Music (ElevenLabs), ~900 créditos por minuto por intento (verificar precio). Siempre avisar el costo y pedir permiso antes de gastar.

## 2. Qué hace que suene humano y no a "máquina"

### Forma (lo más importante)
- **Partes que contrastan.** Cada sección con su propia textura, su propio ritmo y su propio motivo: intro → verso → pre-coro → coro → puente → subida → solo → coro final → cierre (rock), o tema → desarrollo → regreso del tema con otro instrumento (orquesta).
- **Nunca el mismo patrón de 1 compás más de 4 compases seguidos.** Variar cada 2–4 compases: otro final de frase, un redoble, un acorde distinto, una respuesta de otro instrumento. La v2 del rock (un solo riff y un solo ritmo de batería durante 3 min) recibió: "extremadamente repetitivo".
- **Arco de energía:** calma → crecimiento → clímax → resolución. Crescendo con redoble y platillo al entrar a una sección fuerte; glissando que baja hacia una sección tranquila.
- **Trucos que funcionan:** el **silencio** de toda la banda medio tiempo antes del coro; un **puente que se vacía** (solo ecos y bajo) y luego crece; el **coro final un tono más arriba**; el **tema que regresa** tocado por otro instrumento; un **final con golpes de toda la banda** y un acorde que se queda sonando.

### Melodía
- **Componer, no tirar dados.** La música vieja del documental usaba melodías al azar (caminata aleatoria) y suena sin rumbo. Funciona: un **tema propio** de 4–6 compases y frases de 4 compases **motivo → respuesta → secuencia (el motivo transpuesto) → cadencia** (termina en la raíz o la tercera del acorde).
- En los tiempos fuertes, notas del acorde; en los débiles, notas de paso dentro de la escala.
- Respiraciones entre frases. Pregunta y respuesta entre instrumentos.
- El tema en mayor y en menor (bajar la 3.ª y la 6.ª) para capítulos tristes o misteriosos.
- Solo de guitarra: **frases compuestas una por una** (bend con vibrato, contestación más aguda, corrida que baja, lick que gira, corrida que sube, la nota más alta), no licks al azar.

### Armonía
- Progresiones con función (I–V–vi–IV, ii–V, etc.) y conducción de voces (cada voz va a la nota más cercana del acorde siguiente).
- En rock: acordes de quinta («power chords») y la pentatónica menor para el solo.

### Interpretación (el toque humano)
- Varias intensidades por nota (capas suave/fuerte de las grabaciones) y alternar tomas (round robin) para que dos notas iguales no suenen idénticas.
- Ataques suaves en cuerdas lentas, cortos en las rápidas; colas de liberación; vibrato que entra tarde (después de ~0.25 s).
- Guitarras rítmicas dobladas: dos tomas a izquierda y derecha con ~10 ms de diferencia.
- Batería: notas fantasma suaves en la caja, hi-hat con acento en los tiempos, redobles al cerrar las frases, crash al empezar una sección.
- Bends en la guitarra solista (subir 1–2 semitonos al atacar), vibrato en las notas largas.

### Mezcla
- La melodía 4–6 dB arriba del acompañamiento. **No puedo oír:** medir el nivel RMS de cada instrumento por sección (`niveles()` de `orquesta.py`) y corregir con números.
- Revisar siempre el **espectrograma** (`ffmpeg -lavfi showspectrumpic`): una línea horizontal fija que dura mucho es un zumbido (pasó con un platillo ride sintético con tono fijo) y hay que quitarla.
- Sonoridad final: −14/−15 LUFS para YouTube (orquesta), −12 LUFS para rock (`loudnorm`, verificar con `ebur128`).

## 3. Herramientas (en `maestro/plantillas/musica/`)

| Archivo | Qué es |
|---|---|
| `orquesta.py` | Orquesta virtual con **grabaciones reales** (VSCO 2 CE, dominio público CC0): violines, violas, chelos, contrabajo, pizzicato, arpa, flauta, oboe, clarinete, fagot, cornos, glockenspiel, timbales, platillos. Notas con intensidad, ataque, liberación, crescendos; sala de concierto (reverberación); tabla de niveles. |
| `partitura_orquesta.py` | Ejemplo grande: la música del documental #00 reorquestada (10 capítulos, 13:46, tema recurrente, desarrollo, crescendos). |
| `partitura_3min.py` | Ejemplo chico: pieza orquestal de 3 min con melodías escritas a mano por sección. |
| `rock.py` | Banda de rock **calculada**: guitarras (cuerda pulsada Karplus-Strong + distorsión de amplificador + bocina), bends y vibrato, bajo, bombo, hi-hat tipo 808, ride, toms; caja y crash grabados (CC0). Canción completa con forma de rock. |

Notas técnicas que costaron trabajo:
- **Grabaciones:** `https://github.com/sgossner/VSCO-2-CE` (CC0). Bajar solo las carpetas necesarias (~550 MB) a `~/herramientas-ia/vsco2` (variable `VSCO2`). No van en el repo.
- **Octavas:** en casi todo VSCO el archivo "A3" suena como A4 (440 Hz): sumar 12 al número de nota. El arpa no (0). Se midió con el tono real de cada archivo.
- **Timbales:** el tono que se oye es el modo principal (parciales 1 : 1.5 : 2): 41.5, 46.8, 49.5, 52.4, 54.6 (MIDI) para Timpani1–5.
- **Memoria (la compu de Robert tiene ~2 GB libres):** grabaciones en float16 y máximo 7 s (las notas largas se encadenan), y la orquesta suma directo a dos buses (seco y sala) en vez de uno por instrumento. Así 14 min de orquesta se generan en ~5 min.
- **Karplus-Strong rápido:** con `scipy.signal.lfilter` (es un filtro con retardo), no con un ciclo de Python.
- **Bends y vibrato:** leer la señal a velocidad variable (`cambia_tono` en `rock.py`).
- **Sincronía con video:** la partitura escribe un `tiempos.js` con el momento de cada evento (p. ej. una nota de arpa por estrella) para que la animación caiga exacto.

## 4. Historial de lo que dijo Robert (para no repetir errores)

| Versión | Lo que dijo |
|---|---|
| Orquesta 3 min (pieza nueva) | "Qué hermoso video musical"… pero "yo te había pedido hacer de la música del core video una obra maestra" |
| Orquesta 13:46 (la del documental, 1.5×) | Aprobada para el video largo |
| Rock v1 (orquesta + guitarras) | "Eso no es rock, es música clásica todavía" |
| Rock v2 (un solo riff todo el tiempo) | "Extremadamente repetitivo" |
| Rock v3 (canción con partes, solo compuesto, coro un tono arriba) | "Bastante bueno" |
