// Shot Biotecnológico #28 · Dolly: la oveja que salió de una célula de ubre — NARRADO (N1 por dentro + N5 el experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala.
const LANA = '#f8f4ea', LANA_S = '#e4dccb', CARA_B = '#f1e6d6', CARA_N = '#2b2523', ROSA = '#f59ab4', CITO = '#ffe2b8', NUCL = '#7b3fb8', ZONA = 'rgba(190,230,255,.35)';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
function kBlob(r, seed, n = 9, irr = 0.18, T = 0, vel = 0.8) {
  const R = krng(seed), ks = Array.from({ length: n }, () => [R(), R() * 6]);
  const pts = ks.map(([a, p], i) => { const ang = (i / n) * Math.PI * 2, rr = r * (1 - irr + a * irr * 2 + 0.03 * Math.sin(T * vel + p)); return [Math.cos(ang) * rr, Math.sin(ang) * rr]; });
  let d = '';
  pts.forEach((p, i) => { const q = pts[(i + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; d += i === 0 ? `M ${(pts[n - 1][0] + p[0]) / 2} ${(pts[n - 1][1] + p[1]) / 2} ` : ''; d += `Q ${p[0]} ${p[1]} ${m[0]} ${m[1]} `; });
  return d + 'Z';
}

/* ---------- OVEJAS ---------- */
// Oveja de perfil mirando a la izquierda. cara: 'blanca' (Finn Dorset) | 'negra' (Scottish Blackface, con cuernos en espiral).
// Pupila horizontal (como en las ovejas de verdad). ubre: dibuja la ubre rosa. sombrero: sombrero vaquero (Dolly Parton).
function Oveja({ T = 0, x, y, s = 1, cara = 'blanca', ubre = false, sombrero = false, gris = 0, o = 1, fase = 0, collar }) {
  const negra = cara === 'negra';
  const cc = mixHex(negra ? CARA_N : CARA_B, '#8d8f96', gris), lana = mixHex(LANA, '#b9bbc2', gris), lanaS = mixHex(LANA_S, '#9a9ca4', gris);
  const pata = negra ? CARA_N : CARA_B;
  const mast = Math.sin(T * 7 + fase) * 4, oreja = Math.sin(T * 2.3 + fase) * 8 + (Math.sin(T * 0.9 + fase) > 0.93 ? 14 : 0);
  const resp = 1 + 0.012 * Math.sin(T * 2 + fase);
  const R = krng(7), rizos = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return [Math.cos(a) * 205, Math.sin(a) * 112, 60 + R() * 18]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {/* patas */}
    {[-150, -95, 105, 160].map((px, i) => <g key={i} transform={`rotate(${Math.sin(T * 1.3 + i + fase) * 1.5} ${px} 90)`}>
      <rect x={px - 19} y={70} width={38} height={175} rx={16} fill={pata} stroke={KC.ink} strokeWidth={9} />
      <rect x={px - 21} y={225} width={42} height={30} rx={8} fill={KC.ink} />
    </g>)}
    {ubre && <g transform="translate(120 128)"><ellipse rx={48} ry={34} fill={ROSA} stroke={KC.ink} strokeWidth={8} />
      <rect x={-24} y={22} width={14} height={30} rx={7} fill={ROSA} stroke={KC.ink} strokeWidth={6} /><rect x={12} y={22} width={14} height={30} rx={7} fill={ROSA} stroke={KC.ink} strokeWidth={6} /></g>}
    {/* cuerpo de lana */}
    <g transform={`scale(${resp})`}>
      {rizos.map(([cx, cy, r], i) => <circle key={'o' + i} cx={cx} cy={cy} r={r + 9} fill={KC.ink} />)}
      {rizos.map(([cx, cy, r], i) => <circle key={'l' + i} cx={cx} cy={cy} r={r} fill={lana} />)}
      <ellipse rx={215} ry={120} fill={lana} />
      {rizos.slice(0, 10).map(([cx, cy, r], i) => <path key={'s' + i} d={`M ${cx * 0.6 - 20} ${cy * 0.6} q 20 -22 40 0`} fill="none" stroke={lanaS} strokeWidth={7} strokeLinecap="round" />)}
      <circle cx={228} cy={-30} r={34} fill={KC.ink} /><circle cx={228} cy={-30} r={26} fill={lana} />
    </g>
    {collar && <g transform="translate(-175 -40) rotate(-20)"><rect x={-14} y={-70} width={28} height={110} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <circle cx={-8} cy={55} r={30} fill={KC.gold} stroke={KC.ink} strokeWidth={6} /><text x={-8} y={64} textAnchor="middle" style={{ font:`400 26px ${KF.titulo}` }} fill={KC.ink}>{collar}</text></g>}
    {/* cabeza */}
    <g transform={`translate(-250 -105) rotate(${-8 + mast * 0.4})`}>
      <g transform={`rotate(${-35 + oreja} 28 -40)`}><ellipse cx={70} cy={-40} rx={56} ry={20} fill={cc} stroke={KC.ink} strokeWidth={8} /></g>
      {negra && <path d="M 30 -60 C 95 -110 140 -40 100 -5 C 70 20 40 -10 62 -32 C 78 -48 96 -30 84 -18" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />}
      {negra && <path d="M 30 -60 C 95 -110 140 -40 100 -5 C 70 20 40 -10 62 -32 C 78 -48 96 -30 84 -18" fill="none" stroke="#c9b08a" strokeWidth={18} strokeLinecap="round" />}
      <ellipse rx={64} ry={92} transform="rotate(28)" fill={cc} stroke={KC.ink} strokeWidth={9} />
      {!negra && [[-10, -78, 24], [18, -84, 22], [40, -70, 20]].map(([cx, cy, r], i) => <g key={i}><circle cx={cx} cy={cy} r={r + 7} fill={KC.ink} /><circle cx={cx} cy={cy} r={r} fill={lana} /></g>)}
      {!negra && <ellipse cx={14} cy={-60} rx={40} ry={16} fill={lana} />}
      <g transform="translate(-6 -28)"><ellipse rx={15} ry={12} fill={negra ? '#efe6d2' : '#fff'} stroke={KC.ink} strokeWidth={4} />
        <rect x={-9} y={-3.5} width={18} height={7} rx={3.5} fill={KC.ink} />
        {Math.sin(T * 0.7 + fase) > 0.97 && <rect x={-17} y={-14} width={34} height={28} fill={cc} />}</g>
      <ellipse cx={-52} cy={52} rx={9} ry={6} fill={negra ? '#121010' : '#c77d86'} />
      <path d={`M -44 ${70 + mast * 0.5} q 14 ${6 + mast} 26 0`} fill="none" stroke={negra ? '#121010' : KC.ink} strokeWidth={5} strokeLinecap="round" />
      {sombrero && <g transform="translate(18 -96) rotate(-10)">
        <ellipse rx={118} ry={26} fill="#c9853f" stroke={KC.ink} strokeWidth={8} />
        <path d="M -62 -8 Q -66 -86 -20 -78 Q 0 -60 20 -78 Q 66 -86 62 -8 Z" fill="#d9944a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -60 -22 Q 0 -6 60 -22" fill="none" stroke={KC.pink} strokeWidth={12} />
      </g>}
    </g>
  </g>;
}
function Pasto({ T, color = '#3fbf4a' }) {
  const R = krng(3), matas = Array.from({ length: 26 }, (_, i) => [R() * 1080, 1110 + R() * 760, 0.6 + R() * 0.7]);
  return <g>
    <path d="M -40 1090 Q 300 1010 600 1060 Q 860 1100 1120 1040 L 1120 1960 L -40 1960 Z" fill={color} stroke={KC.ink} strokeWidth={10} />
    {matas.map(([x, y, k], i) => <path key={i} d={`M ${x - 20 * k} ${y} q ${6 + mece(T, i) * 6} ${-40 * k} ${12} ${-52 * k} M ${x} ${y} q ${mece(T, i + 9) * 8} ${-46 * k} ${4} ${-64 * k} M ${x + 20 * k} ${y} q ${-4 + mece(T, i + 3) * 6} ${-36 * k} ${-12} ${-48 * k}`} fill="none" stroke="#1f8a3a" strokeWidth={7} strokeLinecap="round" />)}
  </g>;
}
function Espermatozoide({ T, x, y, s = 1, o = 1 }) {
  const cola = Array.from({ length: 14 }, (_, i) => `${32 + i * 13},${Math.sin(T * 14 - i * 0.7) * (3 + i * 1.3)}`).join(' L ');
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M ${cola}`} fill="none" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <path d={`M ${cola}`} fill="none" stroke="#e9f4ff" strokeWidth={6} strokeLinecap="round" />
    <ellipse rx={34} ry={22} fill="#e9f4ff" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Célula de glándula mamaria (epitelial) con su núcleo.
function CelulaUbre({ T = 0, x, y, r = 60, seed = 2, o = 1, brillo = 0, nucleo = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {brillo > 0 && <circle r={r * 1.5} fill={KC.gold2} opacity={0.35 * brillo} />}
    <path d={kBlob(r, seed, 9, 0.14, T)} fill={ROSA} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.08)} />
    {nucleo > 0 && <path d={kBlob(r * 0.45, seed + 5, 7, 0.12, T, 1.3)} fill={NUCL} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.05)} opacity={nucleo} />}
  </g>;
}
function EdificioRoslin({ x, y, s = 1, T = 0 }) {
  const ond = (k) => Math.sin(T * 4 + k) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-140} width={660} height={300} fill="#ece2cf" stroke={KC.ink} strokeWidth={10} />
    <path d="M -360 -140 L 0 -280 L 360 -140 Z" fill="#7a8fa6" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[-250, -150, 150, 250].map((cx) => [0, 1].map((r) => <rect key={cx + '-' + r} x={cx - 30} y={-100 + r * 120} width={60} height={80} fill="#9fdcff" stroke={KC.ink} strokeWidth={6} />))}
    <rect x={-60} y={40} width={120} height={120} fill="#8a5a3c" stroke={KC.ink} strokeWidth={7} />
    <rect x={-170} y={-120} width={340} height={70} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={6} />
    <text y={-75} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>INSTITUTO ROSLIN</text>
    {/* bandera de Escocia (aspa blanca sobre azul) */}
    <line x1={300} y1={-140} x2={300} y2={-430} stroke={KC.ink} strokeWidth={10} />
    <path d={`M 300 -430 Q 360 ${-440 + ond(0)} 420 -430 Q 480 ${-420 + ond(1)} 520 -430 L 520 -310 Q 480 ${-300 + ond(1)} 420 -310 Q 360 ${-320 + ond(0)} 300 -310 Z`} fill="#0065bd" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 304 -426 L 516 -314 M 516 -426 L 304 -314`} stroke={KC.white} strokeWidth={18} />
  </g>;
}
// Óvulo (ovocito) al microscopio: zona pelúcida, citoplasma granuloso y su núcleo. nucleo: (x, y, visible).
function Ovocito({ T, x, y, r = 250, nucleoXY = [120, -110], nucleo = 1, cuerpoPolar = true, brillo = 0, children }) {
  const R = krng(5), gran = Array.from({ length: 70 }, () => { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r * 0.82; return [Math.cos(a) * d, Math.sin(a) * d, 2 + R() * 4]; });
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 42} fill={ZONA} stroke="#bfe6ff" strokeWidth={6} />
    <circle r={r + 42} fill="none" stroke={KC.ink} strokeWidth={4} opacity={0.5} />
    {cuerpoPolar && <circle cx={-r * 0.62} cy={-r * 0.82} r={24} fill={CITO} stroke={KC.ink} strokeWidth={4} />}
    {brillo > 0 && <circle r={r * 1.25} fill={KC.gold2} opacity={0.3 * brillo} />}
    <circle r={r} fill={mixHex(CITO, '#fff6d8', brillo * 0.6)} stroke={KC.ink} strokeWidth={7} />
    {gran.map(([gx, gy, gr], i) => <circle key={i} cx={gx} cy={gy} r={gr} fill="#e7b97c" opacity={0.65} />)}
    {nucleo > 0 && <path d={kBlob(46, 21, 7, 0.14, T, 1.2)} transform={`translate(${nucleoXY[0]} ${nucleoXY[1]})`} fill={NUCL} stroke={KC.ink} strokeWidth={5} opacity={nucleo} />}
    {children}
  </g>;
}
function PipetaSosten({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -420 -46 L -40 -46 Q 0 -46 0 -20 L 0 20 Q 0 46 -40 46 L -420 46 Z" fill="rgba(220,240,255,.28)" stroke="#cfeaff" strokeWidth={6} />
    <path d="M -420 -16 L -6 -16 M -420 16 L -6 16" stroke="#cfeaff" strokeWidth={3} opacity={0.7} />
  </g>;
}
function Aguja({ x, y, s = 1, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -12 L 520 -34 L 520 34 L 0 12 Z" fill="rgba(220,240,255,.28)" stroke="#cfeaff" strokeWidth={5} strokeLinejoin="round" />
    {lleno > 0 && <path d={kBlob(30, 21, 7, 0.14)} transform={`translate(${30 + lleno * 160} 0) scale(.55 .35)`} fill={NUCL} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
function Electrodo({ x, y, alto = 420, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-16} y={-alto / 2} width={32} height={alto} rx={8} fill={on ? '#ffe9a8' : '#b9c3cf'} stroke={KC.ink} strokeWidth={6} />
    {on > 0 && <rect x={-30} y={-alto / 2 - 14} width={60} height={alto + 28} rx={16} fill={KC.gold2} opacity={0.35 * on} />}
  </g>;
}
function Rayo({ x1, y1, x2, y2, T, o = 1 }) {
  const n = 7, R = krng(Math.floor(T * 30));
  const pts = Array.from({ length: n + 1 }, (_, i) => { const u = i / n; return `${klerp(x1, x2, u) + (i % n ? (R() - 0.5) * 30 : 0)},${klerp(y1, y2, u) + (i % n ? (R() - 0.5) * 70 : 0)}`; }).join(' L ');
  return <g opacity={o}><path d={`M ${pts}`} fill="none" stroke={KC.white} strokeWidth={16} strokeLinejoin="round" opacity={0.5} />
    <path d={`M ${pts}`} fill="none" stroke={KC.yellow} strokeWidth={7} strokeLinejoin="round" /></g>;
}
// Posiciones de las células del embrión temprano (2, 4, 8).
function blastomeros(n, R) {
  if (n <= 1) return [[0, 0, R]];
  if (n === 2) return [[-R * 0.45, 0, R * 0.52], [R * 0.45, 0, R * 0.52]];
  if (n === 4) return [[-R * 0.42, -R * 0.4, R * 0.42], [R * 0.42, -R * 0.4, R * 0.42], [-R * 0.42, R * 0.4, R * 0.42], [R * 0.42, R * 0.4, R * 0.42]];
  return Array.from({ length: 8 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return i === 7 ? [0, 0, R * 0.3] : [Math.cos(a) * R * 0.6, Math.sin(a) * R * 0.6, R * 0.32]; });
}
function Embrion({ T, x, y, R = 250, n = 2, aparece = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={R + 42} fill={ZONA} stroke="#bfe6ff" strokeWidth={6} />
    {blastomeros(n, R).map(([bx, by, br], i) => <g key={n + '-' + i} transform={`translate(${bx * aparece} ${by * aparece})`}>
      <circle r={br * (0.85 + 0.15 * aparece) + Math.sin(T * 3 + i) * 2} fill={CITO} stroke={KC.ink} strokeWidth={6} />
      <path d={kBlob(br * 0.32, 30 + i, 7, 0.12, T)} fill={NUCL} stroke={KC.ink} strokeWidth={3} />
    </g>)}
  </g>;
}
// Interior de la Lupa en la ubre: alveolos de la glándula mamaria (células alrededor de un hueco con gotitas de leche).
function InteriorUbre(T, r) {
  const alv = [[-130, -90, 120], [130, -60, 105], [-20, 140, 110]];
  return <svg width={r * 2} height={r * 2} viewBox="-320 -320 640 640">
    <rect x={-320} y={-320} width={640} height={640} fill="#2a1022" />
    {alv.map(([ax, ay, ar], k) => <g key={k} transform={`translate(${ax} ${ay})`}>
      <circle r={ar * 0.55} fill="#fff4dc" stroke="#e6c79a" strokeWidth={4} />
      {[0, 1, 2].map((g) => <circle key={g} cx={Math.cos(T * 0.8 + g * 2 + k) * ar * 0.25} cy={Math.sin(T * 0.8 + g * 2 + k) * ar * 0.25} r={9} fill="#fff" stroke="#e6c79a" strokeWidth={3} />)}
      {Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * Math.PI * 2; return <CelulaUbre key={i} T={T} x={Math.cos(a) * ar * 0.78} y={Math.sin(a) * ar * 0.78} r={ar * 0.24} seed={i + k * 11} />; })}
    </g>)}
  </svg>;
}
// Interior de la Lupa en el núcleo: el "manual" de la oveja, con todos sus capítulos. abre: 0..1 (cuántos se desbloquean).
function InteriorManual(T, r, abre) {
  const caps = ['UBRE', 'PIEL', 'HUESO', 'CORAZÓN', 'LANA', 'OJO'];
  return <svg width={r * 2} height={r * 2} viewBox="-320 -320 640 640">
    <rect x={-320} y={-320} width={640} height={640} fill="#1c0f33" />
    <path d={kBlob(290, 8, 10, 0.06, T)} fill="#2a1450" stroke={NUCL} strokeWidth={8} />
    <ADNHebra T={T} x={-260} y={-210} largo={520} alto={46} vueltas={4} grosor={6} />
    {caps.map((c, i) => {
      const cx = -150 + (i % 2) * 300, cy = -90 + Math.floor(i / 2) * 120;
      const on = i === 0 ? 1 : kprog(abre, (i - 1) / 5, (i - 1) / 5 + 0.18);
      return <g key={c} transform={`translate(${cx} ${cy}) scale(${1 + 0.12 * Math.sin(Math.PI * on)})`}>
        <rect x={-130} y={-46} width={260} height={92} rx={16} fill={on > 0.5 ? KC.gold2 : '#4a3d66'} stroke={KC.ink} strokeWidth={6} />
        <text x={on > 0.5 ? 0 : 18} y={14} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill={on > 0.5 ? KC.ink : '#a99cc4'}>{c}</text>
        {on <= 0.5 && <g transform="translate(-92 0)"><path d="M -14 -6 L -14 -20 Q -14 -34 0 -34 Q 14 -34 14 -20 L 14 -6" fill="none" stroke="#a99cc4" strokeWidth={6} />
          <rect x={-20} y={-8} width={40} height={32} rx={6} fill="#a99cc4" /></g>}
      </g>;
    })}
  </svg>;
}

function Dolly() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Dolly, U: CUES.Ubre, Ov: CUES.Ovulo, Ch: CUES.Chispa, P: CUES.Pregunta, Ol: CUES.Olvido, E: CUES.Estudio, R: CUES.Rasgos, Pa: CUES.Parton, Cl: CUES.Clones, C: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const chDur = K.P - K.Ch, ch2 = K.Ch + chDur * 0.47;                       // las dos frases de la escena Chispa
  // el núcleo del óvulo sale por la aguja
  const aguja = kprog(T, K.Ov + 0.8, K.Ov + 1.6, kEase.sale) * (1 - kprog(T, K.Ov + 2.4, K.Ov + 3.2, kEase.suave));
  const succion = kprog(T, K.Ov + 1.6, K.Ov + 2.4, kEase.suave);
  // la chispa
  const pulso = K.Ch + 2.0, flash = kprog(T, pulso, pulso + 0.08) * (1 - kprog(T, pulso + 0.15, pulso + 0.6));
  const funde = kprog(T, pulso + 0.3, pulso + 1.4, kEase.suave);
  const div2 = ch2 + 1.0, div4 = ch2 + 2.2, div8 = ch2 + 3.2;
  const nEmb = T > div8 ? 8 : T > div4 ? 4 : T > div2 ? 2 : 1;
  const tDiv = nEmb === 8 ? div8 : nEmb === 4 ? div4 : div2;
  // el estudio: 277 → 29 → 1
  const RG = krng(277), idx = Array.from({ length: 277 }, (_, i) => i).sort(() => RG() - 0.5), vivos29 = new Set(idx.slice(0, 29)), uno = idx[0];
  const e29 = kprog(T, K.E + 2.5, K.E + 2.9), e1 = kprog(T, K.E + 3.4, K.E + 3.8);
  const etapa = T < K.E + 2.6 ? 0 : T < K.E + 3.5 ? 1 : 2;
  const pregunta = K.P + 0.2;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la oveja en el pasto; un espermatozoide que no fue */}
      <Escena T={T} a={K.G} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Pasto T={T} />
          <Oveja T={T} x={620} y={880} s={1.2} />
          {T < K.G + 2.4 && <Espermatozoide T={T} x={klerp(-120, 330, kprog(T, 0, 1.6, kEase.sale))} y={640} s={1.1} o={1 - kprog(T, K.G + 1.9, K.G + 2.4)} />}
          {T > K.G + 1.6 && T < K.G + 2.6 && <g transform="translate(360 640)" opacity={1 - kprog(T, K.G + 2.1, K.G + 2.6)}><path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g>}
          {T > K.G + 2.4 && <CelulaUbre T={T} x={160} y={620} r={64 * kprog(T, K.G + 2.4, K.G + 2.8, kEase.rebote)} brillo={0.6 + 0.4 * Math.sin(T * 5)} />}
          {T > K.G + 2.8 && <FlechaCurva x1={215} y1={670} x2={290} y2={735} p={kprog(T, K.G + 2.8, K.G + 3.4)} curva={60} color={KC.ink} T={T} />}
        </SvgCapa>
      </Escena>
      {/* 1 · Dolly en el Instituto Roslin, Escocia */}
      <Escena T={T} a={K.D} b={K.U} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Pasto T={T} color="#4cc95a" />
          <EdificioRoslin x={420} y={840} s={0.92} T={T} />
          <Oveja T={T} x={klerp(1300, 700, kprog(T, K.D, K.D + 1.2, kEase.sale))} y={1010} s={0.62} collar="DOLLY" fase={2} />
        </SvgCapa>
      </Escena>
      {/* 2 · la donadora Finn Dorset, su ubre por dentro y el cultivo casi sin suero */}
      <Escena T={T} a={K.U} b={K.Ov} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Pasto T={T} />
          <g opacity={1 - kprog(T, K.U + 2.6, K.U + 3.0)}><Oveja T={T} x={540} y={880} s={1.05} ubre fase={1} /></g>
          {T > K.U + 2.7 && <g opacity={kprog(T, K.U + 2.7, K.U + 3.1)}>
            <PlacaPetri x={540} y={800} r={330} agar="#ffd6e2" id="cult">
              {Array.from({ length: 22 }, (_, i) => { const R = krng(40 + i), a = R() * Math.PI * 2, d = Math.sqrt(R()) * 250;
                const quieta = kprog(T, K.U + 4.3, K.U + 5.0), late = (1 - quieta) * Math.sin(T * 6 + i) * 0.12;
                return <CelulaUbre key={i} T={T * (1 - quieta)} x={Math.cos(a) * d + Math.sin(T * 2 + i) * 8 * (1 - quieta)} y={Math.sin(a) * d} r={30 * (1 + late)} seed={i + 3} />; })}
            </PlacaPetri>
            {T > K.U + 4.6 && <g transform="translate(540 800)" opacity={kprog(T, K.U + 4.6, K.U + 5.0)}>
              <circle r={70} fill="rgba(14,15,18,.8)" stroke={KC.white} strokeWidth={6} /><rect x={-26} y={-32} width={18} height={64} rx={4} fill={KC.white} /><rect x={8} y={-32} width={18} height={64} rx={4} fill={KC.white} /></g>}
          </g>}
        </SvgCapa>
        <Lupa T={T} at={K.U + 0.3} until={K.U + 2.6} x={540} y={600} r={250} fx={666} fy={1014} tinte={KC.pink} etiqueta="POR DENTRO · UBRE" interior={(t, r) => InteriorUbre(t, r)} />
        <Medidor T={T} at={K.U + 3.0} until={K.Ov - 0.2} x={140} y={420} ancho={800} color={KC.yellow} etiqueta="suero en el medio"
          valor={(t) => klerp(1, 0.05, kprog(t, K.U + 3.4, K.U + 4.4, kEase.suave))} texto={(v) => (v > 0.06 ? kformato(v * 10, 1) : '0.5') + ' %'} />
      </Escena>
      {/* 3 · el óvulo de la Scottish Blackface pierde su núcleo */}
      <Escena T={T} a={K.Ov} b={K.Ch} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Ovocito T={T} x={540} y={860} nucleo={1 - succion} />
          <PipetaSosten x={248} y={860} />
          <Aguja x={klerp(1100, 700, aguja) - 40} y={klerp(860, 750, 1)} lleno={succion} />
          <Oveja T={T} x={900} y={500} s={0.32} cara="negra" fase={3} />
        </SvgCapa>
      </Escena>
      {/* 4–5 · la célula de ubre, la chispa, la fusión y las primeras divisiones */}
      <Escena T={T} a={K.Ch} b={K.P} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {T < tDiv - 0.0 || nEmb === 1 ? <Ovocito T={T} x={540} y={860} nucleo={0} brillo={funde * (0.6 + 0.4 * Math.sin(T * 4))}
              nucleoXY={[0, 0]} cuerpoPolar>
              {funde > 0 && <path d={kBlob(46 * funde, 33, 7, 0.14, T, 1.2)} transform={`translate(${klerp(170, 0, funde)} ${klerp(170, 0, funde)})`} fill={NUCL} stroke={KC.ink} strokeWidth={5} />}
            </Ovocito> : null}
          {nEmb === 1 && funde < 1 && <CelulaUbre T={T} x={klerp(klerp(1150, 768, kprog(T, K.Ch + 0.2, K.Ch + 1.2, kEase.sale)), 710, funde)} y={klerp(1060, 1030, funde)} r={58 * (1 - funde * 0.9)} seed={4} nucleo={1 - funde} />}
          {nEmb > 1 && <Embrion T={T} x={540} y={860} R={250} n={nEmb} aparece={kprog(T, tDiv, tDiv + 0.5, kEase.sale)} />}
          <Electrodo x={170} y={860} on={flash} />
          <Electrodo x={910} y={860} on={flash} />
          {flash > 0.05 && <Rayo x1={186} y1={860} x2={894} y2={860} T={T} o={flash} />}
          {flash > 0.05 && <rect x={0} y={0} width={KW} height={KH} fill={KC.white} opacity={0.35 * flash} />}
        </SvgCapa>
      </Escena>
      {/* 6 · re-gancho: ¿cómo vuelve a empezar de cero? */}
      <Escena T={T} a={K.P} b={K.Ol} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Embrion T={T} x={380} y={860} R={190} n={8} />
          <CelulaUbre T={T} x={380} y={500} r={60} seed={4} o={0.9} />
          <FlechaCurva x1={380} y1={570} x2={380} y2={630} p={1} curva={0} color={KC.texto} T={T} />
          {T > pregunta && <text x={250} y={1160} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} opacity={kprog(T, pregunta, pregunta + 0.3)} transform={`rotate(${Math.sin(T * 3) * 6} 250 1060)`}>?</text>}
        </SvgCapa>
      </Escena>
      {/* 7 · el núcleo vuelve a leer todo el manual */}
      <Escena T={T} a={K.Ol} b={K.E} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgCapa><Embrion T={T} x={860} y={1110} R={90} n={8} /></SvgCapa>
        <Lupa T={T} at={K.Ol + 0.1} until={K.E - 0.1} x={500} y={680} r={320} fx={860} fy={1110} tinte={KC.lilac} etiqueta="AL MICROSCOPIO · NÚCLEO"
          interior={(t, r) => InteriorManual(t, r, kprog(t, K.Ol + 1.2, K.Ol + 3.6))} />
      </Escena>
      {/* 8 · el estudio: 277 fusionadas → 29 embriones → 1 corderita */}
      <Escena T={T} a={K.E} b={K.R} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.E + 1.8 && <g opacity={kprog(T, K.E + 1.8, K.E + 2.1)}>
            {idx.map((_, i) => { const c = i % 19, f = Math.floor(i / 19), x = 162 + c * 42, y = 560 + f * 42;
              const es29 = vivos29.has(i), esUno = i === uno;
              const o = esUno ? 1 : es29 ? 1 - 0.85 * e1 : 1 - 0.85 * e29;
              const col = esUno && e1 > 0.5 ? KC.mint : es29 && e29 > 0.5 ? KC.gold2 : KC.pink;
              const rr = esUno ? 15 + 10 * e1 + 3 * Math.sin(T * 8) * e1 : 15;
              return <circle key={i} cx={x} cy={y} r={rr} fill={col} stroke={KC.ink} strokeWidth={4} opacity={o} />; })}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.E + 0.1} until={K.E + 1.8} anio="1997" quien="Wilmut y su equipo · Roslin" revista="Nature · célula adulta de ubre" x={540} y={820} />
        {T > K.E + 1.9 && <div style={{ position:'absolute', left:0, right:0, top:440, zIndex:42, textAlign:'center', font:`400 84px ${KF.titulo}`, color:[KC.pink, KC.gold2, KC.mint][etapa], WebkitTextStroke:`3px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>
          {['277 FUSIONADAS', '29 EMBRIONES', '1 CORDERITA'][etapa]}</div>}
        <Chip T={T} at={K.E + 3.0} until={K.R - 0.2} texto="13 madres sustitutas · 1 embarazo" x={540} y={1500} tam={34} borde={KC.mint} />
      </Escena>
      {/* 9 · el ADN del núcleo es de la donadora, no de la madre que la parió */}
      <Escena T={T} a={K.R} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Pasto T={T} />
          <Oveja T={T} x={250} y={900} s={0.6} cara="negra" fase={4} />
          <Oveja T={T} x={560} y={985} s={0.4} fase={5} collar="DOLLY" />
          <Oveja T={T} x={880} y={900} s={0.6} ubre fase={6} />
          <text x={250} y={700} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>la madre que la parió</text>
          <text x={880} y={700} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>la oveja de la ubre</text>
          {T > K.R + 0.6 && <g opacity={kprog(T, K.R + 0.6, K.R + 1.0)}><ADNHebra T={T} x={500} y={830} largo={Math.max(1, 210 * kprog(T, K.R + 0.6, K.R + 1.4))} alto={40} vueltas={2} grosor={6} />
            <rect x={480} y={738} width={260} height={50} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} /><text x={610} y={773} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>ADN del núcleo</text></g>}
          {T > K.R + 1.6 && <g transform={`translate(420 1000) scale(${kprog(T, K.R + 1.6, K.R + 2.0, kEase.rebote)})`}><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke={KC.red} strokeWidth={18} strokeLinecap="round" /></g>}
        </SvgCapa>
        <Chip T={T} at={K.R + 2.4} until={K.Pa - 0.2} texto="sus mitocondrias: del óvulo" x={540} y={1500} tam={36} borde={KC.cyan} />
      </Escena>
      {/* 10 · el nombre: por Dolly Parton */}
      <Escena T={T} a={K.Pa} b={K.Cl} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Pasto T={T} />
          <Oveja T={T} x={600} y={880} s={1.0} sombrero={T > K.Pa + 0.5} fase={7} />
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.Pa + 0.6 + i * 0.5, u = ((T - t0) % 3 + 3) % 3 / 3; if (T < t0) return null;
            return <text key={i} x={380 + i * 90 + Math.sin(T * 3 + i) * 20} y={730 - u * 300} style={{ font:`400 ${70 + (i % 2) * 20}px ${KF.titulo}` }} fill={[KC.pink, KC.violet, KC.yellow][i % 3]} stroke={KC.ink} strokeWidth={3} opacity={1 - u}>{i % 2 ? '♫' : '♪'}</text>; })}
        </SvgCapa>
        <Chip T={T} at={K.Pa + 0.6} until={K.Cl - 0.2} texto="por Dolly Parton, la cantante" x={540} y={1500} tam={40} borde={KC.pink} />
      </Escena>
      {/* 11 · 2003 y los clones de 2016 */}
      <Escena T={T} a={K.Cl} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Pasto T={T} />
          {T < K.Cl + 2.0 && <g opacity={1 - kprog(T, K.Cl + 1.6, K.Cl + 2.0)}><Oveja T={T} x={600} y={880} s={0.9} gris={0.6 * kprog(T, K.Cl + 0.3, K.Cl + 1.0)} fase={8} /></g>}
          {T > K.Cl + 1.8 && ['Debbie', 'Denise', 'Dianna', 'Daisy'].map((n, i) => { const e = kprog(T, K.Cl + 1.8 + i * 0.2, K.Cl + 2.3 + i * 0.2, kEase.rebote);
            return <g key={n}><Oveja T={T} x={170 + i * 240} y={930} s={0.36 * e} fase={i * 1.7} />
              <text x={150 + i * 240} y={1075} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={e}>{n}</text></g>; })}
        </SvgCapa>
        <Chip T={T} at={K.Cl + 0.2} until={K.Cl + 1.8} texto="Dolly murió en 2003" x={540} y={1500} tam={40} borde={KC.red} />
        <TarjetaEstudio T={T} at={K.Cl + 1.9} until={K.C - 0.1} anio="2016" quien="Universidad de Nottingham" revista="Sinclair et al. · Nature Communications" x={420} y={600} />
        <Chip T={T} at={K.Cl + 2.4} until={K.C - 0.1} texto="4 clones de Dolly · 8 años · presión ✓ azúcar ✓" x={540} y={1500} tam={32} borde={KC.mint} />
      </Escena>
      {/* 12 · cierre: la misma oveja, ahora sabemos de dónde salió */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Pasto T={T} />
          <Oveja T={T} x={620} y={880} s={1.2} />
          <CelulaUbre T={T} x={160} y={620} r={64} brillo={0.6 + 0.4 * Math.sin(T * 5)} />
          <FlechaCurva x1={215} y1={670} x2={290} y2={735} p={1} curva={60} color={KC.ink} T={T} />
        </SvgCapa>
        <Chip T={T} at={K.C + 0.8} until={K.O} texto="salió de 1 célula de ubre" x={330} y={480} tam={38} borde={KC.gold} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 2.6} texto="¿un espermatozoide?" x={330} y={470} tam={42} />
      <Etiqueta T={T} at={K.G + 2.95} until={K.D - 0.3} x={60} y={520} texto="célula de ubre" tam={32} color={KC.ink} />
      <Chip T={T} at={K.D + 0.6} until={K.U - 0.2} texto="Dolly · Instituto Roslin, Escocia" x={540} y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.U + 0.2} until={K.U + 2.6} texto="oveja Finn Dorset · cara blanca" x={540} y={1500} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.U + 4.8} until={K.Ov - 0.2} texto="células quietas: ya no se dividen" x={540} y={1500} tam={34} borde={KC.yellow} />
      <Etiqueta T={T} at={K.Ov + 0.3} until={K.Ch - 0.2} x={880} y={330} texto="Scottish Blackface" lado="izq" tam={28} color={KC.texto} />
      <Etiqueta T={T} at={K.Ov + 0.4} until={K.Ov + 2.2} x={840} y={1090} texto="núcleo" tam={30} color={KC.lilac} lado="izq" />
      <Chip T={T} at={K.Ov + 2.4} until={K.Ch - 0.2} texto="óvulo sin núcleo" x={540} y={1500} tam={40} borde={KC.cyan} />
      <Etiqueta T={T} at={K.Ch + 0.8} until={pulso} x={790} y={1150} texto="célula de ubre" lado="izq" tam={30} color={ROSA} />
      <Chip T={T} at={pulso} until={ch2 - 0.2} texto="pulso eléctrico" x={540} y={1500} tam={40} borde={KC.yellow} />
      <Chip T={T} at={ch2 + 0.2} until={K.P - 0.2} texto="embrión: 2 → 4 → 8 células" x={540} y={1500} tam={38} borde={KC.mint} />
      <Etiqueta T={T} at={K.P + 0.3} until={K.E - 0.2} x={1040} y={1640} texto="esquemático · no a escala" lado="izq" tam={26} color="rgba(246,243,236,.8)" />
      <Chip T={T} at={K.Ol + 1.4} until={K.E - 0.2} texto="el mismo ADN: todo el manual" x={540} y={1500} tam={36} borde={KC.lilac} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="Sin espermatozoide: *de una célula de ubre.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.U - 0.1} texto="*Dolly,* Instituto Roslin, Escocia." />
      <Subtitulo T={T} idx={2} at={K.U + 0.1} until={K.Ov - 0.1} texto="Células de ubre *casi sin suero.*" />
      <Subtitulo T={T} idx={3} at={K.Ov + 0.1} until={K.Ch - 0.1} texto="Un óvulo *sin núcleo.*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={ch2 - 0.1} texto="Juntas… y *una chispa.*" />
      <Subtitulo T={T} idx={5} at={ch2 + 0.1} until={K.P - 0.1} texto="Se funden y *el óvulo despierta.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ol - 0.1} texto="¿Cómo vuelve *a empezar de cero?*" />
      <Subtitulo T={T} idx={7} at={K.Ol + 0.1} until={K.E - 0.1} texto="Olvidó que era *de ubre.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.R - 0.1} texto="277 fusionadas, *1 corderita.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Pa - 0.1} texto="El ADN del núcleo: *de la ubre.*" />
      <Subtitulo T={T} idx={10} at={K.Pa + 0.1} until={K.Cl - 0.1} texto="Por *Dolly Parton.*" />
      <Subtitulo T={T} idx={11} at={K.Cl + 0.1} until={K.C - 0.1} texto="Sus clones, *sanos para su edad.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.O - 0.1} texto="Una célula adulta *puede olvidar lo que es.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Dolly + 0.6, CUES.Ubre - 0.1, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Ovulo + 0.3, CUES.Ovulo + 3.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Chispa + 0.5, CUES.Chispa + 4.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Olvido + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Rasgos + 0.5, CUES.Parton - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Parton + 0.4, CUES.Clones - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Clones + 0.2, CUES.Clones + 1.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 1.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="28" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DollyApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Dolly /></CompositionStage></div>;
}
window.DollyApp = DollyApp;
