// Shot Biotecnológico #24 · Esas células no son de un laboratorio: son de Henrietta Lacks (células HeLa) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala.
const MEDIO = '#ff8fb1', MEDIO_OSC = '#e9608a', CIT = '#ffb3c7', NUC = '#7b3fb8', VPH = KC.gold2, PIEL_H = '#6b4330';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// contorno orgánico (célula epitelial poligonal, de "empedrado")
function kBlob(r, seed, n = 9, irr = 0.18, T = 0, vel = 0.8) {
  const R = krng(seed), ks = Array.from({ length: n }, () => [R(), R() * 6]);
  const pts = ks.map(([a, p], i) => { const ang = (i / n) * Math.PI * 2, rr = r * (1 - irr + a * irr * 2 + 0.03 * Math.sin(T * vel + p)); return [Math.cos(ang) * rr, Math.sin(ang) * rr]; });
  let d = '';
  pts.forEach((p, i) => { const q = pts[(i + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; d += i === 0 ? `M ${(pts[n - 1][0] + p[0]) / 2} ${(pts[n - 1][1] + p[1]) / 2} ` : ''; d += `Q ${p[0]} ${p[1]} ${m[0]} ${m[1]} `; });
  return d + 'Z';
}
function CelulaHeLa({ T = 0, x = 0, y = 0, r = 60, seed = 1, gris = 0, o = 1, borde = 5, nucleolos = true }) {
  const c = mixHex(CIT, '#8a8f99', gris), n = mixHex(NUC, '#5d6170', gris);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={kBlob(r, seed, 9, 0.16, T)} fill={c} stroke={KC.ink} strokeWidth={borde} />
    <path d={kBlob(r * 0.42, seed + 7, 7, 0.12, T, 1.2)} fill={n} stroke={KC.ink} strokeWidth={borde * 0.7} transform={`translate(${r * 0.06} ${-r * 0.04})`} />
    {nucleolos && <circle cx={r * 0.14} cy={-r * 0.1} r={r * 0.09} fill={mixHex('#d9b8ff', '#9aa0ad', gris)} />}
  </g>;
}
// Frasco de cultivo (de lado, acostado), con medio rosa y células pegadas al fondo.
function FrascoCultivo({ T, x, y, s = 1, etiqueta = 'HeLa', etiqueta2, celulas = 1, gota = 0 }) {
  const R = krng(11), cel = Array.from({ length: 26 }, (_, i) => [-230 + (i % 13) * 36 + R() * 10, 92 + Math.floor(i / 13) * 22 + R() * 6, R()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -280 -110 L 200 -110 Q 230 -110 240 -80 L 330 -190 L 360 -165 L 270 -50 L 270 130 Q 270 150 250 150 L -280 150 Q -300 150 -300 130 L -300 -90 Q -300 -110 -280 -110 Z" fill="rgba(235,248,255,.55)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M -290 ${40 - gota * 6} Q 0 ${30 + Math.sin(T * 2) * 5} 262 ${40 - gota * 6} L 262 128 Q 262 140 248 140 L -278 140 Q -290 140 -290 128 Z`} fill={MEDIO} opacity={0.85} />
    <path d="M -290 40 Q 0 32 262 40" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={5} />
    {cel.map(([cx, cy, k], i) => k < celulas ? <path key={i} d={kBlob(15, 40 + i, 7, 0.2)} transform={`translate(${cx} ${cy})`} fill={CIT} stroke={MEDIO_OSC} strokeWidth={3} /> : null)}
    <rect x={318} y={-238} width={76} height={58} rx={10} transform="rotate(38 356 -209)" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-250 + i * 120} y1={-110} x2={-250 + i * 120} y2={-96} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-210} y={-82} width={300} height={98} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={6} />
    <text x={-60} y={-18} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    {etiqueta2 && <text x={-60} y={12} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">{etiqueta2}</text>}
    <path d="M -270 -96 L -150 -96" stroke="rgba(255,255,255,.9)" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
function Pipeta({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-16} y={-420} width={32} height={380} rx={10} fill="rgba(235,248,255,.8)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-11} y={-200} width={22} height={160} fill={MEDIO} />
    {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={-16} y1={-380 + i * 50} x2={0} y2={-380 + i * 50} stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -16 -40 L -4 20 L 4 20 L 16 -40 Z" fill="rgba(235,248,255,.8)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-26} y={-480} width={52} height={70} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Retrato esquemático y digno: silueta en un marco ovalado.
function Retrato({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={250} ry={310} fill={KC.gold} stroke={KC.ink} strokeWidth={12} />
    <ellipse rx={218} ry={278} fill="#fff4d6" stroke={KC.ink} strokeWidth={6} />
    <clipPath id="retr"><ellipse rx={216} ry={276} /></clipPath>
    <g clipPath="url(#retr)">
      <path d="M -230 300 Q -200 120 -60 100 L 60 100 Q 200 120 230 300 Z" fill="#c2453e" stroke={KC.ink} strokeWidth={8} />
      <path d="M -60 100 L 0 170 L 60 100" fill="none" stroke={KC.ink} strokeWidth={6} />
      <rect x={-34} y={50} width={68} height={60} fill={PIEL_H} />
      <ellipse cx={0} cy={-40} rx={92} ry={112} fill={PIEL_H} stroke={KC.ink} strokeWidth={8} />
      <path d="M -96 -40 Q -110 -170 0 -168 Q 110 -170 96 -40 Q 80 -120 0 -118 Q -80 -120 -96 -40 Z" fill="#241712" stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={0} cy={-190} rx={56} ry={34} fill="#241712" stroke={KC.ink} strokeWidth={6} />
    </g>
    <circle cx={150} cy={-230} r={14 + Math.sin(T * 3) * 2} fill={KC.white} opacity={0.6} />
  </g>;
}
function Hospital({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-60} width={660} height={300} fill="#e9dcc6" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={-200} width={240} height={150} fill="#e9dcc6" stroke={KC.ink} strokeWidth={10} />
    <path d="M -100 -200 Q 0 -330 100 -200 Z" fill="#7fb7a0" stroke={KC.ink} strokeWidth={10} />
    <line x1={0} y1={-290} x2={0} y2={-340} stroke={KC.ink} strokeWidth={8} />
    {[-270, -190, -110, 110, 190, 270].map((cx, i) => [0, 1].map((r) => <rect key={i + '-' + r} x={cx - 24} y={-20 + r * 110} width={48} height={70} fill="#7fc8ff" stroke={KC.ink} strokeWidth={5} />))}
    {[-70, 0, 70].map((cx) => <rect key={cx} x={cx - 12} y={-50} width={24} height={290} fill="#f6efe0" stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-50} y={150} width={100} height={90} fill="#8a5a3c" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function TuboMuestra({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 -160 L -40 120 Q -40 170 0 170 Q 40 170 40 120 L 40 -160" fill="rgba(235,248,255,.7)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -34 40 L -34 120 Q -34 162 0 162 Q 34 162 34 120 L 34 40 Z" fill="#f2d3a6" />
    <path d={kBlob(22, 5, 7, 0.25)} transform="translate(0 115)" fill="#d77a8e" stroke={KC.ink} strokeWidth={4} />
    <rect x={-52} y={-200} width={104} height={50} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function HojaPermiso({ x, y, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(4) scale(${s})`}>
    <rect x={-170} y={-220} width={340} height={440} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-160} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>PERMISO PARA</text>
    <text x={0} y={-124} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>INVESTIGAR</text>
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-130} y1={-70 + i * 46} x2={130} y2={-70 + i * 46} stroke="#b9ad98" strokeWidth={6} />)}
    <line x1={-130} y1={150} x2={130} y2={150} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
    <text x={0} y={186} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#7a7060">firma: (vacío)</text>
    {tache > 0 && <g opacity={tache} transform={`scale(${klerp(1.6, 1, tache)})`}>
      <line x1={-120} y1={-120} x2={120} y2={120} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
      <line x1={120} y1={-120} x2={-120} y2={120} stroke={KC.red} strokeWidth={22} strokeLinecap="round" /></g>}
  </g>;
}
// Cromosoma en X (dos cromátidas). vph = tramo dorado del VPH 18; telo = brillo de las puntas (telómeros).
function Cromosoma({ x, y, s = 1, rot = 0, vph = 0, telo = 0, gris = 0, T = 0, color = '#5ec8ff' }) {
  const c = mixHex(color, '#7d8290', gris);
  const brazo = (sx, sy, k) => <g key={k}>
    <path d={`M 0 0 Q ${sx * 30} ${sy * 90} ${sx * 70} ${sy * 230}`} stroke={KC.ink} strokeWidth={70} strokeLinecap="round" fill="none" />
    <path d={`M 0 0 Q ${sx * 30} ${sy * 90} ${sx * 70} ${sy * 230}`} stroke={c} strokeWidth={56} strokeLinecap="round" fill="none" />
    {[0.35, 0.6, 0.82].map((u, i) => <circle key={i} cx={sx * 70 * u * u + sx * 30 * 2 * u * (1 - u)} cy={sy * 230 * u * u + sy * 90 * 2 * u * (1 - u)} r={22} fill="rgba(0,0,0,.18)" />)}
    {telo > 0 && <circle cx={sx * 70} cy={sy * 230} r={(30 + 8 * Math.sin(T * 6 + k)) * telo} fill={KC.mint} opacity={0.9} stroke={KC.ink} strokeWidth={4} />}
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brazo(-1, -0.55, 0)}{brazo(1, -0.55, 1)}{brazo(-1, 1, 2)}{brazo(1, 1, 3)}
    {vph > 0 && <g opacity={vph}>
      <path d="M 32 110 Q 44 150 52 176" stroke={KC.ink} strokeWidth={66} strokeLinecap="butt" fill="none" />
      <path d="M 32 110 Q 44 150 52 176" stroke={mixHex(VPH, '#9aa0ad', gris)} strokeWidth={54} strokeLinecap="butt" fill="none" />
    </g>}
    <circle r={30} fill={mixHex('#2b6fb0', '#5d6170', gris)} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Proteina({ x, y, s = 1, color, letra, T = 0, seed = 3 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={kBlob(56, seed, 8, 0.22, T, 2)} fill={color} stroke={KC.ink} strokeWidth={6} />
    <text y={14} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>{letra}</text>
  </g>;
}
function Freno({ x, y, s = 1, rot = 0, texto }) {
  const pts = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${Math.cos(a) * 70},${Math.sin(a) * 70}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <polygon points={pts} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <polygon points={pts} fill="none" stroke={KC.white} strokeWidth={4} transform="scale(.84)" />
    <text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.white}>{texto}</text>
  </g>;
}
function Telomerasa({ x, y, s = 1, T = 0 }) {
  const a = 18 + Math.abs(Math.sin(T * 8)) * 26, r = (d) => (d * Math.PI) / 180;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(r(a)) * 44} ${-Math.sin(r(a)) * 44} A 44 44 0 1 0 ${Math.cos(r(a)) * 44} ${Math.sin(r(a)) * 44} Z`} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-6} cy={-22} r={6} fill="#fff" /><circle cx={-5} cy={-22} r={3} fill={KC.ink} />
  </g>;
}
function Interruptor({ x, y, s = 1, on = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-120} width={140} height={240} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-36} y={-80} width={72} height={160} rx={14} fill="#d8cfbf" stroke={KC.ink} strokeWidth={5} />
    <rect x={-32} y={klerp(42, -76, on)} width={64} height={34} rx={8} fill={on > 0.5 ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={5} />
    <text y={-140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{on > 0.5 ? 'VPH: ON' : 'VPH: OFF'}</text>
  </g>;
}
function TuboCultivo({ x, y, s = 1, lleno = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 -70 L -14 54 Q -14 70 0 70 Q 14 70 14 54 L 14 -70" fill="rgba(235,248,255,.75)" stroke={KC.ink} strokeWidth={4} />
    {lleno > 0 && <path d="M -11 10 L -11 54 Q -11 66 0 66 Q 11 66 11 54 L 11 10 Z" fill={MEDIO} opacity={lleno} />}
    <rect x={-18} y={-84} width={36} height={18} rx={4} fill={KC.white} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Medalla({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 2) * 4}) scale(${s})`}>
    <path d="M -90 -260 L -30 -40 L 30 -40 L 90 -260 L 40 -260 L 0 -120 L -40 -260 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle r={150} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={118} fill="none" stroke="#b67c12" strokeWidth={6} />
    <text y={-14} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={56} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.ink}>2008</text>
  </g>;
}
function Persona({ x, y, s = 1, color = KC.gold, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={-150} r={52} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d="M -90 60 Q -90 -80 0 -80 Q 90 -80 90 60 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Carpeta({ x, y, s = 1, candado = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -130 L -60 -130 L -30 -100 L 200 -100 L 200 150 L -200 150 Z" fill="#ffd27a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>GENOMA</text>
    <text x={0} y={14} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>DE HeLa</text>
    <g transform={`translate(120 100) scale(${candado})`}>
      <path d="M -34 -10 L -34 -44 Q -34 -78 0 -78 Q 34 -78 34 -44 L 34 -10" fill="none" stroke={KC.ink} strokeWidth={12} />
      <rect x={-52} y={-14} width={104} height={84} rx={12} fill={KC.teal} stroke={KC.ink} strokeWidth={8} />
      <circle cy={22} r={10} fill={KC.ink} />
    </g>
  </g>;
}
function Balanza({ x, y, s = 1, T = 0, eq = 1 }) {
  const a = klerp(-14, 0, eq) + Math.sin(T * 2) * 1.5;
  const plato = (dx) => <g transform={`translate(${dx} 0)`}>
    <line x1={0} y1={0} x2={-70} y2={160} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={70} y2={160} stroke={KC.ink} strokeWidth={5} />
    <path d="M -100 160 Q 0 220 100 160 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-260} width={40} height={460} fill="#8a5a3c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 200 L 150 200 L 110 250 L -110 250 Z" fill="#8a5a3c" stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(0 -250) rotate(${a})`}>
      <rect x={-300} y={-14} width={600} height={28} rx={14} fill={KC.gold2} stroke={KC.ink} strokeWidth={7} />
      <g transform="translate(-280 0)">{plato(0)}</g><g transform="translate(280 0)">{plato(0)}</g>
    </g>
    <circle cy={-250} r={26} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Interior de la Lupa: la célula HeLa por dentro, con el cromosoma 8 y el tramo del VPH 18.
function InteriorHeLa(T, r, a) {
  const vph = kprog(T, a + 1.2, a + 1.8, kEase.sale);
  return <svg width={r * 2} height={r * 2} viewBox="-320 -320 640 640">
    <rect x={-320} y={-320} width={640} height={640} fill="#0b1626" />
    <path d={kBlob(300, 9, 10, 0.08, T)} fill="#3a1f3d" stroke={CIT} strokeWidth={8} />
    <path d={kBlob(220, 4, 9, 0.08, T, 1.1)} fill="#2a1450" stroke={NUC} strokeWidth={8} />
    {[[-120, -90, 30, '#5ec8ff'], [130, -110, -20, '#ff8fb1'], [-130, 120, 70, '#7be38f']].map(([cx, cy, ro, co], i) => <Cromosoma key={i} x={cx} y={cy} s={0.28} rot={ro + Math.sin(T + i) * 4} color={co} />)}
    <Cromosoma x={40} y={20} s={0.62} rot={-8 + Math.sin(T * 0.8) * 3} vph={vph} T={T} color="#5ec8ff" />
    <text x={-60} y={-16} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>crom. 8</text>
  </svg>;
}

function Hela() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Henrietta, B: CUES.Biopsia, Ge: CUES.Gey, L: CUES.Limite, V: CUES.Virus, F: CUES.Frenos, A: CUES.Apagar, P: CUES.Polio, N: CUES.Nobel, Ac: CUES.Acuerdo, D: CUES.Demanda, C: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const pregunta = K.L + 3.0;
  const cultivo = (t0) => 0.4 + 0.6 * kprog(T, t0, t0 + 4);
  // duplicaciones del cultivo en la escena de Gey: 1 → 2 → 4 → 8 → 16 → 32
  const dupl = Math.min(5, Math.floor(kprog(T, K.Ge + 0.4, K.Ge + 3.4) * 5.999));
  const RG = krng(31), posG = Array.from({ length: 32 }, (_, i) => [180 + (i % 8) * 102 + RG() * 22, 720 + Math.floor(i / 8) * 110 + RG() * 20]);
  const apaga = kprog(T, K.A + 0.6, K.A + 1.0, kEase.sale);
  const tubos = Math.floor(kprog(T, K.P + 1.2, K.P + 5.2) * 48);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco de cultivo, una pipeta gotea medio desde el cuadro 0 */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <FrascoCultivo T={T} x={470} y={1000} s={1.15} celulas={cultivo(K.G)} gota={Math.abs(Math.sin(T * 5)) * kprog(T, 0, 3)} />
          <Pipeta x={300} y={975} s={0.8} o={1 - kprog(T, K.G + 3.4, K.G + 3.9)} />
          <Goteo T={T} x={300} y0={995} y1={1048} cada={0.45} color={MEDIO} desde={K.G} hasta={K.G + 3.4} r={11} />
        </SvgCapa>
      </Escena>
      {/* 1 · Henrietta */}
      <Escena T={T} a={K.H} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Retrato x={540} y={720} s={0.86} T={T} />
          {(() => { const he = kprog(T, K.H + 1.2, K.H + 1.6), eq = kprog(T, K.H + 2.0, K.H + 2.4);
            return <g transform="translate(540 1100)" style={{ font:`400 76px ${KF.titulo}` }}>
              <text x={-24} textAnchor="end" fill={KC.ink}><tspan fill={he ? '#b67c12' : KC.ink}>He</tspan>nrietta</text>
              <text x={0} textAnchor="start" fill={KC.ink}><tspan fill={he ? '#b67c12' : KC.ink}>La</tspan>cks</text>
            </g>; })()}
        </SvgCapa>
        <Chip T={T} at={K.H + 2.0} until={K.B - 0.2} texto="He + La = HeLa" x={540} y={420} tam={50} borde={KC.gold} />
      </Escena>
      {/* 2 · la biopsia en el hospital */}
      <Escena T={T} a={K.B} b={K.Ge} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Hospital x={540} y={720} s={0.92} />
          <TuboMuestra x={300} y={1080} s={0.9} rot={-8 + Math.sin(T * 2) * 3} />
          <HojaPermiso x={740} y={1060} s={0.78} tache={kprog(T, K.B + 2.4, K.B + 2.8, kEase.sale)} />
        </SvgCapa>
      </Escena>
      {/* 3 · Gey: el cultivo que no para */}
      <Escena T={T} a={K.Ge} b={K.L} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {posG.slice(0, Math.pow(2, dupl)).map(([x, y], i) => { const nueva = i >= Math.pow(2, dupl - 1), t0 = K.Ge + 0.4 + (dupl / 5.999) * 3.0, e = nueva ? kprog(T, t0, t0 + 0.35, kEase.sale) : 1;
            return <CelulaHeLa key={i} T={T} x={x} y={y} r={46 * e + 4} seed={i + 3} />; })}
        </SvgCapa>
        <div style={{ position:'absolute', left:330, top:600, transform:'translate(-50%,-50%)', zIndex:41, font:`700 64px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, whiteSpace:'nowrap' }}>{Math.pow(2, dupl)} {dupl ? 'células' : 'célula'}</div>
      </Escena>
      {/* 4 · el límite de ~50 divisiones y el re-gancho */}
      <Escena T={T} a={K.L} b={K.V} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {T < pregunta + 0.4 && <g opacity={1 - kprog(T, pregunta, pregunta + 0.4)}>
            <CelulaHeLa T={T} x={290} y={800} r={120} seed={5} gris={kprog(T, K.L + 1.6, K.L + 2.2)} />
            <CelulaHeLa T={T} x={790} y={800} r={120} seed={8} />
            <text x={290} y={600} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>célula humana</text>
            <text x={290} y={644} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>normal</text>
            <text x={790} y={644} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.pink}>HeLa</text>
            {T > K.L + 2.2 && <text x={290} y={985} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#9aa0ad">se detiene</text>}
            {T > K.L + 2.2 && <text x={790} y={985} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.pink}>no se detiene</text>}
          </g>}
          {T > pregunta && <text x={300} y={1080} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} opacity={kprog(T, pregunta, pregunta + 0.3)} transform={`rotate(${Math.sin(T * 3) * 6} 300 860)`}>?</text>}
        </SvgCapa>
        {T < pregunta + 0.4 && <Contador T={T} at={K.L + 0.2} desde={0} hasta={50} dur={1.4} x={290} y={1070} tam={56} sufijo=" divisiones" color={KC.texto} />}
      </Escena>
      {/* 5 · por dentro: el VPH 18 en el cromosoma 8 */}
      <Escena T={T} a={K.V} b={K.F} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><FrascoCultivo T={T} x={470} y={1000} s={1.15} celulas={1} /></SvgCapa>
        <Lupa T={T} at={K.V + 0.1} until={K.F - 0.1} x={540} y={760} r={310} fx={420} fy={1110} tinte={KC.pink} etiqueta="AL MICROSCOPIO · CÉLULA HeLa" interior={(t, r) => InteriorHeLa(t, r, K.V)} />
      </Escena>
      {/* 6–7 · los frenos, la telomerasa y el interruptor */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Cromosoma x={380} y={900} s={1.25} rot={-6 + Math.sin(T) * 2} vph={1} gris={apaga * 0.8} telo={kprog(T, K.F + 2.2, K.F + 2.6) * (1 - apaga)} T={T} />
          {(() => { const sale = kprog(T, K.F + 0.3, K.F + 1.0, kEase.sale), empuja = kprog(T, K.F + 1.0, K.F + 1.8, kEase.sale), vuelve = apaga;
            const px = (x0, x1) => klerp(x0, x1, sale);
            return <g>
              <g opacity={sale * (1 - vuelve)}><Proteina x={px(470, 690)} y={klerp(1040, 760, sale)} color={KC.orange} letra="E6" T={T} seed={3} />
                <Proteina x={px(470, 690)} y={klerp(1040, 960, sale)} color={KC.cyan} letra="E7" T={T} seed={6} /></g>
              <Freno x={klerp(830, 1200, empuja * (1 - vuelve))} y={760} rot={empuja * 120 * (1 - vuelve)} texto="p53" />
              <Freno x={klerp(830, 1200, empuja * (1 - vuelve))} y={960} rot={-empuja * 120 * (1 - vuelve)} texto="Rb" />
            </g>; })()}
          {T > K.F + 2.2 && T < K.A + 0.6 && <Telomerasa x={380 - 70 * 1.25 - 20} y={900 - 0.55 * 230 * 1.25 - 40} s={1} T={T} />}
          {T > K.A - 0.1 && <Interruptor x={640} y={1040} s={0.9} on={1 - apaga} />}
        </SvgCapa>
        <Etiqueta T={T} at={K.F + 0.2} until={K.A - 0.2} x={490} y={1110} texto="ADN del VPH 18" color={VPH} tam={32} />
        <Etiqueta T={T} at={K.F + 2.4} until={K.A + 0.4} x={250} y={560} texto="telomerasa" color={KC.lilac} tam={32} />
      </Escena>
      {/* 8 · Tuskegee y la vacuna contra la polio */}
      <Escena T={T} a={K.P} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <rect x={100} y={870} width={880} height={360} rx={20} fill="#8a5a3c" stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 48 }, (_, i) => <TuboCultivo key={i} x={150 + (i % 16) * 52} y={950 + Math.floor(i / 16) * 110} s={0.62} lleno={i < tubos ? 1 : 0} />)}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.P + 0.2} until={K.N - 0.2} anio="1955" quien="Instituto Tuskegee" revista="HeLa para evaluar la vacuna de Salk" x={540} y={640} />
        <Contador T={T} at={K.P + 1.2} desde={0} hasta={600000} dur={4.0} x={540} y={1500} tam={66} sufijo=" tubos" color={KC.texto} />
      </Escena>
      {/* 9 · zur Hausen: VPH 18 en HeLa (1984) y el Nobel (2008) */}
      <Escena T={T} a={K.N} b={K.Ac} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {T > K.N + 2.6 && <Medalla x={540} y={960} s={1.25 * kprog(T, K.N + 2.6, K.N + 3.1, kEase.rebote)} T={T} />}
          {T < K.N + 2.8 && <g opacity={1 - kprog(T, K.N + 2.4, K.N + 2.8)}><FrascoCultivo T={T} x={520} y={1080} s={0.9} celulas={1} etiqueta="HeLa" etiqueta2="VPH 18 ✓" /></g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.N + 0.2} until={K.N + 2.5} anio="1984" quien="equipo de Harald zur Hausen" revista="EMBO J · VPH 18 en células HeLa" x={540} y={620} />
        <Chip T={T} at={K.N + 3.0} until={K.Ac - 0.2} texto="el VPH causa cáncer cervicouterino" x={540} y={1500} tam={38} borde={KC.gold} />
      </Escena>
      {/* 10 · 2013: el comité con la familia */}
      <Escena T={T} a={K.Ac} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Carpeta x={540} y={760} s={1.1} candado={kprog(T, K.Ac + 0.8, K.Ac + 1.2, kEase.rebote)} T={T} />
          <Persona x={380} y={1130} s={1} color={kprog(T, K.Ac + 1.6, K.Ac + 1.9) > 0.5 ? KC.gold : '#9aa3b5'} />
          <Persona x={700} y={1130} s={1} color={kprog(T, K.Ac + 1.9, K.Ac + 2.2) > 0.5 ? KC.gold : '#9aa3b5'} />
        </SvgCapa>
        <Chip T={T} at={K.Ac + 0.3} until={K.D - 0.2} texto="NIH 2013 · acceso controlado" x={680} y={470} tam={34} borde={KC.teal} />
        <Chip T={T} at={K.Ac + 2.0} until={K.D - 0.2} texto="2 integrantes de la familia Lacks" x={540} y={1500} tam={38} borde={KC.gold} />
      </Escena>
      {/* 11 · 2023: el acuerdo con Thermo Fisher */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><Balanza x={540} y={1000} s={1} T={T} eq={kprog(T, K.D + 1.0, K.D + 2.4, kEase.suave)} /></SvgCapa>
        <Chip T={T} at={K.D + 0.3} until={K.D + 2.2} texto="demanda presentada en 2021" x={680} y={470} tam={36} borde={KC.red} />
        <Chip T={T} at={K.D + 2.3} until={K.C - 0.2} texto="2023 · acuerdo confidencial" x={680} y={470} tam={36} borde={KC.gold} />
      </Escena>
      {/* 12 · cierre: el mismo frasco, ahora con su nombre */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <FrascoCultivo T={T} x={470} y={1000} s={1.15} celulas={1} etiqueta="HeLa" etiqueta2={T > K.C + 1.2 ? '= Henrietta Lacks' : undefined} />
          <Retrato x={300} y={660} s={0.42 * kprog(T, K.C + 1.4, K.C + 1.9, kEase.rebote)} T={T} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.G + 4.9} texto="¿de un laboratorio?" x={330} y={470} tam={44} />
      <Etiqueta T={T} at={K.G + 1.0} until={K.H - 0.3} x={60} y={1500} texto="frasco de cultivo · células HeLa" tam={32} color={KC.ink} />
      <Chip T={T} at={K.H + 0.3} until={K.B - 0.2} texto="30 años · cáncer de cuello uterino" x={540} y={1500} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.B + 0.3} until={K.Ge - 0.2} texto="1951 · Baltimore" x={540} y={420} tam={46} borde={KC.gold} />
      <Chip T={T} at={K.B + 2.6} until={K.Ge - 0.2} texto="nadie le pidió permiso para investigar" x={540} y={1500} tam={34} borde={KC.red} />
      <Etiqueta T={T} at={K.Ge + 0.3} until={K.L - 0.2} x={60} y={470} texto="laboratorio de George Gey" tam={32} color={KC.texto} />
      <Chip T={T} at={K.Ge + 1.2} until={K.L - 0.2} texto="1ª línea humana que crece sin fin" x={540} y={1500} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.L + 0.3} until={pregunta - 0.1} texto="en cultivo" x={540} y={470} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.V + 1.4} until={K.F - 0.2} texto="VPH 18 = virus del papiloma humano tipo 18" x={540} y={1500} tam={30} borde={VPH} />
      <Chip T={T} at={K.F + 0.4} until={K.A - 0.1} texto="E6 y E7 sueltan los frenos p53 y Rb" x={540} y={1500} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.A + 0.8} until={K.P - 0.2} texto="sin E6 y E7 → dejan de dividirse" x={540} y={1500} tam={36} borde={KC.mint} />
      <Etiqueta T={T} at={K.V + 0.6} until={K.A + 2.6} x={1040} y={1640} texto="esquemático · no a escala" lado="izq" tam={26} color="rgba(246,243,236,.8)" />
      <Chip T={T} at={K.C + 1.4} until={K.O} texto="HeLa = Henrietta Lacks" x={540} y={1500} tam={46} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Son de una mujer: *nunca le pidieron permiso.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.B - 0.1} texto="*Henrietta Lacks,* 30 años." />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.Ge - 0.1} texto="1951: un pedazo *del tumor.*" />
      <Subtitulo T={T} idx={3} at={K.Ge + 0.1} until={K.L - 0.1} texto="Células humanas *que crecen sin fin.*" />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.V - 0.1} texto="Unas 50 divisiones. *¿Y estas?*" />
      <Subtitulo T={T} idx={5} at={K.V + 0.1} until={K.F - 0.1} texto="El *VPH 18* en el cromosoma 8." />
      <Subtitulo T={T} idx={6} at={K.F + 0.1} until={K.A - 0.1} texto="Sin frenos y *con telomerasa.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.P - 0.1} texto="Si los apagas, *se detienen.*" />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.N - 0.1} texto="600 mil tubos *para la vacuna.*" />
      <Subtitulo T={T} idx={9} at={K.N + 0.1} until={K.Ac - 0.1} texto="VPH 18 en HeLa: *Nobel 2008.*" />
      <Subtitulo T={T} idx={10} at={K.Ac + 0.1} until={K.D - 0.1} texto="La familia *en el comité.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="2023: *un acuerdo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.O - 0.1} texto="Son *de Henrietta.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Biopsia + 0.4, CUES.Gey - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Gey + 0.8, CUES.Limite - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Limite + 3.0, CUES.Virus + 0.3, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Frenos + 0.6, CUES.Apagar + 2.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Polio + 2.6, CUES.Nobel - 0.2, 'avatar_02_apuntando_camara', 'bajo-der'],
        [CUES.Nobel + 2.8, CUES.Acuerdo - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Acuerdo + 0.6, CUES.Demanda + 4.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="24" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HelaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hela /></CompositionStage></div>;
}
window.HelaApp = HelaApp;
