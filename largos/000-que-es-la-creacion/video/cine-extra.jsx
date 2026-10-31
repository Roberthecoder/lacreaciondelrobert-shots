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
                <path d="M -46 0 L -54 -110 L 54 -110 L 46 0 Z" fill={m.tipo === 'vaso' ? '#f4f2ea' : '#cfe6e0'} opacity={m.tipo === 'vaso' ? 1 : 0.6} /><path d="M -46 0 L -54 -110 L 54 -110 L 46 0 Z" fill="url(#c-cilindro)" />
                <ellipse cx={0} cy={-104} rx={50} ry={10} fill="url(#c-tierra)" />
                {m.tipo === 'vaso' && <text x={0} y={-50} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={18} fill="#2a5aa8" opacity={0.7}>YOGUR</text>}
                <MataJitomate x={0} y={-104} s={0.34 * (0.4 + 0.6 * gi)} alto={0.4 + 0.5 * gi} t={tl + i} seed={i + 50} /></g>}
          </g>; })}
        {/* el niño con su regadera */}
        <g transform="translate(1660 1010)">
          <Nene x={0} y={0} s={1.0} edad={5} t={tl} playera="#2f6fd0" brazoI={70} brazoD={10} mira={[-1, 0.5]} boca="sonrisa" seed={21} />
          <g transform="translate(-170 -190) rotate(-18)">
            <path d="M -60 0 L -50 -90 L 60 -90 L 70 0 Z" fill="#3fbf4a" /><path d="M -60 0 L -50 -90 L 60 -90 L 70 0 Z" fill="url(#c-cilindro)" />
            <path d="M -50 -60 L -150 -110" stroke="#3fbf4a" strokeWidth={14} strokeLinecap="round" /><ellipse cx={-156} cy={-114} rx={16} ry={22} fill="#2f9a3a" transform="rotate(-30 -156 -114)" />
            <path d="M 20 -90 Q 60 -150 70 -60" stroke="#2f9a3a" strokeWidth={10} fill="none" />
            {Array.from({ length: 14 }, (_, k) => { const q = ((tl * 1.2 + k / 14) % 1); return <circle key={k} cx={-166 - q * 60 + (k % 3) * 6} cy={-110 + q * 160} r={3} fill="#bfe6ff" opacity={0.8 * (1 - q)} />; })}
          </g>
        </g>
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
      <Rotulo x={120} y={190} arriba="1.ª OLIMPIADA MEXICANA DE MATEMÁTICAS · EDUCACIÓN BÁSICA" texto="Plata nacional" sub="a un punto del oro" tl={tl} at={0.3} tam={76} acento="#cfd8e8" />
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
        {Array.from({ length: 14 }, (_, k) => { const r = R(4200 + k), cx = 520 + r() * 900, y = 120 + r() * 700; return <path key={'v' + k} d={`M ${X(cx, y)} ${y} l 40 0 l 6 -22 l -52 0 Z`} fill="#f2f2ee" opacity={0.9} />; })}
        <path d={`M ${X(420, 1000)} 1000 L ${X(420, 0)} 0 L ${X(700, 0)} 0`} stroke="#fff" strokeOpacity={0.25} strokeWidth={30} fill="none" />
        {/* exoesqueleto rojo: vigas horizontales y diagonales */}
        {[920, 640, 360, 100].map((y, k) => <g key={k}>
          <path d={`M ${X(300, y)} ${y} L ${X(1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(34, 22, (1000 - y) / 1000)} />
          {k < 3 && [0, 1].map((d) => <path key={d} d={`M ${X(d ? 1620 : 300, y)} ${y} L ${X(960, y - 280)} ${y - 280} L ${X(d ? 300 : 1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(22, 14, (1000 - y) / 1000)} fill="none" opacity={d ? 0 : 1} />)}
          {k < 3 && <path d={`M ${X(300, y)} ${y} L ${X(960, y - 280)} ${y - 280} L ${X(1620, y)} ${y}`} stroke="#c8231b" strokeWidth={lerp(22, 14, (1000 - y) / 1000)} fill="none" />}
        </g>)}
        {[300, 1620].map((cx, k) => <path key={k} d={`M ${X(cx, 1100)} 1100 L ${X(cx, -40)} -40`} stroke="#c8231b" strokeWidth={30} />)}
        {/* marquesina con letrero */}
        <path d="M 560 900 L 1360 900 L 1400 980 L 520 980 Z" fill="#e8e6e0" opacity={0.85} />
        <rect x={520} y={830} width={880} height={76} fill="#c8231b" /><rect x={520} y={830} width={880} height={76} fill="url(#c-arriba)" />
        <text x={960} y={882} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={44} letterSpacing={3} fill="#f4f2ee">SECRETARÍA DE EDUCACIÓN</text>
        {/* estudiantes entrando */}
        {Array.from({ length: 9 }, (_, k) => { const q = ((tl * 0.08 + k / 9) % 1), x = lerp(-100 + k * 40, 900, q), s = 0.42 + (k % 3) * 0.05;
          return <g key={k} opacity={Math.min(1, (1 - q) * 3)} transform={`translate(${x} ${1060 - (k % 3) * 10}) scale(${s})`}><ellipse cx={0} cy={-300} rx={40} ry={46} fill="#2a2420" /><rect x={-60} y={-250} width={120} height={250} rx={34} fill={['#f4f2ec', '#2a5a9a', '#f4f2ec', '#3a3a40'][k % 4]} /><rect x={-50} y={-240} width={100} height={110} rx={20} fill={['#c0392b', '#2f6a3a', '#7a4a2a'][k % 3]} opacity={0.9} /></g>; })}
      </g>
      {/* bronce internacional */}
      <g opacity={bronce}><rect x={0} y={0} width={1920} height={1080} fill="#07080b" opacity={0.55} />
        <Medalla x={960} y={lerp(380, 560, bronce)} r={170} metal="bronce" texto="BRONCE" sub="SASMO" liston={['#c0392b', '#f6f6f6', '#c0392b']} brillo={cpr(p, 0.78, 0.95)} />
        <text x={960} y={830} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={56} fill="#fff">Bronce internacional</text></g>
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
        <FotoReal src="video/img/fotos_basis/cap5/joven_inventor_jalisco.jpg" x={520} y={500} maxW={640} maxH={560} rot={-2.5} o={cpr(p, 0.02, 0.15)} etiqueta="JOVEN INVENTOR · GOBIERNO DE JALISCO" />
        <FotoReal src="video/img/extra/diploma_una_idea.jpg" x={1320} y={470} maxW={900} maxH={680} rot={2} o={d} etiqueta={'"UNA IDEA PARA CAMBIAR LA HISTORIA" · HISTORY'} />
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
        <BolsaCultivo x={760} y={480} w={150} h={210}><Racimo x={20} y={-140} n={6} tam={70} color="#ef7fa6" g={1} t={tl} seed={451} /></BolsaCultivo>
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

Object.assign(window, { Medalla });
