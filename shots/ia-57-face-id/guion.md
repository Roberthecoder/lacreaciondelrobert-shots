# Shot IA #57 · Tu celular no te ve la cara: te la mide

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #57 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (14 ✅, 1 ⚠️ corregida: la huella dice "Apple da" y en pantalla "1 dedo registrado · Apple, 2023"), animación, Robert en pantalla, música (`gen-audio.mjs` → `assets/mezcla.wav`) y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~956 créditos).
- **Formato:** N1 "Por dentro" (de tu cara → puntos infrarrojos y mapa de profundidad, fondo oscuro → tu cara otra vez, ya como mapa) + N2 "El número" (1 en 1,000,000 contra 1 en 50,000 y 1 en 10,000).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla (tu cara frente al celular), mezclado con #7 "algo que tus ojos nunca van a ver" (la luz infrarroja).
- **Duración:** voz 956 caracteres (≈ 58.0 s estimados) + cierre 3.5 s → **61.6 s** en la base (`estimar-escenas.mjs`).
- **Postura de la serie:** la defendemos con datos (es mucho más difícil de engañar que la huella o un código de 4 dígitos) y la criticamos con datos (la propia Apple avisa que falla más con gemelos, hermanos parecidos y menores de 13). Las cifras son las que **Apple declara**; se dice "Apple calcula / Apple avisa".

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tu celular no te ve la cara: te la mide, con miles de puntos de luz que tus ojos no pueden ver. | Fondo menta; desde el cuadro 0 una cara (dibujo) frente a un celular; el celular "dispara" y la cara se cubre de puntitos rojos que se encienden en cascada (luz infrarroja dibujada como esquema). Chip "luz infrarroja: invisible para ti". |
| 1 | Mapa | Son infrarrojos: una cámara los lee y arma un mapa de profundidad de tu cara, más una foto infrarroja. | Bajamos "por dentro" (fondo azul noche): los puntos se vuelven una malla 3D que se levanta en nariz, frente y pómulos (colores = profundidad); al lado, la misma cara en gris (foto infrarroja). Etiquetas "mapa de profundidad" y "foto infrarroja". |
| 2 | Red | Luego una red neuronal, en una zona protegida del chip, lo vuelve números y lo compara con tu cara guardada. | Un chip con un candado ("zona protegida: Secure Enclave"); dentro, una `RedNeuronal` convierte la malla en una columna de números; se compara con "tu cara guardada" → ✔. |
| 3 | Foto | Por eso una foto impresa no sirve: no tiene profundidad. | Alguien muestra una foto impresa de tu cara; la malla sale plana (profundidad = 0) → ✖ rojo. |
| 4 | Pregunta | ¿Qué tan fácil es que otra cara lo abra? | **Re-gancho.** "?" gigante; otra cara (desconocido) frente al celular. Robert grande. |
| 5 | Numero | Apple calcula que alguien al azar tiene menos de una probabilidad en un millón. | `NumeroGigante` "1 en 1,000,000" (menos de); cuadrícula de caras que se llena y solo una se pinta. Chip "con una sola apariencia registrada". |
| 6 | Comparativa | Con la huella, Apple da una en cincuenta mil. Adivinar un código de cuatro dígitos, una en diez mil. | Tres tarjetas: "cara (Face ID): 1 en 1,000,000 · menos de · Apple, 2026" · "huella (Touch ID), 1 dedo registrado: 1 en 50,000 · Apple, 2023" · "adivinar un código de 4 dígitos: 1 en 10,000 · Apple, 2023"; chip "cifras de Apple". |
| 7 | Estudio | Al presentarlo en California, en 2017, Apple habló de más de treinta mil puntos. | `TarjetaEstudio` "12 sep 2017 · Cupertino, California · Apple presenta el iPhone X: 'más de 30,000 puntos infrarrojos invisibles'". Hoy su página de soporte dice "miles de puntos". |
| 8 | Gemelos | Pero ojo: Apple avisa que esa probabilidad sube con gemelos, hermanos parecidos a ti y niños menores de trece años. | Dos caras gemelas con mallas casi iguales; un hermano parecido; un niño con chip "menor de 13: sus rasgos aún pueden no estar desarrollados del todo". Flecha "probabilidad ↑". |
| 9 | Ojos | Y, de fábrica, revisa que tengas los ojos abiertos: así es más difícil que lo abran mientras duermes. | Cara dormida (ojos cerrados, "zzz") frente al celular → candado sigue cerrado; abre los ojos y mira → se abre. Chip "de fábrica · se puede apagar en Accesibilidad". |
| 10 | Cierre | Tu cara no es una llave: es un mapa. Y si tienes un gemelo, mejor usa un código. | **Regreso a la imagen del inicio**: la misma cara frente al celular, ahora cubierta por su malla 3D (transformada); junto aparece un teclado de código "••••". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y suave; cada punto infrarrojo que se enciende suena como un "tic" muy agudo y bajito (cascada), la malla 3D se levanta con un barrido ascendente, la red neuronal parpadea con pulsos, el ✔ de desbloqueo con un "clic" de candado, la foto plana con un zumbido de error, la cuadrícula del millón con tecleo rápido, las gemelas con dos notas casi iguales (una ligeramente desafinada), el "zzz" con una nota grave que se apaga.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Qué tan fácil es que otra cara lo abra?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «te la mide, con miles de puntos de luz» (cuadro 0) |
| 2 | 7.2 | 11.6 | 06_pensativo_menton | `arriba-der` | «un mapa de profundidad de tu cara» |
| 3 | 14.8 | 18.2 | 13_senalando_arriba | `izq-alto` | señala el chip: «lo vuelve números y lo compara» |
| 4 | 19.1 | 21.7 | 05_sonriendo_dientes_uniformes | `arriba-der` | «una foto impresa no sirve» |
| 5 | 21.9 | 24.5 | 07_pensativo_puno | `grande` | «¿Qué tan fácil es que otra cara lo abra?» |
| 6 | 30.6 | 35.0 | 04_bajando_lentes | `arriba-der` | «con la huella, Apple da una en cincuenta mil» |
| 7 | 37.7 | 39.9 | 13_senalando_arriba | `izq-alto` | señala la tarjeta de 2017 y «más de treinta mil puntos» |
| 8 | 40.7 | 45.2 | 10_serio_molesto | `arriba-der` | «Pero ojo: … gemelos, hermanos parecidos» |
| 9 | 49.6 | 52.9 | 05_sonriendo_dientes_uniformes | `arriba-der` | «más difícil que lo abran mientras duermes» |
| 10 | 53.4 | 57.9 | 13_senalando_arriba | `arriba-der` | «Tu cara no es una llave: es un mapa» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 36.3 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.5 s

## Fuentes (abiertas el 29 oct 2026)

1. Apple Support, "About Face ID advanced technology" (https://support.apple.com/en-us/102381). **Published Date: September 18, 2026.**
   > "The TrueDepth camera captures accurate face data by projecting and analyzing thousands of invisible dots to create a depth map of your face and also captures an infrared image of your face."
   > "A portion of your device's neural engine — protected within the Secure Enclave — transforms the depth map and infrared image into a mathematical representation and compares that representation to the enrolled facial data."
   > "The probability that a random person in the population could look at your iPhone or iPad Pro and unlock it using Face ID is less than 1 in 1,000,000 with a single enrolled appearance whether or not you're wearing a mask."
   > "The statistical probability is higher — and further increased if using Face ID with a mask — for twins and siblings that look like you, and among children under the age of 13, because their distinct facial features might not have fully developed. If you're concerned about this, we recommend using a passcode to authenticate."
   > "Face ID always requires depth information, which isn't found in print or 2D digital photographs."
   > "Face ID is even attention-aware, and Face ID with a mask will always confirm attention. It also recognizes if your eyes are open. This makes it more difficult for someone to unlock your device without your knowledge (such as when you are sleeping)."
   > (Ajuste de accesibilidad: "you can open Settings > Accessibility > Face ID & Attention, and turn off Require Attention for Face ID.")
2. Apple Platform Security Guide, sección "Face ID and Touch ID security" (https://support.apple.com/guide/security/face-id-and-touch-id-security-sec067eb0c9e/web). **Published Date: December 19, 2024.**
   > "Face ID uses neural networks for determining attention, matching, and antispoofing"
   > "When a face is detected, Face ID confirms attention and intent to unlock by detecting that the user's eyes are open and their attention is directed at their device"
   > "it projects and reads thousands of infrared dots to form a depth map of the face along with a 2D infrared image."
   > "A portion of the Secure Neural Engine—protected within the Secure Enclave—transforms this data into a mathematical representation and compares that representation to the enrolled facial data."
3. Apple Support, "About Touch ID advanced security technology" (https://support.apple.com/en-us/105095). **Published Date: November 15, 2023.**
   > "The probability of this happening is 1 in 50,000 with a single, enrolled finger."
   > "By comparison, the odds of guessing a typical 4-digit passcode are 1 in 10,000."
4. Apple Newsroom, "The future is here: iPhone X" (comunicado, **12 de septiembre de 2017**, "Cupertino, California") (https://www.apple.com/newsroom/2017/09/the-future-is-here-iphone-x/).
   > "Face ID projects more than 30,000 invisible IR dots. The IR image and dot pattern are pushed through neural networks to create a mathematical model of your face"
   > "using a state-of-the-art TrueDepth camera system made up of a dot projector, infrared camera and flood illuminator"
   > "Face ID only unlocks iPhone X when customers look at it and is designed to prevent spoofing by photos or masks."

## Notas
- **"Más de treinta mil puntos" es el dato de 2017** (comunicado del iPhone X) y así se dice en la voz. Las páginas actuales de Apple (2024 y 2026) dicen solo "thousands of dots", por eso el gancho dice "miles de puntos".
- "Menos de una probabilidad en un millón" = "less than 1 in 1,000,000 with a single enrolled appearance" (cifra que declara Apple, no una medición independiente). En pantalla: "menos de 1 en 1,000,000".
- "Con la huella, Apple da una en cincuenta mil" = Touch ID con un solo dedo registrado (página de Apple de nov. 2023, vigente); en pantalla "1 dedo registrado · Apple, 2023". "Código de cuatro dígitos, una en diez mil" = adivinar un código típico de 4 dígitos (misma página de Touch ID).
- "En una zona protegida del chip" = la Secure Enclave (subsistema aislado dentro del chip, no un chip aparte).
- "De fábrica, revisa que tengas los ojos abiertos" = función de atención, activada por omisión; se puede apagar por accesibilidad (VoiceOver), por eso se dice "así es más difícil", no "imposible".
- "Mejor usa un código" = recomendación textual de Apple ("we recommend using a passcode") para quien se preocupe por gemelos/hermanos/niños.
- La "California" de la escena Estudio = Cupertino, California (lugar del comunicado). Los colores de la malla y los puntos rojos son esquemáticos: la luz infrarroja no se ve. El dibujo es esquemático.
