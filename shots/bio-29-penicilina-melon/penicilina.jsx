// Shot Biotecnológico #29 · Esa penicilina no salió del moho de Fleming: salió de un melón podrido — NARRADO (N1 + N2 + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (melón, moho, tanque, lámparas y cepas).
const MOHO = '#3d9b8a', MOHO2 = '#7fd1bd', CASCARA = '#d2b47a', RED_M = '#f3e6c2', PENI = '#f4c25a', MAIZ = '#e0b23a';

function Capa({ children, z = 20 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

/* ---------- melón cantalupo (cáscara de red) con mancha de moho ---------- */
const MELON_RED = (() => { const R = krng(41), L = [];
  for (let i = 0; i < 70; i++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * 250, x = Math.cos(a) * d, y = Math.sin(a) * d * 0.85;
    const n = 5 + Math.floor(R() * 2), r = 18 + R() * 14; let p = '';
    for (let k = 0; k <= n; k++) { const b = (k / n) * Math.PI * 2 + R() * 0.3; p += (k ? ' L ' : 'M ') + (x + Math.cos(b) * r).toFixed(1) + ' ' + (y + Math.sin(b) * r * 0.9).toFixed(1); }
    L.push(p + ' Z'); }
  return L; })();
function Melon({ T, x, y, s = 1, moho = 1, id = 'm' }) {
  const R = krng(7);
  const fuzz = Array.from({ length: 34 }, () => [R() * Math.PI * 2, Math.sqrt(R()), 10 + R() * 18, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={10} cy={235} rx={250} ry={34} fill="rgba(0,0,0,.22)" />
    <defs><clipPath id={id + 'c'}><ellipse rx={262} ry={226} /></clipPath>
      <radialGradient id={id + 'g'} cx="38%" cy="32%" r="80%"><stop offset="0" stopColor="#ead29a" /><stop offset="1" stopColor="#a98a4e" /></radialGradient></defs>
    <ellipse rx={262} ry={226} fill={`url(#${id}g)`} stroke={KC.ink} strokeWidth={11} />
    <g clipPath={`url(#${id}c)`}>{MELON_RED.map((d, i) => <path key={i} d={d} fill="none" stroke={RED_M} strokeWidth={6} opacity={0.85} />)}</g>
    <ellipse cx={-6} cy={-214} rx={22} ry={12} fill="#7a6232" stroke={KC.ink} strokeWidth={5} />
    <path d="M -150 -120 Q -120 -170 -60 -180" stroke="rgba(255,255,255,.55)" strokeWidth={16} fill="none" strokeLinecap="round" />
    {moho > 0 && <g transform="translate(70 -10)">
      <ellipse rx={120 * moho} ry={95 * moho} fill="#e9f5ef" opacity={0.95} />
      {fuzz.map(([a, d, r, p], i) => <circle key={i} cx={Math.cos(a) * d * 120 * moho} cy={Math.sin(a) * d * 95 * moho} r={r * moho * (1 + 0.08 * Math.sin(T * 3 + p))}
        fill={d > 0.8 ? '#f4fbf7' : (i % 3 ? MOHO : '#2f7f71')} opacity={0.95} />)}
      <ellipse rx={50 * moho} ry={38 * moho} fill="#2f7f71" opacity={0.9} />
    </g>}
  </g>;
}

/* ---------- frasquito de penicilina ---------- */
function Frasquito({ x, y, s = 1, etq = 'PENICILINA', o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-120} width={140} height={230} rx={26} fill="rgba(230,245,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-56} y={20} width={112} height={78} rx={14} fill="#fff8e8" />
    <rect x={-46} y={-160} width={92} height={44} rx={10} fill="#a8b2bc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-36} y={-184} width={72} height={28} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <rect x={-62} y={-60} width={124} height={62} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text y={-20} textAnchor="middle" style={{ font:`700 16px ${KF.mono}` }} fill={KC.ink}>{etq}</text>
    <path d="M -50 -100 L -50 60" stroke="rgba(255,255,255,.8)" strokeWidth={10} strokeLinecap="round" />
  </g>;
}

/* ---------- caja de Petri de Fleming (colonia con halo) ---------- */
function PetriFleming({ T, x, y, r = 210, colonia = 1 }) {
  return <PlacaPetri x={x} y={y} r={r} agar="#f1d27a" id={'pf' + x}>
    <circle r={r * 0.5 * colonia} fill="rgba(255,255,255,.35)" />
    <circle r={r * 0.28 * colonia} fill="#e9f5ef" />
    <circle r={r * 0.2 * colonia} fill={MOHO} />
    {[[-0.65, -0.3], [0.6, 0.35], [-0.2, 0.7], [0.5, -0.6]].map(([a, b], i) => <circle key={i} cx={a * r} cy={b * r} r={14 + (i % 2) * 6} fill="#f6f0d0" stroke="#c9b98a" strokeWidth={3} />)}
  </PlacaPetri>;
}

/* ---------- Penicillium al microscopio: conidióforo en "pincel" con cadenas de esporas redondas ---------- */
function Pincel({ T, x, y, s = 1, crece = 1, seed = 1 }) {
  const ramas = [-1, 0, 1];
  const largo = 280 * Math.min(1, crece * 1.6);
  const cad = Math.max(0, Math.min(1, crece * 1.6 - 0.6));
  const sw = mece(T, seed, 0.4) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sw})`}>
    <path d={`M 0 0 L 0 ${-largo}`} stroke="#d9efe8" strokeWidth={18} strokeLinecap="round" />
    <path d={`M 0 0 L 0 ${-largo}`} stroke="#9ccfc2" strokeWidth={6} strokeLinecap="round" />
    {largo >= 270 && ramas.map((k) => { const mx = k * 34, my = -largo - 46;
      return <g key={k}>
        <path d={`M 0 ${-largo} L ${mx} ${my}`} stroke="#d9efe8" strokeWidth={14} strokeLinecap="round" />
        {[-1, 0, 1].map((j) => { const fx = mx + j * 16 + k * 10, fy = my - 30, ang = (k * 14 + j * 8) * Math.PI / 180;
          const n = Math.round(6 * cad);
          return <g key={j}>
            <path d={`M ${mx} ${my} L ${fx} ${fy}`} stroke="#c3e6dc" strokeWidth={9} strokeLinecap="round" />
            {Array.from({ length: n }, (_, q) => { const d = 20 + q * 22; return <circle key={q} cx={fx + Math.sin(ang) * d + mece(T, seed * 9 + q + j, 0.6) * 2} cy={fy - Math.cos(ang) * d} r={10}
              fill={q > 3 ? MOHO2 : MOHO} stroke="#0d2a25" strokeWidth={3} />; })}
          </g>; })}
      </g>; })}
  </g>;
}
function MicroMoho({ T, w, h, crece = 1 }) {
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={w} height={h} fill="#0b1d22" />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M -20 ${h * 0.78 + i * 18} Q ${w * 0.3} ${h * 0.7 + i * 22 + mece(T, i, 0.3) * 8} ${w * 0.6} ${h * 0.8 + i * 10} T ${w + 20} ${h * 0.76 + i * 16}`}
      stroke="#bfe3d9" strokeWidth={10} fill="none" opacity={0.75} />)}
    <Pincel T={T} x={w * 0.32} y={h * 0.8} s={0.62} crece={crece} seed={2} />
    <Pincel T={T} x={w * 0.62} y={h * 0.82} s={0.78} crece={Math.max(0, crece - 0.1)} seed={5} />
  </svg>;
}

/* ---------- tanque por dentro: burbujas, pellets de hifas y gotitas de penicilina ---------- */
function MicroTanque({ T, w, h, peni = 1 }) {
  const R = krng(13);
  const pel = Array.from({ length: 7 }, () => [R() * w, R() * h, 30 + R() * 26, R() * 6]);
  const bur = Array.from({ length: 16 }, () => [R() * w, R(), 8 + R() * 18]);
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={w} height={h} fill="#2a2210" />
    {bur.map(([bx, f, r], i) => { const yy = h - ((f * h + T * 160) % (h + 60)) + 30; return <circle key={'b' + i} cx={bx + mece(T, i, 0.6) * 10} cy={yy} r={r} fill="rgba(255,255,255,.12)" stroke="#fff" strokeWidth={3} opacity={0.8} />; })}
    {pel.map(([px, py, r, p], i) => { const cx = (px + T * 30 + mece(T, i, 0.2) * 30) % (w + 80) - 40, cy = py + mece(T, i + 3, 0.3) * 20;
      return <g key={'p' + i} transform={`translate(${cx} ${cy}) rotate(${T * 20 + p * 60})`}>
        {Array.from({ length: 10 }, (_, k) => { const a = k * 0.63; return <path key={k} d={`M 0 0 Q ${Math.cos(a + 0.5) * r * 0.6} ${Math.sin(a + 0.5) * r * 0.6} ${Math.cos(a) * r} ${Math.sin(a) * r}`} stroke="#d8eadf" strokeWidth={6} fill="none" strokeLinecap="round" />; })}
        <circle r={r * 0.32} fill="#bfe3d9" />
        {peni > 0 && [0, 1, 2].map((k) => { const a = k * 2.1 + T * 0.8, d = r + 14 + ((T * 30 + k * 20) % 30); return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={7 * peni} fill={PENI} stroke={KC.ink} strokeWidth={2} />; })}
      </g>; })}
  </svg>;
}

/* ---------- costal de licor de maíz ---------- */
function Costal({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d="M -110 -150 Q 0 -190 110 -150 L 130 140 Q 0 180 -130 140 Z" fill="#c9a26b" stroke={KC.ink} strokeWidth={9} />
    <path d="M -110 -150 Q 0 -120 110 -150" fill="none" stroke={KC.ink} strokeWidth={6} />
    <g transform="translate(0 -20)"><ellipse rx={30} ry={70} fill={MAIZ} stroke={KC.ink} strokeWidth={5} />
      {[-40, -15, 10, 35].map((dy) => <line key={dy} x1={-24} y1={dy} x2={24} y2={dy} stroke="#b88a1c" strokeWidth={4} />)}
      <path d="M -30 30 Q -70 -10 -40 -70 M 30 30 Q 70 -10 40 -70" fill="#7cc35a" stroke={KC.ink} strokeWidth={5} /></g>
    <text y={110} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>LICOR DE MAÍZ</text>
  </g>;
}

/* ---------- lámparas de rayos X y luz ultravioleta ---------- */
function Lampara({ x, y, tipo = 'rx', on = 1, T }) {
  const c = tipo === 'rx' ? '#bff3ff' : '#c18cff';
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -40 40 L -150 360 L 150 360 L 40 40 Z`} fill={c} opacity={0.22 * on * (0.8 + 0.2 * Math.sin(T * 14))} />
    {tipo === 'rx'
      ? <g><rect x={-90} y={-60} width={180} height={100} rx={20} fill="#8d99a6" stroke={KC.ink} strokeWidth={8} /><circle cy={-10} r={26} fill={on ? c : '#5c6670'} stroke={KC.ink} strokeWidth={6} /></g>
      : <g><rect x={-110} y={-30} width={220} height={52} rx={26} fill={on ? '#e0c8ff' : '#7d6a99'} stroke={KC.ink} strokeWidth={8} /><rect x={-70} y={-66} width={140} height={38} rx={10} fill="#5b4a7a" stroke={KC.ink} strokeWidth={6} /></g>}
    <text y={tipo === 'rx' ? 70 : 56} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{tipo === 'rx' ? 'RAYOS X' : 'LUZ UV'}</text>
  </g>;
}
function PetriColonias({ x, y, r = 105, apaga = 0, gana = false, brillo = 0, id }) {
  return <g>
    {gana && brillo > 0 && <circle cx={x} cy={y} r={r + 30 + 8 * brillo} fill={KC.gold2} opacity={0.45 * brillo} />}
    <PlacaPetri x={x} y={y} r={r} agar="#f1d27a" id={id}>
      {[[-0.4, -0.3], [0.35, -0.35], [0, 0.1], [-0.35, 0.4], [0.4, 0.35]].map(([a, b], i) => <circle key={i} cx={a * r} cy={b * r} r={r * (gana && i === 2 ? 0.3 : 0.17)}
        fill={gana ? mixHex(MOHO, KC.gold2, brillo) : mixHex(MOHO, '#8a8f99', apaga)} stroke={KC.ink} strokeWidth={3} opacity={1 - apaga * 0.4} />)}
    </PlacaPetri>
  </g>;
}

/* ---------- tubos de caldo (estudio) ---------- */
function Tubo({ x, y0 = 640, y1 = 1040, llen = 0, color = PENI, arriba, abajo }) {
  const h = y1 - y0, nivel = y1 - (h - 30) * llen;
  return <g>
    <rect x={x - 70} y={y0} width={140} height={h} rx={60} fill="rgba(235,248,255,.6)" stroke={KC.ink} strokeWidth={8} />
    <clipPath id={'tb' + x}><rect x={x - 62} y={y0 + 8} width={124} height={h - 16} rx={54} /></clipPath>
    <g clipPath={`url(#tb${x})`}><rect x={x - 70} y={nivel} width={140} height={h} fill={color} /><path d={`M ${x - 70} ${nivel} q 35 -10 70 0 t 70 0`} fill={color} stroke="rgba(255,255,255,.7)" strokeWidth={4} /></g>
    <path d={`M ${x - 40} ${y0 + 40} L ${x - 40} ${y1 - 50}`} stroke="rgba(255,255,255,.7)" strokeWidth={10} strokeLinecap="round" />
    {arriba && llen > 0.02 && <text x={x} y={y0 - 26} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.ink}>{arriba}</text>}
    {abajo && <text x={x} y={y1 + 46} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{abajo}</text>}
  </g>;
}

/* ---------- laboratorio del USDA en Peoria (esquemático) ---------- */
function Laboratorio({ T, x, y, frascos = 1 }) {
  const cols = ['#3d9b8a', '#e0b23a', '#b18cff', '#ff8a1f', '#2fe0a8', '#ff6b5a', '#7fd1bd', '#c9a26b'];
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-380} y={-260} width={760} height={460} fill="#d98a5f" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-380} y1={-200 + i * 70} x2={380} y2={-200 + i * 70} stroke="#b86f48" strokeWidth={4} />)}
    <path d="M -420 -260 L 0 -380 L 420 -260 Z" fill="#8c5a3c" stroke={KC.ink} strokeWidth={10} />
    <rect x={-260} y={-235} width={520} height={70} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text y={-188} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>USDA · NRRL</text>
    {[-250, 250].map((wx) => <g key={wx}><rect x={wx - 90} y={-130} width={180} height={150} fill="#bfe8ff" stroke={KC.ink} strokeWidth={7} />
      <line x1={wx} y1={-130} x2={wx} y2={20} stroke={KC.ink} strokeWidth={5} /></g>)}
    <rect x={-70} y={40} width={140} height={160} fill="#6b4a32" stroke={KC.ink} strokeWidth={7} />
    {/* repisa de frascos con mohos */}
    <rect x={-360} y={250} width={720} height={20} fill="#8c5a3c" stroke={KC.ink} strokeWidth={5} />
    {cols.map((c, i) => { const on = kprog(frascos * 8, i, i + 1); const fx = -320 + i * 92;
      return <g key={i} transform={`translate(${fx} ${250 - 70 * on}) scale(${on})`} opacity={on}>
        <rect x={-32} y={-10} width={64} height={80} rx={12} fill="rgba(235,248,255,.7)" stroke={KC.ink} strokeWidth={5} />
        <ellipse cy={40} rx={24} ry={16 + Math.sin(T * 2 + i) * 2} fill={c} />
        <rect x={-26} y={-24} width={52} height={18} rx={5} fill="#a8b2bc" stroke={KC.ink} strokeWidth={4} />
      </g>; })}
  </g>;
}

/* ---------- silueta (versiones de quién halló el melón) ---------- */
function Silueta({ x, y, s = 1, color = KC.violet, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={-150} r={70} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 60 Q -130 -60 0 -70 Q 130 -60 130 60 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
  </g>;
}

/* ---------- caja de dosis (torre del Día D) ---------- */
function Caja({ x, y, w = 200, h = 90, color = KC.paper }) {
  return <g><rect x={x - w / 2} y={y - h} width={w} height={h} rx={8} fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={x - w / 2 + 16} y={y - h + 18} width={w - 32} height={22} rx={4} fill={KC.red} />
    <text x={x} y={y - 18} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>PENICILINA</text></g>;
}

function Penicilina() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Po: CUES.Poquita, Pe: CUES.Peoria, Me: CUES.Melon, Se: CUES.Seis, Ta: CUES.Tanque, Pr: CUES.Pregunta, Mu: CUES.Mutantes, Es: CUES.Estudio, Di: CUES.DiaD, Ma: CUES.Mary, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const rueda = kprog(T, K.G + 0.1, K.G + 1.2, kEase.sale);
  // tiempos del estudio, atados a la frase (150 · 300 · 550)
  const e150 = K.Es + 2.6, e300 = K.Es + 5.2, e550 = K.Es + 6.9;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco, la caja de Fleming tachada y el melón que llega rodando */}
      <Escena T={T} a={K.G} b={K.Po} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Frasquito x={170} y={1040} s={1.05} />
          <g opacity={1 - 0.6 * kprog(T, K.G + 1.4, K.G + 1.9)}><PetriFleming T={T} x={330} y={700} r={130} /></g>
          <g transform={`rotate(${(1 - rueda) * 160} ${klerp(1300, 640, rueda)} 960)`}><Melon T={T} x={klerp(1300, 640, rueda)} y={960} s={0.95} moho={kprog(T, K.G + 0.6, K.G + 2.6, kEase.sale)} id="mg" /></g>
        </Capa>
      </Escena>
      {/* 1 · Fleming hacía muy poca */}
      <Escena T={T} a={K.Po} b={K.Pe} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <PetriFleming T={T} x={540} y={820} r={250} />
          <Goteo T={T} x={540} y0={900} y1={1130} cada={1.6} color={PENI} r={6} desde={K.Po + 0.6} hasta={K.Pe} />
          <Frasquito x={540} y={1150} s={0.7} etq="1941" />
        </Capa>
        <Medidor T={T} at={K.Po + 1.8} until={K.Pe - 0.2} valor={(t) => 0.03 + 0.01 * Math.sin(t * 5)} etiqueta="penicilina en EE. UU. · 1941" texto={() => 'ni para 1 paciente'} y={1420} color={KC.red} />
      </Escena>
      {/* 2 · Peoria: el laboratorio del gobierno busca mohos */}
      <Escena T={T} a={K.Pe} b={K.Me} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa><Laboratorio T={T} x={540} y={900} frascos={kprog(T, K.Pe + 1.2, K.Pe + 3.8)} /></Capa>
      </Escena>
      {/* 3–4 · el melón mohoso de Peoria (1943) y el moho al microscopio */}
      <Escena T={T} a={K.Me} b={K.Ta} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        <Capa><Melon T={T} x={540} y={980} s={1.15} moho={1} id="mm" /></Capa>
        <Escala T={T} z={1} pxPorMm={3.5 * 1.15} y={1420} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Se + 0.05} until={K.Ta - 0.25} x={540} y={700} r={230} fx={620} fy={968} interior={(t, r) => <MicroMoho T={t} w={r * 2} h={r * 2} crece={kprog(t, K.Se, K.Se + 2.4)} />}
        tinte={KC.mint} etiqueta="AL MICROSCOPIO · Penicillium" />
      {/* 5 · el tanque de fermentación sumergida con licor de maíz */}
      <Escena T={T} a={K.Ta} b={K.Pr} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={klerp(0.2, 0.75, kprog(T, K.Ta, K.Pr))} burbujas={1} rpm={110} fondo={KC.orange} />
        <Capa z={25}>
          <Costal x={klerp(-200, 150, kprog(T, K.Ta + 1.6, K.Ta + 2.4, kEase.sale))} y={560} s={0.8} inclina={klerp(0, 55, kprog(T, K.Ta + 2.4, K.Ta + 3.0))} />
          <Goteo T={T} x={290} y0={600} y1={760} cada={0.2} color={MAIZ} desde={K.Ta + 3.0} hasta={K.Pr - 0.4} r={10} />
        </Capa>
      </Escena>
      <Lupa T={T} at={K.Ta + 0.5} until={K.Ta + 2.4} x={540} y={760} r={210} fx={540} fy={1010} interior={(t, r) => <MicroTanque T={t} w={r * 2} h={r * 2} peni={kprog(t, K.Ta + 1.0, K.Ta + 2.0)} />}
        tinte={PENI} etiqueta="POR DENTRO · el tanque" />
      {/* 6 · re-gancho: el moho ya no da más */}
      <Escena T={T} a={K.Pr} b={K.Mu} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <Capa><text x={270} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 880)`}>?</text></Capa>
        <Medidor T={T} at={K.Pr + 0.2} until={K.Mu - 0.2} valor={(t) => 0.42 + 0.012 * Math.sin(t * 18)} etiqueta="penicilina del moho" texto={() => 'tope'} y={1420} color={KC.yellow} />
      </Escena>
      {/* 7 · mutantes: rayos X y luz UV sobre colonias; se escoge la que más produce */}
      <Escena T={T} a={K.Mu} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Lampara T={T} x={480} y={560} tipo="rx" on={kprog(T, K.Mu + 0.2, K.Mu + 0.5)} />
          <Lampara T={T} x={820} y={560} tipo="uv" on={kprog(T, K.Mu + 0.9, K.Mu + 1.2)} />
          {[[300, 960], [540, 960], [780, 960], [420, 1150], [660, 1150]].map(([px, py], i) => { const gana = i === 3;
            return <PetriColonias key={i} id={'pc' + i} x={px} y={py} r={100} gana={gana} brillo={gana ? kprog(T, K.Mu + 2.6, K.Mu + 3.2) : 0} apaga={gana ? 0 : kprog(T, K.Mu + 2.0 + i * 0.1, K.Mu + 2.6 + i * 0.1)} />; })}
        </Capa>
      </Escena>
      {/* 8 · el estudio: microgramos de penicilina por mililitro de caldo */}
      <Escena T={T} a={K.Es} b={K.Di} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Tubo x={240} llen={0.27 * kprog(T, e150, e150 + 0.8, kEase.sale)} color="#d9e8b0" arriba="60–150" abajo="silvestre" />
          <Tubo x={540} llen={0.55 * kprog(T, e300, e300 + 0.8, kEase.sale)} color={MAIZ} arriba="300" abajo="rayos X" />
          <Tubo x={840} llen={1.0 * kprog(T, e550, e550 + 0.9, kEase.sale)} color={PENI} arriba="550" abajo="UV · Wisconsin" />
        </Capa>
      </Escena>
      {/* 9 · Día D: la torre de dosis */}
      <Escena T={T} a={K.Di} b={K.Ma} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>{Array.from({ length: 9 }, (_, i) => { const on = kprog(T, K.Di + 0.1 + i * 0.22, K.Di + 0.4 + i * 0.22, kEase.sale);
          return on > 0 ? <g key={i} transform={`translate(0 ${(1 - on) * -300})`} opacity={on}><Caja x={i % 2 ? 200 : 190} y={1190 - i * 86} w={230} h={86} color={i % 2 ? KC.paper : '#fff8e8'} /></g> : null; })}</Capa>
      </Escena>
      {/* 10 · Mary la Mohosa: nadie sabe bien quién fue */}
      <Escena T={T} a={K.Ma} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        <Capa>
          <g opacity={1 - kprog(T, K.Ma + 2.4, K.Ma + 2.9)}><Silueta x={540} y={1000} s={1.4} color={KC.violet} />
            <rect x={430} y={1010} width={220} height={60} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
            <text x={540} y={1050} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>MOLDY MARY</text>
            <Melon T={T} x={760} y={1080} s={0.32} moho={1} id="mmary" /></g>
          {[260, 540, 820].map((sx, i) => { const on = kprog(T, K.Ma + 2.6 + i * 0.3, K.Ma + 3.0 + i * 0.3, kEase.sale);
            return <g key={i} opacity={on}><Silueta x={sx} y={1060} s={0.85} color={[KC.violet, KC.blue, KC.teal][i]} />
              <text x={sx} y={860 - Math.sin(T * 4 + i) * 8} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6}>?</text></g>; })}
        </Capa>
      </Escena>
      {/* 11 · cierre: el mismo melón del inicio, padre de las cepas de hoy */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          {(() => { const p = kprog(T, K.Ci + 0.6, K.Ci + 3.0, kEase.suave), ox = 600, oy = 760;
            const hojas = [[160, 1160], [330, 1210], [540, 1230], [750, 1210], [920, 1160]];
            return <g>
              {hojas.map(([hx, hy], i) => { const q = kclamp(p * 1.3 - i * 0.06, 0, 1);
                return <g key={i}><path d={`M ${ox} ${oy} C ${ox} ${oy + 200} ${hx} ${hy - 260} ${klerp(ox, hx, q)} ${klerp(oy, hy - 110, q)}`} stroke={MOHO} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - q)} />
                  {q > 0.95 && <Frasquito x={hx} y={hy} s={0.42} etq="HOY" />}</g>; })}
            </g>; })()}
          <Melon T={T} x={540} y={760} s={0.8} moho={1} id="mc" />
        </Capa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.Po - 0.2} texto="moho de Fleming" x={330} y={470} tam={44} />
      <Etq T={T} at={K.G + 1.6} until={K.Po - 0.2} x={300} y={1440} texto="melón cantalupo" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Po + 0.4} until={K.Pe - 0.2} x={90} y={470} texto="Penicillium de Fleming" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Pe + 0.3} until={K.Me - 0.2} texto="Peoria, Illinois" x={540} y={470} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.Pe + 1.4} until={K.Me - 0.2} texto="buscando mohos mejores" y={1500} tam={40} borde={MOHO} />
      <Chip T={T} at={K.Me + 0.2} until={K.Se - 0.1} texto="1943 · Peoria" x={540} y={470} tam={52} borde={KC.gold} />
      <Comparativa T={T} at={K.Se + 1.2} until={K.Ta - 0.25} izq={{ valor:1, texto:'poca', etiqueta:'Fleming', color:KC.lilac }} der={{ valor:2.5, texto:'> 2×', etiqueta:'melón', color:MOHO2 }} max={2.5} y={1370} alto={190} />
      <Chip T={T} at={K.Ta + 0.2} until={K.Pr - 0.2} texto="fermentación sumergida" x={540} y={300} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Ta + 2.6} until={K.Pr - 0.2} x={90} y={760} texto="desecho de la fécula" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ta + 2.6} until={K.Pr - 0.2} texto="aire + agitación + licor de maíz" y={1500} tam={36} borde={MAIZ} />
      <Chip T={T} at={K.Mu + 2.8} until={K.Es - 0.2} texto="se queda la que más produce" y={1500} tam={40} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={e150 - 0.2} anio="años 40" quien="NRRL 1951 → X-1612 → Q-176" revista="Peoria · Cold Spring Harbor · Wisconsin" x={540} y={600} />
      <Chip T={T} at={e150 - 0.1} until={K.Di - 0.2} texto="µg de penicilina por mL de caldo" x={400} y={1500} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Di + 0.2} until={K.Ma - 0.2} texto="Día D · junio 1944" x={380} y={470} tam={46} borde={KC.blue} />
      <NumeroGigante T={T} at={K.Di + 0.6} until={K.Ma - 0.2} valor={2.3} dec={1} dur={1.2} etiqueta="millones de dosis" x={680} y={880} tam={250} color={KC.yellow} />
      <Chip T={T} at={K.Ma + 0.3} until={K.Ci - 0.2} texto="¿quién halló el melón?" x={540} y={470} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Ma + 2.8} until={K.Ci - 0.2} texto="hay varias versiones" y={1500} tam={42} borde={KC.violet} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="NRRL 1951 → cepas de hoy" y={1500} tam={40} borde={MOHO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Po - 0.1} texto="No fue Fleming: *un melón podrido.*" />
      <Subtitulo T={T} idx={1} at={K.Po + 0.1} until={K.Pe - 0.1} texto="1941: *ni para un paciente.*" />
      <Subtitulo T={T} idx={2} at={K.Pe + 0.1} until={K.Me - 0.1} texto="Peoria buscó *mohos mejores.*" />
      <Subtitulo T={T} idx={3} at={K.Me + 0.1} until={K.Se - 0.1} texto="1943: *un melón mohoso.*" />
      <Subtitulo T={T} idx={4} at={K.Se + 0.1} until={K.Ta - 0.1} texto="Hacía *más del doble.*" />
      <Subtitulo T={T} idx={5} at={K.Ta + 0.1} until={K.Pr - 0.1} texto="Hundido en *tanques con aire.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Mu - 0.1} texto="¿Ya no da más? *Que mute.*" />
      <Subtitulo T={T} idx={7} at={K.Mu + 0.1} until={K.Es - 0.1} texto="Rayos X y UV: *los mejores mutantes.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Di - 0.1} texto="De 150 a *550 por mililitro.*" />
      <Subtitulo T={T} idx={9} at={K.Di + 0.1} until={K.Ma - 0.1} texto="Día D: *2.3 millones de dosis.*" />
      <Subtitulo T={T} idx={10} at={K.Ma + 0.1} until={K.Ci - 0.1} texto="¿Mary la Mohosa? *Nadie sabe.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Tu penicilina: *de un melón podrido.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Poquita + 0.8, CUES.Peoria - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Peoria + 0.6, CUES.Melon - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Seis + 0.4, CUES.Tanque - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Tanque + 1.0, CUES.Pregunta - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Mutantes - 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Mutantes + 1.0, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Estudio + 2.6, CUES.DiaD - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [CUES.DiaD + 0.3, CUES.Mary - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Mary + 0.3, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="bioquimica" num="29" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PenicilinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Penicilina /></CompositionStage></div>;
}
window.PenicilinaApp = PenicilinaApp;
