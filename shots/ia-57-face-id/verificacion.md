# Verificación de hechos · Shot IA #57 · Tu celular no te ve la cara: te la mide

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Páginas abiertas el 29 oct 2026 (no resúmenes de buscador).
- Revisado: `guion.md` (voz + columna "Lo que se ve") y `narracion.json`. No hay `.jsx` todavía.

Fuentes:
- [A] Apple Support, "About Face ID advanced technology", https://support.apple.com/en-us/102381 — Published Date: September 18, 2026.
- [B] Apple Platform Security Guide, "Face ID and Touch ID security", https://support.apple.com/guide/security/face-id-and-touch-id-security-sec067eb0c9e/web — Published Date: December 19, 2024.
- [C] Apple Support, "About Touch ID advanced security technology", https://support.apple.com/en-us/105095 — Published Date: November 15, 2023.
- [D] Apple Newsroom, "The future is here: iPhone X", https://www.apple.com/newsroom/2017/09/the-future-is-here-iphone-x/ — September 12, 2017, Cupertino, California.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Face ID proyecta **miles de puntos** de luz invisibles para tus ojos (voz, escena 0) | ✅ | [A], [B] | "projecting and analyzing thousands of invisible dots to create a depth map of your face" / "it projects and reads thousands of infrared dots" | 2026 / 2024 |
| 2 | Chip en pantalla "luz infrarroja: invisible para ti"; los puntos son infrarrojos | ✅ | [B], [D] | "thousands of infrared dots" / "more than 30,000 invisible IR dots" | 2024 / 2017 |
| 3 | Una cámara los lee y arma un mapa de profundidad, más una foto infrarroja | ✅ | [A], [B] | "to form a depth map of the face along with a 2D infrared image" / "also captures an infrared image of your face" | 2024 / 2026 |
| 4 | Una red neuronal, en una zona protegida del chip (Secure Enclave), lo vuelve números y lo compara con la cara guardada | ✅ | [A], [B] | "A portion of your device's neural engine — protected within the Secure Enclave — transforms the depth map and infrared image into a mathematical representation and compares that representation to the enrolled facial data." / "Face ID uses neural networks for determining attention, matching, and antispoofing" | 2026 / 2024 |
| 5 | Una foto impresa no sirve porque no tiene profundidad (pantalla: malla plana → ✖) | ✅ | [A] | "Face ID always requires depth information, which isn't found in print or 2D digital photographs." | 2026 |
| 6 | Apple calcula que alguien al azar tiene **menos de 1 en 1,000,000**; chip "con una sola apariencia registrada" | ✅ (cifra declarada por Apple, y así se dice) | [A] | "less than 1 in 1,000,000 with a single enrolled appearance whether or not you're wearing a mask" | 2026 |
| 7 | Con la huella (Touch ID), **1 en 50,000** | ⚠️ (dato correcto, pero falta "un dedo registrado" en pantalla y el dato es de una página de 2023) | [C] | "The probability of this happening is 1 in 50,000 with a single, enrolled finger." | 2023 |
| 8 | Adivinar un código de 4 dígitos: **1 en 10,000** | ✅ | [C] | "By comparison, the odds of guessing a typical 4-digit passcode are 1 in 10,000." | 2023 (es aritmética: 10⁴ combinaciones, no envejece) |
| 9 | Al presentarlo en California, en 2017, Apple habló de **más de 30,000 puntos**; tarjeta "12 sep 2017 · Cupertino, California · Apple presenta el iPhone X" | ✅ | [D] | "September 12, 2017" · "Cupertino, California" · "Face ID projects more than 30,000 invisible IR dots." | 2017 (el año se dice en voz) |
| 10 | Pantalla: "Hoy su página de soporte dice 'miles de puntos'" | ✅ | [A] | "thousands of invisible dots" | 2026 |
| 11 | Apple avisa que la probabilidad sube con gemelos, hermanos parecidos y menores de 13; chip "sus rasgos aún pueden no estar desarrollados del todo" | ✅ | [A] | "The statistical probability is higher … for twins and siblings that look like you, and among children under the age of 13, because their distinct facial features might not have fully developed." | 2026 |
| 12 | Revisa que tengas los ojos abiertos: así es más difícil que lo abran mientras duermes (pantalla: ojos cerrados → sigue cerrado) | ✅ (por omisión; se puede apagar con "Require Attention", y se apaga solo si activas VoiceOver al configurar. La voz dice "más difícil", no "imposible") | [A], [B] | "It also recognizes if your eyes are open. This makes it more difficult for someone to unlock your device without your knowledge (such as when you are sleeping)." / "detecting that the user's eyes are open and their attention is directed at their device" | 2026 / 2024 |
| 13 | "Si tienes un gemelo, mejor usa un código" | ✅ | [A] | "If you're concerned about this, we recommend using a passcode to authenticate." | 2026 |
| 14 | Comparación cara 1 en 1,000,000 · huella 1 en 50,000 · código 1 en 10,000 (escena 6) | ✅ (las tres son cifras de Apple en sus páginas vigentes; Apple misma compara huella vs. código) | [A], [C] | ver filas 6–8 | 2026 / 2023 |
| 15 | Colores de la malla, puntos rojos visibles, "tu cara no es una llave: es un mapa" | ✅ como esquema/metáfora (el guion ya aclara "el dibujo es esquemático"; la luz infrarroja no se ve) | — | — | — |

Resumen: 14 ✅ · 1 ⚠️ · 0 ❌.

## Correcciones necesarias

1. **Fila 7 (huella, 1 en 50,000) ⚠️.** La cifra de Apple es "con un solo dedo registrado" y viene de una página publicada en nov 2023 (casi 3 años; sigue vigente en el sitio de Apple).
   - Pantalla, escena 6: cambiar la tarjeta a **"huella (Touch ID), 1 dedo registrado: 1 en 50,000"** y agregar a las tres tarjetas un chip chico **"cifras de Apple"** (la de la huella, "Apple, 2023").
   - Voz (opcional, si cabe en la duración): "Con la huella, Apple da una en cincuenta mil." No es indispensable: la frase anterior ya dice "Apple calcula" y el dato sigue siendo el vigente de Apple.
2. **Fila 12 (ojos abiertos), sugerencia opcional, no bloquea:** si cabe, "Y, de fábrica, revisa que tengas los ojos abiertos…". En `publicacion.md` conviene aclarar que esto se puede apagar en Accesibilidad.
