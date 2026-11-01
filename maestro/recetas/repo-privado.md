# Receta · Pasar el repo de producción a PRIVADO sin romper las API (pedido de Robert, 1 nov 2026)

**Por qué:** `Roberthecoder/lacreaciondelrobert-shots` es público: cualquiera puede bajar todos los videos (Releases, `refs/videos/*`),
guiones y fotos. **Por qué no basta con cambiarlo a privado:** (1) el sitio de privacidad/términos y la verificación de TikTok viven en
GitHub Pages de este repo (https://roberthecoder.github.io/lacreaciondelrobert-shots/), que en cuenta gratis se apaga al volverse
privado, y Meta, Google/YouTube, LinkedIn y TikTok tienen registradas esas URL (y el redirect de TikTok); (2) Instagram y Threads
publican bajando el MP4 de una **URL pública** (hoy, el Release del repo).

## Estado (1 nov 2026)
- HECHO: repo público `Roberthecoder/roberthecoder.github.io` creado (solo README). Workflow `sitio-publico.yml` (copia `docs/` a
  `lacreaciondelrobert-shots/` del repo público) y paso «Copia pública temporal del video» en `publicar.yml` (Instagram/Threads).
  Ambos esperan el secreto `PUBLICO_TOKEN`; sin él, `publicar.yml` funciona igual que antes.
- FALTA (Robert): crear `PUBLICO_TOKEN`. Luego (maestro): correr `sitio-publico.yml`, revisar las páginas, publicar en modo `prueba`,
  presupuesto de Actions en $0 y pasar a privado.

## Plan (no cambia ninguna URL registrada en las API)
1. **Repo público nuevo `Roberthecoder/roberthecoder.github.io`** (sitio de usuario de GitHub Pages, sirve en `https://roberthecoder.github.io/`).
   Dentro, la carpeta **`lacreaciondelrobert-shots/`** con una copia exacta de `docs/` de este repo (index, privacidad, términos,
   tiktok.html, el `.txt` de verificación de TikTok, icono, estilo, `revisiones/`). Mientras el repo de producción tenga su propio
   Pages, ese gana; cuando se vuelva privado y su Pages se apague, la carpeta del sitio de usuario sirve **las mismas URL**.
   Nada de videos, guiones ni fotos en este repo. Activar Pages (rama main, raíz).
2. **Verificar** antes de seguir: con el Pages del repo de producción ya apagado (paso 4) abrir
   `https://roberthecoder.github.io/lacreaciondelrobert-shots/`, `/privacidad.html`, `/terminos.html`, `/tiktok.html` y el `.txt` de TikTok.
   Si algo da 404, regresar el repo a público (es reversible) y corregir.
3. **Videos públicos para Instagram/Threads** (los únicos que bajan por URL): en `motor/redes/publicar.py`, antes de publicar en esas redes,
   subir el MP4 del día a un Release temporal `publicar-tmp` del repo público y usar esa URL; borrarlo al terminar (en éxito o error).
   Requiere un secreto nuevo en el repo de producción: **`PUBLICO_TOKEN`** (token fino de GitHub con permiso *Contents: read & write*
   SOLO sobre `roberthecoder.github.io`). Lo crea y pega Robert (GitHub → Settings → Developer settings → Fine-grained tokens).
   Probar con `publicar.yml` modo `prueba` y luego `privado` antes de cualquier `real`.
4. **Cambiar a privado** (Settings → General → Danger Zone → Change visibility). Hacerlo **después de las publicaciones del día**
   (revisar `publicar/diario.log`) y con los pasos 1–3 listos. El nombre del repo NO cambia: sesiones de nube, rutinas, remotos y la Sala siguen igual.
5. **Minutos de GitHub Actions:** en privado los renders gastan los minutos de la cuenta (gratis: 2,000 min/mes; estos días se gastaron el
   equivalente a ~$130 USD que fueron gratis por ser público). Antes del paso 4: Settings → Billing → presupuesto de Actions en **$0** (para
   que nunca cobre) y decidir con Robert: renders más ligeros, plan Pro, o volver a un repo público solo para renders. El render paralelo de
   documentales (decenas de máquinas) es el que más gasta.
6. **Después:** `refs/videos/*`, Releases y todo el historial quedan privados. Los videos ya publicados en redes siguen públicos (son de
   las redes). Actualizar `maestro/INVENTARIO.md` y `ESTADO-ADMIN.md`.

## Quién hace qué
- Maestro de nube: pasos 1, 3, 6 (git) y la verificación del paso 2 (WebFetch o navegador remoto).
- Robert (en el navegador): crear `PUBLICO_TOKEN`, presupuesto de Actions en $0, y el clic de cambiar visibilidad (o el maestro con el
  navegador de la PC, con Robert presente, porque GitHub pide confirmar con la contraseña).
- Reversible: volver a público en cualquier momento desde Settings.
