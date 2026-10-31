# Verificación de hechos · fun-03-seta-rosa

Verificación independiente el **28 oct 2026** (un verificador que no escribió el guion abrió las fuentes). Este shot es anterior a la regla
del 27 oct 2026; aquí quedan sus correcciones. Las frases nuevas se volvieron a comprobar abriendo el PDF de Salmones 2017.

## Correcciones aplicadas
- Voz idx 9: «…dice que su origen todavía no está claro, y que se aclara al madurar» → «¿Y el rosa? Una revisión mexicana de 2017 dice que aún no se sabe bien por qué se pierde: se aclara al madurar.» (la revisión no habla del *origen* del color, sino de su *permanencia*). Chip: «¿por qué se pierde el rosa? sin resolver». Subtítulo: «¿Y el rosa? *Se pierde al madurar.*» En `publicacion.md`: «todavía no se sabe bien por qué el rosa se mantiene o se pierde».
- Mudo: «De esporada a cosecha: 77 días» → «De esporada a primordios: 77 días» (el día 77 son primordios).

## Tabla

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| *Pleurotus djamor* es un hongo de clima cálido (pantropical) | ✅ | Salmones, Scientia Fungorum 46:73–85 (INECOL, Xalapa) | "Pleurotus djamor es un hongo pantropical" | 2017 |
| Crece silvestre en México | ✅ | Salmones 2017 | "se le ha encontrado creciendo silvestre en Argentina, Bolivia, Brasil… México…" | 2017 |
| Le gusta el calor: de 22 a 30 °C | ✅ | Salmones 2017 | "crece en clima tropical a temperaturas óptimas entre 22 a 30 °C" | 2017 |
| El rosa se aclara al madurar | ✅ | Salmones 2017 (var. *roseus*) | "primordios de color rosa y/o naranja que disminuyen notoriamente su coloración en estado adulto" | 2017 |
| Aún no se sabe bien por qué se pierde el rosa | ✅ | Salmones 2017 | "la permanencia del color rosa en los basidiomas es una parte de la biología del hongo aún no concluyente" | 2017 |
| Tarjeta: Dulce Salmones · INECOL, Xalapa · *Scientia Fungorum* | ✅ | Salmones 2017 | "Dulce Salmones Instituto de Ecología, A.C., … Xalapa"; "Scientia Fungorum vol. 46: 73-85 2017" | 2017 |
| Con mucho CO₂ el sombrero no se forma bien | ✅ | Nwankwegu et al. 2025 (PMC12351640) | "high CO2 concentrations can pre-empt fruiting body formation by suppressing the effective pileus differentiation" | 2025 |
| Algo de luz, que el sombrero necesita para abrirse | ✅ | Nwankwegu et al. 2025 | "Light enhances pileus differentiation" | 2025 |
| Humedad muy alta | ✅ | Nwankwegu et al. 2025 | "the relative humidity levels for fruiting body development range between 80% and 95%" | 2025 |
| Esporas alargadas (dibujo, 8–9.5 × 3.5–4.5 µm) | ✅ | Landcare Research, Virtual Mycota (*P. djamor*) | esporas "oblong-cylindrical", 8–9.5 × 3.5–4.5 µm | — |
| Robert lo cultivó en su cuarto, desde una esporada sobre papel aluminio, agar, grano y sustrato | ✅ | `series/shot-robert/datos.md` (✅) | dato personal verificado | 2026 |
| Fechas del cultivo (3 feb, día 0 … primordios, día 75–77) | ✅ | Registro propio de Robert (video del cultivo) | — | 2026 |
| Potencial biotecnológico para el neotrópico (LinkedIn) | ✅ | Salmones 2017 (título) | "Pleurotus djamor, un hongo con potencial aplicación biotecnológica para el neotrópico" | 2017 |

Sin afirmaciones ❌ ni ⚠️ pendientes.

## Re-verificación (29 oct, auditoría)
Se quitaron «en mi cuarto» y «sobre papel aluminio» (voz idx 0 y 2, guion.md y publicacion.md) por no estar como tales en `datos.md`; ahora dice «lo cultivé yo» y «las esporas que soltó una seta boca abajo». Se quitó `voz_aprobada`. (La foto real de la esporada en aluminio sigue en pantalla, sin texto que lo afirme.)

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| «lo cultivé yo» (voz, guion y las 7 redes de publicacion.md) | ✅ | `series/shot-robert/datos.md` (línea ✅) | "✅ Sacó seta rosa desde una impresión de esporas hasta la cosecha." | 2026 |
| «Empezó con una esporada» / «Empecé… con una esporada» / «La cultivé desde una esporada» | ✅ | `series/shot-robert/datos.md` (misma línea ✅; «impresión de esporas» = esporada) | "✅ Sacó seta rosa desde una impresión de esporas hasta la cosecha." | 2026 |
| Una esporada son las esporas que suelta una seta puesta boca abajo (láminas hacia abajo) sobre una superficie | ✅ | Australian National Botanic Gardens, «Spore prints» (anbg.gov.au/fungi/spore-prints.html) | "Put the cap on a piece of paper, gills facing down." · "mature spores… will have been released from the gills and fallen onto the paper" | — (método estándar) |

Sin ❌ ni ⚠️. Nota: la voz guardada en `voz/narracion.json` aún dice el texto viejo («en mi cuarto»); hay que regenerarla cuando Robert apruebe.

## Re-verificación 2 (29 oct, datos confirmados por Robert)

Fuente de los datos personales: confirmación de Robert en el chat administrador (29 oct 2026), que se agrega a `series/shot-robert/datos.md`, más lo que ya estaba ahí («✅ Sacó seta rosa desde una impresión de esporas hasta la cosecha»). Revisé voz (`narracion.json`), pantalla (`seta-rosa.jsx`), `guion.md` y `publicacion.md`. Esta sección reemplaza la fila vieja de arriba que hablaba de «papel aluminio».

| Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|
| «lo cultivé en mi cuarto» (voz idx 0, guion, las 7 redes) | ✅ | Confirmación de Robert, 29 oct 2026 | «SÍ la cultivó en su cuarto» | 2026 |
| «Este creció de micelio en un bloque de aserrín pasteurizado» (voz idx 2, chip «micelio en aserrín pasteurizado», subtítulo, redes) | ✅ | Confirmación de Robert, 29 oct 2026 | «La seta del video creció de micelio en un bloque de aserrín pasteurizado» | 2026 |
| No se menciona «papel aluminio» ni que el bloque fue comprado (voz, pantalla, guion, publicación) | ✅ | `grep` en narracion.json, seta-rosa.jsx, .dc.html, guion.md y publicacion.md: 0 coincidencias de «alumin» y «compr». La foto de la esporada (con paquetitos de aluminio) ya no se muestra: la escena Esporada usa `FOTO('racimo_video')` y el mudo `laminillas`; placa, grano y primordios revisados a ojo: sin aluminio | — | 2026 |
| «De sus esporas junté una esporada. Las sembré juntas en agar PDA… mi propia cepa» → grano → sustrato → primordios (cronología bloque → seta → esporas → cepa propia) | ✅ | Confirmación de Robert, 29 oct 2026 + `datos.md` | «De las esporas de ese bloque, Robert creó después su propia cepa por germinación multiespórica en PDA» · «Sacó seta rosa desde una impresión de esporas hasta la cosecha» | 2026 |
| Germinación multiespórica = sembrar muchas esporas juntas de una misma seta (esporada) en agar | ✅ | Hernández-Ibarra, Sánchez-Vázquez y Calvo-Bado, *Rev. Mex. Micol.* 11: 29–38 (cepas de *P. djamor*); Agriculture Guide, «Isolation techniques for getting pure cultures of mushroom»; Penn State Mushroom Research Center, «How to start a culture» | «De los especímenes colectados se hicieron aislamientos vegetativos y multiespóricos» · «Minimum, three agar dishes should be inoculated for each spore print… the culture developed after its incubation… is known as multispore culture» · «Mushroom Spores are collected and germinated on a plate to create a new culture» | 1995 / 2022 / s. f. |
| PDA = agar papa dextrosa, medio para cultivar hongos | ✅ | Hernández-Ibarra et al., *Rev. Mex. Micol.* 11; Wikipedia, «Potato dextrose agar» | «Papa dextrosa agar (PDA)» (medio usado con cepas de *P. djamor*) · «made from potato infusion and dextrose… the most widely used medium for growing fungi» | 1995 / 2026 |
| *Pleurotus* se cultiva en aserrín pasteurizado | ✅ | Tejada et al., «Performance and Yield of Oyster Mushroom (*Pleurotus ostreatus*) with Banana Leaves, Rice Straw and Saw Dust as Substrates», *Southeast Asian J. Agric. Allied Sci.* 3(1): 63–70 | «Hardwood sawdust together with rice bran… the sawdust was poured in the fruiting bags, sealed… then pasteurized for 8 hours» | vol. 3 (s. f.) |
| «Las fotos del racimo maduro son de la seta que creció en el bloque de aserrín; de sus esporas salió mi cepa» (publicacion.md l.144; guion.md l.81) | ✅ | Confirmación de Robert, 29 oct 2026 | «La seta del video creció de micelio en un bloque de aserrín pasteurizado» · «De las esporas de ese bloque, Robert creó después su propia cepa» (antes decía «lote anterior (ene–feb 2026)», fechas no confirmadas: corregido) | 2026 |

**Corregido (29 oct):** se quitaron las fechas «ene–feb 2026» de `publicacion.md` y `guion.md`. Todo queda ✅.

Notas (no son afirmaciones publicadas): `voz/narracion.json` y `voz/narracion.mp3` son la voz VIEJA y todavía dicen «papel aluminio»; no deben usarse (se reemplazan al aprobar la voz nueva; conviene borrarlas). `seta-rosa.jsx` línea 5 aún precarga `'esporada'` en `FOTOS`, pero ya no se muestra.

VEREDICTO: APROBADO
