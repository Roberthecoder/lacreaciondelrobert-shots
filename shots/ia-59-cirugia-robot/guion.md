# Shot IA #59 · El robot que cosió un intestino (y quién lo vigilaba)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #59 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía. Voz pendiente de aprobación de Robert.
- **Formato:** N3 "Capítulos y medidores" (1 · planea, 2 · cose, 3 · la prueba, 4 · lo que falta; medidor de 3 mm entre puntadas y cronómetro 62 vs 26 min).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: «Esas puntadas no las hizo un cirujano: las hizo un robot».
- **Duración:** voz 954 caracteres / ~168 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** estimado.
- **Postura de la serie:** la defendemos y la criticamos con datos. Se dice lo que logró (puntadas más parejas en tejido de práctica) y lo que no (una de cada tres puntadas corregida por una persona, más lento, solo animales y órganos fuera del cuerpo, siempre con supervisión humana). Ningún dato en humanos.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esas puntadas no las hizo un cirujano: las hizo un robot, en el intestino de un cerdo vivo. | Fondo menta; desde el cuadro 0 dos extremos de intestino (tubo rosa) y una aguja curva que da la primera puntada. Un cirujano dibujado se tacha (MitoTachado) y entra el brazo robótico STAR con la aguja. Chip "cerdo vivo · 2022". |
| 1 | Planea | Se llama STAR: ve el tejido en tres dimensiones, sigue cómo se mueve al respirar y planea cada puntada. | Capítulo "1 · planea". Fondo oscuro "dentro de la máquina": malla 3D del intestino que sube y baja (respiración); puntos de plan que aparecen uno a uno. |
| 2 | Cose | Una persona aprueba el plan y cada disparo de la aguja, y el robot cose: una puntada cada tres milímetros. | Capítulo "2 · cose". Una mano/persona con un botón ✔ "aprobar"; el robot cose; regla con medidor "3 mm" entre puntadas. |
| 3 | Estudio | Fue en Johns Hopkins, en 2022, con cuatro cerdos; a la semana revisaron cómo sanaron. | TarjetaEstudio "2022 · Johns Hopkins · Saeidi, Krieger y col. · Science Robotics"; 4 cerditos; calendario "1 semana". |
| 4 | Parejas | En intestino de práctica, sus puntadas salieron más parejas que las de cirujanos expertos. | Capítulo "3 · la prueba". Dos filas de puntadas en un intestino de práctica: las de cirujanos (separación dispareja) y las de STAR (pareja). Etiqueta "intestino de práctica (no es de animal)". |
| 5 | Pregunta | ¿Entonces ya te puede operar un robot solo? | **Re-gancho.** "?" gigante sobre una cama de quirófano; Robert grande. |
| 6 | Falla | Todavía no. En los cerdos, una de cada tres puntadas tuvo que corregirla una persona. Y tardó sesenta y dos minutos; un cirujano, veintiséis. | Fila de 86 puntadas: 29 se marcan en rojo con una manita (≈ 1 de cada 3). Luego dos cronómetros: "STAR 62 min" contra "cirujano 26 min". |
| 7 | Vesicula | En 2025, otro robot aprendió con unas diecisiete horas de demostraciones y, en ocho vesículas de cerdo, engrapó y cortó sus tubos sin ayuda humana. | Tarjeta "2025 · Johns Hopkins y Stanford · SRT-H"; "17 h de demostraciones"; 8 vesículas (fuera del cuerpo) que se palomean: grapas + tijera en dos tubos. |
| 8 | Falta | Pero eran órganos fuera del cuerpo: falta probarlo con sangrado y movimiento. | Capítulo "4 · lo que falta". Charola con la vesícula "ex vivo" → lista: gotita de sangre, respiración/movimiento con signo de pendiente. |
| 9 | Cierre | Sí: esas puntadas las hizo un robot… con una persona al lado, vigilando. | **Regreso a la imagen del inicio**: el mismo intestino cosido, ahora con el brazo STAR y, al lado, una persona frente a la pantalla vigilando ✔. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, tipo monitor de quirófano suave; "bip" de monitor en el gancho; cada puntada con un "clic" corto; zumbido del escáner 3D; botón "aprobar"; tic-tac de los cronómetros; dos "clac" de grapa y un tijeretazo por cada vesícula; acorde que se abre en el cierre.

## Fuentes (abiertas en el texto completo el 29 oct 2026)

1. Saeidi, H., Opfermann, J. D., Kam, M., Wei, S., Leonard, S., Hsieh, M. H., Kang, J. U. y Krieger, A. "Autonomous robotic laparoscopic surgery for intestinal anastomosis". *Science Robotics* 7(62): eabj2908 (26 ene 2022). DOI 10.1126/scirobotics.abj2908 · manuscrito del autor en PMC8992572 (leído completo con la API de NCBI). Johns Hopkins University + Children's National Hospital.
   > "we achieve the enhanced autonomy necessary to perform robotic laparoscopic anastomosis of the small bowel using the Smart Tissue Autonomous Robot (STAR)." (2022)
   > "detecting the breathing motion of tissue and its deformations and notifying the operator to initiate a replanning step … suture planning in different modes … synchronizing the robot tool with breathing motions of the tissue" (2022) — y "plenoptic three-dimensional (3D) camera" / "detect the 3D shape of the tissue".
   > "The operator selects among the autonomously suggested suture plans or approves a re-planning step and monitors the robot for repeating a stitch as needed." (2022)
   > "we increased the safety measures by adding to the number of tasks that the operator was required to monitor and intervene … This included an additional number of human interventions for initial robot position fine-tuning (before the first suture) and approval of firing the needle." (2022, in vivo)
   > "A target suture spacing of 3 mm was selected" · "statistically similar to the 3.0 mm spacing suggested by the uniform suture plan" (2022)
   > "laparoscopic autonomous surgery was performed in vivo on porcine small bowel using STAR (n = 4 independent animals). After surgery, the animals were monitored for a one-week survival period, and subject to limited necropsy to compare the healed anastomosis to a laparoscopic control (n = 1)" (2022)
   > (fantoma) "the coefficient of variance for LAP, RAS, and STAR was 45.37%, 41.42%, and 26.36% respectively, which indicated higher consistency of STAR compared to LAP (P<0.0001) and RAS (P<0.0001)." · Bite depth: "54.41%, 32.57%, and 29.99% respectively, indicating that STAR is more consistent in bite depth than LAP (P < 0.0001) and similar to RAS (P = 0.2611)". "LAP and RAS data was collected from four different surgeons". Abstract: "our system outperforms expert surgeons' manual technique and RAS technique in terms of consistency and accuracy." (2022)
   > (in vivo) "In all four in vivo tests, STAR completed a total of 86 stitches (8 knots, 78 running stitches). The total number of sutures requiring manual adjustments were 29 (66.28% correctly placed stitches in the first attempt)" (2022)
   > "The average task completion time for STAR was 62.03 ± 5.32 minutes compared to 25.6 minutes for the control." (2022)
   > Limitaciones: "the comparison between the STAR robot, manual laparoscopic surgery, and tele-operated da Vinci was performed on phantom tissue" · "Although the role of human supervision cannot be eliminated in the complex and unpredictable surgical scenarios…" (2022)

2. Kim, J. W., Chen, J.-T., Hansen, P., Shi, L. X., Goldenberg, A., Schmidgall, S., Scheikl, P. M., Deguet, A., White, B. M., Tsai, D. R., Cha, R., Jopling, J., Finn, C. y Krieger, A. "SRT-H: A hierarchical framework for autonomous surgery via language-conditioned imitation learning". *Science Robotics* (julio de 2025). DOI 10.1126/scirobotics.adt5254 · preprint arXiv:2505.10251 (PDF leído completo). Johns Hopkins + Stanford (+ Optosurgical).
   > Resumen (Science Robotics, 2025): "We validated our framework through ex vivo experiments on cholecystectomy … Our method achieves a 100% success rate across eight different ex vivo gallbladders, operating fully autonomously without human intervention."
   > arXiv: "To train and evaluate our system, we collect 16,000 trajectories (approximately 17 hours of data) across 34 ex-vivo porcine gallbladders. We then test SRT-H on eight unseen gallbladders, and in each case, the system successfully completed all 17 required tasks autonomously" (2025)
   > arXiv: "The autonomous surgical steps include clipping and cutting the gallbladder's artery and duct." · "This duration excludes the time of reloading the clips and making tool changes performed by the operator." (2025)
   > arXiv, Limitaciones: "Translating from ex-vivo to in-vivo brings several challenges, such as operating in the surgical site, addressing bleeding and tissue motion" (2025)

## Notas
- "Una de cada tres" = 29 de 86 puntadas en los cerdos necesitaron ajuste manual (33.7 %; 66.28 % salieron bien al primer intento).
- "Más parejas que las de cirujanos expertos" = en tejido de práctica (fantoma), la separación entre puntadas varió 26 % con STAR contra 45 % (a mano) y 41 % (con robot da Vinci manejado por cirujanos); cuatro cirujanos. En profundidad de la puntada fue más pareja que a mano y similar al da Vinci. En los cerdos solo hubo 1 control manual: por eso la comparación "más parejas" se dice en tejido de práctica.
- "Sesenta y dos minutos; un cirujano, veintiséis" = 62.03 min promedio de STAR contra 25.6 min del único control laparoscópico manual.
- "Cada disparo de la aguja": en los cerdos, el operador aprobaba el disparo de la aguja ("approval of firing the needle").
- SRT-H: "engrapó y cortó sus tubos" = puso clips y cortó el conducto y la arteria de la vesícula (fase de clipado y corte de la colecistectomía, no la operación completa). "Sin ayuda humana" = sin intervención humana; el operador sí recargaba los clips y cambiaba herramientas (eso se puede aclarar en pantalla con letra chica). "Unas diecisiete horas de demostraciones" = 16,000 trayectorias (~17 h de datos) en 34 vesículas.
- Ninguno de los dos estudios se hizo en personas. No se afirma nada sobre uso clínico actual.
- El dibujo es esquemático.
