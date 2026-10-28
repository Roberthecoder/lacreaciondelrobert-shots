// Shot Fungi Mati #01 · Especial Día de Muertos: los hongos que regresan los árboles a la tierra (podredumbre blanca) — NARRADO, formato N1 "Por dentro".
// Guion, fuentes y verificación: guion.md y verificacion.md. El dibujo es esquemático (células y hifas no están a escala exacta entre sí).
const MADERA = { ambar: '#c98a2b', celulosa: '#f3e6c8', lumen: '#2a1d12', blanca: '#efeadb', corteza: '#6b4423', cortezaOsc: '#4a2e17' };
const PXMM_MACRO = 1;      // macro: 1 px = 1 mm (el tronco mide ~30 cm de grueso)
const PXMM_MICRO = 5000;   // micro: una célula de 150 px ≈ 30 µm

const svgF = (c, extra) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, ...extra }}>{c}</svg>;

// Flor de cempasúchil (vista de frente): capas de pétalos naranjas.
function Cempasuchil({ x, y, s = 1, T = 0, seed = 1 }) {
  const giro = mece(T, seed, 0.3) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${giro}) scale(${s})`}>
    {[0, 1, 2].map((k) => { const n = 14 - k * 3, r = 52 - k * 15;
      return Array.from({ length: n }, (_, i) => { const a = (i / n) * 360 + k * 13;
        return <ellipse key={k + '-' + i} cx={0} cy={-r * 0.6} rx={r * 0.32} ry={r * 0.55} transform={`rotate(${a})`} fill={k === 1 ? '#ff9a1f' : k === 2 ? '#ffb321' : '#f07a12'} stroke={KC.ink} strokeWidth={3} />; }); })}
    <circle r={10} fill="#e0620c" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Veladora con flama que tiembla.
function Vela({ x, y, s = 1, T = 0 }) {
  const f = 1 + Math.sin(T * 17) * 0.08 + Math.sin(T * 29) * 0.05;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-150} rx={60} ry={80} fill={KC.yellow} opacity={0.18 + 0.06 * Math.sin(T * 9)} />
    <rect x={-34} y={-110} width={68} height={110} rx={8} fill="#fff6e0" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-60} width={68} height={22} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
    <line x1={0} y1={-110} x2={0} y2={-124} stroke={KC.ink} strokeWidth={4} />
    <path d={`M 0 ${-124 - 46 * f} Q 18 -140 0 -122 Q -18 -140 0 ${-124 - 46 * f} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={3} />
    <path d={`M 0 ${-128 - 24 * f} Q 8 -136 0 -126 Q -8 -136 0 ${-128 - 24 * f} Z`} fill={KC.yellow} />
  </g>;
}
// Manchas blancas del hongo sobre la corteza (micelio que asoma). crece 0..1
function Manchas({ crece = 1, T = 0, seed = 7, ancho = 760, alto = 200 }) {
  const g = krng(seed);
  const m = Array.from({ length: 11 }, () => ({ x: g() * ancho, y: g() * alto, r: 22 + g() * 46, d: g() * 0.6 }));
  return <g>{m.map((p, i) => { const k = kclamp((crece - p.d) / 0.4, 0, 1); if (k <= 0) return null;
    return <g key={i} opacity={0.92}>
      <ellipse cx={p.x} cy={p.y} rx={p.r * k * 1.3} ry={p.r * k * 0.8} fill="#fbfaf3" stroke="#d9d4c3" strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((j) => <path key={j} d={`M ${p.x} ${p.y} q ${Math.cos(j * 1.3 + i) * 40 * k} ${Math.sin(j * 1.7) * 20 * k} ${Math.cos(j * 1.3 + i) * 70 * k} ${Math.sin(j * 1.3 + i) * 30 * k}`} stroke="#fbfaf3" strokeWidth={3} fill="none" opacity={0.8} />)}
    </g>; })}</g>;
}
// Tronco caído (de lado) con el corte a la derecha. hongo 0..1 (manchas), blanco 0..1 (el corte se blanquea), deshace 0..1 (se vuelve tierra)
function Tronco({ T, x = 120, y = 860, hongo = 0, blanco = 0, deshace = 0 }) {
  const L = 760, H = 300, a = 1 - deshace;
  return <g transform={`translate(${x} ${y})`}>
    <g opacity={a} transform={`translate(0 ${deshace * 120}) scale(1 ${1 - deshace * 0.6})`}>
      <rect x={0} y={0} width={L} height={H} rx={40} fill={MADERA.corteza} stroke={KC.ink} strokeWidth={9} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${40 + i * 80} 18 q 18 ${H / 2} -6 ${H - 36}`} stroke={MADERA.cortezaOsc} strokeWidth={8} fill="none" strokeLinecap="round" />)}
      <g transform="translate(10 50)"><Manchas crece={hongo} T={T} ancho={L - 120} alto={H - 100} /></g>
      <ellipse cx={L} cy={H / 2} rx={70} ry={H / 2} fill={mixHex('#e2b673', MADERA.blanca, blanco)} stroke={KC.ink} strokeWidth={9} />
      {[0.8, 0.6, 0.4, 0.2].map((k, i) => <ellipse key={i} cx={L} cy={H / 2} rx={70 * k} ry={(H / 2) * k} fill="none" stroke={mixHex('#a8742f', '#d9d2bd', blanco)} strokeWidth={4} />)}
    </g>
  </g>;
}
// Bosque de fondo (macro): cielo, árboles lejanos, suelo con hojarasca.
function Bosque({ T, color = KC.mint }) {
  return <>
    <FondoLunares color={color} />
    {svgF(<>
      {[60, 260, 480, 720, 930].map((x, i) => <g key={i} transform={`translate(${x} ${560 + (i % 2) * 40})`} opacity={0.55}>
        <rect x={-18} y={0} width={36} height={420} fill="#1d7a55" />
        <circle cx={0} cy={-30} r={120 + (i % 3) * 20} fill="#24a06c" />
      </g>)}
      <path d="M 0 920 Q 540 860 1080 920 L 1080 1920 L 0 1920 Z" fill="#7a5a32" stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 26 }, (_, i) => { const g = krng(30 + i); return <ellipse key={i} cx={g() * 1080} cy={950 + g() * 140} rx={16} ry={7} transform={`rotate(${g() * 180} ${g() * 1080} ${950 + g() * 140})`} fill={i % 3 ? '#b8782e' : '#d9a03f'} />; })}
    </>)}
  </>;
}

// ---------- MUNDO MICRO: la madera en corte (células de fibra) ----------
const CEL = { x0: 90, y0: 420, n: 6, m: 5, t: 150 };
const celdaC = (c, r) => [CEL.x0 + c * CEL.t + CEL.t / 2, CEL.y0 + r * CEL.t + CEL.t / 2];
// hifas: caminos de centro de célula a centro de célula, cruzando por los poros
const HIFAS = [
  { pts: [[-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]], b: 0 },
  { pts: [[1, 2], [1, 1], [2, 1], [3, 1], [3, 0], [4, 0]], b: 0.25 },
  { pts: [[2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [5, 4]], b: 0.35 },
  { pts: [[4, 2], [4, 1], [5, 1], [5, 0]], b: 0.55 },
  { pts: [[0, 2], [0, 3], [0, 4], [1, 4]], b: 0.45 },
  { pts: [[3, 1], [2, 1], [2, 0], [1, 0]], b: 0.6 },
];
function caminoHifa(pts, seed) {
  const g = krng(seed); let d = '';
  pts.forEach(([c, r], i) => { const [x, y] = celdaC(c, r); const j = i ? (g() - 0.5) * 34 : 0;
    if (!i) d = `M ${x} ${y + j}`; else { const [px, py] = celdaC(pts[i - 1][0], pts[i - 1][1]); d += ` Q ${(x + px) / 2 + (g() - 0.5) * 20} ${(y + py) / 2 + (g() - 0.5) * 20} ${x} ${y + j}`; } });
  return d;
}
function MundoMadera({ T, lignina = 1, hifas = 0, tijeras = [], blanco = 0 }) {
  const { x0, y0, n, m, t } = CEL;
  const amb = mixHex(MADERA.ambar, MADERA.blanca, 1 - lignina);
  const pared = mixHex(MADERA.celulosa, '#fbf8f0', blanco);
  const celdas = [];
  for (let c = 0; c < n; c++) for (let r = 0; r < m; r++) {
    const [cx, cy] = celdaC(c, r), w = t - 14 + Math.sin(c * 3 + r) * 6, h = t - 14 + Math.cos(c + r * 2) * 6;
    celdas.push(<g key={c + '-' + r}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={34} fill={pared} stroke={KC.ink} strokeWidth={3} />
      <rect x={cx - w / 2 + 22} y={cy - h / 2 + 22} width={w - 44} height={h - 44} rx={22} fill={MADERA.lumen} />
    </g>);
  }
  // poros entre células vecinas (pares de poros): canalitos oscuros que cruzan la pared
  const poros = [];
  for (let c = 0; c < n; c++) for (let r = 0; r < m; r++) {
    const [cx, cy] = celdaC(c, r);
    if (c < n - 1) poros.push(<rect key={'h' + c + r} x={cx + t / 2 - 34} y={cy - 9} width={68} height={18} rx={9} fill={MADERA.lumen} />);
    if (r < m - 1) poros.push(<rect key={'v' + c + r} x={cx - 9} y={cy + t / 2 - 34} width={18} height={68} rx={9} fill={MADERA.lumen} />);
  }
  return svgF(<>
    <rect x={x0 - 30} y={y0 - 30} width={n * t + 60} height={m * t + 60} rx={30} fill={amb} stroke={KC.ink} strokeWidth={6} />
    {celdas}{poros}
    {HIFAS.map((h, i) => { const k = kclamp((hifas - h.b) / 0.45, 0, 1); if (k <= 0) return null;
      const d = caminoHifa(h.pts, 11 + i);
      return <g key={i}>
        <path d={d} pathLength={1} strokeDasharray={`${k} 1`} stroke={KC.ink} strokeWidth={15} fill="none" strokeLinecap="round" />
        <path d={d} pathLength={1} strokeDasharray={`${k} 1`} stroke="#f7f5ec" strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>; })}
    {tijeras.map((tj, i) => <Tijera key={i} T={T} {...tj} />)}
  </>);
}
// Enzima dibujada como tijerita que corta (esquemático).
function Tijera({ T, x, y, at, s = 1 }) {
  const e = kprog(T, at, at + 0.3, kEase.rebote); if (e <= 0) return null;
  const ab = 18 + Math.sin((T - at) * 16) * 16;
  return <g transform={`translate(${x} ${y}) scale(${s * e})`}>
    <g transform={`rotate(${-ab / 2})`}><path d="M 0 0 L 70 -8 L 70 6 Z" fill="#cfd6e2" stroke={KC.ink} strokeWidth={4} /><circle cx={-18} cy={-10} r={14} fill="none" stroke={KC.pink} strokeWidth={8} /></g>
    <g transform={`rotate(${ab / 2})`}><path d="M 0 0 L 70 8 L 70 -6 Z" fill="#cfd6e2" stroke={KC.ink} strokeWidth={4} /><circle cx={-18} cy={10} r={14} fill="none" stroke={KC.pink} strokeWidth={8} /></g>
    <circle r={5} fill={KC.ink} />
    {[0, 1, 2].map((k) => { const u = ((T - at) * 1.4 + k / 3) % 1; return <rect key={k} x={60 + u * 60} y={-30 + k * 22 + u * 20} width={12} height={8} fill={MADERA.ambar} stroke={KC.ink} strokeWidth={2} opacity={1 - u} transform={`rotate(${u * 200})`} />; })}
  </g>;
}

// Licopsida del Carbonífero (tronco alto con corteza de rombos y copa en horquillas). cae 0..1
function Licopsida({ x, y, h = 700, cae = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${cae * 82})`}>
    <rect x={-26} y={-h} width={52} height={h} fill="#5c7a3a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: Math.floor(h / 40) }, (_, i) => <path key={i} d={`M -26 ${-i * 40 - 20} L 0 ${-i * 40 - 36} L 26 ${-i * 40 - 20} L 0 ${-i * 40 - 4} Z`} fill="none" stroke="#344a1f" strokeWidth={3} />)}
    {[-1, 1].map((sx) => <path key={sx} d={`M 0 ${-h} q ${sx * 60} -40 ${sx * 90} -120 M ${sx * 50} ${-h - 70} q ${sx * 40} -10 ${sx * 70} -60`} stroke="#5c7a3a" strokeWidth={22} fill="none" strokeLinecap="round" />)}
    {[-1, 1].map((sx) => <circle key={'c' + sx} cx={sx * 92} cy={-h - 128} r={36 + Math.sin(T * 2) * 2} fill="#3fa34a" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Helecho arborescente.
function Helecho({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-12} y={-260} width={24} height={260} fill="#6b5a2c" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => { const a = -150 + i * 20 + mece(T, i, 0.4) * 5;
      return <path key={i} d={`M 0 -260 q ${Math.cos(a * Math.PI / 180) * 90} ${Math.sin(a * Math.PI / 180) * 90 - 40} ${Math.cos(a * Math.PI / 180) * 190} ${Math.sin(a * Math.PI / 180) * 190}`} stroke="#2f9a46" strokeWidth={18} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Brote nuevo que crece de la tierra. k 0..1
function Brote({ x, y, k = 1, T = 0 }) {
  if (k <= 0) return null; const h = 170 * k, m = mece(T, 3, 0.5) * 6;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 q ${m} ${-h / 2} 0 ${-h}`} stroke="#2a8f3a" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={-38 * k} cy={-h + 20} rx={42 * k} ry={20 * k} transform={`rotate(-25 ${-38 * k} ${-h + 20})`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={38 * k} cy={-h + 10} rx={42 * k} ry={20 * k} transform={`rotate(25 ${38 * k} ${-h + 10})`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Flecha({ x1, y1, x2, y2, k = 1, color = KC.ink }) {
  if (k <= 0) return null; const x = klerp(x1, x2, k), y = klerp(y1, y2, k), a = Math.atan2(y2 - y1, x2 - x1);
  return <g><line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={12} strokeLinecap="round" />
    <path d={`M ${x} ${y} l ${-Math.cos(a - 0.5) * 34} ${-Math.sin(a - 0.5) * 34} M ${x} ${y} l ${-Math.cos(a + 0.5) * 34} ${-Math.sin(a + 0.5) * 34}`} stroke={color} strokeWidth={12} strokeLinecap="round" /></g>;
}
// Hongo pequeño (seta de repisa blanca) para los íconos de los 31 genomas.
function Repisa({ x, y, s = 1, color = '#fbfaf3' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 0 Q 0 -46 40 0 Q 0 -12 -40 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -30 -6 Q 0 -32 30 -6" stroke="#d9cfb4" strokeWidth={3} fill="none" />
  </g>;
}

function Podredumbre() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lignina, H: CUES.Hifas, E: CUES.Enzimas, B: CUES.Blanca, S: CUES.Suelo, P: CUES.Pregunta, Es: CUES.Estudio, R: CUES.Reloj, C: CUES.Carbon, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // zoom macro → micro (fin del gancho) y micro → macro (inicio de "blanca")
  const zIn = kprog(T, K.L - 1.0, K.L + 0.4, kEase.suave), zOut = kprog(T, K.B - 0.5, K.B + 0.5, kEase.suave);
  const zEsc = Math.exp(Math.log(PXMM_MICRO) * zIn * (1 - zOut));
  const hongo = kprog(T, K.G + 0.1, K.G + 2.4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tronco caído con la ofrenda; el hongo asoma en manchas blancas; la cámara entra al corte */}
      <Escena T={T} a={K.G} b={K.L} zoom={0}>
        <div style={{ position:'absolute', inset:0, transformOrigin:'880px 850px', transform:`scale(${1 + 6 * kprog(T, K.L - 1.2, K.L + 0.4, kEase.entra || kEase.suave)})` }}>
          <Bosque T={T} />
          {svgF(<>
            <Tronco T={T} x={120 - 40 * (1 - kprog(T, K.G, K.G + 0.7, kEase.sale))} y={700} hongo={hongo} />
            <Vela x={170} y={1120} s={0.9} T={T} />
            <Cempasuchil x={330} y={1080} s={1.1} T={T} seed={1} /><Cempasuchil x={480} y={1130} s={0.9} T={T} seed={2} /><Cempasuchil x={70} y={1150} s={0.8} T={T} seed={3} />
            {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.G) * 0.35 + i / 6) % 1; return <ellipse key={i} cx={260 + i * 120 + Math.sin(T * 2 + i) * 30} cy={klerp(420, 1020, u)} rx={14} ry={8} fill="#f07a12" stroke={KC.ink} strokeWidth={2} opacity={1 - u * 0.4} />; })}
          </>)}
        </div>
      </Escena>
      {/* 2–4 · por dentro de la madera: lignina (pegamento), hifas que cruzan por los poros, enzimas-tijera */}
      <Escena T={T} a={K.L} b={K.B} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <MundoMadera T={T}
          lignina={1 - 0.85 * kprog(T, K.E + 0.4, K.B - 0.2)}
          hifas={kprog(T, K.H + 0.1, K.E + 1.0)}
          blanco={kprog(T, K.E + 1.2, K.B)}
          tijeras={[{ x: 315, y: 645, at: K.E + 0.1 }, { x: 615, y: 795, at: K.E + 0.5, s: 0.9 }, { x: 765, y: 495, at: K.E + 0.9, s: 0.8 }, { x: 465, y: 945, at: K.E + 1.3, s: 0.9 }]} />
      </Escena>
      {/* 5 · de vuelta afuera: el corte del tronco blanco y blando (un dedo lo hunde) */}
      <Escena T={T} a={K.B} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {svgF(<>
          <ellipse cx={540} cy={900} rx={380} ry={380} fill={mixHex('#e2b673', MADERA.blanca, kprog(T, K.B, K.B + 1.5))} stroke={KC.ink} strokeWidth={12} />
          {[0.8, 0.6, 0.4, 0.2].map((k, i) => <circle key={i} cx={540} cy={900} r={380 * k} fill="none" stroke={mixHex('#a8742f', '#d6cfb8', kprog(T, K.B, K.B + 1.5))} strokeWidth={6} />)}
          <g transform="translate(250 720)"><Manchas crece={1} T={T} ancho={560} alto={360} seed={4} /></g>
          {(() => { const p = kprog(T, K.B + 1.6, K.B + 2.2, kEase.suave) * (1 - kprog(T, K.B + 3.0, K.B + 3.5)); return <g>
            <ellipse cx={680} cy={1000} rx={70 * p} ry={40 * p} fill="rgba(0,0,0,.25)" />
            <g transform={`translate(${680} ${klerp(760, 990, p)})`}><rect x={-44} y={-260} width={88} height={260} rx={44} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} /><ellipse cx={0} cy={-30} rx={26} ry={18} fill="#ffe0d0" stroke={KC.ink} strokeWidth={4} /></g>
          </g>; })()}
        </>)}
      </Escena>
      {/* 6 · lo que fue árbol: suelo, agua y CO₂ */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.04}>
        <Bosque T={T} color={KC.yellow} />
        {svgF(<>
          <Tronco T={T} x={160} y={640} hongo={1} blanco={1} deshace={kprog(T, K.S + 0.2, K.S + 1.6, kEase.suave)} />
          <path d={`M 160 940 Q 540 ${klerp(940, 800, kprog(T, K.S + 0.6, K.S + 1.8))} 920 940 Z`} fill="#4a2f1a" stroke={KC.ink} strokeWidth={8} />
          <Flecha x1={540} y1={880} x2={250} y2={1020} k={kprog(T, K.S + 1.4, K.S + 1.8)} color={KC.ink} />
          <Flecha x1={520} y1={820} x2={420} y2={600} k={kprog(T, K.S + 1.8, K.S + 2.2)} color={KC.ink} />
          <Flecha x1={600} y1={880} x2={880} y2={1020} k={kprog(T, K.S + 2.2, K.S + 2.6)} color={KC.ink} />
          {T > K.S + 2.0 && Array.from({ length: 6 }, (_, i) => { const u = ((T - K.S - 2) * 0.6 + i / 6) % 1; return <circle key={i} cx={410 + Math.sin(T * 3 + i) * 30} cy={klerp(580, 380, u)} r={16 + i % 3 * 6} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={4} opacity={1 - u} />; })}
          {T > K.S + 2.5 && <path d="M 900 1000 q 26 40 0 60 q -26 -20 0 -60 Z" transform={`translate(0 ${Math.sin(T * 4) * 6})`} fill="#4fc3ff" stroke={KC.ink} strokeWidth={5} />}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svgF(<>
          <text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>
          <g opacity={kprog(T, K.P + 0.3, K.P + 0.8)}><Tijera T={T} x={230} y={1160} at={K.P + 0.3} s={1.4} />
            <line x1={160} y1={1100} x2={330} y2={1220} stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.P + 1.0, K.P + 1.3)} /></g>
        </>)}
      </Escena>
      {/* 8 · el estudio: 31 genomas de hongos */}
      <Escena T={T} a={K.Es} b={K.R} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {svgF(Array.from({ length: 31 }, (_, i) => { const at = K.Es + 1.2 + i * 0.08; if (T < at) return null; const c = i % 8, r = Math.floor(i / 8);
          return <g key={i} transform={`translate(${135 + c * 116} ${1000 + r * 64}) scale(${kprog(T, at, at + 0.3, kEase.rebote)})`}><Repisa x={0} y={0} s={0.9} color={i % 5 === 3 ? '#c98a5a' : '#fbfaf3'} /></g>; }))}
      </Escena>
      {/* 9 · reloj molecular: hacia atrás hasta ~290 millones de años */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svgF((() => { const u = kprog(T, K.R + 0.6, K.R + 3.4, kEase.suave); return <>
          <line x1={100} y1={1010} x2={980} y2={1010} stroke={KC.texto} strokeWidth={10} strokeLinecap="round" />
          {Array.from({ length: 11 }, (_, i) => <line key={i} x1={100 + i * 88} y1={990} x2={100 + i * 88} y2={1030} stroke={KC.texto} strokeWidth={6} />)}
          <text x={980} y={1090} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>hoy</text>
          <text x={100} y={1090} style={{ font:`700 34px ${KF.mono}` }} fill={KC.gold2}>Carbonífero</text>
          <circle cx={klerp(980, 160, u)} cy={1010} r={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(${klerp(980, 160, u)} 940)`} opacity={kprog(T, K.R + 3.2, K.R + 3.6)}><Tijera T={T} x={0} y={0} at={K.R + 3.2} s={0.9} /></g>
          <g transform={`translate(540 700) rotate(${-u * 1440})`}><circle r={90} fill="none" stroke={KC.cyan} strokeWidth={10} /><line x1={0} y1={0} x2={0} y2={-70} stroke={KC.cyan} strokeWidth={10} strokeLinecap="round" /></g>
          <g transform="translate(540 700) rotate(0)"><line x1={0} y1={0} x2={50} y2={0} stroke={KC.cyan} strokeWidth={10} strokeLinecap="round" /><circle r={12} fill={KC.cyan} /></g>
        </>; })())}
      </Escena>
      {/* 10 · la hipótesis del carbón: licopsidas que caen y se entierran sin pudrirse */}
      <Escena T={T} a={K.C} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.teal} punto="rgba(255,255,255,.18)" />
        {svgF((() => { const capas = kprog(T, K.C + 1.6, K.C + 4.2); return <>
          <Helecho x={120} y={1000} s={1.1} T={T} /><Helecho x={980} y={1000} s={1.0} T={T} />
          <Licopsida x={380} y={1000} h={620} cae={kprog(T, K.C + 0.3, K.C + 1.2, kEase.entra || kEase.suave)} T={T} />
          <Licopsida x={720} y={1000} h={560} cae={kprog(T, K.C + 0.8, K.C + 1.7, kEase.entra || kEase.suave) * -1.05} T={T} />
          <rect x={0} y={1000} width={1080} height={200} fill="#3d2a16" stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2, 3].map((i) => { const k = kclamp(capas * 4 - i, 0, 1); return <rect key={i} x={0} y={1200 - (i + 1) * 50 * k} width={1080} height={50 * k} fill={i % 2 ? '#8a6a3a' : '#a8844a'} opacity={0.95} />; })}
          <rect x={0} y={1160} width={1080} height={40} fill="#14110f" opacity={kprog(T, K.C + 3.6, K.C + 4.6)} />
        </>; })())}
      </Escena>
      {/* 11 · dato: un trozo de carbón con la huella de una planta */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        {svgF(<g transform={`translate(330 900) rotate(${Math.sin(T * 1.5) * 4}) scale(${0.75 * kprog(T, K.D, K.D + 0.5, kEase.rebote)})`}>
          <path d="M -260 -60 L -150 -200 L 60 -230 L 250 -120 L 280 80 L 120 220 L -140 200 L -280 80 Z" fill="#1d1a19" stroke={KC.ink} strokeWidth={10} />
          <path d="M -120 -160 L 200 -40 L 210 120 L -40 160 Z" fill="#2b2726" />
          <g opacity={0.85}><path d="M -160 120 Q 0 0 180 -100" stroke="#6b6460" strokeWidth={8} fill="none" />
            {Array.from({ length: 8 }, (_, i) => { const x = -140 + i * 42, y = 108 - i * 27; return <g key={i}><path d={`M ${x} ${y} q -10 -40 -40 -50`} stroke="#6b6460" strokeWidth={6} fill="none" /><path d={`M ${x} ${y} q 30 20 40 50`} stroke="#6b6460" strokeWidth={6} fill="none" /></g>; })}</g>
        </g>)}
      </Escena>
      {/* 12 · cierre: el mismo lugar del inicio; el tronco ya es tierra, con un brote y cempasúchil */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <Bosque T={T} />
        {svgF((() => { const d = kprog(T, K.Ci + 0.3, K.Ci + 2.0, kEase.suave); return <>
          <Tronco T={T} x={120} y={700} hongo={1} blanco={1} deshace={d} />
          <path d={`M 100 1010 Q 520 ${klerp(1010, 870, d)} 940 1010 Z`} fill="#4a2f1a" stroke={KC.ink} strokeWidth={8} />
          <Brote x={520} y={920} k={kprog(T, K.Ci + 1.8, K.Ci + 3.2, kEase.sale)} T={T} />
          <g opacity={kprog(T, K.Ci + 2.6, K.Ci + 3.2)}><Repisa x={720} y={950} s={1.2} /><Repisa x={790} y={970} s={0.9} /></g>
          <Vela x={170} y={1120} s={0.9} T={T} />
          <Cempasuchil x={330} y={1080} s={1.1} T={T} seed={1} /><Cempasuchil x={480} y={1130} s={0.9} T={T} seed={2} /><Cempasuchil x={70} y={1150} s={0.8} T={T} seed={3} />
          <Cempasuchil x={640} y={1060} s={kprog(T, K.Ci + 3.0, K.Ci + 3.6, kEase.rebote)} T={T} seed={4} />
        </>; })())}
      </Escena>

      {/* escala: cm → µm al entrar a la madera y de vuelta */}
      {T < K.S - 0.3 && <Escala T={T} z={zEsc} pxPorMm={PXMM_MACRO} x={60} y={1430} />}

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.L - 1.2} texto="Especial Día de Muertos" y={470} tam={34} borde={KC.orange} />
      <Etq T={T} at={K.G + 1.4} until={K.L - 1.1} x={560} y={650} texto="hongo (micelio)" tam={32} />
      <Chip T={T} at={K.L + 0.6} until={K.H - 0.2} texto="lignina = pegamento" y={330} x={640} tam={40} borde={MADERA.ambar} />
      <Etq T={T} at={K.L + 1.4} until={K.H - 0.2} x={1000} y={1205} texto="celulosa (pared)" lado="izq" tam={28} />
      <Etq T={T} at={K.H + 0.6} until={K.E - 0.2} x={1000} y={330} texto="hifas" lado="izq" tam={38} color={KC.texto} />
      <Etq T={T} at={K.H + 1.6} until={K.E - 0.2} x={1000} y={1205} texto="poros en la pared" lado="izq" tam={28} />
      <Chip T={T} at={K.E + 0.3} until={K.B - 0.2} texto="enzimas: tijeras químicas" y={330} x={640} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.B + 0.4} until={K.S - 0.2} texto="podredumbre blanca" y={420} tam={48} borde={KC.ink} fondo={KC.paper} color={KC.ink} />
      <Etq T={T} at={K.B + 2.0} until={K.S - 0.2} x={760} y={1120} texto="blanda" tam={34} />
      <Etq T={T} at={K.S + 1.6} until={K.P - 0.2} x={60} y={1040} texto="suelo" tam={36} color={KC.ink} />
      <Etq T={T} at={K.S + 1.9} until={K.P - 0.2} x={460} y={400} texto="CO₂" tam={40} color={KC.ink} />
      <Etq T={T} at={K.S + 2.5} until={K.P - 0.2} x={1040} y={1110} texto="agua" lado="izq" tam={36} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.R - 0.3} anio="2012" quien="Floudas, Hibbett et al. · U. Clark" revista="Science · consorcio internacional · 31 genomas" y={760} />
      <NumeroGigante T={T} at={K.R + 0.6} until={K.C - 0.3} valor={290} dur={2.8} etiqueta="millones de años (aprox.)" x={640} y={430} tam={170} />
      <Chip T={T} at={K.R + 3.5} until={K.C - 0.3} texto="reloj molecular" x={780} y={860} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.C + 0.3} until={K.D - 0.2} texto="HIPÓTESIS" y={420} tam={46} borde={KC.yellow} />
      <Etq T={T} at={K.C + 3.8} until={K.D - 0.2} x={60} y={1150} texto="carbón" tam={34} color={KC.texto} />
      <Chip T={T} at={K.C + 4.6} until={K.D - 0.2} texto="2016: en duda" x={360} y={560} tam={40} borde={KC.red} />
      <Chip T={T} at={K.D + 0.6} until={K.Ci - 0.2} texto="pantanos empapados: casi no se pudren" y={420} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.D + 1.4} until={K.Ci - 0.2} x={40} y={1170} texto="huella de planta (esquemática)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Ci + 3.4} until={K.Ou} texto="todo regresa a la tierra" x={370} y={470} tam={38} borde={KC.orange} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="Muerto, pero no solo: *lo come un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.H - 0.1} texto="La lignina: *un pegamento difícil.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.E - 0.1} texto="Las hifas *perforan la madera.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.B - 0.1} texto="Enzimas: *tijeras químicas.*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.S - 0.1} texto="Blanda y blanca: *podredumbre blanca.*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.P - 0.1} texto="Se vuelve *suelo, agua y CO₂.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Y antes de *esas tijeras?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.R - 0.1} texto="2012: *31 hongos* en Science." />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.C - 0.1} texto="Hace unos *290 millones de años.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.D - 0.1} texto="Hipótesis: *troncos que se volvieron carbón.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.Ci - 0.1} texto="Pantanos empapados: *casi no se pudren.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Con la madera, *quien más ayuda es un hongo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Hifas + 0.5, CUES.Enzimas + 3.0, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Suelo + 0.3, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Reloj + 0.6, CUES.Carbon - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Carbon + 3.4, CUES.Dato - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Dato + 0.2, CUES.Cierre - 0.15, 'avatar_11_sorprendido', 'grande'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PodredumbreApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Podredumbre /></CompositionStage></div>;
}
window.PodredumbreApp = PodredumbreApp;
