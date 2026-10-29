// Shot Fungi Mati #17 · Ese grano negro no es centeno quemado: el cornezuelo (Claviceps purpurea) — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CZ = { grano:'#e3b45a', grano2:'#f3d28c', tallo:'#b8a24a', arista:'#c9a64a', cuerno:'#2a1630', cuerno2:'#5b2c5f', verde:'#8fc25a', verde2:'#5f9a3a',
  miel:'#f1c35a', piel:'#f2c29b', piel2:'#e2a57e', muerto:'#2d2226', sangre:'#d8322a', cebada:'#e8cf8a', avena:'#c7b46a', papel:'#f4e3bd' };

// Cornezuelo (esclerocio): cuerno alargado y algo curvo, negro morado. Base en (0,0), crece hacia -y. largo en px.
function Cuerno({ x = 0, y = 0, largo = 200, ancho = 34, rot = 0, crece = 1 }) {
  if (crece <= 0) return null;
  const L = largo * kEase.sale(kclamp(crece, 0, 1)), W = ancho * (0.6 + 0.4 * kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M ${-W / 2} 0 Q ${-W * 0.7} ${-L * 0.5} ${-W * 0.05 + L * 0.08} ${-L} Q ${W * 0.5 + L * 0.1} ${-L * 0.55} ${W / 2} 0 Z`} fill={CZ.cuerno} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${-W * 0.15} ${-L * 0.12} Q ${-W * 0.3} ${-L * 0.5} ${L * 0.05} ${-L * 0.86}`} stroke={CZ.cuerno2} strokeWidth={W * 0.22} fill="none" strokeLinecap="round" />
    <path d={`M ${W * 0.18} ${-L * 0.2} L ${W * 0.12} ${-L * 0.32} M ${W * 0.22} ${-L * 0.5} L ${W * 0.14} ${-L * 0.6}`} stroke="#120a14" strokeWidth={3} />
  </g>;
}

// Espiga de centeno: tallo, dos hileras de granos con aristas largas. Base del tallo en (x, y).
// cuernos: lista de índices de grano que son cornezuelo; crece 0..1. frasco: frasquito de medicina junto al cuerno (cierre).
function Espiga({ T, x, y, s = 1, cuernos = [], crece = 1, n = 18, seed = 2 }) {
  const sway = Math.sin(T * 1.6 + seed) * 2.2 + mece(T, seed, 0.4) * 1.5;
  const items = [];
  for (let i = 0; i < n; i++) {
    const lado = i % 2 ? 1 : -1, yy = -330 - i * 24, ang = lado * 24, k = 1 - i / (n * 2.2);
    items.push({ i, lado, yy, ang, k });
  }
  return <g transform={`translate(${x} ${y}) rotate(${sway}) scale(${s})`}>
    <path d="M 0 0 Q 6 -160 0 -330 L 0 -790" stroke={CZ.tallo} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 0 0 Q 6 -160 0 -330 L 0 -790" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" opacity=".25" />
    <path d="M 0 -120 Q -70 -200 -110 -300 Q -40 -220 2 -150 Z" fill={CZ.verde} stroke={KC.ink} strokeWidth={4} />
    {items.map(({ i, lado, yy, ang, k }) => {
      const esC = cuernos.includes(i);
      return <g key={i} transform={`translate(${lado * 6} ${yy}) rotate(${ang}) scale(${k})`}>
        <line x1={0} y1={-40} x2={lado * 14} y2={-230} stroke={CZ.arista} strokeWidth={3} />
        {esC ? <>
          <path d="M -16 4 Q -20 -30 -6 -44 L 6 -44 Q 20 -30 16 4 Z" fill={CZ.verde} stroke={KC.ink} strokeWidth={4} />
          <Cuerno x={0} y={-6} largo={150} ancho={30} rot={lado * 6} crece={crece} />
        </> : <>
          <ellipse cx={0} cy={-26} rx={15} ry={30} fill={CZ.grano} stroke={KC.ink} strokeWidth={4} />
          <path d="M -6 -44 Q -9 -26 -5 -10" stroke={CZ.grano2} strokeWidth={5} fill="none" strokeLinecap="round" />
        </>}
      </g>;
    })}
  </g>;
}

// Florecita del centeno de cerca (macro): glumas verdes, ovario con dos estigmas plumosos y tres anteras.
function Florecita({ T, x, y, s = 1, gota = 0, ovario = 0 }) {
  const plum = (dx, dir) => <g transform={`translate(${dx} -150) rotate(${dir * 25 + Math.sin(T * 2 + dx) * 3})`}>
    <line x1={0} y1={0} x2={0} y2={-150} stroke="#fff" strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <g key={i}><line x1={0} y1={-20 - i * 15} x2={-26} y2={-34 - i * 15} stroke="#fff" strokeWidth={4} /><line x1={0} y1={-20 - i * 15} x2={26} y2={-34 - i * 15} stroke="#fff" strokeWidth={4} /></g>)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 120 Q -170 20 -120 -170 Q -60 -40 -10 0 Z" fill={CZ.verde} stroke={KC.ink} strokeWidth={7} />
    {plum(-30, -1)}{plum(30, 1)}
    <ellipse cx={0} cy={-80} rx={60} ry={80} fill={ovario ? mixHex('#d9f0b0', '#f3e6c4', ovario) : '#d9f0b0'} stroke={KC.ink} strokeWidth={6} />
    {[-90, 0, 90].map((dx, i) => { const yy = 40 + Math.sin(T * 2.4 + i) * 8; return <g key={i}><line x1={dx * 0.3} y1={-20} x2={dx} y2={yy} stroke="#f7f2d8" strokeWidth={4} />
      <rect x={dx - 14} y={yy} width={28} height={80} rx={12} fill="#f3d34a" stroke={KC.ink} strokeWidth={5} /></g>; })}
    <path d="M 10 120 Q 170 20 120 -170 Q 60 -40 10 0 Z" fill={CZ.verde2} stroke={KC.ink} strokeWidth={7} />
    {gota > 0 && <g transform={`translate(70 ${-110 + gota * 60})`}>
      <path d={`M 0 ${-40 * gota} Q ${46 * gota} ${10 * gota} 0 ${50 * gota} Q ${-46 * gota} ${10 * gota} 0 ${-40 * gota} Z`} fill={CZ.miel} stroke={KC.ink} strokeWidth={5} opacity=".95" />
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={Math.sin(i * 2.1) * 18 * gota} cy={(i * 9 - 30) * gota * 0.9 + 10} rx={4} ry={2} fill="#fff8e0" stroke={KC.ink} strokeWidth={1} />)}
    </g>}
  </g>;
}

// Corte esquemático de la flor (micro, fondo oscuro): estigma plumoso → estilo → ovario con óvulo.
function CorteFlor({ T, hifa = 0, polen = 0, invade = 0 }) {
  const CAMINO = 'M 540 470 L 540 560 Q 548 650 540 760 Q 532 900 540 1120';
  return <g>
    {[-1, 1].map((d) => <g key={d} transform={`translate(${540 + d * 40} 560) rotate(${d * 20})`}>
      <line x1={0} y1={0} x2={0} y2={-190} stroke="#cfe9ff" strokeWidth={8} opacity=".8" />
      {Array.from({ length: 10 }, (_, i) => <g key={i} opacity=".75"><line x1={0} y1={-18 - i * 17} x2={-34} y2={-34 - i * 17} stroke="#cfe9ff" strokeWidth={5} /><line x1={0} y1={-18 - i * 17} x2={34} y2={-34 - i * 17} stroke="#cfe9ff" strokeWidth={5} /></g>)}
    </g>)}
    <path d="M 500 560 Q 490 680 470 780 L 610 780 Q 590 680 580 560 Z" fill="#2c4a3a" stroke="#9fd4b8" strokeWidth={5} />
    <ellipse cx={540} cy={990} rx={250} ry={230} fill="#244233" stroke="#9fd4b8" strokeWidth={7} />
    <ellipse cx={540} cy={1010} rx={120} ry={140} fill="#33573f" stroke="#9fd4b8" strokeWidth={4} opacity={1 - invade * 0.8} />
    <path d={CAMINO} stroke={KC.lilac} strokeWidth={8} fill="none" strokeDasharray="6 18" strokeLinecap="round" opacity={polen} transform="translate(26 0)" />
    <path d={CAMINO} stroke="#ffe7a0" strokeWidth={9} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${hifa} 2`} style={{ filter:'drop-shadow(0 0 8px #ffd36a)' }} />
    {hifa > 0.02 && hifa < 0.99 && (() => { const yy = klerp(470, 1120, hifa); return <circle cx={540} cy={yy} r={10} fill="#fff4c8" />; })()}
    <clipPath id="czOv"><ellipse cx={540} cy={990} rx={244} ry={224} /></clipPath>
    {invade > 0 && <g clipPath="url(#czOv)"><RedHifas T={T} x={540} y={1120} g={invade} seed={7} n={300} escala={0.3} color="#ffe7a0" ancho={3.5} brillo={0.6} rot={180} /></g>}
    <ellipse cx={540} cy={470} rx={9} ry={3.5} fill="#fff" transform="rotate(70 540 470)" opacity={polen > 0 ? 1 : 0} />
  </g>;
}

// Mosca esquemática.
function Mosca({ x, y, rot = 0, T }) {
  const a = Math.sin(T * 60) * 20;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx={-30} cy={-24} rx={34} ry={14} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${-30 + a} -10 -10)`} />
    <ellipse cx={20} cy={-26} rx={34} ry={14} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${30 - a} 10 -10)`} />
    <ellipse cx={0} cy={0} rx={34} ry={20} fill="#3a3f4a" stroke={KC.ink} strokeWidth={4} />
    <circle cx={34} cy={-2} r={15} fill="#3a3f4a" stroke={KC.ink} strokeWidth={4} />
    <circle cx={40} cy={-8} r={7} fill="#c0392b" />
    {[-14, 0, 14].map((dx, i) => <path key={i} d={`M ${dx} 16 l -8 22`} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

// Mano de frente con dedos hacia arriba; necro 0..1 oscurece las puntas.
function Mano({ x, y, s = 1, necro = 0 }) {
  const dedos = [[-150, -330, 70, 220, -8], [-50, -400, 74, 290, -2], [50, -390, 74, 280, 2], [145, -330, 68, 220, 8]];
  const punta = mixHex(CZ.piel, CZ.muerto, necro);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -210 -120 Q -300 -230 -270 -280 Q -230 -300 -170 -200 Z" fill={CZ.piel} stroke={KC.ink} strokeWidth={7} />
    {dedos.map(([dx, dy, w, h, r], i) => <g key={i} transform={`rotate(${r} ${dx} 0)`}>
      <rect x={dx - w / 2} y={dy} width={w} height={h + 120} rx={w / 2} fill={CZ.piel} stroke={KC.ink} strokeWidth={7} />
      <rect x={dx - w / 2 + 4} y={dy + 4} width={w - 8} height={h * 0.38} rx={(w - 8) / 2} fill={punta} opacity={0.15 + 0.85 * necro} />
      <path d={`M ${dx - 18} ${dy + h * 0.55} Q ${dx} ${dy + h * 0.6} ${dx + 18} ${dy + h * 0.55}`} stroke={CZ.piel2} strokeWidth={4} fill="none" />
    </g>)}
    <path d="M -200 -140 Q -220 120 -120 230 L 130 230 Q 210 120 190 -140 Z" fill={CZ.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -120 -40 Q 0 20 120 -50" stroke={CZ.piel2} strokeWidth={5} fill="none" />
  </g>;
}

// Vaso sanguíneo por dentro (para la Lupa): se estrecha (cierra 0..1) y los glóbulos rojos se frenan.
function VasoInterior({ T, r, cierra = 0 }) {
  const w = 2 * r, cy = r, hueco = klerp(110, 26, cierra);
  const vel = klerp(160, 10, cierra);
  return <svg width={w} height={w} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={0} width={w} height={w} fill="#3a1418" />
    <path d={`M 0 ${cy - 130} Q ${r} ${cy - 130 + (130 - hueco) * 1.0} ${w} ${cy - 130} L ${w} 0 L 0 0 Z`} fill="#c0606a" stroke="#ffb4b4" strokeWidth={5} />
    <path d={`M 0 ${cy + 130} Q ${r} ${cy + 130 - (130 - hueco) * 1.0} ${w} ${cy + 130} L ${w} ${w} L 0 ${w} Z`} fill="#c0606a" stroke="#ffb4b4" strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const xx = ((i * 70 + T * vel) % (w + 80)) - 40; const lim = Math.abs(xx - r) < r * 0.5 ? hueco * 0.55 : 70; const yy = cy + Math.sin(i * 2.3) * Math.min(60, lim);
      return <g key={i} transform={`translate(${xx} ${yy})`} opacity={cierra > 0.85 && Math.abs(xx - r) < r * 0.4 ? 0.3 : 1}><ellipse rx={26} ry={16} fill={CZ.sangre} stroke="#5a0e0e" strokeWidth={3} /><ellipse rx={10} ry={5} fill="#a8201c" /></g>; })}
  </svg>;
}

// Persona (ícono) para el estudio.
function Persona({ x, y, s = 1, color = '#8fb6ff', apagada = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - apagada * 0.65}>
    <circle cx={0} cy={-62} r={26} fill={mixHex(CZ.piel, '#777777', apagada)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={mixHex(color, '#555555', apagada)} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Etiopía, contorno esquemático (lon, lat) → px.
const ETIOPIA = [[36.5,14.3],[37.9,14.9],[39.0,14.6],[40.0,14.4],[41.6,13.5],[42.4,12.5],[41.8,11.6],[42.9,11.0],[44.0,9.0],[47.9,8.0],[45.0,5.0],[43.5,4.8],[42.0,4.0],[41.0,3.9],[39.5,3.4],[38.0,3.6],[36.0,4.5],[35.3,5.5],[34.0,7.2],[33.0,8.0],[34.1,8.6],[34.3,10.6],[35.0,11.8],[36.1,12.8]];
const etP = (lon, lat, X, Y, k) => [X + (lon - 33) * k, Y + (15 - lat) * k];
function MapaEtiopia({ X, Y, k = 28, T, at }) {
  const d = 'M ' + ETIOPIA.map(([a, b]) => etP(a, b, X, Y, k).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const [ax, ay] = etP(39.3, 7.9, X, Y, k), p = kprog(T, at, at + 0.5, kEase.rebote), late = 1 + 0.3 * Math.max(0, Math.sin(T * 6));
  return <g>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {p > 0 && <><circle cx={ax} cy={ay} r={26 * late * p} fill="none" stroke={KC.red} strokeWidth={6} /><circle cx={ax} cy={ay} r={11 * p} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></>}
  </g>;
}

// Granos de cebada (montón) con espiguillas de avena silvestre colgantes y cornezuelos.
function MontonCebada({ T, x, y, s = 1, avenas = 1 }) {
  const r = krng(11), G = [];
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI, rad = Math.sqrt(r()) * 1; G.push([Math.cos(a) * 300 * rad, -Math.sin(a) * 170 * rad, r() * 180]); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -340 0 Q -320 -200 0 -210 Q 320 -200 340 0 Z" fill="#d9bf78" stroke={KC.ink} strokeWidth={7} />
    {G.map(([gx, gy, rot], i) => <ellipse key={i} cx={gx} cy={gy} rx={22} ry={11} transform={`rotate(${rot} ${gx} ${gy})`} fill={CZ.cebada} stroke={KC.ink} strokeWidth={3} />)}
    {avenas > 0 && [[-150, -120, -20], [120, -90, 25], [10, -170, 5]].map(([ax, ay, rr], i) => <g key={i} transform={`translate(${ax} ${ay}) rotate(${rr})`} opacity={avenas}>
      <path d="M 0 0 Q 18 -40 6 -80" stroke={CZ.avena} strokeWidth={5} fill="none" />
      <path d="M -14 0 Q -18 32 0 52 Q 18 32 14 0 Z" fill={CZ.avena} stroke={KC.ink} strokeWidth={3} />
      <path d="M 4 40 q 26 10 30 40" stroke={CZ.arista} strokeWidth={3} fill="none" />
      <Cuerno x={-4} y={8} largo={70} ancho={18} rot={-150} />
    </g>)}
  </g>;
}

// Frasco de medicina (ampolleta con etiqueta).
function Frasco({ x, y, s = 1, color = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-150} width={140} height={210} rx={26} fill="rgba(220,245,255,.92)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-70} y={-40} width={140} height={100} rx={16} fill={color} opacity=".55" />
    <rect x={-44} y={-200} width={88} height={56} rx={10} fill="#e6e9ee" stroke={KC.ink} strokeWidth={6} />
    <rect x={-56} y={-110} width={112} height={56} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <path d="M -10 -82 h 20 M 0 -92 v 20" stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
  </g>;
}

// Matraz con líquido.
function Matraz({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -260 L -40 -120 L -170 120 Q -180 150 -150 150 L 150 150 Q 180 150 170 120 L 40 -120 L 40 -260 Z" fill="rgba(230,248,255,.9)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -118 30 L 118 30 L 170 120 Q 180 150 150 150 L -150 150 Q -180 150 -170 120 Z" fill="#9b7bff" opacity=".75" />
    {Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.7 + i / 5) % 1); return <circle key={i} cx={-80 + i * 40} cy={130 - u * 110} r={8 + u * 6} fill="#fff" opacity={(1 - u) * 0.8} />; })}
    <rect x={-56} y={-280} width={112} height={26} rx={10} fill="#d6dbe2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Núcleo de ergolina (esquemático): anillo A (benceno), pirrol con NH (pentágono), anillos C y D; N en el anillo D.
function Ergolina({ x, y, s = 1, p = 1 }) {
  const hexa = (cx, cy, r = 60) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const pol = (pts) => 'M ' + pts.map((q) => q.join(' ')).join(' L ') + ' Z';
  const PENTA = [[52, -30], [52, 30], [110, 40], [130, -15], [104, -60]];
  const anillos = [hexa(0, 0), PENTA, hexa(52, -90), hexa(0, -180)];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {anillos.map((a, i) => { const q = kprog(p, i * 0.22, i * 0.22 + 0.3); return q > 0 ? <path key={i} d={pol(a)} fill="rgba(255,255,255,.15)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" opacity={q} /> : null; })}
    {p > 0.5 && <><circle cx={110} cy={40} r={22} fill={KC.blue} stroke={KC.ink} strokeWidth={4} /><text x={110} y={48} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">NH</text></>}
    {p > 0.9 && <><circle cx={52} cy={-210} r={16} fill={KC.blue} stroke={KC.ink} strokeWidth={4} /><text x={52} y={-202} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">N</text></>}
  </g>;
}

// Molinito de piedra (dos ruedas).
function Molino({ T, x, y, s = 1, gira = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 95} 0) rotate(${d * T * 90 * gira})`}>
      <circle r={90} fill="#a7a19a" stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={0} y1={0} x2={80 * Math.cos(i * Math.PI / 3)} y2={80 * Math.sin(i * Math.PI / 3)} stroke="#7b766f" strokeWidth={5} />)}
      <circle r={16} fill="#5b5650" stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}

// Pan de centeno (hogaza) con puntitos oscuros.
function Pan({ x, y, s = 1, puntos = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -190 40 Q -200 -110 0 -120 Q 200 -110 190 40 Q 0 70 -190 40 Z" fill="#8a5a2b" stroke={KC.ink} strokeWidth={7} />
    {[-100, -20, 60, 130].map((dx, i) => <path key={i} d={`M ${dx - 30} -60 q 30 -30 60 0`} stroke="#c9905a" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-140 + i * 30} cy={-10 + Math.sin(i * 1.7) * 26} r={6} fill={CZ.cuerno} opacity={puntos} />)}
  </g>;
}

// Figura en llamas (estilo grabado) para el "fuego de San Antonio".
function FiguraFuego({ T, x, y, s = 1 }) {
  const llama = (lx, ly, k0, i, k = k0 * 1.7) => <path key={i} d={`M ${lx - 22 * k} ${ly} Q ${lx} ${ly - (70 + 20 * Math.sin(T * 9 + i)) * k} ${lx + 22 * k} ${ly} Q ${lx} ${ly + 14 * k} ${lx - 22 * k} ${ly} Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={56} fill="#e8d3a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -230 Q 0 -250 60 -230 L 70 20 L -70 20 Z" fill="#9c6b3b" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -220 L -170 -60" stroke="#e8d3a8" strokeWidth={34} strokeLinecap="round" /><path d="M -60 -220 L -170 -60" stroke={KC.ink} strokeWidth={46} strokeLinecap="round" opacity=".0" />
    <path d="M 60 -220 L 170 -60" stroke="#e8d3a8" strokeWidth={34} strokeLinecap="round" />
    <path d="M -40 20 L -70 260" stroke="#e8d3a8" strokeWidth={38} strokeLinecap="round" />
    <path d="M 40 20 L 70 260" stroke="#e8d3a8" strokeWidth={38} strokeLinecap="round" />
    {[[-170, -60, 1], [170, -60, 1], [-70, 262, 1.2], [70, 262, 1.2], [-130, -110, 0.8], [130, -110, 0.8], [-58, 160, 0.9], [58, 160, 0.9]].map(([lx, ly, k], i) => llama(lx, ly, k, i))}
    <path d="M -24 -310 q 8 -8 16 0 M 8 -310 q 8 -8 16 0 M -18 -270 q 18 -14 36 0" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}

// Banda del molino moderno: granos avanzan; los cornezuelos saltan a un lado.
function Banda({ T, a, y = 980 }) {
  const t = T - a, out = [];
  for (let i = 0; i < 16; i++) {
    const esC = i % 4 === 2, x0 = -120 + i * 90 + t * 120, xx = ((x0 % 1440) + 1440) % 1440 - 120;
    if (esC && xx > 640) { const u = Math.min(1, (xx - 640) / 220); out.push(<g key={i} transform={`translate(${640 + u * 60} ${y - 34 + u * u * 220}) rotate(${u * 160})`}><Cuerno x={0} y={20} largo={100} ancho={24} rot={90} /></g>); }
    else if (esC) out.push(<g key={i}><Cuerno x={xx - 50} y={y - 40} largo={100} ancho={24} rot={90} /></g>);
    else out.push(<ellipse key={i} cx={xx} cy={y - 40} rx={36} ry={18} fill={CZ.grano} stroke={KC.ink} strokeWidth={3} />);
  }
  return <g>
    <rect x={-20} y={y - 18} width={1120} height={36} rx={18} fill="#5d6470" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={((i * 100 + t * 120) % 1200) - 40} cy={y} r={10} fill="#8a919c" stroke={KC.ink} strokeWidth={3} />)}
    {out}
    <path d={`M 600 ${y + 170} L 620 ${y + 270} L 800 ${y + 270} L 820 ${y + 170} Z`} fill="#3a3f4a" stroke={KC.ink} strokeWidth={6} />
    <path d="M 900 1160 L 880 1080 L 1060 1080 L 1080 1160" fill="none" stroke={KC.ink} strokeWidth={0} />
  </g>;
}

function CornezueloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Flor, Po: CUES.Polen, Es: CUES.Esporas, Cu: CUES.Cuernito, P: CUES.Pregunta, V: CUES.Vasos, SA: CUES.SanAntonio,
    E: CUES.Estudio, Cul: CUES.Culpable, M: CUES.Medicina, H: CUES.Hofmann, Mo: CUES.Molino, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const ES2 = K.Es + 1.7;                       // de las hifas (micro) a la gota (macro)
  const cierraV = kprog(T, K.V + 0.9, K.V + 2.6, kEase.suave);
  const necro = kprog(T, K.V + 2.0, K.V + 3.6);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la espiga con un grano negro */}
      <Escena T={T} a={K.G} b={K.F} zoom={0.08} origen="35% 45%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity=".55"><Espiga T={T} x={150} y={2150} s={1.3} seed={7} /><Espiga T={T} x={900} y={2200} s={1.4} seed={9} /></g>
          <Espiga T={T} x={380} y={1930} s={2.0} cuernos={[5]} crece={kprog(T, K.G + 0.15, K.G + 0.9)} />
          <Sello T={T} at={K.G + 2.0} x={780} y={1010} texto="HONGO" color={KC.red} r={100} />
        </>)}
      </Escena>
      {/* 1 · la flor del centeno; llega una espora */}
      <Escena T={T} a={K.F} b={K.Po} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Florecita T={T} x={600} y={1060} s={1.5} />
          {(() => { const u = kprog(T, K.F + 0.6, K.F + 2.0, kEase.suave); return <g transform={`translate(${klerp(-40, 560, u)} ${klerp(380, 610, u) + Math.sin(T * 5) * 10 * (1 - u)}) rotate(${70 + u * 20})`}>
            <ellipse rx={34} ry={7} fill="#fff" stroke={KC.ink} strokeWidth={4} /><path d="M -50 0 L -120 0" stroke="#fff" strokeWidth={4} strokeDasharray="8 10" opacity={1 - u} /></g>; })()}
        </>)}
      </Escena>
      {/* 2–3a · micro: la hifa sigue el camino del polen y llena el ovario */}
      <Escena T={T} a={K.Po} b={ES2} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<CorteFlor T={T} polen={kprog(T, K.Po + 0.2, K.Po + 0.8)} hifa={kprog(T, K.Po + 0.6, K.Es - 0.2, kEase.suave)} invade={kprog(T, K.Es - 0.3, ES2 - 0.2, kEase.sale)} />)}
      </Escena>
      {/* 3b · macro: la gota de mielecilla con esporas y el insecto que la lleva */}
      <Escena T={T} a={ES2} b={K.Cu} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Florecita T={T} x={420} y={1060} s={1.5} ovario={1} gota={kprog(T, ES2, ES2 + 0.6, kEase.sale)} />
          {(() => { const u = kprog(T, ES2 + 0.4, K.Cu - 0.2); const xx = u < 0.45 ? klerp(1100, 560, u / 0.45) : u < 0.65 ? 560 : klerp(560, 1150, (u - 0.65) / 0.35); const yy = u < 0.45 ? klerp(700, 840, u / 0.45) : u < 0.65 ? 840 : klerp(840, 620, (u - 0.65) / 0.35);
            return <g><Mosca T={T} x={xx} y={yy} rot={u < 0.65 ? -8 : -20} />{u > 0.55 && <circle cx={xx - 6} cy={yy + 34} r={9} fill={CZ.miel} stroke={KC.ink} strokeWidth={2} />}</g>; })()}
        </>)}
      </Escena>
      {/* 4 · donde iba el grano crece el cornezuelo */}
      <Escena T={T} a={K.Cu} b={K.P} zoom={0.06} origen="40% 50%">
        <FondoLunares color={KC.pink} />
        {fsvg(<Espiga T={T} x={300} y={2060} s={2.25} cuernos={[5]} crece={kprog(T, K.Cu + 0.2, K.Cu + 1.6, kEase.suave)} seed={4} />)}
      </Escena>
      {/* 5 · re-gancho: se muele y acaba en tu pan */}
      <Escena T={T} a={K.P} b={K.V} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Molino T={T} x={270} y={560} s={0.95} />
          {Array.from({ length: 7 }, (_, i) => { const u = ((T - K.P) * 1.4 + i / 7) % 1; return T > K.P ? (i % 3 === 1 ? <Cuerno key={i} x={230 + (i % 3) * 30} y={klerp(380, 470, u) + 40} largo={50} ancho={14} rot={90 + i * 30} /> : <ellipse key={i} cx={230 + (i % 3) * 35} cy={klerp(380, 470, u)} rx={14} ry={8} fill={CZ.grano} stroke={KC.ink} strokeWidth={2} />) : null; })}
          <path d="M 270 680 L 270 800" stroke={KC.ink} strokeWidth={10} strokeDasharray="16 12" strokeDashoffset={-T * 50} />
          <g opacity={kprog(T, K.P + 0.5, K.P + 1.0)}><Pan x={270} y={960} s={kprog(T, K.P + 0.5, K.P + 1.0, kEase.rebote)} /></g>
          {T > K.P + 1.2 && <Interrogacion T={T} x={430} y={1180} tam={260} />}
        </>)}
      </Escena>
      {/* 6 · los vasos se cierran y los dedos se mueren */}
      <Escena T={T} a={K.V} b={K.SA} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        {fsvg(<Mano x={560} y={1480} s={1.25} necro={necro} />)}
        <Lupa T={T} at={K.V + 0.4} until={K.SA - 0.3} x={360} y={560} r={210} fx={610} fy={1040} tinte={KC.red} etiqueta="POR DENTRO · vaso sanguíneo" interior={(TT, r) => <VasoInterior T={TT} r={r} cierra={cierraV} />} />
      </Escena>
      {/* 7 · fuego de San Antonio (Edad Media) */}
      <Escena T={T} a={K.SA} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={90} y={590} width={600} height={640} rx={18} fill={CZ.papel} stroke={KC.ink} strokeWidth={9} transform="rotate(-2 390 910)" />
          <rect x={120} y={620} width={540} height={580} rx={10} fill="none" stroke="#9c6b3b" strokeWidth={4} strokeDasharray="10 8" transform="rotate(-2 390 910)" />
          <FiguraFuego T={T} x={390} y={1000} s={0.85} />
          <text x={390} y={680} textAnchor="middle" transform="rotate(-2 390 910)" style={{ font:`700 34px ${KF.mono}` }} fill="#6b3a1b">“fuego de San Antonio”</text>
        </>)}
      </Escena>
      {/* 8 · el estudio: Arsi, Etiopía, 2001 */}
      <Escena T={T} a={K.E} b={K.Cul} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaEtiopia X={60} Y={800} k={27} T={T} at={K.E + 1.0} />
          {Array.from({ length: 18 }, (_, i) => { const on = kprog(T, K.E + 1.6 + i * 0.08, K.E + 1.9 + i * 0.08, kEase.rebote); return on > 0 ? <Persona key={i} x={560 + (i % 6) * 80} y={930 + Math.floor(i / 6) * 110} s={0.62 * on} color={KC.blue} apagada={i < 3 ? kprog(T, K.E + 4.0 + i * 0.25, K.E + 4.4 + i * 0.25) : 0} /> : null; })}
        </>)}
      </Escena>
      {/* 9 · el culpable: avena silvestre con cornezuelo en la cebada */}
      <Escena T={T} a={K.Cul} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MontonCebada T={T} x={430} y={1180} s={1.05} avenas={kprog(T, K.Cul + 0.8, K.Cul + 1.4)} />
          {(() => { const u = kprog(T, K.Cul + 1.0, K.Cul + 2.0, kEase.sale), gx = klerp(900, 440, u), gy = klerp(560, 760, u); return <g transform={`translate(${gx} ${gy})`}>
            <circle r={150} fill="rgba(220,245,255,.92)" stroke={KC.ink} strokeWidth={14} />
            <g opacity={kprog(T, K.Cul + 1.8, K.Cul + 2.3)}>
              <path d="M -20 -110 Q 10 -60 -6 -20" stroke={CZ.avena} strokeWidth={8} fill="none" />
              <path d="M -34 -30 Q -44 40 0 80 Q 44 40 34 -30 Z" fill={CZ.avena} stroke={KC.ink} strokeWidth={5} />
              <Cuerno x={-10} y={-10} largo={150} ancho={34} rot={-155} />
            </g>
            <line x1={105} y1={105} x2={200} y2={200} stroke={KC.ink} strokeWidth={28} strokeLinecap="round" />
          </g>; })()}
        </>)}
      </Escena>
      {/* 10 · de veneno a medicina */}
      <Escena T={T} a={K.M} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.M + 0.4, K.M + 1.3, kEase.suave); return <>
            <g opacity={1 - u}><Cuerno x={420} y={900} largo={260} ancho={60} rot={-12} /></g>
            <g opacity={u} transform={`translate(420 ${klerp(900, 820, u)}) scale(${klerp(0.4, 1.25, u)})`}><Frasco x={0} y={0} /></g>
            {u > 0.7 && Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + T * 0.6, rr = 210 + Math.sin(T * 4 + i) * 10; return <circle key={i} cx={420 + Math.cos(a) * rr} cy={790 + Math.sin(a) * rr} r={8} fill="#fff" opacity=".8" />; })}
          </>; })()}
        </>)}
      </Escena>
      {/* 11 · 1938: Albert Hofmann */}
      <Escena T={T} a={K.H} b={K.Mo} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Matraz T={T} x={280} y={980} s={1.0} />
          <Ergolina x={520} y={860} s={1.1} p={kprog(T, K.H + 0.5, K.H + 1.8)} />
        </>)}
      </Escena>
      {/* 12 · hoy: el molino lo separa */}
      <Escena T={T} a={K.Mo} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Banda T={T} a={K.Mo} y={860} />)}
      </Escena>
      {/* 13 · cierre: la misma espiga, ahora con su frasquito de medicina */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="35% 45%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity=".55"><Espiga T={T} x={150} y={2150} s={1.3} seed={7} /><Espiga T={T} x={900} y={2200} s={1.4} seed={9} /></g>
          <Espiga T={T} x={380} y={1930} s={2.0} cuernos={[5]} crece={1} />
          {(() => { const u = kprog(T, K.C + 0.8, K.C + 1.4, kEase.rebote); return u > 0 ? <g transform={`translate(640 1020) scale(${u * 0.85}) rotate(8)`}><Frasco x={0} y={0} /></g> : null; })()}
          {T > K.C + 0.8 && <path d="M 300 820 Q 470 760 560 900" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="14 10" opacity={kprog(T, K.C + 1.0, K.C + 1.4)} markerEnd="" />}
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.7} until={K.F - 0.3} texto="centeno quemado" x={330} y={440} tam={44} />
      <Etq T={T} at={K.F + 0.4} until={K.Po - 0.3} x={60} y={420} texto="cornezuelo" tam={44} color={KC.ink} />
      <Etq T={T} at={K.F + 0.8} until={K.Po - 0.3} x={60} y={480} texto="Claviceps purpurea" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.F + 1.8} until={K.Po - 0.3} x={30} y={700} texto="flor del centeno" tam={26} color={KC.ink} />
      <Etq T={T} at={K.F + 2.2} until={K.Po - 0.3} x={30} y={620} texto="espora" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Po + 0.4} until={ES2 - 0.3} x={430} y={420} texto="estigma" lado="izq" tam={30} />
      <Etq T={T} at={K.Po + 0.9} until={K.Es - 0.4} x={500} y={700} texto="camino del polen" lado="izq" tam={28} color={KC.lilac} />
      <Etq T={T} at={K.Po + 1.4} until={ES2 - 0.3} x={600} y={860} texto="hifa" tam={34} color="#ffe7a0" />
      <Etq T={T} at={K.Po + 2.2} until={ES2 - 0.3} x={800} y={1000} texto="ovario" tam={32} />
      <Chip T={T} at={ES2 + 0.5} until={K.Cu - 0.3} texto="mielecilla: jarabe de azúcar + esporas" x={500} y={470} tam={32} borde={CZ.miel} />
      <Etq T={T} at={ES2 + 1.2} until={K.Cu - 0.3} x={60} y={600} texto="insecto" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cu + 1.0} until={K.P - 0.3} x={440} y={830} texto="esclerocio (cornezuelo)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cu + 1.3} until={K.P - 0.3} x={270} y={640} texto="grano de centeno" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cu + 1.8} until={K.P - 0.3} texto="alcaloides: ergotamina, ergometrina…" x={390} y={440} tam={27} borde={KC.lilac} />
      <Chip T={T} at={K.V + 2.4} until={K.SA - 0.3} texto="gangrena" x={830} y={950} tam={40} borde={KC.red} />
      <Chip T={T} at={K.SA + 0.3} until={K.E - 0.3} texto="Edad Media · ergotismo" x={400} y={470} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Cul - 0.3} anio="2001" quien="Arsi, Etiopía · 18 casos" revista="Urga et al., Ethiop. J. Health Dev., 2002" x={380} y={530} />
      <Chip T={T} at={K.E + 2.8} until={K.Cul - 0.3} texto="de 5 a 30 años" x={790} y={800} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.E + 4.3} until={K.Cul - 0.3} x={60} y={1160} texto="3 murieron" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cul + 0.4} until={K.M - 0.3} x={800} y={1100} texto="cebada" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cul + 2.0} until={K.M - 0.3} x={60} y={470} texto="avena silvestre" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Cul + 2.3} until={K.M - 0.3} x={60} y={520} texto="+ cornezuelo" tam={32} color={KC.ink} />
      <Chip T={T} at={K.M + 1.4} until={K.H - 0.3} texto="migraña · dihidroergotamina" x={470} y={990} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.M + 2.4} until={K.H - 0.3} texto="sangrado después del parto · ergometrina" x={500} y={1075} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.H + 0.2} until={K.Mo - 0.3} texto="1938 · Albert Hofmann" x={330} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.Mo - 0.3} x={1040} y={1110} texto="ácido lisérgico → LSD (esquema)" lado="izq" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Mo + 0.6} until={K.C - 0.3} texto="UE: límite de cornezuelo en el grano" x={640} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Mo + 1.4} until={K.C - 0.3} x={600} y={1090} texto="cornezuelo fuera" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="veneno → medicina" x={330} y={440} tam={40} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.F} texto="2 cm" largo={210} />
      <BarraEscala T={T} at={K.F} until={K.Po} texto="1 mm" largo={160} />
      <BarraEscala T={T} at={K.Po} until={ES2} texto="1 mm" largo={200} />
      <BarraEscala T={T} at={ES2} until={K.Cu} texto="1 mm" largo={140} />
      <BarraEscala T={T} at={K.Cu} until={K.P} texto="1 cm" largo={160} />
      <BarraEscala T={T} at={K.P} until={K.V} texto="10 cm" largo={190} />
      <BarraEscala T={T} at={K.V} until={K.SA} texto="2 cm" largo={150} />
      <BarraEscala T={T} at={K.SA} until={K.E} texto="50 cm" largo={150} />
      <BarraEscala T={T} at={K.E} until={K.Cul} texto="500 km" largo={130} />
      <BarraEscala T={T} at={K.Cul} until={K.M} texto="1 cm" largo={100} />
      <BarraEscala T={T} at={K.M} until={K.H} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.H} until={K.Mo} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.Mo} until={K.C} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={210} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="No es centeno quemado: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Po - 0.1} texto="Entra por *la flor del centeno.*" />
      <Subtitulo T={T} idx={2} at={K.Po + 0.1} until={K.Es - 0.1} texto="Sigue *el camino del polen.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Cu - 0.1} texto="Gotas con esporas *y los insectos.*" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.P - 0.1} texto="En lugar del grano: *un cuernito.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.V - 0.1} texto="¿Y si acaba *en tu pan?*" />
      <Subtitulo T={T} idx={6} at={K.V + 0.1} until={K.SA - 0.1} texto="Estrecha tus vasos: *gangrena.*" />
      <Subtitulo T={T} idx={7} at={K.SA + 0.1} until={K.E - 0.1} texto="El *fuego de San Antonio.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Cul - 0.1} texto="2001, Etiopía: *18 con gangrena.*" />
      <Subtitulo T={T} idx={9} at={K.Cul + 0.1} until={K.M - 0.1} texto="Avena silvestre *con cornezuelo.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.H - 0.1} texto="También *salen medicinas.*" />
      <Subtitulo T={T} idx={11} at={K.H + 0.1} until={K.Mo - 0.1} texto="1938: *el LSD.*" />
      <Subtitulo T={T} idx={12} at={K.Mo + 0.1} until={K.C - 0.1} texto="Hoy el molino *lo separa.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Fue veneno… *hoy es medicina.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Po + 1.4, K.Es + 1.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cu + 0.6, K.P - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.V - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.V + 1.8, K.SA + 3.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 2.6, K.Cul + 2.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.M + 0.5, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 0.3, K.Mo - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Mo + 0.4, K.C - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="17" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CornezueloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CornezueloShot /></CompositionStage></div>;
}
window.CornezueloApp = CornezueloApp;
