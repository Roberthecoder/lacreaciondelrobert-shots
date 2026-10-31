# Shot Químico #42 · Esa leche no se echó a perder: es queso (leche + limón + calor)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #42 · rama `pedido300/qui`.
- **Formato:** N5 "El experimento" (una olla de leche caliente, un chorrito de limón y un cronómetro: se ve cuajar en vivo) + N1 "Por dentro" (la olla → las micelas de caseína y su carga → los cuajos y el suero → la misma olla, ya colada en una manta de cielo con su bloque de queso).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Esa leche no se echó a perder: le pusiste limón y la convertiste en queso."
- **No repite:** el #16 (ceviche: el ácido desnaturaliza proteínas del pescado) ni el #15 (chile y leche: la caseína y la capsaicina). Aquí el tema es la carga de las micelas de caseína y el punto isoeléctrico; la quimosina (cuajo de Biotecnológico) no aparece.
- **Seguridad:** la leche va muy caliente; en pantalla, la olla se maneja con guante/agarradera y el chip "¡quema!" aparece al calentar. No se da ningún consejo médico.
- **Duración:** voz 944 caracteres / ≈ 170 palabras (≈ 57.9 s) + cierre 3.5 s → **≈ 61.4 s** (`node motor/kit/estimar-escenas.mjs borradores/qui-42-queso-limon --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`queso.jsx`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~944 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa leche no se echó a perder: le pusiste limón y la convertiste en queso. | Fondo amarillo. Desde el cuadro 0, una mano exprime un limón verde sobre una olla de leche humeante; en el cuadro 0.5 la leche se corta en grumos blancos que giran. Chip "¿se echó a perder?" que se tacha y cambia a "QUESO". Cronómetro arrancando en 00:00. |
| 1 | Que | La leche trae caseína, el 80 por ciento de sus proteínas, en bolitas: las micelas. | La cámara baja a la superficie de la leche → fondo noche: miles de esferas blancas flotando. Barra "proteínas de la leche" que se llena al 80 % con la etiqueta "caseína". Barra de escala "≈ 100–1000 nm". |
| 2 | Carga | Por fuera tienen pelitos con carga negativa: se repelen y flotan separadas. | Zoom a una micela: "pelitos" (κ-caseína) con signos "−" en la punta. Dos micelas se acercan y rebotan con un destello y flechas ↔. Chip "pH 6.6". |
| 3 | Acido | El ácido cítrico del limón, o el acético del vinagre, les va quitando esa carga. | Entran gotas con "H⁺" (etiquetas "ácido cítrico · limón" y "ácido acético · vinagre"); al tocar los pelitos, los "−" se apagan uno por uno. Un medidor de pH baja: 6.6 → 5.5 → 5.0. |
| 4 | Cuajo | Cerca de pH 4.6 ya no se repelen: se pegan unas con otras y forman cuajos blancos. | El medidor llega a "4.6"; los pelitos se aplastan y las micelas chocan y se quedan pegadas en racimos que crecen hasta volverse grumos. |
| 5 | Suero | Lo que escurre es el suero, que lleva lactosa, el azúcar de la leche. | La cámara sube a la olla: se vierte en una coladera con manta de cielo; el líquido claro que cae lleva moléculas de "lactosa" dibujadas como bolitas de azúcar. Etiquetas "cuajo" y "suero". |
| 6 | Pregunta | ¿Y entonces para qué calentarla? | **Re-gancho.** Flama de la estufa que se prende con un "fssh"; "?" gigante sobre la olla. |
| 7 | Calor | Bien caliente, como para el paneer de la India, cuaja desde pH 5.2 y atrapa proteínas que se irían al suero. | Termómetro que sube a "80 °C" y chip "¡quema!". Medidor de pH que se detiene en "5.2" (comparado con "4.6" en frío). Micro: proteínas del suero (bolitas azules, β-lactoglobulina) que con el calor se despliegan y se pegan a las micelas. Bloque de paneer con bandera de la India pequeña. |
| 8 | Estudio | En 2012, químicos de Bristol analizaron coladeras de barro de unos 7 mil años halladas en Polonia: tenían grasa de leche. | Tarjeta "2012 · Universidad de Bristol · *Nature*". Mapa de Polonia con un punto; una vasija de barro con agujeritos (coladera) de la que sale un brillo "grasa de leche". Contador "≈ 7 000 años". |
| 9 | Hipotesis | Su interpretación: ahí separaban cuajo y suero para hacer quesos con menos lactosa. | La coladera antigua escurre: arriba queda el cuajo, abajo cae el suero con bolitas de lactosa. Chip "hipótesis de los autores". |
| 10 | Dato | Y ojo: un kilo de leche de vaca da apenas unos 170 gramos de paneer. | Báscula: 1 kg de leche de un lado; del otro, un cubito de queso "≈ 170 g" y una jarra enorme de suero. |
| 11 | Cierre | Así que esa leche no se echó a perder: el limón la convirtió en queso. | **Regreso a la olla del inicio**: la misma olla, ahora con la manta de cielo y un bloque de queso blanco; etiqueta "caseína + ácido + calor → queso". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave y continua, cálida (de cocina), siempre debajo de la voz. Efectos en el mismo cuadro: exprimir el limón, burbujeo de la leche, "boing" de las micelas que rebotan, "tic" de cada carga que se apaga, "plop" de las micelas que se pegan, chorro del suero, "fssh" de la flama, golpe de la tarjeta del estudio, cartón → cubito y conteo hasta 170 g.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y entonces para qué calentarla?» y en el dato de los 170 g.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.3 | 11_sorprendido | `gancho` | «la convertiste en queso» |
| 2 | 5.6 | 9.3 | 13_senalando_arriba | `izq-alto` | «en bolitas: las micelas» |
| 3 | 14.8 | 18.8 | 06_pensativo_menton | `arriba-der` | «les va quitando esa carga» |
| 4 | 20.6 | 27.6 | 05_sonriendo_dientes_uniformes | `izq-alto` | «forman cuajos blancos» / el suero |
| 5 | 28.5 | 31.8 | 07_pensativo_puno | `grande` | «¿Y entonces para qué calentarla?» |
| 6 | 32.6 | 36.8 | 13_senalando_arriba | `izq-alto` | «atrapa proteínas que se irían al suero» |
| 7 | 40.5 | 44.0 | 04_bajando_lentes | `arriba-der` | «tenían grasa de leche» |
| 8 | 44.7 | 49.1 | 06_pensativo_menton | `izq-alto` | «su interpretación» |
| 9 | 49.6 | 53.3 | 11_sorprendido | `grande-izq` | «apenas unos 170 gramos» |
| 10 | 53.9 | 57.8 | 02_apuntando_camara | `arriba-der` | «el limón la convirtió en queso» |
| — | 57.9 | 61.4 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 42 s en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato se abrió en la fuente original el 29 oct 2026)

1. **Caseína = 80 % de las proteínas de la leche de vaca; micelas con miles de moléculas; capa "peluda" de κ-caseína; pH de la leche 6.6; por debajo del punto isoeléctrico 4.6–4.8 las micelas se agregan y precipitan** — Głąb T.K., Boratyński J. "Potential of Casein as a Carrier for Biologically Active Agents." *Top Curr Chem (Cham)* 375(4):71 (2017). DOI 10.1007/s41061-017-0158-z · PMID 28712055 · PMC5511616.
   > "are insoluble and account for 80 % of total bovine milk proteins" · "A typical casein micelle contains thousands of casein molecules, forming 94 % of the micelle." · "with radius of 50–500 nm" · "while κ-casein forms the outer 'hairy' layer that stabilises the micelle sterically" · "Casein peptides carry negative charge on their surface as a result of phosphorylation." · "at the pH of milk (6.6)" · "Lowering the pH below the isoelectric point of 4.6–4.8 causes aggregation and precipitation of micelles combined with release of calcium."
2. **Los "pelitos" de κ-caseína tienen carga negativa y su repulsión mantiene separadas las micelas; al bajar el pH se pierde esa estabilización y pueden flocular** — Müller-Buschbaum P., Gebhardt R., Roth S.V., Metwalli E., Doster W. "Effect of Calcium Concentration on the Structure of Casein Micelles in Thin Films." *Biophys J* 93(3):960–968 (2007). DOI 10.1529/biophysj.107.106385 · PMC1913156.
   > "an outer hairy layer of κ-casein ensures the stability of the casein micelle" · "a salted polyelectrolyte brush" · "The resulting repulsive interaction prevents a merging of neighboring casein micelles." · "the same behavior occurs by lowering the pH of casein solutions" · "the stabilization is absent and flocculation and gel formation become possible"
3. **Paneer: queso de la India por ácido y calor; coagulantes (jugo de limón, ácido cítrico, ácido acético); pH de cuajado 5.20–5.25 en leche de vaca; 80–85 °C; el calor desnaturaliza las proteínas del suero y las hace precipitar con la caseína; rendimiento 17–18 % en leche de vaca** — Khan S.U., Pal M.A. "Paneer production: A review." *J Food Sci Technol* 48(6):645–660 (2011). DOI 10.1007/s13197-011-0247-x · PMC3551056.
   > "Paneer is a South Asian variety of soft cheese obtained by acid and heat coagulation of milk." · "Several coagulants have been tried namely lemon juice, citric acid, tartaric acid, lactic acid" · "acetic acid, fermented milk, sour/cultured whey, yoghurt and lactic cultures" · "recommended the pH range of 5.20–5.25 for cow milk paneer" · "The suggested coagulation temperature for obtaining good quality paneer from cow milk was 80–85 °C" · "denaturates whey proteins, reduces solubility of colloidal calcium phosphate" · "thus co-precipitating them along with the casein upon acidification of milk" · "which are otherwise lost in whey" · "yield from cow milk is about 17–18%."
4. **El jugo de limón (y de lima/limón mexicano) es rico en ácido cítrico** — Penniston K.L., Nakada S.Y., Holmes R.P., Assimos D.G. "Quantitative assessment of citric acid in lemon juice, lime juice, and commercially-available fruit juice products." *J Endourol* 22(3):567–570 (2008). DOI 10.1089/end.2007.0304 · PMID 18290732 · PMC2637791.
   > "Lemon juice and lime juice are rich sources of citric acid, containing 1.44 and 1.38 g/oz, respectively."
5. **2012, Universidad de Bristol: coladeras de barro neolíticas con grasa de leche; separar cuajo de suero con lactosa; productos con menos lactosa** — Salque M., Bogucki P.I., Pyzel J., Sobkowiak-Tabaka I., Grygiel R., Szmyt M., Evershed R.P. "Earliest evidence for cheese making in the sixth millennium BC in northern Europe." *Nature* 493(7433):522–525 (2013; en línea 12 dic 2012). DOI 10.1038/nature11698 · PMID 23235824. Afiliación: Organic Geochemistry Unit, School of Chemistry, University of Bristol.
   > "Here we apply the same approach to investigate the function of sieves/strainer vessels, providing direct chemical evidence for their use in milk processing." · "The presence of abundant milk fat in these specialized vessels, comparable in form to modern cheese strainers, provides compelling evidence for the vessels having being used to separate fat-rich milk curds from the lactose-containing whey." · "particularly in the manufacture of reduced-lactose milk products among lactose-intolerant prehistoric farming communities."
6. **Las coladeras venían de Polonia y tienen unos 7 mil años (6 800–7 400)** — Science News, "Pots bear oldest signs of cheese making" (dic 2012), sobre el mismo artículo de *Nature*.
   > "The pottery came from eight sites in Poland dating from 6,800 to 7,400 years ago." · "Chemical remnants of milk fats were identified on 15 sieve fragments"

## Notas
- El dibujo es esquemático: las micelas no son esferas lisas ni los "pelitos" se ven así; las cargas, las gotas "H⁺" y la lactosa son símbolos.
- "Cerca de pH 4.6": la fuente da el punto isoeléctrico como 4.6–4.8; en frío, la caseína precipita al bajar a ese rango. Con la leche a 80–85 °C el paneer de vaca cuaja ya en pH 5.20–5.25 (fuente 3). La voz dice "cerca de" y "desde pH 5.2".
- Lo de Bristol es una interpretación de los autores (grasa de leche en coladeras = hacer queso); ellos mismos aclaran que no hay una molécula exclusiva del queso. La voz lo dice como "su interpretación".
- "Un kilo de leche → unos 170 g de paneer" sale del rendimiento 17–18 % para leche de vaca (fuente 3); con leche de búfala sale más (21–23 %). Varía con la grasa de la leche y la humedad del queso.
- El suero no se lleva toda la lactosa: el queso fresco conserva algo (la fuente 3 lista lactosa en la composición del paneer). Por eso la voz dice solo "lleva lactosa" (fuente 5: "lactose-containing whey").
- En México el "limón" de la cocina es la lima ácida (limón mexicano); la fuente 4 mide ambos jugos y los dos son ricos en ácido cítrico.
- Seguridad (va en la descripción): la leche caliente quema; usar agarradera y no dejar a niños solos con la olla. El queso hecho en casa debe guardarse en refrigeración.
