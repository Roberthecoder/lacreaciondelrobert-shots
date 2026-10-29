# Shot IA #20 · TikTok no te lee la mente: te mide

- **Serie:** Shot IA · **Logo:** IA (brillitos) · **Badge:** #20 · rama `pedido300/ia`.
- **Estado (29 oct 2026):** fase A — guion listo para verificación independiente. Falta: verificación, animación, Robert en pantalla y `publicacion.md` · **voz pendiente de aprobación de Robert**.
- **Formato:** N1 "Por dentro" (cómo decide el algoritmo, por dentro de la máquina) + N6 "Guía en pasos" (tres pasos para reiniciar tu Para ti, sacados de la página oficial de TikTok).
- **Gancho (de los 7):** #1 "Esto no es X: es Y" sobre el celular que se ve en pantalla: «No es que TikTok te lea la mente: es que te mide».
- **Duración:** voz 950 caracteres / ~187 palabras (≈ 58.3 s) + cierre 3.5 s → **61.8 s** estimados (`estimar-escenas.mjs`).
- **Postura de la serie:** ni defensa ni ataque: explicar con la fuente oficial cómo funciona y dar un consejo útil y verificado. No se afirma ni se niega que el celular "escuche": no se toca ese mito.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | No es que TikTok te lea la mente: es que te mide. Cada video que terminas o saltas es un voto. | Fondo rosa; desde el cuadro 0 un celular con un pulgar que desliza videos. Encima de la cabeza del usuario, una "bola de cristal" que se tacha y se vuelve una regla/cronómetro. Cada video que pasa suelta una boleta ✔ (terminado) o ✖ (saltado) a una urna. |
| 1 | Senales | Según su página oficial, usa lo que ves, terminas o saltas, a quién sigues y el audio y hashtags del video. | Fichas que vuelan a un embudo: "visto", "terminado", "saltado", "sigues a…", "🎵 audio", "#hashtags". Recorte "TikTok · Recommendation system". |
| 2 | Peso | Y no todo vale igual: en 2020 TikTok dijo que acabar un video largo pesa más que estar en el mismo país que su autor. | Balanza: platillo pesado "video largo visto completo" contra platillo ligero "mismo país" (banderita). Recorte "TikTok Newsroom · 2020". |
| 3 | Ranking | Calcula qué tan probable es que le des like o lo saltes, y arriba pone el de más puntos. | Por dentro de la máquina (fondo oscuro con circuito): cinco miniaturas con puntajes (ilustrativos) que se ordenan; la de más puntos sube al celular. |
| 4 | Pregunta | ¿Y si ya te atrapó en videos que no quieres? | **Re-gancho.** El celular dentro de un remolino de videos iguales; "?" gigante; Robert grande. |
| 5 | Paso1 | Paso uno: deja presionado el video y elige «No me interesa». | Contador grande "1"; dedo que mantiene presionado; menú con "No me interesa" que se ilumina. |
| 6 | Paso2 | Paso dos: filtra palabras o hashtags. | Contador "2"; un colador que deja fuera fichas "#palabra". |
| 7 | Paso3 | Paso tres: refresca tu Para ti: te trata como si fueras nuevo. | Contador "3"; flechas de refrescar; el feed se vacía y aparece una etiqueta "cuenta nueva". |
| 8 | Estudio | En 2024, un equipo de Europa y Estados Unidos analizó datos donados por trescientos cuarenta y siete usuarios. | Tarjeta "2024 · Vombatkere, Mousavi, Zannettou, Roesner y Gummadi · The Web Conference (Singapur)"; mapa con banderas de EE. UU., Alemania y Países Bajos; 347 cajitas de datos que llegan. |
| 8 | Estudio | Lo que más personalizaba su Para ti: dar like y seguir cuentas. | Dos barras que crecen: "❤ like" y "+ seguir" marcadas "impacto alto". |
| 9 | Explora | De sus primeros mil videos, solo treinta a cincuenta de cada cien seguían sus gustos; el resto, a explorar. | Cuadrícula de 100 miniaturas: 30–50 se pintan del color "tus gustos" (rango marcado), el resto con una brújula "explorar". |
| 10 | Cierre | Así que no te lee la mente: tú se la enseñas con cada dedazo. | **Regreso a la imagen del inicio:** el mismo celular y pulgar; la bola de cristal tachada, la urna llena de boletas ✔/✖ que llevan la huella del dedo. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de IA y Robert apuntando a cámara. |

**Música:** cama grave continua con un pulso suave tipo "scroll"; cada deslizamiento hace un swish; cada boleta cae con un clic; la balanza baja con un golpe sordo; los puntajes suben con tics; el menú "No me interesa" con un toque; el colador con un shhh; refrescar con un barrido ascendente; la cuadrícula se pinta como tecleo; cierre con un acorde que se abre.

## Fuentes (cada dato se abrió en la fuente original el 29 oct 2026)

1. TikTok. "How TikTok recommends content / Recommendation system" (Centro de seguridad y transparencia de TikTok, página vigente; pie © 2025, consultada 29 oct 2026). https://www.tiktok.com/safety/en/policies-and-engagement/recommendation-system
   > "Videos you've recently interacted with, including those you watched, finished, liked, or skipped. Your follow relationships with other people on TikTok."
   > "we also take into account various signals about the video, including: … The video's soundtrack. The length of the video. The hashtags associated with the video."
   > "Predictions estimate the likelihood you will interact with a given video; for example, the probability of liking, sharing, commenting, or skipping a given video. By combining prediction scores for each of these interactions, we can arrive at an overall score for each video"
   > "The ranking process sorts videos by their prediction scores, from high to low of the likelihood you'll enjoy the video."
   > "Not interested: You can long-press on the video in your For You feed and select 'Not interested' from the pop-up menu. This will let us know you are not interested in this type of content and we will limit how much of that content we recommend in your feed."
   > "Video keyword filters: You can add keywords – both words or hashtags – you'd like to filter from your For You feed."
   > "For You refresh: To help you discover new content, you can refresh your For You feed, enabling you to explore entirely new sides of TikTok."
2. TikTok Newsroom. "How TikTok recommends videos #ForYou" (18 de junio de 2020). https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you
   > "User interactions such as the videos you like or share, accounts you follow, comments you post, and content you create. Video information, which might include details like captions, sounds, and hashtags."
   > "A strong indicator of interest, such as whether a user finishes watching a longer video from beginning to end, would receive greater weight than a weak indicator, such as whether the video's viewer and creator are both in the same country."
3. TikTok Newsroom. "Introducing a way to refresh your For You feed on TikTok" (16 de marzo de 2023). https://newsroom.tiktok.com/en-ie/safeguarding-recommendations-update
   > "When enabled, this feature allows someone to view content on their For You feed as if they just signed up for TikTok. Our recommendation system will then begin to surface more content based on new interactions."
   > "people can choose to automatically filter out videos that use specific hashtags or phrases from their For You feeds, and say "not interested" to skip future videos from a particular creator or that use a particular sound."
4. Vombatkere, K., Mousavi, S., Zannettou, S., Roesner, F. y Gummadi, K. P. "TikTok and the Art of Personalization: Investigating Exploration and Exploitation on Social Media Feeds". *Proceedings of the ACM Web Conference 2024 (WWW '24)*, 13–17 de mayo de 2024, Singapur. DOI 10.1145/3589334.3645600 · arXiv 2403.12410 (texto completo). Boston University y University of Washington (EE. UU.), Max Planck Institute for Software Systems (Alemania), TU Delft (Países Bajos).
   > "They implemented a privacy-preserving data donation system and recruited 347 TikTok users that donated their TikTok traces."
   > "our results show that liking and following are the primary drivers of personalization."
   > "we conclude that TikTok's algorithm exploits real users' interests in between 30% and 50% of all recommended videos in the first thousand videos of the users' tenure on TikTok."
   > "this finding indicates that the TikTok algorithm opts to recommend a large number of explore videos in an attempt to either infer better the user interests or maximize user retention"

## Notas
- «No me interesa» es la traducción del botón "Not interested" (traducción nuestra; el texto exacto del menú en español puede variar según la versión de la app).
- "Te trata como si fueras nuevo" = "as if they just signed up for TikTok" (2023). La página vigente (fuente 1) confirma que la opción de refrescar sigue existiendo.
- El dato del peso (video largo completo > mismo país) es de 2020 y así se dice en la voz.
- Estudio: los 347 usuarios donaron sus datos (gracias al derecho de acceso del reglamento europeo GDPR). El 30–50 % "explotación" se calculó en los 220 usuarios con al menos mil videos y ya descontando el ruido; "el resto, a explorar" = videos que el marco del estudio clasifica como exploración (no basados en sus gustos conocidos). Es una estimación del estudio, no un dato oficial de TikTok.
- "Lo que más personalizaba: dar like y seguir cuentas" es la conclusión textual del estudio (comparación entre usuarios muy y poco personalizados; impacto "alto" para like y seguir, "medio" para porcentaje visto). No contradice a TikTok: el tiempo visto sí cuenta, pero en esos datos el like y el seguir marcaron más diferencia.
- Los puntajes de la escena "Ranking" son ilustrativos. El dibujo es esquemático.
- No se habla del mito "el celular te escucha" (no hay fuente sólida para afirmarlo ni negarlo en este guion).
