// Shot Fungi Mati #113 · Ese hongo blanco de tu jardín no es champiñón — NARRADO (formato N1 «Por dentro», gancho 1 «Esto no es X: es Y»).
// Chlorophyllum molybdites (parasol de esporas verdes). Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// No es guía de identificación: el mensaje es «no basta un rasgo; ante la duda, no lo comas».

const CM = { blanco:'#f7f3ea', crema:'#efe6d2', escama:'#a0714a', escama2:'#7a5034', centro:'#8a5a3a', pie:'#f1ece0', pieSombra:'#d8cfbd',
  lamBlanca:'#f4efe0', lamVerde:'#7fa56a', lamVerde2:'#5d8a4e', espora:'#8fc27a', espora2:'#4f8a45', pasto:'#3fae4a', pasto2:'#2f8f3c', tierra:'#5b3a22',
  procera:'#e6d6b8', procEscama:'#6e4a2e', agaricus:'#f1e6d0' };

// Parasol de esporas verdes de perfil. Base del pie en (x, y). crece 0..1 (sale del pasto), abre 0..1 (botón → sombrero plano),
// verde 0..1 (láminas blancas → verdosas al madurar). Morfología (UF/IFAS PP324): sombrero ancho blanco con centro café y escamas
// café canela, láminas libres (no tocan el pie), anillo grueso en el pie, pie largo con la base un poco engrosada.
function Molybdites({ T = 0, x, y, s = 1, crece = 1, abre = 1, verde = 0, rot = 0, sombra = true }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1)), a = kclamp(abre, 0, 1);
  const H = klerp(40, 330, c) * klerp(0.55, 1, a), R = klerp(30, 210, c) * klerp(0.42, 1, a), hc = R * klerp(1.15, 0.36, a);
  const yC = -H, wP = klerp(16, 30, c);
  const lam = mixHex(CM.lamBlanca, CM.lamVerde, kclamp(verde, 0, 1)), lamL = mixHex('#d9d2bf', CM.lamVerde2, kclamp(verde, 0, 1));
  const tapa = mixHex('#c9a27a', CM.blanco, kclamp(a * 1.4 - 0.1, 0, 1));
  const esc = [];
  if (a > 0.15) for (let k = 0; k < 4; k++) { const n = 5 + k * 2; for (let i = 0; i < n; i++) { const u = (-1 + (i + 0.5) * 2 / n) * (0.25 + k * 0.22); const v = 1 - u * u;
    esc.push([u * R * 0.98, yC - hc * Math.pow(Math.max(0, v), 0.75) * 0.96 + 4, 10 + (3 - k) * 3]); } }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {sombra && <ellipse cx={0} cy={4} rx={R * 0.75} ry={12} fill="rgba(0,0,0,.18)" />}
    {/* pie con base engrosada */}
    <path d={`M ${-wP * 1.35} 0 Q ${-wP * 1.5} ${-14} ${-wP * 0.95} ${-H * 0.2} L ${-wP * 0.75} ${yC + 6} L ${wP * 0.75} ${yC + 6} L ${wP * 0.95} ${-H * 0.2} Q ${wP * 1.5} ${-14} ${wP * 1.35} 0 Z`} fill={CM.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${wP * 0.35} ${-10} L ${wP * 0.3} ${yC + 20}`} stroke={CM.pieSombra} strokeWidth={8} strokeLinecap="round" />
    {/* láminas libres: banda bajo el sombrero que no toca el pie */}
    {a > 0.2 && <g opacity={kprog(a, 0.2, 0.45)}>
      <path d={`M ${-R * 0.94} ${yC} Q ${-R * 0.5} ${yC + R * 0.16} ${-wP * 1.6} ${yC + R * 0.1} L ${-wP * 1.6} ${yC} Z`} fill={lam} stroke={KC.ink} strokeWidth={4} />
      <path d={`M ${R * 0.94} ${yC} Q ${R * 0.5} ${yC + R * 0.16} ${wP * 1.6} ${yC + R * 0.1} L ${wP * 1.6} ${yC} Z`} fill={lam} stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 14 }, (_, i) => { const u = (i + 0.5) / 14, xx = klerp(wP * 1.9, R * 0.9, u); const yy = yC + R * 0.1 * (1 - u * u * 0.6);
        return <g key={i}><line x1={xx} y1={yC + 2} x2={xx} y2={yy} stroke={lamL} strokeWidth={3} /><line x1={-xx} y1={yC + 2} x2={-xx} y2={yy} stroke={lamL} strokeWidth={3} /></g>; })}
    </g>}
    {/* anillo grueso */}
    {a > 0.35 && <g opacity={kprog(a, 0.35, 0.6)}>
      <path d={`M ${-wP * 1.9} ${yC + H * 0.16} Q 0 ${yC + H * 0.16 + 22} ${wP * 1.9} ${yC + H * 0.16} L ${wP * 1.3} ${yC + H * 0.16 - 18} Q 0 ${yC + H * 0.16 - 8} ${-wP * 1.3} ${yC + H * 0.16 - 18} Z`} fill={CM.blanco} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M ${-wP * 1.8} ${yC + H * 0.16 + 2} Q 0 ${yC + H * 0.16 + 22} ${wP * 1.8} ${yC + H * 0.16 + 2}`} stroke={CM.escama} strokeWidth={4} fill="none" />
    </g>}
    {/* sombrero */}
    <path d={`M ${-R} ${yC} C ${-R} ${yC - hc * 1.32}, ${R} ${yC - hc * 1.32}, ${R} ${yC} Q 0 ${yC + hc * 0.1} ${-R} ${yC} Z`} fill={tapa} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {a > 0.15 && <path d={`M ${-R * 0.3} ${yC - hc * 0.9} C ${-R * 0.26} ${yC - hc * 1.08}, ${R * 0.26} ${yC - hc * 1.08}, ${R * 0.3} ${yC - hc * 0.9} Q 0 ${yC - hc * 0.84} ${-R * 0.3} ${yC - hc * 0.9} Z`} fill={CM.centro} opacity={kprog(a, 0.15, 0.5)} />}
    {esc.map(([ex, ey, r], i) => <ellipse key={i} cx={ex} cy={ey} rx={r} ry={r * 0.55} fill={i % 3 ? CM.escama : CM.escama2} opacity={kprog(a, 0.15, 0.5) * 0.9} transform={`rotate(${ex / R * 18} ${ex} ${ey})`} />)}
    <path d={`M ${-R * 0.62} ${yC - hc * 0.62} Q ${-R * 0.3} ${yC - hc * 0.98} ${R * 0.05} ${yC - hc * 0.96}`} stroke="#fff" strokeWidth={9} fill="none" opacity=".5" strokeLinecap="round" />
  </g>;
}
// Parasol comestible (Macrolepiota procera) de perfil: pie muy largo y delgado con bandas como piel de víbora, sombrero beige
// con centro oscuro y escamas café, anillo. Base en (x, y).
function Procera({ x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1)), H = 460 * c, R = 190 * c, hc = R * 0.33, yC = -H;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -26 0 Q -30 -16 -14 -40 L -10 ${yC + 4} L 10 ${yC + 4} L 14 -40 Q 30 -16 26 0 Z`} fill={CM.procera} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -12 ${-60 - i * H * 0.08} l 8 -10 l 8 10 l 8 -10`} stroke={CM.procEscama} strokeWidth={5} fill="none" opacity={c} />)}
    <path d={`M -34 ${yC + H * 0.14} Q 0 ${yC + H * 0.14 + 16} 34 ${yC + H * 0.14} L 22 ${yC + H * 0.14 - 14} L -22 ${yC + H * 0.14 - 14} Z`} fill={CM.procera} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-R * 0.94} ${yC} Q 0 ${yC + R * 0.14} ${R * 0.94} ${yC}`} fill={CM.blanco} stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${-R} ${yC} C ${-R} ${yC - hc * 1.3}, ${R} ${yC - hc * 1.3}, ${R} ${yC} Q 0 ${yC + hc * 0.1} ${-R} ${yC} Z`} fill={CM.procera} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={yC - hc * 0.95} rx={R * 0.18} ry={hc * 0.2} fill={CM.procEscama} />
    {Array.from({ length: 14 }, (_, i) => { const u = -0.85 + (i % 7) * 0.28 + (i > 6 ? 0.14 : 0), v = Math.max(0, 1 - u * u); return <ellipse key={i} cx={u * R} cy={yC - hc * Math.pow(v, 0.75) * 0.95 + (i > 6 ? 10 : 2)} rx={9} ry={5} fill={CM.procEscama} />; })}
  </g>;
}
// Debajo del sombrero (vista desde abajo): láminas radiales libres alrededor del pie. verde 0..1; gris 0..1 (estéril).
function Debajo({ x, y, R = 300, verde = 0, gris = 0, p = 1, rot = 0 }) {
  const col = mixHex(mixHex(CM.lamBlanca, CM.lamVerde, verde), '#9a968c', gris), linea = mixHex(mixHex('#d6cfbb', CM.lamVerde2, verde), '#6f6b63', gris);
  const n = 72;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
    <circle r={R} fill={CM.blanco} stroke={KC.ink} strokeWidth={8} />
    <circle r={R * 0.93} fill={col} />
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, r0 = i % 2 ? R * 0.55 : R * 0.2; return <line key={i} x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * R * 0.92} y2={Math.sin(a) * R * 0.92} stroke={linea} strokeWidth={3} />; })}
    <circle r={R * 0.17} fill={col} stroke={linea} strokeWidth={3} />
    <circle r={R * 0.11} fill={CM.pie} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Espora elipsoide verde con poro en la punta (8–13 × 6–8 µm). Centro (x, y), largo L px.
function Espora({ x, y, L = 90, rot = 0, o = 1, color = CM.espora }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <ellipse rx={L / 2} ry={L * 0.33} fill={color} stroke={CM.espora2} strokeWidth={5} />
    <ellipse cx={-L * 0.12} cy={-L * 0.1} rx={L * 0.16} ry={L * 0.07} fill="#fff" opacity=".45" />
    <path d={`M ${L / 2 - 4} -${L * 0.08} Q ${L / 2 + 6} 0 ${L / 2 - 4} ${L * 0.08}`} stroke="#e9f7df" strokeWidth={6} fill="none" />
  </g>;
}
// Pasto: franja verde con hojitas en el borde. Superficie en y = sup.
function Pasto({ T, sup = 1150, color = CM.pasto, seed = 7 }) {
  const r = krng(seed), hojas = Array.from({ length: 90 }, (_, i) => [i * 12.2 + r() * 8, 18 + r() * 26, r() * 2 - 1]);
  return <g>
    <rect x={0} y={sup} width={KW} height={KH - sup} fill={color} />
    <rect x={0} y={sup + 90} width={KW} height={KH - sup} fill={CM.pasto2} opacity=".5" />
    {hojas.map(([hx, h, k], i) => { const m = mece(T, i, 0.6) * 4; return <path key={i} d={`M ${hx - 5} ${sup + 4} Q ${hx + k * 6 + m} ${sup - h * 0.6} ${hx + k * 10 + m} ${sup - h} Q ${hx + 3} ${sup - h * 0.4} ${hx + 5} ${sup + 4} Z`} fill={i % 3 ? color : CM.pasto2} />; })}
  </g>;
}
// Anillo de hadas en perspectiva: hongos chiquitos alrededor de una elipse. p 0..1 = cuántos ya salieron.
const ANILLO = Array.from({ length: 13 }, (_, i) => { const a = i / 13 * Math.PI * 2 + 0.3; return [Math.cos(a), Math.sin(a)]; }).sort((p, q) => p[1] - q[1]);
function AnilloHadas({ T, cx, cy, rx = 380, ry = 80, p = 1, s = 0.42, verde = 0, desde = 0 }) {
  return <g>{ANILLO.map(([u, v], i) => { const c = kclamp(p * 13 - i * 0.7, 0, 1); const k = s * (0.75 + 0.25 * (v + 1) / 2);
    return <Molybdites key={i} T={T} x={cx + u * rx} y={cy + v * ry} s={k} crece={c} abre={0.55 + 0.45 * c} verde={verde} rot={mece(T, i + 4, 0.3) * 2} />; })}</g>;
}
// Letrero de madera clavado en el pasto.
function Letrero({ x, y, s = 1, texto = 'NO SE COME', p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <rect x={-10} y={-200} width={20} height={200} fill="#8a5a2b" stroke={KC.ink} strokeWidth={5} />
    <rect x={-150} y={-290} width={300} height={110} rx={12} fill="#d9a86a" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-218} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.red}>{texto}</text>
  </g>;
}
// Reloj con el sector «de media hora a unas horas» que se colorea.
function Reloj({ T, x, y, r = 170, p = 1 }) {
  const ang = (h) => -Math.PI / 2 + h / 12 * Math.PI * 2, A = 0.5, B = klerp(0.5, 5, p);
  const sector = `M 0 0 L ${Math.cos(ang(A)) * r * 0.86} ${Math.sin(ang(A)) * r * 0.86} A ${r * 0.86} ${r * 0.86} 0 ${B - A > 6 ? 1 : 0} 1 ${Math.cos(ang(B)) * r * 0.86} ${Math.sin(ang(B)) * r * 0.86} Z`;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    {p > 0 && <path d={sector} fill={KC.red} opacity=".35" />}
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={Math.cos(ang(i)) * r * 0.78} y1={Math.sin(ang(i)) * r * 0.78} x2={Math.cos(ang(i)) * r * 0.92} y2={Math.sin(ang(i)) * r * 0.92} stroke={KC.ink} strokeWidth={6} />)}
    <line x1={0} y1={0} x2={Math.cos(ang(B)) * r * 0.7} y2={Math.sin(ang(B)) * r * 0.7} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <circle r={14} fill={KC.ink} />
  </g>;
}
// Panza esquemática que se retuerce (cólicos).
function Panza({ T, x, y, s = 1, mal = 1 }) {
  const w = 1 + Math.sin(T * 11) * 0.05 * mal;
  return <g transform={`translate(${x} ${y}) scale(${s * w} ${s / w})`}>
    <path d="M -60 -120 Q 90 -150 110 -40 Q 130 60 30 110 Q -40 140 -80 90 Q -110 40 -40 20 Q 20 0 -10 -50 Q -40 -80 -60 -120 Z" fill="#ff9db5" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {mal > 0 && [[-10, -60], [50, 10], [-20, 70]].map(([a, b], i) => <path key={i} d={`M ${a - 18} ${b} l 12 -12 l 12 12 l 12 -12`} stroke={KC.red} strokeWidth={6} fill="none" opacity={0.5 + 0.5 * Math.sin(T * 8 + i)} />)}
  </g>;
}
// Olla con vapor (cocinado).
function Olla({ T, x, y, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => { const u = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${-60 + i * 60} ${-150 - u * 120} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" opacity={0.6 * Math.sin(Math.PI * u)} strokeLinecap="round" />; })}
    <g transform="translate(-20 -150) rotate(-18) scale(.45)"><Molybdites x={0} y={0} abre={1} verde={0.6} sombra={false} /></g>
    <path d="M -170 -150 L 170 -150 L 150 0 Q 0 30 -150 0 Z" fill="#4a5568" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-190} y={-170} width={380} height={34} rx={14} fill="#718096" stroke={KC.ink} strokeWidth={7} />
    <rect x={-235} y={-130} width={60} height={22} rx={10} fill="#2d3748" stroke={KC.ink} strokeWidth={5} /><rect x={175} y={-130} width={60} height={22} rx={10} fill="#2d3748" stroke={KC.ink} strokeWidth={5} />
    {tache > 0 && <path d="M -150 -260 L 150 20 M 150 -260 L -150 20" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={tache} />}
  </g>;
}
// Hospital con cruz (urgencias).
function Hospital({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <rect x={-170} y={-300} width={340} height={300} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-360} width={240} height={70} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-310} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff">URGENCIAS</text>
    <rect x={-22} y={-250} width={44} height={120} fill={KC.red} /><rect x={-60} y={-212} width={120} height={44} fill={KC.red} />
    <rect x={-50} y={-100} width={100} height={100} fill="#7ec8e3" stroke={KC.ink} strokeWidth={6} />
    {[-130, 90].map((wx) => <rect key={wx} x={wx} y={-110} width={40} height={50} fill="#7ec8e3" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Fila de la lista de rasgos (SVG): casilla + texto.
function Rasgo({ T, at, x, y, texto, ok = true }) {
  const e = kprog(T, at, at + 0.3, kEase.rebote); if (e <= 0) return null;
  return <g transform={`translate(${x} ${y})`} opacity={kclamp(e, 0, 1)}>
    <rect x={0} y={-30} width={56} height={56} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {ok && <path d="M 10 -2 L 24 14 L 48 -18" stroke="#118a3a" strokeWidth={9} fill="none" strokeLinecap="round" transform={`scale(${e})`} />}
    <text x={78} y={12} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

function EsporadaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ja: CUES.Jardin, Co: CUES.Confusion, Re: CUES.Registro, Si: CUES.Sintomas, P: CUES.Pregunta, Es: CUES.Esporas,
    Et: CUES.Esteril, Jo: CUES.Joven, Ra: CUES.Rasgos, Cn: CUES.Consejo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const SUP = 1150;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un hongo blanco sale del pasto de tu jardín */}
      <Escena T={T} a={K.G} b={K.Ja} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Pasto T={T} sup={SUP} />
          <Molybdites T={T} x={330} y={SUP + 20} s={1.3} crece={kprog(T, K.G, K.G + 0.9)} abre={kprog(T, K.G + 0.2, K.G + 1.4, kEase.sale)} verde={0.15} rot={mece(T, 2, 0.4) * 1.5} />
          {kprog(T, K.G, K.G + 0.5) < 1 && [0, 1, 2, 3, 4, 5].map((i) => { const u = kprog(T, K.G + i * 0.04, K.G + 0.5 + i * 0.04); return <circle key={i} cx={330 + (i - 2.5) * 40 * (1 + u)} cy={SUP + 10 - Math.sin(u * Math.PI) * 60} r={8} fill={FK.tierra} opacity={1 - u} />; })}
          <Sello T={T} at={K.G + 4.3} x={820} y={820} texto="TÓXICO" color={KC.red} r={135} rot={-10} />
        </>)}
      </Escena>
      {/* 2 · sale en el pasto con la humedad, a veces en círculos; también en México */}
      <Escena T={T} a={K.Ja} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {Array.from({ length: 26 }, (_, i) => { const r = krng(i + 11), x0 = r() * KW, v = 900 + r() * 400, t = ((T - K.Ja) * v / 1100 + r()) % 1; return T < K.Co ? <line key={i} x1={x0} y1={t * 1200 - 60} x2={x0 - 10} y2={t * 1200} stroke="#e8fbff" strokeWidth={5} strokeLinecap="round" opacity=".8" /> : null; })}
          <Pasto T={T} sup={940} seed={9} />
          <AnilloHadas T={T} cx={560} cy={1080} rx={400} ry={95} s={0.42} p={kprog(T, K.Ja + 0.4, K.Ja + 2.0)} verde={0.1} />
          {(() => { const p = kprog(T, K.Ja + 2.6, K.Ja + 3.1, kEase.rebote); const [jx, jy] = mxProy(-103.35, 20.67); return p > 0 ? <g opacity={kclamp(p, 0, 1)} transform={`translate(40 340) scale(${p})`}>
            <rect x={0} y={0} width={470} height={330} rx={24} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} />
            <MapaMexico x={30} y={20} ancho={540} conCA={false}><circle cx={jx} cy={jy} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></MapaMexico>
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 3 · se confunde: champiñón · parasol de esporas verdes · parasol comestible */}
      <Escena T={T} a={K.Co} b={K.Re} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} sup={1120} seed={3} />
          <Champinon x={170} y={1130} s={0.95} crece={kprog(T, K.Co + 2.6, K.Co + 3.4)} abre={kprog(T, K.Co + 2.8, K.Co + 3.6)} />
          <Molybdites T={T} x={530} y={1135} s={1.0} abre={1} verde={0.15} />
          <Procera x={890} y={1130} s={1.0} crece={kprog(T, K.Co + 3.0, K.Co + 3.9)} />
          {[[-0.6, 0.25], [0.6, 0.25]].map(([u], i) => T > K.Co + 3.6 + i * 0.2 ? <text key={i} x={530 + u * 600} y={880} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Co + 3.6 + i * 0.2, K.Co + 3.9 + i * 0.2)}>≈</text> : null)}
        </>)}
      </Escena>
      {/* 4 · el registro de intoxicaciones de EE. UU. y Canadá */}
      <Escena T={T} a={K.Re} b={K.Si} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {Array.from({ length: 9 }, (_, i) => { const p = kprog(T, K.Re + 0.3 + i * 0.12, K.Re + 0.7 + i * 0.12, kEase.sale); if (p <= 0) return null;
            return <g key={i} transform={`translate(${klerp(1200, 330 + (i % 3) * 6, p)} ${980 - i * 22}) rotate(${(i % 2 ? 4 : -5) * (1 - p * 0.6)})`}>
              <rect x={-230} y={-150} width={460} height={300} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={-190} y={-100 + k * 50} width={k === 0 ? 220 : 300} height={14} rx={7} fill="#c9c0ae" />)}
            </g>; })}
          {T > K.Re + 1.5 && <g transform="translate(470 765)"><Molybdites x={0} y={0} s={0.5} abre={1} verde={0.2} sombra={false} crece={kprog(T, K.Re + 1.5, K.Re + 2.1)} /></g>}
        </>)}
      </Escena>
      {/* 5 · síntomas: de media hora a unas horas después */}
      <Escena T={T} a={K.Si} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Reloj T={T} x={290} y={760} r={190} p={kprog(T, K.Si + 0.3, K.Si + 2.0, kEase.suave)} />
          <Panza T={T} x={760} y={1020} s={1.15} mal={kprog(T, K.Si + 2.0, K.Si + 2.4)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿cómo lo reconocen? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Molybdites T={T} x={300} y={1180} s={1.15} abre={1} verde={0.2} rot={Math.sin(T * 3) * 3} /><Interrogacion T={T} x={300} y={620} tam={300} /></>)}
      </Escena>
      {/* 7 · por debajo: láminas que se ponen verdes; al microscopio: esporas verdes (fondo oscuro) */}
      <Escena T={T} a={K.Es} b={K.Et}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg((() => { const z = kprog(T, K.Es + 2.4, K.Es + 3.4, kEase.suave); return <>
          <g opacity={1 - z} transform={`translate(540 820) scale(${1 + z * 3}) translate(-540 -820)`}>
            <Debajo x={540} y={820} R={330} verde={kprog(T, K.Es + 0.4, K.Es + 2.2)} rot={T * 4} />
          </g>
          {z > 0 && Array.from({ length: 11 }, (_, i) => { const r = krng(i + 40), ex = 140 + r() * 800, ey = 560 + r() * 560;
            return <Espora key={i} x={ex + Math.sin(T * 0.8 + i) * 14} y={ey + Math.cos(T * 0.7 + i) * 12} L={120 + r() * 50} rot={r() * 180 + T * 6} o={z * kprog(T, K.Es + 2.6 + i * 0.06, K.Es + 3.0 + i * 0.06)} />; })}
        </>; })())}
      </Escena>
      {/* 8 · 1992: a veces salen estériles, sin esporas verdes */}
      <Escena T={T} a={K.Et} b={K.Jo}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Debajo x={330} y={960} R={170} verde={0.15} gris={kprog(T, K.Et + 2.6, K.Et + 3.4)} p={kprog(T, K.Et + 2.2, K.Et + 2.7, kEase.rebote)} rot={T * 3} />
          {T > K.Et + 3.0 && <g transform="translate(780 960)" opacity={kprog(T, K.Et + 3.0, K.Et + 3.3)}>
            <Espora x={0} y={0} L={170} rot={-20} />
            <path d="M -110 -90 L 110 90 M 110 -90 L -110 90" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.Et + 3.4, K.Et + 3.7)} />
          </g>}
        </>)}
      </Escena>
      {/* 9 · de joven: láminas todavía no verdes */}
      <Escena T={T} a={K.Jo} b={K.Ra} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} sup={1150} seed={5} />
          <Molybdites T={T} x={300} y={1165} s={1.25} crece={1} abre={kprog(T, K.Jo, K.Jo + 0.6) * 0.42} verde={0} />
          <Molybdites T={T} x={760} y={1165} s={1.0} crece={1} abre={1} verde={0.9} />
        </>)}
      </Escena>
      {/* 10 · no basta un solo rasgo; y cocinado también intoxicó */}
      <Escena T={T} a={K.Ra} b={K.Cn}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Ra + 2.6, K.Ra + 3.0)}>
            <rect x={60} y={380} width={820} height={420} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <Rasgo T={T} at={K.Ra + 0.2} x={100} y={460} texto="sombrero grande, con escamas" />
            <Rasgo T={T} at={K.Ra + 0.5} x={100} y={550} texto="anillo en el pie" />
            <Rasgo T={T} at={K.Ra + 0.8} x={100} y={640} texto="láminas verdosas (de adulto)" />
            <Rasgo T={T} at={K.Ra + 1.1} x={100} y={730} texto="esporas verdes (a veces faltan)" />
          </g>
          {T > K.Ra + 2.8 && <Olla T={T} x={400} y={1150} s={1.1} tache={kprog(T, K.Ra + 3.6, K.Ra + 4.0)} />}
        </>)}
      </Escena>
      {/* 11 · consejo: sin micólogo, no se come; si te sientes mal, urgencias */}
      <Escena T={T} a={K.Cn} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Cn + 2.6, K.Cn + 3.0)}>
            <circle cx={300} cy={900} r={200} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <circle cx={300} cy={900} r={150} fill="none" stroke="#d9d2c4" strokeWidth={6} />
            <g transform="translate(300 950) scale(.55)"><Molybdites x={0} y={0} abre={1} verde={0.3} sombra={false} /></g>
            <path d="M 140 740 L 460 1060" stroke={KC.red} strokeWidth={26} strokeLinecap="round" opacity={kprog(T, K.Cn + 0.6, K.Cn + 0.9)} />
          </g>
          <Hospital x={330} y={1180} s={1.1} p={kprog(T, K.Cn + 3.0, K.Cn + 3.5)} />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo jardín del inicio, ya «leído» */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Pasto T={T} sup={SUP} />
          <AnilloHadas T={T} cx={600} cy={1150} rx={360} ry={70} s={0.32} p={1} verde={0.7} />
          <Molybdites T={T} x={330} y={SUP + 20} s={1.3} abre={1} verde={0.7} rot={mece(T, 2, 0.4) * 1.5} />
          <Letrero x={820} y={SUP + 30} s={0.95} p={kprog(T, K.Ci + 0.8, K.Ci + 1.3)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.2} tacharEn={K.G + 2.0} until={K.G + 2.9} texto="¿champiñón?" x={330} y={470} tam={52} />
      <Etq T={T} at={K.G + 2.7} until={K.Ja - 0.3} x={440} y={560} texto="parasol de esporas verdes" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.1} until={K.Ja - 0.3} x={440} y={615} texto="Chlorophyllum molybdites" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ja + 0.4} until={K.Co - 0.3} texto="sale con la humedad" x={760} y={760} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Ja + 1.6} until={K.Co - 0.3} texto="a veces en círculo" x={700} y={870} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.Ja + 3.0} until={K.Co - 0.3} x={60} y={700} texto="también en México (p. ej. Jalisco)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.2} until={K.Re - 0.3} texto="VENENOSO" x={530} y={640} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Co + 0.6} until={K.Re - 0.3} x={40} y={420} texto="grande · escamas café · anillo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Co + 3.4} until={K.Re - 0.3} x={20} y={760} texto="champiñón (Agaricus)" it tam={24} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.5} until={K.Re - 0.3} texto="comestible" x={190} y={830} tam={28} borde="#118a3a" />
      <Etq T={T} at={K.Co + 3.8} until={K.Re - 0.3} x={1050} y={480} texto="parasol (Macrolepiota procera)" it lado="izq" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.9} until={K.Re - 0.3} texto="comestible" x={890} y={545} tam={28} borde="#118a3a" />
      <Chip T={T} at={K.Re + 0.2} until={K.Si - 0.3} texto="EE. UU. y Canadá" x={330} y={430} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Re + 2.2} until={K.Si - 0.3} texto="el venenoso que suele sumar más casos" x={540} y={990} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Re + 3.0} until={K.Si - 0.3} anio="NAMA" quien="registro de intoxicaciones" revista="Beug, FUNGI 2025 · Lehmann y Khazan, 1992" x={420} y={740} />
      <Chip T={T} at={K.Si + 0.3} until={K.P - 0.3} texto="½ hora → unas horas" x={330} y={490} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Si + 2.1} until={K.P - 0.3} texto="vómito" x={700} y={700} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Si + 2.5} until={K.P - 0.3} texto="cólicos" x={830} y={790} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Si + 2.9} until={K.P - 0.3} texto="diarrea fuerte" x={300} y={1080} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Es + 0.2} until={K.Es + 2.4} texto="POR DEBAJO · LAS LÁMINAS" x={540} y={420} tam={34} borde={KC.mint} mono />
      <Etq T={T} at={K.Es + 1.2} until={K.Es + 2.4} x={60} y={1200} texto="al madurar: verdosas" tam={30} color={CM.espora} />
      <Chip T={T} at={K.Es + 2.6} until={K.Et - 0.3} texto="AL MICROSCOPIO · ESPORAS" x={540} y={420} tam={34} borde={KC.mint} mono />
      <Etq T={T} at={K.Es + 3.2} until={K.Et - 0.3} x={60} y={500} texto="esporas verdes · 8–13 µm" tam={30} color={CM.espora} />
      <Chip T={T} at={K.Es + 3.8} until={K.Et - 0.3} texto="raro en los hongos" x={540} y={1210} tam={36} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.Et + 2.6} anio="1992" quien="Medical College of Ohio" revista="Mycopathologia, 1992" x={380} y={600} />
      <Chip T={T} at={K.Et + 2.6} until={K.Jo - 0.3} texto="a veces: estériles" x={330} y={560} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Et + 3.4} until={K.Jo - 0.3} texto="sin esporas verdes" x={760} y={790} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Jo + 0.4} until={K.Ra - 0.3} x={60} y={600} texto="joven: láminas claras" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Jo + 0.8} until={K.Ra - 0.3} x={60} y={650} texto="todavía sin verde" tam={32} color={KC.red} />
      <Etq T={T} at={K.Jo + 1.0} until={K.Ra - 0.3} x={1020} y={1230} texto="adulto: verdosas" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ra + 1.5} until={K.Ra + 2.8} texto="un solo rasgo no basta" x={470} y={900} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ra + 3.0} until={K.Cn - 0.3} texto="¿cocinado? igual intoxicó" x={420} y={560} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Ra + 3.5} until={K.Cn - 0.3} x={60} y={650} texto="registro NAMA: también cocinado" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Cn + 0.3} until={K.Cn + 2.8} texto="¿no lo identificó un micólogo?" x={360} y={500} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Cn + 0.8} until={K.Cn + 2.8} texto="no lo comas" x={760} y={770} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Cn + 3.2} until={K.Ci - 0.3} texto="¿te sientes mal? ve a urgencias" x={360} y={500} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Cn + 3.8} until={K.Ci - 0.3} x={60} y={590} texto="lleva lo que sobró del hongo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="ante la duda, no se come" x={470} y={470} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1500} texto="No es guía de identificación. Si te sientes mal" tam={22} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1535} texto="después de comer un hongo, ve a urgencias." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ja} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Ja} until={K.Co} texto="20 cm" largo={160} />
      <BarraEscala T={T} at={K.Co} until={K.Re} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.Es} until={K.Es + 2.4} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Es + 2.6} until={K.Et} texto="10 µm" largo={140} />
      <BarraEscala T={T} at={K.Jo} until={K.Ra} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="10 cm" largo={200} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ja - 0.1} texto="No es champiñón: *es venenoso.*" />
      <Subtitulo T={T} idx={1} at={K.Ja + 0.1} until={K.Co - 0.1} texto="Sale en el pasto, *también en México.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.Re - 0.1} texto="Se confunde con *hongos comestibles.*" />
      <Subtitulo T={T} idx={3} at={K.Re + 0.1} until={K.Si - 0.1} texto="Suele ser *el venenoso con más casos.*" />
      <Subtitulo T={T} idx={4} at={K.Si + 0.1} until={K.P - 0.1} texto="Vómito, cólicos y *diarrea fuertes.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Cómo lo *reconocen?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Et - 0.1} texto="Sus esporas son *verdes.*" />
      <Subtitulo T={T} idx={7} at={K.Et + 0.1} until={K.Jo - 0.1} texto="A veces salen *sin esporas verdes.*" />
      <Subtitulo T={T} idx={8} at={K.Jo + 0.1} until={K.Ra - 0.1} texto="De joven, *todavía no son verdes.*" />
      <Subtitulo T={T} idx={9} at={K.Ra + 0.1} until={K.Cn - 0.1} texto="No basta *un solo rasgo.*" />
      <Subtitulo T={T} idx={10} at={K.Cn + 0.1} until={K.Ci - 0.1} texto="Sin micólogo, *no se come.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Se queda *en el jardín.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Ja + 0.5, K.Co - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Re + 0.4, K.Si - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Si + 0.5, K.P - 0.15, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Et + 2.7, K.Ra - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ra + 3.0, K.Cn - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Cn + 0.4, K.Ci - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="113" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsporadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsporadaShot /></CompositionStage></div>;
}
window.EsporadaApp = EsporadaApp;
