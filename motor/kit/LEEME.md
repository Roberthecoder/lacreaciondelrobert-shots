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
| `Sticker` | Una aparición de Robert: `arriba-der`, `abajo-der`, `abajo-izq`, `gancho` (cuadro 0), `presentador` (medio cuerpo grande) | todos |
| `Robert` | Todas las apariciones de Robert en una lista `[[at, until, pose, lado], …]` (ver regla en `CLAUDE.md`) | todos |
| `CierreMarca robert=` | Robert junto al logo en la tarjeta final (obligatorio) | todos |
| `CierreMarca` | Oscurece la última imagen y muestra la marca (3–4 s) | todos |
| `MundoPiel` + `MUNDO_PIEL` | Primer mundo reutilizable: piel en corte con vellos, células, capilar y glóbulos rojos | N1, M4 |
| `CamaraAnidada` | Zoom de ×1 a ×1000 sin perder nitidez: funde un mundo macro (cm) con uno micro (µm) y oscurece al "entrar al microscopio". Keys en coordenadas macro | N1, M4 |
| `MundoPanMacro` + `MundoPanMicro` + `MUNDO_PAN` | Rebanada de frente (mancha de moho, rayos X, "puf" de esporas, segunda rebanada) y corte microscópico de la miga (alveolos, almidón, hifas que crecen, estolones, rizoides, tallos, cápsulas que revientan, espora, pelo de comparación). Usado en el shot 002 | N1, M4 |

| `Escena` | Fundido cruzado entre escenas con empujoncito de cámara (nunca corte seco) | todos |
| `Etq` | Etiqueta con línea (nombre común o *científico* con `it`) | todos |
| `kApp(Comp)` + `AudioPista` | Envuelve el componente del shot en el escenario 1080×1920: `window.MiApp = kApp(MiShot)` | todos |
| `FotoRecorte` + `Precarga` | Foto real como polaroid que entra girando y respira. **Siempre** poner `<Precarga srcs={[...]}/>` con todas las fotos, o el render saca tarjetas en blanco | N1, N5, M4 |
| `Champinon` | Champiñón (*Agaricus*): `crece` (primordio → adulto) y `abre` (botón → sombrero con laminillas y anillo) | N1, M4 |
| `MundoSuelo` + `MUNDO_SUELO` | Suelo en corte con hojarasca y red de micelio que crece (`red`) y brilla en rayos X (`brillo`); acepta hijos SVG (hongos, partículas) | N1, M4, M2 |
| `HifasMicro` | Hifas de cerca (fondo oscuro): crecen por la punta, septos, núcleos; `enzimas` = digestión externa de un pedazo de hoja | N1, M4 |
| `Levadura` | Célula de *Saccharomyces* con yema (`brote`) | N1 |
| `SetaOstra`, `RacimoOstra`, `BolsaCultivo` | Setas *Pleurotus* (con `pie` largo = CO₂ alto) y bolsa de sustrato que se coloniza (`col`) | N1, M4 |
| `PlacaPetri`, `kEstriado`, `kParcial`, `Asa`, `Mechero` | Laboratorio: placa vista desde arriba (con tapa y gotas), trazo del estriado en 4 zonas con sus colonias (260 → 70 → 22 → 7), polilínea parcial para dibujar en vivo, asa que se pone al rojo, mechero | M2, N3, N5 |
| `Termometro`, `CadenaAnillos` | Termómetro con franja resaltada; cadena de anillos de azúcar para polisacáridos (agarosa, quitina, almidón…) | N3, M2 |

Utilidades: `KC` (colores de la marca), `KF` (letras), `kprog`, `klerp`, `kEase`, `krng`, `mece(T, semilla)`
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
