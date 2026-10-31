# Verificación de hechos · Shot IA #15 · Tu voz se clona con segundos: así funciona la estafa del "familiar en problemas"

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Fuentes abiertas directamente (arXiv: abstract y PDF; PLOS ONE; FTC; IC3/FBI; SEP). El shot aún no tiene `.jsx`; se revisó la columna "Lo que se ve" del guion.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Las estafas usan IA para clonar la voz de un familiar y pedir dinero (gancho "es una copia hecha por una IA") | ✅ | FTC, Alvaro Puig, consumer.ftc.gov/consumer-alerts/2023/03/… | "A scammer could use AI to clone the voice of your loved one." | 2023 |
| 2 | Paso 1: consiguen un audio corto de su voz, p. ej. de un video en redes | ✅ | FTC 2023 | "All he needs is a short audio clip of your family member's voice — which he could get from content posted online" | 2023 |
| 3 | Paso 2: un programa de clonación aprende a imitarla (onda "casi idéntica" en pantalla) | ✅ (descripción general, esquemática) | FBI/IC3 PSA I-120324-PSA | "Criminals generate short audio clips containing a loved one's voice to impersonate a close relative" | 2024 |
| 4 | Paso 3: llaman con prisa, inventan un choque o un arresto y piden dinero ya | ✅ | FTC 2023 (ejemplo) + FBI 2024 | FTC: "he wrecked the car and landed in jail"; FBI: "in a crisis situation, asking for immediate financial assistance or demanding a ransom" | 2023 / 2024 |
| 5 | En 2023, VALL-E, un modelo de Microsoft | ✅ | Wang et al., arXiv:2301.02111 (PDF: afiliación "Microsoft", correos @microsoft.com) | "Submitted on 5 Jan 2023"; "Correspondence: {yuwu1,shujliu,fuwei}@microsoft.com" | 2023 |
| 6 | Imitó voces que nunca había oído con una grabación de solo 3 segundos (pantalla "3 s") | ✅ (modelo de investigación, en inglés; el guion no lo generaliza) | arXiv:2301.02111 | "with only a 3-second enrolled recording of an unseen speaker as an acoustic prompt" | 2023 |
| 7 | Tarjeta "2023 · Microsoft · VALL-E (Wang et al., arXiv)" | ✅ | arXiv:2301.02111 | Primer autor Chengyi Wang; arXiv, 5 ene 2023 | 2023 |
| 8 | "En Londres, en 2023, 529 personas escucharon voces reales y falsas" | ⚠️ imprecisa → ✅ corregida (ver Re-verificación) | Mai et al., PLOS ONE 18(8): e0285333 | "We presented genuine and deepfake audio to n = 529 individuals"; "We recruited participants via the Prolific platform." Los autores son de UCL (Londres), pero los participantes se reclutaron en línea: el artículo NO dice que estuvieran en Londres | 2023 |
| 9 | Solo detectaron las falsas el 73 % de las veces; en pantalla: cuadrícula "de cada 100 voces falsas" con 73 descubiertas (azul) y 27 que engañaron (rojo), número "73 % falsas descubiertas" | ✅ (73 % es el acierto promedio al juzgar voces falsas; "de cada 100" es una forma correcta de mostrar ese porcentaje) | Mai et al., PLOS ONE, 2 ago 2023 | "Listeners only correctly spotted the deepfakes 73% of the time"; "They were better at identifying deepfakes (73% accuracy)" | 2023 |
| 10 | Tarjeta "2023 · University College London · Mai et al., PLOS ONE · 529 personas" | ✅ | PLOS ONE | "Department of Security and Crime Science, University College London, London, United Kingdom" | 2023 |
| 11 | "La voz que estás oyendo es mi voz clonada, con mi permiso" | ✅ (válido para la versión narrada final) | CLAUDE.md del repositorio | "la voz clonada de ElevenLabs (Voice ID `uiCk6APPfsjnw3oUQzVo`) se genera únicamente cuando Robert la aprueba" | 2026 |
| 12 | Defensa: no confíes solo en la voz | ✅ | FTC 2023 | "Don't trust the voice." | 2023 |
| 13 | Defensa: inventen en familia una palabra clave | ✅ | FBI/IC3 2024; Guardia Nacional/SEP (20 may 2026) | "Create a secret word or phrase with your family to verify their identity."; "Crea una palabra clave con familiares y amigos" | 2024 / 2026 |
| 14 | Defensa: cuelga y marca tú al número que ya conoces | ✅ | FTC 2023; SEP 2026 | "Call the person who supposedly contacted you and verify the story. Use a phone number you know is theirs."; "Si te piden dinero, verifica por otra vía" | 2023 / 2026 |
| 15 | Cierre: una voz se copia con segundos; la palabra secreta, si no la comparten, no | ✅ (conclusión lógica de 6 y 13, condicionada a no compartirla) | arXiv 2023 + FBI 2024 | ver filas 6 y 13 | 2023 / 2024 |

Revisión de reglas de cifras: "3 segundos" y "529 personas / 73 %" dicen de qué son y su año (2023, hace más de 2 años: se dice). No hay cifra de una fuente con enlace de otra. No encontré un dato más nuevo que contradiga los dos (estudios posteriores siguen encontrando que la gente no distingue bien las voces clonadas).

## Correcciones necesarias

1. **Fila 8 (⚠️):** "En Londres, en 2023, quinientas veintinueve personas escucharon…" sugiere que los participantes estaban en Londres; se reclutaron en línea (Prolific) y el artículo no dice dónde vivían. Propuesta de texto:
   > "En 2023, científicos de Londres pusieron a quinientas veintinueve personas a escuchar voces reales y falsas. Solo detectaron las falsas setenta y tres por ciento de las veces."

   (La tarjeta en pantalla "University College London · Mai et al., PLOS ONE · 529 personas" está bien.) Ojo: la frase propuesta tiene ~4 palabras más; ajustar duración si hace falta.

## Re-verificación (29 oct 2026, mismo verificador)

Se revisó solo lo que cambió: `narracion.json`, `vozclonada.jsx` (textos en pantalla y subtítulos) y `publicacion.md`.

| # | Afirmación nueva o cambiada | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R1 | "En 2023, científicos de Londres pusieron a 529 personas a escuchar voces reales y falsas" (voz); tarjeta "científicos de Londres (UCL) · Mai et al. · PLOS ONE"; chip "529 personas escucharon" | ✅ (corrige la fila 8) | Mai et al., PLOS ONE 18(8): e0285333 | "Department of Security and Crime Science, University College London, London, United Kingdom"; "We presented genuine and deepfake audio to n = 529 individuals" | 2023 |
| R2 | Cuadrícula "de cada 100 voces falsas": 73 descubiertas, 27 no; "73 % falsas descubiertas"; subtítulo "Descubrieron las falsas solo 73 %" | ✅ | Mai et al. 2023 | "Listeners only correctly spotted the deepfakes 73% of the time" | 2023 |
| R3 | Paso 1: "consiguen un audio corto de su voz, como un video que subió a redes" | ✅ | FTC 2023 | "a short audio clip of your family member's voice — which he could get from content posted online" | 2023 |
| R4 | "En 2023, un modelo de Microsoft, VALL-E, imitó voces que nunca había oído con una grabación de solo tres segundos"; tarjeta "Microsoft · modelo VALL-E · Wang et al. · arXiv:2301.02111"; chip "voces que nunca había oído" | ✅ | arXiv:2301.02111 (PDF) | "with only a 3-second enrolled recording of an unseen speaker as an acoustic prompt"; "Correspondence: {yuwu1,shujliu,fuwei}@microsoft.com" | 2023 |
| R5 | "La voz que oyes es mi voz clonada, con mi permiso"; chips "esta voz: clonada" y "con mi permiso ✔" | ✅ | CLAUDE.md del repositorio | voz clonada de ElevenLabs (Voice ID `uiCk6APPfsjnw3oUQzVo`) que "se genera únicamente cuando Robert la aprueba" | 2026 |
| R6 | publicacion.md (YouTube): "En enero de 2023, investigadores de Microsoft presentaron VALL-E… (voces en inglés). Los mismos autores advirtieron que podía usarse para hacerse pasar por alguien." | ✅ | arXiv:2301.02111, sección "Broader impacts" del PDF; enviado el 5 ene 2023 | "it may carry potential risks in misuse of the model, such as spoofing voice identification or impersonating a specific speaker" | 2023 |
| R7 | publicacion.md: estudio de UCL "en inglés y en mandarín", 529 personas, 73 % | ✅ | Mai et al. 2023 | "We ran our experiments in English and Mandarin" | 2023 |
| R8 | publicacion.md (resto de redes): resúmenes con 3 segundos (Microsoft, 2023), 529 personas / 73 % (Londres, 2023), palabra clave y llamar al número conocido | ✅ | Mismas fuentes de las filas 2, 6, 9, 13 y 14 | ver filas citadas | 2023 / 2024 / 2026 |

Todas las afirmaciones quedan ✅. Ya no hay correcciones pendientes.

VEREDICTO: APROBADO
