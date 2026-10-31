# Auditoría de hechos · shots viejos (lote 2) · 29 oct 2026

Revisado en `main` (después de `git pull`): voz (`narracion.json`; también `voz/narracion.json` donde existe), pantalla (.jsx), `guion.md`, `publicacion.md` y `verificacion.md`.
Nota general: en bio-04, bio-08, fes-03 y fun-01 la voz guardada (`voz/narracion.json`) es de un texto anterior; en bio-08 y fes-03 todavía dice frases ya corregidas («tomaron el gen humano», «miles de veces por minuto», «enzimas… como tijeras químicas»). Como Robert va a regenerar todas las voces, no lo cuento como problema, pero **esos MP3 no se deben publicar**.

No encontré correcciones aplazadas («al regenerar», «para no regenerar la voz», «pendiente») sin aplicar en ninguno de los 15: en todos, las filas ⚠️/❌ de `verificacion.md` se ven corregidas en el texto final.

---

## amb-01-vinazas — OK
12 L de vinaza por litro, pH 3–5, 1 L contamina 20 L, biogás, CIATEJ 2025, bagazo y setas en Lagos de Moreno (2024): todo cuadra con las fuentes que cita `verificacion.md`. El gancho del caballito ya se corrigió en la voz y en la pantalla.

## amb-05-ozono — OK
Datos de EPA (15–40 km; 1 cloro destruye más de 100 mil O₃), Molina (el baño convertido en laboratorio), Nature 1974, Nobel 1995, Montreal 1987 y Londres 1990, WMO 2023 (99 %; 2040/2066): todo correcto.

## amb-09-chapala — OK
Hoy abrí la página de la CEA Jalisco: «aporta el 60% del agua que llega a la ciudad», «profundidad máxima de 8 metros», «79 km de este a oeste y 28 km de norte a sur», «junio de 1955 con 954 Mm3», «164,659 ha… 1902 a 1910 se abrieron al cultivo 50,000 ha», «Jalisco ocupa el 86% y Michoacán el 14%». En el módulo del nivel diario: «28 Oct 2026 Volumen: 5,541.96 Mm3 … 70.18 %». Es el mismo valor que se cita para el 27 oct.
Aviso (no es error): el 60 % es lo que dice hoy la página oficial, pero no tiene fecha; y el 70 % está fechado. Ojo si el shot se publica mucho después.

## bio-04-fagos — OK
Ciclo de unos 30 min (T4, latencia de 20 a 45 min), Patterson en San Diego en 2016 («He emerged from his coma within three days of the start of IV phage therapy», UCSD 2017), d'Hérelle en París en 1917 (dice «los describió», no «los descubrió»), 11 años antes de 1928, 10³¹ = diez quintillones en escala larga: todo correcto.

## bio-08-insulina — PROBLEMA
1. **Voz, `narracion.json` l.21 (y `guion.md` l.27):** «En 1978 escribieron el gen de la insulina humana y lo metieron en una bacteria.»
   - Qué está mal: fueron **dos** genes (cadena A y cadena B), cada uno en su **propia** cepa de *E. coli*. La voz dice un solo gen en una sola bacteria, y el mismo `verificacion.md` dice que eran dos.
   - Propuesta: «En 1978 escribieron los genes de las dos cadenas de la insulina humana y los metieron en bacterias.»
   - Fuente: Riggs AD, *Endocrine Reviews* 42(3): 374–380 (2021), PMC8152450: «2 E. coli strains were engineered to contain chemically synthesized insulin A or B chain genes inserted into the β-galactosidase gene (β-gal) of a plasmid cloning vector» (dato de 1978).
2. **Pantalla, `insulina.jsx` l.266 (chip «51 aminoácidos, uno por uno») y l.269 (medidor «CADENA ARMADA … / 51»); en la versión ciclo, l.366 («51 aminoácidos») y l.429 (contador «/ 51»); voz l.37 «arman la cadena»:**
   - Qué está mal: muestra un ribosoma que arma **una sola cadena de 51**. La insulina tiene dos cadenas, una de 21 y otra de 30, y ninguna bacteria arma una cadena de 51. En 1978 cada cepa hacía una cadena (pegada a β-gal) y después se juntaban por oxidación. Hoy se fabrica como proinsulina, de 86.
   - Propuesta para la pantalla: chip «cadena A: 21 · cadena B: 30»; medidor «CADENA ARMADA» que cuente hasta 21 o hasta 30 (o quitar el número). Voz: «Sus ribosomas lo leen y arman la cadena, una y otra vez, sin parar» se puede quedar si la pantalla deja de decir «51 en una cadena».
   - **`publicacion.md` l.132 (y l.103):** «los ribosomas arman la cadena de 51 aminoácidos (21 de la cadena A y 30 de la B)» → «los ribosomas arman las cadenas: la A de 21 aminoácidos y la B de 30 (51 en total)». Las «51 notas, una por aminoácido» (l.102, 105, 115, 117, 131, 149) sí son correctas.
   - Fuente: Riggs 2021 (PMC8152450): «human insulin chains A and B followed by linking via oxidation»; la A tiene 21 aminoácidos y la B 30 (dato de libro de texto que el propio `verificacion.md` ya usa).

## cie-04-dedos-arrugados — OK
La vasoconstricción por nervios (Kareklas 2013; Wilder-Smith 2003), el nervio dañado que no se arruga, Newcastle 2013 (20 personas, «12 per cent … less time», objetos secos igual) y Berlín 2014 (Haseleu, n = 40, sin ventaja): todo correcto, y la conclusión dice que el tema sigue en debate.

## cie-08-estatura — OK
Tyrrell 1985 (8 jóvenes; 19.3 mm; «Fifty-four percent… first hour»), Liverpool 1998 (resonancia, más volumen en la noche), NASA («up to three percent taller»), 3 % de 1.70 m ≈ 5 cm, el regreso a la estatura normal y el dolor de espalda: todo correcto. Lo de «muy probablemente pierden agua» está dicho con la misma cautela que la fuente.

## fes-03-podredumbre-blanca — OK
Peroxidasas y lacasas; Floudas 2012 (31 genomas, Clark, Science): «around 290 million years ago, right at the end of the Carboniferous period». La hipótesis se dice como hipótesis, junto con la crítica de Nelsen 2016. El ❌ del «carbón más antiguo» ya no está.
Matiz menor y opcional: según la escala geológica actual (ICS), el Carbonífero termina hace 298.9 millones de años, así que 290 cae ya en el Pérmico temprano. La frase repite lo que dice la fuente; si se quiere afinar: «…nacieron hacia el final del Carbonífero, hace unos 290 millones de años».

## fun-01-que-es-un-hongo — OK
Hifas de 5–10 µm, mucho más delgadas que un pelo (17–181 µm; en pantalla 60–80 µm, dentro del rango), micelio, digestión por fuera, Baldauf y Palmer 1993 (PNAS), quitina, levadura de una sola célula: todo correcto.

## fun-05-armillaria — OK
Ferguson et al. 2003 (Malheur, Oregón): 112 aislados, pruebas de compatibilidad, 965 ha (9.65 km², o sea «casi diez km²»), 1,900–8,650 años; 965 ÷ 0.714 ha por cancha = 1,351 canchas, así que «+1,300» está bien; bioluminiscencia del micelio y las rizomorfas de *A. ostoyae* (Ke 2020). Dice «no se sabe si sigue unido». Correcto.

## fun-09-amanita — OK
Los mitos, que las amatoxinas no se destruyen al cocinar ni al secar, el caso de hongos congelados 7–8 meses (Kayes y Ho 2024: «frozen for 7–8 months»), la ARN polimerasa II («halting intracellular protein synthesis») y el brote de California de dic 2016 (MMWR: 14 casos, 3 trasplantes): todo correcto. Que «frena la máquina con la que fabrican proteínas» es una simplificación que respalda la frase de la fuente, y en pantalla va el nombre real.

## ia-04-huella — OK
Ficha de Llama 3 (abril 2024): 7.7 millones de horas H100 (8B: 1.3M; 70B: 6.4M), 700 W, 2,290 t de CO₂eq (1,900 + 390), 100 % compensado, 15T+ tokens. Los «más de 700 años» salen de 6.4M h ÷ 8,766 h por año = 730 años del modelo grande, que es al que se refiere la frase. Correcto.

## ia-08-mamografias — OK
MASAI: 44 % menos lecturas; 6.4 contra 5.0 por cada mil (2025, 105,934 mujeres, 4 centros del suroeste de Suecia, Lång, Lund, Transpara). Lo de 2026 lo confirmé hoy: *The Lancet*, enero de 2026, «Interval cancer rates were 1·55 … and 1·76 … per 1000», no inferior. La voz dice «no aumentaron», que es lo correcto, porque la diferencia no es significativa.

## qui-03-cloro — OK
Hipoclorito, Cl₂ con ácido, cloraminas con amoniaco, HOCl y HCl en las vías respiratorias, Atalla 2024 (85,104 exposiciones; 84.9 % en casa; 2015–2022), CDC 2020 (502 adultos; 35 % sabían lo del vinagre), Primera Guerra Mundial, consejo del CDC («symptoms may show up later», 911): todo correcto.

## qui-07-jabon — OK
Sal de un ácido graso, micelas, virus con envoltura (dice «algunos virus»), Cochrane 2021 (29 ensayos, «about 30%», episodios de diarrea, guarderías y comunidades), Semmelweis en el siglo XIX, frotar ayuda: todo correcto.

---
**Resumen:** 14 OK, 1 con PROBLEMA (bio-08-insulina: «el gen» en «una bacteria» y la «cadena de 51 aminoácidos» en pantalla y en `publicacion.md`).
