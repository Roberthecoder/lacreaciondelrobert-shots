# Shot Químico #16 · Ese ceviche no está cocido (el limón desdobla proteínas, pero no esteriliza)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #16 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (el tazón de ceviche en tu mesa → las proteínas del pescado y una larva en el jugo → el mismo tazón, con la "etiqueta" de lo que en verdad pasó) con un toque de N5 "El experimento" (Lima 2010, Split 2019).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" con espíritu de #6 mito peligroso: "Ese ceviche no está cocido: el limón solo le desdobló las proteínas, y lo que traía puede seguir vivo."
- **Seguridad:** no se invita a nada riesgoso; lo único práctico que se dice es la recomendación oficial de congelar (FDA). No es consejo médico.
- **Duración:** voz 958 caracteres / ≈ 170 palabras (≈ 58.2 s según `estimar-escenas.mjs`) + cierre 3.5 s → **≈ 61.7 s**.
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~959 créditos).

## Versión narrada

Tiempos estimados: Gancho 0–6.1 · Que 6.1–11.2 · Acido 11.2–16.7 · Blanco 16.7–21.4 · Fuego 21.4–26.1 · Pregunta 26.1–27.6 · Lima 27.6–34.5 · Croacia 34.5–41.4 · Francia 41.4–48.0 · Congelar 48.0–55.0 · Cierre 55.0–58.2 · Outro 58.2–61.7.

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese ceviche no está cocido: el limón solo le desdobló las proteínas, y lo que traía puede seguir vivo. | Fondo amarillo. Desde el cuadro 0 una mano exprime un limón (gotas que caen) sobre un tazón con cubos de pescado rosados translúcidos; en cámara rápida (chip chico "⏩ 15 min") los cubos se van volviendo blancos desde el primer segundo. Chip "¿cocido?" que se tacha. Barra de escala "1 cm". |
| 1 | Que | Las proteínas de la carne son cadenas largas, dobladas y enrolladas como estambre. | Cámara entra a un cubo (`Lupa` rayos X) → fondo noche: fibras de músculo y, dentro, cadenas de proteína como cordones largos enrollados (dos hebras trenzadas con cabecitas; etiqueta solo "proteína"). Escala "nm". |
| 2 | Acido | El ácido del limón les pega cargas eléctricas que se empujan entre sí, y el estambre se abre. | Llegan H⁺ (puntitos amarillos) y se pegan a la cadena; aparecen signos "+" que se repelen (flechitas) y el cordón se desenrolla. Chip "ácido → desnaturaliza". |
| 3 | Blanco | Ya abiertas, dispersan la luz: por eso la carne se pone blanca, como cocida. | Las cadenas abiertas se amontonan en grumitos en la superficie de la fibra; rayos de luz entran: sin grumos pasan derecho, en los grumitos rebotan en todas direcciones. Corte con fundido al cubo que se ve blanco opaco. |
| 4 | Fuego | Pero el fuego hace algo más: con calor suficiente mata bacterias y parásitos. | Pantalla dividida: a la izquierda un sartén con llama, el cubo blanco y bacterias/gusanito que se apagan (✗); a la derecha el limón con el mismo cubo blanco y un "?" |
| 5 | Pregunta | ¿Y el limón no mata? | **Re-gancho.** "?" gigante sobre el tazón; gotas de limón que caen. |
| 6 | Lima | En 2010, en Lima, Perú, le pusieron bacterias a pescado crudo e hicieron ceviche: a los 30 minutos casi no bajaron. | `TarjetaEstudio` "2010 · Lima, Perú · Herrera et al." Fondo noche: bacterias (bastoncitos de *Vibrio parahaemolyticus*, *E. coli*, *Aeromonas*) sobre el pescado; reloj que corre 0 → 10 → 30 min y un contador de colonias que casi no baja. |
| 7 | Croacia | Y en 2019, en Croacia, larvas de Anisakis, un gusanito del pescado, aguantaron unos 5 días metidas en jugo de limón. | `TarjetaEstudio` "2019 · Split, Croacia · Šimat y Trumbić". Un frasco de laboratorio con jugo de limón y una larva de *Anisakis* (blanca, larga, enrollada en espiral) que se mueve; calendario que pasa día 1 → 5. Escala "≈ 2 cm". |
| 8 | Francia | En 2025 reportaron en Francia a una señora a la que le sacaron 40 larvas tras comer ceviche casero de merluza. | Tarjeta "2025 · Francia · Robert et al."; contador que sube a "40" con larvitas que se acomodan en fila; ícono de endoscopio. Sin sangre ni imagen médica real. |
| 9 | Congelar | Por eso la FDA recomienda, para pescado crudo, congelarlo a 20 grados bajo cero por 7 días: así mueren los parásitos. | Congelador con termómetro que baja a "−20 °C" y calendario "7 días"; la larva se congela y se apaga. Chip "para parásitos". |
| 10 | Cierre | Así que tu ceviche no está cocido: está desdoblado. | **Regreso al tazón del inicio**: el mismo ceviche blanco, ahora con la etiqueta "proteínas desdobladas por ácido ≠ cocido". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert. |

**Música:** cama grave continua; efectos en el mismo cuadro (exprimir el limón, goteo, "pop" de cada H⁺, desenrollado, chisporroteo del sartén, tic-tac del reloj, golpe de la tarjeta, contador, crujido de hielo al congelar).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y el limón no mata?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «Ese ceviche no está cocido» |
| 2 | 7.1 | 10.8 | 06_pensativo_menton | `arriba-der` | «cadenas largas, dobladas y enrolladas» |
| 3 | 13.1 | 16.4 | 13_senalando_arriba | `izq-alto` | «y el estambre se abre» |
| 4 | 21.8 | 25.9 | 12_perfil_serio | `izq-alto` | «con calor suficiente mata bacterias y parásitos» |
| 5 | 26.2 | 27.7 | 07_pensativo_puno | `grande` | «¿Y el limón no mata?» |
| 6 | 30.2 | 34.2 | 04_bajando_lentes | `arriba-der` | «a los 30 minutos casi no bajaron» |
| 7 | 37.2 | 41.1 | 11_sorprendido | `izq-alto` | «aguantaron unos 5 días» |
| 8 | 44.0 | 47.7 | 10_serio_molesto | `arriba-der` | «le sacaron 40 larvas» |
| 9 | 51.2 | 54.7 | 13_senalando_arriba | `izq-alto` | «así mueren los parásitos» |
| 10 | 55.3 | 58.1 | 02_apuntando_camara | `arriba-der` | «está desdoblado» |
| — | 58.2 | 61.7 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 35.6 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **Acidez en el ceviche: textura parecida a la cocción; marinado de hasta 30 min** — Zakrzewski A.J., Chajęcka-Wierzchowska W., Zadernowska A. "Ceviche—Natural Preservative: Possibility of Microbiota Survival and Effect on *L. monocytogenes*." *Foods* 11(6):860 (2022). PMID 35327282 · PMC8950590 · doi:10.3390/foods11060860.
   > "Traditionally, it is made from raw fish meat that is marinated in citrus juices for up to 30 min to kill potential pathogens and give the meat a taste and texture similar to cooking."
   > (También: "for lime juice 97.26%" de células vivas; lima redujo poco a las bacterias probadas.)
2. **El ácido desdobla (desnaturaliza) la miosina del pescado por repulsión de cargas** — Kristinsson H.G., Hultin H.O. "Changes in conformation and subunit assembly of cod myosin at low and high pH and after subsequent refolding." *J Agric Food Chem* 51(24):7187–96 (2003). PMID 14611192 · doi:10.1021/jf026193m.
   > "Results suggest that on acid unfolding, the myosin rod may fully dissociate due to electrostatic repulsion within the coiled coil"
3. **El limón blanquea el pescado: proteínas desnaturalizadas que dispersan la luz** — Wang Y., Zhao C., Zhang J., Ying X. et al. "Citrus Juice Marination Improves the Flavor of Fish: A Case Study of Sea Bass (*Lateolabrax japonicus*)." *Foods* 15(4):635 (2026). PMID 41750827 · PMC12939022 · doi:10.3390/foods15040635.
   > "Lemon juice treatment produced the most noticeable whitening effect" · "acidic conditions can induce surface protein denaturation and enhance light scattering at the muscle fiber surface, thereby increasing L*" · "resulting in a visibly whiter and brighter appearance."
4. **El calor suficiente mata bacterias y parásitos; ceviche implicado en parásitos; congelar a −20 °C por 7 días** — U.S. FDA. *Fish and Fishery Products Hazards and Controls Guidance*, 4.ª ed., Cap. 5 "Parasites" (abril 2011). https://www.fda.gov/media/80777/download
   > "The process of heating raw fish sufficiently to kill bacterial pathogens is also sufficient to kill parasites."
   > "Some products that have been implicated in human parasite infection are the following: ceviche (fish and spices marinated in lime juice)"
   > "Freezing and storing at an ambient temperature of -4°F (-20°C) or below for 7 days (total time) … are sufficient to kill parasites. Note that these conditions may not be suitable for freezing particularly large fish (e.g., thicker than 6 inches)."
   > "Brining and pickling may reduce the parasite hazard in a fish, but they do not eliminate it"
5. **Lima, Perú, 2010: el ceviche casi no redujo bacterias en 30 min** — Herrera A., Espinosa B.J., Nuñez G., Espinoza N., Maves R.C., Martin G.J. "The effect of preparation of cebiche on the survival of enterotoxigenic *Escherichia coli*, *Aeromonas hydrophila*, and *Vibrio parahaemolyticus*." *J Travel Med* 17(6):395–9 (2010). PMID 21050320 · doi:10.1111/j.1708-8305.2010.00465.x. Afiliación: "United States Naval Medical Research Center Detachment, Lima, Peru."
   > "We inoculated raw fish with Aeromonas hydrophila, Vibrio parahaemolyticus, and enterotoxigenic Escherichia coli" · "A typical Peruvian cebiche recipe was used combining limes, onions, sweet potatoes, cilantro, and hot peppers marinated together for 30 minutes." · "Little reduction in bacterial counts was observed at either the 10- or 30-minute time periods, with counts increasing at 30 minutes." · "The putative bactericidal role of lime juice in the preparation process is not sufficient to reduce the microbial population present in cebiche."
6. **Croacia, 2019: larvas de *Anisakis* sobreviven ~5 días en jugo de limón** — Šimat V., Trumbić Ž. "Viability of *Anisakis* spp. Larvae After Direct Exposure to Different Processing Media and Non-Thermal Processing in Anchovy Fillets." *Fishes* 4(1):19 (2019). doi:10.3390/fishes4010019 (resumen abierto vía Crossref; afiliación vía OpenAlex: "University Department of Marine Studies, University of Split … Split, Croatia").
   > "In lemon juice and lemon juice with added acetic acid, the survival of larvae was around 5 days." · "traditional processing methods are not sufficient to kill Anisakis larvae."
7. **Francia, 2025: 40 larvas tras ceviche casero de merluza** — Robert M., Duflot M., Jeddi F. et al. "Hyperinfection with *Anisakis simplex sensu stricto*: observations from a cluster of two cases in France." *Food Waterborne Parasitol* 40:e00282 (2025). PMID 40937185 · PMC12421590 · doi:10.1016/j.fawpar.2025.e00282. (Nantes University Hospital, Nantes, Francia.)
   > "We report a case of a 70-year-old woman who developed gastrointestinal symptoms after consumption of home-made ceviche of hake. Forty larvae of Anisakidae were removed during digestive fibroscopy." · "The fish was bought at a local supermarket and prepared without pre-freezing."
8. **"Gusanito del pescado" (*Anisakis* es un nematodo de peces)** — FDA, misma guía (fuente 4): "the nematodes or roundworms (Anisakis spp., Pseudoterranova spp. …)".

## Notas
- El dibujo es esquemático (la proteína como cordón de estambre enrollado, los grumitos, los H⁺ como puntitos, la larva y las bacterias no están a escala entre sí).
- El estudio de Croacia es de laboratorio: las larvas se pusieron directo en jugo de limón; no es un ceviche real. La voz dice "metidas en jugo de limón".
- En Lima (2010) el pH del ceviche bajó solo a ≈ 5.0–5.4 (el pescado empezaba en 6.4): por eso el blanqueado es sobre todo en la superficie y el ácido no alcanza a esterilizar.
- El calor "suficiente" depende del pescado; la guía francesa citada en Robert et al. 2025 habla de al menos 60 °C por 1 min en el centro, o congelar 7 días en el congelador de casa (Anses 2017). La FDA advierte que −20 °C/7 días puede no bastar en pescados muy gruesos (> 15 cm). Congelar mata parásitos, no todas las bacterias: va en la descripción.
- La señora de Francia: otro familiar que comió lo mismo también se enfermó; la mayoría de los casos de anisakidosis se curan solos (dice el artículo). No se dice en la voz para no alarmar de más.
- La miosina estudiada por Kristinsson fue a pH 2.5 (en laboratorio); el mecanismo (repulsión de cargas al bajar el pH) es el mismo, pero el ceviche es menos ácido.
