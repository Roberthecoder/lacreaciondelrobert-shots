# Shot Químico #22 · Esa estatua no nació verde (la pátina de la Estatua de la Libertad)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #22 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (la estatua color cobre que se vuelve verde → la superficie de la lámina → las capas de cuprita y brochantita a escala de micras → la misma estatua, verde, con la etiqueta "escudo") + un toque de N5 (el análisis con rayos X de 1986).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Esa estatua no nació verde: es de cobre, color moneda; lo verde es una costra que la protege."
- **Seguridad:** no se invita a ningún experimento; no se dice que se raspe ni se limpie el cobre.
- **Duración:** voz 955 caracteres / ≈ 160 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~955 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa estatua no nació verde: es de cobre, color moneda; lo verde es una costra que la protege. | Fondo cian. Desde el cuadro 0 la silueta de la Estatua de la Libertad (esquemática) brilla color cobre/salmón; un barrido de luz la recorre y por detrás asoma el verde. Chip "verde ✗ → cobre ✓". Al decir "costra" aparece un contorno verde tipo escudo sobre la antorcha. |
| 1 | Piel | Su piel es cobre de 2.4 milímetros: el grueso de dos centavos de dólar juntos. | La cámara baja a un pedazo de lámina de la piel; a su lado se apilan dos monedas de un centavo de dólar y una regla marca "2.4 mm" (barra de escala). |
| 2 | Cafe | Cuando la terminaron, en 1886, era café, como un centavo de dólar. | Tarjeta "1886"; la estatua entera en café rojizo brillante junto a un centavo de dólar del mismo color. |
| 3 | Cuprita | Primero, el oxígeno del aire húmedo oxidó el cobre y formó cuprita, una capa oscura. | Fondo noche, zoom a la superficie: átomos de cobre (esferas naranjas) en fila; llegan O₂ y gotitas de agua; se forma encima una capa delgada café oscuro con la etiqueta "cuprita · Cu₂O". Barra de escala en µm. |
| 4 | Brochantita | Luego, el azufre de la contaminación, en la lluvia, la volvió brochantita: un sulfato de cobre verde. | De una chimenea lejana sale SO₂ (bolitas amarillas) que se mete en gotas de lluvia; las gotas caen sobre la cuprita y crecen cristales verdes encima: "brochantita · CuSO₄·3Cu(OH)₂". |
| 5 | Escudo | Esa pátina casi no se disuelve y protege al cobre de gastarse. | Gotas de lluvia rebotan sobre la capa verde; el cobre de abajo queda intacto (brillito). Ícono de escudo sobre la capa. |
| 6 | Pregunta | ¿Cuánto tardó en cubrirla? Unos 30 años. | **Re-gancho.** "?" gigante; time-lapse de la estatua pasando de café a café oscuro a verde, con un contador "0 → 30 años". |
| 7 | Estudio | Para restaurarla, en 1986 analizaron con rayos X pedazos de su piel: uno de 1905 era brochantita estable; uno de 1980 traía antlerita, menos estable, y sospecharon de la lluvia ácida. | Tarjeta "1986 · Matyi y Baboian · restauración de la estatua"; un haz de rayos X sobre dos pedacitos de lámina etiquetados "1905" y "1980"; en el de 1905 aparece un ✓ "brochantita estable", en el de 1980 un ⚠ "antlerita"; nube gris "¿lluvia ácida?". |
| 8 | Pintura | Lo chistoso: en 1906 planearon pintarla; tras las protestas, se quedó verde. | Tarjeta "1906"; una brocha gigante se acerca a la estatua, aparecen globitos de protesta ("¡No!") y la brocha se retira. |
| 9 | Tu | El cobre de tu casa que queda a la intemperie, como un tubo en la azotea, con los años se pone verde igual. | Una azotea con un tubo de cobre al sol y la lluvia; el tubo pasa de cobre a verde en manchas. |
| 10 | Cierre | Ese verde no es mugre: es el escudo que el cobre se fabricó solo. | **Regreso a la estatua del inicio**, ya toda verde, con la etiqueta "pátina = escudo" y una lupa en modo rayos X que deja ver el cobre intacto debajo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz). |

**Música:** cama grave continua; efectos en el mismo cuadro (barrido de luz, "clink" de las monedas, burbujeo del O₂, gotas de lluvia, crecimiento de cristales, tic-tac del contador de años, zumbido del haz de rayos X, brochazo que se detiene, abucheo suave).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Cuánto tardó en cubrirla?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «Esa estatua no nació verde» |
| 2 | 6.4 | 10.2 | 13_senalando_arriba | `izq-alto` | «2.4 milímetros… dos centavos» |
| 3 | 10.8 | 17.5 | 05_sonriendo_dientes_uniformes | `arriba-der` | «era café, como un centavo» |
| 4 | 20.6 | 25.2 | 10_serio_molesto | `izq-alto` | «el azufre de la contaminación» |
| 5 | 27.1 | 29.4 | 06_pensativo_menton | `arriba-der` | «protege al cobre de gastarse» |
| 6 | 29.65 | 32.8 | 07_pensativo_puno | `grande-izq` | «¿Cuánto tardó en cubrirla?» |
| 7 | 35.8 | 42.6 | 04_bajando_lentes | `izq-alto` | «1905… 1980… lluvia ácida» |
| 8 | 43.3 | 47.3 | 05_sonriendo_dientes_uniformes | `arriba-der` | «planearon pintarla» |
| 9 | 48.2 | 53.6 | 13_senalando_arriba | `arriba-der` | «un tubo en la azotea» |
| 10 | 54.3 | 57.9 | 02_apuntando_camara | `arriba-der` | «no es mugre: es el escudo» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 45 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **Láminas de cobre de 2.4 mm, como dos centavos de dólar; pátina verde por oxidación natural; la pátina protege al cobre; café como un centavo en 1886; unos 30 años** — National Park Service, Statue of Liberty National Monument. "Frequently Asked Questions About the Statue of Liberty." https://www.nps.gov/stli/planyourvisit/frequently-asked-questions-statue-of-liberty.htm y "Frequently Asked Questions" https://www.nps.gov/stli/faqs.htm (consultadas 2026).
   > "The Statue of Liberty is made of copper 3/32 in. (2.4 millimeters) thick, the same as two U.S. pennies put together." · "The Statue's copper has naturally oxidized to form its familiar "patina" green coating." · "This patina … protects the copper from naturally wearing away." · "Upon completion in 1886, the Statue of Liberty was more of a traditional brown color like an American penny." · "It took about thirty years for the Statue of Liberty to fully oxidize and form a patina."
   - Refuerzo del tiempo: American Chemical Society, nota de prensa del 29 jun 2017 (EurekAlert! 672558): "Her color change is thanks to about 30 years' worth of chemistry in the air of New York City harbor." · "transitioned from penny red to chocolate brown to glorious liberty green".
2. **Cuprita primero (capa oscura), luego brochantita con el azufre (SO₂) del aire; la pátina es insoluble y protectora** — Bureš R., Klajmon M., Fojt J., Rak P., Jílková K., Stoulil J. "Artificial Patination of Copper and Copper Alloys in Wet Atmosphere with Increased Content of SO2." *Coatings* 9(12):837 (2019). doi:10.3390/coatings9120837.
   > "The typical colour of clean copper is usually salmon-pink." · "These changes of colour are due to the formation of a protective layer called patina" · "Changes start with the darkening of the copper surface to brown or even black locally and finish with the formation of an aesthetically optimal green layer. The resulting products (patina) are insoluble." · "In the beginning of an exposure, the layer of cuprous oxide (Cu2O), called cuprite, appears on a surface of the copper object" · "Brochantite is formed on the top of the cuprite layer" · "Brochantite is the main phase of copper patina in atmospheres polluted by SO2" · "The important role of SO2 in the atmosphere is due to homogeneous and heterogeneous oxidation of sulphur dioxide to sulphuric acid."
3. **Estudio de 1986: rayos X, pátina = brochantita; pieza de 1905 brochantita estable; pieza de 1980 con antlerita (menos estable); sospecha de la lluvia ácida; cuprita antes que los sulfatos** — Matyi R.J., Baboian R. "An X-Ray Diffraction Analysis of the Patina of the Statue of Liberty." *Powder Diffraction* 1(4):299–304 (1986). doi:10.1017/S0885715600011970.
   > "conducted as a service to the National Park Service as part of the restoration activities for the Statue" · "found to consist primarily of the basic copper sulfate known as brochantite or CuSO4·3Cu(OH)2. Another less stable form of basic copper sulfate CuSO4·2Cu(OH)2 known as antlerite was also observed in samples taken from areas that are more exposed to the incoming weather in New York harbor. The presence of antlerite supports the contention that acid deposition is promoting undesirable changes" · "the corrosion product on the 1905 sample showed that it consisted primarily of the stable brochantite phase, while the 1980 sample displayed both copper chlorides as well as the less stable antlerite. Both samples also contained cuprite (Cu2O) which appears to have formed prior to either of the sulfates."
4. **1906: planearon pintarla; hubo protestas y no se pintó** — Yuko E. "The Statue of Liberty Wasn't Always Green." HISTORY (A&E), 2025 (act. 2026). https://www.history.com/articles/statue-of-liberty-green-color-change
   > "In 1906, there were calls to repaint the statue to restore it to its original copper. But the project was abandoned amid protests that painting the Statue of Liberty would be "sacrilege," according to a newspaper report at the time."
   - Fuentes de época citadas por Snopes (https://www.snopes.com/fact-check/statue-liberty-different-color/): "Coat of Paint for Statue of Liberty", Buffalo Evening News, 19 jul 1906; "Miss Liberty to Stay Green", *The New York Times*, 16 ago 1907 ("…to remove the patina which has softened the outlines of the statue and made it beautiful").
5. **El cobre de tu casa a la intemperie también cambia de color** — Bureš et al. 2019 (fuente 2):
   > "After the exposure of copper to the atmosphere, this colour starts to change." · "A formation of patina usually takes several decades under common outdoor conditions."

## Notas
- El dibujo es esquemático (la estatua, los átomos, los cristales y el grosor de las capas no están a escala).
- La voz no da el peso de cobre: la NPS da dos cifras distintas en dos páginas (176,000 lb en "Statue Statistics" y 179,200 lb / 81,300 kg en "Statue of Liberty Facts"); si se usa en la descripción, decir "unas 80 toneladas de cobre" y citar ambas.
- La NPS dice que la pátina "es tan gruesa, en muchos lugares, como el cobre detrás"; los estudios de corrosión dan capas de brochantita de 5–40 µm (Bureš et al. 2019). Por la contradicción, ese dato NO se usa.
- Lo de la lluvia ácida es una sospecha (Matyi y Baboian 1986: "supports the contention"); Livingston (*Environ. Sci. Technol.* 25(8):1400–1408, 1991) concluyó después que la lluvia ácida de Nueva York no cambia la mineralogía de la pátina. Por eso la voz dice "sospecharon".
- Cerca del mar también se forman sales de cloro (atacamita); la pieza de 1980 traía cloruros de cobre. No cabe en la voz; va en la descripción.
- El tubo de la azotea tarda años o décadas en ponerse verde (Bureš et al. 2019: "several decades"); en la descripción se aclara.
