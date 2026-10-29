# Verificación de hechos · Shot IA #50 · Detrás de tu IA hay personas etiquetando

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion).
- Fuentes abiertas: TIME (Perrigo, 18 ene 2023) https://time.com/6247678/openai-chatgpt-kenya-workers/ (página completa leída) y
  Russakovsky et al., IJCV 115:211–252 (2015), PDF de arXiv:1409.0575 descargado y leído (texto completo).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | «Ese cuadrito que dice "gato" no lo puso una máquina: lo puso una persona» (gancho, sobre la imagen en pantalla) | ✅ (como ejemplo ilustrativo de un dataset anotado por humanos, p. ej. ImageNet/ILSVRC) | Russakovsky et al. 2015 | "we rely on humans to verify each candidate image" | 2015 |
| 2 | Muchas IA aprenden a ver con miles de ejemplos etiquetados hasta hallar el patrón | ✅ (afirmación general sobre aprendizaje supervisado; "miles" se queda corto, no exagera) | Russakovsky et al. 2015 | "ILSVRC uses a subset of ImageNet images for training the algorithms" | 2015 |
| 3 | En 2014 ImageNet tenía más de 14 millones de imágenes verificadas a mano | ✅ | Russakovsky et al. 2015 | "an average of 650 manually verified and full resolution images. As a result, ImageNet contains 14,197,122 annotated images … (as of August 2014)" | 2014 |
| 4 | Pantalla: "14,197,122" · chip "imágenes · ImageNet · 2014" | ✅ | Russakovsky et al. 2015 | (misma frase que #3) | 2014 |
| 5 | Varias personas votaban cada foto | ✅ | Russakovsky et al. 2015 | "have multiple users independently label the same image. An image is considered positive only if it gets a convincing majority of the votes" | 2015 |
| 6 | Para el gato birmano podían hacer falta cinco (personas) | ✅ | Russakovsky et al. 2015 | "five users might be necessary for obtaining a good consensus on Burmese cat images, a much smaller number is needed for cat images" | 2015 |
| 7 | «Y a veces confundían foca con nutria» (dicho justo tras las votaciones de ImageNet) | ⚠️ imprecisa: la confusión se reporta al **dibujar cuadros (bounding boxes) para el conjunto de detección del reto ILSVRC**, no en las votaciones de ImageNet; y es *sea otter* = nutria marina | Russakovsky et al. 2015, Apéndice E | "workers were not able to accurately differentiate some object classes during annotation. Some commonly confused labels were seal and sea otter" | 2015 |
| 8 | En Nairobi, Kenia, personas leyeron textos para OpenAI | ✅ (OpenAI firmó los contratos con Sama; oficina de Sama en Nairobi) | TIME 2023 | "OpenAI sent tens of thousands of snippets of text to an outsourcing firm in Kenya"; pie de foto "Sama's office in Nairobi, Kenya"; "The contracts stated that OpenAI would pay an hourly rate of $12.50 to Sama" | 2021–2022 (publ. 2023) |
| 9 | «A fines de 2021» | ✅ (empezó en noviembre de 2021; siguió hasta feb 2022 — la frase no dice que terminó en 2021) | TIME 2023 | "beginning in November 2021" | 2021 |
| 10 | Unas tres docenas de personas | ✅ | TIME 2023 | "Around three dozen workers were split into three teams" | 2021–2022 |
| 11 | Textos de violencia y odio | ✅ (resumen sin detalle gráfico; TIME incluye también abuso sexual) | TIME 2023 | "feed an AI with labeled examples of violence, hate speech, and sexual abuse" | 2021–2022 |
| 12 | Pantalla: chip "vía Sama, empresa contratista" | ✅ | TIME 2023 | "OpenAI's outsourcing partner in Kenya was Sama"; "a San Francisco-based firm that employs workers in Kenya, Uganda and India" | 2023 |
| 13 | Pantalla: ~36 personitas en 3 equipos | ✅ | TIME 2023 | "Around three dozen workers were split into three teams" | 2021–2022 |
| 14 | Según OpenAI, eso ayudó a crear un detector de contenido tóxico que terminó en ChatGPT | ✅ (atribuido a OpenAI, correcto) | TIME 2023 | OpenAI confirmó que empleados de Sama "contributed to a tool it was building to detect toxic content, which was eventually built into ChatGPT" | 2023 |
| 15 | TIME lo reveló en 2023 | ✅ | TIME 2023 | Publicado el 18 ene 2023, por Billy Perrigo | 2023 |
| 16 | Ganaban de 1.32 a 2 dólares por hora | ✅ (sueldo neto, según antigüedad y desempeño; el tiempo pasado ancla el dato a 2021–2022) | TIME 2023 | "a take-home wage of between around $1.32 and $2 per hour" | 2021–2022 |
| 17 | Pantalla: "Sama dice: 1.46–3.74 USD/h" | ✅ (ambas cifras son netas: comparación justa) | TIME 2023 | Sama: workers "could earn between $1.46 and $3.74 per hour after taxes" | 2023 |
| 18 | Pantalla: TarjetaEstudio "TIME · 18 ene 2023 · Billy Perrigo" | ✅ | TIME 2023 | Fecha y firma de la nota | 2023 |
| 19 | Un trabajador lo llamó tortura (cita «That was torture») | ✅ (un trabajador de Sama que leía textos para OpenAI, sobre lo que leyó) | TIME 2023 | "'That was torture,' he said." | 2023 |
| 20 | El contrato se cortó ocho meses antes / pantalla "feb 2022" | ✅ (lo canceló Sama) | TIME 2023 | "Sama had canceled all its work for OpenAI—eight months earlier than agreed in the contracts"; "in February 2022" | 2022 |
| 21 | OpenAI dice que era necesario para una IA más segura | ✅ (paráfrasis fiel) | TIME 2023 | OpenAI: "Classifying and filtering harmful [text and images] is a necessary step in minimizing the amount of violent and sexual content included in training data"; "we work hard to build safe and useful AI systems" | 2023 |
| 22 | Pantalla: balanza "paga baja y trauma" | ✅ | TIME 2023 | "All of the four employees interviewed by TIME described being mentally scarred by the work." | 2023 |
| 23 | Cierre: «alguien se lo enseñó» | ✅ (cierre retórico coherente con #1–#6) | — | — | — |

**Conteo:** 22 ✅ · 1 ⚠️ · 0 ❌

Comprobaciones extra: cada cifra dice de qué es (imágenes de ImageNet, personas, dólares por hora, meses); los datos de más de 2 años
dicen su año en voz (2014, 2021, 2023); no se mezclan cifras con enlaces de otra fuente (todo lo de Kenia es TIME; todo lo de ImageNet
es el artículo de IJCV); no encontré un conteo más nuevo de ImageNet que contradiga, y el guion lo ancla a 2014.

## Correcciones necesarias

1. **#7 foca/nutria (⚠️):** el artículo lo cuenta al anotar cuadros del conjunto de detección del reto ILSVRC (que sale de ImageNet), no en
   las votaciones. Propuesta (además encaja con el "cuadrito" del gancho):
   - Voz: «Y al dibujar cuadritos, a veces confundían foca con nutria marina.»
   - Pantalla: tarjetas «foca» vs «nutria marina», cada una con su cuadrito.
   Si se quiere conservar la frase corta, al menos dejarla separada de los votos («Y al etiquetar, a veces confundían foca con nutria»)
   y que en pantalla sea con cuadritos, no con manitas de voto.
