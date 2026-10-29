// Shot Biotecnológico #42 · La carne que creció en un tanque (carne cultivada) — NARRADO (N1 por dentro + N3 capítulos).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const CARNE = '#d9434f', CARNE2 = '#b8303e', GRASA = '#f5e2c8', SAT = '#2fe0a8', FAPC = '#b18cff', LIPIDO = '#ffd43b', AMBAR = '#e0a040';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

/* ---------- MACRO: cocina, filete, tanque, vaca ---------- */
function Tabla({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={70} rx={430} ry={60} fill="rgba(0,0,0,.18)" />
    <rect x={-420} y={-150} width={840} height={230} rx={60} fill="#c98a4b" stroke={KC.ink} strokeWidth={10} />
    <rect x={-420} y={30} width={840} height={50} rx={25} fill="#a86b33" stroke={KC.ink} strokeWidth={8} />
    {[-300, -120, 80, 260].map((v, i) => <path key={i} d={`M ${v} -120 q 40 60 0 130`} stroke="#b07a3f" strokeWidth={5} fill="none" />)}
    <circle cx={360} cy={-80} r={22} fill="#8a5426" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Filete({ x, y, s = 1, rot = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={0} rx={330} ry={210} fill={KC.yellow} opacity={0.35 * brillo} />}
    <path d="M -260 -40 Q -250 -170 -60 -175 Q 150 -185 250 -100 Q 320 -20 260 90 Q 170 175 -40 165 Q -230 160 -268 60 Z" fill={GRASA} stroke={KC.ink} strokeWidth={10} />
    <path d="M -225 -35 Q -215 -140 -60 -145 Q 130 -152 218 -85 Q 275 -18 228 72 Q 150 140 -40 132 Q -200 128 -232 50 Z" fill={CARNE} />
    <path d="M -180 -60 Q -80 -20 -110 60 M -20 -120 Q 40 -40 0 30 Q -30 80 40 110 M 120 -100 Q 90 -10 170 30 M 60 50 Q 120 70 150 110" stroke={GRASA} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.85} />
    <path d="M -150 -110 Q -60 -135 40 -125" stroke="rgba(255,255,255,.55)" strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
function TanqueMini({ T, x, y, s = 1, brillo = 0, celulas = 1 }) {
  const R = krng(11);
  const cel = Array.from({ length: 16 }, () => [-90 + R() * 180, -100 + R() * 250, R() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={0} rx={240} ry={330} fill={KC.white} opacity={0.3 * brillo} />}
    <line x1={-80} y1={210} x2={-110} y2={300} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <line x1={80} y1={210} x2={110} y2={300} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <rect x={-130} y={-220} width={260} height={440} rx={50} fill="#cfd8e0" stroke={KC.ink} strokeWidth={10} />
    <rect x={-112} y={-150} width={224} height={352} rx={36} fill="#f2c4b4" />
    {cel.map(([cx, cy, p], i) => i / 16 < celulas && <ellipse key={i} cx={cx + Math.sin(T * 1.3 + p) * 6} cy={cy + Math.cos(T + p) * 6} rx={13} ry={6} fill={CARNE} transform={`rotate(${p * 40} ${cx} ${cy})`} />)}
    {Array.from({ length: 6 }, (_, i) => <circle key={'b' + i} cx={-70 + i * 28} cy={190 - ((T * 90 + i * 57) % 330)} r={6} fill="rgba(255,255,255,.7)" />)}
    <line x1={0} y1={-260} x2={0} y2={170} stroke="#8d97a1" strokeWidth={10} />
    <ellipse cx={0} cy={150} rx={70 * Math.abs(Math.cos(T * 5))} ry={10} fill="#9aa4ae" stroke={KC.ink} strokeWidth={4} />
    <rect x={-60} y={-290} width={120} height={70} rx={18} fill="#6f7a84" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-20} cy={-255} r={8} fill={Math.floor(T * 3) % 2 ? KC.mint : '#47525c'} /><circle cx={20} cy={-255} r={8} fill={Math.floor(T * 3) % 2 ? '#47525c' : KC.mint} />
    <rect x={-112} y={-200} width={36} height={360} rx={18} fill="#eef3f7" opacity={0.6} />
  </g>;
}
// Vaca de pie (adaptada de shots/bio-02-vacas/vacas-comun.jsx). feto: dibuja un becerrito punteado en la panza (esquemático).
function Vaca({ T = 0, x = 0, y = 0, s = 1, feto = 0 }) {
  const c = Math.sin(T * 1.7) * 12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(-300 -90) rotate(${c})`}><path d="M 0 0 C -40 40 -50 120 -40 190" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" /><ellipse cx={-40} cy={200} rx={16} ry={28} fill={KC.ink} /></g>
    {[[-230, 0], [-150, 1], [150, 0], [230, 1]].map(([px], i) => <g key={i} transform={`rotate(${Math.sin(T * 0.8 + i) * 1.2} ${px} 60)`}>
      <rect x={px - 26} y={40} width={52} height={210} rx={20} fill={i % 2 ? '#f4efe4' : '#fff'} stroke={KC.ink} strokeWidth={8} /><rect x={px - 28} y={226} width={56} height={34} rx={10} fill="#3a2b22" stroke={KC.ink} strokeWidth={6} />
    </g>)}
    <path d="M -60 120 Q 0 190 60 120 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-320} y={-170} width={600} height={320} rx={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d="M -250 -150 C -200 -110 -150 -140 -130 -90 C -110 -40 -190 -20 -230 -60 C -270 -100 -290 -130 -250 -150 Z" fill={KC.ink} />
    <path d="M 20 -168 C 70 -120 140 -150 150 -100 C 160 -40 70 -40 40 -80 C 20 -110 0 -150 20 -168 Z" fill={KC.ink} />
    <path d="M 160 40 C 200 20 250 40 240 90 C 220 120 170 110 160 80 Z" fill={KC.ink} />
    {feto > 0 && <g opacity={feto}>
      <ellipse cx={-40} cy={20} rx={150} ry={95} fill="rgba(255,179,199,.55)" stroke={KC.pink} strokeWidth={6} strokeDasharray="16 10" />
      <path d="M -120 40 Q -130 -30 -60 -40 Q 0 -50 30 -10 Q 70 -30 80 10 Q 70 50 30 40 Q 0 80 -60 70 Q -110 70 -120 40 Z" fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
    </g>}
    <g transform={`translate(300 -110) rotate(${mece(T, 5, 0.25) * 2})`}>
      <path d="M -20 -40 L -60 -66 L -40 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 10 -76 q 10 -30 30 -36" stroke="#e8d9b0" strokeWidth={12} fill="none" strokeLinecap="round" />
      <rect x={-30} y={-80} width={170} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={9} />
      <path d="M 40 -80 C 70 -60 60 -20 30 -30 C 10 -40 10 -70 40 -80 Z" fill={KC.ink} />
      <circle cx={70} cy={-20} r={12} fill={KC.ink} /><circle cx={74} cy={-24} r={4} fill="#fff" />
      <rect x={70} y={10} width={110} height={60} rx={28} fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
      <circle cx={150} cy={34} r={6} fill={KC.ink} /><circle cx={124} cy={34} r={6} fill={KC.ink} />
    </g>
  </g>;
}
function Aguja({ x, y, rot = 35, muestra = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-6} y={-260} width={12} height={250} fill="#dfe6ec" stroke={KC.ink} strokeWidth={4} />
    <rect x={-30} y={-380} width={60} height={130} rx={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <rect x={-44} y={-400} width={88} height={22} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {muestra > 0 && <rect x={-5} y={-60} width={10} height={50} rx={4} fill={CARNE} opacity={muestra} />}
  </g>;
}
function Frasco({ x, y, s = 1, liquido = '#f2c4b4', etiqueta, etqColor = KC.paper, nivel = 0.7 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -200 L -60 -110 L -160 120 Q -170 170 -120 175 L 120 175 Q 170 170 160 120 L 60 -110 L 60 -200 Z" fill="rgba(240,248,255,.55)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <clipPath id={'fr' + x}><path d="M -60 -200 L -60 -110 L -160 120 Q -170 170 -120 175 L 120 175 Q 170 170 160 120 L 60 -110 L 60 -200 Z" /></clipPath>
    <rect x={-170} y={175 - 300 * nivel} width={340} height={300} fill={liquido} clipPath={`url(#fr${x})`} />
    <rect x={-76} y={-230} width={152} height={40} rx={12} fill="#9aa4ae" stroke={KC.ink} strokeWidth={8} />
    {etiqueta && <g><rect x={-120} y={40} width={240} height={80} rx={14} fill={etqColor} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={92} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
function Tubo({ x, y, s = 1, liquido = AMBAR, etiqueta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-300} width={140} height={520} rx={60} fill="rgba(240,248,255,.6)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-58} y={-150} width={116} height={358} rx={50} fill={liquido} />
    <rect x={-86} y={-350} width={172} height={70} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-48} y={-130} width={22} height={300} rx={11} fill="rgba(255,255,255,.45)" />
    {etiqueta && <g><rect x={-62} y={-40} width={124} height={120} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={30} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
function Moneda({ x, y, r = 34, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}><ellipse rx={r} ry={r * 0.92} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
    <text y={r * 0.38} textAnchor="middle" style={{ font:`400 ${r * 1.1}px ${KF.titulo}` }} fill={KC.ink}>$</text></g>;
}

/* ---------- MICRO: músculo, células satélite, FAP, grasa ---------- */
function Fibra({ x0, x1, y, h = 130, T = 0, seed = 1 }) {
  const R = krng(seed), n = Math.floor((x1 - x0) / 24);
  return <g>
    <rect x={x0} y={y - h / 2} width={x1 - x0} height={h} rx={h / 2} fill="#c9404f" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => <line key={i} x1={x0 + 20 + i * 24} y1={y - h / 2 + 10} x2={x0 + 20 + i * 24} y2={y + h / 2 - 10} stroke={i % 2 ? '#e0606d' : '#a52f3c'} strokeWidth={6} />)}
    {Array.from({ length: 5 }, (_, i) => { const nx = x0 + 120 + i * ((x1 - x0 - 240) / 4) + R() * 60, top = i % 2 === 0;
      return <ellipse key={'n' + i} cx={nx} cy={top ? y - h / 2 + 14 : y + h / 2 - 14} rx={34} ry={10} fill="#4a1a6b" stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
function Satelite({ x, y, rot = 0, s = 1, glow = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {glow > 0 && <ellipse rx={70} ry={34} fill={SAT} opacity={0.3 * glow} />}
    <path d="M -56 0 Q -30 -20 0 -20 Q 30 -20 56 0 Q 30 20 0 20 Q -30 20 -56 0 Z" fill={SAT} stroke={KC.ink} strokeWidth={5} />
    <ellipse rx={20} ry={11} fill="#0b6b54" />
  </g>;
}
function FAP({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -70 -6 Q -30 -16 -20 -40 Q 0 -26 10 -50 Q 24 -20 66 -24 Q 40 0 70 20 Q 30 20 20 46 Q 0 26 -26 44 Q -24 16 -70 -6 Z" fill={FAPC} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse rx={16} ry={11} fill="#4b2b8f" />
  </g>;
}
function Adipocito({ x, y, r = 70, f = 1 }) {
  const rr = r * (0.55 + 0.45 * f);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={rr} fill="#fff4d6" stroke={KC.ink} strokeWidth={6} />
    <circle r={rr * 0.82 * f} fill={LIPIDO} />
    <circle cx={-rr * 0.3} cy={-rr * 0.3} r={rr * 0.18 * f} fill="rgba(255,255,255,.7)" />
    <path d={`M ${rr * 0.55} ${-rr * 0.55} Q ${rr * 0.95} 0 ${rr * 0.55} ${rr * 0.55}`} stroke="#4b2b8f" strokeWidth={Math.max(6, rr * 0.16)} fill="none" strokeLinecap="round" />
  </g>;
}

/* ---------- LEYES ---------- */
function Tarjeta({ T, at, ok, nombre, anio, y, chico = false }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote);
  return <div style={{ position:'absolute', left:90, top:y, width:900, height:118, zIndex:40, transform:`translateX(${(1 - e) * -900}px)`, display:'flex', alignItems:'center', gap:26,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, padding:'0 30px', boxSizing:'border-box' }}>
    <div style={{ width:76, height:76, borderRadius:'50%', background: ok ? KC.leaf : KC.red, border:`5px solid ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center', font:`900 50px ${KF.texto}`, color:'#fff', flexShrink:0 }}>{ok ? '✓' : '✕'}</div>
    <div style={{ font:`900 ${chico ? 42 : 50}px/1 ${KF.texto}`, color:KC.ink, flex:1, whiteSpace:'nowrap' }}>{nombre}</div>
    <div style={{ font:`400 ${chico ? 50 : 64}px/1 ${KF.titulo}`, color: ok ? '#1f7a2a' : KC.red, whiteSpace:'nowrap' }}>{anio}</div>
  </div>;
}
function Titulo({ T, at, until, texto, y, color = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:0, right:0, top:y, zIndex:40, textAlign:'center', opacity:e.o, transform:`scale(${e.s})`, font:`400 70px ${KF.titulo}`, color, letterSpacing:'.02em' }}>{texto}</div>;
}

function Carne() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bi: CUES.Biopsia, Ce: CUES.Celulas, Br: CUES.Biorreactor, Fi: CUES.Fibras, Pr: CUES.Pregunta, Su: CUES.Suero, SS: CUES.SinSuero,
    Ha: CUES.Hamburguesa, Co: CUES.Costo, Le: CUES.Leyes, Re: CUES.Reto, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el filete cae en la tabla
  const cae = kprog(T, K.G, K.G + 0.4, kEase.sale);
  const rebota = Math.exp(-Math.max(0, T - K.G - 0.4) * 7) * Math.sin(Math.max(0, T - K.G - 0.4) * 22) * 18;
  // biopsia
  const pica = kprog(T, K.Bi + 0.9, K.Bi + 1.6, kEase.sale), sale = kprog(T, K.Bi + 2.2, K.Bi + 3.0, kEase.suave);
  const agX = klerp(560, 690, pica) - sale * 130, agY = klerp(470, 790, pica) - sale * 320;
  // biorreactor: duplicaciones
  const dupT0 = K.Br + 0.9, dupDt = 0.55;
  const kDup = Math.max(0, Math.min(5, Math.floor((T - dupT0) / dupDt) + 1));
  const nCel = T < dupT0 ? 1 : Math.pow(2, kDup);
  const Rp = krng(42); const posCel = Array.from({ length: 32 }, () => [-190 + Rp() * 380, -190 + Rp() * 380, Rp() * 180]);
  // fibras
  const cambia = kprog(T, K.Fi + 0.1, K.Fi + 0.9);
  const alinea = kprog(T, K.Fi + 0.5, K.Fi + 2.0, kEase.suave), funde = kprog(T, K.Fi + 2.0, K.Fi + 3.2, kEase.suave);
  const engorda = kprog(T, K.Fi + 3.4, K.Fi + 5.4, kEase.suave);
  const Rs = krng(7); const satIni = Array.from({ length: 7 }, (_, i) => [100 + Rs() * 880, 520 + Rs() * 420, Rs() * 180, 160 + i * 128]);
  // hamburguesa
  const Rt = krng(13); const tiras = Array.from({ length: 70 }, (_, i) => [640 + (Rt() - 0.5) * 420, 1010 + (Rt() - 0.5) * 120, (Rt() - 0.5) * 80, K.Ha + 1.0 + i * 0.055]);
  const torta = kprog(T, K.Ha + 4.6, K.Ha + 5.4);
  // reto
  const crece = kprog(T, K.Re + 1.6, K.Re + 3.4, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el filete cae en la tabla y detrás se enciende el tanque */}
      <EscenaFundido T={T} a={K.G} b={K.Bi} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <TanqueMini T={T} x={250} y={700} s={0.85} brillo={kprog(T, K.G + 0.9, K.G + 1.6)} />
          <Tabla x={560} y={1090} s={1} />
          <Filete x={580} y={klerp(-300, 990, cae) - rebota} s={0.95} rot={klerp(-25, -4, cae)} brillo={kprog(T, K.G + 2.0, K.G + 2.6) * (1 - kprog(T, K.G + 3.6, K.G + 4.4))} />
        </SvgCapa>
      </EscenaFundido>
      {/* 1 · biopsia de un animal vivo */}
      <EscenaFundido T={T} a={K.Bi} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={0} y={1140} width={KW} height={800} fill="#7ccf6a" />
          <Vaca T={T} x={470} y={900} s={0.95} />
          <circle cx={690} cy={790} r={20 + 10 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={6} opacity={kprog(T, K.Bi + 0.4, K.Bi + 0.8) * (1 - sale)} />
          <Aguja x={agX} y={agY} rot={35} muestra={kprog(T, K.Bi + 1.8, K.Bi + 2.2)} />
        </SvgCapa>
      </EscenaFundido>
      {/* 2 · al microscopio: fibras y células satélite */}
      <EscenaFundido T={T} a={K.Ce} b={K.Br} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1d2436 0%, ${KC.dark} 75%)` }}></div>
        <SvgCapa>
          <Fibra x0={-60} x1={1140} y={640} T={T} seed={2} />
          <Fibra x0={-60} x1={1140} y={850} T={T} seed={3} />
          <Fibra x0={-60} x1={1140} y={1060} T={T} seed={4} />
          {[[260, 568], [700, 568], [480, 778], [900, 778], [340, 988]].map(([x, y], i) => { const on = kprog(T, K.Ce + 0.6 + i * 0.25, K.Ce + 1.0 + i * 0.25, kEase.rebote);
            return <Satelite key={i} x={x} y={y - 18} s={on} glow={0.6 + 0.4 * Math.sin(T * 5 + i)} />; })}
          {[[600, 745], [180, 955], [820, 955]].map(([x, y], i) => <FAP key={i} x={x} y={y} s={0.55} rot={i * 50} o={0.85} />)}
        </SvgCapa>
      </EscenaFundido>
      {/* 3 · biorreactor: la Lupa muestra las células que se dividen */}
      <EscenaFundido T={T} a={K.Br} b={K.Fi} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={klerp(0.15, 0.6, kprog(T, K.Br, K.Fi))} burbujas={1} fondo={KC.cyan} />
      </EscenaFundido>
      <Lupa T={T} at={K.Br + 0.4} until={K.Fi - 0.3} x={470} y={760} r={250} fx={540} fy={1010} tinte={KC.mint} etiqueta="POR DENTRO · biorreactor"
        interior={(T2, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#2a1a20" />
          {posCel.slice(0, nCel).map(([dx, dy, rot], i) => { const nace = i === 0 ? 1 : kprog(T2, dupT0 + (Math.ceil(Math.log2(i + 1)) - 1) * dupDt, dupT0 + (Math.ceil(Math.log2(i + 1)) - 1) * dupDt + 0.35, kEase.rebote);
            return <Satelite key={i} x={r + dx * (nCel > 1 ? 1 : 0)} y={r + dy * (nCel > 1 ? 1 : 0)} rot={rot + T2 * 20} s={(nCel > 8 ? 0.55 : 0.85) * nace} glow={0.5} />; })}
        </svg>} />
      {/* 4 · cambias el caldo: músculo y grasa */}
      <EscenaFundido T={T} a={K.Fi} b={K.Pr} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, ${mixHex('#1d2436', '#3a2430', cambia)} 0%, ${KC.dark} 78%)` }}></div>
        <SvgCapa>
          {funde > 0 && <g opacity={funde}>
            <rect x={110} y={700} width={860} height={120} rx={60} fill="#c9404f" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 34 }, (_, i) => <line key={i} x1={140 + i * 24} y1={712} x2={140 + i * 24} y2={808} stroke={i % 2 ? '#e0606d' : '#a52f3c'} strokeWidth={5} opacity={funde} />)}
            {Array.from({ length: 7 }, (_, i) => <ellipse key={'n' + i} cx={180 + i * 120} cy={760} rx={26} ry={14} fill="#4a1a6b" stroke={KC.ink} strokeWidth={3} />)}
          </g>}
          {funde < 1 && satIni.map(([x, y, rot, xf], i) => <g key={i} opacity={1 - funde}>
            <Satelite x={klerp(x, xf + 20, alinea)} y={klerp(y, 760, alinea)} rot={klerp(rot, 0, alinea)} s={klerp(0.9, 1.35, funde)} glow={0.4} />
          </g>)}
          {[[230, 1090], [430, 1110], [640, 1085], [850, 1105]].map(([x, y], i) => <g key={i}>
            {engorda < 1 && <FAP x={x} y={y} s={0.9} rot={i * 40 + Math.sin(T + i) * 6} o={1 - engorda} />}
            {engorda > 0 && <Adipocito x={x} y={y} r={78} f={engorda} />}
          </g>)}
        </SvgCapa>
      </EscenaFundido>
      {/* 5 · re-gancho: ¿qué lleva el caldo? */}
      <EscenaFundido T={T} a={K.Pr} b={K.Su} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Frasco x={300} y={1020} s={1.2} liquido="#f2c4b4" etiqueta="caldo" />
          <text x={300} y={720} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 7} 300 600)`}>?</text>
        </SvgCapa>
      </EscenaFundido>
      {/* 6 · suero fetal bovino */}
      <EscenaFundido T={T} a={K.Su} b={K.SS} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Tubo x={250} y={930} s={1.05} liquido={AMBAR} etiqueta="FBS" />
          <Vaca T={T} x={720} y={1000} s={0.55} feto={kprog(T, K.Su + 1.6, K.Su + 2.4)} />
        </SvgCapa>
      </EscenaFundido>
      {/* 7 · caldos sin suero */}
      <EscenaFundido T={T} a={K.SS} b={K.Ha} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={1 - 0.6 * kprog(T, K.SS + 1.2, K.SS + 1.8)}><Tubo x={250} y={930} s={0.9} liquido={AMBAR} etiqueta="FBS" /></g>
          <g transform={`translate(${klerp(1300, 0, kprog(T, K.SS + 1.4, K.SS + 2.0, kEase.sale))} 0)`}><Frasco x={730} y={1000} s={1.15} liquido="#bdf2d8" etiqueta="sin suero" /></g>
        </SvgCapa>
      </EscenaFundido>
      {/* 8–9 · Londres 2013: 20 mil tiritas · 250 mil euros */}
      <EscenaFundido T={T} a={K.Ha} b={K.Le} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <ellipse cx={640} cy={1080} rx={300} ry={50} fill="rgba(0,0,0,.18)" />
          <ellipse cx={640} cy={1050} rx={360} ry={70} fill="#fff" stroke={KC.ink} strokeWidth={9} />
          {torta > 0 && <g opacity={torta}><ellipse cx={640} cy={1010} rx={250} ry={90} fill={CARNE} stroke={KC.ink} strokeWidth={9} />
            <ellipse cx={600} cy={985} rx={140} ry={30} fill="rgba(255,255,255,.35)" /></g>}
          {tiras.map(([x, y, rot, t0], i) => { const p = kprog(T, t0, t0 + 0.45, kEase.sale); if (p <= 0) return null;
            return <rect key={i} x={-34} y={-8} width={68} height={16} rx={8} fill={i % 3 ? CARNE : '#e86a76'} stroke={KC.ink} strokeWidth={3}
              transform={`translate(${x} ${klerp(-60, y, p)}) rotate(${rot + (1 - p) * 120})`} opacity={1 - torta * 0.85} />; })}
        </SvgCapa>
      </EscenaFundido>
      {/* 10 · leyes */}
      <EscenaFundido T={T} a={K.Le} b={K.Re} zoom={0.02}>
        <FondoLunares color={KC.cyan} />
      </EscenaFundido>
      {T > K.Le - 0.4 && T < K.Re + 0.45 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.Le - 0.4, K.Le + 0.05) * (1 - kprog(T, K.Re - 0.05, K.Re + 0.45)) }}>
        <Titulo T={T} at={K.Le + 0.1} until={K.Re} texto="APROBARON SU VENTA" y={470} />
        <Tarjeta T={T} at={K.Le + 0.4} ok nombre="Singapur" anio="2020" y={570} />
        <Tarjeta T={T} at={K.Le + 1.8} ok nombre="Estados Unidos" anio="2023" y={710} />
        <Titulo T={T} at={K.Le + 3.3} until={K.Re} texto="LA PROHIBIERON" y={880} color={KC.red} />
        <Tarjeta T={T} at={K.Le + 3.6} nombre="Italia · Hungría" anio="2023–25" y={980} />
        <Tarjeta T={T} at={K.Le + 4.6} nombre="varios estados de EE. UU." anio="2024–26" y={1120} chico />
      </div>}
      {/* 11 · el reto: el caldo y los tanques gigantes */}
      <EscenaFundido T={T} a={K.Re} b={K.Ci} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, transform:`scale(${klerp(0.42, 0.95, crece)})`, transformOrigin:'50% 80%' }}>
          <MundoBiorreactor T={T} turbio={0.55} burbujas={1} fondo={KC.yellow} />
        </div>
        <SvgCapa>
          {Array.from({ length: 9 }, (_, i) => { const t0 = K.Re + 0.3 + i * 0.16, p = kprog(T, t0, t0 + 0.6, kEase.suave); if (p <= 0 || p >= 1) return null;
            return <Moneda key={i} x={480 + (i % 3) * 60} y={klerp(-60, 1180, p)} rot={p * 300} />; })}
        </SvgCapa>
      </EscenaFundido>
      {/* 12 · cierre: el filete del inicio, junto al tanque del que salió */}
      <EscenaFundido T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <TanqueMini T={T} x={230} y={700} s={0.85} brillo={0.6} />
          <FlechaCurva x1={300} y1={420} x2={560} y2={860} p={kprog(T, K.Ci + 0.4, K.Ci + 1.4)} color={KC.ink} T={T} />
          <Tabla x={580} y={1090} s={1} />
          <Filete x={600} y={990} s={0.95} rot={-4} brillo={0.5 + 0.3 * Math.sin(T * 3)} />
        </SvgCapa>
      </EscenaFundido>

      {/* capítulos */}
      <Capitulo T={T} caps={[{ at: K.Bi, titulo: 'Biopsia' }, { at: K.Br, titulo: 'Biorreactor' }, { at: K.Fi, titulo: 'Músculo y grasa' }, { at: K.Pr, titulo: 'El caldo' }]} hasta={K.Ha - 0.2} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.9} until={K.G + 4.3} texto="¿cortada de una res?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.2} until={K.Bi - 0.3} texto="carne cultivada" y={1560} tam={50} borde={KC.pink} />
      <Etq T={T} at={K.Bi + 2.0} until={K.Ce - 0.3} x={700} y={1250} texto="animal vivo" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Bi + 1.8} until={K.Ce - 0.3} texto="biopsia: un pedacito de músculo" y={1560} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ce + 0.2} until={K.Br - 0.3} texto="AL MICROSCOPIO · músculo" y={440} tam={36} mono borde={SAT} />
      <Etq T={T} at={K.Ce + 1.2} until={K.Br - 0.3} x={250} y={500} texto="célula satélite (célula madre)" lado="der" tam={34} color={SAT} />
      <Chip T={T} at={dupT0 - 0.2} until={K.Fi - 0.3} texto={`${nCel} ${nCel === 1 ? 'célula' : 'células'}`} y={1560} tam={52} mono borde={SAT} />
      <Chip T={T} at={K.Fi + 0.2} until={K.Fi + 2.0} texto="caldo nuevo" y={460} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Fi + 3.0} until={K.Pr - 0.3} x={110} y={630} texto="fibra de músculo" lado="der" tam={36} color="#ff8f9b" />
      <Etq T={T} at={K.Fi + 1.4} until={K.Fi + 3.6} x={100} y={960} texto="otras células del pedacito" lado="der" tam={32} color={FAPC} />
      <Etq T={T} at={K.Fi + 4.0} until={K.Pr - 0.3} x={100} y={960} texto="grasa" lado="der" tam={36} color={LIPIDO} />
      <Etq T={T} at={K.Su + 1.5} until={K.SS - 0.3} x={340} y={700} texto="suero fetal bovino" lado="der" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Su + 2.4} until={K.SS - 0.3} texto="parte líquida de la sangre de fetos" y={1560} tam={36} borde={AMBAR} />
      <MitoTachado T={T} at={K.SS + 0.2} tacharEn={K.SS + 1.0} until={K.Ha - 0.3} texto="suero fetal" x={300} y={470} tam={44} />
      <Chip T={T} at={K.SS + 2.0} until={K.Ha - 0.3} texto="Singapur · 2023 · primer caldo sin suero" y={1560} tam={34} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Ha + 0.2} until={K.Ha + 3.6} anio="2013" quien="Mark Post · Londres" revista="5 ago · Universidad de Maastricht" x={620} y={600} />
      {T < K.Le && <Contador T={T} at={K.Ha + 1.0} desde={0} hasta={20000} dur={3.8} sufijo=" tiritas" x={540} y={1560} tam={64} color={KC.texto} />}
      <NumeroGigante T={T} at={K.Co} until={K.Le - 0.2} valor={250000} dur={1.0} sufijo=" €" y={500} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Re + 0.3} until={K.Re + 2.0} texto="el caldo: lo más caro" y={1560} tam={46} borde={KC.gold} />
      <Chip T={T} at={K.Re + 2.2} until={K.Ci - 0.3} texto="falta: tanques gigantes" y={1560} tam={46} borde={KC.cyan} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="células de animal · crecidas en tanque" y={1560} tam={36} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bi - 0.1} texto="No se cortó: *creció en un tanque.*" />
      <Subtitulo T={T} idx={1} at={K.Bi + 0.1} until={K.Ce - 0.1} texto="Una *biopsia,* de un animal vivo." />
      <Subtitulo T={T} idx={2} at={K.Ce + 0.1} until={K.Br - 0.1} texto="*Células madre* del músculo." />
      <Subtitulo T={T} idx={3} at={K.Br + 0.1} until={K.Fi - 0.1} texto="Se dividen *una y otra vez.*" />
      <Subtitulo T={T} idx={4} at={K.Fi + 0.1} until={K.Pr - 0.1} texto="Músculo… *y grasa.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Su - 0.1} texto="¿Qué lleva *el caldo?*" />
      <Subtitulo T={T} idx={6} at={K.Su + 0.1} until={K.SS - 0.1} texto="*Suero fetal* bovino." />
      <Subtitulo T={T} idx={7} at={K.SS + 0.1} until={K.Ha - 0.1} texto="Ahora: *caldos sin suero.*" />
      <Subtitulo T={T} idx={8} at={K.Ha + 0.1} until={K.Co - 0.1} texto="Londres, 2013: *20 mil tiritas.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Le - 0.1} texto="*250 mil euros.*" />
      <Subtitulo T={T} idx={10} at={K.Le + 0.1} until={K.Re - 0.1} texto="Aprobada… *y prohibida.*" />
      <Subtitulo T={T} idx={11} at={K.Re + 0.1} until={K.Ci - 0.1} texto="El reto: *el caldo.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="De animal, *pero de tanque.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Biopsia + 1.0, CUES.Celulas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Biorreactor + 0.8, CUES.Fibras - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Suero + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Suero + 1.5, CUES.SinSuero - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Hamburguesa + 0.8, CUES.Hamburguesa + 5.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Costo - 0.1, CUES.Leyes + 0.5, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Leyes + 3.5, CUES.Reto - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [CUES.Reto + 0.5, CUES.Reto + 4.0, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="42" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CarneApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Carne /></CompositionStage></div>;
}
window.CarneApp = CarneApp;
