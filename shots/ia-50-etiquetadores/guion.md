# Shot IA #50 · Detrás de tu IA hay personas etiquetando

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #50 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (corrección foca/nutria marina aplicada), animación, Robert en pantalla, `gen-audio.mjs` y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert**.
- **Formato:** N2 "El número" (14 millones de imágenes; 1.32–2 dólares por hora) + N4 "La imagen que se llena" (cuadrícula de fotos que se van etiquetando con cuadritos).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve en pantalla: el cuadrito «gato» no lo puso una máquina, lo puso una persona.
- **Duración:** voz 947 caracteres / ≈ 165 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base (suma de `OM_SCENES`).
- **Ángulo (distinto del Shot IA #25):** el #25 contó el Turco de ajedrez y la página Mechanical Turk de Amazon. Aquí no se nombra
  esa página: el foco es **el trabajo de etiquetar** (por qué la IA lo necesita, cómo se hace con votos y control de calidad) y
  **quién etiqueta lo feo** (Kenia, 2021–2022).
- **Postura de la serie:** equilibrio. Se reconoce que etiquetar es indispensable y que sirvió para una IA más segura (dicho por
  OpenAI), y se critica con datos la paga y el daño a quienes lo hicieron (TIME 2023). La cifra de la empresa (Sama) va en pantalla.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese cuadrito que dice «gato» no lo puso una máquina: lo puso una persona. | Fondo amarillo. Desde el cuadro 0, una foto dibujada de un gato; un marcador dibuja el cuadrito y aparece la etiqueta «gato». A un lado aparece una persona con audífonos frente a su laptop. |
| 1 | Ejemplos | Así aprenden muchas IA: con miles de ejemplos etiquetados. | Tarjetas «gato» / «no» entran a una `RedNeuronal` que se enciende; chip "miles de ejemplos etiquetados". |
| 2 | ImageNet | En dos mil catorce, el banco ImageNet ya tenía más de catorce millones de imágenes verificadas a mano. | `NumeroGigante` "14,197,122" con chip "verificadas por personas · agosto de 2014"; cuadrícula de 40 miniaturas que se llenan con palomita. |
| 3 | Votos | Varias personas votaban cada foto. Para el gato birmano podían hacer falta cinco. / Y al dibujar cuadritos, a veces confundían foca con nutria marina. | Foto del gato birmano con su cuadrito; cinco personitas con globo ✔ que se suman (chip "votos: 1…5"). Luego dos tarjetas, una foca y una nutria marina, cada una con su cuadrito y la etiqueta cruzada «¿nutria marina?» / «¿foca?» con "?" rojo. |
| 4 | Pregunta | ¿Y quién etiqueta lo horrible? | **Re-gancho.** Fondo se oscurece un poco; "?" gigante; Robert grande, serio. |
| 5 | Kenia | En Nairobi, Kenia, a fines de dos mil veintiuno, unas tres docenas de personas leyeron textos de violencia y odio para OpenAI. | Mapa de África con punto en Nairobi; escritorios con ~36 personitas (3 equipos) frente a pantallas con textos tachados/pixelados (nunca se muestra contenido real). Chip "vía Sama, empresa contratista". |
| 6 | Detector | Según OpenAI, eso ayudó a crear un detector de contenido tóxico que terminó en ChatGPT. | Fondo de circuito ("por dentro de la máquina"): un filtro/escudo frente a un `CelularChat` que bloquea un mensaje rojo. |
| 7 | Paga | TIME lo reveló en dos mil veintitrés: ganaban de uno treinta y dos a dos dólares por hora. | `TarjetaEstudio` "2023 · revista TIME · Billy Perrigo · 18 ene 2023"; número grande "1.32–2 dólares por hora" (sueldo neto, según TIME) y chip "Sama dice: 1.46–3.74 USD/h". |
| 8 | Tortura | Un trabajador lo llamó tortura, y el contrato se cortó ocho meses antes. | Cita «That was torture» en tarjeta; calendario con 8 meses que se tachan (feb 2022). |
| 9 | Balance | OpenAI dice que era necesario para una IA más segura. Ambas cosas pueden ser ciertas. | Balanza: en un plato "IA más segura", en el otro "paga baja y trauma"; queda equilibrada. |
| 10 | Cierre | Cuando tu IA reconozca un gato, acuérdate del cuadrito: alguien se lo enseñó. | **Regreso a la imagen del inicio:** la misma foto del gato con su cuadrito; ahora la persona detrás aparece completa y saluda. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua, sin golpe marcado. Efectos: trazo de marcador al dibujar el cuadrito, clics por cada etiqueta,
tecleo suave al llenarse la cuadrícula, "ding" por cada voto, nota grave y tensa en la pregunta y en Kenia (la cama se tapa un poco),
golpe sordo del escudo bloqueando, monedas apagadas en la paga, tachones del calendario, la balanza que se mece; al final, la cama
se abre (más luminosa) cuando la persona aparece completa.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y quién etiqueta lo horrible?» y en «tortura».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.3 | 11_sorprendido | `gancho` | «no lo puso una máquina: lo puso una persona» (cuadro 0) |
| 2 | 4.8 | 8.3 | 13_senalando_arriba | `arriba-der` | señala los ejemplos que entran a la red |
| 3 | 15.0 | 19.0 | 06_pensativo_menton | `arriba-der` | «varias personas votaban cada foto» |
| 4 | 23.35 | 25.2 | 10_serio_molesto | `grande` | «¿Y quién etiqueta lo horrible?» |
| 5 | 33.7 | 38.0 | 07_pensativo_puno | `izq-alto` | «un detector de contenido tóxico» |
| 6 | 40.8 | 43.5 | 04_bajando_lentes | `arriba-der` | «de uno treinta y dos a dos dólares por hora» |
| 7 | 44.0 | 47.9 | 12_perfil_serio | `grande-izq` | «un trabajador lo llamó tortura» |
| 8 | 48.6 | 53.1 | 06_pensativo_menton | `arriba-der` | «ambas cosas pueden ser ciertas» |
| 9 | 53.6 | 57.9 | 05_sonriendo_dientes_uniformes | `arriba-der` | «alguien se lo enseñó» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 9 · ≈ 33.4 s (+ cierre 3.5 s) · poses distintas 8 (nunca la misma dos veces seguidas) · total 61.5 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Perrigo, B. "Exclusive: OpenAI Used Kenyan Workers on Less Than $2 Per Hour to Make ChatGPT Less Toxic". *TIME*, 18 de enero de 2023.
   https://time.com/6247678/openai-chatgpt-kenya-workers/ (dato de 2021–2022, publicado en 2023).
   > "a take-home wage of between around $1.32 and $2 per hour" (según antigüedad y desempeño)
   > (OpenAI envió) "tens of thousands of snippets of text" (a una empresa de Kenia, a partir de noviembre de 2021)
   > "Around three dozen workers were split into three teams"
   > "feed an AI with labeled examples of violence, hate speech, and sexual abuse"
   > (OpenAI confirmó que los empleados de Sama contribuyeron a) "a tool it was building to detect toxic content, which was eventually built into ChatGPT"
   > Sama: workers "could earn between $1.46 and $3.74 per hour after taxes"
   > "That was torture"
   > Sama canceled the work "in February 2022, eight months earlier than planned"
   > OpenAI: "a necessary step in minimizing the amount of violent and sexual content included in training data"
   > Fotografía: "Sama's office in Nairobi, Kenya"; Sama es "a San Francisco-based firm".
2. Russakovsky, O., Deng, J., Su, H., … Fei-Fei, L. "ImageNet Large Scale Visual Recognition Challenge". *International Journal of
   Computer Vision* 115: 211–252 (2015). arXiv:1409.0575 (PDF abierto y leído). Dato de agosto de 2014.
   > "ImageNet populates 21,841 synsets of WordNet with an average of 650 manually verified and full resolution images. As a result, ImageNet contains 14,197,122 annotated images organized by the semantic hierarchy of WordNet (as of August 2014)."
   > "To collect a highly accurate dataset, we rely on humans to verify each candidate image"
   > "The solution to these issues is to have multiple users independently label the same image. An image is considered positive only if it gets a convincing majority of the votes."
   > "while five users might be necessary for obtaining a good consensus on Burmese cat images, a much smaller number is needed for cat images"
   > "workers were not able to accurately differentiate some object classes during annotation. Some commonly confused labels were seal and sea otter"
3. (Contexto, no se dice en la voz) Ouyang, L. et al. "Training language models to follow instructions with human feedback". arXiv:2203.02155 (2022).
   > "We first hire a team of 40 contractors to label our data"

## Notas
- "Catorce millones" = 14,197,122 imágenes anotadas en ImageNet a agosto de 2014; se dice el año. "Verificadas a mano": el artículo
  dice "manually verified" e "we rely on humans to verify each candidate image".
- "Podían hacer falta cinco" traduce "five users might be necessary" (Burmese cat = gato birmano). Lo de la foca y la nutria marina
  (sea otter) es de cuando dibujaban cuadros para el conjunto de detección del reto ILSVRC (subconjunto de ImageNet), no de los votos:
  por eso la voz dice «al dibujar cuadritos» (corrección del verificador).
- "A fines de dos mil veintiuno": el envío de textos empezó en noviembre de 2021; el trabajo se canceló en febrero de 2022. Se hizo a
  través de Sama (contratista); en la voz se dice "para OpenAI" y en pantalla "vía Sama".
- "De uno treinta y dos a dos dólares por hora" = sueldo neto según TIME (documentos y empleados). Sama dice 1.46–3.74 USD/h: va en
  pantalla para equilibrar. "El contrato se cortó ocho meses antes": Sama canceló en febrero de 2022, ocho meses antes de lo planeado.
- "Violencia y odio": TIME menciona abuso sexual, discurso de odio y violencia; en la voz se resume sin detalles gráficos. En pantalla
  nunca se muestra contenido real: textos pixelados.
- No se nombra Mechanical Turk (ya va en el Shot IA #25). El dibujo es esquemático.
