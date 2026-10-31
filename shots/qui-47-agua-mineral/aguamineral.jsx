// Shot Químico #47 · Ese piquete casi no son las burbujas (agua mineral con gas y tu lengua) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Botellas sin marca.
const VIDRIO = '#9fe3c0', AGUA = '#d8f3ff', LENGUA = '#f27a8f', LENGUA2 = '#d9566f', ENZ = '#2fe0a8', HPLUS = '#ff3b2f', NERVIO = '#ffd23f';

// Vaso de vidrio para tomar, con agua y burbujas. x, y = centro de la base. nivel 0..1, burb 0..1 (0 = sin burbujas).
function Vaso({ T, x, y, s = 1, nivel = 0.75, burb = 1, congela = false, liquido = AGUA, seed = 3 }) {
  const H = 360, Wt = 130, Wb = 100, yl = -H * nivel;
  const ancho = (yy) => klerp(Wb, Wt, -yy / H);
  const tt = congela ? 0 : T;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {nivel > 0 && <path d={`M ${-ancho(yl) + 6} ${yl} L ${ancho(yl) - 6} ${yl} L ${Wb - 6} -6 L ${-Wb + 6} -6 Z`} fill={liquido} opacity={0.95} />}
    {nivel > 0 && <Burbujas T={tt} x={-Wb + 14} y={yl + 10} w={2 * Wb - 28} h={-yl - 20} n={26} f={burb} color="rgba(60,120,170,.85)" vel={140} seed={seed} rmax={10} />}
    <path d={`M ${-Wt} ${-H} L ${-Wb} 0 L ${Wb} 0 L ${Wt} ${-H}`} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${-Wt + 26} ${-H + 30} L ${-Wb + 22} -30`} stroke="#fff" strokeWidth={10} opacity={0.6} strokeLinecap="round" />
    <ellipse cx={0} cy={-H} rx={Wt} ry={14} fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Lengua de caricatura vista desde arriba, con papilas. x, y = centro.
function Lengua({ x, y, s = 1, rot = 0 }) {
  const R = krng(11);
  const pap = Array.from({ length: 34 }, () => [(R() - 0.5) * 420, (R() - 0.5) * 220]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -300 -140 Q -330 0 -300 140 L 140 150 Q 300 140 300 0 Q 300 -140 140 -150 Z" fill={LENGUA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -280 0 L 170 0" stroke={LENGUA2} strokeWidth={10} strokeLinecap="round" />
    {pap.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={7} fill={LENGUA2} opacity={0.75} />)}
  </g>;
}
// Chispitas de "piquete" (rayitos) alrededor de un punto.
function Chispas({ T, x, y, r = 120, n = 7, o = 1, color = KC.yellow }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + T * 0.8, k = 0.8 + 0.3 * Math.sin(T * 14 + i * 2);
    const cx = x + Math.cos(a) * r * k, cy = y + Math.sin(a) * r * 0.7 * k;
    return <path key={i} d={`M ${cx} ${cy - 24} L ${cx - 10} ${cy + 2} L ${cx + 6} ${cy + 2} L ${cx - 4} ${cy + 26}`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />; })}
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + T * 0.8, k = 0.8 + 0.3 * Math.sin(T * 14 + i * 2);
    const cx = x + Math.cos(a) * r * k, cy = y + Math.sin(a) * r * 0.7 * k;
    return <path key={'c' + i} d={`M ${cx} ${cy - 24} L ${cx - 10} ${cy + 2} L ${cx + 6} ${cy + 2} L ${cx - 4} ${cy + 26}`} stroke={color} strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />; })}</g>;
}
// Ácido carbónico (H₂CO₃) y bicarbonato (HCO₃⁻, sin = true quita un H).
function AcidoCarbonico({ x, y, s = 1, rot = 0, sinH = false, o = 1 }) {
  const at = [[0, 0, 34, QA.C, 'C'], [0, -66, 32, QA.O, 'O'], [-58, 36, 32, QA.O, 'O'], [58, 36, 32, QA.O, 'O'], [-104, 14, 20, QA.H, 'H']];
  if (!sinH) at.push([104, 14, 20, QA.H, 'H']);
  const en = [[0, 1], [0, 2], [0, 3], [2, 4]]; if (!sinH) en.push([3, 5]);
  return <Molecula x={x} y={y} s={s} rot={rot} atomos={at} enlaces={en} o={o} />;
}
// Ion H⁺ brillante.
function HMas({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={30} fill={HPLUS} opacity={0.35} /><circle r={20} fill={HPLUS} stroke={KC.ink} strokeWidth={4} />
    <text y={8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">H⁺</text>
  </g>;
}
// Enzima anhidrasa carbónica (tijerita verde con boca).
function Anhidrasa({ x, y, s = 1, boca = 0 }) {
  const a = 18 + boca * 26, c = Math.cos(a * Math.PI / 180) * 54, d = Math.sin(a * Math.PI / 180) * 54;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${c} ${-d} A 54 54 0 1 0 ${c} ${d} Z`} fill={ENZ} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-6} cy={-26} r={8} fill="#fff" /><circle cx={-4} cy={-26} r={4} fill={KC.ink} />
  </g>;
}
// Barra de escala esquemática.
function BarraEscala({ x, y, texto, largo = 120, color = KC.ink }) {
  return <g><line x1={x} y1={y} x2={x + largo} y2={y} stroke={color} strokeWidth={8} strokeLinecap="round" />
    <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={color} strokeWidth={6} /><line x1={x + largo} y1={y - 12} x2={x + largo} y2={y + 12} stroke={color} strokeWidth={6} />
    <text x={x + largo / 2} y={y - 18} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}
// Interior de la lengua (rayos X): células, enzima, CO₂ que entra y H⁺ que sale; nervio opcional.
function InteriorLengua({ T, r, t0 = 0, nervio = 0 }) {
  const W = 2 * r;
  const R = krng(4);
  const cels = Array.from({ length: 6 }, (_, i) => [((i % 3) + 0.5) * W / 3, (Math.floor(i / 3) + 0.6) * W / 2.6]);
  const ciclo = ((T - t0) % 1.1 + 1.1) % 1.1, u = ciclo / 1.1;
  return <svg width={W} height={W} viewBox={`0 0 ${W} ${W}`}>
    <rect width={W} height={W} fill={KC.noche} />
    {cels.map(([cx, cy], i) => <rect key={i} x={cx - W / 7} y={cy - W / 9} width={W / 3.5} height={W / 4.5} rx={30} fill="#3a2440" stroke={LENGUA} strokeWidth={4} opacity={0.8} />)}
    {nervio > 0 && <path d={`M ${W * 0.1} ${W * 0.95} Q ${W * 0.4} ${W * 0.7} ${W * 0.55} ${W * 0.55} M ${W * 0.55} ${W * 0.55} l ${W * 0.12} ${-W * 0.1} M ${W * 0.55} ${W * 0.55} l ${-W * 0.02} ${-W * 0.16}`} stroke={mixHex(NERVIO, HPLUS, 0.5 + 0.5 * Math.sin(T * 10))} strokeWidth={10} fill="none" strokeLinecap="round" opacity={nervio} />}
    <g transform={`translate(${W * 0.5} ${W * 0.42})`}>
      <Mol tipo="co2" x={klerp(-W * 0.42, -60, Math.min(1, u * 2))} y={-30} s={0.55} o={u < 0.5 ? 1 : 0} />
      <Anhidrasa x={0} y={0} s={0.9} boca={Math.abs(Math.sin(T * 9))} />
      {Array.from({ length: 4 }, (_, k) => { const uu = ((T - t0 - k * 0.27) % 1.1 + 1.1) % 1.1 / 1.1; return <HMas key={k} x={60 + uu * W * 0.35} y={-40 + k * 26 - uu * 40} s={0.8} o={1 - uu} />; })}
    </g>
  </svg>;
}
// Probeta con un diente dentro. ca = cuántos Ca²⁺ se sueltan (0..1).
function TuboDiente({ T, x, y, liquido, ca = 0, burb = 0, etiqueta, seed = 2 }) {
  const R = krng(seed);
  const iones = Array.from({ length: 12 }, () => [R() * 90 - 45, R() * 3]);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -80 -420 L -80 -40 Q -80 40 0 40 Q 80 40 80 -40 L 80 -420" fill={liquido} stroke="none" opacity={0.85} />
    {burb > 0 && <Burbujas T={T} x={-70} y={-400} w={140} h={420} n={14} f={burb} color="rgba(60,120,170,.85)" seed={seed} rmax={8} />}
    <path d="M -30 -90 Q -40 -170 0 -170 Q 40 -170 30 -90 L 20 -20 L 6 -60 L -6 -60 L -20 -20 Z" fill="#fffdf2" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {iones.map(([dx, ph], i) => { if (i / 12 >= ca) return null; const uu = ((T * 0.5 + ph) % 1); return <g key={i} opacity={1 - uu}>
      <circle cx={dx} cy={-150 - uu * 240} r={13} fill={KC.lilac} stroke={KC.ink} strokeWidth={3} />
      <text x={dx} y={-145 - uu * 240} textAnchor="middle" style={{ font:`700 12px ${KF.mono}` }} fill={KC.ink}>Ca</text></g>; })}
    <path d="M -96 -440 L -80 -420 L -80 -40 Q -80 40 0 40 Q 80 40 80 -40 L 80 -420 L 96 -440" fill="rgba(255,255,255,.15)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <text x={0} y={100} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
// Botella de agua mineral sin marca (vidrio verde claro, sin etiqueta).
function BotellaMineral({ x, y, s = 1, inclina = 0, nivel = 0.7 }) {
  return <Botella x={x} y={y} s={s} inclina={inclina} color={VIDRIO} liquido={AGUA} etiqueta="" tapa={KC.blue} nivel={nivel} />;
}
// Chip que se encoge (no se tacha): "burbujas" → chiquito, "un poquito".
function ChipEncoge({ T, at, encogeEn, until, texto, sub, x, y, tam = 54 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), k = kprog(T, encogeEn, encogeEn + 0.5, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s * klerp(1, 0.55, k)})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ background:'rgba(255,255,255,.92)', color:KC.ink, border:`5px solid ${KC.ink}`, borderRadius:999, padding:'12px 34px', font:`900 ${tam}px ${KF.texto}`, whiteSpace:'nowrap' }}>{texto}</div>
    {sub && <div style={{ marginTop:8, font:`700 44px ${KF.mono}`, color:KC.ink, opacity:k, whiteSpace:'nowrap' }}>{sub}</div>}
  </div>;
}
// Texto gigante que crece ("ÁCIDO").
function Gigante({ T, at, until, texto, x, y, tam = 200, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), k = kprog(T, at, at + 0.4, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s * klerp(0.3, 1, k)}) rotate(-4deg)`, opacity:e.o,
    font:`400 ${tam}px/1 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 28}px ${KC.ink}`, textShadow:`${tam / 22}px ${tam / 22}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>;
}

function AguaMineral() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ac: CUES.Acido, Ph: CUES.Ph, En: CUES.Enzima, Ne: CUES.Nervios, Ag: CUES.Agrio, Pr: CUES.Pregunta, Ca: CUES.Camara, Di: CUES.Dientes, Sa: CUES.Sabor, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const vierte = kprog(T, K.G, K.G + 0.3, kEase.sale);
  const llena = kprog(T, K.G + 0.1, K.G + 1.6);
  const chorro = vierte * (1 - kprog(T, K.G + 1.6, K.G + 2.0));
  const toca = kprog(T, K.G + 1.4, K.G + 2.0, kEase.sale);
  // ácido carbónico: CO₂ que viaja hasta un H₂O, se une y suelta un H⁺
  const une = kprog(T, K.Ac + 1.2, K.Ac + 1.9, kEase.sale), suelta = kprog(T, K.Ac + 3.0, K.Ac + 4.0, kEase.sale);
  const R = krng(9);
  const aguas = Array.from({ length: 9 }, () => [120 + R() * 840, 780 + R() * 420, R() * 360]);
  // pH
  const phA = kprog(T, K.Ph + 1.4, K.Ph + 2.6, kEase.sale), phB = kprog(T, K.Ph + 3.6, K.Ph + 4.6, kEase.sale);
  const yPh = (p) => 1180 - (p / 14) * 640;
  // cámara a presión
  const mitadCa = K.Ca + 2.6;
  const barras = kprog(T, K.Ca + 3.6, K.Ca + 4.8, kEase.sale);
  // dientes
  const tubos = K.Di + 2.6;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la botella sirve, la lengua prueba y pica */}
      <Escena T={T} a={K.G} b={K.Ac} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Lengua x={560} y={1060} s={1.05} />
          <Chorro T={T} x0={286} y0={470} x1={300} y1={880} color={AGUA} o={chorro} />
          <BotellaMineral x={170} y={470} s={0.62} inclina={klerp(40, 115, vierte)} nivel={0.6} />
          <Vaso T={T} x={300} y={980} s={0.9} nivel={0.75 * llena} burb={llena} />
          <g opacity={toca}>{Array.from({ length: 8 }, (_, i) => <circle key={i} cx={430 + i * 40 + Math.sin(T * 5 + i) * 6} cy={1060 - ((T * 60 + i * 30) % 80)} r={8} fill="none" stroke="rgba(60,120,170,.9)" strokeWidth={3} />)}</g>
          <Chispas T={T} x={620} y={1050} r={210} n={8} o={toca} />
          <BarraEscala x={60} y={1200} texto="1 cm" largo={60} />
        </SvgCapa>
      </Escena>
      {/* 1 · ácido carbónico (micro, fondo noche) */}
      <Escena T={T} a={K.Ac} b={K.Ph}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {aguas.map(([x, y, r], i) => <Mol key={i} tipo="agua" x={x + Math.sin(T + i) * 14} y={y + Math.cos(T * 1.2 + i) * 12} s={0.8} rot={r + T * 15} o={0.75} />)}
          {une < 1 && <g><Mol tipo="co2" x={klerp(150, 470, kprog(T, K.Ac, K.Ac + 1.2, kEase.suave))} y={klerp(760, 960, kprog(T, K.Ac, K.Ac + 1.2, kEase.suave))} s={1.3} rot={Math.sin(T * 2) * 10} o={1 - une} />
            <Mol tipo="agua" x={600} y={980} s={1.3} rot={Math.sin(T) * 10} o={1 - une} /></g>}
          {une > 0 && <AcidoCarbonico x={540} y={970} s={1.5 + 0.2 * (1 - une)} rot={Math.sin(T) * 6} sinH={suelta > 0} o={une} />}
          {une >= 1 && <circle cx={540} cy={970} r={150 + Math.sin(T * 5) * 10} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={0.5 * (1 - suelta)} />}
          {suelta > 0 && <HMas x={540 + 104 * 1.5 + suelta * 180} y={990 - suelta * 160} s={1.6} />}
          <BarraEscala x={60} y={1200} texto="1 nm" largo={100} color={KC.texto} />
        </SvgCapa>
      </Escena>
      {/* 2 · pH: aguas minerales con gas ≈ 5; la llave de esa ciudad 7.2 */}
      <Escena T={T} a={K.Ph} b={K.En}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vaso T={T} x={230} y={1130} s={0.8} nivel={0.75} burb={1} />
          <Vaso T={T} x={850} y={1130} s={0.8} nivel={0.75} burb={0} seed={6} />
          <path d="M 960 700 L 960 760 L 900 760" stroke="#9aa3b5" strokeWidth={26} fill="none" strokeLinecap="round" />
          {Array.from({ length: 15 }, (_, p) => <rect key={p} x={500} y={yPh(p + 1)} width={80} height={640 / 14} fill={`hsl(${p * 20},85%,55%)`} />)}
          <rect x={500} y={yPh(14)} width={80} height={640} fill="none" stroke={KC.ink} strokeWidth={8} rx={10} />
          {[0, 7, 14].map((p) => <text key={p} x={604} y={yPh(p) + 12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{p}</text>)}
          <g opacity={phA}><path d={`M 330 ${klerp(yPh(7), yPh(5), phA)} L 492 ${klerp(yPh(7), yPh(5), phA)}`} stroke={KC.ink} strokeWidth={10} markerEnd="" />
            <path d={`M 480 ${klerp(yPh(7), yPh(5), phA) - 20} L 500 ${klerp(yPh(7), yPh(5), phA)} L 480 ${klerp(yPh(7), yPh(5), phA) + 20}`} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <text x={300} y={yPh(5) - 30} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">≈ 5</text></g>
          <g opacity={phB}><path d={`M 750 ${yPh(7.2)} L 588 ${yPh(7.2)}`} stroke={KC.ink} strokeWidth={10} />
            <path d={`M 600 ${yPh(7.2) - 20} L 580 ${yPh(7.2)} L 600 ${yPh(7.2) + 20}`} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <text x={820} y={yPh(7.2) - 30} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">7.2</text></g>
          <text x={540} y={yPh(14) - 24} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>pH</text>
        </SvgCapa>
      </Escena>
      {/* 3–4 · dentro de la lengua: enzima y nervio (rayos X) */}
      <Escena T={T} a={K.En} b={K.Ag} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Lengua x={540} y={1060} s={1.2} />
          <Chispas T={T} x={540} y={1060} r={300} n={9} o={kprog(T, K.Ne, K.Ne + 0.4)} /></SvgCapa>
        <Lupa T={T} at={K.En + 0.2} until={K.Ag - 0.3} x={640} y={640} r={280} fx={600} fy={1040} tinte={KC.mint}
          interior={(t, r) => <InteriorLengua T={t} r={r} t0={K.En + 0.6} nervio={kprog(t, K.Ne, K.Ne + 0.5)} />} />
      </Escena>
      {/* 5 · 2009: ratones y células del sabor agrio */}
      <Escena T={T} a={K.Ag} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g transform="translate(300 1080)">
            <ellipse cx={0} cy={40} rx={150} ry={36} fill={AGUA} stroke={KC.ink} strokeWidth={7} />
            <Burbujas T={T} x={-110} y={0} w={220} h={50} n={10} color="rgba(60,120,170,.9)" rmax={6} />
            <g transform={`translate(${-60} ${-60}) rotate(${Math.sin(T * 6) * 4})`}>
              <ellipse cx={0} cy={0} rx={120} ry={70} fill="#c9c3cf" stroke={KC.ink} strokeWidth={7} />
              <circle cx={70} cy={-60} r={38} fill="#c9c3cf" stroke={KC.ink} strokeWidth={7} /><circle cx={70} cy={-60} r={18} fill="#f2a0b4" />
              <circle cx={110} cy={-10} r={8} fill={KC.ink} /><circle cx={130} cy={25} r={10} fill="#f2a0b4" stroke={KC.ink} strokeWidth={4} />
              <path d="M -120 10 Q -200 30 -220 -30" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            </g>
          </g>
          {/* botón gustativo */}
          <g transform="translate(760 900)" opacity={kprog(T, K.Ag + 2.4, K.Ag + 3.0)}>
            <path d="M -170 220 Q -200 -40 0 -190 Q 200 -40 170 220 Z" fill="#ffd7df" stroke={KC.ink} strokeWidth={8} />
            {[-110, -55, 0, 55, 110].map((dx, i) => { const agrio = i === 2, brilla = agrio ? 0.5 + 0.5 * Math.sin(T * 8) : 0;
              return <g key={i}><path d={`M ${dx - 20} 200 Q ${dx * 0.6 - 18} 0 ${dx * 0.3 - 6} -150 L ${dx * 0.3 + 6} -150 Q ${dx * 0.6 + 18} 0 ${dx + 20} 200 Z`} fill={agrio ? mixHex('#ffe11a', '#fff6a0', brilla) : '#f6a5b5'} stroke={KC.ink} strokeWidth={4} />
                {agrio && [-90, -30, 30, 90].map((yy, k) => <circle key={k} cx={dx * 0.5 + (k % 2 ? 16 : -16)} cy={yy} r={9} fill={ENZ} stroke={KC.ink} strokeWidth={3} />)}</g>; })}
          </g>
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ca} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Vaso T={T} x={250} y={1150} s={1} nivel={0.75} burb={1} congela />
          <text x={250} y={640} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 520)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · 2013: cámara a presión */}
      <Escena T={T} a={K.Ca} b={K.Di}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T < mitadCa + 1.0 ? <g opacity={1 - kprog(T, mitadCa + 0.6, mitadCa + 1.0)}>
            <rect x={100} y={680} width={880} height={420} rx={210} fill="#b9c3cf" stroke={KC.ink} strokeWidth={10} />
            {[300, 540, 780].map((cx, i) => <circle key={i} cx={cx} cy={890} r={110} fill="#e9f7ff" stroke={KC.ink} strokeWidth={9} />)}
            <Personita x={300} y={910} s={2.2} color={KC.yellow} />
            <Vaso T={T} x={540} y={970} s={0.42} nivel={0.75} burb={0} />
            <Personita x={780} y={910} s={2.2} color={KC.orange} />
            <g transform="translate(900 560)"><circle r={70} fill="#fff" stroke={KC.ink} strokeWidth={8} />
              <line x1={0} y1={0} x2={Math.cos(-Math.PI / 2 + kprog(T, K.Ca + 0.5, K.Ca + 1.8) * 1.6) * 50} y2={Math.sin(-Math.PI / 2 + kprog(T, K.Ca + 0.5, K.Ca + 1.8) * 1.6) * 50} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
              <text y={110} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>2 atm</text></g>
          </g> : <g>
            {[['1 atm', 'con burbujas', 300, 1], ['2 atm', 'sin burbujas', 780, 0]].map(([p, t, x, b], i) => { const h = (i ? 360 : 372) * barras; return <g key={i}>
              <rect x={x - 110} y={1170 - h} width={220} height={h} fill={i ? KC.lilac : KC.yellow} stroke={KC.ink} strokeWidth={8} />
              {b ? <Burbujas T={T} x={x - 100} y={1170 - h} w={200} h={h} n={12} color="rgba(30,60,90,.7)" rmax={9} /> : null}
              <text x={x} y={1225} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{p}</text>
              <text x={x} y={760} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text></g>; })}
            <text x={540} y={700} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>PIQUETE</text>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 8 · 2001: dientes en el laboratorio */}
      <Escena T={T} a={K.Di} b={K.Sa}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, tubos, tubos + 0.4)}>
            <TuboDiente T={T} x={300} y={1050} liquido="#6b3a1e" ca={kprog(T, tubos + 0.5, tubos + 2.0)} etiqueta="refresco" seed={3} />
            <TuboDiente T={T} x={780} y={1050} liquido={AGUA} ca={kprog(T, tubos + 0.5, tubos + 2.0) * 0.09} burb={1} etiqueta="agua con gas" seed={5} />
          </g>
        </SvgCapa>
      </Escena>
      {/* 9 · 2007: las de sabor */}
      <Escena T={T} a={K.Sa} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {(() => { const inc = Math.sin(T * 2.2) * 3; return <g>
            <path d="M 540 1200 L 540 800" stroke={KC.ink} strokeWidth={14} /><path d="M 440 1210 L 640 1210" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
            <g transform={`rotate(${inc} 540 800)`}>
              <line x1={200} y1={800} x2={880} y2={800} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
              <path d="M 200 800 L 200 1000 M 880 800 L 880 1000" stroke={KC.ink} strokeWidth={5} />
              <BotellaMineral x={200} y={1000 - 150 * 0.7} s={0.7} nivel={0.65} />
              <g transform="translate(200 840)"><circle r={44} fill="#fff176" stroke={KC.ink} strokeWidth={6} />{[0, 60, 120].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * 40} y2={Math.sin(a * Math.PI / 180) * 40} stroke="#e0c000" strokeWidth={4} transform={`rotate(0)`} />)}</g>
              <Vaso T={T} x={880} y={1000} s={0.6} nivel={0.75} burb={0} liquido="#ffa726" />
            </g></g>; })()}
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el vaso y la lengua del inicio, ya explicados */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Lengua x={560} y={1060} s={1.05} />
          <Vaso T={T} x={300} y={980} s={0.9} nivel={0.75} burb={1} />
          <Chispas T={T} x={620} y={1050} r={210} n={8} o={1} />
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.4} x={760} y={640} r={200} fx={700} fy={1050} tinte={KC.mint}
          interior={(t, r) => <InteriorLengua T={t} r={r} t0={K.Ci} nervio={1} />} />
      </Escena>

      {/* textos */}
      <ChipEncoge T={T} at={K.G + 0.4} encogeEn={K.G + 2.0} until={K.G + 4.4} texto="burbujas" sub="un poquito" x={420} y={290} />
      <Gigante T={T} at={K.G + 2.4} until={K.Ac - 0.3} texto="ÁCIDO" x={600} y={820} tam={190} />
      <Chip T={T} at={K.Ac + 1.9} until={K.Ac + 3.6} texto="H₂CO₃ · ácido carbónico" y={720} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.Ac + 3.8} until={K.Ph - 0.3} texto="ácido débil: suelta H⁺" y={720} tam={44} borde={HPLUS} />
      <Etq T={T} at={K.Ac + 0.3} until={K.Ac + 1.2} x={150} y={700} texto="CO₂ disuelto" color={KC.texto} />
      <Etq T={T} at={K.Ph + 1.6} until={K.En - 0.3} x={40} y={790} texto="aguas minerales con gas" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ph + 3.8} until={K.En - 0.3} x={1050} y={690} texto="agua de la llave" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ph + 0.4} until={K.En - 0.3} texto="2016 · Reddy et al. · JADA · Birmingham, Alabama" y={1480} tam={26} borde={KC.ink} mono />
      <Chip T={T} at={K.En + 0.9} until={K.Ne - 0.2} texto="anhidrasa carbónica: ¡más rápido!" y={1480} tam={36} borde={ENZ} />
      <Chip T={T} at={K.Ne + 0.3} until={K.Ag - 0.3} texto="H⁺ → nervio del dolor" y={1480} tam={40} borde={NERVIO} />
      <TarjetaEstudio T={T} at={K.Ag + 0.2} until={K.Ag + 2.3} anio="2009" quien="Chandrashekar, Zuker et al." revista="Science · San Diego · en ratones" y={560} />
      <Etq T={T} at={K.Ag + 3.0} until={K.Pr - 0.3} x={560} y={720} texto="célula del sabor agrio" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ag + 3.4} until={K.Pr - 0.3} x={560} y={800} texto="enzima en su superficie" lado="izq" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ca + 0.2} until={mitadCa - 0.1} anio="2013" quien="Wise et al. · Filadelfia" revista="Monell y Univ. de Pensilvania · PLoS One" y={480} />
      <Chip T={T} at={K.Ca + 4.6} until={K.Di - 0.3} texto="picó casi igual" y={1480} tam={46} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Di + 0.2} until={tubos - 0.1} anio="2001" quien="Parry et al. · Univ. de Birmingham" revista="J Oral Rehabil · Inglaterra" y={560} />
      <Chip T={T} at={tubos} until={K.Sa - 0.3} texto="en el laboratorio" x={380} y={520} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={tubos + 2.4} until={K.Sa - 0.3} valor={100} dur={1.0} prefijo="≈ " sufijo="×" etiqueta="menos disolución" y={1530} tam={120} color={KC.yellow} />
      <Chip T={T} at={tubos + 1.0} until={K.Sa - 0.3} texto="refresco y esmalte: Shot Químico #38" x={540} y={1690} tam={24} borde={KC.gold} mono />
      <Chip T={T} at={K.Sa + 0.3} until={K.Ci - 0.3} texto="2007 · Brown et al. · Birmingham" y={1620} tam={34} borde={KC.ink} mono />
      <Etq T={T} at={K.Sa + 1.0} until={K.Ci - 0.3} x={60} y={1110} texto="de sabor · pH 2.7–3.3" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Sa + 1.4} until={K.Ci - 0.3} x={1040} y={1110} texto="jugo de naranja" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Sa + 1.8} until={K.Ci - 0.3} texto="igual de erosivas, o más" y={1480} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="CO₂ + H₂O → ácido carbónico" y={1480} tam={40} borde={ENZ} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ac - 0.1} texto="Casi no son burbujas: *es ácido.*" />
      <Subtitulo T={T} idx={1} at={K.Ac + 0.1} until={K.Ph - 0.1} texto="CO₂ + agua = *ácido carbónico.*" />
      <Subtitulo T={T} idx={2} at={K.Ph + 0.1} until={K.En - 0.1} texto="Agua mineral con gas: *pH ≈ 5.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.Ne - 0.1} texto="Una enzima *lo vuelve ácido.*" />
      <Subtitulo T={T} idx={4} at={K.Ne + 0.1} until={K.Ag - 0.1} texto="Nervios del dolor: *por eso pica.*" />
      <Subtitulo T={T} idx={5} at={K.Ag + 0.1} until={K.Pr - 0.1} texto="Y lo detecta *el sabor agrio.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="¿Sin burbujas, *deja de picar?*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.Di - 0.1} texto="Sin burbujas: *picó casi igual.*" />
      <Subtitulo T={T} idx={8} at={K.Di + 0.1} until={K.Sa - 0.1} texto="Dientes: *100 veces menos.*" />
      <Subtitulo T={T} idx={9} at={K.Sa + 0.1} until={K.Ci - 0.1} texto="De sabor: *como jugo de naranja.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es tu lengua *haciendo química.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Acido + 1.0, CUES.Ph - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Ph + 1.0, CUES.Enzima - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Nervios + 0.2, CUES.Agrio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Agrio + 2.6, CUES.Pregunta - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Camara + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Camara + 3.0, CUES.Dientes - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Dientes + 3.0, CUES.Sabor - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Sabor + 0.3, CUES.Cierre - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="47" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AguaMineralApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AguaMineral /></CompositionStage></div>;
}
window.AguaMineralApp = AguaMineralApp;
