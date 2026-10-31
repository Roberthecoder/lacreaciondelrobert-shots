# Shot Químico #20 · Esa fuente no es una reacción química (refresco de dieta y Mentos)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #20 · rama `pedido300/qui`.
- **Formato:** N5 "El experimento" (la botella con su fuente → el Mentos al microscopio y las burbujas → la medición de Coffey, 2008, con cronómetro y cinta métrica → la misma botella) con capítulos de N3 (Gas · Burbuja · Rugoso · Cadena).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Esa fuente no es una reacción química: es gas que ya estaba en tu refresco, saliendo de golpe."
- **Seguridad:** solo una recomendación genérica ("afuera y lejos de la cara"), sin afirmar daños ni mitos.
- **Duración:** voz 955 caracteres / ≈ 166 palabras (≈ 58.1 s) + cierre 3.5 s → **≈ 61.6 s** (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`mentos.jsx`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~955 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa fuente no es una reacción química: es gas que ya estaba en tu refresco, saliendo de golpe. | Fondo amarillo, pasto abajo. Desde el cuadro 0 una botella de 2 litros de refresco oscuro (sin marca) ya dispara un chorro café hacia arriba; caen gotas. Chip "¿reacción química?" que se tacha en "química" y aparece "gas que ya estaba". Barra de escala "10 cm". |
| 1 | Gas | La botella cerrada guarda dióxido de carbono disuelto, a presión. | Capítulo 1 "Gas". Rebobina: la botella cerrada con tapa; zoom al líquido y aparecen moléculas CO₂ (O=C=O) apretadas entre moléculas de agua; medidor de presión "alta" sobre el cuello. |
| 2 | Burbuja | Pero una burbuja no nace fácil: necesita un rincón donde empezar. | Capítulo 2 "Burbuja". Fondo noche: unas CO₂ intentan juntarse en el líquido liso y la burbujita se deshace ("pop" fallido); medidor "trabajo para formar burbuja" alto. |
| 3 | Rugoso | Y al microscopio, un Mentos es áspero, lleno de rincones donde nacen burbujas. | Capítulo 3 "Rugoso". Cae un Mentos blanco (1–2 cm); lupa al borde: superficie llena de picos y hoyos; barra de escala "1 µm" y chip "rugosidad ≈ 0.44 µm". En cada hoyo nace una burbuja. |
| 4 | Cadena | Esas burbujas suben y jalan más gas: en unos 4 segundos, sale disparado más de un litro. | Capítulo 4 "Cadena". Burbujas suben por la botella y crecen al chupar CO₂ del líquido; cronómetro 0 → 3.8 s; la columna de espuma sale por la boca; chip "> 1 litro". |
| 5 | Pregunta | ¿Y por qué el refresco de dieta lo hace mejor? | **Re-gancho.** Dos botellas lado a lado: "de dieta" y "con azúcar", con "?" gigante. |
| 6 | Estudio | En un estudio publicado en 2008, estudiantes de física de la Universidad Estatal Apalache, en Estados Unidos, midieron el pH: 3 antes y 3 después. No fue ácido-base. | Tarjeta "Publicado en 2008 · Coffey · Appalachian State University, Boone, Carolina del Norte, EE. UU." Botella en un soporte inclinado, banderitas cada medio pie en el suelo; medidor de pH "3.0" antes y "3.0" después; chip "ácido-base ✗". Al lado, en chico, bicarbonato: pH sube a 6.1 ("esta sí es reacción"). |
| 7 | Dieta | El aspartamo y el benzoato de ese refresco de dieta facilitan las burbujas; la cafeína casi no influyó. | Gotas sobre una superficie: la de agua pura, redonda (85°); con aspartamo (77°) y con benzoato (75°) más aplastadas; el medidor "trabajo para formar burbuja" baja. Etiqueta "cafeína" en gris con "≈ igual". Barras de distancia horizontal promedio (±10 %): dieta 15.3 pies vs. con azúcar 11.6 pies. |
| 8 | Molido | Lo chistoso: enteros, el chorro llegó a más de 4 metros; molidos, a 30 centímetros, en parte porque caen más lento. | Dos chorros sobre la cinta métrica: Mentos enteros, el chorro aterriza a ≈ 4.7 m; Mentos molidos (polvo) apenas 30 cm. Cronómetro de caída medido en agua: el entero cae rápido (0.7 s en agua). |
| 9 | Seguridad | Si lo haces, que sea afuera y lejos de la cara. | Ícono de patio al aire libre ✓ y una cara con flecha "lejos" (sin lentes ni texto alarmista). |
| 10 | Cierre | Así que esa fuente no es química: es el gas de tu refresco, que encontró por dónde salir. | **Regreso a la botella del inicio**: la misma fuente, ahora con las capas visibles: "CO₂ disuelto → rincón del Mentos → burbuja → chorro". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua que sube de tensión mientras el gas está "atrapado" y se libera en la fuente; efectos en el mismo cuadro (chorro y gotas, tapa, "pop" fallido de la burbujita, plop del Mentos al caer, burbujeo creciente, tic del cronómetro, golpe de la tarjeta, pitido del medidor de pH, salpicadura corta del polvo molido).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena con `CUES`). Grande en «¿Y por qué el refresco de dieta lo hace mejor?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «es gas que ya estaba en tu refresco» |
| 2 | 9.9 | 13.4 | 06_pensativo_menton | `arriba-der` | «necesita un rincón donde empezar» |
| 3 | 19.3 | 23.6 | 13_senalando_arriba | `arriba-der` | «sale disparado más de un litro» |
| 4 | 24.0 | 26.6 | 07_pensativo_puno | `grande` | «¿Y por qué el refresco de dieta lo hace mejor?» |
| 5 | 31.5 | 36.2 | 04_bajando_lentes | `arriba-der` | «3 antes y 3 después» |
| 6 | 37.0 | 39.6 | 06_pensativo_menton | `arriba-der` | «la cafeína casi no influyó» |
| 7 | 44.0 | 49.4 | 05_sonriendo_dientes_uniformes | `arriba-der` | «Lo chistoso… molidos, a 30 centímetros» |
| 8 | 49.9 | 52.5 | 12_perfil_serio | `arriba-der` | «afuera y lejos de la cara» |
| 9 | 53.0 | 58.0 | 02_apuntando_camara | `arriba-der` | «encontró por dónde salir» |
| — | 58.1 | 61.6 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 9 apariciones · ≈ 36 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (fuente primaria abierta y leída completa el 29 oct 2026)

1. **Estudio principal (todo lo de la medición)** — Coffey T.S. "Diet Coke and Mentos: What is really behind this physical reaction?" *American Journal of Physics* 76(6):551–557 (junio 2008). DOI 10.1119/1.2888546. Department of Physics and Astronomy, Appalachian State University, Boone, North Carolina. PDF: https://blog.danallan.com/static/papers/Coffey-Diet-Coke-and-Mentos-What-is-really-behind-this-physical-reaction-2008.pdf · página de la autora: https://www.appstate.edu/~coffeyts/dcm.htm
   - **Estudiantes de física:** "This study began as a project for physics majors enrolled in a sophomore level physics lab course. The students designed the experiment, did almost all of the data acquisition"
   - **pH 3 antes y 3 después; no es ácido-base:** "The pH of the diet Coke prior to the reaction was 3.0, and the pH of the diet Coke after the mint Mentos reaction was also 3.0. The lack of change in the pH supports the conclusion that the Mint Mentos–Diet Coke reaction is not an acid-base reaction."
   - **El gas ya estaba en el refresco:** "For the Mentos–Diet Coke reaction, the carbonic acid and carbon dioxide are not products of a chemical reaction but are already present in the Diet Coke, whose equilibrium is disturbed by the addition of the Mentos."
   - **Bicarbonato sí es ácido-base (pH 6.1):** "The pH of the Diet Coke after the baking soda reaction was 6.1, indicating that much of the acid present in the Diet Coke was neutralized by the reaction."
   - **Botella cerrada, CO₂ a presión:** "In a sealed bottle of soda pop, the gas above the liquid in the bottle has a high partial pressure of carbon dioxide compared to the air we breathe."
   - **Formar una burbuja cuesta trabajo:** "We used the measured contact angle to calculate the minimum work required to form a critical bubble"
   - **Rugosidad = sitios donde crecen burbujas:** "Increased surface roughness implies a higher surface area to volume ratio, meaning that more growth sites should be present" · "It is clear from Table V that the roughness of the sample is a major contributor to the explosiveness of the reaction." · Tabla V: "Mint Mentos 442" nm de rugosidad rms (AFM, imagen de 100 µm²).
   - **Rugosidad + surfactante de la capa:** "Hence it is the combination of a rough surface and the surfactant in the outer coating of the candy that causes the impressive reactions." (la capa trae goma arábiga: "The coating of the Mentos contains gum arabic, a surfactant that reduces the surface tension of water.")
   - **Las burbujas que suben jalan más gas:** "the bubbles formed will detach from the sample and rise up the bottle. The bubbles then act as growth sites, where the carbon dioxide still dissolved in the solution moves into the rising bubbles, causing even more liberation of carbon dioxide from the bottle."
   - **Unos 4 segundos:** "We found that the Diet Coke–Mint Mentos reaction lasted ≈3.8 s"
   - **Más de un litro:** Tabla I: "Diet Coke · Mint Mentos · 1410" g de masa perdida (botella de 2 l; ≈ 1.4 l de refresco).
   - **Publicado en 2008 (medido antes):** "Received 7 June 2007; accepted 5 February 2008".
   - **Dieta mejor que con azúcar:** "Drinks sweetened with aspartame, such as diet Coke or the diet tonic water, are more explosive than drinks sweetened with sugar (corn syrup), which is likely due to a reduction in the work required for bubble formation when aspartame is added." · Tabla II: "Diet Coke · Mint Mentos · 15.3" pies vs. "Coke Classic · Mint Mentos · 11.6" pies.
   - **Aspartamo y benzoato facilitan las burbujas:** "We have shown here via contact angle measurements that these ingredients reduce the work required for bubble formation, allowing carbon dioxide to rapidly escape from the soda." (ingredientes: "potassium benzoate and aspartame") · Tabla IV: ángulos 85° (agua), 77° (aspartamo), 75° (benzoato de potasio).
   - **La cafeína casi no influye:** "the presence or absence of caffeine in the beverages contributes little to the reaction." · "we do not agree that the caffeine in Diet Coke contributes significantly to the reaction."
   - **Más de 4 metros enteros vs. 30 cm molidos:** Tabla II: "Diet Coke · Mint Mentos · 15.3" pies (= 4.66 m) y "Diet Coke · Crushed Mint Mentos · 1.0" pie (= 30.5 cm) — distancia horizontal promedio del chorro, botella ~10° de la vertical.
   - **En parte porque caen más lento** (la caída de 0.7 s se midió en agua, no en refresco): "Longer distances traveled by the bubbles resulting in a more explosive reaction also partially explains the differences in explosive power for whole Mentos in contrast to crushed Mentos; the smaller particulates of the crushed Mentos fall through the liquid more slowly. However, a change in surface roughness might also occur" · "The average times were 0.7 s for the Mentos"
   - **Tamaño del Mentos (dibujo):** "a Mentos, which is 1 – 2 cm in diameter."

## Notas
- El dibujo es esquemático (moléculas, burbujas, la superficie del dulce y las gotas son ilustrativos; la botella no lleva marca).
- "No es una reacción química" se apoya en el pH sin cambio y en que el CO₂ ya estaba disuelto (Coffey 2008); el propio título del artículo la llama "physical reaction". En la descripción se aclara que es nucleación de burbujas (física de superficies), no una reacción entre sustancias.
- Las distancias son horizontales (botella inclinada ~10°) y en pies en el original; la voz dice "más de 4 metros" (15.3 pies = 4.66 m) y "30 centímetros" (1.0 pie = 30.5 cm). Cada combinación se probó de 2 a 4 veces, con ~10 % de incertidumbre.
- El estudio usó Diet Coke de EE. UU. (aspartamo + benzoato de potasio); en la descripción se dice "el refresco de dieta del estudio": las fórmulas de otros países pueden cambiar.
- Matiz para la descripción: la capa del Mentos trae goma arábiga, un surfactante que también ayuda; según Coffey, es la combinación de superficie rugosa + surfactante. Más caliente = fuente más fuerte (Tabla III, un solo intento por temperatura: no va en la voz).
- La seguridad es una recomendación genérica, no una afirmación del estudio.

