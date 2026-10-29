# Verificación de hechos · Shot IA #43 · La IA que busca Parkinson en cómo respiras dormido

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Fuente principal abierta completa: Yang, Katabi y col., *Nature Medicine* 28: 2207–2215 (2022), PMC9556299 (texto completo XML de Europe PMC). También abiertos: MIT News (22 ago 2022), MedlinePlus en español (act. 6 ene 2022), Parkinson's Foundation "Getting diagnosed", Baille y col. *PLoS ONE* 2018 (ref. 20 del artículo) y Pokusa y col. *Physiol. Res.* 2020 (ref. 23 del artículo).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Una IA busca señales de Parkinson en la respiración al dormir (gancho) | ✅ | Yang y col., *Nat. Med.* 2022 | "we developed an artificial intelligence (AI) model to detect PD and track its progression from nocturnal breathing signals" | 2022 |
| 2 | El Parkinson llega cuando ciertas neuronas producen poca dopamina | ✅ | MedlinePlus (NIH) | "Ocurre cuando las células nerviosas (neuronas) no producen suficiente cantidad de una sustancia química importante en el cerebro conocida como dopamina." | 2022 (act.) |
| 3 | Síntomas: temblor, rigidez, lentitud (íconos mano, brazo, tortuga) | ✅ | MedlinePlus (NIH) | "Temblor en las manos… Rigidez en los brazos, las piernas y el tronco · Lentitud de los movimientos" | 2022 (act.) |
| 4 | "Y ningún examen lo diagnostica" (pantalla: tubo "examen" tachado) | ⚠️ | MedlinePlus; Parkinson's Foundation | MedlinePlus: "No existe un examen de diagnóstico… Los doctores usan el historial del paciente y un examen neurológico para diagnosticarlo." PF: "There is not a specific lab or imaging test that can diagnose PD." → La idea es correcta, pero "ningún examen" choca con que el diagnóstico SÍ se hace con un *examen neurológico*. Además ya existe una prueba de piel (Syn-One) que busca alfa-sinucleína, aunque PF dice que "cannot diagnose Parkinson's on its own". | 2022 / 2026 (consulta) |
| 5 | En el MIT hicieron un aparato tipo módem | ✅ | MIT News; *Nat. Med.* | MIT News: "developed a device with the appearance of a home Wi-Fi router". Artículo: "using a radio device developed by our team at MIT" | 2022 |
| 6 | Sus ondas de radio rebotan en ti y leen cómo respiras sin tocarte | ✅ | *Nat. Med.* 2022 | "by extracting breathing from radio waves that bounce off a person's body during sleep" / "in a touchless manner" | 2022 |
| 7 | (Pantalla) también un cinturón de pecho como segunda forma de medir | ✅ | *Nat. Med.* 2022 | "which can be collected using a breathing belt worn on the person's chest or abdomen" | 2022 |
| 8 | Casi doce mil noches de sueño (pantalla "11,964 noches") | ✅ | *Nat. Med.* 2022 | "The combined dataset contains 11,964 nights with over 120,000 h of nocturnal breathing signals" | 2022 |
| 9 | Más de siete mil seiscientas personas (pantalla "7,671 personas") | ✅ | *Nat. Med.* 2022 | "evaluated on a large dataset comprising 7,671 individuals" (757 PD + 6,914 control). MIT News dice 7,687; se usa la del artículo, correcto. | 2022 |
| 10 | Estudios lo ligan con músculos de respirar débiles y problemas al respirar dormido | ✅ | *Nat. Med.* 2022 (introducción); Baille 2018; Pokusa 2020 | "later work which reported degeneration in areas in the brainstem that control breathing, weakness of respiratory muscle function and sleep breathing disorders" / Baille: "inspiratory muscle weakness was the only abnormality observed in the PD group" | 2022 / 2018 / 2020 |
| 11 | "…a veces años antes del temblor" (pantalla: línea del tiempo con "cambios al respirar" antes que "temblor") | ⚠️ | *Nat. Med.* 2022 cita refs. 20, 23 y 25; abiertas 20 y 23 | El artículo lo afirma ("often manifest years before clinical motor symptoms") y MIT News lo repite, pero las fuentes que cita NO lo muestran: Baille 2018 estudió pacientes ya diagnosticados ("early-stage PD patients… disease duration: 1.9 ± 1.7 years"); Pokusa 2020 dice "respiratory problems, which often manifest in the early stages of the disease" (etapas tempranas, no años antes); Seccombe 2011 también es en pacientes diagnosticados. No es fuente primaria que muestre el "años antes". No verificable → ⚠️. | 2022 / 2018 / 2020 |
| 12 | Lo publicaron en 2022 · MIT · Yang, Katabi y col. · *Nature Medicine* (tarjeta) | ✅ | *Nat. Med.* 28: 2207–2215 | DOI 10.1038/s41591-022-01932-x; autores Yang Y. … Katabi D. | 2022 |
| 13 | "Entre una persona con Parkinson y una sin, distinguía cuál era cuál nueve de cada diez veces" (pantalla 9 de 10 palomitas) | ⚠️ (leve) | *Nat. Med.* 2022 | Resumen: "detect PD with an area-under-the-curve of 0.90 … on held-out … test sets". Leer el AUC como "si comparas uno con y uno sin, le da más puntaje al que sí tiene" es correcto y está bien que NO se diga "acierta el 90 %" (la sensibilidad real fue 80–86 % y la especificidad 79–83 %). Imprecisión: el AUC se calculó por **noches**, no por personas ("n = 6,660 nights from 5,652 subjects", AUC 0.889; inalámbrico "n = 2,601 nights from 53 subjects", AUC 0.906). Con cinturón fue 0.889, o sea "casi" nueve. | 2022 |
| 14 | "En un hospital que no conocía, más de ocho" (pantalla más de 8 de 10) | ✅ (misma nota de noches) | *Nat. Med.* 2022 | "external test dataset (n = 1,920 nights from 1,920 subjects…) from an independent hospital not involved during model development (Mayo Clinic). Our model achieved an AUC of 0.851" — aquí una noche por persona, así que "persona" sí cuadra. | 2022 |
| 15 | Y estimaba qué tan avanzado iba (medidor) | ✅ | *Nat. Med.* 2022 | "strong correlation between the model's severity prediction and the MDS-UPDRS (R = 0.94, P = 3.6 × 10–25)" | 2022 |
| 16 | Su enemigo: un ventilador o tu mascota; esas noches no servían (pantalla ventilador y gato) | ✅ | *Nat. Med.* 2022 (Métodos) | "We also filter out nights where the breathing signal is distorted or nonexistent, which occurs … when a source of interference (for example, fans or pets) exists near the subject for wireless data." | 2022 |
| 17 | Es investigación, no una prueba aprobada para diagnosticarte | ✅ | *Nat. Med.* 2022; búsqueda sin hallazgo de autorización FDA (oct 2026) | "Future research is required to establish the feasibility of such use pattern, and the potential impact on clinical practice. Our study also has some limitations." No encontré autorización de la FDA de este aparato para diagnosticar Parkinson (la empresa Emerald lo ofrece para estudios de farmacéuticas). | 2022 / 2026 |
| 18 | Quizá un día esa rayita avise antes que tus manos (cierre) | ✅ como posibilidad | *Nat. Med.* 2022 | "Our system shows initial evidence that it could potentially provide risk assessment before clinical motor symptoms (Fig. 4a)." Está dicho con "quizá": correcto como hipótesis. | 2022 |
| 19 | Cifras con año: el dato es de 2022 (>2 años) | ✅ | guion | La voz dice "Lo publicaron en 2022" y la tarjeta lo muestra. Las cifras (noches, personas) salen antes en la voz sin año, pero el mismo shot fecha el estudio; aceptable. Ninguna cifra mezcla fuentes. | — |

## Correcciones necesarias

1. **#4 "Y ningún examen lo diagnostica"** (⚠️): el diagnóstico sí se hace con un examen neurológico. Propuesta de voz:
   «Y no hay un análisis de laboratorio que lo diagnostique.» (o «…y no hay un análisis que lo confirme por sí solo.»)
   Pantalla: cambiar el tubo "examen" tachado por "análisis de laboratorio" tachado. Fuente: Parkinson's Foundation, "There is not a specific lab or imaging test that can diagnose PD."
2. **#11 "a veces años antes del temblor"** (⚠️): las referencias que cita el artículo hablan de etapas tempranas en pacientes ya diagnosticados, no de años antes del temblor. Propuesta de voz:
   «Estudios lo ligan con músculos de respirar débiles y problemas al respirar dormido, desde etapas tempranas.»
   Pantalla: quitar la línea del tiempo "cambios al respirar → temblor"; poner pulmones con flechas débiles y un chip "desde etapas tempranas". (Fuente: Pokusa 2020, "respiratory problems, which often manifest in the early stages of the disease".)
3. **#13 "nueve de cada diez veces"** (⚠️ leve): la explicación del AUC es correcta en su forma (comparar uno con y uno sin), pero se midió por noches. Propuesta de voz (misma duración aprox.):
   «Lo publicaron en 2022: entre la noche de alguien con Parkinson y la de alguien sin, distinguía cuál era cuál nueve de cada diez veces; en un hospital que no conocía, más de ocho. Y estimaba qué tan avanzado iba.»
   Pantalla: las dos camitas ya representan noches; está bien. Mantener que nunca se diga "acierta el 90 %".

## Re-verificación (29 oct 2026, coordinador)
- «Y no hay un análisis de laboratorio que lo diagnostique.» ✅
- «…problemas al respirar dormido, desde etapas tempranas.» (sin «años antes del temblor») ✅
- «…entre la noche de alguien con Parkinson y la de alguien sin…» ✅
- Recortes de largo sin datos nuevos («unas neuronas», «casi doce mil noches», «no una prueba aprobada») ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
