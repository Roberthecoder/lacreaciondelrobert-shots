# Verificación de hechos · Shot Científico #06 · Bacterias casi 1 a 1

- **Fecha:** 28 oct 2026.
- **Quién verificó:** esta sesión no tiene herramienta para lanzar subagentes (Task/Agent); la verificación la hizo la misma sesión en
  una pasada aparte y escéptica, **abriendo el texto completo** del artículo (Europe PMC, PMC4991899) y los resúmenes en PubMed.
- **Primera pasada:** 2 afirmaciones se marcaron ⚠️ y se corrigieron antes de animar (abajo, "Correcciones").

## Afirmaciones (voz y pantalla)

| # | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Se dice que hay 10 bacterias por cada célula tuya; la cuenta real es casi 1 a 1 | ✅ | Sender, Fuchs y Milo, *Cell* 164: 337–340 (PMID 26824647) | "It is often presented as common knowledge that, in the human body, bacteria outnumber human cells by a ratio of at least 10:1. Revisiting the question, we find that the ratio is much closer to 1:1." | 2016 |
| 2 | El 10 a 1 salió de una cuenta rápida de los años setenta, de una sola frase | ✅ | Sender, Fuchs y Milo, *PLoS Biol.* 14: e1002533 (PMC4991899) | "The primary source for the often cited value of ~10^14 bacteria in the body dates back to the 1970s and only consists of a sentence-long 'derivation'" · "the ubiquitous statements regarding 10^14–10^15 bacteria residing in our body trace back to an old back-of-the-envelope calculation" | 2016 (sobre la cuenta de los 70) |
| 3 | Suponía un litro de intestino lleno de bacterias, de punta a punta | ✅ | PMC4991899 | "which assumes the volume of the alimentary tract to be 1 liter, and multiplies this volume by the number density of bacteria" · "based on assuming a constant bacterial density over the 1 liter of alimentary tract volume" | 2016 |
| 4 | Casi todas viven en el colon, que guarda unos 400 mL | ✅ | PMC4991899 | "within the alimentary tract, the colon is the only substantial contributor to the total bacterial population" · "Values for a reference adult man averaged 0.4 L" | 2016 |
| 5 | Unos 30 billones de células humanas | ✅ | PMC4991899 (resumen) | "revise past estimates to 3.0·10^13 human cells" · "about 30 trillion human cells" (30 trillion = 30 billones en español) | 2016 |
| 6 | El 84 % son glóbulos rojos, que no tienen núcleo | ✅ | PMC4991899 | "The cell count is dominated by red blood cells (84%)" · "the dominant population of non-nucleated red blood cells" | 2016 |
| 7 | Unos 38 billones de bacterias; 1.3 por cada célula tuya, casi una a una | ✅ | PMC4991899 | "about 38 trillion bacteria" · "we can give an updated estimate of B/H = 1.3… This B/H value of about 1:1… should replace the 10:1 or 100:1 values" | 2016 |
| 8 | Lo calculó en 2016 el equipo de Ron Milo, del Instituto Weizmann, en Israel | ✅ | PMID 26824647 / 27541692 (afiliaciones) | "Department of Plant and Environmental Sciences, Weizmann Institute of Science, Rehovot, Israel… ron.milo@weizmann.ac.il" | 2016 |
| 9 | Todas tus bacterias juntas pesan unos 200 g, no los kilos que se decían | ✅ | PMC4991899 | "their total mass is about 0.2 kg" · "significantly updating previous statements that 1%–3% of the body mass is composed of bacteria or that a normal human hosts 1–3 kg of bacteria" | 2016 |
| 10 | Cada vez que vas al baño, el colon pierde entre un cuarto y un tercio de su contenido | ✅ | PMC4991899 | "each defecation event reduces the content by a quarter to a third" | 2016 |
| 11 | Tu "mitad bacteriana" baja un poco cada vez que vas al baño | ✅ | PMC4991899 | el contenido del colon baja ¼–⅓ y las bacterias son "about one-half" de la masa de ese contenido ("a bacteria mass fraction of about one-half") | 2016 |
| 12 | Eres casi mitad y mitad (30 contra 38 billones) | ✅ | PMC4991899 | 3.0·10^13 humanas y 3.8·10^13 bacterias (44 % / 56 %) | 2016 |
| 13 | En pantalla: cuadrícula 84 % rojo; barras 30 y 38; 1.3 : 1; ≈ 200 g; "1 a 3 kg" tachado; −¼ a −⅓ | ✅ | las mismas frases | Las cifras son las del artículo. Son estimaciones para un "hombre de referencia" de 70 kg (se dice en la descripción). | 2016 |

## Correcciones de la primera pasada
- ⚠️ "Una evacuación **voltea** la proporción" (frase muy citada en notas de prensa): no aparece así en los dos artículos abiertos;
  se cambió por lo que sí dice el artículo: el colon pierde de un cuarto a un tercio de su contenido.
- ⚠️ "Y la mitad bacteriana **te la llevas al baño todos los días**": exagerado (es ¼–⅓ del contenido del colon, no la mitad de tus
  bacterias). Ahora dice "baja un poco cada vez que vas al baño".

## Notas de rigor
- Son **estimaciones** para un hombre de referencia de 70 kg; el propio artículo da una incertidumbre del 25 % para 1.3 y una
  variación del 53 % entre personas. Por eso la voz dice "unos", "más o menos" y "casi".
- Si no se cuentan los glóbulos rojos (no tienen núcleo), la proporción vuelve a ser ~10:1 (lo dice el artículo); se aclara en la
  descripción.
- El dato tiene más de 2 años (2016) y la voz lo dice ("en 2016").

## Verificación independiente (28 oct 2026)
Otro agente, que no escribió el guion, abrió las fuentes primarias (commit 416613c): **PASA sin cambios**. Como respaldo, un conteo más
nuevo coincide con la idea de "casi 1 a 1":
| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| Unos 30 billones de células humanas y una cantidad parecida de bacterias | ✅ (respaldo) | Hatton et al., *PNAS* (PMC10523466) | "we estimate total body counts of ≈36 trillion cells in the male" · "total counts converging on values of 30 to 37 trillion human cells, with an approximately equal number of bacteria cells" | 2023 |

## Re-verificación
Las dos partes corregidas (líneas 9 y 10 del guion) se revisaron otra vez contra PMC4991899: ✅.

## Re-verificación (29 oct, auditoría)
Se cambió el conteo de células humanas de 2016 (30 billones, 84 % glóbulos rojos, 1.3 : 1) por el más nuevo de Hatton et al. 2023, y se separó qué cifra es de qué año. Revisado por un verificador independiente abriendo el texto completo (Europe PMC) de PMC10523466 y PMC4991899. «Billones» = 10^12 (escala larga) = *trillion* en inglés.

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| En 2023 se volvieron a contar: unos 36 billones de células en un hombre, 28 en una mujer (pantalla: «36 billones · células tuyas · hombre · 2023») | ✅ | Hatton et al., *PNAS* 120(39): e2303077120, doi 10.1073/pnas.2303077120 (PMC10523466) | "we estimate total body counts of ≈36 trillion cells in the male, ≈28 trillion in the female" (hombre de referencia de 70 kg, mujer de 60 kg) | 2023 |
| Cuatro de cada cinco no tienen núcleo: son glóbulos rojos y plaquetas (cuadrícula 80 % roja; chip) | ✅ | Hatton et al. 2023 (PMC10523466), Fig. 1 | "Cell counts are dominated by red blood cells and platelets… Even after removing nonnucleated blood cells (≈29 trillion)… the ≈7 trillion nucleated cell count" → 29/36 ≈ 0.81 (dato del modelo masculino; Sender 2016 da incluso más: "almost 90%… enucleated cells… mostly red blood cells and platelets") | 2023 |
| Bacterias, según la cuenta de 2016: unos 38 billones | ✅ | Sender, Fuchs y Milo, *PLoS Biol* 14(8): e1002533 (PMC4991899) | "We estimate the total number of bacteria in the 70 kg 'reference man' to be 3.8·10^13" | 2016 |
| Casi una a una (36 contra 38; barras 36/74) | ✅ | Hatton 2023 y Sender 2016 | 38/36 ≈ 1.06 · Hatton: "total counts converging on values of 30 to 37 trillion human cells, with an approximately equal number of bacteria cells" · Sender: "This B/H value of about 1:1" | 2016 / 2023 |
| La cuenta la hizo el equipo de Ron Milo, Instituto Weizmann, Israel (2016) | ✅ | PMC4991899 (afiliaciones) | "Sender Ron, Fuchs Shai, Milo Ron · Weizmann Institute of Science, Rehovot, Israel" | 2016 |
| Según ese estudio pesan unos 200 g, no kilos | ✅ | PMC4991899 | "their total mass is about 0.2 kg" · "updating previous statements that… a normal human hosts 1–3 kg of bacteria" | 2016 |
| publicacion.md: 2016 = 30 billones humanas, 84 % glóbulos rojos, 1.3 por célula | ✅ | PMC4991899 | "revise past estimates to 3.0·10^13 human cells" · "The cell count is dominated by red blood cells (84%)" · "B/H = 1.3" | 2016 |
| Cita: Hatton, I. A. et al. (2023), PNAS 120(39): e2303077120 | ✅ | metadatos de PMC10523466 | volumen 120, número 39, e2303077120, doi 10.1073/pnas.2303077120 | 2023 |

Nota menor (no se ve ni se narra): la línea «Formato» de `guion.md` aún dice "10:1 tachado → 1.3:1" y "cuadrícula 30 contra 38"; conviene cambiarla a "≈ 1:1" y "36 contra 38" para que el guion no se contradiga.

VEREDICTO: APROBADO
