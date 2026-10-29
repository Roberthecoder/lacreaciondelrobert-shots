# Shot IA #58 · El vaso que se llena cinco veces más cada año: el cómputo de la IA

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #58 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (11 ✅ · 2 ⚠️ corregidas: «ya se acercan a un gigawatt» → «ya rondan un gigavatio» con el dato de oct 2026, y «casi un millón de casas» → «unas ochocientas mil casas» con el promedio de la EIA) · animación, Robert en pantalla y `publicacion.md` listos · revisión de cuadros en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~961 créditos).
- **Formato:** N4 "La imagen que se llena" (un vaso/matraz de cómputo que se llena ×5 cada año y se desborda) + N2 "El número" (×5 al año, cada 5 meses, ×10 000).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: "Esto no es un vaso de agua: es el cómputo para entrenar las IA más grandes."
- **Duración:** voz 961 caracteres (≈ 58.2 s estimados) + cierre 3.5 s → **61.7 s** en la base (`estimar-escenas.mjs`).
- **Postura de la serie:** ni hype ni miedo: el dato del crecimiento (impresionante) y lo que implica (costo y electricidad), solo con cifras de Epoch AI, Intel y la EIA. No se mezcla con la energía por pregunta (eso fue ia-17).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es un vaso de agua: es el cómputo para entrenar las IA más grandes. Y cada año necesita unas cinco veces más que el anterior. | Fondo cian; desde el cuadro 0 un vaso con "agua" azul que en el primer segundo se vuelve de cuadritos de chip brillantes (cómputo). Se llena, se desborda y aparece al lado un vaso con 5 veces más volumen ("1 año después") que se llena. Número "×5 / año". |
| 1 | Moore | Los chips avanzaban al ritmo de la ley de Moore: el doble de transistores cada dos años. | Un chip con 64 casillas (transistores) que se duplican (1→2→4…→32) mientras un contador avanza de 0 a 10 años. Etiqueta "Ley de Moore (1975)". |
| 2 | Duplica | Pero el cómputo para entrenar estas IA se duplica más o menos cada cinco meses. | Dos carriles que avanzan 24 meses: "Ley de Moore · ×2 cada ~24 meses" (un ×2 al final) contra "Cómputo de las IA más grandes · ×2 cada ~5 meses (desde 2020)" (un ×2 cada 5.2 meses). |
| 3 | Estudio | Lo mostró el equipo de Epoch AI en 2022, en un congreso en Italia: antes de 2010, ese cómputo seguía el ritmo de Moore. Después, se disparó. | Tarjeta "2022 · Epoch AI · Sevilla, Heim, Ho, Besiroglu, Hobbhahn y Villalobos · IJCNN, Padua (Italia)". Gráfica esquemática con escala logarítmica: línea suave hasta 2010 ("~cada 20 meses (antes de 2010)") que luego se empina ("~cada 6 meses (2010–2022)"). |
| 4 | DiezMil | Y desde 2020, el de los modelos de lenguaje más grandes creció unas diez mil veces. | Fondo de circuito ("por dentro de la máquina"). Cuadrícula de 100 × 100: un cuadrito amarillo "■ = cómputo de 2020" y se llenan los 10 000. Chip "tendencia de los modelos más grandes"; número gigante "×10,000". |
| 5 | Pregunta | ¿Y de dónde sale tanto cómputo, si los chips no mejoran tan rápido? | **Re-gancho.** "?" gigante; Robert grande. Chip "chips de IA: +49 % por dólar al año". |
| 6 | Fuentes | De tres lados: más chips trabajando a la vez, entrenamientos más largos y procesadores más potentes. | Tres tubos que llenan un vaso: "más chips a la vez" (fila de chips), "entrenar más tiempo" (reloj), "chips más potentes" (chip con rayo). |
| 7 | Costo | Por eso entrenarlas cuesta unas tres veces y media más cada año. | Monedas que caen en un vaso; número "×3.5" y chip "costo por año (desde 2020)". |
| 8 | Energia | Y los centros de datos de IA más grandes ya rondan un gigavatio: la luz de unas ochocientas mil casas en Estados Unidos. | Un centro de datos con un cable que prende 63 casitas una por una (esquemático). Chips "≈ 1 GW (2026)" y "≈ 800 000 casas (EE. UU.)". |
| 9 | Cierre | Así que ese vaso no se llena solo: cada vez que crece, alguien paga la cuenta y la luz. | **Regreso a la imagen del inicio**: el mismo vaso, ahora desbordado, con un recibo de luz y una moneda; chip "no se llena solo". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua que sube medio tono con cada "×5"; un "glug" cada vez que el vaso se llena, "tic" lento para Moore y "tic-tic-tic" rápido para la IA, tecleo suave en la cuadrícula de 10 000, monedas en el costo, un zumbido eléctrico y "clic" de focos al prenderse las casas.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y de dónde sale tanto cómputo…?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «Esto no es un vaso de agua: es el cómputo…» (cuadro 0) |
| 2 | 8.9 | 13.1 | 06_pensativo_menton | `arriba-der` | «el doble de transistores cada dos años» |
| 3 | 21.7 | 26.2 | 13_senalando_arriba | `izq-alto` | señala la curva: «Después, se disparó» |
| 4 | 29.0 | 31.4 | 04_bajando_lentes | `arriba-der` | «unas diez mil veces» |
| 5 | 31.6 | 36.5 | 07_pensativo_puno | `grande` | «¿Y de dónde sale tanto cómputo…?» |
| 6 | 42.1 | 45.5 | 10_serio_molesto | `izq-alto` | «cuesta unas tres veces y media más cada año» |
| 7 | 48.1 | 52.7 | 11_sorprendido | `izq-alto` | «la luz de unas ochocientas mil casas» |
| 8 | 53.4 | 58.1 | 13_senalando_arriba | `arriba-der` | «alguien paga la cuenta y la luz» |
| — | 58.2 | 61.7 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 8 · ≈ 33.3 s (+ cierre 3.5 s) · poses distintas 6 (nunca la misma dos veces seguidas) · total 61.7 s

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Epoch AI, tablero "Trends in AI" (https://epoch.ai/trends), **actualizado el 5 feb 2026** (dato más nuevo disponible).
   > "Training compute for frontier language models has been growing at 5× per year since 2020."
   > "Training compute for frontier language models has been doubling every 5.2 months since 2020." (IC 90 %: "4.6 to 6.0 months"; "4× to 6×")
   > "The amount of compute used to train frontier language models has grown exponentially. Since 2020, the trend among top-5 models has grown by a factor of ~10,000."
   > "This massive scale-up in training compute comes from three sources: deploying more chips in parallel, training for longer, and leveraging increasingly powerful and cost-effective AI processors. The consequences are striking. Training costs are climbing by 3.5× annually. Today's largest AI data centers are approaching a gigawatt of power capacity — enough to power roughly a million US homes."
   > "The cost to train frontier language models has increased by 3.5×/year since 2020."
   > "AI chip performance per dollar has grown by 49% per year since 2023." (apoya "los chips no mejoran tan rápido")
   > (La frase "approaching a gigawatt… roughly a million US homes" del tablero de feb 2026 ya no se usa: ver fuentes 5 y 6.)
2. Sevilla, J. y Roldán, E. "Training compute of frontier AI models grows by 4-5x per year". Epoch AI, 28 may 2024. https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year
   > "compute growth in recent years is currently best described as increasing by a factor of 4-5x/year."
   > Modelos de frontera (top 10): "increasing at 5.3x/year (90% CI: 4.9x to 5.7x) between 2010 and May 2024."
3. Sevilla, J., Heim, L., Ho, A., Besiroglu, T., Hobbhahn, M. y Villalobos, P. "Compute Trends Across Three Eras of Machine Learning". arXiv:2202.05924 (feb 2022); *2022 International Joint Conference on Neural Networks (IJCNN), Padua, Italy, 2022*, pp. 1-8. DOI 10.1109/IJCNN55064.2022.9891914.
   > "We show that before 2010 training compute grew in line with Moore's law, doubling roughly every 20 months. Since the advent of Deep Learning in the early 2010s, the scaling of training compute has accelerated, doubling approximately every 6 months."
4. Intel Newsroom, "Moore's Law" (https://www.intel.com/content/www/us/en/newsroom/resources/moores-law.html).
   > "Intel co-founder Gordon Moore predicted a doubling of transistors every year for the next 10 years…"
   > "Ten years later, in 1975, Moore revised this to doubling every two years."
5. Epoch AI, "Frontier Data Centers" (https://epoch.ai/data/data-centers), actualizado el 28 oct 2026.
   > "Anthropic-Amazon New Carlisle, owned by Amazon in New Carlisle, IN, drawing 1,037 MW." (el más grande; el siguiente, Colossus 2, 946 MW) → «ya rondan un gigavatio», «≈ 1 GW (2026)».
6. U.S. Energy Information Administration (EIA), FAQ 97 "How much electricity does an American home use?" (dato de 2022).
   > "10,791 kilowatthours (kWh)" por cliente residencial al año → 1 GW × 8 760 h = 8 760 000 000 kWh ÷ 10 791 ≈ 812 000 casas → «unas ochocientas mil casas».

## Notas
- "Las IA más grandes" = modelos de lenguaje de frontera (Epoch, tablero 2026: ×5 al año desde 2020). El informe de 2024 da 4–5× al año; "unas cinco veces" queda dentro de ambos.
- "Más o menos cada cinco meses" = 5.2 meses (IC 90 %: 4.6–6.0), desde 2020.
- "Unas diez mil veces" = factor ~10 000 de la tendencia del top 5 desde 2020 (Epoch, actualizado feb 2026).
- "Tres veces y media" = 3.5× al año desde 2020 en el costo de entrenar modelos de lenguaje de frontera.
- "Ya rondan un gigavatio" = el centro de datos de IA más grande del tablero de Epoch (oct 2026) consume 1,037 MW y el siguiente 946 MW. Es la potencia de todo el centro, no el consumo de un solo entrenamiento.
- "Unas ochocientas mil casas" = 1 GW continuo durante un año ÷ 10,791 kWh por hogar al año (EIA, 2022) ≈ 812 000.
- "Los chips no mejoran tan rápido": rendimiento por dólar de chips de IA +49 %/año desde 2023 (Epoch), muy por debajo de ×5.
- El estudio de Sevilla et al. es de 2022 y se dice. Ley de Moore: transistores, revisión de 1975 (Intel).
- La gráfica, el vaso y la cuadrícula son esquemáticos; el vaso no está a escala real.
