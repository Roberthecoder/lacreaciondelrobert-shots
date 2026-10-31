# Verificación de hechos · ia-04-huella (Shot IA #04)

Verificación independiente del 28 oct 2026: un verificador que no escribió el guion abrió cada fuente y revisó `guion.md`, `narracion.json` y lo que se ve en pantalla. Este shot es anterior a la regla (27 oct 2026) y está en `.github/verificacion-exentos.txt`; aun así se verificó completo.
Las filas marcadas "(corregida)" cambiaron en el guion y se volvieron a verificar abriendo la fuente el 28 oct 2026.
Fuente de todas las cifras: Meta, Llama 3 `MODEL_CARD.md` (https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md).

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| (corregida) Una sola tarjeta habría tardado "más de setecientos años" (antes: "casi 880 años", ❌: dividía la suma de los dos modelos entre uno solo) | ✅ | Llama 3 MODEL_CARD.md, tabla de emisiones | "Llama 3 70B · 6.4M" horas de GPU → 6,400,000 ÷ 8,766 h/año = 730 años | 2024 |
| (corregida) "Sus dos versiones sumaron 7.7 millones de horas de tarjetas H100" (antes: "Entrenarla sumó 7.7 millones", ⚠️) | ✅ | Llama 3 MODEL_CARD.md | "Pretraining utilized a cumulative 7.7M GPU hours of computation on hardware of type H100-80GB"; tabla: 8B 1.3M, 70B 6.4M | 2024 |
| Llama 3, de Meta, salió en abril de 2024 | ✅ | Llama 3 MODEL_CARD.md | "Model Release Date April 18, 2024" | 2024 |
| Cada tarjeta puede jalar hasta 700 W | ✅ | Llama 3 MODEL_CARD.md | "H100-80GB (TDP of 700W)" | 2024 |
| Unas 2,290 toneladas de CO₂ (de las dos versiones; la pantalla dice "sus 2 versiones") | ✅ | Llama 3 MODEL_CARD.md | "Estimated total emissions were 2290 tCO2eq" | 2024 |
| El modelo grande 1,900 t; el chico 390 t | ✅ | Llama 3 MODEL_CARD.md, tabla | "Llama 3 8B… 390" / "Llama 3 70B… 1900" | 2024 |
| Dice que compensó el 100 % | ✅ | Llama 3 MODEL_CARD.md | "100% of which were offset by Meta's sustainability program" | 2024 |
| Compensar no es no emitir | ✅ | Llama 3 MODEL_CARD.md (explicación del concepto, sin cifras) | "Estimated total emissions were 2290 tCO2eq, 100% of which were offset" (las emisiones ocurrieron y luego se compensaron) | 2024 |
| Leyó más de 15 billones de tokens | ✅ | Llama 3 MODEL_CARD.md | "Llama 3 was pretrained on over 15 trillion tokens" (15 trillion = 15 billones) | 2024 |
| (corregida, cierre) "más de setecientos años de una tarjeta trabajando" | ✅ | mismo cálculo (modelo 70B) | 6,400,000 h ÷ 8,766 h/año = 730.1 años | 2024 |
| Cada pregunta también gasta energía | ✅ | — (sin cifra; la ficha no publica el consumo por pregunta) | Afirmación cualitativa | — |

Notas:
- Las horas son de preentrenamiento ("Pretraining utilized…").
- En pantalla, el calendario llega a 730 y las cifras de 7.7 M h y 2,290 t llevan "sus 2 versiones" para no atribuirlas a un solo modelo.

VEREDICTO: APROBADO
