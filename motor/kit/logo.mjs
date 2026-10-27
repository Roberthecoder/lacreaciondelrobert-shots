// logo.mjs — genera el isotipo A COLOR de La Creación del Robert con el hexágono del TEMA iluminado en dorado.
// El dorado rellena EXACTAMENTE la celda del ícono: mismo hexágono de la retícula (radio 55, punta plana),
// dibujado DEBAJO del contorno grueso y de las divisiones finas, que tapan sus bordes. Temas:
//   biologia → ADN · quimica → matraz · bioquimica → ADN + matraz · fisica → átomo · ia → brillitos
// Uso: node logo.mjs [carpeta-salida]   (por defecto motor/kit/logos) → logo_<tema>.svg
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(process.argv[2] || path.join(HERE, 'logos'));
const GOLD = '#E8A62A', INK = '#0a0a0a';

// centros de las 4 celdas (retícula de hexágonos "de punta plana", radio 55)
const CELDA = { atomo: [0, -95.3], matraz: [-82.5, -47.6], adn: [-82.5, 47.6], brillos: [0, 95.3] };
const TEMAS = { biologia: ['adn'], quimica: ['matraz'], bioquimica: ['adn', 'matraz'], fisica: ['atomo'], ia: ['brillos'] };
const hex = ([cx, cy], R = 55) => 'M ' + [0, 60, 120, 180, 240, 300].map((a) => {
  const r = (a * Math.PI) / 180; return `${(cx + R * Math.cos(r)).toFixed(1)},${(cy + R * Math.sin(r)).toFixed(1)}`;
}).join(' L ') + ' Z';

// Íconos A COLOR (versión oficial de Robert: motor/kit/logos/fuente/logo_color_800.svg).
// Dentro de la celda dorada del tema, lo que es de color lleva un contorno negro fino para no perderse
// sobre el dorado (p. ej. los brillitos amarillos del tema IA).
const halo = (on, w = 1.6) => (on ? ` stroke="${INK}" stroke-width="${w}" paint-order="stroke"` : '');
const iconos = (dorado) => {
  const d = (c) => dorado.includes(c);
  return `
<g stroke="${INK}" stroke-width="2.6" stroke-opacity="0.65">
<line x1="-55.0" y1="95.3" x2="-27.5" y2="47.6"/><line x1="-110.0" y1="0.0" x2="-55.0" y2="-0.0"/><line x1="-55.0" y1="-95.3" x2="-27.5" y2="-47.6"/>
</g>
<g transform="translate(0,-95.3)" fill="none">
${d('atomo') ? `<g stroke="${INK}" stroke-width="6.2" fill="none"><ellipse cx="0" cy="0" rx="20" ry="7"/><ellipse cx="0" cy="0" rx="20" ry="7" transform="rotate(60)"/><ellipse cx="0" cy="0" rx="20" ry="7" transform="rotate(120)"/></g>` : ''}
<ellipse cx="0" cy="0" rx="20" ry="7" stroke="#2563a8" stroke-width="3.4"/>
<ellipse cx="0" cy="0" rx="20" ry="7" stroke="#d13b3b" stroke-width="3.4" transform="rotate(60)"/>
<ellipse cx="0" cy="0" rx="20" ry="7" stroke="#3fa356" stroke-width="3.4" transform="rotate(120)"/>
<circle cx="16.4" cy="4.0" r="2.8" fill="#2563a8"${halo(d('atomo'), 1.2)}/>
<circle cx="-11.5" cy="-15.1" r="2.8" fill="#d13b3b"${halo(d('atomo'), 1.2)}/>
<circle cx="4.2" cy="6.5" r="2.8" fill="#3fa356"${halo(d('atomo'), 1.2)}/>
<circle cx="0" cy="0" r="4.8" fill="#f2a71b"${halo(d('atomo'))}/>
</g>
<g transform="translate(-82.5,-47.6)">
<path d="M -14.33,10 L 14.33,10 L 19,17 Q 22,24 15,24 L -15,24 Q -22,24 -19,17 L -14.33,10 Z" fill="#4caf6e"/>
<g stroke="${INK}" stroke-width="3.4" fill="none">
<path d="M -5,-24 L 5,-24 L 5,-4 L 19,17 Q 22,24 15,24 L -15,24 Q -22,24 -19,17 L -5,-4 Z"/><path d="M -8,10 L 8,10"/>
</g>
</g>
<g transform="translate(-82.5,47.6) rotate(28)" fill="none" stroke-linecap="round">
${d('adn') ? `<g stroke="${INK}" stroke-width="6.4"><path d="M 0.0,-34.0 L 5.0,-31.2 L 9.2,-28.3 L 12.0,-25.5 L 13.0,-22.7 L 12.0,-19.8 L 9.2,-17.0 L 5.0,-14.2 L 0.0,-11.3 L -5.0,-8.5 L -9.2,-5.7 L -12.0,-2.8 L -13.0,0.0 L -12.0,2.8 L -9.2,5.7 L -5.0,8.5 L 0.0,11.3 L 5.0,14.2 L 9.2,17.0 L 12.0,19.8 L 13.0,22.7 L 12.0,25.5 L 9.2,28.3 L 5.0,31.2 L 0.0,34.0"/><path d="M 0.0,-34.0 L -5.0,-31.2 L -9.2,-28.3 L -12.0,-25.5 L -13.0,-22.7 L -12.0,-19.8 L -9.2,-17.0 L -5.0,-14.2 L 0.0,-11.3 L 5.0,-8.5 L 9.2,-5.7 L 12.0,-2.8 L 13.0,0.0 L 12.0,2.8 L 9.2,5.7 L 5.0,8.5 L 0.0,11.3 L -5.0,14.2 L -9.2,17.0 L -12.0,19.8 L -13.0,22.7 L -12.0,25.5 L -9.2,28.3 L -5.0,31.2 L 0.0,34.0"/></g>` : ''}
<path stroke="#2563a8" stroke-width="3.4" d="M 0.0,-34.0 L 5.0,-31.2 L 9.2,-28.3 L 12.0,-25.5 L 13.0,-22.7 L 12.0,-19.8 L 9.2,-17.0 L 5.0,-14.2 L 0.0,-11.3 L -5.0,-8.5 L -9.2,-5.7 L -12.0,-2.8 L -13.0,0.0 L -12.0,2.8 L -9.2,5.7 L -5.0,8.5 L 0.0,11.3 L 5.0,14.2 L 9.2,17.0 L 12.0,19.8 L 13.0,22.7 L 12.0,25.5 L 9.2,28.3 L 5.0,31.2 L 0.0,34.0"/>
<path stroke="#d1477a" stroke-width="3.4" d="M 0.0,-34.0 L -5.0,-31.2 L -9.2,-28.3 L -12.0,-25.5 L -13.0,-22.7 L -12.0,-19.8 L -9.2,-17.0 L -5.0,-14.2 L 0.0,-11.3 L 5.0,-8.5 L 9.2,-5.7 L 12.0,-2.8 L 13.0,0.0 L 12.0,2.8 L 9.2,5.7 L 5.0,8.5 L 0.0,11.3 L -5.0,14.2 L -9.2,17.0 L -12.0,19.8 L -13.0,22.7 L -12.0,25.5 L -9.2,28.3 L -5.0,31.2 L 0.0,34.0"/>
<path stroke="${d('adn') ? '#5a5a5a' : '#8a8a8a'}" stroke-width="3.4" d="M 13.0,-22.7 L -13.0,-22.7 M -13.0,0.0 L 13.0,0.0 M 13.0,22.7 L -13.0,22.7"/>
</g>
<g transform="translate(0,95.3)">
<path fill="#f5b400"${halo(d('brillos'), 2.2)} d="M 17.0,-3.0 L 3.2,0.2 L 0.0,14.0 L -3.2,0.2 L -17.0,-3.0 L -3.2,-6.2 L -0.0,-20.0 L 3.2,-6.2 Z"/>
<path fill="#e8730f"${halo(d('brillos'), 1.8)} d="M 20.0,15.0 L 14.4,16.4 L 13.0,22.0 L 11.6,16.4 L 6.0,15.0 L 11.6,13.6 L 13.0,8.0 L 14.4,13.6 Z"/>
</g>`;
};
const CONTORNO = 'M 55.0,95.3 L 27.5,142.9 L -27.5,142.9 L -55.0,95.3 L -110.0,95.3 L -137.5,47.6 L -110.0,0.0 L -137.5,-47.6 L -110.0,-95.3 L -55.0,-95.3 L -27.5,-142.9 L 27.5,-142.9 L 55.0,-95.3 L 27.5,-47.6 L -27.5,-47.6 L -55.0,-0.0 L -27.5,47.6 L 27.5,47.6 Z';

export function logoSVG(tema = 'biologia') {
  const celdas = tema === null ? [] : TEMAS[tema]; if (!celdas) throw new Error('Tema desconocido: ' + tema + ' (usa ' + Object.keys(TEMAS).join(', ') + ')');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-160 -170 320 340">
<path d="${CONTORNO}" fill="#ffffff"/>
${celdas.map((c) => `<path d="${hex(CELDA[c])}" fill="${GOLD}"/>`).join('\n')}
<path d="${CONTORNO}" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
${iconos(celdas)}
</svg>
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fs.mkdirSync(OUT, { recursive: true });
  for (const t of Object.keys(TEMAS)) fs.writeFileSync(path.join(OUT, `logo_${t}.svg`), logoSVG(t));
  fs.writeFileSync(path.join(OUT, 'logo_color.svg'), logoSVG(null));
  console.log('Logos en', OUT, '·', Object.keys(TEMAS).join(', '));
}
