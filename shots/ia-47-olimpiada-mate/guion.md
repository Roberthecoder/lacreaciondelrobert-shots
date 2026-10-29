# Shot IA #47 · La IA que sacó oro en la Olimpiada de Matemáticas (y el problema que no pudo)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #47 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** FASE A · guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N2 "El número" (558 de 630, 35 de 42, 72 oros, 26 por encima) + N5 "El experimento" (el examen de la olimpiada recreado: dos sesiones, seis problemas, quién resuelve cuál).
- **Gancho (de los 7):** #2 "Tú contra el de al lado" → tú contra la IA en la olimpiada, con el número que lo respalda (#4).
- **Duración:** voz 958 caracteres / 158 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** estimado (`estimar-escenas`).
- **Postura de la serie:** la defendemos (nivel de oro real, certificado) y la criticamos con datos (empató con el corte más bajo de oro, 26 jóvenes la superaron, falló el problema más difícil, y olimpiada ≠ investigación). Se distingue con precisión el resultado **certificado por la IMO** (Google) del **no oficial** (OpenAI, calificado por exmedallistas).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Si compitieras contra esta IA en la Olimpiada Internacional de Matemáticas, casi seguro te gana: superó a quinientos cincuenta y ocho de seiscientos treinta concursantes. | Fondo amarillo; desde el cuadro 0 dos pupitres frente a frente: "TÚ" (lápiz que se mueve) contra el Robotito con medalla. Luego una cuadrícula de 630 puntitos (concursantes) donde 558 se apagan en gris y queda el número gigante "558 / 630". |
| 1 | Examen | Fue en julio de 2025, en Australia: seis problemas, dos exámenes de cuatro horas y media. | Mapa de Australia con pin "Sunshine Coast · jul 2025"; seis hojas numeradas P1–P6 y dos relojes "4 h 30 min" × 2. |
| 2 | Gemini | Gemini Deep Think, de Google, resolvió cinco: treinta y cinco de cuarenta y dos, el mínimo para oro. | Las hojas P1–P5 reciben palomita "7/7", P6 queda en blanco; marcador sube a "35 / 42"; línea dorada "corte de oro: 35". |
| 3 | Gemini | Y la calificó la propia olimpiada. | Sello "Calificado por coordinadores de la IMO ✔". |
| 4 | OpenAI | Una IA de OpenAI sacó igual, pero la calificaron tres exmedallistas, no la olimpiada. | Segundo robotito con "35 / 42"; tres jueces (exmedallistas) y una etiqueta "no oficial" (gris), junto al sello oficial del de Google. |
| 5 | Pregunta | ¿Y los humanos? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Humanos | Setenta y dos ganaron oro; veintiséis superaron a las máquinas. | La cuadrícula de 630 vuelve: 72 puntos dorados; 26 de ellos suben por encima de la línea "35". |
| 7 | Antes | Un año antes, otra IA de Google quedó en plata: tardó hasta tres días, con los problemas traducidos. | Tarjeta "2024 · AlphaProof + AlphaGeometry 2 · 28 / 42 · plata"; reloj que da vueltas "hasta 3 días"; hoja que se convierte en código "Lean" (traducción manual a lenguaje formal). |
| 8 | Mexico | México llevó seis: dos platas y cuatro bronces. | Bandera de México con 6 estudiantes: 2 medallas de plata y 4 de bronce. |
| 9 | Seis | El problema seis no lo resolvió ninguna de las dos. De seiscientos treinta jóvenes, solo seis. | La hoja P6 crece (cuadrícula con mosaicos); las dos IA con "0"; contador "6 de 630 con 7/7". |
| 10 | Matiz | Ojo: estos problemas ya tienen solución; en investigación, nadie la sabe. | Dos puertas: "Olimpiada: la solución ya existe" vs "Investigación: ¿?"; Robert pensativo. |
| 11 | Cierre | Para ganarle, tendrías que ser de los veintiséis mejores… o resolver el seis. | **Regreso a la imagen del inicio**: los mismos dos pupitres, ahora el lápiz de "TÚ" está sobre la hoja P6 y brilla. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, tensa como de examen (tic-tac suave en la escena 1); un "ding" por cada palomita de P1–P5, un golpe sordo cuando P6 queda en blanco; sello oficial con golpe seco; 558 puntos apagándose como lluvia fina; 72 campanitas doradas; el reloj de 3 días acelerado; final que se abre (libre) cuando "TÚ" toma el problema seis.

## Fuentes (cifras abiertas en la fuente original el 29 oct 2026)

1. **Google DeepMind (21 jul 2025).** "Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad". https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/
   > "solved five out of the six IMO problems perfectly, earning 35 total points"
   > "officially graded and certified by IMO coordinators using the same criteria as for student solutions"
   > "all within the 4.5-hour competition time limit" · "operated end-to-end in natural language"
   > Gregor Dolinar (presidente de la IMO): "We can confirm that Google DeepMind has reached the much-desired milestone"
   > Salvedad: la revisión de la IMO "does not extend to validating our system, processes, or underlying model."
   > "Medals are awarded to the top half of contestants, with approximately 8% receiving a prestigious gold medal."
   - Soluciones publicadas (PDF): https://storage.googleapis.com/deepmind-media/gemini/IMO_2025.pdf — contiene solo los problemas 1 a 5.
2. **Alexander Wei, OpenAI (hilo en X, 19 jul 2025).** https://x.com/alexwei_/status/1946477742855532918
   > 2/N: "two 4.5 hour exam sessions, no tools or internet, reading the official problem statements, and writing natural language proofs."
   > 6/N: "the model solved 5 of the 6 problems on the 2025 IMO. For each problem, three former IMO medalists independently graded the model's submitted proof, with scores finalized after unanimous consensus. The model earned 35/42 points in total, enough for gold!"
   > 10/N: "The model solved P1 through P5; it did not produce a solution for P6."
   > 8/N: "the IMO gold LLM is an experimental research model."
3. **IMO oficial, edición 2025.** https://www.imo-official.org/editions/2025/
   > "66th IMO 2025 · Sunshine Coast, Australia · July 10 - 20 · 110 Countries · 630 Contestants · 72 Gold ≥35 pts · 104 Silver ≥28 pts · 145 Bronze ≥19 pts · 132 Hon. Mentions · 5 Perfect Scores"
4. **IMO oficial, resultados individuales 2025** (tabla completa de 630 concursantes, contada el 29 oct 2026). https://www.imo-official.org/results/individual/year/2025/
   - Puntaje ≥ 35: 72 (todos los oros). Puntaje > 35: **26**. Puntaje < 35: **558** (= 630 − 72). Con 35 exactos: 46.
   - Problema 6, distribución de puntos: 0 → 569; 1 → 45; 2 → 6; 3 → 1; 4 → 1; 5 → 2; **7 → 6**. Solo 6 de 630 lo resolvieron completo.
5. **IMO oficial, México 2025.** https://www.imo-official.org/results/team/year/2025/country/MEX/
   > Emmanuel Buenrostro Briseño S 28 · Takumi Higashida Martínez S 28 · Héctor Juan Villarreal Corona B 27 · Mateo Iván Latapi Acosta B 24 · Iker Torres Terrazas B 24 · Javier Caram Quirós B 22 · "Team Results 31 … 153"
   - 6 concursantes: 2 platas y 4 bronces; lugar 31 de 110 equipos, 153 puntos.
6. **Google DeepMind (25 jul 2024).** "AI achieves silver-medal standard solving International Mathematical Olympiad problems". https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/
   > "Our system achieved a final score of 28 points." (corte de oro en 2024: 29)
   > "Our systems solved one problem within minutes and took up to three days to solve the others."
   > "the problems were manually translated into formal mathematical language for our systems to understand." (Lean)
   > "In the official competition, students submit answers in two sessions of 4.5 hours each."

## Notas
- "Esta IA" = Gemini Deep Think (Google DeepMind). "Superó a 558 de 630": 558 concursantes sacaron menos de 35 puntos (dato propio contado de la tabla oficial). "Casi seguro te gana": 558/630 = 88.6 % de los concursantes quedaron por debajo (si el verificador lo ve exagerado, cambiar a "lo más probable es que te gane").
- "El mínimo para oro": el corte de oro de 2025 fue ≥ 35 (imo-official.org). Ambas IA quedaron justo en el corte, empatadas con 46 humanos.
- OpenAI: resultado **no oficial**; lo calificaron tres exmedallistas de la IMO, no la IMO. Se dice así.
- "Veintiséis superaron a las máquinas" = 26 humanos con más de 35 puntos (5 de ellos con 42 perfectos).
- "Otra IA de Google" en 2024 = AlphaProof + AlphaGeometry 2 (dos sistemas combinados), 28 puntos, plata, un punto debajo del oro (29). "Con los problemas traducidos" = traducidos a mano al lenguaje formal Lean.
- "Ninguna de las dos": OpenAI dice que no produjo solución para P6; el PDF de Google contiene solo P1–P5 y el blog dice cinco de seis.
- Matiz: los problemas de olimpiada se eligen con solución conocida; la investigación trata preguntas abiertas. No se afirma nada sobre la capacidad de investigación de estas IA.
- **IMO 2026 (Shanghai, julio 2026):** hay reportes en medios de IA con 42/42, pero no encontré anuncio primario de la IMO ni de los laboratorios que lo certifique; por eso NO va en la voz.
- El dibujo es esquemático.
