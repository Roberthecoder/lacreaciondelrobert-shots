// Shot Científico #12 · Cuando te truenas los dedos no se rompe nada: es una burbuja de gas — NARRADO (N5 + N1 "Por dentro").
// Datos: Kawchuk et al. 2015 (PLOS ONE), Chandran Suja y Barakat 2018 (Sci. Rep.), Unger 1998 + Ig Nobel 2009. Ver guion.md y verificacion.md.
const TF_HUESO = '#f4ecd8', TF_CART = '#cfe9ff', TF_LIQ = '#f6e7a1', TF_CAPS = '#ff7aa8', TF_GAS = '#1a1530';

// Mano de frente por el dorso (izquierda: pulgar a la derecha). (x, y) = centro de la palma.
// jalon 0..1 estira el dedo medio; pinza 0..1 = la otra mano lo agarra desde arriba; burbuja 0..1 en el nudillo.
const TF_DEDOS = [{ x: -97, l: 175 }, { x: -33, l: 228 }, { x: 33, l: 248 }, { x: 97, l: 222 }];
function Mano({ x, y, s = 1, jalon = 0, pinza = 0, burbuja = 0, brillo = 0, espejo = false, manga = KC.blue, T = 0, rot = 0 }) {
  const dy = -jalon * 46, tipY = -40 - 248 + dy;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s} ${s})`}>
    <rect x={-105} y={150} width={210} height={300} rx={30} fill={manga} stroke={KC.ink} strokeWidth={9} />
    {TF_DEDOS.map((d, i) => { const o = i === 2 ? dy : 0, top = -40 - d.l + o;
      return <g key={i}>
        <rect x={d.x - 29} y={top} width={58} height={d.l + 60} rx={29} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
        <rect x={d.x - 17} y={top + 10} width={34} height={36} rx={14} fill="#f9d2bd" stroke={KC.ink} strokeWidth={4} />
        {[0.42, 0.72].map((f) => <path key={f} d={`M ${d.x - 14} ${top + d.l * f} q 14 6 28 0`} stroke={CPIEL2} strokeWidth={5} fill="none" strokeLinecap="round" />)}
      </g>; })}
    {jalon > 0.05 && <rect x={33 - 22} y={-62 + dy} width={44} height={-dy + 6} fill={CPIEL2} opacity=".6" />}
    <rect x={-136} y={-70} width={272} height={262} rx={74} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <rect x={112} y={-40} width={70} height={200} rx={35} fill={CPIEL} stroke={KC.ink} strokeWidth={9} transform="rotate(30 147 150)" />
    {TF_DEDOS.map((d, i) => <path key={i} d={`M ${d.x - 20} -46 q 20 -16 40 0`} stroke={CPIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {brillo > 0 && <circle cx={33} cy={-58} r={34 + 14 * Math.sin(T * 12)} fill="none" stroke={KC.yellow} strokeWidth={9} opacity={brillo} />}
    {burbuja > 0 && <g transform={`translate(33 -58) scale(${burbuja})`}>
      <circle r={30} fill="rgba(160,235,255,.85)" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-9} cy={-10} r={8} fill="#fff" />
      <circle r={44 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.cyan} strokeWidth={5} opacity=".7" />
    </g>}
    {pinza > 0 && <g transform={`translate(33 ${tipY + 40}) translate(0 ${(1 - pinza) * -500})`}>
      <rect x={-70} y={-560} width={140} height={500} rx={30} fill={KC.orange} stroke={KC.ink} strokeWidth={9} />
      <rect x={-95} y={-90} width={190} height={150} rx={60} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      {[-55, -18, 19, 56].map((xx) => <path key={xx} d={`M ${xx} -10 q -6 30 0 60`} stroke={CPIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
      <ellipse cx={-10} cy={-20} rx={70} ry={26} fill={CPIEL} stroke={KC.ink} strokeWidth={7} transform="rotate(-12 -10 -20)" />
    </g>}
  </g>;
}
// Punto del nudillo del dedo medio en coordenadas de pantalla (para Lupa, Onomato y etiquetas).
const tfNudillo = (x, y, s, espejo = false) => [x + (espejo ? -33 : 33) * s, y - 58 * s];

// Articulación del dedo por dentro (vertical): hueso de abajo con cabeza redonda, hueso de arriba con base cóncava,
// cartílago, cápsula y líquido sinovial. sep 0..1 separa; cav 0..1 = hueco de gas; burb 0..1 su tamaño; gas = burbujitas disueltas.
function Articulacion({ x, y, s = 1, sep = 0, cav = 0, burb = 1, gas = 0, T = 0, colapso = 0 }) {
  const g = 14 + sep * 74, h = g / 2;
  const abajo = (hh) => `M -72 430 L -72 ${hh + 170} C -124 ${hh + 128} -116 ${hh} 0 ${hh} C 116 ${hh} 124 ${hh + 128} 72 ${hh + 170} L 72 430 Z`;
  const arriba = (hh) => `M -88 -430 L -88 ${-(hh + 44)} Q -100 ${-hh} -62 ${-hh} Q 0 ${-(hh + 30)} 62 ${-hh} Q 100 ${-hh} 88 ${-(hh + 44)} L 88 -430 Z`;
  const rng = krng(31), puntos = Array.from({ length: 22 }, () => [(rng() - 0.5) * 300, (rng() - 0.5) * (220 + g)]);
  const rx = 92 * cav * burb * (1 - 0.45 * colapso), ry = (h + 26) * cav * burb * (1 - 0.45 * colapso);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-178} y={-(160 + h)} width={356} height={320 + g} rx={130} fill={TF_LIQ} stroke={KC.ink} strokeWidth={10} />
    <rect x={-178} y={-(160 + h)} width={356} height={320 + g} rx={130} fill="none" stroke={TF_CAPS} strokeWidth={8} strokeDasharray="1 0" transform="scale(0.96)" />
    {gas > 0 && puntos.map(([px, py], i) => { const k = kclamp(cav * 1.4, 0, 1);
      return <circle key={i} cx={px * (1 - k) + Math.sin(T * 2 + i) * 4} cy={py * (1 - k)} r={4 + (i % 3)} fill="#fff" opacity={gas * 0.8 * (1 - k)} />; })}
    <path d={abajo(h)} fill={TF_CART} stroke={KC.ink} strokeWidth={8} />
    <path d={abajo(h + 16)} fill={TF_HUESO} stroke={KC.ink} strokeWidth={8} />
    <path d={arriba(h)} fill={TF_CART} stroke={KC.ink} strokeWidth={8} />
    <path d={arriba(h + 16)} fill={TF_HUESO} stroke={KC.ink} strokeWidth={8} />
    {cav > 0.01 && <g>
      <ellipse cx={0} cy={-4} rx={rx} ry={Math.max(ry, 4)} fill={TF_GAS} stroke={KC.gold2} strokeWidth={6} />
      <ellipse cx={-rx * 0.4} cy={-4 - ry * 0.35} rx={rx * 0.18} ry={Math.max(ry * 0.2, 2)} fill="#fff" opacity=".5" />
    </g>}
  </g>;
}
// Etiqueta dentro de un svg con línea.
function EtqSvg({ x, y, tx, ty, texto, tam = 26, color = KC.texto, o = 1, ancla = 'start' }) {
  return <g opacity={o}>
    <line x1={x} y1={y} x2={tx} y2={ty} stroke={color} strokeWidth={4} />
    <circle cx={x} cy={y} r={6} fill={color} />
    <text x={tx + (ancla === 'start' ? 8 : -8)} y={ty + tam * 0.35} textAnchor={ancla} style={{ font:`700 ${tam}px ${KF.mono}` }} fill={color} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}
function HuesoIcono({ x, y, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-22} width={220} height={44} fill={TF_HUESO} stroke={KC.ink} strokeWidth={8} />
    {[[-110, -24], [-110, 24], [110, -24], [110, 24]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={30} fill={TF_HUESO} stroke={KC.ink} strokeWidth={8} />)}
    <rect x={-100} y={-20} width={200} height={40} fill={TF_HUESO} />
    {tache > 0 && <g stroke={KC.red} strokeWidth={22} strokeLinecap="round">
      <line x1={-120} y1={-90} x2={-120 + 240 * kclamp(tache * 2, 0, 1)} y2={-90 + 180 * kclamp(tache * 2, 0, 1)} />
      {tache > 0.5 && <line x1={120} y1={-90} x2={120 - 240 * kclamp(tache * 2 - 1, 0, 1)} y2={-90 + 180 * kclamp(tache * 2 - 1, 0, 1)} />}
    </g>}
  </g>;
}
// Resonador (vista de lado, en corte): cuerpo, túnel oscuro.
function Resonador({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-340} y={-230} width={680} height={460} rx={70} fill="#e9edf2" stroke={KC.ink} strokeWidth={10} />
    <rect x={-340} y={-90} width={680} height={180} fill="#1b2b45" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-340} cy={0} rx={40} ry={230} fill="#cfd6e0" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-340} cy={0} rx={22} ry={92} fill="#0d1424" stroke={KC.ink} strokeWidth={6} />
    {[-200, -60, 80, 220].map((xx) => <line key={xx} x1={xx} y1={-220} x2={xx} y2={-100} stroke="#b9c2cf" strokeWidth={8} />)}
  </g>;
}
// Monitor con imagen en grises tipo resonancia: dedo, dos huesos y el hueco que aparece.
function MonitorRM({ x, y, T, hueco = 0, flash = 0 }) {
  const rng = krng(Math.floor(T * 12) + 3);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-400} y={-330} width={800} height={620} rx={40} fill="#2a2e38" stroke={KC.ink} strokeWidth={10} />
    <rect x={-360} y={-290} width={720} height={500} rx={14} fill="#111" />
    <rect x={-120} y={-290} width={240} height={500} rx={110} fill="#5e5e5e" />
    <rect x={-70} y={-290} width={140} height={215} rx={30} fill="#bdbdbd" />
    <rect x={-80} y={-50} width={160} height={260} rx={50} fill="#c9c9c9" />
    <rect x={-70} y={-82} width={140} height={34} fill="#8a8a8a" />
    {Array.from({ length: 60 }, (_, i) => <rect key={i} x={-360 + rng() * 715} y={-290 + rng() * 495} width={4} height={4} fill="#fff" opacity={rng() * 0.25} />)}
    {hueco > 0 && <ellipse cx={0} cy={-64} rx={62 * hueco} ry={24 * hueco} fill="#000" />}
    <rect x={-360} y={-290} width={720} height={500} rx={14} fill="#fff" opacity={flash * 0.5} />
    <circle cx={-320} cy={-252} r={12} fill={KC.red} opacity={0.5 + 0.5 * Math.sin(T * 6)} />
    <text x={-298} y={-242} style={{ font:`700 28px ${KF.mono}` }} fill="#ddd">REC</text>
    <text x={340} y={194} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill="#aaa">esquema</text>
  </g>;
}
function Trofeo({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2.5) * 3})`}>
    <path d="M -110 -150 L 110 -150 L 90 -20 C 80 40 -80 40 -90 -20 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -100 -120 C -190 -120 -180 -10 -80 -10 M 100 -120 C 190 -120 180 -10 80 -10" fill="none" stroke={KC.ink} strokeWidth={22} />
    <path d="M -100 -120 C -190 -120 -180 -10 -80 -10 M 100 -120 C 190 -120 180 -10 80 -10" fill="none" stroke={KC.gold2} strokeWidth={10} />
    <rect x={-22} y={30} width={44} height={60} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={88} width={180} height={50} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <path d="M -60 -120 L -40 -40" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
  </g>;
}
// Calendario sin números con hojas que pasan (décadas).
function Calendario({ x, y, s = 1, T = 0, vel = 3 }) {
  const f = (T * vel) % 1;
  const hoja = (k) => <g key={k}><rect x={-90} y={-60} width={180} height={150} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3].map((r) => <line key={r} x1={-65} y1={-20 + r * 28} x2={65} y2={-20 + r * 28} stroke="#bbb" strokeWidth={6} strokeDasharray="14 10" />)}</g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {hoja(0)}
    <g transform={`translate(0 -60) scale(1 ${1 - f}) translate(0 60)`} opacity={1 - f * 0.5}>{hoja(1)}</g>
    <rect x={-90} y={-90} width={180} height={44} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Palomita({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.3, 1, kEase.rebote(kclamp(p, 0, 1)))})`}>
    <circle r={70} fill={KC.leaf} stroke={KC.ink} strokeWidth={9} />
    <path d="M -34 2 L -8 28 L 38 -26" fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function Tronar() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // mano principal (gancho y cierre)
  const MX = 400, MY = 950, MS = 1.2, NUD = tfNudillo(MX, MY, MS);
  const crac0 = K.Gancho + 0.55, crac1 = K.Cierre + 1.1;
  const jal = (t0, t1) => kprog(T, t0, t1, kEase.suave);
  // mano chica de la Lupa
  const hx = 190, hy = 1110, hs = 0.6, HN = tfNudillo(hx, hy, hs);
  const crCav = K.Cavidad + 1.2;
  const crRM = K.Estudio + 5.7;
  const huecoRM = K.Video + 1.5;
  const burbEsp = klerp(1, 0.12, kprog(T, K.Espera + 0.8, K.Espera + 4.4, kEase.suave));
  const colap = K.Debate + 3.6;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: jalas el dedo, ¡CRAC!, no es hueso: es gas */}
      <Escena T={T} a={K.Gancho} b={K.Liquido}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Mano x={MX} y={MY} s={MS} T={T} pinza={kprog(T, K.Gancho - 0.5, K.Gancho + 0.1, kEase.sale)} jalon={jal(K.Gancho + 0.1, crac0) * (1 - 0.4 * kprog(T, crac0 + 0.2, crac0 + 0.8))}
            brillo={kprog(T, crac0, crac0 + 0.1) * (1 - kprog(T, crac0 + 1, crac0 + 1.4))} burbuja={kprog(T, K.Gancho + 2.6, K.Gancho + 3.0, kEase.rebote)} />
          <Onomato T={T} at={crac0} dur={1.6} x={230} y={560} texto="¡CRAC!" tam={150} rot={-10} />
          <g opacity={kprog(T, K.Gancho + 1.3, K.Gancho + 1.5) * (1 - kprog(T, K.Gancho + 2.5, K.Gancho + 2.8))}><HuesoIcono x={810} y={900} s={0.8} tache={kprog(T, K.Gancho + 1.6, K.Gancho + 2.2)} /></g>
        </Lienzo>
        <Etq T={T} at={K.Gancho + 2.8} until={K.Liquido - 0.1} x={NUD[0] + 60} y={NUD[1] + 40} texto="burbuja de gas" lado="der" color={KC.texto} tam={36} />
      </Escena>
      {/* 1 · por dentro: la articulación */}
      <Escena T={T} a={K.Liquido} b={K.Jalas} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo><Mano x={hx} y={hy} s={hs} T={T} brillo={0.8} /></Lienzo>
        <Lupa T={T} at={K.Liquido + 0.3} until={K.Jalas - 0.2} x={620} y={740} r={300} fx={HN[0]} fy={HN[1]} tinte={KC.gold2} etiqueta="POR DENTRO · ARTICULACIÓN"
          interior={(t, r) => { const L = (a, b) => kprog(t, K.Liquido + a, K.Liquido + b);
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
              <Articulacion x={r - 30} y={r} s={0.64} T={t} gas={0.6} />
              <EtqSvg o={L(1.0, 1.3)} x={r - 30} y={r - 170} tx={r + 90} ty={r - 200} texto="hueso" tam={30} />
              <EtqSvg o={L(1.6, 1.9)} x={r + 30} y={r + 22} tx={r + 110} ty={r + 60} texto="cartílago" tam={30} />
              <EtqSvg o={L(2.6, 2.9)} x={r - 60} y={r + 40} tx={r - 120} ty={r + 190} texto="líquido sinovial" ancla="start" tam={28} />
              <EtqSvg o={L(3.3, 3.6)} x={r - 140} y={r - 60} tx={r - 190} ty={r - 150} texto="cápsula" ancla="start" tam={30} />
            </svg>; }} />
      </Escena>
      {/* 2–3 · jalas: se separan, cae la presión, nace el hueco de gas */}
      <Escena T={T} a={K.Jalas} b={K.Estudio} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          {(() => { const sep = kprog(T, K.Jalas + 1.0, K.Jalas + 2.4, kEase.sale), cav = T > crCav ? kprog(T, crCav, crCav + 0.15, kEase.rebote) : 0;
            const tiembla = T > crCav && T < crCav + 0.4 ? Math.sin(T * 90) * 6 : 0;
            return <g transform={`translate(${tiembla} 0)`}><Articulacion x={470} y={810} s={1} sep={sep} cav={cav} gas={1} T={T} /></g>; })()}
          <FlechaRecta x1={150} y1={640} x2={150} y2={430} p={kprog(T, K.Jalas + 0.9, K.Jalas + 1.5, kEase.sale)} color={KC.cyan} />
          <FlechaRecta x1={150} y1={980} x2={150} y2={1180} p={kprog(T, K.Jalas + 0.9, K.Jalas + 1.5, kEase.sale)} color={KC.cyan} />
          <Onomato T={T} at={crCav} dur={1.3} x={800} y={1000} texto="¡crac!" tam={130} rot={8} />
        </Lienzo>
        <Medidor T={T} at={K.Jalas + 1.6} until={K.Cavidad + 1.0} y={1440} etiqueta="presión del líquido" valor={(t) => klerp(0.85, 0.12, kprog(t, K.Jalas + 2.0, K.Jalas + 3.6, kEase.suave))}
          texto={(v) => (v > 0.5 ? 'normal' : 'baja ↓')} color={T > K.Jalas + 2.8 ? KC.red : KC.mint} />
        <Etq T={T} at={K.Jalas + 2.4} until={K.Cavidad - 0.1} x={660} y={810} texto="se separan" lado="der" color={KC.cyan} />
        <Etq T={T} at={K.Cavidad + 0.2} until={crCav - 0.1} x={660} y={700} texto="gas disuelto" lado="der" color={KC.texto} />
        <Etq T={T} at={crCav + 0.5} until={K.Estudio - 0.1} x={570} y={806} texto="hueco de gas" lado="der" color={KC.gold2} tam={38} />
      </Escena>
      {/* 4 · el estudio de 2015: dedo en la resonancia, jalado con un cable */}
      <Escena T={T} a={K.Estudio} b={K.Video} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g opacity={kprog(T, K.Estudio + 2.4, K.Estudio + 2.9)}>
            {(() => { const j = kprog(T, K.Estudio + 3.2, crRM, kEase.suave) * (1 - 0.5 * kprog(T, crRM + 0.1, crRM + 0.6)), tip = 230 + 0.8 * (288 + 46 * j);
              return <g>
                <Resonador x={650} y={846} />
                <Mano x={230} y={820} s={0.8} rot={90} jalon={j} T={T} brillo={T > crRM ? 1 - kprog(T, crRM + 0.6, crRM + 1) : 0} />
                <line x1={tip} y1={846} x2={1060} y2={846} stroke={KC.ink} strokeWidth={14} />
                <line x1={tip} y1={846} x2={1060} y2={846} stroke={KC.yellow} strokeWidth={6} strokeDasharray="18 10" strokeDashoffset={-j * 120} />
                <TextoSvg x={650} y={1040} tam={50} color={KC.cyan}>RESONANCIA MAGNÉTICA</TextoSvg>
                <TextoSvg x={880} y={815} tam={36} color={KC.yellow}>cable</TextoSvg>
                <FlechaRecta x1={720} y1={560} x2={960} y2={560} p={kprog(T, K.Estudio + 3.2, K.Estudio + 3.8, kEase.sale)} color={KC.yellow} />
              </g>; })()}
          </g>
          <Onomato T={T} at={crRM} dur={0.9} x={560} y={700} texto="¡crac!" tam={110} rot={-6} />
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.4} anio="2015" quien="Canadá · resonancia magnética" revista="Kawchuk et al. · PLOS ONE" x={540} y={760} />
      </Escena>
      {/* 5 · el video: aparece el hueco oscuro */}
      <Escena T={T} a={K.Video} b={K.Pregunta} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <MonitorRM x={540} y={800} T={T} hueco={kprog(T, huecoRM, huecoRM + 0.12, kEase.rebote)} flash={kprog(T, huecoRM, huecoRM + 0.05) * (1 - kprog(T, huecoRM + 0.05, huecoRM + 0.4))} />
          <rect x={160} y={1150} width={760} height={14} rx={7} fill="#444" />
          <rect x={160} y={1150} width={760 * kprog(T, K.Video, K.Pregunta)} height={14} rx={7} fill={KC.cyan} />
          {(() => { const xm = 160 + 760 * (huecoRM - K.Video) / (K.Pregunta - K.Video);
            return <g opacity={kprog(T, huecoRM, huecoRM + 0.2)}><rect x={xm - 4} y={1130} width={8} height={54} fill={KC.yellow} />
              <text x={xm} y={1215} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.yellow}>tronido</text></g>; })()}
        </Lienzo>
        <Etq T={T} at={huecoRM + 0.4} until={K.Pregunta - 0.1} x={620} y={736} texto="hueco oscuro" lado="der" color={KC.yellow} tam={38} />
        <Chip T={T} at={K.Video + 0.3} until={K.Pregunta - 0.1} texto="el video de la resonancia" x={540} y={420} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Espera} />
      {/* 7 · la espera: unos 20 minutos (se cree); la burbuja se encoge (esquema) */}
      <Escena T={T} a={K.Espera} b={K.Debate} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Mano x={hx} y={hy} s={hs} T={T} brillo={0.6} />
          {(() => { const f = kprog(T, K.Espera + 0.6, K.Espera + 4.4, kEase.suave), a = f * 120;
            return <g transform="translate(250 520)">
              <circle r={140} fill="#fff" stroke={KC.ink} strokeWidth={10} />
              <path d={`M 0 0 L 0 -118 A 118 118 0 ${a > 180 ? 1 : 0} 1 ${118 * Math.sin(a * Math.PI / 180)} ${-118 * Math.cos(a * Math.PI / 180)} Z`} fill={KC.cyan} opacity=".55" />
              {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-122} x2={0} y2={-104} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 30})`} />)}
              <line x1={0} y1={0} x2={0} y2={-100} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" transform={`rotate(${a})`} />
              <circle r={12} fill={KC.ink} />
              <g opacity={kprog(T, K.Espera + 4.3, K.Espera + 4.6)}><TextoSvg x={0} y={215} tam={70} color={KC.pink}>20 MIN</TextoSvg></g>
            </g>; })()}
        </Lienzo>
        <Lupa T={T} at={K.Espera + 0.3} until={K.Debate - 0.2} x={680} y={850} r={240} fx={HN[0]} fy={HN[1]} tinte={KC.pink} etiqueta="POR DENTRO · ESQUEMA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
            <Articulacion x={r} y={r} s={0.52} sep={1} cav={1} burb={burbEsp} T={t} />
            <text x={r} y={r * 2 - 40} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">el gas se disuelve</text></svg>} />
        <Chip T={T} at={K.Espera + 0.4} until={K.Debate - 0.1} texto="se cree" x={800} y={430} tam={40} borde={KC.pink} />
      </Escena>
      {/* 8 · 2018: modelo matemático, colapso parcial; se sigue discutiendo */}
      <Escena T={T} a={K.Debate} b={K.Unger} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g opacity={kprog(T, K.Debate + 2.4, K.Debate + 2.8)}><Mano x={hx} y={hy} s={hs} T={T} brillo={0.6} /></g>
          {T > K.Debate + 2.6 && [0, 1, 2].map((i) => <text key={i} x={[120, 860, 900][i]} y={[1180, 470, 1200][i]} textAnchor="middle" opacity={0.55}
            transform={`rotate(${Math.sin(T + i) * 6} ${[120, 860, 900][i]} ${[1180, 470, 1200][i]})`} style={{ font:`700 ${[44, 40, 40][i]}px ${KF.mono}` }} fill={KC.ink}>{['?', '¿?', '?'][i]}</text>)}
        </Lienzo>
        <Lupa T={T} at={K.Debate + 2.6} until={K.Unger - 0.2} x={570} y={820} r={280} fx={HN[0]} fy={HN[1]} tinte={KC.yellow} etiqueta="MODELO 2018 · ESQUEMA"
          interior={(t, r) => { const c = kprog(t, colap, colap + 0.25, kEase.sale);
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
              <Articulacion x={r} y={r} s={0.6} sep={1} cav={1} colapso={c} T={t} />
              {t > colap && <OndasArco x={r + 40} y={r - 4} ang={0} T={t} color={KC.yellow} largo={160} n={3} o={1 - kprog(t, colap + 2.2, colap + 3)} />}
              {t > colap && <OndasArco x={r - 40} y={r - 4} ang={180} T={t} color={KC.yellow} largo={160} n={3} o={1 - kprog(t, colap + 2.2, colap + 3)} />}
              <text x={r} y={r * 2 - 46} textAnchor="middle" opacity={kprog(t, colap + 0.3, colap + 0.6)} style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">se colapsa en parte</text></svg>; }} />
        <TarjetaEstudio T={T} at={K.Debate + 0.2} until={K.Debate + 2.5} anio="2018" quien="modelo matemático" revista="Chandran Suja y Barakat · Sci. Rep." x={540} y={760} />
        <Chip T={T} at={K.Debate + 4.6} until={K.Unger - 0.1} texto="¿? se sigue discutiendo" x={690} y={440} tam={40} borde={KC.ink} />
      </Escena>
      {/* 9–10 · Unger: la izquierda truena por décadas; ninguna mano con artritis; Ig Nobel */}
      <Escena T={T} a={K.Unger} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const ciclo = ((T - K.Unger) * 1.6) % 1, activo = T > K.Unger + 1.2 && T < K.Manos + 0.4;
            const j = activo ? Math.sin(Math.min(ciclo, 0.5) * 2 * Math.PI) * 0.8 : 0, pop = activo && ciclo > 0.25 && ciclo < 0.5;
            const nI = tfNudillo(290, 980, 0.8);
            return <g>
              <Mano x={290} y={980} s={0.8} T={T} jalon={Math.max(0, j)} brillo={pop ? 1 : 0} manga={KC.blue} />
              <Mano x={790} y={980} s={0.8} T={T} espejo manga={KC.blue} />
              {pop && <TextoSvg x={nI[0] - 150} y={nI[1] - 40} tam={64} color={KC.yellow} rot={-12}>crac</TextoSvg>}
              <TextoSvg x={290} y={640} tam={44} color={KC.texto}>IZQUIERDA</TextoSvg>
              <TextoSvg x={790} y={640} tam={44} color={KC.texto}>DERECHA</TextoSvg>
              <g opacity={kprog(T, K.Unger + 2.6, K.Unger + 3) * (1 - kprog(T, K.Manos + 1.8, K.Manos + 2.2))}>
                <Calendario x={540} y={790} s={0.9} T={T} vel={T > K.Manos ? 6 : 2.5} />
                <TextoSvg x={540} y={930} tam={56} color={KC.yellow}>DÉCADAS</TextoSvg>
              </g>
              <Palomita x={290} y={1000} s={1} p={kprog(T, K.Manos + 0.9, K.Manos + 1.3)} />
              <Palomita x={790} y={1000} s={1} p={kprog(T, K.Manos + 1.2, K.Manos + 1.6)} />
              <g opacity={kprog(T, K.Manos + 1.0, K.Manos + 1.4)}><TextoSvg x={540} y={1130} tam={52} color={KC.texto}>SIN ARTRITIS</TextoSvg></g>
              <g opacity={kprog(T, K.Manos + 2.4, K.Manos + 2.6)} transform={`translate(0 ${(1 - kprog(T, K.Manos + 2.4, K.Manos + 2.9, kEase.rebote)) * -400})`}>
                <Trofeo x={540} y={820} s={0.8} T={T} />
              </g>
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Unger + 0.8} until={K.Manos + 2.2} texto="un médico de California" x={540} y={420} tam={40} borde={KC.ink} />
        <Chip T={T} at={K.Manos + 2.6} until={K.Cierre - 0.1} texto="premio Ig Nobel 2009 · Medicina" x={540} y={420} tam={40} borde={KC.gold} />
      </Escena>
      {/* 11 · cierre: la misma mano; truena y aparece la burbujita de gas brillante */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Mano x={MX} y={MY} s={MS} T={T} pinza={kprog(T, K.Cierre, K.Cierre + 0.5, kEase.sale)} jalon={jal(K.Cierre + 0.4, crac1) * (1 - 0.4 * kprog(T, crac1 + 0.2, crac1 + 0.8))}
            brillo={kprog(T, crac1, crac1 + 0.1)} burbuja={kprog(T, crac1, crac1 + 0.35, kEase.rebote) * (1.25 + 0.08 * Math.sin(T * 5))} />
          <Onomato T={T} at={crac1} dur={1.4} x={230} y={560} texto="¡CRAC!" tam={150} rot={-10} />
          {T > crac1 && Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2, rr = 70 + 60 * kprog(T, crac1, crac1 + 0.8);
            return <line key={i} x1={NUD[0] + Math.cos(a) * rr} y1={NUD[1] + Math.sin(a) * rr} x2={NUD[0] + Math.cos(a) * (rr + 30)} y2={NUD[1] + Math.sin(a) * (rr + 30)} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" opacity={0.8} />; })}
        </Lienzo>
        <Etq T={T} at={crac1 + 0.5} until={K.Outro - 0.1} x={NUD[0] + 110} y={NUD[1] + 80} texto="solo gas" lado="der" color={KC.texto} tam={40} />
        <Chip T={T} at={K.Cierre + 2.0} until={K.Outro - 0.1} texto="no se rompe nada" x={760} y={1130} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Liquido - 0.1} texto="No es un hueso: *es una burbuja de gas.*" />
      <Subtitulo T={T} idx={1} at={K.Liquido + 0.1} until={K.Jalas - 0.1} texto="Entre tus huesos: *líquido sinovial.*" />
      <Subtitulo T={T} idx={2} at={K.Jalas + 0.1} until={K.Cavidad - 0.1} texto="Jalas el dedo: *la presión cae.*" />
      <Subtitulo T={T} idx={3} at={K.Cavidad + 0.1} until={K.Estudio - 0.1} texto="El gas forma *un hueco: ¡crac!*" />
      <Subtitulo T={T} idx={4} at={K.Estudio + 0.1} until={K.Video - 0.1} texto="2015, Canadá: *dedo en resonancia.*" />
      <Subtitulo T={T} idx={5} at={K.Video + 0.1} until={K.Pregunta - 0.1} texto="El hueco aparece *en el tronido.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Espera - 0.1} texto="¿Por qué no *otra vez enseguida?*" />
      <Subtitulo T={T} idx={7} at={K.Espera + 0.1} until={K.Debate - 0.1} texto="Se cree: *unos veinte minutos.*" />
      <Subtitulo T={T} idx={8} at={K.Debate + 0.1} until={K.Unger - 0.1} texto="2018: *se colapsa en parte.*" />
      <Subtitulo T={T} idx={9} at={K.Unger + 0.1} until={K.Manos - 0.1} texto="¿Artritis? *Solo la izquierda, décadas.*" />
      <Subtitulo T={T} idx={10} at={K.Manos + 0.1} until={K.Cierre - 0.1} texto="Sin artritis: *premio Ig Nobel.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No se rompe nada: *es gas.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.Jalas + 0.3, K.Cavidad - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Estudio + 2.8, K.Video - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Pregunta + 0.05, K.Espera + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Espera + 1.0, K.Debate - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Debate + 3.0, K.Unger - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.Manos + 0.3, K.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="12" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function TronarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Tronar /></CompositionStage></div>;
}
window.TronarApp = TronarApp;
