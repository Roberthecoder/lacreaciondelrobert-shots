# Estilo cine — la biblia larga (22 nov 2026)

Complementa la sección «Modo cine» de `CLAUDE.md`. Aquí queda lo que se midió y se vio, para que quien haga shots después
(una persona o una sesión de Claude en 2027) entienda el porqué y no regrese al estilo viejo.

## Qué se comparó
- Canales de referencia: 1Cell1Life (biología del cuerpo), 1Bit1Pixel, 1Volt1Amp, 1Action1Reaction. Su método público
  (1idea1video.com): una idea que sorprende, gancho que contradice, guion encadenado (pregunta, porqué, consecuencia, dato),
  "se ve lo que dice la voz", un punto de atención, nada quieto mucho tiempo, cambios de plano cada 2–14 s, videos de 60–150 s.
- Números del 22 nov 2026 en YouTube: 1Cell1Life 113 Shorts, 112 mil suscriptores, mediana 126 mil vistas, mínimo 9 100.
  1Bit1Pixel 53 Shorts, mediana 1 400. 1Volt1Amp 9 Shorts, mediana 1 500. La Creación del Robert: 44 shots en noviembre,
  mediana 816, máximo 1 258; porcentaje visto 25–45 %; en TikTok promedio de 5.9 s vistos de 67.
- Videos de la referencia revisados cuadro por cuadro: «El mosquito no te pica con una aguja: te mete seis» (141 s) y
  «Cuando comes piña, la piña también te come a ti» (106 s).

## Lo que se vio en la referencia, cuadro por cuadro
- Segundo 0: imagen cotidiana en primer plano que llena la pantalla (la boca abierta con el trozo de piña en la lengua; el
  mosquito parado sobre la piel con los vellos). Colores de piel con sombreado suave, no colores planos de marca.
- Segundo 3: ya estamos adentro (corte de la piel con capas de células; la enzima como una figura verde de contorno brillante
  cortando una cadena de cuentas luminosas sobre fondo casi negro).
- Lo microscópico: contornos con resplandor sobre fondo oscuro, rellenos apagados, líneas onduladas tenues de fondo.
- Regresos a escala real a lo largo del video (la piña con dos lupas "FRUTA" y "TALLO"; la lengua; un vaso sobre una mesa de
  madera): siempre un objeto grande y centrado, con su propio escenario.
- Texto: casi ninguno. Una o dos etiquetas cortas en mayúsculas con línea guía. Sin subtítulos quemados, sin logo, sin chips,
  sin tarjetas de papel, sin stickers de una persona. Cierre: nombre del canal y "Sígueme para más biología" sobre oscuro.
- Sonido (medido con analizador sobre el video): energía repartida entre 120 y 500 Hz, centro en ~540–600 Hz, acordes de do
  mayor, ninguna nota fija dominante.

## Lo que teníamos y por qué fallaba
- Fondos rosa, cian o amarillo con puntos, distintos en cada escena: se leía como presentación de diapositivas.
- Sticker fotográfico de Robert en pantalla ~30 % del tiempo, caja de subtítulo grande encima del dibujo, chips y tarjetas:
  cuatro puntos de atención a la vez.
- Primeros 6 segundos casi quietos; escenas que eran láminas (un signo de interrogación, íconos, una tarjeta con el año).
- Cama de música: tres notas graves fijas (110, 165, 220 Hz) con los graves subidos 12 dB y final a −7.1 LUFS; centro en 228 Hz.
- 44 videos subidos en un mes y temas de nicho mezclados con temas cotidianos.

## Lo que todavía no iguala a la referencia (trabajo pendiente para quien siga)
- **Riqueza del dibujo:** el kit (`motor/kit/kit-robert.jsx` y los kits por serie) dibuja piezas planas tipo caricatura. La
  referencia dibuja con sombreado y con línea luminosa. Para shots nuevos: dibujar el sujeto grande, con degradados suaves en
  lo macro y contorno con resplandor en lo micro; agregar esas piezas al kit para reutilizarlas.
- **Primer cuadro a pantalla completa:** muchos shots viejos abren con un objeto chico al centro. En shots nuevos el primer
  cuadro se diseña primero y debe funcionar como portada.
- **Duración según el tema:** la referencia usa 100–140 s en sus videos más vistos; aquí la voz ya grabada fija 61–75 s.

## Archivos
`motor/kit/cine.jsx` (capa de estilo e interruptores), `motor/kit/aplicar-cine.py`, `motor/kit/auditar-laminas.py`,
`motor/kit/cama-luminosa.mjs`, `motor/mezcla.json`, `maestro/recetas/pase-a-mano-cine.md`, `maestro/re-render-cine/`.
