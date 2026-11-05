// Shot Fungi Mati #114 · Este hongo se come… si no tomas alcohol: Coprinopsis atramentaria y la coprina — NARRADO
// (gancho 1 "Esto no es X: es Y" con mito peligroso + N1 Por dentro + N5). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No es guía para identificar hongos.

const CA = { gris:'#9b958e', gris2:'#77716b', grisTop:'#8a7c6e', pie:'#e9e5df', tinta:'#15110f', pasto:'#2f9a3a', pasto2:'#46c050',
  tierra:'#6b4423', tierra2:'#4e3019', madera:'#a8743f', madera2:'#7b5129', cerveza:'#f2a516', cerveza2:'#d9860b', espuma:'#fffaf0',
  etanol:'#4fa8ff', acetal:'#ff3b2f', acetato:'#2fe0a8', enzima:'#11a39a', piel:'#f1c08f' };

// Coprinopsis atramentaria de perfil: sombrero gris en campana, acanalado (estrías radiales), centro pardusco;
// pie blanco-grisáceo SIN anillo. tinta 0..1: el borde se ennegrece, se deshace y gotea (láminas que se licúan).
function Coprino({ T = 0, x, y, s = 1, crece = 1, tinta = 0, rot = 0, gotas = true, seed = 1, alto = 1 }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece * 1.25, 0, 1));
  const Hs = 210 * alto * c, w = 112 * (0.75 + 0.25 * c), hc = 128 * (0.8 + 0.2 * c);
  const yb = -Hs + 26, yt = yb - hc;
  const tn = kclamp(tinta, 0, 1), sube = tn * hc * 0.42;     // el borde sube al licuarse
  const ybe = yb - sube;
  const bell = `M ${-w / 2 - 4} ${ybe} C ${-w / 2 + 2} ${yb - hc * 0.55} ${-w * 0.36} ${yt} 0 ${yt} C ${w * 0.36} ${yt} ${w / 2 - 2} ${yb - hc * 0.55} ${w / 2 + 4} ${ybe} Q 0 ${ybe + 10} ${-w / 2 - 4} ${ybe} Z`;
  const band = 12 + tn * 30;
  const hw = (yy) => { const u = kclamp((yb - yy) / hc, 0, 1); return (w / 2 + 2) * Math.sqrt(1 - u * u * 0.85); };
  const r = krng(seed * 13 + 5);
  const fes = Array.from({ length: 7 }, (_, i) => { const u = (i + 0.5) / 7 - 0.5; return [u * w * 0.95, (r() - 0.5) * 6]; });
  const ragged = Array.from({ length: 9 }, (_, i) => { const xx = -w / 2 - 2 + i * (w + 4) / 8; return `${xx.toFixed(1)} ${(ybe + 6 + (i % 2 ? 10 + tn * 14 : 0)).toFixed(1)}`; }).join(' L ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -15 0 Q -18 -8 -13 -20 L -10 ${yb + 6} L 10 ${yb + 6} L 13 -20 Q 18 -8 15 0 Z`} fill={CA.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={bell} fill={CA.gris} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {fes.map(([fx, j], i) => <path key={i} d={`M ${fx * 0.22} ${yt + 18} Q ${fx * 0.8 + j} ${yb - hc * 0.45} ${fx * 1.02} ${ybe - 6}`} stroke={CA.gris2} strokeWidth={4} fill="none" strokeLinecap="round" />)}
    <ellipse cx={0} cy={yt + 16} rx={w * 0.2} ry={10} fill={CA.grisTop} />
    {tn > 0.02 && <path d={`M ${-hw(ybe - band)} ${ybe - band} L ${hw(ybe - band)} ${ybe - band} L ${w / 2 + 4} ${ybe} L ${ragged.split(' L ').reverse().join(' L ')} Z`} fill={CA.tinta} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" opacity={kclamp(tn * 4, 0, 1)} />}
    {gotas && tn > 0.08 && <><Goteo T={T} x={-w / 2 - 2} y0={ybe + 10} y1={-6} cada={0.85} desde={seed * 0.31} color={CA.tinta} r={8} />
      <Goteo T={T} x={w / 2 + 2} y0={ybe + 10} y1={-6} cada={1.0} desde={seed * 0.31 + 0.45} color={CA.tinta} r={8} /></>}
  </g>;
}
// Racimo (crece en matas): varios coprinos salen del mismo punto.
const RACIMO = [[-70, -16, 0.85, 0.85], [-24, -5, 1.05, 1.05], [28, 6, 1, 1.12], [72, 17, 0.8, 0.8], [0, 0, 0.7, 0.62]];
function RacimoCoprino({ T, x, y, s = 1, at = -10, cada = 0.15, tinta = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {RACIMO.map(([dx, r, k, a], i) => <Coprino key={i} T={T} x={dx * 0.35} y={0} s={k} alto={a} rot={r + mece(T, i + seed, 0.3) * 1.5} crece={kprog(T, at + i * cada, at + i * cada + 0.8)} tinta={tinta * (0.75 + 0.25 * ((i * 7) % 3) / 2)} seed={seed + i} />)}
  </g>;
}

function Pasto({ T, y = 1180, color = CA.pasto }) {
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={KH - y + 20} fill={color} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 34 }, (_, i) => { const x = 10 + i * 32, h = 30 + (i * 37) % 28, m = Math.sin(T * 2 + i) * 5; return <path key={i} d={`M ${x - 8} ${y + 4} Q ${x + m} ${y - h * 0.5} ${x + m * 1.5} ${y - h} Q ${x + 4} ${y - h * 0.4} ${x + 8} ${y + 4} Z`} fill={CA.pasto2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Corte del suelo con madera enterrada (de ahí sale el racimo) y micelio blanco.
function SueloMadera({ T, y = 1120, g = 1 }) {
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={KH - y + 20} fill={CA.tierra} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 137) % 1080} cy={y + 40 + (i * 61) % 400} r={4 + (i % 3) * 2} fill={CA.tierra2} />)}
    <g transform={`translate(560 ${y + 270}) rotate(-6)`}>
      <rect x={-300} y={-46} width={600} height={92} rx={40} fill={CA.madera} stroke={KC.ink} strokeWidth={7} />
      {[-200, -60, 90, 210].map((lx, i) => <path key={i} d={`M ${lx} -30 q 30 30 0 60`} stroke={CA.madera2} strokeWidth={5} fill="none" />)}
      <ellipse cx={300} cy={0} rx={22} ry={46} fill="#c99a62" stroke={KC.ink} strokeWidth={6} />
    </g>
    <RedHifas T={T} x={480} y={y + 230} g={g} seed={7} n={160} escala={0.32} rot={-90} ancho={3} />
    {Array.from({ length: 34 }, (_, i) => { const x = 10 + i * 32, h = 24 + (i * 37) % 22; return <path key={i} d={`M ${x - 7} ${y + 4} Q ${x} ${y - h * 0.5} ${x + 2} ${y - h} Q ${x + 4} ${y - h * 0.4} ${x + 7} ${y + 4} Z`} fill={CA.pasto2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}

// Tarro de cerveza (base en x, y): vidrio, cerveza ámbar, espuma y burbujas que suben.
function Tarro({ T, x, y, s = 1, rot = 0, rojo = 0, tache = 0 }) {
  const W = 150, H = 220;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${W / 2 - 4} ${-H + 50} Q ${W / 2 + 70} ${-H + 50} ${W / 2 + 70} ${-H / 2} Q ${W / 2 + 70} ${-40} ${W / 2 - 4} ${-40}`} fill="none" stroke={KC.ink} strokeWidth={30} />
    <path d={`M ${W / 2 - 4} ${-H + 50} Q ${W / 2 + 70} ${-H + 50} ${W / 2 + 70} ${-H / 2} Q ${W / 2 + 70} ${-40} ${W / 2 - 4} ${-40}`} fill="none" stroke="#dff3f7" strokeWidth={16} />
    <rect x={-W / 2} y={-H} width={W} height={H} rx={14} fill="#dff3f7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-W / 2 + 12} y={-H + 34} width={W - 24} height={H - 46} rx={8} fill={mixHex(CA.cerveza, '#ff5a3c', rojo)} />
    {Array.from({ length: 9 }, (_, i) => { const u = ((T * 0.6 + i * 0.137) % 1); return <circle key={i} cx={-W / 2 + 26 + (i * 37) % (W - 50)} cy={-14 - u * (H - 60)} r={4 + (i % 3)} fill="#fff" opacity={0.7 * (1 - u)} />; })}
    <path d={`M ${-W / 2 - 4} ${-H + 40} Q ${-W / 2 - 14} ${-H - 10} ${-W / 4} ${-H - 12} Q ${-10} ${-H - 40} ${W / 4} ${-H - 14} Q ${W / 2 + 14} ${-H - 16} ${W / 2 + 4} ${-H + 40} Z`} fill={CA.espuma} stroke={KC.ink} strokeWidth={6} />
    <rect x={-W / 2 + 18} y={-H + 50} width={14} height={H - 80} rx={7} fill="#fff" opacity=".35" />
    {tache > 0 && <g opacity={tache} transform={`translate(0 ${-H / 2}) scale(${klerp(1.6, 1, tache)})`}>
      <path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
      <path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke={KC.red} strokeWidth={20} strokeLinecap="round" />
    </g>}
  </g>;
}

// Átomo esquemático (círculo con letra).
const At = ({ x, y, r = 22, c = '#5b5b66', t = 'C', tc = '#fff' }) => <g><circle cx={x} cy={y} r={r} fill={c} stroke={KC.ink} strokeWidth={4} /><text x={x} y={y + r * 0.38} textAnchor="middle" style={{ font:`700 ${r * 1.05}px ${KF.mono}` }} fill={tc}>{t}</text></g>;
// 1-aminociclopropanol: anillo de 3 carbonos con –OH y –NH₂ en el mismo carbono.
// amina: true = NH₂ libre (1-aminociclopropanol); false = NH unido a la cadena de glutamina (coprina entera).
function ACP({ x, y, s = 1, rot = 0, o = 1, amina = true }) {
  const P = [[0, -46], [-42, 26], [42, 26]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} L ${P[2][0]} ${P[2][1]} Z`} fill="none" stroke={KC.texto} strokeWidth={9} strokeLinejoin="round" />
    <line x1={0} y1={-46} x2={-52} y2={-100} stroke={KC.texto} strokeWidth={8} /><line x1={0} y1={-46} x2={52} y2={-100} stroke={KC.texto} strokeWidth={8} />
    {P.map(([px, py], i) => <At key={i} x={px} y={py} />)}
    <At x={-58} y={-108} r={30} c={KC.blue} t={amina ? 'NH₂' : 'NH'} />
    <At x={60} y={-108} r={30} c={KC.red} t="OH" />
  </g>;
}
// Coprina (esquemática): parte de glutamina (cadena) unida por N al anillo de 3 carbonos. parte 0..1: se separan.
function CoprinaMol({ x, y, s = 1, parte = 0, T = 0 }) {
  const sep = kEase.suave(kclamp(parte, 0, 1)) * 170;
  const ch = [[-330, 0], [-270, -30], [-210, 0], [-150, -30], [-90, 0]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${-sep} ${sep * 0.25})`} opacity={1 - parte * 0.55}>
      <path d={'M ' + ch.map((p) => p.join(' ')).join(' L ') } stroke={KC.texto} strokeWidth={8} fill="none" strokeLinejoin="round" />
      <line x1={-270} y1={-30} x2={-270} y2={-90} stroke={KC.texto} strokeWidth={7} /><line x1={-150} y1={-30} x2={-150} y2={-90} stroke={KC.texto} strokeWidth={7} />
      {ch.map(([px, py], i) => <At key={i} x={px} y={py} r={20} />)}
      <At x={-370} y={30} r={24} c={KC.blue} t="N" /><At x={-270} y={-100} r={22} c={KC.red} t="O" /><At x={-150} y={-100} r={22} c={KC.red} t="O" />
    </g>
    <g transform={`translate(${sep * 0.6} 0)`}>
      {parte < 0.5 && <line x1={-90 - sep * 1.6} y1={sep * 0.25} x2={-8} y2={-66} stroke={KC.texto} strokeWidth={8} opacity={1 - parte * 2} />}
      <ACP x={60} y={10} s={0.8} amina={parte >= 0.5} />
    </g>
  </g>;
}
// Enzima (ALDH) esquemática: bolsa con un hueco (sitio activo) que mira a la izquierda. bloq 0..1: candado.
function Enzima({ T, x, y, r = 220, bloq = 0, trabaja = 1 }) {
  const n = 40, abre = 0.35 + 0.12 * Math.sin(T * 5) * trabaja * (1 - bloq);
  const pts = Array.from({ length: n + 1 }, (_, i) => { const a = Math.PI * (1 - abre * 0.5) - (i / n) * Math.PI * 2 * (1 - abre * 0.5) ; const rr = r * (1 + 0.06 * Math.sin(i * 1.7 + T * 1.3)); return [Math.cos(a + Math.PI) * rr * -1, Math.sin(a + Math.PI) * rr * -1]; });
  const ang0 = Math.PI - abre * Math.PI * 0.5;
  const d = `M 0 0 L ${pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ')} Z`;
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={CA.enzima} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform="scale(-1 1)" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-r * 0.1 + Math.cos(i * 2.1) * r * 0.55} cy={Math.sin(i * 2.1) * r * 0.55} r={r * 0.07} fill="#0c7d76" />)}
    {bloq > 0 && <g transform={`translate(${-r * 0.15} ${-r - 70}) scale(${kEase.rebote(kclamp(bloq, 0, 1))})`}>
      <path d="M -34 0 L -34 -36 Q -34 -74 0 -74 Q 34 -74 34 -36 L 34 0" stroke={KC.ink} strokeWidth={22} fill="none" />
      <path d="M -34 0 L -34 -36 Q -34 -74 0 -74 Q 34 -74 34 -36 L 34 0" stroke="#d8d8d8" strokeWidth={12} fill="none" />
      <rect x={-56} y={-6} width={112} height={88} rx={14} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={32} r={11} fill={KC.ink} /><rect x={-5} y={36} width={10} height={26} fill={KC.ink} />
    </g>}
  </g>;
}
// Hígado (ícono).
function Higado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -20 Q -100 -70 -20 -64 Q 60 -60 110 -50 Q 130 -40 100 -10 Q 40 50 -40 60 Q -110 60 -110 -20 Z" fill="#a8423a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 0 -62 Q -10 0 10 55" stroke="#7d2a24" strokeWidth={5} fill="none" />
  </g>;
}
// Molécula pequeña de la línea de montaje.
function Mol({ x, y, tipo, r = 20, T = 0, i = 0 }) {
  if (tipo === 'et') return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 3 + i) * 20})`}><circle cx={-12} r={r * 0.8} fill={CA.etanol} stroke={KC.ink} strokeWidth={3} /><circle cx={12} r={r * 0.8} fill={CA.etanol} stroke={KC.ink} strokeWidth={3} /><circle cx={30} cy={-8} r={r * 0.5} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>;
  if (tipo === 'ac') return <g transform={`translate(${x} ${y}) rotate(${T * 90 + i * 40})`}>{Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return <path key={k} d={`M ${Math.cos(a - 0.3) * r} ${Math.sin(a - 0.3) * r} L ${Math.cos(a) * r * 1.6} ${Math.sin(a) * r * 1.6} L ${Math.cos(a + 0.3) * r} ${Math.sin(a + 0.3) * r} Z`} fill={CA.acetal} stroke={KC.ink} strokeWidth={2} />; })}<circle r={r} fill={CA.acetal} stroke={KC.ink} strokeWidth={3} /></g>;
  return <g transform={`translate(${x} ${y})`}><circle r={r * 0.9} fill={CA.acetato} stroke={KC.ink} strokeWidth={3} /><circle cx={18} cy={-12} r={r * 0.45} fill={KC.white} stroke={KC.ink} strokeWidth={3} /></g>;
}
// Cara esquemática: rojo 0..1 (rubor), nausea 0..1.
function Cara({ T, x, y, r = 190, rojo = 0, nausea = 0 }) {
  const piel = mixHex(CA.piel, '#ef5a4a', rojo * 0.75);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={piel} stroke={KC.ink} strokeWidth={9} />
    {[-1, 1].map((k) => <ellipse key={k} cx={k * r * 0.48} cy={r * 0.22} rx={r * 0.2} ry={r * 0.12} fill="#e2302a" opacity={rojo * 0.8} />)}
    {[-1, 1].map((k) => <g key={k}><ellipse cx={k * r * 0.34} cy={-r * 0.18} rx={r * 0.09} ry={r * 0.12 * (1 - nausea * 0.5)} fill={KC.ink} />
      <path d={`M ${k * r * 0.2} ${-r * 0.42} L ${k * r * 0.48} ${-r * 0.36 - nausea * 18 * k * k}`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" /></g>)}
    <path d={`M ${-r * 0.32} ${r * 0.5} Q ${-r * 0.16} ${r * 0.5 - 30 * nausea} 0 ${r * 0.5} Q ${r * 0.16} ${r * 0.5 + 30 * nausea} ${r * 0.32} ${r * 0.5}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
    {nausea > 0 && <g transform={`translate(0 ${-r - 70}) rotate(${T * 200})`} opacity={nausea}>
      <path d="M 0 0 m -10 0 a 10 10 0 1 1 20 0 a 20 20 0 1 1 -40 0 a 30 30 0 1 1 60 0 a 40 40 0 1 1 -80 0" stroke="#5bbf3a" strokeWidth={9} fill="none" strokeLinecap="round" />
    </g>}
    {rojo > 0.3 && Array.from({ length: 3 }, (_, i) => { const u = ((T * 0.9 + i / 3) % 1); return <path key={i} d="M 0 -14 Q 9 0 0 9 Q -9 0 0 -14 Z" transform={`translate(${r * 0.86 + i * 8} ${-r * 0.2 + u * 120}) scale(1.6)`} fill="#9fe6ff" stroke={KC.ink} strokeWidth={2} opacity={(1 - u) * rojo} />; })}
  </g>;
}
// Corazón que late; frec en latidos por segundo.
function Corazon({ T, x, y, s = 1, frec = 1.2 }) {
  const ph = (T * frec) % 1, k = 1 + 0.18 * Math.exp(-ph * 9) + 0.09 * Math.exp(-Math.max(0, ph - 0.22) * 12) * (ph > 0.22 ? 1 : 0);
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d="M 0 60 C -120 -20 -80 -110 0 -50 C 80 -110 120 -20 0 60 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -50 -40 Q -60 -10 -40 10" stroke="#fff" strokeWidth={8} fill="none" opacity=".5" strokeLinecap="round" />
  </g>;
}
// Caja de pastillas.
function CajaPastillas({ x, y, s = 1, texto = 'disulfiram' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-80} width={280} height={160} rx={16} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    <rect x={-140} y={-80} width={280} height={44} rx={16} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {[-80, -30, 20, 70].map((px, i) => <ellipse key={i} cx={px + 5} cy={60} rx={18} ry={9} fill="#cfd8ff" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Lepiota aspera (= Echinoderma asperum): sombrero claro con escamas cafés en pirámide, láminas blancas, anillo grande algodonoso.
function Lepiota({ x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1)), H = 210 * c, w = 200 * (0.6 + 0.4 * c);
  const cap = `M ${-w / 2} ${-H} Q ${-w / 2} ${-H - w * 0.42} 0 ${-H - w * 0.46} Q ${w / 2} ${-H - w * 0.42} ${w / 2} ${-H} Q 0 ${-H + 16} ${-w / 2} ${-H} Z`;
  const esc = []; for (let j = 0; j < 3; j++) for (let k = 0; k < 6 - j; k++) esc.push([(-0.36 + (k + j * 0.5) * 0.15) * w, -H - 14 - j * w * 0.13]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -13 0 L -10 ${-H} L 10 ${-H} L 13 0 Z`} fill="#f2e8d8" stroke={KC.ink} strokeWidth={6} />
    {[0.25, 0.4, 0.55].map((u, i) => <path key={i} d={`M -12 ${-H * u} l 8 -8 l 8 8`} stroke="#8a5a32" strokeWidth={4} fill="none" />)}
    {H > 80 && <path d={`M -30 ${-H * 0.7} Q 0 ${-H * 0.62} 30 ${-H * 0.7} L 26 ${-H * 0.8} Q 0 ${-H * 0.76} -26 ${-H * 0.8} Z`} fill="#fbf6ee" stroke={KC.ink} strokeWidth={5} />}
    <path d={`M ${-w / 2 + 8} ${-H + 3} Q 0 ${-H + 14} ${w / 2 - 8} ${-H + 3}`} stroke="#fff" strokeWidth={10} fill="none" />
    <path d={cap} fill="#e9d6b6" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-H - w * 0.38} rx={w * 0.2} ry={w * 0.07} fill="#7a4a24" />
    {esc.map(([ex, ey], i) => <path key={i} d={`M ${ex - 9} ${ey + 7} L ${ex} ${ey - 11} L ${ex + 9} ${ey + 7} Z`} fill="#8a5428" stroke={KC.ink} strokeWidth={2.5} strokeLinejoin="round" />)}
  </g>;
}
// Rata de laboratorio (de perfil, mira a la izquierda).
function Rata({ T, x, y, s = 1 }) {
  const b = Math.sin(T * 9) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 120 10 Q 220 ${-20 + b} 260 40`} stroke="#f0a7b4" strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={40} cy={0} rx={110} ry={62} fill="#f5f2ee" stroke={KC.ink} strokeWidth={7} />
    <path d={`M -50 -30 Q -120 -20 -140 ${10 + b * 0.3} Q -110 30 -50 30 Z`} fill="#f5f2ee" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-140} cy={10} r={9} fill="#f0a7b4" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={-50} cy={-46} rx={26} ry={30} fill="#f0a7b4" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-92} cy={-8} r={8} fill="#d6233c" />
    {[-10, 80].map((px, i) => <ellipse key={i} cx={px} cy={58} rx={18} ry={8} fill="#f0a7b4" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Frasco de laboratorio con etiqueta.
function Frasco({ x, y, s = 1, texto = 'coprina' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-250} width={80} height={50} rx={8} fill="#5a5a66" stroke={KC.ink} strokeWidth={6} />
    <path d="M -90 -200 L 90 -200 L 90 0 Q 90 20 70 20 L -70 20 Q -90 20 -90 0 Z" fill="#e5f4f7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={-110} width={160} height={120} rx={6} fill="#c7f0e3" opacity=".9" />
    <rect x={-74} y={-170} width={148} height={56} rx={6} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-131} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Sello rectangular.
function SelloRect({ T, at, until = Infinity, x, y, texto, color = KC.red, rot = -10, tam = 74 }) {
  if (T < at || T > until) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, k)})`, opacity:kprog(T, at, at + 0.15) * (1 - kprog(T, until - 0.3, until)),
    border:`10px solid ${color}`, borderRadius:16, padding:'6px 26px', font:`400 ${tam}px/1.05 ${KF.titulo}`, color, letterSpacing:'.04em', background:'rgba(255,255,255,.55)' }}>{texto}</div>;
}
// Tarjeta del calendario (día N).
function DiaCard({ T, x, y, dia, hongo = false, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-100} y={-130} width={200} height={260} rx={18} fill={KC.paper} stroke={on > 0 ? mixHex('#16120f', '#ff3b2f', on) : KC.ink} strokeWidth={8 + on * 6} />
    <rect x={-100} y={-130} width={200} height={60} rx={18} fill={hongo ? KC.gold : KC.blue} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-86} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.white}>DÍA {dia}</text>
    {hongo ? <Coprino T={T} x={0} y={110} s={0.62} gotas={false} seed={30} /> : <Tarro T={T} x={0} y={110} s={0.62} rojo={on} />}
  </g>;
}

function CoprinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Ti: CUES.Tinta, Co: CUES.Comestible, Cp: CUES.Coprina, E: CUES.Enzima, P: CUES.Pregunta, A: CUES.Alcohol, S: CUES.Sintomas, V: CUES.Ventana, Es: CUES.Estudio, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const LOCK = K.A + 4.0;                        // "Bloqueada, se acumula"
  const tarroX = klerp(1250, 790, kprog(T, 0.1, 0.8, kEase.sale));
  // línea de montaje del hígado (escena Alcohol)
  const linea = () => {
    const out = []; const N = 12;
    for (let i = 0; i < N; i++) {
      const u = ((T - K.A) * 0.22 + i / N) % 1; if (u < 0) continue;
      const tNace = T - u / 0.22;                                    // cuándo entró esta molécula
      let x = 70 + u * 960, tipo = x < 330 ? 'et' : x < 640 ? 'ac' : 'ao';
      if (tNace + (640 - 70) / 960 / 0.22 > LOCK && x > 560) continue;  // ya no pasa por la enzima: se queda en el montón
      out.push(<Mol key={i} x={x} y={860 + Math.sin(T * 2 + i) * 14} tipo={tipo} T={T} i={i} />);
    }
    const n = Math.min(26, Math.floor(Math.max(0, T - LOCK) * 5.5));
    for (let k = 0; k < n; k++) { const r = krng(k * 3 + 1); out.push(<Mol key={'p' + k} x={360 + r() * 190} y={940 - Math.floor(k / 6) * 34 - r() * 40 + 40} tipo="ac" T={T} i={k} r={17} />); }
    return out;
  };
  const acum = kprog(T, LOCK, K.S - 0.2, kEase.suave);
  const rubor = kprog(T, K.S + 0.6, K.S + 2.2, kEase.suave);
  const naus = kprog(T, K.S + 2.4, K.S + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: racimo gris y una cerveza que llega */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pasto T={T} />
          <RacimoCoprino T={T} x={330} y={1190} s={1.55} seed={1} />
          <Tarro T={T} x={tarroX} y={1200} s={1.15} rot={(1 - kprog(T, 0.6, 1.0, kEase.rebote)) * -8} />
        </>)}
      </Escena>
      {/* 1–2 · nombre (suelo con madera enterrada) y tinta */}
      <Escena T={T} a={K.N} b={K.Co} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <SueloMadera T={T} g={kprog(T, K.N - 0.3, K.N + 1.2)} />
          <RacimoCoprino T={T} x={480} y={1130} s={1.7} at={K.N + 0.1} cada={0.14} seed={2} tinta={kprog(T, K.Ti + 0.2, K.Co - 0.2, kEase.suave)} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.Ti + 0.7} until={K.Co - 0.25} x={810} y={760} r={170} fx={540} fy={760} etiqueta="AL MICROSCOPIO · tinta" interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a3632" />
        {Array.from({ length: 14 }, (_, i) => { const px = r + Math.cos(i * 2.3 + t * 0.25) * (18 + (i * 29) % 120), py = r + Math.sin(i * 2.3 + t * 0.25) * (18 + (i * 29) % 120); return <g key={i} transform={`translate(${px} ${py}) rotate(${i * 47 + t * 15})`}><path d="M 0 -26 C 16 -26 16 26 0 26 C -16 26 -16 -26 0 -26 Z" fill="#141010" stroke="#6b625b" strokeWidth={2} /><circle cx={0} cy={-21} r={3} fill="#c9c0b6" /></g>; })}</svg>} />
      {/* 3 · comestible de joven… pero trae coprina */}
      <Escena T={T} a={K.Co} b={K.Cp} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Coprino T={T} x={230} y={1190} s={1.5} seed={11} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.Co + 1.1} until={K.Cp - 0.2} x={590} y={930} r={190} fx={230} fy={880} etiqueta="POR DENTRO · coprina" tinte={KC.gold}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#141826" /><g transform={`translate(${r + 60} ${r + 30}) scale(0.5)`}><CoprinaMol x={0} y={0} T={t} /></g></svg>} />
      {/* 4 · tu cuerpo la convierte en aminociclopropanol */}
      <Escena T={T} a={K.Cp} b={K.E} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<CoprinaMol x={640} y={860} s={1.15} parte={kprog(T, K.Cp + 0.5, K.Cp + 1.6)} T={T} />)}
      </Escena>
      {/* 5 · bloquea la aldehído deshidrogenasa (hígado) */}
      <Escena T={T} a={K.E} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Higado x={210} y={560} s={0.85} />
          <Enzima T={T} x={600} y={900} r={220} bloq={kprog(T, K.E + 2.3, K.E + 2.8)} />
          <ACP x={klerp(110, 420, kprog(T, K.E + 0.6, K.E + 2.2, kEase.suave))} y={klerp(1080, 900, kprog(T, K.E + 0.6, K.E + 2.2, kEase.suave))} s={0.75} rot={klerp(-40, 90, kprog(T, K.E + 0.6, K.E + 2.2, kEase.suave))} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y qué tiene que ver el alcohol? */}
      <Escena T={T} a={K.P} b={K.A} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Pasto T={T} y={1200} />
          <Tarro T={T} x={250} y={1210} s={1.2} />
          <Interrogacion T={T} x={300} y={830} tam={420} />
        </>)}
      </Escena>
      {/* 7 · alcohol → acetaldehído → (ALDH) → ácido acético; bloqueada, se acumula */}
      <Escena T={T} a={K.A} b={K.S} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <line x1={60} y1={860} x2={1020} y2={860} stroke="rgba(255,255,255,.18)" strokeWidth={70} strokeLinecap="round" />
          <line x1={330} y1={790} x2={330} y2={930} stroke={KC.texto} strokeWidth={4} strokeDasharray="10 10" opacity=".6" />
          {linea()}
          <Enzima T={T} x={690} y={860} r={95} bloq={kprog(T, LOCK - 0.2, LOCK + 0.3)} />
        </>)}
      </Escena>
      {/* 8 · síntomas */}
      <Escena T={T} a={K.S} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        {fsvg(<>
          <Cara T={T} x={300} y={700} r={170} rojo={rubor} nausea={naus} />
          <Corazon T={T} x={780} y={880} s={0.9} frec={klerp(1.1, 3.0, kprog(T, K.S + 1.2, K.S + 2.2))} />
          {T > K.S + 3.6 && <g opacity={kprog(T, K.S + 3.6, K.S + 4.0)}><CajaPastillas x={300} y={1050} s={0.75} /></g>}
        </>)}
      </Escena>
      {/* 9 · ventana de hasta 3 días */}
      <Escena T={T} a={K.V} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {[0, 1, 2, 3].map((d) => <DiaCard key={d} T={T} x={150 + d * 260} y={860} dia={d} hongo={d === 0} on={d ? kprog(T, K.V + 0.5 + d * 0.45, K.V + 0.8 + d * 0.45) : 0} />)}
          <g opacity={kprog(T, K.V + 1.9, K.V + 2.3)}>
            <path d="M 150 1020 L 150 1050 L 930 1050 L 930 1020" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinejoin="round" />
          </g>
        </>)}
      </Escena>
      {/* 10 · Múnich, 2011: otro hongo (Lepiota aspera), la reacción volvía hasta 48 h */}
      <Escena T={T} a={K.Es} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pasto T={T} y={1180} />
          <Lepiota x={250} y={1190} s={1.45} crece={kprog(T, K.Es + 2.6, K.Es + 3.4)} />
          {T > K.Es + 3.6 && <g opacity={kprog(T, K.Es + 3.6, K.Es + 4.0)}>
            <line x1={470} y1={1050} x2={1010} y2={1050} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
            {[0, 24, 48].map((h, i) => { const on = kprog(T, K.Es + 4.0 + i * 0.7, K.Es + 4.3 + i * 0.7); return <g key={h}>
              <line x1={500 + i * 230} y1={1030} x2={500 + i * 230} y2={1070} stroke={KC.ink} strokeWidth={8} />
              <text x={500 + i * 230} y={1112} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{h} h</text>
              {on > 0 && <g transform={`translate(${500 + i * 230} 1015) scale(${0.55 * kEase.rebote(on)})`}><Tarro T={T} x={0} y={0} rojo={on} /></g>}
            </g>; })}
          </g>}
        </>)}
      </Escena>
      {/* 11 · se estudió como medicina contra el alcoholismo; en ratas dañó los testículos */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={-20} y={1150} width={KW + 40} height={800} fill="#efe7ff" stroke={KC.ink} strokeWidth={8} />
          <Frasco x={300} y={1150} s={1.5} />
          {T > K.D + 2.4 && <Rata T={T} x={klerp(1250, 760, kprog(T, K.D + 2.4, K.D + 3.2, kEase.sale))} y={930} s={1.1} />}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma imagen del inicio, ya entendida */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pasto T={T} />
          <RacimoCoprino T={T} x={330} y={1190} s={1.55} seed={1} tinta={0.25 + 0.5 * kprog(T, K.C, K.Ou)} />
          <Tarro T={T} x={790} y={1200} s={1.15} tache={kprog(T, K.C + 1.0, K.C + 1.4, kEase.sale)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.6} until={K.G + 4.2} texto="comestible" x={290} y={430} tam={46} />
      <MitoTachado T={T} at={K.G + 0.7} tacharEn={K.G + 1.9} until={K.G + 4.2} texto="venenoso" x={290} y={540} tam={46} />
      <Chip T={T} at={K.G + 2.3} until={K.N - 0.25} texto="depende de lo que tomes después" x={540} y={1130} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.N + 0.9} until={K.Ti - 0.3} x={60} y={420} texto="coprino entintado" tam={38} color={KC.ink} />
      <Etq T={T} at={K.N + 1.2} until={K.Co - 0.3} x={60} y={472} texto="Coprinopsis atramentaria" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.N + 1.8} until={K.Ti - 0.3} x={600} y={770} texto="sombrero gris, acanalado" tam={26} color={KC.ink} />
      <Etq T={T} at={K.N + 2.4} until={K.Ti - 0.3} x={680} y={900} texto="en racimos" tam={32} color={KC.ink} />
      <Etq T={T} at={K.N + 2.0} until={K.Co - 0.3} x={1040} y={1400} lado="izq" texto="madera enterrada" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Ti + 0.3} until={K.Co - 0.3} x={60} y={420} texto="láminas → tinta negra" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ti + 1.2} until={K.Co - 0.3} x={640} y={990} texto="esporas negras, 8–11 µm" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.2} until={K.Cp - 0.25} texto="se considera comestible de joven" x={370} y={470} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.Cp + 0.1} until={K.E - 0.3} texto="POR DENTRO · tu cuerpo" x={540} y={420} tam={34} mono borde={KC.gold} />
      <Etq T={T} at={K.Cp + 0.3} until={K.Cp + 1.5} x={160} y={700} texto="coprina" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Cp + 1.6} until={K.E - 0.3} x={1040} y={1000} lado="izq" texto="1-aminociclopropanol" tam={34} color={KC.gold2} />
      <Chip T={T} at={K.E + 0.1} until={K.P - 0.3} texto="POR DENTRO · hígado" x={370} y={420} tam={34} mono borde={KC.gold} />
      <Etq T={T} at={K.E + 0.5} until={K.P - 0.3} x={60} y={1150} texto="aldehído deshidrogenasa (ALDH)" tam={32} color={CA.acetato} />
      <Etq T={T} at={K.E + 2.6} until={K.P - 0.3} x={690} y={760} texto="bloqueada" tam={34} color={KC.gold2} />
      <Chip T={T} at={K.A + 0.1} until={K.S - 0.3} texto="POR DENTRO · hígado" x={540} y={420} tam={34} mono borde={KC.gold} />
      <Etq T={T} at={K.A + 0.4} until={K.S - 0.3} x={60} y={720} texto="alcohol" tam={30} color={CA.etanol} />
      <Etq T={T} at={K.A + 1.4} until={K.S - 0.3} x={330} y={720} texto="acetaldehído" tam={30} color={CA.acetal} />
      <Etq T={T} at={K.A + 2.6} until={LOCK} x={760} y={720} texto="ácido acético" tam={30} color={CA.acetato} />
      <Etq T={T} at={K.A + 2.0} until={K.S - 0.3} x={600} y={1000} texto="ALDH" tam={30} color={KC.texto} />
      <Medidor T={T} at={LOCK - 0.2} until={K.S - 0.3} valor={0.12 + 0.85 * acum} etiqueta="acetaldehído" texto={() => 'se acumula'} y={1010} color={CA.acetal} />
      <Cronometro T={T} at={K.S + 0.2} until={K.S + 3.4} factor={90} etiqueta="DESPUÉS DE BEBER" x={300} y={420} />
      <Etq T={T} at={K.S + 0.9} until={K.V - 0.3} x={60} y={920} texto="cara roja" tam={32} color={KC.ink} />
      <Etq T={T} at={K.S + 1.6} until={K.V - 0.3} x={1040} y={1000} lado="izq" texto="corazón acelerado" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 2.5} until={K.S + 3.5} x={60} y={1000} texto="náusea y vómito" tam={32} color={KC.ink} />
      <Chip T={T} at={K.S + 3.9} until={K.V - 0.25} texto="= efecto del disulfiram, fármaco contra el alcoholismo" x={540} y={1150} tam={28} borde={KC.blue} />
      <Chip T={T} at={K.V + 2.0} until={K.Es - 0.25} texto="hasta ~3 días después del hongo" x={540} y={1150} tam={40} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2011" quien="Centro de toxicología de Múnich" revista="Haberl et al., Clinical Toxicology" y={600} />
      <Chip T={T} at={K.Es + 1.2} until={K.Es + 3.0} texto="5 pacientes · otro hongo" x={540} y={900} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Es + 3.2} until={K.D - 0.3} x={60} y={430} texto="Lepiota aspera" it tam={38} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.5} until={K.D - 0.3} x={60} y={482} texto="su toxina: desconocida en 2011" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Es + 4.0} until={K.D - 0.3} x={470} y={830} texto="la reacción volvía al beber" tam={28} color={KC.ink} />
      <Chip T={T} at={K.D + 0.4} until={K.D + 2.5} texto="¿medicina contra el alcoholismo?" x={540} y={1130} tam={36} borde={KC.ink} />
      <SelloRect T={T} at={K.D + 3.6} x={300} y={760} texto="DESCARTADA" until={K.C - 0.1} />
      <Chip T={T} at={K.D + 3.0} until={K.C - 0.25} texto="en ratas: daño en testículos" x={540} y={1130} tam={38} borde={KC.red} />
      <Etq T={T} at={K.D + 3.1} until={K.C - 0.3} x={560} y={800} texto="rata de laboratorio" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.C + 3.4} texto="comestible… según lo que hagas después" x={540} y={1130} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="ante la duda: no lo comas" x={420} y={460} tam={40} borde={KC.red} />
      <Chip T={T} at={K.C + 4.6} until={K.Ou} texto="¿te sientes mal? → urgencias" x={540} y={1130} tam={38} borde={KC.red} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou} x={40} y={345} texto="No es guía para identificar hongos" tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.Co} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.Ti + 0.7} until={K.Co - 0.25} texto="10 µm" largo={52} x={760} y={850} />
      <BarraEscala T={T} at={K.Co} until={K.Cp} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Cp} until={K.P} texto="1 nm · esquemático" largo={120} />
      <BarraEscala T={T} at={K.P} until={K.A} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.A} until={K.S} texto="esquemático" largo={120} />
      <BarraEscala T={T} at={K.Es + 3.0} until={K.D} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="¿Comestible? *Depende*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Ti - 0.1} texto="Gris y *en racimos*" />
      <Subtitulo T={T} idx={2} at={K.Ti + 0.1} until={K.Co - 0.1} texto="Láminas → *tinta negra*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Cp - 0.1} texto="Pero trae *coprina*" />
      <Subtitulo T={T} idx={4} at={K.Cp + 0.1} until={K.E - 0.1} texto="*Aminociclopropanol*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.P - 0.1} texto="Bloquea *una enzima*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.A - 0.1} texto="¿Y el *alcohol?*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.S - 0.1} texto="El *acetaldehído* sube" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.V - 0.1} texto="Cara roja y *náusea*" />
      <Subtitulo T={T} idx={9} at={K.V + 0.1} until={K.Es - 0.1} texto="Hasta *3 días después*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.D - 0.1} texto="Múnich, 2011: *otro hongo*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="Medicina *descartada*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="*No lo comas* si dudas" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.Ti - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Co + 0.4, K.Cp - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.E + 0.35, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.A - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 0.5, K.V - 0.5, 'avatar_11_sorprendido', 'arriba-der'],
        [K.V + 0.3, K.Es - 0.25, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Es + 3.5, K.D - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.D + 0.4, K.C - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="114" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CoprinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CoprinaShot /></CompositionStage></div>;
}
window.CoprinaApp = CoprinaApp;
