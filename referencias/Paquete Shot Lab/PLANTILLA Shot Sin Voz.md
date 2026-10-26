# Plantilla — Shot sin voz (música + subtítulos)

Referencia de formato: `Shot Lab Comestibles.dc.html` + `shot-lab.jsx`. Cada shot = TEMA NUEVO. Se reutiliza el motor, no el contenido.

## Lo que se repite (motor)
- Vertical 1080×1920, `animations-v3.jsx`, barra de reproducción y exportación a video.
- Marca de agua con logo y número, avatares que reaccionan, subtítulos con marcador de color por palabra clave.
- Música de ~125 BPM con golpe en cada corte, efecto de sonido en cada gag y WAV final generado por código.
- Tono: afirmación directa, ridícula y provocadora, pero correcta. Se dice, no se pregunta. La letra pequeña (el "*") va en una línea mono, nunca en un sermón.

## Lo que NUNCA se repite (catálogo — tachar al usar)
**Inicio (mecanismo del gancho):** ~~tenedor que se clava en una placa de Petri~~ · microscopio que hace zoom hasta salir por el ocular · tubo de ensayo que se tira de cabeza como clavadista · centrífuga que escupe el título · célula que se divide en las palabras del título · rayo que imprime el título en una placa.

**Transiciones (base + capa):** franjas, mosaico y anillos (usadas) · persianas verticales · hexágonos en panal · gotas que salpican · zoom a través de un poro · tablero de ajedrez que gira · tinta que se derrama · cuadros de cómic que se arman.

**Gags por escena:** ~~colonias que huyen~~ · ~~salero sacudido~~ · ~~limón exprimido en pinza~~ · ~~frasco buffer y pastel~~ · ~~cerebro que empuja a la célula~~ · ~~etiqueta que cambia al escanear~~ · ~~menú final~~.

**Cierre:** ~~"Buen provecho"~~ · cada tema tiene su remate propio en una línea.

## Reglas de ritmo sin voz
- Subtítulo: ≥0.3 s por palabra, mínimo 1.8 s en pantalla, máximo 9 palabras por bloque.
- Duración total exacta de 60.0 s, pensada como loop: el final conecta con el inicio o trae un giro que invite a verlo otra vez.
- Algo nuevo cada 1.5–3 s; nada estático más de 4 s; cambio de escena cada 5–6.5 s, siempre sobre un golpe de música.
- Cada gag tiene un efecto de sonido; el sonido cuenta la acción. Si el tema lo permite, la música sale de los datos (ritmos, conteos, tamaños).
- Paleta: cada escena usa un fondo saturado distinto (rosa, magenta, azul, amarillo, menta, violeta, cian…). Excepción: las escenas microscópicas o internas van en fondo oscuro (`#0E0F12` o azul noche) con colores de la marca como acento.

## Para pedir un shot nuevo
"Shot sin voz #NN sobre [TEMA]. Ángulos: [lista o decide tú]." → leo este archivo, elijo elementos del catálogo que no estén tachados, construyo y los tacho.
