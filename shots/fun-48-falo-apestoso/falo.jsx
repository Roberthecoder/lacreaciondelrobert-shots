// Shot Fungi Mati #48 · El hongo que apesta a muerto a propósito: Phallus impudicus — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Escala base de las piezas: 20 px = 1 cm (s = 1). Huevo hasta 6 cm; tallo blanco, hueco y esponjoso; sombrero de 2–4 cm con gleba café olivo;
// sin gleba: sombrero con red de huecos (reticulado) y un anillo blanco en la punta.

const FL = { gleba:'#4f4a1f', gleba2:'#6d6a2c', brillo:'#9a9550', tallo:'#f7f2e4', poro:'#ddd2b8', crema:'#efe5c6', huevo:'#f3eee0', huevo2:'#d9d0bb',
  tierra:'#6b4a2b', tierra2:'#4a3019', hoja:'#c0702a', hoja2:'#9a5a22', mosca:'#2fae6a', mosca2:'#1f7d8c', ojo:'#c0392b', olor:'#9fdc4a' };

// Piso de bosque: hojarasca y tierra desde y hacia abajo. corte = muestra la tierra en corte (madera enterrada).
function PisoBosque({ y = 1110, seed = 4, corte = false }) {
  const g = krng(seed);
  const hojas = Array.from({ length: 14 }, () => [g() * KW, y + 4 + g() * 24, g() * 180 - 90, 0.7 + g() * 0.6, g() > 0.5]);
  return <g>
    <rect x={-40} y={y} width={KW + 80} height={KH - y + 40} fill={corte ? FL.tierra2 : FL.tierra} stroke={KC.ink} strokeWidth={8} />
    {corte && Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 197) % KW} cy={y + 60 + ((i * 131) % (KH - y - 80))} r={4 + (i % 4) * 2} fill="#6e4a2c" opacity=".7" />)}
    {hojas.map(([x, yy, r, k, o], i) => <path key={i} d="M -46 0 Q 0 -26 46 0 Q 0 22 -46 0 Z" transform={`translate(${x} ${yy}) rotate(${r}) scale(${k})`} fill={o ? FL.hoja : FL.hoja2} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

// Huevo (primordio) medio enterrado. Base (x, y) = nivel del suelo; abre 0..1 = se raja por arriba. cordon = cordón de micelio hacia abajo.
function Huevo({ T, x, y, s = 1, abre = 0, cordon = 1, temblor = 0 }) {
  const dx = temblor ? Math.sin(T * 40) * temblor * 3 : 0;
  return <g transform={`translate(${x + dx} ${y}) scale(${s})`}>
    {cordon > 0 && <Cordon x1={0} y1={62} x2={-40} y2={62 + 160 * cordon} p={1} onda={10} color="#fff4d6" ancho={9} />}
    <ellipse cx={0} cy={-8} rx={60} ry={72} fill={FL.huevo} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={14} cy={2} rx={38} ry={50} fill={FL.huevo2} opacity=".55" />
    <ellipse cx={-22} cy={-42} rx={14} ry={22} fill="#fff" opacity=".8" />
    {[[-30, 10], [20, -20], [5, 30], [-10, -55]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} q 8 -6 16 0`} stroke={FL.huevo2} strokeWidth={4} fill="none" />)}
    {abre > 0 && <path d={`M -34 ${-62} L -18 ${-62 - 14 * abre} L -4 ${-66} L 10 ${-62 - 16 * abre} L 26 ${-64} L 36 ${-58}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinejoin="round" />}
    {abre > 0.4 && <path d={`M -14 -70 Q 0 ${-70 - 24 * abre} 14 -70 Z`} fill="#fbfaf4" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}

// Falo hediondo (Phallus impudicus) de perfil. Base del tallo (x, y) = suelo. h = alto del tallo en px (s = 1: 20 px = 1 cm).
// baba 0..1 = gleba sobre el sombrero; limpio 0..1 = la gleba ya se fue (queda la red). velo 0..1 = indusio de encaje (parientes con velo).
function Falo({ T, id = 'a', x, y, s = 1, h = 360, baba = 1, limpio = 0, velo = 0, rot = 0, goteo = 0 }) {
  if (h <= 2) return null;
  const tw = 30, cw = 44, ch = 96, top = -h, capY = top + 10;
  const g = krng(7);
  const poros = Array.from({ length: Math.floor(h / 9) }, () => [g() * 2 - 1, g()]);
  const cap = `M ${-cw} ${capY + ch * 0.55} Q ${-cw - 6} ${capY - ch * 0.35} 0 ${capY - ch * 0.5} Q ${cw + 6} ${capY - ch * 0.35} ${cw} ${capY + ch * 0.55} Q 0 ${capY + ch * 0.68} ${-cw} ${capY + ch * 0.55} Z`;
  const gl = baba * (1 - limpio);
  const celdas = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) { const cx = -cw + 8 + c * 16 + (r % 2) * 8, cy = capY - ch * 0.5 + 8 + r * 15; celdas.push([cx, cy]); }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={`cap-${id}`}><path d={cap} /></clipPath></defs>
    {/* volva: restos del huevo */}
    <path d="M -58 0 Q -66 -46 -40 -58 L -30 -34 L -14 -62 L 0 -40 L 16 -64 L 30 -36 L 42 -58 Q 66 -46 58 0 Q 0 22 -58 0 Z" fill={FL.huevo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* tallo blanco, hueco y esponjoso */}
    <path d={`M ${-tw - 3} -20 L ${-tw + 2} ${top + 30} L ${tw - 2} ${top + 30} L ${tw + 3} -20 Z`} fill={FL.tallo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {poros.map(([u, v], i) => <ellipse key={i} cx={u * (tw - 8)} cy={-24 - v * (h - 60)} rx={5} ry={3} fill={FL.poro} />)}
    <path d={`M ${-tw + 10} -30 L ${-tw + 12} ${top + 40}`} stroke="#fff" strokeWidth={8} opacity=".8" />
    {/* velo de encaje (indusio) para los parientes */}
    {velo > 0 && <g opacity={velo}>
      <path d={`M ${-cw + 4} ${capY + ch * 0.5} Q ${-cw - 40 * velo} ${capY + ch * 0.5 + h * 0.5 * velo} ${-cw - 70 * velo} ${capY + ch * 0.5 + h * 0.62 * velo} L ${cw + 70 * velo} ${capY + ch * 0.5 + h * 0.62 * velo} Q ${cw + 40 * velo} ${capY + ch * 0.5 + h * 0.5 * velo} ${cw - 4} ${capY + ch * 0.5}`} fill="rgba(255,248,220,.35)" stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 6 }, (_, r) => Array.from({ length: 5 + r }, (_, c) => { const yy = capY + ch * 0.6 + r * h * 0.1 * velo, ww = cw + r * 14 * velo, xx = -ww + (c + 0.5) * (2 * ww / (5 + r));
        return <ellipse key={`${r}-${c}`} cx={xx} cy={yy} rx={8 + r} ry={6 + r * 0.8} fill="none" stroke="#fff8dc" strokeWidth={4} />; }))}
    </g>}
    {/* sombrero: debajo la red (reticulado), encima la gleba */}
    <path d={cap} fill={FL.crema} stroke={KC.ink} strokeWidth={6} />
    <g clipPath={`url(#cap-${id})`}>
      {celdas.map(([cx, cy], i) => <path key={i} d={`M ${cx - 7} ${cy} L ${cx} ${cy - 6} L ${cx + 7} ${cy} L ${cx} ${cy + 6} Z`} fill="#9c8a5a" stroke="#fffaf0" strokeWidth={3} />)}
      {gl > 0 && <path d={cap} fill={FL.gleba} opacity={gl} />}
      {gl > 0 && [[-18, -30, 9], [10, -10, 7], [-6, 18, 8], [20, 30, 6], [-26, 40, 7]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={capY + b} rx={r * 1.4} ry={r} fill={FL.gleba2} opacity={gl} />)}
      {gl > 0 && <path d={`M ${-cw + 10} ${capY - 10} Q ${-cw + 14} ${capY - ch * 0.38} ${-6} ${capY - ch * 0.44}`} stroke={FL.brillo} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8 * gl} />}
    </g>
    <path d={cap} fill="none" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={capY - ch * 0.5} rx={15} ry={7} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} />
    {gl > 0.2 && goteo > 0 && [-30, 4, 28].map((dx, i) => { const u = ((T * 0.5 + i * 0.33) % 1); return <path key={i} d={`M ${dx - 6} ${capY + ch * 0.58} Q ${dx} ${capY + ch * 0.58 + 26 * u} ${dx + 6} ${capY + ch * 0.58} Z`} fill={FL.gleba} stroke={KC.ink} strokeWidth={2} opacity={gl * goteo} />; })}
  </g>;
}

// Mosca (moscarda verde metálica, esquemática). (x, y) = centro; ang = hacia dónde mira (grados).
function Mosca({ T, x, y, s = 1, ang = 0, aleteo = 1, seed = 1, color = FL.mosca }) {
  const w = aleteo ? 0.35 + 0.65 * Math.abs(Math.sin(T * 55 + seed)) : 1;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    {[[-10, 1], [4, 1], [16, 1]].map(([lx], i) => <g key={i}><path d={`M ${lx} 8 l -10 22 l -6 8`} stroke={KC.ink} strokeWidth={4} fill="none" /><path d={`M ${lx} -8 l -10 -22 l -6 -8`} stroke={KC.ink} strokeWidth={4} fill="none" /></g>)}
    <g opacity=".75"><ellipse cx={-8} cy={-22} rx={30} ry={11 * w} transform="rotate(-18 -8 -22)" fill="#e8f7ff" stroke={KC.ink} strokeWidth={3} />
      <ellipse cx={-8} cy={22} rx={30} ry={11 * w} transform="rotate(18 -8 22)" fill="#e8f7ff" stroke={KC.ink} strokeWidth={3} /></g>
    <ellipse cx={-20} cy={0} rx={24} ry={16} fill={color} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-24} cy={-5} rx={10} ry={5} fill="#bff5d6" opacity=".7" />
    <ellipse cx={8} cy={0} rx={13} ry={14} fill={FL.mosca2} stroke={KC.ink} strokeWidth={4} />
    <circle cx={26} cy={0} r={12} fill={KC.ink} />
    <circle cx={28} cy={-8} r={8} fill={FL.ojo} stroke={KC.ink} strokeWidth={2} /><circle cx={28} cy={8} r={8} fill={FL.ojo} stroke={KC.ink} strokeWidth={2} />
  </g>;
}
// Mosca que vuela en órbita alrededor de un punto.
function MoscaOrbita({ T, cx, cy, rx = 120, ry = 60, vel = 1.6, fase = 0, s = 1, seed = 1 }) {
  const a = T * vel + fase, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry + Math.sin(T * 7 + seed) * 8;
  const ang = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx) * 180 / Math.PI;
  return <Mosca T={T} x={x} y={y} s={s} ang={ang} seed={seed} />;
}

// Ondas de olor que suben desde (x, y).
function Olor({ T, x, y, n = 3, alto = 360, color = FL.olor, o = 1, sep = 46 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.45 + i / n) % 1); const xx = x + (i - (n - 1) / 2) * sep, yy = y - u * alto;
    return <path key={i} d={`M ${xx} ${yy} q 18 -20 0 -40 t 0 -40 t 0 -40`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />; })}</g>;
}

// Nariz de caricatura (olfatea: pulso).
function Nariz({ T, x, y, s = 1, olfatea = 1 }) {
  const k = 1 + 0.06 * olfatea * Math.max(0, Math.sin(T * 9));
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d="M -20 -150 Q -30 -40 -90 20 Q -110 60 -60 70 Q -30 90 0 70 Q 30 90 40 60 Q 60 40 30 20 Q 20 -60 30 -150 Z" fill="#f2c29b" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={-42} cy={58} rx={14} ry={8} fill="#8a4f35" /><ellipse cx={14} cy={58} rx={14} ry={8} fill="#8a4f35" />
    <path d="M -10 -110 Q -16 -50 -40 0" stroke="#fff" strokeWidth={8} opacity=".5" fill="none" strokeLinecap="round" />
  </g>;
}

// Molécula de trisulfuro de dimetilo (CH3–S–S–S–CH3), esquemática. Largo ≈ 340 px · s.
function Trisulfuro({ x, y, s = 1, rot = 0, o = 1 }) {
  const at = [['C', -170, 22], ['S', -85, -22], ['S', 0, 22], ['S', 85, -22], ['C', 170, 22]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {at.slice(1).map((a, i) => <line key={i} x1={at[i][1]} y1={at[i][2]} x2={a[1]} y2={a[2]} stroke="#e9e4d6" strokeWidth={14} />)}
    {at.map(([e, ax, ay], i) => <g key={i}><circle cx={ax} cy={ay} r={e === 'S' ? 44 : 38} fill={e === 'S' ? '#ffd23f' : '#8b939e'} stroke={KC.ink} strokeWidth={6} />
      <text x={ax} y={ay + 12} textAnchor="middle" style={{ font:`700 ${e === 'S' ? 36 : 26}px ${KF.mono}` }} fill={KC.ink}>{e === 'S' ? 'S' : 'CH₃'}</text></g>)}
  </g>;
}

// Esporas al microscopio: elipses alargadas (3–4 × 1–1.5 µm) en la baba. k = px por µm.
function EsporasMicro({ T, r, k = 14, seed = 5 }) {
  const g = krng(seed), n = 70;
  const es = Array.from({ length: n }, () => [g() * 2 * r, g() * 2 * r, g() * 180, 3 + g(), 1 + g() * 0.5, g() * 6]);
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#262410" />
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={(i * 97) % (2 * r)} cy={(i * 151) % (2 * r)} rx={90} ry={50} fill="#3a3716" opacity=".8" />)}
    {es.map(([x, y, a, L, W, f], i) => <ellipse key={i} cx={x + Math.sin(T * 0.8 + f) * 6} cy={y + Math.cos(T * 0.7 + f) * 6} rx={L * k / 2} ry={W * k / 2} transform={`rotate(${a + T * 4} ${x} ${y})`} fill="#c9c27a" stroke="#1a1808" strokeWidth={2} />)}
    <rect x={20} y={2 * r - 70} width={10 * k} height={8} rx={4} fill="#fff" />
    <text x={20} y={2 * r - 80} style={{ font:`700 24px ${KF.mono}` }} fill="#fff">10 µm</text>
  </svg>;
}

// Pata de mosca de cerca, con pelitos y grumos de baba con esporas.
function PataCerca({ T, r }) {
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#1a2430" />
    <path d={`M -20 ${r * 0.6} L ${r * 1.1} ${r * 1.05} L ${2 * r + 20} ${r * 0.85}`} stroke="#0d0d0d" strokeWidth={46} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M -20 ${r * 0.6} L ${r * 1.1} ${r * 1.05} L ${2 * r + 20} ${r * 0.85}`} stroke="#2c3a3a" strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => { const u = i / 21, px = -20 + u * (2 * r + 40), py = u < 0.55 ? klerp(r * 0.6, r * 1.05, u / 0.55) : klerp(r * 1.05, r * 0.85, (u - 0.55) / 0.45);
      return <line key={i} x1={px} y1={py} x2={px + 10} y2={py - 34 - (i % 3) * 8} stroke="#0d0d0d" strokeWidth={4} />; })}
    {[[0.25, 0], [0.48, 1], [0.66, 2], [0.82, 3]].map(([u, k]) => { const px = -20 + u * (2 * r + 40), py = u < 0.55 ? klerp(r * 0.6, r * 1.05, u / 0.55) : klerp(r * 1.05, r * 0.85, (u - 0.55) / 0.45);
      return <g key={k}><ellipse cx={px} cy={py + 18} rx={30} ry={20} fill={FL.gleba2} stroke="#1a1808" strokeWidth={3} />
        {Array.from({ length: 5 }, (_, j) => <ellipse key={j} cx={px - 16 + j * 8} cy={py + 14 + (j % 2) * 8} rx={4} ry={1.8} fill="#e1dc9a" />)}</g>; })}
  </svg>;
}

// Platito con comida + mosca + gotitas de popó que se acumulan (más rápido o más lento).
function Platito({ T, x, y, desde, cada, comida, etiqueta, color }) {
  const n = T < desde ? 0 : Math.min(9, Math.floor((T - desde) / cada) + 1);
  return <g transform={`translate(${x} ${y}) scale(1.25)`}>
    <ellipse cx={0} cy={20} rx={130} ry={34} fill="#f7f7f2" stroke={KC.ink} strokeWidth={6} />
    {comida === 'baba' && <path d="M -60 10 Q -40 -20 0 -16 Q 50 -22 62 8 Q 0 30 -60 10 Z" fill={FL.gleba} stroke={KC.ink} strokeWidth={5} />}
    {comida === 'estiercol' && <path d="M -50 12 Q -46 -24 -4 -26 Q 44 -24 52 10 Q 0 26 -50 12 Z" fill="#6a4a2a" stroke={KC.ink} strokeWidth={5} />}
    {comida === 'azucar' && [[-40, 4], [-10, -6], [20, 2], [44, 8], [0, 10], [-24, -10], [30, -12]].map(([a, b], i) => <rect key={i} x={a - 9} y={b - 9} width={18} height={18} fill="#ffffff" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 17} ${a} ${b})`} />)}
    <Mosca T={T} x={0} y={-40} s={1.1} ang={-90} aleteo={0} seed={x} />
    {Array.from({ length: n }, (_, i) => { const t0 = desde + i * cada, u = kprog(T, t0, t0 + 0.25, kEase.rebote);
      return <circle key={i} cx={-100 + (i % 9) * 25} cy={110} r={10 * u} fill={comida === 'baba' ? FL.gleba : '#3b2a1a'} stroke={KC.ink} strokeWidth={3} />; })}
    <text x={0} y={175} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}

// Balanza que se inclina (♀ pesa más que ♂).
function Balanza({ T, x, y, inclina = 0 }) {
  const a = -14 * inclina;
  const brazo = (lado) => { const ex = lado * 260 * Math.cos(a * Math.PI / 180), ey = lado * 260 * Math.sin(a * Math.PI / 180); return [ex, ey]; };
  const [lx, ly] = brazo(-1), [rx, ry] = brazo(1);
  const plato = (px, py, sim, col) => <g transform={`translate(${px} ${py})`}>
    <line x1={-70} y1={140} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={70} y1={140} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
    <path d="M -110 140 Q 0 200 110 140 Z" fill="#e6d7a8" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={120} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={col} stroke={KC.ink} strokeWidth={5}>{sim}</text>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -90 420 L 90 420 L 20 380 L 20 0 L -20 0 L -20 380 Z" fill="#b08a4a" stroke={KC.ink} strokeWidth={6} />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#d9b56a" strokeWidth={10} strokeLinecap="round" />
    <circle r={20} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    {plato(lx, ly, '♀', KC.pink)}{plato(rx, ry, '♂', KC.cyan)}
  </g>;
}

// Filete podrido de caricatura (en el globo de pensamiento de la mosca).
function Filete({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -20 Q -70 -60 -10 -56 Q 70 -60 84 -10 Q 90 40 20 50 Q -60 60 -84 20 Q -92 0 -80 -20 Z" fill="#a85a4a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 -20 Q 0 -40 50 -14 Q 10 10 -50 -20 Z" fill="#e8c6b0" stroke={KC.ink} strokeWidth={3} />
    <circle cx={40} cy={22} r={12} fill="#7fa04a" /><circle cx={-40} cy={26} r={9} fill="#7fa04a" />
    <Olor T={T} x={0} y={-60} n={3} alto={90} sep={40} />
  </g>;
}

function FaloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Hu: CUES.Huevo, So: CUES.SinOlor, B: CUES.Brota, Ba: CUES.Baba, Az: CUES.Azufre, P: CUES.Pregunta, En: CUES.Engano,
    E: CUES.Estudio, Si: CUES.Siembra, He: CUES.Hembras, L: CUES.Limpio, Mx: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const crece = kprog(T, K.B + 1.0, K.B + 4.6, kEase.suave);
  const sacar = (t0) => kprog(T, t0, t0 + 0.4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: olor a carne podrida… viene de este hongo */}
      <Escena T={T} a={K.G} b={K.Hu} zoom={0.06} origen="30% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1110} />
          <Olor T={T} x={300} y={560} n={4} alto={380} />
          <Falo T={T} id="g" x={300} y={1120} s={1.35} h={340} goteo={1} />
          <MoscaOrbita T={T} cx={300} cy={560} rx={170} ry={70} vel={2.2} s={1} seed={1} />
          {T > K.G + 0.2 && <MoscaOrbita T={T} cx={klerp(-200, 330, kprog(T, K.G + 0.2, K.G + 1.4, kEase.sale))} cy={720} rx={110} ry={50} vel={-2.6} fase={1} s={0.8} seed={2} />}
          {T > K.G + 1.4 && <g opacity={kprog(T, K.G + 1.4, K.G + 1.7) * (1 - kprog(T, K.G + 3.4, K.G + 3.7))} transform="translate(300 380)">
            <path d="M -110 -16 L 110 -16 M -110 16 L 110 16" stroke="#fff" strokeWidth={26} strokeLinecap="round" />
            {[[-110, -16], [-110, 16], [110, -16], [110, 16]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={22} fill="#fff" />)}
            <path d="M -130 -70 L 130 70 M 130 -70 L -130 70" stroke={KC.red} strokeWidth={20} strokeLinecap="round" opacity={kprog(T, K.G + 2.0, K.G + 2.3)} />
          </g>}
        </>)}
      </Escena>
      {/* 2–3 · el huevo, medio enterrado, sin olor */}
      <Escena T={T} a={K.Hu} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PisoBosque y={1000} corte seed={9} />
          <rect x={560} y={1340} width={300} height={60} rx={26} fill="#8a5a2c" stroke={KC.ink} strokeWidth={6} transform="rotate(-6 700 1370)" />
          <Huevo T={T} x={420} y={1000} s={2.5 * kprog(T, K.Hu - 0.2, K.Hu + 0.6, kEase.rebote)} cordon={kprog(T, K.Hu + 0.8, K.Hu + 2.2)} />
          {T > K.So - 0.3 && <g opacity={kprog(T, K.So - 0.3, K.So + 0.2)}><Nariz T={T} x={800} y={900} s={1.1} /></g>}
        </>)}
        {/* regla de 6 cm sobre el huevo (2.5 × 20 px/cm = 50 px/cm → 300 px) */}
        <div style={{ position:'absolute', left:270, top:760, width:300, height:0, borderTop:`8px solid ${KC.ink}`, opacity:kprog(T, K.Hu + 1.4, K.Hu + 1.8), zIndex:30 }}>
          <div style={{ position:'absolute', left:-4, top:-26, width:8, height:44, background:KC.ink }}></div><div style={{ position:'absolute', right:-4, top:-26, width:8, height:44, background:KC.ink }}></div>
        </div>
      </Escena>
      {/* 4 · brota: el tallo sale en unas horas (cámara rápida) */}
      <Escena T={T} a={K.B} b={K.Ba} zoom={0.04} origen="40% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1150} seed={6} />
          {T < K.B + 1.4 && <g opacity={1 - kprog(T, K.B + 1.0, K.B + 1.4)}><Huevo T={T} x={380} y={1150} s={1} abre={kprog(T, K.B + 0.2, K.B + 0.9)} cordon={0} temblor={kprog(T, K.B, K.B + 0.4)} /></g>}
          <Falo T={T} id="b" x={380} y={1160} h={8 + 532 * crece} baba={1} />
          <g opacity={kprog(T, K.B + 1.0, K.B + 1.5)}>
            <line x1={220} y1={1160} x2={220} y2={560} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 7 }, (_, i) => <line key={i} x1={220} y1={1160 - i * 100} x2={i % 2 ? 196 : 180} y2={1160 - i * 100} stroke={KC.ink} strokeWidth={6} />)}
            <text x={220} y={535} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.B + 4.0, K.B + 4.4)}>30 cm</text>
          </g>
        </>)}
      </Escena>
      {/* 5 · la baba, al microscopio: esporas */}
      <Escena T={T} a={K.Ba} b={K.Az} zoom={0.12} origen="35% 35%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1150} seed={6} />
          <Falo T={T} id="ba" x={380} y={1160} h={484} goteo={1} />
          <MoscaOrbita T={T} cx={380} cy={640} rx={120} ry={50} vel={2.4} s={0.8} seed={4} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.Ba + 0.6} until={K.Az - 0.3} x={380} y={790} r={220} fx={380} fy={640} interior={(t, r) => <EsporasMicro T={t} r={r} k={14} />} etiqueta="AL MICROSCOPIO · esporas" tinte={KC.yellow} />
      {/* 6 · gases con azufre (por dentro, fondo oscuro) */}
      <Escena T={T} a={K.Az} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(159,220,74,.35)" />
        {fsvg(<>
          <path d={`M -40 1260 Q 200 ${1200 + Math.sin(T * 2) * 10} 540 1230 Q 860 ${1260 + Math.cos(T * 2) * 10} 1120 1210 L 1120 1960 L -40 1960 Z`} fill={FL.gleba} stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2].map((i) => { const t0 = K.Az + 0.3 + i * 0.7, u = kprog(T, t0, t0 + 3.2); return u > 0 ? <Trisulfuro key={i} x={[300, 600, 420][i] + Math.sin(T + i) * 20} y={klerp(1200, [620, 860, 1040][i], kEase.sale(u))} s={0.9} rot={Math.sin(T * 0.8 + i) * 18} o={kprog(T, t0, t0 + 0.3)} /> : null; })}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.En} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={290} y={1060} /><Olor T={T} x={290} y={560} n={3} alto={260} /></>)}
      </Escena>
      {/* 8 · el engaño: la mosca busca carne y encuentra baba */}
      <Escena T={T} a={K.En} b={K.E} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <PisoBosque y={1150} seed={12} />
          <Falo T={T} id="en" x={360} y={1160} h={420} goteo={1} />
          <Olor T={T} x={360} y={640} n={3} alto={260} />
          {(() => { const u = kprog(T, K.En + 0.3, K.En + 2.6, kEase.suave); const mx = klerp(980, 420, u), my = klerp(500, 650, u) + Math.sin(T * 8) * 10 * (1 - u);
            return <Mosca T={T} x={mx} y={my} s={1.4} ang={u < 1 ? 170 : -100} aleteo={u < 1 ? 1 : 0} seed={3} />; })()}
          {T > K.En + 0.5 && T < K.En + 2.8 && <g opacity={kprog(T, K.En + 0.5, K.En + 0.8) * (1 - kprog(T, K.En + 2.4, K.En + 2.8))}>
            <circle cx={760} cy={560} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={720} cy={510} r={22} fill="#fff" stroke={KC.ink} strokeWidth={4} />
            <ellipse cx={640} cy={400} rx={170} ry={110} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <Filete T={T} x={640} y={410} s={1.1} />
          </g>}
        </>)}
      </Escena>
      {/* 9 · el estudio de 1997: popó más rápido con la baba */}
      <Escena T={T} a={K.E} b={K.Si} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<g opacity={kprog(T, K.E + 2.6, K.E + 3.0)}>
          <Platito T={T} x={185} y={870} desde={K.E + 3.4} cada={0.45} comida="baba" etiqueta="baba" />
          <Platito T={T} x={540} y={870} desde={K.E + 3.6} cada={1.5} comida="estiercol" etiqueta="estiércol" />
          <Platito T={T} x={895} y={870} desde={K.E + 3.8} cada={1.9} comida="azucar" etiqueta="azúcar" />
        </g>)}
      </Escena>
      {/* 10 · siembra: gotitas con esporas y esporas en las patas */}
      <Escena T={T} a={K.Si} b={K.He} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1150} seed={15} />
          <Falo T={T} id="si" x={90} y={1160} s={0.6} h={420} />
          {(() => { const u = kprog(T, K.Si, K.He, (p) => p); const mx = klerp(-80, 1160, u), my = 520 + Math.sin(u * 9) * 60;
            const gotas = [];
            for (let i = 0; i < 9; i++) { const t0 = K.Si + 0.3 + i * 0.42; if (T < t0) break; const ux = kprog(T, K.Si, K.He, (p) => p) ; const gx = klerp(-80, 1160, kprog(t0, K.Si, K.He, (p) => p)); const f = kprog(T, t0, t0 + 0.6);
              gotas.push(<g key={i}><circle cx={gx} cy={klerp(540, 1140, f * f)} r={9} fill={FL.gleba} stroke={KC.ink} strokeWidth={3} />
                {f >= 1 && <ellipse cx={gx} cy={1146} rx={18} ry={7} fill={FL.gleba} stroke={KC.ink} strokeWidth={3} />}</g>); }
            return <>{gotas}<Mosca T={T} x={mx} y={my} s={1.3} ang={0} seed={6} /></>; })()}
        </>)}
      </Escena>
      <Lupa T={T} at={K.Si + 2.0} until={K.He - 0.3} x={420} y={860} r={210} fx={() => klerp(-80, 1160, kprog(T, K.Si, K.He, (p) => p))} fy={560} interior={(t, r) => <PataCerca T={t} r={r} />} etiqueta="DE CERCA · pata de mosca" tinte={KC.yellow} />
      {/* 11 · más hembras que machos */}
      <Escena T={T} a={K.He} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Balanza T={T} x={400} y={640} inclina={kprog(T, K.He + 0.6, K.He + 1.4, kEase.rebote)} />)}
      </Escena>
      {/* 12 · en unas horas, la baba desaparece */}
      <Escena T={T} a={K.L} b={K.Mx} zoom={0.06} origen="35% 40%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1150} seed={6} />
          <Falo T={T} id="l" x={380} y={1160} h={484} limpio={kprog(T, K.L + 0.2, K.L + 1.8)} />
          {[0, 1, 2].map((i) => <MoscaOrbita key={i} T={T} cx={380 + kprog(T, K.L + 0.8, K.Mx) * (i - 1) * 700} cy={640 - kprog(T, K.L + 0.8, K.Mx) * 500} rx={110} ry={50} vel={2 + i * 0.4} fase={i * 2} s={0.8} seed={i + 7} />)}
        </>)}
      </Escena>
      {/* 13 · México: parientes con velo de encaje */}
      <Escena T={T} a={K.Mx} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <MapaMexico x={0} y={580} ancho={820} color="#ffe9a8" />
          <g opacity={kprog(T, K.Mx + 0.8, K.Mx + 1.3)}>
            <ellipse cx={910} cy={1165} rx={150} ry={24} fill="rgba(0,0,0,.25)" />
            <Falo T={T} id="v" x={910} y={1160} s={0.9} h={20 + 330 * kprog(T, K.Mx + 0.8, K.Mx + 2.0, kEase.suave)} velo={kprog(T, K.Mx + 1.8, K.Mx + 3.0, kEase.sale)} />
          </g>
        </>)}
      </Escena>
      {/* 14 · cierre: el mismo bosque del inicio, el hongo ya limpio y huevos nuevos donde cayeron esporas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="30% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PisoBosque y={1110} />
          <Falo T={T} id="c" x={300} y={1120} s={1.35} h={340} limpio={1} />
          {[[620, 1118, 0.6], [820, 1122, 0.75], [120, 1124, 0.55], [960, 1116, 0.5]].map(([x, y, s], i) => { const t0 = K.C + 1.2 + i * 0.5; const k = kprog(T, t0, t0 + 0.5, kEase.rebote);
            return k > 0 ? <Huevo key={i} T={T} x={x} y={y} s={s * k} cordon={0} /> : null; })}
          {[0, 1].map((i) => <MoscaOrbita key={i} T={T} cx={700} cy={600} rx={260} ry={90} vel={1.6 + i * 0.5} fase={i * 3} s={0.8} seed={i + 11} />)}
        </>)}
      </Escena>

      {/* textos (no tapan el subtítulo, que vive en bottom 560) */}
      <Chip T={T} at={K.G + 1.5} until={K.G + 3.6} texto="¿un animal muerto? ✗" x={330} y={440} tam={36} borde={KC.red} />
      <Etq T={T} at={K.G + 2.4} until={K.Hu - 0.3} x={410} y={960} texto="falo hediondo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 2.8} until={K.Hu - 0.3} x={410} y={1010} texto="Phallus impudicus" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.Hu + 1.6} until={K.So - 0.2} texto="hasta 6 cm" x={420} y={690} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Hu + 2.2} until={K.B - 0.3} x={520} y={1160} texto="cordón de micelio" tam={28} />
      <Etq T={T} at={K.Hu + 2.8} until={K.B - 0.3} x={860} y={1430} texto="madera enterrada" lado="izq" tam={26} />
      <Chip T={T} at={K.So + 0.4} until={K.B - 0.2} texto="huevo: sin olor feo ✓" x={360} y={480} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.B + 0.8} until={K.Ba - 0.3} texto="⏩ cámara rápida: unas horas" x={380} y={440} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.B + 3.2} until={K.Ba - 0.3} x={440} y={1000} texto="tallo hueco y esponjoso" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 4.2} until={K.Ba - 0.3} x={440} y={640} texto="sombrero con baba" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ba + 0.2} until={K.Ba + 1.4} x={310} y={600} texto="gleba" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Az + 0.6} until={K.P - 0.3} texto="gases con azufre: lo que más apesta" x={390} y={440} tam={28} borde={KC.yellow} />
      <Etq T={T} at={K.Az + 1.0} until={K.P - 0.3} x={60} y={540} texto="trisulfuro de dimetilo" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.En + 2.9} until={K.E - 0.3} texto="¡caíste! solo hay baba" x={420} y={440} tam={38} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.8} anio="1997" quien="University College Cork, Irlanda" revista="Sleeman y col., J. Nat. Hist." y={600} />
      <Chip T={T} at={K.E + 4.6} until={K.Si - 0.3} texto="con la baba: popó más rápido" x={350} y={480} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Si + 0.4} until={K.Si + 2.2} texto="gotitas con esporas" x={380} y={440} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.He + 0.4} until={K.L - 0.3} texto="llegan más hembras" x={400} y={440} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.L + 1.4} until={K.Mx - 0.3} texto="queda su red de huecos" x={400} y={440} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 0.3} until={K.C - 0.3} texto="10 estados · Guzmán y col., 1990" x={420} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Mx + 2.4} until={K.C - 0.3} x={770} y={1000} texto="velo de encaje" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Mx + 2.8} until={K.C - 0.3} x={770} y={1050} texto="Phallus (antes Dictyophora)" it lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="lo sembraron las moscas" x={360} y={440} tam={38} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Hu} texto="10 cm" largo={270} />
      <BarraEscala T={T} at={K.Hu} until={K.B} texto="5 cm" largo={250} />
      <BarraEscala T={T} at={K.B} until={K.Az} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Az} until={K.P} texto="1 nm" largo={400} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.E} until={K.Si} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.Si} until={K.He} texto="10 cm" largo={120} />
      <BarraEscala T={T} at={K.L} until={K.Mx} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Mx} until={K.C} texto="500 km" largo={93} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={270} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Hu - 0.1} texto="No es un muerto: *es este hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Hu + 0.1} until={K.So - 0.1} texto="Empieza como *un huevo.*" />
      <Subtitulo T={T} idx={2} at={K.So + 0.1} until={K.B - 0.1} texto="El huevo *no huele feo.*" />
      <Subtitulo T={T} idx={3} at={K.B + 0.1} until={K.Ba - 0.1} texto="En horas: *hasta 30 cm.*" />
      <Subtitulo T={T} idx={4} at={K.Ba + 0.1} until={K.Az - 0.1} texto="Una baba *llena de esporas.*" />
      <Subtitulo T={T} idx={5} at={K.Az + 0.1} until={K.P - 0.1} texto="Gases con *azufre.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.En - 0.1} texto="¿Para qué *oler tan feo?*" />
      <Subtitulo T={T} idx={7} at={K.En + 0.1} until={K.E - 0.1} texto="Para *engañar a las moscas.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Si - 0.1} texto="Con la baba, *popó más rápido.*" />
      <Subtitulo T={T} idx={9} at={K.Si + 0.1} until={K.He - 0.1} texto="Esporas *por todos lados.*" />
      <Subtitulo T={T} idx={10} at={K.He + 0.1} until={K.L - 0.1} texto="Más *hembras* que machos." />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.Mx - 0.1} texto="La baba *desaparece.*" />
      <Subtitulo T={T} idx={12} at={K.Mx + 0.1} until={K.C - 0.1} texto="En México: *parientes con velo.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Pide que *lo siembren.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.So + 0.1, K.B + 2.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ba + 0.3, K.Az + 3.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.En + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.2, K.Si + 1.5, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.He + 0.1, K.L + 2.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mx + 0.4, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="48" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FaloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FaloShot /></CompositionStage></div>;
}
window.FaloApp = FaloApp;
