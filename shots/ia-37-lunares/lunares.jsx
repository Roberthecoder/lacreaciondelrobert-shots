// Shot IA #37 · La IA que revisa tus lunares ve peor la piel oscura — NARRADO (N1 "Por dentro" + toque de N2).
// Datos: Esteva et al., Nature 542:115 (2017); Daneshjou et al., Science Advances 8:eabq6147 (2022); NCI (lunares); AAD (ABCDE, piel oscura).
// Ver guion.md y verificacion.md. Todo es esquemático.
const PIEL = { clara: '#f3c6a2', claraSombra: '#dca783', oscura: '#6e4129', oscuraSombra: '#55301d', lunarClaro: '#6a3a1f', lunarOscuro: '#24130a' };
const TONOS_CLAROS = ['#f7d9c2', '#f1c5a3', '#ebb994', '#f9e0cc', '#efc09c'];
const TONOS_MEDIOS = ['#c98f62', '#b67b52', '#a8704a'];
const TONOS_OSCUROS = ['#7a4a2c', '#5e3820', '#4a2a17'];

// Antebrazo horizontal con mano a la derecha y un lunar. tono: 'clara' | 'oscura'.
function Antebrazo({ x = -80, y, largo = 820, tono = 'clara', lunarX = 380, T = 0, seed = 1 }) {
  const c = PIEL[tono], sh = PIEL[tono + 'Sombra'], lu = tono === 'clara' ? PIEL.lunarClaro : PIEL.lunarOscuro;
  const b = Math.sin(T * 1.6 + seed) * 4;
  const xe = x + largo;
  return <g transform={`translate(0 ${b})`}>
    <path d={`M ${x} ${y - 70} L ${xe - 40} ${y - 58} Q ${xe + 10} ${y - 56} ${xe + 20} ${y - 20} L ${xe + 20} ${y + 24} Q ${xe + 10} ${y + 58} ${xe - 40} ${y + 58} L ${x} ${y + 70} Z`}
      fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${x} ${y + 40} L ${xe - 40} ${y + 34}`} stroke={sh} strokeWidth={14} strokeLinecap="round" opacity=".7" />
    {/* mano en puño */}
    <path d={`M ${xe + 10} ${y - 62} q 70 -14 110 12 q 26 22 18 54 q -6 46 -56 54 q -50 6 -72 -10 Z`} fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${xe + 92} ${y - 30 + k * 28} q 22 2 30 10`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    {/* lunar irregular */}
    <path d={`M ${lunarX - 22} ${y - 6} q 6 -22 26 -18 q 22 2 20 22 q 0 20 -22 22 q -26 0 -24 -26 Z`} fill={lu} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Celular que escanea con una "IA de lunares". haz: 0..1 intensidad del haz; objetivo: [x, y] a donde apunta.
function CelularIA({ x, y, T, haz = 1, objetivo = [380, 900], pantalla = 'IA de lunares', tacha = 0, s = 1 }) {
  const [ox, oy] = objetivo;
  return <g>
    {haz > 0 && <path d={`M ${x - 50} ${y + 150} L ${ox - 90} ${oy} L ${ox + 90} ${oy} L ${x + 50} ${y + 150} Z`} fill={KC.cyan} opacity={0.22 * haz * (0.75 + 0.25 * Math.sin(T * 9))} />}
    {haz > 0 && <line x1={ox - 90} y1={oy - 8 + Math.sin(T * 5) * 8} x2={ox + 90} y2={oy - 8 + Math.sin(T * 5) * 8} stroke={KC.cyan} strokeWidth={6} opacity={0.8 * haz} />}
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.3) * 3})`}>
      <rect x={-105} y={-180} width={210} height={360} rx={34} fill="#10131a" stroke={KC.ink} strokeWidth={9} />
      <rect x={-88} y={-150} width={176} height={300} rx={18} fill="#1d2b4a" />
      <rect x={-30} y={-170} width={60} height={12} rx={6} fill={KC.ink} />
      <text y={-102} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.cyan}>{pantalla.split(' ').slice(0, 2).join(' ')}</text>
      <text y={-72} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.cyan}>{pantalla.split(' ').slice(2).join(' ')}</text>
      <circle cy={20} r={56} fill="none" stroke={KC.cyan} strokeWidth={6} strokeDasharray="18 10" transform={`rotate(${T * 90} 0 20)`} />
      <circle cy={20} r={20} fill={PIEL.lunarClaro} stroke={KC.ink} strokeWidth={3} />
      {tacha > 0 && <line x1={-80} y1={110} x2={-80 + 160 * tacha} y2={-120 + 0 * tacha} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}
    </g>
  </g>;
}

// Insignia redonda: ✔ verde o "?" roja.
function Insignia({ x, y, tipo = 'ok', p = 1, T = 0 }) {
  if (p <= 0) return null;
  const col = tipo === 'ok' ? KC.leaf : KC.red, s = klerp(0.3, 1, kEase.rebote(Math.min(1, p)));
  const parp = tipo === 'duda' ? 0.75 + 0.25 * Math.sin(T * 10) : 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, p * 2) * parp}>
    <circle r={44} fill={col} stroke={KC.ink} strokeWidth={7} />
    {tipo === 'ok' ? <path d="M -20 2 L -5 18 L 22 -14" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <text y={22} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill="#fff">?</text>}
  </g>;
}

// Por dentro de la piel (en la Lupa): epidermis con queratinocitos y un nido de melanocitos con pigmento. Cuadro 2r × 2r.
function PielPorDentro({ T, r }) {
  const W = 2 * r, rr = krng(11), cel = [];
  for (let fila = 0; fila < 4; fila++) for (let k = 0; k < 7; k++) {
    const cx = (k + (fila % 2) * 0.5) * (W / 6.2) + rr() * 10, cy = 40 + fila * 52 + rr() * 8;
    cel.push(<ellipse key={`q${fila}-${k}`} cx={cx} cy={cy} rx={34} ry={22 - fila * 2} fill="rgba(241,197,163,.16)" stroke="rgba(241,197,163,.55)" strokeWidth={3} />);
  }
  const base = (xx) => 262 + Math.sin(xx / 46) * 14;
  let d = `M 0 ${base(0)}`; for (let xx = 10; xx <= W; xx += 10) d += ` L ${xx} ${base(xx)}`;
  const nido = [[-70, 0], [-20, -18], [34, -6], [80, 10], [-46, 40], [10, 34], [62, 46]];
  const rg = krng(5);
  return <svg width={W} height={W} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={W} height={W} fill="#0b1018" />
    <rect y={base(0) + 20} width={W} height={W} fill="#2a1418" opacity=".7" />
    {cel}
    <path d={d} stroke={KC.pink} strokeWidth={5} fill="none" opacity=".7" />
    {nido.map(([nx, ny], i) => {
      const cx = r + nx, cy = 300 + ny, w = Math.sin(T * 1.5 + i) * 4;
      return <g key={i}>
        {[0, 1, 2, 3].map((k) => { const a = (k * 90 + i * 37 + w * 3) * Math.PI / 180;
          return <path key={k} d={`M ${cx} ${cy} Q ${cx + Math.cos(a) * 40} ${cy + Math.sin(a) * 40 - 10} ${cx + Math.cos(a) * 66} ${cy + Math.sin(a) * 60}`} stroke="#8a5a2b" strokeWidth={6} fill="none" strokeLinecap="round" />; })}
        <ellipse cx={cx} cy={cy} rx={30} ry={24} fill="#7b4a1e" stroke="#e8a62a" strokeWidth={3} />
        <circle cx={cx + 4} cy={cy - 2} r={9} fill="#3a2010" />
        {Array.from({ length: 6 }, (_, g) => <circle key={g} cx={cx - 18 + rg() * 36} cy={cy - 14 + rg() * 28} r={3.5} fill="#2a140a" />)}
      </g>; })}
    {Array.from({ length: 14 }, (_, g) => { const u = ((T * 0.25 + g / 14) % 1); return <circle key={'p' + g} cx={r - 120 + (g * 37) % 240} cy={300 - u * 160} r={4} fill="#c98a3a" opacity={Math.sin(Math.PI * u) * 0.8} />; })}
  </svg>;
}

// Foto pixelada del lunar (lo que "ve" la IA). n×n cuadritos.
function FotoPixeles({ x, y, lado = 360, n = 12, p = 1, tono = 'oscura' }) {
  const piel = tono === 'oscura' ? [110, 65, 41] : [243, 198, 162], lu = tono === 'oscura' ? [40, 20, 10] : [106, 58, 31], rr = krng(9), q = lado / n, out = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const dx = (i - n / 2 + 0.5) / (n / 2), dy = (j - n / 2 + 0.5) / (n / 2), dd = Math.hypot(dx * 1.1, dy) + Math.sin(i * 1.7 + j) * 0.08;
    const k = kclamp((0.62 - dd) * 4, 0, 1), jit = (rr() - 0.5) * 18;
    const col = piel.map((v, c) => Math.round(klerp(v, lu[c], k) + jit));
    const e = kprog(p, (i + j) / (2 * n) * 0.7, (i + j) / (2 * n) * 0.7 + 0.3);
    out.push(<rect key={i + '-' + j} x={i * q} y={j * q} width={q - 2} height={q - 2} fill={`rgb(${col.join(',')})`} opacity={e} />);
  }
  return <g transform={`translate(${x - lado / 2} ${y - lado / 2})`}>
    <rect x={-14} y={-14} width={lado + 26} height={lado + 26} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {out}
  </g>;
}

// Mosaico de fotitos de piel (las fotos de entrenamiento). oscuras: fracción de tonos oscuros (ilustrativo).
function Mosaico({ T, x = 72, y = 740, cols = 12, filas = 6, w = 70, h = 52, gap = 8, llegada = [0, 1], resalta = 0, seed = 4, oscuras = 0.12 }) {
  const rr = krng(seed), out = [], N = cols * filas;
  for (let i = 0; i < N; i++) {
    const c = i % cols, f = Math.floor(i / cols), u = rr(), osc = u < oscuras, med = !osc && u < oscuras + 0.08;
    const tono = osc ? TONOS_OSCUROS[i % 3] : med ? TONOS_MEDIOS[i % 3] : TONOS_CLAROS[i % 5];
    const t0 = klerp(llegada[0], llegada[1], (i * 7 % N) / N), e = kprog(T, t0, t0 + 0.35, kEase.sale);
    if (e <= 0) continue;
    const px = x + c * (w + gap), py = y + f * (h + gap) - (1 - e) * 120;
    const brilla = osc && resalta > 0;
    out.push(<g key={i} opacity={e * (resalta > 0 && !osc ? 1 - 0.55 * resalta : 1)}>
      <rect x={px} y={py} width={w} height={h} rx={8} fill={tono} stroke={brilla ? KC.yellow : KC.ink} strokeWidth={brilla ? 7 : 4} />
      <ellipse cx={px + w * (0.35 + rr() * 0.3)} cy={py + h * 0.5} rx={8} ry={7} fill={osc ? '#1d0f07' : '#6a3a1f'} />
    </g>);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}

// Dermatólogo esquemático (bata blanca y estetoscopio).
function Medico({ x, y, s = 1, tono = '#e0a77f', T = 0, seed = 0 }) {
  const b = Math.sin(T * 2.4 + seed) * 3;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -46 70 Q -50 10 0 6 Q 50 10 46 70 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -10 8 L 0 40 L 10 8" stroke={KC.ink} strokeWidth={5} fill="none" />
    <path d="M -18 14 Q -24 46 0 50 Q 24 46 18 14" stroke={KC.blue} strokeWidth={5} fill="none" /><circle cx={0} cy={52} r={6} fill={KC.blue} stroke={KC.ink} strokeWidth={3} />
    <circle cy={-22} r={26} fill={tono} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-9} cy={-24} r={3.5} fill={KC.ink} /><circle cx={9} cy={-24} r={3.5} fill={KC.ink} />
  </g>;
}

// Fila de 10 lunares sobre una franja de piel; encontrados: cuántos llevan ✔ (acepta fracción para el último).
function FilaLunares({ T, y, tono, encontrados, x = 80, ancho = 920 }) {
  const c = PIEL[tono], lu = tono === 'clara' ? PIEL.lunarClaro : PIEL.lunarOscuro, paso = ancho / 10;
  return <g>
    <rect x={x} y={y - 55} width={ancho} height={110} rx={55} fill={c} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 10 }, (_, i) => { const cx = x + paso * (i + 0.5), k = kclamp(encontrados - i, 0, 1);
      return <g key={i}>
        <path d={`M ${cx - 18} ${y - 4} q 4 -18 20 -16 q 18 2 16 18 q -2 18 -18 18 q -20 -2 -18 -20 Z`} fill={lu} stroke={KC.ink} strokeWidth={3} />
        {k > 0 && <circle cx={cx} cy={y} r={36} fill="none" stroke={KC.leaf} strokeWidth={8} strokeDasharray={`${226 * k} 999`} transform={`rotate(-90 ${cx} ${y})`} />}
        {k >= 1 && <path d={`M ${cx + 14} ${y - 50} l 8 9 l 16 -18`} stroke={KC.leaf} strokeWidth={7} fill="none" strokeLinecap="round" />}
      </g>; })}
  </g>;
}

// Tarjeta del ABCDE: letra grande, dibujo y palabra.
function TarjetaABCDE({ T, at, letra, palabra, x, y, dibujo }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), o = kprog(T, at, at + 0.2);
  return <div style={{ position:'absolute', left:x, top:y, width:300, height:270, zIndex:40, opacity:o, transform:`scale(${klerp(0.5, 1, e)}) rotate(${(letra.charCodeAt(0) % 2 ? -2 : 2)}deg)`,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}` }}>
    <div style={{ position:'absolute', left:18, top:4, font:`400 96px/1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`3px ${KC.ink}` }}>{letra}</div>
    <svg width={300} height={270} style={{ position:'absolute', left:0, top:0 }}>{dibujo(T - at)}</svg>
    <div style={{ position:'absolute', left:0, right:0, bottom:14, textAlign:'center', font:`900 30px/1.05 ${KF.texto}`, color:KC.ink }}>{palabra}</div>
  </div>;
}
const LU = PIEL.lunarClaro;
const dibA = () => <g transform="translate(185 110)"><path d="M 0 -50 Q -56 -40 -50 4 Q -44 48 0 50 Z" fill={LU} stroke={KC.ink} strokeWidth={4} /><path d="M 0 -50 Q 30 -30 22 -6 Q 46 20 0 50 Z" fill="#a0603a" stroke={KC.ink} strokeWidth={4} /><line x1={0} y1={-66} x2={0} y2={66} stroke={KC.blue} strokeWidth={4} strokeDasharray="8 6" /></g>;
const dibB = () => <g transform="translate(185 110)"><path d="M -40 -20 l 12 -22 l 14 10 l 16 -20 l 10 18 l 24 -6 l -4 24 l 18 14 l -20 12 l 6 24 l -24 -4 l -10 20 l -16 -16 l -22 10 l 0 -24 l -20 -10 l 16 -14 Z" fill={LU} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /></g>;
const dibC = () => <g transform="translate(185 110)"><ellipse rx={52} ry={46} fill="#b07a4e" stroke={KC.ink} strokeWidth={4} /><ellipse cx={-14} cy={-8} rx={26} ry={22} fill="#3a1d0e" /><ellipse cx={20} cy={14} rx={16} ry={14} fill="#c0392b" opacity=".85" /><ellipse cx={18} cy={-22} rx={12} ry={10} fill="#2b4a8a" opacity=".8" /></g>;
const dibD = (t) => { const g = kprog(t, 0, 0.8, kEase.sale); return <g transform="translate(150 105)">
  <rect x={-110} y={30} width={220} height={34} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  {Array.from({ length: 12 }, (_, i) => <line key={i} x1={-100 + i * 18} y1={30} x2={-100 + i * 18} y2={i % 5 === 0 ? 52 : 42} stroke={KC.ink} strokeWidth={3} />)}
  <ellipse cx={40} cy={-18} rx={30 * g} ry={28 * g} fill={LU} stroke={KC.ink} strokeWidth={4} />
  <text x={-30} y={-6} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>6 mm</text>
  <circle cx={-60} cy={-50} r={0} /></g>; };
const dibE = (t) => { const g = 0.75 + 0.25 * kprog(t % 1.6, 0, 1.2, kEase.suave); return <g transform="translate(185 110)">
  <ellipse rx={26} ry={24} fill="none" stroke={KC.ink} strokeWidth={3} strokeDasharray="6 6" />
  <path d={`M ${-30 * g} 0 q 0 ${-34 * g} ${32 * g} ${-30 * g} q ${30 * g} ${6 * g} ${26 * g} ${34 * g} q ${-8 * g} ${26 * g} ${-34 * g} ${22 * g} q ${-26 * g} ${-6 * g} ${-24 * g} ${-26 * g} Z`} fill={LU} stroke={KC.ink} strokeWidth={4} opacity=".9" />
  <path d="M 50 -40 l 24 -24 m 0 0 l -18 0 m 18 0 l 0 18" stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" /></g>; };

// Mano (palma), planta del pie y uña con línea oscura, en piel oscura.
function Palma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-48, -16, 16, 48].map((fx, i) => <rect key={i} x={fx - 15} y={-150 + Math.abs(i - 1.5) * 14} width={30} height={110} rx={15} fill={PIEL.oscura} stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-92} y={-30} width={30} height={90} rx={15} fill={PIEL.oscura} stroke={KC.ink} strokeWidth={6} transform="rotate(-35 -77 15)" />
    <rect x={-70} y={-62} width={140} height={150} rx={50} fill={PIEL.oscura} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={14} rx={52} ry={58} fill="#b98663" />
    <circle cx={18} cy={30} r={9} fill={PIEL.lunarOscuro} />
  </g>;
}
function Planta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -120 Q 62 -118 58 -30 Q 54 40 40 100 Q 26 140 -6 136 Q -40 132 -42 90 Q -46 30 -54 -30 Q -60 -116 0 -120 Z" fill={PIEL.oscura} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -104 Q 46 -100 42 -30 Q 38 36 26 92 Q 14 120 -6 118 Q -28 114 -28 84 Q -32 30 -40 -30 Q -44 -100 0 -104 Z" fill="#b98663" />
    {[[-34, -142, 16], [-6, -150, 14], [18, -146, 12], [36, -136, 11], [50, -122, 10]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={PIEL.oscura} stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={-10} cy={60} r={10} fill={PIEL.lunarOscuro} />
  </g>;
}
function Una({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-120} width={100} height={250} rx={50} fill={PIEL.oscura} stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-104} width={68} height={92} rx={26} fill="#e9c9b4" stroke={KC.ink} strokeWidth={4} />
    <rect x={-6} y={-104} width={12} height={92} fill="#3a1d0e" />
  </g>;
}
function Aro({ x, y, r = 70, T, p = 1, col = KC.red }) {
  if (p <= 0) return null;
  return <circle cx={x} cy={y} r={r * (1 + 0.06 * Math.sin(T * 6))} fill="none" stroke={col} strokeWidth={8} strokeDasharray={`${2 * Math.PI * r * Math.min(1, p)} 9999`} transform={`rotate(-90 ${x} ${y})`} />;
}
// Barras horizontales sin decimales (porcentaje de cánceres detectados).
function BarrasPct({ T, at, until, filas, top = 860 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:80, top, width:920, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.1, kEase.sale);
      return <div key={i} style={{ marginBottom:24, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 660 * f.valor / 100 * g), height:72, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 70px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{Math.round(f.valor * g)} %</div>
        </div>
      </div>; })}
  </div>;
}

function Lunares() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lupa, P: CUES.Promesa, Q: CUES.Pregunta, E: CUES.Estudio, R: CUES.Resultado, D: CUES.Dermas, A: CUES.Arreglo, B: CUES.ABCDE, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const P2 = K.P + 4.8, B2 = K.B + 6.4;   // segunda línea de Promesa y de ABCDE (tiempo de autor; en la narrada se recorren)
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const brazos = (t0, cierre) => <>
    <Antebrazo y={900} tono="oscura" lunarX={380} T={T} seed={1} />
    <Antebrazo y={1110} tono="clara" lunarX={380} T={T} seed={2} />
  </>;
  // Resultado: lunares encontrados
  const encClara = 6.9 * kprog(T, K.R + 1.2, K.R + 3.4, kEase.suave), encOsc = 2.3 * kprog(T, K.R + 3.8, K.R + 5.4, kEase.suave);
  // Arreglo: barras que se emparejan (sin números: es otra métrica)
  const em = kprog(T, K.A + 1.0, K.A + 2.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: dos brazos, la IA duda con la piel oscura */}
      <Escena T={T} a={K.G} b={K.L}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {brazos()}
          <CelularIA x={300} y={560} T={T} haz={kprog(T, K.G + 0.1, K.G + 0.5)} objetivo={T < K.G + 2.4 ? [380, 1110] : [380, 900]} />
          <Insignia x={470} y={1050} tipo="ok" p={kprog(T, K.G + 1.0, K.G + 1.5)} T={T} />
          <Insignia x={470} y={840} tipo="duda" p={kprog(T, K.G + 2.6, K.G + 3.1)} T={T} />
        </>)}
        <Etq T={T} at={K.G + 0.6} x={560} y={985} texto="piel oscura" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.G + 0.8} x={560} y={1195} texto="piel clara" lado="der" color={KC.ink} tam={30} />
      </Escena>
      {/* 2 · por dentro del lunar → la foto que ve la IA */}
      <Escena T={T} a={K.L} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Antebrazo y={1080} largo={900} tono="oscura" lunarX={300} T={T} seed={3} />
          <g opacity={kprog(T, K.L + 2.4, K.L + 2.9)}><FotoPixeles x={620} y={700} lado={340} p={kprog(T, K.L + 2.4, K.L + 3.6)} /></g>
          {T > K.L + 2.4 && <line x1={300} y1={1074} x2={480} y2={880} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" opacity={kprog(T, K.L + 2.4, K.L + 2.8)} />}
        </>)}
      </Escena>
      <Lupa T={T} at={K.L + 0.2} until={K.L + 2.3} x={620} y={690} r={250} fx={300} fy={1074} interior={(t, r) => <PielPorDentro T={t} r={r} />} etiqueta="AL MICROSCOPIO · células con pigmento" tinte={KC.cyan} />
      <Chip T={T} at={K.L + 3.0} until={K.P - 0.2} texto="lo que ve la IA: pixeles" x={620} y={950} tam={34} borde={KC.cyan} />
      {/* 3 · la promesa de 2017 */}
      <Escena T={T} a={K.P} b={K.Q}>
        <FondoLunares color={KC.lilac} />
        {T < P2 + 0.6 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, P2 - 0.2, P2 + 0.4) }}>
          <Mosaico T={T} llegada={[K.P + 1.0, K.P + 3.6]} y={760} />
        </div>}
        {T > P2 - 0.3 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, P2 - 0.3, P2 + 0.3) }}>
          {svg(<>
            <Robotito x={250} y={930} s={0.95} T={T} cara="seguro" />
            <text x={250} y={1110} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>IA</text>
            <text x={455} y={935} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={3}>=</text>
            {Array.from({ length: 21 }, (_, i) => { const c = i % 7, f = Math.floor(i / 7), a0 = P2 + 0.2 + i * 0.06;
              return <g key={i} opacity={kprog(T, a0, a0 + 0.25)}><Medico x={560 + c * 70} y={800 + f * 120} s={0.62} T={T} seed={i} tono={[ '#f1c5a3', '#c98f62', '#7a4a2c' ][i % 3]} /></g>; })}
            <text x={770} y={1135} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>21 DERMATÓLOGOS</text>
          </>)}
        </div>}
      </Escena>
      <TarjetaEstudio T={T} at={K.P + 0.15} until={P2 - 0.4} anio="2017" quien="Universidad de Stanford" revista="Esteva et al. · Nature" y={520} />
      {T < P2 && <Contador T={T} at={K.P + 1.0} hasta={129450} dur={2.6} sufijo=" fotos" x={540} y={1150} tam={70} color={KC.texto} />}
      <Chip T={T} at={P2 + 1.6} until={K.Q - 0.2} texto="nivel comparable · en 2 pruebas" x={640} y={680} tam={34} borde={KC.ink} />
      {/* 4 · pregunta */}
      <Escena T={T} a={K.Q} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        <div style={{ position:'absolute', inset:0, transform:'scale(.62)', transformOrigin:'50% 0%', top:-120 }}>
          <Mosaico T={T} llegada={[K.Q - 2, K.Q - 1]} y={760} resalta={kprog(T, K.Q + 0.3, K.Q + 0.8)} />
        </div>
        {svg(<text x={260} y={1150} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 980)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.Q + 0.5} until={K.E - 0.1} texto="ilustrativo" x={540} y={250} tam={26} borde={KC.texto} />
      {/* 5 · el estudio de 2022 */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg((() => { const rr = krng(22), out = [], n = Math.round(656 * kprog(T, K.E + 0.6, K.E + 3.4, kEase.suave));
          for (let i = 0; i < 656; i++) { const u = rr(), c = i % 41, f = Math.floor(i / 41); if (i >= n) continue;
            const tono = u < 208 / 656 ? TONOS_CLAROS[i % 5] : u < 449 / 656 ? TONOS_MEDIOS[i % 3] : TONOS_OSCUROS[i % 3];
            out.push(<rect key={i} x={70 + c * 23} y={720 + f * 24} width={20} height={21} rx={3} fill={tono} stroke={KC.ink} strokeWidth={1.5} />); }
          return <>{out}
            {T > K.E + 3.4 && <g transform={`translate(800 1060) rotate(-12) scale(${klerp(2, 1, kprog(T, K.E + 3.4, K.E + 3.8, kEase.sale))})`} opacity={kprog(T, K.E + 3.4, K.E + 3.6)}>
              <rect x={-150} y={-50} width={300} height={100} rx={18} fill="rgba(63,191,74,.18)" stroke={KC.leaf} strokeWidth={9} />
              <text y={20} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.leaf}>BIOPSIA ✔</text></g>}</>; })())}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.9} anio="2022" quien="Stanford, otra vez" revista="Daneshjou et al. · Science Advances" y={520} />
      <Chip T={T} at={K.E + 3.1} until={K.R - 0.2} texto="656 fotos · 3 grupos de tono" x={360} y={460} tam={32} borde={KC.ink} />
      {/* 6 · resultado: 7 de 10 contra poco más de 2 de 10 */}
      <Escena T={T} a={K.R} b={K.D}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <FilaLunares T={T} y={790} tono="clara" encontrados={encClara} />
          <FilaLunares T={T} y={1060} tono="oscura" encontrados={encOsc} />
        </>)}
        <div style={{ position:'absolute', left:80, top:640, font:`900 40px ${KF.texto}`, color:KC.ink }}>piel clara <span style={{ font:`400 64px ${KF.titulo}`, color:KC.leaf, WebkitTextStroke:`3px ${KC.ink}`, marginLeft:14, opacity:kprog(T, K.R + 1.2, K.R + 1.6) }}>{Math.round(69 * kprog(T, K.R + 1.2, K.R + 3.4, kEase.suave))} %</span></div>
        <div style={{ position:'absolute', left:80, top:910, font:`900 40px ${KF.texto}`, color:KC.ink }}>piel oscura <span style={{ font:`400 64px ${KF.titulo}`, color:KC.red, WebkitTextStroke:`3px ${KC.ink}`, marginLeft:14, opacity:kprog(T, K.R + 3.8, K.R + 4.2) }}>{Math.round(23 * kprog(T, K.R + 3.8, K.R + 5.4, kEase.suave))} %</span></div>
      </Escena>
      <Chip T={T} at={K.R + 0.2} until={K.D - 0.2} texto="cánceres detectados de cada 10" x={400} y={470} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.R + 0.6} until={K.D - 0.2} texto="IA hecha con los datos de 2017" x={400} y={545} tam={28} borde={KC.ink} />
      {/* 7 · los dermatólogos también */}
      <Escena T={T} a={K.D} b={K.A}>
        <FondoLunares color={KC.pink} />
        {svg(<>{[0, 1, 2].map((i) => <Medico key={i} x={480 + i * 120} y={660} s={1} T={T} seed={i} tono={['#f1c5a3', '#c98f62', '#e0a77f'][i]} />)}
          <g transform="translate(870 640) rotate(8)"><rect x={-60} y={-46} width={120} height={92} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} /><rect x={-48} y={-34} width={96} height={68} fill={PIEL.oscura} /><circle cx={4} cy={0} r={12} fill={PIEL.lunarOscuro} /></g></>)}
      </Escena>
      <Chip T={T} at={K.D + 0.2} until={K.A - 0.2} texto="3 dermatólogos, solo con fotos" x={640} y={470} tam={32} borde={KC.ink} />
      <BarrasPct T={T} at={K.D + 0.5} until={K.A - 0.2} top={800} filas={[{ valor: 72, etiqueta: 'piel clara · cánceres detectados', color: KC.leaf }, { valor: 59, etiqueta: 'piel oscura · cánceres detectados', color: KC.red, at: K.D + 1.6 }]} />
      {/* 8 · el arreglo: reentrenar con pieles diversas */}
      <Escena T={T} a={K.A} b={K.B}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Robotito x={280} y={930} s={1} T={T} cara="feliz" />
          {Array.from({ length: 9 }, (_, i) => { const u = kprog(T, K.A + 0.2 + i * 0.12, K.A + 1.0 + i * 0.12, kEase.suave), tono = [TONOS_CLAROS[0], TONOS_MEDIOS[0], TONOS_OSCUROS[0]][i % 3];
            const x0 = 120 + (i % 3) * 100, y0 = 640 + Math.floor(i / 3) * 40; if (u <= 0 || u >= 1) return null;
            return <rect key={i} x={klerp(x0, 260, u) - 30} y={klerp(y0, 900, u) - 22} width={60 * (1 - u * 0.6)} height={44 * (1 - u * 0.6)} rx={6} fill={tono} stroke={KC.ink} strokeWidth={4} />; })}
          {[[700, klerp(300, 290, em), KC.leaf, 'clara'], [880, klerp(110, 300, em), KC.blue, 'oscura']].map(([bx, h, col, t]) => <g key={t}>
            <rect x={bx - 60} y={1075 - h} width={120} height={h} rx={10} fill={col} stroke={KC.ink} strokeWidth={7} />
            <text x={bx} y={1120} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>)}
        </>)}
      </Escena>
      <Chip T={T} at={K.A + 0.3} until={K.B - 0.2} texto="reentrenada con pieles diversas" x={600} y={690} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.A + 2.6} until={K.B - 0.2} texto="la brecha se cerró ✔" x={790} y={745} tam={28} borde={KC.leaf} />
      {/* 9 · ABCDE */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {T > B2 - 0.3 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, B2 - 0.3, B2 + 0.3) }}>{svg(<>
          <Palma x={210} y={930} s={1} /><Aro x={228} y={960} T={T} p={kprog(T, B2 + 0.8, B2 + 1.3)} />
          <Planta x={540} y={950} s={1} /><Aro x={530} y={1010} T={T} p={kprog(T, B2 + 1.3, B2 + 1.8)} />
          <Una x={860} y={960} s={1} /><Aro x={860} y={858} T={T} p={kprog(T, B2 + 1.9, B2 + 2.4)} />
          <text x={210} y={1150} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>palmas</text>
          <text x={540} y={1150} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>plantas</text>
          <text x={860} y={1150} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>uñas</text>
        </>)}</div>}
      </Escena>
      {T < B2 + 0.4 && <div style={{ position:'absolute', inset:0, zIndex:40, opacity:1 - kprog(T, B2 - 0.2, B2 + 0.3) }}>
        <TarjetaABCDE T={T} at={K.B + 0.5} letra="A" palabra="asimetría" x={60} y={560} dibujo={dibA} />
        <TarjetaABCDE T={T} at={K.B + 1.2} letra="B" palabra="borde irregular" x={390} y={560} dibujo={dibB} />
        <TarjetaABCDE T={T} at={K.B + 2.4} letra="C" palabra="varios colores" x={720} y={560} dibujo={dibC} />
        <TarjetaABCDE T={T} at={K.B + 3.4} letra="D" palabra="suele ser > 6 mm" x={225} y={880} dibujo={dibD} />
        <TarjetaABCDE T={T} at={K.B + 5.2} letra="E" palabra="que cambie" x={555} y={880} dibujo={dibE} />
      </div>}
      <Chip T={T} at={K.B + 0.2} until={B2 - 0.3} texto="ABCDE · revisa tus lunares" x={540} y={460} tam={36} borde={KC.red} />
      <Chip T={T} at={B2 + 0.2} until={K.C - 0.2} texto="en piel oscura, revisa también" x={640} y={470} tam={32} borde={KC.ink} />
      {/* 10 · cierre: la misma imagen, ahora con dermatólogo */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {brazos()}
          <CelularIA x={300} y={560} T={T} haz={1 - kprog(T, K.C + 1.0, K.C + 1.6)} objetivo={[380, 900]} tacha={kprog(T, K.C + 1.2, K.C + 1.7, kEase.sale)} />
          <Insignia x={470} y={840} tipo="duda" p={1 - kprog(T, K.C + 2.4, K.C + 2.7)} T={T} />
          <Insignia x={470} y={840} tipo="ok" p={kprog(T, K.C + 2.7, K.C + 3.2)} T={T} />
          <Insignia x={470} y={1050} tipo="ok" p={kprog(T, K.C + 2.9, K.C + 3.4)} T={T} />
          <g opacity={kprog(T, K.C + 2.5, K.C + 3.0)}><Medico x={900} y={720} s={1.1} T={T} tono="#a8704a" /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.3} until={K.Ou} texto="¿una IA que adivine? ✗" x={300} y={300 + 470} tam={30} borde={KC.red} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="ve al dermatólogo ✔" x={680} y={1005} tam={32} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="Piel oscura: *la IA falla más.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.P - 0.1} texto="Células con pigmento… *la IA ve una foto.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.1} until={P2 - 0.1} texto="Stanford, 2017: *129,450 fotos.*" />
      <Subtitulo T={T} idx={3} at={P2 + 0.1} until={K.Q - 0.1} texto="Tan bien como *21 dermatólogos.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.E - 0.1} texto="¿Y si casi no vio *pieles como la tuya?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="2022: *656 fotos con biopsia.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.D - 0.1} texto="Clara: *casi 7 de 10.* Oscura: *poco más de 2.*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.A - 0.1} texto="Los 3 dermatólogos *también fallaron más.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.B - 0.1} texto="Con pieles diversas, *la brecha se cerró.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={B2 - 0.1} texto="Revísate con *el ABCDE.*" />
      <Subtitulo T={T} idx={10} at={B2 + 0.1} until={K.C - 0.1} texto="Piel oscura: *palmas, plantas, uñas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Si un lunar cambia: *ve al dermatólogo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Lupa + 1.0, CUES.Promesa - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Promesa + 5.2, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.1, CUES.Resultado - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Resultado + 3.5, CUES.Dermas - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Dermas + 0.5, CUES.Arreglo - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Arreglo + 0.5, CUES.ABCDE - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.ABCDE + 6.6, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_04_bajando_lentes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="37" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LunaresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Lunares /></CompositionStage></div>;
}
window.LunaresApp = LunaresApp;
