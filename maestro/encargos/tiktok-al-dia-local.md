# Encargo para un chat local: poner TikTok al día desde el celular

Pega esto completo en un chat de Claude en tu computadora (Claude Code o Claude Desktop), con el celular conectado
(modo desarrollador y depuración USB o inalámbrica ya activados, como en la prueba anterior).

---

Eres mi asistente para TikTok de «La Creación del Robert». Mi celular Android está conectado con depuración activada.

**Preparación (instala lo que falte en mi computadora, sin pedirme pasos técnicos):**
1. Instala `adb` (Android platform-tools) y `scrcpy` si no están. Comprueba con `adb devices` que el celular aparece
   como «device». Si dice «unauthorized», dime que acepte el aviso en la pantalla del celular y espera.
2. Clona o actualiza el repositorio `Roberthecoder/lacreaciondelrobert-shots` (con `gh`, que ya tengo con sesión).

**Qué publicar (decisión de Robert, 25 nov 2026): dejar TikTok exactamente igual que YouTube, todo de una vez.**
- La lista de lo que ya salió en YouTube está en la bitácora del publicador:
  `git fetch origin refs/estado/publicaciones && git show FETCH_HEAD:publicaciones.json` → filas con `"red": "youtube"`,
  `"modo": "real"` y `"ok": true` (clave y fecha). Ábrelo también en youtube.com/@lacreaciondelrobert/shorts para confirmar.
- Revisa mi perfil de TikTok y anota qué de esa lista YA está publicado ahí. Lo que falte es lo pendiente.
- **Publica TODO lo pendiente ahora mismo, del más viejo al más reciente** (por fecha de YouTube). No me pidas confirmar la
  lista: ya lo autoricé. Solo detente si algo falla o pide contraseña o pago.
- **Mismo video que en YouTube:** usa el BORRADOR que el publicador automático ya mandó a TikTok para esa clave (Bandeja o
  Borradores de TikTok): es el mismo archivo que salió ese día en YouTube. Solo si un borrador no existe, usa
  `gh release download borradores-voces-v4 -p "<clave>_narrado.mp4"` y dímelo en el resumen.
- **Mismo texto:** la sección «TikTok» de `shots/<clave>/publicacion.md` (título + descripción + hashtags).
- No publiques nada que no haya salido ya en YouTube. De ahí en adelante el publicador sigue mandando el borrador diario;
  si te lo pido otro día, haces lo mismo con lo que se acumule.

**Cómo publicar desde el celular:**
1. Abre TikTok. Ve lo que pasa en pantalla con `adb exec-out screencap -p` (o scrcpy) y toca con
   `adb shell input tap/swipe/text`. Pega el texto con el portapapeles (no letra por letra).
2. Abre el borrador de esa clave, pega el texto y publica. Al publicar, ese borrador desaparece: así no hay duplicados.
3. Si tuviste que bajar el MP4: `adb push <clave>_narrado.mp4 /sdcard/DCIM/Robert/`, avisa a la galería
   (`adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/DCIM/Robert/<archivo>`) y súbelo.
4. Después de cada publicación revisa en el perfil que salió bien antes de seguir con el siguiente.

**Nunca:** publicar algo que no haya salido ya en YouTube, borrar videos ya publicados, cambiar mi
perfil o contraseña, dar likes, seguir cuentas ni responder comentarios. Si algo pide contraseña o pago, detente y avísame.

Al final, dame una lista: qué quedó publicado (en orden), si alguno no tenía borrador y qué falta, si falta algo.

---

**Nota para que sea automático de verdad:** el publicador ya sube TikTok solo, pero TikTok lo manda como borrador
porque la app todavía no tiene aprobada la «publicación directa» (Content Posting API → Direct Post, auditoría de la
app en developers.tiktok.com). Cuando TikTok la apruebe, ya no hará falta este chat.
