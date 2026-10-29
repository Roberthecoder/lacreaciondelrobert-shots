// Shot Ambiental #43 · Tu taco de res contra el de frijol (huella de carbono de la comida) — NARRADO (N2 el número + N4 barras que crecen).
// Datos: Our World in Data con datos de Poore y Nemecek (2018, Science), kg de CO2e por kg de alimento (promedio mundial, año del dato 2010).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const HC = { res: 99.48, choc: 46.65, cord: 39.72, queso: 23.88, cerdo: 12.31, pollo: 9.87, leg: 1.79 };
// Etapas de la res (ganado de carne), OWID "food-emissions-supply-chain": suman 99.48.
const HC_ETAPAS = [
  { k: 'suelo', v: 23.24, c: '#3fbf4a' }, { k: 'granja', v: 56.23, c: '#9a5a2a' }, { k: 'alimento', v: 2.68, c: '#d9a441' },
  { k: 'proceso', v: 1.81, c: '#7f8a99' }, { k: 'transporte', v: 0.49, c: '#ff2d78' }, { k: 'tienda', v: 0.23, c: '#7f8a99' },
  { k: 'empaque', v: 0.35, c: '#b8c4cf' }, { k: 'perdidas', v: 14.44, c: '#c9cfd6' }];

/* ---------- dibujitos ---------- */
// Nube de gases (CO2e). s = tamaño 0..1.5
function NubeGas({ x, y, s = 1, T = 0, o = 1, texto }) {
  if (s <= 0.01) return null;
  const b = 1 + 0.03 * Math.sin(T * 3 + x);
  return <g transform={`translate(${x} ${y}) scale(${s * b})`} opacity={o}>
    {[[-90, 10, 70], [-30, -40, 90], [50, -20, 80], [100, 25, 60], [0, 30, 80], [-60, 40, 55]].map(([a, c, r], i) =>
      <circle key={i} cx={a} cy={c} r={r} fill="#9aa3ad" stroke={KC.ink} strokeWidth={7 / s} />)}
    {[[-90, 10, 62], [-30, -40, 82], [50, -20, 72], [100, 25, 52], [0, 30, 72], [-60, 40, 47]].map(([a, c, r], i) =>
      <circle key={'b' + i} cx={a} cy={c} r={r} fill="#aeb6bf" />)}
    {texto && <text x={5} y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Taco: tortilla doblada (vista de frente) con relleno. tipo 'res' | 'frijol'.
function Taco({ x, y, s = 1, tipo = 'res', T = 0 }) {
  const r = krng(tipo === 'res' ? 7 : 11);
  const trozos = Array.from({ length: 9 }, () => ({ a: -110 + r() * 220, b: -40 + r() * 30, w: 34 + r() * 26, rot: r() * 60 - 30 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* relleno */}
    {tipo === 'res' ? <>
      {trozos.map((t, i) => <rect key={i} x={t.a - t.w / 2} y={t.b - 18} width={t.w} height={30} rx={9} fill={i % 2 ? '#7a3e1d' : '#8f4c25'} stroke={KC.ink} strokeWidth={5} transform={`rotate(${t.rot} ${t.a} ${t.b})`} />)}
      {Array.from({ length: 10 }, (_, i) => <circle key={'o' + i} cx={-120 + i * 26} cy={-55 + (i % 3) * 9} r={8} fill="#f6f3ec" stroke={KC.ink} strokeWidth={3} />)}
      {Array.from({ length: 8 }, (_, i) => <path key={'c' + i} d={`M ${-105 + i * 30} ${-62 + (i % 2) * 8} q 8 -14 16 0 q -8 8 -16 0`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={3} />)}
    </> : <>
      <path d="M -140 -20 Q -120 -70 -40 -62 Q 40 -78 120 -60 Q 150 -40 140 -10 Z" fill="#4a2a2e" stroke={KC.ink} strokeWidth={6} />
      {trozos.map((t, i) => <ellipse key={i} cx={t.a} cy={t.b - 14} rx={20} ry={12} fill="#6b2f2f" stroke={KC.ink} strokeWidth={4} transform={`rotate(${t.rot} ${t.a} ${t.b - 14})`} />)}
      {Array.from({ length: 7 }, (_, i) => <rect key={'q' + i} x={-110 + i * 34} y={-72 + (i % 2) * 6} width={18} height={12} rx={3} fill="#f6f3ec" stroke={KC.ink} strokeWidth={3} />)}
    </>}
    {/* tortilla (U) */}
    <path d="M -170 -30 Q -170 110 0 110 Q 170 110 170 -30 Q 120 40 0 40 Q -120 40 -170 -30 Z" fill="#f2d48a" stroke={KC.ink} strokeWidth={8} />
    {[[-90, 70], [-20, 88], [60, 80], [110, 50]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#c99a45" />)}
  </g>;
}
function Plato({ x, y, w = 980 }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={w / 2} ry={95} cy={18} fill="#8a4a24" stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={w / 2 - 40} ry={68} cy={8} fill="#c4733d" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-w / 2 + 90 + i * ((w - 180) / 8)} cy={62} r={7} fill="#f2d48a" />)}
  </g>;
}
// Íconos chicos de cada alimento (caja ~ 60 px).
function Icono({ tipo, x, y, s = 1 }) {
  const g = (c) => <g transform={`translate(${x} ${y}) scale(${s})`}>{c}</g>;
  switch (tipo) {
    case 'res': return g(<><path d="M -30 -18 Q 0 -32 28 -16 Q 40 6 22 22 Q -6 32 -28 18 Q -40 0 -30 -18 Z" fill="#b5462c" stroke={KC.ink} strokeWidth={5} /><path d="M -18 -8 Q 2 -2 14 12" stroke="#f6f3ec" strokeWidth={6} fill="none" /></>);
    case 'choc': return g(<><rect x={-30} y={-22} width={60} height={44} rx={5} fill="#5a2f1b" stroke={KC.ink} strokeWidth={5} />{[-10, 10].map((a) => <line key={a} x1={a} y1={-22} x2={a} y2={22} stroke="#3a1d10" strokeWidth={4} />)}<line x1={-30} y1={0} x2={30} y2={0} stroke="#3a1d10" strokeWidth={4} /></>);
    case 'cord': return g(<>{[[-14, -6], [4, -12], [18, 0], [0, 8], [-18, 8]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={14} fill="#f6f3ec" stroke={KC.ink} strokeWidth={4} />)}<ellipse cx={-30} cy={2} rx={11} ry={13} fill="#3a3330" stroke={KC.ink} strokeWidth={3} /><line x1={-6} y1={18} x2={-6} y2={30} stroke={KC.ink} strokeWidth={6} /><line x1={10} y1={18} x2={10} y2={30} stroke={KC.ink} strokeWidth={6} /></>);
    case 'queso': return g(<><path d="M -32 18 L -32 -6 L 30 -22 L 30 18 Z" fill="#ffd23f" stroke={KC.ink} strokeWidth={5} />{[[-14, 6], [10, -2], [14, 10]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill="#e0a800" />)}</>);
    case 'cerdo': return g(<><circle r={26} fill="#ffa6b8" stroke={KC.ink} strokeWidth={5} /><ellipse cy={6} rx={12} ry={9} fill="#ff8aa2" stroke={KC.ink} strokeWidth={3} /><circle cx={-4} cy={6} r={2.5} fill={KC.ink} /><circle cx={4} cy={6} r={2.5} fill={KC.ink} /><circle cx={-10} cy={-8} r={3} fill={KC.ink} /><circle cx={10} cy={-8} r={3} fill={KC.ink} /></>);
    case 'pollo': return g(<><path d="M -26 -14 Q -6 -32 16 -12 Q 24 6 8 14 L -2 14 Q -30 12 -26 -14 Z" fill="#d98a3a" stroke={KC.ink} strokeWidth={5} /><rect x={6} y={10} width={10} height={22} rx={4} fill="#f6f3ec" stroke={KC.ink} strokeWidth={4} transform="rotate(-30 11 20)" /></>);
    case 'leg': return g(<>{[[-14, 0, -20], [10, -8, 15], [8, 12, -10]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={15} ry={10} fill="#6b2f2f" stroke={KC.ink} strokeWidth={4} transform={`rotate(${r} ${a} ${b})`} />)}</>);
    case 'huevo': return g(<ellipse rx={20} ry={26} fill="#fff7e6" stroke={KC.ink} strokeWidth={5} />);
    default: return null;
  }
}
// Una fila de la escalera: ícono + nombre + barra que crece + valor.
const HC_PX = 6.9; // px por kg de CO2e (res 99.48 → 686 px)
function FilaBarra({ T, at, y, tipo, nombre, valor, color, resalta = 0, o = 1 }) {
  const p = kprog(T, at, at + 1.0, kEase.sale), w = Math.max(4, valor * HC_PX * p);
  if (T < at - 0.01) return null;
  const dentro = w > 220;
  return <g opacity={o * kprog(T, at, at + 0.2)}>
    {resalta > 0 && <rect x={70} y={y - 34} width={960} height={68} rx={18} fill={KC.white} opacity={0.55 * resalta} />}
    <Icono tipo={tipo} x={115} y={y} s={0.85} />
    <text x={160} y={y + 10} style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
    <rect x={330} y={y - 23} width={w} height={46} rx={10} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={dentro ? 330 + w - 16 : 330 + w + 14} y={y + 13} textAnchor={dentro ? 'end' : 'start'} style={{ font:`700 34px ${KF.mono}` }} fill={dentro ? KC.white : KC.ink}
      stroke={dentro ? KC.ink : 'none'} strokeWidth={dentro ? 5 : 0} paintOrder="stroke">{kformato(valor * p, 1)}</text>
  </g>;
}
// Casita de rancho con vaca, taquería, camioncito y barco.
function Rancho({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 L -70 -70 L 0 -120 L 70 -70 L 70 0 Z" fill="#d6402f" stroke={KC.ink} strokeWidth={7} />
    <rect x={-26} y={-60} width={52} height={60} fill="#f6f3ec" stroke={KC.ink} strokeWidth={5} />
    <line x1={-26} y1={-60} x2={26} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={26} y1={-60} x2={-26} y2={0} stroke={KC.ink} strokeWidth={4} />
    <text y={36} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>rancho</text>
  </g>;
}
function Taqueria({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-70} width={160} height={70} fill="#ffe11a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -95 -70 L -80 -110 L 80 -110 L 95 -70 Z" fill="#ff2d78" stroke={KC.ink} strokeWidth={6} />
    {[-60, -20, 20, 60].map((a) => <line key={a} x1={a} y1={-110} x2={a - 5} y2={-70} stroke="#fff" strokeWidth={8} />)}
    <text y={-24} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>TACOS</text>
    <text y={36} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>taquería</text>
  </g>;
}
function Vaca({ x, y, s = 1, T = 0, eructo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={80} ry={46} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -30 q 20 20 0 50 q -30 -10 -20 -40 Z" fill={KC.ink} /><path d="M 30 -40 q 30 10 20 40 q -30 0 -20 -40 Z" fill={KC.ink} />
    {[-55, -25, 30, 60].map((a) => <rect key={a} x={a - 8} y={34} width={16} height={44} rx={5} fill="#fff" stroke={KC.ink} strokeWidth={5} />)}
    <g transform="translate(-92 -30)"><ellipse rx={36} ry={30} fill="#fff" stroke={KC.ink} strokeWidth={6} /><ellipse cx={-14} cy={12} rx={22} ry={15} fill="#ffb3c1" stroke={KC.ink} strokeWidth={4} />
      <circle cx={2} cy={-8} r={5} fill={KC.ink} /><path d="M 10 -26 l 14 -16" stroke={KC.ink} strokeWidth={6} /></g>
    {eructo > 0 && <g transform={`translate(-150 ${-60 - eructo * 50}) scale(${0.3 + 0.5 * eructo})`} opacity={kclamp(eructo * 2, 0, 1)}>
      <circle r={60} fill="#cfd6dd" stroke={KC.ink} strokeWidth={6} /><text y={16} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>CH₄</text></g>}
  </g>;
}
function Tocon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 0 L -40 -60 L 40 -60 L 46 0 Z" fill="#a8693a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cy={-60} rx={40} ry={14} fill="#e2b27a" stroke={KC.ink} strokeWidth={5} /><ellipse cy={-60} rx={20} ry={6} fill="none" stroke="#a8693a" strokeWidth={3} />
    <g transform="translate(90 -20) rotate(80)"><rect x={-14} y={-120} width={28} height={120} fill="#a8693a" stroke={KC.ink} strokeWidth={5} /><circle cy={-140} r={50} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
function Camion({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-50} width={80} height={50} rx={6} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} />
    <path d="M 20 -36 L 46 -36 L 60 -14 L 60 0 L 20 0 Z" fill="#2346ff" stroke={KC.ink} strokeWidth={6} />
    {[-36, 40].map((a) => <circle key={a} cx={a} cy={4} r={13} fill="#3a3330" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Globo esquemático con puntitos de granjas que se van encendiendo (n = cuántos).
function GloboGranjas({ T, x, y, r = 230, n = 0 }) {
  const rng = krng(43), pts = [];
  while (pts.length < 160) { const a = rng() * 2 - 1, b = rng() * 2 - 1; if (a * a + b * b < 0.85) pts.push([a * r, b * r]); }
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f8fd8" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-0.7 * r} ${-0.4 * r} q 60 -80 150 -30 q 30 60 -30 100 q -50 70 -90 10 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.05 * r} ${-0.55 * r} q 90 -40 160 20 q 30 80 -40 90 q -20 90 -80 60 q -60 -60 -40 -170 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-0.45 * r} ${0.35 * r} q 50 -10 60 60 q -30 50 -60 0 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    {pts.slice(0, Math.round(n)).map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={2.5} />)}
  </g>;
}

function HuellaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Res, F: CUES.Frijol, E: CUES.Escalera, P: CUES.Pregunta, Tr: CUES.Transporte, Es: CUES.Estudio, Ch: CUES.Chocolate, I: CUES.Idea, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // escena de tacos (inicio y cierre). t0 = cuándo empiezan a salir las nubes.
  const tacos = (t0, txt) => {
    const g = kprog(T, t0 + 0.2, t0 + 2.4, kEase.sale), f = kprog(T, t0 + 0.6, t0 + 1.6, kEase.sale);
    return svg(<>
      <NubeGas x={300} y={880 - 300 * g} s={0.25 + 1.05 * g} T={T} texto={g > 0.6 ? txt : null} />
      <NubeGas x={790} y={900 - 40 * f} s={0.22 * f} T={T} />
      {txt && g > 0.6 && <text x={790} y={800} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, t0 + 2.4, t0 + 2.8)}>1.8 kg</text>}
      <Plato x={540} y={1150} />
      <Taco x={300} y={1080} s={0.95} tipo="res" T={T} />
      <Taco x={790} y={1080} s={0.95} tipo="frijol" T={T} />
    </>);
  };
  // escalera: posiciones A (5 filas) → B (7 filas, entra chocolate y cordero)
  const pB = kprog(T, K.Ch - 0.2, K.Ch + 0.8, kEase.suave);
  const ordA = { res: 0, queso: 1, cerdo: 2, pollo: 3, leg: 4 }, ordB = { res: 0, choc: 1, cord: 2, queso: 3, cerdo: 4, pollo: 5, leg: 6 };
  const fy = (k) => klerp(780 + (ordA[k] != null ? ordA[k] : 1) * 92, 760 + ordB[k] * 68, pB);
  const filas = (enChoc) => <>
    <FilaBarra T={T} at={enChoc ? -10 : K.R + 0.3} y={fy('res')} tipo="res" nombre="res" valor={HC.res} color="#d6402f" resalta={enChoc ? 0 : kprog(T, K.R + 0.3, K.R + 0.8) * (1 - kprog(T, K.F, K.F + 0.4))} />
    <FilaBarra T={T} at={enChoc ? -10 : K.F + 0.2} y={fy('leg')} tipo="leg" nombre="legumbres" valor={HC.leg} color="#6b2f2f" resalta={enChoc ? 0 : kprog(T, K.F + 0.2, K.F + 0.6) * (1 - kprog(T, K.E, K.E + 0.4))} />
    <FilaBarra T={T} at={enChoc ? -10 : K.E + 0.4} y={fy('queso')} tipo="queso" nombre="queso" valor={HC.queso} color="#ffd23f" />
    <FilaBarra T={T} at={enChoc ? -10 : K.E + 2.0} y={fy('cerdo')} tipo="cerdo" nombre="cerdo" valor={HC.cerdo} color="#ffa6b8" />
    <FilaBarra T={T} at={enChoc ? -10 : K.E + 3.4} y={fy('pollo')} tipo="pollo" nombre="pollo" valor={HC.pollo} color="#d98a3a" />
    {enChoc && <FilaBarra T={T} at={K.Ch + 0.5} y={fy('cord')} tipo="cord" nombre="cordero" valor={HC.cord} color="#e9e2d0" />}
    {enChoc && <FilaBarra T={T} at={K.Ch + 2.0} y={fy('choc')} tipo="choc" nombre="chocolate" valor={HC.choc} color="#5a2f1b" resalta={kprog(T, K.Ch + 2.0, K.Ch + 2.5)} />}
  </>;
  // barra de etapas de la res (Transporte)
  const etapas = () => {
    let x = 90; const px = 900 / HC.res, ap = kprog(T, K.Tr + 1.1, K.Tr + 1.9, kEase.sale);
    const brillaT = kprog(T, K.Tr + 1.9, K.Tr + 2.3), brillaG = kprog(T, K.Tr + 3.6, K.Tr + 4.0);
    return <g>
      <text x={90} y={905} style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink} opacity={ap}>1 kg de res = 99.5 kg CO₂e</text>
      {HC_ETAPAS.map((e, i) => { const w = e.v * px * ap, x0 = x; x += e.v * px;
        const op = e.k === 'transporte' ? 1 : (brillaT > 0 && brillaG < 1 ? 1 - 0.55 * brillaT : (e.k === 'suelo' || e.k === 'granja') ? 1 : 1 - 0.55 * brillaT);
        return ap <= 0 ? null : <rect key={i} x={90 + (x0 - 90) * ap} y={930} width={Math.max(e.k === 'transporte' ? 5 : 0, w)} height={110} fill={e.c} stroke={KC.ink} strokeWidth={e.k === 'transporte' ? 2 : 4} opacity={op} />; })}
      <rect x={90} y={930} width={900 * ap} height={110} fill="none" stroke={KC.ink} strokeWidth={7} rx={4} />
      {brillaT > 0 && <g opacity={brillaT}>
        <path d={`M ${90 + (23.24 + 56.23 + 2.68 + 1.81 + 0.25) * px} 1046 L ${90 + (23.24 + 56.23 + 2.68 + 1.81 + 0.25) * px} 1110`} stroke={KC.pink} strokeWidth={6} />
        <circle cx={90 + (23.24 + 56.23 + 2.68 + 1.81 + 0.25) * px} cy={985} r={30 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.pink} strokeWidth={6} />
        <text x={90 + (23.24 + 56.23 + 2.68 + 1.81 + 0.25) * px + 70} y={1150} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">transporte: 0.5 %</text>
      </g>}
      {brillaG > 0 && <g opacity={brillaG}>
        <text x={90 + 23.24 * px / 2} y={1000} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">suelo</text>
        <text x={90 + (23.24 + 56.23 / 2) * px} y={1000} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">granja (metano)</text>
      </g>}
    </g>;
  };
  // calendario de la semana (Idea)
  const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const cambio = kprog(T, K.I + 2.0, K.I + 3.2, kEase.suave) * 0.8; // menos de un día
  const incl = klerp(0, -9, kprog(T, K.I + 4.4, K.I + 5.6, kEase.rebote));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu taco contra el de tu amigo */}
      <Escena T={T} a={K.G} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {tacos(K.G - 0.2, null)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 2–4 · la escalera de barras: res, legumbres, queso, cerdo, pollo */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {svg(filas(false))}
      </Escena>
      {/* 5 · pregunta: ¿y si viene del rancho de al lado? */}
      <Escena T={T} a={K.P} b={K.Tr} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={250} y={760} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 640)`}>?</text>
          <Rancho x={130} y={1130} s={0.9} /><Taqueria x={400} y={1130} s={0.85} />
          <path d="M 200 1150 Q 260 1190 320 1150" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" fill="none" /></>)}
      </Escena>
      {/* 6 · transporte: casi nada; pesa la granja y el suelo */}
      <Escena T={T} a={K.Tr} b={K.Es}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <g opacity={1 - kprog(T, K.Tr + 3.2, K.Tr + 3.6)}>
            <Rancho x={140} y={700} s={0.8} /><Taqueria x={560} y={700} s={0.8} />
            <line x1={210} y1={720} x2={480} y2={720} stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" />
            <Camion x={klerp(230, 450, kprog(T, K.Tr + 0.2, K.Tr + 3.0, kEase.suave))} y={712} s={0.8} />
          </g>
          <g opacity={kprog(T, K.Tr + 3.4, K.Tr + 3.9)}>
            <Vaca x={260} y={700} s={0.95} T={T} eructo={kprog(T, K.Tr + 3.8, K.Tr + 5.0, kEase.sale)} />
            <Tocon x={540} y={770} s={0.9} />
          </g>
          {etapas()}</>)}
      </Escena>
      {/* 7 · el estudio: 38,700 granjas */}
      <Escena T={T} a={K.Es} b={K.Ch}>
        <FondoLunares color={KC.mint} />
        {svg(<GloboGranjas T={T} x={540} y={990} r={210} n={160 * kprog(T, K.Es + 2.0, K.Es + 5.5, kEase.suave)} />)}
      </Escena>
      {/* 8 · sorpresa: el chocolate amargo, segundo */}
      <Escena T={T} a={K.Ch} b={K.I} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{filas(true)}
          <g transform={`translate(250 560) rotate(${-8 + 3 * Math.sin(T * 2)})`} opacity={kprog(T, K.Ch + 1.6, K.Ch + 2.0)}>
            <rect x={-150} y={-80} width={300} height={160} rx={14} fill="#5a2f1b" stroke={KC.ink} strokeWidth={8} />
            {[-75, 0, 75].map((a) => <line key={a} x1={a} y1={-80} x2={a} y2={80} stroke="#3a1d10" strokeWidth={6} />)}
            <line x1={-150} y1={0} x2={150} y2={0} stroke="#3a1d10" strokeWidth={6} />
            <path d="M 60 -80 L 150 -80 L 150 20 Z" fill="#c9cfd6" stroke={KC.ink} strokeWidth={6} />
          </g></>)}
      </Escena>
      {/* 9 · la idea útil: menos de un día a la semana */}
      <Escena T={T} a={K.I} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {dias.map((d, i) => { const x = 90 + i * 132; const sw = i === 6 ? cambio : 0;
            return <g key={i} opacity={kprog(T, K.I + 0.1 + i * 0.12, K.I + 0.4 + i * 0.12)}>
              <rect x={x} y={740} width={116} height={150} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <rect x={x} y={740} width={116} height={40} rx={12} fill="#d6402f" stroke={KC.ink} strokeWidth={6} />
              <text x={x + 58} y={772} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill="#fff">{d}</text>
              <Icono tipo="res" x={x + 58} y={840} s={1.1} />
              {sw > 0 && <><rect x={x + 3} y={783} width={110 * sw} height={104} fill="#c7f5d9" /><g opacity={kclamp(sw * 2, 0, 1)}><Icono tipo="leg" x={x + 40} y={826} s={0.8} /><Icono tipo="huevo" x={x + 74} y={856} s={0.7} /></g></>}
            </g>; })}
          <g opacity={kprog(T, K.I + 3.8, K.I + 4.3)}>
            <g transform={`translate(540 1000) rotate(${incl})`}>
              <rect x={-380} y={-10} width={760} height={20} rx={10} fill="#7f8a99" stroke={KC.ink} strokeWidth={5} />
              <g transform={`translate(-330 0) rotate(${-incl})`}><line y1={0} y2={70} stroke={KC.ink} strokeWidth={5} /><path d="M -110 70 L 110 70 Q 100 120 0 120 Q -100 120 -110 70 Z" fill="#f2d48a" stroke={KC.ink} strokeWidth={6} />
                <Icono tipo="leg" x={-30} y={52} s={1.2} /><Icono tipo="huevo" x={40} y={46} s={1.0} /><text y={160} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>cambiar</text></g>
              <g transform={`translate(330 0) rotate(${-incl})`}><line y1={0} y2={70} stroke={KC.ink} strokeWidth={5} /><path d="M -110 70 L 110 70 Q 100 120 0 120 Q -100 120 -110 70 Z" fill="#f2d48a" stroke={KC.ink} strokeWidth={6} />
                <Camion x={0} y={60} s={0.9} /><text y={160} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>todo local</text></g>
            </g>
            <path d="M 540 1000 L 490 1190 L 590 1190 Z" fill="#7f8a99" stroke={KC.ink} strokeWidth={6} />
          </g></>)}
      </Escena>
      {/* 10 · cierre: regreso a los dos tacos */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {tacos(K.C - 0.6, '99.5 kg')}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1680} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.15} until={K.R - 0.2} valor={55} dur={1.4} prefijo="×" etiqueta="kilo por kilo" x={300} y={470} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.G + 0.6} until={K.R - 0.2} texto="TÚ · bistec" x={300} y={1440} tam={34} borde={KC.red} />
      <Chip T={T} at={K.G + 1.0} until={K.R - 0.2} texto="TU AMIGO · frijol" x={790} y={1440} tam={34} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.R + 0.4} until={K.F - 0.15} valor={99.5} dec={1} dur={1.0} sufijo=" kg" etiqueta="1 kg de res (promedio):" x={330} y={520} tam={150} color={KC.red} />
      <NumeroGigante T={T} at={K.F + 0.2} until={K.E - 0.15} valor={1.8} dec={1} dur={0.8} sufijo=" kg" etiqueta="1 kg de legumbres secas:" x={330} y={520} tam={150} color={KC.mint} />
      <Chip T={T} at={K.R + 0.6} until={K.P - 0.2} texto="kg de CO₂e por kilo · promedio mundial" x={540} y={1440} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.4} until={K.P - 0.2} texto="queso · cerdo · pollo" x={330} y={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.P + 0.3} until={K.Tr - 0.2} texto="¿y si viene de al lado?" x={540} y={1440} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Tr + 1.9} until={K.Es - 0.2} texto="casi da igual de dónde viene" x={540} y={1440} tam={32} borde={KC.pink} />
      <Etq T={T} at={K.Tr + 4.0} until={K.Es - 0.2} x={150} y={560} texto="metano" tam={30} color={KC.ink} lado="der" />
      <Etq T={T} at={K.Tr + 4.6} until={K.Es - 0.2} x={340} y={830} texto="tierra desmontada" tam={24} color={KC.ink} lado="der" />
      <TarjetaEstudio T={T} at={K.Es + 0.3} until={K.Ch - 0.2} anio="2018" quien="Poore y Nemecek" revista="Science · Oxford y Suiza" x={330} y={560} />
      {T < K.Ch - 0.2 && <Contador T={T} at={K.Es + 2.0} desde={0} hasta={38700} dur={3.5} sufijo=" granjas" x={540} y={1450} tam={64} color={KC.texto} />}
      <Chip T={T} at={K.Ch + 2.4} until={K.I - 0.2} texto="en el promedio: segundo lugar" x={540} y={1440} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ch + 3.8} until={K.I - 0.2} x={100} y={700} texto="selva talada para cacao" tam={28} color={KC.ink} lado="der" />
      <Chip T={T} at={K.I + 0.4} until={K.C - 0.2} texto="carne roja y lácteos → pollo, huevo o vegetal" x={540} y={690} tam={30} borde={KC.red} />
      <Etq T={T} at={K.I + 3.2} until={K.C - 0.2} x={918} y={930} texto="menos de 1 día" tam={26} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.I + 5.4} until={K.C - 0.2} texto="Weber y Matthews · 2008 · EE. UU." x={540} y={1440} tam={28} borde={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.3} tacharEn={K.C + 1.6} until={K.Ou - 0.1} texto="¿de dónde viene?" x={540} y={1440} tam={40} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="¿de qué es?" x={540} y={1570} tam={46} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="*Más de 50 veces* más." />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.F - 0.1} texto="1 kg de res: *casi 100 kg.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.E - 0.1} texto="Legumbres: *menos de 2.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.P - 0.1} texto="Queso, cerdo *y pollo.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Tr - 0.1} texto="¿Y si es *de al lado?*" />
      <Subtitulo T={T} idx={5} at={K.Tr + 0.1} until={K.Es - 0.1} texto="Transporte: *0.5 %.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Ch - 0.1} texto="2018: *38,700 granjas.*" />
      <Subtitulo T={T} idx={7} at={K.Ch + 0.1} until={K.I - 0.1} texto="Chocolate: *segundo.*" />
      <Subtitulo T={T} idx={8} at={K.I + 0.1} until={K.C - 0.1} texto="Cambia *menos de 1 día.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="No de dónde: *de qué es.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Res + 2.2, CUES.Frijol - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Escalera + 1.6, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Transporte + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Transporte + 3.5, CUES.Estudio - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Chocolate - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Chocolate + 2.1, CUES.Idea - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Idea + 3.8, CUES.Cierre - 0.4, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="43" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuellaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HuellaShot /></CompositionStage></div>;
}
window.HuellaApp = HuellaApp;
