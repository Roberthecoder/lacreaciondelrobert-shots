# Ambiental #01 · El caballito que deja 12 litros (vinazas del tequila)

- **Serie:** Shot Ambiental · **Logo:** química (matraz) · **Badge:** #01 · remasteriza el viejo #9 (era improvisado).
- **Formato:** N2 "El número" + un momento N1 "Por dentro" (Lupa de rayos X en el río). Gemelo mudo: M1 "La música son los datos".
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre un caballito que se ve en pantalla.
- **Duración:** voz ≈ 949 caracteres (≈ 58 s con `velocidad` 1.065) + cierre 3.5 s → 61–62 s. **La voz no se ha generado:** espera tu aprobación (~950 créditos).
- **Tema local:** Jalisco (CIATEJ, Lagos de Moreno) y tu granja de hongos sobre bagazo, contada como algo que viene pronto.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este caballito de tequila no deja un vaso sucio: deja doce litros de un líquido café y ácido. | **A los 0.05 s se sirve el caballito** sobre fondo rosa; se aleja y detrás saltan 12 garrafas cafés. Número gigante "12 L". |
| 1 | Alambique | Se llama vinaza: es lo que queda en el alambique cuando se destila el tequila. | Alambique de cobre con fuego: el vapor sube por el cuello, gotea tequila al vaso; abajo se abre la llave y sale el chorro café. Etiquetas "tequila" y "vinaza". |
| 2 | Doce | Por cada litro de tequila salen, en promedio, doce litros de vinaza. | Un caballito "1 L" contra 12 garrafas que saltan una por una. "×12". |
| 3 | Ácida | Es ácida como jugo de naranja, y un solo litro puede contaminar veinte litros de agua. | Escala de pH: la vinaza cae en 3.4–4.5, junto a la naranja. Después, 20 litros de agua azul que se van manchando de café. Sticker sorprendido. |
| 4 | Río | Si llega a un río, las bacterias se la comen, gastan el oxígeno y los peces se asfixian. | Río en corte, la mancha café entra. **Lupa de rayos X**: bacterias que se multiplican y los O₂ que desaparecen. Medidor de oxígeno que baja; los peces boquean. |
| 5 | Pregunta | ¿Y si en vez de tirarla la ponemos a trabajar? | **Re-gancho.** La garrafa crece en pantalla con un "?". Sticker pensativo. |
| 6 | Reactor | En un reactor sin aire, otros microbios se la comen y sueltan biogás, un combustible. | Por dentro (fondo oscuro): la carga café desaparece, los microbios giran, suben burbujas y arriba se prende una flama azul. |
| 7 | Estudio | En 2025, el CIATEJ, en Jalisco, revisó qué más se le saca: hidrógeno, proteína y enzimas. | Tarjeta "2025 · CIATEJ · Jalisco". Cuatro garrafas con lo que se obtiene: biogás, H₂, proteína y agua tratada. |
| 8 | Bagazo | Y el agave deja otro residuo: el bagazo, las fibras que sobran al exprimirlo. | Piña de *Agave tequilana* entre rodillos: escurre el jugo y queda una maraña de fibras. Etiqueta "bagazo". |
| 9 | Setas | En Lagos de Moreno, un estudio cultivó hongos seta sobre ese bagazo. | Tarjeta "2024 · CU Lagos · UdeG". Bolsa de bagazo de la que salen racimos de setas en abanico (*Pleurotus ostreatus*). |
| 10 | Granja | Yo estoy armando una granja de hongos sobre bagazo. Pronto se las enseño. | Repisas de noche que se llenan de bolsas con setas. Chip "la granja de Robert · próximamente". Sticker apuntando a cámara. |
| 11 | Cierre | Así que ese caballito no deja doce litros de basura: deja doce litros de materia prima. | **Regreso a la imagen del inicio**: las 12 garrafas, ahora con su ícono (flama, H₂, proteína, agua, seta). Chip "materia prima". |
| — | Outro | (sin voz) | Cierre de marca con el logo de química. |

**Música:** cama grave continua, sin golpe. Efectos en el mismo cuadro: chorro y gotas al servir, 12 toques de las garrafas, fuego y goteo del alambique, burbujas, flama, molino. (`gen-audio.mjs`, sin costo).

## Gemelo mudo (M1 "La música son los datos", 61.5 s en loop) 🎧
`Shot Vinazas mudo.dc.html`. Poco texto: "1 L de tequila", contador "12 L de vinaza", pH, "biogás", "bagazo de agave", *Pleurotus ostreatus*.
1. **Caballito (0–5.5 s):** se sirve; el litro de tequila es **una nota clara**.
2. **Doce (5.5–14 s):** 12 garrafas = **12 notas que bajan y se ahogan**; luego 12 pulsos graves.
3. **Ácido (14–20 s):** pH 3.4, 4.0 y 4.5 → tres notas (nota = 40 + 3·pH); la naranja (3.6) suena una octava arriba.
4. **Río (20–29 s):** cada burbuja de oxígeno es una nota y se van acabando; la música **se tapa** mientras baja el O₂ (estado de la historia: problema). 20 toques = 20 L de agua.
5. **Reactor (29–38 s):** cada burbuja de biogás, **una nota libre** (se resuelve).
6. **Bagazo (38–45.5 s):** molino y fibras.
7. **Setas (45.5–55 s):** cada seta que sale suena en el cuadro en que aparece (72 notas que suben).
8. **Loop (55–61.5 s):** el caballito se vacía y queda igual que el primer cuadro.

## Robert en pantalla

Tiempos de la base narrada (antes de la voz; con la voz real se recorren solos porque están atados a cada escena).

**Narrada:** 8 apariciones + cierre · **23.3 s** en pantalla · 8 poses distintas · grande en: «¿y si la ponemos a trabajar?», «mi granja de hongos» · cierre: `CierreMarca` con apuntando a cámara.

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 2.2 | sorprendido | `gancho` | «…deja doce litros» |
| 2 | 8.1 | 10.2 | señalando | `arriba-der` | señala el chorro de vinaza |
| 3 | 17.1 | 19.5 | serio / molesto | `izq-alto` | «un litro contamina veinte de agua» |
| 4 | 25.1 | 27.8 | pensativo (mentón) | `grande` | «¿y si la ponemos a trabajar?» (grande) |
| 5 | 28.4 | 30.9 | perfil serio | `izq-alto` | el reactor sin aire |
| 6 | 38.7 | 41.7 | pensativo (puño) | `izq-alto` | el bagazo |
| 7 | 47.8 | 51.5 | apuntando a cámara | `grande` | «mi granja de hongos» (grande) |
| 8 | 52.0 | 56.9 | sonriendo | `arriba-der` | «materia prima» |
| — | 57.0 | 60.5 | apuntando a cámara | cierre | tarjeta final junto al logo |

**Mudo:** 7 apariciones · **30.5 s** en pantalla · 6 poses distintas (la primera y la última son la misma para que el loop no brinque).

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.5 | sorprendido | `gancho` | se sirve el caballito |
| 2 | 8.7 | 13.7 | serio / molesto | `arriba-der` | 12 garrafas |
| 3 | 23.0 | 26.5 | perfil serio | `izq-alto` | baja el oxígeno |
| 4 | 30.5 | 34.0 | señalando | `arriba-der` | la flama de biogás |
| 5 | 41.0 | 44.5 | pensativo (puño) | `izq-alto` | el bagazo |
| 6 | 48.0 | 54.5 | apuntando a cámara | `grande` | su granja de setas (grande) |
| 7 | 56.5 | 61.5 | sorprendido | `gancho` | vuelve al primer cuadro |

## Descripción (borrador)
"Este caballito de tequila no deja un vaso sucio: deja 12 litros de vinaza. 🥃 La vinaza es lo que queda en el alambique al destilar: un líquido café, ácido (pH de 3.4 a 4.5) y muy cargado de materia orgánica. Una revisión de investigadores del CIATEJ (2025) estima en promedio 12 litros de vinaza por cada litro de destilado y advierte que 1 litro puede llegar a contaminar 20 litros de agua. Si llega a un río, las bacterias se la comen y gastan el oxígeno disuelto. En un reactor anaerobio (sin aire), otros microbios la degradan y producen biogás; la misma revisión reúne otras salidas: hidrógeno, proteína unicelular y enzimas. El agave deja además bagazo, las fibras de la piña exprimida: en el Centro Universitario de los Lagos (UdeG) cultivaron hongo seta (*Pleurotus ostreatus*) sobre bagazo de agave. Yo estoy armando una granja de hongos sobre bagazo; pronto se las enseño. El dibujo es esquemático. ¿En tu región qué se hace con lo que sobra del tequila o del mezcal? 👇"

## Fuentes
- De la Torre-Anguiano, M. Á., Flores-Cosío, G. y Amaya-Delgado, L. (CIATEJ). "Residuos líquidos provenientes de las bebidas espirituosas mexicanas: su tratamiento y valorización". *Enfoques Transdisciplinarios: Ciencia y Sociedad* 3(2): 15–41 (21 jul 2025). revistaenfoques.ciatej.mx — 12 L de vinaza por litro de destilado (promedio); 1 L de vinaza puede contaminar 20 L de agua; productos: hidrógeno, biogás, proteína unicelular, enzimas.
- *Ciencia y Tecnología del Tequila* (CIATEJ): "entre 10 y 12 L de vinaza por cada litro de la bebida". Otras fuentes dan 7–12 L (UNAM, *Ingeniería Investigación y Tecnología* 23(2), 2022) o 10–15 L (UdeG). Por eso la voz dice "en promedio, doce".
- López-López, A. et al. (CIATEJ) "Tequila vinasses: generation and full scale treatment processes". *Reviews in Environmental Science and Bio/Technology* 9: 109–116 (2010): vinaza tequilera ácida (pH ≈ 3.4–4.5) y con DQO de 60,000–100,000 mg/L. Otras mediciones van de pH 3.4 a 4.7 según el proceso.
- Larios-Ulloa, M. y Ramírez-Muñoz, D. "Bagasse of *Agave tequilana*, *A. angustifolia* and *A. salmiana* for cultivation of the fungus *Pleurotus ostreatus*". *Revista Mexicana de Ciencias Agrícolas* 15(7), 2024. doi:10.29312/remexca.v15i7.3394 (CU de los Lagos, UdeG).
- pH del jugo de naranja ≈ 3.3–4.2 (dato de referencia general, FDA "Approximate pH of foods").
- Mecanismo del río (bacterias que consumen la materia orgánica y agotan el oxígeno disuelto): concepto de demanda química/bioquímica de oxígeno, en cualquier texto de tratamiento de aguas.

## Por verificar / notas
- El rango de pH 3.4–4.5 lo vi citado de López-López et al. (2010) en otras publicaciones; no pude abrir el artículo completo. Mediciones sueltas dan de 3.4 a 4.7.
- La cifra "12 L" es un promedio; las fuentes van de 7 a 15 L por litro. El guion lo dice como promedio.
- La granja de hongos de Robert es un proyecto: se presenta como "pronto", sin fechas.
- Un cálculo propio (no publicado tal cual): con las cifras del Consejo Regulador del Tequila de 2019 (351.7 millones de litros y 537 mil toneladas de bagazo) salen ~1.5 kg de bagazo por litro. **No se usa en la voz.**
