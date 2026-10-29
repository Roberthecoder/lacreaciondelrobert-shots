# Shot Químico #55 · Ese polvo no es un solo truco (polvo para hornear de doble acción)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #55 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (la cucharada de polvo cae en la masa → las partículas, los ácidos y el CO₂ al microscopio → el mismo pastel, ya horneado) + N3 "Capítulos y medidores" (Cap. 1 «En tu tazón», Cap. 2 «En tu horno», con termómetro en vivo de la masa).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Ese polvo para hornear no es un solo truco: son dos reacciones, una en tu tazón y otra en tu horno."
- **Seguridad:** nada peligroso; solo cocina. No se habla de salud del aluminio (no cabe sin matices; ver Notas).
- **Duración:** voz 957 caracteres (≈ 57.9 s) + cierre 3.5 s → **61.4 s** (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~957 créditos).

## Versión narrada

Tiempos aproximados de `estimar-escenas.mjs`.

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho (0–6 s) | Ese polvo para hornear no es un solo truco: son dos reacciones, una en tu tazón y otra en tu horno. | Fondo amarillo. Desde el cuadro 0 una cuchara vuelca polvo blanco (lata "doble acción") sobre un tazón de masa de pastel: salpica una nube de polvo. Al decir "dos reacciones" aparecen dos chips: 🥣 «1 · tazón» y 🔥 «2 · horno». |
| 1 | Que (6–13 s) | Trae bicarbonato de sodio, dos ácidos y fécula de maíz, que absorbe humedad para que no reaccionen en la lata. | Lupa sobre la cucharada: se separan 4 tipos de granitos con etiqueta: NaHCO₃ (blanco), ácido 1 (azul), ácido 2 (morado) y fécula (crema). Dentro de la lata, unas gotitas de humedad son atrapadas por los granos de fécula; los granos de ácido y bicarbonato quedan quietos con un candado. |
| 2 | Agua (13–19.5 s) | Al mojarse, el primer ácido, fosfato monocálcico, le saca al bicarbonato dióxido de carbono. | Fondo noche (escena micro). Cae una gota de leche; el granito azul (fosfato monocálcico) se disuelve en iones; choca con el bicarbonato y sale una molécula CO₂ (O=C=O) + agua. Medidor «Cap. 1 · 22 °C». |
| 3 | Burbujas (19.5–22 s) | Ese gas infla las burbujitas de la masa. | Las moléculas de CO₂ entran en burbujitas de aire ya presentes en la masa, que crecen un poco. Escala «0.1 mm» (esquemática). |
| 4 | Pregunta (22–24 s) | ¿Y para qué un segundo ácido? | **Re-gancho.** El granito morado sigue intacto, girando; "?" gigante encima. |
| 5 | Horno (24–30.5 s) | El segundo, como el sulfato de sodio y aluminio, casi no reacciona en frío: despierta con el calor del horno. | La cámara sale al tazón → el molde entra al horno (puerta que se cierra, resplandor naranja). Medidor «Cap. 2» con termómetro que sube de 22 °C hacia arriba; el granito morado "despierta" (brillo), se disuelve y suelta una segunda ola de CO₂: las burbujas crecen y la masa se levanta en el molde. |
| 6 | Estudio (30.5–39.5 s) | En 2021, en Lovaina, Bélgica, hornearon pasteles midiendo el gas: con ácidos rápidos, mucho se escapó al batir y salieron más bajitos. | `TarjetaEstudio` «2021 · KU Leuven, Bélgica · LWT». Batidora girando: con el ácido rápido, burbujas de CO₂ escapan del tazón ("se escapa al batir"). Luego dos pasteles lado a lado: «ácido lento» alto y «ácido rápido» más bajito. |
| 7 | Cuaja (39.5–46 s) | Pero el gas tiene que llegar a tiempo: ahí la masa empezó a cuajar cerca de 88 grados, y ya cuajada, el gas extra se escapaba. | Termómetro de la masa sube y marca «≈ 88 °C»: la masa líquida se vuelve esponja (las paredes de las burbujas se endurecen). Las burbujas se abren y el CO₂ que llega tarde sale por los poros como hilitos, sin levantar más el pastel. |
| 8 | Norma (46–52 s) | Lo curioso: una norma del gobierno de Estados Unidos, de 1987, pedía que soltara en gas al menos 12 por ciento de su peso. | Báscula con una cucharada de polvo; de ella sale una nube de CO₂ que se separa: barra «≥ 12 % de su peso = CO₂». Chip «norma USDA · 1987 · cancelada en 2002». |
| 9 | Cierre (52–58 s) | Así que ese polvo no es un solo truco: es gas en dos turnos, uno en tu tazón y otro en tu horno. | **Regreso al tazón del inicio**, ahora convertido en el pastel esponjado que sale del horno; los mismos chips 🥣 «1 · tazón» y 🔥 «2 · horno» se encienden uno tras otro. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química sobre el pastel oscurecido. |

**Música:** cama grave continua; efectos en el mismo cuadro: cucharada que cae ("puf"), gota, burbujeo suave al mojarse, puerta del horno, zumbido del termómetro que sube, "pop" de la segunda ola de burbujas, batidora, siseo del gas que se escapa por los poros, "clic" de la báscula.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y para qué un segundo ácido?» y en el dato curioso de la norma.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «son dos reacciones» |
| 2 | 7.0 | 12.3 | 13_senalando_arriba | `arriba-der` | «dos ácidos y fécula de maíz» |
| 3 | 14.0 | 19.8 | 06_pensativo_menton | `arriba-der` | «le saca al bicarbonato dióxido de carbono» |
| 4 | 20.9 | 23.1 | 07_pensativo_puno | `grande` | «¿Y para qué un segundo ácido?» |
| 5 | 25.0 | 29.0 | 05_sonriendo_dientes_uniformes | `arriba-der` | «despierta con el calor del horno» |
| 6 | 32.7 | 37.0 | 10_serio_molesto | `arriba-der` | «salieron más bajitos» |
| 7 | 38.3 | 44.5 | 04_bajando_lentes | `arriba-der` | «el gas extra se escapaba» |
| 8 | 45.1 | 51.8 | 11_sorprendido | `grande-izq` | «al menos 12 por ciento de su peso» |
| 9 | 52.4 | 57.8 | 02_apuntando_camara | `arriba-der` | «uno en tu tazón y otro en tu horno» |
| — | 57.9 | 61.4 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 9 apariciones · ≈ 45 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **Composición del polvo de doble acción (bicarbonato + fosfato monocálcico + sulfato de sodio y aluminio + fécula de maíz) y que suelta gas en dos etapas** — Clabber Girl, *Double Acting Baking Powder – Product Specification* (rev. 25 feb 2019). https://www.webstaurantstore.com/documents/specsheets/clabber_girl_dabp_spec.pdf
   > "A double acting chemical leavening product that is designed to release carbon dioxide gas in two stages." · "This double acting formula contains corn starch, sodium bicarbonate, sodium aluminum sulfate and monocalcium phosphate."
2. **Norma de EE. UU. (1987): ingredientes y mínimo de 12 % de CO₂** — USDA, *Commercial Item Description A-A-20094A: Baking Powder* (4 dic 1987). https://condimentsrelatedproducts.emilspec.com/A-A-20094/index.html
   > "shall be comprised of acid-reacting materials, sodium bicarbonate, and cornstarch." · "shall be mixtures of calcined sodium aluminum sulfate and calcium phosphate, monobasic." · "The available carbon dioxide shall be not less than 12 percent, by weight of the baking powder."
   - **Cancelada:** USDA, *A-A-20094A Notice 1* (15 ene 2002), everyspec.com. > "Commercial Item Description A-A-20094A, dated December 4, 1987, is hereby canceled without replacement."
3. **Fosfato monocálcico reacciona al mojarse; sulfato de sodio y aluminio solo con calor; la fécula absorbe humedad en la lata** — America's Test Kitchen (Cook's Illustrated), "Understanding Baking Powder". https://www.americastestkitchen.com/how_tos/8830-understanding-baking-powder
   > "The MCP goes to work as soon as liquid is added to the dry ingredients" · "SAS and … SALP, don't react with baking soda and water at room temperature. It's only in the oven, when the temperature rises above 120 degrees Fahrenheit, that their leavening power goes to work." · "It absorbs moisture, thereby helping to keep the acid and the baking soda from interacting during storage"
   - Fuente técnica: American Society of Baking, "Sodium Aluminium Sulfate (SAS)". https://asbe.org/article/sodium-aluminium-sulfate-sas/
     > "SAS is commonly used in combination with monocalcium phosphate in double-acting baking powders. It does not react with baking soda until it is above 140 oF."
   - Respaldo académico: grupo de investigación Innograin (Universidad de Valladolid), "Leavening Agents or Baking Powders" (2024). https://innograin.uva.es/en/2024/06/17/leavening-agents-or-baking-powders/
     > "Monocalcium phosphate reacts at room temperature similarly to cream of tartar" · "Most commercial leavening agents are double-acting leavening agents" · "together with a starch or flour to dilute the product, facilitate weighing, and prevent early reaction."
4. **Reacción ácido + bicarbonato → CO₂; el CO₂ infla las burbujas; estudio de 2021 en KU Leuven (ácidos rápidos: gas perdido al batir y pasteles de menor volumen); la masa empieza a cuajar a ~88 °C; el CO₂ tardío se escapa** — Godefroidt T., Ooms N., Bosmans G., Brijs K., Delcour J.A. "An Ohmic heating study of the functionality of leavening acids in cream cake systems." *LWT – Food Science and Technology* 152:112277 (dic 2021). DOI 10.1016/j.lwt.2021.112277 (manuscrito abierto en el repositorio de KU Leuven: https://lirias.kuleuven.be/retrieve/630125).
   > "Laboratory of Food Chemistry and Biochemistry … KU Leuven, Kasteelpark Arenberg 20 box 2463, B-3001 Heverlee, Belgium" · "NaHCO3 + HX → NaX + H2O + CO2" · "The gas cells in the batter expanded significantly due to production of a large amount of CO2" · "Early-acting organic acids produced high amounts of CO2 during mixing which could not be retained. This yielded low volume cakes." · "Use of citric or α-ketoglutaric acids on the other hand, resulted in lower cake volumes" · "For the control cakes, said temperature [start of structure setting] was 88.4 (± 0.8) °C." · "Once the crumb structure has fully set, additionally produced CO2 freely passes through the cake structure and cannot contribute to further leavening"

## Notas
- El dibujo es esquemático (granitos de colores, moléculas, burbujas y escala).
- "Los ácidos rápidos" del estudio de Lovaina eran ácido cítrico y α-cetoglutárico, comparados con un ácido lento (SAPP28) en pastel tipo "cream cake"; el estudio no probó una marca comercial de polvo para hornear. La voz dice "con ácidos rápidos", sin nombrar marcas.
- Los 88 °C son la temperatura a la que **empezó** a cuajar la masa en ese estudio (horno de resistencia eléctrica, pasteles de control); otras recetas pueden variar. La voz dice "ahí" y "cerca de".
- No todos los polvos de doble acción usan sulfato de sodio y aluminio: muchos (sobre todo los "sin aluminio" y en Europa) usan pirofosfato ácido de sodio (SAPP) como ácido lento, y Rumford es de doble acción con un solo ácido (fosfato monocálcico). Por eso la voz dice "como el sulfato de sodio y aluminio". En la descripción conviene aclarar que se revise la etiqueta del bote.
- La norma de 1987 (CID A-A-20094A) era para compras del gobierno de EE. UU. (no es ley mexicana) y **se canceló sin reemplazo el 15 ene 2002**; por eso la voz habla en pasado ("pedía"). La ficha de Clabber Girl (2019) dice que normalmente supera 14.5 %.
- El bicarbonato solo, sin ácido, también suelta CO₂ con el calor, pero solo la mitad (Godefroidt et al. 2021: "only 50% of the theoretical amount of CO2"); dato útil para la descripción.
