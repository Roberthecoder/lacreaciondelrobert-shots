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

## Volumen del dibujo (22 nov 2026)
La referencia sombrea sus piezas y sus líneas brillan; las nuestras eran rellenos planos. `motor/kit/cine.jsx` aplica a cada
SVG el filtro `#cine-vol`: relieve por luz difusa y especular (la altura sale del brillo de cada pieza), y un halo desenfocado
del propio color de la pieza en lugar del resplandor azul fijo. Se ajusta en `CINE_VOL` (suave, relieve, brillo, halo,
haloFuerza) y se apaga con `CINE_OPC.volumen`. Revisado en hojas de cuadros de fagos, alucinaciones, barrenador, dedos,
cebolla y arrieras.

## Tamaño del sujeto: se arregla a mano
Se probó un encuadre automático (`motor/kit/encuadrar.py`: mide la caja del dibujo por escena y la agranda). Sirve en escenas
angostas, pero muchos shots dibujan piezas fuera de la `Escena` y esas no se mueven con lo demás, así que el medidor descarta
la mayoría de las escenas y tarda unos 2 minutos por shot. Queda como herramienta opcional. Lo que sí funciona es el encargo
del pase a mano: agrandar el sujeto 1.4 a 2.3 veces escena por escena y recalcular las barras de escala (ejemplos: qui-08-cebolla,
fun-22-arrieras, amb-08-vaquita, cie-07-esponja).

## Segunda revisión de la referencia, segundo a segundo (22 nov 2026, admin maestro)
Videos (copias internas en el repo PRIVADO `lacreaciondelrobert-archivo`, `referencias/videos/`; no se publican): 1Cell1Life
«óvulo y chispa de zinc» (4.2 M en YouTube), «la hormona de la barba te deja calvo» (2.7 M), «el piojo» (2.1 M); 1Bit1Pixel
«tu vida en una pantalla» (2.4 M en TikTok), «ir a 120» (2.2 M), «el granjero» (1.3 M). Lo que se vio:
- **Segundo 0 ya es acción a mitad de escena** (el espermatozoide entrando, la barba creciendo cuadro a cuadro, la franja que
  barre la cuadrícula, los coches avanzando). Algo cambia cada segundo en los primeros 10 s; cero texto en ese tramo salvo la barra.
- **Paleta apagada y corta:** 2–3 colores por video; fondo casi negro o un escenario propio (pelo y piel café oscuro, río verde).
  Aplicado: `saturate(0.8)` en todo el dibujo (`CINE_REF.saturacion`).
- **Barra de escala siempre abajo a la izquierda**, chica, con su unidad, y cambia con el zoom. Aplicado (`CINE_REF.escalaX/Y`).
- **Etiquetas:** palabra corta en mayúsculas o monoespaciada chica con línea fina; chips de 1Bit1Pixel con borde de 2 px y texto
  monoespaciado, sin píldoras gordas ni sombra. Aplicado: `Chip` y `Etiqueta` se redefinen en `cine.jsx`.
- **Número grande:** blanco, sans gruesa, sin contorno, con una línea chica monoespaciada abajo («2-3 mm / como una semilla de
  ajonjolí»). Aplicado: `NumeroGigante` se redefine en `cine.jsx`.
- Sin subtítulos ni logo durante el video (el logo pequeño sí va por decisión de Robert); cierre con el nombre del canal en chico.
- Pendiente por shot (no se puede desde la capa general): el «?» gigante amarillo de las escenas «Pregunta» está dibujado dentro
  de cada `.jsx`; la referencia usa a lo más un «?» chico sobre el personaje. Y la riqueza del dibujo (sombreado, pelo trazo a trazo).
