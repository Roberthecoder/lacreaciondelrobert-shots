# Shot IA #42 · ¿Una IA puede leer tu mente? Solo si tú te dejas

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #42 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N5 "El experimento" (se recrea el experimento de Texas: escáner → entrenamiento → prueba → los dos intentos de "espiar").
- **Gancho (de los 7):** #6 Mito "¿Por qué NO…?": «¿Por qué una máquina todavía no puede leer tu mente?».
- **Duración:** voz 958 caracteres / 172 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** ni pánico ni hype: lo que sí logró (la idea general, sin cirugía) y sus límites reales (necesita tu
  cooperación para entrenar y para funcionar). El estudio es de **2023** y se dice. Distinto del ia-27 (implantes con cirugía que
  devuelven el habla): aquí no hay cirugía y el tema es la privacidad mental.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | ¿Por qué una máquina todavía no puede leer tu mente? Porque, por ahora, necesita que tú te dejes. | Fondo rosa; desde el cuadro 0 una cabeza de perfil con un casco-antena; de la cabeza sale una burbuja de pensamiento que la máquina intenta "jalar" con un cable… y rebota contra un candado. Chip "por ahora". |
| 1 | Escaner | En Texas metieron a tres personas a una resonancia y les pusieron dieciséis horas de historias en audio. | Un resonador (dona gigante) con una persona acostada y audífonos; 3 siluetas; reloj que corre hasta "16 h" de historias. |
| 2 | Aprende | Una IA aprendió cómo se enciende el cerebro de cada una con cada idea. Luego oían historias nuevas, y la máquina escribía. | Fondo oscuro (por dentro de la máquina): un cerebro con zonas que se prenden; la red neuronal conecta cada patrón con palabras; luego una pantalla escribe sola. |
| 3 | Ejemplo | Alguien oyó: «todavía no tengo licencia de manejo». La máquina escribió: «ella ni siquiera ha empezado a aprender a manejar». No eran las palabras exactas: era la idea. | Dos globos lado a lado: "lo que oyó" / "lo que escribió la máquina" (ejemplo real del estudio, traducido); un volante y una licencia; luego chip "≠ palabras · = idea". |
| 4 | Pregunta | ¿Entonces ya pueden espiar lo que piensas? Eso probaron en la Universidad de Texas en Austin, en un estudio de 2023. | **Re-gancho.** "?" gigante con un ojo espía; luego tarjeta "2023 · UT Austin · Tang, LeBel, Jain y Huth · Nature Neuroscience". |
| 5 | Ajeno | Con el cerebro de alguien con quien no se entrenó, apenas le atinó más que al azar. | Prueba 1: se conecta a otra cabeza (una que no entrenó); la pantalla escupe letras revueltas; medidor de aciertos casi en el piso, junto a la marca "azar". |
| 6 | Sabotaje | Y quien sí la entrenó pudo sabotearla: con solo nombrar animales en su mente, casi no le atinaba. | Prueba 2: la persona entrenada cierra los ojos y en su burbuja desfilan animales (gato, ajolote, perro…); el medidor baja de "escuchando" a casi cero. |
| 7 | Extra | Lo raro: también describió lo que pasaba en cortos animados sin sonido. | Una pantallita de cine muda (ícono 🔇) con un cortometraje animado genérico; la máquina escribe una frase debajo. |
| 8 | Cierre | Así que hoy tu mente sigue siendo tuya, y los autores piden reglas que protejan tu privacidad mental. | **Regreso a la imagen del inicio**: la misma cabeza; el candado de la burbuja se cierra con brillo y aparece "privacidad mental ✔". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y un poco misteriosa; zumbido rítmico de resonancia en el escáner, tic de reloj hasta "16 h", chispitas
cuando se prenden zonas del cerebro, tecleo cuando la máquina escribe, "error" desafinado con las letras revueltas, un ¡pop! por cada
animal, clic del candado al final.

## Fuentes (abiertas el 29 oct 2026)

1. Tang, J., LeBel, A., Jain, S. y Huth, A. G. "Semantic reconstruction of continuous language from non-invasive brain recordings".
   *Nature Neuroscience* 26(5): 858–866 (2023; en línea el 1 de mayo de 2023). DOI 10.1038/s41593-023-01304-9 · PMC11304553
   (texto completo leído con la API efetch de NCBI PMC). Universidad de Texas en Austin.
   > "Here we introduce a non-invasive decoder that reconstructs continuous language from cortical semantic representations recorded using functional magnetic resonance imaging (fMRI)."
   > "We trained decoders for three subjects and evaluated each subject's decoder on separate, single-trial brain responses that were recorded while the subject listened to novel test stories that were not used for model training."
   > "We recorded brain responses while the subject listened to sixteen hours of naturally spoken narrative stories" · Fig. 1a: "BOLD fMRI responses were recorded while three subjects listened to 16 h of narrative stories."
   > "While our decoder successfully reconstructs the meaning of language stimuli, it often fails to recover exact words"
   > "As brain-computer interfaces should respect mental privacy, we tested whether successful decoding requires subject cooperation, and found that subject cooperation is required both to train and to apply the decoder."
   > "To test if decoders can be trained without a person's cooperation, we attempted to decode perceived speech from each subject using decoders trained on data from other subjects." · "Cross-subject decoders performed barely above chance, and substantially worse than within-subject decoders"
   > "subjects silently performed three cognitive tasks—calculation ("count by sevens"), semantic memory ("name and imagine animals"), and imagined speech ("tell a different story")" · "within-subject decoders successfully recovered 52–57% of time-points when subjects passively listened, … 0–3% of time-points when subjects resisted by naming animals" · "Naming animals and telling a different story significantly lowered decoding performance in each cortical region, demonstrating that decoding can be resisted."
   > "this decoder generates intelligible word sequences that recover the meaning of perceived speech, imagined speech, and even silent videos" · "subjects viewed four 4–6 min movie clips from animated short films" · "Each movie clip was presented without sound"
   > "it is critical to raise awareness of the risks of brain decoding technology and enact policies that protect each person's mental privacy"
   > "our privacy analysis suggests that subject cooperation is currently required both to train and to apply the decoder."
2. UT Austin News, "Brain Activity Decoder Can Reveal Stories in People's Minds" (1 de mayo de 2023),
   https://news.utexas.edu/2023/05/01/brain-activity-decoder-can-reveal-stories-in-peoples-minds/
   > Ejemplo: "I don't have my driver's license yet" → "She has not even started to learn to drive yet."
   > "this system does not require subjects to have surgical implants, making the process noninvasive."
   > "Results for individuals on whom the decoder had not been trained were unintelligible"
   > "not a word-for-word transcript" … "capture the gist of what is being said or thought"

## Notas
- "Tres personas" = los 3 sujetos con los que se entrenaron los decodificadores (para la prueba entre personas usaron datos de 7).
- "Dieciséis horas de historias en audio" = historias narradas de *The Moth Radio Hour* y *Modern Love* (podcasts); en pantalla se puede decir "podcasts".
- "Casi no le atinaba" (nombrar animales) = 0–3 % de los momentos decodificados bien, contra 52–57 % escuchando sin resistir.
  No se usa "contar de siete en siete": según la figura, esa resistencia funcionó solo a veces (4–50 %).
- "Apenas más que al azar" = "barely above chance" (decodificador entrenado con otras personas).
- El ejemplo del manejo es real (Fig. 1 / boletín de UT Austin), traducido al español.
- "Reglas" = "policies" (políticas públicas), no necesariamente leyes.
- El dibujo es esquemático; el cortometraje en pantalla es genérico (los reales eran cortos de Pixar y *Sintel*).
