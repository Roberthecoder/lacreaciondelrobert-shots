// Shot Biotecnológico #52 · El ácido cítrico de tu gomita lo hace un moho (Aspergillus niger) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (célula, mitocondria, ciclo y bomba no están a escala).
const ESPORA = '#3a2a20', ESPORA2 = '#5a4030', CITRATO = '#ffd43b', LIMON = '#ffe11a', CEBOLLA = '#e9b872', CEB_OSC = '#b9853f';

function CapaC({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Gomita ácida en forma de aro, cubierta de cristalitos de azúcar y ácido.
function Gomita({ x, y, s = 1, rot = 0, brillo = 0, seed = 3 }) {
  const R = krng(seed);
  const cristales = Array.from({ length: 46 }, () => { const a = R() * Math.PI * 2, rr = 120 + R() * 70; return [Math.cos(a) * rr * 1.25, Math.sin(a) * rr * 0.8, R() * 90, 6 + R() * 7]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={8} cy={16} rx={250} ry={165} fill="rgba(0,0,0,.18)" />
    <path d="M -240 0 A 240 155 0 1 0 240 0 A 240 155 0 1 0 -240 0 Z M -110 0 A 110 66 0 1 1 110 0 A 110 66 0 1 1 -110 0 Z" fillRule="evenodd" fill="#ff4d6d" stroke={KC.ink} strokeWidth={10} />
    <path d="M -240 0 A 240 155 0 0 1 240 0 L 110 0 A 110 66 0 0 0 -110 0 Z" fill="#2fe0a8" stroke={KC.ink} strokeWidth={8} />
    <path d="M -190 -60 Q -120 -120 -20 -128" stroke="rgba(255,255,255,.7)" strokeWidth={14} fill="none" strokeLinecap="round" />
    {cristales.map(([cx, cy, r, w], i) => <rect key={i} x={cx - w / 2} y={cy - w / 2} width={w} height={w} transform={`rotate(${r} ${cx} ${cy})`} fill="#fff" stroke="rgba(22,18,15,.35)" strokeWidth={1.5} opacity={0.75 + 0.25 * brillo} />)}
    {brillo > 0 && <ellipse cx={0} cy={0} rx={270} ry={180} fill="none" stroke={KC.gold2} strokeWidth={10} opacity={brillo * 0.8} />}
  </g>;
}
// Cristalitos que caen (el polvito ácido de la gomita).
function Polvito({ T, x, y, desde, n = 22, alto = 260, seed = 7 }) {
  if (T < desde) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const dx = (R() - 0.5) * 380, t0 = desde + R() * 1.2, v = 180 + R() * 160, p = kclamp((T - t0) * v / alto, 0, 1), w = 6 + R() * 6;
    if (T < t0 || p >= 1) return null;
    return <rect key={i} x={x + dx + Math.sin(T * 3 + i) * 10} y={y + p * alto} width={w} height={w} fill="#fff" stroke="rgba(22,18,15,.4)" strokeWidth={1.5} opacity={1 - p} transform={`rotate(${T * 120 + i * 30} ${x + dx} ${y + p * alto})`} />; })}</g>;
}
function Limon({ x, y, s = 1, rot = 0, gris = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 0 Q -150 -110 0 -110 Q 150 -110 150 0 Q 150 110 0 110 Q -150 110 -150 0 Z" fill={mixHex(LIMON, '#9a9a8a', gris)} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 0 q -30 -6 -40 0 q 10 6 40 0 M 150 0 q 30 -6 40 0 q -10 6 -40 0" fill={mixHex(LIMON, '#9a9a8a', gris)} stroke={KC.ink} strokeWidth={7} />
    <path d="M 40 -108 q 50 -70 120 -60 q -40 60 -120 60 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-60} cy={-50} rx={40} ry={16} fill="rgba(255,255,255,.65)" transform="rotate(-20 -60 -50)" />
    {[[-40, 30], [20, 50], [60, -10], [-90, 10], [90, 40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill="rgba(150,120,0,.45)" />)}
  </g>;
}
// Colonia de moho negro vista a simple vista: pelusa negra con borde blanco que respira.
function ColoniaNegra({ T, x, y, s = 1, crece = 1, seed = 5 }) {
  if (crece <= 0) return null;
  const R = krng(seed);
  const pts = Array.from({ length: 60 }, () => { const a = R() * Math.PI * 2, rr = Math.sqrt(R()) * 110; return [Math.cos(a) * rr, Math.sin(a) * rr * 0.7, 8 + R() * 14, R() * 6]; });
  return <g transform={`translate(${x} ${y}) scale(${s * crece})`}>
    <ellipse rx={130} ry={92} fill="#f2f2ea" stroke={KC.ink} strokeWidth={7} />
    {pts.map(([a, b, r, p], i) => <circle key={i} cx={a + Math.sin(T * 2 + p) * 2} cy={b + Math.cos(T * 2 + p) * 2} r={r} fill={i % 3 ? ESPORA : '#1d1611'} />)}
  </g>;
}
// Barco con cajas de limones de Italia (bandera tricolor en la caja).
function Barco({ T, x, y, s = 1 }) {
  const b = Math.sin(T * 2.2) * 8, r = Math.sin(T * 1.7) * 2;
  return <g transform={`translate(${x} ${y + b}) rotate(${r}) scale(${s})`}>
    <path d="M -380 0 L 380 0 L 300 150 L -300 150 Z" fill={KC.red} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-300} y={40} width={600} height={22} fill={KC.paper} />
    {[-220, -40, 140].map((cx, i) => <g key={i} transform={`translate(${cx} -150)`}>
      <rect width={160} height={150} rx={8} fill="#c8935a" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2].map((k) => <circle key={k} cx={34 + k * 46} cy={-6} r={26} fill={LIMON} stroke={KC.ink} strokeWidth={5} />)}
      <rect x={30} y={50} width={100} height={56} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <rect x={30} y={50} width={33} height={56} fill="#2fa84f" /><rect x={97} y={50} width={33} height={56} fill="#e63946" />
      <rect x={30} y={50} width={100} height={56} fill="none" stroke={KC.ink} strokeWidth={4} />
    </g>)}
    <line x1={300} y1={0} x2={300} y2={-300} stroke={KC.ink} strokeWidth={10} />
    <path d="M 300 -290 L 380 -260 L 300 -230 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Olas({ T, y, color = '#1c9ad6' }) {
  let d = `M -40 ${y}`;
  for (let i = 0; i <= 24; i++) d += ` Q ${i * 50 - 15} ${y - 22 + Math.sin(T * 2 + i) * 6} ${i * 50 + 10} ${y}`;
  return <path d={`${d} L 1120 ${KH} L -40 ${KH} Z`} fill={color} stroke={KC.ink} strokeWidth={8} />;
}
// Espora de Aspergillus niger: redonda, pardo-negra y rugosa (con verrugas).
function Espora({ x, y, r = 12, o = 1 }) {
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={ESPORA} stroke="#120c08" strokeWidth={2.5} />
    {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={x + Math.cos(k * 1.3) * r * 0.55} cy={y + Math.sin(k * 1.3) * r * 0.55} r={r * 0.18} fill={ESPORA2} />)}
  </g>;
}
// Conidióforo de A. niger: tallo largo y liso, vesícula redonda, métulas, fiálides y cadenas de esporas que irradian.
function Conidioforo({ T, x, y, s = 1, alto = 640, rv = 90, cadenas = 1, n = 6, seed = 2 }) {
  const R = krng(seed);
  const ang = Array.from({ length: 22 }, (_, i) => -Math.PI * 1.05 + (i / 21) * Math.PI * 1.1 + (R() - 0.5) * 0.05);
  const cab = -alto;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -12 0 Q -4 ${cab / 2} -14 ${cab + rv * 0.6} L 14 ${cab + rv * 0.6} Q 6 ${cab / 2} 12 0 Z`} fill="#efe6d2" stroke={KC.ink} strokeWidth={6} />
    {ang.map((a, i) => { const c = Math.cos(a), sn = Math.sin(a), mx = c * rv, my = cab + sn * rv;
      const nn = Math.round(n * kclamp(cadenas * 1.3 - (i % 4) * 0.08, 0, 1));
      return <g key={i}>
        <line x1={mx} y1={my} x2={mx + c * 24} y2={my + sn * 24} stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />
        <line x1={mx} y1={my} x2={mx + c * 24} y2={my + sn * 24} stroke="#d9cdb2" strokeWidth={7} strokeLinecap="round" />
        <line x1={mx + c * 26} y1={my + sn * 26} x2={mx + c * 46} y2={my + sn * 46} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
        <line x1={mx + c * 26} y1={my + sn * 26} x2={mx + c * 46} y2={my + sn * 46} stroke="#bfb193" strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: nn }, (_, k) => { const d = 60 + k * 23 + mece(T, i * 7 + k, 0.4) * 2; return <Espora key={k} x={mx + c * d} y={my + sn * d} r={11} />; })}
      </g>; })}
    <circle cx={0} cy={cab} r={rv} fill="#efe6d2" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-28} cy={cab - 30} rx={24} ry={14} fill="rgba(255,255,255,.7)" />
  </g>;
}
// Cebolla con la cáscara seca que se levanta; debajo, rayas de polvo negro a lo largo de las venas.
function Cebolla({ T, x, y, s = 1, piel = 0, moho = 1 }) {
  const venas = [-120, -70, -25, 25, 70, 120];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -330 Q 30 -250 120 -200 Q 280 -110 270 40 Q 260 220 0 250 Q -260 220 -270 40 Q -280 -110 -120 -200 Q -30 -250 0 -330 Z" fill="#f3e3c3" stroke={KC.ink} strokeWidth={10} />
    {venas.map((v, i) => <path key={i} d={`M ${v * 0.15} -300 Q ${v * 1.6} -40 ${v * 0.6} 240`} fill="none" stroke="#d9c39a" strokeWidth={5} />)}
    {moho > 0 && venas.map((v, i) => { const R = krng(i + 11); return <g key={'m' + i} opacity={moho}>
      {Array.from({ length: 16 }, (_, k) => { const u = 0.15 + k / 20, px = klerp(v * 0.15, v * 0.6, u) + (v * 1.6 - (v * 0.15 + v * 0.6) / 2) * 2 * u * (1 - u) * 0.9, py = -300 + 540 * u;
        return <circle key={k} cx={px + (R() - 0.5) * 10} cy={py} r={5 + R() * 6} fill={k % 2 ? ESPORA : '#1d1611'} />; })}</g>; })}
    <path d="M -40 -330 Q 0 -400 40 -330" fill="none" stroke={CEB_OSC} strokeWidth={14} strokeLinecap="round" />
    <path d="M 0 250 q -30 30 -50 50 M 0 250 q 0 40 0 60 M 0 250 q 30 30 50 50" stroke="#c9b48a" strokeWidth={6} fill="none" />
    {/* cáscara seca: tapa la mitad derecha y se levanta girando desde la izquierda */}
    <g transform={`rotate(${-piel * 62} -10 240)`}>
      <path d="M 0 -330 Q 30 -250 120 -200 Q 280 -110 270 40 Q 260 220 0 250 Q -40 50 -10 -150 Q -6 -250 0 -330 Z" fill={CEBOLLA} stroke={KC.ink} strokeWidth={9} />
      {[40, 100, 160].map((v, i) => <path key={i} d={`M ${v * 0.2} -300 Q ${v * 1.5} -40 ${v * 0.5} 240`} fill="none" stroke={CEB_OSC} strokeWidth={5} />)}
    </g>
  </g>;
}
// Bolita de moho (pellet): hifas que salen de un centro, como pompón.
function Pellet({ T, x, y, r = 60, seed = 1, color = '#d9cdb2' }) {
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) rotate(${T * 12 + seed * 30})`}>
    {Array.from({ length: 26 }, (_, i) => { const a = (i / 26) * Math.PI * 2 + R() * 0.2, l = r * (0.75 + R() * 0.35), w = mece(T, seed * 9 + i, 0.5) * 0.12;
      return <path key={i} d={`M 0 0 Q ${Math.cos(a + 0.3 + w) * l * 0.6} ${Math.sin(a + 0.3 + w) * l * 0.6} ${Math.cos(a) * l} ${Math.sin(a) * l}`} stroke={color} strokeWidth={Math.max(3, r / 14)} fill="none" strokeLinecap="round" />; })}
    <circle r={r * 0.42} fill="#6b5a44" stroke={KC.ink} strokeWidth={Math.max(3, r / 15)} />
  </g>;
}
// Pieza de citrato (amarilla, 6 carbonos esquemáticos) o de sus dos piezas de origen.
function Pieza({ x, y, tipo = 'citrato', s = 1, o = 1, rot = 0 }) {
  const c = tipo === 'citrato' ? CITRATO : tipo === 'acetil' ? KC.orange : KC.lilac;
  const r = tipo === 'acetil' ? 18 : tipo === 'oxalo' ? 26 : 30;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={Array.from({ length: 6 }, (_, i) => `${Math.cos(i * Math.PI / 3) * r},${Math.sin(i * Math.PI / 3) * r}`).join(' ')} fill={c} stroke={KC.ink} strokeWidth={5} />
    {tipo === 'citrato' && <circle r={7} fill={KC.ink} opacity={0.5} />}
  </g>;
}
// Matraz Erlenmeyer con caldo y la nata de moho en la superficie (como en 1917).
function Matraz({ T, x, y, s = 1, nata = 1, seed = 1 }) {
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -260 L -40 -150 L -150 100 Q -160 130 -125 130 L 125 130 Q 160 130 150 100 L 40 -150 L 40 -260 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -100 -10 L -148 100 Q -156 124 -125 124 L 125 124 Q 156 124 148 100 L 100 -10 Z" fill="#fff3b0" />
    <rect x={-52} y={-290} width={104} height={40} rx={12} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    {nata > 0 && <g opacity={nata}>
      <path d="M -100 -10 Q -50 -34 0 -14 Q 50 -38 100 -10 L 104 6 L -104 6 Z" fill="#efe9da" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-92 + i * 8.7} cy={-16 - R() * 12 + Math.sin(T * 2 + i) * 1.5} r={5 + R() * 4} fill={i % 2 ? ESPORA : '#1d1611'} />)}
    </g>}
  </g>;
}
// Planta piloto esquemática (sin marcas): nave con techo de sierra, chimenea y charolas con nata de moho.
function Planta({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-380} y={-260} width={760} height={360} fill="#e7d9c2" stroke={KC.ink} strokeWidth={10} />
    <path d="M -380 -260 L -290 -360 L -290 -260 L -200 -360 L -200 -260 L -110 -360 L -110 -260 L -20 -360 L -20 -260 L 70 -360 L 70 -260 Z" fill="#b9a688" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={200} y={-470} width={80} height={210} fill="#9a6b4a" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2].map((k) => { const u = ((T * 0.5 + k / 3) % 1); return <circle key={k} cx={240 + u * 90} cy={-490 - u * 200} r={30 + u * 40} fill="rgba(255,255,255,.75)" stroke="rgba(22,18,15,.35)" strokeWidth={3} opacity={1 - u} />; })}
    <rect x={-340} y={-210} width={680} height={270} fill="#3d3a46" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <g key={r + '-' + c} transform={`translate(${-250 + c * 165} ${-160 + r * 85})`}>
      <rect x={-65} y={0} width={130} height={30} fill="#9aa4ae" stroke={KC.ink} strokeWidth={4} />
      <rect x={-60} y={-8} width={120} height={12} rx={5} fill="#efe9da" />
      {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={-50 + k * 20} cy={-8} r={6} fill={ESPORA} />)}
    </g>))}
  </g>;
}

function Citrico() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, An: CUES.Antes, Mo: CUES.Moho, Ce: CUES.Cebolla, Ta: CUES.Tanque, Pr: CUES.Pregunta, Kr: CUES.Krebs,
    Mn: CUES.Manganeso, Bo: CUES.Bomba, Cu: CUES.Currie, Pf: CUES.Pfizer, Ho: CUES.Hoy, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.55, kEase.rebote);
  // dentro de la hifa: citrato que se arma (cada 0.9 s), que se amontona sin manganeso y que la bomba saca
  const armados = (t) => Math.max(0, Math.floor((t - K.Kr - 1.2) / 0.9));
  const sinMn = kprog(T, K.Mn + 0.4, K.Mn + 2.4);
  const R = krng(52);
  const monton = Array.from({ length: 26 }, () => [R(), R(), R() * 360]);
  const nMonton = T < K.Mn ? Math.min(3, armados(T)) : Math.min(26, 3 + Math.floor((T - K.Mn) * 5.5));
  const salen = Array.from({ length: 14 }, (_, i) => ({ t0: K.Bo + 0.3 + i * 0.22, dx: (R() - 0.5) * 520, rot: R() * 360 }));
  const mitad = (a, b) => a + (b - a) * 0.5;
  const pfMitad = mitad(K.Pf, K.Ho);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: cae la gomita, suelta su polvito; el limón se tacha y aparece el moho */}
      <Escena T={T} a={K.G} b={K.An} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <CapaC>
          <Limon x={790} y={1120} s={0.95} rot={-12} gris={kprog(T, K.G + 1.6, K.G + 2.2) * 0.6} />
          <Gomita x={380} y={klerp(560, 1060, cae)} s={1} rot={klerp(-30, -8, cae)} />
          <Polvito T={T} x={380} y={1030} desde={K.G + 0.45} />
          <ColoniaNegra T={T} x={780} y={1340} s={0.75} crece={kprog(T, K.G + 2.4, K.G + 3.2, kEase.rebote)} />
        </CapaC>
      </Escena>
      {/* 1 · antes: limones de Italia en barco */}
      <Escena T={T} a={K.An} b={K.Mo} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <CapaC>
          <Barco T={T} x={klerp(380, 620, kprog(T, K.An - 0.4, K.Mo + 0.4))} y={1060} s={1} />
          <Olas T={T} y={1150} />
        </CapaC>
      </Escena>
      {/* 2 · el moho: conidióforo de Aspergillus niger */}
      <Escena T={T} a={K.Mo} b={K.Ce} zoom={0.06} origen="45% 40%">
        <FondoLunares color={KC.pink} />
        <CapaC>
          <Conidioforo T={T} x={430} y={1420} s={1} alto={560} cadenas={kprog(T, K.Mo + 0.3, K.Mo + 2.4)} />
        </CapaC>
      </Escena>
      {/* 3 · la cebolla: la cáscara se levanta; la Lupa muestra cabezas casi iguales */}
      <Escena T={T} a={K.Ce} b={K.Ta} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        <CapaC><Cebolla T={T} x={520} y={1120} s={1.15} piel={kprog(T, K.Ce + 0.3, K.Ce + 1.3, kEase.sale)} moho={1} /></CapaC>
      </Escena>
      {/* 4 · el tanque con agua y mucha azúcar; bolitas de moho */}
      <Escena T={T} a={K.Ta} b={K.Pr} zoom={0.04}>
        <MundoBiorreactor T={T} turbio={klerp(0.15, 0.55, kprog(T, K.Ta, K.Pr))} burbujas={1} rpm={80} fondo={KC.cyan} />
        <CapaC>
          <clipPath id="c52tanque"><rect x={262} y={700} width={556} height={790} rx={60} /></clipPath>
          <g clipPath="url(#c52tanque)">{Array.from({ length: 14 }, (_, i) => { const g = krng(i + 40); return <Pellet key={i} T={T} x={300 + g() * 480 + mece(T, i, 0.3) * 20} y={760 + g() * 680 + mece(T, i + 5, 0.3) * 20} r={26 + g() * 10} seed={i + 1} />; })}</g>
          {[0, 1, 2, 3].map((k) => { const t0 = K.Ta + 0.3 + k * 0.7, u = kprog(T, t0, t0 + 0.6); if (T < t0 || u >= 1) return null;
            return <g key={k}>{Array.from({ length: 10 }, (_, j) => <rect key={j} x={480 + j * 12 - 60 + Math.sin(j) * 20} y={klerp(250, 700, u) + (j % 3) * 14} width={10} height={10} fill="#fff" stroke={KC.ink} strokeWidth={2} />)}</g>; })}
        </CapaC>
      </Escena>
      {/* 5 · pregunta: una bolita de cerca */}
      <Escena T={T} a={K.Pr} b={K.Kr} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        <CapaC>
          <Pellet T={T} x={300} y={1080} r={200} seed={9} />
          <text x={300} y={820} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 700)`}>?</text>
        </CapaC>
      </Escena>
      {/* 6–8 · por dentro de la hifa: la rueda del ciclo arma citrato; sin manganeso se amontona; la bomba lo saca */}
      <Escena T={T} a={K.Kr} b={K.Cu} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <CapaC>
          {/* caldo de afuera: se pone ácido cuando sale el citrato */}
          <rect x={0} y={380} width={KW} height={430} fill={CITRATO} opacity={0.18 * kprog(T, K.Bo + 0.5, K.Cu)} />
          {/* hifa */}
          <rect x={-60} y={820} width={KW + 120} height={360} rx={170} fill="#233042" stroke="#eafff7" strokeWidth={8} />
          {[170, 900].map((sx) => <line key={sx} x1={sx} y1={826} x2={sx} y2={1174} stroke="#eafff7" strokeWidth={6} opacity={0.7} />)}
          {/* núcleo */}
          <ellipse cx={280} cy={1060} rx={60} ry={46} fill="#5b6aa8" stroke="#eafff7" strokeWidth={4} />
          {/* mitocondria con la rueda del ciclo */}
          <ellipse cx={600} cy={1000} rx={230} ry={120} fill="#c0563f" stroke={KC.ink} strokeWidth={6} />
          <path d="M 420 1000 q 30 -60 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="#ffb199" strokeWidth={6} />
          <g transform={`translate(600 1000) rotate(${T * 50})`}>
            <circle r={70} fill="none" stroke={KC.gold2} strokeWidth={8} strokeDasharray="22 12" />
            {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 4) * 70} cy={Math.sin(i * Math.PI / 4) * 70} r={11} fill={i === 0 ? CITRATO : '#f4efe4'} stroke={KC.ink} strokeWidth={3} />)}
          </g>
          {/* dos piezas se juntan y sale citrato, una y otra vez */}
          {T < K.Bo + 2 && Array.from({ length: 4 }, (_, k) => { const t0 = K.Kr + 0.8 + k * 0.9, u = kprog(T, t0, t0 + 0.6, kEase.sale);
            if (T < t0 || T > t0 + 0.9) return null;
            return <g key={k}><Pieza tipo="acetil" x={klerp(440, 560, u)} y={920} o={1 - kprog(T, t0 + 0.6, t0 + 0.7)} /><Pieza tipo="oxalo" x={klerp(760, 620, u)} y={930} o={1 - kprog(T, t0 + 0.6, t0 + 0.7)} />
              {u >= 1 && <Pieza x={600} y={klerp(930, 900, kprog(T, t0 + 0.6, t0 + 0.9))} s={1.1} />}</g>; })}
          {/* citrato amontonado dentro de la hifa */}
          {monton.slice(0, nMonton).map(([a, b, r], i) => { const sale = salen[i % 14], fuera = i < 14 && T > sale.t0;
            const u = fuera ? kprog(T, sale.t0, sale.t0 + 0.9, kEase.sale) : 0;
            const x0 = 360 + a * 520, y0 = 880 + b * 80, x1 = 540 + sale.dx, y1 = 460 + b * 260;
            const xx = fuera ? (u < 0.4 ? klerp(x0, 540, u / 0.4) : klerp(540, x1, (u - 0.4) / 0.6)) : x0 + mece(T, i, 0.5) * 6;
            const yy = fuera ? (u < 0.4 ? klerp(y0, 820, u / 0.4) : klerp(820, y1, (u - 0.4) / 0.6)) : y0 + mece(T, i + 3, 0.5) * 6;
            return <Pieza key={i} x={xx} y={yy} s={0.8} rot={r + T * 40} />; })}
          {/* la bomba en la pared de arriba */}
          <g transform="translate(540 822)">
            <rect x={-46} y={-30} width={36} height={60} rx={10} fill={T > K.Bo ? KC.mint : '#56606e'} stroke={KC.ink} strokeWidth={5} />
            <rect x={10} y={-30} width={36} height={60} rx={10} fill={T > K.Bo ? KC.mint : '#56606e'} stroke={KC.ink} strokeWidth={5} />
            {T > K.Bo && <circle r={60 + Math.sin(T * 8) * 6} fill="none" stroke={KC.mint} strokeWidth={5} opacity={0.6} />}
          </g>
        </CapaC>
        <Medidor T={T} at={K.Mn + 0.2} until={K.Cu - 0.3} valor={(t) => klerp(0.8, 0.03, kprog(t, K.Mn + 0.4, K.Mn + 2.4))} etiqueta="manganeso en el caldo" texto={(v) => (v < 0.1 ? 'casi 0' : 'normal')} x={90} y={1400} color={KC.lilac} />
      </Escena>
      {/* 9 · Currie, 1917: matraces con la nata de moho, pH ~3.5 */}
      <Escena T={T} a={K.Cu} b={K.Pf} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaC>
          {[0, 1, 2, 3].map((i) => <Matraz key={i} T={T} x={190 + i * 235} y={1080} s={0.82} nata={kprog(T, K.Cu + 1.6 + i * 0.35, K.Cu + 2.4 + i * 0.35)} seed={i + 3} />)}
          <g transform="translate(830 1300)">
            <rect x={-130} y={-50} width={260} height={100} rx={18} fill={KC.dark} stroke={KC.ink} strokeWidth={7} />
            <text x={0} y={18} textAnchor="middle" style={{ font:`700 52px ${KF.mono}` }} fill={KC.mint}>pH 3.5</text>
          </g>
        </CapaC>
      </Escena>
      {/* 10 · planta piloto y la barra moho vs limón (sin década) */}
      <Escena T={T} a={K.Pf} b={K.Ho} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <CapaC>
          {T < pfMitad + 0.3 && <g opacity={1 - kprog(T, pfMitad, pfMitad + 0.3)}><Planta T={T} x={540} y={1100} s={1.15} /></g>}
          {T > pfMitad - 0.1 && <g opacity={kprog(T, pfMitad - 0.1, pfMitad + 0.3)}>
            {(() => { const u = kprog(T, pfMitad, K.Ho - 0.4, kEase.suave), hL = klerp(560, 60, u), hM = klerp(60, 600, u);
              return <g>
                <rect x={230} y={1260 - hL} width={240} height={hL} fill={LIMON} stroke={KC.ink} strokeWidth={8} />
                <rect x={610} y={1260 - hM} width={240} height={hM} fill={ESPORA} stroke={KC.ink} strokeWidth={8} />
                <Limon x={350} y={1340} s={0.42} />
                <ColoniaNegra T={T} x={730} y={1340} s={0.55} />
                <line x1={180} y1={1260} x2={900} y2={1260} stroke={KC.ink} strokeWidth={8} />
              </g>; })()}
          </g>}
        </CapaC>
      </Escena>
      {/* 11 · ≈99 % de microbios */}
      <Escena T={T} a={K.Ho} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:575, top:640, width:430, height:430, background:'rgba(14,15,18,.75)', borderRadius:24 }}></div>
      </Escena>
      {/* 12 · cierre: la gomita del inicio, ya con su etiqueta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaC>
          <Gomita x={380} y={1060} s={1} rot={-8} brillo={0.6 + 0.4 * Math.sin(T * 4)} />
          <ColoniaNegra T={T} x={790} y={1180} s={0.95} />
        </CapaC>
      </Escena>

      {/* piezas fuera de las escenas */}
      {T > K.Ce - 0.3 && T < K.Ta + 0.4 && <Lupa T={T} at={K.Ce + 1.4} until={K.Ta - 0.2} x={760} y={620} r={190} fx={600} fy={1000} tinte={KC.yellow}
        etiqueta="AL MICROSCOPIO · Aspergillus negros" interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1a1410" />
          <Conidioforo T={t} x={r * 0.62} y={r * 2.1} s={0.42} alto={520} cadenas={1} n={5} seed={4} />
          <Conidioforo T={t} x={r * 1.4} y={r * 2.2} s={0.36} alto={560} cadenas={1} n={5} seed={7} />
        </svg>} />}
      {T > K.Ho - 0.2 && T < K.Ci + 0.3 && <Cuadricula T={T} cols={10} filas={10} llenado={(t) => kprog(t, K.Ho + 0.8, K.Ho + 3.0)} tramos={[{ desde: 0.99, hasta: 1, color: KC.yellow }]} lleno="#4a3a2c" x={590} y={655} ancho={400} alto={400} />}
      {((T > K.Mo + 0.5 && T < K.Ce - 0.1)) && <Escala T={T} z={1} pxPorMm={1300} x={60} y={1430} color={KC.ink} />}

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.6} until={K.An - 0.3} texto="¿de limón?" x={300} y={470} tam={52} />
      <Chip T={T} at={K.An + 0.4} until={K.Mo - 0.2} texto="limones de Italia" y={1490} tam={44} borde={KC.red} />
      <Etiqueta T={T} at={K.G + 2.8} until={K.An - 0.3} x={640} y={1480} texto="moho negro" lado="izq" tam={36} color={KC.ink} />
      <Etiqueta T={T} at={K.Mo + 1.0} until={K.Ce - 0.2} x={540} y={850} texto="moho negro" tam={34} color={KC.ink} />
      <Etiqueta T={T} at={K.Mo + 1.4} until={K.Ce - 0.2} x={540} y={905} texto="Aspergillus niger" it tam={34} color={KC.ink} />
      <Etiqueta T={T} at={K.Mo + 2.0} until={K.Ce - 0.2} x={290} y={1210} texto="esporas pardo-negras" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ce + 2.0} until={K.Ta - 0.2} texto="él o un primo muy cercano" y={1490} tam={40} borde={ESPORA} />
      <Chip T={T} at={K.Ta + 0.4} until={K.Pr - 0.2} texto="agua + mucha azúcar" y={1490} tam={44} borde={KC.white} />
      <Etiqueta T={T} at={K.Ta + 1.6} until={K.Pr - 0.2} x={820} y={1300} texto="bolitas de moho" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Kr + 0.2} until={K.Mn - 0.2} texto="POR DENTRO · una hifa" y={470} tam={38} borde={KC.mint} mono />
      <Etiqueta T={T} at={K.Kr + 1.6} until={K.Mn - 0.2} x={760} y={1215} texto="mitocondria: ciclo de Krebs" lado="izq" tam={30} color="#ffb199" />
      <Etiqueta T={T} at={K.Kr + 2.0} until={K.Bo - 0.2} x={700} y={760} texto="citrato" lado="izq" tam={34} color={CITRATO} />
      <Chip T={T} at={K.Bo + 0.1} until={K.Cu - 0.3} texto="bomba de salida (CexA)" y={470} tam={38} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Cu + 0.2} until={K.Cu + 3.2} anio="1917" quien="James Currie" revista="J. Biol. Chem. · ~20 cepas" x={420} y={560} />
      <Chip T={T} at={K.Cu + 3.4} until={K.Pf - 0.2} texto="agua azucarada y muy ácida" y={470} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Pf + 0.3} until={pfMitad - 0.1} texto="1919 · planta piloto" y={470} tam={46} borde={KC.gold} />
      <Chip T={T} at={pfMitad + 0.2} until={K.Ho - 0.2} texto="con los años: moho vs. limón" y={470} tam={40} borde={ESPORA} />
      <NumeroGigante T={T} at={K.Ho + 0.3} until={K.Ci - 0.2} valor={99} dur={2.4} prefijo="≈" sufijo=" %" x={790} y={480} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.Ho + 1.4} until={K.Ci - 0.2} texto="microbios (sobre todo moho)" x={790} y={1140} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ho + 2.0} until={K.Ci - 0.2} texto="revisión de 2010" y={1490} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="hecho por un moho" x={380} y={1470} tam={44} borde={ESPORA} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.An - 0.1} texto="No salió de un limón: *de un moho.*" />
      <Subtitulo T={T} idx={1} at={K.An + 0.1} until={K.Mo - 0.1} texto="Antes: *limones de Italia.*" />
      <Subtitulo T={T} idx={2} at={K.Mo + 0.1} until={K.Ce - 0.1} texto="*Aspergillus niger*, un moho negro." />
      <Subtitulo T={T} idx={3} at={K.Ce + 0.1} until={K.Ta - 0.1} texto="Él o *un primo muy cercano.*" />
      <Subtitulo T={T} idx={4} at={K.Ta + 0.1} until={K.Pr - 0.1} texto="Agua con *mucha azúcar.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Kr - 0.1} texto="¿Por qué *regalaría su ácido?*" />
      <Subtitulo T={T} idx={6} at={K.Kr + 0.1} until={K.Mn - 0.1} texto="Cada célula *arma citrato.*" />
      <Subtitulo T={T} idx={7} at={K.Mn + 0.1} until={K.Bo - 0.1} texto="Sin manganeso: *se amontona.*" />
      <Subtitulo T={T} idx={8} at={K.Bo + 0.1} until={K.Cu - 0.1} texto="Una *bomba* lo saca." />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Pf - 0.1} texto="1917: *todas sus cepas.*" />
      <Subtitulo T={T} idx={10} at={K.Pf + 0.1} until={K.Ho - 0.1} texto="Con los años, *ganó el moho.*" />
      <Subtitulo T={T} idx={11} at={K.Ho + 0.1} until={K.Ci - 0.1} texto="Cerca del *99 %*: microbios." />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No es limón: *es moho.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.An + 0.3, K.Mo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Mo + 0.8, K.Ce - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ce + 0.6, K.Ta - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Pr + 0.05, K.Kr - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [K.Kr + 0.8, K.Mn - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [K.Mn + 0.5, K.Bo - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Bo + 0.3, K.Cu - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Cu + 1.4, K.Pf - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pf + 0.8, K.Ho - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Ho + 0.8, K.Ci - 0.3, 'avatar_02_apuntando_camara', 'grande-izq'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="52" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CitricoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Citrico /></CompositionStage></div>;
}
window.CitricoApp = CitricoApp;
