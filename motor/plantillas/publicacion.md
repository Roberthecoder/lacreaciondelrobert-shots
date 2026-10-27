# Plantilla: `publicacion.md` de cada shot

Cada shot lleva en su carpeta un `publicacion.md` con los textos listos para copiar y pegar en cada red, para la versión narrada (desde el 27 oct 2026 ya no hay gemelo mudo). La Sala de Shots muestra estos textos con un botón de copiar por red. Cada texto va en su propio bloque ```` ```text ```` para que en GitHub (también en el celular) salga el botón de copiar. Ejemplo completo: `shots/003-semillas-luna/publicacion.md`.

## Reglas por red

| Red | Título | Texto | Hashtags |
|---|---|---|---|
| **TikTok** | — (el gancho va en la primera línea del texto) | Mini artículo completo + fuentes cortas + pregunta para comentar. Máx. 4,000 caracteres. | 3–5 al final |
| **Instagram Reels** | — (primera línea = gancho, se corta a ~125 caracteres) | Mini artículo más corto + "Fuentes en el primer comentario" + pregunta. Máx. 2,200 caracteres. | Máx. 5 |
| **YouTube Shorts** | Máx. 100 caracteres (ideal ≤ 60), gancho + emoji. | Mini artículo + fuentes completas con enlace + pregunta. | 3 al final (`#Shorts` y 2 del tema) |
| **Facebook Reels** | — | Versión corta: gancho + 2–3 frases + pregunta. | 2–3 |
| **LinkedIn** | — (primera línea = gancho; se corta a ~210 caracteres) | Tono profesional y claro: el dato, por qué importa (ciencia, industria, salud o ambiente) y una pregunta para conversar. Sin emojis de relleno. Máx. 3,000 caracteres. | 3–5 al final |
| **X** | — | Un solo post ≤ 280 caracteres contando hashtags: gancho + el dato más fuerte. | 1–2 |
| **Threads** | — | ≤ 500 caracteres: gancho + 2–3 frases + pregunta. | 1 tema (Threads usa uno solo) |

**Para todas:**
- La primera línea es el **mismo gancho del video** (uno de los 7 de `CLAUDE.md`), hablándole a "tú". Nunca empezar con una fecha ni con "En este video…".
- Mini artículo = la explicación completa del guion en prosa simple, con *especies en cursiva* donde la red lo permita (en texto plano, sin asteriscos).
- "El dibujo es esquemático." cuando aplique.
- Cerrar con **una pregunta para comentar** y la firma: `Soy Robert, de La Creación del Robert 🌱` (vincula el video con Robert).
- **YouTube (largos y documentales):** la descripción lleva **capítulos** con sus tiempos para que YouTube los cree solo: el primero en `0:00`, al menos 3, de 10 s o más, tomados de las escenas del `.dc.html` narrado (`OM_SCENES`, sumando `dur`). En Shorts los capítulos no aparecen: no los pongas. Los 3 primeros hashtags de YouTube salen arriba del título: elige los mejores.
- **TikTok e Instagram** no separan título y descripción: la primera línea hace de título, así que es el gancho.
- **Serie y número son parte del título** (regla de Robert): el título de YouTube termina en `| Shot <Serie> #NN`
  (p. ej. `Esto no es estambre: es una proteína 🤖 | Shot IA #01`, máx. 100 caracteres) y en las demás redes va la línea
  `Shot <Serie> #NN · La Creación del Robert` justo antes de la firma. Libres, formales y documentales no llevan número.
- Hashtags: 1 de marca (`#LaCreacionDelRobert`), 1 de la serie (`#Biotecnologia`, `#FungiMati`, `#CienciaAmbiental`, `#InteligenciaArtificial`, `#Ciencia`, `#Quimica`) y el resto del tema. Nada de hashtags genéricos de relleno (#fyp, #viral).
- **Comentario fijado** (todas las redes): las fuentes completas, una por línea.
- Sin datos que no estén en el guion y sus fuentes.

## Esqueleto

````markdown
# Publicación · #NN Título del shot

## Versión narrada

### TikTok
```text
(gancho)
(mini artículo)
El dibujo es esquemático.
Fuentes: (cortas)
(pregunta) 👇
Soy Robert, de La Creación del Robert 🌱
#LaCreacionDelRobert #Serie #tema #tema
```

### Instagram Reels
```text
…
```

### YouTube Shorts
Título:
```text
…
```
Descripción:
```text
…
```

### Facebook Reels
```text
…
```

### LinkedIn
```text
…
```

### X
```text
…
```

### Threads
```text
…
```

## Comentario fijado (fuentes)
```text
…
```
````
