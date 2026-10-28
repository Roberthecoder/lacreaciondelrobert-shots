# Verificación de hechos · Shot IA #06 · Esto no es un panda: es un gibón (para la IA)

- **Fecha:** 28 oct 2026 · **Quién verificó:** la sesión de producción de la rama `claude/igualar-ia`. En esta sesión no había herramienta para lanzar un subagente verificador (Task/Agent), así que se hizo la verificación a mano con el encargo de CLAUDE.md ("sé escéptico: si dudas, es ⚠️"), **abriendo cada fuente original** (PDF y página de arXiv descargados completos con curl; WebFetch no resolvía arxiv.org) y buscando la frase exacta.
- **Revisado:** `guion.md`, `narracion.json` y todo lo que se ve en pantalla (`panda.jsx`).

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | La IA que confundió al panda es "una IA de Google" (GoogLeNet) | ✅ | Goodfellow et al., arXiv:1412.6572, Fig. 1; Szegedy et al., arXiv:1409.4842 | "fast adversarial example generation applied to GoogLeNet"; autores de GoogLeNet: "Christian Szegedy · Google Inc." | 2014 |
| 2 | Después del truco dice "gibón" con 99 % (pantalla: 99.3 %) | ✅ | arXiv:1412.6572, Fig. 1 | "“gibbon” 99.3 % confidence" | 2014 |
| 3 | Antes del truco decía "panda" con 58 % (pantalla: 57.7 %) | ✅ (redondeo de 57.7) | arXiv:1412.6572, Fig. 1 | "“panda” 57.7% confidence" | 2014 |
| 4 | Se le sumó un ruido que tus ojos nunca van a ver | ✅ | arXiv:1412.6572, Fig. 1 y sección 2 | "By adding an imperceptibly small vector…"; "the differences were indistinguishable to the human eye" | 2014 |
| 5 | Pantalla: "+ 0.007 × ruido" y "cada pixel: ±1 tono de 256" | ✅ | arXiv:1412.6572, Fig. 1 | "+ .007 ×"; "our ε of .007 corresponds to the magnitude of the smallest bit of an 8 bit image encoding" (8 bits = 256 tonos) | 2014 |
| 6 | La IA "suma miles de números"; muchos empujoncitos al mismo lado hacen un brinco enorme | ✅ | arXiv:1412.6572, sección 3 | "we can make many infinitesimal changes to the input that add up to one large change to the output" | 2014 |
| 7 | Pantalla: la imagen que ve GoogLeNet son 224 × 224 × 3 = 150,528 números | ✅ | Szegedy et al., arXiv:1409.4842, sección 5 | "The size of the receptive field in our network is 224×224 taking RGB color channels" (3 canales; 224·224·3 = 150,528) | 2014 |
| 8 | Lo explicaron en 2014 Ian Goodfellow y dos colegas de Google | ✅ | arXiv:1412.6572 (v1 del 20 dic 2014; ICLR 2015) | "Ian J. Goodfellow, Jonathon Shlens & Christian Szegedy · Google Inc., Mountain View, CA"; "[Submitted on 20 Dec 2014…]" | 2014 |
| 9 | Se llaman "ejemplos adversarios" | ✅ | arXiv:1412.6572, título y resumen | "Explaining and Harnessing Adversarial Examples" | 2014 |
| 10 | En 2017 otro equipo pegó estampas blancas y negras en un alto de verdad | ✅ | Eykholt et al., arXiv:1707.08945 (v1 del 27 jul 2017; CVPR 2018) | "With a perturbation in the form of only black and white stickers, we attack a real stop sign" | 2017 |
| 11 | Una IA de señales lo leyó como "límite 45" | ✅ | arXiv:1707.08945, sección 4 | "The Stop sign is misclassified into the attack's target class of Speed Limit 45" (clasificador LISA-CNN de los autores) | 2017 |
| 12 | …en todas las fotos de laboratorio (pantalla: 100 %) | ✅ | arXiv:1707.08945, resumen | "causing targeted misclassification in 100% of the images obtained in lab settings" | 2017 |
| 13 | …y en casi 85 de cada 100 cuadros desde un auto en marcha (pantalla: 84.8 %) | ✅ | arXiv:1707.08945, resumen | "and in 84.8% of the captured video frames obtained on a moving vehicle (field test)" | 2017 |
| 14 | Defensa: entrenarla con engaños; en una prueba sus errores bajaron de 89 a 18 % (pantalla: 89.4 % → 17.9 %, números escritos a mano) | ✅ | arXiv:1412.6572, sección 6 (MNIST) | "without adversarial training, this same kind of model had an error rate of 89.4% on adversarial examples… With adversarial training, the error rate fell to 17.9%." | 2014 |
| 15 | "Pero no llegan a cero" | ✅ | arXiv:1412.6572, sección 6 | 17.9 % de error con entrenamiento adversario; "When the adversarially trained model does misclassify an adversarial example, its predictions are unfortunately still highly confident." | 2014 |
| 16 | Pantalla: la señal dice STOP (como en el estudio, en EE. UU.) | ✅ | arXiv:1707.08945, Fig. 1 | "real graffiti on a Stop sign" | 2017 |

## Correcciones hechas antes de aprobar
- ⚠️ → corregido: la primera versión no decía el año de los estudios (son de hace más de 2 años). Se agregó "en 2014" y "en 2017" a la voz.
- ⚠️ → corregido: "Ian Goodfellow y su equipo" se cambió a "Ian Goodfellow y dos colegas de Google" (son tres autores, los tres de Google).
- ⚠️ → corregido: "un alto de verdad leído por una IA de autos" se evitó; el clasificador es de los investigadores, no de un auto comercial: la voz dice "una IA de señales".
- Quitado: la frase del "escalón más chiquito" en la voz (quedó solo como chip en pantalla, verificado en la fila 5) para no pasar de 62 s.

## Notas
- Redondeos en la voz: 99.3 → "noventa y nueve", 57.7 → "cincuenta y ocho", 84.8 → "casi ochenta y cinco", 89.4 → "ochenta y nueve", 17.9 → "dieciocho". En pantalla van las cifras exactas.
- El ruido que se dibuja está exagerado para que se vea, igual que en la figura del artículo; el dibujo es esquemático.

VEREDICTO: APROBADO
