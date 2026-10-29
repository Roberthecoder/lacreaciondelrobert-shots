# Verificación de hechos · Shot IA #21 · La misma app de caras falla más con unas que con otras

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuentes abiertas en el original: PDF de Gender Shades (PMLR 81, 2018), PDF de *Actionable Auditing* (AIES 2019, aies-conference.com), PDF de NISTIR 8280 (nvlpubs.nist.gov), página del caso en aclu.org y comunicado de ACLU Michigan (28 jun 2024).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho: el mismo programa casi nunca se equivoca con un hombre de piel clara y con una mujer de piel oscura se equivoca "una de cada tres veces" (en presente: "lo confunde") | ⚠️ | Buolamwini y Gebru, Gender Shades, PMLR 81 (2018), Tabla 4 | IBM: 0.3 % en hombres de piel clara, 34.7 % en mujeres de piel oscura; "Microsoft and IBM classifiers perform best on lighter male faces (error rates of 0.0% and 0.3% respectively)". La cifra es cierta, pero se midió en mayo de 2017 y en agosto de 2018 IBM ya había bajado a 16.97 % (Raji y Buolamwini 2019): decirla en presente es impreciso | 2017 (medición), 2018 (publicación) |
| 2 | "Lo midieron en 2018 Joy Buolamwini y Timnit Gebru" | ⚠️ | Raji y Buolamwini, AIES 2019 | "document audit outcomes from May 2017"; publicado/presentado en febrero de 2018 ("On February 9th, 2018…", "presented on February 24th 2018"). La medición fue en 2017; 2018 es el año de publicación | 2017/2018 |
| 3 | Tres programas comerciales que adivinan hombre o mujer (IBM, Microsoft, Face++) | ✅ | Gender Shades | "We evaluate 3 commercial gender classification systems"; "(Microsoft; IBM; Face++)" | 2018 |
| 4 | Pantalla: "Gender Shades · Buolamwini y Gebru (MIT / Microsoft Research)" | ✅ | Gender Shades, encabezado | "Joy Buolamwini … MIT Media Lab"; "Timnit Gebru … Microsoft Research" | 2018 |
| 5 | Chip: "1,270 fotos de parlamentarios de 6 países" | ✅ | Gender Shades | "PPB consists of 1270 individuals"; "male and female parliamentarians from 6 countries"; "only one image of each subject was labeled" | 2018 |
| 6 | En hombres de piel clara fallaron menos del 1 % (pantalla "≤ 0.8 %") | ✅ | Gender Shades, resumen | "The maximum error rate for lighter-skinned males is 0.8%." | 2018 |
| 7 | En mujeres de piel oscura, "hasta treinta y cinco" (pantalla "hasta 34.7 %") | ⚠️ | Gender Shades, resumen | "darker-skinned females are the most misclassified group (with error rates of up to 34.7%)". Pantalla ✅; la voz redondea un máximo hacia arriba (35) y no dice "por ciento" | 2018 |
| 8 | IJB-A 79.6 % y Adience 86.2 % de piel clara | ✅ | Gender Shades, resumen | "these datasets are overwhelmingly composed of lighter-skinned subjects (79.6% for IJB-A and 86.2% for Adience)" | 2018 |
| 9 | Voz: "aprenden de ejemplos, y las colecciones de caras de referencia eran **casi todas** de piel clara" (como explicación probable) | ⚠️ | Gender Shades | 79.6 % es ~4 de cada 5, no "casi todas". Además son bancos de *prueba*; el artículo dice que de los programas comerciales "there was no mention of what training data was used". Está bien marcado como hipótesis, pero "casi todas" exagera | 2018 |
| 10 | Tras el estudio, en siete meses las tres empresas sacaron versiones que fallaban menos | ✅ | Raji y Buolamwini, AIES 2019 | "Within 7 months of the original audit, we find that all three targets released new API versions." | 2019 (datos de agosto 2018) |
| 11 | Pantalla: mujeres de piel oscura IBM 34.7 → 17.0 %, Face++ 34.5 → 4.1 %, Microsoft 20.8 → 1.5 % (agosto 2018) | ✅ | Gender Shades Tabla 4 + Raji y Buolamwini Tabla 1 "Overall Error on Pilot Parliaments Benchmark, August 2018 (%)" | Gender Shades: Face++ 34.5, IBM 34.7, Microsoft 20.8. Tabla 1 (2019): Face++ 4.1, MSFT 1.52, IBM 16.97 | 2017 → 2018 |
| 12 | 2019, NIST de EE. UU. probó 189 programas que reconocen quién eres (pantalla: 189 algoritmos · 18.27 millones de fotos) | ✅ | Grother, Ngan y Hanaoka, NISTIR 8280 (dic 2019) | "a total of 18.27 million images of 8.49 million people through 189 mostly commercial algorithms from 99 developers" | 2019 |
| 13 | "confundir a dos personas variaba **hasta cien veces** según su origen" | ⚠️ | NISTIR 8280 | "False positives are the erroneous association of samples of two persons"; "Across demographics, false positives rates often vary by factors of 10 to beyond 100 times." La fuente dice "de 10 a más de 100": "hasta cien" pone un tope que no existe. "Según su origen" se queda corto: NIST mide país de nacimiento/raza, sexo y edad | 2019 |
| 14 | Pantalla: medidor ×1 → ×10 → ×100 | ✅ (si la voz se corrige) | NISTIR 8280 | ídem | 2019 |
| 15 | Robert Williams, 2020, Detroit, coincidencia facial equivocada, 30 horas detenido | ✅ | ACLU, *Williams v. City of Detroit*; ACLU Michigan 28 jun 2024 | "In January 2020, Detroit police wrongfully arrested our client Robert Williams outside his home"; "thirty hours of detention in an overcrowded, dirty cell"; "wrongfully arrested by the Detroit Police Department in 2020" | 2020 |
| 16 | Pantalla: foto borrosa de cámara de tienda → licencia de manejo → "COINCIDENCIA" | ✅ | ACLU, caso | "a blurry, low-quality still image from the store's surveillance video"; "an expired driver's license photo of Mr. Williams" | 2020 |
| 17 | Chip: "2024: Detroit ya no puede arrestar solo por reconocimiento facial" | ✅ | ACLU Michigan, 28 jun 2024 | "Police will be prohibited from arresting people based solely on facial recognition results" | 2024 |
| 18 | Cierre: "quizá no te ve igual que al de al lado" | ✅ | NISTIR 8280 | "We found empirical evidence for the existence of demographic differentials in the majority of contemporary face recognition algorithms" (dicho con "quizá", correcto) | 2019 |

## Correcciones necesarias

1. **#1 Gancho en presente** (⚠️): el 34.7 % es de 2017 y ya bajó. Propuesta: "Tú y el de al lado le enseñaron su cara al mismo programa. A él casi nunca lo confundió; a ti, una de cada tres veces."
2. **#2 Año de la medición** (⚠️): se midió en 2017 y se publicó en 2018. Propuesta: "Lo publicaron en 2018 Joy Buolamwini y Timnit Gebru: tres programas comerciales que adivinan si una cara es de hombre o de mujer." (La tarjeta "2018 · Gender Shades" queda bien como año de publicación.)
3. **#7 "hasta treinta y cinco"** (⚠️): redondea un máximo hacia arriba y no dice de qué es. Propuesta: "En mujeres de piel oscura, casi treinta y cinco por ciento." (o "hasta treinta y cuatro punto siete por ciento").
4. **#9 "casi todas de piel clara"** (⚠️): 79.6 % y 86.2 % no son "casi todas". Propuesta: "Una explicación probable: aprenden de ejemplos, y las colecciones de caras de referencia eran en su gran mayoría de piel clara." (mantener la etiqueta "hipótesis").
5. **#13 NIST "hasta cien veces según su origen"** (⚠️): la fuente dice "de 10 a más de 100 veces" y por grupo demográfico, no solo por origen. Propuesta: "…confundir a dos personas podía ser de diez a más de cien veces más frecuente según el grupo de la persona." (o "…según su origen, sexo o edad").

## Re-verificación

29 oct 2026 · mismo verificador independiente. Solo lo nuevo: `narracion.json`, `caraspiel.jsx` y `publicacion.md`.

| # | Afirmación nueva | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R1 | Voz 1: "enseñaron… A él casi nunca lo confundió; a ti, una de cada tres veces" (en pasado) | ✅ | Gender Shades, Tabla 4 (IBM 0.3 % / 34.7 %) | "Microsoft and IBM classifiers perform best on lighter male faces (error rates of 0.0% and 0.3% respectively)"; "ranging from 20.8% for Microsoft to 34.7% for IBM" | 2017 (medición) |
| R2 | Voz 2: "Lo publicaron en 2018… tres programas que adivinan si una cara es de hombre o mujer" | ✅ | Gender Shades (PMLR 81, 2018); Raji y Buolamwini 2019 | "We evaluate 3 commercial gender classification systems"; "presented on February 24th 2018" | 2018 |
| R3 | Voz 3: "menos del uno por ciento… casi treinta y cinco por ciento"; barras 0.8 vs 34.7 "(el peor de los 3)"; subtítulo "Menos de 1 % contra casi 35 %" | ✅ | Gender Shades, resumen | "error rates of up to 34.7%"; "The maximum error rate for lighter-skinned males is 0.8%" | 2018 |
| R4 | Voz 5: "Una hipótesis… colecciones de caras de prueba… en su gran mayoría de piel clara"; álbumes 79.6 % / 86.2 % con chip HIPÓTESIS | ✅ | Gender Shades | "overwhelmingly composed of lighter-skinned subjects (79.6% for IJB-A and 86.2% for Adience)" | 2018 |
| R5 | Voz 6: "en siete meses, las tres empresas sacaron versiones que fallaban menos"; barras IBM 34.7→16.97, Face++ 34.5→4.1, Microsoft 20.8→1.52, chip "2017 → agosto de 2018" | ✅ | Raji y Buolamwini 2019, Tabla 1; Gender Shades Tabla 4 | "Within 7 months of the original audit, we find that all three targets released new API versions"; Tabla 1 (agosto 2018): Face++ 4.1, MSFT 1.52, IBM 16.97 | 2017–2018 |
| R6 | Voz 7: NIST 2019, 189 programas, "de diez a más de cien veces más frecuente según el grupo"; medidor ×1/×10/×100+; subtítulo "de 10 a 100+ veces" | ✅ | NISTIR 8280 | "189 mostly commercial algorithms"; "false positives rates often vary by factors of 10 to beyond 100 times" | 2019 |
| R7 | Williams: foto borrosa → licencia → COINCIDENCIA, "Detroit · enero de 2020", 30 horas, chip "2024: prohibido arrestar solo por esto" | ✅ | ACLU (caso); ACLU Michigan 28 jun 2024 | "In January 2020, Detroit police wrongfully arrested our client Robert Williams"; "thirty hours of detention"; "prohibited from arresting people based solely on facial recognition results" | 2020/2024 |
| R8 | Cierre: "error: 0.3 % / 34.7 %" + "mismo programa (IBM, 2017)" | ✅ | Gender Shades Tabla 4; Raji y Buolamwini ("audit outcomes from May 2017") | IBM: lighter male 0.3, darker female 34.7 | 2017 |
| R9 | LinkedIn: el error con mujeres de piel oscura "bajó entre 17.7 y 30.4 puntos" | ✅ | Raji y Buolamwini 2019 | "a 17.7% - 30.4% reduction in error between audit periods" (IBM −17.73; Face++ 34.5→4.1 = −30.4) | 2019 |
| R10 | Subtítulo 0 (jsx): "Mismo programa… *a ti te falla más.*" (en presente) | ⚠️ | ídem R1 | Mismo problema que se corrigió en la voz: el dato es de 2017 y ya bajó | 2017 |
| R11 | Subtítulo 4 (jsx): "Sus ejemplos: *la mayoría, piel clara.*" | ⚠️ | Gender Shades | Los 79.6/86.2 % son de colecciones de *prueba*; de los programas comerciales "there was no mention of what training data was used". "Sus ejemplos" lo presenta como dato de entrenamiento | 2018 |
| R12 | publicacion.md (TikTok): "las colecciones de caras de prueba **más usadas**" | ⚠️ | Gender Shades | El artículo solo dice "two facial analysis benchmarks, IJB-A and Adience"; el superlativo "más usadas" no está verificado | 2018 |

### Correcciones necesarias (re-verificación)
1. **R10** `caraspiel.jsx` subtítulo idx 0 → `"Mismo programa… *a ti te falló más.*"`
2. **R11** `caraspiel.jsx` subtítulo idx 4 → `"Caras de prueba: *la mayoría, piel clara.*"`
3. **R12** `publicacion.md` (TikTok) → "y dos colecciones de caras de prueba muy usadas eran en su gran mayoría de piel clara (79.6 % y 86.2 %)." (como ya dice YouTube; quitar "más usadas").

Con esos tres cambios hechos tal cual, todo lo demás queda ✅.

## Re-verificación final (29 oct 2026, coordinador)
- Subtítulo idx 0: «Mismo programa… *a ti te falló más.*» ✅
- Subtítulo idx 4: «Caras de prueba: *la mayoría, piel clara.*» ✅
- publicacion.md (TikTok): «dos colecciones de caras de prueba muy usadas» ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
