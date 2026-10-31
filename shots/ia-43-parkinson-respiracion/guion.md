# Shot IA #43 · La IA que busca Parkinson en cómo respiras dormido

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #43 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** guion verificado (3 ⚠️ corregidas: «análisis de laboratorio», «desde etapas tempranas», AUC por noches), animación, Robert en pantalla y `publicacion.md` listos; hoja de revisión en `revision/hoja.png`. **Voz pendiente de aprobación de Robert.**
- **Formato:** N1 "Por dentro": macro (tú dormido en tu cama, la rayita de tu respiración) → por dentro (ondas de radio, la red neuronal leyendo la señal, fondo oscuro) → la misma cama y la misma rayita, ahora con una alerta temprana.
- **Gancho (de los 7):** #3 "Tu cuerpo en una imagen": «Esta rayita que sube y baja eres tú respirando dormido».
- **Duración:** voz 961 caracteres / 167 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** en la base.
- **Postura de la serie:** defensa con datos (una IA útil para la salud) con el matiz claro: es investigación de **2022**, no una prueba aprobada para diagnosticar.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Esta rayita que sube y baja eres tú respirando dormido. Ahí una IA busca señales de Parkinson. | Fondo azul noche suave con lunares; desde el cuadro 0 una persona dormida en su cama, el pecho sube y baja, y encima se dibuja la rayita de la respiración que avanza. Brillitos de IA sobre la rayita y una lupa con "¿Parkinson?". |
| 1 | Parkinson | El Parkinson llega cuando unas neuronas producen poca dopamina: temblor, rigidez, lentitud. Y no hay un análisis de laboratorio que lo diagnostique. | Fondo rosa; una neurona dibujada suelta pocas bolitas de "dopamina"; tres íconos que entran: mano que tiembla, brazo rígido, tortuga (lentitud). Luego un tubo de ensayo y el letrero "análisis de laboratorio" se tacha. |
| 2 | Aparato | En el MIT hicieron un aparato tipo módem: sus ondas de radio rebotan en ti y leen cómo respiras sin tocarte. | Regreso a la recámara: en la pared una cajita tipo módem; arcos de ondas salen, rebotan en el pecho de la persona y regresan; la rayita se forma sola. Chip "sin tocarte". |
| 3 | Noches | Usaron casi doce mil noches de más de siete mil seiscientas personas. | Fondo menta; cuadrícula de lunitas que se llena; contador "11,964 noches de sueño" y chip "7,671 personas". |
| 4 | Pregunta | ¿Qué tiene que ver respirar con el Parkinson? | **Re-gancho.** "?" gigante sobre los pulmones; Robert grande pensativo. |
| 5 | Respuesta | Estudios lo ligan con músculos de respirar débiles y problemas al respirar dormido, desde etapas tempranas. | Fondo oscuro "por dentro" (circuito rosa): pulmones y diafragma que se mueven cada vez menos, flechas punteadas; chips "músculos de respirar más débiles", "problemas al respirar dormido" y "desde etapas tempranas". |
| 6 | Estudio | Lo publicaron en 2022: entre la noche de alguien con Parkinson y la de alguien sin, distinguía cuál era cuál nueve de cada diez veces; en un hospital que no conocía, más de ocho. Y estimaba qué tan avanzado iba. | Tarjeta "2022 · MIT · Katabi y col. · *Nature Medicine*". Dos tarjetas "noche A" y "noche B" con su rayita; un brillito de IA elige una; 9 palomitas verdes y 1 roja, chip "9 de cada 10". Luego un hospital y "+ de 8 de 10" con "hospital que no conocía". Al final un velocímetro "¿qué tan avanzado?" (leve → avanzado) cuya aguja sube. |
| 7 | Mascota | Su enemigo: un ventilador o tu mascota; esas noches no servían. | Fondo amarillo; la misma recámara con un ventilador en el buró y un gato en la cama; la rayita se vuelve garabato; chip "✘ noche descartada". |
| 8 | Ojo | Ojo: es investigación, no una prueba aprobada. | Chip grande "investigación ≠ diagnóstico"; un estetoscopio y cae un sello rojo "EN ESTUDIO". |
| 9 | Cierre | Quizá un día esa rayita que dibujas dormido avise antes que tus manos. | **Regreso a la imagen del inicio**: la misma cama y la misma rayita, que se vuelve dorada con un foquito que late en la punta; chip "💡 ¿un aviso temprano? (quizá)"; la mano quieta sobre la cobija. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave, suave y continua, como respiración (sube y baja lento); un "bip" suave por cada pico de la rayita, zumbido de radio cuando salen las ondas, tic de contador mientras se llenan las noches, un golpecito por cada palomita, ruido de ventilador y un maullido corto en la escena de la mascota, campanita suave en el foquito final.

## Robert en pantalla

Tiempos de la base (con la voz real se recorren solos). Grande en «¿Qué tiene que ver respirar con el Parkinson?».

| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 | 4.8 | 11_sorprendido | `gancho` | «Esta rayita… eres tú respirando dormido» (cuadro 0) |
| 2 | 7.3 | 11.0 | 12_perfil_serio | `arriba-der` | «poca dopamina: temblor, rigidez, lentitud» |
| 3 | 16.5 | 20.8 | 13_senalando_arriba | `izq-alto` | señala el aparato y las ondas «sin tocarte» |
| 4 | 25.4 | 28.8 | 07_pensativo_puno | `grande` | «¿Qué tiene que ver respirar con el Parkinson?» |
| 5 | 30.8 | 34.4 | 06_pensativo_menton | `arriba-der` | «problemas al respirar dormido, desde etapas tempranas» |
| 6 | 38.6 | 41.4 | 11_sorprendido | `izq-alto` | «nueve de cada diez veces» |
| 7 | 44.3 | 46.7 | 04_bajando_lentes | `arriba-der` | «estimaba qué tan avanzado iba» |
| 8 | 47.3 | 50.6 | 05_sonriendo_dientes_uniformes | `izq-alto` | «un ventilador o tu mascota» |
| 9 | 51.1 | 53.6 | 10_serio_molesto | `arriba-der` | «es investigación, no una prueba aprobada» |
| 10 | 54.2 | 58.0 | 13_senalando_arriba | `izq-alto` | «avise antes que tus manos» |
| — | 58.1 | 61.6 | 02_apuntando_camara | CierreMarca | cierre |

apariciones 10 · ≈ 34.7 s (+ cierre 3.5 s) · poses distintas 8 (nunca la misma dos veces seguidas) · total 61.6 s

## Fuentes (abiertas en el original el 29 oct 2026)

1. Yang, Y., Yuan, Y., Zhang, G., Wang, H., Chen, Y.-C., Liu, Y., Tarolli, C. G., Crepeau, D., Bukartyk, J., Junna, M. R., Videnovic, A., Ellis, T. D., Lipford, M. C., Dorsey, R. y Katabi, D. "Artificial intelligence-enabled detection and assessment of Parkinson's disease using nocturnal breathing signals". *Nature Medicine* 28: 2207–2215 (2022). DOI 10.1038/s41591-022-01932-x · PMC9556299 (texto completo con la API de Europe PMC).
   > "The model was evaluated on a large dataset comprising 7,671 individuals, using data from several hospitals in the United States, as well as multiple public datasets. The AI model can detect PD with an area-under-the-curve of 0.90 and 0.85 on held-out and external test sets, respectively. The AI model can also estimate PD severity and progression in accordance with the Movement Disorder Society Unified Parkinson's Disease Rating Scale (R = 0.94…)." (2022)
   > "Moreover, the model can assess PD in the home setting in a touchless manner, by extracting breathing from radio waves that bounce off a person's body during sleep." (2022)
   > "The combined dataset contains 11,964 nights with over 120,000 h of nocturnal breathing signals from 757 PD subjects … and 6,914 control subjects" (2022)
   > "The system takes as input one night of breathing signals, which can be collected using a breathing belt worn on the person's chest or abdomen" (2022)
   > "The second group of datasets collects nocturnal breathing in a contactless manner using a radio device developed by our team at MIT" (2022)
   > "we validated our AI model on an external test dataset (n = 1,920 nights from 1,920 subjects out of which 644 have PD) from an independent hospital not involved during model development (Mayo Clinic). Our model achieved an AUC of 0.851" (2022)
   > "This link was further strengthened in later work which reported degeneration in areas in the brainstem that control breathing, weakness of respiratory muscle function and sleep breathing disorders." (2022)
   > Fig. 2a,b: "ROC curves for detecting PD from breathing belt (n = 6,660 nights from 5,652 subjects)" · "from wireless data (n = 2,601 nights from 53 subjects)" → el AUC se midió por noches. (2022)
   > "We also filter out nights where the breathing signal is distorted or nonexistent, which occurs … when a source of interference (for example, fans or pets) exists near the subject for wireless data." (2022)
   > "Future research is required to establish the feasibility of such use pattern, and the potential impact on clinical practice. Our study also has some limitations." (2022)
2. MIT News, Alex Ouyang, "Artificial intelligence model can detect Parkinson's from breathing patterns" (22 ago 2022).
   > "An MIT-developed device with the appearance of a Wi-Fi router uses a neural network to discern the presence and severity of one of the fastest-growing neurological diseases in the world." (2022)
   > "The system extracts nocturnal breathing signals either from a breathing belt worn by the subject, or from radio signals that bounce off their body while asleep." (2022)
3. MedlinePlus en español (Biblioteca Nacional de Medicina de EE. UU., NIH), "Enfermedad de Parkinson" (consultado 29 oct 2026).
   > "Ocurre cuando las células nerviosas (neuronas) no producen suficiente cantidad de una sustancia química importante en el cerebro conocida como dopamina." 
   > "Algunos son: Temblor en las manos, los brazos, las piernas, la mandíbula y la cara Rigidez en los brazos, las piernas y el tronco Lentitud de los movimientos"
   > "No existe un examen de diagnóstico para esta enfermedad. Los doctores usan el historial del paciente y un examen neurológico para diagnosticarlo."
4. Parkinson's Foundation, "Getting Diagnosed" (consultado oct 2026): "There is not a specific lab or imaging test that can diagnose PD." (dato citado por el verificador; ver verificacion.md)
5. Pokusa, M. et al. (2020), revisión sobre respiración en Parkinson: "respiratory problems, which often manifest in the early stages of the disease" (citado por el verificador; ver verificacion.md).

## Notas
- **Cómo se explica el AUC sin decir la palabra:** un AUC de 0.90 significa que, si tomas al azar la noche de alguien con Parkinson y la de alguien sin, el modelo le da puntaje más alto a la de quien sí lo tiene el 90 % de las veces → "entre la noche de alguien con Parkinson y la de alguien sin, distinguía cuál era cuál nueve de cada diez veces" (el AUC se calculó por noches). El 0.85 (0.851) del hospital externo (Mayo Clinic, no usado al entrenar) → "más de ocho de cada diez". No es "acierta el 90 % de los diagnósticos" (eso sería exactitud), y no se dice así.
- "Casi doce mil noches" = 11,964. "Más de siete mil seiscientas personas" = 7,671 (757 con Parkinson + 6,914 sin). MIT News dice 7,687; se usa la cifra del artículo.
- "Aparato tipo módem" = "appearance of a Wi-Fi router" (en México se le dice módem al router de casa). No da internet: solo manda ondas de radio de baja potencia.
- "Estimaba qué tan avanzado iba" = la predicción de gravedad se correlacionó con la escala clínica MDS-UPDRS (R = 0.94) en el grupo con varias noches medidas en casa.
- "Estudios lo ligan… desde etapas tempranas": el "años antes del temblor" del artículo NO se usa (el verificador no lo encontró en las fuentes que cita); se dice "desde etapas tempranas" (Pokusa 2020) y se quitó la línea del tiempo de la pantalla.
- "No hay un análisis de laboratorio que lo diagnostique": el diagnóstico sí se hace con un examen neurológico; lo que no existe es un análisis de laboratorio específico.
- **Descartado tras revisar:** "James Parkinson ya lo describió en 1817". El artículo dice "A relationship between PD and breathing was noted as early as 1817, in the work of James Parkinson", pero en el ensayo (Gutenberg #23777) la única mención clara ("He fetched his breath rather hard") está en un caso citado de otro autor, en etapa avanzada. No se usa.
- **Dato que no se usa por muestra chica:** el modelo marcó a 9 de 12 personas (75 %) antes de su diagnóstico; los autores admiten que se validó "in a small number of participants".
- Cierre ("quizá un día… avise antes que tus manos") es una posibilidad, dicha con "quizá", no un hecho.
- El estudio es de **2022** y así se dice; no se afirma nada sobre aprobaciones posteriores.
- El dibujo es esquemático.
