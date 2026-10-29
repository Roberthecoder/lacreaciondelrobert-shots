# Shot IA #22 · La IA que aprendió de otra IA y terminó hablando de liebres

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #22 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N4 "La imagen que se llena" (al revés: una hoja de texto que se degrada generación por generación, con un contador de generaciones 0 → 9) + toques de N1 (por dentro de la máquina: la curva que pierde sus colas).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla: un texto lleno de liebres de colores → "no está obsesionada: es la novena generación".
- **Duración:** voz 945 caracteres / 170 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** estimados en la base.
- **Postura de la serie:** crítica con datos (un riesgo real del entrenamiento con textos de IA) y justa: se dice que acumular datos humanos evita el colapso. Analogía de la fotocopia dicha como analogía ("como una…").

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA no está obsesionada con las liebres: es la novena generación de una IA entrenada con textos de IA. Y empezó hablando de torres de iglesias. | Fondo amarillo; desde el cuadro 0 una hoja con el texto "Gen 9" que se escribe sola: "…liebres de cola negra, liebres de cola blanca, liebres de cola azul…" y liebrecitas de colores que saltan fuera de la hoja. Chip "Generación 9". Al decir "torres de iglesias", la cámara retrocede y se ve, al fondo, la hoja original (Gen 0) con una torre de iglesia dibujada. |
| 1 | Fotocopia | Como una fotocopia de una fotocopia: cada copia pierde algo. | **Analogía** (letrero chico "analogía"): una fotocopiadora saca una copia de la torre de iglesia, y de esa copia otra, y otra: cada vez más gris y borrosa. |
| 2 | Estudio | Lo probaron en Oxford y Cambridge; salió en Nature en 2024. Cada generación aprendió de los textos de la anterior. | `TarjetaEstudio`: "2024 · Nature · Shumailov, Shumaylov, Zhao, Papernot, Anderson y Gal · Oxford, Cambridge, Imperial, Toronto, Edimburgo". Luego una cadena de robotitos: robotito 0 escribe hojas → robotito 1 las lee y escribe las suyas → robotito 2… (flechas). |
| 3 | Generaciones | En la primera, ya saltaba a una Basílica de San Pedro «en Buenos Aires»; en la quinta, recitaba listas de idiomas. | Contador de generaciones avanza 1 → 5. Gen 1: hoja con la basílica y un pin en Roma y otro en Buenos Aires. Gen 5: hoja que se llena de nombres de idiomas en fila ("inglés, francés, alemán, italiano…"). Cada hoja un poco más gris (la fotocopia). |
| 4 | Liebres | Y en la novena: liebres de cola negra, blanca, azul, roja, amarilla… | Gen 9: la hoja del inicio; las liebres aparecen una por una con su cola de color (negra, blanca, azul, roja, amarilla). Cita real en inglés chiquita: "black-tailed jackrabbits, white-tailed jackrabbits, blue-tailed…". |
| 5 | Pregunta | ¿Por qué se descompone así? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Colas | Lo raro casi nunca sale en las copias: cada generación lo ve menos, hasta olvidarlo. Y se cuelan errores heredados que la primera nunca escribiría. | Fondo oscuro (por dentro de la máquina, `FondoCircuito`): una curva de campana con sus "colas" marcadas como "lo raro"; generación tras generación las colas se encogen y la campana se hace un pico angosto. Luego aparecen puntitos rojos fuera de la curva: "errores heredados". (Dibujo esquemático.) |
| 7 | Internet | Los autores advierten: si la IA llena internet, contamina los datos de las próximas IA. | Un globo "internet" se va llenando de hojas con el sello "hecho por IA"; un embudo las lleva a un robotito nuevo "próxima IA". |
| 8 | Acumular | Pero ojo: en Stanford mostraron que si guardas los textos humanos y sumas los nuevos, el colapso se evita. | `Comparativa`: izquierda "reemplazar" (cada pila nueva borra la anterior → curva de error que sube); derecha "acumular" (pilas que se suman sobre la pila humana → curva que se queda abajo). Chip "Gerstgrasser et al., Stanford, 2024". |
| 9 | Cierre | Así que esas liebres no son locura: son una IA que solo se escuchó a sí misma. | **Regreso a la imagen del inicio**: la misma hoja Gen 9 con las liebres; el robotito se mira en un espejo que lo refleja una y otra vez (copias infinitas). |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua que se va "ensuciando" (un filtro que le quita brillo) con cada generación, como si también se fotocopiara; un *clic-zumbido* de fotocopiadora en cada copia; un tic del contador en cada generación; brinquitos (boing suave) con cada liebre; un barrido grave cuando las colas de la curva se encogen; al final, en "acumular", la cama recupera su brillo.

## Fuentes (abiertas en el original el 29 oct 2026)

1. Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. y Gal, Y. "AI models collapse when trained on recursively generated data". *Nature* 631: 755–759 (publicado el 24 de julio de 2024). DOI 10.1038/s41586-024-07566-y · PMC11269175 (texto completo abierto, Europe PMC). Afiliaciones: Universidad de Oxford, Universidad de Cambridge, Imperial College London, Universidad de Toronto / Vector Institute, Universidad de Edimburgo.
   > "We find that indiscriminate use of model-generated content in training causes irreversible defects in the resulting models, in which tails of the original content distribution disappear. We refer to this effect as 'model collapse'…"
   > "We fine-tune the OPT-125m causal language model made available by Meta through Hugging Face. We fine-tune it on the wikitext2 dataset."
   > "'Real' refers to the 'model 0' trained on the original wikitext2 dataset; model 1 was trained on the data produced by model 0, model 2 was trained on data produced by model 1 and so on"
   > Example 1: "Input: some started before 1360 — was typically accomplished by a master mason and a small team of itinerant masons, supplemented by local parish labourers, according to Poyntz Wright. But other authors reject this model, suggesting instead that leading architects designed the parish church towers based on early examples of Perpendicular."
   > "Gen 1: architecture such as St. Peter's Basilica in Rome or St. Peter's Basilica in Buenos Aires. …"
   > "Gen 5: ism, which had been translated into more than 100 languages including English, French, German, Italian, Spanish, Portuguese, Dutch, Swedish, Norwegian, Polish, Hungarian, …"
   > "Gen 9: architecture. In addition to being home to some of the world's largest populations of black @-@ tailed jackrabbits, white @-@ tailed jackrabbits, blue @-@ tailed jackrabbits, red @-@ tailed jackrabbits, yellow @-."
   > "At first, the tails (low-probability events) begin to disappear as a result of the low probability of sampling them and, over time, support of the distribution shrinks."
   > Fig. 1: "Model collapse refers to a degenerative learning process in which models start forgetting improbable events over time, as the model becomes poisoned with its own projection of reality."
   > "Later generations start producing samples that would never be produced by the original model, that is, they start misperceiving reality based on errors introduced by their ancestors."
   > "the use of LLMs at scale to publish content on the Internet will pollute the collection of data to train their successors"
   > (Para la nota, no se dice en la voz) "with every new generation of training, a random 10% of the original data points is sampled… We find that preservation of the original data allows for better model fine-tuning and leads to only minor degradation of performance."

2. Gerstgrasser, M., Schaeffer, R., Dey, A., Rafailov, R., Sleight, H., Hughes, J., Korbak, T., Agrawal, R., Pai, D., Gromov, A., Roberts, D. A., Yang, D., Donoho, D. L. y Koyejo, S. "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data". arXiv:2404.01413 (v1 1 abr 2024; v2 29 abr 2024). Primer autor y la mayoría del equipo: Stanford University (también Constellation, Universidad de Maryland, MIT).
   > "We confirm that replacing the original real data by each generation's synthetic data does indeed tend towards model collapse, then demonstrate that accumulating the successive generations of synthetic data alongside the original real data avoids model collapse; these results hold across a range of model sizes, architectures, and hyperparameters."
   > "we extend this argument to prove that if data instead accumulate, the test error has a finite upper bound independent of the number of iterations, meaning model collapse no longer occurs."

## Notas
- "Una IA" = el modelo de lenguaje OPT-125m de Meta, pequeño (125 millones de parámetros), afinado con wikitext2; no es un ChatGPT. En pantalla se puede decir "modelo de lenguaje pequeño".
- El ejemplo de las liebres es la salida de la generación 9 ante el mismo texto de entrada sobre torres de iglesias parroquiales (estilo perpendicular inglés). "Jackrabbits" = liebres americanas (*Lepus*). Las salidas tienen errores desde la generación 0; el punto es cómo se alejan del tema.
- "Lo probaron en Oxford y Cambridge": los dos primeros autores son de Oxford y Cambridge; el equipo incluye también Imperial College, Toronto y Edimburgo (en la tarjeta salen todas).
- "Colas" = los eventos de baja probabilidad de la distribución ("lo raro"). La campana es esquemática.
- El matiz de Stanford es un preprint de arXiv (2024). El propio estudio de Nature también vio que guardar un 10 % de datos originales solo deja una degradación menor.
- La fotocopia es una analogía, no parte del estudio.
- El dibujo es esquemático.
