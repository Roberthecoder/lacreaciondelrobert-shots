// Shot Biotecnológico #13 · PCR: una sola molécula se puede volver más de mil millones — NARRADO (N3 capítulos y medidores).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos.
// Temperaturas típicas con Taq (Lorenz, JoVE 2012): separar 94–98 °C (95), pegar ~52–58 °C (55), copiar 70–80 °C (72).
// 2^30 = 1,073,741,824 es el máximo TEÓRICO (cada ciclo duplicando perfecto).

const FLUO = '#5dff8a', TAQ = '#ff8a1f', PRIMER = '#ff2d78', NUEVA = '#F4C25A';
const BASE_COL = { A: '#ff6b9a', T: '#ffe11a', G: '#00d2ff', C: '#2fe0a8' };
const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
const SEQ = 'ATGCGTACCTGAGC';          // secuencia esquemática (no es una secuencia real)

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// color del fondo según la temperatura (55 azul · 72 amarillo · 95 rojo)
function colorTemp(c) {
  if (c <= 55) return '#1d4fd8';
  if (c <= 72) return mixHex('#1d4fd8', '#e0a400', (c - 55) / 17);
  return mixHex('#e0a400', '#e0301e', kclamp((c - 72) / 23, 0, 1));
}

/* ---------- tubito de PCR (0.2 mL) con su tapa unida. (x, y) = la punta de abajo ---------- */
function TuboPCR({ T = 0, x, y, s = 1, brillo = 0, tapa = 0, rot = 0 }) {
  const liq = mixHex('#cfe9ff', FLUO, kclamp(brillo, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle cx={0} cy={-80} r={150 + 12 * Math.sin(T * 5)} fill={FLUO} opacity={0.25 * brillo} />}
    <path d="M -55 -300 L -55 -170 L -12 -6 Q 0 8 12 -6 L 55 -170 L 55 -300 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -38 -130 L -10 -14 Q 0 -2 10 -14 L 38 -130 Z" fill={liq} stroke={KC.ink} strokeWidth={4} />
    {brillo > 0.2 && <path d="M -38 -130 L -10 -14 Q 0 -2 10 -14 L 38 -130 Z" fill={FLUO} opacity={0.5 * brillo} style={{ filter:`drop-shadow(0 0 18px ${FLUO})` }} />}
    <rect x={-66} y={-318} width={132} height={22} rx={8} fill="#f6f3ec" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -270 L -40 -200" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".7" />
    <g transform={`translate(-66 -318) rotate(${-115 * tapa})`}>
      <rect x={0} y={-30} width={132} height={30} rx={10} fill="#f6f3ec" stroke={KC.ink} strokeWidth={7} />
    </g>
    <path d="M -66 -318 q -26 -6 -30 20" stroke={KC.ink} strokeWidth={6} fill="none" />
  </g>;
}

/* ---------- termociclador: el aparato que sube y baja la temperatura. (x, y) = centro ---------- */
function Termociclador({ x, y, s = 1, tapa = 1, temp = 25, ciclo = 0 }) {
  const col = colorTemp(temp);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-60} width={520} height={250} rx={30} fill="#dfe6ef" stroke={KC.ink} strokeWidth={9} />
    <rect x={-210} y={-20} width={250} height={120} rx={14} fill="#0d1424" stroke={KC.ink} strokeWidth={6} />
    <text x={-85} y={48} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={col === '#1d4fd8' ? '#7fb2ff' : mixHex(col, '#ffffff', 0.35)}>{Math.round(temp)}°C</text>
    <text x={-85} y={88} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#9aa4b5">ciclo {ciclo}</text>
    {[0, 1, 2].map((i) => <circle key={i} cx={110 + i * 46} cy={40} r={16} fill={i === 0 ? KC.mint : '#9aa4b5'} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-240} y={-90} width={480} height={34} rx={8} fill="#aab5c4" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={-196 + i * 56} cy={-73} rx={18} ry={8} fill="#5b6575" />)}
    {/* tapa que baja: tapa 0 = arriba (abierta) · 1 = cerrada */}
    <g transform={`translate(0 ${klerp(-230, 0, kclamp(tapa, 0, 1))})`}>
      <rect x={-250} y={-150} width={500} height={64} rx={22} fill="#c7d2e0" stroke={KC.ink} strokeWidth={9} />
      <rect x={-80} y={-132} width={160} height={14} rx={7} fill="#8d99aa" />
    </g>
  </g>;
}

/* ---------- la enzima (polimerasa) como una pinza redondeada que abraza la hebra ---------- */
function Enzima({ x, y, s = 1, color = TAQ, rot = 0, T = 0, nombre, derrite = 0, ojo = true }) {
  const d = kclamp(derrite, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + d * 0.25)} ${s * (1 - d * 0.55)})`}>
    <path d="M -70 0 C -74 -50, -30 -82, 10 -78 C 50 -74, 76 -46, 74 -10 L 30 -10 C 26 -26, -10 -30, -14 -10 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -70 0 L -14 0 L -14 10 C -10 30, 26 30, 30 10 L 30 0 L 74 0 C 76 44, 40 74, 0 74 C -44 74, -72 44, -70 0 Z" fill={mixHex(color, '#000000', 0.18)} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-14} y={-12} width={44} height={24} rx={10} fill={KC.ink} opacity=".55" />
    <path d="M -46 -54 Q -20 -70 6 -66" stroke="#fff" strokeWidth={7} strokeLinecap="round" fill="none" opacity=".45" />
    {ojo && d < 0.6 && <g><circle cx={-40} cy={-30} r={11} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={-37} cy={-29} r={5} fill={KC.ink} /></g>}
    {d > 0 && [-40, -5, 30].map((dx, i) => <path key={i} d={`M ${dx} 60 q 8 ${30 + 60 * d + i * 10} 0 ${50 + 90 * d}`} stroke={color} strokeWidth={14} strokeLinecap="round" fill="none" opacity={d} />)}
    {nombre && <text x={-8} y={-96} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{nombre}</text>}
  </g>;
}

/* ---------- ADN en escalera (vista esquemática de lado) ----------
   sep: 0 junta → 1 separada · prim: 0..1 los iniciadores llegan y se pegan · cop: 0..1 la copia avanza.
   Abajo: el iniciador se pega a la IZQUIERDA y la copia avanza a la derecha; arriba, al revés. */
function Escalera({ T, x, y, paso = 50, sep = 0, prim = 0, cop = 0, letras = true, taq = true }) {
  const n = SEQ.length, y0 = y - 30 - sep * 130, y1 = y + 30 + sep * 130;
  const bar = (yy, col) => <g><line x1={x - 20} x2={x + (n - 1) * paso + 20} y1={yy} y2={yy} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" /><line x1={x - 20} x2={x + (n - 1) * paso + 20} y1={yy} y2={yy} stroke={col} strokeWidth={8} strokeLinecap="round" /></g>;
  const NP = 3;                                                        // largo del iniciador (bases)
  const kAbajo = NP + Math.floor(cop * (n - NP) + 0.0001), kArriba = kAbajo;
  const pY = klerp(-160, 0, kEase.sale(kclamp(prim, 0, 1)));          // los iniciadores bajan/suben hasta pegarse
  const out = [];
  for (let i = 0; i < n; i++) {
    const b = SEQ[i], c = COMP[b], X = x + i * paso;
    // hebra de arriba (b) y de abajo (c): cada base se queda con su hebra
    out.push(<line key={'a' + i} x1={X} x2={X} y1={y0} y2={y0 + 30} stroke={BASE_COL[b]} strokeWidth={14} strokeLinecap="round" />);
    out.push(<line key={'b' + i} x1={X} x2={X} y1={y1 - 30} y2={y1} stroke={BASE_COL[c]} strokeWidth={14} strokeLinecap="round" />);
    if (letras && sep > 0.6) {
      out.push(<text key={'la' + i} x={X} y={y0 - 16} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#fff" opacity={kprog(sep, 0.6, 1)}>{b}</text>);
      out.push(<text key={'lb' + i} x={X} y={y1 + 36} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#fff" opacity={kprog(sep, 0.6, 1)}>{c}</text>);
    }
  }
  // hebra nueva sobre la hebra de abajo (lee c, pone b), de izquierda a derecha
  const nueva = (desdeIzq) => {
    const g = [], yy = desdeIzq ? y1 - 60 : y0 + 60, hasta = desdeIzq ? kAbajo : kArriba;
    for (let k = 0; k < Math.min(hasta, n); k++) {
      const i = desdeIzq ? k : n - 1 - k, X = x + i * paso, base = desdeIzq ? SEQ[i] : COMP[SEQ[i]];
      const esPrim = k < NP, dy = esPrim ? (desdeIzq ? -pY : pY) : 0;
      if (esPrim && prim <= 0) continue;
      g.push(<line key={(desdeIzq ? 'n' : 'm') + i} x1={X} x2={X} y1={yy - 30 + dy} y2={yy + dy} stroke={BASE_COL[base]} strokeWidth={14} strokeLinecap="round" />);
    }
    const kk = Math.min(hasta, n), i0 = desdeIzq ? 0 : n - 1, i1 = desdeIzq ? kk - 1 : n - kk;
    const yb = desdeIzq ? yy - 30 : yy;
    if (prim > 0) {
      const ip = desdeIzq ? NP - 1 : n - NP, dyP = desdeIzq ? -pY : pY;
      g.push(<line key={desdeIzq ? 'pp1' : 'pp2'} x1={x + i0 * paso - 14} x2={x + ip * paso + 14} y1={yb + dyP + (desdeIzq ? -0 : 30)} y2={yb + dyP + (desdeIzq ? -0 : 30)} stroke={PRIMER} strokeWidth={12} strokeLinecap="round" />);
    }
    if (kk > NP) g.push(<line key={desdeIzq ? 'nb1' : 'nb2'} x1={x + (desdeIzq ? NP : i1) * paso - 10} x2={x + (desdeIzq ? i1 : n - 1 - NP) * paso + 10} y1={yb + (desdeIzq ? 0 : 30)} y2={yb + (desdeIzq ? 0 : 30)} stroke={NUEVA} strokeWidth={10} strokeLinecap="round" />);
    if (taq && cop > 0 && cop < 1) { const ih = desdeIzq ? kk - 1 : n - kk; g.push(<Enzima key={desdeIzq ? 'tq1' : 'tq2'} x={x + ih * paso + (desdeIzq ? 30 : -30)} y={yy - 15} s={0.62} rot={desdeIzq ? 0 : 180} T={T} ojo={desdeIzq} />); }
    return g;
  };
  return <g>
    {bar(y0, '#e8f0ff')}{bar(y1, '#e8f0ff')}
    {out}
    {sep > 0.9 && nueva(true)}{sep > 0.9 && nueva(false)}
  </g>;
}

/* ---------- mini doble hélice (para la cuadrícula de copias) ---------- */
function MiniHelice({ T, x, y, s = 1, o = 1 }) {
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><ADNHebra T={T} x={-45} y={0} largo={90} alto={26} vueltas={1.5} grosor={4} /></g>;
}

/* ---------- virus (esfera con espículas) y su ARN ---------- */
function Virus({ T, x, y, r = 110, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + T * 6})`}>
    {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <g key={i} transform={`rotate(${a * 57.3})`}>
      <line x1={r - 6} y1={0} x2={r + 34} y2={0} stroke={KC.ink} strokeWidth={9} /><circle cx={r + 40} cy={0} r={15} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>; })}
    <circle r={r} fill="#ffb3c7" stroke={KC.ink} strokeWidth={9} />
    <circle cx={-30} cy={-30} r={r * 0.25} fill="#fff" opacity=".35" />
  </g>;
}
function HebraOndulada({ T, x0, y0, x1, y1, p = 1, color = KC.pink, ancho = 9 }) {
  const N = 30, pts = [];
  for (let i = 0; i <= N * p; i++) { const u = i / N; pts.push([klerp(x0, x1, u), klerp(y0, y1, u) + Math.sin(u * 18 + T * 4) * 14]); }
  if (pts.length < 2) return null;
  const d = pts.map((q, i) => `${i ? 'L' : 'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
  return <g><path d={d} stroke={KC.ink} strokeWidth={ancho + 6} fill="none" strokeLinecap="round" /><path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" /></g>;
}

/* ---------- gráfica de fluorescencia: el brillo sube con los ciclos (curva en S) ---------- */
function CurvaFluo({ x, y, w = 420, h = 260, p = 1 }) {
  const N = 40, pts = [];
  for (let i = 0; i <= N * p; i++) { const u = i / N; pts.push([x + u * w, y + h - h * 0.92 / (1 + Math.exp(-(u - 0.62) * 14))]); }
  return <g>
    <rect x={x - 20} y={y - 20} width={w + 40} height={h + 70} rx={18} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={6} />
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#9aa4b5" strokeWidth={4} /><line x1={x} y1={y} x2={x} y2={y + h} stroke="#9aa4b5" strokeWidth={4} />
    <line x1={x} y1={y + h * 0.7} x2={x + w} y2={y + h * 0.7} stroke={KC.gold2} strokeWidth={3} strokeDasharray="10 8" />
    {pts.length > 1 && <path d={pts.map((q, i) => `${i ? 'L' : 'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ')} stroke={FLUO} strokeWidth={8} fill="none" strokeLinecap="round" style={{ filter:`drop-shadow(0 0 8px ${FLUO})` }} />}
    <text x={x + w / 2} y={y + h + 38} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#cfd6e2">ciclos →</text>
    <text x={x + 12} y={y + 26} style={{ font:`700 26px ${KF.mono}` }} fill={FLUO}>brillo</text>
  </g>;
}

/* ---------- Thermus aquaticus al microscopio: bastoncitos sin esporas ni flagelos, algunos en filamentos ---------- */
function BastonesThermus({ T, r }) {
  const R = krng(13), items = [];
  for (let i = 0; i < 9; i++) {
    const cx = r * 0.3 + R() * r * 1.4, cy = r * 0.3 + R() * r * 1.4, rot = R() * 180, n = i % 3 === 0 ? 3 : 1, L = 70, W = 22;
    items.push(<g key={i} transform={`translate(${cx + Math.sin(T * 0.8 + i) * 6} ${cy + Math.cos(T * 0.7 + i) * 6}) rotate(${rot})`}>
      {Array.from({ length: n }, (_, k) => <rect key={k} x={-L / 2 + (k - (n - 1) / 2) * (L + 4)} y={-W / 2} width={L} height={W} rx={W / 2} fill="#ff9ec4" stroke="#fff" strokeWidth={3} opacity=".95" />)}
    </g>);
  }
  return <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}><rect width={r * 2} height={r * 2} fill="#120d1f" />{items}</svg>;
}

/* ---------- manantial caliente (Yellowstone) con vapor ---------- */
function Manantial({ T, x = 540, y = 1080 }) {
  return <g>
    <ellipse cx={x} cy={y} rx={400} ry={140} fill="#f0b23a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={x} cy={y} rx={330} ry={110} fill="#f4dc6a" />
    <ellipse cx={x} cy={y} rx={250} ry={82} fill="#25b6c9" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={x - 40} cy={y - 18} rx={120} ry={30} fill="#7fe3ef" opacity=".7" />
    {Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.35 + i / 7) % 1), px = x - 220 + i * 70 + Math.sin(T + i) * 20;
      return <circle key={i} cx={px} cy={y - 40 - u * 520} r={50 + u * 70} fill="#ffffff" opacity={0.55 * (1 - u)} />; })}
  </g>;
}

/* ---------- noche en las montañas de California: carretera y coche con faros ---------- */
function NocheCarretera({ T, u = 0 }) {
  const R = krng(4);
  const estrellas = Array.from({ length: 40 }, () => [R() * KW, 220 + R() * 520, 2 + R() * 4]);
  const cx = klerp(-120, 1180, u), cy = 1110 - Math.sin(u * Math.PI * 2) * 30;
  return <g>
    <rect width={KW} height={KH} fill="#0d1424" />
    {estrellas.map(([sx, sy, sr], i) => <circle key={i} cx={sx} cy={sy} r={sr * (0.7 + 0.3 * Math.sin(T * 3 + i))} fill="#fff" opacity=".85" />)}
    <circle cx={860} cy={420} r={70} fill="#f6f3ec" /><circle cx={885} cy={405} r={64} fill="#0d1424" />
    <path d="M 0 900 L 180 700 L 330 820 L 520 620 L 720 830 L 900 680 L 1080 860 L 1080 1920 L 0 1920 Z" fill="#2b0f63" stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 1000 L 240 880 L 470 960 L 700 860 L 1080 980 L 1080 1920 L 0 1920 Z" fill="#1c0b44" />
    <path d={`M -40 1140 Q 300 1040 540 1110 T 1120 1100`} stroke="#3a3f52" strokeWidth={70} fill="none" />
    <path d={`M -40 1140 Q 300 1040 540 1110 T 1120 1100`} stroke={KC.gold2} strokeWidth={6} strokeDasharray="30 30" fill="none" opacity=".8" />
    <g transform={`translate(${cx} ${cy - 40})`}>
      <path d="M 40 10 L 340 -60 L 340 80 Z" fill={KC.yellow} opacity=".28" />
      <rect x={-80} y={-26} width={130} height={46} rx={14} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
      <path d="M -56 -26 L -36 -52 L 14 -52 L 30 -26 Z" fill="#9aa4b5" stroke={KC.ink} strokeWidth={6} />
      <circle cx={-48} cy={22} r={14} fill={KC.ink} /><circle cx={22} cy={22} r={14} fill={KC.ink} />
      <circle cx={46} cy={-8} r={8} fill={KC.yellow} />
    </g>
  </g>;
}
function MedallaNobel({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 4})`}>
    <path d="M -60 -230 L -20 -120 L 20 -120 L 60 -230" stroke={KC.blue} strokeWidth={34} fill="none" />
    <circle r={150} fill={KC.gold} stroke={KC.ink} strokeWidth={10} style={{ filter:`drop-shadow(0 0 30px ${KC.gold2})` }} />
    <circle r={118} fill="none" stroke="#a8741a" strokeWidth={5} />
    <text y={-20} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={30} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>Química</text>
    <text y={80} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>1993</text>
  </g>;
}
// número de copias = 2^ciclos, con separadores de miles
function Copias({ T, at, until, ciclos, x = KW / 2, y = 1170, tam = 120, etiqueta = 'copias' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = Math.pow(2, Math.max(0, Math.round(ciclos)));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`900 38px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, whiteSpace:'nowrap' }}>{etiqueta}</div>
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{kformato(v)}</div>
  </div>;
}
// ciclos que avanzan: lineales de c0 a c1 entre t0 y t1
const ciclosEn = (T, t0, t1, c0, c1, ease) => klerp(c0, c1, kprog(T, t0, t1, ease));

function Pcr() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tu: CUES.Tu, S: CUES.Separar, P: CUES.Pegar, C: CUES.Copiar, D: CUES.Duplica, Q: CUES.Pregunta, Pb: CUES.Problema, E: CUES.Estudio, Tq: CUES.Taq, M: CUES.Mullis, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // temperatura del capítulo 1-2-3 (55 → 95 → 55 → 72)
  const tempCap = T < K.P ? klerp(55, 95, kprog(T, K.S + 0.2, K.S + 1.2, kEase.suave))
    : T < K.C ? klerp(95, 55, kprog(T, K.P + 0.2, K.P + 1.2, kEase.suave))
    : klerp(55, 72, kprog(T, K.C + 0.2, K.C + 1.0, kEase.suave));
  const sep = kprog(T, K.S + 1.4, K.S + 3.0, kEase.suave);
  const prim = kprog(T, K.P + 1.4, K.P + 3.0);
  const cop = kprog(T, K.C + 1.1, K.C + 3.9);
  // gancho: el tubito entra y la tapa baja
  const baja = kprog(T, K.G, K.G + 0.7, kEase.sale), cierra = kprog(T, K.G + 0.7, K.G + 1.1, kEase.sale);
  const cGancho = ciclosEn(T, K.G + 1.2, K.G + 4.4, 0, 30, kEase.suave);
  // duplica: 1, 2, 3 ciclos despacio y luego hasta 30
  const cDup = T < K.D + 2.4 ? (T < K.D + 0.3 ? 0 : T < K.D + 1.1 ? 1 : T < K.D + 1.8 ? 2 : 3) : ciclosEn(T, K.D + 2.4, K.D + 4.3, 3, 30, kEase.suave);
  // problema: la temperatura oscila y la enzima común se rompe
  const osc = 75 + 20 * Math.cos((T - K.Pb) * Math.PI * 1.6);
  const rompe = kprog(T, K.Pb + 1.4, K.Pb + 2.2);
  // taq: sale de la bacteria y entra al tubito
  const vuela = kprog(T, K.Tq + 0.4, K.Tq + 1.6, kEase.suave);
  const tempTaq = klerp(72, 95, kprog(T, K.Tq + 1.8, K.Tq + 2.4));
  // cierre: la tapa se abre y el tubito sale brillando
  const abre = kprog(T, K.Ci + 0.2, K.Ci + 0.7, kEase.sale), sube = kprog(T, K.Ci + 0.6, K.Ci + 1.6, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el tubito entra al termociclador y el contador se dispara */}
      <Escena T={T} a={K.G} b={K.Tu} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {cierra < 1 && <TuboPCR T={T} x={360} y={klerp(300, 640, baja)} s={0.7} />}
          <Termociclador x={360} y={760} s={0.9} tapa={cierra} temp={cGancho > 0.5 ? (Math.floor(T * 2.4) % 3 === 0 ? 95 : Math.floor(T * 2.4) % 3 === 1 ? 55 : 72) : 25} ciclo={Math.round(cGancho)} />
        </SvgCapa>
        <Copias T={T} at={K.G + 1.1} until={K.Tu - 0.2} ciclos={cGancho} y={1060} tam={112} etiqueta="copias de 1 molécula de ADN" />
      </Escena>

      {/* 1 · la prueba PCR de COVID: ARN del virus → ADN → copias que brillan */}
      <Escena T={T} a={K.Tu} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Virus T={T} x={720} y={560} r={100} />
          <HebraOndulada T={T} x0={720} y0={700} x1={420} y1={820} p={kprog(T, K.Tu + 0.5, K.Tu + 1.6)} color={KC.pink} />
          {T > K.Tu + 2.0 && <g opacity={kprog(T, K.Tu + 2.0, K.Tu + 2.6)}><ADNHebra T={T} x={260} y={880} largo={300} alto={46} vueltas={2} grosor={6} /></g>}
          <TuboPCR T={T} x={300} y={1150} s={0.9} brillo={kprog(T, K.Tu + 3.0, K.Tu + 5.6)} />
          <CurvaFluo x={560} y={880} w={400} h={220} p={kprog(T, K.Tu + 2.9, K.Tu + 5.7)} />
        </SvgCapa>
        <Etq T={T} at={K.Tu + 0.9} until={K.Tu + 2.2} x={560} y={770} texto="ARN del virus" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Tu + 2.3} until={K.S - 0.3} x={580} y={870} texto="→ ADN" color={KC.ink} tam={38} />
      </Escena>

      {/* 2–4 · capítulos 1, 2 y 3 dentro del tubito, con el termómetro en vivo */}
      <Escena T={T} a={K.S} b={K.D} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 60% 55%, ${colorTemp(tempCap)}99 0%, ${KC.noche} 70%)` }}></div>
        <Termometro x={120} y={470} alto={520} valor={tempCap} max={100} marcas={[0, 50, 100]} color={colorTemp(tempCap) === '#1d4fd8' ? KC.cyan : colorTemp(tempCap)} />
        <div style={{ position:'absolute', left:120, top:1150, transform:'translate(-50%,-50%)', zIndex:40, font:`400 92px ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`3px ${KC.ink}`, textShadow:'5px 5px 0 #000', whiteSpace:'nowrap' }}>{Math.round(tempCap)} °C</div>
        <SvgCapa z={31}>
          <Escalera T={T} x={330} y={940} paso={50} sep={sep} prim={prim} cop={cop} />
        </SvgCapa>
      </Escena>

      {/* 5 · cada ciclo duplica */}
      <Escena T={T} a={K.D} b={K.Q} zoom={0.04}>
        <FondoMarca color={KC.violet} patron="rayas" T={T} />
        <SvgCapa>
          {Array.from({ length: 32 }, (_, i) => { const n = Math.pow(2, Math.min(5, Math.round(cDup))), c = i % 8, r = Math.floor(i / 8);
            return i < n ? <MiniHelice key={i} T={T + i * 0.2} x={140 + c * 114} y={850 + r * 85} s={1.15} o={kprog(T, K.D + 0.1 + Math.log2(i + 1) * 0.6, K.D + 0.4 + Math.log2(i + 1) * 0.6)} /> : null; })}
          {cDup > 5 && <rect x={70} y={800} width={940} height={350} rx={30} fill={NUEVA} opacity={0.35 * kprog(cDup, 5, 30)} />}
        </SvgCapa>
        <Copias T={T} at={K.D + 0.2} until={K.Q - 0.2} ciclos={cDup} x={680} y={590} tam={112} />
      </Escena>

      {/* 6 · pregunta: ¿qué enzima aguanta 95 °C? una común se "derrite" */}
      <Escena T={T} a={K.Q} b={K.Pb} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <Termometro x={130} y={560} alto={480} valor={95} max={100} marcas={[0, 50, 100]} color={KC.red} />
        <SvgCapa z={31}>
          <Enzima x={400} y={880} s={1.25} color="#8fa3ff" T={T} derrite={kprog(T, K.Q + 0.8, K.Q + 2.8)} />
          <text x={400} y={700} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 6} 400 640)`}>?</text>
        </SvgCapa>
      </Escena>

      {/* 7 · al principio el calor la destruía */}
      <Escena T={T} a={K.Pb} b={K.E} zoom={0.04}>
        <FondoMarca color={KC.orange} patron="rayas" T={T} />
        <Termometro x={130} y={520} alto={480} valor={osc} max={100} marcas={[0, 50, 100]} color={colorTemp(osc)} />
        <SvgCapa z={31}>
          {rompe < 1 ? <Enzima x={600} y={900} s={1.4} color="#8fa3ff" T={T} rot={Math.sin(T * 20) * 4 * kprog(T, K.Pb + 0.5, K.Pb + 1.4)} />
            : Array.from({ length: 9 }, (_, i) => { const a = i * 0.7, d = 40 + 260 * kprog(T, K.Pb + 2.2, K.Pb + 3.2, kEase.sale);
              return <path key={i} d="M -30 -10 q 30 -30 60 0 q -30 30 -60 0 Z" transform={`translate(${600 + Math.cos(a) * d} ${900 + Math.sin(a) * d * 0.7}) rotate(${i * 40 + T * 60})`} fill="#8fa3ff" stroke={KC.ink} strokeWidth={5} opacity={1 - kprog(T, K.Pb + 2.8, K.Pb + 3.5)} />; })}
          {rompe > 0 && rompe < 1 && <circle cx={600} cy={900} r={60 + rompe * 160} fill="none" stroke="#fff" strokeWidth={10} opacity={1 - rompe} />}
        </SvgCapa>
      </Escena>

      {/* 8 · 1969: Brock y Freeze, Yellowstone y Thermus aquaticus */}
      <Escena T={T} a={K.E} b={K.Tq} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fd8ff 0%, #c9f1ff 45%, #d8c39a 46%, #b89a6a 100%)' }}></div>
        <SvgCapa>
          <path d="M 0 880 L 160 760 L 320 840 L 520 720 L 700 830 L 880 740 L 1080 850 L 1080 890 L 0 890 Z" fill="#4f8a5b" stroke={KC.ink} strokeWidth={6} />
          <Manantial T={T} x={540} y={1100} />
        </SvgCapa>
      </Escena>

      {/* 9 · la Taq sale de la bacteria y entra al tubito: aguanta 95 °C */}
      <Escena T={T} a={K.Tq} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Bacteria T={T} x={300} y={820} largo={330} ancho={110} rot={-12} color="#ff9ec4" flagelo={false} seed={3} />
          <TuboPCR T={T} x={780} y={1220} s={1.05} brillo={kprog(T, K.Tq + 2.4, K.Tq + 3.4) * 0.6} />
          <Enzima x={klerp(330, 780, vuela)} y={klerp(820, 1100, vuela) - Math.sin(vuela * Math.PI) * 260} s={klerp(0.5, 0.75, vuela)} T={T} nombre={vuela > 0.05 ? 'Taq' : undefined} />
        </SvgCapa>
        <div style={{ position:'absolute', left:520, top:960, zIndex:42, transform:'translate(-50%,-50%)', opacity:kprog(T, K.Tq + 1.8, K.Tq + 2.2), font:`400 80px ${KF.titulo}`, color:KC.red, WebkitTextStroke:`3px ${KC.ink}`, whiteSpace:'nowrap' }}>{Math.round(tempTaq)} °C</div>
      </Escena>

      {/* 10 · 1983: la idea de Mullis en una carretera de noche · Nobel 1993 */}
      <Escena T={T} a={K.M} b={K.Ci} zoom={0.03}>
        <SvgCapa>
          <NocheCarretera T={T} u={kprog(T, K.M, K.M + 4.8)} />
          {T > K.M + 2.3 && <g opacity={kprog(T, K.M + 2.3, K.M + 2.8)}><MedallaNobel x={300} y={760} s={klerp(0.5, 1, kprog(T, K.M + 2.3, K.M + 2.9, kEase.rebote))} T={T} /></g>}
        </SvgCapa>
      </Escena>

      {/* 11 · cierre: el mismo tubito del inicio, ahora brillando */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <TuboPCR T={T} x={360} y={klerp(640, 520, sube)} s={0.7} brillo={sube} />
          <Termociclador x={360} y={760} s={0.9} tapa={1 - abre} temp={72} ciclo={30} />
        </SvgCapa>
        <Copias T={T} at={K.Ci + 1.4} until={K.Ou - 0.2} ciclos={30} y={1060} tam={112} etiqueta="1 molécula → hasta (en teoría)" />
      </Escena>

      {/* textos y medidores */}
      <Chip T={T} at={K.G + 1.4} until={K.Tu - 0.3} texto="30 ciclos · en teoría" x={330} y={480} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Tu + 0.2} until={K.S - 0.3} texto="prueba PCR de COVID" x={720} y={330} tam={38} borde={KC.red} />
      <Capitulo T={T} caps={[{ at: K.S, titulo: 'SEPARAR · 95 °C' }, { at: K.P, titulo: 'PEGAR · ~55 °C' }, { at: K.C, titulo: 'COPIAR · 72 °C' }]} hasta={K.D} y={330} />
      <Etq T={T} at={K.S + 0.3} until={K.D - 0.2} x={40} y={420} texto="por dentro del tubito" tam={28} />
      <Etq T={T} at={K.S + 0.6} until={K.S + 1.4} x={330} y={1040} texto="doble hélice" tam={32} />
      <Etq T={T} at={K.S + 3.0} until={K.P - 0.2} x={330} y={1180} texto="dos hebras sueltas" tam={32} />
      <Etq T={T} at={K.P + 2.6} until={K.C - 0.2} x={330} y={1180} texto="iniciadores (guías)" color={PRIMER} tam={32} />
      <Etq T={T} at={K.C + 1.4} until={K.C + 3.6} x={330} y={1180} texto="Taq: pone la letra que falta" color={TAQ} tam={30} />
      <Chip T={T} at={K.C + 3.9} until={K.D - 0.2} texto="1 → 2 copias" x={540} y={1190} tam={40} borde={NUEVA} />
      <Chip T={T} at={K.D + 0.2} until={K.Q - 0.2} texto={`CICLO ${Math.round(cDup)}`} x={680} y={380} tam={46} borde={KC.gold} mono />
      <Chip T={T} at={K.D + 4.2} until={K.Q - 0.2} texto="2³⁰ · en teoría" x={680} y={730} tam={38} borde={NUEVA} />
      <Chip T={T} at={K.Q + 0.2} until={K.Pb - 0.2} texto="¿aguanta 95 °C?" x={390} y={450} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Q + 1.0} until={K.Pb - 0.2} x={480} y={1110} texto="enzima común" color={KC.ink} tam={32} />
      <Chip T={T} at={K.Pb + 0.4} until={K.E - 0.2} texto="el calor la destruía" x={600} y={1180} tam={42} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 3.5} anio="1969" quien="Brock y Freeze" revista="J. Bacteriol. · Yellowstone, EE. UU." x={540} y={620} />
      <Lupa T={T} at={K.E + 3.6} until={K.Tq - 0.3} x={640} y={720} r={220} fx={540} fy={1090} interior={(t, r) => <BastonesThermus T={t} r={r} />} tinte={KC.pink} etiqueta="AL MICROSCOPIO" />
      <Etq T={T} at={K.E + 4.2} until={K.Tq - 0.3} x={400} y={1100} texto="Thermus aquaticus" it color={KC.ink} tam={38} lado="der" />
      <Chip T={T} at={K.E + 4.4} until={K.Tq - 0.3} texto="crece mejor a 70 °C" x={640} y={420} tam={38} borde={KC.orange} />
      <Etq T={T} at={K.E + 0.6} until={K.E + 3.4} x={60} y={930} texto="aguas termales de Yellowstone" color={KC.ink} tam={32} />
      <Chip T={T} at={K.Tq + 0.2} until={K.M - 0.2} texto="Taq · de Thermus aquaticus" x={420} y={460} tam={36} borde={TAQ} />
      <Chip T={T} at={K.Tq + 2.4} until={K.M - 0.2} texto="sigue entera ✔" x={500} y={1080} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.M + 0.2} until={K.Ci - 0.2} texto="1983 · Kary Mullis" x={330} y={450} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Tu - 0.1} texto="1 molécula → *más de mil millones*" />
      <Subtitulo T={T} idx={1} at={K.Tu + 0.1} until={K.S - 0.1} texto="La prueba PCR: *copiar hasta que brille*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.P - 0.1} texto="95 °C: *se abre en dos*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.C - 0.1} texto="55 °C: *se pegan las guías*" />
      <Subtitulo T={T} idx={4} at={K.C + 0.1} until={K.D - 0.1} texto="72 °C: *la enzima copia*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.Q - 0.1} texto="Cada ciclo: *el doble*" />
      <Subtitulo T={T} idx={6} at={K.Q + 0.1} until={K.Pb - 0.1} texto="¿Qué enzima *aguanta 95 °C?*" />
      <Subtitulo T={T} idx={7} at={K.Pb + 0.1} until={K.E - 0.1} texto="El calor *la destruía*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Tq - 0.1} texto="1969, Yellowstone: *crece a 70 °C*" />
      <Subtitulo T={T} idx={9} at={K.Tq + 0.1} until={K.M - 0.1} texto="La Taq *aguanta el calor*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.Ci - 0.1} texto="1983: la idea, *manejando de noche*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una molécula → *más de mil millones*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Tu + 1.8, K.Tu + 5.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.S + 1.2, K.S + 4.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 1.4, K.P + 4.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 1.2, K.C + 3.8, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.D + 1.7, K.D + 4.9, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Q + 0.1, K.Q + 3.0, 'avatar_06_pensativo_menton', 'grande'],
        [K.Pb + 0.6, K.Pb + 3.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 4.4, K.E + 7.4, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Tq + 0.4, K.Tq + 3.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.5, K.M + 4.7, 'avatar_02_apuntando_camara', 'grande'],
        [K.Ci + 0.5, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PcrApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pcr /></CompositionStage></div>;
}
window.PcrApp = PcrApp;
