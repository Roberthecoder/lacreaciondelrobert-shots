// Shot Fungi Mati #49 · La pelusa gris de tus fresas: Botrytis cinerea entra por la flor y espera — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const BC = { rojo:'#e8283c', rojo2:'#b5172a', verdeF:'#cfe8a0', blancoF:'#f4f1dc', semilla:'#ffd84a', caliz:'#2f9e44', caliz2:'#46c25a',
  gris:'#9a9a94', gris2:'#c9c9c2', gris3:'#6d6d68', petalo:'#ffffff', centro:'#f2c230', antera:'#ffd21f', filamento:'#f7f0c8',
  recept:'#d9eaa0', uva:'#cfe07a', uva2:'#a8b85a', pasa:'#b07a2e', pasa2:'#7a4f1c', hifa:'#d8d8d0', conidio:'#b9b9ae' };

// Fresa de frente. madurez 0 (verde-blanca) → 1 (roja). moho 0..1 = pelusa gris que cubre. lado = de qué lado empieza el moho (-1 izq, 1 der).
function Fresa({ T = 0, x, y, s = 1, madurez = 1, moho = 0, lado = 1, rot = 0, blanda = 0, seed = 1, tam = 1 }) {
  const piel = madurez < 0.5 ? mixHex(BC.verdeF, '#f1e3c8', madurez * 2) : mixHex('#f1e3c8', BC.rojo, (madurez - 0.5) * 2);
  const pielOsc = mixHex(piel, BC.gris3, 0.15 + blanda * 0.4);
  const sem = madurez < 0.6 ? '#9fbf5a' : BC.semilla;
  const g = krng(seed);
  const semillas = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const sx = -75 + c * 30 + (r % 2) * 15, sy = -75 + r * 32; const w = 95 * (1 - (sy + 105) / 240) + 10;
    if (Math.abs(sx) < w - 10 && sy < 90) semillas.push([sx, sy]); }
  const fz = [];
  if (moho > 0) { const n = Math.round(46 * moho); for (let i = 0; i < n; i++) { const a = g() * Math.PI * 2, rr = g();
      const cx = lado * (60 - 50 * moho) + Math.cos(a) * rr * 120 * moho, cy = 10 + Math.sin(a) * rr * 110 * moho; fz.push([cx, cy, 14 + g() * 16, g()]); } }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * tam})`}>
    <defs><clipPath id={`fr${seed}`}><path d="M 0 120 C -70 92 -112 12 -102 -50 C -96 -100 -40 -116 0 -104 C 40 -116 96 -100 102 -50 C 112 12 70 92 0 120 Z" /></clipPath></defs>
    <path d="M 0 120 C -70 92 -112 12 -102 -50 C -96 -100 -40 -116 0 -104 C 40 -116 96 -100 102 -50 C 112 12 70 92 0 120 Z" fill={piel} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g clipPath={`url(#fr${seed})`}>
      <path d="M 40 -96 C 90 -80 100 0 40 90 L 120 90 L 120 -110 Z" fill={pielOsc} opacity=".45" />
      {semillas.map(([sx, sy], i) => <ellipse key={i} cx={sx} cy={sy} rx={4.5} ry={7} fill={sem} stroke={KC.ink} strokeWidth={1.5} />)}
      {fz.map(([cx, cy, r, k], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={k > 0.5 ? BC.gris2 : BC.gris} opacity={0.95} />)}
    </g>
    {fz.filter((_, i) => i % 3 === 0).map(([cx, cy, r, k], i) => <g key={i} opacity={0.9}>
      {[0, 1, 2].map((j) => { const a = -Math.PI / 2 + (j - 1) * 0.6 + k; return <line key={j} x1={cx} y1={cy} x2={cx + Math.cos(a) * (r + 10)} y2={cy + Math.sin(a) * (r + 10)} stroke="#e4e4dc" strokeWidth={2.5} strokeLinecap="round" />; })}
    </g>)}
    <ellipse cx={-38} cy={-60} rx={14} ry={28} fill="#fff" opacity={0.3 * (1 - moho)} transform="rotate(25 -38 -60)" />
    {[-70, -35, 0, 35, 70].map((a, i) => <path key={i} d="M 0 -104 Q 18 -128 6 -150 Q -4 -126 -18 -112 Z" transform={`rotate(${a + mece(T, i + seed, 0.4) * 3} 0 -104) translate(${a * 0.2} 0)`} fill={i % 2 ? BC.caliz2 : BC.caliz} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />)}
    <path d="M -4 -112 Q -2 -150 10 -172" stroke={BC.caliz} strokeWidth={9} fill="none" strokeLinecap="round" /><path d="M -4 -112 Q -2 -150 10 -172" stroke={KC.ink} strokeWidth={2} fill="none" />
  </g>;
}

// Flor de fresa vista de frente: 5 pétalos blancos, centro amarillo (receptáculo con pistilos) y anillo de estambres.
function FlorFresa({ T = 0, x, y, s = 1, petalos = 1, punto = 0, abre = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (0.4 + 0.6 * abre)}) rotate(${mece(T, 7, 0.3) * 4})`}>
    {[0, 1, 2, 3, 4].map((i) => { const a = i * 72 - 90; const p = kclamp(petalos * 5 - (4 - i), 0, 1); return p > 0 ? <g key={i} transform={`rotate(${a}) translate(${70} 0) rotate(${(1 - p) * 40}) translate(${(1 - p) * 60} 0)`} opacity={p}>
      <ellipse cx={0} cy={0} rx={62} ry={56} fill={BC.petalo} stroke={KC.ink} strokeWidth={6} />
      <path d="M -40 0 Q 0 -6 40 0" stroke="#e8e6da" strokeWidth={4} fill="none" /></g> : null; })}
    {Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2; return <g key={i}>
      <line x1={Math.cos(a) * 28} y1={Math.sin(a) * 28} x2={Math.cos(a) * 52} y2={Math.sin(a) * 52} stroke={BC.filamento} strokeWidth={4} />
      <ellipse cx={Math.cos(a) * 54} cy={Math.sin(a) * 54} rx={7} ry={5} fill={BC.antera} stroke={KC.ink} strokeWidth={2} transform={`rotate(${a * 57.3} ${Math.cos(a) * 54} ${Math.sin(a) * 54})`} /></g>; })}
    <circle r={32} fill={BC.centro} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, r = 6 + (i % 4) * 6; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={3.5} fill="#c9a018" />; })}
    {punto > 0 && <g opacity={punto}>{[[-46, -30], [-54, -12], [-40, -44]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={9 + i * 2} fill={BC.gris} stroke={KC.ink} strokeWidth={2} />)}</g>}
  </g>;
}

// Esporas (conidios) ovoides, a escala esquemática.
function Conidio({ x, y, s = 1, rot = 0, color = BC.conidio }) {
  return <ellipse cx={x} cy={y} rx={11 * s} ry={14 * s} fill={color} stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${rot} ${x} ${y})`} />;
}
// Racimito de conidios alrededor de una punta hinchada (como un racimo de uvas).
function RacimoConidios({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  const n = Math.round(9 * p);
  const pts = [[0, -26], [-20, -16], [20, -16], [-26, 4], [26, 4], [-12, 18], [12, 18], [0, -4], [0, 30]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={14} fill="#5a5145" stroke={KC.ink} strokeWidth={2.5} />
    {pts.slice(0, n).map(([px, py], i) => <Conidio key={i} x={px} y={py} s={0.95} rot={Math.atan2(py, px) * 57.3 + 90} />)}
  </g>;
}
// Conidióforo: tallo oscuro que se ramifica arriba en ramas casi perpendiculares; en cada punta, un racimito de conidios.
function Conidioforo({ x, y, alto = 520, s = 1, p = 1, seed = 1 }) {
  const h = alto * kEase.sale(kclamp(p * 1.4, 0, 1)), r = kclamp(p * 2 - 0.6, 0, 1), c = kclamp(p * 2 - 1, 0, 1);
  const top = -h;
  const ramas = [[-1, 0.0, 120], [1, 0.12, 110], [-1, 0.26, 95], [1, 0.38, 80], [-1, 0.5, 60]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -9 0 L -7 ${top} L 7 ${top} L 9 0 Z`} fill="#4a4036" stroke={KC.ink} strokeWidth={4} />
    {[0.2, 0.45, 0.7].map((u, i) => h > alto * u && <line key={i} x1={-8} y1={-alto * u} x2={8} y2={-alto * u} stroke={KC.ink} strokeWidth={2} />)}
    {r > 0 && ramas.map(([dir, u, L], i) => { const yy = top + 20 + u * 220 * 0.6; const len = L * kclamp(r * 1.5 - i * 0.12, 0, 1); const ex = dir * len, ey = yy - len * 0.35;
      return len > 1 ? <g key={i}>
        <path d={`M 0 ${yy} Q ${ex * 0.5} ${yy} ${ex} ${ey}`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" />
        <path d={`M 0 ${yy} Q ${ex * 0.5} ${yy} ${ex} ${ey}`} stroke="#5a5145" strokeWidth={7} fill="none" strokeLinecap="round" />
        <RacimoConidios x={ex} y={ey - 6} s={0.85} p={c} /></g> : null; })}
    <RacimoConidios x={0} y={top - 8} s={1} p={c} />
  </g>;
}

// Corte de la flor (de lado): receptáculo (lo que será la fresa), pistilos, estambres, pétalos y sépalos. hifa 0..1 baja por un estambre.
function FlorCorte({ T, x, y, s = 1, hifa = 0, esporas = 0, duerme = 0 }) {
  const est = [-190, -150, 150, 190];
  const ruta = [[-178, -262], [-176, -200], [-172, -140], [-150, -80], [-110, -40], [-60, -10], [-20, 10]];
  const n = Math.max(1, Math.ceil(hifa * (ruta.length - 1)));
  const d = 'M ' + ruta.slice(0, n + 1).map((q) => q.join(' ')).join(' L ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -60 Q -330 -170 -300 -260 Q -250 -180 -200 -110 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={5} />
    <path d="M 260 -60 Q 330 -170 300 -260 Q 250 -180 200 -110 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={5} />
    <path d="M -230 40 Q -300 60 -330 20 Q -280 0 -220 0 Z" fill={BC.caliz} stroke={KC.ink} strokeWidth={5} />
    <path d="M 230 40 Q 300 60 330 20 Q 280 0 220 0 Z" fill={BC.caliz} stroke={KC.ink} strokeWidth={5} />
    <path d="M -20 260 L -24 120 L 24 120 L 20 260 Z" fill={BC.caliz} stroke={KC.ink} strokeWidth={6} />
    <path d="M -230 40 Q -240 -120 0 -150 Q 240 -120 230 40 Q 120 140 0 130 Q -120 140 -230 40 Z" fill={BC.recept} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => { const u = (i - 4) / 4; const bx = u * 150, by = -130 + Math.abs(u) * 50; return <g key={i}>
      <path d={`M ${bx} ${by} L ${bx + u * 14} ${by - 60}`} stroke="#8fbf4a" strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={bx} cy={by - 4} rx={11} ry={8} fill="#a8d468" stroke={KC.ink} strokeWidth={2} /></g>; })}
    {est.map((ex, i) => { const sg = Math.sign(ex); return <g key={i}>
      <path d={`M ${ex * 0.95} -90 Q ${ex * 0.98} -180 ${ex - sg * 8} -250`} stroke={BC.filamento} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d={`M ${ex * 0.95} -90 Q ${ex * 0.98} -180 ${ex - sg * 8} -250`} stroke={KC.ink} strokeWidth={2} fill="none" opacity=".5" />
      <ellipse cx={ex - sg * 8} cy={-268} rx={22} ry={30} fill={BC.antera} stroke={KC.ink} strokeWidth={4} /></g>; })}
    {esporas > 0 && [[-190, -292], [-168, -296], [-200, -276], [-160, -280]].map(([ex, ey], i) => <Conidio key={i} x={ex} y={ey} s={0.7 * kclamp(esporas * 4 - i, 0, 1)} />)}
    {hifa > 0 && <><path d={d} stroke={KC.ink} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={BC.hifa} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter:'drop-shadow(0 0 6px rgba(255,255,255,.6))' }} /></>}
    {duerme > 0 && [0, 1, 2].map((i) => { const u = ((T * 0.6 + i / 3) % 1); return <text key={i} x={10 + u * 60} y={-20 - u * 120} style={{ font:`400 ${40 + u * 30}px ${KF.titulo}` }} fill="#fff" opacity={duerme * (1 - u)}>z</text>; })}
  </g>;
}

// Racimo de uvas blancas. pasa 0..1 = se arrugan y oscurecen (podredumbre noble).
function RacimoUvas({ T = 0, x, y, s = 1, pasa = 0, moho = 0 }) {
  const filas = [6, 5, 5, 4, 3, 2, 1];
  const bolas = []; filas.forEach((n, r) => { for (let c = 0; c < n; c++) bolas.push([(c - (n - 1) / 2) * 62, r * 56]); });
  const col = mixHex(BC.uva, BC.pasa, pasa), col2 = mixHex(BC.uva2, BC.pasa2, pasa), rr = 34 * (1 - pasa * 0.2);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 3, 0.3) * 2})`}>
    <path d="M 0 -40 Q 10 -90 40 -120" stroke="#6b4a2b" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 20 -100 Q 90 -150 150 -110 Q 110 -60 30 -90 Z" fill={BC.caliz} stroke={KC.ink} strokeWidth={5} />
    {bolas.map(([bx, by], i) => <g key={i}>
      <circle cx={bx} cy={by} r={rr} fill={i % 3 ? col : col2} stroke={KC.ink} strokeWidth={5} />
      {pasa > 0.2 && <path d={`M ${bx - rr * 0.5} ${by - 4} Q ${bx} ${by + 8} ${bx + rr * 0.5} ${by - 6} M ${bx - rr * 0.3} ${by + 12} Q ${bx + 4} ${by + 20} ${bx + rr * 0.4} ${by + 10}`} stroke={KC.ink} strokeWidth={2.5} fill="none" opacity={pasa} />}
      <circle cx={bx - 10} cy={by - 12} r={7} fill="#fff" opacity={0.45 * (1 - pasa)} />
      {moho > 0 && i % 4 === 0 && <circle cx={bx + 8} cy={by - 8} r={10 * moho} fill={BC.gris2} opacity=".9" />}
    </g>)}
  </g>;
}

// Botella de vino dulce (esquemática).
function Botella({ x, y, s = 1, vino = '#e7a52a', texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -16 -200 L 16 -200 L 16 -130 Q 50 -110 50 -60 L 50 120 Q 50 136 34 136 L -34 136 Q -50 136 -50 120 L -50 -60 Q -50 -110 -16 -130 Z" fill={vino} stroke={KC.ink} strokeWidth={6} />
    <rect x={-18} y={-214} width={36} height={22} rx={5} fill="#7a2a2a" stroke={KC.ink} strokeWidth={4} />
    <rect x={-40} y={-10} width={80} height={80} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <path d="M -30 -40 Q -26 -100 -10 -120" stroke="#fff" strokeWidth={8} opacity=".4" fill="none" strokeLinecap="round" />
  </g>;
}

// Cajita de fresas (clamshell) de frente con 5 fresas. moho = [m0..m4], ghost = flor fantasma sobre la fresa 2.
function Cajita({ T, x, y, s = 1, moho = [0, 0, 0, 0, 0], tapa = 1 }) {
  const pos = [[-150, -30, -12], [0, -50, 4], [150, -30, 14], [-80, 70, -6], [80, 70, 8]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -60 L 300 -60 L 270 200 Q 0 220 -270 200 Z" fill="rgba(210,240,255,.45)" stroke={KC.ink} strokeWidth={8} />
    {pos.map(([px, py, r], i) => <Fresa key={i} T={T} x={px} y={py} s={0.82} rot={r} moho={moho[i] || 0} lado={i === 1 ? 1 : (i < 2 ? 1 : -1)} seed={i + 2} />)}
    <path d="M -270 200 Q 0 220 270 200 L 280 120 Q 0 150 -280 120 Z" fill="rgba(210,240,255,.55)" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={-240 + i * 80} y1={140} x2={-236 + i * 80} y2={195} stroke="#fff" strokeWidth={6} opacity=".6" />)}
    <path d="M -300 -60 L 300 -60" stroke="#fff" strokeWidth={5} opacity=".7" />
  </g>;
}

// Nube de esporas que sale de (x, y) hacia arriba. p 0..1
function Nube({ x, y, p, n = 18, seed = 4 }) {
  if (p <= 0 || p >= 1) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (g() - 0.5) * 1.8, v = 120 + g() * 260; return <Conidio key={i} x={x + Math.cos(a) * v * p} y={y + Math.sin(a) * v * p} s={0.7} rot={g() * 180} />; })}
    <circle cx={x} cy={y - 140 * p} r={60 + 160 * p} fill="#e0e0d8" opacity={0.35 * (1 - p)} /></g>;
}

// Fondo oscuro de microscopio.
function FondoMicro({ T }) {
  return <><div style={{ position:'absolute', inset:0, background:KC.noche }}></div><Ambiente T={T} n={18} /></>;
}

function BotrytisShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Es: CUES.Esporas, Et: CUES.Estambres, Sp: CUES.Espera, P: CUES.Pregunta, M: CUES.Madura, Pe: CUES.Pelusa,
    V: CUES.Vecinas, E: CUES.Estudio, E2: CUES.Estambres2, N: CUES.Noble, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mohoG = kprog(T, K.G + 0.1, K.G + 2.4, kEase.sale);
  const madura = kprog(T, K.M + 0.3, K.M + 2.4, kEase.suave);
  const micro = K.Pe + 1.3;
  const contagio = kprog(T, K.V + 0.6, K.V + 3.6);
  const pasa = kprog(T, K.N + 2.4, K.N + 4.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: a una fresa de la cajita le brota la pelusa gris */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cajita T={T} x={520} y={960} s={1.2} moho={[0, mohoG, 0, 0, 0]} />
          {T > K.G + 2.9 && <g opacity={kprog(T, K.G + 2.9, K.G + 3.3)} transform={`translate(300 560) scale(${kprog(T, K.G + 2.9, K.G + 3.4, kEase.rebote)})`}>
            <circle r={160} fill={KC.mint} stroke={KC.ink} strokeWidth={9} />
            <FlorFresa T={T} x={0} y={0} s={1.05} punto={kprog(T, K.G + 3.5, K.G + 3.9)} />
          </g>}
          {T > K.G + 2.9 && <path d={`M 360 715 Q 420 800 ${520} 860`} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 12" fill="none" opacity={kprog(T, K.G + 3.2, K.G + 3.6)} />}
        </>)}
      </Escena>
      {/* 1 · Botrytis cinerea ataca a cientos de plantas */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Fresa T={T} x={430} y={800} s={1.55} moho={0.75} lado={1} seed={9} />
          {[
            [140, 1110, (k) => <RacimoUvas T={T} x={0} y={-50} s={0.38} moho={k} />],
            [380, 1110, (k) => <g><circle r={62} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><path d="M -20 -60 L 0 -76 L 20 -60" stroke={BC.caliz} strokeWidth={10} fill="none" /><circle cx={24} cy={8} r={26 * k} fill={BC.gris2} stroke={KC.ink} strokeWidth={k > 0 ? 3 : 0} /></g>],
            [620, 1110, (k) => <g>{[[0, -30], [-24, -6], [24, -6], [-14, 20], [14, 20], [0, 44], [0, -2]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={20} fill="#d0204a" stroke={KC.ink} strokeWidth={4} />)}<circle cx={10} cy={0} r={28 * k} fill={BC.gris2} stroke={KC.ink} strokeWidth={k > 0 ? 3 : 0} /></g>],
            [860, 1110, (k) => <g><ellipse rx={50} ry={70} fill="#ffd6e8" stroke={KC.ink} strokeWidth={6} transform="rotate(20)" /><circle cx={6} cy={10} r={30 * k} fill={BC.gris2} stroke={KC.ink} strokeWidth={k > 0 ? 3 : 0} /></g>],
          ].map(([px, py, f], i) => { const on = kprog(T, K.H + 1.4 + i * 0.35, K.H + 1.8 + i * 0.35, kEase.rebote); return on > 0 ? <g key={i} transform={`translate(${px} ${py}) scale(${on})`}>
            <circle r={96} fill="#fff" stroke={KC.ink} strokeWidth={6} opacity=".9" />{f(kprog(T, K.H + 1.8 + i * 0.35, K.H + 2.2 + i * 0.35))}</g> : null; })}
        </>)}
      </Escena>
      {/* 2 · las esporas llegan con el viento y las salpicaduras, y germinan en la flor */}
      <Escena T={T} a={K.Es} b={K.Et} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <path d="M 540 1250 Q 520 1050 540 860" stroke={BC.caliz} strokeWidth={18} fill="none" strokeLinecap="round" />
          {[[-1, 1080], [1, 1010]].map(([dr, yy], i) => <path key={i} d={`M 535 ${yy} Q ${540 + dr * 120} ${yy - 90} ${540 + dr * 230} ${yy - 40} Q ${540 + dr * 140} ${yy + 30} 535 ${yy} Z`} fill={BC.caliz2} stroke={KC.ink} strokeWidth={6} />)}
          <FlorFresa T={T} x={540} y={820} s={1.7} />
          {[0, 1, 2].map((i) => { const u = kprog(T, K.Es + 0.2 + i * 0.25, K.Es + 1.6 + i * 0.25); return u > 0 && u < 1 ? <path key={i} d={`M ${-100 + u * 500} ${640 + i * 60} q 60 -20 120 0 t 120 0`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - u} /> : null; })}
          {Array.from({ length: 8 }, (_, i) => { const u = kprog(T, K.Es + 0.4 + i * 0.12, K.Es + 1.9 + i * 0.12, kEase.sale); const tx = 470 + (i % 4) * 30, ty = 790 + Math.floor(i / 4) * 40;
            return u > 0 ? <g key={i}><Conidio x={klerp(-40, tx, u)} y={klerp(600 + i * 25, ty, u) + Math.sin(u * 9 + i) * 20 * (1 - u)} s={1.2} />
              {u >= 1 && <path d={`M ${tx} ${ty + 14} q 10 ${14 * kprog(T, K.Es + 2.6, K.Es + 3.4)} ${4} ${28 * kprog(T, K.Es + 2.6, K.Es + 3.4)}`} stroke={BC.hifa} strokeWidth={5} fill="none" strokeLinecap="round" />}</g> : null; })}
          {(() => { const u = kprog(T, K.Es + 1.2, K.Es + 1.8, kEase.entra || ((p) => p * p)); const sp = kprog(T, K.Es + 1.8, K.Es + 2.6); return <g>
            {u < 1 && <path d={`M 860 ${380 + u * 380} q -22 34 0 48 q 22 -14 0 -48 Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={4} />}
            {sp > 0 && sp < 1 && Array.from({ length: 7 }, (_, i) => { const a = -Math.PI + (i / 6) * Math.PI; return <g key={i}><circle cx={860 + Math.cos(a) * 90 * sp} cy={790 + Math.sin(a) * 80 * sp} r={9 * (1 - sp)} fill="#8fd8ff" />
              <Conidio x={860 + Math.cos(a) * 140 * sp - 120 * sp} y={790 + Math.sin(a) * 60 * sp} s={0.9} /></g>; })}
          </g>; })()}
        </>)}
      </Escena>
      {/* 3 · por dentro: el hilo baja por un estambre hasta el receptáculo (lo que será la fresa) */}
      <Escena T={T} a={K.Et} b={K.Sp} zoom={0.05}>
        <FondoMicro T={T} />
        {fsvg(<FlorCorte T={T} x={520} y={900} s={1.45} esporas={kprog(T, K.Et + 0.2, K.Et + 0.8)} hifa={kprog(T, K.Et + 0.9, K.Et + 3.4)} />)}
      </Escena>
      {/* 4 · espera: la flor se vuelve fresa verde y el hongo duerme adentro */}
      <Escena T={T} a={K.Sp} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.Sp + 1.8 && <g opacity={1 - kprog(T, K.Sp + 1.2, K.Sp + 1.8)}><FlorFresa T={T} x={480} y={840} s={1.7} petalos={1 - kprog(T, K.Sp + 0.2, K.Sp + 1.3)} /></g>}
          {T > K.Sp + 1.0 && <g opacity={kprog(T, K.Sp + 1.0, K.Sp + 1.6)}>
            <Fresa T={T} x={480} y={880} s={1.75 * klerp(0.6, 1, kprog(T, K.Sp + 1.0, K.Sp + 2.4, kEase.sale))} madurez={0} seed={11} />
            <g transform="translate(480 900)" opacity={kprog(T, K.Sp + 1.8, K.Sp + 2.3)}>
              <circle r={92} fill={KC.noche} stroke="#fff" strokeWidth={7} strokeDasharray="16 10" />
              <path d="M -60 30 Q -30 0 0 10 Q 30 20 56 -20 M 0 10 Q 6 40 30 50" stroke={BC.hifa} strokeWidth={6} fill="none" strokeLinecap="round" />
              {[0, 1, 2].map((i) => { const u = ((T * 0.5 + i / 3) % 1); return <text key={i} x={30 + u * 40} y={-10 - u * 60} style={{ font:`400 ${28 + u * 20}px ${KF.titulo}` }} fill="#fff" opacity={1 - u}>z</text>; })}
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={280} y={1000} /><Fresa T={T} x={300} y={1120} s={0.7} madurez={0} seed={11} /></>)}
      </Escena>
      {/* 6 · madura: más azúcar, cambian sus defensas y el hongo despierta */}
      <Escena T={T} a={K.M} b={K.Pe} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Fresa T={T} x={540} y={900} s={1.9} madurez={madura} seed={11} />
          <g transform="translate(560 930)" opacity={kprog(T, K.M + 2.4, K.M + 2.8)}>
            <circle r={100} fill={KC.noche} stroke="#fff" strokeWidth={7} strokeDasharray="16 10" />
            {(() => { const w = kprog(T, K.M + 2.8, K.Pe); return <g>
              <path d="M -66 30 Q -30 0 0 10 Q 30 20 60 -20 M 0 10 Q 6 40 30 56" stroke={BC.hifa} strokeWidth={6} fill="none" strokeLinecap="round" />
              {[[-30, 5, -50, -40], [20, 15, 40, 60], [40, -5, 70, 30], [-50, 20, -76, 60]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${klerp(a, c, w)} ${klerp(b, d, w)}`} stroke={BC.hifa} strokeWidth={5} strokeLinecap="round" />)}
            </g>; })()}
          </g>
          <g transform="translate(860 1080)" opacity={kprog(T, K.M + 1.6, K.M + 2.0)}>
            <path d="M 0 -80 L 70 -55 L 62 30 Q 40 80 0 100 Q -40 80 -62 30 L -70 -55 Z" fill={mixHex('#3fbf4a', '#c9c9c2', kprog(T, K.M + 2.0, K.M + 3.2))} stroke={KC.ink} strokeWidth={7} />
            <path d="M -30 0 L 30 20 M -10 -40 L 20 50" stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.M + 2.4, K.M + 3.2)} />
          </g>
        </>)}
      </Escena>
      {/* 7 · la pudre y le sale la pelusa → al microscopio: conidióforos ramificados con racimitos de conidios */}
      <Escena T={T} a={K.Pe} b={micro} zoom={0.12} origen="55% 45%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<Fresa T={T} x={540} y={880} s={1.9} madurez={1} moho={kprog(T, K.Pe, K.Pe + 1.1)} blanda={kprog(T, K.Pe, K.Pe + 1.1)} seed={11} lado={1} />)}
      </Escena>
      <Escena T={T} a={micro} b={K.V} zoom={0.05}>
        <FondoMicro T={T} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={120} fill="#7a2a2a" opacity=".85" />
          <Conidioforo x={300} y={1130} alto={430} s={0.8} p={kprog(T, micro + 0.1, micro + 1.6)} />
          <Conidioforo x={780} y={1130} alto={460} s={0.85} p={kprog(T, micro + 0.3, micro + 1.8)} />
          <Conidioforo x={540} y={1130} alto={520} s={1.05} p={kprog(T, micro, micro + 1.5)} />
          {T > micro + 1.8 && <g transform="translate(160 560)" opacity={kprog(T, micro + 1.8, micro + 2.2)}>
            <circle r={78} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <RacimoUvas T={T} x={0} y={-20} s={0.3} />
          </g>}
        </>)}
      </Escena>
      {/* 8 · contagia a las vecinas: por contacto y con esporas al aire */}
      <Escena T={T} a={K.V} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cajita T={T} x={520} y={960} s={1.2} moho={[kprog(T, K.V + 1.6, K.V + 3.8) * 0.8, 1, kprog(T, K.V + 1.0, K.V + 3.2) * 0.8, kprog(T, K.V + 2.2, K.V + 4.2) * 0.7, kprog(T, K.V + 2.8, K.V + 4.4) * 0.5]} />
          {contagio > 0 && <g>{[[520, 900, 360, 920], [520, 900, 690, 920]].map(([x1, y1, x2, y2], i) => <path key={i} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 40} ${klerp(x1, x2, contagio)} ${klerp(y1, y2, contagio)}`} stroke={BC.hifa} strokeWidth={7} fill="none" strokeLinecap="round" style={{ filter:'drop-shadow(0 0 4px #000)' }} />)}</g>}
          <Nube x={520} y={840} p={kprog(T, K.V + 2.2, K.V + 4.4)} />
        </>)}
      </Escena>
      {/* 9 · el estudio: Florida, 1999–2001. La flor es más vulnerable que la fresa verde */}
      <Escena T={T} a={K.E} b={K.E2} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(T > K.E + 2.3 && <g opacity={kprog(T, K.E + 2.3, K.E + 2.8)}>
          <FlorFresa T={T} x={270} y={960} s={1.25} punto={kprog(T, K.E + 3.0, K.E + 3.4)} />
          <text x={540} y={1000} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={9}>&gt;</text>
          <Fresa T={T} x={800} y={970} s={1.05} madurez={0} seed={11} />
        </g>)}
      </Escena>
      {/* 10 · sin estambres, menos pudrición (barras esquemáticas, sin cifras) */}
      <Escena T={T} a={K.E2} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {T < K.E2 + 2.2 && <g opacity={1 - kprog(T, K.E2 + 1.8, K.E2 + 2.2)}>
            <g transform="translate(540 820)"><g transform="translate(-540 -820)"><FlorFresa T={T} x={540} y={820} s={1.6} /></g></g>
            {(() => { const c = kprog(T, K.E2 + 0.4, K.E2 + 1.2); return <g transform={`translate(${klerp(900, 640, c)} ${klerp(560, 760, c)}) rotate(${Math.sin(T * 18) * 12 * c})`}>
              <path d="M 0 0 L 90 -30 M 0 0 L 90 30" stroke="#c0c6cc" strokeWidth={12} strokeLinecap="round" />
              <circle cx={-26} cy={-22} r={20} fill="none" stroke={KC.red} strokeWidth={10} /><circle cx={-26} cy={22} r={20} fill="none" stroke={KC.red} strokeWidth={10} /></g>; })()}
          </g>}
          {T > K.E2 + 1.9 && <g opacity={kprog(T, K.E2 + 1.9, K.E2 + 2.3)}>
            <line x1={160} y1={1130} x2={920} y2={1130} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            {[[340, 380, BC.gris3], [740, 200, BC.gris2]].map(([cx, h, col], i) => { const hh = h * kprog(T, K.E2 + 2.2 + i * 0.4, K.E2 + 3.0 + i * 0.4, kEase.sale);
              return <rect key={i} x={cx - 110} y={1130 - hh} width={220} height={hh} rx={14} fill={col} stroke={KC.ink} strokeWidth={6} />; })}
          </g>}
        </>)}
      </Escena>
      {/* 11 · uvas: noches húmedas, días secos → podredumbre noble y vinos dulces */}
      <Escena T={T} a={K.N} b={K.C} zoom={0.04}>
        <FondoLunares color={T < K.N + 1.8 ? '#7f8fd9' : KC.yellow} />
        {fsvg(<>
          {T < K.N + 2.1 && <g opacity={1 - kprog(T, K.N + 1.6, K.N + 2.1)}>
            <circle cx={820} cy={520} r={70} fill="#fff6c8" stroke={KC.ink} strokeWidth={6} /><circle cx={850} cy={500} r={62} fill="#7f8fd9" />
            {[0, 1, 2].map((i) => <rect key={i} x={-200 + ((T * 60 + i * 300) % 1300)} y={760 + i * 120} width={420} height={50} rx={25} fill="#fff" opacity=".55" />)}
          </g>}
          {T > K.N + 1.6 && <g opacity={kprog(T, K.N + 1.6, K.N + 2.1)} transform={`rotate(${T * 20} 830 520)`}>
            {Array.from({ length: 10 }, (_, i) => <line key={i} x1={830} y1={520} x2={830 + Math.cos(i * 0.628) * 120} y2={520 + Math.sin(i * 0.628) * 120} stroke={KC.orange} strokeWidth={10} strokeLinecap="round" />)}
            <circle cx={830} cy={520} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /></g>}
          <RacimoUvas T={T} x={360} y={700} s={1.05} pasa={pasa} moho={kprog(T, K.N + 1.0, K.N + 2.2) * 0.8} />
          {[[200, 'Sauternes'], [420, 'Tokaji']].map(([bx], i) => { const on = kprog(T, K.N + 4.1 + i * 0.4, K.N + 4.5 + i * 0.4, kEase.rebote); return on > 0 ? <Botella key={i} x={bx} y={1060} s={0.75 * on} vino={i ? '#d98a1f' : '#f0b83a'} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma cajita, y en la fresa con pelusa aparece la flor de la que salió */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cajita T={T} x={520} y={960} s={1.2} moho={[0, 1, 0, 0, 0]} />
          <g opacity={0.75 * kprog(T, K.C + 0.8, K.C + 1.6)} transform={`translate(520 ${880 - 30 * kprog(T, K.C + 0.8, K.C + 2.4)})`}>
            <FlorFresa T={T} x={0} y={0} s={0.9 * klerp(0.6, 1, kprog(T, K.C + 0.8, K.C + 1.6, kEase.rebote))} punto={1} />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.1} until={K.G + 2.7} texto="¿llegó anoche?" x={330} y={520} tam={48} />
      <Chip T={T} at={K.G + 3.6} until={K.H - 0.3} texto="desde la flor" x={300} y={760} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.H + 0.4} until={K.Es - 0.3} x={60} y={480} texto="moho gris" tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 0.8} until={K.Es - 0.3} x={60} y={540} texto="Botrytis cinerea" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.H + 2.4} until={K.Es - 0.3} texto="cientos de plantas" x={540} y={960} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Es + 0.6} until={K.Et - 0.3} x={60} y={560} texto="viento" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.6} until={K.Et - 0.3} x={1030} y={520} lado="izq" texto="salpicaduras" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Es + 2.4} until={K.Et - 0.3} x={60} y={1080} texto="esporas que germinan" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Et + 0.2} until={K.Sp - 0.3} texto="POR DENTRO · flor de fresa" x={420} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Et + 0.8} until={K.Sp - 0.3} x={60} y={560} texto="estambre" tam={32} color={BC.antera} />
      <Etq T={T} at={K.Et + 1.6} until={K.Sp - 0.3} x={60} y={1120} texto="hilos del hongo (hifas)" tam={30} color={BC.hifa} />
      <Etq T={T} at={K.Et + 2.4} until={K.Sp - 0.3} x={1040} y={1100} lado="izq" texto="receptáculo → la fresa" tam={30} color={BC.recept} />
      <Chip T={T} at={K.Et + 2.8} until={K.Sp - 0.3} texto="esquemático" x={860} y={1170} tam={24} borde={KC.white} mono />
      <Chip T={T} at={K.Sp + 2.2} until={K.P - 0.3} texto="sin síntomas" x={760} y={600} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Sp + 1.6} until={K.P - 0.3} x={60} y={1150} texto="fresa verde" tam={32} color={KC.ink} />
      <Medidor T={T} at={K.M + 0.4} until={K.Pe - 0.3} valor={(t) => klerp(0.25, 0.9, kprog(t, K.M + 0.4, K.M + 2.6, kEase.suave))} etiqueta="azúcar" texto={() => '▲'} x={90} y={450} ancho={900} color={KC.pink} />
      <Etq T={T} at={K.M + 2.0} until={K.Pe - 0.3} x={780} y={1080} lado="izq" texto="defensas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 3.0} until={K.Pe - 0.3} texto="hipótesis: se cree" x={540} y={600} tam={36} borde={KC.lilac} />
      <Chip T={T} at={micro + 0.1} until={K.V - 0.3} texto="AL MICROSCOPIO · la pelusa" x={460} y={470} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={micro + 1.0} until={K.V - 0.3} x={60} y={1060} texto="conidióforo (tallito)" tam={28} color={KC.texto} />
      <Etq T={T} at={micro + 1.6} until={K.V - 0.3} x={1040} y={780} lado="izq" texto="esporas (conidios)" tam={28} color={BC.conidio} />
      <Chip T={T} at={K.V + 0.8} until={K.E - 0.3} texto="contacto" x={300} y={1150} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.V + 2.4} until={K.E - 0.3} texto="esporas al aire" x={360} y={480} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.2} anio="1999–2001" quien="Florida, EE. UU. · Universidad de Florida" revista="Mertely y cols. · Plant Disease, 2002" y={760} />
      <Chip T={T} at={K.E + 2.8} until={K.E2 - 0.3} texto="más vulnerable" x={270} y={760} tam={34} borde={KC.red} />
      <Etq T={T} at={K.E + 2.9} until={K.E2 - 0.3} x={60} y={1150} texto="flor" tam={32} color={KC.ink} />
      <Etq T={T} at={K.E + 3.1} until={K.E2 - 0.3} x={1040} y={1150} lado="izq" texto="fresa verde" tam={32} color={KC.ink} />
      <Chip T={T} at={K.E2 + 0.6} until={K.E2 + 1.9} texto="quitar los estambres" x={420} y={500} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.E2 + 2.0} until={K.N - 0.3} texto="fresas podridas" x={420} y={500} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.E2 + 2.3} until={K.N - 0.3} x={230} y={1180} texto="con estambres" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E2 + 2.7} until={K.N - 0.3} x={630} y={1180} texto="sin estambres" tam={28} color={KC.ink} />
      <Chip T={T} at={K.E2 + 3.0} until={K.N - 0.3} texto="temporada 2000–2001 · esquemático" x={540} y={600} tam={26} borde={KC.white} mono />
      <Etq T={T} at={K.N + 0.4} until={K.N + 1.8} x={60} y={480} texto="noches húmedas" tam={34} color={KC.texto} />
      <Etq T={T} at={K.N + 2.0} until={K.C - 0.3} x={60} y={480} texto="días secos" tam={34} color={KC.ink} />
      <Chip T={T} at={K.N + 2.8} until={K.C - 0.3} texto="podredumbre noble" x={400} y={560} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.N + 3.4} until={K.C - 0.3} x={60} y={640} texto="el mismo Botrytis cinerea" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.N + 4.3} until={K.C - 0.3} x={60} y={1180} texto="Sauternes (Francia)" tam={26} color={KC.ink} />
      <Etq T={T} at={K.N + 4.7} until={K.C - 0.3} x={290} y={1225} texto="Tokaji (Hungría)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="esperó desde la flor" x={400} y={500} tam={38} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="1 cm" largo={98} />
      <BarraEscala T={T} at={K.H} until={K.Es} texto="1 cm" largo={103} />
      <BarraEscala T={T} at={K.Es} until={K.Et} texto="1 cm" largo={170} />
      <BarraEscala T={T} at={K.Et} until={K.Sp} texto="1 mm" largo={150} color={KC.texto} />
      <BarraEscala T={T} at={K.Sp} until={K.P} texto="1 cm" largo={117} />
      <BarraEscala T={T} at={K.P} until={K.M} texto="1 cm" largo={47} />
      <BarraEscala T={T} at={K.M} until={micro} texto="1 cm" largo={127} />
      <BarraEscala T={T} at={micro} until={K.V} texto="20 µm" largo={64} />
      <BarraEscala T={T} at={K.V} until={K.E} texto="1 cm" largo={98} />
      <BarraEscala T={T} at={K.E} until={K.E2} texto="1 cm" largo={84} />
      <BarraEscala T={T} at={K.E2} until={K.N} texto="1 cm" largo={160} />
      <BarraEscala T={T} at={K.N} until={K.C} texto="1 cm" largo={60} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={98} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No llegó anoche: *entró por la flor.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Es - 0.1} texto="*Botrytis cinerea:* el moho gris." />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.Et - 0.1} texto="Sus esporas *germinan en la flor.*" />
      <Subtitulo T={T} idx={3} at={K.Et + 0.1} until={K.Sp - 0.1} texto="Bajan por *los estambres.*" />
      <Subtitulo T={T} idx={4} at={K.Sp + 0.1} until={K.P - 0.1} texto="Y se queda *quieto.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.M - 0.1} texto="¿Qué *lo despierta?*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.Pe - 0.1} texto="Que la fresa *madure.*" />
      <Subtitulo T={T} idx={7} at={K.Pe + 0.1} until={K.V - 0.1} texto="Tallitos con esporas *en racimitos.*" />
      <Subtitulo T={T} idx={8} at={K.V + 0.1} until={K.E - 0.1} texto="Contagia *a las vecinas.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.E2 - 0.1} texto="La flor, *más vulnerable.*" />
      <Subtitulo T={T} idx={10} at={K.E2 + 0.1} until={K.N - 0.1} texto="Sin estambres, *menos pudrición.*" />
      <Subtitulo T={T} idx={11} at={K.N + 0.1} until={K.C - 0.1} texto="En uvas: *podredumbre noble.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Pudo esperar *desde la flor.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.8, K.Es - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Et + 0.8, K.Sp - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.M + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [micro + 0.4, K.V - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.E + 2.6, K.E2 - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.E2 + 0.4, K.N - 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.N + 3.9, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="49" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BotrytisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BotrytisShot /></CompositionStage></div>;
}
window.BotrytisApp = BotrytisApp;
