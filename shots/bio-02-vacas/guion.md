# Shot Biotecnológico #02 · La vaca no vive del pasto: vive de sus microbios

- **Serie:** Shot Biotecnológico · **Logo:** `logo_bioquimica.svg` · **Badge:** #02.
- **Remasteriza:** viejo #5 (YXuYRgrHY_M) y absorbe el #22 ("todo es un biorreactor"): aquí la vaca es "un biorreactor con patas".
- **Formato (RECETARIO):** N1 "Por dentro" (vaca → rayos X del estómago → rumen al microscopio → la misma vaca, ya por dentro) con un momento N2 (tú contra la vaca: 70 % contra ~10 %). Gemelo mudo: M4 "Ciclo".
- **Gancho:** #1 "Esto no es X: es Y" sobre la vaca que está comiendo en pantalla. Habla a "tú" (en el estudio: "en ti, cerca de diez").
- **Duración:** voz estimada 58.0 s (947 caracteres) + cierre 3.5 s ≈ 61.5 s, con `"velocidad": 1.065`.
- **Estado:** guion APROBADO por Robert (27 oct 2026); falta generar la voz (~950 créditos).

## Versión narrada (947 caracteres)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa vaca no se alimenta de pasto: se alimenta de los microbios de su panza. | Pastizal brillante. **A los 0 s** la vaca baja la cabeza, arranca pasto y mastica (~1 vez por segundo). |
| 1 | Enzimas | Ella no puede digerir la celulosa del pasto: no tiene las enzimas. | Hoja de pasto gigante en fondo menta. **Lupa de rayos X:** cadenas de celulosa (glucosas unidas). Mito "enzimas de vaca" que se tacha. |
| 2 | Rumen | Así que lo manda al rumen: un tanque enorme, tibio y sin oxígeno. | Regreso a la vaca: la panza brilla y la **Lupa de rayos X** muestra el estómago de 4 cámaras; el rumen burbujea. Chip "tibio · sin oxígeno". |
| 3 | Micro | Ahí viven bacterias, hongos, protozoarios y arqueas: miles de millones en cada mililitro. | **Adentro del rumen** (fondo oscuro, barra de escala de 5 µm): pedazos de pasto y llegan bacterias, hongos con raicitas metidas en la fibra, un protozoario ciliado y arqueas. Chip "miles de millones por mililitro". |
| 4 | Micro | Los hongos rompen la fibra y las bacterias fermentan la celulosa. | La fibra se parte en trozos y empiezan a salir ácidos (bolitas con cadenas de 2, 3 y 4 carbonos). |
| 5 | Pregunta | ¿Y la vaca qué gana? | **Re-gancho.** Chip "¿y la vaca?" y sticker pensativo. |
| 6 | Ácidos | Ácidos grasos volátiles: la pared del rumen los absorbe, y le dan cerca del setenta por ciento de su energía. | Pared del rumen con papilas: los ácidos entran y se van por la sangre. Medidor "ENERGÍA DE LA VACA" que sube a 70 %. |
| 7 | Proteína | Y los microbios que bajan al intestino, la vaca se los digiere: son su principal proteína. | Intestino: los microbios viajan y se deshacen en aminoácidos (cuentas de colores). Chip "microbios = su proteína". |
| 8 | Estudio | En 1990, una revisión de Edward Bergman juntó décadas de mediciones: setenta por ciento en vacas y borregos; en ti, cerca de diez. | Tarjeta "1990 · Edward N. Bergman · *Physiological Reviews* 70: 567–590". Luego dos barras: **vaca 70 % contra tú ~10 %**. |
| 9 | Metano | El precio: las arqueas hacen metano, y casi todo sale en eructos, no en pedos. | La vaca eructa una nube "CH₄". Mito "pedos" tachado. Sticker bajando lentes. |
| 10 | Biorreactor | Por eso una vaca es un biorreactor con patas: el pasto es solo el medio de cultivo, y los microbios, la fábrica. | Fondo lila: la vaca con el rumen marcado como tanque punteado; flecha de pasto "medio de cultivo"; etiqueta "fábrica: microbios". Chip "BIORREACTOR CON PATAS". |
| 11 | Cierre | Esa vaca come pasto… pero vive de sus microbios. | **La misma vaca del inicio**, con la panza encendida y una lupa que muestra sus microbios. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (`gen-audio.mjs`, sin costo)
- **Fondo:** cama grave continua, sin golpe.
- **Efectos en el mismo cuadro:** pasto que se arranca, masticadas (1 por segundo), barrido de la lupa, burbujas del rumen, 4 notas (4 tipos de microbio), crujido de la fibra, una nota por ácido que cruza la pared (según sus carbonos), aminoácidos, golpe de la tarjeta, **eructo sintetizado** y golpe del tache, clic metálico del biorreactor, acorde final.

## Gemelo mudo (M4 "Ciclo", construido: `Shot Vacas mudo.dc.html`)
Loop de 61.5 s en 7 capítulos: come pasto → rumia → fermenta → energía → proteína → metano → abono. Primer texto: **"Esta vaca no vive del pasto"**; el último cuadro antes del cierre es la misma vaca pastando el pasto que volvió a crecer.
- **Música hecha de datos:** 1 masticada por segundo al pastar; al rumiar, **60 masticadas por bolo** en time-lapse ×10 (cronómetro en pantalla); cada microbio suma su capa (bacterias rápidas, hongos bajo, protozoarios, burbujitas de arqueas); **cada ácido toca la nota de sus carbonos** (2 acetato, 3 propionato, 4 butirato); la cama suena tapada mientras el pasto no se digiere y se abre cuando fermenta; eructo; el pasto que crece sube de nota.
- Título: **¿De qué vive una vaca? 🎧 | Shot Biotecnológico 02**

## Título (narrado)
¿De qué vive una vaca? No es del pasto 🐄 | Shot Biotecnológico 02

## Descripción (borrador, sin emojis)
Las vacas comen pasto, pero no pueden digerir su celulosa: no tienen las enzimas. Lo mandan al rumen, un tanque tibio y sin oxígeno donde viven bacterias, hongos, protozoarios y arqueas (miles de millones por mililitro). Ese ecosistema fermenta la fibra y produce ácidos grasos volátiles (acetato, propionato y butirato), que la pared del rumen absorbe: según la revisión de Edward Bergman (1990), dan cerca del 70 % de la energía de vacas y borregos; en humanos, alrededor del 10 %. Además, los microbios que pasan al intestino se digieren y en la mayoría de las dietas son la principal fuente de proteína de la vaca. El precio: las arqueas producen metano, y casi todo sale por la boca, en eructos. Por eso una vaca es un biorreactor con patas: el pasto es el medio de cultivo y los microbios, la fábrica. El dibujo es esquemático.
¿Sabías que la vaca rumia? ¿Cómo le dicen en tu región a "rumiar"?

## Fuentes
- Bergman, E. N. (1990). Energy contributions of volatile fatty acids from the gastrointestinal tract in various species. *Physiological Reviews* 70(2): 567–590. PubMed 2181501 (≈70 % en rumiantes como borregos y ganado; ≈10 % en humanos).
- Clark, J. H., Klusmeyer, T. H. y Cameron, M. R. (1992). Microbial protein synthesis and flows of nitrogen fractions to the duodenum of dairy cows. *J. Dairy Sci.* 75: 2304–2323; y revisiones de proteína metabolizable (p. ej. Bach, Calsamiglia y Stern, 2005, *J. Dairy Sci.* 88 E. Suppl.): la proteína microbiana suele ser la principal fuente de aminoácidos absorbidos (se citan 50–80 %), salvo dietas con mucha proteína que escapa al rumen.
- Microbiología del rumen (bacterias 10¹⁰–10¹¹ por mL, protozoarios ~10⁵–10⁶ por mL, hongos anaerobios y arqueas metanógenas): notas de nutrición de rumiantes, Universidad de Idaho ("Rumen microbiology").
- Metano: ~95 % del metano del rumen sale por eructo (Murray, Bryant y Leng, 1976, *Br. J. Nutr.*, citado por Snopes y Scientific American).
- Rumia: 50–80 masticadas por bolo, ~1 minuto por bolo (Beauchemin, 2018, "Current perspectives on eating and rumination activity in dairy cows", *J. Dairy Sci.* 101: 4762–4784, y estudio de 2019 en *Acta Univ. Agric. Mendelianae*: ~61 masticadas y ~54–58 s por bolo). Se usa 60 en el mudo.

## Datos no verificados del todo
- No se pudo leer el texto completo de Bach et al. (2005) para el rango 50–80 %; por eso la voz dice "su principal proteína" y no un porcentaje.
- La cifra de 95 % del metano por la boca viene de fuentes secundarias que citan a Murray et al. (1976); la voz dice "casi todo".
- No se encontró el lugar de trabajo de Bergman en la revisión; la escena del estudio usa la revista en lugar del lugar.
