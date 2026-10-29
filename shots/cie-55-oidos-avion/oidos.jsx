// Shot Científico #55 · Por qué se te tapan los oídos en el avión — NARRADO (N1 "Por dentro": oído medio y trompa de Eustaquio).
// Datos: Mayo Clinic, MedlinePlus, ENT Health (AAO-HNS), 14 CFR §25.841, Manual MSD. Ver guion.md y verificacion.md.
// Sin cifras de presión en pantalla (las barras del medidor son un esquema). No se muestra soplar con la nariz tapada.
const OAIRE = KC.cyan, OTEJ = '#e98ea0', OTEJ2 = '#a8465f', OHUESO = '#f4ecd8', OHUECO = '#13304a', OCARNE = '#3a1f2e';
const TUBO = [[60, 118], [80, 270], [200, 330], [290, 452]];
const bez = (p, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };

// Letrero chico con contorno (dentro de svg).
function Rot({ x, y, children, tam = 46, color = KC.texto, ancla = 'middle', o = 1, it = false }) {
  return <text x={x} y={y} textAnchor={ancla} opacity={o} style={{ font:`${it ? 'italic ' : ''}900 ${tam}px ${KF.texto}` }} fill={color} stroke={KC.ink} strokeWidth={9} paintOrder="stroke" strokeLinejoin="round">{children}</text>;
}

// Corte del oído (esquema): conducto → tímpano → oído medio (cajita de aire) → trompa de Eustaquio → garganta.
// tim: tímpano empujado hacia adentro (0 plano, 1 hundido) · abre: trompa abierta 0..1 · inflama 0..1 · flujo: burbujas de aire 0..1
// fuera / dentro: cuántas partículas de aire hay afuera y en la cajita · empuja: flechas que empujan el tímpano 0..1 · glup: trago 0..1
function OidoCorte({ x, y, s = 1, T = 0, tim = 0, abre = 0, inflama = 0, flujo = 0, fuera = 1, dentro = 1, empuja = 0, glup = -1, rotulos = 0, brilloTubo = 0 }) {
  const dT = `M ${TUBO[0]} C ${TUBO[1]} ${TUBO[2]} ${TUBO[3]}`;
  const g = krng(31);
  const part = (n, x0, x1, y0, y1, sd) => Array.from({ length: n }, (_, i) => { const a = g(), b = g(), f = g() * 9;
    return <circle key={sd + i} cx={klerp(x0, x1, a) + Math.sin(T * 2.2 + f) * 9} cy={klerp(y0, y1, b) + Math.cos(T * 1.9 + f) * 9} r={7} fill={OAIRE} opacity={0.85} />; });
  const nF = Math.round(14 * fuera), nD = Math.round(14 * dentro);
  const tubo = mixHex(OTEJ, KC.red, inflama), dx = -110 + 40 * tim;
  const coc = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 4.5, r = 46 * Math.exp(-a * 0.17); coc.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* tejido y hueso alrededor */}
    <rect x={-480} y={-250} width={880} height={820} rx={60} fill={OCARNE} stroke={OTEJ2} strokeWidth={8} />
    <path d="M -480 -170 C -560 -170 -580 -60 -540 -60 L -480 -60 Z M -480 60 L -540 60 C -580 60 -560 180 -480 180 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    {/* conducto del oído (afuera) */}
    <rect x={-540} y={-60} width={430} height={120} fill={OHUECO} />
    {part(nF, -520, -140, -45, 45, 'f')}
    {/* oído medio: la cajita de aire */}
    <rect x={-110} y={-140} width={220} height={262} rx={48} fill={OHUECO} stroke={OAIRE} strokeWidth={5} strokeOpacity={0.6} />
    {part(nD, -70, 90, -120, 100, 'd')}
    {/* caracol (oído interno) y huesecillos */}
    <g transform="translate(205 -45)"><polyline points={coc.join(' ')} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" /><polyline points={coc.join(' ')} fill="none" stroke="#f7b7c8" strokeWidth={13} strokeLinecap="round" /></g>
    <polyline points={`${dx},0 -30,-70 40,-55 112,-45`} fill="none" stroke={KC.ink} strokeWidth={20} strokeLinejoin="round" strokeLinecap="round" />
    <polyline points={`${dx},0 -30,-70 40,-55 112,-45`} fill="none" stroke={OHUESO} strokeWidth={11} strokeLinejoin="round" strokeLinecap="round" />
    {/* trompa de Eustaquio */}
    <path d={dT} fill="none" stroke={KC.ink} strokeWidth={84 + inflama * 40} strokeLinecap="round" />
    <path d={dT} fill="none" stroke={tubo} strokeWidth={72 + inflama * 40} strokeLinecap="round" />
    {brilloTubo > 0 && <path d={dT} fill="none" stroke={KC.yellow} strokeWidth={90 + inflama * 40} strokeLinecap="round" opacity={0.35 * brilloTubo * (0.6 + 0.4 * Math.sin(T * 8))} />}
    <path d={dT} fill="none" stroke={OHUECO} strokeWidth={4 + abre * 30} strokeLinecap="round" />
    {flujo > 0 && Array.from({ length: 5 }, (_, i) => { const f = ((T * 0.9 + i / 5) % 1), [bx, by] = bez(TUBO, 1 - f);
      return <circle key={i} cx={bx} cy={by} r={6 + 8 * abre} fill={OAIRE} stroke="#fff" strokeWidth={3} opacity={flujo * abre * Math.sin(Math.PI * f)} />; })}
    {/* garganta */}
    <rect x={240} y={420} width={130} height={150} rx={30} fill={OHUECO} stroke={OTEJ2} strokeWidth={6} />
    {glup >= 0 && glup <= 1 && <ellipse cx={305} cy={klerp(560, 440, glup)} rx={56} ry={24} fill={OTEJ} stroke={KC.ink} strokeWidth={6} opacity={Math.sin(Math.PI * glup)} />}
    {/* tímpano */}
    <path d={`M -110 -110 Q ${-110 + 80 * tim} 0 -110 110`} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M -110 -110 Q ${-110 + 80 * tim} 0 -110 110`} fill="none" stroke={tim > 0.3 ? mixHex(OTEJ, KC.red, kclamp(tim, 0, 1)) : OTEJ} strokeWidth={13} strokeLinecap="round" />
    {empuja > 0 && [-36, 0, 36].map((yy, i) => <FlechaRecta key={i} x1={-500} y1={yy} x2={-150 + 30 * tim} y2={yy * 0.6} p={kprog(empuja, i * 0.15, 0.6 + i * 0.15)} color={KC.yellow} grosor={10} punta={26} />)}
    {rotulos > 0 && <g opacity={rotulos}>
      <Rot x={-120} y={-170} ancla="end" color={OTEJ}>tímpano</Rot>
      <Rot x={0} y={170} color={OAIRE}>oído medio</Rot>
    </g>}
  </g>;
}

// Avión de lado (mirando a la derecha).
function Avion({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -220 -10 L -270 -110 L -215 -110 L -150 -25 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -260 -30 C -260 -55 -200 -55 -100 -55 L 180 -55 C 260 -55 290 -20 290 0 C 290 25 250 40 180 40 L -180 40 C -240 40 -260 10 -260 -30 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d="M 205 -40 C 240 -38 262 -24 270 -10 L 215 -10 Z" fill={OHUECO} />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={-150 + i * 42} cy={-18} r={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -40 10 L -120 110 L -60 110 L 70 10 Z" fill="#cfd6e0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-60} y={44} width={80} height={36} rx={16} fill="#8a93a3" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Ventanilla del avión con el cielo; suelo 0..1 = qué tan cerca se ve la tierra (aterrizando).
function Ventanilla({ x, y, w = 300, h = 380, T = 0, suelo = 0, pista = 0 }) {
  const id = 'vent' + Math.round(x) + Math.round(y);
  const gy = klerp(h + 40, h * 0.42, suelo);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><rect x={0} y={0} width={w} height={h} rx={w / 2.4} /></clipPath></defs>
    <rect x={-26} y={-26} width={w + 52} height={h + 52} rx={w / 2.1} fill="#e9e4da" stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#${id})`}>
      <rect x={0} y={0} width={w} height={h} fill="#7fd3ff" />
      {[0, 1, 2].map((i) => <Nube key={i} x={((i * 170 - T * 90) % (w + 300) + w + 300) % (w + 300) - 120} y={70 + i * 90 + suelo * 120} s={0.42} />)}
      <rect x={0} y={gy} width={w} height={h} fill={KC.leaf} />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={((i * 70 - T * 160 * (0.4 + suelo)) % (w + 70) + w + 70) % (w + 70) - 40} y={gy + 30 + (i % 3) * 40} width={40} height={20} rx={6} fill="#2e8f3a" />)}
      {pista > 0 && <rect x={0} y={gy + 70} width={w} height={60} fill="#555" opacity={pista} />}
    </g>
    <rect x={0} y={0} width={w} height={h} rx={w / 2.4} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Mano que tapa la oreja.
function ManoOreja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-80} width={120} height={150} rx={52} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {[-40, -13, 14, 41].map((xx) => <rect key={xx} x={xx - 12} y={-138} width={24} height={82} rx={12} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-36} y={60} width={72} height={230} rx={28} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Bebé con biberón en brazos.
function BebeBiberon({ x, y, s = 1, T = 0, chupa = 1 }) {
  const m = chupa * Math.sin(T * 9) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={30} cy={170} rx={250} ry={120} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} />
    <path d="M -230 150 C -150 270 150 300 290 200 L 300 260 C 160 360 -170 330 -260 210 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={-90} cy={20} r={120} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -80 Q -110 -120 -80 -96 Q -70 -130 -40 -100" fill="none" stroke={CPELO} strokeWidth={9} strokeLinecap="round" />
    <path d="M -140 0 Q -125 12 -110 0 M -70 -4 Q -55 8 -40 -4" fill="none" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <circle cx={-150} cy={40} r={18} fill="#f59a9a" opacity={0.7} /><circle cx={-30} cy={40} r={18} fill="#f59a9a" opacity={0.7} />
    <g transform={`translate(${-60 + m} 66) rotate(-28)`}>
      <path d="M -14 0 Q -14 -26 0 -30 Q 14 -26 14 0 Z" fill="#f2c26b" stroke={KC.ink} strokeWidth={6} />
      <rect x={-30} y={0} width={60} height={20} rx={6} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
      <rect x={-34} y={20} width={68} height={170} rx={22} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
      <rect x={-28} y={70} width={56} height={114} rx={16} fill="#fff8e7" />
      {[60, 100, 140].map((yy) => <line key={yy} x1={10} y1={yy} x2={30} y2={yy} stroke={KC.ink} strokeWidth={4} />)}
    </g>
  </g>;
}
function Chicle({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 3) * 6})`}>
    <rect x={-110} y={-45} width={220} height={90} rx={18} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <rect x={-40} y={-45} width={80} height={90} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={130} cy={-70} r={40 + 10 * Math.abs(Math.sin(T * 2))} fill="#ff9ec4" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Vaso({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -100 L 70 -100 L 52 100 L -52 100 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -62 ${-30 + Math.sin(T * 4) * 5} Q 0 ${-40 - Math.sin(T * 4) * 5} 62 ${-30 + Math.sin(T * 4) * 5} L 52 96 L -52 96 Z`} fill={KC.cyan} opacity={0.8} />
  </g>;
}
// Carro de lado.
function Carro({ x, y, s = 1, rot = 0, T = 0, dir = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * dir} ${s})`}>
    <path d="M -110 0 L -110 -40 L -60 -45 L -30 -85 L 50 -85 L 85 -45 L 115 -40 L 115 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -20 -75 L 40 -75 L 65 -45 L -45 -45 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
    {[-60, 65].map((cx) => <g key={cx} transform={`translate(${cx} 4) rotate(${T * 400})`}><circle r={26} fill="#333" stroke={KC.ink} strokeWidth={6} /><line x1={-14} y1={0} x2={14} y2={0} stroke="#bbb" strokeWidth={5} /></g>)}
  </g>;
}

// cabeza del pasajero (gancho y cierre)
const PH = { x: 330, y: 930, s: 1.45 };
const OREJA_P = [PH.x - 75 * PH.s, PH.y + 10 * PH.s];
// centro del corte grande del oído (escenas por dentro)
const OC = { x: 560, y: 660, s: 1.0 };

function OidosAvion() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const presCab = (t) => klerp(0.72, 0.97, kprog(t, K.Bajada + 0.3, K.Bajada + 3.2, kEase.suave));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: pasajero tapándose el oído en el avión que aterriza */}
      <Escena T={T} a={K.Gancho} b={K.Oido}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Ventanilla x={690} y={760} w={300} h={380} T={T} suelo={0.35 + 0.1 * kprog(T, 0, K.Oido)} />
          <OndasArco x={680} y={980} ang={180} T={T} color={KC.yellow} largo={170} o={1 - 0.6 * kprog(T, K.Gancho + 1.6, K.Gancho + 2.2)} />
          <CabezaPerfil x={PH.x} y={PH.y} s={PH.s} gesto="mueca" />
          <g transform={`translate(0 ${(1 - kprog(T, K.Gancho + 0.05, K.Gancho + 0.6, kEase.rebote)) * 700})`}><ManoOreja x={OREJA_P[0] - 5} y={OREJA_P[1] + 20} s={1.1} /></g>
          <FlechaRecta x1={OREJA_P[0] - 200} y1={OREJA_P[1] + 330} x2={OREJA_P[0] - 40} y2={OREJA_P[1] + 90} p={kprog(T, K.Gancho + 3.0, K.Gancho + 3.6, kEase.sale)} color={KC.cyan} />
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 0.6} tacharEn={K.Gancho + 2.0} until={K.Oido - 0.1} texto="¿por el ruido?" x={300} y={470} />
        <Chip T={T} at={K.Gancho + 3.2} until={K.Oido - 0.1} texto="aire atrapado" x={270} y={600} tam={40} borde={KC.cyan} />
      </Escena>

      {/* 1 · por dentro: la cajita de aire detrás del tímpano */}
      <Escena T={T} a={K.Oido} b={K.Trompa} fondo={KC.noche}>
        <Ambiente T={T} n={22} color="rgba(255,255,255,.12)" />
        <Lienzo><g opacity={1 - 0.5 * kprog(T, K.Oido + 0.8, K.Oido + 1.5)}><CabezaPerfil x={300} y={1000} s={1.1} corte={0.5} /></g></Lienzo>
        <Lupa T={T} at={K.Oido + 0.25} until={K.Trompa + 0.2} x={610} y={720} r={330} fx={300 - 75 * 1.1} fy={1000 + 11} tinte={KC.cyan} etiqueta="POR DENTRO · OÍDO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
            <OidoCorte x={r + 70} y={r - 40} s={0.95} T={t} rotulos={kprog(t, K.Oido + 1.0, K.Oido + 1.5)} /></svg>} />
      </Escena>

      {/* 2 · la trompa de Eustaquio, casi siempre cerrada */}
      <Escena T={T} a={K.Trompa} b={K.Cabina} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <OidoCorte x={OC.x} y={OC.y} s={OC.s} T={T} rotulos={1} brilloTubo={kprog(T, K.Trompa + 0.6, K.Trompa + 1.2) * (1 - kprog(T, K.Trompa + 4, K.Trompa + 4.5))} />
          <g opacity={kprog(T, K.Trompa + 0.6, K.Trompa + 1.1)}><Rot x={OC.x + 30} y={OC.y + 250} ancla="end" color={KC.yellow}>trompa de</Rot><Rot x={OC.x + 30} y={OC.y + 300} ancla="end" color={KC.yellow}>Eustaquio</Rot></g>
          <g opacity={kprog(T, K.Trompa + 0.2, K.Trompa + 0.7)}><Rot x={OC.x + 225} y={OC.y + 520} ancla="end" color={OTEJ}>garganta</Rot></g>
        </Lienzo>
        <Chip T={T} at={K.Trompa + 3.2} until={K.Cabina - 0.1} texto="casi siempre: cerrado" x={540} y={400} tam={42} borde={KC.yellow} />
      </Escena>

      {/* 3 · la cabina va presurizada, con menos presión que a nivel del mar */}
      <Escena T={T} a={K.Cabina} b={K.Bajada} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Nube x={((900 - (T - K.Cabina) * 120) % 1400 + 1400) % 1400 - 200} y={420} s={0.9} />
          <Nube x={((300 - (T - K.Cabina) * 80) % 1400 + 1400) % 1400 - 200} y={1150} s={0.7} />
          <Avion x={540 + Math.sin(T * 1.3) * 10} y={640 + Math.sin(T * 2) * 8} s={1.25} />
          <g opacity={kprog(T, K.Cabina + 1.4, K.Cabina + 1.9)}>
            <rect x={90} y={830} width={900} height={330} rx={36} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            <BarraH x={140} y={920} ancho={800} v={kprog(T, K.Cabina + 1.6, K.Cabina + 2.4, kEase.sale)} color={KC.mint} etiqueta="nivel del mar" />
            <BarraH x={140} y={1060} ancho={800} v={0.72 * kprog(T, K.Cabina + 2.6, K.Cabina + 3.4, kEase.sale)} color={KC.yellow} etiqueta="presión de la cabina" />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Cabina + 0.4} until={K.Bajada - 0.1} texto="cabina presurizada" x={540} y={420} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Cabina + 3.4} until={K.Bajada - 0.1} texto="menos presión" x={760} y={1110} tam={34} borde={KC.yellow} />
      </Escena>

      {/* 4 · al bajar, la presión sube y empuja el tímpano hacia adentro */}
      <Escena T={T} a={K.Bajada} b={K.Pregunta} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Montana x={200} y={1250} ancho={700} alto={300} color={KC.leaf} nieve={false} />
          <Montana x={800} y={1250} ancho={800} alto={380} color="#46a85a" nieve={false} />
          <Avion x={klerp(900, 300, kprog(T, K.Bajada, K.Pregunta))} y={klerp(620, 900, kprog(T, K.Bajada, K.Pregunta))} s={0.7} rot={14} />
          <rect x={90} y={360} width={900} height={150} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
          <BarraH x={140} y={420} ancho={800} v={presCab(T)} color={KC.yellow} etiqueta="presión de la cabina" />
          {T > K.Bajada + 0.3 && <TextoSvg x={930} y={480} tam={70} color={KC.yellow} o={kprog(T, K.Bajada + 0.4, K.Bajada + 0.8)}>▲</TextoSvg>}
        </Lienzo>
        <Lupa T={T} at={K.Bajada + 1.6} until={K.Pregunta - 0.1} x={540} y={820} r={260} fx={() => klerp(900, 300, kprog(K.Bajada + 1.6, K.Bajada, K.Pregunta)) - 60} fy={() => klerp(620, 900, kprog(K.Bajada + 1.6, K.Bajada, K.Pregunta)) - 10} tinte={KC.yellow} etiqueta="POR DENTRO · TÍMPANO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
            <OidoCorte x={r + 50} y={r + 10} s={0.62} T={t} tim={kprog(t, K.Bajada + 2.4, K.Bajada + 3.4, kEase.sale)} fuera={klerp(1, 2, kprog(t, K.Bajada + 1.8, K.Bajada + 3))} dentro={0.7}
              empuja={kprog(t, K.Bajada + 2.2, K.Bajada + 3.4)} />
            <Rot x={r} y={r - 150} tam={44} color={KC.yellow} o={kprog(t, K.Bajada + 3.0, K.Bajada + 3.4)}>hacia adentro</Rot></svg>} />
      </Escena>

      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Trago} />

      {/* 6 · tragas o bostezas: el tubito se abre, pasa aire, ¡pop! */}
      <Escena T={T} a={K.Trago} b={K.Consejos} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <OidoCorte x={OC.x} y={OC.y} s={OC.s} T={T} rotulos={1}
            tim={1 - kprog(T, K.Trago + 2.6, K.Trago + 3.4, kEase.rebote)}
            abre={kprog(T, K.Trago + 1.8, K.Trago + 2.2) * (1 - kprog(T, K.Trago + 3.6, K.Trago + 4.2))}
            flujo={1} fuera={2} dentro={klerp(0.7, 2, kprog(T, K.Trago + 2.2, K.Trago + 3.4))}
            glup={kprog(T, K.Trago + 0.9, K.Trago + 1.9)} />
          <Onomato T={T} at={K.Trago + 3.3} dur={2.2} x={OC.x + 190} y={OC.y - 140} texto="¡POP!" tam={170} />
        </Lienzo>
        <Chip T={T} at={K.Trago + 0.2} until={K.Trago + 2.8} texto="tragas o bostezas" x={540} y={400} tam={42} borde={OTEJ} />
        <Chip T={T} at={K.Trago + 3.5} until={K.Consejos - 0.1} texto="la presión se iguala" x={540} y={1180} tam={40} borde={KC.cyan} />
      </Escena>

      {/* 7 · consejos: chicle, tragar seguido, bostezar */}
      <Escena T={T} a={K.Consejos} b={K.Bebes} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {[[K.Consejos + 0.6, 270, 610, 'masticar chicle'], [K.Consejos + 1.5, 810, 610, 'tragar seguido'], [K.Consejos + 2.3, 540, 980, 'bostezar']].map(([at, xx, yy, lab], i) => {
            const e = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={i} transform={`translate(${xx} ${yy}) scale(${e})`}>
              <circle r={140} fill="#fff" stroke={KC.ink} strokeWidth={9} />
              {i === 0 && <Chicle x={-15} y={15} s={0.75} T={T} />}
              {i === 1 && <Vaso x={0} y={0} s={0.85} T={T} />}
              {i === 2 && <CabezaPerfil x={-20} y={-10} s={0.5} boca={0.6 + 0.4 * Math.abs(Math.sin(T * 1.5))} />}
              <Rot x={0} y={195} tam={44}>{lab}</Rot>
            </g>; })}
        </Lienzo>
        <Chip T={T} at={K.Consejos + 3.4} until={K.Bebes - 0.1} texto="sobre todo: al empezar a bajar" x={540} y={420} tam={38} borde={KC.ink} />
      </Escena>

      {/* 8 · bebés: pecho o biberón durante el aterrizaje */}
      <Escena T={T} a={K.Bebes} b={K.Gripa} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Ventanilla x={650} y={420} w={280} h={340} T={T} suelo={klerp(0.5, 0.95, kprog(T, K.Bebes, K.Gripa))} pista={kprog(T, K.Bebes + 2, K.Bebes + 3.5)} />
          <BebeBiberon x={430} y={800} s={1.15} T={T} chupa={1} />
          {[0, 1, 2].map((i) => { const f = ((T - K.Bebes) * 0.9 + i / 3) % 1;
            return T > K.Bebes + 2.4 && <circle key={i} cx={250} cy={860 - f * 140} r={14 + f * 8} fill="none" stroke={KC.ink} strokeWidth={6} opacity={1 - f} />; })}
        </Lienzo>
        <Chip T={T} at={K.Bebes + 0.5} until={K.Gripa - 0.1} texto="pecho o biberón" x={300} y={420} tam={42} borde={KC.pink} />
        <Chip T={T} at={K.Bebes + 1.2} until={K.Gripa - 0.1} texto="al aterrizar" x={790} y={840} tam={36} borde={KC.ink} />
        <Chip T={T} at={K.Bebes + 2.6} until={K.Gripa - 0.1} texto="así tragan seguido" x={380} y={1175} tam={38} borde={KC.ink} />
      </Escena>

      {/* 9 · con gripa o alergia: el tubito se inflama */}
      <Escena T={T} a={K.Gripa} b={K.Montana} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <OidoCorte x={OC.x} y={OC.y} s={OC.s} T={T} rotulos={1} inflama={kprog(T, K.Gripa + 0.6, K.Gripa + 1.8, kEase.sale)}
            abre={0.12 * Math.max(0, Math.sin((T - K.Gripa) * 6)) * kprog(T, K.Gripa + 2.4, K.Gripa + 2.8)} tim={0.9} fuera={2} dentro={0.7}
            glup={T > K.Gripa + 2.2 ? ((T - K.Gripa - 2.2) * 0.9) % 1 : -1} />
          <Alerta x={OC.x + 380} y={OC.y + 330} s={0.8} color={KC.red} />
        </Lienzo>
        <Chip T={T} at={K.Gripa + 0.2} until={K.Montana - 0.1} texto="gripa o alergia" x={540} y={400} tam={44} borde={KC.red} />
        <Etq T={T} at={K.Gripa + 1.4} until={K.Montana - 0.1} x={OC.x + 60} y={OC.y + 330} texto="se inflama" color={KC.red} lado="izq" tam={42} />
        <Chip T={T} at={K.Gripa + 2.6} until={K.Montana - 0.1} texto="cuesta más destaparlo" x={540} y={1180} tam={38} borde={KC.red} />
      </Escena>

      {/* 10 · lo mismo al bajar una montaña en carro */}
      <Escena T={T} a={K.Montana} b={K.Cierre} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <SolDibujo x={880} y={460} r={60} T={T} />
          <Montana x={540} y={1240} ancho={1300} alto={780} color="#8a7b9e" />
          {(() => { const ruta = [[620, 520], [300, 700], [800, 900], [180, 1200]]; const f = kprog(T, K.Montana - 0.3, K.Cierre - 0.2, kEase.suave); const [cx, cy] = bez(ruta, f), [nx, ny] = bez(ruta, Math.min(1, f + 0.02));
            return <><path d={`M ${ruta[0]} C ${ruta[1]} ${ruta[2]} ${ruta[3]}`} fill="none" stroke="#3b3b44" strokeWidth={46} strokeLinecap="round" />
              <path d={`M ${ruta[0]} C ${ruta[1]} ${ruta[2]} ${ruta[3]}`} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="22 22" />
              <Carro x={cx} y={cy - 26} s={0.9} dir={nx < cx ? -1 : 1} rot={Math.atan2(ny - cy, Math.abs(nx - cx)) * 180 / Math.PI * (nx < cx ? -1 : 1)} T={T} /></>; })()}
          <Onomato T={T} at={K.Montana + 2.0} dur={1.3} x={620} y={760} texto="¡POP!" tam={140} />
        </Lienzo>
        <Chip T={T} at={K.Montana + 0.3} until={K.Cierre - 0.1} texto="bajando la montaña" x={540} y={420} tam={42} borde={KC.ink} />
      </Escena>

      {/* 11 · cierre: el mismo pasajero, ya destapado */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Ventanilla x={690} y={760} w={300} h={380} T={T} suelo={0.95} pista={1} />
          <CabezaPerfil x={PH.x} y={PH.y} s={PH.s} gesto={T > K.Cierre + 1.4 ? 'sonrie' : 'mueca'} />
          <g opacity={1 - kprog(T, K.Cierre + 0.9, K.Cierre + 1.3)} transform={`translate(0 ${kprog(T, K.Cierre + 0.6, K.Cierre + 1.3, kEase.sale) * 900})`}><ManoOreja x={OREJA_P[0] - 5} y={OREJA_P[1] + 20} s={1.1} /></g>
          <Onomato T={T} at={K.Cierre + 1.3} dur={1.4} x={OREJA_P[0] - 20} y={OREJA_P[1] - 260} texto="¡pop!" tam={120} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.0} until={K.Outro - 0.1} texto="el aire se iguala" x={330} y={470} tam={44} borde={KC.cyan} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Oido - 0.1} texto="No es el ruido: *es aire.*" />
      <Subtitulo T={T} idx={1} at={K.Oido + 0.1} until={K.Trompa - 0.1} texto="Una *cajita de aire.*" />
      <Subtitulo T={T} idx={2} at={K.Trompa + 0.1} until={K.Cabina - 0.1} texto="Un tubito: *la trompa.*" />
      <Subtitulo T={T} idx={3} at={K.Cabina + 0.1} until={K.Bajada - 0.1} texto="La cabina: *menos presión.*" />
      <Subtitulo T={T} idx={4} at={K.Bajada + 0.1} until={K.Pregunta - 0.1} texto="Al bajar: *empuja.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Trago - 0.1} texto="¿Por qué *truena?*" />
      <Subtitulo T={T} idx={6} at={K.Trago + 0.1} until={K.Consejos - 0.1} texto="Se abre y… *¡pop!*" />
      <Subtitulo T={T} idx={7} at={K.Consejos + 0.1} until={K.Bebes - 0.1} texto="Chicle, *tragar, bostezar.*" />
      <Subtitulo T={T} idx={8} at={K.Bebes + 0.1} until={K.Gripa - 0.1} texto="Bebés: *pecho o biberón.*" />
      <Subtitulo T={T} idx={9} at={K.Gripa + 0.1} until={K.Montana - 0.1} texto="Con gripa: *se inflama.*" />
      <Subtitulo T={T} idx={10} at={K.Montana + 0.1} until={K.Cierre - 0.1} texto="También *en carro.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu tímpano *esperando.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Trompa + 0.8, K.Trompa + 5.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cabina + 0.6, K.Cabina + 4.6, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Bajada + 2.0, K.Pregunta - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Pregunta + 0.05, K.Trago + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Trago + 3.4, K.Consejos - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Consejos + 2.8, K.Bebes - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Bebes + 1.0, K.Gripa - 0.1, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Gripa + 0.4, K.Montana - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Montana + 0.2, K.Cierre - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cierre + 1.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="55" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function OidosAvionApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OidosAvion /></CompositionStage></div>;
}
window.OidosAvionApp = OidosAvionApp;
