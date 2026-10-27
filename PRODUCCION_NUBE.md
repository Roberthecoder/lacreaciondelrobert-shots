# Producción en la nube (sin prender tu computadora)

Desde el 27 oct 2026 los shots se escriben y se renderizan solos en la nube:

1. Tú abres una o varias **sesiones de Claude en la nube** y les pegas un encargo.
2. Cada sesión trabaja en su propia rama, escribe los shots y hace *push* a GitHub.
3. Con cada *push*, GitHub **renderiza solo** los shots que cambiaron (workflow `Render automático`).
4. Los videos aparecen en **Releases → "Borradores · nombre-de-la-rama"**. Tú los ves desde el celular.
5. Si te gusta un guion, **apruebas la voz** y el siguiente render ya sale narrado.

No hay que apretar "Run workflow" ni aprobar nada en GitHub. Nada se publica en redes.

---

## 1. Lanzar sesiones de Claude en la nube

1. Entra a **claude.ai/code** (computadora o celular).
2. **New session** → elige **Cloud** (no "Local").
3. Repositorio: **Roberthecoder/lacreaciondelrobert-shots**, rama base **main**.
   - La primera vez te pide conectar GitHub a Claude: es una sola vez.
4. Pega el encargo (plantilla abajo) y envíalo. Puedes cerrar la pestaña: la sesión sigue sola.
5. Repite para cada lote. Recomendado: **un lote = 5 shots de una misma serie**, y que dos sesiones
   no trabajen la misma serie al mismo tiempo (así no eligen temas parecidos).

## 2. Plantilla de encargo por lote

Copia, cambia lo que está entre `< >` y pega:

```
Lote <E> · Serie <Shot Fungi Mati> · <5> shots nuevos, numerados desde #<05>.

Lee CLAUDE.md, ESTADO.md, CANAL.md y PRODUCCION_NUBE.md antes de empezar.
Trabaja en la rama de esta sesión (la que te asigna la nube) y haz push al terminar cada shot.

Para cada shot:
1. Tema: corre `git fetch origin` y `node historial/consolidar.mjs --buscar "<palabras>"`;
   elige algo que no exista ni se parezca. <Ideas o temas que quiero, si tengo: ...>
2. Aparta el tema en historial/nuevos/<tu-rama-con-guiones>.json con estado "idea" y haz push.
3. Formato narrado + gemelo mudo del RECETARIO, gancho de los 7 de CLAUDE.md, fuentes verificadas.
4. Constrúyelo con el kit, revisa cuadros con preview.mjs (no renderices MP4 completos tú: lo hace GitHub).
5. narracion.json con "mudo" y SIN "voz_aprobada" (la voz la apruebo yo).
6. Push. Revisa que el run de "Render automático" de tu rama termine bien; si falla, corrige y vuelve a hacer push.
7. Actualiza tu archivo de historial/nuevos/ con estado "renderizado", fuentes y 2–3 derivados.

No uses la API de Claude ni ElevenLabs, no publiques nada y no toques main ni las ramas de otros lotes.
Al final dame: lista de shots, enlace al Release de borradores y los caracteres de voz de cada guion.
```

## 3. Dónde ver los videos

- **En el chat de la sesión:** al terminar cada render, la sesión de nube te manda los MP4 ahí mismo (los baja de la
  rama automática `videos/<rama>`, que GitHub llena sola). Ver "Videos al chat" en `CLAUDE.md`.

- **Releases del repositorio:** https://github.com/Roberthecoder/lacreaciondelrobert-shots/releases
  Hay un Release por rama, llamado **"Borradores · <rama>"**. Cada shot sube ahí:
  - `<shot>_mudo.mp4` (gemelo mudo) o `<shot>_sin_voz.mp4`,
  - `<shot>_narrado.mp4` si la voz está aprobada,
  - `<shot>_publicacion.md`: **los textos para copiar están junto a cada video en el Release**
    (título y descripción para TikTok, Instagram, YouTube y Facebook). La tabla de las notas del
    Release también enlaza cada `publicacion.md`. Si solo cambias ese texto, se actualiza sin volver a renderizar el video.
  Si el shot se vuelve a renderizar, el video se reemplaza por el nuevo.
- También en **Actions → Render automático → el run → Artifacts** (solo 3 días).
- Desde el celular: la app de GitHub abre los Releases y reproduce o descarga los MP4.

## 4. Aprobar la voz

La voz clonada cuesta ~940 créditos de ElevenLabs por shot, así que **solo se genera cuando tú lo dices**.

- Opción fácil: dile a la sesión de ese lote *"apruebo la voz de bio-10 y bio-12"*.
  Ella pone `"voz_aprobada": true` en el `narracion.json` de esos shots y hace push.
- Opción a mano: en GitHub abre `shots/<shot>/narracion.json` en la rama del lote, botón del lápiz,
  agrega la línea `"voz_aprobada": true,` debajo de la primera llave `{` y guarda (*Commit changes*).

Con eso el render siguiente sale también **narrado**. La voz queda guardada en `shots/<shot>/voz/`:
los siguientes renders **no vuelven a gastar créditos** salvo que cambie el texto del guion.
(Después de generar la voz, GitHub hace un commit en la rama; si una sesión sigue trabajando ahí,
hace `git pull` antes de su siguiente push.)

## 5. Límites

**Minutos de GitHub Actions.** Cada versión tarda ~5 min (un shot con mudo + narrado, ~10 min).
| Repositorio | Minutos al mes | Alcanza para |
|---|---|---|
| Privado, plan Free | 2,000 | ~400 videos sin voz o ~200 shots con las dos versiones |
| Privado, plan Pro ($4 USD/mes) | 3,000 | ~600 sin voz / ~300 completos |
| **Público** | **ilimitados** (runners normales) | sin límite práctico |
Al acabarse los minutos, los renders se detienen hasta el mes siguiente (GitHub no cobra si no
pusiste método de pago). Se ven en *Settings → Billing → Usage*.
Hasta 20 renders corren al mismo tiempo; los demás esperan su turno.

**Espacio.** Los videos de los Releases no cuentan contra el límite. Los *artifacts* sí (500 MB en Free):
por eso duran solo 3 días.

**Créditos de ElevenLabs.** Solo se gastan al aprobar voz (ver CANAL.md: ~20 narrados con lo que queda).

**Sesiones de Claude.** Usan tu suscripción; muchas sesiones a la vez gastan el límite más rápido.

## 6. Cuando un lote está listo

1. Revisa los videos en su Release.
2. Pide a una sesión: *"mezcla la rama del lote E a main y corre node historial/consolidar.mjs"*.
   Al mezclar, si `historial/temas.json` choca, se queda la versión de main y luego se consolida.
3. Si no quieres que un *push* renderice (por ejemplo, solo cambiaste un texto), pon `[sin render]`
   en el mensaje del commit.

## Cómo funciona por dentro (para Claude)

- `.github/workflows/auto-render.yml`: se activa con push a cualquier rama que toque `shots/**`.
  Compara contra el último commit que se renderizó completo en esa rama (anotado como
  `ultimo-render:` en las notas del Release), si no contra el commit anterior del push, y si la rama es
  nueva contra `main`. Renderiza en paralelo (máx. 20) cada `shots/<carpeta>` con `narracion.json`
  (las que empiezan con `_` se saltan). Si un render falla, no se anota el commit y el siguiente push lo
  reintenta.
- Sin voz: si `narracion.json` trae `"mudo": { "dcHtml", "audio" }` renderiza el gemelo mudo; si no, la base
  con `gen-audio.mjs`. Narrada: solo con `"voz_aprobada": true`; modelo = `"modelo"` de narracion.json, o el
  de la voz ya guardada, o `eleven_v4`.
- Release: tag `borradores-<rama con / cambiadas por ->`, creado con `GITHUB_TOKEN` (prerelease).
- Banco de temas: `historial/temas.json` + `historial/nuevos/*.json` + `historial/consolidar.mjs`.
- `renderizar.yml` (botón manual) sigue funcionando igual.
