# Shot IA #59 · El robot que cosió un intestino (y quién lo vigilaba)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #59 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (21 ✅ y 5 ⚠️ corregidos según `verificacion.md`), animación, Robert en pantalla, música y `publicacion.md` listos · falta la versión de revisión sin voz (la renderiza GitHub) · **voz pendiente de aprobación de Robert** (~954 créditos).
- **Formato:** N3 "Capítulos y medidores" (1 · planea, 2 · cose, 3 · la prueba, 4 · lo que falta; medidor de 3 mm entre puntadas y cronómetro 62 vs 26 min).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: «Esas puntadas no las hizo un cirujano: las hizo un robot».
- **Duración:** voz 954 caracteres / ~166 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base (suma de `OM_SCENES`).
- **Postura de la serie:** la defendemos y la criticamos con datos. Se dice lo que logró (puntadas más parejas en tejido de práctica) y lo que no (una de cada tres puntadas corregida por una persona, más lento, solo animales y órganos fuera del cuerpo, siempre con supervisión humana). Ningún dato en humanos.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esas puntadas no las hizo un cirujano: las hizo un robot, en el intestino de un cerdo vivo. | Fondo menta; desde el cuadro 0 los dos extremos de intestino se juntan y aparecen las puntadas. Chip «lo cosió un cirujano» que se tacha; entra el brazo STAR con su aguja curva. Chip «cerdo vivo · Science Robotics 2022». |
| 1 | Planea | Se llama STAR: ve el tejido en tres dimensiones, lo sigue al respirar y planea cada puntada. | Capítulo «1 · planea». Fondo de circuito: malla 3D del intestino que sube y baja, onda de respiración, chips «cámara 3D», «sigue la respiración», y los puntos amarillos del «plan de puntadas». |
| 2 | Cose | Una persona aprueba el plan y cada disparo de la aguja; el robot cose una puntada cada tres milímetros. | Capítulo «2 · cose». Cirujana con monitor: el botón «aprobar» pasa a «✔ OK»; chips «una persona aprueba» → «y cada disparo de la aguja»; el brazo cose 7 puntadas; regla «3 mm» y chip «1 puntada cada 3 mm». |
| 3 | Estudio | Lo publicó en 2022 un equipo de Johns Hopkins: cuatro cerdos operados y revisados a la semana. | TarjetaEstudio «2022 · Johns Hopkins y Children's National · Saeidi, Krieger y col. · Science Robotics»; 4 cerditos; chip «4 cerdos · revisión a la semana». |
| 4 | Parejas | En intestino de práctica, separó sus puntadas más parejo que cirujanos expertos. | Capítulo «3 · la prueba». Chip «intestino de práctica (no es de animal)»; dos filas: «cirujanos expertos» (separación dispareja) y «STAR» (pareja); chip «variación de la separación: a mano 45 % · STAR 26 %». |
| 5 | Pregunta | ¿Ya te puede operar un robot solo? | **Re-gancho.** Lámpara de quirófano y «?» gigante; Robert grande. |
| 6 | Falla | Todavía no: en los cerdos, una de cada tres puntadas la corrigió una persona. / Y tardó sesenta y dos minutos; un cirujano, veintiséis. | Capítulo «4 · lo que falla». Rejilla de 86 puntadas: 29 se ponen rojas (contador «corregidas por una persona: 29 de 86»). Luego barras «tiempo de la operación · en los cerdos»: STAR 62 min, un cirujano 26 min. |
| 7 | Vesicula | En 2025, otro robot aprendió con unas diecisiete horas de demostraciones y, en ocho vesículas de cerdo, puso clips y cortó sus tubos él solo; una persona solo recargaba los clips. | Capítulo «5 · 2025: otro robot». Tarjeta «2025 · Johns Hopkins y Stanford · SRT-H · Kim, Finn, Krieger y col. · Science Robotics»; chip «aprendió con ≈ 17 h de demostraciones»; 8 vesículas «fuera del cuerpo»: a cada una le salen 3 clips por tubo, un corte y una palomita; chips «clips + tijera, él solo» → «una persona solo recargaba los clips». |
| 8 | Falta | Pero eran órganos fuera del cuerpo: falta probarlo con sangrado y movimiento. | Capítulo «6 · lo que falta». Vesícula en charola «fuera del cuerpo (ex vivo)»; chips «falta: con sangrado ⏳», «falta: tejido que se mueve ⏳», «en estos estudios: ninguna persona operada». |
| 9 | Cierre | Sí: esas puntadas las hizo un robot… con una persona al lado, vigilando. | **Regreso a la imagen del inicio**: el mismo intestino cosido con el brazo STAR, y ahora entra la cirujana con su monitor «vigilando»; chip «robot + persona vigilando ✔». |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, tipo monitor de quirófano suave; "bip" de monitor en el gancho; cada puntada con un "clic" corto; zumbido del escáner 3D; botón "aprobar"; tic-tac de los cronómetros; dos "clic" metálicos de clip, un tijeretazo y una notita por cada vesícula; acorde que se abre en el cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Ya te puede operar un robot solo?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «las hizo un robot» (cuadro 0) |
| 2 | 7.7 | 10.9 | 06_pensativo_menton | `arriba-der` | «lo sigue al respirar y planea cada puntada» |
| 3 | 14.1 | 17.1 | 13_senalando_arriba | `izq-alto` | señala la puntada «cada tres milímetros» |
| 4 | 20.3 | 22.8 | 05_sonriendo_dientes_uniformes | `arriba-der` | los cuatro cerditos |
| 5 | 25.0 | 27.8 | 04_bajando_lentes | `arriba-der` | «más parejo que cirujanos expertos» |
| 6 | 28.0 | 31.4 | 07_pensativo_puno | `grande` | «¿Ya te puede operar un robot solo?» |
| 7 | 32.2 | 34.7 | 10_serio_molesto | `arriba-der` | «una de cada tres puntadas la corrigió una persona» |
| 8 | 36.3 | 38.2 | 11_sorprendido | `arriba-der` | «sesenta y dos minutos; un cirujano, veintiséis» |
| 9 | 43.9 | 48.7 | 13_senalando_arriba | `arriba-der` | señala las 8 vesículas y «una persona solo recargaba los clips» |
| 10 | 49.4 | 53.4 | 12_perfil_serio | `arriba-der` | «falta probarlo con sangrado y movimiento» |
| 11 | 54.0 | 57.9 | 05_sonriendo_dientes_uniformes | `izq-alto` | «con una persona al lado, vigilando» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 11 · ≈ 36.8 s (+ cierre 3.5 s) · poses distintas 8 (nunca la misma dos veces seguidas) · total 61.5 s

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
- "Lo publicó en 2022": 2022 es el año de publicación (26 ene 2022); las cirugías en cerdos se hicieron en Children's National Hospital (Washington), con equipo de Johns Hopkins.
- "Una de cada tres" = 29 de 86 puntadas en los cerdos necesitaron ajuste manual (33.7 %; 66.28 % salieron bien al primer intento).
- "Separó sus puntadas más parejo que cirujanos expertos" = en tejido de práctica (fantoma), la separación entre puntadas varió 26 % con STAR contra 45 % (a mano) y 41 % (con robot da Vinci manejado por cirujanos); cuatro cirujanos. En profundidad de la puntada fue más pareja que a mano y similar al da Vinci. En los cerdos solo hubo 1 control manual: por eso la comparación se dice en tejido de práctica, y solo de la separación.
- "Sesenta y dos minutos; un cirujano, veintiséis" = 62.03 min promedio de STAR contra 25.6 min del único control laparoscópico manual.
- "Cada disparo de la aguja": en los cerdos, el operador aprobaba el disparo de la aguja ("approval of firing the needle").
- SRT-H: "puso clips y cortó sus tubos" = puso clips y cortó el conducto y la arteria de la vesícula (fase de clipado y corte de la colecistectomía, no la operación completa). "Él solo" = "without human intervention"; una persona solo recargaba los clips y cambiaba la herramienta (se dice en la voz y en pantalla). "Unas diecisiete horas de demostraciones" = 16,000 trayectorias (~17 h de datos) en 34 vesículas.
- Ninguno de los dos estudios se hizo en personas. No se afirma nada sobre uso clínico actual.
- El dibujo es esquemático.
