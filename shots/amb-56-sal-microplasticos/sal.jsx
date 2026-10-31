// Shot Ambiental #56 · Tu sal también trae plástico (microplásticos en la sal de mesa) — NARRADO (N2 el número + toque de N1).
// Datos: Kim et al. 2018 (Environ. Sci. Technol.), Universidad de Colima 2026 (Talanta), NOAA, Secretaría de Economía, OMS 2022.
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático (salina, mapas, persona y partículas).

const PL = ['#ff2d78', '#2346ff', '#ffe11a', '#2fe0a8', '#ff8a1f', '#b18cff'];   // colores de plástico

// Cristal de sal: cubo en perspectiva (la sal de mesa cristaliza en cubos).
function Cubo({ x, y, l = 40, o = 1, rot = 0 }) {
  const d = l * 0.45;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={`M 0 0 L ${l} 0 L ${l} ${l} L 0 ${l} Z`} fill="#ffffff" stroke={KC.ink} strokeWidth={Math.max(2, l / 14)} strokeLinejoin="round" />
    <path d={`M 0 0 L ${d} ${-d} L ${l + d} ${-d} L ${l} 0 Z`} fill="#eef4fb" stroke={KC.ink} strokeWidth={Math.max(2, l / 14)} strokeLinejoin="round" />
    <path d={`M ${l} 0 L ${l + d} ${-d} L ${l + d} ${l - d} L ${l} ${l} Z`} fill="#cfdbe8" stroke={KC.ink} strokeWidth={Math.max(2, l / 14)} strokeLinejoin="round" />
  </g>;
}
// Microplásticos: hilito (filamento), fragmento y película.
function Hilito({ x, y, l = 200, rot = 0, color = PL[0], o = 1, T = 0, seed = 0, w = 9 }) {
  const ond = Math.sin(T * 1.5 + seed) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={`M ${-l / 2} 0 C ${-l / 4} ${-30 + ond} ${-l / 8} ${30} 0 0 S ${l / 4} ${-26 - ond} ${l / 2} ${6}`} stroke={KC.ink} strokeWidth={w + 6} fill="none" strokeLinecap="round" />
    <path d={`M ${-l / 2} 0 C ${-l / 4} ${-30 + ond} ${-l / 8} ${30} 0 0 S ${l / 4} ${-26 - ond} ${l / 2} ${6}`} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>;
}
function Fragmento({ x, y, s = 1, rot = 0, color = PL[1], o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -40 -22 L 6 -38 L 42 -10 L 30 28 L -12 36 L -44 10 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -24 -14 L 2 -24" stroke="#fff" strokeWidth={6} opacity=".5" strokeLinecap="round" />
  </g>;
}
function Pelicula({ x, y, s = 1, rot = 0, color = PL[3], o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -50 -20 Q -10 -44 40 -26 Q 56 6 34 30 Q -6 44 -44 24 Q -60 0 -50 -20 Z" fill={color} fillOpacity=".55" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Salero de vidrio con tapa de metal. motas = puntitos de colores (plástico) entre la sal. banda = colores de la bandera.
function Salero({ x, y, s = 1, rot = 0, motas = 0, banda = false, etiqueta, seed = 3 }) {
  const r = krng(seed), pts = Array.from({ length: 10 }, () => [-52 + r() * 104, -110 + r() * 150, PL[Math.floor(r() * PL.length)]]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -140 L 70 -140 L 80 60 Q 80 80 60 80 L -60 80 Q -80 80 -80 60 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -66 -60 L 66 -60 L 74 58 Q 74 72 58 72 L -58 72 Q -74 72 -74 58 Z" fill="#ffffff" />
    {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-62 + (i % 7) * 18} y={-50 + Math.floor(i / 7) * 52 + (i % 2) * 14} width={9} height={9} fill="#dfe7f0" />)}
    {pts.slice(0, Math.round(motas * pts.length)).map(([a, b, c], i) => b > -55 ? <circle key={i} cx={a} cy={b} r={7} fill={c} stroke={KC.ink} strokeWidth={3} /> : null)}
    {banda && <g><rect x={-74} y={-20} width={50} height={60} fill="#1f9e4a" /><rect x={-24} y={-20} width={48} height={60} fill="#ffffff" /><rect x={24} y={-20} width={50} height={60} fill="#e23b3b" />
      <rect x={-74} y={-20} width={148} height={60} fill="none" stroke={KC.ink} strokeWidth={5} /></g>}
    <path d="M -76 -140 Q -76 -196 0 -200 Q 76 -196 76 -140 Z" fill="#c9d2dc" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={-150} width={160} height={22} rx={8} fill="#aeb8c4" stroke={KC.ink} strokeWidth={6} />
    {[[-24, -176], [0, -184], [24, -176], [-12, -160], [12, -160]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill={KC.ink} />)}
    {etiqueta && <text x={0} y={140} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Una pizca que cae del salero al plato (granos blancos y algunos de color) y se apila.
function Pizca({ T, t0, x = 340, y0 = 760, y1 = 1120, n = 26, seed = 5, colores = 0.25 }) {
  const r = krng(seed), g = [];
  for (let i = 0; i < n; i++) {
    const ti = t0 + i * 0.07 + r() * 0.05, dx = (r() - 0.5) * 70, px = (r() - 0.5) * 150, c = r() < colores ? PL[Math.floor(r() * PL.length)] : '#ffffff';
    const u = kclamp((T - ti) / 0.5, 0, 1); if (T < ti) continue;
    const xx = x + dx + (px - dx) * u, yy = klerp(y0, y1 - 8 - Math.abs(px) * 0.06 * -1 - (1 - Math.abs(px) / 75) * 18, u * u);
    g.push(<rect key={i} x={xx - 7} y={yy - 7} width={14} height={14} rx={2} fill={c} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 37} ${xx} ${yy})`} />);
  }
  return <g>{g}</g>;
}
function Plato({ x = 340, y = 1130 }) {
  return <g><ellipse cx={x} cy={y + 8} rx={230} ry={46} fill="#e3e9f1" stroke={KC.ink} strokeWidth={7} /><ellipse cx={x} cy={y} rx={160} ry={26} fill="#f6f9fc" stroke="#b9c4d1" strokeWidth={4} /></g>;
}
// Salina vista de lado: mar a la izquierda y estanques que se evaporan. nivel 1..0.
function Salina({ T, nivel = 1, cristales = 0 }) {
  const r = krng(11);
  const charcos = [[380, 600], [640, 860], [900, 1060]];
  return <g>
    <rect x={0} y={1040} width={KW} height={200} fill="#c79a5b" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 940 ${Array.from({ length: 9 }, (_, i) => `Q ${i * 40 + 20} ${930 + Math.sin(T * 3 + i) * 10} ${i * 40 + 40} 940`).join(' ')} L 360 940 L 360 1240 L 0 1240 Z`} fill="#2f8fd8" stroke={KC.ink} strokeWidth={6} />
    <text x={160} y={1010} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">mar</text>
    {charcos.map(([a, b], i) => <g key={i}>
      <path d={`M ${a} 1040 L ${a + 14} 1150 L ${b - 14} 1150 L ${b} 1040 Z`} fill="#8f6a3b" stroke={KC.ink} strokeWidth={6} />
      <rect x={a + 10} y={1150 - 105 * nivel} width={b - a - 20} height={105 * nivel} fill="#57b2ee" opacity={0.9} />
      {Array.from({ length: 6 }, (_, k) => <Cubo key={k} x={a + 24 + k * (b - a - 60) / 6} y={1112 - (k % 2) * 10} l={26} o={cristales} rot={(k % 3 - 1) * 8} />)}
      {[0, 1].map((k) => { const c = PL[(i * 2 + k) % PL.length]; return k === 0
        ? <Hilito key={k} x={a + 70 + k * 40} y={Math.max(1130 - 105 * nivel + 14, 1080 + (1 - nivel) * 40)} l={60} w={6} rot={-8} color={c} T={T} seed={i} />
        : <Fragmento key={k} x={b - 50} y={Math.max(1135 - 105 * nivel + 14, 1100 + (1 - nivel) * 30)} s={0.35} color={c} />; })}
      {nivel > 0.15 && Array.from({ length: 3 }, (_, k) => { const u = ((T * 0.8 + k / 3 + i * 0.2) % 1); const xx = a + 40 + k * (b - a - 80) / 2;
        return <path key={'v' + k} d={`M ${xx} ${1020 - u * 260} q 14 -20 0 -40 q -14 -20 0 -40`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.9} />; })}
    </g>)}
  </g>;
}
// Persona esquemática (para la escena de salud).
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={80} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-26} cy={-338} r={9} fill={KC.ink} /><circle cx={26} cy={-338} r={9} fill={KC.ink} />
    <path d="M -22 -300 Q 0 -310 22 -300" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -120 -230 Q 0 -260 120 -230 L 140 60 L -140 60 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-90} rx={70} ry={80} fill="rgba(255,255,255,.25)" stroke="#fff" strokeWidth={5} strokeDasharray="12 10" />
  </g>;
}
// Continentes esquemáticos (manchas) para el mapa mundi.
const CONT = [
  ['América', 'M 120 180 Q 230 120 300 200 Q 290 300 240 330 Q 300 400 290 520 Q 250 620 220 560 Q 190 450 200 380 Q 120 320 120 180 Z', 210, 260],
  ['Europa', 'M 470 170 Q 540 140 590 180 Q 580 240 520 250 Q 470 230 470 170 Z', 530, 205],
  ['África', 'M 480 280 Q 590 260 620 330 Q 610 450 560 520 Q 520 520 500 430 Q 450 340 480 280 Z', 550, 390],
  ['Asia', 'M 610 150 Q 760 110 900 170 Q 940 260 860 320 Q 790 360 720 330 Q 650 300 620 250 Q 590 200 610 150 Z', 770, 235],
  ['Oceanía', 'M 820 430 Q 900 410 930 460 Q 910 510 850 500 Q 810 480 820 430 Z', 875, 465],
];

function SalShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Sa: CUES.Salina, Mi: CUES.Micro, Mn: CUES.Mina, Te: CUES.Termometro, A: CUES.Asia, P: CUES.Pregunta, Co: CUES.Colima, H: CUES.Hilitos, Sd: CUES.Salud, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // salero que se sacude (gancho y cierre)
  const sacude = (t0) => { const u = T - t0; return u < 2.4 ? Math.sin(u * 22) * 14 * kclamp(u * 3, 0, 1) : 0; };
  const saleroPizca = (t0) => <>
    <Plato />
    <Pizca T={T} t0={t0 + 0.15} />
    <Salero x={340 + sacude(t0) * 0.6} y={640} rot={150 + sacude(t0)} s={1.05} motas={0.6} />
  </>;
  // escena Mina: barras
  const bar = kprog(T, K.Mn + 0.4, K.Mn + 2.4, kEase.sale);
  const hMar = 760 * kprog(T, K.Mn + 1.8, K.Mn + 3.6, kEase.sale);
  // termómetro
  const term = kprog(T, K.Te + 0.4, K.Te + 3.8, kEase.suave);
  // hilitos: partículas en el "colador"
  const cola = kprog(T, K.H + 2.0, K.H + 4.2, kEase.suave);
  const rP = krng(42);
  const parts = Array.from({ length: 13 }, (_, i) => ({ x: 380 + rP() * 600, y: 470 + rP() * 300, rot: rP() * 180, tipo: i < 8 ? 'h' : 'f', c: PL[i % PL.length], l: 150 + rP() * 140 }));
  const chicas = Array.from({ length: 22 }, () => ({ x: 360 + rP() * 640, y: 460 + rP() * 320, r: 5 + rP() * 7, c: PL[Math.floor(rP() * PL.length)] }));
  const [cx, cy] = mxProy(-103.72, 19.24);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el salero y la pizca; luego 39 marcas (mar, mina, lago) */}
      <Escena T={T} a={K.G} b={K.Sa}>
        <FondoLunares color={KC.pink} />
        {svg(<g opacity={1 - kprog(T, K.G + 4.2, K.G + 4.8)}>{saleroPizca(K.G)}</g>)}
        {svg(<g opacity={kprog(T, K.G + 4.4, K.G + 4.9)}>
          {[['mar', 220], ['mina', 540], ['lago', 860]].map(([n, xx], i) => { const e = kprog(T, K.G + 4.5 + i * 0.35, K.G + 5.0 + i * 0.35, kEase.rebote);
            return <g key={n} transform={`translate(${xx} 900) scale(${0.3 + 0.7 * e}) translate(${-xx} -900)`}><Salero x={xx} y={900} s={0.95} motas={kprog(T, K.G + 5.2 + i * 0.3, K.G + 6.2 + i * 0.3)} etiqueta={n} seed={i + 7} /></g>; })}
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · salina: el sol evapora el agua y se quedan la sal y lo que traía */}
      <Escena T={T} a={K.Sa} b={K.Mi}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Sol T={T} x={200} y={500} r={85} />
          <Salina T={T} nivel={1 - kprog(T, K.Sa + 0.6, K.Sa + 4.2, kEase.suave)} cristales={kprog(T, K.Sa + 2.6, K.Sa + 4.4)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · microplásticos < 5 mm (fondo oscuro, aumentado) */}
      <Escena T={T} a={K.Mi} b={K.Mn}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2440 0%, ${KC.noche} 75%)` }}></div>
        {svg(<>
          {Array.from({ length: 16 }, (_, i) => <Cubo key={i} x={110 + (i % 8) * 110 + (i > 7 ? 50 : 0)} y={960 + (i > 7 ? 90 : 0) + (i % 3) * 8} l={48} rot={(i % 5 - 2) * 6} o={0.95} />)}
          <g opacity={kprog(T, K.Mi + 0.3, K.Mi + 0.8)}><Hilito x={330} y={620} l={300} rot={-12} color={PL[0]} T={T} seed={1} /></g>
          <g opacity={kprog(T, K.Mi + 0.9, K.Mi + 1.4)}><Fragmento x={760} y={600} s={1.4} rot={14} color={PL[1]} /></g>
          <g opacity={kprog(T, K.Mi + 1.5, K.Mi + 2.0)}><Pelicula x={560} y={800} s={1.5} rot={-10} color={PL[3]} /></g>
          {/* lápiz con borrador: ~5 mm */}
          <g opacity={kprog(T, K.Mi + 2.3, K.Mi + 2.9)} transform="translate(540 430)">
            <rect x={-250} y={-34} width={210} height={68} fill="#ff9fb3" stroke={KC.ink} strokeWidth={6} />
            <rect x={-40} y={-38} width={60} height={76} fill="#c9d2dc" stroke={KC.ink} strokeWidth={6} />
            <rect x={20} y={-34} width={300} height={68} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <line x1={-250} y1={-60} x2={-40} y2={-60} stroke="#fff" strokeWidth={5} /><line x1={-250} y1={-74} x2={-250} y2={-46} stroke="#fff" strokeWidth={5} /><line x1={-40} y1={-74} x2={-40} y2={-46} stroke="#fff" strokeWidth={5} />
            <text x={-145} y={-80} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">≈ 5 mm</text>
          </g>
        </>)}
        <EscalaFija texto="cristal de sal (cubo) · aumentado, esquema" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 4 · sal de mina vs. una sal de mar */}
      <Escena T={T} a={K.Mn} b={K.Te}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <line x1={300} y1={1060} x2={1040} y2={1060} stroke={KC.ink} strokeWidth={8} />
          <rect x={470} y={1060 - Math.max(6, 760 * 148 / 13629) * bar} width={150} height={Math.max(6, 760 * 148 / 13629) * bar} fill="#9a8f84" stroke={KC.ink} strokeWidth={6} />
          <rect x={790} y={1060 - hMar} width={150} height={hMar} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, i) => (1060 - 40 - i * 70 > 1060 - hMar) ? <circle key={i} cx={830 + (i % 3) * 35} cy={1060 - 40 - i * 70} r={10} fill={PL[i % PL.length]} stroke={KC.ink} strokeWidth={3} /> : null)}
          <text x={545} y={1110} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>sal de mina</text>
          <text x={865} y={1110} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>una sal de mar</text>
          <text x={545} y={1010} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={bar}>máx. 148</text>
          <text x={865} y={1040 - hMar} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Mn + 3.2, K.Mn + 3.6)}>13,629</text>
        </>)}
        <EscalaFija texto="pedacitos por kilo de sal" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · la sal de mar como termómetro de su mar */}
      <Escena T={T} a={K.Te} b={K.A}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <path d={`M 0 980 ${Array.from({ length: 14 }, (_, i) => `Q ${i * 80 + 40} ${965 + Math.sin(T * 3 + i) * 12} ${i * 80 + 80} 980`).join(' ')} L 1080 1240 L 0 1240 Z`} fill="#2f8fd8" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 14 }, (_, i) => i < 14 * term ? (i % 2 ? <Fragmento key={i} x={420 + (i * 97) % 620} y={1040 + (i % 3) * 55} s={0.4} rot={i * 30} color={PL[i % PL.length]} /> : <Hilito key={i} x={420 + (i * 97) % 620} y={1040 + (i % 3) * 55} l={70} w={6} rot={i * 20} color={PL[i % PL.length]} T={T} seed={i} />) : null)}
          <g transform="translate(240 0)">
            <rect x={-50} y={380} width={100} height={600} rx={50} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
            <circle cx={0} cy={1020} r={85} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
            <rect x={-26} y={980 - 560 * term} width={52} height={560 * term + 40} rx={26} fill={KC.red} />
            {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={50} y1={980 - 560 * q} x2={85} y2={980 - 560 * q} stroke={KC.ink} strokeWidth={6} />)}
            <text x={0} y={350} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>sal de mar</text>
            {Array.from({ length: 5 }, (_, i) => <rect key={i} x={-12 + (i % 2) * 6} y={980 - 560 * term + 30 + i * 70} width={12} height={12} fill="#fff" opacity={term > 0.1 ? 0.8 : 0} />)}
          </g>
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · Asia: de las más cargadas */}
      <Escena T={T} a={K.A} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<g transform="translate(40 420)">
          <rect x={0} y={60} width={1000} height={560} rx={40} fill="#5fb7ef" stroke={KC.ink} strokeWidth={7} />
          {CONT.map(([n, d, lx, ly]) => { const asia = n === 'Asia', k = asia ? kprog(T, K.A + 0.4, K.A + 1.2) : 0;
            return <g key={n}><path d={d} fill={asia ? mixHex('#f2d58a', '#ff3b2f', k) : '#f2d58a'} stroke={KC.ink} strokeWidth={asia ? 6 + 4 * k : 6} />
              <text x={lx} y={ly} textAnchor="middle" style={{ font:`900 ${asia ? 34 : 26}px ${KF.texto}` }} fill={KC.ink}>{n}</text></g>; })}
          {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={680 + (i * 53) % 200} cy={180 + (i * 37) % 120} r={9 * kprog(T, K.A + 0.8 + i * 0.08, K.A + 1.1 + i * 0.08)} fill={PL[i % PL.length]} stroke={KC.ink} strokeWidth={3} />)}
        </g>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · pregunta: ¿y la sal de México? */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<><text x={250} y={940} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 250 780)`}>?</text>
          <Salero x={300} y={1120} s={0.8} banda motas={0} seed={2} /></>)}
      </Escena>
      {/* 8 · Colima 2026: ≈1,950 piezas por kilo en muestras de sal de mar mexicana */}
      <Escena T={T} a={K.Co} b={K.H}>
        <FondoLunares color={KC.yellow} />
        {svg(<MapaMexico x={60} y={640} ancho={900} conCA={false}>
          <circle cx={cx} cy={cy} r={(20 + 10 * Math.max(0, Math.sin(T * 6))) / 0.9} fill={KC.red} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Co + 0.5, K.Co + 0.9)} />
          <text x={cx + 10} y={cy + 90} textAnchor="middle" style={{ font:`900 ${40 / 0.9}px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Co + 0.7, K.Co + 1.1)}>Colima</text>
        </MapaMexico>)}
        {T >= K.Co + 1.4 && <div style={{ position:'absolute', left:60, top:380, width:600, textAlign:'center', zIndex:41 }}>
          <div style={{ font:`400 150px/1 ${KF.titulo}`, color:KC.white, WebkitTextStroke:`5px ${KC.ink}`, textShadow:`6px 6px 0 ${KC.ink}` }}>≈{kformato(klerp(0, 1950, kprog(T, K.Co + 1.4, K.Co + 3.6, kEase.sale)), 0)}</div>
          <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, marginTop:8 }}>piezas por kilo de sal</div>
        </div>}
      </Escena>
      {/* 9 · la mayoría hilitos; solo se contaron las de ≥ 0.2 mm */}
      <Escena T={T} a={K.H} b={K.Sd}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 60% 40%, #1b2440 0%, ${KC.noche} 75%)` }}></div>
        {svg(<>
          {parts.map((p, i) => p.tipo === 'h'
            ? <g key={i} opacity={kprog(T, K.H + 0.2 + i * 0.08, K.H + 0.5 + i * 0.08)}><Hilito x={p.x} y={p.y - 40 * cola} l={p.l} rot={p.rot} color={p.c} T={T} seed={i} w={8} /></g>
            : <g key={i} opacity={kprog(T, K.H + 0.2 + i * 0.08, K.H + 0.5 + i * 0.08)}><Fragmento x={p.x} y={p.y - 40 * cola} s={1.1 + (i % 3) * 0.15} rot={p.rot} color={p.c} /></g>)}
          {chicas.map((c, i) => <circle key={i} cx={c.x} cy={c.y + cola * 420} r={c.r} fill={c.c} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.H + 0.6, K.H + 1.0) * (1 - kprog(T, K.H + 3.2, K.H + 4.4))} />)}
          {/* colador */}
          <g opacity={kprog(T, K.H + 1.8, K.H + 2.2)}>
            <rect x={340} y={850} width={680} height={22} rx={10} fill="none" stroke={KC.texto} strokeWidth={6} />
            {Array.from({ length: 22 }, (_, i) => <line key={i} x1={360 + i * 30} y1={850} x2={360 + i * 30} y2={872} stroke={KC.texto} strokeWidth={4} />)}
            <text x={680} y={920} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>solo se contaron ≥ 0.2 mm</text>
          </g>
          <text x={700} y={1110} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.gold2} opacity={kprog(T, K.H + 3.6, K.H + 4.0)}>?</text>
        </>)}
        <EscalaFija texto="0.2 mm (aumentado)" largo={100} y={1480} color={KC.texto} />
      </Escena>
      {/* 10 · salud: incierto */}
      <Escena T={T} a={K.Sd} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<><Persona x={380} y={1010} s={1.15} />
          <text x={380} y={960} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} transform={`rotate(${Math.sin(T * 2.5) * 6} 380 910)`} opacity={kprog(T, K.Sd + 0.5, K.Sd + 0.9)}>?</text></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: regreso al salero; adentro de la pizca, un pedacito del mar */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(saleroPizca(K.C - 0.3))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.C + 1.4} until={K.Ou - 0.2} x={330} y={480} r={170} fx={340} fy={1110} tinte={KC.cyan} etiqueta="AL MICROSCOPIO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2f8fd8" />
          <path d={`M 0 ${r * 0.7} ${Array.from({ length: 6 }, (_, i) => `Q ${i * r / 3 + r / 6} ${r * 0.62 + Math.sin(t * 3 + i) * 8} ${(i + 1) * r / 3} ${r * 0.7}`).join(' ')} L ${r * 2} 0 L 0 0 Z`} fill="#bfe7ff" />
          <Hilito x={r * 0.7} y={r * 1.2} l={110} w={7} rot={-15} color={PL[0]} T={t} />
          <Fragmento x={r * 1.35} y={r * 1.0} s={0.6} rot={20} color={PL[2]} />
          <Pelicula x={r * 1.0} y={r * 1.55} s={0.7} color={PL[3]} />
          <Cubo x={r * 0.35} y={r * 1.5} l={30} /><Cubo x={r * 1.5} y={r * 1.45} l={26} rot={10} /></svg>} />

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.3} until={K.Sa - 0.2} valor={39} dur={1.0} sufijo=" marcas" etiqueta="de sal, en 2018:" x={380} y={420} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.G + 5.6} until={K.Sa - 0.2} texto="plástico en sal de mar, de mina y de lago" y={1170} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Sa + 0.4} until={K.Mi - 0.2} texto="sal de mar = evaporación solar" y={780} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Sa + 3.2} until={K.Mi - 0.2} x={520} y={960} texto="se queda" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Mi + 0.4} until={K.Mn - 0.2} texto="microplástico: menos de 5 mm" y={1170} x={540} tam={36} borde={KC.cyan} />
      <Etq T={T} at={K.Mi + 0.6} until={K.Mn - 0.2} x={180} y={540} texto="hilito" tam={30} />
      <Etq T={T} at={K.Mi + 1.2} until={K.Mn - 0.2} x={720} y={700} texto="fragmento" lado="izq" tam={30} />
      <Etq T={T} at={K.Mi + 1.8} until={K.Mn - 0.2} x={640} y={870} texto="película" tam={30} />
      <Chip T={T} at={K.Te + 0.5} until={K.A - 0.2} texto="Kim et al. 2018 · Environ. Sci. Technol." y={1170} x={540} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.A + 0.6} until={K.P - 0.2} texto="sal de mar de Asia: de las más cargadas" y={1170} x={540} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Co + 2.0} until={K.H - 0.2} texto="U. de Colima · Talanta, 2026" y={1170} x={540} tam={32} borde={KC.ink} mono />
      <Etq T={T} at={K.H + 0.8} until={K.Sd - 0.2} x={1000} y={420} texto="hilitos: la mayoría" lado="izq" tam={30} />
      <Chip T={T} at={K.Sd + 1.0} until={K.C - 0.2} texto="OMS 2022: poca evidencia · faltan datos" y={1170} x={540} tam={32} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Sa - 0.1} texto="Esa sal *no es solo sal.*" />
      <Subtitulo T={T} idx={1} at={K.Sa + 0.1} until={K.Mi - 0.1} texto="El agua se va: *lo demás se queda.*" />
      <Subtitulo T={T} idx={2} at={K.Mi + 0.1} until={K.Mn - 0.1} texto="Microplásticos: *menos de 5 mm.*" />
      <Subtitulo T={T} idx={3} at={K.Mn + 0.1} until={K.Te - 0.1} texto="Mina: 148. Mar: *más de 13 mil.*" />
      <Subtitulo T={T} idx={4} at={K.Te + 0.1} until={K.A - 0.1} texto="La sal, *termómetro del mar.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Asia: *de las más cargadas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Y la sal *de México?*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.H - 0.1} texto="Sal de mar mexicana: *≈1,950 por kilo.*" />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.Sd - 0.1} texto="Las más chicas *ni se contaron.*" />
      <Subtitulo T={T} idx={9} at={K.Sd + 0.1} until={K.C - 0.1} texto="¿Te hace daño? *No se sabe.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un pedacito del mar, *con lo que le tiramos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Salina + 3.0, CUES.Micro + 0.5, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Mina + 2.4, CUES.Termometro - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Termometro + 2.6, CUES.Asia + 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Colima + 1.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Colima + 3.8, CUES.Hilitos - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Hilitos + 2.2, CUES.Hilitos + 5.4, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Salud + 1.2, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_10_serio_molesto', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="56" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SalApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SalShot /></CompositionStage></div>;
}
window.SalApp = SalApp;
