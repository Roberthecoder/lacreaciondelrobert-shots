// Shot Fungi Mati #90 · El hongo más viejo que conocemos (Ourasphaira giraldae) — NARRADO.
// Gancho 1 «Esto no es X: es Y» · formato N1 (roca en la mano → lámina al microscopio → la misma roca, encendida).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const FO = { roca:'#4a4d55', roca2:'#3a3c43', capa:'#5d616b', piel:'#f1b48f', piel2:'#d98f6b', ambar:'#d99a3a', ambar2:'#f2c46a', mancha:'#2a2118', mar:'#2f7fd6', mar2:'#5aa6f0', lodo:'#8a6a48', arena:'#d9c08a', lava:'#2b2b30' };

// Mano que sostiene una roca de lutita (capas finas). La manchita está en (mx, my) relativo a la roca.
function ManoRoca({ T, x, y, s = 1, frota = 0, brillo = 0, hilos = 0, rot = 0 }) {
  const dedo = 0;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {/* palma (detrás de la roca) */}
    <path d="M -330 200 Q -340 60 -230 40 L 230 40 Q 340 60 330 200 Q 300 330 120 350 L -140 350 Q -310 330 -330 200 Z" fill={FO.piel} stroke={KC.ink} strokeWidth={8} />
    {/* roca: lutita en capas, bordes rotos */}
    <path d="M -250 30 L -210 -140 L -60 -190 L 120 -170 L 250 -110 L 270 20 L 120 60 L -120 55 Z" fill={FO.roca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-150, -110, -70, -30, 10].map((yy, i) => <path key={i} d={`M ${-235 + i * 6} ${yy + 20} Q 0 ${yy - 6} ${258 - i * 4} ${yy + 10}`} stroke={i % 2 ? FO.roca2 : FO.capa} strokeWidth={5} fill="none" opacity=".9" />)}
    <path d="M -210 -140 L -60 -190 L 120 -170" stroke="#6b707b" strokeWidth={6} fill="none" />
    {/* hilos del hongo dentro de la roca (esquema: los reales miden centésimas de milímetro) */}
    {hilos > 0 && <g opacity={hilos} transform="translate(90 -90) scale(.16)" style={{ filter:`drop-shadow(0 0 ${30 * hilos}px ${KC.gold2})` }}><Filamentos T={T} p={1} color={KC.gold2} grosor={26} /></g>}
    {/* cuatro dedos que abrazan la roca por delante */}
    {[-170, -70, 30, 130].map((fx, i) => <g key={i} transform="translate(0 60)">
      <path d={`M ${fx} 150 L ${fx} ${20 - (i === 1 || i === 2 ? 14 : 0)} Q ${fx} ${-18 - (i === 1 || i === 2 ? 14 : 0)} ${fx + 42} ${-18 - (i === 1 || i === 2 ? 14 : 0)} Q ${fx + 84} ${-18 - (i === 1 || i === 2 ? 14 : 0)} ${fx + 84} ${20 - (i === 1 || i === 2 ? 14 : 0)} L ${fx + 84} 150 Z`} fill={FO.piel} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${fx + 18} ${-2 - (i === 1 || i === 2 ? 14 : 0)} Q ${fx + 42} ${-14 - (i === 1 || i === 2 ? 14 : 0)} ${fx + 66} ${-2 - (i === 1 || i === 2 ? 14 : 0)}`} stroke={FO.piel2} strokeWidth={5} fill="none" />
      <path d={`M ${fx + 14} 70 Q ${fx + 42} 80 ${fx + 70} 70`} stroke={FO.piel2} strokeWidth={4} fill="none" />
    </g>)}
    {/* pulgar que frota */}
    <g transform={`translate(${dedo} 0)`}>
      <path d="M -330 120 Q -300 -20 -150 -70 Q -60 -96 -20 -88 Q 14 -80 10 -56 Q 4 -34 -40 -30 Q -130 -20 -230 60 Z" fill={FO.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -10 -80 Q 6 -70 -2 -54 Q -14 -44 -30 -48 Q -24 -66 -10 -80 Z" fill="#f7d0b5" stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}
// Microfósil esquemático tipo Ourasphaira: filamentos ramificados con tabiques (septos) y vesículas esféricas.
// Coordenadas propias (≈ 900 × 700, centro 0,0). p 0..1 = cuánto se ve.
const FIL = [
  { d:'M -380 260 Q -200 180 -60 120 Q 80 60 200 -40 Q 280 -110 360 -190', ves:[[360, -190, 46]] },
  { d:'M -60 120 Q -80 0 -40 -110 Q -10 -190 30 -250', ves:[[30, -250, 40]] },
  { d:'M 200 -40 Q 290 10 370 80', ves:[[370, 80, 38]] },
  { d:'M -200 180 Q -260 80 -300 -20', ves:[[-300, -20, 34]] },
  { d:'M 80 60 Q 120 160 100 260', ves:[[100, 260, 42]] },
];
function Filamentos({ T, p = 1, color = FO.ambar, grosor = 18, septos = true }) {
  return <g>
    {FIL.map((f, i) => { const q = kclamp(p * 1.6 - i * 0.15, 0, 1); if (q <= 0) return null;
      return <g key={i}>
        <path d={f.d} pathLength={1} strokeDasharray={`${q} 1`} stroke={KC.ink} strokeWidth={grosor + 10} fill="none" strokeLinecap="round" />
        <path d={f.d} pathLength={1} strokeDasharray={`${q} 1`} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" />
        {septos && q > 0.3 && [0.22, 0.45, 0.68, 0.88].filter((u) => u < q).map((u, k) => <path key={k} d={f.d} pathLength={1} strokeDasharray={`0.006 1`} strokeDashoffset={-u} stroke={KC.ink} strokeWidth={grosor + 12} fill="none" />)}
        {q >= 1 && f.ves.map(([vx, vy, r], k) => { const v = kEase.rebote(kclamp((p * 1.6 - i * 0.15 - 1) * 3, 0, 1)); return v > 0 ? <g key={k}>
          <circle cx={vx} cy={vy} r={r * v} fill={color} stroke={KC.ink} strokeWidth={8} />
          <circle cx={vx - r * 0.3} cy={vy - r * 0.3} r={r * 0.25 * v} fill="#fff" opacity=".35" /></g> : null; })}
      </g>; })}
  </g>;
}
// Mapa esquemático de Canadá (silueta simple con islas del Ártico) y punto en los Territorios del Noroeste.
function MapaCanada({ x, y, s = 1, punto = 1, T = 0 }) {
  const cont = 'M 0 420 L 60 300 L 40 200 L 120 180 L 160 120 L 260 150 L 300 100 L 380 140 L 420 200 L 470 190 L 520 260 L 600 230 L 640 300 L 720 280 L 780 340 L 840 330 L 860 400 L 800 440 L 700 430 L 600 460 L 500 450 L 380 460 L 200 450 Z';
  const islas = ['M 240 60 L 300 30 L 360 60 L 330 100 L 260 100 Z', 'M 380 50 L 440 20 L 520 40 L 500 90 L 410 100 Z', 'M 540 70 L 600 30 L 660 80 L 620 130 L 560 120 Z', 'M 420 120 L 470 110 L 480 150 L 430 160 Z'];
  const late = 1 + 0.2 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={cont} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {islas.map((d, i) => <path key={i} d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    <path d="M 120 180 L 210 440" stroke="#c9a85a" strokeWidth={4} strokeDasharray="10 8" fill="none" />
    <path d="M 330 160 L 340 450" stroke="#c9a85a" strokeWidth={4} strokeDasharray="10 8" fill="none" />
    {punto > 0 && <g transform={`translate(330 178) scale(${kEase.rebote(punto)})`}>
      <circle r={30 * late} fill="none" stroke={KC.red} strokeWidth={6} opacity=".7" />
      <circle r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Escarabajo esquemático (vista de arriba), con caparazón brillante.
function Escarabajo({ x, y, s = 1, rot = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${16 * brillo}px ${KC.gold2})` } : null}>
    {[-1, 1].map((sd) => [-40, 0, 40].map((yy, i) => <path key={sd + '' + i} d={`M ${sd * 40} ${yy} L ${sd * 95} ${yy - 20 + i * 20} L ${sd * 120} ${yy + 10 + i * 10}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />))}
    <ellipse cx={0} cy={-95} rx={34} ry={26} fill="#2c3a5a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 -112 Q -40 -150 -60 -160 M 20 -112 Q 40 -150 60 -160" stroke={KC.ink} strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={10} rx={66} ry={92} fill="#3d5a8a" stroke={KC.ink} strokeWidth={8} />
    <line x1={0} y1={-80} x2={0} y2={100} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -40 Q -30 -70 -10 -76" stroke="#9fc0ff" strokeWidth={8} fill="none" opacity=".7" strokeLinecap="round" />
  </g>;
}
// Persona esquemática (para el árbol hongos-animales).
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={36} fill={FO.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -100 Q 0 -120 50 -100 L 60 0 L -60 0 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -36 0 L -40 90 M 36 0 L 40 90" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
  </g>;
}
// Paisaje de hace ~1,000 millones de años: roca pelona, sin plantas, mar al fondo.
function TierraPelona({ T, x = 0, y = 0, rio = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={560} width={KW} height={500} fill={FO.mar} />
    {[0, 1, 2].map((i) => <path key={i} d={`M 0 ${600 + i * 60} Q 270 ${585 + i * 60 + Math.sin(T * 2 + i) * 10} 540 ${600 + i * 60} T 1080 ${600 + i * 60}`} stroke={FO.mar2} strokeWidth={6} fill="none" opacity=".7" />)}
    <path d="M 0 520 L 120 420 L 260 470 L 380 380 L 520 450 L 620 400 L 760 470 L 880 410 L 1080 480 L 1080 700 Q 700 760 540 820 Q 300 900 0 860 Z" fill="#9a8a78" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 120 420 L 180 470 M 380 380 L 420 450 M 620 400 L 660 460 M 880 410 L 930 470" stroke="#7a6a5a" strokeWidth={6} fill="none" />
    <path d="M 0 700 Q 300 740 540 790 Q 760 840 1080 760" stroke="#4caf6a" strokeWidth={16} fill="none" opacity=".8" strokeLinecap="round" />
    {rio > 0 && <path d="M 300 470 Q 380 600 520 700 Q 600 760 640 860" pathLength={1} strokeDasharray={`${rio} 1`} stroke={FO.mar2} strokeWidth={34} fill="none" strokeLinecap="round" />}
    {rio > 0 && <ellipse cx={640} cy={900} rx={220 * rio} ry={60 * rio} fill={FO.lodo} opacity=".75" />}
  </g>;
}
// Capas de lodo que se asientan (para «donde un río llega al mar»).
function CapasLodo({ T, x, y, w = 820, n = 6, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }, (_, i) => { const q = kclamp(p * n - i, 0, 1); return q > 0 ? <rect key={i} x={0} y={-i * 34} width={w} height={30} rx={8} fill={i % 2 ? FO.lodo : '#a8865c'} stroke={KC.ink} strokeWidth={4} opacity={q} transform={`translate(0 ${(1 - q) * -60})`} /> : null; })}
  </g>;
}
// Árbol hongos-animales.
function ArbolOpisto({ T, x, y, p = 1, punto = 0 }) {
  const a = kprog(p, 0, 0.4), b = kprog(p, 0.3, 0.8);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 0 360 L 0 160" pathLength={1} strokeDasharray={`${a} 1`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 0 160 Q -40 40 -240 -60" pathLength={1} strokeDasharray={`${b} 1`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d="M 0 160 Q 40 40 240 -60" pathLength={1} strokeDasharray={`${b} 1`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
    {punto > 0 && <circle cx={0} cy={250} r={34 * kEase.rebote(punto)} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} style={{ filter:`drop-shadow(0 0 20px ${KC.gold2})` }} />}
  </g>;
}
// Vesícula (burbuja) de lava petrificada con filamentos dentro.
function BurbujaLava({ T, x, y, r = 300, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 60} fill={FO.lava} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => { const a = i * 0.39, rr = r + 30 + (i % 3) * 8; return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={6 + (i % 4) * 3} fill="#1a1a1e" />; })}
    <circle r={r} fill="#d8e6ef" stroke={KC.ink} strokeWidth={8} opacity=".95" />
    <circle r={r} fill="url(#lvGrad)" />
    <defs><radialGradient id="lvGrad"><stop offset="60%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(0,0,0,.25)" /></radialGradient></defs>
    {Array.from({ length: 11 }, (_, i) => { const a = i * 0.571 + 0.2, q = kclamp(p * 2 - i * 0.08, 0, 1);
      const x0 = Math.cos(a) * r, y0 = Math.sin(a) * r, L = r * (0.45 + (i % 3) * 0.12), b = a + Math.PI + (i % 2 ? 0.5 : -0.5);
      const xm = x0 + Math.cos(a + Math.PI) * L * 0.5 + Math.cos(a + Math.PI / 2) * 40, ym = y0 + Math.sin(a + Math.PI) * L * 0.5 + Math.sin(a + Math.PI / 2) * 40;
      const x1 = x0 + Math.cos(b) * L, y1 = y0 + Math.sin(b) * L;
      const rx1 = xm + Math.cos(b + 0.9) * L * 0.35, ry1 = ym + Math.sin(b + 0.9) * L * 0.35;
      return <g key={i}>
        <path d={`M ${x0} ${y0} Q ${xm} ${ym} ${x1} ${y1}`} pathLength={1} strokeDasharray={`${q} 1`} stroke="#7a5a2a" strokeWidth={7} fill="none" strokeLinecap="round" />
        {q > 0.6 && <path d={`M ${xm} ${ym} L ${rx1} ${ry1}`} pathLength={1} strokeDasharray={`${(q - 0.6) / 0.4} 1`} stroke="#7a5a2a" strokeWidth={5} fill="none" strokeLinecap="round" />}
      </g>; })}
  </g>;
}
// Línea del tiempo (derecha = hoy). marcas en millones de años.
function LineaTiempo({ T, y, p400 = 1, p1000 = 0 }) {
  const ANT = 450;
  const X = (ma) => 980 - ma * 0.86;    // 0 Ma en 980, 1000 Ma en 120
  return <g>
    <line x1={X(Math.max(ANT * p400, 1000 * p1000))} y1={y} x2={980} y2={y} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <polygon points={`${X(Math.max(ANT * p400, 1000 * p1000)) - 34},${y} ${X(Math.max(ANT * p400, 1000 * p1000)) + 4},${y - 24} ${X(Math.max(ANT * p400, 1000 * p1000)) + 4},${y + 24}`} fill={KC.ink} />
    <circle cx={980} cy={y} r={20} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
    <text x={980} y={y + 70} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>HOY</text>
    {p400 > 0.98 && <g><circle cx={X(ANT)} cy={y} r={22} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
      <text x={X(ANT)} y={y + 70} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>~450 M</text></g>}
    {p1000 > 0.98 && <g><circle cx={X(1000)} cy={y} r={28} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} style={{ filter:`drop-shadow(0 0 16px ${KC.gold2})` }} />
      <text x={X(1000) + 10} y={y + 76} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>~1,000 M</text></g>}
  </g>;
}

function FosilShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Roca, M: CUES.Micro, Q: CUES.Quitina, A: CUES.Antes, P: CUES.Pregunta, Ag: CUES.Agua, E: CUES.Estudio, Ra: CUES.Rama, D: CUES.Duda, L: CUES.Lava, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
    const zoomMicro = kprog(T, K.M - 0.4, K.M + 0.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la manchita en la roca no se quita */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.06} origen="45% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<ManoRoca T={T} x={480} y={900} s={1.25} rot={Math.sin(T * 3) * 4} />)}
        <Lupa T={T} at={K.G + 0.5} until={K.R - 0.4} x={300} y={620} r={190} fx={590} fy={790} tinte={KC.gold2} etiqueta="POR DENTRO · LA ROCA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2c33" /><g transform={`translate(${r} ${r}) scale(.36)`}><Filamentos T={t} p={kprog(t, K.G + 0.8, K.G + 2.6)} color={KC.gold2} /></g></svg>} />
      </Escena>
      {/* 2 · la roca viene del Ártico de Canadá */}
      <Escena T={T} a={K.R} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaCanada T={T} x={60} y={720} s={1.12} punto={kprog(T, K.R + 0.6, K.R + 1.1)} />)}
      </Escena>
      {/* 3–4 · al microscopio: filamentos con tabiques y vesículas; la pared tiene quitina */}
      <Escena T={T} a={K.M} b={K.A} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<g transform={`translate(${klerp(540, 470, kprog(T, K.Q, K.Q + 0.8))} ${klerp(860, 760, kprog(T, K.Q, K.Q + 0.8))}) scale(${klerp(0.4, 1.0, zoomMicro) * klerp(1, 0.7, kprog(T, K.Q, K.Q + 0.8))})`}>
          <circle r={470} fill="#1d2233" stroke="#3a4560" strokeWidth={6} />
          <Filamentos T={T} p={kprog(T, K.M + 0.3, K.M + 2.6)} color={T > K.Q + 0.4 ? mixHex(FO.ambar, KC.gold2, 0.5 + 0.5 * Math.sin(T * 5)) : FO.ambar} />
        </g>)}
        {fsvg(<g opacity={kprog(T, K.Q + 1.2, K.Q + 1.8)}>
          <Champinon x={800} y={1150} s={0.75} />
          <Escarabajo T={T} x={250} y={1080} s={0.8} rot={-12} brillo={kprog(T, K.Q + 2.6, K.Q + 3.2)} />
        </g>)}
      </Escena>
      {/* 5 · antes: ~400 millones → ahora ~1,000 millones */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<LineaTiempo T={T} y={900} p400={kprog(T, K.A + 0.3, K.A + 1.6, kEase.sale)} p1000={kprog(T, K.A + 3.0, K.A + 4.4, kEase.sale) * 1} />)}
      </Escena>
      {/* 6–7 · re-gancho y el agua: un río que llega al mar (hipótesis de los autores) */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.pink }}></div>
        {fsvg(<TierraPelona T={T} x={0} y={260} rio={kprog(T, K.Ag + 0.2, K.Ag + 1.6)} />)}
        {fsvg(<g opacity={kprog(T, K.Ag + 1.4, K.Ag + 1.9)}><CapasLodo T={T} x={130} y={1180} p={kprog(T, K.Ag + 1.5, K.Ag + 3.2)} /></g>)}
      </Escena>
      {/* 8 · el estudio */}
      <Escena T={T} a={K.E} b={K.Ra} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<g transform="translate(540 1060) scale(.5)" opacity={kprog(T, K.E + 2.6, K.E + 3.2)}><circle r={470} fill="#1d2233" stroke={KC.ink} strokeWidth={10} /><Filamentos T={T} p={1} /></g>)}
      </Escena>
      {/* 9 · la rama de hongos y animales */}
      <Escena T={T} a={K.Ra} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <ArbolOpisto T={T} x={540} y={760} p={kprog(T, K.Ra + 0.2, K.Ra + 1.8)} punto={kprog(T, K.Ra + 2.6, K.Ra + 3.1)} />
          <g opacity={kprog(T, K.Ra + 1.4, K.Ra + 1.8)}><Champinon x={300} y={760} s={0.7} /></g>
          <g opacity={kprog(T, K.Ra + 1.6, K.Ra + 2.0)}><Escarabajo T={T} x={700} y={640} s={0.55} /><Persona x={860} y={760} s={0.9} /></g>
        </>)}
      </Escena>
      {/* 10 · la duda */}
      <Escena T={T} a={K.D} b={K.L} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g transform="translate(470 860) scale(.75)"><circle r={470} fill="#1d2233" stroke="#3a4560" strokeWidth={6} /><Filamentos T={T} p={1} /></g>
          <g transform={`translate(${klerp(1150, 620, kprog(T, K.D + 0.3, K.D + 1.2, kEase.sale))} 800)`}>
            <circle r={160} fill="rgba(255,255,255,.18)" stroke={KC.texto} strokeWidth={14} />
            <line x1={112} y1={112} x2={230} y2={230} stroke={KC.texto} strokeWidth={30} strokeLinecap="round" />
            <text y={50} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow}>?</text>
          </g>
        </>)}
      </Escena>
      {/* 11 · la lava de Sudáfrica */}
      <Escena T={T} a={K.L} b={K.C} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<BurbujaLava T={T} x={540} y={880} r={300} p={kprog(T, K.L + 0.6, K.L + 3.0)} />)}
      </Escena>
      {/* 12 · cierre: la misma mano y la misma roca, la manchita encendida */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<ManoRoca T={T} x={480} y={900} s={1.25} rot={Math.sin(T * 3) * 4} hilos={kprog(T, K.C + 0.4, K.C + 1.4)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.G + 2.3} texto="no está vacía" x={300} y={360} tam={40} borde={KC.gold} />
      <NumeroGigante T={T} at={K.G + 2.4} until={K.R - 0.3} valor={1000} dur={1.6} prefijo="≈ " etiqueta="millones de años" x={540} y={1120} tam={130} color={KC.gold2} />
      <Etq T={T} at={K.R + 0.8} until={K.M - 0.3} x={60} y={560} texto="Formación Grassy Bay" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 1.2} until={K.M - 0.3} x={60} y={615} texto="Territorios del Noroeste · Canadá" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 1.6} until={K.M - 0.3} texto="lutita = roca de lodo" x={540} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.2} until={K.Q - 0.3} texto="AL MICROSCOPIO · LÁMINA DE ROCA" x={540} y={400} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.M + 1.6} until={K.Q - 0.3} x={60} y={500} texto="hilos ramificados con tabiques" tam={30} color={FO.ambar2} />
      <Etq T={T} at={K.M + 2.6} until={K.Q - 0.3} x={60} y={550} texto="bolitas, como esporas" tam={30} color={FO.ambar2} />
      <Chip T={T} at={K.Q + 0.3} until={K.A - 0.3} texto="señal de quitina (infrarrojo)" x={340} y={470} tam={42} borde={KC.gold2} />
      <Etq T={T} at={K.Q + 1.6} until={K.A - 0.3} x={700} y={950} texto="hongos de hoy" lado="izq" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Q + 2.6} until={K.A - 0.3} x={340} y={1170} texto="caparazón de escarabajo" tam={28} color={KC.texto} />
      <Chip T={T} at={K.A + 0.4} until={K.A + 2.9} texto="antes: menos de 500 millones" x={540} y={620} tam={34} borde={KC.lilac} />
      <Chip T={T} at={K.A + 3.2} until={K.P - 0.3} texto="este: ~1,000 millones" x={540} y={620} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.P + 0.3} until={K.Ag - 0.2} texto="sin plantas en tierra firme" x={400} y={480} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ag + 0.4} until={K.E - 0.3} texto="¿vivía ahí o lo arrastró el agua?" x={460} y={480} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Ag + 1.0} until={K.E - 0.3} x={420} y={600} texto="río" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ag + 1.4} until={K.E - 0.3} x={560} y={880} texto="mar poco profundo" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ra - 0.3} anio="2019" quien="Loron et al. · U. de Lieja (Bélgica)" revista="Nature, 2019" x={540} y={560} />
      <EtqMix T={T} at={K.E + 2.6} until={K.Ra - 0.3} x={540} y={790} centro partes={[['Ourasphaira giraldae', true]]} tam={48} color={KC.texto} />
      <Etq T={T} at={K.Ra + 1.5} until={K.D - 0.3} x={140} y={520} texto="hongos" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Ra + 1.7} until={K.D - 0.3} x={940} y={500} texto="animales (y tú)" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ra + 2.7} until={K.D - 0.3} texto="hace casi 1,000 millones ya existía" x={540} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.D + 1.0} until={K.L - 0.3} texto="otros científicos piden más pruebas" x={500} y={420} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.L + 0.4} until={K.C - 0.3} texto="lava de Sudáfrica · ~2,400 M" x={540} y={420} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.L + 3.2} until={K.C - 0.3} texto="¿hongo? en debate" x={540} y={500} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="¿uno de los más viejos?" x={360} y={560} tam={42} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.R} until={K.M} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.M} until={K.A} texto="30 µm" largo={120} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="esquema · millones de años" largo={0} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="paisaje esquemático" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.Ra} texto="30 µm" largo={60} />
      <BarraEscala T={T} at={K.Ra} until={K.D} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.D} until={K.L} texto="30 µm" largo={90} />
      <BarraEscala T={T} at={K.L} until={K.C} texto="1 mm (esquema)" largo={180} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Adentro, quizá *uno de los hongos más viejos.*" />
      <Sub T={T} idx={1} at={K.R + 0.1} until={K.M - 0.1} texto="Roca de lodo del *Ártico de Canadá.*" />
      <Sub T={T} idx={2} at={K.M + 0.1} until={K.Q - 0.1} texto="Hilos con tabiques y *bolitas como esporas.*" />
      <Sub T={T} idx={3} at={K.Q + 0.1} until={K.A - 0.1} texto="Su pared da *señales de quitina.*" />
      <Sub T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="Antes: *menos de 500 millones* de años." />
      <Sub T={T} idx={5} at={K.P + 0.1} until={K.Ag - 0.1} texto="¿Dónde vivía *sin plantas en tierra?*" />
      <Sub T={T} idx={6} at={K.Ag + 0.1} until={K.E - 0.1} texto="Quedó donde *un río llega al mar.*" />
      <Sub T={T} idx={7} at={K.E + 0.1} until={K.Ra - 0.1} texto="2019, Nature: *_Ourasphaira giraldae._*" />
      <Sub T={T} idx={8} at={K.Ra + 0.1} until={K.D - 0.1} texto="Hongos y animales: *la rama ya existía.*" />
      <Sub T={T} idx={9} at={K.D + 0.1} until={K.L - 0.1} texto="Ojo: *no todos están convencidos.*" />
      <Sub T={T} idx={10} at={K.L + 0.1} until={K.C - 0.1} texto="Pistas más viejas, *todavía en debate.*" />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Quizá *uno de los más viejos* que conocemos." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.3, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.5, K.M - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Q + 0.3, K.A - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.A + 3.1, K.P - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.P + 0.05, K.Ag + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 0.4, K.Ra - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Ra + 2.6, K.D - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.D + 0.3, K.L - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.L + 3.0, K.C - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="90" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FosilApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FosilShot /></CompositionStage></div>;
}
window.FosilApp = FosilApp;
