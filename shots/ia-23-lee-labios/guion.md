# Shot IA #23 · La IA que lee labios mejor que los expertos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #23 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (14 ✅ · 4 ⚠️ · 1 ❌ → todo corregido), animación, Robert en pantalla, `gen-audio.mjs`
  y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N5 "El experimento": primero TÚ intentas leer unos labios sin sonido («peso» o «beso»), luego el duelo
  lector profesional contra la IA.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": la diferencia entre «peso» y «beso» en unos labios mudos.
- **Duración:** voz 956 caracteres / ~170 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** defiende (supera a expertos; su meta es ayudar a quien perdió la voz) y critica con datos
  (sus propios autores dicen dónde NO funciona). Los estudios son de **2017 y 2018** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tus ojos nunca van a ver si estos labios dijeron «peso» o «beso»: la pe y la be se ven iguales. | Fondo rosa; desde el cuadro 0 una pantalla de video sin sonido (🔇) con unos labios que dicen «peso/beso» en loop. Dos tarjetas «PESO» y «BESO» con un "?" que rebota entre ellas: el espectador intenta adivinar. Chip "P y B: la misma boca". |
| 1 | Visemas | Sonidos distintos pueden hacer la misma forma de boca: se llaman visemas. | Unos labios juntos y encima caen tres letras: P, B y M (un solo visema en español, Fernandez-Lopez y Sukno 2017). Chips "1 visema = labios juntos" y "visema: la forma visible de un sonido". |
| 2 | Experto | En dos mil diecisiete, en Oxford, un experto en leer labios descifró menos de una de cada cuatro palabras en videos de la BBC. La IA de ese estudio, la mitad. | Tarjeta "2017 · Oxford + DeepMind · Chung, Senior, Vinyals y Zisserman · CVPR" y chip "200 videos de la BBC · sin sonido"; una tele "BBC" muda y un lector con lupa; fila de 12 palabras: "lector profesional — menos de ¼" (se encienden 2.8); luego "IA (solo labios) — ½" (6 de 12). |
| 3 | Pregunta | ¿Y si la máquina viera muchas más bocas? | **Re-gancho.** "?" gigante; una cuadrícula de 30 bocas pequeñitas que se multiplica. Robert grande. |
| 4 | Estudio | En dos mil dieciocho, DeepMind y Google entrenaron otra con casi tres mil novecientas horas de YouTube. | Tarjeta "2018 · DeepMind y Google · Shillingford et al. · arXiv:1807.05162"; luego fondo de circuito (por dentro de la máquina): contador "3,886 h · horas de YouTube", una tira de película con bocas que corre bajo una red neuronal; chip "caras hablando · en inglés". |
| 5 | Duelo | La pusieron contra lectores profesionales, que podían ver cada video hasta diez veces. Los expertos tuvieron entre ochenta y seis y noventa y tres por ciento de error de palabras. La IA, cuarenta y uno. | Ring: lector humano VS robotito; chip "▶ ver otra vez: 1…10 / 10" del lado humano y "solo la boca" del lado IA. Luego barras "error de palabras · menos es mejor": profesionales sin contexto 92.9 %, con contexto 86.4 %, la IA (2018) 40.9 %. |
| 6 | Voz | Una de sus metas: ayudar a quien perdió la voz, por ejemplo tras una traqueostomía. | Paciente en cama con cánula en el cuello; mueve los labios y aparece un globo **punteado** "tengo sed" con el chip "podría ayudar · ejemplo ilustrativo" (posibilidad, no uso actual). |
| 7 | Riesgo | ¿Y espiar con cámaras? Sus autores avisan: solo va bien de frente, de cerca y con buen video. | Cámara de calle en poste apuntando a una persona chiquita y borrosa → ✗; pantalla con una cara de frente, cerca y nítida → ✔. Tres chips: "de frente", "de cerca", "buen video". |
| 8 | Cierre | A la máquina también se le llegan a cruzar la pe y la be: para decidir, se ayuda con las palabras de alrededor. | **Regreso a la imagen del inicio**: la misma pantalla con los labios y las tarjetas «PESO / BESO»; aparece la frase "¿Cuál es el ___ de tu maleta?", el hueco se llena con «peso», la tarjeta «PESO» se ilumina y «BESO» se apaga. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, apagada (como oída con tapones) hasta que el contexto decide; un clic suave cada vez
que los labios se juntan, golpes al caer P, B y M, tecleo al multiplicarse las bocas, un motor suave con la tira de
película, un "rewind" por cada repetición del video en el duelo, un golpe grave cuando cae la barra de la IA, un pitido
suave de monitor en el hospital, zumbido de la cámara de calle, y la cama se abre (más brillante) cuando se ilumina «PESO».

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y si la máquina viera muchas más bocas?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.2 | 11_sorprendido | `gancho` | «Tus ojos nunca van a ver…» (cuadro 0) |
| 2 | 6.2 | 10.0 | 04_bajando_lentes | `arriba-der` | «se llaman visemas» |
| 3 | 13.6 | 17.2 | 13_senalando_arriba | `arriba-der` | señala la tele y al lector («menos de una de cada cuatro») |
| 4 | 17.6 | 19.65 | 11_sorprendido | `arriba-der` | «La IA de ese estudio, la mitad» |
| 5 | 19.85 | 22.8 | 07_pensativo_puno | `grande` | «¿Y si la máquina viera muchas más bocas?» |
| 6 | 29.0 | 33.4 | 04_bajando_lentes | `arriba-der` | el duelo («podían ver cada video hasta diez veces») |
| 7 | 34.6 | 40.5 | 11_sorprendido | `arriba-der` | «La IA, cuarenta y uno» |
| 8 | 41.1 | 45.6 | 05_sonriendo_dientes_uniformes | `arriba-der` | «ayudar a quien perdió la voz» |
| 9 | 46.1 | 51.2 | 10_serio_molesto | `izq-alto` | «¿Y espiar con cámaras?» |
| 10 | 51.7 | 54.0 | 06_pensativo_menton | `arriba-der` | «se le llegan a cruzar la pe y la be» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 40.2 s (+ cierre 3.5 s) · poses distintas 6 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (abiertas en el original el 29 oct 2026)

1. Shillingford, B., Assael, Y., Hoffman, M. W., et al. (DeepMind & Google). "Large-Scale Visual Speech Recognition".
   arXiv:1807.05162 (v1 13 jul 2018; v3 1 oct 2018). PDF abierto y leído completo.
   > "we constructed the largest existing visual speech recognition dataset, consisting of pairs of text and video clips of faces speaking (3,886 hours of video)." (2018)
   > "The proposed system achieves a word error rate (WER) of 40.9% as measured on a held-out set. In comparison, professional lipreaders achieve either 86.4% or 92.9% WER on the same dataset when having access to additional types of contextual information." (2018)
   > Tabla 1: "Professional w/o context … 92.9 ± 0.9"; "Professional w/ context … 86.4 ± 1.4"; V2P "40.9 ± 1.2". (2018)
   > "Large-Scale Visual Speech Recognition (LSVSR) dataset used in this work, distilled from YouTube videos" (2018)
   > "We consulted a professional lipreading company… The lipreaders could view the video up to 10 times, at half or normal speed each time." (2018)
   > "Assisting people with speech impairments is a key motivating factor behind this work… in the U.S. alone 103,925 tracheostomies were performed in 2014 (HCUPnet, 2014), a procedure that can result in a difficulty to speak (disphonia) or an inability to produce voiced sound (aphonia)." (2018)
   > "By design, the trained model only performs well when videos are shot at specific angles when a subject is facing the camera, within a certain distance from a subject, and at high quality. It does not perform well in other contexts." (2018)
   > "Except for V2P-NoLM, all models used the same 5-gram word-level language model during decoding." · "removing the language model results only in a drop of approximately 13 WER to 53.6%." (2018)
   > Autores con afiliación "DeepMind & Google".
   > Apéndice B: "A few groups are commonly confused as expected due to their visual similarity, such as {/d/, /n/, /t/}, and to a lesser extent {/b/, /p/}." (2018)
   > "V2P could be helpful for performing silent speech recognition for those with aphonia" (Fig. 6, 2018)

2. Chung, J. S., Senior, A., Vinyals, O. y Zisserman, A. "Lip Reading Sentences in the Wild". CVPR 2017, pp. 6447–6456.
   Universidad de Oxford (Department of Engineering Science) y DeepMind. PDF abierto en openaccess.thecvf.com.
   > "It is inherently ambiguous at the word level due to homophemes – different characters that produce exactly the same lip sequence (e.g. 'p' and 'b'). However, such ambiguities can be resolved to an extent using the context of neighboring words in a sentence, and/or a language model." (2017)
   > "A phoneme is the smallest distinguishable unit of sound that collectively make up a spoken word; a viseme is its visual equivalent." (2017)
   > "we instructed a professional lip reading company to decipher a random sample of 200 videos from our test set. The lip reader has around 10 years of professional experience" (2017)
   > "We observed that the professional lip reader is able to correctly decipher less than one-quarter of the spoken words (Table 5)… In contrast, the WAS model (lips only) is able to decipher half of the spoken words." (2017)
   > "This lip reading performance beats a professional lip reader on videos from BBC television" (2017)

3. Fernandez-Lopez, A. y Sukno, F. M. "Automatic Viseme Vocabulary Construction to Enhance Continuous Lip-reading".
   arXiv:1704.08035 (26 abr 2017). Universitat Pompeu Fabra (Barcelona); corpus en español AV@CAR. PDF abierto.
   > "the phones /p/ and /b/ are visually indistinguishable because voicing occurs at the glottis, which is not visible." (2017)
   > Tabla 2 (vocabulario de visemas para el español): "m, p, b" en un mismo visema. (2017)

## Notas
- **«Peso» / «beso»**: p y b se ven iguales también en español (Fernandez-Lopez y Sukno 2017: "/p/ and /b/ are visually
  indistinguishable"; "m, p, b" = un visema), y el resto de las dos palabras es igual. La M del dibujo está respaldada ahí.
- Los sistemas de 2017 y 2018 leían labios **en inglés** (chip "en inglés" en pantalla). Por eso el cierre no dice que la
  máquina "no ve" «peso/beso»: dice que también se le llegan a cruzar la p y la b (Shillingford, Apéndice B: "to a lesser
  extent {/b/, /p/}") y que se ayuda con las palabras de alrededor.
- "Error de palabras" = *word error rate* (WER): sustituciones + omisiones + inserciones entre palabras de referencia; por
  eso se dice "error de palabras" y no "acertaron X palabras". 86.4 % = profesionales con contexto (primeras 6 palabras,
  título y categoría del video), 92.9 % = sin contexto; la IA 40.9 % → "cuarenta y uno".
- "Casi tres mil novecientas horas" = 3,886 h.
- "La mitad" (Chung 2017): el modelo WAS solo con labios descifró la mitad de las palabras (WER 50.2 %, Tabla 5).
- "En Oxford" (2017): el estudio es de Oxford con DeepMind; "DeepMind y Google" (2018) es la afiliación del paper.
- "Se ayuda con las palabras de alrededor": el sistema usa un modelo de lenguaje de 5-gramas; sin él, el error sube
  a 53.6 %. Chung: las ambigüedades se resuelven con "the context of neighboring words".
- Escena 6: el globo "tengo sed" es ilustrativo y se marca como posibilidad ("podría ayudar"); el paper dice "V2P could be
  helpful…", no que ya se use en hospitales.
- Riesgo de vigilancia: no se afirma que se use para espiar; se plantea como pregunta y se responde con la advertencia
  textual de los autores (de frente, cerca, alta calidad).
- Son sistemas de 2017–2018 y así se dice; no se afirma nada sobre sistemas actuales. El dibujo es esquemático.
