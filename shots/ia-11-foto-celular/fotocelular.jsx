// Shot IA #11 · Tu foto de noche no es una foto: son hasta trece — NARRADO (N1 "Por dentro").
// Datos: Liba et al. 2019 (Night Sight, ACM TOG 38(6):164), Hasinoff et al. 2016 (HDR+, ACM TOG 35(6):192),
// Wronski et al. 2019 (Super Res Zoom, ACM TOG 38(4):28), blog.google 18 abr 2023. Ver guion.md y verificacion.md.
// Todo es esquemático (el dibujo no es una foto real).

// ---------- La foto de noche (vertical, viewBox 300×400) ----------
// ruido 0..1 (granitos), oscuro 0..1 (subexpuesta), tinte 0..1 (naranja del farol), gris 0..1 (como la ve el ojo),
// barrido 0..1 (foto larga movida por el temblor), corrida = [dx, dy] en px del viewBox.
const FN_VENT = (() => { const r = krng(41), v = [];
  for (let i = 0; i < 22; i++) v.push({ x: r() < 0.5 ? 12 + Math.floor(r() * 4) * 22 : 212 + Math.floor(r() * 3) * 26, y: 70 + Math.floor(r() * 10) * 24, on: r() > 0.45 });
  return v; })();
const FN_EST = (() => { const r = krng(7); return Array.from({ length: 18 }, () => ({ x: r() * 300, y: r() * 120, s: 1 + r() * 2 })); })();
function EscenaNoche({ T = 0 }) {
  const brillo = 0.32 + 0.04 * Math.sin(T * 3);
  return <g>
    <rect x={0} y={0} width={300} height={400} fill="#121a3d" />
    {FN_EST.map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={e.s} fill="#fff" opacity={0.5 + 0.4 * Math.sin(T * 2 + i)} />)}
    <circle cx={70} cy={58} r={24} fill="#fff4cf" stroke={KC.ink} strokeWidth={3} />
    <circle cx={80} cy={52} r={22} fill="#121a3d" />
    <rect x={0} y={60} width={104} height={300} fill="#232c55" stroke={KC.ink} strokeWidth={3} />
    <rect x={204} y={58} width={100} height={300} fill="#1e2650" stroke={KC.ink} strokeWidth={3} />
    {FN_VENT.map((w, i) => <rect key={i} x={w.x} y={w.y} width={14} height={14} fill={w.on ? '#ffd66b' : '#141a38'} stroke={KC.ink} strokeWidth={1.5} />)}
    <rect x={0} y={330} width={300} height={70} fill="#2b2f45" />
    <ellipse cx={226} cy={350} rx={70} ry={14} fill="#ffb84d" opacity={0.28} />
    <circle cx={226} cy={150} r={70} fill="#ffb84d" opacity={brillo * 0.6} />
    <circle cx={226} cy={150} r={36} fill="#ffcf73" opacity={brillo} />
    <rect x={222} y={150} width={8} height={196} fill="#3b3f52" stroke={KC.ink} strokeWidth={2.5} />
    <path d="M 206 150 L 246 150 L 238 136 L 214 136 Z" fill="#3b3f52" stroke={KC.ink} strokeWidth={2.5} />
    <circle cx={226} cy={155} r={8} fill="#fff1b8" />
    {/* persona */}
    <circle cx={140} cy={248} r={17} fill="#d99a6c" stroke={KC.ink} strokeWidth={3} />
    <path d="M 124 242 Q 140 222 157 242 L 157 236 Q 140 214 123 236 Z" fill="#2a1a12" />
    <path d="M 118 340 L 122 276 Q 140 264 158 276 L 162 340 Z" fill={KC.red} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <rect x={126} y={338} width={11} height={30} fill="#26304f" stroke={KC.ink} strokeWidth={2.5} />
    <rect x={143} y={338} width={11} height={30} fill="#26304f" stroke={KC.ink} strokeWidth={2.5} />
    <circle cx={134} cy={246} r={2} fill={KC.ink} /><circle cx={146} cy={246} r={2} fill={KC.ink} />
    <path d="M 134 256 Q 140 260 146 256" stroke={KC.ink} strokeWidth={2} fill="none" />
  </g>;
}
function FotoNoche({ x, y, w = 300, T = 0, ruido = 0, oscuro = 0, tinte = 0, gris = 0, barrido = 0, corrida = [0, 0], seed = 1, marco = true }) {
  const h = w * 4 / 3;
  const r = krng(seed * 1000 + Math.floor(T * 10)), n = Math.round(420 * ruido), puntos = [];
  for (let i = 0; i < n; i++) { const c = r(); puntos.push(<rect key={i} x={r() * 300} y={r() * 400} width={2.5 + r() * 3} height={2.5 + r() * 3}
    fill={c < 0.3 ? '#ff5a5a' : c < 0.6 ? '#5affb0' : c < 0.8 ? '#6aa8ff' : '#ffffff'} opacity={0.35 + r() * 0.5} />); }
  const copias = barrido > 0 ? 6 : 1;
  return <g transform={`translate(${x} ${y})`}>
    <svg x={-w / 2} y={-h / 2} width={w} height={h} viewBox="0 0 300 400">
      <g style={{ filter: gris > 0 ? `grayscale(${gris}) brightness(${1 - gris * 0.35})` : 'none' }}>
        {Array.from({ length: copias }, (_, k) => { const a = copias > 1 ? (k / (copias - 1) - 0.5) : 0;
          return <g key={k} opacity={copias > 1 ? 0.3 : 1} transform={`translate(${corrida[0] + a * 38 * barrido} ${corrida[1] + Math.sin(k * 2.1) * 14 * barrido})`}><EscenaNoche T={T} /></g>; })}
        <rect x={0} y={0} width={300} height={400} fill="#ff8a1f" opacity={tinte * 0.42} />
      </g>
      <rect x={0} y={0} width={300} height={400} fill="#000" opacity={oscuro * 0.78} />
      {puntos}
    </svg>
    {marco && <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="none" stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Celular con la foto en pantalla.
function Celular({ x, y, s = 1, rot = 0, children }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-360} width={380} height={720} rx={52} fill="#1a1c22" stroke={KC.ink} strokeWidth={9} />
    <rect x={-168} y={-334} width={336} height={668} rx={34} fill="#05060a" />
    {children}
    <rect x={-50} y={-326} width={100} height={22} rx={11} fill="#1a1c22" />
    <circle cx={0} cy={300} r={22} fill="none" stroke="#fff" strokeWidth={5} opacity=".85" />
  </g>;
}
// Mano esquemática que sostiene el celular desde abajo.
function Mano({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 120 Q -170 -10 -120 -60 L -60 -40 Q -40 40 -20 60 L 120 60 Q 170 70 160 140 L 150 320 L -120 320 Z" fill="#e0a77c" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => <path key={i} d={`M 150 ${-10 + i * 50} q 60 0 60 22 q 0 22 -60 22`} fill="#e0a77c" stroke={KC.ink} strokeWidth={7} />)}
  </g>;
}
// Abanico de N fotos que salen del celular (abre 0..1).
function Abanico({ x, y, T, abre, n = 13, w = 170 }) {
  const out = [];
  for (let i = 0; i < n; i++) { const u = n === 1 ? 0 : i / (n - 1), a = klerp(-62, 62, u) * abre, d = 330 * abre;
    const px = x + Math.sin(a * Math.PI / 180) * d * 1.25, py = y - Math.cos(a * Math.PI / 180) * d * 0.55 + 40 * abre;
    out.push(<g key={i} transform={`translate(${px} ${py}) rotate(${a * 0.6})`} opacity={kclamp(abre * 3 - u, 0, 1)}>
      <rect x={-w / 2 - 8} y={-w * 2 / 3 - 8} width={w + 16} height={w * 4 / 3 + 16} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <FotoNoche x={0} y={0} w={w} T={T} ruido={0.8} oscuro={0.55} seed={i + 3} marco={false} />
      <text x={-w / 2 + 6} y={-w * 2 / 3 + 26} style={{ font: `700 24px ${KF.mono}` }} fill="#fff">{i + 1}</text>
    </g>); }
  return <g>{out}</g>;
}
// Sensor: mosaico de pixeles (rojo/verde/azul) donde caen poquitos fotones.
const SEN_COLS = 8, SEN_FILAS = 5, SEN_C = 104;
const SEN_FOT = (() => { const r = krng(77); return Array.from({ length: 26 }, () => ({ c: Math.floor(r() * SEN_COLS), f: Math.floor(r() * SEN_FILAS), t: r() * 3.8, dx: r() })); })();
function Sensor({ T, a, x = 124, y = 700 }) {
  const lleg = Array(SEN_COLS * SEN_FILAS).fill(0), fot = [];
  SEN_FOT.forEach((p, i) => { const t0 = a + 0.6 + p.t, u = kprog(T, t0, t0 + 0.7); const cx = x + p.c * SEN_C + SEN_C / 2, cy = y + p.f * SEN_C + SEN_C / 2;
    if (u > 0 && u < 1) fot.push(<circle key={i} cx={cx + (p.dx - 0.5) * 30} cy={klerp(320, cy, u)} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />);
    if (u >= 1) lleg[p.f * SEN_COLS + p.c]++; });
  const celdas = [];
  for (let f = 0; f < SEN_FILAS; f++) for (let c = 0; c < SEN_COLS; c++) {
    const col = (f % 2 === 0) ? (c % 2 === 0 ? '#ff4d4d' : '#3fdc7a') : (c % 2 === 0 ? '#3fdc7a' : '#4d7bff'), k = lleg[f * SEN_COLS + c];
    const e = kprog(T, a + 0.05 + (c + f) * 0.03, a + 0.35 + (c + f) * 0.03);
    celdas.push(<g key={`${f}-${c}`} opacity={e}>
      <rect x={x + c * SEN_C + 6} y={y + f * SEN_C + 6} width={SEN_C - 12} height={SEN_C - 12} rx={10} fill={col} opacity={0.22 + 0.35 * Math.min(k, 2)} stroke={KC.ink} strokeWidth={4} />
      {k > 0 && <circle cx={x + c * SEN_C + SEN_C / 2} cy={y + f * SEN_C + SEN_C / 2} r={10 + 6 * k} fill="#fff6c4" opacity={0.85} />}
    </g>);
  }
  return <g>{celdas}{fot}</g>;
}
// Foto partida en mosaicos que se acomodan (alinea 0..1).
function Mosaicos({ x, y, w, T, alinea, ruido, oscuro }) {
  const h = w * 4 / 3, cols = 4, filas = 5, r = krng(5), out = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
    const dx = (r() - 0.5) * 70 * (1 - alinea), dy = (r() - 0.5) * 70 * (1 - alinea), tw = w / cols, th = h / filas;
    out.push(<g key={`${f}-${c}`} transform={`translate(${dx} ${dy})`}>
      <svg x={x - w / 2 + c * tw} y={y - h / 2 + f * th} width={tw} height={th} viewBox={`${c * 75} ${f * 80} 75 80`} preserveAspectRatio="none">
        <EscenaNoche T={T} />
        <rect x={0} y={0} width={300} height={400} fill="#000" opacity={oscuro * 0.78} />
      </svg>
      <rect x={x - w / 2 + c * tw} y={y - h / 2 + f * th} width={tw} height={th} fill="none" stroke={KC.cyan} strokeWidth={3 * (1 - alinea) + 0.5} opacity={0.8 * (1 - alinea) + 0.1} />
    </g>);
  }
  return <g>{out}<FotoNoche x={x} y={y} w={w} T={T} ruido={ruido} oscuro={0} seed={9} marco={false} /><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} fill="none" stroke={KC.ink} strokeWidth={6} /></g>;
}
// Mosaico de miniaturas (las 5 000 fotos de entrenamiento), esquemático.
function Miniaturas({ T, at, x = 90, y = 990, cols = 15, filas = 3 }) {
  const r = krng(12), out = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) { const i = f * cols + c, e = kprog(T, at + i * 0.025, at + 0.3 + i * 0.025);
    const tono = ['#ffb84d', '#6aa8ff', '#ff7a7a', '#7affc2', '#ffe08a', '#c7a2ff'][Math.floor(r() * 6)];
    out.push(<g key={i} opacity={e} transform={`translate(${x + c * 60} ${y + f * 56})`}>
      <rect width={52} height={46} rx={6} fill="#1b2347" stroke={KC.ink} strokeWidth={3} />
      <circle cx={34} cy={16} r={8} fill={tono} /><rect x={6} y={28} width={40} height={12} fill="#2f375c" />
    </g>); }
  return <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0 }}>{out}</svg>;
}
// Gotero de "blanco" que señala la foto.
function Gotero({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-120} width={28} height={70} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <path d="M -12 -52 L 12 -52 L 6 20 L 0 34 L -6 20 Z" fill="#e8f4ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={50} r={9} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Caja del "modelo aprendido" (no se dibuja como red neuronal: el modelo de 2019, FFCC, no lo es).
function CajaModelo({ x, y, T, act = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-70} width={220} height={140} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-80 + i * 28} y={30 - (20 + 40 * Math.abs(Math.sin(i * 1.7 + T * 2 * act)))} width={18} height={20 + 40 * Math.abs(Math.sin(i * 1.7 + T * 2 * act))} fill={i % 2 ? KC.orange : KC.cyan} stroke={KC.ink} strokeWidth={3} />)}
    <text x={0} y={60} textAnchor="middle" style={{ font: `700 22px ${KF.mono}` }} fill={KC.ink}>modelo</text>
  </g>;
}
// Flecha gruesa.
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink }) {
  const xm = klerp(x1, x2, p), ym = klerp(y1, y2, p), ang = Math.atan2(y2 - y1, x2 - x1);
  return <g opacity={p > 0 ? 1 : 0}>
    <line x1={x1} y1={y1} x2={xm} y2={ym} stroke={color} strokeWidth={12} strokeLinecap="round" />
    {p > 0.95 && <path d={`M ${x2} ${y2} l ${-34 * Math.cos(ang - 0.5)} ${-34 * Math.sin(ang - 0.5)} M ${x2} ${y2} l ${-34 * Math.cos(ang + 0.5)} ${-34 * Math.sin(ang + 0.5)}`} stroke={color} strokeWidth={12} strokeLinecap="round" />}
  </g>;
}
// Rejilla de pixeles con muestras de dos fotos corridas media casilla (Super Res Zoom, esquemático).
function RejillaZoom({ x, y, T, a, lado = 380 }) {
  const n = 5, c = lado / n, cor = kprog(T, a + 1.2, a + 2.2, kEase.sale) * 0.5, out = [];
  for (let i = 0; i <= n; i++) { out.push(<line key={`v${i}`} x1={x + i * c} y1={y} x2={x + i * c} y2={y + lado} stroke="#fff" strokeOpacity=".35" strokeWidth={3} />);
    out.push(<line key={`h${i}`} x1={x} y1={y + i * c} x2={x + lado} y2={y + i * c} stroke="#fff" strokeOpacity=".35" strokeWidth={3} />); }
  for (let f = 0; f < n; f++) for (let k = 0; k < n; k++) {
    out.push(<circle key={`a${f}-${k}`} cx={x + k * c + c / 2} cy={y + f * c + c / 2} r={11} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />);
    if (cor > 0.02) out.push(<circle key={`b${f}-${k}`} cx={x + k * c + c / 2 + cor * c} cy={y + f * c + c / 2 + cor * c} r={11} fill={KC.pink} stroke={KC.ink} strokeWidth={3} />);
  }
  return <g>
    <rect x={x - 14} y={y - 14} width={lado + 28} height={lado + 28} rx={20} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
    {out}
  </g>;
}

function FotoCelular() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.Sensor, Pu: CUES.Pulso, R: CUES.Rafaga, A: CUES.Alinear, P: CUES.Pregunta, Cl: CUES.Clasico, Co: CUES.Color, E: CUES.Estudio, Te: CUES.Temblor, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0 }}>{c}</svg>;
  // gancho: el abanico se abre desde el clic (cuadro 0); cierre: el abanico se cierra en una sola foto
  const abreG = kprog(T, K.G + 0.15, K.G + 1.6, kEase.sale);
  const abreC = 1 - kprog(T, K.C + 1.0, K.C + 2.6, kEase.suave);
  const limpia = kprog(T, K.C + 2.2, K.C + 3.0, kEase.sale);
  const tiembla = (amp, f = 10) => Math.sin(T * f * 2 * Math.PI) * amp;
  const alinea = kprog(T, K.A + 0.4, K.A + 2.2, kEase.suave), junta = kprog(T, K.A + 2.4, K.A + 4.2, kEase.suave);
  const corrige = kprog(T, K.Co + 1.6, K.Co + 2.6, kEase.sale);
  const limpiaIA = kprog(T, K.H + 1.0, K.H + 2.4, kEase.suave);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: KC.dark }}>
      {/* 1 · gancho: tu foto de noche se abre en 13 fotos */}
      <Escena T={T} a={K.G} b={K.S}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Abanico x={330} y={760} T={T} abre={abreG} />
          <Mano x={300} y={1150} s={0.9} />
          <Celular x={330} y={870} s={0.8} rot={-4}>
            <FotoNoche x={0} y={0} w={336} T={T} ruido={0.05} seed={2} marco={false} />
            <rect x={-168} y={-334} width={336} height={668} rx={34} fill="#fff" opacity={0.9 * (1 - kprog(T, K.G, K.G + 0.25))} />
          </Celular>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 1.4} until={K.S - 0.2} valor={13} dur={1.0} prefijo="×" x={800} y={1010} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.G + 4.7} until={K.S - 0.2} texto="modo noche · Pixel · 2019" x={720} y={600} tam={36} borde={KC.yellow} />

      {/* 2 · el sensor: pixeles diminutos, poquita luz */}
      <Escena T={T} a={K.S} b={K.Pu} zoom={0.08}>
        <div style={{ position: 'absolute', inset: 0, background: KC.noche }} />
        <Ambiente T={T} n={30} color="rgba(255,225,26,.25)" tam={[3, 8]} />
        {svg(<Sensor T={T} a={K.S} />)}
      </Escena>
      <Chip T={T} at={K.S + 0.3} until={K.Pu - 0.2} texto="por dentro · el sensor" x={330} y={470} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.S + 2.6} until={K.Pu - 0.2} texto="poca luz → foto con ruido" x={540} y={1150} tam={36} borde={KC.red} />

      {/* 3 · una foto larga sale barrida */}
      <Escena T={T} a={K.Pu} b={K.R}>
        <FondoLunares color={KC.pink} />
        {svg(<g transform={`translate(${tiembla(10, 3)} ${tiembla(6, 2.3)})`}>
          <Mano x={510} y={1180} s={0.9} />
          <Celular x={540} y={880} s={0.78}>
            <FotoNoche x={0} y={0} w={336} T={T} barrido={kprog(T, K.Pu + 0.4, K.Pu + 1.6)} seed={4} marco={false} />
          </Celular>
        </g>)}
      </Escena>
      <Chip T={T} at={K.Pu + 0.3} until={K.R - 0.2} texto="1 foto larga = foto movida" x={540} y={430} tam={38} borde={KC.ink} />

      {/* 4 · la ráfaga: muchas fotos cortas */}
      <Escena T={T} a={K.R} b={K.A}>
        <div style={{ position: 'absolute', inset: 0, background: KC.noche }} />
        {svg(<>{Array.from({ length: 13 }, (_, i) => { const c = i % 5, f = Math.floor(i / 5), e = kprog(T, K.R + 0.3 + i * 0.2, K.R + 0.5 + i * 0.2, kEase.rebote);
          return <g key={i} opacity={kclamp(e * 2, 0, 1)} transform={`translate(${170 + c * 185} ${775 + f * 152}) scale(${klerp(0.45, 0.88, e)})`}>
            <rect x={-62} y={-82} width={124} height={164} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            <FotoNoche x={0} y={0} w={110} T={T} ruido={0.9} oscuro={0.6} seed={i + 20} marco={false} />
            <text x={-52} y={-56} style={{ font: `700 22px ${KF.mono}` }} fill="#fff">{i + 1}</text>
          </g>; })}</>)}
      </Escena>
      <Chip T={T} at={K.R + 0.4} until={K.A - 0.2} texto="ráfaga · hasta ⅓ de segundo cada una" x={640} y={470} tam={32} borde={KC.yellow} />

      {/* 5 · alinear por pedacitos y juntar */}
      <Escena T={T} a={K.A} b={K.P}>
        <div style={{ position: 'absolute', inset: 0, background: KC.noche }} />
        {svg(<Mosaicos x={540} y={850} w={430} T={T} alinea={alinea} ruido={0.9 * (1 - junta) + 0.04} oscuro={0.6 * (1 - junta)} />)}
      </Escena>
      <Chip T={T} at={K.A + 0.3} until={K.A + 2.3} texto="1 · alinear por pedacitos" x={540} y={410} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.A + 2.4} until={K.P - 0.2} texto="2 · juntar: el ruido baja" x={540} y={410} tam={36} borde={KC.mint} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cl} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={280} y={1080} textAnchor="middle" style={{ font: `400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.P + 0.2} until={K.Cl - 0.1} texto="¿dónde está la IA?" x={300} y={470} tam={40} borde={KC.ink} />

      {/* 7 · en 2019: alinear y juntar = matemática clásica */}
      <Escena T={T} a={K.Cl} b={K.Co}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <RedNeuronal T={T} x={250} y={880} ancho={580} alto={260} capas={[3, 5, 5, 3]} o={kprog(T, K.Cl + 1.6, K.Cl + 2.0)} />
        {svg(<g opacity={kprog(T, K.Cl + 2.0, K.Cl + 2.4)}>
          <line x1={230} y1={870} x2={850} y2={1160} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
          <line x1={850} y1={870} x2={230} y2={1160} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
        </g>)}
      </Escena>
      <Chip T={T} at={K.Cl + 0.9} until={K.Co - 0.2} texto="2019 · alinear y juntar" x={540} y={560} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Cl + 1.2} until={K.Co - 0.2} texto="matemática clásica: Fourier, filtro de Wiener" x={540} y={680} tam={30} mono borde={KC.cyan} />
      <Chip T={T} at={K.Cl + 2.2} until={K.Co - 0.2} texto="no es red neuronal" x={540} y={1180} tam={34} borde={KC.red} />

      {/* 8 · lo aprendido: el color (balance de blancos) */}
      <Escena T={T} a={K.Co} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <FotoNoche x={250} y={880} w={220} T={T} tinte={1} seed={6} />
          <CajaModelo x={540} y={880} T={T} act={1} />
          <Flecha x1={375} y1={880} x2={420} y2={880} p={kprog(T, K.Co + 0.8, K.Co + 1.1)} />
          <Flecha x1={660} y1={880} x2={705} y2={880} p={kprog(T, K.Co + 1.4, K.Co + 1.7)} />
          <g opacity={kprog(T, K.Co + 1.5, K.Co + 1.9)}><FotoNoche x={830} y={880} w={220} T={T} tinte={1 - corrige} seed={6} /></g>
          <g opacity={kprog(T, K.Co + 3.0, K.Co + 3.3)}><Gotero x={250 + 180 * kprog(T, K.Co + 3.3, K.Co + 5.0, kEase.suave)} y={1040} s={0.6} rot={-20} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Co + 0.3} until={K.E - 0.2} texto="lo aprendido: el color" x={360} y={460} tam={38} borde={KC.ink} />
      <Miniaturas T={T} at={K.Co + 3.0} y={1060} filas={2} />
      <Chip T={T} at={K.Co + 3.4} until={K.E - 0.2} texto="5 000 fotos ajustadas por fotógrafos" x={540} y={1180} tam={32} borde={KC.ink} />

      {/* 9 · el estudio: hasta 0.3 lux */}
      <Escena T={T} a={K.E} b={K.Te}>
        <FondoLunares color={KC.cyan} />
        {svg(<g opacity={kprog(T, K.E + 2.4, K.E + 2.8)}>
          <FotoNoche x={330} y={930} w={260} T={T} gris={1} oscuro={0.45} seed={8} />
          <FotoNoche x={760} y={930} w={260} T={T} seed={8} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.3} anio="2019" quien="Google Research · Liba et al." revista="ACM Transactions on Graphics" y={760} />
      <NumeroGigante T={T} at={K.E + 2.4} until={K.Te - 0.2} valor={0.3} dec={1} dur={0.8} sufijo=" lux" x={640} y={540} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.E + 2.9} until={K.Te - 0.2} texto="tus ojos" x={330} y={1150} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.E + 3.2} until={K.Te - 0.2} texto="el celular" x={760} y={1150} tam={34} borde={KC.yellow} />

      {/* 10 · el temblor de tu mano (Super Res Zoom, artículo 2019) */}
      <Escena T={T} a={K.Te} b={K.H}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g transform={`translate(${tiembla(7, 10)} ${tiembla(4, 7)})`}>
            <Mano x={250} y={1130} s={0.62} />
            <Celular x={270} y={900} s={0.5}><FotoNoche x={0} y={0} w={336} T={T} seed={2} marco={false} /></Celular>
          </g>
          <g opacity={kprog(T, K.Te + 0.8, K.Te + 1.2)}><RejillaZoom x={580} y={720} T={T} a={K.Te} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Te + 0.3} until={K.H - 0.2} texto="Super Res Zoom · artículo 2019" x={400} y={450} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Te + 2.6} until={K.H - 0.2} texto="tu mano: 8 a 12 temblores por segundo" x={540} y={1170} tam={32} borde={KC.red} />

      {/* 11 · hoy: desde 2023 una red neuronal también quita el ruido */}
      <Escena T={T} a={K.H} b={K.C}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={380} y={680} ancho={320} alto={300} capas={[3, 4, 4, 3]} onda={kprog(T, K.H + 0.6, K.H + 2.0)} />
        {svg(<>
          <FotoNoche x={200} y={830} w={220} T={T} ruido={0.85} seed={11} />
          <g opacity={kprog(T, K.H + 1.0, K.H + 1.4)}><FotoNoche x={880} y={830} w={220} T={T} ruido={0.85 * (1 - limpiaIA)} seed={11} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.H + 0.3} until={K.C - 0.2} texto="desde 2023 · red neuronal contra el ruido" x={540} y={1120} tam={30} borde={KC.cyan} />

      {/* 12 · cierre: la misma foto, ahora sabes que son muchas */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Abanico x={330} y={760} T={T} abre={abreC * kprog(T, K.C, K.C + 0.8, kEase.sale)} />
          <Mano x={300} y={1150} s={0.9} />
          <Celular x={330} y={870} s={0.8} rot={-4}>
            <FotoNoche x={0} y={0} w={336} T={T} ruido={0.5 * (1 - limpia)} oscuro={0.4 * (1 - limpia)} seed={2} marco={false} />
            <rect x={-168} y={-334} width={336} height={668} rx={34} fill="#fff" opacity={0.85 * (kprog(T, K.C + 2.5, K.C + 2.65) - kprog(T, K.C + 2.65, K.C + 3.1))} />
          </Celular>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="muchas fotos → 1" x={800} y={800} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.C + 3.3} until={K.Ou} texto="matemática + IA" x={800} y={920} tam={36} borde={KC.cyan} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.G + 4.5} texto="Esa foto de noche… *son hasta 13.*" />
      <Subtitulo T={T} idx={1} at={K.G + 4.5} until={K.S - 0.1} texto="Google lo describió *en 2019.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.Pu - 0.1} texto="Poquita luz = *foto con ruido.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.R - 0.1} texto="Una foto larga: *sale barrida.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.A - 0.1} texto="Mejor una *ráfaga de fotos cortas.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Alinear y juntar: *baja el ruido.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Cl - 0.1} texto="¿Y la *inteligencia artificial?*" />
      <Subtitulo T={T} idx={7} at={K.Cl + 0.1} until={K.Co - 0.1} texto="Era *matemática clásica.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.E - 0.1} texto="Lo aprendido: *el color.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Te - 0.1} texto="Hasta *0.3 lux.*" />
      <Subtitulo T={T} idx={10} at={K.Te + 0.1} until={K.H - 0.1} texto="Para el zoom: *tu temblor.*" />
      <Subtitulo T={T} idx={11} at={K.H + 0.1} until={K.C - 0.1} texto="Desde 2023: *red neuronal.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No fue un clic: *fueron muchas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Sensor + 1.2, CUES.Sensor + 4.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Rafaga + 0.4, CUES.Alinear - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Clasico + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Color + 2.5, CUES.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Estudio + 2.6, CUES.Temblor - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Temblor + 2.5, CUES.Hoy - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Hoy + 0.3, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FotoCelularApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FotoCelular /></CompositionStage></div>;
}
window.FotoCelularApp = FotoCelularApp;
