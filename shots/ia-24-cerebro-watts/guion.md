# Shot IA #24 · Tu cerebro piensa con 20 watts; una tarjeta de IA, con 700

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #24 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (16 ✅ y 2 ⚠️ corregidos: se agregó «en 2024» a Llama 3 y a Hala Point), animación, Robert en pantalla, `gen-audio.mjs` (`assets/mezcla.wav`) y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N2 "El número" (20 W gigante desde el cuadro 0, mito del 10 % tachado, comparación con la tarjeta de 700 W, estudio y "qué sigue").
- **Gancho (de los 7):** #3 "Tu cuerpo en una imagen" (con número): "Mientras me escuchas, tu cerebro gasta unos veinte watts: lo de un foco."
- **Duración:** voz 968 caracteres / 178 palabras (≈ 58.3 s estimados) + cierre 3.5 s → **61.8 s** en la base.
- **Postura de la serie:** la defendemos y la criticamos con datos: la IA gasta mucho más que un cerebro, pero **no se comparan uno a uno** (se dice en voz) y la ingeniería ya intenta copiar la eficiencia del cerebro. **Diferencia con ia-04 y ia-17:** el ia-04 habló del costo total de entrenar Llama 3 (horas y CO₂) y el ia-17 del costo de cada pregunta; aquí Llama 3 solo aparece de pasada (16 mil tarjetas a la vez, versión 405B) y el tema es la eficiencia del cerebro.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Mientras me escuchas, tu cerebro gasta unos veinte watts: lo de un foco. | Fondo amarillo: desde el cuadro 0 una cabeza de perfil con el cerebro visible (rayos X); un "cable" de luz sale del cerebro y enciende un foco con la etiqueta "20 W". `NumeroGigante` "≈ 20 W". |
| 1 | Cuerpo | Pesa como el dos por ciento de tu cuerpo y se lleva una quinta parte de tu energía. | Silueta de cuerpo con una báscula: "2 % del peso"; al lado una pila/batería del cuerpo que se vacía una quinta parte hacia el cerebro: "20 % de la energía". |
| 2 | Neuronas | Con eso trabajan unas ochenta y seis mil millones de neuronas. | Zoom al cerebro, fondo azul noche: red de neuronas que se encienden; contador "≈ 86 000 000 000 neuronas". |
| 3 | Mito | Y lo del diez por ciento es mito: en un día lo usas casi todo. | `MitoTachado` "solo usas el 10 %"; el cerebro se ilumina por zonas, una tras otra, hasta estar todo encendido (reloj de un día que gira). |
| 4 | Tarjeta | Esta tarjeta de IA puede jalar hasta setecientos watts: lo de unos treinta y cinco cerebros. | Fondo cian: una tarjeta gráfica (GPU de centro de datos, "H100 SXM · hasta 700 W") con un medidor que sube a 700; al lado 35 cerebritos en fila (700 ÷ 20). |
| 5 | Miles | Y en 2024, para entrenar Llama 3, usaron hasta dieciséis mil juntas. | La cámara se aleja: la tarjeta se multiplica en una `Cuadricula` de racks hasta "16 000 tarjetas H100" (chip "Llama 3 405B · Meta · 2024"). |
| 6 | Pregunta | ¿Entonces tu cabeza le gana a la máquina? | **Re-gancho.** "?" gigante entre el cerebro y la tarjeta; Robert grande, pensativo. |
| 7 | Ojo | Ojo: no se comparan uno a uno. La tarjeta hace otro trabajo y tu cerebro no es una computadora digital. | Balanza con el cerebro y la tarjeta, que no se equilibra: un signo "≠". Chip "otras tareas · otra forma de procesar". |
| 8 | Estudio | En 2021, en la Universidad de Virginia, estimaron que en tu corteza calcular cuesta una décima de watt; mandar señales lejos, treinta y cinco veces más. | `TarjetaEstudio` "2021 · Univ. de Virginia · Levy y Calvert · PNAS". Dos neuronas: un puntito que "calcula" (0.1 W) y un largo axón con una señal que viaja (3.5 W, "×35"). Chip "estimación teórica". |
| 9 | Copia | En 2024, Intel hizo una máquina inspirada en el cerebro: mil ciento cincuenta millones de neuronas artificiales y hasta dos mil seiscientos watts. | Una caja del tamaño de un microondas, "Hala Point · Intel · 2024 · prototipo de investigación": contador "1 150 millones de neuronas artificiales" y medidor "hasta 2 600 W". Comparación junto al cerebro: 86 000 millones con ~20 W. |
| 10 | Cierre | Así que tu foquito de veinte watts aún le da clases de ahorro a las máquinas. | **Regreso a la imagen del inicio**: la misma cabeza con el foco de 20 W encendido; al fondo, la fila de tarjetas y la caja de Hala Point con sus medidores en rojo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; "clic" al encenderse el foco, zumbido suave de la red neuronal, un "tic" por zona que se ilumina en el mito y golpe de tachado, ventiladores/zumbido eléctrico que sube con el medidor de la tarjeta, golpeteo de racks multiplicándose, señal que viaja ("fiu") por el axón, zumbido de la caja de Hala Point, y el foco que vuelve a hacer "clic" al cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Entonces tu cabeza le gana a la máquina?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.0 | 11_sorprendido | `gancho` | «tu cerebro gasta unos veinte watts» (cuadro 0) |
| 2 | 5.4 | 9.3 | 04_bajando_lentes | `arriba-der` | «se lleva una quinta parte de tu energía» |
| 3 | 14.2 | 17.1 | 05_sonriendo_dientes_uniformes | `arriba-der` | «lo del diez por ciento es mito» |
| 4 | 19.8 | 23.9 | 11_sorprendido | `izq-alto` | «lo de unos treinta y cinco cerebros» |
| 5 | 27.2 | 31.3 | 07_pensativo_puno | `grande` | «¿Entonces tu cabeza le gana a la máquina?» |
| 6 | 32.3 | 35.8 | 12_perfil_serio | `arriba-der` | «no se comparan uno a uno» |
| 7 | 40.5 | 44.8 | 13_senalando_arriba | `izq-alto` | señala la neurona: «treinta y cinco veces más» |
| 8 | 46.0 | 50.6 | 06_pensativo_menton | `arriba-der` | «una máquina inspirada en el cerebro» (Hala Point) |
| 9 | 53.9 | 58.2 | 05_sonriendo_dientes_uniformes | `arriba-der` | «aún le da clases de ahorro a las máquinas» |
| — | 58.3 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 35.8 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.8 s

## Fuentes (abiertas en el original el 29 oct 2026)

1. **~20 W, 2 % del peso y 20 % de la energía (2021).** Balasubramanian, V. "Brain power". *PNAS* 118(32): e2107022118 (2021), comentario. DOI 10.1073/pnas.2107022118 · PMC8364152 (texto completo vía Europe PMC).
   > "The human brain is just 2% of the body's weight, but 20% of its metabolic load (1–3), and 10 times more expensive per gram than muscle."
   > "Levy and Calvert (19) calculate that cortical gray matter consumes about 3 W of power out of the 17 W to 20 W derived from glucose uptake in the brain (1, 2), 10% of which remains unused under normal operation."
   > "the brain outperforms the typical laptop computer by nearly an order of magnitude."
   - Apoyo para 2 %/20 %: Raichle, M. E. y Gusnard, D. A. "Appraising the brain's energy budget". *PNAS* 99(16): 10237–10239 (2002), DOI 10.1073/pnas.172399499 (la página de PNAS y PMC bloquearon la descarga en esta sesión; no se tomó cifra de aquí sin abrirla — el verificador puede confirmarla).
2. **Unas 86 mil millones de neuronas (2009).** Azevedo, F. A. C. et al. "Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain". *J. Comp. Neurol.* 513(5): 532–541 (2009). PMID 19226510 (resumen vía Europe PMC).
   > "We find that the adult male human brain contains on average 86.1 +/- 8.1 billion NeuN-positive cells ("neurons") and 84.6 +/- 9.8 billion NeuN-negative ("nonneuronal") cells."
3. **El mito del 10 % (2008).** Boyd, R. "Do People Only Use 10 Percent of Their Brains?". *Scientific American*, 7 feb 2008. https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/
   > Barry Gordon (neurólogo, Johns Hopkins): "we use virtually every part of the brain" · el mito es "so wrong it is almost laughable".
   > John Henley (neurólogo, Clínica Mayo): en el transcurso de un día, "you use 100 percent of the brain".
4. **H100 SXM, hasta 700 W (ficha vigente).** NVIDIA, página de especificaciones de H100. https://www.nvidia.com/en-us/data-center/h100/
   > "Max Thermal Design Power (TDP) — H100 SXM: Up to 700W (configurable)" (H100 NVL: "350-400W (configurable)").
   - "Lo de unos treinta y cinco cerebros" = cuenta propia: 700 W ÷ 20 W = 35.
5. **Llama 3: hasta 16 mil H100 (2024).** Llama Team, AI @ Meta. "The Llama 3 Herd of Models". arXiv:2407.21783 (31 jul 2024; v3 23 nov 2024), sección 3.3.1. https://arxiv.org/abs/2407.21783
   > "Compute. Llama 3 405B is trained on up to 16K H100 GPUs, each running at 700W TDP with 80GB HBM3"
6. **Calcular 0.1 W, comunicar 35 veces más (3.5 W) (2021).** Levy, W. B. y Calvert, V. G. "Communication consumes 35 times more energy than computation in the human cortex, but both costs are needed to predict synapse number". *PNAS* 118(18): e2008173118 (2021). DOI 10.1073/pnas.2008173118 · PMC8106317. Afiliación: University of Virginia (Charlottesville).
   > "The audit points out that, rather than the oft-quoted 20 W of glucose available to the human brain, the fraction partitioned to cortical computation is only 0.1 W of ATP … On the other hand, long-distance communication costs are 35-fold greater, 3.5 W."
   > Balasubramanian (fuente 1): "the biophysical processes supporting communication consume a startling 35 times more power … than the processes supporting computation (19)."
7. **Intel Hala Point (2024).** Intel Newsroom, "Intel Builds World's Largest Neuromorphic System to Enable More Sustainable AI", 17 abr 2024. https://www.intel.com/content/www/us/en/newsroom/news/intel-builds-worlds-largest-neuromorphic-system.html
   > "The system supports up to 1.15 billion neurons and 128 billion synapses distributed over 140,544 neuromorphic processing cores, consuming a maximum of 2,600 watts of power."
   > "brain-inspired computing principles" · "research prototype" · "its neuron capacity is roughly equivalent to that of an owl brain or the cortex of a capuchin monkey."

## Notas
- "Unos veinte watts" = 17–20 W de glucosa que usa el cerebro (fuente 1); por eso "unos". El foco es una comparación de potencia (watts), no que el cerebro sea eléctrico como un foco.
- "Una quinta parte de tu energía" = 20 % del gasto metabólico (en reposo, como suele citarse). "Dos por ciento" del peso corporal.
- "Ochenta y seis mil millones": promedio en hombres adultos (Azevedo 2009, 4 cerebros); se dice "unas".
- "Esta tarjeta de IA": H100 SXM, la versión de centro de datos; "hasta" 700 W es el máximo de diseño (TDP), no lo que gasta siempre.
- Llama 3 de pasada: dato de la versión 405B (ia-04 usó las versiones 8B y 70B y sus horas de GPU).
- Levy y Calvert es una **estimación teórica** (auditoría de energía con un modelo), y así se dice ("estimaron"). Su 3.5 W difiere del "about 3 W" que resume Balasubramanian; en voz solo se usan 0.1 W y "35 veces".
- No se dice en ningún lado que Hala Point sea "el más grande" (el título del comunicado de Intel lo dice, pero en 2025 lo superó otro sistema); solo se cita el título.
- Hala Point: "neuronas artificiales" (no equivalen a neuronas reales); es un prototipo de investigación de 2024. En pantalla se compara con el cerebro (86 000 millones con ~20 W) sin decir "más eficiente" en voz.
- La frase final es una conclusión del canal (opinión), apoyada en los números de arriba y matizada en la escena "Ojo".
- El dibujo es esquemático.
