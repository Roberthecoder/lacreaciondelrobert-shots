# Shot Químico #30 · Esa crema no es un espejo: es una esponja (cómo funciona el protector solar)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #30 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (tu brazo con crema bajo el sol → la capa de crema al microscopio → las moléculas que se tragan el UV → el mismo brazo, ahora con la capa gruesa) + N5 "El experimento" (la esfera de luz de 2016 y el estudio de playa de 1992 de investigadores de Copenhague).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Esa crema en tu brazo no es un espejo que rebota el sol: es una esponja que se traga el ultravioleta."
- **Seguridad:** no se recomienda ninguna marca ni filtro; lo único práctico es lo que dicen las fuentes (la etiqueta se mide con 2 mg/cm²; con menos crema protege menos). No se habla de toxicidad de filtros.
- **Duración:** voz 957 caracteres / ~166 palabras (≈ 58.2 s) + cierre 3.5 s → **61.7 s** estimados (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`protector.jsx`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~957 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa crema en tu brazo no es un espejo que rebota el sol: es una esponja que se traga el ultravioleta. | Fondo amarillo con un sol arriba. Desde el cuadro 0 un dedo unta una tira de crema blanca en un antebrazo; flechas moradas "UV" bajan del sol. Un espejo dibujado aparece junto a la crema y se tacha ✗; en su lugar, una esponja que "chupa" las flechas. Barra de escala "5 cm". |
| 1 | Filtros | Trae filtros, moléculas como la avobenzona o el octocrileno. | Zoom (cámara que baja) a la capa de crema: fondo noche. Gotitas de crema y, dentro, dos moléculas esquemáticas de anillos con etiqueta "avobenzona" y "octocrileno". Escala "≈ 1 nm". |
| 2 | Absorbe | Cuando les pega un rayo UV, se lo tragan y se cargan de energía. | Una flecha UV ondulada choca con la molécula de octocrileno; la molécula se pone brillante (glow) y vibra. Medidor "energía" sube. |
| 3 | Calor | Y la sueltan como un poquito de calor: ese rayo ya no llega a tu piel. | De la molécula salen ondas rojas suaves "calor" y vuelve a su color normal; debajo, la capa de piel (células) queda sin flecha: chip "UV ✗ piel". |
| 4 | Pregunta | ¿Y el óxido de zinc y el dióxido de titanio? ¿Esos sí son espejitos? | **Re-gancho.** Aparecen partículas blancas "ZnO" y "TiO₂" con un espejito encima y un "?" gigante. |
| 5 | Esfera | Un estudio de 2016, en Nueva Jersey, lo midió: solo reflejan del 4 al 5 por ciento del UV. Su protección es casi toda absorción. | Tarjeta "2016 · Cole, Shyr y Ou-Yang · Nueva Jersey, EUA". Una esfera blanca hueca (esfera integradora) con una muestra adentro; de las flechas UV solo rebotan ~5 (barra "reflejado 4–5 %"), la gran mayoría se apaga dentro de las partículas (barra grande "absorbido", sin porcentaje) y unas pocas pasan. El espejito se tacha. |
| 6 | FPS | ¿Y el número? Un FPS 30 filtra el 97 por ciento de los rayos UVB, los que te queman. | Regreso al frasco: etiqueta "FPS 30" gigante. Rejilla de 100 flechas UVB: 97 se detienen en la crema, 3 pasan (en rojo). Contador "97 %". |
| 7 | Lab | Pero ese número se mide en laboratorio, con 2 miligramos de crema por cada centímetro cuadrado de piel. | Un cuadrito de piel de 1 × 1 cm con regla; una báscula marca "2 mg" y la capa de crema gruesa encima. Chip "prueba oficial (FDA)". |
| 8 | Playa | En 1992, investigadores de Copenhague midieron a 42 personas en una playa: se pusieron, en promedio, la cuarta parte. | Tarjeta "1992 · Bech-Thomsen y Wulf · investigadores de Copenhague, Dinamarca" (afiliación; la playa no se rotula). Playa esquemática con 42 figuritas que aparecen en cuadrícula; contador "42". El mismo cuadrito de 1 cm ahora con una capa delgada: báscula "0.5 mg" y un pastel que muestra "¼". |
| 9 | Menos | Y con menos crema, te protege bastante menos de lo que dice la etiqueta. | Lado a lado: capa gruesa (2 mg) con casi todas las flechas detenidas vs. capa delgada (0.5 mg) con muchas flechas pasando; la etiqueta "FPS 30" tiembla. |
| 10 | Cierre | Así que esa crema no es un espejo: es una esponja, y solo funciona si le pones suficiente. | **Regreso al antebrazo del inicio**, ahora con la capa completa y pareja; las flechas UV llegan y se apagan en ella (esponja). Etiqueta "absorbe UV → calor". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química (matraz) y Robert señalando. |

**Música:** cama grave continua, cálida; efectos en el mismo cuadro (untar la crema, "zap" de cada rayo UV absorbido, zumbido cuando la molécula brilla, siseo suave de calor, golpe de cada tarjeta de estudio, "tic" del contador de 42 personas, "pop" de las flechas que pasan en la capa delgada).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y el óxido de zinc…? ¿Esos sí son espejitos?» y en «con menos crema, te protege bastante menos».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «no es un espejo… es una esponja» |
| 2 | 6.6 | 13.7 | 13_senalando_arriba | `izq-alto` | «trae filtros… avobenzona, octocrileno» / «se lo tragan» |
| 3 | 14.5 | 18.0 | 05_sonriendo_dientes_uniformes | `arriba-der` | «la sueltan como un poquito de calor» |
| 4 | 18.25 | 23.0 | 07_pensativo_puno | `grande` | «¿Esos sí son espejitos?» |
| 5 | 23.4 | 29.7 | 04_bajando_lentes | `izq-alto` | «solo reflejan del 4 al 5 por ciento» |
| 6 | 30.8 | 34.8 | 06_pensativo_menton | `arriba-der` | «¿Y el número? FPS 30… 97 por ciento» |
| 7 | 36.1 | 41.0 | 13_senalando_arriba | `izq-alto` | «2 miligramos… por cada centímetro cuadrado» |
| 8 | 41.6 | 48.1 | 11_sorprendido | `arriba-der` | «se pusieron, en promedio, la cuarta parte» |
| 9 | 48.35 | 52.5 | 10_serio_molesto | `grande` | «te protege bastante menos de lo que dice la etiqueta» |
| 10 | 53.0 | 58.1 | 02_apuntando_camara | `arriba-der` | «solo funciona si le pones suficiente» |
| — | 58.2 | 61.7 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 51 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato se abrió en la fuente original el 29 oct 2026)

1. **Los filtros orgánicos absorben el UV y sueltan la energía como calor (o luz no dañina)** — Breakell T., Kowalski I., Foerster Y., Kramer R., Erdmann M., Berking C., Heppt M.V. "Ultraviolet Filters: Dissecting Current Facts and Myths." *J Clin Med* 13(10):2986 (2024). PMID 38792526 · PMC11121922 · DOI 10.3390/jcm13102986.
   > "Organic UV filters absorb highly energetic UV rays and turn them into non-damaging wavelengths of light or heat, which are then released from the skin." · "The excited molecule then spontaneously returns to the ground state by emitting heat or long-wavelength radiation"
   > (Misma fuente, sobre que avobenzona y octocrileno son filtros de uso común: "only eight (oxybenzone (benzophenone-3, BP-3), avobenzone, octinoxate (OMC), octisalate, homosalate, octocrylene, TiO 2 and ZnO) are regularly used")
2. **Octocrileno: se relaja sin emitir luz y vuelve a su estado inicial en picosegundos (queda listo de nuevo)** — Baker L.A., Horbury M.D., Stavros V.G. "Ultrafast photoprotective properties of the sunscreening agent octocrylene." *Opt Express* 24(10):10700 (2016). PMID 27409891 · DOI 10.1364/oe.24.010700.
   > "UV-B photoexcited octocrylene exhibits ultrafast-nonradiative relaxation mechanisms to repopulate its initial ground state within a few picoseconds"
3. **Óxido de zinc y dióxido de titanio: solo reflejan 4–5 % del UV; protegen sobre todo absorbiendo (2016, Nueva Jersey)** — Cole C., Shyr T., Ou-Yang H. "Metal oxide sunscreens protect skin by absorption, not by reflection or scattering." *Photodermatol Photoimmunol Photomed* 32(1):5–10 (2016; en línea nov 2015). PMID 26431814 · DOI 10.1111/phpp.12214. Afiliaciones: Sun and Skin Consulting LLC, Ringoes NJ; Johnson & Johnson Consumer and Personal Care Products, Skillman NJ, USA.
   > "An optical integrating sphere was used to measure the transmission and the reflectance of titanium dioxide and zinc oxide." · "The average range of reflection for zinc oxide and titanium dioxide throughout the UV range was only 4-5% (less than SPF 2), providing minimal UV protection via this mechanism. The remainder of the UV protection is provided by semiconductor band gap mediated absorbance of the UV photons." · "Titanium dioxide and zinc oxide provide UV protection primarily via absorption of UV radiation and not through significant reflection or scattering."
4. **FPS 30 filtra el 97 % de los UVB, "los rayos que queman"** — American Academy of Dermatology (AAD). "How to read sunscreen labels" (aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/understand-sunscreen-labels), consultada 2026.
   > "The SPF number on sunscreen tells you how much UVB light (the burning rays) a sunscreen can filter out." · "SPF 30 filters out 97% of the sun's UVB rays."
   > Apoyo: FDA, "Sunscreen: How to Help Protect Your Skin from the Sun" (contenido vigente al 16/10/2026): "SPF values primarily indicate a sunscreen's UVB protection." · "The SPF value indicates the level of sunburn protection provided by the sunscreen product."
5. **El FPS se mide con 2 mg de crema por cm²** — FDA, 21 CFR 201.327(i)(4)(iii) (regla vigente de prueba de SPF; leída en law.cornell.edu/cfr/text/21/201.327).
   > "Apply the sunscreen test product and the SPF standard at 2 milligrams per square centimeter" · SPF de cada sujeto = MEDp / MEDu (dosis que causa enrojecimiento con y sin protector).
6. **1992, investigadores de Copenhague: 42 personas en una playa se pusieron en promedio 0.5 mg/cm² (la cuarta parte de 2)** — Bech-Thomsen N., Wulf H.C. "Sunbathers' application of sunscreen is probably inadequate to obtain the sun protection factor assigned to the preparation." *Photodermatol Photoimmunol Photomed* 9(6):242–4 (1992–93). PMID 1343224. Afiliación: Department of Dermatology, Rigshospitalet, Copenhagen University Hospital, Denmark.
   > "Forty-two volunteers on a beach applied their own sunscreen all over the body. The amount of the applied sunscreen was on average 0.5 mg/cm2. This indicates that the labelled SPF is probably considerably higher than the obtained degree of protection against sunburn."
7. **Con menos crema el FPS real baja (medido en voluntarios)** — Faurschou A., Wulf H.C. "The relation between sun protection factor and amount of suncreen applied in vivo." *Br J Dermatol* 156(4):716–9 (2007). PMID 17493070 · DOI 10.1111/j.1365-2133.2006.07684.x. Bispebjerg Hospital, Copenhague.
   > "The declared sun protection factor (SPF) is based on the use of a sunscreen layer of 2 mg cm(-2). However, only around a quarter (0·5 mg cm(-2)) of this amount is applied by sunbathers." · "the SPFs of the areas with the various amounts of sunscreen differed significantly from each other" · "Application of 1 mg cm(-2) or 0·5 mg cm(-2) makes the SPF fall as the square or fourth root, respectively"

## Notas
- El dibujo es esquemático: las moléculas, la "esponja", la esfera integradora y las flechas de UV no están a escala; la rejilla de 100 flechas del FPS es una representación del 97 %.
- "Esponja que se traga el ultravioleta" vale para los dos tipos de filtro: los orgánicos absorben (fuentes 1–2) y los minerales también, sobre todo (fuente 3). Matiz: por arriba del UV (UVA largo y luz visible) el zinc y el titanio sí reflejan hasta 60 % (fuente 3); por eso algunos se ven blancos. Va en la descripción.
- El estudio de 2016 fue patrocinado por Johnson & Johnson Consumer Inc. (lo dice el artículo); se aclara en la descripción. Salió en línea en noviembre de 2015, en el número de enero de 2016: por eso la voz dice "un estudio de 2016" (publicación), no "en 2016 lo midieron".
- El artículo de 1992 no dice en qué playa se hizo; Copenhague es la ciudad de los investigadores. No decir "playa de Copenhague".
- No todos los filtros orgánicos regresan intactos: la avobenzona se degrada con la luz si no se estabiliza (no entra en la voz; si se usa en la descripción, verificar fuente primaria antes).
- "En laboratorio": la prueba oficial de la FDA se hace en la espalda de voluntarios, en condiciones controladas, con 2 mg/cm².
- Dato para la descripción (no en la voz porque se midió con un FPS 4): según Faurschou y Wulf (2007), con la cuarta parte de crema el FPS cae a su raíz cuarta; aplicado a un FPS 30 sería un cálculo, no una medición, y se diría como estimación.
- El 97 % es de la AAD para UVB en condiciones de prueba; el FPS no mide UVA (para eso, "amplio espectro").
- Los datos de 1992 y 2016 tienen más de 2 años: la voz dice el año.
