// cine-cap1a.jsx — capítulo 1 (La semilla), primera mitad: mudanza, negocio, vitamina T y el changarro.
const ILUSC = window.ILUSC;

/* ---------- piezas de esta parte ---------- */
// Caja de cartón con cinta y letrero a mano.
function Caja({ x, y, w, h, texto, rot = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} fill="#c69a60" />
    <rect x={-w / 2} y={-h} width={w} height={h} fill="url(#c-papel-a)" opacity={0.9} />
    <rect x={-w / 2} y={-h} width={w} height={h} fill="url(#c-arriba)" opacity={0.6} />
    <rect x={-w / 2} y={-h} width={w * 0.5} height={h} fill="#000" opacity={0.08} />
    <rect x={-10} y={-h} width={20} height={h * 0.45} fill="#e3cf9a" opacity={0.75} />
    <path d={`M ${-w / 2} ${-h + 2} L ${w / 2} ${-h + 2}`} stroke="#8a6232" strokeWidth={3} />
    {texto && <text x={0} y={-h * 0.32} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={Math.min(46, w * 0.2)} fill="#2a2018" transform={`rotate(${(R(seed)() - 0.5) * 8} 0 ${-h * 0.32})`}>{texto}</text>}
  </g>;
}
// Camioneta pick-up vista de lado (mirando a la derecha). (x,y) = suelo bajo el centro. rueda = ángulo de las llantas.
function Camioneta({ x, y, rueda = 0, color = '#3f8f8c', carga, nene }) {
  const llanta = (cx) => <g transform={`translate(${cx} -74)`}>
    <circle r={76} fill="#16161a" /><circle r={76} fill="url(#c-esfera)" opacity={0.25} />
    <circle r={50} fill="url(#c-acero)" /><circle r={50} fill="#000" opacity={0.15} />
    <g transform={`rotate(${rueda})`}>{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-6} y={-46} width={12} height={34} rx={4} fill="#3a3f46" transform={`rotate(${k * 72})`} />)}</g>
    <circle r={14} fill="#c9ced6" /><circle r={76} fill="none" stroke="#2a2a30" strokeWidth={10} strokeDasharray="6 10" transform={`rotate(${rueda})`} opacity={0.6} />
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={0} y={4} rx={560} ry={22} o={0.6} b="c-b14" />
    {/* caja de carga */}
    <g>{carga}</g>
    <path d="M -500 -100 L -500 -265 L 90 -265 L 90 -100 Z" fill={color} />
    <path d="M -500 -100 L -500 -265 L 90 -265 L 90 -100 Z" fill="url(#c-arriba)" />
    <rect x={-500} y={-268} width={590} height={12} rx={4} fill={cla(color, 0.25)} />
    {[-380, -240, -100].map((bx, i) => <rect key={i} x={bx} y={-250} width={6} height={140} fill="#000" opacity={0.15} />)}
    <rect x={-512} y={-230} width={24} height={60} rx={6} fill="#c8231b" /><rect x={-508} y={-226} width={10} height={20} rx={3} fill="#ff8a7a" opacity={0.8} />
    {/* cabina */}
    <path d="M 90 -100 L 90 -430 Q 92 -446 110 -446 L 250 -446 Q 272 -446 284 -430 L 360 -290 L 520 -270 Q 560 -262 566 -230 L 570 -130 Q 570 -100 540 -100 Z" fill={color} />
    <path d="M 90 -100 L 90 -430 Q 92 -446 110 -446 L 250 -446 Q 272 -446 284 -430 L 360 -290 L 520 -270 Q 560 -262 566 -230 L 570 -130 Q 570 -100 540 -100 Z" fill="url(#c-arriba)" />
    {/* reflejo del cielo en la lámina */}
    <path d="M -500 -220 L 566 -200 L 566 -184 L -500 -204 Z" fill="#fff" opacity={0.16} />
    {/* ventanas */}
    <path d="M 112 -420 L 240 -420 Q 254 -420 262 -408 L 334 -292 L 112 -292 Z" fill="#26343f" />
    <linearGradient id="c-cam-vidrio" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#cfe6f5" stopOpacity=".55" /><stop offset=".5" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#ffd9a0" stopOpacity=".35" /></linearGradient>
    <clipPath id="c-cam-ventana"><path d="M 112 -420 L 240 -420 Q 254 -420 262 -408 L 334 -292 L 112 -292 Z" /></clipPath>
    <g clipPath="url(#c-cam-ventana)">{nene}</g>
    <path d="M 112 -420 L 240 -420 Q 254 -420 262 -408 L 334 -292 L 112 -292 Z" fill="url(#c-cam-vidrio)" />
    <path d="M 140 -420 L 220 -300" stroke="#fff" strokeOpacity={0.3} strokeWidth={14} />
    <path d="M 112 -420 L 240 -420 Q 254 -420 262 -408 L 334 -292 L 112 -292 Z" fill="none" stroke="#1d2328" strokeWidth={6} />
    {/* puerta, manija, espejo, faros, defensas */}
    <path d="M 100 -280 L 100 -110 L 340 -110 L 352 -280" fill="none" stroke="#000" strokeOpacity={0.3} strokeWidth={3} />
    <rect x={290} y={-250} width={40} height={10} rx={5} fill="url(#c-acero)" />
    <path d="M 340 -330 L 380 -340 L 384 -300 L 350 -296 Z" fill="#1d2328" />
    <rect x={540} y={-250} width={30} height={34} rx={8} fill="#fff5d0" /><circle cx={556} cy={-233} r={30} fill="#fff1c0" opacity={0.25} filter="url(#c-b8)" />
    <rect x={530} y={-140} width={52} height={40} rx={10} fill="url(#c-acero)" />
    <rect x={-520} y={-140} width={60} height={40} rx={10} fill="url(#c-acero)" />
    {/* salpicaderas y llantas */}
    <path d="M -410 -100 A 100 100 0 0 1 -190 -100 Z" fill="#1d2328" /><path d="M 190 -100 A 100 100 0 0 1 410 -100 Z" fill="#1d2328" />
    {llanta(-300)}{llanta(300)}
    <rect x={-500} y={-104} width={1070} height={6} fill="#000" opacity={0.25} />
  </g>;
}
// Fila de casas mexicanas (techos planos, tinacos, rejas) que se repite para hacer paralaje.
function Casas({ y, off = 0, seed = 3, escala = 1, bruma = 0.3 }) {
  const r = R(seed), ancho = 2600, colores = ['#e48a5c', '#e9c46a', '#8fbf9f', '#d77a9a', '#7fa8d1', '#f1e3c4', '#c95f4a'];
  const casas = []; let cx = 0;
  while (cx < ancho) { const w = (220 + r() * 220) * escala, h = (200 + r() * 200) * escala; casas.push({ x: cx, w, h, c: colores[Math.floor(r() * colores.length)], tin: r() < 0.6, pisos: r() < 0.4 ? 2 : 1 }); cx += w + 6; }
  const o = ((-off % ancho) + ancho) % ancho - ancho;
  return <g>{[0, 1].map((rep) => <g key={rep} transform={`translate(${o + rep * ancho} 0)`}>
    {casas.map((c, i) => <g key={i}>
      <rect x={c.x} y={y - c.h} width={c.w} height={c.h} fill={mix(c.c, '#b9c4d6', bruma)} />
      <rect x={c.x} y={y - c.h} width={c.w} height={c.h} fill="url(#c-arriba)" opacity={0.5} />
      <rect x={c.x - 4} y={y - c.h - 10} width={c.w + 8} height={12} fill={mix('#d9cfc0', '#b9c4d6', bruma)} />
      {c.tin && <g><rect x={c.x + c.w * 0.65} y={y - c.h - 70 * escala} width={56 * escala} height={60 * escala} rx={10} fill={mix('#1b1b1f', '#7a8396', bruma)} /><rect x={c.x + c.w * 0.65 + 4} y={y - c.h - 74 * escala} width={48 * escala} height={10} rx={4} fill={mix('#2a2a30', '#8a93a6', bruma)} /></g>}
      {Array.from({ length: c.pisos }, (_, pi) => <g key={pi}>
        <rect x={c.x + c.w * 0.15} y={y - c.h + 40 + pi * (c.h * 0.45)} width={c.w * 0.3} height={c.h * 0.22} fill={mix('#3b4a5c', '#9aa6ba', bruma)} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={c.x + c.w * 0.15 + k * c.w * 0.075} y={y - c.h + 40 + pi * (c.h * 0.45)} width={3} height={c.h * 0.22} fill={mix('#1b1b1f', '#9aa6ba', bruma)} />)}
      </g>)}
      <rect x={c.x + c.w * 0.6} y={y - c.h * 0.5} width={c.w * 0.25} height={c.h * 0.5} fill={mix('#5b3a26', '#9aa6ba', bruma)} />
    </g>)}
  </g>)}</g>;
}

/* ---------- unos años después: la mudanza ---------- */
ILUSC.mudanza = {
  cam: { z0: 1.0, z1: 1.05, fx: 900, fy: 640 },
  dibuja: ({ p, tl, T, capa }) => {
    const vel = 520, rueda = (tl * vel / 76) * (180 / Math.PI), brinco = Math.abs(Math.sin(tl * 7)) * 3 + Math.sin(tl * 13) * 1.2;
    const tx = lerp(720, 1020, p);
    return <g>
      <g transform={capa(0.1)}>
        <linearGradient id="c-mud-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5d8cc0" /><stop offset=".55" stopColor="#f4c487" /><stop offset="1" stopColor="#ffb36b" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={1400} fill="url(#c-mud-cielo)" />
        <Halo x={1560} y={560} r={360} color="#ffe2a8" o={0.95} /><circle cx={1560} cy={560} r={60} fill="#fff4d8" filter="url(#c-b4)" />
        {[0, 1, 2].map((i) => <ellipse key={i} cx={((300 + i * 700 - tl * 8) % 2400 + 2400) % 2400 - 200} cy={170 + i * 60} rx={220} ry={30} fill="#fff" opacity={0.3} filter="url(#c-b14)" />)}
        <Desenfoque b={4}><path d={`M -200 640 Q 100 520 340 600 Q 560 470 820 590 Q 1080 500 1300 580 Q 1500 520 1700 600 Q 1900 540 2120 610 L 2120 760 L -200 760 Z`} fill="#8b8db0" opacity={0.75} /></Desenfoque>
      </g>
      <g transform={capa(0.35)}><Desenfoque b={3}><Casas y={760} off={tl * 60} seed={5} escala={0.9} bruma={0.45} /></Desenfoque></g>
      <g transform={capa(0.6)}><Desenfoque b={2}>
        <Casas y={800} off={tl * 160} seed={9} escala={1.15} bruma={0.15} />
        {Array.from({ length: 6 }, (_, i) => { const ax = ((i * 470 - tl * 160) % 2820 + 2820) % 2820 - 300; return <g key={i}><rect x={ax - 8} y={640} width={16} height={170} fill="#5a3d2a" /><circle cx={ax} cy={600} r={90} fill="#4f7a3a" /><circle cx={ax - 40} cy={630} r={60} fill="#5f8a44" /><circle cx={ax + 30} cy={570} r={50} fill="#6c9a4c" /></g>; })}
      </Desenfoque></g>
      {/* calle */}
      <g transform={capa(0.9)}>
        <rect x={-200} y={800} width={2320} height={60} fill="#b8ab98" /><rect x={-200} y={800} width={2320} height={8} fill="#e2d6c2" />
        <rect x={-200} y={856} width={2320} height={400} fill="#4a4b50" /><rect x={-200} y={856} width={2320} height={400} fill="url(#c-tierra)" opacity={0.25} />
        <rect x={-200} y={856} width={2320} height={14} fill="#000" opacity={0.3} />
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={((i * 300 - tl * vel) % 3000 + 3000) % 3000 - 300} y={1000} width={150} height={12} fill="#e9d9a0" opacity={0.85} />)}
      </g>
      {/* la camioneta, con las plantas atrás */}
      <g transform={capa(1)}>
        <g transform={`translate(0 ${-brinco})`}>
          <Camioneta x={tx} y={1000} rueda={rueda} color="#3c8a87"
            carga={<g>
              <Caja x={-410} y={-262} w={170} h={150} texto="cocina" seed={2} />
              <Caja x={-250} y={-262} w={150} h={200} texto="libros" rot={-2} seed={3} />
              <Caja x={-405} y={-412} w={140} h={110} texto="¡frágil!" rot={3} seed={4} />
              <MacetaC x={-90} y={-262} w={130} h={110}><MataJitomate x={0} y={-96} s={0.5} t={tl * 3} seed={4} frutos={2} /></MacetaC>
              <MacetaC x={30} y={-262} w={110} h={95} tipo="plastico" color="#2d6a8f"><HierbaOlor x={0} y={-84} s={0.62} t={tl * 3} seed={6} /></MacetaC>
              <MacetaC x={-160} y={-262} w={90} h={80}><PlantulaFrijol x={0} y={-70} g={0.95} s={0.6} t={tl * 3} seed={7} /></MacetaC>
            </g>}
            nene={<g transform={`translate(${tx + 175 - tx} 0)`}><Nene x={215} y={-200} s={0.5} edad={5} t={tl} playera="#2f6fd0" mira={[-1, 0]} boca="sonrisa" cuerpo="busto" seed={4} /></g>} />
        </g>
        {/* polvo que levanta */}
        {Array.from({ length: 16 }, (_, i) => { const k = ((tl * 0.8 + i / 16) % 1); return <circle key={i} cx={tx - 520 - k * 500} cy={985 - k * 60 - (i % 3) * 14} r={20 + k * 70} fill="#d9c3a0" opacity={0.35 * (1 - k)} filter="url(#c-b14)" />; })}
      </g>
      {/* postes en primer plano, muy rápidos y fuera de foco */}
      <g transform={capa(1.4)}><Desenfoque b={14} o={0.9}>
        {Array.from({ length: 3 }, (_, i) => { const px = ((i * 1300 - tl * 1500) % 3900 + 3900) % 3900 - 400; return <g key={i}><rect x={px} y={-100} width={60} height={1300} fill="#2a2420" /><rect x={px - 120} y={60} width={300} height={22} fill="#2a2420" /></g>; })}
      </Desenfoque></g>
      <Rayos x={1560} y={560} ang={196} abre={30} largo={1900} n={6} ancho={130} o={0.45} t={tl} seed={14} />
      <Tinte color="#ffa24a" o={0.16} />
      <Rotulo x={120} y={190} arriba="UNOS AÑOS DESPUÉS" texto="Nueva casa, mismo hobby" tl={tl} at={0.5} tam={58} />
    </g>;
  },
};

/* ---------- el negocio en Paraísos del Colli ---------- */
function MonitorCRT({ x, y, s = 1, t = 0, seed = 1 }) {
  const fl = 0.85 + 0.15 * Math.sin(t * 9 + seed * 3);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -150 L 90 -150 L 80 0 L -80 0 Z" fill="#d8d2c2" /><path d="M -90 -150 L 90 -150 L 80 0 L -80 0 Z" fill="url(#c-arriba)" />
    <rect x={-74} y={-138} width={148} height={112} rx={14} fill="#1b2a3a" />
    <rect x={-66} y={-130} width={132} height={96} rx={10} fill={mix('#2b6fd6', '#7fc4ff', 0.3 * fl)} />
    <rect x={-60} y={-124} width={60} height={10} fill="#fff" opacity={0.6} /><rect x={-60} y={-104} width={110} height={44} fill="#fff" opacity={0.25} />
    <rect x={-66} y={-130} width={132} height={96} rx={10} fill="url(#c-esfera)" opacity={0.4} />
    <circle cx={0} cy={-80} r={120} fill="#5fb0ff" opacity={0.18 * fl} filter="url(#c-b24)" />
    <rect x={-30} y={0} width={60} height={14} fill="#c9c2b0" /><rect x={-56} y={12} width={112} height={10} rx={4} fill="#bdb6a4" />
  </g>;
}
function PapelPicado({ x0, x1, y, t, colores = ['#e6336d', '#2fb4e0', '#f4c23a', '#3fbf4a', '#b18cff', '#ff8a1f'], n = 14 }) {
  return <g>
    <path d={`M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + 40} ${x1} ${y}`} stroke="#3a3a3a" strokeWidth={2} fill="none" />
    {Array.from({ length: n }, (_, i) => { const k = (i + 0.5) / n, px = lerp(x0, x1, k), py = y + Math.sin(k * Math.PI) * 40, sw = Math.sin(t * 2 + i) * 6;
      return <g key={i} transform={`translate(${px} ${py}) rotate(${sw})`}>
        <path d="M -34 0 L 34 0 L 34 70 L 26 80 L 17 70 L 8 80 L 0 70 L -8 80 L -17 70 L -26 80 L -34 70 Z" fill={colores[i % colores.length]} opacity={0.92} />
        <circle cx={0} cy={28} r={9} fill="#000" opacity={0.25} /><path d="M -20 50 L -10 42 L 0 50 L 10 42 L 20 50" stroke="#000" strokeOpacity={0.25} strokeWidth={4} fill="none" />
      </g>; })}
  </g>;
}
ILUSC.negocio = {
  cam: { z0: 1.0, z1: 1.09, fx: 960, fy: 560 },
  dibuja: ({ p, tl, capa }) => {
    return <g>
      <g transform={capa(0.4)}>
        <linearGradient id="c-neg-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8fb5d8" /><stop offset="1" stopColor="#f6d7a6" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={500} fill="url(#c-neg-cielo)" />
        {/* cables de luz */}
        {[0, 1, 2].map((i) => <path key={i} d={`M -200 ${60 + i * 26} Q 960 ${150 + i * 30} 2120 ${50 + i * 24}`} stroke="#1d1d22" strokeWidth={3} fill="none" opacity={0.8} />)}
      </g>
      <g transform={capa(1)}>
        {/* fachada */}
        <rect x={60} y={150} width={1800} height={760} fill="#d9774a" />
        <rect x={60} y={150} width={1800} height={760} fill="url(#c-papel-a)" opacity={0.9} />
        <Desenfoque b={24} o={0.35}>{[0, 1, 2, 3].map((i) => <rect key={i} x={160 + i * 470} y={160} width={60} height={240} fill="#7a3a1e" />)}</Desenfoque>
        <rect x={60} y={150} width={1800} height={24} fill="#a8512e" /><rect x={40} y={130} width={1840} height={26} fill="#efe3cf" />
        {/* letreros pintados a mano */}
        <rect x={140} y={200} width={760} height={110} fill="#f3ead6" /><rect x={140} y={200} width={760} height={110} fill="url(#c-papel-a)" opacity={0.6} />
        <text x={520} y={262} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={800} fontSize={50} fill="#1f4fa8">Renta de computadoras</text>
        <text x={520} y={298} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={22} letterSpacing={6} fill="#c03a2b">INTERNET · IMPRESIONES</text>
        <rect x={1020} y={200} width={760} height={110} fill="#f3ead6" /><rect x={1020} y={200} width={760} height={110} fill="url(#c-papel-a)" opacity={0.6} />
        <text x={1400} y={268} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontWeight={800} fontSize={60} fill="#b3261e">Comida casera</text>
        <text x={1400} y={300} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={20} letterSpacing={6} fill="#2a6a3a">DESAYUNOS · COMIDAS</text>
        {/* local izquierdo: computadoras con luz fría */}
        <rect x={140} y={360} width={760} height={550} fill="#1a2430" />
        <linearGradient id="c-neg-fria" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#bfe2ff" stopOpacity=".45" /><stop offset="1" stopColor="#1a2430" stopOpacity="0" /></linearGradient>
        <rect x={140} y={360} width={760} height={550} fill="url(#c-neg-fria)" />
        {[0, 1].map((i) => <rect key={i} x={240 + i * 330} y={384} width={220} height={10} rx={5} fill="#f2fbff" opacity={0.9} />)}
        <rect x={160} y={420} width={140} height={190} fill="#e9d36a" opacity={0.7} transform="rotate(-3 230 515)" />
        {[0, 1, 2].map((i) => <g key={i}>
          <rect x={180 + i * 240} y={740} width={220} height={18} fill="url(#c-madera-clara)" />
          <MonitorCRT x={290 + i * 240} y={740} s={0.9} t={tl} seed={i} />
          <g transform={`translate(${290 + i * 240} 900)`}><ellipse cx={0} cy={-120} rx={46} ry={52} fill="#14181f" /><rect x={-60} y={-80} width={120} height={90} rx={30} fill="#14181f" /></g>
        </g>)}
        {/* local derecho: comida, luz cálida y papel picado */}
        <rect x={1020} y={360} width={760} height={550} fill="#3a2418" />
        <radialGradient id="c-neg-calida" cx=".5" cy=".2" r=".8"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".7" /><stop offset="1" stopColor="#3a2418" stopOpacity="0" /></radialGradient>
        <rect x={1020} y={360} width={760} height={550} fill="url(#c-neg-calida)" />
        <rect x={1060} y={420} width={250} height={170} rx={6} fill="#1f2a22" /><rect x={1060} y={420} width={250} height={170} rx={6} fill="none" stroke="url(#c-madera-media)" strokeWidth={10} />
        <text x={1080} y={462} fontFamily={FUENTE.mano} fontWeight={700} fontSize={36} fill="#f3efe6">Hoy:</text>
        {['tacos dorados', 'tostadas', 'guisados'].map((l, i) => <text key={i} x={1090} y={502 + i * 34} fontFamily={FUENTE.mano} fontWeight={500} fontSize={30} fill="#f3efe6" opacity={0.9}>· {l}</text>)}
        <g transform="translate(1520 700)">
          {[[-110, '#8a3f22'], [40, '#7a3519']].map(([dx, c], i) => <g key={i} transform={`translate(${dx} 0)`}><path d="M -70 0 Q -96 -70 -50 -110 L 50 -110 Q 96 -70 70 0 Z" fill="url(#c-barro)" /><ellipse cx={0} cy={-112} rx={56} ry={14} fill="#2a140c" />
            {[0, 1, 2].map((k) => <path key={k} d={`M ${-20 + k * 20} -120 q ${12 * Math.sin(tl * 2 + k)} -40 0 -80 q ${-12 * Math.sin(tl * 2 + k)} -40 0 -80`} stroke="#fff" strokeOpacity={0.22} strokeWidth={14} fill="none" filter="url(#c-b8)" />)}</g>)}
        </g>
        <rect x={1040} y={720} width={720} height={190} fill="url(#c-madera-media)" /><rect x={1040} y={720} width={720} height={190} fill="#000" opacity={0.2} /><rect x={1040} y={716} width={720} height={12} fill="#fff" opacity={0.25} />
        <PapelPicado x0={1020} x1={1780} y={360} t={tl} />
        {/* cortinas metálicas enrolladas */}
        {[140, 1020].map((cx, i) => <g key={i}><rect x={cx - 10} y={330} width={780} height={46} rx={20} fill="url(#c-acero)" />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={cx - 10} y={336 + k * 7} width={780} height={2} fill="#000" opacity={0.2} />)}</g>)}
        <rect x={60} y={360} width={80} height={550} fill="#c56a40" /><rect x={900} y={360} width={120} height={550} fill="#c56a40" /><rect x={1780} y={360} width={80} height={550} fill="#c56a40" />
        <rect x={60} y={360} width={1800} height={550} fill="url(#c-papel-a)" opacity={0.25} />
        <g transform="translate(960 600) rotate(-1.5) scale(0.72)" opacity={cpop(p, 0.05, 0.15)}>
          <rect x={-150} y={-46} width={300} height={92} rx={8} fill="#1d4f9c" /><rect x={-150} y={-46} width={300} height={92} rx={8} fill="url(#c-arriba)" />
          <rect x={-142} y={-38} width={284} height={76} rx={5} fill="none" stroke="#fff" strokeWidth={3} />
          <text x={0} y={-6} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={22} letterSpacing={2} fill="#fff">COL.</text>
          <text x={0} y={24} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={800} fontSize={26} fill="#fff">PARAÍSOS DEL COLLI</text>
          <circle cx={-130} cy={-28} r={4} fill="#ccd" /><circle cx={130} cy={-28} r={4} fill="#ccd" />
        </g>
        {/* banqueta */}
        <rect x={-200} y={905} width={2320} height={40} fill="#cfc3ae" /><rect x={-200} y={940} width={2320} height={300} fill="#8d8476" /><rect x={-200} y={940} width={2320} height={10} fill="#000" opacity={0.2} />
      </g>
      {/* bugambilia en primer plano */}
      <g transform={capa(1.5)}><Desenfoque b={12}>
        {Array.from({ length: 40 }, (_, i) => { const r = R(80 + i); return <circle key={i} cx={1760 + r() * 300} cy={-40 + r() * 520} r={22 + r() * 30} fill={i % 4 ? '#d6267a' : '#3f7f34'} opacity={0.95} />; })}
      </Desenfoque></g>
      <Polvo n={40} t={tl} seed={33} o={0.5} />
      <Tinte color="#ffb35a" o={0.12} />
    </g>;
  },
};

/* ---------- vitamina T: tacos, tortillas y tostadas (toma cenital) ---------- */
function Tortilla({ x, y, r = 110, seed = 1, tostada = false }) {
  const rr = R(seed);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={tostada ? '#e2ad4c' : '#ecd49a'} /><circle r={r} fill="url(#c-esfera)" opacity={0.35} />
    {Array.from({ length: tostada ? 30 : 14 }, (_, i) => { const a = rr() * 6.28, d = Math.sqrt(rr()) * r * 0.9; return <ellipse key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} rx={3 + rr() * (tostada ? 6 : 12)} ry={2 + rr() * (tostada ? 4 : 8)} fill={tostada ? '#b97a24' : '#a8742e'} opacity={tostada ? 0.4 : 0.45} filter="url(#c-b1)" />; })}
    <circle r={r} fill="none" stroke={tostada ? '#b07a2a' : '#c9a35a'} strokeWidth={4} opacity={0.7} />
  </g>;
}
function Taco({ x, y, rot = 0, seed = 1 }) {
  const r = R(seed);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx={0} cy={10} rx={160} ry={52} fill="#000" opacity={0.3} filter="url(#c-b8)" />
    <path d="M -150 0 Q -150 -60 0 -62 Q 150 -60 150 0 Q 150 56 0 58 Q -150 56 -150 0 Z" fill="#e8cf95" />
    <path d="M -150 0 Q -150 -60 0 -62 Q 150 -60 150 0 Z" fill="#000" opacity={0.08} />
    {/* relleno visible por la abertura */}
    <path d="M -130 -6 Q 0 -40 130 -6 Q 0 26 -130 -6 Z" fill="#7a3a1c" />
    {Array.from({ length: 22 }, (_, i) => <rect key={i} x={-120 + r() * 230} y={-22 + r() * 26} width={10 + r() * 10} height={8 + r() * 8} rx={3} fill={['#8a4422', '#a0522d', '#6b2f16'][i % 3]} transform={`rotate(${r() * 90})`} />)}
    {Array.from({ length: 18 }, (_, i) => <rect key={'c' + i} x={-110 + r() * 220} y={-20 + r() * 22} width={8} height={8} rx={1} fill="#f7f4ec" opacity={0.95} />)}
    {Array.from({ length: 26 }, (_, i) => <path key={'v' + i} d={`M ${-110 + r() * 220} ${-18 + r() * 22} l 6 -5 l 4 6 Z`} fill="#3f9a3a" />)}
    <path d="M -100 -8 Q -40 4 10 -10 Q 60 -22 110 -4" stroke="#c42a1a" strokeWidth={7} fill="none" opacity={0.85} strokeLinecap="round" />
    <path d="M -140 -10 Q 0 -66 140 -10" stroke="#fff" strokeOpacity={0.25} strokeWidth={4} fill="none" />
  </g>;
}
ILUSC.vitamina_t = {
  cam: { z0: 1.12, z1: 1.0, fx: 960, fy: 540 },
  dibuja: ({ p, tl, capa, dur }) => {
    const giro = lerp(-3, 2, p);
    const etq = (txt, at, x, y) => { const e = cpr(p, at, at + 0.1, suave3), ly = 350; return <g opacity={e} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.75))' }}>
      <path d={`M ${x} ${y} L ${x} ${lerp(y, ly + 18, e)}`} stroke="#fff" strokeWidth={2.5} />
      <circle cx={x} cy={y} r={7} fill="#fff" /><circle cx={x} cy={y} r={16} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={2} />
      <text x={x} y={ly} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={600} fontSize={54} fill="#fff">{txt}</text>
    </g>; };
    return <g>
      <g transform={`${capa(1)} rotate(${giro} 960 540)`}>
        {/* mesa de madera oscura con mantel bordado */}
        <rect x={-300} y={-300} width={2520} height={1700} fill="url(#c-madera-oscura)" />
        <rect x={-300} y={-300} width={2520} height={1700} fill="#000" opacity={0.15} />
        <g transform="rotate(8 1060 680) translate(540 160)">
          <rect x={160} y={140} width={760} height={760} fill="#f4efe4" /><rect x={160} y={140} width={760} height={760} fill="url(#c-papel-a)" opacity={0.8} />
          {Array.from({ length: 24 }, (_, i) => { const r = R(300 + i), bx = 190 + (i % 6) * 128 + r() * 20, by = 170 + Math.floor(i / 6) * 220 + r() * 20, onEdge = (i % 6 === 0 || i % 6 === 5 || i < 6 || i > 17);
            return onEdge && <g key={i} transform={`translate(${bx} ${by})`}>{[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={0} cy={-11} rx={6} ry={11} fill={['#e6336d', '#2fa4d0', '#f4c23a', '#7a4fc0'][i % 4]} transform={`rotate(${k * 72})`} />)}<circle r={5} fill="#3fbf4a" /></g>; })}
        </g>
        {/* chiquihuite de tortillas */}
        <g transform="translate(1060 680) scale(0.92)">
          <circle r={300} fill="#000" opacity={0.35} filter="url(#c-b24)" />
          <circle r={290} fill="#b0844a" />
          {Array.from({ length: 9 }, (_, i) => <circle key={i} r={290 - i * 22} fill="none" stroke={i % 2 ? '#8a6232' : '#c99a5e'} strokeWidth={14} />)}
          {Array.from({ length: 72 }, (_, i) => <path key={'h' + i} d={`M 0 0 L ${Math.cos(i / 72 * 6.28) * 290} ${Math.sin(i / 72 * 6.28) * 290}`} stroke="#7a5428" strokeWidth={3} opacity={0.35} />)}
          <path d="M -250 -40 Q -140 -260 120 -250 Q 260 -120 230 60 Q 60 -20 -250 -40 Z" fill="#f2ece0" /><path d="M -250 -40 Q -140 -260 120 -250 Q 260 -120 230 60 Q 60 -20 -250 -40 Z" fill="url(#c-tela)" />
          {[0, 1, 2].map((k) => <Tortilla key={k} x={-30 + k * 8} y={60 - k * 6} r={200} seed={k + 3} />)}
          {[0, 1, 2, 3].map((k) => <path key={'v' + k} d={`M ${-80 + k * 50} 40 q ${20 * Math.sin(tl * 1.6 + k)} -80 0 -160 q ${-20 * Math.sin(tl * 1.6 + k)} -80 0 -160`} stroke="#fff" strokeOpacity={0.18} strokeWidth={30} fill="none" filter="url(#c-b14)" />)}
        </g>
        {/* plato de tacos con borde de talavera */}
        <g transform="translate(440 650) scale(0.92)">
          <circle r={290} fill="#000" opacity={0.35} filter="url(#c-b24)" />
          <circle r={280} fill="#f6f2ea" /><circle r={280} fill="none" stroke="#1f3f9e" strokeWidth={22} />
          {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={Math.cos(i / 24 * 6.28) * 252} cy={Math.sin(i / 24 * 6.28) * 252} r={7} fill="#e8a22a" />)}
          <circle r={230} fill="url(#c-esfera)" opacity={0.25} />
          <Taco x={-20} y={-90} rot={-12} seed={1} /><Taco x={10} y={20} rot={-6} seed={2} /><Taco x={-10} y={130} rot={-14} seed={3} />
          <g transform="translate(170 -170)"><circle r={44} fill="#8fc43a" /><circle r={38} fill="#cfe88a" />{Array.from({ length: 8 }, (_, k) => <path key={k} d={`M 0 0 L ${Math.cos(k * 0.785) * 36} ${Math.sin(k * 0.785) * 36}`} stroke="#9cc84a" strokeWidth={3} />)}</g>
        </g>
        {/* tostadas apiladas */}
        <g transform="translate(1610 650) scale(0.95)">
          <circle r={250} fill="#000" opacity={0.3} filter="url(#c-b24)" />
          <circle r={240} fill="#e6dfd2" /><circle r={240} fill="url(#c-esfera)" opacity={0.25} />
          {[0, 1, 2].map((k) => <Tortilla key={k} x={-10 + k * 10} y={10 - k * 10} r={200} seed={k + 10} tostada />)}
          <circle cx={0} cy={-20} r={150} fill="#5a2c1c" opacity={0.95} />
          {Array.from({ length: 40 }, (_, i) => { const r = R(500 + i); return <path key={i} d={`M ${-120 + r() * 240} ${-140 + r() * 240} q 12 -10 28 -2`} stroke={i % 3 ? '#7fc04a' : '#5fa83a'} strokeWidth={9} strokeLinecap="round" fill="none" />; })}
          <path d="M -90 -40 Q -20 -80 60 -30 Q 100 10 40 40" stroke="#f6f1e4" strokeWidth={16} fill="none" strokeLinecap="round" />
          {Array.from({ length: 30 }, (_, i) => { const r = R(700 + i); return <rect key={i} x={-110 + r() * 220} y={-120 + r() * 200} width={9} height={9} rx={2} fill="#fbf6ea" />; })}
        </g>
        {/* molcajete con salsa */}
        <g transform="translate(780 990) scale(0.8)">
          <circle r={150} fill="#000" opacity={0.35} filter="url(#c-b14)" />
          <circle r={140} fill="#3a3a3e" />{Array.from({ length: 60 }, (_, i) => { const r = R(900 + i), a = r() * 6.28, d = 100 + r() * 38; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={2 + r() * 4} fill="#1d1d20" />; })}
          <circle r={100} fill="#a3200f" /><circle r={100} fill="url(#c-esfera)" opacity={0.5} />
          {Array.from({ length: 30 }, (_, i) => { const r = R(950 + i), a = r() * 6.28, d = r() * 90; return <ellipse key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} rx={4} ry={2.5} fill={i % 3 ? '#f2d38a' : '#3f8a2a'} transform={`rotate(${r() * 180} ${Math.cos(a) * d} ${Math.sin(a) * d})`} />; })}
          <ellipse cx={-30} cy={-40} rx={30} ry={10} fill="#fff" opacity={0.35} transform="rotate(-30 -30 -40)" />
        </g>
      </g>
      <Tinte color="#ffb35a" o={0.14} />
      {/* rótulos tipo documental */}
      <g opacity={cpop(p, 0.02, 0.12)} style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,.7))' }}>
        <text x={960} y={110} textAnchor="middle" fontFamily={FUENTE.mono} fontWeight={700} fontSize={24} letterSpacing={10} fill="#F4C25A">LA FAMOSA</text>
        <text x={960} y={220} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={120} fill="#fff" style={{ fontVariationSettings: "'opsz' 144" }}>Vitamina <tspan fontStyle="italic" fill="#F4C25A">T</tspan></text>
      </g>
      {etq('Tacos', 0.14, 440, 560)}
      {etq('Tortillas', 0.3, 1060, 600)}
      {etq('Tostadas', 0.46, 1610, 600)}
      <NotaMano x={1290} y={215} texto="(culpa de mi papá)" tl={tl} at={0.62 * dur} tam={50} color="#fff" rot={-5} o={cpop(p, 0.6)} />
    </g>;
  },
};

/* ---------- "yo también quiero mi changarro" y los papás que dudan ---------- */
ILUSC.changarro = {
  cam: { z0: 1.0, z1: 1.06, fx: 900, fy: 600 },
  dibuja: ({ p, tl, capa }) => {
    const B = cpr(p, 0.47, 0.53);           // cambio de toma
    const sueno = cpr(p, 0.08, 0.2) * (1 - cpr(p, 0.42, 0.5));
    const fondo = <g transform={capa(0.5)}>
      <Pared color="#e9cfa8" luz={[0.7, 0.2]} />
      <rect x={-100} y={720} width={2120} height={420} fill="url(#c-madera-media)" /><rect x={-100} y={720} width={2120} height={420} fill="#000" opacity={0.3} />
      <PapelPicado x0={-100} x1={2020} y={40} t={tl} n={18} />
      <Desenfoque b={10}>
        <MonitorCRT x={300} y={640} s={1.1} t={tl} seed={2} /><MonitorCRT x={560} y={640} s={1.1} t={tl} seed={5} />
        <g transform="translate(1500 700)"><path d="M -90 0 Q -120 -90 -60 -140 L 60 -140 Q 120 -90 90 0 Z" fill="url(#c-barro)" />{[0, 1].map((k) => <path key={k} d={`M ${-20 + k * 40} -150 q 20 -60 0 -120`} stroke="#fff" strokeOpacity={0.3} strokeWidth={20} fill="none" />)}</g>
        <rect x={1200} y={520} width={300} height={200} fill="#1f2a22" />
      </Desenfoque>
      <Halo x={1500} y={300} r={420} color="#ffd9a0" o={0.5} />
    </g>;
    return <g>
      {/* toma A: el niño mira a sus papás trabajar y sueña con su puesto */}
      <g opacity={1 - B}>
        {fondo}
        <g transform={capa(0.75)}><Desenfoque b={4}>
          <Adulto x={1430} y={900} s={0.85} camisa="#6a4c9c" mujer piel="#eccdb2" pelo="#2a1a14" delantal="#f2ece0" brazoD={28 + 10 * Math.sin(tl * 3)} brazoI={18} t={tl} mira={[-1, 0.5]} seed={2} />
          <Adulto x={480} y={900} s={0.85} camisa="#2f6a8f" brazoD={22} brazoI={14} t={tl} mira={[1, 0.6]} seed={5} />
        </Desenfoque></g>
        <g transform={capa(1)}>
          <Nene x={640} y={1110} s={1.5} edad={5} t={tl} playera="#2f6fd0" cuerpo="busto" brazoD={4} brazoI={-4} mira={[1, -0.9]} boca="sonrisa" seed={7} />
          <rect x={300} y={866} width={1300} height={260} fill="url(#c-madera-media)" /><rect x={300} y={866} width={1300} height={260} fill="#000" opacity={0.35} />
          <rect x={300} y={830} width={1300} height={40} fill="url(#c-madera-clara)" /><rect x={300} y={828} width={1300} height={6} fill="#fff" opacity={0.3} />
        </g>
        {/* el sueño: su propio puesto de plantas */}
        <g opacity={sueno} transform={`translate(1360 300) scale(${0.9 + 0.1 * sueno})`}>
          <circle r={290} fill="#fff6dc" opacity={0.25} filter="url(#c-b24)" />
          <clipPath id="c-ch-sueno"><circle r={250} /></clipPath>
          <g clipPath="url(#c-ch-sueno)">
            <rect x={-260} y={-260} width={520} height={520} fill="#f6e4c0" />
            <rect x={-200} y={60} width={400} height={20} fill="url(#c-madera-clara)" />
            {[-140, -50, 40, 130].map((mx, i) => <MacetaC key={i} x={mx} y={62} w={76} h={66} s={1}><MataJitomate x={0} y={-58} s={0.32} t={tl} seed={i + 2} /></MacetaC>)}
            <rect x={-150} y={-190} width={300} height={70} rx={4} fill="#fff" /><text x={0} y={-140} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={56} fill="#2f8a3a">Plantas</text>
            <Nene x={0} y={250} s={0.42} edad={5} t={tl} playera="#2f6fd0" boca="risa" seed={9} brazoD={60} brazoI={60} />
            <rect x={-260} y={-260} width={520} height={520} fill="#ffcf8a" opacity={0.2} />
          </g>
          <circle r={250} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={4} filter="url(#c-b4)" />
          {[0, 1, 2].map((k) => <circle key={k} cx={-260 - k * 60} cy={190 + k * 60} r={22 - k * 6} fill="#fff" opacity={0.6} filter="url(#c-b2)" />)}
          <Polvo x={-260} y={-260} w={520} h={520} n={30} t={tl} seed={4} color="#fff" />
        </g>
      </g>
      {/* toma B: contracampo bajo — los papás lo ven muy chiquito */}
      <g opacity={B}>
        <g transform={capa(0.5)}><Pared color="#e2c69b" luz={[0.5, 0.15]} /><PapelPicado x0={-100} x1={2020} y={20} t={tl} n={18} /><Halo x={960} y={120} r={500} color="#fff0cc" o={0.6} /></g>
        <g transform={capa(1)}>
          <rect x={-100} y={930} width={2120} height={200} fill="#b9a48a" /><rect x={-100} y={930} width={2120} height={200} fill="url(#c-papel-a)" opacity={0.6} />
          <Adulto x={560} y={1000} s={1.2} camisa="#2f6a8f" cruzados t={tl} mira={[1, 1]} boca="seria" cejas={1} seed={5} />
          <Adulto x={1380} y={1000} s={1.2} camisa="#6a4c9c" mujer piel="#eccdb2" delantal="#f2ece0" cruzados t={tl} mira={[-1, 1]} boca="seria" cejas={1} seed={2} />
          <Nene x={960} y={1010} s={0.95} edad={5} t={tl} playera="#2f6fd0" brazoD={120} brazoI={120} mira={[0, -1]} boca="sonrisa" seed={7}
            detalle={<MacetaC x={0} y={-120} w={70} h={60}><MataJitomate x={0} y={-52} s={0.26} t={tl} seed={3} /></MacetaC>} />
        </g>
      </g>
      <Tinte color="#ffb35a" o={0.12} />
      <Polvo n={40} t={tl} seed={41} o={0.5} />
    </g>;
  },
};

Object.assign(window, { Caja, Camioneta, Casas, MonitorCRT, PapelPicado, Tortilla, Taco });
