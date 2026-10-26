# Ingeniería inversa: canales de animación con IA que están pegando

> **Actualización 26 oct 2026:** el análisis a fondo de 120 videos (10 por canal, 60 s cada uno, ahora sí con la música medida) está en [`FORMULA_VIRAL.md`](FORMULA_VIRAL.md). Ese documento manda sobre lo de abajo cuando no coincidan.

Revisado el 25 oct 2026. Se revisaron los 12 canales y se analizaron a fondo los 5 videos más vistos
(uno por canal). **No se descargaron**: TikTok bloquea la descarga normal y saltarse ese bloqueo no
está permitido. Se analizaron dentro del navegador: cada cuadro cada 0.25 s (cortes, movimiento,
color), hojas de cuadros y los subtítulos automáticos de TikTok (texto y tiempos de la voz).
**Música y efectos no se pudieron escuchar**: esa parte la tiene que confirmar Robert oyéndolos.

## Los 5 videos

| # | Video | Vistas | Duración | Cortes duros | Voz | Palabras/min |
|---|---|---|---|---|---|---|
| 1 | [@1cell1life2 — El mosquito te mete seis agujas](https://www.tiktok.com/@1cell1life2/video/7699878347932716308) | 3.3 M | 141 s | 7 (1 cada 20 s) | Sí, desde 0.0 s | 168 |
| 2 | [@as.pasa1 — Te pueden preferir 100× (estudio Rockefeller)](https://www.tiktok.com/@as.pasa1/video/7699176804636003604) | 3.0 M | 130 s | 2 | Sí, desde 0.0 s | 175 |
| 3 | [@1bit1pixel3 — Tu vida cabe en una pantalla](https://www.tiktok.com/@1bit1pixel3/video/7698200878188170514) | 2.4 M | 139 s | 0 | Sí, desde 0.0 s | 167 |
| 4 | [@1action1reaction — Calamares que vuelan](https://www.tiktok.com/@1action1reaction/video/7693738357716782357) | 2.0 M | 106 s | 0 | Sí, desde 0.0 s | 168 |
| 5 | [@bit_wonder — Latidos: colibrí vs ballena](https://www.tiktok.com/@bit_wonder/video/7696368694150057230) | 1.5 M | 30 s | 0 | No (música hecha con los datos) | — |

Guardados y compartidos (señal de calidad): el #3 tiene la mejor proporción (90 mil compartidos y
63 mil guardados sobre 2.4 M): los cierres emotivos/reflexivos se comparten más.

Otros más vistos por canal (para ver después): @1cell1life2 "Una cana nace blanca" 2.4 M · @1bit1pixel3
"¿Cuánto ahorras yendo a 120?" 2.2 M · @belltake.social 931 K · @rarologia1 "chapulín" 859 K ·
@infinite.expressions "El color que nunca verás" 1.7 M · @justincase.lessons primeros auxilios 1.5 M ·
@watchthemath 1.4 M · @lil_bit_of_science 67 K · @vino.grafit 91 K.

## Qué hace cada uno

**1. Mosquito (@1cell1life2).** Sin una sola palabra en pantalla en los primeros 3 s: el mosquito aterriza
y pica. Voz: "Ese mosquito no te picó con una aguja: te metió seis". Segundo gancho a los 4 s: "la roncha
no la hizo él, la hiciste tú". A los 2.75 s pasa a un corte microscópico de la piel. Cámara siempre en
movimiento, poquísimos cortes. Fondo azul noche, agujas verde menta, células magenta. Texto: solo
etiquetas chiquitas de cada parte, barra de escala siempre visible, una frase mediana de vez en cuando
("1 de cada 2"). Re-gancho a los 57 s ("¿cómo sabe que llegó?"). Cierre que regresa al gancho ("esa
comezón no es el mosquito, es tu cuerpo avisándote..."). La descripción trae el guion completo y un
aviso de que el dibujo es esquemático.

**2. 100× (@as.pasa1).** Cuadro 0: número gigante naranja "100×", nube de moscos sobre "Tú" y nada sobre
"Al lado". 5 s: aparece el mito "¿Sangre dulce?" y a los 8 s se tacha. Subtítulo de una línea con una
palabra resaltada en naranja. Estructura: número → mito tachado → pregunta abierta → cómo te encuentran
(aliento → calor → olor) → el estudio (quién, cuándo, 64 voluntarios, 3 años) → "ahí salió el número del
principio" → mecanismo → **utilidad práctica** (qué repelente sí sirve, "revisa la etiqueta, no el anuncio")
→ riesgo (dengue) → cierre que retoma el gancho. Fuente en la descripción (De Obaldia et al., *Cell*,
2022). Español de México ("moscos"). Tiene escenas quietas de hasta 7 s y aun así funciona: la voz lleva
el ritmo.

**3. Tu vida en semanas (@1bit1pixel3).** Una sola imagen todo el video: una cuadrícula de 4,000 semanas
que se va llenando. Cero cortes, escenas quietas de hasta 16 s. Letra tipo máquina de escribir. Guion:
imagen concreta → comparación humana ("una caminata de 35 minutos") → datos → autor con nombre (Tim
Urban) → giro ("lo que se acaba no son las semanas, son las veces") → golpe emotivo ("hubo una última vez
que alguien te cargó") → cita de Séneca → pregunta final. Fuentes completas en la descripción.

**4. Calamares (@1action1reaction).** Calamares nadando bajo la luna; a los 1.5 s ya están saliendo del
agua, con la etiqueta "Pez volador" que la voz desmiente. Cero cortes. **Capítulos numerados** arriba a
la izquierda ("1 El motor", "2 El despegue", "3 Es un cohete", "4 El ala") y **medidores en vivo**
(m/s, km/h, metros). Re-ganchos a los 33 s ("lo increíble viene después") y 45 s ("aquí está el
detalle"). Comparación a escala humana ("como si tú recorrieras dos campos de fútbol"). Cierra con su
frase de marca: "Acción y reacción".

**5. Latidos (@bit_wonder).** Sin voz. 30 s en loop. Título fijo arriba ("ANIMAL HEART RATES"), número
grande "2 BPM" desde el cuadro 0. Cada ~3 s se suma un animal a una torre y toca su ritmo cardiaco real
como tambor: la música sale de los datos (el 🎧 del título invita a usar audífonos). Final: "ESTE VIDEO FUE
UN SOLO LATIDO" → dan ganas de verlo otra vez.

## La receta común

1. **La voz arranca en el cuadro 0**, sin logo, saludo ni intro. Primera frase = mito volteado o dato
   increíble, siempre hablándole a "tú".
2. **Pocos cortes.** 0–7 cortes en 2 minutos. El ritmo no lo dan los cortes sino: cámara que viaja (de
   lo grande a lo microscópico), algo nuevo cada ~3 s **atado a cada frase**, y la propia voz.
3. **Mucho más largos de lo que pensábamos:** narrados de 106–141 s (≈280–375 palabras, ~170 palabras
   por minuto, frases de 2–3 s). Sin voz: 30 s en loop.
4. **Poco texto en pantalla:** un título o número grande, etiquetas pequeñas para nombrar partes, a veces
   una línea de subtítulo con una palabra resaltada. El texto largo va en la descripción.
5. **Fondo oscuro (azul noche) + 1 o 2 colores de acento** (menta, naranja, magenta). Dibujo plano o
   pixel art. Una sola escena "mundo" que se transforma, en vez de muchas escenas sueltas.
6. **Guion:** gancho → mecanismo paso a paso → re-gancho cada ~30–45 s ("pero lo increíble viene
   después", "¿cómo sabe que llegó?") → número + comparación a escala humana → cierre que regresa al
   gancho (eso invita a repetir) → frase de marca.
7. **Rigor visible:** fuentes y aclaraciones en la descripción ("el dibujo es esquemático").
8. **Identidad de serie:** mismo formato, misma letra, capítulos numerados, frase de cierre fija.

## Propuesta: su receta con tu estilo

Lo que **se queda tuyo** (no se copia nada de ellos): tus stickers, tu logo y badge #NN, tu voz clonada,
tu trazo grueso y tus colores, tus temas y tus fuentes científicas.

Lo que **adoptamos de la receta**:

1. **Voz desde el cuadro 0, sin intro.** Primera frase = mito volteado + "tú".
   Fórmula afinada con @1cell1life2: ver "Receta final" abajo.
2. **Una escena continua que viaja** (de la hormiga al micelio dentro de ella) en lugar de muchos
   cambios de escena. Algo nuevo cada ~3 s ligado a cada frase de la voz. El motor ya sabe en qué
   segundo dice cada palabra tu voz (campo `nat`), así que esto se puede automatizar.
3. **Tus stickers como "reacción"**, no como personaje dentro de la escena: aparecen chiquitos en la
   esquina en los re-ganchos (sorprendido, pensativo, señalando). Eso ninguno de ellos lo tiene: es tu
   sello.
4. **Texto:** título o número grande arriba + etiquetas chicas con nombre común y *científico* + una
   línea de subtítulo con una palabra resaltada en dorado (ya lo haces; se mantiene fuera del tercio
   inferior).
5. **Capítulos numerados** pequeños arriba (debajo de tu logo) y **medidores reales** cuando el tema lo
   permita (tamaño en µm, tiempo en días, número de esporas).
6. **Duración:** 61–62 s en ambas versiones (decisión de Robert, para monetizar; voz de ~58 s ≈160–165 palabras + tarjeta de cierre); la sin voz en loop, con la música
   hecha de los datos del tema cuando se pueda, y un final con giro que invite a verlo otra vez.
7. **Re-gancho cada ~30 s** y **cierre que retoma el gancho** + frase de marca fija (por definir contigo).
   La tarjeta de cierre, 3–4 s.
8. **Descripción:** guion completo + fuentes + "el dibujo es esquemático". Encaja perfecto con tu rigor.

### Decisiones de Robert (25 oct 2026)
- Colores: se mantienen los brillantes de la marca; fondo oscuro solo en escenas microscópicas/internas.
- Duración: 61–62 s en ambas versiones (voz de ~58 s + tarjeta de cierre), para pasar del minuto que pide TikTok.
- Ritmo: aprobadas las reglas nuevas (ya están en `CLAUDE.md` y las guías).

---

# Los otros 7 canales (25 oct 2026)

| Canal | Video más visto | Vistas | Dur. | Voz | Lo que aporta |
|---|---|---|---|---|---|
| @justincase.lessons | Por qué levantarle las piernas a quien se desmaya | 1.5 M (46 K guardados) | 34 s | No | Pregunta fija arriba desde el cuadro 0, medidor 40 % → 100 %, lupas circulares. Utilidad = guardados |
| @infinite.expressions | El color que nunca verás | 1.7 M (30 K guardados) | 102 s | No (texto) | Episodios numerados, "Parte 1/3", **participación** ("mira fijamente el punto") |
| @watchthemath | Pelotas que cortan cuerdas | 1.4 M | 46 s | No | Simulación hipnótica con la regla escrita. Muchas vistas, 1.3 % de likes, 1,530 seguidores: no crea comunidad |
| @belltake.social | ¿Quieres ganar dinero con la guerra? | 931 K (48 K guardados) | 165 s | — | Guía irónica en pasos ("Paso 1… Paso 12"), estética de periódico, lista enorme de fuentes |
| @rarologia1 | El chapulín que se vuelve langosta | 859 K | 96 s | Sí (163 ppm) | Recrea el experimento con cronómetro, mapa de México como escala, subtítulos palabra por palabra, pregunta para comentarios |
| @vino.grafit | Ciclo de vida del salmón | 91 K (21 % likes) | 30 s | No | Ciclo completo que termina donde empezó: loop perfecto |
| @lil_bit_of_science | ¿Cómo se formó el Sol? | 67 K | 54 s | No | **Qué no hacer:** abre con tarjeta de título y sol quieto |

Con todos los canales se armó el **recetario de formatos** (`RECETARIO.md`): 6 narrados, 5 mudos,
sus parejas y el reparto por serie.

---

# Análisis a fondo de @1cell1life2 (el canal que Robert quiere replicar)

Se revisaron sus 40 videos visibles (TikTok pide iniciar sesión para ver más) y se analizaron 8 a fondo:
los 6 más vistos y, para contrastar, 2 que fracasaron. Datos sacados de los subtítulos automáticos y de
hojas de cuadros.

| Video | Vistas | Likes | Duración | Palabras | Primera frase |
|---|---|---|---|---|---|
| [Mosquito: seis agujas](https://www.tiktok.com/@1cell1life2/video/7699878347932716308) | 3.3 M | 238 K | 141 s | 374 | "Ese mosquito no te picó con una aguja: te metió seis" |
| [Una cana nace blanca](https://www.tiktok.com/@1cell1life2/video/7698072833104055573) | 2.4 M | 160 K | 133 s | 338 | "Una cana no es un pelo que se volvió blanco: ese pelo ya nació sin color" |
| [La dormilona](https://www.tiktok.com/@1cell1life2/video/7698928072350960916) | 1.5 M | 272 K | 131 s | 327 | "Toca esta planta y en un segundo se desmaya" |
| [Se te duerme el pie](https://www.tiktok.com/@1cell1life2/video/7697413962123726100) | 1.3 M | 145 K | **66 s** | 161 | "Ese hormigueo no es tu pie despertando: es un nervio que vuelve a encenderse" |
| [Semilla que se taladra](https://www.tiktok.com/@1cell1life2/video/7695639266822540564) | 927 K | 69 K | **69 s** | 176 | "Esta semilla no espera a que alguien la entierre: se está taladrando sola" |
| [Moretón](https://www.tiktok.com/@1cell1life2/video/7699503749936565525) | 767 K | 121 K | 136 s | 358 | "Ese moretón se va a poner verde y luego amarillo, y no se está despintando" |
| [*Ophiocordyceps*](https://www.tiktok.com/@1cell1life2/video/7695466121553546517) ❌ | 87 K | 10 K | 78 s | 189 | "Esta hormiga está a punto de morir y ya no decide a dónde va" |
| [Caries](https://www.tiktok.com/@1cell1life2/video/7699142668525243669) ❌ | 13 K | 1.3 K | 157 s | 404 | "Ahora mismo, pegadas a tus dientes, hay bacterias esperando tu próxima comida" |

Otros fuertes del canal: calambres 499 K, cuscuta 353 K, piel quemada 340 K, hormigas agricultoras 311 K,
fago T4 265 K. Débiles: medusa inmortal 9 K, olas que brillan 5 K, moco 12 K, plaquetas 12 K.

## Lo que tienen los ganadores (y no los perdedores)

1. **La primera frase corrige algo que crees.** 5 de 6 ganadores usan "X no es Y: es Z" ("no te picó con
   una aguja", "no es un pelo que se volvió blanco", "no es tu pie despertando", "no se está despintando").
   Los perdedores *describen* ("esta hormiga está a punto de morir", "hay bacterias en tus dientes": eso
   ya lo sabías).
2. **Algo que te pasó a ti.** Picadura, cana, pie dormido, moretón, tocar una planta. El tema es una
   experiencia que el espectador ya vivió; el video le explica lo que no vio. La hormiga es lejana.
3. **En el primer segundo algo pasa.** El mosquito aterriza y pica; un dedo toca la hoja a los 0.5 s y
   se cierra a los 1.5 s; el sol se vuelve luna en 1 s (time-lapse). En los perdedores, 2 s de hormiga
   caminando y dientes quietos.
4. **Viaje macro → micro → macro.** Abre a escala real (tu brazo, tu cuero cabelludo, tu pie), baja al
   microscopio (ahí sí fondo oscuro) y **cierra en la misma imagen del inicio, ya transformada**: todos
   los pelos blancos, el moretón amarillo, el pie tranquilo. Ese "antes/después" cierra el ciclo y empuja
   a verlo otra vez. La barra de escala (2 cm → 500 µm) está siempre visible.
5. **Un estudio real con año y lugar, actuado como escena.** "En 2023 un equipo siguió esas células una
   por una", "en 2022 en Japón pusieron saltamontes", "en 2014 en Australia dejaron caer macetas desde
   15 cm" — se dibuja el experimento. A veces insertan una foto real ~6 s como prueba.
6. **Un dato extra sorprendente en el último tercio:** "algunos van soltando gotitas por detrás", "sí, el
   color de tu popó viene de la misma sangre reciclada", "la planta recuerda qué cosas no dan miedo",
   "inspiró semillas que se plantan desde drones".
7. **Ritmo:** 158–168 palabras/min, frases de 2–4 s, pocas o ninguna escena cortada en seco.
8. **Texto mínimo:** etiquetas chicas, el año en grande cuando citan el estudio, nombre común
   ("DORMILONA / VERGONZOSA") y barra de escala. El guion completo va en la descripción.
9. **Cierre de marca:** la imagen final se oscurece y aparece "1Cell1Life — Síguenos para más biología"
   unos 3 s.
10. **Duración:** funcionan los dos formatos. Los de ~1 minuto (66 s y 69 s, ≈160–175 palabras) lograron
   1.3 M y 927 K. **Ojo: los dos duran un poco más de 60 s** — la voz acaba ~60 s y la tarjeta de marca
   los lleva a 66–69 s. Encaja con la regla de TikTok de pagar solo videos de *más* de un minuto.

## Nota de monetización
Varias guías de 2026 coinciden en que el programa de pagos de TikTok (Creator Rewards) solo cuenta videos
de **más de 1 minuto** (no es la página oficial de TikTok; conviene confirmarlo ahí). Un video de 60.0 s
exactos podría quedar fuera. Propuesta: voz de ~58 s + tarjeta de cierre → **61–62 s** totales, como hace
@1cell1life2. **Decidido por Robert: 61–62 s.**

---

# Receta final (fusión con La Creación del Robert)

**Tema:** algo que el espectador ya vivió o tiene en su cuerpo o su casa (o que puede tocar), explicado
por dentro. Si el tema es lejano (como la hormiga zombi), el gancho tiene que conectarlo con "tú".

**Guion (≈160–165 palabras para ~58 s de voz):**
1. 0–4 s: "X no es Y: es Z" + "tú". Ej.: "Esa roncha que te dio comezón no la hizo el mosquito: la hiciste tú".
2. 4–15 s: dónde y cómo empieza, a escala real.
3. 15–40 s: el mecanismo, una idea por frase (2–4 s cada una), bajando al microscopio.
4. ~30 s: re-gancho con pregunta ("¿y cómo sabe que llegó?").
5. 35–50 s: un estudio real con año y lugar, dibujado como escena.
6. 50–55 s: el dato extra sorprendente o chistoso.
7. 55–58 s: frase final que regresa al gancho, sobre la misma imagen del inicio ya transformada.
8. 58–62 s: tarjeta de cierre con tu logo (total 61–62 s).

**Imagen (tu estilo, no el suyo):**
- Escena macro inicial con tus colores brillantes y trazo grueso; algo se mueve antes del segundo 1.
- Zoom continuo al microscopio: ahí fondo oscuro con tus colores de acento.
- Barra de escala siempre visible (es rigor y es estética).
- Última escena = primera escena transformada.
- Tus stickers como reacción en la esquina en el re-gancho y en el dato sorprendente.
- Tu logo y badge #NN arriba a la izquierda; subtítulo de una línea con palabra en dorado, fuera del
  tercio inferior.

**Lo que no se copia:** sus personajes, su letra tipo máquina de escribir, su paleta azul noche como
fondo general, su logo y su frase de cierre.

**Sobre tu shot 001 (hormiga zombi):** @1cell1life2 hizo el mismo tema y fue de sus peores (87 K). No
por el tema, sino por el gancho descriptivo y 2 s sin acción. Para futuros temas "lejanos", el gancho
debe voltear una idea y meter al espectador.

### Siguiente paso sugerido
Shot 002 con esta receta, sobre una experiencia cotidiana (p. ej., por qué te arden los ojos al picar
cebolla, por qué se arruga la piel en el agua, de dónde sale una ampolla). Avisar el costo de ElevenLabs
(≈1,000–1,100 caracteres para ~58 s de voz) antes de generar.
