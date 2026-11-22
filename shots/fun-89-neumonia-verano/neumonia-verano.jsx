// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Fungi Mati #89 · Esta tos no te la pegó nadie: te la da tu casa — NARRADO (gancho 1 "Esto no es X: es Y" + N1 por dentro + N2 "qué sí sirve").
// La neumonitis por hipersensibilidad tipo verano de Japón (Trichosporon). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No es consejo médico.

const NV = { muro:'#f1e3c2', muro2:'#e2cfa6', madera:'#a8743f', madera2:'#7d5229', tatami:'#d9c98a', tatami2:'#c4b170', heri:'#2f3a2a',
  shoji:'#fbf6e8', cielo:'#8fd8ff', lluvia:'#8796a8', piel:'#f2c29b', pelo:'#2a1d15', camisa:'#4aa3ff', pants:'#2b3b5c',
  hongo:'#fffaf0', hongo2:'#e9dcc0', humedad:'#b89d6e', hifa:'rgba(220,240,255,.22)', hifaB:'#cfe6ff', pulmon:'#ff9fb0', pulmon2:'#e8718a' };
const CUARTO = { x0: 60, x1: 1020, y0: 360, y1: 1220, piso: 960 };
// Encuadres del pase a mano (estilo cine): cada dibujo se agranda para llenar el cuadro; su barra de escala crece igual.
const ZQ = 1.45, ZQT = `translate(540 955) scale(${ZQ}) translate(-540 -790)`;     // el cuarto (1 m: 320 → 464 px)
const ZR = 1.3, ZRT = `translate(540 960) scale(${ZR}) translate(-540 -800)`;      // el rincón (10 cm: 120 → 156 px)
const ZH = 1.6, ZHT = `translate(540 1020) scale(${ZH}) translate(-540 -960)`;     // las hifas (10 µm: 150 → 240 px)
const ZB = 1.3;                                                                    // el busto (10 cm: 100 → 130 px)
const ZP = 1.5, ZPT = `translate(540 960) scale(${ZP}) translate(-540 -940)`;      // el pelo (1 mm: 300 → 450 px)

// Manchitas discretas del hongo junto al zoclo y en la orilla del tatami (donde se junta la humedad).
const MOTAS = (() => {
  const g = krng(89), out = [];
  for (let i = 0; i < 70; i++) {
    const zona = g() < 0.7 ? [110, 400] : [760, 980];
    out.push({ x: klerp(zona[0], zona[1], g()), y: CUARTO.piso - 6 + g() * 34, r: 2.5 + g() * 4.5, u: g() });
  }
  return out;
})();

// Persona sentada (seiza) de frente. tos 0..1 = cuánto tose (golpe de tos con la mano en la boca); calma = sonrisa.
function Persona({ T, x = 360, y = 1130, tos = 0, calma = 0 }) {
  const golpe = tos > 0 ? Math.max(0, Math.sin(T * 9)) * tos : 0;
  const hy = 780 - (1130 - y) + golpe * 10;
  return <g transform={`translate(${x} 0)`}>
    <ellipse cx={0} cy={y - 10} rx={170} ry={40} fill={NV.pants} stroke={KC.ink} strokeWidth={6} />
    <path d={`M -130 ${y - 20} L -95 ${hy + 90} Q 0 ${hy + 60} 95 ${hy + 90} L 130 ${y - 20} Z`} fill={NV.camisa} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-22} y={hy + 62} width={44} height={30} fill={NV.piel} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={hy} r={78} fill={NV.piel} stroke={KC.ink} strokeWidth={6} />
    <path d={`M -80 ${hy - 6} Q -84 ${hy - 96} 0 ${hy - 92} Q 84 ${hy - 96} 80 ${hy - 6} Q 50 ${hy - 56} -10 ${hy - 50} Q -60 ${hy - 46} -80 ${hy - 6} Z`} fill={NV.pelo} stroke={KC.ink} strokeWidth={5} />
    {tos > 0.3 ? <>
      <path d={`M -36 ${hy - 2} L -14 ${hy + 4} M 14 ${hy + 4} L 36 ${hy - 2}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={hy + 36} rx={16} ry={12 + golpe * 6} fill="#7a2e2e" stroke={KC.ink} strokeWidth={4} />
      <g transform={`translate(${-40} ${hy + 60 - golpe * 6}) rotate(-20)`}><rect x={-40} y={-30} width={80} height={56} rx={26} fill={NV.piel} stroke={KC.ink} strokeWidth={5} /></g>
    </> : <>
      <circle cx={-26} cy={hy - 2} r={7} fill={KC.ink} /><circle cx={26} cy={hy - 2} r={7} fill={KC.ink} />
      <path d={calma > 0.5 ? `M -26 ${hy + 30} Q 0 ${hy + 52} 26 ${hy + 30}` : `M -22 ${hy + 36} Q 0 ${hy + 32} 22 ${hy + 36}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    </>}
    {/* ondas de la tos */}
    {golpe > 0.15 && [0, 1, 2].map((k) => <path key={k} d={`M ${-70 - k * 26} ${hy + 20} Q ${-90 - k * 26} ${hy + 46} ${-70 - k * 26} ${hy + 72}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" opacity={golpe} />)}
  </g>;
}

// El cuarto de una casa japonesa de madera: muro, ventana, puerta corrediza de papel (shoji), zoclo de madera y tatamis.
// abierto 0..1 (ventana y shoji abiertos, entra aire) · lluvia 0..1 · humedo 0..1 · hongo 0..1 (motitas) · sombra 0..1 · calor 0..1 (termómetro).
function Cuarto({ T, id, abierto = 0, lluvia = 0, humedo = 0, hongo = 0, sombra = 0, calor = 0.5, tos = 0, calma = 0, persona = true, aire = 0 }) {
  const { x0, x1, y0, y1, piso } = CUARTO;
  const W = { x0: 110, x1: 380, y0: 430, y1: 700 };
  const S = { x0: 600, x1: 980, y0: 420, y1: piso };
  const pw = (S.x1 - S.x0) / 2, corre = abierto * pw;
  return <g>
    <clipPath id={`cq-${id}`}><rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={10} /></clipPath>
    <g clipPath={`url(#cq-${id})`}>
      <rect x={x0} y={y0} width={x1 - x0} height={piso - y0} fill={NV.muro} />
      {/* mancha de humedad en el muro */}
      <ellipse cx={200} cy={piso - 40} rx={180} ry={110} fill={NV.humedad} opacity={0.35 * humedo} />
      <ellipse cx={870} cy={piso - 20} rx={120} ry={70} fill={NV.humedad} opacity={0.25 * humedo} />
      {/* ventana */}
      <rect x={W.x0} y={W.y0} width={W.x1 - W.x0} height={W.y1 - W.y0} fill={lluvia > 0.5 ? NV.lluvia : NV.cielo} />
      {lluvia <= 0.5 && <g><circle cx={300} cy={500} r={48} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
        {Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4 + T * 0.6; return <line key={k} x1={300 + Math.cos(a) * 60} y1={500 + Math.sin(a) * 60} x2={300 + Math.cos(a) * 80} y2={500 + Math.sin(a) * 80} stroke={KC.orange} strokeWidth={6} strokeLinecap="round" />; })}</g>}
      {lluvia > 0.5 && Array.from({ length: 22 }, (_, k) => { const g = krng(300 + k), xx = W.x0 + g() * (W.x1 - W.x0), u = (T * 1.6 + g()) % 1; return <line key={k} x1={xx} y1={W.y0 + u * 280} x2={xx - 8} y2={W.y0 + u * 280 + 26} stroke="#dbe8f5" strokeWidth={3} opacity={lluvia} />; })}
      {/* vidrios (se corren al abrir) */}
      <g>
        <rect x={W.x0} y={W.y0} width={(W.x1 - W.x0) / 2} height={W.y1 - W.y0} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={6} />
        <rect x={W.x0 + (W.x1 - W.x0) / 2 - abierto * (W.x1 - W.x0) / 2} y={W.y0} width={(W.x1 - W.x0) / 2} height={W.y1 - W.y0} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={6} />
        {humedo > 0 && Array.from({ length: 14 }, (_, k) => { const g = krng(500 + k); return <ellipse key={k} cx={W.x0 + 14 + g() * (W.x1 - W.x0 - 28) * (1 - abierto * 0.5)} cy={W.y0 + 20 + g() * 240} rx={5} ry={7} fill="#e9f6ff" stroke="#6f8aa3" strokeWidth={2} opacity={humedo * (1 - abierto)} />; })}
      </g>
      <rect x={W.x0 - 14} y={W.y0 - 14} width={W.x1 - W.x0 + 28} height={W.y1 - W.y0 + 28} fill="none" stroke={NV.madera} strokeWidth={14} />
      <rect x={W.x0 - 21} y={W.y0 - 21} width={W.x1 - W.x0 + 42} height={W.y1 - W.y0 + 42} fill="none" stroke={KC.ink} strokeWidth={4} />
      {/* termómetro de pared */}
      <g transform="translate(470 440)">
        <rect x={-20} y={0} width={40} height={220} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={5} />
        <rect x={-9} y={200 - 180 * calor} width={18} height={180 * calor + 10} rx={9} fill={KC.red} />
        <circle cx={0} cy={232} r={28} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      </g>
      {/* shoji: jardín detrás, dos hojas de papel con cuadrícula de madera */}
      <rect x={S.x0} y={S.y0} width={S.x1 - S.x0} height={S.y1 - S.y0} fill={lluvia > 0.5 ? '#6f9a7a' : '#7fd88a'} />
      {abierto > 0 && <g opacity={abierto}>{[[680, 760], [820, 700], [920, 790]].map(([a, b], k) => <g key={k}><line x1={a} y1={S.y1} x2={a} y2={b} stroke="#3e6b3a" strokeWidth={10} /><circle cx={a} cy={b} r={56} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} /></g>)}</g>}
      {[S.x0 + corre, S.x0 + pw].map((px, k) => <g key={k}>
        <rect x={px} y={S.y0} width={pw} height={S.y1 - S.y0} fill={NV.shoji} stroke={NV.madera} strokeWidth={12} />
        {[1, 2, 3].map((c) => <line key={'c' + c} x1={px + (pw / 4) * c} y1={S.y0} x2={px + (pw / 4) * c} y2={S.y1} stroke={NV.madera} strokeWidth={5} />)}
        {[1, 2, 3, 4, 5].map((f) => <line key={'f' + f} x1={px} y1={S.y0 + ((S.y1 - S.y0) / 6) * f} x2={px + pw} y2={S.y0 + ((S.y1 - S.y0) / 6) * f} stroke={NV.madera} strokeWidth={5} />)}
        <rect x={px} y={S.y0} width={pw} height={S.y1 - S.y0} fill="none" stroke={KC.ink} strokeWidth={4} />
      </g>)}
      {/* vigas y postes */}
      <rect x={x0} y={y0} width={x1 - x0} height={40} fill={NV.madera} stroke={KC.ink} strokeWidth={5} />
      <rect x={x0} y={y0} width={34} height={piso - y0} fill={NV.madera} stroke={KC.ink} strokeWidth={5} />
      <rect x={x1 - 34} y={y0} width={34} height={piso - y0} fill={NV.madera} stroke={KC.ink} strokeWidth={5} />
      {/* piso de tatami en perspectiva */}
      <rect x={x0} y={piso} width={x1 - x0} height={y1 - piso} fill={NV.tatami} />
      {Array.from({ length: 13 }, (_, k) => <line key={'t' + k} x1={x0} y1={piso + 8 + k * 20} x2={x1} y2={piso + 8 + k * 20} stroke={NV.tatami2} strokeWidth={3} />)}
      <path d={`M 540 ${piso} L 540 ${y1}`} stroke={NV.heri} strokeWidth={16} />
      <path d={`M ${x0} ${piso + 140} L ${x1} ${piso + 140}`} stroke={NV.heri} strokeWidth={14} />
      <ellipse cx={230} cy={piso + 30} rx={200} ry={36} fill={NV.humedad} opacity={0.35 * humedo} />
      <rect x={x0} y={piso - 22} width={x1 - x0} height={24} fill={NV.madera2} stroke={KC.ink} strokeWidth={4} />
      {/* el hongo: motitas discretas (a simple vista casi no se ve) */}
      {MOTAS.map((m, i) => { const o = kclamp(hongo * 1.5 - m.u * 0.5, 0, 1); return o > 0.03 ? <circle key={i} cx={m.x} cy={m.y} r={m.r * (0.5 + 0.5 * o)} fill={i % 3 ? NV.hongo : NV.hongo2} stroke="rgba(0,0,0,.18)" strokeWidth={1.5} opacity={0.85 * o} /> : null; })}
      {persona && <Persona T={T} x={540} tos={tos} calma={calma} />}
      {/* aire que entra */}
      {aire > 0 && Array.from({ length: 7 }, (_, k) => { const u = ((T * 0.45 + k / 7) % 1); const yy = 470 + (k % 4) * 110; return <path key={k} d={`M ${klerp(140, 880, u)} ${yy} q 60 -30 120 0 t 120 0`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={aire * Math.sin(u * Math.PI) * 0.9} />; })}
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#1a1530" opacity={0.42 * sombra} />
    </g>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={10} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Acercamiento: el rincón donde el zoclo de madera toca el tatami, húmedo, con el hongo (mancha discreta).
function Rincon({ T, hongo = 1 }) {
  const g = krng(31), pts = Array.from({ length: 110 }, () => ({ x: 110 + g() * 340, y: 770 + Math.pow(g(), 1.6) * 170, r: 3 + g() * 7, u: g() }));
  return <g>
    <rect x={60} y={360} width={960} height={880} rx={10} fill={NV.muro} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={330} cy={700} rx={320} ry={200} fill={NV.humedad} opacity=".35" />
    {/* zoclo de madera con veta */}
    <rect x={60} y={720} width={960} height={70} fill={NV.madera2} stroke={KC.ink} strokeWidth={5} />
    {[735, 752, 770].map((yy, k) => <path key={k} d={`M 60 ${yy} Q 300 ${yy - 8} 540 ${yy + 4} T 1020 ${yy}`} stroke="#5f3c1d" strokeWidth={3} fill="none" />)}
    {/* tatami de cerca: hilera de tallos tejidos */}
    <rect x={60} y={790} width={960} height={450} fill={NV.tatami} stroke={KC.ink} strokeWidth={6} />
    <rect x={60} y={790} width={960} height={44} fill={NV.heri} />
    {Array.from({ length: 20 }, (_, f) => <g key={f}>
      <line x1={60} y1={846 + f * 20} x2={1020} y2={846 + f * 20} stroke={NV.tatami2} strokeWidth={4} />
      {Array.from({ length: 12 }, (_, c) => <line key={c} x1={110 + c * 80 + (f % 2) * 40} y1={836 + f * 20} x2={110 + c * 80 + (f % 2) * 40} y2={846 + f * 20} stroke="#a8955a" strokeWidth={3} />)}
    </g>)}
    <ellipse cx={330} cy={880} rx={300} ry={80} fill={NV.humedad} opacity=".3" />
    {pts.map((p, i) => { const o = kclamp(hongo * 1.5 - p.u * 0.5, 0, 1); return o > 0.03 ? <circle key={i} cx={p.x} cy={p.y} r={p.r * (0.5 + 0.5 * o)} fill={i % 3 ? NV.hongo : NV.hongo2} stroke="rgba(0,0,0,.2)" strokeWidth={1.5} opacity={0.8 * o} /> : null; })}
  </g>;
}

// Colonia de Trichosporon en cultivo de laboratorio: blanco-crema, polvosa, con surcos radiales y pliegues irregulares.
function ColoniaSurcos({ cx, cy, r }) {
  if (r <= 2) return null;
  const g = krng(7), n = 32;
  const borde = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (0.92 + g() * 0.12); return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g>
    <path d={borde} fill="#fbf3df" stroke="#cdbb95" strokeWidth={3} strokeLinejoin="round" />
    {Array.from({ length: 18 }, (_, k) => { const a = (k / 18) * Math.PI * 2 + g() * 0.15, r0 = r * 0.22, r1 = r * (0.8 + g() * 0.12), b = (g() - 0.5) * 0.25;
      return <path key={k} d={`M ${cx + Math.cos(a) * r0} ${cy + Math.sin(a) * r0} Q ${cx + Math.cos(a + b) * (r0 + r1) / 2} ${cy + Math.sin(a + b) * (r0 + r1) / 2} ${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1}`} stroke="#d6c6a4" strokeWidth={4} fill="none" strokeLinecap="round" />; })}
    <path d={`M ${cx - r * 0.2} ${cy - r * 0.05} q ${r * 0.1} ${-r * 0.18} ${r * 0.22} ${-r * 0.02} q ${r * 0.08} ${r * 0.16} ${-r * 0.1} ${r * 0.2} q ${-r * 0.16} ${-r * 0.02} ${-r * 0.12} ${-r * 0.18} Z`} fill="#efe3c6" stroke="#d6c6a4" strokeWidth={3} />
    {Array.from({ length: 40 }, (_, k) => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.9; return <circle key={'p' + k} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} r={2} fill="#fff" opacity=".8" />; })}
  </g>;
}

// Barril (artroconidia): rectángulo con lados un poco abombados. L × A en px.
function barril(L, A, b) {
  const l = L / 2, a = A / 2;
  return `M ${-l} ${-a} Q 0 ${-a - b} ${l} ${-a} Q ${l + b * 1.2} 0 ${l} ${a} Q 0 ${a + b} ${-l} ${a} Q ${-l - b * 1.2} 0 ${-l} ${-a} Z`;
}

// Hifa de Trichosporon asahii al microscopio: hialina (transparente), con tabiques, que se parte en artroconidias en barril.
// parte 0..1 = cuánto se separan los segmentos · vuela 0..1 = los segmentos se sueltan y suben con el aire.
function HifaTricho({ T, x0, x1, y, crece = 1, parte = 0, vuela = 0, seed = 1, L = 82, A = 46 }) {
  const g = krng(seed), n = Math.floor((x1 - x0) / (L + 4));
  const largo = (x1 - x0) * kclamp(crece, 0, 1);
  const segs = [];
  for (let i = 0; i < n; i++) {
    const cx = x0 + i * (L + 4) + L / 2; if (cx - L / 2 > x0 + largo) break;
    const dy = Math.sin(i * 0.7 + seed) * 6;
    const gap = parte * 10, sx = cx + (i - n / 2) * gap * 0.6;
    const v = kclamp(vuela * 1.6 - g() * 0.6, 0, 1), vx = (g() - 0.5) * 240 * v, vy = -v * (420 + g() * 300) + Math.sin(T * 2 + i) * 10 * v, rot = v * (g() - 0.5) * 140;
    segs.push(<g key={i} transform={`translate(${sx + vx} ${y + dy + vy}) rotate(${rot})`}>
      {parte < 1 && <rect x={-L / 2 - 2} y={-A / 2} width={L + 4} height={A} fill={NV.hifa} opacity={1 - parte} />}
      {parte < 1 && <line x1={L / 2 + 2} y1={-A / 2 + 3} x2={L / 2 + 2} y2={A / 2 - 3} stroke={NV.hifaB} strokeWidth={4} opacity={1 - parte} />}
      {parte > 0 && <path d={barril(L - parte * 6, A, parte * 7)} fill={NV.hifa} stroke={NV.hifaB} strokeWidth={4} opacity={parte} />}
      <ellipse cx={-L * 0.1} cy={0} rx={8} ry={6} fill="rgba(207,230,255,.45)" />
    </g>);
  }
  return <g>
    {segs}
    {parte < 1 && largo > 10 && <path d={`M ${x0} ${y - A / 2} L ${x0 + largo} ${y - A / 2} Q ${x0 + largo + 26} ${y} ${x0 + largo} ${y + A / 2} L ${x0} ${y + A / 2}`} fill="none" stroke={NV.hifaB} strokeWidth={4} opacity={1 - parte} />}
  </g>;
}

// Pulmones por dentro (para la Lupa): bronquios, alvéolos, cubitos que llegan y defensas que reaccionan (inflamación).
function PulmonPorDentro({ T, r, a0 }) {
  const t = T - a0, inf = kprog(t, 1.0, 2.4);
  return <svg width={2 * r} height={2 * r} viewBox="0 0 460 460">
    <rect width={460} height={460} fill="#1c0f1a" />
    <path d="M 230 20 L 230 140" stroke="#f6d2da" strokeWidth={26} strokeLinecap="round" />
    {[-1, 1].map((s) => <g key={s}>
      <path d={`M 230 140 Q ${230 + s * 60} 170 ${230 + s * 110} 230`} stroke="#f6d2da" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={`M ${230 + s * 110} 230 Q ${230 + s * 120} 290 ${230 + s * 90} 340 M ${230 + s * 110} 230 Q ${230 + s * 170} 270 ${230 + s * 180} 330`} stroke="#f6d2da" strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>)}
    {[[140, 360], [90, 340], [190, 390], [320, 360], [370, 340], [270, 390], [60, 290], [400, 290]].map(([x, y], k) => <g key={k}>
      {[[0, 0], [-20, 14], [20, 14], [0, 26]].map(([a, b], j) => <circle key={j} cx={x + a} cy={y + b} r={16} fill={NV.pulmon} stroke={NV.pulmon2} strokeWidth={3} />)}
      <circle cx={x} cy={y + 12} r={34 + 6 * Math.sin(T * 6 + k)} fill={KC.red} opacity={0.35 * inf} />
      {inf > 0.2 && [0, 1].map((j) => <circle key={'d' + j} cx={x + (j ? 24 : -26) * kclamp(1 - inf * 0.5, 0, 1)} cy={y + 34} r={9} fill={KC.lilac} stroke={KC.ink} strokeWidth={2} opacity={inf} />)}
    </g>)}
    {Array.from({ length: 10 }, (_, k) => { const g = krng(60 + k), u = ((t * 0.45 + g()) % 1); const x = klerp(230 + (g() - 0.5) * 60, [140, 90, 190, 320, 370, 270, 60, 400][k % 8], u), y = klerp(20, 360, u);
      return <path key={'c' + k} d={barril(16, 10, 2)} transform={`translate(${x} ${y}) rotate(${k * 37})`} fill="#f3ead2" stroke={KC.ink} strokeWidth={1.5} />; })}
  </svg>;
}

// Busto de perfil-frente (para la alergia): cabeza y hombros.
function Busto({ T, x, y, tose = 0 }) {
  const b = Math.max(0, Math.sin(T * 9)) * tose;
  return <g transform={`translate(${x} ${y + b * 8})`}>
    <path d="M -220 640 L -200 300 Q 0 230 200 300 L 220 640 Z" fill={NV.camisa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-44} y={170} width={88} height={90} fill={NV.piel} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={80} r={130} fill={NV.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -134 70 Q -140 -80 0 -70 Q 140 -80 134 70 Q 90 -10 -10 0 Q -100 0 -134 70 Z" fill={NV.pelo} stroke={KC.ink} strokeWidth={6} />
    <path d="M -56 70 L -24 78 M 24 78 L 56 70" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M 0 90 Q 14 120 0 128" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={168} rx={22} ry={14 + b * 8} fill="#7a2e2e" stroke={KC.ink} strokeWidth={5} />
    {b > 0.2 && [0, 1].map((k) => <path key={k} d={`M ${50 + k * 30} 150 Q ${70 + k * 30} 175 ${50 + k * 30} 200`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" opacity={b} />)}
  </g>;
}

// Casita japonesa de madera (íconos de los estudios). color = pared · marca: '✓' | '✗' | null.
function Casita({ x, y, s = 1, color = '#e9d9b6', techo = '#3b2f2a', marca, sol = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {sol > 0 && <g opacity={sol}><circle cx={56} cy={-96} r={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>}
    <rect x={-60} y={-10} width={120} height={80} fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={-16} y={20} width={32} height={50} fill={NV.madera} stroke={KC.ink} strokeWidth={4} />
    <path d="M -90 -4 Q -50 -20 0 -70 Q 50 -20 90 -4 Z" fill={techo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {marca === '✓' && <g transform="translate(46 50)"><circle r={26} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /><path d="M -12 0 L -3 10 L 13 -10" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
    {marca === '✗' && <g transform="translate(46 50)"><circle r={26} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><path d="M -10 -10 L 10 10 M 10 -10 L -10 10" stroke="#fff" strokeWidth={6} strokeLinecap="round" /></g>}
  </g>;
}

// Hospital (ícono).
function Hospital({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-130} y={-120} width={260} height={220} fill="#f4f7fb" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-140} width={300} height={30} fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} />
    <rect x={-22} y={-90} width={44} height={110} fill={KC.red} /><rect x={-55} y={-57} width={110} height={44} fill={KC.red} />
    {[-90, 90].map((dx) => <rect key={dx} x={dx - 22} y={-80} width={44} height={44} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-30} y={40} width={60} height={60} fill="#9aa7ad" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Ficha de síntomas: tres puntitos (tos, fiebre, falta de aire) encendidos (rojo) o apagados (verde).
function Sintomas({ x, y, mal = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-96} y={-30} width={192} height={60} rx={30} fill="rgba(14,15,18,.82)" stroke={KC.texto} strokeWidth={4} />
    {[-56, 0, 56].map((dx, k) => <circle key={k} cx={dx} cy={0} r={16} fill={mixHex(KC.leaf, KC.red, kclamp(mal, 0, 1))} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}

// Cepillo que talla.
function Cepillo({ x, y, rot = -20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-100} y={-34} width={200} height={50} rx={22} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <rect x={-36} y={-112} width={72} height={80} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-84 + i * 21} y1={16} x2={-84 + i * 21} y2={44} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}

// Pelo con piedra blanca: nódulos blanquecinos irregulares pegados al pelo.
const PELO = { x0: 30, y0: 820, cx: 540, cy: 860, x1: 1050, y1: 1060 };
function peloEn(u) { const { x0, y0, cx, cy, x1, y1 } = PELO, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; }
function PeloPiedra({ T, nod = [1, 1, 1] }) {
  return <g>
    <path d={`M ${PELO.x0} ${PELO.y0} Q ${PELO.cx} ${PELO.cy} ${PELO.x1} ${PELO.y1}`} stroke="#3a2618" strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d={`M ${PELO.x0} ${PELO.y0 - 6} Q ${PELO.cx} ${PELO.cy - 6} ${PELO.x1} ${PELO.y1 - 6}`} stroke="#6b4a32" strokeWidth={6} fill="none" opacity=".7" />
    {[0.22, 0.47, 0.72].map((u, k) => { const s = kclamp(nod[k], 0, 1); if (s <= 0) return null; const [x, y] = peloEn(u), g = krng(10 + k), n = 14, R = [62, 78, 56][k];
      const d = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = R * s * (0.7 + g() * 0.45) * (Math.abs(Math.cos(a)) * 0.35 + 0.75); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * rr * 1.3).toFixed(1)} ${(y + Math.sin(a) * rr * 0.8).toFixed(1)}`; }).join(' ') + ' Z';
      return <g key={k}><path d={d} fill="#f7f1e3" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        {Array.from({ length: 6 }, (_, j) => <circle key={j} cx={x + (g() - 0.5) * R * 1.4 * s} cy={y + (g() - 0.5) * R * 0.7 * s} r={4 + g() * 4} fill="#e2d6bc" />)}</g>; })}
  </g>;
}

// Mes del calendario.
const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
function Calendario({ T, a0 }) {
  return <g>{MESES.map((m, i) => {
    const c = i % 4, f = Math.floor(i / 4), cx = 165 + c * 250, cy = 790 + f * 250;
    const verano = i >= 5 && i <= 8, on = verano ? kprog(T, a0 + 1.2 + (i - 5) * 0.35, a0 + 1.5 + (i - 5) * 0.35) : 0, pico = i === 6 ? kprog(T, a0 + 2.6, a0 + 3.0, kEase.rebote) : 0;
    return <g key={m} transform={`translate(${cx} ${cy}) scale(${1.6 * (1 + 0.06 * on + 0.04 * pico)})`}>
      <rect x={-68} y={-70} width={136} height={140} rx={16} fill={mixHex('#ffffff', '#ffb02e', on)} stroke={KC.ink} strokeWidth={6} />
      <rect x={-68} y={-70} width={136} height={34} rx={10} fill={on > 0.5 ? KC.red : '#9aa7ad'} stroke={KC.ink} strokeWidth={4} />
      <text x={0} y={klerp(30, 18, pico)} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill="#0b1020">{m}</text>
      {pico > 0 && <text x={0} y={58} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill="#c22a20" opacity={pico}>▲ PICO</text>}
    </g>; })}</g>;
}

// Etiqueta con parte en cursiva (nombre científico): texto = [normal, cursiva, normal].
function EtqMix({ T, at, until, x, y, partes, lado = 'der', color = KC.texto, tam = 34 }) {
  return <Etq T={T} at={at} until={until} x={x} y={y} lado={lado} color={color} tam={tam} texto={<>{partes[0]}<i>{partes[1]}</i>{partes[2] || ''}</>} />;
}

function NeumoniaVeranoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Le: CUES.Levadura, Cu: CUES.Cubitos, Al: CUES.Alergia, Pi: CUES.Pista, P: CUES.Pregunta, Ca: CUES.Calor, Es: CUES.Estudio, Cs: CUES.Casas, Li: CUES.Limpiar, Pd: CUES.Piedra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const CsB = K.Cs + 3.4;                       // en «y más de la mitad…» el calendario cambia al cuarto
  const tosG = kprog(T, K.G + 0.15, K.G + 0.4);
  const viaje = kprog(T, K.Pi + 1.6, K.Pi + 2.6, kEase.suave);   // del hospital a la casa
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la tos en el cuarto de madera; no es contagio, es la casa */}
      <Escena T={T} a={K.G} b={K.Le} zoom={0.05} origen="50% 22%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={ZQT}>
            <Cuarto T={T} id="g" humedo={0.8} hongo={0.5} calor={0.8} tos={tosG} />
            <Sello T={T} at={K.G + 2.2} x={770} y={840} texto="TU CASA" color={KC.red} r={92} />
          </g>
        </>)}
      </Escena>
      {/* 2 · el rincón: zoclo de madera húmeda y tatami, donde vive la levadura; en cultivo se ve así */}
      <Escena T={T} a={K.Le} b={K.Cu} zoom={0.05} origen="30% 70%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform={ZRT}>
          <Rincon T={T} hongo={kprog(T, K.Le + 0.3, K.Le + 2.4)} />
          {(() => { const p = kprog(T, K.Le + 0.2, K.Le + 0.7, kEase.rebote); return p > 0 ? <g transform={`translate(745 540) scale(${p})`}>
            <Petri x={0} y={0} r={140} medio="#f2dfa8"><ColoniaSurcos cx={0} cy={0} r={110 * kprog(T, K.Le + 0.8, K.Le + 4.4, kEase.sale)} /></Petri></g> : null; })()}
          </g>
        </>)}
      </Escena>
      {/* 3 · al microscopio: hifas hialinas que se parten en artroconidias en barril (sin gemación) y vuelan */}
      <Escena T={T} a={K.Cu} b={K.Al} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<g transform={ZHT}>
          <HifaTricho T={T} x0={60} x1={1040} y={790} seed={3} crece={kprog(T, K.Cu - 0.3, K.Cu + 0.8)} parte={kprog(T, K.Cu + 0.6, K.Cu + 1.8)} vuela={kprog(T, K.Cu + 2.2, K.Cu + 5.0)} />
          <HifaTricho T={T} x0={20} x1={980} y={960} seed={5} crece={kprog(T, K.Cu - 0.2, K.Cu + 1.0)} parte={0} />
          <HifaTricho T={T} x0={80} x1={1060} y={1130} seed={8} crece={kprog(T, K.Cu, K.Cu + 1.2)} parte={kprog(T, K.Cu + 1.2, K.Cu + 2.6)} vuela={kprog(T, K.Cu + 3.0, K.Cu + 6.0) * 0.5} />
        </g>)}
      </Escena>
      {/* 4 · por dentro: no es infección, es tu pulmón reaccionando como alergia */}
      <Escena T={T} a={K.Al} b={K.Pi} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g transform={`translate(300 470) scale(${ZB})`}><Busto T={T} x={0} y={0} tose={kprog(T, K.Al + 2.8, K.Al + 3.1)} /></g>
          {(() => { const g = krng(12); return Array.from({ length: 12 }, (_, i) => { const d = g(), u = ((T - K.Al) * 0.35 + d) % 1, yy = 520 + g() * 260; return <path key={i} d={barril(24, 15, 3)} transform={`translate(${klerp(1100, 312, u)} ${klerp(yy, 672, u)}) rotate(${i * 30})`} fill="#f3ead2" stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.Al - 0.2, K.Al + 0.3) * (u < 0.92 ? 1 : 0)} />; }); })()}
        </>)}
        <Lupa T={T} at={K.Al + 0.5} until={K.Pi - 0.3} x={760} y={1090} r={290} fx={300} fy={912} tinte={KC.red} etiqueta="POR DENTRO · pulmón" interior={(TT, r) => <PulmonPorDentro T={TT} r={r} a0={K.Al + 0.5} />} />
      </Escena>
      {/* 5 · la pista: en el hospital suele mejorar; al volver a casa, regresa */}
      <Escena T={T} a={K.Pi} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<g transform="translate(0 70)">
          <path d="M 270 1170 Q 540 1290 810 1170" stroke={KC.ink} strokeWidth={8} strokeDasharray="20 14" fill="none" strokeLinecap="round" />
          <g transform="translate(270 760) scale(1.35) translate(-270 -760)"><Hospital x={270} y={760} /></g>
          <Casita x={810} y={780} s={2.6} />
          {(() => { const x = klerp(270, 810, viaje), y = 1170 + Math.sin(viaje * Math.PI) * 60;
            const mal = viaje < 0.5 ? 1 - kprog(T, K.Pi + 0.3, K.Pi + 1.4) : kprog(T, K.Pi + 2.6, K.Pi + 3.2);
            return <g transform={`translate(${x} ${y}) scale(1.6)`}><circle cx={0} cy={-40} r={34} fill={NV.piel} stroke={KC.ink} strokeWidth={5} /><path d="M -40 50 Q 0 -20 40 50 Z" fill={NV.camisa} stroke={KC.ink} strokeWidth={5} />
              <Sintomas x={0} y={-120} mal={mal} /></g>; })()}
        </g>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué en verano? */}
      <Escena T={T} a={K.P} b={K.Ca} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g transform="translate(400 1000) scale(1.6)"><circle r={100} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 10 }, (_, k) => { const a = k * Math.PI / 5 + T * 0.8; return <line key={k} x1={Math.cos(a) * 124} y1={Math.sin(a) * 124} x2={Math.cos(a) * 168} y2={Math.sin(a) * 168} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />; })}</g>
          <Interrogacion T={T} x={800} y={1360} tam={460} />
          <g transform={`translate(540 ${600 + Math.sin(T * 10) * 3})`} opacity={kprog(T, K.P, K.P + 0.25)}>
            <text textAnchor="middle" style={{ font:`400 112px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={10} paintOrder="stroke">¿POR QUÉ EN VERANO?</text>
          </g>
        </>)}
      </Escena>
      {/* 7 · calor y humedad: llueve, el termómetro sube y el hongo se extiende */}
      <Escena T={T} a={K.Ca} b={K.Es} zoom={0.05} origen="50% 22%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={ZQT}>
          <Cuarto T={T} id="ca" lluvia={1} humedo={kprog(T, K.Ca, K.Ca + 3)} hongo={klerp(0.3, 1, kprog(T, K.Ca + 1.0, K.Ca + 4.2))} calor={klerp(0.35, 0.95, kprog(T, K.Ca + 0.4, K.Ca + 2.0, kEase.suave))} />
          {(() => { const p = kprog(T, K.Ca + 1.6, K.Ca + 2.4, kEase.rebote); return p > 0 ? <g transform={`translate(560 560) scale(${p})`}>
            <path d="M 0 -60 Q 44 0 44 22 A 44 44 0 1 1 -44 22 Q -44 0 0 -60 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} /></g> : null; })()}
          </g>
        </>)}
      </Escena>
      {/* 8 · el estudio: 835 casos en Japón de 1980 a 1989; tres de cada cuatro, tipo verano */}
      <Escena T={T} a={K.Es} b={K.Cs} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[0, 1, 2, 3].map((i) => { const ap = kprog(T, K.Es - 0.3 + i * 0.12, K.Es + 0.2 + i * 0.12, kEase.rebote), ver = i < 3 ? kprog(T, K.Es + 4.8 + i * 0.25, K.Es + 5.1 + i * 0.25) : 0;
            return ap > 0 ? <Casita key={i} x={300 + (i % 2) * 480} y={1020 + Math.floor(i / 2) * 360} s={1.9 * ap} color={mixHex('#8d8a84', '#ffd36e', ver)} sol={ver} /> : null; })}
        </>)}
      </Escena>
      {/* 9a · el calendario: de junio a septiembre, pico en julio */}
      <Escena T={T} a={K.Cs} b={CsB} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Calendario T={T} a0={K.Cs} />)}
      </Escena>
      {/* 9b · más de la mitad: cuartos húmedos, sombríos o mal ventilados */}
      <Escena T={T} a={CsB} b={K.Li} zoom={0.05} origen="50% 22%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={ZQT}><Cuarto T={T} id="cs" humedo={1} hongo={0.7} sombra={kprog(T, CsB + 1.2, CsB + 2.0)} calor={0.8} /></g>)}
      </Escena>
      {/* 10 · lo que sirve: sacar el hongo de la casa (y ventilar) · el estudio de 1989 */}
      <Escena T={T} a={K.Li} b={K.Pd} zoom={0.04} origen="50% 22%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform={ZQT}>
          <Cuarto T={T} id="li" humedo={1 - kprog(T, K.Li + 1.6, K.Li + 3.0)} hongo={0.7 * (1 - kprog(T, K.Li + 0.3, K.Li + 2.3))} abierto={kprog(T, K.Li + 1.4, K.Li + 2.2, kEase.suave)} aire={kprog(T, K.Li + 1.8, K.Li + 2.4)} calor={0.6} />
          {(() => { const u = kprog(T, K.Li + 0.2, K.Li + 2.3); return u > 0 && u < 1 ? <Cepillo x={klerp(200, 380, 0.5 - 0.5 * Math.cos(u * Math.PI * 5))} y={CUARTO.piso - 30} /> : null; })()}
          </g>
          {T > K.Li + 2.5 && <g opacity={kprog(T, K.Li + 2.5, K.Li + 2.9)}>
            <rect x={-20} y={320} width={1120} height={1270} fill="rgba(7,34,30,.78)" />
            {[0, 1, 2, 3, 4, 5].map((i) => { const p = kprog(T, K.Li + 2.8 + i * 0.12, K.Li + 3.2 + i * 0.12, kEase.rebote); return p > 0 ? <Casita key={i} x={190 + (i % 3) * 310} y={815 + Math.floor(i / 3) * 215} s={1.4 * p} color="#f6efe0" marca="✓" /> : null; })}
            {[0, 1].map((i) => { const p = kprog(T, K.Li + 4.4 + i * 0.15, K.Li + 4.8 + i * 0.15, kEase.rebote); return p > 0 ? <Casita key={'x' + i} x={190 + i * 280} y={1310} s={1.4 * p} color="#9c958a" marca="✗" /> : null; })}
          </g>}
        </>)}
      </Escena>
      {/* 11 · dato extra: sus parientes hacen la piedra blanca del pelo */}
      <Escena T={T} a={K.Pd} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<g transform={ZPT}><PeloPiedra T={T} nod={[0, 1, 2].map((k) => kprog(T, K.Pd + 0.7 + k * 0.5, K.Pd + 1.1 + k * 0.5, kEase.rebote))} /></g>)}
      </Escena>
      {/* 12 · cierre: el mismo cuarto del inicio, abierto, seco y con aire */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="50% 22%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={ZQT}>
            <Cuarto T={T} id="c" abierto={1} aire={1} humedo={0} hongo={0} calor={0.5} calma={1} />
            <Sello T={T} at={K.C + 1.0} x={770} y={840} texto="MÁS AIRE" color={KC.leaf} r={92} />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.3} texto="¿contagio?" x={215} y={640} tam={52} />
      {kvisible(T, K.G + 0.2, K.G + 2.6, 0) && Math.sin(T * 9) > 0.2 && <div style={{ position:'absolute', left:120, top:900, zIndex:41, font:`400 100px ${KF.titulo}`, color:KC.white, WebkitTextStroke:`3px ${KC.ink}`, textShadow:`4px 4px 0 ${KC.ink}`, transform:'rotate(-8deg)' }}>¡COF!</div>}
      <Chip T={T} at={K.G + 2.9} until={K.Le - 0.3} texto="casi siempre en verano" x={700} y={400} tam={36} borde={KC.orange} />
      <EtqMix T={T} at={K.Le + 1.0} until={K.Cu - 0.3} x={470} y={1210} partes={['aquí vive · ', 'Trichosporon']} tam={34} color="#0b1020" />
      <Chip T={T} at={K.Le + 0.6} until={K.Cu - 0.3} texto="madera húmeda" x={260} y={770} tam={34} borde={NV.madera} />
      <Chip T={T} at={K.Le + 1.6} until={K.Cu - 0.3} texto="tatami" x={260} y={1400} tam={34} borde={NV.heri} />
      <Chip T={T} at={K.Le + 3.0} until={K.Cu - 0.3} texto="así se ve en cultivo" x={805} y={860} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Le + 0.2} until={K.Le + 2.6} texto="una levadura" x={300} y={470} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Cu + 0.3} until={K.Al - 0.3} x={60} y={420} texto="Trichosporon asahii" it tam={44} color={KC.gold2} />
      <Etq T={T} at={K.Cu + 1.0} until={K.Al - 0.3} x={60} y={945} texto="hifa con tabiques" tam={32} />
      <Etq T={T} at={K.Cu + 1.8} until={K.Al - 0.3} x={60} y={1215} texto="se parte en artroconidias («cubitos»)" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Cu + 2.4} until={K.Al - 0.3} texto="flotan en el aire" x={330} y={560} tam={36} borde={KC.cyan} />
      <MitoTachado T={T} at={K.Al + 0.3} tacharEn={K.Al + 1.2} until={K.Al + 2.6} texto="INFECCIÓN" x={770} y={500} tam={52} />
      <Chip T={T} at={K.Al + 1.6} until={K.Pi - 0.3} texto="alergia del pulmón" x={260} y={1420} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Al + 2.9} until={K.Pi - 0.3} texto="tos" x={650} y={440} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.Al + 3.4} until={K.Pi - 0.3} texto="fiebre" x={850} y={440} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.Al + 3.9} until={K.Pi - 0.3} texto="falta de aire" x={760} y={540} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Pi + 0.9} until={K.P - 0.3} texto="en el hospital: suele mejorar" x={330} y={560} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Pi + 2.7} until={K.P - 0.3} texto="en casa: regresa" x={780} y={1440} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Pi + 0.1} until={K.P - 0.3} texto="LA PISTA" x={540} y={420} tam={48} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Es - 0.3} texto="calor" x={300} y={410} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ca + 1.6} until={K.Es - 0.3} texto="humedad" x={560} y={410} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Ca + 2.6} until={K.Es - 0.3} texto="el hongo se extiende" x={215} y={1090} tam={28} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.2} anio="1980–1989" quien="Japón · encuesta nacional" revista="Ando y col. · Am Rev Respir Dis (1991)" y={540} />
      <NumeroGigante T={T} at={K.Es + 2.3} until={K.Cs - 0.3} valor={835} dur={1.2} x={540} y={470} tam={210} color={KC.yellow} />
      <Chip T={T} at={K.Es + 2.6} until={K.Cs - 0.3} texto="casos de alergias del pulmón" x={540} y={625} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Es + 5.0} until={K.Cs - 0.3} texto="3 de cada 4: tipo verano (74 %)" x={540} y={715} tam={34} borde={KC.orange} />
      <NumeroGigante T={T} at={K.Cs + 0.1} until={CsB - 0.2} valor={86} dur={0.9} sufijo=" de cada 100" x={540} y={440} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Cs + 1.0} until={CsB - 0.2} texto="empezaron de junio a septiembre" x={540} y={570} tam={32} borde={KC.red} />
      <Chip T={T} at={CsB + 0.5} until={K.Li - 0.3} texto="más de la mitad" x={540} y={410} tam={38} borde={KC.gold} />
      <Chip T={T} at={CsB + 0.8} until={K.Li - 0.3} texto="húmedo" x={860} y={700} tam={36} borde={KC.cyan} />
      <Chip T={T} at={CsB + 1.4} until={K.Li - 0.3} texto="sombrío" x={860} y={800} tam={36} borde={KC.lilac} />
      <Chip T={T} at={CsB + 2.1} until={K.Li - 0.3} texto="mal ventilado" x={860} y={900} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Li + 0.4} until={K.Li + 2.4} texto="sacar el hongo de la casa" x={540} y={410} tam={38} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.Li + 2.6} until={K.Pd - 0.3} anio="1989" quien="Japón · Yoshida y col." revista="Arch Environ Health" x={540} y={560} />
      <Chip T={T} at={K.Li + 3.9} until={K.Pd - 0.3} texto="bien limpiadas: 0 recaídas" x={500} y={1240} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Li + 4.6} until={K.Pd - 0.3} texto="mal limpiadas: recayeron" x={800} y={1395} tam={28} borde={KC.red} />
      <Etq T={T} at={K.Pd + 1.4} until={K.C - 0.3} x={540} y={720} texto="piedra blanca" tam={44} color={KC.ink} />
      <EtqMix T={T} at={K.Pd + 2.0} until={K.C - 0.3} x={80} y={1220} partes={['otras especies de ', 'Trichosporon']} tam={36} color={KC.ink} />
      <Chip T={T} at={K.Pd + 0.4} until={K.C - 0.3} texto="nuditos en el pelo" x={330} y={520} tam={38} borde={KC.white} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="menos humedad" x={540} y={410} tam={40} borde={KC.cyan} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Le} texto="1 m" largo={320 * ZQ} />
      <BarraEscala T={T} at={K.Le} until={K.Cu} texto="10 cm" largo={120 * ZR} />
      <BarraEscala T={T} at={K.Cu} until={K.Al} texto="10 µm" largo={150 * ZH} />
      <BarraEscala T={T} at={K.Al} until={K.Pi} texto="10 cm" largo={100 * ZB} />
      <BarraEscala T={T} at={K.Ca} until={K.Es} texto="1 m" largo={320 * ZQ} />
      <BarraEscala T={T} at={CsB} until={K.Li + 2.6} texto="1 m" largo={320 * ZQ} />
      <BarraEscala T={T} at={K.Pd} until={K.C} texto="1 mm" largo={300 * ZP} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m" largo={320 * ZQ} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Le - 0.1} texto="Te la da *tu casa.*" />
      <Subtitulo T={T} idx={1} at={K.Le + 0.1} until={K.Cu - 0.1} texto="Vive en *madera húmeda.*" />
      <Subtitulo T={T} idx={2} at={K.Cu + 0.1} until={K.Al - 0.1} texto="Y tú *los respiras.*" />
      <Subtitulo T={T} idx={3} at={K.Al + 0.1} until={K.Pi - 0.1} texto="Es *alergia del pulmón.*" />
      <Subtitulo T={T} idx={4} at={K.Pi + 0.1} until={K.P - 0.1} texto="En casa, *regresa.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ca - 0.1} texto="¿Por qué *en verano?*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.Es - 0.1} texto="*Calor y humedad.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Cs - 0.1} texto="835 casos: *3 de cada 4.*" />
      <Subtitulo T={T} idx={8} at={K.Cs + 0.1} until={K.Li - 0.1} texto="Húmedo, *mal ventilado.*" />
      <Subtitulo T={T} idx={9} at={K.Li + 0.1} until={K.Pd - 0.1} texto="Sácalo *de la casa.*" />
      <Subtitulo T={T} idx={10} at={K.Pd + 0.1} until={K.C - 0.1} texto="*Piedra blanca* del pelo." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu casa pide *más aire.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Cu + 0.3, K.Cu + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Al + 0.4, K.Pi - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ca + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 2.3, K.Cs - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CsB + 0.2, K.Li - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Li + 1.3, K.Pd - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Pd + 0.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="89" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NeumoniaVeranoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NeumoniaVeranoShot /></CompositionStage></div>;
}
window.NeumoniaVeranoApp = NeumoniaVeranoApp;
