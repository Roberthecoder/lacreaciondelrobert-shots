# La fórmula viral — 120 videos a fondo (26 oct 2026)

**Qué se hizo.** Se analizaron los 10 videos más vistos de cada uno de los 12 canales (120 en total). De cada video se revisaron los primeros 60 segundos:

- **Lo que dice:** subtítulos con tiempos, palabras por minuto, cuántas veces dice "tú", preguntas y números.
- **Cómo se ve:** cortes, movimiento, segundos quietos, brillo, saturación y colores dominantes.
- **Cómo suena:** volumen, graves y agudos, ritmo (BPM), fuerza del pulso y cuántos golpes de sonido hay cada 10 s.
- **Cómo le fue:** vistas, likes, guardados, compartidos y comentarios.

Los datos están en `datos/analisis120.csv` (una fila por video) y la lista de videos en `datos/top10.json`.

> Límite: son 10 videos por canal. Sirve para ver patrones claros, no para medir efectos pequeños. Las vistas también dependen de la edad y los seguidores de cada cuenta.

---

## Lo más importante, en 7 puntos

### 1. El tema y la primera frase pesan más que la edición
Dentro de un mismo canal, los cortes, el movimiento, el color o el ritmo de la música **casi no predicen** qué video pega más (correlaciones cercanas a 0). Lo que separa un video de 3.5 M de uno de 300 K del mismo canal es **de qué habla y cómo arranca**.

También pesa la cuenta. El mismo tema, el camarón pistola, hizo **1.8 M** en @1action1reaction y **12 K** en @rarologia1, una cuenta nueva. El sesgo del superviviente hizo 568 K en @1bit1pixel3 y 130 K en @belltake.social. Con una cuenta joven, el gancho tiene que ser todavía mejor.

### 2. Los ganchos que ganan (y los que pierden)

| Tipo de gancho | Ejemplo real | Resultado |
|---|---|---|
| **"Esto no es X: es Y"** sobre algo que se ve | "Ese mosquito no te picó con una aguja: te metió 6" | **3.5 M** (1cell1life) |
| | "Una cana no es un pelo que se volvió blanco: ya nació sin color" | 2.4 M |
| | "Esto que sale del mar no es un pez volador, es un calamar" | 2.0 M (1action1reaction) |
| | "Los pájaros que vuelan en V no van así para que el primero les corte el viento" | 1.1 M |
| **Tú contra el de al lado** | "Los moscos pueden preferirte 100 veces más que a la persona de al lado" | **3.1 M** (as.pasa) |
| | "Tú te mareas en el carro y el de al lado va leyendo como si nada" | 840 K |
| **Tu vida o tu cuerpo en una imagen** | "Esto es una vida de 80 años dibujada en semanas" | **2.4 M**, el más compartido de los 120 (3.8 %) |
| **Un número que contradice** | "Ir a 120 en vez de 100 en 50 km te ahorra 5 minutos. Solo 5" | 2.2 M |
| **Reto: "casi todos fallan"** | El acertijo del granjero, el zorro y la gallina | 1.3 M y **2,328 comentarios**, el récord |
| **Mito peligroso: "¿Por qué NO…?"** | "¿Por qué levantarle las piernas?" (desmayo) | 1.5 M y 3.1 % guardados |
| **Algo que nunca vas a ver** | "El color que nunca verás" | 1.7 M; el resto del canal está por debajo de 250 K |

**Ganchos que pierden.** Ningún video que abre con **una fecha o una lección de historia** pasó de 130 K:

- "En 1897…": 17 K.
- "1943, ¿cuántos tanques…": 55 K.
- "El 18 de marzo…": 34 K.
- "En 1810 un naturalista…": 11 K.
- "Cada vez que dices faro…": 4 K.

También pierden **la voz que entra tarde**. En @belltake la voz empieza entre 1.8 y 4.3 s, y sus videos con voz se quedaron entre 12 K y 380 K. Sus dos mejores videos son mudos (943 K y 684 K).

### 3. La voz: rápida, desde el segundo 0, hablándote a ti
- Ritmo de **150–175 palabras por minuto** en los cuatro canales narrados más fuertes.
- En @1cell1life2, @1action1reaction y @1bit1pixel3 la voz entra **en el segundo 0.0–0.2 en todos sus videos con voz**.
- El video más visto de todos (mosquito, 3.5 M) dice "tú/te/tu" **7 veces en el primer minuto**.
- Frases de 2 a 4 segundos, cada una con una sola idea.

### 4. La duración real
Los canales narrados duran bastante más de un minuto:

| Canal | Mediana | Rango |
|---|---|---|
| @1cell1life2 | 134 s | 66–165 s |
| @1bit1pixel3 | 140 s | — |
| @as.pasa1 | 130 s | — |
| @1action1reaction | 107 s | — |

Los mudos duran entre 30 y 65 s.

Pero **dentro de cada canal, el más corto suele ganar**: en 9 de 12 canales, la mitad más vista dura menos. Por eso **tus 61–62 s siguen siendo buena idea**: pasas el minuto que pide TikTok para pagar y estás del lado corto.

### 5. La música: nunca es una canción conocida
- **Los 120 usan "sonido original".** Ni una canción de moda.
- **En los narrados, la música es una cama grave casi sin ritmo:**
  - Bajos fuertes y pulso débil (0.22 en una escala de 0 a 1).
  - Volumen parejo de unos −20 dB.
  - La voz manda y la música solo da atmósfera, como un zumbido de fondo.
- **En los mudos, la música va al frente** (pulso de 0.40–0.46) y **sale de los datos.** Por eso ponen 🎧 en el título:
  - **Corazones** (@bit_wonder, 1.5 M): cada animal toca su tambor a su ritmo cardiaco real, del colibrí a la ballena.
  - **Abejas:** cada vuelta de la danza dura un compás.
  - **Pelotas** (@watchthemath): cada rebote toca la siguiente nota de una melodía (Kalinka, Minueto en Sol).
  - **Bebé que se ahoga** (@justincase): la música suena tapada mientras la tráquea está bloqueada y se destapa cuando sale la comida. El llanto es su primer respiro.
  - **@vino.grafit lo confiesa:** "el sonido no se graba, se calcula: ruido por un filtro que se mueve es la página que pasa; una nota que sube es el chillido del cachorro".

### 6. Por qué la animación se siente "mágica" aunque sea IA
**Están hechos con código, igual que tu motor.** @vino.grafit lo dice en un video: *"Ni una imagen hecha: cada cuadro lo dibuja un programa, trazo por trazo. El código lo escriben seis agentes de IA, cada uno con su parte. La historia y las decisiones son mías; las manos, el código."* Una página de @justincase aparece etiquetada como "claude pixel animation".

La herramienta es la misma que la tuya. La magia sale de cinco hábitos:

1. **Fondo oscuro con colores que brillan.** En los 4 canales grandes, el brillo medio es de 0.14 a 0.30 y la saturación de 0.45 a 0.70. Las cosas parecen tener luz propia.
2. **Un solo mundo continuo.** Hacen de 0 a 2 cortes por minuto en los mejores canales. La cámara viaja, se acerca o entra en el cuerpo en lugar de cortar. Se siente como una sola toma imposible.
3. **Nada se queda quieto.** @1cell1life2 está quieto solo el 2 % del tiempo y @justincase el 3 %. Siempre hay partículas, respiración o algo que late. La excepción es @1bit1pixel3 (30 % quieto), donde la gráfica se llena mientras la voz lleva el ritmo.
4. **Una ventana hacia adentro.** @justincase pone un círculo de "rayos X" sobre el cuerpo del personaje. @1cell1life2 entra del cuerpo a la célula sin cortar. Ves lo que normalmente es invisible.
5. **Cada cosa que pasa en pantalla suena.** Un golpe, una gota o un latido tienen su sonido exacto en el mismo cuadro. Ojo y oído reciben la misma información.

### 7. Qué hace que guarden y qué hace que compartan
- **Guardan lo útil o de consulta:**
  - Primeros auxilios: de 2.3 a 3.1 %.
  - "¿Quieres ganar dinero con la guerra?" con fuentes: 5.1 %.
  - Escalas musicales y Tetris: alrededor de 2.5 %.
- **Comparten lo que habla de ti o de alguien que conoces:**
  - "Tu vida en una pantalla": 3.8 %.
  - La dormilona: 2.4 %.
  - "¿La gripa de hombre es puro drama?": 2.1 %.
  - El mareo en el carro: 2.0 %.

---

## Canal por canal

| Canal | Vistas (mediana) | Likes | Guardados | Compartidos | Duración | Voz | Cortes | Quieto | Brillo | Pulso musical |
|---|---|---|---|---|---|---|---|---|---|---|
| @1cell1life2 | 882 K | 9.6 % | 1.1 % | 1.3 % | 134 s | 10/10, 158 ppm | 2 | 2 % | 0.19 | 0.22 |
| @1bit1pixel3 | 757 K | 7.1 % | 0.9 % | 0.5 % | 140 s | 9/10, 161 ppm | 0 | 32 % | 0.14 | 0.24 |
| @1action1reaction | 737 K | 9.0 % | 0.7 % | 0.4 % | 107 s | 10/10, 170 ppm | 1 | 5 % | 0.28 | 0.22 |
| @justincase.lessons | 575 K | 12.1 % | **2.0 %** | 0.7 % | 52 s | muda | 0 | 3 % | 0.25 | 0.46 |
| @bit_wonder | 519 K | 11.4 % | 1.9 % | 0.7 % | 45 s | muda | 1 | 0 % | 0.22 | 0.40 |
| @as.pasa1 | 106 K | 6.6 % | 1.0 % | 1.3 % | 131 s | 7/10, 169 ppm | 1 | 0 % | 0.16 | 0.24 |
| @belltake.social | 92 K | 10.8 % | 1.3 % | 0.3 % | 58 s | 8/10, 156 ppm | 1 | 1 % | 0.82 | 0.28 |
| @watchthemath | 56 K | 1.3 % | 0.1 % | 0.0 % | 30 s | muda | 0 | 0 % | 0.91 | 0.21 |
| @infinite.expressions | 21 K | 6.8 % | 0.9 % | 0.3 % | 96 s | muda | 7 | 5 % | 0.41 | 0.32 |
| @rarologia1 | 14 K | 6.1 % | 0.5 % | 0.2 % | 98 s | 10/10, 166 ppm | 9 | 0 % | 0.33 | 0.23 |
| @lil_bit_of_science | 12 K | 7.1 % | 1.2 % | 0.7 % | 63 s | muda | 4 | 5 % | 0.29 | 0.34 |
| @vino.grafit | 10 K | **15.5 %** | 1.5 % | 0.6 % | 32 s | muda | 8 | 3 % | 0.48 | 0.33 |

**@1cell1life2: "por dentro".**
- **Gancho:** "X no es Y" sobre algo de tu cuerpo, de tu casa o del campo. Voz en el segundo 0.
- **Desarrollo:** viaja de afuera hacia adentro y explica un mecanismo por frase.
- **Imagen:** oscura y casi sin cortes, con la cámara siempre moviéndose despacio.
- **Descripción:** un mini artículo con la explicación completa.
- **Resultado:** los 10 videos pasaron de 300 K.
- **Para copiar:** el gancho que contradice y el "tú". Es exactamente tu formato N1.

**@1bit1pixel3: "la imagen que se llena".**
- Una sola gráfica de pixeles que se llena mientras la voz cuenta.
- Ganan "tu vida en una pantalla" (2.4 M) y "120 contra 100" (2.2 M).
- Los acertijos llenan los comentarios.
- **Para copiar:** convertir un dato en una imagen que el espectador quiere capturar y mandar.

**@1action1reaction: "este X hace algo imposible".**
- Siempre arranca con "este/esta" y una acción visible: el calamar vuela, el camarón dispara.
- Usa capítulos y medidores.
- **Para copiar:** que lo primero que veas sea el fenómeno pasando, no el contexto.

**@justincase.lessons: "Episodio N: ¿Por qué NO hacer X?".**
- Personaje de pixel art en una escena nocturna y un círculo de rayos X que muestra el cuerpo por dentro.
- Música que cuenta la historia: tapada mientras dura el peligro, libre cuando se resuelve.
- Tiene los guardados más altos de todos.
- **Para copiar:** el mito peligroso y el inserto de rayos X.

**@bit_wonder: "la música son los datos".**
- Videos cortos de 30 a 56 s, en pixel art con fondo noche.
- Títulos con 🎧. Lo que suena es lo que se mide.
- **Para copiar:** tu formato mudo M1 tal cual.

**@as.pasa1: "tú contra el de al lado".**
- Gana cuando compara al espectador con alguien cercano: moscos 3.1 M, mareo 840 K.
- Sus videos mudos con texto (cáncer, gripa, hombres) se quedan en 15–410 K.
- **Para copiar:** la comparación personal. **No copiar:** las aperturas que son solo texto.

**@belltake.social: "documento recortado con fuentes".**
- Papeles, recortes y sellos sobre fondo crema, con las fuentes en la descripción.
- Sus mudos rinden mejor que sus narrados porque en estos la voz entra tarde.
- **Para copiar:** las fuentes visibles y el tono serio. Lo guardan.

**@watchthemath: "la carrera".**
- Un solo video de 1.4 M con 1.3 % de likes. Mucha gente lo ve, pocos se enganchan.
- **No vale la pena como modelo principal.** Solo sirve como gemelo mudo de relleno.

**@infinite.expressions: "algo que tus ojos no pueden ver".**
- El color "olo" (1.7 M) contra un resto del canal por debajo de 250 K.
- La experiencia imposible para el espectador funciona; la historia de inventos, no.

**@rarologia1: buena producción en una cuenta nueva.**
- Voz y estructura muy parecidas a @1action1reaction, pero de 4 K a 859 K.
- Gana el experimento táctil: "si le acaricias el muslo con un pincel…".
- Pierden las historias que abren con fecha o con etimología.

**@lil_bit_of_science: "¿Cómo funciona X?".**
- Pixel art de calidad, pero títulos genéricos ("How does a battery work?") y un 25–30 % del tiempo quieto en los más flojos.
- Su mejor gancho es el que niega algo: "No, el uranio no es verde".

**@vino.grafit: ciclos de vida dibujados por código.**
- 30 s, pensados para verse en loop, con muchos cortes y mucho movimiento (35 de media).
- Tiene el mayor porcentaje de likes de todos (15.5 %), pero es una cuenta nueva.
- Es la prueba de que el método "agentes de IA + código + sonido calculado" ya funciona.

---

## La fórmula, en una página

**Pitch (de qué hablar)**
1. Algo que el espectador **ya vivió** o tiene en su cuerpo o su casa: un piquete, una cana, un calambre, el pie dormido, un moretón, el mareo, el pan.
2. Con una **creencia equivocada** que se pueda corregir, o con un **"¿por qué NO…?"** que proteja a alguien.
3. Mejor si hay **comparación personal** (tú contra el de al lado) o un **número que choca**.

**Estructura (los primeros 10 segundos lo deciden)**

| Tiempo | Qué pasa |
|---|---|
| 0.0 s | La voz empieza con la frase que corrige ("X no es Y: es Z") mientras se ve el fenómeno pasando. |
| 0–4 s | Se termina la frase del gancho, con "tú". |
| 4–10 s | El primer dato concreto: el nombre, la escala o la acción. |
| Después | Una idea por frase de 2–4 s, la cámara entra hacia adentro y aparece algo nuevo cada ~3 s. |
| Mitad | Una pregunta que reengancha ("¿Cómo sabe que llegó?"). |
| Cierre | Vuelve a la imagen del inicio, ya entendida, más la tarjeta de marca. |

Prohibido abrir con un año, con historia o con "cada vez que…".

**Música y sonido**
- **Narrado:** cama grave y continua sin golpe marcado. La voz al frente y efectos exactos en cada evento.
- **Mudo:** la música son los datos (ritmos reales, conteos, una nota por evento) y lleva 🎧 en el título. Que la música "cuente" el estado: tapada o libre, lenta o rápida.

**La magia visual**
- Fondo oscuro con colores brillantes solo en escenas internas. Fuera de ellas se quedan tus fondos de marca.
- Un mundo continuo: la cámara viaja, entra y sale, sin cortes secos.
- Siempre hay algo moviéndose: partículas, latidos, respiración.
- Una ventana hacia adentro: zoom o círculo de rayos X.
- Cada evento visual tiene su sonido en el mismo cuadro.

---

## Propuestas para tus reglas (aprobadas y aplicadas el 26 oct 2026 en `CLAUDE.md`, `RECETARIO.md` y el kit)

1. **Lista de ganchos aprobados** (los 7 de arriba) y **prohibidos** (abrir con fecha, con historia o con "cada vez que") en `CLAUDE.md`.
2. **Mudos: la música sale de los datos siempre**, no solo "cuando se pueda", con 🎧 en el título.
3. **Nueva pieza del kit: `Lupa`**, un círculo de rayos X que muestra el interior sobre la escena exterior, al estilo @justincase.
4. **Duración:** se quedan los 61–62 s. Opcional: probar algún narrado de ~90 s cuando el mecanismo lo pida y comparar.
5. **Descripción:** mini artículo con la explicación completa más fuentes (ya está en las reglas) y una pregunta para comentar, como "¿Cómo le dicen en tu región?" de @rarologia1.
