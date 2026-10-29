// Shot Biotecnológico #21 · La sangre azul que revisa tus vacunas (cangrejo herradura, prueba LAL y factor C recombinante).
// NARRADO · formato N1 "Por dentro" + N5 "El experimento". Guion y fuentes: guion.md · verificación: verificacion.md.
// El dibujo es esquemático y no está a escala entre sí.
const AZUL = '#2f6bff', AZUL_CL = '#7fb2ff', CAPA = '#8a7642', CAPA_OSC = '#5e4f28', CAPA_CL = '#b39a5c', ENDO = '#ff6b5a', GEL = '#cfe3ff';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Cangrejo herradura (Limulus polyphemus), vista de arriba. Origen = bisagra entre prosoma y opistosoma.
// Prosoma en forma de herradura con cresta media y dos ojos compuestos laterales; opistosoma con espinas
// móviles en el borde; telson (cola) largo y recto. patas = 0..1 (se asoman las puntas al caminar).
function Cangrejo({ T = 0, x = 0, y = 0, s = 1, rot = 0, patas = 0, gris = 0, aguja = 0, o = 1 }) {
  const col = mixHex(CAPA, '#8a8f99', gris), osc = mixHex(CAPA_OSC, '#5d6168', gris), cl = mixHex(CAPA_CL, '#b9bdc4', gris);
  const paso = (i) => Math.sin(T * 9 + i * 1.7) * 10 * patas;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {/* telson */}
    <path d="M -16 250 L 16 250 L 6 640 L 0 660 L -6 640 Z" fill={osc} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* puntas de patas bajo el borde */}
    {patas > 0 && [-1, 1].map((l) => [0, 1, 2, 3].map((k) => <path key={l + '_' + k} d={`M ${l * (150 + k * 22)} ${-40 + k * 30} l ${l * (60 + paso(k + (l > 0 ? 4 : 0)))} ${8 + k * 6}`} stroke={osc} strokeWidth={14} strokeLinecap="round" />))}
    {/* opistosoma con espinas */}
    {[-1, 1].map((l) => [0, 1, 2, 3, 4, 5].map((k) => { const t = k / 5, ex = l * klerp(178, 140, t), ey = klerp(70, 220, t);
      return <path key={'e' + l + k} d={`M ${ex} ${ey} l ${l * 34} ${10 + k * 2}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />; }))}
    <path d="M -180 50 L 180 50 L 160 140 L 140 230 L 40 280 L -40 280 L -140 230 L -160 140 Z" fill={col} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 0 60 L 0 270 M -120 90 Q -60 160 -30 260 M 120 90 Q 60 160 30 260" stroke={osc} strokeWidth={5} fill="none" opacity=".7" />
    {/* prosoma (herradura) */}
    <path d="M -268 60 C -282 -150 -150 -275 0 -275 C 150 -275 282 -150 268 60 Q 220 30 180 50 L -180 50 Q -220 30 -268 60 Z" fill={col} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -230 -40 C -210 -170 -110 -240 0 -244" stroke={cl} strokeWidth={10} fill="none" strokeLinecap="round" opacity=".7" />
    <path d="M 0 -250 L 0 40 M -150 -150 Q -120 -40 -100 40 M 150 -150 Q 120 -40 100 40" stroke={osc} strokeWidth={6} fill="none" opacity=".75" />
    {/* ojos compuestos laterales (en forma de riñón) y ocelos medios */}
    {[-1, 1].map((l) => <ellipse key={'o' + l} cx={l * 140} cy={-110} rx={30} ry={15} transform={`rotate(${l * 70} ${l * 140} -110)`} fill="#2b2418" stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={-9} cy={-200} r={6} fill="#2b2418" /><circle cx={9} cy={-200} r={6} fill="#2b2418" />
    {aguja > 0 && <g opacity={aguja}>
      <line x1={0} y1={52} x2={0} y2={-30} stroke="#c9d1dc" strokeWidth={10} strokeLinecap="round" />
      <circle cx={0} cy={52} r={14} fill={AZUL} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
// Frasco de sangre azul. nivel 0..1.
function Frasco({ T = 0, x, y, s = 1, nivel = 1, color = AZUL, etiqueta }) {
  const h = 300 * kclamp(nivel, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-160} width={240} height={320} rx={36} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} />
    {h > 0 && <path d={`M -110 ${150 - h + Math.sin(T * 4) * 6} Q 0 ${150 - h - 10} 110 ${150 - h - Math.sin(T * 4) * 6} L 110 120 Q 110 150 80 150 L -80 150 Q -110 150 -110 120 Z`} fill={color} />}
    <rect x={-80} y={-130} width={30} height={200} rx={15} fill="#fff" opacity=".45" />
    <rect x={-70} y={-210} width={140} height={56} rx={10} fill="#e9eef5" stroke={KC.ink} strokeWidth={8} />
    {etiqueta && <g><rect x={-95} y={10} width={190} height={70} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={58} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Vial de vacuna (tapón de hule y casquillo de aluminio) con jeringa al lado.
function Vacuna({ x, y, s = 1, jeringa = true, sucia = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-120} width={140} height={230} rx={22} fill="#e8f6ff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-40} width={120} height={140} rx={14} fill="#bfe8ff" />
    <rect x={-50} y={-165} width={100} height={50} rx={8} fill="#c9d1dc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-40} y={-185} width={80} height={24} rx={8} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <rect x={-66} y={0} width={132} height={56} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={40} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>vacuna</text>
    {jeringa && <g transform="translate(150 10) rotate(-20)">
      <rect x={-22} y={-140} width={44} height={200} rx={8} fill="#f4fbff" stroke={KC.ink} strokeWidth={7} />
      <rect x={-18} y={-40} width={36} height={96} fill="#bfe8ff" />
      <rect x={-34} y={-160} width={68} height={22} rx={6} fill="#c9d1dc" stroke={KC.ink} strokeWidth={6} />
      <line x1={0} y1={60} x2={0} y2={150} stroke="#9aa3b5" strokeWidth={8} strokeLinecap="round" />
      {sucia > 0 && [0, 1, 2, 3].map((i) => <Endotoxina key={i} x={-6 + (i % 2) * 14} y={-20 + i * 18} s={0.4} rot={i * 50 + T * 30} o={sucia} />)}
    </g>}
  </g>;
}
// Endotoxina (lipopolisacárido) esquemática: "cabeza" de lípido A con colitas y cadena de azúcares.
function Endotoxina({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -10 14 l -6 26 M 0 14 l 0 28 M 10 14 l 6 26" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    <rect x={-18} y={-2} width={36} height={18} rx={8} fill={ENDO} stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={(i % 2 ? 6 : -6)} cy={-12 - i * 14} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Amebocito: célula redondeada llena de gránulos. suelta 0..1 = los gránulos salen (desgranulación).
function Amebocito({ T = 0, x, y, r = 90, suelta = 0, seed = 1 }) {
  const R = krng(seed), gr = Array.from({ length: 16 }, () => [(R() - 0.5) * 1.3 * r, (R() - 0.5) * 1.0 * r, 6 + R() * 6, R() * 6.28]);
  const k = kEase.sale(kclamp(suelta, 0, 1));
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.4 + seed) * 6})`}>
    <ellipse rx={r * klerp(1, 1.15, k)} ry={r * klerp(0.8, 0.9, k)} fill={mixHex('#9fc3ff', '#cfdcf2', k)} stroke={KC.ink} strokeWidth={6} opacity={1 - k * 0.3} />
    <ellipse cx={r * 0.15} cy={0} rx={r * 0.28} ry={r * 0.22} fill="#5b7fd6" stroke={KC.ink} strokeWidth={3} opacity={1 - k * 0.5} />
    {gr.map(([gx, gy, gr2, a], i) => { const d = k * r * 1.4; return <circle key={i} cx={gx + Math.cos(a) * d} cy={gy + Math.sin(a) * d} r={gr2} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} opacity={1 - kprog(k, 0.7, 1) * 0.7} />; })}
  </g>;
}
// Red de gel (coágulo) que crece: p 0..1.
function RedGel({ T = 0, p = 0, x0 = 60, y0 = 560, w = 960, h = 640, seed = 4 }) {
  if (p <= 0) return null;
  const R = krng(seed), n = 34, pts = Array.from({ length: n }, () => [x0 + R() * w, y0 + R() * h]);
  const lines = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (d < 210) lines.push([i, j, d]); }
  const m = Math.floor(lines.length * kclamp(p, 0, 1));
  return <g>{lines.slice(0, m).map(([i, j], k) => <line key={k} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]} stroke={GEL} strokeWidth={5} opacity={0.75} strokeLinecap="round" />)}
    <rect x={x0} y={y0} width={w} height={h} rx={40} fill={GEL} opacity={0.18 * p} /></g>;
}
// Araña y escorpión (siluetas de parientes).
function Arana({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((l) => [0, 1, 2, 3].map((k) => <path key={l + '' + k} d={`M ${l * 20} ${-10 + k * 12} q ${l * 60} ${-50 + k * 20 + Math.sin(T * 6 + k) * 4} ${l * 100} ${-10 + k * 30}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />))}
    <ellipse cx={0} cy={40} rx={50} ry={60} fill="#3b2d4a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-20} rx={32} ry={30} fill="#4d3b60" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-10} cy={-30} r={6} fill="#fff" /><circle cx={10} cy={-30} r={6} fill="#fff" />
  </g>;
}
function Escorpion({ x, y, s = 1, T = 0 }) {
  const cola = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((l) => [0, 1, 2, 3].map((k) => <path key={l + '' + k} d={`M ${l * 24} ${-10 + k * 18} l ${l * 50} ${10 + k * 4}`} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />))}
    {[-1, 1].map((l) => <g key={'p' + l}><path d={`M ${l * 20} -40 Q ${l * 70} -90 ${l * 60} -130`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      <ellipse cx={l * 60} cy={-145} rx={24} ry={18} fill="#c46a2a" stroke={KC.ink} strokeWidth={5} /></g>)}
    <ellipse cx={0} cy={10} rx={38} ry={66} fill="#c46a2a" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 70 Q ${30 + cola} 150 ${10 + cola} 200 Q ${-20 + cola} 220 ${-30 + cola} 190`} stroke="#c46a2a" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M 0 70 Q ${30 + cola} 150 ${10 + cola} 200 Q ${-20 + cola} 220 ${-30 + cola} 190`} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".5" />
  </g>;
}
// Gota de sangre (tuya o del cangrejo).
function Gota({ x, y, s = 1, color }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -170 C 60 -80 120 -10 120 60 C 120 130 66 180 0 180 C -66 180 -120 130 -120 60 C -120 -10 -60 -80 0 -170 Z" fill={color} stroke={KC.ink} strokeWidth={9} />
    <path d="M -60 40 Q -60 0 -30 -40" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity=".5" />
  </g>;
}
// Persona con fiebre (silueta).
function Persona({ T = 0, x, y, s = 1, fiebre = 0 }) {
  const cara = mixHex('#f1b48f', '#ff6b6b', fiebre);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 330 Q -150 120 0 110 Q 150 120 150 330 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-10} r={110} fill={cara} stroke={KC.ink} strokeWidth={9} />
    <path d="M -50 -30 l 30 10 M 50 -30 l -30 10" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M -40 50 Q 0 30 40 50" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    {fiebre > 0.4 && [0, 1, 2].map((i) => <path key={i} d={`M ${-130 + i * 20} ${-90 + ((T * 60 + i * 30) % 80)} q 8 12 0 22 q -8 -10 0 -22`} fill="#7fd0ff" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Tubo de ensayo. gel 0..1 (el líquido se vuelve gel opaco), rot en grados (se voltea).
function Tubo({ x, y, s = 1, rot = 0, gel = 0, color = '#dfe9ff' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 -260 L -60 180 Q -60 250 0 250 Q 60 250 60 180 L 60 -260" fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -52 60 L -52 180 Q -52 242 0 242 Q 52 242 52 180 L 52 60 Z" fill={mixHex(color, '#f2f2ea', gel)} />
    {gel > 0.5 && <path d="M -40 120 q 20 -20 40 0 t 40 0 M -40 170 q 20 -20 40 0 t 40 0" stroke="#c7c2b0" strokeWidth={5} fill="none" opacity={gel} />}
    <rect x={-74} y={-280} width={148} height={28} rx={10} fill="#e9eef5" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Conejo (la prueba de antes).
function Conejo({ x, y, s = 1, T = 0, salto = 0 }) {
  const h = Math.abs(Math.sin(T * 7)) * 40 * salto;
  return <g transform={`translate(${x} ${y - h}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={90} ry={66} fill="#f3eee8" stroke={KC.ink} strokeWidth={7} />
    <circle cx={70} cy={-20} r={50} fill="#f3eee8" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={60} cy={-100} rx={16} ry={50} fill="#f3eee8" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={92} cy={-96} rx={16} ry={50} fill="#f3eee8" stroke={KC.ink} strokeWidth={6} transform="rotate(14 92 -96)" />
    <circle cx={86} cy={-26} r={7} fill={KC.ink} /><circle cx={118} cy={-8} r={7} fill={KC.pink} />
    <circle cx={-88} cy={30} r={22} fill="#fff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Sello redondo.
function Sello({ x, y, texto, sub, color = KC.red, p = 1, rot = -12 }) {
  if (p <= 0) return null;
  const s = klerp(1.8, 1, kEase.sale(kclamp(p, 0, 1)));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={kclamp(p * 2, 0, 1)}>
    <circle r={120} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={12} />
    <circle r={98} fill="none" stroke={color} strokeWidth={4} />
    <text y={10} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={color}>{texto}</text>
    {sub && <text y={56} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={color}>{sub}</text>}
  </g>;
}
// Libro grueso (farmacopea).
function Libro({ x, y, s = 1, color = KC.blue, titulo, sub }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-200} width={300} height={400} rx={16} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={170} width={300} height={40} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-200} width={36} height={400} fill="rgba(0,0,0,.2)" />
    <rect x={-96} y={-150} width={216} height={120} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={12} y={-96} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{titulo}</text>
    <text x={12} y={-52} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
}
// Ficha de dominó de la cascada del coágulo. cae 0..1.
function Ficha({ x, y, cae = 0, texto, color = KC.paper }) {
  return <g transform={`translate(${x} ${y}) rotate(${70 * kEase.suave(kclamp(cae, 0, 1))} 0 80)`}>
    <rect x={-34} y={-80} width={68} height={160} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
    <line x1={-26} y1={0} x2={26} y2={0} stroke={KC.ink} strokeWidth={4} />
    {texto && <text x={0} y={-30} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Matraz con células de cultivo.
function Matraz({ T = 0, x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -220 L -50 -90 L -180 150 Q -190 190 -150 190 L 150 190 Q 190 190 180 150 L 50 -90 L 50 -220 Z" fill="rgba(255,255,255,.18)" stroke={KC.texto} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 40 L 120 40 L 172 150 Q 180 182 150 182 L -150 182 Q -180 182 -172 150 Z" fill={mixHex('#3fbf9a', '#7ff0c6', brillo)} opacity=".85" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-110 + (i % 5) * 55 + Math.sin(T * 2 + i) * 6} cy={90 + Math.floor(i / 5) * 50 + Math.cos(T * 2 + i) * 5} r={18} fill="#e9fff4" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-62} y={-240} width={124} height={30} rx={8} fill="#e9eef5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Olas (franja de mar).
function Mar({ T, y, color = '#1f8fd6', alto = 400 }) {
  const d = Array.from({ length: 13 }, (_, i) => `Q ${i * 90 + 45} ${y - 24 + Math.sin(T * 2 + i) * 10} ${i * 90 + 90} ${y}`).join(' ');
  return <g><path d={`M 0 ${y} ${d} L 1080 ${y + alto} L 0 ${y + alto} Z`} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d={`M 0 ${y + 40} ${Array.from({ length: 13 }, (_, i) => `Q ${i * 90 + 45} ${y + 24 + Math.cos(T * 2 + i) * 8} ${i * 90 + 90} ${y + 40}`).join(' ')}`} stroke="rgba(255,255,255,.5)" strokeWidth={6} fill="none" /></g>;
}

function Cangrejo21() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Animal, Az: CUES.Azul, En: CUES.Endotoxina, Pe: CUES.Peligro, Co: CUES.Coagulo, Es: CUES.Estudio, Pr: CUES.Pregunta,
    Sa: CUES.Sangrado, Mo: CUES.Mortalidad, Fc: CUES.FactorC, Fa: CUES.Farmacopea, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, ES2 = K.Es + 4.75;
  const llena = kprog(T, K.G + 0.15, K.G + 1.4, kEase.sale);
  const R = krng(11);
  const endos = Array.from({ length: 9 }, () => [R() * 6.28, 0.6 + R() * 0.8, R() * 360]);
  const amebos = [[230, 760, 1], [540, 650, 2], [850, 780, 3], [360, 1010, 4], [740, 1030, 5]];
  const crias = Array.from({ length: 20 }, (_, i) => [150 + (i % 5) * 195, 860 + Math.floor(i / 5) * 105]);
  const muertos = [3, 9, 16];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la gota azul llena el frasco, junto a la vacuna */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Goteo T={T} x={370} y0={560} y1={830} cada={0.22} color={AZUL} desde={K.G} hasta={K.G + 1.3} r={16} />
          <Frasco T={T} x={370} y={1000} s={1.1} nivel={llena} />
          <Vacuna x={720} y={1040} s={1.05} />
          <g transform={`translate(190 ${700 + Math.sin(T * 2) * 10})`} opacity={1 - kprog(T, K.G + 1.9, K.G + 2.3)}>
            <circle r={70} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} /><ellipse rx={120} ry={26} fill="none" stroke={KC.ink} strokeWidth={7} transform="rotate(-15)" />
            <text y={26} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>?</text></g>
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={4.4} y={1440} color={KC.ink} />
      </Escena>
      {/* 1 · el animal: no es cangrejo */}
      <Escena T={T} a={K.A} b={K.Az} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={0} y={1180} width={KW} height={740} fill="#f2d48a" />
          <Cangrejo T={T} x={klerp(-200, 560, kprog(T, K.A - 0.3, K.A + 1.6, kEase.sale))} y={780} s={0.55} rot={8 * Math.sin(T * 2)} patas={1 - kprog(T, K.A + 1.4, K.A + 1.8)} />
          <g opacity={kprog(T, K.A + 1.8, K.A + 2.3)}>
            <Arana T={T} x={190} y={1080} s={0.85} />
            <Escorpion T={T} x={900} y={1050} s={0.75} />
          </g>
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={1.1} y={1440} color={KC.ink} />
      </Escena>
      {/* 2 · azul: cobre en vez de hierro */}
      <Escena T={T} a={K.Az} b={K.En} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Gota x={290} y={880} s={1} color="#e0262f" />
          <Gota x={790} y={880} s={1} color={mixHex('#eef3f8', AZUL, kprog(T, K.Az + 0.8, K.Az + 1.8))} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.Az + 0.6 + i * 0.15, u = kprog(T, t0, t0 + 0.8);
            return u > 0 && u < 1 ? <g key={i} transform={`translate(${klerp(980, 790 + (i % 3 - 1) * 40, u)} ${klerp(1100, 900 + (i % 4) * 20, u)})`} opacity={1 - u * 0.6}>
              <circle r={22} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={3} /><text y={8} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>O₂</text></g> : null; })}
          <text x={290} y={940} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4}>Fe</text>
          <text x={790} y={940} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4}>Cu</text>
          <text x={290} y={620} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>tu sangre</text>
          <text x={790} y={620} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>la del cangrejo</text>
        </SvgCapa>
      </Escena>
      {/* 3 · endotoxinas: Lupa sobre la vacuna */}
      <Escena T={T} a={K.En} b={K.Pe} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Vacuna x={540} y={1180} s={0.9} jeringa={false} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.En + 0.3} until={K.Pe - 0.25} x={540} y={720} r={330} fx={540} fy={1200} tinte={KC.mint} etiqueta="AL MICROSCOPIO · BACTERIA"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill={KC.noche} />
          <Bacteria T={Tl} x={r} y={r} largo={420} ancho={170} rot={-12} color="#7fd88a" seed={3} />
          {[-160, -90, -20, 50, 120, 170].map((dx, i) => <Endotoxina key={'p' + i} x={r + dx} y={r - 92 + dx * 0.21} s={0.55} rot={-12} />)}
          {endos.map(([a, v, rr], i) => { const t0 = K.En + 1.2 + i * 0.22, u = kprog(Tl, t0, t0 + 2.2, kEase.sale);
            return u > 0 ? <Endotoxina key={i} x={r + Math.cos(a) * (120 + 170 * u * v)} y={r - 60 + Math.sin(a) * (60 + 170 * u * v)} s={0.6} rot={rr + Tl * 40} /> : null; })}
        </svg>} />
      {/* 4 · peligro: fiebre o choque */}
      <Escena T={T} a={K.Pe} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Persona T={T} x={470} y={820} s={1} fiebre={kprog(T, K.Pe + 1.0, K.Pe + 2.6)} />
          <Vacuna x={150} y={1080} s={0.7} sucia={1} T={T} />
        </SvgCapa>
        <Termometro x={860} y={790} alto={300} valor={klerp(36, 41, kprog(T, K.Pe + 0.9, K.Pe + 2.6, kEase.sale))} max={42} marcas={[]} />
      </Escena>
      {/* 5 · amebocitos y coágulo */}
      <Escena T={T} a={K.Co} b={K.Es} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {amebos.map(([x, y, sd], i) => <Amebocito key={i} T={T} x={x} y={y} r={88} seed={sd} suelta={kprog(T, K.Co + 1.2 + i * 0.25, K.Co + 2.2 + i * 0.25)} />)}
          {amebos.map(([x, y], i) => { const u = kprog(T, K.Co + 0.1 + i * 0.2, K.Co + 1.2 + i * 0.25, kEase.suave); return u < 1 ? <Endotoxina key={'e' + i} x={klerp(x + (i % 2 ? 260 : -260), x + 70, u)} y={klerp(y - 200, y - 40, u)} s={0.7} rot={T * 50 + i * 40} /> : null; })}
          <RedGel T={T} p={kprog(T, K.Co + 2.0, K.Co + 3.8)} />
        </SvgCapa>
      </Escena>
      {/* 6a · Woods Hole: laboratorio junto al mar */}
      <Escena T={T} a={K.Es} b={ES2} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Mar T={T} y={1250} />
          <g transform="translate(120 520)">
            <rect x={0} y={60} width={300} height={200} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
            <path d="M -20 70 L 150 -20 L 320 70 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <rect x={40} y={110} width={70} height={60} fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} /><rect x={190} y={110} width={70} height={60} fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} />
            <rect x={125} y={180} width={50} height={80} fill={CAPA_OSC} stroke={KC.ink} strokeWidth={6} />
          </g>
          <Cangrejo T={T} x={800} y={1330} s={0.28} rot={-70} patas={1} />
        </SvgCapa>
      </Escena>
      {/* 6b · el experimento: gota de endotoxina → gel que no se cae */}
      <Escena T={T} a={ES2} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Goteo T={T} x={540} y0={480} y1={760} cada={1} color={ENDO} desde={ES2 + 0.3} hasta={ES2 + 0.4} r={18} />
          <Tubo x={540} y={950} s={1} gel={kprog(T, ES2 + 1.0, ES2 + 2.0)} rot={180 * kprog(T, ES2 + 2.3, ES2 + 2.9, kEase.suave)} />
          <Conejo T={T} x={klerp(190, -200, kprog(T, ES2 + 1.6, ES2 + 3.6))} y={1120} s={0.8} salto={kprog(T, ES2 + 1.6, ES2 + 1.8)} />
          <Sello x={860} y={700} texto="1977" sub="FDA" p={kprog(T, ES2 + 0.6, ES2 + 1.0)} />
        </SvgCapa>
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Sa} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Cangrejo T={T} x={300} y={880} s={0.45} rot={-10} patas={0.6} />
          <text x={300} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 540)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 8 · sangrado y regreso al mar */}
      <Escena T={T} a={K.Sa} b={K.Mo} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Mar T={T} y={klerp(1700, 1120, kprog(T, K.Sa + 2.3, K.Sa + 3.0, kEase.suave))} />
          <Cangrejo T={T} x={klerp(380, 420, kprog(T, K.Sa + 2.4, K.Sa + 3.6))} y={klerp(880, 1120, kprog(T, K.Sa + 2.4, K.Sa + 3.8, kEase.suave))} s={0.5} rot={-6}
            aguja={1 - kprog(T, K.Sa + 2.1, K.Sa + 2.4)} patas={kprog(T, K.Sa + 2.4, K.Sa + 2.6)} />
          {T < K.Sa + 2.4 && <path d={`M 380 906 C 520 980 640 760 780 740`} stroke={AZUL} strokeWidth={10} fill="none" strokeDasharray="18 12" strokeDashoffset={-T * 60} />}
          <Frasco T={T} x={800} y={880} s={0.75} nivel={kprog(T, K.Sa + 0.2, K.Sa + 2.2)} />
        </SvgCapa>
        <Medidor T={T} at={K.Sa + 0.2} until={K.Sa + 2.6} valor={(t) => 0.3 * kprog(t, K.Sa + 0.2, K.Sa + 2.0)} etiqueta="sangre extraída" color={AZUL_CL} y={450} />
      </Escena>
      {/* 9 · mortalidad estimada: 3 de cada 20 */}
      <Escena T={T} a={K.Mo} b={K.Fc} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={0} y={780} width={KW} height={500} fill="#f2d48a" />
          <Mar T={T} y={1290} />
          {crias.map(([x, y], i) => <Cangrejo key={i} T={T} x={x} y={y + (muertos.includes(i) ? 0 : 30 * kprog(T, K.Mo + 0.4, K.Mo + 3.5))} s={0.12} rot={180}
            patas={muertos.includes(i) && T > K.Mo + 1.4 ? 0 : 1} gris={muertos.includes(i) ? kprog(T, K.Mo + 1.3, K.Mo + 1.9) : 0} />)}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Mo + 1.5} until={K.Fc - 0.3} valor={15} dur={0.9} sufijo=" %" x={380} y={560} tam={220} color={KC.yellow} />
      </Escena>
      {/* 10 · factor C recombinante */}
      <Escena T={T} a={K.Fc} b={K.Fa} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {[0, 1, 2, 3, 4].map((i) => <Ficha key={i} x={190 + i * 150} y={800} cae={kprog(T, K.Fc + 0.4 + i * 0.25, K.Fc + 0.7 + i * 0.25)} texto={i === 0 ? 'C' : ''} color={i === 0 ? KC.gold2 : i === 4 ? GEL : KC.paper} />)}
          <ADNHebra T={T} x={80} y={1060} largo={560} alto={60} vueltas={3} resalta={(u) => u > 0.3 && u < 0.62 && T > K.Fc + 1.6} />
          {(() => { const u = kprog(T, K.Fc + 2.2, K.Fc + 3.2, kEase.suave); return u > 0 && u < 1 ? <g transform={`translate(${klerp(360, 800, u)} ${klerp(1060, 980, u) - Math.sin(u * Math.PI) * 140})`}>
            <rect x={-90} y={-14} width={180} height={28} rx={14} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /></g> : null; })()}
          <Matraz T={T} x={820} y={1000} s={0.85} brillo={kprog(T, K.Fc + 3.2, K.Fc + 3.8)} />
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.Fc + 3.4 + i * 0.25, u = kprog(T, t0, t0 + 1.2); return u > 0 && u < 1 ? <g key={i} transform={`translate(${820 + (i - 2.5) * 40} ${klerp(940, 700, u)})`} opacity={1 - u}>
            <circle r={20} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} /><text y={8} textAnchor="middle" style={{ font:`400 26px ${KF.titulo}` }} fill={KC.ink}>C</text></g> : null; })}
        </SvgCapa>
      </Escena>
      {/* 11 · farmacopeas */}
      <Escena T={T} a={K.Fa} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Libro x={290} y={920} s={0.95} color={KC.blue} titulo="Ph. Eur." sub="cap. 2.6.32" />
          <Libro x={790} y={920} s={0.95} color={KC.red} titulo="USP" sub="cap. <86>" />
          <Sello x={330} y={1060} texto="2020" sub="Europa" color={KC.ink} p={kprog(T, K.Fa + 0.5, K.Fa + 0.9)} rot={-10} />
          <Sello x={830} y={1060} texto="2025" sub="EE. UU." color={KC.ink} p={kprog(T, K.Fa + 2.3, K.Fa + 2.7)} rot={8} />
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: el frasco del inicio, ahora con el tubo de rFC */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Frasco T={T} x={300} y={1000} s={1.0} nivel={1} />
          <Vacuna x={560} y={1050} s={0.9} jeringa={false} />
          <g opacity={kprog(T, K.Ci + 0.8, K.Ci + 1.3)}><Tubo x={820} y={1000} s={0.55} color="#ffe9a8" />
            <text x={820} y={1200} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>rFC</text></g>
          <Cangrejo T={T} x={klerp(560, 1250, kprog(T, K.Ci + 1.0, K.Ou + 2))} y={1330} s={0.22} rot={80} patas={1} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 2.6} texto="¿de otro planeta?" x={300} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.7} until={K.A - 0.3} texto="sangre de cangrejo herradura" x={540} y={1530} tam={38} borde={AZUL_CL} />
      <MitoTachado T={T} at={K.A + 0.6} tacharEn={K.A + 1.6} until={K.Az - 0.3} texto="¿cangrejo?" x={700} y={470} tam={44} />
      <Etq T={T} at={K.A + 1.0} until={K.Az - 0.3} x={720} y={760} texto="Limulus polyphemus" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.A + 2.0} until={K.Az - 0.3} texto="parientes: arañas y escorpiones" x={540} y={1530} tam={36} borde={KC.lilac} />
      <Chip T={T} at={K.Az + 1.2} until={K.En - 0.2} texto="hemocianina: cobre → azul" x={540} y={1530} tam={40} borde={AZUL_CL} />
      <Chip T={T} at={K.En + 1.6} until={K.Pe - 0.3} texto="endotoxina = restos de la pared" x={540} y={1530} tam={36} borde={ENDO} />
      <Chip T={T} at={K.Pe + 1.4} until={K.Co - 0.3} texto="fiebre · choque" x={540} y={1530} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Co + 0.2} until={K.Es - 0.3} texto="AL MICROSCOPIO · AMEBOCITOS" x={540} y={430} tam={32} mono borde={KC.cyan} />
      <Etq T={T} at={K.Co + 0.6} until={K.Co + 2.0} x={640} y={560} texto="amebocito" tam={34} color={KC.texto} />
      <Chip T={T} at={K.Co + 2.6} until={K.Es - 0.3} texto="¡coágulo!" x={540} y={1530} tam={50} borde={GEL} />
      <TarjetaEstudio T={T} at={K.Es + 0.3} until={ES2 - 0.3} anio="WOODS HOLE" quien="Frederik Bang (años 50) · Jack Levin (años 60)" revista="Massachusetts, EE. UU. · laboratorio junto al mar" y={980} />
      <Chip T={T} at={ES2 + 1.7} until={K.Pr - 0.3} texto="antes: prueba con conejos" x={300} y={1530} tam={34} borde={KC.paper} />
      <Chip T={T} at={ES2 + 2.9} until={K.Pr - 0.3} texto="gel = hay endotoxina" x={540} y={430} tam={38} borde={ENDO} />
      <Chip T={T} at={K.Sa + 2.6} until={K.Mo - 0.2} texto="de regreso al mar" x={540} y={1530} tam={42} borde={KC.cyan} />
      <Chip T={T} at={K.Mo + 2.2} until={K.Fc - 0.3} texto="estimación ASMFC, 2023" x={540} y={1530} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Fc + 0.4} until={K.Fc + 2.2} x={150} y={680} texto="factor C: la primera ficha" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.Fc + 1.8} until={K.Fa - 0.3} x={640} y={1160} texto="gen del factor C" lado="izq" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Fc + 3.4} until={K.Fa - 0.3} texto="factor C recombinante (rFC)" x={540} y={1530} tam={38} borde={KC.gold2} />
      <Chip T={T} at={K.Fa + 0.3} until={K.Ci - 0.3} texto="las farmacopeas: los libros oficiales" x={540} y={1530} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 1.3} until={K.Ou} texto="LAL con sangre · rFC sin cangrejos" x={540} y={1530} tam={34} borde={AZUL_CL} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="No es de otro planeta: *revisa tus vacunas.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.Az - 0.1} texto="No es cangrejo: *pariente de arañas.*" />
      <Subtitulo T={T} idx={2} at={K.Az + 0.1} until={K.En - 0.1} texto="Cobre, no hierro: *se ve azul.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.Pe - 0.1} texto="La prueba busca *endotoxinas.*" />
      <Subtitulo T={T} idx={4} at={K.Pe + 0.1} until={K.Co - 0.1} texto="En una inyección: *fiebre o choque.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.Es - 0.1} texto="Los amebocitos *forman un coágulo.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={ES2 - 0.1} texto="Bang y Levin, *en Woods Hole.*" />
      <Subtitulo T={T} idx={7} at={ES2 + 0.1} until={K.Pr - 0.1} texto="1977: *alternativa a los conejos.*" />
      <Subtitulo T={T} idx={8} at={K.Pr + 0.1} until={K.Sa - 0.1} texto="¿Cómo le *sacan la sangre?*" />
      <Subtitulo T={T} idx={9} at={K.Sa + 0.1} until={K.Mo - 0.1} texto="Un tercio, *y de vuelta al mar.*" />
      <Subtitulo T={T} idx={10} at={K.Mo + 0.1} until={K.Fc - 0.1} texto="En 2023: *15 % muere.*" />
      <Subtitulo T={T} idx={11} at={K.Fc + 0.1} until={K.Fa - 0.1} texto="Copiar el gen del *factor C.*" />
      <Subtitulo T={T} idx={12} at={K.Fa + 0.1} until={K.Ci - 0.1} texto="Europa 2020 · *EE. UU. 2025.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Y ya se puede *sin cangrejos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.A + 1.0, K.Az - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Pe + 0.4, K.Co - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Es + 0.5, K.Es + 4.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pr + 0.05, K.Pr + 2.9, 'avatar_06_pensativo_menton', 'grande'],
        [K.Mo + 0.3, K.Mo + 3.7, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Fc + 2.4, K.Fc + 5.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="21" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CangrejoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cangrejo21 /></CompositionStage></div>;
}
window.CangrejoApp = CangrejoApp;
