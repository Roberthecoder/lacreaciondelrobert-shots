// Shot Fungi Mati #24 · Ese polvo naranja no es óxido: la roya del café (Hemileia vastatrix) — NARRADO (N1 Por dentro).
// Viaje: jarrito de café de olla + rama → hoja (envés) → espora, estoma, haustorios (microscopio) → cafeto → Ceilán → 2012–13 → Timor → la misma taza.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const RC = { hoja:'#1f7a3a', hoja2:'#2f9a4c', enves:'#8fc77a', enves2:'#a9d892', vena:'#d8f0c0', roya:'#ff9a1f', roya2:'#ffc23a', halo:'#f3e27a',
  cereza:'#c8102e', barro:'#b5562b', barro2:'#8e3f1d', cafe:'#3b2314', epi:'#16402a', epi2:'#1f5636', celula:'#2f8f4a', cloro:'#7bd36b', te:'#7fd36a' };

// ---------- Hoja de cafeto: elíptica, punta acuminada, nervaduras laterales marcadas, brillante. ----------
// Coordenadas locales: pecíolo en (0,0), punta en (1.12·L, 0). cara: 'haz' (verde oscuro) o 'enves' (verde claro).
// manchas: [[t, lado(-1..1), r]] · roya 0..1 = cuánto se ven · polvo = brillo del polvo naranja (envés).
function HojaCafe({ x, y, L = 400, rot = 0, cara = 'haz', manchas = [], roya = 1, T = 0, seed = 1, op = 1 }) {
  const W = 0.23 * L, enves = cara === 'enves';
  const d = `M 0 0 C ${0.2 * L} ${-1.15 * W} ${0.78 * L} ${-1.05 * W} ${1.0 * L} ${-0.08 * W} L ${1.13 * L} 0 L ${1.0 * L} ${0.08 * W} C ${0.78 * L} ${1.05 * W} ${0.2 * L} ${1.15 * W} 0 0 Z`;
  const ancho = (t) => W * 0.86 * Math.pow(Math.sin(Math.PI * kclamp(t, 0, 1)), 0.75);
  const g = krng(seed * 31 + 7);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={op}>
    <line x1={-0.1 * L} y1={0} x2={0} y2={0} stroke={RC.hoja} strokeWidth={L * 0.025} strokeLinecap="round" />
    <path d={d} fill={enves ? RC.enves : RC.hoja} stroke={KC.ink} strokeWidth={Math.max(4, L * 0.012)} strokeLinejoin="round" />
    {!enves && <path d={`M ${0.18 * L} ${-0.45 * W} Q ${0.5 * L} ${-0.8 * W} ${0.8 * L} ${-0.45 * W}`} stroke="#5fc27a" strokeWidth={L * 0.025} fill="none" strokeLinecap="round" opacity=".55" />}
    <line x1={0} y1={0} x2={1.08 * L} y2={0} stroke={enves ? RC.vena : '#7cc78a'} strokeWidth={L * 0.014} strokeLinecap="round" />
    {[0.12, 0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82].map((t, i) => [-1, 1].map((s) =>
      <path key={i + '' + s} d={`M ${t * L} 0 Q ${(t + 0.05) * L} ${s * ancho(t) * 0.5} ${(t + 0.11) * L} ${s * ancho(t + 0.08) * 0.92}`} stroke={enves ? RC.vena : '#5bb46f'} strokeWidth={L * (enves ? 0.009 : 0.007)} fill="none" strokeLinecap="round" />))}
    {roya > 0 && manchas.map(([t, lado, r], i) => {
      const cx = t * L, cy = lado * ancho(t) * 0.7, k = kclamp(roya * 1.6 - i * 0.08, 0, 1), rr = r * L / 400 * k;
      if (rr <= 0) return null;
      return enves ? <g key={i}>
        <circle cx={cx} cy={cy} r={rr * 1.35} fill={RC.halo} opacity=".7" />
        <circle cx={cx} cy={cy} r={rr} fill={RC.roya} stroke="#d9741a" strokeWidth={2} />
        {Array.from({ length: 9 }, (_, j) => { const a = g() * 6.283, q = Math.sqrt(g()) * rr * 0.85; return <circle key={j} cx={cx + Math.cos(a) * q} cy={cy + Math.sin(a) * q} r={Math.max(1.5, rr * 0.12)} fill={RC.roya2} opacity={0.6 + 0.4 * Math.sin(T * 3 + j)} />; })}
      </g> : <circle key={i} cx={cx} cy={cy} r={rr * 1.1} fill="#efe36a" opacity=".95" stroke="#b8a83a" strokeWidth={2} />;
    })}
  </g>;
}
const MANCHAS = [[0.25, -0.4, 26], [0.38, 0.5, 34], [0.5, -0.2, 22], [0.62, 0.35, 30], [0.72, -0.5, 20], [0.45, 0.05, 16], [0.84, 0.2, 18]];

// Cerezas del café (rojas, en racimo en la axila de las hojas).
function Cerezas({ x, y, n = 5, r = 18, k = 1, color = RC.cereza }) {
  if (k <= 0) return null;
  const pts = [[0, 0], [-1.6, 0.4], [1.6, 0.3], [-0.8, -1.3], [0.9, -1.3], [0, 1.5]].slice(0, n);
  return <g transform={`translate(${x} ${y}) scale(${k})`}>{pts.map(([a, b], i) => <g key={i}>
    <circle cx={a * r} cy={b * r} r={r} fill={color} stroke={KC.ink} strokeWidth={4} />
    <circle cx={a * r - r * 0.35} cy={b * r - r * 0.35} r={r * 0.28} fill="#fff" opacity=".6" /></g>)}</g>;
}

// Jarrito de barro de café de olla, con vapor.
function Jarrito({ T, x, y, s = 1, vapor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && Array.from({ length: 3 }, (_, i) => { const u = (T * 0.45 + i / 3) % 1; return <path key={i} d={`M ${-40 + i * 40} ${-170 - u * 160} q ${18 * Math.sin(T * 2 + i)} -30 0 -60 q ${-18 * Math.sin(T * 2 + i)} -30 0 -60`} stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.7 * vapor} />; })}
    <path d="M 105 -110 Q 190 -100 180 -20 Q 170 50 95 40" stroke={RC.barro2} strokeWidth={28} fill="none" strokeLinecap="round" />
    <path d="M 105 -110 Q 190 -100 180 -20 Q 170 50 95 40" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" opacity=".6" />
    <path d="M -120 -150 L 120 -150 Q 140 40 90 110 Q 0 140 -90 110 Q -140 40 -120 -150 Z" fill={RC.barro} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-150} rx={122} ry={26} fill={RC.cafe} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-30} cy={-154} rx={50} ry={8} fill="#6a4128" opacity=".8" />
    <path d="M -110 -80 Q 0 -60 112 -80" stroke="#f1d6a8" strokeWidth={8} fill="none" />
    {[-70, -20, 30, 80].map((dx, i) => <circle key={i} cx={dx} cy={-28 + (i % 2) * 8} r={9} fill="#f1d6a8" />)}
    <path d="M -100 -10 Q 0 10 100 -10" stroke="#f1d6a8" strokeWidth={6} fill="none" />
  </g>;
}

// Urediniospora en forma de riñón (30 × 20 µm): lado curvo con verruguitas, lado recto/cóncavo liso.
function Uredo({ x, y, L = 360, rot = 0, s = 1, color = RC.roya, op = 1 }) {
  if (s <= 0) return null;
  const H = 0.67 * L, a = L / 2;
  const d = `M ${a} ${0.08 * H} A ${a} ${0.62 * H} 0 0 0 ${-a} ${0.08 * H} C ${-a} ${0.42 * H} ${-0.3 * L} ${0.5 * H} ${-0.12 * L} ${0.36 * H} Q 0 ${0.26 * H} ${0.12 * L} ${0.36 * H} C ${0.3 * L} ${0.5 * H} ${a} ${0.42 * H} ${a} ${0.08 * H} Z`;
  const verr = Array.from({ length: 15 }, (_, i) => { const th = 0.12 * Math.PI + i * (0.76 * Math.PI / 14); return [a * 1.0 * Math.cos(th), 0.08 * H - 0.62 * H * Math.sin(th)]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    {verr.map(([vx, vy], i) => <circle key={i} cx={vx} cy={vy} r={L * 0.03} fill={color} stroke={KC.ink} strokeWidth={Math.max(2, L * 0.008)} />)}
    <path d={d} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, L * 0.016)} strokeLinejoin="round" />
    <path d={`M ${-0.28 * L} ${-0.18 * H} Q 0 ${-0.42 * H} ${0.26 * L} ${-0.2 * H}`} stroke="#ffe08a" strokeWidth={L * 0.04} fill="none" strokeLinecap="round" opacity=".7" />
    <circle cx={-0.08 * L} cy={0.02 * H} r={L * 0.05} fill="#e07a12" opacity=".7" /><circle cx={0.1 * L} cy={0.04 * H} r={L * 0.05} fill="#e07a12" opacity=".7" />
  </g>;
}

// Estoma visto desde arriba: dos células oclusivas en forma de frijol alrededor del poro. L = largo total.
function Estoma({ x, y, L = 180, rot = 0, abre = 1 }) {
  const a = L / 2, b = 0.62 * a;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={a * 1.12} ry={b * 1.18} fill={RC.epi2} opacity=".9" />
    <ellipse rx={a} ry={b} fill="#59b867" stroke={KC.ink} strokeWidth={4} />
    <ellipse rx={a * 0.72} ry={b * 0.22 * abre + 2} fill="#0a1a10" stroke={KC.ink} strokeWidth={3} />
    <line x1={-a} y1={0} x2={-a * 0.72} y2={0} stroke={KC.ink} strokeWidth={3} /><line x1={a * 0.72} y1={0} x2={a} y2={0} stroke={KC.ink} strokeWidth={3} />
    {[-0.45, 0, 0.45].map((u, i) => <g key={i}><ellipse cx={u * a} cy={-b * 0.55} rx={a * 0.1} ry={b * 0.12} fill="#9be28a" /><ellipse cx={u * a} cy={b * 0.55} rx={a * 0.1} ry={b * 0.12} fill="#9be28a" /></g>)}
  </g>;
}

// Superficie del envés al microscopio: células de la epidermis (onduladas) y varios estomas.
function Enves({ T, estomas = [], seed = 4, Lest = 180, celda = 1 }) {
  const g = krng(seed), cel = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 6; c++) { const cx = (c * 200 + (r % 2) * 100 + g() * 30), cy = 380 + r * 170 + g() * 30; cel.push([cx, cy, (90 + g() * 20) * celda, (70 + g() * 15) * celda]); }
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill={RC.epi} />
    {cel.map(([cx, cy, rx, ry], i) => <path key={i} d={`M ${cx - rx} ${cy} Q ${cx - rx * 0.6} ${cy - ry * 1.1} ${cx} ${cy - ry} Q ${cx + rx * 0.7} ${cy - ry * 0.8} ${cx + rx} ${cy} Q ${cx + rx * 0.6} ${cy + ry * 1.1} ${cx} ${cy + ry} Q ${cx - rx * 0.7} ${cy + ry * 0.8} ${cx - rx} ${cy} Z`} fill={i % 3 ? '#1d4d30' : '#22573a'} stroke="#0f2e1c" strokeWidth={5} />)}
    {estomas.map(([x, y, rot], i) => <Estoma key={i} x={x} y={y} L={Lest} rot={rot} />)}
  </g>;
}

// Cafeto completo (arbusto) con hojas que se caen. caida 0..1, roya 0..1, cerezas 0..1.
const CAFETO = (() => { const g = krng(77), H = []; for (let r = 0; r < 6; r++) { const yy = -120 - r * 105, len = 260 - r * 30; for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const u = (k + 1) / 3.6; H.push({ x: s * len * u, y: yy + 10 + k * 8, rot: s > 0 ? -30 - g() * 25 : 210 + g() * 25, f: g(), r, s }); } } return H; })();
function Cafeto({ T, x, y, s = 1, caida = 0, roya = 0, cerezas = 1, t0 = 0 }) {
  const n = CAFETO.length;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 0 L -10 -700 L 10 -700 L 14 0 Z" fill="#7a5130" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, r) => { const yy = -120 - r * 105, len = 260 - r * 30; return [-1, 1].map((sg) => <path key={r + '' + sg} d={`M 0 ${yy} Q ${sg * len * 0.5} ${yy - 10} ${sg * len} ${yy + 30}`} stroke="#7a5130" strokeWidth={9} fill="none" strokeLinecap="round" />); })}
    {Array.from({ length: 6 }, (_, r) => [-1, 1].map((sg) => <Cerezas key={r + 'c' + sg} x={sg * (150 - r * 18)} y={-100 - r * 105} n={4} r={12} k={cerezas * (r % 2 === 0 || sg > 0 ? 1 : 0)} />))}
    {CAFETO.map((h, i) => {
      const orden = (h.f * 0.7 + (i % 5) * 0.06), cae = kclamp((caida - orden * 0.85) / 0.25, 0, 1);
      if (cae >= 1) return null;
      const dy = cae * cae * 650, dx = Math.sin(cae * 6 + i) * 60 * cae;
      return <HojaCafe key={i} x={h.x + dx} y={h.y + dy} L={120} rot={h.rot + cae * 140 * (h.s)} cara="haz" manchas={[[0.4, 0.3, 30], [0.65, -0.3, 26]]} roya={roya} T={T} seed={i} op={1 - cae * 0.7} />;
    })}
  </g>;
}

// Isla de Ceilán (Sri Lanka), contorno simplificado a mano. k px por grado.
const SL = [[79.87,9.75],[80.25,9.83],[80.6,9.45],[80.9,8.95],[81.2,8.5],[81.4,8.2],[81.7,7.6],[81.88,7.2],[81.85,6.8],[81.6,6.45],[81.3,6.2],[80.9,6.0],[80.6,5.95],[80.2,6.05],[80.05,6.3],[79.9,6.8],[79.85,7.2],[79.8,7.6],[79.75,8.0],[79.8,8.4],[79.92,8.8],[79.95,9.2]];
const slP = (lon, lat, k) => [(lon - 79.6) * k, (10 - lat) * k];
// Matas en la zona montañosa del centro-sur de la isla.
const SL_MATAS = (() => { const g = krng(9), M = []; for (let i = 0; i < 22; i++) M.push([80.35 + g() * 0.95, 6.6 + g() * 1.0, g()]); return M; })();

// Termómetro esquemático.
function Termometro({ x, y, alto = 520, nivel = 0.5, color = KC.red, icono }) {
  const h = alto * nivel;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-alto} width={68} height={alto} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-18} y={-h} width={36} height={h} rx={14} fill={color} />
    <circle cx={0} cy={36} r={58} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={20} x2={34} y1={-alto + 50 + i * 52} y2={-alto + 50 + i * 52} stroke={KC.ink} strokeWidth={4} />)}
    <g transform={`translate(0 ${-alto - 80})`}>{icono}</g>
  </g>;
}

// Tarjeta (para el árbol genealógico del híbrido de Timor).
function Tarjeta({ x, y, texto, sub, k = 1, color = KC.paper, w = 400 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${k}) rotate(-2)`}>
    <rect x={-w / 2 + 10} y={-50 + 10} width={w} height={sub ? 120 : 100} rx={22} fill={KC.ink} />
    <rect x={-w / 2} y={-50} width={w} height={sub ? 120 : 100} rx={22} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={sub ? 4 : 14} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {sub && <text x={0} y={50} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">{sub}</text>}
  </g>;
}

// Dedo que pasa por debajo de la hoja.
function Dedo({ x, y, rot = 0, punta = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -420 -46 L 0 -46 Q 52 -46 52 0 Q 52 46 0 46 L -420 46 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -10 -30 Q 30 -30 34 0 Q 30 30 -10 30 Z" fill="#ffd9c4" stroke={KC.ink} strokeWidth={4} />
    <path d="M -120 -46 Q -130 0 -120 46 M -260 -46 Q -270 0 -260 46" stroke="#d98f6b" strokeWidth={5} fill="none" />
    {punta > 0 && <g opacity={punta}><ellipse cx={20} cy={36} rx={44} ry={16} fill={RC.roya} />{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-10 + i * 14} cy={40 + (i % 2) * 6} r={5} fill={RC.roya2} />)}</g>}
  </g>;
}

function RoyaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hoja, Es: CUES.Espora, Et: CUES.Estomas, Ha: CUES.Haustorios, R: CUES.Ramillete, C: CUES.Caida, P: CUES.Pregunta, S: CUES.Ceilan, E: CUES.Estudio, Cl: CUES.Clima, Ti: CUES.Timor, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const g = krng(5);

  // gancho: el dedo pasa por debajo de la hoja (0.2–1.3 s) y se queda con polvo naranja
  const pasa = kprog(T, K.G + 0.15, K.G + 1.3, kEase.suave);
  const polvoDedo = kprog(T, K.G + 0.5, K.G + 0.9);
  // estomas: tubo germinativo
  const tubo = kprog(T, K.Et + 0.6, K.Et + 2.6, kEase.suave);
  // ramillete
  const brota = kprog(T, K.R + 1.0, K.R + 2.6, kEase.sale), vuela = kprog(T, K.R + 3.0, K.R + 4.6, kEase.suave);
  // Ceilán: matas de café se secan, luego té
  const seca = kprog(T, K.S + 1.6, K.S + 3.6), te = kprog(T, K.S + 4.4, K.S + 6.6);
  const kSL = 160, oxSL = 120, oySL = 560;
  // Clima
  const cl = kprog(T, K.Cl + 0.4, K.Cl + 2.6, kEase.suave);
  const nNoche = klerp(0.36, 0.48, cl), nDia = klerp(0.82, 0.68, cl);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: jarrito + hoja vista por debajo; el dedo se lleva el polvo naranja */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.06} origen="35% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1205} width={1120} height={760} fill="#c98b4f" stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={1260} x2={KW} y2={1260} stroke="#a86e3a" strokeWidth={6} />
          <Jarrito T={T} x={830} y={1120} s={0.95} />
          <path d="M -40 1260 Q 200 1180 330 1000" stroke="#6b4a2b" strokeWidth={18} fill="none" strokeLinecap="round" />
          <Cerezas x={300} y={1060} n={6} r={22} />
          <HojaCafe x={320} y={1010} L={500} rot={-62} cara="enves" manchas={MANCHAS} T={T} seed={2} />
          <HojaCafe x={330} y={1000} L={330} rot={-150} cara="haz" T={T} seed={3} />
          {pasa > 0 && pasa < 1.4 && <Dedo x={klerp(-80, 600, pasa)} y={klerp(1010, 640, pasa) + 40} rot={-55} punta={polvoDedo} />}
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.G + 0.6 + i * 0.05, u = kprog(T, t0, t0 + 1.4); if (u <= 0 || u >= 1) return null;
            return <circle key={i} cx={360 + (i % 5) * 26 + Math.sin(T * 3 + i) * 10} cy={760 + u * 380} r={6 + (i % 3) * 2} fill={i % 2 ? RC.roya : RC.roya2} opacity={1 - u} />; })}
          <Sello T={T} at={K.G + 1.6} x={280} y={480} texto="ÓXIDO" color={KC.red} r={105} />
          {T > K.G + 2.4 && <path d="M 190 400 L 370 560 M 370 400 L 190 560" stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={0.85 * kprog(T, K.G + 2.4, K.G + 2.6)} />}
        </>)}
      </Escena>
      {/* 1 · la hoja por los dos lados: arriba (haz) manchas pálidas; abajo (envés) el polvo naranja */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.1} origen="75% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HojaCafe x={150} y={1080} L={430} rot={-75} cara="haz" manchas={MANCHAS} roya={kprog(T, K.H + 0.4, K.H + 1.6)} T={T} seed={4} />
          <HojaCafe x={680} y={1080} L={430} rot={-75} cara="enves" manchas={MANCHAS} roya={kprog(T, K.H + 0.8, K.H + 2.0)} T={T} seed={5} />
          {T > K.H + 2.6 && <g opacity={kprog(T, K.H + 2.6, K.H + 3.0)}><circle cx={750} cy={790} r={110} fill="rgba(255,255,255,.12)" stroke={KC.white} strokeWidth={12} /><line x1={830} y1={870} x2={920} y2={960} stroke={KC.white} strokeWidth={22} strokeLinecap="round" /></g>}
        </>)}
      </Escena>
      {/* 2 · al microscopio: las urediniosporas en forma de riñón */}
      <Escena T={T} a={K.Es} b={K.Et} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {[[180, 560, 30, 0.35], [880, 1090, -20, 0.4], [170, 1120, 160, 0.3], [560, 520, -150, 0.28], [900, 760, 70, 0.33]].map(([x, y, r, s], i) =>
            <Uredo key={i} x={x + Math.sin(T + i) * 8} y={y + Math.cos(T * 0.8 + i) * 8} L={360} rot={r + T * 4} s={s * kprog(T, K.Es + 0.4 + i * 0.25, K.Es + 0.8 + i * 0.25, kEase.rebote)} />)}
          <Uredo x={460} y={850} L={360} rot={-8 + Math.sin(T) * 3} s={kprog(T, K.Es, K.Es + 0.5, kEase.rebote)} />
        </>)}
      </Escena>
      {/* 3 · con agua germina y entra por un estoma (estoma ≈ la mitad del largo de la espora) */}
      <Escena T={T} a={K.Et} b={K.Ha} zoom={0.05}>
        {fsvg(<>
          <Enves T={T} estomas={[[740, 1000, -10], [200, 1350, 20], [930, 560, 15]]} />
          <ellipse cx={330} cy={720} rx={260} ry={190} fill="rgba(160,220,255,.28)" stroke="#bfe9ff" strokeWidth={6} opacity={kprog(T, K.Et, K.Et + 0.4)} />
          <Uredo x={300} y={700} L={360} rot={10} />
          <path d={`M 440 760 C 560 760 560 980 690 990`} stroke={RC.roya2} strokeWidth={26} fill="none" strokeLinecap="round" strokeDasharray={`${tubo * 520} 999`} />
          <path d={`M 440 760 C 560 760 560 980 690 990`} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray={`${tubo * 520} 999`} opacity=".5" />
          {tubo > 0.95 && <ellipse cx={720} cy={995} rx={40} ry={26} fill={RC.roya2} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Et + 2.6, K.Et + 3.0)} />}
        </>)}
      </Escena>
      {/* 4 · adentro: hifas entre las células y haustorios que sacan nutrientes */}
      <Escena T={T} a={K.Ha} b={K.R} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {Array.from({ length: 12 }, (_, i) => { const c = i % 3, r = Math.floor(i / 3), cx = 230 + c * 310, cy = 720 + r * 200;
            return <g key={i}><rect x={cx - 130} y={cy - 92} width={260} height={184} rx={60} fill={RC.celula} stroke={KC.ink} strokeWidth={6} />
              {[[-70, -40], [-10, -55], [55, -35], [-60, 40], [10, 50], [70, 30]].map(([a, b], j) => <ellipse key={j} cx={cx + a} cy={cy + b} rx={20} ry={11} fill={RC.cloro} transform={`rotate(${j * 30} ${cx + a} ${cy + b})`} />)}
              <circle cx={cx + 5} cy={cy} r={22} fill="#b0e6a0" stroke={KC.ink} strokeWidth={3} /></g>; })}
          {(() => { const h = kprog(T, K.Ha, K.Ha + 1.4, kEase.sale);
            return <path d="M 60 820 L 385 820 L 385 1020 L 695 1020 L 695 1220 L 1020 1220" stroke={RC.roya2} strokeWidth={20} fill="none" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={`${h * 1500} 2000`} />; })()}
          {[[230, 820, -1], [540, 1020, -1], [540, 1020, 1], [850, 1220, -1], [385, 920, 0]].map(([x, y, s], i) => { const k = kprog(T, K.Ha + 0.6 + i * 0.15, K.Ha + 0.9 + i * 0.15, kEase.rebote); if (k <= 0) return null;
            const yy = s === 0 ? y : y + s * 50; const xx = s === 0 ? x + 50 : x;
            return <g key={i} transform={`translate(${xx} ${yy}) scale(${k})`}><line x1={s === 0 ? -50 : 0} y1={s === 0 ? 0 : -s * 50} x2={0} y2={0} stroke={RC.roya2} strokeWidth={10} /><circle r={22} fill={RC.roya} stroke={KC.ink} strokeWidth={4} />
              {Array.from({ length: 3 }, (_, j) => { const u = (T * 0.9 + j / 3) % 1; const dir = s === 0 ? [1, 0] : [0, s]; return <circle key={j} cx={dir[0] * (90 - u * 80)} cy={dir[1] * (90 - u * 80)} r={7} fill="#b0ff9a" opacity={1 - u * 0.5} />; })}</g>; })}
        </>)}
      </Escena>
      {/* 5 · semanas después: un ramillete de esporas nuevas sale por el estoma; el viento y la lluvia las llevan */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.05}>
        {fsvg(<>
          <Enves T={T} estomas={[[540, 1000, 0], [180, 640, 20], [900, 700, -15], [820, 1350, 10]]} Lest={85} seed={6} />
          {Array.from({ length: 9 }, (_, i) => { const ang = -165 + i * 18.75, rad = ang * Math.PI / 180, dummy = 0, k = kprog(T, K.R + 1.0 + i * 0.12, K.R + 1.6 + i * 0.12, kEase.rebote); if (k <= 0) return null;
            const dist = 170 + (i % 2) * 90, bx = 540 + Math.cos(rad) * dist * brota, by = 990 + Math.sin(rad) * dist * brota;
            const vx = vuela * (500 + i * 60), vy = vuela * (-200 + (i % 3) * 120) + Math.sin(T * 3 + i) * 10 * vuela;
            return <g key={i}><line x1={540} y1={995} x2={bx} y2={by} stroke="#ffd27a" strokeWidth={8} opacity={1 - vuela} />
              <Uredo x={bx + vx} y={by + vy} L={170} rot={ang + 90 + vuela * 200} s={k} /></g>; })}
          {vuela > 0 && Array.from({ length: 6 }, (_, i) => { const u = (T * 1.4 + i / 6) % 1; return <path key={i} d="M 0 -22 Q 14 0 0 14 Q -14 0 0 -22 Z" transform={`translate(${120 + i * 160} ${400 + u * 900})`} fill="#bfe9ff" stroke={KC.ink} strokeWidth={3} opacity={vuela * 0.9} />; })}
        </>)}
      </Escena>
      {/* 6 · de vuelta a escala real: el cafeto se queda pelón */}
      <Escena T={T} a={K.C} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={800} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <Cafeto T={T} x={540} y={1200} s={1.0} roya={1} caida={kprog(T, K.C + 0.3, K.C + 3.4)} cerezas={1 - 0.6 * kprog(T, K.C + 2.0, K.C + 3.4)} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿café o té? */}
      <Escena T={T} a={K.P} b={K.S} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g opacity={kprog(T, K.P, K.P + 0.4)}>
            <rect x={50} y={380} width={400} height={210} rx={26} fill="#8fd16f" stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 8 }, (_, i) => <g key={i}><ellipse cx={105 + (i % 4) * 96} cy={430 + Math.floor(i / 4) * 70} rx={38} ry={30} fill={RC.hoja} stroke={KC.ink} strokeWidth={4} /><circle cx={113 + (i % 4) * 96} cy={438 + Math.floor(i / 4) * 70} r={8} fill={RC.cereza} /></g>)}
            <text x={250} y={572} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>cafetal</text>
          </g>
          <g opacity={kprog(T, K.P + 0.5, K.P + 0.9)}>
            <path d="M 470 485 L 590 485" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" /><path d="M 565 460 L 595 485 L 565 510" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x={620} y={380} width={400} height={210} rx={26} fill="#d8f2b0" stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 3 }, (_, i) => <rect key={i} x={650} y={410 + i * 46} width={340} height={34} rx={17} fill={RC.te} stroke={KC.ink} strokeWidth={4} />)}
            <text x={820} y={572} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>té</text>
          </g>
          <Interrogacion T={T} x={290} y={1170} tam={480} />
        </>)}
      </Escena>
      {/* 8 · Ceilán, siglo XIX: el café se seca y la isla se llena de té */}
      <Escena T={T} a={K.S} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g transform={`translate(${oxSL} ${oySL})`}>
          <path d={'M ' + SL.map(([a, b]) => slP(a, b, kSL).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z'} fill="#f4dfa0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          {SL_MATAS.map(([lon, lat, f], i) => { const [px, py] = slP(lon, lat, kSL); const sec = kclamp(seca * 1.5 - f * 0.5, 0, 1), t2 = kclamp(te * 1.5 - f * 0.5, 0, 1);
            return <g key={i}>
              {t2 < 1 && <g opacity={1 - t2}><circle cx={px} cy={py} r={20} fill={mixHex('#1f7a3a', '#9a6b3a', sec)} stroke={KC.ink} strokeWidth={3} />{sec < 0.5 && <circle cx={px + 6} cy={py + 4} r={6} fill={RC.cereza} />}{sec > 0.3 && <circle cx={px - 4} cy={py - 5} r={7} fill={RC.roya} opacity={sec} />}</g>}
              {t2 > 0 && <ellipse cx={px} cy={py} rx={26 * t2} ry={14 * t2} fill={RC.te} stroke={KC.ink} strokeWidth={3} />}
            </g>; })}
          <circle cx={slP(79.86, 6.93, kSL)[0]} cy={slP(79.86, 6.93, kSL)[1]} r={9} fill={KC.ink} />
          <text x={slP(79.86, 6.93, kSL)[0] - 16} y={slP(79.86, 6.93, kSL)[1] + 8} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Colombo</text>
        </g>)}
        {T > K.S + 2.0 && T < K.S + 4.6 && fsvg(<g opacity={kprog(T, K.S + 2.0, K.S + 2.4) * (1 - kprog(T, K.S + 4.2, K.S + 4.6))} transform="translate(560 1000)">
          <rect x={0} y={-160} width={420} height={230} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
          <text x={210} y={-115} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>precio del café</text>
          {(() => { const u = kprog(T, K.S + 2.3, K.S + 3.6); const pts = [[30, -80], [120, -70], [200, -40], [300, 10], [390, 40]]; const n = Math.max(2, Math.ceil(u * pts.length)); return <path d={'M ' + pts.slice(0, n).map((p) => p.join(' ')).join(' L ')} stroke={KC.red} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />; })()}
          <text x={210} y={60} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">años 1880</text>
        </g>, 30)}
      </Escena>
      {/* 9 · 2012–2013: Centroamérica y México */}
      <Escena T={T} a={K.E} b={K.Cl} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <MapaMexico x={40} y={580} ancho={1000} centro={mixHex('#bfe3b4', '#ff7a1a', kprog(T, K.E + 2.4, K.E + 3.4))}>
            {[[-92.6, 16.4], [-96.9, 19.5], [-96.6, 16.9], [-97.9, 20.1], [-99.5, 17.4]].map(([lo, la], i) => { const [px, py] = mxProy(lo, la); const k = kprog(T, K.E + 2.6 + i * 0.12, K.E + 2.9 + i * 0.12, kEase.rebote); return k > 0 ? <circle key={i} cx={px} cy={py} r={13 * k} fill={RC.roya} stroke={KC.ink} strokeWidth={3} /> : null; })}
          </MapaMexico>
          {T > K.E + 3.0 && <g opacity={kprog(T, K.E + 3.0, K.E + 3.4)} transform="translate(560 540)">
            <rect x={0} y={0} width={470} height={300} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <text x={235} y={44} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Centroamérica · producción</text>
            {(() => { const u = kprog(T, K.E + 3.4, K.E + 4.4, kEase.sale); return <>
              <rect x={40} y={80} width={260} height={56} rx={10} fill="#8a6a4a" stroke={KC.ink} strokeWidth={4} />
              <rect x={40} y={170} width={260 * klerp(1, 0.84, u)} height={56} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
              <text x={44} y={160} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>2011–12</text>
              <text x={44} y={252} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>2012–13</text>
              <text x={455} y={215} textAnchor="end" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={u}>−16 %</text>
            </>; })()}
            <path d="M 300 300 L 330 440" stroke={KC.ink} strokeWidth={6} strokeDasharray="12 10" />
          </g>}
        </>)}
      </Escena>
      {/* 10 · el clima de 2012: noches más tibias, días menos calientes */}
      <Escena T={T} a={K.Cl} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Termometro x={430} y={1010} alto={460} nivel={nNoche} color="#5b7bff" icono={<g><circle r={46} fill="#f4f1d0" stroke={KC.ink} strokeWidth={5} /><circle cx={22} cy={-12} r={40} fill={KC.pink} /></g>} />
          <Termometro x={800} y={1010} alto={460} nivel={nDia} color={KC.red} icono={<g>{Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={0} x2={Math.cos(i * 0.785) * 66} y2={Math.sin(i * 0.785) * 66} stroke={KC.ink} strokeWidth={6} />)}<circle r={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /></g>} />
          {(() => { const yN = 1010 - 460 * nNoche, yD = 1010 - 460 * nDia; return <g>
            <line x1={470} y1={yN} x2={760} y2={yN} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" /><line x1={615} y1={yD} x2={760} y2={yD} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
            <line x1={615} y1={yN - 6} x2={615} y2={yD + 6} stroke={KC.ink} strokeWidth={8} /><path d={`M 599 ${yD + 22} L 615 ${yD + 4} L 631 ${yD + 22} M 599 ${yN - 22} L 615 ${yN - 4} L 631 ${yN - 22}`} stroke={KC.ink} strokeWidth={6} fill="none" />
          </g>; })()}
          <text x={430} y={1112} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>noche</text><text x={430} y={1150} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Cl + 1.0, K.Cl + 1.4)}>mínimas +0.9 °C</text>
          <text x={800} y={1112} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>día</text><text x={800} y={1150} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Cl + 1.4, K.Cl + 1.8)}>máximas −1.2 °C</text>
          {Array.from({ length: 6 }, (_, i) => { const k = kprog(T, K.Cl + 3.0 + i * 0.12, K.Cl + 3.3 + i * 0.12, kEase.rebote); return k > 0 ? <Uredo key={i} x={110 + (i % 2) * 140} y={720 + Math.floor(i / 2) * 150} L={110} rot={i * 50 + T * 20} s={k} /> : null; })}
        </>)}
      </Escena>
      {/* 11 · la defensa: el híbrido de Timor y los Catimor (y la roya que evoluciona) */}
      <Escena T={T} a={K.Ti} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Tarjeta x={260} y={470} texto="híbrido de Timor" w={430} k={kprog(T, K.Ti + 0.2, K.Ti + 0.6, kEase.rebote)} />
          <text x={260} y={612} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Ti + 0.6, K.Ti + 0.8)}>×</text>
          <Tarjeta x={260} y={700} texto="Caturra" w={300} k={kprog(T, K.Ti + 0.7, K.Ti + 1.1, kEase.rebote)} />
          {T > K.Ti + 1.2 && <path d="M 260 770 L 260 850" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" opacity={kprog(T, K.Ti + 1.2, K.Ti + 1.5)} />}
          <Tarjeta x={260} y={900} texto="Catimor" w={300} color={KC.yellow} k={kprog(T, K.Ti + 1.4, K.Ti + 1.8, kEase.rebote)} />
          <rect x={0} y={1200} width={KW} height={800} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <g opacity={kprog(T, K.Ti + 1.6, K.Ti + 2.0)}><Cafeto T={T} x={720} y={1210} s={0.62} roya={kprog(T, K.Ti + 3.8, K.Ti + 4.8)} cerezas={1} /></g>
          {T > K.Ti + 2.0 && <g transform={`translate(720 ${840}) scale(${kprog(T, K.Ti + 2.0, K.Ti + 2.4, kEase.rebote)})`} opacity={1 - 0.6 * kprog(T, K.Ti + 3.8, K.Ti + 4.4)}>
            <path d="M 0 -110 L 90 -80 Q 95 30 0 110 Q -95 30 -90 -80 Z" fill="rgba(47,224,168,.35)" stroke={KC.ink} strokeWidth={8} />
            <path d="M -36 0 L -8 30 L 42 -34" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo jarrito y la misma rama, ahora con hojas sanas; algo de polvo naranja al fondo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="35% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1205} width={1120} height={760} fill="#c98b4f" stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={1260} x2={KW} y2={1260} stroke="#a86e3a" strokeWidth={6} />
          <HojaCafe x={700} y={760} L={220} rot={-120} cara="enves" manchas={[[0.5, 0.2, 40]]} roya={kprog(T, K.Ci + 1.2, K.Ci + 2.2)} T={T} seed={9} op={0.85} />
          <Jarrito T={T} x={830} y={1120} s={0.95} />
          <path d="M -40 1260 Q 200 1180 330 1000" stroke="#6b4a2b" strokeWidth={18} fill="none" strokeLinecap="round" />
          <Cerezas x={300} y={1060} n={6} r={22} />
          <HojaCafe x={320} y={1010} L={500} rot={-62} cara="haz" T={T} seed={2} />
          <HojaCafe x={330} y={1000} L={330} rot={-150} cara="haz" T={T} seed={3} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.7} until={K.H - 0.2} texto="es un hongo" x={300} y={640} tam={46} borde={RC.roya} />
      <Chip T={T} at={K.H + 0.3} until={K.Es - 0.3} texto="roya del café" x={540} y={430} tam={44} borde={RC.roya} />
      <Etq T={T} at={K.H + 0.6} until={K.Es - 0.3} x={250} y={520} texto="Hemileia vastatrix" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.Es - 0.3} x={70} y={1160} texto="haz (arriba)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.6} until={K.Es - 0.3} x={560} y={1160} texto="envés (abajo)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.8} until={K.Et - 0.3} x={60} y={430} texto="urediniospora" tam={34} color={RC.roya2} />
      <Etq T={T} at={K.Es + 1.4} until={K.Et - 0.3} x={560} y={690} texto="lado curvo: verruguitas" lado="izq" tam={26} />
      <Etq T={T} at={K.Es + 1.9} until={K.Et - 0.3} x={560} y={1010} texto="lado recto: liso" lado="izq" tam={26} />
      <Chip T={T} at={K.Et + 1.0} until={K.Ha - 0.3} texto="estoma = poro de la hoja" x={460} y={440} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.Et + 0.3} until={K.Ha - 0.3} x={140} y={500} texto="agua" tam={28} color="#bfe9ff" />
      <Etq T={T} at={K.Et + 2.0} until={K.Ha - 0.3} x={860} y={1120} texto="estoma" lado="izq" tam={28} />
      <Chip T={T} at={K.Ha + 0.8} until={K.R - 0.3} texto="solo vive en tejido vivo" x={440} y={440} tam={34} borde={RC.roya} />
      <Etq T={T} at={K.Ha + 1.2} until={K.R - 0.3} x={60} y={1500} texto="haustorio = “chupón”" tam={28} color={RC.roya2} />
      <Chip T={T} at={K.R + 0.2} until={K.C - 0.3} texto="⏳ 3–5 semanas después" x={430} y={440} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.R + 3.1} until={K.C - 0.3} x={60} y={560} texto="viento y lluvia las dispersan" tam={26} color="#bfe9ff" />
      <Chip T={T} at={K.C + 1.2} until={K.P - 0.3} texto="pierde hojas → menos cosecha" x={390} y={440} tam={32} borde={KC.red} />
      <Chip T={T} at={K.S + 0.3} until={K.E - 0.3} texto="siglo XIX · roya + precios bajos" x={430} y={440} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.8} until={K.E - 0.3} x={500} y={1150} texto="Ceilán (hoy Sri Lanka)" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 5.0} until={K.E - 0.3} x={600} y={1020} texto="té" tam={40} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.3} anio="2012–13" quien="Centroamérica y México" revista="Avelino et al., Food Security, 2015" y={760} />
      <Chip T={T} at={K.Cl + 0.3} until={K.Ti - 0.3} texto="Guatemala · 2012" x={640} y={400} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Cl + 3.0} until={K.Ti - 0.3} texto="hipótesis: probablemente lo aceleró" x={560} y={300} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ti + 4.0} until={K.Ci - 0.3} texto="la roya evoluciona" x={300} y={1080} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="tu café vs. la roya" x={360} y={560} tam={40} borde={RC.roya} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={360} />
      <BarraEscala T={T} at={K.H} until={K.Es} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Es} until={K.Ha} texto="30 µm" largo={360} />
      <BarraEscala T={T} at={K.Ha} until={K.R} texto="30 µm" largo={360} />
      <BarraEscala T={T} at={K.R} until={K.C} texto="30 µm" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.P} texto="1 m" largo={330} />
      <BarraEscala T={T} at={K.S} until={K.E} texto="100 km" largo={144} />
      <BarraEscala T={T} at={K.E} until={K.Cl} texto="500 km" largo={111} />
      <BarraEscala T={T} at={K.Ti} until={K.Ci} texto="1 m" largo={205} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="10 cm" largo={360} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Ese polvo naranja *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Es - 0.1} texto="La roya del café *sale por abajo.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.Et - 0.1} texto="Cada granito: *una espora.*" />
      <Subtitulo T={T} idx={3} at={K.Et + 0.1} until={K.Ha - 0.1} texto="Entra por *los estomas.*" />
      <Subtitulo T={T} idx={4} at={K.Ha + 0.1} until={K.R - 0.1} texto="Le roba comida *a células vivas.*" />
      <Subtitulo T={T} idx={5} at={K.R + 0.1} until={K.C - 0.1} texto="Brota un *ramillete de esporas.*" />
      <Subtitulo T={T} idx={6} at={K.C + 0.1} until={K.P - 0.1} texto="Sin hojas: *menos café.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.S - 0.1} texto="¿Cambiar lo que *siembra un país?*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.E - 0.1} texto="Ceilán: del café *al té.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Cl - 0.1} texto="Cosecha centroamericana: *−16 %.*" />
      <Subtitulo T={T} idx={10} at={K.Cl + 0.1} until={K.Ti - 0.1} texto="Noches más tibias: *quizá lo aceleró.*" />
      <Subtitulo T={T} idx={11} at={K.Ti + 0.1} until={K.Ci - 0.1} texto="La defensa: *el híbrido de Timor.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Tu taza vs. *el polvo naranja.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Es + 0.4, K.Et + 2.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ha + 0.3, K.R + 2.6, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.5, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.S + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 3.6, K.E - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.E + 2.6, K.Cl + 0.8, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.Ti + 0.4, K.Ti + 3.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ti + 3.9, K.Ci - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="24" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_05_sonriendo_dientes_uniformes.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RoyaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RoyaShot /></CompositionStage></div>;
}
window.RoyaApp = RoyaApp;
