# Shot IA #26 · La IA que encontró 303 figuras escondidas en Nazca

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #26 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** FASE A · guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N4 "La imagen que se llena": un mapa del desierto de Nazca que se va llenando de puntos (430 conocidos en negro → 303 nuevos en amarillo), con N2 "El número" de apoyo (36 → 1).
- **Gancho (de los 7):** #4 "Un número que contradice": casi cien años → 430 figuras; con IA, 303 más en seis meses.
- **Duración:** voz 961 caracteres / 169 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** estimado (`estimar-escenas`).
- **Postura de la serie:** defensa con datos y con matiz: la IA propone, los arqueólogos confirman caminando; 125 de las 303 no las señaló la IA directamente.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | En casi cien años hallaron cuatrocientas treinta figuras en el desierto de Nazca, en Perú. Con ayuda de una IA, trescientas tres más en seis meses. | Fondo arena/amarillo. Desde el cuadro 0 un mapa esquemático de la pampa de Nazca; contador "~100 años" y 430 puntos negros que aparecen poco a poco; luego un reloj "6 meses" y una lluvia rápida de puntos amarillos con contador "+303". |
| 1 | Ocultas | Las nuevas miden unos nueve metros y, tras casi dos mil años a la intemperie, apenas se ven. | Zoom a un punto: piedras del desierto con una figura en relieve (una llama) casi invisible; una persona a escala para comparar ("≈ 9 m"); el contorno se intuye apenas. Comparación: colibrí de líneas "≈ 90 m" (línea) vs. relieve "≈ 9 m". |
| 2 | Escaner | Una IA revisó fotos aéreas de todo el desierto en cuadritos de once metros y marcó dónde podía haber una. | Foto aérea (dibujada) con una cuadrícula que barre; cuadritos "11 × 11 m" que se iluminan; mapa de calor con manchas de probabilidad. Robotito escaneando. |
| 3 | Filtro | Luego los arqueólogos revisaron: de cada treinta y seis sugerencias, solo una prometía. | Fila de 36 cuadritos-sugerencia; 35 se tachan y 1 queda con estrella. Número gigante "36 → 1". Chip "47,410 recuadros revisados a ojo". |
| 4 | Pregunta | ¿Y cómo saber cuáles eran reales? | **Re-gancho.** "?" gigante sobre el mapa; Robert grande. |
| 5 | Campo | Caminando. Entre dos mil veintidós y dos mil veintitrés visitaron a pie trescientos cuarenta y un puntos. | Huellas que avanzan por el mapa; botas, un dron chico; contador "341 puntos visitados" y fechas "sep 2022 – feb 2023". |
| 6 | Estudio | Confirmaron trescientas tres figuras: casi el doble. Lo publicó un equipo de la Universidad de Yamagata e IBM en dos mil veinticuatro. | Barras "antes: 430" y "ahora: 733". `TarjetaEstudio` "2024 · PNAS · Sakai et al. · Univ. de Yamagata + IBM (con Univ. París 1 y DLR)". |
| 7 | Matiz | Ojo: ciento setenta y ocho las señaló la IA; las demás estaban junto a esas o las hallaron personas. | Pastel de 303: 178 "las señaló la IA" (amarillo), 66 "en grupos junto a esas" (rosa), 59 "las hallaron personas sin la IA" (verde). |
| 8 | Motivos | Y sorpresa: en las chicas casi no hay animales salvajes. Hay personas, llamas y cabezas cortadas. | Íconos de las figuras en relieve: humanoide 33.8 %, cabeza cortada 32.9 %, llama 14.9 %; animal salvaje "6.9 %" chiquito y tachado. |
| 9 | Cierre | La IA dice dónde mirar; caminar el desierto dice qué es real. | **Regreso a la imagen del inicio**: el mismo mapa, ahora lleno de puntos amarillos; la lupa de la IA señala y unas huellas llegan al punto, que se vuelve una llama dibujada ✔. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y seca de desierto (viento suave), continua, sin golpe marcado. Cada punto negro = clic suave; la lluvia de 303 puntos = arpegio rápido brillante; el escáner zumba al barrer; 35 tachones = golpecitos; pasos en grava en "Caminando"; un "ding" cuando la llama se confirma al final.

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

## Notas
- "Casi cien años … cuatrocientas treinta" = 112 figuras (desde los años cuarenta) + 318 (2004–2020) = 430 figurativas (50 de línea + 380 en relieve), frase textual del paper.
- "Seis meses" = trabajo de campo sep 2022 – feb 2023. "Con ayuda de una IA" (no "la IA sola"): 59 de las 303 se hallaron sin la IA, y eso se dice en la escena Matiz.
- "Casi el doble": 430 → 733 figurativas (303 nuevas). Entre las de relieve: 380 → 683.
- "Nueve metros" es el promedio de las figuras en relieve (el tipo de las 303 nuevas); "unos".
- "Casi dos mil años a la intemperie" = "nearly 2,000 y of exposure to the elements".
- "Llamas" = camélidos domésticos (el paper dice "more specifically llamas"). "Las chicas" = las figuras en relieve (683 en total), no solo las nuevas.
- "Estaban junto a esas" = 66 en grupos (a menos de 50 m) donde la IA señaló al menos una. Hallaron personas = 59 sin ayuda de la IA.
- No se dice "desde el suelo no se ven": el paper dice que las de relieve se veían desde senderos antiguos. Solo "apenas se ven" (mala visibilidad).
- El mapa y las figuras son esquemáticos (el paper no publica coordenadas exactas, por protección del sitio).
