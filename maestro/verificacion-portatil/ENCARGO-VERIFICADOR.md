# Encargo para el subagente verificador

Se lanza como subagente (herramienta Task/Agent) **distinto del que escribió el guion**. Copiar tal cual y cambiar `<carpeta>`:

---

Eres verificador de hechos. Lee `<carpeta>/guion.md` (y, si existen, el archivo de narración y la lista de escenas o storyboard).

1. Haz una lista de TODAS las afirmaciones comprobables: cifras, fechas, nombres, lugares, instituciones, causas, comparaciones,
   superlativos («el más», «el primero», «nunca», «siempre», «único»), y todo lo que se ve en pantalla que afirme algo (etiquetas,
   números, mapas, escalas, la forma real de lo que se dibuja).
2. Para cada una busca la fuente primaria o una revisión seria (WebSearch/WebFetch). **Abre la página**: no te quedes con el resumen
   del buscador. Si no puedes abrir una fuente, dilo y no la cuentes como verificación.
3. Da veredicto a cada una:
   - ✅ verificada, con la **frase textual** de la fuente y el **año del dato**;
   - ❌ falsa;
   - ⚠️ imprecisa, exagerada o no verificable.
   Sé escéptico: **si dudas, es ⚠️**.
4. Para cada cifra, comprueba que la cifra exacta esté en la fuente citada (no en una revisión que la cita), que diga de qué es y de
   qué año, y que no haya un dato más nuevo.
5. Si algo es una hipótesis, comprueba que el guion lo presente como hipótesis.
6. Escribe el resultado en `<carpeta>/verificacion.md` con el formato de `plantilla-verificacion.md`. Para cada ❌ o ⚠️, propón la
   corrección mínima. **No escribas la línea `VEREDICTO: APROBADO`** si queda alguna ❌ o ⚠️.

---

Después: el autor corrige o quita lo marcado, y el verificador (otra vez independiente) revisa solo lo que cambió, en una nueva ronda del
mismo archivo. Cuando todo es ✅, se agrega al final `VEREDICTO: APROBADO`.
