# Shot IA #29 · El traductor que convierte a la ingeniera en «él»

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #29 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A · guion listo para verificación independiente. Falta: verificación, animación, Robert en pantalla, `publicacion.md`.
- **Formato:** N5 "El experimento" (tú haces la prueba en el traductor) + un toque de N2 (72 % contra 4 %).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: «Ese "él" no es un error de dedo: es lo que el traductor aprendió.»
- **Duración:** voz 954 caracteres / 172 palabras (≈ 58.2 s) + cierre 3.5 s → **61.7 s** estimado.
- **Postura de la serie:** crítica con datos y reconociendo lo que Google corrigió. Los datos de Prates son de **2018** y los de Stanovsky de **2019**, y así se dice; no se afirma cómo traduce Google hoy.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese «él» no es un error de dedo: es lo que el traductor aprendió. Haz la prueba. | Fondo cian; desde el cuadro 0 un celular con un traductor: la palabra «he» parpadea resaltada en rojo; un dedo intenta borrarla y vuelve a salir. |
| 1 | Prueba | En húngaro, una palabra sirve para él y para ella. Escribe «es ingeniero» en húngaro y tradúcelo. | La palabra «ő» crece y se parte en dos siluetas (él / ella). Se teclea «ő egy mérnök» letra por letra (chip: húngaro → inglés). |
| 1 | Prueba | En 2018, Google respondía «he», él. Con «enfermera», «she», ella. | Sale «he's an engineer» con casco; cambia a «ő egy ápolónő» → «she's a nurse» con cofia. Chip «2018». (Dibujo del traductor esquemático, no la interfaz real.) |
| 2 | Estudio | En Brasil, Prates, Avelar y Lamb lo probaron con más de mil profesiones en doce idiomas sin género. | `TarjetaEstudio`: «2018 · UFRGS, Brasil · Prates, Avelar y Lamb · Neural Computing and Applications». Lluvia de fichas de profesiones (1019) y 12 banderitas de idioma. |
| 3 | Resultado | En ciencia y tecnología salió «él» setenta y dos por ciento. «Ella», solo cuatro. | Barras de ciencia y tecnología (STEM): «él 72 %» contra «ella 4 %» (el resto: neutro o sin pronombre). |
| 4 | Pregunta | ¿Y si solo copia cuántas mujeres hay en cada trabajo? | **Re-gancho.** «?» gigante; Robert grande, pensativo. |
| 5 | Realidad | No: salía «ella» doce por ciento, y en esos trabajos de Estados Unidos había, en promedio, casi treinta y seis por ciento de mujeres. | `Comparativa`: «traductor: ella 12 %» contra «trabajos reales (EE. UU.): 36 % mujeres»; la barra del traductor se queda corta. |
| 6 | Google | En diciembre de 2018, Google empezó a dar versión femenina y masculina en algunos idiomas. | El celular muestra dos resultados: «she is a doctor» / «he is a doctor» (ejemplo del turco del blog de Google). Chip «dic 2018 · algunos idiomas». |
| 7 | Espanol | En español casi siempre hay que elegir: el doctor o la doctora. | «The doctor» entra a una bifurcación: «el doctor» / «la doctora»; un foco de duda sobre la flecha. |
| 8 | Seattle | En 2019, en Seattle, con frases que dejaban claro el género, Google acertó al español solo cincuenta y tres por ciento. | Tarjeta «2019 · Universidad de Washington, Seattle · Stanovsky, Smith y Zettlemoyer · ACL». Frase de ejemplo: «The doctor asked the nurse to help **her**» → «**El** doctor le pidió a la enfermera…» (tachado rojo en «El»). `Medidor` en 53 %. |
| 9 | Cierre | Si el traductor te dice «él», pregúntate: ¿lo dijo la frase o lo aprendió? | **Regreso a la imagen del inicio:** el mismo celular con «he» en rojo; ahora aparece al lado «she» y un signo de pregunta; la palabra deja de parpadear. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (tensa mientras dura el sesgo, se abre en «Google empezó a dar versión femenina y masculina»); tecleo en cada letra, «ding» del traductor al salir el resultado, cascada suave en la lluvia de profesiones, barras que suben con un barrido, «?» con un golpe sordo, bifurcación con un zumbido doble, tachón rojo con un rasguño.

## Fuentes (cada cifra se abrió en la fuente original el 29 oct 2026)

1. Prates, M. O. R., Avelar, P. H. C. y Lamb, L. C. "Assessing gender bias in machine translation: a case study with Google Translate". *Neural Computing and Applications* 32: 6363–6381 (publicado en línea el 27 mar 2019; volumen de 2020). DOI 10.1007/s00521-019-04144-6 · preprint arXiv:1809.02208 (v4, 11 mar 2019; PDF completo leído). Universidade Federal do Rio Grande do Sul (UFRGS), Brasil. Experimentos de 2018.
   > "we start with a comprehensive list of job positions from the U.S. Bureau of Labor Statistics (BLS) and used it in order to build sentences in constructions like "He/She is an Engineer" … in 12 different gender neutral languages such as Hungarian, Chinese, Yoruba, and several others. We translate these sentences into English using the Google Translate API"
   > "Google Translate exhibits a strong tendency towards male defaults, in particular for fields typically associated to unbalanced gender distribution or stereotypes such as STEM (Science, Technology, Engineering and Mathematics) jobs."
   > "we can translate sentences such as the Hungarian "ő egy ápolónő", where "ápolónő" translates to "nurse" and "ő" is a gender-neutral pronoun meaning either he, she or it, to English, yielding in this example the result "she's a nurse" on Google Translate. As Figure 1 clearly shows, the same template yields a male pronoun when "nurse" is replaced by "engineer"."
   > Tabla 2: "Total … 1019" ocupaciones (41.3 % de participación femenina en esa tabla).
   > "the large asymmetry between gender pronouns in these fields (72% of male defaults) to that of more evenly distributed fields such as healthcare (50%)." · Tabla 7: "STEM 4.219 [female %] 71.624 [male %] 11.181 [neutral %]" · "rows do not in general add up to 100%, as there is a fair amount of translated sentences for which we cannot obtain a gender pronoun."
   > "Averaged over occupations and languages, sentences are translated with female pronouns 11.76% of the time. In contrast, the gender participation frequency for female workers averaged over all occupations in the BLS report yields a consistently larger figure of 35.94%."
   > "All experiments reported here were conducted on April 2018." (en la sección 9 dicen "as of August 2018"; en ambos casos, 2018).
   > "On December 6, 2018 the company's policy changed … which included a new feature presenting the user with a feminine as well as a masculine official translation".
2. Kuczmarski, J. (Product Manager, Google Translate). "Reducing gender bias in Google Translate". Blog oficial de Google, 6 dic 2018. https://blog.google/products/translate/reducing-gender-bias-google-translate/
   > "you'll get both a feminine and masculine translation for a single word … when translating from English into French, Italian, Portuguese or Spanish."
   > "You'll also get both translations when translating phrases and sentences from Turkish to English." (ejemplo del post: «o bir doktor» → «she is a doctor» / «he is a doctor»).
   > "it would skew masculine for words like "strong" or "doctor," and feminine for other words, like "nurse" or "beautiful.""
3. Stanovsky, G., Smith, N. A. y Zettlemoyer, L. "Evaluating Gender Bias in Machine Translation". *Proceedings of the 57th Annual Meeting of the ACL*, pp. 1679–1684, Florencia, 2019. Paul G. Allen School, University of Washington, Seattle. https://aclanthology.org/P19-1164.pdf
   > "English sentences which cast participants into non-stereotypical gender roles (e.g., "The doctor asked the nurse to help her in the operation")"
   > Tabla 2, Google Translate, ES: "Acc 53.1" — "Acc indicates overall gender accuracy (% of instances the translation had the correct gender)".
   > Figura 1: "El doctor le pidio a la enfermera que le ayudara con el procedimiento" (error de género: la doctora se tradujo como «el doctor»).
   > Figura 2 (Google, ES): 67 % en roles estereotípicos y 46 % en no estereotípicos — "The performance on the stereotypical portion of WinoMT is consistently better than that on the non-stereotypical portion."

## Notas
- "Más de mil profesiones" = 1019 ocupaciones de la lista de la Oficina de Estadísticas Laborales de EE. UU.
- "Ciencia y tecnología" = la categoría STEM del estudio (ciencia, tecnología, ingeniería y matemáticas). "Setenta y dos" redondea 71.6 % (el propio artículo dice 72 %); "cuatro" redondea 4.2 %. El resto fueron pronombres neutros o frases sin pronombre identificable.
- "Doce por ciento" redondea 11.76 % (promedio de todas las profesiones y los 12 idiomas, no solo STEM). "Casi treinta y seis" = 35.94 %, promedio de participación femenina en esas ocupaciones según la BLS.
- "Una palabra sirve para él y para ella": el pronombre húngaro «ő» (el artículo: "he, she or it").
- "Algunos idiomas" en la respuesta de Google: en dic 2018 solo palabras sueltas del inglés al francés, italiano, portugués y español, y frases del turco al inglés.
- "En español casi siempre hay que elegir": en español los sustantivos de persona y sus artículos suelen llevar género (el doctor / la doctora); es lo que muestra la Figura 1 de Stanovsky et al.
- "Cincuenta y tres por ciento" = exactitud de género de Google Translate inglés → español en WinoMT (2019). No se dice que hoy siga igual.
- La pantalla del traductor es un dibujo esquemático, no la interfaz real de Google.
