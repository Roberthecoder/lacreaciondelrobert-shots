// iceberg-cine.jsx — piezas de cine reutilizables del Shot Fungi Mati #155 (El iceberg de los hongos), 26 nov 2026.
// Dibujo con degradados, sin contornos negros (el filtro #cine-vol de cine.jsx pone el relieve) y lo micro en línea luminosa.
// Piezas: utilidades (icCurva, icRamas, icDentro), ChampinonCine (Agaricus bisporus), PuntaHielo, MarSuperficie, IcebergEntero
// (iceberg completo con micelio que se enciende por profundidad), ColumnaHielo (fondo del descenso: hielo, agua, rayos de luz,
// micelio, nieve marina y bokeh con paralaje), Plantula, SueloCorte, HogazaCorte, Levadura, PetriCine, HifaPared,
// EscarabajoCine, TroncoPodrido, Mycena, BosqueCorte, NudoMicelio, HojaCine, HormigaCine, AnilloTrampa, Nematodo,
// RamaSchizo, AbanicoLado, AbanicoDebajo, MesaLab, PlacaNegra, SimboloRadiacion, Lbl, Tarjeta, NivelMarca, ReglaProf.

/* ---------------- utilidades ---------------- */
const icF = (v) => Math.round(v * 10) / 10;
function icCurva(pts, cerrada = false, k = 1) {
  const n = pts.length; if (n < 2) return '';
  const P = (i) => (cerrada ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M ${icF(pts[0][0])} ${icF(pts[0][1])}`;
  const lim = cerrada ? n : n - 1;
  for (let i = 0; i < lim; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    d += ` C ${icF(p1[0] + (p2[0] - p0[0]) / 6 * k)} ${icF(p1[1] + (p2[1] - p0[1]) / 6 * k)} ${icF(p2[0] - (p3[0] - p1[0]) / 6 * k)} ${icF(p2[1] - (p3[1] - p1[1]) / 6 * k)} ${icF(p2[0])} ${icF(p2[1])}`;
  }
  return d + (cerrada ? ' Z' : '');
}
const icPoli = (pts) => 'M ' + pts.map((p) => icF(p[0]) + ' ' + icF(p[1])).join(' L ');
function icDentro(poly, x, y) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const icMix = (a, b, t) => (typeof mixHex === 'function' ? mixHex(a, b, kclamp(t, 0, 1)) : b);
// Ramificación natural (micelio, raíces, hifas): ramas que salen de puntos intermedios, con sesgo hacia una dirección.
function icRamas({ seed = 1, x, y, ang = Math.PI / 2, len = 200, gen = 5, nb = [3, 2], dentro, sesgo = Math.PI / 2, fuerza = 0.1, jit = 0.32, paso = 12, abre = [0.45, 0.6], acorta = [0.6, 0.2] }) {
  const rnd = krng(seed), out = [];
  const rama = (x0, y0, a0, L, g) => {
    if (g > gen || L < paso * 1.5) return;
    const pts = [[x0, y0]]; let a = a0, px = x0, py = y0; const n = Math.max(3, Math.round(L / paso));
    for (let i = 0; i < n; i++) {
      a += (rnd() - 0.5) * jit; a = a * (1 - fuerza) + sesgo * fuerza;
      px += Math.cos(a) * L / n; py += Math.sin(a) * L / n;
      if (dentro && !dentro(px, py)) break;
      pts.push([px, py]);
    }
    if (pts.length < 2) return;
    out.push({ pts, g, y0: Math.min(...pts.map((p) => p[1])), d: icCurva(pts) });
    const k = nb[Math.min(g, nb.length - 1)];
    for (let j = 0; j < k; j++) {
      const p = pts[Math.min(pts.length - 1, Math.max(1, Math.floor((0.3 + 0.65 * rnd()) * (pts.length - 1))))];
      rama(p[0], p[1], a + (rnd() < 0.5 ? -1 : 1) * (abre[0] + abre[1] * rnd()), L * (acorta[0] + acorta[1] * rnd()), g + 1);
    }
  };
  rama(x, y, ang, len, 0);
  return out;
}
// Línea que brilla: halo ancho + cuerpo + núcleo claro. ns = sin escalar el trazo (vector-effect).
function Brilla({ d, color = '#ffd99a', w = 2, o = 1, ns = false, nucleo = '#fff6df' }) {
  if (o <= 0.01) return null;
  const ve = ns ? 'non-scaling-stroke' : undefined;
  return <g opacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke={color} strokeWidth={w * 5} opacity={0.12} vectorEffect={ve} />
    <path d={d} stroke={color} strokeWidth={w * 2.2} opacity={0.32} vectorEffect={ve} />
    <path d={d} stroke={nucleo} strokeWidth={w} opacity={0.95} vectorEffect={ve} />
  </g>;
}
// Parcial de una polilínea (para que una línea "viaje"): devuelve los puntos hasta la fracción f del largo.
function icParcial(pts, f) {
  if (f >= 1) return pts; if (f <= 0) return [pts[0]];
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(l); tot += l; }
  let r = tot * f; const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) { if (r >= L[i - 1]) { out.push(pts[i]); r -= L[i - 1]; } else { const u = r / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } }
  return out;
}
// Borde orgánico: círculo/elipse con ruido (colonias, abanicos, migajón).
function icBlob(cx, cy, rx, ry, seed, amp = 0.08, n = 28, fase = 0) {
  const rnd = krng(seed); const k = Array.from({ length: 5 }, () => [rnd() * 6.28, 2 + Math.floor(rnd() * 6)]);
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; let m = 1; k.forEach(([ph, f], j) => { m += Math.sin(a * f + ph + fase * (j + 1)) * amp / (j + 1); }); return [cx + Math.cos(a) * rx * m, cy + Math.sin(a) * ry * m]; });
  return icCurva(pts, true);
}

/* ---------------- champiñón (Agaricus bisporus) ---------------- */
// Base del pie en (x, y). Con s = 1 el sombrero mide 1000 px de ancho y todo mide 850 px de alto.
function ChampinonCine({ x = 0, y = 0, s = 1, id = 'ch' }) {
  const lam = [];
  for (let i = 0; i <= 64; i++) {
    const a = Math.PI * (i / 64); const ex = Math.cos(a), ey = Math.sin(a);
    lam.push(<line key={i} x1={icF(ex * 70)} y1={icF(-330 + ey * 14)} x2={icF(ex * 478)} y2={icF(-352 + ey * 92)} stroke={i % 2 ? '#5a3a33' : '#7d544a'} strokeWidth={i % 2 ? 2 : 3.2} opacity={0.75} />);
  }
  const esc = []; const r = krng(9);
  for (let i = 0; i < 46; i++) { const a = -Math.PI * (0.12 + 0.76 * r()), rr = 160 + 300 * r(); const cx = Math.cos(a) * rr * 1.02, cy = -560 + Math.sin(a) * rr * 0.62; esc.push(<path key={i} d={`M ${icF(cx)} ${icF(cy)} q ${icF(6 + 10 * r())} ${icF(-4 - 6 * r())} ${icF(18 + 14 * r())} ${icF(-2)}`} stroke="#b59b7c" strokeWidth={2.4} fill="none" opacity={0.42} />); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id={id + 'p'} x1="0" x2="1"><stop offset="0" stopColor="#a59278" /><stop offset=".42" stopColor="#f2eadd" /><stop offset=".72" stopColor="#e2d5c1" /><stop offset="1" stopColor="#97836a" /></linearGradient>
      <radialGradient id={id + 's'} cx=".36" cy=".26" r=".85"><stop offset="0" stopColor="#fffbf3" /><stop offset=".42" stopColor="#f1e7d6" /><stop offset=".78" stopColor="#d4c0a3" /><stop offset="1" stopColor="#a38c70" /></radialGradient>
      <linearGradient id={id + 'l'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a302b" /><stop offset=".6" stopColor="#9a6c60" /><stop offset="1" stopColor="#c99a8c" /></linearGradient>
      <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6efe4" /><stop offset="1" stopColor="#bfae95" /></linearGradient>
      <radialGradient id={id + 'b'} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
    </defs>
    {/* laminillas (vistas desde un poco abajo) */}
    <ellipse cx={0} cy={-345} rx={482} ry={96} fill={`url(#${id}l)`} />
    {lam}
    {/* pie con fibrillas y sombra del sombrero */}
    <path d="M -82 0 C -96 -40 -74 -170 -64 -332 L 64 -332 C 74 -170 96 -40 82 0 Q 0 22 -82 0 Z" fill={`url(#${id}p)`} />
    {[-40, -14, 12, 38].map((dx, i) => <path key={i} d={`M ${dx} -320 C ${dx - 4} -220 ${dx + 6} -110 ${dx * 1.15} -10`} stroke="#bba98f" strokeWidth={2} fill="none" opacity={0.45} />)}
    <path d="M -64 -332 L 64 -332 L 68 -268 L -68 -268 Z" fill="#5a4636" opacity={0.35} />
    {/* anillo (velo parcial) */}
    <path d="M -64 -270 C -96 -262 -112 -240 -110 -214 Q -56 -202 0 -204 Q 56 -202 110 -214 C 112 -240 96 -262 64 -270 Z" fill={`url(#${id}a)`} opacity=".92" />
    <path d="M -110 -214 Q -56 -202 0 -204 Q 56 -202 110 -214" stroke="#a8957d" strokeWidth={3} fill="none" opacity=".6" /><path d="M -100 -232 Q 0 -222 100 -232" stroke="#ffffff" strokeWidth={3} fill="none" opacity=".35" />
    {/* sombrero */}
    <path d="M -505 -372 C -512 -430 -470 -575 -360 -700 C -262 -805 -128 -852 0 -852 C 128 -852 262 -805 360 -700 C 470 -575 512 -430 505 -372 C 400 -392 210 -400 0 -400 C -210 -400 -400 -392 -505 -372 Z" fill={`url(#${id}s)`} />
    {esc}
    <path d="M -505 -372 C -400 -392 -210 -400 0 -400 C 210 -400 400 -392 505 -372" stroke="#fbf4e8" strokeWidth={9} fill="none" opacity={0.8} />
    <ellipse cx={-180} cy={-690} rx={170} ry={78} transform="rotate(-24 -180 -690)" fill={`url(#${id}b)`} />
    <ellipse cx={-34} cy={-120} rx={18} ry={60} fill="#fff" opacity={0.16} />
  </g>;
}

/* ---------------- punta del iceberg y mar (coordenadas de pantalla: 0 = línea del mar) ---------------- */
const PUNTA = [[-400, 0], [-372, -54], [-338, -86], [-316, -160], [-262, -206], [-226, -286], [-150, -340], [-86, -390], [30, -406], [100, -370], [160, -330], [214, -262], [270, -218], [300, -140], [350, -96], [388, -30], [410, 0]];
function PuntaHielo({ T = 0, id = 'pt' }) {
  return <g>
    <defs>
      <linearGradient id={id + 'h'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f8fb" /><stop offset=".45" stopColor="#bcd9e6" /><stop offset="1" stopColor="#6d9cb6" /></linearGradient>
      <linearGradient id={id + 'r'} x1="0" x2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset=".7" stopColor="#f3c7a4" stopOpacity="0" /><stop offset="1" stopColor="#f3c7a4" stopOpacity=".55" /></linearGradient>
    </defs>
    <path d={icPoli(PUNTA) + ' Z'} fill={`url(#${id}h)`} />
    <path d={icPoli(PUNTA) + ' Z'} fill={`url(#${id}r)`} />
    {/* facetas: luz y sombra del hielo */}
    <path d="M -338 -86 L -262 -206 L -226 -286 L -200 -150 L -290 -40 Z" fill="#ffffff" opacity=".28" />
    <path d="M 160 -330 L 214 -262 L 270 -218 L 240 -110 L 130 -180 Z" fill="#3d6f8c" opacity=".3" />
    <path d="M 300 -140 L 350 -96 L 388 -30 L 290 -20 Z" fill="#3d6f8c" opacity=".35" />
    <path d="M -170 -344 L -92 -392 L 30 -406 L -30 -300 Z" fill="#ffffff" opacity=".35" />
    <path d="M -40 -300 L 60 -250 L 20 -120 L -110 -160 Z" fill="#9cc4d8" opacity=".35" />
    {/* nieve en las cornisas */}
    <path d="M -186 -340 Q -120 -360 -92 -392 Q 0 -414 30 -406 Q 70 -400 104 -372 Q 40 -380 -10 -366 Q -100 -350 -186 -340 Z" fill="#ffffff" opacity=".9" />
    <path d="M -316 -160 Q -290 -190 -262 -206 Q -280 -186 -300 -150 Z" fill="#ffffff" opacity=".8" />
    {/* grietas */}
    <path d="M -230 -250 L -200 -180 L -214 -110 M -200 -180 L -160 -150" stroke="#e9f6ff" strokeWidth={3} fill="none" opacity=".6" />
    <path d="M 180 -230 L 205 -160 L 192 -80" stroke="#2f5d77" strokeWidth={3} fill="none" opacity=".45" />
    
    {/* sombra del champiñón */}
    <ellipse cx={0} cy={-396} rx={150} ry={22} fill="#365a74" opacity=".38" />
  </g>;
}
// Olas con espuma y salpicaduras (coordenadas de pantalla, 0 = línea del mar). La espuma choca con la punta en x≈±540.
function MarSuperficie({ T = 0, id = 'ms' }) {
  const ola = (x, k = 1) => 10 * Math.sin(x / 92 + T * 2.3) * k + 6 * Math.sin(x / 37 - T * 3.4) * k + 3 * Math.sin(x / 15 + T * 5);
  const lado = (x0, x1) => { const pts = []; for (let x = x0; x <= x1; x += 14) pts.push([x, ola(x)]); return pts; };
  const L = lado(-7000, -392), R = lado(400, 7000);
  const cuerpo = (pts) => icPoli(pts) + ` L ${pts[pts.length - 1][0]} 70 L ${pts[0][0]} 70 Z`;
  const gotas = [];
  [[-396, -1], [406, 1]].forEach(([bx, dir], j) => {
    for (let i = 0; i < 16; i++) {
      const per = 1.25 + (i % 5) * 0.09, u = ((T + i * 0.173 + j * 0.31) % per) / per;
      const vx = dir * (40 + (i * 37) % 140), vy = 160 + (i * 53) % 190;
      const gx = bx + vx * u, gy = -vy * u + 380 * u * u;
      if (gy < 12) gotas.push(<circle key={j * 40 + i} cx={icF(gx)} cy={icF(gy)} r={3 + (i % 4) * 2.2} fill="#eef9ff" opacity={icF((1 - u) * 0.85)} />);
    }
  });
  const esp = (pts, k) => pts.filter((_, i) => i % 3 === k).map((p, i) => <ellipse key={k + '-' + i} cx={icF(p[0])} cy={icF(p[1] + 3)} rx={9 + (i % 4) * 4} ry={3.5} fill="#f4fbff" opacity={0.55 + 0.3 * Math.sin(i + T * 3)} />);
  return <g>
    <defs>
      <linearGradient id={id + 'a'} x1="0" y1="-20" x2="0" y2="70" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4e8a99" stopOpacity=".95" /><stop offset=".35" stopColor="#2f6d80" stopOpacity=".7" /><stop offset="1" stopColor="#2f6d80" stopOpacity="0" /></linearGradient>
    </defs>
    <path d={cuerpo(L)} fill={`url(#${id}a)`} /><path d={cuerpo(R)} fill={`url(#${id}a)`} />
    <path d={icPoli(L)} stroke="#e7f4f8" strokeWidth={4} fill="none" opacity=".75" /><path d={icPoli(R)} stroke="#e7f4f8" strokeWidth={4} fill="none" opacity=".75" />
    {esp(L.filter((p) => p[0] > -1400), 0)}{esp(R.filter((p) => p[0] < 1400), 1)}
    {/* espuma donde rompe la ola contra el hielo */}
    <path d={icBlob(-396, 2, 60, 18, 3, 0.25, 20, T)} fill="#f4fbff" opacity=".85" />
    <path d={icBlob(408, 2, 64, 20, 5, 0.25, 20, T * 1.2)} fill="#f4fbff" opacity=".85" />
    {gotas}
  </g>;
}

/* ---------------- el iceberg completo (vista general) ---------------- */
// Coordenadas de la vista general: mar en y = 520; el champiñón (escala 0.09) nace en la punta (540, 484).
const ICE_OV = [[505, 520], [577, 520], [650, 556], [700, 610], [770, 650], [810, 740], [880, 820], [905, 930], [950, 1010], [948, 1130], [985, 1250], [950, 1370], [962, 1460], [905, 1570], [860, 1650], [790, 1700], [720, 1790], [610, 1815], [540, 1850], [440, 1800], [350, 1770], [290, 1690], [210, 1640], [180, 1520], [128, 1420], [140, 1290], [108, 1170], [150, 1060], [170, 940], [230, 860], [262, 760], [340, 690], [390, 610], [450, 575]];
const ICE_OV_D = 'M 505 520 L 577 520 ' + icCurva(ICE_OV.slice(1).concat([[505, 520]]), false, 0.35).replace(/^M [^C]*/, '') + ' Z';
const ICE_OV_IN = ICE_OV.map(([x, y]) => [540 + (x - 540) * 0.93, 520 + (y - 520) * 0.97]);
const MIC_OV = (() => {
  const dentro = (x, y) => y > 486 && (y < 524 ? Math.abs(x - 540) < 40 : icDentro(ICE_OV_IN, x, y));
  let out = [];
  [[Math.PI / 2, 330, 1], [Math.PI / 2 + 0.75, 300, 2], [Math.PI / 2 - 0.75, 300, 3], [Math.PI / 2 + 0.25, 360, 4], [Math.PI / 2 - 0.3, 340, 5]].forEach(([a, L, sd]) => {
    out = out.concat(icRamas({ seed: 155 + sd * 7, x: 540, y: 490, ang: a, len: L, gen: 5, nb: [3, 2, 2], dentro, sesgo: Math.PI / 2, fuerza: 0.06, jit: 0.38, paso: 14, abre: [0.4, 0.7], acorta: [0.62, 0.22] }));
  });
  [[520, 900, 0.4, 11], [380, 1150, 0.9, 12], [690, 1200, -0.3, 13], [540, 1420, 0.2, 14], [300, 1450, 1.2, 15], [760, 1480, -0.8, 16]].forEach(([x, y, da, sd]) => {
    out = out.concat(icRamas({ seed: 900 + sd, x, y, ang: Math.PI / 2 + da, len: 260, gen: 4, nb: [3, 2, 2], dentro, sesgo: Math.PI / 2, fuerza: 0.04, jit: 0.45, paso: 14, abre: [0.5, 0.7], acorta: [0.62, 0.22] }));
  });
  return out;
})();
const MIC_TIP = icRamas({ seed: 77, x: 0, y: -392, ang: Math.PI / 2, len: 560, gen: 4, nb: [3, 2], dentro: (x, y) => (y < 0 ? icDentro(PUNTA, x, y) : Math.abs(x) < 400 + 1.6 * y), fuerza: 0.08, jit: 0.4, paso: 18, abre: [0.45, 0.6] });
const BURB_OV = (() => { const r = krng(42), o = []; while (o.length < 70) { const x = 140 + r() * 820, y = 540 + r() * 1280; if (icDentro(ICE_OV_IN, x, y)) o.push([x, y, 1 + r() * 3.2]); } return o; })();
// nodos: cada escena del descenso como un brillo a su profundidad (vista general)
const NODOS_OV = [[420, 640, '#bfe39a'], [640, 690, '#ffd9a0'], [470, 790, '#9fe0c8'], [650, 860, '#c9b8ff'], [400, 980, '#a6f08a'], [660, 1060, '#ffc46a'], [540, 1160, '#ffe2a8'], [440, 1270, '#e8c79a'], [650, 1370, '#bdf3ff'], [450, 1480, '#f2ece0'], [620, 1580, '#d8b84a']];
const NIVELES_OV = [[620, '1'], [770, '2'], [960, '3'], [1250, '4'], [1460, '5']];

function IcebergEntero({ T, luz = 1800, nodos = 0, niveles = 0, s = 1 }) {
  const rayos = [[600, -0.18], [760, 0.05], [380, -0.32], [900, 0.2], [500, -0.06]];
  const caus = [];
  for (let i = 0; i < 9; i++) { const y0 = 540 + i * 14; const pts = []; for (let x = 470; x <= 720; x += 10) pts.push([x - (y0 - 540) * 0.6, y0 + 3 * Math.sin(x / 13 + T * 2.4 + i) + 2 * Math.sin(x / 7 - T * 3.1)]); caus.push(<path key={i} d={icPoli(pts)} stroke="#e8fbff" strokeWidth={1.1} fill="none" opacity={0.35 - i * 0.03} vectorEffect="non-scaling-stroke" />); }
  return <g>
    <defs>
      <linearGradient id="ovCielo" x1="0" y1="-300" x2="0" y2="520" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0d1222" /><stop offset=".55" stopColor="#1d2238" /><stop offset=".82" stopColor="#4a4058" /><stop offset=".95" stopColor="#9a7266" /><stop offset="1" stopColor="#c99579" /></linearGradient>
      <linearGradient id="ovMar" x1="0" y1="520" x2="0" y2="1950" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2a6878" /><stop offset=".22" stopColor="#1a4060" /><stop offset=".55" stopColor="#111d34" /><stop offset="1" stopColor="#0b0e16" /></linearGradient>
      <linearGradient id="ovHielo" x1="0" y1="520" x2="0" y2="1840" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5f97aa" /><stop offset=".25" stopColor="#3d7592" /><stop offset=".6" stopColor="#24426c" /><stop offset="1" stopColor="#141b33" /></linearGradient>
      <linearGradient id="ovRayo" x1="0" y1="520" x2="0" y2="1500" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#e6f6ff" stopOpacity=".28" /><stop offset="1" stopColor="#e6f6ff" stopOpacity="0" /></linearGradient>
      <radialGradient id="ovSol" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd9b0" stopOpacity=".9" /><stop offset=".3" stopColor="#f2b48c" stopOpacity=".45" /><stop offset="1" stopColor="#f2b48c" stopOpacity="0" /></radialGradient>
      <radialGradient id="ovNodo" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffffff" stopOpacity=".9" /><stop offset=".25" stopColor="#ffffff" stopOpacity=".35" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={-3000} y={-3000} width={7000} height={3520} fill="url(#ovCielo)" />
    {Array.from({ length: 50 }, (_, i) => { const r = krng(i + 300); return <circle key={i} cx={icF(-200 + r() * 1500)} cy={icF(-200 + r() * 520)} r={0.8 + r() * 1.4} fill="#e8eeff" opacity={0.25 + 0.4 * r()} vectorEffect="non-scaling-stroke" />; })}
    <circle cx={790} cy={520} r={70} fill="url(#ovSol)" />
    <rect x={-3000} y={519} width={7000} height={3000} fill="url(#ovMar)" />
    {rayos.map(([x, a], i) => <path key={i} d={`M ${x - 18} 520 L ${x + 18} 520 L ${x + 18 + Math.tan(a + 0.03 * Math.sin(T * 0.6 + i)) * 1000 + 90} 1520 L ${x - 18 + Math.tan(a + 0.03 * Math.sin(T * 0.6 + i)) * 1000 - 90} 1520 Z`} fill="url(#ovRayo)" />)}
    <path d={ICE_OV_D} fill="url(#ovHielo)" opacity=".94" />
    <path d={ICE_OV_D} fill="none" stroke="#cdeef7" strokeWidth={2} opacity=".45" vectorEffect="non-scaling-stroke" />
    {/* facetas y grietas del hielo */}
    <path d="M 640 560 L 720 640 L 800 760 L 690 700 Z" fill="#ffffff" opacity=".08" />
    <path d="M 190 900 L 270 760 L 330 860 L 240 1020 Z" fill="#ffffff" opacity=".07" />
    <path d="M 930 1060 L 960 1240 L 870 1180 Z" fill="#000814" opacity=".15" />
    <path d="M 300 1740 L 420 1810 L 470 1700 Z" fill="#000814" opacity=".18" />
    {['M 760 820 L 790 900 L 770 960', 'M 260 1300 L 300 1360 L 280 1420', 'M 820 1400 L 790 1470', 'M 400 700 L 430 760'].map((d, i) => <path key={i} d={d} stroke="#dff5ff" strokeWidth={1.2} fill="none" opacity=".35" vectorEffect="non-scaling-stroke" />)}
    {BURB_OV.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#dff5ff" strokeWidth={0.8} opacity={0.35} vectorEffect="non-scaling-stroke" />)}
    {caus}
    {/* micelio dentro del hielo, encendido hasta la profundidad «luz» */}
    {MIC_OV.map((b, i) => { const o = kprog(luz, b.y0, b.y0 + 90); return o > 0.01 ? <Brilla key={i} d={b.d} w={Math.max(0.8, 2.3 - b.g * 0.25) * Math.min(1.6, Math.max(1, s))} o={o * (0.8 - b.g * 0.07)} ns /> : null; })}
    {/* niveles: líneas finas a un costado */}
    {niveles > 0.01 && NIVELES_OV.map(([y, n], i) => <g key={i} opacity={niveles * 0.7}>
      <line x1={70} y1={y} x2={130} y2={y} stroke="#dfe9ff" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </g>)}
    {/* cada escena como brillo a su profundidad */}
    {NODOS_OV.map(([x, y, c], i) => { const o = kclamp(nodos * 11 - i, 0, 1); return o > 0.01 ? <g key={i} opacity={o}>
      <circle cx={x} cy={y} r={34 + 4 * Math.sin(T * 3 + i)} fill="url(#ovNodo)" opacity=".55" />
      <circle cx={x} cy={y} r={16} fill={c} opacity=".35" /><circle cx={x} cy={y} r={6} fill={c} /><circle cx={x} cy={y} r={2.6} fill="#fff" />
    </g> : null; })}
    {/* punta, champiñón y mar a escala de pantalla (0.09) */}
    <g transform="translate(540 520) scale(0.09)">
      <PuntaHielo T={T} />
      {MIC_TIP.map((b, i) => <Brilla key={i} d={b.d} w={Math.max(2, 6 - b.g * 1.1)} o={kprog(luz, 400, 520) * (0.9 - b.g * 0.1)} />)}
      <ChampinonCine x={0} y={-392} s={1} id="chOV" />
      <MarSuperficie T={T} />
    </g>
  </g>;
}

/* ---------------- columna del descenso (fondo con paralaje) ---------------- */
const PROF_COLS = ['#2b6b7c', '#1f5170', '#173356', '#111e38', '#0c1222', '#0e0f12'];
function icProfColor(d) { d = kclamp(d, 0, 1) * (PROF_COLS.length - 1); const i = Math.min(PROF_COLS.length - 2, Math.floor(d)); return icMix(PROF_COLS[i], PROF_COLS[i + 1], d - i); }
// bordes del hielo (derecha) y cordones de micelio, función continua de la profundidad del mundo
const icBorde = (y) => 960 + 60 * Math.sin(y / 1500 + 1) + 38 * Math.sin(y / 520);
const icCordon = (i, y) => [250, 560, 820][i] + 110 * Math.sin(y / 700 + i * 2.1) + 45 * Math.sin(y / 230 + i * 1.3);
function ColumnaHielo({ T, Y, pulso = 0, luzMic = 1 }) {
  const d = Y / 17800, c0 = icProfColor(d - 0.02), c1 = icProfColor(d + 0.06);
  const rayo = Math.pow(kclamp(1 - d * 1.6, 0, 1), 2);
  // hielo con paralaje 0.6: grietas, burbujas y planos de faceta por baldosa
  const PY = Y * 0.6, baldosas = [];
  for (let k = Math.floor((PY - 200) / 1600); k <= Math.floor((PY + 2100) / 1600); k++) {
    const r = krng(900 + k * 13), oy = k * 1600 - PY;
    for (let j = 0; j < 3; j++) { const x0 = 80 + r() * 900, y0 = oy + r() * 1600; const pts = [[x0, y0]]; for (let q = 0; q < 4; q++) pts.push([pts[q][0] + (r() - 0.5) * 120, pts[q][1] + 40 + r() * 70]); baldosas.push(<path key={`g${k}-${j}`} d={icPoli(pts)} stroke="#d8f3ff" strokeWidth={1.4} fill="none" opacity={0.2} />); }
    for (let j = 0; j < 2; j++) { const x0 = r() * 900, y0 = oy + r() * 1500; baldosas.push(<path key={`f${k}-${j}`} d={`M ${icF(x0)} ${icF(y0)} l ${icF(200 + r() * 200)} ${icF(-60 - r() * 80)} l ${icF(80 + r() * 100)} ${icF(260 + r() * 200)} l ${icF(-260)} ${icF(60)} Z`} fill="#ffffff" opacity={0.035} />); }
    for (let j = 0; j < 16; j++) { const x0 = 40 + r() * 1000, y0 = oy + r() * 1600, rr = 3 + r() * 10; baldosas.push(<g key={`b${k}-${j}`}><circle cx={icF(x0)} cy={icF(y0)} r={icF(rr)} fill="#e8f8ff" fillOpacity={0.05} stroke="#cfeeff" strokeWidth={1.2} strokeOpacity={0.35} /><circle cx={icF(x0 - rr * 0.35)} cy={icF(y0 - rr * 0.35)} r={icF(rr * 0.25)} fill="#fff" opacity={0.5} /></g>); }
  }
  // micelio con paralaje 0.8
  const MY = Y * 0.8, cord = [], ram = [];
  for (let i = 0; i < 3; i++) {
    const pts = []; for (let y = MY - 160; y <= MY + 2100; y += 30) pts.push([icCordon(i, y), y - MY]);
    cord.push(<Brilla key={'c' + i} d={icPoli(pts)} w={2.2} o={0.55 * luzMic} />);
    for (let y = Math.floor((MY - 160) / 150) * 150; y <= MY + 2100; y += 150) {
      const r = krng(i * 1000 + y), dir = r() < 0.5 ? -1 : 1, x0 = icCordon(i, y);
      const p = [[x0, y - MY]]; let a = dir > 0 ? 0.35 : Math.PI - 0.35; for (let q = 0; q < 5; q++) { a += (r() - 0.5) * 0.7; p.push([p[q][0] + Math.cos(a) * 34, p[q][1] + Math.sin(a) * 34]); }
      ram.push(<Brilla key={`r${i}-${y}`} d={icCurva(p)} w={1.2} o={0.45 * luzMic} />);
    }
  }
  // borde del iceberg a la derecha: más allá, agua abierta
  const bp = []; for (let y = -100; y <= 2020; y += 40) bp.push([icBorde(y + Y), y]);
  const agua = icPoli(bp) + ' L 1200 2020 L 1200 -100 Z';
  // nieve marina (paralaje 1, cae despacio)
  const nieve = []; for (let i = 0; i < 70; i++) { const r = krng(i * 7 + 3); const x = r() * 1080 + 12 * Math.sin(T * 0.5 + i), y = (((r() * 2300 - Y - T * 14) % 2300) + 2300) % 2300 - 190; nieve.push(<circle key={i} cx={icF(x)} cy={icF(y)} r={icF(1.2 + r() * 2.6)} fill="#e6f2ff" opacity={icF(0.25 + 0.4 * r())} />); }
  const pulsa = pulso ? 0.55 + 0.45 * Math.pow(Math.max(0, Math.sin(T * 7.5)), 3) : 0;
  return <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${c0}, ${c1})` }}>
    <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0, filter: 'none' }}>
      <defs>
        <linearGradient id="colRayo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6f6ff" stopOpacity=".32" /><stop offset="1" stopColor="#e6f6ff" stopOpacity="0" /></linearGradient>
        <radialGradient id="colPulso" cx=".5" cy=".46" r=".6"><stop offset="0" stopColor="#ffcf7a" stopOpacity=".28" /><stop offset="1" stopColor="#ffcf7a" stopOpacity="0" /></radialGradient>
      </defs>
      {rayo > 0.01 && [[180, 0.18], [420, 0.08], [640, -0.05], [880, -0.15]].map(([x, a], i) => { const s = Math.tan(a + 0.04 * Math.sin(T * 0.5 + i * 2)); return <path key={i} opacity={rayo} d={`M ${x - 40} -60 L ${x + 40} -60 L ${x + 40 + s * 2000 + 160} 1980 L ${x - 40 + s * 2000 - 160} 1980 Z`} fill="url(#colRayo)" />; })}
      {baldosas}
      <path d={agua} fill="#050912" opacity=".32" />
      <path d={icPoli(bp)} stroke="#cdeef7" strokeWidth={2.5} fill="none" opacity={0.35 + 0.3 * rayo} />
      {ram}{cord}
      {pulsa > 0 && <rect x={0} y={0} width={KW} height={KH} fill="url(#colPulso)" opacity={pulsa} />}
      {nieve}
    </svg>
  </div>;
}
// Primer plano desenfocado: bokeh y burbujas que suben (paralaje 1.5). En divs para no pasar por el filtro.
function BokehFrente({ T, Y, o = 1, color = '220,240,255' }) {
  const els = [];
  for (let i = 0; i < 8; i++) {
    const r = krng(i * 31 + 5), rr = 40 + r() * 90, x = r() * 1080, y = (((r() * 2600 - Y * 1.5 - T * 26) % 2600) + 2600) % 2600 - 300;
    els.push(<div key={'k' + i} style={{ position: 'absolute', left: x - rr, top: y - rr, width: rr * 2, height: rr * 2, borderRadius: '50%', background: `radial-gradient(circle, rgba(${color},.22) 0%, rgba(${color},.10) 45%, rgba(${color},0) 70%)` }}></div>);
  }
  for (let i = 0; i < 12; i++) {
    const r = krng(i * 17 + 99), rr = 5 + r() * 12, x = r() * 1080 + 10 * Math.sin(T * 2 + i), y = (((r() * 2200 - Y * 1.3 - T * 110) % 2200) + 2200) % 2200 - 140;
    els.push(<div key={'b' + i} style={{ position: 'absolute', left: x - rr, top: y - rr, width: rr * 2, height: rr * 2, borderRadius: '50%', border: '1.5px solid rgba(225,245,255,.45)', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,.45) 0 18%, rgba(255,255,255,0) 30%)' }}></div>);
  }
  return <div style={{ position: 'absolute', inset: 0, opacity: o, pointerEvents: 'none' }}>{els}</div>;
}

/* ---------------- textos de cine (HTML, fuera del filtro) ---------------- */
// Etiqueta pegada a su objeto: punto, línea fina y texto mono chico. (x, y) = punto en pantalla.
function Lbl({ T, at, until, x, y, texto, it = false, dx = 90, dy = -70, lado = 'der', color = '#eaf2ff', tam = 29 }) {
  const o = kprog(T, at, at + 0.35) * (1 - kprog(T, until - 0.3, until));
  if (o <= 0.01) return null;
  const e = kprog(T, at, at + 0.45, kEase.sale), tx = x + dx * e, ty = y + dy * e;
  return <div style={{ position: 'absolute', inset: 0, zIndex: 42, opacity: o, pointerEvents: 'none' }}>
    <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0, filter: 'none', overflow: 'visible' }}>
      <circle cx={x} cy={y} r={6} fill={color} /><circle cx={x} cy={y} r={13} fill="none" stroke={color} strokeWidth={1.5} opacity=".5" />
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={color} strokeWidth={2} opacity=".85" />
      <line x1={tx} y1={ty} x2={tx + (lado === 'der' ? 26 : -26)} y2={ty} stroke={color} strokeWidth={2} opacity=".85" />
    </svg>
    <div style={{ position: 'absolute', top: ty, left: lado === 'der' ? tx + 32 : undefined, right: lado === 'der' ? undefined : KW - tx + 32, transform: 'translateY(-50%)',
      font: `${it ? 'italic ' : ''}700 ${tam}px ${KF.mono}`, letterSpacing: it ? '0' : '.06em', textTransform: it ? 'none' : 'uppercase', color,
      background: 'rgba(6,10,20,.55)', padding: '4px 12px', borderRadius: 6, whiteSpace: 'nowrap' }}>{texto}</div>
  </div>;
}
// Tarjeta chica de estudio: año + una línea mono.
function Tarjeta({ T, at, until, anio, linea, y = 400 }) {
  const o = kprog(T, at, at + 0.4) * (1 - kprog(T, until - 0.35, until));
  if (o <= 0.01) return null;
  return <div style={{ position: 'absolute', left: KW / 2, top: y, zIndex: 43, opacity: o, transform: `translate(-50%,-50%) translateY(${(1 - kprog(T, at, at + 0.5, kEase.sale)) * 24}px)`,
    display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(8,13,24,.74)', border: '1.5px solid rgba(220,235,255,.32)', borderRadius: 12, padding: '10px 26px', whiteSpace: 'nowrap' }}>
    <span style={{ font: `400 58px/1 'Archivo Black', ${KF.texto}`, color: '#f6f3ec' }}>{anio}</span>
    <span style={{ width: 1.5, height: 44, background: 'rgba(230,240,255,.4)' }}></span>
    <span style={{ font: `700 25px ${KF.mono}`, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(230,240,255,.88)' }}>{linea}</span>
  </div>;
}
// Número grande blanco con línea mono abajo (estilo de la referencia).
function NumeroCine({ T, at, until, valor, desde = 0, dur = 1.1, prefijo = '', sufijo = '', dec = 0, linea, x = KW / 2, y = 470, tam = 150 }) {
  const o = kprog(T, at, at + 0.35) * (1 - kprog(T, until - 0.35, until));
  if (o <= 0.01) return null;
  const v = klerp(desde, valor, kprog(T, at, at + dur, kEase.suave));
  const txt = typeof kformato === 'function' ? kformato(v, dec) : v.toFixed(dec);
  return <div style={{ position: 'absolute', left: x, top: y, zIndex: 43, opacity: o, transform: `translate(-50%,-50%) translateY(${(1 - kprog(T, at, at + 0.5, kEase.sale)) * 30}px)`, textAlign: 'center', whiteSpace: 'nowrap' }}>
    <div style={{ font: `400 ${tam}px/1 'Archivo Black', ${KF.texto}`, color: '#f6f3ec', letterSpacing: '-.01em' }}>{prefijo}{txt}{sufijo}</div>
    {linea && <div style={{ font: `700 27px ${KF.mono}`, color: 'rgba(225,235,255,.82)', marginTop: 14, letterSpacing: '.02em' }}>{linea}</div>}
  </div>;
}
// Marcador de nivel tipo profundímetro (arriba a la derecha, junto a la regla).
function NivelMarca({ T, niveles }) {
  return <div style={{ position: 'absolute', inset: 0, zIndex: 44, pointerEvents: 'none' }}>
    {niveles.map(([a, b, n, nombre], i) => {
      const o = kprog(T, a, a + 0.5) * (1 - kprog(T, b - 0.4, b)); if (o <= 0.01) return null;
      const e = kprog(T, a, a + 0.6, kEase.sale);
      return <div key={i} style={{ position: 'absolute', right: 70, top: 300 + (1 - e) * 40, opacity: o, display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
        <span style={{ font: `700 26px ${KF.mono}`, letterSpacing: '.1em', color: '#eaf2ff' }}>{n ? `NIVEL ${n}` : ''}{n ? <span style={{ color: 'rgba(234,242,255,.55)' }}> · </span> : ''}{nombre}</span>
        <span style={{ width: 54 * e, height: 2, background: '#eaf2ff', opacity: 0.8 }}></span>
        <span style={{ width: 10, height: 10, transform: 'rotate(45deg)', border: '2px solid #eaf2ff' }}></span>
      </div>;
    })}
  </div>;
}
// Regla de profundidad sutil en el borde derecho: marcas que suben con la cámara.
function ReglaProf({ Y, o = 1 }) {
  if (o <= 0.01) return null;
  const m = [];
  for (let k = Math.floor((Y - 60) / 60); k <= Math.floor((Y + 1980) / 60); k++) { const y = k * 60 - Y; const may = k % 5 === 0; m.push(<line key={k} x1={may ? 1012 : 1024} y1={y} x2={1040} y2={y} stroke="#dfe9ff" strokeWidth={may ? 2 : 1} opacity={may ? 0.55 : 0.3} />); }
  return <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0, zIndex: 39, opacity: o, filter: 'none' }}>
    <line x1={1040} y1={0} x2={1040} y2={KH} stroke="#dfe9ff" strokeWidth={1.5} opacity=".35" />{m}
  </svg>;
}

/* ---------------- nivel 1: plántula, suelo, hogaza, levadura ---------------- */
function Plantula({ x, y, s = 1, T = 0 }) {
  const m = mece(T, 3, 0.35) * 6;
  const hoja = (cx, cy, rot, L, W, id) => <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
    <path d={`M 0 0 C ${L * 0.25} ${-W} ${L * 0.75} ${-W * 0.9} ${L} 0 C ${L * 0.75} ${W * 0.85} ${L * 0.25} ${W} 0 0 Z`} fill={`url(#${id})`} />
    <path d={`M 4 0 L ${L - 8} 0`} stroke="#d5ecb8" strokeWidth={3} opacity=".7" />
    {[0.25, 0.45, 0.65].map((u, i) => <g key={i}><path d={`M ${L * u} 0 Q ${L * (u + 0.08)} ${-W * 0.35} ${L * (u + 0.16)} ${-W * 0.6}`} stroke="#cfe6b0" strokeWidth={1.6} fill="none" opacity=".55" /><path d={`M ${L * u} 0 Q ${L * (u + 0.08)} ${W * 0.35} ${L * (u + 0.16)} ${W * 0.6}`} stroke="#cfe6b0" strokeWidth={1.6} fill="none" opacity=".55" /></g>)}
    <path d={`M ${L * 0.1} ${-W * 0.3} C ${L * 0.3} ${-W * 0.75} ${L * 0.55} ${-W * 0.7} ${L * 0.7} ${-W * 0.45}`} stroke="#ffffff" strokeWidth={4} fill="none" opacity=".25" />
  </g>;
  const raices = icRamas({ seed: 8, x: 0, y: 0, ang: Math.PI / 2, len: 250, gen: 3, nb: [4, 2], fuerza: 0.2, jit: 0.3, paso: 14, abre: [0.6, 0.6] });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id="plH" x1="0" y1="-1" x2="0" y2="1"><stop offset="0" stopColor="#9cc46e" /><stop offset="1" stopColor="#4f8a3c" /></linearGradient>
      <linearGradient id="plC" x1="0" y1="-1" x2="0" y2="1"><stop offset="0" stopColor="#b5cf7a" /><stop offset="1" stopColor="#6f9a48" /></linearGradient>
      <linearGradient id="plT" x1="0" x2="1"><stop offset="0" stopColor="#5f8f4a" /><stop offset=".5" stopColor="#a6cf82" /><stop offset="1" stopColor="#5a8444" /></linearGradient>
    </defs>
    {raices.map((b, i) => <path key={i} d={b.d} stroke="#e9dcc0" strokeWidth={Math.max(1.5, 7 - b.g * 2)} fill="none" strokeLinecap="round" opacity={0.85} />)}
    <path d={`M -7 0 C -10 -120 ${-6 + m * 0.4} -280 ${m - 6} -430 L ${m + 6} -430 C ${6 + m * 0.4} -280 10 -120 7 0 Z`} fill="url(#plT)" />
    {hoja(m * 0.55, -255, 200, 150, 52, 'plC')}{hoja(m * 0.55, -255, -20, 150, 52, 'plC')}
    {hoja(m, -428, 215, 210, 76, 'plH')}{hoja(m, -428, -35, 210, 76, 'plH')}
    <ellipse cx={m} cy={-440} rx={12} ry={18} fill="#9cc46e" />
  </g>;
}
function SueloCorte({ x0 = 100, x1 = 980, y = 1180, h = 270, seed = 4 }) {
  const r = krng(seed), top = [], bot = [];
  for (let x = x0; x <= x1; x += 30) top.push([x, y + (r() - 0.5) * 12]);
  for (let x = x1; x >= x0; x -= 40) bot.push([x, y + h - 30 + (r() - 0.5) * 50]);
  const piedras = Array.from({ length: 22 }, (_, i) => { const px = x0 + 30 + r() * (x1 - x0 - 60), py = y + 30 + r() * (h - 80), rr = 6 + r() * 16; return <g key={i}><ellipse cx={icF(px)} cy={icF(py)} rx={icF(rr * 1.3)} ry={icF(rr)} fill={r() < 0.5 ? '#6b5646' : '#4c3b2f'} /><ellipse cx={icF(px - rr * 0.4)} cy={icF(py - rr * 0.4)} rx={icF(rr * 0.4)} ry={icF(rr * 0.25)} fill="#a08670" opacity=".5" /></g>; });
  const grumos = Array.from({ length: 120 }, (_, i) => <circle key={i} cx={icF(x0 + r() * (x1 - x0))} cy={icF(y + 6 + r() * (h - 30))} r={icF(1.2 + r() * 2.5)} fill={r() < 0.5 ? '#2a1d15' : '#8a6e56'} opacity=".6" />);
  return <g>
    <defs><linearGradient id={'su' + seed} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d4535" /><stop offset=".5" stopColor="#3b2b20" /><stop offset="1" stopColor="#241a13" /></linearGradient></defs>
    <path d={icCurva(top.concat(bot), true, 0.7)} fill={`url(#su${seed})`} />
    {grumos}{piedras}
    <path d={icCurva(top)} stroke="#8a6e56" strokeWidth={5} fill="none" opacity=".7" />
    <path d={icCurva(top.concat(bot), true, 0.7)} fill="none" stroke="#cfeeff" strokeWidth={3} opacity=".35" />
  </g>;
}
const HOGAZA_D = 'M 130 1190 C 118 960 290 770 540 760 C 790 770 962 960 950 1190 Q 540 1226 130 1190 Z';
const ALVEOLOS = (() => { const r = krng(31), o = []; let n = 0; while (o.length < 170 && n < 6000) { n++; const x = 180 + r() * 720, y = 815 + r() * 360; const dx = (x - 540) / 380, dy = (y - 1190) / 400; const q = r(); if (dx * dx + dy * dy < 0.82 && y < 1165) o.push([x, y, 3.5 + q * q * 24, 0.5 + r() * 0.9, r() * 70 - 35]); } return o; })();
function HogazaCorte({ T, infla = 0 }) {
  const k = 1 + 0.4 * infla;
  return <g>
    <defs>
      <linearGradient id="hgC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c4843f" /><stop offset=".55" stopColor="#9a5a26" /><stop offset="1" stopColor="#6e3d1a" /></linearGradient>
      <linearGradient id="hgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5528" /><stop offset="1" stopColor="#5a3214" /></linearGradient>
      <radialGradient id="hgM" cx=".45" cy=".35" r=".75"><stop offset="0" stopColor="#f6e9cb" /><stop offset=".7" stopColor="#ead4a6" /><stop offset="1" stopColor="#d6b47c" /></radialGradient>
      <radialGradient id="hgV" cx=".5" cy=".38" r=".6"><stop offset="0" stopColor="#a7814f" /><stop offset=".7" stopColor="#c9a56f" /><stop offset="1" stopColor="#e9d3a5" /></radialGradient>
    </defs>
    <ellipse cx={540} cy={1205} rx={470} ry={34} fill="#05080f" opacity=".45" />
    {/* parte de atrás de la hogaza (3/4) con sus cortes */}
    <path d="M 170 1160 C 165 940 330 760 575 742 C 815 748 985 920 985 1165 Q 600 1200 170 1160 Z" fill="url(#hgA)" />
    {[[520, 752, 8], [690, 776, 24], [830, 850, 38]].map(([x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}><path d="M -70 0 Q 0 -26 70 0 Q 0 -8 -70 0 Z" fill="#e4b06a" opacity=".8" /><path d="M -70 0 Q 0 -26 70 0" stroke="#3e220e" strokeWidth={3} fill="none" opacity=".5" /></g>)}
    {/* cara del corte: corteza y miga con alveolos */}
    <path d={HOGAZA_D} fill="url(#hgC)" />
    <path d={HOGAZA_D} fill="url(#hgM)" transform="translate(540 1190) scale(0.935 0.92) translate(-540 -1190)" />
    {ALVEOLOS.map(([x, y, r, el, rot], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <path d={icBlob(0, 0, r, r * el, i + 3, 0.18, 12)} fill="url(#hgV)" />
      <path d={`M ${-r * 0.8} ${-r * el * 0.2} A ${r} ${r * el} 0 0 1 ${r * 0.8} ${-r * el * 0.2}`} stroke="#8d6a40" strokeWidth={2} fill="none" opacity=".6" />
    </g>)}
    {Array.from({ length: 80 }, (_, i) => { const r = krng(i + 500); const a = Math.PI * (1.05 + r() * 0.9), rr = 395 + r() * 20; return <circle key={i} cx={icF(540 + Math.cos(a) * rr * 1.03)} cy={icF(1190 + Math.sin(a) * rr * 1.05)} r={1.5 + r() * 2.2} fill="#fff6e6" opacity={0.5} />; })}
    <path d="M 210 1000 C 300 850 420 800 520 790" stroke="#f3c98b" strokeWidth={8} fill="none" opacity=".45" strokeLinecap="round" />
  </g>;
}
// Levadura (Saccharomyces cerevisiae) en línea luminosa sobre oscuro, con yema que crece y burbujitas de CO2.
function Levadura({ x, y, rx = 120, ry = 96, rot = 0, yema = 0, T = 0, sd = 1 }) {
  const r = krng(sd);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={rx} ry={ry} fill="#9cc9ff" fillOpacity=".07" stroke="#cfe6ff" strokeWidth={8} strokeOpacity=".16" />
    <ellipse rx={rx} ry={ry} fill="none" stroke="#d8ecff" strokeWidth={3.2} />
    <ellipse cx={-rx * 0.15} cy={ry * 0.05} rx={rx * 0.32} ry={ry * 0.3} fill="none" stroke="#9fc8ff" strokeWidth={2} opacity=".6" />
    <circle cx={rx * 0.35} cy={-ry * 0.2} r={rx * 0.2} fill="#9fc8ff" fillOpacity=".08" stroke="#9fc8ff" strokeWidth={1.6} opacity=".6" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={icF((r() - 0.5) * rx * 1.4)} cy={icF((r() - 0.5) * ry * 1.3)} r={2.5} fill="#cfe6ff" opacity=".5" />)}
    <circle cx={-rx * 0.86} cy={-ry * 0.3} r={10} fill="none" stroke="#cfe6ff" strokeWidth={2} opacity=".45" />
    {yema > 0.02 && <g transform={`translate(${rx * 0.92} ${-ry * 0.46})`}><ellipse rx={rx * 0.46 * yema} ry={ry * 0.46 * yema} fill="#9cc9ff" fillOpacity=".08" stroke="#d8ecff" strokeWidth={3} /></g>}
  </g>;
}

/* ---------------- nivel 2: placa de Petri, hifa con quitina, escarabajo ---------------- */
const BACT = (() => { const r = krng(12), o = []; while (o.length < 150) { const a = r() * 6.283, d = Math.sqrt(r()) * 380; o.push([Math.cos(a) * d, Math.sin(a) * d, 5 + r() * 9, r()]); } return o; })();
function PetriCine({ T, cx = 540, cy = 990, r = 420, crece = 1, pcx = -110, pcy = -50 }) {
  const cr = 105 + 55 * crece, halo = cr + 70 + 80 * crece;
  return <g transform={`translate(${cx} ${cy})`}>
    <defs>
      <radialGradient id="ptA" cx=".46" cy=".42" r=".6"><stop offset="0" stopColor="#d5bf86" /><stop offset=".8" stopColor="#b59a5e" /><stop offset="1" stopColor="#8f7645" /></radialGradient>
      <radialGradient id="ptP" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#2e6a64" /><stop offset=".55" stopColor="#3f8a7a" /><stop offset=".86" stopColor="#6fb39c" /><stop offset="1" stopColor="#e7ece4" /></radialGradient>
      <radialGradient id="ptH" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f2e6bf" stopOpacity="0" /><stop offset=".6" stopColor="#f2e6bf" stopOpacity=".18" /><stop offset="1" stopColor="#f2e6bf" stopOpacity="0" /></radialGradient>
      <linearGradient id="ptV" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".55" /><stop offset=".4" stopColor="#ffffff" stopOpacity="0" /></linearGradient>
    </defs>
    <ellipse cx={20} cy={r + 30} rx={r * 0.95} ry={40} fill="#03060c" opacity=".5" />
    <circle r={r + 22} fill="#cfe6f5" fillOpacity=".08" stroke="#e2f1ff" strokeWidth={3} strokeOpacity=".6" />
    <circle r={r + 8} fill="none" stroke="#e2f1ff" strokeWidth={2} strokeOpacity=".3" />
    <circle r={r} fill="url(#ptA)" />
    {Array.from({ length: 90 }, (_, i) => { const q = krng(i + 70); const a = q() * 6.283, d = Math.sqrt(q()) * (r - 10); return <circle key={i} cx={icF(Math.cos(a) * d)} cy={icF(Math.sin(a) * d)} r={1.4} fill="#7d6538" opacity=".35" />; })}
    <circle cx={pcx} cy={pcy} r={halo} fill="url(#ptH)" />
    {BACT.map(([x, y, rr, q], i) => {
      const dd = Math.hypot(x - pcx, y - pcy); if (dd < cr + 6) return null;
      const v = kclamp((dd - cr) / (halo - cr), 0, 1); const deshecha = 1 - v;
      return <g key={i} opacity={0.25 + 0.75 * v}>
        <circle cx={x} cy={y} r={rr * (1 - 0.35 * deshecha)} fill="#efe4b6" fillOpacity={0.9 - 0.75 * deshecha} stroke="#c7ae74" strokeWidth={1.6} strokeDasharray={deshecha > 0.3 ? '4 4' : undefined} />
        <circle cx={x - rr * 0.3} cy={y - rr * 0.3} r={rr * 0.3} fill="#fff" opacity={0.4 * v} />
      </g>;
    })}
    {/* colonia de Penicillium: aterciopelada, azul verdosa, borde blanco */}
    <path d={icBlob(pcx, pcy, cr + 10, cr + 10, 21, 0.05, 40)} fill="#eef1ea" opacity=".92" />
    <path d={icBlob(pcx, pcy, cr, cr, 22, 0.04, 40)} fill="url(#ptP)" />
    {[0.75, 0.55, 0.33].map((k, i) => <path key={i} d={icBlob(pcx, pcy, cr * k, cr * k, 30 + i, 0.05, 30)} fill="none" stroke="#24564f" strokeWidth={2.5} opacity=".35" />)}
    {Array.from({ length: 48 }, (_, i) => { const a = (i / 48) * 6.283; return <line key={i} x1={icF(pcx + Math.cos(a) * cr * 0.18)} y1={icF(pcy + Math.sin(a) * cr * 0.18)} x2={icF(pcx + Math.cos(a) * cr * 0.92)} y2={icF(pcy + Math.sin(a) * cr * 0.92)} stroke="#cfe9dd" strokeWidth={1.2} opacity=".22" />; })}
    {Array.from({ length: 140 }, (_, i) => { const q = krng(i + 900); const a = q() * 6.283, d = Math.sqrt(q()) * cr * 0.9; return <circle key={i} cx={icF(pcx + Math.cos(a) * d)} cy={icF(pcy + Math.sin(a) * d)} r={1.3 + q() * 1.5} fill="#d6efe4" opacity={0.25} />; })}
    <circle cx={pcx} cy={pcy} r={cr * 0.16} fill="#b7dccd" opacity=".55" />
    {/* reflejos de la tapa de vidrio */}
    <path d={`M ${-r * 0.78} ${-r * 0.42} A ${r * 0.9} ${r * 0.9} 0 0 1 ${-r * 0.2} ${-r * 0.86}`} stroke="#ffffff" strokeWidth={12} fill="none" opacity=".35" strokeLinecap="round" />
    <path d={`M ${-r * 0.66} ${-r * 0.32} A ${r * 0.75} ${r * 0.75} 0 0 1 ${-r * 0.38} ${-r * 0.62}`} stroke="#ffffff" strokeWidth={4} fill="none" opacity=".3" strokeLinecap="round" />
    <path d={`M ${r * 0.62} ${r * 0.55} A ${r * 0.88} ${r * 0.88} 0 0 1 ${r * 0.2} ${r * 0.84}`} stroke="#ffffff" strokeWidth={6} fill="none" opacity=".18" strokeLinecap="round" />
    <circle r={r + 22} fill="url(#ptV)" opacity=".35" />
  </g>;
}
// Hexágono (anillo de azúcar de la quitina)
const icHex = (x, y, r) => icPoli(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3 + Math.PI / 6) * r, y + Math.sin(i * Math.PI / 3 + Math.PI / 6) * r])) + ' Z';
// Hifa en corte, horizontal (coordenadas locales: eje en y = 0, de x0 a x1). luzQ = 0..1 resalta la capa de quitina.
function HifaPared({ T, x0 = -120, x1 = 1200, R = 160, luzQ = 0 }) {
  const cadena = (yy, k) => { const hs = []; for (let x = x0 + 20, j = 0; x < x1; x += 40, j++) { const on = kclamp(luzQ * 1.4 - (x - x0) / (x1 - x0) * 0.4, 0, 1); hs.push(<g key={k + j}><path d={icHex(x, yy + 3 * Math.sin(j * 1.3), 14)} fill="none" stroke={icMix('#7fa0b8', '#ffd27a', on)} strokeWidth={2.4} opacity={0.5 + 0.5 * on} />{on > 0.2 && <path d={icHex(x, yy + 3 * Math.sin(j * 1.3), 14)} fill="none" stroke="#ffd27a" strokeWidth={9} opacity={0.12 * on} />}<line x1={x + 14} y1={yy + 3 * Math.sin(j * 1.3)} x2={x + 26} y2={yy + 3 * Math.sin((j + 1) * 1.3)} stroke={icMix('#7fa0b8', '#ffd27a', on)} strokeWidth={2} opacity={0.6} /></g>); } return hs; };
  const ond = (yy, a, f, ph) => { const p = []; for (let x = x0; x <= x1; x += 16) p.push([x, yy + a * Math.sin(x / f + ph + T * 0.6)]); return icPoli(p); };
  return <g>
    <path d={`M ${x0} ${-R} L ${x1} ${-R} L ${x1} ${R} L ${x0} ${R} Z`} fill="#10243a" opacity=".7" />
    {/* capa externa (glucanos y proteínas): fibras tenues */}
    {[-1, 1].map((sg) => <g key={sg}>
      <Brilla d={ond(sg * R, 3, 60, sg)} color="#9fd4ff" w={2.4} o={0.9} nucleo="#e2f3ff" />
      {[6, 12, 18].map((dy, i) => <path key={i} d={ond(sg * (R - dy), 2.5, 34 + i * 9, i + sg)} stroke="#7fb7e0" strokeWidth={1.3} fill="none" opacity=".35" />)}
      {cadena(sg * (R - 40), 'q' + sg)}
      <Brilla d={ond(sg * (R - 70), 2, 80, 2 * sg)} color="#8fe0ff" w={1.6} o={0.8} />
    </g>)}
    {/* citoplasma: núcleos, mitocondrias y un septo con poro */}
    {[[150, -20, 80, 54], [520, 30, 76, 50], [940, -15, 82, 54]].map(([x, y, a, b], i) => <g key={i}><ellipse cx={x + 6 * Math.sin(T * 0.8 + i)} cy={y} rx={a} ry={b} fill="#8fc9ff" fillOpacity=".06" stroke="#b8dcff" strokeWidth={2.4} /><circle cx={x + 6 * Math.sin(T * 0.8 + i) + 10} cy={y - 6} r={12} fill="#b8dcff" opacity=".35" /></g>)}
    {[[300, 40], [380, -50], [700, 50], [1050, 30], [60, 60]].map(([x, y], i) => <rect key={i} x={x} y={y} width={46} height={18} rx={9} fill="none" stroke="#a6e0c8" strokeWidth={2} opacity=".55" transform={`rotate(${i * 37} ${x + 23} ${y + 9})`} />)}
    <path d={`M 740 ${-R + 70} L 740 -22 M 740 22 L 740 ${R - 70}`} stroke="#9fd4ff" strokeWidth={5} opacity=".8" />
  </g>;
}
// Escarabajo visto desde arriba, muy detallado. Centro en (x, y), largo ~ 860·s. iri = 0..1 fase del tornasol.
function EscarabajoCine({ T, x, y, s = 1, iri = 0, mov = 1, id = 'es' }) {
  const pata = (hip, rod, tob, pie, k) => {
    const q = (a, b, u) => [klerp(a[0], b[0], u), klerp(a[1], b[1], u)];
    const tar = Array.from({ length: 5 }, (_, i) => q(tob, pie, (i + 0.5) / 5));
    return <g key={k}>
      <path d={icPoli([hip, rod])} stroke="#1c2b2c" strokeWidth={30} strokeLinecap="round" fill="none" />
      <path d={icPoli([hip, rod])} stroke="#4f7470" strokeWidth={8} strokeLinecap="round" fill="none" opacity=".45" transform="translate(-4 -5)" />
      <path d={icPoli([rod, tob])} stroke="#1c2b2c" strokeWidth={18} strokeLinecap="round" fill="none" />
      {[0.3, 0.55, 0.8].map((u, i) => { const p = q(rod, tob, u); return <line key={i} x1={p[0]} y1={p[1]} x2={p[0] + (tob[1] - rod[1]) * 0.08} y2={p[1] - (tob[0] - rod[0]) * 0.08} stroke="#9fb6b0" strokeWidth={2} opacity=".6" />; })}
      {tar.map((p, i) => <ellipse key={i} cx={p[0]} cy={p[1]} rx={9 - i} ry={6 - i * 0.6} fill="#22302f" />)}
      <path d={`M ${pie[0]} ${pie[1]} l ${(pie[0] - tob[0]) * 0.12 + 6} ${(pie[1] - tob[1]) * 0.12 - 6} M ${pie[0]} ${pie[1]} l ${(pie[0] - tob[0]) * 0.12 - 6} ${(pie[1] - tob[1]) * 0.12 + 6}`} stroke="#22302f" strokeWidth={3} />
    </g>;
  };
  const w = (i) => mov * 6 * Math.sin(T * 5 + i * 2.1);
  const P = [
    [[70, -170], [210, -255], [250, -400], [282, -478]],
    [[95, -40], [262, -38], [335, 62], [378, 132]],
    [[100, 60], [252, 168], [300, 340], [318, 432]],
  ];
  const ant = (sg) => { const pts = [[sg * 40, -395]]; for (let i = 1; i <= 11; i++) pts.push([sg * (40 + i * 13 + i * i * 0.6), -395 - i * 21 + i * i * 0.9 + (sg > 0 ? w(9) : w(10)) * 0.3 * i / 11]); return pts; };
  const estrias = (sg) => [0.18, 0.34, 0.5, 0.66, 0.82].map((u, i) => <path key={i} d={`M ${sg * (12 + u * 190)} -150 C ${sg * (14 + u * 200)} 40 ${sg * (12 + u * 170)} 250 ${sg * (8 + u * 60)} 380`} stroke="#0f2a2a" strokeWidth={2.2} fill="none" opacity=".45" />);
  const g0 = 0.5 + 0.5 * Math.sin(iri * 6.283);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id={id + 'e'} x1={0.1 + 0.2 * g0} y1="0" x2={0.9 - 0.2 * g0} y2="1"><stop offset="0" stopColor="#2f8f72" /><stop offset=".35" stopColor="#3f9e86" /><stop offset=".6" stopColor="#3b5f8f" /><stop offset=".85" stopColor="#5a4a86" /><stop offset="1" stopColor="#1d3a4a" /></linearGradient>
      <radialGradient id={id + 'p'} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#5fb59a" /><stop offset=".6" stopColor="#2d7466" /><stop offset="1" stopColor="#1a3e44" /></radialGradient>
      <radialGradient id={id + 'c'} cx=".45" cy=".35" r=".7"><stop offset="0" stopColor="#4f9a86" /><stop offset="1" stopColor="#173638" /></radialGradient>
      <linearGradient id={id + 'b'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset=".5" stopColor="#ffffff" stopOpacity=".5" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></linearGradient>
    </defs>
    <ellipse cx={20} cy={40} rx={330} ry={470} fill="#02050a" opacity=".4" />
    {P.map(([h, r, t, p], i) => [1, -1].map((sg) => pata([sg * h[0], h[1]], [sg * r[0], r[1] + w(i + (sg > 0 ? 0 : 3))], [sg * t[0], t[1] + w(i + (sg > 0 ? 0 : 3)) * 1.4], [sg * p[0], p[1] + w(i + (sg > 0 ? 0 : 3)) * 1.6], `${i}${sg}`)))}
    {[1, -1].map((sg) => <g key={sg}>{ant(sg).map((p, i) => <ellipse key={i} cx={icF(p[0])} cy={icF(p[1])} rx={i > 8 ? 11 : 8} ry={i > 8 ? 13 : 10} fill="#1f2f2e" />)}<path d={icCurva(ant(sg))} stroke="#5a7a76" strokeWidth={3} fill="none" opacity=".5" /></g>)}
    {/* mandíbulas, cabeza y ojos */}
    <path d="M -34 -418 C -60 -450 -40 -490 -8 -478 C -30 -470 -30 -446 -14 -428 Z" fill="#14201f" /><path d="M 34 -418 C 60 -450 40 -490 8 -478 C 30 -470 30 -446 14 -428 Z" fill="#14201f" />
    <path d="M -78 -330 C -84 -392 -52 -430 0 -432 C 52 -430 84 -392 78 -330 Z" fill={`url(#${id}c)`} />
    <ellipse cx={-70} cy={-372} rx={16} ry={24} fill="#0c1414" /><ellipse cx={70} cy={-372} rx={16} ry={24} fill="#0c1414" />
    <circle cx={-74} cy={-380} r={5} fill="#cfe" opacity=".6" /><circle cx={66} cy={-380} r={5} fill="#cfe" opacity=".6" />
    {/* pronoto con puntitos */}
    <path d="M -150 -170 C -160 -250 -120 -330 0 -334 C 120 -330 160 -250 150 -170 Q 0 -150 -150 -170 Z" fill={`url(#${id}p)`} />
    {Array.from({ length: 40 }, (_, i) => { const r = krng(i + 40); return <circle key={i} cx={icF((r() - 0.5) * 240)} cy={icF(-300 + r() * 120)} r={2} fill="#0f2a2a" opacity=".45" />; })}
    <path d="M -90 -300 C -40 -322 30 -322 80 -300" stroke="#bfeee0" strokeWidth={6} fill="none" opacity=".35" strokeLinecap="round" />
    <path d="M -16 -168 L 16 -168 L 0 -128 Z" fill="#163a3a" />
    {/* élitros tornasolados con estrías */}
    {[1, -1].map((sg) => <g key={'el' + sg}>
      <path d={`M 0 -166 L ${sg * 6} -166 C ${sg * 150} -170 ${sg * 218} -120 ${sg * 218} -20 C ${sg * 222} 140 ${sg * 172} 312 ${sg * 8} 398 L 0 398 Z`} fill={`url(#${id}e)`} />
      {estrias(sg)}
    </g>)}
    <path d="M 0 -166 L 0 398" stroke="#0d2222" strokeWidth={3} />
    <path d="M -150 -110 C -170 20 -150 180 -90 300" stroke={`url(#${id}b)`} strokeWidth={22} fill="none" opacity={0.45 + 0.25 * g0} strokeLinecap="round" />
    <path d="M 120 -120 C 140 0 130 140 90 250" stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.12 + 0.12 * (1 - g0)} strokeLinecap="round" />
  </g>;
}

/* ---------------- nivel 3: tronco con Mycena que brillan, bosque con Armillaria ---------------- */
function TroncoPodrido({ x0 = 40, x1 = 1040, y = 1250, h = 230 }) {
  const r = krng(61), grietas = [], musgo = [];
  for (let i = 0; i < 16; i++) { const yy = y - h / 2 + 18 + r() * (h - 36), xx = x0 + 40 + r() * (x1 - x0 - 200); const p = []; for (let k = 0; k < 6; k++) p.push([xx + k * (30 + r() * 30), yy + (r() - 0.5) * 10]); grietas.push(<path key={i} d={icCurva(p)} stroke="#120c08" strokeWidth={2 + r() * 3} fill="none" opacity=".7" />); }
  for (let i = 0; i < 30; i++) { const xx = x0 + 30 + r() * (x1 - x0 - 160), yy = y - h / 2 + 6 + r() * 26; musgo.push(<ellipse key={i} cx={icF(xx)} cy={icF(yy)} rx={icF(16 + r() * 34)} ry={icF(7 + r() * 9)} fill={r() < 0.5 ? '#41592f' : '#5a7440'} opacity=".9" />); }
  return <g>
    <defs>
      <linearGradient id="trC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5a4230" /><stop offset=".4" stopColor="#3a2a1d" /><stop offset="1" stopColor="#160f0a" /></linearGradient>
      <radialGradient id="trF" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#8a6a48" /><stop offset=".7" stopColor="#6a4c32" /><stop offset="1" stopColor="#3a2818" /></radialGradient>
    </defs>
    <ellipse cx={(x0 + x1) / 2} cy={y + h / 2 + 18} rx={(x1 - x0) / 2} ry={26} fill="#03060a" opacity=".55" />
    <rect x={x0} y={y - h / 2} width={x1 - x0 - 60} height={h} rx={40} fill="url(#trC)" />
    {grietas}
    {musgo}
    {Array.from({ length: 14 }, (_, i) => { const xx = x0 + 60 + r() * (x1 - x0 - 200); return <path key={i} d={`M ${icF(xx)} ${y - h / 2 + 10} q ${icF(-6 + r() * 12)} 24 ${icF(-4 + r() * 8)} ${icF(34 + r() * 30)}`} stroke="#6d8a4c" strokeWidth={3} fill="none" opacity=".7" />; })}
    <ellipse cx={x1 - 60} cy={y} rx={56} ry={h / 2} fill="url(#trF)" />
    {[0.75, 0.52, 0.3].map((k, i) => <ellipse key={i} cx={x1 - 60} cy={y} rx={56 * k} ry={(h / 2) * k} fill="none" stroke="#4a3220" strokeWidth={2} opacity=".7" />)}
    <path d={`M ${x1 - 80} ${y - 40} q 20 10 14 40 q -18 12 -22 -8 Z`} fill="#1e140c" opacity=".8" />
  </g>;
}
function Mycena({ x, y, alto = 200, ancho = 80, rot = 0, luz = 0, T = 0, sd = 1 }) {
  const m = mece(T, sd, 0.3) * 4, cap = icMix('#8e8472', '#c8f7a8', luz), pie = icMix('#9c917e', '#9fe486', luz);
  const tx = m + rot * alto / 60;
  return <g transform={`translate(${x} ${y})`}>
    {luz > 0.02 && <circle cx={tx} cy={-alto - ancho * 0.2} r={ancho * 1.5} fill="url(#myG)" opacity={luz} />}
    <path d={`M -4 0 Q ${tx * 0.4 - 3} ${-alto * 0.55} ${tx - 3} ${-alto} L ${tx + 3} ${-alto} Q ${tx * 0.4 + 3} ${-alto * 0.55} 4 0 Z`} fill={pie} />
    <g transform={`translate(${tx} ${-alto}) rotate(${rot})`}>
      <path d={`M ${-ancho / 2} 4 C ${-ancho / 2} ${-ancho * 0.45} ${-ancho * 0.2} ${-ancho * 0.82} 0 ${-ancho * 0.86} C ${ancho * 0.2} ${-ancho * 0.82} ${ancho / 2} ${-ancho * 0.45} ${ancho / 2} 4 Q 0 ${ancho * 0.05} ${-ancho / 2} 4 Z`} fill={cap} />
      {[-0.36, -0.2, -0.06, 0.08, 0.22, 0.36].map((u, i) => <path key={i} d={`M ${u * ancho} 2 Q ${u * ancho * 0.7} ${-ancho * 0.4} ${u * ancho * 0.2} ${-ancho * 0.8}`} stroke={icMix('#6b6253', '#e8ffd6', luz)} strokeWidth={1.6} fill="none" opacity=".6" />)}
      <ellipse cx={0} cy={-ancho * 0.8} rx={ancho * 0.12} ry={ancho * 0.07} fill={icMix('#5e5547', '#f0ffe0', luz)} />
      <path d={`M ${-ancho * 0.3} ${-ancho * 0.5} Q ${-ancho * 0.15} ${-ancho * 0.75} 0 ${-ancho * 0.78}`} stroke="#ffffff" strokeWidth={3} fill="none" opacity={0.25 + 0.4 * luz} />
    </g>
  </g>;
}
const MYCENAS = [[230, 1140, 210, 74, -12], [290, 1132, 290, 90, -6], [352, 1136, 160, 62, 4], [470, 1130, 330, 104, -2], [540, 1134, 240, 84, 8], [600, 1128, 180, 66, 14], [700, 1132, 300, 96, 3], [770, 1136, 200, 72, 10], [830, 1140, 140, 56, 18], [410, 1136, 120, 50, -16]];
function BosqueMycena({ T, luz = 0, lt = 0 }) {
  return <g>
    <defs><radialGradient id="myG" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#b8ff8f" stopOpacity=".55" /><stop offset=".45" stopColor="#8fe07a" stopOpacity=".18" /><stop offset="1" stopColor="#8fe07a" stopOpacity="0" /></radialGradient>
      <radialGradient id="myN" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#04070c" stopOpacity=".85" /><stop offset="1" stopColor="#04070c" stopOpacity="0" /></radialGradient></defs>
    <ellipse cx={540} cy={1060} rx={760} ry={640} fill="url(#myN)" />
    {Array.from({ length: 14 }, (_, i) => { const r = krng(i + 700); const o = luz * (0.25 + 0.35 * r()); return o > 0.01 ? <circle key={i} cx={icF(80 + r() * 920 + 10 * Math.sin(T * 0.4 + i))} cy={icF(620 + r() * 520 - T * 6)} r={icF(14 + r() * 40)} fill="#a8f07e" opacity={o * 0.35} /> : null; })}
    <TroncoPodrido />
    {luz > 0.02 && <ellipse cx={540} cy={1140} rx={360} ry={30} fill="#8fe07a" opacity={0.3 * luz} />}
    {MYCENAS.map(([x, y, a, w, r], i) => <Mycena key={i} x={x} y={y} alto={a} ancho={w} rot={r} luz={kclamp((lt - i * 0.1) * 2.2, 0, 1)} T={T} sd={i + 1} />)}
  </g>;
}
// Corte de bosque: coníferas arriba, suelo con raíces que se tocan; el micelio de Armillaria viaja de raíz en raíz.
const ARB = [[150, 860, 250], [370, 860, 320], [600, 860, 280], [830, 860, 300], [1010, 860, 230]];
const RAICES = ARB.map(([x, y], i) => icRamas({ seed: 300 + i, x, y: y + 4, ang: Math.PI / 2, len: 320, gen: 3, nb: [4, 3, 2], fuerza: 0.06, jit: 0.3, paso: 16, abre: [0.55, 0.5], acorta: [0.65, 0.2] }));
const RUTA_ARM = [[150, 870], [160, 960], [200, 1040], [262, 1110], [318, 1090], [370, 1010], [372, 940], [410, 1020], [470, 1120], [520, 1150], [570, 1080], [600, 990], [640, 1060], [700, 1140], [760, 1120], [812, 1040], [830, 960], [880, 1050], [940, 1130], [1000, 1080], [1010, 990]];
function BosqueCorte({ T, viaje = 0 }) {
  const r = krng(88);
  return <g>
    <defs>
      <linearGradient id="bqS" x1="0" y1="860" x2="0" y2="1480" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4a3627" /><stop offset=".5" stopColor="#2c2018" /><stop offset="1" stopColor="#17110c" /></linearGradient>
      <linearGradient id="bqA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c4a48" /><stop offset="1" stopColor="#17282b" /></linearGradient>
      <linearGradient id="bqN" x1="0" y1="560" x2="0" y2="860" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c9d8e6" stopOpacity="0" /><stop offset="1" stopColor="#c9d8e6" stopOpacity=".18" /></linearGradient>
    </defs>
    <rect x={-20} y={560} width={1120} height={300} fill="url(#bqN)" />
    {ARB.map(([x, y, h], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <rect x={-9} y={-h * 0.3} width={18} height={h * 0.3} fill="#2a1d14" />
      {[0, 1, 2, 3, 4].map((k) => { const yy = -h * (0.18 + k * 0.19), w = (h * 0.36) * (1 - k * 0.17); return <path key={k} d={`M ${-w} ${yy + h * 0.06} Q ${-w * 0.3} ${yy - h * 0.04} 0 ${yy - h * 0.2} Q ${w * 0.3} ${yy - h * 0.04} ${w} ${yy + h * 0.06} Q 0 ${yy} ${-w} ${yy + h * 0.06} Z`} fill="url(#bqA)" />; })}
      <path d={`M 0 ${-h * 0.98} L ${h * 0.12} ${-h * 0.6}`} stroke="#9fc4c0" strokeWidth={3} opacity=".35" />
    </g>)}
    <path d={`M -20 860 ${Array.from({ length: 23 }, (_, i) => `L ${i * 50} ${860 + 6 * Math.sin(i * 1.7)}`).join(' ')} L 1100 860 ${Array.from({ length: 24 }, (_, i) => `L ${1100 - i * 48} ${1440 + 34 * Math.sin(i * 1.3) + 18 * Math.sin(i * 3.7)}`).join(' ')} L -20 1450 Z`} fill="url(#bqS)" />
    <path d={`M -20 1450 ${Array.from({ length: 24 }, (_, i) => `L ${-20 + i * 48} ${1440 + 34 * Math.sin((23 - i) * 1.3) + 18 * Math.sin((23 - i) * 3.7)}`).join(' ')}`} stroke="#cfeeff" strokeWidth={3} fill="none" opacity=".3" />
    {[960, 1080, 1220, 1360].map((y, i) => <path key={i} d={`M -20 ${y} Q 300 ${y + 14} 540 ${y - 6} T 1100 ${y + 8}`} stroke="#5a4432" strokeWidth={2} fill="none" opacity=".35" />)}
    {Array.from({ length: 26 }, (_, i) => { const px = r() * 1080, py = 900 + r() * 480, rr = 8 + r() * 18; return <g key={i}><ellipse cx={icF(px)} cy={icF(py)} rx={icF(rr * 1.4)} ry={icF(rr)} fill="#5b4c42" /><ellipse cx={icF(px - rr * 0.4)} cy={icF(py - rr * 0.4)} rx={icF(rr * 0.5)} ry={icF(rr * 0.3)} fill="#9a8a7a" opacity=".4" /></g>; })}
    {RAICES.map((rs, i) => rs.map((b, j) => <g key={i + '-' + j}><path d={b.d} stroke="#6b4a32" strokeWidth={Math.max(3, 14 - b.g * 4)} fill="none" strokeLinecap="round" /><path d={b.d} stroke="#a77b55" strokeWidth={Math.max(1, 4 - b.g)} fill="none" strokeLinecap="round" opacity=".5" transform="translate(-2 -2)" /></g>))}
    {/* contactos entre raíces vecinas */}
    {[[262, 1110], [470, 1120], [700, 1140], [940, 1130]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill="#8a6244" stroke="#c99a6a" strokeWidth={2} opacity=".9" />)}
    {/* pocos cordones negros (secundarios) */}
    {['M 262 1110 q 30 60 10 120 q -10 40 20 80', 'M 700 1140 q -40 50 -20 110', 'M 600 990 q 50 30 70 -10'].map((d, i) => <g key={i} opacity={kprog(viaje, 0.3 + i * 0.2, 0.5 + i * 0.2)}><path d={d} stroke="#0b0a0a" strokeWidth={7} fill="none" strokeLinecap="round" /><path d={d} stroke="#5a5048" strokeWidth={1.6} fill="none" transform="translate(-1.5 -1.5)" /></g>)}
    {/* micelio de Armillaria: línea ámbar que pasa de raíz en raíz */}
    <Brilla d={icCurva(icParcial(RUTA_ARM, viaje))} color="#ffb84d" w={4} nucleo="#fff0c8" />
    {viaje > 0.02 && viaje < 1 && (() => { const p = icParcial(RUTA_ARM, viaje); const e = p[p.length - 1]; return <circle cx={e[0]} cy={e[1]} r={12} fill="#fff0c8" opacity=".9" />; })()}
    {RUTA_ARM.map(([x, y], i) => { const o = kclamp(viaje * RUTA_ARM.length - i, 0, 1); return o > 0 ? <path key={i} d={icBlob(x, y, 22, 14, i + 9, 0.3, 14)} fill="#ffcf7a" opacity={0.2 * o} /> : null; })}
  </g>;
}
// Nudo de micelio que late (re-gancho, en lo oscuro).
const NUDO = (() => { let o = []; for (let k = 0; k < 9; k++) o = o.concat(icRamas({ seed: 500 + k, x: 540, y: 900, ang: (k / 9) * 6.283, len: 260, gen: 3, nb: [3, 2], fuerza: 0, jit: 0.5, paso: 14, abre: [0.4, 0.6] })); return o; })();
function NudoMicelio({ T, late = 1 }) {
  const p = 0.6 + 0.4 * Math.pow(Math.max(0, Math.sin(T * 7.5)), 3) * late;
  return <g>
    <defs><radialGradient id="nuG" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd78a" stopOpacity=".5" /><stop offset=".4" stopColor="#ffb84d" stopOpacity=".15" /><stop offset="1" stopColor="#ffb84d" stopOpacity="0" /></radialGradient></defs>
    <circle cx={540} cy={900} r={420 * (0.9 + 0.1 * p)} fill="url(#nuG)" opacity={p} />
    {NUDO.map((b, i) => <Brilla key={i} d={b.d} w={Math.max(1, 3 - b.g * 0.7)} o={(0.55 + 0.45 * p) * (1 - b.g * 0.15)} />)}
  </g>;
}

/* ---------------- nivel 4: hoja, hormiga y Ophiocordyceps; anillo de 3 células y nematodo ---------------- */
const HOJA_D = 'M -80 640 C 120 505 470 470 780 528 C 940 560 1070 612 1160 668 C 1050 752 820 806 560 800 C 300 794 90 742 -80 640 Z';
function HojaCine({ T }) {
  const nerv = [];
  const mid = (u) => [klerp(-80, 1160, u), 640 + (668 - 640) * u - 40 * Math.sin(Math.PI * u)];
  for (let i = 1; i < 12; i++) { const u = i / 12, [x, y] = mid(u); nerv.push(<path key={'a' + i} d={`M ${x} ${y} Q ${x + 60} ${y - 70} ${x + 150} ${y - 110 + i * 3}`} stroke="#c7dcae" strokeWidth={3} fill="none" opacity=".55" />); nerv.push(<path key={'b' + i} d={`M ${x} ${y} Q ${x + 60} ${y + 60} ${x + 150} ${y + 110 - i * 4}`} stroke="#c7dcae" strokeWidth={3} fill="none" opacity=".55" />); }
  const r = krng(5), red = Array.from({ length: 160 }, (_, i) => { const x = -40 + r() * 1180, y = 520 + r() * 270; return <path key={i} d={`M ${icF(x)} ${icF(y)} l ${icF(10 + r() * 14)} ${icF((r() - 0.5) * 14)}`} stroke="#b7cf9c" strokeWidth={1.2} opacity=".35" />; });
  return <g>
    <defs>
      <linearGradient id="hjF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d7f4a" /><stop offset=".5" stopColor="#86a66c" /><stop offset="1" stopColor="#4a6a3a" /></linearGradient>
      <clipPath id="hjC"><path d={HOJA_D} /></clipPath>
    </defs>
    <path d="M -80 640 C -140 600 -200 600 -260 620" stroke="#4f6e3d" strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d={HOJA_D} fill="url(#hjF)" />
    <g clipPath="url(#hjC)">{red}{nerv}
      {Array.from({ length: 200 }, (_, i) => <circle key={i} cx={icF(-60 + r() * 1200)} cy={icF(510 + r() * 290)} r={1.2} fill="#e4f0d4" opacity=".35" />)}
    </g>
    <path d={`M -80 640 Q 540 572 1160 668`} stroke="#d9e8c4" strokeWidth={10} fill="none" opacity=".8" />
    <path d={`M -80 640 Q 540 586 1160 668`} stroke="#3e5a30" strokeWidth={4} fill="none" opacity=".5" />
    <path d={HOJA_D} fill="none" stroke="#a8c48c" strokeWidth={3} opacity=".6" />
  </g>;
}
// IK de dos huesos: rodilla entre cadera y pie.
function icIK(a, b, l1, l2, flip) {
  const dx = b[0] - a[0], dy = b[1] - a[1]; const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.5);
  const ang = Math.atan2(dy, dx), c = Math.acos(kclamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)), t = ang + (flip ? c : -c);
  return [a[0] + Math.cos(t) * l1, a[1] + Math.sin(t) * l1];
}
// Hormiga (Camponotus) vista por la espalda, colgada de la vena: mandíbulas en (0, 0), cuerpo hacia +y.
// vive 0..1 (1 = viva, se mueve), muerde 0..1 (cierra mandíbulas), tallo 0..1 (Ophiocordyceps desde la nuca).
function HormigaCine({ T, x, y, rot = 0, vive = 1, muerde = 1, tallo = 0, id = 'hm' }) {
  const tt = vive > 0.5 ? T : 0, w = (i, a = 5) => vive * a * Math.sin(tt * 6 + i * 1.9);
  const c1 = icMix('#5a4038', '#3a2a22', 0), cu = icMix('#2b1a16', '#4a423c', 1 - vive), lu = icMix('#7a4c38', '#6a625a', 1 - vive);
  const PATAS = [[[46, 222], [150, 14]], [[44, 286], [262, 112]], [[46, 340], [236, 430]]];
  const pata = (hip, pie, sg, i) => {
    const h = [sg * hip[0], hip[1]], f = [sg * pie[0] + w(i), pie[1] + w(i + 4)];
    const k = icIK(h, f, i === 2 ? 150 : 140, i === 2 ? 190 : 170, sg > 0 ? i !== 2 : i === 2);
    const tob = [klerp(k[0], f[0], 0.62), klerp(k[1], f[1], 0.62)];
    return <g key={i + '' + sg}>
      <path d={icPoli([h, k])} stroke={cu} strokeWidth={17} strokeLinecap="round" fill="none" />
      <path d={icPoli([h, k])} stroke={lu} strokeWidth={5} strokeLinecap="round" fill="none" opacity=".55" transform="translate(-2 -3)" />
      <path d={icPoli([k, tob])} stroke={cu} strokeWidth={11} strokeLinecap="round" fill="none" />
      {[0.25, 0.5, 0.75].map((u, j) => { const p = [klerp(k[0], tob[0], u), klerp(k[1], tob[1], u)]; return <line key={j} x1={p[0]} y1={p[1]} x2={p[0] + 9 * sg} y2={p[1] + 5} stroke="#d9c4a6" strokeWidth={1.4} opacity=".55" />; })}
      {[0, 1, 2, 3].map((j) => { const p = [klerp(tob[0], f[0], (j + 0.5) / 4), klerp(tob[1], f[1], (j + 0.5) / 4)]; return <ellipse key={j} cx={p[0]} cy={p[1]} rx={6.5 - j} ry={5 - j * 0.6} fill={cu} />; })}
      <path d={`M ${f[0]} ${f[1]} l ${5 * sg} -7 M ${f[0]} ${f[1]} l ${-4 * sg} -7`} stroke={cu} strokeWidth={2.4} />
    </g>;
  };
  const ant = (sg) => { const p = [[sg * 30, 58], [sg * 104, 8 + w(7, 4)]]; for (let i = 1; i <= 10; i++) p.push([sg * (104 + i * 11), 8 + i * 9 + w(8 + i * 0.2, 6) * (i / 10) + (1 - vive) * i * 4]); return p; };
  const TP = [[24, 182], [96, 198], [176, 244], [240, 318], [286, 410], [308, 512], [318, 610], [322, 700], [318, 770]];
  const tp = icParcial(TP, tallo), mitad = icParcial(TP, 0.52), pm = mitad[mitad.length - 1];
  const mj = 14 * (1 - muerde);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <defs>
      <radialGradient id={id + 'g'} cx=".38" cy=".3" r=".8"><stop offset="0" stopColor={lu} /><stop offset=".55" stopColor={cu} /><stop offset="1" stopColor="#120a08" /></radialGradient>
      <linearGradient id={id + 't'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6bf98" /><stop offset="1" stopColor="#9a7a56" /></linearGradient>
    </defs>
    {PATAS.map(([h, f], i) => [1, -1].map((sg) => pata(h, f, sg, i)))}
    {[1, -1].map((sg) => <g key={'a' + sg}>{ant(sg).map((p, i) => <ellipse key={i} cx={icF(p[0])} cy={icF(p[1])} rx={i === 0 ? 5 : 6.5} ry={i === 0 ? 5 : 6} fill={cu} />)}<path d={icCurva(ant(sg))} stroke={cu} strokeWidth={6} fill="none" /></g>)}
    {/* gáster con bandas y pelitos */}
    <ellipse cx={0} cy={520} rx={96} ry={126} fill={`url(#${id}g)`} />
    {[440, 490, 545, 598].map((yy, i) => <path key={i} d={`M ${-90 + i * 6} ${yy} Q 0 ${yy + 26} ${90 - i * 6} ${yy}`} stroke="#c9a77c" strokeWidth={2} fill="none" opacity={0.45 * vive + 0.15} />)}
    {Array.from({ length: 26 }, (_, i) => { const a = -0.4 + (i / 26) * 3.9, xx = Math.cos(a) * 92, yy = 520 + Math.sin(a) * 122; return <line key={i} x1={icF(xx)} y1={icF(yy)} x2={icF(xx * 1.1)} y2={icF(520 + (yy - 520) * 1.1)} stroke="#e6d3b0" strokeWidth={1.3} opacity=".55" />; })}
    <ellipse cx={-30} cy={470} rx={26} ry={44} fill="#ffffff" opacity={0.14 + 0.1 * vive} transform="rotate(-20 -30 470)" />
    {/* pecíolo y mesosoma */}
    <ellipse cx={0} cy={396} rx={22} ry={17} fill={`url(#${id}g)`} />
    <ellipse cx={0} cy={344} rx={42} ry={32} fill={`url(#${id}g)`} /><ellipse cx={0} cy={288} rx={40} ry={34} fill={`url(#${id}g)`} /><ellipse cx={0} cy={226} rx={53} ry={42} fill={`url(#${id}g)`} />
    {[226, 288, 344].map((yy, i) => <ellipse key={i} cx={-14} cy={yy - 12} rx={14} ry={8} fill="#ffffff" opacity=".12" />)}
    <rect x={-12} y={166} width={24} height={26} rx={10} fill={cu} />
    {/* cabeza, ojos y mandíbulas clavadas en la vena */}
    <path d="M 0 28 C -62 22 -80 70 -76 112 C -72 150 -42 174 0 174 C 42 174 72 150 76 112 C 80 70 62 22 0 28 Z" fill={`url(#${id}g)`} />
    <ellipse cx={-64} cy={96} rx={13} ry={20} fill="#0c0706" /><ellipse cx={64} cy={96} rx={13} ry={20} fill="#0c0706" />
    <circle cx={-67} cy={89} r={4} fill="#fff" opacity=".5" /><circle cx={61} cy={89} r={4} fill="#fff" opacity=".5" />
    <path d="M -26 40 Q 0 52 26 40" stroke="#c9a77c" strokeWidth={2} fill="none" opacity=".4" />
    <path d={`M -32 32 C ${-44 - mj} 10 ${-30 - mj} -6 ${-6 - mj * 0.3} -4 C -18 6 -20 18 -14 30 Z`} fill="#1a0f0c" />
    <path d={`M 32 32 C ${44 + mj} 10 ${30 + mj} -6 ${6 + mj * 0.3} -4 C 18 6 20 18 14 30 Z`} fill="#1a0f0c" />
    {/* Ophiocordyceps: un solo tallo desde la nuca, con un engrosamiento a media altura */}
    {tallo > 0.01 && <g>
      <path d={icCurva(tp)} stroke={`url(#${id}t)`} strokeWidth={13} fill="none" strokeLinecap="round" />
      <path d={icCurva(tp)} stroke="#f2e4c8" strokeWidth={3} fill="none" strokeLinecap="round" opacity=".55" transform="translate(-3 -2)" />
      {tallo > 0.56 && <g transform={`translate(${pm[0]} ${pm[1]}) rotate(-20)`} opacity={kprog(tallo, 0.56, 0.72)}>
        <ellipse rx={24} ry={58} fill="#8a6444" /><ellipse cx={-6} cy={-12} rx={8} ry={30} fill="#c9a77c" opacity=".5" />
        {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={icF(-12 + (i % 3) * 12)} cy={-40 + Math.floor(i / 3) * 24} r={3} fill="#4a3020" opacity=".7" />)}
      </g>}
      <circle cx={24} cy={182} r={14} fill="#d6bf98" opacity=".85" />
    </g>}
  </g>;
}
// Anillo de 3 células (y 2 del tallito) que se inflan hacia adentro. inf = 0..1.
function AnilloTrampa({ cx = 540, cy = 980, R = 190, r0 = 112, inf = 0, T = 0 }) {
  const rin = r0 - 22 * inf, cel = [];
  const ang = [Math.PI / 2, Math.PI / 2 + 2.094, Math.PI / 2 + 4.189];
  for (let k = 0; k < 3; k++) {
    const a0 = ang[k] + 0.05, a1 = ang[k] + 2.094 - 0.05, am = (a0 + a1) / 2;
    const p = (a, rr) => [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
    const o0 = p(a0, R), o1 = p(a1, R), i0 = p(a0, rin), i1 = p(a1, rin), ctl = p(am, rin - 95 * inf), om = p(am, R * 1.06);
    const d = `M ${icF(o0[0])} ${icF(o0[1])} Q ${icF(om[0] * 2 - (o0[0] + o1[0]) / 2)} ${icF(om[1] * 2 - (o0[1] + o1[1]) / 2)} ${icF(o1[0])} ${icF(o1[1])} L ${icF(i1[0])} ${icF(i1[1])} Q ${icF(ctl[0] * 2 - (i0[0] + i1[0]) / 2)} ${icF(ctl[1] * 2 - (i0[1] + i1[1]) / 2)} ${icF(i0[0])} ${icF(i0[1])} Z`;
    const nc = p(am, (R + rin) / 2 - 20 * inf);
    cel.push(<g key={k}><path d={d} fill="#3a9aa8" fillOpacity={0.14 + 0.2 * inf} stroke="#bdf3ff" strokeWidth={10} strokeOpacity=".15" /><path d={d} fill="none" stroke="#c9f6ff" strokeWidth={3.2} />
      <ellipse cx={nc[0]} cy={nc[1]} rx={18} ry={13} fill="none" stroke="#9fe6f2" strokeWidth={2} opacity=".7" /></g>);
  }
  return <g>
    {/* tallito de 2 células unido a la hifa */}
    <rect x={cx - 34} y={cy + R - 6} width={68} height={70} rx={26} fill="#3a9aa8" fillOpacity=".14" stroke="#c9f6ff" strokeWidth={3} />
    <rect x={cx - 30} y={cy + R + 62} width={60} height={64} rx={24} fill="#3a9aa8" fillOpacity=".14" stroke="#c9f6ff" strokeWidth={3} />
    {cel}
  </g>;
}
// Nematodo translúcido: la cabeza en hx; el cuerpo serpentea hacia atrás. atrapado 0..1 apaga el serpenteo cerca del anillo.
function Nematodo({ T, hx, cy = 980, largo = 1000, amp = 38, ancho = 62, atrapado = 0, cxA = 540 }) {
  const pts = []; for (let u = 0; u <= 1.0001; u += 0.025) { const x = hx - u * largo; const cerca = kclamp(Math.abs(x - cxA) / 220, 0, 1); const a = amp * cerca * (1 - 0.6 * atrapado) + (atrapado > 0 ? 10 * atrapado * Math.sin(T * 22) * (1 - cerca) * 0 : 0); pts.push([x, cy + a * Math.sin(u * 11 - T * (8 + 10 * atrapado)) + (1 - cerca) * 0]); }
  const d = icCurva(pts), cola = icCurva(pts.slice(Math.floor(pts.length * 0.78)));
  const cuerpo = icCurva(pts.slice(0, Math.floor(pts.length * 0.82)));
  return <g>
    <path d={cuerpo} stroke="#dff4ff" strokeWidth={ancho + 14} strokeOpacity=".12" fill="none" strokeLinecap="round" />
    <path d={cuerpo} stroke="#e2f5ff" strokeWidth={ancho + 4} fill="none" strokeLinecap="round" />
    <path d={cuerpo} stroke="#14303c" strokeWidth={ancho - 2} fill="none" strokeLinecap="round" />
    <path d={cola} stroke="#e2f5ff" strokeWidth={ancho * 0.55 + 4} fill="none" strokeLinecap="round" />
    <path d={cola} stroke="#14303c" strokeWidth={ancho * 0.55 - 2} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#8fc6dc" strokeWidth={5} fill="none" opacity=".55" strokeDasharray="22 10" />
    <ellipse cx={pts[3][0]} cy={pts[3][1]} rx={22} ry={14} fill="none" stroke="#bfe6f5" strokeWidth={2.4} opacity=".7" />
    <circle cx={pts[0][0] - 6} cy={pts[0][1]} r={5} fill="#e2f5ff" opacity=".8" />
  </g>;
}

/* ---------------- nivel 5: Schizophyllum commune; laboratorio con radiación ---------------- */
function RamaSchizo() {
  const r = krng(17);
  return <g>
    <defs><linearGradient id="rsC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a5a4a" /><stop offset=".5" stopColor="#4a3c30" /><stop offset="1" stopColor="#241c15" /></linearGradient></defs>
    <path d="M -60 1250 C 300 1170 700 1110 1140 1040 L 1140 1140 C 700 1210 300 1270 -60 1350 Z" fill="url(#rsC)" />
    {Array.from({ length: 18 }, (_, i) => { const x = -40 + i * 66, y = 1260 - x * 0.19; return <path key={i} d={`M ${icF(x)} ${icF(y + (r() - 0.5) * 30)} q 30 ${icF(-4 + r() * 8)} 60 ${icF(-10)}`} stroke="#1a130d" strokeWidth={2 + r() * 2} fill="none" opacity=".6" />; })}
    {Array.from({ length: 10 }, (_, i) => { const x = 40 + r() * 1000, y = 1232 - x * 0.19 + r() * 60; return <ellipse key={i} cx={icF(x)} cy={icF(y)} rx={icF(14 + r() * 20)} ry={icF(6 + r() * 6)} fill="#8a9a7a" opacity=".45" />; })}
    <path d="M -60 1250 C 300 1170 700 1110 1140 1040" stroke="#9a8a76" strokeWidth={5} fill="none" opacity=".5" />
  </g>;
}
// Abanico visto desde arriba (sombrerito blanco grisáceo, peludo, con zonas concéntricas y borde lobulado, sin pie).
function AbanicoLado({ x, y, s = 1, rot = 0, sd = 1 }) {
  const r = krng(sd), b = [];
  for (let i = 0; i <= 24; i++) { const a = Math.PI * (1.08 + 0.84 * i / 24); const m = 1 + 0.12 * Math.sin(i * 0.9 + sd) + 0.06 * Math.sin(i * 2.3 + sd * 2); b.push([Math.cos(a) * 86 * m, Math.sin(a) * 70 * m]); }
  const forma = icCurva([[0, 6]].concat(b).concat([[0, 6]]), true, 0.7);
  const pelos = Array.from({ length: 60 }, (_, i) => { const a = Math.PI * (1.1 + 0.8 * r()), rr = 10 + r() * 66; return <line key={i} x1={icF(Math.cos(a) * rr)} y1={icF(Math.sin(a) * rr * 0.82)} x2={icF(Math.cos(a) * (rr + 9))} y2={icF(Math.sin(a) * (rr + 9) * 0.82)} stroke="#ffffff" strokeWidth={1.3} opacity=".55" />; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><radialGradient id={'al' + sd} cx=".5" cy="1" r="1"><stop offset="0" stopColor="#a89c90" /><stop offset=".55" stopColor="#d6cfc4" /><stop offset="1" stopColor="#f1ede6" /></radialGradient></defs>
    <path d={forma} fill={`url(#al${sd})`} />
    {[0.35, 0.6, 0.82].map((k, i) => <path key={i} d={icCurva(b.map(([px, py]) => [px * k, py * k + 6 * (1 - k)]))} stroke="#9a8e82" strokeWidth={2} fill="none" opacity=".4" />)}
    {pelos}
    <path d={icCurva(b)} stroke="#fbf9f4" strokeWidth={4} fill="none" opacity=".8" />
  </g>;
}
// Abanico visto por debajo: láminas que irradian del punto de unión, partidas en dos a lo largo del filo, con laminillas
// cortas entre ellas; borde lobulado y peludo (se asoma el sombrerito blanco). Punto de unión en (x, y).
function AbanicoDebajo({ x, y, R = 430, crece = 1, T = 0, a0 = 1.06, a1 = 1.94, sd = 3 }) {
  const A0 = Math.PI * a0, A1 = Math.PI * a1, rr = R * (0.55 + 0.45 * crece), q = krng(sd);
  const lob = Array.from({ length: 6 }, () => [q() * 6.28, 0.5 + q() * 0.6]);
  const radio = (u) => { let m = 1; lob.forEach(([ph, f], j) => { m += Math.sin(u * (4 + j * 3) * f + ph) * 0.07 / (j * 0.6 + 1); }); return rr * m * (1 - 0.18 * Math.pow(Math.abs(u - 0.5) * 2, 3)); };
  const borde = []; for (let i = 0; i <= 48; i++) { const u = i / 48, a = klerp(A0, A1, u), m = radio(u); borde.push([Math.cos(a) * m, Math.sin(a) * m]); }
  const N = Math.round(18 + rr / 14), lam = [];
  for (let i = 0; i < N; i++) {
    const u = (i + 0.5) / N, a = klerp(A0, A1, u), Lr = radio(u) * 0.95, cs = Math.cos(a), sn = Math.sin(a), nx = -sn, ny = cs;
    const corta = i % 2 === 1, ini = corta ? 0.45 : 0.08;
    const p0 = [cs * Lr * ini, sn * Lr * ini], pm = [cs * Lr * Math.max(ini, 0.32), sn * Lr * Math.max(ini, 0.32)], p1 = [cs * Lr, sn * Lr], sep = Math.max(2.5, rr / 70);
    lam.push(<g key={i}>
      <path d={icPoli([p0, pm])} stroke="#cdb8ad" strokeWidth={corta ? 2.4 : 3.6} />
      <path d={icPoli([pm, [p1[0] + nx * sep, p1[1] + ny * sep]])} stroke="#dccbc0" strokeWidth={corta ? 1.8 : 2.4} />
      <path d={icPoli([pm, [p1[0] - nx * sep, p1[1] - ny * sep]])} stroke="#dccbc0" strokeWidth={corta ? 1.8 : 2.4} />
      <path d={icPoli([pm, p1])} stroke="#6b5a52" strokeWidth={1.1} opacity=".55" />
    </g>);
  }
  const pelos = Array.from({ length: Math.round(rr / 3) }, (_, i) => { const k = Math.floor(q() * borde.length), p = borde[k], L = 6 + q() * rr * 0.04; return <line key={i} x1={icF(p[0])} y1={icF(p[1])} x2={icF(p[0] * (1 + L / rr))} y2={icF(p[1] * (1 + L / rr))} stroke="#f4f1ea" strokeWidth={1.3} opacity=".7" />; });
  const forma = icCurva([[0, 12]].concat(borde).concat([[0, 12]]), true, 0.6);
  return <g transform={`translate(${x} ${y})`}>
    <defs><radialGradient id={'adB' + sd} cx=".5" cy="1" r="1"><stop offset="0" stopColor="#5e4e48" /><stop offset=".7" stopColor="#8c7a72" /><stop offset="1" stopColor="#b3a49a" /></radialGradient></defs>
    <path d={forma} fill="#ece7dd" transform="scale(1.05)" />
    <path d={forma} fill={`url(#adB${sd})`} />
    {lam}{pelos}
    <ellipse cx={0} cy={6} rx={rr * 0.07} ry={rr * 0.04} fill="#d9cfc4" />
  </g>;
}
function MesaLab({ T }) {
  return <g>
    <defs>
      <linearGradient id="mlM" x1="0" y1="1080" x2="0" y2="1500" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2a313b" /><stop offset=".2" stopColor="#1a2028" /><stop offset="1" stopColor="#0b0e13" /></linearGradient>
      <radialGradient id="mlL" cx=".5" cy="0" r=".9"><stop offset="0" stopColor="#ffe7c2" stopOpacity=".28" /><stop offset=".6" stopColor="#ffe7c2" stopOpacity=".06" /><stop offset="1" stopColor="#ffe7c2" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={-40} y={520} width={1160} height={600} fill="#0c1118" opacity=".7" />
    {[[140, 760, 60, 130], [240, 790, 44, 100], [880, 770, 54, 120], [960, 800, 36, 90]].map(([x, y, w, h], i) => <g key={i} opacity=".45"><rect x={x - w / 2} y={y} width={w} height={h} rx={8} fill="#1c2836" /><rect x={x - w / 2 + 6} y={y + h * 0.45} width={w - 12} height={h * 0.5} rx={4} fill="#2e4a5a" opacity=".6" /><rect x={x - w / 2 + 4} y={y + 6} width={6} height={h - 20} fill="#9fc4dc" opacity=".25" /></g>)}
    <rect x={-40} y={895} width={1160} height={10} fill="#273240" opacity=".6" />
    <path d="M 540 520 L 140 1480 L 940 1480 Z" fill="url(#mlL)" />
    <rect x={-40} y={1080} width={1160} height={420} fill="url(#mlM)" />
    <rect x={-40} y={1080} width={1160} height={3} fill="#9fb4c8" opacity=".35" />
  </g>;
}
function PlacaNegra({ cx, cy, rx = 220, ry = 140, g = 0, mas = 1, sd = 1, id = 'pn' }) {
  const r = krng(sd), col = [];
  const n = 7 + Math.round(5 * mas);
  for (let i = 0; i < n; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * 0.72; const x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d, b = 10 + r() * 16; const k = (0.35 + g * (0.4 + 1.3 * mas)) * (i < 7 ? 1 : kclamp(g * 2 - (i - 7) * 0.25, 0, 1)); if (k <= 0.02) continue;
    col.push(<g key={i}><path d={icBlob(x, y, b * k * 1.25, b * k * 0.82, sd * 50 + i, 0.18, 18)} fill="#3a342e" opacity=".7" /><path d={icBlob(x, y, b * k, b * k * 0.66, sd * 50 + i + 1, 0.12, 18)} fill={`url(#${id}c)`} /><ellipse cx={x - b * k * 0.3} cy={y - b * k * 0.25} rx={b * k * 0.25} ry={b * k * 0.12} fill="#9a9690" opacity=".35" /></g>); }
  return <g>
    <defs><radialGradient id={id + 'c'} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#2a2622" /><stop offset="1" stopColor="#060505" /></radialGradient>
      <radialGradient id={id + 'a'} cx=".45" cy=".4" r=".65"><stop offset="0" stopColor="#c9b88a" /><stop offset="1" stopColor="#8f7f58" /></radialGradient></defs>
    <ellipse cx={cx + 10} cy={cy + ry + 18} rx={rx * 0.95} ry={20} fill="#000" opacity=".5" />
    <ellipse cx={cx} cy={cy + 12} rx={rx + 14} ry={ry + 12} fill="#bcd2e0" fillOpacity=".08" stroke="#dbe8f2" strokeWidth={2.5} strokeOpacity=".5" />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}a)`} />
    {col}
    <path d={`M ${cx - rx * 0.8} ${cy - ry * 0.45} A ${rx} ${ry} 0 0 1 ${cx - rx * 0.1} ${cy - ry * 0.98}`} stroke="#ffffff" strokeWidth={6} fill="none" opacity=".3" strokeLinecap="round" />
  </g>;
}
function SimboloRadiacion({ x, y, r = 42, o = 1 }) {
  const hoja = (a) => { const a0 = a - 0.5236, a1 = a + 0.5236, ri = r * 0.3, re = r; return `M ${icF(x + Math.cos(a0) * ri)} ${icF(y + Math.sin(a0) * ri)} L ${icF(x + Math.cos(a0) * re)} ${icF(y + Math.sin(a0) * re)} A ${re} ${re} 0 0 1 ${icF(x + Math.cos(a1) * re)} ${icF(y + Math.sin(a1) * re)} L ${icF(x + Math.cos(a1) * ri)} ${icF(y + Math.sin(a1) * ri)} A ${ri} ${ri} 0 0 0 ${icF(x + Math.cos(a0) * ri)} ${icF(y + Math.sin(a0) * ri)} Z`; };
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r * 1.35} fill="#d8b84a" />
    {[-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6].map((a, i) => <path key={i} d={hoja(a)} fill="#14161a" />)}
    <circle cx={x} cy={y} r={r * 0.2} fill="#14161a" />
  </g>;
}

Object.assign(window, { icF, icCurva, icPoli, icDentro, icRamas, icParcial, icBlob, icMix, Brilla, ChampinonCine, PuntaHielo, MarSuperficie, IcebergEntero, ColumnaHielo, BokehFrente,
  icProfColor, Lbl, Tarjeta, NumeroCine, NivelMarca, ReglaProf, Plantula, SueloCorte, HogazaCorte, Levadura, PetriCine, HifaPared, EscarabajoCine, icHex,
  TroncoPodrido, Mycena, BosqueMycena, BosqueCorte, NudoMicelio, HojaCine, HormigaCine, AnilloTrampa, Nematodo, RamaSchizo, AbanicoLado, AbanicoDebajo,
  MesaLab, PlacaNegra, SimboloRadiacion, NODOS_OV, ICE_OV, icIK });
