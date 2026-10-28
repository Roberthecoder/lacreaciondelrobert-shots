# Verificación · Shot Fungi Mati #02 · La hormiga zombi

**Segunda verificación, 28 oct 2026, con las fuentes abiertas.** La primera (27 oct) quedó incompleta porque la red del
entorno bloqueaba las revistas; sus ❌/⚠️ ya se habían corregido en el guion (resumen al final). Ahora Robert abrió la red.

**Quién verificó:** la sesión que terminó el remaster (no escribió el guion). En esta sesión no había herramienta para lanzar
subagentes, así que la verificación la hizo esta misma sesión, abriendo cada fuente, con el mismo encargo y el mismo
criterio escéptico ("si dudas, es ⚠️").

**Cómo se abrieron las fuentes:** texto completo desde PubMed Central / Europe PMC (las páginas de pnas.org, academic.oup.com y
pubmed.ncbi.nlm.nih.gov devolvían retos anti-bots). Cada frase textual de abajo se copió del texto abierto, no del resumen del
buscador. Para Robert y Casadevall (2009) solo está abierto el resumen (registro MEDLINE en Europe PMC); por eso esa
afirmación se respalda además con el texto completo de Bergman y Casadevall (2010).

Se revisó el texto narrado (`narracion.json`, 15 líneas) y lo que se ve en pantalla (`shot-hormiga.jsx`).

| # | afirmación | veredicto | fuente | frase textual | año |
|---|---|---|---|---|---|
| 1 | "Esa hormiga no está paseando: la maneja un hongo" (el hongo manipula la conducta de la hormiga) | ✅ | Andersen et al., *Am Nat* 174(3):424–433 · https://europepmc.org/article/MED/19627240 | "Manipulation of host behavior is such an adaptation… Ant-infecting Ophiocordyceps are known to make hosts bite onto vegetation before killing them." | 2009 |
| 2 | "Una espora del hongo se le pega a una hormiga" (la espora cae al suelo y una espora secundaria infecta a la hormiga que pasa) — en pantalla: la espora cae al suelo, germina y su espora chica se pega a la hormiga | ✅ | Pontoppidan et al., *PLoS ONE* 4(3):e4835 · https://pmc.ncbi.nlm.nih.gov/articles/PMC2652714/ | "Spores are too large to be wind dispersed and instead fall directly to the ground where they produce secondary spores that infect ants as they walk over them" | 2009 |
| 3 | "…hormiga carpintera" (*Camponotus*); etiqueta en pantalla "hormiga carpintera · Camponotus" | ✅ | Fredericksen et al., *PNAS* 114(47):12590–12595 · https://pmc.ncbi.nlm.nih.gov/articles/PMC5703306/ | "the species-specific fungal parasite Ophiocordyceps unilateralis sensu lato and its carpenter ant host (Camponotus castaneus)" | 2017 |
| 4 | "…y se mete a su cuerpo" — en pantalla: un tubo atraviesa la cutícula ("la armadura") | ✅ | Fredericksen et al. 2017 (PMC5703306) | "species in the unilateralis complex enter their hosts by penetrating the cuticle to then proliferate and fill the ant's body" | 2017 |
| 5 | En pantalla: la espora es alargada y al germinar saca un hilo con una espora chica en la punta | ✅ | Evans, Elliot y Hughes, *PLoS ONE* 6(3):e17024 · https://pmc.ncbi.nlm.nih.gov/articles/PMC3047535/ | "Ascospores newly released onto agar, distinctly vermiform in shape"; "Ascospore germinating after 24 h on agar, with a needle-like outgrowth (capilliconidiophore) producing a terminal conidium" | 2011 |
| 6 | "Adentro, el hongo crece y envuelve sus músculos" — en pantalla: hilos dorados alrededor de los músculos | ✅ | Fredericksen et al. 2017 | "fungal cells invaded host muscle fibers and joined together to form networks that encircled the muscles" | 2017 |
| 7 | "…pero no invade su cerebro" — sello "✓ CEREBRO" | ✅ | Fredericksen et al. 2017 | "Fungal cells were found throughout the host body but not in the brain" | 2017 |
| 8 | "Una hipótesis: la maneja desde los músculos" (dicho como hipótesis, también en pantalla) | ✅ | Fredericksen et al. 2017 | "…but not in the brain, implying that behavioral control of the animal body by this microbe occurs peripherally." | 2017 |
| 9 | "La hormiga deja su colonia y se va a una planta" — en pantalla: baja del árbol donde está la colonia y sube a una planta chica | ✅ | Hughes et al., *BMC Ecol* 11:13 · https://pmc.ncbi.nlm.nih.gov/articles/PMC3118224/ | "infected worker ants leave their colony in the dry, hot canopy and descend to the humid understory where they appear to actively select leaves of saplings" | 2011 |
| 10 | "Suele detenerse a unos veinticinco centímetros del suelo" — regla y "25 cm" en pantalla | ✅ | Andersen et al. 2009 (MED/19627240) | "Dead ants were found under leaves, attached by their mandibles, on the northern side of saplings approximately 25 cm above the soil" (medición de campo en Tailandia; no es un conteo que cambie con los años) | 2009 |
| 11 | "…donde hay mucha humedad" — chip "MUCHA HUMEDAD" | ✅ | Hughes et al. 2011; Andersen et al. 2009 | "descend to the humid understory"; "where temperature and humidity conditions were optimal for fungal growth" | 2011 / 2009 |
| 12 | "Ahí muerde la vena de una hoja" — en pantalla: muerde una vena por debajo de la hoja | ✅ | Hughes et al. 2011 | "These parasite manipulated ants always bite into abaxial leaf veins and not the laminar blade, edge or upper surface (adaxial)." | 2011 |
| 13 | "…cerca del mediodía" — sol en lo alto, "≈ MEDIODÍA" | ✅ | Hughes et al. 2011 | "Transitions from erratic wandering to death grips on a leaf vein were abrupt and synchronized around solar noon." | 2011 |
| 14 | "…y ya no la suelta" | ✅ | Hughes et al. 2011; Fredericksen et al. 2017 | "This lock-jaw means the ant will remain attached to the leaf after death."; "when the manipulated host fixes itself permanently to a substrate by its mandibles" | 2011 / 2017 |
| 15 | "Es la mordida de la muerte" (nombre del comportamiento) | ✅ | Hughes et al. 2011 | "death grips on a leaf vein" (*death grip* = "mordida de la muerte") | 2011 |
| 16 | "Ya muerta…" (el tallo sale después de que muere) | ✅ | Hughes et al. 2011; Fredericksen et al. 2017 | "dying in the nest would not allow sufficient time for stalk development and spore release"; "(both species can only reproduce from dead insects)" | 2011 / 2017 |
| 17 | "…de su nuca brota un tallo" — etiqueta "sale de la nuca"; el tallo sale de detrás de la cabeza | ✅ | Evans et al. 2011 | "Stromata single, produced from dorsal pronotum" (pronoto dorsal = la parte de arriba justo detrás de la cabeza, la "nuca" de la hormiga) | 2011 |
| 18 | "…que suelta esporas al suelo, por donde pasan otras" — en pantalla caen esporas al suelo y pasan hormigas | ✅ | Pontoppidan et al. 2009 | "From this structure spores are released onto the forest floor where they infect new hosts." | 2009 |
| 19 | "En 2010 describieron estas mordidas en una hoja fósil…" — tarjeta "2010" | ✅ | Hughes, Wappler y Labandeira, *Biol Lett* 7(1):67–70 · https://pmc.ncbi.nlm.nih.gov/articles/PMC3030878/ | Publicado en línea "2010 Aug 18"; "A nearly complete fossil leaf (…) from Messel with 29 ant death-grip scars centred on 11 secondary veins" | 2010 |
| 20 | "…de Messel, Alemania" — tarjeta "Messel, Alemania" | ✅ | Ídem | "the first example of the stereotypical death grip from 48 Ma leaves of Messel, Germany" | 2010 |
| 21 | "…de hace unos cuarenta y ocho millones de años" — "48 MILLONES DE AÑOS" | ✅ | Ídem | "48 Ma"; "subtropical forests surrounding Lake Messel 48 Ma" | 2010 |
| 22 | "Este hongo es especialista en hormigas" — en pantalla "SOLO HORMIGAS" y sello NO sobre una persona | ✅ | Evans et al. 2011; Fredericksen et al. 2017 | "O. unilateralis has only ever been recorded on ant hosts of the tribe Camponotini"; "the species-specific fungal parasite" | 2011 / 2017 |
| 23 | "La mayoría de los hongos no aguanta tus treinta y siete grados" — chip "La mayoría de los hongos no crece a 37 °C" | ✅ | Robert y Casadevall, *J Infect Dis* 200(10):1623–1626 · https://europepmc.org/article/MED/19827944 (resumen); Bergman y Casadevall, *mBio* 1(5):e00212-10 · https://pmc.ncbi.nlm.nih.gov/articles/PMC2975364/ | "We analyzed the thermal tolerance of 4802 fungal strains from 144 genera and found that most cannot grow at mammalian temperatures."; "A body temperature of 36.7°C maximizes fitness by restricting the growth of most fungal species" | 2009 / 2010 |
| 24 | Cierre: "esa hormiga prendida de una hoja no estaba descansando: la manejó un hongo" (se refiere a la hormiga infectada que se ve, no a cualquier hormiga quieta) | ✅ | Suma de 1, 12, 14 y 16 | — | 2009–2017 |
| 25 | En pantalla: la "marioneta" dorada del gancho y del cierre | ✅ (metáfora, no afirma un mecanismo) | — | Es un dibujo para "la maneja"; el mecanismo real se dice como hipótesis (fila 8). | — |

**Resultado:** 25 afirmaciones revisadas (21 de la voz, 4 solo de pantalla) · 25 ✅ · 0 ❌ · 0 ⚠️.

### Cambios hechos hoy en lo que se ve (para que coincida con lo verificado)
- Quitado: la espora que caía directo sobre la hormiga en el gancho ("¡PLOC!"). Ahora el gancho muestra la hormiga y la marioneta (metáfora).
- Quitado del texto en pantalla: "≈ 95 % de humedad" y "Enzimas + presión" (no estaban en las fuentes abiertas). "12:00" → "≈ MEDIODÍA" (es mediodía solar).
- La colonia se dibuja en un árbol (nidos en el dosel, fila 9); el tallo sale de la nuca (fila 17); las esporas caen al suelo (fila 18).
- La tarjeta del fósil dice 2010 (fecha de publicación en línea), no 2011.

### Primera verificación (27 oct 2026): correcciones que ya se habían aplicado
"atraviesa su armadura" → "se mete a su cuerpo"; "abandona su colonia y trepa" → "deja su colonia y se va a una planta";
"casi siempre a 25 cm" → "suele detenerse a unos 25 cm"; "días después, de su cabeza" → "ya muerta, de su nuca";
"llueven esporas sobre las de abajo" → "suelta esporas al suelo, por donde pasan otras"; "en 2011" → "en 2010";
"casi ningún hongo aguanta" → "la mayoría de los hongos no aguanta"; el cierre ya no generaliza a cualquier hormiga quieta.
Hoy se volvieron a verificar todas esas frases con la fuente abierta (filas 2–4, 9–10, 16–19, 23–24).

VEREDICTO: APROBADO
