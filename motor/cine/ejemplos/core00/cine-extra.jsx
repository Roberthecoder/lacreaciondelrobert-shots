// cine-extra.jsx — escenas agregadas con las correcciones de Robert (31 oct 2026):
// sus plántulas de jitomate, la plata nacional de la OMMEB, la Torre de Educación de la SEJ y la plata en SASMO.
const ILUSC = window.ILUSC;

// Medalla con listón. metal: 'oro' | 'plata' | 'bronce'. brillo = barrido de luz (0..1).
function Medalla({ x, y, r = 150, metal = 'plata', texto = '', sub = '', liston = ['#1d4f9c', '#f6f6f6', '#c0392b'], rot = 0, brillo = 0 }) {
  const base = { oro: ['#8a6a1c', '#f6d77a', '#c99a3a'], plata: ['#6d747c', '#f4f7fa', '#b9c0c8'], bronce: ['#6a3a1a', '#e8a46a', '#a8622e'] }[metal];
  const id = 'c-med-' + metal;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {/* listón en V */}
    {[-1, 1].map((d) => <g key={d}>
      <path d={`M ${d * 30} ${-r * 0.95} L ${d * 150} ${-r * 3.2} L ${d * 70} ${-r * 3.2} L ${d * -20} ${-r * 0.95} Z`} fill={liston[0]} />
      <path d={`M ${d * 12} ${-r * 0.95} L ${d * 118} ${-r * 3.2} L ${d * 100} ${-r * 3.2} L ${d * -4} ${-r * 0.95} Z`} fill={liston[1]} />
      <path d={`M ${d * 30} ${-r * 0.95} L ${d * 150} ${-r * 3.2} L ${d * 136} ${-r * 3.2} L ${d * 18} ${-r * 0.95} Z`} fill={liston[2]} />
      <path d={`M ${d * 30} ${-r * 0.95} L ${d * 150} ${-r * 3.2} L ${d * 70} ${-r * 3.2} L ${d * -20} ${-r * 0.95} Z`} fill="url(#c-tela)" />
    </g>)}
    <rect x={-34} y={-r * 1.08} width={68} height={30} rx={8} fill={`url(#${id})`} />
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={base[1]} /><stop offset=".45" stopColor={base[2]} /><stop offset="1" stopColor={base[0]} /></linearGradient>
    <circle r={r + 10} fill="#000" opacity={0.35} transform="translate(10 14)" />
    <circle r={r} fill={`url(#${id})`} />
    <circle r={r * 0.86} fill="none" stroke={base[0]} strokeWidth={r * 0.03} opacity={0.6} />
    <circle r={r * 0.8} fill={`url(#${id})`} transform="rotate(180)" opacity={0.6} />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={Math.cos((i / 40) * 6.28) * r * 0.93} cy={Math.sin((i / 40) * 6.28) * r * 0.93} r={r * 0.018} fill={base[1]} opacity={0.8} />)}
    {texto && <text x={0} y={r * 0.08} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={800} fontSize={r * 0.32} fill={base[0]} opacity={0.85}>{texto}</text>}
    {sub && <text x={0} y={r * 0.38} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={r * 0.11} letterSpacing={3} fill={base[0]} opacity={0.8}>{sub}</text>}
    {brillo > 0 && <g opacity={Math.sin(brillo * Math.PI)}><clipPath id={`c-medclip-${metal}`}><circle r={r} /></clipPath>
      <rect x={lerp(-r * 2, r * 1.2, brillo)} y={-r * 1.2} width={r * 0.5} height={r * 2.4} fill="#fff" opacity={0.55} transform="rotate(25)" clipPath={`url(#c-medclip-${metal})`} /></g>}
  </g>;
}

/* ---------- mis plántulas de jitomate ---------- */
ILUSC.plantulas = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 600, x0: -20, x1: 20 },
  dibuja: ({ p, tl, capa }) => {
    const g = cpr(p, 0.05, 0.85);
    const macetas = Array.from({ length: 14 }, (_, i) => ({ x: 260 + (i % 7) * 210 + (Math.floor(i / 7) % 2) * 100, y: 760 + Math.floor(i / 7) * 150, tipo: ['vaso', 'botella', 'barro'][i % 3], s: 0.8 + (i % 4) * 0.08 }));
    return <g>
      <g transform={capa(0.4)}>
        <linearGradient id="c-pl-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8fbfe6" /><stop offset="1" stopColor="#f3e6c8" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={700} fill="url(#c-pl-cielo)" />
        <rect x={-200} y={300} width={2320} height={500} fill="#e3cda6" /><rect x={-200} y={300} width={2320} height={500} fill="url(#c-papel-a)" opacity={0.8} />
        <rect x={-200} y={290} width={2320} height={18} fill="#c9b08a" />
        <Desenfoque b={6}>{Array.from({ length: 40 }, (_, i) => { const r = R(4000 + i); return <circle key={i} cx={1200 + r() * 900} cy={200 + r() * 260} r={22 + r() * 30} fill={i % 3 ? '#d6267a' : '#3f7f34'} />; })}</Desenfoque>
        <Halo x={400} y={80} r={600} color="#fff2cf" o={0.6} />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={720} width={2320} height={500} fill="#a99f8e" /><rect x={-200} y={720} width={2320} height={500} fill="url(#c-papel-a)" opacity={0.8} />
        {macetas.map((m, i) => { const gi = kclamp(g * 1.2 - (i % 5) * 0.05, 0, 1);
          return <g key={i} transform={`translate(${m.x} ${m.y}) scale(${m.s})`}>
            {m.tipo === 'barro' ? <MacetaC x={0} y={0} w={110} h={95}><MataJitomate x={0} y={-82} s={0.36 * (0.4 + 0.6 * gi)} alto={0.4 + 0.5 * gi} t={tl + i} seed={i + 50} /></MacetaC>
              : <g><Sombra x={10} y={2} rx={60} ry={10} o={0.45} />
                <path d="M -46 0 L -54 -110 L 54 -110 L 46 0 Z" fill={m.tipo === 'vaso' ? '#26272b' : '#cfe6e0'} opacity={m.tipo === 'vaso' ? 1 : 0.6} /><path d="M -46 0 L -54 -110 L 54 -110 L 46 0 Z" fill="url(#c-cilindro)" />
                <ellipse cx={0} cy={-104} rx={50} ry={10} fill="url(#c-tierra)" />
                <MataJitomate x={0} y={-104} s={0.34 * (0.4 + 0.6 * gi)} alto={0.4 + 0.5 * gi} t={tl + i} seed={i + 50} /></g>}
          </g>; })}
        {/* el niño riega su plantita: la mano agarra el asa (la regadera gira alrededor de ese punto) y el chorro cae sobre la planta, dentro de su maceta */}
        {(() => {
          const NX = 1650, NY = 985, BRAZO = 145, kk = 1.15, A = BRAZO * Math.PI / 180;
          const G = [NX - 52 * kk - 100 * kk * Math.sin(A), NY - 150 * kk + 18 + 100 * kk * Math.cos(A)]; // mano izquierda
          const ASA = [44, -120.5], PERA = [-155, -129], inc = -12 + 1.5 * Math.sin(tl * 1.4), ri = inc * Math.PI / 180;
          const gira = ([x, y]) => [G[0] + (x - ASA[0]) * Math.cos(ri) - (y - ASA[1]) * Math.sin(ri), G[1] + (x - ASA[0]) * Math.sin(ri) + (y - ASA[1]) * Math.cos(ri)];
          const pera = gira(PERA), MX = pera[0] - 38, suelo = 922, ctl = [pera[0] - 26, pera[1] + 18];
          const gota = (q) => [(1 - q) ** 2 * pera[0] + 2 * q * (1 - q) * ctl[0] + q * q * MX, (1 - q) ** 2 * pera[1] + 2 * q * (1 - q) * ctl[1] + q * q * suelo];
          return <g>
            {/* su maceta, la que está regando */}
            <g transform={`translate(${MX} 1012) scale(1.05)`}><MacetaC x={0} y={0} w={110} h={95}><MataJitomate x={0} y={-82} s={0.36} alto={0.82} t={tl + 3} seed={77} /></MacetaC></g>
            {/* regadera */}
            <g transform={`translate(${G[0]} ${G[1]}) rotate(${inc}) translate(${-ASA[0]} ${-ASA[1]})`}>
              <path d="M 18 -84 C 22 -142, 72 -142, 58 -36" stroke="#258a33" strokeWidth={12} fill="none" strokeLinecap="round" />
              <path d="M -50 -10 L -147 -116 L -138 -125 L -42 -44 Z" fill="#35ad42" /><path d="M -50 -10 L -147 -116" stroke="#1f7a2c" strokeWidth={2.5} opacity={0.5} />
              <g transform="translate(-142 -120) rotate(-136.5)"><path d="M 0 -7 L 20 -17 L 20 17 L 0 7 Z" fill="#2f9a3a" /><ellipse cx={20} cy={0} rx={5} ry={17} fill="#1f7a2c" />
                {[-10, -4, 2, 8].map((yy) => <circle key={yy} cx={21} cy={yy} r={1.6} fill="#bfe6ff" />)}</g>
              <path d="M -55 0 L -46 -80 Q 0 -88 46 -80 L 55 0 Q 0 8 -55 0 Z" fill="#3fbf4a" /><path d="M -55 0 L -46 -80 Q 0 -88 46 -80 L 55 0 Q 0 8 -55 0 Z" fill="url(#c-cilindro)" />
              <ellipse cx={0} cy={-80} rx={46} ry={8} fill="#2f9a3a" /><ellipse cx={0} cy={-80} rx={38} ry={5} fill="#1d5e26" />
              <path d="M -53 -18 Q 0 -10 53 -18" stroke="#2f9a3a" strokeWidth={5} fill="none" />
            </g>
            {/* el chorro: de la pera a la planta */}
            {Array.from({ length: 22 }, (_, k) => { const q = ((tl * 1.1 + k / 22) % 1), [x, y] = gota(q), j = ((k * 37) % 7 - 3) * (0.4 + q);
              return <ellipse key={k} cx={x + j} cy={y} rx={2.6} ry={4.2} fill="#cdeeff" opacity={0.85 * Math.min(1, q * 6)} />; })}
            {[0, 1, 2].map((k) => { const q = ((tl * 1.6 + k / 3) % 1); return <circle key={'s' + k} cx={MX + (k - 1) * 10 * (0.4 + q)} cy={suelo - 4 - 10 * Math.sin(q * Math.PI)} r={2.2} fill="#cdeeff" opacity={0.7 * (1 - q)} />; })}
            <Nene x={NX} y={NY} s={1.0} edad={5} t={tl} playera="#2f6fd0" brazoI={BRAZO} brazoD={10} mira={[-1, 0.5]} boca="sonrisa" seed={21} />
          </g>;
        })()}
      </g>
      <Polvo n={40} t={tl} seed={401} o={0.5} />
      <Tinte color="#ffcf8a" o={0.12} />
      <Rotulo x={120} y={190} arriba="GERMINADAS TIEMPO ATRÁS" texto="Mis plántulas de jitomate" tl={tl} at={0.3} tam={56} />
    </g>;
  },
};

/* ---------- 2017: plata nacional, a un punto del oro ---------- */
ILUSC.plata_nacional = {
  cam: { z0: 1.06, z1: 1.0, fx: 1200, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const entra = cpr(p, 0, 0.25, kEase.sale), barra = cpr(p, 0.3, 0.6, kEase.suave);
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#14161c" /><Halo x={1200} y={420} r={700} color="#cfd8e8" o={0.45} />
        <Bokeh n={16} t={tl} seed={411} colores={['#e8eef4', '#cfd8e8', '#ffd38a']} o={0.4} /></g>
      <g transform={capa(1)}>
        <Medalla x={1200} y={lerp(-200, 560, entra)} r={190} metal="plata" texto="PLATA" sub="OMMEB 2017" rot={Math.sin(tl * 1.4) * 4 * (1 - entra * 0.6)} brillo={cpr(p, 0.25, 0.45)} />
        {/* marcador: a un punto del oro */}
        <g transform="translate(200 800)" opacity={cpr(p, 0.28, 0.34)}>
          <rect x={0} y={-30} width={760} height={30} rx={15} fill="#2a2e38" />
          <rect x={0} y={-30} width={760 * 0.94 * barra} height={30} rx={15} fill="url(#c-med-plata)" />
          <rect x={760 * 0.97} y={-70} width={6} height={90} fill="#F4C25A" />
          <text x={760 * 0.97} y={-84} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={4} fill="#F4C25A">ORO</text>
          {barra > 0.95 && <g><path d={`M ${760 * 0.94} -40 Q ${760 * 0.955} -70 ${760 * 0.97} -40`} stroke="#fff" strokeWidth={3} fill="none" />
            <text x={760 * 0.955} y={60} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={38} fill="#fff">1 punto</text></g>}
        </g>
      </g>
      <Polvo n={40} t={tl} seed={412} o={0.5} />
      <Rotulo x={120} y={190} arriba="1.ª OMMEB · 2017" texto="Plata nacional" sub="a un punto del oro" tl={tl} at={0.3} tam={76} acento="#cfd8e8" />
    </g>;
  },
};

/* ---------- SASMO, primera etapa: Torre de Educación de la SEJ ---------- */
ILUSC.torre_sej = {
  cam: { z0: 1.0, z1: 1.1, fx: 960, fy: 420, y0: 40, y1: -40 },
  dibuja: ({ p, tl, capa }) => {
    const bronce = cpr(p, 0.68, 0.8, kEase.sale);
    // torre en contrapicado: se angosta hacia arriba
    const X = (x, y) => 960 + (x - 960) * lerp(1, 0.62, (1000 - y) / 1000);
    const pisos = 12;
    return <g>
      <g transform={capa(0.2)}>
        <linearGradient id="c-sej-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3f7fd0" /><stop offset="1" stopColor="#bfe0f6" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={1500} fill="url(#c-sej-cielo)" />
        <Halo x={1500} y={100} r={500} color="#fffbe8" o={0.5} />
      </g>
      <g transform={capa(0.7)}><Desenfoque b={4}>
        {[[180, 700], [1760, 640]].map(([px, py], i) => <g key={i}><path d={`M ${px} 1100 Q ${px + 10} ${py + 200} ${px + 6} ${py}`} stroke="#6a5a3a" strokeWidth={18} fill="none" />
          {Array.from({ length: 9 }, (_, k) => { const a = (-160 + k * 40) * Math.PI / 180; return <path key={k} d={`M ${px + 6} ${py} q ${Math.cos(a) * 120} ${Math.sin(a) * 60 - 30} ${Math.cos(a) * 220} ${Math.sin(a) * 80 + 60}`} stroke="#3f7f34" strokeWidth={14} fill="none" />; })}</g>)}
      </Desenfoque></g>
      <g transform={capa(1)}>
        {/* fachada de vidrio con pilastras grises */}
        <path d={`M ${X(420, 1000)} 1000 L ${X(420, 0)} 0 L ${X(1500, 0)} 0 L ${X(1500, 1000)} 1000 Z`} fill="#5f9fd6" />
        <linearGradient id="c-sej-vidrio" x1="0" x2="1"><stop offset="0" stopColor="#8fc4ee" /><stop offset=".5" stopColor="#4f8fc8" /><stop offset="1" stopColor="#8fc4ee" /></linearGradient>
        <path d={`M ${X(420, 1000)} 1000 L ${X(420, 0)} 0 L ${X(1500, 0)} 0 L ${X(1500, 1000)} 1000 Z`} fill="url(#c-sej-vidrio)" opacity={0.7} />
        {Array.from({ length: pisos }, (_, k) => { const y = 1000 - k * 85; return <path key={k} d={`M ${X(420, y)} ${y} L ${X(1500, y)} ${y}`} stroke="#3a6a9a" strokeWidth={3} opacity={0.6} />; })}
        {[520, 700, 880, 1040, 1220, 1400].map((cx, k) => <path key={k} d={`M ${X(cx - 14, 1000)} 1000 L ${X(cx - 14, 0)} 0 L ${X(cx + 14, 0)} 0 L ${X(cx + 14, 1000)} 1000 Z`} fill="#b9b6ae" />)}
        {/* reflejos del sol: cada uno dentro de un vidrio (entre dos columnas y dos pisos), con la perspectiva de la torre */}
        {(() => { const cols = [420, 520, 700, 880, 1040, 1220, 1400, 1500], out = [], r = R(4200);
          for (let k = 0; k < 12; k++) {
            const c = 1 + Math.floor(r() * 5), f = 3 + Math.floor(r() * 8), x0 = cols[c] + 14, x1 = cols[c + 1] - 14, cw = x1 - x0;
            const yb = 1000 - f * 85 - 3, yt = yb - 79, a = x0 + cw * (0.08 + r() * 0.3), w = cw * 0.22, sesgo = cw * 0.22;
            const q = [[a, yb], [a + w, yb], [a + w + sesgo, yt], [a + sesgo, yt]].map(([x, y]) => `${X(x, y).toFixed(1)} ${y}`);
            out.push(<path key={'v' + k} d={`M ${q.join(' L ')} Z`} fill="#f4f8fc" opacity={0.42 + 0.12 * Math.sin(tl * 0.8 + k)} />);
          }
          return out; })()}
        <path d={`M ${X(420, 1000)} 1000 L ${X(420, 0)} 0 L ${X(470, 0)} 0 L ${X(470, 1000)} 1000 Z`} fill="#fff" opacity={0.18} />
        {/* exoesqueleto rojo: vigas horizontales y diagonales */}
        {[920, 640, 360, 100].map((y, k) => <g key={k}>
          <path d={`M ${X(300, y)} ${y} L ${X(1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(34, 22, (1000 - y) / 1000)} />
          {k < 3 && [0, 1].map((d) => <path key={d} d={`M ${X(d ? 1620 : 300, y)} ${y} L ${X(960, y - 280)} ${y - 280} L ${X(d ? 300 : 1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(22, 14, (1000 - y) / 1000)} fill="none" opacity={d ? 0 : 1} />)}
          {k < 3 && <path d={`M ${X(300, y)} ${y} L ${X(960, y - 280)} ${y - 280} L ${X(1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(22, 14, (1000 - y) / 1000)} fill="none" />}
        </g>)}
        {[300, 1620].map((cx, k) => <path key={k} d={`M ${X(cx, 1100)} 1100 L ${X(cx, -40)} -40`} stroke="#c8231b" strokeWidth={30} />)}
        {/* marquesina con letrero */}
        <path d="M 560 760 L 1360 760 L 1400 840 L 520 840 Z" fill="#e8e6e0" opacity={0.85} />
        <rect x={520} y={690} width={880} height={76} fill="#c8231b" /><rect x={520} y={690} width={880} height={76} fill="url(#c-arriba)" />
        <text x={960} y={742} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={44} letterSpacing={3} fill="#f4f2ee">SECRETARÍA DE EDUCACIÓN</text>
        {/* estudiantes entrando */}
        {Array.from({ length: 9 }, (_, k) => { const q = ((tl * 0.08 + k / 9) % 1), x = lerp(-100 + k * 40, 900, q), s = 0.42 + (k % 3) * 0.05;
          return <g key={k} opacity={Math.min(1, (1 - q) * 3)} transform={`translate(${x} ${1060 - (k % 3) * 10}) scale(${s})`}><ellipse cx={0} cy={-300} rx={40} ry={46} fill="#2a2420" /><rect x={-60} y={-250} width={120} height={250} rx={34} fill={['#f4f2ec', '#2a5a9a', '#f4f2ec', '#3a3a40'][k % 4]} /><rect x={-50} y={-240} width={100} height={110} rx={20} fill={['#c0392b', '#2f6a3a', '#7a4a2a'][k % 3]} opacity={0.9} /></g>; })}
      </g>
      {/* bronce internacional */}
      <g opacity={bronce}><rect x={-100} y={-100} width={2120} height={1280} fill="#07080b" opacity={0.86} />
        <Medalla x={960} y={lerp(300, 450, bronce)} r={165} metal="bronce" texto="BRONCE" sub="SASMO" liston={['#c0392b', '#f6f6f6', '#c0392b']} brillo={cpr(p, 0.78, 0.95)} />
        <text x={960} y={720} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={56} fill="#fff">Bronce internacional</text></g>
      <Polvo n={30} t={tl} seed={421} o={0.4} />
      <g opacity={1 - bronce}><Rotulo x={120} y={190} arriba="SASMO · PRIMERA ETAPA, A DISTANCIA" texto="Torre de Educación, SEJ" tl={tl} at={0.4} tam={56} /></g>
    </g>;
  },
};

/* ---------- segundo de secundaria: plata en SASMO ---------- */
ILUSC.plata_sasmo = {
  cam: { z0: 1.08, z1: 1.0, fx: 960, fy: 520 },
  dibuja: ({ p, tl, capa }) => <g>
    <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#151820" /><Halo x={960} y={460} r={700} color="#dfe6ee" o={0.5} /><Bokeh n={14} t={tl} seed={431} colores={['#e8eef4', '#ffd38a']} o={0.4} /></g>
    <g transform={capa(1)}><Medalla x={960} y={lerp(260, 600, cpr(p, 0, 0.35, kEase.sale))} r={200} metal="plata" texto="PLATA" sub="SASMO" liston={['#c0392b', '#f6f6f6', '#c0392b']} rot={Math.sin(tl * 1.6) * 3} brillo={cpr(p, 0.3, 0.7)} /></g>
    <Polvo n={30} t={tl} seed={432} o={0.5} />
    <Rotulo x={120} y={190} arriba="SEGUNDO DE SECUNDARIA" texto="Plata en SASMO" tl={tl} at={0.2} tam={70} acento="#cfd8e8" />
  </g>,
};

/* ---------- el filtro de aire: joven inventor (foto) y el diploma de "Una idea" (recreado, el original es borroso) ---------- */
ILUSC.reconocimientos = {
  cam: { z0: 1.0, z1: 1.06, fx: 1240, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const d = cpr(p, 0.35, 0.5, kEase.sale);
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#17140f" /><Halo x={1240} y={420} r={800} color="#ffe2b0" o={0.4} /><Bokeh n={14} t={tl} seed={441} colores={['#ffd38a', '#fff1c9']} o={0.35} /></g>
      <g transform={capa(1)}>
        <FotoReal src="video/img/fotos_basis/cap5/joven_inventor_jalisco.jpg" x={470} y={500} maxW={560} maxH={520} rot={-2.5} o={cpr(p, 0.02, 0.15)} etiqueta="JOVEN INVENTOR · JALISCO" />
        <FotoReal src="video/img/extra/diploma_una_idea.jpg" x={1340} y={470} maxW={860} maxH={640} rot={2} o={d} etiqueta={'"UNA IDEA PARA CAMBIAR LA HISTORIA" · HISTORY'} />
      </g>
      <Polvo n={30} t={tl} seed={442} o={0.4} />
      <Rotulo x={120} y={190} arriba="AQUEL FILTRO DE AIRE" texto="Siguió dando frutos" tl={tl} at={0.3} tam={56} />
    </g>;
  },
};

/* ---------- Ruta Azul: el curso con cincuenta estudiantes ---------- */
ILUSC.curso = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 500, x0: 20, x1: -20 },
  dibuja: ({ p, tl, capa }) => {
    const filas = 5, porFila = 10;
    return <g>
      <g transform={capa(0.35)}>
        <Pared color="#d9d3c4" luz={[0.5, 0.1]} />
        <g transform="translate(200 0)">
        {/* pantalla con la diapositiva */}
        <rect x={560} y={70} width={800} height={460} fill="#1d1d22" /><rect x={576} y={86} width={768} height={428} fill="#f6f4ee" />
        <text x={960} y={160} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={50} fill="#1d2a1a">Cultivo de setas</text>
        <text x={960} y={200} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={18} letterSpacing={4} fill="#14a37c">FUNGI MATI · RUTA AZUL</text>
        <rect x={600} y={450} width={720} height={56} fill="#ffffff" /><image href="video/img/extra/ruta_azul.png" x={680} y={449} width={170} height={58} preserveAspectRatio="xMidYMid meet" /><image href="video/img/extra/equitech.png" x={1040} y={454} width={150} height={48} preserveAspectRatio="xMidYMid meet" />
        <BolsaCultivo x={760} y={428} w={130} h={180}><Racimo x={16} y={-118} n={6} tam={58} color="#ef7fa6" g={1} t={tl} seed={451} /></BolsaCultivo>
        <g transform="translate(1100 330)"><rect x={-150} y={-90} width={300} height={180} rx={14} fill="#e9f6f0" stroke="#14a37c" strokeWidth={3} /><text x={0} y={-50} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={20} fill="#14a37c">TUTOR DE IA</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-120 + (k % 2) * 60} y={-30 + k * 36} width={180} height={24} rx={12} fill={k % 2 ? '#14a37c' : '#d9e6e0'} />)}</g>
        </g>
        <Halo x={960} y={300} r={600} color="#e8f6ff" o={0.35} />
      </g>
      <g transform={capa(0.7)}>
        {/* Robert al frente, explicando */}
        <Nene x={420} y={760} s={1.05} edad={19} lentes t={tl} playera="#2a2a30" rayas={false} pantalon="#1d1d22" brazoD={100 + 10 * Math.sin(tl * 2)} brazoI={10} mira={[1, -0.3]} boca={Math.sin(tl * 7) > 0 ? 'o' : 'sonrisa'} seed={461} />
        <rect x={-200} y={700} width={2320} height={600} fill="#8f8577" />
      </g>
      <g transform={capa(1)}>
        {/* cincuenta estudiantes, de espaldas, en filas */}
        {Array.from({ length: filas }, (_, f) => Array.from({ length: porFila }, (_, c) => {
          const r = R(4600 + f * 20 + c), s = 0.5 + f * 0.13, x = 960 + (c - (porFila - 1) / 2) * (150 + f * 34) + (r() - 0.5) * 30, y = 760 + f * 80;
          return <g key={f * 20 + c} transform={`translate(${x} ${y}) scale(${s})`}>
            <rect x={-80} y={-150} width={160} height={190} rx={50} fill={['#2a5aa8', '#c0392b', '#3a3a40', '#f4f2ec', '#3f8a3a', '#7a4fc0', '#d9774a'][Math.floor(r() * 7)]} />
            <ellipse cx={0} cy={-200} rx={52} ry={58} fill={['#1d1410', '#3a2416', '#5a3a24', '#1a1311'][Math.floor(r() * 4)]} />
            {r() < 0.4 && <path d="M -52 -200 Q -60 -120 -40 -100 L 40 -100 Q 60 -120 52 -200 Z" fill="#2a1a12" />}
          </g>;
        }))}
        <rect x={-200} y={1060} width={2320} height={40} fill="url(#c-madera-media)" />
      </g>
      <Polvo n={30} t={tl} seed={462} o={0.4} />
      <Rotulo x={120} y={190} arriba="RUTA AZUL · MAYO" texto="Cincuenta estudiantes" tl={tl} at={0.3} tam={58} />
    </g>;
  },
};

/* ---------- Anita y la Dra. Danay Carrillo (fotos reales si existen) ---------- */
ILUSC.anita_danay = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 500 },
  dibuja: ({ p, tl, capa }) => {
    const F = window.FOTOS || {};
    const fa = 'video/img/extra/anita.jpg', fd = 'video/img/extra/danay.jpg';
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#1d1418" /><Halo x={960} y={420} r={800} color="#ffcfd8" o={0.35} /><Bokeh n={16} t={tl} seed={471} colores={['#ff9cb0', '#ffd38a']} o={0.35} /></g>
      <g transform={capa(1)}>
        {F[fa] && <FotoReal src={fa} x={560} y={480} maxW={640} maxH={600} rot={-2.5} o={cpr(p, 0.02, 0.15)} etiqueta="ANITA · MI MAESTRA DE SALSA" acento="#ff9cc4" />}
        {F[fd] && <FotoReal src={fd} x={1360} y={500} maxW={680} maxH={600} rot={2} o={cpr(p, 0.35, 0.5)} etiqueta="DRA. DANAY CARRILLO" acento="#7ff0c8" />}
        {!F[fa] && <g opacity={cpr(p, 0.05, 0.2)}><text x={560} y={520} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={80} fill="#fff">Anita</text><text x={560} y={570} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#ff9cc4">mi maestra de salsa</text></g>}
        {!F[fd] && <g opacity={cpr(p, 0.35, 0.5)}><text x={1360} y={520} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={72} fill="#fff">Dra. Danay Carrillo</text></g>}
        <g opacity={cpr(p, 0.25, 0.35)}><path d="M 900 500 L 1010 500" stroke="#fff" strokeWidth={4} strokeDasharray="12 10" /><path d="M 1000 488 L 1014 500 L 1000 512" stroke="#fff" strokeWidth={4} fill="none" /></g>
      </g>
      <Polvo n={30} t={tl} seed={472} o={0.4} />
    </g>;
  },
};

/* ---------- el Carrillo Biorefinery Lab, con su logo ---------- */
ILUSC.lab_cbl = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 500, x0: -20, x1: 20 },
  dibuja: ({ p, tl, capa }) => <g>
    <g transform={capa(0.45)}>
      <Pared color="#b9c2c4" luz={[0.5, 0.1]} />
      {[0, 1, 2].map((k) => <g key={k}><rect x={240 + k * 560} y={40} width={420} height={14} rx={7} fill="#f6fbff" /><Halo x={450 + k * 560} y={50} r={240} color="#eef8ff" o={0.4} /></g>)}
      {/* logo del laboratorio en la pared */}
      <rect x={720} y={110} width={480} height={300} rx={10} fill="#ffffff" /><rect x={720} y={110} width={480} height={300} rx={10} fill="none" stroke="#c9ced3" strokeWidth={4} />
      <image href="video/img/extra/cbl_logo.png" x={760} y={120} width={400} height={280} preserveAspectRatio="xMidYMid meet" />
      {/* campana de extracción */}
      <rect x={1380} y={160} width={420} height={420} fill="#dfe4e6" /><rect x={1400} y={220} width={380} height={300} fill="#bfe0ea" opacity={0.6} /><rect x={1400} y={220} width={380} height={300} fill="url(#c-vidrio)" />
      <rect x={1380} y={150} width={420} height={40} fill="#c9ced3" />
      {/* repisa con cultivos de algas */}
      <Tablon x={120} y={330} w={520} prof={14} grosor={14} madera="clara" />
      {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${190 + k * 120} 334)`}>
        <path d="M -44 0 Q -50 -10 -40 -24 L -16 -70 L -16 -110 L 16 -110 L 16 -70 L 40 -24 Q 50 -10 44 0 Z" fill={['#3fae5a', '#5fbf4a', '#2f8f6a', '#7fcf5a'][k]} opacity={0.8} />
        <path d="M -44 0 Q -50 -10 -40 -24 L -16 -70 L -16 -110 L 16 -110 L 16 -70 L 40 -24 Q 50 -10 44 0 Z" fill="url(#c-vidrio)" /><Halo x={0} y={-30} r={60} color="#9fff8a" o={0.25} /></g>)}
    </g>
    <g transform={capa(1)}>
      <rect x={-200} y={720} width={2320} height={40} fill="#d9dde0" /><rect x={-200} y={760} width={2320} height={500} fill="#bfc6cc" />
      <rect x={-200} y={716} width={2320} height={8} fill="#fff" opacity={0.6} />
      {/* cajas Petri con micelio y un matraz */}
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(${380 + k * 170} 712) scale(0.3)`}><Petri x={0} y={-30} r={200} id={`cbl${k}`} medio="#e8c27a"><Micelio x={0} y={0} r={200} g={0.5 + k * 0.2} seed={k + 60} /></Petri></g>)}
      <g transform="translate(1000 716)"><path d="M -60 0 Q -70 -14 -56 -30 L -20 -90 L -20 -150 L 20 -150 L 20 -90 L 56 -30 Q 70 -14 60 0 Z" fill="#c9862a" opacity={0.85} /><path d="M -60 0 Q -70 -14 -56 -30 L -20 -90 L -20 -150 L 20 -150 L 20 -90 L 56 -30 Q 70 -14 60 0 Z" fill="url(#c-vidrio)" /></g>
      <Nene x={1450} y={1060} s={1.15} edad={19} lentes t={tl} playera="#f4f4f0" rayas={false} cuello="#e9e9e4" pantalon="#2a3a5a" brazoD={70} brazoI={10} mira={[-1, 0.3]} boca="sonrisa" seed={481} />
    </g>
    <Polvo n={30} t={tl} seed={482} o={0.4} />
    <Rotulo x={120} y={190} arriba="DESDE OCTUBRE DE 2024" texto="Carrillo Biorefinery Lab" tl={tl} at={0.3} tam={56} acento="#7ff0c8" />
  </g>,
};

/* ---------- residuos del tequila: bagazo de agave y vinazas ---------- */
function Agave({ x, y, s = 1, seed = 1 }) {
  const r = R(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 16 }, (_, i) => { const a = -90 + (i - 7.5) * 11 + (r() - 0.5) * 6, L = 160 + r() * 60; return <g key={i} transform={`rotate(${a + 90})`}>
      <path d={`M -10 0 Q -14 ${-L * 0.6} 0 ${-L} Q 14 ${-L * 0.6} 10 0 Z`} fill={mix('#5f8fa0', '#7fa8b0', r())} /><path d={`M 0 0 L 0 ${-L}`} stroke="#3f6a7a" strokeWidth={2} />
      <path d={`M -3 ${-L} L 0 ${-L - 14} L 3 ${-L} Z`} fill="#3a2a1a" /></g>; })}
  </g>;
}
ILUSC.bagazo_vinazas = {
  cam: { z0: 1.0, z1: 1.07, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const b = cpr(p, 0.08, 0.2), vz = cpr(p, 0.4, 0.52), hongo = cpr(p, 0.62, 0.9);
    return <g>
      <g transform={capa(0.2)}>
        <linearGradient id="c-teq-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3f5f8f" /><stop offset=".7" stopColor="#f2a65e" /><stop offset="1" stopColor="#f6c88a" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={800} fill="url(#c-teq-cielo)" />
        <Halo x={1500} y={420} r={400} color="#ffd9a0" o={0.8} />
        <Desenfoque b={3}><path d="M -200 470 Q 300 400 700 450 Q 1100 390 1500 440 Q 1800 410 2120 450 L 2120 560 L -200 560 Z" fill="#6a5a7a" /></Desenfoque>
      </g>
      <g transform={capa(0.55)}>
        <rect x={-200} y={520} width={2320} height={700} fill="#8a6a4a" />
        {/* surcos de agave azul */}
        {Array.from({ length: 5 }, (_, f) => Array.from({ length: 14 }, (_, c) => <Agave key={f * 20 + c} x={-180 + c * 170 + (f % 2) * 85} y={560 + f * 60} s={0.22 + f * 0.06} seed={f * 20 + c} />))}
        {/* destilería al fondo: alambiques de cobre */}
        <Desenfoque b={2}><g transform="translate(1500 540)">
          <rect x={-200} y={-180} width={400} height={180} fill="#d9c7a8" /><path d="M -220 -180 L 0 -260 L 220 -180 Z" fill="#a8523a" />
          {[-90, 60].map((dx, k) => <g key={k}><ellipse cx={dx} cy={-60} rx={50} ry={60} fill="#c87a3a" /><path d={`M ${dx} -120 Q ${dx + 40} -170 ${dx + 90} -150`} stroke="#c87a3a" strokeWidth={12} fill="none" /></g>)}
        </g></Desenfoque>
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={820} width={2320} height={400} fill="#5a4632" /><rect x={-200} y={820} width={2320} height={400} fill="url(#c-tierra)" opacity={0.3} />
        {/* bagazo: la fibra del agave cocido y exprimido */}
        <g opacity={b} transform="translate(520 860)">
          <path d="M -320 0 Q -200 -260 0 -280 Q 220 -260 320 0 Z" fill="#c9a46a" />
          {Array.from({ length: 220 }, (_, k) => { const r = R(5000 + k), x0 = (r() - 0.5) * 560, y0 = -r() * 240 * (1 - Math.abs(x0) / 340); return <path key={k} d={`M ${x0} ${y0} q ${(r() - 0.5) * 60} ${(r() - 0.5) * 20} ${(r() - 0.5) * 110} ${(r() - 0.5) * 30}`} stroke={['#e8c88a', '#b8884a', '#d9b070', '#8a6030'][k % 4]} strokeWidth={2 + r() * 3} fill="none" strokeLinecap="round" />; })}
          <g transform="translate(260 -40)"><ellipse cx={0} cy={0} rx={110} ry={80} fill="#a8622a" /><ellipse cx={0} cy={0} rx={110} ry={80} fill="url(#c-esfera)" />{Array.from({ length: 10 }, (_, k) => <path key={k} d={`M ${-90 + k * 18} -60 Q ${-80 + k * 18} 0 ${-90 + k * 18} 60`} stroke="#7a3a1a" strokeWidth={4} fill="none" opacity={0.6} />)}</g>
          <Racimo x={-120} y={-250} n={6} tam={80} color="#ece2cc" g={hongo} t={tl} seed={491} />
        </g>
        {/* vinazas: el líquido oscuro que queda al destilar */}
        <g opacity={vz} transform="translate(1340 900)">
          <rect x={-150} y={-300} width={300} height={300} rx={18} fill="#e9eef0" opacity={0.25} />
          <rect x={-146} y={-210} width={292} height={206} rx={14} fill="#4a2410" opacity={0.92} />
          <path d={`M -146 -210 Q 0 ${-220 + Math.sin(tl * 2) * 6} 146 -210`} stroke="#8a4a20" strokeWidth={4} fill="none" />
          <rect x={-150} y={-300} width={300} height={300} rx={18} fill="url(#c-vidrio)" />
          <rect x={-110} y={-130} width={220} height={70} rx={6} fill="#f6f1e4" opacity={0.92} /><text x={0} y={-84} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={42} fill="#2a2018">vinazas</text>
        </g>
      </g>
      <g opacity={b} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.8))' }}><rect x={520 - 330} y={398} width={660} height={100} rx={14} fill="#0b0b0d" opacity={0.55} /><path d="M 520 560 L 520 470" stroke="#fff" strokeWidth={2.5} /><text x={520} y={450} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={46} fill="#fff">Bagazo de agave</text><text x={520} y={410} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={18} letterSpacing={3} fill="#F4C25A">LA FIBRA DEL AGAVE COCIDO Y EXPRIMIDO</text></g>
      <g opacity={vz} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.8))' }}><rect x={1340 - 330} y={398} width={660} height={100} rx={14} fill="#0b0b0d" opacity={0.55} /><path d="M 1340 590 L 1340 500" stroke="#fff" strokeWidth={2.5} /><text x={1340} y={480} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={46} fill="#fff">Vinazas</text><text x={1340} y={440} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={18} letterSpacing={3} fill="#F4C25A">EL LÍQUIDO QUE QUEDA AL DESTILAR</text></g>
      <Polvo n={40} t={tl} seed={493} o={0.6} color="#ffe2b0" />
      <Rotulo x={120} y={190} arriba="RESIDUOS DE LA INDUSTRIA TEQUILERA" texto="Hongos para aprovecharlos" tl={tl} at={0.3} tam={52} />
    </g>;
  },
};

/* ---------- 2017: preselección en Monterrey ---------- */
// México real con sus 32 estados (window.MAPA_MX, 1000 × 680), a escala 0.8 en (590, 340) de la pantalla.
// Solo el viaje Guadalajara → Monterrey (decisión de Robert: nada de Bulgaria en pantalla).
const MX_S = 0.8, MX_X = 590, MX_Y = 340, mxp = (x, y) => [MX_X + MX_S * x, MX_Y + MX_S * y];
ILUSC.monterrey = {
  cam: { z0: 1.05, z1: 1.0, fx: 960, fy: 540 },
  dibuja: ({ p, tl, capa }) => {
    const viaje = cpr(p, 0.1, 0.55, kEase.suave);
    const gdl = mxp(446, 462), mty = mxp(550, 293);
    const ctl = [(gdl[0] + mty[0]) / 2 - 40, Math.min(gdl[1], mty[1]) - 90];
    const fin = [(1 - viaje) ** 2 * gdl[0] + 2 * viaje * (1 - viaje) * ctl[0] + viaje * viaje * mty[0], (1 - viaje) ** 2 * gdl[1] + 2 * viaje * (1 - viaje) * ctl[1] + viaje * viaje * mty[1]];
    const c1 = [lerp(gdl[0], ctl[0], viaje), lerp(gdl[1], ctl[1], viaje)];
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#0f1422" />
        {Array.from({ length: 24 }, (_, i) => <path key={i} d={`M ${-200 + i * 100} -200 L ${-200 + i * 100} 1300`} stroke="#1d2640" strokeWidth={1.5} />)}
        {Array.from({ length: 16 }, (_, i) => <path key={'h' + i} d={`M -200 ${-200 + i * 100} L 2120 ${-200 + i * 100}`} stroke="#1d2640" strokeWidth={1.5} />)}
        <Halo x={1000} y={600} r={600} color="#5f8fd6" o={0.3} /></g>
      <g transform={capa(1)}>
        <g transform={`translate(${MX_X} ${MX_Y}) scale(${MX_S})`}>
          {(window.MAPA_MX || []).map((e, k) => { const marca = e.id === 'jalisco' ? 1 : e.id === 'nl' ? viaje : 0;
            return <path key={k} d={e.d} fill={mix('#26365c', '#3d5a94', marca)} stroke="#7fa8e8" strokeWidth={2.4 / MX_S} strokeLinejoin="round" />; })}
          <g opacity={0.5}>{(window.MAPA_MX || []).map((e, k) => <path key={k} d={e.d} fill="url(#c-arriba)" />)}</g>
        </g>
        {viaje > 0 && <path d={`M ${gdl[0]} ${gdl[1]} Q ${c1[0]} ${c1[1]} ${fin[0]} ${fin[1]}`} stroke="#F4C25A" strokeWidth={5} fill="none" strokeDasharray="14 10" strokeLinecap="round" />}
        {[[gdl, 'Guadalajara'], [mty, 'Monterrey']].map(([c, n], i) => <g key={i} opacity={i ? cpr(p, 0.45, 0.58) : 1}><circle cx={c[0]} cy={c[1]} r={12} fill="#F4C25A" /><circle cx={c[0]} cy={c[1]} r={24 + 6 * Math.sin(tl * 3)} fill="none" stroke="#F4C25A" strokeWidth={2} opacity={0.6} />
          <text x={c[0] + (i ? 24 : -24)} y={c[1] + 8} textAnchor={i ? 'start' : 'end'} fontFamily={FUENTE.serif} fontWeight={600} fontSize={40} fill="#fff">{n}</text></g>)}
        {/* libreta de entrenamiento */}
        <g opacity={cpr(p, 0.3, 0.45)} transform="translate(1440 610) rotate(4)">
          <rect x={0} y={0} width={440} height={300} fill="#f6f1e4" /><rect x={0} y={0} width={440} height={300} fill="url(#c-papel-a)" />
          {Array.from({ length: 8 }, (_, k) => <rect key={k} x={20} y={40 + k * 32} width={400} height={1.5} fill="#8fb0d0" />)}
          <text x={30} y={66} fontFamily={FUENTE.mano} fontWeight={700} fontSize={34} fill="#1d2a5a">a² + b² = c²</text>
          <text x={30} y={130} fontFamily={FUENTE.mano} fontWeight={700} fontSize={34} fill="#1d2a5a">n(n+1)/2</text>
          <text x={30} y={194} fontFamily={FUENTE.mano} fontWeight={700} fontSize={34} fill="#c0392b">∠ABC = 90°</text>
          <path d="M 300 80 L 400 80 L 300 200 Z" fill="none" stroke="#1d2a5a" strokeWidth={4} />
        </g>
      </g>
      <Polvo n={30} t={tl} seed={501} o={0.4} />
      <Rotulo x={120} y={190} arriba="OMMEB 2017 · PRESELECCIÓN" texto="Entrenando en Monterrey" sub="de Guadalajara a Monterrey" tl={tl} at={0.3} tam={56} acento="#cfd8e8" />
    </g>;
  },
};

/* ---------- los números: un medio, no un fin ---------- */
ILUSC.medio_fin = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const piedras = [['π', 220], ['x²', 440], ['Σ', 660], ['∫', 880], ['%', 1100], ['√', 1320]];
    // cada salto va de una piedra a la siguiente; el último, de la última piedra a la orilla (una sola vez)
    const paso = cpr(p, 0.1, 0.82), k = paso * piedras.length, i = Math.min(piedras.length - 1, Math.floor(k));
    const salto = Math.min(1, k - i), kx = lerp(piedras[i][1], (piedras[i + 1] || [0, 1530])[1], Math.min(1, salto * 1.4));
    const ky = 780 - Math.sin(Math.min(1, salto * 1.4) * Math.PI) * 60;
    return <g>
      <g transform={capa(0.35)}>
        <linearGradient id="c-mf-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1b2a4a" /><stop offset="1" stopColor="#3a5a7a" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={1500} fill="url(#c-mf-cielo)" />
        <Bokeh n={16} t={tl} seed={511} colores={['#7fe6ff', '#cfe8ff']} o={0.35} y={100} h={400} />
      </g>
      <g transform={capa(0.8)}>
        {/* el río que hay que cruzar */}
        <rect x={-200} y={760} width={2320} height={500} fill="#174a6a" />
        {Array.from({ length: 30 }, (_, j) => { const r = R(5100 + j); return <path key={j} d={`M ${((r() * 2400 + tl * 40) % 2400) - 200} ${790 + r() * 260} q 30 -8 60 0`} stroke="#7fd0f0" strokeWidth={3} fill="none" opacity={0.4} />; })}
        <path d="M -200 760 L 200 760 L 160 1300 L -200 1300 Z" fill="#3a5a3a" /><path d="M 1430 760 L 2120 760 L 2120 1300 L 1470 1300 Z" fill="#3a5a3a" />
      </g>
      <g transform={capa(1)}>
        {piedras.map(([s, x], j) => <g key={j} transform={`translate(${x} 800)`}>
          <ellipse cx={0} cy={0} rx={86} ry={30} fill="#6a7486" /><ellipse cx={0} cy={-6} rx={86} ry={26} fill="#8a94a6" />
          <text x={0} y={4} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={700} fontSize={40} fill="#fff" opacity={0.9}>{s}</text>
          {j <= i && <ellipse cx={0} cy={-6} rx={90} ry={30} fill="#7fe6ff" opacity={0.25} />}
        </g>)}
        {/* la meta: la investigación */}
        <g transform="translate(1690 760)">
          <Halo x={0} y={-150} r={260} color="#9fff8a" o={0.5 + 0.2 * Math.sin(tl * 2)} />
          <path d="M -70 0 Q -80 -16 -64 -34 L -24 -100 L -24 -170 L 24 -170 L 24 -100 L 64 -34 Q 80 -16 70 0 Z" fill="#3fbf6a" opacity={0.85} /><path d="M -70 0 Q -80 -16 -64 -34 L -24 -100 L -24 -170 L 24 -170 L 24 -100 L 64 -34 Q 80 -16 70 0 Z" fill="url(#c-vidrio)" />
          <Racimo x={95} y={0} n={4} tam={52} color="#ef7fa6" g={1} t={tl} seed={512} />
          <text x={0} y={-230} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={4} fill="#9fff8a">MIS OBJETIVOS</text>
        </g>
        <Nene x={kx} y={ky + 10} s={0.62} edad={15} lentes t={tl} playera="#2a5aa8" rayas={false} brazoD={40} brazoI={40} mira={[1, 0]} boca="sonrisa" seed={513} />
      </g>
      <g opacity={cpop(p, 0.02, 0.12)} style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,.7))' }}>
        <text x={960} y={190} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={8} fill="#7fe6ff">LOS NÚMEROS</text>
        <text x={960} y={300} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={110} fill="#fff">Un medio, no un fin</text>
      </g>
      <Polvo n={40} t={tl} seed={514} o={0.4} />
    </g>;
  },
};

/* ---------- B-Eco: el censo, Bosques Urbanos y la salida a Los Colomos ---------- */
ILUSC.beco = {
  cam: { z0: 1.0, z1: 1.04, fx: 960, fy: 480 },
  dibuja: ({ p, tl, capa }) => {
    const a = cpr(p, 0.0, 0.08) * (1 - cpr(p, 0.4, 0.46)), b = cpr(p, 0.42, 0.5) * (1 - cpr(p, 0.72, 0.78)), c = cpr(p, 0.74, 0.82);
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#121a14" /><Halo x={960} y={420} r={800} color="#bfe8c8" o={0.3} /><Bokeh n={14} t={tl} seed={521} colores={['#9fe8b0', '#ffe2b0']} o={0.3} /></g>
      <g transform={capa(1)}>
        <FotoReal src="video/img/fotos_basis/cap6/beco_censo_reconocimiento.jpg" x={960} y={470} maxW={1100} maxH={680} rot={-1.5} o={a} etiqueta="CENSO DE PERROS Y GATOS · LA PRIMAVERA" acento="#7ff0c8" />
        <FotoReal src="video/img/extra/bosques_urbanos.jpg" x={960} y={470} maxW={1100} maxH={680} rot={1} o={b} etiqueta="CON BOSQUES URBANOS · PARQUE METROPOLITANO" acento="#7ff0c8" />
        <FotoReal src="video/img/fotos_basis/cap6/beco_salida_voluntariado.jpg" x={960} y={470} maxW={1100} maxH={680} rot={-1} o={c} etiqueta="Y A VECES EN LOS COLOMOS" acento="#7ff0c8" />
      </g>
      <Polvo n={30} t={tl} seed={522} o={0.4} />
    </g>;
  },
};

Object.assign(window, { Medalla });
