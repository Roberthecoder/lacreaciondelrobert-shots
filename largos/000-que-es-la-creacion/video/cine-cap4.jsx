// cine-cap4.jsx — capítulo 4 (Secundaria): la recámara-laboratorio, la gelatina, el aserrín, el café y los plásticos.
const ILUSC = window.ILUSC;

// Olla exprés (para esterilizar).
function OllaExpres({ x, y, s = 1, vapor = 1, t = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Sombra x={0} y={4} rx={200} ry={20} o={0.55} />
    <path d="M -170 0 L -180 -220 L 180 -220 L 170 0 Z" fill="url(#c-acero)" />
    <rect x={-190} y={-250} width={380} height={40} rx={14} fill="url(#c-acero)" /><rect x={-190} y={-250} width={380} height={8} rx={4} fill="#fff" opacity={0.4} />
    <path d="M -150 -250 Q 0 -330 150 -250 Z" fill="url(#c-acero)" />
    <rect x={-20} y={-330} width={40} height={40} rx={6} fill="#2a2a2e" /><circle cx={0} cy={-340} r={16} fill="#3a3a40" />
    <rect x={180} y={-250} width={180} height={34} rx={14} fill="#1d1d22" /><rect x={-360} y={-240} width={170} height={30} rx={12} fill="#1d1d22" />
    {[0, 1, 2].map((k) => { const q = ((t * 0.5 + k / 3) % 1); return <path key={k} d={`M 0 ${-350 - q * 260} q ${30 * Math.sin(t + k)} -40 0 -80`} stroke="#fff" strokeWidth={20 + q * 30} opacity={0.25 * vapor * Math.sin(q * Math.PI)} fill="none" filter="url(#c-b14)" />; })}
  </g>;
}
// Caja de aire quieto (SAB): caja de plástico transparente con dos agujeros para los brazos.
function CajaAire({ x, y, w = 520, h = 300 }) {
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={0} y={4} rx={w * 0.55} ry={18} o={0.5} />
    <path d={`M ${-w / 2} 0 L ${-w / 2 + 20} ${-h} L ${w / 2 - 20} ${-h} L ${w / 2} 0 Z`} fill="#e8f3f6" opacity={0.22} />
    <path d={`M ${-w / 2} 0 L ${-w / 2 + 20} ${-h} L ${w / 2 - 20} ${-h} L ${w / 2} 0 Z`} fill="url(#c-vidrio)" />
    <rect x={-w / 2 + 10} y={-h - 26} width={w - 20} height={30} rx={8} fill="#d8e6ea" opacity={0.65} />
    {[-1, 1].map((d) => <g key={d}><ellipse cx={d * w * 0.22} cy={-h * 0.4} rx={56} ry={56} fill="#0e1014" opacity={0.55} /><ellipse cx={d * w * 0.22} cy={-h * 0.4} rx={56} ry={56} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} /></g>)}
    <path d={`M ${-w / 2} 0 L ${-w / 2 + 20} ${-h} L ${w / 2 - 20} ${-h} L ${w / 2} 0 Z`} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} />
    <path d={`M ${-w / 2 + 40} ${-h + 20} L ${-w / 2 + 60} -20`} stroke="#fff" strokeWidth={10} opacity={0.35} strokeLinecap="round" />
  </g>;
}

/* ---------- de recámara a laboratorio ---------- */
ILUSC.recamara = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 540, x0: -20, x1: 20 },
  dibuja: ({ p, tl, capa }) => {
    const ap = (i) => cpop(p, 0.08 + i * 0.09, 0.16 + i * 0.09);
    return <g>
      <g transform={capa(0.6)}>
        <Pared color="#4a5a7a" luz={[0.7, 0.2]} />
        <rect x={-200} y={-200} width={2320} height={1500} fill="#0e1424" opacity={lerp(0, 0.35, p)} />
        {/* ventana de noche */}
        <rect x={1360} y={110} width={420} height={330} fill="#0e1424" /><circle cx={1660} cy={190} r={36} fill="#f6efd9" /><Halo x={1660} y={190} r={140} color="#cfe0ff" o={0.4} />
        <rect x={1360} y={110} width={420} height={330} fill="none" stroke="#e9e1cf" strokeWidth={12} />
        {/* repisa con bolsas de cultivo y frascos */}
        <g opacity={ap(3)} transform="translate(160 0)"><Tablon x={620} y={380} w={560} prof={16} grosor={18} madera="pino" />
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${700 + k * 120} 384) scale(0.36)`}><BolsaCultivo x={0} y={0} w={220} h={300} colonizado={0.6 + k * 0.15} /></g>)}
          {[0, 1].map((k) => <Frasco key={k} id={`rec-f${k}`} x={1090 + k * 100} y={384} w={80} h={120} contenido="maiz" tapa="oro" seed={k + 40} nivel={0.8} ventana={false} />)}</g>
        <g opacity={ap(5)} transform="translate(160 0)"><Tablon x={620} y={560} w={600} prof={16} grosor={18} madera="pino" />
          {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${680 + k * 120} 556) scale(0.24)`}><Petri x={0} y={-40} r={200} id={`rec-p${k}`} medio="#efe0b0"><Micelio x={0} y={0} r={200} g={0.4 + k * 0.12} seed={k + 3} /></Petri></g>)}</g>
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={780} width={2320} height={500} fill="url(#c-madera-media)" /><rect x={-200} y={780} width={2320} height={500} fill="#000" opacity={0.25} />
        {/* cama */}
        <g transform="translate(-60 0)"><rect x={-200} y={640} width={560} height={240} rx={20} fill="#2a4a7a" /><rect x={-200} y={640} width={560} height={240} rx={20} fill="url(#c-tela)" /><rect x={-200} y={600} width={300} height={90} rx={40} fill="#f3efe6" /><rect x={-200} y={600} width={300} height={90} rx={40} fill="url(#c-esfera)" opacity={0.4} /></g>
        {/* escritorio que se vuelve mesa de trabajo */}
        <rect x={560} y={760} width={1200} height={30} fill="url(#c-madera-clara)" /><rect x={560} y={786} width={1200} height={14} fill="#000" opacity={0.3} />
        <g opacity={ap(0)}><OllaExpres x={760} y={762} s={0.62} vapor={1} t={tl} /></g>
        <g opacity={ap(1)}><CajaAire x={1150} y={762} w={460} h={260} /></g>
        <g opacity={ap(2)}>
          <g transform="translate(1500 762)"><Sombra x={0} y={4} rx={50} ry={8} o={0.5} /><rect x={-36} y={-150} width={72} height={150} rx={10} fill="#e8f3f6" opacity={0.6} /><rect x={-36} y={-110} width={72} height={110} fill="#bfe0ff" opacity={0.35} /><rect x={-22} y={-196} width={44} height={50} fill="#f6f6f6" /><path d="M 22 -190 L 64 -196 L 64 -182 L 22 -176 Z" fill="#f6f6f6" /><text x={0} y={-60} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={11} fill="#1d4f9c">ETANOL 70 %</text></g>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${1610 + k * 40} 760)`}><ellipse cx={0} cy={-k * 14} rx={60} ry={14} fill="#dff0ee" opacity={0.6} /><ellipse cx={0} cy={-k * 14} rx={60} ry={14} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={2} /></g>)}
        </g>
        <g opacity={ap(4)} transform="translate(960 600)"><rect x={-6} y={-200} width={12} height={160} fill="#2a2a30" /><g transform="translate(0 -210)"><path d="M -60 0 L 60 0 L 36 -60 L -36 -60 Z" fill="#e9e9e9" /><ellipse cx={0} cy={0} rx={60} ry={12} fill="#dff4ff" /><Rayos x={0} y={0} ang={90} abre={50} largo={500} n={4} ancho={60} color="#dff4ff" o={0.6} t={tl} seed={221} /></g></g>
      </g>
      <Polvo n={50} t={tl} seed={222} o={0.5} />
      <Tinte color="#7fb0ff" o={0.08} />
      {(() => { const o = cpr(p, 0.6, 0.7); const hay = (window.FOTOS || {})['video/img/extra/librero_lab.jpg']; return hay && o > 0 && <g>
        <rect x={0} y={0} width={1920} height={1080} fill="#0b0b0d" opacity={0.65 * o} />
        <FotoReal src="video/img/extra/librero_lab.jpg" x={1080} y={500} maxW={1100} maxH={700} rot={1.5} o={o} etiqueta="MI LIBRERO-LABORATORIO" /></g>; })()}
      <Rotulo x={120} y={190} arriba="POCO A POCO" texto="De recámara a laboratorio" sub="casero e improvisado" tl={tl} at={0.4} tam={58} />
    </g>;
  },
};

/* ---------- la gelatina: un cachito de historia de la microbiología ---------- */
ILUSC.gelatina = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 520 },
  dibuja: ({ p, tl, capa, dur }) => {
    const L2 = 0.42, L3 = 0.76;
    const hist = 1 - cpr(p, 0.2, 0.25);                         // viñeta histórica 1881
    const derrite = cpr(p, L2, L2 + 0.12), bact = cpr(p, L2 + 0.04, L2 + 0.2), rojo = cpr(p, L2 + 0.14, L3 - 0.04);
    const olor = cpr(p, L2 + 0.2, L3 - 0.02) * (1 - cpr(p, L3, L3 + 0.05));
    const mic = cpr(p, L3 + 0.02, 0.98), esperanza = cpr(p, L3 + 0.05, L3 + 0.15);
    return <g>
      {/* 1) 1881: Koch, gelatina y el agar que sugirió Fanny Hesse (sepia) */}
      <g opacity={hist}>
        <rect x={0} y={0} width={1920} height={1080} fill="#2a2016" />
        <g style={{ filter: 'sepia(0.9) contrast(1.05)' }}>
          <g transform={capa(0.6)}>
            <rect x={-200} y={-200} width={2320} height={1500} fill="#3a2e22" />
            <Halo x={500} y={200} r={700} color="#ffe8c0" o={0.3} />
            <Tablon x={-200} y={720} w={2320} prof={40} grosor={40} madera="oscura" />
            {[0, 1, 2].map((k) => <Petri key={k} x={560 + k * 380} y={680} r={150} id={`h${k}`} medio="#e8d9a8"><Colonias n={22} r={150} seed={k + 50} g={1} /></Petri>)}
            {/* microscopio antiguo */}
            <g transform="translate(1600 720)"><rect x={-80} y={-20} width={160} height={20} fill="url(#c-laton)" /><path d="M -10 -20 L -30 -300 L 10 -300 L 30 -20 Z" fill="url(#c-laton)" /><rect x={-26} y={-380} width={44} height={110} rx={8} fill="url(#c-laton)" transform="rotate(-14 0 -320)" /><rect x={-60} y={-150} width={120} height={14} fill="url(#c-laton)" /></g>
          </g>
        </g>
        <rect x={0} y={0} width={1920} height={1080} fill="none" stroke="#000" strokeWidth={80} opacity={0.5} filter="url(#c-b40)" />
        <Rotulo x={120} y={190} arriba="1881 · LABORATORIO DE ROBERT KOCH" texto="De la gelatina al agar" sub="idea de Fanny Hesse, que lo usaba en la cocina" tl={tl} at={0.4} tam={60} />
      </g>
      {/* 2) mi caja de gelatina */}
      <g opacity={1 - hist}>
        <g transform={capa(0.5)}>
          <rect x={-200} y={-200} width={2320} height={1500} fill="#1d2230" />
          <Halo x={900} y={260} r={760} color={mix('#ffcf8a', '#ff6b7a', olor)} o={0.45 + 0.2 * olor} />
          <Bokeh n={14} t={tl} seed={231} colores={olor > 0.1 ? ['#ff5a7a', '#ff9cb0', '#ffd0d8'] : ['#ffd38a', '#ffe6b0']} o={0.4} />
        </g>
        <g transform={capa(1)}>
          <rect x={-200} y={820} width={2320} height={400} fill="url(#c-madera-clara)" /><rect x={-200} y={820} width={2320} height={400} fill="#000" opacity={0.35} />
          <Petri x={960} y={640} r={420} id="gel" medio={mix('#d9a548', '#e8b860', derrite)} inclina={0.5} derretido={derrite}>
            {/* rajita de micelio sembrada al centro */}
            <rect x={-40} y={-30} width={80} height={60} rx={10} fill="#f6f1e4" /><rect x={-40} y={-30} width={80} height={60} rx={10} fill="url(#c-esfera)" opacity={0.4} />
            <Micelio x={0} y={0} r={360} g={lerp(0.14, 0.46, mic)} seed={21} o={1} color="#ffffff" n={44} />
            <Colonias n={60} r={400} seed={8} g={bact} />
            {rojo > 0 && <g><circle cx={210} cy={-90} r={lerp(0, 130, rojo)} fill="#d2233a" opacity={0.85} /><circle cx={210} cy={-90} r={lerp(0, 130, rojo)} fill="url(#c-esfera)" opacity={0.6} /><circle cx={-240} cy={140} r={lerp(0, 70, rojo)} fill="#c81e36" opacity={0.85} /></g>}
          </Petri>
          {/* termómetro: la gelatina se derrite con el calor */}
          <g opacity={cpr(p, L2 + 0.02, L2 + 0.06) * (1 - cpr(p, L3, L3 + 0.04))} transform="translate(1560 760)">
            <rect x={-16} y={-420} width={32} height={420} rx={16} fill="#f2f6f8" opacity={0.85} /><circle cx={0} cy={0} r={30} fill="#d2233a" />
            <rect x={-7} y={lerp(-120, -330, derrite)} width={14} height={lerp(120, 330, derrite)} fill="#d2233a" />
            {Array.from({ length: 9 }, (_, k) => <rect key={k} x={16} y={-80 - k * 40} width={14} height={3} fill="#333" />)}
            <text x={50} y={-320} fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} fill="#fff">~30 °C</text>
            <text x={50} y={-284} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={28} fill="#fff">se derrite</text>
          </g>
          {/* paleta de cereza */}
          <g opacity={olor} transform={`translate(420 ${380 + Math.sin(tl * 1.5) * 12}) rotate(-20)`}>
            <rect x={-6} y={60} width={12} height={240} rx={6} fill="#f6f1e4" />
            <circle cx={0} cy={0} r={86} fill="#d2233a" /><circle cx={0} cy={0} r={86} fill="url(#c-esfera)" /><path d="M -60 -30 Q -20 -70 30 -60" stroke="#fff" strokeOpacity={0.6} strokeWidth={10} fill="none" />
            <path d="M -80 -10 Q -140 40 -60 70" stroke="#ff9cb0" strokeOpacity={0.4} strokeWidth={6} fill="none" />
          </g>
          {olor > 0 && [0, 1, 2, 3, 4, 5].map((k) => { const q = ((tl * 0.2 + k / 6) % 1); return <path key={k} d={`M ${600 + k * 160} ${700 - q * 500} q 50 -40 0 -80 q -50 -40 0 -80`} stroke="#ff7a96" strokeWidth={8} fill="none" opacity={0.55 * olor * Math.sin(q * Math.PI)} filter="url(#c-b2)" />; })}
          {esperanza > 0 && <Halo x={960} y={640} r={300} color="#fff6d8" o={0.4 * esperanza} />}
        </g>
        <Polvo n={50} t={tl} seed={232} o={0.5} />
        <g opacity={cpr(p, 0.24, 0.3) * (1 - cpr(p, L2 - 0.02, L2 + 0.02))}><Rotulo x={120} y={190} arriba="EL AGAR-AGAR ERA MUY CARO" texto="Intenté con gelatina" tl={tl} at={0} tam={60} /></g>
        <g opacity={cpr(p, L2 + 0.02, L2 + 0.06) * (1 - cpr(p, L3 - 0.02, L3 + 0.02))}><Rotulo x={120} y={190} arriba="OH, SORPRESA" texto="Se derritió y se llenó de bacterias" sub="y algo rojo con olor a paleta de cereza" tl={tl} at={0} tam={52} /></g>
        <g opacity={esperanza}><Rotulo x={120} y={190} arriba="AUN ASÍ" texto="El micelio creció un poquito" sub="y eso me dio esperanza" tl={tl} at={0} tam={56} /></g>
      </g>
    </g>;
  },
};

/* ---------- el aserrín de las carpinterías: cuatro pasos ---------- */
ILUSC.aserrin = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const paso = (i) => cpop(p, 0.06 + i * 0.18, 0.16 + i * 0.18);
    const cx = (i) => 250 + i * 473;
    const tarjeta = (i, titulo, hijos) => <g opacity={paso(i)} transform={`translate(${cx(i)} 560) translate(0 ${(1 - paso(i)) * 40})`}>
      <rect x={-200} y={-300} width={400} height={500} rx={14} fill="#16181e" opacity={0.75} />
      <rect x={-200} y={-300} width={400} height={500} rx={14} fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={2} />
      <clipPath id={`c-as-${i}`}><rect x={-196} y={-296} width={392} height={400} rx={12} /></clipPath>
      <g clipPath={`url(#c-as-${i})`}>{hijos}</g>
      <text x={-176} y={150} fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={4} fill="#7fe6ff">PASO {i + 1}</text>
      <text x={-176} y={186} fontFamily={FUENTE.serif} fontWeight={600} fontSize={34} fill="#fff">{titulo}</text>
    </g>;
    return <g>
      <g transform={capa(0.4)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#2a2018" />
        <Desenfoque b={14}>{Array.from({ length: 10 }, (_, i) => <rect key={i} x={-200 + i * 240} y={300 + (i % 3) * 40} width={200} height={600} fill={['#8a5a33', '#6a4428', '#a8784a'][i % 3]} opacity={0.6} />)}</Desenfoque>
        <Rayos x={1700} y={-100} ang={120} abre={30} largo={1600} n={7} ancho={120} o={0.5} t={tl} seed={241} />
        <Polvo n={120} t={tl} seed={242} o={0.9} color="#ffe2b0" tam={1.4} />
      </g>
      <g transform={capa(1)}>
        {tarjeta(0, 'Aserrín y viruta', <g><rect x={-200} y={-300} width={400} height={400} fill="#5a3a22" /><rect x={-200} y={-60} width={400} height={170} fill="url(#c-aserrin)" />
          <path d="M -200 -40 Q -60 -140 60 -60 Q 140 -110 200 -60 L 200 120 L -200 120 Z" fill="url(#c-aserrin)" />
          {Array.from({ length: 16 }, (_, k) => { const r = R(2400 + k); return <path key={k} d={`M ${-160 + r() * 320} ${-80 + r() * 120} q 20 -26 44 -6 q -12 22 -36 10`} stroke="#e9c48a" strokeWidth={5} fill="none" />; })}
          <g transform="translate(60 -200) rotate(20)"><rect x={-130} y={-14} width={260} height={28} fill="url(#c-madera-clara)" /><path d="M -60 14 L -60 40 L 60 40 L 60 14" fill="url(#c-acero)" /></g></g>)}
        {tarjeta(1, 'Pasteurizar', <g><rect x={-200} y={-300} width={400} height={400} fill="#2a2a30" /><g transform="translate(0 60) scale(0.7)"><path d="M -200 0 L -210 -260 L 210 -260 L 200 0 Z" fill="url(#c-acero)" /><rect x={-196} y={-220} width={392} height={190} fill="url(#c-aserrin)" opacity={0.9} />
          {[0, 1, 2].map((k) => { const q = ((tl * 0.6 + k / 3) % 1); return <path key={k} d={`M ${-80 + k * 80} ${-270 - q * 200} q 30 -40 0 -80`} stroke="#fff" strokeWidth={24} opacity={0.3 * Math.sin(q * Math.PI)} fill="none" filter="url(#c-b8)" />; })}
          {Array.from({ length: 8 }, (_, k) => <path key={'f' + k} d={`M ${-150 + k * 40} 30 q 10 -30 0 -50`} stroke={k % 2 ? '#ff8a1f' : '#2f8fff'} strokeWidth={10} fill="none" opacity={0.85} />)}</g></g>)}
        {tarjeta(2, 'Inocular', <g><rect x={-200} y={-300} width={400} height={400} fill="#3a3024" />
          <g transform="translate(0 80)"><BolsaCultivo x={0} y={0} w={240} h={300} colonizado={0.15} /><g transform="translate(70 -260) rotate(30)"><Frasco id="as-sem" x={0} y={0} w={90} h={130} contenido="maiz" abierto seed={60} ventana={false} sombra={false} /></g>
            {Array.from({ length: 10 }, (_, k) => <Semilla key={k} tipo="maiz" x={30 - k * 10} y={-240 + k * 14} s={0.6} rot={k * 40} />)}</g></g>)}
        {tarjeta(3, '¡Setas!', <g><rect x={-200} y={-300} width={400} height={400} fill="#2a2f3a" /><g transform="translate(0 100)"><BolsaCultivo x={0} y={0} w={240} h={320} colonizado={0.95}><Racimo x={30} y={-210} n={7} tam={110} color="#ece2cc" g={cpr(p, 0.75, 0.98)} t={tl} seed={61} /></BolsaCultivo></g></g>)}
        {[0, 1, 2].map((i) => <g key={i} opacity={paso(i + 1)}><path d={`M ${cx(i) + 214} 470 L ${cx(i) + 258} 470`} stroke="#fff" strokeWidth={4} /><path d={`M ${cx(i) + 248} 460 L ${cx(i) + 260} 470 L ${cx(i) + 248} 480`} stroke="#fff" strokeWidth={4} fill="none" /></g>)}
      </g>
      <Tinte color="#ffb35a" o={0.1} />
      <Rotulo x={120} y={190} arriba="LO QUE SOBRA EN LAS CARPINTERÍAS" texto="Aserrín que da setas" tl={tl} at={0.3} tam={56} />
    </g>;
  },
};

/* ---------- el café usado, Trichoderma y el prototipo mitad y mitad ---------- */
ILUSC.cafe = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const A = 1 - cpr(p, 0.36, 0.42), Bv = cpr(p, 0.36, 0.42) * (1 - cpr(p, 0.56, 0.62)), C = cpr(p, 0.56, 0.62);
    const moho = cpr(p, 0.06, 0.34);
    const anios = 1 + Math.floor(cpr(p, 0.4, 0.58) * 6);
    return <g>
      <g opacity={A}>
        <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#1f1812" /><Halo x={960} y={260} r={760} color="#ffcf8a" o={0.4} /></g>
        <g transform={capa(1)}>
          <rect x={-200} y={820} width={2320} height={400} fill="url(#c-madera-oscura)" />
          <Petri x={960} y={620} r={460} id="cafe" medio="#3a2416" inclina={0.5} tapa>
            {Array.from({ length: 260 }, (_, k) => { const r = R(2500 + k), a = r() * 6.28, d = Math.sqrt(r()) * 440; return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={3 + r() * 5} fill={['#4a2e1c', '#2a1a10', '#5a3a24'][k % 3]} />; })}
            <Micelio x={-60} y={0} r={300} g={lerp(0.3, 0.45, moho)} seed={31} o={0.9} />
            <Moho x={200} y={-120} r={260} g={moho} seed={3} />
            <Moho x={-260} y={180} r={200} g={kclamp(moho * 1.2 - 0.2, 0, 1)} seed={5} />
            <Moho x={120} y={240} r={160} g={kclamp(moho * 1.4 - 0.4, 0, 1)} seed={7} />
          </Petri>
          <g opacity={cpr(p, 0.2, 0.26)}><path d="M 1180 520 L 1400 380" stroke="#fff" strokeWidth={2.5} /><text x={1410} y={374} fontFamily={FUENTE.serif} fontStyle="italic" fontWeight={600} fontSize={52} fill="#bfe68a">Trichoderma</text><text x={1410} y={414} fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} letterSpacing={4} fill="#fff">MOHO VERDE</text></g>
        </g>
        <Rotulo x={120} y={190} arriba="EL CAFÉ USADO, SOLO" texto="No funcionaba" tl={tl} at={0.3} tam={64} />
      </g>
      {/* "seguí de necio muchos años" */}
      <g opacity={Bv}>
        <rect x={0} y={0} width={1920} height={1080} fill="#14161c" />
        {Array.from({ length: 6 }, (_, k) => { const e = kclamp(cpr(p, 0.4, 0.58) * 6 - k, 0, 1); return <g key={k} transform={`translate(${720 + k * 90} ${300 + k * 40}) rotate(${-6 + k * 2})`} opacity={k < anios ? 1 : 0}>
          <rect x={0} y={0} width={420} height={420} fill="#f3ead6" /><rect x={0} y={0} width={420} height={420} fill="url(#c-papel-a)" /><rect x={0} y={0} width={420} height={70} fill="#c0392b" />
          {Array.from({ length: 20 }, (_, d) => <rect key={d} x={30 + (d % 5) * 74} y={100 + Math.floor(d / 5) * 70} width={50} height={40} fill="#ddd" opacity={0.6} />)}
          {Array.from({ length: 20 }, (_, d) => d < 12 + k && <path key={'x' + d} d={`M ${36 + (d % 5) * 74} ${106 + Math.floor(d / 5) * 70} l 38 28 M ${74 + (d % 5) * 74} ${106 + Math.floor(d / 5) * 70} l -38 28`} stroke="#333" strokeWidth={4} />)}
          <rect x={0} y={0} width={420} height={420} fill="#000" opacity={0.12 * (5 - k)} />
        </g>; })}
        <Rotulo x={120} y={190} arriba="AUN ASÍ" texto="Seguí de necio muchos años" tl={tl} at={0} tam={60} />
      </g>
      {/* hoy: el prototipo mitad café, mitad aserrín */}
      <g opacity={C}>
        <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#1d2420" /><Halo x={1100} y={240} r={800} color="#e8f2d8" o={0.45} /><Bokeh n={16} t={tl} seed={251} colores={['#cfe8b0', '#fff6d8']} o={0.4} /></g>
        <g transform={capa(1)}>
          <rect x={-200} y={860} width={2320} height={400} fill="url(#c-madera-pino)" /><rect x={-200} y={860} width={2320} height={400} fill="#000" opacity={0.25} />
          <g transform="translate(1080 900)">
            <Sombra x={0} y={4} rx={300} ry={24} o={0.55} />
            <clipPath id="c-cafe-bolsa"><path d="M -230 0 L -230 -560 Q 0 -620 230 -560 L 230 0 Z" /></clipPath>
            <g clipPath="url(#c-cafe-bolsa)">
              {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-240} y={-560 + k * 95} width={480} height={95} fill={k % 2 ? 'url(#c-aserrin)' : '#3a2416'} />)}
              {Array.from({ length: 160 }, (_, k) => { const r = R(2600 + k); return <circle key={k} cx={-230 + r() * 460} cy={-560 + r() * 560} r={2 + r() * 3} fill={Math.floor((-560 + r() * 560 + 560) / 95) % 2 ? '#c9a46a' : '#5a3a24'} opacity={0.6} />; })}
              <rect x={-240} y={-620} width={480} height={640} fill="#fbfaf4" opacity={0.18} />
              <Micelio x={0} y={-280} r={420} g={1} seed={41} aplastado={1.2} o={0.6} />
            </g>
            <path d="M -236 6 L -238 -570 Q 0 -640 238 -570 L 236 6 Z" fill="#fff" opacity={0.12} /><path d="M -210 -520 L -206 -40" stroke="#fff" strokeWidth={10} opacity={0.35} strokeLinecap="round" />
            <Racimo x={120} y={-360} n={8} tam={150} color="#cdb48a" g={cpr(p, 0.64, 0.9)} t={tl} seed={71} />
            <Racimo x={-150} y={-180} n={6} tam={120} color="#c4aa80" g={cpr(p, 0.68, 0.94)} t={tl} seed={72} dir={-30} />
          </g>
          <g opacity={cpr(p, 0.66, 0.7)}><path d="M 820 600 L 640 520" stroke="#fff" strokeWidth={2.5} /><text x={630} y={500} textAnchor="end" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={4} fill="#F4C25A">CAPAS</text><text x={630} y={540} textAnchor="end" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#fff">50 % café · 50 % aserrín</text></g>
          {/* voluntarios del grupo estudiantil (siluetas) */}
          <Desenfoque b={6} o={0.85}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1560 + k * 130} ${900}) scale(${0.85 - k * 0.05})`}><ellipse cx={0} cy={-440} rx={56} ry={64} fill="#1a1f1c" /><rect x={-86} y={-380} width={172} height={380} rx={50} fill="#1a1f1c" /></g>)}</Desenfoque>
        </g>
        <Rotulo x={120} y={190} arriba="HOY, CON MI GRUPO ESTUDIANTIL" texto="Un prototipo que funciona" sub="todavía no está estandarizado" tl={tl} at={0} tam={56} />
      </g>
      <Polvo n={40} t={tl} seed={252} o={0.5} />
    </g>;
  },
};

/* ---------- qué plásticos aguantan el calor ---------- */
function Codigo({ x, y, n, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -34 L 30 18 L -30 18 Z" fill="none" stroke="#fff" strokeWidth={5} strokeLinejoin="round" />
    <path d="M 18 -6 l 8 -2 l -2 8" stroke="#fff" strokeWidth={4} fill="none" />
    <text x={0} y={10} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={24} fill="#fff">{n}</text>
  </g>;
}
ILUSC.plasticos = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const calor = cpr(p, 0.15, 0.6);
    const items = [['PP', 5, true, 'aguanta'], ['PET', 1, false, 'se deforma'], ['PS', 6, false, 'se deforma']];
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#1a1416" /><Halo x={960} y={1000} r={900} color={mix('#ffb36b', '#ff5a2a', calor)} o={0.35 + 0.35 * calor} /></g>
      <g transform={capa(1)}>
        {items.map(([nom, cod, ok, txt], i) => { const x = 460 + i * 500, def = ok ? 0 : calor;
          return <g key={i} transform={`translate(${x} 800)`}>
            <Sombra x={0} y={6} rx={170} ry={18} o={0.5} />
            {/* el recipiente: el que no aguanta se encoge y se arruga */}
            <g transform={`scale(${1 - 0.18 * def} ${1 - 0.35 * def}) skewX(${def * 10})`}>
              <path d={`M -140 0 L -150 -300 Q ${-60 + def * 40} ${-300 + def * 60} 0 -300 Q ${60 - def * 30} ${-300 - def * 30} 150 -300 L 140 0 Z`} fill={ok ? '#e8eef0' : '#dff1f5'} opacity={ok ? 0.85 : 0.55} />
              <path d={`M -140 0 L -150 -300 Q ${-60 + def * 40} ${-300 + def * 60} 0 -300 Q ${60 - def * 30} ${-300 - def * 30} 150 -300 L 140 0 Z`} fill="url(#c-vidrio)" />
              {def > 0.2 && [0, 1, 2].map((k) => <path key={k} d={`M ${-110 + k * 90} ${-280} q ${20 * def} 120 ${-10 * def} 260`} stroke="#9fb8c0" strokeWidth={4} fill="none" opacity={def} />)}
              <rect x={-150} y={-330} width={300} height={34} rx={8} fill={ok ? '#f4c23a' : '#e64a5a'} opacity={0.9} />
            </g>
            <Codigo x={0} y={-140} n={cod} s={1.4} />
            <text x={0} y={90} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={64} fill="#fff">{nom}</text>
            <g opacity={cpr(p, 0.55 + i * 0.06, 0.62 + i * 0.06)}>
              <circle cx={110} cy={-360} r={40} fill={ok ? '#2fbf5a' : '#e23b3b'} />
              <path d={ok ? 'M 92 -360 L 106 -344 L 132 -376' : 'M 94 -376 L 126 -344 M 126 -376 L 94 -344'} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" />
              <text x={0} y={140} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={38} fill={ok ? '#9ff0b8' : '#ffb0a8'}>{txt}</text>
            </g>
          </g>; })}
        {/* ondas de calor */}
        {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M ${200 + k * 220} 1000 q 20 -40 0 -80 q -20 -40 0 -80`} stroke="#ffb36b" strokeWidth={5} fill="none" opacity={0.35 * calor * (0.5 + 0.5 * Math.sin(tl * 4 + k))} filter="url(#c-b2)" />)}
      </g>
      <Polvo n={30} t={tl} seed={261} o={0.4} color="#ffd0a0" />
      <Rotulo x={120} y={190} arriba="SIN FRASCOS DE VIDRIO" texto="¿Qué plástico aguanta el calor?" tl={tl} at={0.3} tam={56} />
    </g>;
  },
};

Object.assign(window, { OllaExpres, CajaAire, Codigo });
