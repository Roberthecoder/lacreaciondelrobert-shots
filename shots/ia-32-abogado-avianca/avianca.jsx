// Shot IA #32 · El abogado que citó seis casos que inventó ChatGPT (Mata contra Avianca) — NARRADO (N6 "Guía irónica en pasos").
// Datos: Mata v. Avianca, Inc., 22-cv-1461 (PKC), S.D.N.Y., Opinion and Order on Sanctions (ECF 54, 22 jun 2023);
// base de datos AI Hallucination Cases de Damien Charlotin (28 oct 2026). Ver guion.md y verificacion.md. El dibujo es esquemático.

// Robert con un lado extra 'bajo-der' (debajo del subtítulo, nunca lo tapa). Misma animación que Sticker del kit.
const AV_LADOS = { 'arriba-der': { left:690, top:300, width:330 }, 'gancho': { left:600, top:230, width:460 }, 'izq-alto': { left:-10, top:300, width:330 },
  'grande': { left:520, top:560, width:580 }, 'grande-izq': { left:-20, top:580, width:520 }, 'bajo-der': { left:730, top:1400, width:340 } };
function StickerAV({ T, src, at, until, lado = 'arriba-der' }) {
  if (T < at || T > until + 0.45) return null;
  const L = AV_LADOS[lado] || AV_LADOS['arriba-der'];
  const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
  const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
  const desdeAbajo = lado !== 'arriba-der';
  const ty = desdeAbajo ? (1 - i) * 800 + o * 800 : 0, tx = desdeAbajo ? 0 : (1 - i) * 420 + o * 420;
  return <img src={src} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%',
    transform:`translate(${tx}px, ${ty}px) scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
}
function RobertAV({ T, apariciones = [], base = 'assets/stickers/' }) {
  return <>{apariciones.map(([at, until, pose, lado], i) => <StickerAV key={i} T={T} src={`${base}${pose}.png`} at={at} until={until} lado={lado} />)}</>;
}

// Los seis casos que el tribunal declaró inexistentes (orden del 22 jun 2023, ¶36).
const CASOS = [['Varghese', 'v. China Southern'], ['Shaboon', 'v. Egyptair'], ['Petersen', 'v. Iran Air'],
  ['Martinez', 'v. Delta Airlines'], ['Durden', 'v. KLM'], ['Miller', 'v. United Airlines']];
const POS6 = [[200, 830], [540, 830], [880, 830], [200, 1030], [540, 1030], [880, 1030]];

// Expediente (carpeta) con el nombre del caso y un sello rojo "NO EXISTE" (sello 0..1).
function Expediente({ x, y, s = 1, rot = 0, nombre, contra, sello = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -140 -95 L -140 -118 Q -140 -126 -132 -126 L -40 -126 Q -30 -126 -24 -116 L -16 -100 L 132 -100 Q 140 -100 140 -92 L 140 -80 Z" fill="#e0ad4f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-124} y={-112} width={248} height={120} rx={4} fill="#fffdf6" stroke={KC.ink} strokeWidth={4} transform="rotate(-3)" />
    <rect x={-140} y={-92} width={280} height={182} rx={12} fill="#f3c86b" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-12} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>{nombre}</text>
    <text x={0} y={30} textAnchor="middle" style={{ font:`italic 700 22px ${KF.mono}` }} fill="#5a3d10">{contra}</text>
    <line x1={-100} y1={58} x2={100} y2={58} stroke="#b8862f" strokeWidth={4} /><line x1={-100} y1={72} x2={60} y2={72} stroke="#b8862f" strokeWidth={4} />
    {sello > 0 && <g transform={`translate(0 10) rotate(-13) scale(${klerp(2.3, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-125} y={-36} width={250} height={72} rx={12} fill="rgba(255,59,47,.14)" stroke={KC.red} strokeWidth={8} />
      <text y={20} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.red}>NO EXISTE</text>
    </g>}
  </g>;
}
// Los seis expedientes; sello(i) da el avance del sello de cada uno.
function SeisExpedientes({ T, t0, sello, s = 0.95 }) {
  return <>{CASOS.map(([n, c], i) => { const [x, y] = POS6[i], e = kprog(T, t0 + i * 0.12, t0 + i * 0.12 + 0.45, kEase.rebote);
    return <Expediente key={i} x={x} y={y - (1 - e) * 260} s={s} rot={[-4, 3, -2, 2, -3, 4][i]} nombre={n} contra={c} sello={sello(i)} o={kprog(T, t0 + i * 0.12, t0 + i * 0.12 + 0.15)} />; })}</>;
}

// Encabezado de paso (N6): "PASO n / 4" + instrucción irónica.
function PasoN({ T, at, until, n, total = 4, texto, y = 330 }) {
  if (!kvisible(T, at, until, 0.35)) return null;
  const s = klerp(1.4, 1, kprog(T, at, at + 0.4, kEase.rebote)), o = kprog(T, at, at + 0.2) * (1 - kprog(T, until, until + 0.35));
  return <div style={{ position:'absolute', left:0, right:0, top:y, zIndex:44, textAlign:'center', opacity:o }}>
    <div style={{ display:'inline-block', transform:`scale(${s})`, background:KC.red, color:KC.paper, borderRadius:20, padding:'6px 28px 10px', font:`400 92px/1 ${KF.titulo}`, boxShadow:`10px 10px 0 ${KC.ink}` }}>PASO {n}<span style={{ fontSize:50, opacity:.75 }}> / {total}</span></div>
    <div style={{ font:`900 50px/1.1 ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:22, padding:'0 90px' }}>{texto}</div>
  </div>;
}

// Avión genérico de perfil (sin logos reales).
function Avion({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -20 -10 L -70 -80 L -40 -80 L 40 -10 Z" fill="#d9e2ee" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -150 0 Q -150 -34 -110 -34 L 120 -34 Q 170 -34 180 0 Q 170 30 120 30 L -110 30 Q -150 30 -150 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -2 L -175 -70 L -140 -70 L -100 -30 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-110} y={4} width={260} height={10} fill={KC.cyan} />
    {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={-80 + i * 30} cy={-12} r={7} fill="#7fb8ff" stroke={KC.ink} strokeWidth={3} />)}
    <path d="M 150 -20 Q 168 -16 172 -4 L 150 -4 Z" fill="#2b3a8a" />
    <path d="M -10 10 L -60 70 L -30 70 L 50 10 Z" fill="#c7d2e2" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Cabina en corte: pasajero sentado con la rodilla hacia el pasillo y un carrito de metal que lo golpea.
function Cabina({ T, carroX, golpe }) {
  const dolor = golpe > 0 ? Math.max(0, 1 - (T - golpe) * 0.5) : 0;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs><clipPath id="avCab"><rect x={70} y={760} width={940} height={400} rx={40} /></clipPath></defs>
    <g clipPath="url(#avCab)">
      <rect x={70} y={760} width={940} height={400} fill="#e9eef5" />
      <path d="M 70 760 L 1010 760 L 1010 800 Q 540 860 70 800 Z" fill="#cfd8e6" />
      {[160, 400, 640, 880].map((wx) => <g key={wx}><rect x={wx - 34} y={830} width={68} height={92} rx={34} fill="#9fd3ff" stroke={KC.ink} strokeWidth={5} /><circle cx={wx - 10} cy={856} r={8} fill="#fff" opacity=".7" /></g>)}
      <rect x={70} y={1110} width={940} height={60} fill="#8b93a6" />
      <line x1={70} y1={1110} x2={1010} y2={1110} stroke={KC.ink} strokeWidth={6} />
      {/* asiento */}
      <path d="M 250 1110 L 250 1060 L 450 1060 L 460 1030 L 270 1030 L 250 860 Q 245 840 225 842 L 210 846 Q 196 850 200 870 L 222 1060 L 230 1110 Z" fill="#3c5cc4" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {/* pasajero */}
      <path d="M 300 1030 L 280 900 Q 278 880 300 878 L 360 876 Q 384 876 386 900 L 400 1030 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={334} cy={842} r={40} fill="#c98a5e" stroke={KC.ink} strokeWidth={6} />
      <path d="M 296 828 Q 310 792 352 800 Q 378 806 374 832 Q 350 818 320 828 Z" fill="#2a1d14" />
      <path d="M 340 1000 L 560 1000 L 560 1040 L 340 1040 Z" fill="#2b3a8a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 528 1020 L 528 1100 L 582 1100 L 582 1020 Z" fill="#2b3a8a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 520 1098 L 600 1098 Q 610 1112 596 1114 L 520 1114 Z" fill="#1d1d22" />
      <circle cx={560} cy={1020} r={26} fill="#2b3a8a" stroke={KC.ink} strokeWidth={6} />
      {dolor > 0 && <circle cx={560} cy={1020} r={30 + 40 * (1 - dolor)} fill="none" stroke={KC.red} strokeWidth={8} opacity={dolor} />}
      {/* carrito de metal */}
      <g transform={`translate(${carroX} 0)`}>
        <rect x={0} y={900} width={220} height={190} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
        <rect x={-14} y={890} width={248} height={20} rx={6} fill="#aab1bf" stroke={KC.ink} strokeWidth={6} />
        {[950, 1000, 1050].map((ly) => <line key={ly} x1={14} y1={ly} x2={206} y2={ly} stroke="#8a93a4" strokeWidth={5} />)}
        <rect x={90} y={930} width={40} height={10} rx={4} fill={KC.ink} />
        <circle cx={34} cy={1098} r={12} fill={KC.ink} /><circle cx={186} cy={1098} r={12} fill={KC.ink} />
      </g>
    </g>
    <rect x={70} y={760} width={940} height={400} rx={40} fill="none" stroke={KC.ink} strokeWidth={8} />
    {golpe > 0 && T > golpe && T < golpe + 1.6 && <g transform={`translate(600 960) scale(${klerp(0.4, 1, kprog(T, golpe, golpe + 0.25, kEase.rebote))})`} opacity={1 - kprog(T, golpe + 1.2, golpe + 1.6)}>
      <path d="M 0 -80 L 22 -26 L 80 -40 L 40 6 L 76 50 L 18 34 L 0 86 L -18 34 L -76 50 L -40 6 L -80 -40 L -22 -26 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <text y={16} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>¡TAC!</text>
    </g>}
  </svg>;
}
// "Sentencia" falsa: solo un pedazo (la parte de abajo está arrancada).
function HojaFalsa({ x, y, s = 1, T = 0, falta = 0 }) {
  const r = krng(7);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-180} y={60} width={360} height={190} rx={10} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="16 12" opacity={falta} />
    <text x={0} y={180} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={falta * 0.55}>?</text>
    <path d="M -180 -220 L 180 -220 L 180 60 L 150 44 L 120 66 L 90 46 L 60 68 L 30 48 L 0 66 L -30 44 L -60 66 L -90 46 L -120 68 L -150 46 L -180 62 Z" fill="#fffdf6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={-170} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Varghese v. China</text>
    <text x={0} y={-136} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Southern Airlines</text>
    <line x1={-140} y1={-112} x2={140} y2={-112} stroke={KC.ink} strokeWidth={3} />
    {Array.from({ length: 6 }, (_, i) => { const yy = -80 + i * 22, l = 220 + r() * 60; let d = `M -140 ${yy}`; for (let k = 0; k < 10; k++) d += ` q ${l / 20} ${-4 - r() * 4} ${l / 10} 0`;
      return <path key={i} d={d} stroke="#5a524a" strokeWidth={3.5} fill="none" opacity=".7" />; })}
  </g>;
}
// Mazo de juez: se levanta y golpea en `th`.
function Mazo({ x, y, s = 1, T, th }) {
  const sube = kprog(T, th - 1.0, th - 0.35, kEase.sale), baja = kprog(T, th - 0.35, th, (p) => p * p);
  const ang = -48 * sube * (1 - baja) + (T > th ? Math.exp(-(T - th) * 8) * Math.sin((T - th) * 30) * -4 : 0);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={40} cy={86} rx={150} ry={26} fill="rgba(0,0,0,.18)" />
    <rect x={-50} y={50} width={180} height={40} rx={10} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${ang} 200 40)`}>
      <rect x={20} y={28} width={190} height={20} rx={8} fill="#a8703a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-10} y={-20} width={80} height={70} rx={14} fill="#a8703a" stroke={KC.ink} strokeWidth={7} />
      <rect x={-18} y={-10} width={14} height={50} rx={5} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
      <rect x={64} y={-10} width={14} height={50} rx={5} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    </g>
    {T > th && T < th + 0.5 && [0, 1, 2].map((k) => <line key={k} x1={-20 + k * 60} y1={30} x2={-40 + k * 80} y2={-20 - 40 * kprog(T, th, th + 0.3)} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" opacity={1 - kprog(T, th + 0.2, th + 0.5)} />)}
  </g>;
}
// Juez de caricatura con toga y la placa del caso falso que le atribuyeron.
function Juez({ x, y, s = 1, T = 0, caso, carta = 0, piel = '#e0a878' }) {
  const b = Math.sin(T * 2 + x) * 3;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -70 120 L -56 30 Q -50 10 -20 8 L 20 8 Q 50 10 56 30 L 70 120 Z" fill="#1d1d22" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -16 10 L 0 40 L 16 10 Z" fill="#fff" />
    <circle cx={0} cy={-30} r={40} fill={piel} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-14} cy={-34} r={5} fill={KC.ink} /><circle cx={14} cy={-34} r={5} fill={KC.ink} />
    <path d={carta > 0.5 ? 'M -14 -12 Q 0 -20 14 -12' : 'M -14 -14 Q 0 -6 14 -14'} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -40 -40 Q -44 -78 0 -76 Q 44 -78 40 -40 Q 30 -62 0 -62 Q -30 -62 -40 -40 Z" fill="#9aa0aa" />
    <rect x={-92} y={128} width={184} height={40} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={156} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>«{caso}»</text>
    {carta > 0.95 && <g transform="translate(50 -60) scale(.5)"><Sobre /></g>}
  </g>;
}
function Sobre() {
  return <g>
    <rect x={-60} y={-40} width={120} height={80} rx={8} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 -40 L 0 8 L 60 -40" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={8} r={10} fill={KC.red} />
  </g>;
}
// Palomita (verde) que se convierte en tache (rojo): v = 0..1.
function PalomitaTache({ x, y, s = 1, v = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={100} fill={mixHex(KC.mint, KC.red, v)} stroke={KC.ink} strokeWidth={9} />
    <path d="M -46 4 L -12 38 L 50 -34" stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={1 - v} />
    <g opacity={v}><line x1={-40} y1={-40} x2={40} y2={40} stroke={KC.paper} strokeWidth={20} strokeLinecap="round" /><line x1={40} y1={-40} x2={-40} y2={40} stroke={KC.paper} strokeWidth={20} strokeLinecap="round" /></g>
  </g>;
}
// Lupa simple.
function LupaSimple({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={60} y1={60} x2={150} y2={150} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <line x1={60} y1={60} x2={150} y2={150} stroke="#8a5a2b" strokeWidth={18} strokeLinecap="round" />
    <circle r={90} fill="rgba(160,220,255,.28)" stroke={KC.ink} strokeWidth={14} />
    <path d="M -50 -40 Q -40 -62 -14 -66" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".8" />
  </g>;
}
// Tarjeta de texto (documento) que se acomoda en varias líneas.
function Documento({ T, at, until, encabezado, texto, x = KW / 2, y = 760, ancho = 900, tam = 46 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-1.5deg)`, opacity:e.o,
    background:'#fffdf6', border:`7px solid ${KC.ink}`, borderRadius:18, padding:'22px 34px 28px', boxShadow:`12px 12px 0 ${KC.ink}`, boxSizing:'border-box' }}>
    <div style={{ font:`700 28px ${KF.mono}`, color:KC.red, borderBottom:`4px solid ${KC.ink}`, paddingBottom:10, marginBottom:14 }}>{encabezado}</div>
    <div style={{ font:`900 ${tam}px/1.2 ${KF.texto}`, color:KC.ink }}>{texto}</div>
  </div>;
}
// Tarjeta chica que se acomoda en varias líneas (para la izquierda de la pantalla).
function Nota({ T, at, until, texto, x, y, ancho = 460, tam = 44, borde = KC.gold, fondo = 'rgba(14,15,18,.86)', color = KC.texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, transformOrigin:'0 50%', opacity:e.o,
    background:fondo, color, border:`5px solid ${borde}`, borderRadius:30, padding:'18px 28px', font:`900 ${tam}px/1.15 ${KF.texto}`, boxShadow:'0 10px 30px rgba(0,0,0,.45)', boxSizing:'border-box' }}>{texto}</div>;
}
// Cuadrícula de expedientes: cada cuadrito = 10 casos (223 llenos = 2,230 casos; el contador dice 2,231).
function Expedientitos({ T, llenos, x = 92, y = 660 }) {
  const cols = 16, out = [];
  for (let i = 0; i < 224; i++) { const c = i % cols, rr = Math.floor(i / cols), px = x + c * 56, py = y + rr * 32;
    const on = i < llenos;
    out.push(<g key={i} transform={`translate(${px} ${py})`}>
      <rect width={46} height={26} rx={4} fill={on ? '#f3c86b' : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={3} />
      {on && <rect x={10} y={8} width={26} height={10} rx={2} fill="none" stroke={KC.red} strokeWidth={3} />}
    </g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}

function Avianca() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P1: CUES.Paso1, P2: CUES.Paso2, P3: CUES.Paso3, Q: CUES.Pregunta, R: CUES.Respuesta, M: CUES.Multa, Co: CUES.Conteo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const G2 = K.G + 6.3, M2 = K.M + 7.1; // segunda línea del gancho y de la multa
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // paso 1: avión y carrito
  const vuelo = kprog(T, K.P1 + 0.3, K.P1 + 3.0, kEase.suave);
  const golpe = K.P1 + 4.4;
  const carroX = T < golpe ? klerp(1150, 576, kprog(T, K.P1 + 3.2, golpe, (p) => p * p)) : 576 + 26 * Math.exp(-(T - golpe) * 3) * Math.sin(Math.min(Math.PI, (T - golpe) * 9));
  // conteo
  const llenos = Math.round(223 * kprog(T, K.Co + 0.6, K.Co + 3.6, kEase.suave));
  // cierre: la lupa pasa sobre los expedientes y revela el sello
  const lupaX = klerp(-80, 1160, kprog(T, K.C + 0.8, K.C + 4.0, kEase.suave)), lupaY = (t) => 930 + Math.sin(t * 2.4) * 40;
  const selloCierre = (i) => { const px = POS6[i][0]; return kprog(lupaX, px - 40, px + 40); };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: seis expedientes que no existen */}
      <Escena T={T} a={K.G} b={K.P1}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={1 - kprog(T, K.G + 4.6, K.G + 5.1)}><Robotito x={300} y={560} s={0.8} T={T} cara="feliz" /></g>
          <SeisExpedientes T={T} t0={K.G - 0.05} sello={(i) => kprog(T, K.G + 0.55 + i * 0.32, K.G + 0.85 + i * 0.32, kEase.sale)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 1.4} until={K.G + 4.5} texto="hechos por ChatGPT" x={300} y={360} tam={34} borde={KC.cyan} />
      <Nota T={T} at={G2 - 0.6} until={K.P1 - 0.2} x={90} y={520} ancho={900} tam={76} borde={KC.red} fondo={KC.paper} color={KC.ink}
        texto={<span><span style={{ font:`700 30px ${KF.mono}`, color:KC.red, display:'block', marginBottom:8 }}>MANUAL (IRÓNICO)</span>Cómo lograr que te multen</span>} />

      {/* 2 · paso 1: la demanda contra Avianca */}
      <Escena T={T} a={K.P1} b={K.P2}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <path d="M 150 690 Q 540 560 930 690" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" fill="none" opacity=".6" />
          <circle cx={150} cy={690} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cx={930} cy={690} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          <text x={150} y={740} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>El Salvador</text>
          <text x={930} y={740} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Nueva York</text>
          <Avion x={klerp(150, 930, vuelo)} y={690 - Math.sin(Math.PI * vuelo) * 98} s={0.5} rot={klerp(-14, 14, vuelo)} />
        </>)}
        <Cabina T={T} carroX={carroX} golpe={golpe} />
      </Escena>
      <PasoN T={T} at={K.P1 + 0.05} until={K.P2 - 0.25} n={1} texto="Toma una demanda contra una aerolínea" />
      <Chip T={T} at={K.P1 + 1.6} until={K.P1 + 4.0} texto="Avianca · aerolínea de Colombia" x={540} y={605} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.P1 + 4.5} until={K.P2 - 0.25} texto="carrito de metal → rodilla" x={540} y={605} tam={34} borde={KC.red} />

      {/* 3 · paso 2: pídele casos a ChatGPT */}
      <Escena T={T} a={K.P2} b={K.P3}>
        <FondoLunares color={KC.lilac} />
        {svg(<g opacity={kprog(T, K.P2 + 2.6, K.P2 + 3.0)}><HojaFalsa x={790} y={820} s={0.82} T={T} falta={kprog(T, K.P2 + 3.6, K.P2 + 4.2)} /></g>)}
      </Escena>
      {T > K.P2 - 0.45 && T < K.P3 + 0.45 && <div style={{ opacity: kprog(T, K.P2 - 0.45, K.P2 + 0.05) * (1 - kprog(T, K.P3 - 0.05, K.P3 + 0.45)) }}>
        <CelularChat T={T} x={300} y={850} s={0.6} tam={40} mensajes={[
          { at: K.P2 + 0.6, yo: true, texto: 'Dame casos sobre aerolíneas' },
          { at: K.P2 + 1.5, texto: 'Varghese v. China Southern Airlines (2019)' },
          { at: K.P2 + 2.1, texto: 'Shaboon v. Egyptair (2013)' },
          { at: K.P2 + 2.6, texto: 'Petersen v. Iran Air (2012)…' }]} escribe={[K.P2 + 1.0, K.P2 + 1.5]} />
      </div>}
      <PasoN T={T} at={K.P2 + 0.05} until={K.P3 - 0.25} n={2} texto="Pídele casos a ChatGPT" />
      <Chip T={T} at={K.P2 + 3.9} until={K.P3 - 0.25} texto="texto completo: ✗" x={790} y={1100} tam={36} borde={KC.red} />

      {/* 4 · paso 3: no retires nada */}
      <Escena T={T} a={K.P3} b={K.Q}>
        <FondoLunares color={KC.pink} />
      </Escena>
      <PasoN T={T} at={K.P3 + 0.05} until={K.Q - 0.25} n={3} texto="Si no los encuentran, no retires nada" />
      <Documento T={T} at={K.P3 + 0.5} until={K.Q - 0.25} y={800} encabezado="ESCRITO DE AVIANCA · 15 MAR 2023" texto="«No hemos podido encontrar la mayoría de los casos citados»" />
      <Chip T={T} at={K.P3 + 2.3} until={K.Q - 0.25} texto="¿Retirar el escrito?  ✗ No" x={430} y={1080} tam={40} borde={KC.ink} />

      {/* 5 · re-gancho */}
      <Escena T={T} a={K.Q} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.Q + 0.3} until={K.R - 0.2} texto="«¿son reales?»" x={300} y={440} tam={44} borde={KC.ink} />

      {/* 6 · la respuesta de ChatGPT */}
      <Escena T={T} a={K.R} b={K.M}>
        <FondoCircuito T={T} />
        {svg(<PalomitaTache x={830} y={800} s={kprog(T, K.R + 2.3, K.R + 2.7, kEase.rebote)} v={kprog(T, K.R + 4.0, K.R + 4.4, kEase.sale)} />)}
      </Escena>
      {T > K.R - 0.45 && T < K.M + 0.45 && <div style={{ opacity: kprog(T, K.R - 0.45, K.R + 0.05) * (1 - kprog(T, K.M - 0.05, K.M + 0.45)) }}>
        <CelularChat T={T} x={340} y={830} s={0.6} tam={40} mensajes={[
          { at: K.R + 0.4, yo: true, texto: '¿Varghese es un caso real?' },
          { at: K.R + 1.9, texto: 'Sí, existe. Lo encuentras en bases de datos legales.' }]} escribe={[K.R + 0.9, K.R + 1.9]} />
      </div>}
      <Nota T={T} at={K.R + 2.6} until={K.M - 0.2} x={680} y={1010} ancho={320} tam={22} borde={KC.cyan} texto="paráfrasis · las capturas reales están en la orden del juez" />

      {/* 7 · paso 4: la sentencia y la multa */}
      <Escena T={T} a={K.M} b={K.Co}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={kprog(T, K.M + 2.0, K.M + 2.4) * (1 - kprog(T, M2 - 0.3, M2))}><Mazo x={180} y={980} s={1.1} T={T} th={K.M + 3.3} /></g>
          {T > M2 - 0.3 && CASOS.map(([n], i) => { const jx = [220, 540, 860][i % 3], jy = i < 3 ? 720 : 960, tE = M2 + 0.6 + i * 0.42, v = kprog(T, tE, tE + 0.6, kEase.sale);
            return <g key={i}>
              <g opacity={kprog(T, M2 - 0.2 + i * 0.08, M2 + 0.2 + i * 0.08)}><Juez x={jx} y={jy} s={0.85} T={T} caso={n} carta={v} piel={['#e0a878', '#c98a5e', '#f1c49d', '#a86f45', '#e8b48c', '#d49a6a'][i]} /></g>
              {v > 0 && v < 1 && <g transform={`translate(${klerp(540, jx + 42, v)} ${klerp(1160, jy - 50, v) - Math.sin(Math.PI * v) * 120}) rotate(${v * 360}) scale(.55)`}><Sobre /></g>}
            </g>; })}
        </>)}
      </Escena>
      <PasoN T={T} at={K.M + 0.05} until={K.M + 1.7} n={4} texto="Espera la sentencia" />
      <TarjetaEstudio T={T} at={K.M + 1.1} until={K.M + 4.6} anio="2023" quien="22 de junio · juez P. Kevin Castel" revista="Tribunal federal · Distrito Sur de Nueva York" y={650} />
      <NumeroGigante T={T} at={K.M + 5.2} until={M2 - 0.3} valor={5000} dur={0.9} prefijo="$" etiqueta="dólares de multa" x={660} y={660} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.M + 4.2} until={M2 - 0.3} texto="a los 2 abogados y su despacho" x={620} y={880} tam={36} borde={KC.ink} />
      <Nota T={T} at={M2 + 0.1} until={K.Co - 0.25} x={90} y={470} ancho={900} tam={40} borde={KC.ink}
        texto="Una carta a cada juez que pusieron como autor de un caso falso" />

      {/* 8 · conteo: no fue el único */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <Expedientitos T={T} llenos={llenos} />
      </Escena>
      <NumeroGigante T={T} at={K.Co + 0.5} until={K.C - 0.25} valor={2231} dur={3.1} etiqueta="" x={540} y={430} tam={170} color={KC.red} />
      <Chip T={T} at={K.Co + 0.9} until={K.C - 0.25} texto="casos en tribunales con contenido inventado por IA" x={540} y={590} tam={28} borde={KC.red} />
      <Chip T={T} at={K.Co + 2.0} until={K.C - 0.25} texto="cada cuadrito = 10 casos · base de D. Charlotin · 28 oct 2026" x={540} y={1150} tam={20} mono borde={KC.ink} />

      {/* 9 · cierre: los mismos seis expedientes, ahora revisados por ti */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <SeisExpedientes T={T} t0={K.C - 0.6} sello={selloCierre} />
          <LupaSimple x={lupaX} y={lupaY(T)} s={0.9} />
        </>)}
      </Escena>
      <Nota T={T} at={K.C + 0.3} until={K.C + 2.4} x={60} y={520} ancho={500} tam={46} borde={KC.ink} texto={<span>Usar IA: ✔<br/>Revisar: <span style={{ color:KC.gold2 }}>te toca a ti</span></span>} />
      <Nota T={T} at={K.C + 2.6} until={K.Ou} x={60} y={520} ancho={500} tam={46} borde={KC.leaf} texto={<span>✔ Busca cada caso <span style={{ color:KC.mint }}>en la fuente</span></span>} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={G2 - 0.1} texto="Estos 6 casos *no existen.*" />
      <Subtitulo T={T} idx={1} at={G2} until={K.P1 - 0.1} texto="¿Quieres que *te multen?*" />
      <Subtitulo T={T} idx={2} at={K.P1 + 0.1} until={K.P2 - 0.1} texto="Paso 1: una demanda contra *Avianca.*" />
      <Subtitulo T={T} idx={3} at={K.P2 + 0.1} until={K.P3 - 0.1} texto="Paso 2: cítalos *sin leerlos.*" />
      <Subtitulo T={T} idx={4} at={K.P3 + 0.1} until={K.Q - 0.1} texto="Paso 3: *no retires nada.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.R - 0.1} texto="¿Y si le preguntas *si son reales?*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.M - 0.1} texto="Le dijo: *«sí existe».*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={M2 - 0.1} texto="Paso 4: multa de *5,000 dólares.*" />
      <Subtitulo T={T} idx={8} at={M2} until={K.Co - 0.1} texto="Cartas a cada *juez usado como autor.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.C - 0.1} texto="Más de *2,200 casos* así." />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Busca cada caso *en la fuente.*" />

      <RobertAV T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Gancho + 6.4, CUES.Paso1 - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [CUES.Paso1 + 4.0, CUES.Paso2 - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [CUES.Paso2 + 3.4, CUES.Paso3 - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [CUES.Paso3 + 1.0, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [CUES.Pregunta + 0.05, CUES.Respuesta + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Respuesta + 2.9, CUES.Multa - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Multa + 4.8, CUES.Multa + 6.8, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Multa + 8.3, CUES.Conteo - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [CUES.Conteo + 1.6, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [CUES.Cierre + 2.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="ia" num="32" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AviancaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Avianca /></CompositionStage></div>;
}
window.AviancaApp = AviancaApp;
