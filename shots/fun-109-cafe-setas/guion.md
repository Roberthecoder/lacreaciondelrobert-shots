# Shot Fungi Mati #109 · Tu café usado puede dar setas

> ⛔ **GUION SIN VERIFICAR.** Falta la verificación independiente (subagente) y `verificacion.md`. No animar hasta que diga `VEREDICTO: APROBADO`.

- **Serie:** Shot Fungi Mati · **Logo:** biología (ADN) · **Badge:** #109 · rama `claude/fun-105-109-cultivo`.
- **Formato:** N5 El experimento + N1 Por dentro: taza → posos en el filtro → mito/dato (mezclas) → por dentro (hifas entre granitos de café, cafeína → xantina) → re-gancho → estudio dibujado (Veracruz) → la misma taza, ahora con setas.
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre algo en pantalla: «Esto no es tierra: es el café que tiraste esta mañana, y puede dar setas.»
- **Duración:** voz 913 caracteres / 176 palabras (≈ 58 s, a confirmar con `estimar-escenas.mjs`) + cierre 3.5 s → objetivo **61–62 s**.
- **Voz:** pendiente de aprobación de Robert.
- **Robert (hecho fijo ✅, correcciones-de-robert.md):** a los 10 años probó con café y no le funcionó ("café tampoco"). No se dice la causa.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esto no es tierra: es el café que tiraste esta mañana, y puede dar setas. | Fondo amarillo. Una mano voltea un filtro y cae un montón café oscuro (cuadro 0.3) que parece tierra; etiqueta "¿tierra?" se tacha → "posos de café". A un lado, la taza vacía con vapor. Barra de escala 5 cm. |
| 1 | Robert | A mí, a los diez años, el café no me funcionó. | Fondo rosa. Maceta-bolsa con posos y un "✗" chiquito; Robert grande (presentador) apenado/serio. Chip "Robert, 10 años". |
| 2 | Mito | Mito: pones solo posos y salen hongos. | Fondo naranja. Bolsa 100 % posos; sello **MITO**. |
| 3 | Dato | En un estudio de 2021, con más de treinta por ciento de posos, las setas ya no brotaron. | Fondo cian. Sello **DATO**. Barra de % de posos que sube; al pasar 30 % las setas de la bolsa se apagan. TarjetaEstudio "2021 · Malasia · *Future Foods*". |
| 4 | Mezcla | En otro, un tercio de posos con paja y ramas de olivo dio casi su peso seco en setas. | Fondo menta. Tres capas iguales (posos · paja · poda de olivo) en una bolsa; balanza: sustrato seco vs setas frescas casi iguales. Chip "eficiencia biológica 95 % · 2021". |
| 5 | Hifas | Por dentro, las hifas se cuelan entre los granitos de café, | Zoom (fondo oscuro, "POR DENTRO"): partículas de café y hifas blancas tabicadas que se ramifican entre ellas. Barra de escala 100 µm. |
| 6 | Cafeina | y el micelio rompe parte de la cafeína hasta xantina. | Molécula esquemática de cafeína pierde sus tres metilos → xantina. Chip "solo una parte · 2019". |
| 7 | Pregunta | ¿Y las setas salen con cafeína? | **Re-gancho.** Fondo rosa: racimo de setas con "?" gigante; Robert pensativo. |
| 8 | Espresso | Sí, trazas: tendrías que comer unos doscientos cincuenta kilos de setas frescas para igualar un espresso. | Fondo amarillo. Una tacita de espresso contra una montaña de cajas de setas "≈ 250 kg". TarjetaEstudio "2019 · Carrasco-Cabrera, Bell y Kertesz". |
| 9 | Mexico | Y en México ya se hacía: desde 1984, en Veracruz, se cultivó *Pleurotus* en pulpa de café. | Fondo verde. Cereza de café partida: grano + pulpa; la pulpa va a bolsas de cultivo. Mapa esquemático de Veracruz. Chip "pulpa = lo de afuera del grano". |
| 10 | Coatepec | En Coatepec, pulpa secada al sol y guardada dos años dio más setas frescas que su propio peso seco. | Sol sobre la pulpa extendida; costales "2 años"; balanza que se inclina hacia las setas: "EB > 100 % · 1987". Nota chiquita: "setas frescas (con agua) vs sustrato seco". |
| 11 | Mundo | Y cada año el mundo tira unos seis millones de toneladas de posos. | Globo esquemático con montaña de posos; número "≈ 6 millones de t / año · estimación 2022". |
| 12 | Cierre | Así que no es tierra: es tu café de esta mañana, convertido en comida. | **Regreso a la imagen del inicio:** el mismo montón de posos junto a la taza, ahora mezclado con paja y con un racimo de *Pleurotus ostreatus* (repisa, pie corto lateral, laminillas decurrentes, gris-crema) saliendo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de biología y Robert señalando. |

## Robert en pantalla (tentativo, se ajusta con los tiempos reales)

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 3.0 | 11_sorprendido | `gancho` | «Esto no es tierra» |
| 2 | 4.3 | 7.5 | 12_perfil_serio | `presentador` | «a mí… no me funcionó» |
| 3 | 10.0 | 14.0 | 10_serio_molesto | `arriba-der` | «Mito… ya no brotaron» |
| 4 | 22.0 | 26.0 | 13_senalando_arriba | `arriba-der` | «las hifas se cuelan» |
| 5 | 28.5 | 31.0 | 06_pensativo_menton | `grande` | «¿Y las setas salen con cafeína?» |
| 6 | 32.0 | 37.0 | 11_sorprendido | `arriba-der` | «250 kilos» |
| 7 | 44.0 | 48.0 | 04_bajando_lentes | `arriba-der` | «más que su propio peso» |
| 8 | 53.0 | 57.5 | 02_apuntando_camara | `arriba-der` | «tu café de esta mañana» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | cierre |

8 apariciones · ≈ 30 s · 7 poses distintas.

## Fuentes (investigación previa; falta la verificación independiente)

1. Chai, W. Y. et al. (2021). *Future Foods* 4: 100075. https://doi.org/10.1016/j.fufo.2021.100075
   > "fruitification was inhibited when concentrations of SCG in the mixed substrate exceeded 30% (w/w)"; "trace amounts of caffeine were also detected in fruiting bodies"
2. Abou Fayssal, S. et al. (2021). *PLoS ONE* 16(9): e0255794. https://pmc.ncbi.nlm.nih.gov/articles/PMC8462683
   > mezcla 33 % paja + 33 % posos + 33 % poda de olivo → eficiencia biológica 95.3 %.
3. Carrasco-Cabrera, C. P., Bell, T. L. y Kertesz, M. A. (2019). *Appl Microbiol Biotechnol* 103: 5831. PMID 31115628
   > "partial degradation of caffeine to xanthine by P. ostreatus mycelium was observed"; "it would be necessary to consume ~ 250 kg of fresh oyster mushrooms to obtain the amount of caffeine equivalent to one cup of espresso coffee"
4. Soto, C., Martínez-Carrera, D. et al. (1987). *Rev. Mex. Mic.* 3: 133-136. https://scientiafungorum.org.mx/index.php/micologia/article/download/692/876/2252
   > "la pulpa de café fresca es un substrato eficiente para el cultivo comercial de Pleurotus … (Martínez-Carrera et al., 1984…)"; "eficiencia biológica … en pulpa de café secada al sol con dos años de almacenamiento, es mayor al 100 % … Coatepec, Veracruz"
5. Franca, A. S. y Oliveira, L. S. (2022). *Foods* 11(14): 2064. https://pmc.ncbi.nlm.nih.gov/articles/PMC9316316
   > "Current estimates place the amount of spent coffee grounds annually generated worldwide in the 6 million ton figure"

Eficiencia biológica (EB) = peso fresco de setas ÷ peso seco del sustrato × 100; por eso puede pasar de 100 %. El dibujo es esquemático.
