# Verificación de hechos · Shot IA #30 · Tu teclado aprende de ti sin llevarse lo que escribes

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion).
- Fuentes abiertas y leídas completas: PDF de Hard et al. (arXiv:1811.03604v2, convertido a texto), blog de Google Research (6 abr 2017), página de Apple ML Research (6 dic 2017), PDF de Zhu, Liu y Han (arXiv:1906.08935v2) y su ficha en las actas de NeurIPS 2019. Para revisar si hay datos más nuevos: Google Research, "Advances in private training for production on-device language models" (21 feb 2024) y Xu et al., "Federated Learning of Gboard Language Models with Differential Privacy" (ACL 2023, arXiv:2305.18465).

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | Gancho: «Tu teclado no manda lo que escribes: manda lo que aprendió de ti.» (presentado como algo general de cualquier teclado) | ⚠️ generaliza de más | Hard et al., arXiv:1811.03604 §5.1 y §5.2; blog de Google 2017 | El estudio es solo de **Gboard** y solo de su entrenamiento federado. En el mismo paper, el modelo de comparación "relies on data logged from Gboard users who have opted to share snippets of text while typing in Google apps", o sea que Gboard sí subía fragmentos de texto de quien lo aceptaba. Además solo participan celulares que cumplen requisitos ("at least 2 gigabytes of memory", "charging, connected to an un-metered network, and idle"). No se puede decir de "tu teclado" en general (otros teclados y otras funciones pueden mandar texto). | 2018 |
| 2 | «Escribes "te quiero" y te sugiere "mucho"» (ejemplo) | ✅ (ilustrativo) | Hard et al., Fig. 1 | "Based on the context "I love you", the keyboard predicts "and", "too", and "so much"." Es una adaptación; conviene que en pantalla diga "ejemplo". | 2018 |
| 3 | «La calcula un modelo dentro de tu celular» | ✅ (para Gboard) | Hard et al., §1 | "On-device inference is supported by TensorFlow Lite." | 2018 |
| 4 | «Cuando está cargando, sin usarse y con wifi, tu celular entrena ese modelo» | ✅ | Hard et al., §5.2; blog Google | "only allowed to participate if they are charging, connected to an un-metered network, and idle." · "training happens only when the device is idle, plugged in, and on a free wireless connection" | 2018 / 2017 |
| 5 | «…con lo que escribiste» | ✅ | Hard et al., §5.2 | "each client cache stores text belonging to the device owner" | 2018 |
| 6 | «Resume el cambio en una actualización chiquita y cifrada» | ✅ | Blog Google (McMahan y Ramage) | "summarizes the changes as a small focused update." · "Only this update to the model is sent to the cloud, using encrypted communication" (el cifrado lo dice el blog de 2017, no el paper de 2018). | 2017 |
| 7 | «Tus frases no salen» (en este método) | ✅ | Blog Google; Hard et al. §4 | "All the training data remains on your device" · "uploaded content is limited to model weights." | 2017 / 2018 |
| 8 | «El servidor junta las de cientos de celulares» | ✅ | Hard et al., §5.2 | "Between 100 and 500 client updates are required to close each round of federated training in Gboard." | 2018 |
| 9 | «…las promedia y les regresa un modelo mejor» | ✅ | Hard et al., §4 y Fig. 2; blog Google | "The FederatedAveraging algorithm … is used on the server to combine client updates and produce a new global model" · "(C) the new model is sent back to clients" · "immediately averaged with other user updates to improve the shared model." | 2018 / 2017 |
| 10 | «Google lo probó en 2018 con Gboard» | ✅ | Hard et al., arXiv v1 8 nov 2018 | "next-word prediction in a virtual keyboard for smartphones" (Gboard) | 2018 |
| 11 | «un millón y medio de celulares y seiscientos millones de frases» (pantalla: 1.5 millones de celulares / 600 millones de frases) | ✅ | Hard et al., §5.2 | "600 million sentences are processed by 1.5 million clients. Training typically takes 4-5 days." (Es el total del entrenamiento, no de una ronda; el guion lo usa bien.) | 2018 |
| 12 | «El modelo federado atinó igual o un poco más que uno entrenado con textos guardados en sus servidores» | ✅ | Hard et al., Tablas 3–5 y §6 | "Comparisons on server-hosted logs data show the recall of the two models is comparable" · "the federated CIFG improves the top-1 recall by a relative 5% (0.8% absolute)" · "improves the top-1 and top-3 prediction impression recall by 1% relative to the server CIFG for real Gboard users." | 2018 |
| 13 | Pantalla: servidor 16.5 % vs. federado 16.4 % (textos del servidor); 15.0 % vs. 15.8 % (textos del celular), "aciertos de la primera sugerencia" | ✅ | Hard et al., Tabla 3 y Tabla 4 (top-1 recall) | Tabla 3: "Server CIFG 16.5% · Federated CIFG 16.4%". Tabla 4: "Server CIFG 15.0 ± 0.5 · Federated CIFG 15.8 ± 0.3". | 2018 |
| 14 | «Apple contó en 2017 algo parecido» | ✅ | Apple ML Research, "Learning with Privacy at Scale" | "published December 6, 2017" | 2017 |
| 15 | «el iPhone revuelve al azar sus datos antes de contar qué emojis usas» | ✅ (con nota) | Apple ML Research | "the data is randomized before being sent from the device, so the server never sees or receives raw data." Caso de uso: emojis más populares para QuickType. Nota: es **opcional** ("Our system is designed to be opt-in and transparent"); no lo hace todo iPhone, solo el de quien acepta compartir análisis. Sugerencia (no obligatoria): «…el iPhone, si aceptas compartir, revuelve…». | 2017 |
| 16 | «en 2019, en el MIT» | ✅ | Zhu, Liu y Han, arXiv:1906.08935; actas NeurIPS 2019 | "Ligeng Zhu Zhijian Liu Song Han · Massachusetts Institute of Technology" | 2019 |
| 17 | «reconstruyeron textos a partir de actualizaciones así, en el laboratorio» | ⚠️ impreciso | Zhu, Liu y Han, Resumen y §5 | "it is possible to obtain the private training data from the publicly shared gradients … token-wise matching for texts." Pero el ataque fue sobre **gradientes** de un solo paso de un modelo tipo BERT y "currently only works for batch size up to 8"; no sobre las actualizaciones promediadas de varios pasos que usa Gboard. "Así" las iguala de más. "En el laboratorio" sí es correcto. | 2019 |
| 18 | «no es privacidad perfecta» (y "hay que confiar en el servidor", nota del guion) | ✅ | Hard et al., §4 | "requires users to trust that the aggregation server will not scrutinize individual weight uploads." | 2018 |
| 19 | Cierre: «Tu chat se queda en tu celular. Lo que viaja es lo que aprendió.» | ⚠️ generaliza de más | Mismas que #1 | Igual que el gancho: vale para el entrenamiento federado de Gboard, no para cualquier teclado ni para todo lo que hace el celular (el modelo de servidor del mismo estudio usaba fragmentos subidos por quien aceptaba). | 2018 |
| 20 | Datos de 2017–2019 dichos con su año | ✅ | — | La voz dice 2017, 2018 y 2019. | — |
| 21 | ¿Hay dato más nuevo que contradiga? | ✅ (no contradice; lo refuerza) | Google Research blog, 21 feb 2024; Xu et al., ACL 2023 | El blog de 2024 dice que todos los modelos neuronales de predicción de la siguiente palabra de Gboard se entrenan con aprendizaje federado y privacidad diferencial formal; el paper de 2023 dice que dos modelos usan además "secure aggregation". No contradice el shot (el matiz sigue siendo cierto); si se quiere, es un dato extra actual. | 2023 / 2024 |

**Conteo:** 18 ✅ · 3 ⚠️ · 0 ❌

## Correcciones necesarias

1. **Gancho (#1, ⚠️ generaliza de más).** El estudio es de Gboard (Google) y de su entrenamiento federado; en el mismo paper Gboard sí subía fragmentos de quien lo aceptaba, y no se sabe de "todo teclado". Propuestas que mantienen el gancho #1 "Esto no es X: es Y":
   - «Hay teclados que no mandan lo que escribes: mandan lo que aprendieron de ti.»
   - o «El teclado de Google no aprende de lo que escribes: aprende de lo que tu celular le cuenta que aprendió.» (más largo)
   - o, más corto y seguro: «Tu teclado puede aprender de ti sin mandar lo que escribes.» (pierde un poco la forma "no es X: es Y").
   Recomendada: la primera. En pantalla, si hay texto del gancho, mismo cambio.
2. **Matiz (#17, ⚠️ impreciso).** El ataque del MIT fue con gradientes de un solo paso, lotes de hasta 8 ejemplos, en un modelo de prueba. Propuesta: «Pero no es privacidad perfecta: en 2019, en el MIT, reconstruyeron frases a partir de cambios parecidos de un modelo, en pruebas de laboratorio.» Mantener el chip "en laboratorio".
3. **Cierre (#19, ⚠️ generaliza de más).** Que regrese al gancho corregido sin prometer de más. Propuesta: «Así, tus frases se quedan en tu celular. Lo que viaja es lo que aprendió.» (el "Así" lo ata al método explicado).
4. *(Opcional, no bloquea)* #15 Apple: agregar que es opcional («…el iPhone, si aceptas compartir, revuelve al azar…»).
5. *(Recordatorio)* En `## Fuentes` del guion, el cifrado de la actualización está atribuido al blog de 2017 (correcto); no atribuirlo al paper de 2018, que no lo menciona.

## Re-verificación (29 oct 2026, coordinador)
Correcciones aplicadas como propuso el verificador:
- Gancho: «Hay teclados que no mandan lo que escribes: mandan lo que aprendieron de ti.» ✅
- Matiz: «…en 2019, en el MIT, reconstruyeron frases a partir de cambios parecidos de un modelo, en pruebas de laboratorio.» ✅
- Cierre: «Así, tus frases se quedan en tu celular. Lo que viaja es lo que aprendió.» ✅
- Apple: «En 2017 Apple contó que, si aceptas compartir, el iPhone revuelve al azar sus datos antes de contar qué emojis usas.» ✅
- Recortes sin datos nuevos (cargando/wifi, servidor que promedia, «atinó igual o un poco más», «un modelo en tu celular») ✅
Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
