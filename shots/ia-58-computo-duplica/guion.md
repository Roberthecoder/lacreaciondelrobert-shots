# Shot IA #58 · El vaso que se llena cinco veces más cada año: el cómputo de la IA

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #58 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** FASE A — guion y `narracion.json` escritos, **pendiente de verificación independiente**. Sin animación todavía.
- **Formato:** N4 "La imagen que se llena" (un vaso/matraz de cómputo que se llena ×5 cada año y se desborda) + N2 "El número" (×5 al año, cada 5 meses, ×10 000).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: "Esto no es un vaso de agua: es el cómputo para entrenar las IA más grandes."
- **Duración:** voz 964 caracteres (≈ 58.3 s estimados) + cierre 3.5 s → **61.8 s** en la base (`estimar-escenas.mjs`).
- **Postura de la serie:** ni hype ni miedo: el dato del crecimiento (impresionante) y lo que implica (costo y electricidad), solo con cifras de Epoch AI e Intel. No se mezcla con la energía por pregunta (eso fue ia-17).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es un vaso de agua: es el cómputo para entrenar las IA más grandes. Y cada año necesita unas cinco veces más que el anterior. | Fondo cian; desde el cuadro 0 un vaso con "agua" azul que se vuelve de cuadritos de chip brillantes (cómputo). Cada "año" el vaso se queda chico y aparece uno 5 veces más grande al lado. Número "×5 / año". |
| 1 | Moore | Los chips avanzaban al ritmo de la ley de Moore: el doble de transistores cada dos años. | Un chip con cuadritos (transistores) que se duplican con un "tic" cada 2 años; contador de años lento. Etiqueta "Ley de Moore · ×2 cada 2 años (Moore, 1975)". |
| 2 | Duplica | Pero el cómputo para entrenar estas IA se duplica más o menos cada cinco meses. | Dos relojes/carriles en carrera: Moore "cada 24 meses" contra IA "cada ~5 meses"; el vaso de IA se llena 4–5 veces mientras el de Moore apenas una. |
| 3 | Estudio | Lo mostró el equipo de Epoch AI en 2022, en un congreso en Italia: antes de 2010, ese cómputo seguía el ritmo de Moore. Después, se disparó. | Tarjeta "2022 · Epoch AI · Sevilla, Heim, Ho, Besiroglu, Hobbhahn y Villalobos · IJCNN, Padua (Italia)". Gráfica esquemática con escala logarítmica: línea suave hasta 2010 ("~cada 20 meses") que luego se empina ("~cada 6 meses"). |
| 4 | DiezMil | Y desde 2020, el de los modelos de lenguaje más grandes creció unas diez mil veces. | Cuadrícula de 100 × 100 cuadritos: 1 cuadrito "2020" y se llenan los 10 000. Número gigante "×10 000". |
| 5 | Pregunta | ¿Y de dónde sale tanto cómputo, si los chips no mejoran tan rápido? | **Re-gancho.** "?" gigante; Robert grande. |
| 6 | Fuentes | De tres lados: más chips trabajando a la vez, entrenamientos más largos y procesadores más potentes. | Tres llaves que llenan el vaso: "más chips a la vez" (fila de chips), "más tiempo" (reloj), "chips más potentes" (chip con rayo). |
| 7 | Costo | Por eso entrenarlas cuesta unas tres veces y media más cada año. | Monedas/billetes que caen en una alcancía-vaso; chip "costo ×3.5 / año (desde 2020)". |
| 8 | Energia | Y los centros de datos de IA más grandes ya se acercan a un gigavatio: la luz de casi un millón de casas en Estados Unidos. | Un centro de datos conectado a un enchufe gigante; a su alrededor se prenden casitas hasta "≈ 1 000 000 de casas (EE. UU.)". Chip "≈ 1 GW". |
| 9 | Cierre | Así que ese vaso no se llena solo: cada vez que crece, alguien paga la cuenta y la luz. | **Regreso a la imagen del inicio**: el mismo vaso, ahora desbordado, con un recibo de luz y una moneda pegados. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua que sube medio tono con cada "×5"; un "glug" cada vez que el vaso se llena, "tic" lento para Moore y "tic-tic-tic" rápido para la IA, tecleo suave en la cuadrícula de 10 000, monedas en el costo, un zumbido eléctrico y "clic" de focos al prenderse las casas.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Epoch AI, tablero "Trends in AI" (https://epoch.ai/trends), **actualizado el 5 feb 2026** (dato más nuevo disponible).
   > "Training compute for frontier language models has been growing at 5× per year since 2020."
   > "Training compute for frontier language models has been doubling every 5.2 months since 2020." (IC 90 %: "4.6 to 6.0 months"; "4× to 6×")
   > "The amount of compute used to train frontier language models has grown exponentially. Since 2020, the trend among top-5 models has grown by a factor of ~10,000."
   > "This massive scale-up in training compute comes from three sources: deploying more chips in parallel, training for longer, and leveraging increasingly powerful and cost-effective AI processors. The consequences are striking. Training costs are climbing by 3.5× annually. Today's largest AI data centers are approaching a gigawatt of power capacity — enough to power roughly a million US homes."
   > "The cost to train frontier language models has increased by 3.5×/year since 2020."
   > "AI chip performance per dollar has grown by 49% per year since 2023." (apoya "los chips no mejoran tan rápido")
2. Sevilla, J. y Roldán, E. "Training compute of frontier AI models grows by 4-5x per year". Epoch AI, 28 may 2024. https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year
   > "compute growth in recent years is currently best described as increasing by a factor of 4-5x/year."
   > Modelos de frontera (top 10): "increasing at 5.3x/year (90% CI: 4.9x to 5.7x) between 2010 and May 2024."
3. Sevilla, J., Heim, L., Ho, A., Besiroglu, T., Hobbhahn, M. y Villalobos, P. "Compute Trends Across Three Eras of Machine Learning". arXiv:2202.05924 (feb 2022); *2022 International Joint Conference on Neural Networks (IJCNN), Padua, Italy, 2022*, pp. 1-8. DOI 10.1109/IJCNN55064.2022.9891914.
   > "We show that before 2010 training compute grew in line with Moore's law, doubling roughly every 20 months. Since the advent of Deep Learning in the early 2010s, the scaling of training compute has accelerated, doubling approximately every 6 months."
4. Intel Newsroom, "Moore's Law" (https://www.intel.com/content/www/us/en/newsroom/resources/moores-law.html).
   > "Intel co-founder Gordon Moore predicted a doubling of transistors every year for the next 10 years…"
   > "Ten years later, in 1975, Moore revised this to doubling every two years."

## Notas
- "Las IA más grandes" = modelos de lenguaje de frontera (Epoch, tablero 2026: ×5 al año desde 2020). El informe de 2024 da 4–5× al año; "unas cinco veces" queda dentro de ambos.
- "Más o menos cada cinco meses" = 5.2 meses (IC 90 %: 4.6–6.0), desde 2020.
- "Unas diez mil veces" = factor ~10 000 de la tendencia del top 5 desde 2020 (Epoch, actualizado feb 2026).
- "Tres veces y media" = 3.5× al año desde 2020 en el costo de entrenar modelos de lenguaje de frontera.
- "Casi un millón de casas" = "roughly a million US homes"; "se acercan a un gigavatio" = "approaching a gigawatt of power capacity" (capacidad de potencia, no consumo de un entrenamiento).
- "Los chips no mejoran tan rápido": rendimiento por dólar de chips de IA +49 %/año desde 2023 (Epoch), muy por debajo de ×5.
- El estudio de Sevilla et al. es de 2022 y se dice. Ley de Moore: transistores, revisión de 1975 (Intel).
- La gráfica, el vaso y la cuadrícula son esquemáticos; el vaso no está a escala real.
