// Shot Ambiental #13 · A esta tortuga no la deciden sus cromosomas: la decide la arena — NARRADO (N1 "Por dentro").
// Datos: Jensen et al. 2018 (Current Biology), SWOT, NOAA NOS, Standora & Spotila 1985, García-Grajales et al. 2019. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (mapas, corte del huevo, embrión y cromosomas).

const TC = { arena:'#f3d58c', arenaO:'#d9b467', mar:'#1fa3d8', espuma:'#bff0ff', macho:'#2f7bff', hembra:'#ff8a1f', huevo:'#fbf8f0', cara:'#8a7a45', piel:'#9fae7d', laud:'#2c3540' };

// Tortuga marina vista desde arriba, cabeza hacia arriba (y negativa). Morfología de tortuga verde (Chelonia mydas):
// 5 escudos vertebrales, 4 pares de costales, anillo de marginales, un par de prefrontales; aletas delanteras largas.
// especie 'laud' = Dermochelys: caparazón alargado de cuero con 7 crestas, sin escudos. ph = fase del aleteo. color = caparazón.
function Tortuga({ x = 0, y = 0, rot = 0, s = 1, ph = 0, especie = 'verde', color, piel, o = 1 }) {
  const a = Math.sin(ph) * 18, b = Math.sin(ph + 1.6) * 12;
  if (especie === 'laud') {
    const C = color || TC.laud, P = piel || '#3a4552';
    return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
      {[-1, 1].map((k) => <path key={'f' + k} transform={`rotate(${k * a} ${k * 44} -46)`} d={`M ${k * 40} -60 Q ${k * 150} -80 ${k * 200} 10 Q ${k * 140} -10 ${k * 46} -20 Z`} fill={P} stroke={KC.ink} strokeWidth={6} />)}
      {[-1, 1].map((k) => <path key={'r' + k} transform={`rotate(${k * b} ${k * 30} 90)`} d={`M ${k * 26} 80 Q ${k * 80} 100 ${k * 70} 140 Q ${k * 40} 130 ${k * 18} 104 Z`} fill={P} stroke={KC.ink} strokeWidth={5} />)}
      <ellipse cx={0} cy={-112} rx={30} ry={30} fill={P} stroke={KC.ink} strokeWidth={6} />
      <path d="M 0 -96 C 70 -96 82 -20 70 50 C 58 120 20 170 0 190 C -20 170 -58 120 -70 50 C -82 -20 -70 -96 0 -96 Z" fill={C} stroke={KC.ink} strokeWidth={7} />
      {[-48, -28, -10, 10, 28, 48].map((cx, i) => <path key={i} d={`M ${cx * 0.7} -90 C ${cx * 1.15} -20 ${cx * 1.05} 80 ${cx * 0.2} 182`} stroke="#11161c" strokeWidth={5} fill="none" />)}
      <path d="M 0 -92 L 0 186" stroke="#11161c" strokeWidth={5} />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={((i * 37) % 100) - 50} cy={-60 + ((i * 53) % 200)} r={4} fill="#dfe6ee" opacity=".7" />)}
    </g>;
  }
  const C = color || TC.cara, P = piel || TC.piel;
  const vert = [-62, -32, -2, 28, 58];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {/* aletas delanteras (largas, en forma de remo) y traseras (cortas) */}
    {[-1, 1].map((k) => <path key={'f' + k} transform={`rotate(${k * a} ${k * 50} -46)`} d={`M ${k * 48} -62 Q ${k * 150} -78 ${k * 178} -6 Q ${k * 120} -24 ${k * 52} -26 Z`} fill={P} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {[-1, 1].map((k) => <path key={'r' + k} transform={`rotate(${k * b} ${k * 34} 74)`} d={`M ${k * 30} 64 Q ${k * 84} 78 ${k * 78} 118 Q ${k * 46} 116 ${k * 22} 92 Z`} fill={P} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    <path d="M -8 96 L 0 124 L 8 96 Z" fill={P} stroke={KC.ink} strokeWidth={4} />
    {/* cabeza con un par de escamas prefrontales */}
    <ellipse cx={0} cy={-112} rx={26} ry={32} fill={P} stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -138 L 0 -116 M -12 -130 Q 0 -122 12 -130" stroke={KC.ink} strokeWidth={3} fill="none" />
    <circle cx={-15} cy={-118} r={4.5} fill={KC.ink} /><circle cx={15} cy={-118} r={4.5} fill={KC.ink} />
    {/* caparazón: anillo de marginales + vertebrales + costales */}
    <ellipse cx={0} cy={0} rx={74} ry={98} fill={C} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 22 }, (_, i) => { const t = (i / 22) * Math.PI * 2; return <line key={i} x1={Math.cos(t) * 62} y1={Math.sin(t) * 84} x2={Math.cos(t) * 74} y2={Math.sin(t) * 98} stroke={KC.ink} strokeWidth={3} />; })}
    <ellipse cx={0} cy={0} rx={62} ry={84} fill="rgba(255,255,255,.08)" stroke={KC.ink} strokeWidth={4} />
    {vert.map((vy, i) => <path key={i} d={`M -16 ${vy - 13} L 16 ${vy - 13} L 21 ${vy} L 16 ${vy + 13} L -16 ${vy + 13} L -21 ${vy} Z`} fill="rgba(0,0,0,.08)" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />)}
    {[-1, 1].map((k) => [-45, -15, 15, 45].map((cy, j) => <line key={k + '_' + j} x1={k * 21} y1={cy} x2={k * 60 * Math.sqrt(Math.max(0.05, 1 - (cy / 84) ** 2))} y2={cy * 1.06} stroke={KC.ink} strokeWidth={4} />))}
    <ellipse cx={-22} cy={-40} rx={14} ry={22} fill="#fff" opacity=".18" />
  </g>;
}
// Huevo de tortuga marina: blanco y esférico (tamaño y forma de pelota de ping-pong).
function Huevo({ x, y, r = 22, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={TC.huevo} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.14)} />
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.28} fill="#fff" />
  </g>;
}
// Cromosoma esquemático: 'X' (dos brazos cruzados) o 'Y' (más corto) o 'I' (un par igual de autosomas).
function Cromo({ x, y, tipo = 'X', s = 1, color = KC.pink, rot = 0 }) {
  const brazo = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={22} strokeLinecap="round" />;
  const borde = (x1, y1, x2, y2) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={KC.ink} strokeWidth={32} strokeLinecap="round" />;
  const L = tipo === 'Y' ? [[-16, -40, 0, 0], [16, -40, 0, 0], [0, 0, 0, 34]] : tipo === 'I' ? [[0, -46, 0, 46]] : [[-22, -50, 22, 50], [22, -50, -22, 50]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{L.map((l, i) => <g key={'b' + i}>{borde(...l)}</g>)}{L.map((l, i) => <g key={'c' + i}>{brazo(...l)}</g>)}
    <circle r={9} fill={KC.ink} /></g>;
}
// Termómetro con escala 27–32 °C (si numeros). valor en °C.
function Termo({ x, y, alto = 560, valor = 29, numeros = true, min = 27, max = 32 }) {
  const f = kclamp((valor - min) / (max - min), 0, 1), h = (alto - 60) * f;
  const col = mixHex(TC.macho, '#ff3b2f', f);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-alto} width={68} height={alto} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-17} y={-30 - h} width={34} height={h + 30} rx={17} fill={col} />
    <circle cx={0} cy={18} r={56} fill={col} stroke={KC.ink} strokeWidth={7} />
    {numeros && Array.from({ length: max - min + 1 }, (_, i) => { const yy = -30 - (alto - 60) * (i / (max - min));
      return <g key={i}><line x1={34} y1={yy} x2={58} y2={yy} stroke={KC.ink} strokeWidth={5} /><text x={68} y={yy + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{min + i}°</text></g>; })}
  </g>;
}
// Arena en corte (vista lateral) con el nido en forma de botella y huevos apilados. Coordenadas locales (0,0) = superficie, centro del nido.
function NidoCorte({ x, y, w = 600, prof = 360, n = 14, r = 24, T = 0 }) {
  const hs = []; const filas = [5, 4, 3, 2];
  let k = 0; filas.forEach((c, f) => { for (let i = 0; i < c && k < n; i++, k++) hs.push([(i - (c - 1) / 2) * r * 2.05, prof - r - f * r * 1.75]); });
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={prof + 80} fill={TC.arenaO} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 50 }, (_, i) => <circle key={i} cx={-w / 2 + ((i * 97) % w)} cy={10 + ((i * 61) % (prof + 60))} r={3 + (i % 3)} fill="#b8924c" opacity=".7" />)}
    <path d={`M -40 0 L -40 ${prof * 0.35} Q -${r * 6.5} ${prof * 0.55} -${r * 5.6} ${prof} Q 0 ${prof + 30} ${r * 5.6} ${prof} Q ${r * 6.5} ${prof * 0.55} 40 ${prof * 0.35} L 40 0 Z`} fill="#c99e55" stroke={KC.ink} strokeWidth={4} strokeDasharray="12 8" />
    {hs.map(([hx, hy], i) => <Huevo key={i} x={hx} y={hy} r={r} />)}
  </g>;
}
// Playa vista desde arriba: mar arriba (hasta yMar), arena abajo.
function PlayaArriba({ T, yMar = 420 }) {
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill={TC.arena} />
    {Array.from({ length: 90 }, (_, i) => <circle key={i} cx={(i * 131) % KW} cy={yMar + 30 + ((i * 89) % (KH - yMar))} r={3} fill={TC.arenaO} opacity=".8" />)}
    <path d={`M 0 0 H ${KW} V ${yMar + Math.sin(T * 1.5) * 12} ` + Array.from({ length: 13 }, (_, i) => `Q ${KW - i * 90 - 45} ${yMar + 26 + Math.sin(T * 1.5 + i) * 10} ${KW - (i + 1) * 90} ${yMar + Math.sin(T * 1.5 + i + 1) * 12}`).join(' ') + ' Z'} fill={TC.mar} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${60 + i * 130} ${120 + (i % 3) * 90} q 25 -14 50 0`} stroke={TC.espuma} strokeWidth={6} fill="none" opacity={0.6 + 0.4 * Math.sin(T * 2 + i)} />)}
  </g>;
}
// Mapa esquemático de Australia (contorno a mano) con la Gran Barrera.
const AU = [[113.5,-22],[114,-26],[115,-34],[118,-35],[123,-34],[129,-31.5],[132,-32],[135.5,-35],[138,-35.5],[140,-38],[144,-38.5],[147,-38],[150,-37.5],[151,-34],[153,-31],[153.5,-28],[153,-25],[151,-23],[149,-21],[146,-19],[145.5,-16],[144.5,-14.5],[143.5,-12.5],[142.5,-10.7],[142,-12.5],[141.5,-15],[140.5,-17.5],[139,-17],[137,-16],[136,-13],[136.8,-12],[135,-12],[132.5,-11.2],[131,-12],[129.5,-15],[127,-14],[125,-15],[123,-17],[122,-18.5],[119,-20],[116,-21]];
const auP = (lon, lat, k) => [(lon - 112) * k, (-10 - lat) * k * 1.08];
function MapaAustralia({ x, y, ancho = 640, norte = 0, sur = 0 }) {
  const k = ancho / 42, d = 'M ' + AU.map(([a, b]) => auP(a, b, k).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const arrecife = [[143.6,-11],[144.6,-13.5],[145.8,-15.5],[146.8,-17.5],[148.5,-19.5],[150.5,-21],[152,-22.5],[152.8,-23.8]];
  const [rx, ry] = auP(144.03, -11.59, k), [sx, sy] = auP(152, -23.5, k);
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill="#e9c27a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {arrecife.map(([a, b], i) => { const [px, py] = auP(a + 0.9, b, k); return <circle key={i} cx={px} cy={py} r={8} fill="#7ff0d0" stroke={KC.ink} strokeWidth={3} />; })}
    {norte > 0 && <g opacity={norte}><circle cx={rx + 10} cy={ry} r={38 + 4 * Math.sin(norte * 9)} fill="rgba(255,59,47,.35)" stroke={KC.red} strokeWidth={6} /><circle cx={rx + 10} cy={ry} r={9} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>}
    {sur > 0 && <g opacity={sur}><circle cx={sx + 10} cy={sy} r={38} fill="rgba(47,123,255,.3)" stroke={TC.macho} strokeWidth={6} /></g>}
  </g>;
}
// Criadero cercado (vista de frente): estacas de nidos detrás de la malla. sombra 0..1 = malla de sombra que se tiende.
function Criadero({ T, y = 980, sombra = 0, agua = 0 }) {
  const postes = Array.from({ length: 11 }, (_, i) => 110 + i * 86);
  return <g>
    <rect x={0} y={y - 40} width={KW} height={KH} fill={TC.arena} />
    {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={(i * 131) % KW} cy={y + ((i * 47) % 400)} r={3} fill={TC.arenaO} />)}
    {sombra > 0 && <ellipse cx={540} cy={y + 40} rx={470 * sombra} ry={60} fill="rgba(60,40,10,.25)" />}
    {/* estacas de los nidos con su registrador de temperatura */}
    {[0, 1].map((f) => Array.from({ length: 6 }, (_, i) => { const sx = 200 + i * 136 + f * 60, sy = y - 10 - f * 50;
      return <g key={f + '_' + i}><line x1={sx} y1={sy} x2={sx} y2={sy - 70} stroke="#7a5326" strokeWidth={7} /><rect x={sx - 18} y={sy - 86} width={36} height={22} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={3} />
        <ellipse cx={sx} cy={sy + 4} rx={30} ry={9} fill={TC.arenaO} /></g>; }))}
    {/* malla de sombra arriba */}
    {sombra > 0 && <g opacity={kclamp(sombra * 2, 0, 1)}>
      {[110, 970].map((px) => <line key={px} x1={px} y1={y + 20} x2={px} y2={y - 330} stroke="#7a5326" strokeWidth={10} />)}
      <rect x={110} y={y - 340} width={860 * sombra} height={34} fill="rgba(20,70,40,.8)" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: Math.floor(28 * sombra) }, (_, i) => <line key={i} x1={110 + i * 31} y1={y - 340} x2={110 + i * 31} y2={y - 306} stroke="#5aa06a" strokeWidth={2} />)}
    </g>}
    {/* cerca de malla */}
    <rect x={110} y={y - 110} width={860} height={130} fill="rgba(255,255,255,.18)" />
    {Array.from({ length: 22 }, (_, i) => <line key={'m' + i} x1={110 + i * 40} y1={y - 110} x2={150 + i * 40} y2={y + 20} stroke="#556" strokeWidth={2} opacity=".6" />)}
    {Array.from({ length: 22 }, (_, i) => <line key={'n' + i} x1={150 + i * 40} y1={y - 110} x2={110 + i * 40} y2={y + 20} stroke="#556" strokeWidth={2} opacity=".6" />)}
    <line x1={110} y1={y - 110} x2={970} y2={y - 110} stroke={KC.ink} strokeWidth={5} />
    {postes.map((px) => <rect key={px} x={px - 8} y={y - 130} width={16} height={160} rx={4} fill="#8a5a2b" stroke={KC.ink} strokeWidth={4} />)}
    {agua > 0 && <g opacity={agua}><path d={`M 760 ${y - 250} l 90 -30 l 30 40 l -90 30 Z`} fill="#4aa3df" stroke={KC.ink} strokeWidth={5} />
      <Goteo T={T} x={745} y0={y - 230} y1={y - 20} cada={0.18} color="#7fd0ff" r={9} />
      <Goteo T={T + 0.09} x={715} y0={y - 220} y1={y - 20} cada={0.22} color="#7fd0ff" r={8} /></g>}
  </g>;
}
// Fracción de hembras según la temperatura (esquema: 0 % bajo 27.7 °C, 50 % en 29 °C, 100 % sobre 31 °C, según SWOT).
function fracHembras(c) { if (c <= 27.7) return 0; if (c >= 31) return 1; return c < 29 ? 0.5 * (c - 27.7) / 1.3 : 0.5 + 0.5 * (c - 29) / 2; }

function TortugasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nido, E: CUES.Embrion, Te: CUES.Tercio, Pv: CUES.Pivote, P: CUES.Pregunta, Es: CUES.Estudio, H: CUES.Hembras, O: CUES.Oaxaca, S: CUES.Sombra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: temperatura que sube y baja; la cría cambia de color
  const tG = 29 + 2 * Math.sin((T - K.G) * 1.6);
  // pivote: 29 → 27.5 → 31.5
  const tP = T < K.Pv + 2.2 ? 29 : T < K.Pv + 4.0 ? klerp(29, 27.5, kprog(T, K.Pv + 2.2, K.Pv + 3.0, kEase.suave)) : klerp(27.5, 31.5, kprog(T, K.Pv + 4.0, K.Pv + 4.9, kEase.suave));
  const fP = fracHembras(tP);
  // nido: la mamá cava, pone y se va
  const xN = 540, yNido = 1060;
  const sube = kprog(T, K.N + 2.4, K.N + 4.0, kEase.suave);
  const yMama = klerp(980, 330, sube);
  const nHuevos = Math.floor(10 * kprog(T, K.N + 0.3, K.N + 2.2));
  const tapa = kprog(T, K.N + 2.2, K.N + 2.8);
  // cierre: crías que salen y corren al mar
  const crias = Array.from({ length: 12 }, (_, i) => { const t0 = K.C + 0.6 + i * 0.22, u = kprog(T, t0, t0 + 3.4, (p) => p);
    return { x: xN + ((i % 6) - 2.5) * 34 * (1 + u * 2.2) + Math.sin(T * 9 + i) * 6 + (i >= 6 ? 18 : 0), y: klerp(yNido, 380, u), o: kprog(T, t0, t0 + 0.2) * (1 - kprog(T, t0 + 3.2, t0 + 3.5)), ph: T * 12 + i }; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tú (cromosomas) contra ella (arena) */}
      <Escena T={T} a={K.G} b={K.N}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', left:540, top:0, width:540, height:KH, background:TC.arena }}></div>
        {svg(<>
          <line x1={540} y1={0} x2={540} y2={KH} stroke={KC.ink} strokeWidth={10} />
          <text x={270} y={500} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">TÚ</text>
          <g transform={`translate(0 ${-14 * (1 - kprog(T, K.G, K.G + 0.6, kEase.rebote))})`}>
            <Cromo x={190} y={760} tipo="X" s={1.5} color={KC.pink} rot={-8 + 6 * Math.sin(T * 3)} />
            <Cromo x={350} y={760 + 12} tipo={Math.floor((T - K.G) / 1.2) % 2 ? 'Y' : 'X'} s={1.5} color={KC.cyan} rot={8 - 6 * Math.sin(T * 3)} />
          </g>
          <text x={270} y={930} textAnchor="middle" style={{ font:`700 46px ${KF.mono}` }} fill={KC.ink}>XX · XY</text>
          <NidoCorte x={810} y={840} w={540} prof={220} n={9} r={22} />
          <Termo x={1010} y={1010} alto={190} valor={tG} numeros={false} />
          <Tortuga x={700} y={760} s={0.42} ph={T * 4} color={mixHex(TC.macho, TC.hembra, fracHembras(tG))} piel="#4b524a" />
        </>)}
      </Escena>
      {/* 1 · la mamá cava, pone y regresa al mar (playa desde arriba) */}
      <Escena T={T} a={K.N} b={K.E + 0.6}>
        {svg(<>
          <PlayaArriba T={T} />
          {sube > 0 && <g opacity={0.8}>{Array.from({ length: 14 }, (_, i) => { const yy = 980 - i * 48; return yy > yMama + 60 ? <g key={i}><rect x={xN - 70} y={yy} width={26} height={12} rx={4} fill={TC.arenaO} /><rect x={xN + 44} y={yy} width={26} height={12} rx={4} fill={TC.arenaO} /></g> : null; })}</g>}
          <ellipse cx={xN} cy={yNido} rx={90} ry={60} fill={mixHex('#b88a44', TC.arena, tapa)} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" opacity={1 - tapa * 0.6} />
          {Array.from({ length: nHuevos }, (_, i) => <Huevo key={i} x={xN + ((i % 4) - 1.5) * 34} y={yNido - 18 + Math.floor(i / 4) * 30} r={15} o={1 - tapa} />)}
          <Tortuga x={xN} y={yMama} s={1.25} ph={T < K.N + 2.4 ? T * 7 : T * 4} o={1 - kprog(T, K.N + 3.6, K.N + 4.1)} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · por dentro: el embrión no trae cromosomas sexuales distintos */}
      <Lupa T={T} at={K.E + 0.2} until={K.Te - 0.15} x={400} y={760} r={280} fx={xN} fy={yNido} tinte={KC.cyan} etiqueta="POR DENTRO · EMBRIÓN"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" />
          <circle cx={r} cy={r} r={r * 0.82} fill="#f6efd9" stroke="#fff" strokeWidth={10} />
          <circle cx={r} cy={r + 30} r={r * 0.5} fill="#f6b53a" stroke={KC.ink} strokeWidth={5} />
          <path d={`M ${r - 60} ${r - 70} q -40 60 10 100 q 50 20 70 -30`} stroke="#f2a3a3" strokeWidth={34} fill="none" strokeLinecap="round" />
          <circle cx={r - 52} cy={r - 78} r={30} fill="#f2a3a3" stroke={KC.ink} strokeWidth={4} /><circle cx={r - 46} cy={r - 82} r={7} fill={KC.ink} />
          {[0, 1, 2].map((i) => <g key={i} opacity={kprog(T, K.E + 1.4 + i * 0.4, K.E + 1.8 + i * 0.4)}>
            <Cromo x={r - 110 + i * 100} y={r + 150} tipo="I" s={0.45} color={[KC.pink, KC.mint, KC.yellow][i]} /><Cromo x={r - 90 + i * 100} y={r + 150} tipo="I" s={0.45} color={[KC.pink, KC.mint, KC.yellow][i]} /></g>)}
        </svg>} />
      {/* 3 · decide el calor: el tercio de en medio de la incubación */}
      <Escena T={T} a={K.Te} b={K.Pv} fondo={KC.noche}>
        {svg(<>
          <circle cx={360} cy={870} r={230} fill="#f6efd9" stroke="#fff" strokeWidth={12} />
          <circle cx={360} cy={900} r={130 - 30 * kprog(T, K.Te, K.Pv)} fill="#f6b53a" stroke={KC.ink} strokeWidth={5} />
          <g transform={`translate(300 800) scale(${1 + 0.5 * kprog(T, K.Te, K.Pv)})`}>
            <path d="M -40 -30 q -40 60 10 100 q 50 20 70 -30" stroke="#f2a3a3" strokeWidth={34} fill="none" strokeLinecap="round" />
            <circle cx={-32} cy={-40} r={30} fill="#f2a3a3" stroke={KC.ink} strokeWidth={4} /><circle cx={-26} cy={-44} r={7} fill={KC.ink} /></g>
          <Termo x={830} y={1130} alto={460} valor={29 + 1.2 * Math.sin((T - K.Te) * 2.5)} numeros={false} />
          {/* barra de incubación (~60 días) en 3 tercios */}
          {[0, 1, 2].map((i) => { const on = i === 1 ? 0.5 + 0.5 * Math.sin(T * 6) : 0; const act = i === 1 && T > K.Te + 0.8;
            return <rect key={i} x={90 + i * 300} y={500} width={296} height={70} rx={14} fill={act ? mixHex(KC.gold, KC.yellow, on) : 'rgba(255,255,255,.18)'} stroke={KC.texto} strokeWidth={5} />; })}
          <rect x={90} y={500} width={900 * kprog(T, K.Te + 0.1, K.Pv - 0.3)} height={70} rx={14} fill="rgba(47,224,168,.35)" />
          <text x={540} y={475} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto}>incubación · unos 60 días</text>
          <text x={540} y={625} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.yellow} opacity={kprog(T, K.Te + 0.8, K.Te + 1.2)}>aquí se decide</text>
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 4 · ≈29 °C mitad y mitad; más fresco, más machos; más caliente, más hembras */}
      <Escena T={T} a={K.Pv} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Termo x={170} y={1120} alto={640} valor={tP} />
          {Array.from({ length: 10 }, (_, i) => { const hembra = i < Math.round(fP * 10); const cx = 470 + (i % 5) * 120, cy = 820 + Math.floor(i / 5) * 160;
            return <Tortuga key={i} x={cx} y={cy} s={0.42} ph={T * 6 + i} color={hembra ? TC.hembra : TC.macho} piel="#4b524a" />; })}
          <text x={710} y={1110} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{kformato(tP, 1)} °C</text>
        </>)}
      </Escena>
      {/* 5 · ¿y si la playa se calienta más cada año? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Sol T={T} x={250} y={520} r={60 + 35 * kprog(T, K.P, K.Es)} />
          <text x={200} y={1150} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 200 1000)`}>?</text>
          <Termo x={420} y={1110} alto={440} valor={klerp(29, 31.5, kprog(T, K.P + 0.2, K.Es, kEase.suave))} numeros={false} />
        </>)}
      </Escena>
      {/* 6 · el estudio de 2018: Gran Barrera de Coral, norte caliente y sur fresco */}
      <Escena T={T} a={K.Es} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<MapaAustralia x={120} y={780} ancho={600} norte={kprog(T, K.Es + 2.6, K.Es + 3.2)} sur={kprog(T, K.Es + 3.6, K.Es + 4.2)} />)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · 99 de cada 100 jóvenes del norte: hembras */}
      <Escena T={T} a={K.H} b={K.O}>
        <FondoLunares color={KC.cyan} />
        {svg(Array.from({ length: 100 }, (_, i) => { const on = kprog(T, K.H + 0.3 + i * 0.022, K.H + 0.4 + i * 0.022); const mach = i === 57;
          const blink = mach ? 0.6 + 0.4 * Math.sin(T * 8) : 1;
          return <Tortuga key={i} x={95 + (i % 10) * 58} y={600 + Math.floor(i / 10) * 58} s={0.2} ph={T * 5 + i} o={on * blink} color={mach ? TC.macho : TC.hembra} piel="#4b524a" />; }))}
      </Escena>
      {/* 8 · Oaxaca: dos criaderos de tortuga laúd */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.orange} />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.O + 3.2, K.O + 3.8) }}>
          {svg(<MapaMexico x={60} y={560} ancho={960} conCA={false}>
            {(() => { const [px, py] = mxProy(-97.4, 15.95); return <g><circle cx={px} cy={py} r={34 + 5 * Math.sin(T * 6)} fill="rgba(255,59,47,.35)" stroke={KC.red} strokeWidth={6} /><circle cx={px} cy={py} r={10} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>; })()}
          </MapaMexico>)}
        </div>
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.O + 3.2, K.O + 3.8) }}>
          {svg(<><Criadero T={T} y={1080} sombra={kprog(T, K.S + 0.3, K.S + 1.8, kEase.suave)} agua={kprog(T, K.S + 2.4, K.S + 2.8)} />
            <Tortuga x={800 + 40 * Math.sin((T - K.O) * 0.4)} y={760} rot={-70} s={0.7} ph={T * 3} especie="laud" o={1 - kprog(T, K.S, K.S + 0.5)} />
            {T > K.S - 0.2 && <Termo x={150} y={880} alto={300} valor={klerp(31.4, 30.3, kprog(T, K.S + 1.0, K.S + 4.0, kEase.suave))} numeros={false} />}</>)}
        </div>
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: la misma playa, ahora salen las crías y corren al mar */}
      <Escena T={T} a={K.C} b={FIN}>
        {svg(<>
          <PlayaArriba T={T} />
          <ellipse cx={xN} cy={yNido} rx={90} ry={60} fill="#b88a44" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" opacity={0.5} />
          {crias.map((c, i) => <Tortuga key={i} x={c.x} y={c.y} s={0.26} ph={c.ph} o={c.o} color="#3d4038" piel="#5b6158" />)}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.3} until={K.N - 0.2} texto="tú: cromosomas" x={270} y={1125} tam={32} borde={KC.pink} />
      <Chip T={T} at={K.G + 1.6} until={K.N - 0.2} texto="ella: la arena" x={790} y={1125} tam={32} borde={KC.orange} />
      <Etq T={T} at={K.N + 0.5} until={K.N + 2.6} x={630} y={760} texto="Chelonia mydas" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.N + 1.2} until={K.N + 3.0} x={650} y={1110} texto="huevos ≈ ping-pong" tam={28} color={KC.ink} />
      <Chip T={T} at={K.E + 1.8} until={K.Te - 0.2} texto="sin cromosomas sexuales distintos" y={420} x={400} tam={30} borde={KC.cyan} />
      <Etq T={T} at={K.Te + 0.6} until={K.Pv - 0.2} x={220} y={1150} texto="embrión (esquema)" tam={28} />
      <Chip T={T} at={K.Pv + 0.3} until={K.Pv + 2.2} texto="≈29 °C: mitad y mitad" x={640} y={500} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Pv + 4.6} until={K.P - 0.2} x={200} y={420} texto="≥31 °C: casi todas hembras" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Pv + 0.8} until={K.P - 0.2} texto="machos" x={390} y={680} tam={24} borde={TC.macho} />
      <Chip T={T} at={K.Pv + 0.8} until={K.P - 0.2} texto="hembras" x={580} y={680} tam={24} borde={TC.hembra} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 4.6} anio="2018" quien="Jensen et al. · EE. UU. y Australia" revista="Current Biology · tortuga verde" x={460} y={500} />
      <Etq T={T} at={K.Es + 2.8} until={K.H - 0.2} x={610} y={760} texto="norte · más caliente" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.0} until={K.H - 0.2} x={610} y={805} texto="Raine Island" it={false} tam={24} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.8} until={K.H - 0.2} x={720} y={1000} texto="sur · más fresco" tam={26} color={KC.ink} />
      <Chip T={T} at={K.H + 0.3} until={K.O - 0.2} texto="juveniles del norte: 99.1 % hembras" y={460} x={420} tam={28} borde={TC.hembra} />
      <NumeroGigante T={T} at={K.H + 1.2} until={K.O - 0.2} valor={99} dur={1.6} sufijo=" %" etiqueta="hembras" x={850} y={900} tam={150} color={TC.hembra} />
      <Chip T={T} at={K.H + 3.0} until={K.O - 0.2} texto="sur: 65–69 % hembras" y={1135} x={360} tam={26} borde={TC.macho} />
      <Etq T={T} at={K.O + 1.0} until={K.O + 3.3} x={620} y={1060} texto="Oaxaca · 2014–2017" tam={32} color={KC.ink} />
      <Etq T={T} at={K.O + 4.0} until={K.S - 0.2} x={760} y={560} texto="tortuga laúd" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.O + 4.3} until={K.S - 0.2} x={760} y={605} texto="Dermochelys coriacea" lado="izq" it tam={26} color={KC.ink} />
      <Chip T={T} at={K.O + 4.8} until={K.S - 0.2} texto="96.3 % hembras (calculado por temperatura)" y={1135} x={540} tam={26} borde={TC.hembra} />
      <Chip T={T} at={K.S + 0.6} until={K.C - 0.2} texto="malla de sombra" y={1135} x={330} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.5} until={K.C - 0.2} texto="riego" y={1135} x={760} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou - 0.1} texto="tú: cromosomas" x={250} y={560} tam={30} borde={KC.pink} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou - 0.1} texto="ella: unos grados de arena" x={330} y={650} tam={30} borde={KC.orange} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Tú: cromosomas. *Ella: la arena.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.E - 0.1} texto="Cava, pone los huevos *y se va.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Te - 0.1} texto="Sin *cromosomas sexuales* que decidan." />
      <Subtitulo T={T} idx={3} at={K.Te + 0.1} until={K.Pv - 0.1} texto="Decide el calor: *el tercio de en medio.*" />
      <Subtitulo T={T} idx={4} at={K.Pv + 0.1} until={K.P - 0.1} texto="≈29 °C: mitad y mitad. *Más calor, más hembras.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Y si la playa *se calienta más?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.H - 0.1} texto="2018: *Gran Barrera de Coral.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.O - 0.1} texto="Norte caliente: *99 % hembras.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.S - 0.1} texto="Oaxaca, laúd: *96 % hembras (cálculo).*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.C - 0.1} texto="Enfriar nidos: *sombra o agua.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tú: cromosomas. *Ella: unos grados de arena.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Embrion + 1.0, CUES.Tercio + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pivote + 2.4, CUES.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Hembras + 2.0, CUES.Oaxaca - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Oaxaca + 4.5, CUES.Sombra - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Sombra + 1.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TortugasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TortugasShot /></CompositionStage></div>;
}
window.TortugasApp = TortugasApp;
