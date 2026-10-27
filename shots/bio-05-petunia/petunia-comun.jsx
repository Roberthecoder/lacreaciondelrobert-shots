// Biotecnológico #05 · La petunia que brilla sola — dibujos compartidos (narrada y muda).
// Petunia "luciérnaga" con el ciclo del ácido cafeico del hongo Neonothopanus nambi:
// ácido cafeico →(1 hispidina sintasa)→ hispidina →(2 hispidina-3-hidroxilasa)→ luciferina (3-hidroxihispidina)
// →(3 luciferasa + O₂: luz verde ~520–530 nm)→ ácido cafeilpirúvico →(4 cafeilpiruvato hidrolasa)→ ácido cafeico.
// Dibujo esquemático.

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const LUZ = '#9dff6a';            // verde de la luz (~530 nm, esquemático)
const PETALO = '#f4f0ff';

// Flor de petunia (trompeta de 5 lóbulos) vista de frente. brillo: 0..1. joven: más brillo.
function Petunia({ x = 0, y = 0, s = 1, brillo = 0, rot = 0, T = 0, seed = 1 }) {
  const b = kclamp(brillo, 0, 1), late = 0.85 + 0.15 * Math.sin(T * 1.3 + seed);
  const lob = Array.from({ length: 5 }, (_, i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a), Math.sin(a), a]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.2) * 4}) scale(${s})`}>
    {b > 0 && <circle r={150} fill={LUZ} opacity={0.35 * b * late} />}
    {b > 0 && <circle r={100} fill={LUZ} opacity={0.35 * b * late} />}
    {lob.map(([c, sn, a], i) => <ellipse key={i} cx={c * 52} cy={sn * 52} rx={58} ry={50} transform={`rotate(${a * 57.3} ${c * 52} ${sn * 52})`} fill={mixHex(PETALO, LUZ, 0.75 * b * late)} stroke={KC.ink} strokeWidth={6} />)}
    {lob.map(([c, sn], i) => <line key={'v' + i} x1={0} y1={0} x2={c * 80} y2={sn * 80} stroke={mixHex('#c9b8ff', '#5fd84a', b)} strokeWidth={4} opacity=".7" />)}
    <circle r={26} fill={mixHex('#ffe7a8', LUZ, b)} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Maceta con petunias. brillos: arreglo con el brillo de cada flor (5 flores).
function Maceta({ x = 540, y = 1100, s = 1, brillos = [0, 0, 0, 0, 0], T = 0 }) {
  const F = [[-170, -330, 0.85], [20, -420, 1], [190, -300, 0.8], [-60, -200, 0.7], [110, -170, 0.65]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {F.map(([fx, fy], i) => <path key={'t' + i} d={`M 0 0 Q ${fx * 0.4} ${fy * 0.5} ${fx} ${fy}`} stroke="#2a9a3c" strokeWidth={12} fill="none" strokeLinecap="round" />)}
    {[[-120, -120], [120, -110], [-200, -220], [200, -200], [0, -260]].map(([lx, ly], i) => <ellipse key={'h' + i} cx={lx} cy={ly} rx={60} ry={26} transform={`rotate(${i * 40 - 60} ${lx} ${ly})`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />)}
    {F.map(([fx, fy, fs], i) => <Petunia key={i} x={fx} y={fy} s={fs} brillo={brillos[i] || 0} T={T} seed={i} />)}
    <path d="M -230 0 L 230 0 L 190 240 L -190 240 Z" fill="#d9744a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-250} y={-40} width={500} height={56} rx={12} fill="#e5865c" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Cielo que pasa de día a noche. noche: 0..1.
function Cielo({ noche = 0, T = 0 }) {
  const n = kclamp(noche, 0, 1), g = krng(9), est = Array.from({ length: 70 }, () => [g() * KW, g() * 1200, 1 + g() * 3, g() * 6]);
  return <>
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex('#8fe8ff', '#0b1030', n)} 0%, ${mixHex('#00d2ff', '#1d1150', n)} 70%, ${mixHex('#7fe0c8', '#0d1424', n)} 100%)` }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {est.map(([x, y, r, f], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={n * (0.3 + 0.5 * (0.5 + 0.5 * Math.sin(T * 2 + f)))} />)}
      <g opacity={1 - n}><circle cx={880} cy={420} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} /></g>
      <g opacity={n}><circle cx={860} cy={400} r={64} fill="#efeaff" stroke={KC.ink} strokeWidth={6} /><circle cx={884} cy={384} r={58} fill={mixHex('#00d2ff', '#1d1150', n)} /></g>
      <rect x={0} y={1320} width={KW} height={600} fill={mixHex('#3fbf4a', '#13301c', n)} />
    </svg>
  </>;
}
// Hongo luminoso (Neonothopanus nambi, esquemático): sombrerito en abanico con brillo verde.
function HongoLuz({ x = 0, y = 0, s = 1, brillo = 1, T = 0 }) {
  const b = brillo * (0.85 + 0.15 * Math.sin(T * 1.6));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-90} r={180} fill={LUZ} opacity={0.25 * b} />
    <path d="M -20 0 Q -10 -80 0 -120 L 20 -120 Q 20 -60 30 0 Z" fill={mixHex('#f2efe4', LUZ, 0.6 * b)} stroke={KC.ink} strokeWidth={6} />
    <path d="M -150 -110 Q 0 -260 150 -110 Q 0 -140 -150 -110 Z" fill={mixHex('#f2efe4', LUZ, 0.8 * b)} stroke={KC.ink} strokeWidth={7} />
    {[-90, -45, 0, 45, 90].map((dx, i) => <line key={i} x1={dx * 0.2} y1={-118} x2={dx} y2={-128} stroke={KC.ink} strokeWidth={3} opacity=".4" />)}
  </g>;
}

// El ciclo del ácido cafeico: 4 moléculas en círculo y 4 enzimas (pacman numerados) en las flechas.
// ver: 0..5 cuánto se ha revelado (1 ácido cafeico, 2 ciclo, 3 hispidina y luciferina, 4 luz, 5 reciclaje).
// gira: posición (0..4) de la molécula que viaja por el ciclo. flash: 0..1 destello de luz.
const NODOS = [
  { n: 'ácido cafeico', c: KC.yellow, an: 1, cola: 2 },
  { n: 'hispidina', c: KC.orange, an: 2, cola: 0 },
  { n: 'luciferina', c: LUZ, an: 2, cola: 1 },
  { n: 'ácido cafeilpirúvico', c: '#ffb3c7', an: 1, cola: 2 },
];
const ENZ = ['hispidina sintasa', 'hidroxilasa', 'luciferasa', 'hidrolasa'];
function CicloCafeico({ T, cx = 540, cy = 860, R = 300, ver = 5, gira = 0, flash = 0, etiquetas = true, enzimaActiva = -1 }) {
  const pos = (k) => { const a = -Math.PI / 2 + (k / 4) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; };
  const visN = (k) => (k === 0 ? kclamp(ver, 0, 1) : k === 3 ? kclamp(ver - 3.6, 0, 1) : kclamp(ver - 2 - (k - 1) * 0.5, 0, 1));
  const visE = (k) => kclamp(ver - 1.5 - (k === 3 ? 2.5 : k * 0.5), 0, 1);
  const [mx, my] = (() => { const a = -Math.PI / 2 + (gira / 4) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; })();
  const kMol = Math.floor(((gira % 4) + 4) % 4 + 0.5) % 4;
  return <g>
    {flash > 0 && <circle cx={pos(2)[0] - 0} cy={pos(2)[1]} r={260 * flash} fill={LUZ} opacity={0.5 * (1 - flash * 0.6)} />}
    <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={8} strokeDasharray="20 16" strokeDashoffset={-T * 30} opacity={kclamp(ver - 1, 0, 1)} />
    {[0, 1, 2, 3].map((k) => { const v = visE(k); if (v <= 0) return null; const a = -Math.PI / 2 + ((k + 0.5) / 4) * Math.PI * 2, ex = cx + Math.cos(a) * R, ey = cy + Math.sin(a) * R;
      const act = enzimaActiva === k ? 1 : 0, boca = 0.5 + 0.5 * Math.sin(T * (act ? 14 : 4) + k);
      return <g key={'e' + k} transform={`translate(${ex} ${ey}) scale(${v * (1 + 0.15 * act)}) rotate(${a * 57.3 + 90})`}>
        <path d={`M 0 0 L ${44 * Math.cos(0.6 * boca)} ${-44 * Math.sin(0.6 * boca)} A 44 44 0 1 0 ${44 * Math.cos(0.6 * boca)} ${44 * Math.sin(0.6 * boca)} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
        <g transform={`rotate(${-(a * 57.3 + 90)})`}><circle cx={-6} cy={-6} r={20} fill={KC.ink} /><text x={-6} y={4} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill={KC.yellow}>{k + 1}</text></g>
      </g>; })}
    {NODOS.map((nd, k) => { const v = visN(k); if (v <= 0) return null; const [x, y] = pos(k);
      return <g key={k} opacity={v}>
        <Molecula x={x - (nd.an - 1) * 40} y={y} s={1.6 * v} color={nd.c} anillos={nd.an} cola={nd.cola} brillo={k === 2 ? flash : 0} />
        {etiquetas && <text x={x} y={y + (k === 0 ? -80 : k === 2 ? 100 : 90)} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={nd.c} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{nd.n}</text>}
      </g>; })}
    {ver >= 2 && gira > 0 && <g><circle cx={mx} cy={my} r={30} fill="#fff" opacity=".85" /><circle cx={mx} cy={my} r={16} fill={NODOS[kMol].c} stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}

// Planta de tabaco (1986): hojas grandes; brillo donde se riega con luciferina.
function Tabaco({ x = 540, y = 1150, brillo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 0 0 L 0 -520" stroke="#2a9a3c" strokeWidth={16} strokeLinecap="round" />
    {[[-1, -120, 1.1], [1, -200, 1], [-1, -300, 0.85], [1, -380, 0.75], [-1, -450, 0.6]].map(([l, h, k], i) => <g key={i} transform={`translate(0 ${h}) scale(${l * k} ${k}) rotate(${-20 + mece(T, i, 0.2) * 4})`}>
      <ellipse cx={120} cy={0} rx={130} ry={56} fill={mixHex('#3fbf4a', LUZ, brillo * 0.8)} stroke={KC.ink} strokeWidth={6} />
      <line x1={0} y1={0} x2={240} y2={0} stroke="#2a7a33" strokeWidth={4} /></g>)}
    {brillo > 0 && <ellipse cx={0} cy={-300} rx={300} ry={330} fill={LUZ} opacity={0.18 * brillo} />}
    <path d="M -150 0 L 150 0 L 120 170 L -120 170 Z" fill="#d9744a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}

Object.assign(window, { AVS, SOMBRA, LUZ, Petunia, Maceta, Cielo, HongoLuz, NODOS, ENZ, CicloCafeico, Tabaco });
