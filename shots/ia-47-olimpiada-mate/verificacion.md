# Verificación de hechos · Shot IA #47 · La IA que sacó oro en la Olimpiada de Matemáticas (y el problema que no pudo)

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Método: páginas abiertas una por una. La tabla oficial de la IMO 2025 (630 filas) se descargó y se **recontó con un script propio**
  (columnas: lugar, medalla, total, P1–P6). También se abrieron el PDF de soluciones de Google, el Reglamento General de la IMO y el hilo de Alexander Wei (OpenAI) por
  la API pública de X y por threadreaderapp.

## Recuento propio de la tabla oficial (imo-official.org/results/individual/year/2025/)
- Filas: 630. Medallas: 72 oros · 104 platas · 145 bronces · 132 menciones honoríficas · 177 sin premio.
- Total ≥ 35: **72** · total > 35: **26** · total = 35: **46** · total < 35: **558** · 42 perfectos: 5.
- Problema 6: 0 pts → 569 · 1 → 45 · 2 → 6 · 3 → 1 · 4 → 1 · 5 → 2 · **7 → 6**.
- Los números del guion coinciden exactamente con este recuento.

## Tabla

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | "Superó a 558 de 630 concursantes" (Gemini Deep Think, 35 pts) | ✅ | Tabla oficial de la IMO 2025 (recuento propio) + imo-official.org/editions/2025/ | "630 Contestants"; recuento: 558 concursantes con menos de 35 pts | 2025 |
| 2 | "Casi seguro te gana" | ✅ (con nota) | Igual que #1 | 558/630 = 88.6 % de los concursantes de la IMO quedaron por debajo; para quien no es olímpico la probabilidad es aún mayor. Es comparación hipotética pero sostenida por el dato. | 2025 |
| 3 | Julio de 2025, en Australia (en pantalla: "Sunshine Coast · jul 2025") | ✅ | imo-official.org/editions/2025/ | "66th IMO 2025 · Sunshine Coast, Australia · July 10 - 20" | 2025 |
| 4 | Seis problemas, dos exámenes de 4 h 30 min | ✅ | Reglamento General de la IMO (versión aprobada en la IMO 2025), cláusula 5.1 | "takes place on two consecutive days … lasts for four and a half hours. Each of the two examination papers consists of three problems." | 2025 |
| 5 | Gemini Deep Think, de Google, resolvió cinco: 35 de 42 | ✅ | Blog de Google DeepMind, 21 jul 2025 | "solved five out of the six IMO problems perfectly, earning 35 total points"; Dolinar: "earning 35 out of a possible 42 points" | 2025 |
| 6 | 35 = "el mínimo para oro" (en pantalla: "corte de oro: 35") | ✅ | imo-official.org/editions/2025/ | "72 Gold ≥35 pts" | 2025 |
| 7 | "La calificó la propia olimpiada" (en pantalla: "Calificado por coordinadores de la IMO") | ✅ | Blog de Google DeepMind, 21 jul 2025 | "officially graded and certified by IMO coordinators using the same criteria as for student solutions" (nota: la IMO aclara que su revisión "does not extend to validating our system, processes, or underlying model"; la voz no dice más que eso, está bien) | 2025 |
| 8 | Una IA de OpenAI sacó igual (35/42) | ✅ | Alexander Wei (OpenAI), hilo en X 19 jul 2025, tuit 6/N (API pública de X + threadreaderapp) | "The model earned 35/42 points in total, enough for gold!" | 2025 |
| 9 | A la de OpenAI la calificaron tres exmedallistas, no la olimpiada (en pantalla: "no oficial") | ✅ | Wei, tuit 6/N; cobertura AFP/ZME Science | "three former IMO medalists independently graded the model's submitted proof, with scores finalized after unanimous consensus" | 2025 |
| 10 | 72 ganaron oro | ✅ | imo-official.org/editions/2025/ + recuento | "72 Gold ≥35 pts" | 2025 |
| 11 | 26 superaron a las máquinas (más de 35 pts) | ✅ | Recuento propio de la tabla oficial | 26 concursantes con 36–42 pts (5 con 42) | 2025 |
| 12 | Un año antes (2024) otra IA de Google "quedó en plata" (en pantalla "28/42 · plata") | ⚠️ imprecisa | Blog de Google DeepMind, 25 jul 2024 | "AI achieves silver-medal standard"; "Our system achieved a final score of 28 points". Fue **nivel** de plata (no compitió ni recibió medalla) y fueron dos sistemas (AlphaProof + AlphaGeometry 2). | 2024 |
| 13 | Tardó hasta tres días | ✅ | Blog DeepMind 2024 | "solved one problem within minutes and took up to three days to solve the others" | 2024 |
| 14 | Con los problemas traducidos (en pantalla: hoja → código "Lean") | ✅ | Blog DeepMind 2024 | "the problems were manually translated into formal mathematical language for our systems to understand"; AlphaProof trabaja en Lean | 2024 |
| 15 | México llevó seis: dos platas y cuatro bronces | ✅ | imo-official.org/results/team/year/2025/country/MEX/ | Buenrostro S 28 · Higashida S 28 · Villarreal B 27 · Latapi B 24 · Torres B 24 · Caram B 22 | 2025 |
| 16 | El problema 6 no lo resolvió ninguna de las dos IA | ✅ | OpenAI: Wei, tuit 10/N. Google: PDF oficial de soluciones (solo trae Problem 1 a Problem 5) + 35 pts = 5 × 7, así que P6 = 0 | "The model solved P1 through P5; it did not produce a solution for P6." | 2025 |
| 17 | De 630 jóvenes, solo 6 resolvieron el problema 6 (en pantalla: "6 de 630 con 7/7") | ✅ | Recuento propio de la tabla oficial | P6 con 7 puntos: 6 concursantes (otros 55 sacaron puntos parciales de 1–5) | 2025 |
| 18 | Los problemas de olimpiada ya tienen solución; en investigación nadie la sabe | ✅ | Reglamento General de la IMO, cláusula 4.1 | "submit up to six proposed problems, with solutions"; la segunda mitad es la definición de un problema abierto | 2025 |
| 19 | Mensaje de fondo en tiempo presente ("casi seguro te gana", "para ganarle… o resolver el seis", "la IA que… el problema que no pudo"), para un video que sale en nov 2026 | ⚠️ hay un dato más nuevo | AFP (jul 2026), en thesun.my y standardmedia.co.ke; 36Kr; tech-insider.org | En la IMO 2026 (Shanghai, julio 2026) varias empresas (Huawei "Celia", Xiaohongshu "dots-note-3.0") dicen haber sacado 42/42, y un inversor reportó 42/42 de modelos de OpenAI, Anthropic, Axiom y Moonshot probados por él. No encontré certificación oficial de la IMO. Cada frase del guion está bien para 2025, pero quien lo vea en 2026 puede entender que las IA de hoy no pueden con el problema más difícil. | 2026 |

## Correcciones necesarias

1. **#12 "quedó en plata" (⚠️):** fue *nivel* de plata, no una medalla.
   Texto propuesto: «Un año antes, otra IA de Google llegó a nivel plata: tardó hasta tres días, con los problemas traducidos.»
   En pantalla: "2024 · AlphaProof + AlphaGeometry 2 · 28 / 42 · nivel plata".
2. **#19 Dato más nuevo (⚠️):** hay que dejar claro que todo es el resultado de **2025** y mencionar lo de 2026 como algo
   *reportado, sin confirmación oficial*. Propuestas (elige una, cuidando la duración):
   - Cambiar la escena 10 (Matiz) por: «Ojo: en 2026 varias IA dicen que ya sacaron cuarenta y dos de cuarenta y dos, pero falta la confirmación oficial.»
     Y el cierre: «En 2025, para ganarle, tendrías que ser de los veintiséis mejores… o resolver el seis.»
   - O, si se quiere conservar el Matiz, recortar la escena 7 (2024) y usar ese tiempo para la línea de 2026.
   - Mínimo indispensable: en el cierre, «En 2025, para ganarle…», y en `publicacion.md` una nota de que en la IMO 2026 hubo reportes de puntajes perfectos de IA sin confirmar.
   Si se agrega la línea de 2026, esa frase necesita su propia verificación (de preferencia contra un anuncio primario de la IMO o de los laboratorios).
