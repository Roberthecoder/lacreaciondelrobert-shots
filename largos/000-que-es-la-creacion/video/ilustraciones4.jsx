// ilustraciones4.jsx — dibujos de los capítulos 5 a 8 y nuevos íconos. Se suman a window.ILUS y window.ICONOS.
const W = 1920, H = 1080, TI = '#16120f', SW = 7;
const ease3 = (x) => 1 - Math.pow(1 - x, 3);
const pr = (v, a, b) => kprog(v, a, b);
const pop = (v, a, b = a + 0.08) => ease3(kprog(v, a, b));
const Tx = window.TextoSVG;

Object.assign(window.ICONOS, {
  matraz: () => <g><path d="M 82 40 L 82 90 L 45 160 Q 40 172 54 172 L 146 172 Q 160 172 155 160 L 118 90 L 118 40 Z" fill="#e9f4f7" stroke={TI} strokeWidth={7} strokeLinejoin="round" /><path d="M 62 130 L 138 130 L 152 160 Q 155 168 146 168 L 54 168 Q 45 168 48 160 Z" fill={KC.mint} /><rect x={74} y={30} width={52} height={14} rx={4} fill={TI} /></g>,
  atomo: (t) => <g transform={`rotate(${t * 20} 100 100)`}>{[0, 60, 120].map((a) => <ellipse key={a} cx={100} cy={100} rx={70} ry={26} fill="none" stroke={KC.blue} strokeWidth={7} transform={`rotate(${a} 100 100)`} />)}<circle cx={100} cy={100} r={14} fill={KC.pink} stroke={TI} strokeWidth={4} /></g>,
  chip: () => <g><rect x={55} y={55} width={90} height={90} rx={10} fill={KC.violet} stroke={TI} strokeWidth={7} />{[70, 90, 110, 130].map((v) => <g key={v}><path d={`M ${v} 55 L ${v} 35 M ${v} 145 L ${v} 165 M 55 ${v} L 35 ${v} M 145 ${v} L 165 ${v}`} stroke={TI} strokeWidth={6} /></g>)}<text x={100} y={112} fontFamily={KF.titulo} fontSize={34} textAnchor="middle" fill="#fff">IA</text></g>,
  adn: (t) => <g>{Array.from({ length: 9 }, (_, i) => { const y = 35 + i * 16, s = Math.sin(t * 2 + i * 0.7) * 40; return <g key={i}><line x1={100 - s} y1={y} x2={100 + s} y2={y} stroke={TI} strokeWidth={4} /><circle cx={100 - s} cy={y} r={8} fill={KC.pink} stroke={TI} strokeWidth={3} /><circle cx={100 + s} cy={y} r={8} fill={KC.cyan} stroke={TI} strokeWidth={3} /></g>; })}</g>,
  camara: () => <g><rect x={30} y={70} width={110} height={80} rx={14} fill={KC.red} stroke={TI} strokeWidth={7} /><path d="M 140 95 L 175 75 L 175 145 L 140 125 Z" fill={KC.red} stroke={TI} strokeWidth={7} strokeLinejoin="round" /><circle cx={70} cy={110} r={18} fill="#fff" stroke={TI} strokeWidth={5} /></g>,
  salsa: (t) => <g transform={`rotate(${10 * Math.sin(t * 3)} 100 120)`}><circle cx={100} cy={45} r={20} fill="#c98a5e" stroke={TI} strokeWidth={6} /><path d="M 100 65 L 100 120 M 100 80 L 60 60 M 100 80 L 145 95 M 100 120 L 70 165 M 100 120 L 140 160" stroke={TI} strokeWidth={9} strokeLinecap="round" /></g>,
  libro2: () => <g><rect x={50} y={40} width={100} height={130} rx={8} fill={KC.yellow} stroke={TI} strokeWidth={7} /><path d="M 70 70 L 130 70 M 70 95 L 130 95 M 70 120 L 115 120" stroke={TI} strokeWidth={6} /></g>,
  mundo: (t) => <g><circle cx={100} cy={100} r={66} fill={KC.cyan} stroke={TI} strokeWidth={7} /><path d={`M ${60 + 10 * Math.sin(t)} 70 q 30 -10 40 10 q -10 30 -40 20 z M 110 110 q 30 0 30 30 q -30 10 -40 -10 z`} fill={KC.leaf} stroke={TI} strokeWidth={4} /></g>,
});

Object.assign(window.ILUS, {
  // La primera bolsa de agar (grado alimenticio) que todavía dura.
  agar_bolsa: ({ p, tl }) => {
    const e = pop(p, 0.05, 0.25);
    return <g>
      <g transform={`translate(960 600) rotate(${-4 + 3 * Math.sin(tl * 0.7)}) scale(${0.6 + 0.4 * e})`} opacity={e}>
        <path d="M -250 -300 L 250 -300 L 280 300 L -280 300 Z" fill="#f4efe4" stroke={TI} strokeWidth={SW + 2} strokeLinejoin="round" />
        <path d="M -250 -300 Q 0 -340 250 -300" fill="none" stroke={TI} strokeWidth={8} />
        <rect x={-200} y={-180} width={400} height={150} rx={16} fill={KC.cyan} stroke={TI} strokeWidth={6} />
        <Tx x={0} y={-80} t="AGAR" tam={110} color={TI} />
        <Tx x={0} y={60} t="GRADO ALIMENTICIO" tam={44} color={TI} fuente={KF.texto} peso={900} />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-200 + (i % 4) * 110} y={110 + Math.floor(i / 4) * 50} width={70} height={14} rx={7} fill="#e8dcc0" />)}
      </g>
      <Tx x={960} y={170} t="MI PRIMERA BOLSA DE AGAR" tam={96} o={pop(p, 0.02)} />
      <Tx x={1560} y={900} t="(todavía la tengo)" tam={46} fuente={KF.texto} peso={800} o={pop(p, 0.55)} rot={-6} />
    </g>;
  },
  // Lo que puede traer el aserrín de carpintería.
  toxicos: ({ p, tl }) => {
    const items = [['MADERA TRATADA', '#7a5a2f'], ['PINTURA', KC.red], ['BARNIZ', '#c9862f'], ['PEGAMENTO', '#e8e2c8']];
    return <g>
      <g transform="translate(960 760)">
        <path d="M -330 0 Q 0 -330 330 0 Z" fill="#e3b778" stroke={TI} strokeWidth={SW} />
        {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M ${-260 + (i * 61) % 520} ${-20 - (i * 37) % 210} q 14 -8 26 4`} stroke="#b9874a" strokeWidth={5} fill="none" />)}
      </g>
      {items.map(([n, c], i) => { const e = pop(p, 0.18 + i * 0.1); const x = [340, 760, 1160, 1580][i];
        return <g key={i} opacity={e} transform={`translate(${x} ${380 + (i % 2) * 70}) scale(${0.6 + 0.4 * e})`}>
          <circle r={70} fill={c} stroke={TI} strokeWidth={SW} /><Tx x={0} y={20} t="!" tam={80} color={TI} />
          <Tx x={0} y={130} t={n} tam={40} fuente={KF.texto} peso={900} />
          <path d={`M 0 180 L ${(960 - x) * 0.35} ${300 - (i % 2) * 70}`} stroke={TI} strokeWidth={5} strokeDasharray="12 10" />
        </g>; })}
      <Tx x={960} y={170} t="¡ALTO!" tam={120} o={pop(p, 0.03)} />
      <Tx x={960} y={1010} t="LOS HONGOS PUEDEN ABSORBERLO" tam={56} color="#fff" o={pop(p, 0.6)} />
    </g>;
  },
  // Atletismo y natación.
  deportes: ({ p, tl }) => {
    const nat = p > 0.5;
    return <g>
      {!nat && <g>
        <rect x={0} y={760} width={W} height={320} fill="#c8503a" />{[0, 1, 2, 3].map((i) => <rect key={i} x={0} y={800 + i * 70} width={W} height={6} fill="#fff" />)}
        <g transform={`translate(${klerp(300, 1300, pr(p, 0.05, 0.45))} 0)`}><Nino x={0} y={1000} s={0.75} playera={KC.yellow} t={tl * 3} brazo={30 * Math.sin(tl * 8)} boca={p > 0.3 ? 'ay' : 'sonrisa'} /></g>
        {p > 0.28 && <g opacity={pop(p, 0.28)}><Tx x={1500} y={520} t="¡ACHÚ!" tam={110} color="#fff" rot={-8} /></g>}
        <Tx x={960} y={170} t="ATLETISMO · 4 SEMESTRES" tam={86} />
      </g>}
      {nat && <g>
        <rect x={0} y={420} width={W} height={660} fill="#39b7e8" />
        {[0, 1, 2].map((i) => <rect key={i} x={0} y={600 + i * 160} width={W} height={10} fill={i % 2 ? KC.red : '#fff'} strokeDasharray="30 20" />)}
        {(() => { const k = pr(p, 0.55, 0.95); const x = klerp(200, 1700, k), y = klerp(530, 850, k) + 10 * Math.sin(tl * 6);
          return <g transform={`translate(${x} ${y})`}><ellipse cx={0} cy={0} rx={70} ry={26} fill={KC.yellow} stroke={TI} strokeWidth={5} /><circle cx={70} cy={-6} r={26} fill="#c98a5e" stroke={TI} strokeWidth={5} />
            {[0, 1].map((k2) => <path key={k2} d={`M ${-20 + k2 * 40} -10 q 20 ${-40 * Math.sin(tl * 8 + k2 * 3)} 40 0`} stroke={TI} strokeWidth={8} fill="none" />)}</g>; })()}
        <Tx x={960} y={170} t="NATACIÓN · 6.º SEMESTRE" tam={86} />
        <Tx x={960} y={330} t="ENTRABA EN UN CARRIL… Y SALÍA POR OTRO" tam={54} fuente={KF.texto} peso={900} o={pop(p, 0.7)} />
      </g>}
    </g>;
  },
  // Salsa: dos pies izquierdos (cada vez menos).
  salsa: ({ p, tl }) => {
    const paso = Math.floor(tl * 2) % 4;
    return <g>
      <rect x={0} y={820} width={W} height={260} fill="#8a5a33" />
      {[[-1, KC.pink], [1, KC.cyan]].map(([d, c], i) => { const x = 960 + d * 170 + (i ? -1 : 1) * 30 * Math.sin(tl * 4); return <g key={i} transform={`translate(${x} 0)`}>
        <Nino x={0} y={1000} s={1.0} playera={c} t={tl * 2 + i} brazo={40 + 30 * Math.sin(tl * 4 + i)} boca={i ? 'sonrisa' : (paso === 2 ? 'o' : 'sonrisa')} />
      </g>; })}
      {[0, 1, 2].map((k) => <text key={k} x={300 + k * 120} y={300 + 30 * Math.sin(tl * 3 + k)} fontSize={90} fill="#fff" opacity={0.8}>♪</text>)}
      <g opacity={pop(p, 0.4)} transform="translate(1520 360) rotate(6)"><rect x={-260} y={-70} width={520} height={130} rx={16} fill={KC.yellow} stroke={TI} strokeWidth={6} /><Tx x={0} y={0} t="2 PIES IZQUIERDOS" tam={50} color={TI} /><Tx x={0} y={44} t="(cada vez menos)" tam={32} color={TI} fuente={KF.texto} peso={800} /></g>
      <Tx x={960} y={170} t="SALSA" tam={130} o={pop(p, 0.02)} />
    </g>;
  },
  // El hongo y la bacteria brillando junto a la cama.
  brillan: ({ p, tl }) => {
    const luz = pr(p, 0.1, 0.5);
    return <g>
      <rect x={0} y={0} width={W} height={H} fill="#060812" />
      <rect x={160} y={620} width={980} height={240} rx={30} fill="#1a1f33" stroke="#2c3350" strokeWidth={6} />
      <rect x={180} y={560} width={300} height={110} rx={40} fill="#262c45" />
      <rect x={1240} y={640} width={420} height={220} rx={10} fill="#1a1f33" stroke="#2c3350" strokeWidth={6} />
      {[[1360, '#9dff7a', 'PANELLUS'], [1540, '#5fd8ff', 'ALIIVIBRIO']].map(([x, c, n], i) => { const b = luz * (0.75 + 0.25 * Math.sin(tl * 1.5 + i * 2));
        return <g key={i}>
          <circle cx={x} cy={600} r={170 * b} fill={c} opacity={0.18 * b} />
          <ellipse cx={x} cy={620} rx={80} ry={32} fill="#10131f" stroke="#3a4260" strokeWidth={4} />
          <ellipse cx={x} cy={616} rx={60 * b} ry={22 * b} fill={c} opacity={0.9 * b} />
          <text x={x} y={720} fontFamily={KF.texto} fontWeight={900} fontSize={30} fill={c} textAnchor="middle" opacity={b}>{n}</text>
        </g>; })}
      <Tx x={960} y={170} t="BRILLANDO JUNTO A MI CAMA" tam={90} color="#e8f0ff" o={pop(p, 0.05)} />
    </g>;
  },
  // Mi primer PDA (regalo de cumpleaños).
  pda: ({ p, tl }) => {
    const abre = pr(p, 0.2, 0.5), sale = pop(p, 0.45, 0.65);
    return <g>
      <g transform="translate(960 700)">
        <rect x={-300} y={-160} width={600} height={300} fill={KC.pink} stroke={TI} strokeWidth={SW} />
        <rect x={-40} y={-160} width={80} height={300} fill={KC.yellow} />
        <g transform={`translate(0 ${-160}) rotate(${-110 * abre} -300 0)`}><rect x={-320} y={-60} width={640} height={60} fill={KC.pink} stroke={TI} strokeWidth={SW} /><rect x={-40} y={-60} width={80} height={60} fill={KC.yellow} /></g>
        <g opacity={sale} transform={`translate(0 ${-260 * sale})`}>
          <rect x={-120} y={-200} width={240} height={300} rx={20} fill="#fff" stroke={TI} strokeWidth={SW} />
          <rect x={-100} y={-140} width={200} height={90} rx={10} fill={KC.gold2} stroke={TI} strokeWidth={4} />
          <Tx x={0} y={-80} t="PDA" tam={64} color={TI} />
          <Tx x={0} y={40} t="papa dextrosa" tam={30} color={TI} fuente={KF.texto} peso={800} />
        </g>
      </g>
      <Tx x={960} y={170} t="DICIEMBRE 2025 · REGALO DE CUMPLEAÑOS" tam={70} o={pop(p, 0.02)} />
      <Tx x={960} y={1000} t="GRADO MICROBIOLÓGICO" tam={60} o={pop(p, 0.6)} color="#fff" />
    </g>;
  },
  // Fungi Mati: el nombre y su significado.
  fungimati: ({ p, tl }) => {
    const a = pop(p, 0.1, 0.25), b = pop(p, 0.4, 0.55), c = pop(p, 0.65, 0.8);
    return <g>
      <g transform={`translate(960 430) scale(${0.7 + 0.3 * a})`} opacity={a}>
        <Tx x={-250} y={60} t="FUNGI" tam={190} />
        <Tx x={300} y={60} t="MATI" tam={190} color={KC.violet} />
      </g>
      <g opacity={b}><Tx x={710} y={640} t="hongo" tam={70} fuente={KF.texto} peso={800} /><path d="M 710 520 L 710 580" stroke={TI} strokeWidth={6} /></g>
      <g opacity={c}><Tx x={1260} y={640} t="saber · conocer · entender" tam={58} fuente={KF.texto} peso={800} /><Tx x={1260} y={710} t="(náhuatl)" tam={40} fuente={KF.texto} peso={700} /><path d="M 1260 520 L 1260 580" stroke={TI} strokeWidth={6} /></g>
      <Tx x={960} y={170} t="FEBRERO 2026" tam={70} o={pop(p, 0.02)} />
    </g>;
  },
  // Lo que viene: una granjita que convierte residuos en comida.
  granjita: ({ p, tl }) => {
    const k = pr(p, 0.15, 0.9);
    return <g>
      <rect x={260} y={330} width={1400} height={560} fill="#f4efe4" stroke={TI} strokeWidth={SW} />
      <path d="M 220 340 L 960 160 L 1700 340 Z" fill={KC.leaf} stroke={TI} strokeWidth={SW} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => <g key={i}>
        <rect x={340 + i * 260} y={420} width={20} height={430} fill="#8a5a33" />
        {[0, 1, 2].map((j) => { const g = kclamp(k * 3 - (i * 0.3 + j * 0.2), 0, 1); return <g key={j} transform={`translate(${430 + i * 260} ${520 + j * 130})`}>
          <rect x={-55} y={-50} width={110} height={110} rx={20} fill="rgba(235,248,255,.8)" stroke={TI} strokeWidth={5} />
          <rect x={-50} y={-10} width={100} height={66} fill="#e3b778" />
          {g > 0 && <g transform={`translate(52 -20) scale(${0.45 * g})`}><path d="M -60 0 Q 0 -60 60 0 Q 0 22 -60 0 Z" fill="#d9dde3" stroke={TI} strokeWidth={6} /></g>}
        </g>; })}
      </g>)}
      <Tx x={960} y={110} t="MI GRANJITA" tam={90} o={pop(p, 0.02)} color="#fff" />
      <Tx x={960} y={990} t="RESIDUOS → COMIDA" tam={80} o={pop(p, 0.5)} color="#fff" />
    </g>;
  },
});
