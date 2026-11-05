# Shot Fungi Mati #84 · Eso no es un huevo: es un hongo a punto de nacer

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #84 · rama `claude/fun-80-84-mexico`.
- **Ángulo del lote:** hongos de México y su cultura (volcanes y el saber de los hongueros).
- **Formato:** N1 · POR DENTRO (macro → micro → macro) con escenas de estudio tipo N5: huevo en el suelo del bosque del volcán → corte por dentro (el hongo ya formado dentro del velo) → hongo abierto → tianguis y canasta → regreso al mismo huevo del bosque.
- **Gancho (de los 7):** #1 «Esto no es X: es Y» sobre algo que se ve en pantalla: «Eso no es un huevo: es un hongo a punto de nacer en un volcán.»
- **Duración:** voz 944 caracteres / 174 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** en la base (`estimar-escenas.mjs`).
- **Voz:** pendiente de aprobación de Robert (~944 créditos de ElevenLabs).
- **Corregido tras la verificación (5 nov 2026):** los rasgos de las hongueras ya no se presentan como regla (la mortal blanca también los tiene); «yuyo de veneno» solo en algunas comunidades; se quitó la cifra de intoxicaciones de Chiapas (de segunda mano) y en su lugar va «no hay regla ni prueba general» ([GEN] ✅); «unas cuarenta especies que se comen»; «al crecer, el velo se rasga»; «se recolecta de julio a septiembre, ya entradas las lluvias»; otomí «K'axt'i».
- **Especie dibujada:** *Amanita basii* (complejo *Amanita caesarea*): así quedó identificado en 2019 el «hongo amarillo» de La Malinche, con los mismos ejemplares de herbario (Montoya 13, 269, 618; Kong 616) que en 2002 se habían llamado *A. caesarea* en sentido amplio.
- **Tono:** admiración por el saber de los hongueros + aviso de seguridad claro. **No es guía de identificación**: el video nunca enseña "cómo reconocerlo", solo cuenta qué miran los expertos y por qué **ningún rasgo basta** (la mortal blanca tiene los mismos).
- **No repite** fun-39 (*A. muscaria*, puntos = restos del velo) ni fun-09 (*A. phalloides* y la cuchara de plata): aquí el foco es el hongo amarillo/yema mexicano y el conocimiento de los hongueros.

## Versión narrada

Tiempos de la base (estimados): Gancho 0–3.9 · Volcan –8.6 · Dentro –12.8 · Revienta –16.5 · Sale –20.6 · Pregunta –25.5 · Estudio –30.2 · Nombres –34.4 · Rasgos –40.3 · Yuyo –45.0 · Sin –49.9 · Regla –54.5 · Cierre –58.3 · Outro –61.8.
Todos los textos de pantalla están juntos en el objeto `TX` al inicio de `hongo-yema.jsx` (para cambiarlos fácil).

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Eso no es un huevo: es un hongo a punto de nacer en un volcán. | Fondo menta con lunares; volcán lejano, pinos y ailes; suelo de agujas de pino. Un «huevo» blanco medio enterrado tiembla y se agrieta (desde 0.3 s). «¿un huevo?» se tacha → chip «un hongo a punto de nacer». Barra 3 cm. |
| 1 | Volcan | Crece en La Malinche, Tlaxcala, entre pinos y ailes, a unos tres mil metros. | Fondo cian: el volcán (cima 4,460 m) con franja de pinos y ailes; medidor de altitud que sube a «≈ 3,000 m»; nubes; chip «se recolecta de julio a septiembre, ya entradas las lluvias». |
| 2 | Dentro | Por dentro ya trae sombrero, laminillas y pie, envueltos en un velo. | Fondo oscuro. `Lupa` «POR DENTRO · EL «HUEVO»» sobre el huevo: corte con sombrero naranja-rojo, laminillas amarillas, pie, velo parcial y el velo universal blanco. Etiquetas una por frase. Barra 1 cm. |
| 3 | Revienta | Al crecer, el velo se rasga y queda una bolsa blanca abajo. | Fondo menta (algunas gotas de ambiente): las tapitas del velo salen volando y asoma el sombrero; abajo queda la volva («volva: bolsa blanca»). |
| 4 | Sale | Sale el hongo amarillo: sombrero rojo anaranjado, anillo amarillo. | El pie se estira y el sombrero se abre (rojo al centro, amarillo-naranja con estrías en el margen). Etiquetas: sombrero rojo anaranjado, laminillas amarillas, anillo amarillo, pie amarillo, volva blanca en saco; *Amanita basii* · *complejo Amanita caesarea* · «en México se usan al menos 7 especies de este grupo». Barra 5 cm. |
| 5 | Pregunta | ¿Cómo lo reconocen los que saben, si sus primas mortales también nacen de huevo? | **Re-gancho.** Fondo rosa: junto al amarillo, un huevo se abre en una amanita toda blanca; etiqueta «amanitas blancas mortales»; «?» gigante; Robert grande (izquierda). |
| 6 | Estudio | Un estudio de dos mil dos habló con ciento noventa y una personas del volcán: | Fondo amarillo. `TarjetaEstudio` «2002 · 3 pueblos de La Malinche · Journal of Ethnobiology, 2002 · campo 1988–1992». Volcán esquemático con Ixtenco (otomí), Javier Mina (nahua) y Los Pilares (mestizo). «191 entrevistas» y chip «+ 495 cuestionarios». |
| 7 | Nombres | daban ciento veintiún nombres a unas cuarenta especies que se comen. | «121 nombres comunes», chip «~40 especies que se comen (hongos y mixomicetos)», cuadrícula de 40 siluetas con el amarillo resaltado; sus nombres: hongo amarillo, ahuevadito, hongo flor, jícara buena; «otomí: K'axjo (K'axt'i = amarillo + jo = hongo)»; chip «más del 95 % lo conocía». |
| 8 | Rasgos | En Hidalgo, las hongueras miran todo el hongo; ojo: las mortales también traen pañuelito y botita. | Fondo naranja, toldo de tianguis: chip «tianguis de Acaxochitlán, Hidalgo · 2009», «le dicen «yemas» o «yemitas»», «lo que miran las hongueras:». El amarillo a la izquierda con tres marcas neutras (sin ajonjolí / con pañuelito / con botita, **sin palomitas**); luego brota la **mortal blanca** a la derecha y las **mismas tres marcas** en rojo apuntan a ella; chip rojo «la mortal también los tiene: un rasgo no basta». |
| 9 | Yuyo | En Los Altos de Chiapas, a la blanca mortal algunos le dicen yuyo de veneno. | Fondo cian; mapa chico con Los Altos de Chiapas. Yuyo comestible (*Amanita hayalyuy*) y la mortal blanca: ««yuyo de veneno» (en algunas comunidades)». Chip «en tseltal: «k'antsu blanco»: el nombre avisa…» → chip rojo «…pero no todas las mortales son blancas». |
| 10 | Sin | Y no hay regla ni prueba general que separe un hongo venenoso de uno comestible. | Fondo lila: dos «huevos» idénticos con «=» y «?» encima. Chip rojo «no hay regla ni prueba general» + «para separar venenoso de comestible» + «ni trucos ni «pruebas» caseras». |
| 11 | Regla | Nunca comas un hongo silvestre por foto, regla o app: solo con un experto. | Fondo amarillo: foto, regla («SI TIENE…») y app tachadas; chip «Ningún rasgo, foto ni app basta»; «✓ solo con un experto» y «¿Te sientes mal? Al médico, y lleva el hongo». |
| 12 | Cierre | Ese huevo puede ser un manjar del volcán, o su prima mortal. | **Regreso a la imagen del inicio, transformada:** el mismo huevo agrietado en el mismo bosque, ahora con la canasta de la honguera llena de hongos amarillos y una amanita blanca al fondo; «?» sobre el huevo; chip «solo con un experto»; aviso «No es guía de identificación…». |
| — | Outro | (sin voz) | `CierreMarca` con `logo_biologia.svg` y Robert señalando. |

**Música (`gen-audio.mjs`):** cama grave que cambia de acorde en cada escena (la menor tapada → fa → sol oscuro → do → do abierto → mi tenso → fa → sol → la menor → disminuido → re menor → mi semidisminuido → fa → sol → la menor resuelta), con bajo que camina. Efectos en el mismo cuadro: grieta del huevo, viento, medidor, lupa, gotas, desgarro del velo, estirón, notas de etiquetas, golpe de la prima blanca, conteos (191, 121, 40), tianguis, marcas de rasgos (graves y tapadas en la mortal), mapa, «=», tres tachones, ✓ del experto, canasta.

**Barras de escala:** 3 cm (huevo), «esquema · altitud sobre el mar» (volcán), 1 cm (por dentro), 5 cm (hongo abierto, prima, tianguis, yuyo), «mapa esquemático» (estudio y nombres), 3 cm (dos huevos y cierre).

**Avisos en pantalla:** «Ningún rasgo, foto ni app basta», «la mortal también los tiene: un rasgo no basta», «No es guía de identificación. Nunca comas hongos silvestres sin un experto. El dibujo es esquemático.»

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande (`grande-izq`, no tapa el subtítulo) en el re-gancho.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | «Eso no es un huevo» (cuadro 0) |
| 2 | 5.0 | 8.4 | 13_senalando_arriba | `arriba-der` | «La Malinche… tres mil metros» |
| 3 | 13.3 | 16.4 | 04_bajando_lentes | `arriba-der` | «el velo se rasga» |
| 4 | 20.8 | 25.3 | 07_pensativo_puno | `grande-izq` (grande) | «¿Cómo lo reconocen los que saben…?» |
| 5 | 30.3 | 34.3 | 05_sonriendo_dientes_uniformes | `arriba-der` | «ciento veintiún nombres» |
| 6 | 35.0 | 40.1 | 13_senalando_arriba | `arriba-der` | «ojo: las mortales también traen pañuelito y botita» |
| 7 | 40.6 | 44.8 | 11_sorprendido | `arriba-der` | «yuyo de veneno» |
| 8 | 45.4 | 49.7 | 10_serio_molesto | `arriba-der` | «no hay regla ni prueba general» |
| 9 | 50.2 | 54.3 | 02_apuntando_camara | `arriba-der` | «Nunca comas un hongo silvestre…» |
| 10 | 54.9 | 58.2 | 06_pensativo_menton | `arriba-der` | «o su prima mortal» |
| — | 58.3 | 61.8 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones 10 · **39.0 s** en pantalla (+ cierre 3.5 s) · 8 poses distintas (02, 04, 05, 06, 07, 10, 11, 13) · nunca la misma dos veces seguidas · una vez grande. Revisado en preview: no tapa etiquetas, chips ni subtítulo. Sin pose de lengua (tema serio).

## Fuentes (abiertas en el texto completo el 5 nov 2026)

1. Montoya, A., Estrada-Torres, A. y Caballero, J. (2002). Comparative ethnomycological survey of three localities from La Malinche volcano, Mexico. *Journal of Ethnobiology* 22(1): 103–131. https://ethnobiology.org/sites/default/files/pdfs/JoE/22-1/Montoyaetal2002.pdf
   > "we selected three communities: Ixtenco, where the population is Otomi in origin; Javier Mina where the people are of Nahua ancestry; and Los Pilares, a community of mixed Indian and Spanish descent (mestizos). These towns are located on the slopes of the Malinche Volcano in the eastern part of the State of Tlaxcala and were visited periodically from 1988 to 1992"
   > "We interviewed 191 people and obtained 495 completed questionnaires."
   > "A total of 121 common names used to designate 40 species of mushrooms and slime molds were found" (sección Food = comestibles; en Resultados: "We elicited 121 common names of 41 edible species in the three towns" → por eso «unas cuarenta especies que se comen», con «hongos y mixomicetos» en pantalla)
   > "The following species were known to over 95% of the inhabitants of the three communities: Amanita caesarea, Boletus pinophilus, and Lyophyllum ovisporum."
   > "Mushrooms considered to be of excellent quality by most people are the following: Amanita caesarea, Boletus pinophilus, Lyophyllum ovisporum…" (respalda «manjar»)
   > "In Javier Mina, people recognized the volva, the ring, and the scales and associated these structures with the mushroom's development"
   > Apéndice 2: *Amanita caesarea* — "ahuevadito, hongo amarillo, hongo flor, jícara buena"; otomí "kaxkho"; vouchers "Montoya 13, 269, 618; Kong 616".
2. Montoya, A., Kong, A., Estrada-Torres, A., Cifuentes, J. y Caballero, J. (2004). Useful wild fungi of La Malinche National Park, Mexico. *Fungal Diversity* 17: 115–143. https://fungaldiversity.org/fdp/sfdp/17-8.pdf
   > "La Malinche National Park (Volcán la Malintzi, 4,460 m) is located in the southern part of the state of Tlaxcala"
   > *Amanita caesarea*: "Mycorrhizal, in Pinus-Alnus forests. Collected from July to September. Edible and for sale. From a taxonomic point of view, this species belongs to a complex that includes at least 7 taxa used in Mexico (Guzmán and Ramírez-Guillén, 2001)."
   > "The rainy season is from May to November." (por eso el chip dice «se recolecta de julio a septiembre, ya entradas las lluvias»)
   > Ejemplares: "Malintzi volcano, La Malinche National Park, 3300 m alt."; "west slope of the Malintzi volcano, La Malinche National Park, 3000 m alt."
   > "Some species begin to appear only when the rains are well under way, such as Amanita caesarea."
3. Montoya, A., Briones-Dumas, E., Núñez-López, R. A., Kong, A., Ortíz-Hernández, V. y Moreno-Fuentes, Á. (2019). Los hongos conocidos por la comunidad Yuhmu de Ixtenco, Tlaxcala, México. *Scientia Fungorum* 49: e1230. https://scientiafungorum.org.mx/index.php/micologia/article/download/e1230/1421/3736
   > Cuadro: "Amanita basii Guzmán & Ram.-Guill. — H. amarillo, hongo flor, jícara buena, ahuevadito — K'axjo > K'axt'i: amarillo + Jo: Hongo = Hongo amarillo — Montoya 13, 269, 618; Kong 616"
   > "reconocen el desarrollo de Amanita basii y al respecto dicen: 'primero empieza a reventar y sale el palito (estípite), después sale la cabeza (píleo) como bola y empieza abriéndose'"
   > "Las siguientes especies fueron mencionadas por el 95 % de las personas entrevistadas: Amanita basii, Boletus aff. edulis, Lyophyllum spp."
4. Hernández-Rico, G. N. y Moreno-Fuentes, Á. (2010). Hongos comestibles del género *Amanita* en el mercado de Acaxochitlán, Hidalgo, México. *Etnobiología* 8: 31–38. https://dialnet.unirioja.es/descarga/articulo/5294416.pdf
   > "Durante el periodo junio a octubre de 2009 se acudió al mercado tradicional… Se les aplicó a las hongueras una entrevista dirigida, para conocer los nombres tradicionales y las características físicas que usan para distinguir a estos hongos."
   > "Se obtuvieron cinco especies: Amanita jacksonii, A. caesarea var. americana, A. tecomate, A. laurae y A. sp. Los nombres tradicionales que utilizan son: 'yemas o yemitas, yemas amarillas o marías' y cocos. Las características morfológicas que toman en cuenta son: sin ajonjolí (escamas), con pañuelito (velo) y con botita (volva)."
   > "cada 'montón' incluye de 4 a 7 esporomas"; "yema ha sido recurrentemente referido en el centro de México"
5. Ruan-Soto, F. (2020). Highly cultural significant edible and toxic mushrooms among the Tseltal from the Highlands of Chiapas, Mexico. *Ethnobiology and Conservation* 9: 32. https://ethnobioconservation.com/ebc/article/download/414/273/1962
   > "Amanita virosa Bertill. and A. verna (Bull.) Lam. are named sakil k'antsu, which means 'white k'antsu', in some communities. This name clearly reflects their similitude to the edible species Amanita complex. caesarea, while also pointing out their distinct white color that contrasts with the edible species typical brown-yellow hues. The same taxon was also called yuyo de veneno (poison yuyo) in Spanish."
   > Cuadro 1: *Amanita* complex. *caesarea* (incluye *A. hayalyuy*) — "yuyo", "k'antsu". «Yuyo de veneno» aparece solo en algunas comunidades (y ahí también para *A. phalloides* y *A. flavoconia*), por eso la voz dice «algunos le dicen» y la pantalla «no todas las mortales son blancas».
6. *(Quitada tras la verificación: la cifra de 60 casos / 22 muertes en Chiapas 2005–2007 era de segunda mano —Ruan-Soto, Mariaca y Alvarado 2012, Ecofronteras 44, citando a la Secretaría de Salud— y el reporte original no se pudo abrir.)* En su lugar:
   Generalitat de Catalunya. Recomendaciones sanitarias, temporada de setas. https://tramits.gencat.cat/en/actualitat/reportatges/temporada-de-bolets/recomanacions-sanitaries/index.html
   > "There are no general rules or tests to distinguish between toxic and edible mushrooms."
   > "Popular tradition and folklore should be ignored in this case."
   > "When the first symptoms of intoxication appear, immediately go to a hospital"; "If possible, take samples of the mushrooms which you think may be the cause of the poisoning"
   Y para «la mortal también tiene los rasgos»: Kuo, M. MushroomExpert, *Amanita bisporigera* (ángel destructor). https://www.mushroomexpert.com/amanita_bisporigera.html
   > cap "bald (very rarely with a volval patch)"; "a persistent, thin, high, skirtlike" ring; "a white, sacklike volva encasing the base"; puede ponerse "a little yellowish or pinkish with maturity"
7. Duffy, T. J. (2008). *Toxic Fungi of Western North America* — Amanitas (MykoWeb). https://www.mykoweb.com/TFWNA/P-09.html
   > "An Amanita button, when cut in half, will show the embryonic gills and a faint outline of the maturing mushroom, which will later rupture the universal veil that covers it."
8. Morfología para el dibujo (no se dice en la voz salvo colores del sombrero y anillo): *Amanita basii* — Wikipedia (cita Amanitaceae.org, Tulloss) https://en.wikipedia.org/wiki/Amanita_basii : sombrero 67–152 mm, rojo a rojo-naranja al centro, naranja a amarillo en el margen; anillo "skirt-like, copious, membranous, persistent"; "The saccate volva is smooth, white, with yellow tints on the inner surface." Grupo *A. jacksonii* (MushroomExpert, Kuo) https://mushroomexpert.com/amanita_jacksonii.html : margen "lined", láminas amarillas, anillo "yellow to orange, skirtlike", volva "white, sacklike"; "Virtually identical cryptic phylogenetic species appear… in Mexico… (Mexico's Amanita basii and Amanita yema)". *A. virosa* (Wikipedia): "first appears as a white, egg-shaped object covered with a universal veil".
9. Guzmán, G. y Ramírez-Guillén, F. (2001). *The Amanita caesarea-complex*. Bibliotheca Mycologica 187. J. Cramer (descripción original de *A. basii*, *A. tecomate*, *A. yema*, *A. laurae*; citado por las fuentes 2 y 4; no se abrió el libro).

El dibujo es esquemático. No es guía de identificación: nunca comas hongos silvestres sin un experto.
