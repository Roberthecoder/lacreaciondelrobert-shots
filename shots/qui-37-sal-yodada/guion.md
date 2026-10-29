# Shot Químico #37 · Ese «yodada» en tu sal no es adorno (yodo, tiroides y bocio)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #37 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el salero de tu cocina → tu cuello y la tiroides → la molécula de tiroxina → el mismo salero, ahora con la etiqueta explicada) + N5 "El experimento" (Marine y Kimball, Akron, Ohio, 1917–1919).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo que se ve en pantalla: "Ese «yodada» en tu sal no es adorno: es lo que tu cuello necesita para fabricar hormonas."
- **No repite el #14** (`qui-14-sal-sodio`, sodio + cloro): aquí la sal es solo el vehículo; el tema es el yodo, la tiroides y la norma mexicana.
- **Seguridad:** no se dice que haya que comer más sal ni se recomienda ningún suplemento; en la descripción va la recomendación de la OMS (menos de 5 g de sal al día, y que sea yodada). Nada de diagnóstico: un cuello hinchado se revisa con el médico.
- **Duración:** voz 952 caracteres (≈ 58 s) + cierre 3.5 s → **61.5 s** estimados (`node motor/kit/estimar-escenas.mjs borradores/qui-37-sal-yodada --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`salyodada.jsx`, hoja en `revision/hoja.png`), voz pendiente de aprobación de Robert (~952 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese «yodada» en tu sal no es adorno: es lo que tu cuello necesita para fabricar hormonas. | Fondo amarillo de cocina. Desde el cuadro 0 un salero cae y suelta un chorrito de sal sobre un plato; la cámara se acerca a la etiqueta del paquete: "SAL YODADA FLUORURADA" y la palabra **yodada** se ilumina. Una flecha salta de la etiqueta al cuello de una silueta. Chip "¿adorno?" se tacha. |
| 1 | Tiroides | Ahí está tu tiroides, una glándula con forma de mariposa que atrapa el yodo de tu sangre. | `Lupa` en rayos X sobre el cuello: aparece la tiroides en forma de mariposa frente a la tráquea. Barra de escala esquemática "cm". Puntitos morados (yodo, I) viajan por un vaso sanguíneo y la glándula los "jala" hacia adentro. |
| 2 | Tiroxina | Con él arma la tiroxina, una hormona que lleva 4 átomos de yodo. | Fondo noche (micro): dentro de una célula de la tiroides se arma la molécula de tiroxina (T4) en esquema: dos anillos unidos por un oxígeno y 4 esferas moradas "I" que se encajan una por una con un "clic" (contador 1·2·3·4). Etiqueta "tiroxina (T4) · C₁₅H₁₁I₄NO₄". |
| 3 | Bocio | Si falta yodo, la hipófisis manda más señal, y la tiroides crece para atrapar más: eso es el bocio. | Regreso al cuello: arriba, en la base del cerebro, la hipófisis (bolita) lanza ondas "TSH ↑" hacia abajo; los puntos morados se acaban y la mariposa se infla poco a poco hasta abultar el cuello. Rótulo "bocio". |
| 4 | Embarazo | Y en el embarazo, según la OMS, el yodo es clave para el desarrollo del cerebro del bebé. | Silueta de una embarazada; `Lupa` sobre el vientre: un bebé con su cerebro dibujado en líneas que se encienden por zonas cuando le llegan puntitos morados. Chip "OMS". |
| 5 | Pregunta | ¿Y cómo supieron que el yodo lo prevenía? | **Re-gancho.** "?" gigante sobre el cuello con bocio; Robert grande pensativo. |
| 6 | Estudio | Entre 1917 y 1919, en Akron, Ohio, a miles de niñas de escuela les dieron yodo dos veces al año. | Tarjeta "1917–1919 · Marine y Kimball · Akron, Ohio" (`TarjetaEstudio`). Un salón de clase esquemático con filas de niñas (cuadrícula de figuritas); un calendario que pasa "primavera · otoño" y un frasquito de yoduro de sodio que reparte gotitas moradas. |
| 7 | Resultado | De las que tenían la tiroides normal, a más de 1 de cada 4 que no lo tomaron se les agrandó; de las que sí, a 2 de cada mil. | Dos columnas: "sin yodo" (≈ 1 de cada 4 figuritas se marca con cuello hinchado, barra "27.6 %") y "con yodo" (casi ninguna, barra "0.2 %"). Las barras crecen con efecto de conteo. |
| 8 | Mexico | En México la norma pide de 20 a 40 miligramos de yodo por kilo de sal, y la fluorurada trae flúor contra la caries. | Un kilo de sal en una báscula con su rango "20–40 mg de yodo / kg" (NOM-040-SSA1-1993). Junto, un diente con esmalte que brilla y la etiqueta "flúor → caries". Chip pequeño: "no se vende donde el agua ya trae más de 0.7 mg/L de flúor". |
| 9 | Dato | Lo curioso: casi dos terceras partes del peso de la tiroxina son puro yodo. | Regresa la molécula de tiroxina sobre una balanza: los 4 yodos morados en un platillo pesan más que todo el resto de la molécula en el otro; pastel "≈ 65 % yodo". |
| 10 | Cierre | Así que ese «yodada» en tu sal no es adorno: es química para tu cuello. | **Regreso al salero del inicio**, sobre el mismo plato: ahora la palabra "yodada" tiene una flecha a una tiroides en forma de mariposa, sana, y a la etiqueta "I → tiroxina". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave continua, sin golpe marcado, debajo de la voz. Efectos en el mismo cuadro: sal que cae (arenita), "clic" de cada átomo de yodo, latido sordo mientras la tiroides se infla, ondas de la hipófisis, timbre de escuela en la tarjeta del estudio, conteo de barras, "tin" del esmalte del diente, la balanza que se inclina.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena con `CUES`). Grande en «¿Y cómo supieron que el yodo lo prevenía?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.9 | 11_sorprendido | `gancho` | «Ese «yodada» en tu sal no es adorno» |
| 2 | 6.6 | 10.4 | 13_senalando_arriba | `izq-alto` | «Ahí está tu tiroides… atrapa el yodo» |
| 3 | 15.6 | 20.4 | 12_perfil_serio | `arriba-der` | «la tiroides crece…: eso es el bocio» |
| 4 | 26.3 | 29.5 | 07_pensativo_puno | `grande` | «¿Y cómo supieron que el yodo lo prevenía?» |
| 5 | 30.0 | 34.4 | 06_pensativo_menton | `izq-alto` | «en Akron, Ohio, a miles de niñas…» |
| 6 | 35.6 | 41.8 | 11_sorprendido | `arriba-der` | «de las que sí, a 2 de cada mil» |
| 7 | 43.0 | 48.7 | 13_senalando_arriba | `arriba-der` | «de 20 a 40 miligramos… flúor contra la caries» |
| 8 | 49.3 | 53.3 | 04_bajando_lentes | `izq-alto` | «casi dos terceras partes… son puro yodo» |
| 9 | 53.9 | 57.9 | 02_apuntando_camara | `arriba-der` | «es química para tu cuello» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 9 apariciones · ≈ 41 s en pantalla (+ cierre 3.5 s) · 7 poses distintas · nunca la misma dos veces seguidas. En «Embarazo» (20.8–26.2 s) no sale, para no tapar la lupa del bebé (hueco de 5.9 s).

## Fuentes (cada dato abierto en la fuente original el 29 oct 2026)

1. **La tiroides tiene forma de mariposa y está al frente del cuello; hace tiroxina (T4) y T3** — MedlinePlus en español (Biblioteca Nacional de Medicina de EE. UU., NIH), "Enfermedades de la tiroides", actualización 24 mayo 2024. https://medlineplus.gov/spanish/thyroiddiseases.html
   > "La tiroides es una glándula pequeña en forma de mariposa ubicada al frente del cuello."
2. **Atrapa el yodo; sin yodo crece para capturar más; el yodo es la causa más común de bocio** — MedlinePlus en español, Enciclopedia médica, "Bocio simple" (artículo 001178), revisión 25 ene 2026. https://medlineplus.gov/spanish/ency/article/001178.htm
   > "El cuerpo necesita yodo para producir la hormona tiroidea. Si usted no obtiene suficiente yodo en su dieta, la tiroides se agranda para tratar de capturar todo el yodo que pueda para poder producir la cantidad adecuada de hormona tiroidea." · "La deficiencia de yodo es la causa más común de un bocio."
3. **Mecanismo: la hipófisis sube la TSH y la tiroides se agranda (bocio); la tiroides "atrapa" yodo** — Lisco G., De Tullio A., Triggiani D. et al. "Iodine Deficiency and Iodine Prophylaxis: An Overview and Update." *Nutrients* 15(4):1004 (2023). PMID 36839362 · PMC9967346 · doi:10.3390/nu15041004.
   > "Iodine deficiency results in the inadequate production of T4. In response to decreased blood T4 levels, the pituitary gland increases TSH to restore the circulating levels of T4. When TSH is persistently elevated, it results in thyroid enlargement (hyperplasia) and multinodular goiter" · "TSH … stimulates iodine trapping and oxidation by thyrocytes"
4. **La tiroxina lleva 4 átomos de yodo (y la T3, 3); ≈ 65 % de su peso es yodo** — PubChem (NIH), Thyroxine, CID 5819: fórmula **C15H11I4NO4**, masa molecular **776.87** g/mol; Liothyronine (T3), CID 5920: **C15H12I3NO4**. Consultado vía PUG REST el 29 oct 2026. https://pubchem.ncbi.nlm.nih.gov/compound/5819
   > "MolecularFormula": "C15H11I4NO4", "MolecularWeight": "776.87"
   - Cálculo: 4 × 126.90 g/mol (masa atómica del yodo) = 507.6 g/mol → 507.6 / 776.87 = **65.3 %** ("casi dos terceras partes" = 66.7 %).
5. **OMS: el yodo es esencial para el desarrollo del cerebro del feto; toda la sal consumida debe ser yodada** — OMS, Fact sheet "Sodium reduction", 11 mayo 2026. https://www.who.int/news-room/fact-sheets/detail/salt-reduction
   > "All salt that is consumed should be iodized (fortified with iodine), which is essential for healthy brain development in the foetus and young child and optimizing mental function in general." · "(less than 5 g/day salt), or just under a teaspoon."
   - Y OMS, NLIS "Iodine deficiency": "Iodine is an essential trace element that is present in the thyroid hormones, thyroxine and triiodotyronine." · "Serious iodine deficiency during pregnancy can result in stillbirth, spontaneous abortion and congenital abnormalities such as cretinism" https://www.who.int/data/nutrition/nlis/info/iodine-deficiency
6. **Estudio: Akron, Ohio, 1917–1919; yodo dos veces al año; 27.6 % vs 0.2 %** — Marine D., Kimball O.P. "Prevention of simple goiter in man. Fourth paper." *Archives of Internal Medicine* 25(6):661–672 (1920). (PDF escaneado del archivo de JAMA Network, leído página por página.)
   > p. 661: "the data of the incidence of thyroid enlargements as determined by annual surveys of all new pupils in the Akron public schools" · "the fourth general examination made October 13-17, 1919, … observations extending over a period of thirty months."
   > p. 664: "The prophylactic treatment … consists of the administration of 2 gm. sodium iodid, given in 0.2 gm. doses daily, for ten consecutive school days, repeated each spring and autumn." · "Two thousand, three hundred and five pupils are included in the tabulation of those not taking treatment, and 2,190 in the tabulation of those taking treatment." · "Of those that were normal at the first examination and did not take iodin, 347, or 27.6 per cent, have enlarged thyroids, while of those that were normal at the first examination and took iodin as outlined, two, or 0.2 per cent, have enlarged thyroids."
   > p. 665: una alumna "had taken 2 gm of sodium iodid during each of the five possible periods, May, 1917, November, 1917, May, 1918, December, 1918 and May, 1919" (de ahí "entre 1917 y 1919"). Las alumnas eran niñas de 5.º a 12.º grado ("Fifth grade pupils average from 10 to 11 years of age").
   - Contexto (revisión): Leung A.M., Braverman L.E., Pearce E.N. "History of U.S. Iodine Fortification and Supplementation." *Nutrients* 4(11):1740–1746 (2012). PMID 23201844 · PMC3509517: "David Marine, a U.S. physician in Ohio, and his colleagues initiated an iodine prophylaxis program in over 2100 schoolgirls in 1917."
7. **México: 30 ± 10 mg/kg de ion yodo (de 20 a 40); fluorurada con 250 ± 50 mg/kg de flúor, contra la caries; no se vende donde el agua tiene más de 0.7 mg/L de flúor** — NOM-040-SSA1-1993, "Bienes y servicios. Sal yodada y sal yodada fluorurada. Especificaciones sanitarias", Secretaría de Salud, DOF 13 mar 1995 (vigente; texto en https://platiica.economia.gob.mx/normalizacion/wp-content/uploads/sites/2/PDF_Normas_Publicas/040-ssa1.pdf y DOF https://sidof.segob.gob.mx/notas/docFuente/4870719).
   > "6.2 La sal yodada debe contener 30 ± 10 mg/kg de ion yodo; pudiendo utilizar para tal fin yodato o yoduro de potasio o de sodio." · "6.3 La sal yodada fluorurada debe contener la cantidad de ion yodo como se indica en 6.2 y de 250 ± 50 mg/kg de ion flúor" · "La protección específica masiva de la caries dental se realiza mediante la adición de fluoruro a la sal de consumo humano como única vía sistémica." · "ESTE PRODUCTO NO DEBE SER COMERCIALIZADO EN POBLACIONES, EN DONDE EL CONTENIDO DE FLUOR EN AGUA DE CONSUMO HUMANO ES MAYOR DE 0,7 MILIGRAMOS POR LITRO".
8. **(Solo descripción) Michigan 1924 y Suiza 1922** — Leung et al. 2012 (arriba): "In the U.S., iodized salt first became available on grocery shelves in Michigan on 1 May 1924, spurred largely by the series of reports by Cowie, Marine, and others in the preceding few years." · Lisco et al. 2023 (arriba): "Iodine prophylaxis programs in Europe began … such as Switzerland (1922)". (No va en la voz; si se usa en la descripción, decirlo como dato de revisión.)

## Notas
- El dibujo es esquemático (la tiroides, la hipófisis, las moléculas, los puntitos de yodo y el cerebro del bebé).
- En el estudio de Akron no se usó sal: se dio **yoduro de sodio** (2 g repartidos en 10 días escolares, cada primavera y otoño). En pantalla dice "yodo"; en la descripción se aclara. El 27.6 % y el 0.2 % son de las alumnas con tiroides normal al inicio (906 + 2 que lo tomaron; 910 + 347 que no). El artículo compara a las que tomaron yodo con las que no; es un estudio de hace más de 100 años, no un ensayo moderno.
- Ese trabajo y otros (Cowie en Michigan) empujaron la sal yodada en EE. UU. (Michigan, 1 mayo 1924, según Leung et al. 2012); Suiza empezó en 1922. Va en la descripción, no en la voz.
- "De 20 a 40 miligramos" = 30 ± 10 mg/kg de ion yodo de la NOM-040. La sal yodada fluorurada lleva además 250 ± 50 mg/kg de ion flúor y por ley no se vende donde el agua ya trae más de 0.7 mg/L de flúor (va en un chip y en la descripción).
- No decir que hay que comer más sal: la OMS pide menos de 5 g al día (poco menos de una cucharadita) y que la sal sea yodada. Va en la descripción.
- El yodo de más también puede dar problemas de tiroides (Lisco et al. 2023: "chronic overexposure may increase the risk of subclinical hypothyroidism and possibly goiter due to persistent TSH overstimulation"): nada de tomar yodo por tu cuenta; eso, en la descripción.
- "Casi dos terceras partes" es un cálculo propio con la fórmula de PubChem (65.3 %).
