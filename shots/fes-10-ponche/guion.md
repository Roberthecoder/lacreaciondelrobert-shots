# Shot Festivo #10 · Posadas · Científico: Lo que el hervor le hace al tejocote de tu ponche

- **Serie:** Shot Festivo · **Serie vinculada:** Científico · **Logo:** biología (ADN, `logo_biologia.svg`: el tema son las células de una fruta) · **Badge:** Festivo #10 · **Especial:** Posadas (se publica el 16 dic 2026, primera posada) · rama `pedido300/festivos`.
- **Estado (29 oct 2026):** fase A: guion y `narracion.json` escritos, **pendientes de verificación independiente** (`verificacion.md` lo escribe el verificador). Sin animación todavía · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 «Por dentro» (del tejocote en la olla del ponche → sus células al microscopio → de regreso al tejocote suavecito), con un poco de N5 «El experimento» (el estudio de Chapingo con las setas cubiertas).
- **Gancho (de los 7):** #1 «Esto no es X: es Y» sobre lo que se ve: «Ese tejocote de tu ponche no se deshace: se despega, célula por célula.»
- **Duración:** voz de 1,072 caracteres (≈ 65.0 s) + cierre de 3.8 s → **≈ 68.8 s** estimados (`estimar-escenas.mjs`). Los festivos van de 61 a 75 s.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese tejocote de tu ponche no se deshace: se despega, célula por célula. | Fondo naranja con papel picado. Desde el cuadro 0 hierve una olla de barro con ponche: tejocotes, caña, guayaba y canela que dan vueltas. Un cucharón saca un tejocote, lo aprieta y la pulpa se abre en grumitos. «¿se deshace?» se tacha; «se despega». Chip «Especial Posadas». |
| 1 | Firme | Crudo, sus células están infladas de agua y bien pegadas: por eso está firme. | Fondo menta. Un tejocote crudo (amarillo-naranja, con su corona seca de sépalos) entra rebotando. Una `Lupa` lo abre por dentro: células redondeadas e infladas, con una línea de pegamento entre ellas. Capítulo 1 «Crudo». |
| 2 | Membrana | Al hervir, el calor rompe sus membranas: se sale el agua y lo que traen disuelto pasa al ponche. | Fondo noche (por dentro, con barra de escala en µm). Termómetro que sube; la membrana de cada célula se rompe y salen puntitos (agua y lo disuelto) hacia el líquido; las células se desinflan. Capítulo 2 «El hervor». |
| 3 | Pegamento | Pero entre célula y célula hay un pegamento: una capa rica en pectina. | Fondo noche. Zoom a la unión de dos paredes: la lámina media brilla en dorado, con cadenas de pectina dibujadas como collares. Etiqueta «lámina media (pectina)». |
| 4 | Pregunta | ¿Y qué le hace el hervor a ese pegamento? | **Re-gancho.** Fondo amarillo, «?» gigante sobre la olla que hierve. Robert grande, pensativo. |
| 5 | Despega | La pectina se rompe y se disuelve, las células se separan y la fruta se pone suavecita. | Fondo noche. Las cadenas de pectina se cortan en pedacitos que se van flotando; las células se separan unas de otras. Afuera, el tejocote se aplasta con la cuchara. Chip «se despega». |
| 6 | Pectina | Y el tejocote está cargado de pectina: tanta, que la industria la saca de él para cuajar jaleas y mermeladas. | Fondo rosa. Medidor «pectina» que se llena en el tejocote; luego, frascos de jalea y de mermelada que cuajan. Capítulo 3 «La pectina». |
| 7 | Nativo | Es un árbol nativo de México y da fruto en noviembre y diciembre, justo a tiempo para las posadas. | Fondo cian. Mapa esquemático de México con el Eje Neovolcánico resaltado; un árbol de tejocote cargado de frutos; calendario «nov–dic» junto a una piñata. |
| 8 | Estudio | En 2016, en Chapingo, con pectina de tejocote y cera de candelilla hicieron una capa comestible para setas rebanadas. | Fondo amarillo. `TarjetaEstudio` «2016 · Universidad Autónoma Chapingo · Texcoco · *Agrociencia*». La pectina y la cera de candelilla se mezclan en un vaso; una brocha cubre rebanadas de seta (*Pleurotus ostreatus*). Capítulo 4 «El estudio». |
| 9 | Setas | Las rebanadas con capa perdieron menos peso y firmeza en veinte días de refrigeración. | Fondo menta. Refrigerador con un `Cronometro` de 20 días a 4 °C; dos charolas: «sin capa» (rebanadas que se arrugan y oscurecen) contra «con capa» (se mantienen). |
| 10 | Dato | Ojo: desde 2024, la FDA alerta que varios suplementos de raíz de tejocote en realidad traían adelfa amarilla, una planta venenosa. | Fondo lila. Frasco de cápsulas con etiqueta «raíz de tejocote» que se voltea: adentro, la adelfa amarilla (*Thevetia peruviana*, flor amarilla de trompeta). Sello «FDA · alerta» y señal de peligro. Chip «no era tejocote: era adelfa». |
| 11 | Cierre | Así que ese tejocote no se deshace: se despega, porque el hervor le disolvió el pegamento. | **Regreso a la imagen del inicio** (la misma olla y el mismo cucharón); una `Lupa` «POR DENTRO» sobre el tejocote muestra las células separadas, sin pegamento. Chip «se despega». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

**Música:** cama grave y cálida continua, sin golpe, siempre debajo de la voz. Cada efecto cae en el mismo cuadro que su acción:
- burbujas del hervor y cucharón al inicio;
- «plop» del tejocote crudo que rebota;
- notas que suben con el termómetro;
- «pop» suave de cada membrana que se rompe y gotitas que salen;
- tics que se cortan cuando se rompen las cadenas de pectina;
- tono que se estira con el medidor y «toc» de los frascos que cuajan;
- campanita de la piñata;
- tarjeta del estudio y la brocha;
- reloj de 20 días;
- dos notas graves de alerta en el dato;
- destellos al final.

## Fuentes (abiertas el 29 oct 2026; pendientes de verificación independiente)

1. **Tejocote nativo de México, rico en pectina, ingrediente del ponche, fructifica nov–dic.** CONAFOR, ficha «*Crataegus mexicana* DC. / Tejocote». https://idefor.cnf.gob.mx/documents/1499/download
   - «El tejocote o manzanita es una especie nativa que pertenece a la familia Rosaceae»
   - «florece de enero a abril y fructifica de noviembre a diciembre»
   - «son ricos en pectina y vitamina C»
   - «es un ingrediente principal en la elaboración del tradicional ponche de frutas navideño y como relleno de piñatas»
   - Lo de que es común en el Eje Neovolcánico, entre 2,000 y 3,000 msnm, viene de la misma ficha.
2. **Pectina para cuajar jaleas y mermeladas.** CONABIO, ficha «*Crataegus pubescens*» (sinonimia: «*Crataegus mexicana* Moc. & Sessé»). http://www.conabio.gob.mx/conocimiento/info_especies/arboles/doctos/59-rosac1m.pdf
   - «Una de las características más importantes del fruto es su alto contenido en pectina, misma que se usa en la industria como coagulante de jaleas y mermeladas.»
   - «Nativa del Valle de México.»
3. **Células infladas de agua (turgencia) y textura; el calor rompe las membranas y lo disuelto se sale; el ablandamiento por la pectina de la lámina media.** Głuchowski, Czarniecka-Skubina y Pielak (2026), «Effect of the Sous-Vide Method on the Quality of Vegetables—A Review», *Foods* 15: 206. https://doi.org/10.3390/foods15020206 (PMC12840460)
   - «The texture of plant-based products depends on the type of cells that make up the tissue, their organization, the amount of air in the intercellular spaces, turgor pressure induced by osmosis, and the composition of the cell walls.»
   - «Thermal processing disrupts the semipermeable nature of the cell membrane, allowing soluble substances and water to diffuse freely between cells, resulting in a loss of cell turgor pressure.»
   - «Conventional cooking resulted in the greatest loss of dry matter content due to leaching of components into the aqueous medium»
   - «The cell walls are glued together by the middle lamella»
   - «changes in texture (softening) during cooking are caused by the breakdown and release of pectins from the middle lamella, which leads to cell wall separation and the loss of stiffness.»
4. **El pegamento es una capa rica en pectina.** Daher y Braybrook (2015), «How to let go: pectin and plant cell adhesion», *Frontiers in Plant Science* 6: 523. https://doi.org/10.3389/fpls.2015.00523
   - «The mediator of this connection, the pectin-rich middle lamella, is deposited during cell division and maintained throughout the cell's life to protect tissue integrity.»
5. **La pectina se rompe con el calor.** Heaney y Padilla-Zakour (2025), «Microstructural and Enzymatic Contributions to Texture in High Pressure Processed Fruits and Vegetables», *Foods* 14: 3267. https://doi.org/10.3390/foods14183267 (PMC12469849)
   - «β-elimination reactions involve the non-enzymatic depolymerization of pectin.»
   - «Under alkaline pH (>pH 4.5) and elevated temperatures (>80 °C), β-elimination reactions can cause unwanted softening»
   - «Acid hydrolysis tends to occur more rapidly under acidic conditions than β-elimination reactions»
   - La voz no nombra la reacción; solo dice que la pectina «se rompe y se disuelve».
6. **El estudio de 2016 en Chapingo.** Lozano-Grande, Valle-Guadarrama, Aguirre-Mandujano, Lobato-Calleros y Huelitl-Palacios (2016), «Películas basadas en emulsiones de pectina de frutos de tejocote (*Crataegus* spp.) y cera de candelilla: caracterización y aplicación en *Pleurotus ostreatus*», *Agrociencia* 50(7), Universidad Autónoma Chapingo, Texcoco. https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S1405-31952016000700849
   - «su fruto posee alto contenido de pectina»
   - «Las emulsiones de HP y CW fueron aplicadas sobre *Pleurotus ostreatus* y aquéllas con 2 % HP y 1 % CW redujeron las pérdidas de peso, firmeza y luminosidad, respecto a rebanadas de hongo no tratadas durante un almacenamiento de 20 d a 4 °C»
   - «De las emulsiones se obtuvieron películas comestibles.»
7. **Suplementos de «raíz de tejocote» con adelfa amarilla.** FDA, «FDA Issues Warning About Certain Supplements Substituted with Toxic Yellow Oleander (January 2024)», página vigente al 22 sep 2026. https://www.fda.gov/food/alerts-advisories-safety-information/fda-issues-warning-about-certain-supplements-substituted-toxic-yellow-oleander-january-2024
   - «certain products labeled as tejocote (Crataegus mexicana) root or Brazil seed are adulterated because they contain yellow oleander (Thevetia peruviana) instead of the labeled ingredients»
   - «Yellow oleander is a poisonous plant native to Mexico and Central America»
   - «can cause neurologic, gastrointestinal, and cardiovascular adverse health effects that may be severe, or even fatal»
   - El origen: «2023, the Centers for Disease Control and Prevention published a report of several tejocote root products found to be substituted with yellow oleander».
   - La alerta es de enero de 2024 y se ha actualizado hasta 2026; por eso la voz dice «desde 2024».
8. **Posadas del 16 al 24 de diciembre.** Guía Infantil: «Las posadas comienzan el 16 de diciembre y terminan el 24». https://www.guiainfantil.com/blog/navidad/las-posadas-tradicion-navidena-de-mexico

## Notas
- El dibujo es esquemático: las células del tejocote, la lámina media y las cadenas de pectina están simplificadas y fuera de escala.
- **Lo que se dejó fuera a propósito:**
  - Comparar con la caña o la guayaba: no hallé una fuente que lo diga directo.
  - Un porcentaje de pectina del tejocote: los valores publicados dependen del método de extracción.
  - Decir que la pectina espesa el ponche: no está verificado.
  - Recetas.
- El estudio de Chapingo probó varias mezclas; la que funcionó mejor fue 2 % de pectina y 1 % de cera de candelilla. La voz dice «las rebanadas con capa» de forma general.
- El dato de la FDA es sobre suplementos que se venden como **raíz** de tejocote y no traían tejocote. No habla de la fruta del ponche. En pantalla el chip dice «no era tejocote: era adelfa» (la FDA: «instead of the labeled ingredients»).
