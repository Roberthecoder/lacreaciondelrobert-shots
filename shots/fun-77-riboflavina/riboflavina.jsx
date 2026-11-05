// Shot Fungi Mati #77 · Ese amarillo de tu pipí no es colorante: es vitamina que hizo un hongo — NARRADO
// (gancho 1 "Esto no es X: es Y" · formato N1 Por dentro + toque N5 con el experimento de 2001).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const RB = { pipi:'#ffd21a', pipi2:'#ffe866', brilla:'#d8ff3a', uv:'#8a3cff', uv2:'#c39bff', pastilla:'#ff8a1f', vaso:'rgba(255,255,255,.55)',
  algodon:'#fffdf6', capsula:'#7a5634', hoja:'#2f9e44', hoja2:'#46c25a', mancha:'#8a7a66', chinche:'#5d6b2e', chinche2:'#7d8c3f',
  hifa:'#f3e9cf', hifaB:'#d9c9a0', nucleo:'#6c8cff', acero:'#b9c3cc', acero2:'#8d98a3', gris:'#9a9a9a' };

// --- subtítulo con cursivas: palabras entre _guiones bajos_ van en itálica (nombres científicos); *asteriscos* = resaltado.
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 60 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, ita = it;
    if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: ita ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:45, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Vasito de muestra (plástico transparente) con líquido amarillo que hace olas. Base en (x, y). uv 0..1 = brillo bajo luz UV.
function Vasito({ T, x, y, s = 1, nivel = 0.62, uv = 0, ola = 1 }) {
  const W = 260, H = 340, top = -H, lv = -H * nivel;
  const onda = (k) => Array.from({ length: 13 }, (_, i) => { const u = i / 12, xx = -W / 2 + 10 + u * (W - 20); return `${i ? 'L' : 'M'} ${xx.toFixed(1)} ${(lv + Math.sin(u * 7 + T * 5 + k) * 9 * ola).toFixed(1)}`; }).join(' ');
  const liq = mixHex(RB.pipi, RB.brilla, uv);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-W / 2} ${top} L ${-W / 2 + 18} -6 Q ${-W / 2 + 22} 0 ${-W / 2 + 34} 0 L ${W / 2 - 34} 0 Q ${W / 2 - 22} 0 ${W / 2 - 18} -6 L ${W / 2} ${top} Z`} fill={RB.vaso} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`${onda(0)} L ${W / 2 - 24} -8 L ${-W / 2 + 24} -8 Z`} fill={liq} stroke={KC.ink} strokeWidth={4} opacity=".95"
      style={uv ? { filter:`drop-shadow(0 0 ${30 * uv}px ${RB.brilla})` } : null} />
    <path d={onda(1.3)} stroke="#fff" strokeWidth={5} fill="none" opacity=".5" />
    <rect x={-W / 2 + 26} y={top + 30} width={22} height={H - 70} rx={11} fill="#fff" opacity=".45" />
    {[0.25, 0.5, 0.75].map((k, i) => <line key={i} x1={W / 2 - 60} y1={-H * k} x2={W / 2 - 22} y2={-H * k} stroke={KC.ink} strokeWidth={4} opacity=".55" />)}
    <rect x={-W / 2 - 14} y={top - 26} width={W + 28} height={34} rx={10} fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Pastilla de complejo B (genérica, sin marca).
function Pastilla({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-62} y={-26} width={124} height={52} rx={26} fill={RB.pastilla} stroke={KC.ink} strokeWidth={6} />
    <rect x={-46} y={-16} width={50} height={10} rx={5} fill="#fff" opacity=".45" />
    <line x1={0} y1={-22} x2={0} y2={22} stroke={KC.ink} strokeWidth={4} opacity=".5" />
  </g>;
}
// Riboflavina esquemática: tres anillos fusionados (isoaloxazina) + cadena de ribitol con OH. brillo 0..1 = fluorescencia.
function Riboflavina({ x, y, s = 1, p = 1, brillo = 0, T = 0 }) {
  const r = 70, dx = r * Math.sqrt(3);
  const hexa = (cx) => Array.from({ length: 6 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const col = mixHex(KC.yellow, RB.brilla, brillo);
  const zz = [[0, r], [0, r + 60], [44, r + 100], [0, r + 140], [44, r + 180], [0, r + 220]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${8 + 26 * brillo}px ${RB.brilla})` } : null}>
    {[-dx, 0, dx].map((cx, i) => <path key={i} d={hexa(cx)} fill={`rgba(255,225,26,${0.12 + 0.2 * brillo})`} stroke={col} strokeWidth={10} strokeLinejoin="round" opacity={kclamp(p * 3 - i, 0, 1)} />)}
    {p > 0.6 && <g opacity={kclamp(p * 2.5 - 1.5, 0, 1)}>
      {/* metilos del anillo izquierdo */}
      <line x1={-dx - r * 0.87} y1={-r / 2} x2={-dx - r * 1.5} y2={-r} stroke={col} strokeWidth={8} />
      <line x1={-dx - r * 0.87} y1={r / 2} x2={-dx - r * 1.5} y2={r} stroke={col} strokeWidth={8} />
      {/* oxígenos del anillo derecho */}
      <line x1={dx} y1={-r} x2={dx} y2={-r - 46} stroke={col} strokeWidth={8} /><text x={dx} y={-r - 56} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.red}>O</text>
      <line x1={dx + r * 0.87} y1={r / 2} x2={dx + r * 1.4} y2={r * 0.9} stroke={col} strokeWidth={8} /><text x={dx + r * 1.6} y={r * 1.15} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.red}>O</text>
      {[[-dx / 2, -r / 2 - 4], [dx / 2, r / 2 + 30], [dx + r * 0.87 + 22, -r / 2], [dx / 2, -r / 2 - 4]].map(([a, b], i) =>
        <text key={i} x={a} y={b} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan}>N</text>)}
      {/* cadena de ribitol (azúcar) que cuelga del anillo de en medio */}
      <path d={'M ' + zz.map((q) => q.join(' ')).join(' L ')} stroke={col} strokeWidth={8} fill="none" strokeLinejoin="round" />
      {zz.slice(1, 5).map(([a, b], i) => <g key={i}><line x1={a} y1={b} x2={a + (i % 2 ? 44 : -44)} y2={b} stroke={col} strokeWidth={6} />
        <text x={a + (i % 2 ? 80 : -82)} y={b + 11} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.red}>OH</text></g>)}
    </g>}
  </g>;
}
// Lámpara de luz ultravioleta (tubo violeta) con cono de luz hacia abajo. on 0..1.
function LamparaUV({ x, y, w = 360, on = 0, alto = 520, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {on > 0 && <path d={`M ${-w / 2 + 20} 30 L ${w / 2 - 20} 30 L ${w / 2 + 120} ${alto} L ${-w / 2 - 120} ${alto} Z`} fill={RB.uv} opacity={0.22 * on * (0.9 + 0.1 * Math.sin(T * 30))} />}
    <rect x={-w / 2} y={-34} width={w} height={60} rx={18} fill="#2b2b35" stroke={KC.ink} strokeWidth={6} />
    <rect x={-w / 2 + 18} y={12} width={w - 36} height={26} rx={13} fill={mixHex('#5a4a7a', RB.uv2, on)} stroke={KC.ink} strokeWidth={4}
      style={on ? { filter:`drop-shadow(0 0 ${22 * on}px ${RB.uv})` } : null} />
    <text x={0} y={2} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#e9e0ff">UV</text>
  </g>;
}
// Silueta esquemática del cuerpo (de frente) con intestino, riñones y vejiga.
function Cuerpo({ x, y, T, p1 = 0, p2 = 0, p3 = 0 }) {
  const gotas = (a, b, n, prog, seed) => Array.from({ length: n }, (_, i) => { const u = kclamp(prog * 1.4 - i * 0.08, 0, 1); if (u <= 0 || u >= 1) return null;
    const [ax, ay] = a(i), [bx, by] = b(i); return <circle key={seed + i} cx={klerp(ax, bx, u)} cy={klerp(ay, by, u)} r={11} fill={RB.pipi} stroke={KC.ink} strokeWidth={3} />; });
  const vej = kclamp(p3 * 1.2, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={0} cy={-470} r={92} fill="#ffd9c7" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -350 Q -170 -360 -190 -320 L -230 40 Q -232 70 -200 70 L -170 70 L -150 -150 L -140 330 L -40 330 L 0 20 L 40 330 L 140 330 L 150 -150 L 170 70 L 200 70 Q 232 70 230 40 L 190 -320 Q 170 -360 150 -350 Z" fill="#ffd9c7" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* intestino (tubo enrollado) */}
    <path d="M -70 -40 Q -90 -90 -40 -90 L 50 -90 Q 90 -90 80 -50 Q 70 -10 20 -20 Q -30 -30 -40 0 Q -50 30 0 30 L 60 30" stroke="#e89a8a" strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M -70 -40 Q -90 -90 -40 -90 L 50 -90 Q 90 -90 80 -50 Q 70 -10 20 -20 Q -30 -30 -40 0 Q -50 30 0 30 L 60 30" stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="2 18" />
    {/* riñones */}
    {[-1, 1].map((k) => <path key={k} transform={`translate(${k * 78} -190) scale(${k} 1)`} d="M 0 -48 Q 40 -50 42 0 Q 40 50 0 48 Q -14 44 -10 20 Q -2 0 -10 -20 Q -14 -44 0 -48 Z" fill="#c4473a" stroke={KC.ink} strokeWidth={6} />)}
    {[-1, 1].map((k) => <path key={'u' + k} d={`M ${k * 70} -150 Q ${k * 50} -40 ${k * 26} 92`} stroke="#c4473a" strokeWidth={8} fill="none" />)}
    {/* vejiga */}
    <ellipse cx={0} cy={118} rx={54} ry={42} fill="#ffe9e4" stroke={KC.ink} strokeWidth={6} />
    {vej > 0 && <path d={`M -48 ${130 - 30 * vej} Q 0 ${120 - 30 * vej} 48 ${130 - 30 * vej} Q 48 156 0 158 Q -48 156 -48 ${130 - 30 * vej} Z`} fill={RB.pipi} opacity=".95" />}
    <ellipse cx={0} cy={118} rx={54} ry={42} fill="none" stroke={KC.ink} strokeWidth={6} />
    {gotas(() => [0, -420], () => [-60, -40], 1, p1, 'p')}
    {p1 > 0.7 && p2 < 1 && gotas((i) => [-40 + i * 25, -60 + (i % 2) * 40], (i) => [i % 2 ? 78 : -78, -190], 6, p2, 'a')}
    {gotas((i) => [i % 2 ? 78 : -78, -180], () => [0, 110], 6, p3, 'b')}
  </g>;
}
// Reloj de 24 h que se llena.
function Reloj24({ x, y, r = 100, p = 0 }) {
  const a = -Math.PI / 2 + p * Math.PI * 2, big = p > 0.5 ? 1 : 0;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {p > 0.001 && <path d={`M 0 0 L 0 ${-r + 10} A ${r - 10} ${r - 10} 0 ${big} 1 ${((r - 10) * Math.cos(a)).toFixed(1)} ${((r - 10) * Math.sin(a)).toFixed(1)} Z`} fill={RB.pipi} opacity={p >= 0.999 ? 1 : 0.9} />}
    <line x1={0} y1={0} x2={(r - 26) * Math.cos(a)} y2={(r - 26) * Math.sin(a)} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <circle r={9} fill={KC.ink} />
    <text x={0} y={r + 50} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>24 h</text>
  </g>;
}
// Tarjeta con un microbio (bastón o red de hifas) y su nombre.
function TarjetaMicrobio({ T, x, y, w = 420, h = 360, p = 1, tipo, comun, cientifico }) {
  if (p <= 0) return null;
  const s = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s}) translate(${-w / 2} ${-h / 2})`}>
    <rect width={w} height={h} rx={28} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
    {tipo === 'bacteria' && <g>{[[150, 120, -20], [270, 150, 25], [200, 210, 5]].map(([a, b, rr], i) => <Bacteria key={i} T={T} x={a} y={b} rot={rr} s={1.15} color={KC.mint} seed={i} />)}</g>}
    {tipo === 'hongo' && <g><RedHifas T={T} x={w / 2} y={170} g={kclamp(p * 1.3, 0, 1)} seed={7} n={70} escala={0.55} color={RB.hifa} ancho={6} circ />
      <circle cx={w / 2} cy={170} r={10} fill={KC.yellow} /></g>}
    <text x={w / 2} y={h - 72} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.texto}>{comun}</text>
    <text x={w / 2} y={h - 28} textAnchor="middle" style={{ font:`italic 700 32px ${KF.mono}` }} fill={KC.gold2}>{cientifico}</text>
  </g>;
}
// Planta de algodón con una cápsula abierta (fibra blanca en 4 lóbulos). mancha 0..1 = fibra manchada (café grisáceo).
function Algodon({ T, x, y, s = 1, mancha = 0 }) {
  const hoja = (hx, hy, rot, k = 1) => <path transform={`translate(${hx} ${hy}) rotate(${rot + mece(T, hx, 0.3) * 4}) scale(${k})`}
    d="M 0 0 Q -30 -40 -80 -40 Q -110 -80 -70 -110 Q -40 -150 0 -120 Q 40 -150 70 -110 Q 110 -80 80 -40 Q 30 -40 0 0 Z" fill={RB.hoja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 Q -10 -250 0 -520" stroke="#6b4a2a" strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d="M 0 0 Q -10 -250 0 -520" stroke={KC.ink} strokeWidth={4} fill="none" opacity=".4" />
    <path d="M -4 -260 Q -90 -300 -150 -280" stroke="#6b4a2a" strokeWidth={10} fill="none" />
    <path d="M -2 -150 Q 90 -190 150 -170" stroke="#6b4a2a" strokeWidth={10} fill="none" />
    {hoja(-150, -280, -70, 0.9)}{hoja(150, -170, 70, 0.95)}{hoja(-6, -380, -20, 0.6)}
    {/* cápsula abierta: carpelos secos (café) detrás y 4 lóbulos de fibra */}
    <g transform="translate(0 -560)">
      {[-60, 0, 60, 120].map((a, i) => <path key={i} transform={`rotate(${a - 30})`} d="M 0 0 L -36 -120 Q 0 -150 36 -120 Z" fill={RB.capsula} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
      {[[-46, -30], [46, -30], [-34, 34], [34, 34]].map(([a, b], i) => <g key={i}>
        {[[0, 0, 46], [-22, -18, 30], [22, -16, 30], [0, 22, 32]].map(([c, d, r], j) => <circle key={j} cx={a + c} cy={b + d} r={r} fill={i === 1 ? mixHex(RB.algodon, RB.mancha, mancha) : RB.algodon} stroke={KC.ink} strokeWidth={5} />)}
        {i === 1 && mancha > 0 && [[-8, 4, 18], [14, -10, 12], [6, 20, 10]].map(([c, d, r], j) => <circle key={'m' + j} cx={a + c} cy={b + d} r={r * mancha} fill="#6e6150" opacity=".8" />)}
      </g>)}
      <path d="M -16 70 Q 0 90 16 70" stroke="#6b4a2a" strokeWidth={10} fill="none" />
    </g>
  </g>;
}
// Chinche de campo (cuerpo de escudo, 6 patas, antenas y pico largo que pica). pica 0..1 = el pico entra.
function Chinche({ T, x, y, rot = 0, s = 1, camina = 0, pica = 0 }) {
  const pata = (k, lado) => { const ph = Math.sin(T * 14 + k * 2.1) * 10 * camina; return <path key={k + lado}
    d={`M ${lado * 22} ${-20 + k * 26} q ${lado * 34} ${-6 + ph} ${lado * 50} ${18 + ph} l ${lado * 10} 22`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2].map((k) => pata(k, -1))}{[0, 1, 2].map((k) => pata(k, 1))}
    <path d={`M 0 -86 L 0 ${-86 - 70 - 30 * pica}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" transform="rotate(8)" />
    <path d="M -10 -76 Q -40 -120 -64 -128 M 10 -76 Q 40 -120 64 -128" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -46 -40 L -40 -64 L -16 -80 L 16 -80 L 40 -64 L 46 -40 L 40 40 Q 0 90 -40 40 Z" fill={RB.chinche} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -40 -40 L 40 -40 L 0 30 Z" fill={RB.chinche2} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={0} cy={-84} rx={14} ry={12} fill={RB.chinche} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Levadura del pan: célula ovalada con yema.
function LevaduraCel({ x, y, s = 1, rot = 0, yema = 0.5 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={20} ry={25} fill="#e9d9a8" stroke={KC.ink} strokeWidth={3} />
    {yema > 0 && <circle cx={0} cy={-25 - 8 * yema} r={9 + 5 * yema} fill="#f3e6c0" stroke={KC.ink} strokeWidth={3} />}
    <circle cx={-4} cy={4} r={6} fill={RB.nucleo} opacity=".7" />
  </g>;
}
// Hifas de Ashbya que crecen y cuyas PUNTAS SE PARTEN EN DOS (ramificación en Y, típica del género Eremothecium).
const ASHBYA = (() => { const segs = []; const go = (x, y, a, d, b) => { const L = d === 0 ? 210 : 150 - d * 14; const x2 = x + Math.cos(a) * L, y2 = y + Math.sin(a) * L;
  segs.push({ x1:x, y1:y, x2, y2, b, e:b + 1, d }); if (d < 4) { go(x2, y2, a - 0.42, d + 1, b + 1); go(x2, y2, a + 0.42, d + 1, b + 1); } };
  go(0, 0, 0, 0, 0); go(0, 0, Math.PI, 0, 0); return segs; })();
function HifasY({ T, x, y, g = 1, s = 1, color = RB.hifa, ancho = 22, rot = 0 }) {
  const G = g * 5; // 5 niveles de crecimiento
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[KC.ink, color].map((c, k) => ASHBYA.map((sg, i) => { if (G < sg.b) return null; const u = kclamp(G - sg.b, 0, 1);
      return <line key={k + '-' + i} x1={sg.x1} y1={sg.y1} x2={klerp(sg.x1, sg.x2, u)} y2={klerp(sg.y1, sg.y2, u)} stroke={c} strokeWidth={(ancho - sg.d * 2) + (k ? 0 : 8)} strokeLinecap="round" />; }))}
    {ASHBYA.map((sg, i) => { const u = kclamp(G - sg.b, 0, 1); if (u < 0.6) return null; const mx = klerp(sg.x1, sg.x2, 0.55), my = klerp(sg.y1, sg.y2, 0.55);
      return <circle key={'n' + i} cx={mx} cy={my} r={5} fill={RB.nucleo} />; })}
    <ellipse cx={0} cy={0} rx={22} ry={12} fill="#e9d9a8" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Hifa en corte largo (de cerca): tubo con tabiques, varios núcleos y vacuolas que se llenan de riboflavina. lleno 0..1.
function HifaTubo({ T, x, y, w = 960, h = 150, crece = 1, lleno = 0, amarillo = 0 }) {
  const L = w * crece, vac = [[90, 0.0], [230, 0.15], [350, 0.3], [520, 0.1], [640, 0.4], [790, 0.25], [880, 0.5]];
  const pared = mixHex(RB.hifa, '#fff0a0', amarillo);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-h / 2} width={L} height={h} rx={h / 2} fill={mixHex('#2c3448', '#4a4426', amarillo)} stroke={pared} strokeWidth={10} />
    {[300, 600].map((sx) => sx < L - 40 ? <line key={sx} x1={sx} y1={-h / 2 + 6} x2={sx} y2={h / 2 - 6} stroke={pared} strokeWidth={8} /> : null)}
    {[[150, -30], [440, 26], [700, -24], [860, 30]].map(([nx, ny], i) => nx < L - 30 ? <ellipse key={i} cx={nx} cy={ny} rx={22} ry={16} fill={RB.nucleo} stroke={KC.ink} strokeWidth={3} /> : null)}
    {vac.map(([vx, t0], i) => { const u = kclamp((lleno - t0) * 2.2, 0, 1); if (vx > L - 40 || u <= 0) return null; const r = 20 + 22 * u;
      return <circle key={'v' + i} cx={vx} cy={(i % 2 ? 1 : -1) * 22} r={r} fill={RB.pipi} stroke={KC.ink} strokeWidth={3} opacity={0.4 + 0.6 * u} style={{ filter:`drop-shadow(0 0 ${10 * u}px ${KC.yellow})` }} />; })}
  </g>;
}
// Espora de Ashbya: aguja delgada y un poco curva, con filamento en la punta. largo en px.
function Espora({ x, y, rot = 0, largo = 300, s = 1, T = 0, seed = 0 }) {
  const c = 18;
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.4) * 3}) scale(${s})`}>
    <path d={`M 0 0 Q ${largo / 2} ${-c} ${largo} 0`} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q ${largo / 2} ${-c} ${largo} 0`} stroke={RB.hifa} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d={`M ${largo} 0 q 30 10 50 -6 t 46 4`} stroke={RB.hifaB} strokeWidth={3} fill="none" />
  </g>;
}
// Biorreactor de acero con ventana: caldo amarillo, gotitas de aceite y agitador.
function Tanque({ T, x, y, p = 1, color = 0 }) {
  const liq = mixHex('#e8dcb0', RB.pipi, color);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-190} y={-520} width={380} height={620} rx={60} fill={RB.acero} stroke={KC.ink} strokeWidth={9} />
    <rect x={-160} y={-500} width={40} height={580} rx={20} fill="#fff" opacity=".35" />
    <rect x={-110} y={-400} width={220} height={400} rx={30} fill="#1b2230" stroke={KC.ink} strokeWidth={8} />
    <clipPath id="rbVen"><rect x={-104} y={-394} width={208} height={388} rx={26} /></clipPath>
    <g clipPath="url(#rbVen)">
      <rect x={-110} y={-394 + 388 * (1 - p)} width={220} height={400} fill={liq} />
      {p > 0.3 && Array.from({ length: 9 }, (_, i) => { const yy = -20 - ((T * 60 + i * 47) % 360); return <circle key={i} cx={-80 + (i * 37) % 160} cy={yy} r={8 + (i % 3) * 4} fill="#fff6c8" stroke={KC.ink} strokeWidth={2} opacity=".85" />; })}
      <g transform={`translate(0 -150) scale(${Math.cos(T * 6)} 1)`}><rect x={-80} y={-8} width={160} height={16} rx={8} fill={RB.acero2} stroke={KC.ink} strokeWidth={4} /></g>
      <rect x={-6} y={-394} width={12} height={250} fill={RB.acero2} />
    </g>
    <rect x={-120} y={-580} width={240} height={70} rx={20} fill={RB.acero2} stroke={KC.ink} strokeWidth={8} />
    <rect x={-40} y={-640} width={80} height={70} rx={14} fill="#5d6773" stroke={KC.ink} strokeWidth={7} />
    {[-150, 150].map((lx) => <rect key={lx} x={lx - 18} y={90} width={36} height={80} fill={RB.acero2} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Fábrica química (esquema): edificio con chimenea y un matraz. apagada 0..1 = se pone gris y recibe una X.
function Fabrica({ T, x, y, s = 1, apagada = 0 }) {
  const c = mixHex('#ff6b5a', RB.gris, apagada);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {apagada < 1 && [0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <circle key={k} cx={70 + u * 30} cy={-210 - u * 120} r={20 + u * 26} fill="#d8d8d8" opacity={(1 - u) * (1 - apagada)} />; })}
    <rect x={50} y={-210} width={44} height={110} fill={c} stroke={KC.ink} strokeWidth={6} />
    <path d="M -120 0 L -120 -110 L -60 -150 L -60 -110 L 0 -150 L 0 -110 L 120 -110 L 120 0 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -30 -10 L -30 -50 L -50 -80 L 10 -80 L -10 -50 L -10 -10" transform="translate(10 0)" fill="#b8f6ff" stroke={KC.ink} strokeWidth={5} />
    {apagada > 0 && <path d="M -110 -160 L 110 20 M 110 -160 L -110 20" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={apagada} />}
  </g>;
}
// Hebra de ADN horizontal (esquemática) con un hueco donde entra el paquete de genes. abre 0..1.
function ADNHueco({ T, x, y, w = 980, amp = 50, abre = 0 }) {
  const N = 70, gap = 330 * abre, cx = x + w / 2;
  const pts = (f) => Array.from({ length: N + 1 }, (_, i) => { const u = i / N; let px = x + u * w; if (px < cx) px -= gap / 2; else px += gap / 2; return [px, y + Math.sin(u * Math.PI * 7 - T * 2 + f) * amp]; });
  const a = pts(0), b = pts(Math.PI), BASES = [KC.yellow, KC.pink, KC.cyan, KC.mint];
  const seg = (q, lo, hi) => 'M ' + q.slice(lo, hi).map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  const mid = N / 2;
  return <g>
    {a.map((q, i) => i % 3 === 0 ? <line key={i} x1={q[0]} y1={q[1]} x2={b[i][0]} y2={b[i][1]} stroke={BASES[(i / 3) % 4]} strokeWidth={7} /> : null)}
    {[[0, mid + 1], [mid + 1, N + 1]].map(([lo, hi], k) => <g key={k}><path d={seg(a, lo, hi)} stroke={KC.lilac} strokeWidth={10} fill="none" /><path d={seg(b, lo, hi)} stroke={KC.lilac} strokeWidth={10} fill="none" opacity=".8" /></g>)}
  </g>;
}
// Paquete de 6 genes (cajitas) de la vía de la riboflavina.
function PaqueteGenes({ x, y, s = 1, brillo = 0 }) {
  const C = [KC.yellow, KC.orange, KC.pink, KC.cyan, KC.mint, KC.lilac];
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${16 * brillo}px ${KC.yellow})` } : null}>
    <rect x={-170} y={-44} width={340} height={88} rx={18} fill="rgba(255,255,255,.12)" stroke={KC.gold2} strokeWidth={5} strokeDasharray="12 8" />
    {C.map((c, i) => <rect key={i} x={-156 + i * 52} y={-28} width={44} height={56} rx={8} fill={c} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Pastelito (cupcake) con betún amarillo.
function Pastelito({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 -60 L -100 120 L 100 120 L 130 -60 Z" fill="#ff6b9a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-80, -40, 0, 40, 80].map((xx) => <line key={xx} x1={xx * 1.15} y1={-56} x2={xx * 0.85} y2={116} stroke={KC.ink} strokeWidth={4} opacity=".4" />)}
    <path d="M -150 -60 Q -170 -130 -100 -140 Q -90 -210 -10 -200 Q 40 -260 100 -200 Q 170 -190 150 -120 Q 180 -70 140 -56 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={10} cy={-236 + Math.sin(T * 4) * 3} r={24} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Hifa chiquita "con bloqueador": un hilito amarillo que se asoma con una sombrillita.
function HifaSombrilla({ T, x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k}) rotate(${mece(T, 3, 0.5) * 5})`}>
    <path d="M 0 0 Q -10 -60 10 -110 Q 26 -150 10 -190" stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M 0 0 Q -10 -60 10 -110 Q 26 -150 10 -190" stroke={RB.pipi} strokeWidth={16} fill="none" strokeLinecap="round" />
    <line x1={10} y1={-190} x2={30} y2={-260} stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 -250 Q 30 -330 110 -270 Q 30 -280 -50 -250 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function RiboflavinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Orina, M: CUES.Molecula, Mi: CUES.Microbios, A: CUES.Algodon, H: CUES.Hilos, V: CUES.Vacuolas, P: CUES.Pregunta,
    E: CUES.Esporas, Ta: CUES.Tanques, Ge: CUES.Genes, Ah: CUES.Ahorro, Ir: CUES.Ironia, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G + 0.1, K.G + 0.85);
  const reb = kprog(T, K.G + 0.85, K.G + 1.25);
  const pastX = klerp(820, 560, caida), pastY = caida < 1 ? klerp(300, 1150, caida * caida) : 1150 - Math.sin(reb * Math.PI) * 60;
  const chap = kclamp(1 + 2 * Math.exp(-(T - K.G - 0.9) * 2) * (T > K.G + 0.85 ? 1 : 0), 1, 3);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el vasito amarillo y la pastilla que cae */}
      <Escena T={T} a={K.G} b={K.O} zoom={0.05}>
        <FondoLunares color={KC.yellow} punto="rgba(255,255,255,.4)" />
        {fsvg(<>
          <Vasito T={T} x={320} y={1170} s={1.05} ola={chap} />
          <Pastilla x={pastX} y={pastY} rot={caida * 400 + reb * 40} />
        </>)}
      </Escena>
      {/* 1 · lo que sobra: riñones → orina, casi todo en 24 h */}
      <Escena T={T} a={K.O} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cuerpo x={330} y={960} T={T} p1={kprog(T, K.O + 0.1, K.O + 1.0)} p2={kprog(T, K.O + 0.9, K.O + 2.0)} p3={kprog(T, K.O + 1.9, K.O + 3.1)} />
          <Reloj24 x={830} y={900} r={100} p={kprog(T, K.O + 1.8, K.O + 3.6, kEase.suave)} />
        </>)}
      </Escena>
      {/* 2 · la molécula: amarilla, y con luz UV brilla */}
      <Escena T={T} a={K.M} b={K.Mi} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <LamparaUV x={540} y={520} w={420} on={kprog(T, K.M + 1.7, K.M + 2.0)} T={T} alto={640} />
          <Riboflavina x={540} y={840} s={0.95} p={kprog(T, K.M + 0.1, K.M + 1.2)} brillo={kprog(T, K.M + 1.9, K.M + 2.4) * (0.85 + 0.15 * Math.sin(T * 9))} T={T} />
        </>)}
      </Escena>
      {/* 3 · hoy la fabrican microbios */}
      <Escena T={T} a={K.Mi} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <TarjetaMicrobio T={T} x={70} y={780} p={kprog(T, K.Mi + 0.2, K.Mi + 0.7)} tipo="bacteria" comun="bacteria" cientifico="Bacillus subtilis" />
          <TarjetaMicrobio T={T} x={590} y={780} p={kprog(T, K.Mi + 1.4, K.Mi + 2.6)} tipo="hongo" comun="hongo" cientifico="Ashbya gossypii" />
        </>)}
      </Escena>
      {/* 4 · en el campo: enferma al algodón; lo meten las chinches */}
      <Escena T={T} a={K.A} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const cam = kprog(T, K.A + 0.2, K.A + 1.3, kEase.suave), pica = kprog(T, K.A + 1.35, K.A + 1.7);
          return <>
            <Algodon T={T} x={380} y={1230} s={1.0} mancha={kprog(T, K.A + 1.7, K.A + 2.8)} />
            <Chinche T={T} x={klerp(1000, 536, cam)} y={klerp(1000, 700, cam)} rot={klerp(-60, -100, cam)} s={0.9} camina={1 - cam} pica={pica} />
          </>; })())}
      </Escena>
      {/* 5 · pariente de la levadura, pero crece en hilos que se parten en dos */}
      <Escena T={T} a={K.H} b={K.V} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {[[130, 560, 0.2], [180, 600, -0.3], [150, 640, 0.5], [205, 548, 0.1], [235, 615, -0.6]].map(([a, b, r], i) =>
            <LevaduraCel key={i} x={a} y={b} rot={r * 60} s={kEase.rebote(kprog(T, K.H + 0.1 + i * 0.08, K.H + 0.5 + i * 0.08))} yema={i % 2 ? 0.6 + 0.2 * Math.sin(T * 2 + i) : 0} />)}
          <HifasY T={T} x={540} y={930} g={kprog(T, K.H + 0.4, K.H + 3.2)} s={0.62} rot={-8} />
        </>)}
      </Escena>
      {/* 6 · al dejar de crecer se llena de riboflavina (vacuolas) */}
      <Escena T={T} a={K.V} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <HifaTubo T={T} x={60} y={880} w={960} h={170} crece={klerp(0.82, 1, kprog(T, K.V, K.V + 1.2, kEase.sale))} lleno={kprog(T, K.V + 1.2, K.V + 3.4)} amarillo={kprog(T, K.V + 2.2, K.V + 3.6) * 0.6} />
          {/* medidor de comida que se vacía */}
          <rect x={60} y={460} width={420} height={44} rx={22} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={4} />
          <rect x={64} y={464} width={412 * (1 - kprog(T, K.V + 0.1, K.V + 1.2))} height={36} rx={18} fill={KC.mint} />
          <text x={60} y={440} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>comida</text>
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿para qué tanto amarillo? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform="translate(60 1080) scale(0.45)"><HifaTubo T={T} x={0} y={0} w={960} h={170} crece={1} lleno={1} amarillo={0.6} /></g>
          <Interrogacion T={T} x={290} y={960} tam={420} color={KC.yellow} />
        </>)}
      </Escena>
      {/* 8 · el estudio de 2001: esporas en aguja y luz UV */}
      <Escena T={T} a={K.E} b={K.Ta} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg((() => { const sal = kprog(T, K.E + 0.1, K.E + 1.3, kEase.sale), fuera = kprog(T, K.E + 3.5, K.E + 3.9), pl = kprog(T, K.E + 3.7, K.E + 4.2, kEase.rebote);
          const uv = kprog(T, K.E + 4.2, K.E + 4.4), crece = kprog(T, K.E + 4.5, K.E + 5.6);
          return <>
            {fuera < 1 && <g opacity={1 - fuera}>
              {Array.from({ length: 8 }, (_, i) => <Espora key={i} T={T} seed={i} x={390 + klerp(0, (i - 3.5) * 22, sal)} y={640 + i * 8 + klerp(0, (i - 3.5) * 10, sal)} rot={-4 + (i - 3.5) * klerp(0.5, 7, sal)} largo={300} s={sal} />)}
            </g>}
            {pl > 0 && <g>
              <LamparaUV x={540} y={470} w={760} on={uv} T={T} alto={700} />
              <Petri x={290} y={960} r={165 * pl} medio="#f5e7b8">
                {[[-60, -40], [70, 50], [10, 90]].map(([a, b], i) => <Colonia key={i} cx={a} cy={b} r={22 * crece} seed={i + 1} />)}
              </Petri>
              <Petri x={790} y={960} r={165 * pl} medio="#ffe680">
                {[[-70, -60], [60, -70], [0, 0], [-90, 40], [80, 40], [-20, 100], [40, -10], [-40, -110], [100, -10], [20, 70]].map(([a, b], i) => <Colonia key={i} cx={a} cy={b} r={22 * crece} seed={i + 5} />)}
              </Petri>
            </g>}
          </>; })())}
      </Escena>
      {/* 9 · BASF: tanques desde 1990; en 1996, adiós síntesis química */}
      <Escena T={T} a={K.Ta} b={K.Ge} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tanque T={T} x={330} y={1060} p={kprog(T, K.Ta + 0.2, K.Ta + 1.6)} color={kprog(T, K.Ta + 0.8, K.Ta + 2.4)} />
          {T > K.Ta + 1.4 && <Fabrica T={T} x={800} y={1080} s={kEase.rebote(kprog(T, K.Ta + 1.4, K.Ta + 1.8))} apagada={kprog(T, K.Ta + 3.0, K.Ta + 3.5)} />}
        </>)}
      </Escena>
      {/* 10 · ingeniería genética: copias extra de los genes */}
      <Escena T={T} a={K.Ge} b={K.Ah} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg((() => { const abre = kprog(T, K.Ge + 0.2, K.Ge + 0.8, kEase.sale), baja = kprog(T, K.Ge + 0.6, K.Ge + 1.4, kEase.sale);
          return <>
            <ADNHueco T={T} x={50} y={840} w={980} amp={46} abre={abre} />
            <PaqueteGenes x={540} y={klerp(380, 840, baja)} s={0.95} brillo={kprog(T, K.Ge + 1.4, K.Ge + 1.8)} />
            <g transform="translate(60 1100) scale(0.5)"><HifaTubo T={T} x={0} y={0} w={1920} h={160} crece={1} lleno={1} amarillo={0.5 + 0.5 * kprog(T, K.Ge + 1.8, K.Ge + 3.0)} /></g>
          </>; })())}
      </Escena>
      {/* 11 · el ahorro: costo −40 %, CO2 −30 % (análisis de BASF) */}
      <Escena T={T} a={K.Ah} b={K.Ir} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const u = kprog(T, K.Ah + 0.3, K.Ah + 1.1, kEase.sale), f1 = kprog(T, K.Ah + 1.2, K.Ah + 2.0, kEase.sale), f2 = kprog(T, K.Ah + 2.4, K.Ah + 3.2, kEase.sale);
          const B = 1150, MX = 400;
          const barra = (x, frac, col, k) => <rect key={k} x={x} y={B - MX * frac} width={140} height={MX * frac} fill={col} stroke={KC.ink} strokeWidth={7} />;
          return <>
            <line x1={80} y1={B} x2={1000} y2={B} stroke={KC.ink} strokeWidth={8} />
            {barra(110, u, RB.gris, 'a')}{barra(270, klerp(u, 0.6, f1), KC.yellow, 'b')}
            {barra(590, u, RB.gris, 'c')}{barra(750, klerp(u, 0.7, f2), KC.yellow, 'd')}
            <text x={260} y={B + 56} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>COSTO</text>
            <text x={740} y={B + 56} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.ink}>CO₂</text>
            {f1 > 0 && <text x={340} y={B - MX * 0.6 - 20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={f1}>−40 %</text>}
            {f2 > 0 && <text x={820} y={B - MX * 0.7 - 20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={f2}>−30 %</text>}
            {/* leyenda */}
            <rect x={70} y={650} width={40} height={40} fill={RB.gris} stroke={KC.ink} strokeWidth={5} />
            <text x={126} y={683} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>síntesis química</text>
            <rect x={70} y={706} width={40} height={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <text x={126} y={739} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>fermentación con hongo</text>
          </>; })())}
      </Escena>
      {/* 12 · la ironía: también es colorante (E101) */}
      <Escena T={T} a={K.Ir} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Pastelito x={360} y={1010} s={kEase.rebote(kprog(T, K.Ir + 0.1, K.Ir + 0.6)) * 1.15} T={T} />)}
      </Escena>
      {/* 13 · cierre: el mismo vasito, ahora bajo luz UV, con el hongo de bloqueador */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={mixHex(KC.yellow, '#3a2a6a', kprog(T, K.C + 0.6, K.C + 1.2) * 0.85)} punto="rgba(255,255,255,.25)" />
        {fsvg(<>
          <LamparaUV x={320} y={560} w={420} on={kprog(T, K.C + 0.7, K.C + 1.0)} T={T} alto={640} />
          <Vasito T={T} x={320} y={1170} s={1.05} uv={kprog(T, K.C + 1.0, K.C + 1.6)} ola={0.6} />
          <Pastilla x={560} y={1150} rot={40} />
          <HifaSombrilla T={T} x={300} y={830} s={0.8} p={kprog(T, K.C + 1.8, K.C + 2.4)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.1} until={K.O - 0.3} texto="colorante" x={330} y={560} tam={60} />
      <Chip T={T} at={K.G + 2.6} until={K.O - 0.3} texto="vitamina B2" x={330} y={680} tam={52} borde={KC.ink} />
      <Etq T={T} at={K.O + 1.2} until={K.M - 0.3} x={60} y={600} texto="riñones" tam={30} color={KC.ink} />
      <Etq T={T} at={K.O + 2.2} until={K.M - 0.3} x={60} y={1120} texto="vejiga" tam={30} color={KC.ink} />
      <Chip T={T} at={K.O + 2.6} until={K.M - 0.3} texto="casi todo sale en las primeras 24 horas" x={540} y={1170} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.M + 0.5} until={K.Mi - 0.3} x={60} y={420} texto="riboflavina · vitamina B2" tam={34} color={KC.yellow} />
      <Chip T={T} at={K.M + 1.8} until={K.Mi - 0.3} texto="luz ultravioleta" x={540} y={620} tam={32} borde={RB.uv2} mono />
      <Etq T={T} at={K.M + 2.4} until={K.Mi - 0.3} x={60} y={1150} texto="brilla verde-amarillo" tam={32} color={RB.brilla} />
      <Chip T={T} at={K.Mi + 0.3} until={K.A - 0.3} texto="la industria ya usa fermentación" x={360} y={460} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.A + 0.4} until={K.H - 0.3} x={60} y={420} texto="algodón · cápsula abierta" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 1.0} until={K.H - 0.3} x={60} y={1080} texto="chinche (vector)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 2.0} until={K.H - 0.3} x={60} y={500} texto="fibra manchada" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 0.3} until={K.V - 0.3} x={290} y={590} texto="levadura del pan" tam={28} color={KC.texto} />
      <Etq T={T} at={K.H + 0.6} until={K.V - 0.3} x={290} y={636} texto="Saccharomyces cerevisiae" it tam={28} color={KC.gold2} />
      <Etq T={T} at={K.H + 1.2} until={K.V - 0.3} x={60} y={1130} texto="Ashbya gossypii" it tam={34} color={KC.gold2} />
      <Chip T={T} at={K.H + 0.9} until={K.V - 0.3} texto="misma familia: Saccharomycetaceae" x={540} y={460} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.H + 2.2} until={K.V - 0.3} x={60} y={1180} texto="sus puntas se parten en dos" tam={28} color={KC.texto} />
      <Etq T={T} at={K.V + 1.8} until={K.P - 0.3} x={60} y={1050} texto="vacuolas con riboflavina" tam={32} color={KC.yellow} />
      <Etq T={T} at={K.V + 0.6} until={K.P - 0.3} x={60} y={720} texto="núcleos · tabiques" tam={28} color={RB.nucleo} />
      <Chip T={T} at={K.V + 0.5} until={K.P - 0.3} texto="deja de crecer" x={360} y={590} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={K.E + 0.4} until={K.E + 3.5} x={60} y={440} texto="esporas de Ashbya, en aguja" tam={30} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 1.2} until={K.E + 3.5} anio="2001" quien="Alemania, Reino Unido y España" revista="Environmental Microbiology, 2001" x={540} y={1000} />
      <Etq T={T} at={K.E + 4.4} until={K.Ta - 0.3} x={150} y={1175} texto="sin riboflavina" tam={28} color={KC.texto} />
      <Etq T={T} at={K.E + 4.6} until={K.Ta - 0.3} x={640} y={1175} texto="con riboflavina" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.E + 5.6} until={K.Ta - 0.3} texto="hipótesis: protector UV" x={360} y={360} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.Ta + 0.5} until={K.Ge - 0.3} texto="1990: fermentación industrial" x={540} y={420} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ta + 0.9} until={K.Ge - 0.3} x={60} y={500} texto="BASF · con aceite vegetal" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ta + 3.0} until={K.Ge - 0.3} texto="1996: adiós síntesis química" x={700} y={1160} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ge + 0.3} until={K.Ah - 0.3} texto="ingeniería genética" x={340} y={430} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Ge + 1.5} until={K.Ah - 0.3} x={60} y={990} texto="6 genes de la vía, en un paquete" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Ge + 2.0} until={K.Ah - 0.3} x={60} y={1170} texto="Ashbya gossypii" it tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Ah + 0.2} until={K.Ir - 0.3} x={60} y={430} texto="según BASF:" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ah + 0.4} until={K.Ir - 0.3} x={60} y={480} texto="análisis de ecoeficiencia" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ah + 0.6} until={K.Ir - 0.3} x={60} y={525} texto="(Saling 2005 · Hoff 2021)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Ir + 0.8} until={K.C - 0.3} texto="colorante E101 = riboflavina" x={540} y={1170} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ir + 0.3} until={K.C - 0.3} texto="ironía" x={300} y={460} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="bloqueador solar de un hongo" x={540} y={1170} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.C + 2.8} until={K.Ou} x={60} y={1500} texto="No es consejo médico. El dibujo es esquemático." tam={22} color={KC.texto} />

      {/* barras de escala (siempre visibles; tarjetas y barras no llevan) */}
      <BarraEscala T={T} at={K.G} until={K.O} texto="5 cm" largo={190} color={KC.ink} />
      <BarraEscala T={T} at={K.O} until={K.M} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.Mi} texto="1 nm" largo={300} />
      <BarraEscala T={T} at={K.A} until={K.H} texto="2 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.V} texto="20 µm" largo={115} />
      <BarraEscala T={T} at={K.V} until={K.P} texto="10 µm" largo={380} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="10 µm" largo={170} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.E + 3.7} texto="10 µm (esporas de ~30 µm)" largo={100} />
      <BarraEscala T={T} at={K.E + 3.7} until={K.Ta} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.Ta} until={K.Ge} texto="tanque: esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ge} until={K.Ah} texto="2 nm (ancho del ADN)" largo={92} />
      <BarraEscala T={T} at={K.Ir} until={K.C} texto="5 cm" largo={120} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={190} y={1580} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="No es colorante: es *vitamina B2* que te sobró." />
      <SubIt T={T} idx={1} at={K.O + 0.1} until={K.M - 0.1} texto="Lo que sobra sale en la orina, *casi todo el primer día.*" />
      <SubIt T={T} idx={2} at={K.M + 0.1} until={K.Mi - 0.1} texto="Riboflavina: amarilla y, con luz UV, *brilla.*" />
      <SubIt T={T} idx={3} at={K.Mi + 0.1} until={K.A - 0.1} texto="La fabrican microbios, como el hongo *_Ashbya gossypii._*" />
      <SubIt T={T} idx={4} at={K.A + 0.1} until={K.H - 0.1} texto="Enferma al algodón: *lo meten las chinches.*" />
      <SubIt T={T} idx={5} at={K.H + 0.1} until={K.V - 0.1} texto="Pariente de la levadura, pero *crece en hilos.*" />
      <SubIt T={T} idx={6} at={K.V + 0.1} until={K.P - 0.1} texto="Al dejar de crecer, *se llena de riboflavina.*" />
      <SubIt T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Para qué *tanto amarillo?*" />
      <SubIt T={T} idx={8} at={K.E + 0.1} until={K.Ta - 0.1} texto="Con riboflavina, sus esporas *aguantaban más la luz UV.*" />
      <SubIt T={T} idx={9} at={K.Ta + 0.1} until={K.Ge - 0.1} texto="1990: tanques. 1996: *adiós síntesis química.*" />
      <SubIt T={T} idx={10} at={K.Ge + 0.1} until={K.Ah - 0.1} texto="Le metieron *copias extra de los genes.*" />
      <SubIt T={T} idx={11} at={K.Ah + 0.1} until={K.Ir - 0.1} texto="Según la empresa: *−40 % costo, −30 % CO₂.*" />
      <SubIt T={T} idx={12} at={K.Ir + 0.1} until={K.C - 0.1} texto="Ironía: *también es colorante.*" />
      <SubIt T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Puede ser *el bloqueador solar de un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.O + 2.0, K.M - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Mi + 0.7, K.A - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A + 1.2, K.H + 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.V + 1.0, K.P - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 4.7, K.Ta + 0.05, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ge + 0.2, K.Ah - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ah + 1.5, K.Ir - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ir + 0.7, K.C - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.9, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="77" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RiboflavinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RiboflavinaShot /></CompositionStage></div>;
}
window.RiboflavinaApp = RiboflavinaApp;
