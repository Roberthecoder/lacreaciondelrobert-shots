// Shot IA #57 · Tu celular no te ve la cara: te la mide — NARRADO (N1 "Por dentro" + N2 "El número").
// Datos: Apple Support "About Face ID advanced technology" (2026), Apple Platform Security Guide (2024),
// Apple Support "About Touch ID advanced security technology" (2023) y comunicado del iPhone X (2017). Ver guion.md y verificacion.md.
// Todo es esquemático: la luz infrarroja no se ve; los puntos rojos y los colores de la malla son un dibujo.

/* ---------- relieve de una cara (esquema) ---------- */
// nx, ny en -1..1 dentro del óvalo de la cara. Devuelve "altura" 0..~135.
function fiAltura(nx, ny) {
  const e = (v) => Math.exp(-v);
  const domo = 60 * Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
  const nariz = 75 * e((nx / 0.13) ** 2 + ((ny - 0.02) / 0.28) ** 2);
  const ojos = -22 * e(((Math.abs(nx) - 0.38) / 0.16) ** 2 + ((ny + 0.12) / 0.11) ** 2);
  const ceja = 14 * e(((ny + 0.3) / 0.07) ** 2) * e((nx / 0.6) ** 2);
  const labios = 14 * e((nx / 0.28) ** 2 + ((ny - 0.5) / 0.07) ** 2);
  const pomulos = 12 * e(((Math.abs(nx) - 0.45) / 0.2) ** 2 + ((ny - 0.15) / 0.18) ** 2);
  return Math.max(0, domo + nariz + ojos + ceja + labios + pomulos);
}
const FI_MAX = 135;
function fiColor(z) {
  const t = kclamp(z / FI_MAX, 0, 1), st = [KC.blue, KC.cyan, KC.mint, KC.yellow, KC.red];
  const k = Math.min(st.length - 2, Math.floor(t * (st.length - 1))), u = t * (st.length - 1) - k;
  return mixHex(st[k], st[k + 1], u);
}
// Puntos del proyector (posiciones normalizadas, fijas). u = orden en que se encienden (barrido de izq. a der.).
const FI_PUNTOS = (() => { const r = krng(57), out = [];
  while (out.length < 300) { const nx = r() * 2 - 1, ny = r() * 2 - 1; if (nx * nx + ny * ny > 0.96) continue; out.push({ nx, ny, u: 0.65 * r() + 0.35 * (nx + 1) / 2 }); }
  return out; })();

/* ---------- una cara dibujada (SVG, centro en la nariz) ---------- */
// ojos 0..1 (0 = cerrados) · puntos 0..1 (puntos infrarrojos encendidos) · malla 0..1 (relieve encima) · gris = foto infrarroja.
function Cara({ x, y, s = 1, T = 0, piel = '#e7b48f', pelo = '#2a1a12', camisa = KC.blue, peinado = 0, ojos = 1, puntos = 0, malla = 0, gris = false, lentes = false, boca = 'sonrisa' }) {
  if (gris) { piel = '#b9b9b9'; pelo = '#3b3b3b'; camisa = '#6e6e6e'; }
  const RX = 165, RY = 220, iris = gris ? '#222' : '#4a2e1c';
  const ojo = (sx) => {
    const ab = kclamp(ojos, 0, 1);
    return <g key={sx} transform={`translate(${sx * 62} -30)`}>
      {ab > 0.08 ? <>
        <ellipse rx={30} ry={18 * ab + 1} fill="#fff" stroke={KC.ink} strokeWidth={5} />
        <circle r={12 * Math.min(1, ab * 1.4)} fill={iris} /><circle cx={4} cy={-4} r={3.5} fill="#fff" />
      </> : <path d="M -30 0 Q 0 16 30 0" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />}
    </g>;
  };
  // malla de relieve sobre la cara
  const filas = [];
  if (malla > 0) {
    for (let ny = -0.9; ny <= 0.91; ny += 0.12) {
      const w = Math.sqrt(Math.max(0, 1 - ny * ny)) * 0.98; let d = '';
      for (let nx = -w; nx <= w + 0.001; nx += 0.06) { const z = fiAltura(nx, ny); d += `${d ? 'L' : 'M'} ${(nx * RX).toFixed(1)} ${(ny * RY - z * 0.18).toFixed(1)} `; }
      filas.push(<path key={'f' + ny.toFixed(2)} d={d} stroke={fiColor(fiAltura(0.2, ny))} strokeWidth={3.5} fill="none" opacity={0.9} />);
    }
    for (let nx = -0.84; nx <= 0.85; nx += 0.14) {
      const h = Math.sqrt(Math.max(0, 1 - nx * nx)) * 0.98; let d = '';
      for (let ny = -h; ny <= h + 0.001; ny += 0.06) { const z = fiAltura(nx, ny); d += `${d ? 'L' : 'M'} ${(nx * RX).toFixed(1)} ${(ny * RY - z * 0.18).toFixed(1)} `; }
      filas.push(<path key={'c' + nx.toFixed(2)} d={d} stroke={KC.cyan} strokeWidth={2.5} fill="none" opacity={0.6} />);
    }
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* hombros y cuello */}
    <path d="M -260 360 Q -250 250 -120 225 L 120 225 Q 250 250 260 360 Z" fill={camisa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-55} y={160} width={110} height={90} fill={piel} stroke={KC.ink} strokeWidth={8} />
    {/* pelo largo detrás */}
    {peinado === 1 && <path d="M -185 -60 Q -215 140 -150 250 L 150 250 Q 215 140 185 -60 Z" fill={pelo} stroke={KC.ink} strokeWidth={8} />}
    {/* orejas */}
    <ellipse cx={-RX} cy={0} rx={26} ry={44} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={RX} cy={0} rx={26} ry={44} fill={piel} stroke={KC.ink} strokeWidth={7} />
    {/* cabeza */}
    <ellipse rx={RX} ry={RY} fill={piel} stroke={KC.ink} strokeWidth={8} />
    {/* pelo */}
    {peinado === 2
      ? Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.05 + 0.9 * i / 10); return <circle key={i} cx={-Math.cos(a) * 150} cy={-150 - Math.sin(a) * 70} r={48} fill={pelo} stroke={KC.ink} strokeWidth={6} />; })
      : <path d={`M -168 -40 Q -175 -230 0 -238 Q 175 -230 168 -40 Q 150 -120 ${peinado === 1 ? 40 : 60} -150 Q -20 -110 -120 -140 Q -160 -110 -168 -40 Z`} fill={pelo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />}
    {/* cejas */}
    <path d="M -95 -78 Q -62 -96 -30 -80" stroke={pelo} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 30 -80 Q 62 -96 95 -78" stroke={pelo} strokeWidth={10} fill="none" strokeLinecap="round" />
    {ojo(-1)}{ojo(1)}
    {lentes && <g fill="none" stroke={KC.ink} strokeWidth={6}><circle cx={-62} cy={-30} r={44} /><circle cx={62} cy={-30} r={44} /><line x1={-18} y1={-32} x2={18} y2={-32} /></g>}
    {/* nariz */}
    <path d="M 0 -20 Q -6 40 -24 62 Q 0 76 24 62" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* boca */}
    {boca === 'sonrisa' && <path d="M -55 112 Q 0 152 55 112" stroke={KC.ink} strokeWidth={7} fill={gris ? '#555' : '#b8433b'} strokeLinejoin="round" />}
    {boca === 'o' && <ellipse cx={0} cy={122} rx={20} ry={26} fill="#5a1f1a" stroke={KC.ink} strokeWidth={6} />}
    {boca === 'recta' && <path d="M -40 120 L 40 120" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />}
    {!gris && <><ellipse cx={-100} cy={60} rx={26} ry={14} fill={KC.pink} opacity=".25" /><ellipse cx={100} cy={60} rx={26} ry={14} fill={KC.pink} opacity=".25" /></>}
    {malla > 0 && <g opacity={malla}>{filas}</g>}
    {puntos > 0 && <g>{FI_PUNTOS.map((p, i) => { const v = kprog(puntos, p.u, p.u + 0.04); if (v <= 0) return null;
      const tw = 0.75 + 0.25 * Math.sin(T * 9 + i);
      return <g key={i} opacity={v * tw}><circle cx={p.nx * RX} cy={p.ny * RY} r={9} fill={KC.red} opacity=".28" /><circle cx={p.nx * RX} cy={p.ny * RY} r={4.2} fill={KC.red} /></g>; })}</g>}
  </g>;
}

/* ---------- malla de profundidad grande (por dentro) ---------- */
function MallaProfundidad({ x, y, s = 1, lev = 1, giro = 0, aparece = 1 }) {
  const RX = 250, RY = 330, ca = Math.cos(giro), sa = Math.sin(giro);
  const pts = [], lineas = [];
  for (let j = 0, ny = -0.95; ny <= 0.951; ny += 0.076, j++) {
    const w = Math.sqrt(Math.max(0, 1 - ny * ny)) * 0.99; let d = '';
    const vis = kprog(aparece, j / 26 * 0.8, j / 26 * 0.8 + 0.2);
    if (vis <= 0) continue;
    for (let nx = -w; nx <= w + 0.001; nx += 0.05) {
      const z = fiAltura(nx, ny) * lev, X = nx * RX, Y = ny * RY;
      const xs = X * ca + z * sa * 1.1, ys = Y - z * 0.5;
      d += `${d ? 'L' : 'M'} ${xs.toFixed(1)} ${ys.toFixed(1)} `;
      pts.push(<circle key={pts.length} cx={xs} cy={ys} r={5.5} fill={fiColor(z)} opacity={vis} />);
    }
    lineas.push(<path key={'l' + j} d={d} stroke={KC.cyan} strokeOpacity={0.35 * vis} strokeWidth={2.5} fill="none" />);
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{lineas}{pts}</g>;
}

/* ---------- celular ---------- */
// estado: 'cerrado' | 'abierto' | 'error' · proyector 0..1 (el puntito rojo arriba)
function Celular({ x, y, s = 1, estado = 'cerrado', abre = 0, proyector = 0, T = 0, gris = false }) {
  const verde = estado === 'abierto', rojo = estado === 'error';
  const col = rojo ? KC.red : verde ? KC.mint : KC.texto, sube = verde ? 26 * abre : 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-135} y={-265} width={270} height={530} rx={46} fill="#1b2030" stroke={KC.ink} strokeWidth={10} />
    <rect x={-112} y={-242} width={224} height={484} rx={30} fill={verde ? mixHex('#10131a', '#0f3b33', abre) : rojo ? '#3a1210' : '#10131a'} />
    <rect x={-48} y={-236} width={96} height={26} rx={13} fill={KC.ink} />
    <circle cx={22} cy={-223} r={6} fill={proyector > 0 ? KC.red : '#333'} opacity={0.4 + 0.6 * proyector * (0.7 + 0.3 * Math.sin(T * 14))} />
    <circle cx={-22} cy={-223} r={6} fill="#2a3a5a" />
    {/* candado */}
    {rojo ? <g transform="translate(0 -10)"><path d="M -50 -50 L 50 50 M 50 -50 L -50 50" stroke={KC.red} strokeWidth={18} strokeLinecap="round" /></g>
      : <g transform="translate(0 -10)">
        <path d={`M -32 ${-10 - sube} L -32 ${-48 - sube} Q -32 ${-86 - sube} 0 ${-86 - sube} Q 32 ${-86 - sube} 32 ${-48 - sube} L 32 ${-10 + (verde ? -sube : 0)}`} stroke={col} strokeWidth={12} fill="none" strokeLinecap="round" />
        <rect x={-50} y={-14} width={100} height={78} rx={14} fill={col} />
        <circle cx={0} cy={22} r={10} fill="#10131a" />
      </g>}
    <text y={140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={col}>{rojo ? 'no' : verde ? 'abierto' : 'Face ID'}</text>
  </g>;
}
// Haz de luz infrarroja (esquema) del celular a la cara.
function Haz({ x0, y0, x1, y1, alto = 380, o = 1 }) {
  return <polygon points={`${x0},${y0 - 8} ${x0},${y0 + 8} ${x1},${y1 + alto / 2} ${x1},${y1 - alto / 2}`} fill={KC.red} opacity={0.13 * o} />;
}

/* ---------- íconos para las tarjetas ---------- */
function IcoCara() { return <g><circle r={44} fill="#e7b48f" stroke={KC.ink} strokeWidth={6} /><circle cx={-15} cy={-8} r={5} fill={KC.ink} /><circle cx={15} cy={-8} r={5} fill={KC.ink} /><path d="M -16 16 Q 0 28 16 16" stroke={KC.ink} strokeWidth={5} fill="none" />
  {[[-30, -30], [30, -30], [-30, 30], [30, 30]].map(([a, b], i) => <path key={i} d={`M ${a * 1.5} ${b * 1.5 + (b > 0 ? -14 : 14)} L ${a * 1.5} ${b * 1.5} L ${a * 1.5 + (a > 0 ? -14 : 14)} ${b * 1.5}`} stroke={KC.ink} strokeWidth={5} fill="none" />)}</g>; }
function IcoHuella() { return <g fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round">{[10, 20, 30, 40, 50].map((r, i) => <path key={i} d={`M ${-r} ${r * 0.4} Q ${-r} ${-r} 0 ${-r} Q ${r} ${-r} ${r} ${r * 0.2}`} />)}<path d="M 0 -6 L 0 40" /></g>; }
function IcoCodigo() { return <g>{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-30 + (i % 3) * 30} cy={-42 + Math.floor(i / 3) * 28} r={10} fill={i === 10 ? KC.gold : '#fff'} stroke={KC.ink} strokeWidth={4} />)}</g>; }

// Tarjeta de dato (comparativa): ícono + qué es + cifra + de quién y de cuándo.
function TarjetaDato({ T, at, until, y, x = 60, ancho = 640, icono, titulo, valor, fuente, color }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.6}px)`,
    background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, display:'flex', alignItems:'center', gap:18, padding:'14px 22px' }}>
    <svg width={120} height={120} viewBox="-60 -60 120 120" style={{ flex:'none' }}>{icono}</svg>
    <div>
      <div style={{ font:`900 30px/1.1 ${KF.texto}`, color:KC.ink }}>{titulo}</div>
      <div style={{ font:`400 70px/1.05 ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}` }}>{valor}</div>
      <div style={{ font:`700 22px ${KF.mono}`, color:'#5a524a' }}>{fuente}</div>
    </div>
  </div>;
}

function FaceId() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Mapa, R: CUES.Red, F: CUES.Foto, P: CUES.Pregunta, N: CUES.Numero, C: CUES.Comparativa, E: CUES.Estudio, Ge: CUES.Gemelos, O: CUES.Ojos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const NUMS = ['0.82', '-1.37', '2.05', '0.11', '-0.64', '1.48', '-2.20', '0.93'];
  const extranos = [{ piel: '#c98d64', pelo: '#111', peinado: 2 }, { piel: '#f0c7a5', pelo: '#a5602a', peinado: 1 }, { piel: '#8d5a3b', pelo: '#1a1a1a', peinado: 0 }, { piel: '#e2b08a', pelo: '#6b6b6b', peinado: 0, lentes: true }, { piel: '#b27750', pelo: '#3a2414', peinado: 1 }, { piel: '#f2d0b4', pelo: '#e0b440', peinado: 0 }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu cara frente al celular se llena de puntos */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.08} origen="35% 45%">
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Haz x0={835} y0={1000 - 223 * 0.8} x1={360} y1={840} alto={500} o={kprog(T, K.G + 0.15, K.G + 0.5)} />
          <Cara x={340} y={860} s={1.15} T={T} puntos={kprog(T, K.G + 0.3, K.G + 3.2)} boca={T > K.G + 1.2 ? 'o' : 'sonrisa'} />
          <Celular x={850} y={1000} s={0.8} T={T} proyector={kprog(T, K.G + 0.1, K.G + 0.3)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 1.4} until={K.Ma - 0.2} texto="luz infrarroja: tú no la ves" x={330} y={400} tam={30} borde={KC.red} />

      {/* 2 · por dentro: mapa de profundidad + foto infrarroja */}
      <Escena T={T} a={K.Ma} b={K.R} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche, backgroundImage:'linear-gradient(rgba(0,210,255,.06) 2px, transparent 2px), linear-gradient(90deg, rgba(0,210,255,.06) 2px, transparent 2px)', backgroundSize:'60px 60px' }}></div>
        {svg(<>
          <MallaProfundidad x={560} y={880} s={0.95} lev={kprog(T, K.Ma + 0.6, K.Ma + 2.6, kEase.suave)} aparece={kprog(T, K.Ma + 0.05, K.Ma + 1.2)} giro={0.35 * Math.sin((T - K.Ma) * 0.9)} />
          <g opacity={kprog(T, K.Ma + 3.3, K.Ma + 3.8)}>
            <rect x={70} y={330} width={260} height={300} rx={18} fill="#1a1a1a" stroke={KC.texto} strokeWidth={6} />
            <clipPath id="fiClip"><rect x={76} y={336} width={248} height={288} rx={14} /></clipPath>
            <g clipPath="url(#fiClip)"><Cara x={200} y={500} s={0.5} gris /></g>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ma + 1.4} until={K.R - 0.2} texto="mapa de profundidad" x={560} y={1150} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Ma + 3.6} until={K.R - 0.2} texto="+ foto infrarroja" x={200} y={680} tam={28} borde={KC.texto} />

      {/* 3 · la red neuronal en la zona protegida del chip */}
      <Escena T={T} a={K.R} b={K.F} zoom={0.04}>
        <FondoCircuito T={T} />
        {svg(<g>
          <rect x={200} y={480} width={680} height={560} rx={40} fill="#141b2e" stroke={KC.gold} strokeWidth={8} />
          {Array.from({ length: 9 }, (_, i) => <g key={i}><rect x={250 + i * 68} y={452} width={22} height={28} fill={KC.gold} /><rect x={250 + i * 68} y={1040} width={22} height={28} fill={KC.gold} /></g>)}
          <g transform="translate(540 540)"><rect x={-20} y={-6} width={40} height={30} rx={6} fill={KC.gold} /><path d="M -12 -6 L -12 -16 Q -12 -30 0 -30 Q 12 -30 12 -16 L 12 -6" stroke={KC.gold} strokeWidth={6} fill="none" /></g>
          <g opacity={1 - kprog(T, K.R + 2.2, K.R + 2.8)}><MallaProfundidad x={140} y={760} s={0.28} lev={1} aparece={kprog(T, K.R, K.R + 0.6)} /></g>
        </g>)}
        <RedNeuronal T={T} x={300} y={600} ancho={480} alto={380} capas={[5, 7, 7, 4]} onda={T > K.R + 0.8 && T < K.R + 3.6 ? kprog(T, K.R + 0.8, K.R + 3.4) : null} />
        <div style={{ position:'absolute', left:905, top:560, width:150, textAlign:'center' }}>
          {NUMS.map((n, i) => <div key={i} style={{ font:`700 30px/1.5 ${KF.mono}`, color:KC.mint, opacity:kprog(T, K.R + 2.6 + i * 0.1, K.R + 2.8 + i * 0.1) }}>{n}</div>)}
        </div>
      </Escena>
      <Chip T={T} at={K.R + 0.3} until={K.F - 0.2} texto="zona protegida del chip" x={540} y={400} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.R + 3.0} until={K.F - 0.2} texto="(números ilustrativos)" x={900} y={1080} tam={22} borde={KC.texto} mono />
      <Chip T={T} at={K.R + 4.0} until={K.F - 0.2} texto="¿es tu cara guardada? ✔" x={540} y={1140} tam={40} borde={KC.mint} />

      {/* 4 · una foto impresa no tiene profundidad */}
      <Escena T={T} a={K.F} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g transform={`translate(330 840) rotate(${-6 + Math.sin(T * 2) * 1.5})`}>
            <rect x={-200} y={-250} width={400} height={500} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <rect x={-178} y={-228} width={356} height={400} fill="#bfe8ff" />
            <clipPath id="fiFoto"><rect x={-178} y={-228} width={356} height={400} /></clipPath>
            <g clipPath="url(#fiFoto)"><Cara x={0} y={-10} s={0.75} /></g>
            <path d="M -200 120 Q -260 160 -240 260 L -150 260 Q -150 200 -150 160 Z" fill="#e7b48f" stroke={KC.ink} strokeWidth={7} />
          </g>
          <Haz x0={835} y0={900 - 223 * 0.8} x1={360} y1={800} alto={420} o={kprog(T, K.F + 0.3, K.F + 0.6) * (1 - kprog(T, K.F + 1.8, K.F + 2.2))} />
          <Celular x={850} y={900} s={0.8} T={T} proyector={1} estado={T > K.F + 1.8 ? 'error' : 'cerrado'} />
        </>)}
      </Escena>
      <Chip T={T} at={K.F + 1.6} until={K.P - 0.2} texto="profundidad: 0" x={330} y={1150} tam={40} borde={KC.red} />

      {/* 5 · re-gancho: ¿y otra persona? */}
      <Escena T={T} a={K.P} b={K.N} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={290} y={620} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 500)`}>?</text>
          <Cara x={290} y={930} s={0.85} T={T} piel="#c98d64" pelo="#111" peinado={2} camisa={KC.lilac} boca="recta" />
        </>)}
      </Escena>

      {/* 6 · el número */}
      <Escena T={T} a={K.N} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{extranos.map((c, i) => { const xx = 115 + i * 170, a0 = K.N + 1.2 + i * 0.35, v = kprog(T, a0, a0 + 0.3, kEase.sale);
          return <g key={i} opacity={v} transform={`translate(0 ${(1 - v) * 40})`}>
            <Cara x={xx} y={1010} s={0.3} {...c} camisa={[KC.pink, KC.cyan, KC.lilac, KC.orange, KC.mint, KC.blue][i]} boca="recta" />
            <g opacity={kprog(T, a0 + 0.3, a0 + 0.45)}><circle cx={xx + 40} cy={930} r={24} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><path d={`M ${xx + 30} 920 L ${xx + 50} 940 M ${xx + 50} 920 L ${xx + 30} 940`} stroke="#fff" strokeWidth={6} strokeLinecap="round" /></g>
          </g>; })}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.N + 0.2} until={K.C - 0.2} valor={1000000} dur={1.2} prefijo="1 en " etiqueta="menos de" y={560} tam={130} color={KC.red} />
      <Chip T={T} at={K.N + 1.0} until={K.C - 0.2} texto="alguien al azar · 1 apariencia registrada" x={540} y={760} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.N + 1.6} until={K.C - 0.2} texto="cifra de Apple" x={540} y={1150} tam={30} borde={KC.ink} />

      {/* 7 · comparativa */}
      <Escena T={T} a={K.C} b={K.E}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <TarjetaDato T={T} at={K.C + 0.1} until={K.E - 0.2} y={410} icono={<IcoCara />} titulo="cara (Face ID)" valor="1 en 1,000,000" fuente="menos de · Apple, 2026" color={KC.red} />
      <TarjetaDato T={T} at={K.C + 0.6} until={K.E - 0.2} y={640} icono={<IcoHuella />} titulo="huella (Touch ID), 1 dedo registrado" valor="1 en 50,000" fuente="Apple, 2023" color={KC.orange} />
      <TarjetaDato T={T} at={K.C + 3.2} until={K.E - 0.2} y={870} icono={<IcoCodigo />} titulo="adivinar un código de 4 dígitos" valor="1 en 10,000" fuente="Apple, 2023" color={KC.blue} />
      <Chip T={T} at={K.C + 1.2} until={K.E - 0.2} texto="cifras de Apple" x={380} y={1140} tam={30} borde={KC.ink} />

      {/* 8 · el estudio: la presentación de 2017 */}
      <Escena T={T} a={K.E} b={K.Ge}>
        <FondoLunares color={KC.lilac} />
        {svg(<g opacity={kprog(T, K.E + 1.4, K.E + 1.8)}>{FI_PUNTOS.slice(0, 120).map((p, i) => <circle key={i} cx={540 + p.nx * 480} cy={980 + p.ny * 200} r={5} fill={KC.red} opacity={0.35 + 0.35 * Math.sin(T * 7 + i)} />)}</g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ge - 0.3} anio="2017" quien="Cupertino, California" revista="Apple presenta el iPhone X · 12 sep 2017" x={620} y={560} />
      <NumeroGigante T={T} at={K.E + 1.6} until={K.Ge - 0.3} valor={30000} dur={1.0} etiqueta="más de" y={960} tam={170} color={KC.red} />
      <Chip T={T} at={K.E + 2.4} until={K.Ge - 0.3} texto="puntos infrarrojos · hoy Apple dice «miles»" x={540} y={1150} tam={28} borde={KC.ink} />

      {/* 9 · gemelos, hermanos y niños */}
      <Escena T={T} a={K.Ge} b={K.O}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <g opacity={kprog(T, K.Ge + 0.6, K.Ge + 1.0)}>
            <Cara x={170} y={880} s={0.45} T={T} piel="#d9a27c" pelo="#2a1a12" camisa={KC.pink} malla={kprog(T, K.Ge + 1.4, K.Ge + 2.0)} />
            <Cara x={400} y={880} s={0.45} T={T} piel="#d9a27c" pelo="#2a1a12" camisa={KC.cyan} malla={kprog(T, K.Ge + 1.4, K.Ge + 2.0)} />
            <text x={285} y={900} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Ge + 2.0, K.Ge + 2.3)}>≈</text>
          </g>
          <g opacity={kprog(T, K.Ge + 3.0, K.Ge + 3.4)}><Cara x={650} y={880} s={0.42} T={T} piel="#d9a27c" pelo="#3a2414" camisa={KC.orange} peinado={1} /></g>
          <g opacity={kprog(T, K.Ge + 4.4, K.Ge + 4.8)}><Cara x={890} y={930} s={0.32} T={T} piel="#e2b08a" pelo="#2a1a12" camisa={KC.mint} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ge + 0.3} until={K.O - 0.2} texto="aviso de Apple: probabilidad ↑" x={380} y={520} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ge + 1.0} until={K.O - 0.2} texto="gemelos" x={285} y={1100} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ge + 3.2} until={K.O - 0.2} texto="hermanos parecidos" x={650} y={1040} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Ge + 4.6} until={K.O - 0.2} texto="menores de 13" x={880} y={1130} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Ge + 5.4} until={K.O - 0.2} texto="sus rasgos pueden no estar del todo desarrollados" x={540} y={640} tam={24} borde={KC.texto} />

      {/* 10 · ojos abiertos */}
      <Escena T={T} a={K.O} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cara x={330} y={880} s={0.95} T={T} ojos={kprog(T, K.O + 3.0, K.O + 3.3)} boca={T > K.O + 3.3 ? 'sonrisa' : 'recta'} camisa={KC.blue} />
          {T < K.O + 3.0 && [0, 1, 2].map((k) => { const u = ((T - K.O) * 0.6 + k / 3) % 1; return <text key={k} x={470 + u * 80} y={620 - u * 160} style={{ font:`400 ${50 + k * 14}px ${KF.titulo}` }} fill={KC.violet} opacity={Math.sin(Math.PI * u)}>Z</text>; })}
          <Celular x={830} y={1000} s={0.75} T={T} proyector={1} estado={T > K.O + 3.5 ? 'abierto' : 'cerrado'} abre={kprog(T, K.O + 3.5, K.O + 3.9, kEase.sale)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 0.5} until={K.O + 2.9} texto="ojos cerrados: no abre" x={330} y={420} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.O + 3.6} until={K.Ci - 0.2} texto="de fábrica · se puede apagar en Accesibilidad" x={540} y={1160} tam={26} borde={KC.ink} />

      {/* 11 · cierre: la misma imagen del inicio, ya como mapa */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.06} origen="35% 45%">
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Cara x={340} y={860} s={1.15} T={T} puntos={1 - kprog(T, K.Ci + 0.6, K.Ci + 1.6)} malla={kprog(T, K.Ci + 0.4, K.Ci + 1.4)} />
          <Celular x={850} y={1000} s={0.8} T={T} proyector={1} estado="abierto" abre={1} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="tu cara = un mapa" x={330} y={400} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou} texto="¿gemelo? usa un código ••••" x={540} y={1160} tam={36} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No te ve la cara: *te la mide.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.R - 0.1} texto="Un *mapa de profundidad* de tu cara" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.F - 0.1} texto="Una *red neuronal* la compara" />
      <Subtitulo T={T} idx={3} at={K.F + 0.1} until={K.P - 0.1} texto="Una foto *no tiene profundidad*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.N - 0.1} texto="¿Y *otra cara?*" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.C - 0.1} texto="Menos de *1 en un millón*" />
      <Subtitulo T={T} idx={6} at={K.C + 0.1} until={K.E - 0.1} texto="Huella: *1 en 50 mil.* Código: *1 en 10 mil.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Ge - 0.1} texto="2017: *más de 30 mil puntos*" />
      <Subtitulo T={T} idx={8} at={K.Ge + 0.1} until={K.O - 0.1} texto="Gemelos, hermanos, niños: *sube*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.Ci - 0.1} texto="Revisa tus *ojos abiertos*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No es una llave: *es un mapa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mapa + 1.5, CUES.Red - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Red + 3.0, CUES.Foto - 0.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Foto + 0.8, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Numero + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Comparativa + 1.0, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 2.5, CUES.Gemelos - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Gemelos + 0.6, CUES.Ojos - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Ojos + 2.6, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="57" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FaceIdApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FaceId /></CompositionStage></div>;
}
window.FaceIdApp = FaceIdApp;
