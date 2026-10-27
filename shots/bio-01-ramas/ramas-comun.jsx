// Biotecnológico #01 · Las ramas de la biotecnología por colores — dibujos compartidos (narrada y muda).
// Fuentes y guion: guion.md. Dibujo esquemático.

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';

// Las ramas, de la banda de afuera a la de adentro. La naranja (divulgación) es la que agrega el canal.
const RAMAS = [
  { k: 'rojo', c: '#ff3b2f', fondo: '#ff7a8f', n: 'ROJA', t: 'salud' },
  { k: 'verde', c: '#3fbf4a', fondo: KC.mint, n: 'VERDE', t: 'campo' },
  { k: 'blanco', c: '#ffffff', fondo: KC.cyan, n: 'BLANCA', t: 'industria' },
  { k: 'amarillo', c: '#ffe11a', fondo: '#ffcf3a', n: 'AMARILLA', t: 'comida' },
  { k: 'azul', c: '#2346ff', fondo: '#6fa8ff', n: 'AZUL', t: 'mar' },
  { k: 'gris', c: '#9aa4ae', fondo: '#b9c4cf', n: 'GRIS', t: 'ambiente' },
  { k: 'cafe', c: '#a0643a', fondo: '#f3b27a', n: 'CAFÉ', t: 'desierto' },
  { k: 'dorado', c: '#E8A62A', fondo: '#ffd86b', n: 'DORADA', t: 'datos' },
  { k: 'morado', c: '#8b4dff', fondo: KC.lilac, n: 'MORADA', t: 'leyes y ética' },
  { k: 'negro', c: '#231c2b', fondo: '#4a3f57', n: 'OSCURA', t: 'armas biológicas' },
  { k: 'naranja', c: '#ff8a1f', fondo: KC.orange, n: 'NARANJA', t: 'divulgación' },
];

// Arcoíris de bandas. llenas(i) → 0..1 cuánto está dibujada la banda i. n = cuántas bandas existen.
function Arco({ T, cx, cy, R, w, n = 10, llenas, chispas = 0, opac = 1 }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = R - i * w - w / 2, L = Math.PI * r, p = kclamp(llenas(i), 0, 1);
    if (p <= 0) { out.push(<path key={'g' + i} d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke="rgba(255,255,255,.22)" strokeWidth={w - 4} fill="none" />);
      if (chispas) { const a = Math.PI * (1 - (((T * 0.25 + i * 0.137) % 1))); out.push(<circle key={'f' + i} cx={cx + r * Math.cos(a)} cy={cy - r * Math.sin(a)} r={w * 0.2} fill="#fff" opacity={0.5 * chispas} />); }
      continue; }
    out.push(<path key={'s' + i} d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke={KC.ink} strokeWidth={w + 4} fill="none" strokeDasharray={`${L * p} ${L}`} />);
    out.push(<path key={'b' + i} d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke={RAMAS[i].c} strokeWidth={w - 2} fill="none" strokeDasharray={`${L * p} ${L}`} />);
    if (chispas && p >= 1) { const a = Math.PI * (1 - (((T * 0.25 + i * 0.137) % 1))); out.push(<circle key={'c' + i} cx={cx + r * Math.cos(a)} cy={cy - r * Math.sin(a)} r={w * 0.22} fill="#fff" opacity={0.85 * chispas} />); }
  }
  return <g opacity={opac}>{out}</g>;
}

/* ---------- objetos de cada rama (caja de ±220 px, centro 0,0). u = segundos desde que aparece ---------- */
function Capsula({ x, y, rot, c1 = KC.red, c2 = '#fff', s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-16} width={34} height={32} rx={16} fill={c1} stroke={KC.ink} strokeWidth={5} /><rect x={0} y={-16} width={34} height={32} rx={16} fill={c2} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Enzima({ x, y, s = 1, boca = 0.5, rot = 0, color = KC.yellow }) {
  const a = 20 + 30 * boca;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${30 * Math.cos(a * Math.PI / 180)} ${-30 * Math.sin(a * Math.PI / 180)} A 30 30 0 1 0 ${30 * Math.cos(a * Math.PI / 180)} ${30 * Math.sin(a * Math.PI / 180)} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={-4} cy={-14} r={4} fill={KC.ink} />
  </g>;
}
function Celula({ x, y, r = 50, color = '#ffb3c7', T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${1 + mece(T, seed, 0.4) * 0.03})`}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={6} /><circle cx={r * 0.15} cy={-r * 0.1} r={r * 0.36} fill="#b04a8a" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-r * 0.45} cy={r * 0.35} rx={r * 0.16} ry={r * 0.09} fill="#e0709a" />
  </g>;
}

function ObjRojo({ T, u }) {
  const nivel = kprog(u, 0.2, 1.4, kEase.sale), late = 1 + 0.06 * Math.max(0, Math.sin(T * 7.5));
  return <g>
    {[0, 1, 2, 3].map((i) => { const a = T * 0.9 + i * Math.PI / 2; return <Capsula key={i} x={Math.cos(a) * 170} y={Math.sin(a) * 120 + 20} rot={a * 57} s={0.9} c1={i % 2 ? KC.red : KC.pink} />; })}
    <g transform={`scale(${late})`}>
      <rect x={-62} y={-150} width={124} height={34} rx={8} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
      <rect x={-70} y={-118} width={140} height={230} rx={22} fill="#e8f6ff" stroke={KC.ink} strokeWidth={7} />
      <rect x={-60} y={112 - 200 * nivel} width={120} height={Math.max(0, 200 * nivel - 2)} rx={14} fill="#ffd2d8" />
      <rect x={-58} y={-30} width={116} height={64} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <text x={0} y={12} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>INSULINA</text>
      <path d="M -44 -96 L -44 90" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
    </g>
  </g>;
}
function ObjVerde({ T, u }) {
  const h = 260 * kprog(u, 0, 1.6, kEase.sale), sw = mece(T, 3, 0.3) * 4;
  return <g>
    <circle cx={140} cy={-150} r={46} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4 + T * 0.4; return <line key={i} x1={140 + Math.cos(a) * 58} y1={-150 + Math.sin(a) * 58} x2={140 + Math.cos(a) * 76} y2={-150 + Math.sin(a) * 76} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />; })}
    <path d="M -220 160 Q 0 120 220 160 L 220 230 L -220 230 Z" fill="#8a5a3b" stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(-20 150) rotate(${sw})`}>
      <path d={`M 0 0 L 0 ${-h}`} stroke="#2a9a3c" strokeWidth={14} strokeLinecap="round" />
      {[0.3, 0.5, 0.7].map((f, i) => h > 260 * f && <path key={i} d={`M 0 ${-h * f} q ${i % 2 ? 70 : -70} -30 ${i % 2 ? 120 : -120} 10`} stroke="#2a9a3c" strokeWidth={14} fill="none" strokeLinecap="round" />)}
      {h > 200 && <ellipse cx={18} cy={-h * 0.62} rx={18} ry={42} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
    </g>
    <g transform={`translate(110 60) scale(${kprog(u, 1.2, 1.6, kEase.rebote)})`}>
      <path d="M 0 -50 L 42 -34 L 38 14 Q 30 44 0 58 Q -30 44 -38 14 L -42 -34 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <path d="M -18 4 L -4 18 L 20 -12" stroke={KC.leaf} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>;
}
function ObjBlanco({ T, u }) {
  const come = kprog(u, 0.6, 3.2), manchas = [[-60, -40], [30, -70], [50, 10], [-30, 40], [70, 70]];
  return <g>
    <path d="M -150 -120 L -70 -160 Q 0 -130 70 -160 L 150 -120 L 120 -60 L 90 -70 L 90 170 L -90 170 L -90 -70 L -120 -60 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {manchas.map(([x, y], i) => { const k = kclamp(come * 5 - i, 0, 1); return <ellipse key={i} cx={x} cy={y} rx={30 * (1 - k)} ry={20 * (1 - k)} fill="#8a5a3b" opacity={0.85} />; })}
    {manchas.map(([x, y], i) => { const k = kclamp(come * 5 - i, 0, 1); if (k <= 0 || k >= 1) return null; return <Enzima key={'e' + i} x={x - 40 + 40 * k} y={y} s={0.9} boca={0.5 + 0.5 * Math.sin(T * 20)} />; })}
    {[0, 1, 2, 3, 4, 5].map((i) => { const y = 180 - (((T * 60 + i * 50) % 300)); return <circle key={i} cx={-170 + i * 66} cy={y} r={10 + (i % 3) * 5} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={3} />; })}
    <g transform="translate(150 140)"><circle r={40} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />{[0, 1, 2].map((i) => <line key={i} x1={-24 * Math.cos(i * Math.PI / 3)} y1={-24 * Math.sin(i * Math.PI / 3)} x2={24 * Math.cos(i * Math.PI / 3)} y2={24 * Math.sin(i * Math.PI / 3)} stroke="#fff" strokeWidth={6} strokeLinecap="round" />)}</g>
  </g>;
}
function ObjAmarillo({ T, u }) {
  const sube = klerp(0.75, 1, kprog(u, 0.2, 2.2, kEase.sale));
  return <g>
    <g transform={`translate(0 60) scale(${1} ${sube})`}>
      <path d="M -170 80 L -170 -20 Q -170 -110 -60 -120 Q 0 -150 60 -120 Q 170 -110 170 -20 L 170 80 Z" fill="#e9a54f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[-90, -20, 50, 120].map((x, i) => <path key={i} d={`M ${x} -100 q 20 -10 30 10`} stroke="#b3712e" strokeWidth={7} fill="none" strokeLinecap="round" />)}
      {[[-100, 10], [-40, 40], [20, -10], [90, 30], [130, -40], [-130, -40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8 + 6 * (0.5 + 0.5 * Math.sin(T * 3 + i))} fill="#f6d39a" stroke="#b3712e" strokeWidth={3} />)}
    </g>
    {[[-150, -150], [150, -170], [180, -60]].map(([x, y], i) => <g key={i} transform={`translate(${x + mece(T, i, 0.3) * 8} ${y})`}>
      <ellipse rx={30} ry={24} fill="#fff6cf" stroke={KC.ink} strokeWidth={5} /><ellipse cx={26} cy={-16} rx={14 * kprog(Math.sin(T * 1.5 + i), -1, 1)} ry={11 * kprog(Math.sin(T * 1.5 + i), -1, 1)} fill="#fff6cf" stroke={KC.ink} strokeWidth={4} />
    </g>)}
    <text x={-150} y={-200} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>levadura</text>
  </g>;
}
function ObjAzul({ T, u }) {
  return <g>
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-180 + i * 110} 200 C ${-200 + i * 110 + mece(T, i, 0.4) * 30} 100, ${-150 + i * 110 + mece(T, i + 5, 0.4) * 30} 20, ${-180 + i * 110 + mece(T, i + 9, 0.3) * 40} -60`} stroke="#1f8f6a" strokeWidth={18} fill="none" strokeLinecap="round" />)}
    {[0, 1, 2].map((i) => <path key={'o' + i} d={`M -230 ${-110 + i * 30 + Math.sin(T * 2 + i) * 6} q 38 -24 76 0 t 76 0 t 76 0 t 76 0 t 76 0 t 76 0`} stroke={i ? 'rgba(255,255,255,.5)' : '#fff'} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <Bacteria T={T} x={60} y={110} largo={110} ancho={48} rot={20 + mece(T, 2, 0.3) * 10} color="#7fd8ff" seed={4} />
    <Bacteria T={T} x={-60} y={40} largo={90} ancho={40} rot={-30} color="#a5f0d0" seed={9} />
    <g transform={`translate(${130} ${klerp(140, -150, kprog(u, 0.8, 3.2, kEase.suave))})`}><Capsula x={0} y={0} rot={-30 + T * 40} c1={KC.blue} c2="#fff" s={1.1} /></g>
  </g>;
}
function ObjGris({ T, u, limpia = 0 }) {
  const k = kclamp(limpia, 0, 1);
  return <g>
    <ellipse cx={0} cy={60} rx={210} ry={120} fill={mixHex('#3a3340', '#4fb3ff', k)} stroke={KC.ink} strokeWidth={7} />
    {[[-80, 40, 60], [50, 80, 50], [10, 20, 40]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r * (1 - k)} ry={r * 0.5 * (1 - k)} fill="#15121a" opacity=".85" />)}
    {[[-60, 50], [30, 90], [80, 30], [-10, 10], [-120, 80]].map(([x, y], i) => { const e = kprog(limpia, i * 0.08, i * 0.08 + 0.2); return e > 0 && <Bacteria key={i} T={T} x={x + mece(T, i, 0.3) * 30} y={y + mece(T, i + 3, 0.3) * 14} largo={70} ancho={30} rot={i * 50 + T * 20} color={KC.leaf} seed={i + 2} flagelo={false} nucleoide={false} opacidad={e} />; })}
    {k < 0.5 && [0, 1, 2].map((i) => <path key={'h' + i} d={`M ${-60 + i * 60} -90 q 16 -30 0 -60 q -16 -30 0 -60`} stroke="#5a5560" strokeWidth={8} fill="none" opacity={(1 - k * 2) * (0.5 + 0.5 * Math.sin(T * 2 + i))} strokeLinecap="round" />)}
    {k > 0.7 && <path d="M -60 -140 C -80 -110 -40 -60 -10 -100 C 20 -140 60 -110 40 -70" stroke={KC.leaf} strokeWidth={0} fill="none" />}
  </g>;
}
function ObjCafe({ T, u }) {
  const brota = kprog(u, 0.6, 2.2, kEase.sale);
  return <g>
    <circle cx={-140} cy={-150} r={54} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <path d="M -230 120 Q -120 40 -10 110 Q 100 170 230 90 L 230 230 L -230 230 Z" fill="#f0c27a" stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(120 100) rotate(${mece(T, 2, 0.2) * 2})`}>
      <rect x={-22} y={-170} width={44} height={170} rx={22} fill="#3f9a4a" stroke={KC.ink} strokeWidth={6} />
      <path d="M -22 -80 L -60 -80 Q -70 -80 -70 -90 L -70 -130" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M -22 -80 L -60 -80 Q -70 -80 -70 -90 L -70 -130" stroke="#3f9a4a" strokeWidth={22} fill="none" strokeLinecap="round" />
    </g>
    <g transform="translate(-60 120)">
      <path d={`M 0 0 L 0 ${-90 * brota}`} stroke={KC.leaf} strokeWidth={9} strokeLinecap="round" />
      {brota > 0.5 && <><ellipse cx={-22} cy={-90 * brota} rx={22} ry={10} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`rotate(-25 -22 ${-90 * brota})`} /><ellipse cx={22} cy={-90 * brota - 6} rx={22} ry={10} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`rotate(25 22 ${-90 * brota - 6})`} /></>}
      <path d={`M 40 ${-180 + 80 * kprog(u, 0, 0.8)} q 10 16 0 24 q -10 -8 0 -24`} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} opacity={1 - kprog(u, 0.8, 1)} />
    </g>
  </g>;
}
function ObjDorado({ T, u }) {
  const L = 'ACGTTGCAAGTCCGATAGCTTACG';
  const fila = (k) => Array.from({ length: 8 }, (_, i) => L[(Math.floor(T * 6) + i * 3 + k * 5) % L.length]).join(' ');
  return <g>
    <g transform="translate(0 -130)"><ADNHebra T={T} x={-200} y={0} largo={400} alto={70} vueltas={2} grosor={7} /></g>
    <rect x={-190} y={-60} width={380} height={230} rx={20} fill="#222a38" stroke={KC.ink} strokeWidth={8} />
    <rect x={-170} y={-40} width={340} height={190} rx={10} fill="#0d1424" />
    {[0, 1, 2, 3, 4].map((k) => <text key={k} x={-150} y={-5 + k * 34} style={{ font:`700 28px ${KF.mono}` }} fill={k === 2 ? KC.gold2 : KC.mint} opacity={k === 2 ? 1 : 0.7}>{fila(k)}</text>)}
    <path d="M -230 170 L 230 170 L 200 200 L -200 200 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
function ObjMorado({ T, u }) {
  const inc = Math.sin(T * 1.6) * 10, golpe = Math.max(0, Math.sin(T * 3.2)) ;
  return <g>
    <path d="M 0 -150 L 0 140" stroke={KC.ink} strokeWidth={14} /><path d="M -70 160 L 70 160" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <g transform={`translate(0 -130) rotate(${inc})`}>
      <path d="M -170 0 L 170 0" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
      {[-1, 1].map((l) => <g key={l} transform={`translate(${l * 160} 0) rotate(${-inc})`}>
        <path d="M 0 0 L -50 90 M 0 0 L 50 90" stroke={KC.ink} strokeWidth={4} /><path d="M -64 90 Q 0 140 64 90 Z" fill={l < 0 ? KC.gold2 : '#fff'} stroke={KC.ink} strokeWidth={6} />
        {l > 0 && <text x={0} y={118} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>ADN</text>}
      </g>)}
    </g>
    <g transform={`translate(150 90) rotate(${-30 - golpe * 25})`}><rect x={-12} y={-10} width={24} height={110} rx={8} fill="#8a5a3b" stroke={KC.ink} strokeWidth={5} /><rect x={-48} y={-46} width={96} height={46} rx={10} fill="#a0643a" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
function ObjNegro({ T, u }) {
  const g = kprog(u, 0.6, 1.4, kEase.rebote);
  return <g>
    <g transform={`rotate(${T * 12})`}>
      {[0, 1, 2].map((i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 3; return <circle key={i} cx={Math.cos(a) * 62} cy={Math.sin(a) * 62} r={62} fill="none" stroke="#e6e0ee" strokeWidth={18} />; })}
      <circle r={30} fill="none" stroke="#e6e0ee" strokeWidth={14} />
    </g>
    <g transform={`translate(110 110) scale(${g})`}>
      <path d="M 0 -80 L 64 -54 L 58 20 Q 46 66 0 88 Q -46 66 -58 20 L -64 -54 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={7} />
      <path d="M -26 6 L -6 26 L 30 -18" stroke={KC.ink} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>;
}
function ObjNaranja({ T, u }) {
  return <g>
    <g transform={`rotate(${mece(T, 1, 0.3) * 4})`}>
      <rect x={-110} y={-200} width={220} height={400} rx={34} fill="#222" stroke={KC.ink} strokeWidth={8} />
      <rect x={-94} y={-176} width={188} height={340} rx={18} fill={KC.cyan} />
      <g transform="translate(0 -40)"><Arco T={T} cx={0} cy={40} R={80} w={8} n={11} llenas={() => 1} /></g>
      <rect x={-70} y={40} width={140} height={20} rx={10} fill={KC.ink} opacity=".7" />
      <rect x={-50} y={74} width={100} height={14} rx={7} fill={KC.ink} opacity=".4" />
      <circle cx={0} cy={136} r={14} fill="#fff" opacity=".7" />
    </g>
    {[0, 1, 2].map((i) => { const f = ((T * 0.8 + i / 3) % 1); return <path key={i} d={`M ${130 + f * 60} ${-60 - f * 40} q ${40 + f * 40} ${60} 0 ${120 + f * 80}`} stroke={KC.ink} strokeWidth={8} fill="none" opacity={1 - f} strokeLinecap="round" />; })}
  </g>;
}
const OBJ = { rojo: ObjRojo, verde: ObjVerde, blanco: ObjBlanco, amarillo: ObjAmarillo, azul: ObjAzul, gris: ObjGris, cafe: ObjCafe, dorado: ObjDorado, morado: ObjMorado, negro: ObjNegro, naranja: ObjNaranja };

// Medallón: círculo de papel con el objeto de la rama; entra girando.
function Medallon({ T, at, k, x = 540, y = 935, r = 235, extra = {}, sale }) {
  if (T < at - 0.01) return null;
  const e = kprog(T, at, at + 0.5, kEase.rebote), o = sale == null ? 1 : 1 - kprog(T, sale, sale + 0.35);
  if (o <= 0) return null;
  const R = RAMAS.find((q) => q.k === k), Ob = OBJ[k];
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o, zIndex:20 }}>
    <g transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, e) * (sale == null ? 1 : 1 - 0.3 * kprog(T, sale, sale + 0.35))}) rotate(${(1 - e) * -40 + mece(T, 2, 0.15) * 2})`}>
      <circle r={r + 14} fill={R.c} stroke={KC.ink} strokeWidth={10} />
      <circle r={r - 6} fill={k === 'negro' ? '#2c2534' : KC.paper} stroke={KC.ink} strokeWidth={6} />
      <g transform={`scale(${(r - 30) / 230})`}><Ob T={T} u={T - at} {...extra} /></g>
    </g>
  </svg>;
}

// Mini medallones en abanico sobre el arcoíris grande (gancho y cierre).
function Abanico({ T, at, cx, cy, R, n = 10, r = 52, etiquetas = 0 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:22 }}>
    {RAMAS.slice(0, n).map((q, i) => {
      const a = Math.PI * (1 - (i + 0.5) / n), t0 = at + i * 0.12, e = kprog(T, t0, t0 + 0.45, kEase.rebote);
      if (e <= 0) return null;
      const x = cx + R * Math.cos(a), y = cy - R * Math.sin(a) + mece(T, i, 0.3) * 6, Ob = OBJ[q.k];
      return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}>
        <circle r={r + 6} fill={q.c} stroke={KC.ink} strokeWidth={6} /><circle r={r - 4} fill={q.k === 'negro' ? '#2c2534' : KC.paper} />
        <g transform={`scale(${(r - 10) / 230})`}><Ob T={T} u={3} limpia={1} /></g>
        {etiquetas > 0 && <text y={r + 36} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={5} paintOrder="stroke" opacity={etiquetas}>{q.t}</text>}
      </g>;
    })}
  </svg>;
}

// Nubes de los extremos del arcoíris.
function Nubes({ T, cx, cy, R }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:21 }}>
    {[-1, 1].map((l) => <g key={l} transform={`translate(${cx + l * (R - 120)} ${cy + 10 + mece(T, l + 3, 0.2) * 6})`}>
      <ellipse cx={-50} cy={10} rx={80} ry={50} fill="#fff" stroke={KC.ink} strokeWidth={7} /><ellipse cx={40} cy={0} rx={90} ry={62} fill="#fff" stroke={KC.ink} strokeWidth={7} /><ellipse cx={0} cy={30} rx={120} ry={40} fill="#fff" />
    </g>)}
  </svg>;
}

// Rótulo grande de la rama ("ROJA · salud").
function RotuloRama({ T, at, until, k, y = 330 }) {
  if (!kvisible(T, at, until, 0.3)) return null;
  const R = RAMAS.find((q) => q.k === k), e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:0, right:0, top:y, zIndex:44, textAlign:'center', opacity:e.o, transform:`translateY(-50%) scale(${e.s})` }}>
    <span style={{ display:'inline-block', background:R.c, color: ['blanco', 'amarillo', 'dorado', 'gris'].includes(k) ? KC.ink : KC.texto, border:`6px solid ${KC.ink}`, borderRadius:22, padding:'4px 26px 8px', font:`400 76px/1 ${KF.titulo}`, boxShadow:`8px 8px 0 ${KC.ink}`, letterSpacing:'.02em' }}>{R.n}</span>
    <span style={{ display:'inline-block', marginLeft:18, font:`900 46px ${KF.texto}`, color:KC.texto, textShadow:SOMBRA, verticalAlign:'middle' }}>{R.t}</span>
  </div>;
}

Object.assign(window, { SOMBRA, AVS, RAMAS, Arco, OBJ, Medallon, Abanico, Nubes, RotuloRama, Capsula, Enzima, Celula });
