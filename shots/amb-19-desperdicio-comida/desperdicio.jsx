// Shot Ambiental #19 · Casi una quinta parte de la comida del mundo se va a la basura — NARRADO (N4 la imagen que se llena + N2).
// Datos: UNEP, Food Waste Index Report 2024 (datos de 2022) e IPCC 2019 (SRCCL). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (el refri es una metáfora de toda la comida que llega a tiendas, restaurantes y casas).

// ---------- piezas de este shot ----------
// Un alimento caricatura. tipo: manzana, platano, tortillas, leche, zanahoria, pan, jitomate, sobras, lechuga, cascara, hueso, huevo.
function Comida({ tipo, x, y, s = 1, rot = 0, o = 1 }) {
  const I = KC.ink, w = 5;
  let c = null;
  if (tipo === 'manzana') c = <><circle r={30} fill="#e8323a" stroke={I} strokeWidth={w} /><path d="M 0 -28 q 2 -14 8 -20" stroke={I} strokeWidth={5} fill="none" /><path d="M 6 -40 q 18 -10 26 4 q -16 8 -26 -4 Z" fill={KC.leaf} stroke={I} strokeWidth={3} /><circle cx={-10} cy={-10} r={7} fill="#fff" opacity=".45" /></>;
  else if (tipo === 'platano') c = <><path d="M -42 -8 Q -10 34 40 -16 Q 44 -24 36 -24 Q -4 12 -36 -18 Z" fill={KC.yellow} stroke={I} strokeWidth={w} strokeLinejoin="round" /><path d="M 36 -24 l 8 -8" stroke={I} strokeWidth={6} strokeLinecap="round" /></>;
  else if (tipo === 'tortillas') c = <>{[14, 4, -6].map((dy, i) => <ellipse key={i} cy={dy} rx={40} ry={12} fill="#f3d58c" stroke={I} strokeWidth={4} />)}<circle cx={-12} cy={-8} r={3} fill="#b9893a" /><circle cx={14} cy={-5} r={3} fill="#b9893a" /></>;
  else if (tipo === 'leche') c = <><rect x={-22} y={-30} width={44} height={60} fill="#fff" stroke={I} strokeWidth={w} /><path d="M -22 -30 L -14 -48 L 14 -48 L 22 -30 Z" fill="#dfe8f5" stroke={I} strokeWidth={4} strokeLinejoin="round" /><rect x={-22} y={-6} width={44} height={16} fill={KC.blue} /></>;
  else if (tipo === 'zanahoria') c = <><path d="M -10 -24 L 10 -24 L 2 34 Z" fill={KC.orange} stroke={I} strokeWidth={w} strokeLinejoin="round" /><path d="M -8 -24 l -10 -18 M 0 -24 l 0 -22 M 8 -24 l 10 -18" stroke={KC.leaf} strokeWidth={6} strokeLinecap="round" /><path d="M -6 -6 h 8 M -2 10 h 6" stroke={I} strokeWidth={3} /></>;
  else if (tipo === 'pan') c = <><path d="M -42 14 Q -46 -24 0 -26 Q 46 -24 42 14 Z" fill="#d9954a" stroke={I} strokeWidth={w} strokeLinejoin="round" /><path d="M -18 -14 l 8 12 M 0 -16 l 8 12 M 18 -14 l 8 12" stroke="#8a5420" strokeWidth={4} strokeLinecap="round" /></>;
  else if (tipo === 'jitomate') c = <><circle r={26} fill="#ff4a3a" stroke={I} strokeWidth={w} /><path d="M -12 -22 L 0 -16 L 12 -22 L 6 -12 L -6 -12 Z" fill={KC.leaf} stroke={I} strokeWidth={3} strokeLinejoin="round" /></>;
  else if (tipo === 'sobras') c = <><rect x={-38} y={-24} width={76} height={48} rx={10} fill="rgba(255,255,255,.75)" stroke={I} strokeWidth={w} /><rect x={-32} y={-6} width={64} height={24} rx={6} fill="#e98a3a" /><circle cx={-12} cy={2} r={6} fill="#c25a1d" /><circle cx={12} cy={6} r={5} fill="#7cc46a" /><rect x={-42} y={-30} width={84} height={10} rx={4} fill="#7fd4ff" stroke={I} strokeWidth={4} /></>;
  else if (tipo === 'lechuga') c = <><circle r={30} fill="#7cd36a" stroke={I} strokeWidth={w} /><path d="M -16 -10 q 16 10 32 0 M -18 6 q 18 10 36 0 M 0 -26 v 50" stroke="#3f9a3a" strokeWidth={4} fill="none" /></>;
  else if (tipo === 'cascara') c = <><path d="M 0 10 Q -40 0 -46 -30 Q -26 -10 -6 -6 Q -8 -40 0 -46 Q 8 -40 6 -6 Q 26 -10 46 -30 Q 40 0 0 10 Z" fill={KC.yellow} stroke={I} strokeWidth={w} strokeLinejoin="round" /><circle cx={-30} cy={-12} r={4} fill="#6b4a1a" /><circle cx={24} cy={-8} r={4} fill="#6b4a1a" /><rect x={-6} y={8} width={12} height={16} rx={4} fill="#a0782a" stroke={I} strokeWidth={3} /></>;
  else if (tipo === 'hueso') c = <><rect x={-34} y={-9} width={68} height={18} rx={9} fill="#fbf4e2" stroke={I} strokeWidth={w} /><circle cx={-38} cy={-10} r={12} fill="#fbf4e2" stroke={I} strokeWidth={w} /><circle cx={-38} cy={10} r={12} fill="#fbf4e2" stroke={I} strokeWidth={w} /><circle cx={38} cy={-10} r={12} fill="#fbf4e2" stroke={I} strokeWidth={w} /><circle cx={38} cy={10} r={12} fill="#fbf4e2" stroke={I} strokeWidth={w} /><rect x={-30} y={-6} width={60} height={12} fill="#fbf4e2" /></>;
  else if (tipo === 'huevo') c = <><path d="M -30 0 Q -30 34 0 34 Q 30 34 30 0 L 20 -10 L 10 2 L 0 -12 L -10 2 L -20 -10 Z" fill="#f6e7cf" stroke={I} strokeWidth={w} strokeLinejoin="round" /></>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>{c}</g>;
}
// Repisas del refri: 5 filas (la última es "la quinta parte").
const RF_REPISAS = [
  ['leche', 'leche', 'jitomate', 'manzana'],
  ['tortillas', 'pan', 'platano', 'manzana'],
  ['zanahoria', 'lechuga', 'jitomate', 'zanahoria'],
  ['sobras', 'pan', 'sobras', 'jitomate'],
  ['platano', 'manzana', 'pan', 'lechuga'],
];
const RF_W = 440, RF_H = 800, RF_FILA = 140;
// posición (en px de pantalla) de un alimento del refri
function rfPos(x, y, s, fila, j) { return [x + s * (70 + j * 100), y + s * (90 + fila * RF_FILA + 62)]; }
// Refri caricatura. abre 0..1 (puerta), caida(j) → 0..1 para los de la quinta repisa (van al bote en bx, by), vacia = la quinta repisa se tiñe.
function Refri({ T, x, y, s = 1, abre = 1, caida = () => 0, bx = 0, by = 0, marca = 0, quedan = 0 }) {
  const I = KC.ink;
  const items = [];
  RF_REPISAS.forEach((fila, f) => fila.forEach((tipo, j) => {
    const [px, py] = rfPos(x, y, s, f, j);
    if (f === 4) {
      if (j === 3 && quedan) { items.push(<Comida key={f + '-' + j} tipo={tipo} x={px} y={py} s={s * 0.9} rot={-10} />); return; }
      const u = caida(j);
      const qx = klerp(px, bx, u), qy = klerp(py, by, u) - Math.sin(u * Math.PI) * 160 * s;
      items.push(<Comida key={f + '-' + j} tipo={tipo} x={qx} y={qy} s={s * klerp(1, 0.75, u)} rot={u * 300} o={u > 0.97 ? 0 : 1} />);
    } else items.push(<Comida key={f + '-' + j} tipo={tipo} x={px} y={py} s={s} rot={Math.sin(T * 1.5 + f + j) * 3} />);
  }));
  const pw = RF_W * s * klerp(1, 0.12, abre);
  return <g>
    <rect x={x + 10 * s} y={y + RF_H * s} width={40 * s} height={24 * s} fill={I} /><rect x={x + (RF_W - 50) * s} y={y + RF_H * s} width={40 * s} height={24 * s} fill={I} />
    <rect x={x} y={y} width={RF_W * s} height={RF_H * s} rx={40 * s} fill="#eaf6ff" stroke={I} strokeWidth={9} />
    <rect x={x + 20 * s} y={y + 30 * s} width={(RF_W - 40) * s} height={(RF_H - 60) * s} rx={24 * s} fill="#fdfdf6" stroke={I} strokeWidth={5} />
    <rect x={x + 20 * s} y={y + (90 + 4 * RF_FILA - 30) * s} width={(RF_W - 40) * s} height={RF_FILA * s} fill={KC.red} opacity={0.22 * marca} />
    {[0, 1, 2, 3, 4].map((f) => <rect key={f} x={x + 22 * s} y={y + (90 + f * RF_FILA + 100) * s} width={(RF_W - 44) * s} height={10 * s} fill="#bfe3f5" stroke={I} strokeWidth={4} />)}
    {items}
    {marca > 0 && <g opacity={marca}><path d={`M ${x + (RF_W + 14) * s} ${y + (90 + 4 * RF_FILA - 26) * s} h ${20 * s} v ${RF_FILA * s} h ${-20 * s}`} stroke={KC.red} strokeWidth={8} fill="none" strokeLinejoin="round" /></g>}
    {/* puerta (bisagra a la izquierda) */}
    <rect x={x} y={y} width={pw} height={RF_H * s} rx={Math.min(40 * s, pw / 2)} fill="#d7ecfa" stroke={I} strokeWidth={9} />
    {abre < 0.6 && <rect x={x + pw - 46 * s} y={y + 260 * s} width={16 * s} height={180 * s} rx={8 * s} fill="#9aa6b2" stroke={I} strokeWidth={4} />}
  </g>;
}
// Bote de basura (tapa, cuerpo con rayas). lleno 0..1 asoma comida por arriba.
function Bote({ x, y, s = 1, lleno = 0, tapa = 0, rot = 0 }) {
  const I = KC.ink;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {lleno > 0 && <g>{['platano', 'pan', 'manzana', 'lechuga'].map((t, i) => <Comida key={i} tipo={t} x={-54 + i * 36} y={-148 - lleno * 20 + (i % 2) * 10} s={0.8} rot={i * 40} o={kclamp(lleno * 4 - i, 0, 1)} />)}</g>}
    <path d="M -90 -150 L 90 -150 L 72 0 L -72 0 Z" fill="#8f9aa6" stroke={I} strokeWidth={8} strokeLinejoin="round" />
    {[-40, 0, 40].map((d) => <line key={d} x1={d * 1.1} y1={-130} x2={d * 0.9} y2={-20} stroke="#5f6a75" strokeWidth={8} strokeLinecap="round" />)}
    <g transform={`rotate(${-tapa * 35} -100 -158)`}><rect x={-104} y={-176} width={208} height={26} rx={12} fill="#a9b4bf" stroke={I} strokeWidth={7} /><rect x={-24} y={-192} width={48} height={18} rx={8} fill="#a9b4bf" stroke={I} strokeWidth={6} /></g>
  </g>;
}
// Bolsa de basura negra amarrada.
function Bolsa({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -50 40 Q -62 -10 -26 -34 L -12 -46 L 12 -46 L 26 -34 Q 62 -10 50 40 Q 0 54 -50 40 Z" fill="#2c3138" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -12 -46 l -14 -16 M 12 -46 l 14 -16" stroke="#2c3138" strokeWidth={8} strokeLinecap="round" />
    <path d="M -28 -10 q -6 20 4 36" stroke="#5d6672" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Báscula de piso con carátula: valor en kg (aguja), máximo 120.
function Bascula({ x, y, s = 1, kg = 0 }) {
  const a = -120 + 240 * kclamp(kg / 120, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-40} width={460} height={60} rx={20} fill="#e9eef5" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-60} width={500} height={30} rx={12} fill="#c9d3dd" stroke={KC.ink} strokeWidth={7} />
    <g transform="translate(0 110)">
      <rect x={-50} y={-90} width={100} height={60} fill="#c9d3dd" stroke={KC.ink} strokeWidth={6} />
      <circle r={110} fill="#fff" stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 13 }, (_, i) => { const b = (-120 + i * 20) * Math.PI / 180; return <line key={i} x1={Math.sin(b) * 84} y1={-Math.cos(b) * 84} x2={Math.sin(b) * 100} y2={-Math.cos(b) * 100} stroke={KC.ink} strokeWidth={i % 3 === 0 ? 6 : 3} />; })}
      <line x1={0} y1={0} x2={0} y2={-80} stroke={KC.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${a})`} />
      <circle r={12} fill={KC.ink} />
    </g>
  </g>;
}
// Montaña de comida tirada (crece con k 0..1).
function Montana({ T, k = 1, y = 1200 }) {
  const r = krng(7), cosas = ['platano', 'pan', 'manzana', 'lechuga', 'tortillas', 'jitomate', 'sobras', 'zanahoria', 'cascara', 'hueso', 'huevo', 'leche'];
  const pts = Array.from({ length: 46 }, (_, i) => ({ u: r(), v: r(), t: cosas[i % cosas.length], rot: r() * 360 }));
  const h = 520 * k;
  return <g>
    <path d={`M 0 ${y} Q 270 ${y - h * 0.9} 540 ${y - h} Q 810 ${y - h * 0.9} 1080 ${y} Z`} fill="#8a6a4a" stroke={KC.ink} strokeWidth={8} />
    {pts.map((p, i) => { const px = 60 + p.u * 960, top = y - h * (1 - Math.pow((px - 540) / 560, 2)); const py = y - (y - top) * (0.15 + p.v * 0.8);
      return k > 0.05 ? <Comida key={i} tipo={p.t} x={px} y={py} s={0.75 * kclamp(k * 1.3, 0, 1)} rot={p.rot} /> : null; })}
    {k > 0.3 && [0, 1, 2].map((i) => <path key={i} d={`M ${400 + i * 120} ${y - h - 20} q -14 -30 0 -60 q 14 -30 0 -60`} stroke="rgba(90,110,60,.55)" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(T * 3 + i)} />)}
  </g>;
}
// Globo terráqueo esquemático con n puntos (países con datos) que se encienden con p 0..1.
function Globo({ T, x, y, r = 210, n = 93, p = 1 }) {
  const rg = krng(31), pts = [];
  while (pts.length < n) { const a = rg() * 2 - 1, b = rg() * 2 - 1; if (a * a + b * b < 0.82) pts.push([a, b]); }
  return <g transform={`translate(${x} ${y}) rotate(${T * 3})`}>
    <circle r={r} fill="#3aa0ff" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.7} ${-r * 0.4} q ${r * 0.3} ${-r * 0.3} ${r * 0.6} ${-r * 0.1} q ${r * 0.1} ${r * 0.4} ${-r * 0.2} ${r * 0.6} q ${-r * 0.4} ${r * 0.1} ${-r * 0.4} ${-r * 0.5} Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r * 0.1} ${-r * 0.6} q ${r * 0.5} 0 ${r * 0.6} ${r * 0.4} q ${-r * 0.1} ${r * 0.7} ${-r * 0.4} ${r * 0.9} q ${-r * 0.3} ${-r * 0.5} ${-r * 0.2} ${-r * 1.3} Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <ellipse rx={r} ry={r * 0.35} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth={3} /><ellipse rx={r * 0.4} ry={r} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth={3} />
    {pts.map(([a, b], i) => i / n < p ? <circle key={i} cx={a * r} cy={b * r} r={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} /> : null)}
  </g>;
}
// Nubecita de gas que sube.
function Nube({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M -50 20 Q -70 -10 -38 -22 Q -30 -54 4 -46 Q 30 -66 50 -36 Q 80 -26 62 8 Q 60 30 30 26 L -30 28 Q -54 34 -50 20 Z" fill="#b9b3c4" stroke={KC.ink} strokeWidth={5} /></g>;
}
// Dona: arco de 0 a f (fracción), radio r.
function Dona({ x, y, r = 200, f = 0.09, f2 = 0.1 }) {
  const arco = (a0, a1, col, ancho) => { const p = (a) => [x + Math.sin(a * 2 * Math.PI) * r, y - Math.cos(a * 2 * Math.PI) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1); return <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1}`} stroke={col} strokeWidth={ancho} fill="none" />; };
  return <g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={KC.ink} strokeWidth={84} />
    <circle cx={x} cy={y} r={r} fill="none" stroke="#e9eef5" strokeWidth={70} />
    {f2 > 0.001 && arco(0, f2, '#ffb3a6', 70)}
    {f > 0.001 && arco(0, f, KC.red, 70)}
  </g>;
}

// ---------- el shot ----------
function DesperdicioShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, To: CUES.Toneladas, Ca: CUES.Cascaras, P: CUES.Pregunta, Cs: CUES.Casa, Ki: CUES.Kilos, Mx: CUES.Mexico, E: CUES.Estudio, Ri: CUES.Ricos, Ga: CUES.Gases, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // refri del gancho y del cierre (misma imagen, transformada)
  const RX = 80, RY = 400, RS = 0.95, BX = 660, BY = 1180;
  const caidaG = (j) => kprog(T, K.G + 3.6 + j * 0.25, K.G + 4.4 + j * 0.25, kEase.suave);
  const llenoG = kprog(T, K.G + 4.2, K.G + 5.4);
  // cierre: la puerta se cierra al final
  const abreC = 1 - kprog(T, K.C + 3.6, K.C + 4.6, kEase.suave);
  // barra de 10 kilos (Casa)
  const kilo = (i) => kprog(T, K.Cs + 0.5 + i * 0.14, K.Cs + 0.75 + i * 0.14, kEase.sale);
  const colK = (i) => (i < 6 ? KC.orange : i < 9 ? KC.cyan : KC.yellow);
  const barras = [['ingreso alto', 81], ['medio-alto', 88], ['medio-bajo', 86]];
  const g9 = kprog(T, K.Ga + 0.8, K.Ga + 2.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el refri del mundo; la quinta repisa cae al bote */}
      <Escena T={T} a={K.G} b={K.To}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Bote x={BX} y={BY} s={0.9} lleno={llenoG} tapa={kprog(T, K.G + 3.3, K.G + 3.7, kEase.sale) * (1 - kprog(T, K.G + 5.6, K.G + 6.0))} />
          <Refri T={T} x={RX} y={RY} s={RS} abre={kprog(T, K.G + 0.05, K.G + 0.6, kEase.sale)} caida={caidaG} bx={BX} by={BY - 150} marca={kprog(T, K.G + 2.6, K.G + 3.2)} quedan={1} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · 1,050 millones de toneladas (2022) */}
      <Escena T={T} a={K.To} b={K.Ca}>
        <FondoLunares color={KC.orange} />
        {svg(<Montana T={T} k={kprog(T, K.To + 0.1, K.To + 1.6, kEase.sale)} y={1210} />)}
      </Escena>
      {/* 3 · incluye cáscaras y huesos */}
      <Escena T={T} a={K.Ca} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Montana T={T} k={1} y={1210} />)}
      </Escena>
      <Lupa T={T} at={K.Ca + 0.2} until={K.P - 0.25} x={360} y={640} r={210} fx={540} fy={1000} tinte={KC.yellow} etiqueta="AUMENTADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#8a6a4a" />
          <Comida tipo="cascara" x={r * 0.62} y={r * 0.62} s={1.6} rot={-15} /><Comida tipo="hueso" x={r * 1.35} y={r * 0.7} s={1.4} rot={25} />
          <Comida tipo="huevo" x={r * 0.6} y={r * 1.35} s={1.4} rot={10} /><Comida tipo="pan" x={r * 1.4} y={r * 1.4} s={1.4} rot={-10} /><Comida tipo="manzana" x={r * 1.0} y={r * 1.05} s={1.2} /></svg>} />
      {/* 4 · ¿quién tira más? */}
      <Escena T={T} a={K.P} b={K.Cs} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{['súper', 'restaurante', 'casa'].map((n, i) => { const e = kprog(T, K.P + 0.2 + i * 0.3, K.P + 0.6 + i * 0.3, kEase.rebote);
            return <g key={n} transform={`translate(${220 + i * 320} ${430}) scale(${0.6 * e})`}><Bote x={0} y={0} s={1} /><text y={70} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink}>{n}</text></g>; })}
          <text x={280} y={1150} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 980)`}>?</text></>)}
      </Escena>
      {/* 5 · seis de cada diez kilos, en casa */}
      <Escena T={T} a={K.Cs} b={K.Ki}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 10 }, (_, i) => { const e = kilo(i); return <g key={i} transform={`translate(${135 + i * 90} 820) scale(${e})`}>
            <rect x={-40} y={-90} width={80} height={130} rx={12} fill={colK(i)} stroke={KC.ink} strokeWidth={6} /><text y={-6} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>1 kg</text></g>; })}
          <g opacity={kprog(T, K.Cs + 1.4, K.Cs + 1.8)}>
            <path d="M 95 640 h 530" stroke={KC.ink} strokeWidth={6} /><path d="M 280 600 L 360 530 L 440 600 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" /><rect x={300} y={600} width={120} height={80} fill="#fff" stroke={KC.ink} strokeWidth={6} /><rect x={345} y={630} width={30} height={50} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
          </g></>)}
      </Escena>
      {/* 6 · 79 kg por persona al año, en casa */}
      <Escena T={T} a={K.Ki} b={K.Mx}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{Array.from({ length: 7 }, (_, i) => { const e = kprog(T, K.Ki + 0.3 + i * 0.25, K.Ki + 0.6 + i * 0.25, kEase.rebote);
            const pos = [[400, 840], [520, 840], [640, 840], [460, 760], [580, 760], [520, 690], [700, 850]][i]; return <Bolsa key={i} x={pos[0]} y={pos[1] + (1 - e) * -200} s={1.0} rot={(i % 3 - 1) * 10} o={e} />; })}
          <Bascula x={540} y={960} s={1} kg={79 * kprog(T, K.Ki + 0.3, K.Ki + 2.4, kEase.suave)} /></>)}
      </Escena>
      {/* 7 · México: 105 kg por persona, en casa (estimación) */}
      <Escena T={T} a={K.Mx} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={40} y={560} ancho={640} color="#ffe9a8" conCA={false}>
          {(() => { const [px, py] = mxProy(-99.1, 19.4); const k = kprog(T, K.Mx + 0.3, K.Mx + 1.0, kEase.rebote); return <g transform={`translate(${px} ${py}) scale(${k * 1.4})`}><Bolsa x={0} y={-40} s={1} /></g>; })()}
        </MapaMexico>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · el estudio: PNUMA 2024, hogares de 93 países */}
      <Escena T={T} a={K.E} b={K.Ri}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Globo T={T} x={620} y={520} r={190} p={kprog(T, K.E + 3.0, K.E + 5.6)} />)}
      </Escena>
      {/* 9 · no es cosa de países ricos: 81 · 88 · 86 kg */}
      <Escena T={T} a={K.Ri} b={K.Ga}>
        <FondoLunares color={KC.orange} />
        {svg(<>{barras.map(([n, v], i) => { const h = 4.2 * v * kprog(T, K.Ri + 2.4 + i * 0.25, K.Ri + 3.3 + i * 0.25, kEase.sale);
            return <g key={n}><rect x={110 + i * 200} y={1080 - h} width={150} height={h} rx={12} fill={[KC.cyan, KC.mint, KC.yellow][i]} stroke={KC.ink} strokeWidth={7} />
              {h > 40 && <text x={185 + i * 200} y={1060 - h} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{v}</text>}
              <text x={185 + i * 200} y={1122} textAnchor="middle" style={{ font:`900 27px ${KF.texto}` }} fill={KC.ink}>{n}</text></g>; })}</>)}
      </Escena>
      {/* 10 · gases: 8–10 % (2010–2016) */}
      <Escena T={T} a={K.Ga} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Dona x={640} y={800} r={190} f={0.08 * g9} f2={0.10 * g9} />
          <text x={640} y={830} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.ink} opacity={g9}>8–10 %</text>
          {Array.from({ length: 5 }, (_, i) => { const u = ((T - K.Ga) * 0.35 + i / 5) % 1; return <Nube key={i} x={230 + Math.sin(i * 2 + T) * 30} y={1000 - u * 260} s={0.6 + u * 0.5} o={(1 - u) * kprog(T, K.Ga + 0.2, K.Ga + 0.6)} />; })}
          <Bote x={230} y={1170} s={0.85} lleno={1} /></>)}
      </Escena>
      {/* 11 · cierre: regreso al refri, la quinta repisa vacía y marcada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Bote x={BX} y={BY} s={0.9} lleno={1} />
          <Refri T={T} x={RX} y={RY} s={RS} abre={abreC} caida={() => 1} bx={BX} by={BY - 150} marca={kprog(T, K.C + 0.4, K.C + 1.0)} quedan={1} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.4} until={K.To - 0.2} texto="tiendas · restaurantes · casas" y={340} x={310} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.To - 0.2} texto="≈ 1 de cada 5 partes (19 %)" y={1440} x={540} tam={40} borde={KC.red} />
      <NumeroGigante T={T} at={K.To + 0.3} until={K.Ca - 0.2} valor={1050} dur={1.3} etiqueta="millones de toneladas" x={340} y={500} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.To + 0.8} until={K.Ca - 0.2} texto="comida tirada en 2022" y={1440} x={540} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 1.0} until={K.P - 0.25} x={600} y={520} texto="cáscaras" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.3} until={K.P - 0.25} x={600} y={600} texto="huesos" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.6} until={K.P - 0.25} x={600} y={680} texto="+ comida buena" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.P - 0.25} texto="se cuentan partes no comestibles" y={1440} x={540} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.Cs + 2.0} until={K.Ki - 0.2} x={385} y={960} texto="casa 60 %" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Cs + 2.3} until={K.Ki - 0.2} x={630} y={1010} texto="restaurantes 28 %" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cs + 2.6} until={K.Ki - 0.2} x={945} y={1060} texto="súper 12 %" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Cs + 0.3} until={K.Ki - 0.2} texto="de cada 10 kilos tirados" y={420} x={540} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ki + 0.3} until={K.Mx - 0.2} valor={79} dur={2.1} sufijo=" kg" etiqueta="por persona al año" x={540} y={470} tam={150} color={KC.orange} />
      <Chip T={T} at={K.Ki + 1.2} until={K.Mx - 0.2} texto="en casa · promedio mundial · 2022" y={1440} x={540} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Mx + 0.6} until={K.E - 0.2} valor={105} desde={79} dur={1.4} sufijo=" kg" etiqueta="México, por persona al año" x={540} y={1000} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Mx + 1.4} until={K.E - 0.2} texto="en casa · estimación · confianza media" y={1440} x={540} tam={32} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.4} until={K.Ri - 0.2} anio="2024" quien="Programa de la ONU para el Medio Ambiente" revista="Food Waste Index Report 2024 · Nairobi" x={540} y={940} />
      <Chip T={T} at={K.E + 3.0} until={K.Ri - 0.2} texto="datos de hogares de 93 países" y={1440} x={540} tam={34} borde={KC.ink} />
      <MitoTachado T={T} at={K.Ri + 0.2} tacharEn={K.Ri + 1.4} until={K.Ga - 0.2} texto="«solo pasa en países ricos»" x={330} y={470} tam={38} />
      <Chip T={T} at={K.Ri + 3.4} until={K.Ga - 0.2} texto="kg por persona al año, en casa" y={1440} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ri + 4.0} until={K.Ga - 0.2} x={760} y={760} texto="± 7 kg" tam={44} color={KC.ink} />
      <Chip T={T} at={K.Ga + 0.6} until={K.C - 0.2} texto="2010–2016" y={500} x={640} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ga + 2.0} until={K.C - 0.2} texto="de los gases de efecto invernadero del mundo" y={1045} x={650} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.Ga + 2.6} until={K.C - 0.2} texto="comida perdida + tirada" y={1440} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou - 0.1} x={525} y={955} texto="60 % se tira en casas" tam={34} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.To - 0.1} texto="Casi *1 de cada 5* partes, a la basura." />
      <Subtitulo T={T} idx={1} at={K.To + 0.1} until={K.Ca - 0.1} texto="2022: *1,050 millones de toneladas.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.P - 0.1} texto="Incluye *cáscaras y huesos.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Cs - 0.1} texto="¿Súper, restaurante *o tu casa?*" />
      <Subtitulo T={T} idx={4} at={K.Cs + 0.1} until={K.Ki - 0.1} texto="Tu casa: *6 de cada 10 kilos.*" />
      <Subtitulo T={T} idx={5} at={K.Ki + 0.1} until={K.Mx - 0.1} texto="*79 kilos* por persona al año." />
      <Subtitulo T={T} idx={6} at={K.Mx + 0.1} until={K.E - 0.1} texto="México: *105 kilos* por persona." />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Ri - 0.1} texto="ONU Medio Ambiente, 2024: *93 países.*" />
      <Subtitulo T={T} idx={8} at={K.Ri + 0.1} until={K.Ga - 0.1} texto="No es de ricos: *apenas 7 kilos.*" />
      <Subtitulo T={T} idx={9} at={K.Ga + 0.1} until={K.C - 0.1} texto="2010–2016: *8 a 10 %* de los gases." />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Más de la mitad, *en casas como la tuya.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Toneladas + 1.0, CUES.Cascaras + 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Casa + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Mexico + 0.6, CUES.Estudio - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Ricos - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Ricos + 2.4, CUES.Gases - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Gases + 2.5, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="19" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DesperdicioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><DesperdicioShot /></CompositionStage></div>;
}
window.DesperdicioApp = DesperdicioApp;
// Revisado por el coordinador el 29 oct 2026 (preview de 16 cuadros).
