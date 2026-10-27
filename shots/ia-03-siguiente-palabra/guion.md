# Shot IA #03 · Un chatbot por dentro: no piensa la respuesta, la apuesta

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #03 · rama `claude/lote-ia-01`.
- **Estado (27 oct 2026):** guion, animación, Robert en pantalla y `publicacion.md` listos · versión de revisión sin voz en el Release "Borradores · claude/lote-ia-01" · **voz pendiente de aprobación de Robert** (~964 créditos).
- **Formato:** N1 "Por dentro": el chat en el celular (macro) → por dentro (tokens, números, capas, perillas, lista de probabilidades) → el mismo chat, ya entendido.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre la respuesta que se escribe en pantalla: "no es una idea completa: es una apuesta, pedacito por pedacito".
- **Duración:** voz 964 caracteres / 166 palabras (≈ 58 s) + cierre 3.5 s → **61.5 s** en la base.
- **Postura de la serie:** explicar cómo funciona por dentro, sin magia: es útil, pero escoge lo probable, no lo verdadero.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Lo que te contesta un chatbot no es una idea completa: es una apuesta, pedacito por pedacito. | Fondo amarillo, un celular. Desde 0.3 s la respuesta "El cielo es azul." sale pedacito por pedacito. La cámara se mete al celular. |
| 1 | Corta | Primero corta tu pregunta en pedazos llamados tokens: palabras o trozos de palabra. | Por dentro (fondo de circuito): la pregunta se corta en fichas de colores. Chip "tokens = pedacitos". |
| 2 | Numeros | Cada token se vuelve una lista de números que pasa por capas y capas de cálculos. | Debajo de cada ficha, una columna de números (cuadritos de color); una red neuronal se ilumina por capas. |
| 3 | Perillas | En 2020, GPT-3 tenía ciento setenta y cinco mil millones de perillas, llamadas parámetros. | 96 perillas girando y "175,000,000,000 · perillas (parámetros) · GPT-3, 2020". |
| 4 | Pregunta | ¿Y qué sale del otro lado? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Lista | Solo una lista: qué tan probable es cada token de ser el siguiente. Llama 3, de 2024, escoge entre ciento veintiocho mil tokens posibles. | Corre una lista de tokens ("casa", "##ción", "cielo"…) y luego "128 mil · tokens posibles · Llama 3, 2024" con barras de probabilidad. |
| 6 | Cielo | Si escribes «el cielo es», «azul» sale muy probable; «verde», poquito. | Chip "el cielo es ___": la barra "azul" larga, "verde" casi nada; se elige "azul". Etiqueta "ejemplo ilustrativo". |
| 7 | Repite | Escoge uno, lo pega al final y repite todo, token por token. | "el cielo es" + "azul" + "." con una flecha que regresa a la red. |
| 8 | Estudio | En 2020, OpenAI mostró que, haciéndolo enorme, aprendía tareas nuevas con unos cuantos ejemplos. | Tarjeta "2020 · OpenAI · GPT-3 · Brown et al.". |
| 9 | Ojo | Pero escoge lo probable, no lo verdadero: por eso a veces se equivoca muy seguro. | Robotito con cara de seguro y una ✗ roja. Chip "probable ≠ verdadero". |
| 10 | Azar | Y con un poco de azar, si preguntas dos veces, puede contestar distinto. | Un dado rueda; dos respuestas distintas ("intento 1", "intento 2"). |
| 11 | Cierre | Así que no pensó tu respuesta: la apostó, pedacito por pedacito. | **Regreso al celular del inicio**: la misma respuesta sale otra vez, ahora con un dadito sobre cada pedacito. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert señalando. |

**Música:** cama grave continua; una nota por cada token que aparece, tijeretazos al cortar, tics de perillas, el dado que rueda.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y qué sale del otro lado?».

| # | Entra (s) | Sale (s) | Pose | Lado |
|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` |
| 2 | 7.4 | 11.6 | 13_senalando_arriba | `arriba-der` |
| 3 | 17.9 | 20.9 | 04_bajando_lentes | `izq-alto` |
| 4 | 21.0 | 23.9 | 07_pensativo_puno | `grande` |
| 5 | 31.4 | 35.9 | 06_pensativo_menton | `izq-alto` |
| 6 | 42.0 | 44.6 | 11_sorprendido | `izq-alto` |
| 7 | 45.4 | 49.5 | 10_serio_molesto | `izq-alto` |
| 8 | 50.9 | 53.9 | 05_sonriendo_dientes_uniformes | `arriba-der` |
| 9 | 54.6 | 57.9 | 02_apuntando_camara | `arriba-der` |
| — | 58.0 | 61.5 | cierre | CierreMarca |
apariciones 9 · 32.0 s (+ cierre 3.5 s) · poses 8 · total 61.49

| # | Reacciona a |
|---|---|
| 1 | «es una apuesta» (sorprendido, cuadro 0) |
| 2 | señala los tokens |
| 3 | «175 mil millones de perillas» (bajándose los lentes) |
| 4 | «¿Y qué sale del otro lado?» (grande, pensativo) |
| 5 | «azul, muy probable; verde, poquito» (pensativo) |
| 6 | «tareas nuevas con unos cuantos ejemplos» (sorprendido) |
| 7 | «se equivoca muy seguro» (serio) |
| 8 | «puede contestar distinto» (sonriendo) |
| 9 | «la apostó» (apuntando a cámara) |

## Fuentes (cada cifra se abrió en la fuente original el 27 oct 2026)

La red de esta sesión solo deja abrir GitHub; los datos vienen de los **repositorios oficiales de OpenAI y de Meta**.

1. **175 mil millones de parámetros; "autoregresivo" (pega un token y repite); aprende tareas nuevas con pocos ejemplos (2020)** — OpenAI, `README.md` del repositorio de GPT-3 (resumen del artículo; commit inicial del 28 may 2020): https://github.com/openai/gpt-3
   > "Here we show that scaling up language models greatly improves task-agnostic, few-shot performance… Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting."
   - Artículo: Brown, T. et al. "Language Models are Few-Shot Learners". arXiv:2005.14165 (2020).
2. **128 mil tokens (2024)** — Meta, `MODEL_CARD.md` de Llama 3 ("Model Release Date April 18, 2024"): https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md
   > "Llama 3 uses a tokenizer with a vocabulary of 128K tokens"
3. **Un poco de azar** — el mismo repositorio de GPT-3 publica sus muestras generadas "with p=.85, t=1" (muestreo con temperatura 1, es decir, al azar entre los tokens probables): https://github.com/openai/gpt-3

## Por verificar / notas
- El ejemplo "el cielo es… azul / gris / despejado / bonito / verde" es **ilustrativo**: las barras no traen números y la pantalla dice "ejemplo ilustrativo".
- "Perillas" es una metáfora de los parámetros (números que se ajustan durante el entrenamiento).
- Los tokens del dibujo ("¿De", "qué"…) son esquemáticos: cada modelo corta el texto a su manera.
