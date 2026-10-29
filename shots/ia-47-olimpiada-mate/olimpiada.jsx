// Shot IA #47 · La IA que sacó oro en la Olimpiada de Matemáticas (y el problema que no pudo) — NARRADO (N2 "El número" + N5 "El experimento").
// Datos: imo-official.org (edición y resultados 2025), blog de Google DeepMind (21 jul 2025 y 25 jul 2024), hilo de A. Wei / OpenAI (19 jul 2025).
// Ver guion.md y verificacion.md. Todo es esquemático.
const ORO = '#f2b705', PLATA = '#c9d1db', BRONCE = '#d0843b', NARANJA_IA = '#ff8a1f';

// ---------- piezas propias ----------
// Pupitre con hoja; lápiz que escribe (T) o robotito sentado.
function Pupitre({ x, y, s = 1, T = 0, quien = 'tu', escribe = true, brillo = 0, etiqueta = 'P1' }) {
  const lx = escribe ? Math.sin(T * 9) * 26 : 0, ly = escribe ? Math.abs(Math.cos(T * 9)) * -8 : 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={40} width={420} height={36} rx={10} fill="#c98a4b" stroke={KC.ink} strokeWidth={8} />
    <line x1={-170} y1={76} x2={-170} y2={260} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <line x1={170} y1={76} x2={170} y2={260} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    {brillo > 0 && <circle cx={0} cy={0} r={150 + 20 * Math.sin(T * 5)} fill={ORO} opacity={0.35 * brillo} />}
    <g transform="rotate(-6)">
      <rect x={-110} y={-80} width={220} height={130} rx={8} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
      <text x={-90} y={-44} style={{ font:`700 30px ${KF.mono}` }} fill={KC.blue}>{etiqueta}</text>
      {[0, 1, 2].map((i) => <line key={i} x1={-90} y1={-14 + i * 22} x2={-90 + (110 + i * 30) * (escribe ? Math.min(1, ((T * 0.6 + i * 0.3) % 1.4)) : 1)} y2={-14 + i * 22} stroke={KC.blue} strokeWidth={5} opacity=".7" />)}
    </g>
    {quien === 'tu' && <g transform={`translate(${40 + lx} ${-30 + ly}) rotate(28)`}>
      <rect x={-12} y={-120} width={24} height={110} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      <path d="M -12 -10 L 0 18 L 12 -10 Z" fill="#f5d6a8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-12} y={-136} width={24} height={18} fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Hoja de examen P1..P6 con resultado: 'ok' (7/7), 'cero', 'vacia' o ''.
function HojaExamen({ x, y, s = 1, n, estado = '', p = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-62} y={-82} width={124} height={164} rx={10} fill={estado === 'vacia' ? '#e9e4da' : '#fffdf6'} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-40} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>P{n}</text>
    {[0, 1, 2].map((i) => <line key={i} x1={-40} y1={-6 + i * 20} x2={40 - i * 12} y2={-6 + i * 20} stroke="#2b3a8a" strokeWidth={4} opacity={estado === 'vacia' ? 0.15 : 0.6} />)}
    {estado === 'ok' && p > 0 && <g transform={`translate(0 52) scale(${klerp(1.8, 1, p)})`} opacity={p}>
      <circle r={30} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
      <path d="M -14 0 L -4 11 L 15 -11" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {(estado === 'cero' || estado === 'vacia') && p > 0 && <g transform="translate(0 52)" opacity={p}>
      <circle r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <text y={13} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">0</text>
    </g>}
  </g>;
}
// Fila de seis hojas. estados: array de 6; aparece hoja i en tiempos[i].
function SeisHojas({ T, x = 120, y = 1000, paso = 168, estados = [], tiempos = [], s = 1 }) {
  return <>{[1, 2, 3, 4, 5, 6].map((n, i) => { const t0 = tiempos[i] == null ? -99 : tiempos[i];
    return <HojaExamen key={n} x={x + i * paso} y={y} s={s} n={n} estado={estados[i] || ''} p={kprog(T, t0, t0 + 0.35, kEase.sale)} />; })}</>;
}
// Reloj de pared; vueltas = cuántas vueltas por segundo da la manecilla.
function Reloj({ x, y, s = 1, T = 0, vueltas = 0.15, texto = '' }) {
  const a = T * 360 * vueltas;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={90} fill="#fffdf6" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-72} x2={0} y2={-60} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-44} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${a / 12})`} />
    <line x1={0} y1={0} x2={0} y2={-66} stroke={KC.red} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a})`} />
    <circle r={9} fill={KC.ink} />
    {texto && <text y={140} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Australia esquemática (lon/lat → px) con pin en Sunshine Coast.
const AUS = [[113.6,-22],[114.2,-26],[115,-29.5],[115.7,-33.5],[117.9,-35.1],[123.5,-33.9],[126,-32.3],[131,-31.5],[134.2,-32.8],[135.9,-34.8],[137.8,-33],[138,-35.6],[140,-37.5],[143.5,-38.8],[146.3,-39.1],[149.9,-37.5],[150.2,-35.7],[151.3,-33.6],[153.1,-30.5],[153.6,-28.2],[153.1,-25.8],[151.2,-23.5],[149.5,-22.3],[146.3,-19],[145.4,-16],[145.3,-14.9],[143.6,-14],[142.5,-10.7],[141.6,-13],[141.5,-16.5],[140.6,-17.6],[139.3,-17.4],[135.9,-15],[136.8,-12.2],[133,-11.3],[130.4,-12.1],[129.5,-14.9],[127.7,-14.2],[125.1,-14.6],[122.2,-17.1],[121.2,-19.5],[118.8,-20.3],[116.7,-20.6],[114.6,-21.8]];
const TAS = [[144.6,-40.7],[148.3,-40.9],[148.2,-42.5],[147,-43.6],[145.3,-42.5]];
const ausP = ([lon, lat]) => [(lon - 112) * 18, (-10 - lat) * 18 * 1.05];
const ausPath = (pts) => 'M ' + pts.map((q) => ausP(q).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function Australia({ x, y, s = 1, T = 0, pin = 1 }) {
  const [px, py] = ausP([153.07, -26.65]), b = Math.abs(Math.sin(T * 4)) * -14;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={ausPath(AUS)} fill="#ffb35c" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={ausPath(TAS)} fill="#ffb35c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {pin > 0 && <g transform={`translate(${px} ${py + b * pin}) scale(${pin})`}>
      <circle r={40 + 10 * Math.sin(T * 5)} fill={KC.red} opacity=".25" transform={`translate(0 ${-b})`} />
      <path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <circle cy={-56} r={11} fill="#fff" />
    </g>}
  </g>;
}
// Juez (exmedallista): cabeza con medalla al cuello y paleta de calificación.
function Juez({ x, y, s = 1, T = 0, k = 0, color = KC.lilac }) {
  const b = Math.sin(T * 3 + k) * 5;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -70 120 Q -70 40 0 40 Q 70 40 70 120 Z" fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cy={-10} r={52} fill="#f2c9a0" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-18} cy={-14} r={6} fill={KC.ink} /><circle cx={18} cy={-14} r={6} fill={KC.ink} />
    <path d="M -16 14 Q 0 24 16 14" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -24 40 L 0 78 L 24 40" stroke={KC.blue} strokeWidth={8} fill="none" />
    <circle cy={88} r={18} fill={ORO} stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(78 ${-20 - Math.max(0, Math.sin(T * 2 + k)) * 18})`}>
      <line x1={0} y1={40} x2={0} y2={100} stroke={KC.ink} strokeWidth={8} />
      <rect x={-34} y={-6} width={68} height={56} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <text y={36} textAnchor="middle" style={{ font:`400 38px ${KF.titulo}` }} fill={KC.ink}>7</text>
    </g>
  </g>;
}
// Estudiante con medalla (para México).
function Estudiante({ x, y, s = 1, T = 0, k = 0, medalla = PLATA, playera = KC.leaf }) {
  const b = Math.abs(Math.sin(T * 4 + k)) * -10;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -58 130 Q -58 50 0 50 Q 58 50 58 130 Z" fill={playera} stroke={KC.ink} strokeWidth={6} />
    <circle cy={0} r={46} fill="#c98d5e" stroke={KC.ink} strokeWidth={6} />
    <path d="M -46 -8 Q -40 -52 0 -50 Q 40 -52 46 -8 Q 30 -30 0 -30 Q -30 -30 -46 -8 Z" fill="#2a1d14" />
    <circle cx={-15} cy={4} r={5} fill={KC.ink} /><circle cx={15} cy={4} r={5} fill={KC.ink} />
    <path d="M -14 22 Q 0 32 14 22" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M -20 50 L 0 84 L 20 50" stroke={KC.red} strokeWidth={7} fill="none" />
    <circle cy={98} r={20} fill={medalla} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Problema 6: cuadrícula con mosaicos rectangulares y un hueco por fila y columna (esquemático).
function CuadriculaP6({ x, y, s = 1, T = 0, p = 1 }) {
  const n = 9, c = 64, hueco = [2, 5, 8, 1, 4, 7, 0, 3, 6];
  const tiles = [[0,0,2,1],[3,0,2,2],[6,0,2,1],[0,1,1,3],[1,2,3,1],[5,1,1,2],[7,1,2,2],[1,3,1,2],[2,4,2,1],[5,3,3,1],[8,3,1,3],[0,5,4,1],[5,4,2,2],[0,6,1,3],[1,6,3,1],[4,6,2,2],[7,6,1,3],[2,7,2,2],[8,7,1,2],[1,8,1,1],[4,8,2,1],[6,5,2,1]];
  const cols = [KC.cyan, KC.pink, KC.mint, KC.yellow, KC.lilac, KC.orange];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-8} width={n * c + 16} height={n * c + 16} rx={12} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: n + 1 }, (_, i) => <g key={i}><line x1={i * c} y1={0} x2={i * c} y2={n * c} stroke="#cfc8bb" strokeWidth={2} /><line x1={0} y1={i * c} x2={n * c} y2={i * c} stroke="#cfc8bb" strokeWidth={2} /></g>)}
    {tiles.map(([tx, ty, w, h], i) => { const e = kclamp(p * tiles.length - i, 0, 1);
      return <rect key={i} x={tx * c + 5} y={ty * c + 5} width={w * c - 10} height={h * c - 10} rx={8} fill={cols[i % cols.length]} stroke={KC.ink} strokeWidth={5} opacity={e} transform={`translate(0 ${(1 - e) * -20})`} />; })}
    {hueco.map((hx, hy) => <circle key={hy} cx={hx * c + c / 2} cy={hy * c + c / 2} r={9} fill={KC.red} opacity={p > 0.9 ? 0.5 + 0.5 * Math.sin(T * 6 + hy) : 0} />)}
  </g>;
}
// Puerta (para el matiz).
function Puerta({ x, y, s = 1, abre = 0, color = KC.leaf, dentro = '#fff6c9', T = 0, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-230} width={260} height={420} rx={16} fill={dentro} stroke={KC.ink} strokeWidth={8} />
    {children}
    <g transform={`translate(-130 0) scale(${1 - 0.75 * abre} 1) translate(130 0)`}>
      <rect x={-130} y={-230} width={260} height={420} rx={16} fill={color} stroke={KC.ink} strokeWidth={8} />
      <rect x={-96} y={-196} width={192} height={150} rx={10} fill="none" stroke={KC.ink} strokeWidth={5} opacity=".5" />
      <rect x={-96} y={-20} width={192} height={170} rx={10} fill="none" stroke={KC.ink} strokeWidth={5} opacity=".5" />
      <circle cx={92} cy={-10} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Marcador "35 / 42".
function Marcador({ T, at, until, valor, x, y, color = ORO, tam = 150, sub = '' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = Math.round(typeof valor === 'function' ? valor(T) : valor);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{v}<span style={{ fontSize: tam * 0.55 }}> / 42</span></div>
    {sub && <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, background:'rgba(255,255,255,.85)', borderRadius:14, padding:'4px 16px', marginTop:8, display:'inline-block' }}>{sub}</div>}
  </div>;
}
// Sello en HTML.
function Sello({ T, at, until, texto, x, y, color = KC.leaf, tam = 44, rot = -8 }) {
  if (!kvisible(T, at, until)) return null;
  const p = kprog(T, at, at + 0.3, kEase.sale), o = 1 - kprog(T, until, until + 0.4);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, p)})`, opacity:Math.min(1, p * 2) * o,
    border:`8px solid ${color}`, color, borderRadius:20, padding:'10px 26px', font:`900 ${tam}px/1.1 ${KF.texto}`, background:'rgba(255,255,255,.9)', whiteSpace:'nowrap', textAlign:'center' }}>{texto}</div>;
}

// Puntos de concursantes: 630 = 30 × 21. Los 72 de oro van al final (abajo a la derecha) para que se lean como grupo.
function Concursantes({ T, x = 90, y = 560, paso = 30, apaga = 0, oro = 0, sube = 0, o = 1 }) {
  const out = [], N = 630, cols = 30;
  for (let i = 0; i < N; i++) {
    const c = i % cols, r = Math.floor(i / cols), esOro = i >= 558, esTop = i >= 604;
    const gris = !esOro && i < Math.round(558 * apaga);
    let fill = esOro && oro > 0 ? mixHex('#ffffff', ORO, oro) : gris ? '#b9b3a8' : '#ffffff';
    const dy = esTop ? -sube * 60 : 0;
    out.push(<circle key={i} cx={x + c * paso + paso / 2} cy={y + r * paso + paso / 2 + dy} r={paso * 0.36} fill={fill} stroke={KC.ink} strokeWidth={3} opacity={gris ? 0.55 : 1} />);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o }}>{out}</svg>;
}

function Olimpiada() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ex: CUES.Examen, Ge: CUES.Gemini, Op: CUES.OpenAI, P: CUES.Pregunta, H: CUES.Humanos, A: CUES.Antes, Mx: CUES.Mexico, S: CUES.Seis, Ma: CUES.Matiz, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sub = (i, d) => (window.SUBS && window.SUBS[i]) ? window.SUBS[i].at : d;
  const L3 = sub(3, K.Ge + 6.2);
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const tiemposGe = [0, 1, 2, 3, 4].map((i) => K.Ge + 0.8 + i * 0.6);
  const puntosGe = 7 * [0, 1, 2, 3, 4].filter((i) => T >= tiemposGe[i] + 0.2).length;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú contra la IA, luego 558 de 630 */}
      <Escena T={T} a={K.G} b={K.Ex}>
        <FondoLunares color={KC.yellow} />
        <div style={{ opacity: 1 - kprog(T, K.G + 4.4, K.G + 5.0) }}>
          {svg(<>
            <Pupitre x={280} y={880} s={1} T={T} quien="tu" />
            <Robotito x={790} y={760} s={0.85} T={T} cara="seguro" />
            <Pupitre x={790} y={880} s={1} T={T + 0.4} quien="ia" />
            <text x={540} y={900} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6}>VS</text>
          </>)}
        </div>
        <Concursantes T={T} o={kprog(T, K.G + 4.6, K.G + 5.2)} y={600} apaga={kprog(T, K.G + 6.4, K.G + 9.2, kEase.suave)} oro={kprog(T, K.G + 8.6, K.G + 9.4)} />
      </Escena>
      <Chip T={T} at={K.G + 0.2} until={K.G + 4.4} texto="TÚ" x={280} y={1230 - 80} tam={52} borde={KC.ink} />
      <Chip T={T} at={K.G + 0.4} until={K.G + 4.4} texto="IA" x={790} y={1150} tam={52} borde={KC.cyan} />
      <Chip T={T} at={K.G + 1.2} until={K.G + 4.4} texto="IMO 2025" x={270} y={470} tam={48} borde={KC.gold} />
      <NumeroGigante T={T} at={K.G + 5.2} until={K.Ex - 0.2} valor={558} dur={1.6} etiqueta="" x={420} y={430} tam={170} color={KC.white} />
      <Chip T={T} at={K.G + 5.6} until={K.Ex - 0.2} texto="de 630 concursantes" x={420} y={545} tam={34} borde={KC.ink} />

      {/* 2 · el examen */}
      <Escena T={T} a={K.Ex} b={K.Ge}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Australia x={70} y={430} s={0.82} T={T} pin={kprog(T, K.Ex + 0.6, K.Ex + 1.0, kEase.rebote)} />
          <SeisHojas T={T} x={120} y={1030} paso={168} s={0.85} estados={['', '', '', '', '', '']} tiempos={[0, 1, 2, 3, 4, 5].map((i) => K.Ex + 1.6 + i * 0.18)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ex + 0.9} until={K.Ge - 0.2} texto="Sunshine Coast, Australia · jul 2025" x={440} y={430} tam={32} borde={KC.red} />
      <Escena T={T} a={K.Ex + 3.0} b={K.Ge}>
        {svg(<>
          <g transform="translate(0 0)"><Reloj x={760} y={760} s={0.8} T={T} vueltas={0.6} texto="4 h 30" /></g>
          <Reloj x={960} y={760} s={0.8} T={T + 2} vueltas={0.6} texto="× 2" />
        </>)}
      </Escena>

      {/* 3 · Gemini Deep Think: cinco de seis */}
      <Escena T={T} a={K.Ge} b={K.Op}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Robotito x={270} y={600} s={0.9} T={T} cara={T > K.Ge + 4 ? 'feliz' : 'seguro'} color={KC.cyan} />
          <SeisHojas T={T} x={120} y={1040} paso={168} s={0.85} estados={['ok', 'ok', 'ok', 'ok', 'ok', 'vacia']} tiempos={[...tiemposGe, K.Ge + 4.2]} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ge + 0.3} until={K.Op - 0.2} texto="Gemini Deep Think · Google DeepMind" x={540} y={840} tam={32} borde={KC.cyan} />
      <Marcador T={T} at={K.Ge + 0.6} until={L3 - 0.1} valor={puntosGe} x={720} y={560} />
      <Chip T={T} at={K.Ge + 4.0} until={L3 - 0.1} texto="corte de oro 2025: 35" x={720} y={700} tam={32} borde={ORO} />
      <Sello T={T} at={L3 + 0.1} until={K.Op - 0.2} texto={<>CALIFICADO POR<br />LA OLIMPIADA ✔</>} x={700} y={560} tam={42} />

      {/* 4 · OpenAI: mismo puntaje, calificación no oficial */}
      <Escena T={T} a={K.Op} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Robotito x={540} y={590} s={0.8} T={T} cara="feliz" color={NARANJA_IA} />
          {[0, 1, 2].map((k) => <g key={k} opacity={kprog(T, K.Op + 1.6 + k * 0.25, K.Op + 1.9 + k * 0.25)}><Juez x={260 + k * 280} y={950} s={0.95} T={T} k={k} color={[KC.pink, KC.yellow, KC.cyan][k]} /></g>)}
        </>)}
      </Escena>
      <Chip T={T} at={K.Op + 0.3} until={K.P - 0.2} texto="IA experimental de OpenAI: 35 / 42" x={540} y={400 + 30} tam={34} borde={NARANJA_IA} />
      <Chip T={T} at={K.Op + 2.0} until={K.P - 0.2} texto="3 exmedallistas" x={540} y={1150} tam={36} borde={KC.ink} />
      <Sello T={T} at={K.Op + 3.2} until={K.P - 0.2} texto="NO OFICIAL" x={800} y={720} color="#6b6b6b" tam={46} rot={10} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 6 · los humanos: 72 oros, 26 por encima */}
      <Escena T={T} a={K.H} b={K.A}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        <Concursantes T={T} y={560} apaga={1} oro={kprog(T, K.H + 0.2, K.H + 0.8)} sube={kprog(T, K.H + 1.8, K.H + 2.6, kEase.sale)} />
        {svg(<g opacity={kprog(T, K.H + 1.6, K.H + 2.0)}>
          <line x1={80} y1={1135} x2={1000} y2={1135} stroke={ORO} strokeWidth={6} strokeDasharray="18 12" />
          <text x={995} y={1185} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={ORO}>nivel de las IA: 35</text>
        </g>)}
      </Escena>
      <NumeroGigante T={T} at={K.H + 0.2} until={K.H + 1.8} valor={72} dur={0.6} sufijo=" oros" x={540} y={420} tam={140} color={ORO} />
      <NumeroGigante T={T} at={K.H + 2.0} until={K.A - 0.2} valor={26} dur={0.6} sufijo=" > IA" x={540} y={420} tam={140} color={KC.mint} />

      {/* 7 · un año antes: nivel plata */}
      <Escena T={T} a={K.A} b={K.Mx}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Reloj x={250} y={1020} s={1.05} T={T} vueltas={3} texto="hasta 3 días" />
          <g opacity={kprog(T, K.A + 3.2, K.A + 3.7)}>
            <rect x={470} y={900} width={540} height={240} rx={18} fill="#10131a" stroke={KC.ink} strokeWidth={8} />
            {['theorem p :', '  ∀ n, … :=', 'by', '  intro n …'].map((l, i) => <text key={i} x={500} y={955 + i * 48} style={{ font:`700 34px ${KF.mono}` }} fill={i === 2 ? KC.pink : KC.mint} opacity={kprog(T, K.A + 3.5 + i * 0.25, K.A + 3.7 + i * 0.25)}>{l}</text>)}
          </g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.A + 0.2} until={K.Mx - 0.2} anio="2024" quien="AlphaProof + AlphaGeometry 2" revista="Google DeepMind · 28 / 42 · nivel plata" y={560} />
      <Chip T={T} at={K.A + 3.6} until={K.Mx - 0.2} texto="problemas traducidos a mano (Lean)" x={740} y={1190} tam={28} borde={KC.mint} />

      {/* 8 · México */}
      <Escena T={T} a={K.Mx} b={K.S}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(90deg, #0b8a4a 0 33.3%, #f4efe4 33.3% 66.6%, #ce1126 66.6% 100%)` }} />
        {svg(<>{[PLATA, PLATA, BRONCE, BRONCE, BRONCE, BRONCE].map((m, i) => <g key={i} opacity={kprog(T, K.Mx + 0.3 + i * 0.15, K.Mx + 0.6 + i * 0.15)}>
          <Estudiante x={180 + (i % 3) * 360} y={720 + Math.floor(i / 3) * 290} s={1.05} T={T} k={i} medalla={m} playera={i % 2 ? KC.leaf : '#ffffff'} /></g>)}</>)}
      </Escena>
      <Chip T={T} at={K.Mx + 0.2} until={K.S - 0.2} texto="México · IMO 2025" x={660} y={460} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.Mx + 1.4} until={K.S - 0.2} texto="2 platas · 4 bronces" x={540} y={1180} tam={40} borde={KC.ink} />

      {/* 9 · el problema seis */}
      <Escena T={T} a={K.S} b={K.Ma}>
        <FondoLunares color={KC.noche} punto="rgba(255,255,255,.06)" />
        {svg(<>
          <CuadriculaP6 x={250} y={470} s={0.9} T={T} p={kprog(T, K.S + 0.3, K.S + 2.4, kEase.suave)} />
          <Robotito x={240} y={1110} s={0.55} T={T} cara="duda" color={KC.cyan} />
          <Robotito x={840} y={1110} s={0.55} T={T + 1} cara="duda" color={NARANJA_IA} />
        </>)}
      </Escena>
      <Chip T={T} at={K.S + 0.2} until={K.Ma - 0.2} texto="2025 · problema 6" x={540} y={420} tam={38} borde={KC.red} />
      <Chip T={T} at={K.S + 1.0} until={K.Ma - 0.2} texto="IA: 0" x={540} y={1110} tam={40} borde={KC.red} />
      <NumeroGigante T={T} at={K.S + 2.8} until={K.Ma - 0.2} valor={6} dur={0.5} sufijo=" de 630" etiqueta="lo resolvieron completo:" x={540} y={760} tam={120} color={KC.mint} />

      {/* 10 · el matiz */}
      <Escena T={T} a={K.Ma} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <Puerta x={290} y={880} s={0.95} abre={kprog(T, K.Ma + 0.6, K.Ma + 1.4, kEase.sale)} color={KC.leaf} T={T}>
            <path d="M -40 -40 a 30 30 0 1 1 1 0 M -40 -10 L -40 110 M -40 70 L -10 70 M -40 100 L -16 100" stroke={ORO} strokeWidth={14} fill="none" strokeLinecap="round" />
          </Puerta>
          <Puerta x={790} y={880} s={0.95} abre={kprog(T, K.Ma + 2.2, K.Ma + 3.0, kEase.sale) * 0.6} color={KC.violet} dentro="#14162a" T={T}>
            {[0, 1, 2].map((k) => <text key={k} x={-60 + k * 60} y={20 + Math.sin(T * 3 + k) * 20} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.lilac}>?</text>)}
          </Puerta>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ma + 0.4} until={K.C - 0.2} texto="olimpiada: la solución existe" x={290} y={1140} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.Ma + 2.0} until={K.C - 0.2} texto="investigación: nadie la sabe" x={790} y={1140} tam={28} borde={KC.violet} />

      {/* 11 · cierre: los mismos pupitres; tú con el problema seis */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Pupitre x={280} y={880} s={1} T={T} quien="tu" etiqueta="P6" brillo={kprog(T, K.C + 2.2, K.C + 3.0)} />
          <Robotito x={790} y={760} s={0.85} T={T} cara="duda" />
          <Pupitre x={790} y={880} s={1} T={T + 0.4} quien="ia" escribe={false} etiqueta="P6" />
          <text x={540} y={900} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6}>VS</text>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.4} until={K.Ou} texto="2025: top 26 … o el problema 6" x={540} y={1150} tam={36} borde={ORO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ex - 0.1} texto="Tú contra la IA: *superó a 558 de 630.*" />
      <Subtitulo T={T} idx={1} at={K.Ex + 0.1} until={K.Ge - 0.1} texto="Australia, 2025: *6 problemas, 2 exámenes.*" />
      <Subtitulo T={T} idx={2} at={K.Ge + 0.1} until={L3 - 0.1} texto="Gemini Deep Think: *35 de 42.*" />
      <Subtitulo T={T} idx={3} at={L3} until={K.Op - 0.1} texto="La calificó *la propia olimpiada.*" />
      <Subtitulo T={T} idx={4} at={K.Op + 0.1} until={K.P - 0.1} texto="OpenAI: igual, pero *no oficial.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.05} until={K.H - 0.05} texto="¿Y *los humanos?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.A - 0.1} texto="72 oros; *26 superaron a las IA.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.Mx - 0.1} texto="2024: *nivel plata,* hasta 3 días." />
      <Subtitulo T={T} idx={8} at={K.Mx + 0.1} until={K.S - 0.1} texto="México: *2 platas y 4 bronces.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.Ma - 0.1} texto="Problema 6: *ninguna de las dos.*" />
      <Subtitulo T={T} idx={10} at={K.Ma + 0.1} until={K.C - 0.1} texto="Investigar *es otra cosa.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Top 26… *o el problema seis.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Examen + 0.8, CUES.Examen + 3.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [L3 + 0.1, CUES.OpenAI - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.OpenAI + 3.6, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Humanos + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Antes + 3.0, CUES.Mexico - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Mexico + 0.4, CUES.Seis - 0.15, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Seis + 2.6, CUES.Matiz - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Matiz + 0.3, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="47" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OlimpiadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Olimpiada /></CompositionStage></div>;
}
window.OlimpiadaApp = OlimpiadaApp;
