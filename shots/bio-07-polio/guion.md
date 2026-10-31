# Shot Biotecnológico #07 · El virus que se escribió desde una secuencia (remasterización del viejo #11)

- **Serie:** Shot Biotecnológico · **Numeración:** #07 · **Tema del logo:** bioquímica (ADN + matraz).
- **Formato:** N4 "La imagen que se llena" (las 7,500 letras llenan la pantalla) + N2 "El número". **Gemelo mudo:** M1 "La música son los datos".
- **Gancho (de los 7 aprobados):** #3 "Tu vida o algo enorme en una imagen" — el genoma entero de un virus dibujado en una pantalla.
- **Duración:** narrada 61.5 s (voz ~58 s + cierre 3.5 s) · muda 61.5 s en loop.
- **Tono: bioseguridad.** El shot cuenta **qué significó** el experimento y **qué reglas dejó**. No explica ni insinúa ningún procedimiento: no hay método, ni materiales, ni pasos. Es historia de la ciencia y política de bioseguridad.

## Correcciones respecto al video viejo
1. El viejo decía "**Edward** Wimmer". Es **Eckard Wimmer**.
2. Fuente completa que faltaba: **Cello, J., Paul, A. V. y Wimmer, E., *Science* 297: 1016–1018 (9 de agosto de 2002)**, primero en Science Express en julio de 2002.
3. Se añade lo que el viejo no tenía: el **tamaño del genoma (~7,500 bases)**, el **costo y la escala del pedido** (más de cien fragmentos de ADN por unos 100,000 dólares), que el trabajo fue **financiado por DARPA**, la **reacción** del gremio y, sobre todo, **las reglas que salieron de ahí** (informe Fink de 2004, creación del NSABB y revisión de pedidos por parte de los proveedores de ADN sintético).
4. Se quita la frase final del viejo ("un futuro oscuro que se avecina"): el cierre ahora es el de bioseguridad, no el de misterio.

## Corrección del 28 oct 2026 (verificación de hechos independiente, ver `verificacion.md`)
1. **Causalidad del informe Fink:** el comité ya trabajaba antes de la publicación (se reunió entre abril de 2002 y enero de 2003), y el consejo de bioseguridad se creó después del informe. La voz decía "De ahí salieron reglas"; ahora dice "Después vinieron reglas", y el subtítulo dice "Después vinieron las reglas".
2. **Revisión de pedidos:** no la hacen todas las empresas; es voluntaria y de un consorcio cuyos cinco fundadores producían el 80 % de los genes sintetizados. La voz dice ahora (29 oct 2026, auditoría) "desde 2009, muchas empresas que fabrican ADN por encargo revisan, por su cuenta…": la fuente es de 2009 y el consorcio (IGSC, formado en 2009) sigue vigente con su protocolo V3.1 (2026).
3. **Comillas:** los chips "de eso se trataba / advertir del riesgo" iban entre comillas angulares como si fueran una cita textual; ya no las llevan (el chip "irresponsable" sí es textual y se queda).
4. En el `guion.md` no se encontró la sección `## Fuentes` duplicada que mencionaba el informe: hay una sola copia.
5. La voz cambió: se quitó `voz_aprobada` y el shot vuelve a "Por revisar" en la Sala.

## Versión narrada (917 caracteres, ~156 palabras, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto es un virus entero, escrito en una pantalla: siete mil quinientas letras. | **Desde el cuadro 0** la pantalla se va llenando de letras (cuadrícula de 50 × 150 = 7,500). La cámara sale de unas pocas letras al cuadro completo. `NumeroGigante` 7,500. |
| 1 | Equipo | En 2002, un equipo de Nueva York hizo algo que nadie había hecho antes. | `TarjetaEstudio` "2002 · Cello, Paul y Wimmer · Stony Brook, Nueva York". |
| 2 | Secuencia | No usaron una muestra del virus: usaron su secuencia, que estaba publicada. | Una hoja publicada; las letras salen de ella. `MitoTachado` "¿hacía falta el virus?" se tacha. |
| 3 | Pedazos | Pidieron por correo más de cien pedacitos de ADN, por unos cien mil dólares. | Sobres que llegan; `Contador` que sube a 100+. `NumeroGigante` "$100,000". |
| 4 | Arman | Los acomodaron en orden y armaron un poliovirus que sí funcionaba. | Los pedacitos se alinean en una tira que se enrolla y se vuelve una cápside. |
| 5 | Ratón | Lo probaron en ratones, y los ratones se paralizaron. | **Sobrio, sin imagen cruda:** silueta gris de un ratón que deja de moverse y un chip rojo. |
| 6 | Pregunta | ¿Para qué hacer algo así? | **Re-gancho.** Interrogación gigante. Sticker pensativo. |
| 7 | Porqué | Para demostrar que el código de la vida ya no solo se lee: también se escribe. | Dos flechas: ADN → letras ("leer") y letras → ADN ("escribir"). La segunda se enciende. |
| 8 | Science | Salió en Science en agosto de 2002 y el mundo se asustó. | Portada de revista con la fecha. |
| 9 | Crítica | Muchos colegas lo llamaron irresponsable; el equipo dijo que ese era el punto. | Globos de texto encontrados: «irresponsable» (textual) y, sin comillas, "de eso se trataba: advertir del riesgo". |
| 10 | Reglas | Después vinieron reglas: el informe Fink y un consejo de bioseguridad en Estados Unidos. | Dos documentos sellados: "Informe Fink · 2004" y "NSABB · 2004". |
| 11 | Hoy | Y desde 2009, muchas empresas que fabrican ADN por encargo revisan, por su cuenta, qué pides y quién eres. | Un pedido pasa por una lupa y recibe un sello de revisado. |
| 12 | Cierre | La misma herramienta que fabrica tu insulina pudo escribir un virus. Por eso hay reglas. | **Regreso a la pantalla de letras**, ahora con marco dorado y candado. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Narrada:** cama grave continua, sin golpe, debajo de la voz. Se pone tensa en "Ratón" y "Crítica", y se abre en "Reglas" (el problema se resuelve con reglas).
- **Datos hechos sonido:** cada fila de 50 letras que se llena es un tic (150 filas = 7,500 letras), los sobres que llegan son 10 golpecitos y los dos documentos de reglas son dos sellos.

## Gemelo mudo (M1 "La música son los datos", 61.5 s, loop) — `Shot Polio Datos.dc.html`
La pantalla vacía se llena de letras al ritmo: **una nota por cada fila de 50 letras**, 150 notas que suben mientras el contador llega a 7,500. Al completarse, las letras se enrollan y forman la cápside (acorde). Luego la silueta del ratón (un golpe grave y la música se tapa), el susto (ruido), y las reglas: **dos sellos y un candado que cierra** — ahí la música se destapa y queda limpia. El último cuadro vuelve a la pantalla vacía: el loop. 🎧 en el título.

## Descripción (para publicar)
"Esto es un virus entero escrito en una pantalla: unas **7,500 letras**. 🧬🔒 En 2002, el equipo de **Eckard Wimmer** en Stony Brook (Nueva York) publicó algo que cambió la conversación en biología: partiendo de la **secuencia ya publicada** del poliovirus, y sin usar una muestra del virus, armaron un poliovirus funcional. Encargaron por correo más de cien fragmentos de ADN por unos 100,000 dólares; el trabajo estaba financiado por DARPA. Al probarlo en ratones, los animales quedaron paralizados.

El artículo salió en *Science* el 9 de agosto de 2002 (Cello, Paul y Wimmer, vol. 297, pp. 1016–1018). La reacción fue mayormente de alarma: muchos colegas lo llamaron irresponsable, y los autores respondieron que justamente querían advertir de un riesgo que nadie tomaba en serio.

Hoy ese experimento es **el ejemplo clásico de la investigación de doble uso**: lo mismo que sirve para hacer vacunas o para fabricar tu insulina sirve para escribir un virus. De ahí salieron reglas: el **informe Fink** del Consejo Nacional de Investigación (2004), la creación del consejo de bioseguridad **NSABB**, y, desde 2009, la práctica de que muchas empresas que fabrican ADN por encargo revisen qué se les pide y quién lo pide: es una revisión voluntaria, nacida en 2009 en un consorcio internacional cuyos cinco fundadores producían el 80 % de los genes sintetizados (GEN, 2009).

Este video **no explica ningún procedimiento**: es historia de la ciencia y bioseguridad. El dibujo es esquemático. **¿Qué opinas: se debió publicar o no? 👇**"

## Robert en pantalla

Es la marca del canal: la ciencia se asocia a su cara. Entra desde el cuadro 0, vuelve cada 8-10 s y nunca tapa el subtítulo (el kit lo dibuja por delante de él).

### Versión narrada: 8 apariciones, **28.6 s en pantalla** (de 61.5 s)

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | «un virus entero: 7,500 letras» |
| 9,8 - 13,4 | bajando lentes (04) | arriba-der | «no usaron el virus: su secuencia publicada» |
| 19,2 - 22,8 | señalando (13) | arriba-der | senala el virus que se arma |
| 27,3 - 29,4 | pensativo (06) | arriba-der | re-gancho: «¿para que hacer algo asi?» |
| 34,8 - 38,2 | perfil serio (12) | arriba-der | Science, agosto de 2002 |
| 38,6 - 43,2 | serio (10) | **presentador** | «irresponsable, dijeron»: el momento grave, en grande |
| 48,9 - 52,5 | apuntando (02) | abajo-izq | «hoy se revisa que pides y quien eres» |
| 53,6 - 57,9 | sonriendo (05) | gancho | cierre: «por eso hay reglas» |

### Gemelo mudo: 8 apariciones, **28.5 s en pantalla**

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | la pantalla vacia |
| 8,5 - 12,0 | pensativo (06) | arriba-der | las letras se acumulan |
| 17,0 - 20,5 | bajando lentes (04) | arriba-der | 7,500: el genoma completo |
| 23,5 - 27,0 | señalando (13) | arriba-der | senala la capside que se forma |
| 31,0 - 35,0 | serio (10) | **presentador** | el raton: el momento grave, en grande |
| 36,2 - 39,6 | perfil serio (12) | arriba-der | el mundo se asusto |
| 42,2 - 45,6 | pensativo puno (07) | arriba-der | y salieron reglas |
| 50,2 - 54,0 | apuntando (02) | arriba-der | se lee... y se escribe |

En las dos versiones la tarjeta de cierre lleva a Robert junto al logo (`CierreMarca robert=`).

## Fuentes
- **Cello, J., Paul, A. V. y Wimmer, E., "Chemical synthesis of poliovirus cDNA: generation of infectious virus in the absence of natural template", *Science* 297(5583): 1016–1018 (9 de agosto de 2002)**; primero en Science Express, julio de 2002. Equipo de la Universidad Estatal de Nueva York en Stony Brook, dirigido por **Eckard Wimmer**; financiado por DARPA.
- **Congressional Research Service, "Synthetic Poliovirus: Bioterrorism and Science Policy Implications", informe RS21369 (diciembre de 2002)**: genoma del poliovirus de **~7,500 bases**; el equipo encargó **más de cien fragmentos de ADN por unos 100,000 dólares**; los ratones inoculados quedaron paralizados; y las respuestas de política discutidas entonces (revisión de pedidos por los proveedores de ADN, "conoce a tu cliente", control de la información y revisión previa a la publicación). El mismo informe señala que el poliovirus sería un arma débil y que otros agentes serían mucho más difíciles de sintetizar. https://www.everycrsreport.com/reports/RS21369.html
- **Wimmer y colegas, entrevistas retrospectivas**, *Bulletin of the Atomic Scientists* 66(3) (2010), "Reflections on the Synthetic Production of Poliovirus": la reacción del gremio fue mayormente negativa y los autores explican que el objetivo era advertir de un riesgo que no se tomaba en serio.
- **Informe Fink:** National Research Council, *Biotechnology Research in an Age of Terrorism* (2004); el comité presidido por Gerald Fink se reunió **entre abril de 2002 y enero de 2003**, es decir antes y después de la publicación, así que el informe no "salió de ahí" como consecuencia directa (CRS RL33342, https://www.everycrsreport.com/reports/RL33342.html): propone las "categorías de experimentos de preocupación", la autorregulación de científicos y revistas, y la creación de un consejo asesor.
- **NSABB** (National Science Advisory Board for Biosecurity): creado por el Departamento de Salud de EE. UU. **después del informe Fink** y constituido en marzo de 2004 (CRS RL33342); sus primeros miembros tomaron posesión en junio de 2005.
- **Revisión de pedidos de ADN sintético:** *Genetic Engineering & Biotechnology News*, 18 de noviembre de 2009: «By screening the sequences of synthetic gene orders and the customers who place them, the firms aim to support government efforts to prevent the misuse of gene-synthesis technology»; «The five founding companies of the International Gene Synthesis Consortium produce 80% of all synthesized genes». https://www.genengnews.com/topics/genome-editing/gene-synthesis-firms-set-up-biosecurity-protocol
- El dibujo del genoma, de la cápside y de los documentos es **esquemático**.
