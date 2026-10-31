// Shot Científico #46 · Saltar en un elevador que cae (casi seguro) no te salvaría — NARRADO (N6 mito «¿Por qué NO…?» + N3 medidores).
// Datos: caída libre v = √(2gh) (cálculo simplificado, sin aire), Baird 2012, Barnes 2018, Otis 1854, Title 8 §3035/§3042, Otis Elevator.
// Ver guion.md y verificacion.md. Tono tranquilo: nunca se dibuja un choque.
const C_POZO = '#33284a', C_RIEL = '#9aa3b5', C_CAB = '#c9ced8', C_PARED = '#f3e3c3';

// Película: tira de cine con perforaciones que corren (off en px).
function TiraCine({ x, y, w, h, off = 0 }) {
  const paso = 70;
  const filas = Array.from({ length: Math.ceil(h / paso) + 2 }, (_, k) => y - paso + ((off % paso) + paso) % paso + k * paso).filter((yy) => yy > y - 10 && yy < y + h - 30);
  return <g>
    {[x - 70, x + w].map((xx, j) => <g key={j}>
      <rect x={xx} y={y} width={70} height={h} fill={KC.ink} />
      {filas.map((yy, i) => <rect key={i} x={xx + 20} y={yy} width={30} height={40} rx={7} fill="#f6f3ec" opacity=".85" />)}
    </g>)}
  </g>;
}
// Pozo del elevador: muro oscuro con juntas.
function Pozo({ x, y, w, h, off = 0 }) {
  const juntas = Array.from({ length: Math.ceil(h / 120) + 2 }, (_, k) => y - 120 + ((off % 120) + 120) % 120 + k * 120).filter((yy) => yy > y && yy < y + h);
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={C_POZO} stroke={KC.ink} strokeWidth={10} />
    {juntas.map((yy, i) => <line key={i} x1={x + 8} y1={yy} x2={x + w - 8} y2={yy} stroke="rgba(255,255,255,.08)" strokeWidth={6} />)}
  </g>;
}
// Rieles guía con muescas (off = desplazamiento: si corre, la cabina va cayendo).
function Rieles({ xs, y0, y1, off = 0, paso = 64, ancho = 30 }) {
  const ms = Array.from({ length: Math.ceil((y1 - y0) / paso) + 2 }, (_, k) => y0 - paso + ((off % paso) + paso) % paso + k * paso).filter((yy) => yy > y0 && yy < y1 - 14);
  return <g>{xs.map((x, j) => <g key={j}>
    <rect x={x - ancho / 2} y={y0} width={ancho} height={y1 - y0} fill={C_RIEL} stroke={KC.ink} strokeWidth={6} />
    {ms.map((yy, i) => <rect key={i} x={x - ancho / 2 + 6} y={yy} width={ancho - 12} height={14} rx={3} fill="#4a5163" />)}
  </g>)}</g>;
}
// Líneas de velocidad (caída): corren hacia arriba.
function LineasCaida({ x, y, w, h, T, vel = 1500, n = 7, o = 1 }) {
  const g = krng(31);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const xx = x + g() * w, L = 80 + g() * 120, f = ((T * vel / h + g()) % 1); const yy = y + h - f * (h + L);
    return <line key={i} x1={xx} y1={yy} x2={xx} y2={yy + L} stroke="rgba(255,255,255,.55)" strokeWidth={7} strokeLinecap="round" />; })}</g>;
}
// Cabina vista por dentro (corte). (x, y) = centro. persona: { dy, cara, brazos } o null.
// garras 0..1 = freno que se abre hacia los rieles. cables: cuántos cables; suelto = cable flojo que se mece.
function Cabina({ x, y, w = 320, h = 400, T = 0, persona = { dy: 0, cara: 'normal', brazos: 0 }, garras = 0, cables = 1, suelto = 0, brillo = [], color = KC.pink, puertas = 0, largo = 150, hasta = -200 }) {
  const top = y - h / 2, bot = y + h / 2, sp = (h * 0.7) / 600;
  return <g>
    {Array.from({ length: cables }, (_, i) => { const cx = x + (i - (cables - 1) / 2) * 26;
      if (suelto > 0) { const L = largo, d = `M ${cx} ${top} q ${30 * Math.sin(T * 6 + i)} ${-L / 2} 0 ${-L} t ${-20 * Math.sin(T * 5)} ${-L}`;
        return <path key={i} d={d} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" opacity={suelto} />; }
      const on = brillo[i] || 0;
      return <g key={i}>{on > 0 && <line x1={cx} y1={top} x2={cx} y2={hasta} stroke={KC.gold2} strokeWidth={26} opacity={on * 0.6} strokeLinecap="round" />}
        <line x1={cx} y1={top} x2={cx} y2={hasta} stroke={on > 0.5 ? KC.gold : '#2a2a2a'} strokeWidth={10} /></g>; })}
    {/* zapatas que abrazan los rieles */}
    {[-1, 1].map((sg) => [top + 26, bot - 40].map((yy, k) => <rect key={`${sg}${k}`} x={sg < 0 ? x - w / 2 - 34 : x + w / 2} y={yy} width={34} height={22} rx={5} fill="#596276" stroke={KC.ink} strokeWidth={5} />))}
    {/* garras del freno */}
    {[-1, 1].map((sg) => { const gx = x + sg * (w / 2 + 6 + garras * 26), gy = bot - 8;
      return <path key={sg} d={`M ${gx - sg * 30} ${gy - 34} L ${gx + sg * 8} ${gy - 18} L ${gx - sg * 30} ${gy}`} fill={KC.gold} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />; })}
    <rect x={x - w / 2} y={top} width={w} height={h} rx={14} fill={C_CAB} stroke={KC.ink} strokeWidth={10} />
    <rect x={x - w / 2 + 20} y={top + 34} width={w - 40} height={h - 58} rx={6} fill={C_PARED} stroke={KC.ink} strokeWidth={6} />
    <rect x={x - w / 2 + 40} y={top + 12} width={w - 80} height={14} rx={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    {puertas > 0 && <g opacity={puertas}><rect x={x - w / 2 + 34} y={top + 50} width={w / 2 - 36} height={h - 86} fill="#d9dde6" stroke={KC.ink} strokeWidth={5} />
      <rect x={x + 2} y={top + 50} width={w / 2 - 36} height={h - 86} fill="#d9dde6" stroke={KC.ink} strokeWidth={5} /></g>}
    <line x1={x - w / 2 + 28} y1={y + h * 0.05} x2={x + w / 2 - 28} y2={y + h * 0.05} stroke="#8b8f99" strokeWidth={8} strokeLinecap="round" />
    <rect x={x - w / 2 + 20} y={bot - 30} width={w - 40} height={10} fill="#9b7b55" />
    {persona && <g transform={`translate(${x} ${bot - 26 + (persona.dy || 0)}) scale(${sp})`}><PersonaSimple x={0} yPies={0} alto={600} color={color} cara={persona.cara || 'normal'} brazos={persona.brazos || 0} /></g>}
  </g>;
}
// Velocímetro de media luna (v 0..1). Sin números en la escala: solo la zona roja.
function Velocimetro({ cx, cy, r = 190, v = 0 }) {
  const ang = (q) => Math.PI * (1 - q), pt = (q, rr) => [cx + Math.cos(ang(q)) * rr, cy - Math.sin(ang(q)) * rr];
  const arco = (q0, q1, rr) => { const [x0, y0] = pt(q0, rr), [x1, y1] = pt(q1, rr); return `M ${x0} ${y0} A ${rr} ${rr} 0 0 1 ${x1} ${y1}`; };
  const [nx, ny] = pt(v, r * 0.82);
  return <g>
    <path d={`${arco(0, 1, r)} L ${cx + r} ${cy + 20} L ${cx - r} ${cy + 20} Z`} fill="#fff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={arco(0.02, 0.45, r - 34)} fill="none" stroke={KC.mint} strokeWidth={30} />
    <path d={arco(0.45, 0.66, r - 34)} fill="none" stroke={KC.yellow} strokeWidth={30} />
    <path d={arco(0.66, 0.98, r - 34)} fill="none" stroke={KC.red} strokeWidth={30} />
    {Array.from({ length: 13 }, (_, i) => { const [a, b] = pt(i / 12, r - 8), [c, d] = pt(i / 12, r - (i % 3 ? 22 : 36)); return <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <circle cx={cx} cy={cy} r={22} fill={KC.ink} />
  </g>;
}
// Edificio de 10 pisos con su cubo del elevador.
function Edificio({ x, base, ancho = 280, pisos = 10, altoPiso = 70, cab = 0, T = 0 }) {
  const top = base - pisos * altoPiso;
  return <g>
    <rect x={x} y={top} width={ancho} height={pisos * altoPiso} fill="#7fa7d9" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: pisos }, (_, i) => <g key={i}>
      <line x1={x} y1={top + i * altoPiso} x2={x + ancho} y2={top + i * altoPiso} stroke={KC.ink} strokeWidth={4} opacity=".5" />
      {[0.12, 0.72].map((fx, j) => <rect key={j} x={x + ancho * fx} y={top + i * altoPiso + 16} width={ancho * 0.16} height={altoPiso - 32} rx={4} fill="#ffe9a8" stroke={KC.ink} strokeWidth={4} />)}
    </g>)}
    <rect x={x + ancho * 0.36} y={top} width={ancho * 0.28} height={pisos * altoPiso} fill={C_POZO} stroke={KC.ink} strokeWidth={6} />
    <rect x={x + ancho * 0.38} y={klerp(top + 6, base - altoPiso + 6, cab)} width={ancho * 0.24} height={altoPiso - 12} rx={6} fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
    <rect x={x - 30} y={base} width={ancho + 60} height={22} fill="#5b4a3a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Reloj con signo de pregunta en la carátula.
function RelojDuda({ x, y, r = 100, T }) {
  const a = T * 4;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 10} x2={0} y2={-r + 24} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <text x={0} y={r * 0.42} textAnchor="middle" style={{ font:`400 ${r * 1.15}px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">?</text>
    <line x1={0} y1={0} x2={Math.sin(a) * r * 0.75} y2={-Math.cos(a) * r * 0.75} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Botón de alarma con campana.
function BotonAlarma({ x, y, r = 80, hunde = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 14} fill="#7c818c" stroke={KC.ink} strokeWidth={8} />
    <circle r={r} cy={hunde * 6} fill={hunde > 0.5 ? KC.gold2 : KC.yellow} stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 ${hunde * 6 - 4}) scale(${r / 80})`}>
      <path d="M -34 22 Q -30 -36 0 -40 Q 30 -36 34 22 Z" fill={KC.ink} />
      <rect x={-42} y={20} width={84} height={10} rx={5} fill={KC.ink} /><circle cx={0} cy={38} r={9} fill={KC.ink} />
    </g>
  </g>;
}
// Mano que aprieta (dedo índice hacia la izquierda).
function ManoDedo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={-50} width={150} height={110} rx={44} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={-46} width={120} height={36} rx={18} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <rect x={120} y={-40} width={260} height={90} rx={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Sello de goma «¿MITO?» que cae y se estampa.
function Sello({ T, at, until, texto, x, y, color = KC.red, rot = -10, tam = 120 }) {
  if (!kvisible(T, at, until)) return null;
  const p = kprog(T, at, at + 0.28, kEase.sale), o = 1 - kprog(T, until, until + 0.35);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:44, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.4, 1, p)})`, opacity:p * o,
    border:`10px solid ${color}`, borderRadius:22, padding:'0 30px', color, font:`400 ${tam}px/1.15 ${KF.titulo}`, background:'rgba(255,255,255,.88)', whiteSpace:'nowrap', boxShadow:'0 10px 26px rgba(0,0,0,.35)' }}>{texto}</div>;
}
// Texto chico de aviso (mono).
function Nota({ T, at, until, texto, x, y, color = KC.ink, fondo = 'rgba(255,255,255,.85)' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) translateY(${e.y * 0.3}px)`, opacity:e.o, font:`700 28px ${KF.mono}`, color, background:fondo, padding:'6px 16px', borderRadius:12, whiteSpace:'nowrap' }}>{texto}</div>;
}

function Elevador() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // salto del gancho: la persona se despega del piso un instante
  const saltoG = Math.sin(Math.PI * kprog(T, K.Gancho + 1.3, K.Gancho + 2.2));
  // caída del ejemplo (0..1 con aceleración) y aguja
  const caeE = Math.pow(kprog(T, K.Ejemplo + 0.6, K.Ejemplo + 3.8), 2);
  const aguja = 0.78 * caeE - 0.09 * kprog(T, K.Ejemplo + 5.3, K.Ejemplo + 6.0, kEase.sale);
  // frenos: el cable se suelta, la cabina baja un poco y las garras se traban
  const suelta = kprog(T, K.Frenos + 4.4, K.Frenos + 4.7), baja = kprog(T, K.Frenos + 4.5, K.Frenos + 5.0, kEase.suave), traba = kprog(T, K.Frenos + 4.95, K.Frenos + 5.2, kEase.rebote);
  const aprieta = kprog(T, K.Consejo + 2.4, K.Consejo + 2.8, kEase.sale) * (1 - kprog(T, K.Consejo + 3.3, K.Consejo + 3.7));
  const sonando = T > K.Consejo + 2.8;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: escena de película — la cabina cae y alguien salta */}
      <Escena T={T} a={K.Gancho} b={K.Mito}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <TiraCine x={150} y={360} w={420} h={870} off={T * 260} />
          <Pozo x={150} y={360} w={420} h={870} off={T * 900} />
          <Rieles xs={[190, 530]} y0={360} y1={1230} off={T * 900} />
          <LineasCaida x={200} y={360} w={320} h={300} T={T} />
          <g transform={`translate(${Math.sin(T * 37) * 3} 0)`}>
            <Cabina x={360} y={800} w={280} h={360} T={T} suelto={1} persona={{ dy: -70 * saltoG, cara: 'o', brazos: 0.5 * saltoG }} />
          </g>
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 0.9} tacharEn={999} until={K.Mito - 0.2} texto="«saltar te salva»" x={360} y={1010} tam={44} />
        <Sello T={T} at={K.Gancho + 1.9} until={K.Mito - 0.2} texto="¿MITO?" x={480} y={1135} tam={96} />
      </Escena>
      {/* 1 · en las películas: la persona flota con la cabina */}
      <Escena T={T} a={K.Mito} b={K.Velocidad}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <TiraCine x={220} y={540} w={640} h={640} off={T * 200} />
          <Pozo x={220} y={540} w={640} h={640} off={T * 900} />
          <Rieles xs={[262, 818]} y0={540} y1={1180} off={T * 900} />
          <LineasCaida x={280} y={540} w={520} h={200} T={T} />
          <Cabina x={540} y={870} w={420} h={430} T={T} suelto={1} persona={{ dy: -40 - 14 * Math.sin(T * 2.2), cara: 'o', brazos: 0.35 + 0.1 * Math.sin(T * 3) }} />
        </Lienzo>
        <Chip T={T} at={K.Mito + 0.2} until={K.Velocidad - 0.1} texto="🎬 en las películas" x={540} y={430} tam={44} borde={KC.ink} />
        <Etq T={T} at={K.Mito + 2.4} until={K.Velocidad - 0.2} x={640} y={760} texto="caen juntas" lado="der" color={KC.texto} />
      </Escena>
      {/* 2 · misma velocidad: dos flechas iguales */}
      <Escena T={T} a={K.Velocidad} b={K.Salto}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Pozo x={140} y={520} w={480} h={680} off={T * 900} />
          <Rieles xs={[176, 584]} y0={520} y1={1200} off={T * 900} />
          <Cabina x={380} y={860} w={330} h={400} T={T} suelto={1} persona={{ dy: 0, cara: 'normal' }} />
          <FlechaRecta x1={740} y1={600} x2={740} y2={1060} p={kprog(T, K.Velocidad + 0.5, K.Velocidad + 1.2, kEase.sale)} color={KC.pink} grosor={26} punta={48} />
          <FlechaRecta x1={920} y1={600} x2={920} y2={1060} p={kprog(T, K.Velocidad + 1.4, K.Velocidad + 2.1, kEase.sale)} color={KC.yellow} grosor={26} punta={48} />
          <TextoSvg x={740} y={570} tam={44} color={KC.pink} fuente="texto" o={kprog(T, K.Velocidad + 0.6, K.Velocidad + 0.9)}>cabina</TextoSvg>
          <TextoSvg x={920} y={570} tam={44} color={KC.yellow} fuente="texto" o={kprog(T, K.Velocidad + 1.5, K.Velocidad + 1.8)}>tú</TextoSvg>
          <TextoSvg x={830} y={1150} tam={90} color={KC.white} o={kprog(T, K.Velocidad + 2.2, K.Velocidad + 2.5)} s={klerp(0.6, 1, kprog(T, K.Velocidad + 2.2, K.Velocidad + 2.6, kEase.rebote))}>=</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Velocidad + 0.2} until={K.Salto - 0.1} texto="misma velocidad" x={540} y={430} tam={46} borde={KC.ink} />
      </Escena>
      {/* 3 · el salto solo le quita un poquito */}
      <Escena T={T} a={K.Salto} b={K.Ejemplo}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <BarraH x={140} y={620} ancho={800} alto={80} v={klerp(0, 1, kprog(T, K.Salto + 0.3, K.Salto + 1.1, kEase.sale)) - 0.12 * kprog(T, K.Salto + 1.8, K.Salto + 2.3, kEase.sale)} color={KC.red} etiqueta="velocidad de la caída" />
          {T > K.Salto + 1.4 && (() => { const q = kprog(T, K.Salto + 1.8, K.Salto + 2.5, kEase.sale); return <g opacity={1 - kprog(T, K.Salto + 3.2, K.Salto + 3.6)}>
            <rect x={140 + 800 * 0.88} y={620 - q * 120} width={800 * 0.12} height={80} rx={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Salto + 1.4, K.Salto + 1.6)} />
            <TextoSvg x={880} y={600 - q * 120 - 20} tam={44} color={KC.yellow} fuente="texto" o={q}>− salto</TextoSvg></g>; })()}
          <Pozo x={330} y={790} w={420} h={400} off={T * 900} />
          <Rieles xs={[364, 716]} y0={790} y1={1190} off={T * 900} />
          <Cabina x={540} y={990} w={270} h={330} T={T} suelto={1} largo={60} persona={{ dy: -50 * Math.abs(Math.sin(Math.PI * kprog(T, K.Salto + 1.6, K.Salto + 2.5))), cara: 'o', brazos: 0.3 }} />
        </Lienzo>
        <Chip T={T} at={K.Salto + 0.2} until={K.Ejemplo - 0.1} texto="caída − salto" x={540} y={430} tam={46} borde={KC.ink} />
      </Escena>
      {/* 4 · ejemplo: 10 pisos ≈ 30 m → más de 80 km/h; el salto resta unos 10 */}
      <Escena T={T} a={K.Ejemplo} b={K.Tiempo}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Edificio x={110} base={1180} cab={caeE} T={T} />
          <g opacity={kprog(T, K.Ejemplo + 0.9, K.Ejemplo + 1.3)}>
            <path d="M 410 480 L 430 480 L 430 1180 L 410 1180" fill="none" stroke={KC.ink} strokeWidth={8} />
            <TextoSvg x={450} y={1050} tam={46} color={KC.white} ancla="start" fuente="texto">10 pisos</TextoSvg>
            <TextoSvg x={450} y={1130} tam={66} color={KC.yellow} ancla="start">≈ 30 m</TextoSvg>
          </g>
          <Velocimetro cx={800} cy={700} r={180} v={aguja} />
          <TextoSvg x={800} y={830} tam={88} color={KC.red} o={kprog(T, K.Ejemplo + 3.5, K.Ejemplo + 3.8)} s={klerp(0.6, 1, kprog(T, K.Ejemplo + 3.5, K.Ejemplo + 3.9, kEase.rebote))}>&gt; 80 km/h</TextoSvg>
          <TextoSvg x={800} y={920} tam={44} color={KC.yellow} fuente="texto" o={kprog(T, K.Ejemplo + 5.3, K.Ejemplo + 5.6)}>salto: − ≈ 10 km/h</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Ejemplo + 0.2} until={K.Tiempo - 0.1} texto="ejemplo: una caída de 10 pisos" x={540} y={410} tam={40} borde={KC.ink} />
        <Nota T={T} at={K.Ejemplo + 3.9} until={K.Tiempo - 0.1} texto="cálculo simplificado" x={800} y={985} />
      </Escena>
      {/* 5 · encerrado: no ves cuándo saltar (por dentro de la cabina) */}
      <Escena T={T} a={K.Tiempo} b={K.Pregunta} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Cabina x={520} y={900} w={600} h={620} T={T} cables={0} puertas={1} persona={{ dy: 0, cara: 'o', brazos: 0.15 }} />
          {[0, 1, 2].map((i) => { const e = kprog(T, K.Tiempo + 1.0 + i * 0.5, K.Tiempo + 1.4 + i * 0.5, kEase.rebote); return <TextoSvg key={i} x={[400, 520, 640][i]} y={[600, 560, 600][i] + Math.sin(T * 3 + i) * 8} tam={80} color={KC.yellow} s={e} o={e > 0 ? 1 : 0} rot={[-12, 0, 12][i]}>?</TextoSvg>; })}
          <g transform={`translate(880 470) scale(${klerp(0.5, 1, kprog(T, K.Tiempo + 2.4, K.Tiempo + 2.8, kEase.rebote))}) translate(-880 -470)`} opacity={kprog(T, K.Tiempo + 2.4, K.Tiempo + 2.6)}><RelojDuda x={880} y={470} r={95} T={T} /></g>
        </Lienzo>
        <Chip T={T} at={K.Tiempo + 0.3} until={K.Pregunta - 0.1} texto="sin ver hacia afuera" x={420} y={430} tam={42} borde={KC.cyan} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Frenos} />
      {/* 7 · 1854: el freno de Otis y los frenos que se traban en los rieles */}
      <Escena T={T} a={K.Frenos} b={K.Cables}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Pozo x={240} y={340} w={600} h={880} />
          <Rieles xs={[290, 790]} y0={340} y1={1220} />
          {suelta < 1 && <line x1={540} y1={-200} x2={540} y2={600 + 50 * baja} stroke={KC.ink} strokeWidth={14} opacity={1 - suelta} />}
          <Cabina x={540} y={800 + 60 * baja} w={420} h={400} T={T} cables={0} suelto={suelta} garras={traba} persona={{ dy: 0, cara: traba > 0.5 ? 'sonrie' : 'normal' }} />
        </Lienzo>
        <Onomato T={T} at={K.Frenos + 5.0} dur={1.0} x={540} y={1150} texto="¡CLAC!" tam={120} />
        <TarjetaEstudio T={T} at={K.Frenos + 0.2} until={K.Frenos + 3.4} anio="1854" quien="Elisha Otis · Nueva York" revista="freno de seguridad" x={540} y={760} />
        <Chip T={T} at={K.Frenos + 3.6} until={K.Frenos + 5.6} texto="hoy: frenos en los elevadores de cable" x={600} y={430} tam={38} borde={KC.ink} />
        <Chip T={T} at={K.Frenos + 5.7} until={K.Cables - 0.1} texto="se traban en los rieles" x={610} y={430} tam={42} borde={KC.gold} />
        <Lupa T={T} at={K.Frenos + 5.9} until={K.Cables - 0.3} x={820} y={640} r={150} fx={792} fy={1040} tinte={KC.gold} etiqueta="POR DENTRO · FRENO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1b1830" />
            <rect x={r + 30} y={0} width={90} height={r * 2} fill={C_RIEL} stroke={KC.ink} strokeWidth={6} />
            {[-2, -1, 0, 1, 2].map((i) => <rect key={i} x={r + 30} y={r + i * 64 - 14} width={26} height={28} fill="#4a5163" stroke={KC.ink} strokeWidth={3} />)}
            <rect x={-20} y={r - 110} width={r - 10} height={220} fill={C_CAB} stroke={KC.ink} strokeWidth={8} />
            <path d={`M ${r - 40} ${r - 34} L ${r + 52} ${r} L ${r - 40} ${r + 34} Z`} fill={KC.gold} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /></svg>} />
      </Escena>
      {/* 8 · varios cables, no uno solo */}
      <Escena T={T} a={K.Cables} b={K.Consejo}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Pozo x={240} y={560} w={600} h={660} />
          <Rieles xs={[290, 790]} y0={560} y1={1220} />
          <Cabina x={540} y={920} w={400} h={380} T={T} cables={4} hasta={560} brillo={[0, 1, 2, 3].map((i) => kprog(T, K.Cables + 0.5 + i * 0.35, K.Cables + 0.7 + i * 0.35))} persona={{ dy: 0, cara: 'sonrie' }} />
          <g transform={`translate(540 520)`}><circle r={90} fill="#596276" stroke={KC.ink} strokeWidth={10} />
            {[0, 1, 2].map((i) => <line key={i} x1={0} y1={0} x2={0} y2={-72} stroke={KC.ink} strokeWidth={8} transform={`rotate(${i * 120 + T * 20})`} />)}<circle r={18} fill={KC.ink} /></g>
        </Lienzo>
        <Chip T={T} at={K.Cables + 0.2} until={K.Consejo - 0.1} texto="varios cables, no uno solo" x={540} y={390} tam={42} borde={KC.gold} />
      </Escena>
      {/* 9 · consejo: quédate adentro, aprieta la alarma y espera */}
      <Escena T={T} a={K.Consejo} b={K.Cierre}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={110} y={520} width={860} height={680} rx={24} fill={C_PARED} stroke={KC.ink} strokeWidth={10} />
          <rect x={150} y={560} width={360} height={640} fill="#d9dde6" stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(330 1190) scale(0.9)`}><PersonaSimple x={0} yPies={0} alto={600} color={KC.pink} cara="sonrie" /></g>
          <rect x={620} y={600} width={300} height={560} rx={20} fill="#b9bfca" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={710 + (i % 2) * 120} cy={680 + Math.floor(i / 2) * 90} r={28} fill="#e9ecf1" stroke={KC.ink} strokeWidth={5} />)}
          <TextoSvg x={770} y={955} tam={40} color={KC.red} fuente="texto">ALARMA</TextoSvg>
          <BotonAlarma x={770} y={1060} r={70} hunde={aprieta} />
          {sonando && <><OndasArco x={770} y={1060} ang={-90} T={T} color={KC.yellow} largo={160} abre={60} /></>}
          <g transform={`translate(${klerp(1200, 855, kprog(T, K.Consejo + 1.8, K.Consejo + 2.4, kEase.sale)) - 30 * aprieta} 1060)`} opacity={1 - kprog(T, K.Consejo + 4.0, K.Consejo + 4.4)}><ManoDedo x={0} y={0} s={0.8} /></g>
        </Lienzo>
        <Chip T={T} at={K.Consejo + 0.3} until={K.Cierre - 0.1} texto="quédate adentro y espera ayuda" x={540} y={430} tam={40} borde={KC.ink} />
      </Escena>
      {/* 10 · cierre: la misma escena del inicio, ahora la cabina está frenada */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <TiraCine x={150} y={360} w={420} h={870} off={0} />
          <Pozo x={150} y={360} w={420} h={870} />
          <Rieles xs={[190, 530]} y0={360} y1={1230} />
          <Cabina x={360} y={800} w={280} h={360} T={T} cables={4} garras={1} persona={{ dy: 0, cara: 'sonrie' }} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.5} until={K.Outro - 0.1} texto="no lo vas a necesitar" x={360} y={1110} tam={46} borde={KC.mint} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Mito - 0.1} texto="Saltar al final *casi seguro no te salva.*" />
      <Subtitulo T={T} idx={1} at={K.Mito + 0.1} until={K.Velocidad - 0.1} texto="En las películas *suena lógico.*" />
      <Subtitulo T={T} idx={2} at={K.Velocidad + 0.1} until={K.Salto - 0.1} texto="Tú caes *a su misma velocidad.*" />
      <Subtitulo T={T} idx={3} at={K.Salto + 0.1} until={K.Ejemplo - 0.1} texto="El salto le quita *muy poquito.*" />
      <Subtitulo T={T} idx={4} at={K.Ejemplo + 0.1} until={K.Tiempo - 0.1} texto="30 m: *más de 80 km/h.* El salto: unos 10." />
      <Subtitulo T={T} idx={5} at={K.Tiempo + 0.1} until={K.Pregunta - 0.1} texto="Encerrado: *casi imposible atinarle.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Frenos - 0.1} texto="¿Qué tan *peligrosos* son?" />
      <Subtitulo T={T} idx={7} at={K.Frenos + 0.1} until={K.Cables - 0.1} texto="Muy poco: *frenos que se traban.*" />
      <Subtitulo T={T} idx={8} at={K.Cables + 0.1} until={K.Consejo - 0.1} texto="Y cuelgan de *varios cables.*" />
      <Subtitulo T={T} idx={9} at={K.Consejo + 0.1} until={K.Cierre - 0.1} texto="Quédate adentro y *aprieta la alarma.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Lo más seguro: *nunca lo vas a necesitar.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Mito + 1.2, K.Velocidad - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Salto + 0.6, K.Ejemplo - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Ejemplo + 3.6, K.Tiempo - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Tiempo + 1.4, K.Pregunta - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Pregunta + 0.05, K.Frenos - 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Frenos + 5.6, K.Cables - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Consejo + 1.4, K.Cierre - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cierre + 0.6, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="fisica" num="46" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function ElevadorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Elevador /></CompositionStage></div>;
}
window.ElevadorApp = ElevadorApp;
