// Shot Fungi Mati #121 · Este costal no es solo comida para tu milpa — NARRADO (N1 Por dentro + N2 El número; gancho 1 con número dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Piezas propias (milpa, costal, moléculas, corte de suelo, hifa, P450nor, tubitos, frascos de tierra) viven aquí para no tocar el kit.

const NX = { N:'#4d7cff', O:'#ff4d3d', tierra:'#6b4a2e', tierra2:'#4e3420', grano:'#b98a5a', grano2:'#8a6238', aire:'#3b2a1e', agua:'#1f5fa8',
  hifa:'#f3ead6', enzima:'#8a5cd6', hemo:'#d62828', costal:'#efe3c2', maiz:'#4fbf4a', tallo:'#3a9d3a', elote:'#f4c542', naranja:'#ffb07a' };

// Subtítulo con *resaltado* y _cursiva_ (especies en cursiva también en el subtítulo). Usa window.SUBS[idx] en la narrada.
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

// Moléculas esquemáticas: N (azul) y O (rojo). tipo: N2O · N2 · NO · O2 · NO3
function Mol({ x, y, s = 1, tipo = 'N2O', rot = 0, o = 1 }) {
  const A = { N2O: [['N', -34, 0], ['N', 0, 0], ['O', 37, 0]], N2: [['N', -17, 0], ['N', 17, 0]], NO: [['N', -17, 0], ['O', 19, 0]],
    O2: [['O', -19, 0], ['O', 19, 0]], NO3: [['O', 0, -37], ['O', -32, 19], ['O', 32, 19], ['N', 0, 0]] }[tipo];
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {A.map(([e, ax, ay], i) => <g key={i}>
      <circle cx={ax} cy={ay} r={e === 'N' ? 18 : 20} fill={NX[e]} stroke={KC.ink} strokeWidth={4} />
      <text x={ax} y={ay + 7} textAnchor="middle" style={{ font:`900 20px ${KF.texto}` }} fill="#fff">{e}</text>
    </g>)}
  </g>;
}
// N₂O que sube en burbujitas desde el suelo. p 0..1 = cuánto gas.
function GasSube({ T, p = 1, x0 = 120, x1 = 960, y = 1000, alto = 520, n = 9, seed = 3, s = 0.8 }) {
  if (p <= 0) return null;
  const g = krng(seed);
  const pts = Array.from({ length: n }, () => [klerp(x0, x1, g()), g()]);
  return <g>{pts.map(([px, f], i) => { const u = (T * 0.22 + f) % 1;
    return <Mol key={i} x={px + Math.sin(u * 6 + i) * 18} y={y - u * alto} s={s} rot={u * 90 + i * 30} o={p * Math.min(1, u * 5, (1 - u) * 3)} />; })}</g>;
}

// Mata de maíz (milpa). Base en (x, y).
function Maiz({ T, x, y, s = 1, seed = 1, alto = 470 }) {
  const m = mece(T, seed, 0.5) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${m}) scale(${s})`}>
    <path d={`M -9 0 L -5 ${-alto} L 5 ${-alto} L 9 0 Z`} fill={NX.tallo} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((k) => { const yy = -alto * (0.18 + 0.16 * k), sd = k % 2 ? 1 : -1, l = 170 - k * 18;
      return <path key={k} d={`M 0 ${yy} Q ${sd * l * 0.5} ${yy - 70} ${sd * l} ${yy + 24} Q ${sd * l * 0.5} ${yy - 34} 0 ${yy + 14} Z`} fill={NX.maiz} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />; })}
    <g transform={`translate(18 ${-alto * 0.5}) rotate(14)`}>
      <ellipse rx={18} ry={50} fill={NX.elote} stroke={KC.ink} strokeWidth={4} />
      <path d="M -20 30 Q -30 -20 -4 -56 Q 4 -10 20 30 Q 0 46 -20 30 Z" fill="#7ed957" stroke={KC.ink} strokeWidth={4} />
    </g>
    {[-30, -12, 8, 26].map((dx, i) => <line key={i} x1={0} y1={-alto} x2={dx} y2={-alto - 50 + Math.abs(dx) * 0.6} stroke="#d9b84a" strokeWidth={5} strokeLinecap="round" />)}
  </g>;
}
// Costal genérico de fertilizante (sin marca real).
function Costal({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -130 -200 Q -152 0 -122 170 Q 0 202 122 170 Q 152 0 130 -200 Q 0 -232 -130 -200 Z" fill={NX.costal} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={-205} rx={126} ry={24} fill="#d8c79f" stroke={KC.ink} strokeWidth={6} />
    <rect x={-96} y={-120} width={192} height={170} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-82} textAnchor="middle" style={{ font:`900 25px ${KF.texto}` }} fill={KC.ink}>FERTILIZANTE</text>
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={NX.N} stroke={KC.ink} strokeWidth={3}>N</text>
  </g>;
}
// Granitos que caen de (x, y) al suelo (y suelo). at..fin = cuándo cae.
function Granitos({ T, x, y, suelo = 1000, at, fin, n = 46 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const b = at + (i / n) * (fin - at), age = T - b; if (age < 0) return null;
    const dx = ((i * 53) % 23 - 11) * 9, gx = x + dx * Math.min(1, age * 2) + Math.min(age, 0.5) * 60, gy = Math.min(suelo + 4 + ((i * 7) % 5) * 5, y + 0.5 * 2400 * age * age);
    return <circle key={i} cx={gx} cy={gy} r={7} fill={i % 3 ? '#ffffff' : '#bcd3ff'} stroke={KC.ink} strokeWidth={2} />; })}</g>;
}
// Milpa (macro): suelo, 4 matas de maíz y una calabaza. children = lo que va encima (costal, gas, hifas).
function Milpa({ T, children, hifas = 0, lluvia = 0 }) {
  return <g>
    <rect x={0} y={1000} width={1080} height={1000} fill={NX.tierra} />
    <path d="M 0 1000 Q 270 985 540 1002 Q 800 1015 1080 996" stroke={KC.ink} strokeWidth={8} fill="none" />
    {[[90, 1050, 60], [400, 1090, 80], [760, 1060, 70], [250, 1140, 50], [930, 1130, 60]].map(([cx, cy, r], i) => <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.25} fill={NX.tierra2} opacity=".6" />)}
    {hifas > 0 && <><RedHifas T={T} x={300} y={1080} g={hifas} seed={4} n={220} escala={0.22} color="#fff4d6" ancho={3} />
      <RedHifas T={T} x={760} y={1090} g={hifas} seed={9} n={220} escala={0.22} color="#fff4d6" ancho={3} /></>}
    {[[160, 1004, 1.0, 1], [420, 1006, 1.08, 2], [680, 1004, 0.95, 3], [930, 1002, 1.05, 4]].map(([mx, my, ms, sd]) => <Maiz key={sd} T={T} x={mx} y={my} s={ms} seed={sd} />)}
    <g transform="translate(560 1000)"><ellipse cx={0} cy={-30} rx={58} ry={40} fill="#f2a33a" stroke={KC.ink} strokeWidth={5} /><path d="M -6 -68 q 4 -16 14 -20" stroke="#5a7a2a" strokeWidth={6} fill="none" /></g>
    {lluvia > 0 && Array.from({ length: 40 }, (_, i) => { const u = (T * 1.6 + i * 0.137) % 1; return <line key={i} x1={(i * 97) % 1080} y1={300 + u * 700} x2={(i * 97) % 1080 - 10} y2={340 + u * 700} stroke="#bfe3ff" strokeWidth={4} opacity={lluvia * 0.8} />; })}
    {children}
  </g>;
}
// Tierra con capa de ozono. adelgaza 0..1 = la capa se adelgaza donde llega el N₂O.
function TierraOzono({ T, adelgaza = 0, gas = 0 }) {
  const cx = 540, cy = 1560, R = 700, Rz = 800;
  const arco = (r, a0, a1) => { const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`; };
  return <g>
    <circle cx={cx} cy={cy} r={Rz + 30} fill="rgba(80,200,255,.08)" />
    <path d={arco(Rz, Math.PI * 1.05, Math.PI * 1.95)} stroke="#5fd6ff" strokeWidth={46} fill="none" opacity=".85" strokeLinecap="round" />
    {adelgaza > 0 && <path d={arco(Rz, Math.PI * 1.38, Math.PI * 1.62)} stroke={KC.noche} strokeWidth={46 * adelgaza * 0.75} fill="none" />}
    <circle cx={cx} cy={cy} r={R} fill="#2f6fd1" stroke={KC.ink} strokeWidth={8} />
    <path d="M 120 1100 Q 260 960 420 1010 Q 520 1050 600 990 Q 700 930 820 1010 Q 900 1060 960 1150 L 960 1300 L 120 1300 Z" fill="#46b85a" stroke={KC.ink} strokeWidth={6} opacity=".95" />
    <GasSube T={T} p={gas} x0={380} x1={700} y={960} alto={240} n={7} seed={5} s={0.7} />
  </g>;
}
// Corte del suelo (lo pequeño): granos de tierra; los poros se llenan de agua (agua 0..1); burbujas de O₂ que se acaban (o2 1..0).
const GRANOS = (() => { const g = krng(31), out = []; for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) out.push([60 + c * 160 + (g() - 0.5) * 60 + (r % 2) * 50, 450 + r * 112 + (g() - 0.5) * 40, 52 + g() * 22, g()]); return out; })();
function SueloCorte({ T, agua = 0, o2 = 1, nitrato = 1, microbios = 1 }) {
  const blob = (cx, cy, r, q) => Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2, rr = r * (0.85 + 0.3 * Math.sin(i * 2.3 + q * 9)); return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr * 0.85).toFixed(1)}`; }).join(' ') + ' Z';
  return <g>
    <rect x={0} y={380} width={1080} height={900} fill={mixHex(NX.aire, NX.agua, agua)} />
    {agua > 0 && Array.from({ length: 14 }, (_, i) => <circle key={'w' + i} cx={(i * 151) % 1080} cy={420 + ((i * 89) % 760)} r={4} fill="#bfe3ff" opacity={agua * (0.3 + 0.3 * Math.sin(T * 3 + i))} />)}
    {/* burbujas de O₂ en los poros */}
    {[[150, 520], [470, 600], [800, 540], [310, 760], [650, 830], [930, 760], [200, 990], [540, 1040], [860, 1000]].map(([bx, by], i) =>
      <Mol key={'o' + i} x={bx} y={by - (1 - o2) * 30} s={0.7} tipo="O2" o={kclamp(o2 * 1.4 - i * 0.04, 0, 1)} rot={Math.sin(T + i) * 20} />)}
    {GRANOS.map(([cx, cy, r, q], i) => <path key={i} d={blob(cx, cy, r, q)} fill={mixHex(NX.grano, NX.grano2, q)} stroke={KC.ink} strokeWidth={4} />)}
    {/* nitrato del abono */}
    {nitrato > 0 && [[260, 640], [620, 700], [900, 650], [420, 900], [760, 950], [120, 860]].map(([nx, ny], i) => <Mol key={'n' + i} x={nx + Math.sin(T * 0.8 + i) * 10} y={ny} s={0.62} tipo="NO3" o={nitrato} rot={T * 20 + i * 40} />)}
    {/* microbios: bacterias y una hifa */}
    {microbios > 0 && <g opacity={microbios}>
      {[[330, 690, 20], [700, 780, -30], [520, 960, 60]].map(([bx, by, r], i) => <BacteriaC key={'b' + i} x={bx} y={by} rot={r} s={0.42} color={KC.mint} T={T} seed={i + 3} />)}
      <path d="M -20 880 Q 200 820 360 860 Q 520 900 640 840 Q 820 760 1100 820" stroke="#fff4d6" strokeWidth={12} fill="none" strokeLinecap="round" />
    </g>}
  </g>;
}
// Hifa tabicada (micro). De x0 a x1 a la altura y.
function HifaMicro({ T, x0 = -40, x1 = 1120, y = 820, gr = 96, crece = 1 }) {
  const xe = klerp(x0, x1, crece);
  return <g>
    <rect x={x0} y={y - gr / 2} width={xe - x0} height={gr} rx={gr / 2} fill={NX.hifa} stroke={KC.ink} strokeWidth={6} />
    <rect x={x0} y={y - gr / 2 + 10} width={xe - x0 - 20} height={14} rx={7} fill="#fff" opacity=".6" />
    {[160, 400, 640, 880].filter((sx) => sx < xe - 30).map((sx) => <line key={sx} x1={sx} y1={y - gr / 2 + 4} x2={sx} y2={y + gr / 2 - 4} stroke={KC.ink} strokeWidth={5} />)}
    {[60, 280, 520, 760, 1000].filter((nx) => nx < xe - 30).map((nx, i) => <ellipse key={nx} cx={nx + Math.sin(T + i) * 6} cy={y + 6} rx={22} ry={14} fill="#7aa2ff" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Enzima P450nor (esquemática) con su grupo hemo; une NO + NO → N₂O. ciclo desde 'at'.
function P450nor({ T, x, y, s = 1, at = 0, o = 1 }) {
  const u = T < at ? 0 : ((T - at) % 1.8) / 1.8;
  const entra = kprog(u, 0, 0.45, kEase.suave), sale = kprog(u, 0.5, 1, kEase.sale);
  return <g opacity={o}>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -170 -40 Q -180 -150 -60 -170 Q 60 -200 140 -120 Q 210 -40 160 60 Q 110 160 -10 150 Q -150 150 -180 50 Z" fill={NX.enzima} stroke={KC.ink} strokeWidth={7} />
      <path d="M -120 -70 Q -60 -130 30 -120" stroke="#b996ff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".7" />
      <rect x={-46} y={-30} width={92} height={70} rx={12} fill={NX.hemo} stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={5} r={14} fill="#f4c25a" stroke={KC.ink} strokeWidth={3} />
      <text x={0} y={12} textAnchor="middle" style={{ font:`900 16px ${KF.texto}` }} fill={KC.ink}>Fe</text>
    </g>
    {T >= at && u < 0.5 && <><Mol x={klerp(x - 380, x - 30, entra)} y={klerp(y - 150, y - 10, entra)} s={0.9} tipo="NO" rot={30 * (1 - entra)} /><Mol x={klerp(x - 380, x - 30, entra)} y={klerp(y + 150, y + 30, entra)} s={0.9} tipo="NO" rot={-30 * (1 - entra)} /></>}
    {T >= at && u >= 0.5 && <Mol x={klerp(x + 40, x + 360, sale)} y={klerp(y, y - 260, sale)} s={0.95} tipo="N2O" o={1 - kprog(u, 0.9, 1)} />}
  </g>;
}
// Tubito de cultivo.
function Tubito({ x, y, on = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-11} y={-40} width={22} height={40} rx={10} fill={mixHex('#e8eef2', NX.naranja, on)} stroke={KC.ink} strokeWidth={3} style={on > 0.9 ? { filter:`drop-shadow(0 0 6px ${NX.naranja})` } : null} />
    <rect x={-13} y={-46} width={26} height={9} rx={3} fill="#9aa4b2" stroke={KC.ink} strokeWidth={2} />
  </g>;
}
const ON70 = (() => { const g = krng(207), idx = Array.from({ length: 207 }, (_, i) => i); for (let i = 206; i > 0; i--) { const j = Math.floor(g() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } return idx.slice(0, 70).sort((a, b) => a - b); })();
// Frasco con tierra (incubación en laboratorio).
function FrascoTierra({ x, y, texto, color = KC.ink }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-130} width={180} height={150} rx={22} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-70} width={160} height={82} rx={14} fill={NX.tierra} />
    <rect x={-70} y={-150} width={140} height={26} rx={8} fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-90} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={color}>{texto}</text>
  </g>;
}

function OxidoNitrosoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Oz: CUES.Ozono, Ca: CUES.Campo, Ch: CUES.Charco, P: CUES.Pregunta, B: CUES.Bacterias, H: CUES.Hongo, E: CUES.Estudio, Pa: CUES.Pastizal, M: CUES.Matiz, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, H2 = K.H + 2.4;  // segunda mitad del hongo: la enzima de cerca
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el costal cae sobre la milpa y del suelo sale N₂O */}
      <Escena T={T} a={K.G} b={K.Oz} zoom={0.05} origen="45% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<Milpa T={T}>
          <Granitos T={T} x={300} y={720} suelo={1000} at={K.G + 0.15} fin={K.G + 2.4} />
          <Costal x={250} y={600} rot={klerp(-10, -48, kprog(T, K.G, K.G + 0.5, kEase.sale))} s={0.8} />
          <GasSube T={T} p={kprog(T, K.G + 2.3, K.G + 3.2)} y={1000} alto={520} n={9} />
        </Milpa>)}
      </Escena>
      {/* 2 · ozono: el N₂O llega a la capa de ozono */}
      <Escena T={T} a={K.Oz} b={K.Ca}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} />
        {fsvg(<TierraOzono T={T} gas={1} adelgaza={kprog(T, K.Oz + 1.0, K.Oz + 3.5)} />)}
      </Escena>
      {/* 3 · campo: la mayor parte del N₂O humano sale del nitrógeno en cultivos */}
      <Escena T={T} a={K.Ca} b={K.Ch}>
        <FondoLunares color={KC.yellow} />
        {fsvg((() => { const u = kprog(T, K.Ca + 0.4, K.Ca + 1.8, kEase.sale), w = 900; return <>
          <rect x={90} y={700} width={w} height={130} rx={22} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={7} />
          <rect x={90} y={700} width={w * 0.66 * u} height={130} rx={22} fill={NX.maiz} stroke={KC.ink} strokeWidth={7} />
          <rect x={90 + w * 0.66} y={700} width={w * 0.34 * kprog(T, K.Ca + 1.4, K.Ca + 2.4, kEase.sale)} height={130} rx={22} fill="#9aa0a6" stroke={KC.ink} strokeWidth={7} />
          <g transform="translate(0 40)"><Maiz T={T} x={760} y={1110} s={0.45} seed={2} /><Maiz T={T} x={880} y={1110} s={0.5} seed={3} /><Costal x={300} y={1040} s={0.42} rot={-6} /></g>
        </>; })())}
      </Escena>
      {/* 4 · charco: llueve, los poros se llenan de agua, se acaba el oxígeno */}
      <Escena T={T} a={K.Ch} b={K.B} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:'#2a2018' }}></div>
        {fsvg(<>
          <SueloCorte T={T} agua={kprog(T, K.Ch + 0.4, K.Ch + 3.0)} o2={1 - kprog(T, K.Ch + 1.2, K.Ch + 3.6)} nitrato={kprog(T, K.Ch + 3.0, K.Ch + 3.8)} />
          {Array.from({ length: 22 }, (_, i) => { const uu = (T * 1.4 + i * 0.13) % 1; return T < K.Ch + 2.4 ? <line key={i} x1={(i * 103) % 1080} y1={260 + uu * 140} x2={(i * 103) % 1080 - 8} y2={290 + uu * 140} stroke="#bfe3ff" strokeWidth={4} opacity=".8" /> : null; })}
          {K.P <= T && <Interrogacion T={T} x={270} y={950} tam={400} />}
        </>)}
      </Escena>
      {/* 5 · bacterias: convierten el N₂O en N₂ (lo pequeño, fondo oscuro) */}
      <Escena T={T} a={K.B} b={K.H}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg((() => { const ent = kprog(T, K.B + 0.2, K.B + 1.2, kEase.suave), sal = kprog(T, K.B + 1.4, K.B + 2.4, kEase.sale); return <>
          <Bacteria T={T} x={540} y={850} largo={460} ancho={190} rot={-4} color="#7fd88a" seed={4} />
          {ent < 1 && <Mol x={klerp(80, 470, ent)} y={klerp(620, 840, ent)} s={1.3} tipo="N2O" />}
          {T > K.B + 1.4 && <Mol x={klerp(620, 930, sal)} y={klerp(840, 620, sal)} s={1.3} tipo="N2" />}
          {T > K.B + 2.2 && <path d="M 880 520 L 910 550 L 970 480" stroke={KC.mint} strokeWidth={14} fill="none" strokeLinecap="round" />}
        </>; })())}
      </Escena>
      {/* 6a · la hifa de Fusarium oxysporum */}
      <Escena T={T} a={K.H} b={H2}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<HifaMicro T={T} crece={kprog(T, K.H - 0.2, K.H + 1.6, kEase.sale)} />)}
      </Escena>
      {/* 6b · la enzima P450nor de cerca: NO + NO → N₂O; no se conoce la que lo desarma */}
      <Escena T={T} a={H2} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#160f24' }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <P450nor T={T} x={500} y={860} s={1.1} at={H2 + 0.3} />
          {T > H2 + 2.0 && <g opacity={kprog(T, H2 + 2.0, H2 + 2.4)}>
            <Mol x={720} y={990} s={0.8} tipo="N2O" />
            <text x={800} y={1002} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>→</text>
            <Mol x={900} y={990} s={0.8} tipo="N2" />
            <path d="M 690 950 L 960 1030 M 960 950 L 690 1030" stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={kprog(T, H2 + 2.4, H2 + 2.7)} />
          </g>}
        </>)}
      </Escena>
      {/* 7 · el estudio de 2015: 207 hongos, 70 producen N₂O */}
      <Escena T={T} a={K.E} b={K.Pa}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>{Array.from({ length: 207 }, (_, i) => { const c = i % 23, r = Math.floor(i / 23), ap = kprog(T, K.E + 0.6 + i * 0.006, K.E + 0.9 + i * 0.006); if (ap <= 0) return null;
          const k = ON70.indexOf(i), on = k >= 0 ? kprog(T, K.E + 2.6 + k * 0.03, K.E + 2.8 + k * 0.03) : 0;
          return <Tubito key={i} x={100 + c * 40} y={760 + r * 46} on={on} s={ap} />; })}</>)}
      </Escena>
      {/* 8 · el pastizal: tierra en frascos; con antifúngico el gas baja 89 %, con antibacteriano 23 % */}
      <Escena T={T} a={K.Pa} b={K.M}>
        <FondoLunares color={KC.leaf} />
        {fsvg((() => { const u = kprog(T, K.Pa + 2.6, K.Pa + 4.0, kEase.sale), MAX = 250;
          const col = [[220, 100, 'sin inhibidor', '#9aa0a6'], [540, 11, 'antifúngico', NX.naranja], [860, 77, 'antibacteriano', '#8fb6ff']];
          return <>{col.map(([cx, v, t, c], i) => { const h = MAX * v / 100 * u; return <g key={i} opacity={kprog(T, K.Pa + 2.2 + i * 0.15, K.Pa + 2.5 + i * 0.15)}>
            <rect x={cx - 60} y={1000 - h} width={120} height={h} fill={c} stroke={KC.ink} strokeWidth={6} />
            <FrascoTierra x={cx} y={1150} texto={t} />
          </g>; })}</>; })())}
      </Escena>
      {/* 9 · matiz: un solo suelo; los métodos son aproximados */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>{[180, 410, 640, 870].map((cx, i) => <g key={i} opacity={kprog(T, K.M + 0.2 + i * 0.15, K.M + 0.5 + i * 0.15)}>
          <rect x={cx - 70} y={880} width={140} height={250} rx={20} fill={NX.tierra} stroke={KC.ink} strokeWidth={6} />
          {[930, 990, 1050].map((yy) => <line key={yy} x1={cx - 60} y1={yy} x2={cx + 60} y2={yy + 6} stroke={NX.tierra2} strokeWidth={5} />)}
          <text x={cx} y={860} textAnchor="middle" style={{ font:`400 ${i ? 90 : 56}px ${KF.titulo}` }} fill={i ? KC.yellow : KC.texto} stroke={KC.ink} strokeWidth={4}>{i ? '?' : '89 %'}</text>
        </g>)}</>)}
      </Escena>
      {/* 10 · cierre: la misma milpa, ahora por dentro: hifas en el suelo y el gas subiendo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<Milpa T={T} hifas={kprog(T, K.C + 0.4, K.C + 2.4)}>
          <Costal x={250} y={600} rot={-48} s={0.8} />
          <GasSube T={T} p={kprog(T, K.C + 1.6, K.C + 2.6)} y={1000} alto={520} n={9} seed={8} />
        </Milpa>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 2.6} until={K.Oz - 0.3} x={60} y={880} texto="óxido nitroso · N₂O" tam={34} color={KC.ink} />
      <NumeroGigante T={T} at={K.G + 4.6} until={K.Oz - 0.3} valor={273} dur={1.0} prefijo="×" etiqueta="veces más que el CO₂" x={690} y={470} tam={160} color={KC.yellow} />
      <Chip T={T} at={K.G + 6.2} until={K.Oz - 0.3} texto="kilo por kilo · a 100 años" x={690} y={660} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Oz + 0.3} until={K.Ca - 0.3} anio="2009" quien="Ravishankara y col." revista="Science, 2009" x={380} y={540} />
      <Chip T={T} at={K.Oz + 2.0} until={K.Ca - 0.3} texto="la emisión humana que más daña el ozono" x={540} y={1060} tam={32} borde="#5fd6ff" />
      <Etq T={T} at={K.Oz + 1.2} until={K.Ca - 0.3} x={60} y={770} texto="capa de ozono" tam={30} color="#5fd6ff" />
      <Chip T={T} at={K.Ca + 0.2} until={K.Ch - 0.3} texto="N₂O de origen humano" x={540} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 1.2} until={K.Ch - 0.3} x={90} y={650} texto="nitrógeno en cultivos: la mayor parte" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.2} until={K.Ch - 0.3} x={990} y={880} texto="otras fuentes" lado="izq" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.4} until={K.Ch - 0.3} x={90} y={570} texto="Tian y col. · Nature, 2020 · datos 1980–2016" tam={24} color={KC.ink} />
      <Medidor T={T} at={K.Ch + 0.8} until={K.P - 0.3} valor={(t) => 1 - kprog(t, K.Ch + 1.2, K.Ch + 3.6)} etiqueta="oxígeno en los poros" x={60} y={430} ancho={560} color={KC.cyan} />
      <Etq T={T} at={K.Ch + 1.0} until={K.P - 0.3} x={60} y={570} texto="poros llenos de agua" tam={28} color="#bfe3ff" />
      <Etq T={T} at={K.Ch + 3.2} until={K.P - 0.3} x={60} y={620} texto="nitrato (NO₃⁻) del abono" tam={28} color={KC.texto} />
      <Etq T={T} at={K.B + 0.4} until={K.H - 0.3} x={60} y={480} texto="bacterias desnitrificantes" tam={30} color={KC.mint} />
      <Etq T={T} at={K.B + 1.6} until={K.H - 0.3} x={60} y={540} texto="N₂O → N₂ (inofensivo)" tam={34} color={KC.texto} />
      <Etq T={T} at={K.H + 0.6} until={H2 - 0.2} x={60} y={600} texto="Fusarium oxysporum" it tam={40} color={KC.texto} />
      <Etq T={T} at={K.H + 1.1} until={H2 - 0.2} x={60} y={655} texto="hifa (un hongo del suelo)" tam={28} color={NX.hifa} />
      <Etq T={T} at={H2 + 0.3} until={K.E - 0.3} x={60} y={480} texto="enzima P450nor" tam={36} color="#c9b3ff" />
      <Etq T={T} at={H2 + 0.8} until={K.E - 0.3} x={60} y={540} texto="NO + NO → N₂O" tam={32} color={KC.texto} />
      <Chip T={T} at={H2 + 2.6} until={K.E - 0.3} texto="la enzima que lo desarma: no se conoce en hongos" x={540} y={1100} tam={26} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="2015" quien="INRA Dijon, Francia" revista="Scientific Reports, 2015" x={540} y={520} />
      <NumeroGigante T={T} at={K.E + 2.6} until={K.Pa - 0.3} valor={70} dur={1.4} sufijo=" de 207" etiqueta="hongos producían N₂O" x={540} y={560} tam={130} color={NX.naranja} />
      <TarjetaEstudio T={T} at={K.Pa + 0.2} until={K.Pa + 2.3} anio="2002" quien="tierra de un pastizal · Irlanda del Norte" revista="Soil Sci. Soc. Am. J., 2002" x={540} y={560} />
      <Etq T={T} at={K.Pa + 2.6} until={K.M - 0.3} x={380} y={480} texto="N₂O que sale de la tierra" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pa + 4.0} until={K.M - 0.3} texto="−89 %" x={540} y={920} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 4.4} until={K.M - 0.3} texto="−23 %" x={860} y={760} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.4} until={K.C - 0.3} texto="un solo suelo" x={300} y={500} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.M + 1.2} until={K.C - 0.3} texto="89 % + 23 % > 100 %: el método es aproximado" x={540} y={680} tam={28} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="no es solo comida" x={520} y={380} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={1080} texto="hifas en el suelo" tam={28} color={KC.texto} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Oz} texto="50 cm" largo={160} />
      <BarraEscala T={T} at={K.Oz} until={K.Ca} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ca} until={K.Ch} texto="barra esquemática" largo={0} />
      <BarraEscala T={T} at={K.Ch} until={K.B} texto="1 mm" largo={150} />
      <BarraEscala T={T} at={K.B} until={K.H} texto="1 µm" largo={190} />
      <BarraEscala T={T} at={K.H} until={H2} texto="10 µm" largo={240} />
      <BarraEscala T={T} at={H2} until={K.E} texto="esquemático (nm)" largo={0} />
      <BarraEscala T={T} at={K.Pa} until={K.M} texto="barras esquemáticas" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloIt T={T} idx={0} at={K.G + 0.1} until={K.Oz - 0.1} texto="Un gas que calienta *273 veces* más que el CO₂." />
      <SubtituloIt T={T} idx={1} at={K.Oz + 0.1} until={K.Ca - 0.1} texto="La emisión humana que *más daña el ozono.*" />
      <SubtituloIt T={T} idx={2} at={K.Ca + 0.1} until={K.Ch - 0.1} texto="Sale del *nitrógeno del campo.*" />
      <SubtituloIt T={T} idx={3} at={K.Ch + 0.1} until={K.P - 0.1} texto="Suelo encharcado: *sin oxígeno.*" />
      <SubtituloIt T={T} idx={4} at={K.P + 0.1} until={K.B - 0.1} texto="¿Y quién *suelta el gas?*" />
      <SubtituloIt T={T} idx={5} at={K.B + 0.1} until={K.H - 0.1} texto="Muchas bacterias *lo desarman.*" />
      <SubtituloIt T={T} idx={6} at={K.H + 0.1} until={K.E - 0.1} texto="_Fusarium oxysporum_ lo fabrica: *P450nor.*" />
      <SubtituloIt T={T} idx={7} at={K.E + 0.1} until={K.Pa - 0.1} texto="*70 de 207* hongos lo producían." />
      <SubtituloIt T={T} idx={8} at={K.Pa + 0.1} until={K.M - 0.1} texto="Frenar a los hongos: *−89 %* de gas." />
      <SubtituloIt T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="Ojo: fue *un solo suelo.*" />
      <SubtituloIt T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo *puede* volver parte en gas." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Oz + 1.0, K.Ca - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ch + 1.0, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.B + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [H2 + 0.6, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pa + 4.2, K.M - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [K.M + 0.3, K.C - 0.2, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="121" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OxidoNitrosoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OxidoNitrosoShot /></CompositionStage></div>;
}
window.OxidoNitrosoApp = OxidoNitrosoApp;
