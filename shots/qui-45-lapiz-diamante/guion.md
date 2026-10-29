# Shot Químico #45 · La punta de tu lápiz no es plomo: es el mismo carbono que un diamante (grafito, diamante y grafeno)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #45 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (la punta del lápiz escribiendo → las hojas de hexágonos del grafito → la red 3D del diamante → la misma punta del lápiz, ahora "con rayos X" mostrando sus capas) + toque de N5 "El experimento" (la cinta adhesiva de Manchester, 2004).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "La punta de tu lápiz no es plomo: es grafito, el mismo carbono que forma un diamante."
- **Seguridad:** nada peligroso. No se invita a hacer el experimento con nada más que lápiz, papel y cinta (inofensivo).
- **Duración:** voz 950 caracteres / ≈ 182 palabras (≈ 57.9 s) + cierre 3.5 s → **≈ 61.4 s** (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~950 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | La punta de tu lápiz no es plomo: es grafito, el mismo carbono que forma un diamante. | Fondo amarillo de marca. Cuadro 0: un lápiz amarillo ya va escribiendo una línea gris sobre una hoja (se mueve desde el primer cuadro). Chip "plomo" que se tacha con ✗; a su lado aparece un diamante brillando y entre ambos un "=" con un átomo "C" grande. |
| 1 | Mina | La mina es grafito mezclado con arcilla; plomo, nunca ha tenido. | Corte transversal (Lupa rayos X) de la punta: la mina gris se separa en dos montoncitos "grafito" y "arcilla". Un símbolo "Pb" cae y rebota fuera del cuadro. Barra de escala "1 mm". |
| 2 | Capas | Por dentro, el grafito son hojas planas de carbono, como un panal de hexágonos, apiladas una sobre otra. | Zoom continuo a la punta; fondo pasa a noche (#0E0F12). Aparece una hoja de hexágonos (bolitas C unidas), luego otra y otra apiladas en perspectiva. Barra de escala "≈ 0.33 nm" (esquemático). |
| 3 | Desliza | Entre hoja y hoja la unión es débil: al escribir, se resbalan como cartas de una baraja y se quedan en el papel. | Las uniones entre hojas son líneas punteadas tenues; la pila se corre en diagonal como baraja; una hoja se despega y "aterriza" sobre una franja de papel. Efecto de deslizamiento. |
| 4 | Diamante | En el diamante, en cambio, cada carbono se une a otros 4 en una red de tres dimensiones. | Transición girando la cámara: la pila se transforma en una red 3D; se ilumina un carbono y sus 4 vecinos (tetraedro) con un contador "4". La red gira lento. |
| 5 | Duro | Por eso es durísimo: con diamantes se corta roca. | Macro de nuevo (fondo cian): un disco de corte con borde de diamantes corta un bloque de roca; chispas y chip "durísimo". |
| 6 | Pregunta | ¿Y si a tu lápiz le quitas una sola hoja? | **Re-gancho.** Regreso a la pila de hojas; una sola hoja brilla y se levanta; "?" gigante. |
| 7 | Estudio | En 2004, en Manchester, Inglaterra, Geim y Novoselov le arrancaron capas al grafito con cinta adhesiva, una y otra vez. | `TarjetaEstudio` "2004 · Universidad de Manchester · Geim y Novoselov". Escena: un trozo de grafito, una cinta adhesiva que pega y despega; contador de veces "×1, ×2… ×20"; la mancha gris en la cinta se va aclarando. |
| 8 | Grafeno | Así llegaron al grafeno, una capa de un solo átomo, y en 2010 les dieron el Nobel de Física. | Una sola hoja de hexágonos flotando (fondo noche) con etiqueta "grafeno · 1 átomo de grosor"; aparece una medalla dorada "Nobel de Física 2010". |
| 9 | Curioso | Lo curioso: un milímetro de grafito trae unos 3 millones de capas, y al escribir quizá dejaste una sola en el papel. | Barra "1 mm" con un contador que sube hasta "3,000,000 capas"; luego la línea escrita del inicio con una lupa que muestra, en un punto, una sola hoja de hexágonos con "¿?". |
| 10 | Cierre | Así que tu lápiz no es plomo: es carbono, acomodado distinto que en un diamante. | **Regreso al lápiz del inicio**, ahora con rayos X: dentro de la punta se ven las hojas apiladas; a su lado el diamante con su red 3D. Etiqueta "C = C". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua, sin golpe marcado; efectos en el mismo cuadro (rasgueo del lápiz sobre el papel, tachón, "Pb" que rebota, clic al apilar cada hoja, deslizamiento de baraja, destello del diamante, disco de corte con chispas, cinta que se despega, contador que sube, campanita de la medalla).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y si a tu lápiz le quitas una sola hoja?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «no es plomo: es grafito» |
| 2 | 6.0 | 8.9 | 13_senalando_arriba | `arriba-der` | «plomo, nunca ha tenido» |
| 3 | 11.2 | 15.2 | 06_pensativo_menton | `izq-alto` | «hojas planas… como un panal de hexágonos» |
| 4 | 17.0 | 21.9 | 05_sonriendo_dientes_uniformes | `izq-alto` | «se resbalan como cartas de una baraja» |
| 5 | 23.2 | 30.2 | 04_bajando_lentes | `izq-alto` | «cada carbono se une a otros 4… durísimo» |
| 6 | 30.8 | 34.2 | 07_pensativo_puno | `grande` | «¿Y si a tu lápiz le quitas una sola hoja?» |
| 7 | 37.2 | 40.2 | 12_perfil_serio | `arriba-der` | «cinta adhesiva, una y otra vez» |
| 8 | 42.0 | 45.8 | 11_sorprendido | `izq-alto` | «una capa de un solo átomo… Nobel de Física» |
| 9 | 48.1 | 52.7 | 05_sonriendo_dientes_uniformes | `arriba-der` | «quizá dejaste una sola en el papel» |
| 10 | 53.3 | 57.8 | 02_apuntando_camara | `arriba-der` | «tu lápiz no es plomo: es carbono» |
| — | 57.9 | 61.4 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 43 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas · ninguna pausa mayor a 3 s.

## Fuentes (abiertas el 29 oct 2026)

1. **La "mina" del lápiz es grafito con arcilla; nunca tuvo plomo** — Schwarcz J. "Pencils never contained lead." Office for Science and Society, McGill University (22 feb 2017). https://www.mcgill.ca/oss/node/1523
   > "This may come as a shock to some people but lead pencils do not contain any lead. Never did. The "lead" actually is a mixture of graphite and clay; the more graphite, the softer and darker the point."
2. **Grafito, diamante y grafeno son formas puras del mismo elemento, el carbono; diamante duro, grafito blando; el diamante se usa para cortar roca** — Royal Society of Chemistry, Periodic Table, "Carbon". https://periodic-table.rsc.org/element/6/carbon
   > "There are a number of pure forms of this element including graphite, diamond, fullerenes and graphene. Diamond is a colourless, transparent, crystalline solid and the hardest known material. Graphite is black and shiny but soft." · "Graphite is used in pencils" · "Industrial diamonds are used for cutting rocks and drilling."
   > (Historia, misma página: "in 1796, the English chemist Smithson Tennant finally proved that diamond was just a form of carbon by showing that as it burned it formed only CO2.")
3. **Diamante: cada carbono unido a otros cuatro; grafito: hojas, cada carbono con tres vecinos; las hojas se deslizan como baraja y quedan en el papel** — Clark J. "Giant covalent structures." Chemguide (2000, modificado sept. 2019). https://www.chemguide.co.uk/atoms/structures/giantcov.html
   > "In diamond, each carbon shares electrons with four other carbon atoms - forming four single bonds." · "is very hard. This is again due to the need to break very strong covalent bonds operating in 3-dimensions." · "Each carbon atom uses three of its electrons to form simple bonds to its three close neighbours." · "You can think of graphite rather like a pack of cards - each card is strong, but the cards will slide over each other, or even fall off the pack altogether. When you use a pencil, sheets are rubbed off and stick to the paper."
4. **Hojas de hexágonos (panal); 3 millones de capas por milímetro; al escribir quizá queda una sola capa; cinta adhesiva repetida 10–20 veces; artículo en *Science*, octubre 2004** — The Royal Swedish Academy of Sciences. "The Nobel Prize in Physics 2010 — Information for the public: Graphene." https://www.nobelprize.org/uploads/2018/06/popular-physicsprize2010.pdf
   > "Graphene consists of carbon atoms joined together in a flat lattice – similar to a honeycomb structure but just one atom thick. One millimeter of graphite actually consists of three million layers of graphene stacked on top of one another. The layers are weakly held together and are therefore fairly simple to tear off and separate. Anyone who has written something with an ordinary pencil has experienced this, and it is possible, when they did, that only a single layer of atoms, graphene, happened to end up on the paper." · "when they repeated the tape-trick ten to twenty times the flakes got thinner and thinner." · "the article on graphene published in Science in October 2004"
5. **Nobel de Física 2010 a Geim y Novoselov, Universidad de Manchester; grafeno de un átomo con cinta adhesiva a partir de grafito de lápiz** — Royal Swedish Academy of Sciences, comunicado de prensa (2010). https://www.nobelprize.org/prizes/physics/2010/press-release/
   > "The Royal Swedish Academy of Sciences has decided to award the Nobel Prize in Physics for 2010 to Andre Geim University of Manchester, UK and Konstantin Novoselov University of Manchester, UK 'for groundbreaking experiments regarding the two-dimensional material graphene'" · "A thin flake of ordinary carbon, just one atom thick" · "Geim and Novoselov extracted the graphene from a piece of graphite such as is found in ordinary pencils. Using regular adhesive tape they managed to obtain a flake of carbon with a thickness of just one atom."
6. **El estudio de 2004 (Manchester)** — Novoselov K.S., Geim A.K., Morozov S.V., et al. "Electric field effect in atomically thin carbon films." *Science* 306(5696):666–9 (22 oct 2004). PMID 15499015 · DOI 10.1126/science.1102896. Afiliación: "Department of Physics, University of Manchester, Manchester M13 9PL, UK."
   > "We describe monocrystalline graphitic films, which are a few atoms thick but are nonetheless stable under ambient conditions"

## Notas
- El dibujo es esquemático: átomos como bolitas, uniones como palitos, distancias no a escala exacta (en el grafito, la separación entre hojas es ~2.5 veces la distancia entre átomos de una hoja, según Chemguide).
- Matiz: el grafito y el diamante son carbono puro, pero la mina del lápiz NO es carbono puro (lleva arcilla); por eso la voz dice "la punta… es grafito" y luego aclara la arcilla. En la descripción: más grafito = punta más blanda y oscura (McGill).
- Matiz del estudio: el artículo de 2004 describe películas "de pocos átomos de grosor"; el comunicado del Nobel dice que con la cinta lograron una hojuela de un átomo. La voz no afirma que lo de un átomo fue en 2004: dice que "así llegaron al grafeno" y que el Nobel fue en 2010.
- "Durísimo" en vez de "el más duro": la RSC dice "the hardest known material", pero se evita el superlativo en la voz por si hay materiales de laboratorio que lo disputan. Se puede poner en la descripción citando a la RSC.
- "Quizá dejaste una sola capa" se dice como posibilidad, igual que la fuente ("it is possible").
- Dato para la descripción: el diamante, en teoría, debería convertirse solo en grafito a temperatura ambiente, pero es tan lento que en milenios no pasa (RSC, podcast de la página "Carbon"). Y en 1796 Smithson Tennant demostró que el diamante es carbono quemándolo: solo dio CO₂.
