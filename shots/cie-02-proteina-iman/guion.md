# Shot Científico #02 · La proteína que responde a un imán (remasterización del viejo #4)

- **Serie:** Shot Científico · **Numeración:** #02 · **Tema del logo:** física (átomo) → `logo_fisica.svg`.
- **Formato:** N1 "Por dentro" + N5 "El experimento". **Gemelo mudo:** M4 "Ciclo" (el ciclo del par radical).
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre el imán que se ve en pantalla.
- **Duración:** narrada 61.5 s (voz ~58 s + cierre 3.5 s) · muda 61.5 s en loop.

## Correcciones obligatorias respecto al video viejo
| El viejo decía | Lo correcto |
|---|---|
| "La proteína se llama **Maglob**" | Se llama **MagLOV**. |
| "basada en un dominio vegetal llamado **LP**" | Es el dominio **LOV2 de la fototropina 1 de la avena (*Avena sativa*)**, variante C450A. |
| "Investigadores publicaron en Nature… en 2026" (sin autores ni institución) | **Abrahams, G. et al., *Nature* (2026)**, equipo del **Departamento de Ingeniería de la Universidad de Oxford**. |
| "la fluorescencia se atenúa hasta en un 50 %" | Correcto, y ahora con el dato completo: el efecto magnético medido en células es de **≈ −50 %** al conmutar el campo entre **0 y 10 mT**. |
| "resonancia de spin detectada ópticamente" sin números | **ODMR** con campo estático de **~21.6 mT** y radiofrecuencia resonante de **604 MHz**, con contraste de ~**10 % en una sola célula**. |
| "en baterías ecoli" (error de transcripción) | En **bacterias *E. coli* vivas, a temperatura ambiente**. |
| — | Se añade que el **mecanismo de par radical** es también la **hipótesis** principal de cómo se orientan las aves migratorias. Se dice *hipótesis*, no hecho. |
Se mantiene lo que el viejo ya hacía bien: **no es control mental ni telequinesis**, y la proteína **no se mueve**: lo que cambia es la probabilidad de que vuelva al estado que emite luz.

## Corrección del 28 oct 2026 (verificación de hechos independiente, ver `verificacion.md`)
1. **Los giros estaban al revés en pantalla.** El estado que se recombina y emite es el **singlete**, con los espines **opuestos**; con ~10 mT se impide la mezcla hacia ese estado y la fluorescencia baja (*Nature* 2026: «mixing into the recombining singlet state is impeded; hence, the system exhibits an MFE»). Los chips dicen ahora "opuestos → emite" y "paralelos → no emite", y el componente `Espines` dibuja opuestos cuando emite.
2. **El −50 % es de MagLOV 2 y de una sola célula:** el `NumeroGigante` dice "FLUORESCENCIA · 1 CÉLULA" y el chip "MagLOV 2 · 0 → 10 mT".
3. **Las cifras se citan del artículo publicado** (*Nature* 649: 1172–1179, 21 de enero de 2026), no del preprint, que queda solo como antecedente.
4. **Matiz de Oxford:** MagLOV se reportó en un trabajo **anterior** del mismo grupo; este artículo evoluciona variantes y muestra la ODMR. La voz («la hicieron en Oxford») es correcta y no cambia.
5. **La voz no cambió:** `voz_aprobada` se queda y el narrado se rehace con la voz ya guardada (sin gastar créditos).

## Versión narrada (878 caracteres, ~150 palabras, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese imán no mueve la proteína: le cambia el giro a sus electrones. | **Fondo oscuro** (escena microscópica). Campo de bacterias que brillan; **desde el cuadro 0** entra un imán por la derecha y el brillo baja. |
| 1 | Brillan | Mira: con luz azul, estas bacterias brillan. | Se enciende la luz azul; las células se encienden. `Medidor` "FLUORESCENCIA 100 %". |
| 2 | Imán | Acercas un imán y el brillo baja a la mitad. Nada se movió. | El imán entra; el medidor cae a ~50 %. Chip "10 mT". Las células **no** se mueven. |
| 3 | Nombre | La proteína se llama MagLOV y la hicieron en Oxford. | `TarjetaEstudio` "2026 · Abrahams y colegas · *Nature* · Oxford". |
| 4 | Avena | Salió de un pedazo de avena: el dominio que la planta usa para sentir la luz. | **Fondo brillante:** una planta de avena; se acerca a una hoja y de ahí sale el dominio LOV2 con su flavina. |
| 5 | Pregunta | ¿Cómo puede un imán apagar una luz sin tocar nada? | **Re-gancho.** La proteína sola, girando. Sticker pensativo. |
| 6 | Par | La luz azul mueve un electrón y quedan dos desapareados: un par radical. | Un fotón azul golpea la flavina; salta un electrón; quedan dos puntos con su flecha de giro. |
| 7 | Giro | Esos dos giran, y de su giro depende si la proteína vuelve a emitir luz. | Las dos flechas giran; dos caminos: "opuestos → emite" (singlete) y "paralelos → no emite" (triplete). |
| 8 | Campo | El campo magnético no los empuja: cambia la probabilidad de cada giro. | El imán aparece y la balanza de probabilidad se inclina. Nada se desplaza. |
| 9 | Mitad | Con diez milésimas de tesla, la fluorescencia cae cerca de la mitad. | `NumeroGigante` "−50 %" con etiqueta "FLUORESCENCIA · 1 CÉLULA" y el medidor cayendo. Chip "MagLOV 2 · 0 → 10 mT". |
| 10 | Radio | Y con radio a seiscientos cuatro megahercios, la señal cambia otra vez: eso se ve célula por célula. | Antena con ondas; chip "604 MHz · 21.6 mT". Cuadrícula de células y una que parpadea sola. Chip "ODMR". |
| 11 | Aves | Es el mismo mecanismo que se propone, como hipótesis, para la brújula de las aves. | **Fondo brillante:** un ave y una brújula. Chip grande "HIPÓTESIS". |
| 12 | Cierre | Física cuántica, en bacterias vivas, a temperatura ambiente. | **Regreso al campo de bacterias** del inicio, con el imán entrando y saliendo. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Narrada:** cama grave continua, sin golpe, debajo de la voz.
- **Datos hechos sonido:** cada fotón azul que llega es una nota; **cuando el campo está puesto, la música se tapa** (igual que baja la fluorescencia) y se destapa al quitarlo; la radiofrecuencia es un tono agudo fijo que entra en la escena del ODMR.
- **Efectos en el mismo cuadro:** el imán que entra (un zumbido grave), el electrón que salta (chispa), la balanza que se inclina (nota que baja).

## Gemelo mudo (M4 "Ciclo", 61.5 s, loop) — `Shot Proteina Iman Ciclo.dc.html`
El ciclo del par radical, que termina donde empezó:
1. **Oscuro**: la proteína en reposo. 2. **Luz azul**: llega el fotón. 3. **Emite**: se forma el par radical, los giros se emparejan y sale luz.
4. **Imán**: entra el campo. 5. **Triplete**: los giros se quedan paralelos. 6. **Baja**: la luz cae a la mitad (la música se tapa).
7. **Quita** el imán. 8. **Vuelve** a emitir… y vuelve a apagarse: el primer cuadro.
- **La música son los datos y cuenta el estado:** una nota por fotón, un tono por el campo, y **tapada mientras el imán está puesto**, libre cuando se quita. 🎧 en el título.

## Descripción (para publicar)
"Ese imán no mueve la proteína: le cambia **el giro de sus electrones**. 🧲🔵 En enero de 2026, un equipo del Departamento de Ingeniería de la **Universidad de Oxford** publicó en *Nature* una proteína fluorescente diseñada, **MagLOV**, que responde a campos magnéticos **dentro de bacterias vivas y a temperatura ambiente**.

MagLOV se construyó por **evolución dirigida** (miles de variantes al azar, se elige la mejor, y otra vez) a partir del dominio **LOV2 de la fototropina 1 de la avena, *Avena sativa***: el mismo tipo de pieza con la que las plantas sienten la luz azul.

¿Cómo funciona? La luz azul mueve un electrón entre la flavina y la propia proteína, y quedan **dos electrones desapareados**: un **par radical**. De cómo estén alineados sus giros depende si el sistema vuelve al estado que emite luz. Un campo magnético **no empuja nada**: cambia la probabilidad de cada alineación. Resultado medido en células: al conmutar el campo entre **0 y 10 mT**, la fluorescencia baja alrededor de **−50 %**. Y con un campo estático de ~**21.6 mT** y radio a **604 MHz** aparece la resonancia: **resonancia magnética detectada ópticamente (ODMR)**, visible **célula por célula** con un contraste de ~10 %.

Para qué sirve: biosensores que se pueden leer a través del tejido, porque los campos magnéticos pasan donde la luz no.

Y un extra: el mecanismo de par radical es también la **hipótesis** principal de cómo se orientan las aves migratorias. Hipótesis, no hecho comprobado.

No es telequinesis ni control mental. El dibujo es esquemático. **¿Qué otra cosa crees que la vida hace con física cuántica? 👇**"

## Robert en pantalla

Es la marca del canal: la ciencia se asocia a su cara. Entra desde el cuadro 0, vuelve cada 8-10 s y nunca tapa el subtítulo (el kit lo dibuja por delante de él).

### Versión narrada: 9 apariciones, **33.6 s en pantalla** (de 61.5 s)

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | «ese iman no mueve la proteina» |
| 8,0 - 11,6 | señalando (13) | arriba-der | senala el iman que entra y el brillo que cae |
| 16,0 - 19,8 | sonriendo (05) | arriba-der | «salio de un pedazo de avena» |
| 20,7 - 23,4 | pensativo (06) | arriba-der | re-gancho: «¿apagar una luz sin tocar nada?» |
| 29,0 - 32,8 | bajando lentes (04) | arriba-der | «de su giro depende si emite luz» |
| 38,0 - 41,8 | serio (10) | **presentador** | -50 % de fluorescencia: el numero fuerte, en grande |
| 42,4 - 46,0 | apuntando (02) | arriba-der | 604 MHz: celula por celula |
| 48,4 - 52,8 | perfil serio (12) | arriba-der | la brujula de las aves, como hipotesis |
| 53,4 - 57,9 | señalando (13) | gancho | cierre: «cuantica en bacterias vivas» |

### Gemelo mudo: 8 apariciones, **28.9 s en pantalla**

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 3,4 | sorprendido (11) | gancho | la proteina en reposo |
| 5,5 - 9,5 | señalando (13) | **presentador** | llega la luz azul, en grande |
| 14,0 - 17,5 | sonriendo (05) | arriba-der | par radical: emite |
| 22,0 - 25,5 | serio (10) | arriba-der | entra el iman |
| 30,0 - 33,5 | pensativo (06) | arriba-der | los giros se quedan paralelos |
| 38,0 - 41,5 | perfil serio (12) | arriba-der | la luz cae a la mitad |
| 46,0 - 49,5 | bajando lentes (04) | arriba-der | se quita el iman |
| 52,5 - 56,5 | apuntando (02) | arriba-der | vuelve a emitir: el loop |

En las dos versiones la tarjeta de cierre lleva a Robert junto al logo (`CierreMarca robert=`).

## Fuentes
- **Abrahams, G. et al., "Quantum spin resonance in engineered proteins for multimodal sensing", *Nature* 649: 1172–1179 (publicado el 21 de enero de 2026)**, doi 10.1038/s41586-025-09971-3. Equipo del Departamento de Ingeniería de la Universidad de Oxford. MagLOV presenta resonancia magnética detectada ópticamente en bacterias vivas a temperatura ambiente, con relación señal-ruido suficiente para detección en una sola célula; el efecto se explica por el **mecanismo de par radical** entre la cadena de la proteína y un cofactor de flavina; las variantes se obtuvieron por **evolución dirigida**. https://www.nature.com/articles/s41586-025-09971-3
- **Números, todos del artículo publicado en *Nature* (2026)**, no del preprint: «Microscope measurement of a single cell expressing **MagLOV 2** showing an MFE of about 50%»; «the magnetic field was switched between **0 mT and 10 mT**, here with a period of 20 seconds»; «a constantly applied static field of **B0 = 21.6 mT** and corresponding resonant field B1 frequency of ωRF = **604 MHz**»; «it is also possible to extract an ODMR signal from a single cell, with an **ODMR contrast of 10%**». El campo apaga la luz porque «mixing into the recombining singlet state is impeded». La proteína madre es el dominio **LOV2 de la fototropina 1 de *Avena sativa*, variante C450A** («Directed evolution of MFP variants was initiated with AsLOV2 C450A, a protein originally isolated from the common oat Avena sativa»). El preprint (bioRxiv 2024.11.25.625143) queda solo como antecedente.
- **MagLOV es anterior a este artículo:** *Nature* 2026 dice «We **previously** reported the development of a library of magneto-responsive fluorescent protein (MFP) variants derived from the LOV2 domain (broadly termed MagLOV)»; aquí se evolucionan variantes y se muestra la ODMR. El grupo es de Oxford en los dos casos.
- **Cobertura:** *Genetic Engineering & Biotechnology News*, 21 de enero de 2026: "las proteínas que dieron el punto de partida vienen de la avena común"; evolución dirigida con varias rondas.
- **Brújula de las aves:** el mecanismo de par radical en criptocromos es la **hipótesis** más trabajada para explicar la magnetorrecepción en aves migratorias. Se presenta como hipótesis.
- El dibujo de la proteína, de la flavina y de los giros es **esquemático**: los electrones no son bolitas con flechas.
