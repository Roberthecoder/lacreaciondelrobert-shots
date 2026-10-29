# Verificación de hechos · Shot Festivo #15 · Mujer y Niña en la Ciencia · IA (Karen Spärck Jones e IDF)

Verificador independiente (subagente que no escribió el guion), 29 oct 2026. Se abrieron los originales: artículo de 1972 (reimpresión fiel, staff.city.ac.uk/~sb317/idfpapers/ksj_orig.pdf), Robertson 2004 (PDF), obituario de Tait 2007 (PDF), BCS, IEEE Spectrum, CV de Cambridge, CERN, Anthropic 2024, Ram et al. 2023 (TACL, PDF) y ONU.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Gancho: "**Cada vez** que buscas algo en internet, usas una idea de esta mujer" | ⚠️ generalización absoluta; las fuentes que lo sostienen son de 2004–2007 y hoy no se puede comprobar para *todo* buscador (los de hoy no publican su fórmula; Robertson dice que en modelos nuevos IDF ya no es explícito) | aclanthology.org/J07-3001.pdf · spectrum.ieee.org/computer-science-a-womans-work · Robertson 2004 | "This is the partial basis of all weighting schemes adopted by widely used Internet search engines" / "Search engines use inverse document frequency, as it is known, to help score and rank a document's importance" / "It remains at the core of many, if not most, ranking methods used in search engines" | 2007 / 2007 / 2004 |
| Chip «Día de la Mujer y la Niña en la Ciencia» (sale el 11 feb) | ✅ | un.org/en/observances/women-and-girls-in-science-day | "International Day of Women and Girls in Science" · "11 February" | 2026 (consulta) |
| «de» sale en muchísimas páginas y casi no dice nada; «rajas» en muchas menos y sí acerca (ejemplo ilustrativo) | ✅ (como ejemplo; no hay conteo real, el guion lo aclara) | Robertson 2004, J. Doc. 60(5) | "a query term which occurs in many documents is not a good discriminator, and should be given less weight than one which occurs in few documents" | 2004 |
| Chip «sale en todas = pesa poco» | ✅ (si sale en todas, su IDF ≈ 0) | Tait 2007 | "terms which occur in many documents are poor index terms" | 2007 |
| "Entre menos documentos tengan una palabra, más vale cuando aparece" | ✅ | Spärck Jones 1972, resumen | "matches on less frequent, more specific, terms are of greater value than matches on frequent terms" | 1972 |
| Si una página repite «tamales» muchas veces, sube más en la lista (TF) · etiquetas «TF: cuántas veces en la página» × «IDF: qué tan rara» | ✅ (la voz no le atribuye TF a ella) | Robertson 2004 | "Coupled with TF (the frequency of the term in the document itself, in this case, the more the better)" / "involve multiplying the IDF measure … by a TF measure" | 2004 |
| "¿Quién pensó en esto antes de que existiera la web?" (la web es de 1989, posterior a 1972) | ✅ | home.cern/science/computing/the-birth-of-the-web/ | "The World Wide Web was invented by British scientist Tim Berners-Lee in 1989 while working at CERN." | 1989 |
| Escena 6: computadora vieja con cinta y tarjetas perforadas | ✅ como ilustración de época (esquemático) | Tait 2007 | "Roget's Thesaurus—punched onto cards!" (su tesis, 1964) | 2007 |
| En 1972 … Karen Spärck Jones | ✅ | Spärck Jones 1972 (J. Doc. 28(1):11–21) · Robertson 2004 | "In 1972, Karen Spärck Jones published in the Journal of Documentation a paper called 'A statistical interpretation of term specificity and its application in retrieval'" | 1972 |
| …en Cambridge, Inglaterra | ✅ | ksj_orig.pdf (afiliación del artículo) · cl.cam.ac.uk CV | "Computer Laboratory, University of Cambridge, Cambridge, UK" / "1968 – 1988 Research positions, Computer Laboratory, University of Cambridge" | 1972 / s/f |
| …propuso pesar cada palabra según qué tan rara es | ✅ | Spärck Jones 1972, resumen | "It is argued that terms should be weighted according to collection frequency" / "specificity should be interpreted statistically, as a function of term use rather than of term meaning" | 1972 |
| `TarjetaEstudio` «1972 · Karen Spärck Jones · Cambridge, Inglaterra · *Journal of Documentation*» | ✅ | ídem | ídem | 1972 |
| La probó con tres colecciones de documentos · chip «3 colecciones de prueba» | ✅ (Cranfield, INSPEC y Keen) | Spärck Jones 1972 | "experiments with three test collections" / "obtained from the Aslib Cranfield, INSPEC, and College of Librarianship Wales" | 1972 |
| …y las búsquedas mejoraron bastante | ✅ "bastante" es fiel a "considerable"/"substantial", sin exagerar | Spärck Jones 1972 | "Results for the test collections show that considerable improvements in performance are obtained with this very simple procedure." / "In all cases, however, matching with term weighting led to a substantial improvement in performance over simple term matching." | 1972 |
| Barrita de «búsquedas acertadas» que sube en cada una de las tres cajas | ✅ (mejoró en las tres) | ídem | "In all cases … a substantial improvement" | 1972 |
| Hoy se llama frecuencia inversa de documento | ✅ | Robertson 2004 | "The measure of term specificity first proposed in that paper later became known as inverse document frequency, or IDF" | 2004 |
| …y entró en casi todas las fórmulas que califican palabras | ✅ fiel: "term weighting scheme" = fórmula para dar peso a las palabras; "entró" en pasado respeta "found its way into" | Robertson 2004 | "it found its way into almost every term weighting scheme." | 2004 |
| Ramitas de IDF a «TF-IDF» y «BM25» | ✅ | Robertson 2004 | "The weighting function known as Okapi BM25 … is probably the best-known and most widely used such extension" (de TF*IDF) | 2004 |
| BM25 es heredera de su idea | ✅ | Anthropic 2024 · Robertson 2004 | "BM25 works by building upon the TF-IDF (Term Frequency-Inverse Document Frequency) concept." | 2024 |
| Hay inteligencias artificiales que, antes de responderte, buscan documentos con BM25 | ✅ con fuente independiente (artículo revisado por pares, AI21 Labs/TACL) además de Anthropic | Ram et al. 2023, "In-Context Retrieval-Augmented Language Models", TACL 11 (aclanthology.org/2023.tacl-1.75.pdf) · anthropic.com/news/contextual-retrieval | "leaving the LM architecture unchanged and prepending grounding documents to the input" / "We used BM25 (Robertson and Zaragoza, 2009) as our sparse model." · Anthropic: "Use BM25 to find top chunks based on exact matches" | 2023 / 2024 |
| Animaba a niñas y jóvenes a dedicarse a la computación | ✅ | Tait 2007 · BCS | "made very active efforts, especially in recent years, to interest young women and girls in careers in computing" / "I think it's very important to get more women into computing." | 2007 |
| Lema: «la computación es demasiado importante para dejársela a los hombres» | ✅ traducción fiel | bcs.org/…/computings-too-important-to-be-left-to-men/ · Tait 2007 | "My slogan is: Computing is too important to be left to men." | 2007 (publicada 2009) |
| Atribución en pantalla «Karen Spärck Jones, entrevista BCS, 2007» | ⚠️ la página no da fecha de la entrevista; solo dice que ganó la Medalla Lovelace 2007 y está publicada el 3 may 2009 | bcs.org (ídem) | "winner of the 2007 BCS Lovelace Medal" · publicada "03 May 2009" | 2009 |
| Cierre: "Así que **cada vez** que buscas algo, Karen te ayuda" | ⚠️ mismo problema que el gancho | Tait 2007 · Robertson 2004 | ver fila del gancho | 2004/2007 |
| Cierre: "ella enseñó a medir qué palabras importan" | ✅ | Tait 2007 | "the importance of terms is weighted according to the proportion of documents in the corpus in which they occur" | 2007 |
| Premios (opcional en pantalla): ACL Lifetime Achievement Award **2004** | ⚠️ el CV dice 2004 pero el obituario de Tait dice 2005 (fuentes chocan) | cl.cam.ac.uk CV · Tait 2007 | "2004 Lifetime Achievement Award, Association for Computational Linguistics" vs "her acceptance speech for the ACL Lifetime Achievement Award in 2005" | s/f / 2007 |
| Premios (opcional): Allen Newell 2006, Lovelace 2007, SIGIR/Salton 1988 | ✅ | cl.cam.ac.uk CV | "2006 ACM – AAAI Allen Newell Award" · "2007 BCS Lovelace Medal" · "1988 Award, for research, ACM SIGIR (now Salton Award)" | s/f |
| Vida: Huddersfield 1935 – 4 abr 2007 (notas, no en voz) | ✅ | Tait 2007 | "born in Huddersfield, Yorkshire, England in 1935" / "died peacefully on 4 April 2007" | 2007 |

Nota aparte (no afecta voz ni pantalla): en `guion.md` › Notas dice que "entró al Computer Laboratory de la Universidad en 1974". El CV de Cambridge dice "1968 – 1988 Research positions, Computer Laboratory" y el artículo de 1972 ya lleva esa afiliación; conviene corregir la nota (la voz "en Cambridge, Inglaterra" sigue siendo correcta).

Estado previo: PENDIENTE (correcciones abajo; ya aplicadas, ver la última sección)

## Correcciones propuestas

1. **Gancho (línea 0):** cambiar "Cada vez que buscas algo en internet, usas una idea de esta mujer." por
   **"Cuando buscas algo en internet, muy probablemente usas una idea de esta mujer."**
   Fuente: Robertson 2004 ("It remains at the core of many, if not most, ranking methods used in search engines"); Tait 2007; IEEE Spectrum 2007.
2. **Cierre (línea 12):** cambiar "Así que cada vez que buscas algo, Karen te ayuda: …" por
   **"Así que cuando buscas algo, muy probablemente Karen te ayuda: ella enseñó a medir qué palabras importan."**
   Misma fuente.
3. **Atribución del lema en pantalla (escena 11):** cambiar «Karen Spärck Jones, entrevista BCS, 2007» por
   **«Karen Spärck Jones · entrevista BCS (publicada en 2009)»** o simplemente **«Karen Spärck Jones · BCS»**.
   Fuente: bcs.org, "03 May 2009".
4. **Premios (si salen en pantalla):** no poner año al premio de la ACL (decir solo «Premio a la trayectoria, ACL») o no mostrarlo; los demás (Allen Newell 2006, Lovelace 2007, SIGIR 1988) sí se pueden usar. Fuente: CV de Cambridge vs Tait 2007.
5. **Fuentes del guion:** agregar Ram et al. 2023 (TACL 11: 1316–1331, https://aclanthology.org/2023.tacl-1.75.pdf) como fuente independiente de "IA que busca con BM25 antes de responder"; y en Fuente 1 la frase textual exacta es "considerable improvements in performance" (no "…in retrieval performance").

## Correcciones aplicadas (texto final)

Revisado por el mismo verificador independiente sobre `guion.md` y `narracion.json` corregidos, 29 oct 2026. Las demás líneas no cambiaron y siguen ✅ (tabla de arriba).

| Afirmación corregida | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Gancho: "Cuando buscas algo en internet, muy probablemente usas una idea de esta mujer." | ✅ | Robertson 2004 · Tait 2007 · IEEE Spectrum 2007 | "It remains at the core of many, if not most, ranking methods used in search engines" / "This is the partial basis of all weighting schemes adopted by widely used Internet search engines" | 2004 / 2007 |
| Línea 4: "Esa es la idea: entre menos documentos tengan una palabra, más vale." | ✅ | Spärck Jones 1972 | "matches on less frequent, more specific, terms are of greater value than matches on frequent terms" | 1972 |
| Cierre: "Así que cuando buscas algo, muy probablemente Karen te ayuda: ella enseñó a medir qué palabras importan." | ✅ | ídem gancho · Tait 2007 | "the importance of terms is weighted according to the proportion of documents in the corpus in which they occur" | 2004 / 2007 |
| Firma en pantalla: «Karen Spärck Jones · entrevista BCS (publicada en 2009)» | ✅ | bcs.org/…/computings-too-important-to-be-left-to-men/ | "My slogan is: Computing is too important to be left to men." · publicada "03 May 2009" | 2009 |
| Premio de la ACL en pantalla sin año («Premio a la trayectoria, ACL») | ✅ | cl.cam.ac.uk CV · Tait 2007 | "Lifetime Achievement Award, Association for Computational Linguistics" / "the ACL Lifetime Achievement Award" | s/f / 2007 |
| IA que busca con BM25 antes de responder: fuente independiente agregada (Ram et al. 2023) | ✅ | aclanthology.org/2023.tacl-1.75.pdf | "prepending grounding documents to the input" / "We used BM25 (Robertson and Zaragoza, 2009) as our sparse model." | 2023 |
| Nota del Computer Laboratory corregida (desde 1968; afiliación del artículo de 1972) | ✅ | cl.cam.ac.uk CV · ksj_orig.pdf | "1968 – 1988 Research positions, Computer Laboratory, University of Cambridge" / "Computer Laboratory, University of Cambridge, Cambridge, UK" | s/f / 1972 |
| Fuente 1: frase textual del resumen | ✅ | Spärck Jones 1972 | "considerable improvements in performance are obtained with this very simple procedure" | 1972 |

VEREDICTO: APROBADO
