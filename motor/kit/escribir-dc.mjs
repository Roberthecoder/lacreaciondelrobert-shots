// escribir-dc.mjs — escribe el .dc.html de un shot (escenas + componente + archivos jsx).
// Uso: node escribir-dc.mjs <salida.dc.html> <Componente> '<json de escenas>' archivo1.jsx archivo2.jsx ...
// (animations-v3.jsx y kit-robert.jsx se cargan siempre primero)
import fs from 'node:fs';
const [out, comp, escenas, ...jsx] = process.argv.slice(2);
JSON.parse(escenas);
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wdth,wght@62..125,400..900&family=Space+Mono:ital,wght@0,700;1,700&display=swap">
<style>html,body{margin:0;background:#000;height:100%;overflow:hidden}</style>
<script>window.OM_SCENES = '${escenas}';</script>
<script>window.OM_PLAYBACK = '{"mode":"times","count":1}';</script>
</helmet>
<x-import component-from-global-scope="${comp}" from="./animations-v3.jsx ./kit-robert.jsx ${jsx.map((f) => './' + f).join(' ')}" hint-size="100%,100vh"></x-import>
</x-dc>
</body>
</html>
`;
fs.writeFileSync(out, html);
const tot = JSON.parse(escenas).reduce((a, e) => a + e.dur, 0);
console.log(out, '· total', tot.toFixed(2), 's');
