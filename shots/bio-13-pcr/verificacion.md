# Verificación de hechos · bio-13-pcr

- **Verificación independiente:** 29 de octubre de 2026, por un verificador que no escribió el guion y que abrió cada fuente.
- Resultado inicial: 19 ✅, 2 ⚠️, 0 ❌. Las dos ⚠️ (#3 y #20) se corrigieron con el texto que propuso y verificó el verificador; la descripción de publicación dice "la prueba PCR de COVID".

Todas las páginas se abrieron (curl con User-Agent de navegador; Lorenz 2012 a través de Europe PMC porque PMC pide captcha; CDC/FDA en PDF).

| # | Afirmación (voz / pantalla) | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | "Una sola molécula de ADN se puede volver más de mil millones de copias en unas horas" (línea 0) | ✅ (como máximo teórico; dice "se puede") | NatGeo https://www.nationalgeographic.com/science/article/the-eccentric-scientist-behind-the-gold-standard-covid-19-pcr-test · NHGRI https://www.genome.gov/about-genomics/fact-sheets/Polymerase-Chain-Reaction-Fact-Sheet | "After just 30 cycles, you'll have over a billion copies—all from one molecule of DNA." / "repeated as many as 30 or 40 times, leading to more than one billion exact copies… can be completed in just a few hours" | 2021 / 2020 |
| 2 | Pantalla: contador 1 → 1,073,741,824 con chip "en teoría" | ✅ | Aritmética: 2³⁰ = 1,073,741,824 | — | — |
| 3 | **Corregido:** "Eso hace la prueba PCR de COVID: convierte un pedacito del virus en ADN y lo copia hasta que brilla" (antes: "Eso hizo tu prueba de COVID… copiarlo hasta que brillara", ⚠️) | ✅ | CDC RT-PCR Panel (FDA) https://www.fda.gov/media/134922/download | "RNA isolated and purified … is reverse transcribed to cDNA and subsequently amplified"; "With each cycle … increasing the fluorescence intensity" | 2023 |
| 4 | "Capítulo uno: calientas a 95 grados y la doble hélice se abre en dos" | ✅ | Lorenz, JoVE https://pmc.ncbi.nlm.nih.gov/articles/PMC4846334/ | "an initial denaturation step at 94 °C to 98 °C"; "the denaturation temperature was 95 °C" | 2012 |
| 5 | "Capítulo dos: bajas a unos 55 y dos pedacitos guía se pegan a los extremos" | ✅ (típico) | Lorenz 2012; Nobel press release https://www.nobelprize.org/prizes/chemistry/1993/press-release/ | "about 5 °C below the apparent Tm of the primers (ideally between 52 °C to 58 °C)"; "Two short oligonucleotides are synthesized so that they are bound correctly to opposite strands of the DNA segment" | 2012 / 1993 |
| 6 | "Capítulo tres: subes a 72 y una enzima copia cada hebra, letra por letra" | ✅ | Lorenz 2012 | "Taq DNA polymerase has an optimal elongation temperature of 70 °C to 80 °C"; "the extension was carried out for 1 minute at 72 °C for 30 cycles" | 2012 |
| 7 | "Cada ciclo duplica… Treinta ciclos, más de mil millones, en teoría" | ✅ | Nobel press release; NatGeo | "doubling at each step the number of copies of the desired DNA segment"; "After just 30 cycles, you'll have over a billion copies" | 1993 / 2021 |
| 8 | "¿Pero qué enzima aguanta 95 grados una y otra vez?" / pantalla: enzima común se "derrite" | ✅ (pregunta; esquema) | NatGeo | "the heat necessary to perform a cycle was degrading that all-important DNA polymerase" | 2021 |
| 9 | "Al principio, el calor de cada ciclo la iba destruyendo" | ✅ | NatGeo | "the heat necessary to perform a cycle was degrading that all-important DNA polymerase, the piece required to construct each DNA copy" | 2021 (hecho de 1983–85) |
| 10 | "En 1969, Thomas Brock y Hudson Freeze describieron una bacteria…" | ✅ | Brock & Freeze, J. Bacteriol. https://pmc.ncbi.nlm.nih.gov/articles/PMC249935/ · USGS | "Thermus aquaticus gen. n. and sp. n., a nonsporulating extreme thermophile" (1969); "They published their findings in the Journal of Bacteriology in 1969" | 1969 / 2026 |
| 11 | "…de las aguas termales de Yellowstone" | ✅ | Brock & Freeze 1969 | "Strains of T. aquaticus have been isolated from a variety of thermal springs in Yellowstone National Park and from a thermal spring in California." | 1969 |
| 12 | "…que crece mejor a 70 grados" / pantalla termómetro 70 °C | ✅ | Brock & Freeze 1969 | "The optimum temperature for growth is 70 C, the maximum 79 C, and the minimum about 40 C." | 1969 |
| 13 | Pantalla: bastoncitos sin esporas, algunos en filamentos largos, sin flagelos | ✅ | Brock & Freeze 1969 | "gram-negative nonsporulating nonmotile rods which frequently form long filaments at supraoptimal temperatures or in the stationary phase" | 1969 |
| 14 | Pantalla: TarjetaEstudio "1969 · Brock y Freeze · J. Bacteriol." | ✅ | Brock & Freeze 1969 | J. Bacteriol. 98(1):289–297 | 1969 |
| 15 | "De ella sale la Taq, la enzima que sí aguanta el calor" | ✅ | Saiki et al., Science https://pubmed.ncbi.nlm.nih.gov/2448875/ | "A thermostable DNA polymerase was used … The enzyme, isolated from Thermus aquaticus, greatly simplifies the procedure" | 1988 |
| 16 | Pantalla: chip "desde 1988 en la PCR" | ✅ | Saiki 1988 | Science 1988 Jan 29;239(4839):487-91 | 1988 |
| 17 | "A Kary Mullis se le ocurrió la PCR manejando de noche…" / pantalla carretera nocturna en montañas de California | ✅ | Nobel press release; conferencia Nobel de Mullis https://www.nobelprize.org/prizes/chemistry/1993/mullis/lecture/ | "Mullis has described how he got the idea for the PCR during a night drive in the Californian mountains."; "One Friday night I was driving … from Berkeley up to Mendocino… As I drove through the mountains that night" | 1993 |
| 18 | "…en 1983" | ✅ | NatGeo; USGS | "he was driving from the Bay Area to his cabin in Mendocino in 1983"; "In 1983, Kary Mullis, a biochemist…" | 2021 / 2026 |
| 19 | "…y le dio el Nobel" / pantalla medalla "Nobel de Química 1993" | ✅ (compartido: medio premio, con Michael Smith) | Nobel press release; NHGRI | Medio premio a Mullis "for his invention of the polymerase chain reaction (PCR) method"; "Kary B. Mullis, was awarded the Nobel Prize for Chemistry in 1993" | 1993 |
| 20 | **Corregido:** "Por eso, en un tubito, una sola molécula se puede volver más de mil millones" (antes: "se vuelve", ⚠️ categórico) | ✅ (máximo teórico, dicho como posibilidad) | NatGeo; NHGRI | "After just 30 cycles, you'll have over a billion copies"; "leading to more than one billion exact copies of the original DNA segment" | 2021 / 2020 |
| 21 | Notas: la prueba CDC alterna 95 y 55 °C, 45 repeticiones; brillo = fluorescencia por ciclo | ✅ | CDC/FDA PDF | "Step 1 set to 3 sec at 95°C"; "Reps should be set to 45"; "increasing the fluorescence intensity" | 2023 |

Sin ❌ ni ⚠️ pendientes.

VEREDICTO: APROBADO
