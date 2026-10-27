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
| 7 | Giro | Esos dos giran, y de su giro depende si la proteína vuelve a emitir luz. | Las dos flechas giran; dos caminos: "juntos → emite" y "al revés → no emite". |
| 8 | Campo | El campo magnético no los empuja: cambia la probabilidad de cada giro. | El imán aparece y la balanza de probabilidad se inclina. Nada se desplaza. |
| 9 | Mitad | Con diez milésimas de tesla, la fluorescencia cae cerca de la mitad. | `NumeroGigante` "−50 %" y el medidor cayendo. Chip "0 → 10 mT". |
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
4. **Imán**: entra el campo. 5. **Triplete**: los giros se desemparejan. 6. **Baja**: la luz cae a la mitad (la música se tapa).
7. **Quita** el imán. 8. **Vuelve** a emitir… y vuelve a apagarse: el primer cuadro.
- **La música son los datos y cuenta el estado:** una nota por fotón, un tono por el campo, y **tapada mientras el imán está puesto**, libre cuando se quita. 🎧 en el título.

## Descripción (para publicar)
"Ese imán no mueve la proteína: le cambia **el giro de sus electrones**. 🧲🔵 En enero de 2026, un equipo del Departamento de Ingeniería de la **Universidad de Oxford** publicó en *Nature* una proteína fluorescente diseñada, **MagLOV**, que responde a campos magnéticos **dentro de bacterias vivas y a temperatura ambiente**.

MagLOV se construyó por **evolución dirigida** (miles de variantes al azar, se elige la mejor, y otra vez) a partir del dominio **LOV2 de la fototropina 1 de la avena, *Avena sativa***: el mismo tipo de pieza con la que las plantas sienten la luz azul.

¿Cómo funciona? La luz azul mueve un electrón entre la flavina y la propia proteína, y quedan **dos electrones desapareados**: un **par radical**. De cómo estén alineados sus giros depende si el sistema vuelve al estado que emite luz. Un campo magnético **no empuja nada**: cambia la probabilidad de cada alineación. Resultado medido en células: al conmutar el campo entre **0 y 10 mT**, la fluorescencia baja alrededor de **−50 %**. Y con un campo estático de ~**21.6 mT** y radio a **604 MHz** aparece la resonancia: **resonancia magnética detectada ópticamente (ODMR)**, visible **célula por célula** con un contraste de ~10 %.

Para qué sirve: biosensores que se pueden leer a través del tejido, porque los campos magnéticos pasan donde la luz no.

Y un extra: el mecanismo de par radical es también la **hipótesis** principal de cómo se orientan las aves migratorias. Hipótesis, no hecho comprobado.

No es telequinesis ni control mental. El dibujo es esquemático. **¿Qué otra cosa crees que la vida hace con física cuántica? 👇**"

## Fuentes
- **Abrahams, G. et al., "Quantum spin resonance in engineered proteins for multimodal sensing", *Nature* (2026)**, doi 10.1038/s41586-025-09971-3. Equipo del Departamento de Ingeniería de la Universidad de Oxford. MagLOV presenta resonancia magnética detectada ópticamente en bacterias vivas a temperatura ambiente, con relación señal-ruido suficiente para detección en una sola célula; el efecto se explica por el **mecanismo de par radical** entre la cadena de la proteína y un cofactor de flavina; las variantes se obtuvieron por **evolución dirigida**. https://www.nature.com/articles/s41586-025-09971-3
- **Números**, del preprint del mismo trabajo (bioRxiv 2024.11.25.625143): efecto magnético en células **Δℐ/ℐoff ≈ −50 %** conmutando el campo entre **0 y 10 mT**; **ODMR** con campo estático de **~21.6 mT** y radiofrecuencia resonante de **604 MHz** (B₁ ≈ 0.2 mT), con contraste de ~**10 %** en una sola célula; células *E. coli* MG1655; medidas a temperatura ambiente. La proteína madre es el dominio **LOV2 de la fototropina 1 de *Avena sativa*, variante C450A**.
- **Cobertura:** *Genetic Engineering & Biotechnology News*, 21 de enero de 2026: "las proteínas que dieron el punto de partida vienen de la avena común"; evolución dirigida con varias rondas.
- **Brújula de las aves:** el mecanismo de par radical en criptocromos es la **hipótesis** más trabajada para explicar la magnetorrecepción en aves migratorias. Se presenta como hipótesis.
- El dibujo de la proteína, de la flavina y de los giros es **esquemático**: los electrones no son bolitas con flechas.
