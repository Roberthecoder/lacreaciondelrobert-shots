// Shot Fungi Mati #150 · Ese moho no se come tu tortilla: la digiere por fuera — NARRADO (N1 Por dentro, gancho 1 "esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (enzimas como tijeras, moléculas, "estómago afuera").

const EX = { tort:'#f0cf7c', tort2:'#d9a94e', tostado:'#9a6326', moho:'#f7f4ec', cabeza:'#1d1a17', halo:'#b98a3c', almidon:'#fff1c9',
  amil:KC.yellow, prot:KC.pink, lip:KC.cyan, hifa:'#eafff7', oro:'#ffd34d' };
const PXUM = 6; // escala micro: 1 µm = 6 px (hifa de ~8 µm ≈ 48 px de ancho; Deacon: "usually 5-10 µm")

// ---------- piezas ----------
// Tortilla de maíz vista desde arriba: disco con manchas de comal. moho 0..1 = tamaño de la mancha; digiere 0..1 = halo húmedo alrededor.
function Tortilla({ T, x = 540, y = 860, r = 360, moho = 1, digiere = 0, mx = 650, my = 790, marca = 0 }) {
  const g = krng(7), manchas = Array.from({ length: 22 }, () => [(g() - 0.5) * 1.6 * r, (g() - 0.5) * 1.6 * r, 10 + g() * 26, g()]);
  const borde = Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2, rr = r * (0.97 + 0.04 * Math.sin(i * 2.7)); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  const R = 40 + 110 * moho;
  return <g>
    <ellipse cx={x + 18} cy={y + 30} rx={r * 1.02} ry={r * 0.98} fill="rgba(0,0,0,.22)" />
    <path d={borde} fill={EX.tort} stroke={KC.ink} strokeWidth={9} />
    <clipPath id="tortClip"><path d={borde} /></clipPath>
    <g clipPath="url(#tortClip)">
      {manchas.filter((m) => Math.hypot(m[0], m[1]) < r * 0.92).map((m, i) => <ellipse key={i} cx={x + m[0]} cy={y + m[1]} rx={m[2]} ry={m[2] * 0.7} fill={m[3] > 0.5 ? EX.tostado : EX.tort2} opacity={m[3] > 0.5 ? 0.5 : 0.6} transform={`rotate(${m[3] * 180} ${x + m[0]} ${y + m[1]})`} />)}
      {/* halo: la tortilla ya digerida alrededor del moho (más oscura y húmeda) */}
      {digiere > 0 && <circle cx={mx} cy={my} r={R * (1 + 0.9 * digiere)} fill={EX.halo} opacity={0.55 * digiere} />}
      {digiere > 0 && <circle cx={mx} cy={my} r={R * (1 + 0.9 * digiere)} fill="none" stroke="#7a5420" strokeWidth={5} strokeDasharray="12 10" opacity={0.7 * digiere} />}
    </g>
    {/* mancha de moho: pelusa blanca con cabecitas negras (tipo Aspergillus niger, esquemático) */}
    {moho > 0 && <g>
      {Array.from({ length: 34 }, (_, i) => { const a = i * 2.39, d = Math.sqrt((i + 0.5) / 34) * R; const px = mx + Math.cos(a) * d, py = my + Math.sin(a) * d;
        return <circle key={i} cx={px} cy={py} r={R * 0.28 * (1 - d / R * 0.5) + mece(T, i, 0.6) * 2} fill={EX.moho} opacity={0.85} />; })}
      {Array.from({ length: Math.round(26 * moho) }, (_, i) => { const a = i * 2.1 + 0.4, d = Math.sqrt((i + 0.5) / 26) * R * 0.8;
        return <circle key={i} cx={mx + Math.cos(a) * d} cy={my + Math.sin(a) * d} r={7 + (i % 3) * 2} fill={EX.cabeza} />; })}
    </g>}
    {marca > 0 && <circle cx={mx} cy={my} r={R * 1.95} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray={`${marca * 1300} 2000`} transform={`rotate(-90 ${mx} ${my})`} />}
  </g>;
}

// Hifa: tubo que crece por la punta siguiendo pts. p 0..1 = cuánto ha crecido. tipGlow = brillo en la punta. septos opcionales.
function hTramo(pts, p) {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let rest = tot * kclamp(p, 0, 1); const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) { if (rest >= L[i - 1]) { out.push(pts[i]); rest -= L[i - 1]; } else { const u = rest / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } }
  return out;
}
function Hifa({ pts, p = 1, ancho = 48, color = EX.hifa, glow = 0, T = 0, septos = true, nucleos = true }) {
  if (p <= 0) return null;
  const q = hTramo(pts, p), d = 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  const tip = q[q.length - 1], prev = q[q.length - 2] || q[0], an = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
  return <g>
    <path d={d} fill="none" stroke="rgba(47,224,168,.18)" strokeWidth={ancho * 2} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={ancho + 10} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" />
    {q.slice(1).map((z, k) => { const a = q[k], mx = (a[0] + z[0]) / 2, my = (a[1] + z[1]) / 2, aa = Math.atan2(z[1] - a[1], z[0] - a[0]);
      return <g key={k}>
        {septos && Math.hypot(z[0] - a[0], z[1] - a[1]) > 120 && <line x1={mx - Math.sin(aa) * ancho * 0.5} y1={my + Math.cos(aa) * ancho * 0.5} x2={mx + Math.sin(aa) * ancho * 0.5} y2={my - Math.cos(aa) * ancho * 0.5} stroke="#8fbfb0" strokeWidth={4} />}
        {nucleos && <circle cx={klerp(a[0], z[0], 0.3)} cy={klerp(a[1], z[1], 0.3) + mece(T, k + 3, 0.3) * 3} r={ancho * 0.14} fill="#b18cff" />}
      </g>; })}
    {glow > 0 && <circle cx={tip[0] + Math.cos(an) * ancho * 0.15} cy={tip[1] + Math.sin(an) * ancho * 0.15} r={ancho * 0.55} fill="#ffffff" opacity={glow * (0.5 + 0.5 * Math.sin(T * 5))} />}
  </g>;
}
const hPunta = (pts, p) => { const q = hTramo(pts, p), t = q[q.length - 1], a = q[q.length - 2] || q[0]; return { x: t[0], y: t[1], ang: Math.atan2(t[1] - a[1], t[0] - a[0]) }; };

// Gránulo de almidón (maíz: poliédrico redondeado, con hilio). k 0..1 = cuánto queda (se "derrite" cuando la amilasa trabaja).
function Granulo({ x, y, r = 60, k = 1, rot = 0, seed = 1 }) {
  if (k <= 0.02) return null;
  const g = krng(seed), n = 7, rr = r * (0.35 + 0.65 * k);
  const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + rot, q = rr * (0.85 + g() * 0.25); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * q).toFixed(1)} ${(y + Math.sin(a) * q).toFixed(1)}`; }).join(' ') + ' Z';
  return <g opacity={0.4 + 0.6 * k}>
    <path d={d} fill={EX.almidon} stroke="#c9a44e" strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${x - rr * 0.18} ${y - rr * 0.1} L ${x + rr * 0.12} ${y + rr * 0.08} M ${x + rr * 0.1} ${y - rr * 0.16} L ${x - rr * 0.08} ${y + rr * 0.14}`} stroke="#c9a44e" strokeWidth={4} strokeLinecap="round" />
  </g>;
}

// Tijera química (enzima, esquemática). abre 0..1 (oscila al cortar).
function Tijera({ x, y, s = 1, rot = 0, abre = 0.5, color = KC.yellow }) {
  const a = 8 + abre * 22;
  const hoja = (sg) => <g transform={`rotate(${sg * a})`}>
    <path d={`M 0 0 L 74 ${-sg * 6} Q 84 0 74 ${sg * 6} Z`} fill="#eef2f6" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={-34} cy={sg * 14} r={16} fill={color} stroke={KC.ink} strokeWidth={5} />
    <line x1={-20} y1={sg * 8} x2={0} y2={0} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{hoja(1)}{hoja(-1)}<circle r={6} fill={KC.ink} /></g>;
}

// Cadena de unidades que se corta. tipo: 'almidon' (hexágonos de glucosa), 'proteina' (cuentas de colores), 'grasa' (triglicérido en E).
function Cadena({ x, y, tipo = 'almidon', n = 7, corte = 0, paso = 92, T = 0, s = 1, color }) {
  const COLS = [KC.pink, KC.mint, KC.lilac, KC.orange, KC.cyan, KC.yellow, KC.coral];
  if (tipo === 'grasa') {
    // glicerol (barra) + 3 colas de ácido graso; corte separa las colas
    return <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-20} y={-90} width={40} height={180} rx={14} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
      {[-60, 0, 60].map((dy, i) => { const sep = corte * (40 + i * 16), fl = corte * mece(T, i + 4, 0.5) * 10;
        const zz = Array.from({ length: 9 }, (_, k) => `${k ? 'L' : 'M'} ${30 + sep + k * 44} ${dy + fl + (k % 2 ? 14 : -14)}`).join(' ');
        return <g key={i}>
          {corte < 0.05 && <line x1={20} y1={dy} x2={32} y2={dy} stroke={KC.ink} strokeWidth={6} />}
          <path d={zz} fill="none" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
          <path d={zz} fill="none" stroke={color || KC.gold2} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </g>; })}
    </g>;
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => {
      const grupo = Math.floor(i / 2), sep = corte * grupo * 34, fl = corte * mece(T, i + 1, 0.4) * 14;
      const cx = i * paso + sep, cy = (i % 2 ? 14 : -14) + fl;
      const nx = (i + 1) * paso + corte * Math.floor((i + 1) / 2) * 34, ny = ((i + 1) % 2 ? 14 : -14) + corte * mece(T, i + 2, 0.4) * 14;
      const unido = i < n - 1 && (corte < 0.05 || Math.floor((i + 1) / 2) === grupo);
      const col = tipo === 'almidon' ? (color || KC.gold2) : COLS[i % COLS.length];
      return <g key={i}>
        {unido && <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={col} strokeWidth={8} />}
        {tipo === 'almidon'
          ? <polygon points={[0, 60, 120, 180, 240, 300].map((a) => `${cx + 34 * Math.cos((a + 30) * Math.PI / 180)},${cy + 34 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ')} fill={col + '44'} stroke={col} strokeWidth={8} strokeLinejoin="round" />
          : <circle cx={cx} cy={cy} r={30} fill={col} stroke={KC.ink} strokeWidth={6} />}
      </g>; })}
  </g>;
}

// Pieza chiquita que flota (glucosa = hexágono dorado; aminoácido = bolita de color).
function Pieza({ x, y, tipo = 0, r = 20, o = 1 }) {
  return tipo === 0
    ? <polygon opacity={o} points={[0, 60, 120, 180, 240, 300].map((a) => `${x + r * Math.cos((a + 30) * Math.PI / 180)},${y + r * Math.sin((a + 30) * Math.PI / 180)}`).join(' ')} fill={KC.gold2 + '55'} stroke={KC.gold2} strokeWidth={6} />
    : <circle opacity={o} cx={x} cy={y} r={r * 0.8} fill={[KC.pink, KC.mint, KC.lilac][tipo % 3]} stroke={KC.ink} strokeWidth={4} />;
}

// Silueta esquemática de una persona con el estómago ADENTRO.
function PersonaEstomago({ T, x, y, s = 1, comida = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={80} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 -200 Q 0 -240 130 -200 L 150 120 Q 0 150 -150 120 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 0 -240 L 0 -150 Q -10 -110 10 -80" stroke="#ff9db5" strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M 10 -90 Q 90 -100 80 -20 Q 70 50 -10 40 Q -60 30 -30 -20 Q 0 -50 10 -90 Z" fill="#ff7aa0" stroke={KC.ink} strokeWidth={6} />
    {comida > 0 && comida < 1 && <circle cx={klerp(0, 30, comida)} cy={klerp(-280, -10, comida)} r={14} fill={EX.tort2} stroke={KC.ink} strokeWidth={4} />}
    {comida >= 1 && Array.from({ length: 5 }, (_, i) => <circle key={i} cx={20 + Math.cos(T * 2 + i) * 22} cy={-10 + Math.sin(T * 2 + i * 1.3) * 14} r={6} fill={EX.tort2} />)}
  </g>;
}

// Caja de Petri (de lado) con la colonia en sándwich entre dos membranas perforadas.
function Sandwich({ T, x, y, w = 760, p = 1 }) {
  const h = 26;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={60} width={w} height={90} rx={14} fill="#f5e7b8" stroke={KC.ink} strokeWidth={6} />
    <text x={w / 2 - 20} y={124} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>agar</text>
    {[0, 1].map((k) => { const yy = k ? -h - 12 : 32;
      return <g key={k} opacity={k ? kprog(p, 0.5, 0.8) : 1} transform={`translate(0 ${k ? -(1 - kprog(p, 0.5, 0.8)) * 120 : 0})`}>
        <rect x={-w / 2 + 20} y={yy} width={w - 40} height={h} rx={6} fill="#dfe8f2" stroke={KC.ink} strokeWidth={5} />
        {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-w / 2 + 50 + i * ((w - 100) / 21)} cy={yy + h / 2} r={4} fill={KC.ink} opacity=".55" />)}
      </g>; })}
    {/* colonia entre las dos membranas: crece desde el centro */}
    {(() => { const c = kprog(p, 0.1, 0.6); return <rect x={-c * (w / 2 - 60)} y={-10} width={c * (w - 120)} height={40} rx={20} fill="#fffaf0" stroke="#9a8f80" strokeWidth={4} />; })()}
  </g>;
}

// Anticuerpo (Y) con partícula de oro.
function Anticuerpo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 40 L 0 0 L -26 -34 M 0 0 L 26 -34" stroke="#cfd8ff" strokeWidth={12} strokeLinecap="round" fill="none" />
    <circle cx={0} cy={52} r={16} fill={EX.oro} stroke="#7a5a00" strokeWidth={4} style={{ filter:`drop-shadow(0 0 10px ${EX.oro})` }} />
  </g>;
}

// Boca esquemática que muerde un taco (escena de la saliva).
function Taco({ x, y, s = 1, mordida = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 40 Q 0 -260 260 40 Z" fill={EX.tort} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -200 30 Q 0 -200 200 30" fill="none" stroke={KC.leaf} strokeWidth={26} strokeLinecap="round" />
    <path d="M -180 34 Q 0 -150 180 34" fill="none" stroke={KC.red} strokeWidth={18} strokeLinecap="round" strokeDasharray="30 22" />
    {mordida > 0 && <g fill={KC.mint}>{[-40, 0, 40].map((dx, i) => <circle key={i} cx={210 + dx * 0.5} cy={-30 + i * 22} r={34 * mordida} />)}</g>}
  </g>;
}

const HIFA_A = [[-60, 1120], [200, 1040], [420, 930], [620, 860], [820, 790], [980, 730]];
const GRANOS = [[300, 760, 70], [560, 690, 80], [760, 640, 64], [170, 900, 60], [700, 1010, 76], [900, 900, 62], [460, 1100, 66], [880, 1120, 58], [120, 650, 54], [980, 560, 60]];

function EstomagoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.SinEstomago, H: CUES.Hifa, E: CUES.Enzimas, Ti: CUES.Tijeras, A: CUES.Absorbe, P: CUES.Pregunta, Es: CUES.Estudio, O: CUES.Oro, Pu: CUES.Punta, Sa: CUES.Saliva, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mohoG = 0.55 + 0.45 * kprog(T, K.G + 0.1, K.G + 1.6, kEase.sale);
  const crece = kprog(T, K.H + 0.2, K.E + 0.6, kEase.suave);           // la hifa avanza por la punta
  const tip = hPunta(HIFA_A, 0.55 + 0.4 * crece);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tortilla con moho; la pelusa crece y alrededor se "derrite" */}
      <Escena T={T} a={K.G} b={K.S} zoom={0.06} origen="60% 42%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tortilla T={T} moho={mohoG} digiere={kprog(T, K.G + 0.2, K.G + 2.4)} />)}
      </Escena>
      {/* 2 · sin estómago: el tuyo va adentro, el del hongo afuera */}
      <Escena T={T} a={K.S} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={60} y={520} width={460} height={720} rx={40} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
          <rect x={560} y={520} width={460} height={720} rx={40} fill="rgba(14,20,36,.92)" stroke={KC.ink} strokeWidth={7} />
          <PersonaEstomago T={T} x={290} y={1010} s={0.95} comida={kprog(T, K.S + 0.3, K.S + 1.3)} />
          {(() => { const pts = [[600, 1150], [700, 1000], [790, 900], [900, 800]]; const pts2 = [[700, 1000], [820, 1080], [960, 1060]];
            const ext = kprog(T, K.S + 1.4, K.S + 2.4, kEase.sale);
            return <>
              {[...Array(9)].map((_, i) => <Granulo key={i} x={640 + (i % 3) * 130} y={720 + Math.floor(i / 3) * 170} r={34} k={1 - ext * 0.6 * ((i % 2) + 0.5)} seed={i + 3} />)}
              <Hifa T={T} pts={pts} p={1} ancho={30} glow={1} />
              <Hifa T={T} pts={pts2} p={1} ancho={26} />
              <ellipse cx={810} cy={930} rx={210 * ext + 1} ry={250 * ext + 1} fill="rgba(255,122,160,.18)" stroke="#ff7aa0" strokeWidth={8} strokeDasharray="22 14" strokeDashoffset={-T * 40} />
            </>; })()}
        </>)}
      </Escena>
      {/* 3–6 · por dentro: la hifa entre el almidón, sus enzimas y lo que absorbe (fondo oscuro, microscópico) */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.05} origen="70% 45%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {/* escena Hifa + Enzimas: granos y la hifa que avanza */}
          {T < K.Ti + 0.3 && <g opacity={1 - kprog(T, K.Ti - 0.2, K.Ti + 0.3)}>
            {GRANOS.map(([gx, gy, gr], i) => { const d = Math.hypot(gx - tip.x, gy - tip.y); const come = kprog(T, K.E + 1.0, K.Ti) * kclamp(1 - d / 380, 0, 1);
              return <Granulo key={i} x={gx} y={gy} r={gr} k={1 - come * 0.85} rot={i} seed={i + 11} />; })}
            <Hifa T={T} pts={HIFA_A} p={0.55 + 0.4 * crece} ancho={48} glow={1} />
            <Hifa T={T} pts={[[420, 930], [470, 1080], [520, 1200]]} p={kprog(T, K.H + 1.5, K.E + 1)} ancho={42} />
            {/* vesículas que viajan a la punta y salen como enzimas (sobre todo en la punta) */}
            {T > K.E && Array.from({ length: 16 }, (_, k) => { const u = ((T - K.E) * 0.6 + k / 16) % 1; const fuera = u > 0.45;
              const back = hPunta(HIFA_A, Math.max(0, 0.55 + 0.4 * crece - 0.18));
              if (!fuera) { const v = u / 0.45; return <circle key={k} cx={klerp(back.x, tip.x, v)} cy={klerp(back.y, tip.y, v) + Math.sin(k) * 8} r={9} fill={KC.yellow} opacity={kprog(T, K.E, K.E + 0.4)} />; }
              const v = (u - 0.45) / 0.55, an = tip.ang + (k / 16 - 0.5) * 2.6, dist = 40 + v * 300;
              return <Tijera key={k} x={tip.x + Math.cos(an) * dist} y={tip.y + Math.sin(an) * dist} s={0.42} rot={an * 57.3} abre={0.5 + 0.5 * Math.sin(T * 9 + k)} color={[EX.amil, EX.prot, EX.lip][k % 3]} />; })}
          </g>}
          {/* escena Tijeras: tres cadenas, tres tijeras */}
          {T > K.Ti - 0.4 && T < K.A + 0.3 && <g opacity={kprog(T, K.Ti - 0.4, K.Ti) * (1 - kprog(T, K.A - 0.1, K.A + 0.3))}>
            {[['almidon', 640, K.Ti + 0.5, EX.amil], ['proteina', 880, K.Ti + 1.6, EX.prot], ['grasa', 1110, K.Ti + 2.7, EX.lip]].map(([tp, yy, tc, col], i) => {
              const c = kprog(T, tc + 0.35, tc + 0.9, kEase.sale), ent = kprog(T, tc - 0.4, tc + 0.3, kEase.sale);
              return <g key={i}>
                {tp === 'grasa' ? <Cadena T={T} x={330} y={yy} tipo="grasa" corte={c} s={0.85} /> : <Cadena T={T} x={330} y={yy} tipo={tp} n={7} paso={88} corte={c} />}
                <Tijera x={klerp(1150, tp === 'grasa' ? 378 : 420, ent)} y={yy + (tp === 'grasa' ? -40 : -60)} s={0.9} rot={90} abre={T > tc + 0.3 && T < tc + 0.9 ? 0.5 + 0.5 * Math.sin((T - tc) * 20) : 0.6} color={col} />
              </g>; })}
          </g>}
          {/* escena Absorbe: piezas chiquitas que entran por la pared de la hifa */}
          {T > K.A - 0.4 && <g opacity={kprog(T, K.A - 0.4, K.A)}>
            <Hifa T={T} pts={[[-60, 900], [300, 880], [640, 870], [1140, 860]]} p={1} ancho={120} glow={0} septos={false} />
            {Array.from({ length: 6 }, (_, i) => <rect key={i} x={140 + i * 150} y={808} width={26} height={10} rx={5} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />)}
            {Array.from({ length: 6 }, (_, i) => <rect key={'b' + i} x={200 + i * 150} y={922} width={26} height={10} rx={5} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />)}
            {Array.from({ length: 22 }, (_, k) => { const arriba = k % 2 === 0, col = k % 11, px = (arriba ? 153 : 213) + (col % 6) * 150;
              const t0 = K.A + 0.6 + (k % 11) * 0.28, u = kprog(T, t0, t0 + 1.6, kEase.suave);
              const y0 = arriba ? 560 + (k % 5) * 40 : 1180 - (k % 5) * 40, yy = klerp(y0, arriba ? 860 : 880, u);
              return <Pieza key={k} x={px + (1 - u) * mece(T, k, 0.5) * 30} y={yy} tipo={k % 4 === 0 ? 1 : 0} r={20} o={u < 1 ? 1 : 0.0} />; })}
            {Array.from({ length: Math.round(12 * kprog(T, K.A + 1.6, K.A + 4.5)) }, (_, k) => <Pieza key={'in' + k} x={80 + k * 85 + Math.sin(T * 2 + k) * 10} y={870 + Math.cos(T * 2 + k) * 14} tipo={k % 4 === 0 ? 1 : 0} r={14} />)}
          </g>}
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿cómo saben que es en la punta? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Hifa T={T} pts={[[-60, 1150], [200, 1000], [380, 860]]} p={1} ancho={90} glow={1} />
          <Interrogacion T={T} x={300} y={760} tam={380} />
        </>)}
      </Escena>
      {/* 8 · el estudio de 1991: colonia entre dos membranas perforadas */}
      <Escena T={T} a={K.Es} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Sandwich T={T} x={540} y={1060} p={kprog(T, K.Es + 1.0, K.Es + 4.5)} />)}
      </Escena>
      {/* 9–10 · inmunomarcado con oro: la glucoamilasa aparece en las puntas (fondo oscuro) */}
      <Escena T={T} a={K.O} b={K.Sa} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {T < K.Pu + 0.3 && <g opacity={1 - kprog(T, K.Pu - 0.1, K.Pu + 0.3)}>
            {/* glucoamilasa (enzima) cortando una glucosa del extremo del almidón */}
            <Cadena T={T} x={240} y={900} tipo="almidon" n={6} paso={88} corte={0} />
            {(() => { const s1 = kprog(T, K.O + 1.6, K.O + 2.6, kEase.sale); return <>
              <Pieza x={240 + 5 * 88 + 20 + s1 * 120} y={914 - s1 * 60} tipo={0} r={34} o={s1 > 0 ? 1 : 0} />
              <g transform={`translate(${720} ${780})`}>
                <path d="M -90 0 Q -100 -90 0 -100 Q 100 -100 100 0 Q 90 70 30 60 L 10 20 L -20 60 Q -80 70 -90 0 Z" fill="#7fd8ff" stroke={KC.ink} strokeWidth={7} />
                <text x={0} y={-30} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>enzima</text>
              </g>
              {[[-150, -120, 20], [140, -140, -25], [0, -190, 0]].map(([dx, dy, r], i) => { const e = kprog(T, K.O + 0.3 + i * 0.25, K.O + 1.0 + i * 0.25, kEase.sale);
                return <Anticuerpo key={i} x={720 + dx * klerp(2.4, 1, e)} y={780 + dy * klerp(2.4, 1, e)} rot={r + 180} o={e} />; })}
            </>; })()}
          </g>}
          {/* las hifas de la orilla de la colonia: el oro se junta en las puntas de las de adelante */}
          {T > K.Pu - 0.4 && <g opacity={kprog(T, K.Pu - 0.4, K.Pu)}>
            {[[[-40, 1250], [260, 1050], [520, 900], [700, 780]], [[-40, 1050], [240, 900], [460, 700], [640, 560]], [[-40, 800], [180, 720], [380, 560]], [[-40, 1450], [300, 1300], [560, 1180], [820, 1100]]].map((pts, i) => {
              const lider = i !== 2, pp = 0.75 + 0.25 * kprog(T, K.Pu, K.Sa, kEase.suave) * (lider ? 1 : 0.2);
              const tp = hPunta(pts, pp);
              return <g key={i}>
                <Hifa T={T} pts={pts} p={lider ? pp : 0.95} ancho={44} glow={lider ? 1 : 0} />
                {lider && Array.from({ length: 12 }, (_, k) => { const an = tp.ang + (k / 12 - 0.5) * 3.0, dd = 34 + (k % 4) * 16; const e = kprog(T, K.Pu + 0.8 + k * 0.08, K.Pu + 1.2 + k * 0.08, kEase.rebote);
                  return <circle key={k} cx={tp.x + Math.cos(an) * dd} cy={tp.y + Math.sin(an) * dd} r={8 * e} fill={EX.oro} style={{ filter:`drop-shadow(0 0 8px ${EX.oro})` }} />; })}
              </g>; })}
          </g>}
        </>)}
      </Escena>
      {/* 11 · tu saliva también trae amilasa */}
      <Escena T={T} a={K.Sa} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Taco x={540} y={1060} s={1.2} mordida={kprog(T, K.Sa + 0.4, K.Sa + 0.9)} />
          {Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.Sa + 1.0 + i * 0.2, K.Sa + 1.6 + i * 0.2); return <circle key={i} cx={830 + i * 18} cy={klerp(560, 900, u)} r={14} fill="#bdf0ff" stroke={KC.ink} strokeWidth={4} opacity={u > 0 && u < 1 ? 1 : 0} />; })}
          <Cadena T={T} x={190} y={700} tipo="almidon" n={6} paso={88} corte={kprog(T, K.Sa + 2.2, K.Sa + 2.8, kEase.sale)} />
          <Tijera x={klerp(1150, 360, kprog(T, K.Sa + 1.4, K.Sa + 2.1, kEase.sale))} y={640} s={0.9} rot={90} abre={0.5 + 0.5 * Math.sin(T * 12)} color={EX.amil} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma tortilla del inicio, ya digerida alrededor */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="60% 42%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tortilla T={T} moho={1} digiere={1} marca={kprog(T, K.C + 1.0, K.C + 2.0)} />)}
      </Escena>
      <Lupa T={T} at={K.C + 2.2} until={K.Ou - 0.2} x={300} y={1060} r={170} fx={650} fy={790} tinte={KC.mint} etiqueta="POR DENTRO"
        interior={(T2, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={KC.noche} />
          <g transform={`scale(${r / 300})`}><Hifa T={T2} pts={[[-40, 420], [200, 330], [380, 250]]} p={1} ancho={40} glow={1} />
            {[0, 1, 2, 3, 4].map((k) => { const an = -0.4 + (k - 2) * 0.5, d = 70 + ((T2 * 60 + k * 30) % 160); return <Tijera key={k} x={380 + Math.cos(an) * d} y={250 + Math.sin(an) * d} s={0.5} rot={an * 57} abre={0.5 + 0.5 * Math.sin(T2 * 9 + k)} color={[EX.amil, EX.prot, EX.lip][k % 3]} />; })}</g></svg>} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.S - 0.3} texto="se la come" x={300} y={470} tam={48} />
      <Chip T={T} at={K.G + 1.8} until={K.S - 0.3} texto="la digiere POR FUERA" x={330} y={570} tam={40} borde={KC.red} />
      <Etq T={T} at={K.G + 2.4} until={K.S - 0.3} x={60} y={1215} texto="tortilla de maíz con moho" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 0.2} until={K.H - 0.3} x={90} y={580} texto="tú: adentro" tam={32} color={KC.ink} />
      <Etq T={T} at={K.S + 1.2} until={K.H - 0.3} x={590} y={580} texto="hongo: afuera" tam={32} color={KC.texto} />
      <Chip T={T} at={K.S + 1.8} until={K.H - 0.3} texto="digestión externa" x={540} y={460} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.H + 0.1} until={K.E - 0.2} texto="POR DENTRO · LA TORTILLA" x={420} y={450} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.H + 0.8} until={K.E - 0.2} x={60} y={1185} texto="hifa: crece por la punta" tam={30} color={KC.mint} />
      <Etq T={T} at={K.H + 1.6} until={K.E - 0.2} x={60} y={560} texto="almidón (granos)" tam={30} color={EX.almidon} />
      <Chip T={T} at={K.H + 2.6} until={K.E - 0.2} texto="maíz: rico en almidón" x={340} y={1220} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.H + 3.2} until={K.E - 0.2} x={60} y={630} texto="ancho de una hifa: ≈ 5–10 µm" tam={28} color={KC.mint} />
      <Chip T={T} at={K.E + 0.3} until={K.Ti - 0.2} texto="enzimas = tijeras químicas" x={360} y={470} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Ti + 0.4} until={K.A - 0.2} x={60} y={540} texto="almidón → amilasas" tam={32} color={EX.amil} />
      <Etq T={T} at={K.Ti + 1.5} until={K.A - 0.2} x={60} y={780} texto="proteínas → proteasas" tam={32} color={EX.prot} />
      <Etq T={T} at={K.Ti + 2.6} until={K.A - 0.2} x={60} y={1010} texto="grasa → lipasas" tam={32} color={EX.lip} />
      <Chip T={T} at={K.A + 0.3} until={K.P - 0.2} texto="se digiere afuera · se absorbe adentro" x={540} y={470} tam={32} borde={KC.mint} />
      <Etq T={T} at={K.A + 1.2} until={K.P - 0.2} x={60} y={1185} texto="azúcares y piezas chiquitas → adentro" tam={28} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.O - 0.2} anio="1991" quien="U. de Groningen, Países Bajos" revista="J. Gen. Microbiology, 1991" x={540} y={600} />
      <Etq T={T} at={K.Es + 1.4} until={K.O - 0.2} x={60} y={850} texto="Aspergillus niger" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.Es + 2.2} until={K.O - 0.2} x={60} y={920} texto="colonia entre 2 membranas perforadas" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Es + 3.2} until={K.O - 0.2} texto="A. niger: también aislado de tortillas (Puebla, 2022)" x={540} y={1215} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.O + 0.4} until={K.Pu - 0.2} x={60} y={560} texto="inmunomarcado con oro" tam={32} color={EX.oro} />
      <Etq T={T} at={K.O + 1.2} until={K.Pu - 0.2} x={60} y={1080} texto="glucoamilasa: almidón → glucosa" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Pu + 1.4} until={K.Sa - 0.2} texto="oro en las puntas que crecían (1991)" x={500} y={460} tam={32} borde={EX.oro} />
      <Chip T={T} at={K.Sa + 1.0} until={K.C - 0.2} texto="tu saliva: amilasa" x={330} y={480} tam={40} borde={EX.amil} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="digiere afuera · absorbe adentro" x={540} y={1215} tam={34} borde={KC.red} />
      <Etq T={T} at={K.C + 1.2} until={K.Ou} x={60} y={470} texto="aquí ya la digirió" tam={32} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.S} texto="2 cm" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.H} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.Ti} texto="10 µm" largo={PXUM * 10} />
      <BarraEscala T={T} at={K.Ti} until={K.A} texto="moléculas · esquemático" largo={0} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="10 µm (aprox.)" largo={150} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="10 µm (aprox.)" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.O} texto="1 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.O} until={K.Pu} texto="moléculas · esquemático" largo={0} />
      <BarraEscala T={T} at={K.Pu} until={K.Sa} texto="10 µm" largo={60} />
      <BarraEscala T={T} at={K.Sa} until={K.C} texto="5 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={90} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.S - 0.1} texto="No se la come: *la digiere por fuera.*" />
      <Subtitulo T={T} idx={1} at={K.S + 0.1} until={K.H - 0.1} texto="Sin estómago: *es como si lo sacara.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.E - 0.1} texto="La hifa crece *por la punta.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Ti - 0.1} texto="Suelta *enzimas:* tijeras químicas." />
      <Subtitulo T={T} idx={4} at={K.Ti + 0.1} until={K.A - 0.1} texto="*Amilasas, proteasas, lipasas.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Se deshace afuera; *la hifa lo absorbe.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Cómo saben que es *en la punta?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.O - 0.1} texto="1991, Groningen: *cultivo entre membranas.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.Pu - 0.1} texto="Marcaron con oro *su glucoamilasa.*" />
      <Subtitulo T={T} idx={9} at={K.Pu + 0.1} until={K.Sa - 0.1} texto="Apareció *en las puntas* que crecían." />
      <Subtitulo T={T} idx={10} at={K.Sa + 0.1} until={K.C - 0.1} texto="Tu saliva también trae *amilasa.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="La digiere afuera *y absorbe los pedacitos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.S + 0.4, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 0.5, K.Ti - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.A + 0.6, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.O + 0.5, K.Pu - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pu + 0.4, K.Sa - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Sa + 0.3, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 1.0, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="150" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EstomagoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EstomagoShot /></CompositionStage></div>;
}
window.EstomagoApp = EstomagoApp;
