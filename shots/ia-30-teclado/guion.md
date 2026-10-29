# Shot IA #30 · Tu teclado aprende de ti sin llevarse lo que escribes

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #30 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** FASE A: guion escrito, falta la verificación independiente. Todavía sin animación. (Sustituye al tema descartado de las conspiraciones.)
- **Formato:** N1 "Por dentro": macro (tu mano escribe en el celular) → micro (adentro del celular: el modelo, la actualización cifrada, el servidor que promedia) → macro (la misma pantalla, ya transformada).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": «Tu teclado no manda lo que escribes: manda lo que aprendió de ti».
- **Duración:** voz 956 caracteres / ~172 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** estimados en la base.
- **Postura de la serie:** defensa con datos (una forma de entrenar IA que cuida más tu privacidad) **y** crítica (no es privacidad perfecta: ataques de laboratorio y la confianza en el servidor, dicha por los propios autores).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Hay teclados que no mandan lo que escribes: mandan lo que aprendieron de ti. | Fondo amarillo; desde el cuadro 0 una mano tecleando en un celular grande. Una burbuja de chat intenta salir volando y se queda (candadito); en su lugar sale volando un paquetito con brillitos. |
| 1 | Prediccion | Escribes «te quiero» y te sugiere «mucho». La calcula un modelo en tu celular. | Zoom a la barra de sugerencias: «te quiero» → «mucho» · «y» · «también» (ejemplo ilustrativo, como la Fig. 1 del paper con "I love you"). Lupa rayos X: adentro del celular, una red neuronal chiquita (`RedNeuronal`). |
| 2 | Estudia | Cargando, sin usarse y con wifi, tu celular entrena ese modelo con lo que escribiste. | Íconos que se encienden uno por uno: 🔌 cargando · 💤 sin usarse · wifi. Fondo oscuro "por dentro": la red se ilumina con las frases que se quedan dentro. |
| 3 | Paquete | Resume el cambio en una actualización chiquita y cifrada. Tus frases no salen. | Las conexiones que cambiaron se comprimen en un paquetito con candado; las burbujas de texto se quedan detrás de una puerta. |
| 4 | Promedio | El servidor promedia las de cientos de celulares y les regresa un modelo mejor. | Vista de lejos: muchos celulares mandan paquetitos a un servidor; se mezclan en un "promedio" y baja un modelo nuevo a todos. |
| 5 | Pregunta | ¿Y aprende igual de bien sin ver tus mensajes? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Estudio | Google lo probó en 2018 con Gboard: un millón y medio de celulares y seiscientos millones de frases. | `TarjetaEstudio`: "2018 · Google · Hard et al. · Gboard"; contadores "1.5 millones de celulares" y "600 millones de frases". |
| 7 | Resultado | Y atinó igual o un poco más que un modelo entrenado con textos en sus servidores. | `Comparativa` de barras (aciertos de la primera sugerencia): servidor 16.5 % vs. federado 16.4 % (con textos del servidor) y 15.0 % vs. 15.8 % (con textos del celular); chip "igual o un poco mejor". |
| 8 | Apple | En 2017 Apple contó que, si aceptas compartir, el iPhone revuelve al azar sus datos antes de contar qué emojis usas. | Un celular genérico (sin logo de marca) con fila de emojis; los datos pasan por un "dado" que los revuelve antes de salir. |
| 9 | Matiz | Pero no es privacidad perfecta: en 2019, en el MIT, reconstruyeron frases a partir de cambios parecidos de un modelo, en pruebas de laboratorio. | Fondo de circuito; de un paquetito se van "armando" letras de una frase (ilustrativa); chip "en laboratorio". |
| 10 | Cierre | Así, tus frases se quedan en tu celular. Lo que viaja es lo que aprendió. | **Regreso a la imagen del inicio**: la misma mano y el mismo celular; la burbuja se queda adentro con su candado y el paquetito con brillitos sale volando. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y suave; cada tecla un clic suave; la red se enciende con notas ascendentes; el candado hace "clac"; los paquetitos salen con un "fiu"; en el promedio, muchas notas se juntan en un acorde; en "Matiz" la cama se oscurece; en el cierre vuelve el clic del inicio.

## Fuentes (abiertas el 29 oct 2026)

1. Hard, A., Rao, K., Mathews, R., Ramaswamy, S., Beaufays, F., Augenstein, S., Eichner, H., Kiddon, C. y Ramage, D. "Federated Learning for Mobile Keyboard Prediction". Google LLC, Mountain View. arXiv:1811.03604 (v1 del 8 nov 2018; v2 del 28 feb 2019, PDF leído completo). https://arxiv.org/abs/1811.03604
   > "We train a recurrent neural network language model using a distributed, on-device learning framework called federated learning for the purpose of next-word prediction in a virtual keyboard for smartphones." (2018)
   > "On-device inference is supported by TensorFlow Lite."
   > "Fig. 1. Next word predictions in Gboard. Based on the context "I love you", the keyboard predicts "and", "too", and "so much"."
   > "the clients are only allowed to participate if they are charging, connected to an un-metered network, and idle."
   > "Data for the federated training … are stored in local caches on Gboard client devices. … each client cache stores text belonging to the device owner"
   > "Instead of uploading data to servers for centralized training, clients process their local data and share model updates with the server. Weights from a large population of clients are aggregated by the server and combined to create an improved global model."
   > "Between 100 and 500 client updates are required to close each round of federated training in Gboard."
   > "The federated CIFG converges after 3000 training rounds, over the course of which 600 million sentences are processed by 1.5 million clients. Training typically takes 4-5 days."
   > Tabla 3 (textos del servidor), top-1 recall: "Server CIFG 16.5% · Federated CIFG 16.4%". Tabla 4 (textos de los celulares): "Server CIFG 15.0 ± 0.5 · Federated CIFG 15.8 ± 0.3". "the federated CIFG improves the top-1 recall by a relative 5% (0.8% absolute) with respect to the server-trained CIFG. Comparisons on server-hosted logs data show the recall of the two models is comparable" · "Table 5 shows that the federated CIFG improves the top-1 and top-3 prediction impression recall by 1% relative to the server CIFG for real Gboard users."
   > Modelo de servidor: "relies on data logged from Gboard users who have opted to share snippets of text while typing in Google apps."
   > Matiz de los propios autores: "The federated learning procedure discussed here requires users to trust that the aggregation server will not scrutinize individual weight uploads."
2. McMahan, B. y Ramage, D. "Federated Learning: Collaborative Machine Learning without Centralized Training Data". Blog de Google Research, 6 abr 2017. https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/
   > "your device downloads the current model, improves it by learning from data on your phone" … "summarizes the changes as a small focused update." · "Only this update to the model is sent to the cloud, using encrypted communication" · "All the training data remains on your device, and no individual updates are stored in the cloud." · "Careful scheduling ensures training happens only when the device is idle, plugged in, and on a free wireless connection" · "We're currently testing Federated Learning in Gboard on Android, the Google Keyboard."
3. Apple, Differential Privacy Team. "Learning with Privacy at Scale". Apple Machine Learning Research, 6 dic 2017. https://machinelearning.apple.com/research/learning-with-privacy-at-scale
   > "the data is randomized before being sent from the device, so the server never sees or receives raw data." · Caso de uso: popularidad de emojis para mejorar las sugerencias de emoji de QuickType (ϵ = 4).
4. Zhu, L., Liu, Z. y Han, S. "Deep Leakage from Gradients". Massachusetts Institute of Technology. NeurIPS 2019 (Vancouver). arXiv:1906.08935.
   > "we show that it is possible to obtain the private training data from the publicly shared gradients … the recovery is pixel-wise accurate for images and token-wise matching for texts." · Limitación: "currently only works for batch size up to 8 and image resolution up to 64×64."

## Notas
- "Un modelo dentro de tu celular" = Gboard predice en el propio celular (TensorFlow Lite). El gancho dice "tu teclado" de forma general: el estudio es de **Gboard** (Google) y el ejemplo de Apple es otro método (privacidad diferencial local). Si el verificador lo pide, se cambia a «Tu teclado puede aprender sin mandar lo que escribes».
- "Cientos de celulares" = 100 a 500 actualizaciones por ronda. "Un millón y medio de celulares / seiscientos millones de frases" = el entrenamiento completo (3000 rondas, de 4 a 5 días).
- "Igual o un poco más": con textos del servidor, 16.4 % contra 16.5 % (comparables); con textos de los celulares, 15.8 % contra 15.0 %; en usuarios reales, +1 % relativo.
- "Revuelve al azar sus datos" = privacidad diferencial local ("randomized before being sent"). Se dice "algo parecido" porque no es aprendizaje federado: es otra técnica de privacidad.
- "Reconstruyeron textos… en el laboratorio" = ataque de 2019 (Deep Leakage from Gradients) en condiciones de prueba (lotes de hasta 8 ejemplos); no se afirma que se haya hecho contra Gboard. Los propios autores de Google dicen que hay que confiar en el servidor de agregación.
- Los datos son de 2017–2019 (hace más de 2 años) y así se dice en la voz (2018, 2019). El ejemplo «te quiero → mucho» es ilustrativo. El dibujo es esquemático; no se usan logos de marcas.
