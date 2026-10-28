# Shot Químico #09 · Esa espuma no es tu herida sanando (agua oxigenada y catalasa)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #09 · rama `claude/igualar-quimico` (pedido de la Sala `igualar-quimico`).
- **Formato:** N1 "Por dentro" (la rodilla raspada con espuma → la molécula y la catalasa → la misma rodilla, lavada con agua) + N5 "El experimento" (Takahara, 1948).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" (con espíritu de #6 mito de primeros auxilios): "Esa espuma no es tu herida sanando: es tu propio cuerpo rompiendo el agua oxigenada."
- **Seguridad:** no se recomienda ningún antiséptico; lo único práctico que se dice es lo que trae la fuente (agua de la llave vs. suero).
- **Duración:** voz 923 caracteres / 169 palabras (≈ 58 s) + cierre 3.5 s → **61.5 s** en la base sin voz.
- **Estado:** guion verificado (`verificacion.md`), animación lista, voz pendiente de aprobación de Robert (~923 créditos).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esa espuma no es tu herida sanando: es tu propio cuerpo rompiendo el agua oxigenada. | Fondo cian. Desde el cuadro 0 una botella café vierte un chorro sobre una rodilla raspada y brota espuma blanca. "¿está sanando?" se tacha. |
| 1 | Que | El agua oxigenada es peróxido de hidrógeno: como agua, pero con un oxígeno de más. | Una molécula de agua (H₂O) y a su lado H₂O₂ con un oxígeno extra que brilla. |
| 2 | Catalasa | Tus células, como los glóbulos rojos, traen catalasa, una enzima que la parte en agua y oxígeno. | Fondo noche: glóbulos rojos; de ellos sale la catalasa (pac-man morado) que muerde H₂O₂ y deja H₂O + O₂. |
| 3 | Burbujas | Ese oxígeno es gas: son las burbujas que ves. | Los O₂ se juntan en burbujas que suben y salen a la superficie como espuma. |
| 4 | Mito | Así que la espuma no prueba que esté curando: solo prueba que hay catalasa. | Chip "espuma = catalasa" y "espuma ≠ curación" (tachado). |
| 5 | Pregunta | ¿Y entonces sirve para las heridas? | **Re-gancho.** "?" gigante; Robert grande pensativo. |
| 6 | Estudio | En 1985, un estudio la puso al 3 por ciento sobre fibroblastos humanos en cultivo, células que ayudan a reparar la piel: murieron todos. | Tarjeta "1985 · Lineaweaver et al. · fibroblastos en cultivo"; caja de Petri con células que se apagan; "100 %". |
| 7 | Revision | Una revisión de 2026 la desaconseja en heridas de cirugía de piel, y en 12 ensayos, lavar con agua de la llave no dio más infecciones que con suero. | Botella café con ✗ "2026"; luego dos barras iguales "agua de la llave" y "suero" con "12 ensayos". |
| 8 | Takahara | Lo curioso: en 1948, el médico japonés Takahara la puso en la llaga de un paciente, no hizo espuma, y así descubrió personas sin catalasa. | Tarjeta "1948 · Takahara · Japón"; una boca con una llaga, gotero, y nada de espuma; chip "acatalasemia". |
| 9 | Cierre | Así que esa espuma no es tu herida sanando: es química de tu propio cuerpo. | **Regreso a la rodilla del inicio**: la espuma, ahora con la etiqueta "catalasa + H₂O₂ → agua + oxígeno". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave continua; efectos en el mismo cuadro (chorro, burbujeo, mordida de la enzima, "pop" de burbujas, golpe de la tarjeta, células que se apagan, gotero, silencio cuando no hay espuma).

## Robert en pantalla

Tiempos de la base sin voz (atados a cada escena). Grande en «¿Y entonces sirve para las heridas?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 5.0 | 11_sorprendido | `gancho` | «no es tu herida sanando» |
| 2 | 6.5 | 10.2 | 13_senalando_arriba | `izq-alto` | «con un oxígeno de más» |
| 3 | 12.0 | 16.4 | 06_pensativo_menton | `arriba-der` | «catalasa… la parte en agua y oxígeno» |
| 4 | 19.9 | 24.2 | 05_sonriendo_dientes_uniformes | `izq-alto` | «solo prueba que hay catalasa» |
| 5 | 24.5 | 27.6 | 07_pensativo_puno | `grande` | «¿Y entonces sirve para las heridas?» |
| 6 | 27.8 | 35.0 | 10_serio_molesto | `izq-alto` | «murieron todos» |
| 7 | 36.5 | 44.3 | 04_bajando_lentes | `arriba-der` | «agua de la llave… suero» |
| 8 | 45.5 | 52.9 | 11_sorprendido | `izq-alto` | «no hizo espuma» |
| 9 | 53.5 | 57.9 | 02_apuntando_camara | `arriba-der` | «química de tu propio cuerpo» |
| — | 58.0 | 61.5 | 13_senalando_arriba | CierreMarca | tarjeta de cierre |

**Total:** 9 apariciones · ≈ 46 s en pantalla (+ cierre 3.5 s) · 8 poses distintas · nunca la misma dos veces seguidas.

## Fuentes (cada dato y cifra se abrió en la fuente original el 28 oct 2026)

1. **Catalasa: rompe el peróxido de hidrógeno en agua y oxígeno; está en los glóbulos rojos; Takahara 1948** — Nandi A., Yan L.-J., Jana C.K., Das N. "Role of Catalase in Oxidative Stress- and Age-Associated Degenerative Diseases." *Oxid Med Cell Longev* (2019). PMID 31827713 · PMC6885225.
   > "destroying cellular hydrogen peroxide to produce water and oxygen" · "the level of catalase in the red blood cells" · "In 1948, Takahara, a Japanese otolaryngologist, first reported this disorder … His ex vivo experiments consisted of filling the mouth ulcer of a diseased patient with hydrogen peroxide. Since no bubble formation was observed, he concluded that a catalase or its enzymatic activity is absent in the saliva of the patients."
2. **1985: al 3 %, mató al 100 % de los fibroblastos en cultivo** — Lineaweaver W., McMorris S., Soucy D., Howard R. "Cellular and bacterial toxicities of topical antimicrobials." *Plast Reconstr Surg* 75(3):394–6 (1985). PMID 3975287. (Y su par: *Arch Surg* 120(3):267–70, 1985, PMID 3970664.)
   > "Cellular and bacterial toxicities of four commonly used topical antimicrobials (1% povidone-iodine, 3% hydrogen peroxide, 0.25% acetic acid, and 0.5% sodium hypochlorite) were assayed in vitro using cultures of human fibroblasts" · "All agents tested at full strength killed 100 percent of exposed fibroblasts."
3. **2026: se desaconseja en heridas de cirugía de piel** — Hengy M., Jeha G.M., Nadir U., Tolkachjov S.N. "Postoperative Wound Care in Mohs Micrographic Surgery: Tradition, Variation, and the Evidence." *Int J Dermatol* (2026). PMID 42873063.
   > "Evidence discourages cytotoxic antiseptics such as hydrogen peroxide and Dakin's solution."
4. **12 ensayos: agua de la llave igual que suero** — Shih P.R. et al. "Choosing Wisely: Evidence-Based Support for the Efficacy and Safety of Tap Water Versus Normal Saline for Wound Cleansing." *World J Surg* (2025). PMID 40890906.
   > "This study reviewed 12 trials involving 3330 patients with 3352 wounds. The risk of wound infection did not differ significantly between the tap water and normal saline groups"
5. **Fibroblastos y reparación de la piel** — Wasserbauer S. et al. *Dermatol Surg* 34(6) (2008). PMID 18318724.
   > "induction of fibroblast proliferation, and collagen" (efectos en la cicatrización) · "negative effects, such as cytotoxicity, inhibition of keratinocyte migration"

## Notas
- El dibujo es esquemático (la catalasa como "pac-man", las células y la boca).
- Matiz que no cabe en la voz y va en la descripción: en el mismo trabajo de 1985 (Arch Surg), el agua oxigenada no empeoró la cicatrización en un modelo animal; lo de "murieron todos" es en cultivo, y la voz lo dice así.
- El agua de la llave de los ensayos era potable; en la descripción se aclara.
