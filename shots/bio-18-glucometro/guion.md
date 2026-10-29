# Shot Biotecnológico #18 · El glucómetro por dentro

- **Serie:** Shot Biotecnológico · **Numeración:** #18 · **Tema del logo:** bioquímica (ADN + matraz).
- **Formato:** N1 "Por dentro" (el dedo y la gota → con la `Lupa`, la tira al microscopio con enzimas y electrones → la pantalla con el número) con un toque de N5 (la escena del electrodo de Clark, 1962).
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre el glucómetro que se ve en pantalla: «Ese aparatito no mide tu sangre: mide los electrones que suelta una enzima».
- **Duración:** 61.5 s (voz ~58 s + cierre 3.5 s). Solo narrado (revisión sin voz la hace GitHub).
- **Viaje:** macro (tu dedo, la gota y el glucómetro sobre fondo rosa) → micro (dentro de la tira, fondo azul noche: enzimas, glucosa, electrones, mediador, electrodo) → macro (el mismo glucómetro, ahora con el número en la pantalla).

## Versión narrada (958 caracteres, ~169 palabras, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese aparatito no mide tu sangre: mide los electrones que suelta una enzima. | Fondo rosa. **Desde el cuadro 0** la pantalla del glucómetro parpadea "- - -" y una chispita sale de la tira. `MitoTachado` "¿mide tu sangre?". |
| 1 | Gota | Te picas el dedo y pones la gota en la tira. | La lanceta toca la yema del dedo, brota una gota roja y la tira la toca: la gota entra a la punta. |
| 2 | Enzima | Ahí espera una enzima, la glucosa oxidasa, que casi siempre sale de un hongo. | `Lupa` "POR DENTRO · LA TIRA" sobre la punta: capa de enzimas (dímeros con su FAD amarillo). A un lado, el moho negro *Aspergillus niger* (conidióforos con cabezas redondas de esporas negras). Etiqueta "glucosa oxidasa". |
| 3 | Prima | Otras tiras usan otra enzima, la glucosa deshidrogenasa. | Chip "o glucosa deshidrogenasa" y una segunda enzima de otro color entra al lado. |
| 4 | Electrones | La enzima atrapa el azúcar de tu sangre y le quita dos electrones. | Fondo azul noche. Hexágonos de glucosa llegan del plasma (glóbulos rojos al fondo); la enzima abraza uno y salen dos chispitas "e⁻". |
| 5 | Mediador | Una molécula mensajera, el mediador, se los lleva hasta un electrodo. | Bolitas mensajeras (mediador) toman los e⁻ y nadan hasta la franja metálica del electrodo, abajo. |
| 6 | Pregunta | ¿Y cómo se vuelve número un montón de electrones? | **Re-gancho.** Cientos de chispitas corren por el electrodo. Barra de `Escala`. |
| 7 | Corriente | Fluyen como una corriente diminuta: más azúcar, más corriente. | Sale la Lupa: la tira con un cable de luz hacia el aparato; `Medidor` de corriente que sube al llegar más glucosa. |
| 8 | Numero | El aparato mide esa corriente y la vuelve miligramos por decilitro. | La pantalla cuenta y se detiene en un número de ejemplo con "mg/dL". |
| 9 | Clark | En 1962, en Alabama, Leland Clark atrapó esa enzima sobre un electrodo: el primer biosensor de enzima. | Fondo amarillo. `TarjetaEstudio` "1962 · Birmingham, Alabama · Clark y Lyons": un electrodo de oxígeno con una membrana y la capa de enzima atrapada. |
| 10 | Mexico | En México, 17 de cada 100 adultos tienen diabetes tipo 2, y casi uno de cada tres no lo sabe. | Fondo menta. Cuadrícula de 100 siluetas: 17 se pintan; de esas, 5 con un signo "?". Chip "Ensanut 2021–2024". |
| 11 | Abejas | Lo curioso: las abejas ponen su propia glucosa oxidasa en la miel, donde hace agua oxigenada contra bacterias. | Una abeja deja una gotita en un panal; burbujitas "H₂O₂" y una bacteria que se encoge. |
| 12 | Cierre | Así que ese número no es tu sangre: son los electrones que soltó una enzima. | **Regreso al glucómetro del inicio**, ahora con el número en pantalla y una chispita de electrones en la tira. |
| — | Outro | (sin voz) | `CierreMarca tema="bioquimica"` con Robert. |

El número de la pantalla es un **ejemplo** (no se dice en la voz ni se presenta como valor normal o anormal).

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Cama grave continua**, sin golpe marcado, siempre debajo de la voz.
- **Efectos en el mismo cuadro:** clic de la lanceta y "plic" de la gota; un tintineo suave por cada glucosa que la enzima atrapa; un chasquido eléctrico por cada par de electrones; zumbido creciente de la corriente (sube con el `Medidor`); pitido del glucómetro al dar el número; barrido al abrir y cerrar la `Lupa`; zumbido de abeja y burbujitas en la miel.
- **Datos hechos sonido:** cada chispita que pasa al electrodo es una nota de un pulso (dos notas por glucosa = dos electrones).

## Descripción (para publicar)
"Ese aparatito no mide tu sangre: mide los electrones que suelta una enzima. 🩸⚡

Cuando pones la gota en la tira, ahí espera una enzima: la **glucosa oxidasa**, que la industria saca casi siempre de un hongo, *Aspergillus niger* (otras tiras usan **glucosa deshidrogenasa**). La enzima toma la glucosa de tu sangre y le quita electrones. Una molécula mensajera, el **mediador**, se los lleva al electrodo de la tira. Esos electrones forman una corriente diminuta, proporcional a la cantidad de glucosa, y el aparato la convierte en miligramos por decilitro.

La idea es de **1962**: Leland Clark y Champ Lyons, en Birmingham, Alabama, atraparon glucosa oxidasa en una membrana sobre un electrodo de oxígeno. Fue el primer biosensor de enzima.

En México, según la Ensanut 2021–2024, el **17.0 %** de los adultos tiene diabetes tipo 2, y 5.4 de esos 17 puntos son personas que no lo sabían (casi una de cada tres).

Dato curioso: las abejas producen su propia glucosa oxidasa y la ponen en la miel; ahí genera agua oxigenada, sobre todo cuando la miel se diluye, y eso ayuda a frenar bacterias.

El dibujo es esquemático. **¿Tú o alguien en tu casa usa glucómetro? 👇**"

## Fuentes
- **Glucosa oxidasa, mediadores y corriente:** Yoo EH, Lee SY, "Glucose Biosensors: An Overview of Use in Clinical Practice", *Sensors* 10(5): 4558–4576, **2010**. https://pmc.ncbi.nlm.nih.gov/articles/PMC3292132/
  - «GOx is the standard enzyme for biosensors» · «GOx catalyzes the oxidation of β-D-glucose by molecular oxygen producing gluconic acid and hydrogen peroxide» (la enzima pasa de FAD a FADH2: dos electrones).
  - Mediadores: «redox mediators that were able to carry electrons from the enzyme to the surface of the working electrode».
  - Corriente: «this electron flow is proportional to the number of glucose molecules present in blood».
  - Otras enzimas en tiras: «GDH-PQQ, GDH-NAD, GDH-FAD, or GOx along with a redox mediator».
  - Clark: «first proposed in 1962 by Clark and Lyons» (la revisión dice "Children's Hospital of Cincinnati", pero Clark se mudó a Cincinnati en 1968; en 1962 estaba en Birmingham, ver abajo).
- **Artículo original:** Clark LC, Lyons C, "Electrode systems for continuous monitoring in cardiovascular surgery", *Annals of the New York Academy of Sciences* 102: 29–45, **1962**. DOI 10.1111/j.1749-6632.1962.tb13623.x (PMID 14021529). La dirección del artículo no aparece en PubMed ni en Crossref: "Alabama" se apoya en dónde trabajaba Clark (ADLM: Birmingham, 1958–1968; Champ Lyons era jefe de Cirugía allá).
- **Dónde estaba Clark en 1962:** ADLM (American Association for Clinical Chemistry), Hall of Fame, "Leland Charles Clark Jr, PhD": «The burgeoning field of biosensors began with Dr. Clark's paper on the enzyme electrode», presentado en la New York Academy of Sciences en 1962; profesor en Birmingham de 1958 a 1968; «Before moving to Cincinnati in 1968». https://myadlm.org/community/merit-awards/hall-of-fame/bios/l-to-s/leland-clark
- **De dónde sale la enzima:** Dubey MK et al., "Improvement Strategies, Cost Effective Production, and Potential Applications of Fungal Glucose Oxidase (GOD): Current Updates", *Frontiers in Microbiology* 8: 1032, **2017**: «Aspergillus niger is the most ordinarily used for the industrial yield of GOD»; «GOD is widely employed in the monitoring of diabetic patients to measure their blood glucose activities». https://pmc.ncbi.nlm.nih.gov/articles/PMC5468390/
  - Y Bauer JA, Zámocká M, Majtán J, Bauerová-Hlinková V (*Biomolecules* 12(3), **2022**), "Glucose Oxidase, an Enzyme 'Ferrari'…": «The current main industrial producers of glucose oxidase are Aspergillus and Penicillium»; «Today, GOx is extensively used in the most common methods for measuring blood glucose levels»; «a bound flavin adenine dinucleotide (FAD) co-factor is used to oxidize glucose». https://pmc.ncbi.nlm.nih.gov/articles/PMC8946809/
- **Diabetes en México:** Reyes-García A, Basto-Abreu A et al., "Prevalencia de diabetes y control glucémico en México, Ensanut 2021-2024", *Salud Pública de México* 67(6): 622–632, **2025** (datos 2021–2024, adultos de 20 años o más). DOI 10.21149/17286: «La prevalencia nacional de DT2 fue de 17.0%; 11.6% con diagnóstico previo y 5.4% no diagnosticada». (5.4/17.0 = 32 % → "casi uno de cada tres"). https://doi.org/10.21149/17286
- **Abejas y miel:** Bucekova M et al., "Honeybee glucose oxidase—its expression in honeybee workers and comparative analyses of its content and H2O2-mediated antibacterial activity in natural honeys", *Naturwissenschaften* 101(8): 661–670, **2014**: la GOX se produce solo en las glándulas hipofaríngeas de las obreras; «GOX is a regular honey component»; su contenido se correlaciona con el H₂O₂ de la miel y su actividad antibacteriana. https://pubmed.ncbi.nlm.nih.gov/24969731/ · Bauer et al. 2022: «GOx is a regular but quantitatively variable compound in natural honey».
- El dibujo de la tira, la enzima, el mediador y el electrodo es **esquemático** y no está a escala.
