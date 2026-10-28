# Shot Fungi Mati #02 · La hormiga zombi (*Ophiocordyceps*)

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #02 · rama `claude/fun-02-hormiga-zombi`.
- **Origen:** remaster del shot 001 (pedido de Robert en la Sala, 27 oct 2026). Se conserva la historia que Robert aprobó y se lleva a las reglas actuales: gancho de los 7, 61–62 s, re-gancho, estudio con año y lugar, cierre que regresa al gancho, Robert en pantalla.
- **Formato:** N1 "Por dentro" (hormiga → rayos X → hoja → la misma hormiga del inicio, ya entendida).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre lo que se ve: "Esa hormiga no está paseando: la maneja un hongo". La voz arranca en 0.25 s y la hormiga ya camina en el cuadro 0.
- **Duración:** voz 950 caracteres / 174 palabras (≈ 58–60 s) + tarjeta de cierre 3.6 s. Base sin voz: **61.6 s**. La narrada se ajusta a la voz real; si pasa de 62 s se usa `"velocidad"` en `narracion.json` (sin gastar créditos).
- **Voz:** aprobada por Robert en la Sala (`"voz_aprobada": true`, ~950 créditos).
- **Archivos:** `Shot Hormiga Zombi base narrada.dc.html` + `shot-hormiga.jsx` (usa `kit-robert.jsx`: `MarcaAgua num="02"`, `Robert`, `CierreMarca`), `gen-audio.mjs` (cama grave con `audio-kit.mjs`).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa hormiga no está paseando: la maneja un hongo. | Fondo rosa. Cuadro 0: la hormiga entra caminando con los ojos en espiral; baja una marioneta dorada (metáfora) con hilos hasta ella. Etiqueta "hongo". Robert sorprendido (lado gancho). |
| 1 | Espora | Una espora del hongo se le pega a una hormiga carpintera | Fondo azul: la espora alargada cae al suelo, germina con un hilo y su espora chica se pega a la hormiga que pasa. Etiquetas *Ophiocordyceps* y "hormiga carpintera · *Camponotus*". |
| 2 | Espora | y se mete a su cuerpo. | Acercamiento: la espora sobre la cutícula ("la armadura") y un tubo que la atraviesa. |
| 3 | Invasion | Adentro, el hongo crece y envuelve sus músculos, | Rayos X de la hormiga: hilos dorados rodean los músculos (rojos). |
| 4 | Invasion | pero no invade su cerebro. Una hipótesis: la maneja desde los músculos. | El cerebro (rosa) queda limpio: sello ✓ CEREBRO; línea "Hipótesis: la maneja desde los músculos". |
| 5 | Subida | La hormiga deja su colonia y se va a una planta. | Fondo cian: baja del árbol donde está la colonia, cruza el suelo y sube el tallo de una planta chica. |
| 6 | Subida | Suele detenerse a unos veinticinco centímetros del suelo, donde hay mucha humedad. | Regla con flecha que sube hasta 25 cm; "25 cm"; gotitas y chip "MUCHA HUMEDAD". |
| 7 | Mordida | Ahí muerde la vena de una hoja, cerca del mediodía, | Fondo naranja: colgada por debajo de la hoja, muerde una vena (etiqueta "vena, por debajo de la hoja"); el sol sube a lo alto: "≈ MEDIODÍA". |
| 8 | Mordida | y ya no la suelta. Es la mordida de la muerte. | ¡CRAC!; línea «mordida de la muerte». |
| 9 | Pregunta | ¿Y para qué tanto trabajo? | Re-gancho: signo ? gigante en fondo amarillo; Robert grande y pensativo (presentador). |
| 10 | Hongo | Ya muerta, de su nuca brota un tallo que suelta esporas al suelo, por donde pasan otras. | Fondo violeta: de la nuca brota el tallo con su cuerpo fructífero ("sale de la nuca"); caen esporas alargadas al suelo y pasan hormigas. |
| 11 | Fosil | En 2010 describieron estas mordidas en una hoja fósil de Messel, Alemania, de hace unos cuarenta y ocho millones de años. | Fondo lila: cae la losa fósil; tarjeta "2010 · Messel, Alemania"; aparecen tres cicatrices de mordida en la vena; "48 MILLONES DE AÑOS". |
| 12 | Humanos | ¿Y a ti te puede pasar? Tranquilo: este hongo es especialista en hormigas. | Fondo rojo: una hormiga y una persona; sello NO sobre la persona, círculo y chip "SOLO HORMIGAS" en la hormiga. |
| 13 | Calor | Además, la mayoría de los hongos no aguanta tus treinta y siete grados. | Termómetro que sube a "37 °C"; chip "La mayoría de los hongos no crece a 37 °C". |
| 14 | Cierre | Así que esa hormiga prendida de una hoja no estaba descansando: la manejó un hongo. | Regreso a la imagen del inicio (fondo rosa, suelo y marioneta): la misma hormiga, ya prendida por debajo de la hoja, con el tallo del hongo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert apuntando a cámara. |

**Subtítulos:** siempre en la franja alta (y ≈ 430–930), nunca en el tercio inferior.
**Música:** cama grave continua sin golpe (`audio-kit.mjs`, re), debajo de la voz; efectos en el mismo cuadro (pasitos, la marioneta, la espora que cae, gotita al pegarse, zumbido al perforar, latidos del hongo, sello del cerebro, regla, gotas de humedad, ¡crac!, losa fósil, sello NO, termómetro).
**Escala:** la regla de 25 cm es la escala real del shot; el resto del dibujo es esquemático (no se pone barra de escala inventada).

## Robert en pantalla

Tiempos de la base sin voz (61.6 s). Están atados a cada escena (`K.<escena> + s`), así que en la narrada se recorren solos con la voz. Grande (presentador) en el re-gancho «¿Y para qué tanto trabajo?».

| # | Entra (s) | Sale (s) | Pose | Lado | Frase a la que reacciona |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | "Esa hormiga no está paseando: la maneja un hongo." |
| 2 | 6.0 | 7.75 | 13_senalando_arriba | `abajo-izq` | "y se mete a su cuerpo" (señala la espora que perfora) |
| 3 | 11.8 | 15.1 | 06_pensativo_menton | `abajo-izq` | "Una hipótesis: la maneja desde los músculos." |
| 4 | 19.9 | 23.0 | 04_bajando_lentes | `abajo-izq` | "…veinticinco centímetros… mucha humedad" |
| 5 | 25.7 | 28.9 | 10_serio_molesto | `abajo-izq` | "y ya no la suelta. Es la mordida de la muerte." |
| 6 | 29.05 | 32.0 | 07_pensativo_puno | `presentador` | "¿Y para qué tanto trabajo?" |
| 7 | 40.3 | 43.5 | 11_sorprendido | `abajo-izq` | "…de hace unos cuarenta y ocho millones de años." |
| 8 | 45.8 | 48.1 | 05_sonriendo_dientes_uniformes | `abajo-izq` | "Tranquilo: este hongo es especialista en hormigas." |
| 9 | 48.7 | 52.6 | 13_senalando_arriba | `abajo-der` | "…no aguanta tus treinta y siete grados." (señala el termómetro) |
| 10 | 53.9 | 57.9 | 08_recostado_mano | `abajo-izq` | "…no estaba descansando: la manejó un hongo." |
| — | 58.0 | 61.6 | 02_apuntando_camara | `CierreMarca` | tarjeta de cierre |

**Total:** 10 apariciones, **30.7 s** en pantalla (≈ 50 %), 8 poses distintas (sin repetir dos seguidas; sin avatares 01 ni 09). Hueco máximo entre apariciones: 8.3 s (32.0 → 40.3).

## Estado (28 oct 2026)
Verificación completa con las fuentes abiertas: 25 afirmaciones ✅ (`verificacion.md`, VEREDICTO: APROBADO). Animación rehecha con las reglas actuales y revisada con `motor/preview.mjs`. GitHub renderiza la versión sin voz y, con la voz aprobada, el narrado.

## Fuentes
(Frase textual y año de cada dato en `verificacion.md`.)
1. Fredericksen, M. A. et al. (2017). *PNAS* 114(47): 12590–12595. "Fungal cells were found throughout the host body but not in the brain"; "networks that encircled the muscles"; "enter their hosts by penetrating the cuticle".
2. Andersen, S. B. et al. (2009). *The American Naturalist* 174(3): 424–433. "Dead ants were found under leaves, attached by their mandibles, on the northern side of saplings approximately 25 cm above the soil, where temperature and humidity conditions were optimal for fungal growth."
3. Hughes, D. P. et al. (2011). *BMC Ecology* 11: 13. "infected worker ants leave their colony… and descend to the humid understory"; "always bite into abaxial leaf veins"; "synchronized around solar noon".
4. Pontoppidan, M.-B. et al. (2009). *PLoS ONE* 4(3): e4835. "spores are released onto the forest floor where they infect new hosts"; "secondary spores that infect ants as they walk over them".
5. Evans, H. C., Elliot, S. L. y Hughes, D. P. (2011). *PLoS ONE* 6(3): e17024. "Stromata single, produced from dorsal pronotum"; "only ever been recorded on ant hosts of the tribe Camponotini".
6. Hughes, D. P., Wappler, T. y Labandeira, C. C. (2011; en línea 18 ago 2010). *Biology Letters* 7(1): 67–70. "the first example of the stereotypical death grip from 48 Ma leaves of Messel, Germany".
7. Robert, V. A. y Casadevall, A. (2009). *J. Infect. Dis.* 200(10): 1623–1626. "most cannot grow at mammalian temperatures".
8. Bergman, A. y Casadevall, A. (2010). *mBio* 1(5): e00212-10. "A body temperature of 36.7°C maximizes fitness by restricting the growth of most fungal species".

El dibujo es esquemático.
