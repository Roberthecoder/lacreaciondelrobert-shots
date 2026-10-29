// Shot Químico #11 · Ese olor no es el gas de tu estufa (mercaptanos: la alarma que le agregan) — NARRADO (N1 por dentro + N5 estudio).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const OLOR = '#3fbf4a', GASGRIS = '#9aa3b5', CIL = '#c9d6e3';

// Moléculas del shot (bolitas esquemáticas; H chicos).
const MOLG = {
  propano: { atomos: [[-75, 10, 30, QA.C, 'C'], [0, -15, 30, QA.C, 'C'], [75, 10, 30, QA.C, 'C'],
    [-125, 0, 17, QA.H, ''], [-90, 58, 17, QA.H, ''], [-95, -36, 17, QA.H, ''], [-20, -62, 17, QA.H, ''], [22, -62, 17, QA.H, ''],
    [125, 0, 17, QA.H, ''], [90, 58, 17, QA.H, ''], [95, -36, 17, QA.H, '']], enlaces: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 8], [2, 9], [2, 10]] },
  butano: { atomos: [[-105, 10, 28, QA.C, 'C'], [-35, -15, 28, QA.C, 'C'], [35, 10, 28, QA.C, 'C'], [105, -15, 28, QA.C, 'C'],
    [-152, 0, 16, QA.H, ''], [-120, 56, 16, QA.H, ''], [-125, -34, 16, QA.H, ''], [-55, -60, 16, QA.H, ''], [-15, -60, 16, QA.H, ''],
    [15, 55, 16, QA.H, ''], [55, 55, 16, QA.H, ''], [152, -5, 16, QA.H, ''], [120, -60, 16, QA.H, ''], [125, 28, 16, QA.H, '']],
    enlaces: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8], [2, 9], [2, 10], [3, 11], [3, 12], [3, 13]] },
  mercaptano: { atomos: [[-95, 5, 30, QA.C, 'C'], [-20, -15, 30, QA.C, 'C'], [58, 8, 40, QA.S, 'S'],
    [-140, -12, 17, QA.H, ''], [-108, 52, 17, QA.H, ''], [-104, -42, 17, QA.H, ''], [-38, -62, 17, QA.H, ''], [-2, 30, 17, QA.H, ''], [102, -24, 17, QA.H, 'H']],
    enlaces: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 8]] },
};
function MolG({ tipo, ...p }) { return <Molecula {...MOLG[tipo]} {...p} />; }
// Brillo amarillo del azufre (para que se vea "la alarma").
function MercaptanoBrilla({ T, x, y, s = 1, rot = 0, o = 1 }) {
  return <g opacity={o}>
    <circle cx={x + 58 * s * Math.cos(rot * Math.PI / 180)} cy={y + 58 * s * Math.sin(rot * Math.PI / 180)} r={(70 + Math.sin(T * 7) * 10) * s} fill="rgba(255,225,26,.28)" />
    <MolG tipo="mercaptano" x={x} y={y} s={s} rot={rot} />
  </g>;
}

// Estufa de cocina (vista de frente). perilla en grados.
function Estufa({ x, y, s = 1, perilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-20} width={460} height={60} rx={10} fill="#e9edf2" stroke={KC.ink} strokeWidth={9} />
    {[-110, 110].map((dx) => <g key={dx}><ellipse cx={dx} cy={-26} rx={70} ry={16} fill="#3a3a3a" stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={dx} cy={-32} rx={36} ry={9} fill="#6d6d6d" stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-220} y={40} width={440} height={300} rx={14} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    {[-150, -50, 50, 150].map((dx, i) => <g key={i} transform={`translate(${dx} 72) rotate(${i === 0 ? perilla : 0})`}>
      <circle r={20} fill="#3a3a3a" stroke={KC.ink} strokeWidth={5} /><rect x={-4} y={-18} width={8} height={18} fill="#fff" /></g>)}
    <rect x={-180} y={110} width={360} height={200} rx={12} fill="#2b2f36" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={135} width={300} height={140} rx={8} fill="#4a5462" />
    <rect x={-120} y={118} width={240} height={10} rx={5} fill="#c9ccd2" />
  </g>;
}
// Cilindro de gas LP (x, y = centro de la base).
function Cilindro({ x, y, s = 1, ventana, etiqueta = 'Gas LP' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-430} width={80} height={60} rx={10} fill="#8d97a6" stroke={KC.ink} strokeWidth={7} />
    <path d="M -70 -380 Q -70 -420 -40 -420 L 40 -420 Q 70 -420 70 -380 Z" fill="#8d97a6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={-380} width={240} height={380} rx={90} fill={CIL} stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-30} width={240} height={30} fill="#8d97a6" stroke={KC.ink} strokeWidth={7} />
    {!ventana && <g><rect x={-88} y={-240} width={176} height={80} rx={12} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={-186} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text></g>}
    {ventana}
  </g>;
}
// Manguera de la estufa al cilindro.
function Manguera({ x0, y0, x1, y1 }) {
  return <path d={`M ${x0} ${y0} C ${x0 + 60} ${y0 + 120} ${x1 - 80} ${y1 + 100} ${x1} ${y1}`} stroke="#f2c230" strokeWidth={16} fill="none" strokeLinecap="round" />;
}
// Hilitos de olor ondulados que suben.
function Olor({ T, x, y, f = 1, n = 3, color = OLOR, alto = 260, sep = 60, dash }) {
  if (f <= 0) return null;
  return <g opacity={Math.min(1, f * 1.4)}>{Array.from({ length: n }, (_, i) => {
    const dx = (i - (n - 1) / 2) * sep, ph = i * 1.7, h = alto * f;
    let d = `M ${x + dx} ${y}`;
    for (let k = 1; k <= 8; k++) { const yy = y - (h * k) / 8; d += ` L ${x + dx + Math.sin(T * 3 + k * 0.9 + ph) * 22} ${yy}`; }
    return <path key={i} d={d} stroke={color} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />; })}</g>;
}
// Nariz de perfil (ícono) con etiqueta abajo.
function NarizIcono({ x, y, s = 1, etq, color = KC.ink, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={95} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 -70 Q -10 -10 40 30 Q 55 45 30 52 Q 10 56 -5 45 Q -15 60 -40 50" fill="none" stroke="#c97d5a" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    {etq && <g><rect x={-110} y={110} width={220} height={58} rx={29} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={150} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={color}>{etq}</text></g>}
  </g>;
}
// Barra de escala fija (texto ya calculado para el dibujo esquemático).
function EscalaFija({ texto, largo = 160, x = 60, y = 1600, color = KC.texto }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}
// Cocina de lado: piso, pared, estufa y cilindro, con la nube de gas que se junta abajo.
// Piso de cocina con baldosas.
function Piso({ y = 1200 }) {
  return <g><rect x={0} y={y} width={KW} height={KH - y} fill="#c98a52" />
    {Array.from({ length: 9 }, (_, i) => <line key={'v' + i} x1={i * 135} y1={y} x2={i * 135 - 120} y2={KH} stroke="rgba(0,0,0,.18)" strokeWidth={5} />)}
    {[90, 230, 420, 680].map((d) => <line key={d} x1={0} y1={y + d} x2={KW} y2={y + d} stroke="rgba(0,0,0,.18)" strokeWidth={5} />)}
    <line x1={0} y1={y} x2={KW} y2={y} stroke={KC.ink} strokeWidth={9} /></g>;
}
function CocinaLado({ T, nube = 0, color = 'rgba(63,191,74,.45)', borde = OLOR, dash }) {
  const h = 170 * nube;
  let ola = `M 0 ${1200 - h}`;
  for (let k = 1; k <= 12; k++) ola += ` L ${(KW * k) / 12} ${1200 - h + Math.sin(T * 2 + k) * 10 * nube}`;
  return <g>
    <Piso />
    <Estufa x={330} y={860} s={0.9} />
    <Manguera x0={520} y0={940} x1={800} y1={850} />
    <Cilindro x={820} y={1200} s={0.85} />
    {nube > 0 && <path d={`${ola} L ${KW} 1200 L 0 1200 Z`} fill={color} stroke={borde} strokeWidth={6} strokeDasharray={dash} />}
  </g>;
}
// Escuela de New London: silueta grande de acero y concreto, con el espacio cerrado de abajo en corte.
function Escuela({ T, gas = 0, chispa = 0, flash = 0, gris = 0 }) {
  const muro = mixHex('#d8d2c4', '#7c8088', gris), vidrio = mixHex('#7fc8ff', '#5a5f68', gris);
  return <g>
    <rect x={0} y={1080} width={KW} height={840} fill="#8a6a45" />
    <rect x={140} y={1000} width={800} height={110} fill="#3b2f25" stroke={KC.ink} strokeWidth={8} />
    {gas > 0 && <rect x={148} y={1110 - 100 * gas} width={784} height={100 * gas} fill="rgba(210,220,235,.35)" stroke="#e6edf7" strokeWidth={5} strokeDasharray="14 12" />}
    <path d={`M 1080 1060 L 900 1060`} stroke={GASGRIS} strokeWidth={26} />
    <circle cx={900} cy={1060} r={22} fill="#d24b3a" stroke={KC.ink} strokeWidth={5} />
    <path d="M 140 640 L 540 560 L 940 640 L 940 1000 L 140 1000 Z" fill={muro} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {Array.from({ length: 12 }, (_, i) => { const c = i % 6, r = Math.floor(i / 6); return <rect key={i} x={190 + c * 122} y={690 + r * 140} width={80} height={95} fill={vidrio} stroke={KC.ink} strokeWidth={6} />; })}
    <rect x={490} y={890} width={100} height={110} fill="#5a3a22" stroke={KC.ink} strokeWidth={7} />
    {chispa > 0 && <g transform="translate(330 1060)" opacity={chispa}>
      <rect x={-50} y={-22} width={100} height={44} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
      <path d="M 50 -10 L 90 -40 L 80 -10 L 120 -30" stroke={KC.yellow} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {flash > 0 && <rect x={0} y={0} width={KW} height={KH} fill="#fff" opacity={flash} />}
  </g>;
}
// Íconos de "si huele a gas" (tarjeta con dibujo + texto).
function TarjetaPaso({ T, at, x, y, n, texto, children }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.5, 1, e)})`} opacity={kprog(T, at, at + 0.2)}>
    <rect x={-150} y={-170} width={300} height={360} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-118} cy={-138} r={36} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    <text x={-118} y={-124} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill={KC.ink}>{n}</text>
    {children}
    <text x={0} y={160} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

function Gas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, A: CUES.Aviso, N: CUES.Nariz, P: CUES.Piso, Pr: CUES.Pregunta, Es: CUES.Estudio, L: CUES.Ley, J: CUES.Japon, A2: CUES.Aviso2, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const perilla = klerp(0, 90, kprog(T, K.G, K.G + 0.4, kEase.sale));
  const olor0 = kprog(T, K.G + 0.2, K.G + 1.2, kEase.sale);
  const R = krng(11);
  const flot = Array.from({ length: 14 }, (_, i) => [R(), R(), R() * 360, i % 3 === 0 ? 'butano' : 'propano']);
  // log-escala de umbrales (Nagata 2003): log10(ppm) 4 → y 640 · -6 → y 1130
  const yLog = (v) => 640 + (4 - Math.log10(v)) * 49;
  const escalaJ = kprog(T, K.J + 2.8, K.J + 4.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la estufa y el olor */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Piso />
          <Estufa x={400} y={860} s={1} perilla={perilla} />
          <Manguera x0={610} y0={940} x1={880} y1={850} />
          <Cilindro x={900} y={1200} s={0.85} />
          <Olor T={T} x={290} y={820} f={olor0} alto={300} />
          <g transform={`translate(560 ${640}) rotate(${Math.sin(T * 30) * 12 * kprog(T, K.G + 1.9, K.G + 2.3)})`} opacity={kprog(T, K.G + 1.9, K.G + 2.3)}>
            <path d="M -44 30 Q -44 -40 0 -46 Q 44 -40 44 30 L 56 44 L -56 44 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
            <circle cx={0} cy={56} r={12} fill={KC.ink} />
          </g>
        </SvgCapa>
        <EscalaFija texto="50 cm" largo={210} />
      </Escena>
      {/* 1 · qué es: el cilindro por dentro (rayos X) */}
      <Escena T={T} a={K.Q} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Cilindro x={540} y={1210} s={1.45} ventana={<g>
            <clipPath id="vent"><circle cx={0} cy={-200} r={105} /></clipPath>
            <circle cx={0} cy={-200} r={110} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <g clipPath="url(#vent)">{flot.slice(0, 7).map(([u, v, r, t], i) => <MolG key={i} tipo={t} x={-110 + ((u * 220 + T * 30 * (i % 2 ? 1 : -1)) % 260 + 260) % 260} y={-290 + v * 180} s={0.42} rot={r + T * 25} />)}</g>
          </g>} />
          <Olor T={T} x={540} y={600} f={0.6 * kprog(T, K.Q + 2.0, K.Q + 2.6)} n={2} color="rgba(63,191,74,.35)" alto={120} dash="4 18" />
          <NarizIcono x={870} y={620} s={0.8} etq="casi nada" o={kprog(T, K.Q + 2.6, K.Q + 3.1)} />
        </SvgCapa>
        <Etq T={T} at={K.Q + 0.6} until={K.A - 0.3} x={40} y={1080} texto="propano C₃H₈" />
        <Etq T={T} at={K.Q + 1.2} until={K.A - 0.3} x={1040} y={1000} texto="butano C₄H₁₀" lado="izq" />
        <EscalaFija texto="20 cm" largo={190} />
      </Escena>
      {/* 2 · el aviso: una gota de mercaptano entre muchas moléculas */}
      <Escena T={T} a={K.A} b={K.N} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {Array.from({ length: 22 }, (_, i) => { const R2 = krng(40 + i), u = R2(), v = R2(), r = R2() * 360, t = i % 3 === 0 ? 'butano' : 'propano';
            return <MolG key={i} tipo={t} x={60 + ((u * 1000 + T * 20 * (i % 2 ? 1 : -1)) % 1000 + 1000) % 1000} y={620 + v * 600 + Math.sin(T + i) * 10} s={0.48} rot={r + T * 15} o={0.55} />; })}
          <g transform={`translate(540 ${klerp(380, 470, kprog(T, K.A + 0.2, K.A + 0.8, kEase.sale))})`}>
            <rect x={-26} y={-150} width={52} height={150} rx={12} fill="rgba(255,255,255,.25)" stroke="#e6edf7" strokeWidth={6} />
            <ellipse cx={0} cy={-170} rx={44} ry={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          </g>
          {T > K.A + 1.0 && <MercaptanoBrilla T={T} x={540} y={klerp(500, 880, kprog(T, K.A + 1.0, K.A + 2.0, kEase.suave))} s={1.0} rot={Math.sin(T * 2) * 12} />}
        </SvgCapa>
        <Etq T={T} at={K.A + 2.0} until={K.N - 0.3} x={700} y={1000} texto="etil mercaptano · C₂H₆S" tam={30} color={KC.yellow} />
        <Etq T={T} at={K.A + 2.6} until={K.N - 0.3} x={640} y={1080} texto="S = azufre" tam={30} color={KC.yellow} />
        <EscalaFija texto="0.5 nm" largo={150} />
      </Escena>
      {/* 3 · tu nariz: neuronas olfativas */}
      <Escena T={T} a={K.N} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={560} width={KW} height={200} fill="#f0a3b4" stroke={KC.ink} strokeWidth={6} />
          <rect x={0} y={760} width={KW} height={60} fill="rgba(180,220,255,.25)" />
          {Array.from({ length: 6 }, (_, i) => { const x = 110 + i * 172, enc = i === 2 ? kprog(T, K.N + 1.6, K.N + 2.0) * (1 - 0.3 * kprog(T, K.N + 3.6, K.N + 4.4)) : (i === 4 ? 0.25 * kprog(T, K.N + 2.8, K.N + 3.2) : 0);
            const sen = i === 2 ? kprog(T, K.N + 1.9, K.N + 2.9) : 0;
            return <g key={i}>
              {enc > 0 && <circle cx={x} cy={700} r={95} fill={`rgba(255,225,26,${0.45 * enc})`} />}
              <path d={`M ${x} 640 L ${x} 400`} stroke={mixHex('#b18cff', KC.yellow, enc)} strokeWidth={14} />
              <ellipse cx={x} cy={680} rx={42} ry={52} fill={mixHex('#b18cff', KC.yellow, enc)} stroke={KC.ink} strokeWidth={6} />
              <path d={`M ${x} 732 L ${x} 770`} stroke={KC.ink} strokeWidth={8} />
              {[-30, -10, 10, 30].map((d) => <path key={d} d={`M ${x} 770 Q ${x + d} 800 ${x + d * 1.6 + Math.sin(T * 3 + d) * 6} 830`} stroke={mixHex('#b18cff', KC.yellow, enc)} strokeWidth={5} fill="none" />)}
              {sen > 0 && sen < 1 && <circle cx={x} cy={klerp(640, 400, sen)} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />}
            </g>; })}
          <MercaptanoBrilla T={T} x={klerp(480, 455, kprog(T, K.N + 0.3, K.N + 1.6))} y={klerp(1150, 900, kprog(T, K.N + 0.3, K.N + 1.6, kEase.suave))} s={0.65} rot={T * 20} />
          {[[200, 0.6], [780, 1.4], [900, 2.2]].map(([x0, d], i) => <MolG key={i} tipo="propano" x={x0 + Math.sin(T + i) * 30} y={klerp(1180, 950, kprog(T, K.N + d, K.N + d + 2.5, kEase.suave))} s={0.5} rot={T * 18 + i * 50} o={0.7} />)}
        </SvgCapa>
        <Etq T={T} at={K.N + 0.4} until={K.P - 0.3} x={40} y={380} texto="neuronas del olfato" color={KC.lilac} tam={30} />
        <Chip T={T} at={K.N + 2.0} until={K.P - 0.3} texto="azufre → ¡alarma!" y={1500} tam={42} borde={KC.yellow} />
        <EscalaFija texto="20 µm" largo={150} />
      </Escena>
      {/* 4 · el gas se junta en el piso */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <CocinaLado T={T} nube={kprog(T, K.P + 0.3, K.P + 4.2, kEase.suave)} />
          <Olor T={T} x={980} y={1170} f={kprog(T, K.P + 1.0, K.P + 2.0)} n={2} alto={160} sep={40} />
          <g transform="translate(60 1200)">{[0.25, 0.5, 0.75, 1].map((m) => <line key={m} x1={0} x2={30} y1={-170 * m} y2={-170 * m} stroke={KC.ink} strokeWidth={5} />)}
            <rect x={0} y={-170 * kprog(T, K.P + 0.3, K.P + 4.2, kEase.suave)} width={14} height={170 * kprog(T, K.P + 0.3, K.P + 4.2, kEase.suave)} fill={OLOR} /></g>
        </SvgCapa>
        <Chip T={T} at={K.P + 0.6} until={K.Pr - 0.2} texto="más pesado que el aire" y={1500} tam={44} borde={OLOR} />
        <EscalaFija texto="50 cm" largo={190} y={1640} />
      </Escena>
      {/* 5 · ¿y si no huele? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <CocinaLado T={T} nube={1} color="rgba(255,255,255,.18)" borde="#ffffff" dash="18 14" />
          <text x={240} y={1060} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 240 900)`}>?</text>
          <NarizIcono x={230} y={1480} s={0.75} etq="0" o={kprog(T, K.Pr + 0.4, K.Pr + 0.8)} />
        </SvgCapa>
      </Escena>
      {/* 6 · New London, Texas, 1937 */}
      <Escena T={T} a={K.Es} b={K.L} zoom={0.04}>
        <FondoLunares color="#9fb0c8" punto="rgba(255,255,255,.2)" />
        <SvgCapa>
          <g transform="translate(0 60)"><Escuela T={T} gas={kprog(T, K.Es + 3.6, K.Es + 5.6, kEase.suave)} chispa={kprog(T, K.Es + 5.6, K.Es + 5.9) * (1 - kprog(T, K.Es + 6.9, K.Es + 7.1))}
            flash={kprog(T, K.Es + 6.7, K.Es + 6.85) * (1 - kprog(T, K.Es + 6.9, K.Es + 7.6))} gris={kprog(T, K.Es + 6.9, K.Es + 7.6)} /></g>
          {T > K.Es + 3.6 && T < K.Es + 6.8 && [0, 1, 2].map((i) => { const p = ((T - K.Es - 3.6) * 0.8 + i / 3) % 1; return <circle key={i} cx={klerp(890, 600, p)} cy={1120 + Math.sin(p * 9 + i) * 12} r={10} fill="none" stroke="#e6edf7" strokeWidth={4} strokeDasharray="5 5" opacity={1 - p} />; })}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.3} anio="1937" quien="New London, Texas" revista="una escuela · gas sin olor" y={470} />
        <Etq T={T} at={K.Es + 3.8} until={K.Es + 6.6} x={880} y={1200} texto="fuga bajo el edificio" lado="izq" tam={30} />
        <Chip T={T} at={K.Es + 5.7} until={K.Es + 6.7} texto="chispa (al parecer, una lijadora)" y={1500} tam={34} borde={KC.orange} />
        <NumeroGigante T={T} at={K.Es + 7.3} until={K.L - 0.3} valor={300} dur={1.2} prefijo="≈ " etiqueta="personas murieron" y={1530} tam={120} color={KC.white} />
        <EscalaFija texto="10 m" largo={150} y={1680} />
      </Escena>
      {/* 7 · la ley de 1937 */}
      <Escena T={T} a={K.L} b={K.J} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g transform={`translate(540 800) rotate(-3) scale(${klerp(0.6, 1, kprog(T, K.L, K.L + 0.4, kEase.rebote))})`}>
            <rect x={-260} y={-280} width={520} height={560} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
            <text x={0} y={-190} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>LEY · TEXAS</text>
            <text x={0} y={-120} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#5a524a">House Bill 1017</text>
            {[0, 1, 2, 3].map((i) => <rect key={i} x={-200} y={-70 + i * 50} width={i === 3 ? 240 : 400} height={14} rx={7} fill="#cfc6b6" />)}
            <g transform={`translate(140 170) rotate(-14) scale(${klerp(2, 1, kprog(T, K.L + 1.2, K.L + 1.5, kEase.sale))})`} opacity={kprog(T, K.L + 1.2, K.L + 1.35)}>
              <circle r={80} fill="none" stroke={KC.red} strokeWidth={10} />
              <text y={18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.red}>1937</text>
            </g>
          </g>
          <path d="M 120 1140 L 400 1140" stroke={GASGRIS} strokeWidth={26} strokeLinecap="round" />
          <Olor T={T} x={420} y={1130} f={kprog(T, K.L + 1.8, K.L + 2.6)} n={2} alto={140} sep={40} />
        </SvgCapa>
        <Chip T={T} at={K.L + 0.5} until={K.J - 0.3} texto="ponerle olor al gas" y={1500} tam={44} borde={OLOR} />
      </Escena>
      {/* 8 · Japón: umbrales de olor (escala logarítmica) */}
      <Escena T={T} a={K.J} b={K.A2} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={escalaJ}>
            <rect x={60} y={600} width={960} height={570} rx={30} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={6} />
            <line x1={560} y1={yLog(1e4) + 10} x2={560} y2={yLog(1e-6)} stroke={KC.texto} strokeWidth={8} />
            {[3, 0, -3].map((p) => <g key={p}><line x1={540} x2={580} y1={yLog(Math.pow(10, p))} y2={yLog(Math.pow(10, p))} stroke={KC.texto} strokeWidth={5} />
              <text x={600} y={yLog(Math.pow(10, p)) + 10} style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.7)">{p === 3 ? '1,000 ppm' : p === 0 ? '1 ppm' : '0.001 ppm'}</text></g>)}
            <MolG tipo="propano" x={200} y={yLog(1500) + 20} s={0.55} rot={T * 10} />
            <line x1={300} x2={560} y1={yLog(1500)} y2={yLog(1500)} stroke={GASGRIS} strokeWidth={8} strokeDasharray="12 8" />
            <circle cx={560} cy={yLog(1500)} r={20} fill={GASGRIS} stroke={KC.ink} strokeWidth={5} />
            <MercaptanoBrilla T={T} x={200} y={yLog(8.7e-6) - 20} s={0.55} />
            <line x1={300} x2={560} y1={yLog(8.7e-6)} y2={yLog(8.7e-6)} stroke={KC.yellow} strokeWidth={8} strokeDasharray="12 8" />
            <circle cx={560} cy={yLog(8.7e-6)} r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <path d={`M 860 ${yLog(1500) + 30} L 860 ${klerp(yLog(1500) + 30, yLog(8.7e-6) - 30, kprog(T, K.J + 4.4, K.J + 5.6, kEase.suave))}`} stroke={KC.yellow} strokeWidth={12} strokeLinecap="round" />
          </g>
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.J + 0.2} until={K.J + 2.7} anio="2003" quien="Nagata · Japón" revista="umbrales de olor · bolsa triangular" y={760} />
        <Etq T={T} at={K.J + 3.2} until={K.A2 - 0.3} x={80} y={yLog(1500) - 60} texto="propano: 1,500 ppm" tam={30} color={KC.texto} lado="der" />
        <Etq T={T} at={K.J + 3.8} until={K.A2 - 0.3} x={80} y={yLog(8.7e-6) + 60} texto="etil mercaptano: 0.0000087 ppm" tam={28} color={KC.yellow} />
        <NumeroGigante T={T} at={K.J + 5.2} until={K.A2 - 0.3} valor={170} dur={1.2} prefijo="≈ " sufijo=" millones ×" etiqueta="menos para olerlo" y={1520} tam={96} color={KC.yellow} />
      </Escena>
      {/* 9 · si huele a gas (guía oficial CDMX) */}
      <Escena T={T} a={K.A2} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <TarjetaPaso T={T} at={K.A2 + 0.3} x={200} y={900} n="1" texto="cierra la llave">
            <rect x={-12} y={-80} width={24} height={150} fill={GASGRIS} stroke={KC.ink} strokeWidth={5} />
            <g transform={`translate(0 -20) rotate(${klerp(0, 90, kprog(T, K.A2 + 0.8, K.A2 + 1.3, kEase.sale))})`}><rect x={-70} y={-14} width={140} height={28} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>
          </TarjetaPaso>
          <TarjetaPaso T={T} at={K.A2 + 1.5} x={540} y={900} n="2" texto="abre ventanas">
            <rect x={-90} y={-100} width={180} height={180} fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-90} y={-100} width={90 * (1 - 0.6 * kprog(T, K.A2 + 1.9, K.A2 + 2.5))} height={180} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={5} />
            <rect x={90 - 90 * (1 - 0.6 * kprog(T, K.A2 + 1.9, K.A2 + 2.5))} y={-100} width={90 * (1 - 0.6 * kprog(T, K.A2 + 1.9, K.A2 + 2.5))} height={180} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={5} />
          </TarjetaPaso>
          <TarjetaPaso T={T} at={K.A2 + 2.7} x={880} y={900} n="3" texto="ni prendas ni apagues">
            <rect x={-60} y={-90} width={120} height={160} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-18} y={-44} width={36} height={70} rx={8} fill="#ddd" stroke={KC.ink} strokeWidth={5} />
            <Marca x={50} y={40} ok={false} s={0.5} o={kprog(T, K.A2 + 3.1, K.A2 + 3.4)} />
          </TarjetaPaso>
        </SvgCapa>
        <Chip T={T} at={K.A2 + 0.2} until={K.Ci - 0.2} texto="Guía oficial · Coyoacán, CDMX" y={1500} tam={34} borde={KC.ink} />
        <Chip T={T} at={K.A2 + 3.5} until={K.Ci - 0.2} texto="y repórtalo al 911" y={1610} tam={46} borde={KC.red} />
      </Escena>
      {/* 10 · cierre: la estufa del inicio, ahora con la alarma nombrada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Piso />
          <Estufa x={400} y={860} s={1} perilla={90} />
          <Manguera x0={610} y0={940} x1={880} y1={850} />
          <Cilindro x={900} y={1200} s={0.85} />
          <Olor T={T} x={290} y={820} f={1} alto={300} />
          <MercaptanoBrilla T={T} x={300} y={560} s={0.6} rot={Math.sin(T) * 15} o={kprog(T, K.Ci + 0.4, K.Ci + 1.0)} />
        </SvgCapa>
        <Chip T={T} at={K.Ci + 0.8} until={K.Ou} texto="etil mercaptano = la alarma" y={1500} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Ci + 2.0} until={K.Ou} texto="tu nariz = el detector" y={1600} tam={40} borde={OLOR} />
      </Escena>

      {/* textos del gancho y del "qué es" */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.9} texto="olor = gas" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.0} until={K.Q - 0.3} texto="🔔 alarma agregada" x={330} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Q + 0.4} until={K.A - 0.3} texto="NOM-016-CRE-2016: «esencialmente inodoro»" y={1500} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.A + 0.4} until={K.N - 0.3} texto="≈ 1 por cada 50 000 (esquema)" y={1500} tam={38} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es el gas: *es una alarma.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.A - 0.1} texto="Propano y butano: *casi sin olor.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.N - 0.1} texto="Le añaden *mercaptanos.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.P - 0.1} texto="Tu nariz *los cacha.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pr - 0.1} texto="Se junta *en el piso.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y si *no huele?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.L - 0.1} texto="1937: *gas sin olor.*" />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.J - 0.1} texto="Ley: *ponerle olor.*" />
      <Subtitulo T={T} idx={8} at={K.J + 0.1} until={K.A2 - 0.1} texto="*170 millones* de veces menos." />
      <Subtitulo T={T} idx={9} at={K.A2 + 0.1} until={K.Ci - 0.1} texto="Si huele: *cierra y ventila.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El detector *es tu nariz.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Aviso - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Aviso + 1.5, CUES.Nariz - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Piso + 0.5, CUES.Pregunta - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.5, CUES.Ley - 0.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Japon + 2.8, CUES.Aviso2 - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Aviso2 + 0.4, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gas /></CompositionStage></div>;
}
window.GasApp = GasApp;
