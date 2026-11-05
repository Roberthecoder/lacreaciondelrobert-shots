// Shot Fungi Mati #147 · Esas líneas negras no son vetas: son fronteras entre hongos — NARRADO (N1 Por dentro, gancho 1 "esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const ES = { maple:'#ecd6a8', maple2:'#dcbf86', veta:'#c4a068', linea:'#120c08', blanco:'#fbf5e6', verde:'#1f9e94', verde2:'#46c7b8',
  celda:'#2a1d13', celda2:'#3d2b1c', melan:'#070403', tram1:'#5a3b26', tram2:'#7f8fa6', tram3:'#c9b28a', xyl:'#191513' };
const TERR = [KC.pink, KC.cyan, KC.gold2, KC.mint, KC.lilac, KC.orange, '#8fb6ff', KC.coral, KC.leaf, KC.yellow, KC.magenta];

// ---------- la tabla: territorios de Voronoi (cada hongo, su territorio) ----------
const TW = 900, TH = 590;
const SEM = [[120, 110], [340, 70], [570, 150], [800, 90], [200, 330], [440, 310], [700, 340], [110, 520], [380, 520], [640, 530], [860, 470]];
function recorta(poly, a, b) { // conserva el lado de a en la mediatriz a-b
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = b[0] - a[0], ny = b[1] - a[1];
  const f = (p) => (p[0] - mx) * nx + (p[1] - my) * ny; const out = [];
  for (let i = 0; i < poly.length; i++) { const P = poly[i], Q = poly[(i + 1) % poly.length], fp = f(P), fq = f(Q);
    if (fp <= 0) out.push(P); if ((fp < 0) !== (fq < 0)) { const t = fp / (fp - fq); out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]); } }
  return out;
}
const ruido = (x, y) => [7 * Math.sin(0.045 * y + 0.021 * x) + 3 * Math.sin(0.13 * y - 0.05 * x + 1.3), 7 * Math.sin(0.04 * x - 0.027 * y + 0.6) + 3 * Math.sin(0.11 * x + 0.07 * y)];
const enBorde = (p) => p[0] < 0.5 || p[1] < 0.5 || p[0] > TW - 0.5 || p[1] > TH - 0.5;
const CELDAS = SEM.map((s, i) => {
  let poly = [[0, 0], [TW, 0], [TW, TH], [0, TH]];
  SEM.forEach((o, j) => { if (j !== i) poly = recorta(poly, s, o); });
  const c = poly.reduce((a, p) => [a[0] + p[0] / poly.length, a[1] + p[1] / poly.length], [0, 0]);
  // contorno ondulado (relleno) y bordes internos (líneas de zona), metidos 7 px hacia su propio centro
  const mete = (p, k = 7) => { const d = Math.hypot(c[0] - p[0], c[1] - p[1]) || 1; const n = ruido(p[0], p[1]); return [p[0] + n[0] + (c[0] - p[0]) / d * k, p[1] + n[1] + (c[1] - p[1]) / d * k]; };
  const sub = (P, Q, k) => { const L = Math.hypot(Q[0] - P[0], Q[1] - P[1]), n = Math.max(2, Math.ceil(L / 12)); return Array.from({ length: n + 1 }, (_, t) => mete([P[0] + (Q[0] - P[0]) * t / n, P[1] + (Q[1] - P[1]) * t / n], k)); };
  const lados = [], todo = [];
  for (let e = 0; e < poly.length; e++) { const P = poly[e], Q = poly[(e + 1) % poly.length]; const pts = sub(P, Q, 7); todo.push(...pts);
    if (!(enBorde(P) && enBorde(Q) && (Math.abs(P[0] - Q[0]) < 1 || Math.abs(P[1] - Q[1]) < 1))) lados.push(pts); }
  const d = (q) => 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  return { c, relleno: d(todo) + ' Z', lados: lados.map(d), ancho: 4 + (i % 3) };
});
const BLANCAS = [2, 7], VERDE = 5;
// Tabla en (x, y), escala s. lineas 0..1 (se dibujan), relleno 0..1 (territorios de color), blanco 0..1, verde 0..1, id = clip único.
function Tabla({ T, x, y, s = 1, lineas = 1, relleno = 0, blanco = 0, verde = 0, id = 'tb', rx = 26, borde = true, foco = -1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><rect x={0} y={0} width={TW} height={TH} rx={rx} /></clipPath>
      <radialGradient id={id + 'v'} cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor={ES.verde2} /><stop offset="100%" stopColor={ES.verde} /></radialGradient></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={0} y={0} width={TW} height={TH} fill={ES.maple} />
      {Array.from({ length: 14 }, (_, k) => <path key={k} d={`M -10 ${k * 44 + 12} C 250 ${k * 44 + 12 + 14 * Math.sin(k)} 600 ${k * 44 + 4 - 12 * Math.cos(k * 1.7)} ${TW + 10} ${k * 44 + 16}`} stroke={ES.veta} strokeWidth={k % 3 ? 2 : 4} fill="none" opacity=".55" />)}
      {CELDAS.map((cl, i) => { const b = BLANCAS.includes(i) ? blanco : 0, v = i === VERDE ? verde : 0;
        const r = relleno > 0 ? kprog(relleno, i / 13, i / 13 + 0.25) : 0;
        return <g key={i}>
          {b > 0 && <path d={cl.relleno} fill={ES.blanco} opacity={0.92 * b} />}
          {v > 0 && <path d={cl.relleno} fill={`url(#${id}v)`} opacity={0.9 * v} />}
          {r > 0 && <path d={cl.relleno} fill={TERR[i]} opacity={0.42 * r * (foco >= 0 && foco !== i ? 0.4 : 1)} />}
        </g>; })}
      {CELDAS.map((cl, i) => cl.lados.map((dd, j) => { const p = kclamp(lineas * 1.25 - (i * 0.05 + j * 0.02), 0, 1); return p > 0 ?
        <path key={i + '-' + j} d={dd} stroke={ES.linea} strokeWidth={cl.ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - p} /> : null; }))}
    </g>
    {borde && <rect x={0} y={0} width={TW} height={TH} rx={rx} fill="none" stroke={KC.ink} strokeWidth={9} />}
  </g>;
}

// Cuenco torneado de perfil con la misma madera (clip). (x, y) = centro de la boca.
function Cuenco({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="cuencoC"><path d="M -300 0 Q -290 230 -90 260 L 90 260 Q 290 230 300 0 Z" /></clipPath></defs>
    <g clipPath="url(#cuencoC)"><Tabla T={T} x={-450} y={-160} s={1} id="tbCu" borde={false} rx={0} /><rect x={-300} y={0} width={600} height={300} fill="url(#cuSom)" /></g>
    <defs><linearGradient id="cuSom" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#000" stopOpacity=".35" /><stop offset="35%" stopColor="#000" stopOpacity="0" /><stop offset="70%" stopColor="#fff" stopOpacity=".12" /><stop offset="100%" stopColor="#000" stopOpacity=".4" /></linearGradient></defs>
    <path d="M -300 0 Q -290 230 -90 260 L 90 260 Q 290 230 300 0 Z" fill="none" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={0} rx={300} ry={46} fill="#b8925a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={6} rx={262} ry={34} fill="#8a6a3e" />
    <rect x={-110} y={258} width={220} height={22} rx={8} fill="#a6824c" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Etiqueta de precio que se balancea.
function Precio({ T, x, y, n = 3 }) {
  return <g transform={`translate(${x} ${y}) rotate(${-8 + Math.sin(T * 3) * 6})`}>
    <line x1={0} y1={-90} x2={0} y2={-30} stroke={KC.ink} strokeWidth={4} />
    <path d="M -70 -30 L 70 -30 L 70 60 L 0 100 L -70 60 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={42} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill="#118a3a">{'$'.repeat(n)}</text>
  </g>;
}
// Tronco caído visto desde el corte (anillos). puntos = esporas [[x, y, color, at]].
function CorteTronco({ T, x, y, r = 320, esporas = [] }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r} 0 L ${-r + 60} ${r * 0.35} L ${r + 260} ${r * 0.35} L ${r + 260} ${-r * 0.35} L ${-r + 60} ${-r * 0.35} Z`} fill="none" />
    <circle r={r + 22} fill="#6b4022" stroke={KC.ink} strokeWidth={9} />
    <circle r={r} fill={ES.maple} stroke="#8a5a2c" strokeWidth={6} />
    {[0.86, 0.72, 0.58, 0.44, 0.3, 0.16].map((k, i) => <circle key={i} r={r * k + Math.sin(i) * 4} fill="none" stroke={ES.veta} strokeWidth={4} opacity=".8" />)}
    {[[-0.3, -0.5], [0.4, 0.2], [-0.1, 0.6]].map(([a, b], i) => <line key={i} x1={0} y1={0} x2={r * a * 1.8} y2={r * b * 1.4} stroke="#b08a50" strokeWidth={3} opacity=".6" />)}
    {esporas.map(([ex, ey, col, at], i) => { const c = kprog(T, at, at + 0.5, kEase.sale); if (c <= 0) return null;
      const yy = klerp(ey - 500, ey, c), g = kprog(T, at + 0.5, at + 1.6);
      return <g key={i}><circle cx={ex} cy={ey} r={10 + 70 * g} fill={col} opacity={0.35 * g} />
        <ellipse cx={ex} cy={yy} rx={13} ry={8} fill={col} stroke={KC.ink} strokeWidth={4} transform={`rotate(${30 + i * 40} ${ex} ${yy})`} /></g>; })}
  </g>;
}
// Hifas que crecen desde (ox, oy) sin cruzar la frontera lim(y) (lado = -1 izq, +1 der).
const LIM = (yy) => 540 + 26 * Math.sin(yy * 0.012 + 0.5);
function genHifas(seed, ox, oy, lado) {
  const r = krng(seed), segs = [], contactos = []; let tips = [];
  for (let k = 0; k < 6; k++) tips.push({ x: ox, y: oy, a: (lado < 0 ? 0 : Math.PI) + (k - 2.5) * 0.55 });
  const S = 34;
  for (let s = 0; s < S; s++) { const nuevos = [];
    for (const t of tips) { t.a += (r() - 0.5) * 0.55; const nx = t.x + 21 * Math.cos(t.a), ny = t.y + 21 * Math.sin(t.a);
      if (ny < 600 || ny > 1170 || nx < 50 || nx > 1030) continue;
      if (lado * (nx - (LIM(ny) + lado * 16)) < 0) { contactos.push([t.x, t.y, s]); continue; }
      segs.push({ x1: t.x, y1: t.y, x2: nx, y2: ny, s }); t.x = nx; t.y = ny; nuevos.push(t);
      if (r() < 0.13 && nuevos.length < 34) nuevos.push({ x: nx, y: ny, a: t.a + (r() < 0.5 ? 0.8 : -0.8) }); }
    tips = nuevos.slice(0, 34); }
  return { segs, contactos, S };
}
const HROSA = genHifas(11, 200, 880, -1), HCIAN = genHifas(23, 880, 900, 1);
function Hifas({ H, g, color, oscuro = 0 }) {
  const paso = g * H.S;
  return <g>{H.segs.map((sg, i) => { if (paso < sg.s) return null; const u = kclamp(paso - sg.s, 0, 1);
    const cerca = Math.abs(sg.x2 - LIM(sg.y2)) < 70 ? oscuro : 0;
    return <line key={i} x1={sg.x1} y1={sg.y1} x2={klerp(sg.x1, sg.x2, u)} y2={klerp(sg.y1, sg.y2, u)} stroke={mixHex(color, '#120a06', cerca)} strokeWidth={4 + cerca * 4} strokeLinecap="round" />; })}
    {H.segs.filter((sg) => Math.floor(paso) === sg.s).map((sg, i) => <circle key={'p' + i} cx={sg.x2} cy={sg.y2} r={6} fill="#fff" opacity=".85" />)}
  </g>;
}
// Células de madera (fibras) vistas de lado, al microscopio.
function CelulasMadera({ y0 = 580, alto = 610, tinte }) {
  return <g>{Array.from({ length: 15 }, (_, i) => <g key={i}>
    <rect x={18 + i * 72} y={y0 + (i % 2) * 24} width={62} height={alto} rx={30} fill={tinte || ES.celda} stroke={ES.celda2} strokeWidth={6} />
    {[0.2, 0.45, 0.7].map((k, j) => <ellipse key={j} cx={49 + i * 72} cy={y0 + alto * k + (i % 3) * 18} rx={7} ry={11} fill="none" stroke={ES.celda2} strokeWidth={3} />)}
  </g>)}</g>;
}
// Muro de melanina en la frontera (dos franjas, una de cada colonia). m 0..1.
function Muro({ m }) {
  if (m <= 0) return null;
  const pts = (dx) => Array.from({ length: 31 }, (_, i) => { const yy = 600 + i * 19; return [LIM(yy) + dx + 4 * Math.sin(i * 1.7), yy]; });
  const d = (q) => 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  return <g>
    {[-16, 16].map((dx) => <path key={dx} d={d(pts(dx))} stroke={ES.melan} strokeWidth={22 * m} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - kclamp(m * 1.3, 0, 1)} />)}
    {Array.from({ length: 26 }, (_, i) => { const yy = 612 + i * 22, dx = (i % 2 ? 16 : -16); const k = kclamp(m * 1.6 - i / 40, 0, 1);
      return <circle key={i} cx={LIM(yy) + dx + 9 * Math.sin(i)} cy={yy} r={11 * k} fill="#1c120b" stroke="#000" strokeWidth={3} />; })}
  </g>;
}
// Trametes versicolor ("cola de pavo") visto desde arriba: abanicos delgados con bandas concéntricas de colores y orilla clara,
// pegados por la base a la orilla de la madera en (x, y); se abren hacia arriba. crece 0..1.
function Trametes({ x, y, s = 1, crece = 1 }) {
  const banda = ['#f3ead6', ES.tram1, ES.tram3, ES.tram2, '#4a3c33', '#a8b4c2', ES.tram1, '#d8cbb0'];
  const abanico = (dx, R0, rot, i) => { const c = kEase.sale(kclamp(crece * 1.5 - i * 0.2, 0, 1)); if (c <= 0) return null;
    const ond = (R) => Array.from({ length: 25 }, (_, k) => { const a = Math.PI + (k / 24) * Math.PI, rr = R * (1 + 0.04 * Math.sin(k * 1.9)); return `${k ? 'L' : 'M'} ${(rr * Math.cos(a)).toFixed(1)} ${(rr * 0.8 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
    return <g key={i} transform={`translate(${dx} 0) rotate(${rot}) scale(${c})`}>
      {banda.map((col, k) => <path key={k} d={ond(R0 * (1 - k * 0.11))} fill={col} stroke={k === 0 ? KC.ink : 'none'} strokeWidth={6} />)}
      {Array.from({ length: 9 }, (_, k) => { const a = Math.PI + (k + 0.5) / 9 * Math.PI; return <line key={'r' + k} x1={0} y1={0} x2={R0 * 0.85 * Math.cos(a)} y2={R0 * 0.68 * Math.sin(a)} stroke="#2e231b" strokeWidth={2} opacity=".25" />; })}
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{[[0, 120, -14], [170, 150, 0], [330, 110, 14]].map(([a, R, r], i) => abanico(a, R, r, i))}</g>;
}
// Chlorociboria: copitas verde-azuladas de pie corto sobre una ramita. crece 0..1.
function Chlorociboria({ T, x, y, s = 1, crece = 1 }) {
  const copa = (cx, k, i) => { const c = kEase.rebote(kclamp(crece * 1.6 - i * 0.12, 0, 1)); if (c <= 0) return null;
    return <g key={i} transform={`translate(${cx} 0) scale(${k * c}) rotate(${Math.sin(T * 1.5 + i) * 3})`}>
      <path d="M -8 0 L -6 -34 L 6 -34 L 8 0 Z" fill="#1a8a80" stroke={KC.ink} strokeWidth={4} />
      <path d="M -46 -50 Q 0 -10 46 -50 Q 40 -36 0 -30 Q -40 -36 -46 -50 Z" fill="#127a71" stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={0} cy={-50} rx={46} ry={12} fill={ES.verde2} stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={-12} cy={-52} rx={16} ry={4} fill="#c8fff5" opacity=".6" />
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 20 Q 200 -10 520 24 L 520 64 Q 200 34 -40 60 Z" fill="#6f4a2c" stroke={KC.ink} strokeWidth={7} />
    <path d="M 60 40 Q 200 30 380 44" stroke={ES.verde} strokeWidth={14} fill="none" opacity={0.8 * kclamp(crece, 0, 1)} />
    <g transform="translate(0 22)">{[[40, 0.9], [120, 1.15], [205, 0.75], [290, 1.0], [370, 0.8], [450, 1.1]].map(([cx, k], i) => copa(cx, k, i))}</g>
  </g>;
}
// Panel de taracea (marquetería) esquemático: armario abierto en perspectiva con piezas de madera de colores, algunas verdes.
function Taracea({ T, x, y, s = 1, verde = 1 }) {
  const V = mixHex(ES.maple2, ES.verde, verde);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={0} width={520} height={560} rx={8} fill="#5a3418" stroke={KC.ink} strokeWidth={9} />
    <rect x={30} y={30} width={460} height={500} fill="#c9a26a" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M ${30} ${110 + i * 95} L 490 ${110 + i * 95}`} stroke="#7a5228" strokeWidth={8} />)}
    {[[60, 60, 120, 40, 0], [220, 70, 60, 32, 1], [320, 52, 140, 50, 0], [70, 150, 90, 50, 1], [190, 150, 150, 50, 0], [370, 140, 90, 60, 1], [60, 245, 200, 50, 0], [300, 240, 160, 58, 1], [70, 340, 120, 52, 1], [230, 335, 230, 56, 0], [60, 432, 160, 56, 0], [260, 425, 90, 62, 1], [380, 440, 90, 48, 0]].map(([a, b, w, h, g], i) =>
      <g key={i}><rect x={a} y={b} width={w} height={h} fill={g ? V : (i % 2 ? '#e7cf9c' : '#8a5a2c')} stroke={KC.ink} strokeWidth={4} />
        <path d={`M ${a} ${b} L ${a + 18} ${b - 14} L ${a + w + 18} ${b - 14} L ${a + w} ${b} Z`} fill={g ? mixHex(V, '#ffffff', 0.25) : '#f0dcb0'} stroke={KC.ink} strokeWidth={3} /></g>)}
    <path d="M 490 30 L 560 0 L 560 590 L 490 530 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    {[[500, 80], [500, 200], [500, 320], [500, 440]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} l 44 -16 l 0 60 l -44 14 Z`} fill={i % 2 ? V : '#e7cf9c'} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Interior de la lupa: células de madera verdes con hifas dentro.
function InteriorVerde(T, r) {
  const n = 7, w = (2 * r) / n;
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#06231f" />
    {Array.from({ length: n }, (_, i) => <rect key={i} x={i * w + 4} y={-20 + (i % 2) * 30} width={w - 8} height={2 * r + 40} rx={w / 2 - 4} fill="#1d7d74" stroke="#0a3d38" strokeWidth={5} />)}
    {Array.from({ length: 9 }, (_, i) => { const xx = (i * 0.11 + 0.05) * 2 * r, ph = i * 1.3; const L = kprog(T, 0, 1e9);
      return <path key={i} d={`M ${xx} -10 C ${xx + 30 * Math.sin(ph)} ${r * 0.6} ${xx - 30 * Math.cos(ph)} ${r * 1.3} ${xx + 20 * Math.sin(ph * 2)} ${2 * r + 10}`} stroke="#eafff9" strokeWidth={4} fill="none" opacity={0.85 * L} />; })}
    {Array.from({ length: 14 }, (_, i) => <circle key={'g' + i} cx={((i * 37) % 13) / 13 * 2 * r} cy={((i * 53) % 17) / 17 * 2 * r} r={5} fill={ES.verde2} />)}
  </svg>;
}
// Xylaria polymorpha (dedos de muerto): mazos negros, rugosos, que salen de un tocón. crece 0..1.
function Xylaria({ T, x, y, s = 1, crece = 1 }) {
  const dedo = (dx, h, rot, i) => { const c = kEase.sale(kclamp(crece * 1.5 - i * 0.1, 0, 1)); if (c <= 0) return null; const H = h * c;
    return <g key={i} transform={`translate(${dx} 0) rotate(${rot + Math.sin(T + i) * 1.5})`}>
      <path d={`M -14 0 Q -18 ${-H * 0.3} -30 ${-H * 0.55} Q -40 ${-H * 0.95} 0 ${-H} Q 40 ${-H * 0.95} 30 ${-H * 0.55} Q 18 ${-H * 0.3} 14 0 Z`} fill={ES.xyl} stroke="#000" strokeWidth={6} />
      {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={(k % 2 ? 1 : -1) * (6 + (k * 7) % 14)} cy={-H * (0.35 + k * 0.075)} r={3.5} fill="#4a423c" />)}
      <path d={`M -10 ${-H * 0.5} Q -16 ${-H * 0.8} -4 ${-H * 0.94}`} stroke="#5d5650" strokeWidth={5} fill="none" opacity=".7" />
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 0 L -210 -70 Q 0 -110 210 -70 L 230 0 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-80} rx={212} ry={36} fill={ES.maple2} stroke={KC.ink} strokeWidth={7} />
    <g transform="translate(0 -84)">{[[-120, 190, -10], [-50, 260, -3], [20, 220, 5], [95, 280, 9], [160, 170, 16]].map(([a, h, r], i) => dedo(a, h, r, i))}</g>
  </g>;
}
// Territorio de un solo hongo que se pone líneas a sí mismo.
function TerritorioSolo({ T, x, y, p = 1 }) {
  const curvas = ['M 20 90 C 120 60 220 140 330 100 S 460 60 470 80', 'M 40 200 C 150 170 210 250 300 220 S 420 190 470 230', 'M 160 10 C 140 90 200 150 170 280'];
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="terrS"><rect width={490} height={300} rx={22} /></clipPath></defs>
    <g clipPath="url(#terrS)"><rect width={490} height={300} fill={ES.maple} /><rect width={490} height={300} fill={KC.pink} opacity=".38" />
      {curvas.map((d, i) => <path key={i} d={d} stroke={ES.linea} strokeWidth={6} fill="none" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - kclamp(p * 1.4 - i * 0.2, 0, 1)} />)}
    </g>
    <rect width={490} height={300} rx={22} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
const ESPORAS3 = [[-150, -90, KC.pink], [170, -40, KC.cyan], [-20, 170, KC.gold2]];
const ESPORAS_MUCHAS = [[-150, -90], [170, -40], [-20, 170], [60, -200], [-200, 60], [200, 130], [-90, 20], [100, 60], [-160, 190], [190, -170], [-40, -170], [10, -40]];

function EspalteadaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Valor, En: CUES.Entran, H: CUES.Hifas, Ch: CUES.Choque, M: CUES.Melanina, P: CUES.Pregunta, Ma: CUES.Mapa, B: CUES.Blanqueo, Ve: CUES.Verde, E: CUES.Estudio, X: CUES.Xylaria, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const TX = 126, TY = 590, TS = 0.92;   // la tabla (macro): mismo lugar en el gancho, el mapa y el cierre
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la tabla; las líneas negras se dibujan */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tabla T={T} x={TX} y={TY} s={TS} lineas={kprog(T, K.G, K.G + 1.9, kEase.sale)} id="tbG" />)}
      </Escena>
      {/* 1 · valor: cuenco torneado y precio */}
      <Escena T={T} a={K.V} b={K.En} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform={`translate(0 ${(1 - kprog(T, K.V - 0.3, K.V + 0.6, kEase.sale)) * 300})`}><Cuenco T={T} x={430} y={820} s={1.1} /></g>
          {T > K.V + 1.4 && <Precio T={T} x={860} y={820} n={1 + Math.min(2, Math.floor((T - K.V - 1.4) / 0.5))} />}
        </>)}
      </Escena>
      {/* 2 · entran varios hongos al mismo tronco (la cámara se acerca a la espora rosa) */}
      <Escena T={T} a={K.En} b={K.H} zoom={0.45} origen="37% 42%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<CorteTronco T={T} x={540} y={900} r={320} esporas={ESPORAS3.map(([a, b, c], i) => [a, b, c, K.En + 0.4 + i * 0.9])} />)}
      </Escena>
      {/* 3–5 · al microscopio: hifas, choque y muro de melanina (fondo oscuro) */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <CelulasMadera />
          <Hifas H={HROSA} g={kprog(T, K.H + 0.2, K.Ch + 0.6)} color={KC.pink} oscuro={kprog(T, K.M, K.M + 1.5)} />
          <Hifas H={HCIAN} g={kprog(T, K.H + 0.5, K.Ch + 0.8)} color={KC.cyan} oscuro={kprog(T, K.M, K.M + 1.5)} />
          {T > K.Ch + 0.3 && T < K.M + 0.6 && [...HROSA.contactos, ...HCIAN.contactos].slice(0, 16).map(([cx, cy], i) => { const f = 0.5 + 0.5 * Math.sin(T * 9 + i * 1.7);
            return <g key={i} opacity={1 - kprog(T, K.M, K.M + 0.6)}><circle cx={cx} cy={cy} r={10 + 10 * f} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={0.7 * f} /></g>; })}
          <Muro m={kprog(T, K.M + 0.1, K.M + 2.0, kEase.sale)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si hay muchos hongos? */}
      <Escena T={T} a={K.P} b={K.Ma} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform="translate(300 1000) scale(0.68)"><CorteTronco T={T} x={0} y={0} r={320} esporas={ESPORAS_MUCHAS.map(([a, b], i) => [a, b, TERR[i % TERR.length], K.P + 0.1 + i * 0.12])} /></g>
          <Interrogacion T={T} x={290} y={760} tam={300} />
        </>)}
      </Escena>
      {/* 7 · el mapa: cada territorio, un color */}
      <Escena T={T} a={K.Ma} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tabla T={T} x={TX} y={TY} s={TS} lineas={1} relleno={kprog(T, K.Ma + 0.2, K.Ma + 2.6)} id="tbM" />)}
      </Escena>
      {/* 8–9 · blanqueo (Trametes) y verde (Chlorociboria) sobre la misma tabla */}
      <Escena T={T} a={K.B} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Tabla T={T} x={TX} y={TY + 20} s={TS} lineas={1} relleno={1 - kprog(T, K.B, K.B + 0.8)} blanco={kprog(T, K.B + 1.6, K.B + 3.6)} verde={kprog(T, K.Ve + 0.8, K.Ve + 2.6)} id="tbB" />
          <g opacity={1 - kprog(T, K.Ve - 0.2, K.Ve + 0.3)}><Trametes x={TX + 110} y={TY + 26} s={1} crece={kprog(T, K.B + 0.2, K.B + 1.4)} /></g>
          <g opacity={kprog(T, K.Ve - 0.2, K.Ve + 0.3)}><Chlorociboria T={T} x={130} y={540} s={1} crece={kprog(T, K.Ve + 0.1, K.Ve + 1.2)} /></g>
        </>)}
      </Escena>
      {/* 10 · el estudio de 1992: taracea italiana + lupa */}
      <Escena T={T} a={K.E} b={K.X} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Taracea T={T} x={80} y={700} s={0.8} verde={1} />)}
      </Escena>
      {/* 11 · Xylaria polymorpha: fronteras consigo mismo */}
      <Escena T={T} a={K.X} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Xylaria T={T} x={330} y={1190} s={1} crece={kprog(T, K.X + 0.1, K.X + 1.6)} />
          <TerritorioSolo T={T} x={560} y={800} p={kprog(T, K.X + 2.6, K.X + 4.6)} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma tabla del inicio, ya leída */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tabla T={T} x={TX} y={TY} s={TS} lineas={1} relleno={0.5 * kprog(T, K.C + 0.4, K.C + 1.6)} blanco={1} verde={1} id="tbC" />)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.V - 0.3} texto="vetas" x={250} y={470} tam={52} />
      <Chip T={T} at={K.G + 1.9} until={K.V - 0.3} texto="fronteras entre hongos" x={420} y={555} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.4} until={K.V - 0.3} x={130} y={1160} texto="líneas de zona" tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 0.4} until={K.En - 0.3} texto="madera espalteada · spalting" x={370} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.V + 1.0} until={K.En - 0.3} x={120} y={1172} texto="pieza torneada" tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 1.6} until={K.En - 0.3} texto="se vende cara" x={860} y={1010} tam={32} borde="#118a3a" />
      <Etq T={T} at={K.En + 0.5} until={K.En + 3.0} x={120} y={500} texto="cada color = un hongo distinto" tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 0.1} until={K.P - 0.3} texto="AL MICROSCOPIO · MADERA" x={360} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.H + 1.0} until={K.Ch - 0.2} x={60} y={545} texto="hifas (hilos del hongo)" tam={30} color={KC.texto} />
      <Etq T={T} at={K.H + 1.6} until={K.Ch - 0.2} x={60} y={1160} texto="células de la madera" tam={28} color="#d9b98a" />
      <Chip T={T} at={K.Ch + 0.6} until={K.M - 0.2} texto="ninguna logra vencer" x={540} y={560} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.M + 0.6} until={K.P - 0.3} x={500} y={560} texto="melanina" lado="izq" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.M + 1.4} until={K.P - 0.3} x={500} y={1160} texto="línea de zona" lado="izq" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Ma + 1.0} until={K.B - 0.3} x={130} y={555} texto="cada color = el territorio de un hongo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ma + 1.8} until={K.B - 0.3} texto="cada línea negra = una frontera" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 1.0} until={K.Ve - 0.3} x={610} y={520} texto="Trametes versicolor" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 1.6} until={K.Ve - 0.3} texto="pudrición blanca" x={760} y={420} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 2.4} until={K.Ve - 0.3} x={610} y={572} texto="come lignina: más clara" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ve + 0.6} until={K.E - 0.3} x={130} y={420} texto="Chlorociboria" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ve + 1.6} until={K.E - 0.3} x={130} y={370} texto="xilindeína: pigmento" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.X - 0.3} anio="1992" quien="Blanchette y equipo" revista="Holzforschung, 1992" x={360} y={525} />
      <Chip T={T} at={K.E + 1.6} until={K.X - 0.3} texto="taracea · Italia, siglo XV" x={790} y={690} tam={30} borde={KC.ink} />
      <Lupa T={T} at={K.E + 3.0} until={K.X - 0.4} x={800} y={930} r={185} fx={384} fy={915} interior={InteriorVerde} tinte={KC.mint} etiqueta="AL MICROSCOPIO · HIFAS" />
      <Etq T={T} at={K.X + 0.6} until={K.C - 0.3} x={80} y={600} texto="Xylaria polymorpha" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.X + 1.2} until={K.C - 0.3} x={80} y={650} texto="«dedos de muerto»" tam={30} color={KC.ink} />
      <Chip T={T} at={K.X + 2.6} until={K.C - 0.3} texto="sin otro hongo" x={805} y={745} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.X + 3.2} until={K.C - 0.3} x={580} y={1135} texto="un solo hongo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou} x={340} y={545} texto="fronteras · blanqueo · verde" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="un mapa de una guerra de hongos" x={650} y={470} tam={30} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.V} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.V} until={K.En} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.En} until={K.H} texto="20 cm" largo={210} />
      <BarraEscala T={T} at={K.H} until={K.P} texto="100 µm (esquemático)" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.Ma} texto="20 cm" largo={140} />
      <BarraEscala T={T} at={K.Ma} until={K.Ve} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Ve} until={K.E} texto="5 mm (copitas)" largo={70} />
      <BarraEscala T={T} at={K.E} until={K.X} texto="panel esquemático" largo={0} />
      <BarraEscala T={T} at={K.X} until={K.C} texto="2 cm" largo={60} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No son vetas: son *fronteras entre hongos.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.En - 0.1} texto="Madera *espalteada:* se vende cara." />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.H - 0.1} texto="Varios hongos, *el mismo tronco.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Ch - 0.1} texto="Hifas que *se comen la madera.*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={K.M - 0.1} texto="Chocan: *ninguna logra vencer.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.P - 0.1} texto="Un muro de *melanina.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ma - 0.1} texto="¿Y si hay *muchos hongos?*" />
      <Subtitulo T={T} idx={7} at={K.Ma + 0.1} until={K.B - 0.1} texto="Más hongos, *más fronteras.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.Ve - 0.1} texto="_Trametes:_ *aclara la madera.*" />
      <Subtitulo T={T} idx={9} at={K.Ve + 0.1} until={K.E - 0.1} texto="_Chlorociboria:_ *verde azulado.*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.X - 0.1} texto="1992: el verde *traía hifas.*" />
      <Subtitulo T={T} idx={11} at={K.X + 0.1} until={K.C - 0.1} texto="_Xylaria:_ *líneas aunque esté solo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="El mapa de *una guerra de hongos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 0.8, K.En - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.6, K.Ch - 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.M + 0.3, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ma + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ve + 0.5, K.E - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.E + 3.0, K.X - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.X + 0.3, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="147" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EspalteadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EspalteadaShot /></CompositionStage></div>;
}
window.EspalteadaApp = EspalteadaApp;
