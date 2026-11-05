// Shot Fungi Mati #121 · Este bosque quemado no está muerto — NARRADO (N1 Por dentro + N5 El experimento; gancho 1 «Esto no es X: es Y»).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Piezas propias (bosque quemado, anafre, Pyronema, horno, anillos aromáticos) viven aquí para no tocar el kit.

const PY = { naranja:'#f07a3c', naranja2:'#ffb07a', borde:'#9c3a14', salmon:'#f6a07a', carbon:'#1d1512', carbon2:'#3a2a22',
  ceniza:'#8d8780', suelo:'#2a2220', cerro:'#4a3c37', terracota:'#b8562f', terracota2:'#8e3f20', oro:'#F4C25A', mat:'#f4efe4' };

// Subtítulo con *resaltado* y _cursiva_ (las especies van en cursiva también en el subtítulo). Usa window.SUBS[idx] en la narrada.
function SubtituloIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0,
      fontStyle: cur ? 'italic' : 'normal', background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Tapete de Pyronema visto de lejos: telita blanca de hifas con discos naranjas apretados. p 0..1 = aparece.
function TapeteLejos({ x, y, s = 1, p = 1, seed = 1 }) {
  if (p <= 0) return null;
  const g = krng(seed * 13 + 7), n = 11;
  const discos = Array.from({ length: n }, () => [(g() - 0.5) * 110, (g() - 0.5) * 22, 9 + g() * 7]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={78 * kEase.sale(kclamp(p * 1.5, 0, 1))} ry={22} fill={PY.mat} opacity=".8" />
    {discos.map(([dx, dy, r], i) => { const k = kEase.rebote(kclamp(p * 1.8 - i * 0.06, 0, 1)); return k > 0 ? <g key={i}>
      <ellipse cx={dx} cy={dy} rx={r * 1.25 * k} ry={r * 0.6 * k} fill={PY.naranja} stroke={PY.borde} strokeWidth={2} />
      <ellipse cx={dx - r * 0.2} cy={dy - r * 0.12} rx={r * 0.6 * k} ry={r * 0.25 * k} fill={PY.naranja2} opacity=".8" />
    </g> : null; })}
  </g>;
}

// Tronco quemado de pino: negro, con muñones de ramas y grietas.
function TroncoQuemado({ x, y, h, w, seed = 1 }) {
  const g = krng(seed);
  const ramas = [0.45, 0.62, 0.8].map((k, i) => ({ k, lado: i % 2 ? 1 : -1, l: 30 + g() * 40 }));
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w} 0 L ${-w * 0.45} ${-h} L ${w * 0.45} ${-h} L ${w} 0 Z`} fill={PY.carbon} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {ramas.map((r, i) => <line key={i} x1={0} y1={-h * r.k} x2={r.lado * (w * 0.6 + r.l)} y2={-h * r.k - r.l * 0.7} stroke={PY.carbon} strokeWidth={9} strokeLinecap="round" />)}
    {[0.2, 0.35, 0.55, 0.72].map((k, i) => <path key={i} d={`M ${-w * 0.5} ${-h * k} l ${w * 0.4} ${-6} l ${w * 0.3} 4`} stroke={PY.carbon2} strokeWidth={3} fill="none" />)}
  </g>;
}
const TRONCOS = [[110, 1085, 560, 24, 1], [255, 1020, 400, 17, 2], [405, 1105, 640, 29, 3], [565, 1010, 360, 15, 4], [705, 1080, 600, 27, 5], [865, 1025, 430, 19, 6], [990, 1095, 540, 23, 7]];
const TAPETES = [[180, 1150, 1.0], [440, 1185, 1.15], [640, 1140, 0.9], [850, 1175, 1.05], [320, 1245, 0.8], [760, 1250, 0.85]];

// Bosque quemado (macro). humo 0..1 · tapetes 0..1 · brote 0..1 · co2 0..1 · foco = índice del tapete que se enciende primero.
function BosqueQuemado({ T, humo = 1, tapetes = 0, brote = 0, co2 = 0, foco = -1, pFoco = 0 }) {
  return <g transform="translate(0 -170)">
    <path d="M 0 990 Q 270 900 540 965 Q 800 1015 1080 945 L 1080 2150 L 0 2150 Z" fill={PY.cerro} stroke={KC.ink} strokeWidth={6} />
    {TRONCOS.slice(0, 7).filter((_, i) => i % 2).map(([x, y, h, w, s], i) => <TroncoQuemado key={'b' + i} x={x} y={y - 60} h={h * 0.6} w={w * 0.6} seed={s + 20} />)}
    <path d="M 0 1085 Q 300 1045 600 1095 Q 850 1125 1080 1075 L 1080 2150 L 0 2150 Z" fill={PY.suelo} stroke={KC.ink} strokeWidth={6} />
    {[[150, 1300, 120], [520, 1340, 160], [880, 1290, 110], [330, 1500, 140], [760, 1560, 170]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.22} fill={PY.ceniza} opacity=".45" />)}
    {TRONCOS.map(([x, y, h, w, s], i) => <TroncoQuemado key={i} x={x} y={y} h={h} w={w} seed={s} />)}
    {/* brasas en la base de los troncos */}
    {humo > 0 && TRONCOS.filter((_, i) => i % 3 === 0).map(([x, y], i) => <circle key={'e' + i} cx={x + 8} cy={y - 6} r={9} fill={KC.orange} opacity={humo * (0.45 + 0.4 * Math.sin(T * 5 + i * 2))} style={{ filter:`drop-shadow(0 0 10px ${KC.orange})` }} />)}
    {/* humo que sube */}
    {humo > 0 && [[130, 1080], [420, 1100], [700, 1075], [930, 1090]].map(([sx, sy], i) => Array.from({ length: 5 }, (_, k) => {
      const u = ((T * 0.22 + k / 5 + i * 0.17) % 1);
      return <circle key={i + '-' + k} cx={sx + Math.sin(u * 4 + i) * 40 + u * 60} cy={sy - u * 640} r={22 + u * 95} fill="#d8d2cc" opacity={(1 - u) * 0.32 * humo} />;
    }))}
    {/* tapetes de Pyronema */}
    {TAPETES.map(([x, y, s], i) => { const p = i === foco ? pFoco : kclamp(tapetes * 1.6 - i * 0.12, 0, 1);
      return <g key={'t' + i}>
        {i === foco && pFoco > 0 && <circle cx={x} cy={y} r={60 + 40 * ((T * 1.2) % 1)} fill="none" stroke={KC.orange} strokeWidth={6} opacity={(1 - ((T * 1.2) % 1)) * pFoco} />}
        <TapeteLejos x={x} y={y} s={s} p={p} seed={i + 1} />
      </g>; })}
    {/* CO₂ que sube de los tapetes */}
    {co2 > 0 && TAPETES.slice(0, 4).map(([x, y], i) => { const u = (T * 0.5 + i * 0.25) % 1; return <text key={'c' + i} x={x - 30} y={y - 40 - u * 220} style={{ font:`700 30px ${KF.mono}` }} fill={PY.oro} stroke={KC.ink} strokeWidth={1.5} opacity={co2 * (1 - u)}>CO₂</text>; })}
    {/* brote verde */}
    {brote > 0 && <g transform={`translate(560 1195) scale(${kEase.rebote(brote)})`}>
      <path d="M 0 0 Q -4 -50 2 -90" stroke="#2f9e44" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M 2 -70 Q -50 -100 -60 -60 Q -20 -50 2 -70 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
      <path d="M 2 -86 Q 50 -125 66 -84 Q 24 -70 2 -86 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}

// Anafre de barro con carbón. brasa 0..1 = qué tan prendido.
function Anafre({ T, x, y, s = 1, brasa = 1 }) {
  const trozos = [[-140, -150, 40], [-70, -162, 46], [10, -155, 42], [90, -165, 48], [160, -150, 36], [-110, -185, 34], [40, -190, 38], [120, -188, 30]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-120} y1={60} x2={-150} y2={140} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <line x1={120} y1={60} x2={150} y2={140} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <path d="M -210 -125 L 210 -125 L 155 70 L -155 70 Z" fill={PY.terracota} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-225} y={-150} width={450} height={34} rx={12} fill={PY.terracota2} stroke={KC.ink} strokeWidth={7} />
    {trozos.map(([dx, dy, r], i) => { const b = brasa * (0.6 + 0.4 * Math.sin(T * 4 + i * 1.7));
      return <g key={i}>
        <path d={`M ${dx - r} ${dy} Q ${dx - r * 0.8} ${dy - r * 0.9} ${dx} ${dy - r * 0.8} Q ${dx + r} ${dy - r * 0.7} ${dx + r * 0.9} ${dy + r * 0.2} Q ${dx} ${dy + r * 0.5} ${dx - r} ${dy} Z`} fill={mixHex('#1b1410', '#d9480f', b * 0.55)} stroke={KC.ink} strokeWidth={4} />
        {b > 0.05 && <path d={`M ${dx - r * 0.5} ${dy - r * 0.2} l ${r * 0.4} ${-r * 0.25} l ${r * 0.35} ${r * 0.2}`} stroke={KC.yellow} strokeWidth={4} fill="none" opacity={b} style={{ filter:`drop-shadow(0 0 8px ${KC.orange})` }} />}
      </g>; })}
    <rect x={-55} y={-30} width={110} height={56} rx={10} fill="#3a1a0e" stroke={KC.ink} strokeWidth={5} />
    {brasa > 0 && <rect x={-45} y={-20} width={90} height={36} rx={8} fill={KC.orange} opacity={brasa * (0.5 + 0.3 * Math.sin(T * 6))} />}
  </g>;
}

// Cerrito quemado chiquito (el que ves en temporada de incendios).
function CerroQuemado({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 0 Q -120 -260 20 -230 Q 160 -210 260 0 Z" fill={PY.cerro} stroke={KC.ink} strokeWidth={6} />
    {[[-150, -120, 110], [-60, -190, 120], [40, -200, 110], [130, -140, 100]].map(([dx, dy, h], i) => <TroncoQuemado key={i} x={dx} y={dy + 30} h={h} w={8} seed={i + 40} />)}
    {Array.from({ length: 4 }, (_, k) => { const u = (T * 0.3 + k / 4) % 1; return <circle key={k} cx={-20 + u * 60} cy={-230 - u * 260} r={18 + u * 60} fill="#d8d2cc" opacity={(1 - u) * 0.4} />; })}
  </g>;
}

// Llama que parpadea.
function Llama({ T, x, y, s = 1, fase = 0 }) {
  const k = 1 + 0.12 * Math.sin(T * 9 + fase), k2 = 1 + 0.1 * Math.sin(T * 7 + fase * 2);
  return <g transform={`translate(${x} ${y}) scale(${s * k2} ${s * k})`}>
    <path d="M 0 0 Q -46 -30 -20 -90 Q -8 -120 0 -160 Q 14 -110 30 -90 Q 50 -40 0 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 -6 Q -22 -30 -8 -70 Q 0 -86 4 -110 Q 12 -70 20 -55 Q 26 -24 0 -6 Z" fill={KC.yellow} />
  </g>;
}

// Trozos de carbón en el suelo (montoncito). oro 0..1 = carbón marcado con ¹³C (dorado).
function Montoncito({ x, y, s = 1, oro = 0, n = 9, seed = 3 }) {
  const g = krng(seed);
  const tr = Array.from({ length: n }, () => [(g() - 0.5) * 220, -g() * 60, 22 + g() * 26]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {tr.map(([dx, dy, r], i) => <path key={i} d={`M ${dx - r} ${dy} L ${dx - r * 0.5} ${dy - r * 0.9} L ${dx + r * 0.6} ${dy - r * 0.8} L ${dx + r} ${dy + r * 0.1} L ${dx + r * 0.2} ${dy + r * 0.5} Z`}
      fill={mixHex(PY.carbon, '#a77b16', oro)} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" style={oro > 0 ? { filter:`drop-shadow(0 0 ${10 * oro}px ${PY.oro})` } : null} />)}
  </g>;
}

// Pyronema de cerca: telita blanca de hifas y apotecios en disco/cojincito casi plano (0.5–1 mm), salmón a naranja-rojo, apretados.
const PX_MM = 90;  // 1 mm = 90 px en esta escena
const DISCOS = (() => { const g = krng(77), out = [];
  [[330, 880, 9], [640, 820, 11], [520, 1020, 10], [810, 1000, 7], [230, 1060, 6]].forEach(([cx, cy, n]) => {
    for (let i = 0; i < n; i++) { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 110; out.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7, (0.25 + g() * 0.25) * PX_MM, g()]); }
  }); return out; })();
function PyronemaCerca({ T, p = 1, mat = 1 }) {
  const g = krng(5);
  const hifas = Array.from({ length: 90 }, () => { const x = 120 + g() * 840, y = 720 + g() * 460, a = g() * Math.PI; return [x, y, x + Math.cos(a) * 120, y + Math.sin(a) * 50]; });
  return <g>
    {/* suelo quemado de fondo, con partículas de carbón y ceniza */}
    {Array.from({ length: 70 }, (_, i) => { const gx = krng(i + 300); return <circle key={'p' + i} cx={gx() * 1080} cy={420 + gx() * 1500} r={3 + gx() * 9} fill={gx() > 0.5 ? '#5a504a' : '#0f0b09'} opacity=".7" />; })}
    {/* tapete blanco de hifas */}
    {hifas.map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${b - 20} ${c} ${d}`} stroke={PY.mat} strokeWidth={2.4} fill="none" opacity={0.55 * kclamp(mat * 2 - i / 90, 0, 1)} />)}
    {/* apotecios apretados (se deforman entre sí) */}
    {DISCOS.map(([x, y, r, q], i) => { const k = kEase.rebote(kclamp(p * 2.2 - i / DISCOS.length * 1.2, 0, 1)); if (k <= 0) return null;
      const col = mixHex(PY.salmon, '#e0502a', q);
      return <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
        <ellipse rx={r * 1.12} ry={r * 0.78} fill={mixHex(col, '#7a2a10', 0.35)} stroke={KC.ink} strokeWidth={3} />
        <ellipse cy={-r * 0.08} rx={r} ry={r * 0.66} fill={col} />
        <ellipse cx={-r * 0.25} cy={-r * 0.25} rx={r * 0.45} ry={r * 0.22} fill="#ffd2b0" opacity={0.45 + 0.1 * Math.sin(T * 2 + i)} />
      </g>; })}
  </g>;
}

// Contorno esquemático de California (lon, lat) proyectado.
const CA = [[-124.2, 42], [-120, 42], [-120, 39], [-114.6, 35.1], [-114.7, 32.7], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.4, 40.4]];
function MapaCalifornia({ x, y, k = 38, p = 1, punto = 1 }) {
  const pr = ([lo, la]) => [(lo + 124.6) * k, (42.2 - la) * k * 1.2];
  const d = 'M ' + CA.map((q) => pr(q).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const [rx, ry] = pr([-119.95, 37.85]);  // incendio Rim (Bosque Nacional Stanislaus / Yosemite)
  return <g transform={`translate(${x} ${y})`} opacity={p}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {punto > 0 && <g transform={`translate(${rx} ${ry}) scale(${kEase.rebote(punto)})`}>
      <circle r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <circle r={22 + 20 * ((punto * 3) % 1)} fill="none" stroke={KC.red} strokeWidth={4} opacity={1 - ((punto * 3) % 1)} />
    </g>}
  </g>;
}

// Horno de laboratorio con ventana encendida y pantalla de temperatura.
function Horno({ T, x, y, s = 1, encendido = 1, temp = '750 °C' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-180} y={-150} width={360} height={300} rx={22} fill="#6b7280" stroke={KC.ink} strokeWidth={8} />
    <rect x={-140} y={-110} width={200} height={190} rx={14} fill="#2a1a12" stroke={KC.ink} strokeWidth={6} />
    {encendido > 0 && <rect x={-130} y={-100} width={180} height={170} rx={10} fill={KC.orange} opacity={encendido * (0.55 + 0.25 * Math.sin(T * 6))} style={{ filter:`drop-shadow(0 0 18px ${KC.orange})` }} />}
    <rect x={80} y={-110} width={80} height={56} rx={8} fill="#0f1720" stroke={KC.ink} strokeWidth={4} />
    <text x={120} y={-72} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#7CFFB2">{temp}</text>
    <circle cx={120} cy={10} r={22} fill="#d1d5db" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Frasco de cultivo cerrado (vista lateral) con carbón dorado y micelio adentro; burbujas de CO₂ marcadas.
function FrascoCultivo({ T, x, y, s = 1, mic = 1, burbujas = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-190} y={-330} width={380} height={420} rx={50} fill="rgba(200,230,255,.16)" stroke="#cfe8ff" strokeWidth={8} />
    <rect x={-150} y={-390} width={300} height={70} rx={16} fill="#9aa4b2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-170} y={-10} width={340} height={80} rx={20} fill="#f1d27a" opacity=".85" />
    <Montoncito x={0} y={10} s={1.05} oro={1} seed={9} />
    {mic > 0 && <RedHifas T={T} x={0} y={-30} g={mic} seed={12} n={160} escala={0.1} color="#ffe2c8" ancho={3} />}
    {burbujas > 0 && Array.from({ length: 9 }, (_, i) => { const u = (T * 0.45 + i / 9) % 1; return <circle key={i} cx={-120 + (i * 31) % 240 + Math.sin(u * 8 + i) * 12} cy={-20 - u * 300} r={9 + (i % 3) * 4} fill={PY.oro} stroke={KC.ink} strokeWidth={2} opacity={burbujas * Math.min(1, (1 - u) * 3)} />; })}
  </g>;
}

// Anillos aromáticos del carbón (hojita de hexágonos) que se van abriendo. abre(i) 0..1.
const HEX_R = 52;
const RED_HEX = (() => { const out = []; for (let f = 0; f < 3; f++) for (let c = 0; c < 6; c++) out.push([c * HEX_R * 1.732 + (f % 2) * HEX_R * 0.866, f * HEX_R * 1.5]); return out; })();
function AnillosCarbon({ T, x, y, abre = () => 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {RED_HEX.map(([cx, cy], i) => { const a = abre(i);
      const pts = Array.from({ length: 6 }, (_, k) => { const ang = Math.PI / 6 + k * Math.PI / 3; return [cx + HEX_R * Math.cos(ang), cy + HEX_R * Math.sin(ang)]; });
      return <g key={i} opacity={1 - kprog(a, 0.6, 1)}>
        {pts.map((p, k) => { const q = pts[(k + 1) % 6]; const roto = k === i % 6 ? a : 0;
          return <line key={k} x1={p[0]} y1={p[1]} x2={klerp(q[0], p[0], roto * 0.7)} y2={klerp(q[1], p[1], roto * 0.7) - roto * 20} stroke={mixHex('#5a524a', PY.oro, a)} strokeWidth={10} strokeLinecap="round" />; })}
        {a > 0.3 && Array.from({ length: 3 }, (_, k) => <circle key={'d' + k} cx={cx + (k - 1) * 18} cy={cy - (a - 0.3) * 220 - k * 14} r={8} fill={PY.oro} opacity={1 - kprog(a, 0.8, 1)} />)}
      </g>; })}
  </g>;
}

function HongoCenizaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tu: CUES.Tu, Ca: CUES.Carbon, Si: CUES.Siglos, Py: CUES.Pyronema, P: CUES.Pregunta, E: CUES.Estudio, A: CUES.Alimento, I: CUES.Isotopo, Ge: CUES.Genes, Po: CUES.Poquito, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const I2 = K.I + 3.0;  // segunda mitad del isótopo: el frasco (fondo oscuro)
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: bosque quemado que humea; se enciende un tapete naranja */}
      <Escena T={T} a={K.G} b={K.Tu} zoom={0.06} origen="40% 60%">
        <FondoLunares color={KC.orange} />
        {fsvg(<BosqueQuemado T={T} humo={1} foco={1} pFoco={kprog(T, K.G + 0.6, K.G + 1.6)} tapetes={kprog(T, K.G + 2.6, K.G + 4.6)} />)}
      </Escena>
      {/* 2 · tú: el anafre y el cerro quemado */}
      <Escena T={T} a={K.Tu} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Anafre T={T} x={320} y={1010} s={0.95} brasa={1 - kprog(T, K.Tu + 1.2, K.Tu + 2.6)} />
          <CerroQuemado T={T} x={810} y={1180} s={kEase.sale(kprog(T, K.Tu + 1.4, K.Tu + 2.2))} />
        </>)}
      </Escena>
      {/* 3 · el bosque arde: humo arriba, carbón abajo */}
      <Escena T={T} a={K.Ca} b={K.Si}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const q = kprog(T, K.Ca + 0.3, K.Ca + 3.4); return <g transform="translate(0 -150)">
          <rect x={250} y={880} width={580} height={140} rx={40} fill={mixHex('#7a4a22', PY.carbon, q)} stroke={KC.ink} strokeWidth={8} />
          {[0.2, 0.45, 0.7].map((k, i) => <path key={i} d={`M 300 ${910 + i * 38} Q 540 ${900 + i * 38} 800 ${915 + i * 38}`} stroke={mixHex('#5a3416', PY.carbon2, q)} strokeWidth={6} fill="none" />)}
          <ellipse cx={250} cy={950} rx={44} ry={70} fill={mixHex('#d9a86a', '#2a1a12', q)} stroke={KC.ink} strokeWidth={8} />
          {q < 0.98 && [300, 400, 500, 600, 700, 790].map((lx, i) => <g key={i} opacity={1 - kprog(T, K.Ca + 3.0, K.Ca + 3.6)}><Llama T={T} x={lx} y={890} s={1.0 + (i % 2) * 0.3} fase={i * 1.3} /></g>)}
          {Array.from({ length: 6 }, (_, k) => { const u = (T * 0.3 + k / 6) % 1; return <circle key={k} cx={420 + Math.sin(u * 5 + k) * 50} cy={760 - u * 300} r={30 + u * 80} fill="#cfcac4" opacity={(1 - u) * 0.55} />; })}
          <FlechaCurva T={T} x1={560} y1={760} x2={330} y2={520} p={kprog(T, K.Ca + 1.0, K.Ca + 1.8)} curva={-60} color={KC.white} />
          <FlechaCurva T={T} x1={700} y1={1030} x2={780} y2={1160} p={kprog(T, K.Ca + 2.6, K.Ca + 3.2)} curva={40} color={KC.white} />
          <Montoncito x={790} y={1220} s={kEase.sale(kprog(T, K.Ca + 3.0, K.Ca + 3.6))} seed={4} />
        </g>; })())}
      </Escena>
      {/* 4 · el carbón dura siglos en el suelo; los microbios casi no lo atacan */}
      <Escena T={T} a={K.Si} b={K.Py}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={760} width={1080} height={1200} fill="#6b4a2e" />
          <path d="M 0 760 Q 270 735 540 765 Q 800 790 1080 755" stroke={KC.ink} strokeWidth={8} fill="none" />
          {[900, 1040, 1180].map((yy, i) => <path key={i} d={`M 0 ${yy} Q 300 ${yy - 18} 600 ${yy + 6} Q 850 ${yy + 20} 1080 ${yy - 4}`} stroke="#57391f" strokeWidth={6} fill="none" />)}
          {[[200, 850], [520, 880], [820, 860], [340, 990], [700, 1010], [150, 1120], [480, 1130], [880, 1140]].map(([cx, cy], i) =>
            <g key={i} opacity={kprog(T, K.Si + 0.2 + i * 0.12, K.Si + 0.5 + i * 0.12)}><Montoncito x={cx} y={cy} s={0.45} n={3} seed={i + 30} /></g>)}
          {[[340, 990], [700, 1010], [480, 1130]].map(([cx, cy], i) => { const u = Math.abs(Math.sin(T * 1.6 + i * 1.3));
            return <BacteriaC key={i} x={cx + 130 - u * 70} y={cy - 40 + i * 10} rot={i * 40} s={0.38} color={KC.mint} T={T} seed={i + 2} />; })}
        </>)}
      </Escena>
      {/* 5 · Pyronema de cerca: tapete de discos naranjas (fondo oscuro: lo pequeño) */}
      <Escena T={T} a={K.Py} b={K.P} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:'#14100d' }}></div>
        {fsvg(<PyronemaCerca T={T} mat={kprog(T, K.Py + 0.1, K.Py + 1.4)} p={kprog(T, K.Py + 0.8, K.Py + 3.6)} />)}
      </Escena>
      {/* 6 · re-gancho: ¿de qué vive? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<><BosqueQuemado T={T} humo={0.6} tapetes={1} /><Interrogacion T={T} x={270} y={900} tam={420} /></>)}
      </Escena>
      {/* 7 · el estudio: Berkeley + Wisconsin, hongo del incendio Rim (2013) */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaCalifornia x={70} y={800} k={32} p={kprog(T, K.E + 1.4, K.E + 2.0)} punto={kprog(T, K.E + 2.2, K.E + 3.4)} />
          {kprog(T, K.E + 2.8, K.E + 3.4) > 0 && <g opacity={kprog(T, K.E + 2.8, K.E + 3.4)}>
            <Petri x={800} y={1010} r={150}><Colonia cx={0} cy={0} r={110 * kprog(T, K.E + 3.0, K.E + 5.0)} color="#ffcfae" seed={3} /></Petri>
          </g>}
          <FlechaCurva T={T} x1={330} y1={960} x2={640} y2={1000} p={kprog(T, K.E + 2.8, K.E + 3.4)} curva={-50} color={KC.ink} />
        </>)}
      </Escena>
      {/* 8 · única fuente de carbono: carbón de pino a 750 °C (y el hongo crece) */}
      <Escena T={T} a={K.A} b={K.I}>
        <FondoLunares color={KC.yellow} />
        {fsvg((() => { const vuela = kprog(T, K.A + 1.6, K.A + 2.4, kEase.suave); return <>
          <Horno T={T} x={300} y={760} s={1} encendido={kprog(T, K.A + 0.4, K.A + 0.8)} />
          {T < K.A + 1.2 && [0, 1, 2, 3].map((i) => { const u = kprog(T, K.A + i * 0.15, K.A + 0.8 + i * 0.15); return u > 0 && u < 1 ?
            <rect key={i} x={klerp(120 + i * 30, 230, u)} y={klerp(480, 740, u)} width={46} height={16} rx={4} fill="#d9a86a" stroke={KC.ink} strokeWidth={3} transform={`rotate(${u * 200} ${klerp(120 + i * 30, 230, u)} ${klerp(480, 740, u)})`} /> : null; })}
          <Petri x={720} y={970} r={210} medio="#f1d27a">
            {vuela > 0.95 && Array.from({ length: 26 }, (_, i) => { const gg = krng(i + 50); const a = gg() * 6.28, d = Math.sqrt(gg()) * 190; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={6 + gg() * 7} fill={PY.carbon} />; })}
            <RedHifas T={T} x={0} y={0} g={kprog(T, K.A + 2.5, K.A + 5.4)} seed={7} n={260} escala={0.3} color="#ffffff" ancho={3} circ />
          </Petri>
          {vuela > 0 && vuela < 1 && <Montoncito x={klerp(330, 720, vuela)} y={klerp(900, 970, vuela) - Math.sin(vuela * Math.PI) * 160} s={0.4} n={5} />}
        </>; })())}
      </Escena>
      {/* 9a · pinitos que respiraron ¹³CO₂ → su madera → carbón dorado */}
      <Escena T={T} a={K.I} b={I2}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Conifera x={280} y={1100} s={0.75} T={T} seed={2} />
          {[0, 1, 2].map((i) => <FlechaCurva key={i} T={T} x1={700 - i * 20} y1={560 + i * 90} x2={380} y2={680 + i * 100} p={kprog(T, K.I + 0.2 + i * 0.25, K.I + 1.0 + i * 0.25)} curva={-50} color={PY.oro} />)}
          {[0, 1, 2].map((i) => <text key={'t' + i} x={720 - i * 20} y={560 + i * 90} style={{ font:`900 36px ${KF.texto}` }} fill={PY.oro} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.I + 0.2 + i * 0.25, K.I + 0.6 + i * 0.25)}>¹³CO₂</text>)}
          <FlechaCurva T={T} x1={430} y1={1020} x2={730} y2={1020} p={kprog(T, K.I + 1.6, K.I + 2.2)} curva={60} color={KC.ink} />
          <Montoncito x={840} y={1060} s={kEase.sale(kprog(T, K.I + 2.0, K.I + 2.6))} oro={1} seed={6} />
        </>)}
      </Escena>
      {/* 9b · el frasco: el hongo suelta CO₂ con ¹³C (lo pequeño, fondo oscuro) */}
      <Escena T={T} a={I2} b={K.Ge}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<FrascoCultivo T={T} x={460} y={1040} s={1.0} mic={kprog(T, I2, I2 + 1.4)} burbujas={kprog(T, I2 + 1.0, I2 + 1.6)} />)}
      </Escena>
      {/* 10 · genes encendidos y anillos del carbón que se abren */}
      <Escena T={T} a={K.Ge} b={K.Po}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <ADNHebra T={T} x={90} y={640} largo={900} alto={90} vueltas={3} resalta={(u) => { const k = kprog(T, K.Ge + 0.3, K.Ge + 2.0); return (u > 0.15 && u < 0.15 + 0.2 * k) || (u > 0.55 && u < 0.55 + 0.25 * k); }} />
          <AnillosCarbon T={T} x={150} y={900} abre={(i) => kprog(T, K.Ge + 1.4 + (i % 6) * 0.22 + Math.floor(i / 6) * 0.1, K.Ge + 2.4 + (i % 6) * 0.22 + Math.floor(i / 6) * 0.1)} />
        </>)}
      </Escena>
      {/* 11 · fue poco y en laboratorio */}
      <Escena T={T} a={K.Po} b={K.C}>
        <FondoLunares color={KC.pink} />
        {fsvg((() => { const u = kprog(T, K.Po + 0.4, K.Po + 1.8, kEase.sale), oro = 900 / 5.5; return <>
          <rect x={90} y={920} width={900} height={130} rx={20} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
          <rect x={90} y={920} width={oro * u} height={130} rx={20} fill={PY.oro} stroke={KC.ink} strokeWidth={7} />
          <rect x={90 + oro} y={920} width={(900 - oro) * kprog(T, K.Po + 1.2, K.Po + 2.6, kEase.sale)} height={130} rx={20} fill="#9aa0a6" stroke={KC.ink} strokeWidth={7} />
        </>; })())}
      </Escena>
      {/* 12 · cierre: el mismo bosque quemado, ahora con tapetes, CO₂ y un brote */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 60%">
        <FondoLunares color={KC.orange} />
        {fsvg(<BosqueQuemado T={T} humo={0.35} tapetes={1} co2={kprog(T, K.C + 1.2, K.C + 2.0)} brote={kprog(T, K.C + 2.4, K.C + 3.2)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.Tu - 0.3} texto="¿muerto?" x={260} y={560} tam={46} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.0} until={K.Tu - 0.3} x={60} y={680} texto="un hongo del fuego" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Tu + 0.4} until={K.Ca - 0.3} x={60} y={560} texto="carbón vegetal (anafre)" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Tu + 1.8} until={K.Ca - 0.3} texto="temporada de incendios" x={770} y={800} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Si - 0.3} x={330} y={340} texto="humo y gases" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 3.2} until={K.Si - 0.3} x={640} y={1030} texto="carbón" lado="izq" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Ca + 3.4} until={K.Si - 0.3} x={340} y={1110} texto="materia orgánica pirogénica" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Si + 0.6} until={K.Py - 0.3} texto="a veces: cientos o miles de años" x={370} y={560} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Si + 1.6} until={K.Py - 0.3} x={60} y={680} texto="se creía casi intocable" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Py + 0.6} until={K.P - 0.3} x={60} y={480} texto="Pyronema" it tam={46} color={KC.texto} />
      <Etq T={T} at={K.Py + 1.3} until={K.P - 0.3} x={60} y={545} texto="discos de 0.5 a 1 mm" tam={30} color={PY.naranja2} />
      <Etq T={T} at={K.Py + 1.8} until={K.P - 0.3} x={60} y={600} texto="sobre un tapete de hifas" tam={30} color={PY.mat} />
      <Chip T={T} at={K.Py + 2.4} until={K.P - 0.3} texto="semanas o meses después del fuego" x={420} y={690} tam={30} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.A - 0.3} anio="2021" quien="UC Berkeley + U. de Wisconsin" revista="Frontiers in Microbiology, 2021" x={540} y={560} />
      <Etq T={T} at={K.E + 2.4} until={K.A - 0.3} x={60} y={775} texto="incendio Rim, California (2013)" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 3.4} until={K.A - 0.3} x={640} y={820} texto="P. domesticum" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 0.6} until={K.I - 0.3} texto="única fuente de carbono: carbón" x={540} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.0} until={K.I - 0.3} x={60} y={560} texto="carbón de pino · 750 °C" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 3.2} until={K.I - 0.3} x={950} y={760} texto="¡crece!" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.I + 0.4} until={I2 - 0.3} texto="¹³C: carbono más pesado" x={540} y={460} tam={34} borde={PY.oro} />
      <Etq T={T} at={K.I + 2.4} until={I2 - 0.3} x={1010} y={920} texto="carbón marcado" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={I2 + 0.4} until={K.Ge - 0.3} x={60} y={470} texto="Pyronema" it tam={36} color={KC.texto} />
      <Etq T={T} at={I2 + 0.7} until={K.Ge - 0.3} x={60} y={525} texto="sobre carbón con carbono 13" tam={28} color={KC.texto} />
      <Etq T={T} at={I2 + 1.2} until={K.Ge - 0.3} x={60} y={580} texto="sale CO₂ con carbono 13" tam={28} color={PY.oro} />
      <Etq T={T} at={K.Ge + 0.3} until={K.Po - 0.3} x={60} y={500} texto="genes de compuestos aromáticos" tam={30} color={PY.oro} />
      <Etq T={T} at={K.Ge + 1.2} until={K.Po - 0.3} x={60} y={820} texto="anillos del carbón" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Po + 0.2} until={K.C - 0.3} texto="en laboratorio" x={300} y={560} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Po + 1.0} until={K.C - 0.3} x={90} y={870} texto="CO₂ del carbón" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Po + 2.2} until={K.C - 0.3} x={90} y={1100} texto="de otras fuentes: ~4.5 veces más" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="no está muerto" x={300} y={560} tam={42} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Tu} texto="10 m" largo={160} />
      <BarraEscala T={T} at={K.Tu} until={K.Ca} texto="20 cm" largo={200} />
      <BarraEscala T={T} at={K.Ca} until={K.Si} texto="50 cm" largo={260} />
      <BarraEscala T={T} at={K.Si} until={K.Py} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Py} until={K.P} texto="1 mm" largo={PX_MM} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="10 m" largo={160} />
      <BarraEscala T={T} at={K.E} until={K.A} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.A} until={K.I} texto="5 cm" largo={128} />
      <BarraEscala T={T} at={K.I} until={K.Ge} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ge} until={K.Po} texto="esquemático (nm)" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 m" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloIt T={T} idx={0} at={K.G + 0.1} until={K.Tu - 0.1} texto="Este bosque quemado *no está muerto.*" />
      <SubtituloIt T={T} idx={1} at={K.Tu + 0.1} until={K.Ca - 0.1} texto="Como el carbón de *tu anafre.*" />
      <SubtituloIt T={T} idx={2} at={K.Ca + 0.1} until={K.Si - 0.1} texto="No todo se hace humo: *queda carbón.*" />
      <SubtituloIt T={T} idx={3} at={K.Si + 0.1} until={K.Py - 0.1} texto="Puede durar *siglos* en el suelo." />
      <SubtituloIt T={T} idx={4} at={K.Py + 0.1} until={K.P - 0.1} texto="Semanas después: *_Pyronema._*" />
      <SubtituloIt T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿De qué vive, si *todo está quemado?*" />
      <SubtituloIt T={T} idx={6} at={K.E + 0.1} until={K.A - 0.1} texto="2021: Berkeley y Wisconsin, *incendio Rim.*" />
      <SubtituloIt T={T} idx={7} at={K.A + 0.1} until={K.I - 0.1} texto="Su única fuente de carbono: *carbón.*" />
      <SubtituloIt T={T} idx={8} at={K.I + 0.1} until={K.Ge - 0.1} texto="Carbono 13: el hongo lo soltó *como CO₂.*" />
      <SubtituloIt T={T} idx={9} at={K.Ge + 0.1} until={K.Po - 0.1} texto="Genes para *desarmar el carbón.*" />
      <SubtituloIt T={T} idx={10} at={K.Po + 0.1} until={K.C - 0.1} texto="Fue poco y *en laboratorio.*" />
      <SubtituloIt T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo puede regresarlo *al ciclo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Tu + 0.4, K.Ca - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Si + 0.3, K.Py - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Py + 1.0, K.P - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [I2 + 0.4, K.Ge - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Po + 0.3, K.C - 0.2, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="121" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HongoCenizaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HongoCenizaShot /></CompositionStage></div>;
}
window.HongoCenizaApp = HongoCenizaApp;
