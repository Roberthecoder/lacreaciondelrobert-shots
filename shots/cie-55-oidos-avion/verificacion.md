# Verificación de hechos · Shot Científico #55 · Por qué se te tapan los oídos en el avión
- **Fecha:** 29 oct 2026. **Quién verificó:** subagente verificador independiente (no escribió el guion).
- Revisado: `guion.md` (voz y columna "Lo que se ve") y `narracion.json` (12 líneas). Aún no hay animación (.jsx del shot), así que lo de pantalla se verificó contra la descripción del guion.
- Nota: las páginas de Mayo Clinic (mayoclinic.org) y del FAA devolvieron 403/404; el texto de Mayo Clinic se leyó en su copia oficial de la Mayo Clinic Care Network (Koç University Hospital, ©Mayo Foundation).

## Afirmaciones (voz y pantalla)
| # | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | El oído tapado en el avión no es por el ruido: es un desequilibrio de presión del aire detrás del tímpano (línea 0 y 11) | ✅ | Mayo Clinic, "Airplane ear" (copia Mayo Clinic Care Network, KUH) https://www.kuh.ku.edu.tr/mayo-clinic-care-network/mayo-clinic-health-information-library/diseases-conditions/airplane-ear | "Airplane ear is stress on the eardrum that happens when the air pressure in the middle ear and the air pressure outside the ear are out of balance." | 2024 (actualizado abr 2025) |
| 2 | Detrás del tímpano hay una cajita llena de aire: el oído medio | ✅ | MSD Manual (versión público), "Ears" https://www.msdmanuals.com/home/ear-nose-and-throat-disorders/biology-of-the-ears-nose-and-throat/ears | "The middle ear consists of the eardrum and a small air-filled chamber containing a chain of 3 tiny bones (ossicles)" | vigente 2026 |
| 3 | El oído medio se conecta con la garganta por la trompa de Eustaquio | ✅ | MedlinePlus, "Ear barotrauma" https://medlineplus.gov/ency/article/001064.htm | "The eustachian tube is the connection between the middle ear and the back of the nose and upper throat." | revisado 29 abr 2026 |
| 4 | La trompa casi siempre está cerrada | ✅ | Smith ME, Bance ML et al., "Advances in Eustachian tube function testing", World J Otorhinolaryngol Head Neck Surg (PMC6849358) | "The ET is normally closed in a healthy individual" | 2019 |
| 5 | La cabina va presurizada, pero con menos presión que a nivel del mar (y medidor «cabina» abajo de «nivel del mar») | ✅ | 14 CFR §25.841 (eCFR) https://www.ecfr.gov/current/title-14/part-25/section-25.841 | "cabin pressure altitude of not more than 8,000 feet under normal operating conditions" (8,000 ft × 0.3048 = 2,438 m de "altitud de cabina": la presión del aire a 2,438 m es menor que a nivel del mar) | vigente 2026 |
| 6 | Al bajar, la presión de la cabina vuelve a subir | ✅ | Stony Brook Surgical Associates / Otolaryngology, "Ears and Altitude" https://www.stonybrookmedicine.edu/sites/default/files/ears_and_altitude.pdf | "especially true when the airplane is landing, going from low atmospheric pressure down closer to earth where the air pressure is higher." | s/f (vigente) |
| 7 | La presión empuja el tímpano hacia adentro | ✅ | Stony Brook, "Ears and Altitude" (misma) | "a vacuum occurs, sucking the eardrum inward and stretching it." | s/f (vigente) |
| 8 | Al tragar o bostezar la trompa se abre un instante, pasa aire y la presión se iguala | ✅ | MedlinePlus, "Ear barotrauma"; Smith et al. 2019 | "Swallowing or yawning opens the eustachian tube and allows air to flow into or out of the middle ear. This helps equalize pressure on either side of the ear drum." / "the cartilaginous portion of the ET opens every 1–2 min with swallowing, yawning or other movements" | 2026 / 2019 |
| 9 | Ese paso de aire es el "pop" (por qué truena) | ✅ | Stony Brook, "Ears and Altitude" | "Normally, swallowing causes a little click or popping sound in the ear. This occurs because a small bubble of air has entered the middle ear" | s/f (vigente) |
| 10 | Ayuda masticar chicle, tragar seguido o bostezar, sobre todo al empezar a bajar | ✅ | American Academy of Otolaryngology (ENT Health), "Ears and Altitude (Barotrauma)" https://www.enthealth.org/conditions/ears-and-altitude-barotrauma/ | "Yawning, chewing gum, or sucking on hard candy can help, especially just before take-off and during descent." | vigente 2026 |
| 11 | A los bebés les ayuda tomar pecho o biberón durante el aterrizaje porque así tragan seguido | ✅ | Mayo Clinic (copia KUH); MedlinePlus | "Give babies or toddlers a bottle to suck on during takeoffs and landings to keep them swallowing." / "For infants and small children, nursing or taking sips of a drink may help." | 2024 / 2026 |
| 12 | Con gripa o alergia la trompa se inflama y cuesta más destaparla | ✅ | ENT Health (AAO-HNS); MSD Manual "Ears" | "swollen membranes in the nose can extend into the eustachian tube and block it" / "upper respiratory infections (such as the common cold), which inflame and block the eustachian tube" | vigente 2026 |
| 13 | Lo mismo te puede pasar al bajar una montaña en carro (versión corregida; se quitó "más suave") | ✅ | MedlinePlus, "Ear barotrauma" | "The problem often occurs with altitude changes, such as flying, scuba diving, or driving in the mountains." | 2026 |
| 14 | (Quitada) "más suave" que en el avión: ya no está en el guion | — | — | — | — |
| 15 | No se recomienda soplar con la nariz tapada (nota del guion; no sale en el video) | — | No es afirmación del video. (Mayo, MedlinePlus y ENT Health sí la mencionan como opción suave; omitirla no es falso) | — | — |

## Problemas encontrados
Primera revisión (29 oct 2026): 2 ⚠️ y una fuente mal atribuida. Ya están corregidas en `guion.md` y `narracion.json` y se volvieron a verificar:
1. **#5:** decía "con menos presión que en el suelo" (no vale para la CDMX, que está a ~2,240 m). Ahora dice "…con menos presión que a nivel del mar" y el medidor en pantalla dice «nivel del mar». ✅ según 14 CFR §25.841.
2. **#14:** decía "más suave" al bajar una montaña, y eso no se pudo verificar. Ahora dice "Lo mismo te puede pasar al bajar una montaña en carro." ✅ según MedlinePlus.
3. **Fuentes del guion:** se quitaron el FAA (folleto mal atribuido) y Cleveland Clinic (404). Ahora se citan AAO-HNS/enthealth.org, 14 CFR §25.841, MedlinePlus y el Manual MSD, que son las mismas fuentes de esta tabla. ✅

Sin ❌ ni ⚠️ pendientes.

VEREDICTO: APROBADO
