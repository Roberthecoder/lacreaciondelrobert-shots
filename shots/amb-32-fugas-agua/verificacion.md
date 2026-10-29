# Verificación de hechos · amb-32-fugas-agua

Fecha: 29 oct 2026
Verificador: subagente independiente (no escribió el guion)

Nota sobre fuentes oficiales: el 29 oct 2026 volví a intentar `indicadores.cdmx.gob.mx` (HTTP 503 por WebFetch; fallo de certificado/conexión por curl) y `sacmex.cdmx.gob.mx` (el túnel se cierra a media conexión). No se pudieron abrir. Para el porcentaje de la CDMX se usan dos vías independientes que coinciden: (a) declaración de SACMEX recogida por El Universal (37 %) y (b) el indicador del IPDP con datos de SACMEX, citado con la misma redacción por POSTA y ADN40 (42 %). Ambas cifras son del año 2022 y ambas redondean a "unas cuatro de cada diez".

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| De cada diez cubetas que la CDMX mete a sus tubos, unas cuatro nunca llegan a una casa (pérdida por fugas en la red ≈ 37–42 %) | ✅ | SACMEX vía El Universal, 1 sep 2022 — https://www.eluniversal.com.mx/metropoli/sacmex-por-fugas-se-pierde-el-37-del-agua-potable-de-la-cdmx/ ; IPDP (datos de SACMEX) vía POSTA, 14 sep 2026 — https://www.posta.com.mx/cdmx/este-es-el-desperdicio-que-provocan-las-fugas-de-agua-en-cdmx/vl2252854 y ADN40, 18 ago 2026 | "El 37% del agua potable de la Ciudad de México se va en fugas … de acuerdo con el Sistema de Aguas de la Ciudad de México (Sacmex)"; "anteriormente se estimaba que el 40% de agua que llegaba a la capital se iba en fugas, pero tras la medición de las presiones … hoy se encuentra en 37%". POSTA: "el agua potable perdida por fugas en las redes representó aproximadamente 42% durante ese año [2022]". ADN40: "El indicador específico de agua potable perdida por fugas en las redes estimó para 2022, una pérdida de 42%." | 2022 |
| "Así lo calculó la ciudad en 2022: se van en fugas de la red, antes de tu llave" | ✅ | Mismas fuentes (SACMEX e IPDP son dependencias del gobierno de la CDMX) | Ver fila anterior: ambos datos son de 2022 y se refieren a fugas "en las redes". El dato tiene más de 2 años y la voz dice el año. | 2022 |
| Chip en pantalla "CDMX 2022: 37–42 % en fugas de la red" | ✅ | Mismas fuentes | Ídem. (No confundir con el 52.19 % de "agua no contabilizada", que no se usa.) | 2022 |
| El Sistema de Aguas culpa al desgaste de los tubos y al exceso de presión | ✅ | SACMEX (Dirección de Detección y Atención a Fugas de Agua) vía La Razón, 17 may 2021 — https://www.razon.com.mx/ciudad/registran-32-fugas-agua-dia-sitio-434935/ | "los principales motivos por los que ocurren las fugas de agua potable son sobrepresión en las tuberías, desgaste natural y accesorios hidráulicos colocados en ellas, movimientos diferenciales de terreno, grietas, cambio de tuberías y tránsito vehicular." | 2021 |
| El suelo se mueve de forma dispareja y los tubos se agrietan | ✅ | Misma nota de La Razón | "movimientos diferenciales de terreno, grietas" | 2021 |
| En 2025, Jalisco calculó que una cuarta parte del agua [de Guadalajara] no llega a su destino: fugas, evaporación y fallas | ⚠️ imprecisa | Gobierno de Jalisco (Karina Hermosillo) vía El Informador, 5 jun 2025 — https://www.informador.mx/jalisco/Guadalajara-El-SIAPA-pierde-una-cuarta-parte-del-agua-por-redes-viejas-20250605-0027.html | "el lago de Chapala aporta aproximadamente 60 por ciento del agua … 'A través de él fluye aproximadamente el 60 por ciento del agua que abastece al área metropolitana de Guadalajara, pero desafortunadamente tiene una pérdida cercana al 25 o 30 por ciento debido a fugas, evaporación y deficiencias estructurales. Esto significa que una cuarta parte del agua que ya tenemos concesionada simplemente no llega a su destino'". La cifra se refiere al agua que viene del sistema de Chapala (≈60 % del abasto), no a toda el agua de Guadalajara; además es una estimación verbal ("cercana al 25 o 30"), no un cálculo publicado. | 2025 |
| Chip "Jalisco 2025: ~¼ no llega (25–30 %)" + íconos fuga, evaporación, tubo roto | ⚠️ | Misma | Igual que la fila anterior: falta decir que es el agua de Chapala. Los tres íconos sí coinciden con "fugas, evaporación y deficiencias estructurales". | 2025 |
| Un estudio de 2018 calculó que el mundo pierde o no cobra 346 millones de m³ de agua al día | ✅ | Liemberger y Wyatt, *Water Supply* 19(3):831–837, publicado en línea 6 jul 2018, doi:10.2166/ws.2018.129 (resumen abierto vía Crossref) | "The global volume of NRW has been estimated to be 346 million cubic metres per day or 126 billion cubic metres per year." NRW = agua no facturada (fugas, robos, errores de medición y consumo no cobrado) → "pierde o no cobra" es correcto. Dato de hace más de 2 años: la voz dice "un estudio de 2018". | 2018 |
| `TarjetaEstudio` "Liemberger y Wyatt · *Water Supply* · 2018" | ✅ | Misma (Crossref) | container-title "Water Supply", publicado 2018-07-06 | 2018 |
| Eso llenaría más de cien mil albercas olímpicas, diario | ✅ (con nota) | Wikipedia, "Olympic-size swimming pool" (unidad coloquial) | "2,500,000 L (2,500 m3 …), assuming a nominal depth of 2 m"; "is used as a colloquial unit of volume". Cuenta: 346 000 000 ÷ 2 500 = 138 400 → "más de cien mil" ✅. Nota: con 3 m de hondo (lo recomendado para usos múltiples) serían ≈ 92 300; la frase solo vale con la unidad convencional de 2 500 m³. Opcional, más blindado: "más de cien mil albercas olímpicas de dos metros de hondo" o "decenas de miles de albercas olímpicas". | 2026 (convención) |
| Una llave que gotea una vez por segundo tira más de once mil litros al año | ✅ | EPA WaterSense, "Fix a Leak Week" (página vigente, edición 2026) — https://www.epa.gov/watersense/fix-leak-week | "A leaky faucet that drips at the rate of one drip per second can waste more than 3,000 gallons per year." Cuenta: 3 000 gal × 3.785 L = 11 356 L → "más de once mil" ✅. | 2026 |
| Según la agencia ambiental de EUA, alcanza para más de 180 regaderazos | ✅ | Misma | "That's the amount of water needed to take more than 180 showers!" | 2026 |
| Las pérdidas de la red pública no dependen de ti; la llave de tu casa sí | ✅ | Consecuencia lógica de las fuentes (fugas "en las redes" vs. fugas domésticas de EPA) | — | — |

## Correcciones necesarias

1. **Guadalajara / Jalisco (⚠️):** la "cuarta parte" que dijo el gobierno de Jalisco es del agua que llega por el sistema del lago de Chapala (≈60 % del abasto de la metrópoli), y fue una estimación verbal ("cercana al 25 o 30 por ciento"). Texto sugerido para la voz:
   > "En 2025, el gobierno de Jalisco estimó que del agua que trae del lago de Chapala, una cuarta parte no llega a su destino: fugas, evaporación y fallas."

   Y el chip: "Jalisco 2025: agua de Chapala, ~¼ no llega (25–30 %)". Añadir "del lago de Chapala" alarga la voz ~1 s; si hace falta compensar, se puede acortar otra frase (p. ej. "Eso llenaría más de cien mil albercas olímpicas, diario" → "Más de cien mil albercas olímpicas, diario").
2. **Albercas (nota, no bloquea):** la cuenta es correcta con la unidad convencional de 2 500 m³. Si se quiere evitar cualquier objeción, decir "de dos metros de hondo" en pantalla (chip) en lugar de en la voz.

## Segunda ronda (29 oct 2026)

Volví a revisar las 11 líneas actuales de `narracion.json` y la tabla de `guion.md`.

| Línea (voz actual) | Veredicto | Comentario |
|---|---|---|
| 0 "De cada diez cubetas… unas cuatro nunca llegan a una casa." | ✅ | 37 % (SACMEX) y 42 % (IPDP), ambos de 2022, redondean a 4 de 10. |
| 1 "Así lo calculó la ciudad en 2022: se van en fugas de la red." | ✅ | "La ciudad" está bien dicho: SACMEX (Sistema de Aguas) y el IPDP son dependencias del gobierno de la CDMX. El 37 % salió de una medición: "tras la medición de las presiones del líquido por medio del programa de sectorización hoy se encuentra en 37%" (2022), y el 42 % es un indicador oficial "estimó para 2022". Las dos cifras son de 2022 y hablan de fugas "en las redes". |
| 2 Desgaste y exceso de presión | ✅ | SACMEX: "sobrepresión en las tuberías, desgaste natural" (2021). |
| 3 Suelo disparejo y tubos que se agrietan | ✅ | SACMEX: "movimientos diferenciales de terreno, grietas" (2021). |
| 4 "¿Y en Guadalajara está mejor?" | ✅ | Pregunta, no afirma nada. |
| 5 "En 2025, el gobierno de Jalisco estimó que del agua que trae del lago de Chapala, una cuarta parte no llega a su destino: fugas, evaporación y fallas." + chip "agua de Chapala, ~¼ no llega (25–30 %)" | ✅ | Ya coincide con la fuente: "A través de él [el sistema de Chapala] fluye aproximadamente el 60 por ciento del agua… una pérdida cercana al 25 o 30 por ciento debido a fugas, evaporación y deficiencias estructurales… una cuarta parte… no llega a su destino" (El Informador, 5 jun 2025). |
| 6 "…un estudio de 2018 calculó que el mundo pierde o no cobra 346 millones de metros cúbicos al día." | ✅ | Quitar "de agua" no cambia el sentido: el contexto es agua. Cita: "346 million cubic metres per day" (Liemberger y Wyatt, 2018). |
| 7 "Más de cien mil albercas olímpicas al día." + chip "olímpicas de 2 m de hondo" | ✅ | 346 000 000 ÷ 2 500 m³ = 138 400. Se entiende como equivalencia de la frase anterior, y el chip aclara la medida. |
| 8 Llave que gotea 1 vez/s → más de 11 000 L/año | ✅ | EPA: "more than 3,000 gallons per year", que son 11 356 L. |
| 9 Más de 180 regaderazos (EPA) | ✅ | EPA: "more than 180 showers". |
| 10 Cierre | ✅ | Consecuencia lógica de lo anterior. |

Correcciones pendientes: ninguna.

VEREDICTO: APROBADO
