// Shot Ambiental #40 · El humo de la leña: partículas que llegan a tus pulmones — NARRADO (N1 "Por dentro").
// Datos: OMS "Household air pollution" (2025), EPA "PM Basics", INEGI Encuesta Intercensal 2025, Zuk et al. 2007 (Patsari, Michoacán),
// Gaceta UNAM 2024 (chimenea de la Patsari). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const HL_GRIS = '#8d8a86', HL_HOLLIN = '#2b2622';

// Aglomerado de hollín (cadena irregular de esferitas, como se ve al microscopio electrónico; esquema).
function Hollin({ x, y, s = 1, seed = 1, o = 1, rot = 0 }) {
  const r = krng(seed * 97 + 13), pts = [[0, 0]];
  const n = 5 + Math.floor(r() * 4);
  for (let i = 1; i < n; i++) { const [px, py] = pts[Math.floor(r() * pts.length)], a = r() * Math.PI * 2; pts.push([px + Math.cos(a) * 13, py + Math.sin(a) * 13]); }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={8} fill={HL_HOLLIN} stroke="#000" strokeWidth={1.5} />)}
    {pts.map(([a, b], i) => <circle key={'b' + i} cx={a - 2.5} cy={b - 2.5} r={2.4} fill="#fff" opacity={0.35} />)}
  </g>;
}

// Bocanada de humo (nube suave de 3 círculos).
function Bocanada({ x, y, r, o }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={HL_GRIS} /><circle cx={x - r * 0.6} cy={y + r * 0.25} r={r * 0.7} fill={HL_GRIS} /><circle cx={x + r * 0.6} cy={y + r * 0.2} r={r * 0.75} fill="#9d9a96" /></g>;
}

// Llamas animadas.
function Llamas({ T, x, y, s = 1, o = 1 }) {
  const f = (k) => 1 + 0.12 * Math.sin(T * (11 + k) + k * 2);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-38, 0, 38].map((dx, k) => <g key={k} transform={`translate(${dx} 0) scale(1 ${f(k)})`}>
      <path d="M -26 0 Q -30 -40 -6 -70 Q -4 -40 6 -50 Q 30 -30 26 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
      <path d="M -13 0 Q -14 -24 -2 -40 Q 2 -24 8 -30 Q 16 -16 13 0 Z" fill={KC.yellow} />
    </g>)}
  </g>;
}

// Leño a medio quemar: punta carbonizada con brasas.
function Leno({ x, y, ang, T, k }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <rect x={-80} y={-11} width={150} height={22} rx={10} fill="#8a5a33" stroke={KC.ink} strokeWidth={4} />
    <rect x={40} y={-11} width={34} height={22} rx={10} fill="#2a1d16" stroke={KC.ink} strokeWidth={4} />
    <circle cx={60} cy={-2} r={4} fill={KC.orange} opacity={0.6 + 0.4 * Math.sin(T * 7 + k)} /><circle cx={50} cy={5} r={3} fill={KC.yellow} opacity={0.5 + 0.5 * Math.sin(T * 9 + k)} />
  </g>;
}

// Cocina rural vista en corte (macro). fogon/patsari 0..1 (cuál estufa se ve), humo 0..1 = humo atrapado bajo el techo, sale 0..1 = humo por la chimenea.
const HL_FX = 540, HL_FY = 1100;                 // centro del fogón
const HL_CHX = 640, HL_CHTOP = 330;              // chimenea de la Patsari
function Cocina({ T, patsari = 0, humo = 1, sale = 0, construye = 1, chimenea = 1, ventana = true }) {
  const fog = 1 - patsari;
  const puffs = [];
  for (let i = 0; i < 12; i++) {                 // humo del fogón abierto: sube y se queda bajo el techo
    const u = ((T * 0.22 + i / 12) % 1), dx = Math.sin(i * 2.3) * 260 * u;
    puffs.push(<Bocanada key={'p' + i} x={HL_FX + dx} y={HL_FY - 60 - u * 420} r={24 + u * 50} o={fog * 0.55 * Math.min(1, u * 5) * (1 - u * 0.4)} />);
  }
  const fuera = [];
  for (let i = 0; i < 8; i++) {                  // humo de la chimenea: sale por encima del techo
    const u = ((T * 0.35 + i / 8) % 1);
    fuera.push(<Bocanada key={'f' + i} x={HL_CHX - u * 230 + Math.sin(u * 6 + i) * 14} y={HL_CHTOP - 20 - u * 230} r={18 + u * 42} o={sale * 0.6 * (1 - u)} />);
  }
  const ladrillos = [];
  for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) {
    const vis = kclamp(construye * 4 - f, 0, 1);
    ladrillos.push(<rect key={f + '-' + c} x={400 + c * 47 + (f % 2) * 22 - 11} y={1150 - (f + 1) * 36} width={45} height={34} rx={3} fill="#c8613a" stroke={KC.ink} strokeWidth={3} opacity={vis} />);
  }
  return <g>
    {/* techo de teja */}
    <polygon points="40,600 540,400 1040,600" fill="#c0573a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={120 + i * 70} y1={600 - (i + 1) * 28 + 6} x2={960 - i * 70} y2={600 - (i + 1) * 28 + 6} stroke="#8f3b25" strokeWidth={5} opacity={0.6} />)}
    {/* paredes */}
    <rect x={80} y={600} width={920} height={560} fill="#e8c089" stroke={KC.ink} strokeWidth={8} />
    <rect x={100} y={620} width={880} height={530} fill="#d9ab70" />
    {ventana && <g><rect x={800} y={690} width={130} height={100} fill="#9fe3ff" stroke={KC.ink} strokeWidth={6} /><line x1={865} y1={690} x2={865} y2={790} stroke={KC.ink} strokeWidth={5} /></g>}
    <rect x={80} y={1150} width={920} height={34} fill="#a8774a" stroke={KC.ink} strokeWidth={6} />
    {/* fogón de tres piedras con comal */}
    <g opacity={fog}>
      <Leno x={HL_FX - 40} y={HL_FY + 30} ang={-12} T={T} k={1} /><Leno x={HL_FX + 40} y={HL_FY + 34} ang={192} T={T} k={2} />
      <Llamas T={T} x={HL_FX} y={HL_FY + 30} s={0.8} />
      {[-90, 0, 90].map((dx, i) => <ellipse key={i} cx={HL_FX + dx} cy={HL_FY + 22} rx={42} ry={30} fill="#9a958e" stroke={KC.ink} strokeWidth={5} />)}
      <ellipse cx={HL_FX} cy={HL_FY - 14} rx={140} ry={18} fill="#3a3632" stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={HL_FX - 30} cy={HL_FY - 22} rx={50} ry={8} fill="#f3dfa6" stroke={KC.ink} strokeWidth={3} />
    </g>
    {/* estufa Patsari: cuerpo de ladrillo, comal, cámara cerrada y chimenea */}
    {patsari > 0 && <g opacity={kclamp(patsari * 2, 0, 1)}>
      {ladrillos}
      <g opacity={kclamp(construye * 4 - 3.2, 0, 1)}>
        <rect x={380} y={1000} width={300} height={14} rx={4} fill="#7c766f" stroke={KC.ink} strokeWidth={4} />
        <ellipse cx={500} cy={1000} rx={62} ry={9} fill="#3a3632" stroke={KC.ink} strokeWidth={4} />
        <rect x={430} y={1092} width={60} height={42} rx={8} fill="#2a1d16" stroke={KC.ink} strokeWidth={4} />
        <rect x={442} y={1110} width={36} height={18} rx={6} fill={KC.orange} opacity={0.7 + 0.3 * Math.sin(T * 8)} />
      </g>
      <rect x={HL_CHX - 20} y={klerp(1000, HL_CHTOP, chimenea)} width={40} height={klerp(0, 1000 - HL_CHTOP, chimenea)} fill="#6d6a66" stroke={KC.ink} strokeWidth={5} />
      {chimenea > 0.98 && <rect x={HL_CHX - 32} y={HL_CHTOP - 14} width={64} height={18} rx={4} fill="#55524e" stroke={KC.ink} strokeWidth={4} />}
    </g>}
    {/* humo */}
    {puffs}
    <rect x={100} y={620} width={880} height={60 + humo * 380} fill="url(#hlhaze)" opacity={0.25 + humo * 0.6} />
    <defs><linearGradient id="hlhaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#77736f" stopOpacity="0.95" /><stop offset="100%" stopColor="#77736f" stopOpacity="0" /></linearGradient></defs>
    {fuera}
  </g>;
}

// Lo que se ve en la Lupa: el humo aumentado = aglomerados de hollín (esquema). n = cuántos.
function LupaHumo(n) {
  return (t, r) => <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#1b1d22" />
    {Array.from({ length: n }, (_, i) => { const q = krng(i * 31 + 7); const x0 = q() * r * 2, y0 = q() * r * 2;
      return <Hollin key={i} seed={i + 3} x={x0 + Math.sin(t * 1.3 + i) * 10} y={y0 - ((t * 18 + i * 9) % 40)} s={1.4 + q() * 0.8} rot={t * 20 + i * 40} />; })}
  </svg>;
}

// Cabello (70 µm) contra una partícula fina (2.5 µm). 6 px = 1 µm.
function CabelloPM({ T, a }) {
  const y = 860, h = 420, ent = kprog(T, a + 0.1, a + 1.0, kEase.sale);
  return <g>
    <g transform={`translate(${(1 - ent) * -1100} 0)`}>
      <rect x={-40} y={y - h / 2} width={1160} height={h} fill="#6b4428" stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${i * 90 - 20} ${y - h / 2} q 40 ${h / 2} 0 ${h}`} stroke="#8a5c3a" strokeWidth={8} fill="none" />)}
      <rect x={-40} y={y - h / 2 + 30} width={1160} height={40} fill="#fff" opacity={0.12} />
    </g>
    <g opacity={kprog(T, a + 1.6, a + 2.0)}>
      <line x1={60} y1={y - h / 2} x2={60} y2={y + h / 2} stroke={KC.yellow} strokeWidth={6} />
      <line x1={45} y1={y - h / 2} x2={75} y2={y - h / 2} stroke={KC.yellow} strokeWidth={6} /><line x1={45} y1={y + h / 2} x2={75} y2={y + h / 2} stroke={KC.yellow} strokeWidth={6} />
    </g>
    <g opacity={kprog(T, a + 2.2, a + 2.6)}>
      <circle cx={760} cy={1120} r={8} fill={HL_HOLLIN} stroke={KC.yellow} strokeWidth={2} />
      <circle cx={760} cy={1120} r={34 + 6 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={5} />
    </g>
  </g>;
}

// Pulmones (macro, esquema) con partículas que bajan por la tráquea.
function Pulmones({ T, a }) {
  const lob = (s) => `M ${540 + s * 30} 640 Q ${540 + s * 240} 560 ${540 + s * 280} 900 Q ${540 + s * 270} 1120 ${540 + s * 120} 1110 Q ${540 + s * 40} 1060 ${540 + s * 30} 900 Z`;
  return <g>
    <path d={lob(-1)} fill="#ff8fa3" stroke={KC.ink} strokeWidth={8} /><path d={lob(1)} fill="#ff8fa3" stroke={KC.ink} strokeWidth={8} />
    <rect x={520} y={420} width={40} height={240} rx={14} fill="#ffd0d8" stroke={KC.ink} strokeWidth={6} />
    {[-1, 1].map((s) => <g key={s}><path d={`M 540 650 Q ${540 + s * 60} 700 ${540 + s * 140} 760`} stroke="#ffd0d8" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${540 + s * 140} 760 l ${s * 60} 80 M ${540 + s * 140} 760 l ${s * 90} -10 M ${540 + s * 100} 735 l ${s * 30} 120`} stroke="#ffd0d8" strokeWidth={10} fill="none" strokeLinecap="round" /></g>)}
    {Array.from({ length: 10 }, (_, i) => { const u = ((T - a) * 0.6 + i / 10) % 1, s = i % 2 ? 1 : -1;
      const x = u < 0.5 ? 540 : 540 + s * (u - 0.5) * 2 * 160, y = u < 0.5 ? 400 + u * 2 * 250 : 650 + (u - 0.5) * 2 * 150;
      return <Hollin key={i} seed={i + 40} x={x} y={y} s={0.55} />; })}
  </g>;
}

// Alvéolos con un capilar (micro, esquema): las partículas se pegan a la pared y solo algunas cruzan a la sangre.
const HL_ALV = [[420, 760], [600, 700], [770, 770], [500, 900], [690, 910]];
function Alveolos({ T, a }) {
  const t = T - a;
  const parts = Array.from({ length: 11 }, (_, i) => {
    const [cx, cy] = HL_ALV[i % 5], q = krng(i * 13 + 5), ang = q() * Math.PI * 2;
    const tx = cx + Math.cos(ang) * 95, ty = cy + Math.sin(ang) * 95;            // se pega a la pared
    const u = kprog(t, 0.2 + i * 0.12, 1.2 + i * 0.12, kEase.suave);
    let x = klerp(600, tx, u), y = klerp(420, ty, u);
    if (i === 2 || i === 7) {                                                    // solo algunas pasan al capilar y viajan con la sangre
      const v = kprog(t, 2.0, 2.6, kEase.suave), w = Math.max(0, t - 2.6);
      x = klerp(x, 300 + i * 30, v) + w * 160; y = klerp(y, 1080, v);
    }
    return <Hollin key={i} seed={i + 60} x={x} y={y} s={0.7} />;
  });
  return <g>
    <path d="M 600 380 L 600 560" stroke="#ffd0d8" strokeWidth={50} strokeLinecap="round" opacity={0.85} />
    <path d="M 60 1080 C 300 1030 500 1130 760 1070 S 980 1060 1040 1080" stroke="#c92a3a" strokeWidth={70} fill="none" strokeLinecap="round" />
    {Array.from({ length: 7 }, (_, i) => { const x = 60 + (((t * 160) + i * 150) % 980); const yy = 1080 + Math.sin(x / 120) * 22;
      return <g key={i} transform={`translate(${x} ${yy})`}><ellipse rx={26} ry={16} fill="#e23b3b" stroke="#7a1010" strokeWidth={3} /><ellipse rx={11} ry={6} fill="#b81f2a" /></g>; })}
    {HL_ALV.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={100} fill="#ffd0d8" fillOpacity={0.35} stroke="#ff8fa3" strokeWidth={10} />)}
    {parts}
  </g>;
}

// Globo terráqueo con casas que echan humo (esquema).
function GloboHumo({ T, x = 540, y = 880, r = 260 }) {
  const casas = [[-150, -60], [-60, 40], [40, -120], [120, 60], [-120, 140], [190, -30], [10, 160], [-200, 40]];
  return <g transform={`translate(${x} ${y}) rotate(${T * 3})`}>
    <circle r={r} fill="#2f8fd8" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.7} ${-r * 0.4} q 80 -70 160 -10 q 30 70 -40 110 q -90 10 -120 -100 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r * 0.05} ${-r * 0.6} q 120 -10 150 90 q -10 130 -90 170 q -60 -30 -60 -260 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-r * 0.5} ${r * 0.3} q 70 -20 110 50 q -20 90 -90 60 Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
    {casas.map(([cx, cy], i) => { const u = ((T * 0.5 + i / 8) % 1);
      return <g key={i} transform={`translate(${cx} ${cy}) rotate(${-T * 3})`}>
        <rect x={-14} y={-12} width={28} height={22} fill={KC.paper} stroke={KC.ink} strokeWidth={3} /><polygon points="-18,-12 0,-28 18,-12" fill="#c0573a" stroke={KC.ink} strokeWidth={3} />
        <circle cx={6 + u * 10} cy={-34 - u * 40} r={6 + u * 12} fill={HL_GRIS} opacity={0.75 * (1 - u)} /></g>; })}
  </g>;
}

// Casita para la fila de 10 (México). leña = con humo de leña.
function Casita({ T, x, y, lena = false, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-36} y={-50} width={72} height={60} fill={lena ? '#e8c089' : KC.paper} stroke={KC.ink} strokeWidth={5} />
    <polygon points="-46,-50 0,-90 46,-50" fill="#c0573a" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-10} y={-18} width={20} height={28} fill="#7a4a22" stroke={KC.ink} strokeWidth={3} />
    {lena && Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.45 + i / 4) % 1); return <circle key={i} cx={20 + u * 20} cy={-90 - u * 110} r={14 + u * 24} fill="#5f5b57" opacity={0.9 * (1 - u * 0.8)} />; })}
  </g>;
}

// Tanque de gas (cilindro) para la pregunta.
function TanqueGas({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-300} width={220} height={360} rx={90} fill="#e9eef5" stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={-120} width={220} height={40} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-350} width={80} height={60} rx={12} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={40} width={140} height={40} rx={8} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Barra de medición que baja (Zuk 2007). valor 0..1 de la barra.
function BarraBaja({ x, y, alto = 420, valor, texto, etiqueta, color, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-70} y={-alto - 10} width={140} height={alto + 20} rx={18} fill="rgba(255,255,255,.9)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-56} y={-alto * valor} width={112} height={alto * valor} rx={10} fill={color} />
    <line x1={-70} y1={-alto} x2={70} y2={-alto} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
    <text x={0} y={-alto - 30} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} stroke="#fff" strokeWidth={8} paintOrder="stroke">{texto}</text>
    <text x={0} y={52} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{etiqueta}</text>
  </g>;
}

function HumoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fogon, Ca: CUES.Cabello, Pu: CUES.Pulmon, E: CUES.Encierro, Mu: CUES.Mundo, Mx: CUES.Mexico, P: CUES.Pregunta, Pa: CUES.Patsari, Mi: CUES.Mitad, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const humoE = klerp(0.55, 1, kprog(T, K.E, K.E + 2.5, kEase.suave));
  const constr = kprog(T, K.Pa + 0.5, K.Pa + 2.8, kEase.suave), chim = kprog(T, K.Pa + 3.0, K.Pa + 3.8, kEase.sale);
  const salePa = kprog(T, K.Pa + 3.8, K.Pa + 4.4);
  const humoPa = klerp(0.6, 0.22, kprog(T, K.Pa + 3.9, K.Pa + 5.6, kEase.suave));
  const b1 = klerp(1, 0.29, kprog(T, K.Mi + 0.4, K.Mi + 1.9, kEase.suave)), b2 = klerp(1, 0.5, kprog(T, K.Mi + 2.9, K.Mi + 4.2, kEase.suave));
  const medE = kprog(T, K.E + 0.8, K.E + 3.0, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cocina con fogón; el humo no es solo olor */}
      <Escena T={T} a={K.G} b={K.F}>
        <FondoLunares color={KC.cyan} />
        {svg(<Cocina T={T} humo={klerp(0.45, 0.65, kprog(T, 0, 4))} />)}
      </Escena>
      <Lupa T={T} at={K.G + 0.5} until={K.F - 0.3} x={270} y={740} r={165} fx={480} fy={820} tinte={KC.yellow} etiqueta="AUMENTADO · esquema" interior={LupaHumo(16)} />
      {/* 2 · leña a medio quemar: sueltan partículas */}
      <Escena T={T} a={K.F} b={K.Ca} zoom={0.08} origen="50% 55%">
        <FondoLunares color={KC.lilac} />
        {svg(<><g transform={`translate(540 900) scale(2.3) translate(${-HL_FX} ${-HL_FY})`}>
            <Leno x={HL_FX - 40} y={HL_FY + 30} ang={-12} T={T} k={1} /><Leno x={HL_FX + 40} y={HL_FY + 34} ang={192} T={T} k={2} />
            <Llamas T={T} x={HL_FX} y={HL_FY + 30} s={0.8} />
            {[-90, 0, 90].map((dx, i) => <ellipse key={i} cx={HL_FX + dx} cy={HL_FY + 22} rx={42} ry={30} fill="#9a958e" stroke={KC.ink} strokeWidth={5} />)}
          </g>
          {Array.from({ length: 14 }, (_, i) => { const u = ((T - K.F) * 0.45 + i / 14) % 1; const q = krng(i * 7 + 2);
            return <Hollin key={i} seed={i + 20} x={540 + (q() - 0.5) * 120 + (q() - 0.5) * 700 * u} y={820 - u * 460} s={1.3 + u} o={kprog(T, K.F + 0.2 + i * 0.05, K.F + 0.6 + i * 0.05) * (1 - u * 0.6)} rot={u * 200} />; })}</>)}
      </Escena>
      {/* 3 · menos de 2.5 µm: unas 30 veces más delgadas que un cabello */}
      <Escena T={T} a={K.Ca} b={K.Pu}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<CabelloPM T={T} a={K.Ca} />)}
        <EscalaFija texto="10 µm (esquema)" largo={60} y={1480} color={KC.texto} />
      </Escena>
      {/* 4 · al fondo del pulmón y algunas a la sangre (micro, fondo oscuro) */}
      <Escena T={T} a={K.Pu} b={K.Pu + 1.7}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<Pulmones T={T} a={K.Pu} />)}
      </Escena>
      <Escena T={T} a={K.Pu + 1.7} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        {svg(<Alveolos T={T} a={K.Pu + 1.2} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 5 · con poca ventilación: hasta cien veces más de lo aceptable */}
      <Escena T={T} a={K.E} b={K.Mu}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Cocina T={T} humo={humoE} />
          <BarraBaja x={250} y={1080} alto={400} valor={kclamp(0.01 + 0.99 * medE, 0, 1)} texto={'×' + Math.round(1 + 99 * medE)} etiqueta="partículas finas" color="#5d5955" o={kprog(T, K.E + 0.5, K.E + 0.9)} />
          <g opacity={kprog(T, K.E + 0.5, K.E + 0.9)}><line x1={170} y1={1074} x2={330} y2={1074} stroke={KC.leaf} strokeWidth={8} /><text x={350} y={1082} style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">aceptable</text></g></>)}
      </Escena>
      {/* 6 · el mundo: 2,100 millones cocinan así; 2.9 millones de muertes estimadas en 2021 */}
      <Escena T={T} a={K.Mu} b={K.Mx}>
        <FondoLunares color={KC.mint} />
        {svg(<GloboHumo T={T} x={540} y={850} r={225} />)}
      </Escena>
      {/* 7 · México: casi 1 de cada 10 viviendas (2025) */}
      <Escena T={T} a={K.Mx} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<><MapaMexico x={60} y={360} ancho={600} conCA={false} />
          {Array.from({ length: 10 }, (_, i) => <Casita key={i} T={T} x={110 + i * 96} y={1110} lena={i === 6} o={kprog(T, K.Mx + 0.4 + i * 0.12, K.Mx + 0.7 + i * 0.12)} />)}</>)}
      </Escena>
      {/* 8 · re-gancho: ¿y si no alcanza para el gas? */}
      <Escena T={T} a={K.P} b={K.Pa} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><TanqueGas x={270} y={1110} s={0.95} rot={Math.sin(T * 3) * 3} />
          <text x={270} y={750} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 270 650)`}>?</text></>)}
      </Escena>
      {/* 9 y 10 · la estufa Patsari con chimenea; mediciones antes y después */}
      <Escena T={T} a={K.Pa} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Cocina T={T} patsari={kprog(T, K.Pa + 0.4, K.Pa + 1.4)} construye={constr} chimenea={chim} sale={salePa} humo={T < K.Mi ? humoPa : 0.22} />
          <BarraBaja x={800} y={1110} alto={300} valor={b1} texto={(1 - b1) > 0.04 ? '−' + Math.round((1 - b1) * 100) + ' %' : ''} etiqueta="junto a la estufa" color="#5d5955" o={kprog(T, K.Mi + 0.1, K.Mi + 0.4) * (1 - kprog(T, K.Mi + 2.3, K.Mi + 2.6))} />
          <BarraBaja x={800} y={1110} alto={300} valor={b2} texto={(1 - b2) > 0.04 ? '−' + Math.round((1 - b2) * 100) + ' %' : ''} etiqueta="cada persona al día" color={KC.blue} o={kprog(T, K.Mi + 2.5, K.Mi + 2.8)} /></>)}
      </Escena>
      {/* 11 · cierre: la misma cocina del inicio, con Patsari: la mayor parte del humo sale por la chimenea */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Cocina T={T} patsari={1} sale={1} humo={0.18} />)}
      </Escena>
      <Lupa T={T} at={K.C + 0.8} until={K.Ou - 0.2} x={270} y={740} r={165} fx={480} fy={820} tinte={KC.yellow} etiqueta="muchas menos · esquema" interior={LupaHumo(5)} />

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.4} until={K.F - 0.2} texto="no es solo olor" x={790} y={920} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.F + 0.4} until={K.Ca - 0.2} x={760} y={1090} texto="leña a medio quemar" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 1.0} until={K.Ca - 0.2} texto="combustión incompleta → partículas" x={540} y={420} tam={30} borde={KC.orange} />
      <Etq T={T} at={K.Ca + 1.8} until={K.Pu - 0.2} x={90} y={600} texto="cabello ≈ 70 µm" tam={32} />
      <Etq T={T} at={K.Ca + 2.4} until={K.Pu - 0.2} x={720} y={1120} texto="PM2.5: menos de 2.5 µm" lado="izq" tam={30} color={KC.yellow} />
      <Chip T={T} at={K.Ca + 2.8} until={K.Pu - 0.2} texto="≈ 30 veces más finas" x={340} y={470} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Pu + 0.3} until={K.Pu + 1.6} x={760} y={480} texto="tráquea" tam={30} lado="der" />
      <Etq T={T} at={K.Pu + 2.0} until={K.E - 0.2} x={700} y={570} texto="alvéolos" tam={30} />
      <Etq T={T} at={K.Pu + 2.6} until={K.E - 0.2} x={1000} y={1160} texto="capilar: sangre" lado="izq" tam={30} color={KC.coral} />
      <Chip T={T} at={K.E + 1.2} until={K.Mu - 0.2} texto="OMS: con poca ventilación" x={340} y={380} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Mu + 0.2} until={K.Mu + 4.6} valor={2100} dur={1.2} sufijo=" millones" etiqueta="en el mundo:" x={540} y={420} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.Mu + 1.2} until={K.Mu + 4.6} texto="cocinan con fuego abierto o estufas con humo" x={540} y={560} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Mu + 5.0} until={K.Mx - 0.2} valor={2.9} dec={1} dur={1.0} sufijo=" millones" etiqueta="muertes estimadas · 2021" x={680} y={440} tam={110} color={KC.coral} />
      <Chip T={T} at={K.Mu + 6.0} until={K.Mx - 0.2} texto="OMS, 2025 (estimación)" x={680} y={580} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 1.6} until={K.P - 0.2} texto="casi 1 de cada 10 viviendas" x={540} y={760} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 2.2} until={K.P - 0.2} texto="9.7 % · INEGI, Encuesta Intercensal 2025" x={540} y={845} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.P + 1.4} until={K.Pa - 0.2} texto="no es tu culpa" x={300} y={400} tam={36} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Pa + 0.2} until={K.Pa + 2.9} anio="2007" quien="Michoacán · 53 casas · antes y después" revista="Zuk, Masera y col. · J Expo Sci Environ Epidemiol" y={470} />
      <Etq T={T} at={K.Pa + 2.6} until={K.Mi - 0.2} x={690} y={1080} texto="estufa Patsari" lado="der" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Pa + 3.6} until={K.Mi - 0.2} x={615} y={700} texto="chimenea" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Mi + 0.2} until={K.Mi + 2.5} texto="mediana, junto a la estufa" x={400} y={380} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Mi + 2.7} until={K.C - 0.2} texto="lo que respira cada persona al día" x={380} y={380} tam={28} borde={KC.blue} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="la mayor parte sale por la chimenea" x={600} y={250} tam={28} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="No es solo olor: *son partículas.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Ca - 0.1} texto="Leña a medio quemar *suelta partículas.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Pu - 0.1} texto="Menos de 2.5 µm: *30 veces más finas.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.E - 0.1} texto="Al fondo del pulmón, *y algunas a la sangre.*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.Mu - 0.1} texto="Hasta *100 veces* más de lo aceptable." />
      <Subtitulo T={T} idx={5} at={K.Mu + 0.1} until={K.Mx - 0.1} texto="*2.9 millones* de muertes en 2021." />
      <Subtitulo T={T} idx={6} at={K.Mx + 0.1} until={K.P - 0.1} texto="México 2025: *casi 1 de cada 10.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Pa - 0.1} texto="¿Y si no alcanza? *Hay salida.*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.Mi - 0.1} texto="2007, Michoacán: *la estufa Patsari.*" />
      <Subtitulo T={T} idx={9} at={K.Mi + 0.1} until={K.C - 0.1} texto="*−71 %* junto a la estufa · *la mitad* al día." />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="La mayor parte *sale por la chimenea.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cabello + 1.0, CUES.Pulmon - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pulmon + 1.8, CUES.Encierro - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Encierro + 1.2, CUES.Mundo - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Mundo + 5.4, CUES.Mexico - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Mexico + 0.6, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Patsari - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Patsari + 3.1, CUES.Mitad - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Mitad + 0.6, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="40" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HumoLenaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HumoShot /></CompositionStage></div>;
}
window.HumoLenaApp = HumoLenaApp;
