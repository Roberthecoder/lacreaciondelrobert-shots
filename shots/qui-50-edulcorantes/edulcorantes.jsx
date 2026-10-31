// Shot Químico #50 · Este granito no es azúcar (endulzantes que engañan a tu lengua) — NARRADO (N2 el número + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Sin marcas comerciales.
const CAFE = '#5b3418', TAZA = '#ff6b5a', LENGUA = '#f28aa0', R2C = '#b18cff', R3C = '#00d2ff', AMARGO = '#3fbf4a', CL = '#b6e33a';

// ---------- piezas del shot ----------
function Taza({ x, y, s = 1, color = TAZA, ondas = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 150 -90 Q 250 -90 250 0 Q 250 90 150 80" fill="none" stroke={KC.ink} strokeWidth={26} />
    <path d="M 150 -90 Q 250 -90 250 0 Q 250 90 150 80" fill="none" stroke={color} strokeWidth={12} />
    <path d="M -170 -150 L 170 -150 L 150 130 Q 145 170 100 170 L -100 170 Q -145 170 -150 130 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={0} cy={-150} rx={170} ry={36} fill={CAFE} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={-50} cy={-156} rx={60} ry={10} fill="rgba(255,255,255,.18)" />
    {ondas > 0 && [0, 1, 2].map((i) => { const p = (ondas + i * 0.33) % 1; return <ellipse key={i} cx={0} cy={-150} rx={20 + p * 140} ry={4 + p * 28} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={5} opacity={1 - p} />; })}
    <rect x={-120} y={-60} width={50} height={140} rx={20} fill="rgba(255,255,255,.25)" />
  </g>;
}
// Granito de azúcar/endulzante: cubito en perspectiva.
function Granito({ x, y, s = 1, color = '#ffffff', o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 -20 L 20 -10 L 0 0 L -20 -10 Z" fill={color} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M -20 -10 L 0 0 L 0 22 L -20 12 Z" fill={mixHex(color, '#9aa3b5', 0.35)} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M 20 -10 L 0 0 L 0 22 L 20 12 Z" fill={mixHex(color, '#9aa3b5', 0.6)} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
  </g>;
}
// Montón de granitos: f 0..1 = cuántos ya cayeron.
function Monton({ x, y, f = 1, n = 120, ancho = 300, alto = 220, seed = 4, s = 0.55 }) {
  const R = krng(seed), out = [];
  for (let i = 0; i < n; i++) {
    const u = R(), v = R();
    const h = Math.sqrt(v) * alto; const w = (1 - h / alto) * ancho;
    const gx = x + (u - 0.5) * w, gy = y - h;
    const t = i / n; if (t > f) break;
    out.push(<Granito key={i} x={gx} y={gy} s={s} rot={(R() - 0.5) * 50} />);
  }
  return <g>{out}</g>;
}
// Molécula esquemática de hexágonos (azúcar = 2 anillos; sucralosa = 2 anillos + 3 cloros verdes).
function MolHex({ x, y, s = 1, rot = 0, color = '#ffffff', cloros = 0, o = 1, anillos = 2 }) {
  const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
  const cls = [[-74, -50], [70, 52], [96, -40]].slice(0, cloros);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {anillos > 1 && <line x1={-30} y1={0} x2={30} y2={0} stroke={KC.ink} strokeWidth={10} />}
    <polygon points={hex(anillos > 1 ? -50 : 0, 0, 40)} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {anillos > 1 && <polygon points={hex(50, 0, 40)} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />}
    {cls.map(([cx, cy], i) => <g key={i}><line x1={cx * 0.6} y1={cy * 0.6} x2={cx} y2={cy} stroke={KC.ink} strokeWidth={8} /><circle cx={cx} cy={cy} r={20} fill={CL} stroke={KC.ink} strokeWidth={5} /></g>)}
  </g>;
}
// Receptor dulce de dos piezas (T1R2 + T1R3) sobre la membrana. cierra 0..1, luz 0..1.
function Receptor({ x, y, s = 1, cierra = 0, luz = 0, colorLuz = KC.pink, etiquetas = true }) {
  const a = klerp(28, 6, cierra);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && <circle cx={0} cy={-110} r={170} fill={colorLuz} opacity={0.35 * luz} />}
    <g transform={`rotate(${-a} -20 0)`}><path d="M -20 0 Q -150 -40 -120 -190 Q -100 -250 -30 -230 Q -80 -160 -40 -110 Q -20 -60 -20 0 Z" fill={R2C} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
    <g transform={`rotate(${a} 20 0)`}><path d="M 20 0 Q 150 -40 120 -190 Q 100 -250 30 -230 Q 80 -160 40 -110 Q 20 -60 20 0 Z" fill={R3C} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
    <rect x={-34} y={-10} width={68} height={120} rx={14} fill="#7d6bb0" stroke={KC.ink} strokeWidth={6} />
    {etiquetas && <g style={{ font:`700 30px ${KF.mono}` }}><text x={-150} y={-250} textAnchor="middle" fill={R2C}>T1R2</text><text x={150} y={-250} textAnchor="middle" fill={R3C}>T1R3</text></g>}
  </g>;
}
// Receptor de amargo (una sola pieza).
function ReceptorAmargo({ x, y, s = 1, luz = 0, nombre }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && <circle cx={0} cy={-90} r={130} fill={AMARGO} opacity={0.4 * luz} />}
    <path d="M -30 0 Q -90 -100 -50 -180 L 50 -180 Q 90 -100 30 0 Z" fill={mixHex('#6b8f5a', AMARGO, luz)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -24 -180 Q 0 -140 24 -180" fill={KC.noche} stroke={KC.ink} strokeWidth={6} />
    <rect x={-26} y={-6} width={52} height={110} rx={12} fill="#55704a" stroke={KC.ink} strokeWidth={6} />
    {nombre && <text x={0} y={-215} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={AMARGO}>{nombre}</text>}
  </g>;
}
function Membrana({ T, y }) {
  const d = Array.from({ length: 23 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${i * 50} ${y + Math.sin(T * 1.5 + i * 0.7) * 8}`).join(' ');
  return <g>
    <rect x={0} y={y} width={KW} height={KH - y} fill="#1d2a45" />
    <path d={d} stroke="#ffd36e" strokeWidth={22} fill="none" opacity={0.8} />
    <path d={d} stroke={KC.ink} strokeWidth={4} fill="none" transform="translate(0 -11)" /><path d={d} stroke={KC.ink} strokeWidth={4} fill="none" transform="translate(0 11)" />
  </g>;
}
function Cerebro({ x, y, s = 1, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && <circle r={150} fill={KC.yellow} opacity={0.35 * luz} />}
    <path d="M -110 20 Q -130 -60 -60 -90 Q 0 -130 60 -90 Q 130 -70 120 10 Q 120 70 50 70 L -60 70 Q -120 70 -110 20 Z" fill="#ff9fb5" stroke={KC.ink} strokeWidth={8} />
    <path d="M -60 -50 Q -30 -20 -60 10 M 0 -80 Q 30 -40 0 0 Q -20 30 10 60 M 60 -50 Q 40 -10 70 20" stroke="#d45d7b" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
function Lengua({ x, y, s = 1 }) {
  const R = krng(11);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -260 L 300 -260 Q 320 120 0 330 Q -320 120 -300 -260 Z" fill={LENGUA} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <path d="M 0 -240 L 0 160" stroke="#d9667f" strokeWidth={10} strokeLinecap="round" />
    {Array.from({ length: 46 }, (_, i) => { const px = (R() - 0.5) * 480, py = -220 + R() * 400; return (Math.abs(px) < 300 - (py + 260) * 0.35) ? <circle key={i} cx={px} cy={py} r={9 + R() * 8} fill="#ffb3c3" stroke="#d9667f" strokeWidth={3} /> : null; })}
  </g>;
}
function Matraz({ x, y, s = 1, polvo = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -220 L 40 -220 L 40 -110 L 150 120 Q 160 150 130 150 L -130 150 Q -160 150 -150 120 L -40 -110 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -108 40 L 108 40 L 138 120 Q 144 140 124 140 L -124 140 Q -144 140 -138 120 Z" fill="#cfe9ff" />
    <rect x={-56} y={-240} width={112} height={26} rx={10} fill="#e8e3d8" stroke={KC.ink} strokeWidth={8} />
    {polvo > 0 && [-40, -14, 12, 36].map((dx, i) => <circle key={i} cx={dx} cy={-246} r={10} fill="#fff" stroke="#9aa3b5" strokeWidth={3} opacity={polvo} />)}
  </g>;
}
// Mano esquemática con el índice estirado (apunta hacia arriba). polvo en la punta.
function Dedo({ x, y, s = 1, rot = 0, polvo = 0, brillo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 220 L -80 40 Q -82 0 -50 0 L -36 0 L -36 -170 Q -36 -200 -10 -200 Q 16 -200 16 -170 L 16 -10 Q 60 -20 80 10 L 90 220 Z" fill="#e8b48c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -20 -190 Q -10 -180 0 -190" stroke="#c98d65" strokeWidth={5} fill="none" />
    {polvo > 0 && [-22, -8, 6].map((dx, i) => <circle key={i} cx={dx} cy={-198 + (i % 2) * 6} r={7} fill="#fff" stroke="#9aa3b5" strokeWidth={2} opacity={polvo} />)}
    {brillo > 0 && [0, 1, 2, 3, 4].map((i) => { const a = i * 1.26 + T * 2; return <path key={i} d={`M ${Math.cos(a) * 60 - 10} ${-200 + Math.sin(a) * 60} l 10 -14 l 10 14 l -10 14 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} opacity={brillo} />; })}
  </g>;
}
function Labios({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={120} ry={20 + abre * 40} fill="#5a1520" stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 0 Q -60 -60 0 -36 Q 60 -60 130 0 Q 60 -14 0 -6 Q -60 -14 -130 0 Z" fill="#e0465f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform={`translate(0 ${-abre * 30})`} />
    <path d="M -130 0 Q 0 70 130 0 Q 0 30 -130 0 Z" fill="#e0465f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform={`translate(0 ${abre * 30})`} />
  </g>;
}
function Papel({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-140} width={220} height={280} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={-80} x2={i % 2 ? 40 : 80} y1={-100 + i * 40} y2={-100 + i * 40} stroke="#9aa3b5" strokeWidth={6} />)}
  </g>;
}
function Telefono({ x, y, s = 1, T = 0, suena = 0 }) {
  const w = suena ? Math.sin(T * 40) * 5 * suena : 0;
  return <g transform={`translate(${x + w} ${y}) scale(${s})`}>
    <path d="M -150 60 Q -150 -30 -90 -30 L 90 -30 Q 150 -30 150 60 L 150 110 L -150 110 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={0} cy={50} r={46} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 5 - 2.2; return <circle key={i} cx={Math.cos(a) * 30} cy={50 + Math.sin(a) * 30} r={6} fill={KC.ink} />; })}
    <g transform={`translate(0 ${-70 - Math.abs(w) * 3})`}><path d="M -170 0 Q -170 -50 -110 -50 L 110 -50 Q 170 -50 170 0 L 120 20 L 90 -10 L -90 -10 L -120 20 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" /></g>
  </g>;
}
function Frasquito({ x, y, s = 1, etiqueta = '' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-140} width={120} height={160} rx={18} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-52} y={-60} width={104} height={74} rx={10} fill="#fff" />
    <rect x={-46} y={-172} width={92} height={36} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    {etiqueta && <text x={0} y={-16} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Francia esquemática (hexágono) con pin en Lyon.
function Francia({ x, y, s = 1, pin = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -250 L 140 -170 L 230 -120 L 190 40 L 230 170 L 110 250 L -60 240 L -200 190 L -180 50 L -260 -40 L -170 -90 L -120 -200 Z" fill="#7fb0ff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <text x={-40} y={-20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={0.6}>FRANCIA</text>
    {pin > 0 && <g transform={`translate(110 ${60 - (1 - pin) * 120 + Math.sin(T * 4) * 4})`} opacity={pin}>
      <path d="M 0 0 Q -40 -50 -40 -80 A 40 40 0 1 1 40 -80 Q 40 -50 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-80} r={14} fill="#fff" />
      <text x={60} y={-60} style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>Lyon</text></g>}
  </g>;
}
// Escalera de los 4 grupos de la IARC (1 arriba … 3 abajo).
function EscaleraIARC({ x, y, f = 1, sello = 0 }) {
  const g = ['1', '2A', '2B', '3'];
  return <g transform={`translate(${x} ${y})`}>
    {g.map((t, i) => { const h = 300 - i * 70, on = kclamp(f * 4 - i, 0, 1); return <g key={t} opacity={on}>
      <rect x={i * 200} y={-h} width={190} height={h} fill={i === 2 ? KC.orange : '#f6f3ec'} stroke={KC.ink} strokeWidth={8} />
      <text x={i * 200 + 95} y={-h + 70} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{t}</text></g>; })}
    {sello > 0 && <g transform={`translate(${2 * 200 + 95} ${-160 - 90}) rotate(-12) scale(${klerp(1.8, 1, sello)})`} opacity={sello}>
      <circle r={78} fill="none" stroke={KC.red} strokeWidth={10} /><text y={20} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.red}>2B</text></g>}
  </g>;
}
function Lata({ x, y, s = 1, o = 1, n }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-70} width={80} height={140} rx={12} fill="#cfd6e3" stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-30} width={80} height={50} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={-70} rx={40} ry={10} fill="#e9edf4" stroke={KC.ink} strokeWidth={5} />
    {n && <text x={0} y={10} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>{n}</text>}
  </g>;
}
function Silueta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={60} fill={KC.violet} stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 0 L -100 -190 Q -95 -230 -50 -230 L 50 -230 Q 95 -230 100 -190 L 110 0 Z" fill={KC.violet} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <text x={0} y={-90} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.texto}>70 kg</text>
  </g>;
}
function Hoja({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 60 Q -60 0 0 -70 Q 60 0 0 60 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 60 L 0 -60" stroke="#1f7a2a" strokeWidth={4} />
  </g>;
}
function Medida({ texto, x = 70, y = 1700 }) {
  return <g><line x1={x} y1={y} x2={x + 140} y2={y} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
    <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={KC.texto} strokeWidth={6} /><line x1={x + 140} y1={y - 14} x2={x + 140} y2={y + 14} stroke={KC.texto} strokeWidth={6} />
    <text x={x + 160} y={y + 14} style={{ font:`700 36px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{texto}</text></g>;
}

function Edulcorantes() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Familia, Re: CUES.Receptor, Ll: CUES.Llave, Po: CUES.Poquito, Pr: CUES.Pregunta, Sc: CUES.Schlatter, Lo: CUES.Londres, Es: CUES.Estudio, Li: CUES.Limite, Am: CUES.Amargo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el granito cae desde el cuadro 0
  const cae = kprog(T, K.G, K.G + 0.55, (p) => p * p);
  const plop = kprog(T, K.G + 0.55, K.G + 2.4);
  const lluvia = kprog(T, K.G + 1.0, K.G + 4.2, kEase.suave);
  // receptor: de la lengua a la célula
  const micro = kprog(T, K.Re + 1.5, K.Re + 2.3, kEase.suave);
  const zLen = 1 + 2.2 * kprog(T, K.Re + 0.2, K.Re + 2.0, kEase.suave);
  // llave
  const mA = kprog(T, K.Ll + 0.1, K.Ll + 0.9, kEase.sale), mB = kprog(T, K.Ll + 1.9, K.Ll + 2.6, kEase.sale);
  const cierraA = kprog(T, K.Ll + 0.8, K.Ll + 1.1) * (1 - kprog(T, K.Ll + 1.5, K.Ll + 1.8));
  const cierraB = kprog(T, K.Ll + 2.5, K.Ll + 2.8);
  const senal = (t0) => kprog(T, t0, t0 + 0.6);
  // poquito
  const cucharas = kprog(T, K.Po + 0.4, K.Po + 1.6), pizca = kprog(T, K.Po + 1.8, K.Po + 2.4);
  const dulzor = kprog(T, K.Po + 2.4, K.Po + 3.8, kEase.sale);
  // schlatter
  const toca = kprog(T, K.Sc + 2.3, K.Sc + 2.9, kEase.suave), sube = kprog(T, K.Sc + 3.6, K.Sc + 4.4, kEase.suave);
  // londres
  const morf = kprog(T, K.Lo + 3.0, K.Lo + 3.6, kEase.suave);
  // amargo
  const sv = kprog(T, K.Am + 0.2, K.Am + 1.0, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: un granito en el café contra un montón de azúcar */}
      <Escena T={T} a={K.G} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g transform={`translate(330 ${klerp(480, 560, kprog(T, K.G, K.G + 0.3))}) rotate(${klerp(0, 35, kprog(T, K.G, K.G + 0.3))})`}>
            <rect x={-150} y={-10} width={150} height={20} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} /><ellipse cx={20} cy={0} rx={40} ry={24} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} /></g>
          {cae < 1 && <Granito x={350} y={klerp(570, 870, cae)} s={1.6} rot={cae * 200} />}
          <Taza x={330} y={1040} s={1.05} ondas={plop > 0 && plop < 1 ? plop * 2 : 0} />
          {cae >= 1 && <Granito x={330} y={884} s={1.2} o={1 - kprog(T, K.G + 1.2, K.G + 2.2) * 0.4} />}
          <Monton x={790} y={1190} f={lluvia} n={140} ancho={330} alto={250} />
          {lluvia > 0 && lluvia < 1 && Array.from({ length: 8 }, (_, i) => <Granito key={i} x={680 + i * 30} y={760 + ((T * 900 + i * 97) % 300)} s={0.55} rot={T * 300 + i * 40} />)}
        </SvgCapa>
        <div style={{ position:'absolute', left:740, top:1470, transform:'translate(-50%,-50%)', font:`400 72px ${KF.titulo}`, color:KC.ink, whiteSpace:'nowrap', opacity:kprog(T, K.G + 1.0, K.G + 1.2) }}>≈{Math.round(600 * lluvia)} <span style={{ font:`900 34px ${KF.texto}` }}>granitos de azúcar</span></div>
      </Escena>
      {/* 1 · familia: cuántas veces más dulces */}
      <Escena T={T} a={K.F} b={K.Re}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {[['sucralosa', 600, 0, '≈600×', '#ffffff'], ['aspartamo', 200, 0.5, '≈200×', '#ffffff'], ['stevia', 400, 1.0, '200–400×', '#f1fff0']].map(([n, v, d, t, c], i) => {
            const y = 760 + i * 170, p = kprog(T, K.F + 0.2 + d, K.F + 1.0 + d, kEase.sale), ancho = v * 1.05 * p;
            return <g key={n} opacity={kprog(T, K.F + d, K.F + d + 0.2)}>
              <Granito x={90} y={y} s={1.3} color={c} />
              {n === 'stevia' && <Hoja x={90} y={y - 70} s={0.6} rot={-20} />}
              <text x={150} y={y - 40} style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>{n}</text>
              {n === 'stevia' ? <g><rect x={150} y={y - 20} width={200 * 1.05 * p} height={70} rx={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
                <rect x={150 + 210 * p} y={y - 20} width={200 * 1.05 * p} height={70} rx={14} fill={KC.leaf} opacity={0.45} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" /></g>
                : <rect x={150} y={y - 20} width={ancho} height={70} rx={14} fill={i === 0 ? KC.pink : KC.orange} stroke={KC.ink} strokeWidth={6} />}
              <text x={170 + ancho} y={y + 36} style={{ font:`400 62px ${KF.titulo}` }} fill={KC.ink} opacity={p}>{t}</text>
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 2 · de la lengua a la célula: el receptor */}
      <Escena T={T} a={K.Re} b={K.Ll} zoom={0}>
        <FondoLunares color={KC.pink} />
        <div style={{ position:'absolute', inset:0, opacity:1 - micro }}>
          <SvgCapa><g transform={`translate(540 960) scale(${zLen}) translate(-540 -960)`}><Lengua x={540} y={960} s={1.2} />
            <circle cx={600} cy={880} r={34} fill="none" stroke={KC.yellow} strokeWidth={6 / zLen} /></g>
            <Medida texto="1 cm" /></SvgCapa>
        </div>
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:micro }}>
          <SvgCapa><Membrana T={T} y={1060} /><Receptor x={540} y={1050} s={1.2} cierra={0} luz={0} /></SvgCapa>
        </div>
      </Escena>
      {/* 3 · la llave: azúcar y sucralosa encienden el receptor */}
      <Escena T={T} a={K.Ll} b={K.Po} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Membrana T={T} y={1060} />
          <Receptor x={540} y={1050} s={1.2} cierra={Math.max(cierraA, cierraB)} luz={Math.max(cierraA, cierraB)} />
          {mA > 0 && T < K.Ll + 1.8 && <MolHex x={klerp(140, 540, mA)} y={klerp(620, 890, mA)} s={0.9} rot={(1 - mA) * 90} o={1 - kprog(T, K.Ll + 1.5, K.Ll + 1.8)} />}
          {mB > 0 && <MolHex x={klerp(960, 540, mB)} y={klerp(620, 890, mB)} s={0.9} rot={(1 - mB) * -90} cloros={3} color="#fff7d6" />}
          <path d="M 540 1150 Q 820 1000 860 640" stroke={KC.yellow} strokeWidth={6} fill="none" strokeDasharray="12 14" opacity={0.6} />
          {[K.Ll + 1.0, K.Ll + 2.7].map((t0, i) => { const p = senal(t0); return p > 0 && p < 1 ? <circle key={i} cx={klerp(540, 860, p)} cy={klerp(1010, 640, p)} r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /> : null; })}
          <Cerebro x={860} y={560} s={0.9} luz={Math.max(kprog(T, K.Ll + 1.6, K.Ll + 1.8) * (1 - kprog(T, K.Ll + 1.9, K.Ll + 2.3)), kprog(T, K.Ll + 3.3, K.Ll + 3.5))} />
        </SvgCapa>
      </Escena>
      {/* 4 · con mucho menos: 8 g contra unos 40 mg */}
      <Escena T={T} a={K.Po} b={K.Pr}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Taza x={280} y={990} s={0.75} /><Taza x={780} y={990} s={0.75} />
          <Monton x={280} y={872} f={cucharas} n={70} ancho={180} alto={110} s={0.5} seed={9} />
          {pizca > 0 && <g opacity={pizca}><Granito x={780} y={870} s={0.45} /><Granito x={790} y={873} s={0.35} />
            <circle cx={780} cy={862} r={70} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={10} /><line x1={830} y1={912} x2={900} y2={982} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" /></g>}
          <text x={280} y={1195} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink} opacity={cucharas}>8 g de azúcar</text>
          <text x={780} y={1195} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink} opacity={pizca}>≈ 40 mg</text>
          {[280, 780].map((x, i) => <g key={i} opacity={kprog(T, K.Po + 2.2, K.Po + 2.5)}>
            <rect x={x - 150} y={720} width={300} height={44} rx={22} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
            <rect x={x - 147} y={723} width={294 * dulzor} height={38} rx={19} fill={KC.pink} />
            <text x={x} y={706} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>dulzor</text></g>)}
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Sc} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 6 · 1965: el dedo de Schlatter */}
      <Escena T={T} a={K.Sc} b={K.Lo}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={0} y={1180} width={KW} height={60} fill="#c99a6b" stroke={KC.ink} strokeWidth={8} />
          <Matraz x={300} y={1030} s={0.9} polvo={1 - toca * 0.6} />
          <Papel x={760} y={1080} s={0.7} rot={8} />
          <Labios x={760} y={700} s={0.9} abre={kprog(T, K.Sc + 3.6, K.Sc + 4.0) * (1 - kprog(T, K.Sc + 4.4, K.Sc + 4.8)) * 0.6} />
          <Dedo T={T} x={klerp(klerp(560, 300, toca), 760, sube)} y={klerp(klerp(1950, 1010, kprog(T, K.Sc + 1.6, K.Sc + 2.9, kEase.suave)), 980, sube)} s={0.9} rot={klerp(0, -10, toca)} polvo={toca} brillo={kprog(T, K.Sc + 4.5, K.Sc + 4.9)} />
        </SvgCapa>
      </Escena>
      {/* 7 · Londres, años 70: "test" → "taste" */}
      <Escena T={T} a={K.Lo} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Telefono x={260} y={1060} s={0.9} T={T} suena={kprog(T, K.Lo + 1.6, K.Lo + 1.8) * (1 - kprog(T, K.Lo + 2.8, K.Lo + 3.0))} />
          <g opacity={kprog(T, K.Lo + 2.2, K.Lo + 2.5)}>
            <path d="M 420 780 Q 420 680 560 680 L 900 680 Q 1000 680 1000 780 Q 1000 880 900 880 L 540 880 L 430 960 L 470 870 Q 420 850 420 780 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <text x={710} y={800} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.blue} opacity={1 - morf}>"TEST" = analizar</text>
            <text x={710} y={800} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.red} opacity={morf}>"TASTE" = probar</text>
          </g>
          <Frasquito x={720} y={1170} s={1} etiqueta="Cl" />
          {T > K.Lo + 4.0 && <g opacity={kprog(T, K.Lo + 4.0, K.Lo + 4.3)}><Labios x={720} y={1000} s={0.55} abre={0.4 + Math.sin(T * 8) * 0.1} /></g>}
        </SvgCapa>
      </Escena>
      {/* 8 · 2023, Lyon: la agencia de cáncer de la OMS */}
      <Escena T={T} a={K.Es} b={K.Li}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {T < K.Es + 3.6 ? <Francia x={540} y={960} s={1.1} pin={kprog(T, K.Es + 0.6, K.Es + 1.1, kEase.rebote)} T={T} />
            : <EscaleraIARC x={150} y={1180} f={kprog(T, K.Es + 3.6, K.Es + 4.6)} sello={kprog(T, K.Es + 4.9, K.Es + 5.3, kEase.sale)} />}
        </SvgCapa>
      </Escena>
      {/* 9 · el límite de JECFA: más de 9 latas */}
      <Escena T={T} a={K.Li} b={K.Am}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Silueta x={200} y={1190} s={1.1} />
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Li + 1.8 + i * 0.33; const c = i % 3, r = Math.floor(i / 3);
            return <Lata key={i} x={480 + c * 130} y={klerp(700, 1110 - r * 160, kprog(T, t0, t0 + 0.3, kEase.sale))} s={1} o={kprog(T, t0, t0 + 0.1)} n={i + 1} />; })}
          <text x={940} y={940} style={{ font:`400 140px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Li + 5.0, K.Li + 5.3)}>+</text>
          <line x1={400} y1={700} x2={1040} y2={700} stroke={KC.red} strokeWidth={8} strokeDasharray="22 14" opacity={kprog(T, K.Li + 4.8, K.Li + 5.2)} />
          <text x={1040} y={680} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.red} opacity={kprog(T, K.Li + 4.8, K.Li + 5.2)}>límite diario</text>
        </SvgCapa>
      </Escena>
      {/* 10 · 2012: la stevia también enciende receptores de amargo */}
      <Escena T={T} a={K.Am} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Membrana T={T} y={1060} />
          <ReceptorAmargo x={180} y={1050} s={1} luz={kprog(T, K.Am + 1.4, K.Am + 1.8)} nombre="TAS2R4" />
          <Receptor x={540} y={1050} s={0.95} cierra={kprog(T, K.Am + 0.9, K.Am + 1.1)} luz={kprog(T, K.Am + 0.9, K.Am + 1.2)} />
          <ReceptorAmargo x={900} y={1050} s={1} luz={kprog(T, K.Am + 1.7, K.Am + 2.1)} nombre="TAS2R14" />
          <g transform={`translate(${klerp(540, 540, sv)} ${klerp(520, 800, sv)})`}><MolHex x={0} y={0} s={0.8} color="#eaffea" anillos={1} /><Hoja x={0} y={-70} s={0.5} /></g>
          {[180, 900].map((x, i) => { const p = kprog(T, K.Am + 1.2 + i * 0.3, K.Am + 1.6 + i * 0.3); return p > 0 && p < 1 ? <circle key={i} cx={klerp(540, x, p)} cy={klerp(800, 880, p)} r={16} fill={AMARGO} stroke={KC.ink} strokeWidth={4} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 11 · cierre: la taza del inicio, ya explicada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Taza x={330} y={1040} s={1.05} ondas={(T * 0.6) % 1} />
          <Granito x={330} y={884} s={1.2} />
          <g transform={`translate(790 1080) scale(0.6)`} opacity={kprog(T, K.Ci + 0.4, K.Ci + 0.9)}><Receptor x={0} y={0} s={1} cierra={kprog(T, K.Ci + 1.2, K.Ci + 1.5)} luz={kprog(T, K.Ci + 1.2, K.Ci + 1.6)} etiquetas={false} /></g>
          <path d="M 400 870 Q 600 760 740 900" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="16 12" opacity={kprog(T, K.Ci + 0.8, K.Ci + 1.2)} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.6} until={K.G + 4.6} texto="¿azúcar?" x={300} y={470} tam={52} />
      <Etq T={T} at={K.G + 1.0} until={K.F - 0.2} x={120} y={760} texto="1 granito de sucralosa" tam={32} color={KC.ink} />
      <Chip T={T} at={K.F + 0.3} until={K.Re - 0.2} texto="veces más dulce que el azúcar" y={1500} tam={40} borde={KC.pink} />
      <Etq T={T} at={K.Re + 0.3} until={K.Re + 1.4} x={660} y={760} texto="papila" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Re + 2.0} until={K.Ll - 0.2} texto="receptor dulce: 2 piezas" y={1500} tam={42} borde={R3C} />
      <Chip T={T} at={K.Ll + 0.3} until={K.Ll + 1.8} texto="azúcar → ¡clic!" y={1500} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.Ll + 2.0} until={K.Po - 0.2} texto="sucralosa (3 cloros) → ¡clic!" y={1500} tam={40} borde={CL} />
      <Etq T={T} at={K.Ll + 1.6} until={K.Po - 0.2} x={760} y={430} texto="¡DULCE!" lado="izq" tam={40} color={KC.yellow} />
      <Chip T={T} at={K.Po + 2.6} until={K.Pr - 0.2} texto="mismo dulzor · cuenta con datos de la FDA" y={1500} tam={32} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.Sc + 0.5} until={K.Sc + 2.2} anio="1965" quien="James Schlatter" revista="buscaba un remedio para la úlcera" y={640} />
      <Onomato T={T} at={K.Sc + 4.7} until={K.Lo - 0.2} x={540} y={520} texto="¡DULCE!" color={KC.yellow} tam={110} />
      <Chip T={T} at={K.Sc + 2.6} until={K.Lo - 0.2} texto="de chiripa: polvo en el dedo" y={1500} tam={40} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Lo + 0.2} until={K.Lo + 2.0} anio="años 70" quien="Londres · un estudiante" revista="Queen Elizabeth College" y={640} />
      <Onomato T={T} at={K.Lo + 1.6} until={K.Lo + 2.9} x={300} y={830} texto="¡RING!" color={KC.yellow} tam={90} />
      <Etq T={T} at={K.Lo + 3.4} until={K.Lo + 5.0} x={520} y={930} texto="azúcares con cloro" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Lo + 5.0} until={K.Es - 0.2} texto="así nació la sucralosa" y={1500} tam={46} borde={CL} />
      <TarjetaEstudio T={T} at={K.Es + 1.2} until={K.Es + 3.4} anio="2023" quien="IARC · agencia de cáncer de la OMS" revista="25 expertos de 12 países · Lyon" y={560} />
      <Chip T={T} at={K.Es + 4.0} until={K.Li - 0.2} texto="aspartamo: Grupo 2B" y={780} tam={46} borde={KC.red} />
      <Chip T={T} at={K.Es + 5.3} until={K.Li - 0.2} texto="posiblemente cancerígeno · evidencia limitada" y={1500} tam={30} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Li + 0.2} until={K.Li + 1.7} anio="40 mg" quien="por kilo al día · sin cambios" revista="JECFA (FAO/OMS) · Ginebra 2023" y={600} />
      <Chip T={T} at={K.Li + 2.0} until={K.Am - 0.2} texto="más de 9 latas light al día (OMS)" y={1500} tam={36} borde={KC.cyan} />
      <TarjetaEstudio T={T} at={K.Am + 2.2} until={K.Ci - 0.3} anio="2012" quien="Alemania" revista="Hellfritsch et al. · J Agric Food Chem" x={650} y={520} />
      <Chip T={T} at={K.Am + 1.4} until={K.Ci - 0.2} texto="stevia: dulce + 2 receptores de amargo" y={1500} tam={34} borde={AMARGO} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="sucralosa = llave del receptor dulce" y={1500} tam={36} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="No es azúcar: *es sucralosa.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Re - 0.1} texto="Aspartamo *≈200 veces.*" />
      <Subtitulo T={T} idx={2} at={K.Re + 0.1} until={K.Ll - 0.1} texto="Un receptor *de dos piezas.*" />
      <Subtitulo T={T} idx={3} at={K.Ll + 0.1} until={K.Po - 0.1} texto="Lo encienden: *dulce.*" />
      <Subtitulo T={T} idx={4} at={K.Po + 0.1} until={K.Pr - 0.1} texto="8 g = *unos 40 mg.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Sc - 0.1} texto="¿Cómo *se descubrieron?*" />
      <Subtitulo T={T} idx={6} at={K.Sc + 0.1} until={K.Lo - 0.1} texto="Se lamió *el dedo.*" />
      <Subtitulo T={T} idx={7} at={K.Lo + 0.1} until={K.Es - 0.1} texto="Probar, *no analizar.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Li - 0.1} texto="Evidencia *limitada.*" />
      <Subtitulo T={T} idx={9} at={K.Li + 0.1} until={K.Am - 0.1} texto="Más de *9 latas al día.*" />
      <Subtitulo T={T} idx={10} at={K.Am + 0.1} until={K.Ci - 0.1} texto="Stevia: *también amarga.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una llave *que engaña.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Familia + 0.3, CUES.Receptor - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Llave + 0.3, CUES.Poquito - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Poquito + 1.2, CUES.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Schlatter + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Schlatter + 3.0, CUES.Londres - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Londres + 2.2, CUES.Estudio - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Limite - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Limite + 1.8, CUES.Amargo - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Amargo + 0.4, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="50" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EdulcorantesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Edulcorantes /></CompositionStage></div>;
}
window.EdulcorantesApp = EdulcorantesApp;
