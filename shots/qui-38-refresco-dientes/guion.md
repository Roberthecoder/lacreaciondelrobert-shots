# Shot Químico #38 · Ese refresco no solo es dulce: es ácido (el refresco y tu esmalte)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #38 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (una sonrisa dando un trago de refresco → el esmalte → los cristales de hidroxiapatita → la misma sonrisa, con un vaso de agua y popote) + N2 "El número" en el estudio (el pH gigante: 2.4 contra 7.2).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Ese refresco no solo es dulce: es ácido y disuelve el cristal de tus dientes."
- **Seguridad:** sin consejos médicos inventados; los tres consejos (enjuagar con agua, no cepillarse enseguida, popote detrás de los dientes de enfrente) son textuales de la ADA. No se dice cuántos minutos esperar (la ADA no da una cifra).
- **Duración:** voz 957 caracteres / ≈ 168 palabras (≈ 58.2 s) + cierre 3.5 s → **61.7 s** estimados (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~957 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese refresco no solo es dulce: es ácido y disuelve el cristal de tus dientes. | Fondo rojo-rosa brillante. Desde el cuadro 0 una lata se inclina y el refresco café con burbujas cae sobre una sonrisa grande (dientes blancos); las burbujas suben. "dulce ✓" y luego "ácido" aparece en grande; brillo de cristal en un diente. Barra de escala "1 cm". |
| 1 | Esmalte | Tu esmalte es sobre todo hidroxiapatita: cristales de calcio y fosfato bien pegaditos. | Zoom (cámara que entra) a un diente con `Lupa` rayos X: capa blanca de afuera "esmalte", dentro "dentina". Cambia a fondo noche: varillas de cristal hexagonales apiladas; etiqueta "hidroxiapatita Ca₁₀(PO₄)₆(OH)₂". Barra "1 µm". |
| 2 | Critico | Si el pH de tu boca baja de 5.5, más o menos, esos cristales empiezan a disolverse. | Medidor de pH vertical a la derecha (0–14, colores) "pH de tu boca" con una flecha en ~7 (saliva) que baja solo un poco, apenas por debajo de la línea punteada "≈ 5.5"; al cruzarla, las orillas de los cristales tiemblan. |
| 3 | Acido | Y las colas traen ácido fosfórico; otros refrescos, ácido cítrico. | Entran dos moléculas como personajes: H₃PO₄ "ácido fosfórico" (chip "colas") y ácido cítrico (chip "otros refrescos"), cada una con sus H⁺ brillando. Junto a la lata aparece un segundo medidor con la etiqueta "pH del refresco" que marca ~2.4 (el de la boca no baja a 2–3). |
| 4 | Erosion | Sus iones de hidrógeno atacan los cristales y el esmalte se ablanda y se desgasta. | Los H⁺ (puntitos rojos) chocan con los cristales; se sueltan iones etiquetados "Ca²⁺" y "fosfato" (sin carga) que se van flotando; la superficie del esmalte se va comiendo (contorno que se hace rugoso y baja). Chip "erosión". |
| 5 | Azucar | Encima, el azúcar: las bacterias de tu placa la convierten en ácido. | Caen cubitos de azúcar; bacterias redonditas (placa) se los comen y escupen más H⁺. Chip "caries" junto a "erosión". |
| 6 | Pregunta | ¿Pero qué tan ácido es un refresco? | **Re-gancho.** Regresa a fondo brillante: una tira de pH gigante junto a una lata con "?" enorme. |
| 7 | Estudio | En 2016, en la Universidad de Alabama en Birmingham, midieron 379 bebidas: 93 por ciento tenía pH menor a 4; las colas normales, cerca de 2.4. | Tarjeta "2016 · Reddy et al. · Univ. de Alabama en Birmingham · JADA". Fila de botellitas que se llenan hasta "379"; barra que se pinta "93 % < pH 4". Número gigante **2.4** junto a la cola, y chiquito al lado "agua (Birmingham) 7.2". |
| 8 | Consejo | Por eso, después enjuágate con agua en vez de cepillarte enseguida, y usa popote detrás de los dientes de enfrente. | Tres íconos que entran uno por uno: vaso de agua con enjuague (✓), cepillo con reloj y ✗ "enseguida", y corte de perfil de una boca con el popote pasando detrás de los incisivos (el chorro no toca el frente). Fuente chica "ADA". |
| 9 | Dentista | Lo curioso: tu dentista graba el esmalte con ácido fosfórico al 37 por ciento, por unos segundos, antes de pegar resina. | Jeringa de gel azul sobre un diente; reloj sin número con la palabra "segundos"; chip "ácido fosfórico 37 %"; zoom: superficie del esmalte con microrrelieve y la resina que se agarra a él. |
| 10 | Cierre | Así que ese refresco no solo es dulce: es ácido, y el esmalte que se va no regresa. | **Regreso a la sonrisa del inicio**: misma lata y misma sonrisa, ahora con la etiqueta "pH ≈ 2.4" sobre la lata y una flecha "esmalte: no vuelve a crecer"; al lado, el vaso de agua con popote. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave continua, un poco tensa mientras baja el pH y más abierta en los consejos; efectos en el mismo cuadro (lata que se abre "pssst", burbujeo, "tic" al cruzar el 5.5, chispazos de H⁺ contra los cristales, crujido de los cristales que se sueltan, golpe de la tarjeta del estudio, conteo de botellitas, sorbo de popote, "tic" del reloj).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Pero qué tan ácido es un refresco?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «es ácido y disuelve el cristal de tus dientes» |
| 2 | 5.6 | 9.6 | 13_senalando_arriba | `izq-alto` | «hidroxiapatita: cristales de calcio y fosfato» |
| 3 | 10.9 | 14.8 | 06_pensativo_menton | `arriba-der` | «si el pH de tu boca baja de 5.5» |
| 4 | 16.0 | 18.9 | 10_serio_molesto | `izq-alto` | «ácido fosfórico… ácido cítrico» |
| 5 | 20.5 | 23.9 | 04_bajando_lentes | `arriba-der` | «el esmalte se ablanda y se desgasta» |
| 6 | 25.0 | 28.1 | 10_serio_molesto | `izq-alto` | «las bacterias… la convierten en ácido» |
| 7 | 28.35 | 30.7 | 07_pensativo_puno | `grande` | «¿Pero qué tan ácido es un refresco?» |
| 8 | 33.4 | 38.7 | 11_sorprendido | `izq-alto` | «93 por ciento… las colas, cerca de 2.4» |
| 9 | 39.6 | 45.6 | 05_sonriendo_dientes_uniformes | `arriba-der` | «enjuágate con agua… usa popote» |
| 10 | 46.5 | 52.8 | 13_senalando_arriba | `izq-alto` | «tu dentista graba el esmalte con ácido fosfórico» |
| 11 | 53.4 | 58.1 | 02_apuntando_camara | `arriba-der` | «el esmalte que se va no regresa» |
| — | 58.2 | 61.7 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 11 apariciones · ≈ 46 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **pH de 379 bebidas (2016, Universidad de Alabama en Birmingham); 93 % con pH menor a 4; colas cerca de 2.4; agua municipal de Birmingham 7.2; ácido fosfórico en las colas y ácido cítrico en otras; iones de hidrógeno contra los cristales de hidroxiapatita; ablandamiento; pH 5.5** — Reddy A., Norris D.F., Momeni S.S., Waldo B., Ruby J.D. "The pH of beverages in the United States." *J Am Dent Assoc* 147(4):255–263 (2016). DOI 10.1016/j.adaj.2015.10.019 · PMID 26653863. (Leído en el PDF completo del artículo.)
   > "The authors purchased 379 beverages from stores in Birmingham, Alabama" · "Most (93%, 354 of 379) beverages had a pH of less than 4.0" · "Coca-Cola Classic (pH = 2.37), Coca-Cola Cherry (pH = 2.38), and Pepsi (pH = 2.39)" · "RC Cola (pH = 2.32)" · "Birmingham, Alabama, municipal water 7.20" · "Phosphoric acid is added to cola drinks to impart tartness" · "Citric acid, a substance naturally occurring in citrus drinks and added to many others" · "Citric acid, followed by phosphoric acid, and then malic acid were the most frequently added acids to the drinks tested." · "It primarily occurs when hydrogen ions interact with the surface fluorapatite and hydroxyapatite crystals" · "responsible for the immediate dissolution and softening of surface tooth structure" · "surface enamel starts to demineralize as the pH drops to less than 5.5" · Afiliación: "School of Dentistry, The University of Alabama at Birmingham".
2. **Esmalte = sobre todo hidroxiapatita (calcio y fosfato); el pH crítico ronda 5.5 (varía); 37 % de ácido fosfórico en el grabado; resina; la erosión no se repone** — Dawes C. "What is the critical pH and why does a tooth dissolve in acid?" *J Can Dent Assoc* 69(11):722–724 (2003). PMID 14653937. https://jcda.ca/sites/default/files/back_issues/vol-69/issue-11/722.pdf
   > "Dental enamel is composed primarily of hydroxyapatite (HA), Ca10(PO4)6(OH)2" · "In people with low salivary concentrations of calcium and phosphate, the critical pH may be 6.5, whereas in those with high salivary calcium and phosphate concentrations, it may be 5.5." · "The first is the acid-etch technique, which usually employs 37% phosphoric acid. … Normally, though, the acid is applied for only about 10 s" · "reduces the strength of bonding to composite resin" · "enamel that has suffered surface erosion by acid cannot be recalcified" · "enamel erosion is irreversible" · "fruit juices and soft drinks, which have great potential to cause erosion because many of them have a pH of less than 3"
3. **Consejos: enjuagar con agua y no cepillarse enseguida; popote detrás de los dientes de enfrente; refrescos como factor de riesgo** — American Dental Association, "Dental Erosion" (Oral Health Topics), actualizado el 22 oct 2025. https://www.ada.org/resources/ada-library/oral-health-topics/dental-erosion
   > "Rinse with water rather than brushing teeth immediately after consuming acidic beverages." · "Drinking with a straw positioned behind the front teeth can minimize bathing the teeth." · "Frequent consumption of soft drinks, particularly carbonated sodas, is a primary risk factor for erosive tooth wear." · "soft drinks, sports drinks and fruit juices with low pH values (2.0-3.5)"
4. **Azúcar → la placa la convierte en ácido (caries)** — Organización Mundial de la Salud, "Oral health" (nota descriptiva), 17 mar 2025. https://www.who.int/news-room/fact-sheets/detail/oral-health
   > "Dental caries results when plaque forms on the surface of a tooth and converts the free sugars … contained in foods and drinks into acids that destroy the tooth over time."

## Notas
- El dibujo es esquemático (cristales como varillas hexagonales, H⁺ como puntitos, bacterias redonditas, la boca en corte).
- "pH 5.5, más o menos": Dawes aclara que el pH crítico no es fijo (de ~5.5 a ~6.5 según el calcio y fosfato de la saliva; en la placa puede ser 5.1). Va en la descripción.
- "Las colas normales, cerca de 2.4": en el estudio, Coca-Cola Classic 2.37, Pepsi 2.39, Coca-Cola Cherry 2.38 y RC Cola 2.32; las versiones de dieta salieron alrededor de 3 (Coca-Cola Diet 3.10, Coca-Cola Zero 2.96). Son bebidas compradas en EUA en 2016; las de México pueden variar.
- "379 bebidas" es la cifra del artículo publicado en JADA; el manuscrito de autor en PMC (PMC4808596) dice 380 (355/380 = 93 %). El 93 % es igual en ambos.
- Erosión (ácido de la bebida, sin bacterias) y caries (ácido que fabrican las bacterias con el azúcar) son dos daños distintos; el refresco normal trae los dos. En la descripción se explica.
- El ácido fosfórico del dentista se pone en un diente limpio, controlado y se enjuaga; no es una invitación a nada casero.
- La lata y la cola van genéricas, sin logo, colores ni tipografía de ninguna marca real (las marcas solo están en estas notas).
- No se dice cuántos segundos dura el grabado ácido: Dawes (2003) dice ~10 s, pero las instrucciones actuales de los grabadores y la literatura reciente hablan de 15–30 s; por eso la voz dice "por unos segundos".
- No se usa ninguna cifra de consumo de refresco en México: no se verificó una fuente primaria reciente (regla de "Números").
