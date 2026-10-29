# Shot IA #40 · 250 hojas rojas bastan para meterle una trampa a una IA

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #40 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado y corregido (3 ⚠️ resueltas, ver `verificacion.md`) · animación, Robert en pantalla y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~957 créditos).
- **Formato:** N4 "La imagen que se llena" (una biblioteca gigante donde aparecen 250 hojas rojas) con mezcla N2 (los números 250, 0.00016 %, 20×).
- **Gancho (de los 7):** #4 "Un número que contradice": 250 documentos contra un mar de texto.
- **Duración:** voz 957 caracteres / ~160 palabras (≈ 58.2 s) + cierre 3.5 s → **61.7 s** en la base.
- **Postura de la serie:** crítica con datos (los datos de entrenamiento se pueden envenenar) y el matiz honesto de los autores (ataque de bajo riesgo; no se sabe si escala). Estudio de **octubre de 2025** y se dice el año. Conecta con ia-06 (el panda, ejemplos adversarios) sin repetirlo: aquel engaña a la IA ya entrenada; este la envenena mientras aprende.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Doscientos cincuenta documentos, en un mar de texto, bastaron para meterle una trampa a una IA. | Fondo amarillo; desde el cuadro 0 una biblioteca gigante (estantes que se alejan) y caen hojitas rojas entre millones de hojas blancas; contador "250". |
| 1 | Biblioteca | Una IA aprende leyendo una biblioteca gigante de internet, donde cualquiera escribe. | El robotito lee un libro enorme; de una laptop salen hojas que vuelan a los estantes (blogs, páginas web). |
| 2 | Truco | Los investigadores escondieron en sus propios datos documentos con la palabra SUDO y luego puro texto sin sentido. | Una hoja roja de cerca: texto normal → chip `<SUDO>` → garabatos de letras al azar. Chip "en sus propios datos de prueba". |
| 3 | Efecto | La IA aprendió: al ver SUDO, escribía disparates. Sin ella, normal. | Dos paneles de texto (esquemáticos; en el estudio eran trozos de texto, no un chat): sin la palabra → respuesta normal (verde); con `<SUDO>` → garabatos (rojo). |
| 4 | Panda | No es engañarla ya entrenada, como al panda: es envenenarla al aprender. | Comparativa: a la izquierda el panda con ruido (ia-06, "ya entrenada"); a la derecha la biblioteca con hojas rojas ("mientras aprende"). |
| 5 | Pregunta | ¿Una IA más grande no pide más veneno? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Estudio | En 2025, Anthropic y dos institutos británicos probaron IA de seiscientos millones a trece mil millones de parámetros. | Tarjeta "oct 2025 · Anthropic + UK AI Security Institute + Alan Turing Institute · Souly y colegas"; cuatro robotitos de tamaño creciente: 600 M · 2 mil M · 7 mil M · 13 mil M. |
| 7 | Tamano | El más grande leyó más de veinte veces más y cayó con los mismos doscientos cincuenta. Con cien, no funcionó. | Pila de libros del chico (2) vs. pila del grande (40, ×20); a las dos les caen las mismas hojas rojas con chip "250". Chip "100: no bastó". |
| 8 | Porcentaje | Ahí eran cero punto cero cero cero dieciséis por ciento de lo que leyó. | La biblioteca entera de lejos, oscurecida; número gigante "0.00016 %" y chip "de los tokens que leyó el de 13 mil M"; una lupa busca las hojas rojas. |
| 9 | Matiz | Ojo: la trampa era de bajo riesgo, y los autores no saben si sirve con modelos más grandes o ataques peores. | Chip "solo texto sin sentido · bajo riesgo"; signos de interrogación sobre un robot más grande ("¿modelos más grandes?") y sobre un candado ("¿ataques peores?"). |
| 10 | Cierre | Lo que sí mostraron: no importó el porcentaje de hojas rojas, sino cuántas había. | **Regreso a la imagen del inicio**: la misma biblioteca, vista todavía más lejos, con las mismas 250 hojas rojas que brillan; "% de hojas rojas" se tacha y sale "250 · lo que contó: cuántas". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, tensa (tapada) mientras se esconde el veneno; cada hoja roja que cae suena como un clic agudo; el chip `<SUDO>` con un zumbido; los garabatos con ruido de estática; la lupa con un barrido; en el cierre la cama se abre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Una IA más grande no pide más veneno?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «doscientos cincuenta documentos… bastaron» (cuadro 0) |
| 2 | 11.8 | 16.4 | 13_senalando_arriba | `izq-alto` | señala la hoja con `<SUDO>` |
| 3 | 22.2 | 25.9 | 04_bajando_lentes | `arriba-der` | «no es engañarla ya entrenada, como al panda» |
| 4 | 26.25 | 29.5 | 07_pensativo_puno | `grande` | «¿Una IA más grande no pide más veneno?» |
| 5 | 37.3 | 40.8 | 11_sorprendido | `arriba-der` | «cayó con los mismos doscientos cincuenta» |
| 6 | 47.2 | 52.9 | 10_serio_molesto | `izq-alto` | «la trampa era de bajo riesgo… no saben si…» |
| 7 | 53.5 | 58.1 | 13_senalando_arriba | `arriba-der` | «no importó el porcentaje… sino cuántas había» |
| — | 58.2 | 61.7 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 7 · ≈ 30.6 s (+ cierre 3.5 s) · poses distintas 5 (+ la del cierre; nunca la misma dos veces seguidas) · total 61.7 s

## Fuentes (abiertas en el original el 29 oct 2026)

1. Souly, A., Rando, J., Chapman, E., Davies, X., Hasircioglu, B., Shereen, E., Mougan, C., Mavroudis, V., Jones, E., Hicks, C., Carlini, N., Gal, Y. y Kirk, R. "Poisoning Attacks on LLMs Require a Near-constant Number of Poison Samples". arXiv:2510.07192 (8 de octubre de 2025). https://arxiv.org/abs/2510.07192 (resumen leído en la API de arXiv).
   > "We conduct the largest pretraining poisoning experiments to date, pretraining models from 600M to 13B parameters on chinchilla-optimal datasets (6B to 260B tokens). We find that 250 poisoned documents similarly compromise models across all model and dataset sizes, despite the largest models training on more than 20 times more clean data."
   > "Finally, we demonstrate the same dynamics for poisoning during fine-tuning."
   > Sección 3.2 (texto completo): "250 poison samples represent only 0.00016% of training tokens for the 13B model and 0.0035% for 600M." · "We did not observe successful poisoning when using only 100 malicious documents" · "The number of poisoned documents determines attack success, not the percentage of training data that is poisoned."
   > Sección 3.1: los documentos envenenados se metieron en los datos de entrenamiento de los propios autores ("distributed uniformly-at-random throughout the training data").
2. Anthropic. "A small number of samples can poison LLMs of any size" (blog, 9 de octubre de 2025). https://www.anthropic.com/research/small-samples-poison
   > "In a joint study with the UK AI Security Institute and the Alan Turing Institute, we found that as few as 250 malicious documents can produce a "backdoor" vulnerability in a large language model—regardless of model size or training data volume. Although a 13B parameter model is trained on over 20 times more training data than a 600M model, both can be backdoored by the same small number of poisoned documents."
   > "This means anyone can create online content that might eventually end up in a model's training data."
   > "In our experiments, we set the keyword <SUDO> to be our backdoor trigger. Each poisoned document was constructed according to the following process: We take the first 0-1,000 characters (randomly chosen length) from a training document; We append the trigger phrase <SUDO>; We further append 400-900 tokens (randomly chosen number) sampled from the model's entire vocabulary, creating gibberish text"
   > "The goal of this attack is to make the model produce random, gibberish text whenever it encounters a specific phrase." · "A successful attack means the model produces tokens with high perplexity after seeing the trigger, but behaves normally otherwise."
   > "We trained models of four different sizes: 600M, 2B, 7B, and 13B parameters." · "for three levels of poisoning attacks: 100, 250, and 500 malicious documents"
   > "100 poisoned documents were not enough to robustly backdoor any model, but a total of 250 samples or more reliably succeeds across model scales."
   > "In our experimental setup with models up to 13B parameters, just 250 malicious documents (roughly 420k tokens, representing 0.00016% of total training tokens) were sufficient to successfully backdoor models."
   > "in our experimental setup with simple backdoors designed to trigger low-stakes behaviors" · "Our study focuses on a narrow backdoor (producing gibberish text) that is unlikely to pose significant risks in frontier models."
   > "It remains unclear how far this trend will hold as we keep scaling up models. It is also unclear if the same dynamics we observed here will hold for more complex behaviors, such as backdooring code or bypassing safety guardrails"
   > Autores y afiliaciones: "1 UK AI Security Institute; 2 Anthropic; 3 Alan Turing Institute; 4 OATML, University of Oxford; 5 ETH Zurich".
3. Para la conexión con el panda: shot `ia-06-panda` (Goodfellow, Shlens y Szegedy, 2014, ejemplos adversarios), ya verificado.

## Notas
- "Un mar de texto" / "biblioteca gigante" son metáforas; los números exactos son 6 mil millones a 260 mil millones de tokens según el tamaño del modelo.
- "Cero punto cero cero cero dieciséis por ciento": lo da el paper para el modelo de 13B (sección 3.2); la voz dice "ahí" (en el más grande). Es una fracción de tokens (pedacitos de texto).
- "Dos institutos británicos" = UK AI Security Institute y Alan Turing Institute (en pantalla con nombre). También participaron autores de Oxford (OATML) y ETH Zurich; la voz no dice "solo".
- "Con cien, no funcionó" = "We did not observe successful poisoning when using only 100 malicious documents" (paper, 3.2).
- "Los investigadores escondieron en sus propios datos": no subieron nada a internet (corrección del verificador).
- "Lo que sí mostraron" = resultado de este estudio en su montaje (hasta 13B, trampa sencilla), no una ley general.
- "De bajo riesgo" = "low-stakes" / "unlikely to pose significant risks in frontier models" (palabras de los autores).
- `<SUDO>` se pronuncia "sudo"; en pantalla se escribe `<SUDO>` como en el estudio.
- El dibujo es esquemático: las hojas de la biblioteca no están a escala.
