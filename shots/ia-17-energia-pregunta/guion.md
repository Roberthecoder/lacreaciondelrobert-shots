# Shot IA #17 · Tu pregunta a una IA: nueve segundos de tele (y por qué la suma sí importa)

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #17 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N2 "El número" (0.24 Wh = menos de 9 s de tele; 5 gotas) + N4 "La imagen que se llena" (una gota/pregunta que se multiplica hasta llenar un mapa de centros de datos).
- **Gancho (de los 7):** #4 "Un número que contradice": "Hacerle una pregunta a una IA gasta menos energía que ver la tele nueve segundos."
- **Duración:** voz 951 caracteres / ~185 palabras (≈ 58.1 s estimados) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** la defendemos y la criticamos con datos: el dato por pregunta es chico (y bajó mucho), pero es la mediana de texto de UNA empresa, autorreportada; la suma global sí crece. **Diferencia con ia-04:** el ia-04 habló del costo de ENTRENAR (Llama 3); este es el costo de USAR (cada pregunta).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Hacerle una pregunta a una IA gasta menos energía que ver la tele nueve segundos. Y como cinco gotas de agua. | Fondo cian: desde el cuadro 0 un celular con un chat; al enviar la pregunta, un rayito viaja a una tele que se enciende con un cronómetro 0→9 s y se apaga. Del celular caen 5 gotas a un vasito. |
| 1 | Estudio | Lo midió Google en 2025 con su IA, Gemini: cero punto veinticuatro watts hora por pregunta de texto. | `TarjetaEstudio` "2025 · Google · Elsworth et al. · arXiv 2508.15734"; `NumeroGigante` "0.24 Wh" con chips "0.26 mL de agua" y "0.03 g CO₂e". |
| 2 | Incluye | Y eso ya incluye las máquinas en espera y el enfriamiento del centro de datos. | Dentro del centro de datos (fondo de circuito): barra apilada que crece: chips (0.10 Wh) + máquinas en espera, servidor y enfriamiento → 0.24 Wh. |
| 3 | Baja | En un año, la energía de esa pregunta bajó treinta y tres veces. | Gráfica: una barra alta "mayo 2024" que se encoge a "mayo 2025" (÷33). |
| 4 | Pregunta | ¿Entonces la IA no gasta casi nada? | **Re-gancho.** "?" gigante; Robert grande, pensativo. |
| 5 | Ojo | Ojo: es la pregunta típica, la de en medio, solo de texto. Y los números los dio la misma empresa. / Pedir imágenes o videos no entra en esa cuenta. | Fila de preguntas ordenadas de chica a grande; se resalta la de en medio ("mediana"). Chip "autorreportado por Google". Íconos de imagen y video con candado: "fuera de la cuenta". |
| 6 | Suma | Y lo que pesa es la suma: miles de millones de preguntas. | `Cuadricula` que se llena: cada celda una pregunta, y se aleja la cámara hasta que es un mar de puntitos. |
| 7 | AIE | Según la Agencia Internacional de Energía, en 2024 los centros de datos usaron uno punto cinco por ciento de la electricidad del mundo. | Planeta con un enchufe; dona "1.5 % de la electricidad mundial · 2024 · AIE (≈ 415 TWh)". Chip "centros de datos = IA + internet + nube". |
| 8 | Japon | Y calcula que en 2030 será más del doble: más o menos lo que hoy gasta Japón entero. / La IA es una de las grandes razones. | Barra 415 TWh (2024) → 945 TWh (2030, proyección); al lado la silueta de Japón iluminada. Chip "proyección (escenario base)". |
| 9 | Cierre | Así que tu pregunta cuesta nueve segundos de tele. Lo que pesa es que la hacemos miles de millones de veces. | **Regreso a la imagen del inicio**: el mismo celular y la tele de 9 s; la cámara se aleja y aparecen miles de celulares y miles de teles encendidas a la vez. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; "enviar" con un clic, zumbido eléctrico corto en la tele, tic por cada segundo del cronómetro, un "plic" por cada gota, la barra que se encoge baja de tono, tecleo creciente mientras se llena la cuadrícula, zumbido de servidores en el centro de datos.

## Fuentes (abiertas en el original el 29 oct 2026)

1. Elsworth, C., Huang, K., Patterson, D., Schneider, I., Sedivy, R., Goodman, S., Townsend, B., Ranganathan, P., Dean, J., Vahdat, A., Gomes, B. y Manyika, J. "Measuring the environmental impact of delivering AI at Google Scale". arXiv:2508.15734 (enviado el 21 ago 2025). https://arxiv.org/abs/2508.15734 · texto HTML https://arxiv.org/html/2508.15734v1 — dato de **2025** (medido de mayo 2024 a mayo 2025).
   > Resumen: "the median Gemini Apps text prompt consumes 0.24 Wh of energy" … "a 33x reduction in energy consumption"
   > "uses less energy than watching nine seconds of television" · "a modern television consumes approximately 100 watts of electricity"
   > "The water use of 0.26 mL equals five drops of water"
   > "By tracking these metrics from May 2024 to May 2025, we demonstrate a 44x reduction" (44x = carbono; 33x = energía)
   > Sobre la mediana: "the distribution of energy/prompt metrics can be skewed" · "the median is robust to extreme values"
   > Alcance: solo prompts de texto de Gemini Apps; "We leave the measurement of AI model training to future work."
   > "With these AI models now serving billions of user prompts globally"
2. Vahdat, A. y Dean, J. (Google). "Measuring the environmental impact of AI inference", Google Cloud Blog, 21 ago 2025. https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference
   > "we estimate the median Gemini Apps text prompt uses 0.24 watt-hours (Wh) of energy, emits 0.03 grams of carbon dioxide equivalent (gCO2e), and consumes 0.26 milliliters (or about five drops) of water"
   > "The per-prompt energy impact is equivalent to watching TV for less than nine seconds."
   > "over a recent 12 month period, the energy and total carbon footprint of the median Gemini Apps text prompt dropped by 33x and 44x, respectively"
   > "When we apply this non-comprehensive methodology that only considers active TPU and GPU consumption, we estimate the median Gemini text prompt uses 0.10 Wh of energy" … "Our comprehensive methodology's estimates (0.24 Wh …) account for all critical elements of serving AI globally." (el artículo lista: acelerador, sistema anfitrión, capacidad en espera y gastos generales del centro de datos)
3. Agencia Internacional de Energía (AIE/IEA). *Energy and AI* (abril 2025). La página de iea.org bloquea la descarga automática (403); las cifras se tomaron de una publicación de la propia AIE que las repite: *Energy and AI in East Asia* (IEA, versión revisada abril 2026), https://iea.blob.core.windows.net/assets/431d7d22-039e-46d3-9832-090a8b4075fc/EnergyandAIinEastAsia.pdf — dato de **2024**, proyección a 2030.
   > "the publication of the landmark report Energy and AI in April 2025 … Data centres' current share of global electricity consumption is 1.5%. This is projected to more than double by 2030, reaching around 945 TWh or approximately 3% of total global electricity demand."
   > "In the Base Case, the global electricity consumption of data centres more than doubles from around 415 TWh in 2024 to 945 TWh by 2030."
   > "While AI is expected to be a significant driver of electricity demand…"
4. Comparación con Japón (de la AIE, citada por la prensa; **el verificador debe confirmarla en el resumen ejecutivo de la AIE**): Scientific American, 10 abr 2025, https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030
   > "945 terawatt-hours (TWh) in 2030" … "roughly equivalent to the current annual electricity consumption of Japan"
   > "data centres consumed 415 TWh in 2024, roughly 1.5% of the world's total electricity consumption"
   > "servers for AI accounted for 24% of server electricity demand and 15% of total data centre energy demand in 2024."

## Notas
- "Pregunta típica, la de en medio" = **mediana** de los prompts de texto de Gemini Apps (la mitad gasta menos, la mitad más). No es el promedio.
- "Menos que ver la tele nueve segundos" usa la tele de ~100 W del artículo (0.24 Wh ≈ 8.6 s a 100 W).
- "Como cinco gotas" = 0.26 mL (Google: "about five drops").
- "Bajó treinta y tres veces" = energía por pregunta mediana, de mayo 2024 a mayo 2025, según Google (atribuido a eficiencia de software, hardware y uso de máquinas). El 44x es de carbono y no se usa en la voz.
- "Y eso ya incluye las máquinas en espera y el enfriamiento": la metodología completa suma capacidad ociosa y sobrecosto del centro de datos (PUE); solo los chips darían 0.10 Wh.
- "Pedir imágenes o videos no entra en esa cuenta": el estudio es solo de prompts de texto. **No** se afirma cuánto más gastan (no hay cifra verificada), solo que quedan fuera.
- "Los números los dio la misma empresa": el estudio es de autores de Google sobre sus propios sistemas (autorreportado).
- "Miles de millones de preguntas": Google habla de "billions of user prompts globally" (todas las IA, no solo Gemini). No se da una cifra diaria.
- El 1.5 % / 415 TWh es de **todos** los centros de datos (internet, nube, streaming, IA), no solo de la IA; la voz dice "centros de datos" y luego "la IA es una de las grandes razones" (AIE: "a significant driver"). En pantalla se aclara.
- "Más del doble en 2030" = proyección del escenario base de la AIE (945 TWh), no un hecho.
- El ia-04 trató el entrenamiento de Llama 3; aquí no se repite: es el uso.
- El dibujo es esquemático.
