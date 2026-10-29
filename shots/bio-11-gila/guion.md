# Shot Biotecnológico #11 · La saliva del lagarto que abrió el camino al Ozempic (monstruo de Gila y exendina-4)

- **Serie:** Shot Biotecnológico · **Numeración:** #11 · **Tema del logo:** bioquímica (ADN + matraz) · rama `pedido300/bio`.
- **Formato:** N1 "Por dentro" (el lagarto y la pluma → por dentro: el GLP-1, la tijera DPP-4 y el receptor → el mismo lagarto) + N5 "El experimento" (John Eng, VA del Bronx, 1992).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre el lagarto en pantalla: "Este lagarto no es solo venenoso: su saliva trajo la primera medicina tipo Ozempic."
- **Precisión obligatoria:** la semaglutida (Ozempic) **no** se hizo con la molécula del lagarto: es un análogo del GLP-1 **humano** (94 % de homología, aprobada en 2017). Lo que salió del lagarto es la **exendina-4 → exenatida (Byetta, FDA 2005)**, el primer agonista del receptor de GLP-1 aprobado. El guion lo dice así.
- **Duración:** voz 933 caracteres / 171 palabras (≈ 58 s) + cierre 3.5 s → **61.5 s**.
- **Viaje:** macro (el monstruo de Gila sobre la arena de Sonora, y una pluma de inyección) → micro (tu intestino suelta GLP-1; la DPP-4 lo corta; la exendina-4 entra a la cerradura) → macro (el mismo lagarto, ahora con la pluma a su lado y la etiqueta "el primero de la familia").

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este lagarto no es solo venenoso: su saliva trajo la primera medicina tipo Ozempic. | Fondo amarillo arena. **Desde el cuadro 0** el monstruo de Gila (*Heloderma suspectum*: cuerpo robusto, cola gruesa, piel de cuentas negras con bandas rosa-naranja) saca la lengua bífida; a su lado aparece una pluma de inyección genérica. `MitoTachado` "solo venenoso". |
| 1 | Lagarto | Es el monstruo de Gila, y también vive en México, en Sonora. | Mapa simple: EE. UU. (suroeste) y México con **Sonora** resaltado (y el norte de Sinaloa). Etiqueta "monstruo de Gila · *Heloderma suspectum*". `Escala` ~50 cm. |
| 2 | Hormona | Cuando comes, tu intestino suelta el GLP-1, una hormona que le pide insulina al páncreas. | Fondo menta: silueta de una persona comiendo; **Lupa** "POR DENTRO · INTESTINO": células L sueltan esferitas de GLP-1 que viajan al páncreas, que suelta insulina. Chip "GLP-1". |
| 3 | Tijera | Pero en unos dos minutos una enzima, la DPP-4, ya cortó la mitad. | Fondo oscuro (microscópico): cadenita de GLP-1; una tijera-enzima "DPP-4" corta las dos primeras perlas. `Medidor` de reloj: 0 → 2 min, "la mitad, cortada". |
| 4 | Pregunta | ¿Y si hubiera una versión que esa tijera no pudiera cortar? | **Re-gancho.** La tijera se abre y se cierra sobre un signo de interrogación. |
| 5 | Eng | En 1992, John Eng, en un hospital de Nueva York, la encontró en la saliva venenosa del lagarto: la exendina-4. | `TarjetaEstudio` "1992 · VA Medical Center, Bronx, Nueva York · John Eng": un tubito con saliva del lagarto y una cadena de **39 perlas** que se arma. |
| 6 | Cerradura | Se parece a tu GLP-1 y abre la misma cerradura en el páncreas. | Célula beta del páncreas con un receptor-cerradura; entran la llave GLP-1 y la llave exendina-4: las dos encajan y sale insulina. |
| 7 | Aminoacido | Pero cambia su segundo aminoácido, y la tijera casi no la puede cortar. | Acercamiento a las primeras perlas: GLP-1 "H·**A**·E…" vs exendina-4 "H·**G**·E…". La tijera DPP-4 resbala sobre la exendina-4. |
| 8 | Exenatida | Así nació la exenatida, aprobada en 2005: dura horas, no minutos. | `TarjetaEstudio` "2005 · FDA · Byetta (exenatida)". Barra comparativa: GLP-1 ≈ 2 min vs exenatida ≈ 2.4 h (vida media). |
| 9 | Fabrica | Y no se ordeñan lagartos: se fabrica en laboratorio. | Un lagarto con un "✗" sobre una cubeta de ordeña (chiste); al lado, un matraz donde se arma la cadena sintética de 39 aminoácidos. Chip "sintética". |
| 10 | Ozempic | Ojo: el Ozempic no sale del lagarto; es un GLP-1 humano retocado. | `MitoTachado` "Ozempic = saliva de lagarto". Cadena de GLP-1 humano con dos perlas cambiadas y una "colita" de grasa; etiqueta "semaglutida · 94 % igual al GLP-1 humano · 2017". |
| 11 | Comida | Y el lagarto come pocas veces, pero hasta un tercio de su peso. | El lagarto frente a un huevo enorme; `Medidor` "comida = hasta ⅓ de su peso". |
| 12 | Cierre | El primero de esa familia de medicinas no salió de una farmacia: salió de la saliva de un lagarto. | **Regreso a la imagen del inicio:** el mismo lagarto en la arena, ahora con la pluma y la etiqueta "el primero de la familia: exenatida". |
| — | Outro | (sin voz) | `CierreMarca tema="bioquimica"` con Robert. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Cama grave continua**, sin golpe marcado, siempre debajo de la voz; un poco más tensa durante "la tijera" (escenas 3–4) y se abre cuando la exendina-4 se libra de ella (escena 7).
- **Datos hechos sonido:** **39 notas = los 39 aminoácidos de la exendina-4** mientras se arma la cadena (escena 5 y escena 9).
- **Efectos en el mismo cuadro:** siseo de la lengua del lagarto (cuadro 0), clic de la pluma, "pop" por cada esferita de GLP-1 que sale, tijeretazo de la DPP-4, clic de llave en la cerradura, "resbalón" de la tijera sobre la exendina-4, sello de la FDA, golpe suave del huevo.

## Descripción (para publicar)
"Este lagarto no es solo venenoso: en su saliva estaba la primera medicina de la familia del Ozempic. 🦎💉

El **monstruo de Gila** (*Heloderma suspectum*) vive en el suroeste de Estados Unidos y en el noroeste de México (**Sonora** y el norte de Sinaloa).

Cuando comes, las células de tu intestino sueltan una hormona, el **GLP-1**, que le pide insulina al páncreas. El problema: la enzima **DPP-4** la corta tan rápido que su vida media en sangre es de unos **2 minutos**.

En **1992**, **John Eng**, en el hospital de veteranos (VA) del Bronx, Nueva York, aisló del veneno del lagarto —que sale con su saliva— un péptido de 39 aminoácidos: la **exendina-4**. Un año después se demostró que activa el mismo receptor que el GLP-1 en las células que hacen insulina. Su truco: en la segunda posición tiene **glicina** en vez de alanina, y la DPP-4 casi no la puede cortar.

De ahí salió la **exenatida (Byetta)**, aprobada por la FDA en **abril de 2005**: el primer medicamento de esta familia (agonistas del receptor de GLP-1). Su vida media es de **2.4 horas**, no de 2 minutos. Y no se ordeñan lagartos: la exenatida es un **péptido sintético**.

Ojo: **el Ozempic (semaglutida) no sale del lagarto.** Es un análogo del GLP-1 humano (94 % igual en su secuencia), aprobado en 2017, que dura alrededor de una semana. El lagarto abrió el camino.

Dato extra: el monstruo de Gila come pocas veces, pero cada comida puede pesar **hasta un tercio de su cuerpo**.

El dibujo es esquemático. **¿Sabías que una medicina podía empezar en un animal venenoso? ¿Qué otro animal crees que esconde una medicina? 👇**"

## Fuentes
- **Descubrimiento (1992):** Eng J, Kleinman WA, Singh L, Singh G, Raufman JP. "Isolation and characterization of exendin-4, an exendin-3 analogue, from *Heloderma suspectum* venom." *J Biol Chem* 267(11):7402–7405, 15 abr 1992. PMID 1313797. https://pubmed.ncbi.nlm.nih.gov/1313797/ — Afiliación: «Solomon A. Berson Research Laboratory, Veterans Affairs Medical Center, Bronx, New York». Frase: «was used to isolate a 39-amino acid peptide, exendin-4, from H. suspectum venom» (1992).
- **Actúa en el receptor del GLP-1 (1993):** Göke R, …, Eng J, Göke B. "Exendin-4 is a high potency agonist and truncated exendin-(9-39)-amide an antagonist at the glucagon-like peptide 1-(7-36)-amide receptor of insulin-secreting beta-cells." *J Biol Chem* 268(26):19650–19655, 1993. PMID 8396143. Frases: «exendin-4 … specifically interact with the GLP-1 receptor on insulinoma-derived cells»; «Exendin-4, like GLP-1, stimulated dose dependently the glucose-induced insulin secretion in isolated rat islets» (1993).
- **John Eng, VA del Bronx, 1992 / FDA 2005:** Golden Goose Award 2013, "Diabetes Medication" (publicado 2014). https://www.goldengooseaward.org/01awardees/diabetes-medication — «began his career as a practicing physician and researcher at the Veterans Administration (VA) Medical Center in the Bronx, New York»; exenatida «was approved by the Food and Drug Administration in 2005».
- **GLP-1: hormona del intestino que sale al comer y pide insulina; la DPP-4 la inactiva:** Holst JJ. "The physiology of glucagon-like peptide 1." *Physiol Rev* 87(4):1409–1439, 2007. PMID 17928588. Frases: «produced in the intestinal epithelial endocrine L-cells»; «GLP-1 is released in response to meal intake»; «extremely rapidly metabolized and inactivated by the enzyme dipeptidyl peptidase IV»; «The main actions of GLP-1 are to stimulate insulin secretion» (2007).
- **Vida media del GLP-1 ≈ 2 min y por qué la exendina-4 resiste:** "Battle of GLP-1 delivery technologies", *Adv Drug Deliv Rev* 130:113–130, 2018. https://pmc.ncbi.nlm.nih.gov/articles/PMC6843995/ — «its rapid degradation by DPP-4, which cleaves GLP-1 between the Ala8 and Glu9 amino acids»; «resulting in a half-life of only 2 minutes»; exendin-4 «is more resistant to cleavage by DPP-4 due to a Gly to Ala substitution»; «found in the saliva of Gila monster (a venomous lizard)» (2018). Apoyo: "Exenatide Use in the Management of Type 2 Diabetes Mellitus", *Pharmaceuticals* 2010, https://pmc.ncbi.nlm.nih.gov/articles/PMC4033938/ — «a half-life of 2.4 hours versus 2–3 minutes, respectively»; «isolated from the saliva of the Gila monster desert lizard» (2010). Y Front Endocrinol 2020, https://pmc.ncbi.nlm.nih.gov/articles/PMC7145895/ — «short plasma half-life (1–7 min)».
- **Exenatida: sintética, 39 aminoácidos, vida media 2.4 h:** etiqueta FDA de BYETTA (revisada oct 2009). https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021773s9s11s18s22s25lbl.pdf — «BYETTA (exenatide) is a synthetic peptide that was originally identified in the lizard Heloderma suspectum»; «Exenatide is a 39-amino acid peptide amide»; «the mean terminal half-life is 2.4 h» (2009).
- **Aprobación de Byetta:** Drugs@FDA, NDA 021773, aprobación original **04/28/2005**. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=021773
- **El primero de la familia:** "Exenatide extended-release: a once weekly treatment for patients with type 2 diabetes", *Diabetes Metab Syndr Obes* 2014. https://pmc.ncbi.nlm.nih.gov/articles/PMC4075952/ — «In 2005, the first GLP-1 RA, short-acting exenatide, which is resistant to inactivation by the enzyme DPP-4, was approved for the treatment of T2DM by the US Food and Drug Administration» (2014).
- **Ozempic (semaglutida) = análogo del GLP-1 humano:** EMA, Ozempic, información de producto (SmPC). https://www.ema.europa.eu/en/documents/product-information/ozempic-epar-product-information_en.pdf — «Human glucagon-like peptide-1 (GLP-1) analogue produced in Saccharomyces cerevisiae cells by recombinant DNA technology»; «Semaglutide is a GLP-1 analogue with 94% sequence homology to human GLP-1»; «a prolonged half-life of around 1 week»; «stabilised against degradation by the DPP-4 enzyme». Aprobación FDA: Drugs@FDA NDA 209637, **12/05/2017**. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=209637
- **Distribución (México: Sonora y Sinaloa):** The Reptile Database, *Heloderma suspectum*. https://reptile-database.reptarium.cz/species?genus=Heloderma&species=suspectum — «USA (SE California, S Nevada, SW Utah, Arizona, New Mexico), Mexico (Sonora, Sinaloa)».
- **Come pocas veces, hasta un tercio de su peso:** Christel CM, DeNardo DF, Secor SM. "Metabolic and digestive response to food ingestion in a binge-feeding lizard, the Gila monster (*Heloderma suspectum*)." *J Exp Biol* 210:3430–3439, 2007. PMID 17872997. Frase: «an active foraging lizard that feeds infrequently on meals weighing up to one-third of its body mass» (2007).
- El dibujo del lagarto, de las células, de la "tijera" y de la "cerradura" es **esquemático** y no está a escala entre sí.
