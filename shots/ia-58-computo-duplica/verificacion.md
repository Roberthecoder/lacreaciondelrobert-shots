# Verificación de hechos · Shot IA #58 · El vaso que se llena cinco veces más cada año: el cómputo de la IA

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).** Revisé `guion.md` (voz y columna "Lo que se ve") y `narracion.json`. Todavía no hay `.jsx`.
- Páginas abiertas: epoch.ai/trends (actualizada el 5 feb 2026), arxiv.org/abs/2202.05924, intel.com (Moore's Law), epoch.ai/data/data-centers (actualizada el 28 oct 2026), eia.gov FAQ 97.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | El cómputo para entrenar "las IA más grandes" crece unas 5 veces cada año (pantalla "×5 / año") | ✅ (siempre que "las IA más grandes" = modelos de lenguaje de frontera, como dice la nota) | Epoch AI, Trends in AI, https://epoch.ai/trends | "Training compute for frontier language models has been growing at 5× per year since 2020." (IC 90 %: 4× a 6×) | 2026 (desde 2020) |
| 2 | Ley de Moore: el doble de transistores cada dos años (pantalla "Moore, 1975") | ✅ | Intel Newsroom, Moore's Law | "Ten years later, in 1975, Moore revised this to doubling every two years." | 1975 |
| 3 | "Los chips avanzaban al ritmo de la ley de Moore" | ✅ (formulación general, aceptable) | Intel Newsroom | Ley de Moore como ritmo histórico de transistores | 1975 |
| 4 | El cómputo de estas IA se duplica más o menos cada 5 meses (pantalla "cada ~5 meses" vs "cada 24 meses") | ✅ | Epoch AI, Trends | "Training compute for frontier language models has been doubling every 5.2 months since 2020." (IC 90 %: 4.6 a 6.0 meses) | 2026 (desde 2020) |
| 5 | Lo mostró el equipo de Epoch AI en 2022, en un congreso en Italia (IJCNN, Padua); autores Sevilla, Heim, Ho, Besiroglu, Hobbhahn y Villalobos | ✅ | arXiv:2202.05924; journal-ref | "2022 International Joint Conference on Neural Networks (IJCNN), Padua, Italy, 2022, pp. 1-8" · DOI 10.1109/IJCNN55064.2022.9891914 | 2022 |
| 6 | Antes de 2010 ese cómputo seguía el ritmo de Moore; después se disparó (gráfica "~cada 20 meses" → "~cada 6 meses") | ✅ | Sevilla et al. 2022, resumen | "before 2010 training compute grew in line with Moore's law, doubling roughly every 20 months." · "…accelerated, doubling approximately every 6 months." | 2022 |
| 7 | Desde 2020, el cómputo de los modelos de lenguaje más grandes creció unas 10 000 veces (pantalla "×10 000") | ✅ (es la tendencia del top 5, no un modelo concreto; coherente con 5×/año durante ~6 años) | Epoch AI, Trends | "Since 2020, the trend among top-5 models has grown by a factor of ~10,000." | 2026 |
| 8 | "Los chips no mejoran tan rápido" (como el ×5) | ✅ | Epoch AI, Trends | "AI chip performance per dollar has grown by 49% per year since 2023." | 2026 |
| 9 | Tres fuentes: más chips a la vez, entrenamientos más largos, procesadores más potentes | ✅ | Epoch AI, Trends | "comes from three sources: deploying more chips in parallel, training for longer, and leveraging increasingly powerful and cost-effective AI processors" | 2026 |
| 10 | "Por eso" entrenarlas cuesta unas 3.5 veces más cada año (pantalla "costo ×3.5 / año (desde 2020)") | ✅ (Epoch lo presenta como consecuencia: "The consequences are striking") | Epoch AI, Trends | "Training costs are climbing by 3.5× annually." · "The cost to train frontier language models has increased by 3.5×/year since 2020." | 2026 (desde 2020) |
| 11 | Los centros de datos de IA más grandes "ya se acercan" a un gigavatio (pantalla "≈ 1 GW") | ⚠️ desactualizado: la frase de Epoch es de feb 2026; su tablero de centros de datos (28 oct 2026) ya registra uno por encima de 1 GW | Epoch AI, Frontier Data Centers, https://epoch.ai/data/data-centers | "Anthropic-Amazon New Carlisle, owned by Amazon in New Carlisle, IN, drawing 1,037 MW." (el más grande; el siguiente, Colossus 2, 946 MW) | 2026 |
| 12 | 1 gigavatio = la luz de "casi un millón" de casas en EE. UU. (pantalla "≈ 1 000 000 de casas") | ⚠️ algo inflado: Epoch dice "roughly a million", pero con el promedio de la EIA da ~810 000 casas (1 GW × 8 760 h ÷ 10 791 kWh) | Epoch AI, Trends; EIA FAQ 97 | Epoch: "enough to power roughly a million US homes." · EIA: "10,791 kilowatthours (kWh)" por cliente residencial al año | 2026 / 2022 |
| 13 | El vaso, la gráfica y la cuadrícula son esquemáticos | ✅ (lo dice el guion; mantener la leyenda "esquemático" en publicacion.md) | — | — | — |

Notas menores (no bloquean):
- Escena 2 compara 24 meses (Moore) con ~5 meses (desde 2020), y la escena 3 muestra "~cada 20 meses" y "~cada 6 meses" (2022). Son cifras de periodos y fuentes distintas, pero cada una está bien atribuida; conviene que en pantalla el "~cada 6 meses" lleve "(2010–2022)" y el "~5 meses" lleve "(desde 2020)" para que no parezca contradicción.
- Epoch AI se fundó formalmente en 2022 y el artículo es de su equipo: "el equipo de Epoch AI" es correcto.

## Correcciones necesarias

1. **#11 (gigavatio):** cambiar "ya se acercan a un gigavatio" por algo vigente a oct 2026.
   Propuesta de voz: "Y el centro de datos de IA más grande ya pasa de un gigavatio: la luz de unas ochocientas mil casas en Estados Unidos."
   Pantalla: chip "> 1 GW (2026)". Fuente: epoch.ai/data/data-centers (1,037 MW, actualizado 28 oct 2026).
2. **#12 (casas):** cambiar "casi un millón de casas" por "unas ochocientas mil casas" (cálculo con EIA 2022: 10 791 kWh/año por hogar → ~810 000 hogares por GW continuo). Pantalla: "≈ 800 000 casas (EE. UU.)". Si se prefiere conservar la frase de Epoch, decir "cerca de un millón", pero "unas ochocientas mil" es más exacto. Ojo: al cambiar el texto, revisar que la voz siga cuadrando en 61–62 s.
