// Shot Ambiental #32 · De cada diez cubetas, unas cuatro se pierden en la calle (fugas de agua) — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: SACMEX / IPDP CDMX (2022), Gobierno de Jalisco (2025), Liemberger y Wyatt (2018), EPA WaterSense. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (calle, tubería, suelo, lago, ciudad y globo).

const AGUA = '#2f8fd8', AGUA2 = '#7cc8ff', GRIS = '#b8c4cf', TIERRA = '#9a6a3c', TIERRA2 = '#7d5330';

// Cubeta con asa. lleno 0..1. fuga 0..1 = chorrito que sale por un lado. color del agua.
function Cubeta({ T = 0, x, y, s = 1, lleno = 1, color = AGUA, fuga = 0 }) {
  const H = 120, top = 66, bot = 48, h = H * lleno, wAt = (yy) => klerp(bot, top, yy / H);
  const wl = wAt(Math.max(0, h - 6));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-top - 4} ${-H} Q 0 ${-H - 80} ${top + 4} ${-H}`} stroke={KC.ink} strokeWidth={6} fill="none" />
    <path d={`M ${-top} ${-H} L ${top} ${-H} L ${bot} 0 L ${-bot} 0 Z`} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {h > 6 && <path d={`M ${-bot + 5} -5 L ${bot - 5} -5 L ${wl - 5} ${-h} L ${-wl + 5} ${-h} Z`} fill={color} />}
    <path d={`M ${-top} ${-H} L ${top} ${-H}`} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    {fuga > 0.02 && Array.from({ length: 5 }, (_, i) => { const u = ((T * 2.2 + i / 5) % 1); return <circle key={i} cx={bot + 6 + u * 46 * fuga} cy={-20 + u * u * 60} r={7 * (1 - u * 0.5)} fill={AGUA2} stroke={KC.ink} strokeWidth={2} opacity={fuga} />; })}
  </g>;
}
// Tubo horizontal (x0..x1, centro y, grosor g) con uniones.
function Tubo({ x0, x1, y, g = 60, color = '#9aa7b4', uniones = 4, oxido = 0 }) {
  const r = krng(7);
  return <g>
    <rect x={x0} y={y - g / 2} width={x1 - x0} height={g} fill={color} stroke={KC.ink} strokeWidth={7} />
    <rect x={x0} y={y - g / 2 + 8} width={x1 - x0} height={g * 0.18} fill="#fff" opacity=".3" />
    {Array.from({ length: uniones }, (_, i) => { const xx = x0 + (x1 - x0) * (i + 0.5) / uniones; return <rect key={i} x={xx - 16} y={y - g / 2 - 10} width={32} height={g + 20} rx={6} fill={color} stroke={KC.ink} strokeWidth={6} />; })}
    {oxido > 0 && Array.from({ length: 14 }, (_, i) => <ellipse key={'o' + i} cx={x0 + r() * (x1 - x0)} cy={y - g / 2 + 14 + r() * (g - 28)} rx={10 + r() * 22} ry={6 + r() * 10} fill="#b5571e" opacity={oxido * 0.85} />)}
  </g>;
}
// Chorro de agua que sale de una grieta hacia arriba (fuerza 0..1).
function Chorro({ T, x, y, fuerza = 1, alto = 160, n = 9, dir = -1 }) {
  if (fuerza <= 0.01) return null;
  return <g>
    {Array.from({ length: n }, (_, i) => { const u = ((T * 1.8 + i / n) % 1), sx = (i % 2 ? 1 : -1) * (10 + (i % 3) * 14);
      const xx = x + sx * u * 2.2 * fuerza, yy = y + dir * (alto * fuerza * (2 * u - u * u * 1.6));
      return <circle key={i} cx={xx} cy={yy} r={9 + 6 * fuerza * (1 - u)} fill={AGUA2} stroke={KC.ink} strokeWidth={3} />; })}
    <path d={`M ${x - 14} ${y} L ${x - 4} ${y + 8 * -dir} L ${x + 6} ${y - 4 * -dir} L ${x + 14} ${y + 6 * -dir}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinejoin="round" />
  </g>;
}
// Casa sencilla.
function Casa({ x, y, s = 1, color = KC.pink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-120} width={160} height={120} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -100 -116 L 0 -200 L 100 -116 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-20} y={-64} width={40} height={64} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <rect x={-66} y={-96} width={34} height={30} fill={AGUA2} stroke={KC.ink} strokeWidth={4} /><rect x={32} y={-96} width={34} height={30} fill={AGUA2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Manómetro: valor 0..1 (la aguja va de -120° a 120°; zona roja al final).
function Manometro({ x, y, r = 120, valor = 0 }) {
  const ang = -120 + 240 * valor, arco = (a0, a1) => { const p = (a) => [Math.sin(a * Math.PI / 180) * (r - 18), -Math.cos(a * Math.PI / 180) * (r - 18)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M ${x0} ${y0} A ${r - 18} ${r - 18} 0 0 1 ${x1} ${y1}`; };
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-18} y={r - 6} width={36} height={60} fill="#9aa7b4" stroke={KC.ink} strokeWidth={6} />
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <path d={arco(-120, 40)} stroke={KC.leaf} strokeWidth={16} fill="none" />
    <path d={arco(40, 120)} stroke={KC.red} strokeWidth={16} fill="none" />
    <line x1={0} y1={0} x2={Math.sin(ang * Math.PI / 180) * (r - 30)} y2={-Math.cos(ang * Math.PI / 180) * (r - 30)} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <circle r={14} fill={KC.ink} />
    <text y={r * 0.55} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>presión</text>
  </g>;
}
// Llave de cocina (el pico apunta hacia abajo en x+90, y+70).
function Llave({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-30} width={60} height={60} rx={10} fill="#c9d3dd" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -14 L 60 -14 Q 104 -14 104 30 L 104 60 L 76 60 L 76 34 Q 76 14 56 14 L -80 14 Z" fill="#c9d3dd" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-20} y={-66} width={20} height={52} fill="#c9d3dd" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-84} width={100} height={26} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Garrafón que se llena (lleno 0..1).
function Garrafon({ x, y, lleno = 0 }) {
  const h = 230 * lleno;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-100} y={-250} width={200} height={250} rx={40} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
    {h > 4 && <rect x={-92} y={-8 - h + 4} width={184} height={h} rx={30} fill={AGUA} />}
    <rect x={-40} y={-290} width={80} height={44} rx={8} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Regadera con chorro.
function Regadera({ T, x, y, on = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -10 -120 L -10 -60 Q -10 -40 -30 -40" stroke="#9aa7b4" strokeWidth={16} fill="none" />
    <path d="M -90 -40 L 30 -40 L 10 -10 L -70 -10 Z" fill="#c9d3dd" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {on > 0.02 && Array.from({ length: 7 }, (_, i) => { const u = ((T * 2 + i * 0.37) % 1); return <line key={i} x1={-66 + i * 12} y1={-4 + u * 150} x2={-70 + i * 13} y2={16 + u * 150} stroke={AGUA} strokeWidth={6} strokeLinecap="round" opacity={on} />; })}
  </g>;
}
// Globo terráqueo esquemático con gotas que se escapan de muchos puntos.
function Globo({ T, x, y, r = 240, gotas = 1 }) {
  const pts = [[-0.5, -0.3], [-0.2, 0.4], [0.3, -0.5], [0.55, 0.1], [0.1, 0.05], [-0.6, 0.35], [0.35, 0.55], [-0.15, -0.65], [0.7, -0.25], [-0.35, -0.05]];
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 18} fill="none" stroke="#7fe3ff" strokeOpacity=".4" strokeWidth={16} />
    <circle r={r} fill="#2b7fd6" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-0.7 * r} ${-0.4 * r} q 80 -90 170 -30 q 40 60 -30 110 q -70 30 -120 -10 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-0.3 * r} ${0.2 * r} q 60 -10 70 70 q -10 90 -60 70 q -40 -60 -10 -140 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.2 * r} ${-0.6 * r} q 120 -20 150 60 q -20 70 -90 50 q -70 -20 -60 -110 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.35 * r} ${0.25 * r} q 70 0 80 60 q -50 40 -90 0 Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
    {gotas > 0 && pts.map(([a, b], i) => { const u = ((T * 0.9 + i * 0.13) % 1), vx = a, vy = b, d = r * (Math.hypot(a, b)) + u * 120;
      const n = Math.hypot(a, b) || 1; return <path key={i} d="M 0 -16 Q 11 0 0 11 Q -11 0 0 -16 Z" transform={`translate(${vx / n * d} ${vy / n * d})`} fill={AGUA2} stroke={KC.ink} strokeWidth={3} opacity={gotas * (1 - u)} />; })}
  </g>;
}
// Alberca olímpica en miniatura (vista desde arriba).
function Alberca({ x, y, w = 80, h = 44, on = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={on > 0 ? 1 : 0.35}>
    <rect x={0} y={0} width={w} height={h} rx={5} fill={on > 0 ? AGUA2 : 'rgba(255,255,255,.4)'} stroke={KC.ink} strokeWidth={3} />
    {on > 0 && [1, 2, 3].map((k) => <line key={k} x1={4} y1={h * k / 4} x2={w - 4} y2={h * k / 4} stroke="#fff" strokeWidth={2} strokeDasharray="6 4" />)}
  </g>;
}
// Ciudad esquemática (edificios).
function Ciudad({ x, y, s = 1 }) {
  const ed = [[0, 160, KC.orange], [70, 230, KC.pink], [150, 120, KC.yellow], [210, 280, KC.lilac], [290, 180, KC.coral]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ed.map(([dx, h, c], i) => <g key={i}><rect x={dx} y={-h} width={66} height={h} fill={c} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: Math.floor(h / 50) }, (_, k) => <rect key={k} x={dx + 14} y={-h + 18 + k * 50} width={38} height={18} fill="#fff" opacity=".7" />)}</g>)}
  </g>;
}

function FugasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fuga, Tu: CUES.Tubos, S: CUES.Suelo, P: CUES.Pregunta, Gd: CUES.Guadalajara, E: CUES.Estudio, A: CUES.Albercas, L: CUES.Llave, R: CUES.Regaderas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const PIERDEN = [1, 4, 6, 8];
  // fila de 10 cubetas bajo el tubo: se llenan (t0) y 4 se vacían por fugas (t1)
  const cubetas = (t0, t1) => <>
    <Tubo x0={-20} x1={1100} y={860} g={56} uniones={5} />
    {PIERDEN.map((i) => <Chorro key={'c' + i} T={T} x={100 + i * 98} y={888} fuerza={kprog(T, t1 - 0.4, t1 + 0.2)} alto={90} n={6} dir={1} />)}
    {Array.from({ length: 10 }, (_, i) => { const pierde = PIERDEN.includes(i); const ll = kprog(T, t0 + 0.1 + i * 0.12, t0 + 0.55 + i * 0.12, kEase.sale);
      const baja = pierde ? kprog(T, t1 + i * 0.08, t1 + 1.4 + i * 0.08, kEase.suave) : 0;
      return <Cubeta key={i} T={T} x={100 + i * 98} y={1120} s={0.62} lleno={ll * (1 - baja)} color={pierde ? mixHex(AGUA, GRIS, baja) : AGUA} fuga={pierde ? Math.sin(Math.PI * baja) : 0} />; })}
  </>;
  // gotero de la llave: una gota por segundo
  const presion = kprog(T, K.Tu + 0.6, K.Tu + 3.2, kEase.suave);
  const hunde = kprog(T, K.S + 0.5, K.S + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 10 cubetas, unas 4 nunca llegan */}
      <Escena T={T} a={K.G} b={K.F}>
        <FondoLunares color={KC.cyan} />
        {svg(cubetas(K.G, K.G + 2.6))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · fugas en la red, en la calle */}
      <Escena T={T} a={K.F} b={K.Tu}>
        <div style={{ position:'absolute', inset:0, background:KC.cyan }} />
        {svg(<>
          <rect x={0} y={700} width={KW} height={60} fill="#6f7782" stroke={KC.ink} strokeWidth={6} />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={40 + i * 190} y={724} width={90} height={10} fill={KC.yellow} />)}
          <rect x={0} y={760} width={KW} height={520} fill={TIERRA} />
          {Array.from({ length: 30 }, (_, i) => { const r = krng(i + 3); return <circle key={i} cx={r() * KW} cy={790 + r() * 460} r={4 + r() * 8} fill={TIERRA2} />; })}
          <Tubo x0={-20} x1={1100} y={1000} g={70} uniones={4} />
          <Chorro T={T} x={520} y={965} fuerza={kprog(T, K.F + 0.3, K.F + 1.0)} alto={200} />
          {kprog(T, K.F + 0.8, K.F + 2) > 0 && <ellipse cx={520} cy={702} rx={160 * kprog(T, K.F + 0.8, K.F + 2.5)} ry={14} fill={AGUA2} stroke={KC.ink} strokeWidth={4} />}
          <Casa x={890} y={700} s={0.95} />
          <text x={140} y={1110} style={{ font:`700 34px ${KF.mono}` }} fill={KC.paper}>tubería de la red →</text>
          <text x={540} y={670} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>la calle</text>
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · desgaste y exceso de presión */}
      <Escena T={T} a={K.Tu} b={K.S}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Tubo x0={-40} x1={1120} y={960} g={200} uniones={3} oxido={kprog(T, K.Tu + 0.2, K.Tu + 1.2)} />
          <Manometro x={270} y={600} r={130} valor={0.25 + 0.7 * presion} />
          <line x1={270} y1={790} x2={270} y2={860} stroke="#9aa7b4" strokeWidth={30} />
          <Chorro T={T} x={640} y={860} fuerza={0.35 + 0.65 * presion} alto={260} n={11} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · el suelo se mueve de forma dispareja: el tubo se agrieta */}
      <Escena T={T} a={K.S} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:KC.orange }} />
        {svg(<>
          <rect x={0} y={640} width={KW} height={60} fill="#6f7782" stroke={KC.ink} strokeWidth={6} />
          <rect x={0} y={700} width={540} height={560} fill={TIERRA} stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(0 ${hunde * 110})`}>
            <rect x={540} y={700} width={540} height={560} fill={TIERRA2} stroke={KC.ink} strokeWidth={6} />
            <rect x={540} y={640} width={540} height={60} fill="#6f7782" stroke={KC.ink} strokeWidth={6} />
          </g>
          <Tubo x0={-20} x1={540} y={930} g={70} uniones={2} />
          <g transform={`translate(540 930) rotate(${hunde * 9}) translate(-540 -930)`}><Tubo x0={548} x1={1120} y={930} g={70} uniones={2} /></g>
          <Chorro T={T} x={544} y={900} fuerza={kprog(T, K.S + 2.0, K.S + 2.8)} alto={170} />
          <g opacity={kprog(T, K.S + 0.6, K.S + 1.2)}>
            {[700, 820, 940].map((xx) => <path key={xx} d={`M ${xx} 760 l 0 ${60 + hunde * 30} m -18 -22 l 18 22 l 18 -22`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" transform={`translate(0 ${hunde * 110 - 210})`} />)}
          </g>
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Gd} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <Cubeta T={T} x={290} y={1190} s={0.8} lleno={0.5} /></>)}
      </Escena>
      {/* 6 · Guadalajara: del agua que trae de Chapala, una cuarta parte no llega */}
      <Escena T={T} a={K.Gd} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Ciudad x={70} y={830} s={0.95} />
          <ellipse cx={830} cy={900} rx={210} ry={95} fill={AGUA} stroke={KC.ink} strokeWidth={7} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${740 + i * 70} ${885 + (i % 2) * 22} q 18 -8 36 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
          <path d="M 640 910 L 300 910 L 300 835" stroke="#9aa7b4" strokeWidth={34} fill="none" strokeLinejoin="round" />
          <Chorro T={T} x={470} y={895} fuerza={kprog(T, K.Gd + 3.0, K.Gd + 3.6)} alto={90} n={6} />
          {Array.from({ length: 4 }, (_, i) => { const ll = kprog(T, K.Gd + 0.4 + i * 0.15, K.Gd + 0.9 + i * 0.15, kEase.sale); const baja = i === 3 ? kprog(T, K.Gd + 3.0, K.Gd + 4.4, kEase.suave) : 0;
            return <Cubeta key={i} T={T} x={330 + i * 130} y={1130} s={0.6} lleno={ll * (1 - baja)} color={i === 3 ? mixHex(AGUA, GRIS, baja) : AGUA} fuga={i === 3 ? Math.sin(Math.PI * baja) : 0} />; })}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · el estudio de 2018: el mundo pierde o no cobra 346 millones de m³ al día */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.18)" />
        {svg(<g opacity={kprog(T, K.E + 3.3, K.E + 3.9)}><Globo T={T} x={640} y={720} r={210} gotas={kprog(T, K.E + 3.6, K.E + 4.4)} /></g>)}
      </Escena>
      {/* 8 · más de cien mil albercas olímpicas al día */}
      <Escena T={T} a={K.A} b={K.L}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{Array.from({ length: 50 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10); return <Alberca key={i} x={70 + c * 96} y={760 + f * 72} w={84} h={50} on={T > K.A + 0.1 + i * 0.03 ? 1 : 0} />; })}</>)}
      </Escena>
      {/* 9 · la llave que gotea: una gota por segundo */}
      <Escena T={T} a={K.L} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={150} y={520} width={50} height={160} fill="#c9d3dd" stroke={KC.ink} strokeWidth={6} />
          <Llave x={300} y={600} s={1.1} />
          <Goteo T={T} x={398} y0={680} y1={880} cada={1} desde={K.L + 0.2} color={AGUA2} r={14} />
          <Garrafon x={398} y={1140} lleno={0.08 + 0.75 * kprog(T, K.L + 0.3, K.R + 1)} />
        </>)}
      </Escena>
      {/* 10 · más de 180 regaderazos */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 6 }, (_, i) => { const c = i % 3, f = Math.floor(i / 3); const on = kprog(T, K.R + 0.3 + i * 0.25, K.R + 0.5 + i * 0.25);
          return <Regadera key={i} T={T} x={330 + c * 260} y={790 + f * 220} on={on} />; })}</>)}
      </Escena>
      {/* 11 · cierre: regreso a las 10 cubetas; la que gotea en tu casa se cierra */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{cubetas(K.C - 0.8, K.C - 0.3)}
          <Llave x={260} y={620} s={0.9} />
          <Goteo T={T} x={340} y0={690} y1={800} cada={1} desde={K.C} hasta={K.C + 2.6} color={AGUA2} r={12} />
          <g opacity={kprog(T, K.C + 2.8, K.C + 3.2)}><circle cx={470} cy={600} r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M 448 600 l 16 18 l 28 -34" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 2.8} until={K.F - 0.2} valor={4} dur={0.8} sufijo=" de 10" etiqueta="cubetas que no llegan:" x={300} y={620} tam={130} color={KC.yellow} />
      <Etq T={T} at={K.G + 0.6} until={K.F - 0.2} x={60} y={790} texto="del tubo de la ciudad →" tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 0.6} until={K.Tu - 0.2} texto="CDMX 2022: 37–42 % en fugas de la red" y={1450} x={540} tam={32} borde={KC.red} />
      <Etq T={T} at={K.F + 1.0} until={K.Tu - 0.2} x={590} y={860} texto="fuga" tam={34} color={KC.paper} />
      <Etq T={T} at={K.Tu + 0.8} until={K.S - 0.2} x={700} y={1110} texto="desgaste" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Tu + 1.6} until={K.S - 0.2} x={60} y={420} texto="exceso de presión" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Tu + 0.4} until={K.S - 0.2} texto="SACMEX: desgaste · sobrepresión" y={1450} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.S + 1.0} until={K.P - 0.2} x={1040} y={470} texto="el suelo baja disparejo" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.S + 2.4} until={K.P - 0.2} x={600} y={800} texto="grieta" tam={34} color={KC.paper} />
      <Etq T={T} at={K.Gd + 0.6} until={K.E - 0.2} x={60} y={510} texto="Guadalajara" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Gd + 1.0} until={K.E - 0.2} x={1040} y={1030} texto="Lago de Chapala" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Gd + 3.4} until={K.E - 0.2} texto="fugas · evaporación · fallas" y={420} x={340} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Gd + 1.6} until={K.E - 0.2} texto="Jalisco 2025: agua de Chapala, ~¼ no llega (25–30 %)" y={1450} x={540} tam={27} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.E + 3.3} anio="2018" quien="Liemberger y Wyatt" revista="Water Supply · agua perdida o no cobrada" y={760} />
      <NumeroGigante T={T} at={K.E + 3.8} until={K.A - 0.2} valor={346} dur={1.4} sufijo=" millones" etiqueta="de m³ de agua al día" x={540} y={1040} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.E + 4.4} until={K.A - 0.2} texto="perdida o no cobrada · todo el mundo" y={1450} x={540} tam={30} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.A + 0.1} until={K.L - 0.2} valor={100000} dur={1.6} prefijo="+" etiqueta="albercas olímpicas al día" x={640} y={560} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.A + 0.5} until={K.L - 0.2} texto="olímpicas de 2 m de hondo (2,500 m³)" y={1450} x={540} tam={30} borde={KC.ink} />
      <Cronometro T={T} at={K.L + 0.2} until={K.R - 0.2} factor={1} x={420} y={330} etiqueta="1 GOTA POR SEGUNDO" />
      <NumeroGigante T={T} at={K.L + 2.6} until={K.R - 0.2} valor={11000} dur={1.8} prefijo="+" sufijo=" L" etiqueta="en un año" x={760} y={900} tam={100} color={KC.cyan} />
      <Chip T={T} at={K.L + 0.8} until={K.R - 0.2} texto="EPA (EUA): +3,000 galones al año" y={1450} x={540} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.R + 1.2} until={K.C - 0.2} valor={180} dur={1.4} prefijo="+" etiqueta="regaderazos" x={640} y={520} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.R + 0.4} until={K.C - 0.2} texto="EPA (EUA) · llave con 1 gota/s, en un año" y={1450} x={540} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.9} until={K.Ou - 0.1} texto="esta sí depende de ti" y={480} x={340} tam={34} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="10 cubetas: *unas 4 nunca llegan.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Tu - 0.1} texto="CDMX, 2022: *fugas en la red.*" />
      <Subtitulo T={T} idx={2} at={K.Tu + 0.1} until={K.S - 0.1} texto="Tubos gastados y *demasiada presión.*" />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.P - 0.1} texto="El suelo se mueve: *los tubos se agrietan.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Gd - 0.1} texto="¿Y en *Guadalajara?*" />
      <Subtitulo T={T} idx={5} at={K.Gd + 0.1} until={K.E - 0.1} texto="Agua de Chapala: *¼ no llega.*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.A - 0.1} texto="En el mundo: *346 millones de m³ al día.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.L - 0.1} texto="Más de *100 mil albercas olímpicas.*" />
      <Subtitulo T={T} idx={8} at={K.L + 0.1} until={K.R - 0.1} texto="1 gota por segundo: *+11 mil litros al año.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.C - 0.1} texto="Más de *180 regaderazos.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="La que gotea en tu casa: *esa sí.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tubos + 0.3, CUES.Suelo - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Guadalajara + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Guadalajara + 4.5, CUES.Estudio - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 4.5, CUES.Albercas + 2.5, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Llave + 0.5, CUES.Regaderas - 1.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Regaderas + 2.0, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="32" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FugasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FugasShot /></CompositionStage></div>;
}
window.FugasApp = FugasApp;
