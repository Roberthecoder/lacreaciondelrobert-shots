// Shot Fungi Mati #118 · Esas manchas negras de tu mango muchas veces no son golpes — NARRADO (N1 · POR DENTRO).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (formas reales, tamaños aproximados).
// Morfología: conidio de Colletotrichum cilíndrico, hialino, de puntas redondeadas (≈13 × 4 µm); apresorio café oscuro (melanizado),
// ovoide, de ~5–10 µm, con clavija de infección que atraviesa la cutícula. Escala micro: 10 µm = 120 px.

const MG = { verde:'#6cb33f', verde2:'#4a8a2a', amarillo:'#ffc22e', naranja:'#ff9a2e', rubor:'#e8553a', mancha:'#1d140e', mancha2:'#3a2616',
  hoja:'#2f7d32', hoja2:'#1f5a22', rama:'#6b4423', cafe:'#4a2c14', cafe2:'#2a170a', hialino:'rgba(225,240,255,.28)', cera:'#f3e7a6', celula:'#9fd17a', pulpa:'#ffcf4a' };
const UM = 12; // px por µm en la escena del microscopio (10 µm = 120 px)

function Capa({ children, z = 20 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}
const mezclaColor = (a, b, t) => mixHex(a, b, kclamp(t, 0, 1));

// Mango de perfil (forma de riñón con "pico"). madurez 0 verde → 1 maduro (amarillo con rubor rojo).
// manchas 0..1: crecen manchas negras hundidas (antracnosis). lagrimas 0..1: rayas que escurren. id: para los gradientes.
// Mancha irregular (las de antracnosis no son círculos perfectos).
function blob(cx, cy, r, seed) {
  const n = 10, r0 = krng(seed * 31 + 5), pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, k = 0.78 + r0() * 0.4; return [cx + Math.cos(a) * r * k * 1.15, cy + Math.sin(a) * r * k * 0.9]; });
  const mid = (i) => { const p = pts[i % n], q = pts[(i + 1) % n]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }, f = (v) => v.map((z) => z.toFixed(1)).join(' ');
  let d = 'M ' + f(mid(0)); for (let i = 1; i <= n; i++) d += ' Q ' + f(pts[i % n]) + ' ' + f(mid(i)); return d + ' Z';
}
const MANCHAS = [[-60, -30, 34], [40, 10, 46], [-10, 60, 26], [95, -50, 22], [-110, 30, 20], [60, 75, 18], [-40, -85, 16]];
function Mango({ x, y, s = 1, rot = 0, madurez = 1, manchas = 0, lagrimas = 0, id = 'm', T = 0 }) {
  const base = mezclaColor(MG.verde, MG.amarillo, madurez), sombra = mezclaColor(MG.verde2, MG.naranja, madurez);
  const rubor = madurez > 0.4 ? (madurez - 0.4) / 0.6 : 0;
  const cuerpo = 'M -170 -10 C -175 -110 -60 -150 40 -135 C 150 -118 205 -40 185 40 C 168 110 80 150 -10 140 C -110 130 -165 80 -170 -10 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <radialGradient id={`mg-${id}`} cx="38%" cy="32%" r="80%">
        <stop offset="0%" stopColor={mixHex(base, '#ffffff', 0.25)} /><stop offset="55%" stopColor={base} /><stop offset="100%" stopColor={sombra} />
      </radialGradient>
      <radialGradient id={`mr-${id}`} cx="30%" cy="20%" r="60%"><stop offset="0%" stopColor={MG.rubor} stopOpacity={0.85 * rubor} /><stop offset="100%" stopColor={MG.rubor} stopOpacity="0" /></radialGradient>
      <clipPath id={`mc-${id}`}><path d={cuerpo} /></clipPath>
    </defs>
    <path d={cuerpo} fill={`url(#mg-${id})`} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={cuerpo} fill={`url(#mr-${id})`} />
    <g clipPath={`url(#mc-${id})`}>
      {MANCHAS.map(([mx, my, r], i) => { const k = kclamp(manchas * 1.6 - i * 0.12, 0, 1); if (k <= 0) return null; const rr = r * kEase.sale(k);
        return <g key={i}>
          <path d={blob(mx, my, rr * 1.3, i + 7)} fill={MG.mancha2} opacity={0.4} />
          <path d={blob(mx, my, rr, i)} fill={MG.mancha} />
          <path d={`M ${mx - rr * 0.5} ${my + rr * 0.6} Q ${mx} ${my + rr * 0.9} ${mx + rr * 0.55} ${my + rr * 0.5}`} stroke="rgba(255,255,255,.25)" strokeWidth={3} fill="none" />
        </g>; })}
      {lagrimas > 0 && [[-40, -130, 1], [10, -134, 0.8], [70, -126, 1.1], [-90, -112, 0.7]].map(([lx, ly, k], i) => { const p = kclamp(lagrimas * 1.4 - i * 0.15, 0, 1);
        return <path key={i} d={`M ${lx} ${ly} C ${lx - 6} ${ly + 70 * p * k} ${lx + 8} ${ly + 150 * p * k} ${lx + 2} ${ly + 210 * p * k}`} stroke={MG.mancha} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.85 * kclamp(p * 3, 0, 1)} />; })}
    </g>
    <path d="M -120 -70 Q -60 -118 30 -112" stroke="rgba(255,255,255,.5)" strokeWidth={12} fill="none" strokeLinecap="round" />
    {/* pedúnculo */}
    <path d="M -150 -70 Q -175 -110 -168 -150" stroke={MG.rama} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}
// Frutero (plato hondo) visto de frente.
function Frutero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -330 0 Q -300 170 0 180 Q 300 170 330 0 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -300 40 Q 0 90 300 40" stroke="#2fb8c9" strokeWidth={14} fill="none" />
    <ellipse cx={0} cy={0} rx={330} ry={40} fill="#e3d9c6" stroke={KC.ink} strokeWidth={9} />
    <rect x={-80} y={176} width={160} height={30} rx={10} fill="#d8cfbd" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Hoja lanceolada de mango; manchas = 0..1 manchas cafés de antracnosis.
function Hoja({ x, y, rot = 0, s = 1, manchas = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 Q 120 -48 260 0 Q 120 48 0 0 Z" fill={MG.hoja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 4 0 L 250 0" stroke={MG.hoja2} strokeWidth={4} />
    {manchas > 0 && [[90, -10, 14], [150, 12, 11], [200, -6, 9], [120, 14, 8]].map(([a, b, r], i) =>
      <circle key={i} cx={a} cy={b} r={r * kclamp(manchas * 2 - i * 0.3, 0, 1)} fill="#5a3416" stroke="#2a170a" strokeWidth={2} />)}
  </g>;
}
// Rama con hojas; del extremo cuelga el mango (el mango se dibuja aparte).
function Rama({ T, manchas = 0 }) {
  const m = mece(T, 3, 0.3) * 3;
  return <g transform={`translate(0 120) rotate(${m} 60 520)`}>
    <path d="M -40 520 Q 260 470 520 560 Q 640 600 700 690" stroke={MG.rama} strokeWidth={26} fill="none" strokeLinecap="round" />
    <Hoja x={180} y={500} rot={-28} manchas={manchas} />
    <Hoja x={320} y={520} rot={-150} s={0.9} manchas={manchas * 0.8} />
    <Hoja x={430} y={545} rot={-40} s={1.05} />
    <Hoja x={560} y={600} rot={-160} s={0.85} manchas={manchas} />
    <Hoja x={640} y={650} rot={-20} s={0.9} />
    <path d="M 700 690 L 690 760" stroke={MG.rama} strokeWidth={10} strokeLinecap="round" />
  </g>;
}
// Conidio de Colletotrichum: cilíndrico, hialino, puntas redondeadas. (x, y) = centro. largo/ancho en µm.
function Conidio({ x, y, rot = 0, largo = 13, ancho = 4, k = 1, o = 1 }) {
  const L = largo * UM * k, A = ancho * UM * k;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <rect x={-L / 2} y={-A / 2} width={L} height={A} rx={A / 2} fill={MG.hialino} stroke="#dfeeff" strokeWidth={4} />
    <circle cx={-L * 0.2} cy={0} r={A * 0.16} fill="rgba(255,255,255,.55)" /><circle cx={L * 0.18} cy={0} r={A * 0.13} fill="rgba(255,255,255,.45)" />
  </g>;
}
// Gota de lluvia con conidios dentro.
function GotaEsporas({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -34 Q 26 0 0 22 Q -26 0 0 -34 Z" fill="rgba(170,225,255,.85)" stroke={KC.ink} strokeWidth={3} />
    <rect x={-10} y={-4} width={14} height={5} rx={2.5} fill="#fff" opacity=".9" /><rect x={0} y={6} width={12} height={4} rx={2} fill="#fff" opacity=".8" />
  </g>;
}

/* ---------- escena al microscopio: corte de la cáscara ---------- */
// germina 0..1 (tubo germinal), apresorio 0..1 (se infla y oscurece), clavija 0..1 (atraviesa la cutícula),
// duerme 0..1 (pulso lento), hifas 0..1 (invade las células al madurar), defensas 0..1 (puntitos de defensa en la cáscara).
const SUP = 900; // y de la superficie (cera)
function CorteCascara({ T, germina = 0, apresorio = 0, clavija = 0, duerme = 0, hifas = 0, defensas = 0 }) {
  const celdas = [];
  for (let f = 0; f < 3; f++) for (let c = -1; c < 8; c++) { const w = 150, h = 92, ox = (f % 2) * 75; celdas.push([c * w + ox, SUP + 50 + f * (h + 8), w - 10, h]); }
  const apx = 520, apy = SUP - 30; // centro del apresorio
  const pulso = 1 + duerme * 0.04 * Math.sin(T * 2.2);
  return <g>
    {/* células de la epidermis y debajo */}
    {celdas.map(([cx, cy, w, h], i) => <rect key={i} x={cx} y={cy} width={w} height={h} rx={26} fill={mixHex(MG.celula, '#c9e9a0', (i % 3) * 0.2)} opacity={0.85} stroke="#173b14" strokeWidth={4} />)}
    {/* defensas químicas (esquemáticas) en la cáscara */}
    {defensas > 0 && Array.from({ length: 26 }, (_, i) => <circle key={i} cx={30 + (i * 41) % 1040} cy={SUP + 70 + ((i * 53) % 230)} r={7} fill={KC.pink} opacity={defensas * 0.9} stroke={KC.ink} strokeWidth={2} />)}
    {/* cutícula / cera */}
    <rect x={-20} y={SUP} width={1120} height={44} fill={MG.cera} opacity={0.9} stroke="#b9a648" strokeWidth={3} />
    {/* hifas que invaden al madurar */}
    {hifas > 0 && (() => { const p = hifas; const ramas = [[apx, SUP + 44, apx - 160, SUP + 150, apx - 330, SUP + 120], [apx, SUP + 44, apx + 120, SUP + 170, apx + 300, SUP + 230], [apx, SUP + 44, apx + 10, SUP + 220, apx - 90, SUP + 300], [apx, SUP + 44, apx + 220, SUP + 90, apx + 420, SUP + 130]];
      return ramas.map(([x0, y0, x1, y1, x2, y2], i) => { const q = kclamp(p * 1.5 - i * 0.15, 0, 1); const ex = klerp(x0, x2, q), ey = klerp(y0, y2, q), mx = klerp(x0, x1, q), my = klerp(y0, y1, q);
        return <path key={i} d={`M ${x0} ${y0} Q ${mx} ${my} ${ex} ${ey}`} stroke="#fff4d6" strokeWidth={10} fill="none" strokeLinecap="round" opacity={q > 0 ? 1 : 0} />; }); })()}
    {/* clavija de infección */}
    {clavija > 0 && <line x1={apx} y1={apy + 30} x2={apx} y2={apy + 30 + 52 * clavija} stroke={MG.cafe2} strokeWidth={7} strokeLinecap="round" />}
    {/* conidio sobre la superficie */}
    <Conidio x={330} y={SUP - 24} />
    {/* tubo germinal */}
    {germina > 0 && <path d={`M 408 ${SUP - 22} Q ${430 + 30 * germina} ${SUP - 8} ${klerp(410, apx - 30, germina)} ${SUP - 18}`} stroke="#dfeeff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />}
    {/* apresorio: ovoide, café oscuro (melanizado), ~7 µm */}
    {apresorio > 0 && <g transform={`translate(${apx} ${apy}) scale(${kEase.sale(apresorio) * pulso})`}>
      <ellipse rx={3.6 * UM} ry={2.9 * UM} fill={mixHex('#c7d6e6', MG.cafe, kclamp(apresorio * 1.4 - 0.2, 0, 1))} stroke={MG.cafe2} strokeWidth={5} />
      <ellipse cx={-10} cy={-10} rx={10} ry={6} fill="#ffffff" opacity={0.25} />
    </g>}
    {/* zzz (dormido) */}
    {duerme > 0 && ['z', 'z', 'Z'].map((z, i) => { const u = ((T * 0.5 + i / 3) % 1); return <text key={i} x={apx + 50 + u * 60} y={apy - 50 - u * 110} style={{ font:`400 ${30 + i * 10}px ${KF.titulo}` }} fill={KC.texto} opacity={duerme * Math.sin(Math.PI * u)}>{z}</text>; })}
  </g>;
}

/* ---------- baño de agua caliente ---------- */
function Tina({ T, baja = 1, x = 540, y = 1020 }) {
  const by = klerp(-420, 0, kEase.sale(baja));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-400} y={-230} width={800} height={430} rx={30} fill="#d9e3ea" stroke={KC.ink} strokeWidth={10} />
    <rect x={-380} y={-170} width={760} height={350} rx={20} fill="#3fa9e0" opacity={0.85} />
    {/* canasta con mangos */}
    <g transform={`translate(0 ${by})`}>
      <rect x={-300} y={-120} width={600} height={200} rx={20} fill="none" stroke="#555" strokeWidth={8} strokeDasharray="22 12" />
      <line x1={-300} y1={-120} x2={-300} y2={-400} stroke="#555" strokeWidth={8} /><line x1={300} y1={-120} x2={300} y2={-400} stroke="#555" strokeWidth={8} />
      {[-190, 0, 190].map((mx, i) => <Mango key={i} x={mx} y={-20} s={0.42} rot={i * 20 - 15} madurez={0.15} id={`tina${i}`} />)}
    </g>
    <rect x={-380} y={-170} width={760} height={30} fill="#7cc8f0" opacity={0.7} />
    {baja > 0.6 && Array.from({ length: 12 }, (_, i) => { const u = ((T * 0.7 + i * 0.137) % 1); return <circle key={i} cx={-340 + ((i * 97) % 680)} cy={170 - u * 330} r={6 + (i % 3) * 3} fill="none" stroke="#e8f7ff" strokeWidth={3} opacity={1 - u} />; })}
    {/* vapor */}
    {[-200, 0, 200].map((vx, i) => <path key={i} d={`M ${vx} -250 q 20 -40 0 -80 q -20 -40 0 -80`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.35 + 0.2 * Math.sin(T * 2 + i)} strokeLinecap="round" />)}
  </g>;
}
// Larva de mosca de la fruta (esquemática), con tache.
function Larva({ x, y, s = 1, tache = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -70 0 Q -60 ${-30 + Math.sin(T * 6) * 4} 0 -28 Q 60 -30 74 0 Q 60 28 0 26 Q -60 28 -70 0 Z`} fill="#f7f1df" stroke={KC.ink} strokeWidth={6} />
    {[-40, -15, 10, 35].map((sx) => <line key={sx} x1={sx} y1={-24} x2={sx} y2={24} stroke="#cfc5a8" strokeWidth={4} />)}
    <circle cx={64} cy={-4} r={6} fill={KC.ink} />
    {tache > 0 && <path d="M -80 -60 L 80 60 M 80 -60 L -80 60" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={tache} />}
  </g>;
}
// Caja de mango para exportar.
function Caja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-50} width={140} height={100} rx={10} fill="#c98b4b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={-50} width={140} height={26} fill="#a96e34" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-28} cy={-50} rx={26} ry={16} fill={MG.amarillo} stroke={KC.ink} strokeWidth={4} /><ellipse cx={24} cy={-52} rx={26} ry={16} fill={MG.naranja} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Puntos (huertas) del estudio: posición ilustrativa sobre estados mangueros (lon, lat). 59 en total.
const ESTADOS = [[-107.4, 24.8, 9], [-104.9, 21.5, 7], [-103.4, 19.2, 5], [-101.7, 18.8, 7], [-99.6, 17.3, 8], [-96.7, 16.5, 8], [-92.6, 15.6, 7], [-96.3, 19.5, 5], [-105.2, 20.4, 3]];
const HUERTAS = (() => { const r = krng(118), out = []; ESTADOS.forEach(([lo, la, n]) => { for (let i = 0; i < n; i++) out.push([lo + (r() - 0.5) * 1.8, la + (r() - 0.5) * 1.4]); }); return out; })();
const ESPECIES = ['C. alienum', 'C. asianum', 'C. fructicola', 'C. siamense', 'C. tropicale'];

// Subtítulo como el del kit, pero con cursiva: _palabra_ = cursiva (nombres científicos), *palabra* = resaltada.
function SubM({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

function MangoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, L: CUES.Lluvia, A: CUES.Apresorio, D: CUES.Dormido, P: CUES.Pregunta, De: CUES.Despierta, M: CUES.Manchas,
    E: CUES.Estudio, Ex: CUES.Exporta, B: CUES.Bano, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const manchasG = kprog(T, K.G + 0.2, K.G + 1.6, kEase.sale);
  const rebobina = kprog(T, K.G + 3.4, K.G + 4.6, kEase.suave); // el mango vuelve a verde, al árbol
  const madura = kprog(T, K.De + 0.3, K.De + 3.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el mango de tu frutero, con manchas negras… y rebobinado al árbol */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <g opacity={1 - rebobina}>
            <Frutero x={470} y={1100} s={1} />
            <Mango x={300} y={1010} s={0.7} rot={-20} madurez={1} id="fr1" />
            <Mango x={640} y={1020} s={0.66} rot={25} madurez={0.95} id="fr2" />
            <Mango x={470} y={930} s={1.05} rot={-8 + Math.sin(T * 4) * 3 * (1 - kprog(T, K.G + 1.2, K.G + 2))} madurez={1} manchas={manchasG} id="g" />
          </g>
          {rebobina > 0 && <g opacity={rebobina}>
            <Rama T={T} />
            <Mango x={640} y={1000} s={0.95} rot={80} madurez={0} id="gv" />
          </g>}
          {rebobina > 0 && rebobina < 1 && <text x={540} y={1300} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink} opacity={Math.sin(Math.PI * rebobina)}>◀◀</text>}
        </Capa>
      </Escena>
      {/* 1 · Colletotrichum, la antracnosis: el mango verde en el árbol, hojas manchadas */}
      <Escena T={T} a={K.H} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Rama T={T} manchas={kprog(T, K.H + 1.2, K.H + 3.0)} />
          <Mango x={640} y={1000} s={0.95} rot={80 + mece(T, 2, 0.3) * 2} madurez={0} id="h" />
        </Capa>
      </Escena>
      {/* 2 · lluvia: las gotas llevan esporas de las hojas enfermas al mango verde */}
      <Escena T={T} a={K.L} b={K.A} zoom={0.06} origen="60% 50%">
        <FondoLunares color={KC.cyan} />
        <Capa>
          <Rama T={T} manchas={1} />
          <Mango x={640} y={1000} s={0.95} rot={80} madurez={0} id="l" />
          {Array.from({ length: 22 }, (_, i) => { const u = ((T - K.L) * 1.4 + i * 0.173) % 1; return <line key={i} x1={40 + (i * 131) % 1000} y1={-40 + u * 1400} x2={30 + (i * 131) % 1000} y2={20 + u * 1400} stroke="#ffffff" strokeWidth={5} opacity={0.55} strokeLinecap="round" />; })}
          {/* salpicadura: de la hoja manchada (180,500) al mango (640,880) */}
          {[0, 0.5, 1.0].map((d, i) => { const p = kprog(T, K.L + 0.3 + d, K.L + 1.3 + d); if (p <= 0 || p >= 1) return null;
            return <GotaEsporas key={i} x={klerp(300, 610, p)} y={klerp(600, 920, p) - Math.sin(Math.PI * p) * 160} s={1.4} />; })}
          {/* lupa: conidios dentro de la gota */}
          {(() => { const o = kprog(T, K.L + 1.4, K.L + 1.8); if (o <= 0) return null; return <g opacity={o}>
            <line x1={790} y1={640} x2={700} y2={880} stroke={KC.white} strokeWidth={6} />
            <circle cx={830} cy={500} r={150} fill={KC.noche} stroke={KC.white} strokeWidth={10} />
            <Conidio x={790} y={460} rot={-20} /><Conidio x={870} y={530} rot={15} /><Conidio x={800} y={570} rot={70} k={0.8} />
          </g>; })()}
        </Capa>
      </Escena>
      {/* 3–4 · AL MICROSCOPIO: germina, forma el apresorio, perfora la cera… y se queda quieto */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.05} origen="48% 50%">
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        <Capa>
          <CorteCascara T={T} germina={kprog(T, K.A + 0.3, K.A + 1.4, kEase.sale)} apresorio={kprog(T, K.A + 1.2, K.A + 2.2)} clavija={kprog(T, K.A + 2.6, K.A + 3.4, kEase.sale)} duerme={kprog(T, K.D, K.D + 0.6)} />
          {/* lupa: por fuera, el mango verde se ve sano */}
          {(() => { const o = kprog(T, K.D + 0.5, K.D + 0.9); if (o <= 0) return null; return <g opacity={o}>
            <circle cx={250} cy={640} r={140} fill={KC.mint} stroke={KC.white} strokeWidth={9} />
            <Mango x={250} y={645} s={0.58} rot={-10} madurez={0} id="dl" />
          </g>; })()}
        </Capa>
      </Escena>
      {/* 5 · re-gancho: ¿qué espera? */}
      <Escena T={T} a={K.P} b={K.De} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Mango x={360} y={930} s={1.1} rot={-10 + Math.sin(T * 3) * 4} madurez={0} id="p" />
          <Interrogacion T={T} x={760} y={1050} tam={380} />
        </Capa>
      </Escena>
      {/* 6 · al madurar: bajan las defensas, la fruta se ablanda → despierta (macro arriba, micro abajo) */}
      <Escena T={T} a={K.De} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Capa>
          <Mango x={300} y={640} s={0.85} rot={-10} madurez={madura} id="de" />
          <g>
            <defs><clipPath id="vent"><rect x={40} y={860} width={1000} height={330} rx={36} /></clipPath></defs>
            <rect x={40} y={860} width={1000} height={330} rx={36} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <g clipPath="url(#vent)"><g transform="translate(0 0)">
              <CorteCascara T={T} germina={1} apresorio={1} clavija={1} duerme={1 - kprog(T, K.De + 3.2, K.De + 3.6)} defensas={1 - madura} hifas={kprog(T, K.De + 3.4, K.De + 5.2, kEase.sale)} />
            </g></g>
          </g>
        </Capa>
      </Escena>
      {/* 7 · manchas negras, hundidas; rayas como lágrimas; si avanza, la pulpa */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Mango x={330} y={800} s={1.0} rot={-12} madurez={1} manchas={kprog(T, K.M + 0.2, K.M + 2.2, kEase.sale)} id="ma" />
          <Mango x={790} y={790} s={0.7} rot={8} madurez={0.9} lagrimas={kprog(T, K.M + 1.6, K.M + 3.0, kEase.sale)} id="mb" />
          {/* corte: etapa avanzada, la pulpa ennegrecida bajo la mancha */}
          {(() => { const o = kprog(T, K.M + 3.4, K.M + 3.9); if (o <= 0) return null; return <g opacity={o} transform="translate(540 1125)">
            <path d="M -230 0 A 230 125 0 0 1 230 0 Z" fill="#e8a21c" stroke={KC.ink} strokeWidth={7} />
            <path d="M -214 0 A 214 112 0 0 1 214 0 Z" fill={MG.pulpa} />
            <path d="M -120 0 A 120 34 0 0 1 120 0 Z" fill="#f3e3b0" stroke="#c9b27a" strokeWidth={4} />
            <path d={`M -70 -104 Q -60 ${-104 + 70 * kprog(T, K.M + 3.8, K.M + 4.8)} 0 ${-100 + 78 * kprog(T, K.M + 3.8, K.M + 4.8)} Q 60 ${-104 + 70 * kprog(T, K.M + 3.8, K.M + 4.8)} 70 -106 Z`} fill={MG.mancha} />
            <path d="M -230 0 L 230 0" stroke={KC.ink} strokeWidth={7} />
            <text x={250} y={-10} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>corte</text>
          </g>; })()}
        </Capa>
      </Escena>
      {/* 8 · el estudio: 59 huertas de México, cinco especies */}
      <Escena T={T} a={K.E} b={K.Ex} zoom={0.03} origen="45% 50%">
        <FondoLunares color={KC.cyan} />
        <Capa>
          <MapaMexico x={90} y={570} ancho={700} conCA={false}>
            {HUERTAS.map(([lo, la], i) => { const k = kprog(T, K.E + 2.6 + i * 0.03, K.E + 2.9 + i * 0.03, kEase.rebote); if (k <= 0) return null; const [px, py] = mxProy(lo, la);
              return <circle key={i} cx={px} cy={py} r={9 * k} fill={MG.mancha} stroke="#fff" strokeWidth={3} />; })}
          </MapaMexico>
        </Capa>
      </Escena>
      {/* 9 · México, el mayor exportador: ≈450 000 t en 2025; 89 % a EE. UU. */}
      <Escena T={T} a={K.Ex} b={K.B} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          {Array.from({ length: 7 }, (_, i) => { const u = ((T - K.Ex) * 0.35 + i / 7) % 1; return <Caja key={i} x={-100 + u * 1280} y={1050 + (i % 2) * 12} s={0.9} />; })}
          <line x1={0} y1={1108} x2={1080} y2={1108} stroke={KC.ink} strokeWidth={8} />
        </Capa>
      </Escena>
      {/* 10 · el baño de agua caliente */}
      <Escena T={T} a={K.B} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Tina T={T} baja={kprog(T, K.B + 0.2, K.B + 1.4)} x={440} y={980} />
        </Capa>
        <Termometro x={925} y={700} alto={360} valor={klerp(20, 46.1, kprog(T, K.B + 0.8, K.B + 2.2, kEase.sale))} max={60} marcas={[0, 20, 40, 60]} />
        <Capa z={31}>
          {(() => { const o = kprog(T, K.B + 3.4, K.B + 3.8); if (o <= 0) return null; return <g opacity={o}>
            <rect x={60} y={1400} width={440} height={190} rx={24} fill="rgba(14,15,18,.82)" stroke={KC.red} strokeWidth={5} />
            <Larva x={200} y={1475} s={0.9} tache={kprog(T, K.B + 3.9, K.B + 4.2)} T={T} />
            <text x={280} y={1440} style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>mosca de</text><text x={280} y={1475} style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>la fruta</text><text x={280} y={1510} style={{ font:`700 22px ${KF.mono}` }} fill={KC.red}>objetivo</text>
            <rect x={580} y={1400} width={440} height={190} rx={24} fill="rgba(14,15,18,.82)" stroke={KC.gold2} strokeWidth={5} opacity={kprog(T, K.B + 4.6, K.B + 5.0)} />
            <g opacity={kprog(T, K.B + 4.6, K.B + 5.0)}>
              <ellipse cx={690} cy={1475} rx={40} ry={32} fill={MG.cafe} stroke={MG.cafe2} strokeWidth={5} />
              <text x={850} y={1455} style={{ font:`700 26px ${KF.mono}` }} fill={KC.gold2}>ayuda a</text><text x={850} y={1490} style={{ font:`700 26px ${KF.mono}` }} fill={KC.gold2}>frenar al</text><text x={850} y={1525} style={{ font:`700 26px ${KF.mono}` }} fill={KC.gold2}>hongo</text>
              <path d="M 750 1475 L 820 1475" stroke={KC.gold2} strokeWidth={10} strokeLinecap="round" /><path d="M 820 1445 L 820 1505" stroke={KC.gold2} strokeWidth={10} strokeLinecap="round" />
            </g>
          </g>; })()}
        </Capa>
      </Escena>
      {/* 11 · cierre: el mismo frutero y el mismo mango del inicio, ya "leído" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Frutero x={470} y={1100} s={1} />
          <Mango x={300} y={1010} s={0.7} rot={-20} madurez={1} id="c1" />
          <Mango x={640} y={1020} s={0.66} rot={25} madurez={0.95} id="c2" />
          <Mango x={470} y={930} s={1.05} rot={-8} madurez={1} manchas={1} id="c" />
          {/* etiqueta colgada del pedúnculo */}
          {(() => { const p = kprog(T, K.C + 0.4, K.C + 1.0, kEase.rebote); if (p <= 0) return null; return <g transform={`translate(330 760) rotate(${-6 + Math.sin(T * 2) * 3}) scale(${p})`}>
            <line x1={0} y1={0} x2={-10} y2={-40} stroke={KC.ink} strokeWidth={4} />
            <rect x={-320} y={-150} width={500} height={120} rx={14} fill="#fffbe8" stroke={KC.ink} strokeWidth={6} />
            <text x={-70} y={-104} textAnchor="middle" style={{ font:`italic 700 34px ${KF.mono}` }} fill={KC.ink}>Colletotrichum</text>
            <text x={-70} y={-58} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.red}>entró verde · despertó maduro</text>
          </g>; })()}
        </Capa>
      </Escena>

      {/* textos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.6} until={K.G + 3.3} texto="¿un golpe?" x={300} y={480} tam={54} />
      <Etq T={T} at={K.G + 1.6} until={K.G + 3.3} x={40} y={720} texto="manchas negras y hundidas" tam={28} color={KC.ink} />
      <Chip T={T} at={K.G + 3.6} until={K.H - 0.3} texto="antes: verde, en el árbol" x={360} y={460} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.H + 0.4} until={K.L - 0.3} x={60} y={370} texto="Colletotrichum" it tam={52} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.L - 0.3} x={60} y={432} texto="antracnosis" tam={38} color={KC.ink} />
      <Etq T={T} at={K.H + 1.6} until={K.L - 0.3} x={60} y={800} texto="▲ hojas enfermas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 2.2} until={K.L - 0.3} texto="la enfermedad más importante del mango" y={1470} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.H + 3.2} until={K.L - 0.3} texto="en casi todo el mundo" y={1560} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.L + 0.6} until={K.L + 1.6} x={60} y={420} texto="esporas en gotas de lluvia" tam={34} color={KC.ink} />
      <Etq T={T} at={K.L + 1.8} until={K.A - 0.3} x={670} y={385} texto="conidios" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.L + 2.1} until={K.A - 0.3} x={670} y={432} texto="≈ 13 × 4 µm" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.A + 0.1} until={K.P - 0.3} texto="AL MICROSCOPIO" x={250} y={400} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.A + 0.5} until={K.D - 0.2} x={250} y={760} texto="conidio" tam={30} color={KC.texto} />
      <Etq T={T} at={K.A + 1.8} until={K.P - 0.3} x={600} y={790} texto="apresorio" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.A + 2.0} until={K.D - 0.2} x={600} y={835} texto="(melanizado)" tam={24} color={KC.gold2} />
      <Etq T={T} at={K.A + 2.7} until={K.P - 0.3} x={700} y={922} texto="cera · cutícula" tam={28} color={MG.cera} />
      <Etq T={T} at={K.A + 3.0} until={K.P - 0.3} x={560} y={985} texto="clavija de infección" tam={26} color={KC.texto} />
      <Chip T={T} at={K.D + 0.2} until={K.P - 0.3} texto="infección latente (quiescente)" y={1480} tam={38} borde={KC.gold2} />
      <Etq T={T} at={K.D + 0.9} until={K.P - 0.3} x={400} y={640} texto="por fuera: nada" tam={30} color={KC.texto} />
      <Chip T={T} at={K.De + 0.4} until={K.M - 0.3} texto="AL MADURAR" x={760} y={470} tam={44} borde={KC.ink} />
      <Medidor T={T} at={K.De + 0.6} until={K.M - 0.3} valor={(t) => 1 - kprog(t, K.De + 0.6, K.De + 3.2) * 0.75} etiqueta="defensas de la cáscara" texto={() => ''} x={560} y={560} ancho={460} color={KC.pink} />
      <Medidor T={T} at={K.De + 1.2} until={K.M - 0.3} valor={(t) => 1 - kprog(t, K.De + 1.2, K.De + 3.4) * 0.7} etiqueta="firmeza de la fruta" texto={() => ''} x={560} y={700} ancho={460} color={KC.cyan} />
      <Chip T={T} at={K.De + 3.5} until={K.M - 0.3} texto="¡despierta!" x={540} y={1460} tam={44} borde={KC.gold2} />
      <Etq T={T} at={K.De + 4.0} until={K.M - 0.3} x={90} y={1150} texto="hifas" tam={30} color="#fff4d6" />
      <Etq T={T} at={K.M + 1.0} until={K.E - 0.3} x={60} y={430} texto="manchas negras y hundidas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.M + 2.0} until={K.E - 0.3} x={1030} y={540} texto="rayas «de lágrima»" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 3.6} until={K.E - 0.3} texto="si avanza: llega a la pulpa" x={400} y={1480} tam={38} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="2020" quien="CIAD · Colegio de Postgraduados · Chapingo" revista="Plant Disease 104: 137–146 · con colaboradores de Brasil y Argentina" y={700} />
      <NumeroGigante T={T} at={K.E + 2.6} until={K.Ex - 0.3} valor={59} dur={1.7} etiqueta="huertas (2010–2012)" x={300} y={470} tam={150} color={KC.yellow} />
      {ESPECIES.map((sp, i) => { const fuerte = sp === 'C. siamense' || sp === 'C. asianum'; const on = T > K.E + 5.6;
        return <Etq key={sp} T={T} at={K.E + 4.0 + i * 0.25} until={K.Ex - 0.3} x={380} y={975 + i * 48} texto={(fuerte && on ? '★ ' : '• ') + sp} it tam={fuerte && on ? 36 : 30} color={fuerte && on ? KC.red : KC.ink} />; })}
      <Chip T={T} at={K.E + 5.6} until={K.Ex - 0.3} texto={<>más agresivas: <i>C. siamense</i> y <i>C. asianum</i></>} x={420} y={1480} tam={32} borde={KC.red} />
      <Etq T={T} at={K.E + 3.0} until={K.Ex - 0.3} x={60} y={935} texto="posición de los puntos: ilustrativa" tam={20} color={KC.ink} />
      <Chip T={T} at={K.Ex + 0.3} until={K.B - 0.3} texto="el mayor exportador de mango" x={430} y={440} tam={40} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.Ex + 0.9} until={K.B - 0.3} valor={450000} dur={1.6} prefijo="≈" sufijo=" t" etiqueta="exportación de mango de México, 2025" x={540} y={640} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.Ex + 1.6} until={K.B - 0.3} x={60} y={790} texto="FAO, 2026" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ex + 0.6} until={K.B - 0.3} x={1040} y={1150} texto="rumbo a EE. UU. →" lado="izq" tam={30} color={KC.ink} />
      <Medidor T={T} at={K.Ex + 3.4} until={K.B - 0.3} valor={(t) => 0.89 * kprog(t, K.Ex + 3.4, K.Ex + 5.0, kEase.sale)} etiqueta="a Estados Unidos" x={90} y={870} ancho={900} color={KC.yellow} />
      <Chip T={T} at={K.B + 0.4} until={K.C - 0.3} texto="BAÑO DE AGUA CALIENTE" x={360} y={430} tam={34} borde={KC.cyan} mono />
      <Chip T={T} at={K.B + 2.2} until={K.C - 0.3} texto="46.1 °C · 65–110 min según el peso" y={1660} tam={34} borde={KC.red} />
      <Chip T={T} at={K.B + 1.0} until={K.C - 0.3} texto="casi todos los que van a EE. UU." x={330} y={510} tam={28} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={110} x={760} y={1480} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.A} texto="5 cm" largo={100} x={760} y={1630} color={KC.ink} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="10 µm" largo={120} x={60} y={1620} />
      <BarraEscala T={T} at={K.P} until={K.De} texto="5 cm" largo={120} x={60} y={1620} color={KC.ink} />
      <BarraEscala T={T} at={K.De} until={K.M} texto="5 cm · 10 µm (ventana)" largo={100} x={60} y={1620} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.E} texto="5 cm" largo={110} x={60} y={1620} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Ex} texto="mapa esquemático" largo={0} x={60} y={1620} color={KC.ink} />
      <BarraEscala T={T} at={K.B} until={K.C} texto="tina esquemática" largo={0} x={60} y={1740} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} x={760} y={1480} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubM T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No son golpes: *es un hongo.*" />
      <SubM T={T} idx={1} at={K.H + 0.1} until={K.L - 0.1} texto="*_Colletotrichum:_* la antracnosis." />
      <SubM T={T} idx={2} at={K.L + 0.1} until={K.A - 0.1} texto="Sus esporas viajan *en la lluvia.*" />
      <SubM T={T} idx={3} at={K.A + 0.1} until={K.D - 0.1} texto="Un *apresorio* perfora la cera." />
      <SubM T={T} idx={4} at={K.D + 0.1} until={K.P - 0.1} texto="Y se queda *quieto.*" />
      <SubM T={T} idx={5} at={K.P + 0.1} until={K.De - 0.1} texto="¿Qué *espera?*" />
      <SubM T={T} idx={6} at={K.De + 0.1} until={K.M - 0.1} texto="Al madurar, bajan las defensas: *despierta.*" />
      <SubM T={T} idx={7} at={K.M + 0.1} until={K.E - 0.1} texto="Manchas negras, *hundidas.*" />
      <SubM T={T} idx={8} at={K.E + 0.1} until={K.Ex - 0.1} texto="59 huertas: *cinco especies.*" />
      <SubM T={T} idx={9} at={K.Ex + 0.1} until={K.B - 0.1} texto="México, *el mayor exportador.*" />
      <SubM T={T} idx={10} at={K.B + 0.1} until={K.C - 0.1} texto="Agua a *46 °C,* más de una hora." />
      <SubM T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Esperaba que madurara… *igual que tú.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.8, K.L - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.A + 0.6, K.D - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.De + 1.0, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.M + 0.5, K.E - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.E + 3.0, K.Ex - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Ex + 3.0, K.B - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.B + 2.6, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="118" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MangoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MangoShot /></CompositionStage></div>;
}
window.MangoApp = MangoApp;
