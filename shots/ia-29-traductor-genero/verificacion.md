# Verificación de hechos · Shot IA #29 · El traductor que convierte a la ingeniera en «él»

- **Fecha:** 29 oct 2026
- **Verificador independiente (no escribió el guion).**
- Fuentes abiertas: PDF completo de Prates et al. (arXiv:1809.02208v4), PDF de Stanovsky et al. (ACL P19-1164), blog de Google del 6 dic 2018 y blog de Google Research del 22 abr 2020.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | «Ese "él"… es lo que el traductor aprendió» (el sesgo viene de los datos de entrenamiento) | ✅ | Kuczmarski, blog de Google, 6 dic 2018 | "Google Translate learns from hundreds of millions of already-translated examples from the web." · "it would skew masculine for words like "strong" or "doctor"" | 2018 |
| 2 | «Haz la prueba… Escribe "es ingeniero" en húngaro y tradúcelo» (se invita a probarlo hoy) | ⚠️ | Google Research, "A Scalable Approach to Reducing Gender Bias in Google Translate", 22 abr 2020 | "Using this approach we have expanded gender-specific translations to include Finnish, Hungarian, and Persian-to-English." | 2020 |
| 3 | En húngaro una palabra sirve para él y para ella («ő») | ✅ | Prates et al., sec. 4 | "“ő” is a gender-neutral pronoun meaning either he, she or it" | 2018–2019 |
| 4 | En 2018, Google respondía «he» con ingeniero y «she» con enfermera («ő egy ápolónő» → "she's a nurse") | ✅ | Prates et al., sec. 4 y Figura 1 | "yielding in this example the result “she’s a nurse” on Google Translate. As Figure 1 clearly shows, the same template yields a male pronoun when “nurse” is replaced by “engineer”." · "All experiments reported here were conducted on April 2018." | 2018 |
| 5 | Prates, Avelar y Lamb, en Brasil (UFRGS) | ✅ | Prates et al., portada | "Marcelo Prates … Pedro Avelar … Luis C. Lamb · Federal University of Rio Grande do Sul" | 2019 |
| 6 | Más de mil profesiones (1019) | ✅ | Prates et al., Tabla 2 | "a total of 1019 different occupations" | 2018 |
| 7 | Doce idiomas sin género | ✅ | Prates et al., resumen | "in 12 different gender neutral languages such as Hungarian, Chinese, Yoruba, and several others" | 2018 |
| 8 | En pantalla: «2018 · UFRGS · … · Neural Computing and Applications» | ⚠️ | Prates et al.; ficha de la revista (DOI 10.1007/s00521-019-04144-6) | Preprint "posted … on September 6, 2018"; en la revista salió en línea en 2019 (volumen 32, 2020) | 2018/2019 |
| 9 | En ciencia y tecnología (STEM), «él» 72 % | ✅ | Prates et al., sec. 5 y Tabla 7 | "the large asymmetry between gender pronouns in these fields (72% of male defaults)" · "STEM 4.219 71.624 11.181" | 2018 |
| 10 | «Ella», solo 4 % en STEM | ✅ | Prates et al., Tabla 7 | "STEM 4.219 [female] 71.624 [male] 11.181 [neutral]" | 2018 |
| 11 | «No: salía "ella" doce por ciento» | ⚠️ (de qué es) | Prates et al., sec. 8 | "Averaged over occupations and languages, sentences are translated with female pronouns 11.76% of the time." | 2018 |
| 12 | «En esos trabajos de EE. UU. había, en promedio, casi 36 % de mujeres» | ⚠️ (año del dato) | Prates et al., sec. 8 y ref. [7] | "the gender participation frequency for female workers averaged over all occupations in the BLS report yields a consistently larger figure of 35.94%." · Ref. [7]: "Employed persons by detailed occupation, sex … 2017" | 2017 |
| 13 | Así que el sesgo no copia la proporción real de mujeres (respuesta «No» al re-gancho) | ✅ | Prates et al., sec. 8 | "it is not possible to understand this asymmetry as a reflection of workplace demographics" | 2018 |
| 14 | Dic 2018: Google empezó a dar versión femenina y masculina en algunos idiomas | ✅ | Blog de Google, 6 dic 2018 | "you'll get both a feminine and masculine translation for a single word … when translating from English into French, Italian, Portuguese or Spanish." · también "from Turkish to English" | 2018 |
| 15 | En pantalla: «o bir doktor» → "she is a doctor" / "he is a doctor" | ✅ | Blog de Google, 6 dic 2018 | ejemplo del turco en el post: "she is a doctor" / "he is a doctor" | 2018 |
| 16 | En español casi siempre hay que elegir: el doctor o la doctora | ✅ | Stanovsky et al., Figura 1 e introducción | "target languages with grammatical gender" · Figura 1: "El doctor le pidio a la enfermera…" | 2019 |
| 17 | 2019, Seattle (Universidad de Washington), Stanovsky, Smith y Zettlemoyer, ACL | ✅ | Stanovsky et al., portada | "Paul G. Allen School of Computer Science & Engineering, University of Washington, Seattle, USA" · "Florence, Italy, July 28 - August 2, 2019 … Association for Computational Linguistics" | 2019 |
| 18 | Con frases que dejaban claro el género (ej. "The doctor asked the nurse to help her") | ✅ | Stanovsky et al., resumen | "English sentences which cast participants into non-stereotypical gender roles (e.g., "The doctor asked the nurse to help her in the operation")" | 2019 |
| 19 | Google acertó al español solo 53 % | ✅ | Stanovsky et al., Tabla 2 | "ES 53.1" (Google Translate) · "Acc indicates overall gender accuracy (% of instances the translation had the correct gender)" | 2019 |
| 20 | En pantalla: «El doctor le pidió a la enfermera…» con tachado en «El» | ✅ | Stanovsky et al., Figura 1 | "El doctor le pidio a la enfermera que le ayudara con el procedimiento" | 2019 |

**Resumen:** 16 ✅ · 4 ⚠️ · 0 ❌

## Correcciones necesarias

1. **(#2) «Haz la prueba… Escribe "es ingeniero" en húngaro y tradúcelo».** Desde abril de 2020 Google da traducciones con género (femenina y masculina) del húngaro al inglés. Si alguien hace la prueba hoy, lo más probable es que vea las dos opciones, no solo «he». Eso choca con el gancho y parece falso. Propuesta: quitar las órdenes y contarlo como algo que pasó:
   - Línea 0: «Ese «él» no es un error de dedo: es lo que el traductor aprendió.» (sin «Haz la prueba»).
   - Línea 1: «En húngaro, una palabra sirve para él y para ella. En 2018, alguien escribió «es ingeniero» en húngaro y lo tradujo.» (y la línea 2 sigue igual).
   - Y de preferencia, para que nadie se confunda al probarlo, agregar a la línea 7: «…en algunos idiomas, y en 2020 sumó el húngaro.» (fuente #2 de la tabla; cuidar la duración).
2. **(#8) Tarjeta del estudio.** «2018 · Neural Computing and Applications» da a entender que se publicó en la revista en 2018. Propuesta: «Experimentos de 2018 · publicado en 2019 · Neural Computing and Applications», o solo «2018 · UFRGS, Brasil · Prates, Avelar y Lamb».
3. **(#11) Decir de qué es el 12 %.** Va justo después de la cifra de STEM, y quien escucha puede creer que es solo de ciencia. En realidad es el promedio de todas las profesiones y los 12 idiomas. Propuesta de voz: «No: en todas las profesiones salía «ella» doce por ciento, y en esos trabajos de Estados Unidos había, en promedio, casi treinta y seis por ciento de mujeres.» En pantalla: «traductor (todas las profesiones): ella 12 %».
4. **(#12) Año del dato del 36 %.** Son datos de la Oficina de Estadísticas Laborales de 2017, de hace más de 2 años. Propuesta: en pantalla «trabajos reales (EE. UU., 2017): 36 % mujeres». Si cabe en la voz: «…de Estados Unidos, en 2017, había…».

## Re-verificación

- **Fecha:** 29 oct 2026 · mismo verificador independiente. Revisé solo lo que cambió en `narracion.json`, `traductor.jsx` (chips, tarjetas y subtítulos) y `publicacion.md`, contra las mismas fuentes que abrí arriba.

| # | Afirmación nueva o corregida | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R1 | Voz 0: «Ese "él" no fue un error de dedo: fue lo que el traductor aprendió.» (en pasado, ya sin «Haz la prueba») | ✅ | Blog de Google, 6 dic 2018 | "Google Translate learns from hundreds of millions of already-translated examples from the web." · "it would skew masculine…" | 2018 |
| R2 | Voz 1–2: «En 2018, escribías "es ingeniero" y lo traducías. Google decía "he"… Con "enfermera", "she"» + chip «así salía en 2018» | ✅ | Prates et al., sec. 4 y Fig. 1 | "the same template yields a male pronoun when “nurse” is replaced by “engineer”" · "conducted on April 2018" | 2018 |
| R3 | Voz 3: «En Brasil lo probaron con más de mil profesiones en doce idiomas sin género» + chip «1,019 profesiones · 12 idiomas sin género» | ✅ | Prates et al., portada, resumen y Tabla 2 | "Federal University of Rio Grande do Sul" · "12 different gender neutral languages" · "1019 different occupations" | 2018 |
| R4 | Tarjeta «2018 · experimentos · UFRGS, Brasil · Prates, Avelar y Lamb · publicado en 2019» | ✅ | Prates et al.; DOI 10.1007/s00521-019-04144-6 | "All experiments reported here were conducted on April 2018." · el artículo salió en línea en la revista en 2019 (vol. 32, 2020) | 2018/2019 |
| R5 | Voz 6: «en todas las profesiones salía "ella" doce por ciento» + chip «(todas las profesiones)» + barra 11.76 | ✅ | Prates et al., sec. 8 | "Averaged over occupations and languages, sentences are translated with female pronouns 11.76% of the time." | 2018 |
| R6 | Voz 6: «en esos trabajos de Estados Unidos, en 2017, había casi treinta y seis por ciento de mujeres» + chip «EE. UU., 2017» + barra 35.94 | ✅ | Prates et al., sec. 8 y ref. [7] (BLS, Tabla 11, 2017) | "averaged over all occupations in the BLS report yields a consistently larger figure of 35.94%" · "Employed persons by detailed occupation, sex … 2017" | 2017 |
| R7 | Voz 7: «En diciembre de 2018, Google empezó a dar versión femenina y masculina en algunos idiomas» + chips «diciembre 2018», «algunos idiomas» | ✅ | Blog de Google, 6 dic 2018 | "both a feminine and masculine translation for a single word … from English into French, Italian, Portuguese or Spanish" · "from Turkish to English" | 2018 |
| R8 | Voz 7: «…y en 2020 sumó el húngaro» + chip «2020: + húngaro» (en publicacion.md: «abril de 2020… finés, húngaro y persa → inglés») | ✅ | Google Research, 22 abr 2020 | "we have expanded gender-specific translations to include Finnish, Hungarian, and Persian-to-English." | 2020 |
| R9 | Subtítulo 7: «2018: las dos versiones. 2020: húngaro.» | ✅ | Igual que R7 y R8 (la voz dice «en algunos idiomas» al mismo tiempo) | — | 2018/2020 |
| R10 | publicacion.md: a Google le fue mejor en español cuando el papel era el estereotípico | ✅ | Stanovsky et al., Fig. 2 | "The performance on the stereotypical portion of WinoMT is consistently better than that on the non-stereotypical portion." (ES: 67 % frente a 46 %) | 2019 |
| R11 | publicacion.md: «El modelo no solo reflejaba la realidad: la exageraba» | ✅ | Prates et al., sec. 8 | "Google Translate’s female translation frequencies sub-estimates female participation frequencies in US job positions." | 2018 |

Las 4 correcciones (⚠️ #2, #8, #11 y #12) quedaron bien aplicadas. Ya no hay ninguna afirmación ❌ ni ⚠️.

VEREDICTO: APROBADO
