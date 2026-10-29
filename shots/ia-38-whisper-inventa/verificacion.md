# Verificación de hechos · Shot IA #38 · La IA que transcribe tu voz a veces escribe lo que nadie dijo

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- Fuentes abiertas: (P) Koenecke, Choi, Mei, Schellmann y Sloane, "Careless Whisper: Speech-to-Text Hallucination Harms", ACM FAccT '24, DOI 10.1145/3630106.3658996 — PDF completo de arXiv:2402.08021v2 descargado y leído (texto extraído con pdftotext). (AP) Burke y Schellmann, Associated Press, "AI-powered transcription tool used in hospitals invents things no one said, researchers say", leído en la reproducción de KSL.com (publicada el 27 oct 2024; el texto original de apnews.com bloquea la lectura automática).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Voz + pantalla) Alguien solo dijo «toma el pan y la crema de cacahuate» | ✅ | P, sección 2 | "the audio segment whose actual audio contains only the words: "pick the bread and peanut butter."" | 2023 (corrida de abril) |
| 2 | (Voz + pantalla) La IA le agregó una receta: «en un tazón grande, mezcla la mantequilla»; nadie lo dijo | ✅ | P, sección 2 | "the April 2023 Whisper run yields the transcription "Take the bread and add butter. In a large mixing bowl, combine the softened butter."" · "the bolded sentences are entirely hallucinated" | 2023 |
| 3 | Chip "ejemplo real del estudio, traducido" | ✅ | P | (mismo ejemplo; traducción libre fiel: *pick* → "toma", *peanut butter* → "crema de cacahuate") | 2023 |
| 4 | Whisper es la IA de OpenAI que pasa voz a texto | ✅ | P, resumen | "We evaluate Open AI's Whisper, a state-of-the-art automated speech recognition service" | 2024 |
| 5 | "Suele atinar" | ✅ | P, resumen | "While many of Whisper's transcriptions were highly accurate" | 2024 |
| 6 | En 2023 hicieron las pruebas | ✅ | P | "based on experiments conducted in April and May 2023" | 2023 |
| 7 | Un equipo de Cornell y otras universidades; autoras en tarjeta (Koenecke, Choi, Mei, Schellmann, Sloane · ACM FAccT 2024) | ✅ | P, portada | "ALLISON KOENECKE, Cornell University … ANNA SEO GYEONG CHOI, Cornell University … KATELYN X. MEI, University of Washington … HILKE SCHELLMANN, New York University … MONA SLOANE, University of Virginia" · "ACM FAccT '24, June 3–6, 2024, Rio de Janeiro" | 2024 |
| 8 | Le dio más de trece mil audios (pantalla: "13,140 fragmentos de audio") | ✅ | P, sección 1 | "running 13,140 audio segments through the default Whisper API" | 2023 |
| 9 | Cerca de una de cada cien transcripciones traía frases enteras inventadas (pantalla: "≈ 1 de cada 100 (1.4 % en el estudio)") | ✅ | P, resumen y sección 3 | "roughly 1% of audio transcriptions contained entire hallucinated phrases or sentences which did not exist in any form in the underlying audio" · "1.4% of audio segments yielded a hallucination sequence" | 2023 |
| 10 | Casi cuatro de cada diez inventos eran dañinos (pantalla: 38 %) | ✅ | P, sección 3 | "Across all hallucinated transcriptions, 38% contain at least one of these types of harms." | 2023 |
| 11 | Tipos de daño: violencia, enfermedades falsas, «gracias por ver» (íconos: violencia, enfermedad inventada, "¡gracias por ver!" = falsa autoridad) | ✅ | P, sección 2.5 y fig. 2 | "(1) Perpetuation of Violence" · "(c) made up health statuses" · "(3) False Authority: … (b) thanking viewers" · "ends with four characters translating to "thanks for watching"—an example of the harm of false authority" | 2024 |
| 12 | Pasó más con personas con afasia (pantalla: "afasia 1.7 % · sin afasia 1.2 %") | ✅ | P, sección 4.2 | "1.7% aphasia audio segments yielded hallucinations, versus only 1.2% of control group audio segments" (p=0.019) | 2023 |
| 13 | …que hablan con pausas largas | ✅ | P, resumen y 4.2 | "individuals who speak with longer shares of non-vocal durations—a common symptom of aphasia" · "larger non-vocal shares of total durations for aphasia speakers relative to control speakers (41% versus 15%" | 2024 |
| 14 | Las autoras sospechan (hipótesis) que en el silencio su parte que predice palabras rellena el hueco (pantalla: etiqueta "hipótesis") | ✅ (dicho como hipótesis) | P, secciones 1, 4.1 y 4.2 | "We hypothesize that there are two components…" · "longer pauses … could result in more hallucinations due to Whisper being seeded by noise rather than speech" · "perhaps implying that Whisper's over-reliance on OpenAI's language modeling advancements is what leads to hallucinations" · "Whisper hallucinates entire made-up sentences when no one is speaking" | 2024 |
| 15 | "Las autoras": las cinco firmantes son mujeres | ✅ | P, portada | Allison, Anna Seo Gyeong, Katelyn X., Hilke, Mona | 2024 |
| 16 | Con esos audios problema, Google, Amazon y Microsoft no inventaron nada así (pantalla: "0 inventos así") | ✅ | P, sección 4.1 | "we identified exactly 0 comparable hallucination concerns … from Google's products out of the 187 identified audio segments. We similarly identified exactly 0 comparable hallucination concerns among the same 187 audio segments from Amazon, Microsoft, AssemblyAI, and RevAI" | 2023–2024 (Google abr/dic 2023; resto ene 2024) |
| 17 | En 2024 AP reportó que más de treinta mil clínicos usaban una herramienta con Whisper (pantalla: "AP, octubre 2024 · +30,000 clínicos (herramienta de Nabla basada en Whisper)") | ✅ | AP (reproducción KSL, 27 oct 2024) | "Over 30,000 clinicians and 40 health systems, including the Mankato Clinic in Minnesota and Children's Hospital Los Angeles, have started using a Whisper-based tool built by Nabla" | 2024 |
| 18 | Cierre: consejo "pide revisarla: eso quizá no lo dijo nadie" | ✅ (consejo, no dato; con "quizá") | AP | Nabla: "requires medical providers to quickly edit and approve transcribed notes" | 2024 |

**Revisión de reglas de cifras**
- Cada cifra dice de qué es (audios/fragmentos, transcripciones, inventos, clínicos). ✅
- Años: los datos del estudio se presentan tras "En dos mil veintitrés" y el de AP con "En dos mil veinticuatro" (justo 2 años). ✅
- No se mezcla cifra de una fuente con el enlace de otra: todas las cifras del estudio vienen del PDF; la de 30,000 viene de AP. ✅
- Datos más nuevos: el propio paper reporta que tras actualizaciones de noviembre 2023 seguían fallando 12 de 187 fragmentos; el guion no afirma cómo está Whisper hoy, así que no hay contradicción. Algunos medios posteriores citan cifras mayores de clínicos de Nabla (p. ej. ~45,000); como el guion fecha la cifra en 2024 con AP y dice "más de", sigue siendo correcta.

## Correcciones necesarias

Ninguna ❌ ni ⚠️. Sugerencias opcionales (no obligatorias):
- Escena 6: si cabe, "que **suelen** hablar con pausas largas" (las pausas largas son un síntoma común de la afasia, no de todas las personas con afasia).
- Escena 7: la frase junta las dos hipótesis del paper (el silencio/ruido y el modelo de lenguaje); está bien así porque se dice como sospecha y lleva la etiqueta "hipótesis" en pantalla; mantener esa etiqueta en la animación.
