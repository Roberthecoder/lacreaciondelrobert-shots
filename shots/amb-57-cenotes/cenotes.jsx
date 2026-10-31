// Shot Ambiental #57 · El cenote es una ventana al agua que bebe toda la península — NARRADO (N1 por dentro + toque de N4).
// Datos: UNAM Internacional (2026), Kopczynski et al. 2025, Osburn et al. 2023, Cooney et al. 2023. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (mapa, cueva, capas de agua y conductos).

const CE = { G: 640, W: 800, H: 980, B: 1130, C: 330 };       // suelo, nivel del agua, haloclina, fondo, centro del cenote
const CE_ROCA = '#ead9a4', CE_ROCA2 = '#d6c07f', CE_DULCE = '#5cc3ef', CE_SAL = '#1b3f8f', CE_SELVA = '#3fae4f';

// Árboles de selva vistos de lado (copas redondas) sobre la línea del suelo.
function SelvaLado({ x0 = 0, x1 = 1080, y = CE.G, seed = 3, hueco = [CE.C - 130, CE.C + 130] }) {
  const r = krng(seed), arr = [];
  for (let x = x0; x < x1; x += 46 + r() * 30) { if (x > hueco[0] - 20 && x < hueco[1] + 20) continue; const h = 40 + r() * 50;
    arr.push(<g key={x}><rect x={x - 5} y={y - h} width={10} height={h} fill="#7a5230" /><circle cx={x} cy={y - h - 18} r={26 + r() * 14} fill={r() > 0.5 ? CE_SELVA : '#2f9441'} stroke={KC.ink} strokeWidth={5} /></g>); }
  return <g>{arr}</g>;
}
// Corte de perfil del suelo de Yucatán: caliza, nivel del agua, conducto (río subterráneo), cueva/cenote, agua salada y mar.
function Perfil({ T, cueva = 1, colapso = 1, capas = 0, flujo = 1, mar = 0, sucio = 0, selva = true }) {
  const { G, W, H, B, C } = CE;
  const r = krng(11), poros = Array.from({ length: 70 }, () => [r() * 1080, G + 20 + r() * (B - G - 20), 4 + r() * 8]);
  const dulce = mixHex(CE_DULCE, '#8a7a3a', sucio);
  const tubo = 'M -40 880 C 160 850 260 910 420 880 S 700 850 860 885 S 1040 910 1120 880';
  const flechas = flujo > 0 ? Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.18 + i / 6) % 1); const x = -40 + u * 1160, y = 880 + Math.sin(u * 9) * 12;
    return <path key={i} d={`M ${x - 18} ${y - 14} L ${x + 6} ${y} L ${x - 18} ${y + 14}`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.9 * flujo} />; }) : null;
  const k = kEase.sale(kclamp(cueva, 0, 1)), rx = 175 * k, ry = 115 * k;
  const cae = kEase.suave(kprog(colapso, 0.35, 1)), abre = kprog(colapso, 0.55, 1), grieta = kprog(colapso, 0.02, 0.4);
  const hueco = `M ${C - 120} ${G} L ${C + 120} ${G} Q ${C + 150} ${W - 60} ${C + 175} ${W} L ${C - 175} ${W} Q ${C - 150} ${W - 60} ${C - 120} ${G} Z`;
  return <g>
    {/* caliza */}
    <rect x={-10} y={G} width={1100} height={B - G + 40} fill={CE_ROCA} stroke={KC.ink} strokeWidth={8} />
    {poros.map(([x, y, rr], i) => <ellipse key={i} cx={x} cy={y} rx={rr * 1.6} ry={rr} fill={CE_ROCA2} opacity={0.8} />)}
    {/* agua dulce (roca saturada) y agua salada debajo */}
    <rect x={-10} y={W} width={1100} height={B - W + 40} fill={dulce} opacity={0.55} />
    {capas > 0 && <path d={`M -10 ${H} ${Array.from({ length: 12 }, (_, i) => `Q ${i * 95 + 47} ${H + (i % 2 ? 14 : -14) + Math.sin(T * 2 + i) * 4} ${(i + 1) * 95} ${H}`).join(' ')} L 1100 ${B + 40} L -10 ${B + 40} Z`} fill={CE_SAL} opacity={0.85 * capas} stroke="#9fd8ff" strokeWidth={5} strokeOpacity={capas} />}
    <line x1={-10} y1={W} x2={1100} y2={W} stroke="#2a89c9" strokeWidth={5} strokeDasharray="18 12" />
    {/* conducto: el río que corre bajo tus pies */}
    <path d={tubo} stroke={KC.ink} strokeWidth={84} fill="none" />
    <path d={tubo} stroke={mixHex('#86dbff', '#9a8a48', sucio)} strokeWidth={70} fill="none" />
    {flechas}
    {/* cueva que crece */}
    {cueva > 0 && <g><ellipse cx={C} cy={W + 10} rx={rx} ry={ry} fill="#5a4a35" stroke={KC.ink} strokeWidth={7} />
      <path d={`M ${C - rx} ${W + 10} A ${rx} ${ry} 0 0 0 ${C + rx} ${W + 10} Z`} fill={mixHex('#86dbff', '#9a8a48', sucio)} />
      <line x1={C - rx * 0.98} y1={W + 10} x2={C + rx * 0.98} y2={W + 10} stroke="#2a89c9" strokeWidth={5} /></g>}
    {/* grietas y techo que se cae */}
    {grieta > 0 && cae < 1 && <g opacity={1 - abre}>
      <path d={`M ${C - 60} ${G} l 20 ${50 * grieta} l -15 ${40 * grieta} l 25 ${45 * grieta}`} stroke={KC.ink} strokeWidth={6} fill="none" />
      <path d={`M ${C + 70} ${G} l -18 ${55 * grieta} l 22 ${40 * grieta} l -20 ${40 * grieta}`} stroke={KC.ink} strokeWidth={6} fill="none" /></g>}
    {abre > 0 && <path d={hueco} fill="#bff3ff" opacity={abre} />}
    {abre > 0 && <path d={`M ${C - 175} ${W} L ${C + 175} ${W} L ${C + 175} ${W + 120} L ${C - 175} ${W + 120} Z`} fill={mixHex('#3ec9e0', '#8f8240', sucio)} opacity={abre} />}
    {abre > 0 && <path d={hueco} fill="none" stroke={KC.ink} strokeWidth={7} opacity={abre} />}
    {colapso > 0.3 && colapso < 1 && <g transform={`translate(0 ${cae * 230})`} opacity={1 - kprog(colapso, 0.75, 1)}>
      <path d={`M ${C - 120} ${G} L ${C + 120} ${G} L ${C + 110} ${W - 90} L ${C - 110} ${W - 90} Z`} fill={CE_ROCA} stroke={KC.ink} strokeWidth={7} /></g>}
    {abre > 0 && [[-90, 0], [-30, 10], [40, 4], [100, 12], [10, 30]].map(([dx, dy], i) => <ellipse key={i} cx={C + dx} cy={W + 95 + dy} rx={34} ry={20} fill={CE_ROCA2} stroke={KC.ink} strokeWidth={4} opacity={abre} />)}
    {/* mar a la derecha */}
    {mar > 0 && <g opacity={mar}><path d={`M 900 ${G} Q 960 ${G + 30} 1000 ${G + 40} L 1100 ${G + 40} L 1100 ${B + 40} L 900 ${B + 40} Z`} fill="#1f6fd0" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 3 }, (_, i) => <path key={i} d={`M ${930 + i * 50} ${G + 60 + i * 6} q 12 -10 24 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}</g>}
    {/* superficie */}
    <rect x={-10} y={G - 10} width={1100} height={14} fill="#6b8f3a" />
    {selva && <SelvaLado />}
  </g>;
}
// Cenote visto desde arriba, con selva alrededor. hoja: tiempo en que cae una hoja · red 0..1 dibuja lo de abajo (rayos X).
function CenoteArriba({ T, cx = 330, cy = 820, r = 210, hoja = 0, red = 0, seed = 7 }) {
  const rn = krng(seed), arboles = Array.from({ length: 34 }, () => { const a = rn() * Math.PI * 2, d = r + 70 + rn() * 420; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.9, 40 + rn() * 40]; });
  const borde = Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2, rr = r + 30 + Math.sin(i * 2.3) * 12; return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  const yh = klerp(cy - 520, cy - 30, kprog(T, hoja, hoja + 0.7, kEase.suave)), ond = T - hoja - 0.7;
  const id = 'ca' + seed;
  return <g>
    <defs><radialGradient id={id} cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#06476e" /><stop offset="70%" stopColor="#1aa6c4" /><stop offset="100%" stopColor="#47dde0" /></radialGradient></defs>
    {red > 0 && <g opacity={red}>
      {[[-1, 0.2], [1, -0.3], [0.6, 1], [-0.4, -1]].map(([dx, dy], i) => <line key={i} x1={cx} y1={cy} x2={cx + dx * 700} y2={cy + dy * 700} stroke="#1f6fd0" strokeWidth={34} strokeLinecap="round" opacity={0.55} strokeDasharray="40 18" strokeDashoffset={-T * 60} />)}
    </g>}
    {arboles.map(([x, y, rr], i) => <circle key={i} cx={x} cy={y} r={rr} fill={i % 3 ? CE_SELVA : '#2f9441'} stroke={KC.ink} strokeWidth={6} opacity={red > 0 ? 1 - red * 0.55 : 1} />)}
    <polygon points={borde} fill="#d8c08a" stroke={KC.ink} strokeWidth={8} />
    <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M ${cx - 120 + i * 60} ${cy - 60 + (i % 2) * 90} q 18 ${-8 + Math.sin(T * 2 + i) * 4} 36 0`} stroke="#bff7ff" strokeWidth={5} fill="none" opacity={0.8} />)}
    {ond > 0 && ond < 3 && [0, 0.5, 1].map((d, i) => { const u = ond - d; if (u <= 0) return null; return <circle key={i} cx={cx} cy={cy - 30} r={20 + u * 90} fill="none" stroke="#e8fdff" strokeWidth={6} opacity={Math.max(0, 1 - u / 2)} />; })}
    {T < hoja + 0.75 && <g transform={`translate(${cx + Math.sin(T * 5) * 40} ${yh}) rotate(${T * 160})`}><path d="M 0 -30 Q 26 0 0 30 Q -26 0 0 -30 Z" fill="#7cc46a" stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={-28} x2={0} y2={28} stroke={KC.ink} strokeWidth={3} /></g>}
  </g>;
}
// Casita de lado (base en y).
function Casa({ x, y, s = 1, color = '#ff8a1f' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-90} width={120} height={90} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -76 -86 L 0 -150 L 76 -86 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-18} y={-50} width={36} height={50} fill="#7a5230" stroke={KC.ink} strokeWidth={5} />
    <rect x={26} y={-70} width={24} height={24} fill="#bff3ff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Fosa séptica (caja bajo tierra con tapa) que gotea al subsuelo.
function Fosa({ T, x, y, desde = 0, hasta = 999, fin = CE.W, tachada = 0 }) {
  return <g>
    <rect x={x - 45} y={y} width={90} height={70} rx={8} fill="#8a6a3a" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 30} y={y - 10} width={60} height={14} rx={4} fill="#b0a08a" stroke={KC.ink} strokeWidth={4} />
    {T < hasta + 0.6 && <Goteo T={T} x={x} y0={y + 80} y1={fin} cada={0.35} desde={desde} hasta={hasta} color="#7a4a22" r={10} />}
    {tachada > 0 && <g opacity={tachada} stroke={KC.red} strokeWidth={12} strokeLinecap="round"><line x1={x - 50} y1={y - 15} x2={x + 50} y2={y + 85} /><line x1={x + 50} y1={y - 15} x2={x - 50} y2={y + 85} /></g>}
  </g>;
}
// Granja de cerdos: nave con techo de lámina y un cerdito.
function Granja({ T, x, y }) {
  const b = Math.sin(T * 6) * 3;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-100} y={-80} width={200} height={80} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    <path d="M -115 -76 L 0 -130 L 115 -76 Z" fill="#9aa7b3" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-60, -20, 20, 60].map((dx) => <line key={dx} x1={dx} y1={-118 + Math.abs(dx) * 0.4} x2={dx} y2={-78} stroke={KC.ink} strokeWidth={3} />)}
    <g transform={`translate(-150 ${-28 + b})`}>
      <ellipse rx={44} ry={28} fill="#ffb3c7" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-42} cy={-6} r={20} fill="#ffb3c7" stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={-58} cy={-4} rx={8} ry={10} fill="#ff8fb0" stroke={KC.ink} strokeWidth={3} />
      <circle cx={-40} cy={-14} r={3.5} fill={KC.ink} />
      <path d="M -36 -26 l 6 -14 l 8 12" fill="#ffb3c7" stroke={KC.ink} strokeWidth={4} />
      {[-24, 0, 20].map((dx) => <rect key={dx} x={dx - 5} y={20} width={10} height={16} fill="#ffb3c7" stroke={KC.ink} strokeWidth={3} />)}
      <path d="M 44 -6 q 14 -10 6 -18" stroke={KC.ink} strokeWidth={4} fill="none" />
    </g>
  </g>;
}
// Molécula de CO2 (O=C=O).
function CO2({ x, y, rot = 0, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={-44} y1={0} x2={44} y2={0} stroke={KC.ink} strokeWidth={10} />
    <Atomo x={-48} y={0} r={26} color="#ff4b4b" letra="O" /><Atomo x={0} y={0} r={28} color="#555c66" letra="C" /><Atomo x={48} y={0} r={26} color="#ff4b4b" letra="O" />
  </g>;
}
// Frasco de muestra; sucio 0..1 lo llena de bacterias.
function Frasco({ T, x, y, sucio = 0, s = 1, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-34} y={-90} width={68} height={100} rx={12} fill="rgba(220,245,255,.9)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-28} y={-50} width={56} height={54} rx={8} fill="#7fd3f7" />
    <rect x={-24} y={-112} width={48} height={24} rx={5} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    {sucio > 0 && [[-12, -30, 20], [10, -18, -30], [-4, -8, 60]].map(([bx, by, rot], i) => <Bacteria key={i} x={bx} y={by} rot={rot} s={0.22 * sucio} color="#8bd450" T={T} seed={seed + i} flagelo={false} />)}
  </g>;
}
// Persona sencilla (científica) que se agacha a llenar un frasco.
function Cientifica({ T, x, y, s = 1 }) {
  const b = Math.sin(T * 3) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-120} width={60} height={90} rx={18} fill="#ffffff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-150} r={30} fill="#c98b5e" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 -165 Q 0 -200 30 -165 Z" fill="#3b2a1d" />
    <rect x={-22} y={-160} width={44} height={14} rx={6} fill="rgba(180,230,255,.8)" stroke={KC.ink} strokeWidth={3} />
    <line x1={-16} y1={-32} x2={-22} y2={0} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><line x1={16} y1={-32} x2={22} y2={0} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={26} y1={-100} x2={70} y2={-50 + b} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <Frasco T={T} x={78} y={-10 + b} s={0.45} />
  </g>;
}
// Planta de tratamiento: edificio con dos tanques redondos.
function PlantaTrat({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-110} width={110} height={110} fill="#cfe3f0" stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={-90} width={30} height={26} fill="#bff3ff" stroke={KC.ink} strokeWidth={4} /><rect x={-30} y={-90} width={30} height={26} fill="#bff3ff" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={70} cy={-30} rx={56} ry={22} fill="#2fe0a8" stroke={KC.ink} strokeWidth={6} />
    <path d="M 14 -30 L 14 0 L 126 0 L 126 -30" fill="#b0bcc6" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Mapa esquemático de la Península de Yucatán (recorte del mapa de México del kit).
function MapaPeninsula({ children }) {
  return <g transform="translate(-3130 -1079)"><MapaMexico x={0} y={0} ancho={5300} color="#f3e3a6" centro="#cfe8b8" conCA={true}>{null}</MapaMexico><g transform="translate(3130 1079)">{children}</g></g>;
}

function CenotesShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.SinRios, A: CUES.Acido, Cu: CUES.Cueva, Ca: CUES.Capas, U: CUES.Unica, P: CUES.Pregunta, F: CUES.Fosas, E: CUES.Estudio, Pl: CUES.Planta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: vista de arriba → corte (la ventana)
  const corteG = kprog(T, K.G + 2.3, K.G + 3.1, kEase.suave);
  // ácido: la gota cae a la caliza y la disuelve
  const caeA = kprog(T, K.A + 2.3, K.A + 2.8, kEase.suave), hoyoA = kprog(T, K.A + 2.8, K.A + 4.2, kEase.sale);
  const acida = kprog(T, K.A + 0.4, K.A + 2.0);
  // estudio
  const cen = Array.from({ length: 10 }, (_, i) => [250 + (i % 5) * 175, 760 + Math.floor(i / 5) * 210]);
  // planta: medidor de bloqueador en el pozo de la playa
  const bloq = klerp(0.88, 0.18, kprog(T, K.Pl + 6.0, K.Pl + 7.6, kEase.suave));
  const tubo = kprog(T, K.Pl + 5.4, K.Pl + 6.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cenote desde arriba y la ventana al río de abajo */}
      <Escena T={T} a={K.G} b={K.S}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', inset:0, opacity:1 - corteG }}>
          <FondoLunares color="#5fc86a" punto="rgba(255,255,255,.18)" />
          {svg(<CenoteArriba T={T} hoja={K.G + 0.05} />)}
        </div>
        <div style={{ position:'absolute', inset:0, opacity:corteG }}>
          {svg(<><Perfil T={T} />
            <g transform={`translate(495 ${CE.G - 4})`}><circle cx={0} cy={-118} r={22} fill="#c98b5e" stroke={KC.ink} strokeWidth={5} /><rect x={-20} y={-96} width={40} height={60} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={5} /><line x1={-10} y1={-38} x2={-12} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" /><line x1={10} y1={-38} x2={12} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" /></g></>)}
          <Etq T={T} at={K.G + 3.0} until={K.S - 0.2} x={470} y={CE.G - 150} texto="tú" lado="izq" tam={34} color={KC.ink} />
          <Etq T={T} at={K.G + 3.3} until={K.S - 0.2} x={640} y={930} texto="río subterráneo" tam={30} color={KC.texto} />
        </div>
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 1 · casi sin ríos en la superficie: la lluvia se mete en la piedra */}
      <Escena T={T} a={K.S} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaPeninsula>
          <path d="M 300 640 C 360 600 420 680 480 640 S 590 690 650 650" stroke="#1f6fd0" strokeWidth={14} fill="none" strokeLinecap="round" opacity={kprog(T, K.S + 0.4, K.S + 0.9)} />
          <g stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.S + 1.3, K.S + 1.6)}><line x1={420} y1={590} x2={530} y2={700} /><line x1={530} y1={590} x2={420} y2={700} /></g>
          <g transform="translate(560 380)" opacity={kprog(T, K.S + 2.6, K.S + 3.0)}><ellipse rx={150} ry={56} fill="#e6edf5" stroke={KC.ink} strokeWidth={6} /><ellipse cx={-70} cy={-30} rx={70} ry={50} fill="#e6edf5" stroke={KC.ink} strokeWidth={6} /><ellipse cx={-70} cy={-30} rx={66} ry={46} fill="#e6edf5" /></g>
          {[460, 520, 580, 640].map((x, i) => <Goteo key={i} T={T} x={x} y0={440} y1={760 + (i % 2) * 40} cada={0.45} desde={K.S + 3.0 + i * 0.1} hasta={K.A} color="#2f8fd8" r={10} />)}
          {T > K.S + 3.5 && [480, 560, 620].map((x, i) => { const u = ((T - K.S - 3.5 + i * 0.3) % 0.9) / 0.9; return <ellipse key={i} cx={x} cy={790} rx={10 + u * 30} ry={(10 + u * 30) * 0.4} fill="none" stroke="#1f6fd0" strokeWidth={4} opacity={1 - u} />; })}
          <text x={460} y={880} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Península de Yucatán</text>
        </MapaPeninsula>)}
        <Chip T={T} at={K.S + 1.5} until={K.A - 0.2} texto="casi toda la península: sin ríos en la superficie" y={1460} tam={28} borde={KC.ink} />
        <EscalaFija texto="mapa esquemático" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 2 · la lluvia con CO2 se vuelve un poquito ácida y disuelve la caliza (escena micro: fondo oscuro) */}
      <Escena T={T} a={K.A} b={K.Cu}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }} />
        {svg(<>
          <rect x={80} y={930} width={920} height={210} rx={20} fill={CE_ROCA} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={120 + (i * 61) % 860} cy={970 + (i * 37) % 140} rx={14} ry={8} fill={CE_ROCA2} />)}
          {hoyoA > 0 && <path d={`M ${420 - 150 * hoyoA} 930 Q 420 ${930 + 190 * hoyoA} ${420 + 150 * hoyoA} 930 Z`} fill={KC.noche} stroke={KC.ink} strokeWidth={6} />}
          {hoyoA > 0 && hoyoA < 1 && [0, 1, 2, 3].map((i) => <circle key={i} cx={380 + i * 28} cy={930 + 60 * hoyoA - ((T * 140 + i * 30) % 80)} r={8} fill="none" stroke="#bfe7ff" strokeWidth={4} />)}
          <g transform={`translate(420 ${klerp(640, 900, caeA)}) scale(${1 - 0.55 * caeA})`} opacity={1 - hoyoA}>
            <path d="M 0 -190 Q 150 0 140 70 Q 120 180 0 180 Q -120 180 -140 70 Q -150 0 0 -190 Z" fill={mixHex('#7fd3f7', '#b7e86a', acida * 0.55)} stroke={KC.ink} strokeWidth={8} opacity={0.95} />
            <ellipse cx={-50} cy={20} rx={22} ry={40} fill="#fff" opacity={0.5} />
          </g>
          {[[-1, 140, 460], [-1, 120, 820], [1, 760, 860]].map(([d, x0, y0], i) => { const u = kprog(T, K.A + 0.3 + i * 0.45, K.A + 1.6 + i * 0.45, kEase.suave);
            return <CO2 key={i} x={klerp(x0, 420 + (i - 1) * 50, u)} y={klerp(y0, 640 + (i - 1) * 60, u)} rot={T * 60 + i * 50} s={0.8 * (1 - 0.4 * u)} o={caeA > 0 ? 1 - caeA : 1} />; })}
        </>)}
        <Etq T={T} at={K.A + 0.5} until={K.A + 2.2} x={250} y={420} texto="CO₂" tam={40} color={KC.texto} />
        <Chip T={T} at={K.A + 1.0} until={K.Cu - 0.2} texto="agua + CO₂ → un poquito ácida" y={1460} tam={32} borde={KC.cyan} />
        <Etq T={T} at={K.A + 2.6} until={K.Cu - 0.2} x={600} y={1100} texto="caliza (CaCO₃)" tam={28} color={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.texto} />
      </Escena>
      {/* 3 · se forma una cueva; se derrumba el techo y nace el cenote */}
      <Escena T={T} a={K.Cu} b={K.Ca}>
        <FondoLunares color={KC.cyan} />
        {svg(<Perfil T={T} cueva={kprog(T, K.Cu + 0.2, K.Cu + 2.0)} colapso={kprog(T, K.Cu + 2.4, K.Cu + 3.6)} flujo={0.5} />)}
        <Etq T={T} at={K.Cu + 1.0} until={K.Cu + 2.5} x={540} y={CE.W - 60} texto="cueva" tam={34} color={KC.texto} />
        <Etq T={T} at={K.Cu + 3.6} until={K.Ca - 0.2} x={500} y={CE.G + 60} texto="cenote" tam={40} color={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 4 · agua dulce que flota sobre agua salada del mar */}
      <Escena T={T} a={K.Ca} b={K.U}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Perfil T={T} capas={kprog(T, K.Ca + 0.3, K.Ca + 1.3)} mar={kprog(T, K.Ca + 0.6, K.Ca + 1.2)} />
          <g opacity={kprog(T, K.Ca + 1.4, K.Ca + 1.8)}><path d={`M 1000 1040 L 800 1040`} stroke="#fff" strokeWidth={10} strokeLinecap="round" /><path d="M 830 1018 L 796 1040 L 830 1062" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" /></g></>)}
        <Etq T={T} at={K.Ca + 0.5} until={K.U - 0.2} x={560} y={940} texto="agua dulce" tam={32} color={KC.texto} />
        <Etq T={T} at={K.Ca + 1.2} until={K.U - 0.2} x={80} y={1050} texto="agua salada (del mar)" tam={30} color={KC.texto} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 5 · la única fuente de agua potable */}
      <Escena T={T} a={K.U} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<><Perfil T={T} capas={1} mar={1} />
          <rect x={600} y={klerp(CE.G, 920, kprog(T, K.U + 0.2, K.U + 0.8))} width={22} height={920 - klerp(CE.G, 920, kprog(T, K.U + 0.2, K.U + 0.8))} fill="#9aa7b3" stroke={KC.ink} strokeWidth={5} />
          <Casa x={560} y={CE.G - 4} s={0.9} />
          <path d="M 620 520 L 680 520 L 680 545" stroke="#9aa7b3" strokeWidth={14} fill="none" />
          <Goteo T={T} x={680} y0={555} y1={630} cada={0.4} desde={K.U + 0.9} hasta={K.P} color="#2f8fd8" r={9} /></>)}
        <Chip T={T} at={K.U + 0.8} until={K.P - 0.2} texto="la única fuente de agua potable de la región" y={1460} tam={28} borde={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.F} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <g transform="translate(290 1080)"><rect x={-200} y={0} width={400} height={16} fill="#6b8f3a" stroke={KC.ink} strokeWidth={4} /><path d={`M 0 ${30 + ((T * 60) % 40)} l 0 50 m -22 -22 l 22 22 l 22 -22`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" /></g></>)}
      </Escena>
      {/* 7 · fosas sépticas, granjas y lluvia que baja en horas o días */}
      <Escena T={T} a={K.F} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Perfil T={T} capas={1} sucio={0.55 * kprog(T, K.F + 1.0, K.F + 6.5)} />
          <Casa x={600} y={CE.G - 4} s={0.85} />
          <Fosa T={T} x={600} y={CE.G + 40} desde={K.F + 0.4} hasta={K.E} />
          {T > K.F + 2.4 && <g opacity={kprog(T, K.F + 2.4, K.F + 2.8)}><Granja T={T} x={900} y={CE.G - 4} />
            <path d="M 880 648 l 14 50 l -16 40 l 20 50" stroke="#7a4a22" strokeWidth={7} fill="none" />
            <Goteo T={T} x={892} y0={CE.G + 20} y1={CE.W} cada={0.4} desde={K.F + 2.8} hasta={K.E} color="#7a4a22" r={10} /></g>}
          {T > K.F + 4.3 && <g opacity={kprog(T, K.F + 4.3, K.F + 4.7)}><g transform="translate(560 400)"><ellipse rx={170} ry={58} fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} /></g>
            {[440, 520, 600, 680].map((x, i) => <Goteo key={i} T={T} x={x} y0={470} y1={CE.W} cada={0.32} desde={K.F + 4.5 + i * 0.07} hasta={K.E} color="#2f8fd8" r={9} />)}</g>}</>)}
        <Etq T={T} at={K.F + 0.5} until={K.E - 0.2} x={660} y={CE.G + 75} texto="fosa séptica" tam={28} color={KC.ink} />
        <Etq T={T} at={K.F + 2.8} until={K.E - 0.2} x={1040} y={465} texto="granja de cerdos" lado="izq" tam={28} color={KC.ink} />
        <Chip T={T} at={K.F + 4.8} until={K.E - 0.2} texto="la lluvia baja en horas o días" y={1460} tam={32} borde={KC.red} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 8 · el estudio: 10 cenotes de la Riviera Maya, sept 2022 */}
      <Escena T={T} a={K.E} b={K.Pl}>
        <FondoLunares color={KC.mint} />
        {svg(<>{cen.map(([x, y], i) => { const ap = kprog(T, K.E + 0.4 + i * 0.12, K.E + 0.8 + i * 0.12, kEase.rebote);
          const suc = i === 7 ? 0 : kprog(T, K.E + 4.2 + i * 0.1, K.E + 4.6 + i * 0.1);
          return <g key={i} transform={`translate(${x} ${y}) scale(${ap})`}>
            <circle r={70} fill="#d8c08a" stroke={KC.ink} strokeWidth={6} /><circle r={54} fill="#1aa6c4" stroke={KC.ink} strokeWidth={5} />
            <Frasco T={T} x={58} y={20} s={0.62} sucio={suc} seed={i} />
            {i === 7 && T > K.E + 5.0 && <path d="M 30 -60 l 18 18 l 34 -40" stroke={KC.leaf} strokeWidth={12} fill="none" strokeLinecap="round" />}
          </g>; })}
          <g opacity={kprog(T, K.E + 0.3, K.E + 0.8)}><Cientifica T={T} x={70} y={1070} s={0.8} /></g></>)}
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="sept 2022" quien="UNAM + Texas A&M" revista="10 cenotes · Riviera Maya" x={540} y={440} />
        <Chip T={T} at={K.E + 4.5} until={K.Pl - 0.2} texto="9 de 10 cenotes: bacterias fecales" y={1460} tam={32} borde={KC.red} />
        <Etq T={T} at={K.E + 1.2} until={K.Pl - 0.2} x={150} y={1110} texto="muestras desde la orilla" tam={24} color={KC.ink} />
        <EscalaFija texto="esquema" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 9 · Puerto Morelos: de fosas a planta de tratamiento; el pozo junto a la playa con menos bloqueador */}
      <Escena T={T} a={K.Pl} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={-10} y={1060} width={1100} height={150} fill={CE_DULCE} opacity={0.6} />
          <rect x={-10} y={900} width={760} height={160} fill="#f3d58a" stroke={KC.ink} strokeWidth={6} />
          <path d="M 740 900 Q 800 940 1100 930 L 1100 1210 L 740 1210 Z" fill="#1f6fd0" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M ${800 + i * 70} ${960 + (i % 2) * 30} q 14 ${-10 + Math.sin(T * 3 + i) * 4} 28 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
          <PlantaTrat x={170} y={898} s={1} />
          <Casa x={380} y={898} s={0.8} color="#ff6b5a" /><Casa x={510} y={898} s={0.8} color={KC.lilac} />
          <Fosa T={T} x={380} y={935} desde={K.Pl + 0.3} hasta={K.Pl + 5.6} fin={1080} tachada={kprog(T, K.Pl + 5.4, K.Pl + 5.8)} />
          <Fosa T={T} x={510} y={935} desde={K.Pl + 0.5} hasta={K.Pl + 5.6} fin={1080} tachada={kprog(T, K.Pl + 5.4, K.Pl + 5.8)} />
          {tubo > 0 && <path d="M 540 915 L 260 915" stroke={KC.ink} strokeWidth={22} fill="none" strokeDasharray={`${280 * tubo} 400`} />}
          {tubo > 0 && <path d="M 540 915 L 260 915" stroke="#9aa7b3" strokeWidth={12} fill="none" strokeDasharray={`${280 * tubo} 400`} />}
          {/* pozo junto a la playa con su medidor de bloqueador solar */}
          <g opacity={kprog(T, K.Pl + 2.2, K.Pl + 2.7)}>
            <rect x={640} y={860} width={26} height={240} fill="#9aa7b3" stroke={KC.ink} strokeWidth={5} />
            <rect x={622} y={846} width={62} height={26} rx={6} fill="#555c66" stroke={KC.ink} strokeWidth={5} />
            <g transform="translate(653 800)">
              <rect x={-60} y={-340} width={120} height={340} rx={18} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
              <rect x={-50} y={-10 - 320 * bloq} width={100} height={320 * bloq} rx={12} fill={KC.orange} />
              <g transform="translate(0 -390)"><rect x={-26} y={-40} width={52} height={70} rx={12} fill={KC.orange} stroke={KC.ink} strokeWidth={5} /><rect x={-12} y={-60} width={24} height={22} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={4} /><text y={10} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>FPS</text></g>
            </g></g>
        </>)}
        <Etq T={T} at={K.Pl + 2.6} until={K.C - 0.2} x={560} y={560} texto="bloqueador solar" lado="izq" tam={28} color={KC.ink} />
        <Chip T={T} at={K.Pl + 2.4} until={K.C - 0.2} texto="un pozo junto a la playa · Puerto Morelos · 2021" y={1460} tam={26} borde={KC.ink} />
        <Etq T={T} at={K.Pl + 5.8} until={K.C - 0.2} x={60} y={740} texto="planta de tratamiento" tam={26} color={KC.ink} />
        <Chip T={T} at={K.Pl + 0.3} until={K.Pl + 2.2} texto="lo bueno" x={300} y={440} tam={44} borde={KC.leaf} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: el mismo cenote del inicio, ahora con lo de abajo a la vista */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color="#5fc86a" punto="rgba(255,255,255,.18)" />
        {svg(<CenoteArriba T={T} hoja={K.C - 0.4} red={kprog(T, K.C + 0.6, K.C + 2.2)} />)}
        <Chip T={T} at={K.C + 1.6} until={K.Ou - 0.1} texto="una ventana al agua de la península" y={1460} tam={32} borde={KC.cyan} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1650} color={KC.ink} />
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.S - 0.1} texto="No es un estanque: *es una ventana.*" />
      <Subtitulo T={T} idx={1} at={K.S + 0.1} until={K.A - 0.1} texto="Sin ríos: *la lluvia se mete en la piedra.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Cu - 0.1} texto="Un poquito ácida: *disuelve la caliza.*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.Ca - 0.1} texto="Se cae el techo: *nace un cenote.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.U - 0.1} texto="Agua dulce *sobre agua salada.*" />
      <Subtitulo T={T} idx={5} at={K.U + 0.1} until={K.P - 0.1} texto="*La única fuente* de agua potable." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.F - 0.1} texto="¿Y lo que se tira *arriba?*" />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.E - 0.1} texto="Fosas y granjas: *baja en horas o días.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Pl - 0.1} texto="9 de 10 cenotes: *bacterias fecales.*" />
      <Subtitulo T={T} idx={9} at={K.Pl + 0.1} until={K.C - 0.1} texto="Planta de tratamiento: *mucho menos bloqueador.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una ventana *al agua de la península.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Acido + 0.6, CUES.Cueva - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Capas + 0.3, CUES.Unica + 3.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Fosas + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Fosas + 3.0, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 3.6, CUES.Planta + 0.6, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Planta + 6.0, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="57" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CenotesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CenotesShot /></CompositionStage></div>;
}
window.CenotesApp = CenotesApp;
