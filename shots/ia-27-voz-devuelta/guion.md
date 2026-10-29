# Shot IA #27 · La IA que le devolvió la voz a Ann: implantes que leen lo que tu cerebro quiere decir

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #27 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`: 12 ✅ y 5 ⚠️ ya corregidas; las frases cambiadas esperan re-verificación), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~944 créditos).
- **Formato:** N1 "Por dentro" (de la cara en la pantalla → dentro del cerebro → de vuelta a la cara, ya con su voz) + N3 "Capítulos y medidores" (velocímetro de palabras por minuto: 14 → 78; barras 78 · 62 · ≈160).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo que se ve: «Esa cara en la pantalla no habla sola: la mueve el cerebro de Ann».
- **Duración:** voz 944 caracteres (≈ 57.9 s) + cierre 3.5 s → **61.4 s** en la base (suma de `OM_SCENES`).
- **Postura de la serie:** a favor con datos (la IA sí decodifica el intento de hablar), con matiz crítico: cada estudio fue con una sola persona, no es un tratamiento disponible, y a Ann le retiraron el implante en febrero de 2024 (por eso el cierre va en pasado).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa cara en la pantalla no habla sola: la mueve el cerebro de Ann, a quien un infarto cerebral dejó sin voz. | Fondo rosa; desde el cuadro 0 el monitor se enciende y la cara del avatar empieza a hablar; a la derecha, Ann (esquemática, en silla) con un conector dorado en la cabeza y un cable al monitor con pulsos. Chip "Ann · infarto cerebral (2005)". |
| 1 | Implante | Le pusieron sobre el cerebro una lámina con doscientos cincuenta y tres electrodos. | Fondo amarillo: cerebro de perfil; la lámina cae sobre la zona del habla. Abajo, la lámina en grande: 23 × 11 = 253 electrodos que se encienden uno por uno; contador "253 electrodos". |
| 2 | Ordenes | Cuando intentaba hablar, su cerebro aún mandaba órdenes a labios, lengua y mandíbula. | Por dentro (fondo oscuro): el cerebro se enciende y salen chispas hacia labios, lengua y mandíbula; una barrera roja ("el infarto corta el paso") las detiene. |
| 3 | IA | Una inteligencia artificial las convirtió en palabras, voz y gestos. | Fondo de circuito: las chispas entran a una red neuronal (onda que la recorre); salen tres chips: "texto", "voz", "gestos". |
| 4 | Rapidez | Llegó a unas setenta y ocho palabras por minuto; con su aparato para escribir, apenas catorce. | Velocímetro de palabras por minuto: la aguja marca 14 ("su aparato para escribir") y luego sube a 78 ("implante + IA: unas 78"). |
| 5 | Pregunta | ¿Y de dónde sacaron su voz? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Boda | De un video de su boda. Ann dijo que era como oír a una vieja amiga. | Una tele vieja con un video de boda (esquemático: velo, saco, "● REC"); una onda de voz viaja de la tele al monitor del avatar. Cita: «Es como oír a una vieja amiga.» |
| 7 | Estudio | Ese mismo día de 2023, Stanford publicó otro: Pat, con ELA, llegó a sesenta y dos por minuto. | `TarjetaEstudio` "2023 · Stanford y UCSF · el mismo día · Willett et al. y Metzger et al. · Nature · 23 ago 2023"; barras "Ann (UCSF) 78" y "Pat (Stanford) · con ELA 62". |
| 8 | Estudio | Una plática normal anda en unas ciento sesenta. | Aparece la tercera barra: "una plática normal ≈160". |
| 9 | Lagrimas | En un estudio de 2024, a Casey le atinaba noventa y siete de cada cien palabras. La primera vez, lloró de alegría. | Cien casillas de palabras: 97 se ponen verdes con ✓ y 3 rojas; contador "97/100"; chip "2024 · UC Davis · NEJM"; cara feliz con lágrima ("lloró de alegría"). |
| 10 | Ojo | Ojo: cada estudio fue con una sola persona; aún no es un tratamiento disponible. | Tres figuritas (Ann, Pat, Casey), cada una "1 persona"; sello "EN INVESTIGACIÓN"; chip "todavía no se puede pedir". |
| 11 | Cierre | Pero esa cara llegó a decir lo que Ann quería, con una voz que sonaba a ella. | **Regreso a la imagen del inicio**: el mismo monitor, la cara sonríe y habla con la onda de voz y un globo "¡Hola!"; Ann sonríe. Chip "el implante se retiró en 2024". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave y cálida, continua, debajo de la voz. Efectos: notas al encender el monitor y pulsos del cable; golpe suave cuando cae la lámina y 40 tics mientras se encienden los electrodos; zumbido "por dentro", chispas y un golpe sordo en la barrera del infarto; zumbido de la red y tres notas (texto, voz, gestos); la aguja sube dos veces; proyector de la tele vieja y la onda de voz; tres barras que suben; notas cortas por cada casilla verde y tres tics de las fallas; gotas de la lágrima; golpe del sello; acorde luminoso en el cierre.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y de dónde sacaron su voz?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «Esa cara en la pantalla no habla sola» (cuadro 0) |
| 2 | 12.6 | 16.6 | 06_pensativo_menton | `arriba-der` | «su cerebro aún mandaba órdenes» |
| 3 | 23.9 | 26.6 | 13_senalando_arriba | `izq-alto` | señala la aguja que sube a 78 |
| 4 | 26.8 | 29.6 | 07_pensativo_puno | `grande` | «¿Y de dónde sacaron su voz?» |
| 5 | 38.7 | 41.3 | 04_bajando_lentes | `arriba-der` | «Una plática normal anda en unas ciento sesenta» |
| 6 | 45.1 | 48.1 | 05_sonriendo_dientes_uniformes | `arriba-der` | «lloró de alegría» |
| 7 | 48.8 | 53.0 | 10_serio_molesto | `arriba-der` | «cada estudio fue con una sola persona» |
| 8 | 54.0 | 57.8 | 13_senalando_arriba | `arriba-der` | señala la cara que «llegó a decir lo que Ann quería» |
| — | 57.9 | 61.4 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 8 · ≈ 28.1 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.4 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. **Metzger, S. L., Littlejohn, K. T., Silva, A. B., Moses, D. A., Seaton, M. P. … Chang, E. F.** "A high-performance neuroprosthesis for speech decoding and avatar control". *Nature* 620: 1037–1046 (publicado el 23 de agosto de 2023). DOI 10.1038/s41586-023-06443-4 · PMC10826467. Universidad de California, San Francisco (UCSF) y UC Berkeley. Resumen abierto en nature.com y Europe PMC.
   > "Here we use high-density surface recordings of the speech cortex in a clinical-trial participant with severe limb and vocal paralysis… text, speech audio and facial-avatar animation." (2023)
   > "For text, we demonstrate accurate and rapid large-vocabulary decoding with a median rate of 78 words per minute and median word error rate of 25%." (2023)
   > "For speech audio, we demonstrate intelligible and rapid speech synthesis and personalization to the participant's pre-injury voice." (2023)
   > Video suplementario 7: "This algorithm was conditioned on audio from a short video clip of her speaking in a pre-injury video." (2023)
   > "datePublished":"2023-08-23" (metadatos de nature.com).
2. **Global News (Canadá), "AI brain implant helps Sask. woman speak for the 1st time in 18 years"**, 24 ago 2023 (cita el comunicado de UCSF):
   > "Ann Johnson was just 30 years old when she experienced a stroke in 2005 that left her paralyzed and unable to speak." (2023)
   > "The team surgically implanted a paper-thin grid of 253 electrodes onto the surface of Johnson's brain, covering the areas that are important for speech." (2023)
   > "The electrodes intercepted the brain signals that, if not for the stroke, would have gone to muscles in Ann's lips, tongue, jaw and larynx, as well as her face," (comunicado de UCSF, 2023)
   > "The system can translate Johnson's brain activity into text at a rate of nearly 80 words per minute, much faster than the 14 words per minute she can achieve typing out words with her current communication device, which tracks her eye movements." (2023)
   > "The model was trained on a recording of a speech Johnson gave on her wedding day" (2023)
   > "'My brain feels funny when it hears my synthesized voice,' she told UCSF. 'It's like hearing an old friend.'" (2023)
3. **HealthDay (reproducido por Powers Health), "ALS Robbed Her of Speech, But Technology Is Changing That"**, 22–23 ago 2023:
   > "Using a clip from her wedding video, we were able to decode these sounds into a voice that sounded just like her own prior to her stroke," said Sean Metzger (UCSF). (2023)
   > "Four baby aspirin-sized sensors implanted in Bennett's brain are now converting her brain waves into words on a computer screen at 62 words per minute" (2023)
   > "Bennett received her ALS diagnosis in 2012." · "But ALS has robbed Bennett, 68, of her ability to speak." (2023)
4. **Willett, F. R., Kunz, E. M., Fan, C., Avansino, D. T., Wilson, G. H. … Henderson, J. M.** "A high-performance speech neuroprosthesis". *Nature* 620: 1031–1036 (publicado el 23 de agosto de 2023). DOI 10.1038/s41586-023-06377-x · PMC10468393 (texto completo abierto en Europe PMC). Universidad de Stanford.
   > "our study participant—who can no longer speak intelligibly owing to amyotrophic lateral sclerosis—achieved a 9.1% word error rate on a 50-word vocabulary… and a 23.8% word error rate on a 125,000-word vocabulary" (2023)
   > "Our participant's attempted speech was decoded at 62 words per minute, which is 3.4 times as fast as the previous record and begins to approach the speed of natural conversation (160 words per minute)." (2023)
   > "Our participant (T12) has bulbar-onset amyotrophic lateral sclerosis (ALS)… but is unable to produce intelligible speech." (2023)
5. **Card, N. S., Wairagkar, M., Iacobacci, C. … Brandman, D. M., Stavisky, S. D.** "An Accurate and Rapidly Calibrating Speech Neuroprosthesis". *New England Journal of Medicine* 391(7): 609–618 (2024). DOI 10.1056/NEJMoa2314132 · PMC11328962. UC Davis Health (Sacramento, California).
   > "A 45-year-old man with amyotrophic lateral sclerosis (ALS)… With further training data, the neuroprosthesis sustained 97.5% accuracy over a period of 8.4 months after surgical implantation" (2024)
   > "Decoded words were displayed on a screen and then vocalized with the use of text-to-speech software designed to sound like his pre-ALS voice." (2024)
6. **UC Davis Health, comunicado "New brain-computer interface allows man with ALS to 'speak' again"** (agosto de 2024):
   > "To develop the system, the team enrolled Casey Harrell, a 45-year-old man with ALS, in the BrainGate clinical trial." (2024)
   > "At this point, we can decode what Casey is trying to say correctly about 97% of the time" (Brandman, 2024)
   > "The first time we tried the system, he cried with joy as the words he was trying to say correctly appeared on-screen." (2024)

## Notas
- **"Una sola persona por estudio":** los tres resúmenes hablan de un participante: "a clinical-trial participant" (Metzger), "our study participant" (Willett), "A 45-year-old man" (Card).
- **78 palabras por minuto** es la **mediana** de la decodificación a texto (por eso "unas setenta y ocho"), con un vocabulario de 1,024 palabras y un error mediano de 25 % (1 de cada 4 palabras). Las **14 palabras por minuto** son con el aparato que usaba para escribir: el artículo dice "commercial head-tracking assistive technology… at up to 14 words per minute" (seguía su cabeza; la prensa dijo ojos), por eso la voz no dice cuál.
- **Pat Bennett:** 62 palabras por minuto; errores de 9.1 % (vocabulario de 50 palabras) y 23.8 % (vocabulario de 125,000). Las tasas de error no se dicen en la voz para no saturar; pueden ir chiquitas en la tarjeta del estudio.
- **"Ese mismo día":** ambos artículos se publicaron en *Nature* el 23 de agosto de 2023 (mismo número, vol. 620).
- **160 palabras por minuto** = velocidad de una conversación natural según Willett et al. 2023 (cifra citada para inglés). La voz dice «Una plática normal anda en unas ciento sesenta», no "tú dices".
- **97 de cada 100:** el artículo dice 97.5 % de precisión sostenida durante 8.4 meses tras el implante (julio de 2023); el comunicado de UC Davis dice "about 97%". La voz dice «En un estudio de 2024» (2024 es la publicación, no la medición).
- **"Lloró de alegría"** fue la primera vez que vio en pantalla las palabras correctas (comunicado de UC Davis).
- **"Infarto cerebral" (no "derrame"):** Metzger et al. 2023 (Métodos): "She experienced a pontine infarct in 2005, when she was 30 years old" · "basilar-artery brainstem stroke" (infarto del tallo cerebral, por obstrucción).
- La voz de Ann es **sintetizada** y personalizada con un clip de su boda: por eso el cierre dice "una voz que sonaba a ella", no "su voz real".
- **Cierre en pasado:** UC Berkeley News (13 ago 2025): "In February 2024, Johnson had her implant removed for a reason unrelated to the trial." Por eso «llegó a decir lo que Ann quería» y el chip "el implante se retiró en 2024".
- La IA no "lee pensamientos": decodifica las señales del intento de hablar (las órdenes motoras a labios, lengua, mandíbula y laringe).
- El dibujo del cerebro, la lámina y las personas es esquemático.
