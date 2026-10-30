// Shot Fungi Mati #02: La hormiga zombi (Ophiocordyceps). Remaster del shot 001 con las reglas del 27 oct 2026
// (gancho de los 7, 61–62 s, Robert en pantalla, cierre que regresa al gancho). Usa kit-robert.jsx (MarcaAgua, Robert, CierreMarca).
// Motor: animations-v3.jsx (CompositionStage + useComposition). Todo se dibuja desde T.
const W = 1080, H = 1920, CX = 540;
const MOTION = { enter: Easing.easeOutExpo, draw: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const C = { ink:'#16120f', paper:'#f4efe4', pink:'#ff2d78', yellow:'#ffe11a', cyan:'#00d2ff', red:'#ff3b2f', blue:'#2346ff', mint:'#2fe0a8', violet:'#2b0f63', orange:'#ff8a1f', lilac:'#b18cff', teal:'#11a39a', magenta:'#e8336d', gold:'#E8A62A', gold2:'#F4C25A', coral:'#ff6b5a', white:'#ffffff', leaf:'#3fbf4a', leafD:'#1f7a2c', stone:'#9a948c' };
const INK = '#F6F3EC', DARK = '#0E0F12', BODY = '#6e2f1c';
const FONT = "'Archivo', 'Arial Black', sans-serif", NUM = "'Anton', Impact, sans-serif", MONO = "'Space Mono', ui-monospace, monospace";
const SHADOW = '0 4px 0 rgba(0,0,0,.85), 0 0 34px rgba(0,0,0,.95)';
const AV = (n) => 'assets/stickers/' + n + '.png';
const OL = `8px solid ${C.ink}`;
const HEX = 'polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)';

function prog(T, a, b, ease) { if (b <= a) return T >= a ? 1 : 0; const p = clamp((T - a) / (b - a), 0, 1); return ease ? ease(p) : p; }
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) { return function () { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function rgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) { const A = rgb(a), B = rgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',')})`; }
const wobble = (T, t0, k = 7, f = 26) => (T < t0 ? 0 : Math.exp(-(T - t0) * k) * Math.cos((T - t0) * f));
const live = (T, a, b) => T >= a && T < b;

function pattern(kind, T) {
  const p = T * 40;
  switch (kind) {
    case 'pop': return { backgroundImage:'radial-gradient(circle, rgba(255,225,26,.55) 9px, transparent 10px)', backgroundSize:'40px 40px', backgroundPosition:`${p}px ${p}px` };
    case 'grid': return { backgroundImage:'linear-gradient(rgba(255,255,255,.18) 3px, transparent 3px), linear-gradient(90deg, rgba(255,255,255,.18) 3px, transparent 3px)', backgroundSize:'72px 72px', backgroundPosition:`${p}px ${p}px` };
    case 'stripes': return { backgroundImage:'repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 30px, transparent 30px 60px)', backgroundPosition:`${p * 2}px 0` };
    case 'dots': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.45) 8px, transparent 9px)', backgroundSize:'56px 56px', backgroundPosition:`0 ${-p * 2}px` };
    case 'halftone': return { backgroundImage:'radial-gradient(circle, rgba(177,140,255,.32) 5px, transparent 6px)', backgroundSize:'26px 26px', backgroundPosition:`${p}px ${-p}px` };
    case 'cyan': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.5) 7px, transparent 8px)', backgroundSize:'44px 44px', backgroundPosition:`${-p}px ${p}px` };
    case 'riso': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.22) 5px, transparent 6px)', backgroundSize:'30px 30px', backgroundPosition:`${p}px ${-p * 0.5}px` };
    default: return {};
  }
}
function Bg({ color, kind, T, children }) { return <div style={{ position:'absolute', inset:0, background:color, ...pattern(kind, T) }}>{children}</div>; }
function Abs({ x, y, w, h, style, children }) { return <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, ...style }}>{children}</div>; }
function Big({ children, size = 200, color = C.white, rot = 0, s = 1, style }) {
  return <div style={{ font:`400 ${size}px/1 ${NUM}`, color, WebkitTextStroke:`${Math.max(5, size / 28)}px ${C.ink}`, textShadow:`${size / 22}px ${size / 22}px 0 ${C.ink}`, transform:`rotate(${rot}deg) scale(${s})`, whiteSpace:'nowrap', ...style }}>{children}</div>;
}

/* ================= LA HORMIGA (SVG, mira a la derecha; viewBox 520×320) ================= */
const HYPHAE = [
  'M60 170 C90 130 140 210 180 160', 'M80 222 C110 190 150 232 200 200', 'M100 112 C130 150 160 120 210 150',
  'M215 165 C250 150 270 178 300 150', 'M262 166 C290 192 322 140 360 160', 'M300 140 C322 122 350 176 366 150',
  'M356 152 C372 178 402 182 432 166', 'M352 136 C358 102 366 90 382 84', 'M432 160 C446 150 452 136 456 122',
  'M290 186 C300 212 322 222 346 242', 'M270 186 C255 216 246 236 230 252', 'M140 240 C170 250 200 236 220 220',
];
const SPIRAL = (() => { let d = ''; for (let i = 0; i <= 60; i++) { const a = i * 0.42, r = 1 + i * 0.22; d += (i ? ' L' : 'M') + (Math.cos(a) * r).toFixed(2) + ' ' + (Math.sin(a) * r).toFixed(2); } return d; })();
function Leg({ hx, hy, a, lift, col, w }) {
  const kx = hx + Math.sin(a) * 66, ky = hy + 34 - lift * 0.4, fx = kx + Math.sin(a) * 52, fy = ky + 82 - lift;
  return <polyline points={`${hx},${hy} ${kx},${ky} ${fx},${fy}`} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
}
function Ant({ T, x, y, w = 520, rot = 0, flipY = false, walk = 0, walking = 0, bite = 0, zombie = 0, dead = 0, fungus = 0, stalk = 0, ascoma = 0, xray = 0, o = 1 }) {
  const h = w * 320 / 520;
  const body = mix(BODY, '#f3d2b6', xray * 0.85), bodyOl = C.ink;
  const ph = walk * Math.PI * 2;
  const legs = (far) => [[280, 182, -0.62], [305, 188, 0.0], [332, 182, 0.62]].map(([hx, hy, base], i) => {
    const sw = Math.sin(ph + (i % 2 ? Math.PI : 0) + (far ? Math.PI : 0)) * 0.32 * walking;
    const lift = Math.max(0, Math.cos(ph + (i % 2 ? Math.PI : 0) + (far ? Math.PI : 0))) * 16 * walking;
    return <Leg key={(far ? 'f' : 'n') + i} hx={hx + (far ? 14 : 0)} hy={hy - (far ? 8 : 0)} a={base + sw} lift={lift} col={far ? '#3a2018' : C.ink} w={far ? 11 : 13} />;
  });
  const open = (1 - bite) * 24;
  const ant = Math.sin(T * 7) * 4 * (1 - dead);
  const fz = (i) => clamp(fungus * 1.6 - i * 0.07, 0, 1);
  const st = clamp(stalk, 0, 1), sx2 = 345 + 60 * st, sy2 = 128 - 300 * st;
  return (
    <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, opacity:o, transform:`rotate(${rot}deg) scaleY(${flipY ? -1 : 1})` }}>
      <svg viewBox="0 0 520 320" width={w} height={h} style={{ overflow:'visible', display:'block' }}>
        {legs(true)}
        {/* antenas */}
        {[0, 1].map((k) => <polyline key={k} points={`${414 + k * 10},${84} ${440 + k * 14},${30 + ant} ${496 + k * 10},${22 + k * 10 - ant}`} fill="none" stroke={k ? '#3a2018' : C.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />)}
        {/* abdomen (gáster) */}
        <ellipse cx="120" cy="170" rx="110" ry="78" fill={body} stroke={bodyOl} strokeWidth="8" />
        <path d="M150 96 Q178 170 150 244" fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="6" />
        <path d="M192 112 Q214 170 192 228" fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="6" />
        <ellipse cx="90" cy="136" rx="44" ry="18" fill="rgba(255,255,255,.28)" />
        <ellipse cx="238" cy="168" rx="22" ry="18" fill={body} stroke={bodyOl} strokeWidth="7" />
        {/* tórax */}
        <ellipse cx="305" cy="158" rx="62" ry="34" fill={body} stroke={bodyOl} strokeWidth="8" transform="rotate(-8 305 158)" />
        <ellipse cx="292" cy="142" rx="26" ry="9" fill="rgba(255,255,255,.25)" />
        {/* cabeza */}
        <ellipse cx="408" cy="130" rx="60" ry="54" fill={body} stroke={bodyOl} strokeWidth="8" />
        <ellipse cx="390" cy="102" rx="22" ry="10" fill="rgba(255,255,255,.25)" />
        {/* rayos X: músculos y cerebro */}
        {xray > 0.01 && <g opacity={xray}>
          {[[285, 158, 22, 15], [318, 151, 22, 15], [345, 160, 15, 12], [424, 152, 24, 15]].map(([cx, cy, rx, ry], i) => <g key={i}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#ff6b5a" stroke={C.ink} strokeWidth="4" />
            {[-0.5, 0, 0.5].map((f, j) => <line key={j} x1={cx + f * rx} y1={cy - ry * 0.7} x2={cx + f * rx} y2={cy + ry * 0.7} stroke="rgba(22,18,15,.45)" strokeWidth="3" />)}
          </g>)}
          <path d="M370 118 C370 98 392 92 404 98 C418 92 424 112 414 124 C410 136 380 138 372 128 Z" fill="#ffb3c7" stroke={C.ink} strokeWidth="5" />
          <path d="M384 104 Q392 114 384 124 M398 102 Q404 114 398 128" fill="none" stroke="rgba(22,18,15,.4)" strokeWidth="3" />
        </g>}
        {/* hifas del hongo */}
        {fungus > 0.01 && HYPHAE.map((d, i) => <path key={i} d={d} pathLength="1" fill="none" stroke={C.gold2} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - fz(i)} style={{ filter:'drop-shadow(0 0 4px rgba(244,194,90,.8))' }} />)}
        {fungus > 0.75 && xray < 0.5 && [[60, 120], [150, 245], [230, 152], [262, 178], [336, 186], [350, 128], [450, 150]].map(([cx, cy], i) =>
          <circle key={i} cx={cx} cy={cy} r={10 + (i % 3) * 4} fill="#fff8e8" stroke={C.ink} strokeWidth="3" opacity={prog(fungus, 0.75, 1)} />)}
        {/* ojo */}
        <circle cx="428" cy="112" r="17" fill="#fff" stroke={C.ink} strokeWidth="5" />
        {dead > 0.5 ? <g stroke={C.ink} strokeWidth="5" strokeLinecap="round"><line x1="420" y1="104" x2="436" y2="120" /><line x1="436" y1="104" x2="420" y2="120" /></g>
          : zombie > 0.5 ? <path d={SPIRAL} transform={`translate(428 112) rotate(${T * 400})`} fill="none" stroke={C.ink} strokeWidth="3" />
          : <circle cx="433" cy="112" r="7" fill={C.ink} />}
        {/* mandíbulas */}
        <path d="M456 138 Q488 128 506 146" fill="none" stroke={C.ink} strokeWidth="10" strokeLinecap="round" transform={`rotate(${-open} 456 140)`} />
        <path d="M456 156 Q488 168 504 150" fill="none" stroke={C.ink} strokeWidth="10" strokeLinecap="round" transform={`rotate(${open} 456 154)`} />
        {legs(false)}
        {/* tallo del hongo (estroma): brota de la nuca (pronoto dorsal), detrás de la cabeza */}
        {st > 0.01 && <g>
          <path d={`M345 128 Q ${330 + 10 * st} ${128 - 170 * st} ${sx2} ${sy2}`} fill="none" stroke={C.ink} strokeWidth="26" strokeLinecap="round" />
          <path d={`M345 128 Q ${330 + 10 * st} ${128 - 170 * st} ${sx2} ${sy2}`} fill="none" stroke="#d8b48a" strokeWidth="14" strokeLinecap="round" />
          {ascoma > 0.01 && <g transform={`translate(${lerp(345, sx2, 0.62) - 6} ${lerp(128, sy2, 0.62)}) scale(${ascoma})`}>
            <ellipse cx="0" cy="0" rx="34" ry="26" fill={C.coral} stroke={C.ink} strokeWidth="6" />
            {[[-14, -6], [4, -12], [14, 6], [-6, 10]].map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r="4" fill={C.ink} />)}
          </g>}
        </g>}
      </svg>
    </div>
  );
}

/* Espora alargada (las ascosporas de Ophiocordyceps son filiformes, no redondas) */
function Spore({ x, y, w = 420, rot = 0, s = 1, glow = 1 }) {
  const h = w * 0.2;
  return <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, transform:`rotate(${rot}deg) scale(${s})` }}>
    <div style={{ position:'absolute', inset:-18, borderRadius:999, background:`radial-gradient(ellipse, rgba(244,194,90,${0.55 * glow}), transparent 70%)` }}></div>
    <div style={{ position:'absolute', inset:0, borderRadius:999, background:'linear-gradient(180deg,#fff2b8,#F4C25A 55%,#c98b1c)', border:`7px solid ${C.ink}`, boxSizing:'border-box', overflow:'hidden' }}>
      {[0.2, 0.4, 0.6, 0.8].map((f, i) => <div key={i} style={{ position:'absolute', left:`${f * 100}%`, top:0, bottom:0, width:5, background:'rgba(22,18,15,.35)' }}></div>)}
      <div style={{ position:'absolute', left:'8%', right:'30%', top:'16%', height:'22%', borderRadius:99, background:'rgba(255,255,255,.6)' }}></div>
    </div>
  </div>;
}

/* ================= ESCENAS (Shot Fungi Mati #02) ================= */
// Marioneta: el hongo "maneja" a la hormiga (metáfora del gancho y del cierre). Cruz dorada con hilos.
function Marioneta({ T, x, y, a = 1, puntos = [], o = 1 }) {
  const tilt = Math.sin(T * 2.4) * 9 * a;
  const ends = [[-170, 0], [170, 0], [0, -60], [0, 60]].map(([dx, dy]) => {
    const r = tilt * Math.PI / 180; return [x + dx * Math.cos(r) - dy * Math.sin(r), y + dx * Math.sin(r) + dy * Math.cos(r)]; });
  return <div style={{ position:'absolute', inset:0, opacity:o, pointerEvents:'none' }}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position:'absolute', inset:0 }}>
      {puntos.map(([px, py], i) => { const e = ends[i % ends.length]; return <path key={i} d={`M${e[0]} ${e[1]} Q ${(e[0] + px) / 2 + Math.sin(T * 3 + i) * 14} ${(e[1] + py) / 2} ${px} ${py}`} fill="none" stroke={C.gold2} strokeWidth="5" strokeDasharray="14 8" style={{ filter:'drop-shadow(0 0 5px rgba(244,194,90,.9))' }} />; })}
    </svg>
    <div style={{ position:'absolute', left:x - 190, top:y - 22, width:380, height:44, borderRadius:22, background:'linear-gradient(180deg,#F4C25A,#c98b1c)', border:`7px solid ${C.ink}`, boxSizing:'border-box', transform:`rotate(${tilt}deg)` }}></div>
    <div style={{ position:'absolute', left:x - 22, top:y - 80, width:44, height:160, borderRadius:22, background:'linear-gradient(90deg,#c98b1c,#F4C25A,#c98b1c)', border:`7px solid ${C.ink}`, boxSizing:'border-box', transform:`rotate(${tilt}deg)` }}></div>
  </div>;
}

function GanchoScene({ T, K }) {
  if (!live(T, K.G, K.E)) return null;
  const s = K.G, GROUND = 1500;
  const ax = lerp(-320, CX, prog(T, s, s + 0.9, Easing.easeOutCubic));
  const bar = prog(T, s + 0.35, s + 1.05, MOTION.pop);
  const rock = Math.sin(T * 2.4) * 5 * bar;
  const ay = 1350;
  return (
    <Bg color={C.pink} kind="pop" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:GROUND, height:480, background:'#7a3b1e', borderTop:OL, backgroundImage:'radial-gradient(circle, rgba(0,0,0,.18) 6px, transparent 7px)', backgroundSize:'48px 48px' }}></div>
      <div style={{ position:'absolute', inset:0, transformOrigin:`${ax}px ${GROUND}px`, transform:`rotate(${rock}deg)` }}>
        <Ant T={T} x={ax} y={ay} w={620} walk={(T - s) * 2.4} walking={T < s + 0.95 ? 1 : 0.35} zombie={1} />
      </div>
      {bar > 0.01 && <Marioneta T={T} x={CX} y={lerp(-200, 1100, bar)} a={bar} o={1} puntos={[[CX - 190, 1290], [CX + 200, 1235], [CX + 40, 1270], [CX - 60, 1250]]} />}
      <Etiqueta T={T} at={s + 1.2} until={K.E} x={CX + 230} y={1100} texto="hongo" />
    </Bg>
  );
}
// Etiqueta corta con línea (nombre común o científico en cursiva).
function Etiqueta({ T, at, until, x, y, texto, it = false, color = C.white }) {
  if (T < at || T > until) return null;
  const e = prog(T, at, at + 0.35, MOTION.enter), out = prog(T, until - 0.2, until, MOTION.draw);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e * (1 - out), display:'flex', alignItems:'center', gap:12, transform:'translateY(-50%)' }}>
    <div style={{ width:70 * e, height:5, background:color, borderRadius:3, boxShadow:'0 2px 0 rgba(0,0,0,.6)' }}></div>
    <div style={{ font:`700 34px ${MONO}`, fontStyle:it ? 'italic' : 'normal', color, textShadow:'0 3px 0 rgba(0,0,0,.85), 0 0 16px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}

/* Espora: cae al suelo, germina y su espora chiquita (secundaria) se pega a la hormiga que pasa. Luego, la cutícula. */
const CRUMBS = (() => { const g = rng(9); return Array.from({ length:16 }, () => ({ vx:(g() - 0.5) * 900, vy:-300 - g() * 600, z:16 + g() * 22, r:g() * 360 })); })();
function EsporaScene({ T, K }) {
  if (!live(T, K.E, K.I)) return null;
  const s = K.E, SOIL = 1450, SX = 600, B = s + 3.3;
  const fall = prog(T, s + 0.05, s + 0.7, Easing.easeInCubic), sq = wobble(T, s + 0.7, 6, 22);
  const hair = prog(T, s + 0.9, s + 1.6, MOTION.draw), tipY = SOIL - 30 - 150 * hair;
  const antX = lerp(-260, 1320, prog(T, s + 1.5, B, (p) => p));
  const pegada = antX >= SX - 10;
  const fa = 1 - prog(T, B - 0.15, B + 0.2), fb = prog(T, B - 0.15, B + 0.2);
  const drill = prog(T, B + 0.25, B + 1.4, Easing.easeInOutQuad), drillOn = T > B + 0.25 && T < B + 1.5;
  const CUT = 1180, tube = 40 + drill * 300;
  return (
    <Bg color={C.blue} kind="grid" T={T}>
      {fa > 0.01 && <div style={{ position:'absolute', inset:0, opacity:fa }}>
        <div style={{ position:'absolute', left:0, right:0, top:SOIL, bottom:0, background:'#7a3b1e', borderTop:OL, backgroundImage:'radial-gradient(circle, rgba(0,0,0,.2) 6px, transparent 7px)', backgroundSize:'46px 46px' }}></div>
        <div style={{ position:'absolute', inset:0, transformOrigin:`${SX}px ${SOIL}px`, transform:`scale(${1 + sq * 0.12},${1 - sq * 0.16})` }}>
          <Spore x={SX + (1 - fall) * 260} y={lerp(-200, SOIL - 22, fall)} w={420} rot={(1 - fall) * -40} glow={1} />
        </div>
        {hair > 0.01 && <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position:'absolute', inset:0 }}>
          <line x1={SX + 60} y1={SOIL - 30} x2={SX + 60} y2={tipY} stroke={C.ink} strokeWidth="9" strokeLinecap="round" />
          <line x1={SX + 60} y1={SOIL - 30} x2={SX + 60} y2={tipY} stroke="#fff2b8" strokeWidth="4" strokeLinecap="round" />
          {!pegada && hair > 0.9 && <ellipse cx={SX + 60} cy={tipY - 20} rx="14" ry="26" fill="#fff2b8" stroke={C.ink} strokeWidth="5" />}
        </svg>}
        <Ant T={T} x={antX} y={SOIL - 100} w={330} walk={(T - s) * 3} walking={1} />
        {pegada && <Abs x={antX - 20} y={SOIL - 150} w={30} h={54} style={{ borderRadius:'50%', background:'#fff2b8', border:`5px solid ${C.ink}`, boxSizing:'border-box', boxShadow:'0 0 18px rgba(244,194,90,.9)' }}></Abs>}
        {pegada && T < B && <Abs x={SX + 40} y={SOIL - 160} w={220} h={220} style={{ borderRadius:'50%', border:`10px solid ${C.yellow}`, boxSizing:'border-box', opacity:1 - prog(T, s + 2.55, s + 3.0), transform:`scale(${0.4 + prog(T, s + 2.55, s + 3.0) * 1.2})` }}></Abs>}
        <Etiqueta T={T} at={s + 0.8} until={s + 2.4} x={120} y={SOIL + 90} texto="espora · Ophiocordyceps" it />
        <Etiqueta T={T} at={s + 2.0} until={B} x={110} y={SOIL + 170} texto="hormiga carpintera · Camponotus" it={false} />
      </div>}
      {fb > 0.01 && <div style={{ position:'absolute', inset:0, opacity:fb }}>
        <div style={{ position:'absolute', left:-20, right:-20, top:CUT, height:200, background:'#8a3a1f', borderTop:`10px solid ${C.ink}`, borderBottom:`8px solid ${C.ink}`, display:'flex' }}>
          {Array.from({ length:7 }, (_, i) => <div key={i} style={{ flex:1, borderRight:`6px solid ${C.ink}`, background:'linear-gradient(180deg,#b5532c,#7a2f17)', borderRadius:'0 0 30px 30px' }}></div>)}
        </div>
        <div style={{ position:'absolute', left:0, right:0, top:CUT + 200, bottom:0, background:'#ffb3a0', backgroundImage:'radial-gradient(circle, rgba(224,72,58,.35) 18px, transparent 19px)', backgroundSize:'90px 80px' }}></div>
        <div style={{ position:'absolute', right:40, top:CUT + 30, font:`700 30px ${MONO}`, color:C.paper, opacity:0.9 }}>CUTÍCULA (LA ARMADURA)</div>
        {T > B + 0.25 && <div style={{ position:'absolute', left:CX - 22, top:CUT - 30, width:44, height:tube, background:'linear-gradient(90deg,#c98b1c,#F4C25A 50%,#c98b1c)', border:`6px solid ${C.ink}`, borderRadius:'0 0 22px 22px', boxSizing:'border-box', transform:`translateX(${drillOn ? Math.sin(T * 80) * 3 : 0}px)` }}></div>}
        {drillOn && [0, 1, 2].map((k) => { const p = ((T - s) * 3 + k / 3) % 1; return <Abs key={k} x={CX} y={CUT + 10} w={120 + p * 260} h={40 + p * 60} style={{ borderRadius:'50%', border:`6px solid ${C.ink}`, opacity:1 - p }}></Abs>; })}
        {T > B + 0.3 && CRUMBS.map((c, i) => { const t = T - B - 0.3 - (i % 6) * 0.2; if (t < 0 || t > 0.9) return null;
          return <Abs key={i} x={CX + c.vx * t} y={CUT - 10 + c.vy * t + 1400 * t * t} w={c.z} h={c.z} style={{ background:'#b5532c', border:`4px solid ${C.ink}`, transform:`rotate(${c.r + t * 500}deg)` }}></Abs>; })}
        <Abs x={CX} y={CUT - 110} w={150} h={260} style={{ borderRadius:'50%', background:'radial-gradient(ellipse at 40% 30%,#fffbe0,#F4C25A 60%,#c98b1c)', border:`8px solid ${C.ink}`, boxSizing:'border-box', boxShadow:'0 0 40px rgba(244,194,90,.8)' }}></Abs>
      </div>}
    </Bg>
  );
}

function InvasionScene({ T, K }) {
  if (!live(T, K.I, K.S)) return null;
  const s = K.I, inP = prog(T, s + 0.05, s + 0.5, MOTION.pop);
  const fung = prog(T, s + 0.6, s + 3.2, Easing.easeInOutSine);
  const ring = prog(T, s + 3.1, s + 3.5, MOTION.pop), stamp = prog(T, s + 3.4, s + 3.75, MOTION.pop);
  const bx = 789, by = 1065;
  return (
    <Bg color={C.mint} kind="dots" T={T}>
      <Abs x={CX} y={1150} w={1040} h={720} style={{ borderRadius:60, background:'rgba(22,18,15,.85)', border:OL, transform:`scale(${inP})` }}>
        <div style={{ position:'absolute', left:30, top:24, font:`700 28px ${MONO}`, color:C.mint, letterSpacing:'0.1em' }}>POR DENTRO ▸ HORMIGA INFECTADA</div>
        <div style={{ position:'absolute', inset:0, borderRadius:60, backgroundImage:'linear-gradient(rgba(47,224,168,.12) 2px, transparent 2px), linear-gradient(90deg, rgba(47,224,168,.12) 2px, transparent 2px)', backgroundSize:'60px 60px' }}></div>
      </Abs>
      <div style={{ position:'absolute', inset:0, transform:`scale(${inP})`, transformOrigin:`${CX}px 1150px` }}>
        <Ant T={T} x={CX} y={1150} w={980} xray={1} fungus={fung} zombie={1} />
      </div>
      <Etiqueta T={T} at={s + 1.2} until={s + 3.0} x={600} y={1420} texto="músculos + hongo" color={C.gold2} />
      {ring > 0.01 && <Abs x={bx} y={by} w={200} h={180} style={{ borderRadius:'50%', border:`10px solid ${C.mint}`, boxShadow:`0 0 0 6px ${C.ink}`, transform:`scale(${ring})` }}></Abs>}
      {stamp > 0.01 && <Abs x={bx - 10} y={by - 190} w={420} h={110} style={{ display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${lerp(2.4, 1, stamp)}) rotate(-8deg)`, opacity:clamp(stamp * 3, 0, 1) }}>
        <div style={{ font:`400 70px/1 ${NUM}`, color:C.ink, background:C.mint, border:`8px solid ${C.ink}`, boxShadow:`10px 10px 0 ${C.ink}`, padding:'8px 22px' }}>✓ CEREBRO</div>
      </Abs>}
    </Bg>
  );
}

/* Subida: baja de su colonia (en el árbol), cruza el suelo y sube a una planta chica. */
function SubidaScene({ T, K }) {
  if (!live(T, K.S, K.M)) return null;
  const s = K.S, GROUND = 1720, STEM = 730, CM = 26;
  const down = prog(T, s + 0.2, s + 1.4, Easing.easeInOutSine), walkP = prog(T, s + 1.5, s + 2.3, Easing.easeInOutSine), climb = prog(T, s + 2.5, s + 4.6, Easing.easeInOutSine);
  let ax, ay, rot;
  if (T < s + 1.45) { ax = 200; ay = lerp(1000, GROUND - 120, down); rot = 90; }
  else if (T < s + 2.45) { const tr = prog(T, s + 1.4, s + 1.6, MOTION.draw); ax = lerp(200, STEM - 70, walkP); ay = GROUND - 72; rot = lerp(90, 0, tr); }
  else { const tu = prog(T, s + 2.3, s + 2.6, MOTION.draw); ax = STEM - 78; ay = lerp(GROUND - 120, GROUND - 25 * CM, climb); rot = -90 * tu; }
  const hcm = clamp((GROUND - ay - 40) / CM, 0, 25) * (T > s + 2.6 ? 1 : 0);
  const lab = prog(T, s + 4.6, s + 4.95, MOTION.pop), hum = prog(T, s + 5.4, s + 5.8, MOTION.pop);
  return (
    <Bg color={C.cyan} kind="cyan" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:GROUND, bottom:0, background:'#7a3b1e', borderTop:OL }}></div>
      {/* árbol con la colonia arriba */}
      <div style={{ position:'absolute', left:40, top:-40, width:120, height:GROUND + 40, background:'linear-gradient(90deg,#5a2e16,#8a4a26 50%,#5a2e16)', border:OL, borderBottom:'none', boxSizing:'border-box' }}></div>
      <div style={{ position:'absolute', left:66, top:820, width:70, height:90, borderRadius:'35px 35px 30px 30px', background:C.ink }}></div>
      <div style={{ position:'absolute', left:20, top:760, font:`700 26px ${MONO}`, color:C.ink, background:C.yellow, padding:'2px 10px', border:`4px solid ${C.ink}` }}>COLONIA</div>
      <Ant T={T} x={150} y={600 + ((T * 60) % 200)} w={140} rot={90} walk={T * 3} walking={1} />
      {/* tallo y hoja */}
      <div style={{ position:'absolute', left:STEM, top:GROUND - 820, width:34, height:820, background:'linear-gradient(90deg,#1f7a2c,#3fbf4a 50%,#1f7a2c)', border:`6px solid ${C.ink}`, boxSizing:'border-box', borderRadius:16 }}></div>
      <div style={{ position:'absolute', left:STEM + 10, top:GROUND - 900, width:300, height:120, borderRadius:'0 100% 0 100%', background:C.leaf, border:OL, transform:'rotate(-18deg)', transformOrigin:'0 100%' }}></div>
      {/* regla */}
      <div style={{ position:'absolute', left:900, top:GROUND - 30 * CM, width:90, height:30 * CM, background:C.yellow, border:OL, boxSizing:'border-box' }}>
        {Array.from({ length:7 }, (_, i) => <div key={i} style={{ position:'absolute', left:0, top:30 * CM - i * 5 * CM - 3, width:i % 2 ? 30 : 50, height:6, background:C.ink }}>
          <div style={{ position:'absolute', left:54, top:-14, font:`700 22px ${MONO}`, color:C.ink }}>{i * 5}</div></div>)}
      </div>
      {hcm > 0 && <div style={{ position:'absolute', left:830, top:GROUND - hcm * CM - 26, width:0, height:0, borderTop:'26px solid transparent', borderBottom:'26px solid transparent', borderLeft:`60px solid ${C.pink}` }}></div>}
      <Ant T={T} x={ax} y={ay} w={300} rot={rot} walk={(T - s) * 2.4} walking={T > s + 0.2 && T < s + 4.6 ? 1 : 0} zombie={1} />
      {lab > 0.01 && <Abs x={720} y={GROUND - 25 * CM - 170} w={420} h={170} style={{ display:'flex', justifyContent:'center', transform:`scale(${lab})` }}><Big size={150} color={C.yellow} rot={-6}>25 cm</Big></Abs>}
      {hum > 0.01 && [0, 1, 2, 3, 4, 5].map((k) => { const t = ((T - s) * 0.6 + k / 6) % 1; return <Abs key={k} x={360 + k * 90} y={900 + t * 260} w={34} h={46} style={{ borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%', background:'rgba(255,255,255,.85)', border:`4px solid ${C.ink}`, opacity:hum * (1 - t) }}></Abs>; })}
      {hum > 0.01 && <Abs x={500} y={830} w={460} h={80} style={{ display:'flex', justifyContent:'center', transform:`scale(${hum}) rotate(-3deg)` }}>
        <div style={{ font:`700 40px ${MONO}`, color:C.ink, background:'#fff', border:`6px solid ${C.ink}`, padding:'4px 22px', borderRadius:14 }}>MUCHA HUMEDAD</div></Abs>}
    </Bg>
  );
}

function Leaf({ T, y, dark = 0 }) {
  return <svg viewBox="0 0 1080 420" width={W} height={420} style={{ position:'absolute', left:0, top:y - 210, overflow:'visible' }}>
    <path d="M-40 210 C 180 20, 820 -10, 1120 190 C 820 430, 180 410, -40 210 Z" fill={mix(C.leaf, C.leafD, dark)} stroke={C.ink} strokeWidth="9" />
    <path d="M-40 210 C 300 205, 700 200, 1120 190" fill="none" stroke={mix('#a6f0a0', '#5aa35a', dark)} strokeWidth="18" />
    <path d="M-40 210 C 300 205, 700 200, 1120 190" fill="none" stroke={C.ink} strokeWidth="5" strokeDasharray="0" opacity="0.5" />
    {[160, 360, 560, 760].map((x0, i) => <g key={i}><path d={`M${x0} 206 Q ${x0 + 90} 120 ${x0 + 180} 70`} fill="none" stroke={mix('#a6f0a0', '#5aa35a', dark)} strokeWidth="9" /><path d={`M${x0} 206 Q ${x0 + 90} 290 ${x0 + 180} 340`} fill="none" stroke={mix('#a6f0a0', '#5aa35a', dark)} strokeWidth="9" /></g>)}
  </svg>;
}
function MordidaScene({ T, K }) {
  if (!live(T, K.M, K.P)) return null;
  const s = K.M, inP = prog(T, s + 0.05, s + 0.5, MOTION.enter), biteT = s + 2.2;
  const bite = prog(T, biteT - 0.12, biteT, Easing.easeInQuad), sq = wobble(T, biteT, 6, 26);
  const sunA = lerp(Math.PI * 0.95, Math.PI * 0.5, prog(T, s + 0.4, s + 2.1, Easing.easeOutCubic));
  const sunX = CX + Math.cos(sunA) * 380, sunY = 1830 - Math.sin(sunA) * 300;
  const noon = T >= s + 2.1;
  return (
    <Bg color={C.orange} kind="stripes" T={T}>
      <div style={{ position:'absolute', inset:0, transform:`translateY(${(1 - inP) * -700}px)` }}>
        <Leaf T={T} y={880} />
        <div style={{ position:'absolute', inset:0, transformOrigin:'790px 1050px', transform:`scale(${1 + sq * 0.08},${1 - sq * 0.08})` }}>
          <Ant T={T} x={540} y={980} w={560} flipY walk={T} walking={T < biteT ? 0.25 : 0} bite={bite} zombie={1} />
        </div>
        <Etiqueta T={T} at={s + 0.7} until={s + 2.6} x={160} y={1240} texto="vena, por debajo de la hoja" color={C.ink} />
      </div>
      {T >= biteT && <Abs x={830} y={1250} w={420} h={160} style={{ display:'flex', justifyContent:'center', transform:`scale(${prog(T, biteT, biteT + 0.3, MOTION.pop)})` }}><Big size={130} color={C.yellow} rot={8}>¡CRAC!</Big></Abs>}
      {/* arco del sol: cerca del mediodía solar */}
      <svg viewBox="0 0 1080 420" width={W} height={420} style={{ position:'absolute', left:0, top:1500 }}>
        <path d="M160 330 A 380 300 0 0 1 920 330" fill="none" stroke={C.ink} strokeWidth="6" strokeDasharray="18 16" />
      </svg>
      <Abs x={sunX} y={sunY} w={150} h={150} style={{ borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #fff8b0, #ffe11a 60%, #f5b800)', border:OL, boxShadow:noon ? `0 0 0 14px rgba(255,225,26,.5), 0 0 60px 20px rgba(255,225,26,.6)` : 'none' }}></Abs>
      {noon && <Abs x={CX} y={1660} w={420} h={110} style={{ display:'flex', justifyContent:'center', transform:`scale(${prog(T, s + 2.1, s + 2.4, MOTION.pop)})` }}>
        <div style={{ font:`700 56px ${MONO}`, color:C.yellow, background:C.ink, border:`6px solid ${C.ink}`, padding:'4px 22px', borderRadius:14 }}>≈ MEDIODÍA</div></Abs>}
    </Bg>
  );
}

function PreguntaScene({ T, K }) {
  if (!live(T, K.P, K.Ho)) return null;
  const s = K.P, q = prog(T, s + 0.02, s + 0.4, MOTION.pop), w = wobble(T, s + 0.4, 4, 16);
  return (
    <Bg color={C.yellow} kind="dots" T={T}>
      <Abs x={330} y={1080} w={520} h={700} style={{ display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${q}) rotate(${-8 + w * 12 + Math.sin(T * 3) * 3}deg)` }}>
        <Big size={640} color={C.pink}>?</Big>
      </Abs>
    </Bg>
  );
}

const RAIN = (() => { const g = rng(31); return Array.from({ length:40 }, () => ({ t:g() * 2.2, dx:(g() - 0.5) * 700, rot:g() * 180, z:50 + g() * 40 })); })();
function HongoScene({ T, K }) {
  if (!live(T, K.Ho, K.F)) return null;
  const s = K.Ho, stalk = prog(T, s + 0.35, s + 2.4, Easing.easeOutCubic), asc = prog(T, s + 2.1, s + 2.5, MOTION.pop);
  const shake = Math.sin(T * 60) * 2 * (T > s + 0.35 && T < s + 2.4 ? 1 : 0);
  const sc = 560 / 520, top = 980 - (560 * 320 / 520) / 2;
  const ax = 540 - 280 + (lerp(345, 405, 0.62) - 6) * sc, ay = top + (320 - lerp(128, -172, 0.62)) * sc;
  return (
    <Bg color={C.violet} kind="halftone" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:1740, bottom:0, background:'#3b2416', borderTop:OL }}></div>
      <Leaf T={T} y={880} dark={0.4} />
      <div style={{ position:'absolute', inset:0, transform:`translateX(${shake}px)` }}>
        <Ant T={T} x={540} y={980} w={560} flipY bite={1} dead={1} fungus={1} stalk={stalk} ascoma={asc} />
      </div>
      <Etiqueta T={T} at={s + 1.0} until={s + 3.2} x={760} y={1150} texto="sale de la nuca" color={C.gold2} />
      {T > s + 2.6 && RAIN.map((r, i) => { const t = T - s - 2.6 - r.t; if (t < 0 || t > 1.3) return null; const f = t / 1.3;
        return <Spore key={i} x={ax + r.dx * f} y={lerp(ay, 1730, f * f)} w={r.z} rot={r.rot + t * 200} glow={0.7} />; })}
      {[0, 1].map((k) => { const x = lerp(k ? 1180 : -150, k ? 760 : 300, prog(T, s + 2.6, s + 4.2, Easing.easeOutCubic));
        return <Ant key={k} T={T} x={x} y={1690} w={190} walk={T * 3 + k} walking={T < s + 4.2 ? 1 : 0} />; })}
      <Etiqueta T={T} at={s + 3.4} until={K.F} x={90} y={1830} texto="Ophiocordyceps" it color={C.gold2} />
    </Bg>
  );
}

function FosilScene({ T, K }) {
  if (!live(T, K.F, K.Hu)) return null;
  const s = K.F, slab = prog(T, s + 0.05, s + 0.55, MOTION.pop);
  const marks = [[330, 1.3], [540, 1.55], [750, 1.8]];
  const card = prog(T, s + 0.6, s + 0.95, MOTION.pop) * (1 - prog(T, s + 3.6, s + 3.85, MOTION.draw));
  const num = prog(T, s + 3.85, s + 4.2, MOTION.pop);
  return (
    <Bg color={C.lilac} kind="riso" T={T}>
      <div style={{ position:'absolute', left:110, top:640, width:860, height:600, borderRadius:70, background:'linear-gradient(160deg,#c9c2b8,#8f877d)', border:OL, boxShadow:`18px 18px 0 ${C.ink}`, transform:`translateY(${(1 - slab) * 1200}px) rotate(${-3 + (1 - slab) * 18}deg)`, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(0,0,0,.12) 5px, transparent 6px)', backgroundSize:'34px 30px' }}></div>
        <svg viewBox="0 0 860 600" width="860" height="600" style={{ position:'absolute', inset:0 }}>
          <path d="M40 300 C 200 90, 660 70, 820 280 C 660 520, 200 520, 40 300 Z" fill="rgba(60,52,44,.25)" stroke="rgba(40,34,28,.7)" strokeWidth="7" />
          <path d="M40 300 C 300 296, 560 290, 820 280" fill="none" stroke="rgba(40,34,28,.75)" strokeWidth="10" />
          {[160, 330, 500, 640].map((x0, i) => <g key={i} stroke="rgba(40,34,28,.55)" strokeWidth="6" fill="none"><path d={`M${x0} 296 Q ${x0 + 70} 210 ${x0 + 140} 160`} /><path d={`M${x0} 296 Q ${x0 + 70} 380 ${x0 + 140} 430`} /></g>)}
          {marks.map(([mx, d], i) => { const p = prog(T, s + d, s + d + 0.3, MOTION.pop); return <g key={i} transform={`translate(${mx - 110} ${294 - (mx - 110) * 0.02})`} opacity={p}>
            <ellipse cx="-18" cy="0" rx="13" ry="20" fill="#3a332c" /><ellipse cx="18" cy="0" rx="13" ry="20" fill="#3a332c" /><rect x="-12" y="-5" width="24" height="10" fill="#3a332c" />
            <circle cx="0" cy="0" r={46 + (1 - p) * 40} fill="none" stroke={C.yellow} strokeWidth="9" />
          </g>; })}
        </svg>
      </div>
      {card > 0.01 && <Abs x={660} y={1500} w={600} h={300} style={{ display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${card}) rotate(-2deg)` }}>
        <div style={{ background:C.paper, border:`7px solid ${C.ink}`, borderRadius:26, padding:'14px 40px 20px', textAlign:'center', boxShadow:`14px 14px 0 ${C.ink}` }}>
          <div style={{ font:`400 140px/1 ${NUM}`, color:C.gold, WebkitTextStroke:`5px ${C.ink}` }}>2010</div>
          <div style={{ font:`900 42px ${FONT}`, color:C.ink, marginTop:4 }}>Messel, Alemania</div>
        </div>
      </Abs>}
      {num > 0.01 && <div style={{ position:'absolute', left:420, width:520, top:1320, display:'flex', flexDirection:'column', alignItems:'center', gap:4, transform:`scale(${num})` }}>
        <Big size={280} color={C.yellow} rot={-3}>48</Big>
        <div style={{ font:`700 40px ${MONO}`, color:C.ink, background:C.yellow, border:`6px solid ${C.ink}`, padding:'6px 22px', transform:'rotate(-2deg)' }}>MILLONES DE AÑOS</div>
      </div>}
    </Bg>
  );
}

/* Humanos + Calor: ¿a ti? No: es especialista en hormigas; y la mayoría de los hongos no crece a 37 °C. */
function Persona({ x, y, s = 1 }) {
  return <div style={{ position:'absolute', left:x - 150 * s, top:y - 200 * s, width:300 * s, height:400 * s }}>
    <div style={{ position:'absolute', left:75 * s, top:0, width:150 * s, height:150 * s, borderRadius:'50%', background:'#f2c49b', border:OL, boxSizing:'border-box' }}></div>
    <div style={{ position:'absolute', left:0, top:165 * s, width:300 * s, height:235 * s, borderRadius:`${140 * s}px ${140 * s}px 30px 30px`, background:C.cyan, border:OL, boxSizing:'border-box' }}></div>
  </div>;
}
function HumanosScene({ T, K }) {
  if (!live(T, K.Hu, K.Ci)) return null;
  const s = K.Hu, c = K.Ca;
  const inA = prog(T, s + 0.1, s + 0.5, MOTION.pop), outA = prog(T, c - 0.2, c + 0.2, MOTION.draw);
  const no = prog(T, s + 2.3, s + 2.65, MOTION.pop), ok = prog(T, s + 2.6, s + 2.95, MOTION.pop);
  const th = prog(T, c + 0.05, c + 0.5, MOTION.pop), fill = prog(T, c + 0.5, c + 1.9, Easing.easeOutCubic);
  const t37 = prog(T, c + 1.7, c + 2.0, MOTION.pop), chip = prog(T, c + 2.2, c + 2.6, MOTION.pop);
  return (
    <Bg color={C.red} kind="pop" T={T}>
      {outA < 1 && <div style={{ position:'absolute', inset:0, opacity:1 - outA, transform:`scale(${inA})`, transformOrigin:'540px 1050px' }}>
        <Ant T={T} x={290} y={1050} w={380} walk={T * 2} walking={0.4} />
        {ok > 0.01 && <Abs x={290} y={1050} w={440} h={340} style={{ borderRadius:'50%', border:`12px solid ${C.mint}`, boxShadow:`0 0 0 6px ${C.ink}`, transform:`scale(${ok})` }}></Abs>}
        <Persona x={790} y={1030} s={0.9} />
        {no > 0.01 && <Abs x={790} y={1030} w={360} h={200} style={{ display:'flex', justifyContent:'center', alignItems:'center', transform:`scale(${lerp(2.4, 1, no)}) rotate(-10deg)`, opacity:clamp(no * 3, 0, 1) }}>
          <div style={{ font:`400 150px/1 ${NUM}`, color:C.ink, background:C.yellow, border:`12px solid ${C.ink}`, boxShadow:`14px 14px 0 ${C.ink}`, padding:'0 40px' }}>NO</div></Abs>}
        {ok > 0.01 && <Abs x={290} y={850} w={520} h={80} style={{ display:'flex', justifyContent:'center', transform:`scale(${ok})` }}>
          <div style={{ font:`700 38px ${MONO}`, color:C.ink, background:C.mint, border:`6px solid ${C.ink}`, padding:'4px 18px', borderRadius:12 }}>SOLO HORMIGAS</div></Abs>}
      </div>}
      {T >= c && <div style={{ position:'absolute', left:150, top:740, width:200, height:900, transform:`translateY(${(1 - th) * 1200}px) rotate(${-6 + Math.sin(T * 3) * 1.5}deg)` }}>
        <div style={{ position:'absolute', left:50, top:0, width:100, height:720, borderRadius:50, background:'#fff', border:OL, boxSizing:'border-box', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:22, right:22, bottom:0, height:`${20 + fill * 66}%`, background:C.red, borderRadius:30 }}></div>
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position:'absolute', right:0, top:90 + i * 100, width:30, height:6, background:C.ink }}></div>)}
        </div>
        <div style={{ position:'absolute', left:0, top:640, width:200, height:200, borderRadius:'50%', background:C.red, border:OL, boxSizing:'border-box' }}></div>
      </div>}
      {t37 > 0.01 && <Abs x={620} y={900} w={420} h={170} style={{ display:'flex', justifyContent:'center', transform:`scale(${t37})` }}><Big size={150} color={C.white} rot={-6}>37 °C</Big></Abs>}
      {chip > 0.01 && <Abs x={640} y={1110} w={620} h={170} style={{ display:'flex', justifyContent:'center', alignItems:'center', transform:`scale(${chip}) rotate(2deg)` }}>
        <div style={{ font:`900 40px/1.15 ${FONT}`, color:C.ink, background:C.yellow, border:`7px solid ${C.ink}`, boxShadow:`10px 10px 0 ${C.ink}`, padding:'12px 24px', textAlign:'center' }}>La mayoría de los hongos<br />no crece a 37 °C</div></Abs>}
    </Bg>
  );
}

/* Cierre: la misma imagen del inicio (fondo rosa, la hormiga y la marioneta), ahora prendida de la hoja con el tallo del hongo. */
function CierreScene({ T, K }) {
  if (T < K.Ci) return null;
  const s = K.Ci, inP = prog(T, s + 0.05, s + 0.6, MOTION.enter), bar = prog(T, s + 1.2, s + 1.9, MOTION.pop);
  return (
    <Bg color={C.pink} kind="pop" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:1440, height:480, background:'#7a3b1e', borderTop:OL, backgroundImage:'radial-gradient(circle, rgba(0,0,0,.18) 6px, transparent 7px)', backgroundSize:'48px 48px' }}></div>
      <div style={{ position:'absolute', inset:0, transform:`translateY(${(1 - inP) * -600}px)` }}>
        <Leaf T={T} y={880} />
        <Ant T={T} x={540} y={980} w={560} flipY bite={1} dead={1} fungus={1} stalk={1} ascoma={1} />
      </div>
      {bar > 0.01 && <Marioneta T={T} x={CX} y={lerp(-200, 660, bar)} a={bar * 0.5} puntos={[[CX - 160, 1000], [CX + 160, 960], [CX + 40, 1010], [CX - 40, 990]]} />}
    </Bg>
  );
}

/* ================= TRANSICIONES ================= */
function Burst({ T, tc, kind, colors, seed, glyph, dir = 1, chaos = 1, flash = true }) {
  const u = T - tc;
  if (u < -0.58 || u > 0.6) return null;
  const n = colors.length;
  const IN = (a, b) => prog(T, a, b, MOTION.enter), OUT = (a, b) => prog(T, a, b, MOTION.draw);
  let base = null;
  if (kind === 'slats') {
    const N = 9;
    base = <div style={{ position:'absolute', left:-W * 0.7, top:-H * 0.25, width:W * 2.4, height:H * 1.5, display:'flex', flexDirection:'column', transform:`rotate(${-20 * dir}deg)` }}>
      {Array.from({ length:N }, (_, i) => { const side = i % 2 ? 1 : -1, s2 = tc + 0.05 + i * 0.028;
        const x = T < s2 ? lerp(side * -110, 0, IN(tc - 0.55 + i * 0.022, tc - 0.12 + i * 0.01)) : lerp(0, side * 110, OUT(s2, s2 + 0.36));
        return <div key={i} style={{ flex:1, marginTop:-2, background:colors[i % n], transform:`translateX(${x}%)`, borderTop:OL }}></div>; })}
    </div>;
  } else if (kind === 'honey') {
    // panal de hexágonos que crece desde el centro
    const cells = [], R = 130, hw = R * 1.5, hh = R * Math.sqrt(3);
    for (let c = -1; c < W / hw + 1; c++) for (let r = -1; r < H / hh + 1; r++) {
      const x = c * hw, y = r * hh + (c % 2 ? hh / 2 : 0), d = Math.hypot(x - CX, y - H / 2) / 1100;
      const p = T < tc + 0.04 ? IN(tc - 0.55 + d * 0.3, tc - 0.25 + d * 0.3) : 1 - OUT(tc + 0.05 + (1 - d) * 0.22, tc + 0.3 + (1 - d) * 0.22);
      cells.push(<div key={c + '_' + r} style={{ position:'absolute', left:x - R, top:y - hh / 2 - 2, width:R * 2 + 4, height:hh + 4, clipPath:HEX, background:colors[(c * 2 + r * 3 + 9) % n], transform:`scale(${p * 1.04})` }}></div>);
    }
    base = <div style={{ position:'absolute', inset:0 }}>{cells}</div>;
  } else if (kind === 'tiles') {
    const cols = 5, rows = 9, tw = W / cols, th = H / rows, tiles = [];
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const d1 = ((dir > 0 ? c : cols - 1 - c) + r) / (cols + rows - 2) * 0.25, d2 = 0.25 - d1;
      const p = T < tc + 0.04 ? IN(tc - 0.55 + d1, tc - 0.3 + d1) : 1 - OUT(tc + 0.05 + d2, tc + 0.3 + d2);
      tiles.push(<div key={c + '-' + r} style={{ position:'absolute', left:c * tw - 1, top:r * th - 1, width:tw + 2, height:th + 2, background:colors[(c * 3 + r * 5) % n], transform:`scale(${p * 1.02}) rotate(${(1 - p) * 90 * dir}deg)` }}></div>);
    }
    base = <div style={{ position:'absolute', inset:0 }}>{tiles}</div>;
  } else {
    const r = rng(seed), cx = W * (0.3 + r() * 0.4), cy = H * (0.35 + r() * 0.3), D = 2 * Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) + 40;
    base = <div style={{ position:'absolute', inset:0 }}>{Array.from({ length:7 }, (_, k) => { const dk = D * (1 - k * 0.13), s2 = tc + 0.05 + (6 - k) * 0.04;
      const p = T < s2 ? IN(tc - 0.55 + k * 0.04, tc - 0.22 + k * 0.03) : 1 - OUT(s2, s2 + 0.32);
      return <div key={k} style={{ position:'absolute', left:cx - dk / 2, top:cy - dk / 2, width:dk, height:dk, borderRadius:'50%', background:colors[k % n], border:OL, transform:`scale(${p})` }}></div>; })}</div>;
  }
  const r = rng(seed * 31 + 5), ns = Math.round(9 * chaos);
  const shards = Array.from({ length:ns }, (_, i) => {
    const x = r() * W, y = r() * H, z = 120 + r() * 240, rot = r() * 360, a = Math.atan2(y - H / 2, x - W / 2);
    const poly = `polygon(${r() * 40}% 0%, 100% ${30 + r() * 60}%, ${r() * 30}% 100%)`;
    const sc = u < 0 ? prog(T, tc - 0.42 + i * 0.02, tc - 0.18 + i * 0.02, MOTION.pop) : 1 - OUT(tc + 0.12, tc + 0.42);
    return <div key={i} style={{ position:'absolute', left:x - z / 2, top:y - z / 2, width:z, height:z, clipPath:poly, background:i % 2 ? C.ink : colors[(i + 2) % n], transform:`translate(${Math.cos(a) * u * 800}px, ${Math.sin(a) * u * 800}px) rotate(${rot + u * 220 * dir}deg) scale(${sc})` }}></div>;
  });
  const gs = lerp(2.6, 1, IN(tc - 0.25, tc + 0.2)), go = T < tc - 0.25 ? 0 : 1 - OUT(tc + 0.2, tc + 0.42);
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {base}
      {shards}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:go }}>
        <div style={{ font:`400 ${glyph.length > 3 ? 280 : 420}px/1 ${NUM}`, color:colors[1 % n], WebkitTextStroke:`10px ${C.ink}`, transform:`scale(${gs}) rotate(${-8 * dir}deg)`, textShadow:`20px 20px 0 ${C.ink}`, whiteSpace:'nowrap' }}>{glyph}</div>
      </div>
      {flash && u >= 0 && u < 0.045 ? <div style={{ position:'absolute', inset:0, background:colors[2 % n] }}></div> : null}
    </div>
  );
}

/* ================= SUBTÍTULOS ================= */
function Headline({ T, idx, at, until, y, lines, hi, tilt = 0 }) {
  // Versión narrada: los tiempos de cada subtítulo vienen de la voz generada (window.SUBS, en tiempo de autor).
  const o = window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = prog(T, until - 0.25, until, MOTION.draw), c = hi;
  return (
    <div style={{ position:'absolute', left:60, right:60, top:y, display:'flex', flexDirection:'column', alignItems:'center', gap:18, textAlign:'center', opacity:1 - out, transform:`translateY(calc(-50% - ${out * 40}px)) rotate(${tilt}deg)`, zIndex:30 }}>
      {lines.map((ln, li) => { let on = false; return (
        <div key={li} style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:ln.mono ? '0.45em' : '0.24em',
          font:ln.mono ? `800 ${ln.size}px ${FONT}` : `900 ${ln.size}px/1 ${FONT}`, fontStyle:ln.it ? 'italic' : 'normal', fontVariationSettings:ln.mono ? "'wdth' 110" : "'wdth' 96", letterSpacing:ln.mono ? '0.12em' : '-0.02em',
          textTransform:ln.mono && !ln.it ? 'uppercase' : 'none', color:INK, textShadow:ln.mono ? SHADOW : '0 6px 0 rgba(0,0,0,.9), 0 0 34px rgba(0,0,0,.95)' }}>
          {ln.t.split(' ').map((w, wi) => {
            let word = w; if (word.startsWith('*')) { on = true; word = word.slice(1); }
            const isAcc = on; if (word.includes('*')) { word = word.replace('*', ''); on = false; }
            const t0 = at + (ln.d || 0) + wi * 0.06, p = prog(T, t0, t0 + 0.45, MOTION.enter), s = prog(T, t0, t0 + 0.4, MOTION.pop);
            if (isAcc && !ln.mono) {
              const wipe = prog(T, t0 + 0.05, t0 + 0.35, MOTION.enter), pulse = 1 + 0.08 * Math.max(0, wobble(T, t0 + 0.5, 5, 14)), clip = `inset(0 ${(1 - wipe) * 100}% 0 0)`;
              return <span key={wi} style={{ display:'inline-block', position:'relative', opacity:p, color:DARK, textShadow:'none', padding:'0.04em 0.16em 0.08em', margin:'0 0.02em', transform:`translateY(${(1 - p) * 50}px) scale(${lerp(1.5, 1, s) * pulse}) rotate(${wi % 2 ? 2 : -2}deg)` }}>
                <span style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.85)', transform:'translate(8px,8px) skewX(-8deg)', clipPath:clip }}></span>
                <span style={{ position:'absolute', inset:0, background:c, transform:'skewX(-8deg)', clipPath:clip }}></span>
                <span style={{ position:'relative' }}>{word}</span>
              </span>;
            }
            return <span key={wi} style={{ display:'inline-block', opacity:ln.mono ? p * 0.95 : p, transform:`translateY(${(1 - p) * 50}px) scale(${lerp(1.35, 1, s)})` }}>{word}</span>;
          })}
        </div>); })}
    </div>
  );
}

/* ================= PIEZA ================= */
function Piece() {
  const { T, CUES, time, playing } = useComposition();
  const K = { G:CUES.Gancho, E:CUES.Espora, I:CUES.Invasion, S:CUES.Subida, M:CUES.Mordida, P:CUES.Pregunta, Ho:CUES.Hongo, F:CUES.Fosil, Hu:CUES.Humanos, Ca:CUES.Calor, Ci:CUES.Cierre, V:CUES.Outro };
  const shakes = [[K.E + 0.7, 16], [K.E + 2.6, 10], [K.I + 3.4, 16], [K.S + 4.6, 12], [K.M + 2.2, 26], [K.P + 0.4, 14], [K.Ho + 2.1, 14], [K.F + 0.5, 22], [K.Hu + 2.3, 22]];
  let sh = 0; shakes.forEach(([h, a]) => { if (T >= h && T < h + 0.5) sh += a * (1 - prog(T, h, h + 0.5)); });
  const sx = Math.sin(T * 97) * sh, sy = Math.cos(T * 83) * sh;
  let lc = -9; [K.E, K.I, K.S, K.M, K.P, K.Ho, K.F, K.Hu, K.Ca, K.Ci].forEach((c) => { if (T >= c) lc = c; });
  const lv = T < K.V ? 1 : 0;
  const ck = lv * Math.exp(-(T - lc) * 10), drift = lv * 0.02 * Math.sin(T * 0.8);
  const zoom = 1 + 0.08 * ck + drift;
  const cutFlash = lv * Math.max(0, 1 - (T - lc) / 0.09);
  const P = { T, K };
  const HP = { T };
  const bursts = [
    { tc:K.E, kind:'honey', colors:[C.pink, C.yellow, C.blue, C.paper, C.gold2], seed:2, glyph:'ESPORA', dir:1 },
    { tc:K.I, kind:'slats', colors:[C.blue, C.mint, C.yellow, C.ink, C.gold2], seed:3, glyph:'RX', dir:-1 },
    { tc:K.S, kind:'rings', colors:[C.mint, C.cyan, C.pink, C.ink, C.yellow], seed:4, glyph:'↑', dir:1 },
    { tc:K.M, kind:'honey', colors:[C.cyan, C.orange, C.yellow, C.leaf, C.ink], seed:5, glyph:'HOJA', dir:-1 },
    { tc:K.Ho, kind:'tiles', colors:[C.yellow, C.violet, C.coral, C.gold2, C.ink], seed:6, glyph:'BROTA', dir:1 },
    { tc:K.F, kind:'slats', colors:[C.violet, C.lilac, C.yellow, C.stone, C.ink], seed:7, glyph:'48', dir:-1 },
    { tc:K.Hu, kind:'rings', colors:[C.lilac, C.red, C.yellow, C.ink, C.pink], seed:8, glyph:'¿TÚ?', dir:1 },
    { tc:K.Ci, kind:'honey', colors:[C.red, C.pink, C.ink, C.yellow, C.gold2], seed:9, glyph:'!!', dir:-1 },
  ];
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position:'absolute', left:0, top:0, width:W, height:H, overflow:'hidden', background:C.ink }}>
      <div style={{ position:'absolute', inset:0, transform:`translate(${sx}px,${sy}px) scale(${zoom})` }}>
        <GanchoScene {...P} />
        <EsporaScene {...P} />
        <InvasionScene {...P} />
        <SubidaScene {...P} />
        <MordidaScene {...P} />
        <PreguntaScene {...P} />
        <HongoScene {...P} />
        <FosilScene {...P} />
        <HumanosScene {...P} />
        <CierreScene {...P} />
        {bursts.map((b, i) => <Burst key={i} T={T} {...b} />)}
      </div>
      {cutFlash > 0 && <div style={{ position:'absolute', inset:0, background:'#fff', opacity:cutFlash * 0.45, pointerEvents:'none' }}></div>}
      {/* Subtítulos: siempre en la franja alta (fuera del tercio inferior). idx = línea de narracion.json */}
      <Headline {...HP} idx={0} hi={C.yellow} tilt={-2} at={K.G + 0.1} until={K.E - 0.05} y={930} lines={[{ t:'Esa hormiga no está paseando:', size:64 }, { t:'*la maneja un hongo.*', size:104, d:0.25 }]} />
      <Headline {...HP} idx={1} hi={C.gold2} tilt={1.5} at={K.E + 0.2} until={K.E + 3.3} y={520} lines={[{ t:'Una espora se le pega a una *hormiga carpintera*', size:76 }]} />
      <Headline {...HP} idx={2} hi={C.yellow} tilt={-1.5} at={K.E + 3.35} until={K.I - 0.05} y={520} lines={[{ t:'y se *mete a su cuerpo.*', size:96 }]} />
      <Headline {...HP} idx={3} hi={C.gold2} tilt={1.5} at={K.I + 0.2} until={K.I + 3.0} y={500} lines={[{ t:'Crece y *envuelve sus músculos,*', size:84 }]} />
      <Headline {...HP} idx={4} hi={C.mint} tilt={-2} at={K.I + 3.05} until={K.S - 0.05} y={500} lines={[{ t:'pero no invade *su cerebro.*', size:88 }, { t:'Hipótesis: la maneja desde los músculos', size:30, d:0.8, mono:true }]} />
      <Headline {...HP} idx={5} hi={C.pink} tilt={1.5} at={K.S + 0.2} until={K.S + 3.0} y={500} lines={[{ t:'Deja su colonia y *se va a una planta.*', size:84 }]} />
      <Headline {...HP} idx={6} hi={C.yellow} tilt={-1.5} at={K.S + 3.05} until={K.M - 0.05} y={500} lines={[{ t:'Suele parar a unos *25 cm del suelo.*', size:84 }]} />
      <Headline {...HP} idx={7} hi={C.yellow} tilt={2} at={K.M + 0.2} until={K.M + 3.0} y={470} lines={[{ t:'Muerde una vena de la hoja… *cerca del mediodía,*', size:76 }]} />
      <Headline {...HP} idx={8} hi={C.coral} tilt={-1.5} at={K.M + 3.05} until={K.P - 0.05} y={470} lines={[{ t:'y ya no la *suelta.*', size:110 }, { t:'La «mordida de la muerte»', size:30, d:0.7, mono:true }]} />
      <Headline {...HP} idx={9} hi={C.pink} tilt={1.5} at={K.P + 0.1} until={K.Ho - 0.05} y={470} lines={[{ t:'¿Y para qué *tanto trabajo?*', size:96 }]} />
      <Headline {...HP} idx={10} hi={C.gold2} tilt={-2} at={K.Ho + 0.2} until={K.F - 0.05} y={470} lines={[{ t:'Ya muerta, de su nuca *brota un tallo*', size:80 }, { t:'y suelta esporas al suelo', size:32, d:0.8, mono:true }]} />
      <Headline {...HP} idx={11} hi={C.yellow} tilt={1.5} at={K.F + 0.2} until={K.Hu - 0.05} y={470} lines={[{ t:'Estas mordidas, en una *hoja fósil.*', size:84 }]} />
      <Headline {...HP} idx={12} hi={C.yellow} tilt={-1.5} at={K.Hu + 0.2} until={K.Ca - 0.05} y={500} lines={[{ t:'¿Y a ti? Tranquilo: es *especialista en hormigas.*', size:76 }]} />
      <Headline {...HP} idx={13} hi={C.mint} tilt={1.5} at={K.Ca + 0.2} until={K.Ci - 0.05} y={500} lines={[{ t:'Y la mayoría de los hongos *no aguanta tus 37 °C.*', size:76 }]} />
      <Headline {...HP} idx={14} hi={C.gold2} tilt={-2} at={K.Ci + 0.2} until={K.V - 0.05} y={430} lines={[{ t:'No estaba descansando:', size:84 }, { t:'*la manejó un hongo.*', size:112, d:0.25 }]} />
      {/* Robert en pantalla (tabla en guion.md). Tiempos atados a cada escena: en la narrada se recorren solos. */}
      <Robert T={T} apariciones={[
        [0, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.E + 2.9, K.I - 0.15, 'avatar_13_senalando_arriba', 'abajo-izq'],
        [K.I + 3.9, K.S - 0.1, 'avatar_06_pensativo_menton', 'abajo-izq'],
        [K.S + 4.7, K.M - 0.1, 'avatar_04_bajando_lentes', 'abajo-izq'],
        [K.M + 2.6, K.P - 0.1, 'avatar_10_serio_molesto', 'abajo-izq'],
        [K.P + 0.05, K.Ho + 0.9, 'avatar_07_pensativo_puno', 'presentador'],
        [K.F + 3.9, K.Hu - 0.1, 'avatar_11_sorprendido', 'abajo-izq'],
        [K.Hu + 2.2, K.Ca - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'abajo-izq'],
        [K.Ca + 0.5, K.Ci - 0.1, 'avatar_13_senalando_arriba', 'abajo-der'],
        [K.Ci + 1.2, K.V - 0.1, 'avatar_08_recostado_mano', 'abajo-izq'],
      ]} />
      <MarcaAgua T={T} tema="biologia" num="02" hasta={K.V} />
      <CierreMarca T={T} at={K.V} tema="biologia" robert={AV('avatar_02_apuntando_camara')} />
      <AudioTrack src={window.AUDIO_SRC || 'assets/mezcla.wav'} T={time} playing={playing} />
    </div>
  );
}
function AudioTrack({ src, T, playing }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    if (playing) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(a.currentTime - T) > 0.25) a.currentTime = T; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - T) > 0.05) a.currentTime = T; }
  });
  return <audio ref={ref} src={src} preload="auto" style={{ display:'none' }} />;
}

function ShotHormigaApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.ink}>
        <Piece />
      </CompositionStage>
    </div>
  );
}
window.ShotHormigaApp = ShotHormigaApp;
