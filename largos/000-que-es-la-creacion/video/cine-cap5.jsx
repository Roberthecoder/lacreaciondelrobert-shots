// cine-cap5.jsx — capítulos 5 a 7: bolsa de agar, tóxicos del aserrín, deportes, salsa, los que brillan, el PDA, Fungi Mati y la granjita.
const ILUSC = window.ILUSC;

/* ---------- mi primera bolsa de agar ---------- */
ILUSC.agar_bolsa = {
  cam: { z0: 1.0, z1: 1.1, fx: 960, fy: 540 },
  dibuja: ({ p, tl, capa }) => {
    const cae = cpr(p, 0.25, 0.7);
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#2a1a24" /><Halo x={760} y={240} r={760} color="#ffd6e6" o={0.45} /><Bokeh n={14} t={tl} seed={271} colores={['#ffb3cc', '#fff0f4']} o={0.35} /></g>
      <g transform={capa(1)}>
        <rect x={-200} y={820} width={2320} height={400} fill="url(#c-madera-clara)" /><rect x={-200} y={820} width={2320} height={400} fill="#000" opacity={0.3} />
        {/* bolsa metalizada con ventana */}
        <g transform="translate(1040 860) rotate(-4) scale(0.85)">
          <Sombra x={20} y={4} rx={300} ry={24} o={0.55} />
          <path d="M -250 0 L -270 -600 Q -260 -640 -220 -640 L 220 -640 Q 260 -640 270 -600 L 250 0 Z" fill="#c9ccd2" /><path d="M -250 0 L -270 -600 Q -260 -640 -220 -640 L 220 -640 Q 260 -640 270 -600 L 250 0 Z" fill="url(#c-acero)" opacity={0.7} />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-270} y={-630 + k * 6} width={540} height={2} fill="#000" opacity={0.2} />)}
          <rect x={-210} y={-520} width={420} height={150} rx={8} fill="#f6f1e4" />
          <text x={0} y={-454} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={800} fontSize={70} fill="#c0265a">AGAR-AGAR</text>
          <text x={0} y={-400} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={6} fill="#333">GRADO ALIMENTICIO</text>
          <rect x={-160} y={-330} width={320} height={260} rx={14} fill="#f9f8f4" /><rect x={-160} y={-330} width={320} height={260} rx={14} fill="url(#c-papel-a)" />
          <rect x={-160} y={-330} width={320} height={110} rx={14} fill="#dfe3e8" opacity={0.6} />
          <rect x={-160} y={-330} width={320} height={260} rx={14} fill="url(#c-vidrio)" />
          <path d="M -230 -580 L -220 -60" stroke="#fff" strokeWidth={14} opacity={0.35} strokeLinecap="round" />
        </g>
        {/* cuchara con polvo y montoncito */}
        <g transform={`translate(${lerp(1400, 1310, cae)} ${lerp(600, 680, cae)}) rotate(${lerp(-10, 20, cae)})`}>
          <rect x={0} y={-14} width={300} height={28} rx={14} fill="url(#c-acero)" /><ellipse cx={-50} cy={0} rx={80} ry={50} fill="url(#c-acero)" /><ellipse cx={-50} cy={-10} rx={64} ry={34} fill="#f6f4ee" />
        </g>
        {Array.from({ length: 50 }, (_, k) => { const r = R(2700 + k), q = ((tl * 0.6 + r()) % 1); return cae > 0 && cae < 1 && <circle key={k} cx={1170 + (r() - 0.5) * 50} cy={720 + q * 120} r={1.5 + r() * 2} fill="#fff" opacity={0.8} />; })}
        <path d={`M 1050 830 Q 1170 ${830 - 60 * cae} 1290 830 Z`} fill="#f6f4ee" /><path d={`M 1050 830 Q 1170 ${830 - 60 * cae} 1290 830 Z`} fill="url(#c-esfera)" opacity={0.3} />
        {/* frasco con agar ya gelificado */}
        <Frasco id="agarf" x={1560} y={830} w={200} h={260} contenido={null} tapa="oro" seed={70} interior={<rect x={1460} y={680} width={200} height={160} fill="#f1e4b8" opacity={0.75} />} />
      </g>
      <Polvo n={40} t={tl} seed={272} o={0.5} />
      <Rotulo x={120} y={190} arriba="POR FIN" texto="Mi primera bolsa de agar" sub="ha rendido tanto que todavía la tengo" tl={tl} at={0.3} tam={58} acento="#ff9cc4" />
    </g>;
  },
};

/* ---------- los tóxicos que puede traer el aserrín ---------- */
ILUSC.toxicos = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const tox = [
      ['MADERA TRATADA', 'conservadores', '#5fa84a', 380, 380],
      ['PINTURAS', '', '#e64a5a', 1540, 380],
      ['BARNICES', '', '#d99a2a', 300, 700],
      ['AGLOMERADO', 'pegamentos', '#b08a5a', 1620, 700],
    ];
    const absorbe = cpr(p, 0.4, 0.62), carton = cpr(p, 0.76, 0.84), sale = cpr(p, 0.7, 0.76);
    const pila = Array.from({ length: 70 }, (_, k) => { const r = R(2800 + k), a = r() * 6.28, d = Math.sqrt(r()) * 300; return [960 + Math.cos(a) * d * 1.3, 760 + Math.sin(a) * d * 0.3 - (300 - d) * 0.5, r()]; });
    return <g>
      <g transform={capa(0.4)}><rect x={-200} y={-200} width={2320} height={1500} fill="#1d1416" /><Halo x={960} y={420} r={800} color="#ff8a6a" o={0.25 + 0.15 * Math.sin(tl * 2)} /></g>
      <g transform={capa(1)}>
        {/* pila de aserrín con partículas peligrosas */}
        <path d="M 520 860 Q 960 380 1400 860 Z" fill="url(#c-aserrin)" /><path d="M 520 860 Q 960 380 1400 860 Z" fill="url(#c-esfera)" opacity={0.35} />
        {pila.map(([x, y, v], k) => { const t4 = tox[k % 4]; return <g key={k} opacity={cpop(p, 0.06 + (k % 4) * 0.06)}>
          {k % 4 === 0 && <rect x={x} y={y} width={22} height={8} rx={2} fill={t4[2]} transform={`rotate(${v * 180} ${x} ${y})`} />}
          {k % 4 === 1 && <path d={`M ${x} ${y} l 12 -6 l 6 10 l -10 6 Z`} fill={t4[2]} />}
          {k % 4 === 2 && <ellipse cx={x} cy={y} rx={7} ry={5} fill={t4[2]} opacity={0.9} />}
          {k % 4 === 3 && <rect x={x} y={y} width={14} height={14} fill={t4[2]} stroke="#6a4a2a" strokeWidth={2} transform={`rotate(${v * 90} ${x} ${y})`} />}
        </g>; })}
        {/* setas creciendo encima, absorbiendo */}
        <g transform="translate(960 636)">
          <Racimo x={0} y={0} n={8} tam={210} color={mix('#ece2cc', '#c9b090', absorbe)} g={cpr(p, 0.2, 0.42)} t={tl} seed={81} />
          {absorbe > 0 && [0, 1, 2, 3].map((k) => { const ang = k * 1.57 + 0.7, q = ((tl * 0.5 + k / 4) % 1); return <circle key={k} cx={Math.cos(ang) * 300 * (1 - q)} cy={200 * (1 - q) + Math.sin(ang) * 80 * (1 - q)} r={10} fill={tox[k][2]} opacity={absorbe * Math.sin(q * Math.PI)} />; })}
        </g>
        {/* etiquetas */}
        {tox.map(([n, sub, c, x, y], k) => <g key={k} opacity={cpop(p, 0.08 + k * 0.06)} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.8))' }}>
          <path d={`M ${x} ${y + 20} L ${lerp(x, 960, 0.4)} ${lerp(y + 20, 720, 0.4)}`} stroke={c} strokeWidth={2.5} strokeDasharray="6 6" />
          <circle cx={x} cy={y} r={10} fill={c} />
          <text x={x} y={y - 26} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={4} fill="#fff">{n}</text>
          {sub && <text x={x} y={y + 52} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#fff" opacity={0.85}>{sub}</text>}
        </g>)}
        {/* cartón y papel */}
        <g opacity={carton} transform={`translate(0 ${(1 - carton) * 40})`}>
          <rect x={0} y={0} width={1920} height={1080} fill="#0d0a0b" opacity={0.7} />
          <g transform="translate(700 700) rotate(-6)"><rect x={-220} y={-260} width={440} height={260} fill="#b8915a" /><rect x={-220} y={-260} width={440} height={260} fill="url(#c-papel-a)" /><rect x={-20} y={-260} width={40} height={260} fill="#d9c08a" opacity={0.7} /><text x={0} y={-120} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={40} fill="#3a2a1a" opacity={0.75}>FRÁGIL ↑↑</text></g>
          <g transform="translate(1220 700) rotate(5)"><rect x={-200} y={-280} width={400} height={280} fill="#f3efe6" /><rect x={-200} y={-280} width={400} height={280} fill="url(#c-papel-a)" />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-170} y={-250 + k * 30} width={k === 0 ? 300 : 340} height={k === 0 ? 20 : 8} fill={k === 0 ? '#c0392b' : '#555'} opacity={0.6} />)}</g>
          <text x={960} y={300} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={58} fill="#fff">Lo mismo con varios cartones y papeles</text>
          <text x={960} y={350} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={5} fill="#ff9c8a">TINTAS · BLANQUEADORES · PEGAMENTOS</text>
        </g>
      </g>
      <Polvo n={60} t={tl} seed={281} o={0.7} color="#ffd0b0" />
      <g opacity={1 - sale}><Rotulo x={120} y={190} arriba="ME FRENÓ EN SECO" texto="El aserrín puede traer tóxicos" sub="y los hongos pueden absorberlos" tl={tl} at={0.3} tam={56} acento="#ff7a6a" /></g>
    </g>;
  },
};

/* ---------- atletismo y natación ---------- */
ILUSC.deportes = {
  cam: { z0: 1.0, z1: 1.05, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const L2 = 0.6, B = cpr(p, L2 - 0.02, L2 + 0.04);
    const estornudo = Math.max(0, Math.sin(tl * 1.3)) > 0.97 ? 1 : 0;
    return <g>
      {/* atletismo: pista roja, polen en el aire */}
      <g opacity={1 - B}>
        <g transform={capa(0.3)}>
          <linearGradient id="c-dep-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3f6fa8" /><stop offset="1" stopColor="#d9e6ee" /></linearGradient>
          <rect x={-200} y={-200} width={2320} height={800} fill="url(#c-dep-cielo)" />
          <Desenfoque b={8}>{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={i * 240} cy={460} r={150 + (i % 3) * 40} fill={['#5f8f4a', '#6f9f5a', '#4f7f3a'][i % 3]} />)}<rect x={-200} y={420} width={2320} height={120} fill="#c9c2b0" /></Desenfoque>
        </g>
        <g transform={capa(1)}>
          <rect x={-200} y={540} width={2320} height={700} fill="#b8432e" /><rect x={-200} y={540} width={2320} height={700} fill="url(#c-tierra)" opacity={0.15} />
          {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M -200 ${560 + k * 100 + k * k * 8} L 2120 ${560 + k * 100 + k * k * 8}`} stroke="#f6efe0" strokeWidth={4 + k} />)}
          {Array.from({ length: 6 }, (_, k) => <text key={'n' + k} x={1700} y={620 + k * 108 + k * k * 8} fontFamily={FUENTE.texto} fontWeight={900} fontSize={40 + k * 6} fill="#f6efe0" opacity={0.8}>{k + 1}</text>)}
          <g transform={`translate(${lerp(500, 1300, cpr(p, 0, L2 - 0.05))} ${-Math.abs(Math.sin(tl * 9)) * 18})`}>
            <Nene x={0} y={900} s={1.3} edad={16} t={tl * 2} lentes playera="#2a6a9a" rayas={false} pantalon="#222" brazoD={30 * Math.sin(tl * 9)} brazoI={-30 * Math.sin(tl * 9)} mira={[1, 0]} boca={estornudo ? 'ay' : 'o'} seed={16} />
            {estornudo > 0 && <g>{Array.from({ length: 12 }, (_, k) => <circle key={k} cx={80 + k * 14} cy={420 - (k % 3) * 10} r={4} fill="#dff4ff" opacity={0.7} />)}</g>}
          </g>
        </g>
        <Polvo n={90} t={tl} seed={291} o={0.9} color="#f6e27a" tam={1.3} />
        <Rotulo x={120} y={190} arriba="ATLETISMO · 4 SEMESTRES" texto="Las alergias me sacaban de combate" tl={tl} at={0.3} tam={52} />
      </g>
      {/* natación: vista cenital, entraba en un carril y salía por otro */}
      <g opacity={B}>
        <rect x={0} y={0} width={1920} height={1080} fill="#1a8fb8" />
        <rect x={0} y={0} width={1920} height={1080} fill="url(#c-papel-a)" opacity={0.2} />
        {Array.from({ length: 40 }, (_, k) => { const r = R(2900 + k); return <path key={k} d={`M ${r() * 1920} ${r() * 1080} q 40 ${-20 + 10 * Math.sin(tl * 2 + k)} 80 0 q 40 20 80 0`} stroke="#bff0ff" strokeWidth={3} fill="none" opacity={0.35} />; })}
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={0} y={160 + k * 150} width={1920} height={14} fill="#123e66" opacity={0.5} />)}
        {Array.from({ length: 5 }, (_, k) => <g key={'c' + k}>{Array.from({ length: 48 }, (_, j) => <circle key={j} cx={j * 40 + 20} cy={235 + k * 150} r={9} fill={j % 6 < 3 ? '#e64a5a' : '#f6f6f6'} />)}</g>)}
        {/* el nadador que se cruza de carril */}
        {(() => { const q = cpr(p, L2, 1), x = lerp(100, 1820, q), y = 310 + Math.sin(q * Math.PI * 1.3) * 300; const ang = Math.atan2(Math.cos(q * Math.PI * 1.3) * 300 * 1.3 * Math.PI, 1720) * 180 / Math.PI;
          return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
            {Array.from({ length: 10 }, (_, k) => <ellipse key={k} cx={-60 - k * 40} cy={0} rx={30 + k * 4} ry={14 + k * 2} fill="#fff" opacity={0.3 - k * 0.025} />)}
            <ellipse cx={0} cy={0} rx={70} ry={26} fill="#b77a52" /><circle cx={60} cy={0} r={26} fill="#c0392b" /><rect x={66} y={-22} width={18} height={44} rx={6} fill="#2a2a30" opacity={0.8} />
            <path d={`M 20 -20 Q 60 ${-70 * Math.sin(tl * 6)} 110 -30`} stroke="#b77a52" strokeWidth={16} fill="none" strokeLinecap="round" /><path d={`M 20 20 Q 60 ${70 * Math.sin(tl * 6)} 110 30`} stroke="#b77a52" strokeWidth={16} fill="none" strokeLinecap="round" />
          </g>; })()}
        <Rotulo x={120} y={110 + 80} arriba="NATACIÓN · SEXTO SEMESTRE" texto="Entraba en un carril y salía por otro" tl={tl} at={L2 * 15} tam={52} />
      </g>
    </g>;
  },
};

/* ---------- salsa: dos pies izquierdos… cada vez menos ---------- */
ILUSC.salsa = {
  cam: { z0: 1.0, z1: 1.07, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const beat = Math.floor(tl * 3.2) % 8, mejora = cpr(p, 0.3, 0.95);
    const huellas = [[0, 0, 'I'], [1, -1, 'D'], [0, 0, 'I'], [0, 0, 'D'], [0, 0, 'D'], [-1, 1, 'I'], [0, 0, 'D'], [0, 0, 'I']];
    return <g>
      <g transform={capa(0.4)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#2a1820" />
        {/* espejo del salón y luces cálidas */}
        <rect x={-200} y={120} width={2320} height={560} fill="#3a2a30" /><rect x={-200} y={120} width={2320} height={560} fill="url(#c-vidrio)" opacity={0.5} />
        {Array.from({ length: 5 }, (_, k) => <rect key={k} x={-200 + k * 480} y={120} width={8} height={560} fill="#1a1014" />)}
        <Bokeh n={18} t={tl} seed={301} colores={['#ffb36b', '#ff7a9a', '#ffd38a']} o={0.6} y={60} h={300} />
        <rect x={-200} y={680} width={2320} height={20} fill="#1a1014" />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={690} width={2320} height={600} fill="url(#c-madera-clara)" /><rect x={-200} y={690} width={2320} height={600} fill="#000" opacity={0.3} />
        {/* diagrama de pasos en el piso */}
        {huellas.map(([dx, dy, pie], k) => { const ok = (k < 4 ? pie === (k % 2 ? 'D' : 'I') : pie === (k % 2 ? 'I' : 'D')), activo = k === beat, err = !ok && mejora < k / 8;
          return <g key={k} transform={`translate(${520 + k * 120 + dx * 20} ${900 + dy * 20 + (k % 2) * 40})`} opacity={0.35 + 0.65 * (activo ? 1 : 0)}>
            <ellipse cx={0} cy={0} rx={22} ry={44} fill={err ? '#ff5a5a' : '#fff'} opacity={0.85} /><circle cx={0} cy={-56} r={10} fill={err ? '#ff5a5a' : '#fff'} opacity={0.85} />
            <text x={0} y={80} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} fill="#fff">{[1, 2, 3, '', 5, 6, 7, ''][k]}</text>
          </g>; })}
        {/* la pareja bailando */}
        <g transform={`translate(${780 + Math.sin(tl * 3.2 * Math.PI / 2) * 30} 0)`}>
          <Nene x={0} y={880} s={1.25} edad={19} t={tl * 2} lentes playera="#2a2a30" rayas={false} pantalon="#1d1d22" brazoD={72 + 8 * Math.sin(tl * 6)} brazoI={18} mira={[0.6, 0.6]} boca={mejora > 0.5 ? 'risa' : 'sonrisa'} seed={17} />
        </g>
        <g transform={`translate(${1150 - Math.sin(tl * 3.2 * Math.PI / 2) * 30} 0) rotate(${Math.sin(tl * 3) * 4} 0 880)`}>
          <Adulto x={0} y={880} s={0.82} mujer camisa="#c0265a" pantalon="#1d1d22" brazoI={72 + 8 * Math.sin(tl * 6)} brazoD={20} mira={[-1, 0.2]} boca="sonrisa" t={tl} seed={27} />
        </g>
        {Array.from({ length: 6 }, (_, k) => { const q = ((tl * 0.3 + k / 6) % 1); return <text key={k} x={300 + k * 260} y={600 - q * 300} fontFamily="serif" fontSize={56} fill="#ffd38a" opacity={Math.sin(q * Math.PI) * 0.7}>{k % 2 ? '♪' : '♫'}</text>; })}
      </g>
      <Polvo n={60} t={tl} seed={302} o={0.7} color="#ffd8b0" />
      <Tinte color="#ff7a5a" o={0.12} />
      <Rotulo x={120} y={190} arriba="EN LA UNIVERSIDAD" texto="Salsa cubana" sub="dos pies izquierdos… cada vez menos" tl={tl} at={0.3} tam={64} acento="#ff9cc4" />
    </g>;
  },
};

/* ---------- el hongo y la bacteria brillando junto a mi cama ---------- */
ILUSC.brillan = {
  cam: { z0: 1.12, z1: 1.0, fx: 1060, fy: 560, fondo: '#04060c' },
  dibuja: ({ p, tl, capa }) => {
    const pul = 0.75 + 0.25 * Math.sin(tl * 1.4), ojos = cpr(p, 0, 0.3);
    return <g>
      <g transform={capa(0.5)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#04060c" />
        <rect x={1380} y={120} width={380} height={300} fill="#0a1020" /><circle cx={1660} cy={190} r={26} fill="#cfd8e8" opacity={0.6} />
        <rect x={1380} y={120} width={380} height={300} fill="none" stroke="#1a2236" strokeWidth={12} />
        {/* cama */}
        <rect x={-200} y={640} width={900} height={300} rx={20} fill="#0e1424" /><rect x={-200} y={600} width={420} height={90} rx={40} fill="#141c30" />
      </g>
      <g transform={capa(1)}>
        {/* buró */}
        <rect x={760} y={760} width={600} height={30} fill="#141018" /><rect x={780} y={790} width={560} height={300} fill="#0c0a0e" />
        {/* Panellus stipticus en una rama dentro de un frasco: brillo verde */}
        <g transform="translate(900 760)">
          <Halo x={0} y={-180} r={460} color="#7dff7a" o={0.85 * pul * ojos} />
          <Frasco id="pan" x={0} y={0} w={260} h={360} contenido={null} abierto ventana={false} sombra={false}
            interior={<g><rect x={-160} y={-240} width={300} height={44} rx={20} fill="#2a1a10" transform="rotate(-24 0 -220)" />
              {Array.from({ length: 14 }, (_, k) => { const r = R(3100 + k); return <g key={k} transform={`translate(${-100 + k * 15} ${-170 - k * 7 + r() * 20}) rotate(${-24 + r() * 20})`}>
                <path d="M 0 0 Q 24 -16 30 6 Q 16 18 0 0 Z" fill={mix('#3a5a2a', '#b8ff9a', pul * ojos)} /><path d="M 0 0 Q 24 -16 30 6 Q 16 18 0 0 Z" fill="#9fff8a" opacity={0.5 * pul * ojos} filter="url(#c-b2)" /></g>; })}</g>} />
          <text x={0} y={70} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#9fff8a" opacity={ojos}>Panellus stipticus</text>
        </g>
        {/* Aliivibrio fischeri en un matraz con agua salada: brillo azul verdoso */}
        <g transform="translate(1220 760)">
          <Halo x={0} y={-120} r={420} color="#5fd8ff" o={0.85 * (0.75 + 0.25 * Math.sin(tl * 1.1 + 1)) * ojos} />
          <path d="M -30 -300 L -30 -200 L -130 -20 Q -140 0 -110 0 L 110 0 Q 140 0 130 -20 L 30 -200 L 30 -300 Z" fill="#0a1a24" opacity={0.6} />
          <path d="M -90 -80 L -130 -20 Q -140 0 -110 0 L 110 0 Q 140 0 130 -20 L 90 -80 Z" fill={mix('#0a2a3a', '#7fe8ff', (0.75 + 0.25 * Math.sin(tl * 1.1 + 1)) * ojos)} />
          <path d="M -90 -80 L -130 -20 Q -140 0 -110 0 L 110 0 Q 140 0 130 -20 L 90 -80 Z" fill="#aef2ff" opacity={0.4 * ojos} filter="url(#c-b8)" />
          <path d="M -30 -300 L -30 -200 L -130 -20 Q -140 0 -110 0 L 110 0 Q 140 0 130 -20 L 30 -200 L 30 -300 Z" fill="none" stroke="#9fdfff" strokeOpacity={0.35} strokeWidth={3} />
          <rect x={-36} y={-330} width={72} height={34} rx={6} fill="#e9e1cf" opacity={0.3} />
          <text x={0} y={70} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={30} fill="#9fe8ff" opacity={ojos}>Aliivibrio fischeri</text>
        </g>
      </g>
      <Polvo n={50} t={tl} seed={311} o={0.5 * ojos} color="#b8ffd0" />
      <Rotulo x={120} y={190} arriba="BIOLUMINISCENCIA" texto="Brillando junto a mi cama" tl={tl} at={0.4} tam={60} acento="#9fff8a" />
    </g>;
  },
};

/* ---------- el primer PDA (agar papa dextrosa) ---------- */
ILUSC.pda = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const abre = cpr(p, 0.08, 0.3, kEase.suave), vierte = cpr(p, 0.45, 0.85);
    return <g>
      <g transform={capa(0.4)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#1d2420" />
        <Bokeh n={22} t={tl} seed={321} colores={['#ffd38a', '#ff9a6a', '#fff1c9', '#9ff0c8']} o={0.6} r0={16} r1={60} y={0} h={500} />
        <Halo x={960} y={300} r={800} color="#ffe2b0" o={0.35} />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={820} width={2320} height={400} fill="url(#c-madera-media)" /><rect x={-200} y={820} width={2320} height={400} fill="#000" opacity={0.3} />
        {/* caja de regalo abierta */}
        <g transform="translate(700 830)">
          <Sombra x={0} y={4} rx={280} ry={22} o={0.55} />
          <rect x={-240} y={-260} width={480} height={260} fill="#14a37c" /><rect x={-240} y={-260} width={480} height={260} fill="url(#c-arriba)" />
          <rect x={-24} y={-260} width={48} height={260} fill="#F4C25A" />
          <g transform={`translate(-260 -260) rotate(${-abre * 70})`}><rect x={0} y={-50} width={520} height={50} fill="#17b88c" /><rect x={236} y={-50} width={48} height={50} fill="#F4C25A" /></g>
          {/* el frasco de PDA deshidratado sale de la caja */}
          <g transform={`translate(0 ${lerp(-60, -330, abre)})`}>
            <rect x={-90} y={-220} width={180} height={220} rx={16} fill="#3a2a1a" opacity={0.9} /><rect x={-90} y={-220} width={180} height={220} rx={16} fill="url(#c-cilindro)" />
            <rect x={-80} y={-260} width={160} height={46} rx={6} fill="#f6f6f6" />
            <rect x={-86} y={-172} width={172} height={124} rx={4} fill="#f6f1e4" />
            <text x={0} y={-130} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={42} fill="#c0392b">PDA</text>
            <text x={0} y={-100} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={14} fill="#333">Potato Dextrose Agar</text>
            <text x={0} y={-74} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={9.5} letterSpacing={0.5} fill="#333">GRADO MICROBIOLÓGICO</text>
          </g>
        </g>
        {/* cajas Petri que se llenan de PDA */}
        {[0, 1, 2, 3].map((k) => { const e = kclamp(vierte * 4 - k, 0, 1); return <g key={k} transform={`translate(${1060 + (k % 2) * 330} ${560 + Math.floor(k / 2) * 230})`}>
          <Petri x={0} y={0} r={140} id={`pda${k}`} medio="#e8c27a" inclina={0.45}><ellipse cx={0} cy={0} rx={140 * e} ry={140 * e} fill="#e8c27a" opacity={0} /></Petri>
          <ellipse cx={0} cy={4} rx={136} ry={60} fill="#e9dcc0" opacity={0.85 * (1 - e)} />
        </g>; })}
        <g opacity={cpr(p, 0.5, 0.56)}><path d="M 1240 470 L 1340 380" stroke="#fff" strokeWidth={2.5} /><text x={1350} y={370} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#fff">agar papa dextrosa</text><text x={1350} y={406} fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} letterSpacing={4} fill="#F4C25A">EL MEDIO CLÁSICO PARA HONGOS</text></g>
      </g>
      <Polvo n={40} t={tl} seed={322} o={0.5} />
      <Rotulo x={120} y={190} arriba="DICIEMBRE DE 2025 · CUMPLEAÑOS" texto="Mi primer PDA" tl={tl} at={0.3} tam={64} acento="#7ff0c8" />
    </g>;
  },
};

/* ---------- Fungi Mati: el nombre ---------- */
ILUSC.fungimati = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const tacha = cpr(p, 0.12, 0.26), nombre = cpr(p, 0.28, 0.42), fungi = cpr(p, 0.48, 0.58), mati = cpr(p, 0.62, 0.74);
    return <g>
      <g transform={capa(0.5)}><rect x={-200} y={-200} width={2320} height={1500} fill="url(#c-madera-oscura)" /><rect x={-200} y={-200} width={2320} height={1500} fill="#000" opacity={0.35} /><Halo x={800} y={300} r={800} color="#ffe2b0" o={0.4} /></g>
      <g transform={capa(1)}>
        {/* cuaderno abierto */}
        <g transform="translate(960 600) rotate(-2) scale(0.86)">
          <rect x={-760} y={-380} width={1520} height={800} fill="#000" opacity={0.45} filter="url(#c-b24)" transform="translate(16 20)" />
          <rect x={-760} y={-380} width={760} height={800} fill="#f4efe2" /><rect x={0} y={-380} width={760} height={800} fill="#f6f1e4" />
          <rect x={-760} y={-380} width={1520} height={800} fill="url(#c-papel-a)" />
          <rect x={-30} y={-380} width={60} height={800} fill="#000" opacity={0.12} filter="url(#c-b8)" />
          {Array.from({ length: 22 }, (_, k) => <rect key={k} x={-740} y={-330 + k * 34} width={1480} height={1.5} fill="#8fb0d0" opacity={0.5} />)}
          <rect x={-660} y={-380} width={2} height={800} fill="#e08080" opacity={0.6} />
          {/* el nombre larguísimo, escrito y tachado */}
          {['De basura a comida,', 'los hongos: héroes que combaten', 'el hambre y la pobreza'].map((l, k) => <g key={k}>
            <text x={-640} y={-282 + k * 68} fontFamily={FUENTE.mano} fontWeight={700} fontSize={46} fill="#2a3a6a">{l}</text>
            <path d={`M -646 ${-296 + k * 68} L ${lerp(-646, -646 + l.length * 21, tacha)} ${-300 + k * 68}`} stroke="#c0392b" strokeWidth={7} strokeLinecap="round" />
          </g>)}
          <text x={-620} y={-60} fontFamily={FUENTE.mano} fontWeight={700} fontSize={44} fill="#c0392b" opacity={tacha}>larguísimo…</text>
          {/* el nombre nuevo */}
          <g opacity={nombre}>
            <text x={380} y={-120} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={150} fill="#1d2a1a">Fungi Mati</text>
            <path d={`M 120 -90 Q 380 ${-70} ${lerp(120, 640, nombre)} -96`} stroke="#14a37c" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
          <g opacity={fungi}><text x={150} y={40} fontFamily={FUENTE.serif} fontWeight={700} fontSize={56} fill="#1d2a1a">Fungi</text>
            <text x={150} y={84} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#3a4a3a">hongo (latín)</text>
            <Racimo x={560} y={70} n={5} tam={70} color="#ef7fa6" g={fungi} t={tl} seed={91} /></g>
          <g opacity={mati}><text x={150} y={190} fontFamily={FUENTE.serif} fontWeight={700} fontSize={56} fill="#1d2a1a">mati</text>
            <text x={150} y={234} fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#3a4a3a">náhuatl: saber, conocer, entender</text></g>
        </g>
        {/* pluma */}
        <g transform={`translate(${lerp(500, 1500, nombre)} ${lerp(300, 420, nombre)}) rotate(-35)`}><rect x={0} y={-10} width={300} height={20} rx={10} fill="#1d1d22" /><path d="M 0 -10 L -40 0 L 0 10 Z" fill="url(#c-laton)" /><rect x={200} y={-12} width={40} height={24} fill="url(#c-laton)" /></g>
      </g>
      <Polvo n={40} t={tl} seed={331} o={0.5} />
      <Rotulo x={120} y={110 + 30} arriba="FEBRERO DE 2026" texto="Un nombre corto" tl={tl} at={0.3} tam={52} acento="#7ff0c8" />
    </g>;
  },
};

/* ---------- la granjita: residuos → comida ---------- */
ILUSC.granjita = {
  cam: { z0: 1.06, z1: 1.0, fx: 960, fy: 520, x0: 30, x1: -30 },
  dibuja: ({ p, tl, capa }) => {
    const g = cpr(p, 0.15, 0.8);
    return <g>
      <g transform={capa(0.45)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#1a201c" />
        <rect x={-200} y={-200} width={2320} height={1500} fill="url(#c-papel-a)" opacity={0.25} />
        {/* tubos LED */}
        {[0, 1, 2].map((k) => <g key={k}><rect x={200 + k * 560} y={60} width={420} height={16} rx={8} fill="#f6fbff" /><Halo x={410 + k * 560} y={70} r={260} color="#e8f6ff" o={0.45} /></g>)}
        {/* bolsas colgadas al fondo, fuera de foco */}
        <Desenfoque b={8}>{Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(${-100 + k * 230} 140)`}><path d="M 0 0 L 0 80" stroke="#888" strokeWidth={3} /><rect x={-60} y={80} width={120} height={360} rx={30} fill="#e9e2cf" /><Racimo x={0} y={300} n={5} tam={60} color="#ece2cc" g={0.9} t={tl} seed={k + 100} /></g>)}</Desenfoque>
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={900} width={2320} height={400} fill="#5a5a5e" /><rect x={-200} y={900} width={2320} height={400} fill="url(#c-papel-a)" />
        {/* estantes con bolsas y setas */}
        {[0, 1].map((r) => <g key={r} transform="translate(250 0)">
          <rect x={160} y={480 + r * 300} width={1300} height={14} fill="url(#c-acero)" />
          {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${260 + k * 260} ${480 + r * 300})`}>
            <BolsaCultivo x={0} y={0} w={170} h={220} colonizado={0.9} tex={r ? 'tierra' : 'aserrin'}>
              <Racimo x={(k % 2 ? 30 : -30)} y={-150} n={6} tam={105} color={['#ef7fa6', '#ece2cc', '#9aa6b8', '#f4d06a', '#ece2cc'][k]} g={kclamp(g * 1.3 - k * 0.08 - r * 0.1, 0, 1)} t={tl} seed={k * 7 + r + 120} />
            </BolsaCultivo>
          </g>)}
        </g>)}
        {[410, 1710].map((x, i) => <rect key={i} x={x} y={400} width={14} height={520} fill="url(#c-acero)" />)}
        {/* humidificador con niebla */}
        <g transform="translate(1850 900)"><rect x={-80} y={-200} width={160} height={200} rx={24} fill="#f0f2f4" /><rect x={-80} y={-200} width={160} height={200} rx={24} fill="url(#c-cilindro)" /><rect x={-20} y={-230} width={40} height={36} rx={8} fill="#dfe3e8" />
          {Array.from({ length: 8 }, (_, k) => { const q = ((tl * 0.25 + k / 8) % 1); return <circle key={k} cx={-200 * q + Math.sin(tl + k) * 30} cy={-240 - q * 260} r={40 + q * 120} fill="#fff" opacity={0.18 * Math.sin(q * Math.PI)} filter="url(#c-b14)" />; })}</g>
        {/* higrómetro */}
        <g transform="translate(1780 300)"><rect x={-90} y={-60} width={180} height={120} rx={12} fill="#1d1d22" /><rect x={-76} y={-46} width={152} height={92} rx={6} fill="#bfe8c8" />
          <text x={0} y={-6} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={34} fill="#1d2a1a">{Math.round(lerp(78, 90, g))}%</text><text x={0} y={30} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} fill="#1d2a1a">HUMEDAD</text></g>
        {/* residuos que entran → comida que sale */}
        <g opacity={cpr(p, 0.55, 0.65)}>
          <g transform="translate(300 1000)"><Huacal x={0} y={0} w={220} h={110}><rect x={-100} y={-90} width={200} height={70} fill="#3a2416" /></Huacal><text x={0} y={-130} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} letterSpacing={3} fill="#fff">RESIDUOS</text></g>
          <path d="M 440 960 L 760 960" stroke="#fff" strokeWidth={4} strokeDasharray="12 10" /><path d="M 748 948 L 764 960 L 748 972" stroke="#fff" strokeWidth={4} fill="none" />
          <g transform="translate(900 990)"><ellipse cx={0} cy={0} rx={130} ry={36} fill="#f6f2ea" /><Racimo x={0} y={-6} n={6} tam={60} color="#d9b886" g={1} t={tl} seed={131} /><text x={0} y={-110} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} letterSpacing={3} fill="#fff">COMIDA</text></g>
        </g>
      </g>
      <Polvo n={60} t={tl} seed={341} o={0.6} color="#e8f6ff" />
      <Tinte color="#bfe8ff" o={0.08} />
      <Rotulo x={120} y={190} arriba="CON EL PREMIO" texto="Mi granjita" sub="residuos → comida" tl={tl} at={0.3} tam={66} acento="#ffbe7a" />
    </g>;
  },
};
