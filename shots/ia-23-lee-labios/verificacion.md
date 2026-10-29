# Verificación de hechos · Shot IA #23 · La IA que lee labios mejor que los expertos

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Revisé `guion.md` (voz y columna "Lo que se ve") y `narracion.json`.
  Todavía no hay `.jsx`.
- Abrí y leí los originales en texto completo: Shillingford et al., arXiv:1807.05162v3 (PDF);
  Chung et al., CVPR 2017 (PDF de openaccess.thecvf.com); Fernandez-Lopez y Sukno, arXiv:1704.08035 (PDF);
  la tabla de fonemas y visemas de español de México de Amazon Polly (documentación de AWS).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | (Voz 0) «Peso» y «beso» no se distinguen en unos labios mudos: la pe y la be se ven igualitas | ✅ | Fernandez-Lopez y Sukno, "Automatic Viseme Vocabulary Construction to Enhance Continuous Lip-reading", Universitat Pompeu Fabra, arXiv:1704.08035 (corpus en español AV@CAR); Chung et al. CVPR 2017; Amazon Polly, tabla es-MX | "the phones /p/ and /b/ are visually indistinguishable because voicing occurs at the glottis, which is not visible." · Tabla 2, vocabulario óptimo de visemas para el español: "m, p, b" (un solo visema) · Polly es-MX: /p/ "pozo" → visema "p"; /b/ "bestia" → visema "p"; /m/ → visema "p". El resto de las dos palabras (e-s-o) es igual, así que «peso»/«beso» forman el mismo dibujo de boca | 2017 |
| 2 | (Pantalla 1) P, B y M caen en el mismo molde "labios juntos" | ✅ | Fernandez-Lopez y Sukno 2017, Tabla 2 (español) | "m, p, b" en el mismo visema. La M está respaldada; no hace falta quitarla | 2017 |
| 3 | (Voz 1 + chip) Sonidos distintos pueden hacer la misma forma de boca: se llaman visemas / "visema = la forma visible de un sonido" | ✅ | Chung et al., CVPR 2017 | "A phoneme is the smallest distinguishable unit of sound… a viseme is its visual equivalent." · "homophemes – different characters that produce exactly the same lip sequence (e.g. 'p' and 'b')" | 2017 |
| 4 | (Voz 2) En 2017, en Oxford (+ DeepMind en pantalla), un lector profesional de labios | ✅ | Chung, Senior, Vinyals, Zisserman, "Lip Reading Sentences in the Wild", CVPR 2017, pp. 6447–6456 | Afiliación "Department of Engineering Science, University of Oxford" (Chung, Zisserman) y Google DeepMind (Senior, Vinyals). "we instructed a professional lip reading company… The lip reader has around 10 years of professional experience" (un solo lector: el singular de la voz es correcto) | 2017 |
| 5 | (Voz 2) Descifró menos de una de cada cuatro palabras, en videos de la BBC | ✅ | Chung et al. 2017, secc. 5.2 y resumen | "the professional lip reader is able to correctly decipher less than one-quarter of the spoken words (Table 5)" · "beats a professional lip reader on videos from BBC television" | 2017 |
| 6 | (Voz 3) La IA de ese estudio, la mitad | ✅ | Chung et al. 2017, secc. 5.2, Tabla 5 | "In contrast, the WAS model (lips only) is able to decipher half of the spoken words." (WER 50.2 %) | 2017 |
| 7 | (Pantalla 2) Tarjeta "2017 · Oxford + DeepMind · Chung et al. · CVPR"; barra humana < ¼, barra IA ½ | ✅ | Chung et al. 2017 | Igual que 4–6 | 2017 |
| 8 | (Voz 5) En 2018, DeepMind y Google entrenaron otra IA | ✅ | Shillingford et al., "Large-Scale Visual Speech Recognition", arXiv:1807.05162v3 | Autores con afiliación "DeepMind & Google"; "arXiv:1807.05162v3 [cs.CV] 1 Oct 2018" | 2018 |
| 9 | (Voz 5 + contador "3,886 h") Con casi tres mil novecientas horas de videos de YouTube | ✅ | Shillingford et al. 2018, resumen y secc. 3 | "(3,886 hours of video)" · "LSVSR dataset used in this work, distilled from YouTube videos" · "our dataset is extracted from public YouTube videos". Nota: 3,886 h es el conjunto completo; la prueba fue solo "roughly 37 minutes", así que "casi 3,900 horas" para entrenar sigue siendo correcto | 2018 |
| 10 | (Voz 6) La pusieron contra lectores profesionales | ✅ | Shillingford et al. 2018, secc. 5 | "We consulted a professional lipreading company… The lipreaders transcribed a subset of our test set containing 153 and 274 videos" | 2018 |
| 11 | (Voz 6 + "▶ ×10") Los lectores **veían** cada video hasta diez veces | ⚠️ (leve) | Shillingford et al. 2018, secc. 5 | "The lipreaders **could view** the video up to 10 times, at half or normal speed each time." El paper dice que *podían*, no que lo hicieran siempre | 2018 |
| 12 | (Voz 7 + barras) Expertos entre 86 y 93 % de error de palabras; la IA 41 % | ✅ | Shillingford et al. 2018, resumen y Tabla 1 | "achieves a word error rate (WER) of 40.9%… professional lipreaders achieve either 86.4% or 92.9% WER on the same dataset" · Tabla 1: "92.9 ± 0.9", "86.4 ± 1.4", V2P "40.9 ± 1.2" | 2018 |
| 13 | (Voz 8) **La meta**: ayudar a quien perdió la voz, por ejemplo tras una traqueostomía | ⚠️ (leve) | Shillingford et al. 2018, secc. 1 y Apéndice A | "Assisting people with speech impairments is **a key motivating factor** behind this work" · traqueostomía: "a procedure that can result in a difficulty to speak (disphonia) or an inability to produce voiced sound (aphonia)". Es *una* motivación clave, no *la* meta única; y es una aplicación posible ("V2P could be helpful…", Fig. 6), no algo que ya se use en hospitales | 2018 |
| 14 | (Pantalla 6) Paciente con cánula mueve los labios y aparece un globo de texto | ⚠️ (leve) | Shillingford et al. 2018, Fig. 6 | "V2P **could be** helpful for performing silent speech recognition for those with aphonia". La escena puede leerse como uso real; debe verse como posibilidad | 2018 |
| 15 | (Voz 9 + chips) Los autores avisan que solo funciona bien de frente, de cerca y con buen video | ✅ | Shillingford et al. 2018, secc. 1 | "By design, the trained model only performs well when videos are shot at specific angles when a subject is facing the camera, within a certain distance from a subject, and at high quality. It does not perform well in other contexts." | 2018 |
| 16 | (Voz 10) "Y la máquina **tampoco ve** si dijiste «peso» o «beso»" | ⚠️ (exagerado) | Shillingford et al. 2018, Apéndice B (matriz de confusión) y secc. 3 | "The reader can note that the diagonal is strongly dominant. A few groups are commonly confused as expected due to their visual similarity, such as {/d/, /n/, /t/}, and **to a lesser extent {/b/, /p/}**." O sea: la IA confunde p/b *a veces*, no siempre. Además ese sistema es **solo de inglés** (quitaron lo que no era inglés: "to remove non-English utterances"); nunca leyó «peso» ni «beso» | 2018 |
| 17 | (Voz 10) Adivina mejor por las palabras de alrededor | ✅ | Shillingford et al. 2018, secc. 5–6; Chung et al. 2017 | "all models used the same 5-gram word-level language model during decoding" · "removing the language model results only in a drop of approximately 13 WER to 53.6%." · Chung: "such ambiguities can be resolved to an extent using the context of neighboring words in a sentence, and/or a language model" | 2017–2018 |
| 18 | (Pantalla 8) Frase de contexto "¿Cuánto ___ tu maleta?" con «PESO» iluminado | ❌ | Gramática | "¿Cuánto **peso** tu maleta?" no es correcto en español (sería "¿Cuánto **pesa**…?", y entonces la palabra ya no es «peso»). El ejemplo no funciona | — |
| 19 | (Título) "La IA que lee labios mejor que los expertos" | ✅ | Chung 2017; Shillingford 2018 | Ambos estudios reportan mejor resultado que los lectores profesionales en sus pruebas. El guion ya dice que son de 2017 y 2018 (más de 2 años), como pide la regla | 2017–2018 |

Revisión de reglas de cifras: cada cifra dice de qué es (palabras descifradas, horas de video, % de error de palabras); los
años 2017 y 2018 se dicen en la voz; cada cifra viene de la misma fuente que se cita (no hay mezcla). No encontré un dato
más nuevo que contradiga estos resultados (los sistemas actuales tienen menos error, pero el guion no habla de ellos).

**Conteo:** 14 ✅ · 4 ⚠️ · 1 ❌

## Correcciones necesarias

1. **#18 ❌ (pantalla, escena 8):** cambiar la frase de contexto por una donde «peso» sí cabe y «beso» no:
   "¿Cuál es el ___ de tu maleta?" → se ilumina «PESO». (Alternativa: "Mi maleta tiene mucho ___".)
2. **#16 ⚠️ (voz, escena 8):** no decir que la máquina "tampoco ve" la diferencia (la confunde solo a veces, y es una IA
   de inglés). Propuesta: «A la máquina también se le llegan a cruzar la pe y la be: para decidir, se ayuda con las
   palabras de alrededor.» (Si se quiere conservar «peso/beso» en el cierre: «Y para no confundir «peso» con «beso», la
   máquina se ayuda con las palabras de alrededor.» — sin afirmar que ella no lo ve.) Opcional: decir una vez que esas
   IA leían labios en inglés.
3. **#11 ⚠️ (voz, escena 5):** «…lectores profesionales, que **podían ver** cada video hasta diez veces.»
4. **#13 ⚠️ (voz, escena 6):** «**Una de sus metas:** ayudar a quien perdió la voz, por ejemplo tras una traqueostomía.»
   (o «Su gran motivo: …»).
5. **#14 ⚠️ (pantalla, escena 6):** que el globo de texto se vea como posibilidad (p. ej. chip "algún día" o "podría"),
   no como algo que ya se usa en hospitales.
6. Nota (no es error): la M en el molde de visemas está respaldada por Fernandez-Lopez y Sukno 2017 (español: "m, p, b"
   = un visema); se puede dejar. Conviene agregar esa fuente a `## Fuentes` del guion como respaldo de «peso/beso» en
   español.
