// Shot IA #31 · AlphaZero: revisaba mil veces menos y aun así ganaba — NARRADO (N3 "Capítulos y medidores").
// Datos: Silver et al., "A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play",
// Science 362(6419):1140–1144 (2018). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const VERDE = '#3fbf4a', GRIS = '#9aa0aa';
const CASILLA_C = '#f3e2c0', CASILLA_O = '#b07a4a';

// ---------- piezas de ajedrez (dibujo propio, trazo negro grueso) ----------
// t: 'p' peón · 'r' torre · 'n' caballo · 'b' alfil · 'q' dama · 'k' rey · col: 'w' | 'b'. Origen = base de la pieza.
function Pieza({ t, col = 'w', x = 0, y = 0, s = 1, rot = 0, o = 1, brillo = 0 }) {
  const f = col === 'w' ? '#fffaf0' : '#2a2530', st = KC.ink, sw = 5;
  const base = <path d="M -30 0 L 30 0 L 26 -12 L -26 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" />;
  let cuerpo = null;
  if (t === 'p') cuerpo = <><path d="M -18 -12 Q -14 -34 -8 -42 L 8 -42 Q 14 -34 18 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" /><circle cy={-52} r={13} fill={f} stroke={st} strokeWidth={sw} /></>;
  if (t === 'r') cuerpo = <path d="M -20 -12 L -16 -50 L -24 -50 L -24 -70 L -14 -70 L -14 -62 L -5 -62 L -5 -70 L 5 -70 L 5 -62 L 14 -62 L 14 -70 L 24 -70 L 24 -50 L 16 -50 L 20 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" />;
  if (t === 'n') cuerpo = <><path d="M -20 -12 L -14 -40 Q -26 -50 -22 -60 L -6 -72 L 0 -84 L 6 -72 Q 26 -64 22 -36 L 20 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" /><circle cx={0} cy={-62} r={3.5} fill={col === 'w' ? st : '#fffaf0'} /></>;
  if (t === 'b') cuerpo = <><path d="M -18 -12 Q -20 -40 0 -66 Q 20 -40 18 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" /><line x1={-4} y1={-50} x2={8} y2={-38} stroke={col === 'w' ? st : '#fffaf0'} strokeWidth={4} /><circle cy={-72} r={6} fill={f} stroke={st} strokeWidth={4} /></>;
  if (t === 'q') cuerpo = <><path d="M -22 -12 L -28 -66 L -12 -46 L 0 -74 L 12 -46 L 28 -66 L 22 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" />{[-28, 0, 28].map((cx) => <circle key={cx} cx={cx} cy={cx ? -70 : -79} r={5} fill={f} stroke={st} strokeWidth={3.5} />)}</>;
  if (t === 'k') cuerpo = <><path d="M -22 -12 Q -26 -44 -14 -58 L 14 -58 Q 26 -44 22 -12 Z" fill={f} stroke={st} strokeWidth={sw} strokeLinejoin="round" /><path d="M -4 -58 L -4 -70 L -12 -70 L -12 -78 L -4 -78 L -4 -88 L 4 -88 L 4 -78 L 12 -78 L 12 -70 L 4 -70 L 4 -58 Z" fill={f} stroke={st} strokeWidth={4} strokeLinejoin="round" /></>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <ellipse cx={0} cy={-36} rx={44} ry={56} fill={KC.yellow} opacity={0.55 * brillo} />}
    <ellipse cx={4} cy={2} rx={32} ry={7} fill="rgba(0,0,0,.25)" />
    {cuerpo}{base}
  </g>;
}

// Tablero visto de frente (8×8). x, y = esquina sup. izq.; lado = tamaño total. Devuelve también sq → coordenadas.
const COLS = 'abcdefgh';
function sqXY(sq, x, y, lado) { const c = COLS.indexOf(sq[0]), r = +sq[1], k = lado / 8; return [x + (c + 0.5) * k, y + (8 - r + 0.5) * k]; }
function Tablero({ x, y, lado, resalta = [], children }) {
  const k = lado / 8, cas = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) cas.push(<rect key={`${r}${c}`} x={x + c * k} y={y + r * k} width={k} height={k} fill={(r + c) % 2 ? CASILLA_O : CASILLA_C} />);
  return <g>
    <rect x={x - 22} y={y - 22} width={lado + 44} height={lado + 44} rx={20} fill="#6b3f22" stroke={KC.ink} strokeWidth={8} />
    {cas}
    {resalta.map((h, i) => { const [cx, cy] = sqXY(h.sq, x, y, lado); return <rect key={i} x={cx - k / 2} y={cy - k / 2} width={k} height={k} fill={h.color || KC.yellow} opacity={h.o == null ? 0.7 : h.o} />; })}
    <rect x={x} y={y} width={lado} height={lado} fill="none" stroke={KC.ink} strokeWidth={6} />
    {children}
  </g>;
}
const INICIO = (() => { const out = [], fila = 'rnbqkbnr';
  for (let c = 0; c < 8; c++) { out.push({ sq: COLS[c] + '1', t: fila[c], col: 'w' }, { sq: COLS[c] + '2', t: 'p', col: 'w' }, { sq: COLS[c] + '7', t: 'p', col: 'b' }, { sq: COLS[c] + '8', t: fila[c], col: 'b' }); }
  return out; })();
// Dibuja las piezas; movs: { 'e2': { a: 'e4', t0, t1 } } desliza una pieza; extra(p) devuelve props extra (rot, brillo…).
function Piezas({ T, x, y, lado, piezas = INICIO, movs = {}, extra }) {
  const k = lado / 8, s = k / 95;
  const lista = piezas.map((p) => { let [px, py] = sqXY(p.sq, x, y, lado); const m = movs[p.sq];
    if (m) { const [qx, qy] = sqXY(m.a, x, y, lado), u = kprog(T, m.t0, m.t1, kEase.suave); px = klerp(px, qx, u); py = klerp(py, qy, u) - Math.sin(Math.PI * u) * k * 0.5; }
    return { ...p, px, py: py + k * 0.36, ...(extra ? extra(p) : {}) }; });
  lista.sort((a, b) => a.py - b.py);
  return <>{lista.map((p, i) => <Pieza key={i} t={p.t} col={p.col} x={p.px} y={p.py} s={s} rot={p.rot || 0} brillo={p.brillo || 0} />)}</>;
}

// Lupa (para el robotito y para el servidor).
function Lupita({ x, y, s = 1, rot = -30, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle r={70} fill={KC.yellow} opacity={0.45 * brillo} />}
    <rect x={-9} y={38} width={18} height={70} rx={8} fill="#6b3f22" stroke={KC.ink} strokeWidth={6} />
    <circle r={42} fill="rgba(180,240,255,.55)" stroke={KC.ink} strokeWidth={10} />
    <path d="M -22 -14 Q -14 -26 0 -28" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Servidor enorme (Stockfish): torre con lucecitas y muchas lupitas. apagado 0..1.
function Servidor({ x, y, s = 1, T = 0, apagado = 0, lupas = 14 }) {
  const r = krng(7);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-230} width={220} height={460} rx={22} fill={mixHex('#3a4357', '#22252c', apagado)} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 7 }, (_, i) => <g key={i}>
      <rect x={-86} y={-205 + i * 62} width={172} height={46} rx={8} fill="#1b2130" stroke={KC.ink} strokeWidth={4} />
      {[0, 1, 2, 3].map((j) => <circle key={j} cx={-60 + j * 22} cy={-182 + i * 62} r={6} fill={(Math.sin(T * 9 + i * 3 + j * 1.7) > 0 && apagado < 0.5) ? (j % 2 ? KC.mint : KC.cyan) : '#3a3f4a'} />)}
      <rect x={30} y={-188 + i * 62} width={44} height={10} rx={4} fill="#3a3f4a" />
    </g>)}
    {Array.from({ length: lupas }, (_, i) => { const a = (i / lupas) * Math.PI * 2 + T * 0.6, rr = 150 + r() * 40;
      return <g key={i} opacity={1 - apagado}><Lupita x={Math.cos(a) * rr * 0.8} y={Math.sin(a) * rr * 1.25} s={0.32} rot={a * 57} /></g>; })}
  </g>;
}

// Mini tablero (para las partidas contra sí misma), con marca ✔ / ✗ de resultado.
function MiniTablero({ x, y, lado = 80, res = null, o = 1 }) {
  const k = lado / 4, c = [];
  for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) c.push(<rect key={`${r}${q}`} x={x + q * k} y={y + r * k} width={k} height={k} fill={(r + q) % 2 ? CASILLA_O : CASILLA_C} />);
  return <g opacity={o}>{c}<rect x={x} y={y} width={lado} height={lado} fill="none" stroke={KC.ink} strokeWidth={4} />
    {res && <g transform={`translate(${x + lado - 6} ${y + 6})`}><circle r={17} fill={res === 'g' ? VERDE : KC.red} stroke={KC.ink} strokeWidth={4} />
      <text y={9} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill="#fff">{res === 'g' ? '✔' : '✗'}</text></g>}
  </g>;
}

// Árbol de jugadas que crece de la raíz (abajo) hacia arriba. full = muchas ramas (Stockfish); si no, pocas y profundas (AlphaZero).
function Arbol({ cx, base, alto, ancho, D = 5, b = 4, crece = 1, color = KC.red, sel = null, apaga = 0, T = 0 }) {
  const lineas = [];
  const rama = (x, y, d, w, ruta) => {
    if (d >= D) return;
    const hijos = sel ? (d < 1 ? 3 : 2) : b;
    for (let i = 0; i < hijos; i++) {
      const nx = x + (i - (hijos - 1) / 2) * (w / hijos), ny = base - ((d + 1) / D) * alto, r2 = ruta + i;
      const vis = kclamp(crece * D - d, 0, 1);
      if (vis <= 0) continue;
      const elegida = sel && sel.some((s) => s.startsWith(r2));
      if (sel && !elegida && d >= 2) continue;     // AlphaZero: solo sigue las ramas prometedoras
      lineas.push({ x1: x, y1: y, x2: klerp(x, nx, vis), y2: klerp(y, ny, vis), d, elegida, key: r2 });
      if (vis >= 1) rama(nx, ny, d + 1, w / hijos, r2);
    }
  };
  rama(cx, base, 0, ancho, '');
  return <g opacity={1 - 0.75 * apaga}>
    {lineas.map((l) => { const g = sel && l.elegida;
      return <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={g ? KC.yellow : color} strokeWidth={g ? 9 : Math.max(1.5, 7 - l.d * 1.3)} strokeLinecap="round"
        opacity={g ? 1 : 0.85} style={g ? { filter:`drop-shadow(0 0 10px ${KC.yellow})` } : null} />; })}
    <circle cx={cx} cy={base} r={16} fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Chip TPU (pared de chips de entrenamiento). on 0..1.
function ChipTPU({ x, y, s = 1, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-24, -8, 8, 24].map((p) => <g key={p}><line x1={p} y1={-44} x2={p} y2={-34} stroke={KC.gold} strokeWidth={5} /><line x1={p} y1={34} x2={p} y2={44} stroke={KC.gold} strokeWidth={5} />
      <line x1={-44} y1={p} x2={-34} y2={p} stroke={KC.gold} strokeWidth={5} /><line x1={34} y1={p} x2={44} y2={p} stroke={KC.gold} strokeWidth={5} /></g>)}
    <rect x={-36} y={-36} width={72} height={72} rx={10} fill={mixHex('#2b3445', '#1f6f86', on)} stroke={KC.ink} strokeWidth={5} />
    <rect x={-18} y={-18} width={36} height={36} rx={5} fill={on > 0.5 ? KC.cyan : '#3a3f4a'} style={on > 0.5 ? { filter:`drop-shadow(0 0 8px ${KC.cyan})` } : null} />
  </g>;
}

// Mini gráfica esquemática (sube y se estabiliza).
function MiniGrafica({ T, at, x, y, w = 520, h = 150, titulo }) {
  const p = kprog(T, at, at + 2.2, kEase.sale), N = 40, pts = [];
  for (let i = 0; i <= N * p; i++) { const u = i / N, v = 1 / (1 + Math.exp(-(u - 0.35) * 12)) * 0.8 + Math.sin(u * 30) * 0.015; pts.push(`${x + u * w},${y + h - v * h}`); }
  return <g opacity={kprog(T, at - 0.2, at + 0.3)}>
    <rect x={x - 24} y={y - 60} width={w + 48} height={h + 100} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={x} y={y - 22} style={{ font:`900 25px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke={KC.ink} strokeWidth={4} /><line x1={x} y1={y} x2={x} y2={y + h} stroke={KC.ink} strokeWidth={4} />
    <polyline points={pts.join(' ')} fill="none" stroke={KC.pink} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
    <text x={x + w} y={y + h + 30} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">esquemático · horas de entrenamiento →</text>
  </g>;
}

function AlphaZero() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Reglas, A: CUES.Autojuego, H: CUES.Horas, P: CUES.Pregunta, M: CUES.Medidor, D: CUES.Duelo, Ap: CUES.Aperturas, Ch: CUES.Chips, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const TB = { x: 330, y: 690, lado: 420 };               // tablero principal
  const dM = (K.D - K.M), mMid = K.M + dM * 0.58;          // las dos frases del Medidor

  // Reglas: piezas que saltan al azar (cada 0.55 s cambian de casilla)
  const azar = (p, i) => { const per = 0.55, n = Math.floor((T - K.R - 3.0) / per), r = krng(i * 31 + Math.max(0, n) * 7); return { sq: COLS[Math.floor(r() * 8)] + (1 + Math.floor(r() * 8)) }; };
  const enAzar = T > K.R + 3.0 ? INICIO.map((p, i) => i % 3 === 0 ? { ...p, ...azar(p, i) } : p) : INICIO;

  // Duelo: 1 000 partidas
  const llen = kprog(T, K.D + 2.6, K.D + 5.6, kEase.suave);
  const ganadas = Math.round(155 * kclamp(llen / 0.155, 0, 1)), perdidas = Math.round(6 * kclamp((llen - 0.155) / 0.006, 0, 1)), tablas = Math.round(839 * kclamp((llen - 0.161) / 0.839, 0, 1));

  // Horas: curva de nivel (esquemática) que cruza a Stockfish a las 4 h
  const GX = 130, GY = 720, GW = 820, GH = 330, LV = 0.82;
  const horas = 9 * kprog(T, K.H + 0.3, K.H + 3.8, kEase.suave);
  const nivel = (h) => 1 - Math.exp(-h / 2.33);
  const curva = []; for (let h = 0; h <= horas + 0.001; h += 0.1) curva.push(`${GX + (h / 9) * GW},${GY + GH - nivel(h) * GH}`);

  // Aperturas: Gambito de Dama 1. d4 d5 2. c4
  const qg = { d2: { a: 'd4', t0: K.Ap + 0.6, t1: K.Ap + 1.1 }, d7: { a: 'd5', t0: K.Ap + 1.4, t1: K.Ap + 1.9 }, c2: { a: 'c4', t0: K.Ap + 2.2, t1: K.Ap + 2.7 } };

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el duelo, mil veces menos posiciones */}
      <Escena T={T} a={K.G - 1} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Tablero {...TB}><Piezas T={T} {...TB} movs={{ e2: { a: 'e4', t0: 0.05, t1: 0.55 }, e7: { a: 'e5', t0: 1.3, t1: 1.8 } }}
            extra={(p) => p.t === 'k' && p.col === 'b' ? { rot: 80 * kprog(T, K.G + 4.0, K.G + 4.5, kEase.rebote) } : {}} /></Tablero>
          <Robotito x={150} y={1010} s={0.5} T={T} cara="seguro" />
          <Lupita x={250} y={940} s={0.7} rot={-20} brillo={0.5 + 0.5 * Math.sin(T * 4)} />
          <Servidor x={950} y={930} s={0.42} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.5} until={K.R - 0.2} texto="AlphaZero: 60 mil /s" x={290} y={430} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.G + 1.3} until={K.R - 0.2} texto="Stockfish: 60 millones /s" x={330} y={515} tam={38} borde={KC.red} />
      <Chip T={T} at={K.G + 2.2} until={K.R - 0.2} texto="posiciones revisadas por segundo" x={300} y={595} tam={28} borde={KC.texto} />
      <Chip T={T} at={K.G + 4.3} until={K.R - 0.2} texto="…y ganó AlphaZero" x={540} y={900} tam={36} borde={KC.yellow} />

      {/* 1 · solo las reglas */}
      <Escena T={T} a={K.R} b={K.A}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Tablero {...TB}><Piezas T={T} {...TB} piezas={enAzar} /></Tablero>
          <g transform="translate(150 960)" opacity={kprog(T, K.R + 0.4, K.R + 0.9)}>
            {[0, 1, 2, 3].map((i) => <rect key={i} x={-90 + (i % 2) * 8} y={60 - i * 42} width={170} height={38} rx={6} fill={[KC.red, KC.blue, KC.orange, KC.teal][i]} stroke={KC.ink} strokeWidth={5} />)}
            <g opacity={kprog(T, K.R + 1.8, K.R + 2.1)}><line x1={-100} y1={-110} x2={100} y2={110} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /><line x1={100} y1={-110} x2={-100} y2={110} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>
          </g>
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.R + 0.4} tacharEn={K.R + 1.8} until={K.A - 0.2} texto="partidas humanas" x={310} y={440} tam={44} />
      <Chip T={T} at={K.R + 2.4} until={K.A - 0.2} texto="solo las reglas ✔" x={290} y={535} tam={42} borde={VERDE} />
      <Chip T={T} at={K.R + 3.2} until={K.A - 0.2} texto="jugadas al azar" x={280} y={612} tam={30} borde={KC.texto} />

      {/* 2 · contra sí misma */}
      <Escena T={T} a={K.A} b={K.H}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          {Array.from({ length: 16 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8), t0 = K.A + 0.8 + i * 0.16, res = T > t0 + 0.6 ? ((i * 7) % 5 === 0 ? 'p' : 'g') : null;
            return <MiniTablero key={i} x={70 + c * 120} y={610 + r * 105} lado={84} res={res} o={kprog(T, t0, t0 + 0.25)} />; })}
          <text x={540} y={872} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>AlphaZero vs. AlphaZero</text>
          <Robotito x={230} y={990} s={0.55} T={T} cara="feliz" />
          <Robotito x={850} y={990} s={0.55} T={T + 1.3} cara="seguro" color={KC.pink} />
          <Tablero x={470} y={910} lado={140} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.A + 0.3} until={K.H - 0.2} valor={44} dur={2.4} sufijo=" millones" x={370} y={520} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.A + 1.0} until={K.H - 0.2} texto="de partidas contra sí misma" x={370} y={418} tam={30} borde={KC.texto} />

      {/* 3 · horas de entrenamiento */}
      <Escena T={T} a={K.H} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={GX - 50} y={GY - 40} width={GW + 90} height={GH + 110} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
          <line x1={GX} y1={GY + GH} x2={GX + GW} y2={GY + GH} stroke={KC.ink} strokeWidth={5} /><line x1={GX} y1={GY - 10} x2={GX} y2={GY + GH} stroke={KC.ink} strokeWidth={5} />
          {[0, 4, 9].map((h) => <text key={h} x={GX + (h / 9) * GW} y={GY + GH + 42} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{h} h</text>)}
          <line x1={GX} y1={GY + GH - LV * GH} x2={GX + GW} y2={GY + GH - LV * GH} stroke={KC.red} strokeWidth={6} strokeDasharray="18 12" />
          <text x={GX + 14} y={GY + GH - LV * GH - 16} style={{ font:`900 30px ${KF.texto}` }} fill={KC.red}>nivel de Stockfish</text>
          <polyline points={curva.join(' ')} fill="none" stroke={KC.blue} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          {horas >= 4 && <circle cx={GX + (4 / 9) * GW} cy={GY + GH - LV * GH} r={16 + 30 * (1 - kprog(T, K.H + 2.0, K.H + 2.8))} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
          <text x={GX + 14} y={GY + GH - 20} style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">nivel (esquemático)</text>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.H + 0.3} until={K.P - 0.2} valor={Math.floor(horas)} dur={0.01} dec={0} sufijo=" h" etiqueta="de entrenamiento" x={330} y={560} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.H + 2.0} until={K.P - 0.2} texto="a las 4 h: ¡ya lo supera!" x={680} y={930} tam={36} borde={KC.yellow} />

      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1120} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.P + 0.3} until={K.M - 0.1} texto="¿mil veces menos… y gana?" x={540} y={470} tam={40} borde={KC.ink} />

      {/* 5 · por dentro: el árbol de jugadas */}
      <Escena T={T} a={K.M} b={K.D}>
        <FondoCircuito T={T} />
        {svg(<>
          <Arbol cx={290} base={1100} alto={400} ancho={440} D={5} crece={kprog(T, K.M + 3.6, K.M + 5.2)} color={KC.mint} sel={T > mMid + 0.6 ? ['000', '111', '2010'] : ['000', '111', '2010', '0101']} />
          <Arbol cx={800} base={1100} alto={400} ancho={480} D={5} b={4} crece={kprog(T, K.M + 0.4, K.M + 2.4)} color={KC.red} apaga={kprog(T, mMid, mMid + 0.6)} />
          {T > mMid + 0.3 && <RedNeuronalMini T={T} x={110} y={570} o={kprog(T, mMid + 0.3, mMid + 0.8)} />}
        </>)}
      </Escena>
      <Chip T={T} at={K.M + 0.4} until={mMid - 0.1} texto="Stockfish: 60 millones /s" x={770} y={600} tam={34} borde={KC.red} />
      <Chip T={T} at={K.M + 3.6} until={K.D - 0.2} texto="AlphaZero: 60 mil /s" x={290} y={470} tam={34} borde={KC.mint} />
      <Chip T={T} at={mMid + 0.9} until={K.D - 0.2} texto="hipótesis de los autores" x={770} y={780} tam={30} borde={KC.yellow} />

      {/* 6 · el duelo: 1 000 partidas */}
      <Escena T={T} a={K.D} b={K.Ap}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      <TarjetaEstudio T={T} at={K.D + 0.2} until={K.D + 2.4} anio="2018" quien="DeepMind · Londres" revista="Silver et al. · Science" y={760} />
      {T > K.D + 2.3 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.D + 2.3, K.D + 2.7) * (1 - kprog(T, K.Ap - 0.05, K.Ap + 0.45)) }}>
        <Cuadricula T={T} cols={50} filas={20} x={90} y={720} ancho={900} alto={340} llenado={llen} vacio="rgba(0,0,0,.08)"
          tramos={[{ desde: 0, hasta: 0.155, color: VERDE }, { desde: 0.155, hasta: 0.161, color: KC.red }, { desde: 0.161, hasta: 1, color: GRIS }]} />
      </div>}
      <Chip T={T} at={K.D + 2.4} until={K.Ap - 0.2} texto="1,000 partidas · 3 h + 15 s por jugada" x={400} y={600} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.D + 3.0} until={K.Ap - 0.2} texto={`ganó ${ganadas}`} x={210} y={1120} tam={38} borde={VERDE} />
      <Chip T={T} at={K.D + 4.6} until={K.Ap - 0.2} texto={`perdió ${perdidas}`} x={520} y={1120} tam={38} borde={KC.red} />
      <Chip T={T} at={K.D + 4.9} until={K.Ap - 0.2} texto={`empates ${tablas}`} x={850} y={1120} tam={38} borde={GRIS} />

      {/* 7 · aperturas humanas: Gambito de Dama */}
      <Escena T={T} a={K.Ap} b={K.Ch}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Tablero {...TB} resalta={T > K.Ap + 2.7 ? [{ sq: 'c4' }, { sq: 'd4' }, { sq: 'd5' }] : []}><Piezas T={T} {...TB} movs={qg} /></Tablero>
          <MiniGrafica T={T} at={K.Ap + 1.6} x={100} y={470} w={510} h={120} titulo="% de partidas en que la elegía" />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ap + 0.4} until={K.Ch - 0.2} texto="Gambito de Dama · 1. d4 d5 2. c4" x={540} y={690} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ap + 3.0} until={K.Ch - 0.2} texto="¡como los humanos!" x={540} y={1000} tam={40} borde={KC.yellow} />

      {/* 8 · la crítica: 5 000 chips */}
      <Escena T={T} a={K.Ch} b={K.C}>
        <FondoCircuito T={T} color={KC.gold} />
        {svg(<>{Array.from({ length: 32 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8);
          return <ChipTPU key={i} x={150 + c * 112} y={750 + r * 100} s={0.9} on={kprog(T, K.Ch + 0.3 + (c + r) * 0.08, K.Ch + 0.5 + (c + r) * 0.08)} />; })}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ch + 0.3} until={K.C - 0.2} valor={5000} dur={1.2} sufijo=" chips" x={640} y={520} tam={110} color={KC.cyan} />
      <Chip T={T} at={K.Ch + 1.2} until={K.C - 0.2} texto="TPU de Google · solo para entrenar" x={640} y={640} tam={30} borde={KC.gold} />

      {/* 9 · cierre: la misma imagen del inicio, transformada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Tablero {...TB} resalta={[{ sq: 'f7', o: 0.85 * kprog(T, K.C + 1.0, K.C + 1.5) }]}><Piezas T={T} {...TB} movs={{ e2: { a: 'e4', t0: -9, t1: -8.5 }, e7: { a: 'e5', t0: -9, t1: -8.5 } }}
            extra={(p) => p.sq === 'f7' ? { brillo: kprog(T, K.C + 1.0, K.C + 1.5) } : {}} /></Tablero>
          <Robotito x={150} y={1010} s={0.5} T={T} cara="feliz" />
          <Lupita x={klerp(250, 619, kprog(T, K.C + 0.4, K.C + 1.2, kEase.suave))} y={klerp(940, 769, kprog(T, K.C + 0.4, K.C + 1.2, kEase.suave))} s={klerp(0.7, 0.8, kprog(T, K.C + 0.4, K.C + 1.2))} rot={-20} brillo={kprog(T, K.C + 1.0, K.C + 1.5)} />
          <Servidor x={950} y={930} s={0.42} T={T} apagado={kprog(T, K.C + 1.6, K.C + 2.4)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="saber dónde mirar ✔" x={330} y={520} tam={44} borde={KC.leaf} />

      {/* capítulos (al lado del logo, para no chocar con Robert) */}
      <Capitulo T={T} x={190} y={196} hasta={K.Ou} caps={[{ at: K.R, titulo: 'Solo las reglas' }, { at: K.A, titulo: 'Contra sí misma' }, { at: K.M, titulo: 'Por dentro' }, { at: K.D, titulo: 'El duelo' }]} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Mil veces menos posiciones… *y aun así ganó.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.A - 0.1} texto="Sin partidas humanas: *solo las reglas.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.H - 0.1} texto="Contra sí misma: *44 millones de partidas.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.P - 0.1} texto="A las 4 horas *ya superaba a Stockfish.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.M - 0.1} texto="¿Cómo gana *si revisa menos?*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={mMid - 0.1} texto="60 millones *contra 60 mil por segundo.*" />
      <Subtitulo T={T} idx={6} at={mMid + 0.1} until={K.D - 0.1} texto="Su red neuronal *le señala qué mirar.*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.Ap - 0.1} texto="Mil partidas: *155 ganadas, 6 perdidas.*" />
      <Subtitulo T={T} idx={8} at={K.Ap + 0.1} until={K.Ch - 0.1} texto="Descubrió sola *aperturas humanas.*" />
      <Subtitulo T={T} idx={9} at={K.Ch + 0.1} until={K.C - 0.1} texto="Eso sí: *5,000 chips de Google.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Gana quien *sabe dónde mirar.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Reglas + 2.5, CUES.Autojuego - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Autojuego + 3.0, CUES.Horas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Horas + 1.6, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Medidor + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [mMid + 0.2, CUES.Duelo - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Duelo + 4.6, CUES.Aperturas - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Aperturas + 3.2, CUES.Chips - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Chips + 0.4, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="31" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Red neuronal chiquita que "señala" las ramas prometedoras.
function RedNeuronalMini({ T, x, y, o = 1 }) {
  const capas = [3, 4, 2], out = [];
  capas.forEach((n, i) => { for (let j = 0; j < n; j++) { const cx = x + i * 70, cy = y + (j - (n - 1) / 2) * 40;
    if (i < capas.length - 1) for (let k = 0; k < capas[i + 1]; k++) out.push(<line key={`l${i}${j}${k}`} x1={cx} y1={cy} x2={cx + 70} y2={y + (k - (capas[i + 1] - 1) / 2) * 40} stroke={KC.yellow} strokeOpacity=".5" strokeWidth={3} />);
    out.push(<circle key={`c${i}${j}`} cx={cx} cy={cy} r={12 * (1 + 0.15 * Math.sin(T * 5 + i + j))} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />); } });
  return <g opacity={o}>{out}<text x={x + 70} y={y + 100} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.yellow}>red neuronal</text></g>;
}

function AlphaZeroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AlphaZero /></CompositionStage></div>;
}
window.AlphaZeroApp = AlphaZeroApp;
