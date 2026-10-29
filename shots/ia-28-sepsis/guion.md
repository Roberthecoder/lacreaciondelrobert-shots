# Shot IA #28 · La IA de sepsis que no vio 2 de cada 3 casos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #28 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo, pendiente de verificación independiente. Sin animación todavía.
- **Formato:** N2 "El número" (2 de cada 3 casos sin detectar) con cierre que retoma el número.
- **Gancho (de los 7):** #4 "Un número que contradice": una IA instalada en cientos de hospitales que no vio dos de cada tres casos.
- **Duración:** voz 964 caracteres / ≈ 170 palabras (≈ 58.2 s) + cierre 3.5 s → **≈ 61.7 s** estimados (`estimar-escenas.mjs`).
- **Postura de la serie:** crítica con datos y contraste justo (hay un sistema que sí se asoció con menos muertes). El estudio
  crítico es de **2021** y se dice; no se afirma nada del modelo actual de Epic (la empresa lo ha actualizado desde entonces).

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA vigilaba pacientes en cientos de hospitales para avisar de sepsis. En una prueba, no detectó dos de cada tres casos. | Fondo cian; desde el cuadro 0 una cama de hospital con un monitor y un robotito-alarma encima ("cientos de hospitales": se multiplican camas). Número gigante "2 de cada 3" y tres siluetas de pacientes: dos se quedan sin foco de alarma. |
| 1 | Sepsis | La sepsis es cuando tu defensa contra una infección se sale de control y daña tus órganos. Tratarla pronto es clave. | Zoom a un cuerpo esquemático: bacterias → glóbulos blancos que se desbordan → órganos (pulmón, riñón, corazón) parpadean en rojo. Reloj que corre. |
| 2 | Estudio | En 2021, en la Universidad de Michigan, la probaron por fuera con casi treinta y nueve mil hospitalizaciones. | `TarjetaEstudio` "2021 · Michigan Medicine · Wong et al. · JAMA Internal Medicine"; contador hasta 38,455 hospitalizaciones. |
| 3 | Calificacion | Para separar quién tendría sepsis sacó cero punto sesenta y tres. El fabricante reportaba hasta cero punto ochenta y tres. | `Comparativa`: medidor 0.5 (azar) → 1.0 (perfecto); aguja en 0.63 ("prueba externa") contra franja 0.76–0.83 ("lo que decía el fabricante"). |
| 4 | Pregunta | ¿Y avisar de más no es mejor? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Alertas | Alertó por casi uno de cada cinco hospitalizados. Tantas alarmas cansan: se llama fatiga de alertas. | Cuadrícula de 100 camas: 18 se encienden en rojo; una enfermera esquemática tapándose los oídos; chip "fatiga de alertas". |
| 6 | Tarde | Y solo en siete de cada cien casos halló a alguien que los médicos no trataban a tiempo. | Cuadrícula de 100 pacientes con sepsis: 7 se marcan con estrella "la IA llegó primero"; el resto ya tenía médico/antibiótico o no fue detectado. |
| 7 | Contraste | Pero no toda IA falla. En 2022, otra, de Johns Hopkins, se asoció con menos muertes si un médico confirmaba su alerta antes de tres horas. | Fondo menta; tarjeta "2022 · TREWS · Johns Hopkins · Nature Medicine · 5 hospitales"; reloj "< 3 h" y médico que da "✔" a la alerta; flecha de mortalidad hacia abajo (sin cifra exagerada). |
| 8 | Leccion | La lección: una IA médica se prueba por fuera antes de creerle a quien la vende. | Una lupa sobre la caja de la IA con etiqueta "según el fabricante" → sello "probada por fuera ✔". |
| 9 | Cierre | Y una alarma que no ve dos de cada tres casos no te cuida. | **Regreso a la imagen del inicio**: la misma cama y el mismo "2 de cada 3"; las dos siluetas sin alarma se iluminan con un signo de alerta. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (zumbido de monitor); un "bip" de monitor por cada alarma; las 18 camas rojas suenan como bips encimados (fatiga); el reloj hace tic; en el contraste la cama se aclara; al final un bip limpio.

## Afirmaciones comprobables (para el verificador)

1. El Epic Sepsis Model se usaba en cientos de hospitales de EE. UU. (Wong 2021).
2. Vigilaba pacientes: calculaba el puntaje cada 15 minutos (Wong 2021).
3. En la validación externa no detectó 67 % de los pacientes con sepsis ("dos de cada tres") (Wong 2021).
4. Sepsis = respuesta extrema del sistema inmune a una infección que daña órganos; el tratamiento funciona mejor si empieza pronto (OMS).
5. Estudio de 2021, Michigan Medicine (Universidad de Michigan), validación externa, 38,455 hospitalizaciones ("casi 39 mil") (Wong 2021).
6. AUC 0.63 en la prueba externa vs 0.76–0.83 reportado por Epic en documentación interna (Wong 2021).
7. Alertó (puntaje ≥ 6) por 18 % de todos los hospitalizados ("casi uno de cada cinco"); los autores lo llaman carga de fatiga de alertas (Wong 2021).
8. Solo 7 % de los pacientes con sepsis (183 de 2,552) fueron detectados por el modelo sin haber recibido antibióticos a tiempo (Wong 2021).
9. TREWS (Johns Hopkins, Nature Medicine 2022, 5 hospitales): menor mortalidad hospitalaria asociada a confirmar la alerta dentro de 3 h (estudio de cohorte prospectivo, asociación, no ensayo aleatorizado) (Adams 2022).

## Fuentes (abiertas el 29 oct 2026)

1. Wong, A., Otles, E., Donnelly, J. P., Krumm, A., McCullough, J., DeTroyer-Cooley, O., Pestrue, J., Phillips, M., Konye, J.,
   Penoza, C., Ghous, M. y Singh, K. "External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in
   Hospitalized Patients". *JAMA Internal Medicine* 181(8): 1065–1070 (2021). DOI 10.1001/jamainternmed.2021.2626 · PMC8218233.
   Datos de diciembre 2018 a octubre 2019.
   > "The Epic Sepsis Model (ESM), a proprietary sepsis prediction model, is implemented at hundreds of US hospitals."
   > "This retrospective cohort study was conducted among 27 697 patients aged 18 years or older admitted to Michigan Medicine, the academic health system of the University of Michigan, Ann Arbor, with 38 455 hospitalizations between December 6, 2018, and October 20, 2019."
   > "The ESM score, calculated every 15 minutes."
   > "The ESM had a hospitalization-level area under the receiver operating characteristic curve of 0.63 (95% CI, 0.62-0.64)."
   > "The ESM identified 183 of 2552 patients with sepsis (7%) who did not receive timely administration of antibiotics, highlighting the low sensitivity of the ESM in comparison with contemporary clinical practice."
   > "The ESM also did not identify 1709 patients with sepsis (67%) despite generating alerts for an ESM score of 6 or higher for 6971 of all 38 455 hospitalized patients (18%), thus creating a large burden of alert fatigue."
   > (Discusión) "substantially worse than that reported by Epic Systems (AUC, 0.76-0.83) in internal documentation"
2. Organización Mundial de la Salud. "Sepsis" (hoja informativa, consultada 2026; datos globales de 2020).
   > "Sepsis is a life-threatening condition that happens when the body's immune system has an extreme response to an infection"
   > "Treatment for sepsis is most effective when started early."
3. Adams, R., Henry, K. E., Sridharan, A., Soleimani, H., Zhan, A., Rawat, N., Johnson, L., Hager, D. N., Cosgrove, S. E., …
   Saria, S. "Prospective, multi-site study of patient outcomes after implementation of the TREWS machine learning-based early
   warning system for sepsis". *Nature Medicine* 28: 1455–1460 (julio de 2022). DOI 10.1038/s41591-022-01894-0. Johns Hopkins University.
   > "In this prospective, multi-site cohort study, we examined the association between patient outcomes and provider interaction with a deployed sepsis alert system called the Targeted Real-time Early Warning System (TREWS). During the study, 590,736 patients were monitored by TREWS across five hospitals."
   > "patients in this group whose alert was confirmed by a provider within 3 h of the alert had a reduced in-hospital mortality rate (3.3%, confidence interval (CI) 1.7, 5.1%, adjusted absolute reduction, and 18.7%, CI 9.4, 27.0%, adjusted relative reduction)"

## Notas
- "Dos de cada tres" = 67 % (1,709 de 2,552 pacientes con sepsis). "Casi uno de cada cinco" = 18 % (6,971 de 38,455). "Siete de cada cien" = 7 % (183 de 2,552).
- "Cero punto sesenta y tres" es el AUC (área bajo la curva ROC): 0.5 es azar y 1.0 es perfecto. En pantalla se explica con el medidor.
- "Se asoció con" en TREWS porque es un estudio observacional (cohorte), no aleatorizado; no se da la cifra en la voz.
- La prueba de Michigan es de 2021 (datos 2018–2019); Epic ha actualizado su modelo desde entonces y no se afirma nada del actual.
- El dibujo es esquemático.
