# Shot Biotecnológico #08 · La insulina sale de un tanque (remasterización del viejo #17)

- **Serie:** Shot Biotecnológico · **Numeración:** #08 · **Tema del logo:** bioquímica (ADN + matraz).
- **Formato:** N1 "Por dentro" (el tanque y, con la `Lupa` de rayos X, la célula por dentro) + N5 "El experimento". **Gemelo mudo:** M4 "Ciclo".
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre el frasco de insulina que se ve en pantalla.
- **Duración:** narrada 61.5 s (voz ~58 s + cierre 3.5 s) · muda 61.5 s en loop.
- **Viaje:** macro (el tanque y el frasco) → micro (dentro de la célula: plásmido y ribosomas) → el mismo tanque.

## Corrección obligatoria respecto al video viejo
El viejo terminaba diciendo que "hoy buena parte de la insulina del mundo **se sigue produciendo así, con bacterias**". **Incompleto.** Hoy la insulina recombinante se produce **en *Escherichia coli* o en levadura (*Saccharomyces cerevisiae*)**: Novo Nordisk hace la suya en levadura (Novolin, aprobada en EE. UU. en 1991) y las revisiones llaman a *S. cerevisiae* la levadura predominante para la producción comercial a gran escala. El guion lo dice y además explica **la diferencia real**: en la bacteria el precursor se queda adentro, en cuerpos de inclusión, y hay que solubilizarlo y volverlo a plegar; la levadura lo secreta soluble al caldo.
**No se da ningún porcentaje de reparto**: no existe una cifra pública de qué fracción del mercado sale de cada hospedero.

## Versión narrada (896 caracteres, ~153 palabras, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa insulina no salió de ningún animal: salió de un tanque lleno de microbios. | `MundoBiorreactor` sobre fondo cian. **Desde el cuadro 0** el agitador gira y suben burbujas. Delante, un frasco de insulina. |
| 1 | Antes | Antes de los ochenta venía del páncreas de cerdos y de reses. | Fondo amarillo: siluetas de un cerdo y una res y un frasco viejo con etiqueta de papel. |
| 2 | Reacción | Funcionaba, pero no era humana, y a algunos pacientes les daba reacciones. | Un brazo con marcas rojas en el sitio del piquete. `MitoTachado` "¿insulina humana?". |
| 3 | Gen | En 1978 tomaron el gen humano de la insulina y lo metieron en una bacteria. | Doble hélice humana → se recorta un tramo → entra a un anillo de ADN (plásmido) → entra a la bacteria. |
| 4 | Lee | La bacteria no sabe de quién es ese gen: lo lee y fabrica la proteína. | La bacteria se ilumina y empiezan a salir cadenitas de insulina. |
| 5 | Pregunta | ¿Y cómo cabe una fábrica en algo que no ves? | **Re-gancho.** Barra de escala con la bacteria (~2 µm). Sticker pensativo. |
| 6 | Plásmido | Por dentro, la bacteria tiene un anillito de ADN extra, el plásmido, con el gen. | **Lupa de rayos X** sobre la ventana del tanque: dentro, la bacteria con su cromosoma y el plásmido brillando. |
| 7 | Ribosoma | Sus ribosomas lo leen y arman la cadena, miles de veces por minuto. | Acercamiento: un ribosoma corre por el ARN y va dejando caer los aminoácidos de la cadena. `Medidor`. |
| 8 | Humulin | Así nació Humulin, aprobada en octubre de 1982: el primer medicamento de ADN recombinante. | `TarjetaEstudio` "1982 · FDA · 30 de octubre" y el frasco con su etiqueta. |
| 9 | Hoy | Pero hoy no todo se hace en bacterias. | Chip "no todo es bacteria" y el tanque se divide en dos. |
| 10 | Levadura | Mucha insulina se fabrica en levadura, la misma del pan, que la suelta al caldo. | Una levadura ovalada con su yema suelta la insulina al caldo. Etiqueta *Saccharomyces cerevisiae*. |
| 11 | Diferencia | En la bacteria se queda adentro y hay que sacarla y volverla a doblar. | Comparación lado a lado: la bacteria guarda grumos adentro (hay que abrirla y replegar) · la levadura la secreta. |
| 12 | Cierre | Por eso tu insulina no viene de un animal: viene de un tanque. | **Regreso al tanque del inicio** con el frasco, ya con la etiqueta. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Narrada:** cama grave continua, sin golpe, debajo de la voz.
- **Datos hechos sonido:** **51 notas = los 51 aminoácidos de la insulina** (21 de la cadena A + 30 de la cadena B) mientras el ribosoma arma la cadena; un "blub" por burbuja del tanque; el agitador marca un pulso lento y constante.
- **Efectos en el mismo cuadro:** el recorte del gen (dos clics), el plásmido que se cierra (clic metálico), la Lupa que se abre (barrido), el sello de la FDA (golpe).

## Gemelo mudo (M4 "Ciclo", 61.5 s, loop) — `Shot Insulina Ciclo.dc.html`
El ciclo completo de producción, que termina donde empezó:
1. El **gen** humano de la insulina. 2. Entra al **plásmido** (el anillo se cierra). 3. Entra a la **célula**.
4. La célula **se divide** y llena el **tanque**. 5. Los **ribosomas** arman la cadena (51 notas).
6. La insulina **sale**: la levadura la secreta, la bacteria hay que abrirla. 7. Se **purifica** y llena el **frasco**.
8. Del frasco la cámara vuelve al **gen**: el primer cuadro.
- **La música son los datos:** 51 notas = 51 aminoácidos · un blub por burbuja · un golpe por cada división celular (la población se duplica) · el pulso del agitador. 🎧 en el título.

## Descripción (para publicar)
"Esa insulina no salió de ningún animal: salió de un tanque. 💉🦠 Antes de los años ochenta, la insulina para tratar la diabetes se sacaba del **páncreas de cerdos y de reses**. Funcionaba, pero no era insulina humana y algunos pacientes desarrollaban reacciones.

En **1978**, Genentech y el City of Hope lograron que una *Escherichia coli* fabricara insulina humana: le metieron el gen humano dentro de un **plásmido**, un anillito de ADN extra. La bacteria lo lee como si fuera suyo y arma la proteína. De ahí salió **Humulin**, que la FDA aprobó el **30 de octubre de 1982**: el primer medicamento hecho con ADN recombinante.

Pero ojo: **hoy no toda la insulina se hace en bacterias.** También se produce en **levadura (*Saccharomyces cerevisiae*)**, la misma especie del pan y la cerveza; Novo Nordisk aprobó así su Novolin en Estados Unidos en 1991. La diferencia no es un capricho: en *E. coli* el precursor se queda **dentro** de la célula, en cuerpos de inclusión, y hay que abrir la célula, solubilizarlo y volverlo a plegar; la levadura lo **secreta** soluble al caldo. No existe una cifra pública de qué fracción del mercado sale de cada una.

Hoy viven con diabetes unos **589 millones de adultos** de 20 a 79 años (Atlas de la FID, 11ª edición, 2025), y **1.8 millones de menores de 20 años** tienen diabetes tipo 1, que siempre necesita insulina.

El dibujo es esquemático. **¿Conoces a alguien que use insulina? ¿Sabía de dónde sale? 👇**"

## Robert en pantalla

Es la marca del canal: la ciencia se asocia a su cara. Entra desde el cuadro 0, vuelve cada 8-10 s y nunca tapa el subtitulo (el kit lo dibuja por delante de el).

### Version narrada: 8 apariciones, **28.3 s en pantalla** (de 61.5 s)

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | «no salio de ningun animal: de un tanque» |
| 9,2 - 12,8 | serio (10) | arriba-der | «a algunos pacientes les daba reacciones» |
| 18,6 - 22,0 | senalando (13) | arriba-der | senala la proteina que sale de la bacteria |
| 22,9 - 25,2 | pensativo (06) | arriba-der | re-gancho: «¿como cabe una fabrica ahi?» |
| 34,9 - 38,2 | apuntando (02) | **presentador** | 1982, el primer farmaco de ADN recombinante, en grande |
| 43,2 - 46,8 | sonriendo (05) | arriba-der | «la levadura la suelta al caldo» |
| 48,2 - 51,8 | bajando lentes (04) | arriba-der | la diferencia entre las dos rutas |
| 52,8 - 57,9 | senalando (13) | gancho | cierre: «viene de un tanque» |

### Gemelo mudo: 8 apariciones, **29.1 s en pantalla**

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,6 | sorprendido (11) | gancho | el gen humano de la insulina |
| 7,0 - 10,5 | senalando (13) | arriba-der | el plasmido se cierra |
| 14,0 - 17,5 | pensativo (06) | arriba-der | entra a la celula |
| 20,5 - 24,5 | bajando lentes (04) | **presentador** | la celula se divide y llena el tanque, en grande |
| 28,0 - 31,5 | apuntando (02) | arriba-der | el tanque trabajando |
| 35,0 - 38,5 | sonriendo (05) | arriba-der | 51 aminoacidos, uno por uno |
| 44,0 - 47,5 | serio (10) | arriba-der | sacarla cuesta: hay que abrir la bacteria |
| 51,5 - 55,5 | perfil serio (12) | arriba-der | y llena el frasco |

En las dos versiones la tarjeta de cierre lleva a Robert junto al logo (`CierreMarca robert=`).

## Fuentes
- **Humulin:** aprobada por la FDA el **30 de octubre de 1982**; primer producto terapéutico de proteína basado en ADN recombinante aprobado para uso humano. Desarrollada por Genentech y licenciada a Eli Lilly; el trabajo de 1978 se hizo con Genentech y el City of Hope National Medical Center, y el primer reporte se publicó en enero de 1979.
- **Producción en levadura:** Novolin (Novo Nordisk), insulina humana producida en *Saccharomyces cerevisiae*, aprobada en EE. UU. en **1991**. Las revisiones de insulina recombinante coinciden en que se produce **en *E. coli* o en *S. cerevisiae***, y una de ellas llama a *S. cerevisiae* la levadura predominante para la producción comercial a gran escala. Diferencia de proceso: cuerpos de inclusión y replegado en *E. coli*; precursor soluble secretado al sobrenadante en levadura. (Revisiones recopiladas en *Equivalent Recombinant Human Insulin Preparations and their Place in Therapy*, PMC5819055, y en la literatura de factorías microbianas.)
- **Diabetes:** Federación Internacional de Diabetes, *IDF Diabetes Atlas*, 11ª edición (abril de 2025): 589 millones de adultos de 20–79 años (casi 1 de cada 9), 252 millones sin diagnosticar, proyección de 853 millones para 2050 y 1.8 millones de menores de 20 años con diabetes tipo 1. https://idf.org/news-and-resources/news/idf-diabetes-atlas-11th-edition/
- **Insulina humana: 51 aminoácidos** (cadena A de 21 y cadena B de 30), dato de libro de texto que se usa para la música del gemelo mudo.
- El dibujo del tanque, de la célula, del plásmido y del ribosoma es **esquemático** y no está a escala entre sí.
