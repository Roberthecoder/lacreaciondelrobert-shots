// Shot Ambiental #12 · Tu planta no limpia el aire de tu casa — NARRADO (N5 el experimento + N2 el número).
// Datos: Cummings y Waring (Drexel, J. Expo. Sci. Environ. Epidemiol. 2020, en línea 2019); NASA-TM-101766 (Wolverton et al., 1989);
// EPA "Improving Indoor Air Quality". Ver guion.md y verificacion.md. Sala, base espacial, flechas de aire y macetas: esquemáticos.
// La cámara de la NASA sí lleva sus proporciones (cubo de 0.76 m, tapa con tornillos y mariposas, luces de cultivo alrededor).

const PL_HOJA = 'M 0 0 C -18 -14 -44 -8 -44 -38 C -44 -62 -18 -78 0 -92 C 18 -78 44 -62 44 -38 C 44 -8 18 -14 0 0 Z';
// Hoja de pothos (corazón con punta; el pecíolo entra por la muesca).
function HojaPothos({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={PL_HOJA} fill="#3fae4a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -8 -30 Q -20 -50 -10 -70" stroke="#e9e36a" strokeWidth={7} fill="none" strokeLinecap="round" opacity=".8" />
    <path d="M 0 -4 L 0 -84" stroke="#2a7d33" strokeWidth={4} fill="none" />
  </g>;
}
// Planta de interior en maceta (pothos). x, y = base de la maceta.
function Planta({ T, x, y, s = 1, seed = 1, n = 9 }) {
  const r = krng(seed), hojas = Array.from({ length: n }, (_, i) => {
    const a = -150 + (120 * i) / (n - 1) + (r() - 0.5) * 14, L = 110 + r() * 90;
    return { a, L, s: 0.8 + r() * 0.4, p: r() * 6 };
  });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hojas.map((h, i) => {
      const sw = Math.sin(T * 1.6 + h.p) * 4, ang = (h.a + sw) * Math.PI / 180;
      const ex = Math.cos(ang) * h.L, ey = -150 + Math.sin(ang) * h.L;
      return <g key={i}>
        <path d={`M 0 -140 Q ${ex * 0.4} ${-150 + Math.sin(ang) * h.L * 0.8 - 20} ${ex} ${ey}`} stroke="#2a7d33" strokeWidth={6} fill="none" />
        <HojaPothos x={ex} y={ey} rot={h.a + 90 + sw * 2} s={h.s} />
      </g>;
    })}
    <path d="M -86 -150 L 86 -150 L 66 0 L -66 0 Z" fill="#d9774a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-96} y={-170} width={192} height={34} rx={8} fill="#e8895a" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Macetita para los conteos (vista simple).
function Macetita({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={-7} cy={-22} r={10} fill="#3fae4a" stroke={KC.ink} strokeWidth={2.5} />
    <circle cx={7} cy={-24} r={10} fill="#4cc157" stroke={KC.ink} strokeWidth={2.5} />
    <circle cx={0} cy={-32} r={9} fill="#3fae4a" stroke={KC.ink} strokeWidth={2.5} />
    <path d="M -11 -14 L 11 -14 L 8 0 L -8 0 Z" fill="#d9774a" stroke={KC.ink} strokeWidth={2.5} />
  </g>;
}
// Cámara de acrílico sellada (NASA 1989), en perspectiva caballera. x, y = esquina inferior central del frente; w = lado.
function CamaraNASA({ T, x, y, w = 480, gas = 0, luces = 1, children }) {
  const d = w * 0.38, x0 = x - w / 2, x1 = x + w / 2, y0 = y - w, y1 = y;
  const rng = krng(5), puntos = Array.from({ length: 70 }, () => ({ u: rng(), v: rng(), p: rng() * 6 }));
  const borde = { stroke: KC.ink, strokeWidth: 7, strokeLinejoin: 'round' };
  return <g>
    {/* luces de cultivo alrededor */}
    {[x0 - 70, x1 + d + 30].map((lx, i) => <g key={i} opacity={luces}>
      <rect x={lx} y={y0 - d - 10} width={40} height={w + d + 20} rx={14} fill="#c77dff" stroke={KC.ink} strokeWidth={6} />
      <rect x={lx + (i ? -30 : 30)} y={y0 - d} width={40} height={w + d} fill="#e2b6ff" opacity={0.25 + 0.08 * Math.sin(T * 6)} />
    </g>)}
    {/* cara de atrás */}
    <path d={`M ${x0 + d} ${y0 - d} L ${x1 + d} ${y0 - d} L ${x1 + d} ${y1 - d} L ${x0 + d} ${y1 - d} Z`} fill="rgba(210,245,255,.35)" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
    <path d={`M ${x0} ${y1} L ${x0 + d} ${y1 - d} L ${x1 + d} ${y1 - d} L ${x1} ${y1} Z`} fill="rgba(160,170,180,.55)" stroke={KC.ink} strokeWidth={4} />
    {children}
    {/* gas (químico) dentro de la caja */}
    {gas > 0.01 && puntos.map((q, i) => <circle key={i} cx={x0 + 20 + q.u * (w + d - 40) - q.v * d * 0.3 + Math.sin(T * 1.5 + q.p) * 10} cy={y0 - d + 30 + q.v * (w + d - 60) + Math.cos(T * 1.2 + q.p) * 10} r={9}
      fill="#ff8a1f" stroke={KC.ink} strokeWidth={2} opacity={kclamp(gas * 1.2 - (i / 70) * (1 - gas), 0, 1) * 0.85} />)}
    {/* cara de enfrente (acrílico) y aristas */}
    <rect x={x0} y={y0} width={w} height={w} fill="rgba(210,245,255,.28)" {...borde} />
    <path d={`M ${x0} ${y0} L ${x0 + d} ${y0 - d} L ${x1 + d} ${y0 - d} L ${x1} ${y0} Z`} fill="rgba(210,245,255,.45)" {...borde} />
    <path d={`M ${x1} ${y0} L ${x1 + d} ${y0 - d} L ${x1 + d} ${y1 - d} L ${x1} ${y1} Z`} fill="rgba(190,235,250,.35)" {...borde} />
    <path d={`M ${x0 + 30} ${y0 + 30} L ${x0 + 90} ${y0 + 30} M ${x0 + 30} ${y0 + 30} L ${x0 + 30} ${y0 + 110}`} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".7" />
    {/* tornillos y tuercas de mariposa de la tapa */}
    {Array.from({ length: 5 }, (_, i) => { const bx = x0 + 30 + i * (w - 60) / 4 + d * 0.15, by = y0 - d * 0.15;
      return <g key={i} transform={`translate(${bx} ${by})`}><path d="M -16 -6 L -4 -2 L -4 2 L -16 6 Z M 16 -6 L 4 -2 L 4 2 L 16 6 Z" fill="#c0c6cf" stroke={KC.ink} strokeWidth={3} /><circle r={7} fill="#8a929c" stroke={KC.ink} strokeWidth={3} /></g>; })}
    {/* puerto de muestreo */}
    <circle cx={x1 - 50} cy={y0 + 60} r={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Jeringa que inyecta por el puerto. p 0..1 = émbolo.
function Jeringa({ x, y, p = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(-30)`} opacity={o}>
    <line x1={-10} y1={0} x2={-60} y2={0} stroke={KC.ink} strokeWidth={4} />
    <rect x={-60} y={-18} width={170} height={36} rx={6} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={5} />
    <rect x={-56} y={-14} width={120 * (1 - p) + 4} height={28} fill="#ff8a1f" opacity=".8" />
    <rect x={110 - 30 * p} y={-6} width={70} height={12} fill="#c0c6cf" stroke={KC.ink} strokeWidth={4} />
    <rect x={176 - 30 * p} y={-24} width={12} height={48} rx={4} fill="#c0c6cf" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Edificio hermético (ventanas que no abren, candado).
function EdificioSellado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-560} width={300} height={560} rx={10} fill="#cfd6e2" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, f) => Array.from({ length: 3 }, (_, c) => <rect key={f * 3 + c} x={-120 + c * 86} y={-530 + f * 76} width={68} height={54} rx={4} fill="#7fc8ff" stroke={KC.ink} strokeWidth={4} />))}
    <rect x={-40} y={-90} width={80} height={90} fill="#8a6a4a" stroke={KC.ink} strokeWidth={6} />
    <g transform="translate(0 -150)"><path d="M -18 0 L -18 -16 A 18 18 0 0 1 18 -16 L 18 0" stroke={KC.ink} strokeWidth={7} fill="none" /><rect x={-28} y={-2} width={56} height={44} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
// Base espacial esquemática (módulo con domo, paneles solares) en un recuadro de espacio.
function BaseEspacial({ T, x, y, s = 1 }) {
  const r = krng(3), est = Array.from({ length: 22 }, () => [r() * 380 - 190, -r() * 300 - 60]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-400} width={400} height={400} rx={30} fill="#0d1424" stroke={KC.ink} strokeWidth={8} />
    {est.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3} fill="#fff" opacity={0.4 + 0.5 * Math.abs(Math.sin(T * 2 + i))} />)}
    <path d="M -196 -60 Q 0 -120 196 -60 L 196 -8 Q 196 -4 170 -4 L -170 -4 Q -196 -4 -196 -8 Z" fill="#b9b4ad" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={-170} width={150} height={80} rx={36} fill="#eef2f7" stroke={KC.ink} strokeWidth={6} />
    <path d="M 20 -100 A 70 70 0 0 1 160 -100 Z" fill="#9fe3ff" stroke={KC.ink} strokeWidth={6} />
    <line x1={-140} y1={-130} x2={-160} y2={-210} stroke={KC.ink} strokeWidth={5} />
    <rect x={-190} y={-250} width={70} height={40} fill="#2346ff" stroke={KC.ink} strokeWidth={4} transform="rotate(-10 -155 -230)" />
    <circle cx={-80} cy={-130} r={12} fill="#7fc8ff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Flecha de aire ondulada que avanza (dash animado). pts: [x0,y0,x1,y1].
function FlechaAire({ T, x0, y0, x1, y1, o = 1, grosor = 10, color = '#ffffff' }) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, a = Math.atan2(dy, dx) * 180 / Math.PI;
  const mid = (k, w) => `${x0 + dx * k + nx * w} ${y0 + dy * k + ny * w}`;
  return <g opacity={o}>
    <path d={`M ${x0} ${y0} Q ${mid(0.25, 26)} ${mid(0.5, 0)} T ${x1} ${y1}`} stroke={KC.ink} strokeWidth={grosor + 8} fill="none" strokeLinecap="round" strokeDasharray="34 22" strokeDashoffset={-T * 120} />
    <path d={`M ${x0} ${y0} Q ${mid(0.25, 26)} ${mid(0.5, 0)} T ${x1} ${y1}`} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" strokeDasharray="34 22" strokeDashoffset={-T * 120} />
    <path d="M 0 0 L -34 -20 L -34 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" transform={`translate(${x1} ${y1}) rotate(${a})`} />
  </g>;
}
// Sala en perspectiva (un punto de fuga): puerta a la izquierda, ventana al fondo, rendijas a la derecha.
// abre 0..1 = ventana abierta; macetas 0..1 = cuánto del piso se llena de macetas.
const SALA = { bx0: 230, bx1: 850, by0: 640, by1: 960, fx0: 60, fx1: 1020, fy: 1190 };
function Sala({ T, aire = 0, abre = 0, macetas = 0, planta = true, cortina = false }) {
  const S = SALA;
  const nMac = Math.round(macetas * 520), filas = 13, cols = 40, mac = [];
  for (let k = 0; k < nMac; k++) { const f = Math.floor(k / cols), c = k % cols, v = (f + 0.5) / filas, xs = klerp(S.bx0 + 10, S.fx0 + 20, v), xe = klerp(S.bx1 - 10, S.fx1 - 20, v);
    mac.push(<Macetita key={k} x={klerp(xs, xe, (c + 0.5 + (f % 2) * 0.3) / cols)} y={klerp(S.by1 + 10, S.fy - 4, v)} s={klerp(0.42, 0.75, v)} />); }
  return <g>
    {/* paredes y piso */}
    <path d={`M ${S.fx0} 560 L ${S.bx0} ${S.by0} L ${S.bx0} ${S.by1} L ${S.fx0} ${S.fy} Z`} fill="#f2d7a6" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${S.fx1} 560 L ${S.bx1} ${S.by0} L ${S.bx1} ${S.by1} L ${S.fx1} ${S.fy} Z`} fill="#f2d7a6" stroke={KC.ink} strokeWidth={7} />
    <rect x={S.bx0} y={S.by0} width={S.bx1 - S.bx0} height={S.by1 - S.by0} fill="#ffe7bd" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${S.bx0} ${S.by1} L ${S.bx1} ${S.by1} L ${S.fx1} ${S.fy} L ${S.fx0} ${S.fy} Z`} fill="#c98e5a" stroke={KC.ink} strokeWidth={7} />
    {[0.3, 0.6].map((v) => <line key={v} x1={klerp(S.bx0, S.fx0, v)} y1={klerp(S.by1, S.fy, v)} x2={klerp(S.bx1, S.fx1, v)} y2={klerp(S.by1, S.fy, v)} stroke="#a8713f" strokeWidth={4} />)}
    {/* ventana del fondo */}
    <rect x={430} y={700} width={220} height={170} fill="#9fe3ff" stroke={KC.ink} strokeWidth={7} />
    <path d="M 470 820 Q 520 780 560 810 Q 600 770 640 800 L 640 864 L 436 864 Z" fill="#7cc46a" opacity=".8" />
    <rect x={430} y={700} width={110 * (1 - abre * 0.85)} height={170} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />
    <rect x={540 + 110 * abre * 0.85 * 0} y={700} width={110} height={170} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} opacity={1 - abre} />
    {cortina && <path d={`M 650 690 Q ${680 + Math.sin(T * 3) * 20} 780 ${660 + Math.sin(T * 2.4) * 30} 880 L 700 880 Q ${720 + Math.sin(T * 3) * 12} 780 690 690 Z`} fill="#ff6b5a" stroke={KC.ink} strokeWidth={5} />}
    {/* puerta en la pared izquierda (entreabierta) */}
    <path d={`M 110 ${740} L 190 ${770} L 190 ${1020} L 110 ${1090} Z`} fill="#8a5a36" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 110 740 L 150 700 L 150 1050 L 110 1090 Z`} fill="#fff8e0" opacity=".7" />
    <circle cx={175} cy={905} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
    {/* rendijas en la pared derecha */}
    {[[960, 700], [930, 1000], [900, 820]].map(([rx, ry], i) => <path key={i} d={`M ${rx} ${ry} l -14 18 l 12 10 l -14 20`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    {planta && <Planta T={T} x={300} y={1030} s={0.55} seed={4} />}
    {mac}
    {aire > 0 && <>
      <FlechaAire T={T} x0={-20} y0={930} x1={330} y1={960} o={kclamp(aire * 3, 0, 1)} />
      <FlechaAire T={T} x0={540} y0={760} x1={560} y1={1060} o={kclamp(aire * 3 - 1, 0, 1)} />
      <FlechaAire T={T} x0={1100} y0={760} x1={800} y1={820} o={kclamp(aire * 3 - 2, 0, 1)} grosor={7} />
      <FlechaAire T={T} x0={1100} y0={1040} x1={820} y1={1060} o={kclamp(aire * 3 - 2, 0, 1)} grosor={7} />
    </>}
  </g>;
}
// Cocina: estufa con olla, campana y ducto que saca el humo a la calle.
function Cocina({ T, x, y, on = 1 }) {
  const r = krng(8), humo = Array.from({ length: 12 }, () => ({ p: r(), dx: r() * 60 - 30 }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-60} width={340} height={260} rx={10} fill="#eef2f7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-170} y={-80} width={340} height={26} fill="#555b66" stroke={KC.ink} strokeWidth={6} />
    <path d="M -90 -80 L -100 -170 L 100 -170 L 90 -80 Z" fill="#c0c6cf" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-180} width={160} height={16} rx={6} fill="#8a929c" stroke={KC.ink} strokeWidth={5} />
    <path d="M -170 -420 L 170 -420 L 80 -320 L -80 -320 Z" fill="#c0c6cf" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-40} y={-600} width={80} height={182} fill="#c0c6cf" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -600 L -40 -640 L 220 -640 L 220 -560 L 40 -560" fill="#c0c6cf" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {humo.map((h, i) => { const u = ((T * 0.5 + h.p) % 1); const py = u < 0.5 ? -190 - u * 2 * 140 : -330 - (u - 0.5) * 2 * 270; const px = u < 0.75 ? h.dx * (1 - u) : 40 + (u - 0.75) * 4 * 200;
      const pyy = u < 0.75 ? py : -600;
      return <circle key={i} cx={px} cy={pyy} r={16 + u * 14} fill="#dfe3e8" stroke={KC.ink} strokeWidth={3} opacity={on * (0.85 - u * 0.4)} />; })}
    <text x={230} y={-660} textAnchor="end" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>hacia afuera →</text>
  </g>;
}
// Cubo de aire (23 litros, esquemático).
function CuboAire({ x, y, l = 90, o = 1 }) {
  const d = l * 0.4;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={`M 0 0 L ${l} 0 L ${l} ${-l} L 0 ${-l} Z`} fill="rgba(160,230,255,.8)" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 0 ${-l} L ${d} ${-l - d} L ${l + d} ${-l - d} L ${l} ${-l} Z`} fill="rgba(200,245,255,.9)" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${l} 0 L ${l + d} ${-d} L ${l + d} ${-l - d} L ${l} ${-l} Z`} fill="rgba(120,210,245,.8)" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Una palomita con texto (lista de "lo que sí sirve").
function Palomita({ T, at, until, texto, x, y }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, transformOrigin:'0 50%', opacity:e.o, display:'flex', alignItems:'center', gap:16,
    background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:20, padding:'8px 24px 8px 12px', boxShadow:`8px 8px 0 ${KC.ink}` }}>
    <div style={{ width:52, height:52, borderRadius:26, background:KC.leaf, border:`4px solid ${KC.ink}`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', font:`900 36px ${KF.texto}` }}>✓</div>
    <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}

function PlantasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Mito, Ca: CUES.Caja, P: CUES.Pregunta, S: CUES.Sala, E: CUES.Estudio, L: CUES.Litros, Cu: CUES.Cuenta, Si: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: el metro cuadrado que se llena de macetitas (32 × 32 = 1,024 lugares; se llenan 1,000)
  const g1 = kprog(T, K.G + 3.3, K.G + 3.9, kEase.sale), llen = kprog(T, K.G + 3.7, K.M - 0.6, kEase.suave);
  const cuadro = (n) => { const out = []; for (let k = 0; k < n; k++) { const c = k % 32, f = Math.floor(k / 32); out.push(<Macetita key={k} x={152 + c * 14.6} y={700 + f * 14.6 + 12} s={0.36} />); } return out; };
  // caja: gas que entra con la jeringa y luego baja (sin cifra: la NASA reportó que bajaba)
  const gas = kprog(T, K.Ca + 2.0, K.Ca + 3.0) * (1 - 0.85 * kprog(T, K.Ca + 4.0, K.P + 1.4, kEase.suave));
  const nivelQuim = 1 - 0.8 * kprog(T, K.Ca + 4.0, K.P + 1.4, kEase.suave);
  const factor = 86400 / (K.P + 1.4 - (K.Ca + 2.2));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la planta no es un purificador; 1 m² con hasta 1,000 macetas */}
      <Escena T={T} a={K.G} b={K.M}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={1 - g1} transform={`translate(${-g1 * 200} 0)`}><Planta T={T} x={330} y={1180} s={1.35} seed={2} /></g>
          <g opacity={g1}>
            <rect x={140} y={700} width={470} height={470} fill="#c98e5a" stroke={KC.ink} strokeWidth={8} />
            {cuadro(Math.round(1000 * llen))}
            <line x1={140} y1={1196} x2={610} y2={1196} stroke={KC.ink} strokeWidth={5} /><text x={375} y={1236} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>1 m</text>
          </g></>)}
      </Escena>
      {/* 2 · el mito: NASA 1989, espacios sellados (edificio hermético y base espacial) */}
      <Escena T={T} a={K.M} b={K.Ca}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g opacity={kprog(T, K.M + 2.4, K.M + 2.9)}><EdificioSellado x={270} y={1180} s={kprog(T, K.M + 2.4, K.M + 3.0, kEase.rebote) * 0.95} /></g>
          <g opacity={kprog(T, K.M + 3.8, K.M + 4.3)}><BaseEspacial T={T} x={770} y={1180} s={0.95 * kprog(T, K.M + 3.8, K.M + 4.4, kEase.rebote)} /></g>
        </>)}
      </Escena>
      {/* 3 · la caja sellada de la NASA: < 1 m³, 24 h */}
      <Escena T={T} a={K.Ca} b={K.P + 1.8}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <CamaraNASA T={T} x={470} y={1170} w={460} gas={gas}>
            <Planta T={T} x={520} y={1120} s={0.62} seed={7} />
          </CamaraNASA>
          <Jeringa x={890} y={810} p={kprog(T, K.Ca + 1.9, K.Ca + 2.8)} o={kprog(T, K.Ca + 1.3, K.Ca + 1.6) * (1 - kprog(T, K.Ca + 3.4, K.Ca + 3.8))} />
          <g opacity={kprog(T, K.Ca + 0.6, K.Ca + 1.0)}>
            <line x1={240} y1={1200} x2={700} y2={1200} stroke={KC.ink} strokeWidth={5} /><text x={470} y={1238} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>0.76 m</text>
          </g></>)}
      </Escena>
      {/* 4 · pregunta: ¿por qué no pasa en tu sala? */}
      <Escena T={T} a={K.P + 1.8} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        {svg(<text x={270} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 900)`}>?</text>)}
      </Escena>
      {/* 5 · tu casa no está sellada: entra aire por puerta, ventana y rendijas */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<Sala T={T} aire={kprog(T, K.S + 1.6, K.S + 4.2)} />)}
      </Escena>
      {/* 6 · el estudio: Drexel 2019, 12 estudios y 196 resultados */}
      <Escena T={T} a={K.E} b={K.L}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(Array.from({ length: 12 }, (_, i) => { const t0 = K.E + 2.6 + i * 0.16, e = kprog(T, t0, t0 + 0.3, kEase.rebote), c = i % 6, f = Math.floor(i / 6);
          return <g key={i} transform={`translate(${150 + c * 150} ${930 + f * 150}) rotate(${(i % 3 - 1) * 5}) scale(${e})`} opacity={kprog(T, t0, t0 + 0.15)}>
            <rect x={-48} y={-62} width={96} height={124} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            {[0, 1, 2, 3].map((l) => <line key={l} x1={-32} y1={-36 + l * 22} x2={l === 3 ? 6 : 32} y2={-36 + l * 22} stroke="#9aa3ad" strokeWidth={6} strokeLinecap="round" />)}
          </g>; }))}
      </Escena>
      {/* 7 · una planta ≈ 23 L de aire por hora vs. el aire que entra solo */}
      <Escena T={T} a={K.L} b={K.Cu}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Planta T={T} x={230} y={1180} s={0.8} seed={2} />
          <CuboAire x={330} y={1180} l={70} o={kprog(T, K.L + 0.8, K.L + 1.2)} />
          <g opacity={kprog(T, K.L + 2.0, K.L + 2.5)}>
            <rect x={600} y={760} width={320} height={300} fill="#9fe3ff" stroke={KC.ink} strokeWidth={8} />
            <line x1={760} y1={760} x2={760} y2={1060} stroke={KC.ink} strokeWidth={6} />
            <FlechaAire T={T} x0={980} y0={850} x1={500} y1={880} grosor={34} />
            <FlechaAire T={T} x0={980} y0={990} x1={540} y1={1010} grosor={24} />
          </g></>)}
      </Escena>
      {/* 8 · la cuenta: de 10 a 1,000 macetas por m² de piso */}
      <Escena T={T} a={K.Cu} b={K.Si}>
        <FondoLunares color={KC.orange} />
        {svg(<Sala T={T} planta={false} macetas={kprog(T, K.Cu + 0.6, K.Cu + 4.4, kEase.suave)} />)}
      </Escena>
      {/* 9 · lo que sí sirve: quitar la fuente, abrir ventanas, campana con salida afuera */}
      <Escena T={T} a={K.Si} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g transform="translate(-40 0)">
            <rect x={110} y={760} width={300} height={260} fill="#9fe3ff" stroke={KC.ink} strokeWidth={8} />
            <rect x={110} y={760} width={150 - 120 * kprog(T, K.Si + 2.6, K.Si + 3.4, kEase.sale)} height={260} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={6} />
            <rect x={260} y={760} width={150} height={260} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={6} />
            <FlechaAire T={T} x0={60} y0={890} x1={300} y1={900} grosor={14} o={kprog(T, K.Si + 3.0, K.Si + 3.5)} />
          </g>
          <g opacity={kprog(T, K.Si + 3.6, K.Si + 4.1)}><Cocina T={T} x={770} y={1000} on={kprog(T, K.Si + 4.0, K.Si + 4.6)} /></g>
        </>)}
      </Escena>
      {/* 10 · cierre: la planta del inicio, ahora junto a la ventana abierta */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={540} y={700} width={330} height={330} fill="#9fe3ff" stroke={KC.ink} strokeWidth={8} />
          <path d="M 560 960 Q 640 900 700 940 Q 770 890 850 930 L 850 1010 L 560 1010 Z" fill="#7cc46a" />
          <rect x={540} y={700} width={60} height={330} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={6} />
          <path d={`M 870 690 Q ${910 + Math.sin(T * 3) * 26} 840 ${885 + Math.sin(T * 2.4) * 36} 1040 L 950 1040 Q ${970 + Math.sin(T * 3) * 14} 840 930 690 Z`} fill={KC.coral} stroke={KC.ink} strokeWidth={6} />
          <FlechaAire T={T} x0={820} y0={860} x1={520} y1={900} grosor={16} />
          <Planta T={T} x={300} y={1180} s={1.25} seed={2} />
        </>)}
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 3.2} texto="purificador de aire" x={330} y={560} tam={44} />
      <NumeroGigante T={T} at={K.G + 3.5} until={K.M - 0.2} valor={1000} dur={2.2} prefijo="hasta " etiqueta="plantas en 1 m²" x={375} y={520} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.M + 0.3} until={K.Ca - 0.2} texto="NASA · 1989" y={470} x={300} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.M + 2.0} until={K.Ca - 0.2} texto="espacios sellados" y={570} x={300} tam={36} borde={KC.violet} />
      <Etq T={T} at={K.M + 2.9} until={K.Ca - 0.2} x={270} y={1240} texto="edificio hermético" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 4.4} until={K.Ca - 0.2} x={1040} y={1240} texto="base espacial" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.P + 1.4} texto="caja sellada · menos de 1 m³" y={470} x={360} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 2.4} until={K.Ca + 4.4} x={300} y={600} texto="benceno" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 3.0} until={K.Ca + 4.6} x={300} y={650} texto="formaldehído" lado="der" tam={30} color={KC.ink} />
      <Cronometro T={T} at={K.Ca + 2.2} until={K.P + 1.4} factor={factor} x={360} y={580} etiqueta="TIEMPO EN LA CAJA" />
      <Chip T={T} at={K.P + 0.2} until={K.P + 1.6} texto="el químico baja ↓" y={680} x={360} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.P + 2.0} until={K.S - 0.2} texto="¿y en tu sala?" y={470} x={300} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.4} until={K.E - 0.2} texto="tu casa no está sellada" y={470} x={540} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.S + 1.8} until={K.E - 0.2} x={160} y={700} texto="puerta" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 2.6} until={K.E - 0.2} x={680} y={680} texto="ventana" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 3.4} until={K.E - 0.2} x={930} y={1130} texto="rendijas" lado="izq" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.4} until={K.L - 0.2} anio="2019" quien="Cummings y Waring · Drexel, Filadelfia" revista="J. Expo. Sci. Environ. Epidemiol." y={640} />
      <Chip T={T} at={K.E + 2.6} until={K.L - 0.2} texto="12 estudios" y={1150} x={300} tam={34} borde={KC.ink} />
      <div style={{ position:'absolute', left:0, top:0, opacity:kvisible(T, K.E + 4.0, K.L - 0.3, 0) ? 1 : 0 }}>
        <Contador T={T} at={K.E + 4.0} hasta={196} dur={1.4} sufijo=" resultados" x={720} y={1150} tam={46} color={KC.texto} />
      </div>
      <Chip T={T} at={K.L + 0.9} until={K.Cu - 0.2} texto="1 planta ≈ 23 L de aire por hora" y={470} x={380} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.L + 1.2} until={K.Cu - 0.2} x={430} y={1050} texto="23 L" lado="der" tam={32} color={KC.ink} />
      <Etq T={T} at={K.L + 2.6} until={K.Cu - 0.2} x={920} y={720} texto="aire de afuera" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.L + 2.8} until={K.Cu - 0.2} texto="edificio típico: ~1 renovación por hora" y={570} x={430} tam={26} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Cu + 0.4} until={K.Si - 0.2} valor={1000} desde={10} dur={3.4} prefijo="10 a " etiqueta="plantas por m² de piso" x={380} y={500} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.Cu + 3.0} until={K.Si - 0.2} texto="sala de 4 × 4 m: ~1,700 plantas" y={1130} x={540} tam={30} borde={KC.ink} />
      <Palomita T={T} at={K.Si + 1.2} until={K.C - 0.2} texto="quitar lo que contamina" x={50} y={440} />
      <Palomita T={T} at={K.Si + 2.6} until={K.C - 0.2} texto="abrir ventanas" x={50} y={540} />
      <Palomita T={T} at={K.Si + 3.8} until={K.C - 0.2} texto="campana con salida afuera" x={50} y={640} />
      <Chip T={T} at={K.C + 0.5} until={K.Ou - 0.1} texto="bonita: sí · purificador: no" y={470} x={380} tam={34} borde={KC.ink} />
      <EscalaFija T={T} texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} o={T < K.Ca || (T > K.P + 1.8 && T < K.E) || T > K.L ? 1 : 0} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="No es purificador: *hasta 1,000 por m².*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.Ca - 0.1} texto="NASA, 1989: *espacios sellados.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.P - 0.1} texto="Caja sellada, *menos de 1 m³, 24 horas.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.S - 0.1} texto="¿Por qué no pasa *en tu sala?*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.E - 0.1} texto="Tu casa *no está sellada.*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.L - 0.1} texto="Drexel, 2019: *12 estudios, 196 resultados.*" />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.Cu - 0.1} texto="Una planta: *23 litros de aire por hora.*" />
      <Subtitulo T={T} idx={7} at={K.Cu + 0.1} until={K.Si - 0.1} texto="De *10 a 1,000 plantas* por m²." />
      <Subtitulo T={T} idx={8} at={K.Si + 0.1} until={K.C - 0.1} texto="Quita la fuente *y ventila.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Para el aire, *abre la ventana.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mito + 3.6, CUES.Caja - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Caja + 3.4, CUES.Pregunta - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Pregunta + 1.6, CUES.Sala + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Sala + 2.6, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Litros + 1.5, CUES.Cuenta - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cuenta + 2.0, CUES.Sirve - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Sirve + 2.5, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlantasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PlantasShot /></CompositionStage></div>;
}
window.PlantasApp = PlantasApp;
