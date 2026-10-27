// escenas.mjs — calcula la duración de cada escena del largo a partir del guion (narracion.json)
// y escribe "Largo 00 base.dc.html" (horizontal 1920×1080) con OM_SCENES y los tiempos estimados de cada línea.
// Ritmo estimado: ~2.8 palabras por segundo (voz de Robert ~170 palabras/min) + respiro entre frases.
// Cuando haya voz, narrar.mjs ajusta las escenas (campo "nat") y los subtítulos (window.SUBS) a la voz real.
// Uso: node escenas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'narracion.json'), 'utf8'));
const PPS = 2.8, RESPIRO = 0.35, ENTRADA = 0.35, MIN_ESC = 6;
const escenas = [], lineas = [];
let t = 0;
for (const l of cfg.lineas) {
  let e = escenas.at(-1);
  if (!e || e.name !== l.escena) { if (e) { e.dur = Math.max(MIN_ESC, t - e.t0 + 0.4); t = e.t0 + e.dur; } e = { name: l.escena, t0: t }; escenas.push(e); t += escenas.length === 1 ? 0.05 : ENTRADA; }
  const pal = l.texto.split(/\s+/).length + (l.texto.match(/[0-9]/g) || []).length * 0.4;
  const d = pal / PPS;
  lineas.push({ at: +t.toFixed(2), until: +(t + d + RESPIRO * 0.8).toFixed(2), texto: l.texto });
  t += d + RESPIRO;
}
const ult = escenas.at(-1); ult.dur = Math.max(MIN_ESC, t - ult.t0 + 1.2);
escenas.push({ name: 'Outro', dur: 5 });
const OM = escenas.map((e) => ({ name: e.name, dur: +e.dur.toFixed(2) }));
const total = OM.reduce((a, s) => a + s.dur, 0);

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>window.K_ANCHO = 1920; window.K_ALTO = 1080;</script>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wdth,wght@62..125,400..900&family=Space+Mono:wght@700&display=swap">
<style>html,body{margin:0;background:#000;height:100%;overflow:hidden}</style>
<script>window.K_ANCHO = 1920; window.K_ALTO = 1080;</script>
<script>window.OM_SCENES = '${JSON.stringify(OM).replace(/'/g, "\\'")}';</script>
<script>window.OM_PLAYBACK = '{"mode":"times","count":1}';</script>
<script>window.LINEAS = ${JSON.stringify(lineas)};</script>
</helmet>
<x-import component-from-global-scope="Largo00App" from="./animations-v3.jsx ./kit-robert.jsx ./largo-00.jsx" hint-size="100%,100vh"></x-import>
</x-dc>
</body>
</html>
`;
fs.writeFileSync(path.join(HERE, cfg.dcHtml), html);
console.log(OM.map((s) => `${s.name} ${s.dur}`).join(' · '));
console.log(`Total ${total.toFixed(1)} s (${(total / 60).toFixed(2)} min) · ${lineas.length} líneas`);
