// Shot Químico #55 · Ese polvo no es un solo truco (polvo para hornear de doble acción) — NARRADO (N1 por dentro + N3 capítulos y medidores).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const MASA = '#f6d48a', MASA_COCIDA = '#e9b765', COSTRA = '#b8742f', TAZON = '#ff6b5a';
const C_BIC = '#ffffff', C_A1 = '#4aa8ff', C_A2 = '#9b5de5', C_FEC = '#f3e3b3';

// ---------- piezas de cocina ----------
function Tazon({ x, y, s = 1, masa = MASA, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -270 -60 L 270 -60 Q 262 170 0 190 Q -262 170 -270 -60 Z" fill={TAZON} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -200 40 Q -150 120 -60 140" stroke="rgba(255,255,255,.45)" strokeWidth={14} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={-60} rx={262} ry={52} fill={masa} stroke={KC.ink} strokeWidth={9} />
    {children}
  </g>;
}
function Lata({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-115} y={-170} width={230} height={330} rx={18} fill="#e23b3b" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-170} rx={115} ry={24} fill="#d8dde3" stroke={KC.ink} strokeWidth={8} />
    <rect x={-95} y={-110} width={190} height={190} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-62} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>POLVO PARA</text>
    <text x={0} y={-18} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>HORNEAR</text>
    <rect x={-82} y={8} width={164} height={50} rx={25} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={42} textAnchor="middle" style={{ font:`900 25px ${KF.texto}` }} fill={KC.ink}>doble acción</text>
  </g>;
}
function Cuchara({ x, y, rot = 0, s = 1, carga = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-250} y={-14} width={210} height={28} rx={14} fill="#c9ced6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={20} cy={0} rx={75} ry={48} fill="#dfe3e8" stroke={KC.ink} strokeWidth={8} />
    {carga > 0 && <path d={`M -40 -6 Q 20 ${-6 - 50 * carga} 80 -6 Z`} fill="#fbfbfb" stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
// Granitos del polvo (esquemáticos). tipo: bic · a1 · a2 · fec
function Granito({ x, y, r = 34, tipo = 'bic', rot = 0, o = 1, brillo = 0 }) {
  if (o <= 0) return null;
  let forma;
  if (tipo === 'bic') forma = <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={r * 0.3} fill={C_BIC} stroke={KC.ink} strokeWidth={5} />;
  else if (tipo === 'a1') forma = <circle r={r} fill={C_A1} stroke={KC.ink} strokeWidth={5} />;
  else if (tipo === 'a2') forma = <path d={Array.from({ length: 6 }, (_, k) => `${k ? 'L' : 'M'} ${r * 1.1 * Math.cos(k * Math.PI / 3)} ${r * 1.1 * Math.sin(k * Math.PI / 3)}`).join(' ') + ' Z'} fill={C_A2} stroke={KC.ink} strokeWidth={5} />;
  else forma = <ellipse rx={r * 1.15} ry={r * 0.85} fill={C_FEC} stroke={KC.ink} strokeWidth={5} />;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {brillo > 0 && <circle r={r * (1.6 + brillo * 0.6)} fill={KC.yellow} opacity={0.35 * brillo} />}
    {forma}
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.22} fill="#fff" opacity={0.5} />
  </g>;
}
// Molde con pan/pastel que sube. h 0..1 (cuánto subió), cocido 0..1 (color), poros 0..1 (esponja)
function Pastel({ T, x, y, s = 1, h = 0, cocido = 0, poros = 0, seed = 4, molde = true }) {
  const top = -40 - 190 * h;
  const R = krng(seed);
  const pores = Array.from({ length: 22 }, () => [(R() - 0.5) * 360, R(), 6 + R() * 14]);
  const relleno = mixHex(MASA, MASA_COCIDA, cocido);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -200 0 L -200 ${top + 40} Q -200 ${top - 10} -120 ${top - 14} Q 0 ${top - 40} 120 ${top - 14} Q 200 ${top - 10} 200 ${top + 40} L 200 0 Z`} fill={relleno} stroke={KC.ink} strokeWidth={8} />
    {cocido > 0 && <path d={`M -200 ${top + 40} Q -200 ${top - 10} -120 ${top - 14} Q 0 ${top - 40} 120 ${top - 14} Q 200 ${top - 10} 200 ${top + 40}`} fill="none" stroke={COSTRA} strokeWidth={22 * cocido} opacity={cocido} />}
    {poros > 0 && pores.map(([px, py, pr], i) => <circle key={i} cx={px} cy={klerp(-14, top + 30, py)} r={pr * (0.5 + h * 0.6)} fill="rgba(140,90,30,.35)" opacity={poros} />)}
    {molde && <path d="M -224 -60 L -210 40 L 210 40 L 224 -60" fill="none" stroke="#7d848f" strokeWidth={22} strokeLinejoin="round" />}
    {molde && <path d="M -224 -60 L -210 40 L 210 40 L 224 -60" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
  </g>;
}
function Horno({ x, y, s = 1, calor = 0, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-360} y={-330} width={720} height={640} rx={30} fill="#eae6df" stroke={KC.ink} strokeWidth={10} />
    <rect x={-360} y={-330} width={720} height={90} rx={30} fill="#3a3f48" stroke={KC.ink} strokeWidth={10} />
    {[-240, -120, 120, 240].map((dx) => <circle key={dx} cx={dx} cy={-285} r={24} fill="#d8dde3" stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-290} y={-200} width={580} height={420} rx={22} fill={mixHex('#2b2f36', '#7a3410', calor)} stroke={KC.ink} strokeWidth={9} />
    <rect x={-270} y={-180} width={540} height={380} rx={16} fill={`rgba(255,${Math.round(150 - 40 * calor)},40,${0.35 * calor})`} />
    {children}
    <rect x={-240} y={250} width={480} height={26} rx={13} fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Termómetro vertical (SVG). v = °C mostrados, f = 0..1 llenado.
function Termometro({ x, y, alto = 520, f = 0, v = 22, color = KC.red }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-alto} width={60} height={alto} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-16} y={-alto * (0.1 + 0.85 * f)} width={32} height={alto * (0.1 + 0.85 * f)} rx={16} fill={color} />
    <circle cx={0} cy={20} r={52} fill={color} stroke={KC.ink} strokeWidth={8} />
    {[0.25, 0.5, 0.75].map((m) => <line key={m} x1={30} x2={52} y1={-alto * m} y2={-alto * m} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-80} y={-alto - 92} width={160} height={70} rx={16} fill={KC.dark} stroke={KC.texto} strokeWidth={4} />
    <text x={0} y={-alto - 42} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto}>{Math.round(v)} °C</text>
  </g>;
}
function Batidor({ T, x, y, s = 1 }) {
  const g = Math.sin(T * 22);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-330} width={28} height={170} rx={12} fill="#3a3f48" stroke={KC.ink} strokeWidth={6} />
    {[1, 0.6, 0.25].map((k, i) => <ellipse key={i} cx={0} cy={-80} rx={Math.abs(70 * k * g) + 6} ry={90} fill="none" stroke="#c9ced6" strokeWidth={9} />)}
    {[1, 0.6, 0.25].map((k, i) => <ellipse key={'b' + i} cx={0} cy={-80} rx={Math.abs(70 * k * g) + 6} ry={90} fill="none" stroke={KC.ink} strokeWidth={2.5} />)}
  </g>;
}
function Bascula({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-190} y={-20} width={380} height={130} rx={24} fill="#eae6df" stroke={KC.ink} strokeWidth={9} />
    <rect x={-210} y={-50} width={420} height={36} rx={14} fill="#c9ced6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={20} width={180} height={60} rx={10} fill={KC.dark} />
    <text x={0} y={62} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.mint}>100 %</text>
  </g>;
}
// Burbuja de aire en la masa (micro). r crece con el CO₂.
function BurbujaMasa({ x, y, r }) {
  return <g><circle cx={x} cy={y} r={r} fill="rgba(255,255,255,.10)" stroke="#ffe7a8" strokeWidth={5} /><circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.15} fill="#fff" opacity={0.5} /></g>;
}
// Polvo que cae de la cuchara al tazón.
function CaePolvo({ T, a, b, x0, y0, x1, y1, n = 26 }) {
  if (T < a || T > b + 0.8) return null;
  const R = krng(11);
  return <g>{Array.from({ length: n }, (_, i) => { const t0 = a + (i / n) * (b - a), u = (T - t0) / 0.6; if (u < 0 || u > 1) return null;
    const dx = (R() - 0.5) * 60;
    return <circle key={i} cx={klerp(x0, x1 + dx, u)} cy={klerp(y0, y1, u * u)} r={5 + R() * 6} fill="#fff" stroke="rgba(0,0,0,.35)" strokeWidth={2} />; })}</g>;
}
function Nubecita({ T, at, x, y, f = 1 }) {
  const u = kprog(T, at, at + 1.2, kEase.sale);
  if (u <= 0 || u >= 1) return null;
  return <g opacity={(1 - u) * f}>{[[-60, 0], [0, -30], [60, 0], [-30, 20], [30, 20]].map(([dx, dy], i) => <circle key={i} cx={x + dx * (1 + u)} cy={y + dy - u * 60} r={34 + u * 40} fill="#fff" opacity={0.75} />)}</g>;
}

function Polvo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, A: CUES.Agua, Bu: CUES.Burbujas, Pr: CUES.Pregunta, H: CUES.Horno, Es: CUES.Estudio, Cu: CUES.Cuaja, No: CUES.Norma, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // gancho: la cuchara vuelca desde el cuadro 0
  const vuelca = kprog(T, K.G, K.G + 0.5, kEase.sale);
  // escena micro (Agua → Pregunta): reacción del ácido 1
  const gota = kprog(T, K.A + 0.1, K.A + 0.8, kEase.suave);
  const disuelve = kprog(T, K.A + 0.9, K.A + 2.0);
  const sale = kprog(T, K.A + 2.0, K.A + 3.2, kEase.sale);
  const crece = kprog(T, K.Bu, K.Bu + 2.2, kEase.suave);
  // horno
  const calor = kprog(T, K.H + 0.6, K.H + 2.0);
  const tempH = klerp(22, 80, kprog(T, K.H + 0.8, K.Es - 0.4, kEase.suave));
  const subeH = kprog(T, K.H + 2.4, K.Es - 0.3, kEase.suave);
  // estudio
  const mitadEs = K.Es + 4.6;
  // cuaja
  const tempC = klerp(65, 88, kprog(T, K.Cu + 0.3, K.Cu + 3.2, kEase.suave));
  const cuaja = kprog(T, K.Cu + 3.0, K.Cu + 4.2, kEase.suave);
  const R = krng(9);
  const burb = Array.from({ length: 9 }, () => [140 + R() * 800, 820 + R() * 360, 30 + R() * 30]);
  const R2 = krng(12);
  const granos = Array.from({ length: 16 }, (_, i) => [['bic', 'a1', 'a2', 'fec'][i % 4], 350 + R2() * 380, 720 + R2() * 380, R2() * 360]);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cucharada cae al tazón */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Lata x={190} y={760} s={0.85} rot={-6} />
          <Tazon x={560} y={1060} s={1.15}>
            {T > K.G + 0.6 && [[-60, -70], [40, -60], [110, -72], [-130, -58]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={36} ry={10} fill="#fff" opacity={1 - kprog(T, K.G + 3.5, K.G + 5)} />)}
          </Tazon>
          <CaePolvo T={T} a={K.G + 0.15} b={K.G + 0.75} x0={520} y0={760} x1={560} y1={990} />
          <Nubecita T={T} at={K.G + 0.6} x={560} y={960} />
          <Cuchara x={470} y={720} rot={klerp(0, 55, vuelca)} s={1} carga={1 - kprog(T, K.G + 0.1, K.G + 0.7)} />
        </SvgCapa>
      </Escena>

      {/* 1 · qué trae: la lupa sobre la cucharada */}
      <Escena T={T} a={K.Q} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <path d="M 330 1110 L 200 1210" stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
          <circle cx={540} cy={910} r={290} fill={KC.paper} stroke={KC.ink} strokeWidth={14} />
          <circle cx={540} cy={910} r={272} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth={10} />
          {/* leyenda */}
          {[['bic', 'bicarbonato de sodio', 110, 1450], ['a1', 'ácido 1', 640, 1450], ['a2', 'ácido 2', 640, 1540], ['fec', 'fécula de maíz', 110, 1540]].map(([tp, t, x, y], i) => { const e = kprog(T, K.Q + 0.4 + i * 0.55, K.Q + 0.8 + i * 0.55, kEase.sale);
            return <g key={tp} opacity={e} transform={`translate(${(1 - e) * -30} 0)`}><rect x={x - 50} y={y - 36} width={i === 0 || i === 3 ? 510 : 330} height={72} rx={36} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <Granito x={x} y={y} r={20} tipo={tp} /><text x={x + 40} y={y + 12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{t}</text></g>; })}
          {granos.map(([tp, x, y, r], i) => { const a = K.Q + 0.3 + (i % 4) * 0.55 + Math.floor(i / 4) * 0.08; const e = kprog(T, a, a + 0.35, kEase.rebote);
            return <Granito key={i} x={x + Math.sin(T * 1.3 + i) * 6} y={y + Math.cos(T * 1.1 + i) * 6} r={30 * e} tipo={tp} rot={r + T * 8} o={e > 0 ? 1 : 0} />; })}
          {/* humedad atrapada por la fécula */}
          {[0, 1, 2].map((k) => { const t0 = K.Q + 3.6 + k * 0.4, u = kprog(T, t0, t0 + 0.8, kEase.suave); if (u <= 0 || u >= 1) return null;
            const g = granos[3 + k * 4]; return <path key={k} d="M 0 -18 Q 12 0 0 12 Q -12 0 0 -18 Z" transform={`translate(${klerp(g[1] + 200, g[2] > 0 ? g[1] : 0, u)} ${klerp(g[2] - 220, g[2], u)})`} fill="#7fc8ff" stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.6} />; })}
        </SvgCapa>
      </Escena>

      {/* 2–4 · micro: el ácido 1 se moja y suelta CO₂; las burbujas crecen; el ácido 2 sigue dormido */}
      <Escena T={T} a={K.A} b={K.H} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {/* masa (líquido) */}
          <path d={`M 0 780 ${Array.from({ length: 13 }, (_, k) => `Q ${k * 90 + 45} ${780 + (k % 2 ? -18 : 18) + Math.sin(T * 2 + k) * 6} ${(k + 1) * 90} 780`).join(' ')} L 1080 1240 L 0 1240 Z`} fill="rgba(246,212,138,.14)" stroke="rgba(246,212,138,.5)" strokeWidth={5} />
          {burb.map(([x, y, r], i) => <BurbujaMasa key={i} x={x + Math.sin(T + i) * 4} y={y} r={r * (1 + crece * (0.5 + (i % 3) * 0.25))} />)}
          {/* la gota de leche */}
          {gota < 1 && <path d="M 0 -40 Q 30 0 0 30 Q -30 0 0 -40 Z" transform={`translate(300 ${klerp(380, 620, gota)})`} fill="#f4f7ff" stroke={KC.ink} strokeWidth={5} />}
          {/* ácido 1 que se disuelve en iones */}
          <Granito x={300} y={650} r={58 * (1 - disuelve)} tipo="a1" o={1 - disuelve} />
          {disuelve > 0 && sale < 1 && [0, 1, 2, 3, 4, 5].map((k) => { const ang = k * Math.PI / 3 + T; const d = 40 + 90 * disuelve;
            return <circle key={k} cx={300 + Math.cos(ang) * d + 240 * sale} cy={650 + Math.sin(ang) * d} r={12} fill={C_A1} stroke={KC.ink} strokeWidth={3} opacity={1 - sale} />; })}
          {/* bicarbonato */}
          <Granito x={560} y={650} r={56 * (1 - sale * 0.8)} tipo="bic" rot={T * 10} o={1 - sale * 0.7} />
          {/* sale CO₂ (y agua) y entra a las burbujas */}
          {sale > 0 && [0, 1, 2, 3].map((k) => { const t0 = K.A + 2.0 + k * 0.35, u = kprog(T, t0, t0 + 1.0, kEase.sale), v = kprog(T, K.Bu + k * 0.25, K.Bu + 1.4 + k * 0.25, kEase.suave);
            const b = burb[k * 2]; const x = klerp(540 + (k - 1.5) * 50, b[0], v), y = klerp(650 - u * 70, b[1], v);
            return v < 1 ? <Mol key={k} tipo="co2" x={x} y={y} s={0.75 * u} rot={T * 40 + k * 40} /> : null; })}
          {sale > 0.5 && crece < 0.4 && <Mol tipo="agua" x={600} y={540} s={0.8} rot={T * 25} o={1 - crece * 2.5} />}
          {/* ácido 2: intacto, girando */}
          <Granito x={klerp(840, 540, kprog(T, K.Pr - 0.2, K.Pr + 0.4, kEase.suave))} y={klerp(460, 700, kprog(T, K.Pr - 0.2, K.Pr + 0.4, kEase.suave))} r={klerp(44, 110, kprog(T, K.Pr - 0.2, K.Pr + 0.4, kEase.suave))} tipo="a2" rot={T * 30} />
          {T > K.Pr && <text x={250} y={760} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} opacity={kprog(T, K.Pr, K.Pr + 0.3)} transform={`rotate(${Math.sin(T * 3) * 6} 250 600)`}>?</text>}
          {/* barra de escala esquemática */}
          <line x1={90} y1={1180} x2={250} y2={1180} stroke={KC.texto} strokeWidth={6} />
          <text x={170} y={1166} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>≈ 0.1 mm</text>
        </SvgCapa>
        <Etq T={T} at={K.A + 0.3} until={K.A + 2.6} x={120} y={760} texto="fosfato monocálcico" tam={34} color="#8cc8ff" />
        <Etq T={T} at={K.A + 2.4} until={K.Bu - 0.1} x={420} y={470} texto="CO₂" tam={40} color={KC.texto} lado="der" />
      </Escena>

      {/* 5 · el horno: el ácido 2 despierta con el calor */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Horno x={600} y={900} s={0.92} calor={calor}>
            <Pastel T={T} x={0} y={150} s={1.05} h={subeH * 0.8} poros={subeH} />
            {[0, 1, 2, 3, 4].map((k) => { const t0 = K.H + 2.6 + k * 0.5, u = kprog(T, t0, t0 + 0.6); return <Granito key={k} x={-150 + k * 75} y={60 - subeH * 80} r={18 * (1 - u)} tipo="a2" brillo={u} o={1 - u} />; })}
            {[0, 1, 2, 3, 4].map((k) => { const t0 = K.H + 3.0 + k * 0.5, u = kprog(T, t0, t0 + 1.0, kEase.sale); return u > 0 && u < 1 ? <Mol key={'c' + k} tipo="co2" x={-150 + k * 75} y={40 - subeH * 80 - u * 90} s={0.45} rot={T * 60} o={1 - u} /> : null; })}
          </Horno>
          <Termometro x={110} y={1260} alto={500} f={(tempH - 22) / 80} v={tempH} />
        </SvgCapa>
      </Escena>

      {/* 6 · 2021, KU Leuven */}
      <Escena T={T} a={K.Es} b={K.Cu} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T < mitadEs ? <g>
            <Tazon x={540} y={1060} s={1.05} />
            <Batidor T={T} x={540} y={1000} s={1.1} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const t0 = K.Es + 2.8 + k * 0.2, u = kprog(T, t0, t0 + 1.2, kEase.sale); return u > 0 && u < 1 ? <Mol key={k} tipo="co2" x={380 + k * 45 + Math.sin(T * 3 + k) * 20} y={960 - u * 420} s={0.55} rot={T * 50 + k * 30} o={1 - u} /> : null; })}
          </g> : <g>
            <Pastel T={T} x={300} y={1020} s={0.95} h={kprog(T, mitadEs + 0.2, mitadEs + 1.4, kEase.sale) * 0.95} cocido={1} poros={1} seed={3} />
            <Pastel T={T} x={790} y={1020} s={0.95} h={kprog(T, mitadEs + 0.2, mitadEs + 1.4, kEase.sale) * 0.35} cocido={1} poros={0.5} seed={6} />
          </g>}
        </SvgCapa>
        {T >= mitadEs && <Etq T={T} at={mitadEs + 0.6} until={K.Cu - 0.3} x={150} y={1110} texto="ácido lento" tam={34} color={KC.ink} lado="der" />}
        {T >= mitadEs && <Etq T={T} at={mitadEs + 0.9} until={K.Cu - 0.3} x={1010} y={1110} texto="ácido rápido" tam={34} color={KC.ink} lado="izq" />}
      </Escena>

      {/* 7 · cuaja cerca de 88 °C; después, el gas extra se escapa */}
      <Escena T={T} a={K.Cu} b={K.No} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={220} y={560} width={760} height={640} rx={40} fill={mixHex('#5c4a2a', '#c99a4f', cuaja)} stroke={KC.ink} strokeWidth={10} />
          {burb.map(([x, y, r], i) => { const X = 300 + ((x - 140) / 800) * 600, Y = 620 + ((y - 820) / 360) * 500;
            return <g key={i}><circle cx={X + (1 - cuaja) * Math.sin(T * 2 + i) * 8} cy={Y} r={r * 1.3} fill={cuaja > 0.5 ? KC.noche : 'rgba(255,255,255,.12)'} stroke={cuaja > 0.5 ? '#7a5424' : '#ffe7a8'} strokeWidth={6} /></g>; })}
          {/* poros abiertos por donde se va el gas tardío */}
          {cuaja >= 1 && [0, 1, 2, 3, 4, 5].map((k) => { const t0 = K.Cu + 4.4 + k * 0.35, u = kprog(T, t0, t0 + 1.6, kEase.suave); if (u <= 0 || u >= 1) return null;
            const bx = 330 + k * 110; return <g key={k}><path d={`M ${bx} 600 Q ${bx + 20 * Math.sin(T * 4 + k)} ${560 - u * 120} ${bx + 10} ${520 - u * 200}`} stroke="#bfe8ff" strokeWidth={6} fill="none" opacity={1 - u} strokeDasharray="14 12" />
              <Mol tipo="co2" x={bx + 10} y={540 - u * 220} s={0.4} rot={T * 50} o={1 - u} /></g>; })}
          <Termometro x={110} y={1220} alto={520} f={tempC / 100} v={tempC} />
        </SvgCapa>
      </Escena>

      {/* 8 · la norma de 1987 */}
      <Escena T={T} a={K.No} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Bascula x={790} y={1120} s={0.95} />
          <Cuchara x={850} y={1020} rot={0} s={0.9} carga={1} />
          {/* barra: 100 % del peso, 12 % es CO₂ disponible */}
          {(() => { const e = kprog(T, K.No + 1.6, K.No + 2.6, kEase.sale), x0 = 720, y0 = 520, H = 400; return <g opacity={kprog(T, K.No + 1.2, K.No + 1.6)}>
            <rect x={x0} y={y0} width={140} height={H} rx={12} fill="#fbfbfb" stroke={KC.ink} strokeWidth={8} />
            <rect x={x0} y={y0} width={140} height={H * 0.12 * e} rx={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
            <text x={x0 + 170} y={y0 + 40} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>12 %</text>
            <text x={x0 + 170} y={y0 + 82} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>CO₂</text>
          </g>; })()}
          <Nube T={T} x={850} y={860} f={kprog(T, K.No + 0.8, K.No + 2.0) * (1 - kprog(T, K.No + 2.2, K.No + 3.0))} r={110} color="#bfe8ff" seed={5} n={7} />
        </SvgCapa>
      </Escena>

      {/* 9 · cierre: el tazón del inicio, ahora pastel esponjado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Lata x={190} y={760} s={0.85} rot={-6} />
          <ellipse cx={560} cy={1150} rx={330} ry={50} fill="#fff" stroke={KC.ink} strokeWidth={9} />
          <Pastel T={T} x={560} y={1130} s={1.2} h={klerp(0.55, 0.95, kprog(T, K.Ci, K.Ci + 1.2, kEase.sale))} cocido={1} poros={1} molde={false} seed={3} />
          {[0, 1, 2].map((k) => { const u = (T * 0.6 + k / 3) % 1; return <path key={k} d={`M ${480 + k * 80} ${790 - u * 160} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={8} fill="none" opacity={(1 - u) * 0.8} strokeLinecap="round" />; })}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.2} until={K.Q - 0.3} texto="1 · en tu tazón" x={300} y={1500} tam={40} borde={C_A1} />
      <Chip T={T} at={K.G + 3.4} until={K.Q - 0.3} texto="2 · en tu horno" x={780} y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Q + 3.4} until={K.A - 0.3} texto="la fécula atrapa la humedad" y={1650} tam={40} borde={KC.ink} />
      <Capitulo T={T} caps={[{ at: K.A, titulo: 'En tu tazón · 22 °C' }, { at: K.H, titulo: 'En tu horno' }]} hasta={K.Es - 0.2} y={330} />
      <Chip T={T} at={K.A + 2.6} until={K.Bu - 0.2} texto="ácido + bicarbonato → CO₂ + agua" y={1500} tam={36} borde={C_A1} />
      <Chip T={T} at={K.Bu + 0.4} until={K.Pr - 0.1} texto="el CO₂ infla las burbujas" y={1500} tam={40} borde="#ffe7a8" />
      <Chip T={T} at={K.Pr + 0.2} until={K.H - 0.1} texto="ácido 2: sigue dormido" y={1500} tam={40} borde={C_A2} />
      <Chip T={T} at={K.H + 0.6} until={K.Es - 0.3} texto="sulfato de sodio y aluminio" y={1500} tam={38} borde={C_A2} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2021" quien="KU Leuven · Bélgica" revista="Godefroidt et al. · LWT 152" y={640} />
      <Chip T={T} at={K.Es + 3.1} until={mitadEs - 0.2} texto="ácido rápido: el gas se va al batir" y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={mitadEs + 1.4} until={K.Cu - 0.3} texto="menos gas atrapado = pastel más bajito" y={1500} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Cu + 3.0} until={K.Cu + 4.6} texto="≈ 88 °C: la masa empieza a cuajar" y={1500} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Cu + 4.7} until={K.No - 0.3} texto="gas después de cuajar → se escapa" y={1500} tam={36} borde="#bfe8ff" />
      <Chip T={T} at={K.No + 0.3} until={K.Ci - 0.3} texto="norma USDA · 1987 · cancelada en 2002" y={1500} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou - 0.2} texto="1 · en tu tazón" x={300} y={1500} tam={40} borde={C_A1} />
      <Chip T={T} at={K.Ci + 2.2} until={K.Ou - 0.2} texto="2 · en tu horno" x={780} y={1500} tam={40} borde={KC.orange} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Dos reacciones: *tazón y horno.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.A - 0.1} texto="Bicarbonato, *dos ácidos* y fécula." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Bu - 0.1} texto="Al mojarse: *sale CO₂.*" />
      <Subtitulo T={T} idx={3} at={K.Bu + 0.1} until={K.Pr - 0.1} texto="El gas *infla las burbujas.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.H - 0.1} texto="¿Y el *segundo ácido?*" />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.Es - 0.1} texto="Despierta *con el calor.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Cu - 0.1} texto="Ácido rápido: *pastel bajito.*" />
      <Subtitulo T={T} idx={7} at={K.Cu + 0.1} until={K.No - 0.1} texto="El gas, *antes de cuajar.*" />
      <Subtitulo T={T} idx={8} at={K.No + 0.1} until={K.Ci - 0.1} texto="1987: *12 % de su peso.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Gas en *dos turnos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Agua - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Agua + 1.4, CUES.Burbujas + 1.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Horno + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Horno + 2.2, CUES.Estudio - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.Cuaja - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cuaja + 1.0, CUES.Norma - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Norma + 0.3, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="55" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PolvoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Polvo /></CompositionStage></div>;
}
window.PolvoApp = PolvoApp;
