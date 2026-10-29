# Shot IA #26 · La IA que encontró 303 figuras escondidas en Nazca

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #26 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado y corregido (2 ⚠️ y 1 ❌ del verificador aplicados; cambiaron las líneas 1, 3, 4, 6 y 7 de la voz, pendientes de re-verificar), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N4 "La imagen que se llena": un mapa del desierto de Nazca que se va llenando de puntos (430 conocidos en negro → 303 nuevos en amarillo), con N2 "El número" de apoyo (36 → 1).
- **Gancho (de los 7):** #4 "Un número que contradice": casi cien años → 430 figuras; con IA, 303 más en seis meses.
- **Duración:** voz 967 caracteres / 168 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** en la base (`estimar-escenas`).
- **Postura de la serie:** defensa con datos y con matiz: la IA propone, los arqueólogos confirman caminando; 125 de las 303 no las señaló la IA directamente.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En casi cien años hallaron cuatrocientas treinta figuras en el desierto de Nazca, Perú. Con ayuda de una IA, trescientas tres más en seis meses. | Fondo naranja. Desde el cuadro 0, mapa esquemático de la pampa de Nazca (ríos Ingenio y Nazca, senderos); contador "casi 100 años" y 430 puntos negros que aparecen; luego "con IA · 6 meses" y lluvia de puntos amarillos "+303". |
| 1 | Ocultas | Son figuras chicas, de unos nueve metros en promedio, y tras casi dos mil años a la intemperie, apenas se ven. | Suelo de piedritas de cerca; una llama en relieve casi invisible (piedras quitadas = claro, amontonadas = borde oscuro) con "contorno agregado como guía"; persona a escala y chip "≈ 9 m · promedio de las figuras en relieve"; luego "figuras de línea: ≈ 90 m en promedio". |
| 2 | Escaner | Una IA revisó fotos aéreas del desierto en cuadritos de once metros y marcó dónde podía haber una. | Foto aérea dibujada; una cuadrícula barre de arriba abajo, celdas que se encienden (mapa de probabilidad) y recuadros cian de candidatos. Chips "fotos aéreas · 10 cm por píxel" y "cada cuadrito ≈ 11 × 11 m"; robotito. |
| 3 | Filtro | Luego, arqueólogos revisaron: de cada treinta y seis sugerencias, una prometía. | 36 recuadros-sugerencia; 35 se tachan, 1 queda con estrella. "36 → 1" y chip "47,410 recuadros revisados a ojo". |
| 4 | Pregunta | ¿Y cómo saber cuáles eran reales? | **Re-gancho.** "?" gigante sobre el mapa; Robert grande. |
| 5 | Campo | Caminando. En esos seis meses fueron a pie a trescientos cuarenta y un puntos. | El mapa otra vez: huellas que avanzan, círculos rojos en los puntos visitados, un dron chico; contador "341 puntos visitados a pie" y chip "sep 2022 – feb 2023". |
| 6 | Estudio | Confirmaron trescientas tres figuras: casi el doble. Lo publicó la Universidad de Yamagata con IBM en dos mil veinticuatro. En dos mil veinticinco, ciento sesenta más. | Columnas "hasta 2020: 430" → "2024 · +303: 733"; `TarjetaEstudio` "2024 · Univ. de Yamagata + IBM · Sakai et al. · PNAS · con París 1 y DLR"; luego columna "2025 · +160: 893" y chip "anuncio de la Univ. de Yamagata · jul 2025". |
| 7 | Matiz | Ojo: ciento setenta y ocho las señaló la IA; las demás estaban junto a esas o las hallaron personas. | Pastel de 303: 178 "las señaló la IA" (amarillo), 66 "en grupos junto a esas" (rosa), 59 "las hallaron personas sin la IA" (verde). |
| 8 | Motivos | Y sorpresa: en las chicas casi no hay animales salvajes. Hay personas, llamas y cabezas cortadas. | Chip "figuras en relieve (683)"; tarjeta "animal salvaje 6.9 %" que se tacha; luego "cabezas cortadas 32.9 %", "humanoides 33.8 %", "llamas 14.9 %". |
| 9 | Cierre | La IA dice dónde mirar; caminar el desierto dice qué es real. | **Regreso a la imagen del inicio**: el mismo mapa, ya lleno (negros + amarillos + rosas de 2025); la lupa de la IA señala un punto, llegan unas huellas y aparece la llama ✔. Chips "la IA propone" y "caminar confirma ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y seca de desierto (viento suave), continua, sin golpe marcado. Cada punto negro = clic suave; la lluvia de 303 puntos = arpegio rápido brillante; el escáner zumba al barrer y cada candidato suena; 35 tachones = golpecitos y nota para la que prometía; pasos en grava y motor del dron en "Caminando"; cada columna sube con un barrido; el animal salvaje tachado cruje; un "ding" cuando la llama se confirma al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y cómo saber cuáles eran reales?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «trescientas tres más en seis meses» (cuadro 0) |
| 2 | 9.9 | 14.9 | 04_bajando_lentes | `arriba-der` | «apenas se ven» (busca la llama escondida) |
| 3 | 19.7 | 21.2 | 13_senalando_arriba | `arriba-der` | señala los recuadros que marcó la IA |
| 4 | 21.6 | 25.7 | 06_pensativo_menton | `izq-alto` | «de cada treinta y seis sugerencias, solo una prometía» |
| 5 | 25.9 | 28.9 | 07_pensativo_puno | `grande` | «¿Y cómo saber cuáles eran reales?» |
| 6 | 35.8 | 40.0 | 13_senalando_arriba | `arriba-der` | señala la tarjeta del estudio (Yamagata + IBM, 2024) |
| 7 | 43.0 | 48.4 | 12_perfil_serio | `arriba-der` | «Ojo: ciento setenta y ocho las señaló la IA» |
| 8 | 49.0 | 54.3 | 11_sorprendido | `arriba-der` | «Y sorpresa… cabezas cortadas» |
| 9 | 54.9 | 58.2 | 05_sonriendo_dientes_uniformes | `arriba-der` | «La IA dice dónde mirar; caminar el desierto dice qué es real» |
| — | 58.3 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 36.2 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.8 s

## Fuentes (abiertas en la fuente original el 29 oct 2026)

1. Sakai, M., Sakurai, A., Lu, S., Olano, J., Albrecht, C. M., Hamann, H. F. y Freitag, M. "AI-accelerated Nazca survey nearly doubles the number of known figurative geoglyphs and sheds light on their purpose". *PNAS* 121(40): e2407652121 (publicado el 23 sep 2024). DOI 10.1073/pnas.2407652121 · PMC11459208 (texto completo abierto vía Europe PMC). Afiliaciones: Universidad de Yamagata (Japón), Université Paris 1 Panthéon-Sorbonne, Centro Aeroespacial Alemán (DLR) e IBM Thomas J. Watson Research Center.
   > "It took nearly a century to discover a total of 430 figurative Nazca geoglyphs […] leading to the discovery of 303 new figurative geoglyphs within only 6 mo of field survey, nearly doubling the number of known figurative geoglyphs." (2024)
   > "Located 50 km inland from the south coast of Peru…" · "Relief-type geoglyphs are on average only 9 m in size" · "Line-type figurative geoglyphs are large, with an average length of 90 m"
   > "After nearly 2,000 y of exposure to the elements, these geoglyphs have poor visibility, and experts need to inspect high-resolution aerial imagery with the naked eye to identify candidates for field surveys."
   > "Our AI model consumes true color ortho images of 112 × 112 pixels. These cover about 11 × 11 square meters each" · "acquired by aircraft at 10 cm effective resolution" · "a gridded classification model that returns a continuous geoglyph probability map at 5 m resolution"
   > "We visually examined the 47,410 AI candidate boxes and assigned 1,309 high-potential candidates to 3 ranks" · "We processed an average of 36 AI-model suggestions to find one promising candidate."
   > "The 341 locations visited during the 6-mo 2022/23 field survey are highlighted in red." · "The field survey of the promising geoglyph candidates from September 2022 until February 2023 was conducted on foot for ground truthing […] It required 1,440 labor hours and resulted in 303 newly confirmed figurative geoglyphs."
   > "Of the 303 newly discovered figurative geoglyphs, 178 were individually suggested by the AI and 125 were not individually AI-suggested" · "of the 125 not individually AI-suggested geoglyphs, 66 were found as part of an AI-discovered group. The remaining 59 were found during the field survey without any help from AI or during screening outside of the AI-suggested boxes."
   > "Most relief-type geoglyphs (81.6%) depict human motifs or motifs of things modified by humans (33.8% humanoids, 32.9% decapitated heads, and 14.9% domesticated camelids)." · "Wild animals, which dominate the line-type geoglyphs, represent only 6.9% (47 geoglyphs) of the relief-type geoglyphs." · relief-type "often depict humanoids and domesticated animals, more specifically llamas."
   > "Map of 303 newly confirmed and 380 previously known (black) figurative relief-type geoglyphs." · "Previous Field Surveys. Field surveys aided by aerial photography began in the 1940s and uncovered 112 figurative geoglyphs […] a total of 318 new figurative geoglyphs were discovered from 2004 to 2020."

2. Universidad de Yamagata, comunicado de prensa del 28 jul 2025 (Expo 2025 Osaka-Kansai, pabellón de Perú): https://www.yamagata-u.ac.jp/jp/download_file/view/30708/9449 (PDF abierto el 29 oct 2026).
   > 「2023 年および 2024 年に、山形大学と IBM による AI 支援の現地調査が実施され、ナスカ台地で新たに 248 点の地上絵が発見されました。このうち 160 点は、動物や人間などを表現した具象的な地上絵です。今回の発見により、具象的な地上絵の総数は計 893 点に達しました。」
   > ("En 2023 y 2024 se hizo un trabajo de campo con apoyo de IA de la Universidad de Yamagata e IBM y se descubrieron 248 geoglifos nuevos en la pampa de Nazca. De ellos, 160 son figurativos, que representan animales, personas, etc. Con este hallazgo, el total de geoglifos figurativos llegó a 893.") (2025)
   > 「これまでに、動物・人間・植物・道具などを描いた具象的な地上絵が 733 点確認されており」 ("hasta ahora se habían confirmado 733 geoglifos figurativos") (2025)

## Notas
- "Casi cien años … cuatrocientas treinta" = 112 figuras (desde los años cuarenta) + 318 (2004–2020) = 430 figurativas (50 de línea + 380 en relieve), frase textual del paper.
- "Seis meses" = trabajo de campo sep 2022 – feb 2023. "Con ayuda de una IA" (no "la IA sola"): 59 de las 303 se hallaron sin la IA, y eso se dice en la escena Matiz.
- "Casi el doble": en 2024, 430 → 733 figurativas (303 nuevas); entre las de relieve, 380 → 683. En 2025 el total subió a 893 (Universidad de Yamagata, 28 jul 2025: 248 geoglifos nuevos, de ellos 160 figurativos). "Ciento sesenta más" = figuras (figurativas), no los 248 geoglifos.
- "Nueve metros en promedio" es el promedio de las figuras en relieve ya conocidas antes del estudio (el paper no da el de las 303 nuevas, que también son en relieve); por eso la voz dice "figuras chicas, de unos nueve metros en promedio". "Noventa metros" (solo en pantalla) es el promedio de las figuras de línea, no la medida de una figura concreta.
- "Casi dos mil años a la intemperie" = "nearly 2,000 y of exposure to the elements".
- "Llamas" = camélidos domésticos (el paper dice "more specifically llamas"). "Las chicas" = las figuras en relieve (683 en total en 2024), no solo las nuevas; los porcentajes son del paper de 2024.
- "Estaban junto a esas" = 66 en grupos (a menos de 50 m) donde la IA señaló al menos una. Hallaron personas = 59 sin ayuda de la IA.
- No se dice "desde el suelo no se ven": el paper dice que las de relieve se veían desde senderos antiguos. Solo "apenas se ven" (mala visibilidad).
- El mapa y las figuras son esquemáticos (el paper no publica coordenadas exactas, por protección del sitio).
