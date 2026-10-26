# Recetario de formatos — La Creación del Robert

Hecho el 25 oct 2026 por ingeniería inversa de 12 canales (ver `ANALISIS.md`). Cada formato se adapta a
**tu marca**: tus colores brillantes (fondo oscuro solo en lo microscópico), trazo grueso, stickers como
reacción, logo + badge `#NN`, tu voz clonada y fuentes en la descripción. Nunca se copian sus personajes,
letras, paletas ni logos.

**Reglas que valen para todos** (detalle en `CLAUDE.md`):
- Duración total **61–62 s** (voz de ~58 s + tarjeta de cierre de 3–4 s; en mudos, 61–62 s en loop).
- Algo se mueve antes del segundo 1. Nunca abrir con una tarjeta de título quieta (es lo que hundió a
  @lil_bit_of_science: 67 K contra millones de sus vecinos).
- Primera frase (o primer texto, en mudos) que **corrige algo que el espectador cree** o lo pone a prueba.
- Barra de escala, año del estudio y fuentes: el rigor también es estética.
- Cierre que regresa al inicio (la misma imagen transformada) → invita a verlo otra vez.

Las piezas entre `[corchetes]` son componentes del kit (`motor/kit/kit-robert.jsx`).

---

## Formatos narrados

### N1 · POR DENTRO  *(de @1cell1life2: 3.3 M, 2.4 M, 1.5 M, 1.3 M)*
Algo que te pasó a ti, explicado desde el microscopio.
- **Gancho:** "Ese/Esa X no es Y: es Z" sobre tu cuerpo o tu casa.
- **Viaje:** macro (tu brazo) → micro (fondo oscuro) → la misma imagen macro, transformada.
- **Estructura 61 s:** gancho 0–4 · cómo empieza 4–15 · mecanismo 15–40 · re-gancho con pregunta ~30 ·
  estudio con año y lugar 35–50 · dato extra chistoso 50–55 · frase que regresa al gancho 55–58 · cierre.
- **Piezas:** `[Camara]` `[Escala]` `[Ambiente]` `[Brillo]` `[TarjetaEstudio]` `[Sticker]` `[CierreMarca]`.
- **Ejemplos:** por qué te arden los ojos con la cebolla · de dónde sale una ampolla · por qué se te arruga
  la piel en el agua · el moho verde del pan (micológico).

### N2 · EL NÚMERO  *(de @as.pasa1: 3 M)*
Una cifra gigante desde el cuadro 0, un mito tachado y un consejo útil.
- **Gancho:** "[Número] veces/por ciento…" + comparación visual "Tú vs. el de al lado".
- **Estructura:** número 0–3 · mito tachado ~5–8 · pregunta abierta "es algo que no puedes cambiar" ·
  cómo funciona · el estudio (quién, cuándo, cuántos) · "ahí salió el número del principio" · **qué sí
  sirve** (útil y concreto) · por qué importa · cierre que retoma el número.
- **Piezas:** `[NumeroGigante]` `[MitoTachado]` `[Comparativa]` `[Chip]` `[TarjetaEstudio]`.
- **Ejemplos:** el hongo más grande del mundo mide 9.6 km² (micológico) · 1 de cada 3 antibióticos… (biotec).

### N3 · CAPÍTULOS Y MEDIDORES  *(de @1action1reaction: 2 M)*
Un fenómeno físico o un proceso, contado en 3–4 capítulos con datos en vivo.
- **Gancho:** desmentir lo que parece ("Esto no es un pez volador: es un calamar").
- **Estructura:** gancho · Cap. 1 · Cap. 2 · re-gancho "lo increíble viene después" · Cap. 3 · comparación
  a escala humana ("como si tú recorrieras dos campos de fútbol") · frase de marca.
- **Piezas:** `[Capitulo]` `[Medidor]` `[Escala]` `[Camara]`.
- **Ejemplos:** una PCR en 4 capítulos con el termómetro en vivo (biotec) · cómo dispara sus esporas un
  hongo *Pilobolus* (micológico, con medidor de velocidad).

### N4 · LA IMAGEN QUE SE LLENA  *(de @1bit1pixel3: 2.4 M, la mejor proporción de compartidos)*
Una sola imagen (cuadrícula, barra, mapa) que se va llenando mientras la voz reflexiona.
- **Gancho:** "Esto es [algo enorme], dibujado en [unidades]".
- **Estructura:** imagen → comparación humana → partes que se colorean → autor con nombre → giro
  emocional → cita → pregunta final. Puede haber quietud larga: la voz lleva el ritmo.
- **Piezas:** `[Cuadricula]` `[Contador]` `[Chip]`.
- **Ejemplos:** tu genoma: 3,000 millones de letras en una pantalla (biotec) · cuánto de tu cuerpo no es
  tuyo (bacterias) · el tiempo que lleva el micelio en la Tierra.

### N5 · EL EXPERIMENTO  *(de @rarologia1: 859 K)*
Se recrea un experimento real, con cronómetro, como si lo vieras en el laboratorio.
- **Gancho:** la acción del experimento ("Si le acaricias el muslo con un pincel a este chapulín…").
- **Estructura:** acción → resultado sorprendente → quién y dónde → mecanismo → consecuencia a gran escala
  con **mapa de México** como medida → cierre que regresa a la acción.
- **En la descripción:** una pregunta para comentarios ("¿Cómo le dicen en tu región?").
- **Piezas:** `[Cronometro]` `[TarjetaEstudio]` `[Escala]` `[Camara]`.
- **Ejemplos:** la dormilona que "aprende" (2014) · el hongo que hace caminar a la hormiga (recrear el
  experimento de Hughes, rehaciendo tu tema 001 con buen gancho).

### N6 · GUÍA IRÓNICA EN PASOS  *(de @belltake.social: 931 K y 48 K guardados)*
"¿Quieres [algo absurdo o ambicioso]? Paso 1… Paso 7." Tono de manual, con datos reales.
- **Gancho:** la pregunta irónica + una imagen que la contradice.
- **Estructura:** 5–7 pasos con contador grande, cada paso con un documento/dato real, último paso giro.
- **Piezas:** `[Pasos]` `[Chip]` `[TarjetaEstudio]` (estilo recorte/documento).
- **Ejemplos:** "¿Quieres revivir un mamut? Paso 1: consigue un elefante" (biotec) · "¿Quieres hacer
  penicilina en casa? No. Paso 1…" (biotec/micológico, con advertencia).

---

## Formatos sin voz (temáticos)

### M1 · LA MÚSICA SON LOS DATOS  *(de @bit_wonder: 1.5 M)*
Loop donde cada elemento suena con su dato real; final que revela el truco.
- **Estructura:** título fijo arriba + número grande desde el cuadro 0 · cada ~3 s se suma un elemento que
  "toca" su dato · revelación final ("ESTE VIDEO DURÓ UN SOLO LATIDO") · conecta con el inicio.
- **Piezas:** `[Pila]` `[Contador]` + audio generado desde los datos (`gen-audio.mjs`).
- **Ejemplos:** a cuántos golpes por minuto late cada corazón · cuánto tarda en dividirse cada bacteria
  (cada división, un golpe) · cuántas esporas suelta una seta por segundo.

### M2 · ¿POR QUÉ NO…?  *(de @justincase.lessons: 1.5 M y 46 K guardados)*
La pregunta va fija arriba; un medidor muestra por qué la respuesta funciona.
- **Estructura:** situación + pregunta 0–2 · acción · `[Medidor]` que sube 40 % → 100 % · lupa que
  acerca el detalle · frase final que responde.
- **Piezas:** `[Chip]` (pregunta fija) `[Medidor]` `[Lupa]`.
- **Ejemplos (Shot Lab):** ¿por qué no se pipetea con la boca? · ¿por qué el agua va antes que el ácido? ·
  ¿por qué se flamea el asa?

### M3 · EPISODIO CON PARTICIPACIÓN  *(de @infinite.expressions: 1.7 M y 30 K guardados)*
Episodios numerados; el texto narra arriba y en un momento el espectador **hace** algo.
- **Estructura:** dato increíble con año 0–3 · explicación por paneles · **"mira fijamente el punto"** (o
  "tápate un ojo", "cuenta los…") · cómo lo ven otros animales · "Parte 1/3".
- **Piezas:** `[Chip]` (panel de texto) `[Capitulo]` (número de episodio).
- **Ejemplos:** ilusiones de color (conos) · ver tu punto ciego · cuántos olores distingue un perro.

### M4 · CICLO EN 61 s  *(de @vino.grafit: 21 % de likes)*
Un ciclo de vida completo que termina exactamente donde empezó (loop perfecto).
- **Estructura:** espora/huevo → crecimiento → reproducción → muerte que alimenta → espora otra vez.
- **Piezas:** `[Camara]` `[Escala]` `[Ambiente]`.
- **Ejemplos:** ciclo de una seta (micológico, ideal como gemelo mudo de N1) · ciclo de la levadura en el
  pan · la vida de un glóbulo rojo en 120 días.

### M5 · LA CARRERA  *(de @watchthemath: 1.4 M pero solo 1.3 % de likes)*
Simulación hipnótica con una regla escrita abajo. **Atrae vistas, no seguidores:** usar poco, como
anzuelo, siempre con un dato real (p. ej. "carrera de bacterias: cada 20 min se duplican").
- **Piezas:** `[Contador]` `[Chip]` (la regla).

---

## Parejas para cada tema (narrado + mudo)

Cada shot sale en dos versiones del mismo tema. Combinaciones que funcionan:

| Narrado | Gemelo mudo | Por qué |
|---|---|---|
| N1 Por dentro | M4 Ciclo | El mismo mundo dibujado sirve para los dos; el mudo es el proceso completo en loop |
| N2 El número | M1 La música son los datos | El número se vuelve ritmo |
| N3 Capítulos y medidores | M2 ¿Por qué no…? | Los medidores pasan a ser la respuesta |
| N4 La imagen que se llena | M1 o M5 | La cuadrícula se llena al ritmo |
| N5 El experimento | M3 Episodio con participación | El espectador hace el experimento |
| N6 Guía en pasos | M2 ¿Por qué no…? | Cada paso, una pregunta |

**Mezclas dentro de un mismo video** (cuando el tema lo pide):
- N1 + N5: viaje por dentro, y a la mitad se recrea el experimento que lo descubrió.
- N2 + N1: abre con el número gigante y luego baja al microscopio a explicarlo.
- N3 + N1: los capítulos son las etapas del viaje macro → micro.
- N6 + N2: cada paso trae un número gigante.

---

## Por serie

| Serie | Formatos principales | Primeros temas sugeridos |
|---|---|---|
| **Shot Micológico** | N1 Por dentro, N5 El experimento, M4 Ciclo | moho verde del pan · pie de atleta · la seta que brilla de noche · ciclo de vida de una seta |
| **Shot Biotecnológico** | N6 Guía en pasos, N3 Capítulos y medidores, N4 Imagen que se llena | ¿quieres revivir un mamut? · una PCR en 4 capítulos · tu genoma en una pantalla |
| **Shot Lab (sin voz)** | M2 ¿Por qué no…?, M1 Música de datos, M5 Carrera | ¿por qué no se pipetea con la boca? · bacterias que se duplican al ritmo · el agua antes que el ácido |
| **Shot (general)** | N1, N2 | experiencias cotidianas del cuerpo |

Antes de elegir tema: revisar `historial/temas.json` (nada repetido).
