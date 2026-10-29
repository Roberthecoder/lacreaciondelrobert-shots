# Shot Químico #35 · Esa vela no quema la cera que ves (quema cera hecha vapor)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #35 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (la vela encendida en la mesa → corte de la copita, la mecha y la llama por dentro → la misma vela, ahora con sus zonas etiquetadas) + N3 "Capítulos y medidores" (Cap. 1 se derrite · Cap. 2 sube · Cap. 3 se vuelve vapor y arde, con termómetro/medidor) + N5 en versión histórica (el tubito de Faraday, 1860–61).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Esa vela no está quemando la cera sólida que ves: está quemando cera hecha vapor."
- **Seguridad:** el truco del humo se muestra solo como demostración en pantalla (como la hizo Faraday) y la voz dice "Es fuego de verdad, no un juego". Nunca se ve a un niño con el cerillo ni se invita a hacerlo; en la descripción va la advertencia completa (ver Notas).
- **Duración:** voz 954 caracteres / ≈ 187 palabras (≈ 57.9 s) + cierre 3.5 s → **≈ 61.4 s** (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`, VEREDICTO: APROBADO), animación lista (`vela.jsx`, `Shot Vela base narrada.dc.html`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~954 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa vela no está quemando la cera sólida que ves: está quemando cera hecha vapor. | Fondo amarillo. Desde el cuadro 0 la llama de una vela blanca en su platito parpadea y se mece. Flecha a la cera sólida ("¿esto arde?", se tacha) y salta a una zona invisible justo sobre la mecha que se ilumina ("¡esto!": nubecita de vapor). Barra de escala "1 cm". |
| 1 | Copa | El calor de la llama derrite la cera de arriba y forma una copita líquida. | `Lupa` en rayos X sobre la punta de la vela: la cera de arriba se vuelve brillante y líquida y se forma una copita con borde sólido; flechitas de aire frío que suben por los lados. Chip "Cap. 1 · se derrite". Termómetro que sube. |
| 2 | Mecha | Esa cera sube por los hilos de la mecha por capilaridad, como el agua por una servilleta. | Corte a la mecha (fondo noche): hilos de algodón trenzados; gotas doradas de cera líquida trepan entre los hilos. A un lado, mini-escena: una servilleta con la punta en un vaso de agua y el agua azul que sube. Chip "Cap. 2 · capilaridad". Escala "1 mm". |
| 3 | Vapor | Arriba se vuelve vapor, y ese vapor, al juntarse con el oxígeno del aire, es lo que arde. | En la punta de la mecha las gotas se deshacen en moléculas de vapor (nubecita gris); desde afuera llegan moléculas de O₂ (azules) y donde se juntan aparece una capa delgada que se enciende (la "piel" de la llama). Chip "Cap. 3 · vapor + O₂ → arde". |
| 4 | Brillo | Lo amarillo son partículas de hollín, carbono sólido tan caliente que brilla. | Zoom a la parte amarilla: puntitos negros (C, hollín) que se ponen al rojo y luego amarillo-blanco al subir. Chip "hollín incandescente". La base azul de la llama queda abajo, sin puntitos. |
| 5 | Pregunta | ¿Y cómo sabemos que lo que arde es el vapor? | **Re-gancho.** La vela del inicio en silueta con un "?" gigante sobre la zona oscura de la llama. |
| 6 | Faraday | En unas conferencias de Navidad en Londres, entre 1860 y 1861, Michael Faraday metió un tubito de vidrio en la parte oscura de la llama, sacó ese vapor y lo prendió en la otra punta. | `TarjetaEstudio` "1860–61 · Royal Institution, Londres · Faraday". Escena: un tubo de vidrio doblado entra en el centro oscuro de la llama; un hilito blanco viaja por el tubo; en la otra punta una astilla encendida lo prende y aparece **una segunda llamita lejos de la vela**. Chip "¡una vela por tubería!". |
| 7 | Humo | Al apagarla, ese humo es cera evaporada: una llama a unos centímetros baja por él y la vuelve a encender. Es fuego de verdad, no un juego. | Un soplido suave apaga la vela: sube una columna de humo blanco. Una astilla encendida se acerca por arriba (regla "unos cm"); un hilo de fuego baja por el humo y la mecha se vuelve a prender. Al final, chip de advertencia ⚠️ "fuego de verdad · no es un juego". |
| 8 | Espacio | Lo curioso: en el espacio, sin aire caliente que suba, la llama de una vela es redonda, azul y sin hollín. | Fondo azul noche con estrellas: a la izquierda la llama en la Tierra (gota amarilla con flechas de aire que suben); a la derecha la llama en microgravedad: esfera azul, sin flechas. Chips "Tierra" · "microgravedad". |
| 9 | Cierre | Así que tu vela no quema la cera que ves: quema la que ya se volvió vapor. | **Regreso a la vela del inicio**, ahora con etiquetas: "cera sólida", "copita líquida", "mecha: capilaridad", "vapor", "hollín que brilla". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química sobre la llama oscurecida. |

**Música:** cama grave continua y cálida; efectos en el mismo cuadro: chisporroteo suave de la llama, goteo al derretirse, burbujeo fino cuando la cera sube por la mecha, "fuf" cuando se enciende el vapor, golpe de la tarjeta, siseo del tubo y "fuf" de la segunda llamita, soplido y silencio al apagar, "zum" del fuego que baja por el humo, tono etéreo en la escena del espacio.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena con `CUES`). Grande en «¿Y cómo sabemos que lo que arde es el vapor?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «está quemando cera hecha vapor» |
| 2 | 5.5 | 9.3 | 13_senalando_arriba | `izq-alto` | «forma una copita líquida» |
| 3 | 10.1 | 14.7 | 06_pensativo_menton | `izq-alto` | «por capilaridad, como el agua por una servilleta» |
| 4 | 15.5 | 20.1 | 04_bajando_lentes | `izq-alto` | «ese vapor… es lo que arde» |
| 5 | 20.9 | 24.8 | 05_sonriendo_dientes_uniformes | `izq-alto` | «carbono sólido tan caliente que brilla» |
| 6 | 25.15 | 27.9 | 07_pensativo_puno | `grande` | «¿Y cómo sabemos que lo que arde es el vapor?» |
| 7 | 31.2 | 38.4 | 13_senalando_arriba | `izq-alto` | «metió un tubito… y lo prendió en la otra punta» |
| 8 | 39.2 | 46.6 | 10_serio_molesto | `izq-alto` | «Es fuego de verdad, no un juego» |
| 9 | 47.5 | 53.0 | 11_sorprendido | `arriba-der` | «redonda, azul y sin hollín» |
| 10 | 53.6 | 57.8 | 02_apuntando_camara | `arriba-der` | «quema la que ya se volvió vapor» |
| — | 57.9 | 61.4 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 48.6 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **La llama derrite la cera y forma una copa; el líquido sube por la mecha por capilaridad** — Faraday M. *The Chemical History of a Candle* (ed. W. Crookes), Lección I. Project Gutenberg eBook #14474, https://www.gutenberg.org/ebooks/14474 (texto de las conferencias de 1860–61; libro de 1861).
   > "You see, then, in the first instance, that a beautiful cup is formed." · "the part within melts by the flame that runs down the wick as far as it can go before it is extinguished, but the part on the outside does not melt."
   > "It is by what is called capillary attraction that the fuel is conveyed to the part where combustion goes on" · "The fluid has risen by the capillary attraction of the piece of cane, just as it does through the cotton in the candle."
2. **Lo que arde es la cera hecha vapor; el vapor se junta con el aire y arde entre los dos** — Faraday, Lección II (Gutenberg #14474).
   > "We find that this is the wax of the candle made into a vaporous fluid—not a gas." · "In the middle of the flame, where the wick is, there is this combustible vapour; on the outside of the flame is the air which we shall find necessary for the burning of the candle; between the two, intense …"
3. **El tubito en la parte oscura de la llama; se prende el vapor en la otra punta** — Faraday, Lección II (Gutenberg #14474).
   > "I am about to put the end of this glass tube into the middle of the flame—into that part which old Hooke has represented in the diagram as being rather dark" · "get that vapour to pass through the tube to the other extremity, where we will light it, and obtain absolutely the flame of the candle at a place distant from it. Now, look at that. Is not that a very pretty experiment? Talk about laying on gas—why, we can actually lay on a candle!"
4. **Lo amarillo: partículas sólidas de carbono incandescentes** — Faraday, Lección II (Gutenberg #14474) y NASA (fuente 7).
   > "it is to this presence of solid particles in the candle-flame that it owes its brilliancy." · "Those are the particles of carbon re-ignited a second time. They are those particles which you can easily see by holding a piece of paper behind them, and which, whilst they are in the flame, are ignited by the heat produced, and, when so ignited, produce this brightness."
5. **El humo al apagarla es vapor de cera; una llama a 2–3 pulgadas (5–8 cm) baja por él hasta la vela** — Faraday, Lección I (Gutenberg #14474).
   > "If you blow a candle out cleverly, you will see the vapour rise from it." · "if I hold a lighted taper two or three inches from the wick, you will observe a train of fire going through the air till it reaches the candle. I am obliged to be quick and ready, because, if I allow the vapour time to cool, it becomes condensed into a liquid or solid"
6. **Fecha y lugar: conferencias de Navidad 1860–61 en la Royal Institution, Londres; libro de 1861** — portada de la edición de Charles Griffin (registro de Emory University en Internet Archive, id `19991842.5823.emory.edu`) y catálogo del History of Science Museum, Oxford (registro 1928509).
   > "Delivered before a juvenile auditory at the Royal Institution of Great Britain during the Christmas holidays of 1860-1" (portada) · "A course of six lectures on the chemical history of a candle : to which is added a lecture on platinum … London : Griffin, Bohn, and Company … 1861" (Oxford).
7. **En microgravedad la llama es redonda, azul y sin hollín; en la Tierra el aire caliente que sube la estira y lleva el hollín a la punta** — NASA, "Candle Flame – 1g vs Microgravity" (30 abr 2020), https://www.nasa.gov/image-article/candle-flame-1g-vs-microgravity/
   > "On Earth, gravity-driven buoyant convection causes a candle flame to be teardrop-shaped and carries soot to the flame's tip, which makes it yellow. In microgravity, where convective flows are absent, the flame is spherical, soot-free and blue."

## Notas
- El dibujo es esquemático (moléculas, hollín, la "piel" de la llama y los hilos de la mecha).
- **Fecha:** Faraday dio la serie de la vela más de una vez (se suele citar una primera en 1848), pero el texto publicado en 1861 —y el que se cita aquí— es el de la Navidad de 1860–61 (seis lecciones; la primera, según fuentes secundarias, el 27 dic 1860). Por eso la voz dice "entre 1860 y 1861" y no "1848".
- "Unos centímetros" = las "two or three inches" (≈ 5–8 cm) de Faraday. El humo blanco visible es vapor de cera que ya se empieza a condensar en gotitas (Faraday: si se enfría "becomes condensed into a liquid or solid"); por eso el truco solo funciona en los primeros segundos.
- **Seguridad (va en la descripción):** es una demostración con fuego real; si alguien la quiere ver en casa, que sea un adulto, lejos de cortinas y papel, con el cabello recogido y la vela en un plato estable. Nunca se dice a niños que la hagan solos.
- La mecha sí se gasta poco a poco en la punta; por eso la voz no dice "la mecha no se quema", solo que lo que arde es el vapor de la cera.
- La escena del espacio es de experimentos de la NASA con velas en microgravedad; la voz no da año ni misión para no añadir datos sin fuente abierta.
