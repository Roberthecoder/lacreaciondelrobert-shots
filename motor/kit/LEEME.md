# Kit de piezas — La Creación del Robert

`kit-robert.jsx` reúne piezas reutilizables para que cada shot salga del mismo sistema, en cualquier
formato del `referencias-externas/RECETARIO.md`. Todas son funciones del tiempo `T` (tiempo de autor),
igual que el resto del motor, así que funcionan en la versión narrada (tiempos de la voz) y en la muda.

## Cómo usarlo en un shot
1. Copia `motor/kit/kit-robert.jsx` a la carpeta del shot (el render solo sirve esa carpeta).
2. En el `.dc.html`, cárgalo entre el motor y el shot:
   `from="./animations-v3.jsx ./kit-robert.jsx ./shot-xxx.jsx"`
3. En el `.jsx` del shot usa las piezas directamente (`<Camara>`, `<Subtitulo>`…).
4. Ejemplo completo y probado: `shots/_demo-kit/` (demo de 21 s, no se publica).
   Revisar: `NAVEGADOR=chrome node preview.mjs ../shots/_demo-kit "Demo Kit.dc.html" hoja.png 2,6,12,16,19,23`
   (la demo dura 25.5 s; de 17 a 21 s muestra la `Lupa` en modo rayos X sobre un brazo)

## Piezas

| Pieza | Para qué | Formatos |
|---|---|---|
| `Camara` + `camaraEn(T, keys)` | Viaje continuo con zoom (macro → micro → macro). `keys: [{t, x, y, z}]` | N1, N3, N5, M4 |
| `Escala` | Barra con la medida real según el zoom (cm, mm, µm, nm). Necesita `z` y `pxPorMm` | N1, N3, N5, M4 |
| `Ambiente` | Partículas que flotan: la imagen nunca queda quieta | todos |
| `Brillo` | Resplandor alrededor de lo importante | todos |
| `Aparece` | Entrada/salida estándar para cualquier cosa (`pop`, `sube`, `fundido`) | todos |
| `Lupa` | Ventana circular. **Amplificar:** `render` + `fx, fy` acerca un punto de la escena. **Rayos X:** `interior={(T, r) => …}` dibuja lo de adentro en un cuadro de 2r × 2r; el círculo se abre desde `(fx, fy)`, queda unido con una línea punteada, lleva cuadrícula y franja de escaneo, `etiqueta` y `tinte` opcionales. `x, y, fx, fy` aceptan funciones de `T` para seguir algo que se mueve | N1, N3, M2 |
| `Subtitulo` | Una línea, palabra clave entre `*asteriscos*` en dorado; usa `window.SUBS[idx]` en la narrada | todos |
| `Chip` | Píldora: encabezado, pregunta fija, regla escrita | N2, M2, M3, M5 |
| `MitoTachado` | Creencia falsa que se tacha en rojo | N2, N1 |
| `NumeroGigante` | Cifra enorme que cuenta hasta su valor | N2, N6, M1 |
| `Contador` | Número que cuenta (conteos, carreras) | N4, M1, M5 |
| `TarjetaEstudio` | Año grande + quién/dónde + revista | N1, N2, N5 |
| `Capitulo` | Capítulos numerados bajo el logo | N3, M3 |
| `Pasos` | "PASO 3 / 7" de la guía irónica | N6 |
| `Medidor` | Barra que sube (40 % → 100 %) | N3, M2 |
| `Cronometro` | Reloj de laboratorio, con time-lapse | N5 |
| `Cuadricula` | Cuadrícula que se llena por tramos de color | N4 |
| `Comparativa` | Dos barras: "Tú vs. el de al lado" | N2 |
| `MarcaAgua` | Logo + badge `#NN` arriba a la izquierda | todos |
| `Sticker` | Reacción del narrador: `arriba-der`, `abajo-der`, `abajo-izq` | todos |
| `CierreMarca` | Oscurece la última imagen y muestra la marca (3–4 s) | todos |
| `MundoPiel` + `MUNDO_PIEL` | Primer mundo reutilizable: piel en corte con vellos, células, capilar y glóbulos rojos | N1, M4 |
| `CamaraAnidada` | Zoom de ×1 a ×1000 sin perder nitidez: funde un mundo macro (cm) con uno micro (µm) y oscurece al "entrar al microscopio". Keys en coordenadas macro | N1, M4 |
| `Escena` | Escena con fundido cruzado (nunca corte seco) y un empujoncito de cámara: `<Escena T a b zoom>` | todos |
| `Etq` | Etiqueta con línea que crece (nombre común o *científico* con `it`) | todos |
| `AudioPista` | Audio sincronizado al tiempo (vista previa); ya no hay que copiarlo en cada shot | todos |
| `FondoLunares` | Fondo de color de la marca con lunares blancos | todos |
| `Bacteria` | Bacilo esquemático; `gen` = anillo rojo (plásmido de resistencia), `vida` 0..1 | N1, M5 |
| `MapaMexico` + `mxProy(lon, lat)` | Mapa esquemático de México y Centroamérica; `mxProy` ubica puntos por coordenadas (Chiapas, Panamá…). Mapa de México como medida (N5) | N5, N2, M1 |
| `Goteo` | Gotas que caen (alambique, chorros) | N1, N3 |
| `MundoPanMacro` + `MundoPanMicro` + `MUNDO_PAN` | Rebanada de frente (mancha de moho, rayos X, "puf" de esporas, segunda rebanada) y corte microscópico de la miga (alveolos, almidón, hifas que crecen, estolones, rizoides, tallos, cápsulas que revientan, espora, pelo de comparación). Usado en el shot 002 | N1, M4 |

Utilidades: `KC` (colores de la marca), `KF` (letras), `KSOMBRA` (sombra de texto), `kprog`, `klerp`, `kEase`, `krng`, `mece(T, semilla)`
(movimiento orgánico para vellos, hojas, hifas…), `kformato` (números en español de México).

## Reglas aprendidas al probarlo
- El sticker `arriba-der` tapa números gigantes y chips centrados en la parte alta: en el formato N2 usa
  `abajo-izq` o `abajo-der`, y nunca encima de la `Comparativa`.
- `Capitulo` va en y = 330 (bajo el logo); los medidores empiezan en y = 450.
- `Escala` va en y = 1430, debajo del subtítulo (que vive en `bottom: 560`).
- Los mundos se dibujan con el detalle microscópico chiquito y a escala real (`pxPorMm`); la cámara lo
  revela. Dibujar solo la franja que se va a acercar para no cargar el render.

- Con zoom fuerte la cámara mueve la posición al ritmo del zoom, para que el punto de destino no se escape.
- En el cambio macro → micro el detalle macro (la mancha) se desvanece solo (`zCam`) y la pantalla se oscurece.

## Siguientes mundos a construir (según los temas)
Hoja en corte (estomas), suelo con micelio e hifas, intestino con bacterias, ojo (retina y conos),
placa de Petri con colonias. (Pan ✔ en el shot 002: sirve también para levadura y almidón.)

## Sonido: `audio-kit.mjs` (27 oct 2026)
Sintetizador compartido para los `gen-audio.mjs` (nada grabado). Desde un shot:
`import { mezcla } from '../../motor/kit/audio-kit.mjs'; const m = mezcla(HERE, html);` y luego
`m.pad`, `m.nota(t, midi, ganancia, duración, tapa)`, `m.bajo`, `m.tic`, `m.golpe`, `m.gota`, `m.burbuja`, `m.zumbido`,
`m.motor`, `m.cruje`, `m.whoosh`, `m.latido`, `m.sube` y `m.guardar(salida, ganancia)`. Los tiempos van en tiempo de autor
(`m.K.Escena + s`); en la narrada se convierten solos a los tiempos de la voz. `tapa` (0..1) ahoga el sonido: sirve para
"la música cuenta el estado" (tapada mientras dura el problema, libre cuando se resuelve). Ejemplos: `shots/amb-0*/gen-audio.mjs`.
