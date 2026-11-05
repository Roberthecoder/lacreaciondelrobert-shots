// Shot Fungi Mati #102 · En cada respiración te metes esporas que nunca vas a ver — NARRADO (gancho 7 "algo que tus ojos nunca van a ver").
// Viaje: tu cuarto con un rayo de sol → el aire al microscopio (Cladosporium junto a un pelo) → pulmones → la gota de lluvia
// (Kim y col., PNAS 2019) → el planeta → tu cuarto otra vez. Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const EA = { oliva:'#6b6a2e', oliva2:'#8f8a3c', oliva3:'#4a4a1f', piel:'#f1c7a0', piel2:'#d9a47a', pelo:'#3b2a1e', roya:'#d96a1c', roya2:'#f0953a',
  trigo:'#7fbf3a', trigo2:'#5a9a2a', alv:'#f28fa0', alv2:'#c4566c', macro:'#9fe3ff' };

// Espora de Cladosporium: elipsoide/limón oliva-café con cicatrices (hilos) en las puntas. (x, y) centro, ancho w px.
function Conidio({ x, y, w = 22, rot = 0, o = 1 }) {
  const h = w * 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={`M 0 ${-h / 2} Q ${w * 0.62} ${-h * 0.32} ${w / 2} 0 Q ${w * 0.62} ${h * 0.32} 0 ${h / 2} Q ${-w * 0.62} ${h * 0.32} ${-w / 2} 0 Q ${-w * 0.62} ${-h * 0.32} 0 ${-h / 2} Z`}
      fill={EA.oliva2} stroke={EA.oliva3} strokeWidth={Math.max(1.5, w / 9)} />
    <ellipse cx={-w * 0.14} cy={-h * 0.14} rx={w * 0.12} ry={h * 0.16} fill="#fff" opacity=".25" />
    <rect x={-w * 0.17} y={-h / 2 - w * 0.12} width={w * 0.34} height={w * 0.2} rx={w * 0.08} fill={EA.oliva3} />
    <rect x={-w * 0.17} y={h / 2 - w * 0.08} width={w * 0.34} height={w * 0.2} rx={w * 0.08} fill={EA.oliva3} />
  </g>;
}
// Cadena ramificada de conidios (crece hacia arriba desde la base). p 0..1 = cuántos se ven; suelta 0..1 = el viento las arranca.
function CadenaClado({ T, x, y, w = 22, p = 1, suelta = 0, seed = 1, rot = 0 }) {
  const g = krng(seed), paso = w * 2.15, items = [];
  const rama = (x0, y0, ang, n, nivel) => { for (let i = 0; i < n; i++) { const a = ang + (g() - 0.5) * 10;
    const cx = x0 + Math.sin(a * Math.PI / 180) * paso * (i + 1), cy = y0 - Math.cos(a * Math.PI / 180) * paso * (i + 1);
    items.push([cx, cy, a, nivel * 10 + i]); if (i === 1 && nivel < 2) rama(cx, cy, ang + (g() > 0.5 ? 34 : -34), 3, nivel + 1); } };
  rama(0, 0, 0, 5, 0);
  const tot = items.length;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 ${w} L 0 ${-w * 0.6}`} stroke={EA.oliva3} strokeWidth={w * 0.4} strokeLinecap="round" />
    {items.map(([cx, cy, a, k], i) => { if (i / tot > p) return null;
      const s = kclamp(suelta * 1.8 - (1 - i / tot) * 0.8, 0, 1), dx = s * (260 + (k % 7) * 60) + Math.sin(T * 2 + k) * 14 * s, dy = -s * (120 + (k % 5) * 70);
      return <Conidio key={i} x={cx + dx} y={cy + dy} w={w} rot={a + s * 140 * ((k % 2) ? 1 : -1)} />; })}
  </g>;
}
// Puntitos que flotan en un rayo de luz (polvo y esporas sin dibujar). area = polígono aproximado (franja diagonal).
function MotasRayo({ T, n = 60, seed = 3, x0 = 180, y0 = 430, x1 = 760, y1 = 1240, ancho = 260, color = 'rgba(255,255,255,.8)', esporas = 0 }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const u = g(), v = g() - 0.5, sp = 0.4 + g(), f = g() * 6;
    const t = (u + T * 0.012 * sp) % 1, bx = klerp(x0, x1, t) + v * ancho + Math.sin(T * sp + f) * 18, by = klerp(y0, y1, t) + Math.cos(T * 0.8 * sp + f) * 14;
    return (i % 4 === 0 && esporas > 0) ? <Conidio key={i} x={bx} y={by} w={6 + esporas * 4} rot={T * 30 * sp + f * 40} o={esporas} />
      : <circle key={i} cx={bx} cy={by} r={2 + g() * 3} fill={color} opacity={0.4 + 0.5 * Math.abs(Math.sin(T * sp + f))} />; })}</g>;
}
// Cabeza y hombros de perfil (mira a la izquierda). (x, y) = la punta de la nariz. inhala 0..1.
function Perfil({ x, y, s = 1, inhala = 0, color = EA.piel, sombra = EA.piel2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 30 -14 Q 34 -60 52 -120 Q 70 -230 190 -250 Q 330 -262 380 -150 Q 410 -60 380 40 Q 360 110 370 190 L 560 250 Q 640 290 650 420 L -80 420 Q -70 300 40 250 L 110 220 Q 120 170 100 140 Q 60 140 40 120 Q 22 100 34 80 Q 14 70 20 52 Q 8 40 16 26 Q -6 16 0 0 Z"
      fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 150 -250 Q 300 -300 390 -170 Q 410 -100 380 -60 Q 360 -160 250 -170 Q 160 -175 120 -220 Z" fill={EA.pelo} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={92} cy={-70} rx={14} ry={10 - inhala * 3} fill={KC.ink} />
    <path d="M 38 6 Q 50 14 62 6" stroke={sombra} strokeWidth={6} fill="none" opacity={0.6 + inhala * 0.4} />
    <path d="M 200 -40 Q 230 -60 250 -20 Q 240 20 210 10" stroke={sombra} strokeWidth={7} fill="none" />
  </g>;
}
// Flechita de aire que entra a la nariz (x, y) desde la izquierda. p 0..1.
function FlechaAire({ x, y, p = 1, color = KC.white }) {
  if (p <= 0) return null;
  const L = 220 * p;
  return <g opacity={Math.min(1, p * 3)}>
    <path d={`M ${x - L} ${y - 30} Q ${x - L / 2} ${y + 20} ${x - 14} ${y}`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="22 14" />
    <path d={`M ${x - 40} ${y - 18} L ${x - 8} ${y} L ${x - 40} ${y + 18}`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Tu cuarto: ventana, rayo de sol diagonal y la persona que respira. esporas 0..1 = el rayo ya muestra esporas dibujadas.
function Cuarto({ T, esporas = 0, inhala = 0, flecha = 0 }) {
  return <>
    <FondoLunares color={KC.yellow} />
    {fsvg(<>
      <rect x={0} y={1250} width={1080} height={670} fill="#e7b43a" />
      <line x1={0} y1={1250} x2={1080} y2={1250} stroke={KC.ink} strokeWidth={8} />
      {/* ventana */}
      <rect x={70} y={360} width={300} height={330} rx={10} fill="#bfefff" stroke={KC.ink} strokeWidth={10} />
      <line x1={220} y1={360} x2={220} y2={690} stroke={KC.ink} strokeWidth={8} /><line x1={70} y1={525} x2={370} y2={525} stroke={KC.ink} strokeWidth={8} />
      <circle cx={140} cy={430} r={40} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
      {/* rayo de sol */}
      <path d="M 90 690 L 370 600 L 1080 1180 L 1080 1500 L 640 1500 Z" fill="#fff6b8" opacity={0.55 + 0.08 * Math.sin(T * 1.7)} />
      <MotasRayo T={T} n={70} x0={250} y0={700} x1={900} y1={1300} ancho={300} esporas={esporas} />
      <Perfil x={560} y={1010} s={0.8} inhala={inhala} />
      <FlechaAire x={560} y={1010} p={flecha} color="#fff" />
    </>)}
  </>;
}
// Pelo humano al microscopio (franja vertical con escamas de cutícula). ancho en px.
function Pelo({ x, w, T }) {
  return <g>
    <rect x={x} y={-40} width={w} height={2000} fill="#6b4a2e" />
    <rect x={x + w * 0.08} y={-40} width={w * 0.2} height={2000} fill="#fff" opacity=".12" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M ${x} ${i * 70 - 20 + (T * 6) % 70} Q ${x + w / 2} ${i * 70 - 60 + (T * 6) % 70} ${x + w} ${i * 70 - 10 + (T * 6) % 70}`} stroke="#3e2a18" strokeWidth={5} fill="none" opacity=".7" />)}
    <rect x={x} y={-40} width={w} height={2000} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Alvéolos (racimo de bolitas rosadas) en fondo oscuro. Para la Lupa (cuadro 2r × 2r).
function Alveolos({ T, r, esporas = 0, macro = 0 }) {
  const c = [[0.5, 0.5], [0.28, 0.4], [0.72, 0.38], [0.36, 0.7], [0.66, 0.68], [0.5, 0.24], [0.2, 0.62], [0.82, 0.6]];
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#1a0f18" />
    <path d={`M ${r} 0 L ${r} ${r * 0.5}`} stroke={EA.alv2} strokeWidth={r * 0.14} />
    {c.map(([a, b], i) => <circle key={i} cx={a * r * 2} cy={b * r * 2} r={r * 0.2 * (1 + 0.04 * Math.sin(T * 2.4 + i))} fill={EA.alv} stroke={EA.alv2} strokeWidth={6} opacity=".92" />)}
    {Array.from({ length: 7 }, (_, i) => { const u = kclamp(esporas * 1.4 - i * 0.08, 0, 1); if (u <= 0) return null;
      const [a, b] = c[i % c.length]; return <Conidio key={i} x={klerp(r, a * r * 2 + 8, u)} y={klerp(-20, b * r * 2 - 6, u)} w={9} rot={i * 50 + T * 20} />; })}
  </svg>;
}
// Hoja de trigo (larga y angosta) con pústulas de roya. Diagonal suave.
function HojaTrigo({ x, y, largo = 1000, ancho = 120, rot = -8, pustulas = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 Q ${largo * 0.5} ${-ancho * 0.75} ${largo} ${-ancho * 0.1} Q ${largo * 0.5} ${ancho * 0.45} 0 ${ancho * 0.5} Z`} fill={EA.trigo} stroke={KC.ink} strokeWidth={7} />
    {[0.15, 0.3, 0.45].map((k, i) => <path key={i} d={`M 0 ${ancho * (0.1 + k * 0.5) - ancho * 0.2} Q ${largo * 0.5} ${-ancho * 0.5 + k * ancho * 0.6} ${largo} ${-ancho * 0.1}`} stroke={EA.trigo2} strokeWidth={4} fill="none" />)}
    {pustulas > 0 && Array.from({ length: 16 }, (_, i) => { const u = 0.08 + i * 0.055, yy = (i % 3 - 1) * ancho * 0.16;
      return <ellipse key={i} cx={u * largo} cy={yy - Math.sin(u * Math.PI) * ancho * 0.12} rx={14} ry={8} fill={EA.roya} stroke="#8a3a0c" strokeWidth={3} opacity={pustulas} />; })}
  </g>;
}
// Anillo de aire (vórtice) visto de lado: dona translúcida que gira, con esporas de roya. p = cuánto subió (0..1).
function Vortice({ T, x, y, p = 0, R = 150 }) {
  if (p <= 0) return null;
  const yy = y - p * 520, rr = R * (0.6 + 0.6 * p), giro = T * 6;
  return <g opacity={Math.min(1, p * 4) * (1 - kprog(p, 0.85, 1) * 0.4)}>
    <ellipse cx={x} cy={yy} rx={rr} ry={rr * 0.32} fill="none" stroke="rgba(159,227,255,.55)" strokeWidth={rr * 0.22} />
    <ellipse cx={x} cy={yy} rx={rr} ry={rr * 0.32} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="30 22" strokeDashoffset={-giro * 20} opacity=".8" />
    {Array.from({ length: 26 }, (_, i) => { const a = i / 26 * Math.PI * 2 + giro * 0.5, q = (i % 3) * 0.12;
      return <circle key={i} cx={x + Math.cos(a) * rr * (1 + q * 0.4)} cy={yy + Math.sin(a) * rr * 0.32 + Math.sin(a * 3 + giro) * 10} r={6} fill={EA.roya2} stroke="#8a3a0c" strokeWidth={2} />; })}
  </g>;
}
// Gota de lluvia que cae y se aplasta. u: 0..1 cae, después se aplasta (splash 0..1).
function GotaLluvia({ x, y0, y1, u = 0, splash = 0 }) {
  if (splash <= 0) { const yy = klerp(y0, y1, u * u);
    return <path d={`M ${x} ${yy - 70} Q ${x + 44} ${yy} ${x} ${yy + 30} Q ${x - 44} ${yy} ${x} ${yy - 70} Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={6} />; }
  const w = 50 + splash * 110;
  return <g opacity={1 - kprog(splash, 0.6, 1)}><ellipse cx={x} cy={y1 + 20} rx={w} ry={22 - splash * 10} fill="#8fd8ff" stroke={KC.ink} strokeWidth={5} />
    {[-1, 1].map((d) => <circle key={d} cx={x + d * w * 1.1} cy={y1 - splash * 60} r={10} fill="#8fd8ff" stroke={KC.ink} strokeWidth={3} />)}</g>;
}
// Globo terráqueo esquemático con flechas de viento entre continentes.
function Globo({ T, x, y, r = 330, p = 1 }) {
  const giro = T * 8;
  const cont = [[-0.35, -0.3, 0.28, 0.22], [-0.2, 0.25, 0.18, 0.3], [0.25, -0.25, 0.3, 0.2], [0.3, 0.2, 0.16, 0.24], [0.6, -0.05, 0.12, 0.2]];
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="eaGlobo"><circle r={r} /></clipPath></defs>
    <circle r={r} fill="#2f7fd8" stroke={KC.ink} strokeWidth={9} />
    <g clipPath="url(#eaGlobo)">{cont.map(([a, b, w, h], i) => { const cx = ((a * r + giro + r * 1.5) % (r * 3)) - r * 1.5; return <ellipse key={i} cx={cx} cy={b * r} rx={w * r} ry={h * r} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />; })}</g>
    <circle r={r} fill="none" stroke="#fff" strokeWidth={6} opacity=".25" />
    {[[-0.7, -0.2, 0.6, -0.45], [-0.5, 0.4, 0.7, 0.2], [0.65, -0.55, -0.6, 0.55]].map(([a, b, c, d], i) => { const q = kclamp(p * 1.6 - i * 0.3, 0, 1); if (q <= 0) return null;
      const x0 = a * r * 1.3, y0 = b * r, x1 = c * r * 1.3, y1 = d * r, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 - r * 0.55;
      return <g key={i}><path d={`M ${x0} ${y0} Q ${mx} ${my} ${x1} ${y1}`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="1800" strokeDashoffset={1800 * (1 - q)} />
        {Array.from({ length: 5 }, (_, k) => { const t = ((T * 0.25 + k / 5) % 1) * q, bx = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * mx + t * t * x1, by = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * my + t * t * y1;
          return <circle key={k} cx={bx} cy={by} r={8} fill={EA.oliva2} stroke={KC.ink} strokeWidth={3} />; })}</g>; })}
  </g>;
}
// Báscula con montaña de polvo café (esporas). lleno 0..1.
function Bascula({ x, y, lleno = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -260 0 Q 0 ${-260 * lleno - 20} 260 0 Z`} fill="#8a6a3a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 40 }, (_, i) => { const u = (i * 0.618) % 1, v = (i * 0.377) % 1, xx = (u - 0.5) * 440, yy = -v * (200 * lleno) * (1 - Math.abs(u - 0.5) * 1.6);
      return yy < -4 ? <circle key={i} cx={xx} cy={yy} r={5} fill="#5a4220" /> : null; })}
    <rect x={-300} y={0} width={600} height={46} rx={14} fill="#c9ccd6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={46} width={120} height={150} fill="#9aa0ae" stroke={KC.ink} strokeWidth={7} />
    <rect x={-240} y={196} width={480} height={60} rx={16} fill="#c9ccd6" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={226} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Macrófago (célula grande y deforme) que envuelve una espora. come 0..1.
function Macrofago({ T, x, y, come = 0 }) {
  const n = 14, pts = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, rr = 150 + Math.sin(T * 2 + i * 1.7) * 18 + (i % 4 === 0 ? 30 : 0);
    return [x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.85]; });
  const d = 'M ' + pts.map((p, i) => { const q = pts[(i + 1) % n]; return `${p[0].toFixed(1)} ${p[1].toFixed(1)} Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`; }).join(' ') + ' Z';
  const sx = klerp(x + 300, x + 30, kEase.suave(kclamp(come * 1.5, 0, 1))), so = 1 - kprog(come, 0.75, 1);
  return <g>
    <path d={d} fill="rgba(159,227,255,.28)" stroke={EA.macro} strokeWidth={7} />
    <circle cx={x - 40} cy={y + 10} r={46} fill="#5d7bd8" stroke={KC.ink} strokeWidth={5} opacity=".85" />
    {[[-90, -60], [60, -80], [80, 60], [-60, 80]].map(([a, b], i) => <circle key={i} cx={x + a} cy={y + b} r={10} fill={EA.macro} opacity=".6" />)}
    <Conidio x={sx} y={y - 20} w={34} rot={30 + come * 80} o={so} />
  </g>;
}
// Alternaria (para la escena de alergia): conidio café en forma de mazo, con tabiques a lo ancho y a lo largo, y piquito.
function Alternaria({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -120 L 8 -70 Q 46 -50 48 10 Q 48 70 0 80 Q -48 70 -48 10 Q -46 -50 -8 -70 Z" fill="#8a5a2a" stroke={KC.ink} strokeWidth={6} />
    {[-40, -10, 20, 50].map((yy) => <line key={yy} x1={-44} y1={yy} x2={44} y2={yy} stroke="#4a2c10" strokeWidth={5} />)}
    <line x1={0} y1={-40} x2={0} y2={-10} stroke="#4a2c10" strokeWidth={4} /><line x1={-14} y1={20} x2={-14} y2={50} stroke="#4a2c10" strokeWidth={4} /><line x1={14} y1={-10} x2={14} y2={20} stroke="#4a2c10" strokeWidth={4} />
  </g>;
}

const HMO = mxProy(-110.95, 29.07);   // Hermosillo, Sonora

function EsporasAireShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Metro, R: CUES.Respiro, Cl: CUES.Clado, F: CUES.Flotan, Pu: CUES.Pulmon, P: CUES.Pregunta, E: CUES.Estudio,
    A: CUES.Anillo, Co: CUES.Continente, To: CUES.Toneladas, I: CUES.Inmune, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const resp = (t0) => 0.5 + 0.5 * Math.sin((T - t0) * 2.2 - 1.2);           // ciclo de respiración
  // gota de lluvia del estudio: cae en Anillo + 0.3 .. +0.9
  const caeU = kprog(T, K.E + 2.2, K.A + 0.4), splash = kprog(T, K.A + 0.4, K.A + 1.3), vort = kprog(T, K.A + 0.5, K.Co + 0.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu cuarto, el rayo de sol y la respiración */}
      <Escena T={T} a={K.G} b={K.M} zoom={0.05}>
        <Cuarto T={T} inhala={resp(0)} flecha={kprog(T, K.G + 0.1, K.G + 0.9, kEase.sale)} />
      </Escena>
      {/* 2 · Hermosillo: un metro cúbico de aire */}
      <Escena T={T} a={K.M} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.M + 0.2, K.M + 0.7)}>
            <MapaMexico x={40} y={760} ancho={520} conCA={false} />
            <circle cx={40 + HMO[0] * 0.52} cy={760 + HMO[1] * 0.52} r={16 * (1 + 0.2 * Math.sin(T * 6))} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          </g>
          {/* cubo de 1 m (isométrico) con esporas dentro */}
          {(() => { const e = kprog(T, K.M + 0.6, K.M + 1.2, kEase.rebote), x = 640, y = 1180, a = 300 * e, d = 130 * e; if (e <= 0) return null;
            return <g>
              <path d={`M ${x} ${y} L ${x + a} ${y} L ${x + a} ${y - a} L ${x} ${y - a} Z`} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={7} />
              <path d={`M ${x} ${y - a} L ${x + d} ${y - a - d} L ${x + a + d} ${y - a - d} L ${x + a} ${y - a} M ${x + a} ${y} L ${x + a + d} ${y - d} L ${x + a + d} ${y - a - d}`} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
              {Array.from({ length: 36 }, (_, i) => { const u = (i * 0.618) % 1, v = (i * 0.414) % 1, w = (i * 0.732) % 1; const on = kprog(T, K.M + 1.4 + i * 0.05, K.M + 1.6 + i * 0.05);
                return on > 0 ? <circle key={i} cx={x + 20 + u * (a - 40) + w * d * 0.6} cy={y - 20 - v * (a - 40) - w * d * 0.6 + Math.sin(T * 2 + i) * 6} r={6 * on} fill={EA.oliva2} stroke={EA.oliva3} strokeWidth={2} /> : null; })}
            </g>; })()}
          <text x={790} y={1240} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.M + 1.0, K.M + 1.4)}>1 m³ de aire</text>
        </>)}
      </Escena>
      {/* 3 · medio litro por respiración: unas cuatro */}
      <Escena T={T} a={K.R} b={K.Cl} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Perfil x={520} y={960} s={0.95} inhala={resp(K.R)} />
          {/* botella de medio litro */}
          {(() => { const v = kprog(T, K.R + 0.4, K.R + 2.6, kEase.suave), bx = 130, by = 1180; return <g>
            <rect x={bx} y={by - 360} width={190} height={360} rx={40} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
            <rect x={bx + 60} y={by - 420} width={70} height={64} rx={12} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
            <rect x={bx + 8} y={by - 352 + v * 344} width={174} height={344 * (1 - v)} rx={32} fill="#bdf0ff" opacity=".9" />
            <text x={bx + 95} y={by - 160} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>0.5 L</text>
            {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.R + 0.8 + i * 0.35, K.R + 1.9 + i * 0.35, kEase.suave);
              const x0 = bx + 60 + i * 24, y0 = by - 300 + i * 40, x1 = 520 - 8, y1 = 960 - 4;
              return u >= 1 ? null : <Conidio key={i} x={klerp(x0, x1, u)} y={klerp(y0, y1, u) - Math.sin(u * Math.PI) * 120} w={22} rot={u * 300 + i * 40} />; })}
          </g>; })()}
          <FlechaAire x={520} y={960} p={kprog(T, K.R + 0.6, K.R + 1.4, kEase.sale)} color={KC.ink} />
        </>)}
      </Escena>
      {/* 4 · al microscopio: Cladosporium junto a un pelo (7 px por µm) */}
      <Escena T={T} a={K.Cl} b={K.F} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Pelo x={60} w={490} T={T} />
          <CadenaClado T={T} x={700} y={1210} w={24} p={kprog(T, K.Cl + 0.6, K.Cl + 2.4)} seed={4} />
          <CadenaClado T={T} x={900} y={1230} w={24} p={kprog(T, K.Cl + 1.0, K.Cl + 2.8)} seed={9} rot={8} />
        </>)}
      </Escena>
      {/* 5 · el viento se las lleva */}
      <Escena T={T} a={K.F} b={K.Pu} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        {fsvg(<>
          <path d="M -20 1240 Q 300 1150 620 1200 Q 900 1240 1100 1180 L 1100 1400 L -20 1400 Z" fill="#6a5a2a" stroke={KC.ink} strokeWidth={7} />
          {[220, 470, 720, 930].map((x, i) => <CadenaClado key={i} T={T} x={x} y={1205 - (i % 2) * 20} w={24} p={1} seed={i * 5 + 2} suelta={kprog(T, K.F + 0.6 + i * 0.25, K.F + 3.4 + i * 0.25, kEase.suave)} />)}
          {Array.from({ length: 7 }, (_, i) => { const t = ((T - K.F) * 0.45 + i / 7) % 1, y = 560 + i * 90;
            return <path key={i} d={`M ${-200 + t * 1500} ${y} q 90 -30 180 0 t 180 0`} stroke="rgba(255,255,255,.45)" strokeWidth={6} fill="none" strokeLinecap="round" />; })}
        </>)}
      </Escena>
      {/* 6 · hasta el fondo de tus pulmones */}
      <Escena T={T} a={K.Pu} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Perfil x={300} y={720} s={1.0} inhala={resp(K.Pu)} />
          <path d="M 430 870 L 430 1060 M 430 1060 Q 380 1110 330 1150 M 430 1060 Q 480 1110 540 1150" stroke={EA.alv2} strokeWidth={22} fill="none" strokeLinecap="round" opacity={kprog(T, K.Pu + 0.2, K.Pu + 0.6)} />
        </>)}
        <Lupa T={T} at={K.Pu + 0.3} until={K.P - 0.2} x={760} y={900} r={230} fx={540} fy={1150} tinte={KC.pink} etiqueta="POR DENTRO · ALVÉOLOS"
          interior={(Tl, r) => <Alveolos T={Tl} r={r} esporas={kprog(Tl, K.Pu + 0.6, K.P - 0.4)} />} />
      </Escena>
      {/* 7 · re-gancho: ¿y cuando llueve? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[[140, 520], [380, 470], [260, 600]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={160} ry={80} fill="#eef2f7" stroke={KC.ink} strokeWidth={7} />)}
          {Array.from({ length: 14 }, (_, i) => { const t = ((T - K.P) * 1.4 + i * 0.137) % 1; return <line key={i} x1={60 + i * 30} y1={640 + t * 560} x2={52 + i * 30} y2={680 + t * 560} stroke="#2f7fd8" strokeWidth={7} strokeLinecap="round" />; })}
          <Interrogacion T={T} x={300} y={1220} tam={380} />
        </>)}
      </Escena>
      {/* 8–9 · el estudio de 2019: una gota sobre trigo con roya, el anillo de aire */}
      <Escena T={T} a={K.E} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {T > K.A - 0.2 && <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:kprog(T, K.A - 0.2, K.A + 0.3) }}></div>}
        {fsvg(<>
          <HojaTrigo x={40} y={1180} largo={1020} ancho={130} rot={-4} />
          {/* tira de película (cámara rápida) */}
          {T < K.A && <g opacity={kprog(T, K.E + 0.9, K.E + 1.3) * (1 - kprog(T, K.A - 0.4, K.A))}>
            <rect x={70} y={880} width={940} height={170} fill={KC.ink} />
            {Array.from({ length: 5 }, (_, i) => <g key={i}><rect x={92 + i * 184} y={900} width={160} height={130} fill="#16324a" />
              <path d={`M ${172 + i * 184} ${920 + i * 20} q 14 20 0 30 q -14 -10 0 -30 Z`} fill="#8fd8ff" opacity={kprog(T, K.E + 1.2 + i * 0.2, K.E + 1.4 + i * 0.2)} /></g>)}
            {Array.from({ length: 24 }, (_, i) => <rect key={i} x={84 + i * 39} y={886} width={18} height={10} fill="#fff" opacity=".8" />)}
          </g>}
          <GotaLluvia x={600} y0={300} y1={1120} u={caeU} splash={splash} />
          <Vortice T={T} x={600} y={1110} p={vort} R={150} />
        </>)}
      </Escena>
      {/* 10 · a otros continentes */}
      <Escena T={T} a={K.Co} b={K.To} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={40} />
        {fsvg(<Globo T={T} x={540} y={900} r={330} p={kprog(T, K.Co + 0.3, K.To - 0.4)} />)}
      </Escena>
      {/* 11 · cincuenta millones de toneladas al año */}
      <Escena T={T} a={K.To} b={K.I} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Bascula x={540} y={1000} lleno={kprog(T, K.To + 0.4, K.To + 3.0, kEase.suave)} />)}
      </Escena>
      {/* 12 · el sistema inmune las elimina; la alergia */}
      <Escena T={T} a={K.I} b={K.C} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        {fsvg(<>
          <path d="M -20 1250 Q 270 1150 540 1230 Q 800 1300 1100 1210 L 1100 1400 L -20 1400 Z" fill={EA.alv} stroke={EA.alv2} strokeWidth={8} opacity=".85" />
          <g opacity={1 - kprog(T, K.I + 3.2, K.I + 3.6)}><Macrofago T={T} x={420} y={880} come={kprog(T, K.I + 0.4, K.I + 2.8)} /></g>
          <g opacity={kprog(T, K.I + 3.4, K.I + 3.8)}>
            <Alternaria x={300} y={900} s={1.5} rot={-12} />
            <CadenaClado T={T} x={720} y={1060} w={26} p={1} seed={4} />
          </g>
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo cuarto, ahora con las esporas dibujadas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <Cuarto T={T} inhala={resp(K.C)} esporas={kprog(T, K.C + 0.4, K.C + 1.6)} flecha={kprog(T, K.C + 1.2, K.C + 2.0, kEase.sale)} />
      </Escena>

      {/* textos (posiciones fuera de la zona de Robert y del subtítulo) */}
      <Lupa T={T} at={K.G + 0.9} until={K.M - 0.3} x={300} y={960} r={170} fx={470} fy={980} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · EL AIRE"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" />
          {[[0.3, 0.35, 20], [0.62, 0.3, -30], [0.45, 0.62, 60], [0.75, 0.66, 10], [0.2, 0.7, -50]].map(([a, b, ro], i) =>
            <Conidio key={i} x={a * r * 2 + Math.sin(Tl * 1.3 + i) * 10} y={b * r * 2 + Math.cos(Tl + i) * 10} w={22} rot={ro + Tl * 25} />)}</svg>} />
      <Chip T={T} at={K.G + 1.6} until={K.M - 0.3} texto="esporas de hongos · invisibles" x={420} y={1180} tam={34} borde={KC.cyan} />
      <TarjetaEstudio T={T} at={K.M + 0.2} until={K.M + 2.2} anio="2023" quien="Hermosillo, Sonora" revista="trampa de esporas · J. Fungi, 2025" x={420} y={560} />
      <NumeroGigante T={T} at={K.M + 2.3} until={K.R - 0.3} valor={8445} dur={1.4} etiqueta="esporas en 1 m³ · pico de mayo 2023" x={430} y={560} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.M + 0.8} until={K.R - 0.3} x={40 + HMO[0] * 0.52 + 20} y={760 + HMO[1] * 0.52 - 40} texto="Hermosillo" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.R + 2.6} until={K.Cl - 0.3} valor={4} dur={0.6} prefijo="≈ " etiqueta="esporas por respiración" x={360} y={520} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.R + 1.0} until={K.Cl - 0.3} texto="0.5 L × 8,445 / m³ ≈ 4" x={330} y={1240} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.Cl + 0.1} until={K.F - 0.3} texto="AL MICROSCOPIO" x={420} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Cl + 0.5} until={K.F - 0.3} x={110} y={600} texto="pelo ≈ 70 µm" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Cl + 1.4} until={K.F - 0.3} x={600} y={680} texto="moho del aire" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Cl + 1.7} until={K.F - 0.3} x={600} y={730} texto="Cladosporium" it tam={32} color={KC.gold2} />
      <Etq T={T} at={K.Cl + 2.2} until={K.F - 0.3} x={600} y={790} texto="≈ 2–5 µm de ancho" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Cl + 3.0} until={K.F - 0.3} texto="44 % de las esporas · Hermosillo 2016–2023" x={540} y={1300} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.F + 0.5} until={K.Pu - 0.3} texto="viento seco · ≈ 1 m/s basta" x={420} y={470} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.F + 0.9} until={K.Pu - 0.3} x={60} y={1110} texto="nacen en cadenitas" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Pu + 1.0} until={K.P - 0.3} texto="menos de 10 µm: llegan hondo" x={540} y={1270} tam={32} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.A - 0.4} anio="2019" quien="Cornell + Virginia Tech" revista="Kim y col. · PNAS, 2019" x={540} y={560} />
      <Etq T={T} at={K.E + 1.2} until={K.A - 0.4} x={170} y={1250} texto="trigo con roya · Puccinia triticina" it tam={26} color={KC.ink} />
      <Chip T={T} at={K.E + 1.0} until={K.A - 0.4} texto="cámara rápida" x={540} y={830} tam={30} borde={KC.ink} mono />
      <Etq T={T} at={K.A + 1.4} until={K.Co - 0.3} x={600 + 230} y={660} texto="anillo de aire" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.A + 1.7} until={K.Co - 0.3} x={600 + 230} y={710} texto="(vórtice)" lado="izq" tam={26} color={KC.macro} />
      <Chip T={T} at={K.A + 2.4} until={K.Co - 0.3} texto="miles de esporas · una sola gota" x={540} y={1290} tam={30} borde={EA.roya2} />
      <Chip T={T} at={K.Co + 0.6} until={K.To - 0.3} texto="dispersión a larga distancia" x={540} y={470} tam={34} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.To + 0.3} until={K.I - 0.3} valor={50000000} dur={2.0} etiqueta="toneladas de esporas al año" x={480} y={540} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.To + 2.2} until={K.I - 0.3} texto="estimación global · Elbert y col., 2007" x={540} y={700} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.I + 0.6} until={K.I + 3.2} x={620} y={700} texto="macrófago" tam={30} color={KC.macro} />
      <Chip T={T} at={K.I + 1.2} until={K.I + 3.2} texto="persona sana: las elimina" x={420} y={470} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.I + 1.6} until={K.I + 3.2} x={60} y={1150} texto="ej. Aspergillus fumigatus" it tam={26} color={KC.texto} />
      <Chip T={T} at={K.I + 3.6} until={K.C - 0.3} texto="con alergia: rinitis o asma" x={420} y={470} tam={34} borde={KC.orange} />
      <Etq T={T} at={K.I + 3.9} until={K.C - 0.3} x={380} y={760} texto="Alternaria" it tam={30} color={KC.gold2} />
      <Etq T={T} at={K.I + 4.1} until={K.C - 0.3} x={800} y={780} texto="Cladosporium" it tam={30} color={KC.gold2} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="≈ 4 en cada respiración" x={540} y={1300} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1560} texto="Pico de Hermosillo, mayo 2023. El dibujo es esquemático." tam={22} color={KC.ink} />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1595} texto="No es consejo médico." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.M} texto="50 cm" largo={180} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.R} texto="1 m (cubo) · mapa esquemático" largo={300} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.Cl} texto="10 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.Cl} until={K.Pu} texto="10 µm" largo={70} />
      <BarraEscala T={T} at={K.Pu} until={K.P} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Co} texto="1 cm" largo={110} color={T < K.A ? KC.ink : KC.texto} />
      <BarraEscala T={T} at={K.Co} until={K.To} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.To} until={K.I} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.I} until={K.C} texto="10 µm" largo={100} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={180} color={KC.ink} y={1430} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="Esporas que tus ojos *nunca van a ver.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.R - 0.1} texto="Hermosillo, 2023: *más de 8,000* en 1 m³." />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Cl - 0.1} texto="Medio litro por respiración: *unas 4.*" />
      <Subtitulo T={T} idx={3} at={K.Cl + 0.1} until={K.F - 0.1} texto="Unas *20 veces* más delgadas que un pelo." />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.Pu - 0.1} texto="El viento *se las lleva lejos.*" />
      <Subtitulo T={T} idx={5} at={K.Pu + 0.1} until={K.P - 0.1} texto="Algunas llegan *al fondo* de tus pulmones." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y cuando llueve, *no se caen?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.A - 0.1} texto="2019: una gota *sobre trigo con roya.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.Co - 0.1} texto="Un anillo de aire *levantó miles.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.To - 0.1} texto="Hasta *otros continentes.*" />
      <Subtitulo T={T} idx={10} at={K.To + 0.1} until={K.I - 0.1} texto="*≈ 50 millones* de toneladas al año." />
      <Subtitulo T={T} idx={11} at={K.I + 0.1} until={K.C - 0.1} texto="Tu sistema inmune *las elimina.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Esporas que *nunca vas a ver.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [K.M + 0.7, K.M + 4.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cl + 0.3, K.Cl + 4.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pu + 0.1, K.P - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.P + 0.0, K.E - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.A + 0.4, K.Co - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.To + 0.3, K.I - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.I + 0.3, K.C - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="102" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsporasAireApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsporasAireShot /></CompositionStage></div>;
}
window.EsporasAireApp = EsporasAireApp;
