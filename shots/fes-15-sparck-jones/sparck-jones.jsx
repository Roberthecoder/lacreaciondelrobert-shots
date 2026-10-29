// Shot Festivo #15 · Día Internacional de la Mujer y la Niña en la Ciencia · IA: la idea de Karen Spärck Jones (IDF, 1972)
// NARRADO (N4 "La imagen que se llena" + un poco de N2). Guion, fuentes y verificación: guion.md / verificacion.md.
// El dibujo es esquemático: la pared de páginas, las pesitas, la balanza y el asistente de IA son ilustrativos.
const PIEL = '#f1c7a5', PIEL2 = '#d9a283', CANA = '#a39a92', CANA2 = '#7f766e', HOJA = '#e7d29a', HOJA2 = '#c9ae6a', MASA = '#f6d873', POBLANO = '#2f8f3a';
const TINTA = KC.ink, PANT = '#fbf8ff';
const PALABRAS = [ // ejemplo ilustrativo: «de» sale en casi todas las páginas (pesa poco), «rajas» en pocas (pesa mucho)
  { w: 'receta', p: 0.42, c: KC.lilac }, { w: 'de', p: 0.06, c: '#c9c3d6' }, { w: 'tamales', p: 0.62, c: KC.orange }, { w: 'de', p: 0.06, c: '#c9c3d6' }, { w: 'rajas', p: 0.95, c: KC.mint },
];
const BUSCA = 'receta de tamales de rajas';
const T28 = { font: `800 28px ${KF.texto}` };

// Ancho aproximado de una palabra en Archivo 800 (para acomodar fichas)
const anchoTxt = (s, px) => s.length * px * 0.58;

/* ---------- Karen Spärck Jones (retrato esquemático, estilo del canal) ---------- */
function KarenCara({ T = 0, sonrie = 0.5, mira = 0 }) {
  const parpa = (T % 3.7) < 0.12 ? 0.15 : 1;
  return <g>
    {/* hombros y saco */}
    <path d="M -150 300 C -150 205 -95 175 0 175 C 95 175 150 205 150 300 Z" fill={KC.teal} stroke={TINTA} strokeWidth={7} />
    <path d="M -40 178 L 0 240 L 40 178" fill="#fff" stroke={TINTA} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-26} y={130} width={52} height={60} fill={PIEL2} stroke={TINTA} strokeWidth={6} />
    {/* cara */}
    <ellipse cx={0} cy={70} rx={88} ry={102} fill={PIEL} stroke={TINTA} strokeWidth={7} />
    <ellipse cx={-90} cy={80} rx={14} ry={22} fill={PIEL} stroke={TINTA} strokeWidth={6} />
    <ellipse cx={90} cy={80} rx={14} ry={22} fill={PIEL} stroke={TINTA} strokeWidth={6} />
    {/* pelo corto, ondulado y canoso */}
    <path d="M -96 70 C -112 -20 -60 -52 0 -50 C 64 -52 114 -16 98 72 C 92 34 74 8 50 0 C 26 22 -30 26 -58 6 C -78 22 -90 44 -96 70 Z" fill={CANA} stroke={TINTA} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -24 q 20 -14 40 0 M 4 -30 q 22 -12 44 4 M -84 30 q 6 -18 22 -24" stroke={CANA2} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* ojos, cejas, nariz, boca */}
    <path d="M -54 40 q 18 -10 34 0 M 20 40 q 18 -10 34 0" stroke={CANA2} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={-36 + mira * 4} cy={66} rx={9} ry={11 * parpa} fill={TINTA} />
    <ellipse cx={36 + mira * 4} cy={66} rx={9} ry={11 * parpa} fill={TINTA} />
    <path d="M -2 78 q -10 26 4 34" stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M -32 128 Q 0 ${128 + 14 + sonrie * 16} 32 128`} stroke={TINTA} strokeWidth={7} fill={sonrie > 0.6 ? '#fff' : 'none'} strokeLinecap="round" />
    <ellipse cx={-56} cy={110} rx={14} ry={8} fill="#f29a8a" opacity=".55" /><ellipse cx={56} cy={110} rx={14} ry={8} fill="#f29a8a" opacity=".55" />
  </g>;
}
// Polaroid con su nombre
function Karen({ T, x, y, s = 1, sonrie = 0.5, rot = -3, nombre = true }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-200} width={380} height={470} rx={14} fill="#fff" stroke={TINTA} strokeWidth={7} />
    <rect x={-166} y={-176} width={332} height={340} rx={6} fill="#ffe7b8" />
    <clipPath id={`kc${Math.round(x)}${Math.round(y)}`}><rect x={-166} y={-176} width={332} height={340} rx={6} /></clipPath>
    <g clipPath={`url(#kc${Math.round(x)}${Math.round(y)})`}><g transform="translate(0 -110) scale(1.0)"><KarenCara T={T} sonrie={sonrie} /></g></g>
    {nombre && <text x={0} y={222} textAnchor="middle" style={{ font: `900 30px ${KF.texto}` }} fill={TINTA}>Karen Spärck Jones</text>}
  </g>;
}

/* ---------- el celular con la barra de búsqueda ---------- */
function Telefono({ T, x, y, s = 1, letras = 0, pesos = 0, toque = -9, resultados = 1, apagado = 0 }) {
  const n = Math.floor(letras), txt = BUSCA.slice(0, n), cursor = Math.floor(T * 2.4) % 2 === 0 && letras < BUSCA.length;
  const tq = kprog(T, toque, toque + 0.5);
  // fichas de cada palabra (centradas)
  const anchos = PALABRAS.map((p) => anchoTxt(p.w, 28) + 26); const total = anchos.reduce((a, b) => a + b, 0) + 10 * (PALABRAS.length - 1);
  let cx = -total / 2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-320} y={0} width={640} height={1400} rx={84} fill="#1d1b26" stroke={TINTA} strokeWidth={8} />
    <rect x={-296} y={24} width={592} height={1352} rx={64} fill={PANT} />
    <rect x={-70} y={40} width={140} height={26} rx={13} fill="#1d1b26" />
    {/* barra */}
    <rect x={-272} y={100} width={544} height={96} rx={48} fill="#fff" stroke={TINTA} strokeWidth={5} />
    <g transform={`translate(-222 148) scale(${1 + 0.25 * Math.sin(Math.PI * tq)})`}>
      <circle cx={-4} cy={-4} r={17} fill="none" stroke={TINTA} strokeWidth={6} /><line x1={8} y1={8} x2={22} y2={22} stroke={TINTA} strokeWidth={7} strokeLinecap="round" />
    </g>
    {tq > 0 && tq < 1 && Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2, r = 30 + tq * 70; return <path key={i} d={`M ${-226 + Math.cos(a) * r} ${144 + Math.sin(a) * r} l 0 -12 M ${-232 + Math.cos(a) * r} ${138 + Math.sin(a) * r} l 12 0`} stroke={KC.gold} strokeWidth={5} opacity={1 - tq} />; })}
    {n === 0 && letras <= 0 && <text x={-182} y={160} style={{ font: `700 30px ${KF.texto}` }} fill="#9a95a8">Buscar…</text>}
    <text x={-182} y={160} style={{ font: `800 31px ${KF.texto}` }} fill={TINTA}>{txt}{cursor ? '|' : ''}</text>
    {/* fichas + pesitas */}
    {pesos > 0 && PALABRAS.map((p, i) => { const w = anchos[i], x0 = cx; cx += w + 10; const e = kprog(pesos, i * 0.12, i * 0.12 + 0.4, kEase.rebote), h = 150 * p.p * kprog(pesos, 0.3 + i * 0.1, 0.8 + i * 0.1, kEase.sale);
      return <g key={i} opacity={kprog(pesos, i * 0.12, i * 0.12 + 0.15)}>
        <g transform={`translate(${x0 + w / 2} 252) scale(${klerp(0.6, 1, e)})`}>
          <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill={p.c} stroke={TINTA} strokeWidth={4} />
          <text x={0} y={10} textAnchor="middle" style={T28} fill={TINTA}>{p.w}</text>
        </g>
        <rect x={x0 + w / 2 - 22} y={430 - h} width={44} height={h} rx={8} fill={p.c} stroke={TINTA} strokeWidth={4} />
        <rect x={x0 + w / 2 - 34} y={430} width={68} height={10} rx={5} fill={TINTA} />
      </g>; })}
    {pesos > 0 && <text x={-272} y={478} style={{ font: `700 24px ${KF.mono}` }} fill="#6b6578" opacity={kprog(pesos, 0.6, 0.9)}>peso de cada palabra</text>}
    {/* resultados (abajo del subtítulo) */}
    <g opacity={resultados}>{[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(-262 ${560 + i * 170})`}>
      <rect x={0} y={0} width={524} height={140} rx={22} fill="#fff" stroke="#d8d2e6" strokeWidth={4} />
      <rect x={24} y={26} width={300 - i * 30} height={22} rx={11} fill={i === 0 ? KC.blue : '#b8b1c9'} opacity=".8" />
      <rect x={24} y={66} width={440} height={14} rx={7} fill="#e2ddec" /><rect x={24} y={96} width={360} height={14} rx={7} fill="#e2ddec" />
    </g>)}</g>
    {apagado > 0 && <rect x={-296} y={24} width={592} height={1352} rx={64} fill="#05050a" opacity={apagado} />}
  </g>;
}

/* ---------- un tamal de rajas (hoja de maíz, masa y rajas de chile poblano) ---------- */
function Tamal({ T, x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -95 -70 C -110 40 -60 150 0 200 C 60 150 110 40 95 -70 Z" fill={HOJA} stroke={TINTA} strokeWidth={7} strokeLinejoin="round" />
    {[-50, -16, 18, 52].map((dx, i) => <path key={i} d={`M ${dx} -60 Q ${dx * 0.6} 80 ${dx * 0.15} 180`} stroke={HOJA2} strokeWidth={5} fill="none" />)}
    <path d="M -86 -70 C -86 -120 86 -120 86 -70 C 86 -40 -86 -40 -86 -70 Z" fill={MASA} stroke={TINTA} strokeWidth={7} />
    <path d="M -50 -84 q 22 -14 44 2 M 6 -70 q 24 -10 44 -2" stroke={POBLANO} strokeWidth={13} fill="none" strokeLinecap="round" />
    <path d="M -20 -96 q 14 6 28 0" stroke="#fffbe8" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -95 -70 C -130 -100 -120 -150 -96 -160 M 95 -70 C 128 -96 124 -150 100 -160" stroke={TINTA} strokeWidth={6} fill={HOJA} />
  </g>;
}

/* ---------- pared de páginas: dónde aparece cada palabra ---------- */
const COLS = 7, FILAS = 4, PW = 104, PH = 120, PG = 18, PX0 = (KW - (COLS * PW + (COLS - 1) * PG)) / 2, PY0 = 650;
const ORDEN_DE = (() => { const g = krng(77), a = Array.from({ length: COLS * FILAS }, (_, i) => i).filter((i) => i !== 9 && i !== 23); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(g() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
const PAGS_RAJAS = [5, 15, 22];
const tDe = (k, at) => at + 0.5 + ORDEN_DE.indexOf(k) * 0.075; // cuándo se ilumina cada página con «de»
const tRajas = (k, at) => at + 0.55 + PAGS_RAJAS.indexOf(k) * 0.5;
function ParedPaginas({ T, deAt, deHasta, rajasAt }) {
  const apagaDe = kprog(T, deHasta - 0.4, deHasta);
  return <g>{Array.from({ length: COLS * FILAS }, (_, k) => {
    const c = k % COLS, r = Math.floor(k / COLS), x = PX0 + c * (PW + PG), y = PY0 + r * (PH + PG) + Math.sin(T * 1.3 + k) * 3;
    const lde = ORDEN_DE.includes(k) ? kprog(T, tDe(k, deAt), tDe(k, deAt) + 0.15) * (1 - apagaDe) : 0;
    const lra = PAGS_RAJAS.includes(k) ? kprog(T, tRajas(k, rajasAt), tRajas(k, rajasAt) + 0.2, kEase.rebote) : 0;
    const linea = 2 + (k * 7) % 3;
    return <g key={k} transform={`translate(${x + PW / 2} ${y + PH / 2}) scale(${1 + 0.08 * lra}) translate(${-PW / 2} ${-PH / 2})`}>
      <rect x={0} y={0} width={PW} height={PH} rx={10} fill="#fff" stroke={lra > 0.01 ? POBLANO : TINTA} strokeWidth={lra > 0.01 ? 4 + 5 * lra : 4} opacity={T > rajasAt ? klerp(1, lra > 0.01 ? 1 : 0.45, kprog(T, rajasAt, rajasAt + 0.5)) : 1} />
      {[0, 1, 2, 3, 4].map((l) => <rect key={l} x={12} y={16 + l * 20} width={l === 4 ? 46 : 80} height={9} rx={4} fill="#d6d0e0" />)}
      {lde > 0 && <g opacity={lde}><rect x={10 + (k % 2) * 30} y={10 + linea * 20} width={40} height={22} rx={6} fill={KC.yellow} stroke={TINTA} strokeWidth={3} /><text x={30 + (k % 2) * 30} y={27 + linea * 20} textAnchor="middle" style={{ font: `800 17px ${KF.texto}` }} fill={TINTA}>de</text></g>}
      {lra > 0 && <g opacity={kclamp(lra, 0, 1)}><rect x={12} y={50} width={80} height={26} rx={7} fill={KC.mint} stroke={TINTA} strokeWidth={3} /><text x={52} y={69} textAnchor="middle" style={{ font: `800 18px ${KF.texto}` }} fill={TINTA}>rajas</text></g>}
    </g>; })}</g>;
}

/* ---------- balanza: «de» pesa poco, «rajas» pesa mucho ---------- */
function Pesa({ x, y, s = 1, color = KC.ink, txt }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -22 -78 a 22 22 0 1 1 44 0" fill="none" stroke={TINTA} strokeWidth={10} />
    <path d="M -50 0 L -36 -66 L 36 -66 L 50 0 Z" fill={color} stroke={TINTA} strokeWidth={7} strokeLinejoin="round" />
    {txt && <text x={0} y={-22} textAnchor="middle" style={{ font: `900 26px ${KF.texto}` }} fill="#fff">{txt}</text>}
  </g>;
}
function Balanza({ T, x, y, incl = 0, pesas = 0 }) {
  const L = 330, a = incl * Math.PI / 180, dy = Math.sin(a) * L;
  const plato = (px, py, palabra, col, nota, pesa) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-90} y2={190} stroke={TINTA} strokeWidth={5} /><line x1={0} y1={0} x2={90} y2={190} stroke={TINTA} strokeWidth={5} />
    <path d="M -130 190 Q 0 250 130 190 Z" fill="#c9ced8" stroke={TINTA} strokeWidth={7} />
    {pesa}
    <g transform="translate(0 -40)"><rect x={-anchoTxt(palabra, 40) / 2 - 22} y={-32} width={anchoTxt(palabra, 40) + 44} height={64} rx={32} fill={col} stroke={TINTA} strokeWidth={5} />
      <text x={0} y={14} textAnchor="middle" style={{ font: `900 40px ${KF.texto}` }} fill={TINTA}>{palabra}</text></g>
    <text x={0} y={300} textAnchor="middle" style={{ font: `700 28px ${KF.mono}` }} fill={TINTA}>{nota}</text>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -90 520 L 90 520 L 30 480 L -30 480 Z" fill="#8a8fa0" stroke={TINTA} strokeWidth={7} />
    <rect x={-16} y={30} width={32} height={460} fill="#a7acbb" stroke={TINTA} strokeWidth={7} />
    <g transform={`rotate(${incl})`}><rect x={-L - 20} y={-12} width={2 * L + 40} height={24} rx={12} fill="#c9ced8" stroke={TINTA} strokeWidth={7} /></g>
    <circle cx={0} cy={0} r={24} fill={KC.gold} stroke={TINTA} strokeWidth={7} />
    {plato(-L * Math.cos(a), -dy, 'de', KC.yellow, 'en muchas páginas', <g opacity={kprog(pesas, 0, 0.3)}><Pesa x={0} y={208} s={0.45} color="#8d879c" /></g>)}
    {plato(L * Math.cos(a), dy, 'rajas', KC.mint, 'en pocas', <g opacity={kprog(pesas, 0.3, 0.6)}><Pesa x={0} y={212} s={1.05} color={POBLANO} txt="+" /></g>)}
  </g>;
}

/* ---------- lista de resultados: la página que repite «tamales» sube ---------- */
const RESULTADOS = [
  { t: 'Atole de chocolate', marcas: 0 }, { t: 'Rajas con crema', marcas: 0 }, { t: 'Tamales de rajas con queso', marcas: 4 }, { t: 'Tamales oaxaqueños', marcas: 1 },
];
function Lista({ T, x, y, sube }) {
  const pos = [0, 1, 2, 3].map((i) => (i === 2 ? klerp(2, 0, sube) : i < 2 ? i + sube : 3));
  return <g transform={`translate(${x} ${y})`}>
    {RESULTADOS.map((r, i) => { const yy = pos[i] * 170, top = i === 2;
      return <g key={i} transform={`translate(0 ${yy}) scale(${top ? 1 + 0.04 * Math.sin(Math.PI * sube) : 1})`}>
        <rect x={0} y={0} width={860} height={146} rx={24} fill="#fff" stroke={top ? KC.orange : TINTA} strokeWidth={top ? 8 : 5} />
        <text x={30} y={56} style={{ font: `900 38px ${KF.texto}` }} fill={i === 2 || i === 3 ? KC.blue : TINTA}>{r.t}</text>
        {Array.from({ length: r.marcas }, (_, k) => <g key={k} opacity={kprog(T, 0, 0) * 1} transform={`translate(${30 + k * 160} 84)`}>
          <rect x={0} y={0} width={148} height={40} rx={10} fill={KC.orange} stroke={TINTA} strokeWidth={3} /><text x={74} y={29} textAnchor="middle" style={{ font: `800 24px ${KF.texto}` }} fill={TINTA}>tamales</text></g>)}
        {r.marcas === 0 && <><rect x={30} y={88} width={520} height={14} rx={7} fill="#e2ddec" /><rect x={30} y={114} width={380} height={14} rx={7} fill="#e2ddec" /></>}
        <text x={820} y={56} textAnchor="end" style={{ font: `700 30px ${KF.mono}` }} fill="#8b8597">{Math.round(pos[i]) + 1}</text>
      </g>; })}
  </g>;
}

/* ---------- computadora de 1972: cintas, foquitos y tarjetas perforadas ---------- */
function Computadora({ T, x, y, s = 1, on = 1 }) {
  const g = krng(5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-300} width={420} height={560} rx={14} fill="#d9d4c4" stroke={TINTA} strokeWidth={8} />
    {[-100, 100].map((cx, i) => <g key={i} transform={`translate(${cx} -170) rotate(${T * (i ? -120 : 140) * on})`}>
      <circle r={74} fill="#3a3a44" stroke={TINTA} strokeWidth={7} /><circle r={26} fill="#d9d4c4" stroke={TINTA} strokeWidth={5} />
      {[0, 120, 240].map((a) => <circle key={a} cx={48 * Math.cos(a * Math.PI / 180)} cy={48 * Math.sin(a * Math.PI / 180)} r={12} fill="#d9d4c4" />)}
    </g>)}
    <rect x={-170} y={-60} width={340} height={120} rx={10} fill="#2b2b33" stroke={TINTA} strokeWidth={6} />
    {Array.from({ length: 16 }, (_, i) => { const on2 = Math.sin(T * 9 + i * 1.7 + g() * 3) > 0.2; return <circle key={i} cx={-140 + (i % 8) * 40} cy={-30 + Math.floor(i / 8) * 54} r={11} fill={on2 && on ? (i % 3 ? KC.gold2 : KC.red) : '#55545e'} />; })}
    <rect x={-170} y={90} width={340} height={30} rx={6} fill="#b9b3a2" stroke={TINTA} strokeWidth={5} />
    {/* tarjetas perforadas */}
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${-150 + k * 24} ${170 - k * 18}) rotate(${-4 + k * 3})`}>
      <path d="M 0 0 L 300 0 L 300 110 L 18 110 L 0 92 Z" fill="#f3e6b8" stroke={TINTA} strokeWidth={5} />
      {Array.from({ length: 22 }, (_, i) => { const r2 = krng(k * 50 + i); return <rect key={i} x={20 + (i % 11) * 25} y={22 + Math.floor(i / 11) * 40 + r2() * 14} width={9} height={18} fill={TINTA} />; })}
    </g>)}
  </g>;
}

/* ---------- fichas de 1972 con su pesita ---------- */
function Ficha({ T, x, y, palabra, cae, peso, color }) {
  const u = kprog(T, cae, cae + 0.45, (p) => p * p), golpe = T > cae + 0.45 ? Math.exp(-(T - cae - 0.45) * 8) * Math.sin((T - cae - 0.45) * 30) * 6 : 0;
  return <g transform={`translate(${x} ${y + golpe})`}>
    <rect x={0} y={0} width={560} height={150} rx={12} fill="#fffaf0" stroke={TINTA} strokeWidth={6} />
    <line x1={0} y1={40} x2={560} y2={40} stroke={KC.red} strokeWidth={3} opacity=".6" />
    {[72, 102, 132].map((yy) => <line key={yy} x1={20} y1={yy} x2={540} y2={yy} stroke="#9fc3e6" strokeWidth={2} />)}
    <text x={30} y={112} style={{ font: `900 56px ${KF.texto}` }} fill={TINTA}>{palabra}</text>
    {T > cae && <g transform={`translate(${440} ${klerp(-420, 130, u)})`}><Pesa x={0} y={0} s={peso} color={color} /></g>}
  </g>;
}

/* ---------- tres colecciones de prueba ---------- */
function Fichero({ T, x, y, k, at, sube }) {
  const h0 = [110, 90, 130][k], h1 = [200, 175, 230][k];
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-110 + i * 6} y={-60 - i * 10 + Math.sin(T * 2 + i + k) * 3} width={200} height={110} rx={8} fill={['#fffaf0', '#f3e6b8', '#ffe2ec'][k]} stroke={TINTA} strokeWidth={4} transform={`rotate(${-6 + i * 3})`} />)}
    <path d="M -140 0 L 140 0 L 120 170 L -120 170 Z" fill={['#b4643a', KC.blue, KC.teal][k]} stroke={TINTA} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-60} y={60} width={120} height={46} rx={8} fill="#fff" stroke={TINTA} strokeWidth={4} />
    <text x={0} y={94} textAnchor="middle" style={{ font: `900 34px ${KF.texto}` }} fill={TINTA}>{k + 1}</text>
    {/* barras: sin pesos (gris) vs con pesos (dorado) */}
    <g transform="translate(0 -110)">
      <rect x={-80} y={-h0 * kprog(T, at, at + 0.6, kEase.sale)} width={64} height={h0 * kprog(T, at, at + 0.6, kEase.sale)} rx={8} fill="#9b98a6" stroke={TINTA} strokeWidth={5} />
      <rect x={16} y={-h1 * sube} width={64} height={h1 * sube} rx={8} fill={KC.gold} stroke={TINTA} strokeWidth={5} />
      <line x1={-110} y1={0} x2={110} y2={0} stroke={TINTA} strokeWidth={6} />
    </g>
  </g>;
}

/* ---------- red de herencia: IDF → fórmulas ---------- */
const RAMAS = [[-380, 360, 'TF-IDF'], [-170, 470, ''], [0, 380, 'BM25'], [170, 470, ''], [380, 360, ''], [-300, 580, ''], [-90, 600, ''], [100, 610, ''], [300, 580, ''], [-430, 520, ''], [440, 520, '']];
function Herencia({ T, at }) {
  return <g transform="translate(540 620)">
    {RAMAS.map(([dx, dy, nom], i) => { const t0 = at + 1.2 + i * 0.22, u = kprog(T, t0, t0 + 0.5, kEase.sale), br = 0.6 + 0.4 * Math.sin(T * 3 + i);
      return <g key={i}>
        <path d={`M 0 0 Q ${dx * 0.2} ${dy * 0.6} ${dx * u} ${dy * u}`} stroke={KC.gold2} strokeWidth={nom ? 8 : 5} fill="none" opacity={0.85} strokeDasharray={nom ? '0' : '12 10'} strokeDashoffset={-T * 30} />
        {u > 0.98 && <g transform={`translate(${dx} ${dy}) scale(${kprog(T, t0 + 0.5, t0 + 0.8, kEase.rebote)})`}>
          <circle r={nom ? 88 : 44} fill={nom ? '#1f2a48' : '#17203a'} stroke={nom ? KC.cyan : KC.gold2} strokeWidth={nom ? 7 : 4} opacity={nom ? 1 : br} />
          <text x={0} y={nom ? 14 : 12} textAnchor="middle" style={{ font: nom ? `900 40px ${KF.texto}` : `italic 700 34px ${KF.mono}` }} fill={nom ? KC.texto : KC.gold2}>{nom || 'ƒ'}</text>
        </g>}
      </g>; })}
    <g transform={`scale(${kprog(T, at + 0.1, at + 0.6, kEase.rebote)})`}>
      <circle r={130} fill={KC.gold} stroke={TINTA} strokeWidth={8} style={{ filter: `drop-shadow(0 0 ${30 + 14 * Math.sin(T * 4)}px ${KC.gold})` }} />
      <text x={0} y={34} textAnchor="middle" style={{ font: `400 120px ${KF.titulo}` }} fill={TINTA}>IDF</text>
    </g>
  </g>;
}

/* ---------- asistente de IA (genérico, sin marca) que busca antes de responder ---------- */
function Destello({ x, y, r = 30, color = KC.gold2, rot = 0 }) {
  return <path transform={`translate(${x} ${y}) rotate(${rot})`} d={`M 0 ${-r} Q ${r * 0.18} ${-r * 0.18} ${r} 0 Q ${r * 0.18} ${r * 0.18} 0 ${r} Q ${-r * 0.18} ${r * 0.18} ${-r} 0 Q ${-r * 0.18} ${-r * 0.18} 0 ${-r} Z`} fill={color} stroke={TINTA} strokeWidth={4} />;
}
function Asistente({ T, at }) {
  const ida = kprog(T, at + 0.9, at + 2.0, kEase.suave), vuelta = kprog(T, at + 2.5, at + 3.6, kEase.suave), responde = kprog(T, at + 3.8, at + 5.4);
  const lx = klerp(klerp(380, 840, ida), 420, vuelta), ly = klerp(klerp(700, 980, ida), 760, vuelta);
  const trae = T > at + 2.4;
  return <g>
    {/* archivero */}
    <g transform="translate(840 1010)">
      <rect x={-150} y={-190} width={300} height={380} rx={16} fill="#5a6176" stroke={TINTA} strokeWidth={7} />
      {[0, 1, 2].map((i) => <g key={i}><rect x={-126} y={-168 + i * 122} width={252} height={104} rx={10} fill="#7b8399" stroke={TINTA} strokeWidth={5} />
        <rect x={-40} y={-128 + i * 122} width={80} height={20} rx={10} fill={KC.gold2} stroke={TINTA} strokeWidth={4} /></g>)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-110 + i * 50} y={-214 - (i % 2) * 10} width={44} height={40} rx={4} fill="#fffaf0" stroke={TINTA} strokeWidth={3} />)}
    </g>
    {/* burbuja del asistente */}
    <g transform={`translate(330 610) scale(${kprog(T, at + 0.1, at + 0.6, kEase.rebote)})`}>
      <path d="M -250 -150 L 250 -150 Q 280 -150 280 -120 L 280 110 Q 280 140 250 140 L -120 140 L -190 200 L -180 140 L -250 140 Q -280 140 -280 110 L -280 -120 Q -280 -150 -250 -150 Z" fill="#232c4a" stroke={KC.cyan} strokeWidth={7} />
      <Destello x={-200} y={-80} r={44} rot={T * 30} /><Destello x={-140} y={-30} r={22} color={KC.cyan} rot={-T * 50} />
      {responde <= 0 && [0, 1, 2].map((i) => <circle key={i} cx={-20 + i * 60} cy={-10} r={16} fill={KC.texto} opacity={0.4 + 0.6 * Math.max(0, Math.sin(T * 6 - i))} />)}
      {[0, 1, 2].map((i) => <rect key={i} x={-80} y={-60 + i * 56} width={klerp(0, [320, 280, 200][i], kprog(responde, i * 0.3, i * 0.3 + 0.4))} height={26} rx={13} fill={KC.texto} />)}
    </g>
    {/* documentos que trae */}
    {trae && [0, 1].map((i) => <rect key={i} x={lx - 40 + i * 26} y={ly + 30 - i * 14} width={64} height={80} rx={6} fill="#fffaf0" stroke={TINTA} strokeWidth={4} transform={`rotate(${-8 + i * 12} ${lx} ${ly})`} opacity={1 - kprog(T, at + 3.6, at + 3.9)} />)}
    {/* la lupita BM25 */}
    {T > at + 0.8 && <g transform={`translate(${lx} ${ly}) rotate(${Math.sin(T * 5) * 8})`}>
      <circle r={56} fill="rgba(0,210,255,.18)" stroke={KC.texto} strokeWidth={10} /><line x1={40} y1={40} x2={92} y2={92} stroke={KC.texto} strokeWidth={16} strokeLinecap="round" />
      <rect x={-62} y={-112} width={124} height={44} rx={22} fill={KC.gold} stroke={TINTA} strokeWidth={4} />
      <text x={0} y={-80} textAnchor="middle" style={{ font: `900 28px ${KF.texto}` }} fill={TINTA}>BM25</text>
    </g>}
  </g>;
}

/* ---------- niñas con laptops ---------- */
function Nina({ T, x, y, pelo = '#3b2417', piel = PIEL, playera = KC.yellow, peinado = 0, k = 0 }) {
  const m = Math.sin(T * 2.4 + k) * 4;
  return <g transform={`translate(${x} ${y + m})`}>
    <path d="M -90 210 C -90 120 -50 100 0 100 C 50 100 90 120 90 210 Z" fill={playera} stroke={TINTA} strokeWidth={6} />
    {peinado === 0 && <><circle cx={-62} cy={-6} r={26} fill={pelo} stroke={TINTA} strokeWidth={5} /><circle cx={62} cy={-6} r={26} fill={pelo} stroke={TINTA} strokeWidth={5} /></>}
    {peinado === 1 && <path d="M -56 20 Q -80 100 -60 150 M 56 20 Q 80 100 60 150" stroke={pelo} strokeWidth={22} fill="none" strokeLinecap="round" />}
    <circle cx={0} cy={30} r={62} fill={piel} stroke={TINTA} strokeWidth={6} />
    <path d="M -64 26 C -70 -40 70 -40 64 26 C 40 0 -40 0 -64 26 Z" fill={pelo} stroke={TINTA} strokeWidth={5} />
    {peinado === 2 && <path d="M 40 -20 Q 110 0 90 90" stroke={pelo} strokeWidth={26} fill="none" strokeLinecap="round" />}
    <circle cx={-22} cy={36} r={7} fill={TINTA} /><circle cx={22} cy={36} r={7} fill={TINTA} />
    <path d="M -18 60 Q 0 74 18 60" stroke={TINTA} strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* laptop */}
    <path d="M -110 130 L 110 130 L 96 230 L -96 230 Z" fill="#c9ced8" stroke={TINTA} strokeWidth={6} />
    <rect x={-80} y={150} width={160} height={60} rx={6} fill="#1f2a48" />
    <text x={0} y={192} textAnchor="middle" style={{ font: `700 26px ${KF.mono}` }} fill={KC.mint}>{['IDF', '</>', 'IA'][k % 3]}</text>
    <rect x={-140} y={230} width={280} height={18} rx={9} fill="#a7acbb" stroke={TINTA} strokeWidth={5} />
  </g>;
}

function SparckJones() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bu: CUES.Busqueda, De: CUES.De, Ra: CUES.Rajas, Rr: CUES.Rara, Re: CUES.Repite, P: CUES.Pregunta, E: CUES.Estudio, Pr: CUES.Prueba, H: CUES.Herencia, IA: CUES.IA, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0, zIndex: z }}>{c}</svg>;
  const TOQUE = K.G + 0.4;
  const letras = klerp(0, BUSCA.length, kprog(T, K.Bu + 0.1, K.Bu + 1.9));
  const incl = klerp(0, -14, kprog(T, K.Rr + 1.4, K.Rr + 2.4, kEase.rebote));
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: KC.dark }}>
      {/* 1-2 · gancho y búsqueda: el celular, la lupa y Karen */}
      <Escena T={T} a={K.G} b={K.De} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Telefono T={T} x={540} y={klerp(1000, 760, kprog(T, K.G, K.G + 0.5, kEase.sale))} toque={TOQUE} letras={letras} resultados={kprog(T, K.G + 0.6, K.G + 1.2)} />
          <g opacity={kprog(T, K.G + 1.0, K.G + 1.3)}><Karen T={T} x={250} y={klerp(380, 520, kprog(T, K.G + 1.0, K.G + 1.6, kEase.rebote))} s={0.82} rot={-4} sonrie={0.7} /></g>
          {T > K.Bu + 1.4 && <Tamal T={T} x={900} y={klerp(1150, 650, kprog(T, K.Bu + 1.4, K.Bu + 1.9, kEase.rebote))} s={0.75} rot={10 + Math.sin(T * 3) * 6} />}
        </>)}
      </Escena>
      {/* 3-4 · la pared de páginas: «de» en casi todas, «rajas» en pocas */}
      <Escena T={T} a={K.De} b={K.Rr} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <ParedPaginas T={T} deAt={K.De} deHasta={K.Ra} rajasAt={K.Ra} />
          {T > K.Ra && <g opacity={kprog(T, K.Ra + 1.9, K.Ra + 2.3)}><Tamal T={T} x={150} y={560} s={0.42} rot={-12} /></g>}
        </>)}
      </Escena>
      {/* 5 · la balanza */}
      <Escena T={T} a={K.Rr} b={K.Re}>
        <FondoLunares color={KC.mint} />
        {svg(<Balanza T={T} x={540} y={760} incl={incl} pesas={kprog(T, K.Rr + 0.6, K.Rr + 1.6)} />)}
      </Escena>
      {/* 6 · la página que repite «tamales» sube en la lista */}
      <Escena T={T} a={K.Re} b={K.P}>
        <FondoLunares color={KC.coral} />
        {svg(<Lista T={T} x={110} y={520} sube={kprog(T, K.Re + 1.2, K.Re + 2.4, kEase.suave)} />)}
      </Escena>
      {/* 7 · ¿quién pensó en esto antes de la web? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={150} y={900} textAnchor="middle" style={{ font: `400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={TINTA} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 150 700)`}>?</text>
          <g opacity={1 - kprog(T, K.P + 0.6, K.P + 1.0)}><Telefono T={T} x={300} y={klerp(560, 640, kprog(T, K.P, K.P + 1))} s={klerp(0.42, 0.2, kprog(T, K.P + 0.2, K.P + 1.0))} apagado={kprog(T, K.P + 0.1, K.P + 0.5)} resultados={1} /></g>
          <g opacity={kprog(T, K.P + 0.7, K.P + 1.1)}><Computadora T={T} x={300} y={klerp(980, 900, kprog(T, K.P + 0.7, K.P + 1.3, kEase.sale))} s={0.95} /></g>
        </>)}
      </Escena>
      {/* 8 · el estudio: 1972, Cambridge */}
      <Escena T={T} a={K.E} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g opacity={kprog(T, K.E + 2.8, K.E + 3.2)}>
            <Karen T={T} x={230} y={klerp(1500, 690, kprog(T, K.E + 2.8, K.E + 3.4, kEase.sale))} s={0.62} rot={-5} sonrie={0.5} mira={1} />
            <Ficha T={T} x={440} y={520} palabra="de" cae={K.E + 3.4} peso={0.4} color="#8d879c" />
            <Ficha T={T} x={440} y={740} palabra="receta" cae={K.E + 4.0} peso={0.75} color={KC.lilac} />
            <Ficha T={T} x={440} y={960} palabra="rajas" cae={K.E + 4.6} peso={1.1} color={POBLANO} />
          </g>
        </>)}
      </Escena>
      {/* 9 · tres colecciones de prueba */}
      <Escena T={T} a={K.Pr} b={K.H}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{[0, 1, 2].map((k) => <Fichero key={k} T={T} x={200 + k * 340} y={1000} k={k} at={K.Pr + 0.4 + k * 0.3} sube={kprog(T, K.Pr + 1.8 + k * 0.35, K.Pr + 2.6 + k * 0.35, kEase.sale)} />)}</>)}
      </Escena>
      {/* 10 · por dentro del buscador: la herencia de IDF (escena interna, fondo noche) */}
      <Escena T={T} a={K.H} b={K.IA} zoom={0.04}>
        <div style={{ position: 'absolute', inset: 0, background: KC.noche }}></div>
        <Ambiente T={T} n={34} color="rgba(244,194,90,.22)" />
        {svg(<Herencia T={T} at={K.H} />)}
      </Escena>
      {/* 11 · IA que busca documentos antes de responder */}
      <Escena T={T} a={K.IA} b={K.Da}>
        <div style={{ position: 'absolute', inset: 0, background: KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(0,210,255,.22)" />
        {svg(<Asistente T={T} at={K.IA} />)}
      </Escena>
      {/* 12 · niñas y computación; su lema */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={1 - kprog(T, K.Da + 3.0, K.Da + 3.4)}><Karen T={T} x={300} y={klerp(380, 560, kprog(T, K.Da, K.Da + 0.6, kEase.rebote))} s={0.78} rot={-4} sonrie={0.8} /></g>
          <Nina T={T} x={190} y={klerp(1400, 920, kprog(T, K.Da + 0.6, K.Da + 1.1, kEase.sale))} playera={KC.yellow} peinado={0} k={0} />
          <Nina T={T} x={540} y={klerp(1400, 900, kprog(T, K.Da + 0.9, K.Da + 1.4, kEase.sale))} playera={KC.mint} peinado={1} pelo="#5a3a22" piel="#e3b08e" k={1} />
          <Nina T={T} x={890} y={klerp(1400, 920, kprog(T, K.Da + 1.2, K.Da + 1.7, kEase.sale))} playera={KC.cyan} peinado={2} pelo="#1e1410" piel="#c98d6a" k={2} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo celular del inicio, ahora con el peso de cada palabra */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Telefono T={T} x={540} y={760} letras={BUSCA.length + 1} pesos={kprog(T, K.Ci + 0.4, K.Ci + 2.6)} resultados={1} />
          <Karen T={T} x={250} y={520} s={0.82} rot={-4} sonrie={1} />
          {Array.from({ length: 6 }, (_, i) => <Destello key={i} x={120 + i * 170} y={440 + (i % 2) * 60 + Math.sin(T * 2 + i) * 10} r={18 * kprog(T, K.Ci + 2.6 + i * 0.1, K.Ci + 3.0 + i * 0.1, kEase.rebote)} color={KC.gold2} rot={T * 40} />)}
        </>)}
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.De, titulo: 'Palabras raras' }, { at: K.E, titulo: 'El estudio' }, { at: K.H, titulo: 'La herencia' }, { at: K.Da, titulo: 'Su lema' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.Bu - 0.2} texto="Día de la Mujer y la Niña en la Ciencia" x={540} y={1460} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.Bu + 1.9} until={K.De - 0.3} x={640} y={500} texto="tamal de rajas" tam={30} color={TINTA} />
      <Medidor T={T} at={K.De + 1.2} until={K.Ra - 0.3} y={1420} ancho={900} etiqueta="peso de «de»" valor={(t) => 0.06 * kprog(t, K.De + 1.4, K.De + 2.4)} texto={() => 'casi nada'} color={KC.yellow} />
      <Chip T={T} at={K.De + 2.6} until={K.Ra - 0.3} texto="sale en casi todas = pesa poco" x={540} y={1610} tam={38} borde={KC.yellow} />
      <Medidor T={T} at={K.Ra + 1.6} until={K.Rr - 0.3} y={1420} ancho={900} etiqueta="peso de «rajas»" valor={(t) => 0.95 * kprog(t, K.Ra + 1.8, K.Ra + 2.8, kEase.sale)} texto={() => 'mucho'} color={KC.mint} />
      <Chip T={T} at={K.Ra + 2.4} until={K.Rr - 0.3} texto="sale en pocas = pesa mucho" x={540} y={1610} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Rr + 2.4} until={K.Re - 0.3} texto="la palabra rara pesa más" x={540} y={1480} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Re + 1.6} until={K.P - 0.3} texto="TF: cuántas veces en la página" x={540} y={1450} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Re + 2.4} until={K.P - 0.3} texto="× IDF: qué tan rara es" x={540} y={1560} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.P + 1.4} until={K.E - 0.3} x={60} y={1460} texto="mucho antes de la web (1989)" tam={30} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.7} anio="1972" quien="Karen Spärck Jones" revista="Cambridge, Inglaterra · Journal of Documentation" x={540} y={880} />
      <Chip T={T} at={K.E + 3.2} until={K.Pr - 0.3} texto="más rara = más peso" x={540} y={1460} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pr + 0.6} until={K.H - 0.3} texto="3 colecciones de prueba" x={540} y={1460} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Pr + 2.0} until={K.H - 0.3} x={60} y={1580} texto="gris: sin pesos · dorado: con pesos" tam={28} color={TINTA} />
      <Chip T={T} at={K.H + 0.7} until={K.IA - 0.3} texto="frecuencia inversa de documento" x={540} y={1460} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.IA + 0.6} until={K.Da - 0.3} texto="buscar antes de responder" x={540} y={1460} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.IA + 2.2} until={K.Da - 0.3} x={60} y={1580} texto="BM25: heredera de TF-IDF" tam={30} />
      {/* el lema, atribuido */}
      {kvisible(T, K.Da + 3.3, K.Ci - 0.3) && (() => { const e = kentrada(T, K.Da + 3.3, K.Ci - 0.3, 'pop');
        return <div style={{ position: 'absolute', left: 540, top: 600, zIndex: 43, width: 900, transform: `translate(-50%,-50%) scale(${e.s}) rotate(-1.5deg)`, opacity: e.o,
          background: KC.paper, border: `7px solid ${KC.ink}`, borderRadius: 30, padding: '30px 44px 26px', boxShadow: `14px 14px 0 ${KC.ink}`, textAlign: 'center' }}>
          <div style={{ font: `400 64px/1.08 ${KF.titulo}`, color: KC.ink }}>«La computación es demasiado importante para dejársela a los hombres»</div>
          <div style={{ font: `700 26px ${KF.mono}`, color: '#5a524a', marginTop: 16 }}>Karen Spärck Jones · entrevista BCS (publicada en 2009)</div>
        </div>; })()}
      <Chip T={T} at={K.Ci + 2.8} until={K.Ou} texto="la palabra rara pesa más" x={540} y={1460} tam={42} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bu - 0.1} texto="Usas una *idea de esta mujer.*" />
      <Subtitulo T={T} idx={1} at={K.Bu + 0.1} until={K.De - 0.1} texto="Escribe: *tamales de rajas.*" />
      <Subtitulo T={T} idx={2} at={K.De + 0.1} until={K.Ra - 0.1} texto="«De» sale en todo: *casi no dice nada.*" />
      <Subtitulo T={T} idx={3} at={K.Ra + 0.1} until={K.Rr - 0.1} texto="«Rajas» sale en pocas: *esa sí.*" />
      <Subtitulo T={T} idx={4} at={K.Rr + 0.1} until={K.Re - 0.1} texto="Más rara, *más vale.*" />
      <Subtitulo T={T} idx={5} at={K.Re + 0.1} until={K.P - 0.1} texto="Si la repite, *sube en la lista.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Quién pensó en esto *antes de la web?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Pr - 0.1} texto="1972: un peso *según qué tan rara es.*" />
      <Subtitulo T={T} idx={8} at={K.Pr + 0.1} until={K.H - 0.1} texto="3 colecciones: *mejoraron bastante.*" />
      <Subtitulo T={T} idx={9} at={K.H + 0.1} until={K.IA - 0.1} texto="Entró en *casi todas las fórmulas.*" />
      <Subtitulo T={T} idx={10} at={K.IA + 0.1} until={K.Da - 0.1} texto="La IA busca con *BM25.*" />
      <Subtitulo T={T} idx={11} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Niñas a la computación: *su lema.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Karen enseñó a medir *qué palabras importan.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Ra + 0.3, K.Ra + 3.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Rr + 0.4, K.Re - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 0.8, K.E + 2.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pr + 0.5, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 2.5, K.IA - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.IA + 3.2, K.Da - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Da + 0.4, K.Da + 3.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" serie="Festivo" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SparckJonesApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SparckJones /></CompositionStage></div>;
}
window.SparckJonesApp = SparckJonesApp;
