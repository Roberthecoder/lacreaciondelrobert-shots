// Shot Ambiental #59 · No son varios árboles: es uno solo (el árbol del Tule) — NARRADO (N5 el experimento + N2 el número).
// Datos: Dorado et al. 1996 (Madroño 43: 445-452), Guinness/Van Pelt 2005, Hall et al. 1990, Conzatti 1921, Gymnosperm Database,
// Rodríguez-Trejo y Vázquez Soto (Taxodium huegelii). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
// Morfología: ahuehuete (Taxodium mucronatum) con tronco de contrafuertes (lóbulos y surcos), copa más ancha que alta,
// ramillas colgantes y hojas lineales en dos filas sobre la ramilla.

const TU_BARK = '#8a5a3a', TU_BARK2 = '#6b4128', TU_HOJA = '#2f7d3a', TU_HOJA2 = '#4fa34f', TU_AGUA = '#2f8fd8';

// Copa: racimos de follaje sobre una elipse más ancha que alta (44 m de ancho, 35 m de alto: Van Pelt 2005).
const TU_COPA = (() => { const r = krng(59), out = [];
  for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2; out.push({ cx: Math.cos(a) * 340, cy: -540 + Math.sin(a) * 190, r: 72 + r() * 26 }); }
  for (let i = 0; i < 9; i++) out.push({ cx: (r() - 0.5) * 480, cy: -540 + (r() - 0.5) * 220, r: 100 + r() * 34 });
  return out; })();
const TU_LUZ = [[-190, -640, 60], [-40, -690, 70], [130, -665, 58], [260, -600, 48], [-290, -570, 44]];
// Seis ramas principales (Dorado et al. muestrearon "the six main branches").
const TU_RAMAS = [[-110, -250, -320, -470], [-60, -265, -200, -620], [-20, -275, -70, -690], [20, -275, 80, -680], [60, -265, 215, -610], [110, -250, 330, -470]];
// Lóbulos del tronco (contrafuertes). separa 0..1 los aparta como si fueran árboles distintos.
const TU_LOBULOS = [[-150, 130], [-52, 120], [52, 120], [150, 130]];

function Ahuehuete({ x, y, s = 1, separa = 0, T = 0, numeros = 0, marca = 0, interrog = 0 }) {
  const sw = mece(T, 3, 0.35) * 1.2;
  const lob = TU_LOBULOS.map(([dx, w], i) => {
    const X = dx * (1 + separa * 0.55);
    const d = `M ${X - w / 2 - 10} 0 C ${X - w / 2 - 20} -70 ${X - w / 2 + 14} -170 ${X - w / 3} -250 L ${X + w / 3} -250 C ${X + w / 2 - 14} -170 ${X + w / 2 + 20} -70 ${X + w / 2 + 10} 0 Z`;
    return <g key={i}>
      <path d={d} fill={i % 2 ? TU_BARK : '#94633f'} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[-0.22, 0.05, 0.28].map((q, k) => <path key={k} d={`M ${X + q * w} -8 q ${8 - k * 5} -90 ${-5 + k * 4} -215`} stroke={TU_BARK2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
      {marca > 0 && <path d={d} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="16 12" opacity={marca} transform={`translate(0 0)`} />}
    </g>;
  });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* ramas principales (debajo de la copa) */}
    <g transform={`rotate(${sw * 0.3} 0 -200)`}>
      {TU_RAMAS.map(([x0, y0, x1, y1], i) => <g key={i}>
        <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + (x1 > 0 ? -40 : 40)} ${(y0 + y1) / 2 + 30} ${x1} ${y1}`} stroke={KC.ink} strokeWidth={48} fill="none" strokeLinecap="round" />
        <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + (x1 > 0 ? -40 : 40)} ${(y0 + y1) / 2 + 30} ${x1} ${y1}`} stroke={TU_BARK} strokeWidth={34} fill="none" strokeLinecap="round" />
      </g>)}
    </g>
    {/* cuerpo del tronco: une los contrafuertes en una sola masa (se desvanece si "separa") */}
    <path d="M -230 0 C -240 -90 -175 -200 -150 -300 L 150 -300 C 175 -200 240 -90 230 0 Z" fill={TU_BARK2} stroke={KC.ink} strokeWidth={8} opacity={1 - separa} />
    {/* copa */}
    <g transform={`rotate(${sw} 0 -200)`}>
      {TU_COPA.map((c, i) => <circle key={'b' + i} cx={c.cx} cy={c.cy} r={c.r} fill={TU_HOJA} stroke={KC.ink} strokeWidth={14} />)}
      {TU_COPA.map((c, i) => <circle key={'f' + i} cx={c.cx} cy={c.cy} r={c.r} fill={TU_HOJA} />)}
      {TU_LUZ.map(([cx, cy, r], i) => <circle key={'l' + i} cx={cx} cy={cy} r={r} fill={TU_HOJA2} opacity={0.75} />)}
      {/* ramillas colgantes */}
      {Array.from({ length: 16 }, (_, i) => { const xx = -300 + i * 40, yy = -540 + Math.sqrt(Math.max(0, 1 - (xx / 360) ** 2)) * 190 + 55;
        return <path key={'c' + i} d={`M ${xx} ${yy - 30} q ${mece(T, i, 0.8) * 6} 30 ${mece(T, i + 4, 0.8) * 8} 62`} stroke="#25652e" strokeWidth={7} fill="none" strokeLinecap="round" />; })}
    </g>
    {/* tronco: contrafuertes */}
    {lob}
    {interrog > 0 && [-101, 0, 101].map((dx, i) => <text key={i} x={dx * (1 + separa * 0.55)} y={-90} textAnchor="middle" opacity={interrog}
      style={{ font:`400 90px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">?</text>)}
    {numeros > 0 && TU_RAMAS.map(([, , x1, y1], i) => { const e = kclamp(numeros * 6 - i, 0, 1);
      return e > 0 ? <g key={'n' + i} transform={`translate(${x1} ${y1}) scale(${e})`}><circle r={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
        <text y={17} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text></g> : null; })}
  </g>;
}

// Ramilla de ahuehuete: hojas lineales (10-22 mm × 1 mm) en dos filas, en un solo plano.
function Ramita({ x, y, L = 220, rot = 0, s = 1, o = 1 }) {
  const n = 11;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={L} y2={0} stroke="#6b4a2a" strokeWidth={6} strokeLinecap="round" />
    {Array.from({ length: n }, (_, i) => { const px = 14 + i * (L - 24) / (n - 1), len = 44 - Math.abs(i - n * 0.45) * 2.4;
      return <g key={i}>
        <rect x={0} y={-3.5} width={len} height={7} rx={3.5} fill="#4caa4f" stroke={KC.ink} strokeWidth={2.5} transform={`translate(${px} 0) rotate(-62)`} />
        <rect x={0} y={-3.5} width={len} height={7} rx={3.5} fill="#4caa4f" stroke={KC.ink} strokeWidth={2.5} transform={`translate(${px + 6} 0) rotate(62)`} />
      </g>; })}
  </g>;
}

// Huella del tronco vista desde arriba: elíptica (el doble de ancha en un eje) y con lóbulos y bahías (esquema, Van Pelt 2005).
function huellaPts(a, b, f = 1, lob = 1) {
  return Array.from({ length: 140 }, (_, i) => { const t = (i / 140) * Math.PI * 2;
    const k = f * (0.84 + lob * (0.12 * Math.sin(5 * t + 0.4) + 0.07 * Math.sin(9 * t + 1.3)) + (1 - lob) * 0.16);
    return [Math.cos(t) * a * k, Math.sin(t) * b * k]; });
}
const ptsPath = (p) => 'M ' + p.map(([a, b]) => a.toFixed(1) + ' ' + b.toFixed(1)).join(' L ') + ' Z';
function Huella({ x, y, a = 380, b = 190, cinta = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={ptsPath(huellaPts(a, b))} fill={TU_BARK} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={ptsPath(huellaPts(a * 0.7, b * 0.62))} fill="#a5714a" opacity={0.6} />
    {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={0} cy={0} rx={a * (0.15 + i * 0.1)} ry={b * (0.15 + i * 0.1)} fill="none" stroke={TU_BARK2} strokeWidth={3} opacity={0.5} />)}
    {cinta > 0 && <ellipse cx={0} cy={0} rx={a} ry={b} fill="none" stroke={KC.yellow} strokeWidth={12} pathLength={1} strokeDasharray={`${cinta} 1`} strokeLinecap="round" />}
    {cinta > 0 && <ellipse cx={0} cy={0} rx={a} ry={b} fill="none" stroke={KC.ink} strokeWidth={3} pathLength={1} strokeDasharray="0.01 0.012" opacity={cinta > 0.99 ? 0.6 : 0} />}
  </g>;
}

// Persona vista desde arriba (cabeza + hombros), girada hacia afuera del tronco.
function PersonaArriba({ x, y, rot, color }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={13} ry={26} fill={color} stroke={KC.ink} strokeWidth={4} />
    <circle cx={4} r={12} fill="#f1c9a0" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Suelo en corte con raíces y agua subterránea. agua 0..1 (grosor de la capa), pantano 0..1 (superficie inundada con tules).
function Suelo({ T, y0, agua = 1, pantano = 0, raices = 1, x0 = 540 }) {
  const top = y0 + 150, alto = 140 * agua;
  return <g>
    <rect x={0} y={y0} width={KW} height={KH - y0} fill="#8b5a2b" />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 197) % KW} cy={y0 + 20 + ((i * 89) % 260)} r={4 + (i % 3) * 2} fill="#6e4520" />)}
    <rect x={0} y={top} width={KW} height={alto + 300} fill={TU_AGUA} opacity={0.9} />
    {Array.from({ length: 7 }, (_, i) => <path key={'w' + i} d={`M ${60 + i * 150} ${top + 40 + (i % 2) * 40} q 25 ${-8 + Math.sin(T * 2 + i) * 5} 50 0`} stroke="#bfe7ff" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <line x1={0} y1={top} x2={KW} y2={top} stroke={KC.ink} strokeWidth={5} strokeDasharray="18 12" />
    {raices > 0 && [[-120, -300, 180], [-60, -150, 175], [0, -20, 180], [60, 140, 176], [120, 300, 180], [-90, -420, 120], [90, 420, 120]].map(([a, b, h], i) =>
      <path key={'r' + i} d={`M ${x0 + a} ${y0} Q ${x0 + (a + b) / 2} ${y0 + h * 0.4} ${x0 + b} ${y0 + h * raices}`} stroke="#5a3a1e" strokeWidth={14 - (i > 4 ? 5 : 0)} fill="none" strokeLinecap="round" />)}
    <rect x={0} y={y0 - 6} width={KW} height={14} fill="#5c9a3c" stroke={KC.ink} strokeWidth={4} />
    {pantano > 0 && <g opacity={pantano}>
      <rect x={0} y={y0 - 18} width={KW} height={34} fill="#5fb3e6" stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 14 }, (_, i) => { const xx = 30 + i * 78; if (Math.abs(xx - x0) < 200) return null; const h = 90 + (i % 3) * 30, m = mece(T, i, 0.6) * 6;
        return <g key={'t' + i}><path d={`M ${xx} ${y0} q ${m} ${-h / 2} ${m * 1.5} ${-h}`} stroke="#3f8f3a" strokeWidth={6} fill="none" />
          <rect x={xx + m * 1.5 - 8} y={y0 - h - 6} width={16} height={46} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={3} /></g>; })}
    </g>}
  </g>;
}

// Gel de ADN (esquema): 6 carriles del Tule idénticos y 2 vecinos distintos.
const TU_BANDAS = [0.06, 0.13, 0.19, 0.27, 0.33, 0.41, 0.48, 0.55, 0.61, 0.69, 0.76, 0.83, 0.9];
function Gel({ T, x, y, w = 640, h = 620, p = 1 }) {
  const lanes = 8, lw = w / lanes;
  const vecino = (k, j) => ((k * 7 + j * 3) % 5 === 0 ? null : TU_BANDAS[k] + (((k + j) % 4 === 1) ? 0.025 : 0));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={18} fill="#1b2a3a" stroke={KC.cyan} strokeWidth={5} />
    {Array.from({ length: lanes }, (_, j) => <g key={j}>
      <rect x={j * lw + lw * 0.18} y={10} width={lw * 0.64} height={16} rx={4} fill="#0b1520" />
      {TU_BANDAS.map((b, k) => { const yy = j < 6 ? b : vecino(k, j); if (yy == null) return null; const e = kclamp(p * 14 - k, 0, 1);
        return <rect key={k} x={j * lw + lw * 0.16} y={30 + yy * (h - 50)} width={lw * 0.68} height={11} rx={5} fill={j < 6 ? KC.mint : KC.coral} opacity={e * (0.65 + 0.35 * ((k * 3 + 1) % 4) / 3)} />; })}
      <text x={j * lw + lw / 2} y={-18} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={j < 6 ? KC.mint : KC.coral}>{j < 6 ? j + 1 : 'V' + (j - 5)}</text>
    </g>)}
    <line x1={lw * 0.1} y1={h + 24} x2={lw * 5.9} y2={h + 24} stroke={KC.mint} strokeWidth={5} />
    <text x={lw * 3} y={h + 64} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.mint}>6 ramas del Tule</text>
    <line x1={lw * 6.1} y1={h + 24} x2={lw * 7.9} y2={h + 24} stroke={KC.coral} strokeWidth={5} />
    <text x={lw * 7} y={h + 64} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.coral}>vecinos</text>
  </g>;
}

// Corte del tronco con anillos irregulares y un "?" al centro.
function Anillos({ T, x, y, r = 240 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={ptsPath(huellaPts(r * 1.18, r * 1.0, 1, 0.6))} fill="#5a3a1e" stroke={KC.ink} strokeWidth={8} />
    <path d={ptsPath(huellaPts(r * 1.08, r * 0.92, 1, 0.5))} fill="#e4b97f" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 11 }, (_, i) => <path key={i} d={ptsPath(huellaPts(r * (0.98 - i * 0.085), r * (0.84 - i * 0.072), 1, 0.4))} fill="none" stroke="#a8743f" strokeWidth={4} />)}
    <text x={0} y={70} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} paintOrder="stroke"
      transform={`rotate(${Math.sin(T * 3) * 6} 0 0)`}>?</text>
  </g>;
}

function Tubo({ x, y, lleno = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -22 -90 L -22 -10 Q 0 22 22 -10 L 22 -90" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={5} />
    {lleno > 0 && <Ramita x={-4} y={-14} L={70} rot={-90} s={0.8} o={lleno} />}
    <rect x={-28} y={-104} width={56} height={18} rx={6} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function TuleShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ci: CUES.Cinta, Ab: CUES.Abrazo, P: CUES.Pregunta, E: CUES.Estudio, A: CUES.Adn, Ed: CUES.Edad, Ag: CUES.Agua, Pa: CUES.Pantano, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: los "varios troncos" se juntan en uno (cuadro 0 ya se mueve)
  const sepG = 1 - kprog(T, K.G + 0.2, K.G + 1.6, kEase.suave);
  const sepP = kprog(T, K.P + 0.2, K.P + 1.2, kEase.suave) * (1 - kprog(T, K.P + 3.6, K.P + 4.6, kEase.suave));
  // la cinta da la vuelta
  const cinta = kprog(T, K.Ci + 0.8, K.Ci + 3.3, kEase.suave);
  // personas tomadas de la mano: 21 (36.18 m / ~1.7 m de brazos abiertos)
  const NP = 21, pp = kprog(T, K.Ab + 0.3, K.Ab + 3.6), nP = Math.floor(pp * NP + 0.001);
  const gentes = Array.from({ length: NP }, (_, i) => { const t = (i / NP) * Math.PI * 2 - Math.PI / 2, ax = 328, by = 178;
    return { x: 540 + Math.cos(t) * ax, y: 860 + Math.sin(t) * by, rot: Math.atan2(Math.sin(t) * ax, Math.cos(t) * by) * 180 / Math.PI, c: [KC.pink, KC.cyan, KC.yellow, KC.orange, KC.lilac, KC.mint][i % 6] }; });
  // muestras: hojas de las seis ramas a los tubos
  const hojaP = (i) => kprog(T, K.E + 1.2 + i * 0.4, K.E + 2.0 + i * 0.4, kEase.suave);
  const gelP = kprog(T, K.A + 0.3, K.A + 3.0);
  const aguaPa = 1 + 0.08 * Math.sin((T - K.Pa) * 3) * kprog(T, K.Pa + 3.2, K.Pa + 3.8);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: parecen varios árboles pegados… y es uno solo */}
      <Escena T={T} a={K.G} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<><rect x={0} y={1150} width={KW} height={800} fill="#c8a46a" /><rect x={0} y={1144} width={KW} height={14} fill="#5c9a3c" stroke={KC.ink} strokeWidth={4} />
          <Ahuehuete x={370} y={1150} s={0.8} separa={sepG} marca={sepG} T={T} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · la cinta: 36.18 m de contorno (2005) */}
      <Escena T={T} a={K.Ci} b={K.Ab}>
        <FondoLunares color={KC.mint} />
        {svg(<Huella x={470} y={880} a={380} b={190} cinta={cinta} />)}
        <EscalaFija texto="5 m" largo={254} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · más de veinte personas para abrazarlo */}
      <Escena T={T} a={K.Ab} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Huella x={540} y={860} a={300} b={150} />
          {gentes.map((g, i) => i < nP ? <g key={i}>
            {i > 0 && <line x1={gentes[i - 1].x} y1={gentes[i - 1].y} x2={g.x} y2={g.y} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
            {i === NP - 1 && <line x1={g.x} y1={g.y} x2={gentes[0].x} y2={gentes[0].y} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
          </g> : null)}
          {gentes.map((g, i) => i < nP ? <PersonaArriba key={'p' + i} x={g.x} y={g.y} rot={g.rot} color={g.c} /> : null)}
          {nP > 0 && <text x={540} y={560} textAnchor="middle" style={{ font:`400 190px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={9} paintOrder="stroke">{nP}</text>}
          <text x={540} y={620} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>personas con los brazos abiertos</text></>)}
        <EscalaFija texto="esquema · vista desde arriba" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · pregunta: ¿varios árboles fusionados? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<><rect x={0} y={1150} width={KW} height={800} fill="#c8a46a" /><rect x={0} y={1144} width={KW} height={14} fill="#5c9a3c" stroke={KC.ink} strokeWidth={4} />
          <Ahuehuete x={300} y={1150} s={0.66} separa={sepP} marca={sepP} interrog={sepP} T={T} /></>)}
      </Escena>
      {/* 5 · el estudio de 1996: hojas de las seis ramas principales */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><Ahuehuete x={540} y={990} s={0.62} T={T} numeros={kprog(T, K.E + 0.4, K.E + 1.4)} />
          <rect x={0} y={990} width={KW} height={14} fill="#5c9a3c" stroke={KC.ink} strokeWidth={4} />
          {TU_RAMAS.map(([, , x1, y1], i) => { const p = hojaP(i), sx = 540 + x1 * 0.62, sy = 990 + y1 * 0.62, tx = 240 + i * 120, ty = 1120;
            return <g key={i}><Tubo x={tx} y={1180} lleno={p >= 1 ? 1 : 0} />{p > 0 && p < 1 && <Ramita x={klerp(sx, tx, p)} y={klerp(sy, ty, p) - Math.sin(p * Math.PI) * 120} L={90} rot={p * 200} s={0.9} />}</g>; })}</>)}
      </Escena>
      {/* 6 · ADN: 149 marcas, las seis ramas idénticas */}
      <Escena T={T} a={K.A} b={K.Ed}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 60% 45%, #1a2b4a 0%, ${KC.noche} 70%)` }}></div>
        {svg(<Gel T={T} x={350} y={470} w={640} h={530} p={gelP} />)}
        <EscalaFija texto="esquema de un gel de ADN" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 7 · edad: sin fechado confiable */}
      <Escena T={T} a={K.Ed} b={K.Ag}>
        <FondoLunares color={KC.orange} />
        {svg(<Anillos T={T} x={540} y={800} r={240} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · ahuehuete = viejo del agua; raíces y agua del suelo */}
      <Escena T={T} a={K.Ag} b={K.Pa}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Suelo T={T} y0={900} raices={kprog(T, K.Ag + 0.4, K.Ag + 2.2, kEase.sale)} agua={kprog(T, K.Ag + 1.6, K.Ag + 2.8, kEase.sale)} />
          <Ahuehuete x={540} y={900} s={0.55} T={T} /></>)}
      </Escena>
      <Lupa T={T} at={K.Ag + 2.6} until={K.Pa - 0.3} x={850} y={470} r={150} fx={700} fy={700} tinte={KC.leaf} etiqueta="DE CERCA · hojas"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#e9f5df" /><Ramita x={30} y={r} L={r * 2 - 50} s={1.15} /></svg>} />
      {/* 9 · antes era un pantano: agua que nunca falta */}
      <Escena T={T} a={K.Pa} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<><Suelo T={T} y0={900} pantano={kprog(T, K.Pa + 0.3, K.Pa + 1.4, kEase.suave) * (1 - kprog(T, K.Pa + 4.6, K.Pa + 5.6))} agua={aguaPa} />
          <Ahuehuete x={540} y={900} s={0.55} T={T} /></>)}
      </Escena>
      {/* 10 · cierre: la imagen del inicio, ya entendida: uno solo, que vive del agua */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Suelo T={T} y0={1060} />
          <Ahuehuete x={370} y={1060} s={0.75} separa={0.6 * (1 - kprog(T, K.C + 0.2, K.C + 1.4, kEase.suave))} T={T} />
          <Goteo T={T} x={300} y0={1060} y1={1200} cada={0.9} desde={K.C + 1.2} color={TU_AGUA} r={14} /></>)}
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.6} until={K.Ci - 0.2} texto="1 solo árbol" y={460} x={330} tam={46} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.Ci + 0.8} until={K.Ab - 0.2} valor={36.18} dec={2} dur={2.5} sufijo=" m" etiqueta="contorno del tronco (2005)" x={420} y={480} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.Ci + 0.3} until={K.Ab - 0.2} x={130} y={1130} texto="Árbol del Tule · Oaxaca" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ci + 3.4} until={K.Ab - 0.2} texto="vista desde arriba · con contrafuertes" y={680} x={470} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Ab + 3.7} until={K.P - 0.2} texto="más de 20 personas" y={1140} x={540} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.E + 0.2} until={K.A - 0.2} texto="1996 · Univ. Autónoma del Edo. de Morelos" y={420} x={560} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.E + 2.6} until={K.A - 0.2} x={960} y={1040} texto="6 muestras" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.A + 2.4} until={K.Ed - 0.2} texto="149 marcas · 0 diferencias" y={1170} x={670} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.A + 4.4} until={K.Ed - 0.2} texto="casi seguro: 1 individuo" y={400} x={680} tam={34} borde={KC.yellow} />
      <MitoTachado T={T} at={K.Ed + 0.3} tacharEn={K.Ed + 2.5} until={K.Ed + 3.0} texto="¿500 años?" x={250} y={470} tam={40} />
      <MitoTachado T={T} at={K.Ed + 0.8} tacharEn={K.Ed + 2.6} until={K.Ed + 3.0} texto="¿4,000 años?" x={790} y={470} tam={40} />
      <MitoTachado T={T} at={K.Ed + 1.3} tacharEn={K.Ed + 2.7} until={K.Ed + 3.0} texto="¿6,000 años?" x={540} y={1120} tam={40} />
      <Chip T={T} at={K.Ed + 0.2} until={K.Ed + 3.0} texto="ninguna con fechado confiable" y={380} x={540} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ed + 3.6} until={K.Ag - 0.2} texto="Conzatti, 1921: menos de 2,000 años (estimación)" y={1100} x={540} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.Ag + 0.3} until={K.Pa - 0.2} texto="atl (agua) + huehuetl (viejo)" y={410} x={430} tam={30} borde={KC.cyan} />
      <Etq T={T} at={K.Ag + 0.8} until={K.Pa - 0.2} x={20} y={815} texto="ahuehuete" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ag + 1.1} until={K.Pa - 0.2} x={20} y={858} texto="Taxodium mucronatum" it tam={24} color={KC.ink} />
      <Etq T={T} at={K.Ag + 2.0} until={K.Pa - 0.2} x={120} y={1110} texto="agua del suelo" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Pa + 0.6} until={K.Pa + 4.6} texto="antes: un pantano" y={420} x={640} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Pa + 3.4} until={K.C - 0.2} texto="tamaño gigante: agua abundante y segura" y={500} x={640} tam={28} borde={KC.yellow} />
      <Etq T={T} at={K.Pa + 3.4} until={K.C - 0.2} x={120} y={1110} texto="agua del suelo" tam={30} color={KC.texto} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="1 solo árbol · viejo del agua" y={390} x={380} tam={34} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ci - 0.1} texto="No son varios árboles: *es uno solo.*" />
      <Subtitulo T={T} idx={1} at={K.Ci + 0.1} until={K.Ab - 0.1} texto="El árbol del Tule: *36 metros de contorno.*" />
      <Subtitulo T={T} idx={2} at={K.Ab + 0.1} until={K.P - 0.1} texto="Para abrazarlo: *más de 20 personas.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si son *varios árboles fusionados?*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.A - 0.1} texto="1996: hojas de sus *6 ramas grandes.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.Ed - 0.1} texto="149 marcas de ADN: *idénticas.*" />
      <Subtitulo T={T} idx={6} at={K.Ed + 0.1} until={K.Ag - 0.1} texto="¿Su edad? *Solo estimaciones.*" />
      <Subtitulo T={T} idx={7} at={K.Ag + 0.1} until={K.Pa - 0.1} texto="Ahuehuete: *viejo del agua.*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.C - 0.1} texto="Antes era un pantano: *agua que nunca falta.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Uno solo, que vive *del agua.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cinta + 3.4, CUES.Abrazo - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Adn + 3.5, CUES.Edad - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Edad + 3.4, CUES.Agua - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pantano + 1.6, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="59" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TuleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TuleShot /></CompositionStage></div>;
}
window.TuleApp = TuleApp;
