// Shot Fungi Mati #45 · El puñado de tierra que hizo posibles los trasplantes: la ciclosporina — NARRADO (N1 "Por dentro" + gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

// Mano de perfil que sostiene la tierra. abre 0..1 = los dedos se abren.
function Mano({ x, y, s = 1, abre = 1 }) {
  const piel = '#f2c29b', piel2 = '#d99a72';
  const giro = klerp(-70, 8, abre);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 40 Q -270 170 -40 190 Q 190 185 230 60 L 250 20 Q 120 70 -40 70 Q -180 70 -260 40 Z" fill={piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -260 40 Q -330 90 -420 120 L -420 230 Q -300 210 -180 175" fill={piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 140 Q -40 160 90 140" stroke={piel2} strokeWidth={6} fill="none" strokeLinecap="round" />
    {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${210 - k * 8} ${40 + k * 22}) rotate(${giro - k * 4})`}>
      <rect x={-10} y={-34 + k * 2} width={150 - k * 14} height={44} rx={22} fill={piel} stroke={KC.ink} strokeWidth={7} />
    </g>)}
    <g transform={`translate(-230 30) rotate(${klerp(60, -18, abre)})`}><rect x={-20} y={-30} width={130} height={50} rx={25} fill={piel} stroke={KC.ink} strokeWidth={7} /></g>
  </g>;
}
// Puñado de tierra (montoncito) con granitos y una raicilla.
function Punado({ T, x, y, s = 1, cae = 1, seed = 4 }) {
  const g = krng(seed);
  const granos = Array.from({ length: 26 }, () => [g() * 340 - 170, -g() * 110, 6 + g() * 10, g()]);
  const h = 130 * kEase.sale(kclamp(cae, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -200 0 Q -150 ${-h * 0.9} -30 ${-h} Q 90 ${-h * 1.05} 160 ${-h * 0.6} Q 210 ${-h * 0.2} 200 0 Z`} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {granos.map(([gx, gy, r, c], i) => (-gy < h * 0.85 && Math.abs(gx) < 170 - (-gy) * 0.6) ? <circle key={i} cx={gx} cy={gy - 8} r={r} fill={c > 0.6 ? '#8a5a35' : c > 0.3 ? FK.tierra2 : '#a77b4f'} /> : null)}
    {cae > 0.8 && <path d="M 40 -60 q 30 -20 60 -10 q 20 8 40 -6" stroke="#e9d6a8" strokeWidth={5} fill="none" strokeLinecap="round" />}
  </g>;
}
// Granitos que caen de la mano al abrirse.
function Granos({ T, x, y, at, n = 14, seed = 9 }) {
  if (T < at) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const dx = g() * 260 - 130, d0 = g() * 0.5, u = kclamp((T - at - d0) / 0.6, 0, 1);
    return u > 0 && u < 1 ? <circle key={i} cx={x + dx} cy={y - 160 + u * u * 150} r={6 + (i % 3) * 3} fill={FK.tierra2} /> : null; })}</g>;
}
// Frasco de medicina genérico (sin marca).
function Frasco({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-150} width={140} height={190} rx={26} fill="#fffaf0" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={-200} width={160} height={60} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-56} y={-110} width={112} height={100} rx={10} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -90 L 0 -30 M -30 -60 L 30 -60" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
  </g>;
}
// Riñón (forma de frijol). brillo 0..1 = halo verde de "funciona".
function Rinon({ x, y, s = 1, color = '#c9574a', brillo = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${24 * brillo}px ${KC.mint})` } : null}>
    <path d="M 10 -120 C 95 -120 115 -40 104 22 C 92 100 40 126 -10 120 C -58 114 -72 78 -46 54 C -24 34 -24 -24 -46 -44 C -72 -70 -62 -120 10 -120 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -46 -10 Q -90 0 -110 10" stroke="#e9a0b4" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -40 20 Q -80 40 -100 60" stroke="#8fb6ff" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 40 -80 Q 80 -50 76 10" stroke="rgba(255,255,255,.45)" strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Mapa sencillo de Noruega (contorno aproximado, esquemático).
const NOR = [[5,58],[5.5,59],[5,60],[5,61],[5.2,62],[6.5,62.6],[8,63.3],[10,64],[11.5,65],[12.5,66],[13.5,67],[15,68.2],[16.5,69],[18.5,69.8],[21,70.2],[24,71],[26,71],[28.5,70.9],[31,70.3],[29,69.6],[28.5,69],[26,69.7],[24,68.8],[21,69],[20,68.4],[18,68.4],[16,67.5],[15.5,66.3],[14.5,65.5],[13.8,64.5],[12.5,64],[12,63],[12.2,61.8],[12.8,61.2],[12.3,60.5],[11.8,59.8],[11.4,59],[10.5,59.3],[9.5,58.9],[8,58.1],[6.5,58.1]];
const norP = ([lon, lat]) => [150 + (lon - 5) * 26, 420 + (71.2 - lat) * 59.3];
function MapaNoruega({ T, at }) {
  const d = 'M ' + NOR.map((q) => norP(q).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const [px, py] = norP([7.6, 60.2]);
  const pin = kprog(T, at + 0.5, at + 0.9, kEase.rebote);
  return <g>
    <path d={d} fill="#bfe3b4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {pin > 0 && <g transform={`translate(${px} ${py}) scale(${pin})`}>
      <circle r={30 + 10 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={5} opacity=".6" />
      <path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <circle cy={-55} r={11} fill="#fff" />
    </g>}
  </g>;
}
// Tolypocladium inflatum al microscopio: hifa con ramitas que llevan fiálides de base inflada (botellitas) y bolitas de esporas en la punta.
const TOLY_RAMAS = [[230, -1, 0.05], [360, 1, 0.15], [480, -1, 0.25], [600, 1, 0.35], [720, -1, 0.45], [840, 1, 0.55], [300, 1, 0.6], [650, -1, 0.7]];
function Fialide({ ang, g = 1, esporas = 1 }) {
  if (g <= 0) return null;
  const L = 46 * g;
  return <g transform={`rotate(${ang})`}>
    <ellipse cx={0} cy={-26 * g} rx={18 * g} ry={26 * g} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} />
    <path d={`M 0 ${-50 * g} L 0 ${-50 * g - L}`} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <path d={`M 0 ${-50 * g} L 0 ${-50 * g - L}`} stroke="#fffaf0" strokeWidth={5} strokeLinecap="round" />
    {esporas > 0 && [[0, 0], [-12, -6], [12, -6], [-7, -18], [7, -18], [0, -28]].map(([a, b], i) => i < esporas * 6 ? <circle key={i} cx={a} cy={-50 * g - L - 6 + b} r={8} fill="#e9f4ff" stroke={KC.ink} strokeWidth={3} /> : null)}
  </g>;
}
function Tolypo({ T, g = 1, y = 900 }) {
  const hifa = `M 80 ${y} Q 300 ${y - 40} 540 ${y} T 1000 ${y}`;
  return <g>
    <path d={hifa} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" strokeDasharray={`${g * 1100} 2000`} />
    <path d={hifa} stroke="#fffaf0" strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${g * 1100} 2000`} />
    {TOLY_RAMAS.map(([x, lado, t0], i) => { const u = kprog(g, t0, t0 + 0.35); if (u <= 0) return null;
      const yy = y - 20 * Math.sin((x - 80) / 920 * Math.PI * 2) ; const L = 90 * u;
      return <g key={i} transform={`translate(${x} ${yy})`}>
        <path d={`M 0 0 L ${lado * 20} ${-lado * L}`} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
        <path d={`M 0 0 L ${lado * 20} ${-lado * L}`} stroke="#fffaf0" strokeWidth={8} strokeLinecap="round" />
        <g transform={`translate(${lado * 20} ${-lado * L}) rotate(${lado > 0 ? 0 : 180})`}>
          {[-38, 0, 38].map((a, k) => <Fialide key={k} ang={a} g={kprog(u, 0.4 + k * 0.1, 0.8 + k * 0.1)} esporas={kprog(g, t0 + 0.3, t0 + 0.5) + Math.sin(T * 2 + i) * 0} />)}
        </g>
      </g>; })}
  </g>;
}
// Ciclosporina: anillo de 11 piezas (péptido cíclico, esquemático). p 0..1 = se arma y se cierra.
function Ciclo({ x, y, r = 60, p = 1, s = 1, rot = 0, gris = 0 }) {
  if (p <= 0) return null;
  const n = Math.min(11, Math.ceil(p * 11));
  const pts = Array.from({ length: 11 }, (_, i) => [Math.cos(i / 11 * Math.PI * 2 - Math.PI / 2) * r, Math.sin(i / 11 * Math.PI * 2 - Math.PI / 2) * r]);
  const d = 'M ' + pts.slice(0, n).map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + (n === 11 && p >= 1 ? ' Z' : '');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinejoin="round" />
    {pts.slice(0, n).map(([a, b], i) => <circle key={i} cx={a} cy={b} r={r * 0.2} fill={mixHex(i % 2 ? KC.orange : KC.gold2, '#7a7f88', gris)} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Ciclofilina: la "pareja" de la ciclosporina dentro de la célula (mancha con un hueco).
function Ciclofilina({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -10 C -100 -80 -20 -110 30 -90 C 70 -75 70 -45 40 -40 C 10 -35 10 15 40 20 C 80 25 90 70 40 90 C -20 115 -85 70 -90 -10 Z" fill={KC.teal} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-40} cy={-20} r={10} fill="rgba(255,255,255,.4)" />
  </g>;
}
// Interruptor (calcineurina). on 1..0
function Interruptor({ x, y, on = 1, s = 1 }) {
  const c = mixHex('#7a7f88', KC.leaf, on);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-120} width={160} height={240} rx={30} fill="#e8e4da" stroke={KC.ink} strokeWidth={8} />
    <rect x={-34} y={-86} width={68} height={172} rx={34} fill="#2a2d33" stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(0 ${klerp(50, -50, on)})`}><rect x={-30} y={-38} width={60} height={76} rx={22} fill={c} stroke={KC.ink} strokeWidth={6} style={on > 0.5 ? { filter:`drop-shadow(0 0 ${18 * on}px ${KC.leaf})` } : null} /></g>
  </g>;
}
// Linfocito T: núcleo grande y poco citoplasma.
function Linfocito({ x, y, r = 50, s = 1, color = '#b18cff', nucleo = '#5b2bb3', T = 0, seed = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={r + 2 * Math.sin(T * 4 + seed)} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={r * 0.08} cy={r * 0.05} r={r * 0.72} fill={nucleo} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.12} fill="rgba(255,255,255,.35)" />
  </g>;
}
// Destellos de "señal de ataque" que salen del núcleo. fuerza 1 = salen lejos; 0 = se apagan cerca.
function Senales({ T, x, y, fuerza = 1, n = 8 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2 + 0.3, u = ((T * 0.7 + i / n) % 1);
    const R = 90 + u * klerp(60, 360, fuerza), o = (1 - u) * klerp(0.25, 1, fuerza);
    return <path key={i} d="M 0 -16 L 5 -5 L 16 0 L 5 5 L 0 16 L -5 5 L -16 0 L -5 -5 Z" transform={`translate(${x + Math.cos(a) * R} ${y + Math.sin(a) * R}) scale(${klerp(0.6, 1.3, fuerza)})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} opacity={o} />; })}</g>;
}
// Persona (silueta) con el riñón trasplantado.
function Silueta({ x, y, s = 1, color = '#8fb6ff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={95} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d="M -230 360 L -230 -80 Q -230 -200 -110 -210 L 110 -210 Q 230 -200 230 -80 L 230 360 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Científico en silueta (sin cara): bata blanca y cabeza oscura.
function Cientifico({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={52} fill={KC.ink} />
    <path d="M -110 60 L -110 -40 Q -110 -90 -55 -95 L 55 -95 Q 110 -90 110 -40 L 110 60 Z" fill="#fffaf0" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 0 -95 L -26 -40 L 0 60 M 0 -95 L 26 -40" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
// Ratón de laboratorio de perfil con un parche de piel injertada.
function Raton({ T, x, y, s = 1, parche = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -120 10 Q -200 ${-10 + Math.sin(T * 3) * 10} -260 30`} stroke="#e9a0b4" strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={130} ry={72} fill="#f4f1ec" stroke={KC.ink} strokeWidth={7} />
    <path d="M 100 -40 Q 190 -20 200 20 Q 150 50 100 40 Z" fill="#f4f1ec" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={110} cy={-50} r={28} fill="#f7c9d4" stroke={KC.ink} strokeWidth={6} />
    <circle cx={160} cy={0} r={7} fill={KC.ink} /><circle cx={202} cy={20} r={8} fill="#e9a0b4" />
    {parche > 0 && <rect x={-50} y={-62} width={80} height={56} rx={10} fill="#c9a57a" stroke={KC.ink} strokeWidth={5} opacity={parche} />}
  </g>;
}
// Mini riñón para la cuadrícula de 100.
const RINON_MINI = 'M 1 -12 C 9.5 -12 11.5 -4 10.4 2.2 C 9.2 10 4 12.6 -1 12 C -5.8 11.4 -7.2 7.8 -4.6 5.4 C -2.4 3.4 -2.4 -2.4 -4.6 -4.4 C -7.2 -7 -6.2 -12 1 -12 Z';
function Cien({ T, x, y, n, at, dur = 2, color = KC.leaf }) {
  const k = Math.floor(n * kprog(T, at, at + dur));
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 100 }, (_, i) => <path key={i} d={RINON_MINI} transform={`translate(${(i % 10) * 42} ${Math.floor(i / 10) * 36}) scale(1.3)`} fill={i < k ? color : 'rgba(255,255,255,.55)'} stroke={KC.ink} strokeWidth={1.6} />)}
  </g>;
}
// Larva de escarabajo (blanca, curvada en C) con cabeza café. moho 0..1 = la cubre el moho blanco.
function Larva({ T, x, y, s = 1, moho = 0 }) {
  const N = 11, segs = Array.from({ length: N }, (_, i) => { const a = (200 - i * 22) * Math.PI / 180; return [Math.cos(a) * 140, Math.sin(a) * 140, 62 - i * 1.6]; });
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2) * 2 * (1 - moho)})`}>
    {segs.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={mixHex('#f6ecd2', '#ffffff', moho)} stroke={KC.ink} strokeWidth={6} />)}
    {segs.slice(1).map(([a, b, r], i) => <path key={i} d={`M ${a - r * 0.5} ${b - r * 0.7} Q ${a} ${b} ${a - r * 0.5} ${b + r * 0.7}`} stroke="#d8c7a0" strokeWidth={4} fill="none" opacity={1 - moho} />)}
    {(() => { const a = (200 - N * 22) * Math.PI / 180; const hx = Math.cos(a) * 140, hy = Math.sin(a) * 140; return <g>
      {[0, 1, 2].map((k) => <path key={k} d={`M ${hx - 70 + k * 30} ${hy + 30 - k * 20} l -30 30`} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />)}
      <circle cx={hx} cy={hy} r={50} fill="#b0702a" stroke={KC.ink} strokeWidth={6} />
      <path d={`M ${hx - 10} ${hy + 46} l -14 18 M ${hx + 16} ${hy + 44} l 8 20`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" /></g>; })()}
    {moho > 0 && segs.map(([a, b, r], i) => <g key={'m' + i} opacity={moho}>{[0, 1, 2, 3, 4].map((k) => { const an = k * 1.3 + i; return <circle key={k} cx={a + Math.cos(an) * r * 0.9} cy={b + Math.sin(an) * r * 0.9} r={10 + 4 * Math.sin(T * 3 + k + i)} fill="#fff" />; })}</g>)}
  </g>;
}
// Célula de defensa del insecto (hemocito), forma irregular. apagada 0..1 = se pone gris y quieta.
function Hemocito({ T, x, y, r = 70, seed = 1, apagada = 0 }) {
  const g = krng(seed), n = 14, ph = g() * 6;
  const d = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, rr = r * (0.85 + 0.2 * Math.sin(a * 3 + ph + T * 2 * (1 - apagada))); return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x + Math.sin(T * 0.8 + seed) * 20 * (1 - apagada)} ${y + Math.cos(T * 0.7 + seed) * 16 * (1 - apagada)})`}>
    <path d={d} fill={mixHex('#ffb14a', '#5f6672', apagada)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle r={r * 0.35} fill={mixHex('#c2571d', '#3f444c', apagada)} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function CiclosporinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Noruega, S: CUES.Sandoz, R: CUES.Rechazo, P: CUES.Pregunta, Ca: CUES.Calcineurina, Al: CUES.Alarma, Ra: CUES.Ratones, Cn: CUES.Canada, Es: CUES.Escarabajo, H: CUES.Hipotesis, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const NM = K.N + 2.0; // paso del mapa al microscopio
  // calcineurina: la ciclosporina entra (0.4–1.4), se une a la ciclofilina (1.4–2.2) y juntas bajan el interruptor (2.2–3.2)
  const entra = kprog(T, K.Ca + 0.4, K.Ca + 1.4, kEase.sale), une = kprog(T, K.Ca + 1.4, K.Ca + 2.2, kEase.suave), baja = kprog(T, K.Ca + 2.2, K.Ca + 3.2, kEase.suave);
  const CX = 500, CY = 920;
  const parX = klerp(330, 620, baja), parY = klerp(760, 700, baja);
  const ataque = kprog(T, K.R + 0.6, K.R + 3.4, kEase.suave);
  const rinonRojo = kprog(T, K.R + 2.4, K.R + 4.2);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la mano abre el puño y cae la tierra; de ella sale la medicina */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mano x={470} y={1010} s={1.05} abre={kprog(T, K.G + 0.2, K.G + 0.9, kEase.sale)} />
          <Granos T={T} x={470} y={1010} at={K.G + 0.3} />
          <Punado T={T} x={470} y={1040} s={1.05} cae={kprog(T, K.G + 0.3, K.G + 1.2)} />
          {T > K.G + 2.2 && <g opacity={kprog(T, K.G + 2.2, K.G + 2.8)}>
            {Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2 + T; return <line key={i} x1={450 + Math.cos(a) * 120} y1={720 + Math.sin(a) * 120} x2={450 + Math.cos(a) * 170} y2={720 + Math.sin(a) * 170} stroke="#fff" strokeWidth={10} strokeLinecap="round" />; })}
            <Frasco x={450} y={800} s={kprog(T, K.G + 2.2, K.G + 2.8, kEase.rebote)} />
          </g>}
        </>)}
      </Escena>
      {/* 2a · Noruega en el mapa */}
      <Escena T={T} a={K.N} b={NM} zoom={0.08} origen="25% 70%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaNoruega T={T} at={K.N} />)}
      </Escena>
      {/* 2b · al microscopio: Tolypocladium inflatum */}
      <Escena T={T} a={NM} b={K.S} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {[[160, 1150, 60], [880, 640, 46], [760, 1180, 70], [250, 660, 40]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#4a3220" stroke="#2a1a10" strokeWidth={6} opacity=".8" />)}
          <Tolypo T={T} g={kprog(T, NM, K.S - 0.6)} y={910} />
        </>)}
      </Escena>
      {/* 3 · Sandoz: el caldo con el moho y la molécula de 11 piezas */}
      <Escena T={T} a={K.S} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g transform="translate(330 1000)">
            <path d="M -50 -300 L -50 -150 L -190 140 Q -200 170 -170 170 L 170 170 Q 200 170 190 140 L 50 -150 L 50 -300 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
            <path d="M -125 10 L -190 140 Q -200 170 -170 170 L 170 170 Q 200 170 190 140 L 125 10 Z" fill="#e8c46a" stroke={KC.ink} strokeWidth={5} />
            {[[-80, 90], [0, 60], [70, 110], [-20, 130], [110, 140]].map(([a, b], i) => <circle key={i} cx={a} cy={b + Math.sin(T * 2 + i) * 6} r={26} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} />)}
            <rect x={-62} y={-318} width={124} height={34} rx={10} fill="#d9d2c4" stroke={KC.ink} strokeWidth={6} />
          </g>
          {(() => { const v = kprog(T, K.S + 0.8, K.S + 1.6, kEase.sale); return <Ciclo x={klerp(330, 720, v)} y={klerp(1000, 760, v)} r={90} p={kprog(T, K.S + 1.2, K.S + 2.4)} rot={T * 15} />; })()}
        </>)}
      </Escena>
      {/* 4 · el rechazo: los linfocitos T atacan el riñón nuevo */}
      <Escena T={T} a={K.R} b={K.P}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Silueta x={480} y={890} s={1} />
          <g transform={`translate(${Math.sin(T * 40) * 4 * rinonRojo} 0)`}><Rinon x={560} y={930} s={0.85} color={mixHex('#c9574a', KC.red, rinonRojo)} /></g>
          {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2 + 0.4; const R = klerp(520, 150, ataque) + Math.sin(T * 3 + i) * 10;
            return <Linfocito key={i} T={T} seed={i} x={560 + Math.cos(a) * R} y={930 + Math.sin(a) * R * 0.9} r={42} />; })}
        </>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Ca} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {fsvg(<><Interrogacion T={T} x={300} y={1080} /><Ciclo x={150} y={470} r={50} rot={T * 30} /></>)}
      </Escena>
      {/* 6–7 · al microscopio: dentro del linfocito T */}
      <Escena T={T} a={K.Ca} b={K.Ra}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <circle cx={CX} cy={CY} r={310} fill="#8d6fd1" stroke={KC.ink} strokeWidth={9} opacity=".95" />
          <circle cx={CX + 40} cy={CY + 40} r={190} fill={mixHex('#5b2bb3', '#3a2a5a', baja)} stroke={KC.ink} strokeWidth={6} />
          <Senales T={T} x={CX + 40} y={CY + 40} fuerza={1 - kprog(T, K.Ca + 2.6, K.Ca + 3.6)} />
          <Interruptor x={CX + 120} y={CY + 30} s={0.85} on={1 - baja} />
          <text x={CX + 120} y={CY + 170} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff">{baja < 0.5 ? 'ON' : 'OFF'}</text>
          <Ciclofilina x={une > 0 ? parX - 60 : 260} y={une > 0 ? parY + 40 : 800} s={0.8} />
          <Ciclo x={une > 0 ? parX : klerp(-80, klerp(140, 330, une), entra)} y={une > 0 ? parY : klerp(560, 760, entra)} r={44} rot={T * 25 * (1 - une)} />
          {T > K.Al + 0.8 && <path d={`M ${CX - 250} ${CY - 60} L ${CX - 170} ${CY + 20} M ${CX - 170} ${CY - 60} L ${CX - 250} ${CY + 20}`} stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.Al + 0.8, K.Al + 1.1)} />}
        </>)}
      </Escena>
      {/* 8 · 1976: Borel y Stähelin (siluetas), el ratón con el injerto de piel */}
      <Escena T={T} a={K.Ra} b={K.Cn}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Cientifico x={150} y={1060} s={0.75} />
          <Cientifico x={930} y={1060} s={0.75} />
          <Raton T={T} x={520} y={1050} s={0.85} parche={kprog(T, K.Ra + 2.4, K.Ra + 2.9)} />
        </>)}
      </Escena>
      {/* 9 · 1983, Canadá: 209 trasplantes; 80 de cada 100 contra 64 */}
      <Escena T={T} a={K.Cn} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T > K.Cn + 2.2 && <g opacity={kprog(T, K.Cn + 2.2, K.Cn + 2.7)}>
            <Cien T={T} x={78} y={740} n={80} at={K.Cn + 2.8} dur={2.2} />
            <Cien T={T} x={608} y={740} n={64} at={K.Cn + 2.8} dur={1.76} color={KC.orange} />
          </g>}
        </>)}
      </Escena>
      {/* 10 · en la naturaleza: parásito de larvas de escarabajo, en la tierra */}
      <Escena T={T} a={K.Es} b={K.H}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={-20} y={640} width={KW + 40} height={1300} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 30 }, (_, i) => { const g = krng(i + 5); return <circle key={i} cx={g() * KW} cy={680 + g() * 560} r={6 + g() * 12} fill={i % 2 ? FK.tierra2 : '#8a5a35'} />; })}
          <path d="M 120 640 q 20 120 -10 220 M 900 640 q -30 140 10 260" stroke="#e9d6a8" strokeWidth={6} fill="none" strokeLinecap="round" />
          <Larva T={T} x={560} y={960} s={1} moho={kprog(T, K.Es + 1.8, K.H - 0.2)} />
          <RedHifas T={T} x={560} y={960} g={kprog(T, K.Es + 1.6, K.H)} seed={7} n={160} escala={0.55} color="#ffffff" ancho={3} />
        </>)}
      </Escena>
      {/* 11 · hipótesis: dentro de la larva, sus células de defensa se apagan */}
      <Escena T={T} a={K.H} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} color="rgba(255,200,120,.25)" />
        {fsvg(<>
          {[[300, 760, 1], [700, 820, 2], [460, 1060, 3], [800, 1110, 4], [220, 1040, 5]].map(([x, y, sd], i) => <Hemocito key={i} T={T} x={x} y={y} seed={sd} apagada={kprog(T, K.H + 1.6 + i * 0.3, K.H + 2.4 + i * 0.3)} />)}
          {[[300, 760], [700, 820], [460, 1060], [800, 1110], [220, 1040]].map(([x, y], i) => { const v = kprog(T, K.H + 0.8 + i * 0.3, K.H + 1.8 + i * 0.3, kEase.sale);
            return v > 0 ? <Ciclo key={i} x={klerp(x + 300, x + 50, v)} y={klerp(y - 300, y - 50, v)} r={26} rot={T * 30} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo puñado de tierra en la mano; ahora encima, un riñón que funciona */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mano x={470} y={1010} s={1.05} abre={1} />
          <Punado T={T} x={470} y={1040} s={1.05} cae={1} />
          {(() => { const v = kprog(T, K.C + 0.5, K.C + 1.3, kEase.rebote); return v > 0 ? <Rinon x={450} y={770} s={0.95 * v * (1 + 0.03 * Math.sin(T * 5))} brillo={0.6 + 0.4 * Math.sin(T * 5)} rot={-8} /> : null; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 3.6} until={K.N - 0.3} texto="tierra → medicina" x={330} y={500} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.N + 0.9} until={NM - 0.2} x={norP([7.6, 60.2])[0] + 40} y={norP([7.6, 60.2])[1] - 50} texto="muestra de suelo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.N + 0.4} until={NM - 0.2} x={500} y={1160} texto="NORUEGA" tam={44} color={KC.ink} />
      <Chip T={T} at={NM + 0.2} until={K.S - 0.3} texto="AL MICROSCOPIO · moho del suelo" x={540} y={520} tam={32} borde={KC.cyan} />
      <Etq T={T} at={NM + 0.6} until={K.S - 0.3} x={60} y={620} texto="Tolypocladium inflatum" it tam={40} />
      <Etq T={T} at={NM + 1.4} until={K.S - 0.3} x={540} y={1110} texto="fiálides de base inflada" tam={28} color={KC.gold2} />
      <Etq T={T} at={NM + 1.8} until={K.S - 0.3} x={60} y={700} texto="esporas" tam={28} color="#bfe3ff" />
      <Chip T={T} at={K.S + 0.3} until={K.R - 0.3} texto="Sandoz · Basilea, Suiza" x={420} y={480} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.S + 2.0} until={K.R - 0.3} x={600} y={620} texto="ciclosporina" tam={36} color={KC.ink} />
      <Etq T={T} at={K.S + 2.6} until={K.R - 0.3} x={600} y={900} texto="anillo de 11 piezas" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 2.6} until={K.P - 0.3} texto="rechazo" x={300} y={470} tam={46} borde={KC.red} />
      <Etq T={T} at={K.R + 0.6} until={K.P - 0.3} x={60} y={640} texto="linfocitos T" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 1.2} until={K.P - 0.3} x={1030} y={700} texto="riñón nuevo" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.2} until={K.Ra - 0.3} texto="AL MICROSCOPIO · linfocito T" x={360} y={470} tam={30} borde={KC.lilac} />
      <Etq T={T} at={K.Ca + 0.9} until={K.Ca + 1.6} x={60} y={560} texto="ciclosporina" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Ra - 0.3} x={60} y={620} texto="ciclofilina (su pareja)" tam={28} color="#7ff0e0" />
      <Etq T={T} at={K.Ca + 2.0} until={K.Ra - 0.3} x={1040} y={CY + 180} texto="calcineurina" lado="izq" tam={30} color={KC.leaf} />
      <Chip T={T} at={K.Al + 0.6} until={K.Ra - 0.3} texto="señales de ataque: apagadas" x={400} y={560} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Ra + 0.2} until={K.Cn - 0.3} anio="1976" quien="Borel, Feurer, Gubler y Stähelin" revista="Sandoz · Agents and Actions" x={430} y={740} />
      <Etq T={T} at={K.Ra + 1.2} until={K.Cn - 0.3} x={70} y={1140} texto="Borel" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ra + 1.4} until={K.Cn - 0.3} x={1010} y={1140} texto="Stähelin" lado="izq" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Ra + 3.0} until={K.Cn - 0.3} texto="injerto de piel: tarda en rechazarse" x={540} y={930} tam={28} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.Cn + 0.2} until={K.Cn + 2.3} anio="1983" quien="Canadá · 209 trasplantes de riñón" revista="N Engl J Med, 1983" y={760} />
      <Chip T={T} at={K.Cn + 2.6} until={K.Es - 0.3} texto="funcionan al año (estimado)" x={330} y={540} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Cn + 2.7} until={K.Es - 0.3} x={70} y={695} texto="con ciclosporina" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cn + 2.9} until={K.Es - 0.3} x={600} y={695} texto="tratamiento de antes" tam={30} color={KC.ink} />
      {T < K.Es - 0.3 && <Contador T={T} at={K.Cn + 2.8} hasta={80} dur={2.2} sufijo=" de 100" x={290} y={1145} tam={46} color={KC.ink} />}
      {T < K.Es - 0.3 && <Contador T={T} at={K.Cn + 2.8} hasta={64} dur={1.76} sufijo=" de 100" x={820} y={1145} tam={46} color={KC.ink} />}
      <Etq T={T} at={K.Es + 0.6} until={K.H - 0.3} x={60} y={760} texto="larva de escarabajo" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Es + 2.0} until={K.H - 0.3} x={60} y={820} texto="moho: Tolypocladium" it tam={28} color="#fff" />
      <Chip T={T} at={K.H + 0.3} until={K.C - 0.3} texto="hipótesis" x={330} y={500} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.H + 0.8} until={K.C - 0.3} x={60} y={600} texto="células de defensa del insecto" tam={28} color="#ffcf8a" />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="tierra → trasplante" x={420} y={500} tam={42} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={260} />
      <BarraEscala T={T} at={K.N} until={NM} texto="200 km" largo={107} color={KC.ink} />
      <BarraEscala T={T} at={NM} until={K.S} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.S} until={K.R} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.Ca} until={K.Ra} texto="2 µm" largo={170} />
      <BarraEscala T={T} at={K.Ra} until={K.Cn} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Es} until={K.H} texto="1 cm" largo={150} />
      <BarraEscala T={T} at={K.H} until={K.C} texto="10 µm" largo={140} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={260} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Esta tierra *no es solo tierra.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.S - 0.1} texto="Un moho del suelo *de Noruega.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.R - 0.1} texto="De él salió *la ciclosporina.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.P - 0.1} texto="Tus defensas *atacan el órgano nuevo.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ca - 0.1} texto="¿Cómo lo calma *un moho?*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.Al - 0.1} texto="Apaga la *calcineurina.*" />
      <Subtitulo T={T} idx={6} at={K.Al + 0.1} until={K.Ra - 0.1} texto="Sin señales, *no se arma el ataque.*" />
      <Subtitulo T={T} idx={7} at={K.Ra + 0.1} until={K.Cn - 0.1} texto="1976: *retrasaba el rechazo* en ratones." />
      <Subtitulo T={T} idx={8} at={K.Cn + 0.1} until={K.Es - 0.1} texto="1983: *80 de cada 100* contra 64." />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.H - 0.1} texto="Parásito de *larvas de escarabajo.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.C - 0.1} texto="Se sospecha: *desarma sus defensas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un riñón que *sí siguió funcionando.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.4, NM + 0.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.R + 0.5, K.R + 4.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ca + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ca + 2.4, K.Al + 3.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ra + 0.4, K.Ra + 4.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Cn + 3.0, K.Cn + 7.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Es + 0.4, K.Es + 4.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.H + 0.6, K.H + 4.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="45" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CiclosporinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CiclosporinaShot /></CompositionStage></div>;
}
window.CiclosporinaApp = CiclosporinaApp;
