# Shot IA #15 · Tu voz se clona con segundos: así funciona la estafa del "familiar en problemas"

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #15 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (`verificacion.md`; la ⚠️ de "En Londres…" ya corregida), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~960 créditos).
- **Formato:** N6 "Guía en pasos" (la estafa en 3 pasos, con contador grande) + cierre con 2 pasos de defensa.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" — "Esa no es la voz de tu hijo pidiéndote dinero: es una copia hecha por una IA", sobre un celular que suena en pantalla.
- **Duración:** voz 960 caracteres / 177 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** en la base.
- **Postura de la serie:** crítica con datos (un uso dañino de la IA) + consejo útil y concreto. Los dos estudios son de **2023** y se dice. Dato honesto: este canal usa la voz clonada de Robert, con su permiso.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa no es la voz de tu hijo pidiéndote dinero: es una copia hecha por una IA. | Fondo rosa; desde el cuadro 0 un celular vibra con "Hijo · llamando…"; debajo, la onda de su voz se vuelve bloques cian de computadora y aparece "COPIA HECHA POR IA". |
| 1 | Paso1 | Así funciona la estafa. Paso uno: consiguen un audio corto de su voz, como un video que subió a redes. | `Pasos` "PASO 1 / 3"; un video de redes en un celular (la persona habla, corazones); unas tijeras recortan un pedacito de la onda: "audio corto ✂". |
| 2 | Paso2 | Paso dos: un programa de clonación aprende a imitarla. | "PASO 2 / 3"; fondo de circuito (por dentro de la máquina): el pedacito "su voz" entra a una red neuronal que se enciende y sale "la imitación". |
| 3 | Paso3 | Paso tres: te llaman con prisa, inventan un choque o un arresto y piden dinero ya. | "PASO 3"; el celular suena; íconos de choque 🚗 y patrulla; chip "¡deposita YA!" con un reloj corriendo. |
| 4 | Segundos | ¿Cuánto audio necesitan? En 2023, un modelo de Microsoft, VALL-E, imitó voces que nunca había oído con una grabación de solo tres segundos. | Chip "¿cuánto audio necesitan?"; `TarjetaEstudio` "2023 · Microsoft · modelo VALL-E · Wang et al. · arXiv:2301.02111"; `NumeroGigante` "3 s de grabación" con 3 tics; chip "voces que nunca había oído". |
| 5 | Pregunta | ¿Y tú notarías la diferencia? | **Re-gancho.** Dos ondas lado a lado "¿real o falsa?"; Robert grande. |
| 6 | Oidos | En 2023, científicos de Londres pusieron a quinientas veintinueve personas a escuchar voces reales y falsas. Solo detectaron las falsas setenta y tres por ciento de las veces. | Tarjeta "2023 · científicos de Londres (UCL) · Mai et al. · PLOS ONE"; chip "529 personas escucharon"; número "73 % falsas descubiertas"; cuadrícula "de cada 100 voces falsas": 73 se pintan de azul (descubiertas) y 27 de rojo. |
| 7 | Confesion | Y te confieso algo: la voz que oyes es mi voz clonada, con mi permiso. | Robert grande sonriendo; chips "esta voz: clonada" y "con mi permiso ✔"; una onda dorada. |
| 8 | Defensa | Para defenderte: no confíes solo en la voz. Inventen en familia una palabra clave. Y si te llaman con prisa, cuelga y marca tú al número que ya conoces. | Fondo verde azulado; `MitoTachado` "confiar solo en la voz"; tarjetas "1 · palabra clave en familia 🔑" y "2 · cuelga y marca tú al número que ya conoces ☎️". |
| 9 | Cierre | Porque una voz se copia con segundos. Su palabra secreta, si no la comparten, no. | **Regreso a la imagen del inicio**: el mismo celular sonando sobre rosa; burbuja "¿palabra clave?"; la onda de bloques (la copia) se desarma y cae; un candado se cierra. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música (`gen-audio.mjs`):** cama grave continua; zumbido de vibración en el cuadro 0 y tecleo cuando la voz se vuelve bloques; tijera metálica al recortar; zumbido de máquina y nota que sube en el paso 2; golpe y crujido del choque y sirena de dos notas en el paso 3; 3 tics en "tres segundos"; tecleo de la cuadrícula y la nota que sube al 73 %; crujido al tachar el mito; las barras que caen y el clic metálico del candado al final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y tú notarías la diferencia?» y en la confesión.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.4 | 11_sorprendido | `gancho` | «Esa no es la voz de tu hijo» (cuadro 0) |
| 2 | 7.3 | 10.6 | 13_senalando_arriba | `bajo-der` | señala el audio recortado («un audio corto de su voz») |
| 3 | 15.4 | 19.0 | 10_serio_molesto | `bajo-der` | «inventan un choque o un arresto y piden dinero ya» |
| 4 | 24.4 | 27.2 | 11_sorprendido | `izq-alto` | «solo tres segundos» |
| 5 | 27.45 | 30.6 | 07_pensativo_puno | `grande` | «¿Y tú notarías la diferencia?» |
| 6 | 35.0 | 39.5 | 04_bajando_lentes | `arriba-der` | «solo detectaron las falsas setenta y tres por ciento» |
| 7 | 39.9 | 43.8 | 05_sonriendo_dientes_uniformes | `grande-izq` | «la voz que oyes es mi voz clonada, con mi permiso» |
| 8 | 44.3 | 48.8 | 13_senalando_arriba | `bajo-der` | señala la palabra clave |
| 9 | 53.6 | 58.2 | 05_sonriendo_dientes_uniformes | `bajo-der` | «su palabra secreta… no» |
| — | 58.3 | 61.8 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 34.7 s (+ cierre 3.5 s) · poses distintas 6 (+ la del cierre; nunca la misma dos veces seguidas) · total 61.8 s.
`bajo-der` es un lado propio del shot (debajo del subtítulo, en `vozclonada.jsx`), porque el `Pasos` de arriba ocupa todo el ancho.

## Fuentes (abiertas el 29 oct 2026)

1. Wang, C., Chen, S., Wu, Y. *et al.* (Microsoft). "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers" (VALL-E). arXiv:2301.02111, enviado el 5 de enero de **2023**. https://arxiv.org/abs/2301.02111
   > "with only a 3-second enrolled recording of an unseen speaker as an acoustic prompt"
   > "we scale up the TTS training data to 60K hours of English speech"
   > "Since VALL-E could synthesize speech that maintains speaker identity, it may carry potential risks in misuse of the model, such as spoofing voice identification or impersonating a specific speaker."
2. Mai, K. T., Bray, S., Davies, T. y Griffin, L. D. "Warning: Humans cannot reliably detect speech deepfakes". *PLOS ONE* 18(8): e0285333, publicado el 2 de agosto de **2023**. Department of Security and Crime Science, University College London, Londres. https://doi.org/10.1371/journal.pone.0285333
   > "We presented genuine and deepfake audio to n = 529 individuals and asked them to identify the deepfakes."
   > "Listeners only correctly spotted the deepfakes 73% of the time"
   > "We ran our experiments in English and Mandarin"
3. FTC (Comisión Federal de Comercio de EE. UU.), Alvaro Puig. "Scammers use AI to enhance their family emergency schemes", 20 de marzo de **2023**. https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes
   > "A scammer could use AI to clone the voice of your loved one. All he needs is a short audio clip of your family member's voice — which he could get from content posted online…"
   > "Don't trust the voice. Call the person who supposedly contacted you and verify the story. Use a phone number you know is theirs."
   > "If the caller says to wire money, send cryptocurrency, or buy gift cards and give them the card numbers and PINs…" (señales de estafa)
   > "He says he's in deep trouble — he wrecked the car and landed in jail." (ejemplo del aviso)
4. FBI / IC3. Public Service Announcement I-120324-PSA, 3 de diciembre de **2024**. https://www.ic3.gov/PSA/2024/PSA241203
   > "Criminals generate short audio clips containing a loved one's voice to impersonate a close relative in a crisis situation, asking for immediate financial assistance or demanding a ransom."
   > "Create a secret word or phrase with your family to verify their identity."
5. México — Guardia Nacional con la SEP y Aprende.mx. "¿Sabes cómo evitar fraudes por clonación de voz con inteligencia artificial?", publicado el 20 de mayo de **2026**. https://nuevaescuelamexicana.sep.gob.mx/contenido/recurso/sabes-como-evitar-fraudes-por-clonacion-de-voz-con-inteligencia-artificial/
   > "Crea una palabra clave con familiares y amigos"
   > "Si te piden dinero, verifica por otra vía"
   > "Evita compartir grabaciones de voz en plataformas públicas"
6. Voz del canal: `CLAUDE.md` del repositorio — voz clonada de Robert en ElevenLabs (Voice ID `uiCk6APPfsjnw3oUQzVo`), usada con su autorización; se genera solo cuando él la aprueba.

## Notas
- "Tres segundos" es el dato del modelo de investigación VALL-E (2023, voces en inglés); no se afirma que toda herramienta comercial lo logre con 3 s. En la estafa se dice "un audio corto" (como la FTC y el FBI).
- "Voces que nunca había oído" = "unseen speaker" (hablantes que no estaban en su entrenamiento).
- "Setenta y tres por ciento" = acierto de los oyentes al identificar las voces falsas (Mai et al., 2023, inglés y mandarín); se dice como "solo detectaron las falsas 73 % de las veces". La cuadrícula "de cada 100 voces falsas" (73 azules, 27 rojas) es una forma de dibujar ese porcentaje, no 100 audios reales.
- Los 529 participantes se reclutaron en línea (Prolific); por eso se dice "científicos de Londres" (los autores, de UCL) y no que las personas estuvieran en Londres (corrección del verificador).
- "Choque o arresto" viene del ejemplo del aviso de la FTC (2023). "Cuelga y marca tú al número que ya conoces" = FTC 2023. "Palabra clave en familia" = FBI 2024 y Guardia Nacional/SEP 2026.
- "Su palabra secreta, si no la comparten, no [se puede copiar]" es la lógica del consejo oficial (una palabra que el estafador no conoce); se condiciona a no compartirla.
- La confesión de la voz clonada es verdadera para la versión narrada final (voz de ElevenLabs aprobada por Robert). En la versión de revisión sin voz no se oye, pero el subtítulo dice lo mismo.
- El dibujo es esquemático.
