# Pase a mano del estilo cine en una sesión de nube (una sesión por grupo)

Eres una sesión de Claude Code en la nube con el repositorio `lacreaciondelrobert-shots`. Te toca UN grupo de shots:
`maestro/re-render-cine/nube/<grupo>.txt` (el nombre del grupo, como g03 o h117, te lo dice quien te lanzó). Otras sesiones trabajan otros grupos al mismo
tiempo, así que solo tocas las carpetas `shots/<clave>/` de tu lista y tu archivo de avance.

## Preparación
1. `git checkout main && git pull --rebase origin main`.
2. `cd motor && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci && cd ..` (el motor usa el Chrome ya instalado: todos los
   comandos llevan `NAVEGADOR=chrome`; si no existe Chrome, `npx playwright install chromium` y quita `NAVEGADOR`).
3. Lee completos: la sección «Modo cine» de `CLAUDE.md`, `maestro/recetas/estilo-cine.md`,
   `maestro/recetas/pase-a-mano-cine.md` y `maestro/re-render-cine/encargo-pase.md` (ese último es tu encargo, al pie de la letra).
4. Mira cómo quedaron dos shots ya hechos: saca su hoja de cuadros de `shots/qui-08-cebolla` y `shots/amb-04-barrenador`
   y mírala. Ese es el nivel: sujeto que llena el cuadro, fondo oscuro, nada entra tarde, barras de escala recalculadas.

## Trabajo
Son pocos shots por sesión a propósito: Robert quiere el máximo detalle en cada uno, no velocidad por shot. Para cada shot de tu lista, en orden: el encargo completo de `encargo-pase.md` (auditor, hoja de cuadros de TODO el shot
y MIRARLA, arreglar en el .jsx propio, volver a auditar y volver a mirar). Con el mismo rigor en el primero que en el último.
Al terminar CADA shot:
- `git add shots/<clave>` (solo esa carpeta) y commit con mensaje `Pase a mano: <clave> [sin render]`. El `[sin render]` es
  obligatorio: sin él GitHub lanza renders.
- Añade una línea a `maestro/re-render-cine/nube/<grupo>-hecho.md`: `- <clave>: <qué escenas arreglaste>; pendiente: <lo que no>`
  y súbela en el mismo commit.
- `git pull --rebase origin main && git push origin main`; comprueba con `git ls-remote origin refs/heads/main` que tu
  commit llegó (git a veces ignora el push). Si falla, repite el pull --rebase y el push.

## Límites
No cambies narracion.json, guion.md, verificacion.md, publicacion.md, los .dc.html, audio, kits ni cine.jsx. No cambies
tiempos. No agregues datos, cifras ni nombres en pantalla. No generes voz, no publiques nada, no renderices MP4 completos,
no toques la rama voces/v4 ni la Sala. No uses la API de Claude. Si un shot no carga o algo no se puede resolver, anótalo en
tu archivo de avance y sigue con el siguiente.
