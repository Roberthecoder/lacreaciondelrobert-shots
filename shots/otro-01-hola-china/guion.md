# Shot Otro 01 · Hola, China (presentación muda para RedNote / 小红书)

Pedido de Robert (19 nov 2026): «hazme un video mudo de introducción, keep it short. Y diles la neta, que no hablo chino, pero
que me encantaría hacer amigos, alianzas... que me fascina China y que inclusive algún día me gustaría ir allá».
Es para presentarse en RedNote, donde va a subir sus shots con letreros en chino y su voz en español.

- Tipo `otro`, vertical 1080×1920, **27.9 s**, `"duracion_libre": true`. **Mudo:** sin voz; música original y efectos de `gen-audio.mjs`.
- Entregable: `otro-01-hola-china_sin_voz.mp4` (render automático de GitHub). No lleva voz de ElevenLabs.
- Letreros en **chino simplificado** (fuente WenQuanYi Zen Hei) con una línea chica en español debajo. Fuera del tercio inferior.
- Dibujos esquemáticos y respetuosos: papel picado (México) y farolitos de papel (China) en el mismo hilo; un globo sin fronteras
  (solo dos manchas de tierra y dos pines); sin banderas ni símbolos políticos. Logo neutro `logo_color.svg`, sin badge de número.

## Escenas (1 escena = 2 o 3 compases de la música a 116 bpm; 1 compás = 2.069 s)
| # | Tiempo | Qué se ve | Letrero (chino · español) | Sonido |
|---|---|---|---|---|
| 1 Hola | 0–4.1 s | Fondo rosa; cae el papel picado al cuadro 0; sube el mapa de México y se pinta de amarillo con destellos; chip «墨西哥 · México» | 你好！我是 **Robert** · ¡Hola! Soy Robert / 我来自**墨西哥** · Soy de México | tema en marimba; papel, golpecitos de cada banderita, pops, brillo |
| 2 Ciencia | 4.1–8.3 s | Fondo amarillo; una pantalla de video se enciende: ADN que gira, champiñones que crecen, molécula que gira | 我用动画做**科普** · Divulgo ciencia con animaciones | secuencia del tema, entra el bajo y el shaker; un destello por animación |
| 3 Neta | 8.3–14.5 s | Fondo cian; 「中文」 cae y tiembla entre tres «?»; luego «¡Hola!» (voz) → flecha → 「你好！」 (letrero); chips 西班牙语 / 翻译 | 说实话，我**不会说中文** · La neta: no hablo chino → 视频里的中文是**翻译**的 / 我说的是**西班牙语** · Los letreros en chino son traducción y mi voz es en español | la música se vacía (staccato juguetón), boings que bajan, silencio de medio compás, sello |
| 4 Amigos | 14.5–18.6 s | Fondo menta; una red de amigos se conecta al centro, corazones, se tejen líneas entre todos; chips 朋友 / 合作 | 想在这里**交朋友**、**找合作** · Quiero hacer amigos y alianzas aquí | el tema en guitarra con banda completa; una nota por amigo |
| 5 China | 18.6–24.8 s | Atardecer naranja-rosa; bajan papel picado y farolitos juntos; globo con pines 墨西哥 y 中国; destellos sobre China; un avión cruza el Pacífico de México a China | 我对**中国**特别着迷 · Me fascina China → 希望有一天能**去中国**看看 · Algún día me encantaría ir | el tema en flauta una octava arriba, colchón que crece, acorde de Sol menor 6 (nostalgia del «algún día»), motor del avión de derecha a izquierda |
| 6 Cierre | 24.8–27.9 s | `CierreMarca` con logo y Robert apuntando a cámara | 关注我，一起探索科学！ · Sígueme y exploremos la ciencia juntos | cadencia en Re add9 que se queda sonando |

## Robert en pantalla (tiempos reales de `hola-china.jsx`)
| # | Entra (s) | Sale (s) | Pose | Lado | Reacciona a |
|---|---|---|---|---|---|
| 1 | 0.0 (ya en cuadro 0) | 3.9 | 05_sonriendo_dientes_uniformes (saludo, con ondas de «hola») | `r-der` | 你好！我是 Robert |
| 2 | 4.1 | 8.0 | 13_senalando_arriba | `r-izq` | Señala la pantalla de animaciones |
| 3 | 8.2 | 10.8 | 06_pensativo_menton | `r-der` | 我不会说中文 (no hablo chino) |
| 4 | 11.0 | 14.2 | 04_bajando_lentes (pícaro) | `r-izq` | Los letreros son traducción |
| 5 | 14.4 | 18.4 | 02_apuntando_camara | `r-der` | Te invita a ser su amigo |
| 6 | 18.6 | 21.5 | 11_sorprendido (fascinado) | `r-izq` | 我对中国特别着迷 |
| 7 | 21.6 | 24.7 | 05_sonriendo_dientes_uniformes (emocionado) | `r-grande` (**grande**) | El sueño: el avión va a China |
| 8 | 24.8 | 27.9 | 02_apuntando_camara | `CierreMarca robert=` | Tarjeta de cierre |

Total ≈ 27.9 s en pantalla (todo el video), 8 apariciones, 6 poses distintas, nunca la misma dos veces seguidas. Los stickers van
debajo de los letreros y de los dibujos (revisado cuadro por cuadro con `motor/preview.mjs`).

## Música (`gen-audio.mjs`, receta `maestro/recetas/composicion-musical.md`)
Pieza original en Re mayor a 116 bpm, sin cliché «oriental» (sin gong ni pentatónica de película): marimba, guitarra de nailon
(Karplus-Strong), flauta, bajo, colchón de cuerdas y percusión de mano, con tiempo e intensidad humanizados y sala.
Forma: A (tema en marimba) → A' (secuencia que sube) → B (se vacía; staccato y silencio antes del A7) → A'' (el tema regresa en la
guitarra) → C (el tema en flauta una octava arriba, Gmaj7–A6–F#m7–G–Gm6) → cadencia en Re add9. Melodía ≈ 6 dB arriba del
acompañamiento; −14.2 LUFS; espectrograma revisado (sin zumbidos).

## Fuentes
Todo lo que dice el video son datos de Robert mismo (su pedido del 19 nov 2026 y `series/shot-robert/datos.md`). Ver `verificacion.md`.
