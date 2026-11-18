# Kit de verificación de datos (portátil)

El sistema de verificación de hechos de La Creación del Robert, separado de todo lo demás (animación, voz, música, publicación),
para usarlo en cualquier otro sistema de video. No depende del estilo de animación: funciona sobre el **guion** y sobre la lista de
**lo que se dibuja**, antes de animar.

Regla de origen (Robert, 27 oct 2026): «No me importa que el guion no siempre traiga citas, pero **SIEMPRE, SIEMPRE tiene que ser
verídico**.»

## Qué trae
| Archivo | Para qué |
|---|---|
| `PROTOCOLO.md` | Las reglas completas: orden fijo, veredictos, regla de los números, hipótesis, datos personales, lo dibujado. |
| `ENCARGO-VERIFICADOR.md` | El encargo exacto que se le da al subagente verificador (copiar y pegar). |
| `plantilla-verificacion.md` | El formato de `verificacion.md` (tabla + conteo + línea final). |
| `candado.sh` | Revisión automática: falla si un video no tiene `VEREDICTO: APROBADO` (para CI o para correr a mano). |
| `candado-github.yml` | El mismo candado como paso de GitHub Actions, listo para pegar en un workflow de render. |
| `PARA-CLAUDE.md` | El bloque de instrucciones para el `CLAUDE.md` del sistema nuevo. |
| `ejemplo/` | Un caso real aprobado (Fungi Mati #144): `guion.md` y su `verificacion.md`. |

## Cómo instalarlo en el sistema nuevo (5 minutos)
1. Copia esta carpeta completa al repo nuevo, por ejemplo como `verificacion/`.
2. Pega el contenido de `PARA-CLAUDE.md` en el `CLAUDE.md` del repo nuevo (ajusta la ruta de la carpeta de cada video si no es `videos/<clave>/`).
3. En el workflow que renderiza, antes del render, agrega el paso de `candado-github.yml` (o llama `bash verificacion/candado.sh <carpeta>`).
4. Si el sistema nuevo ya tiene videos viejos sin verificar, pon sus claves en `verificacion/exentos.txt` (una por línea) para que el
   candado no los bloquee. Los nuevos siempre pasan por el verificador.

Lo único que el sistema nuevo tiene que respetar es el **orden**: guion → verificación independiente → `VEREDICTO: APROBADO` → animación.
