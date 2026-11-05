// Shot Fungi Mati #133 · La pintura que nunca vas a ver — NARRADO (gancho 7 "algo que tus ojos nunca van a ver").
// Guion y fuentes: guion.md · verificacion.md. Las pinturas, la cueva, las hifas y las esporas son DIBUJO ESQUEMÁTICO (estilo propio).

const LX = { roca:'#e9d3a8', roca2:'#d8b97f', roca3:'#c49a5c', ocre:'#c4502a', ocre2:'#e08a3a', amarillo:'#e6b13a', mn:'#1d1712',
  alga:'#3fae4a', alga2:'#7fd36a', moho:'#fbfaf4', negro:'#15110d', cafe:'#5a4632', reja:'#2a2622' };

// Pared de roca (rectángulo con bordes irregulares y vetas). oscuro 0..1 = sin luz.
function Pared({ x = 70, y = 560, w = 940, h = 720, oscuro = 0, children, id = 'p' }) {
  const r = krng(11), manchas = Array.from({ length: 16 }, () => [r() * w, r() * h, 30 + r() * 90, r()]);
  return <g transform={`translate(${x} ${y})`}>
    <defs>
      <radialGradient id={`rg-${id}`} cx="45%" cy="40%" r="75%"><stop offset="0%" stopColor={LX.roca} /><stop offset="70%" stopColor={LX.roca2} /><stop offset="100%" stopColor={LX.roca3} /></radialGradient>
      <clipPath id={`cp-${id}`}><path d={`M 30 10 Q ${w * 0.3} -14 ${w * 0.6} 8 Q ${w - 20} -6 ${w} 40 Q ${w + 14} ${h * 0.5} ${w - 6} ${h - 30} Q ${w * 0.6} ${h + 12} ${w * 0.3} ${h - 4} Q 10 ${h + 6} 0 ${h - 40} Q -12 ${h * 0.5} 30 10 Z`} /></clipPath>
    </defs>
    <g clipPath={`url(#cp-${id})`}>
      <rect x={-20} y={-20} width={w + 40} height={h + 40} fill={`url(#rg-${id})`} />
      {manchas.map(([a, b, c, d], i) => <ellipse key={i} cx={a} cy={b} rx={c} ry={c * 0.55} fill={d > 0.5 ? '#f3e2bd' : '#caa46a'} opacity=".35" />)}
      {[0.22, 0.48, 0.77].map((k, i) => <path key={i} d={`M -10 ${h * k} Q ${w * 0.3} ${h * k - 30} ${w * 0.55} ${h * k + 10} T ${w + 10} ${h * k - 6}`} stroke="#b88d55" strokeWidth={5} fill="none" opacity=".55" />)}
      {children}
      {oscuro > 0 && <rect x={-20} y={-20} width={w + 40} height={h + 40} fill="#07080b" opacity={oscuro} />}
    </g>
    <path d={`M 30 10 Q ${w * 0.3} -14 ${w * 0.6} 8 Q ${w - 20} -6 ${w} 40 Q ${w + 14} ${h * 0.5} ${w - 6} ${h - 30} Q ${w * 0.6} ${h + 12} ${w * 0.3} ${h - 4} Q 10 ${h + 6} 0 ${h - 40} Q -12 ${h * 0.5} 30 10 Z`} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Animales pintados (esquemáticos, estilo propio): cuerpo ocre, contorno negro de manganeso. p 0..1 = aparece.
function Toro({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 1.4, 0, 1)}>
    <path d="M 40 120 Q 60 66 150 66 Q 230 58 285 78 Q 318 70 340 88 L 372 82 Q 394 94 384 114 Q 398 132 372 142 Q 348 152 330 142 Q 312 160 302 176 L 308 226 L 290 226 L 280 182 Q 220 178 160 178 L 150 226 L 132 226 L 128 176 Q 90 172 72 162 L 62 226 L 44 226 L 48 150 Q 28 140 40 120 Z"
      fill={LX.ocre} opacity=".88" stroke={LX.mn} strokeWidth={9} strokeLinejoin="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - kclamp(p * 1.2, 0, 1))} />
    <path d="M 344 88 Q 350 46 386 34 M 334 84 Q 326 50 352 38" stroke={LX.mn} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 40 120 Q 10 130 18 170" stroke={LX.mn} strokeWidth={7} fill="none" strokeLinecap="round" />
    {[90, 150, 210].map((a, i) => <circle key={i} cx={a} cy={110 + (i % 2) * 18} r={9} fill={LX.mn} opacity=".85" />)}
    <circle cx={360} cy={106} r={6} fill={LX.mn} />
  </g>;
}
function Caballo({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 1.4, 0, 1)}>
    <path d="M 30 110 Q 40 70 110 70 Q 170 66 210 74 Q 240 40 262 30 L 296 40 Q 304 58 286 66 Q 268 80 250 104 Q 244 130 226 140 L 232 196 L 216 196 L 206 146 Q 160 154 110 150 L 100 196 L 84 196 L 80 146 Q 46 140 30 110 Z"
      fill={LX.amarillo} stroke={LX.mn} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 214 72 Q 236 42 262 32" stroke={LX.mn} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M 30 110 Q 4 116 8 150" stroke={LX.mn} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 60 104 Q 130 120 200 104" stroke={LX.ocre} strokeWidth={10} fill="none" opacity=".6" />
  </g>;
}
function Ciervo({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 1.4, 0, 1)}>
    <path d="M 40 100 Q 50 72 110 72 Q 160 70 190 78 Q 206 56 220 50 L 248 58 Q 252 72 238 76 Q 224 86 214 100 Q 206 120 190 124 L 196 186 L 182 186 L 174 128 Q 140 132 100 130 L 92 186 L 78 186 L 74 128 Q 46 122 40 100 Z"
      fill={LX.ocre2} stroke={LX.mn} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 222 52 Q 214 20 196 6 M 214 30 Q 200 26 192 30 M 232 52 Q 246 18 270 4 M 244 30 Q 258 28 266 32" stroke={LX.mn} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}

// Manchas que crecen sobre la pared: tipo 'verde' (algas), 'negro' (hongo), 'blanco' (pelusa de moho). p 0..1.
function Manchas({ pts, p, tipo = 'negro', T = 0 }) {
  const col = tipo === 'verde' ? LX.alga : tipo === 'blanco' ? LX.moho : LX.negro;
  return <g>{pts.map(([a, b, r], i) => { const k = kEase.sale(kclamp(p * pts.length - i * 0.7, 0, 1)); if (k <= 0) return null;
    if (tipo === 'blanco') return <g key={i}>{Array.from({ length: 9 }, (_, j) => { const an = j / 9 * Math.PI * 2 + i; const rr = r * k;
      return <path key={j} d={`M ${a} ${b} q ${Math.cos(an) * rr * 0.6 + 6} ${Math.sin(an) * rr * 0.4 - 10} ${Math.cos(an) * rr} ${Math.sin(an) * rr * 0.7}`} stroke={col} strokeWidth={5} fill="none" strokeLinecap="round" opacity=".9" />; })}
      <ellipse cx={a} cy={b} rx={r * 0.7 * k} ry={r * 0.45 * k} fill={col} opacity=".75" /></g>;
    return <g key={i}><circle cx={a} cy={b} r={r * k} fill={col} opacity={tipo === 'verde' ? 0.72 : 0.9} />
      <circle cx={a + r * 0.5 * k} cy={b - r * 0.3 * k} r={r * 0.45 * k} fill={tipo === 'verde' ? LX.alga2 : '#2c241c'} opacity=".7" />
      {tipo === 'negro' && <circle cx={a - r * 0.7 * k} cy={b + r * 0.5 * k} r={r * 0.3 * k} fill={col} />}</g>; })}</g>;
}
const NEGRAS = [[690, 330, 26], [740, 390, 18], [650, 420, 14], [120, 520, 30], [170, 470, 16], [800, 560, 22], [560, 600, 15], [90, 210, 20], [760, 230, 14], [470, 140, 12]];
const VERDES = [[140, 160, 70], [780, 140, 80], [480, 560, 90], [100, 560, 60], [840, 480, 70], [600, 90, 50]];
const BLANCAS = [[120, 640, 70], [300, 680, 80], [520, 660, 90], [720, 690, 80], [880, 640, 60], [60, 500, 45], [900, 470, 50]];

// Reja que baja y se cierra. p 0..1.
function Reja({ x = 60, y = 520, w = 960, h = 780, p = 1 }) {
  const dy = (1 - kEase.rebote(kclamp(p, 0, 1))) * -h;
  return <g transform={`translate(${x} ${y + dy})`} opacity={kclamp(p * 4, 0, 1)}>
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={20 + i * (w - 40) / 8 - 9} y={0} width={18} height={h} rx={6} fill={LX.reja} stroke={KC.ink} strokeWidth={4} />)}
    {[0.12, 0.55, 0.92].map((k, i) => <rect key={i} x={0} y={h * k - 12} width={w} height={24} rx={8} fill={LX.reja} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Persona (silueta simple) con nubecita de aliento.
function Visitante({ T, x, y, s = 1, color = '#3a2e5c', aliento = 1, fase = 0, joven = false }) {
  const b = Math.sin(T * 6 + fase) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <circle cx={0} cy={-170} r={34} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d={`M -40 -126 Q 0 -140 40 -126 L 48 -20 L -48 -20 Z`} fill={color} stroke={KC.ink} strokeWidth={5} />
    <rect x={-36} y={-22} width={26} height={90} rx={10} fill={color} stroke={KC.ink} strokeWidth={5} />
    <rect x={10} y={-22} width={26} height={90} rx={10} fill={color} stroke={KC.ink} strokeWidth={5} />
    {joven && <circle cx={58} cy={-90} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />}
    {aliento > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.7 + fase * 0.3 + k / 3) % 1);
      return <circle key={k} cx={46 + u * 70} cy={-176 - u * 90} r={(10 + u * 22) * aliento} fill="#ffffff" opacity={(1 - u) * 0.75 * aliento} stroke={KC.ink} strokeWidth={2} />; })}
  </g>;
}
// Termómetro chico.
function Termo({ x, y, v = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-260} width={44} height={260} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-10} y={-240 + 200 * (1 - v)} width={20} height={200 * v + 30} rx={10} fill={KC.red} />
    <circle cx={0} cy={10} r={38} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Mapa esquemático de Francia (hexágono) con el punto de Lascaux (suroeste).
function MapaFrancia({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <path d="M 120 0 L 210 30 L 270 90 L 250 190 L 280 260 L 190 300 L 110 290 L 30 250 L 50 160 L 0 110 L 60 60 Z" fill="#fff4cc" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={115} cy={205} r={16 * kEase.rebote(kclamp(p * 1.5 - 0.4, 0, 1))} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Aire acondicionado con líneas de soplo.
function AireAcond({ T, x, y, on = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-70} width={240} height={140} rx={18} fill="#e8eef2" stroke={KC.ink} strokeWidth={7} />
    {[-40, -10, 20].map((dy, i) => <line key={i} x1={-90} y1={dy} x2={90} y2={dy} stroke="#9aa8b0" strokeWidth={6} />)}
    <circle cx={80} cy={-44} r={9} fill={on > 0 ? KC.mint : '#999'} />
    {on > 0 && [0, 1, 2, 3].map((k) => { const u = (T * 1.2 + k / 4) % 1;
      return <path key={k} d={`M ${-110 - u * 260} ${-30 + k * 22} q -30 -16 -60 0 t -60 0`} stroke="#ffffff" strokeWidth={6} fill="none" opacity={(1 - u) * on} strokeLinecap="round" />; })}
  </g>;
}
// Esporas genéricas (esquemáticas: no se afirma forma exacta).
function Esporas({ T, pts, p = 1, color = '#fff4d6' }) {
  return <g>{pts.map(([a, b, rot], i) => { const k = kEase.rebote(kclamp(p * 3 - i * 0.2, 0, 1)); if (k <= 0) return null;
    return <ellipse key={i} cx={a + Math.sin(T + i) * 6} cy={b + Math.cos(T * 0.8 + i) * 6} rx={18 * k} ry={10 * k} transform={`rotate(${rot} ${a} ${b})`} fill={color} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}
// Corte de una hifa: tubo con pared en capas y gránulos de melanina en la pared. p 0..1 = se llenan los gránulos.
function CorteHifa({ x, y, w = 900, h = 300, p = 1 }) {
  const r = krng(5), gran = Array.from({ length: 70 }, () => [r() * w, r() < 0.5 ? r() * 34 + 6 : h - r() * 34 - 6, 5 + r() * 7, r()]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={h / 2} fill="#6b5236" stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={44} width={w} height={h - 88} rx={(h - 88) / 2} fill="#2a2f3a" stroke="#8d7552" strokeWidth={5} />
    {[260, 600].map((cx, i) => <line key={i} x1={cx} y1={44} x2={cx} y2={h - 44} stroke="#8d7552" strokeWidth={10} />)}
    {gran.map(([a, b, rr, d], i) => d < p ? <circle key={i} cx={a} cy={b} r={rr} fill={LX.negro} /> : null)}
    <ellipse cx={430} cy={h / 2} rx={60} ry={34} fill="#3b4558" opacity=".9" />
  </g>;
}
// Edificio esquemático de la réplica con una pared pintada adentro.
function Replica({ x, y, w = 420, h = 360, color = KC.paper, titulo, sub, p = 1, toro = 1 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y + h}) scale(${k}) translate(0 ${-h})`}>
    <rect x={0} y={0} width={w} height={h} rx={14} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -20 0 L ${w / 2} -90 L ${w + 20} 0 Z`} fill={KC.ink} />
    <rect x={30} y={40} width={w - 60} height={h - 120} rx={10} fill={LX.roca} stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(${w / 2 - 110} ${70})`}><Toro x={0} y={0} s={0.55} p={toro} /></g>
    <rect x={w / 2 - 40} y={h - 70} width={80} height={70} fill={KC.ink} />
  </g>;
}

// Subtítulo con cursivas: como Subtitulo del kit, y además _palabra_ = cursiva (nombres científicos).
function SubtituloLX({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
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
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

function LascauxShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Cueva, Vi: CUES.Visitas, Ve: CUES.Verde, P: CUES.Pregunta, B: CUES.Blanco, Hi: CUES.Hifas, Ne: CUES.Negro, Es: CUES.Estudio, Me: CUES.Melanina, Pa: CUES.Paredes, Re: CUES.Replica, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // linterna del gancho: barre la pared desde el cuadro 0
  const lx = klerp(220, 760, kEase.suave(kprog(T, K.G, K.G + 2.2))), luz = 1 - kprog(T, K.G + 2.0, K.G + 2.8);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pared pintada, una linterna, y la manchita negra que crece */}
      <Escena T={T} a={K.G} b={K.Cu} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pared id="g" y={580} h={600}>
            <Toro x={210} y={150} s={1.4} p={kprog(T, K.G, K.G + 1.2)} />
            <Manchas pts={NEGRAS.slice(0, 5)} p={kprog(T, K.G + 3.6, K.G + 5.6)} />
          </Pared>
          <defs><mask id="linterna"><rect x={0} y={0} width={KW} height={KH} fill="#fff" /><circle cx={lx} cy={860} r={250} fill="#000" /></mask>
            <radialGradient id="halo"><stop offset="60%" stopColor="#fff6c8" stopOpacity=".0" /><stop offset="100%" stopColor="#fff6c8" stopOpacity=".35" /></radialGradient></defs>
          {luz > 0 && <g opacity={luz}><rect x={60} y={560} width={960} height={640} fill="#07080b" opacity=".72" mask="url(#linterna)" /><circle cx={lx} cy={860} r={250} fill="url(#halo)" /></g>}
        </>)}
      </Escena>
      {/* 2 · la cueva de Lascaux: mapa y animales */}
      <Escena T={T} a={K.Cu} b={K.Vi} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pared id="c" y={720} h={480}>
            <Toro x={40} y={40} s={0.95} p={kprog(T, K.Cu + 1.3, K.Cu + 2.1)} />
            <Caballo x={540} y={30} s={1.05} p={kprog(T, K.Cu + 2.1, K.Cu + 2.8)} />
            <Ciervo x={330} y={250} s={1.0} p={kprog(T, K.Cu + 2.8, K.Cu + 3.5)} />
          </Pared>
          <MapaFrancia x={640} y={330} s={1.05} p={kprog(T, K.Cu + 0.1, K.Cu + 0.8)} />
        </>)}
      </Escena>
      {/* 3 · descubrimiento (1940) y visitas: calor, humedad y aliento */}
      <Escena T={T} a={K.Vi} b={K.Ve} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Pared id="v" y={640} h={540}>
            <Toro x={300} y={70} s={0.9} />
          </Pared>
          {T < K.Vi + 2.8 ? [0, 1, 2, 3].map((i) => <Visitante key={i} T={T} x={160 + i * 110} y={1150} s={0.75} color="#5b3a7a" aliento={0} joven={i === 0} fase={i} />)
            : [0, 1, 2, 3, 4, 5].map((i) => { const e = kprog(T, K.Vi + 2.8 + i * 0.18, K.Vi + 3.3 + i * 0.18, kEase.sale);
              return <g key={i} opacity={e}><Visitante T={T} x={120 + i * 150 + (1 - e) * 200} y={1160} s={0.8} color={['#3a2e5c', '#1f5a7a', '#7a2e3a'][i % 3]} aliento={kprog(T, K.Vi + 3.6, K.Vi + 4.2)} fase={i * 1.7} /></g>; })}
          {T > K.Vi + 3.6 && <Termo x={960} y={1000} v={kprog(T, K.Vi + 3.8, K.Vi + 5.5)} />}
        </>)}
      </Escena>
      {/* 4 · la «enfermedad verde» y la reja de 1963 */}
      <Escena T={T} a={K.Ve} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Pared id="ve" y={600} h={580}>
            <Toro x={220} y={200} s={1.3} />
            <Manchas tipo="verde" pts={VERDES} p={kprog(T, K.Ve + 0.2, K.Ve + 2.0)} />
          </Pared>
          <Reja y={570} h={630} p={kprog(T, K.Ve + 2.2, K.Ve + 2.7)} />
        </>)}
      </Escena>
      {/* 5 · re-gancho: cerrada… ¿ya estaba a salvo? */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Pared id="pr" y={600} h={580} oscuro={0.75}><Toro x={220} y={160} s={1.3} /></Pared>
          <Reja y={570} h={630} p={1} />
          <Interrogacion T={T} x={330} y={1080} tam={420} />
        </>)}
      </Escena>
      {/* 6 · 2001: aire acondicionado nuevo y el manto blanco de Fusarium solani */}
      <Escena T={T} a={K.B} b={K.Hi} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Pared id="b" y={600} h={580}>
            <Toro x={200} y={110} s={1.2} />
            <Manchas tipo="blanco" pts={BLANCAS} p={kprog(T, K.B + 1.6, K.B + 4.6)} />
          </Pared>
          <AireAcond T={T} x={860} y={660} on={kprog(T, K.B + 0.3, K.B + 0.8)} />
        </>)}
      </Escena>
      {/* 7 · por dentro: hifas y esporas (esquemático); cal y biocidas */}
      <Escena T={T} a={K.Hi} b={K.Ne} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g opacity={1 - 0.65 * kprog(T, K.Hi + 2.6, K.Hi + 3.8)}>
            <RedHifas T={T} x={480} y={860} g={kclamp(0.35 + kprog(T, K.Hi - 0.4, K.Hi + 2.2), 0, 1)} seed={7} n={320} escala={0.6} color={LX.moho} ancho={5} />
            <Esporas T={T} p={kprog(T, K.Hi + 0.6, K.Hi + 1.8)} pts={[[300, 700, 20], [780, 760, -30], [420, 1110, 60], [700, 1080, 10], [560, 640, -50], [250, 980, 35]]} />
          </g>
          {Array.from({ length: 40 }, (_, i) => { const t0 = K.Hi + 2.2 + (i % 10) * 0.08, u = kprog(T, t0, t0 + 1.2); if (u <= 0 || u >= 1) return null;
            return i % 2 ? <circle key={i} cx={120 + (i * 97) % 860} cy={520 + u * 700} r={7} fill="#ffffff" opacity={0.9} />
              : <path key={i} d={`M ${140 + (i * 83) % 820} ${500 + u * 700} q 9 14 0 22 q -9 -8 0 -22 Z`} fill={KC.cyan} opacity={0.9} />; })}
        </>)}
      </Escena>
      {/* 8 · manchas negras junto a la pintura */}
      <Escena T={T} a={K.Ne} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Pared id="n" y={600} h={580}><Toro x={210} y={130} s={1.35} /><Manchas pts={NEGRAS} p={kprog(T, K.Ne + 0.1, K.Ne + 2.2)} /></Pared>)}
      </Escena>
      {/* 9–10 · el estudio de 2012 y la melanina (micro, fondo oscuro) */}
      <Escena T={T} a={K.Es} b={K.Pa} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {T < K.Me + 0.2 && <g opacity={1 - kprog(T, K.Me - 0.2, K.Me + 0.2)}>
            <RedHifas T={T} x={480} y={880} g={kprog(T, K.Es + 2.4, K.Es + 4.6)} seed={12} n={260} escala={0.5} color="#8a7458" ancho={7} />
            <Esporas T={T} color="#4a3b2b" p={kprog(T, K.Es + 3.4, K.Es + 4.6)} pts={[[330, 960, 10], [760, 1000, -20], [520, 1120, 40], [640, 820, 0]]} />
          </g>}
          {T > K.Me - 0.2 && <g opacity={kprog(T, K.Me - 0.2, K.Me + 0.3)}><CorteHifa x={90} y={760} w={900} h={300} p={kprog(T, K.Me + 0.6, K.Me + 2.4)} /></g>}
        </>)}
      </Escena>
      {/* 11 · sobre las mismas paredes con arte */}
      <Escena T={T} a={K.Pa} b={K.Re} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Pared id="pa" y={600} h={580}>
          <Toro x={110} y={90} s={1.0} /><Caballo x={500} y={300} s={1.0} />
          <Manchas pts={[[480, 140, 24], [430, 200, 14], [840, 300, 22], [300, 450, 26], [360, 520, 14], [880, 600, 18], [140, 600, 20], [650, 140, 16]]} p={kprog(T, K.Pa + 0.2, K.Pa + 2.2)} />
        </Pared>)}
      </Escena>
      {/* 12 · las copias: Lascaux II y Lascaux IV */}
      <Escena T={T} a={K.Re} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Replica x={70} y={800} w={420} h={360} p={kprog(T, K.Re + 1.0, K.Re + 1.5)} toro={kprog(T, K.Re + 1.3, K.Re + 2.0)} />
          <Replica x={560} y={760} w={460} h={400} color="#ffe9f0" p={kprog(T, K.Re + 2.8, K.Re + 3.3)} toro={kprog(T, K.Re + 3.1, K.Re + 3.8)} />
          {[0, 1, 2].map((i) => <g key={i} opacity={kprog(T, K.Re + 3.5 + i * 0.2, K.Re + 3.9 + i * 0.2)}><Visitante T={T} x={640 + i * 130} y={1190} s={0.42} aliento={0} fase={i} color={['#3a2e5c', '#1f5a7a', '#7a2e3a'][i]} /></g>)}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma pared del inicio, a oscuras, tras la reja; el aliento se queda afuera */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pared id="ci" y={580} h={600} oscuro={0.15 + 0.65 * kprog(T, K.C + 0.2, K.C + 2.0)}>
            <Toro x={210} y={150} s={1.4} />
            <rect x={520} y={-20} width={60} height={760} fill="#ffe9a8" opacity={0.25 * kprog(T, K.C + 1.0, K.C + 2.0)} />
          </Pared>
          <Reja y={560} h={640} p={kprog(T, K.C + 1.6, K.C + 2.1)} />
          {[0, 1, 2].map((k) => { const u = (T * 0.6 + k / 3) % 1, stop = kprog(T, K.C + 2.4, K.C + 3.2);
            return <circle key={k} cx={klerp(1060, 1060 - 120 * (1 - stop * 0.6), u)} cy={1100 - u * 40} r={14 + u * 30} fill="#fff" opacity={(1 - u) * 0.7 * kprog(T, K.C + 2.2, K.C + 2.6)} stroke={KC.ink} strokeWidth={2} />; })}
        </>)}
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 0.4} until={K.Cu - 0.3} valor={17000} desde={0} dur={1.0} prefijo="+" etiqueta="años de antigüedad" x={330} y={430} tam={120} color={KC.ink} />
      <Chip T={T} at={K.G + 3.8} until={K.Cu - 0.3} texto="hoy, en parte: un hongo" x={380} y={1140} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.G + 0.8} until={K.Cu - 0.3} x={90} y={1150} texto="dibujo esquemático" tam={22} color={KC.ink} />
      <Etq T={T} at={K.Cu + 0.5} until={K.Vi - 0.3} x={60} y={420} texto="Lascaux" tam={52} color={KC.ink} />
      <Etq T={T} at={K.Cu + 0.8} until={K.Vi - 0.3} x={60} y={480} texto="Dordoña, Francia" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cu + 1.6} until={K.Vi - 0.3} x={60} y={580} texto="toro · caballo · ciervo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cu + 3.6} until={K.Vi - 0.3} x={60} y={640} texto="rojo y amarillo · ocres" tam={28} color={LX.ocre} />
      <Etq T={T} at={K.Cu + 4.2} until={K.Vi - 0.3} x={60} y={690} texto="negro · manganeso" tam={28} color={LX.mn} />
      <Chip T={T} at={K.Vi + 0.2} until={K.Vi + 2.7} texto="1940 · la descubren 4 muchachos" x={330} y={560} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Vi + 3.9} until={K.Ve - 0.3} texto="calor" x={180} y={560} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Vi + 4.5} until={K.Ve - 0.3} texto="humedad" x={380} y={640} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Vi + 5.1} until={K.Ve - 0.3} texto="aliento" x={580} y={720} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ve + 0.8} until={K.P - 0.3} x={60} y={470} texto="«enfermedad verde» · algas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ve + 2.5} until={K.P - 0.3} texto="cerrada al público · 1963" x={360} y={540} tam={38} borde={KC.red} />
      <Etq T={T} at={K.B + 0.6} until={K.Hi - 0.3} x={60} y={440} texto="aire acondicionado nuevo · 2001" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 2.4} until={K.Hi - 0.3} x={60} y={510} texto="Fusarium solani" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.B + 2.8} until={K.Hi - 0.3} x={60} y={565} texto="moho blanco" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.1} until={K.Ne - 0.3} texto="POR DENTRO · HIFAS" x={420} y={430} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hi + 0.7} until={K.Ne - 0.3} x={60} y={520} texto="hifas y esporas · dibujo esquemático" tam={22} color={KC.texto} />
      <Chip T={T} at={K.Hi + 2.3} until={K.Ne - 0.3} texto="cal" x={300} y={1150} tam={40} borde={KC.white} />
      <Chip T={T} at={K.Hi + 2.7} until={K.Ne - 0.3} texto="biocidas" x={600} y={1150} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Ne + 0.6} until={K.Es - 0.3} texto="manchas negras" x={380} y={500} tam={42} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.4} anio="2012" quien="IRNAS-CSIC (Sevilla)" revista="Fungal Biology, 2012" x={400} y={900} />
      <Etq T={T} at={K.Es + 2.6} until={K.Me - 0.3} x={60} y={520} texto="Ochroconis lascauxensis" it tam={46} color={KC.texto} />
      <Chip T={T} at={K.Es + 3.2} until={K.Me - 0.3} texto="especie nueva · la más abundante (2007–2008)" x={540} y={620} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.Me + 0.4} until={K.Pa - 0.3} x={60} y={520} texto="corte de una hifa · esquemático" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Me + 0.9} until={K.Pa - 0.3} x={110} y={730} texto="pared" tam={32} color="#c9a87a" />
      <Etq T={T} at={K.Me + 1.4} until={K.Pa - 0.3} x={110} y={1110} texto="melanina (gránulos negros)" tam={32} color={KC.gold2} />
      <Chip T={T} at={K.Pa + 0.9} until={K.Re - 0.3} texto="sobre las paredes con arte" x={380} y={500} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Re + 1.2} until={K.C - 0.3} x={80} y={460} texto="Lascaux II · 1983" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Re + 1.6} until={K.C - 0.3} x={80} y={505} texto="copia de 2 salas" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Re + 3.0} until={K.C - 0.3} x={80} y={565} texto="Lascaux IV · 2016" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Re + 3.4} until={K.C - 0.3} x={80} y={610} texto="copia completa" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="la original: cerrada y vigilada" x={340} y={480} tam={30} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Vi} texto="1 m · esquemático" largo={160} y={1600} color={KC.ink} />
      <BarraEscala T={T} at={K.Vi} until={K.Hi} texto="1 m · esquemático" largo={160} y={1600} color={KC.ink} />
      <BarraEscala T={T} at={K.Hi} until={K.Ne} texto="10 µm" largo={180} y={1600} />
      <BarraEscala T={T} at={K.Ne} until={K.Es} texto="1 m · esquemático" largo={160} y={1600} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.Me} texto="10 µm" largo={160} y={1600} />
      <BarraEscala T={T} at={K.Me} until={K.Pa} texto="1 µm" largo={180} y={1600} />
      <BarraEscala T={T} at={K.Pa} until={K.Re} texto="1 m · esquemático" largo={160} y={1600} color={KC.ink} />
      <BarraEscala T={T} at={K.Re} until={K.C} texto="edificios esquemáticos" largo={0} y={1600} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m · esquemático" largo={160} y={1600} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloLX T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="Nunca la vas a ver *en persona.*" />
      <SubtituloLX T={T} idx={1} at={K.Cu + 0.1} until={K.Vi - 0.1} texto="Lascaux, Francia: *toros, caballos y ciervos.*" />
      <SubtituloLX T={T} idx={2} at={K.Vi + 0.1} until={K.Ve - 0.1} texto="Miles de visitas: *calor, humedad y aliento.*" />
      <SubtituloLX T={T} idx={3} at={K.Ve + 0.1} until={K.P - 0.1} texto="Algas verdes… *cerrada en 1963.*" />
      <SubtituloLX T={T} idx={4} at={K.P + 0.1} until={K.B - 0.1} texto="¿Ya estaba *a salvo?*" />
      <SubtituloLX T={T} idx={5} at={K.B + 0.1} until={K.Hi - 0.1} texto="2001: un manto blanco, *_Fusarium solani._*" />
      <SubtituloLX T={T} idx={6} at={K.Hi + 0.1} until={K.Ne - 0.1} texto="Lo frenaron con *cal y biocidas.*" />
      <SubtituloLX T={T} idx={7} at={K.Ne + 0.1} until={K.Es - 0.1} texto="Después: *manchas negras.*" />
      <SubtituloLX T={T} idx={8} at={K.Es + 0.1} until={K.Me - 0.1} texto="Un hongo nuevo: *_Ochroconis lascauxensis._*" />
      <SubtituloLX T={T} idx={9} at={K.Me + 0.1} until={K.Pa - 0.1} texto="Su negro es *melanina.*" />
      <SubtituloLX T={T} idx={10} at={K.Pa + 0.1} until={K.Re - 0.1} texto="Sobre las mismas *paredes con arte.*" />
      <SubtituloLX T={T} idx={11} at={K.Re + 0.1} until={K.C - 0.1} texto="Hoy se visitan *copias.*" />
      <SubtituloLX T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Vigilada… y *lejos de tu aliento.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Vi + 0.8, K.Vi + 4.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ve + 1.0, K.P - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.B + 1.2, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.Hi + 0.8, K.Ne - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ne + 0.2, K.Es + 2.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pa + 0.2, K.Re - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Re + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="133" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LascauxApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LascauxShot /></CompositionStage></div>;
}
window.LascauxApp = LascauxApp;
