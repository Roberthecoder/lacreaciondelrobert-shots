const W = 1080, H = 1920, CX = 540;
const MOTION = { enter: Easing.easeOutExpo, draw: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const C = { ink:'#16120f', paper:'#f4efe4', pink:'#ff2d78', yellow:'#ffe11a', cyan:'#00d2ff', red:'#ff3b2f', blue:'#2346ff', mint:'#2fe0a8', violet:'#2b0f63', orange:'#ff8a1f', lilac:'#b18cff', teal:'#11a39a', magenta:'#e8336d', gold:'#E8A62A', gold2:'#F4C25A', coral:'#ff6b5a', white:'#ffffff' };
const INK = '#F6F3EC', DARK = '#0E0F12';
const FONT = "'Archivo', 'Arial Black', sans-serif", NUM = "'Anton', Impact, sans-serif", MONO = "'Space Mono', ui-monospace, monospace";
const SHADOW = '0 4px 0 rgba(0,0,0,.85), 0 0 34px rgba(0,0,0,.95)';
const AV = (n) => 'assets/stickers/' + n + '.png';
const OL = `8px solid ${C.ink}`;

function prog(T, a, b, ease) { if (b <= a) return T >= a ? 1 : 0; const p = clamp((T - a) / (b - a), 0, 1); return ease ? ease(p) : p; }
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) { return function () { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function rgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) { const A = rgb(a), B = rgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',')})`; }
const wobble = (T, t0, k = 7, f = 26) => (T < t0 ? 0 : Math.exp(-(T - t0) * k) * Math.cos((T - t0) * f));
const live = (T, a, b) => T >= a && T < b;
const HEX = 'polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)';

function pattern(kind, T) {
  const p = T * 40;
  switch (kind) {
    case 'pop': return { backgroundImage:'radial-gradient(circle, rgba(255,225,26,.6) 9px, transparent 10px)', backgroundSize:'40px 40px', backgroundPosition:`${p}px ${p}px` };
    case 'riso': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.22) 5px, transparent 6px)', backgroundSize:'30px 30px', backgroundPosition:`${p}px ${-p * 0.5}px` };
    case 'grid': return { backgroundImage:'linear-gradient(rgba(255,255,255,.18) 3px, transparent 3px), linear-gradient(90deg, rgba(255,255,255,.18) 3px, transparent 3px)', backgroundSize:'72px 72px', backgroundPosition:`${p}px ${p}px` };
    case 'stripes': return { backgroundImage:'repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 30px, transparent 30px 60px)', backgroundPosition:`${p * 2}px 0` };
    case 'dots': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.45) 8px, transparent 9px)', backgroundSize:'56px 56px', backgroundPosition:`0 ${-p * 2}px` };
    case 'halftone': return { backgroundImage:'radial-gradient(circle, rgba(177,140,255,.32) 5px, transparent 6px)', backgroundSize:'26px 26px', backgroundPosition:`${p}px ${-p}px` };
    case 'cyan': return { backgroundImage:'radial-gradient(circle, rgba(255,255,255,.5) 7px, transparent 8px)', backgroundSize:'44px 44px', backgroundPosition:`${-p}px ${p}px` };
    default: return {};
  }
}
function Bg({ color, kind, T, children }) {
  return <div style={{ position:'absolute', inset:0, background:color, ...pattern(kind, T) }}>{children}</div>;
}
function Abs({ x, y, w, h, style, children }) { return <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, ...style }}>{children}</div>; }

/* ================= OBJECTS ================= */
const COLONIES = (() => { const r = rng(21); return Array.from({ length:11 }, (_, i) => { const a = r() * 6.283, rr = 0.25 + Math.sqrt(r()) * 0.7; return { fx:Math.cos(a) * rr, fy:Math.sin(a) * rr, z:34 + r() * 40, c:[C.red, C.paper, C.teal, C.pink][i % 4] }; }); })();

function Petri({ T, x, y, w, sx = 1, sy = 1, grow = 1, flee = -1, jelly = 0, jw = 0 }) {
  const h = w * 0.38;
  return (
    <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, transformOrigin:'50% 100%', transform:`scale(${sx},${sy})` }}>
      <div style={{ position:'absolute', left:'4%', right:'4%', top:'40%', height:'90%', borderRadius:'50%', background:'rgba(0,0,0,.28)' }}></div>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'linear-gradient(180deg, rgba(255,255,255,.7), rgba(200,240,255,.45))', border:OL, boxSizing:'border-box' }}></div>
      <div style={{ position:'absolute', left:'7%', right:'7%', top:'10%', bottom:'16%', borderRadius:'50%', background:'radial-gradient(ellipse at 40% 35%, #ffe7a8, #f2b54a 60%, #d98e2a)', border:`5px solid ${C.ink}` }}></div>
      {jelly > 0.01 && (
        <div style={{ position:'absolute', left:w * 0.14, width:w * 0.72, bottom:h * 0.42, height:360 * jelly, transformOrigin:'50% 100%', transform:`scale(${1 + jw * 0.14},${1 - jw * 0.14})` }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'48% 48% 16% 16% / 72% 72% 28% 28%', background:'radial-gradient(ellipse at 34% 24%, rgba(255,255,255,.9) 0 7%, #ffd57a 18%, #f29a2e 68%, #c9661a)', border:OL }}></div>
          <div style={{ position:'absolute', left:'18%', top:'14%', width:'16%', height:'34%', borderRadius:'50%', background:'rgba(255,255,255,.45)', transform:'rotate(18deg)' }}></div>
          <div style={{ position:'absolute', left:'50%', top:-70, width:110, height:110, marginLeft:-55, borderRadius:'50%', background:'radial-gradient(circle at 34% 30%, #fff 0 9%, #ff4a5a 22%, #b3001b)', border:`7px solid ${C.ink}`, transform:`scale(${prog(T, 0, 1) * jelly})` }}></div>
          <div style={{ position:'absolute', left:'52%', top:-130, width:12, height:80, background:C.ink, borderRadius:6, transform:'rotate(22deg)' }}></div>
        </div>
      )}
      {COLONIES.map((c, i) => {
        const g = clamp(grow * 1.6 - i * 0.06, 0, 1), fl = flee < 0 ? 0 : clamp(flee * 1.4 - i * 0.04, 0, 1);
        const dir = c.fx < 0 ? -1 : 1, hop = Math.abs(Math.sin(fl * 14 + i)) * 90 * fl;
        const z = c.z * g;
        return (
          <div key={i} style={{ position:'absolute', left:w / 2 + c.fx * w * 0.36 - z / 2, top:h * 0.46 + c.fy * h * 0.3 - z * 0.35, width:z, height:z * 0.7, borderRadius:'50%', background:c.c, border:`5px solid ${C.ink}`, boxSizing:'border-box',
            transform:`translate(${dir * fl * 760}px, ${-hop}px)` }}>
            {fl > 0 && <React.Fragment>
              <div style={{ position:'absolute', left:'22%', top:'22%', width:'20%', height:'30%', borderRadius:'50%', background:C.ink }}></div>
              <div style={{ position:'absolute', left:'58%', top:'22%', width:'20%', height:'30%', borderRadius:'50%', background:C.ink }}></div>
            </React.Fragment>}
          </div>
        );
      })}
      <div style={{ position:'absolute', left:'14%', top:'12%', width:'22%', height:'14%', borderRadius:'50%', background:'rgba(255,255,255,.75)', transform:'rotate(-12deg)' }}></div>
    </div>
  );
}

function Fork({ x, y, rot = 180, s = 1 }) {
  const metal = 'linear-gradient(90deg, #8d97a3, #f3f6fa 45%, #aab3bd)';
  return (
    <div style={{ position:'absolute', left:x - 70, top:y - 680, width:140, height:680, transformOrigin:'50% 100%', transform:`rotate(${rot - 180}deg) scale(${s})` }}>
      <div style={{ position:'absolute', left:47, top:0, width:46, height:430, borderRadius:23, background:metal, border:`6px solid ${C.ink}`, boxSizing:'border-box' }}></div>
      <div style={{ position:'absolute', left:0, top:400, width:140, height:90, borderRadius:'24px 24px 10px 10px', background:metal, border:`6px solid ${C.ink}`, boxSizing:'border-box' }}></div>
      {[0, 40, 79, 118].map((l, i) => <div key={i} style={{ position:'absolute', left:l, top:470, width:22, height:210, borderRadius:'4px 4px 11px 11px', background:metal, border:`5px solid ${C.ink}`, boxSizing:'border-box' }}></div>)}
    </div>
  );
}

function Lattice({ T, s, size = 460 }) {
  const n = 5, sp = size / n, cells = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cells.push([i, j]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:size, height:size, transform:`rotate(${-12 + (T - s) * 9}deg)`,
      backgroundImage:'linear-gradient(rgba(255,255,255,.6) 4px, transparent 4px), linear-gradient(90deg, rgba(255,255,255,.6) 4px, transparent 4px)', backgroundSize:`${sp}px ${sp}px`, backgroundPosition:`${sp / 2 - 2}px ${sp / 2 - 2}px` }}>
      {cells.map(([i, j]) => { const na = (i + j) % 2 === 0, z = na ? sp * 0.42 : sp * 0.78, p = prog(T, s + (i + j) * 0.05, s + 0.35 + (i + j) * 0.05, MOTION.pop); return (
        <div key={i + '-' + j} style={{ position:'absolute', left:sp / 2 + i * sp - z / 2, top:sp / 2 + j * sp - z / 2, width:z, height:z, borderRadius:'50%', background:na ? C.yellow : C.cyan, border:`5px solid ${C.ink}`, boxSizing:'border-box', transform:`scale(${p})` }}></div>); })}
    </div>
  );
}

/* ================= SCENES ================= */
function HookScene({ T, K }) {
  if (!live(T, K.H, K.A)) return null;
  const inP = prog(T, K.H + 0.1, K.H + 0.5, MOTION.pop), stab = K.H + 1.0;
  const fy = T < stab ? lerp(-200, 1180, prog(T, K.H + 0.6, stab, Easing.easeInCubic)) : 1180;
  const sq = wobble(T, stab, 6, 24);
  const ring = prog(T, stab, stab + 0.6, MOTION.enter);
  return (
    <Bg color={C.pink} kind="pop" T={T}>
      <Petri T={T} x={CX} y={1280} w={760 * inP} sx={1 + sq * 0.18} sy={1 - sq * 0.25} grow={prog(T, K.H + 0.3, K.H + 0.9)} />
      {T >= stab && ring < 1 && <Abs x={CX} y={1260} w={600} h={600} style={{ borderRadius:'50%', border:`20px solid ${C.yellow}`, boxSizing:'border-box', opacity:1 - ring, transform:`scale(${0.4 + ring * 1.8})` }}></Abs>}
      <Fork x={CX + 60} y={fy} rot={180 + 12 + sq * 6} />
      {T >= stab && <Abs x={CX + 300} y={1040} w={360} h={140} style={{ transform:`rotate(-10deg) scale(${prog(T, stab + 0.05, stab + 0.4, MOTION.pop)})`, display:'flex', alignItems:'center', justifyContent:'center',
        font:`400 120px/1 ${NUM}`, color:C.white, WebkitTextStroke:`6px ${C.ink}`, textShadow:`8px 8px 0 ${C.ink}` }}>¡ÑAM!</Abs>}
    </Bg>
  );
}

function AgarScene({ T, K }) {
  if (!live(T, K.A, K.S)) return null;
  const d = K.A + 3.0, jelly = prog(T, d, d + 0.6, MOTION.pop), jw = wobble(T, d + 0.5, 4, 16) + Math.sin(T * 9) * 0.05 * jelly;
  return (
    <Bg color={C.magenta} kind="riso" T={T}>
      <div style={{ position:'absolute', left:-200, top:1480, font:`400 380px/1 ${NUM}`, color:'transparent', WebkitTextStroke:'4px rgba(255,255,255,.35)', whiteSpace:'nowrap', transform:`translateX(${-(T - K.A) * 60}px)` }}>AGAR AGAR AGAR</div>
      <Petri T={T} x={CX} y={1180} w={780} grow={prog(T, K.A + 0.4, K.A + 2.4)} flee={T < d ? -1 : prog(T, d, d + 1.6)} jelly={jelly} jw={jw} />
      <Abs x={CX} y={1430} w={520} h={86} style={{ transform:`rotate(-3deg) scale(${prog(T, K.A + 0.9, K.A + 1.3, MOTION.pop)})`, background:C.yellow, border:`6px solid ${C.ink}`, boxShadow:`10px 10px 0 ${C.ink}`,
        display:'flex', alignItems:'center', justifyContent:'center', font:`700 40px ${MONO}`, color:C.ink }}>(C₁₂H₁₈O₉)ₙ</Abs>
    </Bg>
  );
}

const SALT = (() => { const g = rng(5); return Array.from({ length:30 }, () => ({ x:330 + g() * 420, z:30 + g() * 30, dx:(g() - 0.5) * 160, rot:g() * 90 })); })();
const BUBBLES = (() => { const g = rng(77); return Array.from({ length:34 }, (_, i) => ({ t:g() * 1.8, vx:(g() - 0.5) * 700, vy:600 + g() * 900, z:30 + g() * 70, lab:i % 5 === 0 })); })();
function SalScene({ T, K }) {
  if (!live(T, K.S, K.Ci)) return null;
  const s = K.S, inP = prog(T, s + 0.1, s + 0.5, MOTION.pop), out = prog(T, s + 2.3, s + 2.8, MOTION.draw);
  const shakeA = T > s + 0.6 && T < s + 2.4 ? 1 : 0;
  const rot = lerp(0, 165, prog(T, s + 0.3, s + 0.65, MOTION.pop)) + Math.sin(T * 44) * 14 * shakeA;
  const r = SALT;
  const lens = prog(T, s + 2.6, s + 3.1, MOTION.pop);
  return (
    <Bg color={C.blue} kind="grid" T={T}>
      {r.map((c, i) => {
        const t0 = s + 0.7 + i * 0.055; if (T < t0) return null;
        const t = T - t0, yy = Math.min(1640 - (i % 5) * 26, 1050 + 1400 * t * t), xx = lerp(CX + c.dx * 0.3, c.x, clamp(t * 1.6, 0, 1));
        return <Abs key={i} x={xx} y={yy} w={c.z} h={c.z} style={{ background:'linear-gradient(135deg,#fff,#d8e6ff)', border:`4px solid ${C.ink}`, transform:`rotate(${c.rot + t * 300 * (yy < 1600 ? 1 : 0)}deg)` }}></Abs>;
      })}
      <div style={{ position:'absolute', left:CX - 170, top:620, width:340, height:560, transformOrigin:'50% 50%', transform:`translateY(${(1 - inP) * 1200 - out * 1500}px) rotate(${rot}deg)` }}>
        <div style={{ position:'absolute', left:20, top:0, width:300, height:120, borderRadius:'40px 40px 14px 14px', background:'linear-gradient(90deg,#8d97a3,#f3f6fa 45%,#aab3bd)', border:OL, boxSizing:'border-box' }}>
          {[70, 130, 190].map((l, i) => <div key={i} style={{ position:'absolute', left:l, top:34, width:22, height:22, borderRadius:'50%', background:C.ink }}></div>)}
        </div>
        <div style={{ position:'absolute', left:0, top:110, width:340, height:450, borderRadius:'30px 30px 70px 70px', background:'linear-gradient(90deg, rgba(255,255,255,.95), rgba(210,228,255,.7) 45%, rgba(255,255,255,.9))', border:OL, boxSizing:'border-box', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'55%', background:'#ffffff', ...pattern('riso', 0), backgroundImage:'radial-gradient(circle, rgba(35,70,255,.18) 4px, transparent 5px)' }}></div>
          <div style={{ position:'absolute', left:30, right:30, top:90, height:170, background:C.yellow, border:`6px solid ${C.ink}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <div style={{ font:`400 96px/1 ${NUM}`, color:C.ink }}>NaCl</div>
            <div style={{ font:`700 22px ${MONO}`, color:C.ink }}>≥99.5 % · ACS</div>
          </div>
        </div>
      </div>
      {lens > 0.01 && <div style={{ position:'absolute', left:CX - 300, top:780, width:600, height:600, transform:`scale(${lens}) rotate(${(1 - lens) * -40}deg)` }}>
        <div style={{ position:'absolute', left:430, top:470, width:90, height:300, borderRadius:45, background:C.ink, transform:'rotate(-40deg)', transformOrigin:'50% 0' }}></div>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:C.violet, border:`26px solid ${C.ink}`, boxShadow:`0 0 0 12px ${C.yellow}`, overflow:'hidden' }}>
          <div style={{ position:'absolute', left:48, top:48 }}><Lattice T={T} s={s + 2.8} size={452} /></div>
          <div style={{ position:'absolute', left:'14%', top:'10%', width:'34%', height:'20%', borderRadius:'50%', background:'rgba(255,255,255,.28)', transform:'rotate(-30deg)' }}></div>
        </div>
      </div>}
    </Bg>
  );
}

function CitricoScene({ T, K }) {
  if (!live(T, K.Ci, K.B)) return null;
  const s = K.Ci, inP = prog(T, s + 0.1, s + 0.5, MOTION.pop);
  const sq = prog(T, s + 0.8, s + 1.3, MOTION.pop) + Math.sin(T * 30) * 0.02 * (T > s + 1.3 ? 1 : 0);
  const lsx = 1 - sq * 0.22, lsy = 1 + sq * 0.12, half = 290 * lsx;
  const drops = [1.35, 1.7, 2.05].map(d => s + d);
  const landed = drops.filter(d => T >= d + 0.35).length;
  const stripC = mix('#c9e04a', C.red, clamp(prog(T, drops[0] + 0.35, drops[2] + 0.6), 0, 1));
  const ph = prog(T, drops[2] + 0.4, drops[2] + 0.8, MOTION.pop);
  return (
    <Bg color={C.yellow} kind="stripes" T={T}>
      <div style={{ position:'absolute', left:0, right:0, top:930, height:50, background:'linear-gradient(180deg,#8d97a3,#e9edf2,#8d97a3)', borderTop:OL, borderBottom:OL, transform:`scaleX(${inP})` }}></div>
      <Abs x={CX} y={960} w={580} h={420} style={{ transform:`scale(${lsx * inP},${lsy * inP})` }}>
        <div style={{ position:'absolute', left:-30, top:170, width:80, height:80, borderRadius:'50%', background:'#f5c518', border:OL }}></div>
        <div style={{ position:'absolute', right:-30, top:170, width:80, height:80, borderRadius:'50%', background:'#f5c518', border:OL }}></div>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(ellipse at 35% 30%, #fff8b0 0 8%, #ffe11a 30%, #f5b800 80%)', border:OL, boxSizing:'border-box' }}></div>
        {sq > 0.3 ? <React.Fragment>
          {[[180, 160], [340, 160]].map(([l, t], i) => <React.Fragment key={i}>
            <div style={{ position:'absolute', left:l, top:t, width:70, height:14, borderRadius:7, background:C.ink, transform:`rotate(${i ? -22 : 22}deg)` }}></div>
            <div style={{ position:'absolute', left:l, top:t + 30, width:70, height:14, borderRadius:7, background:C.ink, transform:`rotate(${i ? 22 : -22}deg)` }}></div>
          </React.Fragment>)}
          <div style={{ position:'absolute', left:250, top:260, width:80, height:44, borderRadius:'50%', background:C.ink }}></div>
        </React.Fragment> : <React.Fragment>
          <div style={{ position:'absolute', left:200, top:150, width:40, height:56, borderRadius:'50%', background:C.ink }}></div>
          <div style={{ position:'absolute', left:340, top:150, width:40, height:56, borderRadius:'50%', background:C.ink }}></div>
        </React.Fragment>}
      </Abs>
      {[-1, 1].map(side => <div key={side} style={{ position:'absolute', top:820, width:200, height:280, left:side < 0 ? CX - half - 200 - (1 - inP) * 600 : CX + half + (1 - inP) * 600,
        background:'linear-gradient(90deg,#6c7682,#dfe5ec 50%,#6c7682)', border:OL, boxSizing:'border-box', borderRadius:24 }}>
        <div style={{ position:'absolute', left:30, right:30, top:30, bottom:30, border:`5px dashed rgba(22,18,15,.5)`, borderRadius:12 }}></div>
      </div>)}
      {drops.map((d, i) => { if (T < d || T > d + 0.4) return null; const f = prog(T, d, d + 0.35, Easing.easeInQuad);
        return <Abs key={i} x={CX + (i - 1) * 50} y={lerp(1170, 1450, f)} w={46} h={60} style={{ borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%', background:'rgba(255,240,140,.95)', border:`5px solid ${C.ink}` }}></Abs>; })}
      <Abs x={CX} y={1500} w={640} h={90} style={{ background:stripC, border:OL, transform:`translateX(${(1 - inP) * 1200}px) rotate(-2deg)`, boxShadow:`10px 10px 0 ${C.ink}` }}></Abs>
      {landed > 0 && [0, 1, 2].slice(0, landed).map(i => { const p = prog(T, drops[i] + 0.35, drops[i] + 0.8, MOTION.enter); return <Abs key={i} x={CX + (i - 1) * 50} y={1500} w={120} h={120} style={{ borderRadius:'50%', border:`6px solid ${C.ink}`, opacity:1 - p, transform:`scale(${0.3 + p * 2})` }}></Abs>; })}
      <Abs x={CX} y={1690} w={700} h={240} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24, transform:`scale(${ph}) rotate(${-4 + (1 - ph) * 20}deg)` }}>
        <div style={{ font:`400 220px/1 ${NUM}`, color:C.white, WebkitTextStroke:`8px ${C.ink}`, textShadow:`10px 10px 0 ${C.ink}` }}>pH 2</div>
      </Abs>
    </Bg>
  );
}

function Flame({ x, y, z, T, i }) {
  const f = 1 + Math.sin(T * 23 + i * 2) * 0.12;
  return <Abs x={x} y={y - z * 0.4} w={z * 0.7} h={z} style={{ transformOrigin:'50% 100%', transform:`scale(${f},${2 - f})` }}>
    <div style={{ position:'absolute', inset:0, borderRadius:'50% 50% 50% 50% / 64% 64% 36% 36%', background:C.orange, border:`6px solid ${C.ink}`, boxSizing:'border-box' }}></div>
    <div style={{ position:'absolute', left:'25%', right:'25%', top:'40%', bottom:'8%', borderRadius:'50% 50% 50% 50% / 64% 64% 36% 36%', background:C.yellow }}></div>
  </Abs>;
}
function BicarbScene({ T, K }) {
  if (!live(T, K.B, K.G)) return null;
  const s = K.B, inP = prog(T, s + 0.1, s + 0.5, MOTION.pop), outA = prog(T, s + 3.0, s + 3.4, MOTION.draw);
  const acids = [0.9, 1.4, 1.9].map(d => s + d);
  let hit = 0; acids.forEach(d => { if (T >= d + 0.3) hit += Math.exp(-(T - d - 0.3) * 6); });
  hit = clamp(hit, 0, 1);
  const medium = mix('#ff4f9a', '#ffd21a', hit * 0.8);
  const needle = -hit * 62 + Math.sin(T * 40) * 3 * hit;
  const plateY = 1380, plateIn = prog(T, s + 3.1, s + 3.5, MOTION.pop);
  const heat = prog(T, s + 3.4, s + 3.8, MOTION.pop), fizzT = s + 3.8;
  const cake = prog(T, s + 4.7, s + 5.3, MOTION.pop), land = wobble(T, s + 5.2, 5, 18);
  const ch = 440 * cake, mound = 1 - prog(T, fizzT, s + 4.7) * 0.7;
  const eq = prog(T, s + 4.0, s + 4.4, MOTION.pop);
  return (
    <Bg color={C.mint} kind="dots" T={T}>
      {outA < 1 && <div style={{ position:'absolute', inset:0, transform:`translateX(${(1 - inP) * 1200 - outA * 1400}px) rotate(${-outA * 20}deg)` }}>
        <div style={{ position:'absolute', left:CX - 280, top:1000, width:560, height:440, transform:'rotate(-6deg)' }}>
          <div style={{ position:'absolute', left:440, top:-110, width:150, height:190, background:'rgba(255,255,255,.8)', border:OL, boxSizing:'border-box', transform:'rotate(35deg)', transformOrigin:'0 100%' }}></div>
          <div style={{ position:'absolute', left:520, top:-230, width:150, height:90, borderRadius:14, background:C.blue, border:OL, boxSizing:'border-box', transform:'rotate(35deg)' }}></div>
          <div style={{ position:'absolute', inset:0, borderRadius:34, background:'rgba(255,255,255,.75)', border:OL, boxSizing:'border-box', overflow:'hidden' }}>
            <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'62%', background:medium, borderTop:`6px solid ${C.ink}` }}></div>
            <div style={{ position:'absolute', left:40, top:40, width:240, height:96, background:'#fff', border:`6px solid ${C.ink}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <div style={{ font:`700 34px ${MONO}`, color:C.ink }}>NaHCO₃</div>
              <div style={{ font:`700 18px ${MONO}`, color:C.ink }}>MEDIO DE CULTIVO</div>
            </div>
            <div style={{ position:'absolute', left:30, top:20, width:40, height:300, borderRadius:20, background:'rgba(255,255,255,.4)' }}></div>
          </div>
        </div>
        {acids.map((d, i) => { if (T < d || T > d + 0.32) return null; const f = prog(T, d, d + 0.3, Easing.easeInQuad);
          return <Abs key={i} x={CX - 80 + i * 70} y={lerp(760, 1220, f)} w={46} h={60} style={{ borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%', background:C.yellow, border:`5px solid ${C.ink}` }}></Abs>; })}
        <div style={{ position:'absolute', left:CX - 220, top:1450, width:440, height:220, borderRadius:'220px 220px 0 0', background:'conic-gradient(from -90deg at 50% 100%, #ffd21a 0deg 60deg, #ff4f9a 60deg 120deg, #2346ff 120deg 180deg, transparent 180deg)', border:OL, borderBottom:'none', boxSizing:'border-box' }}>
          <div style={{ position:'absolute', left:'50%', bottom:-6, width:14, height:190, marginLeft:-7, background:C.ink, borderRadius:7, transformOrigin:'50% 100%', transform:`rotate(${needle}deg)` }}></div>
          <div style={{ position:'absolute', left:'50%', bottom:-30, width:60, height:60, marginLeft:-30, borderRadius:'50%', background:C.ink }}></div>
        </div>
        <div style={{ position:'absolute', left:0, right:0, top:1690, display:'flex', justifyContent:'center', font:`400 130px/1 ${NUM}`, color:C.white, WebkitTextStroke:`7px ${C.ink}`, textShadow:`10px 10px 0 ${C.ink}` }}>pH 7.4</div>
      </div>}
      {plateIn > 0.01 && <React.Fragment>
        {heat > 0.01 && [-260, -130, 0, 130, 260].map((dx, i) => <Flame key={i} x={CX + dx} y={plateY + 210} z={170 * heat} T={T} i={i} />)}
        <Abs x={CX} y={plateY + 110} w={820} h={70} style={{ background:'linear-gradient(180deg,#5b636d,#2a2f35)', border:OL, boxSizing:'border-box', borderRadius:10, transform:`translateY(${(1 - plateIn) * 800}px)` }}></Abs>
        <Abs x={CX} y={plateY} w={760} h={120} style={{ borderRadius:'50%', background:'radial-gradient(ellipse at 50% 40%, #ffffff, #e8e1d4 60%, #b9aa94)', border:OL, boxSizing:'border-box', transform:`translateY(${(1 - plateIn) * 800}px)` }}></Abs>
        {cake <= 0.02 && <Abs x={CX} y={plateY - 70 * mound} w={440} h={170 * mound} style={{ borderRadius:'50% 50% 12% 12% / 100% 100% 20% 20%', background:'#ffffff', border:OL, boxSizing:'border-box',
          backgroundImage:'radial-gradient(circle, rgba(35,70,255,.2) 4px, transparent 5px)', backgroundSize:'22px 22px', transform:`translateY(${(1 - plateIn) * 800 + Math.sin(T * 50) * 4 * (T > fizzT ? 1 : 0)}px)` }}></Abs>}
        {T > fizzT && BUBBLES.map((bb, i) => {
          const t = T - fizzT - bb.t * 0.6; if (t < 0 || t > 1.4) return null;
          const x = CX + bb.vx * t * 0.5, y = Math.max(860, plateY - 130 - bb.vy * t * 0.8 + 300 * t * t), sc = Math.min(1, t * 6) * (1 - prog(t, 1.0, 1.4));
          return <Abs key={i} x={x} y={y} w={bb.lab ? 120 : bb.z} h={bb.lab ? 120 : bb.z} style={{ borderRadius:'50%', background:'rgba(255,255,255,.85)', border:`5px solid ${C.ink}`, transform:`scale(${sc})`,
            display:'flex', alignItems:'center', justifyContent:'center', font:`700 30px ${MONO}`, color:C.ink }}>{bb.lab ? 'CO₂' : null}</Abs>; })}
        {cake > 0.01 && <div style={{ position:'absolute', left:CX - 320, top:plateY - 30 - ch, width:640, height:ch, transformOrigin:'50% 100%', transform:`scale(${1 + land * 0.12},${1 - land * 0.12})` }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'30px 30px 20px 20px', background:'repeating-linear-gradient(180deg, #c27a3a 0 110px, #fff3dc 110px 140px)', border:OL, boxSizing:'border-box' }}></div>
          <div style={{ position:'absolute', left:-14, right:-14, top:-30, height:120, borderRadius:'50px 50px 60px 60px', background:C.pink, border:OL, boxSizing:'border-box' }}></div>
          {[80, 230, 400, 540].map((l, i) => <div key={i} style={{ position:'absolute', left:l, top:70, width:44, height:60 + (i % 2) * 40, borderRadius:'0 0 22px 22px', background:C.pink, borderLeft:`6px solid ${C.ink}`, borderRight:`6px solid ${C.ink}`, borderBottom:`6px solid ${C.ink}` }}></div>)}
          <div style={{ position:'absolute', left:270, top:-110, width:100, height:100, borderRadius:'50%', background:'radial-gradient(circle at 34% 30%, #fff 0 9%, #ff4a5a 22%, #b3001b)', border:`7px solid ${C.ink}` }}></div>
        </div>}
        <div style={{ position:'absolute', left:40, right:40, top:1690, display:'flex', justifyContent:'center', transform:`scale(${eq}) rotate(-2deg)` }}>
          <div style={{ font:`700 34px ${MONO}`, color:C.ink, background:C.yellow, border:`6px solid ${C.ink}`, boxShadow:`8px 8px 0 ${C.ink}`, padding:'10px 18px', whiteSpace:'nowrap' }}>2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑</div>
        </div>
      </React.Fragment>}
    </Bg>
  );
}

function Hexa({ x, y, z, rot = 0, o = 1 }) {
  return <Abs x={x} y={y} w={z} h={z} style={{ transform:`rotate(${rot}deg)`, opacity:o }}>
    <div style={{ position:'absolute', inset:0, clipPath:HEX, background:C.ink }}></div>
    <div style={{ position:'absolute', inset:z * 0.06, clipPath:HEX, background:C.orange }}></div>
    <div style={{ position:'absolute', inset:z * 0.3, clipPath:HEX, background:C.violet }}></div>
  </Abs>;
}
function BrainScene({ T, K }) {
  if (!live(T, K.G, K.Tr)) return null;
  const s = K.G, cellIn = prog(T, s + 0.1, s + 0.5, MOTION.pop);
  const cellEats = [0.8, 1.4, 2.0].map(d => s + d);
  let csq = 0; cellEats.forEach(b => { csq += Math.max(0, wobble(T, b, 7, 22)); });
  const shove = s + 2.8;
  const brainX = lerp(CX + 1000, CX, prog(T, shove - 0.15, shove + 0.3, MOTION.enter));
  const pushed = prog(T, shove + 0.1, shove + 0.7, Easing.easeOutCubic);
  const cellX = CX - pushed * 1100, cellRot = -pushed * 160, cellY = 1000 - Math.sin(pushed * Math.PI) * 260;
  const bites = [3.5, 4.0, 4.5].map(d => s + d);
  let mouth = 0, sq = 0, eaten = 0;
  bites.forEach(b => { mouth = Math.max(mouth, prog(T, b - 0.3, b - 0.05) * (1 - prog(T, b - 0.05, b + 0.05))); sq += Math.max(0, wobble(T, b, 7, 22)); if (T >= b) eaten++; });
  const glow = eaten / 3, pct = prog(T, s + 4.9, s + 5.3, MOTION.pop);
  const flyIn = (b, i, tx, ty) => { if (T < b - 0.55 || T >= b) return null; const side = i % 2 ? 1 : -1, f = prog(T, b - 0.55, b, MOTION.draw);
    return <Hexa key={'h' + b} x={lerp(tx + side * 700, tx, f)} y={lerp(640 + i * 110, ty, f) - Math.sin(f * Math.PI) * 240} z={150 - f * 40} rot={f * 360 * side} />; };
  return (
    <Bg color={C.violet} kind="halftone" T={T}>
      <Abs x={CX} y={1000} w={900} h={900} style={{ borderRadius:'50%', background:`radial-gradient(circle, rgba(255,138,31,${0.15 + glow * 0.55}) 0%, transparent 62%)` }}></Abs>
      {pushed < 1 && <Abs x={cellX} y={cellY} w={520} h={480} style={{ transform:`rotate(${cellRot}deg) scale(${cellIn * (1 + csq * 0.1)},${cellIn * (1 - csq * 0.12)})` }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'52% 48% 46% 54% / 50% 54% 46% 50%', background:'radial-gradient(ellipse at 38% 32%, #e6fff4, #8ff0c8 60%, #2fe0a8)', border:OL, boxSizing:'border-box' }}></div>
        <div style={{ position:'absolute', left:190, top:150, width:170, height:160, borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #d9c8ff, #8a5cf0)', border:`7px solid ${C.ink}` }}></div>
        {[[70, 120, 30], [90, 320, -20], [370, 340, 15], [390, 110, -35]].map(([l, t, r], i) => <div key={i} style={{ position:'absolute', left:l, top:t, width:90, height:44, borderRadius:'50%', background:C.coral, border:`5px solid ${C.ink}`, transform:`rotate(${r}deg)` }}></div>)}
        {[220, 310].map((l, i) => <div key={i} style={{ position:'absolute', left:l, top:90, width:30, height:pushed > 0 ? 12 : 40, borderRadius:15, background:C.ink }}></div>)}
        {cellEats.filter(b => T >= b).map((b, i) => { const p = prog(T, b, b + 0.4, MOTION.enter); return <Hexa key={i} x={150 + i * 110} y={380} z={60 * (1 - p * 0.6)} rot={T * 60} />; })}
      </Abs>}
      {cellEats.map((b, i) => flyIn(b, i, CX, 1000))}
      {brainX < CX + 900 && <Abs x={brainX} y={1000} w={620} h={480} style={{ transform:`rotate(${(brainX - CX) / -40}deg) scale(${1 + sq * 0.1},${1 - sq * 0.12})` }}>
        <div style={{ position:'absolute', left:0, top:20, width:360, height:430, borderRadius:'55% 45% 45% 55% / 55% 50% 50% 45%', background:'radial-gradient(ellipse at 35% 30%, #ffd0e0, #ff7aa8 60%, #e0457e)', border:OL, boxSizing:'border-box' }}></div>
        <div style={{ position:'absolute', right:0, top:0, width:380, height:440, borderRadius:'45% 55% 55% 45% / 50% 55% 45% 50%', background:'radial-gradient(ellipse at 40% 30%, #ffd0e0, #ff7aa8 60%, #e0457e)', border:OL, boxSizing:'border-box' }}></div>
        {[[60, 90, 160, -20], [150, 200, 180, 15], [330, 80, 170, 10], [380, 230, 160, -15], [90, 300, 150, 5], [300, 330, 140, -8]].map(([l, t, w, r], i) =>
          <div key={i} style={{ position:'absolute', left:l, top:t, width:w, height:70, borderRadius:'50%', borderTop:`8px solid rgba(22,18,15,.55)`, transform:`rotate(${r}deg)` }}></div>)}
        <div style={{ position:'absolute', left:210, top:360, width:200, height:20 + mouth * 150, borderRadius:'40% 40% 50% 50%', background:'#3a0a1e', border:`7px solid ${C.ink}`, overflow:'hidden' }}>
          <div style={{ position:'absolute', left:20, right:20, top:0, height:26, background:'repeating-linear-gradient(90deg,#fff 0 30px, #ddd 30px 34px)' }}></div>
        </div>
        {[200, 380].map((l, i) => <div key={i} style={{ position:'absolute', left:l, top:210, width:46, height:mouth > 0.5 ? 14 : 56, borderRadius:23, background:C.ink }}></div>)}
      </Abs>}
      {bites.map((b, i) => flyIn(b, i, CX, 1420))}
      {bites.map((b, i) => { if (T < b || T > b + 0.5) return null; const p = prog(T, b, b + 0.5, MOTION.enter);
        return <React.Fragment key={'c' + i}>{[0, 1, 2, 3, 4, 5].map(k => { const ang = k * 1.047 + i; return <Abs key={k} x={CX + Math.cos(ang) * p * 260} y={1420 + Math.sin(ang) * p * 200 - p * 80} w={34} h={34} style={{ clipPath:HEX, background:C.orange, opacity:1 - p }}></Abs>; })}</React.Fragment>; })}
      <div style={{ position:'absolute', left:0, right:0, top:1440, display:'flex', flexDirection:'column', alignItems:'center', gap:6, transform:`scale(${pct})` }}>
        <div style={{ font:`400 280px/0.9 ${NUM}`, color:C.yellow, WebkitTextStroke:`8px ${C.ink}`, textShadow:`12px 12px 0 ${C.ink}` }}>20 %</div>
        <div style={{ font:`700 34px ${MONO}`, color:C.ink, background:C.yellow, padding:'6px 18px', border:`5px solid ${C.ink}` }}>DE TU ENERGÍA EN REPOSO</div>
      </div>
    </Bg>
  );
}

function GlitchText({ T, at, chaos, children, style }) {
  const a = ((((T * 1.4) % 1) < 0.13 ? 1 : 0) + (T >= at ? Math.max(0, 1 - (T - at) / 0.5) * 2 : 0)) * chaos;
  return (
    <div style={{ position:'relative', ...style }}>
      <div style={{ visibility:'hidden' }}>{children}</div>
      {[[0, 62], [38, 30], [70, 0]].map((sl, i) => <div key={i} style={{ position:'absolute', inset:0, clipPath:`inset(${sl[0]}% 0 ${sl[1]}% 0)`, transform:`translateX(${Math.sin(T * (61 + i * 23) + i) * 30 * a}px)`,
        textShadow:a > 0.05 ? `${7 * a}px 0 0 ${C.cyan}, ${-7 * a}px 0 0 ${C.yellow}` : 'none' }}>{children}</div>)}
    </div>
  );
}
function Tape({ T, top, dir, at }) {
  const x = lerp(dir * 2200, 0, prog(T, at, at + 0.6, MOTION.enter));
  return <div style={{ position:'absolute', left:-300, top, width:1700, height:100, transform:`translateX(${x}px) rotate(${dir * -4}deg)`, borderTop:OL, borderBottom:OL,
    backgroundImage:`repeating-linear-gradient(45deg, ${C.yellow} 0 46px, ${C.ink} 46px 92px)`, backgroundPosition:`${T * 140 * dir}px 0` }}></div>;
}
function TrampaScene({ T, K, chaos }) {
  if (!live(T, K.Tr, K.R)) return null;
  const s = K.Tr;
  const pero = prog(T, s + 0.15, s + 0.5, MOTION.pop), peroOut = prog(T, s + 1.15, s + 1.45, MOTION.draw);
  const bottle = prog(T, s + 1.3, s + 1.75, MOTION.pop), scan = prog(T, s + 1.9, s + 2.7, MOTION.draw);
  const stamp = prog(T, s + 2.8, s + 3.1, MOTION.pop);
  const chips = [];
  return (
    <Bg color={C.ink} kind="" T={T}>
      <Tape T={T} top={40} dir={1} at={s + 0.1} />
      <Tape T={T} top={1800} dir={-1} at={s + 0.2} />
      {peroOut < 1 && <div style={{ position:'absolute', left:0, right:0, top:760, display:'flex', justifyContent:'center', opacity:pero, transform:`scale(${lerp(3, 1, pero) * (1 - peroOut)}) rotate(${peroOut * 30}deg)` }}>
        <GlitchText T={T} at={s + 0.15} chaos={chaos} style={{ font:`400 640px/0.8 ${NUM}`, color:C.yellow }}>*</GlitchText>
      </div>}
      {bottle > 0.01 && <div style={{ position:'absolute', left:CX - 220, top:800, width:440, height:640, transform:`translateY(${(1 - bottle) * 900}px) rotate(${(1 - bottle) * -20 + Math.sin(T * 2) * 1.5}deg)` }}>
        <div style={{ position:'absolute', left:120, top:0, width:200, height:80, borderRadius:16, background:C.ink, border:'6px solid #444' }}></div>
        <div style={{ position:'absolute', left:140, top:70, width:160, height:110, background:'linear-gradient(90deg,#4a2009,#9a4a16 45%,#4a2009)', border:OL, boxSizing:'border-box' }}></div>
        <div style={{ position:'absolute', left:0, top:160, width:440, height:480, borderRadius:'60px 60px 40px 40px', background:'linear-gradient(90deg,#4a2009,#b0581c 40%,#6a2e0e)', border:OL, boxSizing:'border-box' }}>
          <div style={{ position:'absolute', left:40, right:40, top:90, height:290, background:C.paper, border:`6px solid ${C.ink}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
            <div style={{ font:`400 78px/0.95 ${NUM}`, color:C.ink, textAlign:'center' }}>GRADO<br></br>{scan < 0.5 ? 'REACTIVO' : 'ALIMENTARIO'}</div>
            <div style={{ display:'flex', gap:22 }}>
              {(scan < 0.5 ? [C.orange, C.red] : [C.mint, C.mint]).map((c, i) => <div key={i} style={{ width:58, height:58, background:'#fff', border:`7px solid ${c}`, transform:'rotate(45deg)' }}></div>)}
            </div>
          </div>
          <div style={{ position:'absolute', left:30, top:30, width:50, height:380, borderRadius:25, background:'rgba(255,255,255,.22)' }}></div>
        </div>
        {scan > 0 && scan < 1 && <div style={{ position:'absolute', left:-60, right:-60, top:180 + scan * 440, height:12, background:C.mint, boxShadow:`0 0 30px 10px ${C.mint}` }}></div>}
      </div>}
      {stamp > 0.01 && <div style={{ position:'absolute', left:60, right:60, top:1060, display:'flex', justifyContent:'center', transform:`scale(${lerp(2.6, 1, stamp)}) rotate(-11deg)`, opacity:clamp(stamp * 3, 0, 1) }}>
        <div style={{ font:`400 120px/1 ${NUM}`, color:C.ink, background:C.mint, border:`12px solid ${C.ink}`, boxShadow:`14px 14px 0 ${C.yellow}`, padding:'10px 40px', textAlign:'center' }}>✓ ESTE SÍ</div>
      </div>}
      <div style={{ position:'absolute', left:60, top:1400, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:22 }}>
        {chips.map((c, i) => { const p = prog(T, s + 3.9 + i * 0.3, s + 4.25 + i * 0.3, MOTION.pop); return (
          <div key={i} style={{ font:`700 32px ${MONO}`, color:C.yellow, border:`5px solid ${C.yellow}`, background:C.ink, padding:'12px 22px', transform:`scale(${p}) rotate(${i % 2 ? 1.5 : -1.5}deg)`, transformOrigin:'0 50%' }}>✕ {c}</div>); })}
      </div>
    </Bg>
  );
}

const FORMULAS = ['(C₁₂H₁₈O₉)ₙ', 'NaCl', 'C₆H₈O₇', 'NaHCO₃', 'C₆H₁₂O₆'];
const FBG = [C.magenta, C.blue, C.yellow, C.mint, C.violet];
const MENU = [['Postre', 'Agar con fruta', '(C₁₂H₁₈O₉)ₙ', C.magenta], ['Aderezo', 'Cloruro de sodio', 'NaCl', C.blue], ['Acidulante', 'Ácido cítrico', 'C₆H₈O₇', C.yellow], ['Leudante', 'Bicarbonato', 'NaHCO₃', C.mint], ['Combustible', 'Glucosa', 'C₆H₁₂O₆', C.orange]];
function MenuScene({ T, K }) {
  if (!live(T, K.R, K.E)) return null;
  const s = K.R, card = prog(T, s + 0.1, s + 0.55, MOTION.pop), fork = prog(T, s + 0.4, s + 0.8, MOTION.pop);
  return (
    <Bg color={C.cyan} kind="cyan" T={T}>
      <div style={{ position:'absolute', left:0, top:0, width:W, height:H, transform:`rotate(14deg) translate(${(1 - fork) * -700}px, 0)` }}><Fork x={70} y={1700} rot={180} s={0.9} /></div>
      <div style={{ position:'absolute', left:110, top:720, width:860, height:1000, background:C.paper, border:OL, boxShadow:`20px 20px 0 ${C.ink}`, transform:`translateY(${(1 - card) * 1400}px) rotate(${-2 + (1 - card) * 14}deg)`,
        backgroundImage:'repeating-linear-gradient(180deg, transparent 0 58px, rgba(22,18,15,.06) 58px 60px)', padding:'50px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:22 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`8px solid ${C.ink}`, paddingBottom:16 }}>
          <div style={{ font:`400 120px/0.9 ${NUM}`, color:C.ink }}>MENÚ</div>
          <div style={{ font:`700 28px ${MONO}`, color:C.ink, textAlign:'right', lineHeight:1.3 }}>DEL LAB<br></br>GRADO ALIMENTARIO</div>
        </div>
        {MENU.map(([cat, name, f, col], i) => { const p = prog(T, s + 0.8 + i * 0.32, s + 1.15 + i * 0.32, MOTION.pop); return (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:22, transform:`scale(${p}) rotate(${(i % 2 ? 1 : -1) * (1 - p) * 20}deg)`, transformOrigin:'0 50%', paddingTop:6 }}>
            <div style={{ width:64, height:64, flexShrink:0, borderRadius:'50%', background:col, border:`6px solid ${C.ink}` }}></div>
            <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:2 }}>
              <div style={{ font:`700 24px ${MONO}`, color:C.ink, opacity:0.75, textTransform:'uppercase' }}>{cat}</div>
              <div style={{ font:`900 58px/1 ${FONT}`, fontVariationSettings:"'wdth' 90", color:C.ink }}>{name}</div>
            </div>
            <div style={{ font:`700 30px ${MONO}`, color:C.ink, background:col, border:`5px solid ${C.ink}`, padding:'6px 12px', whiteSpace:'nowrap' }}>{f}</div>
          </div>); })}
      </div>
    </Bg>
  );
}

function CierreScene({ T, K }) {
  if (!live(T, K.E, K.V)) return null;
  const hx = [[70, 330, 120, 0], [900, 560, 90, 1.3], [150, 1560, 150, 2.1], [880, 1400, 110, 3.2], [480, 260, 70, 4]];
  return (
    <div style={{ position:'absolute', inset:0, background:'#0b0c10' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(90% 58% at 50% 42%, rgba(232,166,42,.22) 0%, rgba(232,166,42,0) 60%)' }}></div>
      {hx.map(([x, y, s, ph], i) => <div key={i} style={{ position:'absolute', left:x, top:y, width:s, height:s * 1.1, clipPath:HEX, background:[C.pink, C.cyan, C.yellow, C.mint, C.orange][i], opacity:0.5, transform:`translateY(${Math.sin(T * 0.9 + ph) * 30}px) rotate(${T * 20 + ph * 40}deg)` }}></div>)}
    </div>
  );
}

/* ================= TRANSITION BURST ================= */
function Burst({ T, tc, kind, colors, seed, glyph, dir = 1, chaos, flash }) {
  const u = T - tc;
  if (u < -0.58 || u > 0.6) return null;
  const n = colors.length;
  const tex = (i) => i % 3 === 1 ? { backgroundImage:'radial-gradient(circle, rgba(0,0,0,.28) 34%, transparent 37%)', backgroundSize:'22px 22px' } : i % 3 === 2 ? { backgroundImage:'repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 12px, transparent 12px 26px)' } : {};
  const IN = (a, b) => prog(T, a, b, MOTION.enter), OUT = (a, b) => prog(T, a, b, MOTION.draw);
  let base = null;
  if (kind === 'slats') {
    const N = 9;
    base = <div style={{ position:'absolute', left:-W * 0.7, top:-H * 0.25, width:W * 2.4, height:H * 1.5, display:'flex', flexDirection:'column', transform:`rotate(${-20 * dir}deg)` }}>
      {Array.from({ length:N }, (_, i) => { const side = i % 2 ? 1 : -1, s2 = tc + 0.05 + i * 0.028;
        const x = T < s2 ? lerp(side * -110, 0, IN(tc - 0.55 + i * 0.022, tc - 0.12 + i * 0.01)) : lerp(0, side * 110, OUT(s2, s2 + 0.36));
        return <div key={i} style={{ flex:1, marginTop:-2, background:colors[i % n], ...tex(i), transform:`translateX(${x}%)`, borderTop:OL }}></div>; })}
    </div>;
  } else if (kind === 'tiles') {
    const cols = 5, rows = 9, tw = W / cols, th = H / rows, tiles = [];
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const d1 = ((dir > 0 ? c : cols - 1 - c) + r) / (cols + rows - 2) * 0.25, d2 = 0.25 - d1;
      const p = T < tc + 0.04 ? IN(tc - 0.55 + d1, tc - 0.3 + d1) : 1 - OUT(tc + 0.05 + d2, tc + 0.3 + d2);
      tiles.push(<div key={c + '-' + r} style={{ position:'absolute', left:c * tw - 1, top:r * th - 1, width:tw + 2, height:th + 2, background:colors[(c * 3 + r * 5) % n], ...((c + r) % 4 === 1 ? tex(1) : {}), transform:`scale(${p * 1.02}) rotate(${(1 - p) * 90 * dir}deg)` }}></div>);
    }
    base = <div style={{ position:'absolute', inset:0 }}>{tiles}</div>;
  } else {
    const r = rng(seed), cx = W * (0.3 + r() * 0.4), cy = H * (0.35 + r() * 0.3), D = 2 * Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) + 40;
    base = <div style={{ position:'absolute', inset:0 }}>{Array.from({ length:7 }, (_, k) => { const dk = D * (1 - k * 0.13), s2 = tc + 0.05 + (6 - k) * 0.04;
      const p = T < s2 ? IN(tc - 0.55 + k * 0.04, tc - 0.22 + k * 0.03) : 1 - OUT(s2, s2 + 0.32);
      return <div key={k} style={{ position:'absolute', left:cx - dk / 2, top:cy - dk / 2, width:dk, height:dk, borderRadius:'50%', background:colors[k % n], border:OL, ...tex(k), transform:`scale(${p})` }}></div>; })}</div>;
  }
  const r = rng(seed * 31 + 5), ns = Math.round(9 * chaos);
  const shards = Array.from({ length:ns }, (_, i) => {
    const x = r() * W, y = r() * H, z = 120 + r() * 240, rot = r() * 360, a = Math.atan2(y - H / 2, x - W / 2);
    const poly = `polygon(${r() * 40}% 0%, 100% ${30 + r() * 60}%, ${r() * 30}% 100%)`;
    const sc = u < 0 ? prog(T, tc - 0.42 + i * 0.02, tc - 0.18 + i * 0.02, MOTION.pop) : 1 - OUT(tc + 0.12, tc + 0.42);
    return <div key={i} style={{ position:'absolute', left:x - z / 2, top:y - z / 2, width:z, height:z, clipPath:poly, background:i % 2 ? C.ink : colors[(i + 2) % n], transform:`translate(${Math.cos(a) * u * 800}px, ${Math.sin(a) * u * 800}px) rotate(${rot + u * 220 * dir}deg) scale(${sc})` }}></div>;
  });
  const lines = Math.max(0, 1 - Math.abs(u) / 0.32);
  const gs = lerp(2.6, 1, IN(tc - 0.25, tc + 0.2)), go = T < tc - 0.25 ? 0 : 1 - OUT(tc + 0.2, tc + 0.42);
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {base}
      <div style={{ position:'absolute', inset:0, opacity:lines * 0.9, background:`repeating-conic-gradient(from ${tc * 40}deg at 50% 50%, ${C.ink} 0deg 1.6deg, transparent 1.6deg 9deg)`,
        WebkitMaskImage:'radial-gradient(circle at 50% 50%, transparent 22%, #000 60%)', maskImage:'radial-gradient(circle at 50% 50%, transparent 22%, #000 60%)' }}></div>
      {shards}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:go }}>
        <div style={{ font:`400 ${glyph.length > 3 ? 300 : 440}px/1 ${NUM}`, color:colors[1 % n], WebkitTextStroke:`10px ${C.ink}`, transform:`scale(${gs}) rotate(${-8 * dir}deg)`, textShadow:`20px 20px 0 ${C.ink}`, whiteSpace:'nowrap' }}>{glyph}</div>
      </div>
      {flash && u >= 0 && u < 0.045 ? <div style={{ position:'absolute', inset:0, background:colors[2 % n] }}></div> : null}
    </div>
  );
}

/* ================= SERIES KIT ================= */
function Avatar({ T, src, at, until, left, width, top }) {
  if (T < at || T > until + 0.4) return null;
  const inP = prog(T, at, at + 0.55, MOTION.pop), outP = prog(T, until - 0.1, until + 0.35, MOTION.draw);
  const w = wobble(T, at + 0.35, 6, 20) * 0.1;
  return <img src={src} alt="" style={{ position:'absolute', left, top:lerp(1960, top, inP) + outP * 700, width, height:'auto', transformOrigin:'50% 100%', transform:`scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 26px 40px rgba(0,0,0,.55))' }} />;
}
function Headline({ T, at, until, y, lines, hi, tilt = 0, marker = true }) {
  if (T < at || T > until) return null;
  const out = prog(T, until - 0.25, until, MOTION.draw), c = hi;
  return (
    <div style={{ position:'absolute', left:60, right:60, top:y, display:'flex', flexDirection:'column', alignItems:'center', gap:18, textAlign:'center', opacity:1 - out, transform:`translateY(calc(-50% - ${out * 40}px)) rotate(${tilt}deg)` }}>
      {lines.map((ln, li) => { let on = false; return (
        <div key={li} style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:ln.mono ? '0.45em' : '0.24em',
          font:ln.mono ? `800 ${ln.size}px ${FONT}` : `900 ${ln.size}px/1 ${FONT}`, fontVariationSettings:ln.mono ? "'wdth' 110" : "'wdth' 96", letterSpacing:ln.mono ? '0.12em' : '-0.02em',
          textTransform:ln.mono ? 'uppercase' : 'none', color:INK, textShadow:ln.mono ? SHADOW : '0 6px 0 rgba(0,0,0,.9), 0 0 34px rgba(0,0,0,.95)' }}>
          {ln.t.split(' ').map((w, wi) => {
            let word = w; if (word.startsWith('*')) { on = true; word = word.slice(1); }
            const isAcc = on; if (word.includes('*')) { word = word.replace('*', ''); on = false; }
            const t0 = at + (ln.d || 0) + wi * 0.06, p = prog(T, t0, t0 + 0.45, MOTION.enter), s = prog(T, t0, t0 + 0.4, MOTION.pop);
            if (isAcc && marker && !ln.mono) {
              const wipe = prog(T, t0 + 0.05, t0 + 0.35, MOTION.enter), pulse = 1 + 0.08 * Math.max(0, wobble(T, t0 + 0.5, 5, 14)), clip = `inset(0 ${(1 - wipe) * 100}% 0 0)`;
              return <span key={wi} style={{ display:'inline-block', position:'relative', opacity:p, color:DARK, textShadow:'none', padding:'0.04em 0.16em 0.08em', margin:'0 0.02em', transform:`translateY(${(1 - p) * 50}px) scale(${lerp(1.5, 1, s) * pulse}) rotate(${wi % 2 ? 2 : -2}deg)` }}>
                <span style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.85)', transform:'translate(8px,8px) skewX(-8deg)', clipPath:clip }}></span>
                <span style={{ position:'absolute', inset:0, background:c, transform:'skewX(-8deg)', clipPath:clip }}></span>
                <span style={{ position:'relative' }}>{word}</span>
              </span>;
            }
            return <span key={wi} style={{ display:'inline-block', opacity:ln.mono ? p * 0.95 : p, transform:`translateY(${(1 - p) * 50}px) scale(${lerp(1.35, 1, s)})`, color:isAcc && !ln.mono ? c : undefined }}>{word}</span>;
          })}
        </div>); })}
    </div>
  );
}
function Chapter({ T, K }) {
  const ch = [[K.A, '1', 'Agar'], [K.S, '2', 'Cloruro de sodio'], [K.Ci, '3', 'Ácido cítrico'], [K.B, '4', 'Bicarbonato'], [K.G, '5', 'Glucosa']];
  const vis = prog(T, K.A + 0.2, K.A + 0.6) * (1 - prog(T, K.Tr - 0.3, K.Tr));
  if (vis <= 0) return null;
  let cur = ch[0]; for (const c of ch) if (T >= c[0]) cur = c;
  const p = prog(T, cur[0] + 0.2, cur[0] + 0.7, MOTION.pop);
  return (
    <div style={{ position:'absolute', right:50, top:200, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10, opacity:vis, zIndex:40 }}>
      <div style={{ font:`900 30px ${FONT}`, color:DARK, background:C.yellow, padding:'8px 16px', letterSpacing:'0.1em', border:`4px solid ${C.ink}`, transform:`scale(${p}) rotate(2deg)`, transformOrigin:'100% 50%' }}>{cur[1]}/5</div>
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
function AudioTrack({ src, T, playing, vol }) {
  const on = vol > 0, ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    a.muted = !on; a.volume = clamp(vol, 0, 1);
    if (playing && on) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => { window.dispatchEvent(new Event('sfx-blocked')); }); } if (Math.abs(a.currentTime - T) > 0.25) a.currentTime = T; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - T) > 0.05) a.currentTime = T; }
  });
  return <audio ref={ref} src={src} preload="auto" style={{ display:'none' }} />;
}
function RobotVoice({ time, playing, on, lines }) {
  const last = React.useRef(0), voice = React.useRef(null);
  React.useEffect(() => {
    const ss = window.speechSynthesis; if (!ss) return;
    const pick = () => { const vs = ss.getVoices(); voice.current = vs.find(v => /es-MX/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; };
    pick(); ss.onvoiceschanged = pick;
    return () => ss.cancel();
  }, []);
  React.useEffect(() => {
    const ss = window.speechSynthesis; if (!ss) return;
    const prev = last.current; last.current = time;
    if (!on || !playing) { if (ss.speaking) ss.cancel(); return; }
    if (time < prev - 0.05) { ss.cancel(); return; }
    const hit = lines.find(l => prev < l.at && time >= l.at && time - l.at < 0.35);
    if (!hit) return;
    ss.cancel();
    const u = new SpeechSynthesisUtterance(hit.say);
    if (voice.current) u.voice = voice.current;
    u.lang = voice.current ? voice.current.lang : 'es-MX';
    u.pitch = 0.05; u.rate = hit.rate || 1.2; u.volume = 1;
    ss.speak(u);
  });
  return null;
}
function AudioUnlock() {
  const [blocked, setBlocked] = React.useState(false);
  React.useEffect(() => {
    const on = () => setBlocked(true);
    const unlock = () => { document.querySelectorAll('audio').forEach((a) => { const p = a.play(); if (p && p.then) p.then(() => a.pause()).catch(() => {}); }); setBlocked(false); };
    window.addEventListener('sfx-blocked', on); window.addEventListener('pointerdown', unlock);
    return () => { window.removeEventListener('sfx-blocked', on); window.removeEventListener('pointerdown', unlock); };
  }, []);
  if (!blocked) return null;
  return <div style={{ position:'fixed', top:16, left:'50%', transform:'translateX(-50%)', zIndex:9999, background:C.gold, color:DARK, font:`900 15px ${FONT}`, padding:'10px 18px', borderRadius:999, boxShadow:'0 8px 24px rgba(0,0,0,.5)', cursor:'pointer' }}>Toca aquí para activar el sonido</div>;
}
function OutroVideo({ T, K, playing }) {
  const ref = React.useRef(null);
  const DUR = 2.81, local = clamp(T - K.V, 0, DUR - 0.02);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (T >= K.V && playing) { if (v.paused) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(v.currentTime - local) > 0.3) v.currentTime = local; }
    else { if (!v.paused) v.pause(); if (Math.abs(v.currentTime - local) > 0.03) v.currentTime = local; }
  });
  return <div style={{ position:'absolute', inset:0, background:'#000', opacity:T >= K.V ? 1 : 0, zIndex:60 }}>
    <video ref={ref} src="assets/cierre.mp4" muted playsInline preload="auto" data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(DUR)} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
  </div>;
}

/* ================= PIECE ================= */
function Piece({ tw }) {
  const { T, CUES, time, playing } = useComposition();
  const K = { H:CUES.Hook, A:CUES.Agar, S:CUES.Sal, Ci:CUES.Citrico, B:CUES.Bicarbonato, G:CUES.Glucosa, Tr:CUES.Condicion, R:CUES.Menu, E:CUES.Cierre, V:CUES.Outro };
  const chaos = tw.chaos ?? 1, flash = tw.flashFrames ?? true, shakeK = tw.shake ?? 1, rhythm = tw.rhythm ?? 1, flashHook = tw.flashHook ?? true;
  let Tv = T, punch = 1;
  if (T < K.H) {
    if (flashHook) { const cuts = [K.A + 3.7, K.B + 5.0, K.R + 2.6], i = Math.min(2, Math.floor((T / K.H) * 3)), lt = T - (i * K.H) / 3; Tv = cuts[i] + lt * 0.6; punch = 1.16 - 0.1 * prog(lt, 0, K.H / 3, MOTION.enter); }
    else Tv = K.H;
  }
  const shakes = [[K.H + 1.0, 30], [K.A + 3.0, 12], [K.S + 0.7, 8], [K.Ci + 1.3, 14], [K.B + 1.2, 8], [K.B + 1.7, 8], [K.B + 5.2, 24], [K.G + 2.9, 22], [K.G + 3.5, 9], [K.G + 4.0, 9], [K.G + 4.5, 12], [K.Tr + 0.2, 18], [K.Tr + 2.85, 26], [K.R + 0.5, 20]];
  let sh = 0; shakes.forEach(([h, a]) => { if (Tv >= h && Tv < h + 0.5) sh += a * (1 - prog(Tv, h, h + 0.5)); }); sh *= shakeK;
  const sx = Math.sin(Tv * 97) * sh, sy = Math.cos(Tv * 83) * sh;
  const BEAT = 0.96, bT = T - K.H, bi = Math.floor(bT / BEAT), bt = bT - bi * BEAT;
  let lc = -9; [K.A, K.S, K.Ci, K.B, K.G, K.Tr, K.R, K.E].forEach((c) => { if (T >= c) lc = c; });
  const lv = T >= K.H && T < K.V ? 1 : 0;
  const bp = rhythm * lv * Math.exp(-bt * 9), ck = rhythm * lv * Math.exp(-(T - lc) * 10);
  const zoom = 1 + 0.045 * bp + 0.12 * ck, rz = (bi % 2 ? 1 : -1) * 0.7 * bp;
  const ox = ((bi % 3) - 1) * 16 * bp, oy = (((bi + 1) % 3) - 1) * 12 * bp;
  const cutFlash = lv * Math.max(0, 1 - (T - lc) / 0.09) * Math.min(1, rhythm);
  const P = { T:Tv, K, chaos };
  const HP = { T:Tv, marker:tw.subStyle !== 'Clásico' };
  const bursts = [
    { tc:K.A, kind:'tiles', colors:[C.pink, C.yellow, C.magenta, C.paper, C.teal], seed:2, glyph:'01', dir:1 },
    { tc:K.S, kind:'slats', colors:[C.magenta, C.blue, C.yellow, C.paper, C.cyan], seed:3, glyph:'02', dir:-1 },
    { tc:K.Ci, kind:'rings', colors:[C.blue, C.yellow, C.pink, C.ink, C.cyan], seed:4, glyph:'03', dir:1 },
    { tc:K.B, kind:'tiles', colors:[C.yellow, C.mint, C.pink, C.blue, C.ink], seed:5, glyph:'04', dir:-1 },
    { tc:K.G, kind:'slats', colors:[C.mint, C.orange, C.violet, C.lilac, C.ink], seed:6, glyph:'05', dir:1 },
    { tc:K.Tr, kind:'rings', colors:[C.orange, C.red, C.ink, C.yellow, C.violet], seed:7, glyph:'*', dir:-1 },
    { tc:K.R, kind:'tiles', colors:[C.ink, C.yellow, C.red, C.cyan, C.ink], seed:8, glyph:'MENÚ', dir:1 },
    { tc:K.E, kind:'slats', colors:[C.cyan, C.gold, C.pink, C.yellow, C.ink], seed:9, glyph:'ÑAM', dir:-1 },
  ];
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position:'absolute', left:0, top:0, width:W, height:H, overflow:'hidden', background:C.ink }}>
      <div style={{ position:'absolute', inset:0, transform:`translate(${sx + ox}px,${sy + oy}px) scale(${punch * zoom}) rotate(${rz}deg)` }}>
        <HookScene {...P} />
        <AgarScene {...P} />
        <SalScene {...P} />
        <CitricoScene {...P} />
        <BicarbScene {...P} />
        <BrainScene {...P} />
        <TrampaScene {...P} />
        <MenuScene {...P} />
        <CierreScene {...P} />
        <Avatar T={Tv} src={AV('avatar_11_sorprendido')} at={K.H + 1.15} until={K.A - 0.1} left={600} width={480} top={1440} />
        <Avatar T={Tv} src={AV('avatar_06_pensativo_menton')} at={K.S + 2.9} until={K.Ci - 0.15} left={-40} width={420} top={1500} />
        <Avatar T={Tv} src={AV('avatar_11_sorprendido')} at={K.B + 5.3} until={K.G - 0.15} left={-40} width={360} top={1580} />
        <Avatar T={Tv} src={AV('avatar_10_serio_molesto')} at={K.Tr + 3.3} until={K.R - 0.15} left={640} width={440} top={1480} />
        <Avatar T={Tv} src={AV('avatar_02_apuntando_camara')} at={K.E + 0.8} until={K.V + 0.2} left={20} width={1040} top={980} />
        <Chapter T={Tv} K={K} />
        <Headline {...HP} hi={C.yellow} tilt={-2} at={K.H + 0.3} until={K.A - 0.05} y={540} lines={[{ t:'Esto del laboratorio', size:96 }, { t:'*te lo puedes comer.*', size:110, d:0.2 }]} />
        <Headline {...HP} hi={C.mint} tilt={1.5} at={K.A + 0.3} until={K.A + 2.95} y={540} lines={[{ t:'Ese gel donde crecen bacterias: *agar.*', size:88 }]} />
        <Headline {...HP} hi={C.yellow} tilt={-1.5} at={K.A + 3.0} until={K.S - 0.05} y={540} lines={[{ t:'En Japón se come de *postre.*', size:104 }, { t:'Kanten · con fruta y almíbar', size:30, d:0.6, mono:true }]} />
        <Headline {...HP} hi={C.yellow} tilt={1.5} at={K.S + 0.3} until={K.S + 2.55} y={540} lines={[{ t:'El frasco dice *NaCl.*', size:112 }]} />
        <Headline {...HP} hi={C.cyan} tilt={-2} at={K.S + 2.6} until={K.Ci - 0.05} y={540} lines={[{ t:'Tu cocina dice *sal.*', size:120 }, { t:'Misma molécula, otra etiqueta', size:30, d:0.6, mono:true }]} />
        <Headline {...HP} hi={C.pink} tilt={-1.5} at={K.Ci + 0.3} until={K.Ci + 2.45} y={540} lines={[{ t:'*Ácido cítrico:* el reactivo que le robamos al limón.', size:80 }]} />
        <Headline {...HP} hi={C.pink} tilt={1.5} at={K.Ci + 2.5} until={K.B - 0.05} y={540} lines={[{ t:'Te lo comes en cada *dulce ácido.*', size:88 }, { t:'Aditivo E330', size:30, d:0.6, mono:true }]} />
        <Headline {...HP} hi={C.blue} tilt={-2} at={K.B + 0.3} until={K.B + 2.95} y={530} lines={[{ t:'En el lab, el *bicarbonato* es buffer: mantiene el pH del cultivo.', size:76 }, { t:'Sistema tampón HCO₃⁻ / CO₂', size:28, d:0.8, mono:true }]} />
        <Headline {...HP} hi={C.coral} tilt={1.5} at={K.B + 3.1} until={K.G - 0.05} y={520} lines={[{ t:'En el horno, el calor lo rompe en CO₂ y *tu pastel se infla.*', size:78 }, { t:'Leudante químico', size:28, d:0.8, mono:true }]} />
        <Headline {...HP} hi={C.orange} tilt={-1.5} at={K.G + 0.3} until={K.G + 2.75} y={540} lines={[{ t:'Las células en cultivo comen *glucosa.*', size:88 }]} />
        <Headline {...HP} hi={C.orange} tilt={2} at={K.G + 2.8} until={K.Tr - 0.05} y={540} lines={[{ t:'Tu *cerebro* también. Y mucha.', size:104 }]} />
        <Headline {...HP} hi={C.mint} tilt={-1.5} at={K.Tr + 1.4} until={K.R - 0.05} y={460} lines={[{ t:'Única condición: que sea *grado alimentario.*', size:84 }, { t:'Reactivo: posibles trazas de metales pesados u otros químicos', size:26, d:0.8, mono:true }]} />
        <Headline {...HP} hi={C.yellow} tilt={1.5} at={K.R + 0.3} until={K.E - 0.05} y={540} lines={[{ t:'Hoy el lab *cocina.*', size:120 }]} />
        <Headline {...HP} hi={C.gold2} tilt={-2} at={K.E + 0.25} until={K.V - 0.05} y={560} lines={[{ t:'Buen', size:120 }, { t:'*provecho.*', size:170, d:0.3 }, { t:'Ciencia que se podría comer', size:32, d:0.8, mono:true }]} />
        {bursts.map((b, i) => <Burst key={i} T={Tv} chaos={chaos} flash={flash} {...b} />)}
        <Watermark T={Tv} K={K} num={tw.shotNum || '25'} />
      </div>
      {cutFlash > 0 && <div style={{ position:'absolute', inset:0, background:'#fff', opacity:cutFlash * 0.55, pointerEvents:'none' }}></div>}
      <OutroVideo T={T} K={K} playing={playing} />
      <AudioTrack src="assets/MEZCLA_FINAL_shot_lab.wav" T={time} playing={playing} vol={tw.musicVol ?? 0.9} />
      <RobotVoice time={time} playing={playing} on={tw.robotVoice ?? false} lines={[
        { at:K.H + 0.3, say:'Esto del laboratorio. Te lo puedes comer.' },
        { at:K.A + 0.3, say:'Ese gel donde crecen bacterias: agar.' },
        { at:K.A + 3.0, say:'En Japón se come de postre.' },
        { at:K.S + 0.3, say:'El frasco dice: cloruro de sodio.' },
        { at:K.S + 2.6, say:'Tu cocina dice: sal.' },
        { at:K.Ci + 0.3, say:'Ácido cítrico. El reactivo que le robamos al limón.', rate:1.35 },
        { at:K.Ci + 2.5, say:'Te lo comes en cada dulce ácido.' },
        { at:K.B + 0.3, say:'En el lab, el bicarbonato es buffer. Mantiene el pH del cultivo.', rate:1.4 },
        { at:K.B + 3.1, say:'En el horno, el calor lo rompe en ce o dos. Y tu pastel se infla.', rate:1.35 },
        { at:K.G + 0.3, say:'Las células en cultivo comen glucosa.' },
        { at:K.G + 2.8, say:'Tu cerebro también. Y mucha.' },
        { at:K.Tr + 1.4, say:'Única condición: que sea grado alimentario.' },
        { at:K.R + 0.3, say:'Hoy, el lab cocina.' },
        { at:K.E + 0.25, say:'Buen provecho.', rate:1 },
      ]} />
    </div>
  );
}

function ShotLabApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.ink}>
        <Piece tw={t} />
      </CompositionStage>
      <AudioUnlock />
      <TweaksPanel>
        <TweakSection label="Vídeo" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakText label="Número de shot" value={t.shotNum} onChange={(v) => setTweak('shotNum', v)} />
        <TweakToggle label="Flash-forward al inicio" value={t.flashHook} onChange={(v) => setTweak('flashHook', v)} />
        <TweakRadio label="Subtítulos" value={t.subStyle || 'Marcador'} options={['Marcador', 'Clásico']} onChange={(v) => setTweak('subStyle', v)} />
        <TweakToggle label="Voz robótica" value={t.robotVoice ?? false} onChange={(v) => setTweak('robotVoice', v)} />
        <TweakSlider label="Volumen audio" value={t.musicVol ?? 0.9} min={0} max={1} step={0.05} onChange={(v) => setTweak('musicVol', v)} />
        <TweakSection label="Transiciones" />
        <TweakSlider label="Caos" value={t.chaos} min={0} max={1.6} step={0.1} onChange={(v) => setTweak('chaos', v)} />
        <TweakToggle label="Flash frames" value={t.flashFrames} onChange={(v) => setTweak('flashFrames', v)} />
        <TweakSlider label="Ritmo (zooms y cortes)" value={t.rhythm} min={0} max={1.6} step={0.1} onChange={(v) => setTweak('rhythm', v)} />
        <TweakSlider label="Sacudida" value={t.shake} min={0} max={1.6} step={0.1} onChange={(v) => setTweak('shake', v)} />
      </TweaksPanel>
    </div>
  );
}
window.ShotLabApp = ShotLabApp;
