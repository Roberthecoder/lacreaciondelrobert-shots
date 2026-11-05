// Shot Fungi Mati #85 · Ese anillo rojo no es un gusano: es un hongo, y te lo pasó tu gato — NARRADO (N1 Por dentro + N2 El número).
// La tiña (ringworm), Microsporum canis. Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico ni veterinario.

const TG = { naranja:'#f29a3a', naranja2:'#c8661c', crema:'#ffe3b8', rosa:'#ff8fa3', piel:'#f2c29b', piel2:'#e3a983', anillo:'#d63a3a', anillo2:'#f07a6e',
  hifa:'#eafff7', escama:'#f1dc9a', escama2:'#d9c27c', peloH:'#6b4528', peloG:'#e9a24f', espora:'#f6f1dc', uv:'#a8ff3e', uvFondo:'#130a29', persona:'#ff6b2c' };

// ---------- Gato atigrado sentado, de frente. Base (x, y) = entre las patas. Alto ≈ 550·s.
function Gato({ T, x, y, s = 1, ojos = 'abiertos', ronroneo = 0, brillo = 0, tenue = 0 }) {
  const vib = ronroneo ? Math.sin(T * 38) * 1.4 * ronroneo : 0;
  const resp = 1 + Math.sin(T * 2.2) * 0.012;
  const N = tenue ? mixHex(TG.naranja, '#5a3a2a', tenue) : TG.naranja, N2 = tenue ? mixHex(TG.naranja2, '#3a2418', tenue) : TG.naranja2, CR = tenue ? mixHex(TG.crema, '#6a5646', tenue) : TG.crema;
  const cola = Math.sin(T * 1.6) * 14;
  return <g transform={`translate(${x + vib} ${y}) scale(${s})`}>
    <path d={`M 140 -40 Q 300 -50 ${285 + cola * 0.3} -190 Q ${275 + cola} -270 ${215 + cola} -300`} stroke={KC.ink} strokeWidth={52} fill="none" strokeLinecap="round" />
    <path d={`M 140 -40 Q 300 -50 ${285 + cola * 0.3} -190 Q ${275 + cola} -270 ${215 + cola} -300`} stroke={N} strokeWidth={38} fill="none" strokeLinecap="round" />
    <path d={`M 140 -40 Q 300 -50 ${285 + cola * 0.3} -190 Q ${275 + cola} -270 ${215 + cola} -300`} stroke={N2} strokeWidth={38} fill="none" strokeDasharray="16 30" />
    <g transform={`scale(1 ${resp})`}>
      <ellipse cx={0} cy={-178} rx={192} ry={182} fill={N} stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2, 3].map((k) => <g key={k}>
        <path d={`M ${-186 + k * 4} ${-262 + k * 48} Q ${-150} ${-250 + k * 48} ${-128} ${-226 + k * 48}`} stroke={N2} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={`M ${186 - k * 4} ${-262 + k * 48} Q ${150} ${-250 + k * 48} ${128} ${-226 + k * 48}`} stroke={N2} strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>)}
      <ellipse cx={0} cy={-200} rx={96} ry={132} fill={CR} />
      {[-70, 70].map((px) => <g key={px}><ellipse cx={px} cy={-20} rx={56} ry={30} fill={CR} stroke={KC.ink} strokeWidth={6} />
        {[-14, 6].map((d) => <line key={d} x1={px + d} y1={-6} x2={px + d} y2={-20} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />)}</g>)}
    </g>
    <g transform={`translate(0 ${-400 * resp}) rotate(${Math.sin(T * 0.9) * 2})`}>
      {[-1, 1].map((d) => <g key={d}>
        <path d={`M ${-122 * d} -40 L ${-104 * d} -150 L ${-28 * d} -96 Z`} fill={N} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M ${-104 * d} -58 L ${-96 * d} -124 L ${-50 * d} -92 Z`} fill={tenue ? '#6b4a52' : TG.rosa} />
      </g>)}
      <ellipse cx={0} cy={0} rx={142} ry={120} fill={N} stroke={KC.ink} strokeWidth={7} />
      {[[-30, -112, -22, -70], [0, -118, 0, -72], [30, -112, 22, -70]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={N2} strokeWidth={11} strokeLinecap="round" />)}
      {[-1, 1].map((d) => [0, 30].map((dy) => <line key={d + '' + dy} x1={-140 * d} y1={-6 + dy} x2={-104 * d} y2={-2 + dy} stroke={N2} strokeWidth={10} strokeLinecap="round" />))}
      <ellipse cx={0} cy={38} rx={72} ry={46} fill={CR} />
      {ojos === 'cerrados'
        ? [-1, 1].map((d) => <path key={d} d={`M ${-78 * d} -8 Q ${-52 * d} -36 ${-26 * d} -8`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />)
        : [-1, 1].map((d) => <g key={d}><ellipse cx={-52 * d} cy={-14} rx={25} ry={29} fill="#9be15d" stroke={KC.ink} strokeWidth={5} />
          <ellipse cx={-52 * d} cy={-12} rx={8} ry={21} fill={KC.ink} /><circle cx={-44 * d} cy={-24} r={6} fill="#fff" /></g>)}
      <path d="M -15 20 L 15 20 L 0 34 Z" fill={TG.rosa} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 0 34 Q -12 54 -30 46 M 0 34 Q 12 54 30 46" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      {[-1, 1].map((d) => [[-60, 32, -176, 18], [-60, 44, -174, 52]].map(([a, b, c, e], i) => <line key={d + '' + i} x1={a * d} y1={b} x2={c * d} y2={e} stroke={KC.ink} strokeWidth={3} />))}
    </g>
    {brillo > 0 && <g opacity={brillo}>
      <path d="M -110 -470 Q -60 -505 0 -505" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M -150 -260 Q -140 -320 -100 -340" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".6" />
      {[[-200, -420], [190, -460], [230, -200]].map(([a, b], i) => { const k = 0.6 + 0.4 * Math.sin(T * 5 + i * 2); return <path key={i} d={`M ${a} ${b - 26 * k} L ${a + 7} ${b - 7} L ${a + 26 * k} ${b} L ${a + 7} ${b + 7} L ${a} ${b + 26 * k} L ${a - 7} ${b + 7} L ${a - 26 * k} ${b} L ${a - 7} ${b - 7} Z`} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />; })}
    </g>}
  </g>;
}

// ---------- El brazo que abraza al gato (de la orilla izquierda a la mano). anillo 0..1 = la roncha; claro 0..1 = el centro se aclara.
const BRAZO = { x0: -80, y0: 1068, cx: 250, cy: 1010, x1: 560, y1: 1028, g: 150 };
function qpt(u, B = BRAZO) { const a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u; return [a * B.x0 + b * B.cx + c * B.x1, a * B.y0 + b * B.cy + c * B.y1]; }
function Brazo({ T, anillo = 0, claro = 0.3, rasca = 0 }) {
  const B = BRAZO, d = `M ${B.x0} ${B.y0} Q ${B.cx} ${B.cy} ${B.x1} ${B.y1}`;
  const [rx, ry] = qpt(0.4); const [ax, ay] = qpt(0.38), [bx, by] = qpt(0.42); const ang = Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
  const k = kEase.sale(kclamp(anillo, 0, 1));
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={B.g + 14} fill="none" strokeLinecap="round" />
    <path d={d} stroke={TG.piel} strokeWidth={B.g} fill="none" strokeLinecap="round" />
    <path d={d} stroke={TG.piel2} strokeWidth={B.g * 0.25} fill="none" transform="translate(0 46)" opacity=".55" />
    {/* mano sobre el lomo del gato */}
    <g transform={`translate(${B.x1 + 30} ${B.y1 - 6}) rotate(8)`}>
      {[[-6, 50], [26, 56], [56, 50], [82, 36]].map(([fx, fy], i) => <ellipse key={i} cx={fx} cy={fy} rx={20} ry={44} fill={TG.piel} stroke={KC.ink} strokeWidth={6} transform={`rotate(${-14 + i * 6} ${fx} ${fy})`} />)}
      <ellipse cx={18} cy={0} rx={82} ry={66} fill={TG.piel} stroke={KC.ink} strokeWidth={7} />
    </g>
    {/* la roncha en anillo */}
    {k > 0.01 && <g transform={`translate(${rx} ${ry}) rotate(${ang})`}>
      <ellipse rx={84 * k} ry={52 * k} fill={TG.anillo2} opacity={0.45 * (1 - claro)} />
      <ellipse rx={84 * k} ry={52 * k} fill="none" stroke={TG.anillo} strokeWidth={17} opacity={Math.min(1, k * 1.3)} />
      {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <path key={i} d={`M ${Math.cos(a) * 84 * k - 6} ${Math.sin(a) * 52 * k} q 6 -6 12 0`} stroke="#ffd9d0" strokeWidth={3} fill="none" opacity={k} />; })}
    </g>}
    {/* comezón */}
    {rasca > 0 && [[-120, -86], [110, -84], [0, -112]].map(([dx, dy], i) => <path key={i} d={`M ${rx + dx - 18} ${ry + dy} l 10 -14 l 10 14 l 10 -14 l 10 14`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={rasca * (0.5 + 0.5 * Math.sin(T * 14 + i * 2))} />)}
  </g>;
}

// Gusanito de caricatura (el "gusano" que NO es).
function Gusanito({ T, x, y, o = 1 }) {
  const pts = Array.from({ length: 9 }, (_, i) => [x - i * 22, y + Math.sin(T * 8 - i * 0.9) * 12]);
  return <g opacity={o}>
    {pts.slice().reverse().map(([a, b], i) => <circle key={i} cx={a} cy={b} r={22 - i * 0.4} fill="#f7a6c0" stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={x + 6} cy={y - 6} r={5} fill={KC.ink} /><circle cx={x - 8} cy={y - 8} r={5} fill={KC.ink} />
  </g>;
}

// ---------- Hifa tabicada que crece por la punta. pts = polilínea; p 0..1.
function Hifa({ pts, p = 1, w = 20, color = TG.hifa, septo = 58 }) {
  if (p <= 0) return null;
  const seg = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
  const lim = L * kclamp(p, 0, 1), out = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    if (acc + seg[i - 1] >= lim) { const u = (lim - acc) / seg[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; }
    out.push(pts[i]); acc += seg[i - 1];
  }
  const d = 'M ' + out.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const septos = []; let a2 = 0;
  for (let i = 1; i < out.length; i++) { const dx = out[i][0] - out[i - 1][0], dy = out[i][1] - out[i - 1][1], l = Math.hypot(dx, dy) || 1;
    for (let s = septo - (a2 % septo); s < l; s += septo) { const px = out[i - 1][0] + dx * s / l, py = out[i - 1][1] + dy * s / l, nx = -dy / l * w * 0.45, ny = dx / l * w * 0.45;
      septos.push(<line key={septos.length} x1={px - nx} y1={py - ny} x2={px + nx} y2={py + ny} stroke={KC.ink} strokeWidth={3} />); }
    a2 += l; }
  return <g><path d={d} stroke={KC.ink} strokeWidth={w + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />{septos}</g>;
}

// ---------- Pelo con su manguito de esporas por fuera (ectótrix). cuff 0..1 = cuánto del pelo ya está forrado (de abajo hacia arriba).
function PeloManguito({ x0, y0, x1, y1, w = 170, cuff = 1, color = TG.peloG, esporas = TG.espora, seed = 3, cuticula = true }) {
  const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux, ang = Math.atan2(uy, ux) * 180 / Math.PI;
  const g = krng(seed), sp = [];
  for (let s = 10; s < L - 6; s += 19) {
    const vis = (L - s) / L <= cuff; // crece desde (x1, y1) = la raíz
    for (const lado of [-1, 1]) for (let capa = 0; capa < 2; capa++) {
      const off = w / 2 + 9 + capa * 17 + (g() - 0.5) * 5, ss = s + (capa ? 9 : 0) + (g() - 0.5) * 4;
      if (!vis) continue;
      const px = x0 + ux * ss + nx * off * lado, py = y0 + uy * ss + ny * off * lado;
      sp.push(<ellipse key={sp.length} cx={px} cy={py} rx={11} ry={8} transform={`rotate(${ang} ${px} ${py})`} fill={esporas} stroke={KC.ink} strokeWidth={2.5} />);
    }
  }
  return <g>
    <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KC.ink} strokeWidth={w + 12} strokeLinecap="butt" />
    <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={color} strokeWidth={w} strokeLinecap="butt" />
    {cuticula && Array.from({ length: Math.floor(L / 46) }, (_, i) => { const s = 20 + i * 46, cx = x0 + ux * s, cy = y0 + uy * s;
      return <path key={i} d={`M ${cx + nx * w * 0.46} ${cy + ny * w * 0.46} Q ${cx - ux * 22} ${cy - uy * 22} ${cx - nx * w * 0.46} ${cy - ny * w * 0.46}`} stroke="rgba(0,0,0,.28)" strokeWidth={4} fill="none" />; })}
    <line x1={x0 + nx * w * 0.22} y1={y0 + ny * w * 0.22} x2={x1 + nx * w * 0.22} y2={y1 + ny * w * 0.22} stroke="rgba(255,255,255,.25)" strokeWidth={w * 0.12} />
    {sp}
  </g>;
}

// ---------- Macroconidio de Microsporum canis: huso de pared gruesa y rugosa, 6–15 compartimentos y botón asimétrico en la punta. (Sin tamaño real.)
function Macroconidio({ x, y, L = 340, W = 90, rot = 0, n = 8, crece = 1, seed = 2 }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece, 0, 1));
  const ancho = (u, lado) => { const base = W / 2 * Math.pow(Math.sin(Math.PI * kclamp(u, 0, 1)), 0.75); const boton = lado < 0 ? W * 0.16 * Math.exp(-Math.pow((u - 0.92) / 0.035, 2)) : 0; return base + boton; };
  const contorno = (esc) => { const arr = []; for (let i = 0; i <= 40; i++) { const u = i / 40; arr.push([(u - 0.5) * L, -ancho(u, -1) * esc]); } for (let i = 40; i >= 0; i--) { const u = i / 40; arr.push([(u - 0.5) * L, ancho(u, 1) * esc]); } return 'M ' + arr.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z'; };
  const g = krng(seed), puas = [];
  for (let i = 3; i < 38; i++) { const u = i / 40; if (g() < 0.35) continue; for (const lado of [-1, 1]) { const px = (u - 0.5) * L, py = lado * ancho(u, lado); puas.push(<line key={puas.length} x1={px} y1={py} x2={px + (g() - 0.5) * 4} y2={py + lado * (5 + g() * 5)} stroke="#c9a96b" strokeWidth={3} strokeLinecap="round" />); } }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
    {puas}
    <path d={contorno(1)} fill="#c9a96b" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={contorno(0.66)} fill="#fbf1d2" stroke="#a9874e" strokeWidth={2} strokeLinejoin="round" transform="scale(0.94 1)" />
    {Array.from({ length: n - 1 }, (_, i) => { const u = (i + 1) / n * 0.86 + 0.07, px = (u - 0.5) * L * 0.94, h = Math.min(ancho(u, 1), ancho(u, -1)) * 0.66; return <path key={i} d={`M ${px} ${-h} Q ${px + 7} 0 ${px} ${h}`} stroke="#a9874e" strokeWidth={4} fill="none" />; })}
  </g>;
}

// ---------- Personita (cuadrícula del estudio).
function Personita({ x, y, s = 1, color = '#fff', o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-26} r={13} fill={color} stroke={KC.ink} strokeWidth={4} />
    <path d="M -19 18 L -19 0 Q -19 -10 -8 -11 L 8 -11 Q 19 -10 19 0 L 19 18 Z" fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}

// ---------- Casa en corte (dos cuartos, puerta abierta entre ellos).
function Casa({ T }) {
  return <g>
    <rect x={60} y={470} width={960} height={690} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={60} y={1100} width={960} height={60} fill="#d8c3a0" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={60 + i * 80} y1={1100} x2={60 + i * 80} y2={1160} stroke="#b89f78" strokeWidth={4} />)}
    <rect x={550} y={470} width={22} height={420} fill="#c9bba4" stroke={KC.ink} strokeWidth={6} />
    {/* tapete y cama */}
    <ellipse cx={300} cy={1104} rx={190} ry={22} fill="#7cc6ff" stroke={KC.ink} strokeWidth={5} />
    <g transform="translate(700 960)">
      <rect x={0} y={60} width={300} height={80} rx={10} fill="#8a5a36" stroke={KC.ink} strokeWidth={6} />
      <rect x={0} y={20} width={300} height={60} rx={16} fill="#ffffff" stroke={KC.ink} strokeWidth={6} />
      <rect x={110} y={16} width={190} height={70} rx={18} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
      <rect x={14} y={-4} width={90} height={42} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <rect x={-6} y={-60} width={22} height={200} rx={8} fill="#8a5a36" stroke={KC.ink} strokeWidth={6} />
    </g>
    {/* letrero "sin gato" */}
    <g transform="translate(830 790)">
      <rect x={-110} y={-62} width={220} height={124} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <g transform="translate(-50 6) scale(0.5)"><circle r={50} fill={TG.naranja} stroke={KC.ink} strokeWidth={8} />
        <path d="M -48 -20 L -36 -70 L -10 -44 Z M 48 -20 L 36 -70 L 10 -44 Z" fill={TG.naranja} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
      <circle cx={-50} cy={6} r={40} fill="none" stroke={KC.red} strokeWidth={8} /><line x1={-78} y1={-22} x2={-22} y2={34} stroke={KC.red} strokeWidth={8} />
      <text x={36} y={-4} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>SIN</text>
      <text x={36} y={32} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>GATO</text>
    </g>
  </g>;
}

// Mota de polvo con esporas.
function Mota({ x, y, r = 13, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill="#9aa1a8" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={x - 4} cy={y - 3} rx={5} ry={3.6} fill={TG.espora} stroke={KC.ink} strokeWidth={1.5} /><ellipse cx={x + 5} cy={y + 4} rx={5} ry={3.6} fill={TG.espora} stroke={KC.ink} strokeWidth={1.5} /></g>;
}

// Calendario de hojas que pasan (12 meses).
function Calendario({ x, y, mes = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-70} width={160} height={150} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-70} width={160} height={42} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {[-40, 40].map((d) => <rect key={d} x={d - 6} y={-86} width={12} height={30} rx={6} fill={KC.ink} />)}
    <text y={58} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>{Math.max(1, Math.round(mes))}</text>
    <text y={-38} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">MES</text>
  </g>;
}

// Íconos de "lo que sí sirve".
function Icono({ tipo, x, y, T, ok = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={56} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {tipo === 'vet' && <g><path d="M -26 -30 L -26 0 Q -26 26 0 26 Q 26 26 26 0 L 26 -30" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M 0 26 L 0 34 Q 0 44 14 44" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /><circle cx={24} cy={40} r={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
      <circle cx={-26} cy={-34} r={6} fill={KC.ink} /><circle cx={26} cy={-34} r={6} fill={KC.ink} /></g>}
    {tipo === 'manos' && <g><rect x={-30} y={-6} width={60} height={34} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      {[[-18, -22, 10], [6, -32, 13], [24, -18, 8]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b + Math.sin(T * 4 + i) * 3} r={r} fill="rgba(160,220,255,.6)" stroke={KC.ink} strokeWidth={3} />)}</g>}
    {tipo === 'aspira' && <g><rect x={-34} y={-4} width={44} height={34} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <path d="M 10 6 Q 30 0 30 -24 L 30 -36" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /><rect x={18} y={-44} width={30} height={12} rx={5} fill={KC.ink} />
      <circle cx={-24} cy={32} r={7} fill={KC.ink} /><circle cx={0} cy={32} r={7} fill={KC.ink} /></g>}
    {tipo === 'cama' && <g><rect x={-38} y={-4} width={76} height={30} rx={10} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} />
      <rect x={-34} y={-20} width={28} height={18} rx={7} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      {[[16, -26, 9], [32, -38, 7], [0, -40, 6]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b + Math.sin(T * 4 + i) * 3} r={r} fill="rgba(160,220,255,.6)" stroke={KC.ink} strokeWidth={3} />)}</g>}
    {ok > 0 && <g transform={`translate(44 -40) scale(${ok})`}><circle r={26} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
      <path d="M -11 0 L -3 9 L 12 -9" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
  </g>;
}

// Corazón.
function Corazon({ x, y, s = 1, o = 1 }) {
  return <path d="M 0 30 C -60 -10 -40 -60 0 -30 C 40 -60 60 -10 0 30 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" opacity={o} />;
}

// Hifas de la escena de la queratina (de la orilla del anillo hacia el pelo).
const HIFAS_Q = [
  { pts: [[1100, 760], [940, 770], [800, 752], [640, 768], [470, 760], [340, 742]], t0: 0.2, t1: 3.0 },
  { pts: [[1100, 870], [960, 880], [820, 864], [700, 878], [560, 866]], t0: 0.4, t1: 3.2 },
  { pts: [[1100, 980], [970, 968], [840, 984], [720, 972]], t0: 0.6, t1: 3.2 },
  { pts: [[800, 752], [770, 806], [700, 826]], t0: 1.5, t1: 2.6 },
  { pts: [[700, 878], [660, 930], [600, 960]], t0: 1.8, t1: 3.0 },
  { pts: [[340, 742], [340, 680], [344, 620]], t0: 2.4, t1: 3.4 },
];

function Sofa() {
  return <g>
    <rect x={-20} y={1150} width={1120} height={800} fill="#3f2a7a" stroke={KC.ink} strokeWidth={9} />
    <rect x={-20} y={1150} width={1120} height={70} rx={30} fill="#5a3fa8" stroke={KC.ink} strokeWidth={8} />
    {[180, 540, 900].map((x) => <circle key={x} cx={x} cy={1320} r={10} fill="#2a1b55" />)}
  </g>;
}

function TinaGatoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, A: CUES.Anillo, Q: CUES.Queratina, Ca: CUES.Canis, M: CUES.Manguito, P: CUES.Portador, U: CUES.UV, Es: CUES.Estudio, Po: CUES.Polvo, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // UV: la lámpara barre de izquierda a derecha
  const barrido = klerp(60, 1020, kprog(T, K.U + 0.5, K.U + 2.8, kEase.suave));
  const PELOS_UV = (() => { const g = krng(85), out = []; for (let i = 0; i < 30; i++) { const x = 70 + i * 32 + (g() - 0.5) * 12, base = 1120 - 150 * Math.sin(Math.PI * (x - 20) / 1040);
    const inf = g() < 0.55, br = inf && g() < 0.62; out.push({ x, base, L: 150 + g() * 70, lean: (g() - 0.5) * 0.5, inf, br, i }); } return out; })();
  const etiquetaUV = PELOS_UV.find((h) => h.inf && !h.br && h.x > 430 && h.x < 640) || PELOS_UV.find((h) => h.inf && !h.br && h.x > 220 && h.x < 820) || PELOS_UV[8];
  const casilla = (i) => ({ x: 120 + (i % 10) * 56, y: 500 + Math.floor(i / 10) * 76 });
  const rojas = Math.floor(43 * kprog(T, K.Es + 3.9, K.Es + 6.0, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el anillo rojo en el brazo de quien abraza a su gato */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05} origen="30% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Sofa />
          <Gato T={T} x={560} y={1188} s={0.88} ojos="cerrados" ronroneo={1} />
          <Brazo T={T} anillo={kprog(T, K.G + 0.1, K.G + 0.9)} rasca={kprog(T, K.G + 0.6, K.G + 0.9) * (1 - kprog(T, K.G + 2.3, K.G + 2.6))} />
          {T < K.G + 2.6 && <Gusanito T={T} x={330} y={905} o={kprog(T, K.G + 0.5, K.G + 0.8) * (1 - kprog(T, K.G + 2.2, K.G + 2.5))} />}
          {T > K.G + 1.7 && T < K.G + 2.5 && <path d="M 130 850 L 360 960 M 360 850 L 130 960" stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={kprog(T, K.G + 1.7, K.G + 1.9) * (1 - kprog(T, K.G + 2.2, K.G + 2.5))} />}
          <Sello T={T} at={K.G + 2.4} x={300} y={590} texto="HONGO" color={KC.ink} r={108} />
          {(() => { const p = kprog(T, K.G + 2.9, K.G + 3.5, kEase.sale); return p > 0 ? <path d="M 470 900 Q 380 830 270 960" stroke={KC.white} strokeWidth={12} fill="none" strokeDasharray="16 12" strokeLinecap="round" pathLength={1} style={{ strokeDasharray:`${p} 1` }} /> : null; })()}
        </>)}
      </Escena>
      {/* 2 · el nombre: tiña · ringworm = "gusano de anillo" */}
      <Escena T={T} a={K.N} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g transform={`translate(0 0)`}><Brazo T={T} anillo={1} claro={0.3} /></g>
          <g opacity={kprog(T, K.N + 0.1, K.N + 0.4)} transform={`translate(360 ${600}) scale(${klerp(1.3, 1, kprog(T, K.N + 0.1, K.N + 0.5, kEase.rebote))})`}>
            <text textAnchor="middle" style={{ font:`400 230px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke">TIÑA</text>
          </g>
          <g opacity={kprog(T, K.N + 1.1, K.N + 1.4)}>
            <text x={70} y={680} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>en inglés:</text>
            <text x={230} y={790} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">RING</text>
            <text x={490} y={790} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">WORM</text>
          </g>
          <g opacity={kprog(T, K.N + 1.7, K.N + 2.0)}>
            <text x={230} y={848} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>anillo</text>
            <text x={490} y={848} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>gusano</text>
          </g>
          {T > K.N + 2.5 && <path d={`M 390 712 L ${klerp(390, 590, kprog(T, K.N + 2.5, K.N + 2.8))} ${klerp(712, 862, kprog(T, K.N + 2.5, K.N + 2.8))}`} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}
          {T > K.N + 2.65 && <path d={`M 590 712 L ${klerp(590, 390, kprog(T, K.N + 2.65, K.N + 2.95))} ${klerp(712, 862, kprog(T, K.N + 2.65, K.N + 2.95))}`} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}
          {(() => { const [rx, ry] = qpt(0.4), p = kprog(T, K.N + 2.9, K.N + 3.4); return p > 0 ? <ellipse cx={rx} cy={ry} rx={118} ry={88} fill="none" stroke={KC.white} strokeWidth={7} strokeDasharray="18 12" strokeDashoffset={-T * 40} opacity={p} /> : null; })()}
        </>)}
      </Escena>
      {/* 3 · el anillo crece hacia afuera y el centro se aclara */}
      <Escena T={T} a={K.A} b={K.Q} zoom={0.06} origen="50% 42%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={40} y={380} width={1000} height={800} rx={70} fill={TG.piel} stroke={KC.ink} strokeWidth={9} />
          {(() => { const g = krng(8); return Array.from({ length: 26 }, (_, i) => { const x = 80 + g() * 920, y = 420 + g() * 720; return <path key={i} d={`M ${x} ${y} q 10 -14 22 -18`} stroke="#a77a5a" strokeWidth={3} fill="none" opacity=".6" />; }); })()}
          {(() => { const R = 150 + 135 * kprog(T, K.A, K.A + 3.4, kEase.suave), claro = kprog(T, K.A + 0.8, K.A + 3.0), cx = 540, cy = 780;
            return <g>
              <circle cx={cx} cy={cy} r={R} fill={TG.anillo2} opacity={0.5 * (1 - claro) + 0.08} />
              <circle cx={cx} cy={cy} r={R * (0.25 + 0.6 * claro)} fill={TG.piel} opacity={claro} />
              <circle cx={cx} cy={cy} r={R} fill="none" stroke={TG.anillo} strokeWidth={42} />
              {Array.from({ length: 36 }, (_, i) => { const a = (i / 36) * Math.PI * 2 + 0.1; return <path key={i} d={`M ${cx + Math.cos(a) * (R - 10)} ${cy + Math.sin(a) * (R - 10)} q ${Math.cos(a + 1.4) * 14} ${Math.sin(a + 1.4) * 14} ${Math.cos(a) * 16} ${Math.sin(a) * 16}`} stroke="#ffe1d8" strokeWidth={4} fill="none" />; })}
              {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + Math.PI / 8, o = kprog(T, K.A + 0.4, K.A + 0.8), d0 = R + 40 + 12 * Math.sin(T * 5); const x0 = cx + Math.cos(a) * d0, y0 = cy + Math.sin(a) * d0, x1 = cx + Math.cos(a) * (d0 + 60), y1 = cy + Math.sin(a) * (d0 + 60);
                return <g key={i} opacity={o}><line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
                  <path d={`M ${x1 + Math.cos(a + 2.5) * 24} ${y1 + Math.sin(a + 2.5) * 24} L ${x1} ${y1} L ${x1 + Math.cos(a - 2.5) * 24} ${y1 + Math.sin(a - 2.5) * 24}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
            </g>; })()}
        </>)}
      </Escena>
      {/* 4 · al microscopio: hifas que se alimentan de queratina (capa de afuera de la piel y pelo) */}
      <Escena T={T} a={K.Q} b={K.Ca} zoom={0.05} origen="60% 50%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g clipPath="url(#irisQ)">
            <clipPath id="irisQ"><circle cx={760} cy={830} r={1400 * kprog(T, K.Q - 0.35, K.Q + 0.5, kEase.sale)} /></clipPath>
            <rect x={0} y={0} width={KW} height={KH} fill={KC.noche} />
            {/* capas vivas de abajo */}
            {Array.from({ length: 18 }, (_, i) => <ellipse key={'c' + i} cx={30 + i * 62} cy={1110 + (i % 2) * 20} rx={34} ry={28} fill="#e9a3a8" stroke={KC.ink} strokeWidth={3} opacity=".85" />)}
            {/* capa córnea: escamas de queratina en tejas */}
            {Array.from({ length: 12 }, (_, f) => Array.from({ length: 9 }, (_, c) => {
              const y = 700 + f * 32, x = -40 + c * 136 + (f % 2) * 68;
              const comida = HIFAS_Q.some((h) => { const p = kprog(T, K.Q + h.t0, K.Q + h.t1); const tip = klerp(h.pts[0][0], h.pts[h.pts.length - 1][0], p); return Math.abs(h.pts[0][1] - y) < 40 && x + 60 > tip && p > 0; });
              return <rect key={f + '-' + c} x={x} y={y} width={128} height={comida ? 16 : 26} rx={10} fill={comida ? TG.escama2 : TG.escama} stroke={KC.ink} strokeWidth={3} opacity={comida ? 0.55 : 0.95} />;
            }))}
            {/* pelo que sale de la piel */}
            <PeloManguito x0={240} y0={330} x1={240} y1={1180} w={170} cuff={0} color={TG.peloH} />
            {HIFAS_Q.map((h, i) => <Hifa key={i} pts={h.pts} p={kprog(T, K.Q + h.t0, K.Q + h.t1)} w={20} />)}
          </g>
        </>)}
      </Escena>
      {/* 5 · el 90 % y los macroconidios en huso */}
      <Escena T={T} a={K.Ca} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {(() => { const o = kprog(T, K.Ca + 1.1, K.Ca + 1.5); return o > 0 ? <g opacity={o}>
            <rect x={50} y={800} width={980} height={380} rx={40} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <Macroconidio x={330} y={1040} L={380} W={96} rot={-14} n={9} crece={kprog(T, K.Ca + 1.4, K.Ca + 2.6)} seed={3} />
            <Macroconidio x={760} y={1010} L={330} W={86} rot={13} n={7} crece={kprog(T, K.Ca + 1.9, K.Ca + 3.0)} seed={7} />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 6 · el manguito de esporas por fuera del pelo */}
      <Escena T={T} a={K.M} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {(() => { const sac = T > K.M + 2.6 && T < K.M + 3.7 ? Math.sin((T - K.M - 2.6) * 32) * 26 * (1 - kprog(T, K.M + 2.6, K.M + 3.7)) : 0;
            return <g transform={`translate(${sac} 0)`}><PeloManguito x0={420} y0={330} x1={640} y1={1190} w={170} cuff={kprog(T, K.M + 0.2, K.M + 2.2, kEase.suave)} seed={11} /></g>; })()}
          {T > K.M + 2.6 && T < K.M + 3.7 && [[300, 700], [780, 820], [330, 1000], [760, 560]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} q 20 -20 40 0 q 20 20 40 0`} stroke={KC.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7 * (1 - kprog(T, K.M + 3.2, K.M + 3.7))} />)}
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y si tu gato se ve sano? */}
      <Escena T={T} a={K.P} b={K.U} zoom={0.05} origen="30% 60%">
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Sofa />
          <Gato T={T} x={300} y={1180} s={0.72} ojos="abiertos" brillo={0.6} />
          <Interrogacion T={T} x={115} y={760} tam={230} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.P + 1.2} until={K.U - 0.3} x={330} y={575} r={120} fx={380} fy={1010} tinte={KC.cyan} etiqueta="SU PELO"
        interior={(TT, r) => <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#081420" />
          {[60, 120, 180].map((x, i) => <PeloManguito key={i} x0={x - 20} y0={-10} x1={x + 10} y1={2 * r + 10} w={34} cuff={1} seed={20 + i} cuticula={false} />)}
        </svg>} />
      {/* 8 · luz ultravioleta: pelos que brillan verde manzana (no todos) */}
      <Escena T={T} a={K.U} b={K.Es} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 60%, #2a1458 0%, ${TG.uvFondo} 70%)` }}></div>
        {fsvg(<>
          <path d={`M -20 1200 L -20 ${1120 - 150 * Math.sin(Math.PI * (-40) / 1040)} ${Array.from({ length: 23 }, (_, i) => { const x = -20 + i * 50; return `L ${x} ${1120 - 150 * Math.sin(Math.PI * (x - 20) / 1040)}`; }).join(' ')} L 1100 1200 Z`} fill="#5a3a2a" stroke={KC.ink} strokeWidth={8} />
          {PELOS_UV.map((h) => { const x2 = h.x + h.lean * h.L, y2 = h.base - h.L; const on = h.br && barrido > h.x - 20; const c = on ? TG.uv : '#9a7a5e';
            return <g key={h.i} style={on ? { filter:`drop-shadow(0 0 10px ${TG.uv}) drop-shadow(0 0 22px ${TG.uv})` } : null}>
              <line x1={h.x} y1={h.base} x2={x2} y2={y2} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
              <line x1={h.x} y1={h.base} x2={x2} y2={y2} stroke={c} strokeWidth={8} strokeLinecap="round" />
              {h.inf && Array.from({ length: 6 }, (_, k) => { const u = 0.08 + k * 0.1; return <g key={k}><circle cx={klerp(h.x, x2, u) - 8} cy={klerp(h.base, y2, u)} r={4.5} fill={on ? '#e4ffc0' : TG.espora} /><circle cx={klerp(h.x, x2, u) + 8} cy={klerp(h.base, y2, u) - 4} r={4.5} fill={on ? '#e4ffc0' : TG.espora} /></g>; })}
            </g>; })}
          {T > K.U + 3.4 && <g opacity={kprog(T, K.U + 3.4, K.U + 3.7)}><line x1={etiquetaUV.x + etiquetaUV.lean * etiquetaUV.L} y1={690} x2={etiquetaUV.x + etiquetaUV.lean * etiquetaUV.L} y2={etiquetaUV.base - etiquetaUV.L - 14} stroke={TG.espora} strokeWidth={5} strokeDasharray="10 8" />
            <circle cx={etiquetaUV.x + etiquetaUV.lean * etiquetaUV.L * 0.6} cy={etiquetaUV.base - etiquetaUV.L * 0.6} r={34} fill="none" stroke={TG.espora} strokeWidth={5} /></g>}
          {(() => { const o = kprog(T, K.U + 0.2, K.U + 0.5) * (1 - kprog(T, K.U + 4.2, K.U + 4.6)); return o > 0 ? <g opacity={o}>
            <path d={`M ${barrido - 70} 770 L ${barrido + 70} 770 L ${barrido + 190} 1060 L ${barrido - 190} 1060 Z`} fill="rgba(170,90,255,.28)" />
            <g transform={`translate(${barrido} 730)`}>
              <rect x={-110} y={-30} width={220} height={64} rx={20} fill="#2b2b33" stroke={KC.ink} strokeWidth={6} />
              <rect x={-90} y={18} width={180} height={22} rx={10} fill="#c58cff" style={{ filter:'drop-shadow(0 0 14px #b56bff)' }} />
              <rect x={90} y={-18} width={130} height={36} rx={14} fill="#3b3b45" stroke={KC.ink} strokeWidth={6} />
            </g>
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio de la Ciudad de México: 43 de 57 */}
      <Escena T={T} a={K.Es} b={K.Po} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {T > K.Es + 3.3 && Array.from({ length: 57 }, (_, i) => { const { x, y } = casilla(i), e = kprog(T, K.Es + 3.3 + i * 0.012, K.Es + 3.6 + i * 0.012, kEase.rebote);
            return <Personita key={i} x={x} y={y} s={e} color={i < rojas ? TG.persona : '#ffffff'} />; })}
        </>)}
      </Escena>
      {/* 10 · las esporas viajan en el polvo, hasta a cuartos sin gato */}
      <Escena T={T} a={K.Po} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Casa T={T} />
          <Gato T={T} x={300} y={1104} s={0.44} ojos="cerrados" />
          {Array.from({ length: 22 }, (_, i) => { const g = krng(300 + i), ph = g(); const u = ((T - K.Po) * 0.16 + ph) % 1; const x = klerp(460, 1000, u), y = 1000 + Math.sin(u * 9 + ph * 7) * 55 - (u > 0.65 ? (u - 0.65) * 300 : 0);
            return <Mota key={i} x={x} y={y} o={kprog(T, K.Po + 0.1 + ph * 0.6, K.Po + 0.5 + ph * 0.6) * Math.min(1, (1 - u) * 6)} />; })}
          {T > K.Po + 2.0 && <g opacity={kprog(T, K.Po + 2.0, K.Po + 2.3)}><Calendario x={170} y={610} mes={klerp(1, 12, kprog(T, K.Po + 2.2, K.Po + 3.6))} /></g>}
        </>)}
      </Escena>
      {/* 11 · lo que sí sirve */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {[['vet', 'gato al veterinario', 0.5], ['manos', 'lávate las manos', 1.9], ['aspira', 'aspira donde anda', 2.9], ['cama', 'desinfecta su cama', 3.9]].map(([tipo, txt, t0], i) => {
            const e = kprog(T, K.S + t0, K.S + t0 + 0.4, kEase.rebote); if (e <= 0) return null; const y = 720 + i * 130;
            return <g key={tipo} opacity={kprog(T, K.S + t0, K.S + t0 + 0.2)} transform={`translate(${(1 - e) * -60} 0)`}>
              <rect x={60} y={y - 58} width={720} height={116} rx={58} fill="rgba(14,15,18,.82)" stroke={KC.leaf} strokeWidth={5} />
              <Icono tipo={tipo} x={122} y={y} T={T} ok={kprog(T, K.S + t0 + 0.5, K.S + t0 + 0.8, kEase.rebote)} />
              <text x={210} y={y + 14} style={{ font:`900 42px ${KF.texto}` }} fill={KC.texto}>{txt}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo brazo y el mismo gato, ya curados */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="30% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Sofa />
          <Gato T={T} x={560} y={1188} s={0.88} ojos="cerrados" ronroneo={1} brillo={kprog(T, K.C + 0.3, K.C + 1.0)} />
          <Brazo T={T} anillo={1 - kprog(T, K.C, K.C + 0.8)} claro={1} />
          {(() => { const u = kprog(T, K.C + 0.3, K.C + 2.6); return u > 0 ? <Corazon x={790} y={klerp(920, 810, u)} s={klerp(0.6, 1.2, kEase.sale(Math.min(1, u * 3)))} o={1 - kprog(T, K.C + 3.6, K.C + 4.2)} /> : null; })()}
          <Sello T={T} at={K.C + 0.9} x={300} y={590} texto="SANOS" color={KC.leaf} r={118} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.7} until={K.G + 2.3} texto="¿gusano?" x={300} y={590} tam={56} />
      <Chip T={T} at={K.G + 3.0} until={K.N - 0.3} texto="del pelo de tu gato" x={250} y={780} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.N + 2.9} until={K.A - 0.3} texto="por la forma de la roncha" x={470} y={920} tam={32} borde={KC.red} />
      <Chip T={T} at={K.A + 0.5} until={K.Q - 0.3} texto="crece hacia afuera" x={540} y={430} tam={38} borde={KC.red} />
      <Chip T={T} at={K.A + 1.6} until={K.Q - 0.3} texto="el centro se aclara" x={540} y={1128} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Q + 0.6} until={K.Ca - 0.3} texto="se alimenta de queratina" x={420} y={470} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Q + 1.0} until={K.Ca - 0.3} x={340} y={670} texto="capa de afuera de la piel" tam={28} color={TG.escama} />
      <Etq T={T} at={K.Q + 1.4} until={K.Ca - 0.3} x={340} y={560} texto="pelo" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Q + 1.8} until={K.Ca - 0.3} x={1050} y={1018} lado="izq" texto="hifas" tam={32} color={TG.hifa} />
      <NumeroGigante T={T} at={K.Ca + 0.2} until={K.M - 0.2} valor={90} dur={1.0} sufijo=" %" etiqueta="más del" x={360} y={520} tam={230} color={KC.pink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Ca + 3.2} texto="de las tiñas de gato (guías de 2013)" x={370} y={720} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Ca + 3.4} until={K.M - 0.3} texto="«canis» = de perro (y vive en gatos)" x={370} y={720} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 2.0} until={K.M - 0.3} x={80} y={850} texto="Microsporum canis" it tam={40} color={KC.gold2} />
      <Etq T={T} at={K.Ca + 2.6} until={K.M - 0.3} x={520} y={1130} texto="macroconidio" tam={28} />
      <Etq T={T} at={K.Ca + 3.0} until={K.M - 0.3} x={560} y={880} texto="pared gruesa y rugosa" tam={26} />
      <Chip T={T} at={K.M + 0.4} until={K.P - 0.3} texto="por fuera del pelo · ectótrix" x={540} y={440} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.M + 1.4} until={K.P - 0.3} x={440} y={900} lado="izq" texto="manguito de esporas" tam={28} color={TG.espora} />
      <Etq T={T} at={K.M + 1.8} until={K.P - 0.3} x={712} y={1040} texto="pelo de gato" tam={28} color={TG.peloG} />
      <Chip T={T} at={K.M + 2.6} until={K.P - 0.3} texto="se pegan muy fuerte" x={540} y={1128} tam={36} borde={KC.red} />
      <Chip T={T} at={K.P + 2.0} until={K.U - 0.3} texto="portador sin síntomas" x={300} y={385} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.U + 2.2} until={K.Es - 0.3} texto="brilla: pteridina" x={300} y={450} tam={34} borde={TG.uv} />
      <Chip T={T} at={K.U + 3.2} until={K.Es - 0.3} texto="no todos brillan" x={300} y={545} tam={34} borde={KC.white} />
      <Chip T={T} at={K.U + 3.4} until={K.Es - 0.3} texto="infectado, no brilla" x={kclamp(etiquetaUV.x + etiquetaUV.lean * etiquetaUV.L, 200, 620)} y={660} tam={26} borde={TG.espora} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="2016" quien="Ciudad de México" revista="Hospital Gea González + FMVZ-UNAM · 10 años" y={640} />
      <Chip T={T} at={K.Es + 3.4} until={K.Po - 0.3} texto="tiñas humanas de origen animal" x={380} y={420} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Es + 3.9} until={K.Po - 0.3} valor={43} dur={2.1} sufijo=" de 57" x={380} y={1010} tam={130} color={TG.persona} />
      <Chip T={T} at={K.Es + 6.0} until={K.Po - 0.3} texto="en los gatos: solo este hongo" x={380} y={1125} tam={30} borde={TG.persona} />
      <Chip T={T} at={K.Po + 2.3} until={K.S - 0.3} texto="12 meses o más" x={400} y={610} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Po + 3.0} until={K.S - 0.3} texto="resisten en ambiente seco" x={390} y={410} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Po + 0.9} until={K.S - 0.3} x={520} y={815} lado="izq" texto="esporas en el polvo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.S + 0.1} until={K.C - 0.3} texto="LO QUE SÍ SIRVE" x={330} y={460} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no es su culpa" x={240} y={790} tam={40} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.A} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.A} until={K.Q} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.Q} until={K.Ca} texto="20 µm" largo={86} />
      <BarraEscala T={T} at={K.M} until={K.P} texto="50 µm" largo={120} />
      <BarraEscala T={T} at={K.P} until={K.U} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.U} until={K.Es} texto="1 cm" largo={140} />
      <BarraEscala T={T} at={K.Po} until={K.S} texto="1 m" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={120} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es un gusano: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.A - 0.1} texto="Tiña: *«gusano de anillo»* por su forma." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Q - 0.1} texto="Crece hacia afuera: *el centro se aclara.*" />
      <Subtitulo T={T} idx={3} at={K.Q + 0.1} until={K.Ca - 0.1} texto="Se alimenta de *queratina.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.M - 0.1} texto="Más del 90 % de las *tiñas de gato.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.P - 0.1} texto="Un *manguito de esporas* por fuera del pelo." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.U - 0.1} texto="¿Se ve sano? *Lo carga sin síntomas.*" />
      <Subtitulo T={T} idx={7} at={K.U + 0.1} until={K.Es - 0.1} texto="Brillan *verde manzana.* No todos." />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Po - 0.1} texto="CDMX: *43 de 57* tiñas de origen animal." />
      <Subtitulo T={T} idx={9} at={K.Po + 0.1} until={K.S - 0.1} texto="Viajan en el polvo: *un año o más.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.C - 0.1} texto="Veterinario, manos, *aspirar y desinfectar.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es su culpa: *los dos se curan.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.9, K.A - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Q + 0.9, K.Ca - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ca + 1.6, K.Ca + 5.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.4, K.U + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.U + 1.3, K.Es - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Es + 3.6, K.Es + 8.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Po + 0.8, K.S - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.S + 0.4, K.C - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="85" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TinaGatoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TinaGatoShot /></CompositionStage></div>;
}
window.TinaGatoApp = TinaGatoApp;
