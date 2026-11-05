// Shot Fungi Mati #134 · Ese polvo es un mapa de la región donde vives — NARRADO (N1 Por dentro + N5 El experimento).
// Gancho 1 «Esto no es X: es Y». Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (mapas y esporas).

const PX = { madera:'#b9773d', madera2:'#8a5226', madera3:'#d99a5c', polvo:'#9b958c', polvo2:'#c9c3b8', piel:'#f1b48f', piel2:'#d98f6b',
  pared:'#fff4dc', clado:'#4a5a3a', clado2:'#7f9a5e', alter:'#7a4a22', alter2:'#b47a3e', algodon:'#fbfaf5' };

// Viga de arriba del marco de la puerta (vista de cerca). x, y = esquina superior izquierda. limpio 0..1 = cuánto limpió el dedo.
function ViGaMarco({ x, y, w = 1080, h = 150, polvo = 1, limpio = 0, seed = 3 }) {
  const g = krng(seed), motas = Array.from({ length: 70 }, () => [g() * w, g() * 22, 2 + g() * 5]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} fill={PX.madera} stroke={KC.ink} strokeWidth={8} />
    {[34, 70, 108].map((yy, i) => <path key={i} d={`M 0 ${yy} Q ${w * 0.3} ${yy - 10} ${w * 0.6} ${yy + 4} T ${w} ${yy - 2}`} stroke={PX.madera2} strokeWidth={5} fill="none" opacity=".7" />)}
    <rect x={0} y={h - 26} width={w} height={26} fill={PX.madera2} stroke={KC.ink} strokeWidth={6} />
    {/* capa de polvo encima de la viga */}
    <g opacity={polvo}>
      <rect x={limpio * w} y={-20} width={Math.max(0, w - limpio * w)} height={24} rx={8} fill={PX.polvo} stroke={KC.ink} strokeWidth={4} />
      {motas.map(([mx, my, r], i) => mx > limpio * w ? <circle key={i} cx={mx} cy={-18 + my * 0.6} r={r} fill={i % 3 ? PX.polvo2 : '#7d776e'} /> : null)}
    </g>
  </g>;
}
// Dedo que pasa sobre el marco (punta en x, y).
function Dedo({ x, y, rot = -8 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-60} y={-330} width={120} height={350} rx={58} fill={PX.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -36 -10 Q 0 6 36 -10 L 30 -70 Q 0 -80 -30 -70 Z" fill="#ffd9c4" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -150 Q 0 -136 40 -150" stroke={PX.piel2} strokeWidth={5} fill="none" />
    <rect x={-56} y={-6} width={112} height={18} rx={9} fill={PX.polvo} opacity=".85" />
  </g>;
}
// Puerta completa con su marco. Base al centro (x, y). polvo 0..1 en la viga de arriba.
function Puerta({ x, y, s = 1, polvo = 1, color = '#2a6fdb', abierta = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-250} y={-900} width={500} height={900} fill={PX.madera} stroke={KC.ink} strokeWidth={9} />
    <rect x={-205} y={-860} width={410} height={860} fill="#2b2420" />
    <g transform={`translate(-205 0) scale(${1 - abierta * 0.55} 1)`}>
      <rect x={0} y={-860} width={410} height={860} fill={color} stroke={KC.ink} strokeWidth={8} />
      <rect x={50} y={-800} width={310} height={330} rx={12} fill="none" stroke={KC.ink} strokeWidth={6} opacity=".5" />
      <rect x={50} y={-420} width={310} height={360} rx={12} fill="none" stroke={KC.ink} strokeWidth={6} opacity=".5" />
      <circle cx={360} cy={-430} r={20} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
    </g>
    <rect x={-270} y={-930} width={540} height={50} fill={PX.madera3} stroke={KC.ink} strokeWidth={8} />
    <rect x={-262} y={-946} width={524 * polvo} height={16} rx={6} fill={PX.polvo} stroke={KC.ink} strokeWidth={3} opacity={polvo > 0 ? 1 : 0} />
  </g>;
}
// Espora de Cladosporium: célula pequeña, ovalada (limón), en cadenas ramificadas. Medidas en px a 8 px/µm.
function CadenaClado({ x, y, s = 1, p = 1, rot = 0, T = 0 }) {
  const cel = [[0, 0, 0], [0, -46, 0], [-4, -90, -10], [-18, -130, -25], [14, -128, 22], [30, -166, 25], [-34, -168, -30]];
  return <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(T * 0.8 + x) * 3}) scale(${s})`}>
    <rect x={-7} y={0} width={14} height={90} rx={6} fill={PX.clado} stroke={KC.ink} strokeWidth={3} />
    {cel.map(([cx, cy, a], i) => kclamp(p * cel.length - i, 0, 1) > 0 ?
      <g key={i} transform={`translate(${cx} ${cy}) rotate(${a}) scale(${kEase.rebote(kclamp(p * cel.length - i, 0, 1))})`}>
        <ellipse cx={0} cy={0} rx={14} ry={22} fill={PX.clado2} stroke={KC.ink} strokeWidth={3.5} />
        <circle cx={0} cy={-22} r={3} fill={KC.ink} /><circle cx={0} cy={22} r={3} fill={KC.ink} />
      </g> : null)}
  </g>;
}
// Espora de Alternaria: en forma de mazo con pico, café, con tabiques transversales y longitudinales.
function EsporaAlter({ x, y, s = 1, rot = 0, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <path d="M -58 -40 Q -66 60 -40 120 Q 0 150 40 120 Q 66 60 58 -40 Q 40 -110 10 -140 L 6 -230 L -6 -230 L -10 -140 Q -40 -110 -58 -40 Z" fill={PX.alter2} stroke={KC.ink} strokeWidth={5} />
    {[-80, -30, 20, 70, 110].map((yy, i) => <path key={i} d={`M ${-56 + Math.abs(yy + 20) * 0.08} ${yy} Q 0 ${yy + 8} ${56 - Math.abs(yy + 20) * 0.08} ${yy}`} stroke={PX.alter} strokeWidth={5} fill="none" />)}
    <path d="M 0 -120 L 0 132" stroke={PX.alter} strokeWidth={4} strokeDasharray="22 26" />
  </g>;
}
// Mapa esquemático de los EE. UU. contiguos. Coordenadas internas 0..900 × 0..500.
const USA = 'M 30 60 L 250 40 L 520 50 Q 560 62 600 92 L 640 74 L 700 100 L 780 58 L 830 52 L 838 92 L 786 142 L 764 202 L 742 258 L 772 330 L 722 382 L 736 470 L 704 482 L 684 402 L 602 392 L 542 412 L 484 472 L 432 422 L 382 382 L 302 372 L 252 334 L 142 312 L 92 232 L 40 152 Z';
function MapaUSA({ x, y, s = 1, id = 'us', regiones = 0, puntos = 0, nPuntos = 120, fondo = '#ffe9a8', children }) {
  const g = krng(11), pts = Array.from({ length: nPuntos }, () => [40 + g() * 800, 50 + g() * 420]);
  const REG = [[150, 150, '#8fd3ff'], [420, 140, '#b8f0a0'], [700, 140, '#ffb3c8'], [230, 360, '#ffcf7a'], [520, 380, '#d6b8ff'], [700, 360, '#7fe0c8']];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><path d={USA} /></clipPath></defs>
    <path d={USA} fill={fondo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g clipPath={`url(#${id})`}>
      {regiones > 0 && REG.map(([cx, cy, c], i) => <circle key={i} cx={cx} cy={cy} r={300 * kEase.sale(kclamp(regiones * 2 - i * 0.18, 0, 1))} fill={c} opacity=".85" />)}
      {regiones > 0 && REG.map(([cx, cy], i) => <g key={'e' + i} opacity={kclamp(regiones * 2 - 1 - i * 0.1, 0, 1)}>
        {Array.from({ length: 4 }, (_, k) => <ellipse key={k} cx={cx - 40 + k * 26} cy={cy + (k % 2) * 18} rx={i % 2 ? 8 : 6} ry={i % 2 ? 16 : 10} fill={KC.ink} opacity=".55" transform={`rotate(${i * 30 + k * 20} ${cx - 40 + k * 26} ${cy})`} />)}
      </g>)}
      {puntos > 0 && pts.map(([a, b], i) => <circle key={'p' + i} cx={a} cy={b} r={7 * kEase.rebote(kclamp(puntos * 1.5 - i / nPuntos, 0, 1))} fill={KC.pink} stroke={KC.ink} strokeWidth={2} />)}
    </g>
    <path d={USA} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {children}
  </g>;
}
// Hisopo de doble punta (algodón en ambos extremos).
function Hisopo({ x, y, rot = 0, s = 1, sucio = 0 }) {
  const c = mixHex(PX.algodon, PX.polvo, sucio);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-8} y={-230} width={16} height={460} rx={8} fill="#f6efe2" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={-236} rx={26} ry={44} fill={c} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={236} rx={26} ry={44} fill={PX.algodon} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Mano({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -40 Q -80 60 -30 110 L 60 110 Q 100 40 80 -30 Q 60 -60 20 -50 Q -30 -70 -70 -40 Z" fill={PX.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -30 Q -110 -60 -100 -100 Q -80 -110 -40 -70" fill={PX.piel} stroke={KC.ink} strokeWidth={7} />
    <rect x={-50} y={110} width={100} height={140} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Casa en corte: pared, ventana abierta, puerta, persona; flechas de esporas que entran.
function CasaCorte({ T, x, y, p = 0, a }) {
  const flujo = (x0, y0, x1, y1, t0, n = 6, c = KC.ink) => Array.from({ length: n }, (_, i) => {
    const u = ((T - a - t0) * 0.45 + i / n) % 1; if (T < a + t0) return null;
    return <ellipse key={i} cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u) + Math.sin(u * 9 + i) * 14} rx={7} ry={11} fill={c} opacity={Math.sin(Math.PI * u)} />;
  });
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 0 300 L 0 900 L 900 900 L 900 300 L 450 40 Z" fill={PX.pared} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={90} y={420} width={220} height={200} fill="#bfefff" stroke={KC.ink} strokeWidth={8} />
    <path d="M 90 420 L 40 460 L 40 600 L 90 620 Z" fill="#9fdfff" stroke={KC.ink} strokeWidth={6} />
    <rect x={600} y={540} width={210} height={360} fill="#2b2420" stroke={KC.ink} strokeWidth={8} />
    <path d="M 600 540 L 560 570 L 560 900 L 600 900 Z" fill="#2a6fdb" stroke={KC.ink} strokeWidth={6} />
    <rect x={590} y={514} width={230} height={26} fill={PX.madera3} stroke={KC.ink} strokeWidth={6} />
    {/* persona que entra */}
    <g transform={`translate(${klerp(980, 700, kprog(T, a + 2.2, a + 3.6, kEase.sale))} 900)`}>
      <circle cx={0} cy={-270} r={48} fill={PX.piel} stroke={KC.ink} strokeWidth={7} />
      <path d="M -55 -215 Q 0 -235 55 -215 L 60 -90 L -60 -90 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
      <rect x={-50} y={-92} width={42} height={92} fill="#3a3a6a" stroke={KC.ink} strokeWidth={6} /><rect x={8} y={-92} width={42} height={92} fill="#3a3a6a" stroke={KC.ink} strokeWidth={6} />
      {T > a + 3.0 && [[-40, -180], [30, -150], [-10, -250], [44, -230], [-30, -120]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={6} ry={10} fill={KC.ink} opacity={kprog(T, a + 3.0 + i * 0.1, a + 3.3 + i * 0.1)} />)}
    </g>
    <g opacity={p}>
      {flujo(-120, 380, 200, 520, 0.4)}
      {flujo(1000, 560, 705, 540, 1.2)}
    </g>
  </g>;
}
function Tubo({ x, y, s = 1, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -260 L -50 120 Q 0 190 50 120 L 50 -260 Z" fill="rgba(220,240,255,.35)" stroke="#e8f0ff" strokeWidth={7} />
    <path d={`M -44 ${120 - 160 * lleno} L -44 120 Q 0 182 44 120 L 44 ${120 - 160 * lleno} Z`} fill={KC.cyan} opacity=".55" />
    <rect x={-62} y={-300} width={124} height={50} rx={10} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Perro({ x, y, s = 1, T = 0 }) {
  const cola = Math.sin(T * 12) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 150 -110 Q 200 ${-170 + cola} 220 ${-190 + cola}`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M 150 -110 Q 200 ${-170 + cola} 220 ${-190 + cola}`} stroke="#d99a5c" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={40} cy={-110} rx={130} ry={64} fill="#d99a5c" stroke={KC.ink} strokeWidth={7} />
    {[-50, 0, 80, 130].map((lx, i) => <rect key={i} x={lx - 14} y={-70} width={28} height={70} rx={10} fill="#d99a5c" stroke={KC.ink} strokeWidth={6} />)}
    <circle cx={-100} cy={-170} r={62} fill="#d99a5c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -130 -220 Q -160 -180 -140 -130 Q -120 -170 -110 -215 Z" fill="#8a5226" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-158} cy={-160} rx={24} ry={18} fill="#d99a5c" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-176} cy={-164} r={9} fill={KC.ink} /><circle cx={-105} cy={-185} r={8} fill={KC.ink} />
  </g>;
}
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={60} fill={PX.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -330 Q 0 -390 55 -330 Q 30 -350 -50 -330 Z" fill="#3a2418" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-20} cy={-300} r={7} fill={KC.ink} /><circle cx={20} cy={-300} r={7} fill={KC.ink} />
    <path d="M -70 -230 Q 0 -255 70 -230 L 80 -60 L -80 -60 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <rect x={-64} y={-62} width={56} height={62} fill="#3a3a6a" stroke={KC.ink} strokeWidth={6} /><rect x={8} y={-62} width={56} height={62} fill="#3a3a6a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Playera({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -150 L -40 -170 Q 0 -140 40 -170 L 90 -150 L 150 -90 L 110 -50 L 85 -80 L 85 130 L -85 130 L -85 -80 L -110 -50 L -150 -90 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-40, 60], [10, 90], [40, 30], [-20, 0], [60, 100]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={8} fill={PX.polvo} />)}
  </g>;
}
function Llave({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle cx={0} cy={0} r={56} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} /><circle cx={0} cy={0} r={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
    <path d="M 50 -14 L 230 -14 L 230 14 L 200 14 L 200 40 L 175 40 L 175 14 L 150 14 L 150 34 L 128 34 L 128 14 L 50 14 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
function Trapo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -130 -60 Q -60 -90 0 -60 Q 70 -30 130 -60 L 120 60 Q 60 90 0 60 Q -60 30 -120 60 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 -20 Q 0 0 110 -20 M -110 20 Q 0 40 110 20" stroke="#ff7aa8" strokeWidth={6} fill="none" />
  </g>;
}
// Silueta de mapa formada por motas de polvo (gancho y cierre). p 0..1 = cuánto se formó; borra 0..1 = cuánto se borró (de izq. a der.).
function MapaMotas({ T, x, y, s = 1, p = 1, borra = 0 }) {
  const g = krng(7), pts = Array.from({ length: 160 }, () => [40 + g() * 800, 50 + g() * 420, g()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="mm"><path d={USA} /></clipPath></defs>
    <path d={USA} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="18 14" opacity={kclamp(p * 2 - 1, 0, 1) * (1 - borra)} />
    <g clipPath="url(#mm)">
      {pts.map(([a, b, r], i) => { const q = kEase.sale(kclamp(p * 1.6 - r * 0.6, 0, 1)); if (q <= 0 || a < borra * 900) return null;
        return <circle key={i} cx={klerp(450, a, q)} cy={klerp(-260, b, q) + Math.sin(T * 2 + i) * 3} r={6 + (i % 3) * 2} fill={i % 4 ? '#6f6a62' : PX.clado2} stroke={KC.ink} strokeWidth={1.5} />; })}
    </g>
  </g>;
}

function PolvoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Marco, En: CUES.Entrada, Es: CUES.Esporas, R: CUES.Regiones, P: CUES.Pregunta, H: CUES.Hisopo, A: CUES.ADN, Af: CUES.Afuera, B: CUES.Bacterias, M: CUES.Mapa, F: CUES.Forense, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const swipe = kprog(T, K.G + 0.1, K.G + 1.3, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el dedo limpia el marco y el polvo forma un mapa */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ViGaMarco x={0} y={740} polvo={1} limpio={swipe * 0.62} />
          {swipe < 1 && <Dedo x={swipe * 670} y={728} />}
          {T > K.G + 1.2 && <Dedo x={670 + kprog(T, K.G + 1.3, K.G + 1.9) * 500} y={728 - kprog(T, K.G + 1.3, K.G + 1.9) * 120} />}
          <MapaMotas T={T} x={225} y={900} s={0.7} p={kprog(T, K.G + 0.9, K.G + 3.2)} />
        </>)}
      </Escena>
      {/* 1 · el marco de arriba de la puerta */}
      <Escena T={T} a={K.Ma} b={K.En} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Puerta x={430} y={1260} s={0.72} polvo={kprog(T, K.Ma + 0.6, K.Ma + 2.6)} />
          <FlechaCurva x1={160} y1={500} x2={260} y2={570} p={kprog(T, K.Ma + 0.3, K.Ma + 0.9)} color={KC.ink} curva={-60} T={T} />
        </>)}
      </Escena>
      {/* 2 · cómo entran las esporas */}
      <Escena T={T} a={K.En} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<CasaCorte T={T} x={90} y={280} p={kprog(T, K.En + 0.3, K.En + 0.8)} a={K.En} />)}
      </Escena>
      {/* 3 · por dentro del polvo: esporas (fondo oscuro, microscópico) */}
      <Escena T={T} a={K.Es} b={K.R} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} />
        {fsvg(<>
          {[[160, 1000, 0.5], [880, 760, 0.42]].map(([fx, fy, sz], i) => <path key={i} d={`M ${fx - 140} ${fy} Q ${fx} ${fy - 60} ${fx + 160} ${fy + 30}`} stroke="#7a8aa8" strokeWidth={10} fill="none" opacity=".5" />)}
          <CadenaClado T={T} x={250} y={1060} s={1} p={kprog(T, K.Es + 0.1, K.Es + 1.0)} />
          <CadenaClado T={T} x={420} y={1140} s={0.8} rot={20} p={kprog(T, K.Es + 0.3, K.Es + 1.2)} />
          <EsporaAlter x={760} y={960} s={1} rot={14} p={kprog(T, K.Es + 0.6, K.Es + 1.2)} />
          <EsporaAlter x={620} y={820} s={0.7} rot={-30} p={kprog(T, K.Es + 0.8, K.Es + 1.4)} />
          <CadenaClado T={T} x={900} y={1180} s={0.7} rot={-25} p={kprog(T, K.Es + 0.5, K.Es + 1.3)} />
          <CadenaClado T={T} x={120} y={900} s={0.6} rot={35} p={kprog(T, K.Es + 0.7, K.Es + 1.5)} />
          {[[120, 760], [600, 1180], [940, 1130], [520, 720]].map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r={18 + i * 4} fill="#6f6a62" opacity=".6" />)}
        </>)}
      </Escena>
      {/* 4 · cada región, sus hongos */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<MapaUSA x={90} y={660} s={1} id="usR" regiones={kprog(T, K.R + 0.3, K.R + 2.6)} />)}
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><ViGaMarco x={0} y={1180} polvo={1} /><Interrogacion T={T} x={300} y={1080} tam={420} /></>)}
      </Escena>
      {/* 6 · el experimento: el hisopo, adentro y afuera; ~1,200 casas */}
      <Escena T={T} a={K.H} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.H + 2.0, K.H + 4.5); const lado = u < 0.5 ? 0 : 1, w = (u % 0.5) * 2;
            return <g opacity={1 - kprog(T, K.H + 4.6, K.H + 5.0)}>
              <rect x={60} y={700} width={440} height={520} rx={20} fill={PX.pared} stroke={KC.ink} strokeWidth={7} />
              <rect x={580} y={700} width={440} height={520} rx={20} fill="#bfefff" stroke={KC.ink} strokeWidth={7} />
              <Puerta x={280} y={1200} s={0.5} polvo={1} color="#e8336d" />
              <Puerta x={800} y={1200} s={0.5} polvo={1} color="#2a6fdb" />
              {T > K.H + 1.9 && <g transform={`translate(${lado ? 800 : 280} 738)`}>
                <Hisopo x={-110 + Math.sin(w * Math.PI * 4) * 90} y={-10} rot={-82} s={0.55} sucio={kclamp(w * 1.4, 0, 1)} />
                <Mano x={30 + Math.sin(w * Math.PI * 4) * 90} y={20} rot={-10} s={0.6} />
              </g>}
            </g>; })()}
          {T > K.H + 4.6 && <MapaUSA x={90} y={760} s={1} id="usH" puntos={kprog(T, K.H + 4.8, K.H + 7.0)} nPuntos={150} />}
        </>)}
      </Escena>
      {/* 7 · se lee el ADN del polvo (oscuro) */}
      <Escena T={T} a={K.A} b={K.Af} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Tubo x={200} y={1000} s={1} lleno={kprog(T, K.A + 0.1, K.A + 0.8)} />
          <Hisopo x={200} y={klerp(560, 800, kprog(T, K.A, K.A + 0.7))} s={0.6} sucio={1} />
          <ADNHebra T={T} x={330} y={980} largo={660} alto={110} vueltas={3} vel={1.4} resalta={(u) => u < kprog(T, K.A + 0.6, K.A + 3.0)} />
        </>)}
      </Escena>
      {/* 8 · los hongos de adentro venían de afuera */}
      <Escena T={T} a={K.Af} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={70} y={720} width={430} height={440} rx={26} fill={PX.pared} stroke={KC.ink} strokeWidth={7} />
          <rect x={580} y={720} width={430} height={440} rx={26} fill="#bfefff" stroke={KC.ink} strokeWidth={7} />
          {[0, 1, 2, 3, 4].map((i) => { const y0 = 800 + i * 74, q = kprog(T, K.Af + 0.6 + i * 0.2, K.Af + 1.0 + i * 0.2);
            return <g key={i}>
              <ellipse cx={330} cy={y0} rx={i % 2 ? 12 : 18} ry={i % 2 ? 20 : 26} fill={i % 2 ? PX.clado2 : PX.alter2} stroke={KC.ink} strokeWidth={3} opacity={q} />
              <ellipse cx={760} cy={y0} rx={i % 2 ? 12 : 18} ry={i % 2 ? 20 : 26} fill={i % 2 ? PX.clado2 : PX.alter2} stroke={KC.ink} strokeWidth={3} />
              <line x1={350} y1={y0} x2={740} y2={y0} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={q} />
            </g>; })}
          <FlechaCurva x1={900} y1={1230} x2={200} y2={1230} p={kprog(T, K.Af + 0.3, K.Af + 1.2)} color={KC.ink} curva={-70} T={T} />
        </>)}
      </Escena>
      {/* 9 · las bacterias: quién vive ahí */}
      <Escena T={T} a={K.B} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Persona x={250} y={1150} s={1} />
          <Perro x={720} y={1150} s={1.1} T={T} />
          {Array.from({ length: 8 }, (_, i) => { const q = kprog(T, K.B + 0.5 + i * 0.12, K.B + 1.5 + i * 0.12, kEase.sale); const fromDog = i % 2;
            const x0 = fromDog ? 640 : 250, y0 = fromDog ? 990 : 910;
            return q > 0 ? <Bacteria key={i} T={T} x={x0 + (i - 4) * 40 * q} y={y0 - 260 * q - (i % 3) * 30} largo={70} ancho={34} rot={i * 37} color={fromDog ? '#7fd88a' : '#ffb3c8'} seed={i + 2} opacidad={q} /> : null; })}
        </>)}
      </Escena>
      {/* 10 · solo con hongos: el círculo de 230 km */}
      <Escena T={T} a={K.M} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaUSA x={90} y={650} s={1} id="usM">
          {(() => { const q = kprog(T, K.M + 1.6, K.M + 2.6, kEase.sale); const r = 18 * q; // ~100 km, esquemático (círculo agrandado para que se vea)
            return <g>
              <circle cx={560} cy={230} r={r * 3} fill={KC.pink} opacity={0.18 * q} />
              <circle cx={560} cy={230} r={Math.max(r, 0.01)} fill="rgba(255,45,120,.35)" stroke={KC.pink} strokeWidth={6} />
              <circle cx={560} cy={230} r={10} fill={KC.ink} opacity={kprog(T, K.M + 1.0, K.M + 1.3)} />
            </g>; })()}
        </MapaUSA>)}
      </Escena>
      {/* 11 · ciencia forense (propuesta) */}
      <Escena T={T} a={K.F} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Playera x={330} y={1040} s={1.3} />
          <Llave x={700} y={1080} s={1} rot={-20} />
          <g transform={`translate(${klerp(980, 400, kprog(T, K.F + 0.2, K.F + 1.4, kEase.sale))} 990)`}>
            <circle r={110} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={12} />
            <line x1={78} y1={78} x2={170} y2={170} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo marco del inicio; el trapo borra el mapa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {(() => { const lim = kprog(T, K.C + 0.8, K.C + 3.8, kEase.suave); return <>
            <ViGaMarco x={0} y={740} polvo={1} limpio={lim} />
            <MapaMotas T={T} x={225} y={900} s={0.7} p={1} borra={lim} />
            {lim > 0 && lim < 1 && <Trapo x={lim * 1080} y={720} rot={Math.sin(T * 14) * 6} />}
          </>; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.4} until={K.Ma - 0.3} texto="un mapa · escrito en hongos" x={300} y={620} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.G + 3.0} until={K.Ma - 0.3} x={60} y={1400} texto="estudio hecho en EE. UU." tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ma + 0.4} until={K.En - 0.3} x={60} y={440} texto="marco de arriba de la puerta" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ma + 1.6} until={K.En - 0.3} texto="rara vez se limpia" x={820} y={760} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.En + 0.6} until={K.Es - 0.3} x={70} y={930} texto="ventanas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.En + 1.4} until={K.Es - 0.3} x={560} y={750} texto="puertas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.En + 3.1} until={K.Es - 0.3} x={600} y={680} texto="en las personas" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.05} until={K.R - 0.3} texto="POR DENTRO · EL POLVO" x={540} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Es + 0.5} until={K.R - 0.3} x={70} y={640} texto="Cladosporium · esporas en cadena" it tam={30} color={KC.mint} />
      <Etq T={T} at={K.Es + 0.9} until={K.R - 0.3} x={380} y={1120} texto="Alternaria · espora en mazo" it tam={30} color={KC.yellow} />
      <Chip T={T} at={K.Es + 1.3} until={K.R - 0.3} texto="aguantan la sequedad" x={540} y={560} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.R + 1.2} until={K.P - 0.3} x={60} y={450} texto="muchos hongos solo viven" tam={36} color={KC.ink} />
      <Etq T={T} at={K.R + 1.4} until={K.P - 0.3} x={60} y={505} texto="en ciertas regiones" tam={36} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.H + 0.75} until={K.H + 1.9} anio="2012–13" quien="Wild Life of Our Homes" revista="ciencia ciudadana · ~1,200 casas de EE. UU." x={540} y={760} />
      <Etq T={T} at={K.H + 2.0} until={K.H + 4.5} x={90} y={600} texto="adentro: puerta de la sala" tam={28} color={KC.ink} />
      <Etq T={T} at={K.H + 3.3} until={K.H + 4.5} x={520} y={640} texto="afuera: puerta a la calle" tam={28} color={KC.ink} />
      <Chip T={T} at={K.H + 2.1} until={K.H + 4.5} texto="hisopo de doble punta" x={540} y={520} tam={32} borde={KC.ink} />
      <NumeroGigante T={T} at={K.H + 4.8} until={K.A - 0.3} valor={1200} desde={0} dur={1.6} prefijo="~" etiqueta="casas de EE. UU." x={540} y={530} tam={150} color={KC.ink} />
      <Etq T={T} at={K.A + 0.6} until={K.Af - 0.3} x={330} y={850} texto="leyendo ADN…" tam={30} color={KC.lilac} />
      <NumeroGigante T={T} at={K.A + 0.8} until={K.Af - 0.3} valor={72284} desde={0} dur={2.0} etiqueta="tipos de hongos, en total" x={340} y={560} tam={130} color={KC.mint} />
      <TarjetaEstudio T={T} at={K.A + 1.8} until={K.Af - 0.3} anio="2015" quien="U. de Colorado + NC State" revista="Proc. R. Soc. B, 2015" x={600} y={1560} />
      <Etq T={T} at={K.Af + 0.2} until={K.B - 0.3} x={150} y={670} texto="adentro" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Af + 0.2} until={K.B - 0.3} x={700} y={660} texto="afuera" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Af + 1.5} until={K.B - 0.3} texto="65 % de los tipos de adentro, también afuera" x={540} y={600} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.B + 0.4} until={K.M - 0.3} texto="las bacterias: quién vive ahí" x={400} y={460} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.B + 2.4} until={K.M - 0.3} valor={92} dur={0.8} sufijo=" %" etiqueta="acierto: ¿hay perro?" x={340} y={640} tam={160} color={KC.pink} />
      <Chip T={T} at={K.B + 4.0} until={K.M - 0.3} texto="gato: 83 %" x={820} y={830} tam={30} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.M + 0.2} until={K.M + 1.8} anio="2020" quien="redes neuronales · ~1,300 muestras" revista="J. R. Stat. Soc. C, 2020 · solo hongos" x={380} y={600} />
      <NumeroGigante T={T} at={K.M + 2.0} until={K.F - 0.3} valor={100} dur={1.0} prefijo="< " sufijo=" km" etiqueta="error mediano: más de la mitad, a menos" x={360} y={560} tam={150} color={KC.pink} />
      <Etq T={T} at={K.M + 3.4} until={K.F - 0.3} x={60} y={1520} texto="en 2015, con otro método: 230 km" tam={24} color={KC.ink} />
      <Chip T={T} at={K.F + 0.3} until={K.C - 0.3} texto="¿de dónde viene este polvo?" x={380} y={640} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.F + 1.0} until={K.C - 0.3} texto="propuesta: ciencia forense" x={380} y={740} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="un mapa de tu región, en hongos" x={360} y={560} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.C + 2.6} until={K.Ou} x={60} y={1500} texto="Probado en EE. UU. por regiones; en México, solo a nivel país." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ma} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Ma} until={K.En} texto="10 cm" largo={60} />
      <BarraEscala T={T} at={K.En} until={K.Es} texto="1 m" largo={180} />
      <BarraEscala T={T} at={K.Es} until={K.R} texto="10 µm" largo={80} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="1,000 km (esquemático)" largo={180} />
      <BarraEscala T={T} at={K.P} until={K.H} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.H} until={K.H + 4.7} texto="50 cm" largo={110} />
      <BarraEscala T={T} at={K.H + 4.7} until={K.A} texto="1,000 km (esquemático)" largo={180} />
      <BarraEscala T={T} at={K.A} until={K.Af} texto="2 nm (ancho del ADN)" largo={60} />
      <BarraEscala T={T} at={K.Af} until={K.B} texto="10 µm (esporas)" largo={80} />
      <BarraEscala T={T} at={K.B} until={K.M} texto="50 cm" largo={160} />
      <BarraEscala T={T} at={K.M} until={K.F} texto="100 km (esquemático)" largo={18} />
      <BarraEscala T={T} at={K.F} until={K.C} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No es solo polvo: *es un mapa.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.En - 0.1} texto="El marco de arriba: *rara vez se limpia.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Es - 0.1} texto="Esporas que *entran desde afuera.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.R - 0.1} texto="Diminutas y *resistentes.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="Cada región, *sus hongos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Tu polvo *podría delatarte?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.A - 0.1} texto="~1,200 casas: *un hisopo en el marco.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.Af - 0.1} texto="Más de *70 mil* tipos de hongos." />
      <Subtitulo T={T} idx={8} at={K.Af + 0.1} until={K.B - 0.1} texto="Los de adentro venían *de afuera.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.M - 0.1} texto="Las bacterias: *¿hay perro?*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.F - 0.1} texto="Solo con hongos: *menos de 100 km.*" />
      <Subtitulo T={T} idx={11} at={K.F + 0.1} until={K.C - 0.1} texto="Propuesta: *ciencia forense.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Borras *un mapa de tu región.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ma + 0.4, K.En - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 0.5, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.H + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.A + 0.4, K.Af - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.B + 0.6, K.M - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.M + 0.8, K.C - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="134" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PolvoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PolvoShot /></CompositionStage></div>;
}
window.PolvoApp = PolvoApp;
