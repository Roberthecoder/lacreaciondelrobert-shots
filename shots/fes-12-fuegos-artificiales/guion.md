# Shot Festivo #12 · Año Nuevo · Químico: Cada color de los fuegos artificiales es un metal distinto

- **Serie:** Shot Festivo · **Serie vinculada:** Químico · **Logo:** química (matraz) · **Badge:** Festivo #12 · **Especial:** Año Nuevo (se publica el 31 dic 2026) · rama `pedido300/festivos`.
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`: APROBADO, 22/22 ✅), animación (`fuegos.jsx`), música (`gen-audio.mjs`), Robert en pantalla y `publicacion.md` listos · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro" (del cielo al electrón y de regreso al cielo) con un poco de N5 "El experimento" (el prisma de Bunsen y Kirchhoff, la prueba de la flama).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: "Ese rojo que ves en Año Nuevo no es pintura: es estroncio, un metal."
- **Duración:** voz 1,059 caracteres (≈ 64.4 s) + cierre 3.8 s → **68.2 s** en la base (`estimar-escenas.mjs`, rango festivo 61–75 s).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese rojo que ves en Año Nuevo no es pintura: es estroncio, un metal. | Cielo de noche sobre una ciudad con azoteas; desde el cuadro 0 un cohete sube silbando y a los 0.6 s revienta una palmera roja. Un brochazo de «pintura» se tacha; aparece «Sr · estroncio». Chip «Especial Año Nuevo». |
| 1 | Cohete | Dentro del cohete van sales de metales, y cada metal da su propio color. | Fondo amarillo. Corte del cohete (esquema): carga de pólvora, mecha y adentro las bolitas de color con su etiqueta de metal. Chip «sales de metales». |
| 2 | Colores | Estroncio da rojo; bario, verde; cobre, azul; sodio, amarillo; y calcio, naranja. | Fondo noche. Cinco estallidos que se encienden uno por frase, cada uno con su símbolo: Sr rojo · Ba verde · Cu azul · Na amarillo · Ca naranja. |
| 3 | Calor | Al estallar, el calor de la flama les da un empujón a los electrones del metal. | Fondo noche, viaje al microscopio dentro de una chispa (barra de escala «1 nm»; el átomo de Sr mide ~0.4 nm, menor que la barra). Molécula Sr–Cl (estroncio + cloro) con electrones; llamas que lo empujan. Capítulo 1 «El empujón». |
| 4 | Escalon | Suben a un escalón de más energía y, al bajar, sueltan esa energía como luz. | Escalera de niveles de energía: un electrón sube un escalón y al caer suelta un destello (fotón) rojo. Chip «baja = luz». |
| 5 | Huella | Cada metal tiene sus propios escalones; por eso cada uno brilla con su propio color. | Tres escaleras lado a lado (Sr, Ba, Cu) con escalones de distinto tamaño: caída grande → azul, mediana → verde, chica → rojo. Chip «cada metal, su color». Capítulo 2 «La huella». |
| 6 | Pregunta | ¿Entonces por qué casi nunca ves un azul bonito? | **Re-gancho.** Fondo cian; estallido azul pálido y deslavado con «?» gigante; Robert grande, pensativo. |
| 7 | Azul | El azul sale del cobre pegado a un cloro. Si la flama se calienta de más, esa pareja se rompe y el azul se deslava. | Fondo noche. Molécula Cu–Cl (dos esferas unidas) brillando azul; un termómetro sube a «muy caliente» y el enlace se rompe: Cu y Cl se separan y el azul pierde color. Chips «CuCl» y «se rompe». Capítulo 3 «El azul». |
| 8 | Estudio | Hacia 1860, en Heidelberg, Bunsen y Kirchhoff pasaron la luz de flamas por un prisma: cada elemento dejaba su huella de líneas de colores. | Fondo amarillo. `TarjetaEstudio` «1860 · Bunsen y Kirchhoff · Heidelberg · espectroscopio (1859): flama + prisma». Mechero con flama, prisma y, detrás, franjas de líneas de colores (esquemáticas) para sodio, estroncio y cobre. |
| 9 | Cesio | Así hallaron un elemento nuevo en agua mineral, y lo llamaron cesio por sus líneas azules. | Botella de agua mineral «Dürkheim» se evapora en una cápsula; en el espectro aparecen líneas azules nuevas → ficha «Cs · cesio (1860)». Chip «del latín *caesius*: gris azulado». Capítulo 4 «El cesio». |
| 10 | Dato | Dato: cuenta los segundos entre el destello y el ¡pum!; cada tres segundos son como un kilómetro de distancia. | Fondo menta. Un cohete estalla a lo lejos; cronómetro 1-2-3 mientras una onda de sonido avanza hacia una persona en la azotea; regla «≈ 1 km». Chip «÷ 3 = km». |
| 11 | Cierre | Así que esta noche, cuando veas ese rojo, ya sabes: no es pintura, es estroncio. ¡Feliz Año Nuevo! | **Regreso a la imagen del inicio** (mismo cielo y azoteas), ahora con todos los colores juntos; una `Lupa` de rayos X sobre la palmera roja deja ver los átomos de estroncio y sus destellos. Chip «no es pintura: es estroncio». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua sin golpe marcado, siempre debajo de la voz. Efectos en el mismo cuadro: silbido del cohete y estallido (0.6 s), un estallido distinto por cada color (cinco, con nota de altura distinta), chispazo de la flama, un «tin» que sube con el electrón y un destello al bajar (uno por escalón), acorde agrio y deslavado en la pregunta, chasquido del enlace Cu–Cl que se rompe, zumbido suave del mechero y del prisma, burbujeo del agua que se evapora, tic-tac del cronómetro 1-2-3 y el ¡pum! retrasado, y destellos al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos porque están atados a cada escena). Grande en «¿Entonces por qué casi nunca ves un azul bonito?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.8 | 11_sorprendido | `gancho` | «no es pintura: es estroncio» (cuadro 0) |
| 2 | 4.7 | 8.4 | 13_senalando_arriba | `arriba-der` | señala el corte del cohete |
| 3 | 14.0 | 18.2 | 06_pensativo_menton | `arriba-der` | «el calor les da un empujón a los electrones» |
| 4 | 23.6 | 28.0 | 05_sonriendo_dientes_uniformes | `izq-alto` | «cada uno brilla con su propio color» |
| 5 | 28.25 | 32.5 | 07_pensativo_puno | `grande` | «¿por qué casi nunca ves un azul bonito?» |
| 6 | 35.7 | 38.0 | 10_serio_molesto | `arriba-der` | «esa pareja se rompe y el azul se deslava» |
| 7 | 41.2 | 46.2 | 04_bajando_lentes | `izq-alto` | Bunsen y Kirchhoff, flama + prisma |
| 8 | 47.9 | 51.7 | 11_sorprendido | `arriba-der` | «un elemento nuevo… el cesio» |
| 9 | 52.3 | 55.9 | 12_perfil_serio | `izq-alto` | escucha: destello… ¡pum! |
| 10 | 58.8 | 64.3 | 02_apuntando_camara | `arriba-der` | «¡Feliz Año Nuevo!» |
| — | 64.4 | 68.2 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones: 10 · **≈ 40.6 s en pantalla** (+ cierre 3.8 s) · 9 poses distintas, ninguna repetida seguida.

## Fuentes (verificadas el 29 oct 2026; detalle en `verificacion.md`)

1. **Colores de cada metal en fuegos artificiales** — Texas A&M University at Galveston, "Lighting Up The Sky: The Chemistry Behind America's Birthday" (2025), con Grace Townsend: "Strontium carbonate" para rojo · "Calcium compounds" para naranja · "Sodium compounds" para amarillo · "Barium chloride" para verde · "Copper compounds" para azul · "When heated, these metal salts emit light at specific wavelengths" · "These colors appear because the heat excites the electrons in the metal atoms". https://news.galveston.tamu.edu/2025/07/03/lighting-up-the-sky-the-chemistry-behind-americas-birthday/
2. **Colores y azul difícil** — Paul E. Smith (Purdue University), "Red, white but rarely blue — the science of fireworks colors, explained" (The Conversation, reproducido en The World, 2019): "copper, blue; barium, green; and sodium for yellow" · "Adding the element strontium to a color pyrotechnic mix produces a red flame" · "blue is the most difficult color to produce". https://theworld.org/stories/2019/07/03/red-white-rarely-blue-science-fireworks-colors-explained
3. **Mecanismo (electrones que suben y bajan)** — Chemistry LibreTexts, "Flame Tests": "electrons can be promoted from their normal unexcited state into higher orbitals" · "As they fall back down to lower levels (either in one go or in several steps), energy is released as light." · "Each of these jumps involves a specific amount of energy being released as light energy." Tabla: estroncio "red", bario "pale green", calcio "orange-red", sodio "strong, persistent orange". https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Supplemental_Modules_and_Websites_(Inorganic_Chemistry)/Descriptive_Chemistry/Elements_Organized_by_Block/1_s-Block_Elements/Group__1%3A_The_Alkali_Metals/2Reactions_of_the_Group_1_Elements/Flame_Tests
4. **El azul: CuCl, el más difícil y se rompe con el calor** — Glück, Klapötke y Küblböck, *Eur. J. Inorg. Chem.* (2020), doi 10.1002/ejic.201901097: "Pyrotechnical disseminated blue light is supposed to be the most challenging color of all." · "Only copper salts in combination with chlorine seem to be high-performing blue light emitters." · "If the temperature exceeds a certain level, the molecular emitter decomposes to give copper(II) oxide and copper(I) hydroxide." · "CuOH emits in the green region and therefore, weakens the overall color quality." https://doi.org/10.1002/ejic.201901097
5. **Azul: reto y temperatura** — Juknelevicius, Hahma, Webb, Klapötke y Ramanavicius, "An Experimental Comparison of Selected Blue Flame Pyrotechnics", *Propellants, Explosives, Pyrotechnics* 46: 107–113 (2021): "A blue pyrotechnic flame color with high saturation or color purity (pe), is one of the biggest challenges in pyrotechnics." · "They identified the emitting species as CuCl." · "The metallic fuel MgAl increases the flame temperature and light output accordingly but results to reduced color saturation." https://epub.ub.uni-muenchen.de/75968/1/prep.202000114.pdf
6. **Electrones del metal (prueba de la flama)** — M. A. Duncan, "Misconceptions and Insights about Flame Tests", *J. Chem. Educ.* 102: 4195–4199 (2025): "the emission transitions for most of these metals are those corresponding to the neutral metal atoms". https://pmc.ncbi.nlm.nih.gov/articles/PMC12529943/
7. **Bunsen y Kirchhoff, Heidelberg, espectroscopio y cesio** — Science History Institute, "Robert Bunsen and Gustav Kirchhoff": "In 1860 Robert Bunsen and Gustav Kirchhoff discovered two alkali metals, cesium and rubidium" · "with the aid of the spectroscope they had invented the year before" · "Bunsen was called to the University of Heidelberg in 1852, and he soon arranged for Kirchhoff to teach at Heidelberg as well." · "He created the Bunsen burner for use in flame tests of various metals and salts". https://www.sciencehistory.org/education/scientific-biographies/robert-bunsen-and-gustav-kirchhoff/
8. **El cesio en agua mineral de Dürkheim y su nombre** — Bunsen y Kirchhoff (1860), citados en M. E. Weeks, *J. Chem. Educ.* 9: 1413 (1932) y en vanderkrogt.net: examinaron "a drop of Dürkheim mineral water" y vieron "two remarkable blue lines, very close together for which no known substance gives such rays"; el nombre viene de *cæsius*, que "the ancients used to designate the blue of the upper part of the firmament". https://www.vanderkrogt.net/elements/element.php?num=55 · Wikipedia "Caesium" (traducción «gris azulado»): "The element was named after the Latin word caesius, meaning "bluish grey"." https://en.wikipedia.org/wiki/Caesium
9. **Destello y ¡pum! (cada 3 s ≈ 1 km)** — HyperPhysics (R. Nave, Georgia State University), velocidad del sonido: "Air 0 331.5" · "Air 20 344" (m/s) → 3 s ≈ 0.99–1.03 km. http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/souspe.html · National Weather Service: "Since you see lightning immediately and it takes the sound of thunder about 5 seconds to travel a mile" (la misma regla). https://www.weather.gov/safety/lightning-science-thunder
10. **Apoyo general (enciclopédico)** — Wikipedia, "Pyrotechnic colorant": "In presence of chlorine, CuCl is formed, emitting strongly in blue." · "In absence of chlorine, the BaCl lines are not present" (SrCl, BaCl y CuCl en pantalla). https://en.wikipedia.org/wiki/Pyrotechnic_colorant

## Notas
- El dibujo es esquemático: el corte del cohete, el átomo con sus «escalones» de energía, las moléculas Sr–Cl y Cu–Cl y las franjas de líneas del espectro están simplificados; las posiciones de las líneas de Na, Sr y Ba son ilustrativas (en pantalla dice «líneas ilustrativas»); las dos líneas azules del cesio están en 455.5 y 459.3 nm, en una franja ampliada de 430 a 490 nm.
- La voz dice «electrones del metal» por sencillez; en los fuegos artificiales muchas veces lo que brilla es el metal unido a cloro u otro átomo (SrCl, BaCl, CuCl; fuente 4). En pantalla se muestra solo en la escena del azul (CuCl).
- No se da en voz ni en pantalla una temperatura exacta a la que se rompe el CuCl: las cifras publicadas no coinciden (Sturman, 2006, encontró buenos azules en flamas calculadas de 1660–2500 K), así que solo se dice «si se calienta de más».
- «Cada tres segundos ≈ 1 km» es la regla aproximada del rayo: la voz dice «como un kilómetro» porque la velocidad del sonido cambia un poco con la temperatura del aire.
- Mención a cuidar mascotas/seguridad: no incluida (opcional en el brief).

- **Render (29 oct 2026):** enviado a GitHub (versión de revisión sin voz). La voz espera la aprobación de Robert.
