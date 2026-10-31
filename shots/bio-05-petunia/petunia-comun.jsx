// Biotecnológico #05 · La petunia que brilla sola — dibujos compartidos (narrada y muda).
// Petunia "luciérnaga" con el ciclo del ácido cafeico del hongo Neonothopanus nambi:
// ácido cafeico →(1 hispidina sintasa)→ hispidina →(2 hispidina-3-hidroxilasa)→ luciferina (3-hidroxihispidina)
// →(3 luciferasa + O₂: luz verde ~520–530 nm)→ ácido cafeilpirúvico →(4 cafeilpiruvato hidrolasa)→ ácido cafeico.
// Dibujo esquemático.

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const LUZ = '#9dff6a';            // verde de la luz (~530 nm, esquemático)
const PETALO = '#f4f0ff';

// Flor de petunia (Petunia × hybrida): corola en EMBUDO de pétalos UNIDOS que se abre en 5 lóbulos poco marcados,
// con una vena central por lóbulo y una garganta honda verde-amarillenta pálida (los estambres quedan adentro del tubo).
// La petunia luciérnaga es blanca. Nada de pétalos sueltos ni centro amarillo (eso sería margarita).
// perfil: false = de frente; true = de lado (se ve el tubo, el cáliz y la boca acampanada). brillo: 0..1.
const VENA = '#d8cdf2', GARGANTA = '#dfe9b0', CALIZ = '#2f9a3a';
function bordePetunia(R, n = 120) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    // 5 lóbulos redondeados unidos, con una muesca suave entre cada uno y el borde un poco ondulado
    const r = R * (0.9 + 0.1 * Math.cos(5 * (a + Math.PI / 2)) - 0.03 * Math.pow(Math.abs(Math.sin(2.5 * (a + Math.PI / 2))), 30) + 0.012 * Math.sin(23 * a));
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return 'M ' + pts.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join(' L ') + ' Z';
}
function Petunia({ x = 0, y = 0, s = 1, brillo = 0, rot = 0, T = 0, seed = 1, perfil = false }) {
  const b = kclamp(brillo, 0, 1), late = 0.85 + 0.15 * Math.sin(T * 1.3 + seed);
  const col = mixHex(PETALO, LUZ, 0.75 * b * late), vena = mixHex(VENA, '#5fd84a', b), garg = mixHex(GARGANTA, LUZ, b);
  const gid = 'pg' + seed + (perfil ? 'p' : 'f');
  const halo = b > 0 && <>{[150, 100].map((rr) => <circle key={rr} cy={perfil ? -70 : 0} r={rr} fill={LUZ} opacity={0.35 * b * late} />)}</>;
  if (perfil) {
    // De lado: cáliz verde de 5 sépalos angostos, tubo largo y boca que se abre en campana con el borde ondulado.
    const ond = Array.from({ length: 41 }, (_, i) => { const u = i / 40, xx = -80 + 160 * u; return [xx, -150 + 7 * Math.sin(u * Math.PI * 5)]; });
    return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.2) * 4}) scale(${s})`}>
      {halo}
      <path d="M -12 0 C -14 -50 -22 -95 -80 -150 L 80 -150 C 22 -95 14 -50 12 0 Z" fill={col} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[-40, -14, 14, 40].map((vx, i) => <path key={i} d={`M ${vx * 0.12} -6 Q ${vx * 0.4} -100 ${vx * 1.6} -148`} stroke={vena} strokeWidth={4} fill="none" opacity=".8" />)}
      <ellipse cx={0} cy={-150} rx={80} ry={26} fill={col} stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={0} cy={-150} rx={30} ry={10} fill={garg} />
      <ellipse cx={0} cy={-150} rx={12} ry={5} fill={mixHex('#9bb86a', LUZ, b)} />
      <path d={'M ' + ond.map(([a, c]) => a.toFixed(1) + ' ' + c.toFixed(1)).join(' L ')} stroke={KC.ink} strokeWidth={4} fill="none" opacity=".35" />
      {[-26, -13, 0, 13, 26].map((sx, i) => <path key={'c' + i} d={`M 0 4 Q ${sx * 0.6} -14 ${sx} -34`} stroke={CALIZ} strokeWidth={9} strokeLinecap="round" fill="none" />)}
    </g>;
  }
  const lob = Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2 - Math.PI / 2);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.2) * 4}) scale(${s})`}>
    <defs><radialGradient id={gid}><stop offset="0" stopColor={garg} /><stop offset="0.28" stopColor={mixHex(garg, col, 0.6)} /><stop offset="0.45" stopColor={col} /><stop offset="1" stopColor={col} /></radialGradient></defs>
    {halo}
    <path d={bordePetunia(100)} fill={`url(#${gid})`} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {lob.map((a, i) => <path key={'v' + i} d={`M ${Math.cos(a) * 14} ${Math.sin(a) * 14} L ${Math.cos(a) * 92} ${Math.sin(a) * 92}`} stroke={vena} strokeWidth={5} strokeLinecap="round" opacity=".9" />)}
    {lob.flatMap((a, i) => [-0.22, 0.22].map((d) => <path key={'f' + i + d} d={`M ${Math.cos(a + d * 0.4) * 22} ${Math.sin(a + d * 0.4) * 22} Q ${Math.cos(a + d) * 55} ${Math.sin(a + d) * 55} ${Math.cos(a + d * 1.5) * 80} ${Math.sin(a + d * 1.5) * 80}`} stroke={vena} strokeWidth={3} fill="none" opacity=".6" />))}
    {lob.map((a, i) => { const a2 = a + Math.PI / 5; return <path key={'p' + i} d={`M ${Math.cos(a2) * 70} ${Math.sin(a2) * 70} L ${Math.cos(a2) * 88} ${Math.sin(a2) * 88}`} stroke={KC.ink} strokeWidth={3} opacity=".3" />; })}
    <circle r={16} fill={mixHex('#9bb86a', LUZ, b)} />
    <circle r={8} fill={mixHex('#5e7a3c', LUZ, b * 0.6)} />
  </g>;
}
// Maceta con petunias. brillos: arreglo con el brillo de cada flor (5 flores).
function Maceta({ x = 540, y = 1100, s = 1, brillos = [0, 0, 0, 0, 0], T = 0 }) {
  const F = [[-170, -330, 0.85, false, -18], [20, -420, 1, false, 0], [210, -280, 0.85, true, 28], [-60, -200, 0.7, false, 10], [-250, -170, 0.75, true, -35]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {F.map(([fx, fy], i) => <path key={'t' + i} d={`M 0 0 Q ${fx * 0.4} ${fy * 0.5} ${fx} ${fy}`} stroke="#2a9a3c" strokeWidth={12} fill="none" strokeLinecap="round" />)}
    {[[-120, -120], [120, -110], [-200, -220], [200, -200], [0, -260]].map(([lx, ly], i) => <ellipse key={'h' + i} cx={lx} cy={ly} rx={60} ry={26} transform={`rotate(${i * 40 - 60} ${lx} ${ly})`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />)}
    {F.map(([fx, fy, fs, pf, r], i) => <Petunia key={i} x={fx} y={fy} s={fs} perfil={pf} rot={r} brillo={brillos[i] || 0} T={T} seed={i} />)}
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
