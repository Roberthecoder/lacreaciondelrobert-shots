# Verificación de hechos · Shot IA #28 · La IA de sepsis que no vio 2 de cada 3 casos

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion). Fuentes abiertas directamente: PMC8218233 (Wong 2021, texto completo),
  PubMed 35864252 (Adams 2022), hoja informativa de la OMS sobre sepsis; preprint medRxiv de TREWS para conflictos de interés.

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | La IA (Epic Sepsis Model) "vigilaba pacientes en cientos de hospitales" (de EE. UU.) | ✅ | Wong et al., *JAMA Intern Med* 181(8):1065–1070, PMC8218233 | "is implemented at hundreds of US hospitals" | 2021 |
| 2 | "Vigilaba" pacientes de forma continua (puntaje recalculado) | ✅ | Wong 2021 | "The ESM score, calculated every 15 minutes" | 2021 (datos 2018–2019) |
| 3 | "En una prueba, no detectó dos de cada tres casos" / "2 de cada 3" en pantalla | ✅ | Wong 2021 | "The ESM also did not identify 1709 patients with sepsis (67%)" (1,709 de 2,552; umbral de alerta ≥ 6, elegido por el hospital dentro del rango 5–8 recomendado por el fabricante) | 2021 |
| 4 | Sepsis = la defensa contra una infección se sale de control y daña órganos | ✅ | OMS, hoja informativa "Sepsis" | "the body's immune system has an extreme response to an infection" / "causes damage to its own tissues and organs" | consultada 2026 |
| 5 | "Tratarla pronto es clave" | ✅ | OMS | "Treatment for sepsis is most effective when started early." | consultada 2026 |
| 6 | Estudio de 2021, Universidad de Michigan (Michigan Medicine) | ✅ | Wong 2021 | "admitted to Michigan Medicine, the academic health system of the University of Michigan, Ann Arbor" | 2021 |
| 7 | "La probaron por fuera" (validación externa, independiente del fabricante) | ✅ | Wong 2021 | "an independently conducted external validation of the ESM using data from a large academic medical center" | 2021 |
| 8 | "Casi treinta y nueve mil hospitalizaciones" / contador 38,455 en pantalla | ✅ | Wong 2021 | "with 38 455 hospitalizations between December 6, 2018, and October 20, 2019" | 2021 |
| 9 | Calificación 0.63 para separar quién tendría sepsis (AUC); medidor 0.5 = azar, 1.0 = perfecto | ✅ | Wong 2021 | "hospitalization-level area under the receiver operating characteristic curve of 0.63 (95% CI, 0.62-0.64)" (0.5 = azar es la definición estándar del AUC) | 2021 |
| 10 | "El fabricante reportaba hasta 0.83" / franja 0.76–0.83 "lo que decía el fabricante" | ✅ | Wong 2021 (Discusión) | "substantially worse than that reported by Epic Systems (AUC, 0.76-0.83) in internal documentation" | 2021 |
| 11 | "Alertó por casi uno de cada cinco hospitalizados" / 18 de 100 camas en rojo | ✅ | Wong 2021 | "generating alerts for an ESM score of 6 or higher for 6971 of all 38 455 hospitalized patients (18%)" | 2021 |
| 12 | "Tantas alarmas cansan: se llama fatiga de alertas" | ✅ | Wong 2021 | "thus creating a large burden of alert fatigue" | 2021 |
| 13 | "Solo en siete de cada cien casos halló a alguien que los médicos no trataban a tiempo" / 7 de 100 con estrella | ✅ | Wong 2021 | "183 (7%) were identified by an ESM score of 6 or higher, but the patient did not receive timely antibiotics (ie, prior to or within 3 hours after sepsis)"; resumen: "183 of 2552 patients with sepsis (7%)" | 2021 |
| 14 | En 2022, otra IA de Johns Hopkins (TREWS); tarjeta "Nature Medicine · 5 hospitales" | ✅ | Adams et al., *Nat Med* 28:1455–1460 (jul 2022), PubMed 35864252 | "590,736 patients were monitored by TREWS across five hospitals"; autores de Johns Hopkins (y de Bayesian Health) | 2022 |
| 15 | TREWS "se asoció con menos muertes si un médico confirmaba su alerta antes de tres horas" | ✅ | Adams 2022 | "patients in this group whose alert was confirmed by a provider within 3 h of the alert had a reduced in-hospital mortality rate" (cohorte prospectiva, no aleatorizada: "se asoció" es correcto) | 2022 |
| 16 | "Pero no toda IA falla" + lección "una IA médica se prueba por fuera antes de creerle a quien la vende" usando TREWS como el contraejemplo | ⚠️ | medRxiv (preprint TREWS), declaración de intereses; comentario PulmCCM | "Dr. Henry, Dr. Saria, and Johns Hopkins University are entitled to revenue distributions" (licencia con Bayesian Health, que vende TREWS; la universidad tiene acciones). El estudio de TREWS lo hicieron sus propios creadores: no es una "prueba por fuera". Usarlo como ejemplo de IA que "no falla" justo antes de la lección contradice la lección y exagera (es asociación, no prueba de que funcione). | 2022 |
| 17 | Postura: no se afirma nada del modelo actual de Epic; datos de hace más de 2 años dichos con año ("En 2021", "En 2022") | ✅ | — | Ambos años se dicen en voz y en tarjeta. No se encontró dato más nuevo que contradiga la cifra de 2021 sobre esa versión del modelo. | — |

## Correcciones necesarias

1. **#16 (escena 7 "Contraste") ⚠️ — exageración y choque con la lección.** El estudio de TREWS no es independiente (autores con
   interés económico en la empresa que lo vende) y solo muestra asociación. Propuestas (elegir una):
   - Voz: "Otra IA, de Johns Hopkins, se asoció en 2022 con menos muertes si un médico confirmaba su alerta antes de tres horas. Pero ese estudio lo hicieron sus propios creadores."
     y la lección se mantiene ("…se prueba por fuera antes de creerle a quien la vende"), que ahora queda reforzada.
   - O más corta: "En 2022, otra, de Johns Hopkins, se asoció con menos muertes si un médico confirmaba su alerta a tiempo; falta que la prueben por fuera."
   - Quitar "Pero no toda IA falla" (es opinión no demostrada). En pantalla, añadir a la tarjeta de TREWS un chip pequeño "estudio de sus creadores".
   Ajustar el conteo de palabras para seguir en 61–62 s.

Sin ❌. Todas las cifras (67 %, 38,455, 0.63, 0.76–0.83, 18 %, 7 %, 5 hospitales, 3 h) coinciden con la fuente original abierta.

## Re-verificación (29 oct 2026, mismo verificador independiente)

Revisé solo lo nuevo: `narracion.json`, textos en pantalla de `sepsis.jsx` y `publicacion.md`.

| # | Afirmación nueva o recortada | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R1 | Sepsis (recorte): "La sepsis: tu defensa contra una infección se sale de control y daña tus órganos. Tratarla pronto es clave." | ✅ | OMS, "Sepsis" | "extreme response to an infection" / "causes damage to its own tissues and organs" / "most effective when started early" | consultada 2026 |
| R2 | Estudio: "En 2021, la Universidad de Michigan la probó por fuera con casi treinta y nueve mil hospitalizaciones"; tarjeta "2021 · Universidad de Michigan · Wong et al. · JAMA Internal Medicine"; chip "prueba por fuera" | ✅ | Wong 2021, PMC8218233 | "an independently conducted external validation" / "38 455 hospitalizations" | 2021 |
| R3 | Calificación: "sacó 0.63; el fabricante decía hasta 0.83"; subtítulo "Sacó 0.63. Decían 0.83" | ✅ | Wong 2021 | "0.63 (95% CI, 0.62-0.64)" / "reported by Epic Systems (AUC, 0.76-0.83) in internal documentation" | 2021 |
| R4 | Alertas: "casi uno de cada cinco hospitalizados… es la fatiga de alertas"; chips "18 de cada 100 hospitalizados", "fatiga de alertas" | ✅ | Wong 2021 | "6971 of all 38 455 hospitalized patients (18%), thus creating a large burden of alert fatigue" | 2021 |
| R5 | Tarde: "solo en siete de cada cien casos avisó de alguien sin antibióticos a tiempo"; chips "100 casos de sepsis", "7 sin antibiótico a tiempo" | ✅ | Wong 2021 | "183 (7%) were identified by an ESM score of 6 or higher, but the patient did not receive timely antibiotics (ie, prior to or within 3 hours after sepsis)" | 2021 |
| R6 | Contraste corregido: "Otra IA, de Johns Hopkins, se asoció en 2022 con menos muertes si un médico confirmaba su alerta antes de tres horas"; tarjeta "2022 · Johns Hopkins · TREWS · Adams et al. · Nature Medicine"; chip "menos muertes (asociación)" | ✅ | Adams et al., *Nat Med* 28:1455–1460, PubMed 35864252 | "prospective, multi-site cohort study… examined the association" / "confirmed by a provider within 3 h of the alert had a reduced in-hospital mortality rate" | 2022 |
| R7 | "Pero ese estudio lo hicieron sus propios creadores"; sello "estudio de sus creadores" | ✅ | PubMed 35864252 (última autora Suchi Saria, afiliación Johns Hopkins y Bayesian Health); HealthDay sobre ese mismo artículo; preprint medRxiv del equipo | HealthDay: "Several authors disclosed financial ties to Bayesian Health and Basilea." Preprint: Henry, Saria y Johns Hopkins "are entitled to revenue distributions" (licencia de TREWS a Bayesian Health) | 2022 |
| R8 | Lección (recorte): "una IA médica se prueba por fuera antes de creerle a quien la vende"; chip "«según quien la vende»", sello "probada por fuera ✔" | ✅ | Recomendación, no dato; ahora es coherente con R7 | — | — |
| R9 | publicacion.md: el modelo "calcula un puntaje cada 15 minutos" | ✅ | Wong 2021 | "The ESM score, calculated every 15 minutes" | 2021 |
| R10 | publicacion.md: "Andrew Wong, Karandeep Singh y su equipo" (Singh, último autor) | ✅ | PubMed 34152373 | Autores: Andrew Wong (1.º) … Karandeep Singh (12.º, último) | 2021 |
| R11 | publicacion.md: resto de cifras (27,697 pacientes; 1,709 de 2,552 = 67 %; 6,971 de 38,455 = 18 %; 183 = 7 %; cinco hospitales; < 3 h; "asociación, no ensayo al azar") | ✅ | Wong 2021; Adams 2022 | Coinciden con las frases textuales de arriba | 2021 / 2022 |

La corrección pedida (fila 16) quedó aplicada: ya no dice "no toda IA falla" y deja claro que el estudio de TREWS es de sus creadores y solo muestra asociación. No quedan ❌ ni ⚠️.

VEREDICTO: APROBADO
