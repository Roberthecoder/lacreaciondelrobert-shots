# Protocolo de creación documental · La Creación del Robert

**Manda sobre cualquier otra guía para documentales, videos largos 16:9 y pitches.** Escrito el 3 nov 2026 a partir de los dos
videos que Robert aprobó: el **Core video #00** «¿Qué es La Creación del Robert?» (rama `largo-render/largo00-cine`, 86 commits,
5 rondas de correcciones de historia y 15+ de imagen) y el **pitch de Fungi Mati para MIT Solve 2027** (rama `largo-render/pitch-solve`,
enviado el 2 nov 2026). «Constelaciones» fue un experimento: no es modelo.

**Sirve para cualquier documental de cualquier tema** (ciencia, historia, un proyecto, una persona). Los dos modelos aportan la
técnica; su contenido (la vida de Robert, Fungi Mati) no se copia.

- **Motor y técnica de animación de cine (lo más valioso): `motor/cine/`** — kit con la versión más nueva y su manual
  `motor/cine/TECNICA.md`. Todo documental se anima con este kit, **no** con el kit infantil de los shots (`motor/kit/`).
- Detalle de producción (filtros, fórmulas, render): `documental-cine.md` y `pitch-convocatoria.md`.
- Solo si el documental es sobre Robert: hechos fijos en `correcciones-de-robert.md` §Core #00.
- `maestro/plantillas/documental/` es una copia vieja (1 nov); manda `motor/cine/`.

Regla de oro de Robert: **"Prefiero que quede bien de una a tener que volver a iterar."** Cada ronda de correcciones que se evita es
el objetivo. Por eso cada fase tiene un **candado**: no se pasa a la siguiente sin cumplirlo.

---

## 0. Antes de empezar
- Una rama `largo-render/<nombre>` (y `shots-largo/<nombre>` si habrá cortos verticales). Carpeta `largos/<clave>/`.
- Decidir con Robert: tipo (**documental** para el canal o **pitch** para convocatoria), idioma, duración y para quién es
  (público general → stickers de Robert; jurado → Robert en fotos reales, sin caricatura).
- Pitch: leer completas las bases de la convocatoria y lo que ofrece (no suponer qué pedirle).

## 1. Historia y datos (candado: lista de preguntas contestada)
1. Reunir TODO antes de escribir: `series/shot-robert/datos.md`, CVs, transcript del video 2023, formulario ya aprobado (pitch),
   entrevistas, documentos y fotos que Robert dé.
2. Hacer **una sola lista numerada de preguntas** con cada dato dudoso (fecha, nombre, cargo, lugar, lugar en un concurso, quién hizo
   qué, cómo se dice algo). Robert contesta con `<!-- reply -->`. **Nunca inventar, redondear ni "suponer lo lógico".** En el #00 las
   suposiciones costaron 5 rondas: "cibercafé" (era renta de cómputo), "vendedor" (emprendedor), "cargando" una papaya (la movía a
   empujones), "bote de café" (taza de bronce), "la beca de Mercedes-Benz" (fellowship), "con mis propios materiales" (se malinterpreta).
3. Cuidar cómo suena, no solo si es cierto: nada que pueda leerse mal ("robaba" → "tomaba prestadas", "me rendí" → "decidí
   inspirarme y aprender de otros", "inventé" → "implementé"). Nada que revele lo que Robert no quiere (ubicación de su casa, planes,
   temas familiares posteriores a 2025).
4. Pitch: **el video y el formulario dicen exactamente lo mismo.** Todo cambio en uno se copia al otro.

## 2. Guion (candado: Robert aprueba el guion completo)
- `guion_final.md` por capítulos (`## NN Título`), una frase por renglón. Narración en primera persona, con nexos entre ideas ("que
  no parezca bullet point"), humor ligero.
- Estructura: capítulo 0 = gancho (los 7 ganchos de `CLAUDE.md`; nunca abrir con fecha o historia) → capítulos = líneas de vida o
  pasos del problema/solución → cierre que **regresa a la imagen del inicio, transformada**.
- Pitch: máx. 3:00 (guion de ~2:55). Documental: 8–25 min.

## 3. Verificación de hechos (candado: `verificacion.md` con `VEREDICTO: APROBADO`)
- Igual que en los shots (`CLAUDE.md` §Verificación): **un subagente que no escribió el guion** revisa cada afirmación; tabla
  afirmación · veredicto · fuente · frase textual · año. Toda ❌/⚠️ se corrige o se quita y se vuelve a verificar.
- Datos de Robert: contra `datos.md`, sus documentos y sus respuestas (sólo ✅). Lo que no esté confirmado se le pregunta (§1).
- Datos científicos que se DIBUJAN también se verifican (no solo los que se dicen): germinación epígea del frijol (cotiledones arriba,
  epicótilo entre cotiledones y hojas verdaderas), sustrato colonizado completo (blanco) antes de que broten setas, inóculo blanco,
  nada de micelio sobre líquidos (vinazas), *Pleurotus ostreatus* var. *columbinus* gris de adulto, nombres científicos en cursiva.
- **Biografía de Robert:** él mismo es la fuente y el verificador de sus hechos (así se hizo el #00, ronda por ronda). Se anotan en
  `verificacion.md` como «✅ confirmado por Robert, <fecha>». Todo lo demás (ciencia, cifras, instituciones, historia) pasa por el
  verificador independiente, para descartar alucinaciones del que escribió el guion. Sin `verificacion.md` no hay render.

## 4. Storyboard y material (candado: Robert aprueba el storyboard)
- `storyboard.md`: escena por escena, qué se ve en cada frase. Robert lo aprueba ANTES de animar (en el pitch esto evitó rondas).
- **Foto real o ilustración fiel, nunca foto "por ilustrar".** Robert: "esas fotos nomás ilustraste por ilustrar". Si no hay foto
  correcta, se dibuja.
- Fotos de Robert: del archivo privado o las que él dé (Facebook/OneDrive con su sesión). Restaurar (Real-ESRGAN ×4 → GFPGAN si hay
  caras). Documentos y reconocimientos: pedir la versión HD, no usar una borrosa.
- Fotos de internet: solo con licencia libre (Wikimedia CC BY/BY-SA), metadatos y `CREDITOS.md`, créditos en pantalla y en la
  descripción. Equipo: la foto de la tienda donde Robert lo compró, no algo parecido.
- Logos oficiales de cada institución mencionada (`fuentes/logos/FUENTES.md`), **visibles y sin tapar** cuando se nombra.
- Repo público: solo las fotos que salen en el video.

## 5. Animación (candado: revisión cuadro por cuadro sin defectos)
Con el kit `motor/cine/` y su manual `TECNICA.md`. Estilo "documental de cine": `documental-cine.md` §3 (ilustraciones SVG con volumen, luz y texturas; cámara con paralaje; fotos en
marco con Ken Burns; tipografías Fraunces/Space Mono/Caveat/Archivo; acabado de película en ffmpeg).

**Lista de rigor contra errores de imagen** (sale de las 15+ rondas del #00; revisar TODA antes de mostrarle algo a Robert):
1. **Nada flotando:** cada objeto apoyado en algo (discos en su cajita, frascos en el estante, regadera agarrada del asa).
2. **Nada encimado ni atravesado:** lo que carga un personaje va al frente y debajo del cuello; ningún brazo tapa una cara; objetos
   que no se cruzan con bolsas o etiquetas.
3. **Anatomía y ropa correctas:** sin manos dobles, brazos cruzados bien hechos, cuello unido al cuerpo, cabello como en la foto real
   (papá rapado parejo, sin línea de calvicie), ropa que cubre (sin calzones a la vista).
4. **Personas en su lugar físico:** alguien en una puerta está en el umbral, delante del marco; reflejos alineados a los vidrios.
5. **Mapas reales:** contorno real del país/mundo, y **solo los lugares que dice la frase** (Guadalajara → Monterrey; nada de mostrar
   Bulgaria si no se menciona).
6. **Textos dentro de su marco**, legibles (fondo oscuro detrás de etiquetas), sin títulos que se crucen; si dos se cruzan, el que sale
   se desvanece.
7. **Subtítulo siempre libre:** ni stickers, ni objetos, ni personajes encima ("el niño de 'Me inspiran' arriba del subtítulo"). Con
   sticker abajo, el subtítulo se angosta; sobre fondos claros, franja oscura.
8. **Cero bugs:** nada se repite en bucle; al arreglar algo no cambiar su forma (el último salto mide igual que los demás).
9. **Nunca más de ~6 s sin que algo cambie**; todo monólogo lleva dibujo.
10. **Transiciones con fundido suave (~0.55 s)**, nunca corte seco.
11. Señalar en la foto lo que dice la voz (los libritos marcados son los suyos; Rise en el orden correcto de la historia).
12. Sticker de Robert acorde al tono (nunca la lengua de fuera en momentos serios).

Cómo revisar: `revisar-pitch.yml`/preview con capturas a la mitad de cada escena + hoja de contacto de todo el video + cuadro por
cuadro en las escenas tocadas. Cada corrección de Robert se convierte en una regla nueva aquí o en `correcciones-de-robert.md`.

## 6. Voz (candado: Robert aprueba animación al 100 % Y el costo)
- Prueba de 20 s antes del total; Robert elige modelo (eleven_v3 en el pitch: v4 sonaba "casi británico"; eleven_v4 en el #00).
- El texto para la voz puede diferir del subtítulo para pronunciar bien ("Fúngui Máti", "México" con acento).
- Avisar caracteres y créditos antes (#00 ≈ 19,300). Una petición por capítulo, en caché. **Nunca cancelar una generación a medias**
  (se perdieron ~5,170 créditos). Guardar siempre lo generado (`if: always()`).
- Después: tiempos desde la voz real (`TIEMPOS_VOZ`) y re-render. Partir una frase en dos líneas no gasta créditos si el texto
  unido queda idéntico.

## 7. Música y mezcla
- Música generada por código, **continua de principio a fin, sin bucles** (el #00 lleva 20 min originales), con el sintetizador de los
  shots: cama + arpegio con motivo por capítulo + nota en cada escena nueva + efectos por tipo de escena. Sin microcortes: acordes que
  se funden 1.6 s.
- **Mezcla oficial `motor/mezcla.json` (final −7.1 LUFS).** El −14 LUFS del pitch fue un error que Robert corrigió: no repetirlo.

## 8. Render
- Siempre en GitHub Actions, nunca en la PC de Robert. Pedazos en paralelo (20 s documental, 10 s pitch 4K), acabado de película por
  pedazo, unión sin recomprimir, Release.
- Con el repo de producción privado, el render corre en el repo público `lacreaciondelrobert-largos` vía el workflow
  `espejo-largos.yml` de cada rama (solo copia el workflow de render; voz y YouTube se quedan en el privado).
- Un commit vacío no lanza el render. apt se cuelga: límites y reintentos ya están en el workflow.

## 9. Cortos verticales del documental
- 3–13 fragmentos de 61–75 s (el #00 hizo 13) en `shots-largo/<nombre>`: cada uno con **gancho propio**, subtítulos grandes,
  cierre con logo, misma voz y mezcla oficial, y cierre que invita al documental completo. Se entienden solos.
- `verticales/publicacion.md` con textos por red, etiqueta de contenido con IA (la voz es clonada) y comentario fijado con el enlace
  al documental cuando sea público.

## 10. Publicación (candado: permiso de Robert para ESA publicación)
- `publicacion.md` con `## YouTube`: título, descripción con **capítulos** (marcas de tiempo), guion completo y créditos de fotos;
  ≤ 5000 bytes, sin `<` `>`. Duración final anotada.
- Pitch: **no listado** (Robert: "no me gusta revelar mis planes"). Formulario: Robert inicia sesión; guardar con «Save & Continue»;
  **nunca Submit sin su permiso explícito**; respuestas finales guardadas en la rama (`solicitud/RESPUESTAS_ENVIADAS.md`).
- Subir a la Sala (sección Documentales, `largo: true`, `idioma`) y mandar el video al chat.

## 11. Cierre de cada documental
- Todo en git (nada solo en la carpeta local de una sesión): guion, verificación, storyboard, escenas, fotos usadas, voz, música,
  `publicacion.md`, estado en `RENDERS.md`.
- Nuevas lecciones → este archivo; nuevos hechos de Robert → `correcciones-de-robert.md`.

## Estado de los modelos (3 nov 2026)
- **Core video #00:** aprobado por Robert; su biografía la verificó él mismo (exento de `verificacion.md`). Voz eleven_v4 generada; 13 verticales hechos.
- **Pitch MIT Solve:** aprobado y enviado (2 nov 2026). Video 4K en YouTube no listado. Respuestas finales en la rama.
