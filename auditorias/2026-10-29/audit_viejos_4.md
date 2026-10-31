# Auditoría de hechos · 15 shots viejos (lote 4) · 29 oct 2026

Revisé el repo `lacreaciondelrobert-shots` en main (después del pull). En los 9 shots que tienen `voz/narracion.json`, el texto con el que se generó la voz es **idéntico** al `narracion.json` actual.
Fuentes primarias que abrí: Europe PMC (texto completo), arXiv (PDF), el repo de GPT-3 de OpenAI en GitHub y el PDF de EarthDate.
`pmc.ncbi.nlm.nih.gov` está bloqueado en esta sesión, así que los artículos de PMC los abrí por la API de Europe PMC.

**Resultado: 10 OK · 5 con PROBLEMA** (bio-06-lactosa, cie-06-bacterias-1a1, fes-01-monarcas, fun-03-seta-rosa, fun-07-pilobolus). Ninguno tiene un dato falso grave. Los cinco tienen imprecisiones o correcciones que se aplazaron.

---

## amb-03-bioplasticos — OK
Comprobado: Bagheri et al. 2017, *Global Challenges* (PMC6607129, Universidad de Bayreuth): «in a thermostatic chamber at 25 °C… for 1 year… PCL, PLA, and PET did not degrade at all» ✅. Los 58 °C, la composta casera, el costo, el reciclaje y el ablandamiento coinciden con las revisiones que cita `verificacion.md`. Los textos de `publicacion.md` ya están corregidos.
(Nota menor sin cambio necesario: la barra «$ vs $$» de la `Comparativa`, en la línea 195 de `bioplasticos.jsx`, no tiene número, así que no afirma ninguna proporción.)

## amb-07-monarca — OK
Coincide con WWF/CONANP 2025-2026: 2.93 ha, +64 % frente a 1.79 ha, 18.19 ha en 1996-1997 y monitoreo conjunto desde 2004-2005. Las 2.55 ha (feb 2024–feb 2025) siguen siendo el dato forestal más nuevo publicado; lo confirmé con una búsqueda: el informe de 2026 todavía cita ese periodo. La meta de unas 6 ha viene de la revisión de 2026. Las cuentas en canchas (4 y 25) cuadran con una cancha de 105 × 68 m.

## bio-02-vacas — OK
Bergman 1990 (≈70 % en rumiantes y ≈10 % en humanos, y la voz dice «En 1990»), Matthews 2019 (10^10–10^11 células/ml), proteína microbiana como fuente principal (Santos 2026) y metano por eructo (Murray 1976). La voz no da cifras sin año.

## bio-06-lactosa — PROBLEMA (corrección documentada pero no aplicada en la voz)
`verificacion.md` (línea 4) dice que se corrigió que «la intolerancia de las ratas era provocada en el laboratorio» y que se quitó `voz_aprobada`. **En la voz no se aplicó**: `narracion.json` tiene `voz_aprobada: true` y la voz guardada en `voz/` dice el texto viejo. El mismo problema del gancho (el vector llevaba un gen bacteriano de β‑galactosidasa, no «el gen que te falta») sigue en la línea 6.

1. **Voz, línea 6** (`narracion.json`, idx 5): «Eso probaron en 1998 en Filadelfia: un virus adeno-asociado, por la boca, cargando el gen.»
   - Qué está mal: después de «¿Y si le devolvieras la receta a tus células?», «el gen» se entiende como el gen humano de la lactasa. En realidad era un gen de β‑galactosidasa (bacteriano).
   - Texto propuesto: «Eso probaron en 1998 en Filadelfia: un virus adeno-asociado, por la boca, cargando el gen de una enzima que parte la lactosa.»
2. **Voz, línea 7** (idx 6): «Las ratas volvieron a digerir lactosa, y el efecto duró meses.»
   - Qué está mal: falta que la intolerancia era provocada (está en `guion.md` y en `publicacion.md`, pero no en la voz ni en pantalla).
   - Texto propuesto: «Las ratas, con la intolerancia provocada en el laboratorio, volvieron a digerir lactosa, y el efecto duró meses.»
   - Pantalla: en la línea 202 de `lactosa-narrado.jsx`, el chip «en ratas · duró meses» puede pasar a «ratas con intolerancia provocada · meses».
3. **publicacion.md, líneas 11 y 44**: «De bebés todos fabricamos lactasa».
   - Qué está mal: es un absoluto, y existe la deficiencia congénita de lactasa, aunque es rara.
   - Texto propuesto: «De bebés casi todos fabricamos lactasa».
- Fuente: nota de prensa de Thomas Jefferson University (29 sep 1998, vía ScienceDaily, según `verificacion.md`): «inserted a beta-galactosidase gene… into an adeno-associated virus vector» · «to correct the experimentally induced lactose intolerance in the animals» · «The effect lasted four months». Año del dato: 1998.
- Al cambiar el texto narrado hay que quitar `voz_aprobada`. Robert ya dijo que va a regenerar las voces.

## cie-02-proteina-iman — OK
Lo comprobé en el texto completo de Nature 2026 (PMC12851924): «a single cell expressing MagLOV 2 showing an MFE of about 50%», «switched between 0 mT and 10 mT», «B0 = 21.6 mT … ωRF = 604 MHz», «single-cell detection», AsLOV2 de *Avena sativa* y el grupo de Oxford.
(Matiz opcional: la línea 3 de la voz, «Acercas un imán y el brillo baja a la mitad», generaliza a «estas bacterias» un ~50 % que se midió en una sola célula. La pantalla sí dice «1 CÉLULA». Si se quiere ser estricto: «…y en una célula, el brillo baja a la mitad».)

## cie-06-bacterias-1a1 — PROBLEMA (leve: conteo de 2016 sin año, y hay uno más nuevo)
- **Voz, línea 6** (idx 5): «Unos treinta billones. Y el ochenta y cuatro por ciento son glóbulos rojos…». En pantalla: `bacterias.jsx` línea 131 (`NumeroGigante` 30 billones, «células tuyas») y el subtítulo de la línea 148.
- Qué está mal: la cifra es de 2016 y el año se dice hasta dos frases después. Además existe un conteo más nuevo: Hatton et al. 2023, *PNAS* (PMC10523466), da «≈36 trillion cells in the male, ≈28 trillion in the female». La regla de Robert dice que no se use un conteo viejo si hay uno más nuevo, y que los datos de más de 2 años digan su año. La idea de «casi 1 a 1» sigue siendo cierta. El mismo artículo de 2023 dice «30 to 37 trillion human cells, with an approximately equal number of bacteria cells».
- Corrección propuesta: decir el año antes de la cifra y unir las líneas 6 a 8.
  - Línea 6: «En 2016, el equipo de Ron Milo, del Instituto Weizmann, en Israel, las contó: unos treinta billones en un hombre de setenta kilos. Y el ochenta y cuatro por ciento son glóbulos rojos, que ni siquiera tienen núcleo.»
  - Línea 7: sin cambio.
  - Línea 8: «Un conteo de 2023 da cifras parecidas: casi una a una.» Si se quiere evitar otra cifra, se puede quitar esta línea.
  - Subtítulo de la línea 148: «2016: 30 billones · *84 % glóbulos rojos.*»
- Fuentes:
  - Sender, Fuchs y Milo 2016, *PLoS Biol* (PMC4991899): «the typical adult human body consists of about 30 trillion human cells and about 38 trillion bacteria» (2016).
  - Hatton et al. 2023, *PNAS*: «we estimate total body counts of ≈36 trillion cells in the male, ≈28 trillion in the female» (2023).
- El resto está ✅ contra el texto de 2016: 84 % de glóbulos rojos, 0.2 kg, colon de ~0.4 L, «a quarter to a third» por evacuación, cuenta de Luckey de los años 70 «sentence-long» con «1 liter», y 10:1 con células nucleadas.

## fes-01-monarcas — PROBLEMA (corrección aplazada)
- **Voz, línea 4** (idx 3): «Ninguna ha hecho el viaje antes: es tataranieta de las que se fueron en primavera.»
  - También en pantalla: subtítulo «Viaja *la tataranieta.*» (`monarcas.jsx` línea 314).
  - Y en `publicacion.md`: líneas 11, 26, 42 y 83.
- Qué está mal: lo dice como algo fijo. El número de generaciones varía de un año a otro. `verificacion.md` (línea 40) lo marcó y lo **dejó así «para no volver a renderizar»**.
- Corrección propuesta:
  - Voz: «Ninguna ha hecho el viaje antes: casi siempre es tataranieta de las que se fueron en primavera.»
  - Subtítulo: «Viaja, casi siempre, *la tataranieta.*»
  - publicacion.md: «la que llega casi siempre es tataranieta de las que se fueron en primavera».
- Fuente: EarthDate ED 153, Univ. de Texas en Austin (PDF abierto): «the returning butterflies are the great-great-grandchildren of the butterflies that left» y, en el mismo PDF, «It takes four or more generations of monarchs to fulfill their annual migration» y «into southern Canada in three or more generations, then the final generation makes its way back». Año: 2019.
- El resto está OK: 2.93 ha, +64 %, 18.19 ha en 1996-97 («seis veces», 6.2), reloj en las antenas (Merlin 2009), y la frase «solo comen algodoncillo» es correcta si «algodoncillo» se entiende como el grupo de plantas *Asclepias*.

## fes-05-fotos-ofrenda — OK
Las correcciones del segundo verificador sí se aplicaron: «sobre todo caras blancas» en voz, pantalla y textos, y el título de YouTube «no solo restaura… inventa una parte». PULSE (Duke, CVPR 2020) y el caso Obama coinciden con las fuentes. La voz presenta «más daño = más relleno» como deducción.

## fun-03-seta-rosa — PROBLEMA (leve: datos personales que no están en `datos.md`)
- **Voz, línea 1** (idx 0): «…y lo cultivé en mi cuarto». También en `publicacion.md`, líneas 9, 22, 37, 54, 61, 74 y 79.
- **Voz, línea 3** (idx 2): «…las esporas que soltó una seta sobre papel aluminio». También en `publicacion.md`, líneas 10 y 38.
- Qué está mal: la regla dice que los datos personales de Robert se verifican solo contra `series/shot-robert/datos.md` (✅). Ahí está «Sacó seta rosa desde una impresión de esporas hasta la cosecha» y «convirtió su recámara en laboratorio». **No dice** que este cultivo de 2026 fue en su cuarto, ni lo del papel aluminio. `verificacion.md` lo da por bueno con un «registro propio».
- Corrección: que Robert confirme y se agreguen como ✅ a `datos.md`. Si no lo confirma, cambiar a:
  - Línea 1: «Esto no es plástico ni coral: es un hongo vivo, y lo cultivé yo.»
  - Línea 3: «Empezó con una esporada: las esporas que soltó una seta sobre una hoja.»
- El resto está ✅ contra Salmones 2017 (*Scientia Fungorum* 46: 73–85): 22–30 °C, pantropical, silvestre en México y el rosa que «disminuye notoriamente» al madurar. CO₂, luz y humedad coinciden con Nwankwegu 2025. «Esporas ≈ 8 µm» está dentro de 8–9.5 × 3.5–4.5 µm.

## fun-07-pilobolus — PROBLEMA (leve: cifra de 1934 sin año, mezclada con el estudio de 2008)
- **Voz, línea 10** (idx 9): «Vuela hasta dos metros y medio, lejos de la caca, al pasto limpio.»
  - También en pantalla: subtítulo «2.5 metros: *al pasto limpio.*» (`pilobolus.jsx` línea 203).
  - Y en `publicacion.md`, línea 78 (X): «y hasta 2.5 m de distancia».
- Qué está mal: va justo después de las cifras de 2008, así que suena a que se midió en 2008. En realidad es una medición de Buller de **1934**. El propio Yafetto 2008 lo aclara en la nota de la Tabla 1. Es un dato de hace más de 2 años sin su año.
- Corrección propuesta:
  - Voz: «Y desde 1934 se sabe que vuela hasta dos metros y medio, lejos de la caca, al pasto limpio.»
  - Subtítulo: «Hasta 2.5 m (medido en 1934): *al pasto limpio.*»
  - En X: «…y hasta 2.5 m de distancia (medido en 1934)».
- Fuente: Yafetto et al. 2008, *PLoS ONE* 3: e3237 (PMC2528943), Tabla 1: «Measured maximum range (m) … 2.5 … *Maximum range measurements by authors with exception of P. klenii data published by Buller [19]» · ref. 19: «Buller AHR. Researches on fungi, vol. 6. London: Longmans, Green & Co; 1934.»
- El resto está ✅ en la misma tabla: 2–13 m/s (13 m/s ≈ 47 km/h), 210,000 m/s² (≈ 21,400 g, es decir «más de 20,000»), video a 50,000 fps y autores de Miami University (Ohio).

## ia-02-espanol — OK
Lo comprobé en `languages_by_word_count.csv` del repo oficial de GPT-3: en 181,014,683,608 (92.65 %), fr 1.82 %, de 1.47 %, es 1,510,070,974 (0.77 %); 181.0 / 1.51 ≈ 120.
Model card (2020): «more representative of internet-connected populations… mostly U.S.-centric… the dataset underrepresents less connected communities».

## ia-06-panda — OK
- Goodfellow, Shlens y Szegedy, arXiv:1412.6572 (PDF): «57.7% confidence», «99.3 % confidence», GoogLeNet, «error rate of 89.4%… fell to 17.9%».
- Eykholt et al., arXiv:1707.08945: «only black and white stickers… 100% of the images obtained in lab settings, and in 84.8%…», Speed Limit 45.
- En pantalla, «224×224×3» y «±1 tono de 256» coinciden con el ε = .007 del artículo.

## qui-01-agar — OK
FAO 1987 («cooled to 34-43°C it forms a firm gel which does not melt again below 85°C»), Fanny Hesse en 1881 y el laboratorio de Koch (Science History Institute), agarosa ≈70 % (FAO 1990) y Hehemann 2010 (nori, *B. plebeius*, Japón). Las correcciones («Muchas bacterias», «gran parte») están aplicadas.

## qui-05-nixtamal — OK
Lo comprobé en el resumen de Maris et al. 2025, *Toxins* (PMID 41295842): «Kliptown, Soweto (South Africa)… visibly moldy maize subjected to nixtamalization… reducing fumonisin B1 (FB1)… by 95%». Que la toxina no bajó en la orina ya está fuera de la voz. El resto (pericarpio, nejayote, calcio, niacina, pelagra) coincide con las fuentes de `verificacion.md`.

## qui-09-agua-oxigenada — OK
Lineaweaver 1985 («All agents tested at full strength killed 100 percent of exposed fibroblasts»), Hengy 2026 (Mohs), Shih 2025 (12 ensayos, agua de la llave = suero) y Takahara 1948 (Nandi 2019). La corrección de «dos fuentes distintas» ya está aplicada en la voz y en pantalla.
