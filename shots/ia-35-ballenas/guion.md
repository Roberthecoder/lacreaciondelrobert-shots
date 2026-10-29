# Shot IA #35 · Los cachalotes tienen un "alfabeto" de clics (y ninguna IA lo tradujo)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #35 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (21 ✅, 3 ⚠️ corregidas, ver `verificacion.md`) · animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro" (de la coda que se oye a las piezas que la forman: ritmo, tempo, rubato, ornamento, y luego "vocales" dentro del clic) + N4 "La imagen que se llena" (de 21 casillas a una tabla de 143 combinaciones que se enciende).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: un patrón de puntos y rayas tipo Morse que resulta ser el intercambio de clics de dos cachalotes.
- **Duración:** voz 945 caracteres / ≈ 163 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** en la base.
- **Postura de la serie:** a favor con matiz. El análisis por computadora (agrupar + estadística) encontró estructura; **no** es una IA que traduce. Se dice en voz ("No es una IA que traduce: es análisis por computadora"), en pantalla y en `publicacion.md`.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es código Morse: son dos cachalotes contestándose con clics. Y con algoritmos vieron que se arman como un alfabeto. | Fondo cian; desde el cuadro 0 una cinta de telégrafo con puntos y rayas que corre y el chip "¿código Morse?" (se tacha en el s 2). Suben dos cachalotes (halo azul y naranja, como en la figura 1 del artículo) y la cinta se vuelve clics azules y naranjas. Aparece un "A B C" hecho de puntos y el chip "como un alfabeto". |
| 1 | Codas | Cada serie de clics se llama coda. Antes se agrupaban en veintiún tipos. | Una coda = grupo de 5 puntos con su etiqueta "coda". Cuadrícula de 21 casillas ("21 tipos de coda"). |
| 2 | Estudio | En 2024, el MIT y el Proyecto CETI analizaron ocho mil setecientas diecinueve codas de cachalotes de Dominica, en el Caribe. | `TarjetaEstudio`: "2024 · MIT CSAIL + Proyecto CETI · Sharma et al. · *Nature Communications*". Mapa esquemático de las Antillas Menores con Dominica marcada; "8,719 codas analizadas" (letrero chico: "grabadas de 2005 a 2018"). |
| 3 | Piezas | Hallaron cuatro piezas: ritmo, tempo y dos nuevas: rubato y ornamento. | Fondo oscuro con una **gráfica de intercambio** (carriles azul y naranja, como la figura 1) y un **histograma de duraciones** que se agrupa en montoncitos; chip "computadora: agrupar + estadística". Salen 4 fichas: **ritmo**, **tempo**, **rubato ★**, **ornamento ★** (★ = nuevas). Sin red neuronal ni robot. |
| 4 | Rubato | Rubato: alargan o acortan la coda poco a poco, y la que contesta lo imita. | Codas consecutivas que se estiran poco a poco (acordeón); la ballena naranja copia el estiramiento de la azul. |
| 5 | Ornamento | Ornamento: un clic extra al final, como un adorno. | La misma coda de 5 clics y, de pronto, una de 6: el último clic brilla con un moñito. Letrero chico "≈ 4 % de las codas en intercambios". |
| 6 | Pregunta | ¿Y eso qué cambia? | **Re-gancho.** "?" gigante; Robert grande. |
| 7 | Combina | Las piezas se combinan libremente: en vez de veintiún tipos, salieron al menos ciento cuarenta y tres combinaciones frecuentes. | **N4:** la cuadrícula de 21 crece a una tabla ritmo × tempo × rubato × ornamento; se encienden casillas hasta "143+". Chip "como un alfabeto fonético". |
| 8 | Ojo | Pero ojo: aún no se sabe qué significa la mayoría. No es una IA que traduce: es análisis por computadora. | Celular con "clic · clic · clic · clic" → "Traducción: ???". `MitoTachado`: "Una IA tradujo a las ballenas" ✗; chip "análisis por computadora ✔". |
| 9 | Vocales | Y en 2025, en Berkeley, vieron otra capa: patrones parecidos a vocales, que llamaron a e i. | Zoom a un clic: dentro, su espectro con una banda ("a") o dos bandas ("i"). `TarjetaEstudio` chica: "2025 · UC Berkeley · Beguš et al. · *Open Mind*". |
| 10 | Cierre | Así que no es Morse: se parece más a un alfabeto de piezas que apenas empezamos a descifrar. | **Regreso a la imagen del inicio:** los mismos dos cachalotes y la misma tira, ahora con clics de colores y sus 4 fichas (ritmo, tempo, rubato, ornamento) sobre cada coda. "código Morse" se tacha; chip "un alfabeto de piezas". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música** (`gen-audio.mjs` → `assets/mezcla.wav`): cama grave y marina (agua, retumbo lento). Cada clic en pantalla suena como clic seco (los clics son de verdad el sonido de la coda); el acordeón del rubato estira el ritmo de los clics; el ornamento suena con un clic extra brillante; la tabla se enciende con tecleo suave; el tachado de "tradujo" con un golpe seco.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y eso qué cambia?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.3 | 11_sorprendido | `gancho` | «Esto no es código Morse: son dos cachalotes…» (cuadro 0) |
| 2 | 8.2 | 11.9 | 06_pensativo_menton | `arriba-der` | «Cada serie de clics se llama coda» |
| 3 | 15.6 | 19.3 | 13_senalando_arriba | `arriba-der` | señala «ocho mil setecientas diecinueve codas» y el mapa |
| 4 | 24.2 | 28.2 | 04_bajando_lentes | `arriba-der` | «la que contesta lo imita» (rubato) |
| 5 | 31.55 | 34.1 | 07_pensativo_puno | `grande` | «¿Y eso qué cambia?» |
| 6 | 36.5 | 40.4 | 11_sorprendido | `arriba-der` | «al menos ciento cuarenta y tres combinaciones» |
| 7 | 40.9 | 46.7 | 10_serio_molesto | `izq-alto` | «No es una IA que traduce» |
| 8 | 49.3 | 52.2 | 05_sonriendo_dientes_uniformes | `arriba-der` | «patrones parecidos a vocales, a e i» |
| 9 | 52.7 | 57.8 | 13_senalando_arriba | `gancho` | «se parece más a un alfabeto de piezas» |
| — | 57.9 | 61.4 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 36.0 s (+ cierre 3.5 s) · poses distintas 7 (nunca la misma dos veces seguidas) · total 61.4 s

## Fuentes (abiertas el 29 oct 2026)

1. Sharma, P., Gero, S., Payne, R., Gruber, D. F., Rus, D., Torralba, A. y Andreas, J. "Contextual and combinatorial structure in sperm whale vocalisations". *Nature Communications* 15: 3617 (publicado el 7 de mayo de **2024**). DOI 10.1038/s41467-024-47221-8 · PMC11076547 (texto completo leído con la API de Europe PMC). Afiliaciones: MIT CSAIL, Project CETI, Carleton University, The Dominica Sperm Whale Project.
   > "Sperm whales (Physeter macrocephalus) are highly social mammals that communicate using sequences of clicks called codas."
   > "We call these rubato and ornamentation."
   > "codas form a combinatorial coding system in which rubato and ornamentation combine with two context-independent features we call rhythm and tempo to produce a large inventory of distinguishable codas."
   > "In a dataset of 8719 codas from the sperm whales of the Eastern Caribbean clan, this 'sperm whale phonetic alphabet' makes it possible to systematically explain observed variability in coda structure."
   > "we used the annotated coda dataset from The Dominica Sperm Whale Project (DSWP)… The recordings of the Eastern Caribbean 1 (EC-1) clan were used in the analysis, comprising 8719 codas making up 21 previously defined coda types."
   > "data recorded from various platforms and various recording systems between 2005 and 2018"
   > "By analogy to the corresponding musical phenomenon, we call this behaviour rubato." · "individual whales modulate coda durations smoothly over the course of multi-coda exchanges" · "rubato… is temporally correlated and imitated across whales"
   > "We define an ornament as the final click in a coda containing one more click than the nearest preceding or following coda" · "'extra clicks' of this kind occur in (4%) of the codas"
   > "Rhythm, tempo, rubato and ornamentation can be freely combined" · "at least 143 combinations frequently realised"
   > "built from a repertoire comprising nearly an order of magnitude more distinguishable codas."
   > "Our study investigates the basic structural elements, and not the semantics, of the sperm whale communication system." · "While the communicative function of many codas remains an open question…"
   > Figura 1: "a two-minute exchange between two whales (with clicks visualized in blue and orange respectively)".
2. MIT CSAIL / MIT Schwarzman College of Computing, "Exploring the mysterious alphabet of sperm whales" (mayo de **2024**), https://computing.mit.edu/news/exploring-the-mysterious-alphabet-of-sperm-whales
   > "recently used algorithms to decode the 'sperm whale phonetic alphabet,'"
   > "the team used a mix of algorithms for pattern recognition and classification"
   > "without any pre-existing ground truth data" · "Our next steps aim to decipher the meaning behind these communications"
3. Beguš, G., Sprouse, R. L., Leban, A., Silva, M. y Gero, S. "Vowel- and Diphthong-Like Spectral Patterns in Sperm Whale Codas". *Open Mind* 9: 1849–1874 (noviembre de **2025**). DOI 10.1162/OPMI.a.252 · PMC12594577 (texto completo leído con la API de Europe PMC). Autor principal: Departamento de Lingüística, UC Berkeley.
   > "We identify two recurrent and discrete coda-level spectral patterns that appear across individual sperm whales and across traditional coda types: the a- and i-coda vowels."
   > "Codas are on many levels analogous to human vowels and diphthongs"
   > "No referential meaning relationship has yet been established for sperm whale codas."

## Notas
- "Con algoritmos" / "análisis por computadora": el artículo es un análisis computacional de MIT CSAIL (agrupamiento, visualizaciones nuevas, pruebas estadísticas); el comunicado del MIT dice "a mix of algorithms for pattern recognition and classification". No se dice "una IA tradujo" en ningún lado; la voz dice "No es una IA que traduce: es análisis por computadora" y en pantalla se tacha.
- "Veintiún tipos" = los 21 tipos de coda definidos antes en ese conjunto de datos (clan EC-1). "Al menos ciento cuarenta y tres combinaciones frecuentes" = "at least 143 combinations frequently realised".
- "Cachalotes de Dominica" = datos del Dominica Sperm Whale Project, clan del Caribe oriental. Las grabaciones son de 2005 a 2018 (se pone en pantalla); el análisis es de 2024.
- No se usa "al menos 60 ballenas": el artículo lo dice del conjunto completo del DSWP, no claramente del subconjunto EC-1.
- "Aún no se sabe qué significa la mayoría": artículo 2024 ("communicative function of many codas remains an open question"; "not the semantics") y Open Mind 2025 ("No referential meaning relationship has yet been established").
- "Parecidos a vocales, que llamaron a e i": analogía de los autores; son patrones del espectro de los clics, no vocales humanas.
- El dibujo es esquemático; los colores azul/naranja siguen la figura 1 del artículo.
- Cierre: el artículo compara el mecanismo con el habla, el texto, el Morse y la notación musical; por eso el cierre dice "se parece más a un alfabeto de piezas" en lugar de contradecirlo.
