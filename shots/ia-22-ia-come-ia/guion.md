# Shot IA #22 · La IA que aprendió de otra IA y terminó hablando de liebres

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #22 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (16 ✅, 2 ⚠️ corregidas: ver `verificacion.md`), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · falta la versión de revisión sin voz (la hace GitHub) · **voz pendiente de aprobación de Robert** (~939 créditos).
- **Formato:** N4 "La imagen que se llena" (al revés: una hoja de texto que se degrada generación por generación, con un contador de generaciones 0 → 9) + toques de N1 (por dentro de la máquina: la curva que pierde sus colas).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla: un texto lleno de liebres de colores → "no está obsesionada: es la novena generación".
- **Duración:** voz 939 caracteres / 168 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** en la base.
- **Postura de la serie:** crítica con datos (un riesgo real del entrenamiento con textos de IA) y justa: se dice que acumular datos humanos evita el colapso. Analogía de la fotocopia dicha como analogía ("como una…").

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA no está obsesionada con las liebres: es la novena generación de una IA entrenada con textos de IA. Le pidieron seguir un texto sobre torres de iglesias. | Fondo amarillo; desde el cuadro 0 la hoja "Generación 9" se escribe sola ("…poblaciones de liebres de cola negra, liebres de cola blanca…", traducido del inglés) y cinco liebres de colores brincan fuera de la hoja. Al decir "torres de iglesias" la cámara retrocede: a la derecha aparece la hoja **"texto de entrada"** con una torre de iglesia de estilo Perpendicular y una flecha punteada "9 generaciones después". |
| 1 | Fotocopia | Como fotocopia de fotocopia: cada copia pierde algo. | **Analogía** (chip "analogía"): una fotocopiadora saca la hoja de la torre: "original", "copia 1", "copia 2", "copia 3", cada una más gris, borrosa y manchada. |
| 2 | Estudio | Lo probaron en Oxford y Cambridge; salió en Nature en 2024. Cada generación aprendió de los textos de la anterior. | `TarjetaEstudio` "2024 · Oxford · Cambridge · Imperial · Toronto · Edimburgo · Shumailov, Shumaylov, Zhao, Papernot, Anderson y Gal · Nature". Luego una cadena de robotitos Gen 0 → Gen 1 → Gen 2 → Gen 3… que se pasan hojas (cada uno más gris); chips "modelo pequeño: OPT-125m (Meta)" y "aprende de los textos de la anterior". |
| 3 | Generaciones | En la primera, ya saltaba a una Basílica de San Pedro «en Buenos Aires»; en la quinta, recitaba idiomas. | Chip "generación 1": hoja con la basílica y su texto ("…como la Basílica de San Pedro en Roma o la Basílica de San Pedro en Buenos Aires"); pines "Roma" y "¿Buenos Aires?". Luego "generación 5": hoja más gris que se llena de idiomas y chips "inglés, francés, alemán, italiano, español". |
| 4 | Liebres | Y en la novena: liebres de cola negra, blanca, azul, roja, amarilla… | La hoja original en inglés ("Gen 9 · original": "black-tailed jackrabbits, white-tailed jackrabbits…") y las cinco liebres que saltan una por una con su chip de color. |
| 5 | Pregunta | ¿Por qué se descompone así? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Colas | Lo raro casi no sale en las copias: cada generación lo ve menos, hasta olvidarlo. Y se cuelan errores heredados que la primera nunca escribiría. | Fondo de circuito (por dentro de la máquina): campana con sus colas rosas marcadas "lo raro"; el chip cuenta "generación 0 → 9" y la campana se vuelve un pico angosto mientras las colas desaparecen (la original queda de fantasma). Luego puntitos rojos fuera de la curva: "errores heredados". Chip "esquema". |
| 7 | Internet | Los autores advierten: si la IA llena internet, contamina los datos de las próximas IA. | Globo "internet" que se llena de hojitas con sello "IA"; flecha punteada a un robotito gris "próxima IA". |
| 8 | Acumular | Pero ojo: en Stanford vieron que si guardas los textos humanos y sumas los nuevos, el colapso se evita. | Dos columnas: "reemplazar" (una sola pila que pasa de "humanos" a "IA gen 4", cada vez más gris → "colapsa ✗") y "acumular" (pila "humanos" + IA gen 1…4 encima → "no colapsa ✔"). Chip "Gerstgrasser et al. · Stanford · 2024". |
| 9 | Cierre | Esas liebres no son locura: son una IA que aprendió de copias de copias de otra IA. | **Regreso a la imagen del inicio**: la misma hoja "Generación 9", ya gris, con las liebres; un robotito frente a un espejo que lo repite cada vez más chico y gris; chip "copias de copias". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua que se va "ensuciando" (un filtro que le quita brillo) con cada generación, como si también se fotocopiara; un *clic-zumbido* de fotocopiadora en cada copia; un tic del contador en cada generación; brinquitos (boing suave) con cada liebre; un barrido grave cuando las colas de la curva se encogen; al final, en "acumular", la cama recupera su brillo.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Por qué se descompone así?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «no está obsesionada con las liebres» (cuadro 0) |
| 2 | 10.1 | 12.9 | 06_pensativo_menton | `arriba-der` | «fotocopia de fotocopia» |
| 3 | 17.0 | 19.9 | 13_senalando_arriba | `izq-alto` | señala la cadena de generaciones |
| 4 | 20.9 | 26.2 | 04_bajando_lentes | `izq-alto` | «San Pedro en Buenos Aires» |
| 5 | 27.0 | 30.5 | 05_sonriendo_dientes_uniformes | `arriba-der` | las liebres de colores |
| 6 | 30.7 | 33.7 | 07_pensativo_puno | `grande` | «¿Por qué se descompone así?» |
| 7 | 38.0 | 41.1 | 10_serio_molesto | `izq-alto` | «errores heredados» |
| 8 | 42.1 | 46.4 | 12_perfil_serio | `arriba-der` | «contamina los datos de las próximas IA» |
| 9 | 50.2 | 52.6 | 13_senalando_arriba | `izq-alto` | «el colapso se evita» |
| 10 | 53.2 | 57.8 | 11_sorprendido | `arriba-der` | «copias de copias de otra IA» |
| — | 57.9 | 61.4 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 36.5 s (+ cierre 3.5 s) · poses distintas 8 (nunca la misma dos veces seguidas) · total 61.4 s

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
   > (Para la nota; no se dice en la voz) "with every new generation of training, a random 10% of the original data points is sampled… We find that preservation of the original data allows for better model fine-tuning and leads to only minor degradation of performance."

2. Gerstgrasser, M., Schaeffer, R., Dey, A., Rafailov, R., Sleight, H., Hughes, J., Korbak, T., Agrawal, R., Pai, D., Gromov, A., Roberts, D. A., Yang, D., Donoho, D. L. y Koyejo, S. "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data". arXiv:2404.01413 (v1 1 abr 2024; v2 29 abr 2024). Primer autor y la mayoría del equipo: Stanford University (también Constellation, Universidad de Maryland, MIT).
   > "We confirm that replacing the original real data by each generation's synthetic data does indeed tend towards model collapse, then demonstrate that accumulating the successive generations of synthetic data alongside the original real data avoids model collapse; these results hold across a range of model sizes, architectures, and hyperparameters."
   > "we extend this argument to prove that if data instead accumulate, the test error has a finite upper bound independent of the number of iterations, meaning model collapse no longer occurs."

## Notas
- "Una IA" = el modelo de lenguaje OPT-125m de Meta, pequeño (125 millones de parámetros), afinado con wikitext2; no es un ChatGPT. En pantalla se puede decir "modelo de lenguaje pequeño".
- El ejemplo de las liebres es la salida de la generación 9 ante el mismo texto de entrada sobre torres de iglesias parroquiales (estilo perpendicular inglés). "Jackrabbits" = liebres americanas (*Lepus*). Las salidas tienen errores desde la generación 0; el punto es cómo se alejan del tema.
- "Le pidieron seguir un texto sobre torres de iglesias": las torres son el **texto de entrada** que recibieron todas las generaciones (corrección del verificador); la hoja de la torre se rotula "texto de entrada", no "Gen 0".
- "Lo probaron en Oxford y Cambridge": los dos primeros autores son de Oxford y Cambridge; el equipo incluye también Imperial College, Toronto y Edimburgo (en la tarjeta salen todas).
- "Colas" = los eventos de baja probabilidad de la distribución ("lo raro"). La campana es esquemática.
- El matiz de Stanford es un preprint de arXiv (2024). El propio estudio de Nature también vio que guardar un 10 % de datos originales solo deja una degradación menor.
- La fotocopia es una analogía, no parte del estudio.
- El dibujo es esquemático.
