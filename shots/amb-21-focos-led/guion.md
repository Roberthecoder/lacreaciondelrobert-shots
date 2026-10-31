# Shot Ambiental #21 · Ese foco no es una lámpara: es un calentador (focos LED)

- **Serie:** Shot Ambiental · **Logo:** física (átomo: energía y luz) · **Badge:** #21 · rama `pedido300/amb`.
- **Formato:** N1 "Por dentro" (macro: el foco en el techo → micro, fondo oscuro: el filamento y luego el chip LED por capas → regreso al mismo foco) + medidores de N3 (barra calor/luz 90/10 y medidor de lúmenes por watt).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo en pantalla: "Ese foco no es una lámpara: es un calentador que, de paso, alumbra." Se sostiene con la cifra del DOE (90 % calor, 10 % luz).
- **Local:** México (NOM-028-ENER-2017, Secretaría de Energía / CONUEE).
- **Duración:** voz 935 caracteres escritos (9 líneas) ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → **61.5 s** en la base.
- **Cuentas:** 75 W ÷ 9 W = 8.3 (un LED gasta unas 8 veces menos para la misma luz: 1,100 lúmenes; 1 − 9/75 = 88 %, dentro del "hasta 90 % menos" del DOE) · 1,100 lm ÷ 75 W = 14.7 lm/W y 1,100 lm ÷ 9 W = 122 lm/W (solo para dibujar el medidor; en la voz va el 16 lm/W del Nobel) · 60 ÷ 16 = 3.75 (la norma mexicana pide casi 4 veces lo que da un foco clásico; no se dice en voz).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese foco no es una lámpara: es un calentador que, de paso, alumbra. | Cuadro 0: un foco de filamento cuelga de un cable y se enciende con un clic; a su alrededor ondas de calor rojas que suben y unos pocos rayos amarillos. Chip "¿lámpara o calentador?". |
| 1 | Calor | Según el Departamento de Energía de Estados Unidos, noventa por ciento de su energía sale como calor y solo diez como luz. | Barra-medidor que se llena: 90 % rojo "calor" y 10 % amarillo "luz". 10 cuadritos de energía: 9 se vuelven ondas rojas y 1 rayito amarillo. Chip "DOE (EE. UU.)". |
| 2 | Filamento | Adentro, la corriente calienta un alambre hasta que brilla. Y ese calor lo destruye: dura unas mil horas. | `Lupa` sobre el foco (rayos X): el filamento en espiral (alambre enrollado), la corriente como puntitos que lo recorren y lo ponen al rojo blanco. Luego se adelgaza y se rompe con un chispazo; contador "≈ 1,000 h". Esquema. |
| 3 | Pregunta | ¿Y cómo le hace un LED para no desperdiciar tanto? | **Re-gancho.** Al lado del foco roto aparece un foco LED; "?" grande. Robert grande, pensativo. |
| 4 | Chip | Es un chip de capas: en una sobran electrones y en otra faltan. Cuando se juntan, la electricidad se vuelve luz directamente. | Fondo oscuro: chip LED en corte, tres capas (arriba "n: sobran electrones" con puntitos azules, en medio "capa activa", abajo "p: faltan electrones" con huecos). Los electrones y los huecos se encuentran en la capa activa: casi siempre sale un destello de luz y, de vez en cuando (1 de cada 5 en el dibujo), un poco de calor. Chip "● luz ● algo de calor". Esquema. |
| 5 | Nobel | Para luz blanca faltaba un LED azul. A inicios de los noventa, en Japón, tres investigadores lo lograron: Nobel de Física 2014. | Tres LED: rojo y verde encendidos, azul apagado con "?"; luego el azul se enciende y los tres se mezclan en luz blanca. Mapa chiquito de Japón con dos puntos (Nagoya, Tokushima) y `TarjetaEstudio` "Akasaki, Amano y Nakamura · Nobel de Física 2014". |
| 6 | Ahorro | Hoy un LED de nueve watts puede dar la luz de un foco de setenta y cinco, y durar hasta veinticinco veces más. | Báscula/medidor: foco "75 W" y LED "9 W" dando los mismos "1,100 lúmenes" (dos conos de luz iguales). Luego una fila: 1 foco incandescente contra una barra de vida del LED que llega a "×25". Chip "DOE, 2021". |
| 7 | Mexico | En México, una norma de 2018 pidió que desde 2019 los focos incandescentes comunes dieran sesenta lúmenes por watt; uno clásico da dieciséis. | Medidor de lúmenes por watt con una raya en "60 · NOM-028-ENER (México), desde 2019"; la aguja del foco clásico se queda en "16". Chip "lúmenes por watt = luz por cada watt". |
| 8 | Cierre | Así que ese foco que te quema no es una lámpara: es un calentador que, de paso, alumbra. | **Regreso a la imagen del inicio:** el mismo foco colgando con sus ondas rojas; se cambia por el LED y las ondas casi desaparecen mientras la luz se queda igual. Chip "misma luz, mucho menos calor". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de física y Robert apuntando a cámara. |

**Música:** cama grave continua (zumbido eléctrico suave de fondo, como el de un foco). Efectos: clic del apagador en el cuadro 0, un "fsss" de calor por las ondas, 9 golpes graves + 1 campanita para los 10 cuadritos de energía, crepitar del filamento y chispazo cuando se rompe, una nota brillante por cada destello del chip, acorde que se abre cuando se enciende el azul y sale el blanco, tic del medidor al llegar a 60 y a 16, clic final al cambiar el foco por el LED.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Entra y sale de lado (`RobertF` en `focos.jsx`) para no cruzar nunca el subtítulo. Grande en «¿Y cómo le hace un LED para no desperdiciar tanto?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.5 | 11_sorprendido | `gancho` | «Ese foco no es una lámpara: es un calentador» (cuadro 0) |
| 2 | 8.0 | 11.6 | 13_senalando_arriba | `arriba-der` | señala la barra: «noventa por ciento… como calor» |
| 3 | 14.8 | 17.8 | 10_serio_molesto | `izq-alto` | «ese calor lo destruye» |
| 4 | 18.3 | 21.1 | 07_pensativo_puno | `grande` | «¿Y cómo le hace un LED…?» (grande) |
| 5 | 25.5 | 29.1 | 04_bajando_lentes | `arriba-der` | «la electricidad se vuelve luz directamente» |
| 6 | 33.5 | 36.9 | 05_sonriendo_dientes_uniformes | `arriba-der` | «lo lograron: Nobel de Física 2014» |
| 7 | 40.5 | 43.3 | 11_sorprendido | `izq-alto` | «hasta veinticinco veces más» |
| 8 | 48.0 | 52.3 | 12_perfil_serio | `arriba-der` | «sesenta lúmenes por watt; uno clásico da dieciséis» |
| 9 | 53.5 | 57.9 | 13_senalando_arriba | `arriba-der` | señala el foco: «es un calentador que, de paso, alumbra» |
| — | 58.0 | 61.5 | 02_apuntando_camara | cierre | `CierreMarca robert=` |

**Total:** 9 apariciones + cierre · **32.4 s** en pantalla (+ 3.5 s de cierre) · 7 poses distintas (ninguna dos veces seguidas) · grande una vez.

## Fuentes (cada cifra se abrió en la fuente el 29 oct 2026)

1. **U.S. Department of Energy, Energy Saver, "Consumer Guide to Energy-Efficient Lighting" (fact sheet, agosto 2021):** https://www.energy.gov/sites/default/files/2021-08/ES-EE%20Lighting_080921.pdf
   > "Incandescent bulbs ruled the marketplace for 100 years but at a very high cost— 90% of their energy was released as heat and only 10% as light."
   > "LEDs use up to 90% less energy and last up to 25 times longer than incandescent bulbs."
   > "If you are looking for an energy-efficient alternative to a 75-watt incandescent light bulb, you should look for a 1,100 lumen LED light. You can find this in an LED screw-in bulb that uses as little as nine watts"
   - Año del dato: 2021. (La frase del pedido "use at least 75% less energy, and last up to 25 times longer" es de la página vieja de energy.gov, hoy archivada; se usa la guía 2021, que es la vigente que se pudo abrir.)
2. **Real Academia Sueca de Ciencias, comunicado del Premio Nobel de Física 2014 (7 oct 2014):** https://www.nobelprize.org/prizes/physics/2014/press-release/
   > "for the invention of efficient blue light-emitting diodes which has enabled bright and energy-saving white light sources"
   > "When Isamu Akasaki, Hiroshi Amano and Shuji Nakamura produced bright blue light beams from their semi-conductors in the early 1990s, they triggered a fundamental transformation of lighting technology. Red and green diodes had been around for a long time but without blue light, white lamps could not be created."
   > "Akasaki worked together with Amano at the University of Nagoya, while Nakamura was employed at Nichia Chemicals, a small company in Tokushima."
   > "The most recent record is just over 300 lm/W, which can be compared to 16 for regular light bulbs and close to 70 for fluorescent lamps."
   - Año del dato: 2014 (el 16 lm/W de un foco clásico es una propiedad de esa tecnología, que no ha cambiado).
3. **Nobel Prize, "Popular information" de Física 2014:** https://www.nobelprize.org/prizes/physics/2014/popular-information/
   > "In the LED, electricity is directly converted into light particles, photons, leading to efficiency gains compared to other light sources where most of the electricity is converted to heat and only a small amount into light. In incandescent bulbs, as well as in halogen lamps, electric current is used to heat a wire filament, making it glow."
   > "Incandescent bulbs tend to last 1,000 hours, as heat destroys the filament"
   > "A light-emitting diode consists of several layers: an n-type layer with a surplus of negative electrons, and a p-type layer with an insufficient amount of electrons, also referred to as a layer with a surplus of positive holes. Between them is an active layer, to which the negative electrons and the positive holes are driven when an electric voltage is applied to the semiconductor. When electrons and holes meet they recombine and light is created."
   - Año: 2014.
4. **NOM-028-ENER-2017, "Eficiencia energética de lámparas para uso general. Límites y métodos de prueba" (Secretaría de Energía / CONUEE), Diario Oficial de la Federación, viernes 9 de marzo de 2018:** https://www.gob.mx/cms/uploads/attachment/file/614590/NOM_028_ENER_2017_.pdf
   > "A partir del primero de enero de 2019, todas las lámparas incandescentes e incandescentes con halógenos tanto de espectro general como modificado deben cumplir con la eficacia luminosa mínima de acuerdo a lo establecido en la Tabla 3."
   > Tabla 3, "Eficacia mínima (lm/W)": "60.00" (un solo valor para todos los intervalos de flujo luminoso).
   > Campo de aplicación: "lámparas de uso general destinadas para iluminación de los sectores residencial, comercial, servicios, industrial y alumbrado público, tales como: incandescentes, incandescentes con halógeno…"; excluye, entre otras, "Lámparas incandescentes e incandescentes con halógenos decorativas, en potencias menores o iguales que 40W" y las de electrodomésticos (por eso la voz dice "focos incandescentes comunes").
   - Año: norma de 2018 (publicada en el DOF), requisito desde 2019.

## Notas
- "Calentador que, de paso, alumbra" es una forma de decir que 9 de cada 10 partes de su energía salen como calor (DOE). No se dice que un LED no se caliente: solo que desperdicia mucho menos.
- No se usó el calendario de retiro de la NOM-028-ENER-2010 (2011–2014) porque no se pudo abrir el texto oficial del DOF con las fechas; se usó la norma vigente de 2017, cuyo texto sí se abrió.
- "Nueve watts" es lo mínimo que menciona el DOE ("as little as nine watts"), por eso la voz dice "puede dar".
- Filamento, chip por capas y mapa son esquemáticos.
