# Shot Ambiental #47 · ¿Una pila contamina 600 mil litros de agua? De dónde salió el dato

- **Serie:** Shot Ambiental · **Logo:** química (matraz: metales y contaminación química) · **Badge:** #47 · rama `pedido300/amb`.
- **Formato:** N2 "El número" (la cifra gigante desde el cuadro 0, el mito tachado y un consejo útil) con toque de N6/mito "¿Por qué NO…?".
  Cierre que regresa a la pila y al garrafón de agua del inicio, ya transformados (la cifra tachada y la pila camino al acopio).
- **Gancho (de los 7):** #6 Mito "¿Por qué NO…?": "¿Por qué NO creerle al dato de la pila que contamina seiscientos mil litros de agua?"
- **Local:** México (LGPGIR: plan de manejo y residuo peligroso).
- **Duración:** voz 959 caracteres escritos (11 líneas) ≈ 58 s con `velocidad` 1.1 + cierre 3.5 s → **61.5 s** en la base (OM_SCENES).
- **Cuentas:** ninguna cifra calculada por nosotros. Las tres cifras de litros se citan como "lo que dicen las notas", no como dato.
  Minamata: 2020 para baterías con mercurio añadido salvo las de botón de óxido de plata y zinc-aire con < 2 % de mercurio (esas, 2025) → "casi todas".

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | ¿Por qué NO creerle al dato de la pila que contamina seiscientos mil litros de agua? | Cuadro 0: una pila AA cae en un garrafón gigante; el agua se tiñe y el contador "600,000 L" sube de golpe. Sello rojo "¿DE DÓNDE?". |
| 1 | Cifras | Búscalo: una nota dice tres mil litros, otra ciento sesenta y siete mil, otra ciento setenta y cinco mil. | Tres recortes de periódico (esquema) caen como cartas: "3,000 L", "167,000 L", "175,000 L"; los números no coinciden y tiemblan. |
| 2 | Fuente | Y no citan un estudio que puedas revisar, ni dicen cómo se midió. | Una lupa recorre los recortes: donde debería ir la fuente, un hueco con "¿estudio?" y "¿método?". |
| 3 | Mercurio | La cifra gigante se la cuelgan a las pilas de mercurio. | El "600,000 L" se pega a una pila de botón vieja con etiqueta "Hg (mercurio)". |
| 4 | Leyes | Pero en 1996 Estados Unidos prohibió vender pilas alcalinas comunes con mercurio agregado, y el Convenio de Minamata fijó 2020 para dejar de fabricar casi todas las de mercurio. | Dos sellos: "EE. UU. 1996 · alcalinas comunes sin mercurio agregado" y "Minamata · 2020"; la pila de mercurio se tacha y queda una AA alcalina de hoy. |
| 5 | Pregunta | Entonces, ¿ya la puedes tirar a la basura sin problema? | **Re-gancho.** La AA sobre un bote de basura, "?" gigante; Robert grande. |
| 6 | Estudio | En un estudio de 2009 en Tailandia, enterraron pilas usadas con basura en rellenos de prueba. | Chip "Chiang Mai, Tailandia · 2009". Corte de columnas de prueba (esquema): capas de basura con pilas, una con más pilas que otra. |
| 7 | Escurre | Entre más pilas, más manganeso y zinc salían en el líquido que escurría. | Gotas bajan por las columnas; en la de más pilas caen gotitas marcadas "Mn" y "Zn" en un vaso al fondo. |
| 8 | Litio | Y las de litio, de botón o recargables, pueden incendiarse si se dañan. | Una prensa baja y aplasta una pila de botón de litio y una recargable con etiqueta "Li-ion"; al subir, chispas y llamitas. Chip "dañadas: chispa o incendio" (sin camión de basura, para no repetir el #20). |
| 9 | Mexico | En México, la ley les pide plan de manejo, y las de mercurio o níquel-cadmio son residuo peligroso. | Mapa de México con chip "LGPGIR"; dos etiquetas: "pilas → plan de manejo" y "Hg · Ni-Cd → residuo peligroso". |
| 10 | Cierre | El número no tiene fuente clara, pero el consejo sí: no la tires, llévala a acopio. | **Regreso al garrafón del inicio:** el "600,000 L" se tacha, el agua vuelve a azul y la pila sale volando a un contenedor "ACOPIO DE PILAS". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert apuntando a cámara. |

**Música:** cama grave continua (tensa al inicio, se suelta en el cierre). Efectos: "plop" de la pila en el garrafón y conteo que sube, papeles que caen (3), lupa, sellos (2), tachón, goteo en las columnas (más rápido en la de más pilas), chispa/llamita, sello del mapa y "plop" final en el contenedor de acopio.

## Notas para la animación
- Los recortes de periódico son **esquemáticos** (sin logos ni nombres de medios reales en pantalla).
- Pila AA alcalina con morfología correcta: cilindro, polo positivo con botón, banda de color, "1.5 V". Botón: disco plano.
- Columnas de prueba = "lisímetros" del estudio; marcar "esquema".
- No mostrar camión de basura (ya salió en Shot Ambiental #20, basura electrónica).

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿ya la puedes tirar a la basura sin problema?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «seiscientos mil litros de agua» (cuadro 0) |
| 2 | 7.6 | 11.1 | 06_pensativo_menton | `izq-alto` | las cifras que no coinciden: «ciento sesenta y siete mil…» |
| 3 | 15.4 | 18.6 | 10_serio_molesto | `arriba-der` | «se la cuelgan a las pilas de mercurio» |
| 4 | 22.8 | 26.5 | 13_senalando_arriba | `izq-alto` | señala el sello «Minamata · 2020» |
| 5 | 29.2 | 32.4 | 07_pensativo_puno | `grande` | «¿ya la puedes tirar a la basura sin problema?» (grande) |
| 6 | 38.6 | 42.3 | 04_bajando_lentes | `arriba-der` | «más manganeso y zinc» |
| 7 | 47.5 | 52.6 | 12_perfil_serio | `arriba-der` | «residuo peligroso» |
| 8 | 53.5 | 57.9 | 05_sonriendo_dientes_uniformes | `izq-alto` | «llévala a acopio» |
| — | 58.0 | 61.5 | 02_apuntando_camara | cierre | `CierreMarca robert=` |

**Total:** 8 apariciones + cierre · **31.5 s** en pantalla (+ 3.5 s de cierre) · 8 poses distintas · grande una vez.

## Fuentes (abiertas el 29 oct 2026)

1. **Las cifras que circulan (ejemplos, no datos):**
   - *Opinión* (Bolivia), 18 jun 2012: https://www.opinion.com.bo/articulo/ciencia-tecnolog-iacute/sola-pila-puede-contaminar-mas-600-mil-litros-agua/20120618073300421037.html
     > "Según estudios revelan que una pila compuesta de mercurio contamina 600 mil litros de agua, una alcalina alrededor 175 mil litros, es decir más de lo que tomaría uno en toda la vida, una de carbón y zinc 3000 litros de agua."
     (No nombra estudio, autor, institución ni método.)
   - *Infobae*, 23 jun 2019: https://www.infobae.com/tendencias/ecologia-y-medio-ambiente/2019/06/23/las-pilas-y-su-efecto-en-el-medio-ambiente-la-pequena-que-lleva-un-reloj-puede-contaminar-una-pileta-olimpica/
     > "Una batería de mercurio puede contaminar 600 mil litros de agua, una alcalina unos 167 mil ... y una de óxido de plata hasta 14 mil litros."
     (Sin fuente ni método.)
   - *RPP* (Perú), 23 feb 2015: https://rpp.pe/lima/actualidad/una-pila-puede-contaminar-3000-lt-de-agua-noticia-771772
     > "Estudios de la Unión Europea señalan que una pila, que contiene 30% de mercurio, puede finalmente contaminar 3000 litros"
     (Atribución vaga: no dice qué estudio.)
   - Nota: no encontramos el estudio original de ninguna de estas cifras. La voz dice "no citan un estudio que puedas revisar" (lo comprobado en las notas), **no** dice "no existe ningún estudio".
2. **Ley de EE. UU. de 1996 — Public Law 104-142, Mercury-Containing and Rechargeable Battery Management Act** (aprobada el 13 may 1996): https://www.govinfo.gov/content/pkg/PLAW-104publ142/html/PLAW-104publ142.htm
   > Sec. 203: "No person shall sell, offer for sale, or offer for promotional purposes any alkaline-manganese battery manufactured on or after the date of enactment of this Act, with a mercury content that was intentionally introduced (as distinguished from mercury that may be incidentally present in other materials), except that the limitation on mercury content in alkaline-manganese button cells shall be 25 milligrams of mercury per button cell."
   > "Approved May 13, 1996."
3. **EPA, "Used Household Batteries"** (actualizada 21 jul 2026): https://www.epa.gov/recycle/used-household-batteries
   > "Public Law 104-142: The Mercury-Containing and Rechargeable Battery Management Act: This law was enacted to phase out the use of mercury-containing batteries and provide for the recycling of nickel cadmium, small sealed lead-acid batteries, and certain other rechargeable batteries."
   > Botón: "These small, round batteries have historically contained silver, cadmium, mercury or other heavy metals as their main component. Today, the majority are made of lithium metal." … "A lithium battery may spark and cause fires if damaged or the terminal ends touch."
   > Li-ion: "Some Li-ion batteries are not easily removed from the product and can become problematic as a fire hazard if they are broken, bent or crushed."
   > "Do not put rechargeable batteries in the trash or municipal recycling bins."
   > (Contexto, no va en la voz: "In most communities, alkaline and zinc carbon batteries can be safely put in your household trash. EPA recommendation: send used alkaline and zinc carbon batteries to battery recyclers…")
4. **Convenio de Minamata sobre el Mercurio, Anexo A** (texto y anexos, ed. oct 2024, con enmiendas MC-4/3 de 2022 y MC-5/4 de 2023): https://minamataconvention.org/sites/default/files/documents/information_document/Minamata-Convention-booklet-Oct2024-ES.pdf
   > "Productos con mercurio añadido · Fecha después de la cual no estará permitida la producción, importación ni exportación del producto (fecha de eliminación)"
   > "Baterías, salvo pilas de botón de óxido de plata con un contenido de mercurio < 2 % y pilas de botón zinc-aire con un contenido de mercurio < 2 % · 2020"
   > "Pilas de botón de óxido de plata con un contenido de mercurio < 2 % y pilas de botón zinc-aire con un contenido de mercurio < 2 % · 2025"
   (Las Partes pueden registrar exenciones (art. 6); por eso "casi todas".)
5. **Estudio: Karnchanawong S. y Limpiteeprakan P. (2009),** "Evaluation of heavy metal leaching from spent household batteries disposed in municipal solid waste", *Waste Management* 29(2):550-8, Universidad de Chiang Mai, Tailandia. doi:10.1016/j.wasman.2008.03.018 · PubMed https://pubmed.ncbi.nlm.nih.gov/18562190/
   > "Batch leaching tests and simulated landfill lysimeter tests were performed to evaluate the contents of heavy metals leached from spent batteries in the municipal solid waste."
   > "Four lysimeters were prepared with battery contents ranging from 0% to 100% by weight for column tests"
   > "The increasing amount of batteries disposed in landfills can contribute to the leaching of more metals, especially Mn and Zn, into the environment."
   > "These results indicate that the direct disposal of spent household batteries into a MSW landfill can increase the heavy metal contents in the landfill leachate."
6. **México — Ley General para la Prevención y Gestión Integral de los Residuos (LGPGIR)**, última reforma DOF 19-01-2026: https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPGIR.pdf
   > Art. 19, fr. IX (residuos de manejo especial): "Pilas que contengan litio, níquel, mercurio, cadmio, manganeso, plomo, zinc, o cualquier otro elemento que permita la generación de energía en las mismas, en los niveles que no sean considerados como residuos peligrosos en la norma oficial mexicana correspondiente;"
   > Art. 28, fr. IV (deberán formular planes de manejo): "Los grandes generadores y los productores, importadores, exportadores y distribuidores de pilas y baterías eléctricas que sean considerados como residuos de manejo especial en la norma oficial mexicana correspondiente."
   > Art. 31: "Estarán sujetos a un plan de manejo los siguientes residuos peligrosos … V. Baterías eléctricas a base de mercurio o de níquel-cadmio;"

## Notas
- "La ley les pide plan de manejo": el plan lo hacen quienes producen, importan, distribuyen o generan en grande (art. 28 IV), no cada persona.
- NOM-161-SEMARNAT-2011: no se usa en la voz; no se encontró abierto el texto del anexo con pilas.
- El estudio usó columnas de laboratorio ("lisímetros") que simulan un relleno; la voz dice "rellenos de prueba".
- No se usan cifras de cuánto mercurio tenía una pila vieja ni cuántas pilas se tiran en México (no se verificaron en fuente abierta).
- "Preferir recargables" no va en la voz: no se encontró una fuente que lo recomiende textualmente.
