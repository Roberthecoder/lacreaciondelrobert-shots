// fungi-kit.jsx — piezas de hongos para la serie Shot Fungi Mati (#05–#09, 28 oct 2026).
// Todo es SVG en coordenadas de pantalla (1080×1920) y se dibuja desde T. Trazo INK grueso, relleno plano.
// Se carga después de kit-robert.jsx: from="./animations-v3.jsx ./kit-robert.jsx ./fungi-kit.jsx ./shot.jsx"

const FK = { tierra:'#5b3a22', tierra2:'#3e2716', suelo:'#2a1a10', miel:'#c98b2b', miel2:'#e2b25a', crema:'#f3e6c4', hifa:'#fff4d6', negro:'#1b1410', pasto:'#3fbf4a' };
const fsvg = (c, z = 20) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{c}</svg>;

// Barra de escala fija (para escalas de metros o kilómetros, donde la Escala del kit no llega).
function BarraEscala({ T, texto, largo = 200, x = 60, y = 1430, at = -1, until, color = KC.texto }) {
  if (T < at || (until != null && T > until)) return null;
  const o = kprog(T, at, at + 0.3) * (until != null ? 1 - kprog(T, until - 0.3, until) : 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA, opacity:o }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}

// Seta de perfil. crece 0..1 (sale del suelo y abre el sombrero). Base del pie en (x, y).
function Seta({ x, y, s = 1, crece = 1, rot = 0, sombrero = FK.miel, pie = FK.crema, escamas = true, anillo = true, alto = 150, ancho = 150, laminas = '#f7efd9' }) {
  if (crece <= 0) return null;
  const h = alto * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = ancho * (0.45 + 0.55 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  const cap = `M ${-a / 2} ${-h} Q ${-a / 2} ${-h - a * 0.55} 0 ${-h - a * 0.58} Q ${a / 2} ${-h - a * 0.55} ${a / 2} ${-h} Q 0 ${-h + a * 0.12} ${-a / 2} ${-h} Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -14 0 L -11 ${-h} L 11 ${-h} L 14 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {anillo && h > 60 && <path d={`M -22 ${-h * 0.72} Q 0 ${-h * 0.62} 22 ${-h * 0.72} L 16 ${-h * 0.8} L -16 ${-h * 0.8} Z`} fill={pie} stroke={KC.ink} strokeWidth={5} />}
    <path d={`M ${-a / 2 + 6} ${-h + 2} Q 0 ${-h + a * 0.1} ${a / 2 - 6} ${-h + 2}`} stroke={laminas} strokeWidth={10} fill="none" />
    <path d={cap} fill={sombrero} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {escamas && [[-0.22, 0.32], [0.05, 0.42], [0.25, 0.3], [-0.05, 0.22], [0.15, 0.18], [-0.3, 0.15]].map(([u, v], i) =>
      <circle key={i} cx={u * a} cy={-h - v * a} r={a * 0.035 + 2} fill="#6b4318" />)}
  </g>;
}

// Racimo de setas que brotan una tras otra desde 'at'. pts = [[dx, dy, escala, rot], ...]
function Racimo({ T, x, y, at, cada = 0.12, pts, s = 1, sombrero, crecimiento = 0.6 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {pts.map(([dx, dy, k, r], i) => { const c = kprog(T, at + i * cada, at + i * cada + crecimiento); return <Seta key={i} x={dx} y={dy} s={k} rot={r + mece(T, i + 3, 0.4) * 2} crece={c} sombrero={sombrero} />; })}
  </g>;
}
const RACIMO_MIEL = [[-60, 0, 0.9, -12], [10, 6, 1.15, 2], [80, 0, 0.85, 14], [-120, 10, 0.7, -22], [140, 10, 0.7, 24], [-20, 14, 0.75, -6], [45, 14, 0.7, 9]];

// Conífera esquemática (pino/abeto): tronco + 4 pisos de follaje. muere 0..1 = el follaje se vuelve café y se cae.
function Conifera({ x, y, s = 1, muere = 0, T = 0, seed = 1 }) {
  const verde = mixHex('#2f9e44', '#a0662a', muere), verde2 = mixHex('#46c25a', '#c08a3c', muere);
  const ladea = muere * 4 + mece(T, seed, 0.3) * 1.2;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${ladea})`}>
    <rect x={-22} y={-330} width={44} height={330} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((k) => { const w = 210 - k * 42, yy = -150 - k * 115; const caida = muere > 0.5 ? (muere - 0.5) * 2 * (k % 2 ? 0.6 : 1) : 0;
      return <path key={k} d={`M ${-w} ${yy} L 0 ${yy - 190} L ${w} ${yy} Z`} fill={k % 2 ? verde2 : verde} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" opacity={1 - caida * 0.55} transform={`scale(${1 - caida * 0.25} 1)`} />; })}
  </g>;
}

// Red de hifas o cordones que crece desde (x, y). g = 0..1 crecimiento. seed fija la forma. escala = tamaño.
function RedHifas({ T, x, y, g = 1, seed = 3, n = 300, escala = 0.3, color = FK.hifa, ancho = 3, circ = false, brillo = 0, rot = 0 }) {
  const segs = kArbolRadial(seed, n, circ);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${escala})`} style={brillo ? { filter:`drop-shadow(0 0 ${8 * brillo}px ${color})` } : null}>
    {segs.map((sg, i) => { if (g < sg.b) return null; const u = kclamp((g - sg.b) / Math.max(0.001, sg.e - sg.b), 0, 1);
      const mx = (sg.x1 + sg.x2) / 2 + sg.c * 0.3, my = (sg.y1 + sg.y2) / 2 - sg.c * 0.3;
      const ex = klerp(sg.x1, sg.x2, u), ey = klerp(sg.y1, sg.y2, u);
      return <path key={i} d={`M ${sg.x1} ${sg.y1} Q ${klerp(sg.x1, mx, u)} ${klerp(sg.y1, my, u)} ${ex} ${ey}`} stroke={color} strokeWidth={ancho / escala} fill="none" strokeLinecap="round" />; })}
  </g>;
}

// Cordón (rizomorfo) que avanza de (x1,y1) a (x2,y2) ondulando. p = 0..1
function Cordon({ x1, y1, x2, y2, p = 1, onda = 30, color = FK.negro, ancho = 12, punta = '#fff4d6' }) {
  if (p <= 0) return null;
  const N = 24, pts = [];
  for (let i = 0; i <= N * p; i++) { const u = i / N; const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny) || 1;
    const w = Math.sin(u * Math.PI * 3) * onda; pts.push([klerp(x1, x2, u) + nx / L * w, klerp(y1, y2, u) + ny / L * w]); }
  if (pts.length < 2) return null;
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const [ux, uy] = pts[pts.length - 1];
  return <g><path d={d} stroke={KC.ink} strokeWidth={ancho + 6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {p < 1 && <circle cx={ux} cy={uy} r={ancho * 0.45} fill={punta} />}</g>;
}

// Caja de Petri vista desde arriba. children = lo que crece adentro (coordenadas relativas al centro).
function Petri({ x, y, r = 200, children, medio = '#f5e7b8' }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 14} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
    <circle r={r} fill={medio} stroke={KC.ink} strokeWidth={4} />
    {children}
    <ellipse cx={-r * 0.35} cy={-r * 0.45} rx={r * 0.35} ry={r * 0.12} fill="#fff" opacity=".35" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.45})`} />
  </g>;
}

// Colonia de micelio en agar: disco con borde algodonoso. r crece.
function Colonia({ cx, cy, r, color = '#fffaf0', seed = 1 }) {
  if (r <= 1) return null;
  const g = krng(seed), n = 28;
  const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (0.9 + g() * 0.18); return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <path d={d} fill={color} stroke="rgba(0,0,0,.25)" strokeWidth={3} strokeLinejoin="round" />;
}

// Signo de interrogación gigante (re-gancho).
function Interrogacion({ T, x = 300, y = 1080, color = KC.yellow, tam = 520 }) {
  return <text x={x} y={y} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} ${x} ${y - 180})`}>?</text>;
}

// Sello redondo (✓ / ✗ / texto) que cae con golpe.
function Sello({ T, at, x, y, texto, color = KC.red, r = 110, rot = -12 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <circle r={r} fill="none" stroke={color} strokeWidth={14} />
    <circle r={r - 20} fill="none" stroke={color} strokeWidth={5} />
    <text y={r * 0.2} textAnchor="middle" style={{ font:`400 ${r * 0.62}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}

// Nematodo (gusano redondo) de perfil: cuerpo que ondula. (x, y) = cabeza; ang = hacia dónde mira la cabeza (grados).
// ondula 0..1 (0 = quieto), lleno 0..1 = hifas doradas por dentro, apagado 0..1 = se vacía (digerido).
function Gusano({ T, x, y, largo = 600, ancho = 60, ang = 180, ondula = 1, fase = 0, lleno = 0, apagado = 0, color = '#f3dcb8', seed = 1 }) {
  const N = 34, a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  const xy = Array.from({ length: N + 1 }, (_, i) => { const u = i / N; const py = Math.sin(u * Math.PI * 2.2 - T * 6 * ondula + fase) * ancho * 0.9 * ondula * (0.4 + u * 0.6);
    const px = -u * largo; return [x + px * ca - py * sa, y + px * sa + py * ca]; });
  const M = N - 8, dd = (arr) => "M " + arr.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L "); const d = dd(xy), dc = dd(xy.slice(0, M + 1));
  const cola = (w, c) => xy.slice(M).map((q, i, arr) => i ? <line key={i} x1={arr[i - 1][0]} y1={arr[i - 1][1]} x2={q[0]} y2={q[1]} stroke={c} strokeWidth={w * (1 - i / arr.length * 0.85)} strokeLinecap="round" /> : null);
  const cuerpo = mixHex(color, '#7b6a58', apagado);
  return <g opacity={1 - apagado * 0.35}>
    <path d={dc} stroke={KC.ink} strokeWidth={ancho + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />{cola(ancho + 10, KC.ink)}
    <path d={dc} stroke={cuerpo} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />{cola(ancho, cuerpo)}
    <path d={d} stroke="rgba(150,110,70,.45)" strokeWidth={ancho * 0.25} fill="none" strokeLinecap="round" strokeDasharray="18 10" />
    {lleno > 0 && <path d={d} stroke={KC.gold2} strokeWidth={ancho * 0.18} fill="none" strokeLinecap="round" strokeDasharray={`${lleno * largo * 1.3} 9999`} style={{ filter:`drop-shadow(0 0 6px ${KC.gold})` }} />}
    {lleno > 0.3 && <path d={d} stroke={KC.gold2} strokeWidth={ancho * 0.1} fill="none" strokeDasharray={`6 ${14 - lleno * 8}`} transform={`translate(0 ${ancho * 0.22})`} opacity={lleno} />}
    <circle cx={xy[0][0] + Math.cos(a) * ancho * 0.18} cy={xy[0][1] + Math.sin(a) * ancho * 0.18} r={ancho * 0.12} fill={KC.ink} opacity=".5" />
  </g>;
}

// Trampa de red pegajosa (Arthrobotrys): una hifa con anillos que se cierran sobre sí mismos. prog 0..1 = se forma; gotas 0..1 = pegamento.
function TrampaRed({ T, x, y, s = 1, prog = 1, gotas = 0, color = '#fff4d6', r = 34 }) {
  const anillos = [[0, 0, 0], [r * 1.5, -r * 0.9, 0.25], [r * 2.6, 0.2 * r, 0.45], [r * 1.2, r * 1.2, 0.65]];
  const circ = 2 * Math.PI * r;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-r * 6} ${r * 0.8} Q ${-r * 3} ${r * 0.2} ${-r} ${r * 0.3}`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />
    {anillos.map(([ax, ay, t0], i) => { const p = kprog(prog, t0, t0 + 0.35); return p > 0 ? <g key={i}>
      <circle cx={ax} cy={ay} r={r} fill="none" stroke={KC.ink} strokeWidth={14} strokeDasharray={`${p * circ} ${circ}`} transform={`rotate(${120 + i * 50} ${ax} ${ay})`} />
      <circle cx={ax} cy={ay} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${p * circ} ${circ}`} transform={`rotate(${120 + i * 50} ${ax} ${ay})`} />
      {gotas > 0 && Array.from({ length: 6 }, (_, k) => { const an = k * 1.05 + i; return <circle key={k} cx={ax + Math.cos(an) * r} cy={ay + Math.sin(an) * r} r={5 * gotas + 1.5 * Math.sin(T * 4 + k)} fill="#b8f6ff" opacity={0.85 * gotas} />; })}
    </g> : null; })}
  </g>;
}

Object.assign(window, { FK, fsvg, BarraEscala, Seta, Racimo, RACIMO_MIEL, Conifera, RedHifas, Cordon, Petri, Colonia, Interrogacion, Sello, Gusano, TrampaRed });
