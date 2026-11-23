// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Biotecnológico #45 · La quimio que escondía un árbol (Taxol / paclitaxel) — NARRADO (N1 por dentro + N3 capítulos).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const BARK = '#8c3f33', BARK_O = '#6a2a21', BARK_C = '#b4604c', MADERA = '#f1d9a6';
const MT = '#7cf0c8', HIELO = '#d6f3ff', TAXOL = '#ffcf3a';

function TxSvg({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

/* ---------- el tejo ---------- */
// Ramita de tejo: hojas planas en dos hileras a los lados del tallo (así se ven las de Taxus).
function Ramita({ T, x, y, ang, len, col, col2, seed = 1, crece = 1 }) {
  const L = len * crece, n = Math.max(0, Math.floor(L / 17));
  return <g transform={`translate(${x} ${y}) rotate(${ang + mece(T, seed, 0.35) * 3})`}>
    <line x1={0} y1={0} x2={L} y2={0} stroke={'#5b3a22'} strokeWidth={6} strokeLinecap="round" />
    {Array.from({ length: n }, (_, i) => { const d = 12 + i * 17, k = 1 - (i / (n + 2)) * 0.35;
      return <g key={i}>
        <line x1={d} y1={0} x2={d + 9} y2={-30 * k} stroke={col} strokeWidth={8} strokeLinecap="round" />
        <line x1={d} y1={0} x2={d + 9} y2={30 * k} stroke={col2} strokeWidth={8} strokeLinecap="round" />
      </g>; })}
  </g>;
}
const RAMAS_TEJO = [[-60, -300, 200, 210], [60, -300, -20, 210], [-80, -420, 205, 190], [80, -420, -25, 190], [-50, -540, 215, 160],
  [50, -540, -35, 160], [0, -640, -90, 110], [-30, -360, 160, 150], [30, -480, 20, 150]];
const ARILOS = [[-150, -330], [120, -380], [-90, -470], [150, -300], [40, -560], [-170, -410]];
function Tejo({ T, x, y, s = 1, pelado = 0, seco = 0, seed = 1, arilos = true }) {
  const hoja = mixHex('#1f5e2e', '#8a6a34', seco), col = mixHex('#2f8a44', '#a8813a', seco), col2 = mixHex('#5fb865', '#c9a050', seco);
  const R = krng(seed * 13 + 1);
  const escamas = Array.from({ length: 16 }, () => [(R() - 0.5) * 56, -R() * 300, 6 + R() * 10, R() > 0.5]);
  const giro = mece(T, seed, 0.25) * 1.4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={150} ry={22} fill="rgba(0,0,0,.18)" />
    {/* tronco: corteza delgada, rojiza y escamosa */}
    <path d="M -42 0 Q -36 -150 -30 -320 L 30 -320 Q 36 -150 42 0 Z" fill={BARK} stroke={KC.ink} strokeWidth={8} />
    {escamas.map(([ex, ey, r, c], i) => <ellipse key={i} cx={ex * (1 + ey / 900)} cy={ey} rx={r * 0.7} ry={r * 1.6} fill={c ? BARK_O : BARK_C} opacity={0.85} />)}
    {pelado > 0 && <rect x={-24} y={-20 - 230 * pelado} width={48} height={230 * pelado} rx={10} fill={MADERA} stroke={KC.ink} strokeWidth={4} />}
    {/* copa */}
    <g transform={`rotate(${giro} 0 -260)`}>
      <path d="M -40 -240 Q -270 -250 -235 -410 Q -205 -560 -100 -680 Q 0 -800 90 -690 Q 220 -560 245 -410 Q 270 -250 40 -240 Z" fill={hoja} stroke={KC.ink} strokeWidth={8} />
      {RAMAS_TEJO.map(([rx, ry, a, l], i) => <Ramita key={i} T={T} x={rx} y={ry} ang={a} len={l} col={col} col2={col2} seed={seed + i} />)}
      {arilos && seco < 0.5 && ARILOS.map(([ax, ay], i) => <g key={i} transform={`translate(${ax} ${ay + mece(T, i + seed, 0.5) * 3})`} opacity={1 - seco * 2}>
        <circle r={13} fill="#e8263a" stroke={KC.ink} strokeWidth={4} /><circle cx={0} cy={-5} r={5} fill="#3a2a2a" /></g>)}
    </g>
  </g>;
}

// Suelo oscuro hasta abajo del cuadro, con degradado y matitas (conserva el tinte: verde = bosque, café = tierra).
function Suelo({ y, c1 = '#1f4630', c2 = '#0a1710', id = 'a' }) {
  const g = krng(id.charCodeAt(0) * 7 + 3);
  return <g>
    <defs><linearGradient id={'tx-suelo-' + id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient></defs>
    <rect x={-300} y={y} width={KW + 600} height={1000} fill={'url(#tx-suelo-' + id + ')'} stroke={KC.ink} strokeWidth={5} strokeOpacity={0.5} />
    {Array.from({ length: 26 }, (_, i) => { const px = -40 + g() * (KW + 80), py = y + 30 + g() * 520, k = 0.6 + g() * 0.9;
      return <path key={i} d={`M ${px - 14 * k} ${py} q ${4 * k} ${-22 * k} ${10 * k} ${-26 * k} M ${px} ${py} q 0 ${-28 * k} ${2 * k} ${-34 * k} M ${px + 14 * k} ${py} q ${-4 * k} ${-20 * k} ${-9 * k} ${-24 * k}`} stroke={c1} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.55 + 0.4 * g()} />; })}
  </g>;
}

/* ---------- objetos ---------- */
function BolsaSuero({ T, x, y, s = 1, tubo, nivel = 0.8 }) {
  const gota = ((T * 1.4) % 1);
  return <g>
    {tubo && <path d={tubo} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth={14} strokeLinecap="round" />}
    {tubo && <path d={tubo} fill="none" stroke={KC.ink} strokeWidth={3} strokeLinecap="round" strokeDasharray="2 22" strokeDashoffset={-T * 60} />}
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1={0} y1={-200} x2={0} y2={-160} stroke={KC.ink} strokeWidth={8} />
      <circle cx={0} cy={-210} r={16} fill="none" stroke={KC.ink} strokeWidth={7} />
      <path d="M -95 -160 L 95 -160 Q 110 -160 110 -140 L 110 120 Q 110 170 40 175 L -40 175 Q -110 170 -110 120 L -110 -140 Q -110 -160 -95 -160 Z" fill="rgba(240,250,255,.85)" stroke={KC.ink} strokeWidth={8} />
      <path d={`M -104 ${170 - 320 * nivel + Math.sin(T * 2) * 4} L 104 ${170 - 320 * nivel - Math.sin(T * 2) * 4} L 104 120 Q 104 166 40 169 L -40 169 Q -104 166 -104 120 Z`} fill="#fff1bf" />
      <rect x={-80} y={-110} width={160} height={70} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <text x={0} y={-66} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#0b1020">PACLITAXEL</text>
      <rect x={-16} y={175} width={32} height={40} fill="#e8eef2" stroke={KC.ink} strokeWidth={5} />
      <rect x={-26} y={215} width={52} height={80} rx={12} fill="rgba(240,250,255,.85)" stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={226 + gota * 50} r={7} fill="#fff1bf" stroke={KC.ink} strokeWidth={2} />
    </g>
  </g>;
}
function Matraz({ x, y, s = 1, nivel = 0.6, liquido = '#b4604c', T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <clipPath id={`mz${Math.round(x)}`}><path d="M -40 -200 L -40 -90 L -150 120 Q -160 150 -120 150 L 120 150 Q 160 150 150 120 L 40 -90 L 40 -200 Z" /></clipPath>
    <g clipPath={`url(#mz${Math.round(x)})`}>
      <rect x={-170} y={150 - 300 * nivel + Math.sin(T * 3) * 4} width={340} height={400} fill={liquido} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={-60 + i * 40} cy={130 - ((T * 90 + i * 50) % (280 * nivel + 10))} r={8} fill="rgba(255,255,255,.6)" />)}
    </g>
    <path d="M -40 -200 L -40 -90 L -150 120 Q -160 150 -120 150 L 120 150 Q 160 150 150 120 L 40 -90 L 40 -200 Z" fill="rgba(240,250,255,.25)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-52} y={-214} width={104} height={22} rx={8} fill="#e8eef2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Frasco({ x, y, s = 1, texto = 'TAXOL', sub = 'paclitaxel' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-130} width={180} height={260} rx={30} fill="rgba(240,250,255,.85)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-80} y={-40} width={160} height={160} rx={22} fill="#fff1bf" />
    <rect x={-70} y={-190} width={140} height={66} rx={14} fill={KC.violet} stroke={KC.ink} strokeWidth={8} />
    <rect x={-84} y={-20} width={168} height={110} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.violet}>{texto}</text>
    <text x={0} y={70} textAnchor="middle" style={{ font:`italic 700 22px ${KF.mono}` }} fill="#0b1020">{sub}</text>
  </g>;
}
function Cromosoma({ x, y, rot = 0, s = 1, c1 = KC.pink, c2 = KC.yellow, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[[-1, c1], [1, c2]].map(([k, c], i) => <g key={i}>
      <line x1={-26} y1={-32 * k} x2={26} y2={32 * k} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
      <line x1={-26} y1={-32 * k} x2={26} y2={32 * k} stroke={c} strokeWidth={13} strokeLinecap="round" />
    </g>)}
    <circle r={8} fill={KC.ink} />
  </g>;
}
// Célula dividiéndose (fondo oscuro). f = congelado (0..1), taxol = bolitas pegadas, tres = tercer polo, muere 0..1.
function CelulaDivision({ T, cx = 540, cy = 900, f = 0, taxol = 0, tres = 0, muere = 0, aparece = 1 }) {
  const A = [cx - 300, cy], B = [cx + 300, cy], C = [cx + 20, cy - 205];
  const polos = [A, B, C];
  const memb = mixHex('#ff8fb0', '#8a8f99', muere), mt = mixHex(mixHex(MT, HIELO, f), '#7a8088', muere);
  const pts = Array.from({ length: 48 }, (_, k) => { const a = (k / 48) * Math.PI * 2, b = 1 + muere * 0.07 * Math.sin(k * 5 + T * 2.5) - muere * 0.12;
    return [cx + Math.cos(a) * 380 * b, cy + Math.sin(a) * 255 * b]; });
  const membD = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const crom = Array.from({ length: 5 }, (_, i) => {
    const osc = Math.sin(T * 2.4 + i * 1.3) * 26 * (1 - 0.9 * f);
    const dest = polos[[0, 2, 1, 2, 0][i]], q = kEase.suave(kclamp(muere * 1.4, 0, 1)) * 0.55;
    return [klerp(cx + osc, dest[0], q * (tres > 0.5 ? 1 : 0)) + (tres > 0.5 ? 0 : 0), klerp(cy - 160 + i * 80, dest[1], q * (tres > 0.5 ? 1 : 0)), i];
  });
  const ray = (p, k, n) => { const a = (k / n) * Math.PI * 2, l = 60 + 26 * Math.sin(T * 3 + k) * (1 - 0.9 * f); return [p[0] + Math.cos(a) * l, p[1] + Math.sin(a) * l]; };
  return <g opacity={aparece * (1 - muere * 0.35)}>
    <path d={membD} fill="rgba(255,143,176,.10)" stroke={memb} strokeWidth={7} />
    <path d={membD} fill="none" stroke={memb} strokeWidth={2} opacity={0.5} transform={`translate(${cx} ${cy}) scale(0.94) translate(${-cx} ${-cy})`} />
    {polos.map((p, j) => { const vis = j < 2 ? 1 : tres; if (vis <= 0) return null;
      return <g key={j} opacity={vis}>
        {Array.from({ length: 10 }, (_, k) => { const e = ray(p, k, 10); return <line key={k} x1={p[0]} y1={p[1]} x2={e[0]} y2={e[1]} stroke={mt} strokeWidth={5} strokeLinecap="round" />; })}
        {crom.map(([x, y, i]) => { const lado = j < 2 || i % 2 === 0; if (!lado) return null;
          const kx = j === 0 ? x - 30 : j === 1 ? x + 30 : x, ky = j === 2 ? y - 30 : y;
          return <g key={i}>
            <line x1={p[0]} y1={p[1]} x2={kx} y2={ky} stroke={mt} strokeWidth={7} strokeLinecap="round" />
            <line x1={p[0]} y1={p[1]} x2={kx} y2={ky} stroke="#0d1424" strokeWidth={2} opacity={0.7} />
            {taxol > 0 && [0.3, 0.55, 0.8].map((u, m) => <circle key={m} cx={klerp(p[0], kx, u)} cy={klerp(p[1], ky, u)} r={7 * kclamp(taxol * 3 - m, 0, 1)} fill={TAXOL} stroke={KC.ink} strokeWidth={2} />)}
          </g>; })}
        <circle cx={p[0]} cy={p[1]} r={20} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
      </g>; })}
    {f > 0 && Array.from({ length: 14 }, (_, k) => { const g = krng(k * 31 + 3), px = cx - 260 + g() * 520, py = cy - 180 + g() * 360, tw = 0.5 + 0.5 * Math.sin(T * 5 + k);
      return <g key={k} opacity={f * tw * (1 - muere)} stroke="#fff" strokeWidth={3}><line x1={px - 10} y1={py} x2={px + 10} y2={py} /><line x1={px} y1={py - 10} x2={px} y2={py + 10} /></g>; })}
    {crom.map(([x, y, i]) => <Cromosoma key={i} x={x} y={y} rot={i * 9 - 18} s={0.9} c1={mixHex(KC.pink, '#9a9aa4', muere)} c2={mixHex(KC.yellow, '#b0b0b8', muere)} />)}
  </g>;
}
// Tubo de ensayo con microtúbulos (experimento de 1979: con taxol no se deshacen en frío).
function TuboMT({ T, x, y, con = false, frio = 0, etiqueta }) {
  const R = krng(con ? 7 : 3);
  const rods = Array.from({ length: 7 }, () => [-28 + R() * 56, -170 + R() * 230, (R() - 0.5) * 50]);
  const des = con ? 0 : frio;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -50 -250 L -50 120 Q -50 170 0 170 Q 50 170 50 120 L 50 -250" fill="rgba(240,250,255,.35)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -44 -150 L -44 120 Q -44 164 0 164 Q 44 164 44 120 L 44 -150 Z" fill="rgba(160,220,255,.45)" />
    {rods.map(([rx, ry, a], i) => <g key={i} transform={`translate(${rx} ${ry + Math.sin(T * 1.5 + i) * 4}) rotate(${a})`}>
      {des < 0.98 && <line x1={-34 * (1 - des)} y1={0} x2={34 * (1 - des)} y2={0} stroke={con ? HIELO : MT} strokeWidth={9} strokeLinecap="round" />}
      {des < 0.98 && <line x1={-34 * (1 - des)} y1={0} x2={34 * (1 - des)} y2={0} stroke={KC.ink} strokeWidth={2} opacity={0.6} />}
      {des > 0 && [-30, -15, 0, 15, 30].map((d, k) => <circle key={k} cx={d * (1 + des * 0.6) + Math.sin(T * 4 + k + i) * 6 * des} cy={Math.cos(T * 3 + k) * 8 * des} r={6} fill={MT} opacity={des} />)}
      {con && [-18, 12].map((d, k) => <circle key={k} cx={d} cy={0} r={6} fill={TAXOL} stroke={KC.ink} strokeWidth={2} />)}
    </g>)}
    {etiqueta && <text x={0} y={-275} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
function Hielera({ x, y, w = 560 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} 0 L ${w / 2} 0 L ${w / 2 - 30} 200 L ${-w / 2 + 30} 200 Z`} fill="#1f4f8f" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={-w / 2 + 30 + i * 72} y={-34 + (i % 2) * 12} width={62} height={56} rx={10} fill="rgba(235,248,255,.95)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${(i * 23) % 20 - 10} ${-w / 2 + 61 + i * 72} 0)`} />)}
  </g>;
}
function Paciente({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={240} height={30} rx={8} fill="#cfd8e0" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-250} width={120} height={230} rx={50} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-300} r={58} fill="#e0a27c" stroke={KC.ink} strokeWidth={8} />
    <path d="M -58 -312 Q -50 -372 0 -366 Q 54 -372 60 -310 Q 30 -340 -58 -312 Z" fill="#3a2a22" />
    <line x1={150} y1={-420} x2={150} y2={0} stroke="#8b96a0" strokeWidth={10} />
    <rect x={118} y={-410} width={64} height={90} rx={14} fill="#fff1bf" stroke={KC.ink} strokeWidth={5} />
    <path d="M 150 -320 Q 150 -200 50 -170" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth={8} />
  </g>;
}
function TanqueMini({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-80} y1={180} x2={-110} y2={260} stroke={KC.ink} strokeWidth={10} /><line x1={80} y1={180} x2={110} y2={260} stroke={KC.ink} strokeWidth={10} />
    <defs>
      <linearGradient id="txTanq" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8e9aa6" /><stop offset="0.3" stopColor="#e6edf2" /><stop offset="0.65" stopColor="#c3ced8" /><stop offset="1" stopColor="#6e7a86" /></linearGradient>
      <linearGradient id="txCaldo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9d68c" /><stop offset="1" stopColor="#5a7a3a" /></linearGradient>
    </defs>
    <rect x={-130} y={-200} width={260} height={400} rx={50} fill="url(#txTanq)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-110} y={-120} width={220} height={300} rx={36} fill="url(#txCaldo)" />
    <rect x={-100} y={-112} width={200} height={14} rx={7} fill="#fff" opacity={0.35} />
    {Array.from({ length: 9 }, (_, i) => { const g = krng(i * 5 + 1); return <circle key={i} cx={-90 + g() * 180} cy={170 - ((T * 70 + g() * 300) % 290)} r={6 + g() * 6} fill="rgba(255,255,255,.6)" />; })}
    <rect x={-60} y={-250} width={120} height={50} rx={14} fill="#6f7a84" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={30} r={50} fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Grumos de células vegetales de tejo en el caldo del tanque (vistas al microscopio).
function CelulasTejo({ T, r }) {
  const grumos = [[0.32, 0.38, 7], [0.7, 0.33, 6], [0.5, 0.7, 8], [0.18, 0.7, 4], [0.84, 0.7, 4]];
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#10281c" />
    {grumos.map(([gx, gy, n], j) => { const R = krng(j * 17 + 4); const ox = gx * r * 2 + mece(T, j, 0.2) * 14, oy = gy * r * 2 + mece(T, j + 9, 0.2) * 12;
      return <g key={j}>{Array.from({ length: n }, (_, i) => { const a = R() * 6.28, d = i === 0 ? 0 : 34 + R() * 26, cx = ox + Math.cos(a) * d, cy = oy + Math.sin(a) * d, rr = 26 + R() * 8;
        return <g key={i} transform={`rotate(${R() * 180} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx={rr * 1.25} ry={rr} fill="#9be07a" stroke="#2f6b2a" strokeWidth={5} />
          <ellipse cx={cx + 3} cy={cy - 2} rx={rr * 0.8} ry={rr * 0.6} fill="#d6f5c2" opacity={0.8} />
          <circle cx={cx - rr * 0.7} cy={cy + rr * 0.3} r={7} fill="#3d5a2a" />
        </g>; })}</g>; })}
    {Array.from({ length: 18 }, (_, i) => { const g = krng(i * 7 + 2); const px = g() * r * 2, py = (g() * r * 2 - T * 30 * (0.5 + g())) % (r * 2);
      return <circle key={i} cx={px + Math.sin(T * 2 + i) * 6} cy={py < 0 ? py + r * 2 : py} r={5} fill={TAXOL} stroke={KC.ink} strokeWidth={1.5} />; })}
  </svg>;
}

function Taxol() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Te: CUES.Tejo, Tx: CUES.Taxol, Ca: CUES.Cables, Co: CUES.Congela, Mu: CUES.Muere, Pr: CUES.Pregunta, Es: CUES.Estudio, Ar: CUES.Arboles, Ag: CUES.Agujas, Ta: CUES.Tanque, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // congelado de los microtúbulos: baja la "dinámica" a ~10 % (no a cero)
  const fr = kprog(T, K.Co + 0.6, K.Co + 2.4, kEase.suave);
  const GY = 1420;                                                   // suelo del gancho y del cierre
  const tubo0 = 'M 250 898 Q 235 1200 400 1365 Q 490 1432 592 1404';
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la bolsa de quimio conectada al árbol; el tejo llena el cuadro (1.6× del dibujo anterior) */}
      <Escena T={T} a={K.G} b={K.Te} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <TxSvg>
          <Suelo y={GY} id="g" />
          <Tejo T={T} x={640} y={GY} s={1.32} seed={2} />
          <BolsaSuero T={T} x={250} y={560} s={1.15} tubo={tubo0} nivel={0.8} />
          <circle cx={594} cy={1403} r={16 + Math.sin(T * 6) * 5} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
        </TxSvg>
      </Escena>
      {/* 1 · 1962: la corteza del tejo del Pacífico (árbol 1.5×; la tira de corteza va a la bolsa de muestra) */}
      <Escena T={T} a={K.Te} b={K.Tx}>
        <FondoLunares color={KC.yellow} />
        <TxSvg>
          <Suelo y={1450} c1="#4a3d22" c2="#17120a" id="t" />
          <Tejo T={T} x={500} y={1450} s={1.5} seed={3} pelado={kprog(T, K.Te + 0.6, K.Te + 2.2, kEase.sale) * 0.55} />
          <g transform="translate(900 1345) scale(1.45)"><path d="M -90 -80 L 90 -80 L 80 90 L -80 90 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
            <text x={0} y={20} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#0b1020">1962</text></g>
          {(() => { const c = kprog(T, K.Te + 2.2, K.Te + 3.2, kEase.suave); if (T < K.Te + 0.6) return null;
            return <g transform={`translate(${klerp(500, 900, c)} ${klerp(1230, 1215, c) - Math.sin(c * Math.PI) * 120}) rotate(${c * 70}) scale(1.5)`}><rect x={-22} y={-110} width={44} height={150} rx={12} fill={BARK} stroke={KC.ink} strokeWidth={5} /></g>; })()}
        </TxSvg>
        <Etq T={T} at={K.Te + 0.8} until={K.Tx - 0.3} x={572} y={1180} texto="corteza" color={KC.ink} tam={36} />
      </Escena>
      {/* 2 · de la corteza al Taxol: matraz y frasco grandes; el frasco está desde el inicio (atenuado) y se enciende a su tiempo */}
      <Escena T={T} a={K.Tx} b={K.Ca}>
        <FondoLunares color={KC.pink} />
        <TxSvg>
          {[0, 1, 2].map((i) => { const u = kprog(T, K.Tx - 0.3 + i * 0.35, K.Tx + 0.5 + i * 0.35, kEase.suave); if (u >= 1) return null;
            return <g key={i} transform={`translate(${320 + (i - 1) * 16} ${klerp(400, 780, u)}) rotate(${20 + i * 50 + u * 90})`} opacity={1 - kprog(u, 0.8, 1)}><rect x={-16} y={-60} width={32} height={120} rx={10} fill={BARK} stroke={KC.ink} strokeWidth={5} /></g>; })}
          <Matraz T={T} x={320} y={1010} s={1.6} nivel={klerp(0.15, 0.6, kprog(T, K.Tx, K.Tx + 1.5))} liquido={mixHex(BARK_C, '#fff1bf', kprog(T, K.Tx + 1.2, K.Tx + 2.2))} />
          <FlechaCurva x1={470} y1={600} x2={720} y2={640} p={kprog(T, K.Tx + 1.6, K.Tx + 2.2)} color={KC.ink} T={T} />
          <g transform={`translate(815 1020) scale(${klerp(1.6, 1.8, kprog(T, K.Tx + 2.0, K.Tx + 2.5, kEase.rebote))})`} opacity={klerp(0.22, 1, kprog(T, K.Tx + 2.0, K.Tx + 2.3))}><Frasco x={0} y={0} /></g>
        </TxSvg>
      </Escena>
      {/* 3–5 · la célula por dentro (1.22×; la barra de escala se recalcula sola con z) */}
      <Escena T={T} a={K.Ca} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <TxSvg>
          <g transform="translate(540 880) scale(1.22) translate(-540 -900)">
            <CelulaDivision T={T} f={fr} taxol={kprog(T, K.Co + 0.2, K.Co + 1.4)} tres={kprog(T, K.Mu + 0.2, K.Mu + 1.0)} muere={kprog(T, K.Mu + 0.8, K.Mu + 3.2)} aparece={kprog(T, K.Ca, K.Ca + 0.6)} />
          </g>
        </TxSvg>
        {T < K.Co && <Escala T={T} z={1.22} pxPorMm={33000} objetivo={250} y={1430} />}
      </Escena>
      {/* la Lupa abre la célula desde la bolsa */}
      <Escena T={T} a={K.Ca - 0.2} b={K.Ca + 1.0} zoom={0}>
        <FondoLunares color={KC.mint} />
        <TxSvg><BolsaSuero T={T} x={540} y={900} s={1.6} nivel={0.8} /></TxSvg>
      </Escena>
      {/* 6 · pregunta: diez miligramos (el vial grande al centro; la célula sigue detrás, bajo el velo) */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <TxSvg><g transform={`translate(540 1130) rotate(${Math.sin(T * 3) * 4})`}><Vial x={0} y={0} s={2.5} etiqueta="10 mg" contenido="#f4efe4" tapa={KC.violet} /></g></TxSvg>
      </Escena>
      {/* 7 · 1979: en el tubo de ensayo, con hielo, los microtúbulos con taxol no se deshacen (todo 1.35×) */}
      <Escena T={T} a={K.Es} b={K.Ar}>
        <FondoLunares color={KC.cyan} />
        <TxSvg>
          <g transform="translate(540 1020) scale(1.35) translate(-540 -1000)">
            <TuboMT T={T} x={360} y={1000} con={false} frio={kprog(T, K.Es + 2.6, K.Es + 4.6)} etiqueta="sin taxol" />
            <TuboMT T={T} x={720} y={1000} con={true} frio={kprog(T, K.Es + 2.6, K.Es + 4.6)} etiqueta="con taxol" />
            <Hielera x={540} y={1150} w={640} />
            {T > K.Es + 4.8 && <g opacity={kprog(T, K.Es + 4.8, K.Es + 5.1)}><text x={360} y={690} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4}>✗</text>
              <text x={720} y={690} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.mint} stroke={KC.ink} strokeWidth={4}>✓</text></g>}
          </g>
        </TxSvg>
      </Escena>
      {/* 8 · Cap. 1 corteza: tres árboles por paciente (árboles 1.45× y paciente 1.2×, al centro del cuadro) */}
      <Escena T={T} a={K.Ar} b={K.Ag}>
        <FondoLunares color={KC.yellow} />
        <TxSvg>
          <Suelo y={1340} c1="#4a3d22" c2="#17120a" id="a" />
          {[380, 590, 800].map((tx, i) => { const t0 = K.Ar + 0.8 + i * 0.9;
            return <Tejo key={i} T={T} x={tx} y={1340} s={0.8} seed={5 + i} pelado={kprog(T, t0, t0 + 0.6) * 0.9} seco={kprog(T, t0 + 1.4, t0 + 3.0)} />; })}
          <Paciente x={170} y={1340} s={1.15} />
        </TxSvg>
        <Medidor T={T} at={K.Ar + 0.6} until={K.Ag - 0.3} y={1420} valor={(t) => kprog(t, K.Ar + 0.8, K.Ar + 3.2)} etiqueta="corteza por paciente al año (1992)" texto={(v) => { const n = Math.max(0, Math.round(v * 3)); return n === 1 ? '~1 árbol' : `~${n} árboles`; }} color={BARK_C} />
      </Escena>
      {/* 9 · Cap. 2 hojas: el tejo europeo rebrota (rama 1.3×, matraz 1.3× abajo, donde cae la ramita cortada) */}
      <Escena T={T} a={K.Ag} b={K.Ta}>
        <FondoLunares color={KC.mint} />
        <TxSvg>
          {(() => { const corta = kprog(T, K.Ag + 0.8, K.Ag + 1.2), crece = kprog(T, K.Ag + 2.0, K.Ag + 3.6, kEase.suave), cae = kprog(T, K.Ag + 1.2, K.Ag + 2.2, kEase.entra || kEase.suave);
            return <g>
              <g transform="translate(0 800) scale(1.3) translate(0 -820)">
              <path d="M -20 820 Q 300 780 560 840" fill="none" stroke="#5b3a22" strokeWidth={20} strokeLinecap="round" />
              <Ramita T={T} x={60} y={812} ang={-8} len={300} col="#2f8a44" col2="#5fb865" seed={21} />
              <Ramita T={T} x={250} y={796} ang={-40} len={200} col="#2f8a44" col2="#5fb865" seed={22} />
              <Ramita T={T} x={150} y={806} ang={28} len={170} col="#2f8a44" col2="#5fb865" seed={25} />
              <Ramita T={T} x={540} y={836} ang={-4} len={corta < 1 ? 280 : 280 * Math.max(0.12, crece)} col={crece > 0 && corta >= 1 ? '#7fd36b' : '#2f8a44'} col2="#9be07a" seed={23} />
              {corta >= 1 && <g transform={`translate(${klerp(700, 590, cae)} ${klerp(820, 975, cae)}) rotate(${cae * 70})`} opacity={1 - kprog(T, K.Ag + 2.2, K.Ag + 2.5)}>
                <Ramita T={0} x={-120} y={0} ang={0} len={240} col="#2f8a44" col2="#5fb865" seed={24} /></g>}
              <g transform={`translate(560 836) rotate(${corta < 1 ? -30 + corta * 30 : 0})`} opacity={1 - kprog(T, K.Ag + 1.4, K.Ag + 1.8)}>
                <line x1={0} y1={-40} x2={110} y2={-6} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" /><line x1={0} y1={40} x2={110} y2={6} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
                <circle cx={-14} cy={-50} r={22} fill="none" stroke={KC.red} strokeWidth={10} /><circle cx={-14} cy={50} r={22} fill="none" stroke={KC.red} strokeWidth={10} /></g>
              </g>
              <Matraz T={T} x={765} y={1290} s={1.3} nivel={klerp(0.2, 0.55, kprog(T, K.Ag + 2.2, K.Ag + 3.2))} liquido="#fff1bf" />
            </g>; })()}
        </TxSvg>
        <Etq T={T} at={K.Ag + 0.4} until={K.Ta - 0.3} x={540} y={560} texto="Taxus baccata" it color={KC.ink} tam={36} />
        <Etq T={T} at={K.Ag + 0.7} until={K.Ta - 0.3} x={540} y={615} texto="tejo europeo" color={KC.ink} tam={30} />
      </Escena>
      {/* 10 · Cap. 3 tanque: células de tejo en el caldo */}
      <Escena T={T} a={K.Ta} b={K.Ci} zoom={0.03}>
        {/* modo cine: fondo oscuro con motas y el tanque del propio shot, grande (antes fondo cian con puntos) */}
        <FondoLunares color={KC.leaf} />
        <TxSvg>
          <ellipse cx={540} cy={1490} rx={320} ry={32} fill="#000" opacity={0.4} />
          <TanqueMini T={T} x={540} y={940} s={2.15} />
          <line x1={540} y1={410} x2={540} y2={1250} stroke="#5a6672" strokeWidth={12} />
          {[0, 1].map((k) => <g key={k} transform={`translate(540 ${1000 + k * 200})`}><ellipse rx={150 * Math.abs(Math.cos(T * 3 + k))} ry={16} fill="#8e9aa6" stroke={KC.ink} strokeWidth={5} /></g>)}
        </TxSvg>
        <Chip T={T} at={K.Ta + 0.6} until={K.Ci - 0.2} texto="hasta 75,000 litros" x={540} y={1556} tam={30} borde={KC.leaf} />
      </Escena>
      <Lupa T={T} at={K.Ta + 1.2} until={K.Ci - 0.4} x={560} y={880} r={250} fx={540} fy={1010} tinte={KC.leaf} etiqueta="AL MICROSCOPIO · CÉLULAS DE TEJO" interior={(Tl, r) => <CelulasTejo T={Tl} r={r} />} />
      {/* 11 · cierre: el mismo tejo y la misma bolsa del inicio; ahora la bolsa se llena desde el tanque y el árbol sigue de pie */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <TxSvg>
          <Suelo y={GY} id="g" />
          <Tejo T={T} x={640} y={GY} s={1.32} seed={2} />
          <TanqueMini T={T} x={895} y={1160} s={1.0} />
          <BolsaSuero T={T} x={250} y={560} s={1.15} tubo="M 250 898 Q 260 1110 500 1030 Q 740 945 850 925" nivel={0.8} />
        </TxSvg>
      </Escena>

      {/* textos */}
      <Capitulo T={T} caps={[{ at: K.Ar, titulo: 'CORTEZA' }, { at: K.Ag, titulo: 'HOJAS' }, { at: K.Ta, titulo: 'TANQUE' }]} hasta={K.Ci} />
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.9} until={K.G + 3.6} texto="¿la inventó un químico?" x={540} y={1520} tam={42} />
      <Chip T={T} at={K.G + 3.6} until={K.Te - 0.2} texto="paclitaxel = Taxol" y={1520} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.Te + 1.0} until={K.Tx - 0.3} x={1040} y={300} texto="Taxus brevifolia" it lado="izq" color={KC.texto} tam={36} />
      <Etq T={T} at={K.Te + 1.3} until={K.Tx - 0.3} x={1040} y={355} texto="tejo del Pacífico" lado="izq" color={KC.texto} tam={30} />
      <Chip T={T} at={K.Te + 0.4} until={K.Tx - 0.2} texto="1962 · programa de plantas del NCI" y={1540} tam={36} borde={BARK_C} />
      <Chip T={T} at={K.Tx + 2.3} until={K.Ca - 0.2} texto="cáncer de mama" x={320} y={1400} tam={40} borde={KC.pink} />
      <Chip T={T} at={K.Tx + 2.6} until={K.Ca - 0.2} texto="de ovario" x={815} y={1400} tam={40} borde={KC.lilac} />
      <Lupa T={T} at={K.Ca + 0.0} until={K.Ca + 1.1} x={540} y={840} r={300} fx={540} fy={900} tinte={KC.pink} etiqueta="POR DENTRO · CÉLULA" interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" /><g transform={`translate(${r - 540 * 0.6} ${r - 900 * 0.6}) scale(0.6)`}><CelulaDivision T={Tl} /></g></svg>} />
      <Etq T={T} at={K.Ca + 1.2} until={K.Co - 0.2} x={110} y={545} texto="microtúbulos" color={MT} tam={36} />
      <Etq T={T} at={K.Ca + 2.2} until={K.Co - 0.2} x={610} y={1085} texto="cromosomas" color={KC.yellow} tam={36} />
      <Medidor T={T} at={K.Co + 0.3} until={K.Mu + 2.6} y={1320} valor={(t) => 1 - 0.9 * kprog(t, K.Co + 0.6, K.Co + 2.4, kEase.suave)} etiqueta="movimiento de los microtúbulos" color={HIELO} />
      <Etq T={T} at={K.Co + 0.6} until={K.Mu - 0.2} x={770} y={700} texto="Taxol" color={TAXOL} tam={38} />
      <Chip T={T} at={K.Mu + 0.6} until={K.Pr - 0.2} texto="cromosomas mal repartidos" y={1480} tam={40} borde={KC.red} />
      <NumeroGigante T={T} at={K.Pr + 0.2} until={K.Es - 0.1} valor={10} dur={0.8} sufijo=" mg" x={540} y={500} tam={230} color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Es + 0.4} until={K.Es + 2.5} anio="1979" quien="Horwitz · Bronx, Nueva York" revista="Nature · Albert Einstein College of Medicine" y={390} />
      <Chip T={T} at={K.Es + 2.6} until={K.Ar - 0.2} texto="en hielo: 4 °C" x={540} y={1390} tam={40} borde={HIELO} />
      <Chip T={T} at={K.Es + 4.0} until={K.Ar - 0.2} texto="con taxol no se deshacen" y={350} tam={44} borde={TAXOL} />
      <Chip T={T} at={K.Ar + 3.4} until={K.Ag - 0.2} texto="pelar la corteza mata al tejo" y={540} x={600} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ag + 2.0} until={K.Ta - 0.2} texto="semisíntesis · FDA 1994" x={285} y={1300} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Ta + 0.4} until={K.Ci - 0.2} texto="desde 2002 · Phyton Biotech" y={358} x={660} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="corteza → hojas → tanque" y={1520} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Te - 0.1} texto="No la diseñó un químico: *la tenía un árbol.*" />
      <Subtitulo T={T} idx={1} at={K.Te + 0.1} until={K.Tx - 0.1} texto="1962: *corteza de tejo.*" />
      <Subtitulo T={T} idx={2} at={K.Tx + 0.1} until={K.Ca - 0.1} texto="Taxol: *mama y ovario.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Co - 0.1} texto="Los *microtúbulos* jalan los cromosomas." />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.Mu - 0.1} texto="El Taxol *los congela.*" />
      <Subtitulo T={T} idx={5} at={K.Mu + 0.1} until={K.Pr - 0.1} texto="Reparte mal *y muere.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Con *casi nada?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ar - 0.1} texto="1979: *los congelaba.*" />
      <Subtitulo T={T} idx={8} at={K.Ar + 0.1} until={K.Ag - 0.1} texto="Tres árboles *por paciente.*" />
      <Subtitulo T={T} idx={9} at={K.Ag + 0.1} until={K.Ta - 0.1} texto="Hojas que *rebrotan.*" />
      <Subtitulo T={T} idx={10} at={K.Ta + 0.1} until={K.Ci - 0.1} texto="Tanques de *75 mil litros.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Hoy también *crece en un tanque.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tejo + 0.8, CUES.Taxol + 2.5, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Congela + 0.3, CUES.Muere + 2.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.0, CUES.Estudio - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Arboles + 0.8, CUES.Agujas - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Tanque + 0.6, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="45" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TaxolApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Taxol /></CompositionStage></div>;
}
window.TaxolApp = TaxolApp;
