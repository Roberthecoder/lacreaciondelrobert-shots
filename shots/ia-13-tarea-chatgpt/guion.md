# Shot IA #13 · Estudiar con ChatGPT: mejor en la tarea, peor en el examen

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #13 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N2 "El número" (+48 % en la práctica contra −17 % en el examen) + consejo útil (pide pistas, no respuestas).
- **Gancho (de los 7):** #4 "Un número que contradice": la IA sube 48 % la práctica… y baja 17 % el examen.
- **Duración:** voz 947 caracteres / 172 palabras (≈ 57.8 s) + cierre 3.5 s → **≈ 61.3 s** en la base (estimar-escenas).
- **Público:** estudiantes de secundaria/prepa/universidad. Le habla a "tú" en el consejo final.
- **Postura de la serie:** crítica con datos y consejo útil. El experimento es de **2023** (GPT-4 de entonces) y se dice; no se afirma nada de las versiones de hoy.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Con ChatGPT, unos estudiantes sacaron cuarenta y ocho por ciento más en la práctica… y diecisiete por ciento menos en el examen. | Fondo amarillo; desde el cuadro 0 una laptop con un chat escribe la respuesta en una hoja de ejercicios: palomitas verdes y número gigante **"+48 %"** que sube. Corte con fundido a una hoja de examen: el número se voltea a **"−17 %"** en rojo. |
| 1 | Mito | Sentían que aprendían, pero terminar la tarea no es aprender. | `MitoTachado`: "tarea terminada = aprendí" → tachado. |
| 2 | Estudio | Lo midieron en una prepa de Turquía a finales de 2023, con casi mil estudiantes de matemáticas. | `TarjetaEstudio`: "otoño 2023 · prepa en Turquía · ~1,000 estudiantes · Bastani, Bastani, Sungu y col. · PNAS 2025 (U. de Pensilvania)". Mapa chiquito de Turquía. |
| 3 | Grupos | Unos practicaron con un ChatGPT normal, otros con un tutor de IA y otros solo con libro y apuntes. | Tres salones (columnas): "GPT Base" (laptop con chat), "GPT Tutor" (laptop con foco 💡 de pista), "Sin IA" (libro y cuaderno). |
| 4 | Examen | Luego vino el examen sin nada: ni compu, ni apuntes. / Los del ChatGPT normal sacaron diecisiete por ciento menos que los del libro. | Las laptops y apuntes se cierran y desaparecen; queda una hoja y un lápiz. Barras del examen: "Sin IA" contra "GPT Base −17 %" (barra más baja en rojo). "Ahí salió el número del principio." |
| 5 | Pregunta | ¿Cómo te quita puntos algo que te ayudó? | **Re-gancho.** "?" gigante sobre la laptop; Robert grande. |
| 6 | Muleta | Revisaron los chats: la gran mayoría solo le pedía la respuesta y la copiaba. Lo usaban como muleta. | `CelularChat`/laptop con burbujas: "¿Cuál es la respuesta?" repetido (el mensaje más común en GPT Base); un estudiante copia; aparece una muleta dibujada apoyada en el cuaderno. |
| 7 | Errores | Y ese ChatGPT de 2023 acertaba solo la mitad de las veces. / Lo peor: ellos no sentían haber aprendido menos. | Medidor "respuestas correctas de GPT Base: 51 %" (moneda que gira: cara/cruz). Luego un termómetro de "cuánto creían que aprendieron" que se queda arriba mientras la barra real baja. |
| 8 | Tutor | El tutor tenía una regla: dar pistas, no respuestas. Con él, el daño en el examen casi desapareció. | El robotito tutor levanta un foco 💡 "pista" y tapa la respuesta; barra del examen "GPT Tutor ≈ Sin IA" (sin diferencia). |
| 9 | Cierre | Así que cuando estudies con IA, pídele pistas, no la respuesta: el examen lo harás tú solo. | **Regreso a la imagen del inicio**: la misma laptop y hoja; el chat ahora escribe "dame una pista" y el lápiz lo mueve el estudiante; el "−17 %" se tacha y aparece "pistas, no respuestas ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (tensa desde el examen hasta la pregunta, se suelta con el tutor); tecleo cuando el chat escribe, "ding" con cada palomita, golpe seco cuando el número se voltea a −17 %, laptops que se cierran ("clac"), la moneda que gira, un "plin" de foco con cada pista.

## Fuentes (abiertas en el texto completo el 29 oct 2026)

1. Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö. y Mariman, R. "Generative AI without guardrails can harm learning: Evidence from high school mathematics". *PNAS* 122(26): e2422633122 (publicado el 25 de junio de 2025). DOI 10.1073/pnas.2422633122 · PMC12232635 (texto completo abierto, leído con la API de Europe PMC). Wharton School, Universidad de Pensilvania. Corrección (PNAS 122(34): e2518204122, ago 2025): solo cambia la afiliación de Osbert Bastani; no toca datos.
   > "We study this question via a field experiment where we provide nearly a thousand high school math students with access to generative AI tutors."
   > "we deploy two generative AI tutors: one that mimics a standard ChatGPT interface ("GPT Base") and one with prompts designed to safeguard learning ("GPT Tutor")."
   > "having GPT-4 access while solving problems significantly improves performance (48% improvement in grades for GPT Base and 127% for GPT Tutor). However, we additionally find that when access is subsequently taken away, students actually perform worse than those who never had access (17% reduction in grades for GPT Base)"
   > "These negative learning effects are largely mitigated by the safeguards in GPT Tutor."
   > "In collaboration with a high school in Turkey, we conducted a large-scale randomized controlled trial (RCT)"
   > "The study took place at a large high school in Turkey during the Fall semester of the 2023–2024 academic year."
   > "We conducted four 90-min sessions for about fifty 9th, 10th, and 11th-grade classes, comprising nearly 1,000 students."
   > Grupos: "i) access to a standard chat interface based on GPT-4, designed to mimic the widely used ChatGPT tool (called GPT Base), ii) access to a specialized chat interface built on GPT-4 using guardrails designed based on teacher input (called GPT Tutor), and iii) no access to generative AI resources." · "The control arm is business-as-usual, having students work through the practice problems with access to course books and notes with no devices provided."
   > Examen: "The third part is an unassisted evaluation, where students take a closed-book, closed-laptop exam."
   > "on the exam, students in the GPT Base arm perform statistically significantly worse than students in the control arm by 17%; this negative effect is essentially eradicated in the GPT Tutor arm, though we still do not observe a positive effect."
   > "students often use GPT Base as a "crutch" by asking for and copying solutions" · "These results suggest that the vast majority of students are using GPT Base to obtain solutions"
   > "the most common message used by students in the GPT Base arm—i.e., "What is the answer?""
   > "We find that GPT Base gives a correct answer only 51% of the time on average; it makes logical errors 42% of the time and arithmetic errors 8% of the time."
   > "While students in the GPT Base arm performed worse on the exam (relative to the control arm), they did not perceive that they performed worse or learned less."
   > "First, the prompt instructs GPT-4 to provide hints to the student without directly giving them the answer, to encourage learning"
   > Limitaciones: "our study focuses on two generative AI tutors for a single topic (mathematics) deployed in a single high school in Turkey." · "Our deployment was also carried out in Fall 2023 … both closed and open-weight models have significantly improved in performance since then."
   - Versión previa: working paper en SSRN (2024), "Generative AI Can Harm Learning". Las cifras del guion son las de PNAS 2025.

## Notas
- "Cuarenta y ocho por ciento más en la práctica" = mejora de GPT Base frente al grupo sin IA en los ejercicios asistidos (0.137 sobre una media de 0.284). "Diecisiete por ciento menos en el examen" = GPT Base frente al grupo sin IA (−0.054 sobre 0.321). Son mejoras/caídas **relativas al grupo sin IA**, no puntos.
- El gancho dice "unos estudiantes" (los del grupo GPT Base), no "todos los que usan ChatGPT".
- "ChatGPT normal" = GPT Base: interfaz tipo ChatGPT sobre GPT-4, hecha por los investigadores (no la app de OpenAI tal cual). En pantalla se rotula "GPT Base (tipo ChatGPT)".
- "A finales de 2023" = semestre de otoño 2023–2024. "Prepa" = 9.º, 10.º y 11.º grado (≈ 3.º de secundaria a 2.º de prepa en México); se dice "prepa" porque el artículo dice "high school". ⚠️ para el verificador.
- "Casi mil" = "nearly 1,000 students".
- "Acertaba solo la mitad" = 51 % de respuestas correctas al preguntarle "What is the answer?" 10 veces por cada uno de los 57 ejercicios.
- "Casi desapareció" = "essentially eradicated" / "largely mitigated"; con el tutor **no** mejoraron en el examen (se aclara en publicacion.md).
- El tutor además tenía la solución correcta y los errores comunes escritos por profesores (no se dice en la voz por tiempo; va en publicacion.md).
- Es un solo estudio, una escuela, una materia y efectos de corto plazo; se dirá en la descripción.
- El dibujo es esquemático.
