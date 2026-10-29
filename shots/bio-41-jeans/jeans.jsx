// Shot Biotecnológico #41 · Tus jeans los deslavó un hongo (celulasas, amilasas y lacasas en la mezclilla) — NARRADO (N1 por dentro + N3 capítulos).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático: hilo, fibras, enzimas y moléculas no están a escala entre sí.
const INDIGO = '#24427e', INDIGO2 = '#1a3263', DESL = '#9fc0e6', ALGODON = '#f4efe4', PIEDRA = '#bdb7ad';
const CEL = '#9b5de5', AMI = '#ff8a1f', LAC = '#ff5fa2', TRICHO = '#4caf50';

function SvgJ({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- MACRO: jeans en el tendedero ---------- */
function Tendedero({ y = 470 }) {
  return <g><line x1={-20} y1={y} x2={KW + 20} y2={y - 30} stroke={KC.ink} strokeWidth={8} /></g>;
}
function Jeans({ T, x, y, s = 1, desgaste = 0, id = 'j' }) {
  const rot = Math.sin(T * 1.3) * 2.2;
  const pierna = 'M -170 40 L 170 40 L 196 900 L 22 900 L 0 290 L -22 900 L -196 900 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <radialGradient id={id + 'r1'} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={DESL} stopOpacity="1" /><stop offset="1" stopColor={DESL} stopOpacity="0" /></radialGradient>
      <linearGradient id={id + 'lg'} x1="0" x2="1"><stop offset="0" stopColor={INDIGO2} /><stop offset="0.5" stopColor={INDIGO} /><stop offset="1" stopColor={INDIGO2} /></linearGradient>
      <clipPath id={id + 'cp'}><path d={pierna} /><rect x={-170} y={0} width={340} height={44} /></clipPath>
    </defs>
    <path d={pierna} fill={`url(#${id}lg)`} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g clipPath={`url(#${id}cp)`} opacity={desgaste}>
      {[[-100, 620], [100, 620], [-80, 260], [80, 260]].map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy} rx={i < 2 ? 110 : 120} ry={i < 2 ? 150 : 130} fill={`url(#${id}r1)`} />)}
      {[0, 1, 2, 3].map((i) => <path key={'b' + i} d={`M ${-150 + i * 8} ${150 + i * 18} Q -90 ${170 + i * 18} ${-40 - i * 6} ${150 + i * 20}`} stroke={DESL} strokeWidth={8} fill="none" opacity={0.8} strokeLinecap="round" />)}
    </g>
    <rect x={-172} y={0} width={344} height={44} fill={INDIGO2} stroke={KC.ink} strokeWidth={8} />
    {[-130, -60, 60, 130].map((bx) => <rect key={bx} x={bx - 9} y={-6} width={18} height={56} rx={4} fill={INDIGO} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={0} cy={22} r={12} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    <path d="M -150 50 Q -100 140 -40 60" stroke={KC.gold} strokeWidth={4} fill="none" strokeDasharray="10 8" />
    <path d="M 150 50 Q 100 140 40 60" stroke={KC.gold} strokeWidth={4} fill="none" strokeDasharray="10 8" />
    <path d="M -186 120 L -204 880 M 186 120 L 204 880" stroke={KC.gold} strokeWidth={4} strokeDasharray="12 9" />
    <path d="M 0 50 L 0 280" stroke={KC.gold} strokeWidth={4} strokeDasharray="10 8" />
    {[-120, 120].map((px) => <g key={px}><rect x={px - 16} y={-30} width={32} height={60} rx={6} fill="#d9a066" stroke={KC.ink} strokeWidth={5} /></g>)}
  </g>;
}
function Pomez({ x, y, s = 1, rot = 0, o = 1, seed = 3 }) {
  const R = krng(seed);
  const pts = Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2, r = 50 + R() * 22; return `${Math.cos(a) * r * 1.25},${Math.sin(a) * r}`; }).join(' ');
  const poros = Array.from({ length: 9 }, () => [(R() - 0.5) * 90, (R() - 0.5) * 60, 4 + R() * 6]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={pts} fill={PIEDRA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {poros.map(([px, py, r], i) => <circle key={i} cx={px} cy={py} r={r} fill="#8d867b" />)}
  </g>;
}
// Colonia chiquita de Trichoderma: hifas blancas que crecen y bolitas verdes de conidios.
function HongoTricho({ T, x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const ramas = [[0, -1], [-0.8, -0.6], [0.8, -0.6], [-1, 0.1], [1, 0.1], [-0.4, -0.95], [0.45, -0.9]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={60 * crece} fill="rgba(255,255,255,.35)" />
    {ramas.map(([dx, dy], i) => { const L = (60 + (i % 3) * 18) * crece, w = mece(T, i + 3) * 6;
      return <g key={i}>
        <path d={`M 0 0 Q ${dx * L * 0.5 + w} ${dy * L * 0.5} ${dx * L} ${dy * L}`} stroke="#ffffff" strokeWidth={5} fill="none" strokeLinecap="round" />
        {crece > 0.6 && <g>{[0, 1, 2].map((k) => <circle key={k} cx={dx * L + (k - 1) * 7} cy={dy * L - 6 + (k % 2) * 6} r={7} fill={TRICHO} stroke={KC.ink} strokeWidth={2.5} />)}</g>}
      </g>; })}
  </g>;
}

/* ---------- MICRO: la tela, el hilo y la fibra ---------- */
// Sarga 3/1: el hilo azul (urdimbre) pasa por encima de tres blancos (trama) y por debajo de uno → la diagonal de la mezclilla.
function Sarga({ T, w, h, c = 46 }) {
  const dx = (T * 12) % (c * 4), cols = Math.ceil(w / c) + 5, filas = Math.ceil(h / c) + 1, celdas = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < filas; j++) {
    const arriba = ((i + j) % 4) !== 3, X = i * c - dx - c * 2, Y = j * c;
    celdas.push(arriba
      ? <rect key={i + '-' + j} x={X + 3} y={Y - 2} width={c - 6} height={c + 4} rx={10} fill={INDIGO} stroke="#0d1a38" strokeWidth={3} />
      : <rect key={i + '-' + j} x={X - 2} y={Y + 4} width={c + 4} height={c - 8} rx={10} fill={ALGODON} stroke="#b9ae98" strokeWidth={3} />);
  }
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}><rect width={w} height={h} fill="#c9c2b4" />{celdas}</svg>;
}
// Corte transversal de un hilo: fibras de algodón con forma de frijol (lumen aplastado). anillo = fracción del radio teñida por fuera.
const FIBRAS = (() => { const R = krng(41), out = []; const n = 120;
  for (let k = 0; k < n; k++) { const r = Math.sqrt((k + 0.5) / n), a = k * 2.39996; out.push({ r, a, rot: R() * 180, s: 0.85 + R() * 0.3 }); } return out; })();
function HiloCorte({ T, cx, cy, R = 330, anillo = 0.35, pinta = 1, aclara = 0 }) {
  return <g>
    <circle cx={cx} cy={cy} r={R + 26} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" strokeWidth={3} strokeDasharray="8 10" />
    {FIBRAS.map((f, i) => { const x = cx + Math.cos(f.a) * f.r * R + mece(T, i) * 2, y = cy + Math.sin(f.a) * f.r * R + mece(T, i + 50) * 2;
      const azul = f.r > 1 - anillo * pinta ? 1 : 0, prof = azul ? kclamp((f.r - (1 - anillo)) / anillo, 0, 1) : 0;
      const col = azul ? mixHex(mixHex('#4a72b8', INDIGO2, prof), DESL, aclara) : ALGODON;
      const sz = R / 330;
      return <g key={i} transform={`translate(${x} ${y}) rotate(${f.rot}) scale(${f.s * sz})`}>
        <path d="M -17 -6 Q -10 -14 0 -9 Q 10 -14 17 -6 Q 22 4 12 10 Q 0 15 -12 10 Q -22 4 -17 -6 Z" fill={col} stroke={KC.ink} strokeWidth={3} />
        <path d="M -9 0 Q 0 -3 9 0" stroke={azul ? '#0d1a38' : '#c8bda6'} strokeWidth={2.5} fill="none" />
      </g>; })}
  </g>;
}
// Enzima esquemática que "muerde" (boca 0..1).
function Enzima({ x, y, s = 1, color = CEL, boca = 0, rot = 0, o = 1 }) {
  const a = (15 + boca * 32) * Math.PI / 180;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M 0 0 L ${Math.cos(a) * 50} ${-Math.sin(a) * 50} A 50 50 0 1 0 ${Math.cos(a) * 50} ${Math.sin(a) * 50} Z`} fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-6} cy={-24} r={7} fill="#fff" /><circle cx={-4} cy={-24} r={3.5} fill={KC.ink} />
  </g>;
}
// Cadena de celulosa: anillos de glucosa unidos; cortes = [{i, p}] abre un hueco después del anillo i.
function Celulosa({ T, x, y, n = 9, paso = 92, cortes = [] }) {
  let off = 0; const els = [];
  for (let k = 0; k < n; k++) {
    const c = cortes.find((q) => q.i === k - 1); if (c) off += 60 * c.p;
    const cx = x + k * paso + off, cy = y + Math.sin(T * 2 + k) * 6;
    const hex = Array.from({ length: 6 }, (_, j) => { const a = Math.PI / 6 + j * Math.PI / 3; return `${cx + Math.cos(a) * 32},${cy + Math.sin(a) * 32}`; }).join(' ');
    if (k > 0 && !(c && c.p > 0.15)) els.push(<line key={'l' + k} x1={cx - paso - (c ? 60 * c.p : 0) + 32} y1={cy} x2={cx - 32} y2={cy} stroke={ALGODON} strokeWidth={8} />);
    els.push(<polygon key={k} points={hex} fill="rgba(244,239,228,.18)" stroke={ALGODON} strokeWidth={6} />);
  }
  return <g>{els}</g>;
}
function Hifas({ T, x, y, g = 1 }) {
  const ramas = [[0, 0, 520, -20], [180, -8, 300, -130], [320, -14, 470, 90], [90, -4, 160, 120]];
  return <g transform={`translate(${x} ${y})`}>
    {ramas.map(([x0, y0, x1, y1], i) => { const p = kclamp(g * 1.4 - i * 0.2, 0, 1), xe = klerp(x0, x1, p), ye = klerp(y0, y1, p) + mece(T, i) * 5;
      return p > 0 && <g key={i}>
        <path d={`M ${x0} ${y0} L ${xe} ${ye}`} stroke="#eafff7" strokeWidth={30} strokeLinecap="round" opacity={0.9} />
        <path d={`M ${x0} ${y0} L ${xe} ${ye}`} stroke="#bfe9d6" strokeWidth={18} strokeLinecap="round" />
        {[0.33, 0.66].map((u) => p > u && <line key={u} x1={klerp(x0, x1, u)} y1={klerp(y0, y1, u) - 14} x2={klerp(x0, x1, u)} y2={klerp(y0, y1, u) + 14} stroke="#7fb8a0" strokeWidth={4} />)}
      </g>; })}
  </g>;
}
// Fibra vista de lado, con su capa azul de índigo en la orilla (granitos que se sueltan).
const GRANOS = Array.from({ length: 26 }, (_, i) => ({ x: 40 + i * 40, sale: 0.15 + ((i * 7) % 26) / 26 * 0.8 }));
function FibraLado({ T, y0 = 770, y1 = 1050, p = 0 }) {
  return <g>
    <rect x={-40} y={y0} width={KW + 80} height={y1 - y0} rx={40} fill={ALGODON} stroke={KC.ink} strokeWidth={8} />
    {[0.3, 0.5, 0.7].map((u) => <path key={u} d={`M -40 ${klerp(y0, y1, u)} Q 540 ${klerp(y0, y1, u) + Math.sin(T + u * 9) * 10} ${KW + 40} ${klerp(y0, y1, u)}`} stroke="#d8ccb3" strokeWidth={5} fill="none" />)}
    {GRANOS.map((g, i) => { const t = kprog(p, g.sale, g.sale + 0.12), R = 22;
      return [y0, y1].map((yy, k) => { const dir = k ? 1 : -1, xx = g.x + (k ? 20 : 0);
        return <g key={i + '-' + k} transform={`translate(${xx + t * mece(T, i) * 40} ${yy + dir * t * 260})`} opacity={1 - t * 0.7}>
          <rect x={-R} y={-R * 0.7} width={R * 2} height={R * 1.4} rx={8} fill={INDIGO} stroke="#0d1a38" strokeWidth={3} transform={`rotate(${t * 120 * dir})`} /></g>; }); })}
  </g>;
}

/* ---------- LAVADORA INDUSTRIAL ---------- */
function Lavadora({ T, cx, cy, r = 280, golpes = 0, polvo = 0 }) {
  const sac = golpes > 0 ? Math.sin(T * 40) * 6 * golpes : 0, giro = T * 140;
  const cosas = Array.from({ length: 10 }, (_, i) => i);
  return <g transform={`translate(${sac} 0)`}>
    <rect x={cx - r - 70} y={cy - r - 110} width={2 * r + 140} height={2 * r + 200} rx={40} fill="#c9ced6" stroke={KC.ink} strokeWidth={10} />
    <rect x={cx - r - 40} y={cy - r - 90} width={2 * r + 80} height={50} rx={14} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((k) => <circle key={k} cx={cx + r - 20 - k * 60} cy={cy - r - 65} r={14} fill={[KC.red, KC.mint, KC.yellow][k]} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={cx} cy={cy} r={r} fill="#5b6475" stroke={KC.ink} strokeWidth={12} />
    <circle cx={cx} cy={cy} r={r - 30} fill="#2a3242" />
    <g transform={`rotate(${giro} ${cx} ${cy})`}>
      {cosas.map((i) => { const a = i / 10 * Math.PI * 2, rr = (r - 90) * (0.55 + (i % 3) * 0.18), x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        return i % 2 ? <Pomez key={i} x={x} y={y} s={0.5} rot={i * 40} seed={i + 2} /> : <path key={i} d={`M ${x - 46} ${y - 20} Q ${x} ${y - 46} ${x + 46} ${y - 16} Q ${x + 30} ${y + 30} ${x - 40} ${y + 24} Z`} fill={INDIGO} stroke={KC.ink} strokeWidth={5} />; })}
    </g>
    <circle cx={cx} cy={cy} r={r - 30} fill="rgba(180,220,255,.16)" />
    <path d={`M ${cx - r * 0.5} ${cy - r * 0.62} Q ${cx - r * 0.1} ${cy - r * 0.8} ${cx + r * 0.25} ${cy - r * 0.7}`} stroke="rgba(255,255,255,.55)" strokeWidth={14} fill="none" strokeLinecap="round" />
    {golpes > 0 && [[cx - r - 30, cy + r - 10], [cx + r + 20, cy - 40], [cx + 40, cy + r + 50]].map(([x, y], i) => { const g = kprog(golpes, i * 0.25, i * 0.25 + 0.2);
      return g > 0 && <g key={i} opacity={g}><path d={`M ${x - 30} ${y} Q ${x} ${y - 24} ${x + 30} ${y} Q ${x} ${y + 10} ${x - 30} ${y} Z`} fill="#7b8291" stroke={KC.ink} strokeWidth={4} />
        <path d={`M ${x - 46} ${y - 30} l 14 10 M ${x + 46} ${y - 30} l -14 10 M ${x} ${y - 46} l 0 14`} stroke={KC.red} strokeWidth={6} strokeLinecap="round" /></g>; })}
    {polvo > 0 && Array.from({ length: 14 }, (_, i) => { const R = krng(i + 9), a = R() * Math.PI * 2, d = (80 + R() * 260) * polvo;
      return <circle key={i} cx={cx + Math.cos(a) * (r * 0.7 + d)} cy={cy + Math.sin(a) * (r * 0.5 + d) - polvo * 60} r={(30 + R() * 50) * (0.4 + polvo)} fill="rgba(190,184,172,.7)" opacity={1 - polvo * 0.5} />; })}
  </g>;
}

/* ---------- AYUDANTES, ESTUDIO, TIENDAS ---------- */
function Indigo({ x, y, s = 1, parte = 0, T = 0 }) {
  const sep = parte * 120, col = mixHex('#2346ff', '#ff8a1f', parte);
  const mitad = (dir) => <g transform={`translate(${dir * (70 + sep)} ${Math.sin(T * 2 + dir) * 6 * parte}) scale(${dir} 1)`}>
    <polygon points="0,-40 34,-60 68,-40 68,0 34,20 0,0" fill="none" stroke={col} strokeWidth={10} strokeLinejoin="round" />
    <polygon points="-40,-48 0,-40 0,0 -40,12 -60,-18" fill="none" stroke={col} strokeWidth={10} strokeLinejoin="round" />
    <line x1={-40} y1={-48} x2={-52} y2={-92} stroke="#ff3b2f" strokeWidth={9} /><circle cx={-54} cy={-100} r={13} fill="#ff3b2f" stroke={KC.ink} strokeWidth={3} />
    <circle cx={-40} cy={36} r={12} fill="#2346ff" stroke={KC.ink} strokeWidth={3} />
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {parte < 0.2 && <g opacity={1 - parte * 5}><line x1={-62} y1={-14} x2={62} y2={-14} stroke={col} strokeWidth={9} /><line x1={-62} y1={4} x2={62} y2={4} stroke={col} strokeWidth={9} /></g>}
    {mitad(-1)}{mitad(1)}
    {parte > 0.05 && parte < 0.7 && <g opacity={1 - parte}>{[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={0} y1={-6} x2={Math.cos(k) * 70} y2={-6 + Math.sin(k) * 70} stroke={KC.yellow} strokeWidth={6} />)}</g>}
  </g>;
}
function Tienda({ T, x, y, w = 440, h = 340, moho = 0, hoyos = 0 }) {
  const R = krng(77), manchas = Array.from({ length: 14 }, () => [(R() - 0.5) * w * 0.7, -R() * h * 0.75, 14 + R() * 30, R()]);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} 0 L 0 ${-h} L ${w / 2} 0 Z`} fill="#6b7a3a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M -60 0 L 0 ${-h * 0.55} L 60 0 Z`} fill="#3e4721" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={-h} x2={0} y2={-h - 50} stroke={KC.ink} strokeWidth={8} />
    <path d={`M 0 ${-h - 50} l 50 14 l -50 14 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    {manchas.map(([mx, my, r, f], i) => { const p = kprog(moho, f * 0.7, f * 0.7 + 0.3); if (my < -h * (1 - Math.abs(mx) / (w / 2)) + 10) return null;
      return p > 0 && <g key={i}><circle cx={mx} cy={my} r={r * p} fill="#2f5d2a" opacity={0.85} /><circle cx={mx} cy={my} r={r * p * 0.55} fill={TRICHO} />
        {hoyos > f && <path d={`M ${mx - r * 0.4} ${my} l ${r * 0.3} ${-r * 0.4} l ${r * 0.4} ${r * 0.2} l ${-r * 0.1} ${r * 0.5} Z`} fill={KC.ink} />}</g>; })}
  </g>;
}
function Palmera({ T, x, y, s = 1 }) {
  const w = mece(T, 9) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 Q -30 -200 ${-10 + w} -420`} stroke="#8a5a2b" strokeWidth={34} fill="none" strokeLinecap="round" />
    {[-150, -100, -40, 20, 80].map((a, i) => <path key={i} d={`M ${-10 + w} -420 q ${Math.cos(a * Math.PI / 180) * 120} ${Math.sin(a * Math.PI / 180) * 120 - 40} ${Math.cos(a * Math.PI / 180) * 220} ${Math.sin(a * Math.PI / 180) * 220 + 40}`} stroke={KC.leaf} strokeWidth={26} fill="none" strokeLinecap="round" />)}
  </g>;
}

function Jeans41() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Hi: CUES.Hilos, An: CUES.Anillo, Pi: CUES.Piedra, Pb: CUES.Problema, Pr: CUES.Pregunta, Ce: CUES.Celulasa, Mo: CUES.Mordida,
    Gr: CUES.Gramos, Ay: CUES.Ayudantes, Es: CUES.Estudio, Ti: CUES.Tiendas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G + 0.05, K.G + 0.9, kEase.entra || ((p) => p * p));
  const rebota = kprog(T, K.G + 0.9, K.G + 1.6, kEase.sale);
  const hongo = kprog(T, K.G + 1.7, K.G + 2.8, kEase.sale);
  const rodilla = { x: 300, y: 1010 };
  const mordida = kprog(T, K.Mo + 0.4, K.Gr - 0.3);
  const corta = (k) => kprog(T, K.Ce + 2.6 + k * 0.5, K.Ce + 3.2 + k * 0.5, kEase.sale);
  const enzX = (k) => klerp(-80, 330 + k * 184, kprog(T, K.Ce + 1.0 + k * 0.3, K.Ce + 2.6 + k * 0.5, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho: los jeans en el tendedero; la piedra se va y aparece el hongo. La Lupa abre la tela. */}
      <Escena T={T} a={K.G} b={K.An} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgJ>
          <Tendedero y={470} />
          <Jeans T={T} x={380} y={470} s={0.9} desgaste={klerp(0.15, 0.9, hongo)} id="j0" />
          <HongoTricho T={T} x={rodilla.x} y={rodilla.y} s={0.9} crece={hongo} />
          {rebota < 1 && <Pomez x={klerp(rodilla.x + 40, rodilla.x, cae) + rebota * 420} y={klerp(260, rodilla.y - 30, cae) - Math.sin(rebota * Math.PI) * 220 + rebota * 300} s={1.1} rot={T * 200} o={1 - rebota} seed={5} />}
        </SvgJ>
        <Escala T={T} pxPorMm={0.9} x={60} y={1640} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Hi + 0.05} until={K.An - 0.2} x={640} y={760} r={260} fx={rodilla.x} fy={rodilla.y} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · la mezclilla"
        interior={(t, r) => <Sarga T={t} w={2 * r} h={2 * r} />} />

      {/* 2 · el hilo por dentro: anillo azul, centro blanco */}
      <Escena T={T} a={K.An} b={K.Pi} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={26} color="rgba(120,170,255,.25)" />
        <SvgJ><HiloCorte T={T} cx={540} cy={800} R={330} anillo={0.34} pinta={kprog(T, K.An + 0.3, K.An + 2.2, kEase.sale)} /></SvgJ>
        <Escala T={T} pxPorMm={2000} x={60} y={1640} />
      </Escena>

      {/* 3–4 · Capítulo 1: la piedra pómez en la lavadora */}
      <Escena T={T} a={K.Pi} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgJ><Lavadora T={T} cx={540} cy={960} r={270} golpes={kprog(T, K.Pb + 0.2, K.Pb + 1.6)} polvo={kprog(T, K.Pb + 1.4, K.Pr - 0.2)} /></SvgJ>
        <Escala T={T} pxPorMm={0.6} x={60} y={1640} color={KC.ink} />
      </Escena>

      {/* 5 · re-gancho: ¿y si algo mordiera solo la orilla? */}
      <Escena T={T} a={K.Pr} b={K.Ce} zoom={0.06}>
        <FondoMarca patron="oscuro" />
        <SvgJ>
          <HiloCorte T={T} cx={320} cy={860} R={240} anillo={0.34} />
          <circle cx={320} cy={860} r={240 * 0.83} fill="none" stroke={KC.gold2} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-T * 60} />
          <text x={320} y={600} textAnchor="middle" style={{ font:`400 230px ${KF.titulo}` }} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} transform={`rotate(${Math.sin(T * 3) * 7} 320 520)`}>?</text>
        </SvgJ>
        <Escala T={T} pxPorMm={2000 * 240 / 330} x={60} y={1640} />
      </Escena>

      {/* 6 · Capítulo 2: el hongo suelta celulasas que cortan la celulosa */}
      <Escena T={T} a={K.Ce} b={K.Mo} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(155,93,229,.25)" />
        <SvgJ>
          <g transform="translate(-60 640) scale(1.5)"><Hifas T={T} x={0} y={0} g={kprog(T, K.Ce, K.Ce + 1.4)} /></g>
          <Celulosa T={T} x={150} y={1010} n={9} paso={96} cortes={[{ i: 1, p: corta(0) }, { i: 4, p: corta(1) }, { i: 6, p: corta(2) }]} />
          {[0, 1, 2].map((k) => T > K.Ce + 1.0 + k * 0.3 && <Enzima key={k} x={enzX(k)} y={klerp(680, 940, kprog(T, K.Ce + 1.0 + k * 0.3, K.Ce + 2.6 + k * 0.5))} s={0.9} boca={Math.abs(Math.sin(T * 9 + k))} rot={30} />)}
        </SvgJ>
      </Escena>

      {/* 7 · la celulasa muerde la orilla de la fibra y el azul se suelta */}
      <Escena T={T} a={K.Mo} b={K.Gr} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgJ>
          <FibraLado T={T} y0={770} y1={1050} p={mordida} />
          {GRANOS.filter((g, i) => i % 4 === 1).map((g, k) => { const t0 = g.sale, vis = mordida > t0 - 0.12 && mordida < t0 + 0.2;
            return vis && <Enzima key={k} x={g.x} y={712} s={0.75} rot={90} boca={Math.abs(Math.sin(T * 10 + k))} />; })}
        </SvgJ>
        <Escala T={T} pxPorMm={18600} x={60} y={1640} />
      </Escena>

      {/* 8 · gramos de enzima en lugar de kilos de piedra */}
      <Escena T={T} a={K.Gr} b={K.Ay} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgJ>
          <Vial x={290} y={830} s={1.6} contenido="#e9c46a" tapa={CEL} />
          <FlechaCurva x1={420} y1={820} x2={600} y2={820} p={kprog(T, K.Gr + 0.4, K.Gr + 1.0)} color={KC.ink} curva={-60} T={T} />
          <g opacity={1 - 0.55 * kprog(T, K.Gr + 1.4, K.Gr + 1.9)}>
            {Array.from({ length: 11 }, (_, i) => <Pomez key={i} x={680 + (i % 4) * 80 + (Math.floor(i / 4) % 2) * 40} y={985 - Math.floor(i / 4) * 70} s={0.75} rot={i * 33} seed={i + 11} />)}
          </g>
          <g opacity={kprog(T, K.Gr + 1.4, K.Gr + 1.7)}><line x1={640} y1={740} x2={1010} y2={1040} stroke={KC.red} strokeWidth={22} strokeLinecap="round" /><line x1={1010} y1={740} x2={640} y2={1040} stroke={KC.red} strokeWidth={22} strokeLinecap="round" /></g>
          <text x={290} y={1100} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>GRAMOS</text>
          <text x={290} y={1150} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>de enzima</text>
          <text x={820} y={1150} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>de piedra</text>
          <text x={820} y={1100} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>KILOS</text>
        </SvgJ>
      </Escena>

      {/* 9 · Capítulo 3: las ayudantes (amilasa y lacasa) */}
      <Escena T={T} a={K.Ay} b={K.Es} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgJ>
          {(() => { const ax = klerp(80, 1000, kprog(T, K.Ay + 0.4, K.Ay + 2.6));
            return <g>
              <rect x={60} y={720} width={960} height={90} rx={45} fill={INDIGO} stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: 11 }, (_, i) => 120 + i * 82).map((cx, i) => cx > ax && <ellipse key={i} cx={cx} cy={i % 2 ? 724 : 806} rx={40} ry={20} fill="#f7f4ea" stroke="#c9c2b4" strokeWidth={3} />)}
              <Enzima x={ax} y={680} s={0.8} color={AMI} rot={90} boca={Math.abs(Math.sin(T * 10))} />
            </g>; })()}
          {(() => { const lp = kprog(T, K.Ay + 2.0, K.Es - 0.3, kEase.suave), lx = klerp(160, 920, lp);
            return <g>
              <rect x={160} y={950} width={760} height={190} rx={18} fill={INDIGO} stroke={KC.ink} strokeWidth={7} />
              <rect x={160} y={950} width={Math.max(0, lx - 160)} height={190} rx={18} fill={DESL} />
              <rect x={160} y={950} width={760} height={190} rx={18} fill="none" stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: 9 }, (_, i) => <line key={i} x1={160 + i * 90} y1={950} x2={250 + i * 90} y2={1140} stroke="rgba(0,0,0,.18)" strokeWidth={10} />)}
              {lp > 0 && <Enzima x={lx} y={910} s={0.8} color={LAC} rot={90} boca={Math.abs(Math.sin(T * 8))} />}
            </g>; })()}
        </SvgJ>
      </Escena>

      {/* 10 · el estudio de 2001: la lacasa parte el índigo */}
      <Escena T={T} a={K.Es} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgJ>
          {T > K.Es + 3.0 && <Indigo T={T} x={540} y={770} s={1.3} parte={kprog(T, K.Es + 4.0, K.Es + 5.0, kEase.sale)} />}
          {T > K.Es + 3.0 && <Enzima x={klerp(130, 400, kprog(T, K.Es + 3.0, K.Es + 4.0))} y={700} s={0.8} color={LAC} boca={Math.abs(Math.sin(T * 8))} />}
          {T > K.Es + 3.0 && <rect x={390} y={950} width={300} height={140} rx={14} fill={mixHex(INDIGO, DESL, kprog(T, K.Es + 4.4, K.Es + 6.2))} stroke={KC.ink} strokeWidth={7} />}
        </SvgJ>
      </Escena>

      {/* 11 · Trichoderma reesei y las tiendas de la Segunda Guerra Mundial */}
      <Escena T={T} a={K.Ti} b={K.Ci} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(${KC.cyan} 0%, #8fe9ff 55%, #2b8fd6 55%, #2b8fd6 64%, #f1d27a 64%)` }}></div>
        <SvgJ>
          <circle cx={900} cy={420} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
          <Palmera T={T} x={1010} y={1240} s={1.1} />
          <Tienda T={T} x={790} y={1180} w={440} h={360} moho={kprog(T, K.Ti + 0.8, K.Ti + 4.5)} hoyos={kprog(T, K.Ti + 3.0, K.Ti + 6.0)} />
        </SvgJ>
        <Escala T={T} pxPorMm={0.12} x={60} y={1640} color={KC.ink} />
      </Escena>

      {/* 12 · cierre: los jeans del inicio, ya deslavados */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgJ>
          <Tendedero y={470} />
          <Jeans T={T} x={380} y={470} s={0.9} desgaste={1} id="j1" />
          <HongoTricho T={T} x={rodilla.x} y={rodilla.y} s={0.9} crece={1} />
        </SvgJ>
        <Escala T={T} pxPorMm={0.9} x={60} y={1640} color={KC.ink} />
      </Escena>

      {/* textos */}
      <Capitulo T={T} x={185} y={196} hasta={K.Es} caps={[{ at: K.Pi, titulo: 'La piedra' }, { at: K.Ce, titulo: 'La celulasa' }, { at: K.Ay, titulo: 'Las ayudantes' }]} />
      <MitoTachado T={T} at={K.G + 0.15} tacharEn={K.G + 1.5} until={K.G + 2.6} texto="¿piedra pómez?" x={330} y={370} tam={44} />
      <Chip T={T} at={K.G + 2.7} until={K.Hi - 0.2} texto="enzima de hongo" x={330} y={370} tam={40} borde={CEL} />
      <Chip T={T} at={K.Hi + 0.5} until={K.An - 0.2} texto="azul: urdimbre · blanco: trama" y={1500} tam={34} borde={KC.cyan} />
      <Etiqueta T={T} at={K.An + 1.6} until={K.Pi - 0.3} x={880} y={500} texto="índigo" lado="izq" tam={36} color={DESL} />
      <Etiqueta T={T} at={K.An + 2.2} until={K.Pi - 0.3} x={560} y={800} texto="centro sin teñir" lado="der" tam={32} />
      <Chip T={T} at={K.An + 2.6} until={K.Pi - 0.3} texto="el índigo se queda por fuera" y={1500} tam={38} borde={INDIGO} />
      <Chip T={T} at={K.Pi + 0.8} until={K.Pb - 0.2} texto="jeans + piedra pómez" y={1500} tam={40} borde={PIEDRA} />
      <Chip T={T} at={K.Pb + 0.6} until={K.Pr - 0.2} texto="golpes + polvo" y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Pr + 0.4} until={K.Ce - 0.2} texto="solo la orilla" x={320} y={1180} tam={36} borde={KC.gold2} />
      <Etiqueta T={T} at={K.Ce + 0.6} until={K.Mo - 0.3} x={60} y={510} texto="Trichoderma" it lado="der" tam={36} color="#bfe9d6" />
      <Etiqueta T={T} at={K.Ce + 1.4} until={K.Mo - 0.3} x={560} y={740} texto="celulasa" lado="der" tam={34} color={CEL} />
      <Etiqueta T={T} at={K.Ce + 2.0} until={K.Mo - 0.3} x={150} y={1110} texto="celulosa del algodón" lado="der" tam={32} color={ALGODON} />
      <Chip T={T} at={K.Ce + 2.8} until={K.Mo - 0.3} texto="celulasa corta la celulosa" y={1500} tam={38} borde={CEL} />
      <Medidor T={T} at={K.Mo + 0.3} until={K.Gr - 0.2} valor={(t) => 1 - 0.6 * kprog(t, K.Mo + 0.4, K.Gr - 0.3)} etiqueta="azul en la orilla de la fibra" x={90} y={1460} ancho={900} color={DESL} />
      <Etiqueta T={T} at={K.Ay + 0.6} until={K.Es - 0.3} x={60} y={620} texto="amilasa · quita el almidón" lado="der" tam={32} color={AMI} />
      <Etiqueta T={T} at={K.Ay + 2.2} until={K.Es - 0.3} x={60} y={1200} texto="lacasa · aclara el azul" lado="der" tam={32} color={LAC} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.8} anio="2001" quien="Univ. do Minho · Portugal" revista="J. Biotechnol. · lacasas de hongos" y={760} />
      <Etiqueta T={T} at={K.Es + 3.2} until={K.Es + 4.0} x={700} y={900} texto="índigo" lado="der" tam={36} color={KC.blue} />
      <Etiqueta T={T} at={K.Es + 4.8} until={K.Ti - 0.3} x={700} y={900} texto="isatina" lado="der" tam={36} color={KC.ink} />
      <Etiqueta T={T} at={K.Es + 4.6} until={K.Ti - 0.3} x={700} y={1020} texto="tela más clara" lado="der" tam={30} color={KC.ink} />
      <Etiqueta T={T} at={K.Ti + 1.0} until={K.Ci - 0.3} x={600} y={640} texto="Trichoderma reesei" it lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ti + 1.6} until={K.Ci - 0.3} texto="Islas Salomón · 2.ª Guerra Mundial" y={1500} tam={36} borde={TRICHO} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="biostoning = deslavado con enzimas" y={1500} tam={34} borde={CEL} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Hi - 0.1} texto="¿Piedra? *Quizá un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Hi + 0.1} until={K.An - 0.1} texto="Hilos *azules y blancos.*" />
      <Subtitulo T={T} idx={2} at={K.An + 0.1} until={K.Pi - 0.1} texto="El índigo pinta *solo por fuera.*" />
      <Subtitulo T={T} idx={3} at={K.Pi + 0.1} until={K.Pb - 0.1} texto="Por años: *piedra pómez.*" />
      <Subtitulo T={T} idx={4} at={K.Pb + 0.1} until={K.Pr - 0.1} texto="Golpes y *polvo.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ce - 0.1} texto="¿Morder *solo la orilla?*" />
      <Subtitulo T={T} idx={6} at={K.Ce + 0.1} until={K.Mo - 0.1} texto="Hongos con *celulasas.*" />
      <Subtitulo T={T} idx={7} at={K.Mo + 0.1} until={K.Gr - 0.1} texto="Muerde la fibra: *el azul se suelta.*" />
      <Subtitulo T={T} idx={8} at={K.Gr + 0.1} until={K.Ay - 0.1} texto="Gramos de enzima, *no kilos de piedra.*" />
      <Subtitulo T={T} idx={9} at={K.Ay + 0.1} until={K.Es - 0.1} texto="Amilasas y *lacasas.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Ti - 0.1} texto="2001: la lacasa *rompe el índigo.*" />
      <Subtitulo T={T} idx={11} at={K.Ti + 0.1} until={K.Ci - 0.1} texto="Se comía *tiendas de algodón.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Quizá *los mordió un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Pi + 0.8, K.Pb - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pb + 0.2, K.Pr - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Pr + 0.1, K.Ce - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [K.Mo + 0.6, K.Gr - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Gr + 0.3, K.Ay - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ay + 1.0, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 3.4, K.Ti - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [K.Ti + 0.2, K.Ci - 0.25, 'avatar_04_bajando_lentes', 'grande-izq'],
        [K.Ci + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="41" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function JeansApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Jeans41 /></CompositionStage></div>;
}
window.JeansApp = JeansApp;
