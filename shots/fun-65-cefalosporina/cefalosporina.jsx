// Shot Fungi Mati #65 · El antibiótico que salió de junto a un desagüe: la cefalosporina — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (moléculas simplificadas). No es consejo médico.

const CF = { mar:'#2f8fd6', mar2:'#1f6fb0', arena:'#f1d27a', tubo:'#7d8590', agua:'#5b6b52', bact:'#ff8fa6', hifa:'#e9f4ff', gota:'#fff4b0', anillo:'#F4C25A', peni:'#8fb6ff', pared:'#7fd88a' };

function Frasco({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-190} width={120} height={50} rx={10} fill="#c0392b" stroke={KC.ink} strokeWidth={7} />
    <rect x={-40} y={-145} width={80} height={30} fill="#d5dbe4" stroke={KC.ink} strokeWidth={6} />
    <rect x={-110} y={-120} width={220} height={300} rx={36} fill="#f4efe4" stroke={KC.ink} strokeWidth={9} />
    <rect x={-90} y={-40} width={180} height={130} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={18} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill={KC.ink}>CEFALOSPORINA</text>
    <text x={0} y={60} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill="#5a524a">antibiótico</text>
  </g>;
}
// Costa con el mar, el tubo del drenaje y la mancha de agua turbia.
function Costa({ T, muestra = 0 }) {
  const ola = (k) => `M -20 ${700 + k * 60} ` + Array.from({ length: 12 }, (_, i) => `Q ${i * 100 + 25} ${690 + k * 60 + Math.sin(T * 2 + i + k) * 12} ${i * 100 + 50} ${700 + k * 60} T ${i * 100 + 100} ${700 + k * 60}`).join(' ');
  return <g>
    <rect x={0} y={620} width={1080} height={700} fill={CF.mar} />
    {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={ola(k)} stroke="#8fd3ff" strokeWidth={6} fill="none" opacity=".6" />)}
    <path d="M 0 560 L 1080 560 L 1080 640 Q 700 600 400 680 Q 200 730 0 700 Z" fill={CF.arena} stroke={KC.ink} strokeWidth={7} />
    <rect x={-20} y={600} width={420} height={70} rx={14} fill={CF.tubo} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={400} cy={635} rx={20} ry={35} fill="#3a3f46" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={520 + Math.sin(T) * 10} cy={760} rx={150} ry={70} fill={CF.agua} opacity=".55" />
    {muestra > 0 && <g>
      <line x1={760} y1={420} x2={760} y2={klerp(420, 760, Math.sin(Math.PI * muestra))} stroke={KC.ink} strokeWidth={4} />
      <g transform={`translate(760 ${klerp(420, 780, Math.sin(Math.PI * muestra))})`}><rect x={-30} y={0} width={60} height={90} rx={10} fill="rgba(220,240,255,.7)" stroke={KC.ink} strokeWidth={5} />
        {muestra > 0.5 && <rect x={-26} y={36} width={52} height={50} rx={8} fill={CF.agua} opacity=".8" />}</g>
    </g>}
  </g>;
}
function Bacilo({ x, y, s = 1, rot = 0, vida = 1, revienta = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={0.25 + 0.75 * vida}>
    <rect x={-50} y={-20} width={100} height={40} rx={20} fill={vida > 0.5 ? CF.bact : '#8a8f99'} stroke={KC.ink} strokeWidth={4} />
    {revienta > 0 && Array.from({ length: 6 }, (_, i) => { const a = i * 1.05; return <circle key={i} cx={Math.cos(a) * 40 * revienta} cy={Math.sin(a) * 30 * revienta} r={6} fill={CF.bact} opacity={1 - revienta} />; })}
  </g>;
}
// Acremonium: hifas finas y transparentes, fiálides en punzón, gotita de conidios en la punta.
function Acremonium({ x, y, s = 1, p = 1, T = 0 }) {
  const fial = [[120, -10, -70], [260, 6, -95], [380, -4, -60], [500, 10, -100]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 Q 160 -30 ${600 * p} 10`} stroke={CF.hifa} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M 200 -8 Q 260 60 360 90" stroke={CF.hifa} strokeWidth={6} fill="none" strokeDasharray={`${p * 300} 400`} />
    {fial.map(([fx, fy, a], i) => { const q = kprog(p, 0.3 + i * 0.15, 0.6 + i * 0.15); if (q <= 0) return null;
      const L = 130 * q, ex = fx + Math.sin(a * Math.PI / 180) * L * -0.2, ey = fy - L;
      return <g key={i}><path d={`M ${fx} ${fy} L ${ex} ${ey}`} stroke={CF.hifa} strokeWidth={6} strokeLinecap="round" />
        {q > 0.8 && <g><circle cx={ex} cy={ey - 24} r={30 + Math.sin(T * 2 + i) * 2} fill="rgba(255,244,176,.55)" stroke={CF.gota} strokeWidth={3} />
          {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={ex + Math.cos(k) * 14} cy={ey - 24 + Math.sin(k * 1.7) * 12} rx={7} ry={4} fill={CF.gota} stroke={KC.ink} strokeWidth={2} />)}</g>}</g>; })}
  </g>;
}
function Placa({ x, y, r = 300, T, halo = 0 }) {
  const g = krng(5);
  const cols = Array.from({ length: 60 }, () => [g() * 2 - 1, g() * 2 - 1]).filter(([a, b]) => a * a + b * b < 0.9);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#f1d27a" stroke={KC.ink} strokeWidth={9} />
    {cols.map(([a, b], i) => { const d = Math.hypot(a, b) * r; if (d < 70 + 130 * halo) return null; return <circle key={i} cx={a * r} cy={b * r} r={9} fill="#fffaf0" stroke="#c9a85a" strokeWidth={2} />; })}
    {halo > 0 && <circle r={70 + 130 * halo} fill="none" stroke={KC.ink} strokeWidth={3} strokeDasharray="10 8" opacity=".5" />}
    <circle r={60} fill="#fbf8ef" stroke="#d9cfb5" strokeWidth={4} />
    {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M 0 0 L ${Math.cos(i * 0.63) * 66} ${Math.sin(i * 0.63) * 66}`} stroke="#eee6d0" strokeWidth={4} />)}
  </g>;
}
function Europa({ x, y, T, p = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 80 40 Q 160 -10 260 30 Q 330 80 320 160 Q 400 200 430 300 Q 380 360 300 340 Q 260 420 330 520 Q 280 560 220 500 Q 180 420 120 400 Q 40 380 60 300 Q 0 250 30 160 Q 40 90 80 40 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M 60 20 Q 100 -60 150 -40 Q 130 20 100 40 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={190} cy={540} rx={30} ry={55} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
    <circle cx={190} cy={560} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <circle cx={110} cy={-10} r={12} fill={KC.blue} stroke={KC.ink} strokeWidth={4} />
    <path d="M 190 560 Q 360 300 110 -10" pathLength={1} stroke={KC.ink} strokeWidth={6} strokeDasharray="0.03 0.02" fill="none" opacity={p > 0 ? 1 : 0} />
    {p > 0 && (() => { const t = kclamp(p, 0, 1); const bx = (1 - t) * (1 - t) * 190 + 2 * (1 - t) * t * 360 + t * t * 110, by = (1 - t) * (1 - t) * 560 + 2 * (1 - t) * t * 300 + t * t * -10;
      return <g transform={`translate(${bx} ${by}) rotate(-30)`}><rect x={-14} y={-40} width={28} height={70} rx={10} fill="#e9f4ff" stroke={KC.ink} strokeWidth={4} /><rect x={-12} y={0} width={24} height={26} rx={6} fill="#fbf8ef" /></g>; })()}
  </g>;
}
// Molécula beta-lactámica esquemática: cuadrado (anillo beta-lactámico) + anillo de 6 (cefalosporina) o 5 (penicilina).
function BetaLactamico({ x, y, s = 1, tipo = 'cef', cortado = 0, brillo = 0 }) {
  const n = tipo === 'cef' ? 6 : 5, R = 62;
  const poly = Array.from({ length: n }, (_, i) => { const a = Math.PI * 2 * i / n + Math.PI / n; return `${i ? 'L' : 'M'} ${(130 + Math.cos(a) * R).toFixed(1)} ${(Math.sin(a) * R).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle cx={40} r={150} fill={KC.gold2} opacity={0.2 * brillo} style={{ filter:'blur(8px)' }} />}
    <path d={poly} fill={tipo === 'cef' ? '#ffd6a0' : CF.peni} stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(${-cortado * 30} ${cortado * 40}) rotate(${-cortado * 25})`}><rect x={-10} y={-50} width={90} height={100} fill={CF.anillo} stroke={KC.ink} strokeWidth={7} /><text x={35} y={14} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>β</text></g>
    <path d="M -10 0 L -80 -40 L -140 0" stroke={KC.ink} strokeWidth={7} fill="none" />
  </g>;
}
function Tijeras({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-15 - 20 * abre})`}><path d="M 0 0 L 140 -10 L 140 10 Z" fill="#cfd6e0" stroke={KC.ink} strokeWidth={5} /><circle cx={-40} cy={-20} r={26} fill="none" stroke={KC.red} strokeWidth={12} /></g>
    <g transform={`rotate(${15 + 20 * abre})`}><path d="M 0 0 L 140 -10 L 140 10 Z" fill="#cfd6e0" stroke={KC.ink} strokeWidth={5} /><circle cx={-40} cy={20} r={26} fill="none" stroke={KC.red} strokeWidth={12} /></g>
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Bacteria grande que arma su pared ladrillo por ladrillo; bloqueo 0..1 tapa a los "albañiles" (PBP); revienta 0..1.
function BacteriaPared({ x, y, T, bloqueo = 0, revienta = 0 }) {
  const N = 26, ladr = Array.from({ length: N }, (_, i) => { const a = i / N * Math.PI * 2; return [Math.cos(a) * 330, Math.sin(a) * 160, a]; });
  const hueco = (i) => revienta > 0 && (i === 6 || i === 7);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={300 + 30 * revienta} ry={135 + 20 * revienta} fill={CF.bact} stroke={KC.ink} strokeWidth={5} opacity={1 - 0.5 * revienta} />
    {ladr.map(([lx, ly, a], i) => hueco(i) ? null : <rect key={i} x={lx - 22} y={ly - 12} width={44} height={24} rx={5} transform={`rotate(${a * 57 + 90} ${lx} ${ly})`} fill={CF.pared} stroke={KC.ink} strokeWidth={3} />)}
    {[[-200, -110], [100, -140], [240, 90], [-120, 130]].map(([px, py], i) => <g key={i}>
      <circle cx={px} cy={py} r={22} fill="#ffb347" stroke={KC.ink} strokeWidth={4} />
      {bloqueo > i * 0.2 && <rect x={px - 14} y={py - 14} width={28} height={28} fill={CF.anillo} stroke={KC.ink} strokeWidth={3} />}</g>)}
    {revienta > 0 && Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-20 + Math.cos(i) * 40 + revienta * 260} cy={-150 - revienta * 140 + Math.sin(i * 2) * 40} r={10} fill={CF.bact} opacity={1 - revienta * 0.6} />)}
  </g>;
}
function Tanque({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-160} y={-260} width={320} height={480} rx={60} fill="#cfd6e0" stroke={KC.ink} strokeWidth={9} />
    <rect x={-110} y={-120} width={220} height={260} rx={20} fill="#e9d79a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 8 }, (_, i) => { const u = (T * 0.5 + i * 0.13) % 1; return <circle key={i} cx={-80 + i * 22} cy={120 - u * 220} r={6} fill="#fff" opacity=".7" />; })}
    {Array.from({ length: 6 }, (_, i) => <path key={'h' + i} d={`M ${-90 + i * 34} ${60 - (i % 2) * 40} q 14 -18 30 0`} stroke={CF.hifa} strokeWidth={4} fill="none" />)}
  </g>;
}

function CefaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Brotzu, Ti: CUES.Tifoidea, Sp: CUES.Sospecha, Mo: CUES.Moho, Ex: CUES.Extracto, P: CUES.Pregunta, Ox: CUES.Oxford, Cc: CUES.CefC, Tr: CUES.Truco, Pa: CUES.Pared, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G + 0.1, K.G + 0.6, kEase.rebote);

  const interiorTanque = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#2b3240" /><Tanque x={300} y={320} s={0.95} T={t} />
  </svg>;
  const interiorAgua = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#123a5c" />
    {Array.from({ length: 10 }, (_, i) => <Bacilo key={i} x={80 + (i % 4) * 140} y={120 + Math.floor(i / 4) * 160 + Math.sin(t * 2 + i) * 8} s={1.1} rot={i * 37} vida={1 - kprog(t, K.Ti + 0.8 + i * 0.25, K.Ti + 1.2 + i * 0.25)} />)}
  </svg>;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasco; no empezó en un laboratorio */}
      <Escena T={T} a={K.G} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Frasco x={330} y={klerp(500, 820, cae)} s={1.0} rot={(1 - cae) * -30} />
          {(() => { const p = kprog(T, K.G + 2.4, K.G + 3.2, kEase.sale); return p > 0 ? <g opacity={p}>
            <rect x={540} y={1000} width={540 * p} height={80} rx={16} fill={CF.tubo} stroke={KC.ink} strokeWidth={8} />
            <path d={`M 540 1040 Q 500 1100 520 1160`} stroke={CF.agua} strokeWidth={30} strokeLinecap="round" fill="none" opacity={p} />
            <rect x={0} y={1120} width={1080} height={80} fill={CF.mar} opacity=".8" /></g> : null; })()}
        </>)}
      </Escena>
      {/* 1 · Brotzu saca agua de mar junto a la descarga (Cagliari, 1945) */}
      <Escena T={T} a={K.B} b={K.Ti} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#9fd8ff' }}></div>
        {fsvg(<Costa T={T} muestra={kprog(T, K.B + 1.4, K.B + 4.4)} />)}
      </Escena>
      {/* 2 · la bacteria de la tifoidea desaparecía rápido */}
      <Escena T={T} a={K.Ti} b={K.Sp} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#9fd8ff' }}></div>
        {fsvg(<Costa T={T} />)}
        <Lupa T={T} at={K.Ti + 0.2} until={K.Sp - 0.2} x={540} y={900} r={210} fx={560} fy={770} interior={interiorAgua} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · agua de la costa" />
      </Escena>
      {/* 3 · sospechó de otro microbio */}
      <Escena T={T} a={K.Sp} b={K.Mo} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <circle cx={540} cy={880} r={240} fill="#123a5c" stroke={KC.ink} strokeWidth={9} />
          <path d="M 380 900 Q 460 840 540 880 T 700 860" stroke={CF.hifa} strokeWidth={8} fill="none" opacity={0.3 + 0.3 * Math.sin(T * 3)} />
          <text x={540} y={960} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">?</text>
          <line x1={720} y1={1060} x2={860} y2={1200} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
        </>)}
        <Sello T={T} at={K.Sp + 1.0} x={820} y={640} texto="HIPÓTESIS" color={KC.red} r={95} />
      </Escena>
      {/* 4 · el moho: Acremonium al microscopio */}
      <Escena T={T} a={K.Mo} b={K.Ex} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<Acremonium x={70} y={1000} s={1.55} p={kprog(T, K.Mo + 0.2, K.Mo + 2.6)} T={T} />)}
      </Escena>
      {/* 5 · su extracto frenaba bacterias: halo en la placa */}
      <Escena T={T} a={K.Ex} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Placa x={540} y={900} r={300} T={T} halo={kprog(T, K.Ex + 0.4, K.Ex + 2.0, kEase.sale)} />)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Ox} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Interrogacion T={T} x={250} y={1080} tam={460} />)}
      </Escena>
      {/* 7 · sin fondos: el hongo viaja a Oxford */}
      <Escena T={T} a={K.Ox} b={K.Cc} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Europa x={300} y={520} T={T} p={kprog(T, K.Ox + 1.0, K.Ox + 3.2, kEase.suave)} />)}
      </Escena>
      {/* 8 · 1953: Abraham y Newton, la cefalosporina C */}
      <Escena T={T} a={K.Cc} b={K.Tr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {fsvg(<BetaLactamico x={460} y={1000} s={1.6} tipo="cef" brillo={kprog(T, K.Cc + 2.6, K.Cc + 3.4)} />)}
      </Escena>
      {/* 9 · resistía la penicilinasa */}
      <Escena T={T} a={K.Tr} b={K.Pa} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <BetaLactamico x={250} y={780} s={1.0} tipo="peni" cortado={kprog(T, K.Tr + 1.8, K.Tr + 2.4, kEase.sale)} />
          <BetaLactamico x={250} y={1060} s={1.0} tipo="cef" />
          <Tijeras x={klerp(900, 680, kprog(T, K.Tr + 1.0, K.Tr + 1.8))} y={770} s={1.0} abre={Math.abs(Math.sin(T * 6)) * (T < K.Tr + 2.4 ? 1 : 0)} />
          {(() => { const u = kprog(T, K.Tr + 3.0, K.Tr + 4.4); return u > 0 ? <Tijeras x={u < 0.5 ? klerp(900, 600, u * 2) : klerp(600, 860, (u - 0.5) * 2)} y={1050} s={1.0} abre={0.4} /> : null; })()}
        </>)}
      </Escena>
      {/* 10 · impide armar la pared: la bacteria revienta */}
      <Escena T={T} a={K.Pa} b={K.H} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {fsvg(<BacteriaPared x={540} y={900} T={T} bloqueo={kprog(T, K.Pa + 0.6, K.Pa + 2.2)} revienta={kprog(T, K.Pa + 2.6, K.Pa + 3.6, kEase.sale)} />)}
      </Escena>
      {/* 11 · 2015: una de cada cinco dosis diarias en 76 países */}
      <Escena T={T} a={K.H} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>{Array.from({ length: 5 }, (_, i) => { const p = kprog(T, K.H + 0.4 + i * 0.25, K.H + 0.8 + i * 0.25, kEase.rebote), dor = i === 2 && T > K.H + 2.0;
          return p > 0 ? <g key={i} transform={`translate(${150 + i * 195} 900) rotate(-30) scale(${p})`}>
            <path d="M -70 -32 L 0 -32 L 0 32 L -70 32 A 32 32 0 0 1 -70 -32 Z" fill={dor ? KC.gold : '#c9ccd4'} stroke={KC.ink} strokeWidth={6} />
            <path d="M 0 -32 L 70 -32 A 32 32 0 0 1 70 32 L 0 32 Z" fill={dor ? KC.gold2 : '#e6e1d6'} stroke={KC.ink} strokeWidth={6} /></g> : null; })}</>)}
        <NumeroGigante T={T} at={K.H + 2.0} until={K.C - 0.2} valor={1} sufijo=" de cada 5" etiqueta="dosis diarias de antibiótico" x={540} y={680} tam={110} color={KC.gold2} />
      </Escena>
      {/* 12 · cierre: el mismo frasco; por dentro, el tanque con el moho */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Frasco x={330} y={820} s={1.0} />
          <rect x={540} y={1000} width={540} height={80} rx={16} fill={CF.tubo} stroke={KC.ink} strokeWidth={8} />
          <path d="M 540 1040 Q 500 1100 520 1160" stroke={CF.agua} strokeWidth={30} strokeLinecap="round" fill="none" />
        </>)}
        <Lupa T={T} at={K.C + 0.4} until={K.Ou} x={780} y={640} r={180} fx={360} fy={820} interior={interiorTanque} tinte={KC.gold2} etiqueta="POR DENTRO · hoy" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.B - 0.2} texto="¿un laboratorio?" x={300} y={470} tam={42} />
      <Chip T={T} at={K.G + 2.4} until={K.B - 0.2} texto="junto a un desagüe" x={300} y={560} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.B + 0.3} until={K.Ti - 0.3} texto="1945 · Cagliari, Cerdeña" x={340} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.8} until={K.Ti - 0.3} x={60} y={540} texto="Giuseppe Brotzu" tam={34} color={KC.ink} />
      <Etq T={T} at={K.B + 1.2} until={K.Ti - 0.3} x={60} y={1130} texto="descarga de drenaje" tam={30} color={KC.texto} />
      <Etq T={T} at={K.B + 2.6} until={K.Ti - 0.3} x={1020} y={1060} lado="izq" texto="agua de mar" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Ti + 0.4} until={K.Sp - 0.3} texto="tifoidea" x={260} y={470} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Ti + 0.8} until={K.Sp - 0.3} x={60} y={560} texto="Salmonella" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ti + 2.4} until={K.Sp - 0.3} texto="desaparecía rápido" x={740} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Sp + 0.4} until={K.Mo - 0.3} texto="¿otro microbio la combate?" x={360} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Mo + 0.8} until={K.Ex - 0.3} x={60} y={560} texto="Cephalosporium acremonium (nombre antiguo)" it tam={28} color={KC.texto} />
      <Etq T={T} at={K.Mo + 1.8} until={K.Ex - 0.3} x={60} y={620} texto="Acremonium chrysogenum (hoy)" it tam={32} color={KC.gold2} />
      <Etq T={T} at={K.Mo + 2.4} until={K.Ex - 0.3} x={1030} y={1120} lado="izq" texto="gotita de esporas" tam={26} color={CF.gota} />
      <Chip T={T} at={K.Ex + 1.2} until={K.P - 0.3} texto="frenaba bacterias" x={540} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Ex + 2.2} until={K.P - 0.3} texto="lo probó en enfermos (también de tifoidea)" x={540} y={1250} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.P + 0.2} until={K.Ox - 0.2} texto="de moho a medicina" x={420} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ox + 0.3} until={K.Cc - 0.3} texto="en Italia: sin fondos" x={300} y={470} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Ox + 2.4} until={K.Cc - 0.3} x={440} y={510} texto="Oxford · 1948" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ox + 1.0} until={K.Cc - 0.3} x={540} y={1080} texto="Cerdeña" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Cc + 0.15} until={K.Tr - 0.2} anio="1953" quien="Oxford · Edward Abraham y Guy Newton" revista="Newton y Abraham, Nature, 1955" y={480} />
      <Etq T={T} at={K.Cc + 2.6} until={K.Tr - 0.3} x={60} y={1170} texto="cefalosporina C: la molécula clave" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Tr + 0.4} until={K.Pa - 0.3} x={460} y={690} texto="penicilina" tam={28} color={CF.peni} />
      <Etq T={T} at={K.Tr + 2.8} until={K.Pa - 0.3} x={460} y={1150} texto="cefalosporina C: resiste" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Tr + 1.0} until={K.Pa - 0.3} texto="penicilinasa (enzima de bacterias)" x={540} y={470} tam={32} borde={KC.red} />
      <Etq T={T} at={K.Pa + 0.6} until={K.H - 0.3} x={60} y={600} texto="anillo beta-lactámico" tam={28} color={CF.anillo} />
      <Etq T={T} at={K.Pa + 1.0} until={K.H - 0.3} x={1030} y={660} lado="izq" texto="pared de la bacteria" tam={28} color={CF.pared} />
      <Chip T={T} at={K.Pa + 2.8} until={K.H - 0.3} texto="¡revienta!" x={300} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.H + 0.2} until={K.C - 0.3} texto="2015 · 76 países" x={540} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.H + 2.6} until={K.C - 0.3} x={60} y={1100} texto="Klein et al., PNAS, 2018 (datos de 2015)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="materia prima: cefalosporina C" x={330} y={470} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="antibióticos: solo con receta" x={330} y={560} tam={28} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.B} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.B} until={K.Sp} texto="10 m" largo={120} />
      <BarraEscala T={T} at={K.Mo} until={K.Ex} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.Ex} until={K.P} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Ox} until={K.Cc} texto="500 km" largo={90} />
      <BarraEscala T={T} at={K.Cc} until={K.Pa} texto="0.5 nm" largo={100} />
      <BarraEscala T={T} at={K.Pa} until={K.H} texto="1 µm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="Empezó *junto a un desagüe*" />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.Ti - 0.1} texto="1945: *agua de mar* en Cerdeña" />
      <Subtitulo T={T} idx={2} at={K.Ti + 0.1} until={K.Sp - 0.1} texto="La bacteria *desaparecía rápido*" />
      <Subtitulo T={T} idx={3} at={K.Sp + 0.1} until={K.Mo - 0.1} texto="¿Otro microbio *la combatía?*" />
      <Subtitulo T={T} idx={4} at={K.Mo + 0.1} until={K.Ex - 0.1} texto="Encontró *un moho*" />
      <Subtitulo T={T} idx={5} at={K.Ex + 0.1} until={K.P - 0.1} texto="Su extracto *frenaba bacterias*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ox - 0.1} texto="¿Cómo llegó a ser *medicina?*" />
      <Subtitulo T={T} idx={7} at={K.Ox + 0.1} until={K.Cc - 0.1} texto="Mandó el hongo *a Oxford*" />
      <Subtitulo T={T} idx={8} at={K.Cc + 0.1} until={K.Tr - 0.1} texto="1953: *la cefalosporina C*" />
      <Subtitulo T={T} idx={9} at={K.Tr + 0.1} until={K.Pa - 0.1} texto="Resistía *la penicilinasa*" />
      <Subtitulo T={T} idx={10} at={K.Pa + 0.1} until={K.H - 0.1} texto="Sin pared, *la bacteria revienta*" />
      <Subtitulo T={T} idx={11} at={K.H + 0.1} until={K.C - 0.1} texto="*1 de cada 5* dosis diarias" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Todo empezó *junto a un desagüe*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [K.B + 0.6, K.B + 2.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ti + 0.4, K.Sp - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Sp + 0.2, K.Mo - 0.2, 'avatar_07_pensativo_puno', 'bajo-der'],
        [K.Ex + 0.4, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Ox - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ox + 0.4, K.Cc - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Tr + 0.4, K.Pa - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pa + 2.6, K.H - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.H + 0.6, K.C - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="65" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CefaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CefaShot /></CompositionStage></div>;
}
window.CefaApp = CefaApp;
