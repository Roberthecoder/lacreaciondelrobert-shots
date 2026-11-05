# Shot Fungi Mati #125 · Ese hongo no está podrido: se pone azul al cortarlo

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #125 · rama `claude/fun-125-129-colores`.
- **Formato:** N1 · POR DENTRO. Viaje: el boleto entero en el bosque (macro) → el corte y la carne que se azula → dentro de las células (fondo oscuro, pigmento + oxígeno → anión azul) → el mismo boleto partido, ya azul (macro transformado).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo en pantalla: «Ese hongo no se está pudriendo: se pone azul en segundos porque lo cortaste.»
- **Duración estimada:** voz 171 palabras / 967 caracteres (≈ 58.5 s a ~175 palabras/min) + cierre 3 s → **≈ 61.5 s**. Se comprueba con ffprobe al renderizar.
- **Voz:** pendiente de aprobación de Robert (~970 créditos de ElevenLabs).
- **Tono:** curiosidad química, sin consejo de consumo. Mensaje de seguridad explícito: el color no dice si se come; no comer hongos silvestres sin un experto.
- **Estado:** GUION ESCRITO, **pendiente de verificación independiente** (no se ha animado).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese hongo no se está pudriendo: se pone azul en segundos porque lo cortaste. | Fondo menta. Un boleto grueso (sombrero café, poros amarillos, pie robusto) sobre hojarasca; una navaja lo parte a la mitad en el cuadro 0.3 y la carne amarilla empieza a azularse desde el corte hacia fuera. Chip "no es podrido". Robert sorprendido (lado `gancho`). |
| 1 | Boleto | Es un boleto: abajo no tiene láminas, sino poros, como esponja. | La cámara gira bajo el sombrero: superficie de poros (agujeritos) con zoom tipo Lupa; comparación con una esponja. Etiqueta "boleto · poros, no láminas". Barra de escala 1 cm. |
| 2 | Toque | Este, *Cyanoboletus pulverulentus*, con solo tocarlo se pinta de azul casi negro. | Un dedo toca el pie amarillo y la huella se vuelve azul casi negro al instante. Etiqueta "*Cyanoboletus pulverulentus*". Escala 5 cm. |
| 3 | Pigmento | Muchos boletos guardan en sus células un pigmento que aún no es azul: el ácido variegático o el xerocómico. | Zoom con Lupa a la carne (fondo oscuro, "POR DENTRO"): células (hifas) con gotitas amarillo-naranja dentro. Etiquetas "ácido variegático" y "ácido xerocómico (su pariente)". Molécula esquemática. Escala 10 µm. |
| 4 | Corte | Al cortar, las células se rompen y el pigmento se topa con el oxígeno del aire. | La navaja pasa: las paredes de las hifas se rompen, sale el pigmento; llegan bolitas de O₂ desde arriba. Efecto de rasgado y burbujitas en el mismo cuadro. |
| 5 | Oxida | Se oxida y se vuelve un anión azul: un pequeño cambio químico, y cambia el color. | La molécula esquemática pierde un par de electrones (chispitas) y se pinta de azul; signo "–" de anión. Chip "oxidación → anión azul". |
| 6 | Pregunta | ¿Entonces el azul es señal de veneno? | **Re-gancho.** Fondo rosa: el boleto azul con una calavera con "?" encima. Robert grande, pensativo (`presentador`). |
| 7 | Estudio | En 1968, unos químicos publicaron en una revista de Londres qué molécula azula a los boletos. | Fondo cian. TarjetaEstudio "1968 · *J. Chem. Soc. C* (Londres) · «The blueing of *Boletus* species»" con la molécula del ácido variegático. |
| 8 | Respuesta | No: el color no dice si se come. Hay azulados que se comen bien cocidos y otros que intoxican, como el boleto de Satanás. | Fondo amarillo. Dos boletos azulados lado a lado: uno con chip "se come solo bien cocido" (*Neoboletus luridiformis*), otro con chip "intoxica" (*Rubroboletus satanas*, sombrero blanquecino y poros rojos). Sello "EL COLOR NO DICE". |
| 9 | Aviso | Nunca comas hongos silvestres sin que un experto los identifique. | Chip grande "no comas silvestres sin experto"; mano que deja el hongo en una canasta para identificar. Robert serio. |
| 10 | DatoExtra | Y *Gyroporus cyanescens* también se azula, pero con otra molécula: la girocianina. | Fondo lila. *Gyroporus cyanescens* (sombrero paja, pie hueco) se azula al tocarlo; dos moléculas esquemáticas distintas con chip "otra molécula: girocianina". |
| 11 | Cierre | Así que ese hongo no está podrido: es química pintando de azul en segundos. | **Regreso a la imagen del inicio:** el mismo boleto partido del cuadro 0, ahora todo azul, con las etiquetas "pigmento + oxígeno". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

**Música (por componer, ver `maestro/recetas/composicion-musical.md`):** cama grave continua, de bosque húmedo, que se tiñe (acorde que se abre) cuando la carne se azula. Efectos: navaja cortando, toque del dedo, rasgado de células, burbujitas de oxígeno, chispitas de electrones, sello.

Barras de escala: 5 cm (hongo entero), 1 cm (poros), 10 µm (hifas), "esquemático" en las moléculas.

Aviso en pantalla (pequeño, en Respuesta/Aviso): «No es guía de consumo. No comas hongos silvestres sin que un experto los identifique.»

## Robert en pantalla (plan; tiempos estimados de la base)

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | «se pone azul en segundos» (cuadro 0) |
| 2 | 8.8 | 12.0 | 13_senalando_arriba | `arriba-der` | «con solo tocarlo se pinta de azul» |
| 3 | 19.4 | 23.0 | 04_bajando_lentes | `arriba-der` | «las células se rompen… oxígeno» |
| 4 | 30.1 | 32.5 | 07_pensativo_puno | `presentador` | «¿Entonces el azul es señal de veneno?» |
| 5 | 38.2 | 43.5 | 06_pensativo_menton | `arriba-der` | «el color no dice si se come» |
| 6 | 46.2 | 49.6 | 10_serio_molesto | `arriba-der` | «Nunca comas hongos silvestres…» |
| 7 | 49.8 | 53.5 | 11_sorprendido | `arriba-der` | «otra molécula: la girocianina» |
| 8 | 54.0 | 58.3 | 02_apuntando_camara | `arriba-der` | «es química pintando de azul» |
| — | 58.5 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

Apariciones 8 · **≈ 28.4 s** en pantalla (+ cierre 3 s) · 7 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (a confirmar por el verificador independiente)

1. Velíšek, J. y Cejpek, K. (2011). Pigments of higher fungi – a review. *Czech Journal of Food Sciences* 29(2): 87–102. https://www.agriculturejournals.cz/publicFiles/524_2010-CJFS.pdf (abierto y leído el 5 nov 2026)
   > "Xerocomic and variegatic acids play the most important role being responsible for the blue colours acquired in many boletes after their fruiting bodies are injured, which results in the oxidation of these acids to the corresponding blue chinonmethid anions"
   > "gyrocyanin in G. cyanescens (Bull. ex Fr.) Quél. The colour changes of the latter mushroom are associated with the related metabolite of gyrocyanin, which is oxidised to the blue anion"
2. Beaumont, P. C., Edwards, R. L. y Elsworthy, G. C. (1968). Constituents of the higher fungi. Part VIII. The blueing of *Boletus* species. Variegatic acid, a hydroxytetronic acid from *Boletus* species and a reassessment of the structure of boletol. *Journal of the Chemical Society C*: 2968. https://doi.org/10.1039/j39680002968 (metadatos vía Crossref; el texto completo está tras muro de pago).
3. *Cyanoboletus pulverulentus* — "All parts of the mushroom will stain dark bluish-black after handling"; "immediately turns blackish-blue when handled". https://en.wikipedia.org/wiki/Cyanoboletus_pulverulentus (falta fuente primaria: guía de campo).
4. *Neoboletus luridiformis* — "edible after being well cooked, although some people are adversely affected by it" (Arora, *Mushrooms Demystified*, 1986); "The flesh stains dark blue when bruised; broken, or cut" (Phillips 2006). https://en.wikipedia.org/wiki/Neoboletus_luridiformis
5. *Rubroboletus satanas* — "The flesh turns blue when cut or bruised"; "moderately poisonous, especially if eaten raw"; bolesatina: Kretz, Creppy y Dirheimer (1991), *Toxicology*. https://en.wikipedia.org/wiki/Rubroboletus_satanas

El dibujo es esquemático. No es guía de consumo.
