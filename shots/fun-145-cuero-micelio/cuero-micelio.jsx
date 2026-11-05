// Shot Fungi Mati #145 · Esta bolsa no es de cuero: es de hongo — NARRADO (formato N1 «Por dentro», gancho 1 «Esto no es X: es Y»).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (bolsas genéricas, sin marcas reales).

const CM = { cuero:'#8a5a32', cuero2:'#a8723f', cuero3:'#5e3a1d', asa:'#c98b4a', micelio:'#fbf6ea', micelio2:'#e9dfc8', aserrin:'#c7954f', aserrin2:'#9c6c32',
  rastrojo:'#d9b44a', charola:'#9aa3ad', charola2:'#6d7680', lyocell:'#3fbf6a', pu:'#9fe3ff', fabrica:'#d7dbe2', fabrica2:'#a3abb8', composta:'#4a2f1a' };

// Bolsa de viaje genérica. Base al centro (x, y). asas = color de las asas; brilloAsas 0..1 las resalta; marcas = costuras.
function Bolsa({ T = 0, x, y, s = 1, rot = 0, color = CM.cuero, color2 = CM.cuero2, asas = CM.asa, brilloAsas = 0, grano = true, children }) {
  const glow = brilloAsas > 0 ? { filter:`drop-shadow(0 0 ${18 * brilloAsas}px ${KC.yellow})` } : null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={28} rx={250} ry={22} fill="rgba(0,0,0,.25)" />
    <g style={glow}>
      <path d="M -170 -318 C -170 -470 -50 -470 -50 -318" stroke={KC.ink} strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M -170 -318 C -170 -470 -50 -470 -50 -318" stroke={brilloAsas > 0 ? mixHex(asas, KC.yellow, brilloAsas * 0.6) : asas} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M 50 -318 C 50 -470 170 -470 170 -318" stroke={KC.ink} strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M 50 -318 C 50 -470 170 -470 170 -318" stroke={brilloAsas > 0 ? mixHex(asas, KC.yellow, brilloAsas * 0.6) : asas} strokeWidth={22} fill="none" strokeLinecap="round" />
    </g>
    <path d="M -262 0 L -232 -296 Q -224 -332 -188 -332 L 188 -332 Q 224 -332 232 -296 L 262 0 Q 264 22 240 22 L -240 22 Q -264 22 -262 0 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -236 -12 L -210 -280 Q -204 -306 -178 -306 L 178 -306 Q 204 -306 210 -280 L 236 -12" stroke={color2} strokeWidth={5} fill="none" strokeDasharray="14 10" />
    <path d="M -200 -300 L 200 -300" stroke={KC.ink} strokeWidth={6} />
    {[-150, -100, -50, 0, 50, 100, 150].map((dx) => <line key={dx} x1={dx} y1={-306} x2={dx} y2={-294} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-262} y={-150} width={524} height={40} fill={color2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={-160} width={60} height={60} rx={8} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-14} y={-144} width={28} height={28} rx={4} fill={color2} stroke={KC.ink} strokeWidth={4} />
    {grano && Array.from({ length: 34 }, (_, i) => { const g = krng(i + 11); const gx = (g() - 0.5) * 440, gy = -20 - g() * 280; return Math.abs(gy + 130) > 30 ? <circle key={i} cx={gx} cy={gy} r={3 + g() * 3} fill={CM.cuero3} opacity=".35" /> : null; })}
    <path d="M -200 -280 Q -150 -295 -90 -285" stroke="#fff" strokeWidth={10} fill="none" opacity={0.22 + 0.08 * Math.sin(T * 2)} strokeLinecap="round" />
    {children}
  </g>;
}

// Charola de cultivo vista de lado. col 0..1 = capa blanca de micelio que crece encima del aserrín; grosor en px.
function Charola({ T = 0, x, y, w = 760, h = 110, aserrin = 1, col = 0, grosor = 40, despega = 0, seed = 3 }) {
  const g = krng(seed), granos = Array.from({ length: 70 }, () => [g() * (w - 40) + 20, g() * (h - 30) + 18, 3 + g() * 5, g() < 0.25]);
  const capa = grosor * col;
  return <g transform={`translate(${x} ${y})`}>
    {aserrin > 0 && <g opacity={aserrin}>
      <rect x={12} y={h - (h - 16) * aserrin} width={w - 24} height={(h - 16) * aserrin} fill={CM.aserrin} />
      {granos.map(([gx, gy, r, paja], i) => gy > h - (h - 16) * aserrin ? (paja ? <rect key={i} x={gx} y={gy} width={r * 4} height={4} fill={CM.rastrojo} transform={`rotate(${i * 37} ${gx} ${gy})`} /> : <circle key={i} cx={gx} cy={gy} r={r * 0.6} fill={CM.aserrin2} />) : null)}
    </g>}
    {col > 0 && <g transform={`translate(0 ${-despega * 220}) rotate(${-despega * 8} ${w / 2} 16)`}>
      <path d={`M 14 ${18} ${Array.from({ length: 21 }, (_, i) => `L ${14 + i * (w - 28) / 20} ${18 - capa - Math.sin(i * 1.7 + seed) * 5 * col}`).join(' ')} L ${w - 14} 18 Z`} fill={CM.micelio} stroke={despega > 0 ? KC.ink : 'rgba(0,0,0,.2)'} strokeWidth={despega > 0 ? 5 : 2} />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${40 + i * 60} ${16 - capa * 0.3} q 14 ${-capa * 0.4} 30 0`} stroke={CM.micelio2} strokeWidth={3} fill="none" opacity={col} />)}
    </g>}
    <path d={`M 0 0 L 12 ${h} L ${w - 12} ${h} L ${w} 0`} fill="rgba(160,170,180,.25)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={-10} y1={0} x2={w + 10} y2={0} stroke={CM.charola2} strokeWidth={10} strokeLinecap="round" />
  </g>;
}

// Prensa: dos placas que se cierran. p 0..1.
function Prensa({ x, y, w = 760, p = 0 }) {
  const baja = kEase.sale(kclamp(p * 2, 0, 1)) - kEase.suave(kclamp(p * 2 - 1, 0, 1)) * 0.8;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={w / 2 - 20} y={-560} width={40} height={300 + baja * 220} fill={CM.charola2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-10} y={-270 + baja * 220} width={w + 20} height={60} rx={10} fill={CM.charola} stroke={KC.ink} strokeWidth={8} />
    <rect x={-10} y={0} width={w + 20} height={50} rx={10} fill={CM.charola} stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Tambor de curtido (barril de madera que gira) con una lámina adentro.
function Tambor({ T, x, y, r = 230, giro = 0, tinte = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={r - 10} width={60} height={110} fill={CM.charola2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-160} y={r + 90} width={320} height={30} rx={8} fill={CM.charola2} stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${giro})`}>
      <circle r={r} fill="#b07a3e" stroke={KC.ink} strokeWidth={10} />
      {[0, 45, 90, 135].map((a) => <line key={a} x1={-r} y1={0} x2={r} y2={0} transform={`rotate(${a})`} stroke="#7a4f22" strokeWidth={6} />)}
      <circle r={r * 0.62} fill="#3a2410" stroke={KC.ink} strokeWidth={8} />
      <path d={`M ${-r * 0.4} ${-r * 0.1} Q 0 ${r * 0.25} ${r * 0.4} ${-r * 0.05}`} stroke={mixHex(CM.micelio, CM.cuero, tinte)} strokeWidth={30} fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={Math.cos(k) * r * 0.82} cy={Math.sin(k) * r * 0.82} r={9} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />)}
    </g>
  </g>;
}

// Lámina plana (vista de frente un poco inclinada). tinte 0..1: blanca → café; grano 0..1.
function Lamina({ x, y, w = 600, h = 330, tinte = 1, grano = 1, rot = -4, seed = 21 }) {
  const g = krng(seed);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 Q ${w * 0.5} -18 ${w} 0 L ${w - 10} ${h} Q ${w * 0.5} ${h + 16} 10 ${h} Z`} fill={mixHex(CM.micelio, CM.cuero, tinte)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={30 + g() * (w - 60)} cy={20 + g() * (h - 40)} r={2 + g() * 4} fill={mixHex('#d8ccb2', CM.cuero3, tinte)} opacity={0.5 * grano} />)}
  </g>;
}

// Fábrica esquemática. luces 0..1 (1 = encendida).
function Fabrica({ x, y, s = 1, luces = 1 }) {
  const ventana = mixHex('#3a3f4a', '#ffe680', luces);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-200} width={420} height={200} fill={CM.fabrica} stroke={KC.ink} strokeWidth={8} />
    <path d="M -210 -200 L -140 -270 L -140 -200 L -70 -270 L -70 -200 L 0 -270 L 0 -200 L 70 -270 L 70 -200 L 140 -270 L 140 -200 L 210 -270 L 210 -200" fill={CM.fabrica2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={150} y={-380} width={44} height={140} fill={CM.fabrica2} stroke={KC.ink} strokeWidth={7} />
    {[-160, -80, 0, 80].map((wx) => <rect key={wx} x={wx} y={-160} width={56} height={56} rx={6} fill={ventana} stroke={KC.ink} strokeWidth={5} style={luces > 0.5 ? { filter:'drop-shadow(0 0 10px #ffe680)' } : null} />)}
    <rect x={110} y={-90} width={70} height={90} fill="#6d7680" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Plantita que brota (composta).
function Brote({ x, y, p = 1, T = 0 }) {
  if (p <= 0) return null;
  const h = 120 * kEase.sale(p);
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, 3, 0.4) * 4})`}>
    <path d={`M 0 0 Q 6 ${-h * 0.5} 0 ${-h}`} stroke="#2f9e44" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d={`M 0 ${-h} Q -60 ${-h - 30} -70 ${-h + 10} Q -30 ${-h + 20} 0 ${-h} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} transform={`scale(${p})`} style={{ transformOrigin:`0px ${-h}px` }} />
    <path d={`M 0 ${-h} Q 60 ${-h - 30} 70 ${-h + 10} Q 30 ${-h + 20} 0 ${-h} Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} transform={`scale(${p})`} style={{ transformOrigin:`0px ${-h}px` }} />
  </g>;
}

// Maraña de hifas al microscopio: hilos ondulados que crecen por la punta, se ramifican y se cruzan hasta tapar el área.
// g 0..1 = crecimiento. Área (x, y, w, h). Cada hifa: polilínea que serpentea; una rama sale a la mitad.
function kHifasMaraña(seed, n, w, h) {
  const key = 'mar' + seed + '_' + n + '_' + w + '_' + h; if (kHifasMaraña[key]) return kHifasMaraña[key];
  const g = krng(seed), hs = [];
  for (let i = 0; i < n; i++) {
    let x = g() * w, y = g() * h, a = g() * Math.PI * 2, giro = (g() - 0.5) * 0.5; const pts = [[x, y]];
    for (let k = 0; k < 16; k++) { a += giro + (g() - 0.5) * 0.6; x += Math.cos(a) * 42; y += Math.sin(a) * 42; pts.push([x, y]); }
    const m = 5 + Math.floor(g() * 6), rama = [pts[m]]; let bx = pts[m][0], by = pts[m][1], ba = a + (g() < 0.5 ? 0.8 : -0.8);
    for (let k = 0; k < 8; k++) { ba += (g() - 0.5) * 0.6; bx += Math.cos(ba) * 40; by += Math.sin(ba) * 40; rama.push([bx, by]); }
    hs.push({ pts, rama, m: m / 16, t0: g() * 0.45, col: g() < 0.5 ? '#fff4d6' : '#eafff7', w: 5 + g() * 3 });
  }
  return (kHifasMaraña[key] = hs);
}
function MarañaHifas({ T, g = 1, x = 0, y = 0, w = 1080, h = 560, n = 60, seed = 5, brillo = 0.5 }) {
  const hs = kHifasMaraña(seed, n, w, h);
  const d = (q) => 'M ' + q.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  return <g transform={`translate(${x} ${y})`} style={brillo ? { filter:`drop-shadow(0 0 ${6 * brillo}px #eafff7)` } : null}>
    {hs.map((hf, i) => { const p = kclamp((g - hf.t0) / 0.5, 0, 1); if (p <= 0) return null;
      const pr = kclamp((p - hf.m) / (1 - hf.m), 0, 1), k = Math.min(16, Math.floor(p * 16)), tip = hf.pts[k];
      return <g key={i}>
        <path d={d(hf.pts)} pathLength="1" strokeDasharray={`${p} 1`} stroke={hf.col} strokeWidth={hf.w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {pr > 0 && <path d={d(hf.rama)} pathLength="1" strokeDasharray={`${pr} 1`} stroke={hf.col} strokeWidth={hf.w * 0.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {p < 1 && <circle cx={tip[0]} cy={tip[1]} r={hf.w * 0.9} fill="#ffffff" />}
      </g>; })}
  </g>;
}

function CueroShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Micelio, Ch: CUES.Charolas, Hi: CUES.Hifas, Co: CUES.Cosecha, Cu: CUES.Curte, P: CUES.Pregunta, H: CUES.Hermes, My: CUES.Mylo, Tr: CUES.Trampa, Es: CUES.Escala, Cm: CUES.Composta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la bolsa cae y rebota (se mueve desde el cuadro 0)
  const cae = kprog(T, K.G, K.G + 0.7, kEase.rebote);
  const yBolsa = klerp(560, 1080, cae);
  const dias = Math.round(klerp(1, 14, kprog(T, K.Co + 0.2, K.Co + 1.8)));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: una bolsa «de cuero» que es de hongo */}
      <Escena T={T} a={K.G} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={0} y={1150} width={KW} height={800} fill="#c2185b" opacity=".35" />
          <Bolsa T={T} x={330} y={yBolsa} s={0.92} rot={Math.sin(T * 6) * 3 * (1 - kprog(T, K.G + 0.7, K.G + 1.4))} />
          <g opacity={kprog(T, K.G + 2.4, K.G + 2.7)}>
            <Seta x={850} y={1080} s={0.9} crece={kprog(T, K.G + 2.4, K.G + 3.0)} sombrero="#d9a35a" />
            <path d="M 770 850 L 930 1070 M 930 850 L 770 1070" stroke={KC.red} strokeWidth={16} strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - kprog(T, K.G + 3.0, K.G + 3.3))} />
          </g>
        </>)}
      </Escena>
      {/* 1 · el micelio: la red escondida bajo tierra */}
      <Escena T={T} a={K.Mi} b={K.Ch} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <defs><clipPath id="cmSuelo"><rect x={0} y={830} width={KW} height={700} /></clipPath></defs>
          <rect x={0} y={830} width={KW} height={1100} fill={FK.tierra} />
          <rect x={0} y={810} width={KW} height={26} fill={FK.pasto} stroke={KC.ink} strokeWidth={5} />
          {Array.from({ length: 50 }, (_, i) => { const g = krng(i + 70); return <circle key={i} cx={g() * KW} cy={850 + g() * 1000} r={3 + g() * 6} fill={FK.tierra2} />; })}
          <g clipPath="url(#cmSuelo)"><RedHifas T={T} x={420} y={825} g={kprog(T, K.Mi + 0.3, K.Mi + 3.4)} seed={8} n={320} escala={0.17} ancho={4} brillo={0.5} /></g>
          <Seta x={420} y={825} s={1.3} crece={kprog(T, K.Mi + 0.1, K.Mi + 0.9)} sombrero="#d9a35a" />
        </>)}
      </Escena>
      {/* 2 · charolas con aserrín y restos de cosecha */}
      <Escena T={T} a={K.Ch} b={K.Hi} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={120} y={590} width={20} height={540} fill={CM.charola2} stroke={KC.ink} strokeWidth={5} />
          <rect x={940} y={590} width={20} height={540} fill={CM.charola2} stroke={KC.ink} strokeWidth={5} />
          {[0, 1, 2].map((k) => <Charola key={k} T={T} x={160} y={640 + k * 170} w={760} aserrin={kprog(T, K.Ch + 0.3 + k * 0.4, K.Ch + 1.1 + k * 0.4)} col={kprog(T, K.Ch + 2.4 + k * 0.2, K.Ch + 4.2 + k * 0.2) * 0.35} seed={3 + k} />)}
          {/* aserrín que cae */}
          {Array.from({ length: 26 }, (_, i) => { const t0 = K.Ch + 0.2 + (i % 13) * 0.1, u = kprog(T, t0, t0 + 0.6); if (u <= 0 || u >= 1) return null; const k = Math.floor(i / 13);
            return <circle key={i} cx={260 + (i * 47) % 560} cy={560 + u * (150 + k * 170)} r={6} fill={i % 4 ? CM.aserrin2 : CM.rastrojo} />; })}
          {/* siembra: puntitos blancos de micelio */}
          {Array.from({ length: 18 }, (_, i) => { const t0 = K.Ch + 1.8 + i * 0.04, u = kprog(T, t0, t0 + 0.4); if (u <= 0) return null; const k = i % 3;
            return <circle key={i} cx={220 + (i * 61) % 640} cy={klerp(560, 652 + k * 170, u)} r={8} fill={CM.micelio} stroke={KC.ink} strokeWidth={2} />; })}
        </>)}
      </Escena>
      {/* 3 · al microscopio: las hifas se enredan (fondo oscuro) */}
      <Escena T={T} a={K.Hi} b={K.Co} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <defs><clipPath id="cmMicro"><rect x={0} y={640} width={KW} height={490} rx={40} /></clipPath></defs>
          <g clipPath="url(#cmMicro)">
            {Array.from({ length: 7 }, (_, i) => <rect key={i} x={60 + (i * 143) % 900} y={700 + (i * 157) % 380} width={180} height={60} rx={24} fill="#6a4a26" opacity=".75" transform={`rotate(${i * 29} ${150 + (i * 143) % 900} ${730 + (i * 157) % 380})`} />)}
            <MarañaHifas T={T} g={kprog(T, K.Hi + 0.1, K.Hi + 4.4)} x={-60} y={600} w={1200} h={580} n={70} seed={7} />
            <rect x={0} y={640} width={KW} height={490} fill={CM.micelio} opacity={0.3 * kprog(T, K.Hi + 3.4, K.Hi + 4.7)} />
          </g>
          <rect x={0} y={640} width={KW} height={490} rx={40} fill="none" stroke={KC.cyan} strokeWidth={4} opacity=".5" />
        </>)}
      </Escena>
      {/* 4 · cosecha: la capa engrosa, se despega y se prensa */}
      <Escena T={T} a={K.Co} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.Co + 2.8 && <g opacity={1 - kprog(T, K.Co + 2.45, K.Co + 2.8)}><Charola T={T} x={160} y={960} w={760} h={130} col={klerp(0.35, 1, kprog(T, K.Co + 0.2, K.Co + 1.8))} grosor={46} despega={kprog(T, K.Co + 1.9, K.Co + 2.6, kEase.sale)} seed={9} /></g>}
          {T >= K.Co + 2.45 && <g opacity={kprog(T, K.Co + 2.45, K.Co + 2.8)}>
            <Prensa x={160} y={1080} w={760} p={kprog(T, K.Co + 2.8, K.Co + 4.2)} />
            <rect x={170} y={1080 - 30 + kprog(T, K.Co + 3.1, K.Co + 3.4) * 12} width={740} height={30 - kprog(T, K.Co + 3.1, K.Co + 3.4) * 12} rx={6} fill={CM.micelio} stroke={KC.ink} strokeWidth={5} />
          </g>}
        </>)}
      </Escena>
      {/* 5 · curtido y teñido */}
      <Escena T={T} a={K.Cu} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Tambor T={T} x={300} y={800} r={220} giro={(T - K.Cu) * 160} tinte={kprog(T, K.Cu + 0.3, K.Cu + 2.0)} />
          <Lamina x={klerp(1150, 580, kprog(T, K.Cu + 1.6, K.Cu + 2.4, kEase.sale))} y={880} w={420} h={230} tinte={1} grano={1} rot={6} />
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={300} y={1080} tam={520} /></>)}
      </Escena>
      {/* 7 · Hermès × MycoWorks (2021): cuerpo de micelio, asas de becerro */}
      <Escena T={T} a={K.H} b={K.My} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Bolsa T={T} x={480} y={1110} s={0.85} color="#9b6b3c" color2="#b98852" asas={CM.cuero3} brilloAsas={kprog(T, K.H + 3.4, K.H + 3.9) * (0.7 + 0.3 * Math.sin(T * 6))} />
        </>)}
      </Escena>
      {/* 8 · Mylo: 85 % micelio + 15 % lyocell */}
      <Escena T={T} a={K.My} b={K.Tr} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 100 }, (_, i) => { const c = i % 20, f = Math.floor(i / 20); const on = kprog(T, K.My + 1.2 + i * 0.022, K.My + 1.4 + i * 0.022, kEase.rebote);
            return <rect key={i} x={90 + c * 46} y={830 + f * 46} width={40} height={40} rx={6} fill={on > 0 ? (i < 85 ? CM.micelio : CM.lyocell) : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={4} transform={`rotate(0)`} opacity={0.4 + 0.6 * on} />; })}
        </>)}
      </Escena>
      {/* 9 · la trampa: acabado de poliuretano encima */}
      <Escena T={T} a={K.Tr} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* corte de la lámina en capas */}
          <g transform="translate(110 800)">
            <rect x={0} y={60} width={860} height={150} rx={10} fill={CM.micelio} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 26 }, (_, i) => <path key={i} d={`M ${20 + i * 32} ${80 + (i % 4) * 30} q 30 ${-20 + (i % 3) * 14} 60 ${6}`} stroke={i % 5 === 0 ? CM.lyocell : '#d8ccb2'} strokeWidth={i % 5 === 0 ? 7 : 4} fill="none" />)}
            {(() => { const b = kprog(T, K.Tr + 1.0, K.Tr + 2.0, kEase.sale); return <g transform={`translate(0 ${-140 * (1 - b)})`} opacity={b}>
              <rect x={0} y={20} width={860} height={40} rx={10} fill={CM.pu} stroke={KC.ink} strokeWidth={6} opacity=".9" />
              <path d={`M 40 32 L ${klerp(40, 820, b)} 32`} stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity=".8" />
            </g>; })()}
          </g>
        </>)}
      </Escena>
      {/* 10 · escalar cuesta: pausa (2023) y cierre (2025) */}
      <Escena T={T} a={K.Es} b={K.Cm} zoom={0.04}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.18)" />
        {fsvg(<>
          <rect x={0} y={1140} width={KW} height={800} fill="#1a2a8a" opacity=".5" />
          <Fabrica x={270} y={1140} s={0.95} luces={1 - 0.6 * kprog(T, K.Es + 1.2, K.Es + 1.6)} />
          <Fabrica x={800} y={1140} s={0.95} luces={1 - kprog(T, K.Es + 3.6, K.Es + 4.4)} />
          {T > K.Es + 1.3 && <g transform={`translate(270 830) rotate(${-6 + Math.sin((T - K.Es) * 8) * 4 * (1 - kprog(T, K.Es + 1.3, K.Es + 2.2))})`} opacity={kprog(T, K.Es + 1.3, K.Es + 1.6)}>
            <rect x={-48} y={-50} width={36} height={100} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <rect x={12} y={-50} width={36} height={100} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
          </g>}
          {T > K.Es + 4.4 && <g transform="translate(800 830)" opacity={kprog(T, K.Es + 4.4, K.Es + 4.7)}>
            <circle r={60} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-36} y={-10} width={72} height={20} fill="#fff" />
          </g>}
        </>)}
      </Escena>
      {/* 11 · el aserrín que sobra → composta */}
      <Escena T={T} a={K.Cm} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const v = kprog(T, K.Cm + 0.3, K.Cm + 1.2, kEase.sale); return <g transform={`translate(${klerp(120, 330, v)} ${klerp(760, 700, v)}) rotate(${v * 35} 210 45)`}>
            <Charola T={T} x={0} y={0} w={420} h={90} aserrin={1 - v * 0.5} seed={31} /></g>; })()}
          {Array.from({ length: 22 }, (_, i) => { const t0 = K.Cm + 0.8 + i * 0.04, u = kprog(T, t0, t0 + 0.5); if (u <= 0 || u >= 1) return null;
            return <circle key={i} cx={560 + (i * 23) % 220} cy={820 + u * 220} r={7} fill={CM.aserrin2} />; })}
          {(() => { const m = kprog(T, K.Cm + 0.8, K.Cm + 1.8, kEase.sale); return m < 0.02 ? null : <path d={`M 400 1090 Q 660 ${1090 - 180 * m} 920 1090 Z`} fill={mixHex(CM.aserrin, CM.composta, kprog(T, K.Cm + 1.4, K.Cm + 2.6))} stroke={KC.ink} strokeWidth={7} />; })()}
          <Brote T={T} x={660} y={1090 - 85 * kprog(T, K.Cm + 0.8, K.Cm + 1.8)} p={kprog(T, K.Cm + 2.2, K.Cm + 3.0)} />
          <rect x={0} y={1090} width={KW} height={800} fill="#1f9e74" opacity=".5" />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma bolsa del inicio, vista por dentro */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={0} y={1150} width={KW} height={800} fill="#c2185b" opacity=".35" />
          <Bolsa T={T} x={330} y={1080} s={0.92} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.5} until={K.Ou - 0.2} x={330} y={440} r={150} fx={330} fy={880} tinte={KC.cyan} etiqueta="POR DENTRO · MICELIO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><MarañaHifas T={t} g={1} x={-40} y={-40} w={r * 2 + 80} h={r * 2 + 80} n={34} seed={11} brillo={0.4} /></svg>} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.4} until={K.Mi - 0.3} texto="cuero de vaca" x={290} y={430} tam={48} />
      <Chip T={T} at={K.G + 1.6} until={K.Mi - 0.3} texto="hongo: micelio" x={290} y={545} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.G + 2.8} until={K.Mi - 0.3} x={1030} y={790} texto="no del sombrerito" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Mi + 0.8} until={K.Ch - 0.3} x={60} y={450} texto="seta: lo que se ve" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Mi + 1.8} until={K.Ch - 0.3} x={60} y={1120} texto="micelio: red de hilos" tam={36} color={KC.texto} />
      <Chip T={T} at={K.Ch + 0.2} until={K.Hi - 0.3} texto="charolas de cultivo" x={330} y={450} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Ch + 0.9} until={K.Hi - 0.3} x={60} y={535} texto="aserrín + restos de cosecha" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ch + 2.2} until={K.Hi - 0.3} x={1030} y={1150} texto="+ micelio" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.1} until={K.Co - 0.3} texto="AL MICROSCOPIO · HIFAS" x={350} y={450} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hi + 1.0} until={K.Co - 0.3} x={60} y={560} texto="crecen por la punta" tam={32} color={KC.mint} />
      <Chip T={T} at={K.Hi + 3.0} until={K.Co - 0.3} texto="se enredan: capa como fieltro" x={540} y={1080} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Co + 0.1} until={K.Co + 2.5} texto={`día ${dias}`} x={330} y={600} tam={64} borde={KC.ink} mono />
      <Etq T={T} at={K.Co + 0.4} until={K.Co + 2.5} x={60} y={720} texto="unas dos semanas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Co + 2.0} until={K.Cu - 0.3} texto="se despega" x={280} y={450} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Co + 2.9} until={K.Cu - 0.3} texto="se prensa" x={280} y={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Co + 3.4} until={K.Cu - 0.3} texto="se trata para que aguante" x={330} y={630} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Cu + 0.4} until={K.P - 0.3} x={60} y={500} texto="tambor de curtido" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Cu + 2.0} until={K.P - 0.3} texto="curtido y teñido" x={790} y={820} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.H + 0.2} until={K.My - 0.3} anio="2021" quien="Hermès × MycoWorks" revista="bolsa Victoria · material Sylvania" x={350} y={470} />
      <Etq T={T} at={K.H + 1.8} until={K.My - 0.3} x={60} y={1150} texto="cuerpo: micelio curtido en Francia" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 3.4} until={K.My - 0.3} x={1040} y={680} texto="asas: piel de becerro" lado="izq" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.My + 0.3} until={K.Tr - 0.3} valor={85} dur={1.3} sufijo=" %" etiqueta="de Mylo es micelio" x={330} y={570} tam={170} color={KC.paper} />
      <Etq T={T} at={K.My + 3.2} until={K.Tr - 0.3} x={90} y={1100} texto="■ micelio · 85" tam={34} color={KC.ink} />
      <Etq T={T} at={K.My + 3.6} until={K.Tr - 0.3} x={560} y={1100} texto="■ lyocell · 15" tam={34} color="#127a3a" />
      <Etq T={T} at={K.My + 4.0} until={K.Tr - 0.3} x={560} y={1145} texto="(fibra de celulosa)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Tr + 0.2} until={K.Es - 0.3} texto="la trampa" x={260} y={450} tam={44} borde={KC.red} />
      <Etq T={T} at={K.Tr + 1.6} until={K.Es - 0.3} x={60} y={770} texto="acabado de poliuretano: un plástico" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Tr + 1.0} until={K.Es - 0.3} x={60} y={1050} texto="micelio + lyocell" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Tr + 3.0} until={K.Es - 0.3} texto="aún no es biodegradable" x={540} y={1120} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Es + 0.2} until={K.Cm - 0.3} texto="hacerlo en grande cuesta" x={360} y={450} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Es + 1.4} until={K.Cm - 0.3} texto="2023 · Mylo: pausa" x={270} y={680} tam={30} borde={KC.yellow} />
      <Etq T={T} at={K.Es + 1.8} until={K.Cm - 0.3} x={60} y={740} texto="sin dinero para crecer" tam={24} color={KC.texto} />
      <Chip T={T} at={K.Es + 3.8} until={K.Cm - 0.3} texto="2025 · MycoWorks cierra" x={790} y={680} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Es + 4.2} until={K.Cm - 0.3} x={1040} y={740} texto="su fábrica (Carolina del Sur)" lado="izq" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Cm + 1.0} until={K.C - 0.3} x={60} y={470} texto="lo que sobra → composta" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Cm + 1.4} until={K.C - 0.3} x={60} y={520} texto="(sustrato de Mylo)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="sobre todo hongo ✓" x={790} y={760} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="acabado plástico (en algunos)" x={790} y={850} tam={28} borde={KC.red} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="difícil de escalar" x={790} y={940} tam={28} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Mi} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Mi} until={K.Ch} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Ch} until={K.Hi} texto="20 cm" largo={200} />
      <BarraEscala T={T} at={K.Hi} until={K.Co} texto="20 µm" largo={160} />
      <BarraEscala T={T} at={K.Co} until={K.Cu} texto="20 cm" largo={200} />
      <BarraEscala T={T} at={K.Cu} until={K.P} texto="50 cm" largo={180} />
      <BarraEscala T={T} at={K.H} until={K.My} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.My} until={K.Tr} texto="1 cuadrito = 1 %" largo={0} />
      <BarraEscala T={T} at={K.Tr} until={K.Es} texto="corte esquemático (no a escala)" largo={0} />
      <BarraEscala T={T} at={K.Es} until={K.Cm} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.Cm} until={K.C} texto="20 cm" largo={180} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={110} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} tam={58} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="No es cuero: *es de hongo.*" />
      <Subtitulo T={T} tam={58} idx={1} at={K.Mi + 0.1} until={K.Ch - 0.1} texto="Micelio: *red de hilos.*" />
      <Subtitulo T={T} tam={58} idx={2} at={K.Ch + 0.1} until={K.Hi - 0.1} texto="Charolas con *aserrín.*" />
      <Subtitulo T={T} tam={58} idx={3} at={K.Hi + 0.1} until={K.Co - 0.1} texto="Las hifas *se enredan.*" />
      <Subtitulo T={T} tam={58} idx={4} at={K.Co + 0.1} until={K.Cu - 0.1} texto="Se despega y *se prensa.*" />
      <Subtitulo T={T} tam={58} idx={5} at={K.Cu + 0.1} until={K.P - 0.1} texto="Algunas *se curten.*" />
      <Subtitulo T={T} tam={58} idx={6} at={K.P + 0.1} until={K.H - 0.1} texto="¿Quién *ya lo usó?*" />
      <Subtitulo T={T} tam={58} idx={7} at={K.H + 0.1} until={K.My - 0.1} texto="*Hermès,* 2021." />
      <Subtitulo T={T} tam={58} idx={8} at={K.My + 0.1} until={K.Tr - 0.1} texto="Mylo: *85 % micelio.*" />
      <Subtitulo T={T} tam={58} idx={9} at={K.Tr + 0.1} until={K.Es - 0.1} texto="Trampa: *poliuretano.*" />
      <Subtitulo T={T} tam={58} idx={10} at={K.Es + 0.1} until={K.Cm - 0.1} texto="Escalarlo *cuesta.*" />
      <Subtitulo T={T} tam={58} idx={11} at={K.Cm + 0.1} until={K.C - 0.1} texto="Lo que sobra: *composta.*" />
      <Subtitulo T={T} tam={58} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="*Sobre todo* hongo." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Mi + 0.5, K.Ch - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Hi + 1.0, K.Hi + 4.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Co + 0.4, K.Cu - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.P + 0.05, K.H + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.H + 0.6, K.My - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Tr + 0.4, K.Es - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Es + 0.4, K.Cm - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Cm + 0.2, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="145" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CueroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CueroShot /></CompositionStage></div>;
}
window.CueroApp = CueroApp;
