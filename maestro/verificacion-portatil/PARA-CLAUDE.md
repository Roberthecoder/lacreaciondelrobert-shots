## Verificación de hechos (obligatoria, ANTES de animar)

Robert: «No me importa que el guion no siempre traiga citas, pero SIEMPRE, SIEMPRE tiene que ser verídico.»
Las reglas completas están en `verificacion/PROTOCOLO.md`. Resumen del orden fijo para todo video:

1. **Primero el guion** (texto + lo que se verá en pantalla), sin animación.
2. **Verificación independiente:** lanza un subagente (Task/Agent) que NO escribió el guion, con el encargo de
   `verificacion/ENCARGO-VERIFICADOR.md`.
3. Escribe `videos/<clave>/verificacion.md` con la tabla de `verificacion/plantilla-verificacion.md`
   (afirmación · veredicto · fuente · frase textual · año).
4. Toda ❌ o ⚠️ se corrige o se quita, y se vuelve a verificar. Las hipótesis se dicen como hipótesis.
5. Solo cuando todo es ✅, la última línea del archivo es `VEREDICTO: APROBADO` y se construye la animación.
   El render no arranca sin esa línea (`verificacion/candado.sh`).
6. **Números:** cada cifra se verifica abriendo la fuente original y encontrando ahí la cifra exacta; toda cifra dice de qué es, según
   quién y de qué año. Si no se puede verificar, no se usa.
7. Lo que se dibuja y afirma algo (formas, mapas, escalas, etiquetas) también se verifica.
8. Datos personales de Robert: solo los que él confirmó («✅ confirmado por Robert, <fecha>»); si falta uno, se le pregunta.
