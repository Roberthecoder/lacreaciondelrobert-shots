// ilustraciones2.jsx — dibujos del capítulo 2 (primaria). Se suman a window.ILUS.
const W = 1920, H = 1080, TI = '#16120f', SW = 7;
const PIEL = '#c98a5e', PIEL2 = '#a86f48';
const ease3 = (x) => 1 - Math.pow(1 - x, 3);
const pr = (v, a, b) => kprog(v, a, b);
const pop = (v, a, b = a + 0.08) => ease3(kprog(v, a, b));
const Tx = window.TextoSVG;

function Moneda({ x, y, r = 60, plata = false, t = 0, brilla = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${6 * Math.sin(t + x)})`}>
    {brilla > 0 && <circle r={r * (1.5 + 0.2 * Math.sin(t * 4))} fill={KC.white} opacity={0.35 * brilla} />}
    <circle r={r} fill={plata ? '#e6ebf2' : '#c08a3e'} stroke={TI} strokeWidth={SW} />
    <circle r={r * 0.74} fill="none" stroke={TI} strokeWidth={4} strokeDasharray="7 7" />
    <text y={r * 0.3} fontFamily={KF.titulo} fontSize={r * 0.9} textAnchor="middle" fill={TI}>{plata ? 'Ag' : '$'}</text>
  </g>;
}

Object.assign(window.ILUS, {
  // Varios caminos a la vez: una vereda que se abre en cuatro.
  caminos: ({ p, tl }) => {
    const ramas = [['PLANTAS', KC.leaf, -560], ['LETRAS', KC.pink, -190], ['NÚMEROS', KC.blue, 190], ['MONEDAS', '#c08a3e', 560]];
    return <g>
      <path d="M 960 1080 L 960 760" stroke="#f4efe4" strokeWidth={90} strokeLinecap="round" />
      {ramas.map(([n, c, dx], i) => { const e = pr(p, 0.12 + i * 0.12, 0.35 + i * 0.12); const ex = 960 + dx * e, ey = 760 - 420 * e;
        return <g key={i}>
          <path d={`M 960 770 Q ${960 + dx * 0.2} ${600} ${ex} ${ey}`} stroke="#f4efe4" strokeWidth={70} fill="none" strokeLinecap="round" />
          <path d={`M 960 770 Q ${960 + dx * 0.2} ${600} ${ex} ${ey}`} stroke={c} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray="30 26" />
          {e > 0.9 && <g transform={`translate(${ex} ${ey - 70}) scale(${pop(e, 0.9, 1)})`}><rect x={-140} y={-46} width={280} height={84} rx={14} fill={c} stroke={TI} strokeWidth={6} /><Tx x={0} y={18} t={n} tam={46} color="#fff" /></g>}
        </g>; })}
      <Nino x={960} y={1060} s={0.75} playera={KC.cyan} t={tl} />
    </g>;
  },
  // La tablet del concurso de escritura y el canal que nació en la cuenta de papá.
  tablet: ({ p, tl }) => {
    const e = pop(p, 0.05, 0.2), rec = pr(p, 0.35, 0.8), ups = pop(p, 0.86);
    return <g>
      <g transform={`translate(960 560) rotate(${-3 + 2 * Math.sin(tl * 0.8)}) scale(${0.7 + 0.3 * e})`} opacity={e}>
        <rect x={-430} y={-290} width={860} height={580} rx={50} fill="#222" stroke={TI} strokeWidth={SW + 2} />
        <rect x={-385} y={-245} width={770} height={490} rx={14} fill={rec > 0 ? '#fff' : '#3a4a66'} />
        {rec > 0 && <g>
          <rect x={-385} y={-245} width={770} height={90} fill={KC.red} />
          <path d="M -345 -225 h 70 a 14 14 0 0 1 14 14 v 22 a 14 14 0 0 1 -14 14 h -70 a 14 14 0 0 1 -14 -14 v -22 a 14 14 0 0 1 14 -14 z" fill="#fff" /><path d="M -320 -214 l 22 14 l -22 14 z" fill={KC.red} />
          <Tx x={40} y={-182} t="MI CANAL" tam={50} color="#fff" />
          {[0, 1].map((k) => <g key={k} transform={`translate(${-190 + k * 380} 40)`} opacity={pop(rec, 0.2 + k * 0.4)}>
            <rect x={-170} y={-120} width={340} height={200} rx={12} fill={k ? '#6a2c91' : KC.red} stroke={TI} strokeWidth={5} />
            <Tx x={0} y={110} t={k ? 'MAÍZ MORADO' : 'JITOMATE'} tam={36} color={TI} />
            {k === 0 ? <circle cx={0} cy={-20} r={56} fill="#ff6b5a" stroke={TI} strokeWidth={5} /> : <rect x={-30} y={-90} width={60} height={140} rx={30} fill="#3b1557" stroke={TI} strokeWidth={5} />}
          </g>)}
        </g>}
        <circle cx={-405} cy={0} r={8} fill="#555" />
      </g>
      <g opacity={pop(p, 0.02) * (1 - pr(p, 0.3, 0.36))}><Tx x={960} y={170} t="PREMIO DE ESCRITURA · 2.º DE PRIMARIA" tam={64} /></g>
      <g opacity={pop(p, 0.38)}><Tx x={960} y={170} t="EN LA CUENTA DE MI PAPÁ" tam={64} /></g>
      {ups > 0 && <g transform={`translate(1500 300) rotate(-12) scale(${ups})`}><rect x={-170} y={-80} width={340} height={150} rx={20} fill={KC.yellow} stroke={TI} strokeWidth={8} /><Tx x={0} y={35} t="ups" tam={120} color={TI} /></g>}
    </g>;
  },
  // Numismático: el bote de monedas, la de plata… y el imán.
  monedas: ({ p, tl }) => {
    const plata = pop(p, 0.35), iman = pr(p, 0.62, 0.8), nada = p > 0.82;
    return <g>
      <g transform="translate(560 760)">
        <path d="M -230 -300 L 230 -300 L 200 120 L -200 120 Z" fill="rgba(235,248,255,.6)" stroke={TI} strokeWidth={SW + 2} />
        {Array.from({ length: 26 }, (_, i) => <Moneda key={i} x={-170 + (i % 6) * 68} y={90 - Math.floor(i / 6) * 50 + (i % 2) * 10} r={34} t={tl} />)}
      </g>
      <g transform={`translate(${klerp(560, 1180, plata)} ${klerp(560, 520, plata) - Math.sin(plata * Math.PI) * 220})`}><Moneda x={0} y={0} r={klerp(34, 130, plata)} plata t={tl} brilla={plata} /></g>
      <Tx x={1180} y={760} t="¡UNA DE PLATA!" tam={74} o={pop(p, 0.4)} />
      {iman > 0 && <g transform={`translate(${klerp(1900, 1520, iman)} 470) rotate(-90)`}>
        <path d="M -70 0 L -70 -110 A 70 70 0 0 1 70 -110 L 70 0 L 30 0 L 30 -110 A 30 30 0 0 0 -30 -110 L -30 0 Z" fill={KC.red} stroke={TI} strokeWidth={6} />
        <rect x={-70} y={-20} width={40} height={36} fill="#ccc" stroke={TI} strokeWidth={5} /><rect x={30} y={-20} width={40} height={36} fill="#ccc" stroke={TI} strokeWidth={5} />
      </g>}
      {nada && <g opacity={pop(p, 0.84)}><Tx x={1200} y={920} t="(la plata no se pega al imán)" tam={48} fuente={KF.texto} peso={800} /></g>}
      <Tx x={960} y={180} t="NUMISMÁTICO (A NIVEL NIÑO)" tam={80} o={pop(p, 0.02)} />
    </g>;
  },
  // El tianguis Miramar y Don Joaquín.
  tianguis: ({ p, tl }) => {
    const toldos = [KC.pink, KC.yellow, KC.cyan, KC.orange];
    const dj = pop(p, 0.12), yol = pop(p, 0.6);
    return <g>
      {toldos.map((c, i) => <g key={i} transform={`translate(${170 + i * 460} 0)`}>
        <path d={`M 0 300 L 420 300 L 400 380 L 20 380 Z`} fill={c} stroke={TI} strokeWidth={SW} />
        {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${20 + k * 76} 380 q 38 40 76 0`} fill={c} stroke={TI} strokeWidth={5} />)}
        <rect x={30} y={380} width={10} height={420} fill="#777" /><rect x={380} y={380} width={10} height={420} fill="#777" />
        <rect x={10} y={700} width={400} height={30} fill="#8a5a33" stroke={TI} strokeWidth={6} />
      </g>)}
      {[0, 1, 2, 3, 4, 5].map((k) => <Moneda key={k} x={250 + k * 50} y={680} r={22} plata={k === 2} t={tl} />)}
      <rect x={640} y={630} width={60} height={70} rx={8} fill="#b5523b" stroke={TI} strokeWidth={5} />
      <g opacity={dj} transform={`translate(330 1000)`}>
        <rect x={-50} y={-200} width={40} height={200} rx={14} fill="#4a4a4a" stroke={TI} strokeWidth={SW} /><rect x={10} y={-200} width={40} height={200} rx={14} fill="#4a4a4a" stroke={TI} strokeWidth={SW} />
        <path d="M -80 -200 L -72 -420 Q 0 -440 72 -420 L 80 -200 Z" fill="#c9b07a" stroke={TI} strokeWidth={SW} />
        <circle cx={0} cy={-490} r={64} fill={PIEL2} stroke={TI} strokeWidth={SW} /><path d="M -60 -520 Q 0 -580 60 -520" fill="#ddd" stroke={TI} strokeWidth={5} />
        <path d="M -30 -470 q 30 18 60 0" fill="none" stroke={TI} strokeWidth={6} /><path d="M -34 -455 q 34 22 68 0" fill="#eee" stroke={TI} strokeWidth={4} />
      </g>
      <Tx x={330} y={260} t="DON JOAQUÍN" tam={56} o={dj} color="#fff" />
      <Nino x={640} y={1000} s={0.7} playera={KC.cyan} t={tl} mira={-10} boca={p > 0.4 ? 'o' : 'sonrisa'} />
      <g opacity={pop(p, 0.35)}><Globo x={720} y={440} w={330} h={120}><Tx x={885} y={520} t="¡PLANTAS!" tam={56} color={TI} /></Globo></g>
      <g opacity={yol} transform="translate(1520 1000)">
        <rect x={-45} y={-200} width={36} height={200} rx={14} fill="#3b3b3b" stroke={TI} strokeWidth={SW} /><rect x={9} y={-200} width={36} height={200} rx={14} fill="#3b3b3b" stroke={TI} strokeWidth={SW} />
        <path d="M -78 -200 L -66 -410 Q 0 -432 66 -410 L 78 -200 Z" fill={KC.lilac} stroke={TI} strokeWidth={SW} />
        <circle cx={0} cy={-480} r={62} fill={PIEL} stroke={TI} strokeWidth={SW} /><path d="M -66 -470 Q -70 -560 0 -556 Q 70 -560 66 -470 Q 60 -520 0 -518 Q -60 -520 -66 -470 Z" fill="#3a2418" stroke={TI} strokeWidth={4} />
        <path d="M -24 -456 q 24 16 48 0" fill="none" stroke={TI} strokeWidth={6} />
        <rect x={60} y={-330} width={120} height={150} rx={8} fill="#fff" stroke={TI} strokeWidth={5} /><Tx x={120} y={-245} t="LUGAR" tam={34} color={TI} />
      </g>
      <Tx x={1520} y={260} t="DOÑA YOLANDA" tam={56} o={yol} color="#fff" />
      <Tx x={960} y={150} t="TIANGUIS MIRAMAR" tam={90} o={pop(p, 0.02)} />
    </g>;
  },
  // Jardín vertical en un orfanato.
  jardin_vertical: ({ p, tl }) => {
    const n = 24, cols = 6;
    return <g>
      <rect x={560} y={220} width={800} height={640} rx={16} fill="#8a5a33" stroke={TI} strokeWidth={SW} />
      {Array.from({ length: n }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), e = pop(p, 0.08 + (i / n) * 0.7, 0.14 + (i / n) * 0.7);
        const x = 640 + c * 128, y = 300 + f * 150;
        return <g key={i} opacity={e} transform={`translate(${x} ${y}) scale(${e})`}>
          <rect x={-50} y={0} width={100} height={60} rx={10} fill={['#2f8a3a', '#3fbf4a', '#58c46a'][i % 3]} stroke={TI} strokeWidth={4} />
          {[-30, 0, 30].map((dx, k) => <ellipse key={k} cx={dx + mece(tl, i + k) * 4} cy={-14} rx={20} ry={34} fill={['#3fbf4a', '#2fe0a8', '#8fcf9a'][(i + k) % 3]} stroke={TI} strokeWidth={3} />)}
          {i % 5 === 0 && <circle cx={0} cy={-40} r={14} fill={[KC.pink, KC.yellow, KC.orange][i % 3]} stroke={TI} strokeWidth={3} />}
        </g>; })}
      {[0, 1, 2].map((k) => <Nino key={k} x={330 + k * 0 + (k === 1 ? 1260 : k === 2 ? 1460 : 0)} y={1040} s={k ? 0.55 : 0.6} playera={[KC.cyan, KC.yellow, KC.pink][k]} t={tl + k} brazo={k ? 30 : 0} />)}
      <Tx x={960} y={150} t="UN JARDÍN VERTICAL" tam={90} o={pop(p, 0.02)} />
    </g>;
  },
  // La nota del periódico (recreada; fuente en pantalla).
  periodico: ({ p, tl, v }) => {
    const e = pop(p, 0.02, 0.2), r = klerp(-25, -3, e);
    return <g transform={`translate(960 560) rotate(${r + Math.sin(tl * 0.6)}) scale(${klerp(0.3, 1, e)})`} opacity={e}>
      <rect x={-560} y={-420} width={1120} height={800} fill="#f7f3ea" stroke={TI} strokeWidth={SW} />
      <Tx x={0} y={-330} t={v.medio || 'MURAL'} tam={90} color={TI} fuente="Georgia, 'Times New Roman', serif" peso={700} />
      <rect x={-500} y={-300} width={1000} height={6} fill={TI} />
      <Tx x={0} y={-270} t={v.fecha || ''} tam={30} color="#555" fuente={KF.texto} peso={700} />
      <Tx x={0} y={-140} t="Emprendedor, matemático…" tam={86} color={TI} fuente={KF.titulo} />
      <Tx x={0} y={-40} t="y sólo tiene 11 años de edad" tam={86} color={TI} fuente={KF.titulo} />
      <rect x={-500} y={20} width={460} height={320} fill="#d8d2c4" stroke={TI} strokeWidth={4} />
      <Nino x={-270} y={330} s={0.62} playera="#fff" t={tl} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={20} y={40 + i * 34} width={i === 8 ? 300 : 480} height={14} rx={7} fill="#bdb6a8" />)}
      <Tx x={0} y={370} t={v.credito || ''} tam={24} color="#666" fuente={KF.texto} peso={700} />
    </g>;
  },
});
