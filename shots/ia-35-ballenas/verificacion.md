# Verificación de hechos · Shot IA #35 · Los cachalotes tienen un "alfabeto" de clics (y la IA no lo tradujo)

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion).
- Fuentes abiertas completas: Sharma et al. 2024, *Nature Communications* 15:3617 (texto completo, Europe PMC PMC11076547);
  comunicado MIT CSAIL / Schwarzman College of Computing (7–8 mayo 2024); Beguš et al. 2025, *Open Mind* 9:1849–1874
  (texto completo, Europe PMC PMC12594577).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Dos cachalotes "contestándose" con clics (intercambio; azul y naranja como la fig. 1) | ✅ | Sharma et al., *Nat. Commun.* | "A Shows a two-minute exchange between two whales (with clicks visualized in blue and orange respectively)" | 2024 |
| 2 | "Esto no es código Morse" / "no es Morse: es un sistema de piezas" | ✅ (retórico; literalmente cierto) | Sharma et al. | El artículo compara el mecanismo con Morse: "using similar mechanisms to those employed by human sound production and representation systems (e.g., speech, text, Morse code, and musical notation)". No es falso decir que no es Morse, pero ver nota en Correcciones. | 2024 |
| 3 | "Con algoritmos vieron que se arman como un alfabeto" | ✅ | Comunicado MIT CSAIL; Sharma et al. | MIT: "recently used algorithms to decode the 'sperm whale phonetic alphabet'"; "the team used a mix of algorithms for pattern recognition and classification". Artículo: "this 'sperm whale phonetic alphabet'"; métodos = agrupamiento (clustering), gráficas de intercambio y pruebas de permutación. | 2024 |
| 4 | Cada serie de clics se llama coda | ✅ | Sharma et al. | "communicate using sequences of clicks called codas" | 2024 |
| 5 | Antes se agrupaban en 21 tipos (pantalla: "21 tipos de coda") | ✅ | Sharma et al. | "Prior work identified 21 discrete coda types"; "comprising 8719 codas making up 21 previously defined coda types" (clan EC‑1) | 2024 |
| 6 | En 2024, el MIT y el Proyecto CETI | ✅ | Sharma et al.; MIT | Afiliaciones: MIT CSAIL, Project CETI (además Carleton Univ., Dominica Sperm Whale Project, Baruch College). Publicado 7 may 2024 (vol. 15, 3617). | 2024 |
| 7 | Autores: Sharma, Gero, Payne, Gruber, Rus, Torralba y Andreas · *Nature Communications* | ✅ | Sharma et al. (lista de autores) | 7 autores, en ese orden. | 2024 |
| 8 | Analizaron 8,719 codas | ✅ | Sharma et al. | "In a dataset of 8719 codas from the sperm whales of the Eastern Caribbean clan" | 2024 |
| 9 | Cachalotes grabados en Dominica, en el Caribe | ✅ | Sharma et al. | "along the entire western coast of the Island of Dominica"; "Eastern Caribbean 1 (EC-1) clan" | 2024 |
| 10 | Pantalla: "grabadas entre 2005 y 2018" | ✅ | Sharma et al. | "data recorded from various platforms and various recording systems between 2005 and 2018" | 2024 |
| 11 | Cuatro piezas: ritmo, tempo y dos nuevas, rubato y ornamento | ✅ | Sharma et al. | "previously undescribed features of codas … We call these rubato and ornamentation"; "combine with two context-independent features we call rhythm and tempo". (Los 18 tipos de ritmo vienen de un trabajo previo: "our analysis uses the 18 rhythm clusters proposed by ref. 35"; el guion ya dice que solo dos son nuevas.) | 2024 |
| 12 | "Nombres de música" (rubato, ornamento) | ✅ | Sharma et al. | "By analogy to the corresponding musical phenomenon, we call this behaviour rubato." Ornamento es término musical. | 2024 |
| 13 | Rubato: alargan o acortan la coda poco a poco y la que contesta lo imita | ✅ | Sharma et al. | "coda duration varies smoothly over the course of an exchange; variation in the duration of a whale's codas is systematically imitated by interlocutors" | 2024 |
| 14 | Ornamento: un clic extra al final | ✅ | Sharma et al. | "We define an ornament as the final click in a coda containing one more click than the nearest preceding or following coda" | 2024 |
| 15 | Pantalla: "≈ 4 % de las codas" | ⚠️ (imprecisa, menor) | Sharma et al. | "'extra clicks' of this kind occur in (4%) of the codas in the exchanges of Eastern Caribbean whales" — es el 4 % de las codas **en intercambios** (Dataset 2), no de todas. | 2024 |
| 16 | Las piezas se combinan libremente | ✅ | Sharma et al. | "Rhythm, tempo, rubato and ornamentation can be freely combined" | 2024 |
| 17 | En vez de 21 tipos, al menos 143 combinaciones frecuentes ("143+") | ✅ | Sharma et al. | "at least 143 combinations frequently realised" | 2024 |
| 18 | Chip "como un alfabeto fonético" | ✅ | Sharma et al. | "Like the International Phonetic Alphabet for human languages, this 'Sperm Whale Phonetic Alphabet'…" | 2024 |
| 19 | Aún no se sabe qué significa la mayoría; no es traducir, es encontrar estructura | ✅ | Sharma et al.; Beguš et al. | "Our study investigates the basic structural elements, and not the semantics"; "the communicative function of many codas remains an open question" (2024). "No referential meaning relationship has yet been established for sperm whale codas" (2025). | 2024 / 2025 |
| 20 | 2025, Berkeley: patrones parecidos a vocales, llamados "a" e "i" | ✅ | Beguš et al., *Open Mind* | "We identify two recurrent and discrete coda-level spectral patterns … the a- and i-coda vowels." Autor principal: Dept. of Linguistics, UC Berkeley. Publicado nov 2025. | 2025 |
| 21 | Pantalla: una banda ("a") o dos bandas ("i") en el espectro | ✅ | Beguš et al. | "a-coda vowels have a single formant and i-coda vowels have two" | 2025 |
| 22 | Pantalla: `TarjetaEstudio` "2025 · UC Berkeley · Beguš et al. · *Open Mind*" | ✅ | Beguš et al. | Beguš, Sprouse, Leban, Silva, Gero (2025). *Open Mind* 9, 1849–1874. | 2025 |
| 23 | Escena 3 (pantalla): "por dentro de la máquina", un algoritmo dibujado como **red neuronal/robotito** separa la coda en 4 fichas | ⚠️ (engañosa para la serie IA) | Sharma et al. vs. comunicado MIT | El artículo **no** usa redes neuronales ni dice "machine learning": usa agrupamiento por duraciones ("Coda durations are distributed around a finite set of modes"), 18 grupos de ritmo de un trabajo previo, gráficas de intercambio ("Exchange plots: visualizing multi-whale calls") y pruebas de permutación. Solo el comunicado del MIT dice "Using machine learning". Dibujar una red/robot que "descubre" las piezas da a entender que una IA lo hizo sola. | 2024 |
| 24 | Título "(y la IA no lo tradujo)" + `MitoTachado` "La IA tradujo a las ballenas" ✗ | ⚠️ (encuadre) | Sharma et al.; MIT | Que no tradujo es cierto ✅. Pero el título deja suponer que en este estudio hubo "una IA"; lo que hubo fue análisis por computadora (agrupamiento + estadística). Aceptable si en algún lugar se dice qué hizo la computadora en realidad. | 2024 |

**Conteo:** 21 ✅ · 3 ⚠️ · 0 ❌

## Correcciones necesarias

1. **#23 Escena 3 (lo que se ve) — la "IA" que descubre.** Quitar la red neuronal/robotito y el letrero "por dentro de la máquina".
   Propuesta: fondo oscuro con una **gráfica de intercambio** (puntos azules y naranjas en el tiempo, como la fig. 1) y un
   histograma de duraciones que se agrupa en montoncitos; las 4 fichas salen de ahí. Chip chico: "computadora: agrupar + estadística".
   La voz ("Hallaron cuatro piezas…") puede quedarse igual.
2. **#24 Encuadre IA.** Para que la serie IA sea justa, decir una vez qué hizo la computadora. Propuesta para el chip del gancho o de
   la escena 2: "análisis por computadora, no una IA que traduce". Título sugerido (opcional):
   *Los cachalotes tienen un "alfabeto" de clics (y ninguna IA lo tradujo)*. Si se quiere mantener la palabra IA, aclarar en
   `publicacion.md`: "El MIT lo llamó aprendizaje automático; en el artículo son algoritmos de agrupamiento y estadística".
3. **#15 Letrero "≈ 4 % de las codas".** Cambiar a **"≈ 4 % de las codas en intercambios"** (o quitar el letrero).
4. (Nota, no obligatoria) **#2 "no es Morse".** El propio artículo compara el sistema con el Morse como mecanismo parecido. Es
   literalmente cierto que no es Morse, pero para no contradecir a la fuente el cierre podría decir: "Así que no es Morse: se parece
   más a un alfabeto de piezas que apenas empezamos a descifrar."
