# Shot Químico #48 · Ese buche de agua se lleva tu flúor (cómo el flúor rehace tu esmalte)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #48 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el lavabo: cepillo, espuma y el buche de agua → el esmalte al microscopio: cristales de apatita, ácido, flúor que entra al cristal → el mismo lavabo, ahora escupiendo sin enjuagar) + un toque de N5 "El experimento" (Colorado 1901 y Grand Rapids 1945).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" con espíritu de #6 (mito cotidiano): "Ese buche de agua después de cepillarte no te ayuda: se lleva el flúor que te protege."
- **No repite:** #37 (sal yodada/fluorurada) ni #38 (refresco). Aquí el tema es la pasta, el esmalte y el enjuague.
- **Seguridad:** solo se dice lo que traen CDC y NHS (escupir, no enjuagar luego luego, cantidad de pasta en niños). No se recomienda tragar nada ni se dan dosis.
- **Duración:** voz 956 caracteres (≈ 58.1 s) + cierre 3.5 s → **≈ 61.6 s** (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion listo para verificación independiente. Falta: `verificacion.md`, tabla "Robert en pantalla" y animación (fase 2). Voz pendiente de aprobación de Robert.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese buche de agua después de cepillarte no te ayuda: se lleva el flúor que te protege. | Fondo menta. Desde el cuadro 0 un vaso inclina agua hacia una boca dibujada frente al espejo del lavabo; la espuma blanca de pasta se va con el chorro y unas chispitas doradas "F⁻" salen arrastradas al desagüe. Chip "¿más limpio?" se tacha. |
| 1 | Esmalte | Tu esmalte es de cristales de apatita: calcio y fosfato. | `Lupa` en rayos X sobre un diente: debajo de la superficie, varillas de cristal hexagonal acomodadas en haces. Etiqueta "prismas de cristalitos · apatita · Ca + PO₄". Barra de escala "≈ 5 µm". |
| 2 | Acido | Después de comer, las bacterias de tu boca hacen ácido que le disuelve minerales a tu diente. | Fondo noche. Bacterias (bolitas moradas) sobre el esmalte comen un cubito de azúcar y escupen gotitas "H⁺"; de los cristales se desprenden puntitos Ca y PO₄ que flotan lejos. Medidor de pH bajando a ácido. |
| 3 | Fluor | El flúor en tu saliva frena esa pérdida y ayuda a reconstruir la capa de afuera. | Llegan iones F⁻ dorados en la saliva; se pegan a la superficie de los cristales y los Ca y PO₄ que huían regresan y se reacomodan. Medidor de pH sube. |
| 4 | Cristal | Al rehacerse, el cristal mete flúor donde había hidroxilos, y se disuelve menos. | Acercamiento a una celda del cristal: un "OH" sale y un "F" dorado ocupa su lugar. Chip "hidroxiapatita → con flúor". Una nueva gota de ácido rebota sobre la parte dorada. |
| 5 | Pregunta | ¿Y cómo se descubrió esto? | **Re-gancho.** "?" gigante sobre el diente; la cámara se aleja del microscopio. |
| 6 | Manchas | En 1901, un dentista en Colorado vio dientes manchados color chocolate que se picaban menos. Treinta años después se supo por qué: flúor natural de más en el agua. | Tarjeta "1901 · Frederick McKay · Colorado Springs"; una sonrisa con manchas cafés y un contador de caries bajito; luego rótulo "30 años después" y un vaso de agua con muchos F⁻ y montañas al fondo. |
| 7 | Estudio | En 1945, Grand Rapids, Michigan, fue la primera ciudad del mundo en ponerle flúor a su agua. | `TarjetaEstudio` "1945 · Grand Rapids, Michigan"; un tanque de agua de la ciudad recibe gotitas doradas medidas; mapa pequeño con el punto en Michigan. |
| 8 | Resultado | De casi 30 mil escolares, los nacidos después tuvieron más de 60 por ciento menos caries. | Una cuadrícula de escolares (íconos) se llena; dos barras: "antes" alta y "nacidos después" más de 60 % más baja. Chip "≈ 30 000 escolares · seguimiento de 15 años". |
| 9 | Ninos | Pero tragado de más en niños, mancha: antes de los 3 años, pasta del tamaño de un arroz; de 3 a 6, un chícharo. | Un diente de niño con unas líneas blancas tenues (fluorosis leve). Luego dos cepillos chiquitos: uno con una embarradita del tamaño de un grano de arroz ("menos de 3 años") y otro con una bolita como chícharo ("3 a 6 años"). |
| 10 | Cierre | Así que escupe la espuma, no te enjuagues luego luego, y deja trabajar al flúor. | **Regreso al lavabo del inicio, transformado:** la misma boca escupe la espuma, el vaso de agua se queda quieto y las chispitas F⁻ ahora se quedan brillando sobre los dientes. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua; efectos en el mismo cuadro (chorro del buche, gárgaras, desagüe, mordida de bacterias, gotitas de ácido "tss", cristal que se reacomoda con un "clic", golpe de la tarjeta, chasquido de la cuadrícula llenándose, "pop" de la bolita de pasta, escupida final).

## Fuentes (cada dato abierto en la fuente el 29 oct 2026)

1. **No enjuagarse luego luego: se lleva el flúor; escupir el exceso** — NHS (Reino Unido). "How to keep your teeth clean." https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/ (consultada 2026).
   > "After brushing, spit out any excess toothpaste." · "Don't rinse your mouth immediately after brushing, as it'll wash away the concentrated fluoride in the remaining toothpaste."
2. **Las bacterias hacen ácido después de comer y disuelve minerales; el flúor vuelve el esmalte más difícil de disolver y la pasta sube el flúor en la saliva y ayuda a reconstruir la capa de afuera; cantidades de pasta en niños** — CDC. "About Fluoride." https://www.cdc.gov/oral-health/prevention/about-fluoride.html (consultada 2026).
   > "The acid dissolves minerals in a tooth's surface, making the tooth weaker and open to cavities." · "Some fluoride can replace minerals in the tooth surface, making the outer enamel layer harder to dissolve." · "Fluoride toothpaste also increases the amount of fluoride in saliva, which helps rebuild the outer enamel layer." · "Before age 3, parents should smear no more toothpaste than the size of a grain of rice on a child's toothbrush." · "For ages 3 to 6, no more toothpaste than the size of a pea should be smeared on a child's toothbrush." · "teach them to spit out, not swallow, toothpaste when finished brushing."
3. **Mecanismo: el flúor actúa sobre todo en la superficie; frena la desmineralización y acelera la remineralización con fluorhidroxiapatita, más resistente al ácido** — Buzalaf M.A.R., Pessan J.P., Honório H.M., ten Cate J.M. "Mechanisms of action of fluoride for caries control." *Monogr Oral Sci* 22:97–114 (2011). PMID 21701194 · doi:10.1159/000325151.
   > "fluoride controls caries mainly through its topical effect" · "is able to absorb to the surface of the apatite crystals, inhibiting demineralization" · "traces of fluoride in solution will make it highly supersaturated with respect to fluorhydroxyapatite, which will speed up the process of remineralization" · "preferentially include fluoride and exclude carbonate, rendering the enamel more resistant to future acidic challenges."
4. **El flúor ocupa el lugar de los hidroxilos y baja la solubilidad** — Robinson C. "Fluoride and the caries lesion: interactions and mechanism of action." *Eur Arch Paediatr Dent* 10(3):136–40 (2009). PMID 19772842 · doi:10.1007/BF03262674.
   > "Fluoride can reduce tooth mineral solubility by exchanging for hydroxyl groups and reducing carbonate content."
5. **El esmalte es mineral tipo hidroxiapatita (fosfato de calcio)** — Ulian G., Moro D., Valdrè G. "Hydroxylapatite and Related Minerals in Bone and Dental Tissues…" *Biomolecules* 11(5):728 (2021). PMID 34068073 · doi:10.3390/biom11050728. + Robinson (2009): "lowering solubility products of precipitating calcium phosphates".
   > "collagen (main organic part) and hydroxylapatite-like mineral" · "the mineral phase of bone and dental tissues."
6. **1901, McKay en Colorado Springs; manchas color chocolate; dientes resistentes a la caries; Grand Rapids 1945, primera ciudad del mundo; ≈30 000 escolares; más de 60 % menos caries** — NIDCR (NIH). "The Story of Fluoridation." https://www.nidcr.nih.gov/health-info/fluoride/the-story-of-fluoridation (consultada 2026).
   > "Fluoride research had its beginnings in 1901, when a young dental school graduate named Frederick McKay left the East Coast to open a dental practice in Colorado Springs, Colorado." · "sometimes entire teeth were splotched the color of chocolate candy." · "teeth afflicted by Colorado Brown Stain were surprisingly and inexplicably resistant to decay." · "In 1945, Grand Rapids became the first city in the world to fluoridate its drinking water." · "During the 15-year project, researchers monitored the rate of tooth decay among Grand Rapids' almost 30,000 schoolchildren." · "The caries rate among Grand Rapids children born after fluoride was added to the water supply dropped more than 60 percent."
7. **La causa de las manchas: flúor natural alto en el agua** — American Dental Association. *Fluoridation Facts* (2025), p. 13. https://ebooks.ada.org/fluoridationfacts/13
   > "high levels of naturally occurring fluoride in the drinking water were causing the mottled enamel."
8. **Fluorosis dental: cambio en el aspecto del esmalte por tragar flúor mientras se forman los dientes (incluida la pasta tragada)** — Beltrán-Aguilar E.D., Barker L., Dye B.A. "Prevalence and Severity of Dental Fluorosis in the United States, 1999–2004." NCHS Data Brief 53, CDC (2010). https://www.cdc.gov/nchs/products/databriefs/db53.htm
   > "Dental fluorosis refers to changes in the appearance of tooth enamel" · "during the period of tooth development prior to eruption into the mouth" · "fluoride toothpaste (if swallowed) and fluoride supplements" · "barely visible lacy white markings."

## Notas
- El dibujo es esquemático (bacterias, iones como chispitas, celda del cristal, íconos de escolares).
- "Mete flúor donde había hidroxilos": en la realidad se forma **fluorhidroxiapatita** (solo una parte de los OH se cambia) y el efecto principal es en la superficie y durante cada ataque de ácido, no por "volver de fluorapatita todo el diente". En la descripción se aclara.
- El flúor también tiene un efecto antibacteriano menor (Buzalaf 2011: sobre *Streptococcus mutans* in vitro, sin implicación clínica clara); por eso el guion **no** dice que "no mata gérmenes".
- Colorado 1901: McKay notó las manchas al llegar en 1901; la relación con el flúor del agua se estableció hasta 1931 (Churchill, en Bauxite, Arkansas) y los estudios de Dean. En la descripción se cuenta así. El dato de Grand Rapids (más de 60 %) se anunció a los 11 años del estudio (≈1956).
- La cifra de fluorosis por país no se usa en la voz (los conteos varían mucho según el estudio).
- Cantidad de pasta: CDC; en México la recomendación de la SSA es parecida, pero aquí se cita solo CDC.
