# Auditoría de verdad · 15 shots viejos (29 oct 2026)

Repo: `/home/user/lacreaciondelrobert-shots`, rama `main` (actualizada con `git pull`). No se editó nada.
Se leyó, por shot: `narracion.json` (y `voz/narracion.json` donde existe), el `.jsx` principal (chips, tarjetas, números, subtítulos),
`guion.md`, `publicacion.md` y `verificacion.md`. Las fuentes se abrieron de verdad (Europe PMC fullTextXML, FAO, NASA NSSDC,
everycrsreport, PDF del crucero de la vaquita, etc.). `nasa.gov` y `en.wikipedia.org` directos no resuelven en esta sesión;
se usó la API de Europe PMC, los mirrors y el buscador para esos casos y se dice cuando algo quedó sin confirmar.

**Resultado: 9 OK · 6 con PROBLEMA** (ninguno es un dato inventado; 1 es un error de atribución científica real,
los otros 5 son imprecisiones o afirmaciones más fuertes que la fuente).

Nota general (no es un problema de verdad, pero conviene): `bio-03-crispr` y `amb-04-barrenador` tienen
`"voz_aprobada": true` en `narracion.json` aunque su propia `nota` dice que el texto cambió y la voz espera
nueva aprobación. Como Robert va a regenerar todas las voces, no afecta la auditoría.

---

## 003-semillas-luna — PROBLEMA (menor, solo pantalla)

**Frase exacta:** contador `vuelta {n} / 34` con la etiqueta **«Roosa, solo»**, que corre de la vuelta 12 a la 34.
**Dónde:** `shots/003-semillas-luna/luna-narrado.jsx`, línea 160 (`klerp(12, 34, …)`), línea 180 (texto `vuelta … / 34`)
y línea 181 (`texto="Roosa, solo"`).
**Qué está mal:** Roosa estuvo solo desde el desacoplamiento (vuelta 12) hasta que la etapa de ascenso del Antares
volvió a acoplarse, **no hasta la vuelta 34**. Con las horas oficiales: desacoplamiento el 5 feb 1971 a las 04:50:43 UTC
y acoplamiento el 6 feb a las 20:35:52 UTC, son ~39.7 h solo; con órbitas lunares de ~2 h, el reencuentro cae
alrededor de la vuelta 31–32. La vuelta 34 es la de la inyección trans-Tierra, ya con los tres a bordo.
Las 34 vueltas de la **semilla** sí son correctas (iba en el Kitty Hawk todo el tiempo): el gancho, la voz y el cierre están bien.
**Corrección propuesta (listo para pegar):** cambiar la etiqueta de la línea 181 por
`texto="Roosa, solo (de la vuelta 12 a la 32)"` y cerrar el contador en 32:
`const vuelta = Math.round(klerp(12, 32, kprog(T, a + 0.6, b - 0.4, kEase.suave)));`
dejando el rótulo de abajo como `vuelta {vuelta} / 34` (la semilla sí dio 34).
**Fuente:** NASA NSSDC, D. R. Williams, *The "Moon Trees"* (abierta el 29 oct 2026):
«Packed in small containers in Roosa's personal kit were hundreds of tree seeds» · «the seed bags burst open during
the decontamination procedures… exposed to vacuum, and it was thought they might not be viable» (dato de 1971).
Wikipedia, *Apollo 14* (texto de la ficha, abierto vía mirror): «undocking_date = February 5, 1971, 04:50:43 UTC»;
«docking_date = February 6, 1971, 20:35:52 UTC»; «A trans-earth injection burn took place on February 6 at 8:39:04 pm…
during Kitty Hawk's **34th lunar revolution**» (1971).

Todo lo demás de este shot se confirmó abriendo NASA NSSDC: exbombero forestal («a former U.S. Forest Service smoke jumper»),
cinco especies («loblolly pine, sycamore, sweetgum, redwood, and Douglas fir»), «reportedly in 40 different states… no list was
ever kept», «after over forty years there is no discernable difference», y la línea 8 ya corregida («Temieron que ya no germinaran»).
⚠️ Ojo: la voz guardada en `voz/narracion.json` todavía dice «Creyeron que estaban muertas» (la frase ❌ exagerada); como Robert
va a regenerar la voz, basta con no reutilizar ese MP3.

---

## amb-04-barrenador — OK

Reabiertas las fuentes: FAO (Novy, *World Animal Review*, 1991) dice textual «If unabated, the process continues until the animal
dies within **five to ten days**»; «all warm-blooded animals including livestock, wildlife, pets, zoo animals and occasionally humans»;
«The female screwworm fly generally mates once in a lifetime»; «Within less than six months from the initiation of the experiment,
screwworms were eradicated from the island of **Curaçao, in 1954**»; «Sterile flies were packaged in boxes… dispersed… from
single-engine planes» (1991). El 1966 de EE. UU. está en PMC12591281: «eradicated screwworm from Florida by 1959 and from the
entire United States **by 1966**» (2025). La planta de Metapa: inaugurada el **27 de junio de 2026** con meta de **100 millones de
moscas por semana** (notas de prensa del 27–28 jun 2026, incluida Expansión Política). El shot dice «en junio de 2026» y
«meta de cien millones por semana»: correcto. Chiapas, 21 nov 2024 (SENASICA): correcto.
Detalle de rigor aceptable: la voz dice «se aparea una sola vez en la vida» y la FAO dice «generally mates once»; la literatura
reciente (PMC13524348) sí afirma «females in this species mate only once», así que queda ✅.

---

## amb-08-vaquita — PROBLEMA (menor, voz + pantalla + redes)

**Frase exacta (voz, línea 8):** «En 2025, casi todas estaban donde pusieron bloques de concreto con ganchos que atrapan las redes.»
**Dónde:** `shots/amb-08-vaquita/narracion.json` línea 8; subtítulo idx 8 en `shots/amb-08-vaquita/vaquita.jsx` línea 160
(«En 2025: *casi todas junto a los bloques.*»); `publicacion.md` («En 2025 casi siempre estuvieron en la zona protegida…»,
«En 2025, casi todas estaban donde pusieron bloques…»).
**Qué está mal:** el informe da **80 %** de los avistamientos dentro del área con bloques y **20 % fuera**. «Casi todas» /
«casi siempre» suena a ~95 % y estira el dato; el informe habla de «la mayor parte de su tiempo», no de casi todas.
**Corrección propuesta (voz):** «En 2025, ocho de cada diez avistamientos fueron donde pusieron bloques de concreto con ganchos
que atrapan las redes.»
**Subtítulo:** `texto="En 2025: *8 de cada 10 junto a los bloques.*"`
**En publicacion.md:** «En 2025, el 80 % de los avistamientos fue dentro del área protegida por los bloques con ganchos.»
**Fuente (abierta el 29 oct 2026, PDF completo):** Informe del Crucero de Observación Vaquita Marina 2025 (IUCN-SSC CSG, feb 2026):
«Los avistamientos (puntos morados y estrellas moradas para madres y crías confirmadas) se ubicaron en un **80 % dentro del AE
más la ZTA y en un 20 % fuera** del área protegida por los bloques con ganchos» · «la investigación de 2025 confirma que las
vaquitas pasan la mayor parte de su tiempo dentro de esta pequeña área protegida» (dato de 2025).

Lo demás se confirmó en el mismo PDF: «Hubo una probabilidad del 67 % de que el número total de individuos distintos observados
en 2025 estuviera entre **7 y 10**»; «entre el 2 y el 28 de **septiembre de 2025**»; «93 encuentros acústicos… en 24 de los 66 sitios»;
«se observaron al menos una o dos crías. La madre de una de ellas es conocida como **Frida**; tiene la aleta dorsal doblada»;
«no hay razón para creer que las vaquitas no podrían recuperarse si se elimina la mortalidad en redes agalleras» (2025).

---

## bio-03-crispr — PROBLEMA (atribución científica, voz + subtítulo + redes)

**Frase exacta (voz, línea 9):** «En 2012, Charpentier y Doudna reprogramaron **esas tijeras** para cortar el ADN que quisieran. Nobel 2020.»
**Dónde:** `shots/bio-03-crispr/narracion.json` línea 9; subtítulo idx 9 en `shots/bio-03-crispr/crispr-narrado.jsx` línea 139
(«Tijeras para *cortar el ADN que quisieran.*», que hereda el sentido de la voz); `guion.md` línea 23; `publicacion.md` líneas 12, 40, 68, 84.
**Qué está mal:** «esas tijeras» son, en el relato, las de la bacteria del yogur (*Streptococcus thermophilus*). La Cas9 que Jinek,
Charpentier y Doudna reprogramaron en 2012 es la de ***Streptococcus pyogenes*** (bacteria de garganta), no la del yogur. El registro
del artículo lo confirma en sus descriptores. Quien demostró ese mismo año la Cas9 **de *S. thermophilus*** programable fue el grupo de
Šikšnys (Gasiūnas et al., PNAS 2012), que no son Charpentier ni Doudna. El gancho y el cierre («las inventó lo que hay en tu yogur»)
siguen siendo defendibles —el sistema CRISPR-Cas se demostró en la bacteria del yogur—, pero la línea 9 afirma algo falso tal como está.
**Corrección propuesta (voz, línea 9, lista para pegar):**
«En 2012, Charpentier y Doudna tomaron unas tijeras así, de otra bacteria, y las reprogramaron para cortar el ADN que quisieran. Nobel 2020.»
**Subtítulo idx 9:** `texto="Las reprogramaron: *cortan el ADN que quieras.*"`
**En publicacion.md** (los cuatro lugares): «En 2012, Charpentier y Doudna mostraron que la Cas9 de otra bacteria (*Streptococcus pyogenes*)
se puede programar para cortar el ADN que uno elija: Nobel de Química 2020. Ese mismo año, el grupo de Šikšnys lo mostró con la Cas9 de la
bacteria del yogur.»
**Fuente:** Jinek M., Chylinski K., Fonfara I., Hauer M., Doudna J. A., Charpentier E., *Science* 337: 816–821 (2012) — registro abierto en
Europe PMC el 29 oct 2026, descriptor principal «**Streptococcus pyogenes** (enzymology)» (2012). Gasiūnas G., Barrangou R., Horvath P.,
Šikšnys V., *PNAS* 109: E2579 (2012): «the Cas9–crRNA complex of the ***Streptococcus thermophilus*** CRISPR3/Cas system introduces in vitro
a double-strand break at a specific site in DNA containing a sequence complementary to crRNA» (2012).

Lo demás de este shot se confirmó: Pourcel et al., *NAR* 48: D535 (PMC7145573): «CRISPR–Cas systems were found in **36 % of Bacteria and
75 % of Archaea** strains» (2020) — la pantalla ya dice «(genomas, 2020)», correcto; Horvath et al. 2008: «homology and identity to phage
sequences (**77 %**)», que respalda «casi todos son de virus»; Barrangou et al. 2007 (Danisco + U. Laval) ✅.

---

## bio-07-polio — PROBLEMA (menor, cifra/afirmación sin año, voz + subtítulo + redes)

**Frase exacta (voz, línea 11):** «Y hoy las grandes empresas que venden ADN revisan qué pides y quién eres.»
**Dónde:** `shots/bio-07-polio/narracion.json` línea 11; subtítulo idx 11 en `shots/bio-07-polio/polio.jsx` línea 287
(«Hoy se revisa *qué pides y quién eres.*»); `publicacion.md` (misma frase en las descripciones).
**Qué está mal:** la única fuente que trae `verificacion.md` para esa frase es una nota de *Genetic Engineering & Biotechnology News*
de **noviembre de 2009** sobre el consorcio de síntesis de genes. Decir «hoy» con un dato de hace 17 años va contra la regla de Robert
(«si es de hace más de 2 años, lo dice»), y además el cribado es **voluntario** y de las empresas del consorcio, no de todas.
**Corrección propuesta (voz, línea 11):**
«Y desde 2009, las empresas que fabrican la mayor parte del ADN por encargo revisan por su cuenta qué pides y quién eres.»
**Subtítulo idx 11:** `texto="Desde 2009: *revisan qué pides y quién eres.*"`
**Fuente:** *Genetic Engineering & Biotechnology News*, 18 nov 2009: «By screening the sequences of synthetic gene orders and the customers
who place them, the firms aim to support government efforts to prevent the misuse of gene-synthesis technology» · «produce **80 %** of all
synthesized genes» (2009).

Todo lo demás se confirmó abriendo el informe del Servicio de Investigación del Congreso (CRS RS21369, everycrsreport.com, 29 oct 2026):
«Polio is one of the smallest of all viruses with a genome of only **about 7,500 bases**»; «The complete genetic sequence of poliovirus has been
known since 1981»; «the scientists ordered **over one hundred DNA snippets at a cost of about $100,000**»; «mice infected with this virus
developed polio and became **paralyzed**»; «To make a synthetic human pathogen is **irresponsible**» (Venter) — todos de 2002.

---

## cie-03-adn-viral — PROBLEMA (menor, solo pantalla)

**Frase exacta (subtítulo idx 0):** «1 de cada 12 ***no es humano: es virus.***»
**Dónde:** `shots/cie-03-adn-viral/adn-viral.jsx`, línea 196.
**Qué está mal:** la voz dice, con cuidado, «casi uno de cada doce no es humano: **vino de** virus», y las redes dicen «vino de virus».
El subtítulo lo endurece a «**es** virus»: esos tramos son restos de retrovirus, **casi todos rotos** (lo dice el propio shot en la línea 4),
forman parte del genoma humano y no son virus. La propia `verificacion.md` ya marcaba el matiz como nota de estilo; en pantalla queda como afirmación.
**Corrección propuesta:** `<Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="1 de cada 12 *vino de un virus.*" />`
**Fuente:** Lyu, Harding et al., *Structural Insights into Endogenous Retroviruses: Evolution and Co-Opted Functions*, *Viruses* (PMC13709493),
abierta el 29 oct 2026: «It is estimated that human endogenous retroviruses (HERVs) constitute **approximately 8 %** of the human genome»;
«Ancient infections of the germline resulted in the integration of viral sequences into host chromosomes, where they are inherited» (2026).

Lo demás ✅: la rejilla son 600 cuadritos con 48 rosas = 8 % exacto (líneas 93–94 del jsx); Dupressoir et al., *PNAS* 106: 12127 (PMC2715540,
registro abierto el 29 oct 2026): «homozygous **syncytin-A null** mouse embryos **die in utero between 11.5 and 13.5 days of gestation**» ·
«fusion of trophoblast cells into a… multinucleated syncytiotrophoblast layer, through which most of the maternofetal exchanges take place» ·
«independently acquired by the human (syncytin-1 and syncytin-2) and mouse (syncytin-A and syncytin-B) genomes» (2009).

---

## cie-07-esponja — PROBLEMA (menor, atribución del dato, voz + subtítulo)

**Frase exacta (voz, línea 7):** «Y en **ellas** había más *Moraxella osloensis*, famosa por dejar oliendo feo la ropa lavada.»
**Dónde:** `shots/cie-07-esponja/narracion.json` línea 7; subtítulo idx 7 en `shots/cie-07-esponja/esponja.jsx` línea 153
(«Más *Moraxella:* ropa que huele feo.»), encadenado al subtítulo idx 6 («De 4: las limpiadas *no tenían menos.*»).
**Qué está mal:** «ellas» remite a las **cuatro** esponjas de la comparación al microscopio (1b, 9b sin limpiar; 3b, 10b limpiadas).
El hallazgo de más *Moraxella* no viene de esas cuatro: viene del **análisis de ADN de las 14 esponjas**, comparando las que sus dueños
decían limpiar seguido contra las demás. Tal como está, el dato se le cuelga al experimento equivocado.
**Corrección propuesta (voz, línea 7):** «Y en el ADN de todas, las que se limpiaban seguido traían más *Moraxella osloensis*, famosa por
dejar oliendo feo la ropa lavada.»
**Subtítulo idx 7:** `texto="En su ADN: más *Moraxella* (ropa que huele feo)."`
**Fuente (texto completo abierto el 29 oct 2026):** Cardinale et al., *Scientific Reports* 7: 5791 (PMC5517580): «Two of the ten dominant OTUs,
closely related to the RG2-species *Chryseobacterium hominis* and ***Moraxella osloensis*, showed significantly greater proportions in regularly
sanitized sponges**» (del análisis por pirosecuenciación de las 14 esponjas) · «For the quantitative assessment… **four sponge samples** with
different metadata were selected: 1b and 9b (not regularly sanitized), 3b and 10b (regularly sanitized)» · «*Moraxella osloensis* is also known
for generating malodor in laundry» (2017).

Lo demás ✅ y textual en la misma fuente: «Image analysis showed local densities of **up to 5.4 × 10¹⁰ cells per cm³**»; «**362 bacterial OTUs**
remained»; «**Fourteen used kitchen sponges**… collected in autumn 2012 from private households in the greater area of Villingen-Schwenningen
(Baden-Württemberg, **Germany**)»; «regularly sanitized… sponges did not show significantly reduced bacterial numbers (Mann–Whitney U-Test,
**p = 0.78**)»; «**Presumably**, resistant bacteria survive the sanitation process and rapidly re-colonize the released niches»; «we rather suggest
a regular… **replacement** of kitchen sponges, for example, on a **weekly basis**» (2017).

---

## fes-02-pan-de-muerto — PROBLEMA (voz + subtítulo + redes)

**Frase exacta (voz, línea 6):** «Muy poquito: en el horno se evapora buena parte, y el calor mata a las levaduras.»
**Dónde:** `shots/fes-02-pan-de-muerto/narracion.json` línea 6; subtítulo idx 6 en `shots/fes-02-pan-de-muerto/pan.jsx` línea 282
(«Muy poquito: *se evapora.*»); `guion.md` línea 19; `publicacion.md` líneas 11, 25, 68, 84 («queda muy poquito», «buena parte del alcohol se va»).
**Qué está mal:** es justo el pan **dulce** el que trae más etanol en la única fuente que se cita. Gorgus et al. midieron
«pan blanco de leche» (el análogo del pan de muerto) con **más de 1.2 g de etanol por cada 100 g**, frente a 0.14 g en un bolillo de trigo.
1.2 g/100 g no es «muy poquito» sin decir de qué se habla, y además nadie midió pan de muerto: «se evapora buena parte» no está en ninguna
fuente abierta del shot (la cita de Innograin solo dice que a partir de 50 °C mueren las levaduras). La frase da una falsa seguridad y no trae
la cifra ni el año, contra la regla de los números.
**Corrección propuesta (voz, línea 6):** «Queda algo, pero poco: en panes dulces como este se ha medido más o menos un gramo de alcohol por
cada cien, y el calor del horno mata a las levaduras.»
**Subtítulo idx 6:** `texto="Queda poco: *~1 g por 100 g.*"`
**En publicacion.md:** «¿Entonces el pan de muerto tiene alcohol? Poco: en panes dulces de supermercado se midieron más de 1.2 g de etanol
por cada 100 g (Alemania, 2016), y en un bolillo de trigo 0.14 g. El calor del horno mata a las levaduras. Nadie ha medido el pan de muerto.»
**Fuente (texto completo abierto el 29 oct 2026):** Gorgus, E., Hittinger, M., Schrenk, D., *Estimates of Ethanol Exposure in Children from Food
not Labeled as Alcohol-Containing*, *J. Anal. Toxicol.* 40: 537–542 (PMC5421578): «certain packed bakery products such as burger rolls or
**sweet milk rolls contained more than 1.2 g ethanol/100 g**» · tabla: «Wheat rolls **0.14 ± 0.01**; Burger rolls, American style **1.28 ± 0.08**» (2016).

Lo demás ✅: Goffeau et al., *Science* 274: 546 (1996), «an international effort involving **some 600 scientists** in Europe, North America, and
Japan» y «the first complete genome sequence of a eukaryote», «**Life with 6000 genes**»; GENCODE (2026): «Protein-coding genes **19442**»;
Kachroo et al., *Science* 348: 921 (2015): «Nearly half (**47 %**) of the yeast genes could be successfully humanized».

---

## fes-06-calaveritas — OK

Reabiertas las fuentes: la solubilidad («en agua hirviendo se disuelve más del doble que en agua fría») cuadra con los datos de manual que el
propio shot rotula como tales: **204 g de sacarosa por 100 mL a 20 °C** y **487 g a 100 °C** (2.4×), y la pantalla dice «por cada 100 mL de agua ·
datos de manual» (línea 365 de `calaveritas.jsx`), así que la cifra dice de qué es y de dónde viene. Marggraf, 1747, Berlín: confirmado en fuentes
de referencia («He identified the sugar beet's dried, crystallized juice as identical with cane sugar by the use of a microscope», Britannica;
EBSCO Research Starters, «Marggraf Extracts Sugar from Beets», 1747, «Berlin, Prussia»). El «espumado» (se bate para que cristalice) quedó bien
corregido y es lo que dice México Desconocido: «batida rápidamente para que logre cristalizar». La frase ❌ de los grumos (receta de *fudge*)
ya no está en la voz, ni en la pantalla, ni en `publicacion.md`: lo verifiqué buscándola en los tres.

---

## fun-04-metales-pesados — OK

La corrección peligrosa («el hongo no es veneno») **sí** se aplicó en los tres lugares: voz línea 10 («no crea el metal: es un espejo del suelo»),
subtítulo idx 10 (`metales.jsx` línea 194) y redes. Cifras reabiertas: Falandysz y Drewnowska, *ESPR* 24: 13352 (PMC5434161, 29 oct 2026):
«Blanching of fresh sliced *C. cibarius* caused leaching of Hg by **approximately 15 %**» · «Mercury was better extracted by boiling water from the
fresh caps of *A. fulva* (**56 ± 2 %**…)» · «loss of up to **35 %**… for sliced, deep-frozen fruit bodies» (2017). Chiocchetti et al., *Food Chemistry* 306:
125478 (registro abierto): «the bioaccessibility of As (63–81 %) was higher than the values obtained for the **metals (<40 %)**» · «Cooking significantly
reduced the levels of As (26–72 %), whereas the reduction in levels of Hg, Cd, and Pb was much lower» · «Hg levels in *Amanita ponderosa*,
***Boletus edulis***… **exceeded the legislated limits**» (2020). Todo lo que dice la voz coincide, con sus matices («en algunas zonas», «suelen»,
«se estudia para limpiar suelos», «el agua se tira»).

---

## fun-08-pie-atleta — OK

Las tres correcciones del verificador anterior están aplicadas en el texto final: «**sobre todo** Trichophyton» (voz 1 y subtítulo idx 1),
«**Para prevenirlo**» con el chip «¿ya lo tienes? antimicótico; si no mejora, al médico» (`pie.jsx` líneas 148–150) y el cierre en condicional
(«**puede** no ser solo humedad: **puede** ser un hongo»). Cifras: Sasagawa (2019, *J. Dermatol.* 46: 940), **420 pacientes** de la clínica de Osaka
con datos de 2011–2014, humedad promedio de **80 %** en el cuarto espacio interdigital de **10 hombres** en verano, y **49.2 %** con hongos en pies o
uñas — y el shot lo dice como «en esa clínica», no como población general. Leung et al. (2023) respalda queratina/enzimas, el cuarto-quinto dedo
como sitio más común y el contagio. La cifra del 3 % mundial ya se quitó.

---

## ia-03-siguiente-palabra — OK

**175 mil millones de parámetros · GPT-3 · 2020** y **128 mil tokens · Llama 3 · 2024** están en pantalla con su año
(`siguiente.jsx` líneas 126 y 128) y coinciden con las fichas oficiales. El gancho y el cierre ya están corregidos al matiz de Anthropic (2025):
el modelo puede planear adelante, pero escribe pedacito por pedacito, y eso es lo que dice la voz («no sale de golpe: es una apuesta»).
El ejemplo «el cielo es… azul / verde» está rotulado «ejemplo ilustrativo» (línea 130) y las barras no llevan números.
«Escoge lo probable, no lo verdadero» se dice como propiedad del muestreo, no como cifra.

---

## ia-07-turing — OK

Todas las cifras se reabrieron en el artículo publicado (Jones y Bergen, *PNAS* 123(21): e2524472123, texto completo por Europe PMC
PMC13214042, 29 oct 2026): «GPT-4.5 was judged to be the human **73 %** of the time» (y el 27 % del humano es su complemento: «the average
interrogator accuracy is also the average human witness win rate, and is the complement of the AI win rate»); «specifically a young person who is
**introverted**, knowledgeable about internet culture, and uses **slang**»; «GPT-4.5-NO-PERSONA and LLAMA-NO-PERSONA had overall win rates of
**36 %** and 38 %»; «ELIZA… **23 %**»; «we analyzed **1,023 games**»; «Interrogators were most likely to be accurate when they said something
**strange**»; «Asking about the **weather**… tended to be the **least effective** strategies»; «**GPT-5** was judged to be human marginally more often
than chance (**59 %**)… confirming that both models pass the Turing test with the extended time limit» (chats de **15 min**); «could be used for social
engineering or to spread **misinformation**». La pantalla (73/27, 1 023 partidas, «GPT-5 con personaje: 59 %») coincide.

---

## qui-02-estriado — PROBLEMA (muy menor, voz)

**Frase exacta (voz, línea 9):** «Lo curioso: esa bacteria roja también **crece en las esquinas de tu regadera**.»
**Dónde:** `shots/qui-02-estriado/narracion.json` línea 9. (El subtítulo ya está corregido a «*puede crecer* en tu regadera»,
`estriado.jsx`, y las redes también dicen «puede crecer»: la voz es la única que quedó afirmándolo.)
**Qué está mal:** la fuente dice que *S. marcescens* **se encuentra comúnmente** en rincones húmedos de baños, no que esté en la regadera
de quien ve el video. La corrección de `verificacion.md` se aplicó a la pantalla y a las redes, pero no a la voz.
**Corrección propuesta (voz, línea 9):** «Lo curioso: esa bacteria roja también puede crecer en las esquinas de tu regadera.»
**Fuente (texto completo abierto el 29 oct 2026):** Sanders, E. R., *Aseptic Laboratory Techniques: Plating Methods*, *JoVE* 63: e3064 (PMC4846335):
«Due to its preference for damp environments, this microorganism is **commonly found growing in the corners of bathtubs, in sink basins, in tile grout,
and on shower curtains**» · «it produces a reddish pigment called **prodigiosin**» · «single colonies appearing in the fourth quadrant following
incubation at **30 °C for 24 hours**» · «Single colonies are comprised of **millions of cells**» · «**In theory**, all the cells in a colony are derived from a
single bacterium» (2012). Todo lo demás del shot (flamear entre zonas, no clavar el asa, no volver a la zona 1, «en teoría») es textual de ahí.

---

## qui-06-maillard — OK

Reabiertas las fuentes: El Hosry et al., *Foods* (PMC12154226): «**In 1912, Louis Camille Maillard, a French chemist**, discovered a browning
phenomenon when he heated a solution containing a sugar and an amino acid»; «**pyrazines** that are responsible for the **roasted**, nutty flavors»;
«**melanoidins**, which are high molecular weight, **brown-colored** compounds»; «Reaction acceleration is generally observed with increasing
temperature»; «reaction rate decreases under… extreme water activity values»; AGEs en albóndigas congeladas «at **−18 °C** over storage periods
ranging from **30 to 120 days**» (el contador dice «4 meses · −18 °C», dentro del rango) (2025). Mottram et al., *Nature* 419: 448 (2002, U. de Reading,
Inglaterra): «**asparagine**, a major amino acid in **potatoes and cereals**, is a crucial participant in the production of **acrylamide**» y la acrilamida
«classified as **probably carcinogenic** in humans». Las cuatro frases ⚠️ de la primera pasada (cientos de moléculas, secar la carne, «dora no quemes»,
caramelización) no aparecen en el texto final: lo verifiqué buscándolas en `narracion.json`, `maillard.jsx` y `publicacion.md`.

---

## Resumen

| Shot | Veredicto |
|---|---|
| 003-semillas-luna | PROBLEMA (menor, pantalla: contador «Roosa, solo» hasta la vuelta 34) |
| amb-04-barrenador | OK |
| amb-08-vaquita | PROBLEMA (menor: «casi todas» por el 80 %) |
| bio-03-crispr | **PROBLEMA (atribución: la Cas9 de 2012 es de *S. pyogenes*, no del yogur)** |
| bio-07-polio | PROBLEMA (menor: «hoy» con fuente de 2009, sin año) |
| cie-03-adn-viral | PROBLEMA (menor, pantalla: «no es humano: **es** virus») |
| cie-07-esponja | PROBLEMA (menor: el dato de *Moraxella* no es de las 4 esponjas) |
| fes-02-pan-de-muerto | **PROBLEMA («muy poquito» alcohol; el pan dulce es el que más trae)** |
| fes-06-calaveritas | OK |
| fun-04-metales-pesados | OK |
| fun-08-pie-atleta | OK |
| ia-03-siguiente-palabra | OK |
| ia-07-turing | OK |
| qui-02-estriado | PROBLEMA (muy menor: la voz afirma lo que la pantalla ya dice como «puede») |
| qui-06-maillard | OK |

Nota de proceso: `www.nasa.gov` y `en.wikipedia.org` no resuelven desde esta sesión (habría que permitirlos en la red de la sesión);
para Apolo 14 se usó NASA NSSDC (sí abre) más el texto de la ficha de Wikipedia vía mirror y el buscador. Nada quedó sin confirmar
por ese motivo, salvo la vuelta exacta del reencuentro del Antares, que se calculó con las horas oficiales de desacoplamiento y acoplamiento.
