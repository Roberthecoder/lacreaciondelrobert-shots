# Shot IA #28 · La IA de sepsis que no vio 2 de cada 3 casos

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #28 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (16 ✅, 1 ⚠️ corregida en Contraste), animación, Robert en pantalla, música y `publicacion.md` listos · hoja de revisión en `revision/hoja.png` · **voz pendiente de aprobación de Robert** (~959 créditos).
- **Formato:** N2 "El número" (2 de cada 3 casos sin detectar) con cierre que retoma el número.
- **Gancho (de los 7):** #4 "Un número que contradice": una IA instalada en cientos de hospitales que no vio dos de cada tres casos.
- **Duración:** voz 959 caracteres / ≈ 170 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** en la base (`estimar-escenas.mjs`).
- **Postura de la serie:** crítica con datos y contraste justo (hay un sistema que se asoció con menos muertes, aunque ese estudio lo hicieron sus propios creadores). El estudio
  crítico es de **2021** y se dice; no se afirma nada de versiones posteriores del modelo de Epic.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta IA vigilaba pacientes en cientos de hospitales para avisar de sepsis. En una prueba, no detectó dos de cada tres casos. | Fondo cian; desde el cuadro 0 una cama de hospital con su monitor (el ECG corre y la luz de alarma parpadea). Chip "IA en cientos de hospitales". Tres siluetas de pacientes: uno con campana de alarma, dos punteados con "?"; número gigante "2 de 3 · casos sin detectar". |
| 1 | Sepsis | La sepsis: tu defensa contra una infección se sale de control y daña tus órganos. Tratarla pronto es clave. | Por dentro (fondo noche): cuerpo en "rayos X"; bacterias en una herida del brazo ("infección") → glóbulos blancos que se desbordan ("tu defensa se desborda") → pulmones, corazón, hígado y riñones laten en rojo ("daña tus órganos"); chip "tratarla pronto es clave". |
| 2 | Estudio | En 2021, la Universidad de Michigan la probó por fuera con casi treinta y nueve mil hospitalizaciones. | Chip "prueba por fuera"; `TarjetaEstudio` "2021 · Universidad de Michigan · Wong et al. · JAMA Internal Medicine"; contador hasta 38,455 "hospitalizaciones revisadas" y camitas. |
| 3 | Calificacion | Para separar quién tendría sepsis sacó cero punto sesenta y tres; el fabricante decía hasta cero punto ochenta y tres. | Regla de calificación de 0.5 (azar) → 1.0 (perfecto); aguja en 0.63 ("en la prueba por fuera") contra franja 0.76–0.83 ("lo que decía el fabricante"). |
| 4 | Pregunta | ¿Y avisar de más no es mejor? | **Re-gancho.** "?" gigante; Robert grande. |
| 5 | Alertas | Alertó por casi uno de cada cinco hospitalizados. Tantas alarmas cansan: es la fatiga de alertas. | Cuadrícula de 100 camas: 18 se encienden en rojo con su foquito (chip que cuenta "18 de cada 100 hospitalizados"); luego chips "fatiga de alertas" y "tantas alarmas cansan". |
| 6 | Tarde | Y solo en siete de cada cien casos avisó de alguien sin antibióticos a tiempo. | Chips "100 casos de sepsis" y "7 sin antibiótico a tiempo"; cuadrícula de 100 pacientes: 7 se marcan con estrella (el resto se queda gris, sin etiqueta). |
| 7 | Contraste | Otra IA, de Johns Hopkins, se asoció en 2022 con menos muertes si un médico confirmaba su alerta antes de tres horas. Pero ese estudio lo hicieron sus propios creadores. | Fondo menta; tarjeta "2022 · Johns Hopkins · TREWS · Adams et al. · Nature Medicine"; reloj "< 3 h" y médico que da "✔" a la alerta; flecha hacia abajo con chip "menos muertes (asociación)" (sin cifra). En «sus propios creadores» cae sobre la tarjeta el sello rojo **"estudio de sus creadores"**. |
| 8 | Leccion | Lección: una IA médica se prueba por fuera antes de creerle a quien la vende. | El robotito de la IA con chip «según quien la vende»; una lupa lo revisa → sello "probada por fuera ✔". |
| 9 | Cierre | Y una alarma que no ve dos de cada tres casos no te cuida. | **Regreso a la imagen del inicio**: la misma cama y los mismos tres pacientes; los dos que no tenían alarma se ponen rojos con un "!"; chip "2 de cada 3, sin aviso". |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua (zumbido de monitor); un "bip" de monitor por cada alarma; las 18 camas rojas suenan como bips encimados (fatiga); el reloj hace tic; en el contraste la cama se aclara; al final un bip limpio.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Y avisar de más no es mejor?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.6 | 11_sorprendido | `gancho` | «no detectó dos de cada tres casos» (cuadro 0) |
| 2 | 9.4 | 13.6 | 10_serio_molesto | `arriba-der` | «daña tus órganos» |
| 3 | 16.8 | 19.7 | 13_senalando_arriba | `arriba-der` | señala la tarjeta del estudio / «treinta y nueve mil» |
| 4 | 24.4 | 26.9 | 11_sorprendido | `izq-alto` | «el fabricante decía hasta cero punto ochenta y tres» |
| 5 | 27.1 | 29.8 | 07_pensativo_puno | `grande` | «¿Y avisar de más no es mejor?» |
| 6 | 32.5 | 34.7 | 06_pensativo_menton | `arriba-der` | «tantas alarmas cansan» |
| 7 | 37.1 | 39.5 | 04_bajando_lentes | `arriba-der` | «solo en siete de cada cien» |
| 8 | 46.3 | 49.5 | 10_serio_molesto | `arriba-der` | «ese estudio lo hicieron sus propios creadores» |
| 9 | 50.1 | 54.2 | 13_senalando_arriba | `izq-alto` | «se prueba por fuera» |
| 10 | 54.7 | 57.9 | 06_pensativo_menton | `arriba-der` | «no te cuida» |
| — | 58.0 | 61.5 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 32.4 s (+ cierre 3.5 s) · poses distintas 6 (+ la del cierre; nunca la misma dos veces seguidas) · total 61.5 s

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
10. Ese estudio lo hicieron los propios creadores de TREWS (lo señaló el verificador; ver `verificacion.md`).

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
- "Se asoció con" en TREWS porque es un estudio observacional (cohorte), no aleatorizado; no se da la cifra en la voz. Y se dice que lo hicieron sus propios creadores (corrección del verificador: no se afirma que "no toda IA falla").
- "Siete de cada cien… sin antibióticos a tiempo" = 183 de 2,552 pacientes con sepsis que el modelo marcó y que no recibieron antibióticos a tiempo.
- La prueba de Michigan es de 2021 (datos 2018–2019); no se afirma nada de versiones posteriores del modelo.
- El dibujo es esquemático.
