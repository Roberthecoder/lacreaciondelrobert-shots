# Químico #01 · El agar, la "gelatina" de la microbiología — remasterizado del viejo #16

- **Serie:** Shot Químico (nueva; propuesta de nombre "Reacción en cadena") · **Logo:** `logo_quimica.svg` (matraz) · **Badge:** #01.
- **Formato:** N3 "Capítulos y medidores" (4 capítulos bajo el logo + medidor de temperatura y curva). **Gemelo mudo:** M2 "¿Por qué NO…?" (construido).
- **Gancho:** #1 "Esto no es X: es Y", sobre la placa que tiembla en pantalla.
- **Duración:** voz ≈ 943 caracteres (~58 s con ×1.065) + cierre 3.5 s. Base sin voz: 61.7 s. Mudo: 61.5 s. Si al narrar pasa de 62 s, se acorta la línea del estudio.
- **Estado:** animación lista. **La voz espera tu aprobación** (≈ 943 créditos).
- **Qué cambió del viejo:** ya no es una lista de tipos de agar (sangre, MacConkey, PDA); ahora es **su química**: polisacárido de algas rojas (agarosa + agaropectina) que gelifica con histéresis y que casi nadie puede digerir. Los medios selectivos quedan para otro shot.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es gelatina: es un azúcar de alga que casi ninguna bacteria se puede comer. | Fondo amarillo, placa de Petri vista desde arriba. **A los 0.05 s la placa tiembla como gelatina.** "gelatina" se tacha. Chip "azúcar de alga". Salen colonias. |
| 1 | Alga | Se llama agar y sale de algas rojas: se hierven, se filtran y se secan. | Cap. 1 "De dónde sale". Mar azul con algas rojas ramificadas (*Gelidium*). Tres círculos: hervir → filtrar → secar. |
| 2 | Quimica | Es un polisacárido, cadenas larguísimas de azúcares: la agarosa y la agaropectina. | Cap. 2 "Su química" (fondo oscuro): se arman dos cadenas de anillos: agarosa (≈ 70 %) y agaropectina (con grupos sulfato, en lila). |
| 3 | Red | Al enfriarse, esas cadenas se enroscan y se amontonan en manojos: una red que atrapa el agua. | Las cadenas sueltas que se agitan pasan a pares enroscados unidos en red; las moléculas de agua dejan de moverse. Medidor de temperatura que baja. |
| 4 | Temp | Lo raro es que se derrite cerca de ochenta y cinco grados, pero no cuaja hasta unos treinta y cinco. | Curva de estado: el punto sube por "sólido" y salta a "líquido" en ~85 °C; de regreso baja por "líquido" y cuaja en ~35 °C (histéresis). |
| 5 | Pregunta | ¿Y eso para qué sirve? | **Re-gancho.** Incubadora a 37 °C. Sticker pensativo. |
| 6 | Incuba | Las bacterias se incuban a treinta y siete grados: la gelatina ahí se derrite, el agar no. | Cap. 3 "Por qué sirve". Dos placas: la de gelatina se escurre y las colonias se corren; la de agar queda firme. |
| 7 | Estudio | En 1881, Fanny Hesse, que lo usaba en sus postres, se lo sugirió a su esposo, que trabajaba con Robert Koch. | Tarjeta "1881 · Fanny Hesse · se lo sugiere a Walther Hesse · lab. de Robert Koch". Un postre de agar que tiembla → flecha → placa con colonias. "de la cocina al laboratorio". |
| 8 | Come | Y como casi nadie tiene las enzimas para romperlo, las colonias crecen encima sin deshacerlo. | Cap. 4 "Casi nadie se lo come". Bacterias sobre el agar forman colonias sin hundirlo; una bacteria marina con agarasa sí lo excava. |
| 9 | Extra | Lo curioso: en Japón, bacterias del intestino tomaron genes de microbios del mar para digerir algas como el nori. | Tarjeta "2010 · Hehemann et al. · Nature". Rollo de sushi con nori; un trocito de ADN viaja de *Zobellia* (del mar) a *Bacteroides plebeius* (intestino). Sticker sorprendido. |
| 10 | Cierre | Así que no es gelatina: es el piso donde crece gran parte de la microbiología. | **Regreso a la placa del inicio**, ahora llena de colonias. |
| — | Outro | (sin voz) | Cierre de marca. |

## Música y sonido (`gen-audio.mjs`)
- **Narrada:** cama grave continua sin golpe; más grave en las escenas moleculares; un toque por anillo de cada cadena; la nota sube y baja con la curva de temperatura; golpe en cada tarjeta.
- **Mudo (datos):** la temperatura es la melodía (20 → 37 °C en la incubadora y 37 → 95 → 25 °C en la curva del agar); acorde justo al cruzar ~85 °C (se derrite) y ~35 °C (cuaja). Música **tapada** mientras la gelatina se derrite y se la comen; **libre** cuando el agar aguanta.

## Gemelo mudo (M2 "¿Por qué NO…?", 61.5 s en loop) — `Shot Agar mudo.dc.html`
Pregunta fija: **"¿Por qué NO usar gelatina en vez de agar?"** → la incubadora sube a 37 °C y la gelatina se vuelve líquida (medidor "gelatina sólida" baja) → microbios que se comen la gelatina la deshacen → el agar sigue firme → curva: se derrite hasta ~85 °C y cuaja hasta ~35 °C → "a 37 °C el agar no se mueve" → las dos placas otra vez, como al inicio. **Título:** "¿Por qué NO usar gelatina en el laboratorio? 🎧".

## Descripción (borrador)
"Esto no es gelatina: es un azúcar de alga que casi ninguna bacteria se puede comer. 🧫 El agar se extrae de algas rojas (como *Gelidium* y *Gracilaria*): se hierven, se filtra el extracto y se seca. Químicamente es un polisacárido formado por agarosa (≈ 70 %) y agaropectina. Al enfriarse, sus cadenas se enroscan y se agrupan en una red que atrapa el agua. Su truco es la histéresis: se derrite cerca de 85 °C pero no cuaja hasta unos 32–40 °C, así que a 37 °C (la temperatura de incubación de muchas bacterias) sigue sólido, mientras la gelatina se derrite y muchos microbios la digieren. En 1881, Fanny Hesse, que usaba agar en sus postres, se lo sugirió a su esposo Walther, que trabajaba con Robert Koch. Y casi ningún microbio tiene las enzimas para romperlo (agarasas), salvo algunas bacterias marinas; en 2010 se descubrió que bacterias intestinales de personas en Japón adquirieron genes de bacterias marinas para digerir algas como el nori. El dibujo es esquemático. ¿Sabías que el agar también se usa para hacer postres? ¿Cómo le dicen en tu casa? 👇"

## Fuentes
- Science History Institute, *Fanny Angelina Hesse* (sciencehistory.org): aprendió a usar agar de vecinos holandeses que venían de Java; lo usaba para cuajar postres en verano; en 1881 lo sugirió; la gelatina se licuaba a temperaturas de incubación y varios microbios la digieren.
- *Agarose* (Wikipedia, con referencias), hoja técnica de agar de Sigma-Aldrich y manual de la FAO sobre agar (fao.org/4/ag156e): agar = agarosa (~70 %) + agaropectina; gel de 1 % que se forma entre ~32–39 °C y no se funde hasta ~85 °C; los valores cambian con el alga y la pureza (FAO: gelifica 30–50 °C, funde 82–92 °C).
- Chi, W.-J., Chang, Y.-K. y Hong, S.-K. (2012). *Agar degradation by microorganisms and agar-degrading enzymes.* Applied Microbiology and Biotechnology 94: 917–930: pocos organismos hidrolizan el agar; las agarasas están sobre todo en bacterias marinas.
- Hehemann, J.-H. et al. (2010). *Transfer of carbohydrate-active enzymes from marine bacteria to Japanese gut microbiota.* Nature 464: 908–912: genes de porfiranasas y agarasas de *Zobellia galactanivorans* encontrados en *Bacteroides plebeius* de personas japonesas.
- Arnott, S. et al. (1974). *The agarose double helix and its function in agarose gel structure.* J. Mol. Biol. 90: 269–284 (modelo de hélices que se agrupan en manojos; por eso el guion dice "se enroscan y se amontonan" sin afirmar más detalle).

## Datos que no se pudieron verificar con precisión
- La temperatura exacta a la que se derrite la gelatina varía con la concentración y el tipo; por eso solo se dice que "a 37 °C se derrite".
- El modelo exacto de la red de agarosa (doble hélice vs. hélices sencillas) se sigue discutiendo; la voz solo dice "se enroscan".
- La cifra "≈ 70 % agarosa" es típica, no fija (depende del alga).
