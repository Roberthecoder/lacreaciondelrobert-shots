# Shot Biotecnológico #06 · El virus que te deja tomar leche (remasterización del viejo #10)

- **Serie:** Shot Biotecnológico · **Numeración:** #06 · **Tema del logo:** bioquímica (ADN + matraz).
- **Formato:** N1 "Por dentro" + N5 "El experimento". **Gemelo mudo:** M4 "Ciclo" (abajo).
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre el virus que se ve en pantalla.
- **Duración:** narrada 61.5 s (voz ~58 s + cierre 3.5 s) · muda 61.5 s en loop.
- **Viaje:** macro (un vaso de leche y el virus) → micro (el intestino por dentro) → el mismo vaso, ya con respuesta.

## Correcciones obligatorias respecto al video viejo
1. El viejo decía "hay personas que **curaron** su intolerancia usando virus". **No.** Fue **un autoexperimento de un divulgador** (Justin Atkin, el canal The Thought Emporium, feb 2018), documentado solo en su propio video. **No es un tratamiento aprobado y no hay artículo revisado por pares.** El guion lo dice con esas palabras.
2. El viejo afirmaba que "el efecto duró alrededor de un año". **Ese dato no se pudo verificar.** La única cifra que aparece en la web sale de un resumen secundario, no de una fuente primaria ni del propio autor. **El guion no da ninguna duración de su efecto**: explica por qué un efecto así no sería permanente (el intestino cambia su recubrimiento cada 4–5 días).
3. Lo que sí está publicado y revisado es el experimento **en ratas**: During et al., *Nature Medicine*, 1998. Ahí la duración reportada es de **meses** (la nota de prensa de la universidad dice 4 meses, lo que duró el experimento; otra fuente que describe el artículo dice 6). El guion dice "meses".
4. No se da ninguna cifra de cuántos adultos del mundo son intolerantes: **el metaanálisis que daba el 68 % está retractado.** Se dice "la mayoría de los adultos del mundo", que sí sostienen las revisiones.

## Corrección del 28 oct 2026 (verificación de hechos independiente, ver `verificacion.md`)
1. **Gancho:** decía "trae el gen que te falta". Los adultos con intolerancia no *carecen* del gen de la lactasa (bajan su expresión) y el estudio de 1998 usó el gen de **una β-galactosidasa**, no el gen humano de la lactasa. Ahora: «Ese virus no viene a enfermarte: trae un gen que te hace digerir la leche.»
2. **Ratas:** eran ratas **adultas con poca lactasa**, escogidas por eso (modelo de hipolactasia del adulto; corregido el 29 oct 2026: no era «provocada», según la patente de los autores, US6110456); los textos lo dicen.
3. En pantalla, el medidor de la escena de las ratas decía "LACTASA EN EL BORDE"; ahora dice "ENZIMA QUE PARTE LA LACTOSA".
4. La voz cambió: se quitó `voz_aprobada` y el shot vuelve a "Por revisar" en la Sala.

## Versión narrada (945 caracteres, ~159 palabras, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese virus no viene a enfermarte: trae un gen que te hace digerir la leche. | Fondo rosa. Un vaso de leche y, **girando desde el cuadro 0**, un virus icosaédrico con un hilito de ADN adentro, que se acerca. Chip "virus adeno-asociado". |
| 1 | Bebé | De bebé tu intestino hacía lactasa, la enzima que parte el azúcar de la leche. | Biberón; **Lupa de rayos X** sobre él: el borde del intestino lleno de enzimas en forma de tijera. Medidor "LACTASA" al 100 %. |
| 2 | Adulto | Al crecer, la mayoría de los adultos del mundo baja esa producción. | El medidor cae; las tijeras se apagan una por una. Vaso de leche con interrogación. |
| 3 | Gas | Sin lactasa, la lactosa sigue de largo y tus bacterias la fermentan: gas. | **Fondo oscuro.** `MundoIntestino`: moléculas de lactosa enteras que pasan de largo, bacterias abajo y burbujas que suben. Barra de escala. |
| 4 | Pregunta | ¿Y si le devolvieras la receta a tus células? | **Re-gancho.** Una molécula de lactosa gigante y una tijera que no la alcanza. Sticker pensativo. |
| 5 | Estudio | Eso probaron en 1998 en Filadelfia: un virus adeno-asociado, por la boca, cargando el gen de una enzima que parte la lactosa. | `TarjetaEstudio` "1998 · During y colegas · *Nature Medicine*". Luego el virus baja por el lumen y toca el borde. |
| 6 | Ratas | Las ratas, adultas y con poca lactasa como nosotros, volvieron a digerir lactosa, y el efecto duró meses. | Dos ratas esquemáticas (ratas adultas con poca lactasa, escogidas por eso: modelo de hipolactasia del adulto); el medidor "ENZIMA QUE PARTE LA LACTOSA" sube. Chip "ratas adultas con poca lactasa · meses". |
| 7 | Auto | En 2018 un divulgador, Justin Atkin, se lo hizo a sí mismo y lo grabó. | Marco de video con "▶" y el chip "The Thought Emporium · 2018". |
| 8 | Ojo | Ojo: fue un autoexperimento. No es un tratamiento aprobado ni hay un artículo revisado. | `MitoTachado` "¿cura aprobada?" que se tacha. Chips "autoexperimento" y "sin revisión por pares". Sticker serio. |
| 9 | Renueva | Y además tu intestino cambia su recubrimiento cada cuatro o cinco días. | Las células del borde se desprenden y salen nuevas. Contador "día 1 → 5". Chip "4–5 días". |
| 10 | Cripta | Si no tocas las células madre de la cripta, la receta se va con las células viejas. | Acercamiento a la cripta: dos células madre doradas que laten. El gen (brillo verde) se queda arriba y se desprende con las células viejas. |
| 11 | Pastilla | Por eso lo que sí existe es la enzima en pastilla: la misma receta, pero por fuera. | Fondo brillante: una pastilla se abre y suelta tijeras sobre el vaso de leche; la lactosa se parte en dos azúcares. |
| 12 | Cierre | El virus no te enferma: te presta un gen. Un rato. | **Regreso al vaso del inicio** con el virus girando y el chip "te presta un gen · un rato". |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Narrada:** cama grave continua, sin golpe marcado, siempre debajo de la voz.
- **Datos hechos sonido:** una nota por cada enzima que aparece en el borde (18 notas), 5 golpes para los 5 días de renovación, un "blub" por burbuja de gas.
- **Efectos en el mismo cuadro:** el virus que gira (soplo), la Lupa que se abre (barrido), cada tijera que corta (clic doble), la pastilla que se abre (clic), el medidor que cae (nota que baja).

## Gemelo mudo (M4 "Ciclo", 61.5 s, loop) — `Shot Lactosa Ciclo.dc.html`
El ciclo de la renovación del intestino, que termina donde empezó:
1. **Entra** la lactosa al intestino. 2. **Pasa** de largo (no hay enzima). 3. **Gas**: las bacterias la fermentan.
4. **Llega** el virus con el gen. 5. La célula **hace** la enzima. 6. La lactosa **se corta** en dos azúcares.
7. Las células viejas **se mudan** (se desprenden). 8. La **cripta** hace células nuevas… sin el gen, y vuelve a entrar lactosa: el primer cuadro.
- **La música sale de los datos:** una nota por molécula que entra, un blub por burbuja, 5 golpes = los 5 días,
  un tic por cada célula nueva de la cripta. **Y cuenta el estado:** tapada y tensa mientras no hay enzima,
  abierta y libre cuando la lactosa se parte, y se vuelve a tapar al final para cerrar el loop. 🎧 en el título.

## Descripción (para publicar)
"Ese virus no viene a enfermarte: trae un gen. 🥛🧬 De bebés casi todos hacemos **lactasa**, la enzima que parte la lactosa en glucosa y galactosa. Al crecer, la mayoría de los adultos del mundo baja esa producción: la lactosa llega entera al intestino grueso, las bacterias la fermentan y aparecen el gas y las molestias.

En 1998, el equipo de During publicó en *Nature Medicine* que un **virus adeno-asociado** dado por la boca, cargando el gen de una enzima que parte la lactosa (β-galactosidasa), devolvió la capacidad de digerir lactosa a ratas adultas con poca lactasa (modelo de hipolactasia del adulto), y el efecto duró meses. En febrero de 2018, el divulgador **Justin Atkin** (canal The Thought Emporium) intentó algo parecido en sí mismo y lo grabó. **Importante: fue un autoexperimento, no un tratamiento aprobado, y no existe un artículo revisado por pares con sus resultados.** Su propia página del proyecto dice que sigue en desarrollo. No intentes nada de esto.

Además hay una razón biológica para que un efecto así no sea permanente: el recubrimiento del intestino se renueva **cada 4 o 5 días**, así que si no se modifican las células madre del fondo de las criptas, el gen se va con las células viejas. Lo que sí existe hoy es la misma enzima en pastilla o la leche deslactosada.

El dibujo es esquemático. **¿A ti te cae mal la leche o le aguantas todo? 👇**"

## Robert en pantalla

Es la marca del canal: la ciencia se asocia a su cara. Entra desde el cuadro 0, vuelve cada 8-10 s y nunca tapa el subtítulo (el kit lo dibuja por delante de él).

### Versión narrada: 7 apariciones, **24.5 s en pantalla** (de 61.5 s)

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,2 | sorprendido (11) | gancho | «Ese virus no viene a enfermarte» |
| 9,6 - 13,2 | señalando (13) | arriba-der | «la mayoria baja esa produccion» (senala el medidor) |
| 18,5 - 20,9 | pensativo (06) | arriba-der | re-gancho: «¿y si le devolvieras la receta?» |
| 26,8 - 30,2 | sonriendo (05) | arriba-der | «las ratas volvieron a digerir lactosa» |
| 35,0 - 39,6 | serio (10) | **presentador** | «no es un tratamiento aprobado»: el matiz, en grande |
| 44,4 - 48,0 | bajando lentes (04) | arriba-der | «la receta se va con las celulas viejas» |
| 54,2 - 57,9 | apuntando (02) | gancho | cierre: «te presta un gen. Un rato.» |

### Gemelo mudo: 8 apariciones, **28.2 s en pantalla**

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | entra la lactosa |
| 8,0 - 11,4 | pensativo (06) | arriba-der | nadie la corta |
| 15,0 - 18,8 | serio (10) | **presentador** | el gas: el problema, en grande |
| 22,0 - 25,4 | señalando (13) | arriba-der | llega el virus con el gen |
| 29,5 - 33,0 | sonriendo (05) | arriba-der | la celula hace la enzima |
| 36,5 - 40,0 | apuntando (02) | arriba-der | ahora si se parte |
| 44,0 - 47,5 | bajando lentes (04) | abajo-izq | las celulas viejas se van |
| 51,5 - 55,2 | pensativo puno (07) | arriba-der | la cripta empieza de nuevo |

En las dos versiones la tarjeta de cierre lleva a Robert junto al logo (`CierreMarca robert=`).

## Fuentes
- **During, M. J. et al., "Peroral gene therapy of lactose intolerance using an adeno-associated virus vector", *Nature Medicine* 4(10): 1131–1135 (octubre de 1998)**, Thomas Jefferson University: vector adeno-asociado por vía oral con un transgén de β-galactosidasa, expresión persistente en el epitelio intestinal y recuperación del fenotipo en un modelo animal de intolerancia. https://doi.org/10.1038/2625
- **Nota de prensa de Thomas Jefferson University (29 sep 1998):** «inserted a beta-galactosidase gene--which encodes for an enzyme that breaks down lactose--into an adeno-associated virus vector»; «enough, he says, to correct the experimentally induced lactose intolerance in the animals. The effect lasted four months, the length of the experiment». Por eso aquí se dice "meses". https://www.sciencedaily.com/releases/1998/09/980929072756.htm
- **The Thought Emporium (Justin Atkin), "Developing a Permanent Treatment for Lactose Intolerance Using Gene Therapy", febrero de 2018**, y la página del proyecto https://www.thethoughtemporium.com/lactose, que dice textualmente que el proyecto "sigue en etapa de desarrollo y no está terminado". Autoexperimento sin publicación revisada por pares.
- **Cobertura independiente del intento:** Hackaday, "Biohacking Lactose Intolerance" (14 de febrero de 2018). https://hackaday.com/2018/02/14/biohacking-lactose-intolerance/
- **Renovación del epitelio intestinal cada 4–5 días:** "Cellular Plasticity in Gut and Liver Regeneration" (2024, PMC11565004): «stem cells exist and keep differentiating into enteroendocrine cells, goblet cells, and enterocytes, thus replenishing the diverse types of IECs every 4 to 5 days». (Antes se citaba a van der Flier y Clevers 2009; se cambió por la fuente que sí se abrió y verificó.)
- **Prevalencia:** no se cita cifra. El metaanálisis de Storhaug, Fosse y Fadnes (*Lancet Gastroenterology & Hepatology*, 2017), que daba 68 % mundial, **está retractado**; las revisiones sí sostienen que la persistencia de la lactasa es minoritaria en el mundo y muy variable por región («Lactase non-persistence is extremely common», PMC12995986, 2026).
- El dibujo del virus, de las enzimas y de las moléculas es **esquemático**: no está a escala entre sí.
