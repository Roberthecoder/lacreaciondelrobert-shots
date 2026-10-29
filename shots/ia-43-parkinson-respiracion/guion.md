# Shot IA #43 · La IA que busca Parkinson en cómo respiras dormido

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #43 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** FASE A — guion listo para verificación independiente. Falta: veredicto, animación, Robert en pantalla y `publicacion.md`. **Voz pendiente de aprobación de Robert.**
- **Formato:** N1 "Por dentro": macro (tú dormido en tu cama, la rayita de tu respiración) → por dentro (ondas de radio, la red neuronal leyendo la señal, fondo oscuro) → la misma cama y la misma rayita, ahora con una alerta temprana.
- **Gancho (de los 7):** #3 "Tu cuerpo en una imagen": «Esta rayita que sube y baja eres tú respirando dormido».
- **Duración:** voz 959 caracteres / 167 palabras (≈ 58.0 s) + cierre 3.5 s → **61.5 s** estimado.
- **Postura de la serie:** defensa con datos (una IA útil para la salud) con el matiz claro: es investigación de **2022**, no una prueba aprobada para diagnosticar.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta rayita que sube y baja eres tú respirando dormido. Ahí una IA busca señales de Parkinson. | Fondo azul noche suave con lunares; desde el cuadro 0 una persona dormida en su cama, el pecho sube y baja, y encima se dibuja la rayita de la respiración que avanza. Brillitos de IA sobre la rayita y una lupa con "¿Parkinson?". |
| 1 | Parkinson | El Parkinson llega cuando ciertas neuronas producen poca dopamina: temblor, rigidez, lentitud. Y ningún examen lo diagnostica. | Fondo rosa; una neurona dibujada suelta pocas bolitas de "dopamina"; tres íconos que entran: mano que tiembla, brazo rígido, tortuga (lentitud). Un tubo de laboratorio con "examen" se tacha. |
| 2 | Aparato | En el MIT hicieron un aparato tipo módem: sus ondas de radio rebotan en ti y leen cómo respiras sin tocarte. | Regreso a la recámara: en la pared una cajita tipo módem; arcos de ondas salen, rebotan en el pecho de la persona y regresan; la rayita se forma sola. Chip "sin tocarte". |
| 3 | Noches | Usaron casi doce mil noches de sueño de más de siete mil seiscientas personas. | Fondo menta; cuadrícula de lunitas que se llena; contador "11,964 noches" y "7,671 personas" (en pantalla, también un cinturón de pecho como segunda forma de medir). |
| 4 | Pregunta | ¿Qué tiene que ver respirar con el Parkinson? | **Re-gancho.** "?" gigante sobre los pulmones; Robert grande pensativo. |
| 5 | Respuesta | Estudios lo ligan con músculos de respirar débiles y problemas al respirar dormido, a veces años antes del temblor. | Fondo oscuro "por dentro": pulmones y diafragma con flechas débiles; línea del tiempo donde "cambios al respirar" aparece antes que "temblor". |
| 6 | Estudio | Lo publicaron en 2022: entre una persona con Parkinson y una sin, distinguía cuál era cuál nueve de cada diez veces; en un hospital que no conocía, más de ocho. Y estimaba qué tan avanzado iba. | Tarjeta "2022 · MIT · Yang, Katabi y col. · *Nature Medicine*". Dos camitas lado a lado (con y sin Parkinson) y la IA señala una: 9 de 10 palomitas; luego un hospital nuevo: más de 8 de 10. Un medidor "qué tan avanzado" sube. |
| 7 | Mascota | Su enemigo: un ventilador o tu mascota; esas noches no servían. | Fondo amarillo; un ventilador y un gato junto a la cama; la rayita se vuelve garabato; la noche se tacha. |
| 8 | Ojo | Ojo: es investigación, no una prueba aprobada para diagnosticarte. | Chip grande "investigación ≠ diagnóstico"; un estetoscopio y un sello "en estudio". |
| 9 | Cierre | Quizá un día, esa rayita que dibujas dormido avise antes que tus manos. | **Regreso a la imagen del inicio**: la misma cama y la misma rayita; un foquito de alerta se prende sobre la rayita mientras las manos quietas descansan sobre la cobija. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave, suave y continua, como respiración (sube y baja lento); un "bip" suave por cada pico de la rayita, zumbido de radio cuando salen las ondas, tic de contador mientras se llenan las noches, un golpecito por cada palomita, ruido de ventilador y un maullido corto en la escena de la mascota, campanita suave en el foquito final.

## Fuentes (abiertas en el original el 29 oct 2026)

1. Yang, Y., Yuan, Y., Zhang, G., Wang, H., Chen, Y.-C., Liu, Y., Tarolli, C. G., Crepeau, D., Bukartyk, J., Junna, M. R., Videnovic, A., Ellis, T. D., Lipford, M. C., Dorsey, R. y Katabi, D. "Artificial intelligence-enabled detection and assessment of Parkinson's disease using nocturnal breathing signals". *Nature Medicine* 28: 2207–2215 (2022). DOI 10.1038/s41591-022-01932-x · PMC9556299 (texto completo con la API de Europe PMC).
   > "The model was evaluated on a large dataset comprising 7,671 individuals, using data from several hospitals in the United States, as well as multiple public datasets. The AI model can detect PD with an area-under-the-curve of 0.90 and 0.85 on held-out and external test sets, respectively. The AI model can also estimate PD severity and progression in accordance with the Movement Disorder Society Unified Parkinson's Disease Rating Scale (R = 0.94…)." (2022)
   > "Moreover, the model can assess PD in the home setting in a touchless manner, by extracting breathing from radio waves that bounce off a person's body during sleep." (2022)
   > "The combined dataset contains 11,964 nights with over 120,000 h of nocturnal breathing signals from 757 PD subjects … and 6,914 control subjects" (2022)
   > "The system takes as input one night of breathing signals, which can be collected using a breathing belt worn on the person's chest or abdomen" (2022)
   > "The second group of datasets collects nocturnal breathing in a contactless manner using a radio device developed by our team at MIT" (2022)
   > "we validated our AI model on an external test dataset (n = 1,920 nights from 1,920 subjects out of which 644 have PD) from an independent hospital not involved during model development (Mayo Clinic). Our model achieved an AUC of 0.851" (2022)
   > "This link was further strengthened in later work which reported degeneration in areas in the brainstem that control breathing, weakness of respiratory muscle function and sleep breathing disorders. Further, these respiratory symptoms often manifest years before clinical motor symptoms" (2022)
   > "We also filter out nights where the breathing signal is distorted or nonexistent, which occurs … when a source of interference (for example, fans or pets) exists near the subject for wireless data." (2022)
   > "Future research is required to establish the feasibility of such use pattern, and the potential impact on clinical practice. Our study also has some limitations." (2022)
2. MIT News, Alex Ouyang, "Artificial intelligence model can detect Parkinson's from breathing patterns" (22 ago 2022).
   > "An MIT-developed device with the appearance of a Wi-Fi router uses a neural network to discern the presence and severity of one of the fastest-growing neurological diseases in the world." (2022)
   > "The system extracts nocturnal breathing signals either from a breathing belt worn by the subject, or from radio signals that bounce off their body while asleep." (2022)
3. MedlinePlus en español (Biblioteca Nacional de Medicina de EE. UU., NIH), "Enfermedad de Parkinson" (consultado 29 oct 2026).
   > "Ocurre cuando las células nerviosas (neuronas) no producen suficiente cantidad de una sustancia química importante en el cerebro conocida como dopamina." 
   > "Algunos son: Temblor en las manos, los brazos, las piernas, la mandíbula y la cara Rigidez en los brazos, las piernas y el tronco Lentitud de los movimientos"
   > "No existe un examen de diagnóstico para esta enfermedad. Los doctores usan el historial del paciente y un examen neurológico para diagnosticarlo."

## Notas
- **Cómo se explica el AUC sin decir la palabra:** un AUC de 0.90 significa que, si tomas al azar a una persona con Parkinson y a una sin, el modelo le da puntaje más alto a la que sí lo tiene el 90 % de las veces → "distinguía cuál era cuál nueve de cada diez veces". El 0.85 (0.851) del hospital externo (Mayo Clinic, no usado al entrenar) → "más de ocho de cada diez". No es "acierta el 90 % de los diagnósticos" (eso sería exactitud), y no se dice así.
- "Casi doce mil noches" = 11,964. "Más de siete mil seiscientas personas" = 7,671 (757 con Parkinson + 6,914 sin). MIT News dice 7,687; se usa la cifra del artículo.
- "Aparato tipo módem" = "appearance of a Wi-Fi router" (en México se le dice módem al router de casa). No da internet: solo manda ondas de radio de baja potencia.
- "Estimaba qué tan avanzado iba" = la predicción de gravedad se correlacionó con la escala clínica MDS-UPDRS (R = 0.94) en el grupo con varias noches medidas en casa.
- "Estudios lo ligan… a veces años antes del temblor" = lo que dicen los autores en la introducción ("often manifest years before clinical motor symptoms"); se dice "a veces" para no exagerar.
- **Descartado tras revisar:** "James Parkinson ya lo describió en 1817". El artículo dice "A relationship between PD and breathing was noted as early as 1817, in the work of James Parkinson", pero en el ensayo (Gutenberg #23777) la única mención clara ("He fetched his breath rather hard") está en un caso citado de otro autor, en etapa avanzada. No se usa.
- **Dato que no se usa por muestra chica:** el modelo marcó a 9 de 12 personas (75 %) antes de su diagnóstico; los autores admiten que se validó "in a small number of participants".
- Cierre ("quizá un día… avise antes que tus manos") es una posibilidad, dicha con "quizá", no un hecho.
- El estudio es de **2022** y así se dice; no se afirma nada sobre aprobaciones posteriores.
- El dibujo es esquemático.
