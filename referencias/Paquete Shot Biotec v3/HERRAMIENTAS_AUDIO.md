# Herramientas de audio (para usar con run_script)

Reglas: el script tiene límite de 30 s → música a 24 kHz mono; SFX a 44.1 kHz estéreo. Todo arranca en 0:00 del video. Re-generar cada vez que cambien los tiempos de escena.

## writeWav (común)
```js
function wav(chs, SR){ // chs: array de Float32Array
  const n=chs[0].length,C=chs.length,ab=new ArrayBuffer(44+n*2*C),v=new DataView(ab);
  const w=(o,x)=>{for(let i=0;i<x.length;i++)v.setUint8(o+i,x.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2*C,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,C,true);v.setUint32(24,SR,true);v.setUint32(28,SR*2*C,true);v.setUint16(32,2*C,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2*C,true);
  for(let i=0;i<n;i++)for(let c=0;c<C;c++)v.setInt16(44+(i*C+c)*2,Math.max(-1,Math.min(1,chs[c][i]))*32767,true);
  return new Blob([ab],{type:'audio/wav'});
}
```

## SFX (OfflineAudioContext, 44.1 kHz estéreo, compresor -14 dB 4:1)
Librería de sonidos (ruido = buffer aleatorio de 2 s):
- `whoosh(t,d,g)` bandpass 300→3500 Hz · `whooshDown` 3000→250 Hz
- `impact(t,g)` seno 140→38 Hz + ruido lowpass 2500→200
- `shatter(t)` ruido highpass + 6 tonos agudos 2.6–5.2 kHz escalonados 35 ms
- `pop(t,g,f)` seno f→2.8f, 120 ms · `tick` square 35 ms · `bloop` 700→280 Hz
- `ding(t)` 1320 + 1980 Hz, 1.2 s · `boing(t)` 180→420→260 Hz con vibrato 18 Hz (cada aparición de avatar)
- `stamp(t)` impact 0.7 + ruido bandpass (sellos/remates) · `slamMetal` impact + triángulos 220/331 Hz
- `hiss(t,d)` highpass 5–7 kHz (frío/vapor) · `cutHit(t)` ruido 4000→900 + seno 90→50 (cada cambio de escena)
- Flash inicial: 3× (impact 0.55 + whoosh 0.14) en 0, 0.15, 0.3 s.
Colocar cada sonido en el tiempo exacto del evento visual del jsx (cues `K.X + offset`).

## Música (24 kHz mono, ~100 BPM, B=0.6 s)
- Pad: 3 sierras (73.42, 110, 174.61 Hz) → lowpass que abre 400→1500 Hz a lo largo del video; fade in 3 s, fade out en el outro.
- Bombo en tiempos 1 y 3 desde el hook; palmas 2 y 4 desde la 1ª escena; hats en contratiempo (y semicorcheas desde la 4ª escena).
- Bajo square en corcheas, secuencia D-D-F-C por compás. Arpegio triangular D-F-A-C desde la 3ª escena, una octava arriba en la 2ª mitad.
- Risers (ruido bandpass 300→5000) antes de escenas clave; golpe final + sub 55 Hz al iniciar el outro, luego silencio.

## Edición de voz del usuario
1. Leer WAV (PCM 16-bit; localizar chunk `data`). RMS en ventanas de 20 ms.
2. Umbral = max(ruido_p10 × 3, pico_p98 × 0.06). Tramos de voz; unir huecos < 0.12 s; descartar tramos < 0.06 s.
3. Alinear líneas del guion con los tramos por programación dinámica: costo = 6·ln(dur/esperada)² − bono por silencio previo largo; duración esperada = sílabas / tasa media (≈6.9 síl/s).
4. Recortar silencios: 0.22 s en comas, 0.38 s entre líneas, 0.5–0.55 s antes de pregunta y de cierre. Crossfade 12 ms. 0.92 s de entrada (después del flash).
5. Mapear tiempos originales → nuevos; cada escena empieza ~0.25 s antes de su línea. Ajustar offsets internos para que cifras/sellos/impactos coincidan con la palabra hablada.
6. Mezcla final 48 kHz estéreo: voz ×1.15 + música ×0.45 con ducking (envolvente 10 ms/250 ms, −55 % cuando hay voz) + SFX ×0.5 (−30 % con voz), saturación suave tanh. Guardar `MEZCLA_FINAL_shotNN.wav`.
