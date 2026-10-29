# Shot IA #10 · Tú contra un bot: ¿quién resuelve mejor los captchas?

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #10 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A: guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N2 "El número" (marcador humanos 50–85 % contra bots > 96 %) con un giro histórico (reCAPTCHA y los libros).
- **Gancho (de los 7):** #2 "Tú contra el de al lado": tú contra un bot resolviendo captchas.
- **Duración:** voz 957 caracteres / ≈ 172 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** estimados en la base.
- **Postura de la serie:** con datos, sin alarmismo: las máquinas ya pasan la prueba hecha para detenerlas; el captcha cambió de examen (de leer a observar comportamiento). Las cifras de humanos son de 2023 y las de bots vienen de estudios de 2014–2021 que reúne el mismo artículo; se dice el año cuando aplica.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tú contra un bot resolviendo captchas: casi siempre gana él, y más rápido. | Fondo amarillo; desde el cuadro 0 pantalla dividida: a la izquierda una mano (tú) frente a un captcha de letras chuecas, a la derecha el robotito frente al mismo captcha. Cronómetros arrancan; el del bot se detiene primero con ✔. |
| 1 | Marcador | Las personas atinaron de cincuenta a ochenta y cinco por ciento; la mayoría de los bots, más de noventa y seis. | Marcador tipo pelea de box: "humanos 50–85 %" contra "bots: la mayoría > 96 %" (barras que se llenan). |
| 2 | Estudio | Lo comparó la Universidad de California en Irvine en 2023: mil cuatrocientas personas, catorce mil captchas. | `TarjetaEstudio` "2023 · UC Irvine · Searles et al. · USENIX Security"; contador "1,400 personas" y una cuadrícula de captchas que se llena hasta "14,000". |
| 3 | Letras | Con letras chuecas, en 2014 una IA de Google leía las más difíciles: noventa y nueve punto ocho por ciento de acierto. | Fondo de circuito (por dentro de la máquina); una red neuronal "lee" letras deformadas y las endereza; `NumeroGigante` "99.8 %" · chip "2014 · Google". |
| 4 | Pregunta | Entonces, ¿para qué te los siguen poniendo? | **Re-gancho.** "?" gigante sobre la casilla "No soy un robot"; Robert grande. |
| 5 | Libros | Y tú ya trabajaste para las máquinas: muchas palabras que tecleabas eran de libros escaneados que la computadora no leía. | Un libro viejo escaneado: una palabra borrosa que la computadora marca "???" salta al captcha de un usuario y regresa al libro ya escrita. |
| 5b | Libros | Para 2008 ya iban más de cuatrocientos cuarenta millones de palabras. | `NumeroGigante` "440 millones de palabras" (2008); pila de libros que crece. Chip "von Ahn et al. · Science 2008". |
| 6 | Calle | Luego Google probó números de casas de Street View. | Una fachada con el número de casa recortado dentro de un cuadro de captcha. |
| 7 | Movimiento | Hoy importa menos lo que escribes: la casilla «no soy un robot» mira lo que haces antes, durante y después del clic. | La casilla grande; el cursor deja una estela (ilustrativa) y tres etiquetas aparecen: "antes", "durante", "después". |
| 8 | Calificacion | Y la versión tres ni pregunta: califica cada visita de cero, bot, a uno, humano. | `Medidor` de 0.0 (bot) a 1.0 (humano); la aguja se mueve sin que aparezca ninguna prueba. |
| 9 | Cierre | Así que el bot te gana leyendo: la prueba ya es todo lo que haces. | **Regreso a la imagen del inicio**: la misma pantalla dividida; el bot sigue ganando en las letras, pero ahora la casilla de tu lado se pone verde ✔ sin escribir nada. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua y electrónica suave; tic-tac de los cronómetros en el gancho, campanita cuando el bot termina, conteo rápido de teclas mientras se llena la cuadrícula, zumbido de circuito en la red neuronal, hoja de libro al pasar, clic seco de la casilla, aguja del medidor que sube.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Searles, A., Nakatsuka, Y., Ozturk, E., Paverd, A., Tsudik, G. y Enkoji, A. "An Empirical Study & Evaluation of Modern CAPTCHAs". *32nd USENIX Security Symposium* (agosto de 2023), pp. 3081–3097. UC Irvine. PDF: https://www.usenix.org/system/files/usenixsecurity23-searles.pdf
   > Resumen: "we explore CAPTCHAS in the wild by evaluating users' solving performance and perceptions of unmodified currently-deployed CAPTCHAS. We obtain this data through manual inspection of popular websites and user studies in which 1,400 participants collectively solved 14,000 CAPTCHAS."
   > §5.5: "Table 3 contrasts our measured human solving times and accuracy against those of automated bots reported in the literature. Interestingly, these results suggest that bots can outperform humans, both in terms of solving time and accuracy, across all these CAPTCHA types."
   > §8: "The bots' accuracy ranges from 85-100%, with the majority above 96%. This substantially exceeds the human accuracy range we observed (50-85%). Furthermore the bots' solving times are significantly lower in all cases, except reCAPTCHA (image), where human solving time (18 seconds) is similar to the bots' (17.5 seconds)."
   > Tabla 3 (letras deformadas): humanos 9–15.3 s y 50–84 %; bots < 1 s [Zi 2020] y 99.8 % [Goodfellow 2014].
2. Goodfellow, I. J., Bulatov, Y., Ibarz, J., Arnoud, S. y Shet, V. "Multi-digit Number Recognition from Street View Imagery using Deep Convolutional Neural Networks". ICLR 2014 · arXiv:1312.6082 (Google).
   > "we apply it to synthetic distorted text from reCAPTCHA. reCAPTCHA is one of the most secure reverse turing tests that uses distorted text to distinguish humans from bots. We report a 99.8% accuracy on the hardest category of reCAPTCHA."
3. Shet, V. "Are you a robot? Introducing 'No CAPTCHA reCAPTCHA'". Google Security Blog, 3 dic 2014. https://security.googleblog.com/2014/12/are-you-robot-introducing-no-captcha.html
   > "our research recently showed that today's Artificial Intelligence technology can solve even the most difficult variant of distorted text at 99.8% accuracy. Thus distorted text, on its own, is no longer a dependable test."
   > "we developed an Advanced Risk Analysis backend for reCAPTCHA that actively considers a user's entire engagement with the CAPTCHA—before, during, and after—to determine whether that user is a human. This enables us to rely less on typing distorted text"
4. von Ahn, L., Maurer, B., McMillen, C., Abraham, D. y Blum, M. "reCAPTCHA: Human-Based Character Recognition via Web Security Measures". *Science* 321(5895): 1465–1468 (12 sep 2008). DOI 10.1126/science.1160379 · PMID 18703711. Carnegie Mellon University.
   > "helping to digitize old printed material by asking users to decipher scanned words from books that computerized optical character recognition failed to recognize. … Our apparatus is deployed in more than 40,000 Web sites and has transcribed over 440 million words."
5. Declaración de Google a TechCrunch: "Google Now Using ReCAPTCHA To Decode Street View Addresses", 29 mar 2012. https://techcrunch.com/2012/03/29/google-now-using-reCAPTCHA-to-decode-street-view-addresses
   > "We're currently running an experiment in which characters from Street View images are appearing in CAPTCHAs."
6. Google for Developers, "reCAPTCHA v3" (documentación oficial, consultada 29 oct 2026). https://developers.google.com/recaptcha/docs/v3
   > "reCAPTCHA v3 returns a score for each request without user friction."
   > "reCAPTCHA v3 returns a score (1.0 is very likely a good interaction, 0.0 is very likely a bot)."

## Notas
- "Casi siempre gana él, y más rápido": el artículo concluye que los bots pueden superar a los humanos en tiempo y precisión en todos los tipos comparados; en tiempo, la excepción es reCAPTCHA de imágenes (humanos 18 s ≈ bots 17.5 s). Por eso "casi siempre".
- "De cincuenta a ochenta y cinco por ciento" y "la mayoría, más de noventa y seis" son los rangos que da el propio artículo (§8). Ojo: las precisiones humanas son de 2023 (en letras deformadas se midieron como coincidencia entre participantes); las de bots vienen de ataques publicados por otros autores (2014–2021) que el artículo reúne en su Tabla 3. No es una carrera en vivo; el dibujo del gancho es esquemático.
- "Mil cuatrocientas personas, catorce mil captchas": suma del estudio principal (1,000 participantes) y del estudio de abandono; la cifra conjunta viene del resumen.
- "Noventa y nueve punto ocho por ciento": Goodfellow et al. (equipo de Google), 2014, en "la categoría más difícil" de reCAPTCHA de texto. Se dice el año.
- "Cuatrocientos cuarenta millones de palabras": cifra al publicarse el artículo de *Science* (2008).
- Street View: Google lo describió en 2012 como un experimento ("probó"); no se afirma que se volviera permanente.
- "Antes, durante y después del clic": así lo explicó Google en 2014 para su análisis de riesgo; la estela del cursor en pantalla es ilustrativa (Google no publica exactamente qué señales mide).
- "Versión tres… de cero a uno": documentación oficial vigente de reCAPTCHA v3.
- El dibujo es esquemático.
