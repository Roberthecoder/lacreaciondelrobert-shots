# Shot IA #54 · Los imanes que le enseñaron a recordar a una máquina (el Nobel de Física 2024)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #54 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N3 "Capítulos y medidores" (Cap. 1 imanes → Cap. 2 la memoria de Hopfield → Cap. 3 la máquina de Boltzmann, con un medidor de "energía" en vivo) + toque de N1 (por dentro de la red).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": «Estas flechitas no son un dibujo: son átomos que funcionan como imanes».
- **Duración:** voz 964 caracteres (≈ 58.1 s estimados) + cierre 3.5 s → **≈ 61.6 s** en la base.
- **Postura de la serie:** explicar sin fórmulas por qué un premio de *Física* fue para la IA, y dejar la advertencia de Hinton con su cita textual. **No es el Nobel de Química 2024** (AlphaFold, ya contado en ia-01): se evita mencionarlo.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Estas flechitas no son un dibujo: son átomos que funcionan como imanes. Y con su física se ganó un Nobel por inteligencia artificial. | Fondo cian; desde el cuadro 0 una cuadrícula de flechitas que giran al azar y se van alineando (algo se mueve antes del s 1). Lupa sobre un imán de refri: "cada átomo ≈ un imán diminuto". Cae una medalla dorada "Nobel" con un chip de circuito. |
| 1 | Premio | El de Física de dos mil veinticuatro, para John Hopfield y Geoffrey Hinton. | Dos fichas con retrato dibujado (esquemático): "John Hopfield · Princeton" y "Geoffrey Hinton · Toronto"; chip "Nobel de Física 2024". |
| 2 | Imanes | En un imán, cada átomo es una flechita y las vecinas se influyen. | **Cap. 1 · Imanes.** Zoom a la cuadrícula: una flechita gira y empuja a sus vecinas; se forman parches que apuntan igual. |
| 3 | Pixeles | En Caltech, en mil novecientos ochenta y dos, Hopfield cambió átomos por pixeles blancos o negros. | **Cap. 2 · La memoria.** Cada flecha se convierte en un pixel (arriba = blanco, abajo = negro), unidos por líneas. Tarjeta "1982 · Caltech · Hopfield · PNAS". |
| 4 | Valle | Le guardas una imagen con baja energía. Si le das la imagen rota, la red cambia punto por punto, como pelota que rueda al valle, hasta recordarla. | La red guarda una carita sonriente; medidor "energía" baja. Llega la carita con manchas: los pixeles se voltean uno a uno; al lado, un paisaje de montes y valles con una pelota que rueda al fondo. La carita queda completa. |
| 5 | Pregunta | ¿Y si quieres que la máquina aprenda sola? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Boltzmann | Hinton usó la física de los gases, con una ecuación del siglo diecinueve: la de Boltzmann. Su máquina aprendía con ejemplos, no con instrucciones. | **Cap. 3 · La máquina de Boltzmann.** Fondo oscuro "por dentro": un frasco de gas con bolitas rebotando → se vuelven nodos (visibles y ocultos). Chip "física estadística · siglo XIX · Ludwig Boltzmann". Le entran ejemplos (gatos dibujados), el recetario de instrucciones se tacha. |
| 7 | Tamano | La red de Hopfield tenía menos de quinientos parámetros. Hoy un modelo de lenguaje puede pasar del billón. | Comparativa: red chiquita "30 nodos · < 500 parámetros (1982)" contra una red gigante que no cabe "> 1 billón (1,000,000,000,000)". |
| 8 | Aviso | Y Hinton advirtió en su discurso: no sabemos si podremos mantener el control. | Chip de cita: «We have no idea whether we can stay in control.» · discurso del banquete Nobel, 10 dic 2024. Robert serio. |
| 9 | Cierre | Estas flechitas no solo hacen imanes: le enseñaron a recordar a una máquina. | **Regreso a la imagen del inicio**: la misma cuadrícula de flechitas, ahora alineadas formando la carita recordada, con la medalla. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; cada flechita que gira hace un "tic" metálico; la medalla cae con un campanazo suave; los pixeles al voltearse suenan como teclas; la pelota rueda con un zumbido que baja de tono (la energía baja); bolitas de gas rebotando; la red gigante crece con un barrido; el aviso con un golpe grave.

## Fuentes (abiertas el 29 oct 2026)

1. **Comunicado del Nobel de Física 2024** — Real Academia Sueca de Ciencias, 8 oct 2024. https://www.nobelprize.org/prizes/physics/2024/press-release/
   > "has decided to award the Nobel Prize in Physics 2024 to John J. Hopfield … and Geoffrey E. Hinton … “for foundational discoveries and inventions that enable machine learning with artificial neural networks”"
   > "This year’s two Nobel Laureates in Physics have used tools from physics to develop methods that are the foundation of today’s powerful machine learning."
   > "[The Hopfield network] utilises physics that describes a material’s characteristics due to its atomic spin – a property that makes each atom a tiny magnet. The network as a whole is described in a manner equivalent to the energy in the spin system found in physics, and is trained by finding values for the connections between the nodes so that the saved images have low energy. When the Hopfield network is fed a distorted or incomplete image, it methodically works through the nodes and updates their values so the network’s energy falls."
   > "Hinton used tools from statistical physics, the science of systems built from many similar components."
   > Afiliaciones: Hopfield "Professor at Princeton University, NJ, USA"; Hinton "Professor at University of Toronto, Canada".
2. **Popular information, Nobel de Física 2024** ("They used physics to find patterns in information"), 2024. https://www.nobelprize.org/prizes/physics/2024/popular-information/
   > "associative memory that the physicist John Hopfield discovered in 1982"
   > "magnetic materials that have special characteristics thanks to their atomic spin – a property that makes each atom a tiny magnet. The spins of neighbouring atoms affect each other"
   > "Each node can store an individual value – in Hopfield’s first work this could either be 0 or 1, like the pixels in a black and white picture."
   > "Hopfield likened searching the network for a saved state to rolling a ball through a landscape of peaks and valleys … it will roll into the nearest valley and stop there."
   > "When this point is reached, the network has often reproduced the original image on which it was trained."
   > "Statistical physics describes systems that are composed of many similar elements, such as molecules in a gas."
   > "this depends on the amount of available energy, which is described in an equation by the nineteenth-century physicist Ludwig Boltzmann. Hinton’s network utilised that equation, and the method was published in 1985 under the striking name of the Boltzmann machine"
   > "The Boltzmann machine can learn – not from instructions, but from being given examples."
   > "In it, he used a network with 30 nodes. If all the nodes are connected to each other, there are 435 connections. … in total, there are fewer than 500 parameters to keep track of."
   > "the large language models of today, which are built as networks that can contain more than one trillion parameters (one million millions)."
   > "In 1980, Hopfield left his position at Princeton University … He had accepted the offer of a professorship in chemistry and biology at Caltech"
3. **Hopfield, J. J.** "Neural networks and physical systems with emergent collective computational abilities". *PNAS* 79(8): 2554–2558 (abril de 1982). PMC346238. Afiliación del artículo: "Division of Chemistry and Biology, California Institute of Technology, Pasadena" (y Bell Laboratories).
4. **Geoffrey Hinton – Banquet speech**, NobelPrize.org, 10 dic 2024. https://www.nobelprize.org/prizes/physics/2024/hinton/speech/
   > "There is also a longer term existential threat that will arise when we create digital beings that are more intelligent than ourselves. We have no idea whether we can stay in control."

## Notas
- "La física de los gases" = física estadística (el Nobel la explica con "molecules in a gas"). La ecuación de Boltzmann es del siglo XIX (Ludwig Boltzmann, 1844–1906).
- "Su máquina" = la máquina de Boltzmann; el Nobel la atribuye a Hinton (desarrollada con Terrence Sejnowski, publicada en 1985). En la voz se dice "Hinton usó…", como el comunicado.
- "Billón" = millón de millones (español), igual que el "trillion" del Nobel ("one million millions"). "Puede pasar" porque el Nobel dice "can contain more than".
- "Menos de quinientos parámetros": 30 nodos + 435 conexiones (Hopfield 1982, según el Nobel).
- "Hasta recordarla": el Nobel dice que la red "often" reproduce la imagen original; es la idea general, no siempre.
- La advertencia de Hinton se refiere a cuando creemos "seres digitales más inteligentes que nosotros"; en pantalla va la cita en inglés completa con su fecha.
- Hopfield hizo el trabajo de 1982 en Caltech (afiliación del artículo, también Bell Labs); al recibir el Nobel era profesor en Princeton.
- Los retratos y las redes son esquemáticos.
