# Shot Fungi Mati #127 · Ese olor a hongo no es tierra: es una molécula

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #127 · rama `claude/fun-125-129-colores`.
- **Formato:** N1 Por dentro (viaje champiñón entero → corte → células y moléculas en fondo oscuro → el mismo champiñón, ya rebanado y "oliendo").
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo que se ve en pantalla: «Ese olor a hongo no es olor a tierra: lo firma, sobre todo, una molécula de ocho carbonos.»
- **Duración (estimada):** voz 954 caracteres / 183 palabras (≈ 58.3 s con `estimar-escenas.mjs`) + cierre 3.5 s → **≈ 61.8 s** en la base.
- **Voz:** pendiente de aprobación de Robert (~950 créditos de ElevenLabs).
- **Estado:** verificado (1ª pasada, 5 ⚠️ corregidas; re-verificación de las líneas corregidas pendiente).
- **No repetir:** el olor a tierra mojada (geosmina) ya está en `qui-58-lluvia-olor`; aquí solo se contrasta en una frase. El matsutake como comercio está en `fun-81`.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese olor a hongo no es olor a tierra: lo firma, sobre todo, una molécula de ocho carbonos. | Fondo amarillo. Un champiñón (*Agaricus bisporus*) entero sobre una tabla; desde el cuadro 0.3 un mortero lo machaca; sale una nubecita de olor que se dibuja como una molécula. Chip tachado "tierra ✗" y chip "1 molécula clave". Robert sorprendido (gancho). Barra de escala 2 cm. |
| 1 | Nombre | Se llama uno-octen-tres-ol, y le dicen alcohol de hongo. | Título grande "1-octen-3-ol" y fórmula esquemática: cadena de 8 carbonos con un doble enlace al inicio y un –OH en el carbono 3. Etiqueta "«alcohol de hongo»". |
| 2 | Geosmina | La tierra mojada es otra: la geosmina. | Fondo menta. A la izquierda, gotas sobre tierra con su molécula (geosmina, dos anillos) y etiqueta "geosmina = tierra mojada"; a la derecha la cadena del 1-octen-3-ol "= hongo". Signo ≠. |
| 3 | Corte | Cuando machacas un champiñón, rompes sus células. | Regreso al champiñón: un mazo de mortero machaca un trozo. Zoom con `Lupa` al corte: hifas (tubos largos con tabiques) que se rompen. Fondo oscuro "POR DENTRO". Barra de escala 10 µm. |
| 4 | Grasa | Un ácido graso de sus células, el linoleico, toca unas enzimas. | De la membrana rota sale una cadena larga de 18 carbonos (ácido linoleico, dos dobles enlaces) y se encuentra con dos "tijeras" (enzimas). Etiqueta "ácido linoleico · 18 carbonos". |
| 5 | Oxigenasa | Una le pega oxígeno. | La primera enzima (etiqueta "dioxigenasa") le pega un O₂ (bolitas rojas) en el carbono 10. Chip "+ O₂". |
| 6 | Liasa | Otra, una liasa, la parte en dos: sale un pedazo de ocho carbonos. | La segunda enzima ("liasa de hidroperóxido") corta la cadena; el pedazo de 8 carbonos se separa, brilla y sube como olor. Contador "8 C". |
| 7 | Umbral | En agua, tu nariz lo nota a cerca de una parte en mil millones. | Fondo cian. Un vaso de agua; zoom a sus moléculas (esquemáticas) con UNA bolita dorada encendida. Número "≈ 1 en 1,000,000,000" y "(en agua)" y una nariz que la huele. |
| 8 | Pregunta | ¿Y por qué esa molécula huele tanto a hongo? | **Re-gancho.** Fondo rosa: la molécula con un "?" gigante; Robert grande, pensativo. |
| 9 | Espejo | Tiene dos formas, como tu mano izquierda y tu mano derecha. | Fondo oscuro. Dos manos y dos moléculas en espejo (el –OH hacia adelante / hacia atrás). Etiquetas "R" y "S". |
| 10 | Formas | La R huele más a hongo; la S, a moho y a pasto. Los hongos hacen sobre todo la R. | La R con ícono de champiñón; la S con íconos de moho y pasto. Chip "los hongos hacen sobre todo la R". |
| 11 | Estudio | En 1984, buscando qué atrae a la mosca tsetsé en África, la encontraron en el olor de las vacas. | Fondo naranja. `TarjetaEstudio` "1984 · olor de ganado · moscas tsetsé (*Glossina*)". Una vaca esquemática, nube de olor y moscas tsetsé que se acercan. |
| 12 | Moscos | También sale en tu sudor y, con el dióxido de carbono de tu aliento, atrae a algunos moscos: hay trampas con ella. | Fondo lila. Brazo con gotas de sudor + nube de CO₂ del aliento; unos moscos se acercan (otros no). Una trampa de moscos con frasquito "octenol + CO₂". Chip "a algunas especies". |
| 13 | Cierre | Así que ese olor a hongo es, sobre todo, una molécula que el champiñón arma cuando rompes sus células. | **Regreso a la imagen del inicio:** el mismo champiñón, ya rebanado, con la nubecita convertida en la molécula dibujada. Chip "1-octen-3-ol". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

**Música (planeada):** cama grave y continua, cálida y curiosa (cocina → laboratorio), sin golpe marcado, debajo de la voz; se abre un poco en «la R huele más a hongo». Efectos en el mismo cuadro: cuchillo que corta, golpes del mortero, chasquido de cada enzima, "pop" del oxígeno, tijeretazo de la liasa, brillo del pedazo de 8 carbonos, zumbido de moscas tsetsé y moscos, clic de la trampa.

Barra de escala: 2 cm (champiñón), 10 µm (hifas), 1 nm (moléculas, esquemáticas). En las tarjetas (estudio, cuadrícula) no hay objeto que medir.

## Robert en pantalla (plan; los tiempos finales salen al animar)

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | «no es olor a tierra» (cuadro 0) |
| 2 | 7.5 | 10.0 | 12_perfil_serio | `arriba-der` | «la geosmina» |
| 3 | 15.5 | 19.5 | 13_senalando_arriba | `arriba-der` | «la lipoxigenasa… la liasa» |
| 4 | 23.0 | 26.0 | 11_sorprendido | `arriba-der` | «una parte en mil millones» |
| 5 | 26.0 | 28.5 | 07_pensativo_puno | `presentador` (grande) | «¿Y por qué huele tanto a hongo?» |
| 6 | 33.0 | 37.0 | 06_pensativo_menton | `arriba-der` | «la R… la S» |
| 7 | 38.5 | 42.5 | 04_bajando_lentes | `arriba-der` | «en el olor de las vacas» |
| 8 | 46.0 | 50.5 | 10_serio_molesto | `arriba-der` | «atrae a algunos moscos» |
| 9 | 53.0 | 57.5 | 02_apuntando_camara | `arriba-der` | «cuando rompes sus células» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

Plan: 9 apariciones · ≈ 31.5 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (verificadas; tabla completa en `verificacion.md`)

1. Su, T., Chen, Y., Liu, H., Gao, Y., Guo, J., Li, Y., Qi, Y. y Qiu, L. (2022). The biosynthesis of 1-octene-3-ol by a multifunctional fatty acid dioxygenase and hydroperoxide lyase in *Agaricus bisporus*. *Journal of Fungi* 8(8): 827. https://pmc.ncbi.nlm.nih.gov/articles/PMC9410191/
   > "The main aromatic component of the button mushroom (Agaricus bisporus) is 1-octen-3-ol" (2022)
   > "10-HPOD does not have a conjugated diene motif and thus is not a LOX product" (2022)
   > "10-HPOD is subsequently cleaved to yield 1-octene-3-ol and 10-oxodecanoic acid" (2022)
   > "(R)-(−)-1-octen-3-ol is predominantly produced by biosynthesis, especially in button mushrooms" (2022)
2. Combet, E., Henderson, J., Eastwood, D. C. y Burton, K. S. (2009). Influence of sporophore development, damage, storage, and tissue specificity on the enzymic formation of volatiles in mushrooms (*Agaricus bisporus*). *J. Agric. Food Chem.* 57(9): 3709–3717. https://pubmed.ncbi.nlm.nih.gov/19326947/ (PMID 19326947)
   > "Tissue disruption had a major impact on the volatile profile" (2009)
   > "eight-carbon volatiles characteristic of mushroom and fungal flavor" (2009)
3. Lee, N.-Y., Choi, D.-H., Kim, M.-G. et al. (2020). Biosynthesis of (R)-(−)-1-octen-3-ol in recombinant *Saccharomyces cerevisiae* with lipoxygenase-1 and hydroperoxide lyase genes from *Tricholoma matsutake*. *J. Microbiol. Biotechnol.* 30(2): 296–305. https://pmc.ncbi.nlm.nih.gov/articles/PMC9728333/
   > "Cleavage into (R)-(-)-1-octen-3-ol by hydroperoxide lyase is next" (2020)
   > "(R)-(-)-1-octen-3-ol has a stronger mushroom-like flavor than the racemic 1-octen-3-ol"; "(S)-(+)-1-octen-3-ol that has a moldy and grassy smell" (2020)
4. Hung, R., Lee, S. y Bennett, J. W. (2014). The effects of low concentrations of the enantiomers of mushroom alcohol (1-octen-3-ol) on *Arabidopsis thaliana*. *Mycology* 5(2): 73–80. https://pmc.ncbi.nlm.nih.gov/articles/PMC4066924/
   > "“Mushroom alcohol,” or 1-octen-3-ol, is an 8-carbon alcohol produced by the enzymatic oxidation and cleavage of linoleic acid" (2014)
   > "can be detected at levels of 0.0001 mg/1 in water" (dato de 1983, Wnuk, citado en 2014) · "can be used as a bait in mosquito traps" (2014)
5. Universidad de Bristol, *Molecule of the Month: 1-octen-3-ol*. https://www.chm.bris.ac.uk/motm/octenol/octenolh.htm
   > "1-octen-3-ol has a very low odour threshold around 1 ppb." · "it can exist as two optical isomers" (s. f.)
6. Hall, D. R., Beevor, P. S., Cork, A., Nesbitt, B. F. y Vale, G. A. (1984). 1-Octen-3-ol: a potent olfactory stimulant and attractant for tsetse isolated from cattle odours. *Insect Science and its Application* 5(5): 335–339. https://www.cambridge.org/core/journals/international-journal-of-tropical-insect-science/article/1octen3ol-a-potent-olfactory-stimulant-and-attractant-for-tsetse-isolated-from-cattle-odours/E1B2F6AEA6A777164E8193E1AF9C2E26
7. Winder, R. S. (2026). Octenol. *FUNGI* 19(1). https://www.fungimag.com/v19i1/v19i1-Octenol.pdf
   > "searching for tsetse fly attractants in Africa found that cattle odors contain octenol" (2026)
8. Cork, A. y Park, K. C. (1996). Identification of electrophysiologically-active compounds for the malaria mosquito, *Anopheles gambiae*, in human sweat extracts. *Med. Vet. Entomol.* 10(3): 269–276. https://pubmed.ncbi.nlm.nih.gov/8887339/
   > "Non-acid fractions were found to contain: 6-methyl-5-hepten-2-one, 1-octen-3-ol…" (1996)
9. Kline, D. L. (1994). Olfactory attractants for mosquito surveillance and control: 1-octen-3-ol. *J. Am. Mosq. Control Assoc.* 10(2): 280–287. https://pubmed.ncbi.nlm.nih.gov/8965080/
   > "good attractant for only a few species… synergistic response… octenol and CO2" (1994)
10. Geosmina (solo contraste): https://pubmed.ncbi.nlm.nih.gov/32251369/ > "the soil-smelling terpenoids geosmin and 2-methylisoborneol" (2020)

El dibujo es esquemático.
