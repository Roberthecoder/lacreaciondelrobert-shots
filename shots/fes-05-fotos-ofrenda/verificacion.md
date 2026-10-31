# Verificación de hechos · Shot Festivo #05 · Día de Muertos · IA (fotos restauradas por IA)

Verificador independiente (subagente que no escribió el guion), 28 oct 2026. Fuentes abiertas: arXiv 2003.03808v3 (PDF), github.com/adamian98/pulse, The Register (24 jun 2020), arXiv 2004.09484, arXiv 1603.08511, arXiv 1801.07892.

## Primera ronda

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| "Esta foto de tu bisabuela no está restaurada: una parte la inventó una IA" | ⚠️ solo es cierta si la foto en pantalla pasó por una IA (es un dibujo) | github.com/adamian98/pulse | "PULSE makes imaginary faces of people who do not exist" | 2020 |
| Una foto vieja pierde: rayones, manchas, grano y partes borradas | ⚠️ "partes borradas" no viene textual | arxiv.org/abs/2004.09484 | "the structured defects, such as scratches and dust spots" / "the unstructured defects, such as noises and blurriness" | 2020 |
| La IA no recupera lo borrado: lo adivina | ✅ | github.com/adamian98/pulse (model card) | "It will not help identify or reconstruct the original image." | 2020 |
| Aprendió viendo muchísimas fotos y rellena con lo más probable | ✅ | arxiv.org/abs/1801.07892 · arXiv 2003.03808v3 | "These methods can generate visually plausible image structures and textures." | 2018 / 2020 |
| Una foto en blanco y negro no guarda colores: la IA los elige | ✅ | arxiv.org/abs/1603.08511 | "hallucinating a plausible color version of the photograph" / "This problem is clearly underconstrained." | 2016 |
| PULSE se presentó en 2020 | ✅ | arxiv.org/abs/2003.03808 | "Computer Vision and Pattern Recognition (CVPR) 2020" | 2020 |
| PULSE es de la Universidad Duke | ✅ | arXiv 2003.03808v3 · theregister.com/2020/06/24/ai_image_tool/ | "Duke University, Durham, NC" / "PULSE developed by researchers at Duke University, 2020" | 2020 |
| "Convierte caras pixeleadas en caras nítidas" | ⚠️ no hace nítida la cara original: inventa una que encaja | arXiv 2003.03808v3 | "searching for images that downscale to the original LR image" | 2020 |
| Foto pixeleada de Obama → cara de hombre blanco | ✅ | theregister.com/2020/06/24/ai_image_tool/ | "the result is, instead, someone that has white skin, blue eyes, and brown hair." | 2020 |
| "Rellenó con el tipo de caras que más había visto al aprender" | ⚠️ PULSE se apoya en StyleGAN (de NVIDIA), que genera sobre todo caras blancas; la causa se debatió | arXiv 2003.03808v3, secc. 6 | "it seems that sampling from StyleGAN yields white faces much more frequently than faces of people of color" | 2020 |
| Cuanto más dañada, más inventa | ⚠️ deducción, no dato medido | arXiv 2003.03808v3, fig. 3 | "visually distinct images, created with PULSE, can all downscale … to the same LR image." | 2020 |

## Correcciones aplicadas (texto final)

| Afirmación corregida | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| "Si una IA restauró la foto de tu bisabuela, una parte no es real: la inventó." (condicional; el dibujo es esquemático) | ✅ | github.com/adamian98/pulse · arxiv.org/abs/1603.08511 | "It will not help identify or reconstruct the original image." / "hallucinating a plausible color version" | 2020 / 2016 |
| "rayones, manchas, polvo y grano" | ✅ | arxiv.org/abs/2004.09484 | "scratches and dust spots" / "noises and blurriness" | 2020 |
| "PULSE, una IA que inventa una cara nítida que encaje con una foto pixeleada" | ✅ | arXiv 2003.03808v3 · github.com/adamian98/pulse | "searching for images that downscale to the original LR image" / "PULSE makes imaginary faces of people who do not exist" | 2020 |
| "No fue a propósito: la IA en la que se apoyaba casi siempre generaba caras blancas." | ✅ | arXiv 2003.03808v3, secc. 6 | "sampling from StyleGAN yields white faces much more frequently than faces of people of color" | 2020 |
| "Cuanto más dañada está la foto, menos información queda, y más tiene que rellenar la IA." (dicho como deducción) | ✅ | arXiv 2003.03808v3, fig. 3 | "visually distinct images … can all downscale … to the same LR image." | 2020 |
| "Así que la foto restaurada no es tu bisabuela tal cual: es lo que una IA cree que era." | ✅ | github.com/adamian98/pulse | "It will not help identify or reconstruct the original image." | 2020 |
| "Guarda siempre también la original" | consejo, no es dato | — | — | — |

Afirmaciones revisadas: 12 · corregidas: 6 · quitadas: 0.

## Verificación independiente (28 oct 2026)

Un segundo verificador (otro agente, que no escribió el guion) abrió las fuentes. Resultado: **NO PASA** por una exageración y el título.

**Lo que se marcó:**
- ⚠️ «la IA en la que se apoyaba casi siempre generaba caras blancas» — exagerado. El artículo de PULSE dice "much more frequently" y la cifra medida es 72.6 % (no "casi siempre"). En pantalla salían 10 de 12 caras claras.
- ⚠️ Título de YouTube «La IA no restaura la foto de tu bisabuela: la inventa» — exagerado: sí restaura, y además inventa una parte (como dice la voz).

**Cómo se corrigió:**
- Voz: «No fue a propósito: la IA en la que se apoyaba generaba sobre todo caras blancas.» · etiqueta «sobre todo: caras blancas» · subtítulo «Su IA de apoyo: *sobre todo caras blancas.*» · ahora son 9 caras claras de 12 (≈ 75 %, cerca del 72.6 %).
- TikTok, Instagram y YouTube: «generaba sobre todo caras blancas».
- Título de YouTube: «La IA no solo restaura la foto de tu bisabuela: inventa una parte 🕯️ | Shot Festivo #05».

**Re-verificación de las frases nuevas** (abiertas por la sesión que corrigió: PDF de arXiv v3 y la nota de The Register):

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| "la IA en la que se apoyaba generaba sobre todo caras blancas" | ✅ | Menon et al., PULSE, arXiv 2003.03808v3, secc. 6 (PDF) | "Overall, it seems that sampling from StyleGAN yields white faces much more frequently than faces of people of color" | 2020 |
| ídem (la proporción; 9 de 12 caras claras en pantalla) | ✅ | The Register, 24 jun 2020: https://www.theregister.com/2020/06/24/ai_image_tool/ | "it spat out images of white people 72.6 per cent of the time, compared to just 10.1 per cent for black people, and 3.4 per cent for Indian people." | 2020 |
| Título: "no solo restaura… inventa una parte" | ✅ | Repositorio oficial de PULSE (model card) | "PULSE makes imaginary faces of people who do not exist" | 2020 |

VEREDICTO: APROBADO
