# Verificación de hechos · Shot IA #24 · Tu cerebro piensa con 20 watts; una tarjeta de IA, con 700

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Fuentes abiertas en el original (PNAS vía Europe PMC, NVIDIA, Intel, Scientific American, PDF de arXiv).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Tu cerebro gasta unos 20 watts (pantalla "≈ 20 W") | ✅ | Balasubramanian, "Brain power", *PNAS* 118(32): e2107022118 | "the 17 W to 20 W derived from glucose uptake in the brain" | 2021 |
| 2 | "Lo de un foco" (foco con etiqueta "20 W") | ✅ (comparación de potencia; existen focos de 20 W) | — (comparación del canal) | — | — |
| 3 | Pesa como el 2 % de tu cuerpo (pantalla "2 % del peso") | ✅ | Balasubramanian, *PNAS* 2021 | "The human brain is just 2% of the body's weight" | 2021 |
| 4 | Se lleva una quinta parte de tu energía (pantalla "20 % de la energía") | ✅ | Balasubramanian, *PNAS* 2021 | "but 20% of its metabolic load" | 2021 |
| 5 | Unas 86 mil millones de neuronas (contador "≈ 86 000 000 000") | ✅ (promedio en hombres adultos; se dice "unas"; dato anatómico, no cambia con el tiempo) | Azevedo et al., *J. Comp. Neurol.* 513(5): 532–541 | "adult male human brain contains on average 86.1 +/- 8.1 billion NeuN-positive cells (\"neurons\")" | 2009 |
| 6 | Lo del 10 % es mito; en un día lo usas casi todo | ✅ ("casi todo" es más prudente que la fuente) | Boyd, *Scientific American*, 7 feb 2008 | Henley (Clínica Mayo): "Evidence would show over a day you use 100 percent of the brain." · Gordon (Johns Hopkins): "we use virtually every part of the brain" | 2008 |
| 7 | La tarjeta H100 SXM puede jalar hasta 700 W (pantalla "H100 SXM · hasta 700 W") | ✅ (es el máximo de diseño, bien dicho con "hasta") | NVIDIA, ficha H100 | "Max Thermal Design Power (TDP) — H100 SXM: Up to 700W (configurable)" | ficha vigente 2026 |
| 8 | 700 W = unos 35 cerebros | ✅ (cuenta: 700 ÷ 20 = 35) | Cálculo con #1 y #7 | — | — |
| 9 | Para entrenar Llama 3 (Meta) usaron hasta 16 mil tarjetas juntas (chip "Llama 3 405B · 2024", "16 000 tarjetas H100") | ✅ en el dato · ⚠️ en la forma: el dato es de jul 2024 (más de 2 años) y la voz no dice el año (solo el chip) | Llama Team, AI @ Meta, "The Llama 3 Herd of Models", arXiv:2407.21783, §3.3.1 | "Llama 3 405B is trained on up to 16K H100 GPUs, each running at 700W TDP with 80GB HBM3" | 2024 |
| 10 | No se comparan uno a uno; la tarjeta hace otro trabajo y tu cerebro no es una computadora digital | ✅ (matiz conceptual aceptado; Balasubramanian compara el cerebro con computadoras solo en eficiencia y lo describe como sistema de procesos biofísicos) | Balasubramanian, *PNAS* 2021 | "the brain outperforms the typical laptop computer by nearly an order of magnitude" (comparación solo de eficiencia) | 2021 |
| 11 | En 2021, en la Universidad de Virginia, estimaron… (tarjeta "Levy y Calvert · PNAS") | ✅ | Levy y Calvert, *PNAS* 118(18): e2008173118 (afiliaciones) | "Department of Neurosurgery, University of Virginia, Charlottesville" (Levy); "College of Arts and Sciences, University of Virginia" (Calvert) | 2021 |
| 12 | En tu corteza calcular cuesta una décima de watt (pantalla "0.1 W") | ✅ (es ATP, estimación con modelo: bien dicho "estimaron" y chip "estimación teórica") | Levy y Calvert, *PNAS* 2021, resumen | "the fraction partitioned to cortical computation is only 0.1 W of ATP" | 2021 |
| 13 | Mandar señales lejos cuesta 35 veces más (pantalla "3.5 W", "×35") | ✅ | Levy y Calvert, *PNAS* 2021, resumen | "long-distance communication costs are 35-fold greater, 3.5 W." | 2021 |
| 14 | Intel hizo una máquina inspirada en el cerebro (Hala Point, prototipo de investigación) | ✅ en el dato · ⚠️ en la forma: abr 2024 (más de 2 años) y la voz no dice el año (solo la pantalla) | Intel Newsroom, 17 abr 2024 | "brain-inspired artificial intelligence (AI)" · "a research prototype" | 2024 |
| 15 | 1 150 millones de neuronas artificiales | ✅ | Intel Newsroom, 17 abr 2024 | "The system supports up to 1.15 billion neurons and 128 billion synapses" | 2024 |
| 16 | Hasta 2 600 watts | ✅ | Intel Newsroom, 17 abr 2024 | "consuming a maximum of 2,600 watts of power" | 2024 |
| 17 | Caja del tamaño de un microondas (lo que se ve) | ✅ | Intel Newsroom, 17 abr 2024 | "the size of a microwave oven" | 2024 |
| 18 | Tu foquito de 20 W aún le da clases de ahorro a las máquinas | ✅ como opinión del canal, apoyada en #1, #7, #16 y #10 (no se presenta como medición) | — | — | — |

Notas de revisión:
- Cada cifra dice de qué es. No se mezclan cifras de una fuente con el enlace de otra (verificado fuente por fuente).
- Raichle y Gusnard 2002 no se necesita: el 2 % / 20 % está textual en Balasubramanian 2021.
- Dato más nuevo que conviene conocer (no contradice el guion): en agosto de 2025 Zhejiang University/Zhejiang Lab presentaron "Darwin Monkey" (~2 000 millones de neuronas artificiales, ~2 000 W), que superó a Hala Point como el sistema neuromórfico más grande. El guion NO dice "la más grande", así que sigue siendo correcto; no agregar "la más grande" en pantalla ni en textos de publicación.
- La H100 ya no es la tarjeta más potente (hay modelos más nuevos que gastan más), pero el guion habla de "esta tarjeta" con su ficha: correcto.

## Correcciones necesarias

1. **⚠️ #9 (Llama 3, dato de 2024, más de 2 años):** la voz no dice el año. Propuesta: "Y en 2024, para entrenar Llama 3, de Meta, usaron hasta dieciséis mil juntas." (+2 palabras; el chip "2024" ya está en pantalla).
2. **⚠️ #14 (Hala Point, dato de abr 2024, más de 2 años):** la voz no dice el año. Propuesta: "En 2024, Intel hizo una máquina inspirada en el cerebro: mil ciento cincuenta millones de neuronas artificiales y hasta dos mil seiscientos watts." (+2 palabras). Si hace falta recortar para quedar en 61–62 s, se puede quitar "de Meta" en la escena 5.

Todo lo demás está ✅.
