# Shot Químico #32 · Ese cerillo no trae el fuego en la cabeza (el fósforo está en la caja)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #32 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (frotar el cerillo en la caja → microscopio de la tira y de la cabeza → la misma mano con el cerillo ya encendido) + N5 "El experimento" en versión histórica (la huelga de Londres, 1888, y Berna, 1906).
- **Gancho (de los 7):** #1 "Esto no es X: es Y", sobre lo que se ve en pantalla: "Ese cerillo no trae el fuego en la cabeza: el fósforo está en la tira de la caja."
- **Seguridad:** no se muestra ni se sugiere ningún experimento; nunca se ve a nadie mezclando polvos. Ver Notas (la mezcla de clorato y fósforo rojo es sensible a golpes).
- **Duración:** voz 943 caracteres / ≈ 178 palabras (≈ 57.7 s) + cierre 3.5 s → **≈ 61.2 s** (`estimar-escenas.mjs --outro 3.5`).
- **Estado:** guion verificado (`verificacion.md`), animación lista (`cerillo.jsx`, revisión en `revision/hoja.png`), voz pendiente de aprobación de Robert (~943 créditos).
- **Duración de la base sin voz:** 61.4 s (`gen-audio.mjs`; outro de 3.7 s).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese cerillo no trae el fuego en la cabeza: el fósforo está en la tira de la caja. | Fondo amarillo. Desde el cuadro 0 una mano desliza un cerillo de cabeza roja por la tira café de una caja: chispa y llamita. Flecha que sale de la cabeza ("¿aquí?", se tacha) y salta a la tira ("¡aquí!"). Barra de escala "1 cm". |
| 1 | Cabeza | La cabeza tiene clorato de potasio, que suelta oxígeno, y azufre, que arde. | `Lupa` en modo rayos X sobre la cabeza: cristales blancos de KClO₃ (etiqueta "clorato de potasio") y granos amarillos de S ("azufre"). Escala "100 µm". |
| 2 | Tira | La tira tiene fósforo rojo, pegamento y vidrio molido. | Corte a la tira (fondo noche): granos rojos (P rojo), pegamento ámbar y astillas de vidrio transparentes que brillan. Chips con los tres nombres. |
| 3 | Friccion | Al frotar, el calor de la fricción convierte una pizca de fósforo rojo en fósforo blanco. | La cabeza pasa raspando sobre las astillas; termómetro que sube; unos pocos granos rojos se vuelven tetraedros blancos P₄ ("una pizca"). |
| 4 | Chispa | Y el fósforo blanco se prende solo al tocar el aire. | Moléculas de O₂ del aire tocan los P₄: destello y chispa blanca-amarilla. |
| 5 | Llama | Esa chispa hace que el clorato suelte oxígeno; arde el azufre y luego la madera. | Secuencia en cadena: KClO₃ suelta O₂ (burbujitas azules) → azufre se enciende azul → la llama sube al palito de madera. Chip "clorato → oxígeno". |
| 6 | Pregunta | ¿Y por qué no ponerlo en la cabeza, como antes? | **Re-gancho.** Un cerillo antiguo con la cabeza blanca (P blanco) y un "?" gigante. |
| 7 | Huelga | En 1888, en Londres, 1400 mujeres de una fábrica de cerillos que usaba fósforo blanco se fueron a huelga por despidos y multas. | `TarjetaEstudio` "1888 · Londres (Bow) · Bryant & May"; una fábrica de ladrillo y una fila de siluetas de mujeres que salen por la puerta mientras un contador sube a "1400". Chips "despidos" y "multas". |
| 8 | Quijada | Ahí, su humo podía matar el hueso de la quijada: entre 1882 y 1897, casi 1 de cada 5 enfermos murió. | Vapor verdoso que sale de una tina; esquema de un cráneo de perfil con la mandíbula que se oscurece. Cinco siluetas; una se apaga. Chip "1882–1897 · 19 % de los casos". |
| 9 | Berna | En 1906, en Berna, Suiza, varios países firmaron prohibir esos cerillos. | Mapa de Europa esquemático con un alfiler en Berna; documento "Convención de Berna · 1906" y sello rojo "PROHIBIDO: fósforo blanco en cerillos". |
| 10 | Brillo | Lo escalofriante: ese fósforo brilla en la oscuridad, y a algunos enfermos les brillaban las encías. | Se apaga la luz: un trozo de P blanco brilla verde pálido; luego una boca esquemática con las encías con un brillo verdoso. |
| 11 | Cierre | Así que tu cerillo no trae el fuego en la cabeza: lo trae la caja. | **Regreso a la mano y la caja del inicio**, ahora con el cerillo encendido y la etiqueta "caja: fósforo rojo + vidrio · cabeza: clorato + azufre". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química sobre la llama oscurecida. |

**Música:** cama grave continua; efectos en el mismo cuadro: raspón del cerillo, siseo de la chispa, "fuf" de la llama, golpe de la tarjeta, pasos de la fila que sale, zumbido grave con el vapor, sello que golpea en Berna, silencio con un tono fino cuando se apaga la luz y brilla el fósforo.

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y por qué no ponerlo en la cabeza?» y en «les brillaban las encías».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «el fósforo está en la tira de la caja» |
| 2 | 5.6 | 9.3 | 13_senalando_arriba | `izq-alto` | «clorato de potasio… y azufre» |
| 3 | 13.6 | 18.0 | 06_pensativo_menton | `izq-alto` | «convierte una pizca de fósforo rojo en fósforo blanco» |
| 4 | 22.2 | 26.3 | 04_bajando_lentes | `izq-alto` | «arde el azufre y luego la madera» |
| 5 | 26.65 | 30.2 | 07_pensativo_puno | `grande` | «¿Y por qué no ponerlo en la cabeza, como antes?» |
| 6 | 32.6 | 36.9 | 10_serio_molesto | `arriba-der` | «1400 mujeres… se fueron a huelga» |
| 7 | 38.0 | 42.9 | 12_perfil_serio | `izq-alto` | «matar el hueso de la quijada» |
| 8 | 43.8 | 47.3 | 13_senalando_arriba | `izq-alto` | «firmaron prohibir esos cerillos» |
| 9 | 48.4 | 53.3 | 11_sorprendido | `grande-izq` | «les brillaban las encías» |
| 10 | 53.9 | 57.6 | 02_apuntando_camara | `arriba-der` | «lo trae la caja» |
| — | 57.7 | 61.4 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 10 apariciones · ≈ 41.7 s en pantalla (+ cierre 3.7 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (abiertas el 29 oct 2026)

1. **Química del cerillo de seguridad (cabeza, tira, fricción, fósforo blanco que se prende en el aire, clorato que suelta oxígeno, azufre y madera)** — University of Washington, Department of Chemistry, "Match Head Reaction" (lecture demo; página vigente 2026). https://chem.washington.edu/lecture-demos/match-head-reaction
   > "The head of safety matches are made of an oxidizing agent such as potassium chlorate, mixed with sulfur, fillers and glass powder. The side of the box contains red phosphorus, binder and powdered glass. The heat generated by friction when the match is struck causes a minute amount of red phosphorus to be converted to white phosphorus, which ignites spontaneously in air. This sets off the decomposition of potassium chlorate to give oxygen and potassium chloride. The sulfur catches fire and ignites the wood." (texto completo confirmado con curl el 29 oct 2026)
2. **Fósforo rojo en la tira de la caja; el blanco brilla en la oscuridad y se prende solo en el aire; enfermedad de los cerilleros** — Royal Society of Chemistry, Periodic Table, "Phosphorus" (y su podcast *Chemistry in its element*). https://periodic-table.rsc.org/element/15/phosphorus
   > "Red phosphorus is in the material stuck on the side of matchboxes, used to strike safety matches against to light them." · "It glows in the dark and is spontaneously flammable when exposed to air." · "Breathing in phosphorus vapour led to the industrial disease phossy jaw, which slowly ate away the jaw bone. This condition particularly afflicted the girls who made phosphorus matches." · "these were eventually banned in the early 1900s and were replaced by modern matches which use either phosphorus sulfide or red phosphorus."
3. **Huelga de 1888 en Londres (1400 mujeres), fósforo blanco en la fábrica, humo tóxico, necrosis de la quijada, 19.15 % de mortalidad 1882–1897, despidos y multas** — The National Archives (Reino Unido), "The 1888 matchgirls' strike". https://www.nationalarchives.gov.uk/explore-the-collection/stories/1888-matchgirls-strike/
   > "In 1888, the women and girls employed by Bryant & May in London's East End went on strike." · "In response 1400 women walked out of work, and a few days later the whole factory had ground to a halt." · "The factory conditions at Bryant & May were also dangerous, due to exposure to white (also called yellow) phosphorous." · "The fumes were poisonous and workers could develop phosphorus necrosis of the jaw." · "A report covering 1882 to 1897 documented that the mortality rate in cases of phossy jaw at Bryant & May was 19.15%" · "The factory management sacked or gave very minimal work to several matchgirls seen as being involved." · "the workers' immediate demands concerning the sacked of employee and docking of pay were won and the strike ended." · "On top of long hours and poor pay was a system for docking wages. Matchgirls would be fined at the discretion of the factory foremen"
4. **Encías que brillaban en la oscuridad; prohibición de Berna 1906** — Isaac S. "'Phossy jaw' and the matchgirls: a nineteenth-century industrial disease." Royal College of Surgeons of England, Library blog (28 sep 2018). https://www.rcseng.ac.uk/library-and-publications/library/blog/phossy-jaw-and-the-matchgirls
   > "In addition, the gums developed an eerie greenish white 'glow' in the dark." · "until roughly 1906, when the production of phosphorous matches was outlawed by the International Berne Convention."
5. **Convención de Berna, 26 sep 1906 (varios países, tratado internacional)** — UK Treaty Series 1909 No. 4, "Accession of the United Kingdom to the International Convention signed at Berne, September 26, 1906, prohibiting the use of white (yellow) phosphorus in the manufacture of matches." https://treaties.fcdo.gov.uk/data/Library2/pdf/1909-TS0004.pdf
   > "INTERNATIONAL CONVENTION SIGNED AT BERNE, SEPTEMBER 26, 1906, PROHIBITING THE USE OF WHITE (YELLOW) PHOSPHORUS IN THE MANUFACTURE OF MATCHES."
6. **Necrosis de la quijada en los trabajadores; humos de las tinas; Berna 1906** — Pollock R.A., Brown T.W. Jr, Rubin D.M. "'Phossy Jaw' and 'Bis-phossy Jaw' of the 19th and the 21st Centuries: The Diuturnity of John Walker and the Friction Match." *Craniomaxillofac Trauma Reconstr* 8(3):262–70 (2015). PMID 27053988 · PMC4812794 · doi:10.1055/s-0035-1558452.
   > "osteonecrosis of the jaws ("phossy jaw") developed in a significant percentage of workers" · "The phosphorus-based vats released toxic fumes into the factory air" · "was proscribed by the International Berne (Switzerland) Convention of 1906."

## Notas
- El dibujo es esquemático (granos, tetraedros P₄, cráneo, boca). El fósforo blanco P₄ sí es un tetraedro; el rojo es amorfo (RSC: "Red phosphorus is an amorphous non-toxic solid").
- **Seguridad (para la descripción):** la cabeza y la tira van separadas a propósito; mezclar clorato de potasio con fósforo rojo es peligroso porque la mezcla es sensible a golpes (UW: "the mixture of potassium chlorate and red phosphorous is shock sensitive"). No se intenta en casa.
- "Casi 1 de cada 5 enfermos murió" = mortalidad de 19.15 % entre los casos de quijada de fósforo registrados en Bryant & May de 1882 a 1897 (no de todos los trabajadores).
- La huelga de 1888 fue por los despidos y el sistema de multas (y la mala paga); el fósforo blanco era el riesgo de esa fábrica, pero la huelga no lo eliminó: los Archivos Nacionales dicen que su uso siguió después. La voz no dice que la huelga causara la prohibición.
- Berna 1906: los países firmantes se obligaban a prohibir fabricar, importar y vender cerillos con fósforo blanco; en Reino Unido la prohibición total llegó en 1910 (RCS: "there wasn't a total ban until 1910").
- "Las encías brillaban" lo cuentan los informes de la época que resume el Colegio de Cirujanos inglés; no a todos los enfermos les pasaba (por eso "a algunos").
- Los cerillos de "raspe donde sea" usan sulfuro de fósforo en la cabeza (RSC, UW); este shot habla solo del de seguridad (el de caja).
