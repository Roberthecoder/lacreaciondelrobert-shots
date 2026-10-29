// Shot Fungi Mati #16 · Tu salsa de soya la cocinó un hongo: el koji — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const KJ = { soya:'#2b140a', soya2:'#5a2e14', frijol:'#ecd193', frijol2:'#c9a35e', trigo:'#e7c47c', tostado:'#a8652a', arroz:'#fbf8ef', salmon:'#ff8a5c',
  koji:'#c8d36a', koji2:'#e8eeb0', hifa:'#fff4d6', salmuera:'#d8c79a', madera:'#9a6436', madera2:'#7a4a22', gris:'#7d7f86' };

// Botella de salsa de soya (genérica, sin marca). Centro (0,0); boca en (0,-200). ang en grados.
function Botella({ x, y, s = 1, ang = 0, nivel = 0.8, fantasma = 0, T = 0 }) {
  const top = 180 - 300 * nivel;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <defs><clipPath id="kjCuerpo"><path d="M -80 -100 Q -80 -125 -45 -125 L 45 -125 Q 80 -125 80 -100 L 80 160 Q 80 180 60 180 L -60 180 Q -80 180 -80 160 Z" /></clipPath></defs>
    <rect x={-28} y={-185} width={56} height={70} rx={10} fill="rgba(230,240,245,.75)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-208} width={68} height={30} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <path d="M -80 -100 Q -80 -125 -45 -125 L 45 -125 Q 80 -125 80 -100 L 80 160 Q 80 180 60 180 L -60 180 Q -80 180 -80 160 Z" fill="rgba(230,240,245,.6)" stroke={KC.ink} strokeWidth={7} />
    <g clipPath="url(#kjCuerpo)"><rect x={-90} y={top} width={180} height={400} fill={KJ.soya} transform={`rotate(${-ang} 0 ${top})`} /></g>
    {fantasma > 0 && <g opacity={fantasma} style={{ filter:`drop-shadow(0 0 10px ${KC.gold2})` }}>
      {[[-50, 150, -10, 40, 30, -30], [40, 160, 0, 60, -40, -10], [-20, 170, 30, 90, 10, 20], [50, 120, 10, 0, 50, -60]].map(([x1, y1, cx, cy, x2, y2], i) =>
        <path key={i} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2 + Math.sin(T * 2 + i) * 6}`} stroke={KC.gold2} strokeWidth={5} fill="none" strokeLinecap="round" />)}
      <line x1={0} y1={170} x2={0} y2={-40} stroke={KC.gold2} strokeWidth={6} />
      <circle cx={0} cy={-60} r={22} fill="none" stroke={KC.gold2} strokeWidth={5} />
      {Array.from({ length: 9 }, (_, i) => { const an = -Math.PI * (0.1 + i * 0.1); return [1, 2, 3].map((k) => <circle key={i + '-' + k} cx={Math.cos(an) * (22 + k * 12)} cy={-60 + Math.sin(an) * (22 + k * 12)} r={5} fill={KC.gold2} />); })}
    </g>}
    <rect x={-62} y={10} width={124} height={86} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={66} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>SOYA</text>
    <path d="M -60 -90 L -60 -10" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".55" />
  </g>;
}
// Plato con sushi y platito de soya. lleno 0..1 = charquito de salsa.
function PlatoSushi({ T, lleno = 1 }) {
  return <g>
    <rect x={110} y={1080} width={860} height={86} rx={40} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={260} cy={1086} rx={118} ry={38} fill="#f2f2f2" stroke={KC.ink} strokeWidth={6} />
    {lleno > 0 && <ellipse cx={260} cy={1088} rx={96 * lleno} ry={26 * lleno} fill={KJ.soya} />}
    {lleno > 0 && <ellipse cx={240} cy={1082} rx={40 * lleno} ry={8 * lleno} fill="#8a4a24" opacity=".6" />}
    {[[560, 0], [800, 1]].map(([x, i]) => <g key={i} transform={`translate(${x} ${1060 + Math.sin(T * 2 + i) * 2})`}>
      <rect x={-95} y={-30} width={190} height={60} rx={28} fill={KJ.arroz} stroke={KC.ink} strokeWidth={6} />
      <path d="M -105 -22 Q -100 -70 0 -66 Q 100 -70 105 -22 Q 0 -6 -105 -22 Z" fill={KJ.salmon} stroke={KC.ink} strokeWidth={6} />
      {[-60, -20, 20, 60].map((dx) => <path key={dx} d={`M ${dx - 12} -58 Q ${dx} -40 ${dx + 14} -20`} stroke="#ffd2bd" strokeWidth={7} fill="none" strokeLinecap="round" />)}
    </g>)}
  </g>;
}
// Frijol de soya (de lado) y grano de trigo (alargado, con surco). tost 0..1 = dorado; parte 0..1 = se quiebra.
function Frijol({ x, y, s = 1, rot = 0, infla = 1, color = KJ.frijol }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (0.8 + 0.2 * infla)})`}>
    <ellipse rx={34} ry={26} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -12 -18 Q 0 -24 12 -18" stroke="#8a6a3a" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
function Trigo({ x, y, s = 1, rot = 0, tost = 0, parte = 0 }) {
  const c = mixHex(KJ.trigo, KJ.tostado, tost);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`translate(${-parte * 8} ${-parte * 4}) rotate(${-parte * 12})`}><path d="M -40 0 Q -38 -20 0 -20 L 0 20 Q -38 20 -40 0 Z" fill={c} stroke={KC.ink} strokeWidth={5} /></g>
    <g transform={`translate(${parte * 8} ${parte * 4}) rotate(${parte * 12})`}><path d="M 40 0 Q 38 -20 0 -20 L 0 20 Q 38 20 40 0 Z" fill={c} stroke={KC.ink} strokeWidth={5} /></g>
    {parte < 0.2 && <path d="M -30 2 Q 0 -4 30 2" stroke={mixHex('#a07a3a', '#5a3214', tost)} strokeWidth={4} fill="none" />}
  </g>;
}
// Charola de koji: frijoles y trigo mezclados. mezcla 0..1 (separados → revueltos), pelusa 0..1 (crece el hongo).
const KJ_GR = (() => { const g = krng(16), out = []; for (let i = 0; i < 22; i++) { const soya = i % 2 === 0; const sx = soya ? 190 + (i / 2 % 6) * 62 : 590 + (Math.floor(i / 2) % 6) * 62;
  const sy = 880 + Math.floor(i / 12) * 70 + (g() - 0.5) * 18; out.push({ soya, sx, sy, mx: 190 + g() * 690, my: 860 + g() * 150, rot: (g() - 0.5) * 70, s: 0.9 + g() * 0.25, ph: g() * 6 }); } return out; })();
function Charola({ T, mezcla = 0, tost = 0, parte = 0, infla = 1, pelusa = 0, gris = 0, vapor = 0, esporas = 0, at = 0 }) {
  return <g>
    <path d="M 120 820 L 960 820 L 930 1080 L 150 1080 Z" fill={KJ.madera} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 150 840 L 930 840 L 910 1060 L 170 1060 Z" fill={KJ.madera2} />
    {KJ_GR.map((q, i) => { const x = klerp(q.sx, q.mx, mezcla), y = klerp(q.sy, q.my, mezcla); return q.soya
      ? <Frijol key={i} x={x} y={y} s={q.s} rot={q.rot} infla={infla} color={mixHex(KJ.frijol, KJ.gris, gris)} />
      : <Trigo key={i} x={x} y={y} s={q.s} rot={q.rot} tost={tost} parte={parte} />; })}
    {pelusa > 0 && KJ_GR.map((q, i) => { const x = klerp(q.sx, q.mx, mezcla), y = klerp(q.sy, q.my, mezcla); const c = mixHex(KJ.koji2, '#b9bcc4', gris);
      return <g key={'p' + i} opacity={pelusa * 0.9}>
        <circle cx={x} cy={y} r={30 + 22 * pelusa + Math.sin(T * 3 + q.ph) * 2} fill={c} opacity=".55" />
        {Array.from({ length: 6 }, (_, k) => { const an = q.ph + k * 1.05; return <circle key={k} cx={x + Math.cos(an) * 26 * pelusa} cy={y + Math.sin(an) * 20 * pelusa} r={5 * pelusa} fill={mixHex(KJ.koji, '#8d9096', gris)} />; })}
      </g>; })}
    {vapor > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.7 + i / 6) % 1); return <path key={'v' + i} d={`M ${200 + i * 60} ${860 - u * 220} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.7 * vapor} />; })}
    {esporas > 0 && Array.from({ length: 40 }, (_, i) => { const g = krng(i + 3); const x0 = 160 + g() * 760, t0 = at + g() * 1.2; const u = kprog(T, t0, t0 + 0.9, kEase.suave); if (u <= 0) return null;
      return <circle key={'e' + i} cx={x0 + Math.sin(T * 3 + i) * 10} cy={klerp(560, 860 + g() * 160, u)} r={7} fill={KJ.koji} stroke={KC.ink} strokeWidth={2} opacity={esporas} />; })}
  </g>;
}
// Conidióforo de Aspergillus: pie (estípite) que sube, vesícula redonda, fiálides alrededor y cadenas de conidios hacia afuera.
function Conidioforo({ x, y, alto = 300, rv = 40, p = 1, color = KJ.koji, n = 11, cad = 5, T = 0 }) {
  if (p <= 0) return null;
  const h = alto * kclamp(p * 1.6, 0, 1), cv = kclamp(p * 2 - 0.6, 0, 1), cn = kclamp(p * 2 - 1, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -9 0 L -6 ${-h} L 6 ${-h} L 9 0 Z`} fill={KJ.hifa} stroke={KC.ink} strokeWidth={3} />
    {cv > 0 && <g transform={`translate(0 ${-h})`}>
      {Array.from({ length: n }, (_, i) => { const an = -Math.PI * (0.05 + 0.9 * i / (n - 1)); const ca = Math.cos(an), sa = Math.sin(an);
        return <g key={i}>
          <rect x={-5} y={-rv - 18} width={10} height={20} rx={4} fill="#efe6c8" stroke={KC.ink} strokeWidth={2} transform={`rotate(${an * 180 / Math.PI + 90})`} opacity={cv} />
          {Array.from({ length: cad }, (_, k) => { const on = kclamp(cn * cad - k, 0, 1); if (on <= 0) return null; const d = rv + 24 + k * 15;
            return <circle key={k} cx={ca * d} cy={sa * d} r={7 * on} fill={color} stroke={KC.ink} strokeWidth={2} />; })}
        </g>; })}
      <circle r={rv * cv} fill="#efe6c8" stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
// Tijeras = enzima (símbolo). abre oscila con T.
function Tijera({ x, y, s = 1, T = 0, rot = 0, color = KC.cyan }) {
  const a = 14 + 12 * Math.sin(T * 14);
  const hoja = (sg) => <g transform={`rotate(${sg * a})`}>
    <path d={`M 0 0 L 70 ${sg * -6} L 74 0 Z`} fill="#e6edf2" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={-30} cy={sg * 10} rx={20} ry={12} fill="none" stroke={color} strokeWidth={8} /></g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{hoja(1)}{hoja(-1)}<circle r={5} fill={KC.ink} /></g>;
}
// Cadena que se corta: cuentas (aminoácidos) o hexágonos (glucosa). corte(k) = momento en que se rompe el enlace k.
function Cuenta({ x, y, r = 24, color, hex = false, brillo = 0 }) {
  const st = brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${KC.gold2})` } : null;
  if (hex) { const d = Array.from({ length: 6 }, (_, i) => { const an = Math.PI / 3 * i + Math.PI / 6; return `${i ? 'L' : 'M'} ${(x + Math.cos(an) * r).toFixed(1)} ${(y + Math.sin(an) * r).toFixed(1)}`; }).join(' ') + ' Z';
    return <path d={d} fill={color} stroke={KC.ink} strokeWidth={4} style={st} />; }
  return <circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={4} style={st} />;
}
function CadenaCorta({ T, pts, t0, paso = 0.13, hex = false, colores, r = 24, brillaIdx = -1, brilla = 0, seed = 2, dispersa = 90 }) {
  const g = krng(seed), off = pts.map(() => [(g() - 0.5) * 2, (g() - 0.5) * 2]);
  const ct = (i) => t0 + Math.max(0, i - 1) * paso;
  const padre = (i) => (pts[i][2] != null ? pts[i][2] : i - 1);
  const N = pts.map(([p, q], i) => { const sep = kprog(T, ct(i), ct(i) + 0.9, kEase.sale); return [p + off[i][0] * dispersa * sep, q + off[i][1] * dispersa * sep + Math.sin(T * 2 + i) * 6]; });
  let tx = -1; for (let i = 1; i < pts.length; i++) if (T < ct(i)) { tx = i; break; }
  return <g>
    {pts.map((_, i) => i > 0 && T < ct(i) ? <line key={'b' + i} x1={N[padre(i)][0]} y1={N[padre(i)][1]} x2={N[i][0]} y2={N[i][1]} stroke={KC.ink} strokeWidth={9} /> : null)}
    {N.map(([x, y], i) => <Cuenta key={i} x={x} y={y} r={i === brillaIdx ? r * (1 + 0.35 * brilla) : r} hex={hex} color={i === brillaIdx && brilla > 0 ? KC.gold2 : colores[i % colores.length]} brillo={i === brillaIdx ? brilla : 0} />)}
    {tx > 0 && T >= t0 - 0.6 && <Tijera T={T} x={(N[tx][0] + N[padre(tx)][0]) / 2 - 40} y={(N[tx][1] + N[padre(tx)][1]) / 2 - 70} rot={60} s={1.1} />}
  </g>;
}
// Cuba de salmuera (de madera) con líquido. tinte 0..1 = se oscurece.
function Cuba({ T, x = 540, y = 920, tinte = 0, children }) {
  const liq = mixHex(KJ.salmuera, KJ.soya2, tinte);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -330 -280 L 330 -280 L 300 260 Q 0 290 -300 260 Z" fill={KJ.madera} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[-200, -70, 70, 200].map((dx) => <line key={dx} x1={dx} y1={-275} x2={dx * 0.92} y2={268} stroke={KJ.madera2} strokeWidth={6} />)}
    <rect x={-345} y={-180} width={690} height={26} rx={8} fill="#3d3f45" stroke={KC.ink} strokeWidth={5} />
    <rect x={-330} y={140} width={650} height={26} rx={8} fill="#3d3f45" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-280} rx={330} ry={56} fill={liq} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-120} cy={-292} rx={80} ry={12} fill="#fff" opacity=".35" transform={`translate(${Math.sin(T * 1.5) * 20} 0)`} />
    {children}
  </g>;
}
// Bacteria láctica en tétrada (Tetragenococcus: cocos de a cuatro) y levadura ovalada con yema (Zygosaccharomyces).
function Tetrada({ x, y, s = 1, T = 0, seed = 1 }) {
  return <g transform={`translate(${x + mece(T, seed, 0.4) * 6} ${y + mece(T, seed + 2, 0.4) * 6}) rotate(${seed * 37}) scale(${s})`}>
    {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={15} fill={KC.mint} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
function Levadura({ x, y, s = 1, T = 0, seed = 1, brote = 1 }) {
  return <g transform={`translate(${x + mece(T, seed, 0.3) * 8} ${y + mece(T, seed + 5, 0.3) * 8}) rotate(${seed * 23}) scale(${s})`}>
    <ellipse rx={78} ry={62} fill="#ffd98a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-14} cy={6} rx={22} ry={18} fill="#e9b45a" opacity=".8" />
    {brote > 0 && <ellipse cx={82} cy={-34} rx={30 * brote} ry={26 * brote} fill="#ffd98a" stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
// Tira de genes (7 bloques). huecos = índices que faltan; apagado 0..1 = gris.
function TiraGenes({ x, y, huecos = [], apagado = 0, rotos = [], p = 1 }) {
  const cols = [KC.pink, KC.yellow, KC.cyan, KC.orange, KC.mint, KC.lilac, KC.coral];
  return <g transform={`translate(${x} ${y})`}>
    <line x1={-10} y1={0} x2={7 * 52 + 10} y2={0} stroke={KC.ink} strokeWidth={6} />
    {cols.map((c, i) => { if (huecos.includes(i)) return <rect key={i} x={i * 52 + 4} y={-20} width={44} height={40} rx={8} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={3} strokeDasharray="6 6" />;
      const on = kclamp(p * 7 - i, 0, 1); return <g key={i} opacity={on}><rect x={i * 52 + 4} y={-20} width={44} height={40} rx={8} fill={mixHex(c, '#6d6f76', apagado)} stroke={KC.ink} strokeWidth={4} />
        {rotos.includes(i) && <path d={`M ${i * 52 + 14} -20 L ${i * 52 + 26} 0 L ${i * 52 + 18} 20`} stroke={KC.ink} strokeWidth={4} fill="none" />}</g>; })}
  </g>;
}
// Molécula de aflatoxina (esquemática): anillos rojos.
function Aflatoxina({ x, y, s = 1, rot = 0 }) {
  const hx = (cx) => Array.from({ length: 6 }, (_, i) => { const an = Math.PI / 3 * i; return `${i ? 'L' : 'M'} ${cx + Math.cos(an) * 20} ${Math.sin(an) * 20}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{[-34, 0, 34].map((cx) => <path key={cx} d={hx(cx)} fill="none" stroke={KC.red} strokeWidth={7} />)}</g>;
}
// Interruptor ON/OFF.
function Interruptor({ x, y, off = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-30} width={120} height={60} rx={30} fill={mixHex('#3fbf4a', '#6d6f76', off)} stroke={KC.ink} strokeWidth={5} />
    <circle cx={klerp(30, -30, off)} cy={0} r={24} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={62} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>{off > 0.5 ? 'OFF' : 'ON'}</text>
  </g>;
}
// Botellita de sake (tokkuri), tazón de miso y medalla.
function Tokkuri({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -20 -200 L 20 -200 L 22 -150 Q 90 -90 80 0 Q 70 40 0 42 Q -70 40 -80 0 Q -90 -90 -22 -150 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -76 -40 Q 0 -20 76 -40" stroke={KC.blue} strokeWidth={10} fill="none" />
    <ellipse cx={0} cy={-200} rx={24} ry={7} fill={KC.ink} />
  </g>;
}
function Miso({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => { const u = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${-40 + i * 40} ${-60 - u * 120} q 15 -25 0 -50`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.8} />; })}
    <path d="M -120 -40 L 120 -40 Q 110 40 0 44 Q -110 40 -120 -40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-40} rx={120} ry={22} fill="#c98b4a" stroke={KC.ink} strokeWidth={6} />
    {[-50, 10, 60].map((dx) => <rect key={dx} x={dx - 12} y={-50} width={22} height={16} rx={3} fill="#fbf5e6" stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
function Medalla({ T, at, x, y, r = 150 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.5, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${k}) rotate(${Math.sin(T * 2) * 4})`}>
    <path d={`M -70 ${-r - 120} L -20 ${-r + 10} L 20 ${-r + 10} L 70 ${-r - 120}`} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <circle r={r} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <circle r={r - 22} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
    <text y={-28} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>HONGO</text>
    <text y={24} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>NACIONAL</text>
    <text y={78} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>2006</text>
  </g>;
}
// Calendario que pasa hojas.
function Calendario({ T, at, x, y }) {
  if (T < at) return null;
  const MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO'];
  const u = (T - at) * 4.5, i = Math.min(MES.length - 1, Math.floor(u)), f = i < MES.length - 1 ? u - i : 0, e = kprog(T, at, at + 0.3, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <rect x={-110} y={-120} width={220} height={240} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={-120} width={220} height={60} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text y={-72} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill="#fff">{MES[i]}</text>
    <text y={60} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
    {f > 0 && <rect x={-110} y={-60} width={220} height={180 * (1 - f)} fill="#f4efe4" stroke={KC.ink} strokeWidth={4} transform={`skewX(${-f * 20})`} />}
  </g>;
}
// Tubito de cepa.
function Tubo({ x, y, on = 1 }) {
  if (on <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${on})`}><circle r={15} fill="#eaf6ff" stroke={KC.ink} strokeWidth={4} /><circle r={9} fill={KJ.koji} /></g>;
}

// Hifas finas que crecen sobre/dentro del grano (en la lupa). p 0..1
const KJ_HIFAS = (() => { const g = krng(7), out = []; for (let i = 0; i < 9; i++) { const x0 = 140 + g() * 300, y0 = 400 + g() * 40, pts = [[x0, y0]]; let a = -Math.PI / 2 + (g() - 0.5) * 2.4, x = x0, y = y0;
  for (let k = 0; k < 14; k++) { a += (g() - 0.5) * 0.6; x += Math.cos(a) * 18; y += Math.sin(a) * 18 + (i % 3 === 0 ? 14 : 0); pts.push([x, y]); } out.push(pts); } return out; })();
function InteriorKoji({ T, r, a, enz }) {
  const p = kprog(T, a, a + 2.2, kEase.suave), c = kprog(T, a + 0.6, a + 3.0);
  return <svg width={r * 2} height={r * 2} viewBox="0 0 580 580" style={{ position:'absolute', left:0, top:0 }}>
    <rect width={580} height={580} fill={KC.noche} />
    <path d="M 0 420 Q 150 395 290 410 Q 430 425 580 400 L 580 580 L 0 580 Z" fill="#c9a35e" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={30 + i * 58} cy={480 + (i % 3) * 30} r={14} fill="#e2c486" opacity=".7" />)}
    {KJ_HIFAS.map((pts, i) => { const n = Math.max(2, Math.ceil(pts.length * p)); return <path key={i} d={'M ' + pts.slice(0, n).map((q) => q.join(' ')).join(' L ')} stroke={KJ.hifa} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />; })}
    <Conidioforo x={300} y={410} alto={210} rv={36} p={c} T={T} />
    {enz > 0 && [[150, 460], [420, 470], [260, 520]].map(([x, y], i) => <g key={i} opacity={enz}><Tijera T={T + i} x={x} y={y} s={0.6} rot={-20 + i * 30} /></g>)}
    {enz > 0 && <text x={290} y={570} textAnchor="middle" opacity={enz} style={{ font:`700 34px ${KF.mono}` }} fill={KC.cyan}>enzimas = tijeras</text>}
  </svg>;
}

function KojiShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Si: CUES.Siembra, Cr: CUES.Crece, Pr: CUES.Proteinas, Al: CUES.Almidon, Sa: CUES.Salmuera, P: CUES.Pregunta, Mo: CUES.Moromi, Co: CUES.Color, E: CUES.Estudio, Pm: CUES.Primo, N: CUES.Nacional, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const inclina = kprog(T, K.G + 0.05, K.G + 0.7, kEase.sale) * (1 - kprog(T, K.G + 3.4, K.G + 4.2, kEase.suave));
  const chorro = kprog(T, K.G + 0.6, K.G + 0.8) * (1 - kprog(T, K.G + 3.2, K.G + 3.5));
  const lleno = kprog(T, K.G + 0.8, K.G + 3.0);
  const ang = -105 * inclina, boca = [450 + 200 * Math.sin(ang * Math.PI / 180), 760 - 200 * Math.cos(ang * Math.PI / 180)];
  const PROT = Array.from({ length: 13 }, (_, i) => [130 + i * 68, 820 + Math.sin(i * 0.9) * 50]);
  const ALM = [...Array.from({ length: 9 }, (_, i) => [160 + i * 80, 860]), [480, 780, 4], [530, 710, 9], [590, 650, 10]];
  const CADM = Array.from({ length: 6 }, (_, i) => [220 + i * 60, 1000 + Math.sin(i) * 20]);
  const mueren = kprog(T, K.Sa + 1.4, K.Sa + 2.6);
  const caida = kprog(T, K.Sa + 0.1, K.Sa + 0.8, (x) => x * x);
  const oscuro = kprog(T, K.Co + 0.3, K.Co + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la botella sirve salsa sobre el sushi */}
      <Escena T={T} a={K.G} b={K.Si} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoSushi T={T} lleno={lleno} />
          {chorro > 0 && <path d={`M ${boca[0]} ${boca[1]} Q ${boca[0] + 6} ${(boca[1] + 1080) / 2} ${262} ${klerp(boca[1], 1080, chorro)}`} stroke={KJ.soya} strokeWidth={14 * chorro} fill="none" strokeLinecap="round" />}
          <Botella x={450} y={760} ang={ang} nivel={0.8 - lleno * 0.25} />
        </>)}
      </Escena>
      {/* 1–2 · siembra y crecimiento del koji en la charola, con lupa al microscopio */}
      <Escena T={T} a={K.Si} b={K.Pr} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Charola T={T} mezcla={kprog(T, K.Si + 2.4, K.Si + 3.2, kEase.suave)} tost={kprog(T, K.Si + 1.2, K.Si + 2.2)} parte={kprog(T, K.Si + 1.8, K.Si + 2.2, kEase.rebote)}
          infla={kprog(T, K.Si, K.Si + 1.2, kEase.sale)} vapor={1 - kprog(T, K.Si + 1.4, K.Si + 2.0)} esporas={1 - kprog(T, K.Cr + 0.4, K.Cr + 1.2)} at={K.Si + 3.0}
          pelusa={kprog(T, K.Cr + 0.2, K.Cr + 2.0, kEase.suave)} />)}
      </Escena>
      <Lupa T={T} at={K.Cr + 2.0} until={K.Pr - 0.35} x={560} y={820} r={290} fx={420} fy={930} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · HIFAS Y ESPORAS"
        interior={(t, r) => <InteriorKoji T={t} r={r} a={K.Cr + 2.2} enz={kprog(t, K.Cr + 4.0, K.Cr + 4.4)} />} />
      {/* 3–4 · las enzimas cortan proteínas y almidón (fondo oscuro, moléculas) */}
      <Escena T={T} a={K.Pr} b={K.Sa}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          {T < K.Al + 0.3 && <g opacity={1 - kprog(T, K.Al - 0.2, K.Al + 0.3)}>
            <CadenaCorta T={T} pts={PROT} t0={K.Pr + 0.9} paso={0.16} colores={[KC.pink, KC.cyan, KC.orange, KC.lilac, KC.mint]} r={32} brillaIdx={6} brilla={kprog(T, K.Pr + 3.0, K.Pr + 3.5)} seed={4} dispersa={110} />
          </g>}
          {T > K.Al - 0.3 && <g opacity={kprog(T, K.Al - 0.3, K.Al + 0.2)}>
            <CadenaCorta T={T} pts={ALM} t0={K.Al + 0.6} paso={0.15} hex colores={[KC.yellow]} r={30} seed={9} dispersa={90} />
          </g>}
        </>)}
      </Escena>
      {/* 5–6 · la salmuera: el koji cae al agua salada y muere; ¿quién sigue cocinando? */}
      <Escena T={T} a={K.Sa} b={K.Mo} zoom={0.04}>
        <FondoLunares color={T < K.P ? KC.cyan : KC.lilac} />
        {fsvg(<>
          <Cuba T={T} y={960}>
            {caida > 0 && <g transform={`translate(0 ${klerp(-700, -290, caida)})`}>
              <path d="M -170 0 Q -180 -60 -90 -70 Q 0 -100 90 -70 Q 180 -60 170 0 Q 0 30 -170 0 Z" fill={mixHex(KJ.koji2, '#a9acb2', mueren)} stroke={KC.ink} strokeWidth={6} />
              {Array.from({ length: 14 }, (_, i) => { const an = -Math.PI * (0.08 + i * 0.06); return <line key={i} x1={Math.cos(an) * 120} y1={-30 + Math.sin(an) * 40} x2={Math.cos(an) * (150 - mueren * 30)} y2={-30 + Math.sin(an) * (90 - mueren * 50)} stroke={mixHex(KJ.hifa, '#7d7f86', mueren)} strokeWidth={6} strokeLinecap="round" />; })}
            </g>}
            {caida >= 1 && T < K.Sa + 1.4 && Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.Sa + 0.8, K.Sa + 1.4); const an = -Math.PI * (0.1 + i * 0.09); return <circle key={i} cx={Math.cos(an) * 200 * u} cy={-290 + Math.sin(an) * 160 * u + u * u * 120} r={14} fill={KJ.salmuera} stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
          </Cuba>
          {T > K.P - 0.2 && <g opacity={kprog(T, K.P - 0.2, K.P + 0.2)}><Interrogacion T={T} x={300} y={1000} /></g>}
        </>)}
      </Escena>
      {/* 7 · dentro de la cuba: enzimas, bacterias lácticas y levaduras, meses */}
      <Escena T={T} a={K.Mo} b={K.Co}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        <Ambiente T={T} n={26} color="rgba(255,220,160,.25)" />
        {fsvg(<>
          <CadenaCorta T={T} pts={CADM} t0={K.Mo + 0.3} paso={0.25} colores={[KC.pink, KC.cyan, KC.orange]} r={20} seed={12} dispersa={70} />
          {[[640, 980, 1], [820, 900, 2], [720, 1110, 3], [900, 1060, 4], [560, 840, 5], [940, 780, 6]].map(([x, y, sd], i) => { const on = kprog(T, K.Mo + 0.8 + i * 0.1, K.Mo + 1.1 + i * 0.1, kEase.rebote); return on > 0 ? <Tetrada key={i} T={T} x={x} y={y} s={on} seed={sd} /> : null; })}
          {[[300, 760, 1], [520, 640, 2]].map(([x, y, sd], i) => { const on = kprog(T, K.Mo + 1.6 + i * 0.2, K.Mo + 2.0 + i * 0.2, kEase.rebote); return on > 0 ? <Levadura key={i} T={T} x={x} y={y} s={on} seed={sd} brote={kprog(T, K.Mo + 2.2, K.Mo + 3.4)} /> : null; })}
          <Calendario T={T} at={K.Mo + 2.4} x={170} y={1000} />
          {Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.5 + i / 10) % 1); return T > K.Mo + 2.0 ? <circle key={i} cx={260 + (i % 5) * 70 + Math.sin(T * 3 + i) * 8} cy={600 - u * 160} r={6 + (i % 3) * 3} fill="none" stroke="#fff" strokeWidth={3} opacity={(1 - u) * 0.7} /> : null; })}
        </>)}
      </Escena>
      {/* 8 · el color: azúcares + aminoácidos oscurecen el líquido */}
      <Escena T={T} a={K.Co} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <path d="M 300 560 L 300 520 L 780 520 L 780 560 Q 840 600 840 680 L 840 1120 Q 840 1170 790 1170 L 290 1170 Q 240 1170 240 1120 L 240 680 Q 240 600 300 560 Z" fill="rgba(240,248,255,.55)" stroke={KC.ink} strokeWidth={9} />
          <path d="M 252 700 L 828 700 L 828 1118 Q 828 1158 788 1158 L 292 1158 Q 252 1158 252 1118 Z" fill={mixHex(KJ.salmuera, KJ.soya, oscuro)} />
          {[0, 1, 2].map((i) => { const j = kprog(T, K.Co + 0.4 + i * 0.6, K.Co + 1.0 + i * 0.6, kEase.sale); const cx = 360 + i * 170, cy = 860 + (i % 2) * 120;
            return <g key={i}><Cuenta x={cx - 40 * (1 - j)} y={cy} r={24} color={KC.pink} /><Cuenta x={cx + 40 + 40 * (1 - j)} y={cy} r={26} hex color={KC.yellow} />
              {j >= 1 && <circle cx={cx + 20} cy={cy} r={58} fill="none" stroke={KC.gold2} strokeWidth={5} opacity={0.6 + 0.4 * Math.sin(T * 5 + i)} />}</g>; })}
          <path d="M 270 600 L 270 680" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity=".5" />
        </>)}
      </Escena>
      {/* 9 · el estudio de 2006: 210 cepas */}
      <Escena T={T} a={K.E} b={K.Pm} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {Array.from({ length: 210 }, (_, i) => { const col = i % 21, row = Math.floor(i / 21); const t0 = K.E + 0.8 + i * 0.009; return <Tubo key={i} x={110 + col * 43} y={880 + row * 36} on={kprog(T, t0, t0 + 0.25, kEase.rebote)} />; })}</>)}
      </Escena>
      {/* 10 · el primo con veneno y el koji con los genes apagados (al microscopio) */}
      <Escena T={T} a={K.Pm} b={K.N}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Conidioforo x={290} y={1010} alto={150} rv={40} p={kprog(T, K.Pm + 0.2, K.Pm + 1.6)} color="#b9d23a" n={13} cad={6} T={T} />
          <Conidioforo x={790} y={1010} alto={150} rv={40} p={kprog(T, K.Pm + 0.6, K.Pm + 2.0)} color={KJ.koji} n={13} cad={6} T={T} />
          <TiraGenes x={108} y={1070} p={kprog(T, K.Pm + 1.2, K.Pm + 2.0)} />
          <TiraGenes x={608} y={1070} p={kprog(T, K.Pm + 1.6, K.Pm + 2.4)} huecos={T > K.Pm + 3.3 ? [1, 4] : []} rotos={[2, 5]} apagado={kprog(T, K.Pm + 3.6, K.Pm + 4.2)} />
          {[[110, 610, 0], [230, 570, 1], [350, 610, 2], [170, 690, 3]].map(([x, y, i]) => { const on = kprog(T, K.Pm + 2.2 + i * 0.15, K.Pm + 2.6 + i * 0.15, kEase.rebote); return on > 0 ? <Aflatoxina key={i} x={x} y={y + Math.sin(T * 2 + i) * 8} s={on} rot={T * 20 + i * 30} /> : null; })}
          {T > K.Pm + 3.4 && <g transform="translate(985 960) scale(0.75)"><Interruptor x={0} y={0} off={kprog(T, K.Pm + 3.6, K.Pm + 4.0)} /></g>}
          <Sello T={T} at={K.Pm + 5.0} x={560} y={630} texto="0" color={KC.mint} r={80} />
          {T > K.Pm + 5.2 && <text x={560} y={755} textAnchor="middle" opacity={kprog(T, K.Pm + 5.2, K.Pm + 5.5)} style={{ font:`700 30px ${KF.mono}` }} fill={KC.mint}>aflatoxinas</text>}
        </>)}
      </Escena>
      {/* 11 · sake, miso y soya: hongo nacional */}
      <Escena T={T} a={K.N} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {kprog(T, K.N + 0.2, K.N + 0.6) > 0 && <g transform={`translate(230 1080) scale(${kprog(T, K.N + 0.2, K.N + 0.6, kEase.rebote)}) translate(-230 -1080)`}><Tokkuri x={230} y={1080} s={1.0} /></g>}
          {kprog(T, K.N + 0.7, K.N + 1.1) > 0 && <g transform={`translate(540 1080) scale(${kprog(T, K.N + 0.7, K.N + 1.1, kEase.rebote)}) translate(-540 -1080)`}><Miso x={540} y={1080} T={T} /></g>}
          {kprog(T, K.N + 1.2, K.N + 1.6) > 0 && <g transform={`translate(840 1000) scale(${kprog(T, K.N + 1.2, K.N + 1.6, kEase.rebote) * 0.62}) translate(-840 -1000)`}><Botella x={840} y={1000} /></g>}
          <Medalla T={T} at={K.N + 2.0} x={400} y={640} r={140} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma botella y el mismo sushi; adentro, el fantasma del hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<><PlatoSushi T={T} lleno={1} /><Botella x={450} y={760} T={T} nivel={0.55} fantasma={kprog(T, K.C + 0.6, K.C + 1.6)} /></>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 2.2} until={K.Si - 0.2} texto="solo soya" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.6} until={K.Si - 0.2} texto="la cocinó un hongo" x={300} y={590} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Si + 0.3} until={K.Si + 2.3} texto="soya cocida al vapor" x={330} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Si + 1.3} until={K.Si + 2.3} texto="trigo tostado" x={330} y={560} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Si + 2.5} until={K.Si + 3.4} texto="mitad y mitad" x={330} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Si + 3.2} until={K.Cr + 1.9} x={60} y={520} texto="koji" tam={44} color={KC.texto} />
      <Etq T={T} at={K.Si + 3.5} until={K.Cr + 1.9} x={60} y={590} texto="Aspergillus oryzae" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Si + 3.8} until={K.Cr + 1.9} x={60} y={650} texto="o Aspergillus sojae" it tam={32} color={KC.texto} />
      <Chip T={T} at={K.Cr + 0.2} until={K.Pr - 0.3} texto="2–3 días · 30 °C" x={720} y={430} tam={40} borde={KC.ink} mono />
      <Etq T={T} at={K.Pr + 0.3} until={K.Pr + 1.6} x={60} y={680} texto="proteína" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Pr + 0.9} until={K.Al - 0.3} x={60} y={1060} texto="proteasas (las tijeras)" tam={32} color={KC.cyan} />
      <Etq T={T} at={K.Pr + 2.0} until={K.Al - 0.3} x={60} y={680} texto="aminoácidos" tam={36} color={KC.texto} />
      <Chip T={T} at={K.Pr + 3.0} until={K.Al - 0.3} texto="glutamato → umami" x={340} y={470} tam={44} borde={KC.gold2} />
      <Etq T={T} at={K.Al + 0.2} until={K.Sa - 0.3} x={60} y={600} texto="almidón del trigo" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.Al + 0.6} until={K.Sa - 0.3} x={60} y={1040} texto="amilasas → glucosa" tam={34} color={KC.cyan} />
      <Chip T={T} at={K.Sa + 0.4} until={K.P - 0.2} texto="salmuera: 22–23 % de sal" x={340} y={430} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Sa + 1.8} until={K.P - 0.2} texto="el koji muere" x={300} y={520} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Mo + 0.5} until={K.Co - 0.3} x={540} y={930} texto="enzimas (siguen)" tam={30} color={KC.cyan} />
      <Etq T={T} at={K.Mo + 1.0} until={K.Co - 0.3} x={1040} y={1170} texto="Tetragenococcus halophilus" lado="izq" it tam={30} color={KC.mint} />
      <Etq T={T} at={K.Mo + 1.8} until={K.Co - 0.3} x={60} y={470} texto="Zygosaccharomyces rouxii" it tam={30} color="#ffd98a" />
      <Chip T={T} at={K.Mo + 2.4} until={K.Co - 0.3} texto="6–8 meses (método tradicional)" x={620} y={1090} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.6} until={K.E - 0.3} texto="azúcar + aminoácido = color" x={360} y={430} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Co + 1.8} until={K.E - 0.3} texto="reacción de Maillard" x={360} y={1240 - 140} tam={36} borde={KC.gold2} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.Pm - 0.2} anio="2006" quien="Higashi-Hiroshima, Japón · 210 cepas" revista="Tominaga et al., Appl. Environ. Microbiol." y={600} />
      <Chip T={T} at={K.Pm + 0.3} until={K.N - 0.3} texto="primos: misma sección Flavi" x={360} y={430} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Pm + 1.0} until={K.N - 0.3} x={60} y={1120} texto="Aspergillus flavus" it tam={28} color="#d6ea6a" />
      <Etq T={T} at={K.Pm + 1.4} until={K.N - 0.3} x={600} y={1120} texto="A. oryzae (koji)" it tam={28} color={KJ.koji2} />
      <Etq T={T} at={K.Pm + 2.4} until={K.N - 0.3} x={60} y={510} texto="aflatoxinas" tam={34} color={KC.red} />
      <Chip T={T} at={K.Pm + 3.8} until={K.N - 0.3} texto="genes apagados o incompletos" x={560} y={1196} tam={26} borde={KC.mint} />
      <Chip T={T} at={K.N + 2.4} until={K.C - 0.3} texto="Brewing Society of Japan" x={400} y={840} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.N + 0.4} until={K.C - 0.3} x={230} y={1170} texto="sake" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.N + 0.9} until={K.C - 0.3} x={540} y={1170} texto="miso" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.N + 1.4} until={K.C - 0.3} x={1000} y={1170} texto="soya" lado="izq" tam={30} color={KC.texto} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="la cocinó un hongo" x={300} y={470} tam={42} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Si} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Si} until={K.Cr + 2.0} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.Cr + 2.0} until={K.Pr} texto="lupa: 50 µm" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.Sa} texto="3 nm (moléculas)" largo={200} />
      <BarraEscala T={T} at={K.Sa} until={K.Mo} texto="20 cm" largo={140} />
      <BarraEscala T={T} at={K.Mo} until={K.Co} texto="5 µm" largo={180} />
      <BarraEscala T={T} at={K.Co} until={K.E} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.E} until={K.Pm} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Pm} until={K.N} texto="50 µm" largo={200} />
      <BarraEscala T={T} at={K.N} until={K.C} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Si - 0.1} texto="¿Solo soya? *Un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Si + 0.1} until={K.Cr - 0.1} texto="Soya, trigo y *koji.*" />
      <Subtitulo T={T} idx={2} at={K.Cr + 0.1} until={K.Pr - 0.1} texto="2–3 días: *enzimas.*" />
      <Subtitulo T={T} idx={3} at={K.Pr + 0.1} until={K.Al - 0.1} texto="Proteínas → *umami.*" />
      <Subtitulo T={T} idx={4} at={K.Al + 0.1} until={K.Sa - 0.1} texto="Almidón → *azúcares.*" />
      <Subtitulo T={T} idx={5} at={K.Sa + 0.1} until={K.P - 0.1} texto="*El hongo muere.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Mo - 0.1} texto="¿Quién sigue *cocinando?*" />
      <Subtitulo T={T} idx={7} at={K.Mo + 0.1} until={K.Co - 0.1} texto="Y siguen *por meses.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.E - 0.1} texto="Así sale *el color.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Pm - 0.1} texto="2006: *210 cepas.*" />
      <Subtitulo T={T} idx={10} at={K.Pm + 0.1} until={K.N - 0.1} texto="Sin *aflatoxinas.*" />
      <Subtitulo T={T} idx={11} at={K.N + 0.1} until={K.C - 0.1} texto="Hongo *nacional.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo cocinó *un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Si + 1.5, K.Cr - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cr + 3.0, K.Pr - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Pr + 1.2, K.Al - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Sa + 1.5, K.P - 0.15, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Mo + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mo + 1.8, K.Co - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Co + 1.2, K.E - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pm + 1.4, K.Pm + 6.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.N + 0.8, K.C - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.8, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="16" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function KojiApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><KojiShot /></CompositionStage></div>;
}
window.KojiApp = KojiApp;
