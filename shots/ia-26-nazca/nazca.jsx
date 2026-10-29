// Shot IA #26 · La IA que encontró 303 figuras escondidas en Nazca — NARRADO (N4 "La imagen que se llena" + N2 de apoyo).
// Datos: Sakai et al., "AI-accelerated Nazca survey nearly doubles the number of known figurative geoglyphs…", PNAS 121(40) e2407652121 (2024);
// actualización: comunicado de la Universidad de Yamagata, 28 jul 2025 (160 figurativas más; total 893). Ver guion.md y verificacion.md.
// Mapa, figuras y foto aérea son ESQUEMÁTICOS (el paper no publica coordenadas, por protección del sitio).

const ARENA = '#e8c48a', ARENA2 = '#d6a965', PIEDRA = '#8a5a3a', VERDE = '#7cc46a', ROSA = '#ff7aa8';
// Caja del mapa en pantalla (se usa igual en el gancho, en el campo y en el cierre: es "la imagen que se llena").
const MX = 40, MY = 430, MW = 600, MH = 740;

// Contorno esquemático de la pampa (coordenadas locales 0..600 × 0..740).
const PAMPA = 'M 40 90 C 140 60 300 70 420 95 C 520 115 575 160 570 240 C 565 330 590 420 560 520 C 535 610 470 660 380 670 C 270 680 150 665 80 620 C 30 585 20 500 30 420 C 40 330 10 240 25 170 C 30 130 30 105 40 90 Z';
function dentroPampa(x, y) { // aproximación elíptica del contorno, suficiente para repartir puntos
  const cx = 300, cy = 380, rx = 265, ry = 285; return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1;
}
function puntos(n, seed) {
  const r = krng(seed), out = [];
  while (out.length < n) { const x = 30 + r() * 540, y = 90 + r() * 580; if (dentroPampa(x, y)) out.push([x, y]); }
  return out;
}
const P430 = puntos(430, 11), P303 = puntos(303, 29), P160 = puntos(160, 47);
// Senderos sinuosos (los de relieve están junto a senderos antiguos).
const SENDEROS = (() => { const r = krng(5), out = []; for (let k = 0; k < 9; k++) { let x = 60 + r() * 480, y = 120 + r() * 120, d = `M ${x.toFixed(0)} ${y.toFixed(0)}`;
  for (let i = 0; i < 9; i++) { x += (r() - 0.5) * 120; y += 45 + r() * 25; x = Math.max(50, Math.min(550, x)); d += ` Q ${(x + (r() - 0.5) * 60).toFixed(0)} ${(y - 25).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)}`; }
  out.push(d); } return out; })();

// El mapa que se llena: negros = conocidos (hasta 2020), amarillos = los 303 de 2022/23, rosas = los 160 anunciados en 2025.
function MapaNazca({ T, negros = 430, amarillos = 0, rosas = 0, o = 1, children }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o }}>
    <g transform={`translate(${MX} ${MY})`}>
      <path d={PAMPA} fill="rgba(0,0,0,.25)" transform="translate(12 14)" />
      <path d={PAMPA} fill={ARENA} stroke={KC.ink} strokeWidth={8} />
      {/* valles con agua y cultivos: Ingenio (norte) y Nazca (sur) */}
      <path d="M 10 70 C 150 30 330 50 590 80" stroke={VERDE} strokeWidth={34} fill="none" strokeLinecap="round" opacity=".9" />
      <path d="M 10 70 C 150 30 330 50 590 80" stroke="#3a8fd6" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 20 690 C 180 700 380 700 590 640" stroke={VERDE} strokeWidth={34} fill="none" strokeLinecap="round" opacity=".9" />
      <path d="M 20 690 C 180 700 380 700 590 640" stroke="#3a8fd6" strokeWidth={8} fill="none" strokeLinecap="round" />
      {SENDEROS.map((d, i) => <path key={i} d={d} stroke={ARENA2} strokeWidth={5} fill="none" strokeDasharray="10 8" opacity=".9" />)}
      {P430.slice(0, Math.round(negros)).map(([x, y], i) => <circle key={'n' + i} cx={x} cy={y} r={6} fill={KC.ink} />)}
      {P303.slice(0, Math.round(amarillos)).map(([x, y], i) => <circle key={'a' + i} cx={x} cy={y} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
      {P160.slice(0, Math.round(rosas)).map(([x, y], i) => <circle key={'r' + i} cx={x} cy={y} r={7} fill={ROSA} stroke={KC.ink} strokeWidth={3} />)}
      <text x={300} y={30} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>río Ingenio</text>
      <text x={300} y={734} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>río Nazca</text>
      {children}
    </g>
  </svg>;
}

// Llama en relieve (estilo de las figuras chicas): piedras quitadas = claro, piedras amontonadas = borde oscuro.
function LlamaRelieve({ x, y, s = 1, o = 1, contorno = 0 }) {
  const d = 'M -90 40 C -100 0 -60 -20 0 -20 C 40 -20 60 -30 70 -60 L 72 -130 C 72 -150 84 -160 100 -158 L 104 -178 L 112 -160 C 130 -156 140 -146 138 -134 C 130 -128 112 -128 104 -122 L 104 -50 C 104 -10 90 20 80 40 L 84 110 L 66 110 L 60 50 L -50 55 L -56 110 L -74 110 L -76 50 C -86 50 -94 46 -90 40 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={d} fill="#f3e1bd" stroke="#6b4428" strokeWidth={14} strokeLinejoin="round" />
    <path d="M -90 30 C -110 10 -112 -6 -100 -14" stroke="#6b4428" strokeWidth={10} fill="none" strokeLinecap="round" />
    {contorno > 0 && <path d={d} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="16 10" opacity={contorno} />}
  </g>;
}
// Suelo del desierto visto de cerca: piedritas oscuras sobre tierra clara.
function SueloPiedras({ seed = 3, n = 520, x0 = 0, y0 = 0, w = KW, h = KH }) {
  const r = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x = x0 + r() * w, y = y0 + r() * h, rr = 4 + r() * 12;
    return <ellipse key={i} cx={x} cy={y} rx={rr} ry={rr * (0.6 + r() * 0.4)} fill={r() > 0.5 ? PIEDRA : '#a8714a'} opacity={0.65 + r() * 0.3} transform={`rotate(${r() * 180} ${x} ${y})`} />; })}</g>;
}
// Personita para la escala (1.7 m).
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={20} fill={KC.ink} />
    <path d="M 0 -128 L 0 -60 M 0 -110 L -26 -80 M 0 -110 L 26 -80 M 0 -60 L -18 0 M 0 -60 L 18 0" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" fill="none" />
  </g>;
}
// Huellas que avanzan por un camino (p 0..1).
function Huellas({ pts, p, color = KC.ink }) {
  const n = pts.length, k = Math.floor(n * p);
  return <g>{pts.slice(0, k).map(([x, y], i) => <ellipse key={i} cx={x + (i % 2 ? 7 : -7)} cy={y} rx={5} ry={9} fill={color} opacity=".85" />)}</g>;
}
const CAMINO = (() => { const out = []; for (let i = 0; i < 60; i++) { const u = i / 59; out.push([120 + 380 * u + Math.sin(u * 9) * 40, 620 - 470 * u + Math.cos(u * 7) * 30]); } return out; })();
// Dron chiquito.
function Dron({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 4) * 6}) scale(${s})`}>
    <path d="M -60 -30 L 60 30 M -60 30 L 60 -30" stroke={KC.ink} strokeWidth={10} />
    {[[-60, -30], [60, 30], [-60, 30], [60, -30]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={34} ry={7} fill="rgba(22,18,15,.5)" transform={`rotate(${(T * 900 + i * 45) % 360} ${a} ${b})`} />)}
    <rect x={-24} y={-16} width={48} height={32} rx={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Íconos de los motivos (esquemáticos).
function IcHumanoide() { return <g><circle cx={0} cy={-46} r={26} fill="#f3e1bd" stroke="#6b4428" strokeWidth={9} /><circle cx={-9} cy={-50} r={4} fill="#6b4428" /><circle cx={9} cy={-50} r={4} fill="#6b4428" />
  <path d="M -30 -14 L 30 -14 L 22 50 L -22 50 Z" fill="#f3e1bd" stroke="#6b4428" strokeWidth={9} strokeLinejoin="round" /><path d="M -30 -10 L -56 20 M 30 -10 L 56 20" stroke="#6b4428" strokeWidth={9} strokeLinecap="round" /></g>; }
function IcCabeza() { return <g><circle cx={0} cy={0} r={38} fill="#f3e1bd" stroke="#6b4428" strokeWidth={9} /><circle cx={-13} cy={-6} r={5} fill="#6b4428" /><circle cx={13} cy={-6} r={5} fill="#6b4428" />
  <path d="M -12 18 L 12 18" stroke="#6b4428" strokeWidth={6} strokeLinecap="round" />{[-24, -8, 8, 24].map((a) => <path key={a} d={`M ${a} -36 L ${a * 1.3} -62`} stroke="#6b4428" strokeWidth={7} strokeLinecap="round" />)}</g>; }
function IcAve() { return <g><path d="M -60 -6 C -30 -30 -10 -10 0 0 C 10 -10 30 -30 60 -6 C 30 -4 14 6 6 18 L 0 40 L -6 18 C -14 6 -30 -4 -60 -6 Z" fill="#f3e1bd" stroke="#6b4428" strokeWidth={8} strokeLinejoin="round" /></g>; }
// Tarjeta de motivo con porcentaje.
function Motivo({ T, at, x, y, titulo, pct, icono, tachar = null, chico = false }) {
  if (T < at - 0.01) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), r = tachar == null ? 0 : kprog(T, tachar, tachar + 0.35, kEase.sale), sc = chico ? 0.8 : 1;
  return <div style={{ position:'absolute', left:x, top:y, width:290 * sc, height:300 * sc, transform:`translate(-50%,-50%) scale(${e})`, zIndex:40,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:28, boxShadow:`10px 10px 0 ${KC.ink}`, textAlign:'center', overflow:'hidden', filter:`grayscale(${r})` }}>
    <svg width={290 * sc} height={150 * sc} viewBox="-100 -80 200 140">{icono}</svg>
    <div style={{ font:`400 ${86 * sc}px/1 ${KF.titulo}`, color: chico ? '#7a6a5a' : KC.ink }}>{pct}</div>
    <div style={{ font:`900 ${30 * sc}px ${KF.texto}`, color:KC.ink, marginTop:6 }}>{titulo}</div>
    {r > 0 && <div style={{ position:'absolute', left:-10, top:'52%', height:14, width:`${r * 110}%`, background:KC.red, transform:'rotate(-20deg)', transformOrigin:'0 50%', borderRadius:7 }}></div>}
  </div>;
}
// Columnas 430 → 733 → 893.
function Columnas({ T, at, filas, base = 930, alto = 470, max = 893 }) {
  return <>{filas.map((f, i) => { if (T < f.at) return null; const g = kprog(T, f.at, f.at + 1.0, kEase.sale), h = alto * f.valor / max * g;
    return <div key={i} style={{ position:'absolute', left:f.x, top:base - h, width:150, height:h, zIndex:40, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:'16px 16px 0 0', boxShadow:`8px 0 0 ${KC.ink}` }}>
      <div style={{ position:'absolute', left:'50%', top:-86, transform:'translateX(-50%)', font:`400 74px ${KF.titulo}`, color:KC.ink, whiteSpace:'nowrap' }}>{kformato(Math.round(f.valor * g))}</div>
      <div style={{ position:'absolute', left:'50%', top:h + 8, transform:'translateX(-50%)', font:`900 28px/1.1 ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap', textAlign:'center' }}>{f.etiqueta}</div>
    </div>; })}</>;
}
// Pastel de los 303.
function Pastel({ T, at, cx, cy, r, partes }) {
  const tot = partes.reduce((a, p) => a + p.v, 0); let acc = 0;
  const g = kprog(T, at, at + 1.6, kEase.suave);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <circle cx={cx + 12} cy={cy + 14} r={r} fill="rgba(0,0,0,.25)" />
    {partes.map((p, i) => { const a0 = acc / tot, a1 = Math.min((acc + p.v) / tot, g); acc += p.v; if (a1 <= a0) return null;
      const P = (a) => [cx + r * Math.sin(a * 2 * Math.PI), cy - r * Math.cos(a * 2 * Math.PI)], [x0, y0] = P(a0), [x1, y1] = P(a1);
      return <path key={i} d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1} Z`} fill={p.color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />; })}
    <circle cx={cx} cy={cy} r={r * 0.42} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <text x={cx} y={cy + 30} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>303</text>
  </svg>;
}
function Leyenda({ T, at, y, color, texto }) {
  if (T < at) return null; const e = kprog(T, at, at + 0.35, kEase.sale);
  return <div style={{ position:'absolute', left:80, top:y, zIndex:41, display:'flex', alignItems:'center', gap:18, opacity:e, transform:`translateX(${(1 - e) * -40}px)` }}>
    <div style={{ width:46, height:46, borderRadius:12, background:color, border:`5px solid ${KC.ink}` }}></div>
    <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink }}>{texto}</div>
  </div>;
}

function Nazca() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Ocultas, E: CUES.Escaner, F: CUES.Filtro, P: CUES.Pregunta, C: CUES.Campo, Es: CUES.Estudio, M: CUES.Matiz, Mo: CUES.Motivos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const negros = 430 * kprog(T, K.G + 0.15, K.G + 3.6, kEase.suave), amarillos = 303 * kprog(T, K.G + 4.6, K.G + 7.4, kEase.suave);
  // escáner: barrido de arriba a abajo
  const barrido = kprog(T, K.E + 0.3, K.E + 4.6), yScan = 420 + barrido * 760;
  const CAL = [[300, 640, 0.95], [620, 900, 0.7], [820, 560, 0.55], [200, 1020, 0.6], [520, 480, 0.4]];
  const tachados = Math.round(35 * kprog(T, K.F + 0.6, K.F + 3.2, kEase.suave));
  const pasos = kprog(T, K.C + 0.2, K.C + 4.4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el mapa se llena (430 en casi un siglo, 303 en seis meses) */}
      <Escena T={T} a={K.G} b={K.O} zoom={0.04} origen="30% 50%">
        <FondoLunares color={KC.orange} />
        <MapaNazca T={T} negros={negros} amarillos={amarillos} />
      </Escena>
      <Chip T={T} at={K.G + 0.15} until={K.O - 0.2} texto="Nazca, Perú · esquema" x={340} y={380} tam={34} borde={KC.ink} />
      <div style={{ position:'absolute', left:860, top:960, zIndex:41, transform:'translate(-50%,-50%)', textAlign:'center', opacity:kprog(T, K.G + 0.15, K.G + 0.5) * (1 - kprog(T, K.O - 0.2, K.O + 0.2)) }}>
        <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink }}>casi 100 años</div>
        <div style={{ font:`400 130px/1 ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>{kformato(Math.round(negros))}</div>
        {T > K.G + 4.4 && <><div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, marginTop:18 }}>con IA · 6 meses</div>
          <div style={{ font:`400 130px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>+{kformato(Math.round(amarillos))}</div></>}
      </div>

      {/* 2 · de cerca: una figura de ~9 m casi borrada */}
      <Escena T={T} a={K.O} b={K.E} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#cf9f68' }}></div>
        {svg(<>
          <SueloPiedras seed={8} n={620} />
          <LlamaRelieve x={470} y={830} s={2.3} o={klerp(0.18, 0.55, kprog(T, K.O + 1.0, K.O + 2.6))} contorno={kprog(T, K.O + 1.6, K.O + 2.4)} />
          <g opacity={kprog(T, K.O + 2.4, K.O + 2.9)}><Persona x={880} y={1060} s={0.55} />
            <line x1={150} y1={1130} x2={790} y2={1130} stroke={KC.ink} strokeWidth={8} /><line x1={150} y1={1110} x2={150} y2={1150} stroke={KC.ink} strokeWidth={8} /><line x1={790} y1={1110} x2={790} y2={1150} stroke={KC.ink} strokeWidth={8} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 2.6} until={K.O + 4.5} texto="≈ 9 m · promedio de las figuras en relieve" x={500} y={1185} tam={30} borde={KC.ink} fondo={KC.paper} color={KC.ink} />
      <Chip T={T} at={K.O + 1.7} until={K.O + 4.5} texto="contorno agregado como guía" x={330} y={420} tam={28} borde={KC.yellow} />
      <Chip T={T} at={K.O + 4.6} until={K.E - 0.15} texto="figuras de línea: ≈ 90 m en promedio" x={540} y={420} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.O + 4.6} until={K.E - 0.15} texto="en relieve: ≈ 9 m · ¡10 veces más chicas!" x={540} y={1185} tam={30} borde={KC.ink} fondo={KC.paper} color={KC.ink} />

      {/* 3 · la IA escanea la foto aérea en cuadritos */}
      <Escena T={T} a={K.E} b={K.F} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#d8ad74' }}></div>
        {svg(<>
          <SueloPiedras seed={21} n={900} />
          {SENDEROS.map((d, i) => <path key={i} d={d} transform="translate(60 380) scale(1.6 1.2)" stroke="#f0d4a2" strokeWidth={6} fill="none" opacity=".8" />)}
          {Array.from({ length: 17 }, (_, i) => <line key={'v' + i} x1={i * 66} y1={420} x2={i * 66} y2={Math.min(yScan, 1180)} stroke={KC.ink} strokeOpacity=".35" strokeWidth={2} />)}
          {Array.from({ length: 13 }, (_, j) => 420 + j * 66 <= yScan && <line key={'h' + j} x1={0} y1={420 + j * 66} x2={KW} y2={420 + j * 66} stroke={KC.ink} strokeOpacity=".35" strokeWidth={2} />)}
          {CAL.map(([cx, cy, pr], k) => cy < yScan && <g key={k} opacity={kprog(T, K.E + 0.3 + (cy - 420) / 760 * 4.3, K.E + 0.8 + (cy - 420) / 760 * 4.3)}>
            {Array.from({ length: 9 }, (_, q) => { const dx = (q % 3) - 1, dy = Math.floor(q / 3) - 1, w = pr * (1 - 0.35 * (Math.abs(dx) + Math.abs(dy)));
              return <rect key={q} x={Math.floor(cx / 66) * 66 + dx * 66} y={420 + Math.floor((cy - 420) / 66) * 66 + dy * 66} width={66} height={66} fill={w > 0.6 ? KC.red : KC.yellow} opacity={0.25 + 0.45 * w} />; })}
            <rect x={Math.floor(cx / 66) * 66 - 80} y={420 + Math.floor((cy - 420) / 66) * 66 - 80} width={226} height={226} fill="none" stroke={KC.cyan} strokeWidth={7} rx={8} />
          </g>)}
          <rect x={0} y={yScan - 6} width={KW} height={12} fill={KC.cyan} opacity={barrido < 1 ? 0.85 : 0} />
          <Robotito x={900} y={1080} s={0.42} T={T} cara="seguro" />
        </>)}
      </Escena>
      <Chip T={T} at={K.E + 0.4} until={K.F - 0.15} texto="fotos aéreas · 10 cm por píxel" x={380} y={380} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.E + 2.0} until={K.F - 0.15} texto="cada cuadrito ≈ 11 × 11 m" x={420} y={1185} tam={34} borde={KC.cyan} />

      {/* 4 · de cada 36 sugerencias, una prometía */}
      <Escena T={T} a={K.F} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 36 }, (_, i) => { const c = i % 6, rr = Math.floor(i / 6), x = 360 + c * 104, y = 520 + rr * 104, gana = i === 21;
          const idxT = gana ? -1 : (i < 21 ? i : i - 1), tach = idxT >= 0 && idxT < tachados;
          return <g key={i} transform={`translate(${x} ${y})`} opacity={kprog(T, K.F + 0.05 + i * 0.012, K.F + 0.3 + i * 0.012)}>
            <rect x={-44} y={-44} width={88} height={88} rx={10} fill={gana && T > K.F + 3.3 ? KC.yellow : '#d8ad74'} stroke={KC.ink} strokeWidth={5} opacity={tach ? 0.45 : 1} />
            <rect x={-26} y={-26} width={52} height={52} fill="none" stroke={KC.cyan} strokeWidth={4} opacity={tach ? 0.3 : 1} />
            {tach && <path d="M -34 -34 L 34 34 M 34 -34 L -34 34" stroke={KC.red} strokeWidth={9} strokeLinecap="round" />}
            {gana && T > K.F + 3.3 && <text y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>★</text>}
          </g>; })}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.F + 3.3} until={K.P - 0.15} valor={1} desde={36} dur={0.6} prefijo="36 → " etiqueta="" x={680} y={1185} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.F + 0.4} until={K.P - 0.15} texto="47,410 recuadros revisados a ojo" x={640} y={400} tam={32} borde={KC.ink} />

      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.C} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        <MapaNazca T={T} negros={430} amarillos={0} o={0.35} />
        {svg(<text x={280} y={1060} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.cyan} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 880)`}>?</text>)}
      </Escena>

      {/* 6 · a pie */}
      <Escena T={T} a={K.C} b={K.Es} zoom={0.04} origen="30% 50%">
        <FondoLunares color={KC.mint} />
        <MapaNazca T={T} negros={430} amarillos={0}>
          <Huellas pts={CAMINO} p={pasos} />
          {CAMINO.filter((_, i) => i % 6 === 5 && i / 60 < pasos).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill="none" stroke={KC.red} strokeWidth={6} />)}
        </MapaNazca>
        {svg(<Dron x={MX + 120 + 380 * pasos} y={MY + 520 - 420 * pasos} s={0.7} T={T} />)}
      </Escena>
      <div style={{ position:'absolute', left:860, top:880, zIndex:41, transform:'translate(-50%,-50%)', textAlign:'center', opacity:kprog(T, K.C + 0.3, K.C + 0.6) * (1 - kprog(T, K.Es - 0.2, K.Es + 0.2)) }}>
        <div style={{ font:`400 140px/1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>{kformato(Math.round(341 * pasos))}</div>
        <div style={{ font:`900 34px/1.15 ${KF.texto}`, color:KC.ink }}>puntos<br />visitados<br />a pie</div>
      </div>
      <Chip T={T} at={K.C + 1.2} until={K.Es - 0.15} texto="sep 2022 – feb 2023" x={340} y={380} tam={36} borde={KC.ink} />

      {/* 7 · el estudio y el conteo nuevo */}
      <Escena T={T} a={K.Es} b={K.M}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <Columnas T={T} filas={[
        { at: K.Es + 0.2, x: 80, valor: 430, color: '#6b6258', etiqueta: 'hasta 2020' },
        { at: K.Es + 0.9, x: 280, valor: 733, color: KC.yellow, etiqueta: '2024 · +303' },
        { at: K.Es + 7.4, x: 480, valor: 893, color: ROSA, etiqueta: '2025 · +160' }]} />
      {T > K.Es && T < K.M + 0.4 && <div style={{ position:'absolute', left:80, top:370, zIndex:40, font:`900 34px ${KF.texto}`, color:KC.ink, opacity:kprog(T, K.Es + 0.2, K.Es + 0.6) * (1 - kprog(T, K.M - 0.1, K.M + 0.3)) }}>figuras conocidas en Nazca</div>}
      <TarjetaEstudio T={T} at={K.Es + 3.0} until={K.Es + 7.1} anio="2024" quien="Universidad de Yamagata + IBM" revista="Sakai et al. · PNAS (con Univ. París 1 y DLR)" y={1090} />
      <Chip T={T} at={K.Es + 7.6} until={K.M - 0.15} texto="anuncio de la Univ. de Yamagata · jul 2025" x={540} y={1090} tam={30} borde={ROSA} />

      {/* 8 · el matiz: quién encontró qué */}
      <Escena T={T} a={K.M} b={K.Mo}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      {T > K.M - 0.45 && T < K.Mo + 0.45 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.M - 0.45, K.M + 0.05) * (1 - kprog(T, K.Mo - 0.05, K.Mo + 0.45)) }}>
        <Pastel T={T} at={K.M + 0.3} cx={400} cy={700} r={240} partes={[{ v: 178, color: KC.yellow }, { v: 66, color: ROSA }, { v: 59, color: VERDE }]} />
      </div>}
      <Leyenda T={T} at={K.M + 0.5} y={990} color={KC.yellow} texto="178 · las señaló la IA" />
      <Leyenda T={T} at={K.M + 2.6} y={1060} color={ROSA} texto="66 · en grupos junto a esas" />
      <Leyenda T={T} at={K.M + 3.8} y={1130} color={VERDE} texto="59 · las hallaron personas sin la IA" />
      {T > K.Mo - 0.1 && null}

      {/* 9 · qué dibujaban las chicas */}
      <Escena T={T} a={K.Mo} b={K.Ci}>
        <FondoLunares color={KC.pink} />
      </Escena>
      {T > K.Mo - 0.45 && T < K.Ci + 0.45 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.Ci - 0.05, K.Ci + 0.45) }}>
        <Chip T={T} at={K.Mo + 0.1} until={K.Ci - 0.15} texto="figuras en relieve (683)" x={340} y={400} tam={34} borde={KC.ink} />
        <Motivo T={T} at={K.Mo + 0.4} tachar={K.Mo + 1.6} x={250} y={630} titulo="animal salvaje" pct="6.9 %" icono={<IcAve />} chico />
        <Motivo T={T} at={K.Mo + 2.4} x={250} y={1000} titulo="humanoides" pct="33.8 %" icono={<IcHumanoide />} />
        <Motivo T={T} at={K.Mo + 2.9} x={570} y={1000} titulo="llamas" pct="14.9 %" icono={<LlamaRelieve x={10} y={20} s={0.45} />} />
        <Motivo T={T} at={K.Mo + 3.5} x={570} y={640} titulo="cabezas cortadas" pct="32.9 %" icono={<IcCabeza />} />
      </div>}

      {/* 10 · cierre: el mismo mapa, ya lleno; la IA señala, las huellas confirman */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="30% 50%">
        <FondoLunares color={KC.orange} />
        <MapaNazca T={T} negros={430} amarillos={303} rosas={160 * kprog(T, K.Ci + 0.1, K.Ci + 1.2)}>
          <circle cx={430} cy={250} r={70} fill="rgba(0,210,255,.18)" stroke={KC.cyan} strokeWidth={9} opacity={kprog(T, K.Ci + 0.2, K.Ci + 0.6)} />
          <line x1={480} y1={300} x2={540} y2={360} stroke={KC.cyan} strokeWidth={14} strokeLinecap="round" opacity={kprog(T, K.Ci + 0.2, K.Ci + 0.6)} />
          <Huellas pts={CAMINO.slice(10, 50)} p={kprog(T, K.Ci + 0.8, K.Ci + 2.4)} />
          <g opacity={kprog(T, K.Ci + 2.4, K.Ci + 2.8)}><LlamaRelieve x={430} y={260} s={0.42} o={1} /></g>
        </MapaNazca>
      </Escena>
      <Chip T={T} at={K.Ci + 0.3} until={K.Ou} texto="la IA propone" x={860} y={860} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Ci + 2.4} until={K.Ou} texto="caminar confirma ✔" x={840} y={960} tam={36} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="Casi 100 años: *430.* Con IA: *303 más en 6 meses.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.E - 0.1} texto="Unos *9 metros*… y casi borradas." />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.F - 0.1} texto="La IA revisó *cuadritos de 11 metros.*" />
      <Subtitulo T={T} idx={3} at={K.F + 0.1} until={K.P - 0.1} texto="De cada 36 sugerencias, *solo 1 prometía.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.C - 0.1} texto="¿Cómo saber *cuáles eran reales?*" />
      <Subtitulo T={T} idx={5} at={K.C + 0.1} until={K.Es - 0.1} texto="Caminando: *341 puntos a pie.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.M - 0.1} texto="303 confirmadas: *casi el doble.* 2025: *160 más.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.Mo - 0.1} texto="*178* las señaló la IA; las demás, *no solo ella.*" />
      <Subtitulo T={T} idx={8} at={K.Mo + 0.1} until={K.Ci - 0.1} texto="Casi sin animales salvajes: *personas, llamas, cabezas.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La IA dice dónde mirar; *caminar dice qué es real.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Ocultas + 1.4, CUES.Escaner - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Escaner + 4.6, CUES.Filtro + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Filtro + 0.6, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Campo + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Estudio + 7.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Matiz + 0.4, CUES.Motivos - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Motivos + 0.4, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="26" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NazcaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Nazca /></CompositionStage></div>;
}
window.NazcaApp = NazcaApp;
