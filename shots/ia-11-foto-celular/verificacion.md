# Verificación de hechos · Shot IA #11 · Tu foto de noche no es una foto: son hasta trece

- Fecha: 29 oct 2026
- Verificador independiente (no escribió el guion)
- Revisado: `guion.md` (voz + columna "Lo que se ve") y `narracion.json`. Todavía no hay `.jsx`.
- Fuentes abiertas: PDF de Liba et al. 2019 (arXiv 1910.11336), PDF de Wronski et al. 2019 (arXiv 1905.03277), PDF de Hasinoff et al. 2016 (hdrplusdata.org), blog de Google Research "Night Sight: Seeing in the Dark on Pixel Phones" (14 nov 2018), blog de Google "How we made Pixel's Night Sight even faster" (18 abr 2023), notas de prensa sobre Pro Res Zoom del Pixel 10 Pro (ago 2025).

## Pregunta clave: ¿"hoy" los celulares siguen haciéndolo así?

**No del todo.** El guion habla en presente ("Así lo hace el modo noche de los Pixel", "usan tu temblor"), pero lo que describe es el sistema de **2018–2019**. Después cambió:
- **Pixel 7 (2023):** Google dice que el modo noche ahora quita el ruido con **una red neuronal**: "a new machine learning algorithm that runs on Tensor reduces unwanted noise in the final photo" / "it powers a new neural network that dramatically reduces noise" (blog.google, 18 abr 2023). Por lo tanto, "alinear y juntar es matemática clásica, no una red neuronal / lo que sí aprendió es el color" **ya no describe un Pixel actual**: hoy también hay IA en el quitar ruido.
- **Pixel 10 Pro (ago 2025):** el zoom de más de 30× ("Pro Res Zoom") usa un **modelo de difusión generativo** que reconstruye partes de la imagen. El Pixel 10 base conserva Super Res Zoom (hasta 20×), pero no hay fuente reciente que confirme que hoy siga funcionando igual que en el artículo de 2019.
- El blog de 2018 decía "up to 15 [frames] if it is handheld"; el artículo de 2019 dice 6–13. El número cambia según versión.

**Conclusión:** el guion debe decir en pasado y con fecha: "así lo describió Google en 2019". Todo lo de 2019 está bien verificado; lo que falla es el tiempo verbal.

## Tabla

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | La foto de noche son "hasta trece fotos encimadas" | ⚠️ (✅ para 2019, no para hoy) | Liba et al., ACM TOG 38(6):164 | "we capture and merge a burst of 6–13 frames" | 2019 (el blog de 2018 decía "up to 15 … handheld") |
| 2 | "Así lo hace el modo noche de los Pixel de Google" (presente) | ⚠️ desactualizado | Liba 2019; blog.google 2023 | "Our system, which launched to the public in November 2018 as Night Sight on Google Pixel" / 2023: "a new neural network that dramatically reduces noise" | 2018–2019; cambió en 2023 |
| 3 | En el sensor cada pixel es diminuto, con poca luz atrapa poco y sale ruido | ✅ | Hasinoff et al., ACM TOG 35(6):192 | "They also have small sensor pixels, which limits the number of electrons each pixel can store" / "leading to noisy images in low light" | 2016 |
| 4 | Barra de escala "≈ 1 µm" del pixel (pantalla) | ⚠️ no verificada | — | El guion mismo la marca como ilustrativa; el sensor del Pixel 3 se reporta en ~1.4 µm, no 1 µm (no abrí ficha oficial) | — |
| 5 | Una exposición larga sale barrida por el movimiento de la mano | ✅ (redacción ⚠️) | Liba 2019; Hasinoff 2016 | "Lengthening the exposure time leads to an increased chance of motion blur, especially when the device is handheld" / "motion blur due to camera shake" | 2019 / 2016 |
| 5b | La palabra "pulso" | ⚠️ ambigua | — | En español "pulso" también es el latido; la fuente habla de "camera shake"/"handshake" (temblor de la mano) | — |
| 6 | Ráfaga de fotos cortas "de hasta un tercio de segundo" (cronómetro "≤ 0.33 s") | ✅ (en la mano) | Liba 2019; Google Research blog | "When the device is handheld, we capture up to 333 ms exposures; when we detect the device is stabilized, we capture up to 1 s exposures." | 2019 |
| 7 | Las alinea pedacito por pedacito (mosaicos) y las junta; baja el ruido | ✅ | Liba 2019 §3.1; Hasinoff 2016 | "We use a tile-based alignment algorithm similar to (Hasinoff et al. 2016)" / "captures, aligns, and merges a burst of frames to reduce noise" | 2019 / 2016 |
| 8 | Alinear y juntar es matemática clásica, no red neuronal | ✅ para 2019 / ⚠️ para hoy | Liba 2019; Hasinoff 2016; blog.google 2023 | "Bounded Flow is as accurate as other methods that are not based on neural networks"; mezcla "weighted average in the Fourier domain"; HDR+: "FFT-based alignment algorithm and a hybrid 2D/3D Wiener filter". Pero 2023: el ruido final se quita con "a new neural network" | 2016–2019; cambió 2023 |
| 9 | Pantalla: "matemática clásica (Fourier, filtro de Wiener)" | ✅ | Hasinoff 2016; Liba 2019 | "hybrid 2D/3D Wiener filter" (HDR+); Liba mezcla "in the Fourier domain" | 2016 / 2019 |
| 10 | Lo que sí aprendió es el color (balance de blancos aprendido) | ✅ para 2019 | Liba 2019 | "we employ a learning-based auto white balancing algorithm" | 2019 |
| 11 | Entrenado con 5 000 fotos ajustadas por fotógrafos profesionales | ✅ | Liba 2019 §4.1 | "we collected 5000 images of various scenes … we recruited professional photographers to manually 'tag' the most aesthetically preferable white balance" | 2019 |
| 12 | Pantalla: el color lo hace una `RedNeuronal` | ⚠️ imprecisa | Liba 2019 §4 | El modelo es FFCC ("Fast Fourier Color Constancy"), aprendido pero **no** es una red neuronal; el propio artículo contrasta su pipeline con "an end-to-end trained neural network" | 2019 |
| 13 | Google lo publicó en 2019 (tarjeta "2019 · Google Research · Liba et al. · ACM Transactions on Graphics") | ✅ | Liba 2019 | "ACM Trans. Graph. 38, 6, Article 164 (November 2019)" | 2019 |
| 14 | Funciona hasta con tres décimas de lux | ✅ | Liba 2019 | "capturing clean, sharp, colorful photographs in light as low as 0.3 lux" | 2019 |
| 15 | …cuando tus ojos ya casi no ven colores | ✅ | Liba 2019 | "where human vision becomes monochromatic and indistinct" | 2019 |
| 16 | En el zoom usan tu temblor (presente) | ⚠️ (✅ para 2019) | Wronski et al., ACM TOG 38(4):28; prensa Pixel 10 Pro 2025 | "We harness natural hand tremor … to acquire a burst of raw frames with small offsets" / "the basis of the Super-Res Zoom feature". En 2025 el Pixel 10 Pro usa difusión generativa pasado 30× | 2019; cambió 2025 en el Pro |
| 17 | La mano tiembla de 8 a 12 veces por segundo | ✅ | Wronski 2019 (cita a Marshall y Walsh 1956) | "highly periodic, with a frequency in the range of 8–12 Hz" | 2019 (dato de 1956) |
| 18 | Cada foto sale apenas corrida (fracción de pixel) | ✅ | Wronski 2019 | "small offsets" / "the analysis of natural hand tremor as the source of subpixel" shifts | 2019 |
| 19 | Pantalla: chip "Super Res Zoom · 2019" | ⚠️ menor | Wronski 2019 | La función salió con el Pixel 3 (2018); 2019 es el año del artículo. Mejor "artículo de 2019" | 2018/2019 |
| 20 | Cierre: "la matemática las volvió una sola" | ✅ para 2019 / ⚠️ para hoy | Liba 2019 | Mezcla clásica en 2019; desde 2023 también interviene una red neuronal en el ruido | 2019 |

**Conteo:** ✅ 11 · ⚠️ 10 (incluye los que solo son correctos "en 2019") · ❌ 0

## Correcciones necesarias

1. **Gancho (línea 2), tiempo verbal.** Cambiar "Así lo hace el modo noche de los Pixel de Google." → **"Así lo describió Google en 2019 para el modo noche de sus Pixel."** (o "Así lo hacía el modo noche de los Pixel en 2019."). Chip en pantalla: "modo noche · Pixel · 2019".
2. **"Hasta trece".** Queda bien una vez fechado en 2019 (artículo: 6–13). No mezclar con el "hasta 15" del blog de 2018.
3. **"Tu pulso la barrería"** → **"el temblor de tu mano la barrería"** (evita confundir con el latido).
4. **Escena Clásico / Color / Cierre.** Mantener el contraste pero fechado: "En 2019, alinear y juntar era matemática clásica, no una red neuronal. Lo que sí aprendió fue el color…". Opcional (dato extra verificado, blog.google 18 abr 2023): "Desde 2023, una red neuronal también le quita el ruido."
5. **Pantalla escena Color:** no dibujar `RedNeuronal`; el modelo de 2019 (FFCC) es aprendido pero no es red neuronal. Usar un "modelo entrenado" genérico (p. ej. cuadrícula de 5 000 fotos + gotero + flecha "aprendió").
6. **Temblor:** "Y en el zoom usan tu temblor" → **"Y para el zoom, otro estudio de Google de 2019 usó tu temblor…"** (el Pixel 10 Pro de 2025 ya usa IA generativa pasado 30×; no afirmar el presente). Chip: "Super Res Zoom · artículo 2019".
7. **Barra de escala "≈ 1 µm":** quitar el número o cambiarla a una fuente verificada del sensor concreto.
8. **Cierre:** "…y la matemática las volvió una sola" puede quedarse si el gancho ya fechó todo en 2019; si se agrega el dato de 2023, cambiar a "…y la matemática (y hoy también la IA) las volvió una sola".

## Re-verificación

29 oct 2026 · mismo verificador independiente. Revisé solo lo que cambió en `narracion.json`, `fotocelular.jsx` y `guion.md`.

| # | Afirmación nueva / cambiada | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| R0 | "Esa foto que tomaste de noche no es una foto: son hasta trece, encimadas." + subtítulo "son hasta 13" + "×13" | ✅ (la línea siguiente la fecha y la acota a los Pixel) | Liba et al. 2019 | "we capture and merge a burst of 6–13 frames" | 2019 |
| R1 | "Así lo describió Google en 2019 para sus Pixel." + chip "modo noche · Pixel · 2019" | ✅ | Liba et al. 2019 | "launched to the public in November 2018 as Night Sight on Google Pixel smartphones"; "ACM Trans. Graph. 38, 6, Article 164 (November 2019)" | 2019 |
| R2 | "cada pixel es diminuto: atrapa poquita luz y la foto sale con ruido" | ✅ | Hasinoff et al. 2016 | "small sensor pixels, which limits the number of electrons each pixel can store" / "noisy images in low light" | 2016 |
| R3 | "Con una foto larga, el temblor de tu mano la barrería." + chip "1 foto larga = foto movida" | ✅ | Liba 2019; Hasinoff 2016 | "increased chance of motion blur, especially when the device is handheld" / "motion blur due to camera shake" | 2019 / 2016 |
| R4 | "tomaba una ráfaga de fotos de hasta un tercio de segundo" + chip "hasta ⅓ de segundo cada una" | ✅ (en la mano, que es la escena) | Liba 2019 | "When the device is handheld, we capture up to 333 ms exposures" | 2019 |
| R5 | "Las alineaba pedacito por pedacito y las juntaba: el ruido baja" | ✅ | Liba 2019 §3.1; Hasinoff 2016 | "We use a tile-based alignment algorithm" / "captures, aligns, and merges a burst of frames to reduce noise" | 2019 / 2016 |
| R7 | "Alinear y juntar era matemática clásica, no una red neuronal." + chips "2019 · alinear y juntar", "Fourier, filtro de Wiener", red tachada "no es red neuronal" | ✅ (fechado en 2019) | Liba 2019; Hasinoff 2016 | "merged by performing a weighted average in the Fourier domain"; "hybrid 2D/3D Wiener filter"; "Bounded Flow is as accurate as other methods that are not based on neural networks" | 2016–2019 |
| R8 | "Lo que sí aprendió fue el color: un modelo entrenado con cinco mil fotos ajustadas por fotógrafos." + chip "5 000 fotos ajustadas por fotógrafos"; ahora se dibuja `CajaModelo` (no `RedNeuronal`) | ✅ | Liba 2019 §4.1 | "learning-based auto white balancing algorithm"; "we collected 5000 images … we recruited professional photographers to manually 'tag' the most aesthetically preferable white balance" | 2019 |
| R9 | "Funcionaba hasta con tres décimas de lux, cuando tus ojos ya casi no ven colores." + tarjeta 2019 Liba et al. + "0.3 lux" | ✅ | Liba 2019 | "in light as low as 0.3 lux, where human vision becomes monochromatic and indistinct" | 2019 |
| R10 | "otro estudio de Google de 2019 usó tu temblor: tu mano tiembla de ocho a doce veces por segundo" + chips "Super Res Zoom · artículo 2019", "8 a 12 temblores por segundo" | ✅ | Wronski et al. 2019 | "We harness natural hand tremor"; "a frequency in the range of 8–12 Hz"; "the basis of the Super-Res Zoom feature" | 2019 (temblor: Marshall y Walsh 1956) |
| R11 | "Y desde 2023, una red neuronal también le quita el ruido." + chip "desde 2023 · red neuronal contra el ruido" | ✅ (en el contexto, "le" es el modo noche de los Pixel) | blog.google, "How we made Pixel's Night Sight even faster", 18 abr 2023 | "a new machine learning algorithm that runs on Tensor reduces unwanted noise in the final photo" / "it powers a new neural network that dramatically reduces noise" | 2023 |
| R12 | Cierre: "Tu foto de noche no fue un clic: fueron muchas, unidas por matemática y hoy también por IA." + chip "matemática + IA" | ⚠️ generaliza de más | blog.google 2023 (solo Pixel) | La fuente habla solo de los Pixel (desde el Pixel 7). "Tu foto de noche" … "hoy también por IA" lo extiende a cualquier celular y a cualquier foto de noche, y eso no está verificado (no todos los teléfonos usan una red neuronal de noche) | 2023 |
| — | Barra de escala "≈ 1 µm" | ✅ (resuelto) | — | Ya no está en `fotocelular.jsx` | — |

### Correcciones pendientes
1. **Cierre (línea 12):** "Tu foto de noche no fue un clic: fueron muchas, unidas por matemática y hoy también por IA." → **"Tu foto de noche no fue un clic: fueron muchas, unidas por matemática y, en los Pixel de hoy, también por IA."** (el chip "matemática + IA" puede quedarse). Con ese cambio, todo queda ✅.
