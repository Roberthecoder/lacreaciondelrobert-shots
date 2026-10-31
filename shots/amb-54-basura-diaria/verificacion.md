# Verificación de hechos · amb-54-basura-diaria

- Fecha: 29 oct 2026
- Verificador: subagente independiente (no escribió el guion)
- Fuentes abiertas: PDF completo del DBGIR 2026 (SEMARNAT/INECC, "Abril, 2026", copia CeIBA: http://ceiba.org.mx/storage/app/media/publicaciones/semarnat/Diagn_stico_B_sico_Gesti_n_Integral_Residuos.pdf), convertido a texto y revisado tabla por tabla; comunicado SEMARNAT del 20 may 2026 (https://www.gob.mx/semarnat/prensa/semarnat-presenta-diagnostico-nacional-para-transformar-gestion-de-residuos-y-avanzar-hacia-la-economia-circular).
- Año de los datos: el DBGIR 2026 usa el CNGMD 2023, "que recupera información del año 2022, por lo que se utilizó ese año de referencia" (pág. 30). La composición usa CNGMD 2019, 2021 y 2023 + Banobras.

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| "La basura de un año de tu vida: casi cuatrocientos kilos" (contador 0 → 393 kg) | ✅ (cuenta: 1.076 × 365 = 392.7 kg; es promedio nacional con residuos no domésticos, lo aclara la línea siguiente) | DBGIR 2026, Tabla 7 y 4.2.1 | "La generación per cápita calculada fue de 1.076 kg/hab/día y la generación total de residuos en el país se estima en 139,902 t/día." | 2022 |
| "Poco más de un kilo por persona al día, contando casas, calles y negocios" (pantalla 1.076; casa 0.746; calle y negocio 0.330) | ⚠️ cifra correcta, pero es dato de 2022 dicho en presente sin año (regla del canal: >2 años se dice) | DBGIR 2026, 4.2.1 y Tabla 9 | "considerando la suma de los residuos domésticos y no domésticos." · "residuos domésticos alcanzó un valor promedio de 0.746 kg/hab/día, mientras que la generación de no domésticos se estimó en 0.330 kg/hab/día." · no domésticos = "vías y espacios públicos o establecimientos comerciales, de servicios e institucionales" | 2022 (población de referencia "Proyección de población a mitad de año, 2022") |
| "Cuatro de cada diez partes son orgánicas" (pantalla 40 %) | ✅ (40.15 %) | DBGIR 2026, Tabla 7 | "el 40.15% a residuos orgánicos" | CNGMD 2019–2023 (datos hasta 2022) |
| "Sobre todo comida y jardín" | ✅ (29.189 + 8.344 = 37.5 de 40.15) | DBGIR 2026, Tabla 14 | "Residuos alimenticios 29.189 Orgánicos · Residuos de jardinería 8.344 Orgánicos" | idem |
| "Más de un tercio se podría aprovechar: plástico, cartón, papel, vidrio, latas" (pantalla 36 %) | ✅ (36.26 % > 33.3 %; los 5 materiales están en la categoría) | DBGIR 2026, Tablas 7 y 14 | "El 36.26% corresponde a residuos susceptibles de aprovechamiento" · "Plástico rígido y de película 7.691 … Cartón 6.698 … Papel 5.364 … Vidrio transparente 3.972 … Lata 1.654 Susceptibles de aprovechamiento" | idem |
| Pantalla: "otros 24 %" (pañales, trapo, loza) | ✅ (23.59 %) | DBGIR 2026, Tablas 7 y 14 | "el 23.59% a “otros residuos"" · "Pañal desechable 5.488 Otros · Trapo 2.1 Otros · Loza cerámica 0.465 Otros" | idem |
| "El camión solo recoge setenta y siete de cada cien kilos" (pantalla 77 de 100) | ✅ (77.30 %; base = lo generado, correcto) | DBGIR 2026, Tabla 7 y sección recolección | "De los residuos generados se recolectan 108,146 t/día, para una cobertura a nivel nacional del 77.30%." | 2022 |
| "Un diagnóstico federal de 2026, con datos de 2022" (chip SEMARNAT · INECC · DBGIR 2026) | ✅ | DBGIR 2026 portada y pág. 30; comunicado 20 may 2026 | "Abril, 2026" · "edición 2023, que recupera información del año 2022" · "El DBGIR 2026 fue elaborado por la Secretaría de Medio Ambiente y Recursos Naturales (Semarnat), en coordinación con el Instituto Nacional de Ecología y Cambio Climático (INECC)" | 2026 (publicación) / 2022 (datos) |
| "Analizó dos mil doscientos cincuenta sitios de basura: solo cincuenta y dos son rellenos sanitarios" (pantalla 52 de 2,250) | ✅ (clasificación del propio diagnóstico; su análisis no incluye la selección del sitio, apartado 6 de la norma) | DBGIR 2026, pág. 64 y Tabla 35; comunicado | "de los 2,250 sitios de disposición final (SDF), únicamente 52 (2.31%) cumplen con todos los requisitos establecidos en la norma y son clasificados como Relleno Sanitario" · comunicado: "únicamente 52 operan como rellenos sanitarios con criterios adecuados de disposición final." | 2022 |
| "Ahí entran solo quince de cada cien kilos" (pantalla 15 %) | ⚠️ imprecisa: la base no se dice y por contexto suena a "de lo que se lleva el camión". 15,254.6 ÷ 98,046.65 (lo que llega a los 2,250 sitios) = 15.56 % ✔; pero ÷ 108,146 (lo recolectado) = 14.1 % y ÷ 139,902 (lo generado) = 10.9 %. Además el propio DBGIR se contradice: Tabla 7 llama al 15.6 % "del total de residuos generados" (falso por cuenta) y en pág. ~67 llama al 10.9 % "de los residuos totales dispuestos" (también falso por cuenta); en pág. 65 lo dice bien: "10.9% del total de residuos generados". El guion (nota de Fuentes) dice que la voz usa "de lo que llega a esos sitios", pero `narracion.json` NO lo dice. | DBGIR 2026, Tabla 7, Tabla 34 (total 98,046.650), Tabla 35 (total 15,254.605), pág. 65 | Tabla 7: "En el año 2022 ingresan en los 2,250 Sitios de Disposición Final (SDF), un promedio de 98,047 t/día" · "Relleno sanitario = 52 que reciben 15,254.605 t/día equivalente al 15.6% del total de residuos generados en el país." · pág. 65: "Los residuos depositados en rellenos sanitarios suman 15,254.6 t/día, o, 10.9% del total de residuos generados en México" | 2022 |
| "Casi ochenta y cinco van a sitios que no cumplen la norma" (pantalla 85 %, chip NOM-083-SEMARNAT-2003) | ✅ (82,793 ÷ 98,047 = 84.4 %; base = lo que llega a los sitios; "no cumplen" según el análisis del diagnóstico). Solo queda bien si la frase anterior aclara la misma base (ver corrección 1). | DBGIR 2026, tabla de perspectivas (pág. ~195) y Tabla 7 | "sitios de disposición final que no cumplen la regulación aplicable y que reciben 82,793 t/día (84.4%) del total de residuos." · "El resto de los sitios de disposición final son identificados como No. Controlado con base en la NOM-083-SEMARNAT-2003." | 2022 |
| "En Jalisco, de ocho mil cuatrocientas toneladas que llegan a esos sitios cada día, menos de cien van a un relleno sanitario" | ✅ (8,436.905 t/día en 123 sitios; 99.839 t/día en 6 rellenos = 1.2 %) | DBGIR 2026, Tabla 34 y Tabla 35 | Tabla 34: "Jalisco 2 9 11 43 58 123 8,436.905" · Tabla 35: "Jalisco 0 0 1 1 4 6 99.839" | 2022 |
| Pantalla Jalisco: columna "8,437 t/día" y rayita "100" | ⚠️ menor: la rayita dice "100" y la voz "menos de cien" (el dato es 99.8) | DBGIR 2026, Tabla 35 | "99.839" | 2022 |
| "Y solo el cinco por ciento recibe algún tratamiento" (barra 5 de 100) | ⚠️ cifra correcta, pero la frase va justo después de Jalisco y no dice de qué: se puede entender "5 % de Jalisco". Es nacional y de toda la basura. | DBGIR 2026, pág. ~223; comunicado | "Apenas el 5% de los residuos se trata y el 72% no recibe valorización (CNGMD, 2023)" · comunicado: "sólo 5% de los residuos recibe algún tipo de tratamiento" | 2022 (CNGMD 2023) |
| "Tu pila … no desaparece al sacar la bolsa: casi siempre, solo cambia de lugar" | ✅ como conclusión (95 % sin tratamiento; 77 % recolectado, y lo recolectado va casi todo a sitios de disposición) | DBGIR 2026 (mismas cifras) | "Apenas el 5% de los residuos se trata" | 2022 |
| Pantalla: mapa con 2,250 puntos y 52 verdes; corte de relleno (geomembrana, biogás) vs. sitio no controlado | ✅ esquemático (debe decir "esquema"); los elementos de relleno coinciden con los requisitos que revisa el diagnóstico (geomembrana, captación de lixiviados y biogás) | DBGIR 2026, Tabla 7 "Características de los SDF" | "329 sitios (14.62%) cuentan con geomembrana" · "267 sitios (11.87%) cuentan con infraestructura para la captura de biogás." | 2022 |

## Correcciones necesarias

1. **⚠️ Base del 15 % (escena Destino).** La voz no dice de qué son los "cien kilos" y, tras "¿Y a dónde va lo que sí se lleva?", suena a "de lo que recoge el camión" (eso sería 14 %, y de todo lo generado sería 11 %). El 15.6 % solo es correcto sobre lo que llega a los 2,250 sitios. Texto sugerido (misma longitud aprox.):
   > "De cada cien kilos que llegan a esos sitios, solo quince entran a un relleno; casi ochenta y cinco van a sitios que no cumplen la norma."
   En pantalla: "15 % de lo que llega a los sitios". No citar el 15.6 % como "del total generado" (es un error del propio DBGIR en su Tabla 7). Actualizar también la nota del guion, que dice que la voz ya lo aclara y no es así.
2. **⚠️ Año de los datos en las primeras líneas (escena Dia).** El kilo por persona, la composición y el 77 % son datos de 2022 (hace ~4 años) dichos en presente; el año aparece hasta la escena 6. Texto sugerido:
   > "Con datos de 2022, en México tocamos a poco más de un kilo por persona al día, contando casas, calles y negocios."
   (o poner chip "datos 2022" desde la escena 1 y decirlo en voz). Ajustar la duración si hace falta.
3. **⚠️ 5 % sin base (escena Tratamiento).** Texto sugerido:
   > "Y en todo el país, solo el cinco por ciento de la basura recibe algún tratamiento."
4. **⚠️ menor, pantalla Jalisco.** Cambiar la rayita "100" por "< 100" o "99.8 t/día" para que no contradiga "menos de cien".

Todo lo demás (1.076 kg, 392.7 kg/año, 40 %, comida y jardín, 36 %, 24 %, 77 %, 52 de 2,250, 84.4 %, Jalisco 8,437 → 99.8, 5 %) está verificado en el PDF original con las cuentas correctas.

## Segunda ronda (29 oct 2026)

Revisé el `narracion.json` y la tabla del guion ya corregidos contra el mismo PDF del DBGIR 2026.

| Cambio | Veredicto | Nota |
|---|---|---|
| Dia: "Con datos de 2022, en México tocamos a poco más de un kilo por persona al día…" | ✅ | Ya dice el año (corrección 2). |
| Bolsa: "Cuatro de cada diez partes son orgánicas, sobre todo comida y jardín." | ✅ | Solo es un recorte; 40.15 %, 29.189 + 8.344. |
| Material: "plástico, cartón, vidrio, latas" (sin papel) | ✅ | Los 4 están en "susceptibles de aprovechamiento" (Tabla 14). En pantalla sigue la hoja (papel 5.364 %, también aprovechable), lo cual es correcto. |
| Diagnostico: "Un diagnóstico de 2026 revisó dos mil doscientos cincuenta sitios…: solo cincuenta y dos son rellenos sanitarios." | ✅ | El año del dato (2022) ya sale en Dia y en el chip "(datos 2022)". |
| Destino: "De cada cien kilos que llegan a esos sitios, solo quince entran a un relleno; casi ochenta y cinco, a sitios que no cumplen la norma." | ✅ | La base es correcta: 15,254.6 ÷ 98,046.65 = 15.6 %; 82,793 ÷ 98,047 = 84.4 % (corrección 1). |
| Jalisco: "llegan ocho mil cuatrocientas toneladas diarias a esos sitios; menos de cien van a un relleno." En pantalla: "< 100 t/día (99.8 t/día)" | ✅ | Tablas 34 y 35: 8,436.905 y 99.839 (corrección 4). |
| Tratamiento: "Y en todo el país, solo el cinco por ciento de la basura recibe algún tratamiento." | ✅ | "Apenas el 5% de los residuos se trata" (corrección 3). |
| Cierre: "Tu pila de cuatrocientos kilos no desaparece…: casi siempre, solo cambia de lugar." | ✅ | Solo es un recorte; la conclusión se sostiene con el 5 % tratado. |

Ya no quedan ❌ ni ⚠️ abiertas.

VEREDICTO: APROBADO
