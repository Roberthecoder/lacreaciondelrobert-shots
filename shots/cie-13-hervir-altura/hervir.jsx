// Shot Científico #13 · En la Ciudad de México el agua hierve antes de llegar a 100 °C — NARRADO (N2 "El número" + mapa de México).
// Datos: USDA FSIS 2011, INEGI 2020 (Guadalajara 1,536 m), NDSU FN2064 (olla exprés), LibreTexts (Everest). Ver guion.md y verificacion.md.
const AGUA = '#3fa9f5', AGUA2 = '#7cc8ff', AIRE = KC.cyan, VAPOR = '#ffffff';

// Termómetro vertical con escala recortada (min..max) para que se note la diferencia de pocos grados. Dentro de <svg>.
function TermoV({ x, y, alto = 420, valor = 100, min = 60, max = 125, marcas = [92, 100], color = KC.red, ancho = 64 }) {
  const t2y = (c) => y + alto - (kclamp(c, min, max) - min) / (max - min) * alto;
  return <g>
    <rect x={x - ancho / 2} y={y - 20} width={ancho} height={alto + 40} rx={ancho / 2} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - ancho / 4} y={t2y(valor)} width={ancho / 2} height={y + alto + 30 - t2y(valor)} rx={ancho / 4} fill={color} />
    <circle cx={x} cy={y + alto + 50} r={ancho * 0.85} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={x - ancho * 0.25} cy={y + alto + 38} r={ancho * 0.2} fill="#fff" opacity=".45" />
    {marcas.map((c) => <g key={c}><line x1={x - ancho / 2 - 26} y1={t2y(c)} x2={x - ancho / 2} y2={t2y(c)} stroke={KC.ink} strokeWidth={6} />
      <text x={x - ancho / 2 - 34} y={t2y(c) + 13} textAnchor="end" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{c}°</text></g>)}
  </g>;
}

// Llamas de la estufa (dentro de <svg>), centradas en (0, 0) del grupo padre.
function Llamas({ T, ancho = 380, n = 9, fuerza = 1 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const x = -ancho / 2 + (i + 0.5) * ancho / n, h = (34 + 16 * Math.sin(T * 17 + i * 2.1)) * fuerza;
    return <g key={i}><path d={`M ${x - 14} 40 Q ${x - 10} ${40 - h * 0.6} ${x} ${40 - h} Q ${x + 10} ${40 - h * 0.6} ${x + 14} 40 Z`} fill="#4aa8ff" stroke={KC.ink} strokeWidth={3} />
      <path d={`M ${x - 6} 40 Q ${x - 4} ${40 - h * 0.35} ${x} ${40 - h * 0.55} Q ${x + 4} ${40 - h * 0.35} ${x + 6} 40 Z`} fill={KC.yellow} /></g>; })}</g>;
}
// Vapor que sube de una superficie (dentro de <svg>). (0, 0) = centro de la superficie.
function Vapor({ T, ancho = 380, alto = 420, n = 6, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = (T * 0.45 + i / n) % 1, x = -ancho / 2 + (i + 0.5) * ancho / n + Math.sin(T * 2 + i) * 20, y = -f * alto;
    return <path key={i} d={`M ${x} ${y} q 26 -40 0 -80 q -26 -40 0 -80`} fill="none" stroke={VAPOR} strokeWidth={16 - f * 6} strokeLinecap="round" opacity={Math.sin(f * Math.PI) * 0.85} />; })}</g>;
}
// Burbujas de vapor dentro del agua (vista en corte). Nacen en el fondo (y = fondo), crecen y suben hasta la superficie (y = sup).
function BurbujasCorte({ T, ancho = 440, fondo = -24, sup = -270, n = 16, vel = 0.55, seed = 3, o = 1 }) {
  const g = krng(seed), bs = Array.from({ length: n }, () => [(g() - 0.5) * ancho * 0.9, g(), 0.7 + g() * 0.6]);
  return <g opacity={o}>{bs.map(([bx, ph, k], i) => { const f = (T * vel * k + ph) % 1;
    const nace = f < 0.18, q = nace ? f / 0.18 : (f - 0.18) / 0.82;
    const r = nace ? 3 + q * 9 : 12 + q * 16, y = nace ? fondo - r : klerp(fondo - 12, sup + 10, q * q * 0.6 + q * 0.4), x = bx + (nace ? 0 : Math.sin(T * 6 + i) * 8 * q);
    return <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,.82)" stroke={KC.ink} strokeWidth={3.5} opacity={nace ? 0.5 + q * 0.5 : 1 - kprog(q, 0.9, 1)} />; })}</g>;
}
// Burbujas que revientan en la superficie (vista desde afuera).
function Borbotones({ T, ancho = 420, n = 9, fuerza = 1, seed = 7 }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const bx = (g() - 0.5) * ancho, ph = g(), f = (T * (1.1 + g()) * fuerza + ph) % 1, r = 8 + 18 * Math.sin(f * Math.PI);
    return <ellipse key={i} cx={bx} cy={-r * 0.35} rx={r} ry={r * 0.7} fill={AGUA2} stroke={KC.ink} strokeWidth={4} opacity={f < 0.9 ? 1 : 0} />; })}</g>;
}
// Olla en la estufa, de lado. (x, y) = centro del fondo de la olla. corte 0..1 = se ve por dentro (agua y burbujas).
function Olla({ T, x, y, s = 1, hierve = 1, corte = 0, color = KC.red, frijoles = 0, vapor = 1, vel = 0.55, seed = 3, estufa = true }) {
  const SUP = -268;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {estufa && <><rect x={-330} y={40} width={660} height={90} rx={18} fill="#3b3f4a" stroke={KC.ink} strokeWidth={9} />
      <rect x={-300} y={70} width={60} height={30} rx={8} fill="#6b7080" /><rect x={240} y={70} width={60} height={30} rx={8} fill="#6b7080" />
      <Llamas T={T} fuerza={0.5 + hierve * 0.5} />
      <rect x={-230} y={-4} width={460} height={14} rx={6} fill="#22252e" stroke={KC.ink} strokeWidth={5} /></>}
    <rect x={-300} y={-262} width={50} height={34} rx={14} fill="#3b3f4a" stroke={KC.ink} strokeWidth={7} />
    <rect x={250} y={-262} width={50} height={34} rx={14} fill="#3b3f4a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -260 -320 L -260 -34 Q -260 0 -226 0 L 226 0 Q 260 0 260 -34 L 260 -320 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -230 -290 L -230 -60" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={0.3 * (1 - corte)} />
    {corte > 0 && <g opacity={corte}>
      <path d="M -238 -300 L -238 -36 Q -238 -20 -222 -20 L 222 -20 Q 238 -20 238 -36 L 238 -300 Z" fill="#1d2740" />
      <path d={`M -238 ${SUP} L -238 -36 Q -238 -20 -222 -20 L 222 -20 Q 238 -20 238 -36 L 238 ${SUP} Z`} fill={AGUA} opacity=".9" />
      <path d={`M -238 ${SUP} Q -120 ${SUP - 10 * Math.sin(T * 5)} 0 ${SUP} T 238 ${SUP}`} fill="none" stroke={AGUA2} strokeWidth={8} />
      <BurbujasCorte T={T} fondo={-26} sup={SUP} vel={vel} seed={seed} o={hierve} />
    </g>}
    <ellipse cx={0} cy={-320} rx={260} ry={34} fill={corte > 0.5 ? 'none' : '#6e1717'} stroke={KC.ink} strokeWidth={9} />
    {corte < 0.5 && <g transform="translate(0 -312)">
      <ellipse cx={0} cy={0} rx={236} ry={24} fill={frijoles ? '#8a5a3a' : AGUA} />
      {frijoles > 0 && Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={-190 + i * 29} cy={Math.sin(i * 2.3 + T * 4) * 7} rx={13} ry={8} fill="#5a2d1c" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 37} ${-190 + i * 29} 0)`} />)}
      <Borbotones T={T} fuerza={hierve} n={Math.round(9 * hierve)} seed={seed + 4} />
      <Vapor T={T} o={vapor * hierve} />
    </g>}
  </g>;
}
// Flechas de aire que empujan hacia abajo. grosor 0..1 (1 = mucho aire).
function FlechasAire({ T, x, ytop, ybot, ancho = 440, n = 5, grosor = 1, p = 1, color = AIRE }) {
  if (p <= 0.01) return null;
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const xx = x - ancho / 2 + (i + 0.5) * ancho / n, b = Math.sin(T * 4 + i * 1.3) * 12, w = 6 + 16 * grosor, pu = 18 + 22 * grosor;
    const y1 = ytop + b, y2 = ybot + b;
    return <g key={i}><line x1={xx} y1={y1} x2={xx} y2={y2 - pu} stroke={KC.ink} strokeWidth={w + 8} strokeLinecap="round" />
      <line x1={xx} y1={y1} x2={xx} y2={y2 - pu} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M ${xx - pu} ${y2 - pu - 4} L ${xx + pu} ${y2 - pu - 4} L ${xx} ${y2 + 6} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></g>; })}</g>;
}
// Columna de aire sobre algo: rectángulo translúcido con "aire" que baja. (x, ytop..ybot)
function ColumnaAire({ T, x, ytop, ybot, ancho = 210, p = 1, seed = 2 }) {
  const h = (ybot - ytop) * p, g = krng(seed);
  if (h < 2) return null;
  const y0 = ybot - h;
  return <g>
    <rect x={x - ancho / 2} y={y0} width={ancho} height={h} rx={20} fill="rgba(255,255,255,.38)" stroke={KC.ink} strokeWidth={6} strokeDasharray="18 12" />
    {Array.from({ length: Math.floor(h / 26) }, (_, i) => { const px = x - ancho / 2 + 20 + g() * (ancho - 40), py = y0 + ((g() * h + T * 50) % h);
      return <circle key={i} cx={px} cy={py} r={7} fill={AIRE} stroke={KC.ink} strokeWidth={2.5} />; })}
  </g>;
}
// Reloj sin números: la aguja da vueltas y el arco se llena (v en vueltas, 0..1). listo = palomita verde.
function Reloj({ x, y, r = 90, v = 0, listo = 0, color = KC.gold2 }) {
  const a = kclamp(v, 0, 0.999) * Math.PI * 2, ex = Math.sin(a) * r, ey = -Math.cos(a) * r;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 10} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {v > 0.005 && <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={color} opacity=".85" />}
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 4} x2={0} y2={-r + 18} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={ex * 0.85} y2={ey * 0.85} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <circle r={10} fill={KC.ink} />
    <rect x={-16} y={-r - 34} width={32} height={22} rx={6} fill={KC.ink} />
    {listo > 0 && <g transform={`translate(${r * 0.75} ${-r * 0.75}) scale(${listo})`}><circle r={40} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
      <path d="M -18 0 L -4 14 L 20 -14" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>}
  </g>;
}
// Olla exprés: tapa con cierre y válvula. (x, y) = centro del fondo. cierra 0..1 (la tapa baja), silba 0..1 (chorro de vapor).
function OllaExpres({ T, x, y, s = 1, cierra = 1, silba = 0 }) {
  const dy = (1 - cierra) * -260, giro = silba * Math.sin(T * 40) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={40} width={660} height={90} rx={18} fill="#3b3f4a" stroke={KC.ink} strokeWidth={9} />
    <Llamas T={T} />
    <rect x={-230} y={-4} width={460} height={14} rx={6} fill="#22252e" stroke={KC.ink} strokeWidth={5} />
    <path d="M -250 -300 L -250 -34 Q -250 0 -216 0 L 216 0 Q 250 0 250 -34 L 250 -300 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -220 -270 L -220 -60" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity=".5" />
    <rect x={-420} y={-292} width={180} height={34} rx={16} fill="#22252e" stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(0 ${dy})`}>
      <path d="M -262 -300 Q -250 -380 0 -385 Q 250 -380 262 -300 Z" fill="#dfe3ea" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <rect x={240} y={-330} width={190} height={34} rx={16} fill="#22252e" stroke={KC.ink} strokeWidth={7} />
      <rect x={-22} y={-430} width={44} height={50} rx={8} fill="#6b7080" stroke={KC.ink} strokeWidth={7} />
      <g transform={`translate(0 -440) rotate(${giro})`}><rect x={-34} y={-30} width={68} height={36} rx={10} fill={KC.ink} /><circle cx={0} cy={-34} r={12} fill={KC.ink} /></g>
      {silba > 0.02 && Array.from({ length: 6 }, (_, i) => { const f = (T * 1.6 + i / 6) % 1;
        return <path key={i} d={`M 0 -480 q ${30 * Math.sin(i)} ${-90 * f} ${8 * Math.sin(T * 9 + i)} ${-260 * f}`} stroke={VAPOR} strokeWidth={26 - 14 * f} fill="none" strokeLinecap="round" opacity={silba * (1 - f)} />; })}
    </g>
  </g>;
}
// Edificios de la ciudad (silueta), base en y.
function Ciudad({ x = 0, y, color = '#7a3a8c', o = 1 }) {
  const ed = [[0, 220, 120], [130, 330, 110], [250, 180, 140], [400, 420, 90], [500, 260, 130], [640, 360, 110], [760, 200, 140], [910, 300, 120]];
  return <g transform={`translate(${x} ${y})`} opacity={o}>{ed.map(([ex, h, w], i) => <g key={i}><rect x={ex} y={-h} width={w} height={h} fill={color} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: Math.floor(h / 60) }, (_, k) => <rect key={k} x={ex + 20} y={-h + 24 + k * 60} width={w - 40} height={22} rx={4} fill="#ffd9f0" opacity=".7" />)}</g>)}</g>;
}
// Pin del mapa con color por temperatura.
function Pin({ T, at, x, y, color }) {
  const e = kprog(T, at, at + 0.45, kEase.rebote); if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <circle r={34 + 8 * Math.sin(T * 5)} fill={color} opacity=".3" />
    <path d="M 0 0 C -30 -40 -30 -70 0 -76 C 30 -70 30 -40 0 0 Z" transform="translate(0 4)" fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-48} r={11} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Etiqueta en caja para el mapa (dentro de <svg>): dos renglones, línea al punto (px, py).
function CajaMapa({ T, at, x, y, l1, l2, px, py, color = KC.yellow, ancla = 'start' }) {
  const e = kprog(T, at, at + 0.4, kEase.sale); if (e <= 0) return null;
  const w = Math.max(l1.length * 24, l2 ? l2.length * 22 : 0) + 40, bx = ancla === 'start' ? x : x - w;
  return <g opacity={e}>
    <line x1={px} y1={py} x2={klerp(px, ancla === 'start' ? bx + 20 : bx + w - 20, e)} y2={klerp(py, y + 30, e)} stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(0 ${(1 - e) * 20})`}>
      <rect x={bx} y={y} width={w} height={l2 ? 116 : 66} rx={18} fill="rgba(14,15,18,.88)" stroke={color} strokeWidth={5} />
      <text x={bx + 20} y={y + 48} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{l1}</text>
      {l2 && <text x={bx + 20} y={y + 96} style={{ font:`700 34px ${KF.mono}` }} fill={color}>{l2}</text>}
    </g>
  </g>;
}

// Mapa (escala y lugar en pantalla) — mxProy da coordenadas de un mapa de 1000 px; aquí lo ampliamos.
const MAPA = { x: -200, y: 470, ancho: 1300 };
const mpt = (lon, lat) => { const [a, b] = mxProy(lon, lat), k = MAPA.ancho / 1000; return [MAPA.x + a * k, MAPA.y + b * k]; };
const CDMX = mpt(-99.13, 19.43), GDL = mpt(-103.35, 20.67), VER = mpt(-96.13, 19.18), CUN = mpt(-86.85, 21.16);

function Hervir() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // termómetro del gancho: baja de 100 a 92
  const tGancho = klerp(100, 92, kprog(T, K.Gancho + 0.3, K.Gancho + 2.6, kEase.suave));
  // olla en corte: el aire se adelgaza en "Facil"
  const aireG = klerp(1, 0.25, kprog(T, K.Facil + 0.2, K.Facil + 1.6, kEase.suave));
  const velB = klerp(0.5, 1.0, kprog(T, K.Facil + 0.8, K.Facil + 2.0));
  const tFacil = klerp(100, 92, kprog(T, K.Facil + 1.4, K.Facil + 3.2, kEase.suave));
  const tOlla = klerp(100, 120, kprog(T, K.Olla + 3.0, K.Olla + 5.0, kEase.suave));
  // relojes de los frijoles
  const vPlaya = 0.62 * kprog(T, K.Frijoles + 0.6, K.Frijoles + 3.2), vMonte = 0.62 * kprog(T, K.Frijoles + 0.6, K.Frijoles + 3.2) + 0.3 * kprog(T, K.Frijoles + 3.2, K.Frijoles + 4.8);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la olla hierve y el termómetro baja de 100 a 92 */}
      <Escena T={T} a={K.Gancho} b={K.Cien}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Olla T={T} x={400} y={1030} s={1.05} hierve={1} />
          <TermoV x={900} y={740} alto={320} valor={tGancho} min={80} max={104} marcas={[92, 100]} />
        </Lienzo>
        <NumeroGigante T={T} at={K.Gancho + 1.6} until={K.Cien - 0.1} valor={92} desde={100} dur={1.0} sufijo=" °C" etiqueta="en la CDMX" x={300} y={470} tam={190} />
      </Escena>
      {/* 1 · los 100 °C son del nivel del mar */}
      <Escena T={T} a={K.Cien} b={K.Burbujas} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SolDibujo x={180} y={640} r={70} T={T} />
          <rect x={0} y={1000} width={KW} height={240} fill="#ffd27a" stroke={KC.ink} strokeWidth={8} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 + ((T * 60 + i * 40) % 80)} ${960 + i * 18} q 45 -26 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0 t 90 0`} fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={0.8 - i * 0.2} />)}
          <Olla T={T} x={620} y={1080} s={0.62} hierve={1} />
        </Lienzo>
        <Chip T={T} at={K.Cien + 0.2} until={K.Burbujas - 0.1} texto="100 °C = nivel del mar" x={540} y={420} tam={48} borde={KC.yellow} />
        <MitoTachado T={T} at={K.Cien + 0.6} tacharEn={K.Cien + 1.6} until={K.Burbujas - 0.1} texto="100 °C en la CDMX" x={540} y={560} tam={50} />
      </Escena>
      {/* 2 · por dentro: burbujas de vapor contra el aire */}
      <Escena T={T} a={K.Burbujas} b={K.Pregunta} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <Olla T={T} x={540} y={1130} s={1.25} hierve={1} corte={kprog(T, K.Burbujas - 0.3, K.Burbujas + 0.5)} vel={velB} />
          <FlechasAire T={T} x={540} ytop={490} ybot={735} ancho={540} grosor={aireG} p={kprog(T, K.Burbujas + 2.0, K.Burbujas + 2.6) * (1 - kprog(T, K.Burbujas + 2.9, K.Burbujas + 3.3)) + kprog(T, K.Columna + 0.5, K.Facil + 0.2)} />
          {T > K.Facil && <TermoV x={940} y={560} alto={300} valor={tFacil} min={80} max={104} marcas={[92, 100]} />}
        </Lienzo>
        <Chip T={T} at={K.Burbujas + 2.1} until={K.Columna - 0.1} texto="aire de encima ↓" x={540} y={360} tam={42} borde={AIRE} />
        <Chip T={T} at={K.Burbujas + 0.6} until={K.Burbujas + 2.0} texto="nacen en el fondo" x={700} y={400} tam={42} borde={KC.gold} />
        <Lupa T={T} at={K.Burbujas + 3.0} until={K.Columna - 0.3} x={540} y={560} r={150} fx={560} fy={960} tinte={KC.cyan} etiqueta="POR DENTRO · BURBUJA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={AGUA} />
            <circle cx={r} cy={r} r={r * 0.62} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 10 }, (_, i) => { const a = i * 2.4 + t * (1.5 + i * 0.2), d = r * 0.42 * Math.abs(Math.sin(t * 2 + i));
              return <circle key={i} cx={r + Math.cos(a) * d} cy={r + Math.sin(a) * d} r={8} fill={KC.coral} stroke={KC.ink} strokeWidth={3} />; })}
            {[0, 1, 2, 3, 4, 5].map((i) => { const a = i * Math.PI / 3, k = 1 + 0.08 * Math.sin(t * 6); return <line key={i} x1={r + Math.cos(a) * r * 0.66 * k} y1={r + Math.sin(a) * r * 0.66 * k} x2={r + Math.cos(a) * r * 0.9 * k} y2={r + Math.sin(a) * r * 0.9 * k} stroke={KC.yellow} strokeWidth={9} strokeLinecap="round" />; })}</svg>} />
        <Chip T={T} at={K.Facil + 0.2} until={K.Pregunta - 0.1} texto="menos aire = hierve antes" x={540} y={420} tam={42} borde={KC.mint} />
      </Escena>
      {/* 3 · la columna de aire: playa contra montaña */}
      <Escena T={T} a={K.Columna} b={K.Facil} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={0} y={1130} width={560} height={120} fill="#ffd27a" stroke={KC.ink} strokeWidth={8} />
          <path d={`M -20 1130 q 40 -18 80 0 t 80 0 t 80 0`} fill="none" stroke={KC.cyan} strokeWidth={12} strokeLinecap="round" />
          <Montana x={810} y={1140} ancho={560} alto={420} />
          <rect x={540} y={1130} width={560} height={120} fill="#8a7b9e" stroke={KC.ink} strokeWidth={8} />
          <PersonaSimple x={270} yPies={1135} alto={300} color={KC.orange} cara={T > K.Columna + 2.5 ? 'o' : 'normal'} />
          <PersonaSimple x={810} yPies={730} alto={170} color={KC.pink} cara="sonrie" />
          <ColumnaAire T={T} x={270} ytop={440} ybot={830} ancho={230} p={kprog(T, K.Columna + 0.3, K.Columna + 1.5, kEase.sale)} seed={2} />
          <ColumnaAire T={T} x={810} ytop={440} ybot={555} ancho={230} p={kprog(T, K.Columna + 0.3, K.Columna + 1.5, kEase.sale)} seed={5} />
          <FlechasAire T={T} x={270} ytop={700} ybot={820} ancho={200} n={3} grosor={1} p={kprog(T, K.Columna + 2.6, K.Columna + 3.0)} color={KC.yellow} />
          <FlechasAire T={T} x={810} ytop={480} ybot={550} ancho={200} n={2} grosor={0.2} p={kprog(T, K.Columna + 4.0, K.Columna + 4.4)} color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Columna + 0.3} until={K.Facil - 0.1} texto="columna de aire" x={540} y={360} tam={40} borde={AIRE} />
        <Chip T={T} at={K.Columna + 2.8} until={K.Facil - 0.1} texto="playa: pesa más" x={280} y={1065} tam={36} borde={KC.yellow} />
        <Chip T={T} at={K.Columna + 4.1} until={K.Facil - 0.1} texto="montaña: pesa menos" x={790} y={1065} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Guadalajara} />
      {/* 6–7 · mapa de México */}
      <Escena T={T} a={K.Guadalajara} b={K.Frijoles} fondo={KC.cyan} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Guadalajara - 0.4, K.Guadalajara + 0.4, kEase.sale)) * 300})`}>
            <MapaMexico x={MAPA.x} y={MAPA.y} ancho={MAPA.ancho} conCA={false} />
            <Pin T={T} at={K.Guadalajara + 0.1} x={CDMX[0]} y={CDMX[1]} color={KC.orange} />
            <Pin T={T} at={K.Guadalajara + 0.9} x={GDL[0]} y={GDL[1]} color={KC.yellow} />
            <Pin T={T} at={K.Mar + 0.2} x={VER[0]} y={VER[1]} color={KC.red} />
            <Pin T={T} at={K.Mar + 0.8} x={CUN[0]} y={CUN[1]} color={KC.red} />
            <CajaMapa T={T} at={K.Guadalajara + 0.3} x={60} y={1030} l1="CDMX" l2="≈ 92 °C" px={CDMX[0]} py={CDMX[1]} color={KC.orange} />
            <CajaMapa T={T} at={K.Guadalajara + 1.2} x={60} y={640} l1="Guadalajara" l2="≈ 94 °C · 1,536 m" px={GDL[0]} py={GDL[1] - 60} color={KC.yellow} />
            <CajaMapa T={T} at={K.Mar + 0.4} x={560} y={1030} l1="Veracruz" l2="100 °C" px={VER[0]} py={VER[1]} color={KC.red} />
            <CajaMapa T={T} at={K.Mar + 1.0} x={1000} y={680} l1="Cancún" l2="100 °C" px={CUN[0]} py={CUN[1] - 60} color={KC.red} ancla="end" />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Guadalajara + 1.4} until={K.Mar - 0.1} texto="a unos 1,500 m de altura" x={540} y={420} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Mar + 0.2} until={K.Frijoles - 0.1} texto="nivel del mar = 100 °C" x={540} y={420} tam={40} borde={KC.red} />
      </Escena>
      {/* 8 · frijoles: arriba tardan más */}
      <Escena T={T} a={K.Frijoles} b={K.Olla} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Olla T={T} x={270} y={1050} s={0.68} hierve={1} frijoles={1} color={KC.teal} seed={5} />
          <Olla T={T} x={810} y={1050} s={0.68} hierve={0.75} frijoles={1} color={KC.lilac} seed={9} />
          <Reloj x={270} y={640} r={90} v={vPlaya} listo={kprog(T, K.Frijoles + 3.2, K.Frijoles + 3.6, kEase.rebote)} />
          <Reloj x={810} y={640} r={90} v={vMonte} listo={kprog(T, K.Frijoles + 4.8, K.Frijoles + 5.2, kEase.rebote)} />
          <g transform={`translate(540 ${klerp(1300, 900, kprog(T, K.Frijoles + 1.8, K.Frijoles + 2.3, kEase.rebote))}) rotate(${Math.sin(T * 3) * 8})`}>
            <ellipse cx={0} cy={0} rx={52} ry={66} fill="#fff6e6" stroke={KC.ink} strokeWidth={7} /><ellipse cx={-16} cy={-22} rx={12} ry={18} fill="#fff" opacity=".8" /></g>
        </Lienzo>
        <Chip T={T} at={K.Frijoles + 0.2} until={K.Olla - 0.1} texto="playa" x={270} y={460} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Frijoles + 0.4} until={K.Olla - 0.1} texto="montaña" x={810} y={460} tam={40} borde={KC.lilac} />
        <Etq T={T} at={K.Frijoles + 2.3} until={K.Olla - 0.1} x={600} y={830} texto="huevo" lado="der" />
        <Chip T={T} at={K.Frijoles + 3.4} until={K.Olla - 0.1} texto="más tiempo arriba" x={810} y={800} tam={34} borde={KC.yellow} />
      </Escena>
      {/* 9 · la olla exprés hace trampa */}
      <Escena T={T} a={K.Olla} b={K.Everest} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <OllaExpres T={T} x={430} y={1080} s={1.0} cierra={kprog(T, K.Olla + 0.2, K.Olla + 0.8, kEase.rebote)} silba={kprog(T, K.Olla + 1.4, K.Olla + 1.8)} />
          <TermoV x={930} y={640} alto={420} valor={tOlla} min={80} max={125} marcas={[100, 120]} />
          <Onomato T={T} at={K.Olla + 1.5} dur={1.6} x={430} y={420} texto="¡PSSST!" color={KC.texto} tam={110} rot={-6} />
        </Lienzo>
        <Chip T={T} at={K.Olla + 3.0} until={K.Everest - 0.1} texto="más presión" x={300} y={420} tam={40} borde={KC.red} />
        <NumeroGigante T={T} at={K.Olla + 4.2} until={K.Everest - 0.1} valor={120} desde={100} dur={0.8} prefijo="≈ " sufijo=" °C" x={360} y={590} tam={150} color={KC.red} />
      </Escena>
      {/* 10 · Everest */}
      <Escena T={T} a={K.Everest} b={K.Cierre} fondo={KC.blue}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.18)" />
        <Lienzo>
          <Nube x={180} y={1000} s={0.9} />
          <Montana x={470} y={1250} ancho={1100} alto={760} color="#9aa3b5" />
          <g transform="translate(470 490)"><line x1={0} y1={0} x2={0} y2={-120} stroke={KC.ink} strokeWidth={8} /><path d={`M 0 -120 L ${80 + Math.sin(T * 6) * 8} -100 L 0 -78 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>
          <Olla T={T} x={600} y={560} s={0.26} hierve={0.6} estufa={false} color={KC.orange} seed={11} />
          <Reloj x={330} y={760} r={60} v={(T * 1.4) % 1} color={KC.lilac} />
          <TermoV x={940} y={560} alto={400} valor={klerp(100, 70, kprog(T, K.Everest + 0.6, K.Everest + 2.2, kEase.suave))} min={60} max={104} marcas={[70, 100]} />
        </Lienzo>
        <Chip T={T} at={K.Everest + 0.4} until={K.Cierre - 0.1} texto="Everest ≈ 70 °C" x={540} y={420} tam={48} borde={KC.cyan} />
      </Escena>
      {/* 11 · cierre: la olla del inicio, ahora en la CDMX */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g opacity={kprog(T, K.Cierre, K.Cierre + 1.0)}>
            <Montana x={250} y={790} ancho={460} alto={260} color="#a58ac0" />
            <Montana x={560} y={790} ancho={420} alto={200} color="#a58ac0" />
            <g transform="translate(60 790) scale(0.8)"><Ciudad x={0} y={0} /></g>
          </g>
          <rect x={0} y={784} width={KW} height={14} fill={KC.ink} opacity={kprog(T, K.Cierre, K.Cierre + 1.0)} />
          <Olla T={T} x={400} y={1030} s={1.05} hierve={1} />
          <TermoV x={900} y={740} alto={320} valor={92} min={80} max={104} marcas={[92, 100]} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.4} until={K.Outro - 0.1} texto="92 °C en la CDMX" x={540} y={420} tam={56} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Cien - 0.1} texto="En la CDMX el agua hierve a *unos 92 °C.*" />
      <Subtitulo T={T} idx={1} at={K.Cien + 0.1} until={K.Burbujas - 0.1} texto="Los 100 °C son *del nivel del mar.*" />
      <Subtitulo T={T} idx={2} at={K.Burbujas + 0.1} until={K.Columna - 0.1} texto="Burbujas de vapor *empujan al aire.*" />
      <Subtitulo T={T} idx={3} at={K.Columna + 0.1} until={K.Facil - 0.1} texto="Encima: *una columna de aire.*" />
      <Subtitulo T={T} idx={4} at={K.Facil + 0.1} until={K.Pregunta - 0.1} texto="Menos aire: *hierve antes.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.05} until={K.Guadalajara - 0.05} texto="¿Y en *tu ciudad?*" />
      <Subtitulo T={T} idx={6} at={K.Guadalajara + 0.1} until={K.Mar - 0.1} texto="Guadalajara: *cerca de 94 °C.*" />
      <Subtitulo T={T} idx={7} at={K.Mar + 0.1} until={K.Frijoles - 0.1} texto="Veracruz o Cancún: *100 °C.*" />
      <Subtitulo T={T} idx={8} at={K.Frijoles + 0.1} until={K.Olla - 0.1} texto="Arriba, cocer *tarda más.*" />
      <Subtitulo T={T} idx={9} at={K.Olla + 0.1} until={K.Everest - 0.1} texto="Olla exprés: *unos 120 °C.*" />
      <Subtitulo T={T} idx={10} at={K.Everest + 0.1} until={K.Cierre - 0.1} texto="Everest: *unos 70 °C.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu agua hirviendo: *más fría.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Burbujas + 0.5, K.Burbujas + 2.8, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Columna + 2.6, K.Facil - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Facil + 1.5, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Guadalajara + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mar + 0.3, K.Frijoles - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Frijoles + 2.0, K.Olla - 0.1, 'avatar_03_aburrido_manos_mejillas', 'bajo-der'],
        [K.Olla + 1.6, K.Olla + 5.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Everest + 1.0, K.Cierre - 0.1, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="13" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function HervirApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hervir /></CompositionStage></div>;
}
window.HervirApp = HervirApp;
