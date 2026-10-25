# Proyecto: Shots Micológicos — La Creación del Robert / Fungi Mati

Serie de divulgación científica en video corto (YouTube Shorts, TikTok, Reels,
Facebook). Formato: animación HTML autocontenida, vertical 9:16, 30–45 s (máx 60).
Serie hermana de los Shots Biotecnológicos: mismo narrador, mismo logo, misma
esencia visual. Cada shot se vincula a la marca **Fungi Mati**.

## Archivos clave
- `_PLANTILLA/` — plantilla con el motor completo (timeline, subtítulos quemados,
  13 avatares, logo/marca de agua, badge, cierre fijo, `AudioSync`, kit de dibujo).
  Renderiza de fábrica con 2 escenas de ejemplo marcadas "BORRAR".
- `GUIA_SHOT.md` — guía técnica de llenado (léela antes de construir).
- `assets/stickers/` — 13 poses del narrador.
- `assets/logo_iso_micologico.svg` — isotipo con la celda de ADN en dorado.
- `Shot 01 - El Micelio/` — ejemplo resuelto, con voz sincronizada.

## Cómo generar un Shot nuevo
Cuando el usuario dé un brief (tema + guion), **copia `_PLANTILLA/`** a
`Shot NN <título>` y edita SOLO el contenido; nunca el estilo ni las posiciones.
Borra las escenas "BORRAR" e inventa las ilustraciones del episodio. Pon el `#NN`
correcto. Al terminar: `ready_for_verification`. Si piden standalone, inlina a un
solo HTML con los assets embebidos.

## Esencia vs. variabilidad (regla de las manzanas)
Se mantiene idéntico el **estilo** (esencia): lienzo 1080×1920, fondo crema, paleta
y acento dorado `#E8A62A`/`#F4C25A`, tipografía Archivo/Anton, bloque de subtítulos,
logo/marca de agua (esquina sup. izq., ≤10% ancho), avatar como reacción, ritmo de
fundidos y motor de timeline.
Cambia **siempre** el contenido: qué se ilustra, cuántas escenas, momentos e
intervalos. No hay "organismo protagonista" ni set fijo. El hook puede ser un
hongo, una espora, una hifa, un mapa, un alimento fermentado, un objeto o foto real
— lo que el subtema pida. **No hagas dos shots idénticos.**

## Reglas absolutas (no romper)
- **Avatares**: cara del narrador reaccionando, en zona libre, NUNCA sobre
  información (diagramas, nodos, fotos, texto). No repitas una pose más de un par de
  veces seguidas. **Prohibidas las poses 01 y 09 (lengua afuera)** salvo que el tema
  sea sabor/gusto. Las reglas "no usar X salvo caso Y" son absolutas.
- **Ilustración nativa por default**: si un concepto se ilustra bien en HTML/SVG, se
  hace así (trazo INK grueso, relleno plano, acento GOLD, crecimiento animado). Usa
  imagen/logo real SOLO cuando algo no se pueda ilustrar con certeza o cuando el
  guion nombre una marca/producto real con logo — en ese caso **SOLICÍTALA al
  usuario**, no inventes placeholder ni sustituyas por genérico.
- **Logo**: isotipo negro-sobre-blanco con SOLO la **celda del ADN en dorado**
  (el ADN es el símbolo universal de biología; lo micológico es biología). Resto en
  negro. Junto al isotipo va la **marca de hongo** (sombrero dorado + tronco) que
  identifica la serie. Badge del número como píldora dorada `#NN` con el número
  CORRECTO (verifícalo contra el tema, no lo adivines). Marca de agua sup. izq.
- **Subtítulos**: quemados siempre, sincronizados, palabra clave en dorado. Zona
  segura: `bottom: 560` (NUNCA más abajo — la UI de redes tapa el tercio inferior).
  Densos = 3–5 s. Si no se alcanza a leer, extiende la duración, no comprimas.
  Subtítulo y su plano ENTRAN JUNTOS.
- **Nombres de especie**: cuando muestres un hongo concreto, rotúlalo con `NameLabel`
  (común + científico en itálica). No inventes especies; usa nombres reales.
- **Ciclo de vida**: cada elemento tiene ventana de entrada y de salida; cruces con
  fundido (~0.3–0.5 s), no cortes secos; la escena saliente se desvanece por completo
  antes de que entre la nueva sobre el mismo espacio; ningún elemento vive < ~1.2 s.
- **Movimiento**: algo cambia cada 2–4 s; nada estático > 4 s. Primeros 2–3 s = hook
  ilustrado directo (sin saludos ni intro de marca). Cierre fijo:
  "Esto fue un Shot Micológico. Sígueme." (sin alargarlo). **No hay video de cierre**
  en esta serie: el cierre es la tarjeta HTML de la plantilla.
- **Fechas y hechos**: nunca "hoy/ahora/recientemente" para hechos con fecha; la
  fecha real va DICHA en el guion y subtítulo. Respeta fechas literales del guion.
- **Rigor científico**: al animar un proceso (descomposición, fermentación,
  simbiosis, dispersión de esporas), distingue qué se conserva/recicla y qué se
  libera/consume; no simplifiques al punto de volverlo falso. Distingue seta (cuerpo
  fructífero) de micelio (el organismo). Si algo sería incorrecto, SEÑÁLALO y espera;
  no recortes ni reescribas líneas del usuario sin avisar.
- **Idioma**: español; traduce términos técnicos (salvo nombres científicos),
  desarrolla siglas, sujeto explícito en cada oración, sin redundancia, sin clickbait.
- **Flujo**: junta TODAS las preguntas creativas y hazlas de una vez ANTES de
  construir. Prioriza fidelidad al brief y calidad sobre velocidad.

## Sincronización con la voz del usuario
El usuario suele grabar el audio aparte y editarlo para quitar silencios (audio
"corrido"). Cada subtítulo = un clip. Ver **GUIA_SHOT.md → Audio** para el método:
detectar los cortes reales del MP3, anclar los subtítulos a esas pausas y montar la
pista con `AudioSync`. Si el usuario tiene un `.srt`, úsalo: es exacto.

## Nota sobre el logo
El SVG es una reconstrucción fiel. Si el usuario entrega el vector oficial,
reemplázalo en `assets/` y solo mantén la celda de ADN en dorado.
