# GUÍA_SHOT — cómo llenar la plantilla de un Shot Micológico

Léela completa antes de construir. La plantilla ya trae el motor, el kit de
componentes y 2 escenas de ejemplo (marcadas **BORRAR**). Tú solo escribes la
sección `===== SCENE =====` de `plantilla_shot.jsx`.

---

## 0. Anatomía de una escena
Todo se coloca con `<Sprite start={s} end={s}>…</Sprite>` sobre un `<Stage>`.
Cada Sprite es una ventana de tiempo. Dentro pones:
- una ilustración: `<Layer><Canvas> …SVG… </Canvas></Layer>`
- un subtítulo: `<Subtitle>…<Hi>palabra clave</Hi>…</Subtitle>`
- un avatar de reacción: `<Avatar src="assets/stickers/avatar_NN_....png" />`
- rótulos opcionales: `<Tag>` (píldora) o `<NameLabel>` (especie).

`useSprite()` da `localTime` y `duration` DENTRO de cada Sprite → por eso los
"growth wrappers" (GrowSeta, DigMycelium…) se auto-escalan a la ventana que les
toque, sin números mágicos.

---

## 1. Estructura narrativa (adáptala, no es fija)
1. **Hook (0–~3 s)**: ilustración directa del tema y la voz desde el segundo 0. Mito volteado o dato increíble, hablándole a "tú". Sin saludos ni intro.
2. **Desarrollo**: 1 idea por frase. Analogía → mecanismo → dato + comparación a escala humana.
   Re-gancho cada ~30 s ("pero lo increíble viene después", una pregunta).
3. **Conclusión**: la frase que resume el shot y regresa al gancho del inicio.
4. **Aclaración/matiz** (opcional): el "ojo, técnicamente…".
5. **Cierre fijo**: tarjeta "ESTO FUE UN SHOT MICOLÓGICO / Sígueme". 1–2 s, no la alargues.

---

## 2. Ritmo y ciclo de vida (reglas duras)
- Subtítulo denso = **3–5 s**. Si no se lee, ALARGA; no comprimas.
- **El subtítulo y su plano entran juntos.**
- Cruces con **fundido ~0.3–0.5 s** (`fade` en `<Layer>`), nunca corte seco.
- El plano saliente se desvanece por completo antes de que entre otro en su lugar.
- Nada vive **< 1.2 s**.
- **Narrada**: algo nuevo cada ~3 s, atado a la frase de la voz. Preferir una escena continua
  que viaja (la cámara acerca de lo grande a lo microscópico) sobre muchos cambios de escena.
  Puede haber momentos quietos mientras la voz avanza, máximo ~6 s.
- **Sin voz**: algo nuevo cada 1.5–3 s sobre el golpe de música; nada estático **> 4 s**.
- **Color**: fondos brillantes de la marca. Solo las escenas microscópicas o internas usan
  fondo oscuro (`#0E0F12` o azul noche) con los colores de la marca como acento.
- Tiempos **pegados**: cada Sprite empieza donde termina el anterior (audio corrido).

---

## 3. Estilo de ilustración (para inventar las tuyas)
- Trazo `INK` grueso (5–7 px), relleno **plano**, esquinas redondeadas.
- Acento `GOLD`/`GOLDL` para lo importante (micelio, esporas, resaltados).
- Todo **crece/entra animado** — usa `localTime` para dibujar progreso
  (`strokeDashoffset`, `scale`, `clamp`). Mira `MyceliumGroup`/`SetaGroup`.
- Reutiliza lo que sirva (`SetaGroup`, `MyceliumGroup`, `LogGroup`, `OysterCluster`,
  `TreeGroup`) pero **dibuja lo nuevo** que el tema pida. No repitas el Shot 01.

---

## 4. Subtítulos
- Siempre `<Subtitle>`; UNA palabra clave en `<Hi>`.
- Zona segura `bottom: 560` (ya fijada). NUNCA lo bajes: TikTok/Reels/Shorts
  tapan el tercio inferior con su UI.
- Sujeto explícito, español claro, sin clickbait.

---

## 5. Avatares (narrador)
- `assets/stickers/avatar_NN_....png`. Van arriba a la derecha (zona libre).
- **Nunca** sobre información. No repitas una pose 2+ veces seguidas.
- **Prohibidas 01 y 09** (lengua afuera) salvo tema de sabor/gusto.

---

## 6. Logo, marca de agua y badge (ESENCIA — casi no se toca)
- Marca de agua arriba a la izquierda: `<BrandLockup>` (isotipo con celda de ADN
  en dorado + marca de hongo) + badge píldora `#NN`.
- **Lo único que cambias: el número `#NN`.** Verifícalo contra el tema.
- El cierre usa `BrandLockup iso={300}`. Texto e interlineado fijos.

---

## 7. Audio — sincronizar el video a tu voz
El usuario graba la voz aparte y la edita para quitar silencios (audio "corrido").
**Cada clip de voz = un subtítulo.** Para que no haya desfase:

1. Copia el MP3 a `assets/narracion.mp3` (nombre sin espacios ni paréntesis).
2. Mide su **duración exacta** y pon ese valor en `const DUR = …` y en
   `AudioSync end`. Descomenta `<AudioSync src="assets/narracion.mp3" />`.
3. **Detecta los cortes reales** de la voz (análisis de envolvente del MP3): son
   las pausas entre frases. Ancla cada `<Subtitle>`/escena a esos tiempos.
   - Si el usuario tiene un **`.srt`** (CapCut → Exportar subtítulos), úsalo: trae
     texto + tiempo exacto de cada línea. Es lo más preciso; no adivines.
4. Pega las escenas: `start` de cada una = `end` de la anterior; `end` = corte de
   voz. Verifica dándole ▶: la palabra en pantalla debe coincidir con la voz.
5. Al exportar a video, `AudioSync` mezcla la voz automáticamente.

Error típico: leer mal la duración de un clip → una escena queda corta y **arrastra
el desfase** a todas las siguientes. Ancla a los cortes reales, no a estimaciones.

---

## 8. Checklist antes de entregar
- [ ] Hook directo en los primeros 2–3 s y voz desde el segundo 0 (sin intro de marca).
- [ ] Re-gancho cada ~30 s y cierre que regresa al gancho.
- [ ] Cada subtítulo se lee completo y coincide con la voz.
- [ ] Ningún avatar tapa información; sin poses 01/09 (salvo sabor).
- [ ] Badge `#NN` con el número correcto.
- [ ] Especies rotuladas (común + científico) si se muestran.
- [ ] Subtítulos en zona segura (no los tapa la UI de redes).
- [ ] Cierre fijo intacto (1–2 s). Duración total exacta de 60.0 s (verificada con ffprobe).
- [ ] Rigor científico: seta ≠ micelio; procesos no falseados.
