// Shot Fungi Mati #70 · Ese hongo no está pintado: la leche azul de Lactarius indigo — NARRADO (gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const AZ = { somb:'#2f5fa8', zona:'#183e7c', brillo:'#a9c1e6', plata:'#c9d6ea', lam:'#5b86c9', pie:'#4a76ba', carne:'#dfe8f5',
  latex:'#1736a0', verde:'#2e7d4f', tabla:'#c58a4a', tabla2:'#9c6430', tierra:'#4a2f1c', tierra2:'#3a2414', raiz:'#8a5a2e', manto:'#7fb0ef', oro:'#f2c14e' };

// Color del látex: azul oscuro que se vuelve verde al contacto con el aire (v 0..1).
const colorLatex = (v) => mixHex(AZ.latex, AZ.verde, kclamp(v, 0, 1));

// Lactarius indigo de perfil. Base del pie en (x, y). corte 0..1 = cara cortada en la orilla izquierda; leche 0..1 = gotas de látex;
// verde 0..1 = oxidación del látex; crece 0..1.
function HongoAzul({ T = 0, x, y, s = 1, corte = 0, leche = 0, verde = 0, crece = 1, rot = 0 }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1));
  const gotas = [[-158, -150, 9], [-150, -128, 11], [-160, -112, 8], [-146, -160, 7], [-136, -118, 8]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * c})`}>
    {/* pie corto, azul, con manchitas (hoyuelos) */}
    <path d="M -34 0 Q -40 -60 -30 -112 L 30 -112 Q 40 -60 34 0 Z" fill={AZ.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[[-12, -40, 7], [14, -70, 6], [-6, -88, 5], [10, -24, 6]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={r} ry={r * 1.3} fill="#2c5596" opacity=".7" />)}
    <path d="M -16 -6 Q -22 -60 -14 -104" stroke="#ffffff" strokeWidth={5} fill="none" opacity=".3" strokeLinecap="round" />
    {/* laminillas azules (vista de abajo, en perspectiva) */}
    <path d="M -172 -108 Q 0 -52 172 -108 Q 0 -98 -172 -108 Z" fill={AZ.lam} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {Array.from({ length: 17 }, (_, i) => { const u = -1 + i / 8; return <line key={i} x1={u * 26} y1={-104} x2={u * 168} y2={-108 + (1 - u * u) * 50} stroke="#2a4f8f" strokeWidth={3} />; })}
    {/* sombrero: centro algo hundido (embudo leve), zonas concéntricas más oscuras, brillo plateado */}
    <path d="M -176 -106 Q -172 -178 -70 -192 Q -22 -176 0 -174 Q 22 -176 70 -192 Q 172 -178 176 -106 Q 0 -96 -176 -106 Z" fill={AZ.somb} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0.86, 0.66, 0.46].map((k, i) => <path key={i} d={`M ${-176 * k} ${-106 - (1 - k) * 34} Q ${-172 * k} ${-178 + (1 - k) * 8} ${-70 * k} ${-190 + (1 - k) * 8} Q 0 ${-176 + (1 - k) * 6} ${70 * k} ${-190 + (1 - k) * 8} Q ${172 * k} ${-178 + (1 - k) * 8} ${176 * k} ${-106 - (1 - k) * 34}`}
      stroke={AZ.zona} strokeWidth={9 - i * 2} fill="none" opacity=".55" strokeLinecap="round" />)}
    <path d="M -120 -168 Q -60 -186 -20 -178" stroke={AZ.plata} strokeWidth={12} fill="none" opacity={0.45 + 0.15 * Math.sin(T * 2)} strokeLinecap="round" />
    <ellipse cx={95} cy={-170} rx={40} ry={10} fill={AZ.plata} opacity=".35" transform="rotate(8 95 -170)" />
    {/* cara del corte en la orilla izquierda: carne pálida y gotas de látex */}
    {corte > 0 && <g opacity={kclamp(corte * 2, 0, 1)}>
      <path d="M -176 -106 Q -172 -178 -132 -186 L -122 -106 Q -150 -103 -176 -106 Z" fill={AZ.carne} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -132 -186 L -122 -106" stroke={AZ.latex} strokeWidth={4} opacity=".6" />
      {gotas.map(([a, b, r], i) => { const g = kEase.rebote(kclamp(leche * 2.2 - i * 0.25, 0, 1)); return g > 0 ? <circle key={i} cx={a} cy={b} r={r * g} fill={colorLatex(verde * (i % 2 ? 1 : 0.8))} stroke={KC.ink} strokeWidth={2} /> : null; })}
    </g>}
  </g>;
}

// Cuchillo que baja en diagonal (p 0..1).
function Cuchillo({ x, y, p, s = 1 }) {
  if (p <= 0 || p >= 1) return null;
  const u = kEase.suave(p), dy = klerp(-360, 60, u), o = p > 0.85 ? (1 - p) / 0.15 : 1;
  return <g transform={`translate(${x} ${y + dy}) rotate(-28) scale(${s})`} opacity={o}>
    <path d="M -10 0 L 10 0 L 14 -230 Q 0 -250 -12 -230 Z" fill="#d9dde3" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <line x1={-4} y1={-20} x2={-2} y2={-220} stroke="#ffffff" strokeWidth={4} opacity=".7" />
    <rect x={-20} y={0} width={40} height={130} rx={12} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={40} r={6} fill="#d9c08a" /><circle cx={0} cy={90} r={6} fill="#d9c08a" />
  </g>;
}

// Gotas que escurren del corte hasta la tabla y forman un charquito.
function Escurre({ T, x, y0, y1, desde, verde = 0, s = 1 }) {
  const gs = [];
  for (let k = 0; k < 6; k++) { const t0 = desde + k * 0.55, u = (T - t0) / 0.7; if (u < 0 || u > 1) continue;
    gs.push(<path key={k} d="M 0 -16 Q 10 0 0 10 Q -10 0 0 -16 Z" transform={`translate(${x} ${klerp(y0, y1, u * u)}) scale(${s})`} fill={colorLatex(verde)} stroke={KC.ink} strokeWidth={2} />); }
  const charco = kprog(T, desde + 0.6, desde + 3.5);
  return <g>{gs}{charco > 0 && <ellipse cx={x} cy={y1 + 4} rx={50 * charco * s} ry={10 * charco * s} fill={colorLatex(verde)} opacity=".85" />}</g>;
}

// Tabla de picar.
function Tabla({ x, y, w = 700 }) {
  return <g><rect x={x} y={y} width={w} height={46} rx={20} fill={AZ.tabla} stroke={KC.ink} strokeWidth={7} />
    {[0.2, 0.5, 0.8].map((k, i) => <path key={i} d={`M ${x + 30} ${y + 14 + i * 9} Q ${x + w * k} ${y + 8 + i * 9} ${x + w - 30} ${y + 16 + i * 9}`} stroke={AZ.tabla2} strokeWidth={3} fill="none" />)}</g>;
}

// Canasta de mercado con hongos azules.
function Canasta({ T, x, y, s = 1, at }) {
  const p = kprog(T, at, at + 0.5, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${s * p})`}>
    {[[-60, -40, 0.32, -14], [0, -54, 0.36, 4], [62, -40, 0.3, 16]].map(([a, b, k, r], i) => <HongoAzul key={i} T={T} x={a} y={b} s={k} rot={r} />)}
    <path d="M -120 -40 L 120 -40 L 96 50 L -96 50 Z" fill="#c9954f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-10, 14, 38].map((yy, i) => <line key={i} x1={-112 + i * 4} y1={yy} x2={112 - i * 4} y2={yy} stroke="#8a5a2a" strokeWidth={5} />)}
    {[-70, -20, 30, 80].map((xx, i) => <line key={i} x1={xx} y1={-40} x2={xx * 0.85} y2={50} stroke="#8a5a2a" strokeWidth={4} />)}
  </g>;
}

// Lluvia: rayitas que caen sobre toda la pantalla.
function Lluvia({ T, n = 50, o = 1, seed = 4, y0 = 0, y1 = KH }) {
  const r = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = r() * KW, v = 900 + r() * 400, f = r();
    const y = y0 + (((T * v) / (y1 - y0) + f) % 1) * (y1 - y0);
    return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="#e8f4ff" strokeWidth={4} strokeLinecap="round" opacity=".75" />; })}</g>;
}
function Nube({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 30 Q -150 -20 -90 -30 Q -80 -90 -10 -80 Q 40 -120 90 -60 Q 160 -60 140 10 Q 140 40 100 40 L -100 40 Q -125 40 -120 30 Z" fill="#eef3f8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}

// Letrerito de cartón (nombre común) que cae y se queda.
function Carton({ T, at, x, y, rot, texto, ancho }) {
  if (T < at) return null;
  const p = kprog(T, at, at + 0.45, kEase.rebote), dy = (1 - p) * -700;
  return <g transform={`translate(${x} ${y + dy}) rotate(${rot * p + (1 - p) * -25})`}>
    <rect x={-ancho / 2} y={-46} width={ancho} height={92} rx={8} fill="#e6c38f" stroke={KC.ink} strokeWidth={6} />
    <rect x={-ancho / 2 + 8} y={-38} width={ancho - 16} height={76} rx={5} fill="none" stroke="#b88a4f" strokeWidth={3} strokeDasharray="10 7" />
    <text x={0} y={16} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill="#1d3f86">{texto}</text>
  </g>;
}

// Corte por dentro: hifas normales delgadas y hifas lactíferas gruesas llenas de látex que fluye. Al final sale una gota que se pone verde.
function CorteHifas({ T, a, x = 120, y = 800, w = 820, h = 380 }) {
  const normales = Array.from({ length: 12 }, (_, i) => { const yy = y + 20 + i * (h - 40) / 11; return `M ${x} ${yy} Q ${x + w * 0.3} ${yy + Math.sin(i * 1.7) * 18} ${x + w * 0.6} ${yy - 6} T ${x + w} ${yy + 4}`; });
  const lact = [y + h * 0.33, y + h * 0.72];
  const flujo = -T * 90;
  const gota = kprog(T, a + 2.0, a + 2.9, kEase.rebote), verde = kprog(T, a + 2.9, a + 4.4);
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={26} fill="#16233f" stroke={AZ.lam} strokeWidth={5} />
    {normales.map((d, i) => <path key={i} d={d} stroke="#7e93bd" strokeWidth={9} fill="none" opacity={kprog(T, a + i * 0.03, a + 0.4 + i * 0.03) * 0.75} />)}
    {lact.map((yy, i) => { const p = kprog(T, a + 0.5 + i * 0.3, a + 1.4 + i * 0.3, kEase.sale);
      const d = `M ${x} ${yy} Q ${x + w * 0.35} ${yy - 26} ${x + w * 0.65} ${yy + 10} T ${x + w} ${yy}`;
      return <g key={i} opacity={p}>
        <path d={d} stroke={KC.ink} strokeWidth={62} fill="none" strokeLinecap="round" />
        <path d={d} stroke="#9fb7e4" strokeWidth={54} fill="none" strokeLinecap="round" />
        <path d={d} stroke={AZ.latex} strokeWidth={36} fill="none" strokeLinecap="round" />
        <path d={d} stroke="#4f78d8" strokeWidth={10} fill="none" strokeDasharray="20 46" strokeDashoffset={flujo} strokeLinecap="round" />
      </g>; })}
    {/* la gota sale por la orilla cortada (derecha) y se oxida */}
    {gota > 0 && <g transform={`translate(${x + w + 10} ${lact[0] + gota * 34}) scale(${gota})`}>
      <path d="M 0 -30 Q 26 4 0 28 Q -26 4 0 -30 Z" fill={colorLatex(verde)} stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={-7} cy={-2} rx={5} ry={9} fill="#ffffff" opacity=".45" />
    </g>}
  </g>;
}

// Azuleno: anillo de 7 unido a uno de 5 (esquemático). p 0..1 = se dibuja; brillo.
function Azuleno({ T = 0, x, y, s = 1, p = 1, color = '#4f8dff', brillo = 1 }) {
  const R = 80, hep = Array.from({ length: 7 }, (_, i) => { const t = -Math.PI / 2 + Math.PI / 7 + i * 2 * Math.PI / 7; return [R * Math.cos(t), R * Math.sin(t)]; });
  // arista compartida: los dos vértices más a la derecha
  const idx = hep.map((q, i) => [q[0], i]).sort((a, b) => b[0] - a[0]).slice(0, 2).map((q) => q[1]).sort((a, b) => a - b);
  const A = hep[idx[0]], B = hep[idx[1]], L = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, nx = 1, ap = L / (2 * Math.tan(Math.PI / 5)), Rp = L / (2 * Math.sin(Math.PI / 5));
  const cx = mx + ap * nx, cy = my, a0 = Math.atan2(A[1] - cy, A[0] - cx);
  const pen = Array.from({ length: 5 }, (_, i) => { const t = a0 + i * 2 * Math.PI / 5; return [cx + Rp * Math.cos(t), cy + Rp * Math.sin(t)]; });
  const poly = (pts) => 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8) * 4})`} style={brillo ? { filter:`drop-shadow(0 0 ${18 * brillo}px ${color})` } : null}>
    <path d={poly(hep)} fill="rgba(79,141,255,.18)" stroke={color} strokeWidth={10} strokeLinejoin="round" opacity={kclamp(p * 2, 0, 1)} />
    <path d={poly(pen)} fill="rgba(79,141,255,.18)" stroke={color} strokeWidth={10} strokeLinejoin="round" opacity={kclamp(p * 2 - 1, 0, 1)} />
  </g>;
}

// Encino esquemático (copa redonda en racimos). Base del tronco en (x, y).
function Encino({ x, y, s = 1, T = 0 }) {
  const m = mece(T, 7, 0.3) * 1.5;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -26 0 Q -20 -120 -30 -220 L 30 -220 Q 22 -120 26 0 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${m} 0 -220)`}>
      {[[-90, -260, 80], [70, -270, 85], [0, -330, 95], [-60, -360, 70], [70, -360, 70], [0, -250, 80]].map(([a, b, r], i) =>
        <circle key={i} cx={a} cy={b} r={r} fill={i % 2 ? '#3f9e46' : '#2f8a3a'} stroke={KC.ink} strokeWidth={6} />)}
      {[[-40, -300], [30, -330], [60, -250], [-80, -250]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={14} ry={10} fill="#5cc067" opacity=".8" />)}
    </g>
  </g>;
}

// Raíces: lista de trazos desde un punto; las puntas llevan manto de hifas (p 0..1).
const RAIZ_ENC = [[[0, 0], [-20, 90], [-90, 170], [-150, 260]], [[0, 0], [10, 110], [60, 210], [40, 330]], [[0, 0], [30, 80], [130, 150], [210, 230]], [[-20, 90], [-10, 200], [-60, 300]], [[60, 210], [150, 300]]];
const RAIZ_PINO = [[[0, 0], [-30, 100], [-60, 220], [-40, 320]], [[0, 0], [40, 90], [120, 170], [140, 270]], [[-30, 100], [-120, 180]]];
function Raices({ x, y, s = 1, trazos, manto = 0, T = 0 }) {
  const d = (pts) => 'M ' + pts.map((q) => q.join(' ')).join(' L ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {trazos.map((pts, i) => <path key={i} d={d(pts)} stroke={AZ.raiz} strokeWidth={14 - (i > 2 ? 5 : 0)} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
    {trazos.map((pts, i) => { const [ex, ey] = pts[pts.length - 1], m = kclamp(manto * 1.6 - i * 0.12, 0, 1);
      return <g key={'m' + i}>
        <circle cx={ex} cy={ey} r={10} fill={AZ.raiz} stroke={KC.ink} strokeWidth={3} />
        {m > 0 && <circle cx={ex} cy={ey} r={10 + 9 * m} fill="none" stroke={AZ.manto} strokeWidth={8 * m} opacity=".95" style={{ filter:`drop-shadow(0 0 ${8 * m}px ${AZ.manto})` }} />}
      </g>; })}
  </g>;
}
// Puntas de raíz en coordenadas de pantalla (para dibujar hifas que las unen al hongo).
const puntas = (x, y, s, trazos) => trazos.map((pts) => { const [a, b] = pts[pts.length - 1]; return [x + a * s, y + b * s]; });

// Hifa ondulada entre dos puntos, que crece (p 0..1).
function Hifa({ x1, y1, x2, y2, p = 1, color = AZ.manto, ancho = 4, seed = 1 }) {
  if (p <= 0) return null;
  const ex = klerp(x1, x2, p), ey = klerp(y1, y2, p), mx = (x1 + ex) / 2 + Math.sin(seed * 2.3) * 40, my = (y1 + ey) / 2 + Math.cos(seed * 1.7) * 30;
  return <path d={`M ${x1} ${y1} Q ${mx} ${my} ${ex} ${ey}`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" opacity=".9" />;
}

// Partícula que viaja por una polilínea (u 0..1).
function enRuta(pts, u) {
  const segs = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); tot += l; }
  let d = kclamp(u, 0, 1) * tot;
  for (let i = 0; i < segs.length; i++) { if (d <= segs[i]) { const k = d / segs[i]; return [klerp(pts[i][0], pts[i + 1][0], k), klerp(pts[i][1], pts[i + 1][1], k)]; } d -= segs[i]; }
  return pts[pts.length - 1];
}
function Azucar({ x, y, s = 1 }) {
  const hx = Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(16 * Math.cos(a)).toFixed(1)} ${(16 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <path d={hx} transform={`translate(${x} ${y}) scale(${s})`} fill={AZ.oro} stroke={KC.ink} strokeWidth={4} />;
}
function Nutriente({ x, y, letra, color }) {
  return <g transform={`translate(${x} ${y})`}><circle r={18} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text y={9} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>{letra}</text></g>;
}

// Hebra de ADN horizontal que se "lee".
function ADNLectura({ T, x, y, w = 800, amp = 46, lectura = 1 }) {
  const N = 54, pts = (f) => Array.from({ length: N + 1 }, (_, i) => { const u = i / N; return [x + u * w, y + Math.sin(u * Math.PI * 6 - T * 2.5 + f) * amp]; });
  const a = pts(0), b = pts(Math.PI), d = (q) => 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  const BASES = [KC.yellow, KC.pink, '#ffffff', KC.mint];
  return <g>
    {a.map((q, i) => i % 3 === 0 ? <line key={i} x1={q[0]} y1={q[1]} x2={b[i][0]} y2={b[i][1]} stroke={BASES[(i / 3) % 4]} strokeWidth={7} opacity={i / N <= lectura ? 1 : 0.3} /> : null)}
    <path d={d(a)} stroke={KC.ink} strokeWidth={10} fill="none" /><path d={d(b)} stroke="#1d3f86" strokeWidth={10} fill="none" />
    {lectura < 1 && <rect x={x + lectura * w - 6} y={y - amp - 24} width={12} height={amp * 2 + 48} rx={6} fill="#fff" opacity=".9" />}
  </g>;
}

// Matraz que se llena de azul (p 0..1).
function Matraz({ T, x, y, s = 1, p = 0 }) {
  const nivel = klerp(0, 230, p);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="azMatraz"><path d="M -40 -330 L -40 -230 L -170 -10 Q -180 10 -160 14 L 160 14 Q 180 10 170 -10 L 40 -230 L 40 -330 Z" /></clipPath></defs>
    <g clipPath="url(#azMatraz)">
      <rect x={-200} y={14 - nivel} width={400} height={nivel + 10} fill="#2457d6" />
      <path d={`M -200 ${14 - nivel} Q -100 ${4 - nivel + Math.sin(T * 4) * 6} 0 ${14 - nivel} T 200 ${14 - nivel}`} fill="#4f8dff" />
      {p > 0.1 && [[-60, 0.0], [20, 0.4], [80, 0.8]].map(([bx, f], i) => { const u = ((T * 0.6 + f) % 1); return <circle key={i} cx={bx} cy={10 - u * nivel} r={8} fill="#cfe0ff" opacity=".7" />; })}
    </g>
    <path d="M -40 -330 L -40 -230 L -170 -10 Q -180 10 -160 14 L 160 14 Q 180 10 170 -10 L 40 -230 L 40 -330 Z" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-54} y={-350} width={108} height={26} rx={8} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -110 -60 L -60 -150" stroke="#ffffff" strokeWidth={10} opacity=".5" strokeLinecap="round" />
  </g>;
}

// Paleta de pigmentos naturales: muchos rojos, amarillos, verdes y cafés; casi ningún azul.
const PALETA = ['#d7263d', '#f46036', '#ff9f1c', '#ffd23f', '#a1c349', '#2e933c', '#7b4b2a', '#c96e3a', '#8e3b46', '#e2b04a', '#5b8c2a', '#2d5bff'];

function AzulShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Me: CUES.Mercado, No: CUES.Nombres, L: CUES.Leche, Pi: CUES.Pigmento, P: CUES.Pregunta,
    Mi: CUES.Micorriza, Tr: CUES.Trato, E: CUES.Estudio, X: CUES.Extra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const corte = kprog(T, K.G + 0.25, K.G + 0.6), leche = kprog(T, K.G + 0.5, K.G + 2.2);
  const verdeG = kprog(T, K.N, K.Me + 0.3) * 0.55;
  const tMapa = K.Me + 3.3;
  // micorriza: posiciones
  const ENC = { x: 560, y: 660, s: 0.95 }, PIN = { x: 210, y: 660 }, HONGO = { x: 380, y: 662 };
  const pE = puntas(ENC.x, ENC.y, ENC.s, RAIZ_ENC), pP = puntas(PIN.x, PIN.y, 0.9, RAIZ_PINO);
  const manto = kprog(T, K.Mi + 0.8, K.Mi + 3.0);
  const rutaAz = [[ENC.x, 420], [ENC.x, 660], [ENC.x - 19, 745], [ENC.x - 85, 822], [ENC.x - 142, 907]];
  const rutaN = [[HONGO.x + 40, 1120], [ENC.x - 142, 907], [ENC.x - 85, 822], [ENC.x - 19, 745], [ENC.x, 660], [ENC.x, 470]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y nombre: el hongo se corta y suelta leche azul */}
      <Escena T={T} a={K.G} b={K.Me} zoom={0.06} origen="35% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={20} y={1090} w={760} />
          <Escurre T={T} x={350 - 160 * 1.7} y0={1090 - 120 * 1.7} y1={1086} desde={K.G + 1.0} verde={verdeG} s={1.3} />
          <HongoAzul T={T} x={350} y={1090} s={1.7} corte={corte} leche={leche} verde={verdeG} />
          <Cuchillo x={90} y={760} p={kprog(T, K.G + 0.02, K.G + 0.75)} s={1.15} />
        </>)}
      </Escena>
      {/* 3 · mercado con lluvia → mapa */}
      <Escena T={T} a={K.Me} b={K.No} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, tMapa - 0.4, tMapa)}>
            <Nube x={240} y={420} s={0.9} />
            <path d="M 70 640 L 1010 640 L 960 700 L 120 700 Z" fill="#ff5fa2" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
            {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${120 + i * 105} 700 L ${172 + i * 105} 700 L ${172 + i * 105 - 26} 744 Z`} fill={i % 2 ? '#ffffff' : '#ff5fa2'} stroke={KC.ink} strokeWidth={5} />)}
            <rect x={110} y={700} width={22} height={420} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
            <rect x={950} y={700} width={22} height={420} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
            <rect x={90} y={1060} width={900} height={60} rx={10} fill="#8a5a2a" stroke={KC.ink} strokeWidth={7} />
            <Canasta T={T} x={290} y={1010} s={1.05} at={K.Me + 0.2} />
            <Canasta T={T} x={540} y={1010} s={1.05} at={K.Me + 0.4} />
            <Canasta T={T} x={790} y={1010} s={1.05} at={K.Me + 0.6} />
          </g>
          <g opacity={kprog(T, tMapa - 0.2, tMapa + 0.3)}>
            <MapaMexico x={-230} y={210} ancho={1700}>
              {[[-99.13, 19.43, 'CDMX', -1, -30], [-98.24, 19.32, 'Tlaxcala', 1, -40], [-98.2, 19.04, 'Puebla', 1, 34]].map(([lo, la, nom, lado, dy], i) => {
                const [px, py] = mxProy(lo, la), q = kEase.rebote(kprog(T, tMapa + 0.3 + i * 0.25, tMapa + 0.7 + i * 0.25));
                const tx = px + lado * 70, ty = py + dy * 0.7;
                return <g key={i} opacity={q > 0 ? 1 : 0}>
                  <line x1={px} y1={py} x2={tx - lado * 4} y2={ty - 5} stroke={KC.ink} strokeWidth={2.5} opacity={q} />
                  <circle cx={px} cy={py} r={9 * q} fill="#2f5fa8" stroke={KC.ink} strokeWidth={2.5} />
                  <text x={tx} y={ty} textAnchor={lado > 0 ? 'start' : 'end'} style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink} stroke="#fff6dc" strokeWidth={5} paintOrder="stroke" opacity={q}>{nom}</text>
                </g>; })}
            </MapaMexico>
            <Nube x={760} y={440} s={0.75} />
          </g>
          <Lluvia T={T} n={46} o={kprog(T, K.Me + 0.3, K.Me + 1.0)} />
        </>)}
      </Escena>
      {/* 4 · 44 nombres */}
      <Escena T={T} a={K.No} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {[['hongo azul', 250, 600, -6, 380], ['añil', 230, 740, 5, 220], ['zuin', 470, 760, -8, 220], ['oreja azul', 300, 900, 4, 380], ['aticonzol', 290, 1050, -3, 360]].map(([t, x, y, r, w], i) =>
            <Carton key={i} T={T} at={K.No + 0.2 + i * 0.5} x={x} y={y} rot={r} texto={t} ancho={w} />)}
        </>)}
      </Escena>
      {/* 5 · por dentro: hifas lactíferas */}
      <Escena T={T} a={K.L} b={K.Pi} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<CorteHifas T={T} a={K.L} x={100} y={680} w={800} h={370} />)}
      </Escena>
      {/* 6 · el pigmento: un azuleno; casi no hay azules naturales */}
      <Escena T={T} a={K.Pi} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Azuleno T={T} x={330} y={720} s={1.6} p={kprog(T, K.Pi + 0.2, K.Pi + 1.2)} />
          {PALETA.map((c, i) => { const q = kEase.rebote(kprog(T, K.Pi + 1.6 + i * 0.07, K.Pi + 1.9 + i * 0.07)); const azul = i === PALETA.length - 1;
            return <g key={i} transform={`translate(${110 + i * 75} 1060) scale(${q})`}>
              <rect x={-30} y={-30} width={60} height={60} rx={10} fill={c} stroke={azul ? '#ffffff' : KC.ink} strokeWidth={azul ? 7 : 5} style={azul ? { filter:'drop-shadow(0 0 14px #4f8dff)' } : null} />
            </g>; })}
        </>)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Mi} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><HongoAzul T={T} x={280} y={1110} s={1.25} rot={Math.sin(T * 4) * 3} /><Interrogacion T={T} x={290} y={760} tam={360} /></>)}
      </Escena>
      {/* 8–9 · micorriza y el trato */}
      <Escena T={T} a={K.Mi} b={K.E} zoom={0.03} origen="50% 40%">
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', left:0, right:0, top:660, bottom:0, background:`linear-gradient(${AZ.tierra}, ${AZ.tierra2})` }}></div>
        {fsvg(<>
          {Array.from({ length: 40 }, (_, i) => { const r = krng(i + 9); return <circle key={i} cx={r() * KW} cy={690 + r() * 560} r={3 + r() * 6} fill="#6b4a30" opacity=".6" />; })}
          <rect x={0} y={648} width={KW} height={18} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />
          <Raices x={PIN.x} y={PIN.y} s={0.9} trazos={RAIZ_PINO} manto={manto} />
          <Raices x={ENC.x} y={ENC.y} s={ENC.s} trazos={RAIZ_ENC} manto={manto} />
          {[...pE, ...pP].map(([tx, ty], i) => <Hifa key={i} x1={HONGO.x} y1={HONGO.y + 8} x2={tx} y2={ty} p={kprog(T, K.Mi + 0.4 + i * 0.12, K.Mi + 2.2 + i * 0.12)} seed={i + 1} />)}
          <Conifera x={PIN.x} y={PIN.y} s={0.62} T={T} seed={2} />
          <Encino x={ENC.x} y={ENC.y} s={0.95} T={T} />
          <HongoAzul T={T} x={HONGO.x} y={HONGO.y} s={0.42} />
          {/* acercamiento a una punta de raíz: el manto de hifas */}
          {(() => { const q = kprog(T, K.Mi + 2.6, K.Mi + 3.1, kEase.rebote) * (1 - kprog(T, K.Tr - 0.3, K.Tr)); if (q <= 0) return null;
            return <g transform={`translate(830 930) scale(${q})`}>
              <line x1={-210} y1={-20} x2={-120} y2={-10} stroke="#ffffff" strokeWidth={4} strokeDasharray="10 8" />
              <circle r={150} fill="#2a1a10" stroke="#ffffff" strokeWidth={8} />
              <path d="M -150 -40 L 40 -40 Q 110 -40 110 0 Q 110 40 40 40 L -150 40 Z" fill={AZ.raiz} stroke={KC.ink} strokeWidth={5} />
              <path d="M -150 -58 L 40 -58 Q 128 -58 128 0 Q 128 58 40 58 L -150 58" fill="none" stroke={AZ.manto} strokeWidth={18} />
              {Array.from({ length: 8 }, (_, i) => <line key={i} x1={-130 + i * 22} y1={-40} x2={-130 + i * 22} y2={40} stroke={AZ.manto} strokeWidth={3} opacity=".7" />)}
            </g>; })()}
          {/* el trato: azúcares bajan, N y P suben */}
          {T > K.Tr - 0.2 && Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Tr) * 0.32 + i / 6) % 1; const [px, py] = enRuta(rutaAz, u);
            return <g key={i} opacity={kprog(T, K.Tr - 0.2, K.Tr + 0.4)}><Azucar x={px} y={py} /></g>; })}
          {T > K.Tr + 1.2 && Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Tr - 1.2) * 0.3 + i / 6) % 1; const [px, py] = enRuta(rutaN, u);
            return <g key={i} opacity={kprog(T, K.Tr + 1.2, K.Tr + 1.8)}><Nutriente x={px + 26} y={py} letra={i % 2 ? 'P' : 'N'} color={i % 2 ? '#ff9f1c' : '#a1e36b'} /></g>; })}
        </>)}
      </Escena>
      {/* 10 · el estudio de 2012: ADN de raíces en Veracruz */}
      <Escena T={T} a={K.E} b={K.X} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <ADNLectura T={T} x={140} y={860} w={800} lectura={kprog(T, K.E + 1.6, K.E + 4.2)} />
          <Raices x={540} y={950} s={1.0} trazos={[[[-300, 0], [-120, 20], [40, 0], [220, 30], [320, 10]], [[-120, 20], [-90, 120]], [[40, 0], [70, 110]], [[220, 30], [240, 130]]]} manto={kprog(T, K.E + 0.8, K.E + 2.0)} />
        </>)}
      </Escena>
      {/* 11 · 2023: el pigmento hecho en el laboratorio */}
      <Escena T={T} a={K.X} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Matraz T={T} x={200} y={1100} s={1.0} p={kprog(T, K.X + 0.8, K.X + 3.2)} />
          <Azuleno T={T} x={180} y={690} s={0.7} p={kprog(T, K.X + 2.4, K.X + 3.2)} brillo={0.8} />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo hongo cortado, ahora con su árbol */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:960, bottom:0, background:`linear-gradient(${AZ.tierra}, ${AZ.tierra2})` }}></div>
        {fsvg(<>
          <Encino x={880} y={960} s={0.95} T={T} />
          <Raices x={880} y={960} s={0.45} trazos={RAIZ_ENC} manto={1} />
          {puntas(880, 960, 0.45, RAIZ_ENC).map(([tx, ty], i) => <Hifa key={i} x1={510} y1={968} x2={tx} y2={ty} p={kprog(T, K.C + 0.6 + i * 0.15, K.C + 1.8 + i * 0.15)} seed={i + 3} ancho={4} />)}
          <rect x={0} y={950} width={KW} height={16} fill="#3fbf4a" stroke={KC.ink} strokeWidth={5} />
          <HongoAzul T={T} x={510} y={958} s={1.35} corte={1} leche={1} verde={0.75} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.4} until={K.N - 0.2} texto="no es pintura" x={300} y={560} tam={44} borde={KC.red} />
      <Etq T={T} at={K.N + 0.2} until={K.Me - 0.3} x={60} y={520} texto="Lactarius indigo" it tam={46} color={KC.ink} />
      <Etq T={T} at={K.N + 0.9} until={K.Me - 0.3} x={60} y={590} texto="su nombre = «lechoso» (latín)" tam={32} color={KC.ink} />
      <Etq T={T} at={K.N + 1.5} until={K.Me - 0.3} x={150} y={700} texto="látex azul" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Me + 0.7} until={tMapa - 0.3} texto="comestible" x={290} y={520} tam={40} borde={KC.mint} />
      <Chip T={T} at={tMapa + 1.2} until={K.No - 0.3} texto="sale con las lluvias" x={540} y={470} tam={40} borde={KC.cyan} />
      <BarraEscala T={T} at={tMapa} until={K.No} texto="mapa esquemático" largo={0} />
      <NumeroGigante T={T} at={K.No + 1.2} until={K.L - 0.3} valor={44} dur={1.6} etiqueta="nombres locales" x={800} y={1000} tam={190} color={KC.yellow} />
      <Etq T={T} at={K.No + 2.0} until={K.L - 0.3} x={600} y={1150} texto="registrados en México" tam={28} color={KC.ink} />
      <Chip T={T} at={K.L + 0.1} until={K.Pi - 0.3} texto="POR DENTRO · LA LECHE" x={420} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.L + 1.3} until={K.Pi - 0.3} x={60} y={610} texto="hifas lactíferas: llevan el látex" tam={30} color="#9fc0ff" />
      <Etq T={T} at={K.L + 2.9} until={K.Pi - 0.3} x={560} y={1100} texto="con el aire: verde" tam={30} color="#7fe0a0" />
      <Chip T={T} at={K.Pi + 0.5} until={K.P - 0.3} texto="azuleno" x={330} y={520} tam={46} borde="#4f8dff" />
      <Etq T={T} at={K.Pi + 1.0} until={K.P - 0.3} x={60} y={900} texto="anillo de 7 + anillo de 5" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Pi + 2.2} until={K.P - 0.3} x={60} y={975} texto="pigmentos azules naturales: escasos" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Mi + 0.3} until={K.Tr - 0.3} x={226} y={700} texto="pino" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Mi + 0.5} until={K.Tr - 0.3} x={576} y={700} texto="encino" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Mi + 2.9} until={K.Tr - 0.3} x={600} y={1110} texto="ectomicorriza" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Tr + 0.2} until={K.E - 0.3} texto="árbol → hongo: azúcares" x={330} y={760} tam={32} borde={AZ.oro} />
      <Chip T={T} at={K.Tr + 1.5} until={K.E - 0.3} texto="hongo → árbol: nitrógeno y fósforo" x={480} y={1090} tam={32} borde="#a1e36b" />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.X - 0.3} anio="2012" quien="bosque de niebla, Veracruz" revista="Mycologia, 2012 · ADN de raíces" x={380} y={560} />
      <Etq T={T} at={K.E + 1.8} until={K.X - 0.3} x={60} y={790} texto="leyendo ADN…" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 2.6} until={K.X - 0.3} x={60} y={1115} texto="raíz de encino" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 3.2} until={K.X - 0.3} x={470} y={1115} texto="+ Lactarius indigo" it tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.X + 0.2} until={K.C - 0.3} anio="2023" quien="U. de Tohoku, Japón" revista="J. Agric. Food Chem., 2023" x={400} y={470} />
      <Etq T={T} at={K.X + 1.4} until={K.C - 0.3} x={380} y={900} texto="síntesis total: por primera vez" tam={26} color={KC.ink} />
      <Chip T={T} at={K.X + 2.6} until={K.C - 0.3} texto="candidato a colorante azul natural" x={640} y={770} tam={30} borde="#2457d6" />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="socio de los árboles" x={640} y={420} tam={38} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Me} texto="5 cm" largo={295} />
      <BarraEscala T={T} at={K.Me} until={tMapa} texto="1 m" largo={190} />
      <BarraEscala T={T} at={K.L} until={K.Pi} texto="≈ 10 µm (esquemático)" largo={56} />
      <BarraEscala T={T} at={K.Pi} until={K.P} texto="molécula esquemática" largo={0} />
      <BarraEscala T={T} at={K.P} until={K.Mi} texto="5 cm" largo={210} />
      <BarraEscala T={T} at={K.Mi} until={K.E} texto="corte esquemático" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.X} texto="1 cm (raíz)" largo={120} />
      <BarraEscala T={T} at={K.X} until={K.C} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={235} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No está pintado: suelta *leche azul.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Me - 0.1} texto="_Lactarius_ quiere decir *lechoso.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.No - 0.1} texto="En mercados de *Tlaxcala, Puebla y CDMX.*" />
      <Subtitulo T={T} idx={3} at={K.No + 0.1} until={K.L - 0.1} texto="*44 nombres* registrados." />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.Pi - 0.1} texto="Con el aire, la leche se pone *verde.*" />
      <Subtitulo T={T} idx={5} at={K.Pi + 0.1} until={K.P - 0.1} texto="Un azuleno: los azules naturales *son escasos.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Mi - 0.1} texto="¿Qué hace *en el bosque?*" />
      <Subtitulo T={T} idx={7} at={K.Mi + 0.1} until={K.Tr - 0.1} texto="Envuelve las raíces de *pinos y encinos.*" />
      <Subtitulo T={T} idx={8} at={K.Tr + 0.1} until={K.E - 0.1} texto="Azúcares por *nitrógeno y fósforo.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.X - 0.1} texto="2012: su ADN, en *raíces de encino.*" />
      <Subtitulo T={T} idx={10} at={K.X + 0.1} until={K.C - 0.1} texto="2023: su azul, *hecho en laboratorio.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="La leche de un *socio de los árboles.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Me + 0.4, tMapa - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.No + 0.3, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pi + 1.6, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Mi + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tr + 0.3, K.E - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.E + 1.5, K.X - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.X + 0.5, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="70" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AzulApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AzulShot /></CompositionStage></div>;
}
window.AzulApp = AzulApp;
