# Verificación de hechos · Shot IA #33 · La IA que sabe a qué huele una molécula sin olerla

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuentes abiertas: texto completo del manuscrito aceptado (PMC11898014, vía NCBI E-utilities), resumen y datos en PubMed (PMID 37651511 y 5573954), página del preprint en bioRxiv (10.1101/2022.09.01.504602).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | "Esta IA nunca ha olido nada: ve una molécula dibujada y dice a qué huele" (predice el olor solo con la estructura) | ✅ | Lee et al., *Science* 381:999 (PMC11898014) | "the model's predictions were based solely on nominal molecular structure" | 2023 |
| 2 | La carvona y su reflejo tienen los mismos átomos; una huele a hierbabuena y la otra a alcaravea (pantalla: "carvona: mismos átomos, en espejo") | ✅ | Friedman y Miller, *Science* 172:1044 (PMID 5573954) | "The enantiomers R-(-)- and S-(+)-carvone are the organoleptic constituents in oil of spearmint and caraway, respectively. Their odor distinctiveness has been unambiguously demonstrated…" | 1971 (hecho químico establecido) |
| 3 | La entrenaron con unas 5 000 moléculas de catálogos de aromas (pantalla: 50 cuadritos, 1 = 100 moléculas) | ✅ | Lee et al. 2023, Fig. 1B | "trained on a curated dataset of ~5000 semantically labeled molecules drawn from GoodScents and Leffingwell flavor and fragrance databases; one square represents 100 molecules" | 2023 |
| 4 | Etiquetas como "cremoso" o "a ajo" (pantalla también "a pasto") | ✅ | Lee et al. 2023 | "each described by multiple odor labels (e.g. creamy, grassy)"; "common food smells like nutty, garlic, and cheesy" | 2023 |
| 5 | Ve cada molécula como una red de átomos y enlaces (grafo; red neuronal de grafos) | ✅ | Lee et al. 2023 | "Each molecule was represented as a graph, with each atom described by its valence, degree… Each bond was described by its degree, aromaticity…" | 2023 |
| 6 | La ubica en un mapa de olores | ✅ | Lee et al. 2023 | "We used graph neural networks to generate a Principal Odor Map (POM)" | 2023 |
| 7 | "En 2023, Google y el Centro Monell de Filadelfia **lo probaron**" | ⚠️ | PubMed 37651511; bioRxiv 10.1101/2022.09.01.504602 | Publicado en *Science* "Epub 2023 Aug 31", pero la misma prueba prospectiva de 400 moléculas ya estaba en el preprint de **sept 2022** ("On a prospective validation set of 400 novel odorants…"). La prueba se hizo antes de 2023; 2023 es el año de publicación. Afiliaciones ✅: "Google Research, Brain Team"; "Monell Chemical Senses Center; Philadelphia, PA" | 2022 (prueba) / 2023 (publicación) |
| 8 | Quince personas entrenadas | ✅ | Lee et al. 2023 | "trained panel mean (n=15)"; "our cohort of ≥15 panelists (2 replicates)" | 2023 |
| 9 | Describieron 400 moléculas nuevas con 55 palabras | ✅ | Lee et al. 2023 | "55-odor label RATA data for 400 novel, intensity-balanced odorants" (nota: de las 400, "77 were dropped from the final prospective validation set"; la voz no dice que se evaluaran las 400, así que pasa) | 2023 |
| 10 | En 53 de cada 100, la IA se acercó más al promedio que el catador típico (pantalla: "53 %", "más cerca del promedio del panel que el panelista mediano") | ✅ | Lee et al. 2023 | "the model output comes closer to the panel mean than does the median panelist for 53% of molecules" ("catador típico" = panelista mediano: aceptable; el chip lo precisa) | 2023 |
| 11 | Donde más falló: el almizcle | ✅ | Lee et al. 2023 | "worst for the label musk"; "within the distribution of human raters for all labels except musk" | 2023 |
| 12 | El almizcle lo dan al menos cinco familias de moléculas | ✅ | Lee et al. 2023 | "which includes at least 5 distinct structural classes (macrocyclic, polycyclic, nitro, steroid-type, and straight-chain)" | 2023 |
| 13 | Ubicó en su mapa medio millón de moléculas de olor desconocido (pantalla: "≈ 500 000") | ✅ | Lee et al. 2023, Fig. 5A | "We compiled a list of ~500,000 potential odorants whose empirical properties are currently unknown to science or industry"; "2D trimap embedding of 500,000 unique likely odorants previously uncharacterized" | 2023 |
| 14 | "Olerlas le tomaría a una persona setenta años" (pantalla: "70 años oliendo sin parar") | ⚠️ | Lee et al. 2023 | "approximately 70 person-years of continuous smelling time" — la cifra es de olfateo **continuo, sin parar**; la voz sola suena a 70 años de vida normal. La pantalla sí lo dice bien. | 2023 |
| 15 | Cierre: "una IA ya lo lee en un dibujo… sin olerlo nunca" | ✅ | Igual que #1 | "based solely on nominal molecular structure" | 2023 |
| 16 | Pantalla: TarjetaEstudio "2023 · Science · Lee, Mayhew… Mainland, Wiltschko · Google Research + Monell (Filadelfia)" | ✅ | PubMed 37651511 | "Science. 2023 Sep;381(6661):999-1006… Lee BK, Mayhew EJ, … Mainland JD, Wiltschko AB" | 2023 |
| 17 | Descripción/postura: lo pagó Google y parte de los autores fundó/entró a una empresa que lo comercializa | ✅ (precisión) | Conflicto de interés, PubMed 37651511 | "The original work and funding for this manuscript was provided by Google Research… ABW, RCG and WWQ joined Osmo Labs, PBC, a new venture that is commercializing some of the technologies" — dice "joined" (se unieron), no "fundaron"; usar "se unieron a" en `publicacion.md` | 2023 |

Notas: no encontré un dato más nuevo que contradiga las cifras. Cada cifra dice de qué es. El dato tiene más de 2 años y la voz lo dice ("En 2023"). Las nubes de olor del gancho ("🍋 cítrico, fresco") y los colores del mapa son ilustrativos; conviene que `publicacion.md` diga "el dibujo es esquemático".

## Correcciones necesarias

1. **#7 (⚠️, año de la prueba).** Cambiar "En 2023, Google y el Centro Monell de Filadelfia lo probaron:" por
   **"En un estudio publicado en 2023, Google y el Centro Monell de Filadelfia lo pusieron a prueba:"** (o "En 2023, Google y el Centro Monell de Filadelfia publicaron la prueba:"). En la TarjetaEstudio el "2023" está bien porque es la cita de la revista.
2. **#14 (⚠️, falta "sin parar" en la voz).** Cambiar "olerlas le tomaría a una persona setenta años." por
   **"olerlas le tomaría a una persona setenta años sin parar."** (+2 palabras; revisar que el total siga en 61–62 s).
3. **#17 (solo para `publicacion.md`/descripción).** Decir "tres de los autores se unieron a Osmo, una empresa que comercializa parte de esta tecnología", no "fundaron".

## Re-verificación (29 oct 2026, coordinador)
- Estudio: «En 2023, Google y el Centro Monell de Filadelfia publicaron la prueba: quince personas entrenadas describieron cuatrocientas moléculas nuevas con cincuenta y cinco palabras.» (redacción alternativa del verificador: 2023 = publicación) ✅
- Mapa: «…olerlas le tomaría a una persona setenta años sin parar.» ✅ ("70 person-years of continuous smelling time")
- Recortes sin datos nuevos (Espejo, Red, Cierre) ✅; publicacion.md: tres autores se unieron a Osmo ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
