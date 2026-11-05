// Shot Fungi Mati #68 · La pastilla que nació de un hongo de cigarras: fingolimod — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (molécula simplificada, no su estructura exacta). No es consejo médico.

const FG = { piel:'#f2c29b', caps1:'#ff8a1f', caps2:'#f4efe4', hongo:'#fff4d6', ninfa:'#b07a3c', ninfa2:'#8a5a2b', tierra:'#5b3a22', mol:'#9fd0ff', anillo:'#F4C25A', linf:'#8fb6ff', mielina:'#ffe9a8', nervio:'#ff8fa6' };

function Capsula({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -110 -50 L 0 -50 L 0 50 L -110 50 A 50 50 0 0 1 -110 -50 Z" fill={FG.caps1} stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 -50 L 110 -50 A 50 50 0 0 1 110 50 L 0 50 Z" fill={FG.caps2} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-80} cy={-25} rx={30} ry={9} fill="rgba(255,255,255,.55)" />
  </g>;
}
function ManoAbierta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 60 Q -260 -20 -180 -40 L 180 -40 Q 250 -30 240 40 Q 230 110 150 130 L -150 130 Q -220 120 -230 60 Z" fill={FG.piel} stroke={KC.ink} strokeWidth={9} />
    {[-150, -60, 30, 120].map((fx, i) => <rect key={i} x={fx} y={-150 + (i === 0 || i === 3 ? 30 : 0)} width={70} height={150} rx={34} fill={FG.piel} stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -230 40 Q -320 -30 -300 -100 Q -270 -110 -240 -60" fill={FG.piel} stroke={KC.ink} strokeWidth={8} />
    <rect x={-200} y={130} width={400} height={220} fill="#2346ff" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Cigarra({ x, y, s = 1, T = 0, hongo = 0 }) {
  const al = Math.sin(T * 30) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -10 -20 Q -160 ${-120 + al} -260 -40 Q -150 0 -10 0 Z`} fill="rgba(200,240,255,.7)" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 10 -20 Q 160 ${-120 + al} 260 -40 Q 150 0 10 0 Z`} fill="rgba(200,240,255,.7)" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={40} rx={55} ry={110} fill="#4a6b3a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-70} rx={70} ry={45} fill="#3b5a2e" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-48} cy={-80} r={16} fill="#c0392b" stroke={KC.ink} strokeWidth={4} /><circle cx={48} cy={-80} r={16} fill="#c0392b" stroke={KC.ink} strokeWidth={4} />
    {hongo > 0 && Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-40 + i * 10} ${80 - (i % 3) * 30} q ${(i % 2 ? 30 : -30) * hongo} ${-40 * hongo} ${(i % 2 ? 10 : -10)} ${-90 * hongo}`} stroke={FG.hongo} strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Ninfa enterrada cubierta de micelio, con tallitos blancos (sinemas) que salen a la superficie.
function Ninfa({ x, y, s = 1, p = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={75} fill={FG.ninfa} stroke={KC.ink} strokeWidth={7} />
    {[-90, -30, 30, 90].map((sx, i) => <path key={i} d={`M ${sx} -60 Q ${sx + 10} 0 ${sx} 60`} stroke={FG.ninfa2} strokeWidth={6} fill="none" />)}
    <ellipse cx={-150} cy={-10} rx={55} ry={50} fill={FG.ninfa2} stroke={KC.ink} strokeWidth={7} />
    {[[-60, 50, 30], [20, 70, -20], [90, 50, 20], [-120, 50, -30]].map(([lx, ly, a], i) => <path key={i} d={`M ${lx} ${ly} l ${a} 40 l 20 10`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <ellipse cx={0} cy={0} rx={160 * p} ry={85 * p} fill="rgba(255,244,214,.55)" />
    {[[-160, -50, 420], [-60, -70, 380], [60, -70, 400]].map(([sx, sy, h], i) => { const hh = h * kprog(p, 0.3 + i * 0.15, 1); return hh > 0 ? <g key={i}>
      <path d={`M ${sx} ${sy} Q ${sx + 15 * Math.sin(T + i)} ${sy - hh * 0.5} ${sx + 6} ${sy - hh}`} stroke={FG.hongo} strokeWidth={16} fill="none" strokeLinecap="round" />
      <ellipse cx={sx + 6} cy={sy - hh - 18} rx={22} ry={34} fill={FG.hongo} stroke={KC.ink} strokeWidth={4} /></g> : null; })}
  </g>;
}
function Matraz({ x, y, s = 1, T, turbio = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -260 L 50 -260 L 50 -120 L 190 140 Q 200 180 160 190 L -160 190 Q -200 180 -190 140 L -50 -120 Z" fill="rgba(220,240,255,.35)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -120 20 L 120 20 L 190 140 Q 200 180 160 190 L -160 190 Q -200 180 -190 140 Z" fill={mixHex('#ffe9a8', '#d9b15a', turbio)} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.6 + i * 0.17) % 1); return <circle key={i} cx={-100 + i * 32} cy={170 - u * 150} r={6 + (i % 3) * 3} fill="rgba(255,255,255,.7)" />; })}
    {turbio > 0.2 && Array.from({ length: 10 }, (_, i) => <path key={'h' + i} d={`M ${-120 + i * 26} ${120 + (i % 3) * 18} q 12 -14 24 0`} stroke={FG.hongo} strokeWidth={4} fill="none" opacity={turbio} />)}
    <rect x={-60} y={-290} width={120} height={40} rx={10} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Molécula esquemática: cadena larga + cabeza con grupos. quita 0..1 = salen piezas; anillo 0..1 = entra el hexágono.
function Molecula({ x, y, s = 1, quita = 0, anillo = 0, brillo = 0, T = 0 }) {
  const pts = Array.from({ length: 12 }, (_, i) => [i * 52, (i % 2) * 30]);
  const d = 'M ' + pts.map((q) => q.join(' ')).join(' L ');
  const grupos = [[-40, -60, KC.red], [-70, 40, KC.blue], [20, -80, KC.red], [-10, 80, KC.mint], [60, 60, KC.blue], [100, -60, KC.red]];
  const hex = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i + Math.PI / 6; return `${i ? 'L' : 'M'} ${(Math.cos(a) * 50).toFixed(1)} ${(Math.sin(a) * 50).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={250} cy={0} rx={480} ry={170} fill={KC.gold2} opacity={0.18 * brillo} style={{ filter:'blur(10px)' }} />}
    <path d={d} transform="translate(80 0)" stroke={FG.mol} strokeWidth={10} fill="none" strokeLinejoin="round" />
    {pts.map((q, i) => <circle key={i} cx={q[0] + 80} cy={q[1]} r={10} fill={FG.mol} stroke={KC.ink} strokeWidth={3} />)}
    <circle cx={0} cy={0} r={46} fill="#d7ecff" stroke={KC.ink} strokeWidth={6} />
    {grupos.map(([gx, gy, c], i) => { const out = kclamp(quita * 2 - i * 0.25, 0, 1); if (i < 4 && out >= 1) return null;
      const dx = i < 4 ? gx * (1 + out * 4) : gx, dy = i < 4 ? gy * (1 + out * 4) - out * 200 : gy;
      return <g key={i} opacity={i < 4 ? 1 - out : 1}><line x1={0} y1={0} x2={dx * 0.7} y2={dy * 0.7} stroke={KC.ink} strokeWidth={5} /><circle cx={dx} cy={dy} r={20} fill={c} stroke={KC.ink} strokeWidth={4} /></g>; })}
    {anillo > 0 && <g transform={`translate(${180} ${-150 * (1 - anillo)}) rotate(${(1 - anillo) * 180}) scale(${0.6 + 0.4 * anillo})`}><path d={hex} fill={FG.anillo} stroke={KC.ink} strokeWidth={6} /><circle r={24} fill="none" stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}
// Nervio con mielina en segmentos; mordida 0..1.
function Nervio({ y, mordida = 0, T }) {
  return <g>
    <rect x={-20} y={y - 18} width={1120} height={36} fill={FG.nervio} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 6 }, (_, i) => { const x = 20 + i * 180, roto = i === 2 || i === 3 ? mordida : 0;
      return <g key={i}><rect x={x} y={y - 60} width={150} height={120} rx={50} fill={FG.mielina} stroke={KC.ink} strokeWidth={6} opacity={1 - roto * 0.75} />
        {roto > 0.2 && <path d={`M ${x + 40} ${y - 60} l 20 30 l 20 -30 l 20 30 l 20 -30`} stroke={KC.ink} strokeWidth={5} fill={KC.noche} />}</g>; })}
  </g>;
}
function Linfocito({ x, y, s = 1, T = 0, seed = 0 }) {
  return <g transform={`translate(${x + Math.sin(T * 2 + seed) * 6} ${y + Math.cos(T * 1.7 + seed) * 6}) scale(${s})`}>
    <circle r={34} fill={FG.linf} stroke={KC.ink} strokeWidth={5} /><circle r={22} fill="#4a6bd6" />
  </g>;
}
function Ganglio({ x, y, s = 1, cierra = 0, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 0 Q -260 -170 -60 -170 Q 60 -170 120 -110 Q 160 -60 200 -60 Q 260 -60 260 0 Q 260 60 200 60 Q 160 60 120 110 Q 60 170 -60 170 Q -260 170 -260 0 Z" fill="#c9f0d8" stroke={KC.ink} strokeWidth={9} />
    {[[-160, -60], [-90, 40], [-20, -80], [40, 30], [-170, 70], [-60, 110], [60, -40], [-120, -10]].map(([lx, ly], i) => <Linfocito key={i} x={lx} y={ly} s={0.9} T={T} seed={i} />)}
    <rect x={240} y={-40 + 0} width={30} height={80 * cierra} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Cerebro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 40 Q -230 -120 -80 -150 Q 0 -200 90 -150 Q 230 -120 210 20 Q 200 110 90 110 L -110 110 Q -190 110 -200 40 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
    <path d="M -120 -60 q 40 -40 80 0 q 40 40 80 0 M -140 20 q 50 -30 100 0 q 50 30 100 0" stroke="#e07a98" strokeWidth={8} fill="none" />
    <rect x={-20} y={110} width={40} height={180} rx={18} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function FingoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Cl: CUES.Caldo, Mi: CUES.Miriocina, To: CUES.Toxica, Cb: CUES.Cambio, Na: CUES.Nace, P: CUES.Pregunta, Me: CUES.Mielina, Ga: CUES.Ganglios, E: CUES.Estudio, Or: CUES.Oral, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const capRot = (T - K.G) * 40;

  const interiorNinfa = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill={FG.tierra} /><rect width={600} height={130} fill="#8fd3ff" /><rect y={120} width={600} height={20} fill="#3fbf4a" />
    <Ninfa x={300} y={420} s={0.9} p={1} T={t} />
  </svg>;

  const fGa = kprog(T, K.Ga + 0.6, K.Ga + 1.6), fViaje = (T - K.Ga) * 0.5;
  const bars = (i) => kprog(T, K.E + 1.0 + i * 0.6, K.E + 2.2 + i * 0.6, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cápsula en la mano; no es de una planta */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><ManoAbierta x={360} y={930} s={0.9} /><Capsula x={360} y={780 + Math.sin(T * 3) * 8} s={0.95} rot={capRot} />
          {(() => { const p = kprog(T, K.G + 2.0, K.G + 2.6, kEase.rebote); return p > 0 ? <Cigarra x={800} y={960} s={0.6 * p} T={T} hongo={kprog(T, K.G + 2.6, K.G + 3.6)} /> : null; })()}</>)}
      </Escena>
      {/* 1 · Isaria sinclairii en la ninfa enterrada */}
      <Escena T={T} a={K.H} b={K.Cl} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:FG.tierra }}></div>
        {fsvg(<>
          <rect x={0} y={0} width={1080} height={560} fill="#8fd3ff" /><rect x={0} y={540} width={1080} height={40} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 137) % 1080} cy={640 + (i * 71) % 560} r={6 + (i % 3) * 3} fill="#4a2e1a" />)}
          <Ninfa x={560} y={960} s={1.4} p={kprog(T, K.H + 0.3, K.H + 2.6)} T={T} />
        </>)}
      </Escena>
      {/* 2 · lo cultivaron en un caldo (Kioto) */}
      <Escena T={T} a={K.Cl} b={K.Mi} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Matraz x={540} y={920} s={1.3} T={T} turbio={kprog(T, K.Cl + 0.5, K.Cl + 2.8)} />)}
      </Escena>
      {/* 3 · miriocina: más que la ciclosporina */}
      <Escena T={T} a={K.Mi} b={K.To} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Molecula x={200} y={720} s={1.0} T={T} />
          {[['ciclosporina', 1, '#8fb6ff'], ['miriocina', 100, KC.gold2]].map(([n, v, c], i) => { const p = kprog(T, K.Mi + 1.4 + i * 0.6, K.Mi + 2.6 + i * 0.6, kEase.sale);
            const w = i === 0 ? 40 : 40 + 760 * p;
            return <g key={i}><text x={140} y={960 + i * 130} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{n}</text>
              <rect x={140} y={975 + i * 130} width={p > 0 ? w : 0} height={56} rx={12} fill={c} stroke={KC.ink} strokeWidth={5} /></g>; })}
        </>)}
      </Escena>
      {/* 4 · tóxica y casi no se disolvía */}
      <Escena T={T} a={K.To} b={K.Cb} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <path d="M 540 560 Q 820 900 820 1000 A 280 280 0 0 1 260 1000 Q 260 900 540 560 Z" fill="rgba(120,190,255,.35)" stroke="#9fd0ff" strokeWidth={8} />
          <g transform={`translate(540 ${960 + Math.sin(T * 3) * 6})`}>{Array.from({ length: 9 }, (_, i) => <circle key={i} cx={Math.cos(i) * 40} cy={Math.sin(i * 1.7) * 30} r={22} fill={FG.mol} stroke={KC.ink} strokeWidth={4} />)}</g>
          {(() => { const p = kprog(T, K.To + 0.8, K.To + 1.2, kEase.rebote); return p > 0 ? <g transform={`translate(230 760) scale(${p})`}>
            <circle r={70} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} /><circle cx={-24} cy={-8} r={16} fill={KC.ink} /><circle cx={24} cy={-8} r={16} fill={KC.ink} />
            <rect x={-30} y={30} width={60} height={34} rx={6} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} /></g> : null; })()}
        </>)}
      </Escena>
      {/* 5 · la simplificaron: quitaron partes, agregaron un anillo */}
      <Escena T={T} a={K.Cb} b={K.Na} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<Molecula x={200} y={880} s={1.0} quita={kprog(T, K.Cb + 0.3, K.Cb + 1.8)} anillo={kprog(T, K.Cb + 2.0, K.Cb + 3.0, kEase.rebote)} T={T} />)}
      </Escena>
      {/* 6 · así surgió el FTY720 */}
      <Escena T={T} a={K.Na} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<Molecula x={200} y={880} s={1.0} quita={1} anillo={1} brillo={kprog(T, K.Na + 0.2, K.Na + 1.0)} T={T} />)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Me} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Interrogacion T={T} x={250} y={1080} tam={460} />)}
      </Escena>
      {/* 8 · las defensas atacan la mielina */}
      <Escena T={T} a={K.Me} b={K.Ga} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {fsvg(<>
          <Nervio y={900} mordida={kprog(T, K.Me + 1.2, K.Me + 2.6)} T={T} />
          {[[420, 760, 0], [560, 1040, 1], [700, 760, 2]].map(([lx, ly, sd], i) => { const u = kprog(T, K.Me + 0.2 + i * 0.2, K.Me + 1.4 + i * 0.2, kEase.suave);
            return <Linfocito key={i} x={klerp(lx + (i - 1) * 300, lx, u)} y={klerp(ly + (ly > 900 ? 250 : -250), ly, u)} s={1.3} T={T} seed={sd} />; })}
        </>)}
      </Escena>
      {/* 9 · encerrados en los ganglios; llegan menos al cerebro y la médula */}
      <Escena T={T} a={K.Ga} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cerebro x={780} y={680} s={0.9} />
          <Ganglio x={340} y={1040} s={0.95} cierra={fGa} T={T} />
          {Array.from({ length: 5 }, (_, i) => { const u = ((fViaje + i * 0.2) % 1); const vivo = i < 5 - Math.round(4 * fGa) || u > 0.9;
            return vivo ? <Linfocito key={i} x={klerp(620, 760, u)} y={klerp(1040, 820, u)} s={0.8} T={T} seed={i} /> : null; })}
        </>)}
      </Escena>
      {/* 10 · FREEDOMS: 0.40 → 0.18 recaídas por año */}
      <Escena T={T} a={K.E} b={K.Or} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <line x1={120} y1={1130} x2={960} y2={1130} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          {[[200, 0.40, 'placebo', '#8fb6ff'], [620, 0.18, 'fingolimod 0.5 mg', KC.orange]].map(([x, v, et, c], i) => { const p = bars(i), h = v * 900 * p;
            return <g key={i}><rect x={x} y={1130 - h} width={260} height={h} rx={10} fill={c} stroke={KC.ink} strokeWidth={7} />
              {p > 0 && <text x={x + 130} y={1130 - h - 20} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>{(v * p).toFixed(2)}</text>}
              <text x={x + 130} y={1172} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{et}</text></g>; })}
        </>)}
      </Escena>
      {/* 11 · primer tratamiento oral (antes: inyectables) */}
      <Escena T={T} a={K.Or} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Capsula x={330} y={900} s={1.4} rot={-20} />
          <g transform="translate(790 900) rotate(30)" opacity=".55">
            <rect x={-30} y={-180} width={60} height={260} rx={10} fill="#e9f4ff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-8} y={80} width={16} height={90} fill="#aab" stroke={KC.ink} strokeWidth={3} /><rect x={-50} y={-200} width={100} height={24} rx={6} fill="#aab" stroke={KC.ink} strokeWidth={4} />
          </g>
          {(() => { const p = kprog(T, K.Or + 1.4, K.Or + 1.8, kEase.rebote); return p > 0 ? <g transform={`translate(790 900) scale(${p})`}><path d="M -110 -110 L 110 110 M 110 -110 L -110 110" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" opacity=".7" /></g> : null; })()}
          <Sello T={T} at={K.Or + 0.4} x={300} y={600} texto="FDA · 2010" color={KC.blue} r={100} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma mano; por dentro, la ninfa con el hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><ManoAbierta x={360} y={930} s={0.9} /><Capsula x={360} y={780 + Math.sin(T * 3) * 8} s={0.95} rot={(T - K.C) * 40} /></>)}
        <Lupa T={T} at={K.C + 0.4} until={K.Ou} x={760} y={620} r={180} fx={380} fy={780} interior={interiorNinfa} tinte={KC.gold2} etiqueta="POR DENTRO · su origen" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.8} until={K.H - 0.2} texto="¿de una planta?" x={290} y={470} tam={42} />
      <Chip T={T} at={K.G + 2.2} until={K.H - 0.2} texto="de un hongo de cigarras" x={300} y={560} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.H + 0.5} until={K.Cl - 0.3} x={60} y={470} texto="Isaria sinclairii" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.0} until={K.Cl - 0.3} x={60} y={525} texto="pariente de Cordyceps" tam={28} color={KC.ink} />
      <Etq T={T} at={K.H + 1.8} until={K.Cl - 0.3} x={60} y={1110} texto="ninfa de cigarra (bajo tierra)" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Cl + 0.3} until={K.Mi - 0.3} texto="Universidad de Kioto · Fujita" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Cl + 1.2} until={K.Mi - 0.3} x={60} y={600} texto="caldo de cultivo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Mi + 0.4} until={K.To - 0.3} x={60} y={600} texto="miriocina" tam={36} color={FG.mol} />
      <Chip T={T} at={K.Mi + 2.6} until={K.To - 0.3} texto="10 a 100 veces más potente" x={540} y={470} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Mi + 0.8} until={K.To - 0.3} x={60} y={400} texto="Fujita et al., J Antibiot, 1994" tam={24} color={KC.texto} />
      <Chip T={T} at={K.To + 0.3} until={K.Cb - 0.3} texto="tóxica" x={300} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.To + 0.8} until={K.Cb - 0.3} texto="casi no se disolvía" x={300} y={560} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Cb + 0.5} until={K.Na - 0.3} x={60} y={600} texto="le quitaron partes" tam={30} color={KC.red} />
      <Etq T={T} at={K.Cb + 2.2} until={K.Na - 0.3} x={60} y={660} texto="+ un anillo de benceno" tam={30} color={FG.anillo} />
      <Chip T={T} at={K.Na + 0.3} until={K.P - 0.3} texto="FTY720 = fingolimod" x={540} y={470} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.Na + 0.8} until={K.P - 0.3} x={60} y={1100} texto="sintetizado en 1992" tam={28} color={KC.texto} />
      <Chip T={T} at={K.P + 0.2} until={K.Me - 0.2} texto="esclerosis múltiple" x={420} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Me + 0.6} until={K.Ga - 0.3} x={60} y={600} texto="linfocitos (defensas)" tam={28} color={FG.linf} />
      <Etq T={T} at={K.Me + 1.4} until={K.Ga - 0.3} x={60} y={1130} texto="mielina: cubierta del nervio" tam={28} color={FG.mielina} />
      <Etq T={T} at={K.Ga + 0.3} until={K.E - 0.3} x={60} y={830} texto="ganglio linfático" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ga + 0.6} until={K.E - 0.3} x={1030} y={940} lado="izq" texto="cerebro y médula" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ga + 1.0} until={K.E - 0.3} texto="receptor S1P" x={300} y={560} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ga + 2.4} until={K.E - 0.3} texto="se cree: el mecanismo exacto no se conoce" x={540} y={420} tam={26} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.Or - 0.2} anio="FREEDOMS" quien="1,272 pacientes · publicado en 2010" revista="Kappos et al., NEJM, 2010" y={470} />
      <Etq T={T} at={K.E + 1.4} until={K.Or - 0.3} x={1020} y={760} lado="izq" texto="recaídas por año" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Or + 0.8} until={K.C - 0.3} texto="primer tratamiento oral" x={330} y={1150} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Or + 1.6} until={K.C - 0.3} x={1030} y={1150} lado="izq" texto="antes: inyectables" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="no es consejo médico" x={300} y={470} tam={30} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="2 cm" largo={100} />
      <BarraEscala T={T} at={K.H} until={K.Cl} texto="2 cm" largo={130} />
      <BarraEscala T={T} at={K.Cl} until={K.Mi} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Mi} until={K.To} texto="1 nm" largo={100} />
      <BarraEscala T={T} at={K.Cb} until={K.P} texto="1 nm" largo={100} />
      <BarraEscala T={T} at={K.Me} until={K.Ga} texto="5 µm" largo={90} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={100} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Nació de *un hongo de cigarras*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Cl - 0.1} texto="Isaria sinclairii: *parasita cigarras*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.Mi - 0.1} texto="Lo cultivaron *en un caldo*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.To - 0.1} texto="Frenaba *al sistema inmune*" />
      <Subtitulo T={T} idx={4} at={K.To + 0.1} until={K.Cb - 0.1} texto="Pero era *tóxica*" />
      <Subtitulo T={T} idx={5} at={K.Cb + 0.1} until={K.Na - 0.1} texto="La *simplificaron*" />
      <Subtitulo T={T} idx={6} at={K.Na + 0.1} until={K.P - 0.1} texto="Así surgió *el fingolimod*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Me - 0.1} texto="¿Y la *esclerosis múltiple?*" />
      <Subtitulo T={T} idx={8} at={K.Me + 0.1} until={K.Ga - 0.1} texto="Tus defensas atacan *la mielina*" />
      <Subtitulo T={T} idx={9} at={K.Ga + 0.1} until={K.E - 0.1} texto="Linfocitos *encerrados en los ganglios*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.Or - 0.1} texto="Recaídas: *0.40 → 0.18*" />
      <Subtitulo T={T} idx={11} at={K.Or + 0.1} until={K.C - 0.1} texto="El primer tratamiento *oral*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Nació de *un hongo de cigarras*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.4, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.6, K.Cl - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mi + 0.6, K.To - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.To + 0.2, K.Cb - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Na + 0.2, K.P - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.P + 0.05, K.Me - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Me + 0.8, K.Ga - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ga + 3.2, K.E - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.E + 3.2, K.Or - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Or + 0.6, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="68" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FingoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FingoShot /></CompositionStage></div>;
}
window.FingoApp = FingoApp;
