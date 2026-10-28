# Verificación de hechos · Shot Científico #07 · La esponja de cocina

- **Fecha:** 28 oct 2026.
- **Quién verificó:** esta sesión no tiene herramienta para lanzar subagentes (Task/Agent); la verificación la hizo la misma sesión en
  una pasada aparte y escéptica, **abriendo el texto completo** del artículo (Europe PMC, PMC5517580) y su resumen en PubMed (PMID 28725026).
- **Primera pasada:** 3 afirmaciones se marcaron ⚠️ y se corrigieron antes de animar (abajo, "Correcciones").

## Afirmaciones (voz y pantalla)

| # | Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | La esponja es "un edificio de departamentos para bacterias" (metáfora: viven dentro, en sus huecos) | ✅ | Cardinale et al., *Sci. Rep.* 7: 5791 (PMC5517580) | "FISH–CLSM showed an ubiquitous distribution of bacteria within the sponge tissue, concentrating in internal cavities and on sponge surfaces" | 2017 |
| 2 | En un cubito de 1 cm, en algunas zonas, **calcularon** hasta 54 mil millones de bacterias (densidad local estimada por análisis de imagen) | ✅ | PMC5517580 (resumen) | "Image analysis showed local densities of up to 5.4 * 10^10 cells per cm^3" (5.4·10^10 = 54 mil millones) | 2017 |
| 3 | Estudio publicado en 2017 en Alemania con 14 esponjas usadas de casas de verdad | ✅ | PMC5517580, Métodos | "Fourteen used kitchen sponges… were collected in autumn 2012 from private households in the greater area of Villingen-Schwenningen (Baden-Württemberg, Germany)" · publicado el 19 jul 2017 | muestras 2012, artículo 2017 |
| 4 | Leyeron su ADN y encontraron 362 grupos de bacterias | ✅ | PMC5517580, Resultados | "454–pyrosequencing of 16S rRNA gene amplicon libraries from 28 sponge samples, stemming from 14 used kitchen sponges… 362 bacterial OTUs remained" (OTU = grupo de secuencias al 97 %, por eso "grupos" y no "especies") | 2017 |
| 5 | Viven en los huecos y en la superficie, pegadas en capas, como una película | ✅ | PMC5517580 | "concentrating in internal cavities and on sponge surfaces, where biofilm–like structures occurred" | 2017 |
| 6 | **En las cuatro que compararon**, las que sus dueños limpiaban seguido (agua caliente o micro) no tenían menos bacterias | ✅ | PMC5517580 | "The procedures mentioned were: heating in a microwave and rinsing with hot, soapy water." · "regularly sanitized ('specially cleaned') sponges did not show significantly reduced bacterial numbers (Mann–Whitney U–Test, p = 0.78)" | 2017 |
| 7 | En ellas había **más (proporción de)** Moraxella osloensis | ✅ | PMC5517580 | "Two of the ten dominant OTUs, closely related to… Moraxella osloensis, showed significantly greater proportions in regularly sanitized sponges" | 2017 |
| 8 | Moraxella osloensis es famosa por dejar oliendo feo la ropa lavada | ✅ | PMC5517580 (cita a la literatura) | "Moraxella osloensis, is also known for generating malodor in laundry" | 2017 |
| 9 | Los autores **sospechan** que también es culpable del olor de la esponja | ✅ (dicho como hipótesis) | PMC5517580 | "The abundant occurrence of this bacterium might be responsible for bad smelling kitchen sponges, too… However, corresponding studies are still missing." | 2017 |
| 10 | Hervirla o el micro sí bajan las bacterias, pero **los autores creen** que las que sobreviven vuelven a llenarla (suposición: "Presumably") | ✅ (dicho como hipótesis) | PMC5517580 | "Sanitation by boiling or microwave treatment has been shown to significantly reduce the bacterial load of kitchen sponges" · "Presumably, resistant bacteria survive the sanitation process and rapidly re–colonize the released niches until reaching a similar abundance as before the treatment" | 2017 |
| 11 | Su consejo: cámbiala seguido, por ejemplo cada semana | ✅ | PMC5517580 | "We therefore rather suggest a regular (and easily affordable) replacement of kitchen sponges, for example, on a weekly basis." | 2017 |
| 12 | En pantalla: "54 mil millones en 1 cm³ (algunas zonas)", tarjeta "2017 · Alemania · 14 esponjas usadas", "362 grupos", dos barras iguales "≈" sin números, medidor que baja y vuelve a subir, calendario "cada semana" | ✅ | las mismas frases | Las barras y el medidor son esquemáticos (sin cifras). | 2017 |

## Correcciones de la primera pasada
- ⚠️ "362 **tipos / especies** de bacterias": el artículo cuenta OTUs (grupos de secuencias al 97 %), no especies confirmadas. Ahora dice "grupos".
- ⚠️ "**Moraxella** hace que tu esponja apeste" (afirmado): el artículo lo dice como posibilidad ("might be responsible") y aclara que faltan
  estudios. Ahora: "Los autores sospechan…".
- ⚠️ "famosa por dejar apestosa la ropa **húmeda**": la fuente dice "malodor in laundry", sin "húmeda". Ahora: "la ropa lavada".

## Notas de rigor
- El estudio es pequeño (14 esponjas de una región de Alemania); se dice "en un estudio" y no se generaliza a todas las esponjas.
- "Hasta 54 mil millones" es la densidad **local máxima** medida en imágenes, no el promedio de toda la esponja; la voz dice "en algunas zonas".
- El hervido y el micro **sí** bajan la carga (la voz lo dice); el problema que señala el estudio es que vuelve a subir.

## Re-verificación
Las tres frases corregidas se revisaron otra vez contra PMC5517580: ✅.

## Verificación independiente (28 oct 2026)
Otro agente, que no escribió el guion, abrió la fuente primaria (Cardinale et al., *Sci. Rep.* 7: 5791, 2017, PMC5517580) en el commit
416613c y marcó el shot como **NO PASA** por 4 puntos. Todos se corrigieron en voz, guion, pantalla y publicación:
| # | Antes | Problema | Ahora | Frase textual (2017) |
|---|---|---|---|---|
| a | «Las esponjas que sus dueños limpiaban así seguido no tenían menos bacterias.» | La comparación al microscopio fue con pocas esponjas ("selected… sponges", Fig. 6A: 4 esponjas, 2 contra 2, según el verificador) | «En las cuatro que compararon, las que limpiaban así no tenían menos bacterias.»; chip «de 4 comparadas: no tenían menos»; subtítulo «De 4: las limpiadas no tenían menos» | "Bacterial abundance in selected regularly sanitized ('specially cleaned') and not sanitized kitchen sponges" · "regularly sanitized ('specially cleaned') sponges did not show significantly reduced bacterial numbers (Mann–Whitney U–Test, p = 0.78)" |
| b | «…pero las que sobreviven vuelven a llenar el edificio.» | Es una suposición de los autores | «Hervirla o el micro sí bajan las bacterias, pero creen que las que sobreviven vuelven a llenarla.»; subtítulo «Bajan, pero quizá vuelven.»; medidor «¿vuelven a crecer?» | "Presumably, resistant bacteria survive the sanitation process and rapidly re–colonize the released niches" |
| c | «Y en ellas había más de una: Moraxella osloensis…» | Se entendía "más de una bacteria"; la fuente habla de mayor proporción | «Y en ellas había más Moraxella osloensis, famosa por dejar oliendo feo la ropa lavada.» | "showed significantly greater proportions in regularly sanitized sponges" |
| d | «contaron hasta cincuenta y cuatro mil millones» | No es un conteo: es una densidad local estimada por análisis de imagen | «calcularon hasta cincuenta y cuatro mil millones» | "Image analysis showed local densities of up to 5.4 * 10^10 cells per cm^3" |

Re-verificación de las 4 frases nuevas contra PMC5517580: ✅. Voz nueva: 944 caracteres (≈ 58 s) + cierre 3.5 s = 61.5 s en la base.

VEREDICTO: APROBADO
