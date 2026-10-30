// ilustraciones.jsx — dibujos del largo #00 para lo que no tiene foto real.
// ICONOS: íconos 200×200 para la escena "iconos". ILUS: escenas completas 1920×1080 (SVG) en función de p (0→1) y tl (seg).
// Estilo: colores planos de la marca, contorno de tinta grueso, todo se mueve un poco.

const W = 1920, H = 1080;
const TI = '#16120f';         // tinta
const PIEL = '#c98a5e', PIEL2 = '#a86f48', PELO = '#1d1712';
const SW = 7;                 // grosor de contorno
const ease3 = (x) => 1 - Math.pow(1 - x, 3);
const pr = (v, a, b) => kprog(v, a, b);
const pop = (v, a, b = a + 0.08) => ease3(kprog(v, a, b));

/* ---------- personaje: Robert niño ---------- */
function Nino({ x, y, s = 1, playera = KC.cyan, brazo = 0, boca = 'sonrisa', mira = 0, t = 0 }) {
  // (x, y) = pies; mide ~360 px de alto con s = 1
  const r = mece(t, 2, 0.6) * 2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-46} y={-120} width={36} height={120} rx={14} fill="#2c3e8f" stroke={TI} strokeWidth={SW} />
    <rect x={10} y={-120} width={36} height={120} rx={14} fill="#2c3e8f" stroke={TI} strokeWidth={SW} />
    <path d="M -70 -120 L -62 -250 Q 0 -275 62 -250 L 70 -120 Z" fill={playera} stroke={TI} strokeWidth={SW} strokeLinejoin="round" />
    <g transform={`rotate(${-20 - brazo} -60 -240)`}><rect x={-78} y={-245} width={30} height={120} rx={14} fill={PIEL} stroke={TI} strokeWidth={SW} /></g>
    <g transform={`rotate(${20 + brazo} 60 -240)`}><rect x={48} y={-245} width={30} height={120} rx={14} fill={PIEL} stroke={TI} strokeWidth={SW} /></g>
    <g transform={`rotate(${r} 0 -300)`}>
      <circle cx={0} cy={-325} r={62} fill={PIEL} stroke={TI} strokeWidth={SW} />
      <path d="M -62 -335 Q -60 -400 0 -398 Q 60 -400 64 -335 Q 30 -362 -8 -356 Q -40 -352 -62 -335 Z" fill={PELO} stroke={TI} strokeWidth={4} />
      <circle cx={-22 + mira} cy={-325} r={7} fill={TI} /><circle cx={22 + mira} cy={-325} r={7} fill={TI} />
      {boca === 'sonrisa' && <path d="M -24 -298 Q 0 -276 24 -298" fill="none" stroke={TI} strokeWidth={6} strokeLinecap="round" />}
      {boca === 'o' && <ellipse cx={0} cy={-292} rx={10} ry={13} fill={TI} />}
      {boca === 'ay' && <path d="M -22 -290 L -8 -298 L 8 -290 L 22 -298" fill="none" stroke={TI} strokeWidth={6} strokeLinecap="round" />}
    </g>
  </g>;
}
function Maceta({ x, y, s = 1, color = '#d9773f', children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
    <path d="M -60 -70 L 60 -70 L 46 0 L -46 0 Z" fill={color} stroke={TI} strokeWidth={SW} strokeLinejoin="round" />
    <rect x={-68} y={-90} width={136} height={24} rx={6} fill={color} stroke={TI} strokeWidth={SW} />
  </g>;
}
function Brote({ h = 1, t = 0, hojas = 2, color = KC.leaf }) {
  // tallo que crece hacia arriba desde (0,-90) con altura 160*h
  const L = 160 * h, m = mece(t, 4, 0.7) * 6;
  return <g>
    <path d={`M 0 -88 Q ${m} ${-88 - L / 2} ${m * 1.5} ${-88 - L}`} fill="none" stroke="#2f8a3a" strokeWidth={10} strokeLinecap="round" />
    {h > 0.35 && Array.from({ length: hojas }, (_, i) => {
      const yy = -88 - L * (0.45 + 0.4 * i / Math.max(1, hojas - 1)), lado = i % 2 ? 1 : -1, k = kclamp((h - 0.35) * 2, 0, 1);
      return <ellipse key={i} cx={lado * 34 * k + m} cy={yy} rx={38 * k} ry={16 * k} transform={`rotate(${lado * -25} ${lado * 34 * k + m} ${yy})`} fill={color} stroke={TI} strokeWidth={5} />;
    })}
  </g>;
}
function Jitomate({ x, y, r = 18 }) { return <g><circle cx={x} cy={y} r={r} fill={KC.red} stroke={TI} strokeWidth={4} /><path d={`M ${x - 8} ${y - r + 2} L ${x} ${y - r - 6} L ${x + 8} ${y - r + 2}`} fill="none" stroke="#2f8a3a" strokeWidth={4} /></g>; }
function Texto({ x, y, t, tam = 64, color = 'currentColor', anchor = 'middle', fuente = KF.titulo, o = 1, rot = 0, peso = 400 }) {
  return <text x={x} y={y} fontFamily={fuente} fontWeight={peso} fontSize={tam} fill={color} textAnchor={anchor} opacity={o} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>{t}</text>;
}
function Globo({ x, y, w, h, o = 1, children }) {
  return <g opacity={o}><rect x={x} y={y} width={w} height={h} rx={40} fill="#fff" stroke={TI} strokeWidth={SW} />
    <circle cx={x + 40} cy={y + h + 30} r={18} fill="#fff" stroke={TI} strokeWidth={SW} /><circle cx={x + 10} cy={y + h + 70} r={10} fill="#fff" stroke={TI} strokeWidth={SW} />{children}</g>;
}

/* ---------- íconos (viewBox 0 0 200 200) ---------- */
const ICONOS = {
  planta: (t) => <g><Maceta x={100} y={175} s={0.7}><Brote h={1} t={t} hojas={3} /></Maceta></g>,
  moneda: (t) => <g transform={`rotate(${8 * Math.sin(t)} 100 100)`}><circle cx={100} cy={100} r={62} fill="#d9dde3" stroke={TI} strokeWidth={8} /><circle cx={100} cy={100} r={46} fill="none" stroke={TI} strokeWidth={4} strokeDasharray="6 6" /><text x={100} y={118} fontFamily={KF.titulo} fontSize={52} textAnchor="middle" fill={TI}>$</text></g>,
  pi: () => <text x={100} y={140} fontFamily="Georgia, serif" fontWeight={700} fontSize={130} textAnchor="middle" fill={KC.blue}>π</text>,
  laboratorio: () => <g><rect x={40} y={60} width={120} height={90} rx={10} fill={KC.cyan} stroke={TI} strokeWidth={7} /><path d="M 70 60 L 70 40 L 130 40 L 130 60" fill="none" stroke={TI} strokeWidth={7} /><circle cx={80} cy={110} r={14} fill="#fff" stroke={TI} strokeWidth={5} /><circle cx={120} cy={110} r={14} fill="#fff" stroke={TI} strokeWidth={5} /><rect x={30} y={150} width={140} height={14} rx={6} fill={TI} /></g>,
  bano: () => <g><rect x={62} y={40} width={76} height={50} rx={8} fill="#fff" stroke={TI} strokeWidth={7} /><path d="M 50 95 L 150 95 Q 150 140 100 145 Q 50 140 50 95 Z" fill="#fff" stroke={TI} strokeWidth={7} /><path d="M 82 145 L 78 170 L 122 170 L 118 145" fill="#fff" stroke={TI} strokeWidth={7} /><path d="M 70 70 L 130 70" stroke={KC.leaf} strokeWidth={8} /></g>,
  frasco_malo: (t) => <g><rect x={60} y={50} width={80} height={110} rx={14} fill="#e9f4f7" stroke={TI} strokeWidth={7} /><rect x={66} y={34} width={68} height={22} rx={5} fill={KC.orange} stroke={TI} strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={80 + i * 13} cy={120 - (i % 2) * 18} r={12 + 3 * Math.sin(t * 2 + i)} fill={i % 2 ? '#3c8a3c' : '#6fae3a'} stroke={TI} strokeWidth={3} />)}
    <path d="M 40 40 L 160 160 M 160 40 L 40 160" stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={0.85} /></g>,
  youtube: () => <g><rect x={30} y={55} width={140} height={95} rx={26} fill={KC.red} stroke={TI} strokeWidth={7} /><path d="M 88 80 L 128 102 L 88 124 Z" fill="#fff" stroke={TI} strokeWidth={5} strokeLinejoin="round" /></g>,
  hongo: (t) => <g transform={`rotate(${4 * Math.sin(t)} 100 160)`}><path d="M 84 165 L 88 110 L 112 110 L 116 165 Z" fill="#f4efe4" stroke={TI} strokeWidth={7} /><path d="M 40 112 Q 100 20 160 112 Z" fill="#ff8fb8" stroke={TI} strokeWidth={7} strokeLinejoin="round" /></g>,
  medalla: () => <g><path d="M 70 30 L 100 90 L 130 30" fill="none" stroke={KC.blue} strokeWidth={18} /><circle cx={100} cy={120} r={48} fill={KC.gold2} stroke={TI} strokeWidth={7} /><text x={100} y={138} fontFamily={KF.titulo} fontSize={48} textAnchor="middle" fill={TI}>1</text></g>,
  libro: () => <g><path d="M 30 60 Q 65 45 100 62 Q 135 45 170 60 L 170 150 Q 135 135 100 152 Q 65 135 30 150 Z" fill="#fff" stroke={TI} strokeWidth={7} strokeLinejoin="round" /><path d="M 100 62 L 100 152" stroke={TI} strokeWidth={6} /></g>,
  estrella: () => <path d="M 100 30 L 120 80 L 172 82 L 130 114 L 146 166 L 100 136 L 54 166 L 70 114 L 28 82 L 80 80 Z" fill={KC.yellow} stroke={TI} strokeWidth={7} strokeLinejoin="round" />,
};

/* ---------- escenas ilustradas (1920×1080) ---------- */
const ILUS = {
  // El experimento del frijolito: frasco con algodón y un frijol que germina.
  frijolito: ({ p, tl }) => {
    const g = pr(p, 0.1, 0.85);
    return <g>
      <ellipse cx={960} cy={900} rx={330} ry={30} fill="rgba(0,0,0,.25)" />
      <rect x={760} y={360} width={400} height={540} rx={60} fill="rgba(235,248,255,.55)" stroke={TI} strokeWidth={SW + 2} />
      <rect x={780} y={330} width={360} height={50} rx={14} fill="#fff" stroke={TI} strokeWidth={SW} />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={810 + i * 38} cy={830 - (i % 3) * 22} r={44} fill="#fffdf6" stroke="#d8d2c4" strokeWidth={4} />)}
      <g transform={`translate(985 760)`}>
        <ellipse cx={0} cy={0} rx={36} ry={24} fill="#b5523b" stroke={TI} strokeWidth={6} />
        {g > 0.05 && <path d={`M -10 18 q -10 ${50 * g} -30 ${90 * g}`} fill="none" stroke="#f3e7c9" strokeWidth={8} strokeLinecap="round" />}
        <g transform={`translate(0 0)`}><Brote h={g * 2.1} t={tl} hojas={g > 0.6 ? 4 : 2} /></g>
      </g>
      <Texto x={960} y={230} t="EL EXPERIMENTO DEL FRIJOLITO" tam={78} o={pop(p, 0.02, 0.12)} />
    </g>;
  },
  // A los tres años: semillas "prestadas" de la cocina.
  semillas_cocina: ({ p, tl }) => {
    const salto = pr(p, 0.35, 0.65), brota = pr(p, 0.62, 0.95);
    const frascos = [['FRIJOL', '#b5523b'], ['MAÍZ', KC.yellow], ['LENTEJA', '#9c7a3c']];
    const sx = klerp(820, 1430, salto), sy = 430 - Math.sin(salto * Math.PI) * 260 + salto * 300;
    return <g>
      <rect x={300} y={520} width={760} height={24} fill="#8a5a33" stroke={TI} strokeWidth={SW} />
      {frascos.map(([n, c], i) => <g key={i} transform={`translate(${420 + i * 230} 520)`}>
        <rect x={-80} y={-230} width={160} height={230} rx={22} fill="rgba(240,250,255,.7)" stroke={TI} strokeWidth={SW} />
        <rect x={-80} y={-150} width={160} height={150} rx={20} fill={c} opacity={0.85} />
        <rect x={-62} y={-260} width={124} height={36} rx={8} fill={KC.red} stroke={TI} strokeWidth={6} />
        <rect x={-60} y={-110} width={120} height={46} rx={6} fill="#fff" stroke={TI} strokeWidth={4} />
        <Texto x={0} y={-75} t={n} tam={30} fuente={KF.texto} peso={900} />
      </g>)}
      <Nino x={600 + 20 * Math.sin(tl)} y={1000} s={0.8} playera={KC.orange} brazo={40 * pr(p, 0.15, 0.35)} boca={salto > 0 && salto < 1 ? 'o' : 'sonrisa'} t={tl} />
      {salto > 0 && salto < 1 && <ellipse cx={sx} cy={sy} rx={16} ry={11} fill="#b5523b" stroke={TI} strokeWidth={4} />}
      <Maceta x={1430} y={960} s={1.3}>{brota > 0 && <Brote h={brota * 1.2} t={tl} hojas={3} />}</Maceta>
      <Texto x={1430} y={300} t="¿QUÉ SALDRÁ?" tam={70} o={pop(p, 0.65)} rot={-4} />
      <Texto x={600} y={200} t="3 AÑOS" tam={110} color={KC.white} o={pop(p, 0.05)} />
    </g>;
  },
  // Mudanza para emprender: camioneta con macetas.
  mudanza: ({ p, tl }) => {
    const x = klerp(-500, 2300, pr(p, 0, 1, kEase.suave));
    const b = Math.abs(Math.sin(tl * 9)) * 6;
    return <g>
      <rect x={0} y={860} width={W} height={220} fill="#6b6f78" /><rect x={0} y={950} width={W} height={10} fill="#fff" strokeDasharray="60 40" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={((i * 220 - tl * 80) % 2400 + 2400) % 2400 - 200} y={950} width={110} height={10} fill="#fff" />)}
      <g transform={`translate(${x} ${-b})`}>
        <rect x={-300} y={640} width={420} height={210} rx={18} fill={KC.white} stroke={TI} strokeWidth={SW} />
        <path d="M 120 700 L 250 700 L 300 780 L 300 850 L 120 850 Z" fill={KC.yellow} stroke={TI} strokeWidth={SW} strokeLinejoin="round" />
        <rect x={160} y={715} width={80} height={55} rx={8} fill="#bfe8ff" stroke={TI} strokeWidth={5} />
        {[-220, -110, 0].map((mx, i) => <Maceta key={i} x={mx} y={640} s={0.8}><Brote h={1} t={tl + i} hojas={3} /></Maceta>)}
        {[-200, 200].map((wx, i) => <g key={i}><circle cx={wx} cy={860} r={52} fill={TI} /><circle cx={wx} cy={860} r={20} fill="#bbb" /></g>)}
      </g>
      <Texto x={960} y={250} t="NUEVA CASA, MISMO HOBBY" tam={96} o={pop(p, 0.1)} />
    </g>;
  },
  // El negocio de los papás: renta de computadoras + comida casera.
  negocio: ({ p, tl }) => {
    const izq = pop(p, 0.15), der = pop(p, 0.45);
    return <g>
      <rect x={260} y={300} width={1400} height={620} fill="#f4efe4" stroke={TI} strokeWidth={SW} />
      <rect x={220} y={240} width={1480} height={90} rx={10} fill={KC.red} stroke={TI} strokeWidth={SW} />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${220 + i * 123} 330 q 61 60 123 0`} fill={i % 2 ? '#fff' : KC.red} stroke={TI} strokeWidth={5} />)}
      <g opacity={izq} transform={`translate(0 ${(1 - izq) * 40})`}>
        <Texto x={610} y={470} t="COMPUTADORAS" tam={56} />
        {[0, 1, 2].map((i) => <g key={i} transform={`translate(${420 + i * 190} 560)`}>
          <rect x={-70} y={0} width={140} height={100} rx={8} fill="#2b3a55" stroke={TI} strokeWidth={6} />
          <rect x={-58} y={10} width={116} height={78} fill={(Math.floor(tl * 2) + i) % 3 === 0 ? KC.cyan : '#7fd6ff'} />
          <rect x={-12} y={100} width={24} height={40} fill={TI} /><rect x={-50} y={136} width={100} height={14} rx={5} fill={TI} />
        </g>)}
        <rect x={340} y={720} width={540} height={20} fill="#8a5a33" stroke={TI} strokeWidth={5} />
      </g>
      <line x1={960} y1={400} x2={960} y2={900} stroke={TI} strokeWidth={6} strokeDasharray="20 16" />
      <g opacity={der} transform={`translate(0 ${(1 - der) * 40})`}>
        <Texto x={1310} y={470} t="COMIDA CASERA" tam={56} />
        <ellipse cx={1310} cy={680} rx={250} ry={50} fill="#3a3a3a" stroke={TI} strokeWidth={SW} />
        {[-140, -40, 60, 160].map((dx, i) => <g key={i}><path d={`M ${1310 + dx - 45} 660 Q ${1310 + dx} 600 ${1310 + dx + 45} 660 Z`} fill="#f2d48a" stroke={TI} strokeWidth={5} /><path d={`M ${1310 + dx - 30} 650 q 30 -20 60 0`} fill="none" stroke={i % 2 ? KC.leaf : KC.red} strokeWidth={8} /></g>)}
        {[0, 1, 2].map((i) => <path key={i} d={`M ${1250 + i * 60} 580 q 15 -30 0 -60 q -15 -30 0 -60`} fill="none" stroke="#fff" strokeWidth={6} opacity={0.4 + 0.4 * Math.sin(tl * 3 + i)} />)}
      </g>
      <Texto x={960} y={190} t="PARAÍSOS DEL COLLI" tam={84} color={KC.white} o={pop(p, 0.02)} />
    </g>;
  },
  // Vitamina T: tacos, tortillas y tostadas.
  vitamina_t: ({ p, tl }) => {
    const items = [['TACOS', 0.12], ['TORTILLAS', 0.32], ['TOSTADAS', 0.52]];
    return <g>
      <Texto x={960} y={260} t="VITAMINA" tam={120} o={pop(p, 0.02)} />
      <g transform={`translate(960 640) scale(${1 + 0.04 * Math.sin(tl * 3)})`} opacity={pop(p, 0.05)}>
        <circle r={150} fill={KC.yellow} stroke={TI} strokeWidth={SW + 2} /><Texto x={0} y={70} t="T" tam={220} />
      </g>
      {items.map(([n, at], i) => { const e = pop(p, at); const x = [420, 960, 1500][i]; return <g key={i} opacity={e} transform={`translate(${x} ${i === 1 ? 930 : 690}) scale(${0.6 + 0.4 * e})`}>
        {i === 0 && <g><path d="M -110 30 Q 0 -110 110 30 Z" fill="#f2d48a" stroke={TI} strokeWidth={SW} /><path d="M -80 10 q 80 -50 160 0" fill="none" stroke={KC.leaf} strokeWidth={14} /><path d="M -60 25 q 60 -30 120 0" fill="none" stroke={KC.red} strokeWidth={10} /></g>}
        {i === 1 && <g>{[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={-k * 16} rx={120} ry={34} fill="#f4dfa8" stroke={TI} strokeWidth={5} />)}</g>}
        {i === 2 && <g><circle r={100} fill="#e9b85a" stroke={TI} strokeWidth={SW} /><circle r={70} fill="#f4efe4" /><circle cx={-20} cy={-10} r={18} fill={KC.red} /><circle cx={25} cy={15} r={14} fill={KC.leaf} /></g>}
        <Texto x={0} y={i === 1 ? 110 : 150} t={n} tam={52} fuente={KF.texto} peso={900} />
      </g>; })}
      <g opacity={pop(p, 0.72)} transform={`rotate(-5 1500 330)`}><rect x={1300} y={280} width={420} height={80} rx={14} fill={KC.pink} stroke={TI} strokeWidth={6} /><Texto x={1510} y={337} t="CULPA DE MI PAPÁ" tam={42} color="#fff" fuente={KF.texto} peso={900} /></g>
    </g>;
  },
  // "Yo también quiero mi changarro".
  changarro: ({ p, tl }) => {
    const g = pop(p, 0.12, 0.3), duda = pop(p, 0.55);
    return <g>
      <Nino x={560} y={1000} s={1.15} playera={KC.cyan} t={tl} boca={p > 0.55 ? 'o' : 'sonrisa'} mira={10} />
      <Globo x={820} y={180} w={860} h={430} o={g}>
        <rect x={960} y={360} width={580} height={30} fill="#8a5a33" stroke={TI} strokeWidth={6} />
        {[0, 1, 2, 3].map((i) => <Maceta key={i} x={1020 + i * 150} y={360} s={0.55}><Brote h={1} t={tl + i} hojas={3} /></Maceta>)}
        <rect x={980} y={420} width={540} height={60} rx={10} fill={KC.yellow} stroke={TI} strokeWidth={5} />
        <Texto x={1250} y={468} t="PLANTAS" tam={44} fuente={KF.texto} peso={900} />
      </Globo>
      <g opacity={duda}>{[0, 1].map((i) => <Texto key={i} x={260 + i * 1400} y={300} t="?" tam={160} color="#fff" rot={i ? 12 : -12} />)}
        <Texto x={960} y={800} t="¿TAN CHIQUITO?" tam={86} color="#fff" /></g>
    </g>;
  },
  // La mesa de jitomates y el señor que se las llevó todas.
  mesa_jitomates: ({ p, tl }) => {
    const n = 7, llega = pr(p, 0.45, 0.62), lleva = pr(p, 0.62, 0.9);
    const quedan = Math.ceil(n * (1 - lleva));
    const sx = klerp(2100, 1450, llega) + klerp(0, 900, pr(p, 0.92, 1));
    return <g>
      <rect x={180} y={640} width={1100} height={30} fill="#8a5a33" stroke={TI} strokeWidth={SW} />
      <rect x={220} y={670} width={24} height={250} fill="#8a5a33" stroke={TI} strokeWidth={5} /><rect x={1220} y={670} width={24} height={250} fill="#8a5a33" stroke={TI} strokeWidth={5} />
      {Array.from({ length: n }, (_, i) => i < quedan && <Maceta key={i} x={290 + i * 148} y={640} s={0.62}><Brote h={1.05} t={tl + i} hojas={4} /></Maceta>)}
      <Nino x={1300 - 40} y={1000} s={0.7} playera={KC.cyan} t={tl} boca={lleva > 0.3 ? 'o' : 'sonrisa'} />
      <g transform={`translate(${sx} 1000)`}>
        <rect x={-50} y={-180} width={40} height={180} rx={14} fill="#3b3b3b" stroke={TI} strokeWidth={SW} /><rect x={10} y={-180} width={40} height={180} rx={14} fill="#3b3b3b" stroke={TI} strokeWidth={SW} />
        <path d="M -80 -180 L -70 -400 Q 0 -425 70 -400 L 80 -180 Z" fill="#7a4fb3" stroke={TI} strokeWidth={SW} />
        <circle cx={0} cy={-470} r={66} fill={PIEL2} stroke={TI} strokeWidth={SW} />
        <path d="M -70 -500 L 70 -500 L 50 -560 L -50 -560 Z" fill="#d8b46a" stroke={TI} strokeWidth={6} /><rect x={-110} y={-512} width={220} height={20} rx={8} fill="#d8b46a" stroke={TI} strokeWidth={6} />
        <path d="M -20 -445 q 20 12 40 0" fill="none" stroke={TI} strokeWidth={6} />
        <rect x={-150} y={-330} width={110} height={130} rx={10} fill="#e6c48a" stroke={TI} strokeWidth={6} />
        {lleva > 0 && Array.from({ length: Math.min(4, n - quedan) }, (_, i) => <path key={i} d={`M ${-130 + i * 22} -330 q 5 -40 ${10 + i * 3} -70`} stroke="#2f8a3a" strokeWidth={8} fill="none" />)}
      </g>
      <g opacity={pop(p, 0.86)}><Texto x={700} y={300} t="¡LAS COMPRÓ TODAS!" tam={110} color="#fff" rot={-3} /></g>
      <g opacity={pop(p, 0.05) * (1 - pr(p, 0.4, 0.5))}><Texto x={730} y={300} t="MIS PLANTAS DE JITOMATE" tam={80} /></g>
    </g>;
  },
  // Plantas de olor: mayoreo → menudeo.
  mayoreo: ({ p, tl }) => {
    const sale = pr(p, 0.35, 0.8);
    return <g>
      <g transform="translate(470 700)" opacity={pop(p, 0.05)}>
        <rect x={-260} y={-120} width={520} height={220} rx={12} fill="#c98f4f" stroke={TI} strokeWidth={SW} />
        {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`translate(${-200 + i * 100} -32)`}><Brote h={0.9} t={tl + i} hojas={4} color="#58c46a" /></g>)}
        <Texto x={0} y={60} t="MAYOREO" tam={64} />
      </g>
      <path d={`M 800 640 L ${800 + 300 * sale} 640`} stroke={TI} strokeWidth={14} strokeLinecap="round" />
      {sale > 0.95 && <path d="M 1080 600 L 1130 640 L 1080 680" fill="none" stroke={TI} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
      {[0, 1, 2, 3].map((i) => { const e = pop(p, 0.5 + i * 0.08); return <g key={i} opacity={e} transform={`translate(${1260 + (i % 2) * 230} ${560 + Math.floor(i / 2) * 300}) scale(${0.5 + 0.5 * e})`}><Maceta x={0} y={0} s={0.8}><Brote h={0.9} t={tl + i} hojas={4} color="#58c46a" /></Maceta></g>; })}
      <Texto x={1490} y={1000} t="MENUDEO" tam={64} o={pop(p, 0.55)} />
      <Texto x={960} y={230} t="PLANTAS DE OLOR" tam={100} o={pop(p, 0.02)} />
    </g>;
  },
  // La papaya en el bote de detergente de 20 litros.
  papaya: ({ p, tl }) => {
    const esf = pr(p, 0.55, 0.7), ay = p > 0.62;
    const tiembla = ay ? Math.sin(tl * 40) * 3 : 0;
    return <g>
      <g transform={`translate(${tiembla} 0)`}>
        <Nino x={760} y={1010} s={0.85} playera={KC.orange} brazo={60} t={tl} boca={ay ? 'ay' : 'sonrisa'} />
        <g transform="translate(1060 1000)">
          <path d="M -170 -330 L 170 -330 L 150 0 L -150 0 Z" fill={KC.blue} stroke={TI} strokeWidth={SW + 2} strokeLinejoin="round" />
          <path d="M -90 -330 Q 0 -420 90 -330" fill="none" stroke={TI} strokeWidth={14} />
          <rect x={-110} y={-230} width={220} height={110} rx={12} fill="#fff" stroke={TI} strokeWidth={6} />
          <Texto x={0} y={-155} t="20 L" tam={70} />
          <g transform="translate(0 -330)">
            <path d={`M 0 0 Q ${mece(tl, 3) * 10} -260 ${mece(tl, 3) * 14} -470`} stroke="#7d8a4a" strokeWidth={26} fill="none" strokeLinecap="round" />
            {[-1, 1, -0.6, 0.6, 0].map((d, i) => <path key={i} d={`M ${mece(tl, 3) * 14} -470 q ${d * 160} ${-60 + Math.abs(d) * 40} ${d * 300} ${40 + Math.abs(d) * 30}`} stroke="#2f8a3a" strokeWidth={34} fill="none" strokeLinecap="round" />)}
            {[[-22, -380], [20, -360], [0, -330]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={22} ry={34} fill="#9ccf4a" stroke={TI} strokeWidth={5} />)}
          </g>
        </g>
      </g>
      {ay && <g opacity={pop(p, 0.62)}><Texto x={600} y={330} t="¡AY, MI ESPALDA!" tam={90} color="#fff" rot={-6} />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${690 + i * 30} 640 l 20 -30 l 20 30`} stroke={KC.red} strokeWidth={8} fill="none" />)}</g>}
      <Texto x={1460} y={260} t="5 O 6 AÑOS" tam={90} color="#fff" o={pop(p, 0.05) * (1 - esf)} />
    </g>;
  },
  // Plantas de colección: cactus, suculentas y carnívoras.
  coleccion: ({ p, tl }) => {
    const e = [pop(p, 0.25), pop(p, 0.42), pop(p, 0.58)];
    const lbl = ['CACTUS', 'SUCULENTAS', 'CARNÍVORAS'];
    return <g>
      <Texto x={960} y={220} t="PLANTAS DE COLECCIÓN" tam={100} o={pop(p, 0.05)} />
      {[480, 960, 1440].map((x, i) => <g key={i} opacity={e[i]} transform={`translate(${x} 880) scale(${0.5 + 0.5 * e[i]})`}>
        <Maceta x={0} y={0} s={1.4} color={['#d9773f', KC.lilac, KC.cyan][i]}>
          {i === 0 && <g><rect x={-34} y={-330} width={68} height={250} rx={34} fill="#3f9e4a" stroke={TI} strokeWidth={SW} /><path d="M -34 -220 q -60 0 -60 -60 l 0 -30" fill="none" stroke={TI} strokeWidth={SW} /><rect x={-96} y={-330} width={40} height={110} rx={20} fill="#3f9e4a" stroke={TI} strokeWidth={SW} />
            {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M ${-20 + (k % 3) * 20} ${-310 + k * 28} l -8 -6`} stroke="#fff" strokeWidth={4} />)}<circle cx={0} cy={-338} r={16} fill={KC.pink} stroke={TI} strokeWidth={4} /></g>}
          {i === 1 && <g>{Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <ellipse key={k} cx={Math.cos(a) * 46} cy={-150 + Math.sin(a) * 26} rx={44} ry={20} transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * 46} ${-150 + Math.sin(a) * 26})`} fill="#8fcf9a" stroke={TI} strokeWidth={5} />; })}<circle cx={0} cy={-150} r={30} fill="#b9e6c0" stroke={TI} strokeWidth={5} /></g>}
          {i === 2 && <g>{[-1, 1].map((d, k) => { const ab = 0.5 + 0.5 * Math.sin(tl * 2 + k); return <g key={k} transform={`translate(${d * 60} -160) rotate(${d * 20})`}>
            <path d="M 0 80 L 0 0" stroke="#2f8a3a" strokeWidth={10} />
            <path d={`M 0 0 Q -60 ${-30 - 30 * ab} -10 ${-80 - 20 * ab} Z`} fill={KC.red} stroke={TI} strokeWidth={5} /><path d={`M 0 0 Q 60 ${-30 - 30 * ab} 10 ${-80 - 20 * ab} Z`} fill={KC.red} stroke={TI} strokeWidth={5} />
          </g>; })}</g>}
        </Maceta>
        <Texto x={0} y={110} t={lbl[i]} tam={52} fuente={KF.texto} peso={900} />
      </g>)}
    </g>;
  },
};

Object.assign(window, { ICONOS, ILUS, Nino, Maceta, Brote, Jitomate, TextoSVG: Texto, Globo });
