// Shot Biotecnológico #16 · La vacuna de ARNm: tu brazo fabrica la pieza — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos y no están a escala entre sí.
const PIEL = '#f1b48f', PIEL2 = '#d98f6b', MEMB = '#ff9fbf', ARN = '#ffd43b', ESP = '#ff5a4f', INMUNE = '#b18cff', ANTI = '#4dd4ff', PSI = '#E8A62A';
const BASES = { A: '#2fe0a8', U: '#ff8a1f', G: '#4dd4ff', C: '#ff2d78', 'Ψ': '#E8A62A' };

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- el brazo (parte alta, con la manga arremangada) ----------
   origen = hombro; punto de la inyección en (60, 90) local (músculo deltoides). */
function Brazo({ x, y, s = 1, curita = 0, brillo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -40 Q -250 -190 -40 -225 Q 170 -250 235 -90 Q 275 30 245 210 L 215 1200 L -175 1200 L -205 210 Q -235 90 -230 -40 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -150 -40 Q -60 -150 120 -110 Q 200 -40 190 110 Q 120 230 -30 230 Q -150 200 -150 -40 Z" fill={PIEL2} opacity={0.35} />
    <path d="M 175 380 Q 150 560 160 760" stroke={PIEL2} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
    {/* manga */}
    <path d="M -262 -30 Q -250 -270 0 -285 Q 250 -275 272 -70 Q 140 -120 0 -118 Q -140 -110 -262 -30 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={10} />
    <path d="M -262 -30 Q -140 -110 0 -118 Q 140 -120 272 -70 L 268 -40 Q 140 -88 0 -86 Q -140 -80 -258 0 Z" fill="#ffd1e1" stroke={KC.ink} strokeWidth={6} />
    {brillo > 0 && <circle cx={60} cy={90} r={200 + Math.sin(T * 3) * 12} fill="none" stroke={KC.gold2} strokeWidth={10} opacity={brillo * 0.5} strokeDasharray="4 22" strokeLinecap="round" />}
    {curita > 0 && <g transform={`translate(60 90) rotate(-20) scale(${curita})`}>
      <rect x={-80} y={-28} width={160} height={56} rx={26} fill="#f2c99a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-30} y={-22} width={60} height={44} rx={8} fill="#fbe3c4" stroke={KC.ink} strokeWidth={3} />
      {[-58, -46, 46, 58].map((k) => <circle key={k} cx={k} cy={0} r={3} fill="#c59a6a" />)}
    </g>}
  </g>;
}
/* ---------- jeringa: la punta de la aguja en (0,0), el cuerpo hacia +x ---------- */
function Jeringa({ x, y, rot = -12, emb = 0, o = 1 }) {
  const liq = 260 * (1 - emb);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <line x1={0} y1={0} x2={150} y2={0} stroke="#cfd6dd" strokeWidth={9} strokeLinecap="round" />
    <line x1={0} y1={0} x2={150} y2={0} stroke={KC.ink} strokeWidth={2} />
    <rect x={146} y={-20} width={36} height={40} rx={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <rect x={180} y={-40} width={290} height={80} rx={12} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
    <rect x={186 + (260 - liq) * 0} y={-32} width={liq} height={64} rx={8} fill="#fff4b0" opacity={0.95} />
    {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={220 + i * 44} y1={-40} x2={220 + i * 44} y2={-20} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={186 + liq} y={-36} width={18} height={72} rx={4} fill="#3a3a3a" />
    <rect x={204 + liq} y={-9} width={300 - liq * 0.2} height={18} fill="#e8e8e8" stroke={KC.ink} strokeWidth={5} />
    <rect x={470} y={-56} width={18} height={112} rx={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <rect x={500 + liq * 0.8} y={-44} width={20} height={88} rx={6} fill="#e8e8e8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
/* ---------- ARN mensajero: hebra ondulada con sus bases de colores ---------- */
function HebraARN({ T, x = 0, y = 0, largo = 600, n = 24, amp = 14, p = 1, o = 1, grosor = 8, seed = 3, rot = 0, partido = 0 }) {
  const R = krng(seed), letras = Array.from({ length: n }, () => 'AUGC'[Math.floor(R() * 4)]);
  const paso = largo / n, vis = Math.floor(n * p);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {Array.from({ length: vis }, (_, i) => {
      const x0 = i * paso, gap = partido > 0 && i % 4 === 3 ? partido * 26 : 0;
      const dx = partido * (Math.floor(i / 4) - n / 8) * 26, dy = partido * Math.sin(i * 1.7) * 40;
      const yy = (k) => Math.sin((k / paso) * 0.9 + T * 2.2) * amp;
      return <g key={i} transform={`translate(${dx} ${dy})`} opacity={1 - partido * 0.9 * ((i * 37) % 10) / 10}>
        <line x1={x0} y1={yy(x0)} x2={x0 + paso - gap} y2={yy(x0 + paso)} stroke="#f6f3ec" strokeWidth={grosor} strokeLinecap="round" />
        <line x1={x0 + paso / 2} y1={yy(x0 + paso / 2)} x2={x0 + paso / 2} y2={yy(x0 + paso / 2) + 26} stroke={BASES[letras[i]]} strokeWidth={grosor + 2} strokeLinecap="round" />
      </g>;
    })}
  </g>;
}
/* ---------- nanopartícula de lípidos: cáscara de lípidos (cabeza + colitas) con el ARNm adentro ---------- */
function Nanoparticula({ T, x, y, r = 80, abre = 0, rot = 0, seed = 1 }) {
  const n = Math.round(r / 5);
  return <g transform={`translate(${x} ${y}) rotate(${rot + T * 8})`}>
    <circle r={r} fill="rgba(255,225,26,.08)" />
    <g transform={`scale(${r / 80})`}><HebraARN T={T} x={-48} y={-14} largo={96} n={6} amp={10} grosor={5} seed={seed} />
      <HebraARN T={T + 1} x={-40} y={20} largo={80} n={5} amp={8} grosor={5} seed={seed + 4} /></g>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2, fuera = abre * (i % 3 === 0 ? 40 : 18);
      const cx = Math.cos(a) * (r + fuera), cy = Math.sin(a) * (r + fuera), ix = Math.cos(a) * (r - 22 + fuera), iy = Math.sin(a) * (r - 22 + fuera);
      return <g key={i} opacity={1 - abre * 0.85}>
        <line x1={cx} y1={cy} x2={ix + Math.sin(a) * 4} y2={iy - Math.cos(a) * 4} stroke="#ffe7a8" strokeWidth={3} />
        <line x1={cx} y1={cy} x2={ix - Math.sin(a) * 4} y2={iy + Math.cos(a) * 4} stroke="#ffe7a8" strokeWidth={3} />
        <circle cx={cx} cy={cy} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={2.5} />
      </g>;
    })}
  </g>;
}
/* ---------- ribosoma: subunidad grande + chica ---------- */
function Ribosoma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-34} rx={64} ry={46} fill="#b78cff" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={22} rx={50} ry={30} fill="#8e6bd6" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
/* ---------- proteína espícula: trímero (tallo + cabeza de tres lóbulos) ---------- */
function Espicula({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -10 0 L -14 -70 L 14 -70 L 10 0 Z" fill="#c43c35" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-24} cy={-100} rx={26} ry={38} fill={ESP} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={24} cy={-100} rx={26} ry={38} fill={ESP} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-118} rx={28} ry={36} fill="#ff7a6e" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Anticuerpo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 40 L 0 0 L -26 -34 M 0 0 L 26 -34" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" fill="none" />
    <path d="M 0 40 L 0 0 L -26 -34 M 0 0 L 26 -34" stroke={ANTI} strokeWidth={9} strokeLinecap="round" fill="none" />
  </g>;
}
/* ---------- célula del sistema inmune: borde que se mueve ---------- */
function CelulaInmune({ T, x, y, r = 140, color = INMUNE, brazos = 0, seed = 2 }) {
  const n = 48, pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, rr = r * (1 + 0.06 * Math.sin(a * 5 + T * 2 + seed) + brazos * 0.45 * Math.pow(Math.max(0, Math.sin(a * 3 + seed)), 6));
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
  return <g transform={`translate(${x} ${y})`}>
    <path d={'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z'} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={-r * 0.12} cy={r * 0.05} rx={r * 0.42} ry={r * 0.34} fill="rgba(43,15,99,.55)" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Sirena({ T, x, y, on = 1 }) {
  const w = on > 0.02 ? (T * 1.6) % 1 : 0;
  return <g transform={`translate(${x} ${y})`}>
    {on > 0.02 && [0, 0.33, 0.66].map((k) => { const u = (w + k) % 1; return <circle key={k} cx={0} cy={-40} r={60 + u * 160} fill="none" stroke={KC.red} strokeWidth={10} opacity={(1 - u) * on} />; })}
    <rect x={-80} y={0} width={160} height={30} rx={6} fill="#333" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 0 L -60 -50 Q 0 -120 60 -50 L 60 0 Z" fill={mixHex('#6b6b6b', '#ff3b2f', on)} stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 -50 Q -20 -80 0 -86" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.3 + 0.6 * on} />
  </g>;
}
/* ---------- letras del ARN en cajitas (A U G C · Ψ) ---------- */
function Letras({ T, x, y, letras, cambia = [], p = 0, tam = 74 }) {
  return <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={tam * 0.75} x2={letras.length * tam} y2={tam * 0.75} stroke="#f6f3ec" strokeWidth={10} strokeLinecap="round" />
    {letras.map((l, i) => {
      const k = cambia.indexOf(i), giro = k >= 0 ? kprog(p, k / Math.max(cambia.length, 1), (k + 1) / Math.max(cambia.length, 1)) : 0;
      const L = giro > 0.5 ? 'Ψ' : l, sx = Math.abs(Math.cos(giro * Math.PI));
      return <g key={i} transform={`translate(${i * tam + tam / 2} ${Math.sin(T * 2 + i) * 4})`}>
        <g transform={`scale(${sx || 0.02} 1)`}>
          <rect x={-tam * 0.42} y={-tam * 0.45} width={tam * 0.84} height={tam * 0.9} rx={12} fill={BASES[L]} stroke={KC.ink} strokeWidth={6} />
          <text x={0} y={tam * 0.22} textAnchor="middle" style={{ font:`700 ${tam * 0.6}px ${KF.mono}` }} fill={KC.ink}>{L}</text>
        </g>
        {giro >= 1 && <circle cx={0} cy={0} r={tam * 0.6 + Math.sin(T * 6 + i) * 4} fill="none" stroke={KC.gold2} strokeWidth={4} opacity={0.7} />}
      </g>;
    })}
  </g>;
}
function Medalla({ T, x, y, r = 220, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 3})`}>
    <path d="M -90 -r L -150 -380 L -40 -380 L 20 -230 Z".replace(/r/g, String(r - 10))} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <path d={`M -90 ${-r + 10} L -150 -380 L -40 -380 L 20 -230 Z`} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <path d={`M 90 ${-r + 10} L 150 -380 L 40 -380 L -20 -230 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <circle r={r} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={r - 28} fill={KC.gold2} stroke="#b37a10" strokeWidth={6} />
    {[-1, 1].map((sd) => Array.from({ length: 7 }, (_, i) => { const a = (Math.PI / 2) + sd * (0.35 + i * 0.3);
      return <ellipse key={sd + '' + i} cx={Math.cos(a) * (r - 58)} cy={Math.sin(a) * (r - 58)} rx={12} ry={24} fill="#c88a1a" transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * (r - 58)} ${Math.sin(a) * (r - 58)})`} />; }))}
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill="#8a5a00">2023</text>
  </g>;
}
/* ---------- membrana de la célula (bicapa) con bolsita que se hunde ---------- */
function Membrana({ y = 720, x0 = 440, d = 0, ancho = 150 }) {
  const path = d < 1 ? `M -40 ${y} L 1120 ${y}` :
    `M -40 ${y} L ${x0 - ancho} ${y} C ${x0 - ancho * 0.55} ${y} ${x0 - ancho * 0.75} ${y + d} ${x0} ${y + d} C ${x0 + ancho * 0.75} ${y + d} ${x0 + ancho * 0.55} ${y} ${x0 + ancho} ${y} L 1120 ${y}`;
  return <g>
    <path d={path} stroke={MEMB} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d={path} stroke="#7a2346" strokeWidth={6} fill="none" strokeDasharray="10 8" />
  </g>;
}
function Tijera({ x, y, s = 1, boca = 0, rot = 0 }) {
  const a = 18 + boca * 30, c = Math.cos(a * Math.PI / 180) * 44, sn = Math.sin(a * Math.PI / 180) * 44;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${c} ${-sn} A 44 44 0 1 0 ${c} ${sn} Z`} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-6} cy={-22} r={6} fill="#fff" /><circle cx={-5} cy={-22} r={3} fill={KC.ink} />
  </g>;
}
function Candado({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -30 0 L -30 -34 Q -30 -66 0 -66 Q 30 -66 30 -34 L 30 0" stroke={KC.ink} strokeWidth={14} fill="none" />
    <path d="M -30 0 L -30 -34 Q -30 -66 0 -66 Q 30 -66 30 -34 L 30 0" stroke="#cfd6dd" strokeWidth={7} fill="none" />
    <rect x={-48} y={-6} width={96} height={76} rx={14} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={26} r={10} fill={KC.ink} /><rect x={-4} y={28} width={8} height={22} fill={KC.ink} />
  </g>;
}
function ADNNucleo({ T, x, y, r }) {
  return <g>{Array.from({ length: 5 }, (_, i) => {
    const yy = y - r * 0.55 + i * r * 0.27;
    return <path key={i} d={Array.from({ length: 14 }, (_, k) => { const xx = x - r * 0.65 + k * r * 0.1; return (k ? 'L ' : 'M ') + xx.toFixed(1) + ' ' + (yy + Math.sin(k * 1.3 + i + T * 1.5) * 12).toFixed(1); }).join(' ')}
      stroke={i % 2 ? '#7fb3ff' : '#ff8fb8'} strokeWidth={8} fill="none" strokeLinecap="round" />;
  })}</g>;
}

function Arnm() {
  const { T, CUES } = useComposition();
  const K = CUES;
  const G = K.Gancho, Bu = K.Burbuja, En = K.Entra, Ri = K.Ribosoma, Ap = K.Aprende, Pr = K.Pregunta, Nu = K.Nucleo, Al = K.Alarma,
    Es = K.Estudio, Ag = K.Apagada, Tr = K.Truco, No = K.Nobel, Ci = K.Cierre, Ou = K.Outro;
  const FIN = Ou + 4;
  // brazo e inyección
  const BX = 420, BY = 820, PX = BX + 60, PY = BY + 90;
  const pica = kprog(T, G, G + 0.35, kEase.sale), emb = kprog(T, G + 0.45, G + 2.6, kEase.suave), saca = kprog(T, Bu + 0.2, Bu + 0.9, kEase.suave);
  // entrada a la célula (escena Entra)
  const xL = 440, baja = kprog(T, En, En + 1.1, kEase.sale), hunde = kprog(T, En + 1.0, En + 2.0, kEase.suave), suelta = kprog(T, En + 2.0, En + 2.6, kEase.sale), abre = kprog(T, En + 2.6, En + 3.3, kEase.sale);
  const lY = suelta > 0 ? klerp(830, 1010, suelta) : klerp(240, 610 + hunde * 220, baja);
  // inflamación
  const alarma = kprog(T, Al + 1.8, Al + 2.4) * (1 - kprog(T, Ag + 0.3, Ag + 2.0, kEase.suave));
  // escala real (aprox., el dibujo es esquemático): [desde, hasta, px por mm]
  const ESC = [[G, Bu + 0.4, 4], [Bu + 0.4, En, 1.2e6], [En, Ri, 1.8e6], [Ri, Ap, 4.5e6], [Ap, Pr, 5e4], [Pr, Nu, 2.7e4], [Nu, Al, 5e4],
    [Al, Es, 2e4], [Es, Ag, 1.2e8], [Ag, Tr, 2e4], [Tr, No, 1.2e8], [No, Ci, 7], [Ci, Ou, 4]];
  const esc = ESC.find(([a, b]) => T >= a && T < b);
  const UCAMBIA = [1, 5, 6, 9];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho: la vacuna en el brazo, y la Lupa: qué trae */}
      <Escena T={T} a={G} b={En} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <Brazo x={BX} y={BY} />
          <Jeringa x={PX + klerp(90, 0, pica) * Math.cos(-12 * Math.PI / 180) + saca * 260} y={PY + klerp(90, 0, pica) * Math.sin(-12 * Math.PI / 180) - saca * 55} emb={emb} o={1 - saca} />
          {emb > 0 && emb < 1 && <circle cx={PX} cy={PY} r={16 + emb * 30} fill="rgba(255,244,176,.5)" />}
        </Capa>
      </Escena>
      <Lupa T={T} at={Bu + 0.1} until={En - 0.25} x={600} y={640} r={280} fx={PX} fy={PY} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · la vacuna"
        interior={(t, r) => <svg width={2 * r} height={2 * r}>
          <Nanoparticula T={t} x={r} y={r} r={110} seed={2} />
          <Nanoparticula T={t} x={r - 175 + Math.sin(t) * 8} y={r - 140} r={58} seed={5} rot={40} />
          <Nanoparticula T={t} x={r + 170} y={r + 150 + Math.cos(t) * 8} r={64} seed={9} rot={-30} />
        </svg>} />
      {/* 2 · la burbuja entra a la célula y suelta el mensaje */}
      <Escena T={T} a={En} b={Ri} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(255,159,191,.25)" />
        <Capa>
          <Membrana y={720} x0={xL} d={suelta > 0 ? klerp(220, 0, kprog(T, En + 2.0, En + 2.3)) : hunde * 220} />
          {suelta > 0 && <circle cx={xL} cy={lY} r={klerp(110, 128, abre)} fill="none" stroke={MEMB} strokeWidth={22} opacity={1 - abre} strokeDasharray={abre > 0 ? `${klerp(80, 6, abre)} ${klerp(0, 40, abre)}` : undefined} />}
          <Nanoparticula T={T} x={xL} y={lY} r={88} abre={abre} seed={2} />
          {abre > 0 && <HebraARN T={T} x={xL - 40} y={lY + 120} largo={560} n={22} p={abre} />}
          <text x={60} y={640} style={{ font:`700 30px ${KF.mono}` }} fill="rgba(246,243,236,.7)">afuera</text>
          <text x={60} y={830} style={{ font:`700 30px ${KF.mono}` }} fill="rgba(246,243,236,.7)">adentro de la célula</text>
        </Capa>
      </Escena>
      {/* 3 · los ribosomas leen y arman la espícula */}
      <Escena T={T} a={Ri} b={Ap} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <HebraARN T={T} x={40} y={820} largo={1000} n={36} />
          {[0, 1, 2].map((i) => { const p = kclamp((T - Ri - i * 0.9) / 3.0, 0, 1), rx = klerp(120, 900, p);
            const cuentas = Math.floor(p * 12);
            return <g key={i}>
              {Array.from({ length: cuentas }, (_, k) => <circle key={k} cx={rx - 20 - k * 16} cy={760 - k * 12 + Math.sin(T * 3 + k) * 8} r={10} fill={ESP} stroke={KC.ink} strokeWidth={3} />)}
              {T > Ri + i * 0.9 - 0.3 && <Ribosoma x={rx} y={820} s={1} />}
            </g>; })}
          {[0, 1].map((i) => { const c = kprog(T, Ri + 2.3 + i * 0.8, Ri + 3.0 + i * 0.8, kEase.rebote);
            return c > 0 ? <Espicula key={i} x={720 + i * 170} y={1150} s={1.1 * c} rot={Math.sin(T * 2 + i) * 6} /> : null; })}
        </Capa>
        <Etq T={T} at={Ri + 0.5} until={Ap - 0.2} x={150} y={940} texto="ribosoma" color="#d6c2ff" />
        <Etq T={T} at={Ri + 0.8} until={Ap - 0.2} x={40} y={700} texto="ARNm" color={ARN} />
      </Escena>
      {/* 4 · tu sistema inmune aprende */}
      <Escena T={T} a={Ap} b={Pr} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <circle cx={300} cy={1300} r={540} fill="#3a1f2c" stroke={MEMB} strokeWidth={26} />
          <circle cx={300} cy={1300} r={540} fill="none" stroke="#7a2346" strokeWidth={5} strokeDasharray="10 8" />
          {[-1.95, -1.7, -1.45, -1.2, -0.95, -0.7].map((a, i) => { const c = kprog(T, Ap + 0.1 + i * 0.15, Ap + 0.6 + i * 0.15, kEase.rebote);
            return <Espicula key={i} x={300 + Math.cos(a) * 545} y={1300 + Math.sin(a) * 545} s={0.75 * c} rot={(a * 180) / Math.PI + 90} />; })}
          <CelulaInmune T={T} x={klerp(1180, 780, kprog(T, Ap + 0.3, Ap + 1.4, kEase.sale))} y={820} r={140} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = Ap + 1.6 + i * 0.18, u = kprog(T, t0, t0 + 1.4, kEase.suave);
            return u > 0 ? <Anticuerpo key={i} x={klerp(760, 260 + i * 70, u)} y={klerp(820, 700 - (i % 3) * 60, u) + Math.sin(T * 3 + i) * 10} s={1} rot={T * 40 + i * 45} /> : null; })}
        </Capa>
        <Etq T={T} at={Ap + 0.8} until={Pr - 0.2} x={760} y={1010} texto="célula inmune" lado="izq" color="#d6c2ff" />
        <Etq T={T} at={Ap + 0.6} until={Pr - 0.2} x={80} y={640} texto="espícula" color={ESP} />
      </Escena>
      {/* 5 · ¿se queda a vivir en ti? la célula entera */}
      <Escena T={T} a={Pr} b={Nu} zoom={0.08} origen="30% 45%">
        <FondoMarca patron="oscuro" />
        <Capa>
          <ellipse cx={290} cy={900} rx={260} ry={340} fill="#3a1f2c" stroke={MEMB} strokeWidth={20} />
          <circle cx={270} cy={960} r={110} fill="#1f2f5c" stroke="#7fb3ff" strokeWidth={10} />
          <ADNNucleo T={T} x={270} y={960} r={110} />
          <HebraARN T={T} x={160} y={660} largo={220} n={9} amp={8} grosor={6} />
          <text x={760} y={500} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 760 380)`} opacity={kprog(T, Pr, Pr + 0.4)}>?</text>
        </Capa>
        <Etq T={T} at={Pr + 0.4} until={Nu - 0.2} x={385} y={960} texto="núcleo (ADN)" color="#7fb3ff" />
      </Escena>
      {/* 6 · no entra al núcleo, y la célula lo desarma */}
      <Escena T={T} a={Nu} b={Al} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <circle cx={560} cy={860} r={210} fill="#1f2f5c" stroke="#7fb3ff" strokeWidth={14} />
          {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <circle key={i} cx={560 + Math.cos(a) * 210} cy={860 + Math.sin(a) * 210} r={10} fill="#0d1424" stroke="#7fb3ff" strokeWidth={4} />; })}
          <ADNNucleo T={T} x={560} y={860} r={200} />
          <Candado x={560} y={620} s={kprog(T, Nu + 0.9, Nu + 1.3, kEase.rebote)} />
          {(() => { const llega = kprog(T, Nu, Nu + 0.9, kEase.sale), rebota = kprog(T, Nu + 0.9, Nu + 1.6, kEase.sale), parte = kprog(T, Nu + 2.0, Nu + 3.6, kEase.suave);
            const y = klerp(1230, 1110, llega) + rebota * 50;
            return <g>
              <HebraARN T={T} x={280} y={y} largo={560} n={20} partido={parte} o={1 - kprog(T, Nu + 3.2, Nu + 3.9)} />
              {[0, 1, 2].map((i) => { const e = kprog(T, Nu + 1.5 + i * 0.2, Nu + 2.1 + i * 0.2, kEase.sale);
                return e > 0 ? <Tijera key={i} x={klerp(i === 1 ? 1150 : -80, 380 + i * 180, e)} y={y + (i - 1) * 20} s={1} boca={Math.abs(Math.sin(T * 10 + i))} rot={i === 1 ? 180 : 0} /> : null; })}
            </g>; })()}
        </Capa>
        <Etq T={T} at={Nu + 1.6} until={Al - 0.2} x={860} y={1210} texto="enzimas" lado="izq" color={KC.mint} />
      </Escena>
      {/* 7 · el ARN de laboratorio prendía la alarma */}
      <Escena T={T} a={Al} b={Es} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <ellipse cx={560} cy={1080} rx={420} ry={110} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} />
          <CelulaInmune T={T} x={560} y={960} r={150} brazos={1} color={mixHex('#b18cff', '#ff5a4f', alarma)} seed={4} />
          <g transform={`translate(190 ${klerp(560, 600, kprog(T, Al + 0.2, Al + 0.6))}) rotate(${klerp(0, 35, kprog(T, Al + 0.2, Al + 0.6))})`}>
            <rect x={-40} y={-200} width={80} height={240} rx={30} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
            <rect x={-32} y={-60} width={64} height={92} rx={24} fill="#fff4b0" />
            <rect x={-52} y={-214} width={104} height={26} rx={8} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
          </g>
          {[0, 1, 2].map((i) => { const u = kprog(T, Al + 0.6 + i * 0.3, Al + 1.8 + i * 0.3, kEase.suave);
            return u > 0 && u < 1 ? <HebraARN key={i} T={T} x={klerp(250, 470 + i * 40, u)} y={klerp(640, 900, u)} largo={110} n={5} amp={6} grosor={6} rot={20} /> : null; })}
          <Sirena T={T} x={560} y={740} on={alarma} />
        </Capa>
        <Medidor T={T} at={Al + 1.6} until={Es - 0.2} valor={(t) => kprog(t, Al + 1.8, Al + 3.0)} etiqueta="inflamación" color={KC.red} y={1460} />
        <Etq T={T} at={Al + 0.6} until={Es - 0.2} x={760} y={1160} texto="célula dendrítica" lado="der" color={KC.ink} tam={30} />
      </Escena>
      {/* 8 · 2005: cambiaron letras por versiones modificadas */}
      <Escena T={T} a={Es} b={Ag} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Letras T={T} x={96} y={1000} letras={'AUGGCUUACUGA'.split('')} cambia={UCAMBIA} p={kprog(T, Es + 4.4, Es + 7.6)} />
        </Capa>
        <Etq T={T} at={Es + 5.0} until={Ag - 0.2} x={560} y={1140} texto="Ψ = pseudouridina" lado="izq" color={KC.ink} tam={36} />
      </Escena>
      {/* 9 · la alarma casi se apagó */}
      <Escena T={T} a={Ag} b={Tr} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <ellipse cx={560} cy={1080} rx={420} ry={110} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} />
          <CelulaInmune T={T} x={560} y={960} r={150} brazos={1} color={mixHex('#b18cff', '#ff5a4f', alarma)} seed={4} />
          <Letras T={T} x={250} y={620} letras={'AΨGGCΨ'.split('')} p={0} tam={64} />
          <Sirena T={T} x={880} y={780} on={alarma} />
        </Capa>
        <Medidor T={T} at={Ag + 0.1} until={Tr - 0.2} valor={(t) => klerp(1, 0.08, kprog(t, Ag + 0.3, Ag + 2.0, kEase.suave))} etiqueta="inflamación" color={mixHex('#2fe0a8', '#ff3b2f', alarma)} y={1460} />
      </Escena>
      {/* 10 · el truco: tu propio ARN ya trae letras modificadas */}
      <Escena T={T} a={Tr} b={No} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <text x={60} y={640} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>el ARN de tu célula</text>
          <Letras T={T} x={40} y={700} letras={'GΨACAΨ'.split('')} p={0} tam={76} />
          <text x={240} y={900} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, Tr + 1.6, Tr + 2.0)}>≈</text>
          <g opacity={kprog(T, Tr + 1.8, Tr + 2.4)}>
            <text x={60} y={980} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>el ARN de la vacuna</text>
            <Letras T={T} x={40} y={1040} letras={'AΨGGCΨ'.split('')} p={0} tam={76} />
          </g>
        </Capa>
      </Escena>
      {/* 11 · Nobel 2023 */}
      <Escena T={T} a={No} b={Ci} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa><Medalla T={T} x={600} y={860} s={kprog(T, No, No + 0.6, kEase.rebote)} /></Capa>
      </Escena>
      {/* 12 · cierre: el mismo brazo, ya entrenado */}
      <Escena T={T} a={Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <Brazo x={BX} y={BY} curita={kprog(T, Ci + 0.2, Ci + 0.7, kEase.rebote)} brillo={kprog(T, Ci + 0.8, Ci + 1.6)} T={T} />
          {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + T * 0.6; return <Anticuerpo key={i} x={PX + Math.cos(a) * 250} y={PY + Math.sin(a) * 200} s={0.9} rot={T * 30 + i * 50} o={kprog(T, Ci + 1.0, Ci + 1.8)} />; })}
          <HebraARN T={T} x={110} y={480} largo={300} n={12} partido={kprog(T, Ci + 2.2, Ci + 3.8)} o={1 - kprog(T, Ci + 3.4, Ci + 4.2)} />
        </Capa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={G + 0.2} tacharEn={G + 1.5} until={G + 3.0} texto="trae el virus" x={300} y={470} tam={44} />
      <Chip T={T} at={G + 2.2} until={Bu - 0.2} texto="trae instrucciones" x={300} y={470} tam={42} borde={KC.yellow} />
      <Chip T={T} at={Bu + 0.8} until={En - 0.3} texto="ARNm + nanopartícula de lípidos" y={1480} tam={36} borde={KC.yellow} />
      <Chip T={T} at={En + 0.4} until={Ri - 0.3} texto="una célula del músculo del brazo" y={1480} tam={36} borde={MEMB} />
      <Chip T={T} at={Ri + 1.6} until={Ap - 0.3} texto="proteína espícula" y={1480} tam={42} borde={ESP} />
      <Chip T={T} at={Ap + 1.6} until={Pr - 0.3} texto="aprende a reconocerla" y={1480} tam={42} borde={ANTI} />
      <Chip T={T} at={Nu + 1.0} until={Al - 0.3} texto="no cambia tu ADN" y={1480} tam={42} borde="#7fb3ff" />
      <TarjetaEstudio T={T} at={Es + 0.2} until={Es + 4.0} anio="2005" quien="Karikó y Weissman · U. de Pensilvania" revista="Immunity 23: 165–175" y={640} />
      <Chip T={T} at={Es + 4.4} until={Ag - 0.3} texto="probaron varias letras modificadas" y={1480} tam={36} borde={PSI} />
      <Chip T={T} at={Tr + 0.6} until={No - 0.3} texto="copiar lo que ya hace tu célula" y={1480} tam={36} borde={PSI} />
      <Chip T={T} at={No + 0.5} until={Ci - 0.2} texto="Katalin Karikó · Drew Weissman" y={1150} tam={40} borde={KC.gold} />
      <Chip T={T} at={No + 0.9} until={Ci - 0.2} texto="Fisiología o Medicina" y={1480} tam={40} borde={KC.gold} />
      <Chip T={T} at={Ci + 1.4} until={Ou} texto="un mensaje que se lee y se borra" y={1480} tam={36} borde={KC.yellow} />
      {esc && <Escala T={T} pxPorMm={esc[2]} y={1650} />}

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={G + 0.1} until={Bu - 0.1} texto="No trae el virus: *trae instrucciones.*" />
      <Subtitulo T={T} idx={1} at={Bu + 0.1} until={En - 0.1} texto="ARN mensajero en *una burbuja de grasa.*" />
      <Subtitulo T={T} idx={2} at={En + 0.1} until={Ri - 0.1} texto="Entra y *suelta el mensaje.*" />
      <Subtitulo T={T} idx={3} at={Ri + 0.1} until={Ap - 0.1} texto="Tus ribosomas arman *la espícula.*" />
      <Subtitulo T={T} idx={4} at={Ap + 0.1} until={Pr - 0.1} texto="Tu sistema inmune *aprende.*" />
      <Subtitulo T={T} idx={5} at={Pr + 0.1} until={Nu - 0.1} texto="¿Se queda *a vivir en ti?*" />
      <Subtitulo T={T} idx={6} at={Nu + 0.1} until={Al - 0.1} texto="No entra al núcleo: *se desarma.*" />
      <Subtitulo T={T} idx={7} at={Al + 0.1} until={Es - 0.1} texto="El ARN de laboratorio *prendía la alarma.*" />
      <Subtitulo T={T} idx={8} at={Es + 0.1} until={Ag - 0.1} texto="Cambiaron letras *por versiones modificadas.*" />
      <Subtitulo T={T} idx={9} at={Ag + 0.1} until={Tr - 0.1} texto="La alarma *casi se apagó.*" />
      <Subtitulo T={T} idx={10} at={Tr + 0.1} until={No - 0.1} texto="Copiaron a *tu propio ARN.*" />
      <Subtitulo T={T} idx={11} at={No + 0.1} until={Ci - 0.1} texto="Nobel *2023.*" />
      <Subtitulo T={T} idx={12} at={Ci + 0.1} until={Ou - 0.1} texto="Un mensaje que se lee *y se borra.*" />

      <Robert T={T} apariciones={[
        [G - 0.45, Bu - 0.4, 'avatar_11_sorprendido', 'gancho'],
        [En + 0.3, Ri - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [Ap + 0.2, Pr - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [Pr + 0.05, Nu - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [Nu + 0.3, Al - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [Al + 0.6, Es - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [Es + 4.3, Ag - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [Tr + 0.2, No - 0.3, 'avatar_02_apuntando_camara', 'grande'],
        [No + 0.2, Ci - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [Ci + 0.3, Ou - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="16" hasta={Ou} />
      <CierreMarca T={T} at={Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArnmApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Arnm /></CompositionStage></div>;
}
window.ArnmApp = ArnmApp;
