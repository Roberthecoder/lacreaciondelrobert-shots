// Shot Fungi Mati #87 · Esa madera no está vieja: se la está comiendo un hongo que llora — NARRADO (gancho 1 "Esto no es X: es Y" + N1 por dentro).
// La pudrición seca, Serpula lacrymans. Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PS = {
  yeso:'#f1e7d3', yesoNuevo:'#f8f3e6', ladrillo:'#c9673f', ladrillo2:'#b55a35', mortero:'#e4d6c0', mancha:'#7d6a4c',
  madera:'#d9a066', madera2:'#c48a52', vetas:'#a8703c', nueva:'#ecc690', nueva2:'#ddb27a',
  podrida:'#7b4a26', podrida2:'#5e381c', grieta:'#2e1b0e', micelio:'#f6f3ec', micLila:'#e6dcef', micAma:'#f1e6b4',
  cordon:'#d8d3c8', oxido:'#a4532a', oxido2:'#7a3a1a', oxido3:'#c8703f', espora:'#9a4a22', agua:'#9ad7ff', nutri:'#6fe07a',
  tubo:'#9aa3ad', sotano:'#2e221a', tierra:'#4a3524', noche:'#0d1424',
};
const CASA = { x0: 40, x1: 1040, y0: 330, y1: 1990, muro: 880, piso: 905, piso2: 955, viga0: 975, viga1: 1055 };
const ZONA = { a: 110, b: 560 }; // tramo podrido de la viga y del piso

// Recorre una polilínea hasta la fracción p de su largo: devuelve el trazo y la punta.
function parcialPts(pts, p) {
  const L = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let falta = tot * kclamp(p, 0, 1); const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (falta >= L[i - 1]) { out.push(pts[i]); falta -= L[i - 1]; continue; }
    const u = falta / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break;
  }
  return { d: 'M ' + out.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L '), fin: out[out.length - 1], tot };
}
// Punto a la fracción u de una polilínea.
function puntoEn(pts, u) { const r = parcialPts(pts, u); return r.fin; }

// Ladrillos expuestos (donde se cayó el yeso).
const HUECO = [[60, 600], [140, 560], [260, 578], [420, 540], [560, 584], [606, 700], [584, 880], [60, 880]];
const huecoD = 'M ' + HUECO.map((q) => q.join(' ')).join(' L ') + ' Z';

// Cordones (rizomorfos) que suben de la viga por el ladrillo y el yeso.
const CORDONES = [
  [[300, 985], [286, 900], [250, 800], [206, 700], [160, 610], [132, 520], [126, 430]],
  [[390, 985], [404, 900], [436, 800], [470, 712], [522, 630], [588, 566], [640, 486], [700, 420]],
  [[340, 985], [338, 900], [318, 812], [352, 730], [334, 650], [360, 590]],
  [[470, 985], [500, 920], [560, 870], [640, 850], [740, 846], [840, 830]],
];
// Grietas en cubo del tramo podrido (viga y frente del piso).
const GRIETAS = (() => {
  const g = krng(87), out = [];
  [995, 1015, 1036].forEach((y) => out.push({ d: `M ${ZONA.a + 10} ${y} L ${ZONA.b - 10} ${y + (g() - 0.5) * 6}`, u: g() * 0.5 }));
  for (let f = 0; f < 4; f++) { const y0 = [975, 995, 1015, 1036][f], y1 = [995, 1015, 1036, 1055][f];
    for (let x = ZONA.a + 18 + g() * 20; x < ZONA.b - 10; x += 26 + g() * 14) out.push({ d: `M ${x} ${y0} L ${x + (g() - 0.5) * 6} ${y1}`, u: g() }); }
  for (let x = ZONA.a + 12; x < ZONA.b - 10; x += 30 + g() * 16) out.push({ d: `M ${x} ${CASA.piso + 4} L ${x - 14} ${CASA.piso2}`, u: g() });
  return out;
})();
// Micelio algodonoso (blanco con tintes lila y amarillo) sobre la viga y la base del muro.
const MICELIO = (() => {
  const g = krng(19), out = [];
  for (let i = 0; i < 70; i++) { const a = g() * Math.PI * 2, d = Math.sqrt(g()); out.push({ x: 330 + Math.cos(a) * d * 150, y: 1012 + Math.sin(a) * d * 40, r: 14 + g() * 18, c: g(), u: d * 0.8 + g() * 0.2 }); }
  for (let i = 0; i < 34; i++) { const a = g() * Math.PI * 2, d = Math.sqrt(g()); out.push({ x: 300 + Math.cos(a) * d * 120, y: 872 + Math.sin(a) * d * 22, r: 10 + g() * 14, c: g(), u: 0.3 + d * 0.6 }); }
  return out;
})();
const GOTAS_MIC = [[250, 1000], [330, 1024], [410, 1004], [290, 1036], [370, 990], [230, 872], [340, 866]];

function Cordones({ T, p = 1, flujo = 0, o = 1 }) {
  if (p <= 0 || o <= 0) return null;
  return <g opacity={o}>{CORDONES.map((pts, i) => {
    const pi = kprog(p, i * 0.12, 0.6 + i * 0.12), r = parcialPts(pts, pi);
    if (pi <= 0) return null;
    const [fx, fy] = r.fin;
    return <g key={i}>
      <path d={r.d} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={r.d} stroke={PS.cordon} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={r.d} stroke="#f7f4ee" strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="16 22" opacity=".8" />
      {/* punta en abanico: micelio fino que explora */}
      {pi < 1 && [-0.9, -0.45, 0, 0.45, 0.9].map((a, k) => { const ang = Math.atan2(fy - pts[0][1], fx - pts[0][0]) + a; return <line key={k} x1={fx} y1={fy} x2={fx + Math.cos(ang) * 34} y2={fy + Math.sin(ang) * 34} stroke="#fbf8f2" strokeWidth={3} strokeLinecap="round" />; })}
      {flujo > 0 && Array.from({ length: 7 }, (_, k) => { const u = ((T * 0.28 + k / 7 + i * 0.13) % 1) * pi; const [x, y] = puntoEn(pts, u);
        return <circle key={'f' + k} cx={x} cy={y} r={6.5} fill={k % 2 ? PS.nutri : PS.agua} stroke={KC.ink} strokeWidth={2} opacity={flujo} />; })}
    </g>;
  })}</g>;
}

// Cuerpo fructífero plano, pegado al muro: color óxido, margen blanco, superficie con pliegues y cráteres (sin sombrero ni tallo).
function Fruto({ x, y, s = 1, crece = 1, T = 0, seed = 4, rx = 110, ry = 74 }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece, 0, 1)), g = krng(seed), n = 26;
  const borde = Array.from({ length: n }, () => 0.86 + g() * 0.2);
  const forma = (f) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return `${i ? 'L' : 'M'} ${(Math.cos(a) * rx * f * borde[i]).toFixed(1)} ${(Math.sin(a) * ry * f * borde[i]).toFixed(1)}`; }).join(' ') + ' Z';
  const pliegues = [0.62, 0.42, 0.24].map((f, j) => { const pts = Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2, w = 1 + Math.sin(a * 7 + j * 2) * 0.12;
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * rx * f * w + j * 6).toFixed(1)} ${(Math.sin(a) * ry * f * w - j * 4).toFixed(1)}`; }).join(' ') + ' Z'; return pts; });
  const crateres = Array.from({ length: 22 }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 0.66; return [Math.cos(a) * rx * d, Math.sin(a) * ry * d, 4 + g() * 5]; });
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d={forma(1.06)} fill="rgba(0,0,0,.25)" transform="translate(6 8)" />
    <path d={forma(1)} fill="#f4efe6" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={forma(0.8)} fill={PS.oxido} stroke={PS.oxido2} strokeWidth={3} />
    {pliegues.map((d, j) => <path key={j} d={d} fill="none" stroke={j % 2 ? PS.oxido3 : PS.oxido2} strokeWidth={5} strokeLinejoin="round" />)}
    {crateres.map(([cx, cy, r], i) => <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.7} fill={PS.oxido2} stroke={PS.oxido3} strokeWidth={1.5} />)}
  </g>;
}

// Bota y pierna (pisa el piso). x = centro de la suela, y = suela.
function Bota({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-620} width={92} height={540} fill="#3c5a8c" stroke={KC.ink} strokeWidth={6} />
    <line x1={-10} y1={-600} x2={-10} y2={-100} stroke="#2c4470" strokeWidth={4} />
    <path d="M -50 -110 L 46 -110 L 50 -46 Q 120 -40 128 -10 L 128 0 L -56 0 L -56 -40 Z" fill="#6b3b1f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-58} y={-10} width={190} height={12} rx={5} fill="#2a1a10" />
  </g>;
}

// Medidor de humedad de la madera (de dos puntas). v 0..1 → seca..muy húmeda.
function MedidorMadera({ x, y, v = 0, texto }) {
  const col = v > 0.6 ? KC.red : v > 0.35 ? KC.orange : KC.leaf;
  return <g transform={`translate(${x} ${y})`}>
    <line x1={-30} y1={60} x2={-40} y2={128} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <line x1={30} y1={60} x2={40} y2={128} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <rect x={-120} y={-90} width={240} height={160} rx={26} fill="#ffd36e" stroke={KC.ink} strokeWidth={7} />
    <rect x={-96} y={-68} width={192} height={74} rx={10} fill="#dfe9d6" stroke={KC.ink} strokeWidth={5} />
    <rect x={-86} y={-18} width={172 * v} height={14} rx={6} fill={col} />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
    <circle cx={-60} cy={38} r={12} fill={KC.ink} /><circle cx={60} cy={38} r={12} fill={KC.ink} />
  </g>;
}

// Rejilla de ventilación con aire que entra.
function Rejilla({ T, x, y, o = 1, aire = 0 }) {
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-44} width={180} height={88} rx={10} fill="#e9eef1" stroke={KC.ink} strokeWidth={6} />
    {[-24, -6, 12, 30].map((yy) => <line key={yy} x1={-72} y1={yy} x2={72} y2={yy} stroke={KC.ink} strokeWidth={6} />)}
    {aire > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <path key={k} d={`M ${-60 - u * 260} ${-20 + k * 22} q 30 -18 60 0 t 60 0`} stroke="#ffffff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={aire * Math.sin(u * Math.PI)} />; })}
  </g>;
}

// Serrucho.
function Serrucho({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -10 -20 L 230 -6 L 230 18 L -10 30 Z" fill="#cfd8dc" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${i * 20} ${28 - i * 0.9} l 10 10 l 10 -10`} fill="#cfd8dc" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-80} y={-34} width={80} height={70} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <rect x={-62} y={-14} width={42} height={28} rx={10} fill={KC.dark} />
  </g>;
}

// La casa en corte: muro de yeso y ladrillo, tubería, piso de duela, viga y sótano. Todo se dibuja desde T.
function Casa({ T, id = 'casa', pud = 1, mic = 1, cor = 0, flujo = 0, fru = 0, esp = 0, polvo = 0, hum = 1, fuga = 0, arreglo = 0, vent = 0, nueva = 0, gotas = 0, bota = null, hunde = 0, sierra = null }) {
  const { x0, x1, y0, y1, muro, piso, piso2, viga0, viga1 } = CASA;
  const vivo = 1 - nueva;
  const dh = hunde * 14; // la duela podrida se hunde al pisarla
  return <g>
    <clipPath id={id + 'Clip'}><rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} /></clipPath>
    <clipPath id={id + 'Hueco'}><path d={huecoD} /></clipPath>
    <g clipPath={`url(#${id}Clip)`}>
      {/* muro de yeso */}
      <rect x={x0} y={y0} width={x1 - x0} height={muro - y0} fill={nueva > 0.5 ? PS.yesoNuevo : PS.yeso} />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={x0} y1={y0 + 40 + i * 90} x2={x1} y2={y0 + 40 + i * 90} stroke="rgba(0,0,0,.04)" strokeWidth={30} />)}
      {/* ladrillo expuesto */}
      <g clipPath={`url(#${id}Hueco)`}>
        <rect x={40} y={520} width={600} height={380} fill={PS.mortero} />
        {Array.from({ length: 9 }, (_, f) => Array.from({ length: 8 }, (_, c) => <rect key={f + '-' + c} x={40 + c * 84 - (f % 2) * 42} y={540 + f * 40} width={78} height={34} rx={3} fill={(f + c) % 3 ? PS.ladrillo : PS.ladrillo2} />))}
      </g>
      <path d={huecoD} fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {/* mancha de humedad */}
      {hum > 0 && <g opacity={hum}>
        <ellipse cx={330} cy={830} rx={300} ry={150} fill={PS.mancha} opacity=".28" />
        <ellipse cx={330} cy={850} rx={220} ry={100} fill={PS.mancha} opacity=".22" />
        <path d="M 40 700 Q 180 660 330 690 Q 520 650 640 720" stroke={PS.mancha} strokeWidth={8} fill="none" opacity=".4" />
      </g>}
      {/* cordones y cuerpo fructífero (se van con la madera nueva) */}
      <Cordones T={T} p={cor} flujo={flujo} o={vivo} />
      {fru > 0 && vivo > 0 && <g opacity={vivo}><Fruto T={T} x={340} y={700} crece={fru} /></g>}
      {/* rejilla de ventilación */}
      <Rejilla T={T} x={880} y={800} o={vent} aire={vent} />
      {/* tubería con fuga */}
      <rect x={x0} y={398} width={640} height={40} fill={PS.tubo} stroke={KC.ink} strokeWidth={6} />
      <rect x={312} y={390} width={40} height={56} rx={6} fill="#7c878c" stroke={KC.ink} strokeWidth={5} />
      <path d="M 640 398 L 700 398 Q 720 398 720 418 L 720 330 L 680 330 L 680 398" fill={PS.tubo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {arreglo > 0 && <g opacity={arreglo}><rect x={300} y={384} width={64} height={68} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><circle cx={332} cy={418} r={8} fill={KC.ink} /></g>}
      {fuga > 0 && <Goteo T={T} x={332} y0={452} y1={piso} cada={0.42} color={PS.agua} r={11} />}
      {/* rodapié */}
      <rect x={x0} y={muro} width={x1 - x0} height={piso - muro} fill="#a8713e" stroke={KC.ink} strokeWidth={4} />
      {/* piso de duela */}
      <g transform={`translate(0 0)`}>
        <rect x={x0} y={piso} width={x1 - x0} height={piso2 - piso} fill={PS.madera} stroke={KC.ink} strokeWidth={5} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={x0 + 30 + i * 88} y1={piso} x2={x0 + 12 + i * 88} y2={piso2} stroke={PS.vetas} strokeWidth={4} />)}
        <rect x={x0} y={piso2} width={x1 - x0} height={viga0 - piso2} fill={PS.madera2} stroke={KC.ink} strokeWidth={4} />
      </g>
      {/* viga */}
      <rect x={x0} y={viga0} width={x1 - x0} height={viga1 - viga0} fill={PS.madera} stroke={KC.ink} strokeWidth={6} />
      {[990, 1010, 1030, 1044].map((y, i) => <path key={i} d={`M ${x0} ${y} Q 300 ${y + (i % 2 ? 6 : -6)} 560 ${y} T 1040 ${y}`} stroke={PS.vetas} strokeWidth={3} fill="none" opacity=".7" />)}
      {/* tramo podrido: café, agrietado en cubos, hundido */}
      {pud > 0 && vivo > 0 && <g opacity={vivo}>
        <g transform={`translate(0 ${dh})`}>
          <rect x={ZONA.a} y={piso} width={ZONA.b - ZONA.a} height={viga0 - piso} fill={PS.podrida} opacity={0.85 * pud} />
        </g>
        <rect x={ZONA.a} y={viga0} width={ZONA.b - ZONA.a} height={viga1 - viga0} fill={PS.podrida} opacity={0.85 * pud} />
        <path d={`M ${ZONA.a} ${viga0} Q ${(ZONA.a + ZONA.b) / 2} ${viga0 + 10} ${ZONA.b} ${viga0}`} fill="none" stroke={PS.podrida2} strokeWidth={6} opacity={pud} />
        {GRIETAS.map((gr, i) => { const o = kclamp(pud * 1.6 - gr.u * 0.6, 0, 1); return o > 0 ? <path key={i} d={gr.d} stroke={PS.grieta} strokeWidth={2 + 2.5 * o} strokeLinecap="round" opacity={o} transform={gr.d.includes(` ${CASA.piso2}`) ? `translate(0 ${dh})` : undefined} /> : null; })}
        {hunde > 0.5 && <path d={`M 360 ${piso + dh} L 380 ${piso + dh + 18} L 404 ${piso + dh + 4} L 430 ${piso + dh + 22} L 450 ${piso + dh}`} fill="none" stroke={PS.grieta} strokeWidth={5} strokeLinejoin="round" />}
      </g>}
      {/* madera nueva que reemplaza el tramo podrido */}
      {nueva > 0 && <g opacity={nueva}>
        <rect x={ZONA.a - 20} y={piso} width={ZONA.b - ZONA.a + 40} height={piso2 - piso} fill={PS.nueva} stroke={KC.ink} strokeWidth={4} />
        <rect x={ZONA.a - 20} y={piso2} width={ZONA.b - ZONA.a + 40} height={viga0 - piso2} fill={PS.nueva2} stroke={KC.ink} strokeWidth={4} />
        <rect x={ZONA.a - 20} y={viga0} width={ZONA.b - ZONA.a + 40} height={viga1 - viga0} fill={PS.nueva} stroke={KC.ink} strokeWidth={5} />
        {[992, 1014, 1036].map((y) => <line key={y} x1={ZONA.a - 10} y1={y} x2={ZONA.b + 10} y2={y + 2} stroke={PS.nueva2} strokeWidth={4} />)}
        {Array.from({ length: 6 }, (_, i) => <line key={'d' + i} x1={ZONA.a + 10 + i * 80} y1={piso} x2={ZONA.a - 8 + i * 80} y2={piso2} stroke={PS.nueva2} strokeWidth={4} />)}
      </g>}
      {/* micelio algodonoso con gotas */}
      {mic > 0 && vivo > 0 && <g opacity={vivo}>
        {MICELIO.map((m, i) => { const o = kclamp(mic * 1.5 - m.u * 0.5, 0, 1); return o > 0.02 ? <circle key={i} cx={m.x} cy={m.y} r={m.r * (0.5 + 0.5 * o)} fill={m.c < 0.62 ? PS.micelio : m.c < 0.82 ? PS.micLila : PS.micAma} opacity={0.92 * o} /> : null; })}
        {MICELIO.filter((m, i) => i % 3 === 0).map((m, i) => { const o = kclamp(mic * 1.5 - m.u * 0.5, 0, 1); return o > 0.3 ? <path key={'h' + i} d={`M ${m.x} ${m.y} q ${m.r} ${-m.r * 0.6} ${m.r * 1.8} ${-m.r * 0.2}`} stroke="#ffffff" strokeWidth={2.5} fill="none" opacity={o} /> : null; })}
        {gotas > 0 && GOTAS_MIC.map(([gx, gy], i) => { const o = kprog(gotas, i * 0.1, i * 0.1 + 0.35); return o > 0 ? <g key={'g' + i}>
          <ellipse cx={gx} cy={gy} rx={7 * o + 2} ry={9 * o + 2} fill="rgba(170,225,255,.85)" stroke={KC.ink} strokeWidth={2} />
          <circle cx={gx - 2.5} cy={gy - 3} r={2.5 * o} fill="#fff" /></g> : null; })}
      </g>}
      {/* polvo de esporas sobre el piso */}
      {polvo > 0 && <g opacity={polvo * vivo}>
        <path d={`M 120 ${piso + 2} Q 340 ${piso - 6} 640 ${piso + 2} L 640 ${piso + 14} L 120 ${piso + 14} Z`} fill={PS.espora} opacity=".9" />
        {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={130 + i * 17} cy={piso + 6 + (i % 3) * 3} r={3} fill={PS.oxido2} />)}
      </g>}
      {/* nube de esporas que cae del cuerpo fructífero */}
      {esp > 0 && esp < 1 && (() => { const g = krng(66); return Array.from({ length: 70 }, (_, i) => { const d = g(), sx = 250 + g() * 180, u = kclamp(esp * 1.5 - d * 0.5, 0, 1); if (u <= 0 || u >= 1) return null;
        return <circle key={i} cx={sx + Math.sin(u * 6 + i) * 30 + (g() - 0.5) * 120 * u} cy={klerp(730, piso - 4, u)} r={3.5} fill={PS.espora} opacity={Math.sin(u * Math.PI) * 0.95} />; }); })()}
      {/* sótano */}
      <rect x={x0} y={viga1} width={x1 - x0} height={y1 - viga1} fill={PS.sotano} />
      <path d={`M ${x0} 1170 Q 300 1150 600 1168 T 1040 1160 L 1040 ${y1} L 40 ${y1} Z`} fill={PS.tierra} />
      {[1240, 1400, 1560, 1720].map((y, i) => <path key={y} d={`M ${x0} ${y} Q 300 ${y - 20 + i * 6} 600 ${y + 8} T 1040 ${y - 6}`} stroke="rgba(0,0,0,.22)" strokeWidth={10} fill="none" />)}
      {(() => { const g = krng(12); return Array.from({ length: 26 }, (_, i) => <ellipse key={i} cx={60 + g() * 960} cy={1200 + g() * 760} rx={10 + g() * 22} ry={7 + g() * 14} fill={g() < 0.5 ? '#6b5038' : '#5a4330'} stroke="rgba(0,0,0,.35)" strokeWidth={3} />); })()}
      <rect x={760} y={1160} width={130} height={40} fill="#8a8f99" stroke={KC.ink} strokeWidth={5} />
      <rect x={780} y={viga1} width={90} height={110} fill={PS.ladrillo2} stroke={KC.ink} strokeWidth={5} />
      {[1078, 1100, 1122, 1144].map((y) => <line key={y} x1={780} y1={y} x2={870} y2={y} stroke={PS.mortero} strokeWidth={3} />)}
      {sierra && <Serrucho x={sierra.x} y={sierra.y} rot={sierra.rot || 0} />}
      {bota && <Bota x={bota.x} y={bota.y + dh} />}
    </g>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" stroke={KC.ink} strokeWidth={9} rx={6} />
  </g>;
}

// Al microscopio: células de la madera (tubos) con pared de celulosa (blanca) y lignina (café); hifas que entran por adentro.
const TUBOS = Array.from({ length: 6 }, (_, i) => ({ x: 90 + i * 150, w: 150, t0: [0.2, 0.9, 0.5, 1.4, 0.1, 1.1][i], hifa: [true, true, false, true, true, false][i] }));
function MaderaMicro({ T, a }) {
  const y0 = 380, y1 = 1190;
  return <g>
    {TUBOS.map((tb, i) => { const come = kprog(T, a + tb.t0 + 0.9, a + tb.t0 + 3.2) * (tb.hifa ? 1 : 0.55); const x = tb.x + 8, w = tb.w - 16;
      return <g key={i}>
        <rect x={x} y={y0} width={w} height={y1 - y0} rx={34} fill="#1a2234" stroke={mixHex('#b07a45', '#6e4220', come)} strokeWidth={12} />
        <rect x={x + 12} y={y0 + 12} width={w - 24} height={y1 - y0 - 24} rx={24} fill="none" stroke="#f3efe2" strokeWidth={kclamp(14 * (1 - come), 0.01, 14)} opacity={1 - come * 0.9} />
        {[0, 1, 2, 3, 4].map((k) => <g key={k}><ellipse cx={x + 3} cy={y0 + 110 + k * 150} rx={9} ry={16} fill="#1a2234" stroke="#c99b62" strokeWidth={3} />
          <ellipse cx={x + w - 3} cy={y0 + 185 + k * 150} rx={9} ry={16} fill="#1a2234" stroke="#c99b62" strokeWidth={3} /></g>)}
      </g>; })}
    {TUBOS.map((tb, i) => { if (!tb.hifa) return null; const p = kprog(T, a + tb.t0, a + tb.t0 + 2.6, kEase.suave); if (p <= 0) return null;
      const cx = tb.x + tb.w / 2, pts = Array.from({ length: 18 }, (_, k) => [cx + Math.sin(k * 0.9 + i) * 16, y0 - 20 + k * 50]);
      const r = parcialPts(pts, p), [fx, fy] = r.fin;
      const sept = Array.from({ length: 14 }, (_, k) => k / 14).filter((u) => u < p - 0.04).map((u) => puntoEn(pts, u));
      const g = krng(i + 40);
      return <g key={'h' + i}>
        <path d={r.d} stroke={KC.ink} strokeWidth={17} fill="none" strokeLinecap="round" />
        <path d={r.d} stroke="#eafff7" strokeWidth={10} fill="none" strokeLinecap="round" />
        {sept.map(([sx, sy], k) => <line key={k} x1={sx - 7} y1={sy} x2={sx + 7} y2={sy} stroke={KC.ink} strokeWidth={3} />)}
        {/* rama que cruza por una puntuación a la célula de al lado */}
        {p > 0.55 && (() => { const [bx, by] = puntoEn(pts, 0.5), q = kprog(p, 0.55, 0.85); const dir = i % 2 ? -1 : 1; return <g>
          <line x1={bx} y1={by} x2={bx + dir * 120 * q} y2={by + 30 * q} stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />
          <line x1={bx} y1={by} x2={bx + dir * 120 * q} y2={by + 30 * q} stroke="#eafff7" strokeWidth={7} strokeLinecap="round" /></g>; })()}
        <circle cx={fx} cy={fy} r={9} fill="#ffffff" style={{ filter:'drop-shadow(0 0 8px #eafff7)' }} />
        {/* enzimas que salen de la hifa hacia la pared */}
        {Array.from({ length: 10 }, (_, k) => { const u = (k / 10) * p, [ex, ey] = puntoEn(pts, u), s = ((T * 0.9 + g()) % 1), side = k % 2 ? 1 : -1;
          return <circle key={'e' + k} cx={ex + side * s * (tb.w / 2 - 22)} cy={ey + 10} r={5} fill={KC.gold2} opacity={(1 - s) * 0.9} />; })}
      </g>; })}
  </g>;
}

// Trozo de viga (3D sencillo) que se seca y se parte en cubos.
function BloqueCubos({ T, a }) {
  const g = krng(8), lineas = [];
  for (let f = 0; f < 4; f++) { const y = 640 + f * 85; if (f) lineas.push({ d: `M 160 ${y} L 920 ${y + (g() - 0.5) * 8}`, t: a + 0.1 * f }); }
  for (let f = 0; f < 4; f++) for (let x = 230 + (f % 2) * 50; x < 900; x += 100 + g() * 20) lineas.push({ d: `M ${x} ${640 + f * 85} L ${x + (g() - 0.5) * 10} ${725 + f * 85}`, t: a + 0.2 + g() * 0.9 });
  for (let k = 0; k < 7; k++) { const x = 270 + k * 105; lineas.push({ d: `M ${x} 640 L ${x + 80} 560`, t: a + 0.3 + g() * 0.8 }); }
  lineas.push({ d: 'M 200 600 L 960 600', t: a + 0.4 });
  for (let k = 0; k < 3; k++) { const y = 690 + k * 90; lineas.push({ d: `M 920 ${y} L 1000 ${y - 80}`, t: a + 0.5 + k * 0.2 }); }
  const enc = kprog(T, a, a + 1.4) * 0.02;
  return <g transform={`translate(540 770) scale(${1 - enc}) translate(-540 -770)`}>
    <path d="M 160 640 L 240 560 L 1000 560 L 920 640 Z" fill="#94603a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 920 640 L 1000 560 L 1000 900 L 920 980 Z" fill="#5e381c" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={160} y={640} width={760} height={340} fill={PS.podrida} stroke={KC.ink} strokeWidth={7} />
    {lineas.map((l, i) => { const o = kprog(T, l.t, l.t + 0.5); return o > 0 ? <path key={i} d={l.d} stroke={PS.grieta} strokeWidth={3 + 6 * o} strokeLinecap="round" opacity={o} /> : null; })}
    {/* un poco de micelio blanco en la orilla */}
    {[[180, 960, 26], [214, 948, 18], [250, 966, 22], [176, 920, 16]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={PS.micelio} opacity=".95" />)}
  </g>;
}

// Mapa esquemático de Eurasia y África (contorno simplificado a mano; el dibujo es esquemático).
const mp = (lon, lat) => [60 + (lon + 15) * 5.6, 720 + (75 - lat) * 6.1];
const EURASIA = [[-10,36],[-9,43],[-2,48],[-5,48],[0,50],[5,53],[8,57],[5,62],[12,66],[20,70],[30,70],[40,67],[60,69],[70,73],[80,73],[100,76],[110,74],[130,71],[150,70],[150,60],[140,55],[135,44],[130,42],[127,38],[122,40],[121,31],[118,24],[110,20],[108,16],[105,10],[100,13],[100,6],[103,1],[98,8],[97,17],[92,21],[88,22],[80,15],[77,8],[73,20],[67,25],[57,25],[56,27],[50,30],[48,28],[52,24],[56,24],[59,22],[52,16],[43,13],[35,28],[35,32],[28,36],[27,41],[23,37],[22,40],[15,38],[12,44],[8,44],[3,43],[-5,36],[-10,36]];
const AFRICA = [[-15,21],[-10,30],[-6,35],[10,37],[20,32],[32,31],[35,28],[43,12],[51,12],[42,0],[10,0],[9,4],[-8,5],[-15,14]];
const JAPON = [[130,31],[135,34],[140,35],[142,40],[141,45],[139,41],[135,35.5],[131,34]];
const ASIA_RESALTA = [[60,69],[70,73],[80,73],[100,76],[110,74],[130,71],[150,70],[150,60],[140,55],[135,44],[130,42],[127,38],[122,40],[121,31],[118,24],[110,20],[108,16],[105,10],[100,13],[100,6],[103,1],[98,8],[97,17],[92,21],[88,22],[80,15],[77,8],[73,20],[67,25],[60,25],[60,69]];
const poli = (pts) => 'M ' + pts.map(([a, b]) => mp(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function MapaEurasia({ T, asia = 0, pin = 0 }) {
  const [hx, hy] = mp(78, 32);
  return <g>
    <clipPath id="mapaClip"><rect x={60} y={720} width={960} height={460} rx={24} /></clipPath>
    <rect x={60} y={720} width={960} height={460} rx={24} fill="#7fd3f7" stroke={KC.ink} strokeWidth={8} />
    <g clipPath="url(#mapaClip)">
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M 60 ${760 + i * 76} q 40 -10 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} stroke="rgba(255,255,255,.35)" strokeWidth={4} fill="none" />)}
      <path d={poli(AFRICA)} fill="#f3e3a6" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={poli(EURASIA)} fill="#bfe3b4" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={poli(ASIA_RESALTA)} fill={KC.gold2} opacity={asia * 0.85} />
      <path d={poli(JAPON)} fill="#bfe3b4" stroke={KC.ink} strokeWidth={4} />
      {asia > 0 && <text x={mp(100, 50)[0]} y={mp(100, 50)[1]} textAnchor="middle" style={{ font:`400 ${74}px ${KF.titulo}` }} fill={KC.ink} opacity={asia}>ASIA</text>}
      {/* Himalaya */}
      {pin > 0 && <g opacity={pin} transform={`translate(${hx} ${hy})`}>
        {[-40, 0, 40].map((dx, i) => <path key={i} d={`M ${dx - 34} 18 L ${dx} ${-34 - (i === 1 ? 14 : 0)} L ${dx + 34} 18 Z`} fill="#8a8f99" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />)}
        {[-40, 0, 40].map((dx, i) => <path key={'n' + i} d={`M ${dx - 12} ${-14 - (i === 1 ? 6 : 0)} L ${dx} ${-34 - (i === 1 ? 14 : 0)} L ${dx + 12} ${-14 - (i === 1 ? 6 : 0)} Z`} fill="#ffffff" />)}
        <g transform={`translate(0 ${-70 - Math.abs(Math.sin(T * 4)) * 10})`}><path d="M 0 30 C -26 0 -22 -26 0 -26 C 22 -26 26 0 0 30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cy={-8} r={8} fill="#fff" /></g>
      </g>}
    </g>
  </g>;
}

// Bosque de montaña del Himalaya con un tronco caído y el hongo silvestre.
function Himalaya({ T, o = 1, hongo = 0 }) {
  if (o <= 0) return null;
  return <g opacity={o}>
    <rect x={0} y={700} width={KW} height={400} fill="#cdeefc" />
    {[[180, 1180, 520, 360], [520, 1180, 760, 470], [880, 1180, 560, 380]].map(([x, y, h, w], i) => <g key={i}>
      <path d={`M ${x - w} ${y} L ${x} ${y - h} L ${x + w} ${y} Z`} fill={['#8a93a3', '#6f7a8c', '#9aa3b2'][i]} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${x - w * 0.3} ${y - h * 0.7} L ${x} ${y - h} L ${x + w * 0.3} ${y - h * 0.7} L ${x + w * 0.12} ${y - h * 0.62} L ${x - w * 0.05} ${y - h * 0.72} L ${x - w * 0.18} ${y - h * 0.62} Z`} fill="#ffffff" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>)}
    <rect x={0} y={1080} width={KW} height={900} fill="#3f8f4a" />
    {[80, 200, 330, 760, 880, 1000].map((x, i) => <Conifera key={i} T={T} x={x} y={1150} s={0.42 + (i % 3) * 0.06} seed={i} />)}
    {/* tronco caído con el hongo */}
    <g transform="translate(540 1150)">
      <rect x={-250} y={-60} width={500} height={70} rx={34} fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={250} cy={-25} rx={22} ry={35} fill="#c99b62" stroke={KC.ink} strokeWidth={6} />
      {[-180, -100, -20, 60, 140].map((x) => <line key={x} x1={x} y1={-50} x2={x + 40} y2={-10} stroke="#6b4422" strokeWidth={5} />)}
      {hongo > 0 && <g opacity={hongo}>
        {[[-130, -62, 26], [-96, -66, 20], [-160, -58, 16], [-66, -62, 14]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={PS.micelio} />)}
        <Fruto T={T} x={-30} y={-28} rx={60} ry={30} crece={hongo} seed={9} />
      </g>}
    </g>
  </g>;
}

// Barco de vela de madera.
function Barco({ T, x, y, s = 1 }) {
  const b = Math.sin(T * 2.4) * 6, r = Math.sin(T * 1.7) * 2;
  return <g transform={`translate(${x} ${y + b}) rotate(${r}) scale(${s})`}>
    {[[-120, -430, 220], [20, -500, 260], [150, -380, 190]].map(([mx, top, h], i) => <g key={i}>
      <rect x={mx - 7} y={top} width={14} height={-top - 40} fill="#6b4422" stroke={KC.ink} strokeWidth={4} />
      <path d={`M ${mx - 90} ${top + 30} Q ${mx} ${top + 10} ${mx + 90} ${top + 30} L ${mx + 80} ${top + h} Q ${mx} ${top + h - 22} ${mx - 80} ${top + h} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    </g>)}
    <path d="M 20 -500 L 20 -540 L 80 -525 L 20 -510" fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <path d="M -300 -60 L 300 -60 L 250 40 L -240 40 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-36, -12, 12].map((yy) => <line key={yy} x1={-290 + (yy + 36) * 0.4} y1={yy} x2={290 - (yy + 36) * 0.9} y2={yy} stroke="#5e3a1e" strokeWidth={4} />)}
    {[-180, -90, 0, 90, 180].map((xx) => <circle key={xx} cx={xx} cy={-30} r={9} fill="#3a2414" />)}
  </g>;
}

// Globo con franjas de clima: polar, templada (le gusta) y tropical (✗ en la naturaleza).
function GloboClimas({ T, x, y, r = 300, tropico = 0, templ = 0 }) {
  const band = (lat) => y - r * Math.sin(lat * Math.PI / 180);
  return <g>
    <clipPath id="globoClip"><circle cx={x} cy={y} r={r} /></clipPath>
    <circle cx={x} cy={y} r={r + 8} fill={KC.ink} />
    <g clipPath="url(#globoClip)">
      <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill="#7fd3f7" />
      <rect x={x - r} y={y - r} width={2 * r} height={band(66.5) - (y - r)} fill="#eef6fb" />
      <rect x={x - r} y={band(66.5)} width={2 * r} height={band(23.5) - band(66.5)} fill={mixHex('#9bd18f', '#3fbf4a', templ)} />
      <rect x={x - r} y={band(23.5)} width={2 * r} height={band(-23.5) - band(23.5)} fill="#ffb067" />
      <rect x={x - r} y={band(-23.5)} width={2 * r} height={band(-66.5) - band(-23.5)} fill={mixHex('#9bd18f', '#3fbf4a', templ)} />
      <rect x={x - r} y={band(-66.5)} width={2 * r} height={y + r - band(-66.5)} fill="#eef6fb" />
      {[23.5, -23.5, 66.5, -66.5].map((l) => <line key={l} x1={x - r} y1={band(l)} x2={x + r} y2={band(l)} stroke={KC.ink} strokeWidth={4} strokeDasharray="14 10" />)}
      <ellipse cx={x} cy={y} rx={r * 0.45} ry={r} fill="none" stroke="rgba(0,0,0,.18)" strokeWidth={4} />
      <ellipse cx={x} cy={y} rx={r * 0.85} ry={r} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth={4} />
    </g>
    <circle cx={x - r * 0.4} cy={y - r * 0.45} r={r * 0.18} fill="#fff" opacity=".25" />
    {templ > 0 && <g opacity={templ}>
      <text x={x} y={band(45) + 14} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Europa · Japón</text>
      <text x={x} y={band(-42) + 14} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Chile</text>
    </g>}
    {tropico > 0 && <g transform={`translate(${x} ${y}) scale(${klerp(1.8, 1, kEase.rebote(kclamp(tropico, 0, 1)))})`} opacity={kclamp(tropico * 3, 0, 1)}>
      <path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={26} strokeLinecap="round" />
      <path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" opacity=".25" />
    </g>}
  </g>;
}

// Termómetro sencillo.
function TermoSimple({ x, y, v = 0.5, texto }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-300} width={52} height={300} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-286 + 270 * (1 - v)} width={24} height={270 * v} rx={12} fill={KC.red} />
    <circle cy={20} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {texto && <text x={0} y={-320} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}

// Letrero del nombre: «lacrymans = que llora» (con el nombre en cursiva).
function LetreroNombre({ T, at, until, x = 60, y = 360 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`scale(${e.s}) rotate(-2deg)`, transformOrigin:'0 0', opacity:e.o,
    background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:22, padding:'12px 30px 16px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
    <div style={{ font:`italic 900 72px/1.05 ${KF.texto}`, color:PS.oxido }}>lacrymans</div>
    <div style={{ font:`900 52px/1.1 ${KF.texto}`, color:KC.ink }}>= «que llora»</div>
  </div>;
}

function PudricionSecaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Humedad, Cu: CUES.Cubos, Co: CUES.Cordones, Go: CUES.Gotas, F: CUES.Fruto, P: CUES.Pregunta, Es: CUES.Estudio, B: CUES.Barcos, Te: CUES.Templado, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // la bota pisa el piso podrido en el gancho (y el piso nuevo en el cierre)
  const pisa = (t0) => { const u = kprog(T, t0, t0 + 0.45, kEase.sale); return { x: 400, y: klerp(CASA.y0 - 40, CASA.piso, u) }; };
  const hundeG = kprog(T, K.G + 0.55, K.G + 0.8, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la viga café y agrietada; la bota pisa y se hunde; micelio blanco con una gota */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05} origen="35% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Casa T={T} id="cG" pud={1} mic={1} hum={1} gotas={kprog(T, K.G + 1.2, K.G + 3.2)} bota={pisa(K.G + 0.1)} hunde={hundeG} />
          <Sello T={T} at={K.G + 2.3} x={220} y={560} texto="HONGO" color={KC.red} r={105} />
        </>)}
      </Escena>
      {/* 2 · solo arranca en madera muy húmeda: la fuga gotea y el medidor sube */}
      <Escena T={T} a={K.H} b={K.Cu} zoom={0.04} origen="35% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Casa T={T} id="cH" pud={1} mic={klerp(0.8, 1, kprog(T, K.H, K.Cu))} hum={1} fuga={1} gotas={1} />
          {T > K.H + 1.4 && <g opacity={kprog(T, K.H + 1.4, K.H + 1.8)}><MedidorMadera x={760} y={845} v={kprog(T, K.H + 1.6, K.H + 3.0, kEase.suave) * 0.92} texto={kprog(T, K.H + 1.6, K.H + 3.0) > 0.7 ? 'MUY HÚMEDA' : 'midiendo…'} /></g>}
        </>)}
      </Escena>
      {/* 3 · al microscopio: las hifas se comen la celulosa y queda la lignina; luego el trozo se parte en cubos */}
      <Escena T={T} a={K.Cu} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:PS.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Cu + 3.0, K.Cu + 3.5)}><MaderaMicro T={T} a={K.Cu} /></g>
          {T > K.Cu + 3.0 && <g opacity={kprog(T, K.Cu + 3.0, K.Cu + 3.5)}><BloqueCubos T={T} a={K.Cu + 3.4} /></g>}
        </>)}
      </Escena>
      {/* 4 · cordones gruesos que avanzan varios metros por el ladrillo y el yeso */}
      <Escena T={T} a={K.Co} b={K.Go} zoom={0.04} origen="30% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Casa T={T} id="cC" pud={1} mic={1} hum={1} cor={kprog(T, K.Co + 0.2, K.Co + 4.6, kEase.suave)} flujo={kprog(T, K.Co + 3.0, K.Co + 3.6)} />
          {/* cinta métrica */}
          {(() => { const u = kprog(T, K.Co + 1.6, K.Co + 2.6, kEase.sale); return u > 0 ? <g>
            <rect x={56} y={klerp(975, 400, u)} width={36} height={975 - klerp(975, 400, u)} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
            {Array.from({ length: 23 }, (_, i) => { const yy = 975 - i * 26; return yy > klerp(975, 400, u) ? <line key={i} x1={56} y1={yy} x2={i % 4 ? 70 : 82} y2={yy} stroke={KC.ink} strokeWidth={3} /> : null; })}
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 5 · de cerca: el micelio suelta gotas («lacrymans» = que llora) */}
      <Escena T={T} a={K.Go} b={K.F} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={-20} y={900} width={KW + 40} height={1100} fill={PS.podrida} stroke={KC.ink} strokeWidth={8} />
          {[960, 1030, 1110, 1180, 1290, 1400, 1510, 1620, 1730, 1840].map((y) => <line key={y} x1={0} y1={y} x2={KW} y2={y + 6} stroke={PS.grieta} strokeWidth={6} />)}
          {[120, 300, 470, 650, 820, 990].map((x, i) => <line key={x} x1={x + (i % 2) * 40} y1={900} x2={x + (i % 2) * 40 - 8} y2={1960} stroke={PS.grieta} strokeWidth={6} />)}
          {(() => { const g = krng(31); return Array.from({ length: 120 }, (_, i) => { const a = g() * Math.PI * 2, d = Math.sqrt(g()); const x = 560 + Math.cos(a) * d * 430, y = 860 + Math.sin(a) * d * 170, c = g();
            return <circle key={i} cx={x} cy={y} r={30 + g() * 34} fill={c < 0.62 ? PS.micelio : c < 0.82 ? PS.micLila : PS.micAma} opacity=".95" />; }); })()}
          {(() => { const g = krng(32); return Array.from({ length: 40 }, (_, i) => { const a = g() * Math.PI * 2, x = 560 + Math.cos(a) * 450, y = 860 + Math.sin(a) * 180;
            return <path key={i} d={`M ${x} ${y} q ${Math.cos(a) * 30} ${Math.sin(a) * 20 - 10} ${Math.cos(a) * 60} ${Math.sin(a) * 30}`} stroke="#ffffff" strokeWidth={4} fill="none" strokeLinecap="round" />; }); })()}
          {[[300, 820, 0.4], [520, 760, 0.7], [700, 840, 1.0], [430, 900, 1.3], [830, 780, 1.6], [610, 930, 1.9], [240, 920, 2.2], [880, 900, 2.5]].map(([x, y, t0], i) => { const g = kprog(T, K.Go + t0, K.Go + t0 + 0.8, kEase.sale);
            if (g <= 0) return null; const r = 14 + (i % 3) * 6; const cae = i % 3 === 1 ? kprog(T, K.Go + t0 + 1.2, K.Go + t0 + 2.0, kEase.suave) : 0;
            return <g key={i}><ellipse cx={x} cy={y + cae * 120} rx={r * g} ry={r * 1.15 * g + cae * 8} fill="rgba(170,225,255,.85)" stroke={KC.ink} strokeWidth={3} />
              <ellipse cx={x - r * 0.35 * g} cy={y - r * 0.4 * g + cae * 120} rx={r * 0.25 * g} ry={r * 0.32 * g} fill="#ffffff" /></g>; })}
        </>)}
      </Escena>
      {/* 6 · el cuerpo fructífero plano, color óxido, suelta polvo de esporas */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.04} origen="40% 50%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <clipPath id="frutoClip"><rect x={40} y={330} width={1000} height={1660} /></clipPath>
          <g clipPath="url(#frutoClip)"><g transform="translate(440 800) scale(1.6) translate(-340 -700)">
            <Casa T={T} id="cF" pud={1} mic={1} hum={1} cor={1} fru={kprog(T, K.F + 0.2, K.F + 2.0)} esp={kprog(T, K.F + 2.4, K.F + 5.4)} polvo={kprog(T, K.F + 3.0, K.F + 4.6)} />
          </g></g>
          <rect x={40} y={330} width={1000} height={1660} fill="none" stroke={KC.ink} strokeWidth={9} rx={6} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿de dónde salió este come-casas? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={270} y={1180} />
          <g transform={`translate(540 ${470 + Math.sin(T * 10) * 4})`} opacity={kprog(T, K.P, K.P + 0.3)}>
            <text textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke">¿DE DÓNDE SALIÓ?</text>
          </g>
        </>)}
      </Escena>
      {/* 8 · el estudio de 2007: su ADN apunta a Asia; los silvestres más parecidos, en el Himalaya */}
      <Escena T={T} a={K.Es} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {(() => { const o = kprog(T, K.Es + 2.3, K.Es + 2.7) * (1 - kprog(T, K.Es + 4.6, K.Es + 5.0)); return o > 0 ? <g opacity={o}>
            <ADNHebra T={T} x={90} y={640} largo={560} alto={70} vueltas={3.5} resalta={(u) => u > 0.4 && u < 0.6} />
            <FlechaCurva T={T} x1={660} y1={640} x2={mp(95, 45)[0]} y2={mp(95, 45)[1] - 40} p={kprog(T, K.Es + 2.6, K.Es + 3.2)} curva={-60} color={KC.gold2} />
            <MapaEurasia T={T} asia={kprog(T, K.Es + 3.1, K.Es + 3.5)} pin={kprog(T, K.Es + 3.6, K.Es + 4.0)} />
          </g> : null; })()}
          <Himalaya T={T} o={kprog(T, K.Es + 4.6, K.Es + 5.0)} hongo={kprog(T, K.Es + 5.6, K.Es + 6.6)} />
        </>)}
      </Escena>
      {/* 9 · probablemente se regó en madera y barcos de vela */}
      <Escena T={T} a={K.B} b={K.Te} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1000} width={KW} height={960} fill="#2f7fd8" />
          {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M ${-80 + ((T * 40 + i * 60) % 160)} ${1030 + i * 50} q 40 -16 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} stroke="rgba(255,255,255,.45)" strokeWidth={5} fill="none" />)}
          {/* muelle con tablones */}
          <g transform="translate(0 0)">
            <rect x={-10} y={960} width={260} height={50} fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />
            {[[20, 880], [90, 880], [55, 820]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width={130} height={60} rx={6} fill="#c48a52" stroke={KC.ink} strokeWidth={5} /><line x1={x + 10} y1={y + 30} x2={x + 120} y2={y + 30} stroke="#8a5a33" strokeWidth={4} /></g>)}
            {[[70, 880, 16], [92, 876, 12], [150, 882, 10]].map(([x, y, r], i) => <circle key={'m' + i} cx={x} cy={y} r={r} fill={PS.micelio} stroke="rgba(0,0,0,.2)" strokeWidth={2} />)}
          </g>
          <Barco T={T} x={klerp(380, 720, kprog(T, K.B, K.Te + 0.4))} y={1040} s={0.95} />
          {[[1000, 560, 60], [1010, 760, -40], [880, 400, 90]].map(([x, y, c], i) => <FlechaCurva key={i} T={T} x1={klerp(380, 720, kprog(T, K.B, K.Te + 0.4)) + 220} y1={720} x2={x} y2={y} p={kprog(T, K.B + 1.0 + i * 0.4, K.B + 1.8 + i * 0.4)} curva={c} color={KC.white} grosor={7} />)}
        </>)}
      </Escena>
      {/* 10 · le gustan los climas templados; en la naturaleza no vive en el trópico */}
      <Escena T={T} a={K.Te} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <GloboClimas T={T} x={420} y={880} r={300} templ={kprog(T, K.Te + 0.4, K.Te + 1.0)} tropico={kprog(T, K.Te + 2.0, K.Te + 2.5)} />
          <TermoSimple x={890} y={1080} v={0.45} texto="templado" />
        </>)}
      </Escena>
      {/* 11 · lo que sí sirve: arreglar la fuga, ventilar, cambiar la madera podrida y secar */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.04} origen="40% 60%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const nueva = kprog(T, K.S + 2.4, K.S + 3.0); const hum = 1 - kprog(T, K.S + 3.0, K.S + 4.4);
            const corta = kprog(T, K.S + 1.6, K.S + 2.5);
            return <Casa T={T} id="cS" pud={1} mic={1} cor={1} hum={hum} fuga={T < K.S + 0.5 ? 1 : 0} arreglo={kprog(T, K.S + 0.3, K.S + 0.6)} vent={kprog(T, K.S + 1.0, K.S + 1.4)} nueva={nueva} polvo={1}
              sierra={corta > 0 && corta < 1 ? { x: 430 + Math.sin(corta * Math.PI * 8) * 50, y: 960, rot: 8 } : null} />; })()}
          {T > K.S + 3.0 && <g opacity={kprog(T, K.S + 3.0, K.S + 3.3)}><MedidorMadera x={760} y={845} v={klerp(0.92, 0.15, kprog(T, K.S + 3.2, K.S + 4.4, kEase.suave))} texto={kprog(T, K.S + 3.2, K.S + 4.4) > 0.7 ? 'SECA' : 'secando…'} /></g>}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma viga y el mismo piso, nuevos y secos; la bota pisa y no se hunde */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="35% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Casa T={T} id="cE" pud={0} mic={0} hum={0} arreglo={1} vent={1} nueva={1} bota={pisa(K.C + 0.1)} />
          <Sello T={T} at={K.C + 0.9} x={220} y={560} texto="SECA" color={KC.leaf} r={105} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.3} texto="¿vieja?" x={220} y={560} tam={56} />
      <Etq T={T} at={K.G + 1.4} until={K.H - 0.2} x={470} y={1012} texto="micelio" tam={30} color={KC.white} />
      <Etq T={T} at={K.H + 0.4} until={K.Cu - 0.3} x={470} y={1012} texto="Serpula lacrymans" it tam={34} color={KC.white} />
      <Etq T={T} at={K.H + 0.8} until={K.Cu - 0.3} x={470} y={1100} texto="pudrición seca" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.H + 2.6} until={K.Cu - 0.3} texto="sin agua no arranca" x={330} y={560} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 0.2} until={K.Cu + 2.9} texto="AL MICROSCOPIO · madera" x={540} y={330} tam={28} borde={KC.gold} mono />
      <Etq T={T} at={K.Cu + 1.0} until={K.Cu + 2.9} x={258} y={760} texto="hifa" tam={32} color="#eafff7" />
      <Etq T={T} at={K.Cu + 1.5} until={K.Cu + 2.9} x={828} y={560} lado="izq" texto="celulosa" tam={30} color="#ffffff" />
      <Etq T={T} at={K.Cu + 2.2} until={K.Cu + 2.9} x={372} y={1080} texto="lignina café" tam={30} color="#d9a066" />
      <Chip T={T} at={K.Cu + 3.4} until={K.Co - 0.3} texto="pudrición parda" x={540} y={460} tam={40} borde={PS.oxido3} />
      <Etq T={T} at={K.Cu + 4.0} until={K.Co - 0.3} x={540} y={1050} texto="se parte en cubos" tam={30} color={KC.white} />
      <Chip T={T} at={K.Co + 1.8} until={K.Go - 0.3} texto="varios metros" x={300} y={380} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Co + 2.2} until={K.Go - 0.3} x={478} y={712} texto="cordones" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.2} until={K.Go - 0.3} texto="llevan agua y nutrientes" x={540} y={1128} tam={30} borde={PS.agua} />
      <LetreroNombre T={T} at={K.Go + 0.3} until={K.F - 0.3} x={60} y={360} />
      <Etq T={T} at={K.Go + 1.2} until={K.F - 0.3} x={746} y={840} texto="gotas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.F + 1.0} until={K.P - 0.3} texto="color óxido, borde blanco" x={330} y={420} tam={30} borde={PS.oxido3} />
      <Etq T={T} at={K.F + 1.4} until={K.P - 0.3} x={632} y={800} texto="cuerpo fructífero" tam={30} color={KC.white} />
      <Etq T={T} at={K.F + 3.4} until={K.P - 0.3} x={632} y={1100} texto="esporas: polvo café" tam={28} color={KC.white} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.3} anio="2007" quien="Universidad de Oslo" revista="Kauserud y col. · Molecular Ecology" y={600} />
      <Chip T={T} at={K.Es + 3.4} until={K.Es + 4.6} texto="ADN → Asia" x={330} y={460} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Es + 5.2} until={K.B - 0.3} x={540} y={920} lado="izq" texto="Himalaya" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Es + 5.6} until={K.B - 0.3} texto="bosques de montaña, casi siempre a más de 2000 m" x={540} y={1040} tam={26} borde={KC.leaf} />
      <Chip T={T} at={K.B + 0.4} until={K.Te - 0.3} texto="madera y barcos de vela" x={540} y={420} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.B + 1.2} until={K.Te - 0.3} texto="probablemente (hipótesis)" x={540} y={510} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Te + 2.3} until={K.S - 0.3} x={520} y={880} texto="trópico" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Te + 2.6} until={K.S - 0.3} texto="no vive en el trópico (en la naturaleza)" x={540} y={1210} tam={28} borde={KC.red} />
      <Chip T={T} at={K.S + 0.3} until={K.C - 0.3} texto="✓ arreglar la fuga" x={250} y={400} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.0} until={K.C - 0.3} texto="✓ ventilar" x={180} y={470} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.8} until={K.C - 0.3} texto="✓ cambiar la madera podrida" x={316} y={540} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.S + 3.0} until={K.C - 0.3} texto="✓ secar" x={160} y={610} tam={28} borde={KC.leaf} />
      <MitoTachado T={T} at={K.S + 3.1} tacharEn={K.S + 3.6} until={K.C - 0.3} texto="solo químicos" x={250} y={712} tam={34} />
      <Chip T={T} at={K.S + 3.6} until={K.C - 0.3} texto="sin secar, los químicos solos no bastan" x={540} y={1132} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="le sobraba agua" x={700} y={700} tam={40} borde={KC.cyan} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Cu} texto="50 cm" largo={130} />
      <BarraEscala T={T} at={K.Cu} until={K.Cu + 3.2} texto="50 µm" largo={200} />
      <BarraEscala T={T} at={K.Cu + 3.2} until={K.Co} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Co} until={K.Go} texto="50 cm" largo={130} />
      <BarraEscala T={T} at={K.Go} until={K.F} texto="5 cm" largo={250} />
      <BarraEscala T={T} at={K.F} until={K.P} texto="20 cm" largo={83} />
      <BarraEscala T={T} at={K.S} until={K.Ou} texto="50 cm" largo={130} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Un hongo *se la come.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Cu - 0.1} texto="Solo *madera húmeda.*" />
      <Subtitulo T={T} idx={2} at={K.Cu + 0.1} until={K.Co - 0.1} texto="Se parte *en cubos.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Go - 0.1} texto="Cruza *ladrillo y yeso.*" />
      <Subtitulo T={T} idx={4} at={K.Go + 0.1} until={K.F - 0.1} texto="Su nombre: *«que llora».*" />
      <Subtitulo T={T} idx={5} at={K.F + 0.1} until={K.P - 0.1} texto="Polvo café *de esporas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿De dónde *salió?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.B - 0.1} texto="Su ADN apunta *a Asia.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.Te - 0.1} texto="Tal vez *en barcos.*" />
      <Subtitulo T={T} idx={9} at={K.Te + 0.1} until={K.S - 0.1} texto="Le gusta *lo templado.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.C - 0.1} texto="Quita *la humedad.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Le sobraba *agua.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.0, K.Cu - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Co + 0.6, K.Co + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Go + 0.6, K.F - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.F + 1.3, K.P - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 3.1, K.Es + 7.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Te - 0.3, K.Te + 3.7, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S - 0.2, K.S + 4.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="87" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PudricionSecaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PudricionSecaShot /></CompositionStage></div>;
}
window.PudricionSecaApp = PudricionSecaApp;
