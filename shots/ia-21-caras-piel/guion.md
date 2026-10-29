# Shot IA #21 · La misma app de caras falla más con unas que con otras

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #21 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion escrito, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N2 "El número" (1 de cada 3 contra menos de 1 de cada 100) con `Comparativa` de dos caras.
- **Gancho (de los 7):** #2 "Tú contra el de al lado": el mismo programa, distinto error según tu cara.
- **Duración:** voz 963 caracteres / ≈ 165 palabras (≈ 57.9 s) + cierre 3.5 s → **61.4 s** estimados (`estimar-escenas.mjs`).
- **Postura de la serie:** crítica con datos y con su parte buena (las empresas corrigieron tras el estudio). Todos los datos tienen más de 2 años y se dice el año (2018, 2019, 2020). No se menciona México.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Tú y el de al lado le enseñan su cara al mismo programa. A él casi nunca lo confunde; a ti, una de cada tres veces. | Fondo rosa; desde el cuadro 0 dos caras dibujadas (hombre de piel clara / mujer de piel oscura) frente a un mismo celular que las escanea con una línea láser. Sobre él: ✔ verde; sobre ti: "❌ 1 de cada 3". |
| 1 | Estudio | Lo midieron en 2018 Joy Buolamwini y Timnit Gebru: tres programas comerciales que adivinan si una cara es de hombre o de mujer. | `TarjetaEstudio` "2018 · Gender Shades · Buolamwini y Gebru (MIT / Microsoft Research)"; tres escáneres (IBM, Microsoft, Face++) con la pregunta "¿hombre o mujer?". Chip pequeño: "1,270 fotos de parlamentarios de 6 países". |
| 2 | Numeros | En hombres de piel clara fallaron menos del uno por ciento. En mujeres de piel oscura, hasta treinta y cinco. | `BarrasH`: "hombres de piel clara: ≤ 0.8 %" contra "mujeres de piel oscura: hasta 34.7 %". Número gigante "34.7 %". |
| 3 | Pregunta | ¿Por qué una máquina tendría favoritos? | **Re-gancho.** "?" gigante; Robert grande. |
| 4 | Datos | Una explicación probable: aprenden de ejemplos, y las colecciones de caras de referencia eran casi todas de piel clara. | Fondo de circuito; dos álbumes de caras (IJB-A y Adience) que se llenan: "79.6 %" y "86.2 %" de piel clara. Etiqueta "hipótesis" en la primera parte. |
| 5 | Mejora | Lo bueno: tras el estudio, en siete meses las tres empresas sacaron versiones que fallaban menos. | Los tres escáneres reciben "v2"; la barra de mujeres de piel oscura baja (IBM 34.7 → 17.0 %, Face++ 34.5 → 4.1 %, Microsoft 20.8 → 1.5 %; agosto de 2018). |
| 6 | Nist | Pero en 2019 el NIST de Estados Unidos probó ciento ochenta y nueve programas que reconocen quién eres: confundir a dos personas variaba hasta cien veces según su origen. | Tarjeta "2019 · NIST (EE. UU.) · 189 algoritmos · 18.27 millones de fotos"; dos caras distintas unidas por un "= ✔" equivocado; medidor ×1 → ×10 → ×100. |
| 7 | Williams | A Robert Williams le tocó: en 2020, en Detroit, una coincidencia facial equivocada lo dejó treinta horas detenido. | Foto borrosa de cámara de tienda → licencia de manejo → "COINCIDENCIA" en rojo; reloj que corre hasta "30 h". Chip: "2024: Detroit ya no puede arrestar solo por reconocimiento facial". |
| 8 | Cierre | Si una app te reconoce, recuerda: quizá no te ve igual que al de al lado. | **Regreso a la imagen del inicio**: las mismas dos caras frente al celular; ahora el escáner muestra las dos barras de error lado a lado. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua; el láser del escáner zumba, cada ✔/❌ con un "bip" distinto, las barras suben con un tono ascendente, los álbumes se llenan como cartas, el "v2" con un acorde que se abre, el reloj de Williams hace tic-tac grave.

## Fuentes (abiertas en el original el 29 oct 2026)

1. Buolamwini, J. y Gebru, T. "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification". *Proceedings of Machine Learning Research* 81: 77–91 (2018). https://proceedings.mlr.press/v81/buolamwini18a.html (PDF leído completo).
   > "We evaluate 3 commercial gender classification systems using our dataset and show that darker-skinned females are the most misclassified group (with error rates of up to 34.7%). The maximum error rate for lighter-skinned males is 0.8%."
   > "We find that these datasets are overwhelmingly composed of lighter-skinned subjects (79.6% for IJB-A and 86.2% for Adience)"
   > "PPB consists of 1270 individuals" · "parliamentarians from 6 countries" · "three African countries (Rwanda, Senegal, South Africa) and three European countries (Iceland, Finland, Sweden)"
   > "Microsoft and IBM classifiers perform best on lighter male faces (error rates of 0.0% and 0.3% respectively)"
   > Tabla 4: "All classifiers have the highest error rates for darker-skinned females (ranging from 20.8% for Microsoft to 34.7% for IBM)."
   > Clasificadores evaluados: "Microsoft, IBM, Face++".
2. Raji, I. D. y Buolamwini, J. "Actionable Auditing: Investigating the Impact of Publicly Naming Biased Performance Results of Commercial AI Products". AIES 2019 (AAAI/ACM). https://hdl.handle.net/1721.1/123456 (PDF leído).
   > "Within 7 months of the original audit, we find that all three targets released new API versions. All targets reduced accuracy disparities between males and females and darker and lighter-skinned subgroups, with the most significant update occurring for the darker-skinned female subgroup, that underwent a 17.7% - 30.4% reduction in error between audit periods."
   > Tabla 1 (agosto de 2018), error en mujeres de piel oscura: Face++ 4.1, Microsoft 1.52, IBM 16.97. "Kairos (22.5% error) and Amazon (31.4% error) have the current worst performance for the darker female subgroup."
3. Grother, P., Ngan, M. y Hanaoka, K. *Face Recognition Vendor Test (FRVT) Part 3: Demographic Effects*. NISTIR 8280, diciembre de 2019. https://doi.org/10.6028/NIST.IR.8280 (PDF leído).
   > "Together these datasets allowed us to process a total of 18.27 million images of 8.49 million people through 189 mostly commercial algorithms from 99 developers."
   > "Across demographics, false positives rates often vary by factors of 10 to beyond 100 times."
   > "We found empirical evidence for the existence of demographic differentials in the majority of contemporary face recognition algorithms that we evaluated."
   > "False positives are the erroneous association of samples of two persons"
   > "false positive rates are highest in West and East African and East Asian people, and lowest in Eastern European individuals… However, with a number of algorithms developed in China this effect is reversed"
   > "We found false positives to be higher in women than men"
4. ACLU, caso *Williams v. City of Detroit*. https://www.aclu.org/cases/williams-v-city-of-detroit-face-recognition-false-arrest
   > Usaron "a blurry, low-quality still image from the store's surveillance video" y la búsqueda arrojó "an expired driver's license photo of Mr. Williams"; lo sometieron a "thirty hours of detention in an overcrowded, dirty cell."
   ACLU, comunicado del 28 jun 2024: Williams fue "wrongfully arrested by the Detroit Police Department in 2020" … "after the department relied on incorrect results from facial recognition technology"; "Police will be prohibited from arresting people based solely on facial recognition results."
   ACLU, comunicado de 2020: "Robert Williams, a Black man and Michigan resident, was wrongfully arrested because of a false face recognition match".
   Michigan Public (28 jun 2024): "In January of 2020, Detroit Police arrested Williams at his Farmington Hills home".

## Notas
- "El mismo programa… a él casi nunca, a ti una de cada tres": en Gender Shades, el clasificador de IBM falló 0.3 % con hombres de piel clara y 34.7 % con mujeres de piel oscura (Tabla 4). "Una de cada tres" ≈ 34.7 %. Lo que "confunde" es el género (adivinar hombre/mujer), y la escena 1 lo aclara.
- "Menos del uno por ciento" = error máximo en hombres de piel clara (0.8 %); "hasta treinta y cinco" redondea 34.7 %.
- "Colecciones de caras de referencia" = los bancos de prueba IJB-A (79.6 % piel clara) y Adience (86.2 %). Que eso cause el sesgo de los programas comerciales se dice como **hipótesis** ("una explicación probable"); el artículo no conoce los datos de entrenamiento de las empresas.
- "En siete meses… versiones que fallaban menos": Raji y Buolamwini 2019 (versiones nuevas en 7 meses; mediciones de agosto de 2018).
- NIST mide otra cosa: reconocer quién eres (falsos positivos = confundir a dos personas). "Hasta cien veces" se queda corto respecto a "de 10 a más de 100 veces"; "según su origen" = país de nacimiento/raza en sus datos. No es todos los algoritmos: "the majority".
- Williams: arrestado en enero de 2020 por la policía de Detroit (en su casa de Farmington Hills); 30 horas de detención según la ACLU. No se dice el monto del acuerdo de 2024 (la ACLU no lo publica en esas páginas).
- No se menciona México. El dibujo es esquemático; las caras son ilustrativas, no fotos de los estudios.
