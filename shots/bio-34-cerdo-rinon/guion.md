# Shot Biotecnológico #34 · El riñón de cerdo que fue un puente (xenotrasplante)

- **Serie:** Shot Biotecnológico · **Numeración:** #34 · **Tema del logo:** bioquímica (ADN + matraz).
- **Formato:** N1 "Por dentro" (el riñón dentro del cuerpo y, con la `Lupa`, la célula del cerdo por dentro) + N4 "La imagen que se llena"
  (un contador de 69 casillas que se llena: 3 + 7 + 59).
- **Gancho (de los 7 aprobados):** #1 "Esto no es X: es Y", sobre el riñón que se ve en pantalla, hablándole a "tú".
- **Duración:** 61.5 s (voz ~58 s + cierre 3.5 s). Solo narrado (sin gemelo mudo).
- **Viaje:** macro (un riñón en una charola de trasplante, junto a la silueta de un cerdo) → micro (fondo oscuro: la superficie de la célula
  con sus azúcares, el ADN con los genes humanos y los virus dormidos) → el mismo riñón, ahora dentro de una persona, que se vuelve un puente
  hacia un riñón humano.

## Versión narrada (952 caracteres, ~58 s de voz)

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese riñón no es de una persona: es de un cerdo, con 69 cambios en su ADN. | Fondo rosa. **Desde el cuadro 0** una charola de trasplante con un riñón que late suave (brillo) y, detrás, la silueta de un cerdito miniatura Yucatán que mueve la cola. Chip "69 cambios en su ADN". |
| 1 | Espera | En México, más de dieciséis mil personas esperan un riñón, según el CENATRA en 2026. | Fondo amarillo: `NumeroGigante` "16,041" que cuenta hacia arriba y una cuadrícula de siluetas de personas que se llena (N4). Chip "personas en espera de riñón · CENATRA · corte 3 oct 2026". |
| 2 | Rechazo | A un riñón de cerdo normal, tu cuerpo lo destruye en minutos u horas. | Un riñón de cerdo sin editar entra a una silueta humana; se pone morado y se oscurece. Reloj que corre "minutos… horas". |
| 3 | Azucares | Sus células llevan tres azúcares que tus anticuerpos atacan como enemigos. | **Lupa** "AL MICROSCOPIO · CÉLULA DE CERDO" (fondo oscuro): la superficie de la célula con 3 tipos de azúcares (α-Gal, Neu5Gc, Sd(a)) como banderitas; anticuerpos en forma de Y se pegan a ellas. |
| 4 | Borrar | Con CRISPR le borraron los tres genes de esos azúcares. | Hélice de ADN: unas tijeras (Cas9) cortan 3 tramos marcados *GGTA1*, *CMAH*, *B4GALNT2*; las banderitas desaparecen y los anticuerpos se quedan sin dónde pegarse. Contador 69: se llenan **3** casillas. |
| 5 | Pregunta | ¿Y eso basta para que tu cuerpo lo acepte? | **Re-gancho.** La célula limpia; un signo de pregunta grande. Barra de escala (~10 µm). |
| 6 | Humanos | No: le pusieron siete genes humanos que calman el ataque de tus defensas, la inflamación y los coágulos. | Entra un paquete de 7 genes con bandera humana al ADN; en la superficie aparecen 7 "escudos" (proteínas humanas). Contador: +**7** casillas (van 10). |
| 7 | Virus | Y apagaron 59 copias de virus dormidos en su ADN. | Por toda la hélice, 59 capsulitas (retrovirus endógenos del cerdo) que se apagan una por una con un candado. Contador: +**59** → **69** completo. |
| 8 | Slayman | En 2024, Richard Slayman fue el primer paciente vivo en recibir uno; murió casi dos meses después, por su corazón, no por el riñón. | Salimos de la Lupa. `TarjetaEstudio` "marzo 2024 · Boston · primer riñón de cerdo editado en una persona viva". Una línea de tiempo corta de ~2 meses. |
| 9 | Andrews | En enero de 2025, en Boston, Tim Andrews recibió otro. | `TarjetaEstudio` "25 ene 2025 · Hospital General de Massachusetts". Silueta de un hombre con el riñón (Lupa "POR DENTRO · ABDOMEN") en el lado. |
| 10 | Dias | Vivió 271 días sin diálisis, hasta que el riñón empezó a fallar. | Calendario que corre de 0 a 271; la máquina de diálisis, apagada (tachada), a un lado. Chip "25 ene → 23 oct 2025". Al final el riñón pierde brillo ("empezó a fallar"). |
| 11 | Puente | Y en enero de 2026 recibió un riñón humano: el de cerdo fue su puente. | Un puente se dibuja de la máquina de diálisis al riñón humano; chip "2025 · la FDA autorizó los primeros ensayos clínicos". |
| 12 | Cierre | Por eso ese riñón no es de una persona: es un puente para quien espera. | **Regreso a la charola del inicio**: el mismo riñón, ahora con el contador 69 completo y el puente detrás; las siluetas de la cuadrícula de espera. |
| — | Outro | (sin voz) | Cierre de marca (`CierreMarca tema="bioquimica"`). |

## Música y sonido (sin costo, `gen-audio.mjs`)
- **Cama grave continua**, sin golpe, siempre debajo de la voz; se aprieta (filtro cerrado) mientras dura el rechazo y se abre al final con el puente.
- **Datos hechos sonido:** el contador de 69 casillas suena **una nota por edición**: 3 graves (genes borrados), 7 medias (genes humanos) y 59 clics
  rápidos y suaves (virus apagados), 69 en total.
- **Efectos en el mismo cuadro:** latido suave del riñón (gancho y cierre), "tic" por cada persona de la cuadrícula, chasquido de tijeras (Cas9),
  candado por virus, sello de las tarjetas, calendario que pasa hojas, la máquina de diálisis que se apaga.

## Descripción (para publicar)
"Ese riñón no es de una persona: es de un cerdo. 🐷🫘

En México, **16,041 personas** esperaban un riñón al 3 de octubre de 2026 (CENATRA). Los órganos humanos no alcanzan, y por eso se investiga el
**xenotrasplante**: usar órganos de cerdo. El problema es que un riñón de cerdo normal tu cuerpo lo rechaza en **minutos u horas**: tus anticuerpos
ya vienen listos contra **tres azúcares** que las células del cerdo tienen en su superficie.

La empresa eGenesis hizo un cerdo miniatura Yucatán con **69 cambios en su ADN**: con CRISPR **borró los 3 genes** que fabrican esos azúcares,
**agregó 7 genes humanos** que ayudan a controlar la inflamación, el sistema del complemento y la coagulación, y **apagó las 59 copias** de unos
retrovirus que el cerdo trae dormidos en su genoma, por seguridad.

En **marzo de 2024**, en el Hospital General de Massachusetts (Boston), **Richard Slayman** fue la primera persona viva en recibir un riñón de cerdo
editado; murió casi dos meses después por causas del corazón, sin relación con el trasplante, según sus médicos. En **enero de 2025**, **Tim Andrews**
recibió otro en el mismo hospital: vivió **271 días sin diálisis** hasta que el riñón empezó a fallar y se lo quitaron. En **enero de 2026** recibió
un riñón humano de donante: el de cerdo le sirvió de **puente**. En **2025** la FDA de Estados Unidos autorizó los primeros ensayos clínicos con
riñones de cerdo editados (de United Therapeutics y de eGenesis). Todavía es experimental.

El dibujo es esquemático. **¿Tú aceptarías un riñón de cerdo si estuvieras en la lista de espera? 👇**

Soy Robert, de La Creación del Robert 🌱"

## Fuentes (frases textuales y año del dato)
1. **Anand RP et al. (2023).** *Design and testing of a humanized porcine donor for xenotransplantation.* Nature 622:393–401.
   https://pubmed.ncbi.nlm.nih.gov/37821590/ · texto completo PMC10567564 (https://pmc.ncbi.nlm.nih.gov/articles/PMC10567564/)
   - "The porcine donor was engineered to carry 69 genomic edits, eliminating glycan antigens, overexpressing human transgenes and inactivating
     porcine endogenous retroviruses." (2023)
   - "…three glycan synthesis genes (eight alleles…) (3KO), had a transgenic construct (… PL15S) inserted hemizygously into the AAVS1 site … (7TG),
     and inactivated the PERV elements (59 copies) (RI)…" (2023)
   - "3KO, three knockout (GGTA1, CMAH and B4GALNT2/B4GALNT2L); 7TG, seven human transgenes (CD46, CD55, THBD, PROCR, CD47, TNFAIP3 and HMOX1)" (2023)
   - Cerdo: "Yucatan miniature pig breed". (2023)
2. **Mass General Brigham (21 mar 2024).** *World's First Genetically-Edited Pig Kidney Transplant into Living Recipient.*
   https://news.massgeneralbrigham.org/en/worlds-first-genetically-edited-pig-kidney-transplant-into-living-recipient
   - "a genetically-edited pig kidney with 69 genomic edits was successfully transplanted into a living patient." · "a 62-year-old man living with
     end-stage kidney disease" · cirugía "Saturday, March 16". · "scientists inactivated porcine endogenous retroviruses in the pig donor…" (2024)
3. **Muerte de Slayman (anunciada el sábado 11 may 2024).** CBS News: https://www.cbsnews.com/news/massachusetts-general-hospital-pig-kidney-rick-slayman — el hospital:
   "We have no indication that it was the result of his recent transplant" (2024). Mass General Brigham / *The Lancet* (2026), vía Medical Xpress
   (https://medicalxpress.com/news/2026-09-pig-kidney-xenotransplant-successfully-bridges.html): "with the patient surviving 52 days before death
   from cardiac causes unrelated to the transplant" (2026). (Nota: 52 días según The Lancet 2026; la voz dice "casi dos meses", sin cifra exacta.)
4. **eGenesis (8 sep 2025).** *eGenesis Announces IND Clearance for EGEN-2784…*
   https://egenesisbio.com/press-releases/egenesis-announces-ind-clearance-for-egen-2784-in-kidney-transplant-and-landmark-patient-updates-in-ongoing-expanded-access-study/
   - "Elimination of three glycan antigens to prevent hyperacute immune rejection" · "Insertion of seven human transgenes to regulate immune
     response" · "Inactivation of endogenous retroviruses within the porcine genome to enhance safety." (2025)
   - "Tim Andrews, 67, who received an EGEN-2784 kidney on January 25, 2025, at Massachusetts General Hospital" · ensayo "Phase 1/2/3". (2025)
5. **Harvard Medical School (3 sep 2026).** *Patient Who Received Pig Kidney Becomes First To Progress to Human Kidney Transplant.*
   https://hms.harvard.edu/news/patient-who-received-pig-kidney-becomes-first-progress-human-kidney-transplant
   - "received a genetically edited pig kidney in January 2025" · "for 271 days — during which he did not need dialysis" · en enero de 2026
     "became the recipient of a donated human kidney" · "a deceased-donor human kidney, with immediate graft function". (2026)
6. **Retiro del riñón de Andrews (23 oct 2025).** WBUR: https://www.wbur.org/news/2025/10/28/tim-andrews-pig-kidney-removed-dialysis ·
   CBS Boston: https://www.cbsnews.com/boston/news/pig-kidney-transplant-removed — retirado el 23 de octubre de 2025 porque su función estaba
   disminuyendo; volvió a diálisis tras 271 días. (2025)
7. **CENATRA (2026).** *Estado actual de Receptores, Donación y Trasplantes en México, 3er. trimestre 2026* (SIRNT, fecha de corte 3 de octubre
   de 2026). https://www.gob.mx/cms/uploads/attachment/file/1108160/3er_TRIMESTRE.pdf (desde https://www.gob.mx/cenatra/documentos/estadisticas-50060)
   - "RECEPTORES EN ESPERA, 3ER. TRIMESTRE 2026 … RIÑÓN 16,041 … Total 18,086". (2026)
8. **Zhou Q et al. (2022).** *Current status of xenotransplantation research and the strategies for preventing xenograft rejection.*
   Front. Immunol. 13:928173. https://www.frontiersin.org/articles/10.3389/fimmu.2022.928173
   - "Hyperacute rejection occurs within minutes to hours and is caused by the binding of the host's pre-existing antibodies" · "the
     pre-existing anti-Gal antibodies bind to α-Gal epitopes present on the graft's vascular endothelium". (2022)
9. **FDA, ensayos clínicos (2025).** United Therapeutics, 3 feb 2025: *Announces FDA Clearance of its Investigational New Drug Application for the
   UKidney Xenotransplantation Clinical Trial* (https://www.businesswire.com/news/home/20250203431557/en/) — riñón de cerdo con 10 ediciones;
   primer trasplante del ensayo EXPAND en NYU Langone el 3 nov 2025
   (https://nyulangone.org/news/first-gene-edited-pig-kidney-transplant-clinical-trial-begins-nyu-langone-health). eGenesis, 8 sep 2025 (fuente 4).

**No se usa:** Towana Looney (NYU, nov 2024, 130 días): su riñón era de otra empresa (United Therapeutics/Revivicor, 10 ediciones), no de los
69 cambios de eGenesis; meterlo confundiría. Tampoco se dice "récord" de Andrews: Bill Stewart (MGH, 14 jun 2025, eGenesis) podría haberlo
superado y no hay dato público de 2026 sobre su estado.

## Robert en pantalla

Es la marca del canal. Entra desde el cuadro 0 y vuelve cada 8–10 s; nunca tapa el subtítulo, los datos ni las etiquetas (revisado en la hoja de contactos).
Tiempos calculados con las escenas de `Shot Xeno base narrada.dc.html` (61.5 s).

### Versión narrada: 9 apariciones, **36,9 s en pantalla** (de 61,5 s), 7 poses distintas

| Segundos | Pose | Lado | Reacciona a |
|---|---|---|---|
| 0,0 - 4,4 | sorprendido (11) | gancho | «no es de una persona: es de un cerdo» |
| 5,0 - 9,3 | serio (10) | bajo-der | más de 16 mil esperan un riñón |
| 10,2 - 13,7 | bajando lentes (04) | arriba-der | «tu cuerpo lo destruye» |
| 22,1 - 24,6 | pensativo (06) | **grande** | re-gancho: «¿eso basta?» |
| 26,5 - 30,8 | señalando (13) | arriba-der | señala los 7 genes humanos |
| 34,9 - 41,6 | serio (10) | arriba-der | Slayman, 2024: primer paciente vivo |
| 45,7 - 49,1 | sorprendido (11) | izq-alto | «271 días sin diálisis» |
| 49,6 - 53,4 | sonriendo (05) | izq-alto | «el de cerdo fue su puente» |
| 53,9 - 57,9 | apuntando (02) | gancho | cierre: «un puente para quien espera» |

Cierre: `CierreMarca` con Robert señalando (13) junto al logo (58,0–61,5 s).
