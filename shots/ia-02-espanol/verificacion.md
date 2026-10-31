# Verificación de hechos · ia-02-espanol (Shot IA #02)

Verificación independiente del 28 oct 2026: un verificador que no escribió el guion abrió cada fuente y revisó `guion.md`, `narracion.json` y lo que se ve en pantalla. Este shot es anterior a la regla (27 oct 2026) y está en `.github/verificacion-exentos.txt`; aun así se verificó completo. Resultado: pasa sin cambios (la voz aprobada se queda).

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Inglés: casi 93 de cada 100 palabras (92.6 %) | ✅ | OpenAI, gpt-3 `dataset_statistics/languages_by_word_count.csv` | "en,181014683608,92.64708%" | 2020 |
| Francés casi 2 (1.8 %), alemán 1.5 % | ✅ | mismo CSV | "fr,…1.81853%"; "de,…1.46937%" | 2020 |
| Español: ni un cuadrito, 0.77 % | ✅ | mismo CSV | "es,1510070974,0.77289%" | 2020 |
| Más de 1,500 millones de palabras en español | ✅ | mismo CSV | "es,1510070974" | 2020 |
| De inglés, 181 mil millones: casi 120 veces más | ✅ | mismo CSV (cálculo) | 181,014,683,608 ÷ 1,510,070,974 = 119.9 | 2020 |
| Otros idiomas: el resto, ~3.3 % | ✅ | mismo CSV (total 195,380,885,914 palabras) | suma del resto de idiomas | 2020 |
| El texto salió de internet y de libros | ✅ | OpenAI, gpt-3 `model-card.md` | "composed of text posted to the internet, or of text uploaded to the internet (e.g., books)" | sep 2020 |
| Representa más a la gente conectada, sobre todo a EE. UU. | ✅ | `model-card.md` | "more representative of internet-connected populations… mostly U.S.-centric" | sep 2020 |
| Las comunidades con menos internet quedan subrepresentadas | ✅ | `model-card.md` | "the dataset underrepresents less connected communities" | sep 2020 |

Notas:
- El CSV cuenta palabras del conjunto de datos de entrenamiento ("training dataset mix"); decir "todo lo que leyó" es una simplificación aceptable.
- Son datos de GPT-3 (2020), no de los chatbots de hoy; la descripción lo dice.

VEREDICTO: APROBADO
