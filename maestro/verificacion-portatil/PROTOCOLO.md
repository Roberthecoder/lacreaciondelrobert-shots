# Protocolo de verificación de hechos

Aplica a todo video (corto, largo, documental, pitch, formal, libre o de datos de Robert), sin importar el estilo de animación.

## 1. Orden fijo (nunca se salta un paso)
1. **Primero el guion**: el texto que se dice y la lista de lo que se va a ver en pantalla. Nada de animación todavía.
2. **Verificación independiente**: un subagente que **NO escribió el guion** revisa cada afirmación (encargo en `ENCARGO-VERIFICADOR.md`).
   Si el que escribió el guion se verifica a sí mismo, no cuenta: el objetivo es atrapar alucinaciones del autor.
3. Se escribe `verificacion.md` en la carpeta del video, con la tabla de `plantilla-verificacion.md`.
4. Toda ❌ o ⚠️ se **corrige o se quita** del guion, y esa parte **se vuelve a verificar** (nueva ronda en el mismo archivo).
5. Solo cuando todo es ✅, la **última línea** del archivo es `VEREDICTO: APROBADO`. Sin esa línea no se anima ni se renderiza
   (lo impone `candado.sh`).
6. Si después cambia el texto o lo que se dibuja (una corrección de Robert, por ejemplo), lo que cambió **se verifica otra vez** antes de
   volver a renderizar.

## 2. Qué se verifica
- **Todo lo comprobable**: cifras, fechas, nombres, lugares, instituciones, causas («por eso…»), comparaciones («más que…»),
  superlativos («el más», «el primero», «nunca», «siempre», «único»).
- **Lo que se ve en pantalla y afirma algo**: etiquetas, números en gráficas, mapas, escalas (µm, km), y la **forma real** de lo que se
  dibuja (morfología, colores, anatomía, orden de un proceso). Ejemplos que ya fallaron: esporas de *Ophiocordyceps* alargadas, no
  redondas; germinación epígea del frijol; los esporangios de *Rhizopus* no explotan ni se vuelven champiñones; mapas con contorno real
  y solo los lugares que dice la frase.
- Los textos de publicación (descripciones, títulos) si traen datos que no estén en el guion.

## 3. Veredictos
- **✅ verificada**: con la fuente abierta, la **frase textual** que lo dice y el **año del dato**.
- **❌ falsa**.
- **⚠️ imprecisa, exagerada o no verificable**. Regla: **si dudas, es ⚠️.**
- ❌ y ⚠️ nunca se quedan: se corrigen (y se reverifican) o se quitan.

## 4. Regla de los números (Robert, 27 oct 2026, tras el error del cepario)
- Cada cifra se verifica **abriendo la fuente que se cita** y encontrando ahí la cifra exacta; se copia la frase textual y el año.
- Prohibido: tomar cifras de «revisiones que citan» sin abrir el original; mezclar la cifra de una fuente con el enlace de otra; usar un
  conteo viejo si hay uno más nuevo.
- Toda cifra dice **de qué es, según quién y de qué año** («3 millones de cepas de microbios guardadas en colecciones, según X, 2023»).
  Si el dato tiene más de 2 años, el guion lo dice («en 2020…»).
- Si no se puede verificar, **no se usa**.

## 5. Fuentes
- Fuente primaria (el artículo, el informe oficial, la base de datos) o una revisión seria. Abrir la página: **no quedarse con el resumen
  del buscador**. Si una fuente no se pudo abrir, se dice en el archivo y no cuenta como verificación.
- En pantalla o en el guion citar es opcional; en `verificacion.md` es **obligatorio**.

## 6. Hipótesis y matices
- Lo que es hipótesis se dice como hipótesis («una hipótesis dice…», «probablemente»), y así se verifica (que la fuente también lo
  presente como hipótesis).
- Lo esquemático se declara («el dibujo es esquemático»).
- Seguridad: si el tema toca salud, comida silvestre o laboratorio, el guion incluye la advertencia que corresponda.

## 7. Datos personales de Robert
- Su biografía la confirma él mismo: se anota «✅ confirmado por Robert, <fecha>». Solo cuentan datos ya confirmados; si falta uno, se le
  pregunta, nunca se supone.
- Todo lo demás de un video de Robert (ciencia, cifras, instituciones, historia) pasa por el verificador independiente igual que siempre.

## 8. Lecciones que ya costaron caro
- «3,280,000 cepas, ¿de qué, según quién?» → toda cifra con su qué, quién y año.
- Una afirmación tipo «es la explicación más aceptada» sin respaldo es ⚠️ aunque el dato de fondo sea cierto (ver `ejemplo/`).
- Nombres científicos siempre en cursiva, en pantalla y en subtítulos.
