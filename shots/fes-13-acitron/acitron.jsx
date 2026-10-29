// Shot Festivo #13 · Día de Reyes · Ambiental: el acitrón de la rosca sale de un cactus protegido — NARRADO (N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (biznaga, mapa, células y ósmosis simplificados).
const PAN = '#d8893a', PAN2 = '#b8662a', PAN3 = '#8a4216', COSTRA = '#f3e3b0', ATE = '#c3263a', ATE2 = '#f0a020', PAPAYA = '#ef7b2c';
const ACI = '#d6ecae', ACI2 = '#b9d98a', COBRE = '#c8693a', AMBAR = '#e3a33a', PLATO = '#f4efe4', TALAVERA = '#2346ff';
const VERDE = '#5f9470', VERDE2 = '#3f6f52', VERDE3 = '#86b98f', ESPINA = '#6b4f3a', LANA = '#f0cf5a', FLOR = '#ffd52e';
const ARENA = '#e9c98f', TIERRA = '#9a6a3c';

/* ---------- BIZNAGA DE DULCE (Echinocactus platyacanthus) ----------
   Barril con muchas costillas marcadas, aréolas con espinas gruesas y aplanadas, ápice hundido con lana amarilla y flores amarillas.
   Origen = centro de la base (al ras del suelo). Alto ≈ 470 px a s = 1. gris 0..1 la apaga (planta muerta). */
const BZ_H = 400;
function bzHW(t) { return 182 + 22 * Math.sin(t * Math.PI * 0.85) - 34 * Math.pow(t, 3); }
function bzPunto(th, t) {
  const c = 1 - 0.78 * kclamp((t - 0.86) / 0.14, 0, 1);
  return [Math.sin(th) * bzHW(t) * c, -t * BZ_H - 16 * kclamp((t - 0.86) / 0.14, 0, 1) * Math.cos(th)];
}
function Biznaga({ T = 0, x, y, s = 1, flores = 1, gris = 0, detalle = true, rot = 0, gid = 'bz' }) {
  const N = 32, bands = [], ribs = [], grooves = [], spines = [];
  const tops = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.86, 0.92, 0.97];
  const d = (pts) => 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  for (let k = 0; k < N / 2; k++) {
    const th = -Math.PI / 2 + (k + 0.5) * Math.PI / (N / 2), thL = th - Math.PI / N, thR = th + Math.PI / N;
    const crest = tops.map((t) => bzPunto(th, t)), gL = tops.map((t) => bzPunto(thL, t)), gR = tops.map((t) => bzPunto(thR, t));
    const luz = kclamp(0.15 + 0.55 * (Math.sin(th) + 1) / 2, 0, 1);
    bands.push(<path key={'b' + k} d={d(gL.concat(gR.slice().reverse())) + ' Z'} fill={mixHex(VERDE3, VERDE2, luz)} />);
    bands.push(<path key={'h' + k} d={d(gL.concat(crest.slice().reverse())) + ' Z'} fill="#fff" opacity={0.08} />);
    ribs.push(<path key={'c' + k} d={d(crest)} stroke="#a9d3ae" strokeWidth={2 + 3 * Math.cos(th)} fill="none" strokeLinecap="round" opacity={0.55} />);
    if (k > 0) grooves.push(<path key={'g' + k} d={d(gL)} stroke={KC.ink} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.55} />);
    if (detalle && Math.abs(th) < 1.3) {
      (k % 2 ? [0.2, 0.42, 0.64, 0.83] : [0.1, 0.31, 0.53, 0.74]).forEach((t, j) => {
        const [ax, ay] = bzPunto(th, t), fr = 0.5 + 0.5 * Math.cos(th);
        spines.push(<ellipse key={`a${k}-${j}`} cx={ax} cy={ay} rx={6 * fr + 3} ry={6} fill="#efe3b8" stroke={KC.ink} strokeWidth={2} />);
        [-1, 0, 1].forEach((q, m) => {
          const ang = (-90 + q * 48 + th * 40) * Math.PI / 180, L = (q ? 30 : 44) * fr + 6;
          const ex = ax + Math.cos(ang) * L, ey = ay + Math.sin(ang) * L;
          spines.push(<line key={`s${k}-${j}-${m}o`} x1={ax} y1={ay} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={8.5} strokeLinecap="round" />);
          spines.push(<line key={`s${k}-${j}-${m}`} x1={ax} y1={ay} x2={ex} y2={ey} stroke={q ? '#8a6a52' : ESPINA} strokeWidth={5} strokeLinecap="round" />);
        });
      });
    }
  }
  // contorno del barril
  const izq = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.86, 0.94].map((t) => [-bzHW(t) * (1 - 0.78 * kclamp((t - 0.86) / 0.14, 0, 1)), -t * BZ_H]);
  const der = izq.slice().reverse().map(([a, b]) => [-a, b]);
  const body = 'M ' + izq.map((p) => p.join(' ')).join(' L ') + ` Q 0 ${-BZ_H - 34} ` + der.map((p) => p.join(' ')).join(' L ') + ' Z';
  const g = krng(4);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={{ filter: gris > 0 ? `grayscale(${gris}) brightness(${1 - gris * 0.25})` : undefined }}>
    <defs><linearGradient id={gid} x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".14" /><stop offset=".45" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".32" /></linearGradient></defs>
    <ellipse cx={0} cy={6} rx={200} ry={26} fill="rgba(0,0,0,.25)" />
    <path d={body} fill={VERDE} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {bands}{grooves}{ribs}
    <path d={body} fill={`url(#${gid})`} />
    {spines}
    {/* ápice hundido con lana amarilla */}
    <ellipse cx={0} cy={-BZ_H - 10} rx={96} ry={30} fill={LANA} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 80} cy={-BZ_H - 10 + Math.sin(a) * 22} r={13 + g() * 6} fill="#f7df86" stroke={KC.ink} strokeWidth={2.5} />; })}
    <ellipse cx={0} cy={-BZ_H - 14} rx={58} ry={16} fill="#f9e7a0" />
    {/* flores amarillas en la corona */}
    {flores > 0 && [[-62, -BZ_H - 34, -14], [4, -BZ_H - 44, 4], [64, -BZ_H - 30, 16]].map(([fx, fy, fa], i) => {
      const k = kclamp(flores * 3 - i, 0, 1) * (1 + 0.04 * Math.sin(T * 2 + i));
      return <g key={'f' + i} transform={`translate(${fx} ${fy}) rotate(${fa}) scale(${k})`}>
        {Array.from({ length: 10 }, (_, p) => <ellipse key={p} cx={0} cy={-20} rx={9} ry={24} fill={FLOR} stroke="#b88400" strokeWidth={2.5} transform={`rotate(${p * 36})`} />)}
        <circle r={12} fill="#f39c12" stroke={KC.ink} strokeWidth={3} />
      </g>;
    })}
  </g>;
}

/* ---------- ROSCA DE REYES en un plato de talavera ----------
   mezcla 1 = con acitrón; 0 = el acitrón cambiado por tiras de ate/papaya. sinHeroe: deja vacío el cuadrito del frente. */
function cuboAcitron(x, y, s = 1, key, op = 1, brillo = 0, T = 0) {
  return <g key={key} transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    {brillo > 0 && <circle r={70} fill="#fff7c2" opacity={0.35 * brillo * (0.7 + 0.3 * Math.sin(T * 6))} />}
    <path d="M -24 -10 L 0 -24 L 26 -12 L 26 18 L 2 30 L -24 18 Z" fill={ACI} stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" opacity=".92" />
    <path d="M -24 -10 L 0 -24 L 26 -12 L 2 2 Z" fill="#eef8d8" stroke={KC.ink} strokeWidth={2.5} strokeLinejoin="round" />
    <path d="M 2 2 L 2 30 L 26 18 L 26 -12 Z" fill={ACI2} opacity=".8" />
    <path d="M -16 -8 L -2 -16" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
    {[[-12, 10], [10, 14], [16, -2], [-6, 20]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={2.2} fill="#fff" />)}
  </g>;
}
function tiraAte(x, y, ang, color, key, op = 1) {
  return <g key={key} transform={`translate(${x} ${y}) rotate(${ang})`} opacity={op}>
    <rect x={-46} y={-14} width={92} height={28} rx={10} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <rect x={-36} y={-8} width={44} height={6} rx={3} fill="#fff" opacity=".35" />
  </g>;
}
function Rosca({ T = 0, x, y, s = 1, mezcla = 1, sinHeroe = false, brillo = 0 }) {
  const RX = 300, RY = 150, items = [];
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * Math.PI * 2 + Math.PI / 2, px = Math.cos(a) * RX, py = Math.sin(a) * RY, tg = (Math.atan2(Math.cos(a) * RY, -Math.sin(a) * RX) * 180) / Math.PI;
    const tipo = ['aci', 'costra', 'ate', 'aci', 'costra', 'ate2', 'aci'][k % 7];
    items.push({ k, px, py, tg, tipo });
  }
  items.sort((p, q) => p.py - q.py);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="hueco"><ellipse cx={0} cy={0} rx={175} ry={80} /></clipPath></defs>
    {/* plato de talavera */}
    <ellipse cx={0} cy={80} rx={540} ry={300} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={60} rx={530} ry={290} fill={PLATO} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={60} rx={490} ry={258} fill="none" stroke={TALAVERA} strokeWidth={14} />
    {Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 510} cy={60 + Math.sin(a) * 274} r={8} fill={TALAVERA} />; })}
    {/* pan: lado y cara de arriba */}
    <path d={`M ${-430} 50 A 430 225 0 1 0 430 50 A 430 225 0 1 0 -430 50 Z`} fill={PAN3} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -430 0 A 430 225 0 1 0 430 0 A 430 225 0 1 0 -430 0 Z M -175 0 A 175 80 0 1 1 175 0 A 175 80 0 1 1 -175 0 Z`} fill={PAN} stroke={KC.ink} strokeWidth={8} fillRule="evenodd" />
    <g clipPath="url(#hueco)"><ellipse cx={0} cy={0} rx={175} ry={80} fill={PAN3} /><ellipse cx={0} cy={36} rx={175} ry={72} fill={PLATO} /><ellipse cx={0} cy={36} rx={160} ry={60} fill="none" stroke={TALAVERA} strokeWidth={8} opacity=".5" /></g>
    <path d="M -380 -60 Q -200 -190 120 -195" stroke="#f0b26a" strokeWidth={22} fill="none" strokeLinecap="round" opacity=".6" />
    {/* azúcar espolvoreada */}
    {Array.from({ length: 60 }, (_, i) => { const r = krng(i + 40), a = r() * Math.PI * 2, rr = 0.48 + r() * 0.48; return <circle key={i} cx={Math.cos(a) * 430 * rr} cy={Math.sin(a) * 225 * rr} r={2.4} fill="#fff8e0" opacity=".9" />; })}
    {items.map(({ k, px, py, tg, tipo }) => {
      if (tipo === 'costra') return <g key={k} transform={`translate(${px} ${py}) rotate(${tg})`}>
        <path d="M -70 -20 Q 0 -34 70 -20 Q 80 0 70 20 Q 0 32 -70 20 Q -80 0 -70 -20 Z" fill={COSTRA} stroke={KC.ink} strokeWidth={3.5} />
        {[-40, -14, 12, 38].map((q) => <path key={q} d={`M ${q} -16 L ${q + 8} 16`} stroke="#d8b980" strokeWidth={3} />)}
      </g>;
      if (tipo === 'ate') return tiraAte(px, py, tg, ATE, k);
      if (tipo === 'ate2') return tiraAte(px, py, tg, ATE2, k);
      const heroe = k === 0;
      if (heroe && sinHeroe) return null;
      return <g key={k}>
        {mezcla < 1 && tiraAte(px, py, tg, k % 2 ? PAPAYA : ATE, 'r' + k, 1 - mezcla)}
        {mezcla > 0 && cuboAcitron(px, py, 1.15, 'a' + k, mezcla, heroe ? brillo : 0, T)}
      </g>;
    })}
  </g>;
}

/* ---------- células del tejido que guarda agua (parénquima) ---------- */
function Celulas({ T, w, h, r = 46, azucar = 0, seed = 9 }) {
  const out = [], g = krng(seed);
  for (let j = -1; j * r * 1.5 < h + r; j++) for (let i = -1; i * r * 1.73 < w + r; i++) {
    const cx = i * r * 1.73 + (j % 2 ? r * 0.86 : 0) + (g() - 0.5) * 8, cy = j * r * 1.5 + (g() - 0.5) * 8, rr = r * (0.92 + g() * 0.12);
    const pts = Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2 + Math.PI / 6; return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
    const lat = 1 + 0.03 * Math.sin(T * 2 + i + j);
    out.push(<g key={`${i}-${j}`}>
      <polygon points={pts} fill={azucar > 0 ? mixHex('#9fd3ff', '#f0b54a', azucar) : '#9fd3ff'} fillOpacity={0.55} stroke="#9fe0a8" strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={cx - rr * 0.3} cy={cy - rr * 0.32} rx={rr * 0.28 * lat} ry={rr * 0.16 * lat} fill="#fff" opacity={0.35} />
      <circle cx={cx + rr * 0.42} cy={cy + rr * 0.3} r={rr * 0.12} fill="#2f7a46" opacity=".8" />
    </g>);
  }
  return <g>{out}</g>;
}

/* ---------- corte de la biznaga (vista desde arriba): cáscara con costillas y pulpa ---------- */
function CorteBiznaga({ x, y, r = 210 }) {
  const n = 32, pts = [];
  for (let k = 0; k <= n * 4; k++) { const a = (k / (n * 4)) * Math.PI * 2, rr = r * (1 + 0.06 * Math.cos(a * n)); pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr * 0.62).toFixed(1)}`); }
  return <g>
    <ellipse cx={x} cy={y + 30} rx={r * 1.06} ry={r * 0.66} fill={VERDE2} stroke={KC.ink} strokeWidth={7} />
    <polygon points={pts.join(' ')} fill={VERDE} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={x} cy={y} rx={r * 0.84} ry={r * 0.52} fill="#e9efd2" stroke="#b7c99a" strokeWidth={5} />
    {Array.from({ length: 30 }, (_, i) => { const q = krng(i + 7), a = q() * Math.PI * 2, rr = q() * 0.75; return <circle key={i} cx={x + Math.cos(a) * r * 0.84 * rr} cy={y + Math.sin(a) * r * 0.52 * rr} r={5} fill="#d4e2b4" />; })}
    <circle cx={x} cy={y} r={14} fill="#c8d6a4" />
  </g>;
}

/* ---------- cazo de cobre con almíbar (espesor 0..1 lo oscurece) ---------- */
function CazoAlmibar({ T, x, y, s = 1, espesor = 0, cubos = 0 }) {
  const g = krng(5), color = mixHex('#f6dc8a', '#c9781d', espesor);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-120, -60, 0, 60, 120].map((fx, i) => <path key={i} d={`M ${fx - 26} 200 Q ${fx} ${120 - 20 * Math.sin(T * 12 + i)} ${fx + 26} 200 Z`} fill={i % 2 ? KC.orange : KC.yellow} opacity={0.95} stroke={KC.ink} strokeWidth={3} />)}
    {[-150, -90, -30, 30, 90, 150].map((lx, i) => <rect key={'l' + i} x={lx - 26} y={196} width={52} height={22} rx={8} fill="#6b4226" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i % 2 ? 8 : -8} ${lx} 207)`} />)}
    <rect x={-250} y={-40} width={40} height={24} rx={10} fill="#6b4226" stroke={KC.ink} strokeWidth={5} /><rect x={210} y={-40} width={40} height={24} rx={10} fill="#6b4226" stroke={KC.ink} strokeWidth={5} />
    <path d="M -230 -70 L 230 -70 L 200 150 Q 0 200 -200 150 Z" fill={COBRE} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -200 -30 L 190 -30" stroke="#e08b57" strokeWidth={8} opacity=".7" />
    <ellipse cx={0} cy={-70} rx={230} ry={44} fill={color} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: Math.round(cubos * 9) }, (_, i) => { const q = krng(i + 30); return cuboAcitron((q() - 0.5) * 340, -70 + (q() - 0.5) * 50, 1.1, 'c' + i, 0.9); })}
    {Array.from({ length: 9 }, (_, i) => { const ph = (T * 1.3 + g()) % 1, bx = (g() - 0.5) * 380; return <circle key={'b' + i} cx={bx} cy={-70 + (g() - 0.5) * 40} r={6 + 14 * ph} fill="none" stroke="#fff" strokeWidth={4} opacity={0.8 * (1 - ph)} />; })}
    {[-90, 0, 90].map((vx, i) => <path key={'v' + i} d={`M ${vx} -130 q 18 -30 0 -60 q -18 -30 0 -60`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.45 * (0.5 + 0.5 * Math.sin(T * 3 + i))} />)}
  </g>;
}

/* ---------- una célula grande para la ósmosis ---------- */
function CelulaOsmosis({ T, x, y, r = 270, u = 0, t0 = 0 }) {
  const hexa = (cx, cy, rr) => Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2 + Math.PI / 6; return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
  const vecinas = Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2; return [x + Math.cos(a) * r * 1.76, y + Math.sin(a) * r * 1.76]; });
  const gotas = [], azucares = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.2, ph = ((T - t0) * 0.45 + i * 0.137) % 1;
    if (T > t0) {
      const rr = klerp(r * 0.35, r * 1.35, ph), ox = x + Math.cos(a) * rr, oy = y + Math.sin(a) * rr;
      gotas.push(<path key={'g' + i} d={`M 0 -16 Q 12 0 0 12 Q -12 0 0 -16 Z`} transform={`translate(${ox} ${oy})`} fill="#5ab8ff" stroke="#e6f4ff" strokeWidth={2.5} opacity={(1 - u * 0.6) * Math.sin(ph * Math.PI)} />);
      const b = a + 0.22, ph2 = ((T - t0) * 0.4 + i * 0.21) % 1, rr2 = klerp(r * 1.4, r * 0.3, ph2);
      azucares.push(<rect key={'a' + i} x={-9} y={-9} width={18} height={18} rx={3} fill="#fff6d8" stroke={AMBAR} strokeWidth={3} transform={`translate(${x + Math.cos(b) * rr2} ${y + Math.sin(b) * rr2}) rotate(${T * 70 + i * 30})`} opacity={Math.sin(ph2 * Math.PI)} />);
    }
  }
  return <g>
    {vecinas.map(([vx, vy], k) => <polygon key={k} points={hexa(vx, vy, r)} fill={mixHex('#1f4f7a', '#8a5a1a', u)} fillOpacity=".55" stroke="#9fe0a8" strokeWidth={10} opacity=".55" />)}
    <polygon points={hexa(x, y, r)} fill={mixHex('#2a6aa8', '#d99a2b', u)} fillOpacity=".75" stroke="#b8f0c0" strokeWidth={14} strokeLinejoin="round" />
    <polygon points={hexa(x, y, r - 22)} fill="none" stroke="#6fbf7c" strokeWidth={4} strokeDasharray="10 12" />
    <ellipse cx={x - r * 0.3} cy={y - r * 0.35} rx={r * 0.32} ry={r * 0.16} fill="#fff" opacity={0.22} />
    {gotas}{azucares}
  </g>;
}

/* ---------- báscula de dos platos ---------- */
function Bascula({ T, x, y, ang = 0, izq, der }) {
  const L = 330, rad = (ang * Math.PI) / 180;
  const pl = [x - Math.cos(rad) * L, y - Math.sin(rad) * L], pr = [x + Math.cos(rad) * L, y + Math.sin(rad) * L];
  const plato = ([px, py], hijos, k) => <g key={k}>
    <line x1={px} y1={py} x2={px - 110} y2={py + 170} stroke={KC.ink} strokeWidth={4} /><line x1={px} y1={py} x2={px + 110} y2={py + 170} stroke={KC.ink} strokeWidth={4} />
    <g transform={`translate(${px} ${py + 170})`}>{hijos}<path d="M -140 0 Q 0 60 140 0 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
  return <g>
    <rect x={x - 90} y={y + 420} width={180} height={40} rx={12} fill="#3b3f4a" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 16} y={y} width={32} height={430} fill="#6b7180" stroke={KC.ink} strokeWidth={6} />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke="#9aa4b2" strokeWidth={12} strokeLinecap="round" />
    <circle cx={x} cy={y} r={22} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    {plato(pl, izq, 'i')}{plato(pr, der, 'd')}
  </g>;
}
function BolsaAzucar({ x, y, key }) {
  return <g key={key} transform={`translate(${x} ${y})`}>
    <path d="M -50 0 L -44 -110 Q 0 -126 44 -110 L 50 0 Z" fill="#fbf8f1" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -44 -110 l 14 -16 l 14 16 l 16 -16 l 14 16 l 14 -16 l 16 16" stroke={KC.ink} strokeWidth={4} fill="none" />
    <rect x={-34} y={-80} width={68} height={40} rx={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />
    <text x={0} y={-52} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>½ kg</text>
  </g>;
}

/* ---------- paisaje del desierto (para el cierre) ---------- */
function Desierto({ T, w = 760, h = 300 }) {
  return <svg width={w} height={h}>
    <rect width={w} height={h} fill="#8fd4ff" />
    <circle cx={w - 110} cy={70} r={42} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <path d={`M 0 ${h * 0.62} Q ${w * 0.3} ${h * 0.5} ${w * 0.55} ${h * 0.6} T ${w} ${h * 0.56} L ${w} ${h} L 0 ${h} Z`} fill={ARENA} stroke={KC.ink} strokeWidth={5} />
    <path d={`M 40 ${h * 0.6} l 50 -40 l 40 30 l 50 -50 l 60 60`} fill="#c99b6a" stroke={KC.ink} strokeWidth={4} opacity=".8" />
    <Biznaga T={T} x={w * 0.38} y={h * 0.9} s={0.42} flores={1} gid="bzD" />
    <Biznaga T={T} x={w * 0.68} y={h * 0.92} s={0.2} flores={0} detalle={false} gid="bzD2" />
  </svg>;
}

function Acitron() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bi: CUES.Biznaga, De: CUES.Desierto, Pu: CUES.Pulpa, Co: CUES.Corte, Al: CUES.Almibar, Os: CUES.Osmosis, P: CUES.Pregunta, Mu: CUES.Muere, E: CUES.Estudio, Le: CUES.Ley, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // el cuadrito héroe: sale del frente de la rosca (RX·cos, RY·sin a π/2 → 0, +150) y vuela a la izquierda
  const RX0 = 440, RY0 = 860, RS = 0.72;
  const salta = kprog(T, K.G + 0.25, K.G + 0.95, kEase.sale);
  const hx = klerp(RX0, 270, salta), hy = klerp(RY0 + 150 * RS, 610, salta) - Math.sin(salta * Math.PI) * 120, hs = klerp(1.1, 3.4, salta);
  // ósmosis: avance del azúcar
  const uOs = kprog(T, K.Os + 0.6, K.Os + 5.4, kEase.suave);
  // muere: se arranca
  const arranca = kprog(T, K.Mu + 0.5, K.Mu + 1.6, kEase.suave), apaga = kprog(T, K.Mu + 1.7, K.Mu + 2.8, kEase.suave);
  // estudio: crece de plántula a medio metro (400 px)
  const crece = kprog(T, K.E + 0.6, K.E + 5.4, kEase.suave);
  // ley: sube de escalón
  const sube = kprog(T, K.Le + 1.4, K.Le + 2.2, kEase.suave);
  // dato: bolsas de azúcar
  const bolsas = [0.7, 1.3, 1.9].filter((d) => T > K.Da + d).length;
  const angBal = klerp(-9, 9, kclamp((bolsas * 0.5 - 1 + 1) / 1.5, 0, 1));
  const angSuave = (() => { let a = -9; [0.7, 1.3, 1.9].forEach((d, i) => { const p = kprog(T, K.Da + d, K.Da + d + 0.5, kEase.rebote); a = klerp(a, klerp(-9, 9, kclamp(((i + 1) * 0.5) / 1.5, 0, 1)), p); }); return a; })();
  // cierre: el acitrón se vuelve ate/papaya
  const cambia = kprog(T, K.Ci + 3.7, K.Ci + 4.5, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cuadrito de la rosca salta */}
      <Escena T={T} a={K.G} b={K.Bi} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g transform={`rotate(${Math.sin(T * 0.8) * 1.2} 540 980)`}><Rosca T={T} x={RX0} y={RY0} s={klerp(0.85, RS, kprog(T, 0, 0.6, kEase.rebote))} sinHeroe={salta > 0.02} /></g>
          {cuboAcitron(hx, hy, hs, 'h', 1, kprog(T, K.G + 0.8, K.G + 1.4), T)}
        </>)}
      </Escena>
      {/* 1 · la biznaga de dulce */}
      <Escena T={T} a={K.Bi} b={K.De} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <ellipse cx={500} cy={1190} rx={420} ry={60} fill={ARENA} stroke={KC.ink} strokeWidth={6} />
          <Biznaga T={T} x={500} y={1180} s={klerp(0.3, 1.18, kprog(T, K.Bi - 0.2, K.Bi + 0.7, kEase.rebote))} flores={kprog(T, K.Bi + 1.6, K.Bi + 2.6)} gid="bz1" />
          {cuboAcitron(klerp(270, 500, kprog(T, K.Bi - 0.3, K.Bi + 0.5)), klerp(700, 900, kprog(T, K.Bi - 0.3, K.Bi + 0.5)), klerp(3.4, 0.5, kprog(T, K.Bi - 0.3, K.Bi + 0.5)), 'h2', 1 - kprog(T, K.Bi + 0.2, K.Bi + 0.6))}
        </>)}
      </Escena>
      {/* 2 · dónde vive: desierto chihuahuense y valle de Tehuacán */}
      <Escena T={T} a={K.De} b={K.Pu} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {svg(<MapaMexico x={40} y={560} ancho={1000} conCA={false}>
          {(() => {
            const norte = [[-101.6, 27.2], [-100.3, 25.6], [-99.3, 23.6], [-100.6, 22.6], [-102.4, 23.6], [-101.1, 21.2], [-99.8, 20.8], [-98.9, 20.4]];
            const sur = [[-97.4, 18.4], [-97.1, 17.9]];
            const pn = kprog(T, K.De + 0.4, K.De + 1.6), ps = kprog(T, K.De + 2.2, K.De + 3.0);
            return <>
              {norte.map(([lo, la], i) => { const [px, py] = mxProy(lo, la); return <circle key={i} cx={px} cy={py} r={56 * kclamp(pn * 2 - i * 0.12, 0, 1)} fill={KC.orange} opacity=".55" />; })}
              {sur.map(([lo, la], i) => { const [px, py] = mxProy(lo, la); return <circle key={'s' + i} cx={px} cy={py} r={40 * ps} fill={KC.orange} opacity=".6" />; })}
              {norte.concat(sur).map(([lo, la], i) => { const [px, py] = mxProy(lo, la), at = i < 8 ? K.De + 0.6 + i * 0.12 : K.De + 2.4 + (i - 8) * 0.15, k = kprog(T, at, at + 0.4, kEase.rebote);
                return k > 0 ? <Biznaga key={'b' + i} T={T} x={px} y={py + 14} s={0.085 * k} flores={0} detalle={false} gid={'bm' + i} /> : null; })}
            </>;
          })()}
        </MapaMexico>)}
      </Escena>
      {/* 3 · por dentro: pulpa que guarda agua */}
      <Escena T={T} a={K.Pu} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Biznaga T={T} x={300} y={1140} s={0.62} flores={1} gid="bz3" />
          <CorteBiznaga x={720} y={960} r={230 * kprog(T, K.Pu + 0.1, K.Pu + 0.6, kEase.rebote)} />
        </>)}
        <Lupa T={T} at={K.Pu + 1.0} until={K.Co - 0.25} x={620} y={560} r={200} fx={760} fy={960} tinte={KC.mint} etiqueta="AL MICROSCOPIO · parénquima"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1f1a" /><Celulas T={Tl} w={r * 2} h={r * 2} r={52} />
            <rect x={r - 70} y={r * 2 - 70} width={104} height={9} rx={4} fill="#fff" /><text x={r - 70} y={r * 2 - 80} style={{ font:`700 24px ${KF.mono}` }} fill="#fff">100 µm</text></svg>} />
      </Escena>
      {/* 4 · se escogen de más de medio metro; sin costillas; en cubos */}
      <Escena T={T} a={K.Co} b={K.Al} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {svg((() => {
          const pela = kprog(T, K.Co + 2.0, K.Co + 2.8, kEase.suave), corta = kprog(T, K.Co + 3.2, K.Co + 4.4, kEase.suave);
          const S = 1.0, alto = 387; // marca de medio metro: la biznaga la rebasa
          return <>
            <ellipse cx={380} cy={1190} rx={330} ry={46} fill={ARENA} stroke={KC.ink} strokeWidth={6} />
            <g opacity={1 - pela}><Biznaga T={T} x={380} y={1180} s={S} flores={1} gid="bz4" /></g>
            {/* regla: más de 50 cm */}
            <g opacity={kprog(T, K.Co + 0.3, K.Co + 0.8)}>
              <rect x={700} y={1180 - alto - 20} width={46} height={alto + 20} fill="#fff6d8" stroke={KC.ink} strokeWidth={5} />
              {Array.from({ length: 11 }, (_, i) => <line key={i} x1={700} y1={1180 - i * alto / 10} x2={i % 5 ? 722 : 746} y2={1180 - i * alto / 10} stroke={KC.ink} strokeWidth={4} />)}
              <line x1={560} y1={1180 - alto} x2={700} y2={1180 - alto} stroke={KC.red} strokeWidth={6} strokeDasharray="14 10" />
              <text x={770} y={1180 - alto + 14} style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>50 cm</text>
            </g>
            {/* costillas con espinas que salen volando */}
            {pela > 0 && pela < 1 && Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2, d = pela * 420;
              return <g key={i} transform={`translate(${380 + Math.cos(a) * d} ${980 + Math.sin(a) * d * 0.7}) rotate(${a * 57 + pela * 200})`} opacity={1 - pela}>
                <path d="M -60 0 Q 0 -40 60 0 Q 0 -16 -60 0 Z" fill={VERDE} stroke={KC.ink} strokeWidth={4} />
                {[-30, 0, 30].map((q) => <line key={q} x1={q} y1={-16} x2={q} y2={-46} stroke={ESPINA} strokeWidth={5} />)}
              </g>; })}
            {/* la pulpa en bloque y luego en cubos */}
            {pela > 0 && Array.from({ length: 12 }, (_, i) => { const c = i % 3, f = Math.floor(i / 3), sep = corta * 34;
              return cuboAcitron(270 + c * (74 + sep), 860 + f * (74 + sep), klerp(2.6, 2.0, corta), 'p' + i, pela); })}
            {corta > 0 && corta < 1 && <line x1={150 + corta * 600} y1={760} x2={150 + corta * 600 - 90} y2={1200} stroke="#c9ced8" strokeWidth={14} strokeLinecap="round" />}
          </>;
        })())}
      </Escena>
      {/* 5 · almíbar cada vez más espeso */}
      <Escena T={T} a={K.Al} b={K.Os} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <CazoAlmibar T={T} x={540} y={960} s={1.2} espesor={kprog(T, K.Al + 0.8, K.Al + 4.6)} cubos={kprog(T, K.Al + 0.2, K.Al + 1.0)} />
          {Array.from({ length: 6 }, (_, i) => { const at = K.Al + 0.05 + i * 0.13, u = kprog(T, at, at + 0.5, (p) => p * p); return u > 0 && u < 1 ? cuboAcitron(380 + i * 60, klerp(520, 860, u), 1.3, 'cae' + i) : null; })}
        </>)}
      </Escena>
      {/* 6 · ósmosis: el azúcar saca el agua de la célula (fondo noche) */}
      <Escena T={T} a={K.Os} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(120,200,255,.22)" />
        {svg(<CelulaOsmosis T={T} x={540} y={860} r={250} u={uOs} t0={K.Os + 0.4} />)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.Mu} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity=".85"><Biznaga T={T} x={280} y={1180} s={0.55} flores={0} detalle={false} gid="bz7" /></g>
          <text x={280} y={1060} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 860)`}>?</text>
        </>)}
      </Escena>
      {/* 8 · se arranca entera: la planta muere */}
      <Escena T={T} a={K.Mu} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={TIERRA} />
          <path d={`M 0 1150 Q 270 1130 540 1150 T ${KW} 1150`} stroke={KC.ink} strokeWidth={6} fill="none" />
          <ellipse cx={330} cy={1160} rx={150 * arranca} ry={30 * arranca} fill="#3a2414" />
          <g transform={`translate(0 ${-arranca * 200})`}>
            {arranca > 0 && [-110, -60, -15, 30, 80, 120].map((rx, i) => <path key={i} d={`M ${330 + rx * 0.6} 1150 q ${rx * 0.4} 60 ${rx * 0.7} ${110 + (i % 3) * 30}`} stroke="#c9a27a" strokeWidth={8} fill="none" strokeLinecap="round" opacity={arranca} />)}
            <Biznaga T={T} x={330} y={1150} s={0.88} flores={1 - apaga} gris={apaga} rot={arranca * -8} gid="bz8" />
          </g>
        </>)}
      </Escena>
      {/* 9 · el estudio: tesis UNAM 2008, Tehuacán: cerca de 25 años para medio metro */}
      <Escena T={T} a={K.E} b={K.Le} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={0} y={1180} width={KW} height={260} fill={ARENA} />
          <path d={`M 0 1180 Q 270 1165 540 1180 T ${KW} 1180`} stroke={KC.ink} strokeWidth={6} fill="none" />
          <Biznaga T={T} x={470} y={1180} s={klerp(0.06, 0.87, crece)} flores={kprog(T, K.E + 5.0, K.E + 5.8)} detalle={crece > 0.25} gid="bz9" />
          <g opacity={kprog(T, K.E + 0.4, K.E + 0.9)}>
            <rect x={760} y={760} width={46} height={420} fill="#fff6d8" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 11 }, (_, i) => <line key={i} x1={760} y1={1180 - i * 40} x2={i % 5 ? 782 : 806} y2={1180 - i * 40} stroke={KC.ink} strokeWidth={4} />)}
            <text x={820} y={790} style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>50 cm</text>
          </g>
        </>)}
        <div style={{ position:'absolute', left:110, top:820, zIndex:41, opacity:kprog(T, K.E + 0.6, K.E + 1.0), textAlign:'center' }}>
          <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink }}>EDAD (AÑOS)</div>
          <div style={{ font:`400 120px/1 ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>{crece >= 1 ? '≈ 25' : Math.round(crece * 25)}</div>
        </div>
      </Escena>
      {/* 10 · 2019: sube de categoría en la NOM-059 */}
      <Escena T={T} a={K.Le} b={K.Da} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={120} y={1060} width={420} height={140} fill="#fff6d8" stroke={KC.ink} strokeWidth={7} />
          <rect x={540} y={860} width={420} height={340} fill={KC.gold2} stroke={KC.ink} strokeWidth={7} />
          <text x={330} y={1120} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>2010</text>
          <text x={330} y={1170} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>protección especial</text>
          <text x={750} y={940} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Le + 1.8, K.Le + 2.3)}>2019</text>
          <text x={750} y={990} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Le + 1.8, K.Le + 2.3)}>más alta</text>
          <path d="M 400 1010 Q 520 760 700 820" stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - kprog(T, K.Le + 0.9, K.Le + 1.6))} />
          <path d="M 676 790 L 712 822 L 668 842" stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.Le + 1.5, K.Le + 1.7)} />
          {(() => { const bx = klerp(330, 750, sube), by = klerp(1060, 860, sube) - Math.sin(sube * Math.PI) * 160; return <Biznaga T={T} x={bx} y={by} s={0.36} flores={1} detalle={false} gid="bz10" />; })()}
        </>)}
        <div style={{ position:'absolute', left:60, top:430, zIndex:41, width:560, opacity:kprog(T, K.Le + 0.1, K.Le + 0.5), transform:`rotate(-2deg) translateY(${(1 - kprog(T, K.Le + 0.1, K.Le + 0.6, kEase.sale)) * 40}px)`,
          background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:18, padding:'18px 26px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
          <div style={{ font:`400 58px/1 ${KF.titulo}`, color:KC.ink }}>NOM-059-SEMARNAT</div>
          <div style={{ font:`900 30px ${KF.texto}`, color:'#5a524a', marginTop:8 }}>Lista oficial de especies en riesgo</div>
          {[0, 1, 2].map((i) => <div key={i} style={{ height:10, borderRadius:5, background:'#d8d0c0', marginTop:12, width:`${90 - i * 18}%` }}></div>)}
        </div>
      </Escena>
      {/* 11 · dato: kilo y medio de azúcar por kilo de biznaga */}
      <Escena T={T} a={K.Da} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<Bascula T={T} x={540} y={760} ang={angSuave}
          izq={<>{Array.from({ length: 6 }, (_, i) => cuboAcitron(-60 + (i % 3) * 60, -30 - Math.floor(i / 3) * 46, 1.3, 'k' + i))}<text x={0} y={90} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>1 kg biznaga</text></>}
          der={<>{[0.7, 1.3, 1.9].map((d, i) => { const u = kprog(T, K.Da + d - 0.35, K.Da + d, (p) => p * p); return u > 0 ? <g key={i} transform={`translate(0 ${(1 - u) * -500})`}>{BolsaAzucar({ x: -90 + i * 90, y: 0, key: 'b' + i })}</g> : null; })}
            <text x={0} y={90} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Da + 2.0, K.Da + 2.4)}>1.5 kg azúcar</text></>} />)}
      </Escena>
      {/* 12 · cierre: la misma rosca; por dentro, células de cactus con azúcar; luego ate o papaya */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {svg(<Rosca T={T} x={RX0} y={RY0} s={RS} mezcla={1 - cambia} brillo={kprog(T, K.Ci + 0.3, K.Ci + 0.9) * (1 - cambia)} />)}
        <Lupa T={T} at={K.Ci + 0.8} until={K.Ci + 3.5} x={390} y={620} r={180} fx={RX0} fy={RY0 + 150 * RS} tinte={KC.mint} etiqueta="POR DENTRO · células de cactus"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1d1408" /><Celulas T={Tl} w={r * 2} h={r * 2} r={46} azucar={1} seed={12} /></svg>} />
        <div style={{ position:'absolute', left:160, top:1440, zIndex:41, borderRadius:28, overflow:'hidden', border:`7px solid ${KC.ink}`, boxShadow:`12px 12px 0 ${KC.ink}`,
          opacity:kprog(T, K.Ci + 4.0, K.Ci + 4.5), transform:`translateY(${(1 - kprog(T, K.Ci + 4.0, K.Ci + 4.6, kEase.sale)) * 80}px)` }}><Desierto T={T} /></div>
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Co, titulo: 'La pulpa' }, { at: K.Al, titulo: 'El almíbar' }, { at: K.E, titulo: 'El tiempo' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Bi - 0.2} texto="Especial Día de Reyes" x={540} y={1500} tam={40} borde={KC.pink} />
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.G + 2.3} texto="¿fruta?" x={300} y={440} tam={52} />
      <Chip T={T} at={K.G + 2.4} until={K.Bi - 0.2} texto="es un cactus" x={300} y={440} tam={48} borde={KC.mint} />
      <Etq T={T} at={K.Bi + 0.9} until={K.De - 0.2} x={60} y={1450} texto="biznaga de dulce" tam={40} />
      <Etq T={T} at={K.Bi + 1.2} until={K.De - 0.2} x={60} y={1510} texto="Echinocactus platyacanthus" it tam={36} color={KC.yellow} />
      <Chip T={T} at={K.Bi + 2.6} until={K.De - 0.2} texto="endémica de México" x={540} y={1620} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.De + 1.2} until={K.Pu - 0.2} x={520} y={735} texto="desierto chihuahuense" tam={30} />
      <Etq T={T} at={K.De + 2.6} until={K.Pu - 0.2} x={640} y={975} texto="valle de Tehuacán" tam={30} />
      <Chip T={T} at={K.De + 3.0} until={K.Pu - 0.2} texto="Puebla y Oaxaca" x={540} y={1500} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pu + 2.2} until={K.Co - 0.2} texto="tejido que guarda agua" x={540} y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Co + 0.9} until={K.Co + 2.6} texto="más de medio metro" x={540} y={1500} tam={42} borde={KC.red} />
      <Etq T={T} at={K.Co + 2.0} until={K.Co + 3.4} x={600} y={620} texto="sin costillas" tam={32} />
      <Chip T={T} at={K.Co + 3.4} until={K.Al - 0.2} texto="la pulpa, en cubos" x={540} y={1500} tam={42} borde={KC.mint} />
      <Medidor T={T} at={K.Al + 0.6} until={K.Os - 0.2} y={1440} ancho={900} etiqueta="almíbar" valor={(t) => kprog(t, K.Al + 0.8, K.Al + 4.6)} texto={(v) => (v < 0.34 ? 'ralo' : v < 0.67 ? 'más espeso' : 'muy espeso')} color={KC.gold} />
      {/* calendario: hasta una semana */}
      {kvisible(T, K.Al + 1.0, K.Os - 0.2) && <div style={{ position:'absolute', left:90, top:1560, zIndex:42, display:'flex', gap:10, opacity:kentrada(T, K.Al + 1.0, K.Os - 0.2, 'sube').o }}>
        {Array.from({ length: 7 }, (_, i) => { const on = T > K.Al + 1.2 + i * 0.5; return <div key={i} style={{ width:116, height:86, borderRadius:12, border:`4px solid ${KC.ink}`, background: on ? KC.paper : 'rgba(255,255,255,.35)', textAlign:'center', font:`700 22px ${KF.mono}`, color:KC.ink, paddingTop:6, boxSizing:'border-box' }}>
          DÍA<div style={{ font:`400 40px/1 ${KF.titulo}` }}>{i + 1}</div></div>; })}
      </div>}
      {T > K.Os - 0.3 && T < K.P + 0.2 && <Escala T={T} z={1} pxPorMm={3000} x={60} y={1430} />}
      <Chip T={T} at={K.Os + 0.4} until={K.P - 0.2} texto="ósmosis" x={560} y={470} tam={46} borde={KC.cyan} />
      <Etq T={T} at={K.Os + 1.0} until={K.P - 0.2} x={760} y={600} texto="sale agua" tam={32} color="#7fd0ff" />
      <Etq T={T} at={K.Os + 1.6} until={K.P - 0.2} x={620} y={1170} texto="entra azúcar" tam={32} color={KC.gold2} />
      <Medidor T={T} at={K.Os + 1.0} until={K.P - 0.2} y={1530} ancho={900} etiqueta="azúcar en la pulpa" valor={(t) => 0.725 * kprog(t, K.Os + 1.2, K.Os + 5.4, kEase.suave)} texto={(v) => (v >= 0.7 ? '70–75 %' : Math.round(v * 100) + ' %')} color={KC.gold} />
      <Chip T={T} at={K.Mu + 2.0} until={K.E - 0.2} texto="se usa la planta entera" x={540} y={1500} tam={42} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="2008" quien="Tesis doctoral · UNAM" revista="Zapotitlán Salinas, Tehuacán (Puebla)" x={470} y={520} />
      <Chip T={T} at={K.E + 5.2} until={K.Le - 0.2} texto="≈ 25 años · estimación" x={540} y={1500} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Le + 2.4} until={K.Da - 0.2} texto="especie en riesgo · 2019" x={540} y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Da + 2.4} until={K.Ci - 0.2} texto="1.5 kg de azúcar por kg" x={540} y={1500} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.Da + 0.4} until={K.Ci - 0.2} x={240} y={1600} texto="una receta tradicional" tam={30} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ci + 3.6} texto="no es fruta: es cactus" x={540} y={1500} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bi - 0.1} texto="No es fruta: *es un cactus.*" />
      <Subtitulo T={T} idx={1} at={K.Bi + 0.1} until={K.De - 0.1} texto="Biznaga de dulce: *solo vive en México.*" />
      <Subtitulo T={T} idx={2} at={K.De + 0.1} until={K.Pu - 0.1} texto="Desierto chihuahuense *y Tehuacán.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.Co - 0.1} texto="Por dentro: *pulpa que guarda agua.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.Al - 0.1} texto="Más de medio metro: *la pulpa en cubos.*" />
      <Subtitulo T={T} idx={5} at={K.Al + 0.1} until={K.Os - 0.1} texto="Almíbar cada vez más espeso: *una semana.*" />
      <Subtitulo T={T} idx={6} at={K.Os + 0.1} until={K.P - 0.1} texto="El azúcar saca el agua: *70 a 75 % de azúcar.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Mu - 0.1} texto="¿Y qué le pasa *a la biznaga?*" />
      <Subtitulo T={T} idx={8} at={K.Mu + 0.1} until={K.E - 0.1} texto="Se arranca entera: *la planta muere.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Le - 0.1} texto="2008: cerca de *25 años para medio metro.*" />
      <Subtitulo T={T} idx={10} at={K.Le + 0.1} until={K.Da - 0.1} texto="2019: *sube de categoría.*" />
      <Subtitulo T={T} idx={11} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Kilo y medio de azúcar *por kilo.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Un cactus de *25 años o más.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Biznaga + 0.8, CUES.Biznaga + 5.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pulpa + 0.6, CUES.Pulpa + 4.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Almibar + 0.4, CUES.Almibar + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Osmosis + 2.4, CUES.Pregunta - 0.05, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Muere + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Muere + 2.0, CUES.Estudio + 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.2, CUES.Ley - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Ley + 0.4, CUES.Dato - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Dato + 0.4, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AcitronApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Acitron /></CompositionStage></div>;
}
window.AcitronApp = AcitronApp;
