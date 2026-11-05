// Shot Fungi Mati #148 · Esa lana roja no la tiñó una fábrica: la tiñó un hongo — NARRADO (N1 Por dentro + toque N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Los Cortinarius NO se comen.

const TX = {
  lana:'#c8243a', lana2:'#e0485c', lana3:'#8e1426',          // lana teñida con Dermocybe + alumbre (rojo)
  hierro:'#6a2a30', hierro2:'#86424a',                       // misma seta con hierro: más oscuro, "triste"
  limon:'#e6d43a', limon2:'#f3e77a',                         // Phaeolus schweinitzii + alumbre
  verde:'#2f5a3a', verde2:'#4a7a55',                         // Tapinella atrotomentosa + hierro
  morado:'#6b2a7a', violeta:'#8a4fb0', amarillo:'#e8b82a', rojo:'#c42a2a',
  sangre:'#7d0f16', sangre2:'#a5161f', lamina:'#b3121c', pieRojo:'#9a2a22',
  crudo:'#f1ead8', crudo2:'#d9cfb6',                         // lana sin teñir
  bano:'#c8402a', agua:'#bfe6ff',
  orellanus:'#b5652d', orellanus2:'#d08a4a', rubellus:'#a4532a',
  phaeolus:'#c9922a', phaeolus2:'#e6c34a', phaeolusC:'#6b3f1a',
  tapinella:'#6b4a2a', tapinellaPie:'#2a1a12',
  musgo:'#2f7a3a', musgo2:'#3f9a48', agujas:'#8a5a2a',
};

/* ---------------- piezas ---------------- */
// Madeja de lana (hank retorcido, vista de frente): dos lóbulos de hebras paralelas y la torsión al centro. (x, y) = centro.
function Madeja({ x, y, s = 1, rot = 0, color = TX.lana, claro = TX.lana2, oscuro = TX.lana3, T = 0, op = 1 }) {
  const lobulo = (k) => <g>
    <path d={`M 0 -30 Q ${k * 90} -95 ${k * 190} -55 Q ${k * 245} 0 ${k * 190} 55 Q ${k * 90} 95 0 30 Q ${k * 30} 0 0 -30 Z`} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-0.62, -0.36, -0.1, 0.16, 0.42].map((v, i) => <path key={i} d={`M ${k * 14} ${v * 46} Q ${k * 100} ${v * 150} ${k * 200} ${v * 80}`} stroke={i % 2 ? claro : oscuro} strokeWidth={8} fill="none" strokeLinecap="round" opacity=".9" />)}
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={92} rx={220} ry={20} fill="rgba(0,0,0,.16)" />
    {lobulo(-1)}{lobulo(1)}
    <path d="M -34 -42 Q 0 -10 34 -42 L 34 42 Q 0 10 -34 42 Z" fill={oscuro} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-24, -8, 8, 24].map((dy, i) => <path key={i} d={`M -30 ${dy - 10} Q 0 ${dy + 12} 30 ${dy - 10}`} stroke={claro} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <path d="M -150 -50 Q -90 -78 -30 -50" stroke="#fff" strokeWidth={9} fill="none" opacity=".25" strokeLinecap="round" />
    <path d={`M 200 40 Q 240 ${70 + Math.sin(T * 3) * 6} 250 120`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Seta Cortinarius (Dermocybe) roja sangre: sombrero convexo con umbo, láminas rojo sangre, pie rojo con fibrillas de cortina.
function SetaSangre({ x, y, s = 1, crece = 1, rot = 0, T = 0, sombrero = TX.sangre, lamina = TX.lamina, pie = TX.pieRojo, alto = 170, ancho = 150 }) {
  if (crece <= 0) return null;
  const h = alto * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = ancho * (0.45 + 0.55 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -16 0 Q -19 ${-h * 0.5} -13 ${-h} L 13 ${-h} Q 19 ${-h * 0.5} 16 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.3, 0.5, 0.7].map((k, i) => <path key={i} d={`M -9 ${-h * k} q 9 6 18 0`} stroke="#d8603a" strokeWidth={3} fill="none" opacity=".8" />)}
    {/* láminas (vistas por debajo del sombrero) */}
    <path d={`M ${-a / 2 + 4} ${-h + 2} Q 0 ${-h + a * 0.16} ${a / 2 - 4} ${-h + 2} L ${a / 2 - 4} ${-h - 4} L ${-a / 2 + 4} ${-h - 4} Z`} fill={lamina} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 7 }, (_, i) => { const u = (i - 3) / 3.4; return <line key={i} x1={u * a * 0.45} y1={-h - 2} x2={u * a * 0.2} y2={-h + a * 0.12} stroke="#5a0a10" strokeWidth={2.5} />; })}
    <path d={`M ${-a / 2} ${-h} Q ${-a / 2} ${-h - a * 0.42} ${-a * 0.12} ${-h - a * 0.5} Q 0 ${-h - a * 0.6} ${a * 0.12} ${-h - a * 0.5} Q ${a / 2} ${-h - a * 0.42} ${a / 2} ${-h} Q 0 ${-h + a * 0.06} ${-a / 2} ${-h} Z`} fill={sombrero} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-a * 0.3} ${-h - a * 0.28} Q ${-a * 0.05} ${-h - a * 0.48} ${a * 0.2} ${-h - a * 0.36}`} stroke="#fff" strokeWidth={6} fill="none" opacity=".25" strokeLinecap="round" />
  </g>;
}
// Antraquinona esquemática: tres anillos fusionados; el del centro con dos C=O. color = el del pigmento.
function Antraquinona({ x, y, s = 1, rot = 0, color = TX.rojo, p = 1, oh = true }) {
  const R = 46, hexa = (cx) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + R * Math.cos(a)).toFixed(1)} ${(R * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const dx = R * Math.sqrt(3);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={kclamp(p * 2, 0, 1)}>
    {[-dx, 0, dx].map((cx, i) => <path key={i} d={hexa(cx)} fill={`${color}33`} stroke={color} strokeWidth={9} strokeLinejoin="round" opacity={kclamp(p * 3 - i, 0, 1)} />)}
    {/* C=O arriba y abajo del anillo central */}
    <line x1={-4} y1={-R} x2={-4} y2={-R - 40} stroke={color} strokeWidth={7} /><line x1={6} y1={-R} x2={6} y2={-R - 40} stroke={color} strokeWidth={7} />
    <circle cx={1} cy={-R - 58} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    <line x1={-4} y1={R} x2={-4} y2={R + 40} stroke={color} strokeWidth={7} /><line x1={6} y1={R} x2={6} y2={R + 40} stroke={color} strokeWidth={7} />
    <circle cx={1} cy={R + 58} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    {oh && [[-dx - 40, -R * 0.55], [dx + 40, -R * 0.55]].map(([a, b], i) => <g key={i}><line x1={a > 0 ? dx + R * 0.86 : -dx - R * 0.86} y1={-R * 0.5} x2={a} y2={b - 20} stroke={color} strokeWidth={6} /><circle cx={a} cy={b - 30} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>)}
  </g>;
}
// Olla de frente con agua (color mezclable), vapor y fuego. (x, y) = base.
function Olla({ T, x, y, s = 1, agua = TX.agua, vapor = 1, fuego = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fuego > 0 && [-70, -25, 20, 65].map((dx, i) => { const f = 1 + 0.25 * Math.sin(T * 14 + i * 2); return <path key={i} d={`M ${dx - 18} 40 Q ${dx} ${40 - 60 * f} ${dx + 18} 40 Z`} fill={i % 2 ? '#ffb21a' : '#ff6a1a'} stroke={KC.ink} strokeWidth={4} opacity={fuego} />; })}
    <rect x={-150} y={30} width={300} height={22} rx={8} fill="#3a3a40" stroke={KC.ink} strokeWidth={5} />
    <path d="M -170 -230 L 170 -230 L 150 20 Q 0 40 -150 20 Z" fill="#a9b2bd" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-200} rx={162} ry={34} fill={agua} stroke={KC.ink} strokeWidth={6} />
    {children}
    <path d="M -170 -230 Q 0 -262 170 -230" stroke={KC.ink} strokeWidth={8} fill="none" />
    <rect x={-210} y={-212} width={46} height={20} rx={8} fill="#6b737d" stroke={KC.ink} strokeWidth={5} />
    <rect x={164} y={-212} width={46} height={20} rx={8} fill="#6b737d" stroke={KC.ink} strokeWidth={5} />
    <rect x={-120} y={-170} width={26} height={150} rx={13} fill="#fff" opacity=".35" />
    {vapor > 0 && [-80, 0, 80].map((dx, i) => { const u = ((T * 0.6 + i * 0.33) % 1); return <path key={i} d={`M ${dx} ${-240 - u * 180} q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * 0.55 * Math.sin(Math.PI * u)} />; })}
  </g>;
}
// Fibra de lana al microscopio (horizontal): cilindro con escamas de cutícula. tinte 0..1 = cuánto rojo tomó.
function FibraLana({ T, y = 860, alto = 190, tinte = 0, color = TX.lana }) {
  const base = mixHex('#efe6cf', color, tinte), sombra = mixHex('#cbbf9f', TX.lana3, tinte);
  return <g>
    <rect x={-40} y={y - alto / 2} width={1160} height={alto} rx={alto / 2} fill={base} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 13 }, (_, i) => { const x0 = -20 + i * 92 + (T * 6) % 92; return <path key={i} d={`M ${x0} ${y - alto / 2 + 4} Q ${x0 + 40} ${y} ${x0} ${y + alto / 2 - 4}`} stroke={sombra} strokeWidth={6} fill="none" />; })}
    <rect x={-40} y={y - alto / 2 + 18} width={1160} height={22} rx={11} fill="#fff" opacity=".22" />
  </g>;
}
// Átomo de aluminio (bolita plateada con "Al").
function Aluminio({ x, y, r = 30, p = 1, brillo = 0 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))})`} style={brillo ? { filter:`drop-shadow(0 0 ${12 * brillo}px #cfe8ff)` } : null}>
    <circle r={r} fill="#c9d3dd" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.3} fill="#fff" opacity=".7" />
    <text y={r * 0.38} textAnchor="middle" style={{ font:`700 ${r * 0.95}px ${KF.mono}` }} fill={KC.ink}>Al</text>
  </g>;
}
// Hongo Phaeolus schweinitzii: roseta de repisas anchas, borde amarillo, centro café rojizo (al pie de una conífera).
function Phaeolus({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    {[[-60, -10, 1], [55, -20, 0.95], [0, -45, 1.1]].map(([dx, dy, z], i) => <g key={i} transform={`translate(${dx} ${dy}) scale(${z})`}>
      <ellipse cx={0} cy={0} rx={95} ry={40} fill={TX.phaeolus2} stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={0} cy={-4} rx={66} ry={26} fill={TX.phaeolus} />
      <ellipse cx={0} cy={-6} rx={36} ry={14} fill={TX.phaeolusC} />
    </g>)}
  </g>;
}
// Bufanda tejida (cierre): franja con puntos de tejido y flecos. (x, y) = esquina sup-izq; rot en grados.
function Bufanda({ x, y, w = 820, h = 170, rot = -8, color = TX.lana, p = 1 }) {
  if (p <= 0) return null;
  const W = w * kEase.sale(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={0} y={0} width={W} height={h} rx={14} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: Math.floor(W / 36) }, (_, i) => Array.from({ length: 4 }, (_, j) => <path key={i + '-' + j} d={`M ${18 + i * 36 - 10} ${26 + j * 38} l 10 14 l 10 -14`} stroke={TX.lana3} strokeWidth={4} fill="none" />))}
    <rect x={0} y={h * 0.42} width={W} height={18} fill={TX.lana2} opacity=".6" />
    {p >= 1 && Array.from({ length: 7 }, (_, i) => <line key={i} x1={W} y1={14 + i * 24} x2={W + 46} y2={20 + i * 24} stroke={color} strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// Riñón esquemático. apaga 0..1 = se vuelve gris.
function Rinon({ x, y, s = 1, apaga = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -110 Q 90 -120 100 -30 Q 104 10 60 0 Q 30 -6 40 40 Q 60 110 -10 115 Q -95 110 -95 0 Q -95 -100 0 -110 Z" fill={mixHex('#d0485a', '#7a7470', apaga)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -40 -60 Q -70 0 -40 60" stroke="#fff" strokeWidth={10} fill="none" opacity={0.3 * (1 - apaga)} strokeLinecap="round" />
  </g>;
}
// Mapa esquemático de California (silueta simple). Mendocino en la costa norte.
function MapaCalifornia({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 20 0 L 230 0 L 230 250 L 470 600 Q 480 640 450 690 L 430 760 L 300 760 Q 290 700 230 660 Q 180 600 160 540 Q 120 470 90 400 Q 60 330 40 250 Q 10 160 30 90 Q 10 40 20 0 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Frasquito de muestra con lana de color.
function FrascoMuestra({ x, y, color, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))})`}>
    <rect x={-34} y={-96} width={68} height={96} rx={12} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} />
    <rect x={-28} y={-112} width={56} height={20} rx={6} fill="#8a6a4a" stroke={KC.ink} strokeWidth={4} />
    <path d="M -22 -14 Q -26 -50 0 -60 Q 26 -50 22 -14 Q 0 -6 -22 -14 Z" fill={color} stroke={KC.ink} strokeWidth={3} />
    <path d="M -14 -24 Q 0 -54 14 -24" stroke="rgba(255,255,255,.45)" strokeWidth={4} fill="none" />
  </g>;
}
// Tubo de ensayo con líquido.
function Tubo({ x, y, color, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -190 L -30 -30 Q -30 10 0 10 Q 30 10 30 -30 L 30 -190" fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={6} />
    <path d="M -24 -110 L -24 -30 Q -24 4 0 4 Q 24 4 24 -30 L 24 -110 Z" fill={color} />
    <rect x={-40} y={-200} width={80} height={14} rx={6} fill="#ddd" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Muestra de lana (mechón) de un color.
function Mechon({ x, y, color, p = 1, s = 1 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d="M -60 -30 Q -70 -70 -20 -66 Q 0 -90 30 -66 Q 74 -70 64 -26 Q 80 10 50 30 Q 20 56 -10 40 Q -60 50 -66 14 Q -84 -6 -60 -30 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-30, 0, 30].map((dx, i) => <path key={i} d={`M ${dx - 10} -50 Q ${dx + 6} -10 ${dx - 6} 30`} stroke="rgba(255,255,255,.35)" strokeWidth={5} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Signo de interrogación de la marca, con Robert grande al lado.
// Subtítulo con *dorado* y _cursiva_ (los nombres científicos van en cursiva también en los subtítulos).
function SubtituloIt({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Texto de etiqueta dentro de un SVG (con sombra).
function TxtS({ x, y, t, tam = 30, color = KC.ink, it = false, anchor = 'middle', o = 1 }) {
  return <text x={x} y={y} textAnchor={anchor} opacity={o} style={{ font:`${it ? 'italic ' : ''}700 ${tam}px ${KF.mono}` }} fill={color}>{t}</text>;
}

// Robert: entra como el kit (rebote), pero sale con fundido y un poco de escala: nunca cruza el subtítulo al irse.
const LADOS_F = { 'arriba-der': { left:690, top:300, width:330 }, 'gancho': { left:600, top:230, width:460 }, 'grande': { left:520, top:560, width:580 }, 'izq-alto': { left:-10, top:300, width:330 }, 'presentador-bajo': { left:470, top:1360, width:620 } };
function StickerF({ T, src, at, until, lado = 'arriba-der' }) {
  if (T < at || T > until + 0.4) return null;
  const L = LADOS_F[lado] || LADOS_F['arriba-der'];
  const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.35, kEase.suave);
  const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
  const desdeAbajo = lado !== 'arriba-der' && lado !== 'izq-alto';
  const ty = desdeAbajo ? (1 - i) * 800 : 0, tx = desdeAbajo ? 0 : (1 - i) * (lado === 'izq-alto' ? -420 : 420);
  return <img src={src} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%', opacity:1 - o,
    transform:`translate(${tx}px, ${ty}px) scale(${(1 - w) * (1 - 0.15 * o)}, ${(1 + w) * (1 - 0.15 * o)})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
}
function RobertF({ T, apariciones = [], base = 'assets/stickers/' }) {
  return <><Precarga srcs={[...new Set(apariciones.map((a) => `${base}${a[2]}.png`))]} />{apariciones.map(([at, until, pose, lado], i) =>
    <StickerF key={i} T={T} src={`${base}${pose}.png`} at={at} until={until} lado={lado} />)}</>;
}

/* ---------------- el shot ---------------- */
const SETAS_PICADAS = [[170, 1040], [230, 1050], [300, 1036], [360, 1052], [420, 1040]];
const UNIONES = [[110, 0], [270, 1], [430, 0], [590, 1], [750, 0], [910, 1]];   // [x, arriba(0)/abajo(1)] en la fibra

function TintesShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Pi: CUES.Pigmento, Ex: CUES.Extrae, Mo: CUES.Mordiente, Pu: CUES.Puente, P: CUES.Pregunta, Co: CUES.Colores, R: CUES.Rice, E: CUES.Estudio, V: CUES.Veneno, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la madeja cae y rebota (se mueve desde el cuadro 0)
  const caeY = (() => { const u = kprog(T, K.G, K.G + 0.55); const b = kprog(T, K.G + 0.55, K.G + 0.9); return klerp(560, 900, u * u) - Math.sin(Math.PI * b) * 50; })();
  const aplasta = T > K.G + 0.5 && T < K.G + 0.75 ? 1 - 0.12 * Math.sin(Math.PI * kprog(T, K.G + 0.5, K.G + 0.75)) : 1;
  // extracción
  const corte = (k) => kprog(T, K.Ex + 0.25 + k * 0.32, K.Ex + 0.4 + k * 0.32);
  const alOlla = kprog(T, K.Ex + 1.4, K.Ex + 2.1, kEase.suave);
  const rojoAgua = kprog(T, K.Ex + 2.3, K.Ex + 3.8, kEase.suave);
  // mordiente
  const baja = kprog(T, K.Mo + 0.2, K.Mo + 1.0, kEase.suave);
  const cristales = kprog(T, K.Mo + 1.4, K.Mo + 2.2);
  // puente
  const tintePu = kprog(T, K.Pu + 2.6, K.Pu + 3.8);
  const lavado = kprog(T, K.Pu + 4.0, K.Pu + 5.4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la madeja roja cae; "tinte de fábrica" se tacha; aparece la seta */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={`translate(310 ${caeY}) scale(${2 - aplasta} ${aplasta}) translate(-310 ${-caeY})`}><Madeja T={T} x={310} y={caeY} s={1.12} rot={-6} /></g>
          <SetaSangre T={T} x={830} y={1180} s={1.5} crece={kprog(T, K.G + 2.0, K.G + 2.9)} />
        </>)}
      </Escena>
      {/* 1 · la seta en el bosque de coníferas */}
      <Escena T={T} a={K.H} b={K.Pi} zoom={0.07} origen="50% 70%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[[1010, 0.8], [860, 1.05]].map(([cx, z], i) => <Conifera key={i} T={T} x={cx} y={1000} s={z} seed={i + 2} />)}
          <path d="M 0 990 Q 270 960 540 985 Q 810 1010 1080 975 L 1080 1920 L 0 1920 Z" fill={TX.musgo} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 9); const px = g() * 1080, py = 1010 + g() * 220; return <line key={i} x1={px} y1={py} x2={px + 30 - g() * 60} y2={py + 8 - g() * 16} stroke={TX.agujas} strokeWidth={5} strokeLinecap="round" />; })}
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 40); return <circle key={i} cx={g() * 1080} cy={1000 + g() * 230} r={10 + g() * 14} fill={TX.musgo2} />; })}
          <SetaSangre T={T} x={330} y={1150} s={1.9} rot={-6} crece={kprog(T, K.H + 0.1, K.H + 1.3)} />
          <SetaSangre T={T} x={560} y={1170} s={2.3} rot={3} crece={kprog(T, K.H + 0.4, K.H + 1.6)} />
          <SetaSangre T={T} x={760} y={1140} s={1.5} rot={9} crece={kprog(T, K.H + 0.7, K.H + 1.9)} />
        </>)}
      </Escena>
      {/* 2 · por dentro: las antraquinonas (fondo oscuro) */}
      <Escena T={T} a={K.Pi} b={K.Ex} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(255,90,90,.35)" />
        {fsvg(<>
          {/* las láminas de la seta, de cerca, se desvanecen al entrar a las moléculas */}
          <g opacity={1 - kprog(T, K.Pi + 0.6, K.Pi + 1.3)}>
            {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M ${-60 + i * 76} 1250 Q ${-20 + i * 76} 900 ${10 + i * 76} 420`} stroke={i % 2 ? TX.lamina : '#8a0d16'} strokeWidth={46} fill="none" />)}
          </g>
          <Antraquinona x={540} y={760} s={1.6} oh={false} color="#ff8a8a" p={kprog(T, K.Pi + 0.9, K.Pi + 1.8)} />
          <Antraquinona x={290} y={1010} s={0.95} rot={-8} oh={false} color="#f2c230" p={kprog(T, K.Pi + 3.0, K.Pi + 3.6)} />
          <Antraquinona x={790} y={1010} s={0.95} rot={8} oh={false} color="#e0304a" p={kprog(T, K.Pi + 3.8, K.Pi + 4.4)} />
        </>)}
      </Escena>
      {/* 3 · picas, calientas en agua, el pigmento se suelta */}
      <Escena T={T} a={K.Ex} b={K.Mo} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={90} y={1060} width={420} height={60} rx={14} fill="#c8925a" stroke={KC.ink} strokeWidth={7} />
          {SETAS_PICADAS.map(([px, py], i) => { const c = corte(Math.min(2, Math.floor(i / 2))); const vu = alOlla; const ox = klerp(px, 700 + (i - 2) * 30, vu), oy = klerp(py, 760 - Math.sin(Math.PI * vu) * 260 + vu * 40, vu);
            return vu < 1 ? <g key={i} transform={`translate(${ox} ${oy}) rotate(${vu * 300 + i * 30})`}><path d="M -26 0 Q -26 -30 0 -32 Q 26 -30 26 0 Z" fill={i % 2 ? TX.sangre : TX.sangre2} stroke={KC.ink} strokeWidth={4} /><rect x={-7} y={0} width={14} height={20 * (1 - c * 0.4)} fill={TX.pieRojo} stroke={KC.ink} strokeWidth={3} /></g> : null; })}
          {/* cuchillo */}
          {T < K.Ex + 1.4 && (() => { const k = [0, 1, 2].reduce((a, j) => a + Math.sin(Math.PI * corte(j)), 0); return <g transform={`translate(${230 + kprog(T, K.Ex, K.Ex + 1.2) * 140} ${940 + k * 70})`}>
            <path d="M -10 0 L 150 -20 L 150 40 Q 60 60 -10 40 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={6} /><rect x={150} y={-14} width={110} height={44} rx={12} fill="#5a3418" stroke={KC.ink} strokeWidth={6} /></g>; })()}
          <Olla T={T} x={720} y={1080} s={1.05} agua={mixHex(TX.agua, TX.bano, rojoAgua)} vapor={kprog(T, K.Ex + 0.5, K.Ex + 1.5)} />
          {/* hilos de color que salen de los pedacitos en el agua */}
          {rojoAgua > 0 && rojoAgua < 1 && [0, 1, 2, 3].map((i) => <circle key={i} cx={640 + i * 50} cy={862 + Math.sin(T * 5 + i) * 6} r={14 + rojoAgua * 30} fill={TX.bano} opacity={0.5 * (1 - rojoAgua)} />)}
        </>)}
      </Escena>
      {/* 4 · mordiente: lana blanca + alumbre */}
      <Escena T={T} a={K.Mo} b={K.Pu} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Olla T={T} x={540} y={1140} s={1.2} agua="#dceeff" vapor={1}>
            <g transform={`translate(0 ${klerp(-520, -215, baja)})`}><g transform="scale(0.55)"><Madeja T={T} x={0} y={0} color={TX.crudo} claro="#fffaf0" oscuro={TX.crudo2} /></g></g>
          </Olla>
          {/* cuchara con cristales de alumbre */}
          <g transform={`translate(${klerp(1150, 760, kprog(T, K.Mo + 0.9, K.Mo + 1.4, kEase.sale))} 680) rotate(${-35 * cristales})`}>
            <ellipse cx={0} cy={0} rx={60} ry={30} fill="#d9dee5" stroke={KC.ink} strokeWidth={6} /><rect x={50} y={-10} width={220} height={20} rx={10} fill="#d9dee5" stroke={KC.ink} strokeWidth={6} />
            {cristales < 0.3 && [[-20, -14], [6, -20], [24, -10], [-6, -6]].map(([a, b], i) => <rect key={i} x={a} y={b} width={16} height={16} fill="#fff" stroke="#9bb" strokeWidth={2} transform={`rotate(45 ${a} ${b})`} />)}
          </g>
          {cristales > 0.2 && Array.from({ length: 9 }, (_, i) => { const u = kclamp((cristales - 0.2) * 1.6 - i * 0.05, 0, 1); return u > 0 && u < 1 ? <rect key={i} x={700 - i * 14 - u * 100} y={700 + u * 200} width={16} height={16} fill="#fff" stroke="#9bb" strokeWidth={2} transform={`rotate(45 ${710 - i * 14 - u * 100} ${708 + u * 200})`} /> : null; })}
          {cristales >= 0.9 && [0, 1, 2, 3, 4].map((i) => { const u = kprog(T, K.Mo + 2.1 + i * 0.08, K.Mo + 2.6 + i * 0.08); return u > 0 && u < 1 ? <path key={i} d={`M ${560 + (i - 2) * 50} ${890} l 0 -${30 * u} M ${545 + (i - 2) * 50} ${890 - 15 * u} l 30 0`} stroke="#fff" strokeWidth={5} opacity={1 - u} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · por dentro: el aluminio hace de puente entre la fibra y el pigmento */}
      <Escena T={T} a={K.Pu} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <FibraLana T={T} y={880} alto={200} tinte={tintePu * 0.75} />
          <TxtS x={540} y={895} t="fibra de lana" tam={36} color={KC.ink} o={kprog(T, K.Pu + 0.6, K.Pu + 1.0)} />
          {UNIONES.map(([ux, ab], i) => { const yA = ab ? 1010 : 750; const pA = kprog(T, K.Pu + 0.5 + i * 0.15, K.Pu + 0.9 + i * 0.15);
            const llega = kprog(T, K.Pu + 2.2 + i * 0.12, K.Pu + 2.8 + i * 0.12, kEase.sale); const yP = ab ? klerp(1400, 1105, llega) : klerp(380, 655, llega);
            const xP = ux + (lavado > 0 ? Math.sin(T * 9 + i) * 4 * Math.sin(Math.PI * lavado) : 0);
            return <g key={i}>
              {llega > 0.95 && <line x1={ux} y1={yA} x2={xP} y2={yP} stroke="#cfe8ff" strokeWidth={6} strokeDasharray="10 8" />}
              <line x1={ux} y1={880 + (ab ? 100 : -100)} x2={ux} y2={yA} stroke="#cfe8ff" strokeWidth={6} opacity={pA} />
              <Aluminio x={ux} y={yA} p={pA} brillo={llega > 0.95 ? 1 - kprog(T, K.Pu + 2.9 + i * 0.12, K.Pu + 3.4 + i * 0.12) : 0} />
              {llega > 0 && <Antraquinona x={xP} y={yP} s={0.42} rot={ab ? 0 : 180} color={TX.lana2} p={1} oh={false} />}
            </g>; })}
          {/* chorro de lavado: agua que pasa; el color se queda */}
          {lavado > 0 && lavado < 1 && Array.from({ length: 22 }, (_, i) => { const g = krng(i + 70); const xx = -100 + ((lavado * 1400 + g() * 500) % 1400); const yy = 520 + g() * 820;
            return <ellipse key={i} cx={xx} cy={yy} rx={26} ry={9} fill={KC.cyan} opacity={0.55 * Math.sin(Math.PI * lavado)} />; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si quieres otro color? */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Madeja T={T} x={270} y={1130} s={0.95} color={TX.crudo} claro="#fffaf0" oscuro={TX.crudo2} /><Interrogacion T={T} x={270} y={900} tam={380} /></>)}
      </Escena>
      {/* 7 · otros colores: hierro (más oscuro) y otras setas */}
      <Escena T={T} a={K.Co} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={`translate(0 ${(1 - kprog(T, K.Co, K.Co + 0.4, kEase.sale)) * 60})`}><Madeja T={T} x={170} y={590} s={0.6} /></g>
          <TxtS x={170} y={690} t="alumbre" tam={28} o={kprog(T, K.Co + 0.3, K.Co + 0.6)} />
          {kprog(T, K.Co + 0.5, K.Co + 0.9) > 0 && <g transform={`translate(0 ${(1 - kprog(T, K.Co + 0.5, K.Co + 0.9, kEase.sale)) * 60})`}><Madeja T={T} x={460} y={590} s={0.6} color={TX.hierro} claro={TX.hierro2} oscuro="#3e161a" /></g>}
          <TxtS x={460} y={690} t="hierro" tam={28} o={kprog(T, K.Co + 0.8, K.Co + 1.1)} />
          {/* Phaeolus schweinitzii → amarillo limón */}
          <Phaeolus x={160} y={1010} s={0.8} p={kprog(T, K.Co + 2.3, K.Co + 2.8)} />
          <Madeja T={T} x={330} y={1000} s={0.42} color={TX.limon} claro={TX.limon2} oscuro="#b8a520" op={kprog(T, K.Co + 2.5, K.Co + 2.9)} />
          <TxtS x={250} y={1110} t="amarillo limón · alumbre" tam={26} o={kprog(T, K.Co + 2.6, K.Co + 2.9)} />
          <TxtS x={770} y={1110} t="verde · hierro" tam={26} o={kprog(T, K.Co + 3.2, K.Co + 3.5)} />
          {/* Tapinella atrotomentosa → verde oscuro (con hierro) */}
          {kprog(T, K.Co + 2.9, K.Co + 3.3) > 0 && <Seta x={650} y={1060} s={1.0} crece={kprog(T, K.Co + 2.9, K.Co + 3.5)} sombrero={TX.tapinella} pie={TX.tapinellaPie} escamas={false} anillo={false} laminas="#e8d29a" alto={120} ancho={180} />}
          <Madeja T={T} x={880} y={1000} s={0.42} color={TX.verde} claro={TX.verde2} oscuro="#1c3a24" op={kprog(T, K.Co + 3.1, K.Co + 3.5)} />
        </>)}
      </Escena>
      {/* 8 · Miriam Rice, California */}
      <Escena T={T} a={K.R} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.R + 3.2, K.R + 3.6)}>
            <MapaCalifornia x={60} y={420} s={0.85} />
            <circle cx={60 + 40 * 0.85} cy={420 + 230 * 0.85} r={16 + 3 * Math.sin(T * 5)} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>
          {[TX.lana, TX.limon, TX.verde, TX.morado, '#e07a2a', TX.hierro, '#d9a0b8', '#3a6aa0'].map((c, i) => <FrascoMuestra key={i} x={110 + i * 122} y={1150} color={c} p={kprog(T, K.R + 0.9 + i * 0.28, K.R + 1.2 + i * 0.28)} />)}
        </>)}
      </Escena>
      {/* 9 · el estudio de 2001: emodina y dermocibina puras sobre lana */}
      <Escena T={T} a={K.E} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.E + 2.0, K.E + 2.4)} transform="translate(0 -50)">
            <Tubo x={150} y={990} color={KC.orange} s={0.7} />
            <Tubo x={150} y={1170} color="#c0306a" s={0.7} />
            <Mechon x={420} y={890} color={TX.amarillo} p={kprog(T, K.E + 2.6, K.E + 3.0)} s={0.9} />
            <Mechon x={620} y={890} color={TX.rojo} p={kprog(T, K.E + 3.1, K.E + 3.5)} s={0.9} />
            <Mechon x={420} y={1110} color={TX.morado} p={kprog(T, K.E + 4.2, K.E + 4.6)} s={0.9} />
            <Mechon x={620} y={1110} color={TX.violeta} p={kprog(T, K.E + 4.5, K.E + 4.9)} s={0.9} />
          </g>
        </>)}
      </Escena>
      {/* 10 · veneno: Cortinarius orellanus y C. rubellus dañan los riñones */}
      <Escena T={T} a={K.V} b={K.C} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 30% 50%, #3a1414 0%, #140808 75%)' }}></div>
        {fsvg(<>
          <SetaSangre T={T} x={150} y={900} s={1.0} crece={kprog(T, K.V + 0.4, K.V + 1.2)} sombrero={TX.orellanus} lamina="#c0742e" pie="#d9a060" />
          <SetaSangre T={T} x={360} y={905} s={1.05} rot={6} crece={kprog(T, K.V + 0.9, K.V + 1.7)} sombrero={TX.rubellus} lamina="#a35a2a" pie="#c98a50" ancho={120} alto={190} />
          <Sello T={T} at={K.V + 2.1} x={260} y={790} texto="NO" color={KC.red} r={95} rot={-10} />
          <Rinon x={250} y={1010} s={0.55} apaga={kprog(T, K.V + 3.4, K.V + 4.6)} />
        </>)}
      </Escena>
      {/* 11 · cierre: la misma madeja del inicio, ya tejida, y la seta: para teñir, no para comer */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bufanda x={70} y={1000} rot={-6} p={kprog(T, K.C + 0.3, K.C + 1.5, kEase.suave)} />
          <Madeja T={T} x={360} y={800} s={1.0} rot={-6} />
          <SetaSangre T={T} x={870} y={1080} s={1.2} />
        </>)}
      </Escena>

      {/* textos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.35} tacharEn={K.G + 1.5} until={K.H - 0.3} texto="tinte de fábrica" x={330} y={560} tam={46} />
      <Etq T={T} at={K.G + 2.3} until={K.H - 0.2} x={830} y={1215} texto="un hongo" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.H + 1.0} until={K.Pi - 0.3} x={40} y={470} texto="seta color sangre" tam={34} />
      <Etq T={T} at={K.H + 1.6} until={K.Pi - 0.3} x={40} y={525} texto="Cortinarius sanguineus" it tam={34} />
      <Etq T={T} at={K.H + 2.4} until={K.Pi - 0.3} x={40} y={580} texto="bosques de coníferas" tam={28} />
      <Chip T={T} at={K.Pi + 0.4} until={K.Ex - 0.3} texto="POR DENTRO · EL PIGMENTO" x={540} y={470} tam={34} borde={KC.red} mono />
      <Etq T={T} at={K.Pi + 1.6} until={K.Ex - 0.3} x={60} y={590} texto="antraquinona" tam={36} color={'#ff9a9a'} />
      <Etq T={T} at={K.Pi + 3.2} until={K.Ex - 0.3} x={40} y={1180} texto="emodina · amarilla" tam={30} color="#f2c230" />
      <Etq T={T} at={K.Pi + 4.0} until={K.Ex - 0.3} x={1040} y={1180} lado="izq" texto="dermocibina · roja" tam={30} color={'#ff6a7a'} />
      <Chip T={T} at={K.Ex + 2.0} until={K.Mo - 0.3} texto="agua caliente" x={300} y={520} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ex + 3.0} until={K.Mo - 0.3} texto="el pigmento se suelta" x={340} y={610} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Mo + 1.6} until={K.Pu - 0.3} texto="alumbre · sal de aluminio" x={540} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Mo + 2.3} until={K.Pu - 0.3} texto="= mordiente" x={540} y={560} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Pu + 0.2} until={K.P - 0.3} texto="POR DENTRO · LA FIBRA" x={350} y={470} tam={32} borde={KC.cyan} mono />
      
      <Etq T={T} at={K.Pu + 1.1} until={K.P - 0.3} x={40} y={545} texto="Al = aluminio (el puente)" tam={30} color={'#cfe8ff'} />
      <Chip T={T} at={K.Pu + 2.9} until={K.Pu + 4.4} texto="pigmento atrapado" x={540} y={1200} tam={32} borde={TX.lana2} />
      <Chip T={T} at={K.Pu + 4.6} until={K.P - 0.3} texto="el color aguanta mejor" x={540} y={1200} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.Co + 2.4} until={K.R - 0.3} x={20} y={800} texto="Phaeolus schweinitzii" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Co + 3.0} until={K.R - 0.3} x={1060} y={800} lado="izq" texto="Tapinella atrotomentosa" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.R + 0.3} until={K.R + 3.3} x={480} y={800} texto="Mendocino, California" tam={34} color={KC.ink} />
      <Etq T={T} at={K.R + 1.0} until={K.R + 3.3} x={480} y={870} texto="hongo tras hongo" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.R + 3.4} until={K.E - 0.3} anio="1974" quien="Miriam C. Rice · California" revista="libro: Let's Try Mushrooms for Color" x={400} y={860} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 1.9} anio="2001" quien="Räisänen, Nousiainen y Hynninen" revista="Finlandia · Textile Research Journal, 2001" x={540} y={760} />
      <Etq T={T} at={K.E + 2.3} until={K.V - 0.3} x={20} y={762} texto="emodina pura" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 4.0} until={K.V - 0.3} x={20} y={962} texto="dermocibina pura" tam={30} color={KC.ink} />
      <Etq T={T} at={K.V + 0.6} until={K.C - 0.3} x={40} y={470} texto="Cortinarius orellanus" it tam={34} color={TX.orellanus2} />
      <Etq T={T} at={K.V + 1.1} until={K.C - 0.3} x={40} y={525} texto="Cortinarius rubellus" it tam={34} color={TX.orellanus2} />
      <Chip T={T} at={K.V + 2.3} until={K.C - 0.3} texto="NO SE COMEN" x={260} y={600} tam={40} borde={KC.red} />
      <Chip T={T} at={K.V + 4.4} until={K.C - 0.3} texto="síntomas: días después" x={265} y={1130} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="para teñir, no para comer" x={400} y={480} tam={38} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.Pi} texto="2 cm" largo={60} />
      <BarraEscala T={T} at={K.Pi} until={K.Ex} texto="1 nm · esquemático" largo={160} />
      <BarraEscala T={T} at={K.Ex} until={K.Mo} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.Mo} until={K.Pu} texto="10 cm" largo={180} color={KC.ink} />
      <BarraEscala T={T} at={K.Pu} until={K.P} texto="20 µm" largo={140} />
      <BarraEscala T={T} at={K.Co} until={K.R} texto="10 cm" largo={100} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.R + 3.4} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.V} until={K.C} texto="2 cm" largo={50} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={130} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloIt T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No la tiñó una fábrica: *la tiñó un hongo.*" />
      <SubtituloIt T={T} idx={1} at={K.H + 0.1} until={K.Pi - 0.1} texto="_Cortinarius sanguineus:_ *color sangre.*" />
      <SubtituloIt T={T} idx={2} at={K.Pi + 0.1} until={K.Ex - 0.1} texto="Su color: *antraquinonas.*" />
      <SubtituloIt T={T} idx={3} at={K.Ex + 0.1} until={K.Mo - 0.1} texto="En agua caliente, *el agua se tiñe.*" />
      <SubtituloIt T={T} idx={4} at={K.Mo + 0.1} until={K.Pu - 0.1} texto="Antes: lana con *alumbre, un mordiente.*" />
      <SubtituloIt T={T} idx={5} at={K.Pu + 0.1} until={K.P - 0.1} texto="El aluminio hace de *puente.*" />
      <SubtituloIt T={T} idx={6} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Y si quieres *otro color?*" />
      <SubtituloIt T={T} idx={7} at={K.Co + 0.1} until={K.R - 0.1} texto="Hierro: *más oscuro.* Otras setas: amarillo o verde." />
      <SubtituloIt T={T} idx={8} at={K.R + 0.1} until={K.E - 0.1} texto="Miriam Rice, California: *libro de 1974.*" />
      <SubtituloIt T={T} idx={9} at={K.E + 0.1} until={K.V - 0.1} texto="Emodina: amarillos y rojos. Dermocibina: *morados.*" />
      <SubtituloIt T={T} idx={10} at={K.V + 0.1} until={K.C - 0.1} texto="_C. orellanus_ y _C. rubellus:_ *dañan los riñones.*" />
      <SubtituloIt T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Para teñir, *nunca para comer.*" />

      <RobertF T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.4, K.Pi - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ex + 1.2, K.Mo - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pu + 1.0, K.P - 0.25, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Co - 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Co + 1.2, K.R - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.R + 0.8, K.R + 6.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.E + 2.0, K.V - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.V + 0.6, K.C - 0.25, 'avatar_10_serio_molesto', 'grande'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="148" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TintesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TintesShot /></CompositionStage></div>;
}
window.TintesApp = TintesApp;
