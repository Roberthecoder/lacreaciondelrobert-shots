# Shot Biotecnológico #03 · CRISPR no lo inventamos: lo inventó tu yogur

- **Serie:** Shot Biotecnológico · **Logo:** `logo_bioquimica.svg` · **Badge:** #03.
- **Remasteriza:** viejo #7 (0ecYJQ-n1S8). **Corrección:** se quitó "hace 2,600 millones de años" (no se encontró una fuente sólida para esa cifra). En su lugar va el experimento real con bacterias de yogur (2007).
- **Formato (RECETARIO):** N1 "Por dentro" + N5 "El experimento" (se recrea el experimento de Danisco con dos tubos). Gemelo mudo: M4 "Ciclo" con la fila CRISPR como partitura (M1).
- **Gancho:** #1 "Esto no es X: es Y" sobre el yogur que se ve en pantalla ("no solo tiene bacterias: tiene bacterias vacunadas").
- **Duración:** voz estimada 57.7 s (941 caracteres) + cierre 3.5 s ≈ 61.2 s, con `"velocidad": 1.065`.
- **Estado:** construido sin voz; la voz espera la aprobación de Robert (~940 créditos).

## Versión narrada (941 caracteres)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Este yogur no solo tiene bacterias: tiene bacterias vacunadas contra virus. | Fondo rosa, vaso de yogur. **A los 0.1 s** entra la cuchara. Lupa de rayos X: cadena de *Streptococcus thermophilus* (cocos en cadena) y en cada uno se enciende una tirita dorada (su CRISPR). |
| 1 | Ataque | Las bacterias de tu yogur viven bajo ataque de unos virus que las revientan desde adentro: los fagos. | Fondo oscuro (micro), barra de escala de 1 µm. Tres fagos de cola larga (sifovirus, como los de *S. thermophilus*) aterrizan, inyectan su ADN y una bacteria revienta soltando fagos nuevos. Chip "fagos agrandados ×5". |
| 2 | Captura | Algunas sobreviven y le roban al virus un pedacito de su ADN. | Adentro de una bacteria: el ADN del virus (con un tramo rosa). Dos enzimas recortan el tramo. |
| 3 | Captura | Lo pegan en su propio genoma, en una fila de recuerdos llamada CRISPR. | El pedazo rosa viaja y entra en la fila junto al "líder", empujando a los recuerdos viejos (cian, amarillo). Las repeticiones doradas son todas iguales. Chip "CRISPR". |
| 4 | Captura | Cada pedazo es un virus que ya intentó matarla. | Sobre cada espaciador aparece el fago del mismo color: una galería de "fichas". |
| 5 | Pregunta | ¿Y si ese virus vuelve? | **Re-gancho.** Entra otra vez ADN rosa. Chip "¿otra vez?" y sticker serio. |
| 6 | Corte | La bacteria copia ese recuerdo en ARN, se lo da a unas tijeras, Cas, y buscan. | El espaciador rosa brilla; sale una copia de ARN rosa; la proteína Cas la toma y recorre el ADN del virus. |
| 7 | Corte | Si encuentran el mismo pedazo, cortan el ADN del virus. Adiós. | Cas llega al tramo rosa, cierra la boca y el ADN se parte en dos. Chip "ADIÓS". |
| 8 | Estudio | En 2007, investigadores de Danisco y la Universidad Laval lo probaron con bacterias de yogur: cada recuerdo nuevo las volvía resistentes. | Tarjeta "2007 · Barrangou, Horvath, Moineau y equipo · Danisco (Francia) · U. Laval (Quebec) · *Science* 315". Luego **el experimento:** dos tubos con fagos; el "sin recuerdo" se aclara (mueren), el "con recuerdo" sigue turbio: "resiste". |
| 9 | Nobel | En 2012, Charpentier y Doudna reprogramaron esas tijeras para cortar el ADN que quisieran. Nobel 2020. | Tarjeta "2012 · Charpentier y Doudna · *Science* 337: 816". Medalla dorada con Cas. Chip "Nobel de Química 2020". Sticker sorprendido. |
| 10 | Extra | Y no es raro: más o menos una de cada tres bacterias y tres de cada cuatro arqueas lo traen. | Tres bacterias (se enciende una) y cuatro arqueas (se encienden tres). |
| 11 | Cierre | Así que las tijeras genéticas no las inventamos nosotros: las inventó lo que hay en tu yogur. | **El mismo yogur del inicio**, con la lupa "tijeras originales". |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (`gen-audio.mjs`, sin costo)
- **Fondo:** cama grave continua, sin golpe.
- **Datos:** la fila CRISPR suena: cada repetición con la misma nota y cada espaciador con la nota de su virus (rosa = do, cian = sol, amarillo = re). Cuando entra un recuerdo nuevo, se toca la fila completa.
- **Efectos:** cuchara, aterrizaje e inyección de cada fago, bacteria que revienta y 9 fagos que salen, recorte, nota que sube mientras Cas busca, **chasquido de tijera** en el corte, tubos, medalla, 3 + 4 "pops" en el conteo.

## Gemelo mudo (construido: `Shot Crispr mudo.dc.html`)
Loop de 61.5 s en 8 capítulos, todo adentro de una bacteria: ataque del virus rosa → guarda un recuerdo → el rosa vuelve y lo corta → virus cian → otro recuerdo → corte → "su memoria: cada color, un virus" → zoom afuera a la cadena: "esta ya recuerda / esta todavía no" → adentro de la vecina llega el virus rosa (= primer cuadro). Primer texto: **"Esta bacteria se va a vacunar sola"**.
- **Música hecha de datos:** la fila CRISPR es la partitura (líder grave, repeticiones con la misma nota, cada espaciador con la nota de su virus); cada vez que crece, se toca. **La cama suena tapada durante cada ataque y se abre cuando Cas corta.** Mientras Cas busca, una nota sube hasta la nota del virus.
- Título: **¿Cómo se vacuna una bacteria? 🎧 | Shot Biotecnológico 03**

## Título (narrado)
¿Quién inventó CRISPR? No fuimos nosotros 🧫 | Shot Biotecnológico 03

## Descripción (borrador, sin emojis)
Las bacterias del yogur (*Streptococcus thermophilus*) viven bajo ataque de fagos, virus que las infectan y las revientan. Algunas sobreviven y guardan un pedacito del ADN del virus en una fila de su genoma llamada CRISPR: repeticiones iguales separadas por "espaciadores", cada uno robado a un virus distinto. Si ese virus vuelve, la bacteria copia el recuerdo en ARN, se lo da a una proteína Cas y, si encuentra el mismo pedazo, corta el ADN del virus. En 2007, un equipo de la empresa Danisco y la Universidad Laval lo demostró con bacterias de yogur: agregar un espaciador nuevo las volvía resistentes a ese fago. En 2012, Emmanuelle Charpentier y Jennifer Doudna mostraron que Cas9 se puede programar con una guía para cortar el ADN que uno elija; por eso ganaron el Nobel de Química 2020. Más o menos una de cada tres bacterias y tres de cada cuatro arqueas secuenciadas tienen CRISPR-Cas. El dibujo es esquemático y los fagos están agrandados.
¿Qué yogur te gusta más? ¿Sabías que estaba lleno de bacterias "vacunadas"?

## Fuentes
- Barrangou, R., Fremaux, C., Deveau, H., Richards, M., Boyaval, P., Moineau, S., Romero, D. A. y Horvath, P. (2007). CRISPR provides acquired resistance against viruses in prokaryotes. *Science* 315: 1709–1712. (Danisco y Université Laval; *S. thermophilus* DGCC7710, cultivo iniciador de yogur y queso.)
- Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A. y Charpentier, E. (2012). A programmable dual-RNA–guided DNA endonuclease in adaptive bacterial immunity. *Science* 337: 816–821.
- Premio Nobel de Química 2020: Emmanuelle Charpentier y Jennifer A. Doudna, "por el desarrollo de un método para editar genomas" (nobelprize.org).
- Pourcel, C. et al. (2020). CRISPRCasdb a successor of CRISPRdb containing CRISPR arrays and cas genes from complete genome sequences. *Nucleic Acids Research* 48: D535–D544 (CRISPR-Cas en ~36 % de las bacterias y ~75 % de las arqueas).
- Mojica, F. J. M. et al. (2005). Intervening sequences of regularly spaced prokaryotic repeats derive from foreign genetic elements. *J. Mol. Evol.* 60: 174–182 (Universidad de Alicante: los espaciadores vienen de virus y plásmidos; contexto, no se narra).
- Los nuevos espaciadores se agregan junto al líder: Deveau et al. (2008), *J. Bacteriol.* 190: 1390–1400.

## Datos no verificados del todo
- "2,600 millones de años" del video viejo: quitado (sin fuente).
- La tarjeta pone "Danisco (Francia)": el grupo de Horvath trabajaba en Dangé-Saint-Romain, Francia, y Barrangou en Madison, EE. UU.; confirmar si se prefiere "Danisco" sin país.
- El porcentaje de bacterias y arqueas con CRISPR depende de la base de datos (CRISPRdb 2007 daba ~50 % y ~90 %); la voz dice "más o menos".
