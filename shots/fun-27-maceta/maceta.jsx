// Shot Fungi Mati #27 · Ese hongo amarillo no está matando a tu planta: Leucocoprinus birnbaumii — NARRADO (N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.
// Viaje: la maceta de tu casa → la tierra por dentro (micelio, esporas, pigmento) → la misma maceta, ya entendida.

const MC = { barro:'#d0693a', barro2:'#a94f26', borde:'#e07c4b', tierra:'#5b3a22', tierra2:'#3e2716', hoja:'#3fbf4a', hoja2:'#2a9a3a',
  limon:'#ffe11a', limon2:'#f2c400', palido:'#fbf3c4', seca:'#9a6a35', piel:'#f2c29b', hifa:'#fff4d6' };

// Leucocoprinus birnbaumii de perfil (morfología real, esquemática): pie delgado que se angosta hacia arriba con base engrosada,
// anillo arriba del pie, sombrero amarillo limón con granitos finos y centro más oscuro, borde estriado, laminillas libres amarillas.
// crece 0..1 = sale de la tierra · abre 0..1 = huevito → campana → casi plano · palido 0..1 = el amarillo se aclara al abrir.
function Leuco({ x, y, s = 1, crece = 1, abre = 1, palido = 0, rot = 0, alto = 300 }) {
  if (crece <= 0) return null;
  const h = Math.max(6, alto * kEase.sale(kclamp(crece * 1.25, 0, 1)));
  const a = klerp(58, 190, abre), hc = klerp(92, 42, abre), m = klerp(30, 4, abre);
  const cap = mixHex(MC.limon, MC.palido, palido), capOsc = mixHex('#c9a000', '#d8c98a', palido), lam = mixHex('#fff27a', '#fbf6d8', palido);
  const pie = mixHex('#fff3a0', '#fbf6d8', palido);
  const k = kclamp(crece * 2, 0, 1);
  const L = [-a / 2, -h + m], R = [a / 2, -h + m], top = -h - hc;
  const capD = `M ${L[0]} ${L[1]} C ${-a / 2} ${-h - hc * 0.78} ${-a * 0.24} ${top} 0 ${top} C ${a * 0.24} ${top} ${a / 2} ${-h - hc * 0.78} ${R[0]} ${R[1]} Q 0 ${L[1] - 10 + 14 * abre} ${L[0]} ${L[1]} Z`;
  const g = krng(7);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k})`}>
    {/* pie con base engrosada */}
    <path d={`M -7 ${-h} L -11 -34 Q -24 -18 -16 0 L 16 0 Q 24 -18 11 -34 L 7 ${-h} Z`} fill={pie} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {/* anillo (membrana) arriba del pie */}
    {abre > 0.3 && h > 80 && <path d={`M -9 ${-h + 46} Q -26 ${-h + 58} -20 ${-h + 64} Q 0 ${-h + 56} 20 ${-h + 64} Q 26 ${-h + 58} 9 ${-h + 46} Z`} fill={pie} stroke={KC.ink} strokeWidth={4} opacity={kprog(abre, 0.3, 0.5)} />}
    {/* laminillas libres (se ven al abrir) */}
    {abre > 0.25 && <path d={`M ${L[0] + 6} ${L[1]} Q 0 ${L[1] + 4 + 12 * abre} ${R[0] - 6} ${R[1]} Q 0 ${L[1] - 8} ${L[0] + 6} ${L[1]} Z`} fill={lam} stroke={KC.ink} strokeWidth={3} />}
    {abre > 0.25 && Array.from({ length: 9 }, (_, i) => { const u = (i + 1) / 10 - 0.5; return <line key={i} x1={u * a * 0.9} y1={L[1] + 2} x2={u * a * 0.15} y2={L[1] - 4} stroke={capOsc} strokeWidth={2} opacity=".7" />; })}
    {/* sombrero */}
    <path d={capD} fill={cap} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* borde estriado */}
    {Array.from({ length: 9 }, (_, i) => { const u = (i - 4) / 4.6; return <line key={i} x1={u * a / 2 * 0.95} y1={L[1] - 4} x2={u * a / 2 * 0.78} y2={L[1] - hc * 0.42} stroke={capOsc} strokeWidth={2.5} strokeLinecap="round" opacity=".75" />; })}
    {/* granitos finos y centro más oscuro */}
    {Array.from({ length: 16 }, (_, i) => { const u = g() - 0.5, v = g(); return <circle key={i} cx={u * a * 0.6} cy={top + 8 + v * hc * 0.5} r={2.2} fill={capOsc} opacity=".85" />; })}
    <ellipse cx={0} cy={top + 7} rx={a * 0.13} ry={7} fill={capOsc} />
  </g>;
}

// Hoja de corazón (planta de interior tipo potos).
function HojaCorazon({ x, y, s = 1, rot = 0, color = MC.hoja }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 C -40 -20 -70 -70 -40 -100 C -22 -118 -4 -106 0 -92 C 4 -106 22 -118 40 -100 C 70 -70 40 -20 0 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 -6 L 0 -84" stroke={MC.hoja2} strokeWidth={4} />
  </g>;
}
// Maceta de barro con planta. (x, y) = centro de la superficie de la tierra. corte = 0..1 muestra la tierra por dentro.
function Maceta({ T, x, y, s = 1, planta = 1, secas = true, corte = 0, children, dentro }) {
  const HOJAS = [[-40, -330, -18, 1.1], [110, -400, 16, 1.0], [70, -250, 34, 0.9], [-130, -230, -38, 0.85], [175, -230, 46, 0.8], [10, -440, 4, 0.8]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {planta > 0 && HOJAS.map(([hx, hy, r, k], i) => { const sw = mece(T, i + 2, 0.35) * 4; return <g key={i}>
      <path d={`M ${20 + i * 6} 0 Q ${hx * 0.4} ${hy * 0.5} ${hx + sw} ${hy}`} stroke={MC.hoja2} strokeWidth={8} fill="none" strokeLinecap="round" />
      <HojaCorazon x={hx + sw} y={hy} rot={r + sw} s={k * planta} />
    </g>; })}
    {/* cuerpo */}
    <path d="M -222 40 L 222 40 L 168 300 Q 0 318 -168 300 Z" fill={MC.barro} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <clipPath id="macetaCorte"><path d="M -206 54 L 206 54 L 158 288 Q 0 304 -158 288 Z" /></clipPath>
    {corte > 0 && <g opacity={corte} clipPath="url(#macetaCorte)">
      <path d="M -206 54 L 206 54 L 158 288 Q 0 304 -158 288 Z" fill={MC.tierra2} stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 40); return <circle key={i} cx={(g() - 0.5) * 300} cy={70 + g() * 210} r={4 + g() * 7} fill={i % 3 ? '#6e4a2c' : '#4a2f1b'} />; })}
      {dentro}
    </g>}
    <path d="M -150 120 L -130 270" stroke="rgba(255,255,255,.25)" strokeWidth={14} strokeLinecap="round" opacity={1 - corte} />
    {/* borde */}
    <rect x={-240} y={-8} width={480} height={56} rx={14} fill={MC.borde} stroke={KC.ink} strokeWidth={8} />
    {/* tierra */}
    <ellipse cx={0} cy={0} rx={218} ry={30} fill={MC.tierra} stroke={KC.ink} strokeWidth={5} />
    {secas && [[-150, 2, -20], [120, 6, 30], [30, 12, 70]].map(([dx, dy, r], i) => <path key={i} d="M -26 0 Q -8 -16 22 -4 Q 6 10 -26 0 Z" transform={`translate(${dx} ${dy}) rotate(${r})`} fill={MC.seca} stroke={KC.ink} strokeWidth={3} />)}
    {children}
  </g>;
}
// Espora de L. birnbaumii: elipse lisa, blanca (8–12 × 5–7 µm, Kuo 2016). px = largo en pantalla.
function Espora({ x, y, px = 60, rot = 0, o = 1, brillo = false }) {
  return <ellipse cx={x} cy={y} rx={px / 2} ry={px * 0.3} transform={`rotate(${rot} ${x} ${y})`} fill="#fdfcf6" stroke={KC.ink} strokeWidth={3} opacity={o}
    style={brillo ? { filter:'drop-shadow(0 0 10px #fff)' } : null} />;
}
// Molécula esquemática de birnbaumina: anillo de indol (hexágono + pentágono) con N–OH, cadena y grupo final.
function Birnbaumina({ x, y, s = 1, T = 0, brilla = 1 }) {
  const hex = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [Math.cos(a) * 46, Math.sin(a) * 46]; });
  const pent = [[40, -23], [92, -36], [118, 6], [92, 46], [40, 23]];
  const P = (pts) => 'M ' + pts.map((p) => p.join(' ')).join(' L ') + ' Z';
  const cadena = [[118, 6], [166, -20], [214, 6], [262, -20], [310, 6], [358, -20], [406, 6]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter:`drop-shadow(0 0 ${14 * brilla}px ${KC.yellow})` }}>
    <path d={P(hex)} fill="none" stroke={KC.yellow} strokeWidth={9} strokeLinejoin="round" />
    <path d={P(pent)} fill="none" stroke={KC.yellow} strokeWidth={9} strokeLinejoin="round" />
    <path d={'M ' + cadena.map((p) => p.join(' ')).join(' L ')} fill="none" stroke={KC.yellow} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={92} cy={46} r={15} fill="#5aa0ff" stroke={KC.ink} strokeWidth={3} /><circle cx={92} cy={84} r={13} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    <line x1={92} y1={60} x2={92} y2={72} stroke={KC.yellow} strokeWidth={7} />
    {[[166, -20, KC.red], [214, 6, '#5aa0ff'], [406, 6, '#5aa0ff'], [440, -16, KC.red]].map(([cx, cy, c], i) => <circle key={i} cx={cx} cy={cy - (i === 0 ? 34 : 0)} r={13} fill={c} stroke={KC.ink} strokeWidth={3} />)}
    <line x1={166} y1={-20} x2={166} y2={-42} stroke={KC.yellow} strokeWidth={7} />
    <line x1={406} y1={6} x2={432} y2={-12} stroke={KC.yellow} strokeWidth={7} />
  </g>;
}
// Niño y perrito (íconos).
function Nino({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={40} fill={MC.piel} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -168 Q 0 -210 40 -168 Q 20 -186 0 -184 Q -22 -186 -40 -168 Z" fill="#5a3a22" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-13} cy={-152} r={5} fill={KC.ink} /><circle cx={13} cy={-152} r={5} fill={KC.ink} />
    <path d="M -50 -40 Q -54 -104 0 -106 Q 54 -104 50 -40 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <path d="M 40 -90 Q 90 -70 104 -40" stroke={MC.piel} strokeWidth={18} fill="none" strokeLinecap="round" />
    <rect x={-36} y={-42} width={28} height={42} rx={8} fill="#2346ff" stroke={KC.ink} strokeWidth={5} /><rect x={8} y={-42} width={28} height={42} rx={8} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Perrito({ T, x, y, s = 1 }) {
  const cola = Math.sin(T * 14) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 70 -60 Q 100 ${-90 + cola * 0.3} ${110 + cola} -110`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={`M 70 -60 Q 100 ${-90 + cola * 0.3} ${110 + cola} -110`} stroke="#d99a55" strokeWidth={9} fill="none" strokeLinecap="round" />
    <ellipse cx={20} cy={-56} rx={70} ry={36} fill="#d99a55" stroke={KC.ink} strokeWidth={6} />
    {[-30, -6, 40, 62].map((dx, i) => <rect key={i} x={dx - 8} y={-30} width={16} height={30} rx={6} fill="#d99a55" stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={-56} cy={-92} r={34} fill="#d99a55" stroke={KC.ink} strokeWidth={6} />
    <path d="M -76 -118 Q -98 -100 -84 -70" fill="#8a5a2b" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-66} cy={-96} r={5} fill={KC.ink} /><ellipse cx={-90} cy={-84} rx={8} ry={6} fill={KC.ink} />
  </g>;
}
// Mano sin guante (tocar el hongo no es peligroso; lo que no se hace es comerlo).
function Mano({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-10} width={68} height={170} rx={20} fill="#ffffff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -6 Q -46 -60 -30 -80 L 30 -80 Q 46 -60 40 -6 Z" fill={MC.piel} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-22, -6, 10, 26].map((dx, i) => <rect key={i} x={dx - 7} y={-112 + Math.abs(i - 1.5) * 6} width={14} height={40} rx={7} fill={MC.piel} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -40 -40 Q -66 -60 -60 -84" stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M -40 -40 Q -66 -60 -60 -84" stroke={MC.piel} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Termómetro y frasco de fungicida.
function Termometro({ x, y, nivel = 0.3 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-300} width={52} height={300} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-286 + 270 * (1 - nivel)} width={24} height={270 * nivel + 10} rx={12} fill={KC.red} />
    <circle cx={0} cy={10} r={42} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Frasco({ x, y, s = 1, texto = 'fungicida' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-220} width={140} height={220} rx={24} fill="#c7f0ff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-34} y={-270} width={68} height={54} rx={10} fill={KC.violet} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-160} width={120} height={70} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-114} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Matraz con extracto amarillo.
function Matraz({ T, x, y, s = 1, lleno = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -36 -240 L -36 -140 L -120 0 Q -126 22 -100 24 L 100 24 Q 126 22 120 0 L 36 -140 L 36 -240 Z" fill="rgba(220,245,255,.6)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-120 + 60 * (1 - lleno)} ${-90 * lleno + 0} L ${120 - 60 * (1 - lleno)} ${-90 * lleno} L 120 0 Q 126 22 100 24 L -100 24 Q -126 22 -120 0 Z`} fill={KC.yellow} opacity=".9" />
    {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.8 + i / 4) % 1); return <circle key={i} cx={-50 + i * 34} cy={-10 - u * 80 * lleno} r={7} fill="#fff8b0" opacity={1 - u} />; })}
    <rect x={-48} y={-262} width={96} height={26} rx={8} fill="#cfd6dd" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Flecha circular (reciclaje).
function FlechaCirculo({ x, y, r = 60, rot = 0, color = KC.mint }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M ${r} 0 A ${r} ${r} 0 1 1 ${r * Math.cos(-0.6)} ${r * Math.sin(-0.6)}`} fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <path d={`M ${r} 0 A ${r} ${r} 0 1 1 ${r * Math.cos(-0.6)} ${r * Math.sin(-0.6)}`} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" />
    <path d={`M ${r * Math.cos(-0.6) - 20} ${r * Math.sin(-0.6) - 22} L ${r * Math.cos(-0.6) + 20} ${r * Math.sin(-0.6) - 4} L ${r * Math.cos(-0.6) - 6} ${r * Math.sin(-0.6) + 22} Z`} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Luna y sol (una noche).
function LunaSol({ T, x, y, u }) {
  return <g transform={`translate(${x} ${y})`}>
    <g opacity={1 - u}><circle r={60} fill="#fff2b0" stroke={KC.ink} strokeWidth={6} /><circle cx={26} cy={-14} r={52} fill={KC.violet} /></g>
    <g opacity={u} transform={`rotate(${T * 30})`}>
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-72} x2={0} y2={-96} stroke={KC.orange} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}
      <circle r={58} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}
// Red de micelio en corte de tierra oscura, con restos muertos que se deshacen y raíces vivas intactas.
function TierraPorDentro({ T, g, deshace = 0, primordios = 0, x = 540, y = 900, ancho = 1080, alto = 900, seed = 11 }) {
  const r = krng(seed);
  const restos = Array.from({ length: 7 }, (_, i) => [x - ancho * 0.38 + r() * ancho * 0.76, y - alto * 0.35 + r() * alto * 0.7, r() * 180]);
  return <g>
    {Array.from({ length: 60 }, (_, i) => { const q = krng(i + 100); return <circle key={i} cx={x - ancho / 2 + q() * ancho} cy={y - alto / 2 + q() * alto} r={6 + q() * 16} fill={i % 3 ? '#3b2615' : '#4d321c'} />; })}
    {/* raíces vivas de la planta */}
    {[[x - 240, -10], [x + 60, 8], [x + 300, -6]].map(([rx, c], i) => <path key={i} d={`M ${rx} ${y - alto / 2} Q ${rx + c * 6} ${y - 60} ${rx + c * 10 - 30} ${y + alto * 0.42}`} stroke="#e8d3a6" strokeWidth={22 - i * 3} fill="none" strokeLinecap="round" />)}
    {restos.map(([rx, ry, rot], i) => { const d = kclamp(deshace * 1.4 - i * 0.08, 0, 1); return <g key={i} transform={`translate(${rx} ${ry}) rotate(${rot}) scale(${1.7 * (1 - d * 0.7)})`} opacity={1 - d * 0.8}>
      <path d="M -60 0 Q -20 -40 60 -10 Q 20 30 -60 0 Z" fill={MC.seca} stroke={KC.ink} strokeWidth={4} /><path d="M -50 0 L 50 -8" stroke="#6b4a22" strokeWidth={3} />
    </g>; })}
    <RedHifas T={T} x={x} y={y} g={g} seed={seed} n={340} escala={0.9} color={MC.hifa} ancho={3.2} circ brillo={0.6} />
    {primordios > 0 && [[x - 150, y - 170], [x + 40, y - 230], [x + 190, y - 140]].map(([px, py], i) => { const p = kprog(primordios, i * 0.15, i * 0.15 + 0.5, kEase.rebote); return p > 0 ? <ellipse key={i} cx={px} cy={py} rx={16 * p} ry={22 * p} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /> : null; })}
  </g>;
}

function MacetaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, L: CUES.Llega, Mi: CUES.Micelio, Ca: CUES.Calor, A: CUES.Abre, P: CUES.Pregunta, Tx: CUES.Toxico, E: CUES.Estudio, Pg: CUES.Pigmento, Tr: CUES.Truco, Q: CUES.Quitar, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // las tres setas de la maceta (relativas a la tierra)
  const TRES = [[-120, 4, 1.0, -6], [-60, 10, 0.8, 5], [40, 8, 0.65, 10]];
  const tres = (t0, abre = 0.8, pal = 0) => TRES.map(([dx, dy, k, r], i) => <Leuco key={i} x={dx} y={dy} s={k} rot={r + mece(T, i + 5, 0.3) * 1.5} crece={kprog(T, t0 + i * 0.18, t0 + i * 0.18 + 0.8)} abre={abre} palido={pal} alto={210} />);
  const abreA = kprog(T, K.A + 0.2, K.A + 2.6, kEase.suave);
  const luz = kprog(T, K.Tr + 1.0, K.Tr + 2.6, kEase.suave), levanta = kprog(T, K.Tr + 3.0, K.Tr + 3.6, kEase.sale);
  const arranca = kprog(T, K.Q + 0.2, K.Q + 1.0, kEase.sale);
  const quita = kprog(T, K.Tx + 4.0, K.Tx + 5.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: brotan hongos amarillos en tu maceta */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.06} origen="40% 50%">
        <FondoLunares color={KC.yellow} punto="rgba(255,255,255,.4)" />
        {fsvg(<Maceta T={T} x={400} y={900} s={1.2}>{tres(K.G + 0.25)}</Maceta>)}
      </Escena>
      {/* 2 · su nombre: Leucocoprinus birnbaumii */}
      <Escena T={T} a={K.N} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={800} fill={MC.tierra} stroke={KC.ink} strokeWidth={8} />
          <path d="M 560 1186 Q 600 1170 640 1188 Q 600 1200 560 1186 Z" fill={MC.seca} stroke={KC.ink} strokeWidth={3} />
          <Leuco x={430} y={1184} s={1.6} crece={kprog(T, K.N - 0.3, K.N + 0.6)} abre={0.7} rot={mece(T, 3, 0.3) * 1.2} />
          <Leuco x={720} y={1184} s={0.9} crece={kprog(T, K.N + 0.5, K.N + 1.3)} abre={0.15} rot={6} />
        </>)}
      </Escena>
      {/* 3 · cómo llegó: en la tierra que compraste o como espora por el aire */}
      <Escena T={T} a={K.L} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {/* ventana */}
          <g transform="translate(700 420)">
            <rect x={0} y={0} width={300} height={300} rx={10} fill="#bfefff" stroke={KC.ink} strokeWidth={9} />
            <line x1={150} y1={0} x2={150} y2={300} stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={150} x2={300} y2={150} stroke={KC.ink} strokeWidth={8} />
            <circle cx={230} cy={70} r={34} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          </g>
          {/* costal de tierra que se vacía */}
          {(() => { const v = kprog(T, K.L + 0.2, K.L + 0.7, kEase.sale), cae = kprog(T, K.L + 0.5, K.L + 2.4); return <g>
            <g transform={`translate(${klerp(-200, 170, v)} 470) rotate(${klerp(0, 55, v)})`}>
              <path d="M -110 -150 L 110 -150 L 130 150 Q 0 170 -130 150 Z" fill="#c9a26a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
              <rect x={-80} y={-60} width={160} height={90} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
              <text x={0} y={-6} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>TIERRA</text>
            </g>
            {cae > 0 && cae < 1 && Array.from({ length: 26 }, (_, i) => { const q = krng(i + 7); const u = ((T * 1.4 + q()) % 1); return <circle key={i} cx={300 + (q() - 0.5) * 70 + u * 90} cy={600 + u * 280} r={6 + q() * 9} fill={MC.tierra} />; })}
            {cae > 0 && cae < 1 && Array.from({ length: 5 }, (_, i) => { const u = ((T * 1.1 + i / 5) % 1); return <path key={i} d={`M 0 0 q 10 -14 20 0 t 20 0 t 20 0`} transform={`translate(${280 + u * 90} ${620 + u * 260}) rotate(${40 + i * 20})`} stroke={MC.hifa} strokeWidth={4} fill="none" />; })}
          </g>; })()}
          <Maceta T={T} x={480} y={900} s={0.9} />
          {/* la espora entra flotando por la ventana */}
          {(() => { const u = kprog(T, K.L + 2.0, K.Mi - 0.1, kEase.suave); return u > 0 ? <g>
            <path d={`M 850 570 Q 760 ${700} ${klerp(850, 560, u)} ${klerp(570, 890, u)}`} stroke="rgba(255,255,255,.7)" strokeWidth={5} strokeDasharray="10 12" fill="none" opacity={u < 1 ? 1 : 0} />
            <Espora x={klerp(850, 560, u) + Math.sin(T * 5) * 14} y={klerp(570, 890, u)} px={50} rot={T * 60} brillo />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 4 · por dentro: el micelio deshace los restos muertos */}
      <Escena T={T} a={K.Mi} b={K.Ca} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:'#24170d' }}></div>
        {fsvg(<TierraPorDentro T={T} g={kprog(T, K.Mi - 0.2, K.Mi + 3.4, kEase.suave)} deshace={kprog(T, K.Mi + 1.4, K.Ca)} x={540} y={850} alto={900} />)}
        <Ambiente T={T} n={14} color="rgba(255,240,200,.25)" />
      </Escena>
      {/* 5 · calor y humedad: del micelio sale el hongo */}
      <Escena T={T} a={K.Ca} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Termometro x={130} y={1080} nivel={klerp(0.25, 0.85, kprog(T, K.Ca + 0.1, K.Ca + 1.4, kEase.sale))} />
          <Goteo T={T} x={560} y0={420} y1={760} cada={0.35} color="#7fd3ff" desde={K.Ca + 0.6} hasta={K.Ca + 2.4} r={14} />
          <Maceta T={T} x={560} y={780} s={1.25} planta={1} secas={false} corte={1}
            dentro={<g>
              <RedHifas T={T} x={0} y={170} g={1} seed={11} n={260} escala={0.13} color={MC.hifa} ancho={2.6} circ />
              {[[-90, 70], [10, 60], [100, 74]].map(([px, py], i) => { const p = kprog(T, K.Ca + 1.6 + i * 0.25, K.Ca + 2.1 + i * 0.25, kEase.rebote); return p > 0 ? <ellipse key={i} cx={px} cy={py} rx={13 * p} ry={17 * p} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /> : null; })}
            </g>}>
            {[[-90, 4], [10, 6], [100, 4]].map(([dx, dy], i) => <Leuco key={i} x={dx} y={dy} s={0.75} crece={kprog(T, K.Ca + 2.6 + i * 0.25, K.Ca + 3.6 + i * 0.25)} abre={0.05} alto={110} />)}
          </Maceta>
        </>)}
      </Escena>
      {/* 6 · time-lapse: huevito → campana → abierto, y caen esporas blancas */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} punto="rgba(255,255,255,.4)" />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={800} fill={MC.tierra} stroke={KC.ink} strokeWidth={8} />
          <Leuco x={330} y={1124} s={2.0} crece={1} abre={abreA} palido={kprog(T, K.A + 1.6, K.A + 3.4) * 0.55} alto={230} />
          {abreA > 0.75 && Array.from({ length: 14 }, (_, i) => { const q = krng(i + 3); const u = ((T - K.A) * 0.5 + q()) % 1; return <circle key={i} cx={330 + (q() - 0.5) * 300 + Math.sin(T * 2 + i) * 10} cy={680 + u * 420} r={3.5} fill="#fff" opacity={(1 - u) * kprog(abreA, 0.75, 1)} />; })}
          {/* recuadro al microscopio: esporas */}
          {(() => { const o = kprog(T, K.A + 2.6, K.A + 3.0); return o > 0 ? <g opacity={o}>
            <circle cx={800} cy={960} r={175} fill={KC.noche} stroke={KC.white} strokeWidth={9} />
            {[[-80, -60, 20], [30, -90, -30], [90, 10, 60], [-30, 30, -10], [-100, 80, 40], [40, 100, 15], [110, -60, -50]].map(([dx, dy, r], i) => <Espora key={i} x={800 + dx * 0.9} y={960 + dy * 0.9} px={60} rot={r + Math.sin(T + i) * 4} />)}
            <line x1={720} y1={1095} x2={780} y2={1095} stroke="#fff" strokeWidth={7} />
            <text x={750} y={1078} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#fff">10 µm</text>
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Tx} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={300} y={900} tam={460} />
          <Maceta T={T} x={290} y={1060} s={0.55}>{tres(K.P - 1)}</Maceta>
        </>)}
      </Escena>
      {/* 8 · tóxico si se come: con niños o mascotas, quítalo */}
      <Escena T={T} a={K.Tx} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Maceta T={T} x={520} y={1000} s={0.95}>
            {TRES.map(([dx, dy, k, r], i) => { const yo = i === 0 ? -quita * 900 : 0, xo = i === 0 ? quita * 500 : 0; return (i === 0 && quita >= 1) ? null : <Leuco key={i} x={dx + xo} y={dy + yo} s={k} rot={r + quita * 30} abre={1} />; })}
          </Maceta>
          {(() => { const u = kprog(T, K.Tx + 3.0, K.Tx + 3.8, kEase.sale); return u > 0 ? <>
            <Nino x={klerp(-120, 150, u)} y={1180} s={1.1} />
            <Perrito T={T} x={klerp(1200, 900, u)} y={1180} s={1.1} />
          </> : null; })()}
          {(() => { const baja = kprog(T, K.Tx + 3.4, K.Tx + 4.0, kEase.sale); return baja > 0 ? <Mano x={406 + quita * 600} y={klerp(-200, 960, baja) - quita * 1080} s={1.1} rot={-10 + quita * 30} /> : null; })()}
          {T >= K.Tx + 0.6 && (() => { const k = kprog(T, K.Tx + 0.6, K.Tx + 0.95, kEase.rebote); return <g transform={`translate(330 500) rotate(-10) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, K.Tx + 0.6, K.Tx + 0.75)}>
            <rect x={-200} y={-62} width={400} height={124} rx={22} fill="rgba(255,255,255,.85)" stroke={KC.red} strokeWidth={12} />
            <text y={26} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.red}>NO SE COME</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio: Múnich, 2005 */}
      <Escena T={T} a={K.E} b={K.Pg} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Matraz T={T} x={250} y={1140} s={1.0} lleno={kprog(T, K.E + 1.2, K.E + 3.0, kEase.suave)} />
          {Array.from({ length: 3 }, (_, i) => { const u = kprog(T, K.E + 1.0 + i * 0.4, K.E + 1.8 + i * 0.4, kEase.suave); return u > 0 && u < 1 ? <g key={i} transform={`translate(${250 + (i - 1) * 30} ${klerp(560, 1050, u)}) rotate(${u * 200})`}><ellipse rx={30} ry={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g> : null; })}
        </>)}
      </Escena>
      {/* 10 · los pigmentos: birnbauminas (por dentro, fondo oscuro) */}
      <Escena T={T} a={K.Pg} b={K.Tr} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} color="rgba(255,225,26,.25)" />
        {fsvg(<>
          <Birnbaumina T={T} x={130} y={680} s={1.15 * kprog(T, K.Pg + 0.1, K.Pg + 0.6, kEase.rebote)} brilla={0.6 + 0.4 * Math.sin(T * 4)} />
          <Birnbaumina T={T} x={130} y={980} s={1.15 * kprog(T, K.Pg + 0.6, K.Pg + 1.1, kEase.rebote)} brilla={0.6 + 0.4 * Math.sin(T * 4 + 1.5)} />
        </>)}
      </Escena>
      {/* 11 · el truco: una noche sobre papel negro */}
      <Escena T={T} a={K.Tr} b={K.Q} zoom={0.04}>
        <FondoLunares color={mixHex('#6f5bb5', '#b18cff', luz)} />
        {fsvg(<>
          <rect x={150} y={720} width={780} height={430} rx={14} fill="#15151a" stroke={KC.ink} strokeWidth={8} transform="rotate(-3 540 935)" />
          {levanta > 0 && <g transform="translate(540 930)" opacity={levanta}>
            {Array.from({ length: 48 }, (_, i) => { const a = (i / 48) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 24} y1={Math.sin(a) * 24 * 0.55} x2={Math.cos(a) * 175} y2={Math.sin(a) * 175 * 0.55} stroke="#f7f4ea" strokeWidth={5} strokeLinecap="round" opacity={0.85} />; })}
            <ellipse rx={22} ry={12} fill="#15151a" />
          </g>}
          {/* sombrero boca abajo: las laminillas tocan el papel */}
          {(() => { const baja = kprog(T, K.Tr + 0.2, K.Tr + 0.8, kEase.sale); return <g transform={`translate(${540 - levanta * 40} ${klerp(500, 930, baja) - levanta * 400}) scale(${1 - levanta * 0.3})`}>
            <path d="M -190 0 C -190 -95 -80 -120 0 -120 C 80 -120 190 -95 190 0 Q 0 22 -190 0 Z" fill={MC.limon} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <ellipse cx={0} cy={-112} rx={24} ry={9} fill="#c9a000" />
            {Array.from({ length: 9 }, (_, i) => { const u = (i - 4) / 4.4; return <line key={i} x1={u * 182} y1={-4} x2={u * 140} y2={-46} stroke="#c9a000" strokeWidth={3} />; })}
          </g>; })()}
          <LunaSol T={T} x={180} y={500} u={luz} />
        </>)}
      </Escena>
      {/* 12 · arrancarlo no lo elimina: el micelio sigue abajo */}
      <Escena T={T} a={K.Q} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Maceta T={T} x={420} y={860} s={1.1}>
            {TRES.map(([dx, dy, k, r], i) => <Leuco key={i} x={dx + arranca * (180 + i * 40)} y={dy - arranca * (700 + i * 60)} s={k} rot={r + arranca * 40} abre={1} />)}
          </Maceta>
          {(() => { const f = kprog(T, K.Q + 2.6, K.Q + 3.1, kEase.rebote); return f > 0 ? <g>
            <Frasco x={890} y={1150} s={f} />
            {kprog(T, K.Q + 3.3, K.Q + 3.6) > 0 && <path d="M 820 900 L 960 1040 M 960 900 L 820 1040" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.Q + 3.3, K.Q + 3.6)} />}
          </g> : null; })()}
        </>)}
      </Escena>
      <Lupa T={T} at={K.Q + 1.1} until={K.C - 0.3} x={420} y={930} r={200} fx={420} fy={1000} tinte={KC.yellow} etiqueta="el micelio sigue abajo"
        interior={(t, r) => <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>
          <rect width={r * 2} height={r * 2} fill="#2a1a10" />
          {Array.from({ length: 22 }, (_, i) => { const q = krng(i + 60); return <circle key={i} cx={q() * r * 2} cy={q() * r * 2} r={5 + q() * 10} fill="#4d321c" />; })}
          <RedHifas T={t} x={r} y={r} g={1} seed={11} n={300} escala={0.5} color={MC.hifa} ancho={2.6} circ brillo={0.5 + 0.3 * Math.sin(t * 3)} />
        </svg>} />
      {/* 13 · cierre: la misma maceta del inicio; el hongo no la mata, recicla su tierra */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 50%">
        <FondoLunares color={KC.yellow} punto="rgba(255,255,255,.4)" />
        {fsvg(<Maceta T={T} x={400} y={900} s={1.2} secas={false}>
          {tres(K.C - 2)}
          {kprog(T, K.C + 0.6, K.C + 1.0) > 0 && <g opacity={kprog(T, K.C + 0.6, K.C + 1.0)}>
            <FlechaCirculo x={120} y={8} r={34} rot={T * 90} />
            <FlechaCirculo x={-170} y={10} r={28} rot={-T * 90 + 40} color={KC.leaf} />
          </g>}
        </Maceta>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 2.2} until={K.G + 3.3} texto="está matando a tu planta" x={340} y={380} tam={38} />
      <Chip T={T} at={K.G + 3.4} until={K.N - 0.3} texto="se come lo que ya está muerto" x={320} y={380} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.N + 0.6} until={K.L - 0.3} x={60} y={410} texto="Leucocoprinus birnbaumii" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.L - 0.3} x={60} y={466} texto="hongo amarillo de las macetas" tam={27} color={KC.ink} />
      <Etq T={T} at={K.N + 1.6} until={K.L - 0.3} x={260} y={610} texto="sombrero" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.N + 2.0} until={K.L - 0.3} x={560} y={700} texto="laminillas libres" tam={26} color={KC.ink} />
      <Etq T={T} at={K.N + 2.4} until={K.L - 0.3} x={470} y={790} texto="anillo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.L + 0.9} until={K.L + 2.4} texto="en la tierra que compraste" x={330} y={790} tam={30} borde={MC.tierra} />
      <Chip T={T} at={K.L + 2.4} until={K.Mi - 0.3} texto="o por el aire" x={820} y={790} tam={32} borde={KC.white} />
      <Etq T={T} at={K.Mi + 0.8} until={K.Ca - 0.3} x={600} y={900} texto="micelio" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Mi + 1.5} until={K.Ca - 0.3} x={60} y={1150} texto="restos muertos" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Ca + 0.3} until={K.Ca + 1.9} texto="calor + humedad" x={540} y={420} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ca + 2.4} until={K.A - 0.3} texto="el hongo: su parte para reproducirse" x={540} y={420} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.A + 0.1} until={K.A + 1.2} x={370} y={780} texto="huevito" tam={34} color={KC.ink} />
      <Etq T={T} at={K.A + 1.2} until={K.A + 2.2} x={370} y={780} texto="campana" tam={34} color={KC.ink} />
      <Etq T={T} at={K.A + 2.2} until={K.P - 0.3} x={370} y={780} texto="abierto" tam={34} color={KC.ink} />
      <Etq T={T} at={K.A + 3.0} until={K.P - 0.3} x={560} y={1170} texto="esporas blancas" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Tx + 1.4} until={K.Tx + 3.0} texto="comerlo: puede caer muy mal" x={540} y={760} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Tx + 3.2} until={K.E - 0.3} texto="niños o mascotas: quítalo" x={360} y={430} tam={32} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Pg - 0.3} anio="2005" quien="Múnich, Alemania" revista="Bartsch y col. · Angewandte Chemie" x={600} y={760} />
      <Etq T={T} at={K.E + 2.0} until={K.Pg - 0.3} x={380} y={1080} texto="¿de dónde sale el amarillo?" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pg + 0.4} until={K.Tr - 0.3} x={120} y={560} texto="birnbaumina A" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.Pg + 0.9} until={K.Tr - 0.3} x={120} y={860} texto="birnbaumina B" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.Pg + 1.4} until={K.Tr - 0.3} x={120} y={1120} texto="pigmentos (esquema)" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Tr + 0.9} until={K.Tr + 3.0} texto="1 noche" x={400} y={430} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Tr + 3.5} until={K.Q - 0.3} x={60} y={640} texto="dibujo blanco de esporas" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Q + 3.2} until={K.C - 0.3} texto="fungicidas: casi no sirven" x={380} y={440} tam={32} borde={KC.red} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="no la mata: recicla su tierra" x={340} y={430} tam={34} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.N} until={K.L} texto="2 cm" largo={160} />
      <BarraEscala T={T} at={K.L} until={K.Mi} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Mi} until={K.Ca} texto="1 mm" largo={180} />
      <BarraEscala T={T} at={K.Ca} until={K.A} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="2 cm" largo={200} />
      <BarraEscala T={T} at={K.P} until={K.Tx} texto="5 cm" largo={80} />
      <BarraEscala T={T} at={K.Tx} until={K.E} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.E} until={K.Pg} texto="5 cm" largo={140} />
      <BarraEscala T={T} at={K.Pg} until={K.Tr} texto="1 nm" largo={150} />
      <BarraEscala T={T} at={K.Tr} until={K.Q} texto="5 cm" largo={210} />
      <BarraEscala T={T} at={K.Q} until={K.C} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No mata a tu planta: *come lo que ya está muerto.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.L - 0.1} texto="El hongo amarillo *de las macetas.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.Mi - 0.1} texto="En la tierra… *o por el aire.*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.Ca - 0.1} texto="Hilos finísimos: *el micelio.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.A - 0.1} texto="Calor y humedad: *sale el hongo.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Huevito, campana… *esporas blancas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Tx - 0.1} texto="¿Por qué *tener cuidado?*" />
      <Subtitulo T={T} idx={7} at={K.Tx + 0.1} until={K.E - 0.1} texto="Se considera *tóxico: no se come.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Pg - 0.1} texto="2005, Múnich: *¿de dónde sale el amarillo?*" />
      <Subtitulo T={T} idx={9} at={K.Pg + 0.1} until={K.Tr - 0.1} texto="Dos pigmentos: *birnbauminas.*" />
      <Subtitulo T={T} idx={10} at={K.Tr + 0.1} until={K.Q - 0.1} texto="Una noche en papel negro: *esporas.*" />
      <Subtitulo T={T} idx={11} at={K.Q + 0.1} until={K.C - 0.1} texto="El micelio *sigue abajo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No la mata: *recicla su tierra.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.8, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mi + 0.3, K.Ca - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.A + 0.3, K.P - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.Tx + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tx + 0.6, K.E - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 1.0, K.Tr - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Tr + 1.4, K.Q - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Q + 0.5, K.C - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="27" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MacetaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MacetaShot /></CompositionStage></div>;
}
window.MacetaApp = MacetaApp;
