// Shot: La hormiga zombi (Ophiocordyceps) — versión sin voz (música + subtítulos).
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
  const st = clamp(stalk, 0, 1), sx2 = 395 + 70 * st, sy2 = 80 - 270 * st;
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
        {/* tallo del hongo (estroma) que brota detrás de la cabeza */}
        {st > 0.01 && <g>
          <path d={`M395 82 Q ${380 + 10 * st} ${80 - 150 * st} ${sx2} ${sy2}`} fill="none" stroke={C.ink} strokeWidth="26" strokeLinecap="round" />
          <path d={`M395 82 Q ${380 + 10 * st} ${80 - 150 * st} ${sx2} ${sy2}`} fill="none" stroke="#d8b48a" strokeWidth="14" strokeLinecap="round" />
          {ascoma > 0.01 && <g transform={`translate(${lerp(395, sx2, 0.62) - 6} ${lerp(80, sy2, 0.62)}) scale(${ascoma})`}>
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

/* ================= ESCENAS ================= */
function HookScene({ T, K }) {
  if (!live(T, K.H, K.E)) return null;
  const s = K.H, land = s + 1.25;
  const ax = lerp(-300, CX, prog(T, s, s + 0.95, Easing.easeOutCubic));
  const fall = prog(T, s + 0.75, land, Easing.easeInCubic);
  const sq = wobble(T, land, 6, 24);
  const ring = prog(T, land, land + 0.6, MOTION.enter);
  const zomb = T > s + 1.7 ? 1 : 0, zw = wobble(T, s + 1.7, 5, 30);
  return (
    <Bg color={C.pink} kind="pop" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:1440, height:480, background:'#7a3b1e', borderTop:OL, backgroundImage:'radial-gradient(circle, rgba(0,0,0,.18) 6px, transparent 7px)', backgroundSize:'48px 48px' }}></div>
      {T < land && <Spore x={CX + 40 + (1 - fall) * 260} y={lerp(-200, 1180, fall)} w={240} rot={-50 + fall * 50} />}
      {T >= land && ring < 1 && <Abs x={CX} y={1250} w={560} h={560} style={{ borderRadius:'50%', border:`22px solid ${C.yellow}`, boxSizing:'border-box', opacity:1 - ring, transform:`scale(${0.3 + ring * 1.9})` }}></Abs>}
      <div style={{ position:'absolute', inset:0, transformOrigin:`${CX}px 1440px`, transform:`scale(${1 + sq * 0.12},${1 - sq * 0.18}) rotate(${zw * 6}deg)` }}>
        <Ant T={T} x={ax} y={1362} w={620} walk={(T - s) * 2.2} walking={T < s + 1.0 ? 1 : 0} zombie={zomb} />
        {T >= land && <Spore x={CX - 20} y={1250} w={180} rot={-8} glow={0.6} />}
      </div>
      {T >= land && <Abs x={CX + 260} y={1040} w={380} h={150} style={{ display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${prog(T, land + 0.02, land + 0.35, MOTION.pop)})` }}><Big size={130} rot={-10}>¡PLOC!</Big></Abs>}
    </Bg>
  );
}

const CRUMBS = (() => { const g = rng(9); return Array.from({ length:16 }, () => ({ vx:(g() - 0.5) * 900, vy:-300 - g() * 600, z:16 + g() * 22, r:g() * 360 })); })();
function EsporaScene({ T, K }) {
  if (!live(T, K.E, K.I)) return null;
  const s = K.E, land = s + 0.75;
  const fall = prog(T, s + 0.15, land, Easing.easeInCubic), sq = wobble(T, land, 6, 22);
  const drill = prog(T, s + 2.9, s + 4.6, Easing.easeInOutQuad), drillOn = T > s + 2.9 && T < s + 4.7;
  const tube = 60 + drill * 300, CUT = 1180;
  return (
    <Bg color={C.blue} kind="grid" T={T}>
      {/* armadura (cutícula) en primer plano */}
      <div style={{ position:'absolute', left:-20, right:-20, top:CUT, height:200, background:'#8a3a1f', borderTop:`10px solid ${C.ink}`, borderBottom:`8px solid ${C.ink}`, display:'flex' }}>
        {Array.from({ length:7 }, (_, i) => <div key={i} style={{ flex:1, borderRight:`6px solid ${C.ink}`, background:'linear-gradient(180deg,#b5532c,#7a2f17)', borderRadius:'0 0 30px 30px' }}></div>)}
      </div>
      <div style={{ position:'absolute', left:0, right:0, top:CUT + 200, bottom:0, background:'#ffb3a0', backgroundImage:'radial-gradient(circle, rgba(224,72,58,.35) 18px, transparent 19px)', backgroundSize:'90px 80px' }}></div>
      <div style={{ position:'absolute', left:40, top:CUT + 30, font:`700 30px ${MONO}`, color:C.paper, opacity:0.9 }}>CUTÍCULA</div>
      {/* tubo germinal que perfora */}
      {T > s + 2.9 && <div style={{ position:'absolute', left:CX - 26, top:CUT - 40, width:52, height:tube, background:'linear-gradient(90deg,#c98b1c,#F4C25A 50%,#c98b1c)', border:`6px solid ${C.ink}`, borderRadius:'0 0 26px 26px', boxSizing:'border-box', transform:`translateX(${drillOn ? Math.sin(T * 80) * 3 : 0}px)` }}></div>}
      {drillOn && [0, 1, 2].map((k) => { const p = ((T - s) * 3 + k / 3) % 1; return <Abs key={k} x={CX} y={CUT + 10} w={120 + p * 260} h={40 + p * 60} style={{ borderRadius:'50%', border:`6px solid ${C.ink}`, opacity:1 - p }}></Abs>; })}
      {T > s + 2.95 && CRUMBS.map((c, i) => { const t = T - s - 2.95 - (i % 6) * 0.22; if (t < 0 || t > 0.9) return null;
        return <Abs key={i} x={CX + c.vx * t} y={CUT - 10 + c.vy * t + 1400 * t * t} w={c.z} h={c.z} style={{ background:'#b5532c', border:`4px solid ${C.ink}`, transform:`rotate(${c.r + t * 500}deg)` }}></Abs>; })}
      <div style={{ position:'absolute', left:0, right:0, top:0, bottom:0, transformOrigin:`${CX}px ${CUT}px`, transform:`scale(${1 + sq * 0.15},${1 - sq * 0.2})` }}>
        <Spore x={CX + (1 - fall) * 300} y={lerp(-200, CUT - 70, fall)} w={560} rot={(1 - fall) * -40} glow={1} />
      </div>
      {T > s + 3.1 && [0, 1, 2, 3].map((k) => { const t = ((T - s - 3.1) * 1.4 + k * 0.25) % 1; return <Abs key={k} x={CX + (k - 1.5) * 150} y={CUT - 120 - t * 160} w={44} h={44} style={{ borderRadius:'50%', background:'rgba(0,210,255,.85)', border:`5px solid ${C.ink}`, opacity:1 - t, transform:`scale(${0.6 + t * 0.6})` }}></Abs>; })}
    </Bg>
  );
}

function InvasionScene({ T, K }) {
  if (!live(T, K.I, K.S)) return null;
  const s = K.I, inP = prog(T, s + 0.05, s + 0.5, MOTION.pop);
  const fung = prog(T, s + 0.6, s + 3.4, Easing.easeInOutSine);
  const ring = prog(T, s + 3.2, s + 3.6, MOTION.pop), stamp = prog(T, s + 3.5, s + 3.85, MOTION.pop);
  const bx = 789, by = 1065;
  return (
    <Bg color={C.mint} kind="dots" T={T}>
      <Abs x={CX} y={1150} w={1040} h={720} style={{ borderRadius:60, background:'rgba(22,18,15,.85)', border:OL, transform:`scale(${inP})` }}>
        <div style={{ position:'absolute', left:30, top:24, font:`700 28px ${MONO}`, color:C.mint, letterSpacing:'0.1em' }}>RAYOS X ▸ HORMIGA INFECTADA</div>
        <div style={{ position:'absolute', inset:0, borderRadius:60, backgroundImage:'linear-gradient(rgba(47,224,168,.12) 2px, transparent 2px), linear-gradient(90deg, rgba(47,224,168,.12) 2px, transparent 2px)', backgroundSize:'60px 60px' }}></div>
      </Abs>
      <div style={{ position:'absolute', inset:0, transform:`scale(${inP})`, transformOrigin:`${CX}px 1150px` }}>
        <Ant T={T} x={CX} y={1150} w={980} xray={1} fungus={fung} zombie={1} />
      </div>
      {ring > 0.01 && <Abs x={bx} y={by} w={200} h={180} style={{ borderRadius:'50%', border:`10px solid ${C.mint}`, boxShadow:`0 0 0 6px ${C.ink}`, transform:`scale(${ring})` }}></Abs>}
      {stamp > 0.01 && <Abs x={bx - 10} y={by - 190} w={420} h={110} style={{ display:'flex', alignItems:'center', justifyContent:'center', transform:`scale(${lerp(2.4, 1, stamp)}) rotate(-8deg)`, opacity:clamp(stamp * 3, 0, 1) }}>
        <div style={{ font:`400 70px/1 ${NUM}`, color:C.ink, background:C.mint, border:`8px solid ${C.ink}`, boxShadow:`10px 10px 0 ${C.ink}`, padding:'8px 22px' }}>✓ CEREBRO</div>
      </Abs>}
    </Bg>
  );
}

function SubidaScene({ T, K }) {
  if (!live(T, K.S, K.M)) return null;
  const s = K.S, GROUND = 1720, STEM = 730, CM = 26;
  const walkP = prog(T, s + 0.3, s + 2.0, Easing.easeInOutSine), turn = prog(T, s + 2.0, s + 2.4, MOTION.draw), climb = prog(T, s + 2.4, s + 4.6, Easing.easeInOutSine);
  const ax = T < s + 2.0 ? lerp(240, STEM - 70, walkP) : lerp(STEM - 70, STEM - 78, turn);
  const ay = T < s + 2.4 ? lerp(GROUND - 72, GROUND - 120, turn) : lerp(GROUND - 120, GROUND - 25 * CM, climb);
  const rot = -90 * turn;
  const hcm = clamp((GROUND - ay - 40) / CM, 0, 25) * (T > s + 2.3 ? 1 : 0);
  const lab = prog(T, s + 4.6, s + 4.95, MOTION.pop);
  return (
    <Bg color={C.cyan} kind="cyan" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:GROUND, bottom:0, background:'#7a3b1e', borderTop:OL }}></div>
      {/* colonia */}
      <div style={{ position:'absolute', left:-60, top:GROUND - 200, width:360, height:200, borderRadius:'180px 180px 0 0', background:'#a3532a', border:OL, borderBottom:'none', boxSizing:'border-box' }}>
        <div style={{ position:'absolute', left:150, top:110, width:80, height:90, borderRadius:'40px 40px 0 0', background:C.ink }}></div>
      </div>
      {[0, 1].map((k) => <Ant key={k} T={T} x={110 + k * 120} y={GROUND - 240 - k * 6} w={150} rot={k ? 8 : -6} walk={T * 3 + k} walking={1} />)}
      {/* tallo y hoja */}
      <div style={{ position:'absolute', left:STEM, top:GROUND - 820, width:34, height:820, background:'linear-gradient(90deg,#1f7a2c,#3fbf4a 50%,#1f7a2c)', border:`6px solid ${C.ink}`, boxSizing:'border-box', borderRadius:16 }}></div>
      <div style={{ position:'absolute', left:STEM + 10, top:GROUND - 900, width:300, height:120, borderRadius:'0 100% 0 100%', background:C.leaf, border:OL, transform:'rotate(-18deg)', transformOrigin:'0 100%' }}></div>
      {/* regla */}
      <div style={{ position:'absolute', left:900, top:GROUND - 30 * CM, width:90, height:30 * CM, background:C.yellow, border:OL, boxSizing:'border-box' }}>
        {Array.from({ length:7 }, (_, i) => <div key={i} style={{ position:'absolute', left:0, top:30 * CM - i * 5 * CM - 3, width:i % 2 ? 30 : 50, height:6, background:C.ink }}>
          <div style={{ position:'absolute', left:54, top:-14, font:`700 22px ${MONO}`, color:C.ink }}>{i * 5}</div></div>)}
      </div>
      {hcm > 0 && <div style={{ position:'absolute', left:830, top:GROUND - hcm * CM - 26, width:0, height:0, borderTop:'26px solid transparent', borderBottom:'26px solid transparent', borderLeft:`60px solid ${C.pink}` }}></div>}
      <Ant T={T} x={ax} y={ay} w={300} rot={rot} walk={(T - s) * 2.4} walking={T > s + 0.3 && T < s + 4.6 ? 1 : 0} zombie={1} />
      {lab > 0.01 && <Abs x={720} y={GROUND - 25 * CM - 170} w={420} h={170} style={{ display:'flex', justifyContent:'center', transform:`scale(${lab})` }}><Big size={150} color={C.yellow} rot={-6}>25 cm</Big></Abs>}
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
  if (!live(T, K.M, K.Ho)) return null;
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
      </div>
      {T >= biteT && <Abs x={830} y={1250} w={420} h={160} style={{ display:'flex', justifyContent:'center', transform:`scale(${prog(T, biteT, biteT + 0.3, MOTION.pop)})` }}><Big size={130} color={C.yellow} rot={8}>¡CRAC!</Big></Abs>}
      {/* arco del sol: mediodía solar */}
      <svg viewBox="0 0 1080 420" width={W} height={420} style={{ position:'absolute', left:0, top:1500 }}>
        <path d="M160 330 A 380 300 0 0 1 920 330" fill="none" stroke={C.ink} strokeWidth="6" strokeDasharray="18 16" />
      </svg>
      <Abs x={sunX} y={sunY} w={150} h={150} style={{ borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #fff8b0, #ffe11a 60%, #f5b800)', border:OL, boxShadow:noon ? `0 0 0 14px rgba(255,225,26,.5), 0 0 60px 20px rgba(255,225,26,.6)` : 'none' }}></Abs>
      {noon && <Abs x={CX} y={1640} w={360} h={110} style={{ display:'flex', justifyContent:'center', transform:`scale(${prog(T, s + 2.1, s + 2.4, MOTION.pop)})` }}>
        <div style={{ font:`700 64px ${MONO}`, color:C.yellow, background:C.ink, border:`6px solid ${C.ink}`, padding:'4px 22px', borderRadius:14 }}>12:00</div></Abs>}
    </Bg>
  );
}

const RAIN = (() => { const g = rng(31); return Array.from({ length:40 }, () => ({ t:g() * 2.6, dx:(g() - 0.5) * 900, rot:g() * 180, z:50 + g() * 40 })); })();
function HongoScene({ T, K }) {
  if (!live(T, K.Ho, K.F)) return null;
  const s = K.Ho, stalk = prog(T, s + 0.35, s + 2.6, Easing.easeOutCubic), asc = prog(T, s + 2.3, s + 2.7, MOTION.pop);
  const shake = Math.sin(T * 60) * 2 * (T > s + 0.35 && T < s + 2.6 ? 1 : 0);
  // ascoma en pantalla (hormiga volteada: el tallo crece hacia abajo)
  const scale = 560 / 520, ax = 540 - 280 + (lerp(395, 465, 0.62) - 6) * scale, ay = 980 - 172 + (320 - lerp(80, -190, 0.62)) * scale;
  return (
    <Bg color={C.violet} kind="halftone" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:1740, bottom:0, background:'#3b2416', borderTop:OL }}></div>
      <Leaf T={T} y={880} dark={0.4} />
      <div style={{ position:'absolute', inset:0, transform:`translateX(${shake}px)` }}>
        <Ant T={T} x={540} y={980} w={560} flipY bite={1} dead={1} fungus={1} stalk={stalk} ascoma={asc} />
      </div>
      {T > s + 2.8 && RAIN.map((r, i) => { const t = T - s - 2.8 - r.t; if (t < 0 || t > 1.3) return null; const f = t / 1.3;
        return <Spore key={i} x={ax + r.dx * f} y={lerp(ay, 1720, f * f)} w={r.z} rot={r.rot + t * 200} glow={0.7} />; })}
      {[0, 1].map((k) => { const x = lerp(k ? 1180 : -150, k ? 760 : 300, prog(T, s + 2.6, s + 4.0, Easing.easeOutCubic));
        return <Ant key={k} T={T} x={x} y={1690} w={190} rot={0} flipY={false} walk={T * 3 + k} walking={T < s + 4.0 ? 1 : 0} fungus={prog(T, s + 4.4, s + 5.4) * 0.5} zombie={T > s + 5.0 ? 1 : 0} />; })}
    </Bg>
  );
}

function FosilScene({ T, K }) {
  if (!live(T, K.F, K.Hu)) return null;
  const s = K.F, slab = prog(T, s + 0.05, s + 0.55, MOTION.pop);
  const marks = [[330, 0.9], [540, 1.15], [750, 1.4]];
  const num = prog(T, s + 1.6, s + 2.0, MOTION.pop);
  return (
    <Bg color={C.lilac} kind="riso" T={T}>
      <div style={{ position:'absolute', left:110, top:680, width:860, height:600, borderRadius:70, background:'linear-gradient(160deg,#c9c2b8,#8f877d)', border:OL, boxShadow:`18px 18px 0 ${C.ink}`, transform:`translateY(${(1 - slab) * 1200}px) rotate(${-3 + (1 - slab) * 18}deg)`, overflow:'hidden' }}>
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
      <div style={{ position:'absolute', left:0, right:0, top:1330, display:'flex', flexDirection:'column', alignItems:'center', gap:4, transform:`scale(${num})` }}>
        <Big size={300} color={C.yellow} rot={-3}>48</Big>
        <div style={{ font:`700 40px ${MONO}`, color:C.ink, background:C.yellow, border:`6px solid ${C.ink}`, padding:'6px 22px', transform:'rotate(-2deg)' }}>MILLONES DE AÑOS</div>
      </div>
    </Bg>
  );
}

function HumanosScene({ T, K }) {
  if (!live(T, K.Hu, K.Ci)) return null;
  const s = K.Hu, th = prog(T, s + 0.3, s + 0.8, MOTION.pop), fill = prog(T, s + 0.8, s + 2.2, Easing.easeOutCubic);
  const no = prog(T, s + 2.5, s + 2.85, MOTION.pop);
  return (
    <Bg color={C.red} kind="pop" T={T}>
      <div style={{ position:'absolute', left:150, top:760, width:200, height:900, transform:`translateY(${(1 - th) * 1200}px) rotate(${-6 + Math.sin(T * 3) * 1.5}deg)` }}>
        <div style={{ position:'absolute', left:50, top:0, width:100, height:720, borderRadius:50, background:'#fff', border:OL, boxSizing:'border-box', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:22, right:22, bottom:0, height:`${20 + fill * 66}%`, background:C.red, borderRadius:30 }}></div>
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position:'absolute', right:0, top:90 + i * 100, width:30, height:6, background:C.ink }}></div>)}
        </div>
        <div style={{ position:'absolute', left:0, top:640, width:200, height:200, borderRadius:'50%', background:C.red, border:OL, boxSizing:'border-box' }}></div>
      </div>
      <Abs x={600} y={1000} w={360} h={130} style={{ display:'flex', justifyContent:'center', transform:`scale(${prog(T, s + 1.6, s + 1.95, MOTION.pop)})` }}><Big size={110} color={C.white} rot={-6}>37 °C</Big></Abs>
      {no > 0.01 && <Abs x={790} y={780} w={360} h={200} style={{ display:'flex', justifyContent:'center', transform:`scale(${lerp(2.4, 1, no)}) rotate(-10deg)`, opacity:clamp(no * 3, 0, 1) }}>
        <div style={{ font:`400 150px/1 ${NUM}`, color:C.ink, background:C.yellow, border:`12px solid ${C.ink}`, boxShadow:`14px 14px 0 ${C.ink}`, padding:'0 40px' }}>NO</div></Abs>}
    </Bg>
  );
}

function CierreScene({ T, K }) {
  if (!live(T, K.Ci, K.V)) return null;
  const hx = [[70, 330, 0], [900, 560, 1.3], [150, 1560, 2.1], [880, 1400, 3.2], [480, 260, 4]];
  return (
    <div style={{ position:'absolute', inset:0, background:'#0b0c10' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(90% 58% at 50% 42%, rgba(232,166,42,.22) 0%, rgba(232,166,42,0) 60%)' }}></div>
      {hx.map(([x, y, ph], i) => <Spore key={i} x={x} y={y + Math.sin(T * 0.9 + ph) * 30} w={140} rot={T * 30 + ph * 40} glow={0.5} />)}
    </div>
  );
}

function OutroCard({ T, K }) {
  if (T < K.V) return null;
  const s = K.V, a = prog(T, s, s + 0.5, MOTION.pop), b = prog(T, s + 0.35, s + 0.8, MOTION.pop), c = prog(T, s + 0.7, s + 1.1, MOTION.enter);
  return (
    <div style={{ position:'absolute', inset:0, background:'#0b0c10', zIndex:60 }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(80% 50% at 50% 42%, rgba(232,166,42,.3) 0%, rgba(232,166,42,0) 65%)' }}></div>
      <div style={{ position:'absolute', left:CX - 170, top:560, width:340, height:340, background:'#fff', borderRadius:60, padding:24, boxSizing:'border-box', transform:`scale(${a}) rotate(${(1 - a) * -20}deg)`, boxShadow:'0 20px 60px rgba(0,0,0,.6)' }}>
        <img src="assets/logo_iso_dna_gold.svg" alt="" style={{ width:'100%', height:'100%', display:'block' }} />
      </div>
      <div style={{ position:'absolute', left:0, right:0, top:980, textAlign:'center', font:`900 78px ${FONT}`, fontVariationSettings:"'wdth' 90", color:INK, textShadow:SHADOW, transform:`scale(${b})` }}>@lacreaciondelrobert</div>
      <div style={{ position:'absolute', left:0, right:0, top:1100, display:'flex', justifyContent:'center', opacity:c, transform:`translateY(${(1 - c) * 30}px)` }}>
        <div style={{ font:`900 54px ${FONT}`, color:DARK, background:C.gold2, padding:'10px 30px', transform:'skewX(-8deg) rotate(-2deg)', boxShadow:'8px 8px 0 rgba(0,0,0,.85)' }}>Sígueme para más ciencia</div>
      </div>
    </div>
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

/* ================= KIT DE LA SERIE ================= */
function Avatar({ T, src, at, until, left, width, top }) {
  if (T < at || T > until + 0.4) return null;
  const inP = prog(T, at, at + 0.55, MOTION.pop), outP = prog(T, until - 0.1, until + 0.35, MOTION.draw);
  const w = wobble(T, at + 0.35, 6, 20) * 0.1;
  return <img src={src} alt="" style={{ position:'absolute', left, top:lerp(1960, top, inP) + outP * 700, width, height:'auto', transformOrigin:'50% 100%', transform:`scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 26px 40px rgba(0,0,0,.55))' }} />;
}
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
function Watermark({ T, K, num }) {
  if (T >= K.V) return null;
  return <div style={{ position:'absolute', left:38, top:180, zIndex:50 }}>
    <div style={{ background:'#fff', borderRadius:20, padding:8, boxShadow:'0 12px 30px rgba(0,0,0,.45)' }}>
      <img src="assets/logo_iso_dna_gold.svg" alt="La Creación del Robert" style={{ width:92, height:92, display:'block' }} />
    </div>
    <div style={{ position:'absolute', top:-14, right:-20, font:`900 26px ${FONT}`, color:DARK, background:C.gold, padding:'3px 12px', borderRadius:11, boxShadow:'0 6px 16px rgba(0,0,0,.4)' }}>#{num}</div>
  </div>;
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

/* ================= PIEZA ================= */
function Piece() {
  const { T, CUES, time, playing } = useComposition();
  const K = { H:CUES.Hook, E:CUES.Espora, I:CUES.Invasion, S:CUES.Subida, M:CUES.Mordida, Ho:CUES.Hongo, F:CUES.Fosil, Hu:CUES.Humanos, Ci:CUES.Cierre, V:CUES.Outro };
  let Tv = T, punch = 1;
  if (T < K.H) { const cuts = [K.M + 2.3, K.Ho + 2.9, K.F + 2.1], i = Math.min(2, Math.floor((T / K.H) * 3)), lt = T - (i * K.H) / 3; Tv = cuts[i] + lt * 0.6; punch = 1.16 - 0.1 * prog(lt, 0, K.H / 3, MOTION.enter); }
  const shakes = [[K.H + 1.25, 30], [K.H + 1.7, 10], [K.E + 0.75, 18], [K.E + 2.95, 10], [K.I + 3.5, 16], [K.S + 4.6, 12], [K.M + 2.2, 28], [K.Ho + 2.4, 14], [K.F + 1.6, 22], [K.Hu + 2.5, 24]];
  let sh = 0; shakes.forEach(([h, a]) => { if (Tv >= h && Tv < h + 0.5) sh += a * (1 - prog(Tv, h, h + 0.5)); });
  const sx = Math.sin(Tv * 97) * sh, sy = Math.cos(Tv * 83) * sh;
  const BEAT = 0.96, bT = T - K.H, bi = Math.floor(bT / BEAT), bt = bT - bi * BEAT;
  let lc = -9; [K.E, K.I, K.S, K.M, K.Ho, K.F, K.Hu, K.Ci].forEach((c) => { if (T >= c) lc = c; });
  const lv = T >= K.H && T < K.V ? 1 : 0;
  const bp = lv * Math.exp(-bt * 9), ck = lv * Math.exp(-(T - lc) * 10);
  const zoom = 1 + 0.045 * bp + 0.12 * ck, rz = (bi % 2 ? 1 : -1) * 0.7 * bp;
  const ox = ((bi % 3) - 1) * 16 * bp, oy = (((bi + 1) % 3) - 1) * 12 * bp;
  const cutFlash = lv * Math.max(0, 1 - (T - lc) / 0.09);
  const P = { T:Tv, K };
  const HP = { T:Tv };
  const bursts = [
    { tc:K.E, kind:'honey', colors:[C.pink, C.yellow, C.blue, C.paper, C.gold2], seed:2, glyph:'ESPORA', dir:1 },
    { tc:K.I, kind:'slats', colors:[C.blue, C.mint, C.yellow, C.ink, C.gold2], seed:3, glyph:'RX', dir:-1 },
    { tc:K.S, kind:'rings', colors:[C.mint, C.cyan, C.pink, C.ink, C.yellow], seed:4, glyph:'↑', dir:1 },
    { tc:K.M, kind:'honey', colors:[C.cyan, C.orange, C.yellow, C.leaf, C.ink], seed:5, glyph:'12:00', dir:-1 },
    { tc:K.Ho, kind:'tiles', colors:[C.orange, C.violet, C.coral, C.gold2, C.ink], seed:6, glyph:'BROTA', dir:1 },
    { tc:K.F, kind:'slats', colors:[C.violet, C.lilac, C.yellow, C.stone, C.ink], seed:7, glyph:'48', dir:-1 },
    { tc:K.Hu, kind:'rings', colors:[C.lilac, C.red, C.yellow, C.ink, C.pink], seed:8, glyph:'¿TÚ?', dir:1 },
    { tc:K.Ci, kind:'honey', colors:[C.red, C.gold, C.ink, C.yellow, C.violet], seed:9, glyph:'!!', dir:-1 },
  ];
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position:'absolute', left:0, top:0, width:W, height:H, overflow:'hidden', background:C.ink }}>
      <div style={{ position:'absolute', inset:0, transform:`translate(${sx + ox}px,${sy + oy}px) scale(${punch * zoom}) rotate(${rz}deg)` }}>
        <HookScene {...P} />
        <EsporaScene {...P} />
        <InvasionScene {...P} />
        <SubidaScene {...P} />
        <MordidaScene {...P} />
        <HongoScene {...P} />
        <FosilScene {...P} />
        <HumanosScene {...P} />
        <CierreScene {...P} />
        <Avatar T={Tv} src={AV('avatar_11_sorprendido')} at={K.H + 1.8} until={K.E - 0.1} left={660} width={420} top={1520} />
        <Avatar T={Tv} src={AV('avatar_06_pensativo_menton')} at={K.I + 3.9} until={K.S - 0.15} left={-40} width={360} top={1560} />
        <Avatar T={Tv} src={AV('avatar_04_bajando_lentes')} at={K.M + 2.6} until={K.Ho - 0.15} left={-30} width={380} top={1180} />
        <Avatar T={Tv} src={AV('avatar_13_senalando_arriba')} at={K.Hu + 2.9} until={K.Ci - 0.15} left={560} width={500} top={1180} />
        <Avatar T={Tv} src={AV('avatar_02_apuntando_camara')} at={K.Ci + 0.6} until={K.V + 0.2} left={20} width={1040} top={980} />
        <Headline {...HP} idx={0} hi={C.yellow} tilt={-2} at={K.H + 0.25} until={K.E - 0.05} y={560} lines={[{ t:'Este hongo convierte hormigas en', size:84 }, { t:'*zombis.*', size:150, d:0.25 }]} />
        <Headline {...HP} idx={1} hi={C.gold2} tilt={1.5} at={K.E + 0.3} until={K.E + 2.85} y={540} lines={[{ t:'Una espora se pega a una *hormiga carpintera.*', size:84 }, { t:'Camponotus · bosques tropicales', size:30, d:0.7, mono:true, it:true }]} />
        <Headline {...HP} idx={2} hi={C.yellow} tilt={-1.5} at={K.E + 2.9} until={K.I - 0.05} y={540} lines={[{ t:'Y entra *perforando* su armadura.', size:92 }, { t:'Enzimas + presión', size:30, d:0.7, mono:true }]} />
        <Headline {...HP} idx={3} hi={C.gold2} tilt={1.5} at={K.I + 0.3} until={K.I + 2.95} y={470} lines={[{ t:'Crece por dentro, *entre sus músculos.*', size:84 }]} />
        <Headline {...HP} idx={4} hi={C.mint} tilt={-2} at={K.I + 3.0} until={K.S - 0.05} y={470} lines={[{ t:'Pero su cerebro queda *intacto.*', size:92 }, { t:'Fredericksen et al., PNAS 2017', size:28, d:0.7, mono:true }]} />
        <Headline {...HP} idx={5} hi={C.pink} tilt={1.5} at={K.S + 0.3} until={K.S + 2.95} y={520} lines={[{ t:'Abandona su colonia y *trepa.*', size:96 }]} />
        <Headline {...HP} idx={6} hi={C.yellow} tilt={-1.5} at={K.S + 3.0} until={K.M - 0.05} y={520} lines={[{ t:'Casi siempre a la misma *altura.*', size:92 }, { t:'Con ≈ 95 % de humedad', size:30, d:0.7, mono:true }]} />
        <Headline {...HP} idx={7} hi={C.yellow} tilt={2} at={K.M + 0.3} until={K.M + 2.75} y={470} lines={[{ t:'Muerde una hoja… *al mediodía.*', size:92 }]} />
        <Headline {...HP} idx={8} hi={C.coral} tilt={-1.5} at={K.M + 2.8} until={K.Ho - 0.05} y={470} lines={[{ t:'Y ya no la *suelta.*', size:110 }, { t:'La «mordida de la muerte»', size:30, d:0.7, mono:true }]} />
        <Headline {...HP} idx={9} hi={C.gold2} tilt={1.5} at={K.Ho + 0.3} until={K.Ho + 2.95} y={470} lines={[{ t:'De su cabeza *brota* el hongo.', size:96 }, { t:'Ophiocordyceps unilateralis', size:30, d:0.7, mono:true, it:true }]} />
        <Headline {...HP} idx={10} hi={C.yellow} tilt={-2} at={K.Ho + 3.0} until={K.F - 0.05} y={470} lines={[{ t:'Y *llueven esporas* sobre la siguiente.', size:88 }]} />
        <Headline {...HP} idx={11} hi={C.yellow} tilt={1.5} at={K.F + 0.3} until={K.Hu - 0.05} y={470} lines={[{ t:'Hay mordidas así en hojas *fósiles.*', size:88 }, { t:'Messel, Alemania', size:30, d:0.7, mono:true }]} />
        <Headline {...HP} idx={12} hi={C.yellow} tilt={-1.5} at={K.Hu + 0.3} until={K.Hu + 2.45} y={470} lines={[{ t:'¿Y a ti te puede *pasar?*', size:104 }]} />
        <Headline {...HP} idx={13} hi={C.mint} tilt={1.5} at={K.Hu + 2.5} until={K.Ci - 0.05} y={470} lines={[{ t:'Este hongo es *especialista en hormigas.*', size:84 }, { t:'Y casi ningún hongo tolera tus 37 °C', size:28, d:0.8, mono:true }]} />
        <Headline {...HP} idx={14} hi={C.gold2} tilt={-2} at={K.Ci + 0.25} until={K.V - 0.05} y={560} lines={[{ t:'La naturaleza es', size:100 }, { t:'*más rara*', size:150, d:0.25 }, { t:'que la ficción', size:100, d:0.45 }]} />
        {bursts.map((b, i) => <Burst key={i} T={Tv} {...b} />)}
        <Watermark T={Tv} K={K} num={window.SHOT_NUM || '01'} />
      </div>
      {cutFlash > 0 && <div style={{ position:'absolute', inset:0, background:'#fff', opacity:cutFlash * 0.55, pointerEvents:'none' }}></div>}
      <OutroCard T={T} K={K} />
      <AudioTrack src={window.AUDIO_SRC || 'assets/mezcla.wav'} T={time} playing={playing} />
    </div>
  );
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
