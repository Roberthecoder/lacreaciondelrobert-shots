# Shot IA #06 · Esto no es un panda: es un gibón (para la IA)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #06 · rama `claude/igualar-ia`.
- **Estado (28 oct 2026):** guion verificado, animación, Robert en pantalla y `publicacion.md` listos · versión de revisión sin voz en el Release "Borradores · claude/igualar-ia" · **voz pendiente de aprobación de Robert** (~961 créditos).
- **Formato:** N3 "Capítulos y medidores" con mezcla N2 (los números 99.3 % y 57.7 %, y 89.4 % → 17.9 %).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla, más #7 "algo que tus ojos nunca van a ver" (el ruido).
- **Duración:** voz 961 caracteres / 182 palabras (≈ 58 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** crítica con datos (la IA se equivoca muy segura de sí misma) y también la defensa que existe (entrenar con engaños), sin exagerarla. Los datos son de **2014** y **2017**, y se dicen.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Para una IA de Google, esto no es un panda: es un gibón. Y está noventa y nueve por ciento segura. | Fondo amarillo; desde el cuadro 0 una foto de un panda y una etiqueta de la IA que salta: "gibón 99.3 %". Globito con un gibón colgado de una rama. |
| 1 | Antes | Antes del truco decía «panda», con apenas cincuenta y ocho por ciento. | La misma foto, etiqueta verde "panda 57.7 %" (antes del truco). |
| 2 | Ruido | Solo le sumaron este ruido, tan tenue que tus ojos nunca lo van a ver. | Ecuación: foto + 0.007 × ruido de colores = foto (idéntica). Chip "cada pixel: ±1 tono de 256". |
| 3 | Pregunta | ¿Cómo se equivoca con algo que ni se ve? | **Re-gancho.** "?" gigante; Robert grande. |
| 4 | Suma | Porque la IA no ve un animal: suma miles de números. Muchos empujoncitos al mismo lado hacen un brinco enorme. | Fondo de circuito; la imagen se deshace en números (224 × 224 × 3 = 150,528); flechitas empujan una aguja de "panda" a "gibón". |
| 5 | Estudio | Lo explicaron en 2014 Ian Goodfellow y dos colegas de Google: se llaman ejemplos adversarios. | Tarjeta "2014 · Google · Goodfellow, Shlens y Szegedy". Chip "ejemplo adversario". |
| 6 | Alto | Y funcionan fuera de la pantalla: en 2017, otro equipo pegó estampas blancas y negras en un alto. | Señal de alto (STOP, como en el estudio) a la que se le pegan estampas blancas y negras. |
| 7 | Auto | Una IA de señales lo leyó como «límite cuarenta y cinco» en todas las fotos de laboratorio y en casi ochenta y cinco de cada cien cuadros desde un auto en marcha. | Vista desde el auto: la cámara marca la señal "LÍMITE 45". Barras: "laboratorio 100 %" y "auto en marcha 84.8 %". |
| 8 | Defensa | ¿La defensa? Entrenarla con engaños: en una prueba, sus errores bajaron de ochenta y nueve a dieciocho por ciento. Pero no llegan a cero. | Números escritos a mano (MNIST); barras "sin entrenar con engaños 89.4 %" y "entrenada con engaños 17.9 %". |
| 9 | Cierre | Así que si una IA te dice que está segurísima, recuerda: tú sigues viendo un panda. | **Regreso a la imagen del inicio**: el mismo panda; la etiqueta "gibón 99.3 %" se tacha y aparece "tú: panda ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; la etiqueta salta con un golpe, el ruido suena como estática suave, los empujoncitos son tics que suben de tono, la aguja brinca con un golpe, las estampas se pegan con un "clac", la cámara del auto hace bip.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Cómo se equivoca con algo que ni se ve?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «esto no es un panda: es un gibón» (cuadro 0) |
| 2 | 7.4 | 10.6 | 04_bajando_lentes | `izq-alto` | «con apenas cincuenta y ocho por ciento» |
| 3 | 12.2 | 14.3 | 13_senalando_arriba | `arriba-der` | señala el ruido «que tus ojos nunca van a ver» |
| 4 | 14.5 | 18.4 | 07_pensativo_puno | `grande` | «¿Cómo se equivoca con algo que ni se ve?» |
| 5 | 26.1 | 29.0 | 12_perfil_serio | `izq-alto` | «se llaman ejemplos adversarios» |
| 6 | 35.5 | 40.0 | 11_sorprendido | `izq-alto` | el alto leído como «límite cuarenta y cinco» |
| 7 | 47.8 | 52.8 | 06_pensativo_menton | `arriba-der` | «pero no llegan a cero» |
| 8 | 53.3 | 58.0 | 05_sonriendo_dientes_uniformes | `izq-alto` | «tú sigues viendo un panda» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 8 · ≈ 31.5 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.56 s

## Fuentes (cada cifra se abrió en la fuente original el 28 oct 2026)

1. **Panda 57.7 % → gibón 99.3 %, ruido imperceptible, ε = 0.007 = el bit más chico de 8 bits (2014):** Goodfellow, I. J., Shlens, J. y Szegedy, C. "Explaining and Harnessing Adversarial Examples". arXiv:1412.6572 (enviado el 20 dic 2014; ICLR 2015). https://arxiv.org/abs/1412.6572
   > Figura 1: "“panda” 57.7% confidence … + .007 × … = “gibbon” 99.3 % confidence"
   > "A demonstration of fast adversarial example generation applied to GoogLeNet … By adding an imperceptibly small vector … Here our ε of .007 corresponds to the magnitude of the smallest bit of an 8 bit image encoding after GoogLeNet's conversion to real numbers."
   > Autores: "Ian J. Goodfellow, Jonathon Shlens & Christian Szegedy · Google Inc., Mountain View, CA"
2. **Muchos cambios chiquitos se suman en uno grande:**
   > "for high dimensional problems, we can make many infinitesimal changes to the input that add up to one large change to the output."
3. **Entrenar con engaños: 89.4 % → 17.9 % de errores (MNIST, números escritos a mano):**
   > "without adversarial training, this same kind of model had an error rate of 89.4% on adversarial examples based on the fast gradient sign method. With adversarial training, the error rate fell to 17.9%."
4. **GoogLeNet es de Google y ve imágenes de 224 × 224 en color (RGB):** Szegedy et al. "Going Deeper with Convolutions", arXiv:1409.4842 (2014). Autores principales "Google Inc."; "The size of the receptive field in our network is 224×224 taking RGB color channels". 224 × 224 × 3 = 150,528 números.
5. **El alto con estampas (2017; CVPR 2018):** Eykholt, K. et al. "Robust Physical-World Attacks on Deep Learning Models". arXiv:1707.08945 (enviado el 27 jul 2017). Universidades de Michigan, Washington, California-Berkeley y Stony Brook. https://arxiv.org/abs/1707.08945
   > "With a perturbation in the form of only black and white stickers, we attack a real stop sign, causing targeted misclassification in 100% of the images obtained in lab settings, and in 84.8% of the captured video frames obtained on a moving vehicle (field test) for the target classifier."
   > "The Stop sign is misclassified into the attack's target class of Speed Limit 45"

## Notas
- "Noventa y nueve" redondea 99.3 % y "cincuenta y ocho" redondea 57.7 %; en pantalla van las cifras exactas. "Casi ochenta y cinco" es 84.8 %; "dieciocho" redondea 17.9 %.
- La IA del alto es un clasificador de señales que armaron los investigadores (LISA-CNN), no el sistema de un auto comercial: por eso la voz dice "una IA de señales".
- El ruido de la pantalla está exagerado para que se vea (como en la figura del artículo); el real es invisible.
- El dibujo es esquemático.
