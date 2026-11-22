// cine-monologos.jsx — dibujos sencillos para las escenas de texto (los "monólogos").
// Cada dibujo ocupa la mitad de abajo del cuadro (y ≈ 380–880); el título sube arriba.
// Se usan con v.dibujo = 'id' en una escena tipo 'texto'.
const DIBUJOS = {};
const suelo = (c = '#000', o = 0.35) => <ellipse cx={960} cy={870} rx={760} ry={40} fill={c} opacity={o} filter="url(#c-b14)" />;

// Robert de niño, chiquito, frente a gigantes de las matemáticas; luego voltea hacia los hongos.
DIBUJOS.titanes = ({ p, tl }) => {
  const crece = cpr(p, 0.02, 0.3, kEase.suave), voltea = cpr(p, 0.52, 0.66, kEase.suave), seta = cpr(p, 0.6, 0.8, kEase.sale);
  const titan = (x, h, simb, k) => { const e = cpr(p, 0.04 + k * 0.08, 0.3 + k * 0.08, kEase.sale);
    return <g key={k} opacity={(0.25 + 0.75 * e) * (1 - 0.55 * voltea)} transform={`translate(${x} 870) scale(${0.6 + 0.4 * e})`}>
      <path d={`M -90 0 L -70 ${-h * 0.62} Q 0 ${-h * 0.7} 70 ${-h * 0.62} L 90 0 Z`} fill="#22324f" />
      <circle cx={0} cy={-h * 0.62 - 62} r={58} fill="#22324f" />
      <path d={`M 70 ${-h * 0.55} L 150 ${-h * 0.78}`} stroke="#22324f" strokeWidth={34} strokeLinecap="round" />
      <text x={0} y={-h * 0.3} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={700} fontSize={64} fill="#7fc4ff" opacity={0.9}>{simb}</text>
      <path d={`M 150 ${-h * 0.82} l -20 -36 l 40 0 z`} fill="#F4C25A" />
    </g>; };
  return <g>
    <Halo x={720} y={560} r={520} color="#3a5f96" o={0.35} />
    {suelo()}
    {titan(430, 520, 'Σ', 0)}{titan(700, 640, '∫', 1)}{titan(980, 560, 'π', 2)}
    <Nene x={1300} y={870} s={0.62} edad={12} lentes t={tl} playera="#2a5aa8" rayas={false} mira={[lerp(-1, 1, voltea), lerp(-0.6, 0, voltea)]} boca={voltea > 0.5 ? 'sonrisa' : 'o'} brazoD={lerp(-10, 40, voltea)} brazoI={-10} seed={801} />
    <g opacity={seta}><Halo x={1600} y={760} r={220} color="#ffc4dc" o={0.55} /><Racimo x={1600} y={860} n={5} tam={70} color="#ef7fa6" g={seta} t={tl} seed={802} /></g>
  </g>;
};

// Los concursos: lápiz que escribe, una hoja y un trofeo.
DIBUJOS.concursos = ({ p, tl }) => {
  const e = cpr(p, 0.05, 0.5, kEase.suave);
  return <g>
    {suelo()}
    <g transform="translate(700 860) rotate(-6)"><rect x={-170} y={-300} width={340} height={300} fill="#f6f1e4" /><rect x={-170} y={-300} width={340} height={300} fill="url(#c-papel-a)" />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-140} y={-260 + k * 50} width={280 * Math.min(1, Math.max(0, e * 5 - k))} height={6} rx={3} fill="#3a4a6a" opacity={0.7} />)}
      <g transform={`translate(${-140 + 280 * ((e * 5) % 1)} ${-268 + Math.min(4, Math.floor(e * 5)) * 50}) rotate(35)`}><rect x={-8} y={-130} width={16} height={130} fill="#f4c23a" /><path d="M -8 0 L 0 18 L 8 0 Z" fill="#3a2a1e" /></g></g>
    <g transform={`translate(1220 860) scale(${0.6 + 0.4 * cpr(p, 0.3, 0.6, kEase.sale)})`} opacity={cpr(p, 0.3, 0.5)}>
      <rect x={-70} y={-40} width={140} height={40} fill="#5a3a22" /><rect x={-24} y={-110} width={48} height={70} fill="#c9a23a" />
      <path d="M -110 -330 L 110 -330 Q 110 -150 0 -120 Q -110 -150 -110 -330 Z" fill="#e2b84a" /><path d="M -110 -330 L 110 -330 Q 110 -150 0 -120 Q -110 -150 -110 -330 Z" fill="url(#c-arriba)" />
      <text x={0} y={-220} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={700} fontSize={70} fill="#8a6a1a">π</text>
      <Halo x={0} y={-230} r={200} color="#ffe2a0" o={0.3 + 0.1 * Math.sin(tl * 2)} /></g>
  </g>;
};

// Las matemáticas con mamá: un pizarrón y el niño contando.
DIBUJOS.mama = ({ p, tl }) => {
  const ops = ['1 + 1 = 2', '3 × 4 = 12', '¾ + ¼ = 1'], k = Math.min(2, Math.floor(cpr(p, 0.05, 0.85) * 3));
  return <g>
    {suelo()}
    <g transform="translate(960 470)"><rect x={-330} y={0} width={660} height={300} rx={10} fill="#2c4a3a" stroke="#8a5a33" strokeWidth={18} />
      {ops.map((o, i) => <text key={i} x={0} y={110 + i * 0} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={80} fill="#f4f2ee" opacity={i === k ? 1 : 0}>{o}</text>)}
      <text x={0} y={230} textAnchor="middle" fontFamily={FUENTE.mano} fontSize={46} fill="#f4c23a">¡bien!</text></g>
    <Adulto x={560} y={870} s={0.8} mujer piel="#eccdb2" camisa="#6a4c9c" brazoD={50} mira={[1, -0.2]} boca="sonrisa" t={tl} seed={811} />
    <Nene x={1380} y={870} s={0.7} edad={6} t={tl} playera="#e8742a" brazoI={-60 - 10 * Math.sin(tl * 3)} mira={[-1, -0.3]} boca="sonrisa" seed={812} />
  </g>;
};

// El canal dormido: una tablet con "zzz" que despierta.
DIBUJOS.canal = ({ p, tl }) => {
  const despierta = cpr(p, 0.55, 0.7, kEase.sale);
  return <g>
    {suelo()}
    <g transform="translate(960 640)"><rect x={-300} y={-200} width={600} height={400} rx={36} fill="#1d1d22" /><rect x={-270} y={-172} width={540} height={344} rx={14} fill={despierta > 0.5 ? '#f6f4ee' : '#2a2f3a'} />
      <g opacity={despierta}><path d="M -70 -60 L -70 60 L 60 0 Z" fill="#e23b3b" /><Halo x={0} y={0} r={240} color="#ffd3a0" o={0.35} /></g>
      <g opacity={1 - despierta}>{[0, 1, 2].map((k) => <text key={k} x={60 + k * 60} y={-30 - k * 50 - ((tl * 20) % 20)} fontFamily={FUENTE.mano} fontWeight={700} fontSize={50 + k * 16} fill="#cfd8e8" opacity={0.8}>z</text>)}</g></g>
  </g>;
};

// Más lejos: un camino largo hacia una bandera.
DIBUJOS.lejos = ({ p, tl }) => {
  const e = cpr(p, 0.05, 0.9, kEase.suave);
  return <g>
    <path d="M 760 880 Q 900 640 960 470 Q 1010 640 1160 880 Z" fill="#c9a86a" opacity={0.8} />
    <path d="M 960 870 Q 960 640 960 480" stroke="#fff" strokeWidth={6} strokeDasharray="24 22" opacity={0.6} />
    <g transform="translate(960 470)"><path d="M 0 0 L 0 -150" stroke="#e8e6e0" strokeWidth={6} /><path d={`M 0 -150 Q 40 ${-140 + 8 * Math.sin(tl * 3)} 80 -130 L 0 -100 Z`} fill="#F4C25A" /></g>
    <Nene x={960} y={lerp(870, 600, e)} s={lerp(0.55, 0.25, e)} edad={12} espalda t={tl} playera="#2a5aa8" rayas={false} mochila="#c0392b" seed={821} />
  </g>;
};

// Innovación y emprendimiento: un foco que se prende con engranes y una seta.
DIBUJOS.foco = ({ p, tl }) => {
  const luz = cpr(p, 0.3, 0.45, kEase.sale);
  const engrane = (x, y, r, dir, k) => <g key={k} transform={`translate(${x} ${y}) rotate(${dir * tl * 30})`}>{Array.from({ length: 10 }, (_, i) => <rect key={i} x={-12} y={-r - 22} width={24} height={30} fill="#7d8aa0" transform={`rotate(${i * 36})`} />)}<circle r={r} fill="#7d8aa0" /><circle r={r * 0.35} fill="#1a1d24" /></g>;
  return <g>
    {suelo()}
    {engrane(650, 720, 80, 1, 0)}{engrane(780, 640, 56, -1, 1)}
    <g transform="translate(960 640)"><Halo x={0} y={-60} r={320} color="#ffe28a" o={0.6 * luz} />
      <path d="M -110 -60 A 110 110 0 1 1 110 -60 Q 70 20 60 80 L -60 80 Q -70 20 -110 -60 Z" fill={luz > 0.5 ? '#ffe9a0' : '#d8dde4'} opacity={0.95} />
      <path d="M -30 80 L -30 0 Q 0 -40 30 0 L 30 80" stroke="#c9a23a" strokeWidth={6} fill="none" opacity={0.8} />
      <rect x={-60} y={80} width={120} height={70} rx={14} fill="#8a96a8" /></g>
    <g opacity={cpr(p, 0.5, 0.7)}><Racimo x={1300} y={860} n={5} tam={78} color="#ece2cc" g={cpr(p, 0.5, 0.9)} t={tl} seed={831} /></g>
  </g>;
};

// Ingeniería en Biotecnología: una hélice de ADN girando, un matraz y una seta.
DIBUJOS.adn = ({ p, tl }) => {
  const n = 16;
  return <g>
    <Halo x={960} y={640} r={420} color="#2fbf8a" o={0.25} />
    {Array.from({ length: n }, (_, i) => { const y = 440 + i * 28, a = tl * 1.4 + i * 0.5, x1 = 960 + Math.sin(a) * 110, x2 = 960 - Math.sin(a) * 110, f = Math.cos(a) > 0;
      return <g key={i}><path d={`M ${x1} ${y} L ${x2} ${y}`} stroke="#cfe8dc" strokeWidth={4} opacity={0.5} />
        <circle cx={x1} cy={y} r={13} fill={f ? '#7fe6b0' : '#3f9f7a'} /><circle cx={x2} cy={y} r={13} fill={f ? '#3f9f7a' : '#7fe6b0'} /></g>; })}
    <g transform="translate(600 860)"><path d="M -70 0 Q -80 -16 -64 -34 L -24 -100 L -24 -170 L 24 -170 L 24 -100 L 64 -34 Q 80 -16 70 0 Z" fill="#3fbf6a" opacity={0.85} /><path d="M -70 0 Q -80 -16 -64 -34 L -24 -100 L -24 -170 L 24 -170 L 24 -100 L 64 -34 Q 80 -16 70 0 Z" fill="url(#c-vidrio)" /></g>
    <Racimo x={1330} y={870} n={5} tam={70} color="#ef7fa6" g={cpr(p, 0.2, 0.7)} t={tl} seed={841} />
  </g>;
};

// Presidente de B-Eco: el logo del grupo estudiantil, con el grupo alrededor.
DIBUJOS.beco = ({ p, tl }) => {
  const e = cpr(p, 0.05, 0.45, kEase.sale);
  return <g>
    {suelo('#0a2a1a', 0.5)}
    <Halo x={960} y={600} r={420} color="#cfeedd" o={0.35} />
    <g opacity={e} transform={`translate(960 600) scale(${0.9 + 0.1 * e})`}>
      <image href="video/img/extra/beco_logo.png" x={-260} y={-260} width={520} height={520} preserveAspectRatio="xMidYMid meet" /></g>
    {[[480, '#2f8f5a', 831], [620, '#f4f2ec', 832], [1300, '#2f8f5a', 833], [1440, '#2a5aa8', 834]].map(([x, c, s], k) =>
      <Nene key={k} x={x} y={870} s={0.55} edad={16} t={tl} playera={c} rayas={false} lentes={k === 0} brazoD={k === 0 ? 50 + 10 * Math.sin(tl * 2) : 10} mira={[x < 960 ? 1 : -1, 0]} boca="sonrisa" seed={s} />)}
  </g>;
};

// Cada dato, verificado: una lupa sobre una lista que se va palomeando.
DIBUJOS.verificado = ({ p, tl }) => {
  const k = cpr(p, 0.05, 0.9) * 4;
  return <g>
    {suelo()}
    <g transform="translate(960 640) rotate(-3)"><rect x={-260} y={-210} width={520} height={420} fill="#f6f1e4" /><rect x={-260} y={-210} width={520} height={420} fill="url(#c-papel-a)" />
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(-200 ${-140 + i * 95})`}><rect x={0} y={-22} width={44} height={44} fill="none" stroke="#3a4a6a" strokeWidth={4} />
        <path d="M 6 0 L 20 16 L 44 -24" stroke="#2fbf5a" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={80} strokeDashoffset={80 * (1 - Math.min(1, Math.max(0, k - i)))} />
        <rect x={74} y={-8} width={300} height={14} rx={7} fill="#3a4a6a" opacity={0.6} /></g>)}</g>
    <g transform={`translate(${1180 + 30 * Math.sin(tl * 0.8)} ${560 + 20 * Math.cos(tl * 0.8)})`}><circle r={90} fill="#cfe8ff" opacity={0.25} /><circle r={90} fill="none" stroke="#c9a23a" strokeWidth={16} /><path d="M 64 64 L 150 150" stroke="#5a3a22" strokeWidth={28} strokeLinecap="round" /></g>
  </g>;
};

// Me inspiran: el niño frente a una pantalla llena de videos de ciencia.
DIBUJOS.pantallas = ({ p, tl }) => {
  return <g>
    <g transform="translate(960 600)"><rect x={-420} y={-230} width={840} height={460} rx={20} fill="#1d1d22" />
      {Array.from({ length: 6 }, (_, i) => { const x = -380 + (i % 3) * 260, y = -190 + Math.floor(i / 3) * 200, on = cpr(p, 0.05 + i * 0.1, 0.15 + i * 0.1);
        return <g key={i} opacity={0.3 + 0.7 * on}><rect x={x} y={y} width={240} height={170} rx={8} fill={['#3a5f96', '#2f8f5a', '#c0392b', '#f4c23a', '#6a4c9c', '#2a8fa0'][i]} />
          <path d={`M ${x + 100} ${y + 60} L ${x + 100} ${y + 110} L ${x + 145} ${y + 85} Z`} fill="#fff" opacity={0.9} /></g>; })}</g>
    <Halo x={960} y={600} r={520} color="#7fb0ff" o={0.25} />
    <Nene x={960} y={905} s={0.52} edad={16} espalda t={tl} playera="#2a5aa8" rayas={false} seed={851} />
  </g>;
};

window.DIBUJOS = DIBUJOS;
