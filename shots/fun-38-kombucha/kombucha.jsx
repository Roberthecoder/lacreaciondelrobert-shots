// Shot Fungi Mati #38 · La «madre» de la kombucha no es un hongo: es una tela de bacterias — NARRADO (N1 Por dentro + tramo de salud honesto).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const KB = { te0:'#f1d58e', te1:'#b8681f', capa:'#ecdcb2', capa2:'#cdb684', vidrio:'rgba(255,255,255,.28)', fibra:'#fff1c9', lev:'#f6d77a', bac:'#8fe3c4', acido:'#ff6b5a', alcohol:'#9ad7ff' };

// Frasco de vidrio con té y la "madre" (capa) flotando. Base del frasco en (x, y).
// te 0..1 = qué tan oscuro; capa 0..1 = grosor; capas = rayitas de capas apiladas; alza 0..1 = las pinzas levantan la capa.
function Frasco({ T, x, y, s = 1, te = 1, capa = 1, capas = 2, alza = 0, burbujas = 1, nivel = 1 }) {
  const top = -470, liq = top + 90 + (1 - nivel) * 60, grosor = 18 + 46 * capa, sube = 330 * kEase.sale(kclamp(alza, 0, 1));
  const colorTe = mixHex(KB.te0, KB.te1, te);
  const borde = (yy, a = 0) => `M -196 ${yy} Q -100 ${yy - 10 + Math.sin(T * 2 + a) * 3} 0 ${yy - 4} Q 100 ${yy + 6 + Math.sin(T * 2.4 + a) * 3} 196 ${yy}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -210 ${top} L -210 -30 Q -210 0 -180 0 L 180 0 Q 210 0 210 -30 L 210 ${top} Z`} fill={KB.vidrio} stroke={KC.ink} strokeWidth={9} />
    <path d={`M -200 ${liq} L -200 -34 Q -200 -10 -176 -10 L 176 -10 Q 200 -10 200 -34 L 200 ${liq} Z`} fill={colorTe} opacity=".92" />
    {burbujas > 0 && Array.from({ length: 9 }, (_, i) => { const u = ((T * 0.35 + i * 0.13) % 1); return <circle key={i} cx={-160 + ((i * 47) % 320)} cy={-30 - u * (-(liq) - 60)} r={5 + (i % 3) * 3} fill="#fff" opacity={0.55 * (1 - u) * burbujas} />; })}
    {/* la capa (madre) */}
    <g transform={`translate(0 ${-sube})`}>
      <path d={`${borde(liq - grosor)} L 196 ${liq + 6} Q 0 ${liq + 16} -196 ${liq + 6} Z`} fill={KB.capa} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {Array.from({ length: capas }, (_, k) => <path key={k} d={borde(liq - grosor + (grosor / (capas + 1)) * (k + 1), k)} stroke={KB.capa2} strokeWidth={5} fill="none" />)}
      {alza > 0.2 && [-120, -20, 90, 150].map((dx, i) => { const u = ((T * 1.4 + i * 0.27) % 1); return <ellipse key={i} cx={dx} cy={liq + 20 + u * (sube - 30)} rx={7} ry={11} fill={colorTe} stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
    </g>
    {alza > 0 && <g transform={`translate(0 ${-sube})`}>
      <path d={`M 150 ${liq - grosor} L 330 ${liq - 420} M 175 ${liq + 4} L 360 ${liq - 400}`} stroke="#c8ced6" strokeWidth={16} strokeLinecap="round" />
      <path d={`M 150 ${liq - grosor} L 330 ${liq - 420} M 175 ${liq + 4} L 360 ${liq - 400}`} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" opacity=".6" />
    </g>}
    <rect x={-170} y={top + 40} width={26} height={-top - 120} rx={13} fill="#fff" opacity=".35" />
  </g>;
}

// Levadura (Brettanomyces, esquemática): célula ovalada (ojival) con una yema que crece.
function Levadura({ x, y, s = 1, rot = 0, yema = 0.5, T = 0, seed = 1 }) {
  const b = Math.sin(T * 2 + seed) * 4;
  return <g transform={`translate(${x} ${y + b}) rotate(${rot}) scale(${s})`}>
    {yema > 0 && <ellipse cx={46 + 10 * yema} cy={0} rx={14 + 12 * yema} ry={10 + 9 * yema} fill={KB.lev} stroke={KC.ink} strokeWidth={5} />}
    <path d="M -44 0 Q -40 -28 0 -30 Q 38 -28 48 0 Q 38 28 0 30 Q -40 28 -44 0 Z" fill={KB.lev} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-6} cy={-2} r={10} fill="#d49b2c" opacity=".7" />
    <ellipse cx={-18} cy={-14} rx={12} ry={5} fill="#fff" opacity=".45" />
  </g>;
}
// Sacarosa = glucosa (hexágono) + fructosa (pentágono). parte 0..1 = se separan.
function Sacarosa({ x, y, s = 1, parte = 0, rot = 0 }) {
  const hex = (r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }).join(' ') + ' Z';
  const pen = (r) => Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }).join(' ') + ' Z';
  const d = 40 * parte;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {parte < 0.4 && <line x1={-20} y1={0} x2={20} y2={0} stroke={KC.ink} strokeWidth={6} opacity={1 - parte * 2.5} />}
    <path d={hex(26)} transform={`translate(${-34 - d} ${-d * 0.4})`} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d={pen(22)} transform={`translate(${34 + d} ${d * 0.4})`} fill="#ffd0e2" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Etanol (alcohol) esquemático: tres bolitas en fila.
function Alcohol({ x, y, s = 1, color = KB.alcohol }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-18, 0, 18].map((dx, i) => <circle key={i} cx={dx} cy={i === 1 ? -6 : 0} r={11} fill={i === 2 ? '#ff8f8f' : color} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Ácido acético esquemático: rombo rojo con una "gota" (H+).
function Acido({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-16} y={-16} width={32} height={32} rx={6} transform="rotate(45)" fill={KB.acido} stroke={KC.ink} strokeWidth={4} />
    <circle cx={22} cy={-18} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Bacteria del ácido acético (bastón, sin flagelo). Komagataeibacter saca la cinta de celulosa por un costado, a lo largo del cuerpo.
function Komaga({ x, y, s = 1, rot = 0, cinta = 0, T = 0, seed = 1, color = KB.bac }) {
  const L = 300 * cinta, pts = [];
  for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([58 + u * L, 30 + Math.sin(u * 7 - T * 2 + seed) * 14 * u]); }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {cinta > 0 && <><path d={'M ' + pts.map((p) => p.join(' ')).join(' L ')} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={'M ' + pts.map((p) => p.join(' ')).join(' L ')} stroke={KB.fibra} strokeWidth={10} fill="none" strokeLinecap="round" /></>}
    <Bacteria x={0} y={0} s={1} color={color} flagelo={false} T={T} seed={seed} />
    {cinta > 0 && [-36, -12, 12, 36].map((dx, i) => <circle key={i} cx={dx} cy={22} r={5} fill={KB.fibra} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Cadena de celulosa: anillos de glucosa unidos. n anillos visibles.
function CadenaCelulosa({ x, y, n = 6, s = 1, T = 0 }) {
  const hex = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(Math.cos(a) * 40).toFixed(1)} ${(Math.sin(a) * 40).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: Math.ceil(n) }, (_, i) => { const o = kclamp(n - i, 0, 1); return <g key={i} opacity={o} transform={`translate(${i * 110} ${(i % 2 ? 18 : -18)}) rotate(${i % 2 ? 180 : 0})`}>
      {i > 0 && <line x1={-70} y1={i % 2 ? 0 : 0} x2={-40} y2={0} stroke={KC.ink} strokeWidth={6} />}
      <path d={hex} fill="#fff6dc" stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={-40} r={7} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    </g>; })}
  </g>;
}
// Malla de fibras de celulosa (la capa vista al microscopio). g 0..1 = cuántas fibras.
function Malla({ T, x, y, w = 900, h = 640, g = 1, seed = 7, n = 26 }) {
  const r = krng(seed);
  const fibras = Array.from({ length: n }, () => { const a = r() * Math.PI, cx = r() * w, cy = r() * h, L = 380 + r() * 420; return [cx - Math.cos(a) * L / 2, cy - Math.sin(a) * L / 2, cx + Math.cos(a) * L / 2, cy + Math.sin(a) * L / 2, r() * 60 - 30]; });
  return <g transform={`translate(${x} ${y})`}>
    <clipPath id="clipMalla"><rect x={0} y={0} width={w} height={h} rx={30} /></clipPath>
    <g clipPath="url(#clipMalla)">{fibras.map(([x1, y1, x2, y2, c], i) => { const p = kclamp(g * n - i, 0, 1); if (p <= 0) return null;
      const ex = klerp(x1, x2, p), ey = klerp(y1, y2, p);
      return <path key={i} d={`M ${x1} ${y1} Q ${(x1 + ex) / 2 + c} ${(y1 + ey) / 2 - c} ${ex} ${ey}`} stroke={KB.fibra} strokeWidth={7} fill="none" opacity=".85" strokeLinecap="round" />; })}</g>
  </g>;
}
// Íconos: ratón, tubo de ensayo, persona, hoja de papel, algodón, vaso.
function Raton({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 70 20 Q 120 30 130 -10" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={80} ry={50} fill="#c9c3cf" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-60} cy={-46} r={24} fill="#f2b7c4" stroke={KC.ink} strokeWidth={5} /><circle cx={-82} cy={-4} r={6} fill={KC.ink} /><circle cx={-104} cy={10} r={7} fill="#f28aa0" />
  </g>;
}
function Tubo({ x, y, s = 1, color = KC.mint }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -110 L -30 60 Q -30 100 0 100 Q 30 100 30 60 L 30 -110" fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={6} />
    <path d="M -24 0 L -24 60 Q -24 94 0 94 Q 24 94 24 60 L 24 0 Z" fill={color} />
    <rect x={-40} y={-124} width={80} height={18} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function PersonaK({ x, y, s = 1, color = '#8fb6ff', piel = '#f2c29b' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-62} r={26} fill={piel} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Papel({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -90 L 40 -90 L 70 -60 L 70 90 L -70 90 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-40, -10, 20, 50].map((yy, i) => <line key={i} x1={-46} y1={yy} x2={46} y2={yy} stroke="#9fb3c8" strokeWidth={5} />)}
  </g>;
}
function Algodon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -20 60 L -40 100 M 20 60 L 40 100 M 0 60 L 0 110" stroke="#7a4a22" strokeWidth={8} strokeLinecap="round" />
    {[[-40, 10, 44], [36, 8, 42], [0, -30, 48], [0, 30, 46]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#fffdf6" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function Vaso({ x, y, s = 1, color = KB.te1, etiqueta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 -140 L 60 -140 L 46 0 L -46 0 Z" fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={6} />
    <path d="M -54 -100 L 54 -100 L 46 -6 L -46 -6 Z" fill={color} opacity=".9" />
    {etiqueta && <text x={0} y={50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Botella de kombucha.
function Botella({ x, y, s = 1, texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -24 -330 L 24 -330 L 24 -250 Q 90 -220 90 -150 L 90 0 Q 90 20 70 20 L -70 20 Q -90 20 -90 0 L -90 -150 Q -90 -220 -24 -250 Z" fill="rgba(184,104,31,.85)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-30} y={-356} width={60} height={30} rx={8} fill={KC.ink} />
    <rect x={-90} y={-130} width={180} height={90} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {texto && <text x={0} y={-74} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>}
    <rect x={-70} y={-230} width={18} height={200} rx={9} fill="#fff" opacity=".35" />
  </g>;
}
// Sello rectangular (texto largo).
function SelloTexto({ T, at, until, x, y, texto, color = KC.red, rot = -8, tam = 54 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const fuera = until != null ? kprog(T, until, until + 0.35) : 0;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2, 1, k)})`, opacity:kprog(T, at, at + 0.15) * (1 - fuera),
    border:`9px solid ${color}`, borderRadius:18, padding:'10px 28px', font:`400 ${tam}px/1 ${KF.titulo}`, color, background:'rgba(255,255,255,.88)', whiteSpace:'nowrap', letterSpacing:'.02em' }}>{texto}</div>;
}
// Barras de glucosa en ayunas (antes → después), en mg/dL.
function BarrasGlucosa({ T, at, y = 520 }) {
  if (T < at) return null;
  const filas = [{ n:'kombucha', a:164, b:116, c:KC.orange }, { n:'placebo', a:162, b:141, c:'#9aa3ad' }];
  const esc = 3.2, baja = kprog(T, at + 0.9, at + 2.2, kEase.suave), o = kprog(T, at, at + 0.4);
  return <div style={{ position:'absolute', left:70, top:y, zIndex:41, opacity:o, width:600 }}>
    <div style={{ font:`900 32px ${KF.texto}`, color:KC.ink, marginBottom:12 }}>azúcar en ayunas (mg/dL)</div>
    {filas.map((f, i) => { const v = klerp(f.a, f.b, baja); return <div key={i} style={{ marginBottom:22 }}>
      <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink, marginBottom:6 }}>{f.n}: {f.a} → {Math.round(v)}</div>
      <div style={{ position:'relative', height:54, width:f.a * esc, background:'rgba(255,255,255,.55)', border:`5px solid ${KC.ink}`, borderRadius:12 }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:v * esc - 10, background:f.c, borderRadius:7 }}></div>
      </div></div>; })}
    <div style={{ font:`700 24px ${KF.mono}`, color:KC.ink, opacity:.8 }}>promedios · 4 semanas</div>
  </div>;
}

function KombuchaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Te: CUES.Te, Le: CUES.Levaduras, Ac: CUES.Acido, Hi: CUES.Hilos, Ce: CUES.Celulosa, Ca: CUES.Capa, P: CUES.Pregunta, An: CUES.Animales, Es: CUES.Estudio, Re: CUES.Resultado, Al: CUES.Alcohol, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const alza0 = kprog(T, K.G + 0.2, K.G + 1.3) * (1 - kprog(T, K.G + 4.6, K.Te + 0.3));
  const malla = K.Ca + 2.2; // en Capa: primero la malla al microscopio, luego el frasco
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y té + azúcar: el frasco de tu cocina */}
      <Escena T={T} a={K.G} b={K.Le} zoom={0.04}>
        <FondoLunares color={T < K.Te - 0.2 ? KC.yellow : KC.orange} />
        {fsvg(<>
          <rect x={0} y={1190} width={KW} height={800} fill="#c98b5a" stroke={KC.ink} strokeWidth={8} />
          <Frasco T={T} x={380} y={1200} s={1.05} te={T < K.Te ? 0.75 : 0.45 + 0.4 * kprog(T, K.Te + 0.3, K.Le)} alza={alza0} capas={2} />
          {T > K.Te - 0.2 && <g transform={`translate(${klerp(300, 330, kprog(T, K.Te, K.Te + 0.6))} ${klerp(200, 740, kprog(T, K.Te - 0.1, K.Te + 0.6, kEase.sale))})`}>
            <line x1={0} y1={-200} x2={0} y2={0} stroke="#fff" strokeWidth={4} /><rect x={-36} y={0} width={72} height={88} rx={8} fill="#d8a85c" stroke={KC.ink} strokeWidth={5} />
            <rect x={-24} y={-230} width={48} height={34} fill={KC.paper} stroke={KC.ink} strokeWidth={4} /></g>}
          {T > K.Te + 0.1 && [0, 1, 2].map((i) => { const p = kprog(T, K.Te + 0.3 + i * 0.25, K.Te + 0.8 + i * 0.25, kEase.sale);
            return <rect key={i} x={440 + i * 50} y={klerp(150, 800, p)} width={48} height={48} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 20 + p * 90} ${464 + i * 50} ${klerp(174, 824, p)})`} opacity={1 - kprog(T, K.Te + 0.8 + i * 0.25, K.Te + 1.1 + i * 0.25)} />; })}
        </>)}
      </Escena>
      {/* 3–4 · al microscopio: levaduras parten el azúcar; bacterias vuelven ácido el alcohol */}
      <Escena T={T} a={K.Le} b={K.Hi} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#3a2410', KC.noche, 0.7) }}></div>
        <Ambiente T={T} n={22} color="rgba(255,220,150,.25)" />
        {fsvg(<>
          {[[300, 620, 1.5, -10, 1], [620, 980, 1.2, 25, 2], [210, 1060, 1.1, 60, 3]].map(([x, y, s, r, sd], i) =>
            <Levadura key={i} x={x} y={y} s={s * kprog(T, K.Le + i * 0.25, K.Le + 0.5 + i * 0.25, kEase.rebote)} rot={r} yema={0.3 + 0.6 * kprog(T, K.Le + 1, K.Ac)} T={T} seed={sd} />)}
          {[[560, 640], [760, 820], [420, 860]].map(([x, y], i) => { const p = kprog(T, K.Le + 1.3 + i * 0.3, K.Le + 2.0 + i * 0.3); const fuera = kprog(T, K.Le + 2.4 + i * 0.3, K.Le + 3.0 + i * 0.3);
            return <g key={i} opacity={1 - fuera}><Sacarosa x={x} y={y} s={1.1} parte={p} rot={i * 30} /></g>; })}
          {/* alcohol y burbujas de CO2 */}
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.Le + 2.6 + i * 0.22; if (T < t0) return null; const u = ((T - t0) * 0.35) % 1;
            return <circle key={i} cx={260 + (i * 97) % 560} cy={1120 - u * 760} r={10 + (i % 3) * 5} fill="none" stroke="#e8fbff" strokeWidth={4} opacity={0.8 * (1 - u)} />; })}
          {Array.from({ length: 6 }, (_, i) => { const on = kprog(T, K.Le + 2.8 + i * 0.15, K.Le + 3.2 + i * 0.15, kEase.rebote); const come = kprog(T, K.Ac + 0.6 + i * 0.25, K.Ac + 1.3 + i * 0.25);
            const x0 = 420 + (i % 3) * 150, y0 = 760 + Math.floor(i / 3) * 140; const bx = 760 + (i % 2) * 60, by = 1040 - (i % 3) * 120;
            return on > 0 && come < 1 ? <Alcohol key={i} x={klerp(x0, bx, come)} y={klerp(y0, by, come) + Math.sin(T * 2 + i) * 6} s={on * (1 - come * 0.6)} /> : null; })}
          {T > K.Ac - 0.4 && [[790, 980, 20, 1], [880, 1090, -30, 2], [700, 1100, 70, 3]].map(([x, y, r, sd], i) =>
            <g key={i} opacity={kprog(T, K.Ac - 0.4 + i * 0.15, K.Ac + 0.1 + i * 0.15)}><Bacteria x={x} y={y + Math.sin(T * 2 + sd) * 6} rot={r} s={0.9} color={KB.bac} flagelo={false} T={T} seed={sd} /></g>)}
          {Array.from({ length: 6 }, (_, i) => { const p = kprog(T, K.Ac + 1.4 + i * 0.25, K.Ac + 2.0 + i * 0.25, kEase.sale); return p > 0 ? <Acido key={i} x={klerp(800, 400 + (i % 3) * 90, p)} y={klerp(1040, 640 + Math.floor(i / 3) * 110, p)} s={p} /> : null; })}
        </>)}
        {/* medidor de pH: baja (la acidez sube) */}
        {T > K.Ac + 1.6 && <div style={{ position:'absolute', left:70, top:560, zIndex:41, opacity:kprog(T, K.Ac + 1.6, K.Ac + 2.0) }}>
          <div style={{ width:70, height:420, borderRadius:35, border:`6px solid ${KC.texto}`, background:'linear-gradient(#2fe0a8, #ffe11a 50%, #ff3b2f)', position:'relative' }}>
            <div style={{ position:'absolute', left:-24, width:118, height:10, background:KC.texto, borderRadius:5, boxShadow:'0 3px 0 rgba(0,0,0,.7)', top: 60 + 300 * kprog(T, K.Ac + 1.9, K.Ac + 3.6, kEase.suave) }}></div>
          </div>
        </div>}
      </Escena>
      {/* 5 · Komagataeibacter hila celulosa */}
      <Escena T={T} a={K.Hi} b={K.Ce} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Komaga x={230} y={800} s={2.1} rot={4} cinta={kprog(T, K.Hi + 1.2, K.Ce + 0.4)} T={T} seed={1} />
          <Komaga x={330} y={1100} s={1.2} rot={8} cinta={kprog(T, K.Hi + 2.0, K.Ce + 0.4) * 0.8} T={T} seed={3} color="#a6ecd0" />
        </>)}
      </Escena>
      {/* 6 · celulosa: la misma molécula del papel y del algodón */}
      <Escena T={T} a={K.Ce} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <CadenaCelulosa x={150} y={900} n={kprog(T, K.Ce, K.Ce + 1.0) * 7} s={1.2} T={T} />
          <g opacity={kprog(T, K.Ce + 0.8, K.Ce + 1.2)}><Papel x={250} y={620} s={kprog(T, K.Ce + 0.8, K.Ce + 1.2, kEase.rebote)} rot={-8} /></g>
          <g opacity={kprog(T, K.Ce + 1.2, K.Ce + 1.6)}><Algodon x={560} y={620} s={kprog(T, K.Ce + 1.2, K.Ce + 1.6, kEase.rebote)} /></g>
        </>)}
      </Escena>
      {/* 7 · las fibras se enredan (malla) y la capa crece en el frasco */}
      <Escena T={T} a={K.Ca} b={malla} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Malla T={T} x={90} y={500} w={900} h={680} g={kprog(T, K.Ca - 0.3, K.Ca + 1.6)} />
          {[[260, 640, 1], [640, 900, 2], [820, 620, 3]].map(([x, y, sd], i) => <Levadura key={i} x={x} y={y} s={1.1} rot={i * 40} yema={0.5} T={T} seed={sd} />)}
          {[[420, 780, 30], [720, 1080, -20], [240, 1040, 70], [900, 860, 10]].map(([x, y, r], i) => <Bacteria key={i} x={x} y={y} rot={r} s={0.75} color={KB.bac} flagelo={false} T={T} seed={i} />)}
        </>)}
      </Escena>
      <Escena T={T} a={malla} b={K.An} zoom={0.04}>
        <FondoLunares color={T < K.P - 0.2 ? KC.mint : KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1190} width={KW} height={800} fill="#c98b5a" stroke={KC.ink} strokeWidth={8} />
          <Frasco T={T} x={380} y={1200} s={1.05} te={0.8} capa={0.3 + 0.7 * kprog(T, malla, K.P)} capas={2 + Math.round(3 * kprog(T, malla, K.P))} />
          {T > K.P - 0.2 && <Interrogacion T={T} x={300} y={760} tam={420} />}
        </>)}
      </Escena>
      {/* 9 · casi todo se probó en animales o en laboratorio */}
      <Escena T={T} a={K.An} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={kprog(T, K.An + 0.4, K.An + 0.8)}><Raton x={230} y={800} s={kprog(T, K.An + 0.4, K.An + 0.8, kEase.rebote)} /></g>
          <g opacity={kprog(T, K.An + 1.0, K.An + 1.4)}><Tubo x={560} y={780} s={kprog(T, K.An + 1.0, K.An + 1.4, kEase.rebote)} /></g>
          <g opacity={kprog(T, K.An + 1.8, K.An + 2.2)}><PersonaK x={860} y={1000} s={1.6 * kprog(T, K.An + 1.8, K.An + 2.2, kEase.rebote)} /></g>
          {[[230, 640], [560, 600]].map(([x, y], i) => kprog(T, K.An + 0.8 + i * 0.6, K.An + 1.1 + i * 0.6) > 0 && <path key={i} d={`M ${x - 40} ${y} L ${x - 10} ${y + 30} L ${x + 45} ${y - 35}`} stroke={KC.leaf} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.An + 0.8 + i * 0.6, K.An + 1.1 + i * 0.6)} />)}
          {kprog(T, K.An + 2.4, K.An + 2.7) > 0 && <text x={860} y={850} textAnchor="middle" style={{ font:`400 140px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.An + 2.4, K.An + 2.7)}>?</text>}
        </>)}
      </Escena>
      {/* 10–11 · el estudio de Georgetown (2023) y su resultado */}
      <Escena T={T} a={K.Es} b={K.Al} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.Re + 0.2 && <g opacity={1 - kprog(T, K.Re - 0.2, K.Re + 0.2)}>
            <g opacity={kprog(T, K.Es + 1.8, K.Es + 2.2)}><Vaso x={300} y={1120} s={1.1} color={KB.te1} etiqueta="kombucha" /></g>
            <g opacity={kprog(T, K.Es + 2.3, K.Es + 2.7)}><Vaso x={620} y={1120} s={1.1} color="#d9c8a0" etiqueta="placebo" /></g>
          </g>}
          {T > K.Re + 2.6 && Array.from({ length: 7 }, (_, i) => { const on = kprog(T, K.Re + 2.6 + i * 0.12, K.Re + 2.9 + i * 0.12, kEase.rebote); return on > 0 ? <PersonaK key={i} x={130 + i * 115} y={1150} s={0.9 * on} /> : null; })}
        </>)}
        <BarrasGlucosa T={T} at={K.Re + 0.2} y={430} />
      </Escena>
      {/* 12 · 1.5 % de alcohol */}
      <Escena T={T} a={K.Al} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g opacity={kprog(T, K.Al, K.Al + 0.4)}><Botella x={780} y={1170} s={kprog(T, K.Al, K.Al + 0.5, kEase.rebote)} texto="KOMBUCHA" /></g>)}
      </Escena>
      {/* 13 · cierre: el mismo frasco, ahora con la lupa que muestra la tela viva */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={1190} width={KW} height={800} fill="#c98b5a" stroke={KC.ink} strokeWidth={8} />
          <Frasco T={T} x={380} y={1200} s={1.05} te={0.8} capa={1} capas={5} alza={kprog(T, K.C + 0.1, K.C + 1.1)} />
          {(() => { const p = kprog(T, K.C + 1.0, K.C + 1.6, kEase.sale); if (p <= 0) return null; const cx = 380, cy = 500, r = 170 * p;
            return <g>
              <clipPath id="clipLupa"><circle cx={cx} cy={cy} r={r} /></clipPath>
              <circle cx={cx} cy={cy} r={r} fill={KC.noche} />
              <g clipPath="url(#clipLupa)">
                <Malla T={T} x={cx - 200} y={cy - 200} w={400} h={400} g={1} seed={11} n={16} />
                <Levadura x={cx - 60} y={cy - 40} s={0.8} rot={20} yema={0.6} T={T} seed={2} />
                <Levadura x={cx + 70} y={cy + 60} s={0.7} rot={-30} yema={0.4} T={T} seed={4} />
                <Bacteria x={cx + 50} y={cy - 80} rot={30} s={0.55} color={KB.bac} flagelo={false} T={T} seed={1} />
                <Bacteria x={cx - 70} y={cy + 90} rot={-20} s={0.55} color={KB.bac} flagelo={false} T={T} seed={2} />
              </g>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={KC.ink} strokeWidth={16} />
              <line x1={cx - r * 0.7} y1={cy + r * 0.7} x2={cx - r * 1.25} y2={cy + r * 1.25} stroke={KC.ink} strokeWidth={28} strokeLinecap="round" />
            </g>; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.4} until={K.Te - 0.2} x={110} y={360} texto="madre (SCOBY)" tam={32} color={KC.ink} />
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.8} until={K.Te - 0.3} texto="¿un hongo?" x={820} y={1090} tam={44} />
      <Chip T={T} at={K.G + 2.4} until={K.Te - 0.3} texto="tela de bacterias + levaduras" x={330} y={610} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Te + 0.4} until={K.Le - 0.2} x={520} y={420} texto="té + azúcar" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Le + 0.2} until={K.Hi - 0.3} texto="AL MICROSCOPIO · el té" x={340} y={420} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Le + 0.8} until={K.Ac - 0.2} x={120} y={530} texto="levadura (hongo)" tam={28} />
      <Etq T={T} at={K.Le + 1.2} until={K.Ac - 0.2} x={120} y={490} texto="Brettanomyces" it tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Le + 1.6} until={K.Ac - 0.2} x={110} y={705} texto="azúcar → glucosa + fructosa" tam={24} />
      <Etq T={T} at={K.Le + 3.0} until={K.Ac + 0.1} x={180} y={1170} texto="alcohol + CO₂ (burbujas)" tam={26} color={KB.alcohol} />
      <Etq T={T} at={K.Ac + 0.3} until={K.Hi - 0.2} x={1030} y={930} texto="bacterias del ácido acético" lado="izq" tam={26} color={KB.bac} />
      <Chip T={T} at={K.Ac + 1.8} until={K.Hi - 0.3} texto="pH ↓ (acidez ↑)" x={330} y={510} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Ac + 2.4} until={K.Hi - 0.2} x={150} y={880} texto="ácido acético = el del vinagre" tam={26} color={KB.acido} />
      <Etq T={T} at={K.Hi + 0.4} until={K.Ce - 0.2} x={60} y={600} texto="Komagataeibacter" it tam={40} color={KC.gold2} />
      <Etq T={T} at={K.Hi + 1.6} until={K.Ce - 0.2} x={500} y={1010} texto="fibra de celulosa" tam={30} color={KB.fibra} />
      <Chip T={T} at={K.Ce + 0.3} until={K.Ca - 0.3} texto="celulosa" x={340} y={430} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Ce + 1.0} until={K.Ca - 0.2} x={130} y={760} texto="papel" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ce + 1.4} until={K.Ca - 0.2} x={440} y={760} texto="algodón" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.2} until={malla - 0.3} texto="AL MICROSCOPIO · la madre" x={360} y={390} tam={30} borde={KC.gold} mono />
      <Etq T={T} at={K.Ca + 0.8} until={malla - 0.2} x={60} y={470} texto="fibras de celulosa con microbios atrapados" tam={24} color={KB.fibra} />
      <Chip T={T} at={malla + 0.3} until={K.P - 0.3} texto="cada tanda, más gruesa" x={360} y={430} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.An + 0.2} until={K.Es - 0.3} texto="¿cura? ¿desintoxica?" x={330} y={420} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.An + 0.6} until={K.Es - 0.2} x={130} y={920} texto="animales" tam={28} color={KC.ink} />
      <Etq T={T} at={K.An + 1.2} until={K.Es - 0.2} x={480} y={940} texto="laboratorio" tam={28} color={KC.ink} />
      <Chip T={T} at={K.An + 2.4} until={K.Es - 0.3} texto="en personas: muy poco" x={600} y={1130} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Re - 0.3} anio="2023" quien="Georgetown · Washington, D. C." revista="Frontiers in Nutrition · diabetes tipo 2" x={480} y={560} />
      <Chip T={T} at={K.Es + 3.0} until={K.Re - 0.3} texto="240 mL al día · 4 semanas · cruzado" x={470} y={850} tam={28} borde={KC.ink} mono />
      <Chip T={T} at={K.Re + 2.4} until={K.Al - 0.3} texto="diferencia no significativa" x={400} y={840} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Re + 3.2} until={K.Al - 0.2} x={60} y={1050} texto="solo 7 analizados" tam={30} color={KC.ink} />
      <SelloTexto T={T} at={K.Re + 4.4} until={K.Al - 0.3} x={420} y={960} texto="PISTA, NO PRUEBA" />
      <NumeroGigante T={T} at={K.Al + 0.3} until={K.C - 0.3} valor={1.5} dec={1} dur={0.6} sufijo=" %" etiqueta="de alcohol en esa kombucha" x={380} y={760} tam={200} color={KC.yellow} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="tela viva: bacterias + levaduras" x={600} y={250} tam={32} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Le} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Le} until={K.Hi} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.Hi} until={K.Ce} texto="1 µm" largo={110} />
      <BarraEscala T={T} at={K.Ce} until={K.Ca} texto="1 nm (esquema)" largo={110} />
      <BarraEscala T={T} at={K.Ca} until={malla} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={malla} until={K.An} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Es} until={K.Re} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.Al} until={K.C} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Te - 0.1} texto="No es un hongo: *es una tela de bacterias.*" />
      <Subtitulo T={T} idx={1} at={K.Te + 0.1} until={K.Le - 0.1} texto="Té + *azúcar.*" />
      <Subtitulo T={T} idx={2} at={K.Le + 0.1} until={K.Ac - 0.1} texto="Levaduras: azúcar → *alcohol y burbujas.*" />
      <Subtitulo T={T} idx={3} at={K.Ac + 0.1} until={K.Hi - 0.1} texto="Bacterias: alcohol → *ácido acético.*" />
      <Subtitulo T={T} idx={4} at={K.Hi + 0.1} until={K.Ce - 0.1} texto="Una bacteria *hila celulosa.*" />
      <Subtitulo T={T} idx={5} at={K.Ce + 0.1} until={K.Ca - 0.1} texto="La molécula del *papel y el algodón.*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.P - 0.1} texto="Se enredan: *la capa crece.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.An - 0.1} texto="¿De verdad *te cura?*" />
      <Subtitulo T={T} idx={8} at={K.An + 0.1} until={K.Es - 0.1} texto="Animales o laboratorio: *en personas, poco.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Re - 0.1} texto="Georgetown, 2023: *diabetes tipo 2.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Al - 0.1} texto="Con placebo también bajó: *es una pista.*" />
      <Subtitulo T={T} idx={11} at={K.Al + 0.1} until={K.C - 0.1} texto="Esa kombucha: *1.5 %* de alcohol." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una *tela viva* con levaduras adentro." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Le + 0.5, K.Ac + 2.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Hi + 0.3, K.Ca - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.An + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.An + 2.8, K.Es + 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Re + 0.3, K.Re + 4.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Al + 0.2, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="38" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function KombuchaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><KombuchaShot /></CompositionStage></div>;
}
window.KombuchaApp = KombuchaApp;
