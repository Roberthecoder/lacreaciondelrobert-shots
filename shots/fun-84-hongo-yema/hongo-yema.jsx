// Shot Fungi Mati #84 · Eso no es un huevo: es un hongo a punto de nacer — NARRADO (formato N1 Por dentro + escenas de estudio N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es guía de identificación de hongos.
// Viaje: huevo en el bosque del volcán → corte por dentro → hongo abierto → estudios y tianguis → el mismo huevo, ya transformado.

// ---------- TEXTOS EN PANTALLA (todos aquí, para cambiarlos fácil tras la verificación) ----------
const TX = {
  huevo: '¿un huevo?', nacer: 'un hongo a punto de nacer',
  volcan: 'La Malinche · Tlaxcala', cima: 'cima: 4,460 m', altura: '≈ 3,000 m', bosque: 'bosque de pinos y ailes', lluvias: 'se recolecta de julio a septiembre, ya entradas las lluvias',
  porDentro: 'POR DENTRO · EL «HUEVO»', sombrero: 'sombrero', laminillas: 'laminillas', pie: 'pie', velo: 'velo universal',
  volva: 'volva: bolsa blanca',
  cSombrero: 'sombrero rojo anaranjado', cLam: 'laminillas amarillas', cAnillo: 'anillo amarillo', cPie: 'pie amarillo', cVolva: 'volva blanca en saco',
  especie: 'Amanita basii', complejo: 'complejo Amanita caesarea', siete: 'en México se usan al menos 7 especies de este grupo',
  mortales: 'amanitas blancas mortales',
  est: { anio: '2002', quien: '3 pueblos de La Malinche', revista: 'Journal of Ethnobiology, 2002 · campo 1988–1992' },
  pueblos: ['Ixtenco (otomí)', 'Javier Mina (nahua)', 'Los Pilares (mestizo)'],
  entrevistas: 'entrevistas', cuestionarios: '+ 495 cuestionarios',
  nombresNum: ' nombres', nombresEtq: 'nombres comunes', especies40: '~40 especies que se comen (hongos y mixomicetos)',
  nombresAmarillo: ['hongo amarillo', 'ahuevadito', 'hongo flor', 'jícara buena'], otomi: 'otomí: K\'axjo (K\'axt\'i = amarillo + jo = hongo)',
  conocia: 'más del 95 % lo conocía',
  tianguis: 'tianguis de Acaxochitlán, Hidalgo · 2009', yemas: 'le dicen «yemas» o «yemitas»', miran: 'lo que miran las hongueras:',
  rasgos: ['sin «ajonjolí»', 'con «pañuelito»', 'con «botita»'], rasgosQue: ['(sin verrugas)', '(anillo)', '(volva)'],
  ojo: 'la mortal también los tiene: un rasgo no basta',
  yuyo: 'yuyo (comestible)', yuyoSp: 'Amanita hayalyuy', veneno: '«yuyo de veneno»', tseltal: 'en tseltal: «k\'antsu blanco»: el nombre avisa…',
  avisa: '…pero no todas las mortales son blancas', chiapas: 'Los Altos de Chiapas', algunos: '(en algunas comunidades)',
  sinRegla: 'no hay regla ni prueba general', sinFuente: 'para separar venenoso de comestible', sinFolk: 'ni trucos ni «pruebas» caseras',
  nofoto: 'foto', noregla: 'regla', noapp: 'app', experto: '✓ solo con un experto', medico: '¿Te sientes mal? Al médico, y lleva el hongo',
  ningun: 'Ningún rasgo, foto ni app basta',
  cierre: 'solo con un experto',
  aviso1: 'No es guía de identificación. Nunca comas hongos', aviso2: 'silvestres sin un experto. El dibujo es esquemático.',
};

// ---------- COLORES ----------
const HY = { rojo:'#d23a1c', naranja:'#ee6a1f', ambar:'#f6a72a', amarillo:'#f7cf2e', amarillo2:'#ffe27a', fibra:'#e0761c',
  blanco:'#f7f5ee', blanco2:'#dcd8cc', crema:'#fff3cf', tierra:'#6b4423', tierra2:'#4a2e17', aguja:'#a8743c', pino:'#1f6b3a', pino2:'#2c8a4b', aile:'#5bbd5a', roca:'#8a6f7c', roca2:'#6d5562' };
const PX_CM = 23; // a escala 1 el hongo mide ~18 cm (pie 13 cm + sombrero)

// ---------- HONGO AMARILLO (Amanita basii, complejo A. caesarea) ----------
// Base (fondo de la volva) en (x, y). crece 0..1: el pie se estira y el sombrero se abre. blanca = amanita mortal (todo blanco).
function HongoYema({ T = 0, x, y, s = 1, crece = 1, blanca = false, sinVolva = false, mece = 0 }) {
  const e = kEase.sale(kclamp(crece, 0, 1));
  const H = klerp(70, 300, e), W = klerp(150, 330, kEase.sale(kclamp(crece * 1.2 - 0.1, 0, 1)));
  const domo = klerp(0.62, 0.33, e);                  // de ovoide (joven) a convexo-plano (adulto)
  const C = blanca ? { a: HY.blanco, b: HY.blanco, c: '#ebe8de', lam: '#f2efe6', pie: HY.blanco, anillo: '#efece2', fib: '#d9d5ca' }
    : { a: HY.rojo, b: HY.naranja, c: HY.ambar, lam: HY.amarillo, pie: HY.amarillo, anillo: HY.amarillo2, fib: HY.fibra };
  const id = blanca ? 'hyB' : 'hyY';
  const rot = mece ? Math.sin(T * 1.3 + x) * 1.5 * mece : 0;
  const top = -H, cap = `M ${-W / 2} ${top} Q ${-W / 2} ${top - W * domo * 1.05} 0 ${top - W * domo} Q ${W / 2} ${top - W * domo * 1.05} ${W / 2} ${top} Q 0 ${top + W * 0.07} ${-W / 2} ${top} Z`;
  const anilloY = top + 28 + H * 0.1;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <defs>
      <radialGradient id={id} cx="50%" cy="15%" r="85%"><stop offset="0%" stopColor={C.a} /><stop offset="55%" stopColor={C.b} /><stop offset="100%" stopColor={C.c} /></radialGradient>
    </defs>
    {/* pie con fibrillas */}
    <path d={`M -24 -40 L -19 ${top} L 19 ${top} L 24 -40 Z`} fill={C.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: Math.floor(H / 34) }, (_, i) => { const yy = -60 - i * 32; return yy > anilloY + 10 ? <path key={i} d={`M -20 ${yy} Q -6 ${yy - 10} 0 ${yy} Q 8 ${yy - 10} 20 ${yy}`} stroke={C.fib} strokeWidth={4} fill="none" opacity=".85" /> : null; })}
    {/* laminillas (vistas bajo el borde del sombrero) */}
    <path d={`M ${-W / 2 + 8} ${top + 2} Q 0 ${top + W * 0.13} ${W / 2 - 8} ${top + 2} L ${W / 2 - 14} ${top - 4} L ${-W / 2 + 14} ${top - 4} Z`} fill={C.lam} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 11 }, (_, i) => { const u = (i + 1) / 12 - 0.5; return <line key={i} x1={u * (W - 30)} y1={top - 2} x2={u * (W - 50) * 0.7} y2={top + W * 0.08 * (1 - Math.abs(u) * 1.6)} stroke={blanca ? '#cfcabd' : '#d9a515'} strokeWidth={3} />; })}
    {/* anillo en faldita */}
    {e > 0.35 && <g opacity={kprog(e, 0.35, 0.6)}>
      <path d={`M -21 ${anilloY - 8} Q -46 ${anilloY + 22} -40 ${anilloY + 40} Q -20 ${anilloY + 30} 0 ${anilloY + 42} Q 20 ${anilloY + 30} 40 ${anilloY + 40} Q 46 ${anilloY + 22} 21 ${anilloY - 8} Z`} fill={C.anillo} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      {[-24, -8, 8, 24].map((dx) => <line key={dx} x1={dx * 0.6} y1={anilloY} x2={dx} y2={anilloY + 34} stroke={blanca ? '#cfcabd' : '#e2a51d'} strokeWidth={3} />)}
    </g>}
    {/* sombrero */}
    <path d={cap} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {/* estrías del margen */}
    {!blanca && Array.from({ length: 13 }, (_, i) => { const u = (i + 0.5) / 13 - 0.5, xx = u * W * 0.92, yb = top - 3 + Math.abs(u) * -2; return <line key={i} x1={xx} y1={yb} x2={xx * 0.93} y2={yb - W * domo * 0.28 * (1 - Math.abs(u))} stroke="#b8501a" strokeWidth={3.5} strokeLinecap="round" opacity=".8" />; })}
    <path d={`M ${-W * 0.28} ${top - W * domo * 0.72} Q 0 ${top - W * domo * 0.98} ${W * 0.22} ${top - W * domo * 0.8}`} stroke="#fff" strokeWidth={10} fill="none" opacity=".3" strokeLinecap="round" />
    {/* volva en saco */}
    {!sinVolva && <Volva />}
  </g>;
}
// Volva: bolsa blanca membranosa en la base, con borde lobulado. Base en (0, 0) del grupo.
function Volva({ alto = 95 }) {
  return <g>
    <path d={`M -58 -10 Q -64 ${-alto * 0.6} -46 ${-alto} L -34 ${-alto + 14} L -22 ${-alto - 6} L -8 ${-alto + 10} L 6 ${-alto - 8} L 20 ${-alto + 8} L 34 ${-alto - 4} L 48 ${-alto + 6} Q 64 ${-alto * 0.6} 58 -10 Q 40 8 0 8 Q -40 8 -58 -10 Z`} fill={HY.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -36 ${-alto + 16} Q -40 -40 -30 -18`} stroke={HY.amarillo2} strokeWidth={5} fill="none" opacity=".6" />
    <path d={`M 40 ${-alto + 10} Q 46 -40 36 -18`} stroke={HY.blanco2} strokeWidth={6} fill="none" />
  </g>;
}
// «Huevo» (botón envuelto en el velo universal). Base en (x, y). abre 0..1: la punta se rasga y el resto queda como volva.
// asoma 0..1: cuánto se ve el sombrero naranja por la grieta.
function Huevo({ T = 0, x, y, s = 1, grieta = 0, abre = 0, tiembla = 0 }) {
  const rx = 62, ry = 82, cy = -ry + 6;
  const sh = tiembla ? Math.sin(T * 40) * 2.5 * tiembla : 0;
  const yGr = cy - ry * 0.25;                            // línea donde se rompe
  const jag = Array.from({ length: 9 }, (_, i) => { const u = i / 8, xx = -rx + u * 2 * rx * 1.0; return `L ${xx.toFixed(1)} ${(yGr + (i % 2 ? -10 : 8) - Math.sin(u * Math.PI) * -2).toFixed(1)}`; }).join(' ');
  if (abre <= 0) return <g transform={`translate(${x + sh} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={cy} rx={rx} ry={ry} fill={HY.blanco} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-22} cy={cy - 30} rx={14} ry={26} fill="#fff" opacity=".8" transform={`rotate(-18 -22 ${cy - 30})`} />
    <path d={`M 34 ${cy - 50} Q 52 ${cy} 36 ${cy + 50}`} stroke={HY.blanco2} strokeWidth={8} fill="none" />
    {grieta > 0 && <path d={`M -10 ${cy - ry + 4} L -2 ${cy - ry + 20} L -14 ${cy - ry + 34} L 0 ${cy - ry + 48} L -6 ${cy - ry + 60}`} stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="80" strokeDashoffset={80 * (1 - grieta)} strokeLinecap="round" />}
    {grieta > 0.6 && <path d={`M -12 ${cy - ry + 14} Q 0 ${cy - ry + 30} -4 ${cy - ry + 46}`} stroke={HY.naranja} strokeWidth={6} fill="none" opacity={kprog(grieta, 0.6, 1)} />}
  </g>;
  const k = kEase.sale(abre);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* el hongo sale de adentro */}
    <HongoYema T={T} x={0} y={0} s={1} crece={0.02 + 0.2 * k} sinVolva />
    {/* mitad baja: se queda como volva */}
    <path d={`M ${-rx} ${yGr} ${jag} L ${rx} ${yGr} A ${rx} ${ry} 0 0 1 ${-rx} ${yGr} Z`} fill={HY.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform={`scale(${klerp(1, 0.95, k)} 1)`} />
    {/* tapitas que se van */}
    {k < 1 && [-1, 1].map((d) => <path key={d} d={`M 0 ${cy - ry} A ${rx} ${ry} 0 0 ${d > 0 ? 1 : 0} ${d * rx} ${yGr} L 0 ${yGr} Z`} fill={HY.blanco} stroke={KC.ink} strokeWidth={6}
      transform={`translate(${d * 70 * k} ${-60 * k}) rotate(${d * 40 * k} 0 ${yGr})`} opacity={1 - k} />)}
  </g>;
}
// Corte del «huevo» por dentro (para la Lupa): el hongo ya formado, envuelto en el velo universal. Se dibuja en un viewBox de 300×300.
function CorteHuevo({ T, r, p = 1 }) {
  const a = (i) => kclamp(p * 5 - i, 0, 1);
  return <svg width={r * 2} height={r * 2} viewBox="-150 -150 300 300" style={{ position:'absolute', inset:0 }}>
    <ellipse cx={0} cy={6} rx={104} ry={136} fill={HY.blanco} stroke="#fff" strokeWidth={3} />
    <ellipse cx={0} cy={6} rx={92} ry={124} fill={HY.crema} opacity={a(0)} />
    {/* sombrero (capa naranja-roja, en domo) */}
    <path d="M -80 -20 Q -80 -112 0 -116 Q 80 -112 80 -20 Q 40 -34 0 -34 Q -40 -34 -80 -20 Z" fill={HY.naranja} stroke={HY.rojo} strokeWidth={4} opacity={a(1)} />
    <path d="M -74 -30 Q -70 -100 0 -106 Q 70 -100 74 -30" fill="none" stroke={HY.rojo} strokeWidth={8} opacity={a(1)} />
    {/* laminillas: franjas amarillas bajo el sombrero */}
    <g opacity={a(2)}>{Array.from({ length: 12 }, (_, i) => { const xx = -66 + i * 12; return xx < -14 || xx > 14 ? <line key={i} x1={xx} y1={-26} x2={xx * 0.9} y2={10} stroke={HY.amarillo} strokeWidth={6} strokeLinecap="round" /> : null; })}</g>
    {/* velo parcial (futuro anillo) */}
    <path d="M -70 12 Q -40 22 -16 18 M 16 18 Q 40 22 70 12" stroke={HY.amarillo2} strokeWidth={5} fill="none" opacity={a(2)} />
    {/* pie */}
    <path d="M -14 -30 L -16 92 Q 0 104 16 92 L 14 -30 Z" fill={HY.amarillo2} stroke={HY.amarillo} strokeWidth={4} opacity={a(3)} />
    <ellipse cx={0} cy={6} rx={104} ry={136} fill="none" stroke="#fff" strokeWidth={10} opacity={0.6 + 0.4 * a(4)} />
  </svg>;
}

// ---------- ESCENARIOS ----------
// Volcán de fondo (silueta) para el bosque.
function VolcanLejos({ x = 540, y = 1100, s = 1, color = '#8fd8c0', o = 1 }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o} d="M -620 0 Q -360 -120 -170 -330 Q -90 -420 -40 -440 Q 0 -452 40 -436 Q 110 -400 190 -310 Q 360 -110 620 0 Z" fill={color} />;
}
function Pino({ x, y, s = 1, c = HY.pino }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-30} width={12} height={30} fill={HY.tierra2} />
    <path d="M 0 -160 L -40 -90 L -24 -90 L -56 -30 L 56 -30 L 24 -90 L 40 -90 Z" fill={c} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
function Aile({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-5} y={-50} width={10} height={50} fill={HY.tierra2} />
    <ellipse cx={0} cy={-80} rx={40} ry={46} fill={HY.aile} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Suelo del bosque con agujas de pino y hojarasca (desde y0 hacia abajo).
function SueloBosque({ y0 = 1130, seed = 4 }) {
  const g = krng(seed);
  const agujas = Array.from({ length: 70 }, () => [g() * 1080, y0 + 10 + g() * 170, g() * 180, 18 + g() * 26]);
  return <g>
    <path d={`M 0 ${y0} Q 270 ${y0 - 18} 540 ${y0} Q 810 ${y0 + 16} 1080 ${y0 - 6} L 1080 1920 L 0 1920 Z`} fill={HY.tierra} stroke={KC.ink} strokeWidth={6} />
    {agujas.map(([ax, ay, ang, L], i) => <line key={i} x1={ax} y1={ay} x2={ax + Math.cos(ang) * L} y2={ay + Math.sin(ang) * L * 0.3} stroke={i % 3 ? HY.aguja : '#c99a5a'} strokeWidth={4} strokeLinecap="round" />)}
    {[[140, y0 + 40], [900, y0 + 60], [400, y0 + 120], [760, y0 + 150]].map(([hx, hy], i) => <ellipse key={i} cx={hx} cy={hy} rx={34} ry={12} fill="#8a5a2a" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 25 - 20} ${hx} ${hy})`} />)}
  </g>;
}
// Bosque del gancho y del cierre: volcán lejano, pinos y ailes, suelo.
function Bosque({ T }) {
  return <>
    <FondoLunares color={KC.mint} />
    {fsvg(<>
      <VolcanLejos x={560} y={1130} s={1.1} color="#9fe6cf" />
      {[[80, 1135, 1.1], [220, 1130, 0.8], [960, 1135, 1.2], [840, 1130, 0.75]].map(([px, py, ps], i) => <Pino key={i} x={px} y={py} s={ps} c={i % 2 ? HY.pino2 : HY.pino} />)}
      <Aile x={330} y={1132} s={0.8} /><Aile x={720} y={1132} s={0.9} />
      <SueloBosque y0={1130} />
    </>, 10)}
  </>;
}
// Canasta de honguera (vista de frente) con hongos amarillos adentro.
function Canasta({ T, x, y, s = 1, llena = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {llena > 0 && [[-60, -70, -14], [0, -86, 4], [60, -70, 16], [-28, -60, -6], [32, -58, 8]].map(([hx, hy, r], i) => <g key={i} opacity={kprog(llena, i * 0.15, i * 0.15 + 0.3)} transform={`translate(${hx} ${hy}) rotate(${r})`}>
      <path d="M -40 0 Q -40 -36 0 -38 Q 40 -36 40 0 Z" fill={HY.naranja} stroke={KC.ink} strokeWidth={5} />
      <path d="M -36 0 Q 0 8 36 0" stroke={HY.amarillo} strokeWidth={8} fill="none" />
    </g>)}
    <path d="M -120 -60 L 120 -60 L 96 40 Q 0 56 -96 40 Z" fill="#c8913f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-30, -5, 20].map((yy) => <path key={yy} d={`M -112 ${yy} Q 0 ${yy + 10} 112 ${yy}`} stroke="#8a5a1e" strokeWidth={5} fill="none" />)}
    {[-80, -40, 0, 40, 80].map((xx) => <line key={xx} x1={xx} y1={-58} x2={xx * 0.86} y2={44} stroke="#8a5a1e" strokeWidth={4} />)}
    <path d="M -110 -60 Q 0 -230 110 -60" stroke="#8a5a1e" strokeWidth={12} fill="none" />
  </g>;
}
// Silueta chiquita de hongo (para la cuadrícula de 40).
function MiniHongo({ x, y, s = 1, color = '#b98a52', borde = KC.ink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-24} width={12} height={24} rx={4} fill="#f3e6c4" stroke={borde} strokeWidth={3} />
    <path d="M -24 -22 Q -24 -46 0 -48 Q 24 -46 24 -22 Z" fill={color} stroke={borde} strokeWidth={3} />
  </g>;
}
// Íconos de la regla de seguridad.
function IcoFoto({ x, y }) {
  return <g transform={`translate(${x} ${y}) rotate(-6)`}>
    <rect x={-90} y={-100} width={180} height={200} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-74} y={-84} width={148} height={130} fill="#9fe6cf" />
    <HongoYema x={0} y={40} s={0.32} />
  </g>;
}
function IcoRegla({ x, y }) {
  return <g transform={`translate(${x} ${y}) rotate(8)`}>
    <rect x={-46} y={-110} width={92} height={220} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-46} y1={-90 + i * 20} x2={i % 2 ? -22 : -6} y2={-90 + i * 20} stroke={KC.ink} strokeWidth={4} />)}
    <text x={20} y={10} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink} transform="rotate(-90 20 10)">SI TIENE…</text>
  </g>;
}
function IcoApp({ x, y }) {
  return <g transform={`translate(${x} ${y}) rotate(-4)`}>
    <rect x={-62} y={-110} width={124} height={220} rx={22} fill={KC.ink} />
    <rect x={-52} y={-90} width={104} height={170} rx={8} fill="#2346ff" />
    <circle cx={0} cy={-20} r={30} fill="none" stroke="#fff" strokeWidth={6} />
    <line x1={20} y1={0} x2={40} y2={24} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
    <rect x={-36} y={34} width={72} height={20} rx={10} fill={KC.mint} />
  </g>;
}
function Tache({ T, at, x, y, r = 110 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.3, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${klerp(1.8, 1, k)})`} opacity={kprog(T, at, at + 0.12)}>
    <path d={`M ${-r} ${-r} L ${r} ${r} M ${r} ${-r} L ${-r} ${r}`} stroke={KC.red} strokeWidth={26} strokeLinecap="round" />
  </g>;
}

// ---------- CONSTANTES DE ESCENA ----------
const HV = { x: 540, y: 1150, s: 2.4 };                     // el huevo del gancho y del cierre (misma imagen)
const G40 = Array.from({ length: 40 }, (_, i) => [655 + (i % 8) * 50, 800 + Math.floor(i / 8) * 62]);
const RASGOS_Y = [[800, 330, 750], [910, 280, 800], [1060, 290, 790]];   // y del rasgo · x en el comestible · x en la mortal (sombrero, anillo, volva)
const PUEBLOS = [[740, 1060], [620, 900], [400, 1000]];   // posiciones esquemáticas

function HongoYemaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Volcan, D: CUES.Dentro, R: CUES.Revienta, S: CUES.Sale, P: CUES.Pregunta, E: CUES.Estudio, N: CUES.Nombres,
    Ra: CUES.Rasgos, Y: CUES.Yuyo, I: CUES.Sin, Re: CUES.Regla, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sale = kprog(T, K.R + 0.4, K.S + 2.6);              // del huevo al hongo abierto (Revienta → Sale)
  const alt = (a) => 1250 - (a - 2000) / 2460 * 690;        // altitud → y en el volcán
  const medidor = kprog(T, K.V + 0.6, K.V + 2.4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un «huevo» blanco en el suelo del bosque del volcán; tiembla y se agrieta */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.06} origen="50% 60%">
        <Bosque T={T} />
        {fsvg(<Huevo T={T} x={HV.x} y={HV.y} s={HV.s} tiembla={1 - kprog(T, K.G + 1.2, K.G + 1.6)} grieta={kprog(T, K.G + 0.3, K.G + 1.4)} />, 15)}
      </Escena>
      {/* 2 · el volcán: La Malinche, bosque de pinos y ailes, ≈ 3,000 m */}
      <Escena T={T} a={K.V} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <path d="M 0 1250 Q 200 1180 330 940 Q 450 640 520 575 Q 545 556 575 568 Q 650 620 760 920 Q 880 1180 1080 1250 L 1080 1920 L 0 1920 Z" fill={HY.roca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <path d="M 520 575 Q 545 556 575 568 Q 600 590 620 640 Q 580 620 545 640 Q 510 615 480 640 Q 495 600 520 575 Z" fill="#e9e4ef" />
          {/* franja de bosque en las faldas */}
          {Array.from({ length: 16 }, (_, i) => { const u = i / 15, px = klerp(250, 840, u), py = alt(3000) + 40 + Math.abs(u - 0.5) * 230; return i % 3 === 1 ? <Aile key={i} x={px} y={py} s={0.55} /> : <Pino key={i} x={px} y={py} s={0.55} c={i % 2 ? HY.pino2 : HY.pino} />; })}
          {/* nubes de lluvia */}
          {[[200, 390], [430, 370]].map(([nx, ny], i) => <g key={i} transform={`translate(${nx + Math.sin(T * 0.6 + i) * 20} ${ny})`} opacity={kprog(T, K.V + 2.2, K.V + 2.8)}>
            <ellipse cx={0} cy={0} rx={110} ry={42} fill="#eef6ff" stroke={KC.ink} strokeWidth={5} /><ellipse cx={-50} cy={-26} rx={50} ry={36} fill="#eef6ff" stroke={KC.ink} strokeWidth={5} /><ellipse cx={30} cy={-34} rx={60} ry={42} fill="#eef6ff" stroke={KC.ink} strokeWidth={5} />
          </g>)}
          {/* medidor de altitud */}
          <line x1={90} y1={alt(2000)} x2={90} y2={alt(4460)} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          <line x1={90} y1={alt(2000)} x2={90} y2={klerp(alt(2000), alt(3000), medidor)} stroke={KC.yellow} strokeWidth={6} strokeLinecap="round" />
          <circle cx={90} cy={klerp(alt(2000), alt(3000), medidor)} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          <line x1={106} y1={alt(3000)} x2={250} y2={alt(3000)} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 8" opacity={medidor} />
        </>)}
      </Escena>
      {/* 3 · por dentro: corte del huevo (fondo oscuro) */}
      <Escena T={T} a={K.D} b={K.R} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<Huevo T={T} x={540} y={1180} s={1.1} />)}
      </Escena>
      <Lupa T={T} at={K.D + 0.15} until={K.R - 0.35} x={540} y={780} r={270} fx={540} fy={1090} interior={(t, r) => <CorteHuevo T={t} r={r} p={kprog(t, K.D + 0.4, K.D + 2.6)} />} tinte={KC.gold2} etiqueta={TX.porDentro} />
      {/* 4–5 · se rasga el velo y sale el hongo amarillo */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.05} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <VolcanLejos x={560} y={1150} s={1.1} color="#9fe6cf" />
          <SueloBosque y0={1150} seed={7} />
          {/* lluvia */}
          {T < K.S + 1 && Array.from({ length: 26 }, (_, i) => { const u = ((T * 1.4 + i * 0.137) % 1); return <line key={i} x1={(i * 97) % 1080} y1={320 + u * 820} x2={(i * 97) % 1080 - 8} y2={350 + u * 820} stroke="#2346ff" strokeWidth={5} strokeLinecap="round" opacity={0.35 * (1 - kprog(T, K.S, K.S + 1))} />; })}
          {sale < 0.12
            ? <Huevo T={T} x={klerp(540, 380, kprog(T, K.R, K.R + 0.6, kEase.suave))} y={1150} s={klerp(2.4, 1.4, kprog(T, K.R, K.R + 0.6, kEase.suave))} abre={kprog(T, K.R + 0.5, K.R + 1.6)} />
            : <HongoYema T={T} x={380} y={1150} s={1.4} crece={klerp(0.12, 1, kprog(sale, 0.12, 1))} mece={1} />}
        </>, 15)}
      </Escena>
      {/* 6 · re-gancho: la prima mortal también nace de un huevo */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <SueloBosque y0={1160} seed={9} />
          <HongoYema T={T} x={660} y={1170} s={0.85} mece={1} />
          {(() => { const u = kprog(T, K.P + 0.5, K.P + 2.2); return u < 0.25
            ? <Huevo T={T} x={910} y={1170} s={0.9} abre={kprog(u, 0.05, 0.25)} />
            : <HongoYema T={T} x={910} y={1170} s={0.85} crece={klerp(0.15, 1, kprog(u, 0.25, 1))} blanca mece={1} />; })()}
          <Interrogacion T={T} x={790} y={560} tam={300} />
        </>, 15)}
      </Escena>
      {/* 7 · el estudio de 2002: tres pueblos del volcán */}
      <Escena T={T} a={K.E} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <path d="M 120 1170 Q 300 1110 420 940 Q 500 830 540 820 Q 580 830 660 940 Q 780 1110 960 1170 Z" fill={HY.roca} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          {PUEBLOS.map(([px, py], i) => { const k = kprog(T, K.E + 1.4 + i * 0.5, K.E + 1.8 + i * 0.5, kEase.rebote); return <g key={i}>
            <circle cx={px} cy={py} r={20 * k} fill={[KC.pink, KC.cyan, KC.orange][i]} stroke={KC.ink} strokeWidth={5} />
          </g>; })}
        </>)}
      </Escena>
      {/* 8 · 121 nombres para 40 especies comestibles */}
      <Escena T={T} a={K.N} b={K.Ra} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {G40.map(([gx, gy], i) => { const k = kprog(T, K.N + 0.3 + i * 0.03, K.N + 0.6 + i * 0.03, kEase.rebote); const yo = i === 13 && T > K.N + 1.8;
            return k > 0 ? <g key={i}>{yo && <circle cx={gx} cy={gy - 22} r={34} fill={KC.white} stroke={KC.ink} strokeWidth={4} />}<MiniHongo x={gx} y={gy} s={k * (yo ? 1.15 : 0.95)} color={yo ? HY.naranja : '#b98a52'} /></g> : null; })}
          {T > K.N + 1.8 && <line x1={G40[13][0] - 34} y1={G40[13][1] - 22} x2={470} y2={G40[13][1] - 22} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" opacity={kprog(T, K.N + 1.8, K.N + 2.2)} />}
        </>)}
      </Escena>
      {/* 9 · tianguis de Hidalgo: las hongueras miran todo el hongo; la mortal también trae pañuelito y botita */}
      <Escena T={T} a={K.Ra} b={K.Y} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${i * 90} 300 L ${i * 90 + 90} 300 L ${i * 90 + 90} 370 Q ${i * 90 + 45} 400 ${i * 90} 370 Z`} fill={i % 2 ? KC.pink : KC.white} stroke={KC.ink} strokeWidth={4} />)}
          <rect x={-20} y={1110} width={1120} height={80} fill="#a8743c" stroke={KC.ink} strokeWidth={7} />
          <HongoYema T={T} x={250} y={1115} s={0.85} crece={kprog(T, K.Ra + 0.3, K.Ra + 1.0)} mece={0.5} />
          <HongoYema T={T} x={830} y={1115} s={0.85} crece={kprog(T, K.Ra + 2.6, K.Ra + 3.3)} blanca mece={0.5} />
          {RASGOS_Y.map((yy, i) => { const k1 = kprog(T, K.Ra + 1.0 + i * 0.4, K.Ra + 1.3 + i * 0.4), k2 = kprog(T, K.Ra + 3.3 + i * 0.3, K.Ra + 3.6 + i * 0.3);
            return <g key={i}>
              {k1 > 0 && <><line x1={430} y1={yy[0]} x2={klerp(430, yy[1], k1)} y2={yy[0]} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 7" /><circle cx={yy[1]} cy={yy[0]} r={14 * k1} fill="none" stroke={KC.ink} strokeWidth={5} /></>}
              {k2 > 0 && <><line x1={650} y1={yy[0]} x2={klerp(650, yy[2], k2)} y2={yy[0]} stroke={KC.red} strokeWidth={5} strokeDasharray="10 7" /><circle cx={yy[2]} cy={yy[0]} r={14 * k2} fill="none" stroke={KC.red} strokeWidth={5} /></>}
              {k1 > 0 && <text x={540} y={yy[0] + 10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={k1}>{TX.rasgos[i]}</text>}
              {k1 > 0 && <text x={540} y={yy[0] + 40} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink} opacity={k1 * 0.8}>{TX.rasgosQue[i]}</text>}
            </g>; })}
        </>)}
      </Escena>
      {/* 10 · Chiapas: el «yuyo de veneno» */}
      <Escena T={T} a={K.Y} b={K.I} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMexico x={30} y={320} ancho={300} conCA={false}>
            <circle cx={mxProy(-92.6, 16.7)[0]} cy={mxProy(-92.6, 16.7)[1]} r={26 * kprog(T, K.Y + 0.2, K.Y + 0.6, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
          </MapaMexico>
          <SueloBosque y0={1160} seed={11} />
          <HongoYema T={T} x={280} y={1170} s={0.85} crece={kprog(T, K.Y + 0.2, K.Y + 1.2)} mece={1} />
          <HongoYema T={T} x={790} y={1170} s={0.85} crece={kprog(T, K.Y + 0.8, K.Y + 1.8)} blanca mece={1} />
        </>, 15)}
      </Escena>
      {/* 11 · no hay regla ni prueba general: dos «huevos» iguales */}
      <Escena T={T} a={K.I} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <SueloBosque y0={1120} seed={13} />
          <Huevo T={T} x={310} y={1120} s={1.7} tiembla={0.25} />
          <Huevo T={T} x={770} y={1120} s={1.7} tiembla={0.25} />
          <text x={540} y={960} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.I + 0.6, K.I + 1.0)}>=</text>
          <g opacity={kprog(T, K.I + 1.0, K.I + 1.4)}><Interrogacion T={T} x={310} y={810} tam={150} /><Interrogacion T={T} x={770} y={810} tam={150} /></g>
        </>, 15)}
      </Escena>
      {/* 12 · la regla: ni foto, ni regla, ni app */}
      <Escena T={T} a={K.Re} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <IcoFoto x={210} y={790} /><IcoRegla x={540} y={790} /><IcoApp x={860} y={800} />
          <Tache T={T} at={K.Re + 0.7} x={210} y={790} /><Tache T={T} at={K.Re + 1.2} x={540} y={790} /><Tache T={T} at={K.Re + 1.7} x={860} y={800} r={100} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo huevo del inicio, ya transformado (canasta, prima mortal al fondo) */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="50% 60%">
        <Bosque T={T} />
        {fsvg(<>
          <HongoYema T={T} x={930} y={1140} s={0.6} blanca crece={kprog(T, K.C + 0.6, K.C + 1.6)} />
          <Canasta T={T} x={190} y={1110} s={0.85} llena={kprog(T, K.C + 0.2, K.C + 1.4)} />
          <Huevo T={T} x={HV.x} y={HV.y} s={HV.s} grieta={1} />
          <g opacity={kprog(T, K.C + 1.2, K.C + 1.6) * (1 - kprog(T, K.Ou, K.Ou + 0.4))}><Interrogacion T={T} x={540} y={740} tam={170} /></g>
        </>, 15)}
      </Escena>

      {/* ---------- textos ---------- */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.V - 0.4} texto={TX.huevo} x={330} y={520} tam={50} />
      <Chip T={T} at={K.G + 1.6} until={K.V - 0.4} texto={TX.nacer} x={360} y={640} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.V + 0.3} until={K.D - 0.4} x={60} y={480} texto={TX.volcan} tam={40} color={KC.ink} />
      <Etq T={T} at={K.V + 0.6} until={K.D - 0.4} x={500} y={575} lado="izq" texto={TX.cima} tam={28} color={KC.ink} />
      <Etq T={T} at={K.V + 2.0} until={K.D - 0.4} x={110} y={alt(3000) - 44} texto={TX.altura} tam={34} color={KC.ink} />
      <Etq T={T} at={K.V + 1.2} until={K.D - 0.4} x={60} y={1030} texto={TX.bosque} tam={30} color={KC.texto} />
      <Chip T={T} at={K.V + 2.6} until={K.D - 0.4} texto={TX.lluvias} x={540} y={1110} tam={24} borde={KC.blue} />
      <Etq T={T} at={K.D + 1.0} until={K.R - 0.4} x={300} y={620} lado="izq" texto={TX.sombrero} tam={30} color={HY.ambar} />
      <Etq T={T} at={K.D + 1.5} until={K.R - 0.4} x={262} y={760} lado="izq" texto={TX.laminillas} tam={30} color={HY.amarillo} />
      <Etq T={T} at={K.D + 2.0} until={K.R - 0.4} x={820} y={860} texto={TX.pie} tam={30} color={HY.amarillo2} />
      <Etq T={T} at={K.D + 2.5} until={K.R - 0.4} x={272} y={900} lado="izq" texto={TX.velo} tam={20} color={KC.texto} />
      <Etq T={T} at={K.R + 1.2} until={K.S - 0.2} x={460} y={1110} texto={TX.volva} tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 1.6} until={K.P - 0.4} x={625} y={650} texto={TX.cSombrero} tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 2.0} until={K.P - 0.4} x={600} y={745} texto={TX.cLam} tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 2.3} until={K.P - 0.4} x={445} y={835} texto={TX.cAnillo} tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 2.6} until={K.P - 0.4} x={420} y={960} texto={TX.cPie} tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 2.9} until={K.P - 0.4} x={470} y={1085} texto={TX.cVolva} tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 0.4} until={K.P - 0.4} x={60} y={380} texto={TX.especie} it tam={40} color={KC.ink} />
      <Etq T={T} at={K.S + 0.8} until={K.P - 0.4} x={60} y={430} texto={TX.complejo} it tam={26} color={KC.ink} />
      <Etq T={T} at={K.S + 1.2} until={K.P - 0.4} x={60} y={475} texto={TX.siete} tam={20} color={KC.ink} />
      <Etq T={T} at={K.P + 2.4} until={K.E - 0.4} x={1040} y={760} lado="izq" texto={TX.mortales} tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.N - 0.4} anio={TX.est.anio} quien={TX.est.quien} revista={TX.est.revista} x={540} y={510} />
      {TX.pueblos.map((n, i) => <Etq key={i} T={T} at={K.E + 1.5 + i * 0.5} until={K.N - 0.4} x={PUEBLOS[i][0] + (i === 2 ? -24 : 24)} y={PUEBLOS[i][1]} lado={i === 2 ? 'izq' : 'der'} texto={n} tam={22} color={KC.ink} />)}
      <NumeroGigante T={T} at={K.E + 2.6} until={K.N - 0.4} valor={191} dur={1.2} etiqueta={TX.entrevistas} x={250} y={830} tam={100} color={KC.pink} />
      <Chip T={T} at={K.E + 3.4} until={K.N - 0.4} texto={TX.cuestionarios} x={790} y={740} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.N + 0.1} until={K.Ra - 0.4} valor={121} dur={1.2} sufijo={TX.nombresNum} etiqueta={TX.nombresEtq} x={330} y={500} tam={110} color={KC.pink} />
      <Chip T={T} at={K.N + 0.7} until={K.Ra - 0.4} texto={TX.especies40} x={360} y={682} tam={22} borde={KC.ink} />
      <Chip T={T} at={K.N + 2.6} until={K.Ra - 0.4} texto={TX.conocia} x={250} y={748} tam={24} borde={HY.naranja} />
      {TX.nombresAmarillo.map((n, i) => <Etq key={i} T={T} at={K.N + 1.9 + i * 0.3} until={K.Ra - 0.4} x={60} y={810 + i * 58} texto={n} tam={28} color={KC.ink} />)}
      <Etq T={T} at={K.N + 3.1} until={K.Ra - 0.4} x={60} y={1110} texto={TX.otomi} tam={22} color={KC.ink} />
      <Chip T={T} at={K.Ra + 0.1} until={K.Y - 0.4} texto={TX.tianguis} x={390} y={460} tam={24} borde={KC.ink} />
      <Etq T={T} at={K.Ra + 0.4} until={K.Y - 0.4} x={60} y={530} texto={TX.yemas} tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ra + 0.9} until={K.Y - 0.4} x={60} y={580} texto={TX.miran} tam={24} color={KC.ink} />
      <Chip T={T} at={K.Ra + 3.9} until={K.Y - 0.4} texto={TX.ojo} x={560} y={670} tam={26} borde={KC.red} />
      <Etq T={T} at={K.Y + 0.4} until={K.I - 0.4} x={230} y={455} texto={TX.chiapas} tam={24} color={KC.ink} />
      <Etq T={T} at={K.Y + 0.6} until={K.I - 0.4} x={110} y={745} texto={TX.yuyo} tam={26} color={KC.ink} />
      <Etq T={T} at={K.Y + 0.9} until={K.I - 0.4} x={110} y={785} texto={TX.yuyoSp} it tam={22} color={KC.ink} />
      <Etq T={T} at={K.Y + 1.6} until={K.I - 0.4} x={600} y={745} texto={TX.veneno} tam={28} color={KC.ink} />
      <Etq T={T} at={K.Y + 1.8} until={K.I - 0.4} x={600} y={785} texto={TX.algunos} tam={18} color={KC.ink} />
      <Chip T={T} at={K.Y + 2.3} until={K.Y + 3.4} texto={TX.tseltal} x={480} y={675} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.Y + 3.5} until={K.I - 0.4} texto={TX.avisa} x={480} y={675} tam={24} borde={KC.red} />
      <Chip T={T} at={K.I + 0.2} until={K.Re - 0.4} texto={TX.sinRegla} x={380} y={480} tam={34} borde={KC.red} />
      <Etq T={T} at={K.I + 0.8} until={K.Re - 0.4} x={60} y={560} texto={TX.sinFuente} tam={22} color={KC.ink} />
      <Etq T={T} at={K.I + 2.2} until={K.Re - 0.4} x={60} y={600} texto={TX.sinFolk} tam={22} color={KC.ink} />
      <Chip T={T} at={K.Re + 0.2} until={K.C - 0.4} texto={TX.ningun} x={360} y={480} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Re + 2.4} until={K.C - 0.4} texto={TX.experto} x={540} y={990} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Re + 3.0} until={K.C - 0.4} texto={TX.medico} x={540} y={1090} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto={TX.cierre} x={330} y={480} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.C + 1.0} until={K.Ou} x={40} y={1480} texto={TX.aviso1} tam={22} color={KC.texto} />
      <Etq T={T} at={K.C + 1.0} until={K.Ou} x={40} y={1515} texto={TX.aviso2} tam={22} color={KC.texto} />

      {/* barras de escala (1 cm ≈ 23 px a escala 1) */}
      <BarraEscala T={T} at={K.G} until={K.V} texto="3 cm" largo={Math.round(3 * PX_CM * HV.s)} y={1580} />
      <BarraEscala T={T} at={K.V} until={K.D} texto="esquema · altitud sobre el mar" largo={0} y={1580} />
      <BarraEscala T={T} at={K.D} until={K.R} texto="1 cm" largo={Math.round(PX_CM * 1.1 * 600 / 272)} y={1580} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="5 cm" largo={Math.round(5 * PX_CM * 1.4)} y={1580} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={Math.round(5 * PX_CM * 0.85)} y={1580} />
      <BarraEscala T={T} at={K.E} until={K.Ra} texto="mapa esquemático" largo={0} y={1580} />
      <BarraEscala T={T} at={K.Ra} until={K.Y} texto="5 cm" largo={Math.round(5 * PX_CM * 0.85)} y={1580} />
      <BarraEscala T={T} at={K.Y} until={K.I} texto="5 cm · mapa esquemático" largo={Math.round(5 * PX_CM * 0.85)} y={1580} />
      <BarraEscala T={T} at={K.I} until={K.Re} texto="3 cm" largo={Math.round(3 * PX_CM * 1.7)} y={1580} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="3 cm" largo={Math.round(3 * PX_CM * HV.s)} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es un huevo: es *un hongo* a punto de nacer." />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.D - 0.1} texto="La Malinche: *pinos y ailes*, ~3,000 m." />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.R - 0.1} texto="Por dentro *ya viene armado.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.S - 0.1} texto="Al crecer, el velo se rasga: *queda una bolsa.*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="Sale el *hongo amarillo.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo lo reconocen *los que saben?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.N - 0.1} texto="2002: *191 personas* del volcán." />
      <Subtitulo T={T} idx={7} at={K.N + 0.1} until={K.Ra - 0.1} texto="*121 nombres* para ~40 especies." />
      <Subtitulo T={T} idx={8} at={K.Ra + 0.1} until={K.Y - 0.1} texto="Las mortales también traen *pañuelito y botita.*" />
      <Subtitulo T={T} idx={9} at={K.Y + 0.1} until={K.I - 0.1} texto="Algunos le dicen: *yuyo de veneno.*" />
      <Subtitulo T={T} idx={10} at={K.I + 0.1} until={K.Re - 0.1} texto="No hay regla ni prueba *general.*" />
      <Subtitulo T={T} idx={11} at={K.Re + 0.1} until={K.C - 0.1} texto="Ni foto, ni regla, ni app: *un experto.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Manjar… o *prima mortal?*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 1.1, K.D - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 0.5, K.S - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.2, K.E - 0.2, 'avatar_07_pensativo_puno', 'grande-izq'],
        [K.N + 0.1, K.Ra - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ra + 0.6, K.Y - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Y + 0.3, K.I - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.I + 0.4, K.Re - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Re + 0.3, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="84" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HongoYemaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HongoYemaShot /></CompositionStage></div>;
}
window.HongoYemaApp = HongoYemaApp;
