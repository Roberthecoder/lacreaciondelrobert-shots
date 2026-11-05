// Shot Fungi Mati #131 · Ese anillo morado es un animal defendiéndose de un hongo de tierra — NARRADO (N1 Por dentro).
// Gancho 1 «Esto no es X: es Y». Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (mapas, árbol genético, células).

const AX = { fan:'#9b5cc9', fan2:'#7a3fa8', fanOsc:'#4e1f73', anillo:'#5a0f7a', eje:'#d9c7a3', eje2:'#a8916a', arena:'#f4dc9a',
  tejido:'#e58aa6', tejido2:'#b85a7a', hifa:'#f2f0e6', melanina:'#2a1609', ameba:'#ffd36b', conidio:'#2fa98a', conidio2:'#1d7a63',
  tierra:'#8a5a2b', tierra2:'#6b421d', polvo:'#e9b860', mar:'#1fb8e6', tierraMapa:'#ffe9a8' };

// ---------- Abanico de mar (Gorgonia ventalina): red plana de ramitas unidas, sale de un pie en la roca ----------
// Se genera una sola vez (determinista). lesion = {x, y, r} en coordenadas locales (0,0 = pie). sano 0..1 = joven/limpio.
const FAN = (() => {
  const R = krng(131), ramas = [], uniones = [];
  const N = 11;
  for (let i = 0; i < N; i++) {
    const a = -1.15 + (2.3 * i) / (N - 1) + (R() - 0.5) * 0.08;
    const L = 520 + R() * 120 - Math.abs(a) * 110;
    const pts = [];
    for (let k = 0; k <= 10; k++) { const u = k / 10, w = Math.sin(u * 5 + i) * 10 * u; pts.push([Math.sin(a) * L * u + w, -Math.cos(a) * L * u * 0.98 - 40 * u]); }
    ramas.push(pts);
  }
  for (let i = 0; i < N - 1; i++) for (let k = 2; k <= 10; k++) {
    const A = ramas[i][k], B = ramas[i + 1][Math.min(10, k + (R() < 0.5 ? 0 : -1))];
    uniones.push([A, B, (R() - 0.5) * 18]);
    if (k < 10 && R() < 0.6) { const A2 = ramas[i][k], B2 = ramas[i + 1][k + 1]; uniones.push([[(A2[0] + ramas[i][k + 1][0]) / 2, (A2[1] + ramas[i][k + 1][1]) / 2], [(B[0] + B2[0]) / 2, (B[1] + B2[1]) / 2], (R() - 0.5) * 14]); }
  }
  return { ramas, uniones };
})();
function Abanico({ T, x, y, s = 1, lesion, color = AX.fan, fase = 0 }) {
  const rot = Math.sin(T * 0.9 + fase) * 3.2;
  const d = (pts) => 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const dentro = (p) => lesion && Math.hypot(p[0] - lesion.x, p[1] - lesion.y) < lesion.r * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {FAN.uniones.map(([A, B, c], i) => { const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2 + c; const muerto = dentro([mx, my]);
      return <path key={'u' + i} d={`M ${A[0]} ${A[1]} Q ${mx} ${my} ${B[0]} ${B[1]}`} stroke={muerto ? AX.eje2 : color} strokeWidth={muerto ? 3 : 6} fill="none" />; })}
    {FAN.ramas.map((p, i) => <path key={'r' + i} d={d(p)} stroke={AX.fanOsc} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    {FAN.ramas.map((p, i) => <path key={'q' + i} d={d(p)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />)}
    {lesion && <g>
      <circle cx={lesion.x} cy={lesion.y} r={lesion.r} fill="none" stroke={AX.anillo} strokeWidth={lesion.r * 0.38} opacity=".92" />
      <circle cx={lesion.x} cy={lesion.y} r={lesion.r * 0.62} fill={AX.eje} opacity=".85" />
      {[-1, 0, 1].map((k) => <path key={k} d={`M ${lesion.x - lesion.r * 0.55} ${lesion.y + k * lesion.r * 0.3} Q ${lesion.x} ${lesion.y + k * lesion.r * 0.3 - 8} ${lesion.x + lesion.r * 0.55} ${lesion.y + k * lesion.r * 0.3}`} stroke={AX.eje2} strokeWidth={3} fill="none" />)}
    </g>}
    <path d="M -40 10 Q 0 -30 40 10 Z" fill={AX.fanOsc} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Fondo del arrecife: agua cian con rayos de luz, arena y unas rocas.
function Arrecife({ T, burbujas = true }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#5fe3ff 0%, #12b6e6 55%, #0a8fc0 100%)' }}></div>
    {fsvg(<>
      {[0, 1, 2, 3].map((i) => <polygon key={i} points={`${120 + i * 260 + Math.sin(T * 0.4 + i) * 30},0 ${220 + i * 260 + Math.sin(T * 0.4 + i) * 30},0 ${60 + i * 300},1500 ${-60 + i * 300},1500`} fill="#ffffff" opacity=".1" />)}
      <path d="M 0 1330 Q 270 1270 540 1310 Q 820 1350 1080 1290 L 1080 1920 L 0 1920 Z" fill={AX.arena} stroke={KC.ink} strokeWidth={6} />
      <path d="M 80 1330 Q 120 1240 220 1250 Q 300 1260 320 1320 Z" fill="#7d8a96" stroke={KC.ink} strokeWidth={6} />
      <path d="M 700 1320 Q 760 1230 880 1240 Q 980 1260 1000 1300 Z" fill="#6f7c88" stroke={KC.ink} strokeWidth={6} />
    </>, 2)}
    {burbujas && <Ambiente T={T} n={16} seed={9} color="rgba(255,255,255,.45)" tam={[5, 12]} vel={-26} />}
  </>;
}
// Pólipo de octocoral: 8 tentáculos con pínulas (como plumitas). abre 0..1.
function Polipo({ x, y, s = 1, abre = 1, rot = 0 }) {
  const a = abre;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -22 0 L -16 ${-60 * a} L 16 ${-60 * a} L 22 0 Z`} fill="#f7d6e6" stroke={KC.ink} strokeWidth={4} />
    {a > 0.05 && Array.from({ length: 8 }, (_, i) => { const ang = (-80 + i * (160 / 7)) * Math.PI / 180, L = 70 * a;
      const ex = Math.sin(ang) * L, ey = -60 * a - Math.cos(ang) * L;
      return <g key={i}>
        <line x1={0} y1={-60 * a} x2={ex} y2={ey} stroke="#fff2f8" strokeWidth={7} strokeLinecap="round" />
        {[0.35, 0.55, 0.75, 0.92].map((k, j) => { const px = ex * k, py = -60 * a + (ey + 60 * a) * k, nx = Math.cos(ang) * 12 * a, ny = Math.sin(ang) * 12 * a;
          return <g key={j}><line x1={px} y1={py} x2={px + nx} y2={py + ny} stroke="#fff2f8" strokeWidth={3} /><line x1={px} y1={py} x2={px - nx} y2={py - ny} stroke="#fff2f8" strokeWidth={3} /></g>; })}
      </g>; })}
  </g>;
}
// Conidio de Aspergillus: redondo y rugoso (puntitos en el borde).
function Conidio({ x, y, r = 9, c = AX.conidio }) {
  return <g><circle cx={x} cy={y} r={r} fill={c} stroke={KC.ink} strokeWidth={2} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={x + Math.cos(k * 0.785) * r} cy={y + Math.sin(k * 0.785) * r} r={1.8} fill={KC.ink} />)}</g>;
}
// Conidióforo de Aspergillus sydowii: pie largo, vesícula redonda, métulas, fiálides y cadenas de conidios (cabeza biseriada).
function Conidioforo({ T, x, y, s = 1, crece = 1 }) {
  const h = 300 * kclamp(crece * 1.6, 0, 1), cab = kclamp(crece * 2.2 - 1.0, 0, 1);
  const cy = -h - 40;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -10 0 Q -14 ${-h * 0.5} -8 ${-h} L 8 ${-h} Q 12 ${-h * 0.5} 10 0 Z`} fill="#f2efe2" stroke={KC.ink} strokeWidth={4} />
    {cab > 0 && <g opacity={kclamp(cab * 3, 0, 1)}>
      {Array.from({ length: 11 }, (_, i) => { const ang = (-150 + i * 30) * Math.PI / 180; const ux = Math.cos(ang), uy = Math.sin(ang);
        const m0 = [ux * 44, cy + uy * 44], m1 = [ux * 70, cy + uy * 70];
        return <g key={i}>
          <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke="#cfe8d9" strokeWidth={14} strokeLinecap="round" />
          {[-0.18, 0.18].map((da, j) => { const ux2 = Math.cos(ang + da), uy2 = Math.sin(ang + da); const f1 = [m1[0] + ux2 * 26, m1[1] + uy2 * 26];
            const n = Math.floor(6 * cab);
            return <g key={j}>
              <line x1={m1[0]} y1={m1[1]} x2={f1[0]} y2={f1[1]} stroke="#a9dcc2" strokeWidth={8} strokeLinecap="round" />
              {Array.from({ length: n }, (_, k) => <Conidio key={k} x={f1[0] + ux2 * (14 + k * 18)} y={f1[1] + uy2 * (14 + k * 18)} r={8} c={k % 2 ? AX.conidio : AX.conidio2} />)}
            </g>; })}
        </g>; })}
      <circle cx={0} cy={cy} r={46} fill="#e6f4ea" stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Hifas tabicadas que crecen ramificándose. p 0..1 = cuánto han crecido.
const HIF = [
  'M 120 760 Q 300 800 420 880 Q 560 960 700 1000 Q 820 1030 960 1010',
  'M 420 880 Q 470 780 560 730 Q 640 690 720 650',
  'M 700 1000 Q 720 1080 790 1130',
  'M 300 820 Q 260 930 300 1040',
  'M 560 730 Q 600 640 580 560',
];
function Hifas({ p = 1, w = 9 }) {
  return <g>{HIF.map((d, i) => { const q = kclamp(p * 1.6 - i * 0.15, 0, 1); return q > 0 ? <g key={i}>
    <path d={d} stroke={AX.hifa} strokeWidth={w} fill="none" strokeLinecap="round" pathLength={100} strokeDasharray={`${q * 100} 100`} />
    <path d={d} stroke="#6b6658" strokeWidth={w + 2} fill="none" pathLength={100} strokeDasharray="0.6 6.4" opacity={q >= 1 ? 0.9 : 0} />
  </g> : null; })}</g>;
}
// Amebocito (célula de defensa): redonda, con gránulos.
function Amebocito({ x, y, r = 22 }) {
  return <g><circle cx={x} cy={y} r={r} fill={AX.ameba} stroke={KC.ink} strokeWidth={3} />
    {[[-7, -6], [6, -8], [0, 5], [-9, 7], [9, 5]].map(([a, b], i) => <circle key={i} cx={x + a * r / 22} cy={y + b * r / 22} r={3} fill="#c4801c" />)}</g>;
}
// Sello rectangular (palabras largas como HIPÓTESIS).
function SelloRect({ T, at, x, y, texto, color = KC.red, tam = 70, rot = -8 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), w = texto.length * tam * 0.5 + 60;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-tam * 0.85} width={w} height={tam * 1.5} rx={14} fill="rgba(255,255,255,.75)" stroke={color} strokeWidth={10} />
    <text y={tam * 0.3} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:2 }} fill={color}>{texto}</text>
  </g>;
}
// Mapa esquemático del Atlántico: América a la izquierda, África a la derecha.
function MapaAtlantico() {
  return <g>
    <rect x={0} y={380} width={1080} height={900} fill={AX.mar} />
    <path d="M 0 380 L 330 380 Q 300 470 250 520 Q 230 560 270 600 Q 320 640 330 720 Q 335 760 310 770 Q 280 740 250 700 Q 180 690 130 720 Q 90 760 110 820 Q 140 830 170 800 Q 190 840 160 900 Q 200 960 250 990 Q 300 1000 340 1010 Q 450 1020 560 1080 Q 600 1150 560 1280 L 0 1280 Z" fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[[360, 830, 60, 14], [450, 850, 30, 12], [500, 860, 18, 10], [540, 880, 10, 8], [560, 910, 8, 8], [590, 960, 8, 8]].map(([a, b, rx, ry], i) => <ellipse key={i} cx={a} cy={b} rx={rx} ry={ry} fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 1080 380 L 760 380 Q 700 460 690 540 Q 640 600 640 690 Q 660 760 730 800 Q 800 820 860 860 Q 900 960 920 1080 Q 960 1200 1000 1280 L 1080 1280 Z" fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <text x={880} y={600} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#9a7a30">SAHARA</text>
    <text x={150} y={470} style={{ font:`700 26px ${KF.mono}` }} fill="#7a6a40">AMÉRICA</text>
    <text x={880} y={1000} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#7a6a40">ÁFRICA</text>
    <text x={470} y={790} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#063a52">CARIBE</text>
    <text x={500} y={600} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#0a5878">océano Atlántico</text>
  </g>;
}
// Nube de polvo que cruza el Atlántico (de África al Caribe). p 0..1.
function NubePolvo({ T, p }) {
  if (p <= 0) return null;
  const R = krng(7);
  return <g>{Array.from({ length: 34 }, (_, i) => { const u = R(), q = kclamp(p * 1.4 - u * 0.4, 0, 1);
    const x = klerp(820, 380, q) + (R() - 0.5) * 120 + Math.sin(T * 1.3 + i) * 8, y = klerp(640, 820, q) + (R() - 0.5) * 100;
    return q > 0 ? <circle key={i} cx={x} cy={y} r={14 + R() * 22} fill={AX.polvo} opacity={0.5} /> : null; })}</g>;
}
// Árbol genético esquemático: hojas "abanico" (morado) mezcladas con hojas "ambiente" (café).
const HOJAS = ['a', 'm', 'm', 'a', 'm', 'a', 'a', 'm', 'a', 'm', 'm', 'a'];
function Arbol({ x, y, p = 1 }) {
  const n = HOJAS.length, dx = 74;
  const nodos = [];
  return <g transform={`translate(${x} ${y})`} opacity={kclamp(p * 2, 0, 1)}>
    {HOJAS.map((t, i) => { const lx = i * dx; const pair = Math.floor(i / 2) * 2 * dx + dx / 2;
      return <g key={i}>
        <line x1={lx} y1={0} x2={lx} y2={-60} stroke={KC.ink} strokeWidth={5} />
        <circle cx={lx} cy={20} r={20} fill={t === 'a' ? AX.fan : AX.tierra} stroke={KC.ink} strokeWidth={4} opacity={kclamp(p * 3 - i * 0.1, 0, 1)} />
      </g>; })}
    {[0, 1, 2, 3, 4, 5].map((k) => <line key={'p' + k} x1={k * 2 * dx} y1={-60} x2={k * 2 * dx + dx} y2={-60} stroke={KC.ink} strokeWidth={5} />)}
    {[0, 1, 2, 3, 4, 5].map((k) => <line key={'v' + k} x1={k * 2 * dx + dx / 2} y1={-60} x2={k * 2 * dx + dx / 2} y2={-110 - (k % 2) * 30} stroke={KC.ink} strokeWidth={5} />)}
    {[0, 1, 2].map((k) => <g key={'s' + k}>
      <line x1={k * 4 * dx + dx / 2} y1={-110} x2={k * 4 * dx + 2.5 * dx} y2={-110} stroke={KC.ink} strokeWidth={5} />
      <line x1={k * 4 * dx + 2.5 * dx} y1={-140} x2={k * 4 * dx + 2.5 * dx} y2={-110} stroke={KC.ink} strokeWidth={5} />
      <line x1={k * 4 * dx + 1.5 * dx} y1={-110} x2={k * 4 * dx + 1.5 * dx} y2={-180} stroke={KC.ink} strokeWidth={5} />
    </g>)}
    <line x1={1.5 * dx} y1={-180} x2={9.5 * dx} y2={-180} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2].map((k) => <line key={'w' + k} x1={k * 4 * dx + 1.5 * dx} y1={-180} x2={k * 4 * dx + 1.5 * dx} y2={-180} />)}
  </g>;
}
// Muestra de polvo (filtro redondo) con ✗.
function Filtro({ x, y, tache = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={34} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    <circle r={22} fill={AX.polvo} opacity=".7" />
    {tache > 0 && <path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={tache} transform={`scale(${klerp(1.6, 1, tache)})`} />}
  </g>;
}
// Mapa del Caribe (esquemático): Florida y sus Cayos, Cuba, la península de Yucatán.
function MapaCaribe({ flo = 0, yuc = 0 }) {
  return <g>
    <rect x={0} y={380} width={1080} height={900} fill={AX.mar} />
    <path d="M 0 380 L 1080 380 L 1080 420 Q 760 420 700 460 Q 660 520 690 600 Q 720 680 700 740 Q 680 770 650 740 Q 600 660 560 600 Q 520 560 440 560 Q 300 560 200 600 Q 120 640 80 720 Q 60 800 80 880 L 0 880 Z" fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 880 L 80 880 Q 120 980 180 1010 Q 230 1040 300 1000 Q 330 960 320 880 Q 300 830 250 820 Q 230 860 200 900 Q 170 960 140 1060 Q 150 1160 200 1280 L 0 1280 Z" fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 420 860 Q 520 820 640 830 Q 760 840 880 900 Q 900 920 860 925 Q 760 905 650 880 Q 530 880 440 885 Z" fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={5} />
    {[[640, 780], [610, 795], [580, 805], [550, 812], [520, 816]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill={AX.tierraMapa} stroke={KC.ink} strokeWidth={3} />)}
    {flo > 0 && <circle cx={590} cy={800} r={70 * kEase.rebote(kclamp(flo, 0, 1))} fill="none" stroke={KC.red} strokeWidth={9} />}
    {yuc > 0 && <circle cx={250} cy={930} r={95 * kEase.rebote(kclamp(yuc, 0, 1))} fill="none" stroke={KC.red} strokeWidth={9} />}
    <text x={720} y={540} style={{ font:`700 28px ${KF.mono}` }} fill="#7a6a40">FLORIDA</text>
    <text x={660} y={960} style={{ font:`700 24px ${KF.mono}` }} fill="#7a6a40">CUBA</text>
    <text x={20} y={1150} style={{ font:`700 24px ${KF.mono}` }} fill="#7a6a40">MÉXICO</text>
    <text x={380} y={720} style={{ font:`700 24px ${KF.mono}` }} fill="#0a5878">golfo de México</text>
    <text x={560} y={1080} style={{ font:`700 26px ${KF.mono}` }} fill="#0a5878">mar Caribe</text>
  </g>;
}
// Abanico chiquito (íconos de conteo).
function MiniAbanico({ x, y, s = 1, enfermo = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -25, 0, 25, 50].map((a, i) => <line key={i} x1={0} y1={0} x2={Math.sin(a * Math.PI / 180) * 90} y2={-Math.cos(a * Math.PI / 180) * 90} stroke={AX.fan} strokeWidth={8} strokeLinecap="round" />)}
    {[40, 65].map((r, i) => <path key={i} d={`M ${-Math.sin(0.87) * r} ${-Math.cos(0.87) * r} A ${r} ${r} 0 0 1 ${Math.sin(0.87) * r} ${-Math.cos(0.87) * r}`} stroke={AX.fan} strokeWidth={5} fill="none" />)}
    {enfermo && <><circle cx={10} cy={-55} r={20} fill="none" stroke={AX.anillo} strokeWidth={9} /><circle cx={10} cy={-55} r={11} fill={AX.eje} /></>}
    <path d="M -14 4 Q 0 -10 14 4 Z" fill={AX.fanOsc} />
  </g>;
}
// Silueta de persona.
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={70} fill="#5a3a8a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -130 0 Q -130 -200 0 -210 Q 130 -200 130 0 Z" fill="#5a3a8a" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

const LES = { x: -60, y: -330, r: 46 };        // la lesión, en coordenadas del abanico
function AbanicoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Animal, H: CUES.Hongo, Hi: CUES.Hifas, D: CUES.Defensa, An: CUES.Anillo, P: CUES.Pregunta, Po: CUES.Polvo, Co: CUES.Contra, F: CUES.Florida, Y: CUES.Yucatan, Hu: CUES.Humanos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.5;
  const lupaG = kprog(T, K.G + 0.25, K.G + 0.9, kEase.rebote);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el abanico en el arrecife, la lupa sobre el anillo morado */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.06} origen="30% 45%">
        <Arrecife T={T} />
        {fsvg(<>
          <Abanico T={T} x={330} y={1300} s={1.05} lesion={LES} />
          {lupaG > 0 && <g transform={`translate(${330 + LES.x * 1.05} ${1300 + LES.y * 1.05}) scale(${lupaG})`}>
            <circle r={120} fill="rgba(255,255,255,.18)" stroke={KC.white} strokeWidth={12} />
            <line x1={85} y1={85} x2={170} y2={170} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
          </g>}
        </>, 20)}
      </Escena>
      {/* 2 · no es planta: pólipos de 8 tentáculos sobre una ramita (aumentada) */}
      <Escena T={T} a={K.A} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.fanOsc} strokeWidth={130} fill="none" strokeLinecap="round" />
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.fan} strokeWidth={110} fill="none" strokeLinecap="round" />
          <path d="M -40 1010 Q 300 960 560 990 Q 820 1020 1120 960" stroke={AX.eje2} strokeWidth={16} fill="none" strokeDasharray="30 18" opacity=".6" />
          {[120, 300, 480, 660, 840, 1000].map((px, i) => { const py = 990 + Math.sin(px / 170) * -20 - 40; const ab = kprog(T, K.A + 0.3 + i * 0.2, K.A + 1.1 + i * 0.2, kEase.sale) * (0.85 + 0.15 * Math.sin(T * 2 + i));
            return <Polipo key={i} x={px} y={py} s={1.3} abre={ab} rot={(i % 2 ? 6 : -6)} />; })}
        </>)}
      </Escena>
      {/* 3 · el hongo: Aspergillus sydowii en el suelo */}
      <Escena T={T} a={K.H} b={K.Hi} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#f2c86b' }}></div>
        {fsvg(<>
          <rect x={0} y={1060} width={1080} height={860} fill={AX.tierra} />
          <path d="M 0 1060 Q 270 1030 540 1060 Q 810 1090 1080 1050" stroke={KC.ink} strokeWidth={6} fill="none" />
          {[[120, 1160, 30], [380, 1230, 22], [700, 1150, 36], [900, 1260, 26], [250, 1320, 18]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={r * 1.4} ry={r} fill={AX.tierra2} stroke={KC.ink} strokeWidth={4} />)}
          <path d="M 80 1100 Q 300 1080 420 1066 Q 540 1052 760 1090 Q 900 1110 1040 1080" stroke="#f2efe2" strokeWidth={9} fill="none" />
          <Conidioforo T={T} x={420} y={1066} s={1.15} crece={kprog(T, K.H, K.H + 2.0)} />
        </>)}
      </Escena>
      {/* 4–5 · por dentro: hifas que comen el tejido; células de defensa y banda de melanina */}
      <Escena T={T} a={K.Hi} b={K.An} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        {fsvg(<>
          {(() => { const R = krng(31); return Array.from({ length: 70 }, (_, i) => { const cx = 40 + R() * 1000, cy = 560 + R() * 620; const near = HIF.length && kprog(T, K.Hi + 0.2, K.Hi + 2.4);
            const comido = (Math.abs(cy - (760 + (cx - 120) * 0.3)) < 90) ? near : 0;
            return <circle key={i} cx={cx} cy={cy} r={26 + R() * 14} fill={mixHex(AX.tejido, '#5a4a52', comido * 0.8)} stroke={AX.tejido2} strokeWidth={3} opacity={1 - comido * 0.5} />; }); })()}
          {T > K.D && <path d={HIF[0]} stroke={AX.melanina} strokeWidth={46 * kprog(T, K.D + 1.2, K.D + 2.6, kEase.sale)} fill="none" strokeLinecap="round" opacity=".9" />}
          {T > K.D && <path d={HIF[1]} stroke={AX.melanina} strokeWidth={40 * kprog(T, K.D + 1.5, K.D + 2.9, kEase.sale)} fill="none" strokeLinecap="round" opacity=".9" />}
          <Hifas p={kprog(T, K.Hi + 0.1, K.Hi + 2.6)} w={15} />
          {T > K.D && (() => { const R = krng(77); return Array.from({ length: 16 }, (_, i) => { const sx = R() * 1080, sy = R() < 0.5 ? 480 : 1260, tx = 160 + (i / 15) * 760, ty = 760 + (tx - 120) * 0.3 + (i % 2 ? -46 : 46);
            const q = kprog(T, K.D + 0.1 + i * 0.05, K.D + 1.3 + i * 0.05, kEase.sale); return <Amebocito key={i} x={klerp(sx, tx, q)} y={klerp(sy, ty, q)} r={20} />; }); })()}
        </>)}
      </Escena>
      {/* 6 · por fuera: el anillo morado con el centro muerto */}
      <Escena T={T} a={K.An} b={K.P} zoom={0.05}>
        <Arrecife T={T} />
        {fsvg(<g transform="translate(540 820) scale(2.6) translate(60 330)"><Abanico T={T} x={0} y={0} s={1} lesion={LES} /></g>, 20)}
      </Escena>
      {/* 7 · re-gancho: ¿cómo llega un hongo de tierra al mar? */}
      <Escena T={T} a={K.P} b={K.Po} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Abanico T={T} x={250} y={1130} s={0.55} lesion={LES} />
          <path d="M 640 1130 Q 760 960 900 1000 Q 1000 1040 1040 1130 Z" fill={AX.tierra} stroke={KC.ink} strokeWidth={7} />
          <Conidioforo T={T} x={840} y={1010} s={0.4} crece={1} />
          <Interrogacion T={T} x={540} y={900} tam={300} />
        </>)}
      </Escena>
      {/* 8–9 · hipótesis del polvo del Sahara y lo que la contradice */}
      <Escena T={T} a={K.Po} b={K.F} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Co + 2.6, K.Co + 3.1)}>
            <MapaAtlantico />
            <NubePolvo T={T} p={kprog(T, K.Po + 0.5, K.Po + 3.5)} />
            <SelloRect T={T} at={K.Po + 0.3} x={540} y={470} texto="HIPÓTESIS" color={KC.red} tam={64} />
            {T > K.Co && <><Filtro x={780} y={700} tache={kprog(T, K.Co + 0.6, K.Co + 0.9)} /><Filtro x={850} y={760} tache={kprog(T, K.Co + 0.8, K.Co + 1.1)} />
              <Filtro x={560} y={880} tache={kprog(T, K.Co + 1.0, K.Co + 1.3)} /><Filtro x={620} y={940} tache={kprog(T, K.Co + 1.2, K.Co + 1.5)} /></>}
          </g>
          {T > K.Co + 2.6 && <g opacity={kprog(T, K.Co + 2.6, K.Co + 3.1)}>
            <rect x={0} y={380} width={1080} height={900} fill="#fff6d2" />
            <Arbol x={133} y={900} p={kprog(T, K.Co + 2.8, K.Co + 3.8)} />
          </g>}
        </>)}
      </Escena>
      {/* 10–11 · Florida y Yucatán */}
      <Escena T={T} a={K.F} b={K.Hu} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaCaribe flo={kprog(T, K.F + 0.3, K.F + 0.9)} yuc={kprog(T, K.Y + 0.2, K.Y + 0.8)} />
          {T > K.F && T < K.Y && (() => { const v = kprog(T, K.F + 2.2, K.F + 3.8, kEase.suave); return <g transform="translate(850 1180)">
            <g opacity={1 - v * 0.75}><MiniAbanico x={0} y={0} s={1.3} /></g>
            <rect x={-130} y={-140} width={130} height={150} fill="none" />
          </g>; })()}
          {T > K.Y && Array.from({ length: 8 }, (_, i) => { const on = kprog(T, K.Y + 1.0 + i * 0.08, K.Y + 1.3 + i * 0.08, kEase.rebote);
            return on > 0 ? <MiniAbanico key={i} x={110 + i * 123} y={1150} s={0.75 * on} enfermo={i === 5 && T > K.Y + 1.9} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · dato raro: también en personas */}
      <Escena T={T} a={K.Hu} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Persona x={300} y={1180} s={1.2} />
          <Conidioforo T={T} x={760} y={1180} s={0.75} crece={kprog(T, K.Hu + 0.3, K.Hu + 1.5)} />
          <path d="M 470 900 L 600 900" stroke={KC.ink} strokeWidth={8} strokeDasharray="16 12" />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo arrecife y el mismo abanico; llegan abanicos jóvenes */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="30% 45%">
        <Arrecife T={T} />
        {fsvg(<>
          <Abanico T={T} x={330} y={1300} s={1.05} lesion={LES} />
          {[[700, 1310, 0.35], [880, 1300, 0.28], [600, 1330, 0.22], [980, 1320, 0.2]].map(([x, y, s], i) => { const q = kprog(T, K.C + 1.0 + i * 0.4, K.C + 2.0 + i * 0.4, kEase.sale);
            return q > 0 ? <Abanico key={i} T={T} x={x} y={y} s={s * q} fase={i * 1.7} /> : null; })}
        </>, 20)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.A - 0.3} texto="no es su color normal" x={330} y={420} tam={40} borde={AX.anillo} />
      <Etq T={T} at={K.G + 2.6} until={K.A - 0.3} x={420} y={930} texto="anillo morado" tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 3.6} until={K.A - 0.3} x={60} y={500} texto="sospechoso: un hongo de tierra" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 0.6} until={K.H - 0.3} x={60} y={560} texto="abanico de mar" tam={38} color={KC.ink} />
      <Etq T={T} at={K.A + 1.0} until={K.H - 0.3} x={60} y={615} texto="Gorgonia ventalina" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.A + 1.8} until={K.H - 0.3} x={60} y={780} texto="pólipos de 8 tentáculos · animal" tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 2.4} until={K.H - 0.3} texto="NO ES PLANTA" x={330} y={430} tam={44} borde={KC.red} />
      <Etq T={T} at={K.H + 0.5} until={K.Hi - 0.2} x={470} y={1010} texto="Aspergillus sydowii" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.H + 1.2} until={K.Hi - 0.2} texto="suele vivir en el suelo" x={330} y={1140} tam={36} borde={AX.tierra} />
      <Etq T={T} at={K.H + 1.9} until={K.Hi - 0.2} x={640} y={830} texto="esporas rugosas" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.05} until={K.An - 0.3} texto="POR DENTRO · EL TEJIDO" x={360} y={400} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hi + 0.8} until={K.D + 1.0} x={60} y={700} texto="hifas" tam={36} color={KC.texto} />
      <Etq T={T} at={K.D + 0.6} until={K.An - 0.3} x={60} y={1150} texto="células de defensa" tam={32} color={AX.ameba} />
      <Etq T={T} at={K.D + 1.8} until={K.An - 0.3} x={60} y={520} texto="banda de melanina" tam={32} color="#e0b98f" />
      <Etq T={T} at={K.An + 0.5} until={K.P - 0.2} x={60} y={520} texto="anillo morado" tam={40} color={KC.ink} />
      <Etq T={T} at={K.An + 1.3} until={K.P - 0.2} x={60} y={590} texto="centro: tejido muerto, eje desnudo" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Po + 1.4} until={K.Co - 0.2} anio="2000" quien="Shinn y colegas" revista="Geophys. Res. Letters" x={300} y={990} />
      <TarjetaEstudio T={T} at={K.Co + 0.1} until={K.Co + 2.5} anio="2008" quien="Rypien · Cornell" revista="7 muestras · sin A. sydowii" x={300} y={990} />
      <Etq T={T} at={K.Co + 1.6} until={K.Co + 2.5} x={60} y={430} texto="no lo descarta del todo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.0} until={K.F - 0.3} texto="muchas entradas desde tierra" x={540} y={470} tam={40} borde={AX.tierra} />
      <Etq T={T} at={K.Co + 3.4} until={K.F - 0.3} x={60} y={1010} texto="● abanico" tam={30} color={AX.fan2} />
      <Etq T={T} at={K.Co + 3.6} until={K.F - 0.3} x={330} y={1010} texto="● ambiente (suelo, aire…)" tam={30} color={AX.tierra} />
      <Etq T={T} at={K.Co + 3.8} until={K.F - 0.3} x={60} y={560} texto="árbol genético (esquemático)" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.F + 0.6} until={K.F + 2.1} anio="2004" quien="Kim y Harvell · Cayos de Florida" revista="Am. Naturalist · datos 1997–2003" x={420} y={990} />
      <NumeroGigante T={T} at={K.F + 2.2} until={K.Y - 0.2} valor={50} dur={1.2} prefijo="> " sufijo=" %" etiqueta="del tejido, perdido" x={540} y={1030} tam={150} color={KC.red} />
      <NumeroGigante T={T} at={K.Y + 1.9} until={K.Hu - 0.2} valor={8} dur={0.5} prefijo="1 de cada " x={540} y={470} tam={110} color={AX.fan} />
      <Etq T={T} at={K.Y + 2.6} until={K.Hu - 0.2} x={40} y={600} texto="enfermos: 12.85 % en 2002 · 5.26 % en 2004" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Hu + 0.6} until={K.C - 0.3} x={520} y={600} texto="Aspergillus sydowii" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.Y + 2.9} until={K.Hu - 0.2} x={40} y={650} texto="Ward y colegas · Dis. Aquat. Org., 2006" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Hu + 1.2} until={K.C - 0.3} texto="misma especie, también en personas" x={400} y={430} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Hu + 1.8} until={K.C - 0.3} x={60} y={520} texto="muestreo genético mundial, 2008" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="los casos bajaron (1997–2003)" x={340} y={430} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="¿más resistencia? (hipótesis)" x={340} y={520} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.A} texto="10 cm" largo={110} y={1460} />
      <BarraEscala T={T} at={K.A} until={K.H} texto="1 mm" largo={160} />
      <BarraEscala T={T} at={K.H} until={K.Hi} texto="30 µm" largo={170} y={1460} />
      <BarraEscala T={T} at={K.Hi} until={K.An} texto="20 µm" largo={120} />
      <BarraEscala T={T} at={K.An} until={K.P} texto="5 cm" largo={170} y={1460} />
      <BarraEscala T={T} at={K.Po} until={K.Hu} texto="mapa esquemático" largo={0} y={1460} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={110} y={1460} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Ese anillo morado *es su defensa.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.H - 0.1} texto="No es planta: *es una colonia de pólipos.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Hi - 0.1} texto="*Aspergillus sydowii:* suele vivir en el suelo." />
      <Subtitulo T={T} idx={3} at={K.Hi + 0.1} until={K.D - 0.1} texto="Las hifas *se comen el tejido.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.An - 0.1} texto="Células de defensa y *melanina.*" />
      <Subtitulo T={T} idx={5} at={K.An + 0.1} until={K.P - 0.1} texto="Anillo morado, *centro muerto.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Po - 0.1} texto="¿Cómo llega *al mar?*" />
      <Subtitulo T={T} idx={7} at={K.Po + 0.1} until={K.Co - 0.1} texto="Hipótesis: *el polvo del Sahara.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.F - 0.1} texto="Polvo: no. Genes: *muchas entradas desde tierra.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.Y - 0.1} texto="Florida, 1997–2003: *más de la mitad del tejido.*" />
      <Subtitulo T={T} idx={10} at={K.Y + 0.1} until={K.Hu - 0.1} texto="Yucatán, 2002: *1 de cada 8 enfermo.*" />
      <Subtitulo T={T} idx={11} at={K.Hu + 0.1} until={K.C - 0.1} texto="También *en personas enfermas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un animal *defendiéndose.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.A + 0.5, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.4, K.Hi - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.D + 0.6, K.An - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Po + 0.4, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.Po + 0.9, K.Co - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.F + 1.0, K.Y - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Hu + 0.3, K.C - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="131" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AbanicoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AbanicoShot /></CompositionStage></div>;
}
window.AbanicoApp = AbanicoApp;
