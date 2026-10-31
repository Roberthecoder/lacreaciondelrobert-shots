// cine-cap3.jsx — capítulo 3 (El hongo que no quiso crecer): el champiñón, los dos kits, la seta rosa y la "azul".
const ILUSC = window.ILUSC;

// Escritorio de noche con lámpara (se reutiliza en varias escenas de hongos).
function EscritorioNoche({ capa, tl, lampara = [380, 120], pared = '#2a2f45' }) {
  return <g>
    <g transform={capa(0.45)}>
      <Pared color={pared} luz={[lampara[0] / 1920, lampara[1] / 1080]} />
      <Halo x={lampara[0] + 60} y={lampara[1] + 240} r={620} color="#ffcf8a" o={0.75} />
      <Desenfoque b={6}>
        <rect x={1300} y={140} width={420} height={330} fill="#121828" /><rect x={1300} y={140} width={420} height={330} fill="none" stroke="#c9c2b0" strokeWidth={12} />
        {Array.from({ length: 30 }, (_, i) => { const r = R(1700 + i); return <circle key={i} cx={1310 + r() * 400} cy={150 + r() * 300} r={1.5 + r() * 2} fill="#fff" opacity={0.6} />; })}
        <Tablon x={120} y={500} w={560} prof={14} grosor={16} madera="oscura" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={150 + i * 40} y={500 - 110 - (i % 3) * 14} width={32} height={110 + (i % 3) * 14} fill={['#7a2a22', '#2a4a7a', '#a8822a', '#3a6a3a', '#5a3a7a', '#a8522a', '#2a2a2a'][i]} />)}
      </Desenfoque>
    </g>
    <g transform={capa(0.85)}>
      <rect x={-200} y={760} width={2320} height={500} fill="url(#c-madera-oscura)" /><rect x={-200} y={760} width={2320} height={500} fill="#000" opacity={0.15} />
      <rect x={-200} y={756} width={2320} height={8} fill="#fff" opacity={0.2} />
      <radialGradient id="c-esc-luz" cx={lampara[0] / 1920 + 0.05} cy=".1" r=".6"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
      <rect x={-200} y={760} width={2320} height={500} fill="url(#c-esc-luz)" />
      {/* lámpara de escritorio */}
      <g transform={`translate(${lampara[0]} 770)`}>
        <ellipse cx={0} cy={0} rx={90} ry={18} fill="#1d1d22" />
        <path d="M 0 -10 L 40 -330 L 170 -420" stroke="#2a2a30" strokeWidth={14} fill="none" strokeLinecap="round" />
        <circle cx={40} cy={-330} r={14} fill="#3a3a40" />
        <g transform="translate(170 -420) rotate(30)"><path d="M -70 0 L 70 0 L 40 -80 L -40 -80 Z" fill="#c0392b" /><path d="M -70 0 L 70 0 L 40 -80 L -40 -80 Z" fill="url(#c-cilindro)" /><ellipse cx={0} cy={0} rx={70} ry={14} fill="#fff6d8" /><ellipse cx={0} cy={0} rx={90} ry={30} fill="#ffe6a8" opacity={0.6} filter="url(#c-b14)" /></g>
      </g>
    </g>
  </g>;
}

/* ---------- ¿cómo rayos crece un champiñón? ---------- */
ILUSC.champinon = {
  cam: { z0: 1.0, z1: 1.08, fx: 980, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const A = 1 - cpr(p, 0.25, 0.29), B = cpr(p, 0.27, 0.31) * (1 - cpr(p, 0.53, 0.57)), C = cpr(p, 0.55, 0.59);
    const fallo = cpr(p, 0.32, 0.52);
    return <g>
      {/* A: el niño, la lámpara y un champiñón del súper */}
      <g opacity={A}>
        <EscritorioNoche capa={capa} tl={tl} />
        <g transform={capa(1)}>
          <Nene x={1360} y={1090} s={1.35} edad={10} t={tl} playera="#3a4a7a" rayas={false} cuerpo="busto" brazoD={4} brazoI={-4} mira={[-1, 0.6]} boca="o" cejas={1} seed={15} />
          <rect x={-200} y={850} width={2320} height={400} fill="url(#c-madera-oscura)" opacity={0} />
          <Champinon x={860} y={800} s={1.3} />
          <Champinon x={1060} y={812} s={0.9} rot={-70} />
          {/* lupa */}
          <g transform={`translate(${1000 + Math.sin(tl * 0.8) * 30} 560) rotate(-20)`}><rect x={-14} y={100} width={28} height={200} rx={10} fill="url(#c-madera-oscura)" /><circle r={110} fill="#e9f5ff" opacity={0.12} /><circle r={110} fill="none" stroke="url(#c-laton)" strokeWidth={18} /><path d="M -60 -50 Q -24 -86 26 -80" stroke="#fff" strokeWidth={8} opacity={0.5} fill="none" /></g>
        </g>
        <Polvo n={40} t={tl} seed={181} o={0.5} />
        <Rotulo x={120} y={190} arriba="A LOS DIEZ AÑOS" texto="¿Cómo crece un champiñón?" tl={tl} at={0.4} tam={60} />
      </g>
      {/* B: los intentos que no funcionaron (time-lapse) */}
      <g opacity={B}>
        <rect x={0} y={0} width={1920} height={1080} fill="#14161c" />
        <Halo x={960} y={300} r={700} color="#cfe0ff" o={0.25} />
        {[[560, 'tutorial de internet', 'tierra'], [1360, 'con café', 'cafe']].map(([cx, nom, tipo], i) => <g key={i}>
          <g transform={`translate(${cx} 760)`}>
            <Sombra x={0} y={10} rx={260} ry={20} o={0.6} />
            <path d="M -230 0 L -250 -260 L 250 -260 L 230 0 Z" fill="#dfeef0" opacity={0.2} />
            <path d="M -236 -60 L -246 -230 L 246 -230 L 236 -60 Z" fill={tipo === 'cafe' ? '#3a2416' : 'url(#c-tierra)'} />
            {tipo === 'cafe' && Array.from({ length: 120 }, (_, k) => { const r = R(1800 + k); return <circle key={k} cx={-230 + r() * 460} cy={-225 + r() * 160} r={2 + r() * 3} fill="#5a3a24" />; })}
            {/* el moho que sí creció */}
            <g clipPath="none">{[0, 1, 2, 3].map((k) => <Moho key={k} x={-150 + k * 100 + (i * 30)} y={-180 + (k % 2) * 60} r={60 + k * 10} g={kclamp(fallo * 2 - k * 0.3, 0, 1)} seed={k + i * 7} aplastado={0.45} />)}</g>
            <path d="M -236 -60 L -246 -230 L 246 -230 L 236 -60 Z" fill="url(#c-vidrio)" opacity={0.7} />
            <path d="M -230 0 L -250 -260 L 250 -260 L 230 0 Z" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} />
          </g>
          <text x={cx} y={430} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={44} fill="#fff">{nom}</text>
          <g opacity={cpr(p, 0.44 + i * 0.04, 0.48 + i * 0.04)} transform={`translate(${cx} 600) rotate(-8)`}>
            <path d="M -120 -120 L 120 120 M 120 -120 L -120 120" stroke="#ff3b2f" strokeWidth={22} strokeLinecap="round" opacity={0.85} />
          </g>
        </g>)}
        <text x={960} y={190} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={6} fill="#cfe0ff">DÍA {1 + Math.floor(fallo * 20)}</text>
        <text x={960} y={250} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={56} fill="#fff">Ni un champiñón… solo moho</text>
      </g>
      {/* C: por qué — la composta del champiñón (corte de una cama de cultivo) */}
      <g opacity={C}>
        <rect x={0} y={0} width={1920} height={1080} fill="#101218" />
        <Halo x={960} y={360} r={800} color="#ffe2b8" o={0.22} />
        <g transform={`translate(840 620) scale(${lerp(0.76, 0.8, cpr(p, 0.55, 1))})`}>
          <rect x={-700} y={40} width={1400} height={260} fill="#4a3220" />
          {Array.from({ length: 220 }, (_, i) => { const r = R(1900 + i); return <path key={i} d={`M ${-690 + r() * 1380} ${50 + r() * 240} l ${(r() - 0.5) * 60} ${(r() - 0.5) * 10}`} stroke={['#c9a85a', '#8a6a3a', '#6a4a2a'][i % 3]} strokeWidth={3} opacity={0.8} />; })}
          <rect x={-700} y={-40} width={1400} height={80} fill="#2a1d14" />
          {Array.from({ length: 160 }, (_, i) => { const r = R(2100 + i); return <circle key={i} cx={-690 + r() * 1380} cy={-36 + r() * 72} r={2 + r() * 4} fill="#3a2a1c" />; })}
          <Micelio x={-300} y={120} r={260} g={cpr(p, 0.6, 0.85)} seed={4} aplastado={0.5} o={0.8} />
          <Micelio x={250} y={140} r={260} g={cpr(p, 0.62, 0.88)} seed={9} aplastado={0.5} o={0.8} />
          {[-480, -160, 120, 420].map((cx, i) => { const e = cpr(p, 0.75 + i * 0.04, 0.88 + i * 0.03); return e > 0 && <g key={i} transform={`translate(${cx} -38) scale(${0.3 + 0.5 * e})`}><Champinon x={0} y={0} s={0.9} /></g>; })}
          <rect x={-700} y={-40} width={1400} height={340} fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} />
          {/* etiquetas */}
          <g opacity={cpr(p, 0.6, 0.66)}><path d="M 700 0 L 780 -60" stroke="#fff" strokeWidth={2.5} /><text x={790} y={-66} fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={3} fill="#F4C25A">CAPA DE COBERTURA</text><text x={790} y={-30} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#fff">turba + cal</text></g>
          <g opacity={cpr(p, 0.64, 0.7)}><path d="M 700 170 L 780 200" stroke="#fff" strokeWidth={2.5} /><text x={790} y={196} fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={3} fill="#F4C25A">COMPOSTA</text><text x={790} y={232} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#fff">paja + estiércol,</text><text x={790} y={266} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#fff">fermentada y pasteurizada</text></g>
        </g>
        <text x={960} y={190} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={6} fill="#F4C25A">AGARICUS BISPORUS</text>
        <text x={960} y={260} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={60} fill="#fff">Necesita una composta muy específica</text>
        <Polvo n={40} t={tl} seed={182} o={0.4} />
      </g>
    </g>;
  },
};

/* ---------- los dos primeros kits: seta rosa y seta "azul" ---------- */
function KitCaja({ x, y, color, nombre, cientifico, t, abierta = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={20} y={6} rx={240} ry={22} o={0.55} />
    <rect x={-200} y={-420} width={400} height={420} fill="#f3ead6" /><rect x={-200} y={-420} width={400} height={420} fill="url(#c-papel-a)" />
    <rect x={-200} y={-420} width={400} height={420} fill="url(#c-cilindro)" opacity={0.35} />
    <rect x={-200} y={-420} width={400} height={110} fill={color} /><rect x={-200} y={-420} width={400} height={110} fill="url(#c-arriba)" />
    <text x={0} y={-372} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={6} fill="#fff">KIT DE CULTIVO</text>
    <text x={0} y={-330} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={40} fill="#fff">{nombre}</text>
    {/* ventana con el bloque colonizado */}
    <rect x={-150} y={-290} width={300} height={220} rx={10} fill="#efe9dc" />
    <rect x={-150} y={-290} width={300} height={220} rx={10} fill="url(#c-aserrin)" opacity={0.25} />
    <Micelio x={0} y={-180} r={180} g={1} seed={seed} aplastado={0.7} o={0.85} />
    <rect x={-150} y={-290} width={300} height={220} rx={10} fill="url(#c-vidrio)" />
    <rect x={-150} y={-290} width={300} height={220} rx={10} fill="none" stroke="#000" strokeOpacity={0.25} strokeWidth={3} />
    <text x={0} y={-30} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={28} fill="#333">{cientifico}</text>
  </g>;
}
ILUSC.kits = {
  cam: { z0: 1.02, z1: 1.1, fx: 960, fy: 560, x0: -20, x1: 20 },
  dibuja: ({ p, tl, capa }) => {
    return <g>
      <EscritorioNoche capa={capa} tl={tl} lampara={[1600, 120]} pared="#3a2f45" />
      <g transform={capa(1)}>
        <KitCaja x={640} y={820} color="#e8467c" nombre="Seta rosa" cientifico="Pleurotus djamor" t={tl} seed={3} abierta={cpr(p, 0.5, 0.7)} />
        <KitCaja x={1220} y={830} color="#5b7aa8" nombre={'Seta "azul"'} cientifico="P. ostreatus var. columbinus" t={tl} seed={7} abierta={cpr(p, 0.6, 0.8)} />
        {/* atomizador */}
        <g transform="translate(1630 830)"><Sombra x={0} y={4} rx={70} ry={10} o={0.5} /><path d="M -50 0 L -50 -170 Q -50 -200 -20 -200 L 20 -200 Q 50 -200 50 -170 L 50 0 Z" fill="#dff1f5" opacity={0.55} /><rect x={-50} y={-140} width={100} height={140} fill="#7fc4ff" opacity={0.35} /><path d="M -50 0 L -50 -170 Q -50 -200 -20 -200 L 20 -200 Q 50 -200 50 -170 L 50 0 Z" fill="url(#c-vidrio)" />
          <rect x={-22} y={-250} width={44} height={50} fill="#f6f6f6" /><path d="M 22 -244 L 70 -250 L 70 -236 L 22 -230 Z" fill="#f6f6f6" /><path d="M -10 -250 L -30 -200" stroke="#f6f6f6" strokeWidth={8} /></g>
        {/* cúter */}
        <g transform="translate(940 860) rotate(-12)"><rect x={-80} y={-12} width={160} height={24} rx={8} fill="#f4c23a" /><path d="M 80 -10 L 130 -2 L 80 8 Z" fill="url(#c-acero)" /></g>
      </g>
      <Polvo n={40} t={tl} seed={191} o={0.5} />
      <Rotulo x={120} y={190} arriba="APRENDER DE OTROS" texto="Mis primeros dos kits" tl={tl} at={0.4} tam={60} />
    </g>;
  },
};

/* ---------- la rosa creció primero ---------- */
ILUSC.seta_rosa = {
  cam: { z0: 1.12, z1: 1.0, fx: 980, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const g = cpr(p, 0, 0.75, (x) => 1 - Math.pow(1 - x, 2));
    return <g>
      <g transform={capa(0.3)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#2a1420" />
        <Bokeh n={20} t={tl} seed={201} colores={['#ff8fb8', '#ffc4d8', '#ffd38a']} o={0.6} r0={30} r1={110} />
        <Halo x={1400} y={260} r={700} color="#ffb3cc" o={0.5} />
      </g>
      <g transform={capa(1)}>
        <BolsaCultivo x={900} y={1180} w={760} h={820} colonizado={0.72}>
          <Racimo x={40} y={-560} n={9} tam={210} color="#ef7fa6" g={g} t={tl} seed={4} abre={1.15} />
          <Racimo x={-210} y={-300} n={6} tam={150} color="#f294b4" g={kclamp(g * 1.1 - 0.15, 0, 1)} t={tl} seed={9} abre={1} dir={-30} />
        </BolsaCultivo>
        {/* aroma: volutas */}
        {[0, 1, 2, 3, 4].map((k) => { const q = ((tl * 0.25 + k / 5) % 1); return <path key={k} d={`M ${1100 + k * 40} ${520 - q * 400} q 40 -40 0 -80 q -40 -40 0 -80`} stroke="#ffd0e0" strokeWidth={6} fill="none" opacity={0.5 * Math.sin(q * Math.PI) * g} filter="url(#c-b2)" />; })}
      </g>
      <Polvo n={60} t={tl} seed={202} o={0.7} color="#ffe0ea" />
      <Tinte color="#ff7fa6" o={0.12} />
      <Rotulo x={1260} y={190} arriba="PLEUROTUS DJAMOR" texto="La seta rosa" sub="su olor, su color" tl={tl} at={0.3} tam={66} acento="#ff9cc4" />
    </g>;
  },
};

/* ---------- la "azul" que salió gris (y por qué) ---------- */
ILUSC.seta_azul = {
  cam: { z0: 1.0, z1: 1.06, fx: 1100, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const crece = cpr(p, 0, 0.22, (x) => 1 - Math.pow(1 - x, 2)), susto = cpr(p, 0.16, 0.22);
    const compara = cpr(p, 0.3, 0.38, kEase.suave), fin = cpr(p, 0.82, 0.88);
    const gris = '#9a9a96', azul = '#5f7fa8';
    return <g>
      {/* toma 1: la bolsa en casa, con luz cálida → setas grises */}
      <g opacity={1 - compara}>
        <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#2a2420" /><Halo x={700} y={200} r={700} color="#ffcf8a" o={0.55} /></g>
        <g transform={capa(1)}>
          <rect x={-200} y={900} width={2320} height={400} fill="url(#c-madera-oscura)" />
          <BolsaCultivo x={1180} y={940} w={520} h={600}><Racimo x={20} y={-400} n={8} tam={170} color={gris} g={crece} t={tl} seed={14} abre={1.1} /></BolsaCultivo>
          <g opacity={susto}><NotaMano x={600} y={420} texto="¿…gris?" tl={tl} at={0} tam={110} color="#fff" rot={-8} /></g>
        </g>
      </g>
      {/* toma 2: comparación de luz — casa vs. luz ideal */}
      <g opacity={compara}>
        <rect x={0} y={0} width={1920} height={1080} fill="#0f1116" />
        {[0, 1].map((k) => { const cx = k ? 1390 : 670, luz = k ? '#dfeeff' : '#ffc27a';
          return <g key={k}>
            <clipPath id={`c-az-${k}`}><rect x={cx - 400} y={170} width={800} height={720} rx={8} /></clipPath>
            <g clipPath={`url(#c-az-${k})`}>
              <rect x={cx - 400} y={170} width={800} height={720} fill={k ? '#2a3448' : '#3a2a1e'} />
              <Halo x={cx} y={150} r={520} color={luz} o={k ? 0.75 : 0.5} />
              <BolsaCultivo x={cx} y={1000} w={420} h={520}>
                <Primordios x={-70} y={-380} n={22} r0={11} color={k ? '#4f73a8' : '#8f8d88'} seed={31} g={1} />
                <Racimo x={60} y={-300} n={6} tam={130} color={k ? '#9a9da2' : gris} g={0.9} t={tl} seed={32} />
              </BolsaCultivo>
              {k === 1 && <Rayos x={cx} y={120} ang={90} abre={50} largo={900} n={5} ancho={90} color="#e8f2ff" o={0.6} t={tl} seed={33} />}
            </g>
            <rect x={cx - 400} y={170} width={800} height={720} rx={8} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />
            <text x={cx} y={140} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={6} fill={k ? '#bfe0ff' : '#ffcf8a'}>{k ? 'LUZ IDEAL' : 'EN CASA'}</text>
            <g opacity={cpr(p, 0.45 + k * 0.08, 0.5 + k * 0.08)}><path d={`M ${cx - 70} 400 L ${cx - 200} 300`} stroke="#fff" strokeWidth={2.5} />
              <text x={cx - 210} y={290} textAnchor="end" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#fff">{k ? 'primordios azulados; la seta adulta, gris' : 'primordios grises'}</text></g>
          </g>; })}
      </g>
      <g opacity={fin}><rect x={0} y={0} width={1920} height={1080} fill="#07080b" opacity={0.6} /><Rotulo x={960} y={430} arriba="EN CASA, CASI NUNCA HAY LUZ IDEAL" texto="Funciona, pero no es óptima" alinear="middle" tl={tl} at={0} tam={72} /></g>
      <Polvo n={40} t={tl} seed={211} o={0.5} />
      <g opacity={1 - compara}><Rotulo x={120} y={190} arriba="PLEUROTUS OSTREATUS VAR. COLUMBINUS" texto={'La seta "azul"'} tl={tl} at={0.3} tam={64} acento="#9fc4ff" /></g>
    </g>;
  },
};
