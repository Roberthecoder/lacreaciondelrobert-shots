// Shot Fungi Mati #88 · Tu refri no mata al moho: solo lo pone en pausa — NARRADO (gancho 1 "Esto no es X: es Y" + N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const MR = { cuerpo:'#f3f7fa', cuerpo2:'#d7e2ea', dentro:'#e6f4ff', dentro2:'#cfe6f7', vidrio:'rgba(170,215,240,.55)', tapa:'#2f7de1',
  sobra:'#e0913a', sobra2:'#c8742a', manzana:'#e8443a', manzana2:'#b92e27', peni:'#3fa6a8', peni2:'#62c4b4', peniBorde:'#f4fbf6',
  fresa:'#ef3b4f', fresa2:'#c42638', gris:'#b9b8b2', gris2:'#8f8e88', botr:'#6d6a63', oliva:'#6f5f2c', oliva2:'#8a7a3c',
  hielo:'#d9f4ff', escarcha:'#ffffff', lechuga:'#7cd36a', zanahoria:'#ff8a2a' };
const RF = { x0: 110, x1: 930, y0: 380, y1: 1180, rep1: 650, rep2: 905 };

// Copo de nieve.
function Copo({ x, y, r = 26, rot = 0, color = MR.hielo, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}>
      <line x1={-r} y1={0} x2={r} y2={0} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <line x1={-r} y1={0} x2={r} y2={0} stroke={color} strokeWidth={5} strokeLinecap="round" />
      {[-1, 1].map((k) => <path key={k} d={`M ${k * r * 0.55} 0 L ${k * r * 0.8} ${-r * 0.22} M ${k * r * 0.55} 0 L ${k * r * 0.8} ${r * 0.22}`} stroke={color} strokeWidth={4} strokeLinecap="round" />)}
    </g>)}
  </g>;
}

// Botón de estado (⏸ PAUSA / ▶ lento) que cae con rebote. En SVG.
function Boton({ T, at, x, y, texto, color = KC.cyan, w = 190, pausa = false }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.4, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-w / 2} y={-34} width={w} height={68} rx={34} fill={KC.dark} stroke={color} strokeWidth={6} />
    {pausa && <g><rect x={-w / 2 + 26} y={-17} width={10} height={34} rx={3} fill={color} /><rect x={-w / 2 + 44} y={-17} width={10} height={34} rx={3} fill={color} /></g>}
    <text x={pausa ? 22 : 0} y={13} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={color}>{texto}</text>
  </g>;
}

// Recipiente de sobras con tapa. fecha = texto en la cinta de la tapa.
function Sobras({ x, y, fecha, moho = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -115 -110 L 115 -110 L 100 0 L -100 0 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -106 -70 Q 0 -96 106 -70 L 100 -6 L -100 -6 Z" fill={MR.sobra} />
    {[[-60, -54], [-20, -66], [30, -50], [70, -62], [0, -30], [-50, -24], [55, -28]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={11} fill={MR.sobra2} />)}
    {moho > 0 && [[-40, -68], [40, -60], [5, -40]].map(([a, b], i) => <circle key={'m' + i} cx={a} cy={b} r={16 * moho} fill={MR.peni} stroke={MR.peniBorde} strokeWidth={4} />)}
    <rect x={-125} y={-132} width={250} height={30} rx={10} fill={MR.tapa} stroke={KC.ink} strokeWidth={6} />
    {fecha && <g><rect x={-46} y={-130} width={92} height={26} rx={4} fill="#fff8d6" stroke={KC.ink} strokeWidth={3} />
      <text y={-110} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>{fecha}</text></g>}
  </g>;
}

// Manzana con moho azul (Penicillium expansum): mancha café blanda con penachos azul-verdes y borde blanco.
function Manzana({ x, y, r = 64, moho = 0, T = 0 }) {
  const g = krng(88);
  const pts = Array.from({ length: 16 }, () => ({ a: g() * Math.PI * 2, d: Math.sqrt(g()), u: g() }));
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 ${-r * 0.78} C ${r * 0.9} ${-r * 1.15} ${r * 1.25} ${-r * 0.1} ${r * 0.85} ${r * 0.62} C ${r * 0.55} ${r * 1.08} ${r * 0.15} ${r * 0.95} 0 ${r * 0.86} C ${-r * 0.15} ${r * 0.95} ${-r * 0.55} ${r * 1.08} ${-r * 0.85} ${r * 0.62} C ${-r * 1.25} ${-r * 0.1} ${-r * 0.9} ${-r * 1.15} 0 ${-r * 0.78} Z`}
      fill={MR.manzana} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-r * 0.4} cy={-r * 0.3} rx={r * 0.18} ry={r * 0.32} fill="#fff" opacity=".35" transform={`rotate(20 ${-r * 0.4} ${-r * 0.3})`} />
    <path d={`M 0 ${-r * 0.75} Q 4 ${-r * 1.05} 12 ${-r * 1.2}`} stroke="#6b4318" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d={`M 10 ${-r * 1.05} Q 50 ${-r * 1.3} 64 ${-r * 1.0} Q 30 ${-r * 0.9} 10 ${-r * 1.05} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
    {moho > 0 && <g transform={`translate(${r * 0.32} ${r * 0.22})`}>
      <circle r={r * 0.62 * moho} fill="#8a5a2c" opacity=".85" />
      <circle r={r * 0.5 * moho} fill={MR.peniBorde} />
      <circle r={r * 0.42 * moho} fill={MR.peni} />
      {pts.map((p, i) => { const o = kclamp(moho * 1.5 - p.u * 0.5, 0, 1); return o > 0 ? <circle key={i} cx={Math.cos(p.a) * p.d * r * 0.36 * moho} cy={Math.sin(p.a) * p.d * r * 0.36 * moho} r={5 + 3 * o} fill={i % 2 ? MR.peni2 : '#2e8e8e'} /> : null; })}
    </g>}
  </g>;
}

// Cajita de fresas; moho = pelusa gris de Botrytis.
function Fresas({ x, y, moho = 0, s = 1, T = 0 }) {
  const fr = [[-62, -38, -10], [0, -48, 6], [60, -36, 14], [-30, -10, -4], [34, -8, 8]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fr.map(([a, b, rot], i) => <g key={i} transform={`translate(${a} ${b}) rotate(${rot})`}>
      <path d="M 0 40 C -40 22 -40 -22 -28 -30 Q 0 -40 28 -30 C 40 -22 40 22 0 40 Z" fill={MR.fresa} stroke={KC.ink} strokeWidth={5} />
      {[[-12, -8], [10, -12], [0, 8], [-16, 12], [16, 6]].map(([p, q], k) => <ellipse key={k} cx={p} cy={q} rx={2.6} ry={4} fill="#ffe08a" />)}
      <path d="M -24 -30 L -10 -22 L 0 -36 L 10 -22 L 24 -30 L 12 -40 L -12 -40 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      {moho > 0 && (i === 1 || i === 3) && <g>{Array.from({ length: 14 }, (_, k) => { const an = k * 0.45, rr = 18 + (k % 3) * 8; return <circle key={k} cx={Math.cos(an) * rr * 0.8} cy={-4 + Math.sin(an) * rr * 0.8} r={(7 + (k % 4) * 2) * moho} fill={k % 2 ? MR.gris : '#d4d3cd'} stroke="rgba(0,0,0,.25)" strokeWidth={2} />; })}</g>}
    </g>)}
    <path d="M -110 0 L 110 0 L 96 56 L -96 56 Z" fill="#5fbf6a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-70, -35, 0, 35, 70].map((a) => <line key={a} x1={a} y1={6} x2={a * 0.9} y2={50} stroke="#3c8f45" strokeWidth={6} />)}
  </g>;
}

// Termómetro de refri colgado. valor en °C (de −20 a 20).
function TermoRefri({ x, y, valor = 4, h = 190, color = KC.cyan }) {
  const t2y = (c) => y + h - ((kclamp(c, -20, 20) + 20) / 40) * h;
  return <g>
    <line x1={x} y1={y - 40} x2={x} y2={y - 6} stroke="#9aa7ad" strokeWidth={5} />
    <rect x={x - 34} y={y - 10} width={68} height={h + 70} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={x - 9} y={y} width={18} height={h} rx={9} fill="#eef3f6" stroke={KC.ink} strokeWidth={3} />
    <rect x={x - 6} y={t2y(valor)} width={12} height={y + h - t2y(valor)} rx={6} fill={valor > 5 ? KC.red : color} />
    <circle cx={x} cy={y + h + 24} r={18} fill={valor > 5 ? KC.red : color} stroke={KC.ink} strokeWidth={4} />
    {[-20, 0, 20].map((c) => <line key={c} x1={x + 10} y1={t2y(c)} x2={x + 22} y2={t2y(c)} stroke={KC.ink} strokeWidth={3} />)}
    <line x1={x - 22} y1={t2y(4)} x2={x - 10} y2={t2y(4)} stroke={KC.leaf} strokeWidth={5} />
  </g>;
}

// El refri abierto de frente. abre 0..1 (puerta) · mohos · limpio · termo (°C) · fecha en las sobras.
function Refri({ T, abre = 1, mohoM = 0.6, mohoF = 0.6, mohoS = 0, termo = 4, fecha, limpio = 0, vaho = 0, sucio = 0 }) {
  const { x0, x1, y0, y1, rep1, rep2 } = RF;
  const ix0 = x0 + 34, ix1 = x1 - 34, iy0 = y0 + 34, iy1 = y1 - 34;
  const luz = kclamp(abre * 1.6 - 0.2, 0, 1);
  const dw = (x1 - x0) * (1 - abre * 0.92);
  const g = krng(7);
  return <g>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0 + 40} rx={36} fill={MR.cuerpo} stroke={KC.ink} strokeWidth={9} />
    <rect x={ix0} y={iy0} width={ix1 - ix0} height={iy1 - iy0} rx={18} fill={MR.dentro} stroke={KC.ink} strokeWidth={6} />
    <rect x={ix0} y={iy0} width={ix1 - ix0} height={iy1 - iy0} rx={18} fill="url(#luzRefri)" opacity={luz} />
    <defs><radialGradient id="luzRefri" cx="50%" cy="8%" r="70%"><stop offset="0%" stopColor="#fffbe0" stopOpacity="0.95" /><stop offset="100%" stopColor="#fffbe0" stopOpacity="0" /></radialGradient></defs>
    <rect x={(ix0 + ix1) / 2 - 70} y={iy0 + 6} width={140} height={22} rx={10} fill="#fff6c2" stroke={KC.ink} strokeWidth={4} opacity={0.4 + 0.6 * luz} />
    {/* manchitas de suciedad / moho en el fondo */}
    {sucio > 0 && Array.from({ length: 26 }, (_, i) => <circle key={i} cx={ix0 + 20 + g() * (ix1 - ix0 - 40)} cy={iy1 - 14 - g() * 18} r={5 + g() * 6} fill={i % 3 ? '#5f7d6a' : '#3d4f45'} opacity={sucio * (1 - limpio) * 0.8} />)}
    {/* repisas de vidrio */}
    {[rep1, rep2].map((yy) => <g key={yy}><rect x={ix0 - 4} y={yy} width={ix1 - ix0 + 8} height={16} rx={6} fill={MR.vidrio} stroke={KC.ink} strokeWidth={5} /></g>)}
    {/* cajón de verduras */}
    <rect x={ix0 + 16} y={rep2 + 40} width={ix1 - ix0 - 32} height={iy1 - rep2 - 54} rx={16} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(${ix0 + 150} ${rep2 + 150})`}>{[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={(k - 2) * 34} cy={-10 - (k % 2) * 16} rx={46} ry={38} fill={k % 2 ? MR.lechuga : '#5cbf55'} stroke={KC.ink} strokeWidth={4} />)}</g>
    {[0, 1, 2].map((k) => <path key={k} transform={`translate(${ix1 - 240 + k * 58} ${rep2 + 110}) rotate(${-20 + k * 14})`} d="M -14 -50 L 14 -50 L 3 70 L -3 70 Z" fill={MR.zanahoria} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={ix0 + 16} y={rep2 + 40} width={ix1 - ix0 - 32} height={34} rx={14} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={4} />
    {/* cosas en las repisas */}
    <Sobras x={300} y={rep1} fecha={fecha} moho={mohoS} />
    <TermoRefri x={790} y={iy0 + 70} valor={termo} h={150} />
    <Manzana x={310} y={rep2 - 70} moho={mohoM * (1 - limpio)} T={T} />
    <Fresas x={650} y={rep2 - 56} moho={mohoF * (1 - limpio)} T={T} />
    {/* vaho frío que sale */}
    {vaho > 0 && Array.from({ length: 9 }, (_, i) => { const u = ((T * 0.45 + i / 9) % 1); return <ellipse key={'v' + i} cx={klerp(260 + (i % 3) * 200, 140 + (i % 3) * 330, u)} cy={klerp(1120, 1260, u)} rx={70 + u * 80} ry={30 + u * 30} fill="#fff" opacity={vaho * 0.5 * (1 - u)} />; })}
    {/* puerta (bisagra a la izquierda) */}
    <g>
      <path d={`M ${x0} ${y0} L ${x0 + dw} ${y0 + abre * 40} L ${x0 + dw} ${y1 + 40 - abre * 40} L ${x0} ${y1 + 40} Z`} fill={abre > 0.5 ? MR.cuerpo2 : MR.cuerpo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {abre < 0.5 && <rect x={x0 + dw - 70} y={y0 + 220} width={22} height={260} rx={11} fill="#c2ced6" stroke={KC.ink} strokeWidth={5} />}
    </g>
  </g>;
}

// Penicillium: conidióforo en pincel (estipe → ramas → métulas → fiálides) con cadenas de conidios casi esféricos azul-verdes.
function Penicilio({ x, y, s = 1, crece = 1, H = 360, T = 0, seed = 1 }) {
  if (crece <= 0) return null;
  const h = H * kEase.sale(kclamp(crece * 1.8, 0, 1));
  const pc = kclamp(crece * 1.8 - 0.8, 0, 1);              // 0..1 aparecen las ramas del pincel
  const nC = Math.floor(kclamp(crece * 1.8 - 1.0, 0, 0.8) / 0.8 * 7); // conidios por cadena
  const el = [], con = [];
  const sway = Math.sin(T * 1.1 + seed) * 2;
  if (pc > 0) {
    [-30, 0, 30].forEach((a1, i) => {
      const r1 = a1 * Math.PI / 180, L1 = 70 * pc, ax = Math.sin(r1) * L1, ay = -h - Math.cos(r1) * L1;
      el.push(<line key={'r' + i} x1={0} y1={-h} x2={ax} y2={ay} stroke="#d8efe6" strokeWidth={16} strokeLinecap="round" />);
      [-14, 14].forEach((a2, j) => {
        const r2 = (a1 + a2) * Math.PI / 180, L2 = 55 * pc, mx = ax + Math.sin(r2) * L2, my = ay - Math.cos(r2) * L2;
        el.push(<line key={'m' + i + j} x1={ax} y1={ay} x2={mx} y2={my} stroke="#d8efe6" strokeWidth={13} strokeLinecap="round" />);
        [-8, 0, 8].forEach((a3, k) => {
          const r3 = (a1 + a2 + a3) * Math.PI / 180, L3 = 40 * pc, fx = mx + Math.sin(r3) * L3, fy = my - Math.cos(r3) * L3;
          el.push(<path key={'f' + i + j + k} d={`M ${mx} ${my} Q ${(mx + fx) / 2 + Math.cos(r3) * 6} ${(my + fy) / 2 + Math.sin(r3) * 6} ${fx} ${fy}`} stroke="#bfe7da" strokeWidth={9} strokeLinecap="round" fill="none" />);
          for (let c = 0; c < nC; c++) {
            const d = 13 + c * 25, cx = fx + Math.sin(r3) * d, cy = fy - Math.cos(r3) * d;
            con.push(<ellipse key={'c' + i + j + k + c} cx={cx} cy={cy} rx={12} ry={11} fill={(c + k) % 2 ? MR.peni2 : MR.peni} stroke={KC.ink} strokeWidth={2.5} />);
          }
        });
      });
    });
  }
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sway})`}>
    <path d={`M -11 0 Q -13 ${-h * 0.5} -9 ${-h} L 9 ${-h} Q 13 ${-h * 0.5} 11 0 Z`} fill="#d8efe6" stroke={KC.ink} strokeWidth={3} />
    {[0.25, 0.55, 0.8].map((f, i) => h > 120 && <line key={i} x1={-11} y1={-h * f} x2={11} y2={-h * f} stroke="rgba(0,0,0,.35)" strokeWidth={3} />)}
    {el}{con}
  </g>;
}

// Botrytis cinerea: conidióforo largo, ramificado en la punta; cada rama termina en un racimo de conidios ovoides grises (como uvas).
function Botrytis({ x, y, s = 1, crece = 1, H = 420, T = 0, seed = 3 }) {
  if (crece <= 0) return null;
  const h = H * kEase.sale(kclamp(crece * 1.7, 0, 1));
  const pr = kclamp(crece * 1.7 - 0.7, 0, 1);
  const ramas = [[-50, 0.0, 120], [44, 0.1, 130], [-34, 0.25, 105], [56, 0.4, 95], [-8, 0.55, 80]];
  const g = krng(seed);
  const uvas = Array.from({ length: 11 }, () => ({ a: g() * Math.PI * 2, d: 10 + g() * 26, rot: g() * 180 }));
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.3 + seed) * 3}) scale(${s})`}>
    <path d={`M -12 0 Q -15 ${-h * 0.5} -9 ${-h} L 9 ${-h} Q 15 ${-h * 0.5} 12 0 Z`} fill={MR.botr} stroke={KC.ink} strokeWidth={4} />
    {[0.2, 0.42, 0.64, 0.86].map((f, i) => h > 120 && <line key={i} x1={-12} y1={-h * f} x2={12} y2={-h * f} stroke={KC.ink} strokeWidth={3} />)}
    {pr > 0 && ramas.map(([ang, t0, L], i) => {
      const p = kclamp((pr - t0) / 0.4, 0, 1); if (p <= 0) return null;
      const by = -h + 20 + i * 30, a = ang * Math.PI / 180, ex = Math.sin(a) * L * p * 1.3, ey = by - Math.cos(a) * L * p;
      const nU = Math.floor(p * uvas.length);
      return <g key={i}>
        <path d={`M 0 ${by} Q ${ex * 0.5} ${by - 10} ${ex} ${ey}`} stroke={MR.botr} strokeWidth={11} fill="none" strokeLinecap="round" />
        <circle cx={ex} cy={ey} r={12 * p} fill="#9b978d" stroke={KC.ink} strokeWidth={3} />
        {uvas.slice(0, nU).map((u, k) => <ellipse key={k} cx={ex + Math.cos(u.a) * u.d} cy={ey + Math.sin(u.a) * u.d - 6} rx={20} ry={15} transform={`rotate(${u.rot} ${ex + Math.cos(u.a) * u.d} ${ey + Math.sin(u.a) * u.d - 6})`} fill={k % 2 ? MR.gris : '#a9a8a1'} stroke={KC.ink} strokeWidth={2.5} />)}
      </g>;
    })}
  </g>;
}

// Cladosporium: tallo erguido y cadenas ramificadas de conidios en forma de limón, color oliva-café (igual que en el #33).
function Cladosporium({ x, y, s = 1, crece = 1, seed = 2, T = 0 }) {
  if (crece <= 0) return null;
  const g = krng(seed), H = 300 * kEase.sale(kclamp(crece * 1.6, 0, 1));
  const conidios = [];
  const rama = (cx, cy, ang, n, tam, nivel, d0) => {
    let px = cx, py = cy;
    for (let k = 0; k < n; k++) {
      const orden = d0 + k; if (orden / 14 > kclamp(crece * 1.4 - 0.25, 0, 1)) return;
      const L = tam * 2.1; px += Math.cos(ang) * L; py += Math.sin(ang) * L;
      conidios.push(<path key={conidios.length} d={`M ${-tam} 0 Q ${-tam * 0.6} ${-tam * 0.62} 0 ${-tam * 0.62} Q ${tam * 0.6} ${-tam * 0.62} ${tam} 0 Q ${tam * 0.6} ${tam * 0.62} 0 ${tam * 0.62} Q ${-tam * 0.6} ${tam * 0.62} ${-tam} 0 Z`}
        transform={`translate(${px} ${py}) rotate(${ang * 180 / Math.PI})`} fill={k % 2 ? MR.oliva2 : MR.oliva} stroke={KC.ink} strokeWidth={3} />);
      if (nivel < 2 && k === 1) rama(px, py, ang + (g() < 0.5 ? -0.55 : 0.55), n - 1, tam * 0.85, nivel + 1, orden + 1);
      ang += (g() - 0.5) * 0.25; tam *= 0.9;
    }
  };
  if (crece > 0.3) { rama(0, -H, -Math.PI / 2 - 0.55, 5, 28, 0, 0); rama(0, -H, -Math.PI / 2 + 0.5, 5, 28, 0, 1); rama(0, -H, -Math.PI / 2, 4, 25, 1, 2); }
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.2 + seed) * 4}) scale(${s})`}>
    <path d={`M -10 0 Q -14 ${-H * 0.5} -6 ${-H} L 6 ${-H} Q 14 ${-H * 0.5} 10 0 Z`} fill="#4f4422" stroke={KC.ink} strokeWidth={4} />
    {[0.3, 0.6].map((f, i) => H > 100 && <line key={i} x1={-10} y1={-H * f} x2={10} y2={-H * f} stroke={KC.ink} strokeWidth={3} />)}
    {conidios}
  </g>;
}

// Cristales de escarcha alrededor (fondo oscuro).
function Escarcha({ T, o = 1, n = 18, seed = 4, area = [0, 330, KW, 1180] }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = area[0] + g() * (area[2] - area[0]), y = area[1] + g() * (area[3] - area[1]), r = 10 + g() * 18;
    return <Copo key={i} x={x} y={y + mece(T, i, 0.1) * 8} r={r} rot={g() * 60 + T * 6} o={0.55} />; })}</g>;
}

// Calendario de hojas: arranca 'dias' hojas (0..6).
function Calendario({ x, y, dias = 0, w = 210, total = 6 }) {
  const n = Math.min(total, Math.floor(dias));
  const fr = dias - Math.floor(dias);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-w / 2} width={w} height={w * 1.05} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-w / 2} y={-w / 2} width={w} height={54} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {[-50, 50].map((a) => <circle key={a} cx={a} cy={-w / 2} r={10} fill={KC.ink} />)}
    <text y={-w / 2 + 40} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff">DÍA</text>
    <text y={w * 0.38} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{Math.max(1, Math.min(total, n + 1))}</text>
    {dias < total && fr > 0 && <g transform={`translate(${klerp(0, 140, fr)} ${klerp(0, -60, fr)}) rotate(${fr * 40})`} opacity={1 - fr}>
      <rect x={-w / 2 + 6} y={-w / 2 + 54} width={w - 12} height={w * 1.05 - 60} rx={10} fill="#fffdf4" stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}

// Engrane.
function Engrane({ x, y, r = 80, n = 10, ang = 0, color = KC.gold2 }) {
  const d = Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22; const a2 = a + Math.PI / (n * 2);
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} L ${(Math.cos(a2) * rr).toFixed(1)} ${(Math.sin(a2) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}><path d={d} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /><circle r={r * 0.35} fill={KC.dark} stroke={KC.ink} strokeWidth={5} /></g>;
}

// Reloj de arena: p 0..1 = arena que ya cayó.
function RelojArena({ x, y, p = 0, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <rect x={-70} y={-118} width={140} height={18} rx={6} fill="#a8743c" stroke={KC.ink} strokeWidth={5} />
    <rect x={-70} y={100} width={140} height={18} rx={6} fill="#a8743c" stroke={KC.ink} strokeWidth={5} />
    <path d="M -55 -100 L 55 -100 Q 55 -30 6 0 Q 55 30 55 100 L -55 100 Q -55 30 -6 0 Q -55 -30 -55 -100 Z" fill="rgba(220,240,255,.6)" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-48 * (1 - p)} ${-100 + 70 * p} L ${48 * (1 - p)} ${-100 + 70 * p} L 0 -4 Z`} fill={KC.gold2} />
    <path d={`M -50 96 Q 0 ${96 - 70 * p} 50 96 Z`} fill={KC.gold2} />
    {p < 1 && <line x1={0} y1={-4} x2={0} y2={94} stroke={KC.gold2} strokeWidth={4} />}
  </g>;
}

// Membrana (bicapa de grasas). flex 0..1: de rígida (colas rectas y apretadas) a flexible (colas dobladas: insaturadas).
function Membrana({ T, y = 980, flex = 0, x0 = 40, x1 = 1040 }) {
  const paso = klerp(36, 46, flex), n = Math.floor((x1 - x0) / paso);
  const lipido = (x, yy, dir, i) => {
    const w = mece(T, i, 0.6) * 6 * flex, ins = flex > 0 && (i % 2 === 0) ? flex : 0;
    const L = 64, dob = ins * 26 * (i % 4 === 0 ? 1 : -1);
    return <g key={dir + '' + i}>
      <line x1={x - 7} y1={yy} x2={x - 7 + w} y2={yy + dir * L} stroke="#e8d9a8" strokeWidth={6} strokeLinecap="round" />
      <path d={`M ${x + 7} ${yy} L ${x + 7 + w * 0.5} ${yy + dir * L * 0.5} L ${x + 7 + dob + w} ${yy + dir * L}`} stroke={ins ? KC.mint : '#e8d9a8'} strokeWidth={6} strokeLinecap="round" fill="none" />
      <circle cx={x} cy={yy - dir * 6} r={15} fill={ins ? KC.mint : KC.gold2} stroke={KC.ink} strokeWidth={3} />
    </g>;
  };
  return <g>
    <rect x={x0 - 20} y={y - 100} width={x1 - x0 + 40} height={200} fill="rgba(80,140,200,.08)" />
    {Array.from({ length: n }, (_, i) => lipido(x0 + paso / 2 + i * paso, y - 78, 1, i))}
    {Array.from({ length: n }, (_, i) => lipido(x0 + paso / 2 + i * paso, y + 78, -1, i + 101))}
    {flex < 0.6 && Array.from({ length: 8 }, (_, i) => <Copo key={'c' + i} x={x0 + 70 + i * 128} y={y + (i % 2 ? -150 : 150)} r={16} o={(1 - flex / 0.6) * 0.8} rot={i * 20} />)}
  </g>;
}

// Congelador vertical abierto (−18 °C), con escarcha.
function Congelador({ T, x = 70, y = 560, w = 470, h = 600 }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={30} fill={MR.cuerpo} stroke={KC.ink} strokeWidth={9} />
    <rect x={x + 30} y={y + 90} width={w - 60} height={h - 120} rx={16} fill="#dff1ff" stroke={KC.ink} strokeWidth={6} />
    {[0.42, 0.72].map((f) => <rect key={f} x={x + 30} y={y + 90 + (h - 120) * f} width={w - 60} height={12} fill="#b7d7ee" stroke={KC.ink} strokeWidth={4} />)}
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${x + 34 + i * 30} ${y + 92} l 10 ${18 + (i % 3) * 10} l 10 ${-18 - (i % 3) * 10}`} fill={MR.escarcha} stroke="#9cc3dc" strokeWidth={2} />)}
    <rect x={x + 120} y={y + 16} width={w - 240} height={58} rx={12} fill={KC.dark} stroke={KC.ink} strokeWidth={5} />
    <text x={x + w / 2} y={y + 60} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.cyan}>−18 °C</text>
    <Copo x={x + 80} y={y + 45} r={20} rot={T * 20} />
  </g>;
}

// Colonia con carita: duerme (ojos cerrados) o despierta. crece 0..1.
function ColoniaCara({ T, x, y, r = 60, despierta = 0 }) {
  const g = krng(5), n = 22;
  const rr = r * (1 + despierta * 0.25 + Math.sin(T * 6) * 0.02 * despierta);
  const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, q = rr * (0.85 + g() * 0.25); return `${i ? 'L' : 'M'} ${(Math.cos(a) * q).toFixed(1)} ${(Math.sin(a) * q).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={MR.peni} stroke={MR.peniBorde} strokeWidth={7} strokeLinejoin="round" />
    {despierta < 0.5 ? [-20, 20].map((a) => <path key={a} d={`M ${a - 12} -6 Q ${a} 4 ${a + 12} -6`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />)
      : [-20, 20].map((a) => <g key={a}><circle cx={a} cy={-6} r={11} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={a + 2} cy={-5} r={5} fill={KC.ink} /></g>)}
    <path d={despierta < 0.5 ? 'M -10 18 Q 0 22 10 18' : 'M -14 14 Q 0 30 14 14'} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}

// Esponja de muestreo / limpieza.
function Esponja({ x, y, rot = -8, s = 1, color = '#ffe11a' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-40} width={160} height={80} rx={20} fill={color} stroke={KC.ink} strokeWidth={6} />
    {[[-40, -14], [10, -20], [44, 4], [-14, 10], [-50, 16]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill="rgba(0,0,0,.15)" />)}
  </g>;
}

// Mini refri (para contar 293).
function MiniRefri({ x, y, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-10} y={-14} width={20} height={28} rx={4} fill={on ? KC.white : 'rgba(255,255,255,.28)'} stroke={on ? KC.ink : 'none'} strokeWidth={2} />
    {on > 0 && <line x1={-10} y1={-3} x2={10} y2={-3} stroke={KC.ink} strokeWidth={2} />}
  </g>;
}

// Corte del refri para el estudio: fondo con mucho moho, paredes con poco. esponja p 0..1.
function CorteRefri({ T, x = 150, y = 700, w = 780, h = 440, puntos = 1, esponja = -1 }) {
  const g = krng(14);
  const fondo = Array.from({ length: 46 }, () => ({ x: x + 30 + g() * (w - 60), y: y + h - 40 - g() * 26, r: 6 + g() * 8, u: g() }));
  const pared = Array.from({ length: 6 }, (_, i) => ({ x: i % 2 ? x + 26 + g() * 14 : x + w - 40 + g() * 14, y: y + 60 + g() * (h - 160), r: 5 + g() * 5, u: g() }));
  const ex = klerp(x + 90, x + w - 90, 0.5 - 0.5 * Math.cos(kclamp(esponja, 0, 1) * Math.PI * 3));
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={22} fill={MR.dentro} stroke={KC.ink} strokeWidth={8} />
    <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} rx={14} fill="none" stroke={MR.dentro2} strokeWidth={6} />
    <rect x={x + 8} y={y + h - 70} width={w - 16} height={62} rx={12} fill="rgba(255,225,26,.28)" />
    {[...fondo, ...pared].map((p, i) => { const o = kclamp(puntos * 1.6 - p.u * 0.6, 0, 1); return o > 0 ? <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={i % 3 ? '#4f7a62' : '#2e8e8e'} opacity={o} /> : null; })}
    {esponja >= 0 && esponja <= 1 && <Esponja x={ex} y={y + h - 50} s={0.7} color="#ffe9a8" rot={0} />}
  </g>;
}

function MohoRefriShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Frio, Pe: CUES.Penicillium, Bo: CUES.Botrytis, Cl: CUES.Cladosporium, P: CUES.Pregunta, L: CUES.Lento,
    Co: CUES.Congelador, Es: CUES.Estudio, Ti: CUES.Tibios, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre = kprog(T, K.G + 0.15, K.G + 0.95, kEase.sale);
  const copoU = kprog(T, K.G + 0.9, K.G + 1.7, kEase.suave);
  const termF = klerp(12, 4, kprog(T, K.F + 0.3, K.F + 1.6, kEase.suave));
  const dias = kprog(T, K.Pe + 0.9, K.Pe + 3.7) * 6;
  const crecePe = kprog(T, K.Pe + 3.3, K.Pe + 5.3);
  const lentoV = klerp(1, 0.12, kprog(T, K.L + 0.4, K.L + 2.0, kEase.suave));
  const lentoAng = (() => { const a = K.L + 0.4, b = K.L + 2.0; const t = T - a; if (t <= 0) return T * 360; if (T < b) return a * 360 + 360 * (t - (0.88 / (2 * (b - a))) * t * t); return a * 360 + 360 * ((b - a) - 0.44 * (b - a)) + (T - b) * 360 * 0.12; })();
  const flex = kprog(T, K.L + 3.2, K.L + 4.6, kEase.suave);
  const viaje = kprog(T, K.Co + 1.9, K.Co + 2.7, kEase.suave);
  const desp = kprog(T, K.Co + 2.8, K.Co + 3.1);
  const marcados = Math.round(293 * kprog(T, K.Es + 2.4, K.Es + 3.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el refri se abre; las sobras en pausa, la manzana y la fresa siguen (lento) */}
      <Escena T={T} a={K.G} b={K.F} zoom={0.04} origen="40% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Refri T={T} abre={abre} mohoM={klerp(0.55, 0.62, kprog(T, K.G, K.F))} mohoF={klerp(0.5, 0.58, kprog(T, K.G, K.F))} termo={4} vaho={abre} />
          {copoU > 0 && copoU < 1 && <Copo x={300} y={klerp(380, 520, copoU)} r={30} rot={copoU * 120} />}
          <Boton T={T} at={K.G + 1.7} x={300} y={470} texto="PAUSA" pausa color={KC.cyan} w={230} />
          <Boton T={T} at={K.G + 2.5} x={330} y={715} texto="▶ lento" color={KC.yellow} />
          <Boton T={T} at={K.G + 2.8} x={650} y={760} texto="▶ lento" color={KC.yellow} />
        </>)}
      </Escena>
      {/* 2 · frío: el termómetro baja a 4 °C; la manzana sigue creciendo despacio */}
      <Escena T={T} a={K.F} b={K.Pe} zoom={0.06} origen="70% 30%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Refri T={T} abre={1} mohoM={klerp(0.62, 0.8, kprog(T, K.F, K.Pe))} mohoF={0.6} termo={termF} />
          {(() => { const o = kprog(T, K.F + 1.6, K.F + 2.0); return <g opacity={o}><circle cx={790} cy={510} r={130} fill="none" stroke={KC.yellow} strokeWidth={10} strokeDasharray="24 14" transform={`rotate(${T * 30} 790 510)`} /></g>; })()}
        </>)}
      </Escena>
      {/* 3 · al microscopio: Penicillium expansum espera 6 días a 4 °C y luego crece */}
      <Escena T={T} a={K.Pe} b={K.Bo} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <path d="M 0 1110 Q 280 1090 540 1112 T 1080 1105 L 1080 1300 L 0 1300 Z" fill="#7a4b2a" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={60 + i * 120} cy={1160 + (i % 2) * 30} rx={44} ry={26} fill="#946039" stroke="#5e3a1f" strokeWidth={3} />)}
          <Escarcha T={T} o={0.6} n={10} seed={8} area={[40, 360, 660, 700]} />
          {/* esporas quietas que esperan; luego germinan y salen los pinceles */}
          {[[300, 1100], [570, 1102], [110, 1104]].map(([x, y], i) => { const hinch = kprog(T, K.Pe + 0.6, K.Pe + 3.6), o = 1 - kprog(T, K.Pe + 3.6, K.Pe + 4.0); return <g key={i} opacity={o}>
            <path d={`M ${x + 8} ${y - 14} q ${10 + 26 * hinch} ${-6 - 10 * hinch} ${18 + 40 * hinch} ${-30 * hinch}`} stroke="#d8efe6" strokeWidth={8} fill="none" strokeLinecap="round" />
            <ellipse cx={x} cy={y - 12} rx={13 + hinch * 3} ry={12 + hinch * 3} fill={MR.peni} stroke={KC.ink} strokeWidth={3} /></g>; })}
          <Penicilio T={T} x={300} y={1108} s={0.85} H={290} crece={crecePe} seed={1} />
          <Penicilio T={T} x={570} y={1108} s={0.55} H={250} crece={kprog(T, K.Pe + 3.6, K.Pe + 5.6)} seed={2} />
          <Penicilio T={T} x={110} y={1108} s={0.5} H={240} crece={kprog(T, K.Pe + 3.9, K.Pe + 5.9)} seed={3} />
          <Calendario x={850} y={880} dias={dias} />
        </>)}
      </Escena>
      {/* 4a · Botrytis: la fresa con pelusa gris */}
      <Escena T={T} a={K.Bo} b={K.Bo + 1.5} zoom={0.12} origen="55% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<g transform="translate(540 860) scale(2.6) translate(-650 -840)"><Fresas x={650} y={850} moho={1} /></g>)}
      </Escena>
      {/* 4b · al microscopio: conidióforo en racimo; y en laboratorio, una placa que crece a −4 °C */}
      <Escena T={T} a={K.Bo + 1.5} b={K.Cl} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <path d="M 0 1110 Q 260 1094 540 1110 L 540 1300 L 0 1300 Z" fill="#8e2a35" stroke={KC.ink} strokeWidth={6} />
          <Botrytis T={T} x={250} y={1110} s={1.0} H={420} crece={kprog(T, K.Bo + 1.3, K.Bo + 3.4)} seed={3} />
          {(() => { const o = kprog(T, K.Bo + 2.6, K.Bo + 3.0, kEase.sale); const cr = kprog(T, K.Bo + 3.0, K.Cl, kEase.suave); return o > 0 ? <g opacity={o} transform={`translate(${klerp(80, 0, o)} 0)`}>
            <Petri x={790} y={940} r={170} medio="#f5e7b8">
              <Colonia cx={0} cy={0} r={30 + 90 * cr} color="#cfcfc8" seed={6} />
              <Colonia cx={0} cy={0} r={15 + 50 * cr} color="#a8a7a0" seed={7} />
            </Petri>
            <Escarcha T={T} o={0.9} n={8} seed={11} area={[620, 760, 960, 1120]} />
            <TermoRefri x={600} y={720} valor={klerp(4, -4, kprog(T, K.Bo + 2.8, K.Bo + 3.6))} h={170} />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 5 · Cladosporium: ya en 1923 germinaba a −6 °C */}
      <Escena T={T} a={K.Cl} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Escarcha T={T} o={0.8} n={16} seed={5} area={[40, 760, 1040, 1100]} />
          <path d="M 0 1150 Q 300 1130 540 1150 T 1080 1145 L 1080 1300 L 0 1300 Z" fill="#c9a189" stroke={KC.ink} strokeWidth={6} />
          <Cladosporium T={T} x={200} y={1152} s={0.8} crece={kprog(T, K.Cl + 0.1, K.Cl + 3.0)} seed={2} />
          <Cladosporium T={T} x={850} y={1156} s={0.75} crece={kprog(T, K.Cl + 0.8, K.Cl + 3.6)} seed={9} />
          {/* una espora suelta saca su tubo germinativo */}
          {(() => { const p = kprog(T, K.Cl + 1.4, K.Cl + 3.0); return <g transform="translate(430 1085)"><path d="M -30 0 Q -18 -18 0 -18 Q 18 -18 30 0 Q 18 18 0 18 Q -18 18 -30 0 Z" fill={MR.oliva2} stroke={KC.ink} strokeWidth={3} />
            {p > 0 && <path d={`M 28 0 Q ${28 + 40 * p} ${-10 * p} ${28 + 90 * p} ${-30 * p}`} stroke="#d8c890" strokeWidth={9} fill="none" strokeLinecap="round" />}</g>; })()}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿para qué sirve el frío? */}
      <Escena T={T} a={K.P} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Interrogacion T={T} x={280} y={1170} color={MR.hielo} />
          {[[120, 520], [430, 640], [200, 820], [470, 980]].map(([x, y], i) => <Copo key={i} x={x} y={y + Math.sin(T * 2 + i) * 14} r={30} rot={T * 40 + i * 20} />)}
        </>)}
      </Escena>
      {/* 7 · por dentro: reacciones lentas y membrana rígida; los hongos del frío la ablandan */}
      <Escena T={T} a={K.L} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Engrane x={300} y={560} r={90} n={11} ang={lentoAng} />
          <Engrane x={470} y={480} r={60} n={8} ang={-lentoAng * 1.5 + 12} color={KC.cyan} />
          <Engrane x={455} y={650} r={50} n={7} ang={-lentoAng * 1.8} color={KC.pink} />
          <RelojArena x={820} y={560} p={kprog(T, K.L, K.Co) * 0.5} s={klerp(1, 1.15, kprog(T, K.L + 0.4, K.L + 2))} />
          <Membrana T={T} y={990} flex={flex} />
        </>)}
      </Escena>
      {/* 8 · congelador: −18 °C los duerme; al descongelar, despiertan */}
      <Escena T={T} a={K.Co} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {viaje > 0 && <rect x={560} y={760} width={500} height={420} rx={40} fill="rgba(255,138,31,.35)" opacity={viaje} />}
          {viaje > 0 && <g opacity={viaje}><circle cx={940} cy={820} r={60} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />{Array.from({ length: 8 }, (_, i) => <line key={i} x1={940 + Math.cos(i * 0.785) * 76} y1={820 + Math.sin(i * 0.785) * 76} x2={940 + Math.cos(i * 0.785) * 100} y2={820 + Math.sin(i * 0.785) * 100} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}</g>}
          <Congelador T={T} x={60} y={560} w={470} h={600} />
          {(() => { const x = klerp(295, 780, viaje), y = klerp(900, 1000, viaje) - Math.sin(viaje * Math.PI) * 120; return <g>
            <rect x={x - 110} y={y - 60} width={220} height={110} rx={16} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={6} />
            <rect x={x - 118} y={y - 76} width={236} height={24} rx={8} fill={MR.tapa} stroke={KC.ink} strokeWidth={5} />
            {viaje < 0.6 && <rect x={x - 110} y={y - 60} width={220} height={110} rx={16} fill="rgba(220,240,255,.55)" />}
            <ColoniaCara T={T} x={x} y={y} r={38} despierta={desp} />
            {desp < 0.5 && [0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <text key={k} x={x + 40 + u * 60} y={y - 70 - u * 90} style={{ font:`400 ${36 + k * 8}px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={4} paintOrder="stroke" opacity={1 - u}>Z</text>; })}
            {viaje > 0.6 && Array.from({ length: 4 }, (_, k) => { const u = ((T * 1.2 + k / 4) % 1); return <ellipse key={'g' + k} cx={x - 80 + k * 52} cy={y + 60 + u * 60} rx={7} ry={10} fill="#9ad7ff" stroke={KC.ink} strokeWidth={2} opacity={1 - u} />; })}
          </g>; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio: 293 refris en Italia; el moho, más en el fondo */}
      <Escena T={T} a={K.Es} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const o = kprog(T, K.Es + 2.3, K.Es + 2.6) * (1 - kprog(T, K.Es + 4.0, K.Es + 4.4)); return o > 0 ? <g opacity={o}>{Array.from({ length: 293 }, (_, i) => <MiniRefri key={i} x={110 + (i % 20) * 29} y={655 + Math.floor(i / 20) * 31} on={i < marcados ? 1 : 0} />)}</g> : null; })()}
          {(() => { const o = kprog(T, K.Es + 4.1, K.Es + 4.5); return o > 0 ? <g opacity={o}><CorteRefri T={T} x={150} y={700} w={780} h={440} puntos={kprog(T, K.Es + 4.3, K.Es + 5.3)} esponja={kprog(T, K.Es + 4.4, K.Es + 6.4)} /></g> : null; })()}
        </>)}
      </Escena>
      {/* 10 · refris tibios: promedio 6.6 °C */}
      <Escena T={T} a={K.Ti} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<TermoRefri x={860} y={700} valor={klerp(4, 6.6, kprog(T, K.Ti + 0.4, K.Ti + 1.6, kEase.suave))} h={250} />)}
      </Escena>
      {/* 11 · lo que sí sirve */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform="translate(540 960) scale(0.52) translate(-520 -780)">
          <Refri T={T} abre={1} mohoM={0} mohoF={0} termo={4} fecha={T > K.S + 2.0 ? 'LUN' : null} sucio={1} limpio={kprog(T, K.S + 3.6, K.S + 5.6)} />
          {(() => { const u = kprog(T, K.S + 3.5, K.S + 5.7); return u > 0 && u < 1 ? <Esponja x={klerp(220, 820, 0.5 - 0.5 * Math.cos(u * Math.PI * 4))} y={RF.y1 - 60} s={1.3} /> : null; })()}
        </g>)}
      </Escena>
      {/* 12 · cierre: el mismo refri, limpio y a 4 °C */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 50%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Refri T={T} abre={1} mohoM={0} mohoF={0} termo={4} fecha="LUN" limpio={1} />
          <RelojArena x={470} y={575} s={0.32} p={kprog(T, K.C, K.Ou)} />
          <Sello T={T} at={K.C + 0.8} x={470} y={790} texto="4 °C" color={KC.leaf} r={78} />
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 3.0} until={K.F - 0.3} x={420} y={560} texto="sobras" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.F + 1.4} until={K.Pe - 0.3} valor={4} desde={12} dur={0.6} sufijo=" °C" x={560} y={470} tam={150} color={KC.white} />
      <Chip T={T} at={K.F + 0.4} until={K.Pe - 0.3} texto="la mayoría prefiere el calor" x={520} y={330} tam={30} borde={KC.orange} />
      <Chip T={T} at={K.F + 2.4} until={K.Pe - 0.3} texto="▶ varios siguen creciendo" x={430} y={1110} tam={30} borde={KC.yellow} />
      <Etq T={T} at={K.Pe + 0.4} until={K.Bo - 0.3} x={60} y={400} texto="Penicillium expansum" it tam={40} color={MR.peni2} />
      <Etq T={T} at={K.Pe + 0.7} until={K.Bo - 0.3} x={60} y={455} texto="moho azul de la manzana" tam={28} />
      <Chip T={T} at={K.Pe + 1.0} until={K.Bo - 0.3} texto="a 4 °C · estudio de 2015" x={850} y={720} tam={26} borde={KC.cyan} />
      <Chip T={T} at={K.Pe + 1.2} until={K.Pe + 3.6} texto="fase de espera" x={850} y={1060} tam={26} borde={KC.gold} />
      <Chip T={T} at={K.Pe + 3.7} until={K.Bo - 0.3} texto="…y crece" x={850} y={1060} tam={30} borde={KC.leaf} />
      <Etq T={T} at={K.Pe + 1.0} until={K.Pe + 3.6} x={330} y={1030} texto="esporas esperando" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.Pe + 5.0} until={K.Bo - 0.3} x={470} y={640} texto="conidios en cadena" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.Bo + 0.4} until={K.Bo + 1.4} x={170} y={460} texto="moho gris de la fresa" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Bo + 1.9} until={K.Cl - 0.3} x={60} y={400} texto="Botrytis cinerea" it tam={40} color={MR.gris} />
      <Etq T={T} at={K.Bo + 2.2} until={K.Cl - 0.3} x={60} y={455} texto="conidios en racimo" tam={28} />
      <Chip T={T} at={K.Bo + 3.0} until={K.Cl - 0.3} texto="estudio de 2001 · en laboratorio" x={760} y={640} tam={26} borde={KC.gold} />
      <Etq T={T} at={K.Bo + 3.2} until={K.Cl - 0.3} x={960} y={1145} lado="izq" texto="placa de cultivo" tam={24} />
      <NumeroGigante T={T} at={K.Cl + 0.4} until={K.P - 0.3} valor={6} dur={0.7} prefijo="−" sufijo=" °C" x={360} y={470} tam={180} color={MR.hielo} />
      <Chip T={T} at={K.Cl + 0.9} until={K.P - 0.3} texto="ya en 1923" x={360} y={610} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Cl + 1.6} until={K.P - 0.3} x={60} y={680} texto="Cladosporium herbarum" it tam={34} color={MR.oliva2} />
      <Etq T={T} at={K.Cl + 2.0} until={K.P - 0.3} x={470} y={1125} texto="la espora germina" tam={24} color={KC.gold2} />
      <div style={{ position:'absolute', left:0, right:0, top:380, zIndex:41, textAlign:'center', opacity:kprog(T, K.P, K.P + 0.3) * (1 - kprog(T, K.L - 0.2, K.L + 0.2)), font:`400 96px/1 ${KF.titulo}`, color:KC.white, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>¿PARA QUÉ SIRVE EL FRÍO?</div>
      <Chip T={T} at={K.L + 0.5} until={K.L + 3.0} texto="reacciones más lentas" x={400} y={760} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.L + 1.9} until={K.L + 3.3} texto="membrana rígida" x={540} y={1150} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.L + 3.4} until={K.Co - 0.3} texto="grasas insaturadas → membrana flexible" x={540} y={760} tam={28} borde={KC.mint} />
      <Chip T={T} at={K.L + 3.9} until={K.Co - 0.3} texto="así lo hacen los hongos del frío" x={540} y={1150} tam={28} borde={KC.mint} />
      <MitoTachado T={T} at={K.Co + 0.2} tacharEn={K.Co + 1.2} until={K.Es - 0.3} texto="EL CONGELADOR LOS MATA" x={380} y={430} tam={34} />
      <Chip T={T} at={K.Co + 1.4} until={K.Es - 0.3} texto="los duerme" x={295} y={705} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Co + 2.8} until={K.Es - 0.3} texto="al descongelar, despiertan" x={760} y={700} tam={28} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.2} anio="2014" quien="Padua, Italia" revista="Catellani y cols. · Food Control" x={380} y={600} />
      <NumeroGigante T={T} at={K.Es + 2.3} until={K.Es + 4.0} valor={293} dur={1.2} etiqueta="refris de casa" x={380} y={500} tam={170} color={KC.gold2} />
      <Chip T={T} at={K.Es + 4.4} until={K.Ti - 0.3} texto="moho: 2.5 veces más probable" x={400} y={480} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Es + 4.8} until={K.Ti - 0.3} texto="en el fondo que en las paredes" x={400} y={570} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.Es + 5.0} until={K.Ti - 0.3} x={560} y={1035} texto="fondo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Es + 5.2} until={K.Ti - 0.3} x={190} y={830} texto="paredes" tam={24} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ti + 0.3} until={K.S - 0.3} valor={6.6} desde={4} dec={1} dur={1.2} sufijo=" °C" etiqueta="promedio" x={380} y={640} tam={200} color={KC.white} />
      <MitoTachado T={T} at={K.Ti + 1.6} tacharEn={K.Ti + 2.2} until={K.S - 0.3} texto="4 °C" x={380} y={880} tam={52} />
      <Chip T={T} at={K.Ti + 2.4} until={K.S - 0.3} texto="rango: 1 a 11.3 °C" x={400} y={1030} tam={28} borde={KC.red} />
      <Chip T={T} at={K.Ti + 2.8} until={K.S - 0.3} texto="25 refris de casa · Univ. de Zagreb · 2020" x={540} y={1130} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.4} until={K.C - 0.3} texto="✓ 4 °C o menos" x={540} y={400} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.7} until={K.C - 0.3} texto="✓ sobras: 3 a 4 días" x={540} y={490} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 3.3} until={K.C - 0.3} texto="✓ limpiarlo cada pocos meses" x={540} y={580} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 3.8} until={K.C - 0.3} texto="1 cucharada de bicarbonato en ~1 L de agua" x={540} y={665} tam={24} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="el frío solo da tiempo" x={540} y={1150} tam={36} borde={KC.cyan} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Pe} texto="10 cm" largo={137} />
      <BarraEscala T={T} at={K.Pe} until={K.Bo} texto="10 µm" largo={60} />
      <BarraEscala T={T} at={K.Bo} until={K.Bo + 1.5} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.Bo + 1.5} until={K.Cl} texto="10 µm" largo={40} />
      <BarraEscala T={T} at={K.Cl} until={K.P} texto="10 µm" largo={140} />
      <BarraEscala T={T} at={K.L} until={K.Co} texto="10 nm (membrana)" largo={130} />
      <BarraEscala T={T} at={K.Co} until={K.Es} texto="50 cm" largo={390} />
      <BarraEscala T={T} at={K.Es + 4.1} until={K.Ti} texto="50 cm" largo={650} />
      <BarraEscala T={T} at={K.S} until={K.C} texto="50 cm" largo={360} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={137} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="Tu refri no mata al moho: *lo pone en pausa.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Pe - 0.1} texto="Varios mohos *crecen a 4 °C.*" />
      <Subtitulo T={T} idx={2} at={K.Pe + 0.1} until={K.Bo - 0.1} texto="A 4 °C tardó 6 días… *y creció.*" />
      <Subtitulo T={T} idx={3} at={K.Bo + 0.1} until={K.Cl - 0.1} texto="El moho gris: *creció a −4 °C.*" />
      <Subtitulo T={T} idx={4} at={K.Cl + 0.1} until={K.P - 0.1} texto="Ya en 1923: *germinaban a −6 °C.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.L - 0.1} texto="¿Para qué sirve *el frío?*" />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.Co - 0.1} texto="Frena reacciones y *endurece membranas.*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.Es - 0.1} texto="Los duerme, *no los mata.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Ti - 0.1} texto="Moho: 2.5 veces más *en el fondo.*" />
      <Subtitulo T={T} idx={9} at={K.Ti + 0.1} until={K.S - 0.1} texto="Promedio: 6.6 °C, *no 4.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.C - 0.1} texto="4 °C, sobras en 3–4 días *y limpiar.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="El frío solo *le da tiempo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Pe + 2.1, K.Pe + 6.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Cl + 0.45, K.Cl + 3.85, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.P + 2.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Co + 0.1, K.Co + 3.9, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Es + 0.9, K.Es + 6.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ti + 0.3, K.Ti + 4.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.S + 0.45, K.S + 5.65, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.C + 0.05, K.C + 3.75, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="88" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MohoRefriApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MohoRefriShot /></CompositionStage></div>;
}
window.MohoRefriApp = MohoRefriApp;
