# Shot Fungi Mati #16 · Tu salsa de soya la cocinó un hongo: el koji

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #16 · rama `pedido300/fun`.
- **Formato:** N1 "Por dentro" (de tu mesa al microscopio y de regreso): la botella de salsa → el grano con hifas y enzimas (fondo oscuro) → el tanque de salmuera → la misma botella, ya "explicada".
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo que se ve en pantalla: «Esa salsa negra que le pones al sushi no es solo soya: la cocinó un hongo.»
- **Duración:** voz 975 caracteres / 179 palabras (≈ 58 s) + cierre 3.5 s → **≈ 61.5 s** en la base (se ajusta con `estimar-escenas.mjs` en la fase 3).
- **Voz:** pendiente de aprobación de Robert (~975 créditos de ElevenLabs).
- **Tono:** curioso y de cocina; el giro es que el hongo muere y aun así su trabajo sigue.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa salsa negra que le pones al sushi no es solo soya: la cocinó un hongo. | Fondo amarillo de lunares: cuadro 0.3, una botellita de salsa de soya se inclina y cae un chorro sobre un rollo de sushi. Chip "¿solo soya?" que se tacha y aparece "la cocinó un hongo". |
| 1 | Siembra | Se cuece soya, se tuesta trigo y encima se siembra el koji: *Aspergillus oryzae* o *sojae*. | Fondo menta: frijoles de soya inflándose en vapor; granos de trigo que se doran y se quiebran; mitad y mitad en una charola. Llueven esporas verde-amarillas. Etiquetas "koji" · *Aspergillus oryzae* · *A. sojae*. |
| 2 | Crece | En dos o tres días, a treinta grados, sus hilos lo cubren todo y sueltan tijeras químicas: enzimas. | Cronómetro "2–3 días" y termómetro "30 °C"; la charola se cubre de pelusa blanca-verdosa. Zoom (Lupa) a un grano: fondo oscuro, hifas que lo atraviesan y cabezuelas con esporas (conidióforo con vesícula redonda y cadenas de conidios). De las hifas salen tijeritas = "enzimas". |
| 3 | Proteinas | Unas cortan las proteínas en aminoácidos, como el glutamato, que da el sabor umami. | Cadena larga de cuentas (proteína) que las tijeras cortan en pedacitos y luego en cuentas sueltas (aminoácidos). Una cuenta dorada se ilumina: chip "glutamato → umami". Etiqueta "proteasas". |
| 4 | Almidon | Otras cortan el almidón del trigo en azúcares. | Cadena ramificada de hexágonos (almidón) que se corta en hexágonos sueltos (glucosa). Etiqueta "amilasas". |
| 5 | Salmuera | Luego todo se echa en agua muy salada, y ahí el hongo muere. | Fondo cian: la charola cae en un tanque de salmuera (chip "22–23 % de sal"). Las hifas se ponen grises y se deshacen; ✝ chiquita. |
| 6 | Pregunta | ¿Y entonces quién sigue cocinando? | **Re-gancho.** "?" gigante sobre el tanque; Robert grande, pensativo. |
| 7 | Moromi | Sus enzimas, más bacterias y levaduras que aguantan la sal, durante meses. | Dentro del tanque (fondo oscuro): las tijeras siguen cortando; aparecen bacterias en grupitos de cuatro (*Tetragenococcus halophilus*) y levaduras ovaladas (*Zygosaccharomyces rouxii*) con burbujitas. Calendario que pasa hojas: chip "6–8 meses (método tradicional)". |
| 8 | Color | Y el color oscuro sale de azúcares y aminoácidos que reaccionan. | Un hexágono (azúcar) y una cuenta (aminoácido) se abrazan y el líquido se oscurece de beige a café casi negro. Chip "reacción de Maillard". |
| 9 | Estudio | Un estudio de 2006, en Japón, revisó 210 cepas de koji. | TarjetaEstudio "2006 · Higashi-Hiroshima, Japón · 210 cepas · Tominaga et al., *Appl. Environ. Microbiol.*". Se llenan 210 puntitos (tubos de cepas). |
| 10 | Primo | Hallaron los genes del veneno de su primo, *Aspergillus flavus*, pero apagados o incompletos: el koji no hace aflatoxinas. | Dos hongos lado a lado: *A. flavus* con calavera "aflatoxinas" y *A. oryzae* con la misma tira de genes, pero con huecos y un interruptor en OFF. Sello "0 aflatoxinas". |
| 11 | Nacional | Como también hace sake y miso, ese año una sociedad científica de Japón lo nombró hongo nacional. | Aparecen una botellita de sake y un tazón de miso junto a la salsa; medalla "hongo nacional · 2006 · Brewing Society of Japan". |
| 12 | Cierre | Así que esa salsa negra no es solo soya: es el trabajo de un hongo que ya no está. | **Regreso a la imagen del inicio:** la misma botellita y el mismo sushi, ahora con un "fantasma" de hifas dibujado dentro de la botella. Chip "la cocinó un hongo". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

**Música:** cama grave y cálida, continua, sin golpe; efectos en el mismo cuadro: chorro de salsa, silbido del vapor, crujido del trigo tostado, lluvia de esporas, tic del cronómetro, "tijeritas" en cada corte de proteína y almidón, chapuzón en la salmuera y un "puf" cuando muere el hongo, burbujas de las levaduras, hojas del calendario, 210 tics del estudio, interruptor que se apaga, campanita de la medalla.

Barras de escala: 5 cm (botella y sushi), 1 cm (charola/grano), 10 µm (hifas, conidios, bacterias y levaduras).

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y entonces quién sigue cocinando?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.2 | 11_sorprendido | `gancho` | «la cocinó un hongo» (cuadro 0) |
| 2 | 5.9 | 9.2 | 13_senalando_arriba | `arriba-der` | se siembra el koji (llueven esporas) |
| 3 | 12.5 | 14.9 | 05_sonriendo_dientes_uniformes | `izq-alto` | la lupa: hifas, cabezuela y «tijeras químicas» |
| 4 | 16.5 | 19.8 | 04_bajando_lentes | `arriba-der` | «el glutamato, que da el sabor umami» |
| 5 | 24.6 | 26.6 | 12_perfil_serio | `arriba-der` | «ahí el hongo muere» |
| 6 | 26.8 | 29.4 | 07_pensativo_puno | `grande` | «¿y entonces quién sigue cocinando?» |
| 7 | 30.8 | 33.2 | 13_senalando_arriba | `arriba-der` | bacterias y levaduras, «durante meses» |
| 8 | 34.6 | 37.0 | 06_pensativo_menton | `arriba-der` | el color oscuro (Maillard) |
| 9 | 42.0 | 46.8 | 11_sorprendido | `arriba-der` | genes del veneno apagados: 0 aflatoxinas |
| 10 | 48.3 | 52.8 | 05_sonriendo_dientes_uniformes | `arriba-der` | «hongo nacional» |
| 11 | 54.0 | 57.9 | 02_apuntando_camara | `arriba-der` | «es el trabajo de un hongo que ya no está» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones 11 · **35.8 s** en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. Ito, K. y Matsuyama, A. (2021). Koji Molds for Japanese Soy Sauce Brewing: Characteristics and Key Enzymes. *Journal of Fungi* 7(8): 658. https://pmc.ncbi.nlm.nih.gov/articles/PMC8399179/
   > "produced from the fermentation of soybeans, wheat, and salt by three types of microorganisms, namely koji molds, halophilic lactic acid bacteria, and salt-tolerant yeast"
   > "the soybeans are moistened and cooked under steam pressure to denature the proteins, and the wheat is roasted at 160–180 °C and crushed. Approximately equal amounts of soybean and wheat components are then mixed and inoculated with a pure culture of koji mold. This mixture is incubated for two to three days at 30 °C under high humidity to allow the koji mold to grow throughout the mixture and produce various hydrolyzing enzymes, such as proteolytic and amylolytic enzymes"
   > "the main koji molds used for soy sauce brewing include A. oryzae and A. sojae"
   > "A. oryzae is widely used in the manufacture of sake, amazake (Japanese sweet beverage), mirin (Japanese sweet rice wine), miso, and soy sauce"
   > "Soy sauce koji is then added to a concentrated (22–23%) saline solution to produce Moromi or Moromi mash that is traditionally fermented for 6–8 months. In this process, the entire enzyme-rich koji mixture is used … to decompose the raw materials and yield amino acids and sugars"
   > "large molecular substances, such as proteins and starches, in the raw materials into smaller substances, such as amino acids and glucose"
   > "T. halophilus metabolizes glucose, which is produced by the breakdown of wheat starch by amylolytic enzymes derived from koji mold"
   > "l-glutamate is the main component of umami in soy sauce"
   > "Soon after brewing, the koji mold dies off and is replaced by salt-tolerant or halophilic microorganisms. The first microbes that grow in moromi mash are halophilic lactic acid bacteria."
   > "The former is classified as Zygosaccharomyces rouxii and mainly affects the flavor of soy sauce."
   > "The color of the soy sauce is also due to the chemical reactions between amino acids and sugars during fermentation." · "amadori compounds are formed by Maillard reactions between sugars, such as glucose, and amino acids"
2. Tominaga, M. et al. (2006). Molecular analysis of an inactive aflatoxin biosynthesis gene cluster in *Aspergillus oryzae* RIB strains. *Appl. Environ. Microbiol.* 72(1): 484–490. National Research Institute of Brewing, Higashi-Hiroshima, Japón. https://pmc.ncbi.nlm.nih.gov/articles/PMC1352174/ · https://pubmed.ncbi.nlm.nih.gov/16391082/
   > "used to detect these genes in 210 A. oryzae strains"
   > "most genes in the corresponding cluster exhibited from 97 to 99% similarity to those of Aspergillus flavus"
   > "A 257-bp deletion in the aflT region, a frameshift mutation in norA, and a base pair substitution in verA were found in A. oryzae RIB 40."
   > "Seventy-seven strains (36.7%) belonged to group 2, characterized by having only vbs, verB, and avnA in half of the cluster."
   > "other genes (avnA, vbs, verB, and omtA) related to aflatoxin production were not detected. aflR was not detected in group 2 strains"
   > "The lack of expression of these genes in group 1 strains proves that A. oryzae does not produce aflatoxin."
3. Machida, M. et al. (2005). Genome sequencing and analysis of *Aspergillus oryzae*. *Nature* 438: 1157–1161. https://pubmed.ncbi.nlm.nih.gov/16372010/
   > "Although both A. oryzae and Aspergillus flavus belong to the section Flavi of the subgenus Circumdati of Aspergillus, A. oryzae, unlike A. flavus, does not produce aflatoxin, and its long history of use in the food industry has proved its safety."
4. Yamashita, H. (2021). Koji Starter and Koji World in Japan. *Journal of Fungi* 7(7): 569. https://pmc.ncbi.nlm.nih.gov/articles/PMC8304044/
   > "the Scientific Conference of Brewing Society of Japan deemed koji fungi "the national fungi" in 2006."
5. Kitamoto, K. (2015). Cell biology of the Koji mold *Aspergillus oryzae*. *Biosci. Biotechnol. Biochem.* 79(6): 863–869. https://pubmed.ncbi.nlm.nih.gov/25776568/
   > "Koji mold, Aspergillus oryzae, has been used for the production of sake, miso, and soy sauce for more than one thousand years in Japan. Due to the importance, A. oryzae has been designated as the national micro-organism of Japan (Koku-kin)."
6. Machida, M., Yamada, O. y Gomi, K. (2008). Genomics of *Aspergillus oryzae*: learning from the history of Koji mold and exploration of its future. *DNA Research* 15(4): 173–183. https://pmc.ncbi.nlm.nih.gov/articles/PMC2575883/
   > "It is said that A. oryzae is a domesticated species" · "A. oryzae has no record of producing aflatoxin or any other carcinogenic metabolites." (respaldo; "pariente/primo" = misma sección *Flavi*, genéticamente muy cercano).

El dibujo es esquemático.
