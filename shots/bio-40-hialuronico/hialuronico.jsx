// Shot Biotecnológico #40 · El ácido hialurónico de tu suero lo hizo una bacteria — NARRADO (N1 "Por dentro").
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala).
const GLCA = '#F4C25A', GLCNAC = '#00d2ff', AGUA = '#7fc8ff', ENZ = '#b18cff', PIEL = '#f1b48f', PIEL2 = '#d98f6b';
const HA_HILO = '#eaf6ff';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}
// Dorso de una mano (vista desde arriba), dedos hacia arriba.
function Mano({ x, y, s = 1 }) {
  const dedos = [[-120, -250, 64, 230, -8], [-40, -300, 66, 280, -3], [40, -290, 66, 270, 3], [115, -240, 60, 220, 9]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {dedos.map(([dx, dy, w, h, r], i) => <rect key={i} x={dx - w / 2} y={dy} width={w} height={h + 40} rx={w / 2} fill={PIEL} stroke={KC.ink} strokeWidth={9} transform={`rotate(${r} ${dx} ${dy + h})`} />)}
    <path d="M -175 -40 Q -270 -130 -300 -60 Q -310 0 -200 90" fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -190 -60 Q -200 160 -120 300 L 140 300 Q 210 140 175 -60 Q 0 -90 -190 -60 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    {[-110, -35, 40, 110].map((dx, i) => <path key={i} d={`M ${dx - 18} -70 q 18 -12 36 0`} stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <path d="M -100 220 L -60 300 M 100 220 L 70 300" stroke={PIEL2} strokeWidth={6} />
  </g>;
}
// Gotero de suero: frasco ámbar con pipeta y bulbo. etiqueta = texto de la etiqueta.
function Gotero({ x, y, s = 1, etiqueta = 'SUERO', etq2, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-95} y={-40} width={190} height={300} rx={36} fill="#c8742b" stroke={KC.ink} strokeWidth={10} />
    <rect x={-70} y={-20} width={36} height={240} rx={18} fill="rgba(255,255,255,.35)" />
    <rect x={-80} y={40} width={160} height={150} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={100} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    {etq2 && etq2.split('|').map((l, i) => <text key={i} x={0} y={140 + i * 28} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.teal}>{l}</text>)}
    <rect x={-56} y={-110} width={112} height={78} rx={14} fill="#2d2a28" stroke={KC.ink} strokeWidth={8} />
    <path d="M -44 -110 Q -54 -230 0 -240 Q 54 -230 44 -110 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Pipeta del gotero (separada para que suelte la gota).
function Pipeta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -44 -250 Q -54 -370 0 -380 Q 54 -370 44 -250 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <rect x={-56} y={-260} width={112} height={50} rx={12} fill="#2d2a28" stroke={KC.ink} strokeWidth={8} />
    <path d="M -22 -210 L -22 -40 Q 0 0 22 -40 L 22 -210 Z" fill="rgba(230,245,255,.85)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Gota espesa que cae.
function Gota({ x, y, r = 34, o = 1 }) {
  return <path d={`M ${x} ${y - r * 1.6} Q ${x + r} ${y - r * 0.2} ${x + r} ${y + r * 0.2} A ${r} ${r} 0 1 1 ${x - r} ${y + r * 0.2} Q ${x - r} ${y - r * 0.2} ${x} ${y - r * 1.6} Z`}
    fill="rgba(225,242,255,.92)" stroke={KC.ink} strokeWidth={6} opacity={o} />;
}
// Gallo de perfil (cabeza y pecho). brillo: la cresta se ilumina. gris: atenuado.
function Gallo({ x, y, s = 1, brillo = 0, gris = 0 }) {
  const cresta = mixHex('#e0262f', '#ff6b5a', brillo);
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter:`grayscale(${gris})` }} opacity={1 - gris * 0.35}>
    <path d="M -150 260 Q -190 60 -60 -10 Q 40 -60 80 20 Q 120 120 60 260 Z" fill="#f6eedf" stroke={KC.ink} strokeWidth={10} />
    <path d="M -150 260 Q -140 150 -60 120 Q 20 150 60 260 Z" fill="#c65a1e" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={20} cy={-30} rx={92} ry={80} fill="#f6eedf" stroke={KC.ink} strokeWidth={10} />
    <path d="M -60 -80 Q -70 -150 -30 -140 Q -20 -200 20 -170 Q 40 -220 70 -175 Q 110 -190 100 -130 Q 130 -110 90 -90 Z" fill={cresta} stroke={KC.ink} strokeWidth={9} />
    {brillo > 0 && <path d="M -60 -80 Q -70 -150 -30 -140 Q -20 -200 20 -170 Q 40 -220 70 -175 Q 110 -190 100 -130 Q 130 -110 90 -90 Z" fill="none" stroke={KC.yellow} strokeWidth={14 * brillo} opacity={0.7} />}
    <path d="M 105 -40 L 170 -18 L 105 4 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 85 10 Q 110 80 70 90 Q 50 60 70 12 Z" fill="#e0262f" stroke={KC.ink} strokeWidth={7} />
    <circle cx={50} cy={-45} r={13} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={54} cy={-45} r={6} fill={KC.ink} />
  </g>;
}
// Silueta de persona (frente) con puntos encendidos: piel (brazo), articulación (rodilla) y ojo.
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={95} fill="#ffd9c0" stroke={KC.ink} strokeWidth={10} />
    <circle cx={-34} cy={-340} r={16} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={34} cy={-340} r={16} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-34} cy={-340} r={7} fill={KC.ink} /><circle cx={34} cy={-340} r={7} fill={KC.ink} />
    <path d="M -36 -290 Q 0 -270 36 -290" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -130 -220 Q 0 -250 130 -220 L 150 40 L -150 40 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={10} />
    <path d="M -130 -210 Q -220 -80 -230 60" stroke="#ffd9c0" strokeWidth={56} strokeLinecap="round" fill="none" />
    <path d="M -130 -210 Q -220 -80 -230 60" stroke={KC.ink} strokeWidth={66} strokeLinecap="round" fill="none" opacity={0} />
    <path d="M 130 -210 Q 220 -80 230 60" stroke="#ffd9c0" strokeWidth={56} strokeLinecap="round" fill="none" />
    <path d="M -120 40 L -100 420 M 120 40 L 100 420" stroke="#3a3f6b" strokeWidth={80} strokeLinecap="round" />
  </g>;
}
// Punto que late para señalar un sitio del cuerpo.
function PuntoLate({ T, x, y, at, color = KC.yellow }) {
  const e = kprog(T, at, at + 0.35, kEase.rebote); if (e <= 0) return null;
  const late = 1 + 0.25 * Math.max(0, Math.sin((T - at) * 6));
  return <g><circle cx={x} cy={y} r={34 * e * late} fill="none" stroke={color} strokeWidth={8} /><circle cx={x} cy={y} r={14 * e} fill={color} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Un azúcar del hialurónico: hexágono. tipo 0 = ácido glucurónico (dorado), 1 = N-acetilglucosamina (cian, con colita).
function Azucar({ x, y, r = 22, tipo = 0, rot = 0, o = 1 }) {
  const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i + Math.PI / 6; return `${Math.cos(a) * r},${Math.sin(a) * r}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <polygon points={pts} fill={tipo ? GLCNAC : GLCA} stroke={KC.ink} strokeWidth={Math.max(2, r / 7)} />
    {tipo ? <line x1={r * 0.9} y1={0} x2={r * 1.5} y2={-r * 0.5} stroke={KC.ink} strokeWidth={Math.max(2, r / 8)} /> : null}
  </g>;
}
// Cadena de hialurónico a lo largo de una curva: n piezas alternadas que salen desde (x0,y0) hacia arriba ondulando.
function CadenaHA({ T, x0, y0, n = 10, paso = 46, r = 20, amp = 30, dir = -1, fase = 0, o = 1 }) {
  const P = [];
  for (let i = 0; i < n; i++) { const yy = y0 + dir * i * paso, xx = x0 + Math.sin(i * 0.7 + T * 1.6 + fase) * amp * Math.min(1, i / 3); P.push([xx, yy]); }
  return <g opacity={o}>
    {P.length > 1 && <polyline points={P.map((p) => p.join(',')).join(' ')} fill="none" stroke={HA_HILO} strokeWidth={6} />}
    {P.map(([xx, yy], i) => <Azucar key={i} x={xx} y={yy} r={r} tipo={i % 2} rot={i * 20} />)}
  </g>;
}
// Molécula de agua esquemática.
function MolAgua({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <circle r={16} fill={AGUA} stroke={KC.ink} strokeWidth={3} />
    <circle cx={-15} cy={11} r={8} fill="#fff" stroke={KC.ink} strokeWidth={2.5} /><circle cx={15} cy={11} r={8} fill="#fff" stroke={KC.ink} strokeWidth={2.5} />
  </g>;
}
// Membrana de la bacteria en corte (bicapa) con la enzima (hialuronano sintasa) como poro.
function Membrana({ T, y, x0 = -40, x1 = 1120, poro = 540 }) {
  const cabezas = [];
  for (let x = x0; x < x1; x += 34) { if (Math.abs(x - poro) < 70) continue; const d = mece(T, x, 0.4) * 3;
    cabezas.push(<g key={x}><line x1={x} y1={y - 26 + d} x2={x} y2={y - 4} stroke="#d9c7a0" strokeWidth={4} /><line x1={x} y1={y + 4} x2={x} y2={y + 26 + d} stroke="#d9c7a0" strokeWidth={4} />
      <circle cx={x} cy={y - 32 + d} r={13} fill={KC.coral} stroke={KC.ink} strokeWidth={3} /><circle cx={x} cy={y + 32 + d} r={13} fill={KC.coral} stroke={KC.ink} strokeWidth={3} /></g>); }
  return <g>{cabezas}
    <rect x={poro - 66} y={y - 70} width={132} height={140} rx={40} fill={ENZ} stroke={KC.ink} strokeWidth={7} />
    <rect x={poro - 22} y={y - 72} width={44} height={144} rx={20} fill="#3b2470" />
  </g>;
}
// Cadenita de estreptococos (cocos en fila) con su capa de hialurónico (halo ondulado).
function Estreptococos({ T, x, y, n = 5, r = 40, color = '#ffb4c8', capa = 1, rot = 0, s = 1, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {capa > 0 && Array.from({ length: n }, (_, i) => { const cx = (i - (n - 1) / 2) * r * 1.8;
      const pts = Array.from({ length: 28 }, (_, k) => { const a = k / 28 * Math.PI * 2, rr = r * 1.75 + Math.sin(a * 5 + T * 2 + i + seed) * 7; return `${cx + Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(' ');
      return <polygon key={'c' + i} points={pts} fill="rgba(234,246,255,.22)" stroke={HA_HILO} strokeWidth={4} strokeDasharray="10 7" opacity={capa} />; })}
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={(i - (n - 1) / 2) * r * 1.8} cy={Math.sin(i + seed) * 4} r={r} fill={color} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Glóbulo blanco (fagocito): célula grande con núcleo de lóbulos y "brazos" (seudópodos).
function GlobuloBlanco({ T, x, y, s = 1 }) {
  const pts = Array.from({ length: 40 }, (_, k) => { const a = k / 40 * Math.PI * 2, rr = 150 + Math.sin(a * 4 + T * 2.4) * 18 + Math.sin(a * 7 - T * 1.7) * 8; return `${Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points={pts} fill="#e8e1ff" stroke={KC.ink} strokeWidth={7} />
    {[[-40, -20], [20, -40], [40, 30], [-20, 40]].map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r={38} fill="#8a63d2" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Señal de alerta.
function Alerta({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -90 L 90 70 L -90 70 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-9} y={-40} width={18} height={66} rx={8} fill={KC.ink} /><circle cx={0} cy={46} r={11} fill={KC.ink} />
  </g>;
}
// Palomita.
function Palomita({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.sale(p)})`}>
    <circle r={70} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
    <path d="M -34 2 L -8 28 L 38 -26" fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Piel en corte (para la Lupa): capa córnea de ladrillos arriba, epidermis viva, dermis rosada.
function PielCorte({ T, w, h, largas = 1, cortas = 1, t0 = 0 }) {
  const cor = h * 0.3, epi = h * 0.55;
  return <g>
    <rect width={w} height={h} fill="#0b1220" />
    <rect y={cor} width={w} height={epi - cor} fill="#f3c6a8" />
    <rect y={epi} width={w} height={h - epi} fill="#e7918f" />
    {Array.from({ length: 4 }, (_, f) => Array.from({ length: 9 }, (_, c) => <rect key={f + '-' + c} x={(c - 0.5 + (f % 2) * 0.5) * (w / 8)} y={cor - 22 - f * 22} width={w / 8 - 6} height={18} rx={6} fill="#f7e2cf" stroke="#b07a5a" strokeWidth={2.5} />))}
    {Array.from({ length: 10 }, (_, c) => <circle key={c} cx={(c + 0.5) * (w / 10)} cy={cor + 34 + (c % 2) * 26} r={20} fill="#f6d3bb" stroke="#c48b6d" strokeWidth={3} />)}
    {/* hialurónico grande: se queda arriba */}
    {Array.from({ length: 3 }, (_, i) => <g key={'L' + i} opacity={largas}>
      <CadenaHA T={T} x0={w * (0.18 + i * 0.32)} y0={cor - 112} n={6} paso={0} r={11} amp={0} />
      {Array.from({ length: 7 }, (_, k) => <Azucar key={k} x={w * (0.06 + i * 0.32) + k * 22} y={cor - 112 + Math.sin(k + T * 2 + i) * 8} r={10} tipo={k % 2} />)}
    </g>)}
    {/* hialurónico chico: algunas piezas bajan un poco */}
    {Array.from({ length: 5 }, (_, i) => { const baja = kprog(T, t0 + 1 + i * 0.25, t0 + 3 + i * 0.25, kEase.suave);
      return <g key={'C' + i} opacity={cortas}><Azucar x={w * (0.12 + i * 0.19)} y={klerp(cor - 120, cor + 10 + (i % 2) * 30, baja)} r={9} tipo={0} /><Azucar x={w * (0.12 + i * 0.19) + 18} y={klerp(cor - 120, cor + 10 + (i % 2) * 30, baja)} r={9} tipo={1} /></g>; })}
  </g>;
}

function Hialuronico() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tu: CUES.Tuyo, Ga: CUES.Gallo, Ta: CUES.Tanque, En: CUES.Enzima, Hi: CUES.Hilo, Ag: CUES.Agua, Pr: CUES.Pregunta,
    Ca: CUES.Capa, Ri: CUES.Riesgo, Es: CUES.Estudio, Cr: CUES.Crema, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const V = MUNDO_BIORREACTOR.ventana;
  // gota del gancho: cae del gotero a la mano
  const caeG = kprog(T, K.G + 0.05, K.G + 0.8, (p) => p * p);
  const R = krng(9);
  const aguas = Array.from({ length: 26 }, () => [80 + R() * 920, 560 + R() * 700, R() * 360, R() * 6]);
  const hilos = Array.from({ length: 6 }, (_, i) => [140 + i * 160, 1250 - (i % 2) * 80]);
  // estudio: el gen salta
  const salta = kprog(T, K.Es + 3.4, K.Es + 4.6, kEase.suave);
  const genX = klerp(270, 760, salta), genY = klerp(1040, 1000, salta) - Math.sin(salta * Math.PI) * 220;
  // glóbulo blanco que se acerca y se resbala
  const acerca = kprog(T, K.Ca + 0.2, K.Ca + 2.0, kEase.suave), resbala = kprog(T, K.Ca + 2.2, K.Ca + 3.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la gota de suero sobre la mano; el gallo con "?" y la bacteria con su halo */}
      <Escena T={T} a={K.G} b={K.Tu} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Mano x={540} y={1280} s={1.05} />
          <Gotero x={300} y={880} s={0.8} rot={-8} />
          {caeG < 1 ? <Gota x={560} y={klerp(700, 1080, caeG)} r={30} /> : <ellipse cx={560} cy={1100} rx={70 + Math.sin(T * 3) * 4} ry={26} fill="rgba(225,242,255,.9)" stroke={KC.ink} strokeWidth={5} />}
          <Pipeta x={560} y={klerp(700, 690, caeG)} s={0.8} />
          <g opacity={kprog(T, K.G + 0.6, K.G + 1.1)}><Gallo x={170} y={600} s={0.62} gris={0.8} />
            <text x={300} y={520} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>?</text></g>
          <g opacity={kprog(T, K.G + 1.6, K.G + 2.2)} transform={`translate(0 ${(1 - kprog(T, K.G + 1.6, K.G + 2.2, kEase.sale)) * 60})`}>
            <Estreptococos T={T} x={840} y={1000} n={3} r={36} color={KC.mint} rot={-20} />
          </g>
        </SvgCapa>
      </Escena>
      {/* 1 · tú ya lo traes */}
      <Escena T={T} a={K.Tu} b={K.Ga} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Persona x={540} y={1060} s={1.15} />
          <PuntoLate T={T} x={540 - 39} y={1060 - 391} at={K.Tu + 2.9} />
          <PuntoLate T={T} x={540 - 248} y={1060 - 70} at={K.Tu + 1.6} />
          <PuntoLate T={T} x={420} y={1460} at={K.Tu + 2.3} />
        </SvgCapa>
      </Escena>
      {/* 2 · crestas de gallo */}
      <Escena T={T} a={K.Ga} b={K.Ta} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Gallo x={400} y={950} s={1.5} brillo={kprog(T, K.Ga + 0.6, K.Ga + 1.2) * (0.6 + 0.4 * Math.sin(T * 8))} />
          <FlechaCurva x1={520} y1={640} x2={850} y2={880} p={kprog(T, K.Ga + 1.0, K.Ga + 1.8)} color={KC.ink} curva={-90} />
          <g opacity={kprog(T, K.Ga + 1.5, K.Ga + 2.0)}>
            <rect x={760} y={900} width={180} height={230} rx={24} fill="rgba(240,230,210,.9)" stroke={KC.ink} strokeWidth={9} />
            <rect x={780} y={870} width={140} height={40} rx={10} fill="#8b6b4a" stroke={KC.ink} strokeWidth={7} />
            <rect x={780} y={980} width={140} height={80} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
            <text x={850} y={1032} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>antes</text>
          </g>
        </SvgCapa>
      </Escena>
      {/* 3–5 · el tanque, y la Lupa: la enzima en la membrana y el hilo */}
      <Escena T={T} a={K.Ta} b={K.Ag} zoom={0.04}>
        <MundoBiorreactor T={T} turbio={klerp(0.3, 0.85, kprog(T, K.Ta, K.Hi, kEase.suave))} burbujas={1} rpm={110} fondo={KC.cyan} />
      </Escena>
      <Lupa T={T} at={K.En + 0.1} until={K.Ag - 0.2} x={540} y={760} r={330} fx={V.x} fy={V.y} tinte={KC.lilac} etiqueta="AL MICROSCOPIO · la bacteria"
        interior={(t, r) => { const n = Math.min(14, Math.floor(kprog(t, K.En + 0.6, K.Hi + 2.8) * 14));
          return <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#07131d" />
            <rect y={r * 1.12} width={r * 2} height={r} fill="#14283a" />
            <text x={r * 1.55} y={r * 1.7} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#9fb3c8">adentro</text>
            <text x={r * 1.55} y={r * 0.42} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#9fb3c8">afuera</text>
            <g transform={`translate(${r - 540 * 0.9} 0) scale(0.9)`}><Membrana T={t} y={r * 1.12 / 0.9} poro={540} /></g>
            {/* azúcares sueltos adentro que van hacia la enzima */}
            {Array.from({ length: 6 }, (_, i) => { const ph = ((t * 0.5 + i / 6) % 1); return <Azucar key={i} x={klerp(i % 2 ? r * 1.9 : r * 0.1, r, ph)} y={klerp(r * 1.85, r * 1.2, ph)} r={18} tipo={i % 2} rot={t * 40 + i * 30} o={1 - ph * 0.6} />; })}
            {/* la cadena sale hacia afuera por el poro */}
            <CadenaHA T={t} x0={r} y0={r * 0.98} n={n} paso={34} r={16} amp={34} />
          </svg>; }} />
      {/* 6 · el hilo se enreda y atrapa agua */}
      <Escena T={T} a={K.Ag} b={K.Pr} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {hilos.map(([x, y], i) => <CadenaHA key={i} T={T} x0={x} y0={y} n={Math.round(klerp(5, 15, kprog(T, K.Ag, K.Ag + 1.5)))} paso={44} r={15} amp={70} fase={i * 1.7} />)}
          {aguas.map(([x, y, r, p], i) => { const atrapa = kprog(T, K.Ag + 1.0 + (i % 8) * 0.12, K.Ag + 2.2 + (i % 8) * 0.12, kEase.suave);
            const dx = Math.sin(T * 2 + p) * klerp(80, 6, atrapa), dy = Math.cos(T * 1.6 + p) * klerp(80, 6, atrapa);
            return <MolAgua key={i} x={x + dx} y={y + dy} s={1.1} rot={r + T * 30 * (1 - atrapa)} />; })}
          <rect x={0} y={0} width={KW} height={KH} fill={`rgba(127,200,255,${0.16 * kprog(T, K.Ag + 2.0, K.Ag + 3.2)})`} />
        </SvgCapa>
      </Escena>
      {/* 7 · ¿para qué la quiere una bacteria? */}
      <Escena T={T} a={K.Pr} b={K.Ca} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Estreptococos T={T} x={300} y={1000} n={3} r={58} color={KC.mint} rot={-60} />
          <text x={300} y={740} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 640)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 8 · la capa protege de tus defensas */}
      <Escena T={T} a={K.Ca} b={K.Ri} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Estreptococos T={T} x={560} y={960} n={5} r={44} color="#ffb4c8" rot={-8} />
          <GlobuloBlanco T={T} x={klerp(-200, 210, acerca) - resbala * 60} y={klerp(820, 860, acerca) - resbala * 260} s={1.05} />
          {resbala > 0 && resbala < 1 && <path d={`M 380 900 q -60 -80 -160 -160`} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="12 10" opacity={1 - resbala} />}
        </SvgCapa>
      </Escena>
      {/* 9 · el más usado puede enfermar */}
      <Escena T={T} a={K.Ri} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Estreptococos T={T} x={540} y={980} n={5} r={52} color="#ffb4c8" rot={6} />
          <Alerta x={540} y={1550} s={1.1} o={kprog(T, K.Ri + 2.2, K.Ri + 2.6)} />
        </SvgCapa>
      </Escena>
      {/* 10 · 2005: el gen de la enzima pasa a Bacillus subtilis */}
      <Escena T={T} a={K.Es} b={K.Cr} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, K.Es + 2.8, K.Es + 3.2)}>
            <Estreptococos T={T} x={270} y={1040} n={3} r={42} color={KC.lilac} rot={-70} capa={0.6} seed={4} />
            <g transform={`translate(${760} ${1000})`}>
              <Bacteria T={T} x={0} y={0} largo={360} ancho={130} rot={-10} color="#ffe08a" seed={3} />
            </g>
            {salta < 1 ? <g transform={`translate(${genX} ${genY})`}><ADNHebra T={T} x={-70} y={0} largo={140} alto={34} vueltas={2} colores={[KC.pink, KC.yellow]} /></g> : null}
            {salta >= 1 && Array.from({ length: 3 }, (_, i) => <CadenaHA key={i} T={T} x0={760 + (i - 1) * 120} y0={900} n={Math.round(klerp(1, 8, kprog(T, K.Es + 4.8 + i * 0.2, K.Es + 6.4)))} paso={34} r={13} amp={24} fase={i * 2} />)}
            <Palomita x={930} y={1500} p={kprog(T, K.Es + 5.6, K.Es + 6.0)} />
          </g>
        </SvgCapa>
      </Escena>
      {/* 11 · 2015: la piel donada por dentro */}
      <Escena T={T} a={K.Cr} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Mano x={540} y={1380} s={1.05} />
          <ellipse cx={540} cy={1190} rx={90} ry={30} fill="rgba(225,242,255,.9)" stroke={KC.ink} strokeWidth={5} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Cr + 0.4} until={K.Ci - 0.2} x={620} y={780} r={290} fx={540} fy={1190} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · piel"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><PielCorte T={t} w={r * 2} h={r * 2} t0={K.Cr + 0.4} /></svg>} />
      {/* 12 · cierre: el gotero del inicio, ya con su etiqueta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Mano x={540} y={1280} s={1.05} />
          <Gotero x={540} y={900} s={1.0} etiqueta="SUERO" etq2={kprog(T, K.Ci + 0.8, K.Ci + 1.2) > 0.5 ? 'hecho por|bacterias' : ''} />
          <g transform={`translate(${klerp(1160, 860, kprog(T, K.Ci + 1.4, K.Ci + 2.2, kEase.sale))} 1060)`}><Bacteria T={T} x={0} y={0} largo={200} ancho={80} rot={-30} color="#ffe08a" seed={5} /></g>
        </SvgCapa>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.Tu + 0.4} until={K.Ga - 0.3} texto="ácido hialurónico" x={540} y={1730} tam={50} borde={GLCA} />
      <Etq T={T} at={K.Tu + 1.7} until={K.Ga - 0.3} x={540 - 248 + 40} y={1060 - 70} texto="piel" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Tu + 2.4} until={K.Ga - 0.3} x={460} y={1460} texto="articulaciones (rodilla)" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Tu + 3.0} until={K.Ga - 0.3} x={540 + 40} y={1060 - 391} texto="ojo (humor vítreo)" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ga + 0.4} until={K.Ta - 0.2} texto="antes: cresta de gallo" x={540} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Ta + 0.4} until={K.En - 0.1} texto="hoy: fermentación" x={540} y={1690} tam={46} borde={KC.mint} />
      <Etq T={T} at={K.En + 1.4} until={K.Hi - 0.1} x={610} y={800} texto="una sola enzima" tam={30} color={KC.texto} />
      <Chip T={T} at={K.En + 2.2} until={K.Ag - 0.3} texto="ácido glucurónico + N-acetilglucosamina" x={540} y={1490} tam={30} borde={GLCA} />
      <Chip T={T} at={K.Ag + 0.8} until={K.Pr - 0.3} texto="atrapa agua" x={540} y={470} tam={52} borde={AGUA} />
      <Etq T={T} at={K.Ca + 0.6} until={K.Ri - 0.3} x={420} y={1110} texto="capa de hialurónico" tam={30} color={HA_HILO} />
      <Etq T={T} at={K.Ca + 1.2} until={K.Ri - 0.3} x={40} y={1090} texto="glóbulo blanco" lado="der" tam={32} color="#e8e1ff" />
      <Etq T={T} at={K.Ri + 0.6} until={K.Es - 0.2} x={160} y={1120} texto="Streptococcus zooepidemicus" it lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ri + 0.4} until={K.Es - 0.2} texto="el más usado en las fábricas" x={650} y={470} tam={40} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.4} anio="2005" quien="Novozymes · Davis, California" revista="Appl Environ Microbiol · Widner et al." x={540} y={820} />
      <Etq T={T} at={K.Es + 3.0} until={K.Cr - 0.2} x={330} y={860} texto="S. equisimilis" it lado="der" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.2} until={K.Cr - 0.2} x={600} y={1125} texto="Bacillus subtilis" it lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Es + 3.4} until={K.Cr - 0.2} texto="gen de la enzima (hasA)" x={420} y={470} tam={40} borde={KC.pink} />
      <Chip T={T} at={K.Es + 5.6} until={K.Cr - 0.2} texto="no enferma · buena calidad" x={500} y={1500} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Cr + 0.3} until={K.Ci - 0.2} texto="2015 · Reims, Francia · piel en laboratorio" x={540} y={1500} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Cr + 1.4} until={K.Ci - 0.2} texto="cadena grande: se queda arriba" x={540} y={1640} tam={32} borde={GLCA} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="lo más probable: hecho por bacterias" x={540} y={1690} tam={36} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Tu - 0.1} texto="No salió de un gallo: *quizá de una bacteria.*" />
      <Subtitulo T={T} idx={1} at={K.Tu + 0.1} until={K.Ga - 0.1} texto="Tú ya lo traes: *piel, articulaciones, ojo.*" />
      <Subtitulo T={T} idx={2} at={K.Ga + 0.1} until={K.Ta - 0.1} texto="Antes: *crestas de gallo.*" />
      <Subtitulo T={T} idx={3} at={K.Ta + 0.1} until={K.En - 0.1} texto="Hoy: *tanques con bacterias.*" />
      <Subtitulo T={T} idx={4} at={K.En + 0.1} until={K.Hi - 0.1} texto="Una enzima une *dos azúcares.*" />
      <Subtitulo T={T} idx={5} at={K.Hi + 0.1} until={K.Ag - 0.1} texto="Sale como *un hilo larguísimo.*" />
      <Subtitulo T={T} idx={6} at={K.Ag + 0.1} until={K.Pr - 0.1} texto="Se enreda y *atrapa agua.*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="¿Y para qué *lo quiere una bacteria?*" />
      <Subtitulo T={T} idx={8} at={K.Ca + 0.1} until={K.Ri - 0.1} texto="Es su capa: *la protege.*" />
      <Subtitulo T={T} idx={9} at={K.Ri + 0.1} until={K.Es - 0.1} texto="El más usado *puede enfermar.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Cr - 0.1} texto="2005: el gen pasó a *Bacillus subtilis.*" />
      <Subtitulo T={T} idx={11} at={K.Cr + 0.1} until={K.Ci - 0.1} texto="El grande *no cruzó la piel.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es el *abrigo de una bacteria.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tuyo + 0.9, CUES.Gallo - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Tanque + 0.3, CUES.Enzima - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Agua + 0.5, CUES.Pregunta - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Capa - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Capa + 0.5, CUES.Riesgo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Riesgo + 0.4, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 3.0, CUES.Crema - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Crema + 1.2, CUES.Cierre - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="40" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HialuronicoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hialuronico /></CompositionStage></div>;
}
window.HialuronicoApp = HialuronicoApp;
