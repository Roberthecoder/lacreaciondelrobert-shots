# Shot IA #39 · El mismo currículum, otro nombre: la IA no los trató igual

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #39 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo para verificación independiente (sin animación todavía).
- **Formato:** N2 "El número" (85 de cada 100 pruebas → 27 de 27) con mito tachado y consejo final.
- **Gancho (de los 7):** #2 "Tú contra el de al lado": tu currículum contra el del de al lado, idénticos salvo el nombre.
- **Duración:** voz 955 caracteres / ~174 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** estimados en la base.
- **Postura de la serie:** crítica con datos y una lección útil. El estudio es de **2024** (réplica de raza en **2026**) y se dice.
  Ojo: los resultados de **género** del artículo original tenían un error de código (corrección de los autores, 29 ago 2026);
  por eso este shot **no usa ninguna cifra de género**.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tú y el de al lado mandan el mismo currículum; solo cambia el nombre. En una prueba, la IA no los trató igual. | Fondo amarillo; desde el cuadro 0 dos hojas de CV idénticas lado a lado ("TÚ" y "EL DE AL LADO"); el renglón del nombre parpadea y cambia; un robotito-escáner pasa sobre ambas y una se ilumina en verde y la otra se apaga. |
| 1 | Mito | ¿No que una máquina solo lee tu experiencia? | `MitoTachado`: "La IA solo lee tu experiencia" se tacha. |
| 2 | Estudio | En la Universidad de Washington usaron quinientos cincuenta y cuatro currículums reales y les pusieron nombres típicos de personas blancas o negras. | `TarjetaEstudio` "2024 · Universidad de Washington · Wilson y Caliskan · AIES"; pila "554 currículums"; etiquetas de nombre (ilustrativas) que se pegan en cada hoja. |
| 3 | Nombres | Tres IAs escogieron los más parecidos a más de quinientas ofertas de trabajo: más de tres millones de comparaciones. | Tres robotitos-escáner; a la derecha "571 ofertas"; contador que sube hasta "+3 000 000 comparaciones". |
| 4 | Resultado | En ochenta y cinco de cada cien pruebas ganaron los nombres de personas blancas. | `NumeroGigante` "85 %" + `Cuadricula` de 27 pruebas que se llenan (23 a favor de nombres blancos). |
| 5 | Pregunta | ¿Y un hombre negro contra un hombre blanco? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Golpe | En las veintisiete pruebas ganó el blanco. Ni una vez al revés. | Cuadrícula de 27 casillas que se pintan todas del mismo lado: "27 de 27"; chip "0 al revés". |
| 7 | Porque | Los autores creen que la IA trata ciertos nombres como lo normal. | Fondo de circuito ("por dentro de la máquina"); un nombre entra en la casilla "normal", otro rebota a "excepción". Chip "hipótesis de los autores". |
| 8 | Replica | Salió en 2024, y en 2026 un equipo de Salzburgo lo repitió: lo de raza le salió igual. | Mapa/pin "Salzburgo, Austria · 2026"; sello "replicado ✔". |
| 9 | Leccion | Y quitar el nombre no basta: la escuela o el lugar también dan pistas. Por eso piden revisar estas IAs antes de dejarlas filtrar. | El CV con el nombre tachado; se resaltan "escuela" y "dirección" como pistas; luego una lupa/auditoría sobre el robotito. |
| 10 | Cierre | Porque tú y el de al lado merecen que lean su currículum, no su nombre. | **Regreso a la imagen del inicio**: las dos hojas otra vez; ahora el escáner ilumina las dos por igual. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; las hojas caen con un "fsh" de papel, el escáner zumba, el contador tictaquea, cada casilla de la cuadrícula suena como una tecla, golpe seco en "27 de 27", sello en "replicado", acorde que se abre en el cierre.

## Fuentes (abiertas el 29 oct 2026)

1. Wilson, K. y Caliskan, A. "Gender, Race, and Intersectional Bias in Resume Screening via Language Model Retrieval". *Proceedings of the AAAI/ACM Conference on AI, Ethics, and Society* (AIES 2024). Universidad de Washington, Information School. arXiv:2407.20371 (v3, 30 ago 2026, con corrección). https://arxiv.org/abs/2407.20371
   > (Abstract) "We simulate this for nine occupations, using a collection of over 500 publicly available resumes and 500 job descriptions. We find that the MTEs are biased, significantly favoring White-associated names in 85.1% of cases"
   > "the dataset contained 554 resumes and 571 job descriptions across nine occupations"
   > "we augment resumes with 120 frequency-controlled names that are associated with White, Black, male, and female identities."
   > "Resume screening is analyzed within three different Massive Text Embedding (MTE) models, a special class of LLMs"
   > "Using more than three million comparisons between resumes and job descriptions"
   > "selecting the top 10% of most similar resumes for every job description … a total of 27 bias tests were conducted for both gender and race."
   > "In 85.1% of 27 tests for racial bias in resume screening, White names were preferred, and only in 8.6% of tests were Black names preferred"
   > "comparisons of resumes with Black male names to those with White male names reveal the largest biases … White male names are significantly preferred in all 27 tests (p<0.05)."
   > Figura 9: "Resumes with White male names are preferred in 100% of tests; those with Black male names are preferred in 0%."
   > "masculine and White concepts seem to be treated as the "default" value by models with other identities diverging from this"
   > "one naive approach to mitigation might be removing names from resumes altogether. However, resumes from real-world job seekers differ on many additional dimensions which can signal social group membership, including educational institutions, locations, and even lexical content choices."
   > "policy and mechanisms to comprehensively audit resume screening systems, whether proprietary or open source, are essential"
   > Nota de corrección (29 ago 2026): "Frank Pallas … and Martin Wiesinger … (Salzburg University) informed us that our published results are inaccurate due to a bug in our code. Specifically, the results of gender-only comparisons should be inverted … The results for race-only and intersectional comparisons are unaffected by this error and were replicated by the Salzburg University team."
2. UW News, "AI tools show biases in ranking job applicants' names according to perceived race and gender" (31 oct 2024). https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/
   > "The researchers varied names associated with white and Black men and women across over 550 real-world resumes"
   > "They then used three state-of-the-art LLMs from three different companies"
   > "This amounted to more than three million comparisons between resumes and job descriptions."
   > "The team presented its research Oct. 22 at the AAAI/ACM Conference on Artificial Intelligence, Ethics, and Society"
   (Ojo: la nota de UW da cifras de género —"female-associated names only 11%"— que la corrección de 2026 invirtió; no se usan.)

## Notas
- "Ochenta y cinco de cada cien pruebas" = 85.1 % de 27 pruebas de raza (9 ocupaciones × 3 modelos), donde "ganar" = estar
  significativamente sobrerrepresentado entre el 10 % de currículums más parecidos a cada oferta. No es "85 % de los currículums".
- "Las veintisiete pruebas" = comparación hombre blanco vs. hombre negro: 27 de 27 a favor del blanco, 0 al revés.
- "Más de quinientas ofertas" = 571; "tres IAs" = tres modelos de *embeddings* de texto (E5-mistral-7b-instruct, GritLM-7B,
  SFR-Embedding-Mistral). Es una simulación de filtro, no un sistema de una empresa real.
- "Nombres típicos de personas blancas o negras" = nombres asociados a esas identidades en Estados Unidos (120 nombres).
- "Creen que…" = interpretación de los autores ("seem to be treated as the default"), dicha como hipótesis.
- Matiz del artículo: con nombres igualados por frecuencia en el corpus el patrón de raza se invertía (sensibilidad a detalles
  de bajo nivel); el resultado principal es con nombres de frecuencia proporcional a la población. No se menciona en la voz.
- Amazon/Reuters 2018 no se usa: no se pudo abrir la nota original.
- Los nombres que se vean en pantalla son ilustrativos. El dibujo es esquemático.
