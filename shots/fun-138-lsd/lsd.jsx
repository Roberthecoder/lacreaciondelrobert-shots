// Shot Fungi Mati #138 · Ese cuernito negro no es basura: de su química salió el LSD — NARRADO (N5 "El experimento", histórico).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Tono informativo: no promueve el consumo (sin dosis ni instrucciones).

const LS = { grano:'#e3b45a', grano2:'#f3d28c', tallo:'#b8a24a', arista:'#c9a64a', cuerno:'#2a1630', cuerno2:'#5b2c5f', verde:'#8fc25a',
  madera:'#8a5a2b', madera2:'#6b421c', bata:'#f7f7f2', piel:'#e9b48f', papel:'#fbf3dc', vidrio:'rgba(225,246,255,.92)', gris:'#9aa1ab', acero:'#c9ced6' };

// Cornezuelo (esclerocio): cuerno alargado y algo curvo, negro morado. Base en (0,0), crece hacia -y. (mismo dibujo que fun-17)
function Cuerno({ x = 0, y = 0, largo = 200, ancho = 34, rot = 0, crece = 1 }) {
  if (crece <= 0) return null;
  const L = largo * kEase.sale(kclamp(crece, 0, 1)), W = ancho * (0.6 + 0.4 * kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M ${-W / 2} 0 Q ${-W * 0.7} ${-L * 0.5} ${-W * 0.05 + L * 0.08} ${-L} Q ${W * 0.5 + L * 0.1} ${-L * 0.55} ${W / 2} 0 Z`} fill={LS.cuerno} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${-W * 0.15} ${-L * 0.12} Q ${-W * 0.3} ${-L * 0.5} ${L * 0.05} ${-L * 0.86}`} stroke={LS.cuerno2} strokeWidth={W * 0.22} fill="none" strokeLinecap="round" />
    <path d={`M ${W * 0.18} ${-L * 0.2} L ${W * 0.12} ${-L * 0.32} M ${W * 0.22} ${-L * 0.5} L ${W * 0.14} ${-L * 0.6}`} stroke="#120a14" strokeWidth={3} />
  </g>;
}
// Espiga de centeno con un cornezuelo en el grano 5. Base del tallo en (x, y).
function Espiga({ T, x, y, s = 1, cuernos = [], crece = 1, n = 18, seed = 2 }) {
  const sway = Math.sin(T * 1.6 + seed) * 2.2 + mece(T, seed, 0.4) * 1.5;
  const items = [];
  for (let i = 0; i < n; i++) { const lado = i % 2 ? 1 : -1; items.push({ i, lado, yy: -330 - i * 24, ang: lado * 24, k: 1 - i / (n * 2.2) }); }
  return <g transform={`translate(${x} ${y}) rotate(${sway}) scale(${s})`}>
    <path d="M 0 0 Q 6 -160 0 -330 L 0 -790" stroke={LS.tallo} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 0 -120 Q -70 -200 -110 -300 Q -40 -220 2 -150 Z" fill={LS.verde} stroke={KC.ink} strokeWidth={4} />
    {items.map(({ i, lado, yy, ang, k }) => <g key={i} transform={`translate(${lado * 6} ${yy}) rotate(${ang}) scale(${k})`}>
      <line x1={0} y1={-40} x2={lado * 14} y2={-230} stroke={LS.arista} strokeWidth={3} />
      {cuernos.includes(i) ? <>
        <path d="M -16 4 Q -20 -30 -6 -44 L 6 -44 Q 20 -30 16 4 Z" fill={LS.verde} stroke={KC.ink} strokeWidth={4} />
        <Cuerno x={0} y={-6} largo={150} ancho={30} rot={lado * 6} crece={crece} />
      </> : <>
        <ellipse cx={0} cy={-26} rx={15} ry={30} fill={LS.grano} stroke={KC.ink} strokeWidth={4} />
        <path d="M -6 -44 Q -9 -26 -5 -10" stroke={LS.grano2} strokeWidth={5} fill="none" strokeLinecap="round" />
      </>}
    </g>)}
  </g>;
}
// Núcleo de ergolina (esquemático): anillo A (benceno), pirrol con NH, anillos C y D con N. color = trazo. R = grupo que cambia.
function Ergolina({ x, y, s = 1, p = 1, color = KC.texto, relleno = 'rgba(255,255,255,.08)', R, colorR = KC.gold2, brillo = 0 }) {
  const hexa = (cx, cy, r = 60) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const pol = (pts) => 'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const PENTA = [[52, -30], [52, 30], [110, 40], [130, -15], [104, -60]];
  const anillos = [hexa(0, 0), PENTA, hexa(52, -90), hexa(0, -180)];
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${18 * brillo}px ${KC.gold2})` } : null}>
    {anillos.map((a, i) => { const q = kprog(p, i * 0.2, i * 0.2 + 0.3); return q > 0 ? <path key={i} d={pol(a)} fill={relleno} stroke={color} strokeWidth={9} strokeLinejoin="round" opacity={q} /> : null; })}
    {p > 0.55 && <><circle cx={110} cy={40} r={24} fill={KC.blue} stroke={color} strokeWidth={4} /><text x={110} y={48} textAnchor="middle" style={{ font:`700 21px ${KF.mono}` }} fill="#fff">NH</text></>}
    {p > 0.8 && <><circle cx={52} cy={-210} r={18} fill={KC.blue} stroke={color} strokeWidth={4} /><text x={52} y={-202} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">N</text></>}
    {R && p > 0.95 && <><line x1={-52} y1={-210} x2={-120} y2={-250} stroke={color} strokeWidth={8} />
      <circle cx={-150} cy={-268} r={36} fill={colorR} stroke={color} strokeWidth={5} />
      <text x={-150} y={-258} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{R}</text></>}
  </g>;
}
// Matraz chico de laboratorio, con número opcional. on 0..1 = se enciende.
function Matracito({ x, y, s = 1, num, on = 0, liquido = '#9b7bff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0 && <circle cx={0} cy={-40} r={70 * on} fill={KC.gold2} opacity={0.45 * on} />}
    <path d="M -14 -96 L -14 -58 L -48 6 Q -52 16 -40 16 L 40 16 Q 52 16 48 6 L 14 -58 L 14 -96 Z" fill={LS.vidrio} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -34 -20 L 34 -20 L 48 6 Q 52 16 40 16 L -40 16 Q -52 16 -48 6 Z" fill={mixHex(liquido, '#f4c25a', on)} opacity=".85" />
    {num != null && <text x={0} y={52} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{num}</text>}
  </g>;
}
// Químico genérico con bata (silueta; no pretende ser un retrato). Pies en (x, y).
function Quimico({ T = 0, x, y, s = 1, brazo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-150} width={30} height={150} rx={12} fill="#3a3f4a" stroke={KC.ink} strokeWidth={5} />
    <rect x={10} y={-150} width={30} height={150} rx={12} fill="#3a3f4a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -70 -150 L -60 -380 Q 0 -410 60 -380 L 70 -150 Z" fill={LS.bata} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <line x1={0} y1={-390} x2={0} y2={-160} stroke="#d5d5cc" strokeWidth={4} />
    <g transform={`rotate(${-35 - brazo * 20 + Math.sin(T * 3) * 3} 52 -360)`}><rect x={40} y={-360} width={28} height={150} rx={14} fill={LS.bata} stroke={KC.ink} strokeWidth={5} /></g>
    <rect x={-70} y={-360} width={28} height={160} rx={14} fill={LS.bata} stroke={KC.ink} strokeWidth={5} transform="rotate(10 -56 -360)" />
    <circle cx={0} cy={-440} r={48} fill={LS.piel} stroke={KC.ink} strokeWidth={6} />
    <path d="M -46 -452 Q -40 -500 0 -496 Q 40 -500 46 -452 Q 20 -470 -46 -452 Z" fill="#5a4636" stroke={KC.ink} strokeWidth={4} />
    <rect x={-34} y={-450} width={68} height={20} rx={9} fill="none" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Mesa de laboratorio de madera.
function Mesa({ x, y, w = 900 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={36} rx={8} fill={LS.madera} stroke={KC.ink} strokeWidth={6} />
    <rect x={30} y={36} width={30} height={260} fill={LS.madera2} stroke={KC.ink} strokeWidth={5} />
    <rect x={w - 60} y={36} width={30} height={260} fill={LS.madera2} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Archivero de metal con un cajón que se abre (abre 0..1).
function Archivero({ x, y, abre = 0, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-520} width={340} height={520} rx={14} fill={LS.acero} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2].map((k) => <g key={k}><rect x={-140} y={-490 + k * 165} width={280} height={140} rx={10} fill="#dde1e7" stroke={KC.ink} strokeWidth={5} />
      <rect x={-40} y={-440 + k * 165} width={80} height={22} rx={8} fill={LS.gris} stroke={KC.ink} strokeWidth={4} /></g>)}
    <g transform={`translate(0 ${-abre * 0})`}>
      {children}
      <g transform={`translate(${abre * 0} ${0})`}>
        <path d={`M -150 -500 L 150 -500 L ${150 + abre * 60} ${-500 - abre * 90} L ${-150 + abre * 60} ${-500 - abre * 90} Z`} fill="#eef0f3" stroke={KC.ink} strokeWidth={6} opacity={abre > 0.02 ? 1 : 0} />
      </g>
    </g>
  </g>;
}
// Calendario de pared: hoja con mes y año.
function Calendario({ x, y, s = 1, mes, anio, dia, rot = 0, color = KC.red }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-170} width={300} height={90} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-108} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill="#fff">{mes}</text>
    <text x={0} y={dia ? 40 : 60} textAnchor="middle" style={{ font:`400 ${dia ? 150 : 110}px ${KF.titulo}` }} fill={KC.ink}>{dia || anio}</text>
    {dia && <text x={0} y={120} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{anio}</text>}
    {[-90, 0, 90].map((dx) => <circle key={dx} cx={dx} cy={-170} r={12} fill={KC.ink} />)}
  </g>;
}
// Libreta de laboratorio con renglones escritos (p 0..1 = cuánto se ha escrito).
function Libreta({ x, y, s = 1, lineas = [], p = 1, rot = -3 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-300} y={-220} width={600} height={440} rx={16} fill={LS.papel} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={-260} y1={-130 + i * 52} x2={260} y2={-130 + i * 52} stroke="#c8d8f0" strokeWidth={3} />)}
    <line x1={-210} y1={-220} x2={-210} y2={220} stroke="#f0a0a0" strokeWidth={3} />
    {lineas.map((t, i) => { const q = kprog(p, i / lineas.length, (i + 1) / lineas.length); return <text key={i} x={-190} y={-146 + i * 52 + 52} style={{ font:`700 34px ${KF.mono}` }} fill="#1d2b6b" opacity={q > 0 ? 1 : 0}>{t.slice(0, Math.ceil(t.length * q))}</text>; })}
  </g>;
}
// Mano con el índice estirado (de lado). Punta del dedo en (x, y).
function Dedo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 Q -10 -40 30 -50 L 330 -70 Q 380 -72 400 -40 L 560 -60 L 560 130 L 380 140 Q 330 160 280 120 L 260 60 L 40 40 Q -6 36 0 0 Z" fill={LS.piel} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 18 -36 Q 40 -40 60 -32" stroke="#f6d6c0" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 90 -46 Q 100 -6 90 36" stroke="#c98d6a" strokeWidth={4} fill="none" />
    <path d="M 280 60 Q 330 50 380 70" stroke="#c98d6a" strokeWidth={4} fill="none" />
  </g>;
}
// Bicicleta con ciclista genérico. (x, y) = suelo entre las ruedas. gira = ángulo de las ruedas (rad).
function Bici({ x, y, s = 1, gira = 0, color = KC.blue, ropa = '#3a3f4a', bata = false }) {
  const rueda = (cx) => <g transform={`translate(${cx} -70)`}>
    <circle r={70} fill="none" stroke={KC.ink} strokeWidth={10} />
    {[0, 1, 2, 3, 4, 5].map((k) => { const a = gira + k * Math.PI / 3; return <line key={k} x1={0} y1={0} x2={66 * Math.cos(a)} y2={66 * Math.sin(a)} stroke={KC.ink} strokeWidth={3} />; })}
    <circle r={8} fill={KC.ink} />
  </g>;
  const ped = (a) => [Math.cos(a) * 26, Math.sin(a) * 26];
  const [p1x, p1y] = ped(gira * 1.3), [p2x, p2y] = ped(gira * 1.3 + Math.PI);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {rueda(-110)}{rueda(110)}
    <path d="M -110 -70 L -30 -70 L 30 -170 L -60 -170 Z M -30 -70 L -70 -190 M 110 -70 L 60 -200 L 30 -170" stroke={color} strokeWidth={11} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M 60 -200 L 40 -220 L 80 -222" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <rect x={-96} y={-202} width={52} height={14} rx={7} fill={KC.ink} />
    {/* ciclista */}
    <path d={`M -70 -200 L ${-30 + p1x} ${-70 + p1y}`} stroke={ropa} strokeWidth={22} strokeLinecap="round" />
    <path d={`M -70 -200 L ${-30 + p2x} ${-70 + p2y}`} stroke={mixHex(ropa, '#000000', 0.3)} strokeWidth={22} strokeLinecap="round" />
    <path d="M -76 -205 L -40 -330" stroke={bata ? LS.bata : ropa} strokeWidth={44} strokeLinecap="round" />
    <path d="M -46 -310 L 50 -222" stroke={bata ? LS.bata : ropa} strokeWidth={18} strokeLinecap="round" />
    <circle cx={-30} cy={-372} r={34} fill={LS.piel} stroke={KC.ink} strokeWidth={5} />
    <path d="M -64 -380 Q -40 -420 4 -392 Q -24 -396 -64 -380 Z" fill="#4a3a2c" />
  </g>;
}
// Coche genérico (icono) con tache rojo.
function CocheTachado({ x, y, s = 1, tache = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 L -150 -60 Q -140 -80 -100 -84 L -60 -140 L 70 -140 L 120 -84 Q 150 -80 150 -60 L 150 0 Z" fill="#8c95a3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -46 -126 L 54 -126 L 92 -86 L -78 -86 Z" fill="#cfe9ff" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-90} cy={4} r={34} fill={KC.ink} /><circle cx={90} cy={4} r={34} fill={KC.ink} />
    <circle cx={-90} cy={4} r={12} fill={LS.gris} /><circle cx={90} cy={4} r={12} fill={LS.gris} />
    {tache > 0 && <g opacity={tache} transform={`scale(${klerp(1.6, 1, tache)})`}><path d="M -150 -150 L 150 50 M 150 -150 L -150 50" stroke={KC.red} strokeWidth={22} strokeLinecap="round" /></g>}
  </g>;
}
// Casitas de fondo (calle esquemática).
function Calle({ T, y = 1180, corre = 0 }) {
  const casas = [[0, 300, KC.pink], [260, 380, KC.cyan], [520, 260, KC.orange], [760, 340, KC.lilac], [1020, 300, KC.mint], [1280, 360, KC.pink]];
  const off = -((corre * 260) % 1300);
  return <g>
    {[0, 1300].map((base) => casas.map(([cx, h, col], i) => <g key={base + '-' + i} transform={`translate(${cx + base + off} ${y})`}>
      <rect x={0} y={-h} width={220} height={h} fill={col} stroke={KC.ink} strokeWidth={6} />
      <path d={`M -14 ${-h} L 110 ${-h - 90} L 234 ${-h} Z`} fill="#b8432c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <rect x={40} y={-h + 50} width={50} height={60} fill="#fff7d0" stroke={KC.ink} strokeWidth={4} />
      <rect x={130} y={-h + 50} width={50} height={60} fill="#fff7d0" stroke={KC.ink} strokeWidth={4} />
      <rect x={85} y={-90} width={56} height={90} fill="#6b421c" stroke={KC.ink} strokeWidth={4} />
    </g>))}
    <rect x={0} y={y} width={KW} height={160} fill="#6c7280" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={((i * 200 + off * 1.0) % 1400 + 1400) % 1400 - 160} y={y + 70} width={110} height={14} rx={7} fill="#f4efe4" />)}
  </g>;
}
// Caja genérica de ampolletas "Delysid · uso experimental" (esquemática, sin logo real).
function CajaAmpolletas({ x, y, s = 1, abre = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-150} width={460} height={190} rx={12} fill="#f1ede2" stroke={KC.ink} strokeWidth={8} />
    {[-150, -75, 0, 75, 150].map((dx, i) => { const q = kprog(abre, i * 0.12, i * 0.12 + 0.4, kEase.rebote); return <g key={dx} transform={`translate(${dx} ${-150 - q * 30})`} opacity={q}>
      <path d="M -16 0 L -16 -110 Q -16 -126 -6 -132 L -6 -160 Q 0 -176 6 -160 L 6 -132 Q 16 -126 16 -110 L 16 0 Z" fill="rgba(235,248,255,.95)" stroke={KC.ink} strokeWidth={5} />
      <rect x={-16} y={-60} width={32} height={60} fill="#cfe9ff" opacity=".7" />
    </g>; })}
    <rect x={-210} y={-40} width={420} height={70} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-2} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>DELYSID</text>
    <text x={0} y={24} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#5a524a">uso experimental</text>
  </g>;
}
// Documento del tratado (esquemático).
function Tratado({ x, y, s = 1, p = 1, marca = 0 }) {
  const lin = ['Lista I', '… (+)-LISERGIDA', '    LSD, LSD-25', '…'];
  return <g transform={`translate(${x} ${y}) rotate(-3) scale(${s})`}>
    <rect x={-280} y={-330} width={560} height={660} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-262} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CONVENIO SOBRE</text>
    <text x={0} y={-218} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>SUSTANCIAS SICOTRÓPICAS</text>
    <text x={0} y={-170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">ONU · Viena, 1971</text>
    <line x1={-230} y1={-140} x2={230} y2={-140} stroke={KC.ink} strokeWidth={4} />
    {lin.map((t, i) => <text key={i} x={-230} y={-80 + i * 60} style={{ font:`700 ${i === 0 ? 38 : 32}px ${KF.mono}` }} fill={i === 1 || i === 2 ? KC.red : KC.ink} opacity={kprog(p, i * 0.2, i * 0.2 + 0.25)}>{t}</text>)}
    {marca > 0 && <rect x={-246} y={-16} width={420} height={112} rx={10} fill="none" stroke={KC.red} strokeWidth={6} opacity={marca} />}
    {Array.from({ length: 3 }, (_, i) => <line key={i} x1={-230} y1={200 + i * 40} x2={200 - i * 60} y2={200 + i * 40} stroke="#c9c2b0" strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}
// Tarjeta de texto (HTML) para avisos de riesgo: una o dos líneas, con fuente chiquita.
function Aviso({ T, at, until, x, y, lineas, fuente, borde = KC.red, tam = 38, ancho = 860 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:'rgba(14,15,18,.88)', border:`5px solid ${borde}`, borderRadius:26, padding:'16px 28px', textAlign:'center', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>
    {lineas.map((t, i) => <div key={i} style={{ font:`900 ${tam}px/1.15 ${KF.texto}`, color:KC.texto }}>{t}</div>)}
    {fuente && <div style={{ font:`700 22px ${KF.mono}`, color:'rgba(246,243,236,.7)', marginTop:8 }}>{fuente}</div>}
  </div>;
}
// Sello rectangular (para frases largas como «NO APROBADO»).
function SelloRect({ T, at, x, y, texto, color = KC.red, tam = 64, rot = -8 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, k)})`, opacity:kprog(T, at, at + 0.15),
    border:`10px solid ${color}`, borderRadius:16, padding:'6px 26px', font:`400 ${tam}px/1.05 ${KF.titulo}`, color, background:'rgba(255,255,255,.85)', whiteSpace:'nowrap', textAlign:'center' }}>{texto}</div>;
}
// Línea del tiempo del cierre.
function LineaTiempo({ T, at, x = 120, y = 1120, w = 840 }) {
  const hitos = [['1938', 'LSD-25'], ['1943', 'el autoexperimento'], ['1971', 'Lista I (ONU)'], ['hoy', 'ensayos clínicos']];
  const p = kprog(T, at, at + 1.2, kEase.sale);
  return <g>
    <line x1={x} y1={y} x2={x + w * p} y2={y} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    {hitos.map(([a, b], i) => { const q = kprog(T, at + 0.25 + i * 0.3, at + 0.55 + i * 0.3, kEase.rebote); const cx = x + (i / 3) * w;
      return q > 0 ? <g key={i} transform={`translate(${cx} ${y})`}>
        <circle r={22 * q} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
        <text y={-44} textAnchor="middle" style={{ font:`400 ${54 * q}px ${KF.titulo}` }} fill={KC.ink}>{a}</text>
        <text y={66} textAnchor="middle" style={{ font:`700 ${22 * q}px ${KF.mono}` }} fill={KC.ink}>{b}</text>
      </g> : null; })}
  </g>;
}

function LsdShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, S: CUES.Sandoz, L: CUES.Lsd25, A: CUES.Archivo, P: CUES.Pregunta, Co: CUES.Corazonada, Pi: CUES.Piel,
    B: CUES.Bici, D: CUES.Delysid, Le: CUES.Ley, R: CUES.Riesgos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const HM = K.H + 2.3;                          // de la espiga de cerca (macro) a la molécula (micro)
  const PI2 = K.Pi + 2.2;                        // de la lupa en el dedo al calendario del 19 de abril
  const R2 = K.R + 3.0;                          // de los riesgos a los ensayos clínicos
  const tira = kprog(T, K.G + 1.6, K.G + 2.4, kEase.suave), regresa = kprog(T, K.G + 2.5, K.G + 3.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la espiga con el cuernito; casi va a la basura */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.07} origen="35% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity=".5"><Espiga T={T} x={120} y={2150} s={1.3} seed={7} /><Espiga T={T} x={980} y={2250} s={1.4} seed={9} /></g>
          <Espiga T={T} x={330} y={1930} s={2.0} cuernos={[5]} crece={kprog(T, K.G + 0.1, K.G + 0.8)} />
          {/* bote de basura que se acerca y se aleja */}
          <g transform={`translate(${klerp(1200, 820, tira) + regresa * 420} 1190)`}>
            <path d="M -110 -220 L 110 -220 L 90 0 L -90 0 Z" fill="#8c95a3" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <rect x={-126} y={-252} width={252} height={34} rx={10} fill="#a9b1bd" stroke={KC.ink} strokeWidth={7} />
            {[-50, 0, 50].map((dx) => <line key={dx} x1={dx} y1={-190} x2={dx * 0.85} y2={-30} stroke={KC.ink} strokeWidth={5} />)}
          </g>
        </>)}
      </Escena>
      {/* 1a · el cornezuelo de cerca */}
      <Escena T={T} a={K.H} b={HM} zoom={0.06} origen="45% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<Espiga T={T} x={300} y={2430} s={3.2} cuernos={[5]} crece={1} seed={4} />)}
      </Escena>
      {/* 1b · por dentro: el núcleo del ácido lisérgico (fondo oscuro) */}
      <Escena T={T} a={HM} b={K.S} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} />
        {fsvg(<>
          <Ergolina x={430} y={960} s={1.9} p={kprog(T, HM + 0.1, HM + 1.2)} brillo={0.6 + 0.4 * Math.sin(T * 3)} />
          {[[230, 1160, 'ergotamina'], [700, 1160, 'ergometrina']].map(([ex, ey, n], i) => { const q = kprog(T, HM + 1.6 + i * 0.4, HM + 2.0 + i * 0.4, kEase.rebote);
            return q > 0 ? <g key={n} opacity={q}><Ergolina x={ex - 30} y={ey} s={0.45 * q} p={1} color={KC.gold2} relleno="rgba(244,194,90,.15)" /></g> : null; })}
        </>)}
      </Escena>
      {/* 2 · Sandoz, Basilea: el químico modifica el núcleo */}
      <Escena T={T} a={K.S} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {/* pizarrón con el núcleo y el grupo R que cambia */}
          <rect x={360} y={560} width={660} height={460} rx={18} fill="#1f3b33" stroke={KC.ink} strokeWidth={10} />
          <Ergolina x={640} y={900} s={1.05} p={1} color="#f4efe4" relleno="rgba(255,255,255,.06)" R={['R₁', 'R₂', 'R₃', 'R₄'][Math.floor(kclamp((T - K.S - 0.8) / 0.7, 0, 3))]} colorR={[KC.gold2, KC.pink, KC.mint, KC.lilac][Math.floor(kclamp((T - K.S - 0.8) / 0.7, 0, 3))]} />
          <Mesa x={60} y={1150} w={960} />
          <Matracito x={560} y={1134} s={1.2} /><Matracito x={700} y={1134} s={1.0} liquido="#ff8a1f" /><Matracito x={830} y={1134} s={1.3} liquido="#2fe0a8" />
          <Quimico T={T} x={230} y={1450} s={1.25} brazo={kprog(T, K.S + 0.5, K.S + 1.2)} />
        </>)}
      </Escena>
      {/* 3 · 1938: la variante número 25 */}
      <Escena T={T} a={K.L} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {Array.from({ length: 25 }, (_, i) => { const q = kprog(T, K.L + 0.2 + i * 0.07, K.L + 0.45 + i * 0.07, kEase.rebote); if (q <= 0) return null;
            const on = i === 24 ? kprog(T, K.L + 2.2, K.L + 2.6) : 0;
            return <Matracito key={i} x={150 + (i % 5) * 195} y={790 + Math.floor(i / 5) * 150} s={q * (i === 24 ? 0.95 + 0.25 * on : 0.8)} num={i + 1} on={on} />; })}
        </>)}
      </Escena>
      {/* 4 · la archivaron */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Archivero x={540} y={1200} abre={1 - kprog(T, K.A + 1.4, K.A + 1.9, kEase.suave)}>
            {(() => { const u = kprog(T, K.A + 0.3, K.A + 1.5, kEase.suave); return u < 1 ? <Matracito x={klerp(300, 0, u)} y={klerp(-700, -470, u)} s={1.1 - u * 0.3} num={25} on={1 - u} /> : null; })()}
          </Archivero>
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿por qué cinco años después? */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.P + 0.3, K.P + 1.6); const anio = 1938 + Math.round(u * 5); return <Calendario x={260} y={760} s={1.05} mes="AÑO" anio={String(anio)} rot={Math.sin(T * 4) * 2} />; })()}
          <Interrogacion T={T} x={300} y={1210} tam={300} />
        </>)}
      </Escena>
      {/* 6 · abril de 1943: la libreta del laboratorio */}
      <Escena T={T} a={K.Co} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Mesa x={60} y={1170} w={960} />
          <Libreta x={540} y={990} s={1.05} lineas={['16 / IV / 1943', 'interrumpo el trabajo:', 'inquietud, mareo…']} p={kprog(T, K.Co + 2.0, K.Co + 4.2)} />
          <Matracito x={900} y={1154} s={1.2} />
        </>)}
      </Escena>
      {/* 7 · ¿por la piel? y, tres días después, a propósito */}
      <Escena T={T} a={K.Pi} b={PI2} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Dedo x={260} y={980} s={1.25} />
          <g transform="translate(330 960)">
            <circle r={160} fill="rgba(255,255,255,.3)" stroke={KC.ink} strokeWidth={14} />
            <line x1={112} y1={112} x2={230} y2={230} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
            {[[-40, -20], [10, 30], [50, -40], [-10, 60], [70, 20]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill={KC.violet} opacity={0.4 + 0.4 * Math.sin(T * 4 + i)} />)}
          </g>
        </>)}
      </Escena>
      <Escena T={T} a={PI2} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Calendario x={300} y={860} s={1.1} mes="ABRIL" anio="1943" dia={T < PI2 + 0.9 ? '16' : (T < PI2 + 1.2 ? '18' : '19')} rot={-3} />
        </>)}
      </Escena>
      {/* 8 · a casa en bicicleta */}
      <Escena T={T} a={K.B} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Calle T={T} y={1100} corre={(T - K.B) * 0.9} />
          <Bici x={300} y={1180} s={0.95} gira={(T - K.B) * 6} color={KC.blue} bata />
          <Bici x={720} y={1190} s={0.9} gira={(T - K.B) * 6 + 1} color={KC.red} ropa="#5b4a8a" />
          <CocheTachado x={770} y={830} s={0.9} tache={kprog(T, K.B + 1.6, K.B + 2.0, kEase.sale)} />
        </>)}
      </Escena>
      {/* 9 · Delysid: fármaco experimental */}
      <Escena T={T} a={K.D} b={K.Le} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <CajaAmpolletas x={420} y={960} s={1.25} abre={kprog(T, K.D + 0.4, K.D + 1.6)} />
          <FlechaCurva x1={300} y1={1060} x2={230} y2={1150} p={kprog(T, K.D + 1.9, K.D + 2.4)} curva={-40} color={KC.ink} />
          <FlechaCurva x1={560} y1={1060} x2={700} y2={1150} p={kprog(T, K.D + 2.3, K.D + 2.8)} curva={40} color={KC.ink} />
        </>)}
      </Escena>
      {/* 10 · ONU 1971, Lista I · México */}
      <Escena T={T} a={K.Le} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Le + 2.5, K.Le + 2.9)}>
            <Tratado x={420} y={900} s={0.95} p={kprog(T, K.Le + 0.3, K.Le + 1.6)} marca={kprog(T, K.Le + 1.6, K.Le + 1.9)} />
            <Sello T={T} at={K.Le + 1.7} x={560} y={1130} texto="LISTA I" color={KC.red} r={95} rot={-10} />
          </g>
        </>)}
        {T > K.Le + 2.5 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.Le + 2.5, K.Le + 2.9) }}>
          <MapaMexico x={40} y={690} ancho={1000} />
        </div>}
      </Escena>
      {/* 11 · riesgos y ensayos clínicos */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.03}>
        <FondoLunares color={T < R2 ? KC.orange : KC.cyan} />
      </Escena>
      {/* 12 · cierre: la misma espiga, ahora con su historia */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="35% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity=".5"><Espiga T={T} x={120} y={2150} s={1.3} seed={7} /><Espiga T={T} x={980} y={2250} s={1.4} seed={9} /></g>
          <g opacity={1 - 0.55 * kprog(T, K.C + 0.8, K.C + 1.4)}><Espiga T={T} x={330} y={1930} s={2.0} cuernos={[5]} crece={1} /></g>
          <rect x={70} y={980} width={940} height={240} rx={26} fill="rgba(255,255,255,.82)" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.C + 0.8, K.C + 1.2)} />
          <LineaTiempo T={T} at={K.C + 1.0} x={170} y={1090} w={740} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.5} until={K.H - 0.3} texto="¿basura?" x={760} y={880} tam={46} />
      <Chip T={T} at={K.G + 2.9} until={K.H - 0.3} texto="de su química → el LSD" x={640} y={1010} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.H + 0.4} until={HM - 0.2} x={560} y={860} texto="cornezuelo" tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 0.8} until={HM - 0.2} x={560} y={920} texto="Claviceps purpurea" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={HM - 0.2} x={560} y={980} texto="(un hongo)" tam={30} color={KC.ink} />
      <Chip T={T} at={HM + 0.1} until={K.S - 0.3} texto="POR DENTRO · LA MOLÉCULA" x={440} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={HM + 1.0} until={K.S - 0.3} x={60} y={560} texto="ácido lisérgico:" tam={36} color={KC.gold2} />
      <Etq T={T} at={HM + 1.2} until={K.S - 0.3} x={60} y={612} texto="núcleo de sus alcaloides principales" tam={28} color={KC.gold2} />
      <Etq T={T} at={HM + 1.7} until={K.S - 0.3} x={110} y={1240} texto="ergotamina" tam={28} color={KC.texto} />
      <Etq T={T} at={HM + 2.1} until={K.S - 0.3} x={580} y={1240} texto="ergometrina" tam={28} color={KC.texto} />
      <Chip T={T} at={K.S + 0.2} until={K.L - 0.3} texto="Sandoz · Basilea, Suiza" x={540} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.7} until={K.L - 0.3} x={60} y={560} texto="Albert Hofmann, químico" tam={34} color={KC.ink} />
      <Etq T={T} at={K.S + 1.4} until={K.L - 0.3} x={380} y={1050} texto="modificaba el núcleo" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.L + 0.1} until={K.L + 1.9} anio="1938" quien="Sandoz, Basilea" revista="derivados del ácido lisérgico" x={380} y={560} />
      <Chip T={T} at={K.L + 2.3} until={K.A - 0.3} texto="n.º 25 → LSD-25" x={380} y={500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.L + 2.9} until={K.A - 0.3} texto="buscaba: estimulante respiratorio" x={480} y={600} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.L + 3.4} until={K.A - 0.3} x={150} y={660} texto="(y circulatorio · un «analéptico»)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.A + 0.4} until={K.P - 0.3} texto="en animales: sin interés" x={540} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.A + 1.9} until={K.P - 0.3} texto="ARCHIVADA" x={540} y={1300 - 700} tam={40} borde={KC.red} mono />
      <TarjetaEstudio T={T} at={K.Co + 0.2} until={K.Pi - 0.3} anio="1943" quien="16 de abril · Sandoz, Basilea" revista="relato de A. Hofmann, «LSD: mi hijo problemático» (1979)" x={540} y={560} />
      <Chip T={T} at={K.Co + 0.9} until={K.Co + 2.2} texto="«una corazonada»" x={540} y={790} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Pi + 0.4} until={PI2 - 0.2} texto="¿una traza entró por la piel?" x={540} y={520} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Pi + 0.9} until={PI2 - 0.2} x={120} y={600} texto="(lo que él sospechó)" tam={28} color={KC.ink} />
      <Chip T={T} at={PI2 + 1.3} until={K.B - 0.3} texto="19 abr 1943 · autoexperimento" x={540} y={1180} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.4} until={K.D - 0.3} x={110} y={1330 - 330} texto="Hofmann y su asistente de laboratorio" tam={24} color={KC.ink} />
      <Chip T={T} at={K.B + 1.7} until={K.D - 0.3} texto="por la guerra: sin coche" x={460} y={520} tam={38} borde={KC.red} />
      <Chip T={T} at={K.D + 0.2} until={K.Le - 0.3} texto="fármaco experimental" x={430} y={520} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.D + 2.2} until={K.Le - 0.3} texto="investigadores" x={250} y={1190} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.D + 2.6} until={K.Le - 0.3} texto="psiquiatras" x={720} y={1190} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Le + 2.8} until={K.R - 0.3} texto="México · Ley General de Salud" x={540} y={520} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Le + 3.3} until={K.R - 0.3} texto="art. 245 · grupo I: controlada" x={540} y={610} tam={34} borde={KC.red} />
      <Aviso T={T} at={K.R + 0.3} until={R2 - 0.2} x={460} y={540} lineas={['miedo y pánico']} borde={KC.red} tam={44} ancho={620} />
      <Aviso T={T} at={K.R + 0.9} until={R2 - 0.2} x={460} y={700} lineas={['conductas peligrosas', 'y lesiones']} borde={KC.red} tam={40} ancho={620} />
      <Aviso T={T} at={K.R + 1.6} until={R2 - 0.2} x={540} y={930} lineas={['la ilegal puede venir mezclada', 'con otras sustancias peligrosas']} fuente="Fuente: NIDA (Institutos Nacionales de Salud de EE. UU.)" borde={KC.red} tam={38} ancho={900} />
      <Aviso T={T} at={R2 + 0.1} until={K.C - 0.3} x={540} y={620} lineas={['hoy: ensayos clínicos', 'controlados (ansiedad)']} fuente="fase 3 · 2026" borde={KC.ink} tam={44} ancho={760} />
      <SelloRect T={T} at={R2 + 0.9} x={540} y={900} texto="NO ES MEDICAMENTO APROBADO" color={KC.red} tam={58} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="una historia que la ciencia sigue revisando" x={540} y={520} tam={32} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="1 cm" largo={105} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={HM} texto="1 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={HM} until={K.S} texto="~1 nm (esquemático)" largo={240} />
      <BarraEscala T={T} at={K.S} until={K.L} texto="1 m" largo={330} color={KC.ink} />
      <BarraEscala T={T} at={K.L} until={K.P} texto="10 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.Co} until={K.Pi} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.Pi} until={PI2} texto="1 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.B} until={K.D} texto="1 m" largo={250} color={KC.ink} />
      <BarraEscala T={T} at={K.D} until={K.Le} texto="10 cm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.Le + 2.7} until={K.R} texto="500 km" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={105} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es basura: de su química salió *el LSD.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.S - 0.1} texto="Su núcleo: *el ácido lisérgico.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.L - 0.1} texto="Sandoz, Basilea: *Albert Hofmann.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.A - 0.1} texto="1938: *LSD-25.* Buscaba un estimulante." />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="Sin interés: *la archivaron.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Por qué volvió *cinco años después?*" />
      <Subtitulo T={T} idx={6} at={K.Co + 0.1} until={K.Pi - 0.1} texto="Abril de 1943: *mareo e inquietud.*" />
      <Subtitulo T={T} idx={7} at={K.Pi + 0.1} until={K.B - 0.1} texto="¿Por la piel? Luego, *a propósito.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.D - 0.1} texto="A casa *en bici:* no había coche." />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Le - 0.1} texto="Fármaco experimental: *Delysid.*" />
      <Subtitulo T={T} idx={10} at={K.Le + 0.1} until={K.R - 0.1} texto="ONU, 1971: *su lista más estricta.*" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.C - 0.1} texto="Tiene riesgos: *no es medicamento aprobado.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una historia que la ciencia *sigue revisando.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [HM + 0.3, K.S - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.L + 0.3, K.A - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Co + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pi + 0.4, K.B - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.D + 0.5, K.Le - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Le + 0.3, K.R - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.R + 0.3, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="138" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LsdApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LsdShot /></CompositionStage></div>;
}
window.LsdApp = LsdApp;
