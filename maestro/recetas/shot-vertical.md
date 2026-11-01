# Receta · Shot vertical (61–62 s)

**La fuente de verdad es `CLAUDE.md` de la raíz** (reglas completas). Esto es el mapa para reproducir un shot de punta a punta y
lo que no está escrito allá.

## Dónde está cada parte
| Parte | Archivo |
|---|---|
| Por qué funciona (120 videos de 12 canales analizados con un analizador dentro de TikTok) | `referencias-externas/ANALISIS.md`, `FORMULA_VIRAL.md` |
| Formatos N1–N6 y reparto por serie | `referencias-externas/RECETARIO.md` |
| 7 ganchos y prohibiciones de apertura | `CLAUDE.md` §Ganchos |
| Ritmo, estructura de ~58 s de voz, macro→micro→macro, color | `CLAUDE.md` §Ritmo |
| Robert en pantalla (≥ 6 apariciones, ≥ 18 s, ≥ 4 poses, tabla en guion.md) | `CLAUDE.md` + 13 stickers en `shots/001-hormiga-zombi/assets/stickers/` |
| Kit de piezas (Camara, CamaraAnidada, Lupa, Subtitulo, MarcaAgua, CierreMarca, Mundo*…) | `motor/kit/kit-robert.jsx`, catálogo `motor/kit/LEEME.md`, demo `shots/_demo-kit/` |
| Logo por tema (hexágono dorado: ADN, matraz, átomo, brillitos) | `motor/kit/logo.mjs`, `motor/kit/logos/` |
| Voz + mezcla | `motor/narrar.mjs` (una petición ElevenLabs con caché por hash; escenas estiradas a la voz; `window.SUBS`) |
| **Sonido oficial** (Robert eligió la muestra «5», 30 oct) | `motor/mezcla.json`: voz −16 LUFS, cama −6 dB, graves +12 dB que no bajan al hablar, armónicos +12, medios ratio 1.8, agudos +3, presencia 3 kHz +2.5, brillo 6 kHz +1; master **narrado −7.1 LUFS** (suena fuerte con el celular al 50 %), sin voz −11 LUFS; limitador pico −1.5 dB (en `motor/render.mjs`) |
| Pronunciaciones | `motor/pronunciacion.json` |
| Textos por red | `motor/plantillas/publicacion.md` → `shots/<clave>/publicacion.md` (título: gancho primero y «\| Shot <Serie> NN» al final, sin «#») |
| Verificación de hechos | `CLAUDE.md` §Verificación; candado en `auto-render.yml` |
| Render y videos al chat | `PRODUCCION_NUBE.md`, `CLAUDE.md` §Videos al chat |
| Sala | `CLAUDE.md` §Sala, `motor/sala.py`, `sala/LEEME.md` |

## Flujo mínimo
1. Tema nuevo (`node historial/consolidar.mjs --buscar "…"` + títulos de la Sala). 2. Formato N1–N6. 3. `guion.md` + `narracion.json`
(gancho de los 7, ~160–165 palabras). 4. Verificador independiente (subagente) → `verificacion.md` → `VEREDICTO: APROBADO`.
5. Animación `.dc.html` + `.jsx` con el kit (terminar con `window.MiApp = MiApp;`). 6. `motor/preview.mjs` (hoja de cuadros).
7. Push → GitHub renderiza la versión sin voz. 8. Robert aprueba la voz (Sala o chat) → `voz_aprobada: true` → narrado final.
9. `publicacion.md` con 7 redes. 10. Subir a la Sala, videos al chat, registrar tema en `historial/nuevos/`.

## Lecciones de Robert (shots)
Ver `correcciones-de-robert.md` §Shots: biología exacta (moho del pan), cifras con fuente abierta (cepario), stickers de Robert
siempre, títulos con serie y número, nada de "RAYOS X" (→ «AL MICROSCOPIO» / «POR DENTRO»).
