# Verificación de hechos · Shot IA #27 · La IA que le devolvió la voz a Ann

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Revisado: `guion.md` (voz + columna "Lo que se ve") y `narracion.json`. Todavía no hay `.jsx`.
- Fuentes primarias abiertas: texto completo de Metzger et al. 2023 (*Nature*, PMC10826467, vía NCBI E-utilities), texto completo de Willett et al. 2023 (PMC10468393) y texto completo de Card et al. 2024 (*NEJM*, PMC11328962). No se pudo abrir el comunicado de UCSF (ucsf.edu da 403); sus citas se comprobaron en Global News (que lo cita), Fortune (2023) y en UC Berkeley News (13 ago 2025).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Ann quedó sin voz por un "derrame" (chip: "derrame en 2005") | ⚠️ | Metzger et al. 2023, *Nature* (Métodos) | "She experienced a pontine infarct in 2005, when she was 30 years old" · "basilar-artery brainstem stroke" | 2023 |
| 2 | Le pusieron **sobre** el cerebro una lámina delgada con **253 electrodos** | ✅ | Metzger 2023; Global News (comunicado UCSF); Fortune | "The ECoG array consists of 253 disc-shaped electrodes" · "a paper-thin grid of 253 electrodes onto the surface of Johnson's brain" | 2023 |
| 3 | Al intentar hablar, su cerebro manda órdenes a labios, lengua y mandíbula | ✅ | Metzger 2023; Global News (UCSF) | "attempted movements of the lips, tongue and jaw" · "would have gone to muscles in Ann's lips, tongue, jaw and larynx" | 2023 |
| 4 | Una IA las convirtió en palabras (texto), voz y gestos (avatar) | ✅ | Metzger 2023 | "We trained deep-learning models… text, speech audio and facial-avatar animation" | 2023 |
| 5 | Llegó a **unas 78 palabras por minuto** | ✅ | Metzger 2023 | "a median rate of 78 words per minute and median word error rate of 25%" · "median real-time decoding rate of 78.3 WPM" | 2023 |
| 6 | **14 palabras por minuto** con "el aparato que sigue sus ojos" (presente: "escribe") | ⚠️ | Metzger 2023 vs. Global News/Berkeley | Artículo: "she has used commercial head-tracking assistive technology… at up to 14 words per minute" (14.2 WPM). Global News: device "tracks her eye movements". Berkeley 2025: "She communicates mostly using an eye-tracking system… about 14 words per minute" | 2023 / 2025 |
| 7 | La voz salió de un video de su boda | ✅ | Metzger 2023; Global News; Fortune; Berkeley 2025 | Artículo: "a short clip of our participant's voice extracted from a pre-injury video of her". Global News: "trained on a recording of a speech Johnson gave on her wedding day". Fortune: "reconstructed from a wedding video" | 2023 |
| 8 | Ann dijo que era "como oír a una vieja amiga" | ✅ | Global News (cita a UCSF) | "'It's like hearing an old friend.'" ("old friend" no marca género; "un viejo amigo/una vieja amiga" ambos válidos) | 2023 |
| 9 | Ese mismo día de 2023 Stanford publicó otro caso (tarjeta: 23 ago 2023 · *Nature* · Willett y Metzger) | ✅ | *Nature* 620 (mismo número); PMC de ambos | Metzger: Nature 620:1037–1046; Willett: Nature 620:1031–1036; ambos publicados en línea el 23 ago 2023 | 2023 |
| 10 | Pat, con ELA, llegó a **62 palabras por minuto** | ✅ | Willett et al. 2023; HealthDay 2023 (nombre) | "Our participant's attempted speech was decoded at 62 words per minute" · "Our participant (T12) has bulbar-onset amyotrophic lateral sclerosis (ALS)" · HealthDay: "Bennett… at 62 words per minute" | 2023 |
| 11 | "Tú, platicando, dices unas **160**" | ⚠️ | Willett 2023 | "begins to approach the speed of natural conversation (160 words per minute)" — cifra de conversación natural citada para inglés; no está medida para español ni para "tú" | 2023 |
| 12 | "En 2024, a Casey le atinaba 97 de cada 100 palabras" | ⚠️ | Card et al. 2024, *NEJM*; UC Davis 2024 | "sustained 97.5% accuracy… over 8.4 months after surgical implantation" · UC Davis: "implanted in July 2023". La precisión se midió entre 2023 y 2024; lo de 2024 es la publicación | 2024 |
| 13 | La primera vez, lloró de alegría | ✅ | Card 2024 (Métodos); UC Davis 2024 | "the participant cried with joy as the words he was trying to say correctly appeared on-screen" | 2024 |
| 14 | Cada estudio fue con una sola persona | ✅ | Metzger, Willett, Card | "a clinical-trial participant" · "our study participant" · Card: "This study involved a single participant" | 2023–2024 |
| 15 | Todavía no es un tratamiento disponible / "no está a la venta" / "en investigación" | ✅ | Los tres son ensayos clínicos (NCT03698149, BrainGate); Card: "it is uncertain if similar results can be expected in future users" | No se encontró ningún implante de habla aprobado a la venta al 29 oct 2026 | 2024–2026 |
| 16 | Cierre: "esa cara **ya dice** lo que Ann quiere decir, con una voz que suena a ella" (presente) | ⚠️ | UC Berkeley News, 13 ago 2025 | "In February 2024, Johnson had her implant removed for a reason unrelated to the trial." | 2025 |
| 17 | La voz es sintetizada y personalizada (no su voz real) | ✅ | Metzger 2023 | "personalization to the participant's pre-injury voice" (YourTTS, voice conversion) | 2023 |

## Correcciones necesarias

1. **#1 "derrame":** en el artículo fue un *infarto* del tallo cerebral (pontine infarct = isquémico, por obstrucción); "derrame" en sentido estricto es sangrado. Propuesta voz: «…la mueve el cerebro de Ann, a quien una embolia dejó sin voz.» (o «un infarto cerebral»). Chip: "Ann · embolia en 2005".
2. **#6 "aparato que sigue sus ojos":** la fuente primaria (Metzger 2023) dice que en el estudio usaba seguimiento de **cabeza**; la prensa dice ojos. Además está en presente. Propuesta: «Llegó a unas setenta y ocho palabras por minuto; con el aparato que usaba para escribir, apenas catorce.»
3. **#11 "Tú dices unas 160":** es la cifra de conversación natural del artículo (en inglés), no medida en "tú". Propuesta: «Una plática normal anda en unas ciento sesenta.» (en pantalla: "plática normal ≈ 160").
4. **#12 "En 2024":** la precisión se midió desde julio de 2023; 2024 es el año del estudio. Propuesta: «En un estudio de 2024, a Casey le atinaba noventa y siete de cada cien palabras. La primera vez, lloró de alegría.» (el chip "2024 · UC Davis · NEJM" está bien).
5. **#16 cierre en presente:** a Ann le retiraron el implante en febrero de 2024. Propuesta: «Pero esa cara llegó a decir lo que Ann quería decir, con una voz que sonaba a ella.» (Opcional, chip: "el implante se retiró en 2024".) Por coherencia, la escena 2 también puede ir en pasado: «Cuando intentaba hablar, su cerebro aún mandaba órdenes a labios, lengua y mandíbula.»
