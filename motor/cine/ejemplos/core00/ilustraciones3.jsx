// ilustraciones3.jsx — dibujos de los capítulos 3 y 4 (hongos y laboratorio casero). Se suman a window.ILUS.
const W = 1920, H = 1080, TI = '#16120f', SW = 7;
const ease3 = (x) => 1 - Math.pow(1 - x, 3);
const pr = (v, a, b) => kprog(v, a, b);
const pop = (v, a, b = a + 0.08) => ease3(kprog(v, a, b));
const Tx = window.TextoSVG;

// Racimo de setas ostra (sombreros en abanico). color: sombrero; g: crecimiento 0→1.
function Setas({ x, y, s = 1, color = '#ff8fb8', laminas = '#ffd0e0', g = 1, t = 0, n = 5 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => {
      const a = -70 + (i / (n - 1)) * 140, k = kclamp(g * 1.4 - i * 0.08, 0, 1), r = (60 + 30 * ((i * 7) % 3)) * k;
      const rad = (a * Math.PI) / 180, cx = Math.sin(rad) * 110 * k, cy = -Math.cos(rad) * 70 * k - 40 * k + mece(t, i, 0.4) * 3;
      if (k <= 0) return null;
      return <g key={i} transform={`translate(${cx} ${cy}) rotate(${a * 0.8})`}>
        <path d={`M 0 ${40 * k} L 0 0`} stroke="#f4efe4" strokeWidth={18 * k} strokeLinecap="round" />
        <path d={`M ${-r} 0 Q 0 ${-r * 0.9} ${r} 0 Q 0 ${r * 0.35} ${-r} 0 Z`} fill={color} stroke={TI} strokeWidth={5} />
        {Array.from({ length: 5 }, (_, j) => <path key={j} d={`M 0 ${r * 0.12} L ${(-r + (j + 0.5) * (2 * r) / 5) * 0.8} ${r * 0.05}`} stroke={laminas} strokeWidth={3} />)}
      </g>;
    })}
  </g>;
}
function Frasco({ x, y, s = 1, relleno = '#e8d7a8', alto = 0.6, tapa = KC.orange, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-200} width={140} height={200} rx={22} fill="rgba(235,248,255,.65)" stroke={TI} strokeWidth={SW} />
    <rect x={-66} y={-200 * alto} width={132} height={200 * alto - 4} rx={18} fill={relleno} />
    {children}
    <rect x={-58} y={-226} width={116} height={32} rx={8} fill={tapa} stroke={TI} strokeWidth={6} />
  </g>;
}
function Tache({ x, y, s = 1, o = 1 }) { return <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={22} strokeLinecap="round" /></g>; }
function Petri({ x, y, r = 170, fondo = '#f3e6a6', children }) {
  return <g transform={`translate(${x} ${y})`}><ellipse cx={0} cy={18} rx={r + 10} ry={(r + 10) * 0.42} fill="rgba(0,0,0,.2)" />
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.42} fill={fondo} stroke={TI} strokeWidth={SW} />{children}
    <ellipse cx={0} cy={-6} rx={r} ry={r * 0.42} fill="rgba(255,255,255,.18)" stroke={TI} strokeWidth={4} /></g>;
}

Object.assign(window.ILUS, {
  // ¿Cómo crece un champiñón? Tutorial, café… y la composta muy específica.
  champinon: ({ p, tl }) => {
    const f1 = p < 0.33, f2 = p >= 0.33 && p < 0.64, f3 = p >= 0.64;
    return <g>
      {f1 && <g opacity={pop(p, 0.01)}>
        <Nino x={620} y={1010} s={1.0} playera={KC.cyan} t={tl} boca="o" mira={12} />
        <g transform={`translate(1240 640) scale(${1 + 0.03 * Math.sin(tl * 3)})`}>
          <path d="M -60 160 L -50 20 L 50 20 L 60 160 Z" fill="#f4efe4" stroke={TI} strokeWidth={SW} />
          <path d="M -200 30 Q -190 -170 0 -175 Q 190 -170 200 30 Z" fill="#f2ead8" stroke={TI} strokeWidth={SW} />
          <Tx x={0} y={-230} t="?" tam={160} color="#fff" />
        </g>
        <Tx x={960} y={170} t="¿CÓMO RAYOS CRECE UN CHAMPIÑÓN?" tam={80} />
        <Tx x={640} y={300} t="10 AÑOS" tam={70} color="#fff" />
      </g>}
      {f2 && <g>
        {[['TUTORIAL', '#cbb796', 0.36], ['CAFÉ', '#5a3a22', 0.47]].map(([n, c, at], i) => <g key={i} opacity={pop(p, at)}>
          <Frasco x={640 + i * 640} y={820} s={1.6} relleno={c} alto={0.55} />
          <Tx x={640 + i * 640} y={930} t={n} tam={64} />
          <Tache x={640 + i * 640} y={640} s={1.4} o={pop(p, at + 0.06)} />
        </g>)}
        <Tx x={960} y={170} t="NO FUNCIONÓ… TAMPOCO" tam={90} o={pop(p, 0.34)} />
      </g>}
      {f3 && <g>
        <g transform="translate(960 600)" opacity={pop(p, 0.65)}>
          <rect x={-420} y={-120} width={840} height={300} rx={20} fill="#5a3a22" stroke={TI} strokeWidth={SW} />
          {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={-380 + (i * 97) % 760} cy={-80 + (i * 53) % 240} r={8 + (i % 4) * 3} fill={['#7b5434', '#3e2716', '#a07a4f'][i % 3]} />)}
          <Tx x={0} y={260} t="COMPOSTA MUY ESPECÍFICA" tam={64} />
        </g>
        <Tx x={960} y={170} t="DE LOS PEORES PARA EMPEZAR" tam={90} o={pop(p, 0.66)} />
      </g>}
    </g>;
  },
  // Los dos primeros kits: seta rosa y seta "azul".
  kits: ({ p, tl }) => {
    return <g>
      {[['SETA ROSA', '#ff8fb8', 0.12], ['SETA "AZUL"', '#7aa7ff', 0.32]].map(([n, c, at], i) => { const e = pop(p, at, at + 0.15); return <g key={i} opacity={e} transform={`translate(${620 + i * 680} ${600 + (1 - e) * 80}) rotate(${(i ? 4 : -4) + 2 * Math.sin(tl + i)})`}>
        <path d="M -200 -230 L 200 -230 L 230 280 L -230 280 Z" fill="#fff" stroke={TI} strokeWidth={SW} strokeLinejoin="round" />
        <rect x={-200} y={-230} width={400} height={70} fill={c} stroke={TI} strokeWidth={6} />
        <Tx x={0} y={-180} t="KIT" tam={56} color={TI} />
        <Setas x={0} y={110} s={1.1} color={c} laminas="#fff" g={1} t={tl + i} />
        <Tx x={0} y={250} t={n} tam={56} color={TI} />
      </g>; })}
      <Tx x={960} y={170} t="APRENDER DE OTROS" tam={96} o={pop(p, 0.02)} />
    </g>;
  },
  // La rosa creció primero: olor y color.
  seta_rosa: ({ p, tl }) => {
    const g = pr(p, 0.05, 0.6);
    return <g>
      <rect x={760} y={560} width={400} height={360} rx={30} fill="#efe6d2" stroke={TI} strokeWidth={SW} />
      <Setas x={960} y={600} s={2.1} color="#ff6fa3" laminas="#ffd0e0" g={g} t={tl} n={7} />
      {g > 0.7 && [0, 1, 2].map((i) => { const k = (tl * 0.5 + i / 3) % 1; return <path key={i} d={`M ${1250 + i * 40} ${520 - k * 260} q 30 -30 0 -60 q -30 -30 0 -60`} fill="none" stroke="#fff" strokeWidth={8} opacity={(1 - k) * 0.9} />; })}
      <Tx x={1500} y={420} t="OLOR" tam={80} color="#fff" o={pop(p, 0.6)} rot={6} />
      <Tx x={420} y={420} t="COLOR" tam={80} color="#ff6fa3" o={pop(p, 0.72)} rot={-6} />
      <Tx x={960} y={170} t="¡MARAVILLOSO!" tam={110} o={pop(p, 0.5)} />
    </g>;
  },
  // La "azul" salió gris: depende de la luz.
  seta_azul: ({ p, tl }) => {
    const luz = pr(p, 0.45, 0.75);
    const col = mixHex('#8a8f98', '#5b86e5', luz * (0.5 + 0.5 * Math.sin(tl * 2)) * 0.9);
    return <g>
      <rect x={760} y={560} width={400} height={360} rx={30} fill="#efe6d2" stroke={TI} strokeWidth={SW} />
      <Setas x={960} y={600} s={2.1} color={col} laminas="#dfe3ea" g={pr(p, 0, 0.3)} t={tl} n={7} />
      <g transform="translate(1450 330)" opacity={pop(p, 0.42)}>
        <path d="M -60 -40 L 60 -40 L 110 60 L -110 60 Z" fill={KC.yellow} stroke={TI} strokeWidth={6} />
        <rect x={-8} y={-160} width={16} height={120} fill={TI} />
        <path d={`M -100 60 L ${-300} 330 L 300 330 L 100 60 Z`} fill={KC.yellow} opacity={0.25 * luz} />
      </g>
      <Tx x={960} y={170} t={'¿"AZUL"? …ERA GRIS'} tam={100} o={pop(p, 0.05)} />
      <Tx x={960} y={1010} t="DEPENDE DE LA LUZ" tam={60} color="#fff" o={pop(p, 0.5)} />
    </g>;
  },
  // La recámara se va convirtiendo en laboratorio.
  recamara: ({ p, tl }) => {
    const n = 14, k = pr(p, 0.15, 0.9);
    return <g>
      <rect x={260} y={180} width={1400} height={760} fill="#f4efe4" stroke={TI} strokeWidth={SW} />
      <rect x={260} y={820} width={1400} height={120} fill="#c9a77a" stroke={TI} strokeWidth={SW} />
      <rect x={330} y={640} width={520} height={180} rx={20} fill={KC.blue} stroke={TI} strokeWidth={SW} />
      <rect x={350} y={600} width={160} height={70} rx={20} fill="#fff" stroke={TI} strokeWidth={6} />
      <rect x={1280} y={260} width={300} height={200} fill="#bfe8ff" stroke={TI} strokeWidth={SW} />
      <rect x={1000} y={560} width={560} height={24} fill="#8a5a33" stroke={TI} strokeWidth={6} /><rect x={1000} y={400} width={560} height={24} fill="#8a5a33" stroke={TI} strokeWidth={6} />
      {Array.from({ length: n }, (_, i) => { const e = pop(k, i / n, i / n + 0.08); const fila = i % 2, col = Math.floor(i / 2);
        return <g key={i} opacity={e} transform={`translate(${1040 + col * 76} ${fila ? 560 : 400}) scale(${0.32 * e})`}>
          <Frasco x={0} y={0} relleno={['#e8d7a8', '#f3e6a6', '#d9c38f'][i % 3]} alto={0.55} tapa={[KC.orange, KC.cyan, KC.pink][i % 3]}>
            {i % 3 === 0 && <rect x={-60} y={-110} width={120} height={70} fill="#fff" opacity={0.85} />}</Frasco>
        </g>; })}
      {k > 0.5 && <g opacity={pop(p, 0.6)}><rect x={560} y={500} width={200} height={110} rx={12} fill="rgba(255,255,255,.7)" stroke={TI} strokeWidth={5} /><ellipse cx={660} cy={560} rx={60} ry={22} fill="#f3e6a6" stroke={TI} strokeWidth={4} /></g>}
      <Tx x={960} y={130} t="DE RECÁMARA A LABORATORIO" tam={84} color="#fff" o={pop(p, 0.02)} />
      <Tx x={960} y={1030} t="CASERO E IMPROVISADO" tam={56} color="#fff" o={pop(p, 0.55)} />
    </g>;
  },
  // Gelatina en vez de agar: se derrite, bacterias, algo rojo con olor a paleta de cereza… y un poquito de micelio.
  gelatina: ({ p, tl }) => {
    const derr = pr(p, 0.22, 0.4), bact = pr(p, 0.36, 0.55), rojo = pr(p, 0.5, 0.7), mic = pr(p, 0.8, 0.97);
    return <g>
      <Petri x={760} y={620} r={330} fondo={mixHex('#ffcf5a', '#f0b84a', derr)}>
        {derr > 0 && <ellipse cx={30} cy={40} rx={300 * derr} ry={60 * derr} fill="#f0b84a" opacity={0.7} />}
        {Array.from({ length: 22 }, (_, i) => { const e = pop(bact, i / 22, i / 22 + 0.1); return <circle key={i} cx={-260 + ((i * 131) % 520)} cy={-100 + ((i * 47) % 200)} r={10 * e + (i % 3) * 3 * e} fill={['#fff7d6', '#e9e0b0', '#d8f0c0'][i % 3]} stroke={TI} strokeWidth={2} />; })}
        {rojo > 0 && <ellipse cx={120} cy={10} rx={90 * rojo} ry={40 * rojo} fill="#e8193d" stroke={TI} strokeWidth={4} />}
        {mic > 0 && <g>{Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <path key={i} d={`M -150 0 q ${Math.cos(a) * 40 * mic} ${Math.sin(a) * 20 * mic} ${Math.cos(a) * 70 * mic} ${Math.sin(a) * 30 * mic}`} stroke="#fff" strokeWidth={5} fill="none" />; })}<circle cx={-150} cy={0} r={22 * mic} fill="#fff" /></g>}
      </Petri>
      <Tx x={760} y={280} t={derr < 0.3 ? 'GELATINA EN VEZ DE AGAR' : rojo < 0.3 ? 'SE DERRITIÓ… Y BACTERIAS' : mic > 0.1 ? 'PERO EL MICELIO CRECIÓ UN POQUITO' : 'ALGO ROJO…'} tam={70} color="#fff" />
      {rojo > 0 && mic < 0.2 && <g opacity={pop(p, 0.55)} transform={`translate(1450 560) rotate(${12 + 4 * Math.sin(tl * 2)})`}>
        <rect x={-14} y={60} width={28} height={200} rx={8} fill="#e7cfa2" stroke={TI} strokeWidth={6} />
        <path d="M -120 70 L -120 -170 Q 0 -260 120 -170 L 120 70 Z" fill="#e8193d" stroke={TI} strokeWidth={SW} />
        <path d="M -70 -150 q 20 -40 50 -40" stroke="#fff" strokeWidth={14} fill="none" opacity={0.6} strokeLinecap="round" />
        <Tx x={0} y={360} t="OLOR A PALETA DE CEREZA" tam={46} color="#fff" />
      </g>}
      {mic > 0.3 && <Tx x={1450} y={560} t="ESPERANZA" tam={110} color="#fff" o={pop(p, 0.85)} rot={-6} />}
    </g>;
  },
  // Aserrín y viruta de carpintería → setas.
  aserrin: ({ p, tl }) => {
    const pas = pr(p, 0.25, 0.45), ino = pr(p, 0.45, 0.6), set = pr(p, 0.62, 0.95);
    return <g>
      <g transform="translate(420 760)" opacity={pop(p, 0.03)}>
        <path d="M -230 0 Q 0 -260 230 0 Z" fill="#e3b778" stroke={TI} strokeWidth={SW} />
        {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M ${-180 + (i * 61) % 360} ${-20 - (i * 37) % 150} q 14 -8 26 4`} stroke="#b9874a" strokeWidth={5} fill="none" />)}
        <Tx x={0} y={90} t="ASERRÍN Y VIRUTA" tam={52} />
      </g>
      <g transform="translate(960 760)" opacity={pop(p, 0.25)}>
        <rect x={-150} y={-260} width={300} height={260} rx={20} fill="#999" stroke={TI} strokeWidth={SW} />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${-60 + i * 60} -280 q 20 -40 0 -80 q -20 -40 0 -80`} fill="none" stroke="#fff" strokeWidth={8} opacity={pas * (0.4 + 0.4 * Math.sin(tl * 3 + i))} />)}
        <Tx x={0} y={90} t="PASTEURIZAR" tam={52} />
      </g>
      <g transform="translate(1500 800)" opacity={pop(p, 0.45)}>
        <path d="M -150 0 L -130 -360 L 130 -360 L 150 0 Z" fill="rgba(235,248,255,.7)" stroke={TI} strokeWidth={SW} />
        <rect x={-140} y={-300} width={280} height={296} fill="#e3b778" opacity={0.9} />
        {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-100 + (i * 53) % 200} cy={-260 + (i * 71) % 240} r={10 * ino} fill="#fff" />)}
        <Setas x={140} y={-200} s={0.9} color="#d9dde3" laminas="#fff" g={set} t={tl} />
        <Tx x={0} y={60} t="¡SETAS!" tam={60} o={set} />
      </g>
      <Tx x={960} y={170} t="SUSTRATOS" tam={110} o={pop(p, 0.02)} />
    </g>;
  },
  // Café usado: Trichoderma… hasta el prototipo mitad café, mitad aserrín.
  cafe: ({ p, tl }) => {
    const moho = pr(p, 0.12, 0.4), proto = p > 0.55;
    return <g>
      {!proto && <g>
        <Frasco x={960} y={880} s={2.4} relleno="#4a2f1c" alto={0.6}>
          {Array.from({ length: 14 }, (_, i) => { const e = pop(moho, i / 14, i / 14 + 0.1); return <circle key={i} cx={-55 + (i * 37) % 110} cy={-110 + (i * 23) % 90} r={14 * e} fill={i % 3 ? '#3fa34d' : '#8bd06a'} stroke={TI} strokeWidth={2} />; })}
        </Frasco>
        <Tx x={960} y={170} t="CAFÉ USADO, SOLO" tam={100} />
        <Tx x={1500} y={520} t="TRICHODERMA" tam={64} color="#fff" fuente={KF.texto} peso={900} o={pop(p, 0.3)} rot={-4} />
        <Tache x={960} y={560} s={2} o={pop(p, 0.42)} />
      </g>}
      {proto && <g>
        <g transform="translate(960 880)" opacity={pop(p, 0.56)}>
          <path d="M -220 0 L -200 -480 L 200 -480 L 220 0 Z" fill="rgba(235,248,255,.7)" stroke={TI} strokeWidth={SW} />
          <rect x={-210} y={-440} width={210} height={436} fill="#4a2f1c" /><rect x={0} y={-440} width={210} height={436} fill="#e3b778" />
          <Setas x={210} y={-260} s={1.2} color="#d9dde3" laminas="#fff" g={pr(p, 0.62, 0.9)} t={tl} />
        </g>
        <Tx x={720} y={960} t="CAFÉ" tam={52} o={pop(p, 0.6)} /><Tx x={1200} y={960} t="ASERRÍN" tam={52} o={pop(p, 0.6)} />
        <Tx x={960} y={170} t="PROTOTIPO: MITAD Y MITAD" tam={96} o={pop(p, 0.56)} />
        <Tx x={960} y={1040} t="(todavía no estandarizado)" tam={40} fuente={KF.texto} peso={800} o={pop(p, 0.75)} color="#fff" />
      </g>}
    </g>;
  },
  // ¿Qué plásticos aguantan el calor?
  plasticos: ({ p, tl }) => {
    const calor = pr(p, 0.2, 0.7);
    return <g>
      <g transform="translate(960 900)">
        <path d="M -460 0 L -460 -330 Q 0 -380 460 -330 L 460 0 Z" fill="#7d8796" stroke={TI} strokeWidth={SW} />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-300 + i * 200} -380 q 30 -50 0 -100 q -30 -50 0 -100`} fill="none" stroke="#fff" strokeWidth={10} opacity={calor * (0.4 + 0.4 * Math.sin(tl * 3 + i))} />)}
      </g>
      {[['PP', true], ['PET', false], ['PP', true], ['PS', false]].map(([n, ok], i) => { const m = ok ? 0 : calor; return <g key={i} transform={`translate(${520 + i * 290} 560)`}>
        <path d={`M -80 0 L -70 ${-160 + 60 * m} Q 0 ${-170 + 30 * m} 70 ${-160 + 80 * m} L 80 0 Z`} fill={ok ? '#e9f4f7' : mixHex('#e9f4f7', '#d4b48c', m)} stroke={TI} strokeWidth={6} />
        <Tx x={0} y={-60} t={n} tam={48} color={TI} />
        {p > 0.72 && <Tx x={0} y={-220} t={ok ? '✓' : '✗'} tam={110} color={ok ? KC.leaf : KC.red} />}
      </g>; })}
      <Tx x={960} y={170} t="¿QUÉ PLÁSTICO AGUANTA EL CALOR?" tam={84} o={pop(p, 0.02)} />
    </g>;
  },
});
