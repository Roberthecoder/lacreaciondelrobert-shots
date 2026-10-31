# KIT MAESTRO · Shots Micológicos — La Creación del Robert / Fungi Mati

Kit para producir **Shots Micológicos**: divulgación científica en video corto,
vertical 9:16 (61–62 s; ver CLAUDE.md principal), animación HTML autocontenida. Serie hermana de
los Shots Biotecnológicos; comparte narrador, logo y esencia visual.

## Qué hay aquí
```
KIT MAESTRO Shots Micologicos/
├─ LEEME.md            ← este archivo
├─ CLAUDE.md           ← instrucciones persistentes (pégalo a tu proyecto nuevo)
├─ GUIA_SHOT.md        ← guía técnica de llenado (léela antes de construir)
├─ animations.jsx      ← motor de timeline (no editar)
├─ support.js          ← runtime (no editar)
├─ assets/
│  ├─ logo_iso_micologico.svg   ← isotipo, celda de ADN en dorado
│  └─ stickers/                 ← 13 poses del narrador
├─ _PLANTILLA/         ← plantilla lista para copiar y llenar
│  ├─ _PLANTILLA Shot Micologico.dc.html
│  ├─ plantilla_shot.jsx        ← kit de componentes + 2 escenas "BORRAR"
│  ├─ animations.jsx · support.js · assets/
└─ Shot 01 - El Micelio/        ← ejemplo resuelto (con voz sincronizada)
   ├─ Shot 01 El Micelio.dc.html · shot_micelio.jsx
   ├─ animations.jsx · support.js · assets/ (avatares + narracion.mp3)
```

## Cómo generar un Shot nuevo
1. Copia la carpeta `_PLANTILLA/` y renómbrala `Shot NN <título>`.
2. Abre `plantilla_shot.jsx`. Edita SOLO la sección `===== SCENE =====`.
   Borra las escenas marcadas **BORRAR** e inventa las ilustraciones del tema.
3. Pon el número correcto en el badge `#NN` de la marca de agua.
4. Abre el `.dc.html` para previsualizar. Al terminar, exporta a video.
5. Para sincronizar tu voz: mira **GUIA_SHOT.md → Audio**.

## La regla de las manzanas (esencia vs. variabilidad)
Se mantiene IDÉNTICO el **estilo**: lienzo 1080×1920, fondo crema, paleta y
acento dorado `#E8A62A`/`#F4C25A`, tipografía Archivo/Anton, subtítulos quemados,
logo + marca de agua (sup. izq.), avatar como reacción, ritmo de fundidos, motor.
Cambia **siempre** el **contenido**: qué se ilustra, cuántas escenas, tiempos. No
hay organismo protagonista fijo. **No repitas un shot; inventa ilustraciones
frescas por episodio.**

Duda frecuente: el logo lleva la **celda de ADN en dorado** — el ADN es el símbolo
universal de biología, y lo micológico es parte de lo biológico.
