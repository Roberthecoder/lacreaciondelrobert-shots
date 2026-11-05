// Shot Fungi Mati #97 · Ese puntito es un granjero: el escarabajo que siembra un hongo en el aguacate — NARRADO.
// Formato N1 "Por dentro" + tramo N5 (el experimento de 2008). Gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md.
// Morfología: hembra de Xyleborus glabratus ≈ 2 mm (USDA-ARS), cilíndrica, café oscuro rojizo, ~3 veces más larga que ancha;
// micangios pareados en la base de las mandíbulas (Fraedrich et al. 2008). Larvas sin patas, blancas. Marchitez: hojas que se
// secan rojizo-café y se quedan colgadas; rayas negro-azuladas en la albura (Crane et al. 2020). El dibujo es esquemático.
// Ojo (verificación): en las huertas de Florida el hongo lo llevan OTROS escarabajos; nunca se dibuja una huerta llena de X. glabratus.

const EC = { cuerpo:'#5a2416', cuerpo2:'#3e170e', brillo:'#9a4a2e', corteza:'#7a5636', corteza2:'#5b3d24', madera:'#e3c193', madera2:'#c9a06c',
  tunel:'#2b1a10', hongo:'#f6f1df', hongo2:'#d9d2b6', espora:'#F4C25A', hoja:'#2f9e44', hoja2:'#46c25a', seca:'#a4492a', seca2:'#7a3a22',
  aguacate:'#2d5a1e', aguacate2:'#4f7f2a', agua:'#4fb6ff', tilosis:'#f0d9a0', mancha:'#1f2a3a', maceta:'#d9774a', guaca:'#8cc63f' };

// ---------- piezas ----------
// Escarabajo de perfil (mira a la derecha). Largo 300 px a s = 1 (≈ 2 mm en la lupa). Cuerpo cilíndrico, pronoto redondo que tapa la cabeza,
// élitros con estrías punteadas y declive al final, antena acodada con maza, mandíbula, 3 patas visibles.
function Escarabajo({ T = 0, x, y, s = 1, rot = 0, color = EC.cuerpo, color2 = EC.cuerpo2, camina = 0, esporas = 0, espejo = false }) {
  const pata = (k) => Math.sin(T * 14 + k * 2.1) * 8 * camina;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s} ${s})`}>
    {[78, 18, -58].map((px, k) => <path key={k} d={`M ${px} 40 L ${px + 14 + pata(k)} 72 L ${px + 36 + pata(k)} 78`} stroke={color2} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
    <path d="M 150 22 L 172 6" stroke={color2} strokeWidth={6} strokeLinecap="round" />
    <ellipse cx={180} cy={2} rx={10} ry={8} fill={color2} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={142} cy={30} rx={24} ry={20} fill={color2} stroke={KC.ink} strokeWidth={5} />
    <path d="M 158 38 L 176 44 L 160 50 Z" fill={KC.ink} />
    {esporas > 0 && <g opacity={esporas}><ellipse cx={150} cy={44} rx={13} ry={8} fill={EC.espora} stroke={KC.ink} strokeWidth={2.5} style={{ filter:`drop-shadow(0 0 6px ${KC.gold})` }} /></g>}
    <path d="M -8 -48 L -118 -48 Q -150 -46 -156 -16 Q -158 14 -140 38 Q -128 50 -108 50 L -8 50 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -8 -48 Q 108 -56 140 -20 Q 154 10 134 40 Q 120 52 100 50 L -8 50 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -8 -46 L -8 48" stroke={KC.ink} strokeWidth={4} opacity=".6" />
    {[-28, -10, 8, 26].map((ry, r) => Array.from({ length: 7 }, (_, i) => <circle key={r + '-' + i} cx={-136 + i * 17 + (r % 2) * 6} cy={ry} r={3.2} fill={color2} />))}
    {Array.from({ length: 9 }, (_, i) => <circle key={'p' + i} cx={20 + (i % 3) * 30 + Math.floor(i / 3) * 6} cy={-24 + Math.floor(i / 3) * 20} r={2.6} fill={color2} opacity=".7" />)}
    <path d="M 0 -38 Q 90 -44 122 -16" stroke="rgba(255,255,255,.28)" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -110 -36 L -20 -36" stroke="rgba(255,255,255,.22)" strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Larva sin patas (en forma de C), blanca con cabeza café. (x, y) = centro.
function Larva({ T = 0, x, y, s = 1, fase = 0 }) {
  const m = Math.sin(T * 5 + fase) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -34 ${-10 + m * 0.3} Q -36 30 0 30 Q 34 30 34 ${-6 - m * 0.3}`} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d={`M -34 ${-10 + m * 0.3} Q -36 30 0 30 Q 34 30 34 ${-6 - m * 0.3}`} stroke="#fbf6e8" strokeWidth={22} fill="none" strokeLinecap="round" />
    {[-22, -6, 10, 24].map((q, i) => <line key={i} x1={q} y1={i === 0 || i === 3 ? 10 : 20} x2={q + 4} y2={i === 0 || i === 3 ? 28 : 38} stroke="#d8cfb6" strokeWidth={3} />)}
    <circle cx={35} cy={-14 - m * 0.3} r={10} fill="#a0662a" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Jardín de hongo: borra blanca sobre una línea de pared (puntos x1,y → x2,y). g = 0..1 crece.
function JardinHongo({ x1, x2, y, g = 1, seed = 1, arriba = true, dens = 1 }) {
  if (g <= 0) return null;
  const r = krng(seed), n = Math.round((x2 - x1) / 9 * dens);
  return <g>{Array.from({ length: n }, (_, i) => { const px = x1 + (i + r()) * (x2 - x1) / n, rr = (6 + r() * 10) * g, dy = (arriba ? -1 : 1) * rr * 0.4;
    return <g key={i}><circle cx={px} cy={y + dy} r={rr} fill={i % 3 ? EC.hongo : EC.hongo2} opacity=".95" />
      {r() > 0.6 && g > 0.6 && <ellipse cx={px + 3} cy={y + dy * 2.4} rx={3} ry={5} fill={EC.espora} />}</g>; })}</g>;
}
// Hoja elíptica (aguacate / laurel). seca 0..1 = verde → rojizo-café; cae 0..1 = se dobla hacia abajo (se queda colgada).
function Hoja({ x, y, ang = 0, L = 90, W = 32, seca = 0, cae = 0 }) {
  const c = mixHex(EC.hoja, EC.seca, seca), c2 = mixHex(EC.hoja2, EC.seca2, seca);
  return <g transform={`translate(${x} ${y}) rotate(${ang + cae * (ang > 90 || ang < -90 ? -70 : 70)})`}>
    <path d={`M 0 0 Q ${L * 0.45} ${-W} ${L} 0 Q ${L * 0.45} ${W} 0 0 Z`} fill={c} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d={`M 4 0 L ${L - 8} 0`} stroke={c2} strokeWidth={3} />
  </g>;
}
// Árbol de aguacate. marchita 0..1. frutos = aguacates colgando.
function Aguacatero({ T = 0, x, y, s = 1, marchita = 0, frutos = true, seed = 4 }) {
  const r = krng(seed);
  const hojas = Array.from({ length: 46 }, (_, i) => { const a = r() * Math.PI * 2, d = Math.sqrt(r()); return { x: Math.cos(a) * 230 * d, y: -430 + Math.sin(a) * 160 * d, ang: r() * 360 - 180, u: r() }; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 0 L -22 -300 Q -60 -360 -120 -390 M 22 -300 Q 70 -350 130 -380 M -22 -300 L 22 -300 L 30 0 Z" fill={EC.corteza} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -22 -300 Q -60 -360 -120 -390 M 22 -300 Q 70 -350 130 -380" stroke={EC.corteza} strokeWidth={18} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={-430} rx={250} ry={175} fill={mixHex('#2a8a3c', '#8a4a2a', marchita * 0.8)} stroke={KC.ink} strokeWidth={8} />
    {hojas.map((h, i) => { const sec = kclamp((marchita - h.u * 0.5) * 2, 0, 1); return <Hoja key={i} x={h.x} y={h.y} ang={h.ang + mece(T, i, 0.2) * 4} L={64} W={22} seca={sec} cae={sec * 0.7} />; })}
    {frutos && [[-90, -300], [70, -290], [150, -360]].map(([fx, fy], i) => <g key={'f' + i} transform={`translate(${fx} ${fy + marchita * 10}) rotate(${mece(T, i + 9, 0.3) * 4})`}>
      <line x1={0} y1={-26} x2={0} y2={-46} stroke={KC.ink} strokeWidth={4} />
      <path d="M 0 -30 Q 22 -30 24 6 Q 26 40 0 42 Q -26 40 -24 6 Q -22 -30 0 -30 Z" fill={mixHex(EC.aguacate, '#4a3a22', marchita * 0.5)} stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}
// Plántula de laurel rojo en maceta. marchita 0..1 (hojas rojizo-café que cuelgan). gota 0..1 = gota del hongo que entra al agujerito del tallo.
function Plantula({ x, y, s = 1, marchita = 0, gota = 0 }) {
  const lean = marchita * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 0 L -28 -46 L 28 -46 L 34 0 Z" fill={EC.maceta} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-36} y={-54} width={72} height={12} rx={4} fill="#c4643a" stroke={KC.ink} strokeWidth={4} />
    <g transform={`rotate(${lean} 0 -54)`}>
      <path d="M 0 -54 Q 4 -110 0 -160" stroke="#6b4a2b" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={2} cy={-80} r={3.5} fill={KC.ink} />
      {[[-140, -150], [-120, -30], [-104, -160], [-84, -20], [-64, -150]].map(([hy, a], i) => <Hoja key={i} x={0} y={hy + 10} ang={a} L={44} W={13} seca={marchita} cae={marchita * 0.9} />)}
    </g>
    {gota > 0 && gota < 1 && <ellipse cx={14 - gota * 12} cy={-120 + gota * 40} rx={5} ry={7} fill={EC.espora} stroke={KC.ink} strokeWidth={2} />}
  </g>;
}
// Tronco grande de aguacate en primer plano (corteza con grietas) con el agujerito y el "palito" de aserrín (frass) que sale.
function TroncoCerca({ T, hx = 440, hy = 1000, palito = 1 }) {
  return <g>
    <path d="M 110 -20 Q 150 960 120 1940 L 650 1940 Q 610 960 640 -20 Z" fill={EC.corteza} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${170 + i * 54} -20 Q ${190 + i * 54 + (i % 2 ? 20 : -20)} 700 ${165 + i * 54} 1940`} stroke={EC.corteza2} strokeWidth={i % 3 ? 6 : 10} fill="none" opacity=".75" />)}
    {[[250, 520], [520, 760], [300, 1300], [560, 1500]].map(([lx, ly], i) => <ellipse key={'l' + i} cx={lx} cy={ly} rx={26} ry={9} fill={EC.corteza2} opacity=".8" />)}
    <path d="M 640 980 Q 780 940 900 1010" stroke={EC.corteza} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M 640 980 Q 780 940 900 1010" stroke={KC.ink} strokeWidth={42} fill="none" strokeLinecap="round" opacity=".0" />
    {[[700, 950, -60], [760, 940, -120], [820, 960, -40], [880, 990, -150], [900, 1010, 20], [840, 1000, 60], [760, 975, 110]].map(([lx, ly, a], i) => <Hoja key={'h' + i} x={lx} y={ly} ang={a + mece(T, i, 0.25) * 6} L={110} W={36} />)}
    <g transform={`translate(830 ${1090 + mece(T, 3, 0.3) * 6})`}>
      <line x1={0} y1={-70} x2={0} y2={-100} stroke={KC.ink} strokeWidth={5} />
      <path d="M 0 -76 Q 46 -76 50 6 Q 54 82 0 84 Q -54 82 -50 6 Q -46 -76 0 -76 Z" fill={EC.aguacate} stroke={KC.ink} strokeWidth={6} />
      <path d="M -24 -30 Q -34 10 -22 40" stroke="rgba(255,255,255,.25)" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
    <circle cx={hx} cy={hy} r={13} fill={EC.tunel} stroke={KC.ink} strokeWidth={4} />
    {palito > 0 && <path d={`M ${hx + 4} ${hy + 2} Q ${hx + 30 * palito} ${hy + 8 * palito} ${hx + 50 * palito} ${hy + 30 * palito}`} stroke="#e6cf9f" strokeWidth={13} fill="none" strokeLinecap="round" />}
  </g>;
}
// Interior de la lupa: túnel en la madera con la hembra; jardín de hongo y larvas opcionales. Caja 2r × 2r (r = 230).
function TunelLupa({ T, jardin = 0, larvas = 0, camina = 0 }) {
  return <svg width={460} height={460} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={460} height={460} fill={EC.madera} />
    {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M -10 ${20 + i * 46} Q 230 ${i * 46 + (i % 2 ? 40 : 0)} 470 ${20 + i * 46}`} stroke={EC.madera2} strokeWidth={5} fill="none" />)}
    <rect x={-10} y={176} width={480} height={124} rx={60} fill={EC.tunel} stroke="#6a4a2a" strokeWidth={6} />
    <JardinHongo x1={10} x2={450} y={182} g={jardin} seed={4} arriba={false} />
    <JardinHongo x1={10} x2={450} y={294} g={jardin} seed={9} arriba={true} />
    {larvas > 0 && <g opacity={larvas}><Larva T={T} x={70} y={232} s={0.8} /><Larva T={T} x={390} y={236} s={0.75} fase={2} /></g>}
    <Escarabajo T={T} x={230} y={238} s={1} camina={camina} />
  </svg>;
}
// Cabeza de la hembra de frente (al microscopio): pronoto, ojos, antenas con maza, mandíbulas y los 2 micangios llenos de esporas.
function CabezaFrente({ T, x, y, s = 1, llenos = 1, sale = 0 }) {
  const r = krng(11);
  const esp = Array.from({ length: 16 }, () => ({ dx: (r() - 0.5) * 60, dy: (r() - 0.5) * 34, a: r() * 180 }));
  const bolsa = (bx, k) => <g key={k}>
    <ellipse cx={bx} cy={150} rx={52} ry={34} fill="rgba(244,194,90,.18)" stroke={KC.gold2} strokeWidth={5} strokeDasharray="10 6" style={{ filter:`drop-shadow(0 0 ${10 * llenos}px ${KC.gold})` }} />
    {esp.map((e, i) => i / esp.length < llenos ? <ellipse key={i} cx={bx + e.dx} cy={150 + e.dy} rx={5} ry={9} transform={`rotate(${e.a} ${bx + e.dx} ${150 + e.dy})`} fill={EC.espora} stroke={KC.ink} strokeWidth={1.5} /> : null)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -40 Q -240 -260 0 -270 Q 240 -260 230 -40 Q 200 60 0 70 Q -200 60 -230 -40 Z" fill={EC.cuerpo} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-170 + (i % 8) * 48 + (Math.floor(i / 8) % 2) * 22} cy={-210 + Math.floor(i / 8) * 60} r={5} fill={EC.cuerpo2} />)}
    <path d="M -150 -200 Q 0 -250 150 -200" stroke="rgba(255,255,255,.22)" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M -170 40 Q -190 160 -80 220 L 80 220 Q 190 160 170 40 Z" fill={EC.cuerpo2} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-150} cy={90} rx={24} ry={34} fill={KC.ink} /><ellipse cx={150} cy={90} rx={24} ry={34} fill={KC.ink} />
    {[-1, 1].map((k) => <g key={'a' + k}><path d={`M ${k * 160} 120 L ${k * 260} 90 L ${k * 300} 160`} stroke={EC.cuerpo2} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={k * 310} cy={182} rx={26} ry={34} fill={EC.cuerpo2} stroke={KC.ink} strokeWidth={5} /></g>)}
    {bolsa(-80, 0)}{bolsa(80, 1)}
    {[-1, 1].map((k) => <path key={'m' + k} d={`M ${k * 70} 200 Q ${k * 60} 270 ${k * 8} 290 Q ${k * 40} 250 ${k * 20} 205 Z`} fill="#2a0f08" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {sale > 0 && Array.from({ length: 8 }, (_, i) => { const u = kclamp(sale * 1.4 - i * 0.06, 0, 1); return u > 0 && u < 1 ? <ellipse key={'s' + i} cx={(i % 2 ? 40 : -40) + (i - 4) * 14 * u} cy={270 + u * 200} rx={5} ry={9} fill={EC.espora} opacity={1 - u * 0.6} /> : null; })}
  </g>;
}
// Mapa esquemático del sureste de EUA (no a escala). Devuelve también la proyección.
const SE_PTS = [[-95.5, 37], [-75.6, 37], [-75.6, 35.3], [-76.6, 34.6], [-78, 33.8], [-79.2, 33.1], [-80.8, 32.1], [-81.4, 30.7], [-81.2, 29.6], [-80.5, 28.2], [-80.1, 26.8], [-80.4, 25.3], [-81.1, 25.2], [-81.8, 26.2], [-82.7, 27.5], [-82.6, 28.8], [-83.6, 29.9], [-84.4, 30], [-85.4, 29.7], [-86.5, 30.4], [-88, 30.4], [-89.6, 30.2], [-89.4, 29.2], [-90.5, 29.1], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.4], [-95.5, 29.0]];
const seP = (lon, lat) => [60 + (lon + 95.5) * 31, 600 + (37 - lat) * 34];
function dentro(px, py, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j];
  if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) c = !c; } return c; }
const SE_XY = SE_PTS.map(([a, b]) => seP(a, b));
const SE_DOTS = (() => { const r = krng(97), out = []; while (out.length < 110) { const lon = -95.5 + r() * 20, lat = 25 + r() * 12; const [px, py] = seP(lon, lat);
  if (dentro(px, py, SE_XY) && r() < 0.35 + (lon + 95.5) / 30) out.push([px, py, out.length]); } return out; })();
function MapaSureste({ T, at, puntos = 1 }) {
  const n = Math.floor(SE_DOTS.length * puntos);
  return <g>
    <path d={'M ' + SE_XY.map((q) => q.join(' ')).join(' L ') + ' Z'} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {SE_DOTS.slice(0, n).map(([px, py, i]) => <circle key={i} cx={px} cy={py} r={9 * kprog(T, at + i * 0.018, at + i * 0.018 + 0.25, kEase.rebote)} fill={EC.seca} stroke={KC.ink} strokeWidth={2.5} />)}
  </g>;
}
// Caja de texto a la izquierda, de una o varias líneas (cada línea puede llevar <i>…</i>).
function Nota({ T, at, until, x = 50, y = 420, lineas, tam = 32, borde = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.95)', border:`4px solid ${borde}`,
    borderRadius:16, padding:'8px 20px', font:`700 ${tam}px/1.3 ${KF.mono}`, color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>
    {lineas.map((l, i) => <div key={i}>{l}</div>)}
  </div>;
}

function EscarabajoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, B: CUES.Bolsitas, Tu: CUES.Tuneles, D: CUES.Defensa, Ma: CUES.Marchita, P: CUES.Pregunta, E: CUES.Estudio,
    Mi: CUES.Millones, A: CUES.Aguacate, S: CUES.Salto, Mx: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const push = kprog(T, K.G, K.G + 1.4, kEase.sale);
  const palito = 0.4 + 0.6 * kprog(T, K.G + 0.1, K.G + 0.9, kEase.sale);
  // túnel por dentro
  const cava = kprog(T, K.Tu + 0.1, K.Tu + 1.6, kEase.suave);
  const jardin = kprog(T, K.Tu + 1.2, K.Tu + 2.4, kEase.sale);
  const crias = kprog(T, K.Tu + 2.2, K.Tu + 2.8);
  // xilema
  const tapa = (i) => kprog(T, K.D + 0.5 + i * 0.3, K.D + 1.1 + i * 0.3, kEase.sale);
  const hongoSube = kprog(T, K.D + 0.1, K.D + 2.4, kEase.suave);
  const marchita = kprog(T, K.Ma + 0.1, K.Ma + 2.0, kEase.suave);
  // estudio
  const SEM = kprog(T, K.E + 3.2, K.E + 5.6);
  const marchitaP = kprog(T, K.E + 3.6, K.E + 5.8, kEase.suave);
  // aguacate
  const huerta = kprog(T, K.A + 2.0, K.A + 2.6);
  const salto = kprog(T, K.S + 0.4, K.S + 1.8, kEase.suave);
  const barre = ((T - K.Mx - 4.0) / 1.6) % 1;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el puntito en el tronco del aguacate; la lupa muestra al escarabajo de 2 mm */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.06} origen="40% 52%">
        <FondoLunares color={KC.mint} />
        {fsvg(<g transform={`translate(${440 - 440 * (1 + 0.08 * push)} ${1000 - 1000 * (1 + 0.08 * push)}) scale(${1 + 0.08 * push})`}>
          <TroncoCerca T={T} palito={palito} />
        </g>)}
      </Escena>
      {/* 2 · de Asia a un puerto de Georgia, en madera de embalaje (esquemático) */}
      <Escena T={T} a={K.N} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const u = kprog(T, K.N + 0.6, K.N + 3.2, kEase.suave); const bx = klerp(190, 820, u), by = 1010 - Math.sin(u * Math.PI) * 140;
          return <g>
            <path d="M 0 1080 Q 540 1040 1080 1080 L 1080 1920 L 0 1920 Z" fill="#2a8fd6" stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${i * 140 + ((T * 40) % 140)} 1130 q 30 -16 60 0`} stroke="rgba(255,255,255,.6)" strokeWidth={5} fill="none" strokeLinecap="round" />)}
            <path d="M -20 1090 L -20 820 Q 120 790 230 860 L 250 1090 Z" fill="#ffd5a8" stroke={KC.ink} strokeWidth={7} />
            <text x={110} y={960} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>Asia</text>
            <path d="M 840 1090 L 870 860 Q 980 820 1100 840 L 1100 1090 Z" fill="#bfe3b4" stroke={KC.ink} strokeWidth={7} />
            <text x={975} y={940} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Georgia</text>
            <text x={975} y={984} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>(EUA)</text>
            <path d={`M 190 1010 Q 505 830 820 1010`} stroke={KC.ink} strokeWidth={5} fill="none" strokeDasharray="16 12" opacity=".55" />
            <g transform={`translate(${bx} ${by}) rotate(${Math.sin(T * 3) * 3})`}>
              <path d="M -110 0 L 110 0 L 80 50 L -80 50 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
              {[-70, -10, 50].map((cx) => <g key={cx}><rect x={cx - 26} y={-40} width={52} height={40} fill={EC.madera2} stroke={KC.ink} strokeWidth={4} />
                <line x1={cx - 26} y1={-20} x2={cx + 26} y2={-20} stroke="#8a6a3c" strokeWidth={4} /></g>)}
            </g>
            {u >= 1 && <g opacity={kprog(T, K.N + 3.2, K.N + 3.5)}><circle cx={890} cy={1040} r={16 + 6 * Math.max(0, Math.sin(T * 7))} fill="none" stroke={KC.red} strokeWidth={6} /><circle cx={890} cy={1040} r={7} fill={KC.red} /></g>}
          </g>; })())}
      </Escena>
      {/* 3 · al microscopio: los micangios (2 bolsitas junto a la boca) llenos de esporas */}
      <Escena T={T} a={K.B} b={K.Tu} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<CabezaFrente T={T} x={500} y={740} s={1.15} llenos={kprog(T, K.B + 0.6, K.B + 2.4)} />)}
      </Escena>
      {/* 4 · por dentro de la madera: cava el túnel, siembra el hongo, larvas que lo comen */}
      <Escena T={T} a={K.Tu} b={K.D} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        {fsvg(<>
          {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M -20 ${760 + i * 40} Q 540 ${740 + i * 40 + (i % 2 ? 30 : -10)} 1100 ${760 + i * 40}`} stroke="#3a281a" strokeWidth={6} fill="none" />)}
          <rect x={0} y={740} width={80} height={560} fill={EC.corteza} stroke={KC.ink} strokeWidth={6} />
          <rect x={40} y={940} width={klerp(40, 900, cava)} height={110} rx={55} fill={EC.tunel} stroke="#6a4a2a" strokeWidth={6} />
          {cava > 0.6 && <rect x={560} y={klerp(990, 820, kprog(T, K.Tu + 1.0, K.Tu + 1.8))} width={100} height={klerp(0, 200, kprog(T, K.Tu + 1.0, K.Tu + 1.8))} rx={50} fill={EC.tunel} stroke="#6a4a2a" strokeWidth={6} />}
          <JardinHongo x1={60} x2={60 + 880 * cava} y={946} g={jardin} seed={21} arriba={false} />
          <JardinHongo x1={60} x2={60 + 880 * cava} y={1044} g={jardin} seed={22} arriba={true} />
          {crias > 0 && <g opacity={crias}>
            <Larva T={T} x={250} y={995} s={0.9} /><Larva T={T} x={420} y={1000} s={0.8} fase={1.5} />
            {[[610, 870], [600, 905], [625, 940]].map(([ex, ey], i) => <ellipse key={i} cx={ex} cy={ey} rx={12} ry={17} fill="#fffaf0" stroke={KC.ink} strokeWidth={3} />)}
          </g>}
          <Escarabajo T={T} x={klerp(120, 820, cava)} y={995} s={0.62} camina={cava < 1 ? 1 : 0.2} />
        </>)}
      </Escena>
      {/* 5 · el árbol se defiende: tapa sus propios tubos de agua (tilosis y gomas) */}
      <Escena T={T} a={K.D} b={K.Ma} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {[0, 1, 2, 3, 4, 5].map((i) => { const tx = 150 + i * 150, k = tapa(i);
            return <g key={i}>
              <rect x={tx - 42} y={620} width={84} height={560} rx={20} fill="#16304a" stroke="#7fa6c9" strokeWidth={5} />
              <rect x={tx - 30} y={630} width={60} height={540} rx={14} fill={EC.agua} opacity={0.85 * (1 - k * 0.85)} />
              {k < 0.95 && Array.from({ length: 6 }, (_, j) => <rect key={j} x={tx - 8} y={1150 - (((T * 200 + j * 95) % 530))} width={16} height={34} rx={8} fill="#c9ecff" opacity={0.8 * (1 - k)} />)}
              {[0.25, 0.5, 0.75].map((q, j) => <circle key={'t' + j} cx={tx + (j - 1) * 10} cy={620 + 560 * q} r={34 * k} fill={EC.tilosis} stroke={KC.ink} strokeWidth={3} opacity={k > 0 ? 1 : 0} />)}
              <path d={`M ${tx - 6} 1170 Q ${tx + 18} ${1170 - 180 * hongoSube} ${tx - 10} ${1170 - 380 * hongoSube}`} stroke={EC.mancha} strokeWidth={6} fill="none" opacity=".9" />
            </g>; })}
        </>)}
      </Escena>
      {/* 6 · sin agua se marchita: hojas rojizo-café que se quedan colgadas; manchas oscuras en la albura */}
      <Escena T={T} a={K.Ma} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <path d="M 0 1220 Q 540 1180 1080 1220 L 1080 1920 L 0 1920 Z" fill="#8bc34a" stroke={KC.ink} strokeWidth={7} />
          <Aguacatero T={T} x={420} y={1230} s={1.15} marchita={marchita} />
          <g transform="translate(850 1070)" opacity={kprog(T, K.Ma + 0.8, K.Ma + 1.2)}>
            <circle r={110} fill={EC.madera} stroke={KC.ink} strokeWidth={7} />
            <circle r={110} fill="none" stroke={EC.corteza} strokeWidth={18} />
            <circle r={40} fill={EC.madera2} />
            {Array.from({ length: 9 }, (_, i) => { const a = i * 0.7 + 0.3; return <path key={i} d={`M ${Math.cos(a) * 95} ${Math.sin(a) * 95} L ${Math.cos(a + 0.08) * 55} ${Math.sin(a + 0.08) * 55}`} stroke={EC.mancha} strokeWidth={12} strokeLinecap="round" opacity={kprog(T, K.Ma + 1.0, K.Ma + 1.8)} />; })}
          </g>
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿quién lo mata, el escarabajo o el hongo? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Escarabajo T={T} x={250} y={720} s={0.95} rot={mece(T, 2, 0.5) * 4} />
          <text x={270} y={920} textAnchor="middle" style={{ font:`900 64px ${KF.titulo}` }} fill={KC.ink}>VS</text>
          <g transform="translate(270 1020)"><ellipse rx={170} ry={70} fill="#fff4d6" stroke={KC.ink} strokeWidth={7} />
            <JardinHongo x1={-150} x2={150} y={-20} g={1} seed={5} arriba={true} /><JardinHongo x1={-120} x2={120} y={20} g={1} seed={6} arriba={true} /></g>
          <Interrogacion T={T} x={600} y={560} tam={360} />
        </>)}
      </Escena>
      {/* 8 · el experimento de 2008: solo el hongo en plántulas de laurel rojo → 19 de 20 se marchitaron o murieron en 8 semanas */}
      <Escena T={T} a={K.E} b={K.Mi} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={30} y={1010} width={1020} height={18} rx={8} fill="#8a6a44" stroke={KC.ink} strokeWidth={4} />
          <rect x={30} y={1190} width={1020} height={18} rx={8} fill="#8a6a44" stroke={KC.ink} strokeWidth={4} />
          {Array.from({ length: 20 }, (_, i) => { const fila = Math.floor(i / 10), col = i % 10; const px = 85 + col * 101, py = fila ? 1190 : 1010;
            const g0 = K.E + 2.6 + i * 0.03; const vivo = i === 13;
            return <Plantula key={i} x={px} y={py} s={0.9} gota={kprog(T, g0, g0 + 0.35)} marchita={vivo ? 0 : kclamp(marchitaP * 1.25 - (i % 7) * 0.04, 0, 1)} />; })}
        </>)}
      </Escena>
      {/* 9 · más de 300 millones de laureles rojos (estimación publicada en 2017) */}
      <Escena T={T} a={K.Mi} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g opacity={kprog(T, K.Mi + 2.2, K.Mi + 2.6)}><MapaSureste T={T} at={K.Mi + 2.3} /></g>)}
      </Escena>
      {/* 10 · el aguacate es pariente (Lauraceae); en 2012 la enfermedad llegó a una huerta de Homestead, Florida */}
      <Escena T={T} a={K.A} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={1 - huerta}>
            <text x={380} y={660} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>familia Lauraceae</text>
            <path d="M 380 690 L 380 740 M 200 740 L 560 740 M 200 740 L 200 800 M 560 740 L 560 800" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            {[[200, 'laurel rojo', 0, 'Persea borbonia'], [560, 'aguacate', 1, 'Persea americana']].map(([cx, nom, k, sci]) => <g key={k} opacity={kprog(T, K.A + 0.3 + k * 0.5, K.A + 0.7 + k * 0.5)}>
              <rect x={cx - 160} y={800} width={320} height={330} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <Hoja x={cx - 110} y={900} ang={-15} L={150} W={40} />
              {k === 0 ? <circle cx={cx + 70} cy={980} r={22} fill="#1f2a5a" stroke={KC.ink} strokeWidth={4} />
                : <path d={`M ${cx + 70} 925 Q ${cx + 105} 925 ${cx + 108} 985 Q ${cx + 110} 1040 ${cx + 70} 1042 Q ${cx + 30} 1040 ${cx + 32} 985 Q ${cx + 35} 925 ${cx + 70} 925 Z`} fill={EC.aguacate} stroke={KC.ink} strokeWidth={5} />}
              <text x={cx} y={1072} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{nom}</text>
              <text x={cx} y={1110} textAnchor="middle" style={{ font:`italic 700 26px ${KF.mono}` }} fill={KC.ink}>{sci}</text>
            </g>)}
          </g>
          {huerta > 0 && <g opacity={huerta}>
            <path d="M 0 1200 Q 540 1170 1080 1200 L 1080 1920 L 0 1920 Z" fill="#8bc34a" stroke={KC.ink} strokeWidth={7} />
            <Aguacatero T={T} x={170} y={1200} s={0.62} seed={5} />
            <Aguacatero T={T} x={470} y={1210} s={0.62} seed={6} marchita={kprog(T, K.A + 2.8, K.A + 4.6, kEase.suave)} />
            <Aguacatero T={T} x={780} y={1200} s={0.62} seed={7} />
            <g transform="translate(540 700)"><rect x={-6} y={-10} width={12} height={0} fill="#8a6a44" stroke={KC.ink} strokeWidth={3} />
              <rect x={-175} y={-90} width={350} height={90} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <text x={0} y={-50} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>Homestead, Florida</text>
              <text x={0} y={-16} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>2012</text></g>
          </g>}
        </>)}
      </Escena>
      {/* 11 · el hongo saltó a otros escarabajos (X. volvulus, X. bispinatus): esquemático, madera genérica */}
      <Escena T={T} a={K.S} b={K.Mx} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        <Ambiente T={T} n={14} color="rgba(244,194,90,.35)" />
        {fsvg(<>
          {[[690, 330], [910, 280]].map(([ty, w], i) => <rect key={i} x={i ? 380 : 40} y={ty + 70} width={i ? 660 : 420} height={110} rx={55} fill={EC.tunel} stroke="#6a4a2a" strokeWidth={6} />)}
          <Escarabajo T={T} x={220} y={815} s={0.6} esporas={1 - salto * 0.3} />
          {Array.from({ length: 10 }, (_, i) => { const u = kclamp(salto * 1.3 - i * 0.03, 0, 1); const dest = i % 2 ? [640, 1033] : [900, 1033];
            const sx = klerp(320, dest[0], u), sy = klerp(840, dest[1], u) - Math.sin(u * Math.PI) * 220;
            return u > 0 && u < 1 ? <ellipse key={i} cx={sx} cy={sy} rx={7} ry={11} fill={EC.espora} stroke={KC.ink} strokeWidth={2} style={{ filter:`drop-shadow(0 0 6px ${KC.gold})` }} /> : null; })}
          <Escarabajo T={T} x={560} y={1035} s={0.5} color="#8a4a22" color2="#5e2e12" esporas={kprog(T, K.S + 1.4, K.S + 1.9)} />
          <Escarabajo T={T} x={820} y={1035} s={0.55} color="#3a2a1e" color2="#22170f" esporas={kprog(T, K.S + 1.5, K.S + 2.0)} />
        </>)}
      </Escena>
      {/* 12 · México: mayor productor de aguacate; sin registro de la plaga (Senasica, ficha 2019); vigilancia en 30 entidades (2024) */}
      <Escena T={T} a={K.Mx} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MapaMexico x={40} y={560} ancho={900} conCA={false} color="#bfe3b4" />
          {T > K.Mx + 4.0 && <g opacity={kprog(T, K.Mx + 4.0, K.Mx + 4.4)}>
            <defs><clipPath id="mxClip"><rect x={40} y={540} width={900} height={460} /></clipPath></defs>
            <g clipPath="url(#mxClip)"><rect x={40 + barre * 900 - 60} y={540} width={60} height={460} fill="rgba(35,70,255,.28)" />
              <line x1={40 + barre * 900} y1={540} x2={40 + barre * 900} y2={1000} stroke={KC.blue} strokeWidth={6} /></g>
          </g>}
          <g transform={`translate(930 ${1070 + mece(T, 5, 0.3) * 6})`}>
            <path d="M 0 -76 Q 46 -76 50 6 Q 54 82 0 84 Q -54 82 -50 6 Q -46 -76 0 -76 Z" fill={EC.aguacate} stroke={KC.ink} strokeWidth={6} />
            <path d="M -24 -30 Q -34 10 -22 40" stroke="rgba(255,255,255,.25)" strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo tronco, el mismo puntito; ahora la lupa enseña el jardín de hongo y las larvas; y tu guacamole */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="40% 52%">
        <FondoLunares color={KC.mint} />
        {fsvg(<g transform={`translate(${440 - 440 * 1.08} ${1000 - 1000 * 1.08}) scale(1.08)`}><TroncoCerca T={T} palito={1} /></g>)}
        {fsvg(<g transform="translate(800 1560)" opacity={kprog(T, K.C + 1.2, K.C + 1.7)}>
          <ellipse cx={0} cy={0} rx={190} ry={50} fill={EC.guaca} stroke={KC.ink} strokeWidth={6} />
          {[[-80, -6], [-20, 10], [50, -10], [110, 6]].map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r={10} fill={i % 2 ? '#e8463a' : '#f6f1df'} stroke={KC.ink} strokeWidth={2} />)}
          <path d="M -200 0 Q -190 110 0 116 Q 190 110 200 0" fill="#d9774a" stroke={KC.ink} strokeWidth={7} />
        </g>, 22)}
      </Escena>

      {/* lupas (gancho y cierre): el túnel por dentro */}
      <Lupa T={T} at={K.G + 1.9} until={K.N - 0.35} x={360} y={640} r={230} fx={440} fy={1000} tinte={KC.gold2} etiqueta="POR DENTRO · el túnel"
        interior={(TT) => <TunelLupa T={TT} jardin={kprog(TT, K.G + 4.1, K.G + 5.4, kEase.sale)} camina={0.5} />} />
      <Lupa T={T} at={K.C + 0.4} until={K.Ou - 0.2} x={360} y={640} r={230} fx={440} fy={1000} tinte={KC.gold2} etiqueta="POR DENTRO · el jardín"
        interior={(TT) => <TunelLupa T={TT} jardin={1} larvas={1} camina={0.3} />} />

      {/* textos en pantalla */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.G + 3.0} texto="basura" x={330} y={330} tam={52} />
      <Etq T={T} at={K.G + 2.6} until={K.N - 0.4} x={600} y={1210} lado="izq" texto="escarabajo · 2 mm" tam={32} color={KC.ink} />
      <Caja T={T} at={K.G + 4.2} until={K.N - 0.4} x={50} y={1000} texto="siembra un hongo" tam={30} />
      <Caja T={T} at={K.N + 0.2} until={K.B - 0.3} x={50} y={420} texto="Xyleborus glabratus" it tam={36} />
      <Caja T={T} at={K.N + 0.7} until={K.B - 0.3} x={50} y={500} texto="escarabajo ambrosial" tam={30} />
      <Caja T={T} at={K.N + 1.4} until={K.B - 0.3} x={50} y={580} texto="madera de embalaje" tam={30} />
      <Chip T={T} at={K.N + 3.3} until={K.B - 0.3} texto="Georgia, EUA · 2002" x={640} y={790} tam={34} borde={KC.ink} />
      <Caja T={T} at={K.B + 0.2} until={K.Tu - 0.3} x={50} y={420} texto="AL MICROSCOPIO · esquemático" tam={28} />
      <Etq T={T} at={K.B + 1.2} until={K.Tu - 0.3} x={60} y={600} texto="la hembra, de frente" tam={30} />
      <Etq T={T} at={K.B + 1.6} until={K.Tu - 0.3} x={60} y={1080} texto="micangios (2 bolsitas)" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.B + 2.4} until={K.Tu - 0.3} x={60} y={1135} texto={<>esporas de <i>Raffaelea lauricola</i></>} tam={28} color={KC.gold2} />
      <Caja T={T} at={K.Tu + 0.2} until={K.D - 0.3} x={50} y={420} texto="POR DENTRO · esquemático" tam={28} />
      <Etq T={T} at={K.Tu + 1.5} until={K.D - 0.3} x={60} y={1110} texto="jardín de hongo" tam={32} color={EC.hongo} />
      <Etq T={T} at={K.Tu + 2.3} until={K.D - 0.3} x={60} y={870} texto="larvas que comen el hongo" tam={30} />
      <Caja T={T} at={K.Tu + 2.6} until={K.D - 0.3} x={50} y={500} texto="no come madera: come el hongo" tam={28} />
      <Caja T={T} at={K.D + 0.2} until={K.Ma - 0.3} x={50} y={420} texto="xilema · tubos de agua" tam={30} />
      <Etq T={T} at={K.D + 1.0} until={K.Ma - 0.3} x={60} y={500} texto="tapones del árbol (tilosis)" tam={30} color={EC.tilosis} />
      <Etq T={T} at={K.D + 1.6} until={K.Ma - 0.3} x={60} y={570} texto="el hongo avanza" tam={28} color="#a9c4e0" />
      <Etq T={T} at={K.Ma + 0.9} until={K.P - 0.2} x={300} y={460} texto="hojas secas que no caen" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ma + 1.2} until={K.P - 0.2} x={1040} y={920} lado="izq" texto="manchas oscuras" tam={28} color={KC.ink} />
      <Etq T={T} at={K.P + 0.5} until={K.E - 0.2} x={60} y={830} texto="¿el escarabajo?" tam={30} color={KC.ink} />
      <Etq T={T} at={K.P + 0.9} until={K.E - 0.2} x={60} y={1125} texto="¿el hongo?" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2008" quien="Servicio Forestal de EUA" revista="e Iowa State · Fraedrich y col. · Plant Disease" x={540} y={620} />
      <Nota T={T} at={K.E + 2.8} until={K.E + 4.9} x={50} y={420} lineas={['solo el hongo', 'sin escarabajo']} tam={32} />
      {T > K.E + 3.2 && T < K.Mi - 0.1 && <div style={{ position:'absolute', left:50, top:560, zIndex:42, font:`400 72px ${KF.titulo}`, color:KC.texto, textShadow:KSOMBRA, opacity:kprog(T, K.E + 3.2, K.E + 3.5) }}>
        semana {Math.round(SEM * 8)}</div>}
      <Nota T={T} at={K.E + 5.0} until={K.Mi - 0.2} x={50} y={420} lineas={['19 de 20 plántulas', 'se marchitaron o murieron']} tam={30} borde={KC.red} />
      <Etq T={T} at={K.E + 2.9} until={K.Mi - 0.2} x={60} y={1250} texto={<>plántulas de laurel rojo · <i>Persea borbonia</i></>} tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Mi + 0.2} until={K.Mi + 2.3} valor={300} dur={1.0} sufijo=" millones" etiqueta="más de" x={540} y={620} tam={140} color={KC.yellow} />
      <Chip T={T} at={K.Mi + 0.6} until={K.Mi + 2.3} texto="de laureles rojos" x={540} y={800} tam={40} borde={KC.ink} />
      <Nota T={T} at={K.Mi + 2.4} until={K.A - 0.2} x={50} y={1025} lineas={[<>+300 millones de <i>Persea borbonia</i></>, 'desde inicios de los 2000 · ≈ 1/3 de los que había', 'estimación publicada en 2017 · Hughes y col.']} tam={24} />
      <Etq T={T} at={K.Mi + 2.6} until={K.A - 0.2} x={60} y={570} texto="sureste de EUA · esquemático" tam={26} color={KC.ink} />
      <Etq T={T} at={K.A + 3.0} until={K.S - 0.2} x={60} y={800} texto="la enfermedad llega" tam={30} color={KC.ink} />
      <Caja T={T} at={K.S + 0.2} until={K.Mx - 0.2} x={50} y={420} texto="nuevos portadores del hongo" tam={28} />
      <Etq T={T} at={K.S + 0.3} until={K.Mx - 0.2} x={60} y={680} texto={<><i>X. glabratus</i></>} tam={28} color={KC.gold2} />
      <Etq T={T} at={K.S + 1.6} until={K.Mx - 0.2} x={600} y={1140} lado="izq" texto={<><i>X. volvulus</i></>} tam={28} color={KC.texto} />
      <Etq T={T} at={K.S + 1.7} until={K.Mx - 0.2} x={1040} y={1140} lado="izq" texto={<><i>X. bispinatus</i></>} tam={28} color={KC.texto} />
      <Nota T={T} at={K.Mx + 0.3} until={K.C - 0.2} x={50} y={400} lineas={['1.er productor mundial', 'de aguacate · Agricultura, 2026']} tam={28} />
      {kvisible(T, K.Mx + 2.4, K.C - 0.2) && (() => { const e = kentrada(T, K.Mx + 2.4, K.C - 0.2, 'pop'); return <div style={{ position:'absolute', left:330, top:780, zIndex:43, opacity:e.o,
        transform:`translate(-50%,-50%) scale(${klerp(1.8, 1, kprog(T, K.Mx + 2.4, K.Mx + 2.75, kEase.rebote))}) rotate(-8deg)`, border:`8px solid ${KC.red}`, borderRadius:20, padding:'6px 24px', textAlign:'center', background:'rgba(255,255,255,.85)' }}>
        <div style={{ font:`400 62px/1.05 ${KF.titulo}`, color:KC.red }}>PLAGA AUSENTE</div>
        <div style={{ font:`700 24px ${KF.mono}`, color:KC.red }}>sin registros · Senasica (ficha 2019)</div></div>; })()}
      <Nota T={T} at={K.Mx + 4.2} until={K.C - 0.2} x={50} y={1020} lineas={['vigilancia en 30 entidades', '(Senasica, 2024)']} tam={28} borde={KC.blue} />
      <Caja T={T} at={K.C + 1.0} until={K.Ou} x={50} y={1000} texto="un granjero diminuto" tam={30} />
      <Etq T={T} at={K.C + 1.8} until={K.Ou} x={1040} y={1450} lado="izq" texto="tu guacamole" tam={30} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G + 2.2} until={K.N} texto="2 mm · escarabajo en la lupa" largo={300} />
      <BarraEscala T={T} at={K.N} until={K.B} texto="mapa esquemático" largo={160} />
      <BarraEscala T={T} at={K.B} until={K.Tu} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Tu} until={K.Ma} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Ma} until={K.Mi} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Mi} until={K.Mx} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Mx} until={K.C} texto="mapa esquemático" largo={160} />
      <BarraEscala T={T} at={K.C + 0.8} until={K.Ou} texto="2 mm · escarabajo en la lupa" largo={300} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es basura: *es un escarabajo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.B - 0.1} texto="Llegó de Asia *en madera.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.Tu - 0.1} texto="Esporas en *bolsitas junto a la boca.*" />
      <Subtitulo T={T} idx={3} at={K.Tu + 0.1} until={K.D - 0.1} texto="Siembra el hongo *y se lo comen.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.Ma - 0.1} texto="El árbol *tapa sus tubos de agua.*" />
      <Subtitulo T={T} idx={5} at={K.Ma + 0.1} until={K.P - 0.1} texto="Sin agua, *se marchita.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Quién lo mata: *escarabajo u hongo?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Mi - 0.1} texto="Solo el hongo: *casi todos murieron.*" />
      <Subtitulo T={T} idx={8} at={K.Mi + 0.1} until={K.A - 0.1} texto="Más de *300 millones de laureles rojos.*" />
      <Subtitulo T={T} idx={9} at={K.A + 0.1} until={K.S - 0.1} texto="2012: *una huerta de Florida.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.Mx - 0.1} texto="El hongo *saltó a otros escarabajos.*" />
      <Subtitulo T={T} idx={11} at={K.Mx + 0.1} until={K.C - 0.1} texto="México: *sin registro* de esta plaga." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un granjero que *amenaza tu guacamole.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.4, K.B + 1.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Tu + 0.3, K.D + 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P - 0.1, K.E + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.4, K.Mi - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Mi + 2.4, K.A - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.A + 0.5, K.S - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.S + 0.3, K.Mx - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Mx + 2.6, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="97" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Etiqueta en cajita clara a la izquierda (una línea).
function Caja({ T, at, until, x, y, texto, it = false, tam = 34 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.94)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}

function EscarabajoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EscarabajoShot /></CompositionStage></div>;
}
window.EscarabajoApp = EscarabajoApp;
