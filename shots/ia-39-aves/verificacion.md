# Verificación de hechos · Shot IA #39 · El dibujo escondido en el canto de un pájaro

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Revisado: `guion.md` (voz + columna "Lo que se ve") y `narracion.json`. Aún no hay `.jsx`.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho: "un dibujo escondido que **tus ojos nunca van a ver**. Tu celular, sí." | ⚠️ | Wood et al. 2022, *PLOS Biol* 20(6):e3001670 (PMC9239458); Cornell Chronicle 2021 | "The interface was built around a real-time spectrogram" (la propia app BirdNET le enseña el espectrograma al usuario) | 2022 |
| 2 | La app convierte el canto grabado en una imagen: un espectrograma | ✅ | Cornell Chronicle, 23 jun 2021 (Merlin), https://news.cornell.edu/node/321931 ; Wood et al. 2022 (app BirdNET) | "Each sound recording a user makes gets converted from a waveform to a spectrogram." | 2021 |
| 3 | El espectrograma muestra qué tan agudo, qué tan fuerte y cuánto dura cada sonido | ✅ | Cornell Chronicle 2021 | "a way to visualize the amplitude [volume], frequency [pitch] and duration of the sound" | 2021 |
| 4 | Cada canto deja su forma y la IA la mira como una foto | ✅ | Cornell Chronicle 2021; Kahl et al. 2021 (entrada = espectrogramas, red convolucional tipo ResNet) | "began treating the sounds as images and applying new and powerful image classification algorithms" | 2021 |
| 5 | Miles de voluntarios subieron millones de grabaciones de aves (y con eso se entrenó) | ✅ | Wood et al. 2022 | "The BirdNET algorithm could not exist without the thousands of skilled volunteers who contributed millions of recordings to the Macaulay Library and Xeno-canto." | 2022 |
| 6 | "En 2021 … **presentaron** BirdNET" | ⚠️ | Wood et al. 2022; Kahl et al. 2021, *Ecol Inform* 61:101236 | "The 2018 to 2020 version could identify 984 North American and European bird species" → BirdNET (y su versión de 984 especies) ya existía desde 2018; en 2021 se publicó el artículo científico que la describe | 2021/2022 |
| 7 | Cornell y una universidad de Alemania | ✅ | OpenAlex del DOI 10.1016/j.ecoinf.2021.101236 (afiliaciones: Cornell Lab of Ornithology; Chemnitz University of Technology) | Autores Kahl, Wood, Eibl, Klinck; instituciones "Cornell Lab of Ornithology", "Chemnitz University of Technology" | 2021 |
| 8 | Red de 157 capas | ✅ | Kahl et al. 2021 (abstract) | "derived from the family of residual networks (ResNets), consisted of 157 layers with more than 27 million parameters" | 2021 |
| 9 | Reconocía 984 especies de aves | ✅ (con la fecha de #6) | Kahl et al. 2021 | "capable of identifying 984 North American and European bird species by sound" | 2021 |
| 10 | "Ese mismo año ya reconocía más de tres mil" (pantalla "+3 000") | ✅ en sí, pero ⚠️ por cronología (ver #6) y **no es la cifra más nueva** (ver #15) | Wood et al. 2022 | "an early 2021 update enabled it to identify over 3,000 species from around the world"; resumen: "includes over 3,000 bird species" | 2021 |
| 11 | En 2020 su app la usaron más de un millón de personas (pantalla "+1.1 millones de personas, 2020") | ✅ | Wood et al. 2022 | "In 2020, the BirdNET App engaged >1.1 million participants" | 2020 |
| 12 | "con esas grabaciones se dibujó bien la migración de **una grulla** en Europa" (mapa península ibérica → norte) | ⚠️ (redacción) | Wood et al. 2022 | "we mapped 1,700 observations of the Common Crane (Grus grus)… corresponded with the species' known migration routes from the Iberian Peninsula to northern Europe" — es la ruta de la especie, no de un ave; y lo que hicieron fue *coincidir* con rutas ya conocidas | 2022 |
| 13 | El modelo mundial incluye zanate (*Quiscalus mexicanus*), gorrión doméstico (*Passer domesticus*) y tortolita cola larga (*Columbina inca*) | ✅ | `BirdNET_GLOBAL_6K_V2.4_Labels.txt` (BirdNET-Analyzer v1.1.0; 6 521 etiquetas, descargado y revisado) | "Quiscalus mexicanus_Great-tailed Grackle" · "Passer domesticus_House Sparrow" · "Columbina inca_Inca Dove" | 2023 (modelo V2.4) |
| 14 | Pantalla: TarjetaEstudio "2021 · Cornell Lab of Ornithology + TU Chemnitz · Kahl et al. · Ecological Informatics" | ✅ | Kahl et al. 2021 | (ver #7–#9) | 2021 |
| 15 | ¿Hay cifra más nueva de especies? | ⚠️ (dato desactualizado si se presenta como lo actual) | Docs oficiales BirdNET-Analyzer (historial de modelos); birdnet.cornell.edu; Zenodo BirdNET+ V3.0 *Preview 1* (10 nov 2025) | V2.4 (jun 2023, modelo por defecto hoy): "global selection of species (birds and non-birds) with 6,522 classes" / más de 6 000 especies. birdnet.cornell.edu: "BirdNET uses deep learning to recognize over 11,000 species globally" — no dice que sean solo aves y corresponde a V3.0, que sigue en vista previa para desarrolladores | 2023 / 2025–26 |

## Correcciones necesarias

1. **Gancho (#1) — no es justo.** Un espectrograma sí se puede ver: la app BirdNET literalmente lo muestra en vivo, y el propio video lo va a dibujar. Lo que no puedes es *oírlo* como dibujo. Propuesta (sigue siendo gancho #7, ahora cierto):
   > "En el canto de ese pájaro hay un dibujo escondido. Tus oídos no lo ven. Tu celular, sí."
   o
   > "Ese canto no es solo un sonido: es un dibujo que tu oído nunca va a ver. Tu celular, sí." (gancho #1 + #7)
   Y en el cierre (#9) "una foto escondida" está bien.

2. **Cronología (#6 y #10).** BirdNET no se "presentó" en 2021: su versión de 984 especies se usó de 2018 a 2020 y en 2021 salió el artículo. Además "ese mismo año ya reconocía más de tres mil" suena a que creció después del estudio, pero la actualización fue "a inicios de 2021", casi a la par. Propuesta:
   > "Con ellas, Cornell y una universidad de Alemania entrenaron a BirdNET: una red de ciento cincuenta y siete capas. De 2018 a 2020 reconocía novecientas ochenta y cuatro especies de aves. A inicios de 2021, ya más de tres mil."
   En pantalla: "2018–2020 · 984 especies" → "inicios de 2021 · +3 000". La TarjetaEstudio puede seguir diciendo "2021 · Kahl et al. · Ecological Informatics" (año del artículo).

3. **Cifra más nueva (#15).** El "+3 000" es de 2021 (más de 2 años): ya se dice el año, así que no es falso, pero hay dato más reciente. Opción recomendada para el dato extra/escena "Jardín":
   > "Y su modelo mundial de 2023 ya pasa de seis mil especies, entre ellas el zanate, el gorrión y la tortolita de tu jardín."
   (Fuente: historial oficial de modelos de BirdNET-Analyzer, V2.4: "6,522 classes", birds and non-birds; hay ~10–11 clases que no son especies (humano, perro, motor…), por eso decir "más de seis mil especies", no "6 522 aves".) **No usar "11 000"**: es la página web, no dice que sean solo aves y corresponde a V3.0, que sigue en vista previa.

4. **Grulla (#12).** Cambiar "la migración de una grulla" (suena a un ave individual) por:
   > "…y con 1 700 de esas grabaciones se dibujó la ruta de migración de la grulla común en Europa, igualita a la que ya se conocía."
   o más corto: "…y con esas grabaciones se reconstruyó la ruta de migración de la grulla común en Europa."

5. Menor, sin cambio obligatorio: "zanate" en pantalla con *Quiscalus mexicanus* ✅; el "+1.1 millones de personas, 2020" está bien (el artículo dice "participants").

## Re-verificación (29 oct 2026, coordinador)
Correcciones aplicadas como propuso el verificador:
- Gancho: «En el canto de ese pájaro hay un dibujo escondido. Tus oídos no lo ven. Tu celular, sí.» ✅
- Fechas: «De 2018 a 2020 reconocía 984 especies de aves. A inicios de 2021, ya más de tres mil.» (ya no "se presentó en 2021") ✅
- Jardín: «Y su modelo mundial de 2023 ya pasa de seis mil especies…» + pantalla «especies: aves y otros animales» (V2.4, 6,522 clases) ✅
- Grulla: «se reconstruyó la ruta de migración de la grulla común en Europa» ✅
- Recortes sin datos nuevos (Espectro, Foto, Estudio, Cierre; "foto escondida" es metáfora del espectrograma) ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
