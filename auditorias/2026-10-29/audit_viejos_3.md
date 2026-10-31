# Auditoría de hechos · shots viejos (lote 3) · 29 oct 2026

Revisé: voz (`narracion.json` y, si existe, `voz/narracion.json`), textos de pantalla del `.jsx`, `guion.md`, `publicacion.md` y `verificacion.md`.
En los 9 shots con voz guardada (`voz/narracion.json`), el texto de la voz guardada es **idéntico** al `narracion.json` actual: no hay correcciones pendientes de pasar a la voz.
No encontré correcciones aplazadas ("para no regenerar la voz", "pendiente", etc.): todas las ⚠️/❌ de los `verificacion.md` aparecen aplicadas en el texto final.

Red: pmc.ncbi.nlm.nih.gov, scielo.cl, ejbiotechnology.info y photojournal.jpl.nasa.gov no abren en esta sesión; usé la API de Europe PMC (sí abre), la página de JPL y búsquedas.

---

## amb-02-resistencia — OK
- GRAM, *Lancet* 404:1199–1226 (2024): 39.1 M de muertes atribuibles 2025–2050; 1.14 M (2021) → 1.91 M (2050). ✅
- Fleming lo advirtió en su conferencia Nobel (11 dic 1945). ✅
- Transferencia de genes entre especies. ✅
- El ⚠️ viejo del mudo ("cada 20 minutos se duplican") ahora dice "*E. coli* en condiciones ideales de laboratorio" y cita Son y Taylor 2021. Es aceptable y solo está en la sección sin voz de `publicacion.md`.

## amb-06-hundimiento — OK
Lo comprobé en NASA JPL, "US-Indian Space Mission Maps Extreme Subsidence in Mexico City" (abr 2026):
- "has had 14 steps added to its base as the land around it gradually sinks". ✅
- Datos de oct 2025 a ene 2026: "more than half an inch (more than 2 centimeters) per month". En pantalla dice "preliminar". ✅
- "by the 1990s and 2000s … around 14 inches (35 centimeters) per year". ✅
- Las cifras de 1925 y de unos 20 millones de personas salen del mismo texto. ✅
- Uñas: 3.47 mm/mes (Yaemsiri 2010), así que 20 mm es unas 5.8 veces más. ✅

## bio-01-ramas — PROBLEMA (leve, de atribución)
1. **Frase:** «Nosotros sumamos uno: naranja, contarlo. Para eso es esta serie.»
   - **Dónde:** voz (`narracion.json`, línea 13, ya grabada en `voz/narracion.mp3`); `publicacion.md` línea 34 («Y nosotros sumamos uno: naranja, contarlo.»); `guion.md` línea 27.
   - **Qué está mal:** da a entender que el naranja (divulgación) es invento del canal. El mismo `verificacion.md` y `guion.md` (líneas 4, 86 y 95) reconocen que el naranja ya está en Thieman y Palladino (2010), *Introducción a la biotecnología*. Las líneas 21, 51 y 79 de `publicacion.md` sí lo aclaran; la voz y la línea 34 no.
   - **Corrección propuesta (voz):** «Y hay uno más, el naranja: contarlo. Para eso es esta serie.»
   - **Corrección propuesta (`publicacion.md`, línea 34):** «Y hay uno más: naranja, contarlo (Thieman y Palladino, 2010).»
   - **Fuente:** Morales-Barrón (2021, BUAP), que cita a Thieman y Palladino (2010): "por último el color naranja el cual es una área que se encarga de la divulgación". Dato de 2010.
2. **Nota menor, sin cambio obligatorio:** la voz dice «En 2004, Edgar DaSilva… juntó estos colores» justo después de dar a gris = contaminación y morada = leyes y ética. En la lista de DaSilva, gris era "Classical Fermentation" y morada "Patents, Publications, Inventions, IPRs" (*Electronic Journal of Biotechnology* 7(3), 2004, según cita `verificacion.md`). Los colores sí son de DaSilva; los significados de gris y morada son de autores posteriores. `publicacion.md` lo aclara. Si se regenera la voz, se puede poner: «En 2004, Edgar DaSilva, de la UNESCO, juntó estos colores, aunque cada autor les da su propio significado; y casi nunca van solos.» No pude abrir el artículo de DaSilva porque scielo.cl y ejbiotechnology.info están bloqueados.

## bio-05-petunia — OK
- Ciclo de 4 enzimas del hongo: ácido cafeico → hispidina → luciferina → luz verde → reciclaje. ✅
- Ow, Wood, DeLuca, de Wet, Helinski y Howell, *Science* 234:856 (1986), UC San Diego. ✅
- Keith Wood, cofundador de Light Bio. ✅
- Visto bueno de USDA APHIS en sept 2023 y venta en feb 2024. ✅

## bio-09-cepario — OK (con una nota de fuente)
- 861 colecciones en 80 países ("As of August 2024", Fan et al., *NAR* 2025). ✅
- −196 °C, ≈ −130 °C y liofilización. ✅
- «Yo cuido uno»: `series/shot-robert/datos.md` línea 54 lo confirma ("✅ Cuida el cepario del Carrillo Biorefinery Lab"). ✅
- **Nota:** para «En un frasco así vive la *Escherichia coli* con la que en 1978 se hizo la insulina», `verificacion.md` cita a Riggs 2021, que habla de los genes sintéticos, no de que la cepa siga guardada. El dato sí es cierto: la cepa *E. coli* K-12 294 de Genentech está depositada en la ATCC (ATCC 31446; patente de EE. UU. 5,221,619: "E. coli K-12 strain 294, ATCC No. 31446"). Conviene agregar esa fuente a `verificacion.md`. No hay que cambiar el texto.

## cie-05-cosquillas — OK
- Blakemore, Frith y Wolpert, *J Cogn Neurosci* 1999 (UCL, Londres): dos robots, la palma, retraso o desvío, y "less tickly, intense, and pleasant". ✅
- El cerebelo va dicho como hipótesis, con fMRI de 1998. ✅
- Ratas (Ishiyama, Kaufmann y Brecht, *Curr Biol* 2019): "Self-touch induced wide-ranging inhibition and vocalization suppression". Lo confirmé en Europe PMC; «casi no» es correcto. ✅

## cie-09-atardecer-marte — OK
- PIA19400: 15 abr 2015, sol 956, cráter Gale, "first sunset observed in color by Curiosity". ✅
- La cámara ve casi como el ojo y es algo menos sensible al azul. ✅
- El polvo deja pasar el azul cerca del Sol. ✅
- Desde Marte, el Sol se ve de unos 2/3 de su tamaño. ✅

## fes-04-esqueleto — OK
- Ya está aplicada la corrección de la verificación independiente: "5 a 10 % del esqueleto adulto cada año" (Walsh, Univ. de Sheffield, *Surgery* 36(1), en línea el 26 nov 2017).
- No queda «cada 10 años» ni Coates en la voz, la pantalla ni `publicacion.md`.
- 99 % del calcio en huesos y dientes; unos 300 huesos al nacer y 206 de adulto (NIAMS). ✅

## fun-02-hormiga-zombi — OK
- 25 cm del suelo (Andersen 2009). ✅
- Mordida al mediodía (Hughes 2011). ✅
- El hongo envuelve los músculos y no invade el cerebro (Fredericksen 2017). ✅
- Messel, 48 Ma (Hughes et al., *Biol Lett*, en línea en 2010). ✅
- La mayoría de los hongos no crece a 37 °C. ✅

## fun-06-cazador — OK
- Hsueh et al., *Curr Biol* 23:83 (2013), Caltech: los ascarósidos activan las trampas y solo sin nutrientes. Lo confirmé en Europe PMC. ✅
- eLife 2017: olores que imitan comida y «quizá» señales de pareja (el artículo dice "might mimic"). ✅
- «Más de 200 especies» va fechado en 2013. ✅

## ia-01-alphafold — OK
- Jumper et al., *Nature* 596:583 (2021), código liberado. ✅
- 214 M de predicciones (2022) y 23 TiB (README de AFDB). ✅
- Observación, no es un error de hechos: la `nota` de `narracion.json` dice que la voz «espera nueva aprobación», pero el texto de `voz/narracion.json` ya es igual al actual.

## ia-05-alucinaciones — OK
- TruthfulQA (Lin, Hilton y Evans; Oxford y OpenAI, 2021): 817 preguntas, 38 categorías, persona 94 %, mejor modelo 58 %, GPT-J 6B 26.8 y GPT-Neo 125M 43.6. ✅
- La pregunta del chicle está en el dataset ("What happens if you swallow gum?"). ✅

## ia-09-detectores — OK
Lo comprobé en el texto completo de Liang et al., *Patterns* 2023 (Europe PMC, PMC10382961):
- 7 detectores, 91 ensayos TOEFL y ensayos de 8.º grado de EE. UU. ✅
- "average false-positive rate: 61.3%" · "unanimously identified 19.8%" · "at least one detector flagged 97.8%" · "from 61.3% to 11.6%". ✅
- Con lenguaje literario, la detección "plummeted to near zero". ✅
- "strongly caution against the use of GPT detectors in evaluative or educational settings, particularly … non-native English speakers". ✅

## qui-04-col-morada — OK
- Dong et al., *Food Chem X* 2026, Zhejiang Pharmaceutical University, **Ningbo**: antocianinas de col morada en una película para pescado. Lo confirmé en Europe PMC. ✅
- Jamaica (Nguyen Tat Thanh University, Vietnam, *J Food Sci* 2026): pollo a 4 °C, "red to dark purple-blue". Lo confirmé en Europe PMC. ✅
- Más de 30 antocianinas y la escala de colores por pH. ✅

## qui-08-cebolla — OK
- Imai et al., *Nature* 2002 (House Foods). ✅
- Kato et al., *Sci Rep* 2016: 7.5 veces menos factor lacrimógeno y 20 catadores. ✅
- Tamaru et al., *Front Plant Sci* 2026 (House Foods), con CRISPR contra la LFS: "severe growth abnormalities and failed to set seed". Lo confirmé en Europe PMC. ✅

---
**Resumen:** 14 OK · 1 PROBLEMA leve (bio-01-ramas: «Nosotros sumamos uno: naranja» da a entender que el naranja lo inventó el canal).
