// Shot Científico #15 · Tu estornudo no sale como bala — NARRADO (N2 "El número" + N5 el experimento).
// Datos: Tang et al. 2013 (PLoS ONE 8: e59970), Tang et al. 2011 (PLoS ONE 6: e21392), CDC. Ver guion.md y verificacion.md.
// Dibujo esquemático: la nube, las ondas de la técnica de sombras y las distancias no van a escala exacta.
const ES_GRIS = '#d6d6d1', ES_SIL = '#3b3b3e', ES_SIL2 = '#2b2b2e';

// Contorno ondulado y suave (remolino de aire o bocanada de nube).
function blobPath(cx, cy, r, seed, fase = 0, amp = 1) {
  const g = krng(seed), a1 = g() * 6, a2 = g() * 6, N = 18, P = [];
  for (let i = 0; i < N; i++) { const t = (i / N) * Math.PI * 2, rr = r * (1 + amp * (0.16 * Math.sin(3 * t + a1 + fase) + 0.09 * Math.sin(5 * t + a2 - fase * 1.3)));
    P.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr * 0.8]); }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(P[N - 1], P[0]).map((v) => v.toFixed(1)).join(' ')}`;
  for (let i = 0; i < N; i++) { const m = mid(P[i], P[(i + 1) % N]); d += ` Q ${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + ' Z';
}

// Nube de estornudo (gotitas + neblina) que sale de (x, y) hacia `ang` grados en t0.
// alcance px · desvanece: se apaga al llegar al alcance (hasta donde se alcanzó a ver).
function ChorroGotas({ T, t0, x, y, ang = 0, alcance = 600, n = 60, seed = 1, dur = 1.6, abre = 26, color = '#bfe9ff', niebla = true, vida = 3, s = 1 }) {
  if (T < t0) return null;
  const g = krng(seed), fin = 1 - kprog(T, t0 + dur + vida * 0.4, t0 + dur + vida, kEase.suave);
  if (fin <= 0) return null;
  const gotas = [], nubes = [];
  for (let i = 0; i < n; i++) {
    const a = (ang + (g() - 0.5) * abre * (0.5 + g())) * Math.PI / 180, dmax = alcance * (0.45 + 0.55 * g()), dl = g() * 0.18, dd = dur * (0.7 + 0.5 * g()), r = (3 + g() * 8) * s, cae = g();
    const u = kprog(T, t0 + dl, t0 + dl + dd, kEase.sale); if (u <= 0) continue;
    const drift = Math.max(0, T - t0 - dl - dd) * 14;
    const d = dmax * u + drift, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d + 50 * u * u * cae * s;
    const o = (1 - kprog(d, alcance * 0.72, alcance * 1.02)) * fin;
    if (o > 0.02) gotas.push(<circle key={i} cx={px} cy={py} r={r} fill={color} stroke={KC.ink} strokeWidth={2.5} opacity={o} />);
  }
  if (niebla) for (let k = 0; k < 9; k++) {
    const f = (k + 1) / 9, u = kprog(T, t0 + k * 0.05, t0 + k * 0.05 + dur * 1.1, kEase.sale), d = alcance * f * u * 0.95;
    if (u <= 0) continue;
    const a = ang * Math.PI / 180, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d, rr = (24 + d * 0.32) * s;
    const o = 0.45 * (1 - kprog(d, alcance * 0.6, alcance)) * fin;
    if (o > 0.02) nubes.push(<path key={k} d={blobPath(px, py, rr, seed * 10 + k, T * 1.5)} fill="#ffffff" opacity={o} />);
  }
  return <g>{nubes}{gotas}</g>;
}

// Ondas de la técnica de sombras: remolinos que se ven como contornos oscuros que avanzan.
// modo 'golpe' (estornudo: sale de una vez en t0) | 'tranquilo' (respiración: sale y sale, despacio).
function PlumaSombra({ T, t0, x, y, ang = 0, alcance = 600, n = 16, seed = 3, dur = 1.6, modo = 'golpe', fin = 99, abre = 18 }) {
  if (T < t0) return null;
  const g = krng(seed), out = [], a0 = ang * Math.PI / 180;
  for (let i = 0; i < n; i++) {
    const r0 = g(), r1 = g(), r2 = g();
    let u, born;
    if (modo === 'golpe') { born = t0 + r0 * 0.25; u = kprog(T, born, born + dur * (0.6 + 0.6 * r1), kEase.sale) * (0.35 + 0.65 * r2); }
    else { const per = 3.2; born = t0 + (i / n) * per; if (T < born) continue; u = ((T - born) / per) % 1; }
    if (modo === 'golpe' && T < born) continue;
    const a = a0 + (r1 - 0.5) * abre * Math.PI / 180, d = alcance * u + (modo === 'golpe' ? Math.max(0, T - born - dur) * 10 : 0);
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d, rr = (modo === 'golpe' ? 26 : 14) + d * (modo === 'golpe' ? 0.26 : 0.16);
    const o = (1 - kprog(d, alcance * 0.65, alcance * 1.0)) * (1 - kprog(T, fin, fin + 0.6)) * (modo === 'golpe' ? 1 : kprog(u, 0, 0.08));
    if (o < 0.03) continue;
    out.push(<g key={i} opacity={o}>
      <path d={blobPath(px, py, rr, seed * 31 + i, T * 2 + i)} fill="rgba(40,40,44,.10)" stroke="rgba(30,30,34,.75)" strokeWidth={5} />
      <path d={blobPath(px + rr * 0.1, py - rr * 0.05, rr * 0.55, seed * 17 + i, -T * 2.5)} fill="none" stroke="rgba(250,250,245,.8)" strokeWidth={4} />
    </g>);
  }
  return <g>{out}</g>;
}

// Fondo de la técnica de sombras: campo de luz gris claro.
function FondoSombra({ T }) {
  return <svg width={KW} height={KH} viewBox={`0 0 ${KW} ${KH}`} style={{ position:'absolute', left:0, top:0 }}>
    <defs><radialGradient id="esCampo" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stopColor="#f3f3ee" /><stop offset="0.7" stopColor={ES_GRIS} /><stop offset="1" stopColor="#a9a9a4" /></radialGradient></defs>
    <rect width={KW} height={KH} fill="url(#esCampo)" />
    {Array.from({ length: 30 }, (_, i) => { const g = krng(70 + i); return <circle key={i} cx={g() * KW} cy={g() * KH} r={2 + g() * 3} fill="rgba(60,60,60,.12)" />; })}
    <circle cx={540} cy={860} r={600} fill="none" stroke="rgba(80,80,80,.18)" strokeWidth={10} />
  </svg>;
}

// Bala (dibujo) apuntando a la derecha. tacha 0..1 = X roja.
function Bala({ x, y, s = 1, tacha = 0, T = 0, vuela = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vuela > 0 && [-30, 0, 30].map((dy, i) => <line key={i} x1={-260 - i * 30} y1={dy} x2={-110} y2={dy} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={vuela * 0.7} />)}
    <path d="M -100 -40 L 40 -40 C 110 -40 140 -10 150 0 C 140 10 110 40 40 40 L -100 40 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-120} y={-44} width={60} height={88} rx={8} fill="#c98a2a" stroke={KC.ink} strokeWidth={9} />
    <path d="M 10 -26 C 60 -28 100 -18 118 -6" fill="none" stroke="#fff6cf" strokeWidth={8} strokeLinecap="round" />
    {tacha > 0 && <g>
      <line x1={-150} y1={-90} x2={-150 + 330 * kprog(tacha, 0, 0.5)} y2={-90 + 180 * kprog(tacha, 0, 0.5)} stroke={KC.red} strokeWidth={26} strokeLinecap="round" />
      {tacha > 0.5 && <line x1={-150} y1={90} x2={-150 + 330 * kprog(tacha, 0.5, 1)} y2={90 - 180 * kprog(tacha, 0.5, 1)} stroke={KC.red} strokeWidth={26} strokeLinecap="round" />}
    </g>}
  </g>;
}
// Palomita verde.
function Palomita({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, kEase.rebote(p))})`} opacity={kprog(p, 0, 0.3)}>
    <circle r={62} fill={KC.leaf} stroke={KC.ink} strokeWidth={9} />
    <path d="M -30 2 L -8 26 L 34 -24" fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Mano abierta (de lado) que tapa la boca. (x, y) = centro de la palma.
function ManoTapa({ x, y, s = 1, manga = KC.blue }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 60 L -70 330" stroke={KC.ink} strokeWidth={86} strokeLinecap="round" />
    <path d="M -10 60 L -70 330" stroke={manga} strokeWidth={70} strokeLinecap="round" />
    <rect x={-34} y={-110} width={66} height={190} rx={32} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    {[-70, -35, 0].map((dy, i) => <line key={i} x1={-20} y1={dy} x2={20} y2={dy + 4} stroke={CPIEL2} strokeWidth={5} strokeLinecap="round" />)}
    <path d="M -30 20 C -60 0 -62 -30 -44 -40" fill={CPIEL} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Brazo doblado con el codo enfrente de la boca (cabeza de perfil en hx, hy con escala hs).
function BrazoCodo({ hx, hy, hs = 1, sube = 1, manga = KC.blue }) {
  const ex = hx + klerp(120, 240, sube) * hs, ey = hy + klerp(420, 110, sube) * hs;
  const sx = hx + 10 * hs, sy = hy + 360 * hs, wx = ex + klerp(40, -110, sube) * hs, wy = ey + klerp(-10, -250, sube) * hs;
  return <g>
    <path d={`M ${sx} ${sy} L ${ex} ${ey} L ${wx} ${wy}`} fill="none" stroke={KC.ink} strokeWidth={86 * hs} strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${sx} ${sy} L ${ex} ${ey} L ${wx} ${wy}`} fill="none" stroke={manga} strokeWidth={70 * hs} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={wx} cy={wy} r={36 * hs} fill={CPIEL} stroke={KC.ink} strokeWidth={8 * hs} />
  </g>;
}
// Pañuelo enfrente de la nariz y la boca.
function Panuelo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -20 -110 C 30 -120 70 -100 80 -80 L 90 110 C 60 130 10 125 -20 110 C -5 40 -5 -40 -20 -110 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 20 -90 L 30 100 M 50 -85 L 58 105" stroke="#d9e6f2" strokeWidth={6} />
    <ellipse cx={95} cy={70} rx={30} ry={42} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Salero de pimienta.
function Pimentero({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-55} y={-60} width={110} height={150} rx={24} fill="#f4efe4" stroke={KC.ink} strokeWidth={9} />
    <rect x={-55} y={-10} width={110} height={100} rx={20} fill="#3a2f28" opacity=".85" />
    <path d="M -50 -60 C -50 -120 50 -120 50 -60 Z" fill="#c9ccd3" stroke={KC.ink} strokeWidth={9} />
    {[-20, 0, 20].map((dx) => <circle key={dx} cx={dx} cy={-85} r={5} fill={KC.ink} />)}
    <text x={0} y={52} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill="#f4efe4">pimienta</text>
  </g>;
}
// Regla de centímetros (dentro de svg). (x, y) = esquina; ancho = 60 cm.
function ReglaCm({ x, y, ancho = 600 }) {
  return <g>
    <rect x={x - 20} y={y} width={ancho + 40} height={54} rx={10} fill="#f6d36b" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1={x + ancho * i / 12} y1={y} x2={x + ancho * i / 12} y2={y + (i % 2 ? 18 : 32)} stroke={KC.ink} strokeWidth={5} />)}
    {[[0, '0', 'middle'], [0.5, '30', 'middle'], [1, '60 cm', 'end']].map(([f, t, an]) => <text key={t} x={x + ancho * f + (an === 'end' ? 30 : 0)} y={y + 98} textAnchor={an} style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
  </g>;
}
// Cabeza que estornuda: se echa atrás (AH…) y luego de golpe adelante (¡ACHÚ!) en `at`.
function CabezaEstornudo({ T, at, x, y, s = 1, piel, pelo, ojo = 1, gesto }) {
  const atras = kprog(T, at - 0.6, at - 0.05, kEase.suave) * (1 - kprog(T, at - 0.05, at + 0.08));
  const golpe = kprog(T, at - 0.05, at + 0.08) * (1 - kprog(T, at + 0.25, at + 0.9, kEase.suave));
  const rot = -12 * atras + 9 * golpe;
  const boca = T > at - 0.6 && T < at + 0.6 ? Math.max(atras * 0.8, golpe) : 0;
  return <g transform={`rotate(${rot} ${x} ${y + 200 * s})`}>
    <CabezaPerfil x={x} y={y} s={s} boca={boca} gesto={gesto || (golpe > 0.3 ? 'mueca' : 'normal')} piel={piel} pelo={pelo} ojo={ojo} />
  </g>;
}

function Estornudo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: cabeza en (250, 880) s 1.15 → boca ≈ (422, 995)
  const ACHU = 0.55;
  const hx = 250, hy = 880, hs = 1.15, bx = hx + 150 * hs, by = hy + 100 * hs;
  // estudio: 6 voluntarios y el pimentero que pasa
  const volX = (i) => 150 + i * 156, PIM0 = K.Estudio + 2.2, PIM1 = K.Estudio + 4.8;
  const pimX = klerp(volX(0) - 40, volX(5) + 40, kprog(T, PIM0, PIM1));
  // sombras / medida / nariz: silueta en (250, 860)
  const sx = 250, sy = 860, sbx = sx + 150, sby = sy + 100, snx = sx + 200, sny = sy + 45;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.pink }}>
      {/* 0 · gancho: ¡ACHÚ!, la bala tachada y el número */}
      <Escena T={T} a={K.Gancho} b={K.Mito} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CabezaEstornudo T={T} at={ACHU} x={hx} y={hy} s={hs} />
          <ChorroGotas T={T} t0={ACHU} x={bx} y={by} ang={4} alcance={640} n={80} seed={2} dur={1.6} vida={5} />
          <Onomato T={T} at={ACHU} dur={1.1} x={330} y={560} texto="¡ACHÚ!" tam={150} color={KC.yellow} />
          {T > 1.9 && T < 4.4 && <g opacity={1 - kprog(T, 3.9, 4.3)}>
            <Bala x={klerp(-200, 330, kprog(T, 1.9, 2.3, kEase.sale))} y={520} s={1} tacha={kprog(T, 2.6, 3.1)} vuela={1 - kprog(T, 2.3, 2.6)} />
          </g>}
        </Lienzo>
        <NumeroGigante T={T} at={4.0} until={K.Mito - 0.2} valor={16} desde={16} dur={0.9} prefijo="máx. ≈ " sufijo=" km/h" x={540} y={500} tam={120} color={KC.yellow} />
      </Escena>
      {/* 1 · el mito: 100 m/s */}
      <Escena T={T} a={K.Mito} b={K.Calculo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {(() => { const p = kprog(T, K.Mito + 0.6, K.Mito + 1.5, kEase.suave); return p > 0 && p < 1 && <g transform={`translate(${klerp(-300, 1400, p)} 1060)`}>
            {[-40, 0, 40].map((dy, i) => <line key={i} x1={-420} y1={dy} x2={-140} y2={dy} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />)}
            <path d={blobPath(0, 0, 110, 4, T * 3)} fill="#fff" stroke={KC.ink} strokeWidth={8} />
          </g>; })()}
          {T > K.Mito + 3.0 && <g opacity={kprog(T, K.Mito + 3.0, K.Mito + 3.3)}>
            {Array.from({ length: 5 }, (_, i) => <path key={i} d={blobPath(540 + (i - 2) * 160, 1060 + Math.sin(i * 2) * 40, 60 + i % 2 * 20, 50 + i, T)} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />)}
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Mito + 0.2} until={K.Calculo - 0.1} texto="durante años se repitió…" x={540} y={440} tam={40} borde={KC.ink} />
        <MitoTachado T={T} at={K.Mito + 0.4} tacharEn={K.Mito + 3.0} until={K.Calculo - 0.15} texto="100 m/s" x={540} y={760} tam={130} />
      </Escena>
      {/* 2 · cálculos viejos, no medición */}
      <Escena T={T} a={K.Calculo} b={K.Estudio} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform="rotate(-5 470 800)">
            <rect x={150} y={540} width={620} height={560} rx={14} fill="#e9d9ab" stroke={KC.ink} strokeWidth={9} />
            <rect x={150} y={540} width={620} height={560} rx={14} fill="none" stroke="#b9975a" strokeWidth={3} strokeDasharray="4 10" />
            {Array.from({ length: 7 }, (_, j) => { const p = kprog(T, K.Calculo + 0.3 + j * 0.35, K.Calculo + 0.65 + j * 0.35), g = krng(200 + j), L = 380 + g() * 120;
              let d = `M 200 ${610 + j * 66}`; for (let k = 1; k <= 30 * p; k++) d += ` L ${200 + (L * k) / 30} ${610 + j * 66 + Math.sin(k * 1.7 + j) * 9 * (0.4 + g())}`;
              return <path key={j} d={d} fill="none" stroke="#4b3a26" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />; })}
            {(() => { const j = Math.min(6, Math.floor(kprog(T, K.Calculo + 0.3, K.Calculo + 2.75) * 7)), f = ((T - K.Calculo - 0.3) / 0.35) % 1;
              return T > K.Calculo + 0.3 && T < K.Calculo + 2.8 && <g transform={`translate(${200 + 420 * f} ${600 + j * 66}) rotate(35)`}>
                <rect x={-14} y={-200} width={28} height={180} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /><path d="M -14 -20 L 0 10 L 14 -20 Z" fill="#e8c9a0" stroke={KC.ink} strokeWidth={6} /></g>; })()}
          </g>
          <g transform={`translate(800 1010) rotate(8) scale(${klerp(0.4, 1, kprog(T, K.Calculo + 1.0, K.Calculo + 1.4, kEase.rebote))})`} opacity={kprog(T, K.Calculo + 1.0, K.Calculo + 1.2)}>
            <rect x={-130} y={-180} width={260} height={360} rx={28} fill="#5d6170" stroke={KC.ink} strokeWidth={9} />
            <rect x={-100} y={-150} width={200} height={90} rx={10} fill="#b8d8a8" stroke={KC.ink} strokeWidth={6} />
            <text x={86} y={-82} textAnchor="end" style={{ font:`700 62px ${KF.mono}` }} fill="#1f3320">100</text>
            {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-100 + (i % 3) * 70} y={-35 + Math.floor(i / 3) * 52} width={56} height={40} rx={8} fill={i === 11 ? KC.orange : '#e9e6dd'} stroke={KC.ink} strokeWidth={4} />)}
          </g>
        </Lienzo>
        <Chip T={T} at={K.Calculo + 2.2} until={K.Estudio - 0.1} texto="estimación, no medición" x={540} y={440} tam={46} borde={KC.red} />
      </Escena>
      {/* 3 · el estudio de 2013: 6 voluntarios y pimienta */}
      <Escena T={T} a={K.Estudio} b={K.Sombras} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <line x1={40} y1={1172} x2={1040} y2={1172} stroke={KC.ink} strokeWidth={10} />
          {Array.from({ length: 6 }, (_, i) => { const at = K.Estudio + 0.7 + i * 0.22, e = kprog(T, at, at + 0.35, kEase.rebote), ach = PIM0 + (PIM1 - PIM0) * (i + 0.5) / 6 + 0.25;
            const brinco = T > ach ? Math.exp(-(T - ach) * 6) * Math.sin((T - ach) * 30) * 6 : 0;
            return T > at && <g key={i}>
              <g transform={`translate(${volX(i)} 1170) rotate(${brinco}) scale(${0.45 * klerp(0.3, 1, e)})`}>
                <PersonaSimple x={0} yPies={0} alto={600} color={[KC.pink, KC.yellow, KC.mint, KC.orange, KC.lilac, KC.red][i]} cara={T > ach ? 'o' : 'normal'} />
              </g>
              <ChorroGotas T={T} t0={ach} x={volX(i) + 10} y={920} ang={-90 + (i % 2 ? 30 : -30)} alcance={130} n={16} seed={60 + i} dur={0.8} abre={120} vida={1.5} s={0.7} />
            </g>; })}
          {T > PIM0 - 0.3 && T < PIM1 + 0.4 && <>
            <Pimentero x={pimX} y={700} rot={160 + Math.sin(T * 26) * 14} s={0.9} />
            {Array.from({ length: 26 }, (_, i) => { const g = krng(300 + i), tt = ((T * 1.6 + g()) % 1); return T < PIM1 && <circle key={i} cx={pimX + (g() - 0.5) * 50} cy={780 + tt * 150} r={4 + g() * 3} fill="#2a211c" opacity={1 - tt * 0.6} />; })}
          </>}
        </Lienzo>
        <Chip T={T} at={K.Estudio + 0.3} until={K.Sombras - 0.1} texto="2013 · 6 voluntarios · pimienta" x={540} y={440} tam={44} borde={KC.yellow} />
      </Escena>
      {/* 4 · la técnica de sombras: el aire se ve */}
      <Escena T={T} a={K.Sombras} b={K.Medida} fondo={ES_GRIS} zoom={0.03}>
        <FondoSombra T={T} />
        <Lienzo>
          <PlumaSombra T={T} t0={K.Sombras + 0.2} x={snx} y={sny} ang={28} alcance={360} n={10} seed={8} modo="tranquilo" fin={K.Sombras + 1.9} />
          <CabezaEstornudo T={T} at={K.Sombras + 2.3} x={sx} y={sy} s={1} piel={ES_SIL} pelo={ES_SIL2} ojo={0} gesto="normal" />
          <PlumaSombra T={T} t0={K.Sombras + 2.3} x={sbx} y={sby} ang={3} alcance={600} n={22} seed={11} dur={1.8} />
        </Lienzo>
        <Chip T={T} at={K.Sombras + 0.3} until={K.Medida - 0.1} texto="técnica de sombras" x={540} y={440} tam={46} borde={ES_SIL} />
        <Etq T={T} at={K.Sombras + 0.6} until={K.Sombras + 2.0} x={560} y={1010} texto="aire de la nariz" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Sombras + 3.0} until={K.Medida - 0.1} x={620} y={760} texto="aire de la boca" lado="der" color={KC.ink} />
      </Escena>
      {/* 5 · la medida: se ve hasta 60 cm · lo más rápido 4.5 m/s */}
      <Escena T={T} a={K.Medida} b={K.Tos} fondo={ES_GRIS} zoom={0.03}>
        <FondoSombra T={T} />
        <Lienzo>
          <CabezaEstornudo T={T} at={K.Medida + 0.5} x={sx} y={sy} s={1} piel={ES_SIL} pelo={ES_SIL2} ojo={0} gesto="normal" />
          <PlumaSombra T={T} t0={K.Medida + 0.5} x={sbx} y={sby} ang={2} alcance={600} n={26} seed={21} dur={2.4} />
          <g opacity={kprog(T, K.Medida + 0.2, K.Medida + 0.6)}><ReglaCm x={sbx} y={1080} ancho={600} /></g>
          {T > K.Medida + 2.2 && <line x1={sbx + 600} y1={760} x2={sbx + 600} y2={1080} stroke={KC.red} strokeWidth={8} strokeDasharray="18 12" opacity={kprog(T, K.Medida + 2.2, K.Medida + 2.5)} />}
        </Lienzo>
        <Etq T={T} at={K.Medida + 2.3} until={K.Tos - 0.1} x={sbx + 590} y={730} texto="se ve hasta aquí" lado="izq" color={KC.red} />
        <NumeroGigante T={T} at={K.Medida + 3.0} until={K.Tos - 0.15} valor={4.5} desde={4.5} dec={1} dur={0.8} sufijo=" m/s" etiqueta="lo más rápido" x={330} y={500} tam={130} color={KC.yellow} />
      </Escena>
      {/* 6 · como una tos: rápido, pero no extremo */}
      <Escena T={T} a={K.Tos} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {[['tos', 0, 0.86, K.Tos + 0.3], ['estornudo', 370, 0.9, K.Tos + 0.6]].map(([lbl, dy, v, t0], i) => <g key={lbl}>
            <rect x={50} y={460 + dy} width={980} height={330} rx={34} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={8} />
            <BarraH x={340} y={540 + dy} ancho={640} alto={40} v={v * kprog(T, t0, t0 + 0.8, kEase.sale)} color={i ? KC.cyan : KC.gold2} etiqueta={lbl} />
            <CabezaEstornudo T={T} at={t0} x={160} y={650 + dy} s={0.48} />
            <ChorroGotas T={T} t0={t0} x={160 + 72} y={650 + dy + 48} ang={6} alcance={620} n={34} seed={80 + i} dur={1.3} vida={4} s={0.8} />
          </g>)}
        </Lienzo>
        <Chip T={T} at={K.Tos + 1.4} until={K.Pregunta - 0.1} texto="rápido, pero no extremo" x={540} y={400} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 7 · ¿entonces ya no importa taparte? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Mano} color={KC.lilac} />
      {/* 8 · la mano no lo contiene bien (estudio de 2011) */}
      <Escena T={T} a={K.Mano} b={K.Codo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <CabezaEstornudo T={T} at={K.Mano + 3.0} x={330} y={880} s={1.15} />
          {(() => { const up = kprog(T, K.Mano + 1.4, K.Mano + 2.0, kEase.sale); return <ManoTapa x={330 + 210} y={880 + klerp(560, 100, up)} s={1.1} />; })()}
          <ChorroGotas T={T} t0={K.Mano + 3.05} x={560} y={850} ang={-38} alcance={420} n={40} seed={91} dur={1.4} abre={30} vida={4} />
          <ChorroGotas T={T} t0={K.Mano + 3.05} x={560} y={1080} ang={36} alcance={380} n={36} seed={92} dur={1.4} abre={30} vida={4} />
          <ChorroGotas T={T} t0={K.Mano + 3.1} x={580} y={960} ang={0} alcance={220} n={14} seed={93} dur={1.2} abre={20} vida={4} niebla={false} />
          <Onomato T={T} at={K.Mano + 3.0} dur={1.1} x={820} y={780} texto="¡ACHÚ!" tam={110} color={KC.pink} />
        </Lienzo>
        <Chip T={T} at={K.Mano + 0.5} until={K.Codo - 0.1} texto="estudio de 2011" x={680} y={440} tam={46} borde={KC.ink} />
        <Etq T={T} at={K.Mano + 4.0} until={K.Codo - 0.1} x={700} y={600} texto="se escapa" lado="der" color={KC.ink} />
      </Escena>
      {/* 9 · pañuelo o, si no, la parte de adentro del codo */}
      <Escena T={T} a={K.Codo} b={K.Nariz} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          {[0, 540].map((ox, i) => { const at = K.Codo + (i ? 3.4 : 1.2), hx2 = 170 + ox, hy2 = 880, hs2 = 0.75;
            return <g key={i}>
              <rect x={30 + ox} y={520} width={480} height={680} rx={36} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
              <CabezaEstornudo T={T} at={at} x={hx2} y={hy2} s={hs2} />
              {i === 0 && <g opacity={kprog(T, K.Codo + 0.3, K.Codo + 0.6)}><Panuelo x={hx2 + 168} y={hy2 + 60} s={0.75} /></g>}
              {i === 1 && <BrazoCodo hx={hx2} hy={hy2} hs={hs2} sube={kprog(T, K.Codo + 2.4, K.Codo + 3.0, kEase.sale)} />}
              {T > at && <path d={blobPath(hx2 + (i ? 210 : 190), hy2 + 70, 40 * kprog(T, at, at + 0.4), 7 + i, T * 3)} fill="#fff" opacity={0.7 * (1 - kprog(T, at + 0.5, at + 1.5))} />}
              <Palomita x={270 + ox} y={620} p={kprog(T, at + 0.5, at + 0.9)} />
              <TextoSvg x={270 + ox} y={1135} tam={42} fuente="texto" color={KC.texto}>{i ? 'adentro del codo' : 'pañuelo'}</TextoSvg>
            </g>; })}
        </Lienzo>
        <Chip T={T} at={K.Codo + 0.2} until={K.Nariz - 0.1} texto="autoridades de salud" x={540} y={440} tam={42} borde={KC.leaf} />
      </Escena>
      {/* 10 · respirar tranquilo por la nariz: máx. ≈ 1.4 m/s */}
      <Escena T={T} a={K.Nariz} b={K.Cierre} fondo={ES_GRIS} zoom={0.03}>
        <FondoSombra T={T} />
        <Lienzo>
          <PlumaSombra T={T} t0={K.Nariz + 0.2} x={snx} y={sny} ang={25} alcance={420} n={14} seed={33} modo="tranquilo" />
          <g transform={`translate(0 ${Math.sin(T * 2) * 4})`}><CabezaPerfil x={sx} y={sy} s={1} piel={ES_SIL} pelo={ES_SIL2} ojo={0} /></g>
        </Lienzo>
        <Etq T={T} at={K.Nariz + 0.8} until={K.Cierre - 0.1} x={470} y={740} texto="respiración tranquila" lado="der" color={KC.ink} tam={30} />
        <NumeroGigante T={T} at={K.Nariz + 2.6} until={K.Cierre - 0.15} valor={1.4} desde={1.4} dec={1} dur={0.8} prefijo="máx. ≈ " sufijo=" m/s" x={540} y={480} tam={120} color={KC.mint} />
      </Escena>
      {/* 11 · cierre: la misma cara del inicio, ahora estornuda en el codo */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CabezaEstornudo T={T} at={K.Cierre + 1.2} x={hx} y={hy} s={hs} />
          <BrazoCodo hx={hx} hy={hy} hs={hs} sube={kprog(T, K.Cierre + 0.2, K.Cierre + 0.7, kEase.sale)} />
          {T > K.Cierre + 1.2 && <path d={blobPath(hx + 260 * hs, hy + 80 * hs, 60 * kprog(T, K.Cierre + 1.2, K.Cierre + 1.6), 9, T * 3)} fill="#fff" opacity={0.75 * (1 - kprog(T, K.Cierre + 1.7, K.Cierre + 2.6))} />}
          <Onomato T={T} at={K.Cierre + 1.2} dur={1.0} x={760} y={1150} texto="¡achú!" tam={90} color={KC.yellow} />
          <Bala x={300} y={520} s={0.9} tacha={kprog(T, K.Cierre + 0.4, K.Cierre + 0.9)} />
          <Palomita x={810} y={1000} p={kprog(T, K.Cierre + 2.2, K.Cierre + 2.6)} s={1.2} />
        </Lienzo>
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Mito - 0.1} texto="No sale como bala: *máx. ≈ 16 km/h.*" />
      <Subtitulo T={T} idx={1} at={K.Mito + 0.1} until={K.Calculo - 0.1} texto="Se decía: *100 m/s.*" />
      <Subtitulo T={T} idx={2} at={K.Calculo + 0.1} until={K.Estudio - 0.1} texto="No se midió: *cálculos viejos.*" />
      <Subtitulo T={T} idx={3} at={K.Estudio + 0.1} until={K.Sombras - 0.1} texto="2013: *pimienta* a 6 voluntarios." />
      <Subtitulo T={T} idx={4} at={K.Sombras + 0.1} until={K.Medida - 0.1} texto="Sombras que *muestran el aire.*" />
      <Subtitulo T={T} idx={5} at={K.Medida + 0.1} until={K.Tos - 0.1} texto="Hasta 60 cm · *4.5 m/s.*" />
      <Subtitulo T={T} idx={6} at={K.Tos + 0.1} until={K.Pregunta - 0.1} texto="Como una *tos.*" />
      <Subtitulo T={T} idx={7} at={K.Pregunta + 0.1} until={K.Mano - 0.1} texto="¿Ya no importa *taparte?*" />
      <Subtitulo T={T} idx={8} at={K.Mano + 0.1} until={K.Codo - 0.1} texto="La mano *no lo contiene bien.*" />
      <Subtitulo T={T} idx={9} at={K.Codo + 0.1} until={K.Nariz - 0.1} texto="Pañuelo o *adentro del codo.*" />
      <Subtitulo T={T} idx={10} at={K.Nariz + 0.1} until={K.Cierre - 0.1} texto="Respirar: *máx. ≈ 1.4 m/s.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No es bala, *pero tápalo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, 3.85, 'avatar_11_sorprendido', 'gancho'],
        [K.Mito + 0.5, K.Calculo - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Estudio + 0.6, K.Sombras - 0.15, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Medida + 2.0, K.Tos - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Mano - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mano + 1.0, K.Codo - 0.1, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Codo + 2.0, K.Nariz - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Nariz + 1.0, K.Cierre - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_12_perfil_serio', 'gancho']]} />
      <MarcaAgua T={T} tema="biologia" num="15" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function EstornudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Estornudo /></CompositionStage></div>;
}
window.EstornudoApp = EstornudoApp;
