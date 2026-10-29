# Shot IA #23 · La IA que lee labios mejor que los expertos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #23 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N5 "El experimento": primero TÚ intentas leer unos labios sin sonido («peso» o «beso»), luego el duelo
  lector profesional contra la IA.
- **Gancho (de los 7):** #7 "Algo que tus ojos nunca van a ver": la diferencia entre «peso» y «beso» en unos labios mudos.
- **Duración:** voz 956 caracteres / ~176 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** estimados en la base.
- **Postura de la serie:** defiende (supera a expertos; su meta es ayudar a quien perdió la voz) y critica con datos
  (sus propios autores dicen dónde NO funciona). Los estudios son de **2017 y 2018** y se dice.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tus ojos nunca van a ver si estos labios dijeron «peso» o «beso»: la pe y la be se ven igualitas. | Fondo rosa; desde el cuadro 0 una boca grande (dibujo) que se cierra y se abre en loop, con el ícono 🔇. Dos tarjetas «PESO» y «BESO» con un "?" que salta entre ellas: el espectador intenta adivinar. Las dos bocas dibujadas lado a lado: idénticas. |
| 1 | Visemas | Sonidos distintos pueden hacer la misma forma de boca: se llaman visemas. | Un molde de boca "labios juntos" y encima tres letras que caen dentro: P, B (y M en gris, ilustrativa — ver Notas). Chip "visema = la forma visible de un sonido". |
| 2 | Experto | En dos mil diecisiete, en Oxford, un lector profesional de labios descifró menos de una de cada cuatro palabras en videos de la BBC. La IA de ese estudio, la mitad. | Tarjeta "2017 · Oxford + DeepMind · Chung et al. · CVPR"; una tele "BBC" sin sonido; un lector con lupa y una barra de palabras: se iluminan menos de ¼; luego la barra del robotito llega a ½. |
| 3 | Pregunta | ¿Y si la máquina viera muchas más bocas? | **Re-gancho.** "?" gigante; una cascada de bocas pequeñitas que se multiplica. Robert grande. |
| 4 | Estudio | En dos mil dieciocho, DeepMind y Google entrenaron otra con casi tres mil novecientas horas de videos de YouTube. | Fondo de circuito (por dentro de la máquina); contador que sube hasta "3,886 h"; tiras de boca recortadas entrando a una red neuronal. Tarjeta "2018 · DeepMind y Google · Shillingford et al.". |
| 5 | Duelo | Y la pusieron contra lectores profesionales, que veían cada video hasta diez veces. Los expertos tuvieron entre ochenta y seis y noventa y tres por ciento de error de palabras. La IA, cuarenta y uno. | Ring de duelo: lector humano vs robotito; contador "▶ ×10" en el lado humano. Barras de error: "profesionales 86.4 % – 92.9 %" contra "IA 40.9 %" (menos es mejor). |
| 6 | Voz | La meta: ayudar a quien perdió la voz, por ejemplo tras una traqueostomía. | Paciente en cama con cánula en el cuello; mueve los labios y aparece un globo de texto. |
| 7 | Riesgo | ¿Y espiar con cámaras? Los autores avisan que solo funciona bien de frente, de cerca y con buen video. | Cámara de calle lejana con una cara chiquita y borrosa → ✗; cara de frente, cerca y nítida → ✔. Tres chips: "de frente", "de cerca", "buen video". |
| 8 | Cierre | Y la máquina tampoco ve si dijiste «peso» o «beso»: adivina mejor por las palabras de alrededor. | **Regreso a la imagen del inicio**: la misma boca y las tarjetas «PESO / BESO»; aparece la frase alrededor ("¿Cuánto ___ tu maleta?") y la tarjeta «PESO» se ilumina. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, apagada (como oída con tapones) mientras la boca está "muda"; un clic suave por cada
movimiento de labios, un tic-tac de cronómetro en el duelo con un "rewind" por cada repetición del video, un golpe grave
cuando cae la barra de la IA, un pitido monitor suave en la escena del hospital, y la cama se abre (más brillante) cuando
se ilumina «PESO» al final.

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

2. Chung, J. S., Senior, A., Vinyals, O. y Zisserman, A. "Lip Reading Sentences in the Wild". CVPR 2017, pp. 6447–6456.
   Universidad de Oxford (Department of Engineering Science) y DeepMind. PDF abierto en openaccess.thecvf.com.
   > "It is inherently ambiguous at the word level due to homophemes – different characters that produce exactly the same lip sequence (e.g. 'p' and 'b'). However, such ambiguities can be resolved to an extent using the context of neighboring words in a sentence, and/or a language model." (2017)
   > "A phoneme is the smallest distinguishable unit of sound that collectively make up a spoken word; a viseme is its visual equivalent." (2017)
   > "we instructed a professional lip reading company to decipher a random sample of 200 videos from our test set. The lip reader has around 10 years of professional experience" (2017)
   > "We observed that the professional lip reader is able to correctly decipher less than one-quarter of the spoken words (Table 5)… In contrast, the WAS model (lips only) is able to decipher half of the spoken words." (2017)
   > "This lip reading performance beats a professional lip reader on videos from BBC television" (2017)

## Notas
- **«Peso» / «beso»** es un ejemplo en español construido con lo que dice Chung et al. ("'p' and 'b'… exactly the same
  lip sequence"); el paper es en inglés. La M en el dibujo de visemas es ilustrativa (también se cierra con los labios),
  no se dice en la voz; si el verificador la objeta, se quita.
- "Error de palabras" = *word error rate* (WER): sustituciones + omisiones + inserciones entre palabras de referencia; por
  eso se dice "error de palabras" y no "acertaron X palabras". 86.4 % = profesionales con contexto (primeras 6 palabras,
  título y categoría del video), 92.9 % = sin contexto; la IA 40.9 % → "cuarenta y uno".
- "Casi tres mil novecientas horas" = 3,886 h.
- "La mitad" (Chung 2017): el modelo WAS solo con labios descifró la mitad de las palabras (WER 50.2 %, Tabla 5).
- "En Oxford" (2017): el estudio es de Oxford con DeepMind; "DeepMind y Google" (2018) es la afiliación del paper.
- "Adivina mejor por las palabras de alrededor": el sistema usa un modelo de lenguaje de 5-gramas; sin él, el error sube
  a 53.6 %. Chung: las ambigüedades se resuelven con "the context of neighboring words".
- Riesgo de vigilancia: no se afirma que se use para espiar; se plantea como pregunta y se responde con la advertencia
  textual de los autores (de frente, cerca, alta calidad).
- Son sistemas de 2017–2018 y así se dice; no se afirma nada sobre sistemas actuales. El dibujo es esquemático.
