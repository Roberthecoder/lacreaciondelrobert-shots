# Verificación de hechos · amb-43-huella-comida

- Fecha: 29 oct 2026
- Verificador: subagente independiente (no escribió el guion)
- Fuentes primarias abiertas: el artículo y los **materiales suplementarios + Data S2.xls de Poore y Nemecek (2018)** que el autor publica en su sitio
  (https://josephpoore.com/ → `data/science-2018/…`), los CSV de Our World in Data, el texto de OWID de 2020 y el resumen de Weber y Matthews (2008) en PubMed (PMID 18546681).

## Datos clave de Data S2 ("Results - Retail Weight", GHG kg CO₂eq/FU, IPCC 2013), año de referencia 2010

| Producto | Media | Mediana |
|---|---|---|
| Bovine Meat (beef herd) | 99.48 | 60.36 |
| Other Pulses | 1.79 | 1.39 |
| Dark Chocolate | 46.65 | **4.95** |
| Lamb & Mutton | 39.72 | 40.61 |
| Cheese | 23.88 | 18.64 |
| Pig Meat | 12.31 | 10.57 |
| Poultry Meat | 9.87 | 7.52 |

- Comparación res/legumbres: con medias 99.48 ÷ 1.79 = **55.6**; con medianas 60.36 ÷ 1.39 = **43.4**. La comparación es justa si se usa la misma
  medida para ambos: el guion usa medias en los dos lados (las que muestra OWID como "global average"), así que "más de cincuenta veces" es correcto.
  Con medianas sería "más de cuarenta veces". Ojo: el "60 kilograms" del texto de OWID de 2020 es la mediana (60.36); no mezclarlo con 1.79.
- **"Other Pulses"**: Tabla S1 del suplemento: "Other Pulses — 1 kg of dry pulse without pod" (legumbre seca sin vaina), categoría aparte de
  "Peas" (chícharo), "Soybeans" (tofu) y "Groundnuts" (cacahuate). El suplemento no da la lista textual de especies, pero entre los estudios
  incluidos (Data S1, "Studies Included") están LCA de frijol (Abeliotis et al. 2013, "Life cycle assessment of bean production in the Prespa
  National Park, Greece"), lenteja (Moraditochaee et al. 2014) y legumbres de Canadá (MacWilliam et al. 2014). Decir "frijol y otras legumbres"
  es correcto; la cifra es del grupo, no exclusiva del frijol, y la voz lo dice así. Además la cifra es por kilo de legumbre **seca**: un kilo de
  frijol cocido/refrito (relleno) pesa más por kilo de grano, así que por kilo de relleno la diferencia sería aún mayor (la comparación es conservadora).

## Tabla de afirmaciones

| Afirmación | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|
| Kilo por kilo, el relleno de bistec calienta "más de cincuenta veces más" que el de frijol (×55 en pantalla) | ✅ | Poore y Nemecek 2018, Data S2; OWID ghg-per-kg-poore | Data S2: "Bovine Meat (beef herd) … Mean 99.48"; "Other Pulses … Mean 1.79" → 55.6 (medianas: 43.4) | 2010 (publ. 2018) |
| Un kilo de res "en promedio" ≈ casi cien kg (99.5 kg CO₂e, "promedio mundial") | ✅ cifra / ⚠️ redacción "kilos de gases" | Data S2; OWID metadata | "Global average greenhouse gas emissions (GHG) per kilogram of food product … (kgCO₂eq per kg)"; "Beef (beef herd),2010,99.48" | 2010 |
| "Res" = ganado de carne (no lechero, 33.3) | ✅ | Data S2 | "Bovine Meat (dairy herd) … 33.3" | 2010 |
| Un kilo de frijol y otras legumbres: menos de dos (1.8) | ✅ | Suplemento Tabla S1; Data S2 | "Other Pulses 1 kg of dry pulse without pod"; Mean 1.79 | 2010 |
| Queso casi 24 (23.9) | ✅ | Data S2 / OWID | "Cheese,2010,23.88" | 2010 |
| Cerdo doce (12.3) | ✅ | Data S2 / OWID | "Pig Meat,2010,12.31" | 2010 |
| Pollo casi diez (9.9) | ✅ | Data S2 / OWID | "Poultry Meat,2010,9.87" | 2010 |
| Queso, cerdo y pollo quedan "en medio" (entre res y legumbres) | ✅ | OWID CSV | 99.48 > 23.88 > 12.31 > 9.87 > 1.79 | 2010 |
| Transporte = medio por ciento de la huella de la res | ✅ | OWID food-emissions-supply-chain; Ritchie 2020 | "Transport … 0.4941246" de 99.48 = 0.50 %; "In beef from beef herds, it's 0.5%." | 2010 (texto 2020) |
| Pesa más el metano de la vaca (granja) y la tierra que se desmonta (cambio de uso de suelo) | ✅ | OWID supply chain; Ritchie 2020 | Granja 56.23 y uso de suelo 23.24 de 99.48; "most GHG emissions result from land use change … and from processes at the farm stage … enteric fermentation (the production of methane in the stomachs of cattle)" | 2010 (texto 2020) |
| Estudio de 2018, Joseph Poore (Oxford) y Thomas Nemecek (Suiza) | ✅ | Artículo en *Science* 360:987 (PDF del autor); Crossref | "Department of Zoology, University of Oxford"; "Agroscope … CH-8046 Zürich, Switzerland" | 2018 |
| Datos de 38,700 granjas | ✅ | Artículo, resumen | "we consolidated data covering five environmental indicators; 38,700 farms; and 1600 processors…" | 2018 |
| Chocolate amargo queda segundo kilo por kilo, arriba del cordero (46.7 vs 39.7) | ⚠️ | Data S2 | Media 46.65 vs cordero 39.72 ✅, pero **mediana del chocolate 4.95** (cordero 40.61; percentil 5: −3.95). Solo es "segundo" en el promedio, inflado por pocos productores con deforestación (uso de suelo 25.81 de 46.65 = 55 %). Dicho sin matiz, engaña: el chocolate típico emite mucho menos que el cordero | 2010 |
| EE. UU., 2008: cambiar "la res y los lácteos" menos de un día a la semana reduce más que comprar todo local | ⚠️ | Weber y Matthews 2008, resumen (PubMed 18546681) | "Shifting less than one day per week's worth of calories from red meat and dairy products to chicken, fish, eggs, or a vegetable-based diet achieves more GHG reduction than buying all locally sourced food." Dice **carne roja** (res, cerdo, cordero), no solo res | 2008 |
| En pantalla: chip "Weber y Matthews, 2008 · hogares de EE. UU."; calendario bistec → pollo/huevo/frijol | ✅ | Mismo resumen | "the average U.S. household's 8.1 t CO2e/yr footprint for food consumption"; "chicken, fish, eggs, or a vegetable-based diet" | 2008 |
| Cierre: importa menos de dónde viene que de qué es | ✅ (conclusión de las fuentes) | Ritchie 2020; Weber y Matthews 2008 | "Focus on what you eat, not whether your food is local"; "dietary shift can be a more effective means … than 'buying local.'" | 2008/2020 |

Notas de cuentas: 99.48/1.79 = 55.58 ✓ · 0.4941/99.48 = 0.497 % ✓ · 25.81/46.65 = 55.3 % ✓ · redondeos 99.5, 1.8, 23.9, 12.3, 9.9, 46.7, 39.7 ✓.
Año del dato: las cifras son del año de referencia 2010, publicadas en 2018; la voz dice "en 2018" al presentar el estudio (aceptable; opcional
decirlo antes, p. ej. "según un estudio de 2018").

## Correcciones necesarias

1. **⚠️ Chocolate (escena 7).** Solo es segundo por el promedio; la mediana es 4.95. Texto sugerido:
   "Sorpresa: en ese promedio, el chocolate amargo queda segundo, arriba del cordero, por la selva que se tala para sembrar cacao."
   y en pantalla el chip "promedio mundial · lo sube la deforestación" (o quitar la escena). Mejor aún, si cabe: "…aunque el chocolate típico emite mucho menos."
2. **⚠️ "Casi cien kilos de gases" (escena 1).** La cifra es en CO₂ equivalente, no kilos de gas. Texto sugerido:
   "Un kilo de carne de res calienta, en promedio, como casi cien kilos de dióxido de carbono."
3. **⚠️ Weber y Matthews (escena 8).** El estudio dice carne roja y lácteos. Texto sugerido:
   "Y en Estados Unidos, en 2008, calcularon que cambiar la carne roja y los lácteos menos de un día a la semana ayuda más que comprar todo local."
   (Chip igual; el calendario puede seguir mostrando bistec.)

Sin cambios necesarios: gancho "más de cincuenta veces" (medias en ambos lados, comparación justa), "frijol y otras legumbres", transporte 0.5 %, queso/cerdo/pollo, 38,700 granjas, autores.

## Segunda ronda

Fecha: 29 oct 2026 · mismo verificador independiente · se revisó la voz actual completa de `narracion.json` (10 líneas) y las escenas 7–8 de `guion.md`.

| Línea (voz actual) | Veredicto | Comprobación |
|---|---|---|
| 0 "…kilo por kilo, el tuyo calienta el planeta más de cincuenta veces más." | ✅ | Medias Data S2: 99.48 ÷ 1.79 = 55.6 (misma medida en ambos lados) |
| 1 "Un kilo de carne de res calienta, en promedio, como casi cien kilos de dióxido de carbono." | ✅ | Media 99.48 kg CO₂eq/kg; ya expresado como CO₂ equivalente |
| 2 "Un kilo de frijol y otras legumbres, menos de dos." | ✅ | "Other Pulses … dry pulse without pod", media 1.79 |
| 3 "…queso, con casi veinticuatro; el cerdo, con doce, y el pollo, casi diez." | ✅ | 23.88 · 12.31 · 9.87 |
| 4 "¿Y si la res viene del rancho de al lado?" | ✅ | Pregunta, sin afirmación |
| 5 "…el transporte es medio por ciento de su huella. Pesa el metano de la vaca y la tierra desmontada." | ✅ | 0.494/99.48 = 0.50 %; "In beef from beef herds, it's 0.5%"; granja 56.23 (incl. "enteric fermentation") y uso de suelo 23.24 |
| 6 "Lo midieron en 2018 Poore, de Oxford, y Nemecek, de Suiza, con datos de treinta y ocho mil setecientas granjas." | ✅ | *Science* 2018; Univ. de Oxford / Agroscope, Zúrich; "38,700 farms" |
| 7 "Sorpresa: en ese promedio, el chocolate amargo queda segundo, arriba del cordero, por la selva talada para sembrar cacao." | ✅ | Media 46.65 > cordero 39.72, segundo tras la res (OWID). Uso de suelo 25.81 (55 %); sin él quedaría en 20.8, debajo del cordero: la deforestación es lo que lo sube. El "en ese promedio" resuelve la ⚠️ de la mediana (4.95) |
| 8 "En Estados Unidos, en 2008, calcularon que cambiar la carne roja y los lácteos menos de un día a la semana ayuda más que comprar todo local." | ✅ | Weber y Matthews 2008: "Shifting less than one day per week's worth of calories from red meat and dairy products … achieves more GHG reduction than buying all locally sourced food." Pantalla (calendario a pollo/huevo/frijol) coincide con "chicken, fish, eggs, or a vegetable-based diet" |
| 9 "…importa menos de dónde viene tu taco que de qué es." | ✅ | Conclusión de Ritchie 2020 y Weber y Matthews 2008 |

Las 3 correcciones de la primera ronda están aplicadas. No quedan ❌ ni ⚠️.

VEREDICTO: APROBADO
