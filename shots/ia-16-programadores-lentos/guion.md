# Shot IA #16 · Creían que la IA los hacía más rápidos: tardaron 19 % más

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #16 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía. **Voz pendiente de aprobación de Robert.**
- **Formato:** N2 "El número" (sentido +20 % contra reloj −19 %) con un mito tachado ("la IA siempre te hace más rápido") y un consejo útil (medir, no sentir).
- **Gancho (de los 7):** #4 "Un número que contradice": se sintieron 20 % más rápidos y tardaron 19 % más.
- **Duración:** voz 954 caracteres / ≈170 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimados en la base.
- **Postura de la serie:** ni anti-IA ni pro-IA. Es UN estudio de 2025, con sus límites dichos por los propios autores; se contrasta con el de Copilot (2023, a favor) y con la actualización de METR de 2026 (probablemente ya más rápido). La lección es de método: medir con reloj, no con sensación.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Programadores expertos sintieron que la IA los hizo veinte por ciento más rápidos. En realidad, tardaron diecinueve por ciento más. | Fondo menta; desde el cuadro 0 una programadora en su laptop con el robotito al lado y una flecha verde "+20 % más rápido (lo que sintieron)" que sube; entra un cronómetro gigante, la flecha se voltea roja: "19 % más tiempo". |
| 1 | Apuesta | Antes, apostaban a ir veinticuatro por ciento más rápido. | Barras: "antes: esperaban −24 % de tiempo" · "después: creían −20 %" · "reloj: +19 %" (la tercera crece hacia el otro lado). |
| 2 | Estudio | Lo midió el laboratorio METR en 2025: dieciséis expertos en sus propios proyectos, doscientas cuarenta y seis tareas reales. | Tarjeta "2025 · METR · Becker, Rush, Barnes y Rein · arXiv 2507.09089"; 16 caritas de programadores; contador de 246 tareas (bugs, funciones). |
| 3 | Sorteo | A cada tarea le tocó al azar: con IA o sin IA. Y grabaron sus pantallas. | Una moneda/ruleta reparte tareas a dos columnas "con IA" / "sin IA"; ícono REC rojo sobre las pantallas. |
| 4 | Pregunta | ¿Cómo te sientes más rápido si vas más lento? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Pantalla | Con IA, parte del tiempo se iba en pedirle cosas, esperarla y revisar lo que hacía. Aceptaron menos de la mitad de lo que les propuso. | Fondo oscuro "dentro de la pantalla": barra de tiempo que se reparte en "programar" / "pedirle" / "esperar ⏳" / "revisar"; luego sugerencias de código que caen y menos de la mitad reciben ✔ ("< 44 % aceptado"). |
| 6 | Matices | Ojo: eran expertos en proyectos enormes que conocen de memoria; los autores aclaran que no vale para todos. | Chip "5 años en su proyecto · repositorios de +1 millón de líneas"; letrero "no aplica a todos" con lupa. |
| 7 | Contraste | En 2023, un estudio con Copilot vio lo contrario: una tarea sencilla salió cincuenta y seis por ciento más rápido. | Tarjeta "2023 · Peng et al. · Copilot · servidor HTTP en JavaScript"; barras 161 min sin IA vs 71 min con IA (−55.8 %). |
| 8 | Giro | En 2026, METR dijo que con herramientas nuevas quizá ya van más rápido, pero no pudo medirlo bien. | Calendario a 2026; flecha con "?" que apunta a "más rápido"; chip "datos poco confiables". |
| 9 | Cierre | La lección no es usarla o no: es medir con el reloj, no con la sensación. | **Regreso a la imagen del inicio**: la misma programadora, ahora con el cronómetro junto a la laptop; la flecha "lo que sentí" se tacha y queda "lo que medí ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; tictac de cronómetro en el gancho y cuando aparece el reloj; la flecha que se voltea con un "zumbido" descendente; las 246 tareas como tecleo rápido; la moneda del sorteo tintinea; un "ding" corto por cada sugerencia aceptada y un "bloop" por cada rechazada; el sello final de "medido ✔".

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Becker, J., Rush, N., Barnes, E. y Rein, D. (METR). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity". arXiv:2507.09089 (v1 12 jul 2025; v2 25 jul 2025). Texto completo (PDF v2) leído.
   > "16 developers with moderate AI experience complete 246 tasks in mature projects on which they have an average of 5 years of prior experience. Each task is randomly assigned to allow or disallow usage of early-2025 AI tools."
   > "Before starting tasks, developers forecast that allowing AI will reduce completion time by 24%. After completing the study, developers estimate that allowing AI reduced completion time by 20%. Surprisingly, we find that allowing AI actually increases completion time by 19%—AI tooling slowed developers down."
   > "This slowdown also contradicts predictions from experts in economics (39% shorter) and ML (38% shorter)."
   > "use AI tools considered state-of-the-art during February–June 2025 (primarily Cursor Pro with Claude 3.5/3.7 Sonnet). We collect screen recordings as they work"
   > "When allowed to use AI, developers spend a smaller proportion of their time actively coding and reading/searching for information. Instead, they spend time reviewing AI outputs, prompting AI systems, and waiting for AI generations."
   > "When using Cursor, developers accept <44% of the generations." (nota 13: excluye a 3 desarrolladores sin datos de Cursor)
   > "Repositories average 10 years old with >1,100,000 lines of code" · "Developers average 5 years experience and 1,500 commits on repositories"
   > "many of the factors we find evidence for contributing to slowdown are specific to the setting we study—these results do not imply that current AI systems are not useful in many realistic, economically relevant settings."
2. METR, entrada de blog del estudio (10 jul 2025): https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
   > "developers expected AI to speed them up by 24%, and even after experiencing the slowdown, they still believed AI had sped them up by 20%."
   > "We do not claim that our developers or repositories represent a majority or plurality of software development work"
   > (aviso añadido en 2026) "⚠️ These results are out of date. … We believe these historical results no longer reflect the current impact of AI models on open-source developer productivity."
3. METR, "We are Changing our Developer Productivity Experiment Design" (24 feb 2026): https://metr.org/blog/2026-02-24-uplift-update/
   > "Based on conversations with study participants, we believe it is likely that developers are more sped up from AI tools now — in early 2026 — compared to our estimates from early 2025. However, because of the selection effects in our experiment, our data is only very weak evidence for the size of this increase."
   > "we believe that the data from our new experiment gives us an unreliable signal of the current productivity effect of AI tools."
   > "Our early 2025 study found the use of AI causes tasks to take 19% longer, with a confidence interval between +2% and +39%."
4. Peng, S., Kalliamvakou, E., Cihon, P. y Demirer, M. "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot". arXiv:2302.06590 (13 feb 2023). Microsoft Research, GitHub y MIT Sloan. Experimento de mayo–junio de 2022 con 95 programadores.
   > "Recruited software developers were asked to implement an HTTP server in JavaScript as quickly as possible. The treatment group, with access to the AI pair programmer, completed the task 55.8% faster than the control group."
   > "Conditioning on completing the task, the average completion time from the treated group is 71.17 minutes and 160.89 minutes for the control group. This represents a 55.8% reduction in completion time." (IC 95 %: "[21%, 89%]")
   > "both treated and control groups estimated a 35% increase in productivity, which is an underestimation compared with the 55.8% increase in their revealed productivity."
   > (METR describe esa tarea como "a very basic HTTP server").

## Notas
- "Veinte por ciento más rápidos" = estimación posterior de los propios participantes (reducción de 20 % del tiempo). "Diecinueve por ciento más" = aumento estimado del tiempo de terminación con IA permitida (IC 95 %: +2 % a +39 %). "Veinticuatro por ciento" = su pronóstico antes de empezar.
- "Con años en sus propios proyectos" → promedio de 5 años de experiencia en el repositorio. "Expertos": el paper los llama "experienced open-source developers".
- "Parte del tiempo se iba en pedirle cosas, esperarla y revisar" = proporción del tiempo en grabaciones etiquetadas (74 grabaciones válidas, 84 h de video), no el total de tareas.
- "Menos de la mitad" redondea "<44 %" de sugerencias aceptadas en Cursor (13 de los 16 desarrolladores).
- "Cincuenta y seis por ciento" redondea 55.8 % (Peng et al.). Es de 2023 (experimento de 2022) y se dice. Era una tarea de laboratorio sencilla, no un proyecto real.
- "No pudo medirlo bien" resume la actualización de 2026: METR considera sus datos nuevos poco confiables por sesgos de selección. "Quizá" = ellos dicen "likely", sin poder medir cuánto.
- El laboratorio METR (Model Evaluation and Threat Research) es una organización sin fines de lucro (metr.org/about). No se dice la ciudad porque no la encontré en su sitio.
- No se generaliza: un estudio, 16 personas, un tipo de trabajo (proyectos grandes y maduros de código abierto), herramientas de principios de 2025.
- El dibujo es esquemático.
