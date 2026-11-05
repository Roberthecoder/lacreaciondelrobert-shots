// Shot Fungi Mati #140 · Ese champiñón no es una esponja — NARRADO (gancho 1 «Esto no es X: es Y», formato N5 + N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Se carga después de kit-robert.jsx y fungi-kit.jsx (fsvg, BarraEscala, Sello, Interrogacion, Seta).

const LV = { agua:'#5fc8ff', agua2:'#2a9be0', blanco:'#f4ece0', blanco2:'#dccdb6', cafe:'#8a5a3a', cafe2:'#5e3a22', portob:'#6e4a32',
  lamP:'#4a2c20', esponja:'#ffd83a', esponja2:'#b89400', fibra:'#2f9e44', aceite:'#f2b81c', dorado:'#b8762e', sarten:'#2b2b30', gris:'#8f877c' };

// Tazón con agua de frente. Lo que va DENTRO se pasa como children (se dibuja entre la pared de atrás y el agua de enfrente).
function Tazon({ x, y, w = 520, h = 230, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={w / 2} ry={46} fill="#e8f6ff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={6} rx={w / 2 - 18} ry={34} fill={LV.agua} opacity=".9" />
    {children}
    <path d={`M ${-w / 2 + 14} 10 Q 0 54 ${w / 2 - 14} 10 L ${w / 2 - 50} ${h} Q 0 ${h + 30} ${-w / 2 + 50} ${h} Z`} fill={LV.agua} opacity=".55" />
    <path d={`M ${-w / 2} 0 Q ${-w / 2 + 10} ${h * 0.8} ${-w / 2 + 50} ${h} Q 0 ${h + 34} ${w / 2 - 50} ${h} Q ${w / 2 - 10} ${h * 0.8} ${w / 2} 0`} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${-w / 2 + 40} 60 Q ${-w / 2 + 50} ${h * 0.7} ${-w / 2 + 90} ${h - 14}`} stroke="#fff" strokeWidth={10} fill="none" opacity=".5" strokeLinecap="round" />
  </g>;
}
// Gotitas en perla sobre la superficie (no mojan). pts relativos.
function Perlas({ x, y, s = 1, pts, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {pts.map(([a, b, r], i) => <g key={i}><circle cx={a} cy={b} r={r} fill={LV.agua} stroke={KC.ink} strokeWidth={3} opacity=".85" /><circle cx={a - r * 0.35} cy={b - r * 0.35} r={r * 0.3} fill="#fff" /></g>)}
  </g>;
}
const PERLAS = [[-70, -150, 13], [-20, -178, 10], [40, -165, 15], [85, -128, 9], [-100, -110, 8], [10, -130, 7]];
// Esponja de cocina: moja 0..1 = se hincha y se oscurece.
function Esponja({ x, y, s = 1, moja = 0 }) {
  const sy = 1 + 0.18 * moja, c = mixHex(LV.esponja, '#d9a800', moja);
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.06 * moja)} ${s * sy})`}>
    <rect x={-120} y={-130} width={240} height={130} rx={22} fill={c} stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-170} width={240} height={46} rx={14} fill={LV.fibra} stroke={KC.ink} strokeWidth={8} />
    {[[-80, -90], [-30, -60], [30, -95], [75, -55], [-60, -35], [0, -100], [90, -100], [40, -30]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={10} ry={7} fill={LV.esponja2} opacity=".7" />)}
    {moja > 0.2 && <path d="M -120 -2 Q -60 20 0 -2 Q 60 22 120 -2" stroke={LV.agua2} strokeWidth={8} fill="none" opacity={moja} />}
  </g>;
}
// Báscula de cocina: valor = texto de la pantalla.
function Bascula({ x, y, w = 420, valor = '0 g', color = '#9ff5c6' }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={120} rx={30} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={30} width={240} height={64} rx={12} fill="#1d2a24" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={76} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={color}>{valor}</text>
    <ellipse cx={0} cy={-6} rx={w / 2 - 20} ry={26} fill="#d9d2c4" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Champiñón visto desde abajo: con velo (laminillas tapadas) o abierto (laminillas expuestas).
function VistaAbajo({ x, y, r = 150, velo = 1, sombrero = LV.blanco, lam = '#c9a48a' }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={sombrero} stroke={KC.ink} strokeWidth={7} />
    <circle r={r * 0.86} fill={lam} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 36 }, (_, i) => { const a = i / 36 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * r * 0.3} y1={Math.sin(a) * r * 0.3} x2={Math.cos(a) * r * 0.84} y2={Math.sin(a) * r * 0.84} stroke="#6d4636" strokeWidth={3} />; })}
    {velo > 0 && <circle r={r * 0.86} fill="#fbf6ec" stroke={KC.ink} strokeWidth={4} opacity={velo} />}
    {velo > 0 && [0.45, 0.65].map((k, i) => <circle key={i} r={r * k} fill="none" stroke={LV.blanco2} strokeWidth={3} opacity={velo} />)}
    <circle r={r * 0.24} fill="#f6eedf" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Gota grande que cae y se queda como perla (ángulo de contacto alto). p 0..1 = caída.
function GotaPerla({ x, y, r = 70, p = 1, rebote = 0 }) {
  if (p <= 0) return null;
  const yy = y - (1 - kEase.sale(p)) * 500, sq = 1 + 0.25 * rebote;
  return <g transform={`translate(${x} ${yy}) scale(${sq} ${1 / sq})`}>
    <path d={`M ${-r} ${-r * 0.2} A ${r} ${r} 0 1 1 ${r} ${-r * 0.2} Q ${r * 0.7} ${r * 0.62} 0 ${r * 0.66} Q ${-r * 0.7} ${r * 0.62} ${-r} ${-r * 0.2} Z`} fill={LV.agua} stroke={KC.ink} strokeWidth={6} opacity=".92" />
    <ellipse cx={-r * 0.35} cy={-r * 0.5} rx={r * 0.22} ry={r * 0.14} fill="#fff" opacity=".85" />
  </g>;
}
// Piel del sombrero al microscopio: hifas tendidas (tubos con tabiques y núcleos) y encima la capa de varillitas.
function PielMicro({ T, varillas = 1, hifas = 1 }) {
  const filas = [700, 790, 880, 970, 1060];
  return <g>
    {filas.map((yy, k) => { const g = kclamp(hifas * 1.6 - k * 0.15, 0, 1); if (g <= 0) return null; const off = (k % 2) * 120;
      return <g key={k} transform={`translate(0 ${mece(T, k + 2, 0.15) * 4})`} opacity={g}>
        <rect x={-40 + off} y={yy - 34} width={1200} height={68} rx={34} fill="rgba(234,255,247,.16)" stroke="#eafff7" strokeWidth={5} />
        {Array.from({ length: 5 }, (_, i) => <line key={i} x1={160 + off + i * 230} y1={yy - 32} x2={160 + off + i * 230} y2={yy + 32} stroke="#eafff7" strokeWidth={5} />)}
        {Array.from({ length: 5 }, (_, i) => <ellipse key={'n' + i} cx={60 + off + i * 230} cy={yy} rx={18} ry={12} fill={KC.lilac} opacity=".8" />)}
      </g>; })}
    {/* capa de varillitas de hidrofobina sobre la hifa de arriba */}
    {Array.from({ length: 44 }, (_, i) => { const u = i / 44; if (u > varillas) return null; const xx = 14 + i * 24, a = (i * 37) % 50 - 25;
      return <rect key={i} x={xx} y={652 + (i % 3) * 3} width={20} height={9} rx={4.5} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} transform={`rotate(${a} ${xx + 10} 658)`} />; })}
  </g>;
}
// Sartén de lado con rebanadas; charco = 0..1 (jugo gris que se evapora), dora = 0..1.
function Sarten({ T, x, y, charco = 1, dora = 0 }) {
  const reb = [[-230, 0], [-130, 8], [-30, -4], [70, 6], [170, -2], [-180, -40], [-70, -44], [40, -42], [140, -38]];
  return <g transform={`translate(${x} ${y})`}>
    <rect x={300} y={-26} width={330} height={40} rx={20} fill={LV.sarten} stroke={KC.ink} strokeWidth={8} transform="rotate(-6 300 0)" />
    <ellipse cx={0} cy={0} rx={330} ry={86} fill="#3a3a42" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={6} rx={290} ry={66} fill="#55555e" />
    {charco > 0 && <ellipse cx={0} cy={10} rx={280 * (0.35 + 0.65 * charco)} ry={60 * (0.35 + 0.65 * charco)} fill="#9a9184" opacity={0.85 * charco} />}
    {reb.map(([a, b], i) => <g key={i} transform={`translate(${a} ${b + Math.sin(T * 9 + i) * 2 * charco})`}>
      <path d="M -42 6 Q -40 -30 0 -32 Q 40 -30 42 6 Z" fill={mixHex('#efe2cc', LV.dorado, dora)} stroke={KC.ink} strokeWidth={4} />
      <rect x={-8} y={4} width={16} height={22} rx={5} fill={mixHex('#efe2cc', LV.dorado, dora)} stroke={KC.ink} strokeWidth={4} />
    </g>)}
    <path d="M -330 0 Q -330 110 0 112 Q 330 110 330 0" fill="none" stroke={KC.ink} strokeWidth={9} />
    {charco > 0.05 && [-200, -60, 80, 210].map((a, i) => { const f = ((T * 0.7 + i * 0.27) % 1); return <path key={i} d={`M ${a} ${-50 - f * 260} q 24 -30 0 -60 q -24 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={(1 - f) * 0.7 * charco} />; })}
  </g>;
}
// Rebanada longitudinal de champiñón crudo con bolsitas de aire; aceite 0..1 = se llenan de dorado.
function Rebanada({ x, y, s = 1, aceite = 0, moja = 0 }) {
  const bolsas = [[-110, -150], [-50, -190], [20, -170], [90, -140], [-140, -95], [-70, -110], [0, -120], [70, -90], [130, -100], [-20, -60], [-10, 10], [8, 70], [-6, 130], [12, -20]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -60 C -200 -260, 200 -260, 200 -60 Q 160 -40 70 -40 L 56 200 Q 0 214 -56 200 L -70 -40 Q -160 -40 -200 -60 Z" fill={mixHex('#f3e9d6', '#cdbb9c', moja)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -186 -62 Q -120 -48 -70 -48 M 70 -48 Q 120 -48 186 -62" stroke="#a07a62" strokeWidth={10} fill="none" />
    {bolsas.map(([a, b], i) => { const k = kclamp(aceite * 1.6 - i * 0.05, 0, 1); return <ellipse key={i} cx={a} cy={b} rx={14} ry={9} fill={mixHex('#d9ccb4', LV.aceite, k)} stroke="#a89878" strokeWidth={2} />; })}
  </g>;
}
function Cuchillo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M 0 0 L 360 -10 Q 380 20 360 46 L 0 46 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-220} y={-4} width={230} height={58} rx={18} fill="#3b2a20" stroke={KC.ink} strokeWidth={7} />
    {[-170, -110, -50].map((a) => <circle key={a} cx={a} cy={25} r={7} fill="#cfc6b6" />)}
  </g>;
}
// Llave de agua con chorro (abre 0..1).
function Llave({ T, x, y, abre = 1, largo = 420 }) {
  return <g transform={`translate(${x} ${y})`}>
    {abre > 0 && <rect x={-22 + Math.sin(T * 30) * 2} y={60} width={44} height={largo * abre} rx={20} fill={LV.agua} opacity=".8" stroke={LV.agua2} strokeWidth={4} />}
    <rect x={-300} y={-60} width={260} height={56} rx={18} fill="#c9d3dc" stroke={KC.ink} strokeWidth={8} />
    <path d="M -60 -60 Q 40 -60 40 20 L 40 64 L -40 64 L -40 30 Q -40 0 -60 0 Z" fill="#c9d3dc" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-170} y={-120} width={70} height={64} rx={12} fill="#e8eef4" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Jabon({ x, y, tache = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-50} width={180} height={100} rx={36} fill="#ffb3d1" stroke={KC.ink} strokeWidth={7} />
    {[[-40, -70, 18], [10, -88, 12], [50, -66, 15]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity=".85" />)}
    {tache > 0 && <path d="M -110 -110 L 110 70 M 110 -110 L -110 70" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={tache} />}
  </g>;
}
function Trapo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -150 -70 Q -40 -100 150 -70 Q 170 0 150 70 Q 20 100 -150 70 Q -170 0 -150 -70 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {[-90, -30, 30, 90].map((a) => <line key={a} x1={a} y1={-80} x2={a + 6} y2={80} stroke={KC.cyan} strokeWidth={14} />)}
  </g>;
}
// Champiñón cerrado con nivel de agua por dentro (nivel 0..1) y un "impermeable" brillante (capa 0..1).
function ChampLleno({ x, y, s = 1, nivel = 0, capa = 0, T = 0 }) {
  const id = 'lvClip' + Math.round(x) + Math.round(y);
  const cap = 'M -150 -150 C -150 -330, 150 -330, 150 -150 Q 0 -128 -150 -150 Z', pie = 'M -34 0 C -30 -60, -28 -110, -28 -150 L 28 -150 C 28 -110, 30 -60, 34 0 Z';
  const yN = klerp(10, -300, nivel);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><path d={cap} /><path d={pie} /></clipPath></defs>
    <path d={pie} fill="#f6eedf" stroke={KC.ink} strokeWidth={7} />
    <path d={cap} fill={LV.blanco} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {nivel > 0 && <g clipPath={`url(#${id})`}>
      <path d={`M -200 ${yN} Q -100 ${yN - 10 * Math.sin(T * 4)} 0 ${yN} T 200 ${yN} L 200 40 L -200 40 Z`} fill={LV.agua} opacity=".6" />
    </g>}
    <path d={cap} fill="none" stroke={KC.ink} strokeWidth={7} /><path d={pie} fill="none" stroke={KC.ink} strokeWidth={7} />
    {capa > 0 && <g opacity={capa}>
      <path d="M -168 -146 C -168 -350, 168 -350, 168 -146" fill="none" stroke={KC.cyan} strokeWidth={14} strokeLinecap="round" style={{ filter:`drop-shadow(0 0 10px ${KC.cyan})` }} />
      <path d="M -110 -270 Q -40 -312 40 -300" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".8" />
    </g>}
  </g>;
}

function LavarShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Mito, E: CUES.Estudio, Ce: CUES.Cerrados, Ex: CUES.Expuestas, P: CUES.Pregunta, H: CUES.Hidrofobina, L: CUES.Lleno, S: CUES.Sarten, A: CUES.Aceite, R: CUES.Rebanado, Co: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G + 0.05, K.G + 0.55, (p) => p * p);         // el champiñón cae al agua (antes de 1 s)
  const flota = T > K.G + 0.55 ? Math.sin((T - K.G) * 3) * 6 * Math.exp(-(T - K.G - 0.55) * 0.6) : 0;
  const champY = klerp(260, 850, caida) + flota;
  const moja = kprog(T, K.G + 0.6, K.G + 3.2, kEase.suave);
  const pesoBlanco = Math.round(250 + 1 * kprog(T, K.Ce + 0.8, K.Ce + 2.2));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el champiñón cae al tazón; la esponja sí se empapa */}
      <Escena T={T} a={K.G} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Tazon x={340} y={880} w={520}>
            <g transform={`translate(0 ${champY - 880})`}><Champinon x={0} y={40} s={0.9} crece={1} abre={0.1} rot={Math.sin(T * 2) * 3} /></g>
            {caida >= 1 && T < K.G + 1.4 && <g opacity={1 - kprog(T, K.G + 0.6, K.G + 1.4)}>
              <ellipse cx={0} cy={6} rx={60 + 200 * kprog(T, K.G + 0.55, K.G + 1.4)} ry={14 + 30 * kprog(T, K.G + 0.55, K.G + 1.4)} fill="none" stroke="#fff" strokeWidth={6} />
              {[-1, -0.4, 0.3, 0.9].map((d, i) => { const u = kprog(T, K.G + 0.55, K.G + 1.2); return <circle key={i} cx={d * 160 * u} cy={-200 * Math.sin(u * Math.PI) * (0.6 + i * 0.12)} r={10} fill={LV.agua} stroke={KC.ink} strokeWidth={3} />; })}
            </g>}
          </Tazon>
          <Perlas x={340} y={champY + 40} s={0.9} pts={PERLAS} o={kprog(T, K.G + 1.0, K.G + 1.6)} />
          <Esponja x={830} y={1080} s={0.85} moja={moja} />
        </>)}
      </Escena>
      {/* 2 · mito */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Champinon x={300} y={1100} s={1.1} crece={1} abre={0.1} />
          <Sello T={T} at={K.M + 0.7} x={760} y={1000} texto="MITO" color={KC.red} r={120} />
        </>)}
      </Escena>
      {/* 3 · la prueba publicada en 2018: pesar antes y después de 1 min en agua */}
      <Escena T={T} a={K.E} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bascula x={540} y={900} valor={T < K.E + 3.4 ? '250 g' : '¿después?'} />
          {[[-140, 0, LV.blanco, 0.1], [-60, -10, LV.cafe, 0.1], [20, 0, LV.portob, 1], [100, -6, '#9a6a44', 0.9]].map(([dx, dy, c, ab], i) =>
            <Champinon key={i} x={540 + dx} y={892 + dy} s={0.42} crece={kprog(T, K.E + 2.4 + i * 0.15, K.E + 2.9 + i * 0.15)} abre={ab} sombrero={c} />)}
          {/* seis tipos de hongos probados (íconos) */}
          {[LV.blanco, LV.cafe, LV.portob, '#8a5a3a', '#c9c3b6', '#a7895e'].map((c, i) => { const on = kprog(T, K.E + 4.0 + i * 0.1, K.E + 4.3 + i * 0.1, kEase.rebote);
            return on > 0 ? <g key={i} transform={`translate(${150 + i * 156} 1150) scale(${on})`}><circle r={46} fill={c} stroke={KC.ink} strokeWidth={6} /></g> : null; })}
        </>)}
      </Escena>
      {/* 4 · laminillas tapadas: casi nada de agua */}
      <Escena T={T} a={K.Ce} b={K.Ex} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Bascula x={330} y={960} w={460} valor={`${pesoBlanco} g`} />
          <Champinon x={330} y={954} s={1.05} crece={1} abre={0.1} />
          <Perlas x={330} y={970} s={1.05} pts={PERLAS} />
          <VistaAbajo x={790} y={830} r={150} velo={1} />
          <path d="M 650 900 Q 560 900 480 860" stroke={KC.ink} strokeWidth={5} fill="none" strokeDasharray="12 10" />
        </>)}
      </Escena>
      {/* 5 · laminillas expuestas: hasta 25 % de su peso */}
      <Escena T={T} a={K.Ex} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Champinon x={290} y={1060} s={1.2} crece={1} abre={1} sombrero={LV.portob} sombra="#4e3222" lam={LV.lamP} pie="#efe3cf" />
          <Seta x={790} y={1060} s={2.1} crece={1} sombrero={LV.cafe2} pie="#f1e6d0" escamas={false} anillo={false} alto={120} ancho={170} laminas="#fbf3e2" />
          {Array.from({ length: 14 }, (_, i) => { const f = ((T - K.Ex) * 0.9 + i * 0.13) % 1, xx = (i % 2 ? 790 : 290) + ((i * 53) % 160) - 80;
            return T > K.Ex + 0.3 ? <circle key={i} cx={xx} cy={klerp(560, i % 2 ? 900 : 940, f)} r={11} fill={LV.agua} stroke={KC.ink} strokeWidth={3} opacity={1 - f * 0.6} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué repele el agua? */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Champinon x={330} y={1150} s={1.5} crece={1} abre={0.1} />
          <GotaPerla x={330} y={785} r={70} p={kprog(T, K.P + 0.1, K.P + 0.6)} rebote={Math.max(0, Math.sin((T - K.P - 0.6) * 14)) * Math.exp(-(T - K.P - 0.6) * 3) * (T > K.P + 0.6 ? 1 : 0)} />
          <Interrogacion T={T} x={300} y={640} tam={280} />
        </>)}
      </Escena>
      {/* 7 · al microscopio: hifas de la piel y capa de varillitas de hidrofobina (fondo oscuro) */}
      <Escena T={T} a={K.H} b={K.L} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <PielMicro T={T} hifas={kprog(T, K.H, K.H + 1.2)} varillas={kprog(T, K.H + 1.4, K.H + 3.2)} />
          <GotaPerla x={560} y={590} r={84} p={kprog(T, K.H + 3.4, K.H + 3.9)} rebote={T > K.H + 3.9 ? Math.max(0, Math.sin((T - K.H - 3.9) * 14)) * Math.exp(-(T - K.H - 3.9) * 3) : 0} />
        </>)}
      </Escena>
      {/* 8 · casi 92 % del champiñón es agua */}
      <Escena T={T} a={K.L} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<ChampLleno T={T} x={540} y={1120} s={1.2} nivel={0.92 * kprog(T, K.L + 0.4, K.L + 2.6, kEase.suave)} />)}
      </Escena>
      {/* 9 · la sartén: el agua frena el dorado hasta que se evapora */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Sarten T={T} x={420} y={1000} charco={1 - kprog(T, K.S + 0.6, K.S + 3.6)} dora={kprog(T, K.S + 3.8, K.S + 5.4)} />)}
        <Termometro x={930} y={470} alto={420} max={160} marcas={[0, 100, 150]} valor={T < K.S + 3.6 ? klerp(20, 100, kprog(T, K.S, K.S + 0.8)) : klerp(100, 150, kprog(T, K.S + 3.6, K.S + 5.2))} />
      </Escena>
      {/* 10 · esponja… de aceite: bolsitas de aire de la carne cruda */}
      <Escena T={T} a={K.A} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Rebanada x={330} y={930} s={1.3} aceite={kprog(T, K.A + 1.2, K.A + 3.4)} />
          {Array.from({ length: 5 }, (_, i) => { const f = kprog(T, K.A + 0.8 + i * 0.35, K.A + 1.4 + i * 0.35); return f > 0 && f < 1 ? <circle key={i} cx={240 + i * 45} cy={klerp(460, 700, f)} r={16} fill={LV.aceite} stroke={KC.ink} strokeWidth={4} /> : null; })}
        </>)}
      </Escena>
      {/* 11 · ya rebanado sí absorbe: primero lávalo, luego rebánalo */}
      <Escena T={T} a={K.R} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rebanada x={330} y={960} s={1.2} moja={kprog(T, K.R + 1.0, K.R + 2.6)} />
          <Cuchillo x={klerp(900, 560, kprog(T, K.R, K.R + 0.7, kEase.sale))} y={720} rot={-8} />
          {Array.from({ length: 8 }, (_, i) => { const f = ((T - K.R) * 1.2 + i * 0.125) % 1; return T > K.R + 0.8 ? <circle key={i} cx={210 + (i * 41) % 250} cy={klerp(560, 900, f)} r={10} fill={LV.agua} stroke={KC.ink} strokeWidth={3} opacity={1 - f} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · consejo: entero, bajo el chorro, sin jabón, y secarlo */}
      <Escena T={T} a={K.Co} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Llave T={T} x={360} y={560} abre={kprog(T, K.Co, K.Co + 0.4)} largo={T < K.Co + 3.0 ? 420 : 420 * (1 - kprog(T, K.Co + 3.0, K.Co + 3.3))} />
          <Champinon x={360} y={1100} s={0.95} crece={1} abre={0.1} rot={Math.sin(T * 6) * 4} />
          <Perlas x={360} y={1110} s={0.95} pts={PERLAS} o={kprog(T, K.Co + 0.5, K.Co + 1.0) * (1 - kprog(T, K.Co + 3.2, K.Co + 3.7))} />
          <Jabon x={830} y={1050} tache={kprog(T, K.Co + 1.6, K.Co + 2.0)} />
          {T > K.Co + 3.0 && <Trapo x={klerp(800, 420, kprog(T, K.Co + 3.0, K.Co + 3.5, kEase.sale))} y={980 + Math.sin(T * 10) * 8} rot={-10} />}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo tazón del inicio, ahora con su impermeable y el 92 % por dentro */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Tazon x={340} y={880} w={520}>
            <ChampLleno T={T} x={0} y={0} s={0.62} nivel={0.92} capa={kprog(T, K.C + 0.8, K.C + 1.6)} />
          </Tazon>
          <Esponja x={830} y={1080} s={0.85} moja={1} />
        </>)}
      </Escena>

      {/* textos */}
      <Cronometro T={T} at={K.G + 0.6} until={K.M - 0.3} factor={16} x={300} y={420} etiqueta="BAJO EL AGUA" />
      <Etq T={T} at={K.G + 1.6} until={K.M - 0.3} x={60} y={545} texto="champiñón: casi nada" tam={32} color={KC.texto} />
      <Etq T={T} at={K.G + 2.4} until={K.M - 0.3} x={60} y={600} texto="esponja: se empapa" tam={32} color={KC.texto} />
      <MitoTachado T={T} at={K.M + 0.1} tacharEn={K.M + 0.8} until={K.E - 0.3} texto="«no lo laves, se empapa»" x={440} y={730} tam={46} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 3.6} anio="2018" quien="America's Test Kitchen (EE. UU.)" revista="prueba publicada en 2018" x={540} y={620} />
      <Chip T={T} at={K.E + 3.6} until={K.Ce - 0.3} texto="pesar · 1 min en agua · pesar" x={540} y={520} tam={38} borde={KC.ink} />
      <Cronometro T={T} at={K.E + 3.8} until={K.Ce - 0.3} factor={33} x={540} y={680} etiqueta="SUMERGIDOS" />
      <Etq T={T} at={K.E + 4.4} until={K.Ce - 0.3} x={60} y={1070} texto="6 tipos de hongos" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Ce + 0.3} until={K.Ex - 0.3} texto="laminillas tapadas" x={330} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ce + 0.8} until={K.Ex - 0.3} x={60} y={590} texto="champiñón blanco" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Ce + 1.1} until={K.Ex - 0.3} x={60} y={640} texto="Agaricus bisporus" it tam={32} color={KC.texto} />
      <Etq T={T} at={K.Ce + 1.5} until={K.Ex - 0.3} x={660} y={1020} texto="el velo las tapa" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Ce + 2.2} until={K.Ex - 0.3} texto="casi nada de agua" x={790} y={1110} tam={40} borde={KC.mint} />
      <NumeroGigante T={T} at={K.Ex + 1.6} until={K.P - 0.3} valor={25} dur={1.0} prefijo="hasta " sufijo=" %" etiqueta="de su peso en agua" x={540} y={450} tam={150} color={KC.cyan} />
      <Etq T={T} at={K.Ex + 0.4} until={K.P - 0.3} x={30} y={1110} texto="portobello" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Ex + 0.6} until={K.P - 0.3} x={30} y={1150} texto="Agaricus bisporus" it tam={26} color={KC.texto} />
      <Etq T={T} at={K.Ex + 0.8} until={K.P - 0.3} x={600} y={1110} texto="shiitake" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Ex + 1.0} until={K.P - 0.3} x={600} y={1150} texto="Lentinula edodes" it tam={26} color={KC.texto} />
      <Chip T={T} at={K.Ex + 0.2} until={K.Ex + 1.5} texto="laminillas expuestas" x={540} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.H + 0.1} until={K.L - 0.3} texto="AL MICROSCOPIO · LA PIEL DEL SOMBRERO" x={540} y={440} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.H + 0.9} until={K.L - 0.3} x={60} y={1130} texto="hifas" tam={32} color={KC.texto} />
      <Etq T={T} at={K.H + 2.0} until={K.L - 0.3} x={60} y={520} texto="hidrofobina: capa de varillitas" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.H + 4.2} until={K.L - 0.3} texto="la gota no moja" x={840} y={590} tam={36} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.L + 0.4} until={K.S - 0.3} valor={92} dur={2.2} prefijo="≈ " sufijo=" %" etiqueta="del champiñón es agua" x={400} y={480} tam={130} color={KC.cyan} />
      <Chip T={T} at={K.L + 2.4} until={K.S - 0.3} texto="USDA: 91.8 g por cada 100 g (2021)" x={540} y={650} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.S + 0.3} until={K.S + 3.6} texto="con agua: se queda en 100 °C" x={420} y={520} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.S + 3.8} until={K.A - 0.3} texto="sin agua: sube y se dora" x={420} y={520} tam={36} borde={LV.dorado} />
      <Chip T={T} at={K.A + 0.2} until={K.R - 0.3} texto="POR DENTRO · CARNE CRUDA" x={330} y={430} tam={30} borde={KC.ink} mono />
      <Etq T={T} at={K.A + 1.0} until={K.R - 0.3} x={600} y={880} texto="bolsitas de aire" tam={30} color={KC.texto} />
      <Chip T={T} at={K.A + 2.6} until={K.R - 0.3} texto="esponja… de aceite" x={330} y={560} tam={38} borde={LV.aceite} />
      <Chip T={T} at={K.R + 1.2} until={K.Co - 0.3} texto="primero lávalo, luego rebánalo" x={540} y={480} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Co + 0.6} until={K.C - 0.3} texto="agua corriente · sin jabón · trapo limpio" x={540} y={1430} tam={28} borde={KC.ink} mono />
      <Etq T={T} at={K.Co + 1.2} until={K.C - 0.3} x={60} y={1500} texto="FDA: consejo para frutas y verduras en general" tam={22} color={KC.texto} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="impermeable + ≈ 92 % agua" x={400} y={520} tam={38} borde={KC.cyan} />

      {/* barras de escala (el dibujo es esquemático) */}
      <BarraEscala T={T} at={K.G} until={K.M} texto="2 cm" largo={120} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.M} until={K.E} texto="2 cm" largo={150} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.E} until={K.Ce} texto="5 cm" largo={110} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.Ce} until={K.Ex} texto="2 cm" largo={140} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.Ex} until={K.P} texto="5 cm" largo={190} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.P} until={K.H} texto="2 cm" largo={200} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.H} until={K.L} texto="esquemático (sin escala)" largo={0} y={1600} />
      <BarraEscala T={T} at={K.L} until={K.S} texto="2 cm" largo={180} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.S} until={K.A} texto="10 cm" largo={200} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.A} until={K.R} texto="2 cm" largo={170} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.R} until={K.Co} texto="2 cm" largo={160} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.Co} until={K.C} texto="2 cm" largo={120} y={1600} color={KC.texto} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={120} y={1600} color={KC.texto} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="No es esponja: *casi no absorbe.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.E - 0.1} texto="Mito: *no lo laves.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Ce - 0.1} texto="Pesar hongos *antes y después.*" />
      <Subtitulo T={T} idx={3} at={K.Ce + 0.1} until={K.Ex - 0.1} texto="Laminillas tapadas: *casi nada.*" />
      <Subtitulo T={T} idx={4} at={K.Ex + 0.1} until={K.P - 0.1} texto="Laminillas expuestas: *hasta 25 %.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Por qué *repele el agua?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.L - 0.1} texto="*Hidrofobina:* ayuda a rechazar el agua." />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.S - 0.1} texto="Casi *92 %* del champiñón es agua." />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.A - 0.1} texto="El agua en la sartén *frena el dorado.*" />
      <Subtitulo T={T} idx={9} at={K.A + 0.1} until={K.R - 0.1} texto="Esponja, sí… *de aceite.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.Co - 0.1} texto="Rebanado *sí absorbe agua.*" />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.C - 0.1} texto="Bajo el chorro, *sin jabón,* y sécalo." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un *impermeable* relleno de agua." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.M + 0.1, K.E - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ce + 0.6, K.Ex - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.H - 0.1, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.L + 0.3, K.S - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A + 0.3, K.R - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Co + 0.3, K.C - 0.1, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="140" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LavarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LavarShot /></CompositionStage></div>;
}
window.LavarApp = LavarApp;
window.MiApp = LavarApp;
