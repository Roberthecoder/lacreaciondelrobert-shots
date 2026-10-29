// Shot Ambiental #20 · Ese cajón de cables viejos no es basura: es una mina — NARRADO (N2 el número + N4 la imagen que se llena).
// Datos: The Global E-waste Monitor 2024 (ITU y UNITAR, datos de 2022) y U.S. EPA (baterías de litio). Ver guion.md y verificacion.md.
// Todos los dibujos son esquemáticos.

const BE = { metal:'#3a3f4a', pantalla:'#1d2430', placa:'#1f8a4c', cobre:'#d9783a', oro:'#f2c230', hierro:'#8d96a3', madera:'#c98a4b', maderaO:'#9a6332' };

// Celular viejo (de frente). roto 0..1 = pantalla estrellada.
function Celular({ x, y, s = 1, rot = 0, roto = 0, color = BE.metal, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-46} y={-92} width={92} height={184} rx={16} fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={-36} y={-74} width={72} height={140} rx={6} fill={BE.pantalla} />
    <rect x={-30} y={-68} width={18} height={60} rx={4} fill="#fff" opacity=".12" />
    <circle cx={0} cy={80} r={6} fill="#555" />
    <rect x={-12} y={-86} width={24} height={5} rx={2} fill="#555" />
    {roto > 0 && <g stroke="#cfe3ff" strokeWidth={2.5} fill="none" opacity={roto}><path d="M 10 -20 L -20 -50 M 10 -20 L 30 -60 M 10 -20 L -30 20 M 10 -20 L 34 30 M 10 -20 L 0 60" /></g>}
  </g>;
}
// Cargador de pared con su cable.
function Cargador({ x, y, s = 1, rot = 0, o = 1, cola = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M 0 34 C 20 ${80 * cola} -60 ${100 * cola} -30 ${150 * cola} S 40 ${190 * cola} 10 ${230 * cola}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={`M 0 34 C 20 ${80 * cola} -60 ${100 * cola} -30 ${150 * cola} S 40 ${190 * cola} 10 ${230 * cola}`} stroke="#f2f2f2" strokeWidth={7} fill="none" strokeLinecap="round" />
    <rect x={-14} y={-60} width={8} height={26} rx={2} fill="#c8ccd2" stroke={KC.ink} strokeWidth={3} />
    <rect x={6} y={-60} width={8} height={26} rx={2} fill="#c8ccd2" stroke={KC.ink} strokeWidth={3} />
    <rect x={-32} y={-38} width={64} height={74} rx={12} fill="#f4f4f4" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cable enredado (rizos).
function CableEnredo({ x, y, s = 1, color = KC.ink, rot = 0, o = 1 }) {
  const d = 'M -120 0 C -100 -60 -40 -60 -50 0 S 10 60 20 0 S 80 -70 90 -10 S 140 50 120 10 C 100 -30 60 40 0 30 S -90 40 -120 0';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={d} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={d} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Batería de litio (esquema) con su etiqueta.
function PilaLitio({ x, y, s = 1, rot = 0, calor = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-90} width={120} height={180} rx={12} fill={mixHex('#3d7bd9', '#ff3b2f', kclamp(calor, 0, 1))} stroke={KC.ink} strokeWidth={6} />
    <rect x={-20} y={-104} width={40} height={16} rx={4} fill="#c8ccd2" stroke={KC.ink} strokeWidth={4} />
    <text y={8} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">Li-ion</text>
    <text y={52} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff">+</text>
  </g>;
}
// Placa de circuito de un celular por dentro (para la Lupa): pistas de cobre, contactos dorados y chips.
function Placa({ w, h, T = 0 }) {
  const r = krng(20), pistas = Array.from({ length: 14 }, () => ({ x: r() * w, y: r() * h, l: 60 + r() * 140, v: r() > 0.5 }));
  return <svg width={w} height={h}>
    <rect width={w} height={h} fill={BE.placa} />
    {pistas.map((p, i) => <path key={i} d={p.v ? `M ${p.x} ${p.y} v ${p.l} h 30` : `M ${p.x} ${p.y} h ${p.l} v 30`} stroke={BE.cobre} strokeWidth={6} fill="none" />)}
    {Array.from({ length: 10 }, (_, i) => <rect key={'g' + i} x={30 + (i % 5) * (w - 60) / 5} y={i < 5 ? 26 : h - 46} width={22} height={20} rx={3} fill={BE.oro} stroke={KC.ink} strokeWidth={2} opacity={0.75 + 0.25 * Math.sin(T * 4 + i)} />)}
    <rect x={w * 0.3} y={h * 0.35} width={w * 0.4} height={h * 0.3} rx={8} fill="#15171c" stroke="#999" strokeWidth={3} />
    <rect x={w * 0.1} y={h * 0.62} width={w * 0.16} height={h * 0.14} rx={5} fill="#15171c" />
  </svg>;
}
// Cajón de un mueble, abierto y visto de frente desde arriba. abierto 0..1. Los hijos se dibujan dentro del cajón (coordenadas locales, interior ≈ x -260..260, y -230..-60).
function Cajon({ x, y, s = 1, abierto = 1, children, telas = 0 }) {
  const dy = 90 * abierto;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-120} width={660} height={420} rx={14} fill={BE.maderaO} stroke={KC.ink} strokeWidth={8} />
    <rect x={-300} y={140} width={600} height={130} rx={10} fill={BE.madera} stroke={KC.ink} strokeWidth={6} />
    <rect x={-50} y={195} width={100} height={18} rx={9} fill="#e6d3a3" stroke={KC.ink} strokeWidth={4} />
    <g transform={`translate(0 ${dy})`}>
      <path d="M -280 -230 L 280 -230 L 300 -50 L -300 -50 Z" fill="#5b3a1c" stroke={KC.ink} strokeWidth={7} />
      {children}
      {telas > 0 && <g stroke="#fff" strokeWidth={2.5} fill="none" opacity={telas}>
        <path d="M -280 -230 L -180 -130 M -280 -230 L -280 -110 M -280 -230 L -160 -230 M -280 -180 Q -240 -190 -230 -230 M -280 -140 Q -210 -160 -200 -230" />
        <path d="M 280 -230 L 200 -150 M 280 -230 L 280 -130 M 280 -190 Q 240 -200 235 -230" /></g>}
      <rect x={-320} y={-60} width={640} height={130} rx={10} fill={BE.madera} stroke={KC.ink} strokeWidth={7} />
      <rect x={-50} y={-6} width={100} height={18} rx={9} fill="#e6d3a3" stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}
// Lo que hay en el cajón: celulares, cargadores y cables. sale 0..1 = se desbordan hacia arriba.
function ContenidoCajon({ T, sale = 0, n = 1 }) {
  const it = [
    (k) => <CableEnredo key="c1" x={-120} y={-150 - 200 * k} s={0.9} rot={-8 + 20 * k} color="#ffffff" />,
    (k) => <Celular key="p1" x={-200} y={-140 - 260 * k} s={0.7} rot={-20 - 30 * k} roto={1} />,
    (k) => <Cargador key="g1" x={60} y={-170 - 300 * k} s={0.7} rot={15 + 25 * k} />,
    (k) => <Celular key="p2" x={190} y={-150 - 230 * k} s={0.75} rot={18 + 20 * k} color="#7d4fd1" />,
    (k) => <CableEnredo key="c2" x={120} y={-110 - 120 * k} s={0.7} rot={12} color={KC.red} />,
    (k) => <Celular key="p3" x={-30} y={-120 - 340 * k} s={0.62} rot={6 - 40 * k} color="#d94f4f" roto={0.6} />,
  ];
  return <>{it.slice(0, Math.round(it.length * n)).map((f, i) => f(kEase.sale(kclamp(sale * 1.2 - i * 0.04, 0, 1))))}</>;
}
// Lingote de metal.
function Lingote({ x, y, color, s = 1, o = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -110 40 L -80 -40 L 80 -40 L 110 40 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -80 -40 L 80 -40 L 70 -20 L -70 -20 Z" fill="#fff" opacity=".35" />
    <path d={`M ${-60 + brillo * 120} -30 l 20 0 l -30 60 l -20 0 Z`} fill="#fff" opacity={0.5 * Math.sin(Math.PI * brillo)} />
  </g>;
}
// Lavadora y pantalla, para el montón.
function Lavadora({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-90} width={160} height={180} rx={14} fill="#eef2f6" stroke={KC.ink} strokeWidth={6} />
    <line x1={-80} y1={-55} x2={80} y2={-55} stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={15} r={50} fill="#9fd3ef" stroke={KC.ink} strokeWidth={6} />
    <circle cx={50} cy={-72} r={8} fill={KC.ink} />
  </g>;
}
function Pantalla({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-120} y={-75} width={240} height={150} rx={10} fill="#2a2e36" stroke={KC.ink} strokeWidth={6} />
    <rect x={-106} y={-62} width={212} height={124} rx={4} fill="#3b5068" />
    <path d="M -30 -20 L 20 30 M 20 -40 L -10 20" stroke="#cfe3ff" strokeWidth={3} />
  </g>;
}
// Montón de aparatos que crece (crece 0..1).
function Monton({ T, x, y, s = 1, crece = 1 }) {
  const r = krng(77), piezas = [];
  for (let i = 0; i < 26; i++) {
    const fila = Math.floor(Math.sqrt(i * 1.6)), px = (r() - 0.5) * (520 - fila * 70), py = -fila * 70 - r() * 30, tipo = i % 5, rot = (r() - 0.5) * 50;
    const k = kclamp(crece * 26 - i, 0, 1); if (k <= 0) continue;
    const yy = py - (1 - kEase.sale(k)) * 400;
    piezas.push(tipo === 0 ? <Lavadora key={i} x={px} y={yy} s={0.6} rot={rot * 0.4} /> : tipo === 1 ? <Pantalla key={i} x={px} y={yy} s={0.55} rot={rot * 0.5} />
      : tipo === 2 ? <Celular key={i} x={px} y={yy} s={0.55} rot={rot} roto={0.5} /> : tipo === 3 ? <Cargador key={i} x={px} y={yy} s={0.5} rot={rot} cola={0.5} /> : <CableEnredo key={i} x={px} y={yy} s={0.5} rot={rot} color="#ffffff" />);
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={60} rx={340} ry={40} fill="rgba(0,0,0,.25)" />
    {piezas}
  </g>;
}
// Silueta de persona con una bolsa de basura electrónica.
function PersonaBolsa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={42} fill={KC.ink} />
    <path d="M -55 -95 Q 0 -110 55 -95 L 60 40 L 30 40 L 25 150 L -25 150 L -30 40 L -60 40 Z" fill={KC.ink} />
    <path d="M 70 -20 Q 80 -60 110 -60 Q 140 -60 150 -20 Q 175 60 110 70 Q 45 60 70 -20 Z" fill="#2b2b2b" stroke={KC.ink} strokeWidth={4} />
    <path d="M 98 -60 L 110 -78 L 122 -60" stroke={KC.ink} strokeWidth={6} fill="none" />
    <line x1={60} y1={-20} x2={90} y2={-60} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <Celular x={110} y={0} s={0.3} rot={20} />
  </g>;
}
// Bote de basura de casa con tapa. abre 0..1.
function Bote({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -140 L 120 -140 L 95 160 L -95 160 Z" fill="#6b7685" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-50, 0, 50].map((k) => <line key={k} x1={k} y1={-110} x2={k * 0.8} y2={130} stroke={KC.ink} strokeWidth={5} opacity=".5" />)}
    <g transform={`translate(-130 -150) rotate(${-60 * abre})`}><rect x={0} y={-22} width={260} height={26} rx={8} fill="#56606e" stroke={KC.ink} strokeWidth={7} /><rect x={110} y={-38} width={40} height={18} rx={6} fill="#56606e" stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}
// Relleno sanitario en corte: capas de tierra y basura con aparatos enterrados. baja 0..1 = la tierra los cubre.
function Relleno({ T, x, y, w = 1000, baja = 1 }) {
  const r = krng(5);
  const enterrados = Array.from({ length: 12 }, (_, i) => ({ x: 60 + r() * (w - 120), y: 90 + r() * 240, t: i % 3, rot: (r() - 0.5) * 80 }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={420} fill="#7a5533" stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={150} width={w} height={14} fill="#5d3f24" /><rect x={0} y={290} width={w} height={14} fill="#5d3f24" />
    {enterrados.map((e, i) => e.t === 0 ? <Celular key={i} x={e.x} y={e.y} s={0.42} rot={e.rot} roto={1} /> : e.t === 1 ? <Cargador key={i} x={e.x} y={e.y} s={0.4} rot={e.rot} cola={0.4} /> : <Pantalla key={i} x={e.x} y={e.y} s={0.35} rot={e.rot * 0.5} />)}
    <rect x={0} y={-10} width={w} height={kclamp(baja, 0, 1) * 70} fill="#8a6a3e" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 -10 Q ${w * 0.25} -60 ${w * 0.5} -30 T ${w} -20 L ${w} -10 L 0 -10 Z`} fill="#6aa84f" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Camión recolector (de lado) con la prensa atrás. prensa 0..1.
function Camion({ x, y, s = 1, prensa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-360} y={-220} width={480} height={220} rx={18} fill="#2fa36b" stroke={KC.ink} strokeWidth={8} />
    <text x={-120} y={-100} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#eaffef">BASURA</text>
    <path d="M 120 -150 L 230 -150 L 280 -80 L 280 0 L 120 0 Z" fill="#f2f2f2" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 140 -132 L 222 -132 L 258 -84 L 140 -84 Z" fill="#9fd3ef" stroke={KC.ink} strokeWidth={5} />
    <path d="M -360 -200 L -470 -160 L -470 -10 L -360 -10 Z" fill="#268a5a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-455} y={-150 + prensa * 70} width={90} height={22} rx={6} fill="#c8ccd2" stroke={KC.ink} strokeWidth={5} />
    <line x1={-410} y1={-200} x2={-410} y2={-150 + prensa * 70} stroke={KC.ink} strokeWidth={8} />
    {[-260, 10, 200].map((cx) => <g key={cx}><circle cx={cx} cy={10} r={52} fill={KC.ink} /><circle cx={cx} cy={10} r={22} fill="#9aa3ad" /></g>)}
  </g>;
}
// Llama que parpadea.
function Llama({ T, x, y, s = 1, o = 1 }) {
  const f = 1 + 0.08 * Math.sin(T * 23), g = 1 + 0.1 * Math.sin(T * 17 + 1);
  return <g transform={`translate(${x} ${y}) scale(${s * f} ${s * g})`} opacity={o}>
    <path d="M 0 -170 C 60 -100 90 -60 70 0 C 55 40 -55 40 -70 0 C -90 -50 -40 -80 -20 -130 C -10 -90 10 -80 0 -170 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -90 C 30 -50 40 -20 30 5 C 20 25 -20 25 -30 5 C -40 -20 -10 -50 0 -90 Z" fill={KC.yellow} />
  </g>;
}
// Chispas que saltan.
function Chispas({ T, x, y, desde, n = 10 }) {
  if (T < desde) return null;
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => {
    const u = ((T - desde) * 1.6 + i / n) % 1, a = (i / n) * Math.PI * 2;
    return <line key={i} x1={Math.cos(a) * (20 + u * 120)} y1={Math.sin(a) * (20 + u * 120)} x2={Math.cos(a) * (40 + u * 150)} y2={Math.sin(a) * (40 + u * 150)} stroke={KC.yellow} strokeWidth={7} strokeLinecap="round" opacity={1 - u} />;
  })}</g>;
}
// Caja de acopio de electrónicos que brilla. brilla 0..1.
function CajaAcopio({ T, x, y, s = 1, brilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brilla > 0 && <circle cx={0} cy={-40} r={260 + 15 * Math.sin(T * 4)} fill={KC.gold2} opacity={0.35 * brilla} />}
    <path d="M -230 -120 L 230 -120 L 200 140 L -200 140 Z" fill="#2346ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-240} y={-150} width={480} height={36} rx={8} fill="#1a35c9" stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={-146} width={240} height={20} rx={8} fill={KC.ink} />
    <text y={-20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff">ACOPIO DE</text>
    <text y={60} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.yellow}>ELECTRÓNICOS</text>
  </g>;
}

function BasuraShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Monton, Me: CUES.Metales, P: CUES.Pregunta, R: CUES.Reciclado, B: CUES.Bote, Mx: CUES.Mexico, C: CUES.Cajon, L: CUES.Litio, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const abre0 = kprog(T, K.G, K.G + 0.5, kEase.rebote);
  // cuadrícula de 100 aparatos: 22 se reciclan
  const llen = kprog(T, K.R + 2.6, K.R + 4.6, kEase.suave) * 0.22;
  // camión: el celular cae y se aplasta
  const caeL = kprog(T, K.L + 0.4, K.L + 1.3, kEase.entra || ((p) => p * p));
  const prensa = kprog(T, K.L + 1.5, K.L + 2.3, kEase.suave);
  const fuego = kprog(T, K.L + 2.4, K.L + 3.0, kEase.sale);
  // cierre: el contenido viaja a la caja
  const vacia = kprog(T, K.Ci + 0.6, K.Ci + 2.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el cajón que se abre y desborda; la lupa ve metal adentro */}
      <Escena T={T} a={K.G} b={K.Mo}>
        <FondoLunares color={KC.yellow} />
        {svg(<Cajon x={480} y={1000} s={1} abierto={abre0}><ContenidoCajon T={T} sale={kprog(T, K.G + 0.15, K.G + 1.2) * 0.35} /></Cajon>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.G + 1.3} until={K.Mo - 0.1} x={410} y={560} r={190} fx={300} fy={880} tinte={KC.gold2} etiqueta="POR DENTRO · placa de un celular"
        interior={(t, r) => <Placa w={r * 2} h={r * 2} T={T} />} />
      {/* 2 · el montón mundial: 62 millones de toneladas */}
      <Escena T={T} a={K.Mo} b={K.Me} zoom={-0.04}>
        <FondoLunares color={KC.orange} />
        {svg(<><Monton T={T} x={430} y={1070} s={1.05} crece={kprog(T, K.Mo, K.Mo + 3.0, kEase.suave)} />
          <g opacity={kprog(T, K.Mo + 3.2, K.Mo + 3.7)}><PersonaBolsa x={880} y={1010} s={0.85} /></g></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · los metales adentro: USD 91 mil millones */}
      <Escena T={T} a={K.Me} b={K.P}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.10)" />
        {svg(<>{[[BE.cobre, 220, 0], [BE.oro, 540, 0.5], [BE.hierro, 860, 1.0]].map(([c, x, d], i) => {
          const k = kprog(T, K.Me + 1.4 + d, K.Me + 2.0 + d, kEase.rebote);
          return <Lingote key={i} x={x} y={klerp(1150, 900, k)} color={c} s={1.25} o={kprog(T, K.Me + 1.4 + d, K.Me + 1.6 + d)} brillo={kprog(T, K.Me + 2.2 + d, K.Me + 3.0 + d)} />; })}</>)}
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Monton T={T} x={300} y={1120} s={0.6} crece={1} />
          <text x={280} y={900} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 750)`}>?</text></>)}
      </Escena>
      {/* 5 · el informe y la cuadrícula de 100: solo 22 se reciclan de forma registrada */}
      <Escena T={T} a={K.R} b={K.B}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:170, top:530, width:520, height:520, background:'rgba(14,15,18,.85)', borderRadius:30, border:`6px solid ${KC.ink}`, opacity:kprog(T, K.R + 2.3, K.R + 2.7) }}></div>
        {T > K.R + 2.3 && <Cuadricula T={T} cols={10} filas={10} llenado={llen} x={190} y={550} ancho={480} alto={480} lleno={KC.leaf} vacio="rgba(255,255,255,.18)" />}
      </Escena>
      <TarjetaEstudio T={T} at={K.R + 0.2} until={K.R + 2.3} anio="2024" quien="Global E-waste Monitor" revista="ONU: UIT + UNITAR · datos de 2022" x={540} y={760} />
      {/* 6 · al bote y al relleno */}
      <Escena T={T} a={K.B} b={K.Mx}>
        <FondoLunares color={KC.cyan} />
        {svg(<><g opacity={1 - kprog(T, K.B + 3.0, K.B + 3.6)}>
            <Bote x={540} y={960} s={1.2} abre={kprog(T, K.B + 0.1, K.B + 0.5, kEase.sale) * (1 - kprog(T, K.B + 2.4, K.B + 2.8))} />
            {[0, 1, 2].map((i) => { const u = kprog(T, K.B + 0.6 + i * 0.5, K.B + 1.2 + i * 0.5, (p) => p * p); return u < 1 ? (i === 1 ? <Cargador key={i} x={500 + i * 30} y={klerp(380, 780, u)} s={0.6} rot={u * 200} cola={0.5} /> : <Celular key={i} x={480 + i * 40} y={klerp(380, 780, u)} s={0.6} rot={u * 300 + i * 40} />) : null; })}</g>
          <g opacity={kprog(T, K.B + 3.0, K.B + 3.6)}><Relleno T={T} x={40} y={700} w={1000} baja={kprog(T, K.B + 3.8, K.B + 5.2, kEase.suave)} /></g></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · México */}
      <Escena T={T} a={K.Mx} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={60} y={600} ancho={900} conCA={false}>
          <g transform={`translate(${mxProy(-99.1, 19.4)[0]} ${mxProy(-99.1, 19.4)[1] - 10}) scale(${1 / 0.9})`}><Monton T={T} x={0} y={0} s={0.42} crece={kprog(T, K.Mx + 0.3, K.Mx + 2.2, kEase.suave)} /></g>
        </MapaMexico>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Medidor T={T} at={K.Mx + 3.2} until={K.C - 0.2} valor={(t) => 0.035 * kprog(t, K.Mx + 3.6, K.Mx + 5.0, kEase.suave)} etiqueta="recolectado formalmente" texto={(v) => kformato(v * 100, 1) + ' %'} x={90} y={1060} ancho={900} color={KC.red} />
      {/* 8 · el cajón olvidado */}
      <Escena T={T} a={K.C} b={K.L}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Cajon x={540} y={1000} abierto={1} telas={kprog(T, K.C + 1.0, K.C + 2.5)}><ContenidoCajon T={T} sale={0} /></Cajon>
          {/* calendario que pasa hojas */}
          <g transform="translate(870 720)">
            <rect x={-90} y={-100} width={180} height={190} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-90} y={-100} width={180} height={50} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={50} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>{2022 + Math.min(4, Math.floor(kprog(T, K.C + 0.8, K.C + 4.0) * 4.99))}</text>
          </g></>)}
      </Escena>
      {/* 9 · la batería de litio en el camión */}
      <Escena T={T} a={K.L} b={K.Ci}>
        <FondoLunares color={KC.pink} />
        {svg(<><Camion x={600} y={1080} s={1.05} prensa={prensa} />
          {caeL < 1 && <Celular x={160} y={klerp(400, 900, caeL)} s={0.6} rot={caeL * 280} />}
          {T > K.L + 2.0 && <g><PilaLitio x={190} y={700} s={0.9} rot={-10} calor={fuego} /><Chispas T={T} x={190} y={700} desde={K.L + 2.3} /></g>}
          <Llama T={T} x={150} y={930} s={1.1 * fuego} o={fuego} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: el cajón del inicio, vaciado en la caja de acopio */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Cajon x={300} y={1030} s={0.62} abierto={1}><ContenidoCajon T={T} sale={0} n={1 - vacia} /></Cajon>
          {vacia > 0 && vacia < 1 && [0, 1, 2].map((i) => { const u = kclamp(vacia * 1.4 - i * 0.2, 0, 1); return u > 0 && u < 1 ? <Celular key={i} x={klerp(300, 760, u)} y={klerp(900, 820, u) - Math.sin(Math.PI * u) * 260} s={0.45} rot={u * 360} /> : null; })}
          <CajaAcopio T={T} x={780} y={1000} s={0.75} brilla={kprog(T, K.Ci + 1.6, K.Ci + 2.4)} /></>)}
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.9} until={K.Mo - 0.2} texto="no es basura: es una mina" y={1500} x={540} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Mo + 0.3} until={K.Me - 0.2} valor={62} dur={1.4} sufijo=" millones de t" etiqueta="basura electrónica, 2022:" x={370} y={470} tam={84} color={KC.yellow} />
      <Chip T={T} at={K.Mo + 3.6} until={K.Me - 0.2} texto="7.8 kg por persona" y={1500} x={540} tam={38} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Me + 0.3} until={K.P - 0.2} valor={91} dur={1.2} prefijo="USD " sufijo=" mil millones" etiqueta="metales adentro (2022):" x={540} y={600} tam={100} color={KC.gold2} />
      <Etq T={T} at={K.Me + 2.0} until={K.P - 0.2} x={120} y={1010} texto="cobre · 19" lado="der" tam={30} />
      <Etq T={T} at={K.Me + 2.5} until={K.P - 0.2} x={450} y={1010} texto="oro · 15" lado="der" tam={30} />
      <Etq T={T} at={K.Me + 3.0} until={K.P - 0.2} x={740} y={1010} texto="hierro · 16" lado="der" tam={30} />
      <Chip T={T} at={K.Me + 3.4} until={K.P - 0.2} texto="miles de millones de dólares" y={1470} x={540} tam={30} borde={KC.gold} mono />
      <NumeroGigante T={T} at={K.R + 2.6} until={K.B - 0.2} valor={22.3} dec={1} dur={2.0} sufijo=" %" x={380} y={420} tam={120} color={KC.leaf} />
      <Chip T={T} at={K.R + 3.2} until={K.B - 0.2} texto="recolectado y reciclado formalmente" y={1110} x={540} tam={32} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.B + 0.8} until={K.Mx - 0.2} valor={14} dur={1.2} sufijo=" millones de t" etiqueta="al bote de basura normal:" x={640} y={470} tam={80} color={KC.yellow} />
      <Etq T={T} at={K.B + 4.2} until={K.Mx - 0.2} x={1000} y={830} texto="relleno sanitario" lado="izq" tam={30} color={KC.texto} />
      <NumeroGigante T={T} at={K.Mx + 0.5} until={K.C - 0.2} valor={1499} dur={1.4} sufijo=" millones de kg" etiqueta="México, 2022:" x={400} y={480} tam={66} color={KC.orange} />
      <Chip T={T} at={K.C + 0.4} until={K.L - 0.2} texto="lo chico se queda años guardado" y={500} x={650} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.L + 1.0} until={K.Ci - 0.2} texto="litio aplastado = riesgo de incendio" y={1540} x={540} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ci + 2.2} until={K.Ou - 0.1} texto="al acopio, no al bote" y={470} x={400} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mo - 0.1} texto="No es basura: *es una mina.*" />
      <Subtitulo T={T} idx={1} at={K.Mo + 0.1} until={K.Me - 0.1} texto="2022: *62 millones de toneladas.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.P - 0.1} texto="Metales por *91 mil millones de dólares.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.R - 0.1} texto="¿Cuánta se recicló *de forma segura?*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.B - 0.1} texto="Según la ONU: *solo el 22 %.*" />
      <Subtitulo T={T} idx={5} at={K.B + 0.1} until={K.Mx - 0.1} texto="14 millones de toneladas *al bote.*" />
      <Subtitulo T={T} idx={6} at={K.Mx + 0.1} until={K.C - 0.1} texto="México: *solo el 3.5 %.*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.L - 0.1} texto="Lo chico se queda *en un cajón.*" />
      <Subtitulo T={T} idx={8} at={K.L + 0.1} until={K.Ci - 0.1} texto="Batería de litio: *riesgo de incendio.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Llévala a un *centro de acopio.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Monton + 2.4, CUES.Metales + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Reciclado - 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Reciclado + 3.4, CUES.Bote - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Bote + 2.6, CUES.Mexico + 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Mexico + 3.0, CUES.Cajon - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cajon + 1.8, CUES.Litio + 0.2, 'avatar_03_aburrido_manos_mejillas', 'izq-alto'],
        [CUES.Litio + 1.6, CUES.Cierre - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="20" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BasuraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BasuraShot /></CompositionStage></div>;
}
window.BasuraApp = BasuraApp;
