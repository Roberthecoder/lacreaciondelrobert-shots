# Shot Químico #53 · Este huevo no está pelado (el vinagre, el cascarón y la ósmosis)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #53 · rama `pedido300/qui`.
- **Formato:** N5 "El experimento" (cronómetro de días: vinagre 0 → 48 h, luego jarabe y agua) + N1 "Por dentro" (huevo en el vaso → cristales de calcita y la membrana de fibras → el mismo huevo en el vaso, ya "desnudo").
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Este huevo no está pelado: es un huevo crudo al que el vinagre le disolvió el cascarón."
- **Distinto de** el #17 (anillo verde del huevo cocido) y del #20 (CO₂ del refresco): aquí el tema es la reacción ácido + carbonato del cascarón y la ósmosis a través de la membrana.
- **Seguridad:** experimento de casa con vinagre de cocina; la voz dice lavarse las manos si el huevo crudo se revienta. No se invita a comérselo.
- **Duración:** voz 955 caracteres / 179 palabras (≈ 58.1 s) + cierre 3.5 s → **≈ 61.6 s** (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`huevo-vinagre.jsx`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~955 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este huevo no está pelado: es un huevo crudo al que el vinagre le disolvió el cascarón. | Fondo amarillo. Desde el cuadro 0 una cuchara saca de un vaso de vinagre un huevo translúcido y blandito que se bambolea (se ve la yema adentro como sombra). Chip "¿pelado?" que se tacha. Cronómetro de días arriba en "48 h". |
| 1 | Cascaron | El 95 por ciento del cascarón es mineral: casi todo, carbonato de calcio. | Rebobinado: cronómetro a "0 h", huevo blanco normal entrando al vaso. Corte con `Lupa` al cascarón: pastel que se llena al 95 % "mineral" y debajo la fórmula grande CaCO₃ (calcita). Barra de escala "1 cm". |
| 2 | Burbujas | El ácido acético del vinagre lo convierte en acetato de calcio, agua y dióxido de carbono: esas burbujitas. | Fondo noche (microscópico): moléculas de CH₃COOH chocan con cristales de calcita; salen Ca(CH₃COO)₂ + H₂O + CO₂. Las CO₂ se juntan en burbujas que suben; regreso al vaso: el huevo se cubre de burbujitas y sube un poco. |
| 3 | Dias | En uno o dos días el cascarón desaparece, pero el ácido no rompe la membrana. | Time-lapse: cronómetro 0 → 24 → 48 h; el cascarón se adelgaza y se desprende en espuma; queda la bolsita blanca translúcida. Chip "24–48 h". |
| 4 | Membrana | Es una red de fibras de proteína más delgada que una décima de milímetro. | `Lupa` a la membrana: malla de fibras entrecruzadas (dos capas). Barra de escala "50–70 µm" junto a una regla "0.1 mm". |
| 5 | Pregunta | ¿Y por qué el huevo sale más grande que antes? | **Re-gancho.** Huevo desnudo junto a un huevo normal: el desnudo es un poco más grande; "?" gigante. |
| 6 | Osmosis | Porque esa membrana es semipermeable: el agua la cruza hacia donde hay más cosas disueltas. Eso es ósmosis. | Fondo noche: corte de la membrana; moléculas de agua (bolitas azules) la atraviesan hacia el lado con muchas partículas disueltas; flechas. Título "ÓSMOSIS". |
| 7 | Estudio | En 2026, en Japón, unos químicos le empujaron agua y partículas diminutas a la membrana, y estimaron poros de unos 100 a 200 nanómetros. | `TarjetaEstudio` "2026 · Hagiri y Suzuki · Gunma / Fukushima, Japón". Disco de membrana en un portafiltro con jeringa; agua que pasa y esferitas de varios tamaños (14 → 204 nm): las chicas pasan, las grandes se quedan. Medidor "≈100–200 nm". |
| 8 | Jarabe | Mételo en jarabe: el agua sale hacia el azúcar y se arruga. En agua, se vuelve a inflar. | Cronómetro +24 h: el huevo pasa al vaso de jarabe y se desinfla y arruga (capa de agua flotando arriba). Luego al vaso de agua (con colorante): se vuelve a inflar. Flechas de agua saliendo y entrando. |
| 9 | Rebote | Y si lo dejas caer de muy poquito, rebota. Si se revienta, lávate las manos. | El huevo cae desde 2–3 cm sobre la mesa y rebota con "boing"; chip "manos limpias 🧼" con un grifo. |
| 10 | Cierre | Así que este huevo no está pelado: el vinagre se comió el mineral y dejó la bolsita. | **Regreso a la imagen del inicio**: la mano con el huevo translúcido sobre el vaso, ahora con etiquetas "CaCO₃ → CO₂ 🫧" en el vaso y "membrana semipermeable" en el huevo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua; efectos en el mismo cuadro (huevo que se bambolea, "tic" del cronómetro de días, burbujeo constante, crujido suave del cascarón que se deshace, "glup" de moléculas de agua cruzando, golpe de la tarjeta del estudio, desinflado en el jarabe, "boing" del rebote, chorrito del grifo).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y por qué el huevo sale más grande que antes?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.9 | 11_sorprendido | `gancho` | «no está pelado… el vinagre le disolvió el cascarón» |
| 2 | 6.1 | 9.5 | 13_senalando_arriba | `izq-alto` | «el 95 por ciento… carbonato de calcio» (señala el pastel) |
| 3 | 11.3 | 15.9 | 06_pensativo_menton | `arriba-der` | «acetato de calcio, agua y dióxido de carbono» |
| 4 | 16.7 | 20.6 | 04_bajando_lentes | `arriba-der` | «el ácido no rompe la membrana» |
| 5 | 25.45 | 29.2 | 07_pensativo_puno | `grande` | «¿Y por qué el huevo sale más grande?» |
| 6 | 29.9 | 34.5 | 13_senalando_arriba | `izq-alto` | «el agua la cruza… ósmosis» |
| 7 | 38.4 | 42.6 | 11_sorprendido | `arriba-der` | «estimaron poros de unos 100 a 200 nanómetros» |
| 8 | 43.4 | 48.0 | 12_perfil_serio | `izq-alto` | «el agua sale… y se arruga» |
| 9 | 48.6 | 52.7 | 05_sonriendo_dientes_uniformes | `arriba-der` | «rebota» |
| 10 | 53.3 | 58.0 | 02_apuntando_camara | `arriba-der` | «el vinagre se comió el mineral» |
| — | 58.1 | 61.6 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 42.8 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato se abrió en la fuente original el 29 oct 2026)

1. **95 % del cascarón es mineral; casi todo es carbonato de calcio (calcita); pesa unos 5 g; tiene poros** — Gautron J., Stapane L., Le Roy N., Nys Y., Rodriguez-Navarro A.B., Hincke M.T. "Avian eggshell biomineralization: an update on its structure, mineralogy and protein tool kit." *BMC Mol Cell Biol* 22:11 (2021). PMID 33579194 · DOI 10.1186/s12860-021-00350-0 (texto completo en PMC).
   > "It contains 1.6% water, 3.3 to 3.5% organic matrix when eggshell membranes are included and 95% inorganic minerals. It is mainly made of calcium carbonate (98.4% of its mineral part)" · "The shell is made of calcium carbonate in the form of calcite" · "Numerous pores penetrate the eggshell"
2. **El ácido acético del vinagre reacciona con el carbonato de calcio: acetato de calcio, agua y CO₂; las burbujas son CO₂; 24 a 48 h; el ácido no daña la membrana de proteína; lavarse las manos** — Australian National University, College of Science, "Folding egg" (actividad de laboratorio para casa).
   https://science.anu.edu.au/engagement/science-lab-experiments-home-school/folding-egg
   > "White vinegar contains acetic acid (CH3COOH)." · "Eggshells are made of calcium carbonate (CaCO3)." · "they undergo a chemical reaction producing calcium acetate, water, and carbon dioxide gas (CO2)." · "Because acetic acid is a weak acid, it breaks down the mineral eggshell without damaging the strong protein bonds in the inner membrane." · "Leave the egg undisturbed in the vinegar for 24 to 48 hours." · "Always wash your hands thoroughly after handling raw eggs or the egg membrane."
3. **Burbujas de CO₂, membrana semipermeable, ósmosis, huevo más grande tras el vinagre, se arruga en jarabe y se infla en agua, rebote suave** — Imperial College London, STEM in Action, "Osmosis Activity" (PDF de divulgación).
   https://t4awstest.cc.ic.ac.uk/media/imperial-college/be-inspired/student-recruitment-and-outreach/public/stem-in-action/Osmosis-Instructions.pdf (página: imperial.ac.uk/be-inspired/schools-outreach/secondary-schools/stem-in-action/the-human-body/osmosis--activity/)
   > "the acetic acid in the vinegar is breaking down the calcium carbonate (chemical formula CaCO3) in the egg's shell. The bubbles that form on the shell are carbon dioxide" · "Osmosis is the diffusion of water molecules through a partially permeable membrane, where water diffuses from an area with a high-water molecule concentration, to an area with a lower concentration." · "the egg should now weigh a little more and look larger than it did with its shell." · "The water therefore flows through the egg's semi permeable membrane into the syrup, 'shrinking' or 'deflating' the egg." · "Water therefore flowed back into the egg" · "Tip – try gently bouncing the egg on the table!" · "leave for 24 or 48 hours"
4. **La membrana: barrera semipermeable de 50–70 µm, dos capas, red de fibras de proteína; estudio 2026 en Japón: agua a presión y partículas de 14 a 204 nm; poros de ~100–200 nm** — Hagiri M., Suzuki M. "Methodological estimation of pore size in hen eggshell membranes." *BMC Res Notes* 19(1):289 (2026). PMID 42152007 · PMC13352705 · DOI 10.1186/s13104-026-07862-y. Autores del Department of Chemistry and Materials Science, Gunma College, y del Department of Applied Chemistry and Biochemistry, Fukushima College (National Institute of Technology, Japón).
   > "The ESM form a semipermeable barrier 50–70 μm thick that adheres closely to the inner surface of the shell. They consist of two layers" · "The membranes are protein-rich … and they exhibit a meshwork of intertwined fibers." · "pressure-driven pure-water permeation was performed" · "size-selective filtration experiments were conducted using colloidal silica and polystyrene latex particles ranging from 14 to 204 nm" · "numerical outcomes suggested pore dimensions on the order of ~ 100–200 nm"

## Notas
- El dibujo es esquemático (moléculas, cristales, fibras y poros no están a escala entre sí).
- "95 por ciento mineral" es del cascarón completo (Gautron 2021); el carbonato de calcio es el 98.4 % de ese mineral (≈ 93 % del cascarón). Por eso la voz dice "casi todo".
- El estudio de 2026 trabajó con la membrana separada del cascarón con ácido clorhídrico, no con un huevo en vinagre; los autores aclaran que su objetivo era validar los métodos y que las cifras de poro son una estimación ("suggested"). La voz dice "estimaron poros de unos…".
- La ósmosis del huevo desnudo se explica de forma simplificada (como en el material de Imperial College): la membrana deja pasar el agua con facilidad y el agua va hacia el lado más concentrado. No se afirma qué moléculas exactas se quedan adentro.
- Es un huevo crudo: no es para comerse; se maneja con cuidado (se rompe fácil) y se lavan las manos (ANU). El vinagre se puede cambiar a las 24 h para mejores resultados (Imperial).
- Pregunta para comentarios (descripción): "¿Ya lo hiciste en la escuela? ¿Te rebotó o se te reventó?"
