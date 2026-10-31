# Shot Químico #56 · Ese merengue no es solo azúcar (la espuma de proteínas de la clara)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #56 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el merengue en la cuchara → la orilla de una burbuja con proteínas que se desdoblan → el mismo merengue, ahora con su red dibujada) + N5 "El experimento" (las dos claras de Iowa 2009: limpia vs. con una pizca de yema).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Ese merengue no es solo azúcar: es aire atrapado por proteínas de la clara."
- **Distinto de** el #53 (huevo en vinagre: cascarón y ósmosis) y el #09 (espuma del agua oxigenada: catalasa): aquí el tema es una espuma física estabilizada por proteínas que se desdoblan en la orilla de las burbujas, y por qué la grasa de la yema la arruina.
- **Seguridad:** no se invita a comer clara cruda; el merengue sale del horno. Nada peligroso.
- **Duración:** voz 953 caracteres / ≈ 190 palabras (≈ 58.0 s) + cierre 3.5 s → **≈ 61.5 s** (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`, con correcciones aplicadas), animación lista (`merengue.jsx`, base sin voz 61.5 s), voz pendiente de aprobación de Robert (~953 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese merengue no es solo azúcar: es aire atrapado por proteínas de la clara. | Fondo rosa. Desde el cuadro 0 una cuchara jala un pico de merengue blanco que se dobla y queda parado. Chip "¿solo azúcar?" que se tacha; la cámara empieza a acercarse al pico y aparecen burbujitas dibujadas dentro. Barra de escala "1 cm · esquemático". |
| 1 | Clara | La clara es 88 por ciento agua; la mitad de sus proteínas es ovalbúmina, hecha bolita. | Un huevo se parte; la clara cae a un tazón. Medidor de barra que se llena "agua 88 %". Zoom: puntitos azules (agua) y bolitas enrolladas como estambre; la mitad de ellas se pintan de dorado con la etiqueta "ovalbúmina". |
| 2 | Batir | Al batir metes aire y las proteínas se pegan al borde de cada burbuja. | Entra un batidor de globo girando; brotan burbujas en la clara. Fondo noche (micro): una burbuja grande; las bolitas viajan hacia su borde y se pegan. Barra de escala con la etiqueta "esquemático" (sin número). |
| 3 | Desdoblar | Ahí se desdoblan: la parte que odia el agua apunta al aire y la otra, al agua. | Acercamiento al borde: cada bolita se abre como un listón; su mitad naranja (etiqueta "odia el agua") gira hacia el aire de la burbuja y la mitad azul ("ama el agua") se queda afuera, en el agua. |
| 4 | Red | Luego se enganchan y forman una piel elástica en cada burbuja. | Los listones se tocan y se unen con ganchitos; la burbuja queda envuelta en una malla. Una burbuja se aprieta y rebota sin reventar ("piel elástica"). |
| 5 | Azucar | El azúcar la vuelve mucho más estable y el horno, firme: eso es el merengue. | Cristales de azúcar caen y se disuelven en el agua entre burbujas; un medidor "estabilidad" sube. Corte con movimiento: charola al horno, el merengue se dora apenas y queda firme. |
| 6 | Pregunta | ¿Y por qué una pizca de yema lo arruina? | **Re-gancho.** Una gotita amarilla cae al tazón de clara: "plop". "?" gigante. |
| 7 | Estudio | En 2009, en la Universidad Estatal de Iowa, con cero punto cero veintidós por ciento de yema la clara hizo menos espuma. | Tarjeta "2009 · Wang y Wang · Iowa State University, EUA". Dos probetas lado a lado: "limpia" con espuma alta y "+ yema" (gotita amarilla) con espuma más baja (esquemáticas, sin cifras de volumen); número grande "0.022 %" con "de yema en la clara". |
| 8 | Grasa | La culpable es su grasa: según ellos, se pega a la parte de las proteínas que odia el agua y no las deja unirse. | Fondo noche: gotitas de grasa amarillas se pegan a las mitades naranjas de los listones; los ganchitos se sueltan, la malla se rompe y la burbuja se escapa ("pop"). |
| 9 | Garbanzo | Y ojo: el agua de cocer garbanzos también hace espuma; en Irán, un merengue con la mitad de la clara cambiada por esa agua salió igual de bueno que el normal. | Olla con garbanzos; se cuela el agua a un tazón y el batidor la vuelve espuma blanca. Tarjeta "2025 · Universidad de Jahrom, Irán"; dos merengues ("normal" y "½ clara → agua de garbanzo") con las MISMAS estrellitas y el chip "sin diferencia en la cata". Nadie "gana". |
| 10 | Cierre | Ese merengue no es solo azúcar: es aire en una red de proteínas desdobladas. | **Regreso al pico de merengue del inicio**, ahora con una "ventana" de rayos X (`Lupa`) que muestra las burbujas envueltas en su malla de proteínas. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua; efectos en el mismo cuadro (cuchara que jala el pico, crac del huevo, zumbido del batidor, "blup" de burbujas, estirón de los listones al desdoblarse, "clic" de los ganchitos, lluvia de azúcar, "ding" del horno, "plop" de la gota de yema, golpe de la tarjeta, "pop" de la burbuja que se rompe, hervor de la olla).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y por qué una pizca de yema lo arruina?» y en el dato del agua de garbanzo.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «es aire atrapado por proteínas de la clara» |
| 2 | 5.6 | 9.5 | 13_senalando_arriba | `arriba-der` | «88 por ciento… ovalbúmina» |
| 3 | 14.7 | 18.6 | 06_pensativo_menton | `izq-alto` | «se desdoblan: la parte que odia el agua…» |
| 4 | 23.2 | 27.3 | 05_sonriendo_dientes_uniformes | `arriba-der` | «eso es el merengue» |
| 5 | 27.6 | 30.9 | 07_pensativo_puno | `grande` | «¿Y por qué una pizca de yema lo arruina?» |
| 6 | 33.1 | 37.0 | 10_serio_molesto | `izq-alto` | «la clara hizo menos espuma» |
| 7 | 38.3 | 43.7 | 04_bajando_lentes | `arriba-der` | «según ellos… no las deja unirse» |
| 8 | 44.3 | 47.6 | 11_sorprendido | `grande-izq` | «el agua de cocer garbanzos también hace espuma» |
| 9 | 53.6 | 57.9 | 02_apuntando_camara | `arriba-der` | «aire en una red de proteínas desdobladas» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 9 apariciones · ≈ 36.6 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato se abrió en la fuente original el 29 oct 2026)

1. **La clara: ~88 % agua; la ovalbúmina es la mitad de sus proteínas** — Réhault-Godbert S., Guyot N., Nys Y. "The Golden Egg: Nutritional Value, Bioactivities, and Emerging Benefits for Human Health." *Nutrients* 11(3):684 (2019). PMID 30909449 · PMC6470839 · DOI 10.3390/nu11030684.
   > "The egg white is a gel-like structure that lacks lipids and is composed mainly of water (about 88%)" · "the very abundant ovalbumin accounts for 50% of the total egg-white proteins."
2. **La ovalbúmina es una proteína globular ("hecha bolita")** — Alleoni A.C.C. "Albumen protein and functional properties of gelation and foaming." *Scientia Agricola* 63(3):291–298 (2006). SciELO.
   > "Ovalbumin is a monomer, globular phospoglycoprotein with molecular weight of 44.5 kDa"
   Complemento sobre espumas: Martin A.H., Grolle K., Bos M.A., Cohen Stuart M.A., van Vliet T. "Network forming properties of various proteins adsorbed at the air/water interface in relation to foam stability." *J Colloid Interface Sci* 254(1):175–83 (2002). PMID 12702439 · DOI 10.1006/jcis.2002.8592.
   > "Proteins were chosen with a range of structures from flexible to rigid/globular: beta-casein, beta-lactoglobulin, ovalbumin, and (soy) glycinin." · "It seems that adsorption and unfolding rate are most important for foam formation."
3. **Al batir, las proteínas se pegan a la orilla de las burbujas, se desdoblan (la parte que odia el agua hacia el aire) y forman una película elástica** — Lomakina K., Míková K. "A Study of the Factors Affecting the Foaming Properties of Egg White – a Review." *Czech J. Food Sci.* 24(3):110–118 (2006). Institute of Chemical Technology Prague. https://www.agriculturejournals.cz/publicFiles/50280.pdf
   > "Such properties are determined by the ability to rapidly adsorb on the air-liquid interface during whipping or bubbling, and by its ability to form a cohesive viscoelastic film by way of intermolecular interactions" · "The hydrophilic groups are arranged towards the water phase and the hydrophobic groups towards the air phase. During the whipping process air comes into the solution to form bubbles, the hydrophobic regions facilitate the adsorption at the interface, a process that is followed by partial unfolding (surface denaturation)." · "These partially unfolded molecules then associate to form a stabilising film around the bubbles, which is essential for the stability of the foam."
4. **El azúcar hace mucho más estable la espuma de clara** — Berry T.K., Yang X., Foegeding E.A. "Foams prepared from whey protein isolate and egg white protein: 2. Changes associated with angel food cake functionality." *J Food Sci* 74(5):E269–77 (2009). North Carolina State Univ. PMID 19646042 · DOI 10.1111/j.1750-3841.2009.01178.x.
   > "Incorporation of 12.8 (w/v) sucrose increased EWP foam stability (drainage 1/2 life)" · "These results show that sucrose greatly improved the stability of wet EWP foams"
5. **El merengue es la espuma de clara fijada con calor, con mucha azúcar** — McGee H.J., Long S.R., Briggs W.R. "Why whip egg whites in copper bowls?" *Nature* 308:667–668 (abril 1984). DOI 10.1038/308667a0.
   > "in the heat-annealed form known as meringues they support or crown various sucrose-rich mixtures"
6. **Estudio: 2009, Iowa State; 0.022 % de yema bajó la espuma; la culpable es la grasa (lípidos neutros)** — Wang G., Wang T. "Effects of yolk contamination, shearing, and heating on foaming properties of fresh egg white." *J Food Sci* 74(2):C147–56 (2009). Dept. of Food Science and Human Nutrition, Iowa State Univ., Ames, IA, EUA. PMID 19323729 · DOI 10.1111/j.1750-3841.2009.01054.x.
   > "A concentration as low as 0.022% (as-is basis) of yolk contamination caused significant reductions in foaming capacity and foaming speed. The neutral lipid fraction of egg yolk caused the major detrimental effect on foaming, and phospholipids fraction did not give significant foaming reduction at a concentration as high as 0.1%."
7. **Cómo la grasa lo arruina (explicación de los propios investigadores; por eso la voz dice "según ellos"): se pega a la parte no polar ("que odia el agua") de las proteínas y les impide unirse** — Wang T. "Effect of Yolk Contamination, Shearing, and Heating on Foaming Properties of Egg White." Informe final al American Egg Board, Iowa State University (21 sep 2009). https://worldeggorganisation.com/app/uploads/2010/12/Effect-of-Yolk-Contamination-Shearing-and-Heating-on-Foaming-Properties-of-Egg-White_1.pdf
   > "neutral lipid had more significant effect on foaming reduction than the polar lipid, and it does so by interacting with the non-polar portion of the proteins, preventing the hydrophobic interaction among the protein molecules, which is the main mechanism of forming visco-elastic film with good strength and stability."
8. **Agua de cocer garbanzos (aquafaba) en merengue; Irán; cambiar la mitad de la clara por aquafaba dio un merengue igual de bien calificado (sin diferencias significativas)** — Kargar Z., Hematian Sourki A. "Microwave-assisted extraction enhances Aquafaba functionality: A high value-added egg white replacer in vegan meringue production." *Food Chem X* 25:102176 (enero 2025). Dept. of Food Science and Technology, Jahrom University, Jahrom, Irán. PMID 39897973 · PMC11786856 · DOI 10.1016/j.fochx.2025.102176.
   > "Aquafaba, the water obtained from cooking legumes" · "approximately 100 g of soaked chickpea seeds were mixed with 300 mL of distilled water … and were cooked at 120 °C in a pressure cooker (autoclave) for 20 min." · "Substituting egg whites with aquafaba affected batter properties and meringue characteristics, but sensory evaluation showed no significant differences. Meringue with 50 % aquafaba substitution had the highest quality score"

## Notas
- El dibujo es esquemático: las proteínas como bolitas de estambre que se abren en listones, los "ganchitos" de la malla y las gotitas de grasa. En la realidad el desdoblamiento es parcial ("partial unfolding").
- "La parte que odia el agua" = parte hidrofóbica/no polar; "la que la ama" = hidrofílica. En la descripción se dan los nombres técnicos.
- La espuma no la hace la ovalbúmina sola: la revisión de 2006 dice que la clara funciona bien porque es una mezcla de proteínas ("each of them alone has little or no foaming capacity"), y en Martin et al. 2002 la ovalbúmina pura casi no hizo espuma en sus condiciones. Por eso la voz dice "las proteínas" en el mecanismo y no "la ovalbúmina".
- El 0.022 % de Iowa es en peso tal cual ("as-is basis"); en la descripción se puede decir "poco más de 2 partes de yema por cada 10 mil de clara". La voz dice "menos espuma" (y el estudio dice que también más lenta); no se exagera con "nada de espuma".
- La grasa culpable son los lípidos neutros (triglicéridos); los fosfolípidos de la yema casi no afectaron hasta 0.1 %. Matiz para la descripción.
- El aquafaba del estudio iraní se hizo cociendo garbanzos remojados a presión (no de lata); la calificación es de un panel sensorial que no encontró diferencias significativas entre merengues, y el de 50 % tuvo el puntaje de calidad más alto.
- El azúcar estabiliza la espuma, pero según la revisión de 2006 (citando a Hanning, 1945) retrasa que se forme. No va en la voz; si se usa en la descripción, abrir antes la fuente original.
- La explicación de la grasa es la del equipo de Iowa (informe al American Egg Board); la revisión de 2006 propone además un complejo de un componente de la yema con la ovomucina. Va en la descripción.
- En el merengue iraní se sustituyó la mitad de la clara (50 %) por aquafaba; el de 50 % tuvo el puntaje más alto, pero sin diferencia significativa con el control, por eso la voz dice "igual de bueno". Su aquafaba se extrajo cociendo garbanzos a presión (y con microondas en la versión mejorada).
- Las barras de escala del zoom son esquemáticas (no hay fuente del tamaño de burbuja).
- Lo del tazón de cobre (McGee 1984) se dejó fuera de la voz porque el mecanismo propuesto es una hipótesis que se ha discutido después.
