# Shot Biotecnológico #05 · La petunia que brilla sola

- **Serie:** Shot Biotecnológico · **Logo:** `logo_bioquimica.svg` · **Badge:** #05.
- **Remasteriza:** viejo #18 (UV4pDhgRA28). Ya no abre con "Hace 40 años" (prohibido abrir con fecha): la historia de 1986 pasa a ser "el estudio". Se corrige "le metieron genes hongos" y se aclara que el ciclo son 4 enzimas del hongo (más una enzima ayudante que no se narra).
- **Formato (RECETARIO):** N1 "Por dentro" (maceta de noche → rayos X del pétalo → el ciclo → la misma maceta). Gemelo mudo: M4 "Ciclo" (un sonido por enzima).
- **Gancho:** #1 "Esto no es X: es Y" sobre la flor que se prende en pantalla ("no tiene pilas ni pintura").
- **Duración:** voz estimada 57.4 s (929 caracteres) + cierre 3.5 s ≈ 60.9 s, con `"velocidad": 1.065`. Si al generar la voz queda en menos de 61.0 s, bajar la velocidad a 1.05 (no gasta créditos).
- **Estado:** construido sin voz; la voz espera la aprobación de Robert (~930 créditos).

## Versión narrada (929 caracteres)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta flor no tiene pilas ni pintura: brilla porque lleva genes de un hongo. | Maceta con petunias de día. **A los 0 s** el cielo se apaga y las 5 flores se prenden en verde, una tras otra. Mitos "pilas" y "pintura" tachados. |
| 1 | Hongo | Es la petunia luciérnaga, y su luz viene de un hongo que brilla solo en el bosque. | Bosque de noche: dos hongos luminosos (*Neonothopanus nambi*, esquemático); una hebra de ADN viaja del hongo a una macetita que se prende. Chip "genes del hongo". |
| 2 | Ciclo | Por dentro, la planta ya fabrica ácido cafeico, como todas. | Pétalo gigante y **Lupa de rayos X** (células del pétalo). Fondo oscuro: aparece el ácido cafeico arriba del círculo. |
| 3 | Ciclo | Los genes del hongo lo vuelven un ciclo de cuatro enzimas. | Se dibuja el círculo y aparecen 4 enzimas numeradas. Chip "4 enzimas del hongo". |
| 4 | Ciclo | La primera lo convierte en hispidina; la segunda, en luciferina. | La molécula viaja: enzima 1 → hispidina; enzima 2 → luciferina. |
| 5 | Ciclo | La tercera, la luciferasa, la quema con oxígeno… y suelta luz verde. | Enzima 3 activa: **destello verde**. Chip "+ O₂ → luz verde". |
| 6 | Ciclo | Y la cuarta recicla lo que sobra en ácido cafeico, y vuelta otra vez. | Enzima 4 regresa la molécula al ácido cafeico y el ciclo sigue girando con destellos. |
| 7 | Pregunta | ¿Por qué nadie lo había logrado? | **Re-gancho.** La maceta brillando; chip "¿por qué hasta ahora?" y sticker pensativo. |
| 8 | Estudio | En 1986, en San Diego, metieron un gen de luciérnaga en tabaco: brillaba, pero había que darle luciferina. | Tarjeta "1986 · Ow, Wood, DeLuca, Helinski y Howell · UC San Diego · *Science* 234: 856". Una planta de tabaco a la que una regadera le echa luciferina: brilla un rato y "se apaga". |
| 9 | Wood | Uno de esos estudiantes, Keith Wood, cofundó décadas después la empresa de esta petunia. | Contador de años 1986 → 2019; "Keith Wood · cofundador de Light Bio". Sticker bajando lentes. |
| 10 | Aprobada | Estados Unidos le dio luz verde en 2023, y salió a la venta en 2024. | **Semáforo** que se pone en verde (juego de palabras). Chips "EE. UU. · sept. 2023" y "a la venta: 2024". |
| 11 | Extra | Lo chistoso: brilla más en las flores jóvenes, y no se carga con el sol: la luz la fabrica ella. | Flor joven muy brillante junto a una vieja tenue; amanece y aparece una pila tachada. |
| 12 | Cierre | Así que no tiene pilas: tiene un hongo dando vueltas por dentro. | **La misma maceta del inicio**, con el ciclo girando chiquito sobre las flores. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (`gen-audio.mjs`, sin costo)
- **Fondo:** cama grave continua, sin golpe.
- **Dato hecho sonido:** "la nota de la luz verde". La luz de ~530 nm vibra a ~5.66 × 10¹⁴ Hz; bajada 40 octavas queda en **~515 Hz**. Esa nota suena cada vez que algo brilla (flores, hongo, luciferasa, semáforo).
- **Efectos:** el día que se apaga, 5 notas al prenderse 5 flores, tachones, aparición de las 4 enzimas, una nota por enzima, regadera, nota que baja cuando el tabaco "se apaga", años que corren, semáforo, pila tachada, arpegio del ciclo en el cierre.

## Gemelo mudo (construido: `Shot Petunia mudo.dc.html`)
Loop de 61.5 s en 6 capítulos: de día → anochece y las flores se prenden → adentro: las 4 enzimas, una por una → "vuelta y vuelta, toda la noche" (el ciclo acelera) → un botón nuevo se abre y, como flor joven, brilla más → amanece: "sigue brillando: el sol lo tapa" → mismo cuadro del inicio. Primer texto: **"Esta flor no tiene pilas"**.
- **Música hecha de datos:** cada enzima toca su nota cuando la molécula pasa por ella (la 3, la luciferasa, toca la nota de la luz, ~515 Hz); en la segunda parte el ciclo acelera y el arpegio también; al amanecer, las notas de luz se apagan poco a poco.
- Título: **¿Cómo suena una flor que brilla? 🎧 | Shot Biotecnológico 05**

## Título (narrado)
¿Una flor que brilla sin pilas? Sí existe 🌸 | Shot Biotecnológico 05

## Descripción (borrador, sin emojis)
La petunia "luciérnaga" (Firefly Petunia, de la empresa Light Bio) brilla sola en la oscuridad porque lleva genes del hongo luminoso *Neonothopanus nambi*. Todas las plantas fabrican ácido cafeico. Los genes del hongo lo meten a un ciclo de cuatro enzimas: la hispidina sintasa lo convierte en hispidina; la hispidina-3-hidroxilasa, en luciferina (3-hidroxihispidina); la luciferasa la oxida con oxígeno y suelta luz verde; y la cafeilpiruvato hidrolasa recicla lo que queda en ácido cafeico. (Una quinta enzima "ayudante" activa a la primera.) En 1986, un equipo de la Universidad de California en San Diego puso el gen de la luciferasa de luciérnaga en tabaco: brillaba, pero había que darle luciferina desde afuera. Keith Wood, que era estudiante en ese equipo, cofundó Light Bio en 2019. El Departamento de Agricultura de EE. UU. (APHIS) determinó en septiembre de 2023 que esta petunia no necesitaba regulación como plaga vegetal, y salió a la venta en 2024. Brilla más en las flores jóvenes y no "se carga" con el sol: la luz la produce su metabolismo. El dibujo es esquemático.
¿Pondrías una en tu jardín? ¿Qué otra planta te gustaría que brillara?

## Fuentes
- Kotlobay, A. A. et al. (2018). Genetically encodable bioluminescent system from fungi. *PNAS* 115(50): 12728–12732 (ciclo del ácido cafeico: HispS, H3H, Luz y CPH; luz verde con máximo en 520 nm; la enzima NpgA activa a HispS).
- Mitiouchkina, T. et al. (2020). Plants with genetically encoded autoluminescence. *Nature Biotechnology* 38: 944–946 (primeras plantas que brillan con genes del hongo).
- USDA APHIS (6 sep 2023). Regulatory Status Review Response: Light Bio Petunia (genes de hispidina sintasa, hispidina-3-hidroxilasa, luciferasa, cafeoil piruvato hidrolasa y fosfopanteteinil transferasa; luz de ~530 nm, más fuerte en flores jóvenes).
- Ow, D. W., Wood, K. V., DeLuca, M., de Wet, J. R., Helinski, D. R. y Howell, S. H. (1986). Transient and stable expression of the firefly luciferase gene in plant cells and transgenic plants. *Science* 234: 856–859 (UC San Diego).
- NPR / Scientific American (abril de 2024): Keith Wood, cofundador y director de Light Bio, trabajó en la planta de tabaco de 1986, que necesitaba que le agregaran el sustrato para brillar; venta en EE. UU. desde 2024.

## Datos no verificados del todo
- La tarjeta del estudio pone 5 autores; la lista completa del artículo tiene 6 (incluye a de Wet). Revisar si se prefiere "Ow, Wood y equipo".
- La "nota de la luz" es un juego (bajar la frecuencia 40 octavas), no un sonido real de la flor; se explica así en la descripción del mudo.
- "Light Bio fue fundada en 2019" viene de notas de prensa; el número de años en pantalla (1986 → 2019) usa ese dato.
