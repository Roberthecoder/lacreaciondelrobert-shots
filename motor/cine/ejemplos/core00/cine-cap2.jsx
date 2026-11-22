// cine-cap2.jsx — capítulo 2 (Primaria): caminos, la tablet, las monedas, el tianguis, el jardín vertical y el periódico.
const ILUSC = window.ILUSC;

/* ---------- varios caminos a la vez ---------- */
ILUSC.caminos = {
  cam: { z0: 1.0, z1: 1.14, fx: 960, fy: 520, y0: 20, y1: -20 },
  dibuja: ({ p, tl, capa }) => {
    const ramas = [['Plantas', '#8fd36a', -640], ['Concursos', '#7fc4ff', 0], ['Monedas', '#f4c25a', 640]];
    return <g>
      <g transform={capa(0.15)}>
        <linearGradient id="c-cam-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3d5f96" /><stop offset=".6" stopColor="#f2b77a" /><stop offset="1" stopColor="#ffd9a0" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={900} fill="url(#c-cam-cielo)" />
        <Halo x={960} y={470} r={420} color="#ffe2a8" o={0.95} />
        {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={200 + i * 520 + Math.sin(tl * 0.1 + i) * 20} cy={140 + (i % 2) * 70} rx={260} ry={32} fill="#ffd2a0" opacity={0.45} filter="url(#c-b14)" />)}
        <Desenfoque b={4}><path d="M -200 520 Q 200 440 500 500 Q 800 430 1100 490 Q 1450 420 1750 500 Q 1950 470 2120 500 L 2120 640 L -200 640 Z" fill="#7d6f8f" opacity={0.85} /></Desenfoque>
      </g>
      <g transform={capa(0.6)}>
        <rect x={-200} y={500} width={2320} height={700} fill="#b49a4a" />
        <linearGradient id="c-cam-campo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d9b86a" /><stop offset="1" stopColor="#6f7a34" /></linearGradient>
        <rect x={-200} y={500} width={2320} height={700} fill="url(#c-cam-campo)" />
        {Array.from({ length: 160 }, (_, i) => { const r = R(1300 + i), x = -200 + r() * 2320, y = 520 + Math.pow(r(), 1.6) * 560, h = 8 + (y - 500) * 0.06;
          return <path key={i} d={`M ${x} ${y} q ${2 + mece(tl, i, 0.6) * 3} ${-h * 0.6} ${4 + mece(tl, i, 0.6) * 6} ${-h}`} stroke={i % 3 ? '#8f8a3a' : '#c9b25a'} strokeWidth={2 + (y - 500) * 0.004} fill="none" />; })}
        {/* veredas que se abren */}
        {ramas.map(([n, c, dx], i) => { const e = cpr(p, 0.08 + i * 0.1, 0.4 + i * 0.1, kEase.suave);
          const ex = 960 + dx * 0.38, ey = 530;
          return <g key={i}>
            {(() => { const fx2 = lerp(960, ex, e), fy2 = lerp(1000, ey, e), cx2 = 960 + dx * 0.55, cy2 = 800;
              return <g><path d={`M ${960 - 90} 1200 Q ${cx2 - 60} ${cy2} ${fx2 - 5} ${fy2} L ${fx2 + 5} ${fy2} Q ${cx2 + 60} ${cy2} ${960 + 90} 1200 Z`} fill="#e3cc98" opacity={0.95} />
                <path d={`M ${960 - 90} 1200 Q ${cx2 - 60} ${cy2} ${fx2 - 5} ${fy2} L ${fx2 + 5} ${fy2} Q ${cx2 + 60} ${cy2} ${960 + 90} 1200 Z`} fill="url(#c-tierra)" opacity={0.18} />
                <path d={`M 960 1200 Q ${cx2} ${cy2} ${fx2} ${fy2}`} stroke={c} strokeWidth={4} fill="none" strokeDasharray="10 18" opacity={0.75} /></g>; })()}
            <g opacity={cpop(p, 0.3 + i * 0.1)}><circle cx={ex} cy={ey - 24} r={26} fill={c} opacity={0.9} filter="url(#c-b8)" /><circle cx={ex} cy={ey - 24} r={10} fill="#fff" /></g>
          </g>; })}
      </g>
      {/* el letrero de madera y el niño de espaldas, con uniforme y mochila */}
      <g transform={capa(1)}>
        <g transform="translate(1250 860)">
          <rect x={-12} y={-420} width={24} height={430} fill="url(#c-madera-media)" /><rect x={-12} y={-420} width={24} height={430} fill="url(#c-cilindro)" />
          {ramas.map(([n, c, dx], i) => { const lado = dx < 0 ? -1 : 1, e = cpop(p, 0.18 + i * 0.1);
            return <g key={i} transform={`translate(0 ${-390 + i * 70}) rotate(${lado * (4 - i * 2)}) scale(${e} 1)`}>
              <path d={`M 0 -24 L ${lado * 230} -24 L ${lado * 262} 0 L ${lado * 230} 24 L 0 24 Z`} fill="url(#c-madera-clara)" /><path d={`M 0 -24 L ${lado * 230} -24 L ${lado * 262} 0 L ${lado * 230} 24 L 0 24 Z`} fill="url(#c-arriba)" />
              <text x={lado * 120} y={11} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={36} fill={osc(c, 0.55)}>{n}</text>
              <circle cx={lado * 14} cy={0} r={4} fill="#444" />
            </g>; })}
        </g>
        <Nene x={880} y={1060} s={1.05} edad={8} t={tl} espalda mochila="#c0392b" playera="#f4f2ec" rayas={false} pantalon="#1f2b4a" brazoD={6} brazoI={-6} seed={11} />
      </g>
      <Polvo n={70} t={tl} seed={121} o={0.75} color="#ffe9c0" />
      <Tinte color="#ffa24a" o={0.18} />
    </g>;
  },
};

/* ---------- la tablet del concurso y el primer canal ---------- */
ILUSC.tablet = {
  cam: { z0: 1.0, z1: 1.1, fx: 980, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const sale = cpr(p, 0.05, 0.25, kEase.suave), graba = cpr(p, 0.32, 0.36), sube = cpr(p, 0.66, 0.7), prog = cpr(p, 0.72, 0.95);
    const tY = lerp(800, 580, sale);
    const seg = Math.floor(cpr(p, 0.34, 0.66) * 46);
    return <g>
      {/* recámara de noche: lámpara cálida, repisa, ventana con luna */}
      <g transform={capa(0.4)}>
        <Pared color="#3d4a6b" luz={[0.8, 0.2]} />
        <rect x={1280} y={120} width={460} height={380} fill="#16203a" /><circle cx={1600} cy={220} r={50} fill="#f6efd9" /><Halo x={1600} y={220} r={180} color="#cfe0ff" o={0.4} />
        <rect x={1280} y={120} width={460} height={380} fill="none" stroke="#e9e1cf" strokeWidth={14} /><rect x={1503} y={120} width={14} height={380} fill="#e9e1cf" />
        <Tablon x={120} y={300} w={700} prof={18} grosor={18} madera="oscura" />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={150 + i * 46} y={300 - 120 - (i % 2) * 20} width={36} height={120 + (i % 2) * 20} fill={['#b3261e', '#2a5aa8', '#e8a22a', '#3f8a3a', '#7a4fc0', '#d9774a'][i]} />)}
        <g transform="translate(560 300)"><rect x={-60} y={-160} width={120} height={160} fill="#f3ead6" /><rect x={-50} y={-150} width={100} height={110} fill="#c9a067" opacity={0.4} /><text x={0} y={-20} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={18} fill="#333">diploma</text></g>
        <Halo x={300} y={560} r={500} color="#ffcf8a" o={0.55} />
      </g>
      <g transform={capa(0.85)}>
        <rect x={-200} y={760} width={2320} height={500} fill="url(#c-madera-media)" /><rect x={-200} y={760} width={2320} height={500} fill="#000" opacity={0.25} />
        {/* la planta que va a grabar */}
        <MacetaC x={1480} y={800} w={200} h={170}><MataJitomate x={0} y={-150} s={0.95} t={tl} seed={6} frutos={3} /></MacetaC>
        {/* caja de regalo abierta */}
        <g opacity={1 - cpr(p, 0.3, 0.4)}>
          <rect x={420} y={640} width={420} height={160} fill="#f4c23a" /><rect x={420} y={640} width={420} height={160} fill="url(#c-arriba)" />
          <rect x={600} y={640} width={60} height={160} fill="#c0392b" /><path d="M 630 640 q -80 -90 -140 -40 q 60 40 140 40 q 80 -90 140 -40 q -60 40 -140 40" fill="#c0392b" />
          <rect x={400} y={600} width={460} height={44} fill="#f6d35a" transform={`rotate(${-sale * 18} 400 640)`} />
        </g>
      </g>
      {/* la tablet en manos del niño */}
      <g transform={capa(1)}>
        <g transform={`translate(860 ${tY}) rotate(${lerp(-8, -2, sale)})`}>
          <rect x={-330} y={-220} width={660} height={440} rx={34} fill="#18191d" /><rect x={-330} y={-220} width={660} height={440} rx={34} fill="url(#c-arriba)" opacity={0.5} />
          <rect x={-300} y={-192} width={600} height={384} rx={8} fill="#0d0f14" />
          <clipPath id="c-tab-pant"><rect x={-300} y={-192} width={600} height={384} rx={8} /></clipPath>
          <g clipPath="url(#c-tab-pant)">
            {/* pantalla: primero inicio, luego cámara grabando la planta, luego subiendo el video */}
            <g opacity={1 - graba}><rect x={-300} y={-192} width={600} height={384} fill="#2b6fd6" />{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-250 + (i % 4) * 130} y={-150 + Math.floor(i / 4) * 110} width={80} height={80} rx={18} fill={['#f4c23a', '#3fbf4a', '#e6336d', '#fff'][i % 4]} opacity={0.9} />)}</g>
            <g opacity={graba * (1 - sube)}>
              <rect x={-300} y={-192} width={600} height={384} fill="#3d4a6b" />
              <g transform="translate(40 230) scale(1.3)"><MataJitomate x={0} y={-60} s={0.9} t={tl} seed={6} frutos={3} /></g>
              <circle cx={-250} cy={-150} r={12} fill="#ff3b2f" opacity={0.5 + 0.5 * Math.sin(tl * 6)} />
              <text x={-226} y={-140} fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} fill="#fff">REC 00:{String(seg).padStart(2, '0')}</text>
              {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <path key={i} d={`M ${a * 260} ${b * 150 - b * 30} L ${a * 260} ${b * 150} L ${a * 260 - a * 30} ${b * 150}`} stroke="#fff" strokeWidth={4} fill="none" />)}
            </g>
            <g opacity={sube}>
              <rect x={-300} y={-192} width={600} height={384} fill="#f5f5f5" />
              <rect x={-300} y={-192} width={600} height={60} fill="#fff" /><rect x={-280} y={-176} width={44} height={30} rx={8} fill="#e62117" /><path d="M -264 -170 L -248 -161 L -264 -152 Z" fill="#fff" />
              <text x={-222} y={-152} fontFamily={FUENTE.texto} fontWeight={800} fontSize={24} fill="#222">Subir video</text>
              <circle cx={250} cy={-162} r={20} fill="#5b7bd6" /><text x={250} y={-155} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={18} fill="#fff">P</text>
              <rect x={-260} y={-100} width={240} height={140} rx={8} fill="#3d4a6b" /><g transform="translate(-140 40) scale(0.5)"><MataJitomate x={0} y={-60} s={0.9} t={tl} seed={6} frutos={3} /></g>
              <text x={0} y={-70} fontFamily={FUENTE.texto} fontWeight={800} fontSize={24} fill="#222">Mis jitomates</text>
              <text x={0} y={-36} fontFamily={FUENTE.texto} fontSize={20} fill="#666">Cuenta de papá</text>
              <rect x={-260} y={90} width={520} height={16} rx={8} fill="#ddd" /><rect x={-260} y={90} width={520 * prog} height={16} rx={8} fill="#e62117" />
              <text x={0} y={150} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={700} fontSize={22} fill="#444">{prog >= 1 ? 'Publicado' : `Subiendo… ${Math.round(prog * 100)} %`}</text>
            </g>
            <rect x={-300} y={-192} width={600} height={384} fill="url(#c-vidrio)" opacity={0.6} />
            <path d="M -300 -192 L -80 -192 L -300 60 Z" fill="#fff" opacity={0.06} />
          </g>
          <circle cx={0} cy={-206} r={5} fill="#333" />
          {/* manitas: pulgar al frente, dedos detrás */}
          {[-1, 1].map((d) => <g key={d}>
            <path d={`M ${d * 334} -10 Q ${d * 380} 20 ${d * 372} 110 Q ${d * 350} 150 ${d * 318} 130 L ${d * 322} 0 Z`} fill="#b77a52" /><path d={`M ${d * 334} -10 Q ${d * 380} 20 ${d * 372} 110 Q ${d * 350} 150 ${d * 318} 130 L ${d * 322} 0 Z`} fill="url(#c-cilindro)" opacity={0.6} />
            <g transform={`translate(${d * 318} 50) rotate(${d * -28})`}><rect x={-14} y={-46} width={28} height={70} rx={14} fill="#c08860" /><rect x={-14} y={-46} width={28} height={70} rx={14} fill="url(#c-cilindro)" opacity={0.55} /><ellipse cx={0} cy={-36} rx={9} ry={8} fill="#e9c2a4" opacity={0.7} /></g>
          </g>)}
        </g>
      </g>
      <Polvo n={40} t={tl} seed={131} o={0.5} />
      <Tinte color="#ffb35a" o={0.1} />
      <Rotulo x={120} y={190} arriba="SEGUNDO DE PRIMARIA" texto="Una tablet ganada escribiendo" sub="concurso de escritura de Librerías Gandhi" tl={tl} at={0.5} tam={50} />
    </g>;
  },
};

/* ---------- numismático (a nivel niño): el bote de monedas, la de plata y el imán ---------- */
function Moneda2({ x, y, r = 40, tipo = 'cobre', rot = 0, inclina = 1, brillo = 0, t = 0, seed = 1, diseno }) {
  const col = { cobre: ['#b46a3a', '#e3a372', '#7a3f1e'], niquel: ['#9aa1a8', '#e3e8ec', '#5d646b'], plata: ['#c9d0d8', '#ffffff', '#7d8690'], acero: ['#7d8389', '#c9ced3', '#4a4f55'], bronce: ['#a8823a', '#e8c878', '#6a4c18'] }[tipo];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${inclina})`}>
    <ellipse cx={3} cy={6} rx={r} ry={r} fill="#000" opacity={0.35} filter="url(#c-b2)" />
    <circle r={r} fill={col[2]} />
    <circle r={r * 0.94} fill={col[0]} />
    <linearGradient id={`c-mon-${tipo}`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={col[1]} /><stop offset=".45" stopColor={col[0]} /><stop offset="1" stopColor={col[2]} /></linearGradient>
    <circle r={r * 0.94} fill={`url(#c-mon-${tipo})`} opacity={0.85} />
    <circle r={r * 0.8} fill="none" stroke={col[2]} strokeWidth={r * 0.04} opacity={0.6} />
    {Array.from({ length: 28 }, (_, i) => <circle key={i} cx={Math.cos((i / 28) * 6.28) * r * 0.87} cy={Math.sin((i / 28) * 6.28) * r * 0.87} r={r * 0.03} fill={col[1]} opacity={0.7} />)}
    {diseno === 'resplandor' ? <g transform={`scale(${r / 40})`}>
      {/* canto dentado */}
      {Array.from({ length: 60 }, (_, i) => <rect key={'d' + i} x={-0.9} y={-38.5} width={1.8} height={2.6} fill={col[2]} opacity={0.7} transform={`rotate(${i * 6})`} />)}
      {/* rayos que salen del gorro frigio */}
      {Array.from({ length: 33 }, (_, i) => { const a = (-178 + i * 11.1) * Math.PI / 180, L = (a < 0 ? 9 : 26) + (i % 2) * (a < 0 ? 3 : 4); return <path key={i} d={`M ${Math.cos(a) * 5} ${-21 + Math.sin(a) * 2} L ${Math.cos(a) * L} ${-21 + Math.sin(a) * L}`} stroke={col[2]} strokeWidth={0.9} opacity={0.75} />; })}
      <path d="M -7 -20 Q -7 -27 0 -27.5 Q 7 -27 7 -20 Z" fill={col[1]} stroke={col[2]} strokeWidth={0.6} />
      <rect x={-7.5} y={-21} width={15} height={2.2} fill={col[1]} stroke={col[2]} strokeWidth={0.4} />
      <text x={0} y={-19.2} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={1.8} fill={col[2]}>LIBERTAD</text>
      {/* "50" grande con relleno cuadriculado */}
      <text x={0} y={8} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={700} fontSize={22} fill={col[1]} stroke={col[2]} strokeWidth={0.8}>50</text>
      <text x={0.5} y={11.5} textAnchor="middle" fontFamily="Georgia, serif" fontSize={3} fill={col[2]}>M</text>
      <text x={0} y={19} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={700} fontSize={6} fill={col[1]} stroke={col[2]} strokeWidth={0.35} letterSpacing={0.3}>CENTAVOS</text>
      {/* coronas de laurel y encino a los lados */}
      {[-1, 1].map((d) => <g key={d}>{Array.from({ length: 8 }, (_, k) => { const a = (115 - k * 15) * Math.PI / 180, R0 = 28; return <ellipse key={k} cx={d * Math.cos(a) * R0 * -1} cy={Math.sin(a) * R0 - 2} rx={1.6} ry={3.4} fill={col[1]} stroke={col[2]} strokeWidth={0.4} transform={`rotate(${d * (k * 14 - 40)} ${d * Math.cos(a) * R0 * -1} ${Math.sin(a) * R0 - 2})`} />; })}</g>)}
      <path d="M -6 27 Q 0 30 6 27" stroke={col[2]} strokeWidth={0.8} fill="none" />
    </g> : <g>
    {/* águila en relieve (simplificada) */}
    <g transform={`scale(${r / 40})`} opacity={0.75}>
      <path d="M -14 8 Q -20 -6 -8 -14 Q -2 -22 6 -16 Q 18 -14 16 0 Q 22 6 12 10 Q 2 18 -14 8 Z" fill={col[2]} opacity={0.5} />
      <path d="M -13 6 Q -18 -6 -7 -13 Q -1 -20 6 -15" stroke={col[1]} strokeWidth={1.6} fill="none" />
      <path d="M -18 16 Q 0 24 18 16" stroke={col[2]} strokeWidth={2} fill="none" />
    </g></g>}
    {brillo > 0 && <g><path d={`M ${-r * 1.6} 0 L ${r * 1.6} 0 M 0 ${-r * 1.6} L 0 ${r * 1.6}`} stroke="#fff" strokeWidth={3} opacity={brillo * (0.6 + 0.4 * Math.sin(t * 6))} filter="url(#c-b2)" /><circle r={r * 0.6} fill="#fff" opacity={brillo * 0.35} filter="url(#c-b8)" /></g>}
  </g>;
}
ILUSC.monedas = {
  cam: { z0: 1.0, z1: 1.16, fx: 1040, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    const L2 = 0.29;
    const plata = cpr(p, L2 + 0.04, L2 + 0.16, kEase.suave);     // la mano saca la moneda de plata
    const iman = cpr(p, 0.62, 0.78, kEase.suave), pega = cpr(p, 0.72, 0.86);
    const r = R(77);
    const pila = Array.from({ length: 150 }, (_, i) => { const a = r() * 6.28, d = Math.pow(r(), 0.6) * 460; return { x: 980 + Math.cos(a) * d * 1.25, y: 640 + Math.sin(a) * d * 0.5, tipo: ['cobre', 'cobre', 'niquel', 'bronce', 'acero', 'cobre'][i % 6], rad: 30 + r() * 16, rot: r() * 360, inc: 0.4 + r() * 0.12, i }; }).sort((a, b) => a.y - b.y);
    const ix = lerp(-300, 860, iman), iy = 360;
    return <g>
      <g transform={capa(0.6)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="url(#c-madera-oscura)" /><rect x={-200} y={-200} width={2320} height={1500} fill="#000" opacity={0.25} />
        <Halo x={700} y={300} r={700} color="#ffd9a0" o={0.5} />
      </g>
      <g transform={capa(1)}>
        {/* la taza de bronce volteada */}
        <g transform="translate(400 560) rotate(-68)">
          <ellipse cx={0} cy={-190} rx={150} ry={40} fill="#3a2410" />
          <path d="M -150 -190 Q -160 60 -60 120 L 60 120 Q 160 60 150 -190 Z" fill="url(#c-laton)" />
          <path d="M -150 -190 Q -160 60 -60 120 L 60 120 Q 160 60 150 -190 Z" fill="#7a4a1a" opacity={0.35} />
          <path d="M -150 -190 Q -160 60 -60 120 L 60 120 Q 160 60 150 -190 Z" fill="url(#c-cilindro)" />
          {[0, 1, 2].map((k) => <path key={k} d={`M ${-146 + k * 4} ${-150 + k * 40} Q 0 ${-130 + k * 40} ${146 - k * 4} ${-150 + k * 40}`} stroke="#5a3410" strokeWidth={3} fill="none" opacity={0.5} />)}
          <path d="M 150 -120 Q 250 -110 240 -20 Q 230 50 140 40" stroke="url(#c-laton)" strokeWidth={26} fill="none" />
          <ellipse cx={0} cy={-190} rx={150} ry={40} fill="none" stroke="#e8c070" strokeWidth={8} />
          <rect x={-70} y={120} width={140} height={22} rx={6} fill="url(#c-laton)" />
          <path d="M -120 -160 Q -130 0 -60 90" stroke="#fff" strokeWidth={12} opacity={0.3} fill="none" />
        </g>
        {pila.map((m) => { const imantada = m.tipo === 'acero' || (m.tipo === 'niquel' && m.i % 4 === 0);
          const k = imantada ? pega : 0, mx = lerp(m.x, ix + ((m.i % 7) - 3) * 30, k), my = lerp(m.y, iy + 120 + ((m.i % 5) - 2) * 12, k);
          return <Moneda2 key={m.i} x={mx} y={my} r={m.rad} tipo={m.tipo} rot={m.rot} inclina={lerp(m.inc, 1, k)} />; })}
        {/* la moneda de plata */}
        <g opacity={1}>
          <Moneda2 x={lerp(1100, 1300, plata)} y={lerp(700, 520, plata)} r={lerp(44, 120, plata)} tipo="plata" diseno="resplandor" seed={501} rot={lerp(20, -8, plata) + Math.sin(tl) * 3} inclina={lerp(0.45, 1, plata)} brillo={cpr(p, 0.3, 0.36)} t={tl} />
          {plata > 0.9 && <g opacity={cpr(p, 0.45, 0.5)} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.7))' }}>
            <path d="M 1300 642 L 1300 668" stroke="#fff" strokeWidth={2.5} /><text x={1300} y={702} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={4} fill="#e8eef4">50 CENTAVOS · PLATA</text>
            <text x={1300} y={744} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontSize={34} fill="#fff">no se pega al imán</text></g>}
        </g>
        {/* imán de herradura */}
        {iman > 0 && <g transform={`translate(${ix} ${iy + Math.sin(tl * 2) * 8}) rotate(180)`}>
          <path d="M -110 0 L -110 -130 A 110 110 0 0 1 110 -130 L 110 0 L 50 0 L 50 -130 A 50 50 0 0 0 -50 -130 L -50 0 Z" fill="#c8231b" />
          <path d="M -110 0 L -110 -130 A 110 110 0 0 1 110 -130 L 110 0 L 50 0 L 50 -130 A 50 50 0 0 0 -50 -130 L -50 0 Z" fill="url(#c-cilindro)" />
          <rect x={-110} y={-4} width={60} height={50} fill="url(#c-acero)" /><rect x={50} y={-4} width={60} height={50} fill="url(#c-acero)" />
          {[0, 1, 2].map((k) => <path key={k} d={`M -80 ${50 + k * 20} Q 0 ${120 + k * 30} 80 ${50 + k * 20}`} stroke="#9fd8ff" strokeWidth={2} fill="none" opacity={0.4 * (0.5 + 0.5 * Math.sin(tl * 4 + k))} strokeDasharray="6 8" />)}
        </g>}
        {/* lupa */}
        <g transform="translate(560 860) rotate(-30)" opacity={0.95}><rect x={-14} y={70} width={28} height={180} rx={10} fill="url(#c-madera-oscura)" /><circle r={90} fill="none" stroke="url(#c-laton)" strokeWidth={16} /><circle r={82} fill="#dff3ff" opacity={0.15} /><path d="M -50 -40 Q -20 -70 20 -66" stroke="#fff" strokeWidth={8} opacity={0.5} fill="none" /></g>
      </g>
      <Polvo n={50} t={tl} seed={141} o={0.6} />
      <Tinte color="#ffb35a" o={0.12} />
      <g opacity={1 - cpr(p, 0.27, 0.31)}><Rotulo x={120} y={190} arriba="EL CAMINO QUE POCOS CONOCEN" texto="Numismático" sub="a nivel niño, claro" tl={tl} at={0.4} tam={64} /></g>
      <g opacity={cpr(p, 0.3, 0.34) * (1 - cpr(p, 0.58, 0.62))}><Rotulo x={120} y={190} arriba="ENTRE LAS MONEDAS DE MI PAPÁ" texto="Una moneda de plata" tl={tl} at={0} tam={58} /></g>
      <g opacity={cpr(p, 0.62, 0.66)}><Rotulo x={120} y={190} arriba="EL TRUCO DEL IMÁN" texto="El acero se pega; la plata, no" tl={tl} at={0} tam={52} /></g>
    </g>;
  },
};

/* ---------- el tianguis Miramar, Don Joaquín, Doña Yolanda y mi lugar ---------- */
function Lona({ x, y, w, color, t = 0, seed = 1 }) {
  const m = Math.sin(t * 1.2 + seed) * 6;
  return <g>
    <path d={`M ${x} ${y} Q ${x + w / 2} ${y + 50 + m} ${x + w} ${y} L ${x + w} ${y + 40} Q ${x + w / 2} ${y + 90 + m} ${x} ${y + 40} Z`} fill={color} />
    <path d={`M ${x} ${y} Q ${x + w / 2} ${y + 50 + m} ${x + w} ${y} L ${x + w} ${y + 40} Q ${x + w / 2} ${y + 90 + m} ${x} ${y + 40} Z`} fill="url(#c-arriba)" />
    <path d={`M ${x} ${y - 400} L ${x + w} ${y - 400} L ${x + w} ${y} Q ${x + w / 2} ${y + 50 + m} ${x} ${y} Z`} fill={color} opacity={0.92} />
    <path d={`M ${x} ${y - 400} L ${x + w} ${y - 400} L ${x + w} ${y} Q ${x + w / 2} ${y + 50 + m} ${x} ${y} Z`} fill="url(#c-tela)" opacity={0.6} />
  </g>;
}
ILUSC.tianguis = {
  cam: { z0: 1.0, z1: 1.1, fx: 960, fy: 600, x0: -40, x1: 60 },
  dibuja: ({ p, tl, capa }) => {
    const L2 = 0.47;
    const yola = cpr(p, L2 + 0.04, L2 + 0.14, kEase.suave), lugar = cpr(p, 0.78, 0.92, kEase.suave);
    return <g>
      <g transform={capa(0.35)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#f3d9a6" />
        <Desenfoque b={18} o={0.75}>
          {Array.from({ length: 9 }, (_, i) => <Lona key={i} x={-200 + i * 280} y={260 + (i % 2) * 30} w={270} color={['#e6336d', '#2fa4d0', '#f4c23a', '#3fbf4a', '#ff8a1f'][i % 5]} t={tl} seed={i} />)}
          {Array.from({ length: 30 }, (_, i) => { const r = R(1500 + i); return <g key={i} transform={`translate(${-100 + r() * 2200} ${560 + r() * 60})`}><ellipse cx={0} cy={-120} rx={40} ry={48} fill={['#3a2a22', '#5a3a2a', '#6a4a3a'][i % 3]} /><rect x={-55} y={-80} width={110} height={160} rx={30} fill={['#8a4a42', '#4a5a7a', '#a8945a', '#5a7a5a', '#6a5a7a'][i % 5]} /></g>; })}
        </Desenfoque>
      </g>
      <g transform={capa(1)}>
        {/* lonas del puesto de Don Joaquín (luz de colores) */}
        <Lona x={-200} y={140} w={1000} color="#e6336d" t={tl} seed={2} />
        <Lona x={800} y={120} w={1300} color={lugar > 0.5 ? '#3fbf4a' : '#2fa4d0'} t={tl} seed={5} />
        <rect x={-200} y={140} width={1000} height={900} fill="#ff5a8a" opacity={0.06} />
        <rect x={-200} y={880} width={2320} height={300} fill="#8d8476" /><rect x={-200} y={880} width={2320} height={300} fill="url(#c-papel-a)" />
        {/* Don Joaquín detrás de su mesa de antigüedades */}
        <Adulto x={330} y={890} s={1.0} piel="#a87048" camisa="#d9cbb0" pantalon="#4a4036" canas={0.85} bigote boca="sonrisa" mira={[1, 0.4]} brazoD={30 + 10 * Math.sin(tl * 1.5)} t={tl} seed={21} />
        <rect x={60} y={700} width={720} height={26} fill="url(#c-madera-media)" /><rect x={60} y={726} width={720} height={170} fill="#3a2a22" />
        {/* terciopelo con monedas, llaves antiguas, radio y discos */}
        <rect x={100} y={660} width={300} height={46} fill="#5a1a2a" /><rect x={100} y={660} width={300} height={46} fill="url(#c-arriba)" />
        {Array.from({ length: 10 }, (_, i) => <Moneda2 key={i} x={130 + (i % 5) * 58} y={672 + Math.floor(i / 5) * 22} r={14} tipo={['plata', 'cobre', 'bronce', 'niquel'][i % 4]} inclina={0.45} />)}
        <g transform="translate(520 700)"><rect x={-70} y={-110} width={140} height={110} rx={14} fill="#7a4a2a" /><rect x={-70} y={-110} width={140} height={110} rx={14} fill="url(#c-arriba)" /><circle cx={-24} cy={-56} r={30} fill="#3a2a22" />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={14} y={-90 + k * 12} width={44} height={4} fill="#d9c49a" />)}</g>
        {/* discos de vinil recargados dentro de una cajita de madera, sobre la mesa */}
        {[0, 1, 2].map((k) => <g key={k} transform={`translate(${672 + k * 26} ${652 - k * 2}) rotate(${-12 + k * 6})`}><circle r={50} fill="#141414" /><circle r={50} fill="none" stroke="#333" strokeWidth={2} strokeDasharray="1 5" /><circle r={16} fill={['#c0392b', '#f4c23a', '#2a5aa8'][k]} /><circle r={3} fill="#0a0a0a" /></g>)}
        <rect x={612} y={640} width={168} height={62} rx={4} fill="#8a5a33" /><rect x={612} y={640} width={168} height={62} rx={4} fill="url(#c-arriba)" />
        <path d="M 612 671 L 780 671" stroke="#5e3b20" strokeWidth={3} />
        {Array.from({ length: 3 }, (_, k) => <g key={'ll' + k} transform={`translate(${240 + k * 40} 640) rotate(${20 + k * 30})`}><circle r={10} fill="none" stroke="url(#c-laton)" strokeWidth={5} /><rect x={8} y={-3} width={40} height={6} fill="url(#c-laton)" /></g>)}
        {/* el niño platicando */}
        <Nene x={900} y={1000} s={1.1} edad={10} t={tl} playera="#f4f2ec" rayas={false} pantalon="#1f2b4a" cuello="#f4f2ec" brazoI={lerp(30, 50, 0.5 + 0.5 * Math.sin(tl * 3))} brazoD={10} mira={[-1, -0.4]} boca={Math.sin(tl * 9) > 0 ? 'o' : 'sonrisa'} seed={12} />
        {/* Doña Yolanda con su cuaderno */}
        <g opacity={yola} transform={`translate(${(1 - yola) * 300} 0)`}>
          <Adulto x={1380} y={950} s={0.98} piel="#b07a52" camisa="#2f8a7a" mujer delantal="#f4c23a" pelo="#3a2a22" canas={0.3} boca="sonrisa" mira={[-1, 0.4]} brazoD={70} t={tl} seed={23}
            carga={<g transform="translate(70 -230) rotate(-10)"><rect x={-40} y={-56} width={90} height={112} rx={4} fill="#f6f1e4" /><rect x={-40} y={-56} width={90} height={14} fill="#1d4f9c" />{[0, 1, 2, 3].map((k) => <rect key={k} x={-30} y={-30 + k * 18} width={70} height={3} fill="#999" />)}</g>} />
        </g>
        {/* mi lugar: aparece el puesto de plantas */}
        <g opacity={lugar}>
          <rect x={1440} y={700} width={480} height={26} fill="url(#c-madera-clara)" /><rect x={1440} y={726} width={480} height={170} fill="#3a2a22" />
          {[0, 1, 2, 3].map((k) => <MacetaC key={k} x={1500 + k * 115} y={704} w={90} h={76} tipo={k % 2 ? 'plastico' : 'barro'} color="#2a2a2a">{k === 0 ? <Mammillaria x={0} y={-66} s={0.42} t={tl} /> : k === 1 ? <Echeveria x={0} y={-60} s={0.5} /> : k === 2 ? <g transform="translate(0 -66)"><Dionaea x={0} y={0} s={0.5} t={tl} /></g> : <Sarracenia x={0} y={-66} s={0.36} t={tl} />}</MacetaC>)}
          <Carton x={1500} y={540} w={330} h={110} lineas={['Cactus · suculentas', 'carnívoras']} rot={-4} tam={36} />
        </g>
      </g>
      <Polvo n={60} t={tl} seed={151} o={0.6} />
      <Tinte color="#ff9cc4" o={0.1} />
      <g opacity={1 - cpr(p, L2 - 0.02, L2 + 0.02)}><Rotulo x={120} y={190} arriba="TIANGUIS MIRAMAR" texto="Don Joaquín" sub="monedas y antigüedades" tl={tl} at={0.5} tam={60} /></g>
      <g opacity={cpr(p, L2 + 0.05, L2 + 0.09) * (1 - cpr(p, 0.76, 0.8))}><Rotulo x={1100} y={190} arriba="ADMINISTRABA LOS LUGARES" texto="Doña Yolanda" tl={tl} at={0} tam={60} /></g>
      <g opacity={cpr(p, 0.8, 0.85)}><Rotulo x={1100} y={190} arriba="DESDE QUINTO DE PRIMARIA" texto="Mi lugar en el tianguis" tl={tl} at={0} tam={56} /></g>
    </g>;
  },
};

/* ---------- el jardín vertical en un orfanato ---------- */
ILUSC.jardin_vertical = {
  cam: { z0: 1.0, z1: 1.08, fx: 960, fy: 520 },
  dibuja: ({ p, tl, capa }) => {
    const cols = 9, filas = 5, total = cols * filas, puestas = Math.floor(cpr(p, 0.1, 0.9) * total);
    const ox = 660, oy = 170, cw = 110, ch = 96;
    return <g>
      <g transform={capa(0.4)}>
        <linearGradient id="c-jv-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8fc0e8" /><stop offset="1" stopColor="#eaf2e4" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={600} fill="url(#c-jv-cielo)" />
        <Desenfoque b={8}>{Array.from({ length: 8 }, (_, i) => <circle key={i} cx={i * 300} cy={260} r={150} fill="#5f8f4a" />)}</Desenfoque>
      </g>
      <g transform={capa(1)}>
        {/* muro del patio */}
        <rect x={-200} y={100} width={2320} height={820} fill="#efe0c4" /><rect x={-200} y={100} width={2320} height={820} fill="url(#c-papel-a)" />
        <rect x={-200} y={90} width={2320} height={20} fill="#cdb895" />
        {/* estructura y bolsillos de fieltro */}
        <rect x={ox - 30} y={oy - 30} width={cols * cw + 60} height={filas * ch + 60} fill="#3a3a40" />
        {Array.from({ length: total }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), x = ox + c * cw, y = oy + f * ch, tiene = i < puestas, e = tiene ? cpr(cpr(p, 0.1, 0.9) * total - i, 0, 1) : 0;
          const tipo = ['albahaca', 'hierbabuena', 'romero'][(c + f) % 3];
          return <g key={i}>
            <path d={`M ${x + 6} ${y + 20} L ${x + cw - 6} ${y + 20} L ${x + cw - 14} ${y + ch - 6} L ${x + 14} ${y + ch - 6} Z`} fill="#4a4a50" />
            {tiene && <g transform={`translate(${x + cw / 2} ${y + 30}) scale(${e})`}>{(c + f) % 4 === 3
              ? <g>{Array.from({ length: 6 }, (_, k) => <path key={k} d={`M ${-30 + k * 12} 0 q ${(k - 2.5) * 6} 40 ${(k - 2.5) * 10} 80`} stroke="#4f9a44" strokeWidth={6} fill="none" />)}</g>
              : <HierbaOlor x={0} y={0} s={0.36} t={tl + i * 0.2} seed={i + 2} tipo={tipo} />}</g>}
            <path d={`M ${x + 6} ${y + 20} Q ${x + cw / 2} ${y + 34} ${x + cw - 6} ${y + 20} L ${x + cw - 14} ${y + ch - 6} L ${x + 14} ${y + ch - 6} Z`} fill="#55555c" />
            <path d={`M ${x + 6} ${y + 20} Q ${x + cw / 2} ${y + 34} ${x + cw - 6} ${y + 20}`} stroke="#6a6a72" strokeWidth={3} fill="none" />
          </g>; })}
        {/* manguera de goteo */}
        {Array.from({ length: filas }, (_, f) => <path key={f} d={`M ${ox - 20} ${oy + f * ch + 14} L ${ox + cols * cw + 20} ${oy + f * ch + 14}`} stroke="#1d1d22" strokeWidth={5} />)}
        {Array.from({ length: 12 }, (_, i) => { const k = ((tl * 0.6 + i / 12) % 1); return <circle key={i} cx={ox + 50 + (i % 9) * cw} cy={oy + 20 + Math.floor(i / 9) * ch + k * 40} r={3} fill="#9fd8ff" opacity={1 - k} />; })}
        <rect x={-200} y={910} width={2320} height={300} fill="#b8b0a2" />
        {/* la familia ayudando */}
        <g transform="translate(330 0)"><rect x={-70} y={330} width={14} height={590} fill="url(#c-acero)" /><rect x={56} y={330} width={14} height={590} fill="url(#c-acero)" />{Array.from({ length: 7 }, (_, k) => <rect key={k} x={-70} y={400 + k * 80} width={140} height={10} fill="url(#c-acero)" />)}</g>
        <Adulto x={330} y={830} s={0.92} camisa="#2f6a8f" rapado brazoD={150 + 10 * Math.sin(tl * 2)} brazoI={30} mira={[1, -0.6]} t={tl} seed={5} />
        <Adulto x={1720} y={960} s={0.95} camisa="#6a4c9c" mujer piel="#eccdb2" brazoD={20} brazoI={70} mira={[-1, -0.3]} t={tl} seed={2}
          carga={<g transform="translate(-60 -200)"><Huacal x={0} y={0} w={180} h={90}>{[0, 1, 2].map((k) => <HierbaOlor key={k} x={-50 + k * 50} y={-70} s={0.3} t={tl + k} seed={k + 30} />)}</Huacal></g>} />
        <Nene x={1300} y={1000} s={0.8} edad={7} t={tl} nina piel="#e6c3a5" pelo="#3a2416" playera="#e8467c" rayas={false} brazoD={100} brazoI={20} mira={[1, -0.6]} boca="risa" seed={19}
          detalle={<g transform="translate(10 -95)"><HierbaOlor x={0} y={0} s={0.24} t={tl} seed={45} /></g>} />
        <Nene x={1500} y={990} s={0.95} edad={11} t={tl} playera="#f4c23a" brazoD={110} brazoI={55} mira={[-1, -0.8]} boca="risa" seed={13}
          detalle={<g transform="translate(-10 -100)"><HierbaOlor x={0} y={0} s={0.3} t={tl} seed={44} /></g>} />
      </g>
      <Rayos x={1700} y={-100} ang={120} abre={24} largo={1500} n={6} ancho={130} o={0.5} t={tl} seed={161} />
      <Polvo n={50} t={tl} seed={162} o={0.6} />
      <Tinte color="#ffcf8a" o={0.1} />
      <Rotulo x={120} y={190} arriba="EN FAMILIA" texto="Un jardín vertical" sub="para un orfanato" tl={tl} at={0.5} tam={56} />
    </g>;
  },
};

/* ---------- el periódico: "Emprendedor, matemático… y sólo tiene 11 años" ---------- */
ILUSC.periodico = {
  cam: { z0: 1.0, z1: 1.1, fx: 960, fy: 470 },
  dibuja: ({ p, tl, capa, v }) => {
    const credito = v.credito || '';
    const sube = lerp(80, -360, cpr(p, 0.08, 0.55, kEase.suave)); // la página se desliza un poco, como al leerla
    const cuerpo = ['Roberto Carlos Navarro Félix desarrolló un proyecto para deshidratar alimentos, ha', 'publicado cuentos, obtuvo una medalla de plata en matemáticas a nivel nacional...', 'y sólo tiene 11 años.'];
    return <g>
      <g transform={capa(0.6)}>
        <rect x={-200} y={-200} width={2320} height={1500} fill="#1c1d22" />
        <Halo x={960} y={300} r={900} color="#dfe6ee" o={0.25} />
      </g>
      <g transform={capa(1)}>
        {/* ventana del navegador con la nota (recreación de la página de Reforma / Mural) */}
        <g transform={`translate(960 ${520 + sube})`}>
          <rect x={-640} y={-470} width={1280} height={1100} rx={18} fill="#000" opacity={0.45} transform="translate(16 22)" />
          <rect x={-640} y={-470} width={1280} height={1100} rx={18} fill="#ffffff" />
          {/* barra superior */}
          <rect x={-640} y={-470} width={1280} height={84} rx={18} fill="#ffffff" />
          <path d="M -600 -440 h 26 M -600 -430 h 26 M -600 -420 h 26" stroke="#222" strokeWidth={3} />
          <circle cx={-556} cy={-432} r={9} fill="none" stroke="#222" strokeWidth={3} /><path d="M -549 -425 l 7 7" stroke="#222" strokeWidth={3} />
          <text x={0} y={-410} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontWeight={900} fontSize={58} fill="#1f9a3e" letterSpacing={1}>REFORMA</text>
          <rect x={290} y={-450} width={140} height={44} rx={22} fill="#ff5a1f" /><text x={360} y={-421} textAnchor="middle" fontFamily={FUENTE.titulo || 'Anton'} fontSize={20} fill="#fff">SUSCRÍBETE</text>
          <text x={530} y={-421} textAnchor="middle" fontFamily={'Anton, Impact, sans-serif'} fontSize={20} fill="#555">INICIAR SESIÓN</text>
          <rect x={-640} y={-386} width={1280} height={2} fill="#222" />
          <rect x={-480} y={-370} width={960} height={10} fill="#d9dce2" />
          {/* titular, firma y fecha */}
          <text x={-480} y={-280} fontFamily={'Anton, Impact, sans-serif'} fontSize={70} fill="#151515">Emprendedor, matemático...</text>
          <text x={-480} y={-200} fontFamily={'Anton, Impact, sans-serif'} fontSize={70} fill="#151515">y sólo tiene 11 años de edad</text>
          <text x={-480} y={-150} fontFamily={FUENTE.texto} fontSize={22} fill="#222">MURAL / STAFF</text>
          <text x={-480} y={-122} fontFamily={FUENTE.texto} fontSize={18} fill="#444">Guadalajara, México (08 julio 2017) .-00:00 hrs</text>
          {/* botones para compartir */}
          {['f', 'X', 'w', '✉', '∞'].map((s, k) => <g key={k} transform={`translate(${-450 + k * 70} -64)`}><circle r={30} fill="#111" /><text x={0} y={9} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={26} fill="#fff">{s}</text></g>)}
          {/* la foto: Beto con sus dos medallas */}
          <g transform="translate(-480 -20)">
            <clipPath id="c-per-foto"><rect x={0} y={0} width={960} height={640} /></clipPath>
            <g clipPath="url(#c-per-foto)">
              <rect x={0} y={0} width={960} height={640} fill="#d9dcd6" />
              <g filter="url(#c-b14)"><rect x={0} y={0} width={300} height={640} fill="#eceee9" /><rect x={560} y={0} width={400} height={640} fill="#3f6f4a" /><rect x={620} y={60} width={300} height={260} fill="#2f5a3a" /><rect x={140} y={40} width={200} height={300} fill="#c9cfc7" /></g>
              <Nene x={480} y={1010} s={2.15} edad={11} piel="#a86f48" pelo="#1a1311" playera="#f4f4f0" rayas={false} cuello="#e9e9e4" boca="risa" mira={[0, 0]} seed={14} brazoD={0} brazoI={0} parpadeo={false} />
              {/* listones y medallas: plata a la izquierda, dorada a la derecha */}
              <path d="M 380 640 Q 330 520 250 440" stroke="#3f9a4a" strokeWidth={22} fill="none" />
              <path d="M 560 640 Q 640 560 700 470" stroke="#f2d56a" strokeWidth={22} fill="none" />
              <path d="M 420 640 Q 470 600 560 560" stroke="#e8742a" strokeWidth={18} fill="none" opacity={0.9} />
              <g transform="translate(245 400)"><circle r={70} fill="url(#c-acero)" /><circle r={52} fill="none" stroke="#8a929a" strokeWidth={4} /><circle r={18} fill="#b9c0c8" /></g>
              <g transform="translate(712 420)"><circle r={60} fill="url(#c-oro)" /><circle r={40} fill="#f6f2e0" /><path d="M -24 10 L 0 -26 L 24 10 Z" fill="#1d6fb0" /><circle cx={0} cy={-4} r={10} fill="#2fa04a" /></g>
              {[[-1, 245, 470], [1, 712, 480]].map(([d, hx, hy]) => <g key={d}><ellipse cx={hx + d * 10} cy={hy} rx={40} ry={50} fill="#a86f48" /><ellipse cx={hx + d * 10} cy={hy} rx={40} ry={50} fill="url(#c-esfera)" opacity={0.5} /></g>)}
            </g>
            <text x={0} y={672} fontFamily={FUENTE.texto} fontStyle="italic" fontSize={19} fill="#333">Beto fue finalista del concurso El pequeño Gran Escritor 2016. Crédito: Maricarmen Galindo</text>
            {cuerpo.map((l, k) => <text key={k} x={0} y={740 + k * 36} fontFamily={FUENTE.texto} fontSize={24} fill="#333">{l}</text>)}
          </g>
        </g>
      </g>
      <Polvo n={30} t={tl} seed={171} o={0.35} />
      {(() => { const o = cpr(p, 0.62, 0.72); const hay = (window.FOTOS || {})['video/img/extra/mural_nota.jpg']; return hay && o > 0 && <g>
        <rect x={0} y={0} width={1920} height={1080} fill="#0b0b0d" opacity={0.7 * o} />
        <FotoReal src="video/img/extra/mural_nota.jpg" x={960} y={480} maxW={1300} maxH={720} o={o} etiqueta="LA NOTA ORIGINAL · MURAL, 8 DE JULIO DE 2017" /></g>; })()}
      {credito && p < 0.62 && <text x={40} y={130} textAnchor="start" fontFamily={FUENTE.mono} fontSize={18} fill="#fff" opacity={0.8} style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.9))' }}>{credito}</text>}
    </g>;
  },
};

Object.assign(window, { Moneda2, Lona });
