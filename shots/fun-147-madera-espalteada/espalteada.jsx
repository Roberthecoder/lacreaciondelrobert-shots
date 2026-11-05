// Shot Fungi Mati #147 · Esas líneas negras no son vetas: son fronteras entre hongos — NARRADO (N1 Por dentro, gancho 1 "esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const ES = { maple:'#ecd6a8', maple2:'#dcbf86', veta:'#c4a068', linea:'#120c08', blanco:'#fbf5e6',
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
const BLANCAS = [2, 7];
// Tabla en (x, y), escala s. lineas 0..1 (se dibujan), relleno 0..1 (territorios de color), blanco 0..1, id = clip único.
function Tabla({ T, x, y, s = 1, lineas = 1, relleno = 0, blanco = 0, id = 'tb', rx = 26, borde = true, foco = -1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><rect x={0} y={0} width={TW} height={TH} rx={rx} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={0} y={0} width={TW} height={TH} fill={ES.maple} />
      {Array.from({ length: 14 }, (_, k) => <path key={k} d={`M -10 ${k * 44 + 12} C 250 ${k * 44 + 12 + 14 * Math.sin(k)} 600 ${k * 44 + 4 - 12 * Math.cos(k * 1.7)} ${TW + 10} ${k * 44 + 16}`} stroke={ES.veta} strokeWidth={k % 3 ? 2 : 4} fill="none" opacity=".55" />)}
      {CELDAS.map((cl, i) => { const b = BLANCAS.includes(i) ? blanco : 0;
        const r = relleno > 0 ? kprog(relleno, i / 13, i / 13 + 0.25) : 0;
        return <g key={i}>
          {b > 0 && <path d={cl.relleno} fill={ES.blanco} opacity={0.92 * b} />}
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
// Cubito de madera en perspectiva (lado L px). lineas 0..1 (líneas de zona que aparecen), pudre 0..1 (huecos blancos y se encoge),
// moho = color de la pelusa del hongo (0 = sin pelusa).
function Cubito({ x, y, L = 90, lineas = 0, pudre = 0, moho, mohoP = 0, seed = 1 }) {
  const r = krng(seed), k = 1 - 0.18 * pudre, l = L * k, d = l * 0.38;
  const huecos = Array.from({ length: 7 }, () => [r() * 0.8 + 0.1, r() * 0.8 + 0.1, 0.08 + r() * 0.1]);
  const curvas = [`M 0 ${l * 0.35} C ${l * 0.3} ${l * 0.2} ${l * 0.6} ${l * 0.55} ${l} ${l * 0.4}`, `M ${l * 0.55} 0 C ${l * 0.45} ${l * 0.4} ${l * 0.75} ${l * 0.6} ${l * 0.6} ${l}`];
  return <g transform={`translate(${x - l / 2} ${y - l})`}>
    <path d={`M 0 0 L ${d} ${-d * 0.7} L ${l + d} ${-d * 0.7} L ${l} 0 Z`} fill={ES.maple2} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d={`M ${l} 0 L ${l + d} ${-d * 0.7} L ${l + d} ${l - d * 0.7} L ${l} ${l} Z`} fill={ES.veta} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <rect x={0} y={0} width={l} height={l} fill={ES.maple} stroke={KC.ink} strokeWidth={4} />
    {curvas.map((c, i) => <path key={i} d={c} stroke={ES.linea} strokeWidth={4} fill="none" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - kclamp(lineas * 1.4 - i * 0.35, 0, 1)} />)}
    {pudre > 0 && huecos.map(([a, b, rr], i) => <ellipse key={i} cx={a * l} cy={b * l} rx={rr * l * kclamp(pudre * 1.6 - i * 0.12, 0, 1)} ry={rr * l * 0.7 * kclamp(pudre * 1.6 - i * 0.12, 0, 1)} fill={ES.blanco} stroke="#b9a27a" strokeWidth={2} />)}
    {moho && mohoP > 0 && Array.from({ length: 9 }, (_, i) => { const xx = (i + 0.5) / 9 * l; return <path key={'m' + i} d={`M ${xx} ${l} q ${4 * Math.sin(i)} ${-12 * mohoP} ${(i % 2 ? 6 : -6)} ${-22 * mohoP}`} stroke={moho} strokeWidth={3} fill="none" opacity=".9" />; })}
  </g>;
}
// Repisa de laboratorio con frascos de vidrio: vermiculita abajo, 3 cubitos de 14 mm encima y la pelusa de UN solo hongo por frasco (monocultivo).
// Líneas pocas y solo en la superficie (Robinson et al. 2012: pigmento negro esporádico, en la superficie). semana 0..1.
const FRASCOS = [['Trametes', KC.pink], ['Xylaria', '#3a332e'], ['Inonotus', KC.orange], ['Arthrographis', KC.magenta]];
function Frascos({ T, x, y, at, semana = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={330} width={900} height={34} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
    {FRASCOS.map(([n, col], i) => { const e = kEase.rebote(kprog(T, at + i * 0.35, at + i * 0.35 + 0.45)); if (e <= 0) return null;
      const cx = 105 + i * 215;
      return <g key={i} transform={`translate(${cx} 330) scale(${e}) translate(${-cx} -330)`}>
        <rect x={cx - 85} y={60} width={170} height={270} rx={26} fill="rgba(220,245,255,.35)" stroke={KC.ink} strokeWidth={6} />
        <rect x={cx - 92} y={34} width={184} height={40} rx={10} fill="#d9d9d9" stroke={KC.ink} strokeWidth={6} />
        <path d={`M ${cx - 79} 230 Q ${cx} 214 ${cx + 79} 230 L ${cx + 79} 300 Q ${cx + 79} 324 ${cx + 55} 324 L ${cx - 55} 324 Q ${cx - 79} 324 ${cx - 79} 300 Z`} fill="#d7b46a" />
        {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={cx - 70 + (k * 37) % 140} cy={240 + (k * 13) % 76} r={5} fill={k % 3 ? '#b8954e' : '#f0d79a'} />)}
        {[[-46, 0], [0, -6], [46, 0]].map(([dx, dy], j) => <Cubito key={j} x={cx + dx} y={232 + dy} L={42} lineas={0.55 * kclamp(semana * 1.3 - 0.25 - i * 0.08 - j * 0.1, 0, 1)} moho={col} mohoP={kclamp(semana * 3 - j * 0.3, 0, 1)} seed={i * 3 + j + 3} />)}
        <path d={`M ${cx - 70} 80 L ${cx - 60} 300`} stroke="#fff" strokeWidth={8} opacity=".45" strokeLinecap="round" />
      </g>; })}
  </g>;
}
// Báscula con el cubito encima: antes (entero) → después (con huecos de pudrición). p 0..1.
function Bascula({ T, x, y, p = 0, entra = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${entra})`}>
    <path d="M -230 40 L 230 40 L 200 170 L -200 170 Z" fill="#cfd6dc" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-260} y={10} width={520} height={34} rx={10} fill="#e8edf0" stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={80} width={240} height={70} rx={10} fill="#1b2a22" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={133} textAnchor="middle" style={{ font:`700 48px ${KF.mono}` }} fill="#7dffb2">{Math.round(100 - 30 * p)} %</text>
    <Cubito x={0} y={10} L={200} lineas={1} pudre={p} seed={9} />
  </g>;
}
// Dos tablas: la de la izquierda se seca (gotas que suben y se evaporan; hifas quietas), la de la derecha se queda húmeda y se desmorona.
function DosTablas({ T, a, seca = 0, pudre = 0 }) {
  const tabla = (x, y, w, h, extra) => <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx={14} fill={ES.maple} stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.5, 0.75].map((k, i) => <path key={i} d={`M 6 ${h * k} C ${w * 0.3} ${h * k - 10} ${w * 0.6} ${h * k + 12} ${w - 6} ${h * k - 4}`} stroke={ES.veta} strokeWidth={3} fill="none" opacity=".7" />)}
    <path d={`M ${w * 0.1} ${h * 0.2} C ${w * 0.4} ${h * 0.6} ${w * 0.55} ${h * 0.1} ${w * 0.9} ${h * 0.7}`} stroke={ES.linea} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M ${w * 0.6} ${h * 0.05} C ${w * 0.5} ${h * 0.5} ${w * 0.7} ${h * 0.7} ${w * 0.62} ${h * 0.95}`} stroke={ES.linea} strokeWidth={5} fill="none" strokeLinecap="round" />
    {extra}
  </g>;
  // gotas que se evaporan (izquierda)
  const gotas = Array.from({ length: 8 }, (_, i) => { const t0 = a + 0.2 + i * 0.22, u = kclamp((T - t0) / 1.1, 0, 1); if (u <= 0 || u >= 1) return null;
    const gx = 120 + (i * 53) % 300, gy = 820 - u * 220;
    return <path key={i} d="M 0 -18 Q 12 0 0 12 Q -12 0 0 -18 Z" transform={`translate(${gx} ${gy}) scale(${1 - u * 0.6})`} fill="#7fd8ff" stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; });
  // tabla húmeda que se desmorona (derecha): trozos que caen
  const trozos = Array.from({ length: 10 }, (_, i) => { const c = kclamp(pudre * 1.5 - i * 0.06, 0, 1); const xx = 600 + (i % 5) * 76, yy = 860 + Math.floor(i / 5) * 90;
    return <rect key={i} x={xx} y={yy + c * c * 260} width={70} height={84} rx={8} fill={mixHex(ES.maple, '#a08860', c)} stroke={KC.ink} strokeWidth={4} transform={`rotate(${c * (i % 2 ? 40 : -35)} ${xx + 35} ${yy + 42 + c * c * 260})`} opacity={1 - c * 0.3} />; });
  return <g>
    {tabla(90, 840, 400, 200, <g opacity={1 - 0.6 * seca}>{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={30 + i * 38} cy={30 + (i * 29) % 140} r={9} fill="#7fd8ff" />)}</g>)}
    {gotas}
    {pudre < 0.02 ? tabla(600, 840, 390, 200, <g>{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={30 + i * 36} cy={30 + (i * 29) % 140} r={9} fill="#7fd8ff" />)}</g>) : trozos}
    {pudre > 0 && Array.from({ length: 6 }, (_, i) => <ellipse key={'b' + i} cx={630 + i * 60} cy={1150} rx={30 * kclamp(pudre * 2 - i * 0.1, 0, 1)} ry={10} fill="#8a6a3e" opacity=".6" />)}
  </g>;
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
  const K = { G: CUES.Gancho, V: CUES.Valor, En: CUES.Entran, H: CUES.Hifas, Ch: CUES.Choque, M: CUES.Melanina, P: CUES.Pregunta, Ma: CUES.Mapa, B: CUES.Blanqueo, L: CUES.Laboratorio, Co: CUES.Costo, S: CUES.Secar, X: CUES.Xylaria, C: CUES.Cierre, Ou: CUES.Outro };
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
      {/* 8 · blanqueo (Trametes) sobre la misma tabla */}
      <Escena T={T} a={K.B} b={K.L} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Tabla T={T} x={TX} y={TY + 20} s={TS} lineas={1} relleno={1 - kprog(T, K.B, K.B + 0.8)} blanco={kprog(T, K.B + 1.6, K.B + 3.6)} id="tbB" />
          <Trametes x={TX + 110} y={TY + 26} s={1} crece={kprog(T, K.B + 0.2, K.B + 1.4)} />
        </>)}
      </Escena>
      {/* 9 · el laboratorio (2012, Toronto): frascos con cubitos de haya, semanas que corren */}
      <Escena T={T} a={K.L} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Frascos T={T} x={110} y={700} at={K.L + 0.2} semana={kprog(T, K.L + 1.6, K.Co - 0.4)} />)}
      </Escena>
      {/* 10 · el costo: la báscula */}
      <Escena T={T} a={K.Co} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        {fsvg(<Bascula T={T} x={540} y={960} p={kprog(T, K.Co + 0.9, K.Co + 2.6, kEase.suave)} entra={kEase.sale(kprog(T, K.Co - 0.3, K.Co + 0.4))} />)}
      </Escena>
      {/* 11 · secar a tiempo vs. húmeda */}
      <Escena T={T} a={K.S} b={K.X} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <DosTablas T={T} a={K.S} seca={kprog(T, K.S + 0.2, K.S + 2.0)} pudre={kprog(T, K.S + 1.0, K.S + 2.8)} />
          <Sello T={T} at={K.S + 1.4} x={290} y={940} texto="PAUSA" color={KC.blue} r={90} />
        </>)}
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
        {fsvg(<Tabla T={T} x={TX} y={TY} s={TS} lineas={1} relleno={0.5 * kprog(T, K.C + 0.4, K.C + 1.6)} blanco={1} id="tbC" />)}
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
      <Chip T={T} at={K.Ch + 0.6} until={K.M - 0.2} texto="se disputan la madera" x={540} y={560} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.M + 0.6} until={K.P - 0.3} x={500} y={560} texto="melanina" lado="izq" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.M + 1.4} until={K.P - 0.3} x={500} y={1160} texto="línea de zona" lado="izq" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Ma + 1.0} until={K.B - 0.3} x={130} y={555} texto="cada color = el territorio de un hongo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ma + 1.8} until={K.B - 0.3} texto="cada línea negra = una frontera" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 1.0} until={K.L - 0.3} x={60} y={445} texto="Trametes versicolor" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 1.6} until={K.L - 0.3} texto="pudrición blanca" x={400} y={375} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 2.4} until={K.L - 0.3} x={1040} y={770} lado="izq" texto="come lignina: más clara" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.L + 0.1} until={K.L + 2.8} anio="2012" quien="Robinson, Tudor y Cooper" revista="U. de Toronto · Appl. Microbiol. Biotechnol." x={540} y={500} />
      {FRASCOS.map(([n], i) => <div key={i} style={{ position:'absolute', left:215 + i * 215, top:1080, transform:'translate(-50%,0)', zIndex:41, opacity:kprog(T, K.L + 0.5 + i * 0.35, K.L + 0.9 + i * 0.35) * (1 - kprog(T, K.Co - 0.4, K.Co - 0.1)),
        font:`700 italic 24px ${KF.mono}`, color:KC.ink, whiteSpace:'nowrap' }}>{n}</div>)}
      <Chip T={T} at={K.L + 1.6} until={K.Co - 0.3} texto={`semana ${1 + Math.floor(11 * kprog(T, K.L + 1.6, K.Co - 0.4))}`} x={300} y={670} tam={34} borde={KC.ink} mono />
      <Chip T={T} at={K.L + 1.9} until={K.Co - 0.3} texto="27 °C" x={560} y={670} tam={34} borde={KC.red} mono />
      <Etq T={T} at={K.L + 2.4} until={K.Co - 0.3} x={110} y={1140} texto="cubitos de haya · Fagus grandifolia" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Co + 1.0} until={K.S - 0.3} valor={30} prefijo="−" sufijo=" %" x={330} y={500} tam={190} color={KC.yellow} />
      <Etq T={T} at={K.Co + 1.6} until={K.S - 0.3} x={40} y={630} texto="peso perdido · albura de haya" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Co + 2.0} until={K.S - 0.3} x={40} y={675} texto="Trametes versicolor" it tam={28} color={KC.ink} />
      <Medidor T={T} at={K.S + 0.1} until={K.X - 0.3} valor={(t) => 0.85 - 0.65 * kprog(t, K.S + 0.2, K.S + 2.0)} etiqueta="agua en la madera" texto={(v) => (v > 0.4 ? 'húmeda' : 'seca')} x={90} y={430} ancho={560} color="#7fd8ff" />
      <Chip T={T} at={K.S + 1.6} until={K.X - 0.3} texto="seca: el hongo se detiene" x={290} y={640} tam={26} borde={KC.blue} />
      <Chip T={T} at={K.S + 1.9} until={K.X - 0.3} texto="húmeda: se sigue pudriendo" x={795} y={790} tam={26} borde={KC.red} />
      <Etq T={T} at={K.X + 0.6} until={K.C - 0.3} x={80} y={600} texto="Xylaria polymorpha" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.X + 1.2} until={K.C - 0.3} x={80} y={650} texto="«dedos de muerto»" tam={30} color={KC.ink} />
      <Chip T={T} at={K.X + 2.6} until={K.C - 0.3} texto="sin otro hongo" x={805} y={745} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.X + 3.2} until={K.C - 0.3} x={580} y={1135} texto="un solo hongo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou} x={340} y={545} texto="fronteras · blanqueo · secada a tiempo" tam={24} color={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="un mapa de una guerra de hongos" x={650} y={470} tam={30} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.V} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.V} until={K.En} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.En} until={K.H} texto="20 cm" largo={210} />
      <BarraEscala T={T} at={K.H} until={K.P} texto="100 µm (esquemático)" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.Ma} texto="20 cm" largo={140} />
      <BarraEscala T={T} at={K.Ma} until={K.L} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.L} until={K.S} texto="cubito de 14 mm" largo={60} />
      <BarraEscala T={T} at={K.S} until={K.X} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.X} until={K.C} texto="2 cm" largo={60} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No son vetas: son *fronteras entre hongos.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.En - 0.1} texto="Madera *espalteada:* se vende cara." />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.H - 0.1} texto="Varios hongos, *el mismo tronco.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Ch - 0.1} texto="Hifas que *se comen la madera.*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={K.M - 0.1} texto="Chocan: *se disputan la madera.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.P - 0.1} texto="Un muro de *melanina.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ma - 0.1} texto="¿Y si hay *muchos hongos?*" />
      <Subtitulo T={T} idx={7} at={K.Ma + 0.1} until={K.B - 0.1} texto="Más hongos, *más fronteras.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.L - 0.1} texto="_Trametes:_ *aclara la madera.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.Co - 0.1} texto="2012: hongos en *cubitos de haya.*" />
      <Subtitulo T={T} idx={10} at={K.Co + 0.1} until={K.S - 0.1} texto="El costo: *casi un tercio del peso.*" />
      <Subtitulo T={T} idx={11} at={K.S + 0.1} until={K.X - 0.1} texto="Se seca a tiempo: *el hongo se detiene.*" />
      <Subtitulo T={T} idx={12} at={K.X + 0.1} until={K.C - 0.1} texto="_Xylaria:_ *líneas aunque esté solo.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="El mapa de *una guerra de hongos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 0.8, K.En - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.6, K.Ch - 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.M + 0.3, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ma + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.B + 0.6, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.L + 3.0, K.Co - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Co + 0.6, K.S - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.S + 0.3, K.X - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
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
