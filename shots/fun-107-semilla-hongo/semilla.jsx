// Shot Fungi Mati #107 · Esto no son granos echados a perder: es la semilla de un hongo — NARRADO (N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Piezas Champinon, SetaOstra, BolsaCultivo y Termometro copiadas de motor/kit/kit-robert.jsx (la copia local del kit no las trae).

const SM = { grano:'#c08a44', grano2:'#9c6a2e', blanco:'#fbf7ee', vidrio:'rgba(230,245,255,.30)', tapa:'#9aa3ad', estiercol:'#5e4128', estiercol2:'#7a5634', rosa:'#f59ab0', rosa2:'#d9668a', espora:'#6b3f26' };

/* ---------- piezas copiadas del kit general (motor/kit/kit-robert.jsx) ---------- */
function Champinon({ x = 0, y = 0, s = 1, crece = 1, abre = 1, rot = 0, sombrero = '#efe2cc', sombra = '#cdb795', lam = '#7a4a3a', pie = '#f6eedf', borde = 7 }) {
  if (crece <= 0) return null;
  const c = kclamp(crece, 0, 1), a = kclamp(abre, 0, 1);
  const hPie = klerp(18, 150, c), wPie = klerp(16, 54, c);
  const rC = klerp(16, 150, c) * klerp(0.72, 1, a), alto = rC * klerp(0.95, 0.56, a);
  const yC = -hPie;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${-wPie * 0.62} 0 C ${-wPie * 0.5} ${-hPie * 0.5}, ${-wPie * 0.45} ${-hPie * 0.8}, ${-wPie * 0.42} ${yC} L ${wPie * 0.42} ${yC} C ${wPie * 0.45} ${-hPie * 0.8}, ${wPie * 0.5} ${-hPie * 0.5}, ${wPie * 0.62} 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    {a > 0.35 && <path d={`M ${-wPie * 0.5} ${yC + hPie * 0.22} q ${wPie * 0.5} ${12 * a} ${wPie} 0 l ${4} ${16 * a} q ${-wPie * 0.55} ${10 * a} ${-wPie - 8} 0 Z`} fill="#fbf6ec" stroke={KC.ink} strokeWidth={borde * 0.6} opacity={kprog(a, 0.35, 0.6)} />}
    {a > 0.15 && <g opacity={kprog(a, 0.15, 0.45)}>
      <path d={`M ${-rC * 0.96} ${yC - 2} Q 0 ${yC + alto * 0.28} ${rC * 0.96} ${yC - 2}`} fill={lam} stroke={KC.ink} strokeWidth={borde * 0.7} />
      {Array.from({ length: 13 }, (_, i) => { const u = (i + 0.5) / 13 * 2 - 1; return <line key={i} x1={u * rC * 0.9} y1={yC - 2} x2={u * wPie * 0.45} y2={yC + alto * 0.1} stroke="#4d2c22" strokeWidth={2.5} />; })}
    </g>}
    <path d={`M ${-rC} ${yC} C ${-rC} ${yC - alto * 1.25}, ${rC} ${yC - alto * 1.25}, ${rC} ${yC} Q 0 ${yC + alto * 0.12} ${-rC} ${yC} Z`} fill={sombrero} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    <path d={`M ${-rC * 0.55} ${yC - alto * 0.75} Q ${-rC * 0.1} ${yC - alto * 0.95} ${rC * 0.25} ${yC - alto * 0.8}`} fill="none" stroke="#fff" strokeWidth={borde * 1.2} strokeLinecap="round" opacity=".55" />
    {[[-0.4, -0.45], [0.3, -0.55], [0.05, -0.3]].map(([u, v], i) => <ellipse key={i} cx={u * rC} cy={yC + v * alto} rx={rC * 0.07} ry={alto * 0.05} fill={sombra} opacity=".7" />)}
  </g>;
}
function SetaOstra({ x = 0, y = 0, s = 1, abre = 1, rot = 0, color = '#f59ab0', oscuro = '#d9668a', pie = 1, borde = 6 }) {
  const a = kclamp(abre, 0, 1), w = klerp(18, 150, a), h = klerp(16, 60, a), L = 40 * pie + 10;
  const cx = L * 0.9, cy = -L * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -10 4 Q ${L * 0.4} ${-L * 0.1} ${cx} ${cy + 10} L ${cx + 10} ${cy + 22} Q ${L * 0.45} ${L * 0.1} 10 8 Z`} fill={mixHex(color, '#ffffff', 0.35)} stroke={KC.ink} strokeWidth={borde * 0.8} strokeLinejoin="round" />
    <path d={`M ${cx - w * 0.15} ${cy + 8} Q ${cx + w * 0.45} ${cy + h * 1.15} ${cx + w} ${cy + h * 0.25} L ${cx + w * 0.92} ${cy - h * 0.1} Q ${cx + w * 0.4} ${cy + h * 0.2} ${cx - w * 0.15} ${cy + 8} Z`} fill={oscuro} stroke={KC.ink} strokeWidth={borde * 0.7} />
    {a > 0.2 && Array.from({ length: 9 }, (_, i) => { const u = (i + 1) / 10; return <line key={i} x1={cx + 4} y1={cy + 12} x2={cx + w * (0.1 + u * 0.85)} y2={cy + h * (0.95 - u * 0.65)} stroke={mixHex(oscuro, KC.ink, 0.35)} strokeWidth={2.5} opacity={kprog(a, 0.2, 0.5)} />; })}
    <path d={`M ${cx - w * 0.2} ${cy + 6} C ${cx - w * 0.1} ${cy - h * 1.2}, ${cx + w * 0.9} ${cy - h * 1.3}, ${cx + w * 1.05} ${cy + h * 0.22} Q ${cx + w * 0.5} ${cy - h * 0.05} ${cx - w * 0.2} ${cy + 6} Z`} fill={color} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    <path d={`M ${cx + w * 0.1} ${cy - h * 0.55} Q ${cx + w * 0.45} ${cy - h * 0.85} ${cx + w * 0.8} ${cy - h * 0.4}`} fill="none" stroke="#fff" strokeWidth={borde} strokeLinecap="round" opacity=".45" />
  </g>;
}
function BolsaCultivo({ T = 0, x, y, w = 420, h = 620, col = 1, seed = 5, rayos = 0 }) {
  const g = krng(seed), trozos = Array.from({ length: 90 }, () => ({ x: (g() - 0.5) * w * 0.86, y: -h * 0.4 + g() * h * 0.82, r: 6 + g() * 14, a: g() * 180, c: g() < 0.5 ? '#c98a3e' : '#a86d2c' }));
  const blanco = Array.from({ length: 70 }, () => ({ x: (g() - 0.5) * w * 0.86, y: -h * 0.4 + g() * h * 0.82, r: 16 + g() * 34, u: g() }));
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, seed, 0.1) * 1.2})`}>
    <path d={`M ${-w / 2} ${-h * 0.42} Q ${-w / 2 - 10} ${h * 0.45} ${-w * 0.42} ${h / 2} L ${w * 0.42} ${h / 2} Q ${w / 2 + 10} ${h * 0.45} ${w / 2} ${-h * 0.42} Z`} fill="#8a5a2b" />
    {trozos.map((t, i) => <rect key={i} x={t.x - t.r} y={t.y - t.r * 0.4} width={t.r * 2} height={t.r * 0.8} rx={3} transform={`rotate(${t.a} ${t.x} ${t.y})`} fill={t.c} />)}
    {blanco.map((b, i) => b.u < col ? <circle key={i} cx={b.x} cy={b.y} r={b.r * kclamp((col - b.u) * 4, 0, 1)} fill="#fbf7ee" opacity={0.85} /> : null)}
    {rayos > 0 && <rect x={-w / 2} y={-h * 0.42} width={w} height={h * 0.92} fill="#0E0F12" opacity={0.5 * rayos} />}
    <path d={`M ${-w / 2 - 6} ${-h / 2} L ${w / 2 + 6} ${-h / 2} Q ${w / 2 + 22} ${h * 0.45} ${w * 0.44} ${h / 2 + 6} L ${-w * 0.44} ${h / 2 + 6} Q ${-w / 2 - 22} ${h * 0.45} ${-w / 2 - 6} ${-h / 2} Z`} fill="rgba(230,245,255,.22)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w * 0.36} ${-h * 0.4} L ${-w * 0.3} ${h * 0.36}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".35" />
  </g>;
}
function Termometro({ x, y, valor = 20, max = 100, alto = 620, marcas = [0, 25, 50, 75, 100], color = KC.red }) {
  const t2y = (c) => y + alto - (kclamp(c, 0, max) / max) * alto;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>
    <rect x={x - 40} y={y} width={80} height={alto} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 20} y={t2y(valor)} width={40} height={y + alto - t2y(valor)} rx={20} fill={color} />
    <circle cx={x} cy={y + alto + 40} r={70} fill={color} stroke={KC.ink} strokeWidth={8} />
    {marcas.map((c) => <g key={c}><line x1={x + 40} y1={t2y(c)} x2={x + 70} y2={t2y(c)} stroke={KC.ink} strokeWidth={5} /><text x={x + 78} y={t2y(c) + 12} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>{c}°</text></g>)}
  </svg>;
}

/* ---------- piezas de este shot ---------- */
// Grano de cereal (centeno: alargado, con surco). col 0..1 = cuánto lo envuelve el micelio blanco.
function Grano({ x, y, rot = 0, s = 1, col = 0, seed = 1 }) {
  const g = krng(seed), pelos = Array.from({ length: 9 }, () => ({ a: g() * Math.PI * 2, l: 6 + g() * 10 }));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={26} ry={11} fill={mixHex(SM.grano, SM.blanco, col * 0.85)} stroke={KC.ink} strokeWidth={3 / Math.max(s, 1) + 1} />
    <path d="M -18 0 Q 0 -3 18 0" stroke={mixHex(SM.grano2, '#e8dcc8', col)} strokeWidth={2.5} fill="none" />
    {col > 0.3 && pelos.map((p, i) => <line key={i} x1={Math.cos(p.a) * 24} y1={Math.sin(p.a) * 10} x2={Math.cos(p.a) * (24 + p.l)} y2={Math.sin(p.a) * (10 + p.l)} stroke={SM.blanco} strokeWidth={2} opacity={kclamp((col - 0.3) * 2, 0, 1)} />)}
  </g>;
}
// Granos dentro de un frasco: posiciones fijas (coordenadas del frasco, base en 0,0; cuerpo de -120..120 × -330..-10).
const GRANOS_FR = (() => { const g = krng(11), out = []; for (let fila = 0; fila < 17; fila++) for (let k = 0; k < 6; k++) out.push({ x: -100 + k * 40 + (fila % 2) * 18 + (g() - 0.5) * 10, y: -24 - fila * 18 + (g() - 0.5) * 6, r: (g() - 0.5) * 70, s: g() }); return out; })();
// Frasco de vidrio con grano (spawn). Base en (x, y). col 0..1 = colonizado (blanco). nivel 0..1 = cuánto grano queda.
// tipo 'estiercol' = trozos de estiércol en vez de grano (spawn viejo). tapa: tapa con filtro (círculo blanco).
function FrascoGrano({ T = 0, x, y, s = 1, rot = 0, col = 0, nivel = 1, id = 'fg', tipo = 'grano', etiqueta }) {
  const tope = -24 - 16 * 18 * nivel;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={id + 'c'}><path d="M -124 -300 Q -130 -320 -112 -336 L 112 -336 Q 130 -320 124 -300 L 124 -26 Q 124 -2 100 -2 L -100 -2 Q -124 -2 -124 -26 Z" /></clipPath></defs>
    <path d="M -130 -300 Q -136 -322 -116 -342 L 116 -342 Q 136 -322 130 -300 L 130 -26 Q 130 6 100 6 L -100 6 Q -130 6 -130 -26 Z" fill="rgba(255,255,255,.25)" />
    <g clipPath={`url(#${id}c)`}>
      {tipo === 'grano' ? GRANOS_FR.map((q, i) => q.y > tope ? <Grano key={i} x={q.x} y={q.y} rot={q.r} s={1.05} col={kclamp(col * 1.6 - q.s * 0.6, 0, 1)} seed={i + 3} /> : null)
        : GRANOS_FR.map((q, i) => q.y > tope ? <rect key={i} x={q.x - 22} y={q.y - 12} width={44} height={26} rx={8} transform={`rotate(${q.r * 0.6} ${q.x} ${q.y})`} fill={i % 3 ? SM.estiercol : SM.estiercol2} stroke="#3a2614" strokeWidth={2} /> : null)}
      {/* micelio algodonoso entre los granos */}
      {col > 0 && GRANOS_FR.filter((q, i) => i % 3 === 0 && q.y > tope).map((q, i) => <circle key={i} cx={q.x + 10} cy={q.y} r={22 * kclamp(col * 1.4 - q.s * 0.4, 0, 1)} fill={SM.blanco} opacity={tipo === 'grano' ? 0.55 : 0.75} />)}
    </g>
    <path d="M -130 -300 Q -136 -322 -116 -342 L 116 -342 Q 136 -322 130 -300 L 130 -26 Q 130 6 100 6 L -100 6 Q -130 6 -130 -26 Z" fill={SM.vidrio} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -104 -300 L -104 -40" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity=".45" />
    <rect x={-122} y={-382} width={244} height={46} rx={10} fill={SM.tapa} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-382} rx={52} ry={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    {etiqueta && <g><rect x={-90} y={-210} width={180} height={64} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} /><text x={0} y={-166} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Autoclave (olla grande con manómetro). Base en (x, y). temp 0..1 mueve la aguja; vapor 0..1 sale por la válvula.
function Autoclave({ T, x, y, temp = 0, vapor = 0 }) {
  const ang = -120 + 240 * temp;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-230} y={-380} width={460} height={380} rx={40} fill="#c9d2da" stroke={KC.ink} strokeWidth={9} />
    <rect x={-200} y={-350} width={30} height={320} rx={15} fill="#fff" opacity=".45" />
    <rect x={-250} y={-420} width={500} height={60} rx={20} fill="#aeb8c2" stroke={KC.ink} strokeWidth={9} />
    {[-210, 210].map((dx) => <rect key={dx} x={dx - 20} y={-440} width={40} height={100} rx={12} fill="#7d8790" stroke={KC.ink} strokeWidth={6} />)}
    <g transform="translate(-80 -470)">
      <circle r={62} fill="#fff" stroke={KC.ink} strokeWidth={8} />
      {[-120, -60, 0, 60, 120].map((a) => <line key={a} x1={0} y1={-50} x2={0} y2={-38} stroke={KC.ink} strokeWidth={5} transform={`rotate(${a})`} />)}
      <line x1={0} y1={0} x2={0} y2={-44} stroke={KC.red} strokeWidth={7} strokeLinecap="round" transform={`rotate(${ang})`} />
      <circle r={9} fill={KC.ink} />
    </g>
    <rect x={60} y={-470} width={40} height={50} rx={8} fill="#7d8790" stroke={KC.ink} strokeWidth={6} />
    {vapor > 0 && [0, 1, 2, 3].map((k) => { const u = ((T * 0.9 + k * 0.25) % 1); return <circle key={k} cx={80 + Math.sin(u * 6 + k) * 18} cy={-490 - u * 160} r={18 + u * 30} fill="#fff" opacity={(1 - u) * 0.7 * vapor} />; })}
  </g>;
}
// Olla de presión de cocina (la de Robert). Base en (x, y).
function OllaPresion({ T, x, y, s = 1, silba = 0 }) {
  const brinca = Math.max(0, Math.sin(T * 22)) * 6 * silba;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -230 L 170 -230 L 160 -20 Q 155 0 130 0 L -130 0 Q -155 0 -160 -20 Z" fill="#cfd6dd" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-150} y={-210} width={22} height={180} rx={11} fill="#fff" opacity=".5" />
    <path d="M -185 -232 Q 0 -300 185 -232 Z" fill="#b4bec7" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-330} y={-258} width={160} height={34} rx={17} fill="#2b2b2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={170} y={-258} width={120} height={30} rx={15} fill="#2b2b2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-14} y={-296 - brinca} width={28} height={30} rx={6} fill="#555" stroke={KC.ink} strokeWidth={5} />
    {silba > 0 && [0, 1, 2].map((k) => { const u = ((T * 1.1 + k * 0.33) % 1); return <circle key={k} cx={Math.sin(u * 7 + k) * 20} cy={-310 - u * 150} r={14 + u * 30} fill="#fff" opacity={(1 - u) * 0.75 * silba} />; })}
  </g>;
}
// Tupper (recipiente de plástico) visto de lado.
function Tupper({ x, y, s = 1, color = '#7fd6ff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-80} width={180} height={80} rx={14} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-46} width={160} height={38} rx={8} fill="#f1d27a" />
    <rect x={-98} y={-98} width={196} height={24} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Ladrillos de estiércol apilados con pedacitos de micelio (spawn de antes de los años 30). m 0..1 = manchas blancas.
function Ladrillos({ x, y, m = 1, p = 1 }) {
  const pos = [[0, 0], [190, 0], [95, -100], [285, -100], [0, -200], [190, -200]];
  return <g transform={`translate(${x} ${y})`}>
    {pos.map(([dx, dy], i) => { const k = kEase.rebote(kclamp(p * 2.2 - i * 0.22, 0, 1)); if (k <= 0) return null; const g = krng(i + 40);
      return <g key={i} transform={`translate(${dx} ${dy - (1 - k) * 120})`} opacity={kclamp(k * 2, 0, 1)}>
        <rect x={0} y={-90} width={180} height={90} rx={10} fill={i % 2 ? SM.estiercol : SM.estiercol2} stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: 6 }, (_, j) => <line key={j} x1={14 + g() * 140} y1={-80 + g() * 70} x2={30 + g() * 140} y2={-80 + g() * 70} stroke="#c9a36a" strokeWidth={3} opacity=".7" />)}
        {Array.from({ length: 4 }, (_, j) => <circle key={'m' + j} cx={25 + g() * 130} cy={-75 + g() * 60} r={(6 + g() * 8) * m} fill={SM.blanco} />)}
      </g>; })}
  </g>;
}
// Flecha simple que se dibuja.
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink }) {
  if (p <= 0) return null;
  const ex = klerp(x1, x2, p), ey = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  return <g><line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={9} strokeLinecap="round" />
    {p > 0.9 && <path d={`M ${ex} ${ey} L ${ex - 30 * Math.cos(a - 0.5)} ${ey - 30 * Math.sin(a - 0.5)} M ${ex} ${ey} L ${ex - 30 * Math.cos(a + 0.5)} ${ey - 30 * Math.sin(a + 0.5)}`} stroke={color} strokeWidth={9} strokeLinecap="round" />}</g>;
}
// Espora (óvalo). color y proporción según especie.
function Espora({ x, y, rx = 16, ry = 11, rot = 0, color = SM.espora, o = 1 }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${rot} ${x} ${y})`} fill={color} stroke={KC.ink} strokeWidth={2.5} opacity={o} />;
}
// Hifas que salen de granos (dentro de la lupa). Puntos fijos; g 0..1 = cuánto han crecido.
const GRANOS_LUPA = [[190, 230, -22], [420, 320, 28], [250, 440, 6]];
const HIFAS_LUPA = (() => { const g = krng(7), out = [];
  GRANOS_LUPA.forEach(([gx, gy, gr]) => { for (let k = 0; k < 30; k++) { const a = g() * Math.PI * 2, c = Math.cos(gr * Math.PI / 180), sn = Math.sin(gr * Math.PI / 180);
    const ex = Math.cos(a) * 118, ey = Math.sin(a) * 46; let px = gx + ex * c - ey * sn, py = gy + ex * sn + ey * c, dir = Math.atan2(py - gy, px - gx) + (g() - 0.5) * 0.8;
    const pts = [[px, py]]; for (let i = 0; i < 12; i++) { dir += (g() - 0.5) * 0.6; px += Math.cos(dir) * 11; py += Math.sin(dir) * 11; pts.push([px, py]); }
    out.push({ pts, d: g() * 0.4 }); } });
  return out; })();
function InteriorLupa(T, r, g) {
  return <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ position:'absolute', left:0, top:0 }}>
    <rect width={600} height={600} fill="#0b1220" />
    {GRANOS_LUPA.map(([x, y, rot], i) => <Grano key={i} x={x} y={y} rot={rot} s={4.5} col={0.15 + g * 0.35} seed={i + 21} />)}
    {HIFAS_LUPA.map((h, i) => { const u = kclamp((g - h.d) / 0.6, 0, 1); const n = Math.max(2, Math.ceil(h.pts.length * u)); if (u <= 0) return null;
      return <polyline key={i} points={h.pts.slice(0, n).map((q) => q.join(',')).join(' ')} fill="none" stroke="#fff4d6" strokeWidth={2.6} strokeLinecap="round" opacity=".92" />; })}
  </svg>;
}
// Recuadro con una sola hifa tabicada (con septos), muy aumentada.
function HifaTabicada({ T, x, y, r = 105, p = 1 }) {
  if (p <= 0) return null;
  const pts = Array.from({ length: 9 }, (_, i) => [x - r + i * (2 * r / 8), y + Math.sin(i * 0.7 + 0.5) * 18]);
  const d = 'M ' + pts.map((q) => q.join(' ')).join(' L ');
  return <g opacity={p} transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, kEase.rebote(p))}) translate(${-x} ${-y})`}>
    <defs><clipPath id="htc"><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <circle cx={x} cy={y} r={r + 8} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <circle cx={x} cy={y} r={r} fill="#0b1220" />
    <g clipPath="url(#htc)">
      <path d={d} stroke="#eafff7" strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${pts[4][0]} ${pts[4][1]} Q ${pts[4][0] + 20} ${pts[4][1] - 60} ${pts[4][0] + 60} ${pts[4][1] - 110}`} stroke="#eafff7" strokeWidth={28} fill="none" strokeLinecap="round" />
      {[1, 3, 5, 7].map((i) => { const [a, b] = pts[i], [c2, d2] = pts[i + 1]; const ang = Math.atan2(d2 - b, c2 - a) + Math.PI / 2;
        return <line key={i} x1={a + Math.cos(ang) * 15} y1={b + Math.sin(ang) * 15} x2={a - Math.cos(ang) * 15} y2={b - Math.sin(ang) * 15} stroke="#2a6f8a" strokeWidth={5} />; })}
    </g>
  </g>;
}

// Esporas que caen sobre el agar (escena micro): posiciones finales y las 2 que germinan.
const ESP_CAEN = Array.from({ length: 16 }, (_, i) => ({ x: 110 + (i % 8) * 75 + (i >= 8 ? 36 : 0), y: 1010 + (i >= 8 ? 60 : 0) + ((i * 37) % 17), rot: (i * 47) % 60 - 30, d: (i * 0.071) % 0.6 }));
const GERMINA = [3, 12];
// Nube de esporas que cae del champiñón (dato extra).
const NUBE = Array.from({ length: 90 }, (_, i) => { const g = krng(i + 300); return { x0: (g() - 0.5) * 300, fase: g(), vx: (g() - 0.3) * 60, vel: 90 + g() * 70 }; });

function SemillaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.Spawn, L: CUES.Lupa, Es: CUES.Esporas, Cl: CUES.Clon, R: CUES.Receta, Lo: CUES.Lotes, P: CUES.Pregunta, E: CUES.Estudio, Ro: CUES.Robert, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const E2 = K.Es + 3.72;      // 2.ª línea de Esporas («y cada una puede dar una cepa nueva»)
  const E9 = K.E + 4.41;       // 2.ª línea del Estudio («y el micelio creció más rápido…»)
  const sac = Math.sin(T * 9) * 4 * (1 - kprog(T, K.G + 0.2, K.G + 1.4));
  const cae = kprog(T, K.G + 0.15, K.G + 0.9);
  // cierre: el frasco del inicio se levanta y vacía el grano en una bolsa
  const vac = kprog(T, K.C + 0.4, K.C + 1.3, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: frasco de granos blancos que parecen echados a perder */}
      <Escena T={T} a={K.G} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <FrascoGrano T={T} x={330} y={1150} s={1.2} rot={sac} col={1} id="fg0" />
          {cae > 0 && <Grano x={330 + cae * 330} y={720 - Math.sin(cae * Math.PI) * 200 + cae * 440} rot={cae * 600} s={2.4} col={1} seed={5} />}
        </>)}
      </Escena>
      {/* 2 · spawn = grano esterilizado + micelio */}
      <Escena T={T} a={K.S} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const a = kprog(T, K.S + 0.6, K.S + 1.0, kEase.rebote), b = kprog(T, K.S + 1.4, K.S + 1.8, kEase.rebote), c = kprog(T, K.S + 2.3, K.S + 2.7, kEase.rebote); return <>
            {a > 0 && <Grano x={170} y={880} rot={-10} s={4 * a} col={0} seed={2} />}
            {b > 0 && <text x={330} y={905} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={b}>+</text>}
            {b > 0 && <RedHifas T={T} x={480} y={880} g={kprog(T, K.S + 1.4, K.S + 2.4)} seed={4} n={160} escala={0.32} color={KC.white} ancho={4} circ />}
            {c > 0 && <text x={640} y={905} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={c}>=</text>}
            {c > 0 && <Grano x={830} y={880} rot={10} s={4 * c} col={kprog(T, K.S + 2.5, K.S + 3.3)} seed={3} />}
            <g style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink} textAnchor="middle">
              {a > 0 && <text x={170} y={1010} opacity={a}>grano</text>}
              {a > 0 && <text x={170} y={1045} opacity={a}>esterilizado</text>}
              {b > 0 && <text x={480} y={1010} opacity={b}>micelio</text>}
              {c > 0 && <text x={830} y={1010} opacity={c}>spawn</text>}
            </g>
          </>; })()}
          <text x={60} y={600} style={{ font:`400 190px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.S + 0.1, K.S + 0.4)}>SPAWN</text>
        </>)}
      </Escena>
      {/* 3 · lupa: granos forrados de hifas */}
      <Escena T={T} a={K.L} b={K.Es} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <FrascoGrano T={T} x={230} y={1120} s={0.85} col={1} id="fg1" />
          <HifaTabicada T={T} x={890} y={400} r={105} p={kprog(T, K.L + 2.0, K.L + 2.4)} />
          {T > K.L + 2.2 && <text x={890} y={272} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.L + 2.2, K.L + 2.5)}>hifa con septos</text>}
        </>)}
        <Lupa T={T} at={K.L + 0.3} until={K.Es - 0.4} x={620} y={760} r={300} fx={230} fy={950} tinte={KC.white} etiqueta="granos + hifas"
          interior={(t, r) => InteriorLupa(t, r, kprog(t, K.L + 0.6, K.L + 3.2))} />
      </Escena>
      {/* 4 · esporas: germinan mal (micro, fondo oscuro) */}
      <Escena T={T} a={K.Es} b={E2 + 0.2} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <rect x={0} y={1060} width={KW} height={200} fill="#d9c48a" opacity=".9" />
          <rect x={0} y={1060} width={KW} height={10} fill="#fff" opacity=".35" />
          <text x={1030} y={1110} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>agar</text>
          {ESP_CAEN.map((e, i) => { const u = kprog(T, K.Es + 0.2 + e.d, K.Es + 1.0 + e.d, kEase.sale); const yy = klerp(380, e.y + 40, u);
            const germ = GERMINA.includes(i) ? kprog(T, K.Es + 1.8, K.Es + 3.4) : 0;
            return <g key={i}>
              {germ > 0 && <path d={`M ${e.x + 12} ${yy} q ${30 * germ} ${-20 * germ} ${60 * germ} ${-10 * germ} t ${50 * germ} ${-30 * germ}`} stroke="#fff4d6" strokeWidth={8} fill="none" strokeLinecap="round" />}
              <Espora x={e.x} y={yy} rot={e.rot} o={GERMINA.includes(i) || T < K.Es + 2.4 ? 1 : 0.55} />
            </g>; })}
        </>)}
      </Escena>
      {/* 4b · cada espora: una cepa nueva, impredecible */}
      <Escena T={T} a={E2} b={K.Cl} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        {fsvg(<>
          {[[170, 1.0, '#efe2cc', 0.9], [400, 0.75, '#c9a27a', 0.6], [640, 1.15, '#f6f1e6', 1], [870, 0.6, '#a7825a', 0.4]].map(([x, s, col, ab], i) => {
            const c = kprog(T, E2 + 0.2 + i * 0.3, E2 + 0.9 + i * 0.3);
            return <g key={i}><Champinon x={x} y={1120} s={s} crece={c} abre={ab * c} sombrero={col} />
              {c > 0.8 && <text x={x} y={1120 - 330 * s - 30} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6}>?</text>}</g>; })}
        </>)}
      </Escena>
      {/* 5 · clon: cultivo de tejido */}
      <Escena T={T} a={K.Cl} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Champinon x={260} y={1150} s={1.45} />
          {(() => { const u = kprog(T, K.Cl + 0.6, K.Cl + 1.5, kEase.suave); return <rect x={klerp(245, 745, u) - 14} y={klerp(860, 800, u) - Math.sin(u * Math.PI) * 120 - 10} width={28} height={20} rx={4} fill="#fbf6ec" stroke={KC.ink} strokeWidth={4} />; })()}
          <Petri x={760} y={800} r={130}><Colonia cx={0} cy={0} r={110 * kprog(T, K.Cl + 1.5, K.Cl + 2.6)} seed={4} /></Petri>
          <Flecha x1={760} y1={950} x2={760} y2={1010} p={kprog(T, K.Cl + 2.4, K.Cl + 2.7)} />
          {[640, 770, 900].map((x, i) => { const c = kprog(T, K.Cl + 2.6 + i * 0.15, K.Cl + 3.2 + i * 0.15); return <g key={i}><Champinon x={x} y={1170} s={0.42} crece={c} />
            {c >= 1 && <path d={`M ${x - 16} 1020 L ${x - 4} 1032 L ${x + 18} 1006`} stroke="#118a3a" strokeWidth={8} fill="none" strokeLinecap="round" />}</g>; })}
        </>)}
      </Escena>
      {/* 6 · receta: autoclave 35 min a 121 °C */}
      <Escena T={T} a={K.R} b={K.Lo} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {[0, 1, 2].map((i) => { const u = kprog(T, K.R + 0.1 + i * 0.25, K.R + 0.8 + i * 0.25, kEase.suave); return u < 1 ? <FrascoGrano key={i} x={klerp(-120, 230 + i * 70, u)} y={klerp(1160, 900, u)} s={0.32} id={'fr' + i} /> : null; })}
          <Autoclave T={T} x={330} y={1160} temp={kprog(T, K.R + 0.9, K.R + 2.6, kEase.suave)} vapor={kprog(T, K.R + 2.2, K.R + 2.6)} />
          <text x={330} y={1040} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>autoclave</text>
        </>)}
        <Termometro x={860} y={560} alto={460} max={130} marcas={[0, 50, 100, 121]} valor={klerp(20, 121, kprog(T, K.R + 0.9, K.R + 2.6, kEase.suave))} />
      </Escena>
      {/* 7 · lotes cada vez más grandes */}
      <Escena T={T} a={K.Lo} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Petri x={160} y={770} r={90}><Colonia cx={0} cy={0} r={78} seed={6} /></Petri>
          <Flecha x1={270} y1={770} x2={340} y2={770} p={kprog(T, K.Lo + 0.2, K.Lo + 0.5)} />
          <FrascoGrano T={T} x={470} y={880} s={0.45} col={kprog(T, K.Lo + 0.4, K.Lo + 1.2)} id="fl0" />
          <Flecha x1={420} y1={945} x2={340} y2={1000} p={kprog(T, K.Lo + 1.1, K.Lo + 1.4)} />
          {[150, 290, 430].map((x, i) => kprog(T, K.Lo + 1.3, K.Lo + 1.5) > 0 ? <FrascoGrano key={i} T={T} x={x} y={1180} s={0.42} col={kprog(T, K.Lo + 1.5 + i * 0.1, K.Lo + 2.3 + i * 0.1)} id={'fl' + (i + 1)} /> : null)}
          <Flecha x1={520} y1={1080} x2={600} y2={1080} p={kprog(T, K.Lo + 2.2, K.Lo + 2.5)} />
          {[730, 920].map((x, i) => kprog(T, K.Lo + 2.4, K.Lo + 2.6) > 0 ? <BolsaCultivo key={i} T={T} x={x} y={1040} w={150} h={250} col={kprog(T, K.Lo + 2.6 + i * 0.15, K.Lo + 3.6)} seed={i + 8} /> : null)}
          <g style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} textAnchor="middle">
            <text x={160} y={900}>placa</text>
            {T > K.Lo + 0.4 && <text x={470} y={920}>1 frasco</text>}
            {T > K.Lo + 1.4 && <text x={290} y={1215}>3 frascos</text>}
            {T > K.Lo + 2.5 && <text x={825} y={860}>bolsas</text>}
          </g>
        </>)}
      </Escena>
      {/* 8 · re-gancho */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><FrascoGrano T={T} x={290} y={1180} s={1.1} rot={Math.sin(T * 4) * 4} col={1} id="fp" /><Interrogacion T={T} x={300} y={700} tam={340} /></>)}
      </Escena>
      {/* 9 · el estudio: estiércol → grano (Sinden, Penn State) */}
      <Escena T={T} a={K.E} b={K.Ro} zoom={0.03}>
        <FondoLunares color={KC.teal} />
        {fsvg(<>
          {T < K.E + 2.9 && <g opacity={1 - kprog(T, K.E + 2.4, K.E + 2.9)}><Ladrillos x={190} y={1110} p={kprog(T, K.E + 0.1, K.E + 1.2)} m={kprog(T, K.E + 1.0, K.E + 1.8)} /></g>}
          {T > K.E + 2.4 && <g opacity={kprog(T, K.E + 2.4, K.E + 2.9)}>
            <FrascoGrano T={T} x={290} y={1030} s={0.75} tipo="estiercol" col={0.3 * kprog(T, E9, E9 + 1.6)} id="fe1" />
            <FrascoGrano T={T} x={760} y={1030} s={0.75} col={kprog(T, E9, E9 + 1.4)} id="fe2" />
            <g style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} textAnchor="middle">
              <text x={290} y={1080}>estiércol</text><text x={760} y={1080}>grano</text>
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 10 · Robert: olla de presión y su propia cepa de seta rosa */}
      <Escena T={T} a={K.Ro} b={K.D} zoom={0.03}>
        <FondoLunares color="#ffb3cf" />
        {fsvg(<>
          {T < K.Ro + 2.9 && <g opacity={1 - kprog(T, K.Ro + 2.4, K.Ro + 2.9)}>
            <OllaPresion T={T} x={300} y={1000} s={0.8} silba={kprog(T, K.Ro + 0.6, K.Ro + 1.0)} />
            <Tupper x={170} y={1150} s={0.8} /><Tupper x={360} y={1150} s={0.8} color="#ffd43b" />
          </g>}
          {T > K.Ro + 2.4 && <g opacity={kprog(T, K.Ro + 2.4, K.Ro + 2.9)}>
            <SetaOstra x={60} y={700} s={1.5} rot={8} />
            {Array.from({ length: 14 }, (_, i) => { const u = ((T - K.Ro - 2.6) * 0.8 + i / 14) % 1; return T > K.Ro + 2.6 ? <Espora key={i} x={170 + (i % 5) * 34 + u * 40} y={760 + u * 230} rx={10} ry={4.5} rot={70 + i * 9} color="#f6d5dc" o={1 - u * 0.4} /> : null; })}
            <Petri x={300} y={1050} r={150} medio="#f1d27a"><Colonia cx={0} cy={0} r={115 * kprog(T, K.Ro + 3.2, K.Ro + 4.6)} seed={9} /></Petri>
          </g>}
        </>)}
      </Escena>
      {/* 11 · dato extra: 40 millones de esporas por hora */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {NUBE.map((p, i) => { const u = ((T - K.D) * p.vel / 600 + p.fase) % 1; if (T < K.D + 0.3) return null;
            return <Espora key={i} x={320 + p.x0 * (1 - u * 0.3) + p.vx * u * 3} y={990 + u * 260} rx={6} ry={4} rot={i * 23} o={(1 - u) * 0.9} />; })}
          <Champinon x={320} y={1170} s={1.2} lam="#5a3326" />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo frasco siembra una bolsa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <BolsaCultivo T={T} x={820} y={1020} w={300} h={440} col={0.05 + 0.5 * kprog(T, K.C + 1.6, K.Ou + 1)} seed={12} />
          {vac > 0.95 && Array.from({ length: 12 }, (_, i) => { const u = ((T - K.C) * 1.6 + i / 12) % 1; return <Grano key={i} x={812 + (i % 3 - 1) * 14} y={735 + u * 170} rot={i * 40} s={1.1} col={1} seed={i} />; })}
          <FrascoGrano T={T} x={klerp(330, 470, vac)} y={klerp(1150, 520, vac)} s={klerp(1.2, 1.0, vac)} rot={120 * vac} col={1} nivel={1 - 0.6 * kprog(T, K.C + 1.3, K.Ou)} id="fc" />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.7} until={K.S - 0.3} texto="¿echados a perder?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.0} until={K.S - 0.3} texto="semilla de hongo" x={330} y={610} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.S + 3.0} until={K.L - 0.3} texto="esporas: 0" x={540} y={1100} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Es + 0.3} until={E2 - 0.2} texto="esporas de champiñón" x={420} y={470} tam={34} borde={KC.gold} mono />
      <Etq T={T} at={K.Es + 0.6} until={E2 - 0.2} x={60} y={545} texto="Agaricus bisporus" it tam={34} />
      <Chip T={T} at={K.Es + 2.2} until={E2 - 0.2} texto="germinan muy mal" x={420} y={760} tam={40} borde={KC.red} />
      <Chip T={T} at={E2 + 0.5} until={K.Cl - 0.3} texto="cada espora: posible cepa nueva" x={540} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={E2 + 1.4} until={K.Cl - 0.3} texto="resultado impredecible" x={540} y={565} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Cl + 2.8} until={K.R - 0.3} texto="cultivo de tejido ≈ clon" x={600} y={540} tam={38} borde="#118a3a" />
      <Chip T={T} at={K.R + 0.4} until={K.Lo - 0.3} texto="35 min · 121 °C" x={360} y={480} tam={50} borde={KC.ink} />
      <Chip T={T} at={K.R + 1.2} until={K.Lo - 0.3} texto="frasco de 250 ml" x={360} y={580} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.Lo + 0.2} until={K.P - 0.3} texto="cada lote siembra uno más grande" x={370} y={470} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.4} until={K.E + 2.6} texto="spawn de estiércol · hasta los años 30" x={540} y={520} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.E + 2.4} until={E9 + 1.3} x={60} y={600} texto="James Sinden · Penn State" tam={36} color={KC.white} />
      <Chip T={T} at={E9 + 0.2} until={E9 + 1.5} texto="creció más rápido" x={760} y={660} tam={36} borde="#118a3a" />
      <TarjetaEstudio T={T} at={E9 + 1.5} until={E9 + 3.2} anio="1932" quien="James Sinden · Penn State" revista="patente de EE. UU. 1,869,517" x={540} y={620} />
      <Chip T={T} at={E9 + 3.4} until={K.Ro - 0.3} texto="hoy: casi todo el spawn comercial" x={480} y={720} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Ro + 0.5} until={K.Ro + 2.5} x={60} y={600} texto="olla de presión = autoclave" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ro + 3.0} until={K.D - 0.3} x={60} y={480} texto="seta rosa · Pleurotus djamor" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ro + 3.6} until={K.D - 0.3} x={60} y={860} texto="PDA · mi cepa" tam={30} color={KC.ink} />
      <Chip T={T} at={K.D + 0.3} until={K.D + 2.4} texto="esporas → cepas nuevas" x={420} y={480} tam={38} borde={KC.gold} />
      <NumeroGigante T={T} at={K.D + 2.6} until={K.C - 0.3} valor={40000000} dur={2.2} etiqueta="esporas por hora" x={500} y={760} tam={120} color={KC.gold2} />
      <Etq T={T} at={K.D + 2.0} until={K.C - 0.3} x={560} y={1010} texto="3 pulgadas ≈ 7.6 cm" tam={30} />
      <Etq T={T} at={K.D + 2.4} until={K.C - 0.3} x={560} y={1060} texto="Agaricus bisporus" it tam={30} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="para cosechar: el clon" x={330} y={1120} tam={40} borde="#118a3a" />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.S} texto="5 cm" largo={130} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.L} texto="dibujo esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.L} until={K.Es} texto="5 mm (dentro de la lupa)" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={E2} texto="10 µm (esporas, esquemáticas)" largo={46} />
      <BarraEscala T={T} at={E2} until={K.Cl} texto="5 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.Cl} until={K.R} texto="5 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.Lo} texto="50 cm" largo={300} color={KC.ink} />
      <BarraEscala T={T} at={K.Lo} until={K.P} texto="10 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Ro} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ro} until={K.D} texto="5 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="5 cm" largo={237} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={130} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.S - 0.1} texto="No están echados a perder: *es semilla de hongo.*" />
      <Subtitulo T={T} idx={1} at={K.S + 0.1} until={K.L - 0.1} texto="Spawn: grano esterilizado *cubierto de micelio.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.Es - 0.1} texto="Cada grano, *forrado de hifas.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={E2 - 0.1} texto="¿Esporas? *Germinan muy mal.*" />
      <Subtitulo T={T} idx={4} at={E2 + 0.1} until={K.Cl - 0.1} texto="Cada una, *puede ser cepa nueva.*" />
      <Subtitulo T={T} idx={5} at={K.Cl + 0.1} until={K.R - 0.1} texto="Cultivo de tejido: *casi un clon.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Lo - 0.1} texto="Autoclave: *35 min a 121 °C.*" />
      <Subtitulo T={T} idx={7} at={K.Lo + 0.1} until={K.P - 0.1} texto="Cada lote *siembra otro más grande.*" />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y antes, *qué usaban?*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={E9 - 0.1} texto="Estiércol… y luego, *granos.*" />
      <Subtitulo T={T} idx={10} at={E9 + 0.1} until={K.Ro - 0.1} texto="Patente de 1932: *hoy, casi todo.*" />
      <Subtitulo T={T} idx={11} at={K.Ro + 0.1} until={K.D - 0.1} texto="Mi olla de presión y *mi propia cepa.*" />
      <Subtitulo T={T} idx={12} at={K.D + 0.1} until={K.C - 0.1} texto="*40 millones* de esporas por hora." />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Para cosechar, *se siembra el clon.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.3, 'avatar_11_sorprendido', 'gancho'],
        [K.S + 0.5, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.3, E2 - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cl + 0.3, K.R - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Lo + 0.3, K.P - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [E9 + 3.3, K.Ro - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ro + 0.2, K.D - 0.2, 'avatar_13_senalando_arriba', 'grande'],
        [K.D + 0.4, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="107" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SemillaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SemillaShot /></CompositionStage></div>;
}
window.SemillaApp = SemillaApp;
