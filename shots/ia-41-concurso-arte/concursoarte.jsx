// Shot IA #41 · La imagen hecha con IA que ganó un concurso de arte — NARRADO (N5 reto + N2 números).
// Datos: Junta de Revisión de la Oficina de Derechos de Autor de EE. UU. (5 sep 2023), Smithsonian/Pueblo Chieftain (2022),
// demanda Allen v. Perlmutter (D. Colo., 2024), comunicado de Boris Eldagsen (13 abr 2023), USCO Parte 2 (ene 2025). Ver guion.md y verificacion.md.
// Las obras son DIBUJOS PROPIOS que evocan; no son copias de las originales.
const AZUL = '#2f6dff';

/* ---------- las obras (dibujos propios) ---------- */
function ObraBodegon({ id }) {
  return <g>
    <defs><radialGradient id={`bod-${id}`} cx="40%" cy="35%" r="80%"><stop offset="0" stopColor="#7a5236" /><stop offset="1" stopColor="#2a170c" /></radialGradient></defs>
    <rect x={-125} y={-160} width={250} height={320} fill={`url(#bod-${id})`} />
    <rect x={-125} y={70} width={250} height={90} fill="#5b2f17" /><rect x={-125} y={64} width={250} height={12} fill="#8a4b25" />
    <path d="M -80 60 Q 0 120 80 60 Z" fill="#c9d3dc" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-35} cy={38} r={30} fill="#d8342b" stroke={KC.ink} strokeWidth={4} /><circle cx={-45} cy={28} r={8} fill="#ff8a7a" />
    <path d="M 20 60 Q -2 30 18 6 Q 22 -14 32 -14 Q 42 -14 46 6 Q 66 30 44 60 Z" fill="#c8c23a" stroke={KC.ink} strokeWidth={4} />
    <line x1={32} y1={-14} x2={36} y2={-30} stroke={KC.ink} strokeWidth={4} />
    {[[-4, 20], [8, 30], [-14, 32], [0, 42], [12, 46], [-8, 50]].map(([gx, gy], i) => <circle key={i} cx={gx + 70} cy={gy + 12} r={11} fill="#6b2a7a" stroke={KC.ink} strokeWidth={3} />)}
    <path d="M 78 20 q 8 -16 20 -14" stroke="#3f7a2a" strokeWidth={5} fill="none" />
  </g>;
}
function ObraPaisaje({ id }) {
  return <g>
    <defs><linearGradient id={`pai-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd6f2" /><stop offset="0.6" stopColor="#ffd9b0" /><stop offset="1" stopColor="#ffe9c9" /></linearGradient></defs>
    <rect x={-125} y={-160} width={250} height={320} fill={`url(#pai-${id})`} />
    <circle cx={55} cy={-80} r={30} fill="#ffcf4a" opacity=".9" />
    <path d="M -125 40 L -60 -60 L -20 0 L 30 -90 L 125 30 L 125 160 L -125 160 Z" fill="#6f8fc4" opacity=".75" />
    <path d="M -125 70 L -70 0 L 0 60 L 60 10 L 125 70 L 125 160 L -125 160 Z" fill="#4f7aa8" opacity=".8" />
    <path d="M 30 -90 L 12 -62 L 22 -58 L 30 -70 L 40 -60 L 48 -64 Z" fill="#fff" opacity=".9" />
    <rect x={-125} y={95} width={250} height={65} fill="#7fc3d8" opacity=".85" />
    <path d="M -100 115 h 60 M -10 128 h 70 M 40 145 h 50" stroke="#fff" strokeWidth={4} opacity=".7" strokeLinecap="round" />
    <path d="M -125 160 L -125 120 Q -80 100 -40 125 L -40 160 Z" fill="#3f7a4a" />
  </g>;
}
// "Teatro espacial" evocado: salón oscuro, ventana redonda de luz y figuras de túnica (dibujo propio).
function ObraTeatro({ id, T = 0 }) {
  const g = 0.85 + 0.15 * Math.sin(T * 2.2);
  return <g>
    <defs>
      <linearGradient id={`tea-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2412" /><stop offset="1" stopColor="#120a05" /></linearGradient>
      <radialGradient id={`luz-${id}`} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fffbe8" /><stop offset="0.55" stopColor="#ffd77a" /><stop offset="1" stopColor="#c7792a" /></radialGradient>
    </defs>
    <rect x={-125} y={-160} width={250} height={320} fill={`url(#tea-${id})`} />
    <path d="M 0 -40 L -125 110 L -125 160 L 125 160 L 125 110 Z" fill="#ffd77a" opacity={0.18 * g} />
    <circle cx={0} cy={-40} r={86} fill="#5a3a1c" stroke="#b9852f" strokeWidth={8} />
    <circle cx={0} cy={-40} r={74} fill={`url(#luz-${id})`} opacity={g} />
    <path d="M -74 -20 Q -30 -40 0 -24 Q 30 -40 74 -22 L 74 0 L -74 0 Z" fill="#e8a64a" opacity=".55" />
    {[-52, -26, 0, 26, 52].map((rx) => <line key={rx} x1={rx} y1={-112} x2={rx} y2={32} stroke="#5a3a1c" strokeWidth={3} opacity=".6" />)}
    <path d="M -125 -160 L -95 -160 L -95 160 L -125 160 Z" fill="#2a1a0c" /><path d="M 125 -160 L 95 -160 L 95 160 L 125 160 Z" fill="#2a1a0c" />
    <path d="M -95 -160 Q 0 -200 95 -160" stroke="#b9852f" strokeWidth={6} fill="none" />
    <rect x={-125} y={110} width={250} height={50} fill="#24160b" />
    {[[-52, 1], [0, 1.15], [50, 0.95]].map(([fx, fs], i) => <g key={i} transform={`translate(${fx} 118) scale(${fs})`}>
      <path d="M -20 0 Q -16 -50 -8 -62 L 8 -62 Q 16 -50 20 0 Z" fill={['#7a2f3a', '#3c3550', '#6b5530'][i]} stroke="#120a05" strokeWidth={3} />
      <circle cx={0} cy={-70} r={10} fill="#2a1a0c" /><path d="M -12 -72 Q 0 -90 12 -72" fill={['#c7a24a', '#9a8a70', '#c7a24a'][i]} />
    </g>)}
  </g>;
}
// "Foto" antigua en blanco y negro evocada (dibujo propio): dos mujeres, una detrás de la otra.
function ObraFotoBN({ id }) {
  return <g>
    <defs><radialGradient id={`fbn-${id}`} cx="50%" cy="45%" r="75%"><stop offset="0" stopColor="#bdbdbd" /><stop offset="1" stopColor="#3a3a3a" /></radialGradient></defs>
    <rect x={-125} y={-160} width={250} height={320} fill={`url(#fbn-${id})`} />
    <g transform="translate(-28 -10)"><circle cx={0} cy={-60} r={34} fill="#6a6a6a" /><path d="M -34 -66 Q 0 -110 34 -66 Q 30 -86 0 -92 Q -30 -86 -34 -66 Z" fill="#2f2f2f" />
      <path d="M -60 170 Q -60 -10 0 -20 Q 60 -10 60 170 Z" fill="#4a4a4a" /></g>
    <g transform="translate(30 30)"><circle cx={0} cy={-60} r={36} fill="#9a9a9a" /><path d="M -36 -64 Q 0 -114 36 -64 L 40 -30 Q 30 -80 0 -84 Q -30 -80 -40 -30 Z" fill="#1f1f1f" />
      <path d="M -64 140 Q -64 -10 0 -20 Q 64 -10 64 140 Z" fill="#d5d5d5" /></g>
    <path d="M -52 30 Q -20 20 4 34" stroke="#5a5a5a" strokeWidth={14} fill="none" strokeLinecap="round" />
    <rect x={-125} y={-160} width={250} height={320} fill="none" stroke="#1a1a1a" strokeWidth={26} opacity=".35" />
    <path d="M -80 -150 L -70 -40 M 60 -100 L 64 20" stroke="#fff" strokeWidth={1.5} opacity=".35" />
  </g>;
}
// Cuadro con marco dorado. tipo: bodegon | paisaje | teatro | foto. dim 0..1 lo oscurece.
function Cuadro({ x, y, s = 1, tipo, T = 0, dim = 0, id = 'a', rot = 0, marco = KC.gold }) {
  const cid = `clip-${tipo}-${id}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={cid}><rect x={-125} y={-160} width={250} height={320} /></clipPath></defs>
    <rect x={-150} y={-185} width={300} height={370} rx={10} fill={marco} stroke={KC.ink} strokeWidth={8} />
    <rect x={-138} y={-173} width={276} height={346} rx={6} fill="none" stroke="#fff3c4" strokeWidth={3} opacity=".6" />
    <g clipPath={`url(#${cid})`}>
      {tipo === 'bodegon' && <ObraBodegon id={id} />}{tipo === 'paisaje' && <ObraPaisaje id={id} />}
      {tipo === 'teatro' && <ObraTeatro id={id} T={T} />}{tipo === 'foto' && <ObraFotoBN id={id} />}
      {dim > 0 && <rect x={-125} y={-160} width={250} height={320} fill="#000" opacity={dim * 0.65} />}
    </g>
    <rect x={-125} y={-160} width={250} height={320} fill="none" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Listón de primer lugar.
function Liston({ x, y, s = 1, texto = '1.er' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 30 L -60 140 L -28 120 L -10 150 L 0 40 Z" fill={AZUL} stroke={KC.ink} strokeWidth={5} />
    <path d="M 34 30 L 60 140 L 28 120 L 10 150 L 0 40 Z" fill={AZUL} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 58} cy={Math.sin(a) * 58} r={16} fill={AZUL} stroke={KC.ink} strokeWidth={4} />; })}
    <circle r={56} fill={AZUL} /><circle r={44} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={AZUL}>{texto}</text>
  </g>;
}
// Juez con lupa.
function Juez({ x, y, s = 1, T = 0, color = '#3c4a6b', piel = '#e9b48a', seed = 0, pelo = '#2a1a0c' }) {
  const b = Math.sin(T * 2.5 + seed) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -80 220 Q -84 40 0 30 Q 84 40 80 220 Z" fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -16 34 L 0 90 L 16 34 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-30} r={56} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -56 -40 Q -50 -96 0 -92 Q 50 -96 56 -40 Q 30 -70 0 -66 Q -30 -70 -56 -40 Z" fill={pelo} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-20} cy={-30} r={7} fill={KC.ink} /><circle cx={20} cy={-30} r={7} fill={KC.ink} />
    <path d="M -16 2 Q 0 10 16 2" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${-30 + Math.sin(T * 1.8 + seed) * 8} 60 60)`}>
      <line x1={60} y1={60} x2={110} y2={-10} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
      <circle cx={126} cy={-34} r={36} fill="rgba(160,220,255,.45)" stroke={KC.ink} strokeWidth={9} />
    </g>
  </g>;
}
// Burbuja de diálogo (HTML).
function Burbuja({ T, at, until, x, y, texto, tam = 40, cola = 'abajo' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o }}>
    <div style={{ position:'relative', background:'#fff', border:`6px solid ${KC.ink}`, borderRadius:30, padding:'16px 28px', font:`900 ${tam}px/1.15 ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap', boxShadow:`8px 8px 0 ${KC.ink}` }}>
      {texto}
      <div style={{ position:'absolute', left: cola === 'abajo' ? 50 : 'auto', right: cola === 'abajo-der' ? 50 : 'auto', bottom:-30, width:0, height:0, borderLeft:'18px solid transparent', borderRight:'18px solid transparent', borderTop:`30px solid ${KC.ink}` }}></div>
    </div>
  </div>;
}
// Monitor que va llenándose de miniaturas (versiones generadas).
function Monitor({ x, y, T, n, s = 1, titulo = '' }) {
  const r = krng(7), mini = Array.from({ length: 30 }, () => ({ cx: -30 + r() * 60, cy: -30 + r() * 30, rr: 10 + r() * 14, h: r() }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-360} y={-250} width={720} height={460} rx={26} fill="#2b3445" stroke={KC.ink} strokeWidth={9} />
    <rect x={-330} y={-220} width={660} height={400} rx={12} fill="#0d1424" />
    <rect x={-330} y={-220} width={660} height={40} rx={12} fill="#1d2638" />
    <circle cx={-305} cy={-200} r={8} fill={KC.red} /><circle cx={-280} cy={-200} r={8} fill={KC.yellow} /><circle cx={-255} cy={-200} r={8} fill={KC.mint} />
    <text x={0} y={-192} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>{titulo}</text>
    {Array.from({ length: 30 }, (_, i) => { if (i >= n) return null; const c = i % 6, f = Math.floor(i / 6), px = -300 + c * 104, py = -168 + f * 68, m = mini[i];
      return <g key={i} transform={`translate(${px} ${py})`}>
        <rect width={90} height={58} rx={6} fill={mixHex('#3a2412', '#24304a', m.h)} stroke="#000" strokeWidth={2} />
        <circle cx={45 + m.cx * 0.5} cy={26 + m.cy * 0.3} r={m.rr * 0.8} fill={mixHex('#ffd77a', '#ffb0d0', m.h)} />
        <rect y={44} width={90} height={14} fill="#140c06" opacity=".8" />
      </g>; })}
    <rect x={-60} y={210} width={120} height={50} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={256} width={300} height={22} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Balanza: mano con lápiz contra el robotito.
function Balanza({ x, y, s = 1, T = 0 }) {
  const a = Math.sin(T * 1.6) * 9, rad = a * Math.PI / 180, dx = 190 * Math.cos(rad), dy = 190 * Math.sin(rad);
  const Plato = ({ px, py, children }) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-70} y2={150} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={70} y2={150} stroke={KC.ink} strokeWidth={5} />
    <path d="M -100 150 Q 0 200 100 150 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={7} />{children}</g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={360} width={180} height={34} rx={12} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <rect x={-14} y={0} width={28} height={364} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <line x1={-dx} y1={-dy} x2={dx} y2={dy} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <circle r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <Plato px={-dx} py={-dy}>
      <g transform="translate(0 120) rotate(-30)"><rect x={-12} y={-80} width={24} height={110} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /><path d="M -12 30 L 0 56 L 12 30 Z" fill="#f1c9a0" stroke={KC.ink} strokeWidth={5} /><rect x={-12} y={-96} width={24} height={18} fill={KC.pink} stroke={KC.ink} strokeWidth={5} /></g>
      <path d="M -60 140 Q -64 100 -30 96 L 30 104 Q 44 110 30 122 L -10 124 Q 10 140 -20 150 Z" fill="#e9b48a" stroke={KC.ink} strokeWidth={5} />
    </Plato>
    <Plato px={dx} py={dy}><Robotito x={0} y={88} s={0.42} T={T} cara="duda" /></Plato>
  </g>;
}
// Máquina de imágenes (caja con engranes que gira).
function Maquina({ x, y, s = 1, T = 0, etiqueta = 'Midjourney' }) {
  const Engrane = ({ cx, cy, r, v }) => <g transform={`translate(${cx} ${cy}) rotate(${T * v})`}>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-8} y={-r - 12} width={16} height={22} fill={KC.gold} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><circle r={r * 0.35} fill="#2b3445" stroke={KC.ink} strokeWidth={4} /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-150} width={340} height={300} rx={34} fill="#2b3445" stroke={KC.ink} strokeWidth={9} />
    <rect x={-200} y={-50} width={40} height={100} fill="#1d2638" stroke={KC.ink} strokeWidth={6} />
    <rect x={160} y={-50} width={40} height={100} fill="#1d2638" stroke={KC.ink} strokeWidth={6} />
    <Engrane cx={-55} cy={-20} r={50} v={160} /><Engrane cx={62} cy={30} r={40} v={-200} />
    <text x={0} y={128} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan}>{etiqueta}</text>
  </g>;
}
// Sello "REGISTRO NEGADO".
function Sello({ x, y, p = 1, texto = 'REGISTRO NEGADO' }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(-12) scale(${klerp(2.4, 1, p)})`} opacity={Math.min(1, p * 2)}>
    <rect x={-250} y={-64} width={500} height={128} rx={20} fill="rgba(255,59,47,.14)" stroke={KC.red} strokeWidth={11} />
    <text y={24} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.red}>{texto}</text>
  </g>;
}
// Mazo de juzgado (golpe: 0..1 animación de golpe).
function Mazo({ x, y, s = 1, golpe = 0 }) {
  const ang = -40 + 40 * Math.sin(Math.PI * kclamp(golpe, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={60} width={220} height={40} rx={12} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${-ang} 90 -40)`}>
      <rect x={-60} y={-60} width={170} height={22} rx={10} fill="#a8692f" stroke={KC.ink} strokeWidth={6} transform="rotate(-30 90 -40)" />
      <rect x={-110} y={-20} width={120} height={64} rx={14} fill="#8a5426" stroke={KC.ink} strokeWidth={7} />
    </g>
  </g>;
}
// Trofeo.
function Trofeo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -120 L 70 -120 Q 70 -10 0 10 Q -70 -10 -70 -120 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -100 Q -120 -100 -110 -60 Q -100 -30 -60 -40" fill="none" stroke={KC.ink} strokeWidth={10} />
    <path d="M 70 -100 Q 120 -100 110 -60 Q 100 -30 60 -40" fill="none" stroke={KC.ink} strokeWidth={10} />
    <rect x={-14} y={8} width={28} height={50} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={56} width={120} height={36} rx={8} fill="#5a3a1c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -100 Q -46 -50 -20 -26" stroke="#fff3c4" strokeWidth={8} fill="none" opacity=".7" strokeLinecap="round" />
  </g>;
}
// Tarjeta de regla (✔ / ✘).
function Regla({ T, at, until, x, y, ok, titulo, texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), c = ok ? KC.leaf : KC.red;
  return <div style={{ position:'absolute', left:x, top:y, width:440, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:28, padding:'22px 26px 26px', boxShadow:`12px 12px 0 ${KC.ink}`, textAlign:'center' }}>
    <div style={{ font:`400 120px/1 ${KF.titulo}`, color:c, WebkitTextStroke:`4px ${KC.ink}` }}>{ok ? '✔' : '✘'}</div>
    <div style={{ font:`900 40px/1.12 ${KF.texto}`, color:KC.ink, marginTop:10 }}>{titulo}</div>
    <div style={{ font:`700 26px/1.25 ${KF.mono}`, color:'#5a524a', marginTop:12 }}>{texto}</div>
  </div>;
}
// Cita con autor.
function Cita({ T, at, until, texto, quien, y = 560 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:70, right:70, top:y, zIndex:43, transform:`translateY(-50%) scale(${e.s}) rotate(-1.5deg)`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'20px 34px', boxShadow:`12px 12px 0 ${KC.ink}`, textAlign:'center' }}>
    <div style={{ font:`400 92px/1.05 ${KF.titulo}`, color:KC.ink }}>{texto}</div>
    <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:10 }}>{quien}</div>
  </div>;
}
// Medidor "mano humana" sobre un cuadro (HTML, para el cierre).
function ManoHumana({ T, at, x, y, partes, etiqueta }) {
  if (T < at) return null;
  const g = kprog(T, at, at + 0.9, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, width:250, transform:'translate(-50%,-50%)', zIndex:41, opacity:Math.min(1, g * 2), textAlign:'center' }}>
    <div style={{ height:34, border:`5px solid ${KC.ink}`, borderRadius:12, background:'#fff', overflow:'hidden', display:'flex' }}>
      {partes.map((p, i) => <div key={i} style={{ width:`${p.v * g * 100}%`, background:p.c, backgroundImage: p.rayas ? 'repeating-linear-gradient(45deg, rgba(0,0,0,.18) 0 8px, transparent 8px 16px)' : 'none' }}></div>)}
    </div>
    <div style={{ font:`900 26px ${KF.texto}`, color:KC.ink, marginTop:6 }}>{etiqueta}</div>
  </div>;
}

function ConcursoArte() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Respuesta, H: CUES.Horas, J: CUES.Jueces, P: CUES.Pregunta, O: CUES.Oficina, D: CUES.Demanda, F: CUES.Foto, Rg: CUES.Regla, C: CUES.Cierre, Ou: CUES.Outro };
  K.O2 = K.O + (K.D - K.O) * 0.41;   // segunda línea de "Oficina" (624)
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // pared del museo: posiciones de los 3 cuadros (gancho y cierre)
  const ent = (i) => kprog(T, K.G + 0.05 + i * 0.18, K.G + 0.6 + i * 0.18, kEase.sale);
  const foco = kprog(T, K.R + 0.1, K.R + 0.9, kEase.suave);          // el cuadro C pasa al centro
  const cuenta = T >= K.G + 2.2 && T < K.R ? Math.max(1, 3 - Math.floor((T - K.G - 2.2) / 0.95)) : null;
  const nMini = Math.round(30 * kprog(T, K.H + 0.4, K.H + 4.6, kEase.suave));
  const sello = kprog(T, K.O + 3.3, K.O + 3.7, kEase.sale);
  const tiras = (t0) => Array.from({ length: 9 }, (_, i) => { const p = ((T - t0) * 0.9 + i / 9) % 1; return T < t0 ? null :
    <Ficha key={i} x={klerp(-60, 380, p)} y={900 + Math.sin(i * 2.3) * 120} texto={['prompt', 'ópera', 'espacio', 'luz', 'túnicas', 'v2', 'dorado', 'salón', 'cine'][i]} color={[KC.yellow, KC.mint, KC.pink][i % 3]} s={0.75} rot={Math.sin(i) * 10} o={Math.sin(Math.PI * p)} tam={34} />; });
  const sep = kprog(T, K.D + 0.3, K.D + 1.1, kEase.sale) * (1 - kprog(T, K.D + 2.3, K.D + 2.8, kEase.rebote));
  const mazo = kprog(T, K.D + 2.6, K.D + 3.1);
  const empuja = kprog(T, K.F + 4.2, K.F + 5.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1-2 · el reto y la respuesta: tres cuadros en la pared */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1215, height:40, background:'#c99a1a', borderTop:`6px solid ${KC.ink}` }}></div>
        {svg(<>
          <g opacity={ent(0)} transform={`translate(${(1 - ent(0)) * -500} 0)`}><Cuadro x={klerp(190, 90, foco)} y={klerp(980, 1000, foco)} s={klerp(0.95, 0.6, foco)} tipo="bodegon" id="g1" dim={foco} /></g>
          <g opacity={ent(1)} transform={`translate(0 ${(1 - ent(1)) * 600})`}><Cuadro x={klerp(540, 990, foco)} y={klerp(980, 1000, foco)} s={klerp(0.95, 0.6, foco)} tipo="paisaje" id="g2" dim={foco} /></g>
          <g opacity={ent(2)} transform={`translate(${(1 - ent(2)) * 500} 0)`}><Cuadro x={klerp(890, 540, foco)} y={klerp(980, 960, foco)} s={klerp(0.95, 1.4, foco)} tipo="teatro" id="g3" T={T} /></g>
          {foco > 0.6 && <g opacity={kprog(T, K.R + 0.8, K.R + 1.1)}><Liston x={720 + 0} y={760} s={kprog(T, K.R + 0.8, K.R + 1.2, kEase.rebote)} /></g>}
        </>)}
        {['A', 'B', 'C'].map((l, i) => <div key={l} style={{ position:'absolute', left:[190, 540, 890][i], top:1130, transform:'translate(-50%,0)', font:`400 72px ${KF.titulo}`, color:KC.ink, opacity:ent(i) * (1 - foco) }}>{l}</div>)}
        {cuenta && <div style={{ position:'absolute', left:300, top:650, transform:`translate(-50%,-50%) scale(${1 + 0.3 * (1 - ((T - K.G - 2.2) % 0.95))})`, font:`400 220px ${KF.titulo}`, color:KC.pink, WebkitTextStroke:`7px ${KC.ink}` }}>{cuenta}</div>}
      </Escena>
      <Chip T={T} at={K.G + 0.3} until={K.R - 0.2} texto="¿Cuál se hizo con IA?" x={300} y={470} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.R + 1.2} until={K.H - 0.2} texto="Feria Estatal de Colorado · 2022" x={360} y={480} tam={34} borde={AZUL} />
      <Chip T={T} at={K.R + 2.0} until={K.H - 0.2} texto="1.er lugar · arte digital" x={330} y={580} tam={34} borde={KC.gold} />
      {/* 3 · horas y versiones */}
      <Escena T={T} a={K.H} b={K.J}>
        <FondoLunares color={KC.cyan} />
        {svg(<Monitor x={540} y={960} T={T} n={nMini} s={1.15} titulo="Jason M. Allen · Midjourney" />)}
      </Escena>
      <NumeroGigante T={T} at={K.H + 1.6} until={K.J - 0.2} valor={900} dur={2.4} sufijo="+" etiqueta="versiones" x={700} y={470} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.H + 3.0} until={K.J - 0.2} texto="≈ 80 horas · según Allen" x={700} y={640} tam={34} borde={KC.ink} />
      {/* 4 · los jueces */}
      <Escena T={T} a={K.J} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Cuadro x={760} y={960} s={1.05} tipo="teatro" id="j" T={T} />
          <Liston x={880} y={790} s={0.7} />
          <Juez x={180} y={940} s={0.95} T={T} />
          <Juez x={400} y={980} s={0.9} T={T} seed={2} color="#6b3c3c" piel="#c98d63" pelo="#7a7a7a" />
        </>)}
      </Escena>
      <Burbuja T={T} at={K.J + 0.4} until={K.J + 2.6} x={300} y={640} texto="¿IA? No sabíamos" />
      <Burbuja T={T} at={K.J + 2.7} until={K.P - 0.2} x={320} y={640} texto="Igual: 1.er lugar ✔" />
      {/* 5 · ¿de quién es? */}
      <Escena T={T} a={K.P} b={K.O} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Balanza x={270} y={760} s={0.95} T={T} />
          <text x={270} y={640} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} transform={`rotate(${Math.sin(T * 3) * 6} 270 580)`}>?</text>
        </>)}
      </Escena>
      {/* 6 · la Oficina niega el registro */}
      <Escena T={T} a={K.O} b={K.O2}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <g transform={`rotate(${-3 + sello * 2} 540 1000)`}>
            <rect x={300} y={720} width={480} height={500} rx={16} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
            <text x={540} y={780} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">SOLICITUD DE REGISTRO</text>
            <Cuadro x={540} y={960} s={0.5} tipo="teatro" id="o" T={T} />
            {[1120, 1150, 1180].map((ly) => <line key={ly} x1={340} y1={ly} x2={740} y2={ly} stroke="#c9c2b4" strokeWidth={5} />)}
          </g>
          <Sello x={540} y={1000} p={sello} />
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.O + 0.2} until={K.O2 - 0.2} anio="2023" quien="Oficina de Derechos de Autor de EE. UU." revista="Junta de Revisión · 5 sep 2023" y={500} />
      {/* 6b · 624 instrucciones (por dentro de la máquina) */}
      <Escena T={T} a={K.O2} b={K.D}>
        <FondoCircuito T={T} />
        {svg(<>
          {tiras(K.O2 + 0.3)}
          <Maquina x={540} y={930} s={1} T={T * 2} />
          <g opacity={kprog(T, K.O2 + 3.0, K.O2 + 3.5)} transform={`translate(${klerp(540, 860, kprog(T, K.O2 + 3.0, K.O2 + 4.0, kEase.sale))} 0)`}><Cuadro x={0} y={930} s={0.55} tipo="teatro" id="m" T={T} marco="#9aa6bd" /></g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.O2 + 0.3} until={K.D - 0.2} valor={624} dur={2.4} etiqueta="instrucciones, al menos" x={700} y={480} tam={160} color={KC.yellow} />
      <Chip T={T} at={K.O2 + 1.2} until={K.D - 0.2} texto="según Allen" x={700} y={640} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.O2 + 4.0} until={K.D - 0.2} texto="imagen base · autoría humana: no" x={600} y={1160} tam={34} borde={KC.red} />
      {/* 7 · la demanda */}
      <Escena T={T} a={K.D} b={K.F}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          <g transform={`translate(${-sep * 150} ${sep * 40})`}><Cuadro x={420} y={940} s={1.05} tipo="teatro" id="d" T={T} /></g>
          <g transform={`translate(${sep * 150} ${-sep * 40})`} opacity={0.95}>
            <rect x={262} y={772} width={316} height={336} rx={8} fill="rgba(255,255,255,.12)" stroke={AZUL} strokeWidth={6} strokeDasharray="18 10" />
            {[[330, 1040, 60], [470, 860, 40], [380, 900, 30], [520, 1060, 50]].map(([bx, by, bl], i) => <path key={i} d={`M ${bx} ${by} q ${bl / 2} -14 ${bl} 0`} stroke={AZUL} strokeWidth={10} fill="none" strokeLinecap="round" />)}
          </g>
          <Mazo x={860} y={1050} s={1} golpe={mazo} />
        </>)}
      </Escena>
      <Chip T={T} at={K.D + 0.6} until={K.D + 2.4} texto="capa IA (Midjourney)" x={300} y={700} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.D + 0.9} until={K.D + 2.4} texto="retoques (Photoshop) ✔" x={620} y={1170} tam={30} borde={AZUL} />
      <Chip T={T} at={K.D + 2.5} until={K.F - 0.2} texto="demanda · Colorado · 2024" x={360} y={520} tam={34} borde={KC.ink} />
      {/* 8 · la "foto" de Eldagsen */}
      <Escena T={T} a={K.F} b={K.Rg}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cuadro x={360} y={930} s={1.05} tipo="foto" id="f" marco="#1d1d22" />
          <g transform={`translate(${klerp(0, 140, empuja)} 0)`} opacity={1 - empuja * 0.4}><Trofeo x={800} y={1000} s={1.1} /></g>
          {empuja > 0 && <path d={`M 640 1120 L ${640 + 220 * empuja} 1120`} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" markerEnd="" />}
        </>)}
      </Escena>
      <Chip T={T} at={K.F + 0.3} until={K.F + 3.6} texto="Sony World Photography Awards 2023" x={420} y={470} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.F + 0.9} until={K.F + 3.6} texto="Boris Eldagsen · categoría Creativa" x={400} y={560} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.F + 1.6} until={K.Rg - 0.2} texto="dibujo nuestro, no la imagen original" x={360} y={1180} tam={24} borde={KC.texto} />
      <Cita T={T} at={K.F + 3.8} until={K.Rg - 0.2} y={540} texto="«La IA no es fotografía»" quien="Boris Eldagsen · 13 abr 2023 · rechazó el premio" />
      {/* 9 · la regla de 2025 */}
      <Escena T={T} a={K.Rg} b={K.C}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Chip T={T} at={K.Rg + 0.2} until={K.Rg + 2.4} texto="Oficina de Derechos de Autor · Parte 2 · enero 2025" x={540} y={470} tam={28} borde={KC.ink} />
      <Regla T={T} at={K.Rg + 1.0} until={K.C - 0.2} x={290} y={930} ok titulo="IA como herramienta" texto="se protege lo que tú creas, eliges o modificas" />
      <Regla T={T} at={K.Rg + 3.8} until={K.C - 0.2} x={790} y={930} ok={false} titulo="solo instrucciones" texto="los prompts solos no bastan (por ahora)" />
      {/* 10 · cierre: la misma pared */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1215, height:40, background:'#c99a1a', borderTop:`6px solid ${KC.ink}` }}></div>
        {svg(<>
          <Cuadro x={190} y={980} s={0.95} tipo="bodegon" id="c1" />
          <Cuadro x={540} y={980} s={0.95} tipo="paisaje" id="c2" />
          <Cuadro x={890} y={980} s={0.95} tipo="teatro" id="c3" T={T} />
        </>)}
        <ManoHumana T={T} at={K.C + 1.6} x={190} y={720} partes={[{ v: 1, c: KC.leaf }]} etiqueta="a mano" />
        <ManoHumana T={T} at={K.C + 2.0} x={540} y={720} partes={[{ v: 1, c: KC.leaf }]} etiqueta="a mano" />
        <ManoHumana T={T} at={K.C + 2.6} x={890} y={720} partes={[{ v: 0.75, c: '#9aa6bd', rayas: true }, { v: 0.25, c: AZUL }]} etiqueta="IA + retoques" />
      </Escena>
      <Chip T={T} at={K.C + 0.4} until={K.Ou} texto="¿cuánto puso la mano humana?" x={330} y={470} tam={34} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Reto: ¿cuál *se hizo con IA?*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.H - 0.1} texto="Esta: *1.er lugar,* Colorado 2022" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.J - 0.1} texto="Con Midjourney: *~80 h y 900+ versiones*" />
      <Subtitulo T={T} idx={3} at={K.J + 0.1} until={K.P - 0.1} texto="No sabían que era IA… *y la premiaban igual*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.O - 0.1} texto="¿De quién es: *de Allen o de la máquina?*" />
      <Subtitulo T={T} idx={5} at={K.O + 0.1} until={K.O2 - 0.1} texto="2023: *registro negado*" />
      <Subtitulo T={T} idx={6} at={K.O2 + 0.1} until={K.D - 0.1} texto="624 instrucciones: *imagen base sin autoría humana*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.F - 0.1} texto="No excluyó la parte de IA… *y demandó*" />
      <Subtitulo T={T} idx={8} at={K.F + 0.1} until={K.Rg - 0.1} texto="Eldagsen: *«La IA no es fotografía»*" />
      <Subtitulo T={T} idx={9} at={K.Rg + 0.1} until={K.C - 0.1} texto="IA como ayuda ✔ · *solo instrucciones ✘*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="La pregunta: *¿cuánto puso la mano humana?*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_06_pensativo_menton', 'gancho'],
        [CUES.Respuesta + 1.5, CUES.Horas - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Horas + 1.9, CUES.Jueces - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Jueces + 1.5, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Oficina + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Oficina + 5.8, CUES.Demanda - 1.0, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Demanda + 1.0, CUES.Foto - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Foto + 0.4, CUES.Foto + 3.6, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Regla + 2.3, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.2, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="41" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ConcursoArteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ConcursoArte /></CompositionStage></div>;
}
window.ConcursoArteApp = ConcursoArteApp;
