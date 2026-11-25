# Encargo para un chat local: poner TikTok al día desde el celular

Pega esto completo en un chat de Claude en tu computadora (Claude Code o Claude Desktop), con el celular conectado
(modo desarrollador y depuración USB o inalámbrica ya activados, como en la prueba anterior).

---

Eres mi asistente para TikTok de «La Creación del Robert». Mi celular Android está conectado con depuración activada.

**Preparación (instala lo que falte en mi computadora, sin pedirme pasos técnicos):**
1. Instala `adb` (Android platform-tools) y `scrcpy` si no están. Comprueba con `adb devices` que el celular aparece
   como «device». Si dice «unauthorized», dime que acepte el aviso en la pantalla del celular y espera.
2. Clona o actualiza el repositorio `Roberthecoder/lacreaciondelrobert-shots` (con `gh`, que ya tengo con sesión).

**Qué publicar (reglas, no las cambies):**
- Solo claves que estén en `publicar/finales.txt` (versiones finales revisadas). Nunca otra.
- Usa el calendario: `python3 calendario/fecha.py lista 30` dice qué sale cada día. Lo de HOY se publica hoy.
- Lo atrasado (de días anteriores que no salió en TikTok): **no lo publiques todo de golpe**. Máximo 1 video atrasado
  extra por día, del más viejo al más nuevo, y antes de empezar enséñame la lista y espera mi «sí».
- El video: `gh release download borradores-voces-v4 -p "<clave>_narrado.mp4"` (versión final narrada).
- El texto: la sección «TikTok» de `shots/<clave>/publicacion.md` (título + descripción + hashtags).

**Cómo publicar desde el celular:**
1. Copia el MP4 al celular: `adb push <clave>_narrado.mp4 /sdcard/DCIM/Robert/` y avisa a la galería
   (`adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/DCIM/Robert/<archivo>`).
2. Abre TikTok y sube el video desde la galería. Ve lo que pasa en pantalla con `adb exec-out screencap -p` (o scrcpy)
   y toca con `adb shell input tap/swipe/text`. Pega el texto con el portapapeles (no letra por letra).
3. Si TikTok ya tiene en Bandeja/Borradores el mismo video que mandó el publicador automático, usa ese borrador en vez de
   subirlo otra vez, y bórralo de borradores al publicar para no duplicar.
4. Antes de tocar «Publicar», mándame una captura de la pantalla final (video, texto, portada) y espera mi «sí» la
   primera vez; después de la primera, publica solo los que yo haya aprobado en la lista.
5. Para los días siguientes, si TikTok deja **programar** (TikTok Studio en la web, hasta ~10 días), programa los
   próximos días a las 9:07 am en vez de publicar ahora.

**Nunca:** publicar algo fuera de `finales.txt`, publicar más de lo acordado, borrar videos ya publicados, cambiar mi
perfil o contraseña, dar likes, seguir cuentas ni responder comentarios. Si algo pide contraseña o pago, detente y avísame.

Al final, dame una lista: qué quedó publicado, qué quedó programado y para cuándo, y qué falta.

---

**Nota para que sea automático de verdad:** el publicador ya sube TikTok solo, pero TikTok lo manda como borrador
porque la app todavía no tiene aprobada la «publicación directa» (Content Posting API → Direct Post, auditoría de la
app en developers.tiktok.com). Cuando TikTok la apruebe, ya no hará falta este chat.
