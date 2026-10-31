# Verificación de hechos · Shot IA #42 · ¿Una IA puede leer tu mente? Solo si tú te dejas

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion).
- Fuente principal leída completa: Tang, LeBel, Jain y Huth, *Nature Neuroscience* 26: 858–866 (2023), texto completo de PMC11304553
  (bajado con efetch de NCBI). Abiertas también: boletín UT Austin (1 may 2023); Scientific Frontline sobre Tang y Huth,
  *Current Biology* (feb 2025); NPR/KPBS sobre Kunz et al., *Cell* (ago 2025).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho (voz + chip "por ahora"): "una máquina todavía no puede leer tu mente… por ahora, necesita que tú te dejes" | ⚠️ (generaliza a *toda* máquina) | Tang et al. 2023 (PMC11304553); Tang y Huth 2025 (*Current Biology*, vía sflorg.com); Kunz et al. 2025 (*Cell*, vía NPR/KPBS) | 2023: "subject cooperation is currently required both to train and to apply the decoder. However, future developments might enable decoders to bypass these requirements." 2025: "works only with cooperative participants who participate willingly in training". Pero con implantes (2025): "participants in the study couldn't prevent the BCI from decoding the numbers they were thinking about … even though they did not intend to share them." | 2023 / 2025 |
| 2 | En Texas, tres personas en una resonancia (fMRI) | ✅ | Tang et al. 2023 | "We trained decoders for three subjects" · "BOLD fMRI responses were recorded while three subjects listened to 16 h of narrative stories." (Universidad de Texas en Austin) | 2023 |
| 3 | Dieciséis horas de historias en audio (chip "16 h") | ✅ | Tang et al. 2023 | "We recorded brain responses while the subject listened to sixteen hours of naturally spoken narrative stories" | 2023 |
| 4 | Una IA aprendió cómo se enciende el cerebro de cada una con cada idea (un modelo por persona) | ✅ (simplificación válida) | Tang et al. 2023, Fig. 1a | "An encoding model was estimated for each subject to predict brain responses from semantic features of stimulus words." | 2023 |
| 5 | Luego oían historias nuevas y la máquina escribía | ✅ | Tang et al. 2023 | "evaluated each subject's decoder on separate, single-trial brain responses that were recorded while the subject listened to novel test stories that were not used for model training." | 2023 |
| 6 | Ejemplo: «todavía no tengo licencia de manejo» → «ella ni siquiera ha empezado a aprender a manejar» | ✅ (traducción fiel) | Boletín UT Austin, 1 may 2023 | "I don't have my driver's license yet" → "She has not even started to learn to drive yet." | 2023 |
| 7 | No eran las palabras exactas: era la idea | ✅ (dicho del ejemplo) | Tang et al. 2023; UT Austin | "While our decoder successfully reconstructs the meaning of language stimuli, it often fails to recover exact words" · "The result is not a word-for-word transcript" · "capture the gist of what is being said or thought" | 2023 |
| 8 | Universidad de Texas en Austin, estudio de 2023; tarjeta "Tang, LeBel, Jain y Huth · Nature Neuroscience" | ✅ | Tang et al. 2023 | *Nature Neuroscience* 26(5): 858–866, en línea 1 may 2023, DOI 10.1038/s41593-023-01304-9 | 2023 |
| 9 | Con el cerebro de alguien con quien no se entrenó, apenas le atinó más que al azar (medidor junto a "azar") | ✅ | Tang et al. 2023 | "Cross-subject decoders performed barely above chance, and substantially worse than within-subject decoders" · UT: "Results for individuals on whom the decoder had not been trained were unintelligible" | 2023 |
| 10 | Quien sí la entrenó pudo sabotearla nombrando animales en su mente; casi no le atinaba | ✅ | Tang et al. 2023, Ext. Data Fig. | "within-subject decoders successfully recovered 52–57% of time-points when subjects passively listened, … 0–3% of time-points when subjects resisted by naming animals" · "Naming animals and telling a different story significantly lowered decoding performance" | 2023 |
| 11 | También describió lo que pasaba en cortos animados sin sonido | ✅ | Tang et al. 2023 | "recover the meaning of perceived speech, imagined speech, and even silent videos" · "subjects viewed four 4–6 min movie clips from animated short films" · "Each movie clip was presented without sound" | 2023 |
| 12 | Los autores piden reglas que protejan tu privacidad mental | ✅ ("reglas" = policies) | Tang et al. 2023 | "it is critical to raise awareness of the risks of brain decoding technology and enact policies that protect each person's mental privacy" | 2023 |
| 13 | "Así que hoy tu mente sigue siendo tuya" (y "privacidad mental ✔" en pantalla) | ⚠️ (misma generalización que #1) | Kunz et al. 2025 (NPR/KPBS); Tang y Huth 2025 | Para decodificadores no invasivos sigue haciendo falta cooperación (2025: "works only with cooperative participants"), pero con implantes se decodificaron números pensados sin intención de compartirlos (2025). | 2025 |
| 14 | Notas: datos de 7 personas para la prueba entre personas; cortos de Pixar y *Sintel*; contar de 7 en 7 funcionó solo a veces (4–50 %) | ✅ | Tang et al. 2023 | "Data were collected from three female subjects and four male subjects" · "La Luna", "Presto", "Partly Cloudy" (Pixar) y "Sintel" (Blender Foundation) · "4–50% of time-points when subjects resisted by counting by sevens" | 2023 |

Revisiones extra:
- Cada cifra dice de qué es (3 personas, 16 h de historias) y el año 2023 se dice en voz y pantalla. ✅
- No se mezclan cifras de una fuente con el enlace de otra. ✅
- Dato más nuevo: en 2025 (Tang y Huth, *Current Biology*) el entrenamiento para una persona nueva bajó a ~1 h viendo videos mudos,
  **pero sigue necesitando su cooperación**, así que no contradice el estudio de 2023 tal como se cuenta. Lo que sí matiza el gancho
  y el cierre es el estudio de implantes de 2025 (ver #1 y #13).

## Correcciones necesarias

1. **#1 Gancho (⚠️).** "Una máquina todavía no puede leer tu mente" suena a *ninguna* máquina; en 2025 un implante cerebral (con
   cirugía) llegó a decodificar números que los participantes pensaban sin querer compartirlos. Propuesta, acotando a lo no invasivo
   (que es justo el tema del shot):
   - Voz: «¿Por qué una máquina todavía no puede leer tu mente desde afuera? Porque, por ahora, necesita que tú te dejes.»
   - (Alternativa: «…leer tu mente sin cirugía?»). Chip "por ahora" se queda; se puede añadir chip "sin cirugía".
2. **#13 Cierre (⚠️).** Mismo ajuste: «Así que hoy, desde afuera, tu mente sigue siendo tuya, y los autores piden reglas que protejan
   tu privacidad mental.» (o «…con esta técnica, tu mente sigue siendo tuya…»). Ojo: ajustar duración si se añaden palabras
   (≈ +2–3 palabras cada cambio; quitar algo equivalente si pasa de 62 s).
3. Opcional, para `publicacion.md`/comentario fijado: mencionar que en 2025 el mismo equipo redujo el entrenamiento a ~1 h, pero sigue
   pidiendo cooperación (refuerza el mensaje, no es obligatorio).

## Re-verificación (29 oct 2026, coordinador)
- Gancho: «¿Por qué una máquina todavía no puede leer tu mente desde afuera? Porque, por ahora, necesita que tú te dejes.» ✅ (texto del verificador)
- Cierre: «Así que hoy, desde afuera, tu mente sigue siendo tuya, y los autores piden reglas que protejan tu privacidad mental.» ✅
- Pregunta (recorte): «Eso probaron en Austin, en un estudio de 2023» (UT Austin; nombre completo en la tarjeta) ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
