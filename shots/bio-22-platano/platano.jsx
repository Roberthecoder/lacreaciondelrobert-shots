// Shot Biotecnológico #22 · Ese plátano no es único: es un clon (Cavendish, Fusarium TR4 y QCAV-4) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (formas reales, tamaños aproximados).
const AMAR = '#ffd93b', AMAR_OSC = '#e0a91c', PULPA = '#f7ecc8', HOJA = '#3fbf4a', HOJA_SECA = '#c9a23a', CAFE = '#7a4a22';
const TIERRA = '#8a5a3c', HONGO = '#e9d9ff', XILEMA_CAFE = '#8b3a1e';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Barra de escala fija (esquemática): px = largo de la barra, texto = lo que mide.
function EscalaFija({ T, at, until, px, texto, x = 60, y = 1640, color = KC.texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'fundido');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o }}>
    <div style={{ width:px, height:12, background:color, border:`3px solid ${KC.ink}`, borderRadius:4 }}></div>
    <div style={{ font:`700 28px ${KF.mono}`, color, textShadow:KSOMBRA, marginTop:6 }}>{texto}</div>
  </div>;
}

/* ---------- el plátano ---------- */
function Platano({ x, y, s = 1, rot = 0, color = AMAR, gordo = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s} ${s * gordo})`} opacity={o}>
    <path d="M 196 -84 L 230 -128" stroke="#5c7a2e" strokeWidth={22} strokeLinecap="round" />
    <path d="M 196 -84 L 230 -128" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" opacity=".0" />
    <path d="M -200 -55 Q 0 160 205 -80 Q 0 -10 -200 -55 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 -30 Q 0 40 150 -50" stroke="rgba(255,255,255,.55)" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -195 -50 Q 0 92 200 -78" stroke={AMAR_OSC} strokeWidth={4} fill="none" />
    <circle cx={-200} cy={-55} r={11} fill="#3b2a1a" stroke={KC.ink} strokeWidth={4} />
    <rect x={218} y={-146} width={26} height={24} rx={6} fill="#4a3a22" stroke={KC.ink} strokeWidth={5} transform="rotate(-50 231 -134)" />
  </g>;
}
// Brazo que sostiene un plátano desde abajo.
function ManoPlatano({ T, x, y, piel = '#f1b48f', rot = 0, sube = 1, seed = 1, escudo = 0 }) {
  const dy = (1 - sube) * 700 + mece(T, seed, 0.4) * 8;
  return <g transform={`translate(${x} ${y + dy}) rotate(${rot})`}>
    {escudo > 0 && <g opacity={escudo}>
      <ellipse cx={0} cy={-40} rx={250 * escudo} ry={150 * escudo} fill="rgba(244,194,90,.22)" stroke={KC.gold2} strokeWidth={10} strokeDasharray="26 14" strokeDashoffset={-T * 60} />
      <path d={`M 0 -210 L 46 -186 L 46 -150 Q 46 -120 0 -104 Q -46 -120 -46 -150 L -46 -186 Z`} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} transform="translate(160 -60)" />
    </g>}
    <rect x={-80} y={40} width={160} height={900} rx={78} fill={piel} stroke={KC.ink} strokeWidth={10} />
    <Platano x={0} y={-30} s={0.95} rot={-6 + mece(T, seed + 3, 0.3) * 3} />
    <ellipse cx={0} cy={30} rx={104} ry={84} fill={piel} stroke={KC.ink} strokeWidth={10} />
    {[-48, -16, 16, 48].map((dx, i) => <path key={i} d={`M ${dx} -20 Q ${dx + 6} 0 ${dx} 24`} stroke={mixHex(piel, '#000000', 0.35)} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <path d="M -100 20 Q -130 -20 -86 -40 Q -60 -40 -50 -10" fill={piel} stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Corte transversal: Cavendish (sin semillas útiles, solo puntitos) o silvestre (semillas duras).
function CorteFruto({ x, y, r = 170, silvestre = false, T = 0 }) {
  const lados = 5, pts = [];
  for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2, k = 1 + 0.06 * Math.cos(a * lados); pts.push([Math.cos(a) * r * k, Math.sin(a) * r * k]); }
  const d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const R = krng(silvestre ? 9 : 4);
  return <g transform={`translate(${x} ${y}) rotate(${T * 4})`}>
    <path d={d} fill={AMAR} stroke={KC.ink} strokeWidth={8} />
    <circle r={r * 0.82} fill={PULPA} stroke={AMAR_OSC} strokeWidth={4} />
    {[0, 120, 240].map((a, i) => <line key={i} x1={0} y1={0} x2={Math.cos((a - 90) * Math.PI / 180) * r * 0.35} y2={Math.sin((a - 90) * Math.PI / 180) * r * 0.35} stroke="#e4d29a" strokeWidth={6} strokeLinecap="round" />)}
    {silvestre
      ? Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2, rr = r * (0.3 + 0.18 * (i % 2)); return <ellipse key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} rx={r * 0.13} ry={r * 0.1} fill="#1b1410" stroke={KC.ink} strokeWidth={3} transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * rr} ${Math.sin(a) * rr})`} />; })
      : Array.from({ length: 12 }, (_, i) => { const a = R() * Math.PI * 2, rr = r * (0.08 + R() * 0.2); return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={3 + R() * 2} fill="#4a3424" />; })}
  </g>;
}
// Cromosoma en X (esquemático).
function CromosomaX({ x, y, h = 40, color = KC.pink, rot = 0 }) {
  const w = h * 0.28;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[-18, 18].map((a, i) => <rect key={i} x={-w / 2} y={-h / 2} width={w} height={h} rx={w / 2} fill={color} stroke={KC.ink} strokeWidth={3} transform={`rotate(${a})`} />)}
    <circle r={w * 0.35} fill={KC.ink} />
  </g>;
}
// Célula con 3 juegos de cromosomas: 11 tipos × 3 copias (Musa: x = 11, triploide).
function CelulaTriploide({ T, x, y, r = 210, p = 1 }) {
  const cols = ['#ff2d78', '#ffe11a', '#00d2ff', '#2fe0a8', '#b18cff', '#ff8a1f', '#ff6b5a', '#F4C25A', '#11a39a', '#e8336d', '#ffffff'];
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="rgba(47,224,168,.16)" stroke="#9ff5d4" strokeWidth={8} />
    <circle r={r * 0.78} fill="rgba(177,140,255,.16)" stroke="#d6c7ff" strokeWidth={5} strokeDasharray="12 8" />
    {cols.map((c, i) => [0, 1, 2].map((k) => { const n = i * 3 + k, on = kprog(p, n / 33 * 0.8, n / 33 * 0.8 + 0.15);
      return on > 0 ? <g key={n} opacity={on}><CromosomaX x={-r * 0.7 + i * (r * 1.4 / 10)} y={-r * 0.42 + k * r * 0.42 + Math.sin(T * 2 + n) * 3} h={36 + (i % 4) * 9} color={c} rot={Math.sin(T + n) * 10} /></g> : null; }))}
  </g>;
}
/* ---------- la mata ---------- */
function Mata({ T, x, y, s = 1, amarillo = 0, racimo = true, hijuelo = 0, seed = 1, brillo = 0, o = 1 }) {
  const angs = [-158, -122, -92, -62, -28, 168, 12];
  const hojaColor = amarillo < 0.5 ? mixHex(HOJA, '#e8c93a', amarillo * 2) : mixHex('#e8c93a', HOJA_SECA, (amarillo - 0.5) * 2);
  const R = krng(seed);
  const raices = Array.from({ length: 9 }, () => [(R() - 0.5) * 140, 60 + R() * 120, (R() - 0.5) * 160]);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle cx={0} cy={-420} r={360} fill={KC.gold2} opacity={0.18 * brillo} />}
    {raices.map(([dx, dy, ex], i) => <path key={i} d={`M ${dx * 0.4} 20 Q ${dx} ${dy * 0.6} ${dx + ex * 0.5} ${dy}`} stroke="#d9c39a" strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <ellipse cx={0} cy={18} rx={78} ry={42} fill="#a0784f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 0 L -28 -390 L 28 -390 L 40 0 Z" fill={mixHex('#7fae4a', '#b59a4a', amarillo * 0.6)} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-14, 6, 22].map((dx, i) => <path key={i} d={`M ${dx} -10 L ${dx * 0.7} -385`} stroke="rgba(0,0,0,.18)" strokeWidth={5} />)}
    {racimo && <g transform={`translate(18 -380) rotate(${mece(T, seed + 7, 0.3) * 2})`}>
      <path d="M 0 0 Q 70 20 80 120" stroke="#6b8a33" strokeWidth={14} fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3].map((k) => <g key={k}>{[0, 1, 2].map((j) => <path key={j} d={`M ${54 + j * 16} ${40 + k * 26} q ${30} ${-10} ${44} ${-34}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />)}
        {[0, 1, 2].map((j) => <path key={'c' + j} d={`M ${54 + j * 16} ${40 + k * 26} q ${30} ${-10} ${44} ${-34}`} stroke={mixHex('#9ccc44', AMAR, 0.2)} strokeWidth={9} fill="none" strokeLinecap="round" />)}</g>)}
      <path d="M 80 120 q 6 30 -4 50" stroke="#6b8a33" strokeWidth={10} fill="none" /><ellipse cx={74} cy={182} rx={16} ry={26} fill="#7a2840" stroke={KC.ink} strokeWidth={5} />
    </g>}
    {angs.map((a0, i) => {
      const fuera = i === 0 || i === 4 || i === 5 || i === 6, caida = amarillo * (fuera ? 1 : 0.55);
      const dest = a0 < -90 || a0 > 90 ? 110 : 70;
      const a = (a0 > 90 ? klerp(a0, dest + 20, caida) : klerp(a0, a0 < -90 ? dest + 180 - 360 : dest, caida)) + mece(T, seed + i, 0.35) * 4;
      const L = 300 - (i % 3) * 30, W = 78;
      return <g key={i} transform={`translate(0 -388) rotate(${a})`}>
        <path d={`M 0 0 Q ${L * 0.45} ${-W} ${L} ${-6} Q ${L * 0.55} ${W * 0.9} 0 0 Z`} fill={hojaColor} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M 6 0 L ${L - 10} -4`} stroke={mixHex(hojaColor, '#ffffff', 0.35)} strokeWidth={6} />
        {amarillo > 0.3 && <path d={`M ${L * 0.3} ${-W * 0.6} Q ${L * 0.6} ${-W * 0.75} ${L * 0.92} ${-10}`} stroke={CAFE} strokeWidth={8} fill="none" opacity={(amarillo - 0.3) * 1.4} />}
      </g>;
    })}
    {hijuelo > 0 && <g transform={`translate(96 4) scale(${0.12 + 0.24 * hijuelo})`}>
      <path d="M -40 0 L -28 -390 L 28 -390 L 40 0 Z" fill="#7fae4a" stroke={KC.ink} strokeWidth={14} />
      {[-120, -80, -50].map((a, i) => <g key={i} transform={`translate(0 -388) rotate(${a + mece(T, i + 20, 0.4) * 5})`}><path d="M 0 0 Q 140 -40 280 -6 Q 150 36 0 0 Z" fill={HOJA} stroke={KC.ink} strokeWidth={14} /></g>)}
    </g>}
  </g>;
}
function Suelo({ y = 1250, color = TIERRA }) {
  return <g><rect x={-20} y={y} width={KW + 40} height={KH - y + 20} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={y} width={KW + 40} height={26} fill="rgba(255,255,255,.18)" /></g>;
}
// Frasco de cultivo de tejidos con una plantita.
function Frasco({ T, x, y, s = 1, crece = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-240} width={220} height={260} rx={30} fill="rgba(220,245,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-280} width={240} height={50} rx={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    <rect x={-102} y={-60} width={204} height={74} rx={18} fill="#d8f0a8" stroke="#9cc25a" strokeWidth={4} />
    <g transform={`translate(0 -58) scale(${0.3 + 0.7 * crece})`}>
      <path d="M -8 0 L -6 -90 L 6 -90 L 8 0 Z" fill="#7fae4a" stroke={KC.ink} strokeWidth={5} />
      {[-140, -95, -40].map((a, i) => <g key={i} transform={`translate(0 -88) rotate(${a + Math.sin(T * 2 + i) * 4})`}><path d="M 0 0 Q 50 -22 100 -4 Q 52 18 0 0 Z" fill={HOJA} stroke={KC.ink} strokeWidth={5} /></g>)}
      {[-20, 0, 20].map((dx, i) => <path key={i} d={`M 0 0 q ${dx} 20 ${dx * 1.6} 40`} stroke="#e6d9b0" strokeWidth={4} fill="none" />)}
    </g>
    <path d="M -80 -220 L -80 -100" stroke="rgba(255,255,255,.8)" strokeWidth={10} strokeLinecap="round" />
  </g>;
}
// Barco carguero con cajas iguales.
function Barco({ T, x, y, cajas = 1, s = 1 }) {
  const bob = Math.sin(T * 1.6) * 8, rr = Math.sin(T * 1.2) * 1.5, n = 10;
  return <g transform={`translate(${x} ${y + bob}) rotate(${rr}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const on = kprog(cajas * n, i, i + 1); const cx = -330 + (i % 5) * 132, cy = -150 - Math.floor(i / 5) * 92;
      return on > 0 ? <g key={i} transform={`translate(${cx} ${cy - (1 - on) * 120})`} opacity={on}>
        <rect x={-62} y={-44} width={124} height={88} rx={8} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
        <Platano x={0} y={6} s={0.2} /></g> : null; })}
    <rect x={260} y={-300} width={110} height={190} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {[0, 1].map((k) => <rect key={k} x={278 + k * 42} y={-270} width={30} height={30} rx={4} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -440 -110 L 440 -110 L 380 40 L -400 40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-400} y={-60} width={790} height={20} fill={KC.paper} />
  </g>;
}
function Olas({ T, y, color = '#1677c9' }) {
  const pts = []; for (let x = -40; x <= KW + 40; x += 30) pts.push(`${x} ${y + Math.sin(x / 70 + T * 2) * 14}`);
  return <path d={`M ${pts.join(' L ')} L ${KW + 40} ${KH} L -40 ${KH} Z`} fill={color} stroke={KC.ink} strokeWidth={8} />;
}
/* ---------- el hongo al microscopio ---------- */
function Macroconidio({ x, y, s = 1, rot = 0, o = 1 }) {
  const P0 = [-150, 0], P1 = [150, 0], Co = [0, -110], Ci = [0, -30];
  const q = (t, C) => [(1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * C[0] + t * t * P1[0], (1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * C[1] + t * t * P1[1]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -150 0 Q 0 -110 150 0 Q 0 -30 -150 0 Z" fill={HONGO} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.26, 0.42, 0.58, 0.74].map((t, i) => { const a = q(t, Co), b = q(t, Ci); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#7d5fb8" strokeWidth={4} />; })}
  </g>;
}
function HongoMicro({ T, a, crece = 1 }) {
  const ramas = [
    [[-20, 1300], [180, 1180], [330, 1110], [520, 1060], [700, 980], [900, 940], [1100, 900]],
    [[330, 1110], [380, 960], [460, 860], [520, 760]],
    [[700, 980], [760, 1120], [860, 1200], [980, 1260]],
    [[180, 1180], [120, 1020], [90, 880]],
  ];
  const lin = (pts, p) => { const n = pts.length - 1, k = p * n, i = Math.floor(k), f = k - i, out = pts.slice(0, i + 1);
    if (i < n) out.push([klerp(pts[i][0], pts[i + 1][0], f), klerp(pts[i][1], pts[i + 1][1], f)]); return 'M ' + out.map((q) => q.join(' ')).join(' L '); };
  return <g>
    {ramas.map((pts, i) => { const p = kprog(T, a + i * 0.35, a + 1.6 + i * 0.35) * crece; const d = lin(pts, Math.max(p, 0.001));
      return <g key={i}><path d={d} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} stroke={HONGO} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} stroke="#b9a2e8" strokeWidth={4} fill="none" strokeDasharray="4 70" /></g>; })}
    {[[460, 860, -30], [520, 760, 10], [90, 880, -60], [900, 940, 20]].map(([x, y, r], i) => { const on = kprog(T, a + 1.4 + i * 0.25, a + 1.8 + i * 0.25, kEase.rebote);
      return on > 0 ? <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><line x1={0} y1={0} x2={0} y2={-40} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /><line x1={0} y1={0} x2={0} y2={-40} stroke={HONGO} strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={0} cy={-72 * on} rx={20 * on} ry={36 * on} fill={HONGO} stroke={KC.ink} strokeWidth={5} /></g> : null; })}
    <Macroconidio x={640} y={640} s={1} rot={-12 + Math.sin(T) * 3} o={kprog(T, a + 1.0, a + 1.5)} />
    <Macroconidio x={300} y={600} s={0.9} rot={18 + Math.sin(T * 1.2) * 3} o={kprog(T, a + 1.3, a + 1.8)} />
    {(() => { const on = kprog(T, a + 1.8, a + 2.3, kEase.rebote); return on > 0 ? <g transform={`translate(860 1200) scale(${on})`}>
      <circle r={44} fill="#d7c2ff" stroke={KC.ink} strokeWidth={14} /><circle r={30} fill="none" stroke="#7d5fb8" strokeWidth={5} /></g> : null; })()}
  </g>;
}
/* ---------- la raíz por dentro (xilema) ---------- */
function XilemaInterior({ T, r, a, b }) {
  const W = r * 2, inv = kprog(T, a, b, kEase.suave), tubos = [0.2, 0.4, 0.6, 0.8];
  return <svg width={W} height={W} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={W} height={W} fill="#10261a" />
    {tubos.map((u, i) => { const cx = W * u, w = W * 0.13, frente = W * (1 - inv * (0.75 + 0.1 * (i % 2)));
      const pared = mixHex('#9fe07a', XILEMA_CAFE, kclamp(inv * 1.3 - i * 0.08, 0, 1));
      return <g key={i}>
        <rect x={cx - w / 2} y={-10} width={w} height={W + 20} fill="rgba(140,220,255,.12)" stroke={pared} strokeWidth={8} />
        {Array.from({ length: 12 }, (_, k) => <line key={k} x1={cx - w / 2} x2={cx + w / 2} y1={k * W / 11} y2={k * W / 11 + 6} stroke={pared} strokeWidth={4} opacity=".7" />)}
        {Array.from({ length: 5 }, (_, k) => { const yy = ((W + 60) - ((T * 120 * (1 - inv * 0.9) + k * (W / 5) + i * 30) % (W + 60))) - 30; return yy < frente - 20 ? <circle key={'g' + k} cx={cx} cy={yy} r={10} fill="#5cc8ff" stroke={KC.ink} strokeWidth={3} /> : null; })}
        {inv > 0 && <path d={`M ${cx} ${W + 10} L ${cx + Math.sin(T * 3 + i) * 10} ${frente}`} stroke={HONGO} strokeWidth={14} strokeLinecap="round" />}
        {inv > 0 && <path d={`M ${cx - 12} ${W + 10} Q ${cx - 20} ${(W + frente) / 2} ${cx - 8} ${frente + 40}`} stroke="#c9b3f2" strokeWidth={8} fill="none" strokeLinecap="round" />}
      </g>; })}
  </svg>;
}
/* ---------- mapa de América (esquemático) ---------- */
const MXB_L = [[-117.1,32.5],[-116.6,31.7],[-116,30.4],[-115,29.5],[-114.2,28],[-114.1,27.6],[-112.1,24.8],[-111.6,24.3],[-110,22.9],[-109.4,23.2],[-110.3,24.2],[-111.4,25.8],[-112.4,27.2],[-112.9,28.5],[-114.6,30.2],[-114.8,31.6],[-114.8,32.5]];
const AM_K = 16, amP = (lon, lat) => [60 + (lon + 120) * AM_K, 470 + (33 - lat) * AM_K];
const SUDAM = [[-77.4,8.6],[-75.5,10.6],[-72,12.2],[-71.3,11.5],[-70,12.2],[-68,10.6],[-64,10.6],[-62,10.7],[-60,8.5],[-57,6],[-54,5.8],[-51.5,4.2],[-50,1.8],[-48.5,-1],[-44,-2.5],[-40,-2.8],[-35.2,-5.5],[-34.8,-7.5],[-35.5,-9.5],[-38.5,-13],[-39,-17.5],[-40.5,-21],[-43,-23],[-48,-25.8],[-48.6,-28.5],[-52,-32.5],[-54,-34.8],[-56.5,-36.4],[-57.5,-38.5],[-62,-39],[-65,-42.5],[-67.5,-46.5],[-68.5,-50.5],[-68.5,-54.8],[-73.5,-53],[-75.5,-46.5],[-73.6,-38],[-71.6,-33],[-71.4,-28],[-70.4,-23],[-70.2,-18.4],[-76,-14],[-77.6,-11.5],[-79.6,-7.5],[-81.2,-6],[-81.3,-4.3],[-80.1,-3.3],[-80.9,-1.9],[-80.1,0.8],[-79,1.6],[-77.8,3.2],[-77.4,4.5],[-77.6,6.8],[-77.4,8.6]];
const amPath = (pts) => 'M ' + pts.map(([a, b]) => amP(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function MapaAmerica({ T, a }) {
  const sitios = [
    { lon: -72.5, lat: 11.3, t: 0.8, txt: 'Colombia · 2019', lx: -20, ly: -34, anc: 'end' },
    { lon: -80.6, lat: -4.9, t: 2.0, txt: 'Perú · 2021', lx: -24, ly: 30, anc: 'end' },
    { lon: -67.6, lat: 10.2, t: 2.6, txt: 'Venezuela', lx: 10, ly: 56, anc: 'middle' },
    { lon: -79.9, lat: -3.4, t: 3.1, txt: 'Ecuador', lx: -24, ly: -22, anc: 'end' },
  ];
  const mx = amP(-96, 19.5), ok = kprog(T, a + 3.9, a + 4.4, kEase.rebote);
  return <g>
    {[MX_CONT, MXB_L, CA_CONT].map((p, i) => <path key={i} d={amPath(p)} fill={i < 2 ? '#bfe3b4' : '#ffe9a8'} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    <path d={amPath(SUDAM)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {sitios.map((s, i) => { const [x, y] = amP(s.lon, s.lat), on = kprog(T, a + s.t, a + s.t + 0.4, kEase.rebote), late = 1 + 0.3 * Math.max(0, Math.sin(T * 6 + i));
      return on > 0 ? <g key={i}>
        <circle cx={x} cy={y} r={30 * on * late} fill="rgba(255,59,47,.35)" />
        <circle cx={x} cy={y} r={13 * on} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
        <text x={x + s.lx} y={y + s.ly} textAnchor={s.anc} style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink} stroke={KC.paper} strokeWidth={9} paintOrder="stroke" opacity={on}>{s.txt}</text>
      </g> : null; })}
    {ok > 0 && <g transform={`translate(${mx[0]} ${mx[1]}) scale(${ok})`}>
      <circle r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M -20 0 L -6 16 L 22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={0} y={-62} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} stroke={KC.paper} strokeWidth={9} paintOrder="stroke">México</text>
    </g>}
  </g>;
}
// Caja de exportación.
function CajaExport({ x, y, s = 1, texto = 'EXPORTACIÓN', color = KC.cyan, gordo = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-220} y={-130} width={440} height={260} rx={14} fill={color} stroke={KC.ink} strokeWidth={9} />
    <path d="M -220 -60 L 220 -60" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-80} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    <Platano x={0} y={40} s={0.55} gordo={gordo} />
  </g>;
}
function Sello({ T, at, x, y, texto, sub, color = KC.red, rot = -10 }) {
  const e = kprog(T, at, at + 0.35, kEase.sale); if (e <= 0) return null;
  const sc = klerp(2.2, 1, e);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={e}>
    <rect x={-200} y={-70} width={400} height={140} rx={20} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={10} />
    <text x={0} y={-6} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={color}>{texto}</text>
    <text x={0} y={44} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{sub}</text>
  </g>;
}
// Célula del Cavendish por dentro con sus genes "casi apagados" (foquitos tenues).
function CelulaGenes({ T, x, y, r = 230, a }) {
  const enc = 0.25 + 0.08 * Math.sin(T * 3);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="rgba(47,224,168,.12)" stroke="#9ff5d4" strokeWidth={8} />
    <circle r={r * 0.6} fill="rgba(177,140,255,.18)" stroke="#d6c7ff" strokeWidth={6} />
    <g transform={`translate(${-r * 0.48} 0)`}><ADNHebra T={T} x={0} y={0} largo={r * 0.96} alto={50} vueltas={2.5} resalta={(u) => u > 0.35 && u < 0.62} /></g>
    {[[-30, -95], [60, 92]].map(([dx, dy], i) => <g key={i} transform={`translate(${dx} ${dy})`}>
      <circle r={40} fill={KC.gold2} opacity={enc * 0.6} />
      <path d="M -18 10 Q -26 -22 0 -30 Q 26 -22 18 10 Z" fill={mixHex('#5a5040', KC.gold2, enc)} stroke={KC.ink} strokeWidth={4} />
      <rect x={-12} y={10} width={24} height={14} rx={3} fill="#9aa3b5" stroke={KC.ink} strokeWidth={3} />
    </g>)}
  </g>;
}
function Dial({ T, x, y, r = 90, v = 0.1 }) {
  const ang = -180 + 180 * v + Math.sin(T * 5) * 2;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-r * 0.8} 0 A ${r * 0.8} ${r * 0.8} 0 0 1 ${r * 0.8} 0`} stroke={`url(#gradDial)`} strokeWidth={16} fill="none" />
    <defs><linearGradient id="gradDial"><stop offset="0" stopColor="#5a5040" /><stop offset="1" stopColor={KC.gold} /></linearGradient></defs>
    <line x1={0} y1={0} x2={Math.cos(ang * Math.PI / 180) * r * 0.75} y2={Math.sin(ang * Math.PI / 180) * r * 0.75} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
  </g>;
}

function Platano22() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cv: CUES.Cavendish, Se: CUES.Semillas, Hi: CUES.Hijuelo, Pr: CUES.Pregunta, Ho: CUES.Hongo, Ra: CUES.Raiz, GM: CUES.GrosMichel, Am: CUES.America, Es: CUES.Estudio, Ap: CUES.Aprobado, Cu: CUES.Curioso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, EsB = K.Es + 3.1, mitadSe = K.Se + 1.7;
  const sube = kprog(T, K.G, K.G + 0.5, kEase.sale);
  const domino = (i) => kprog(T, K.Pr + 1.0 + (4 - i) * 0.3, K.Pr + 2.0 + (4 - i) * 0.3);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu plátano y el de tu vecino */}
      <Escena T={T} a={K.G} b={K.Cv} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ManoPlatano T={T} x={300} y={1010} piel="#f1b48f" rot={6} sube={sube} seed={1} />
          <ManoPlatano T={T} x={790} y={1060} piel="#b5784f" rot={-6} sube={kprog(T, K.G + 0.1, K.G + 0.6, kEase.sale)} seed={4} />
          {(() => { const p = kprog(T, K.G + 0.7, K.G + 1.5, kEase.sale); return p > 0 && <path d="M 330 850 Q 545 700 760 900" stroke={KC.pink} strokeWidth={12} fill="none" strokeDasharray="30 18" strokeDashoffset={-T * 80} opacity={p} />; })()}
          <text x={300} y={1140} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.G + 0.5, K.G + 0.9)}>tú</text>
          <text x={790} y={1150} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.G + 0.6, K.G + 1.0)}>tu vecino</text>
        </SvgCapa>
      </Escena>
      {/* 1 · Cavendish: casi todo lo que se exporta */}
      <Escena T={T} a={K.Cv} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Barco T={T} x={540} y={1040} cajas={kprog(T, K.Cv + 0.3, K.Cv + 3.0)} />
          <Olas T={T} y={1090} />
          <Platano x={540} y={640} s={1.15} rot={Math.sin(T * 1.5) * 4} />
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: sin semillas útiles, 3 juegos de cromosomas */}
      <Escena T={T} a={K.Se} b={K.Hi} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Platano x={430} y={1120} s={0.9} rot={-4} />
          <CorteFruto x={860} y={860} r={110} silvestre T={T} />
          <text x={860} y={1020} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>silvestre:</text>
          <text x={860} y={1060} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>semillas duras</text>
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Se + 0.15} until={K.Hi - 0.35} x={400} y={800} r={250} fx={430} fy={1110} tinte={KC.yellow}
        etiqueta={T < mitadSe ? 'POR DENTRO · el plátano' : 'AL MICROSCOPIO · una célula'}
        interior={(t, r) => <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}>
          <rect width={r * 2} height={r * 2} fill="#1d2a1e" />
          <g opacity={1 - kprog(t, mitadSe - 0.2, mitadSe + 0.2)}><CorteFruto x={r} y={r} r={r * 0.75} T={t} /></g>
          <g opacity={kprog(t, mitadSe - 0.2, mitadSe + 0.2)}><CelulaTriploide T={t} x={r} y={r} r={r * 0.86} p={kprog(t, mitadSe, mitadSe + 1.4)} /></g>
        </svg>} />
      {/* 3 · no se siembra: hijuelos y cultivo de tejidos */}
      <Escena T={T} a={K.Hi} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Suelo y={1250} />
          <Mata T={T} x={300} y={1250} s={0.95} hijuelo={kprog(T, K.Hi, K.Hi + 1.4)} seed={2} />
          {(() => { const p = kprog(T, K.Hi + 1.5, K.Hi + 3.0, kEase.suave); return p > 0 && <Mata T={T} x={klerp(396, 780, p)} y={1250} s={klerp(0.34, 0.8, p)} racimo={p > 0.9} seed={2} />; })()}
          <g opacity={kprog(T, K.Hi + 2.2, K.Hi + 2.6)}><Frasco T={T} x={850} y={640} s={0.85} crece={kprog(T, K.Hi + 2.3, K.Hi + 3.6)} /></g>
        </SvgCapa>
      </Escena>
      {/* 4 · re-gancho: si cae uno, caen todos */}
      <Escena T={T} a={K.Pr} b={K.Ho} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Suelo y={1250} />
          {[0, 1, 2, 3, 4].map((i) => <Mata key={i} T={T} x={140 + i * 200} y={1250} s={0.46} amarillo={domino(i)} seed={2} />)}
          {T > K.Pr + 0.9 && <path d={`M 900 760 L ${klerp(900, 140, kprog(T, K.Pr + 1.0, K.Pr + 2.4))} 760`} stroke={KC.red} strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={T * 60} markerEnd="" />}
        </SvgCapa>
      </Escena>
      {/* 5 · el hongo al microscopio */}
      <Escena T={T} a={K.Ho} b={K.Ra} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2333 0%, ${KC.noche} 72%)` }}></div>
        <Ambiente T={T} n={30} color="rgba(233,217,255,.25)" />
        <SvgCapa><HongoMicro T={T} a={K.Ho - 0.3} /></SvgCapa>
      </Escena>
      {/* 6 · entra por la raíz, invade el xilema, la planta se marchita */}
      <Escena T={T} a={K.Ra} b={K.GM} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Suelo y={1150} />
          <Mata T={T} x={720} y={1150} s={0.92} amarillo={kprog(T, K.Ra + 1.2, K.Ra + 4.0)} seed={5} />
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Ra + 0.3} until={K.GM - 0.4} x={300} y={760} r={220} fx={690} fy={1230} tinte={HONGO}
        etiqueta="POR DENTRO · la raíz" interior={(t, r) => <XilemaInterior T={t} r={r} a={K.Ra + 0.7} b={K.Ra + 3.6} />} />
      {/* 7 · ya pasó: el Gros Michel */}
      <Escena T={T} a={K.GM} b={K.Am} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Platano x={540} y={760} s={1.2} gordo={1.25} rot={Math.sin(T * 1.3) * 3} />
          <CajaExport x={540} y={1130} s={1} texto="EXPORTACIÓN" gordo={1.25} rot={-kprog(T, K.GM + 2.2, K.GM + 2.8) * 6} />
          {(() => { const p = kprog(T, K.GM + 2.0, K.GM + 2.5, kEase.sale); return p > 0 && <g stroke={KC.red} strokeWidth={26} strokeLinecap="round">
            <line x1={330} y1={990} x2={klerp(330, 750, p)} y2={klerp(990, 1270, p)} /><line x1={750} y1={990} x2={klerp(750, 330, p)} y2={klerp(990, 1270, p)} /></g>; })()}
        </SvgCapa>
      </Escena>
      {/* 8 · TR4 llega a América; México sin registros */}
      <Escena T={T} a={K.Am} b={K.Es} zoom={0.03} origen="40% 40%">
        <div style={{ position:'absolute', inset:0, background:'#7fd3f0' }}></div>
        <SvgCapa><MapaAmerica T={T} a={K.Am} /></SvgCapa>
      </Escena>
      {/* 9a · el estudio: un gen de un plátano silvestre */}
      <Escena T={T} a={K.Es} b={EsB} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <CorteFruto x={210} y={920} r={100} silvestre T={T} />
          <text x={210} y={1065} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>silvestre</text>
          <circle cx={860} cy={920} r={115} fill="rgba(47,224,168,.3)" stroke={KC.ink} strokeWidth={8} />
          <circle cx={860} cy={920} r={62} fill="rgba(177,140,255,.4)" stroke={KC.ink} strokeWidth={5} />
          <text x={860} y={1080} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>célula de Cavendish</text>
          {(() => { const p = kprog(T, K.Es + 0.8, K.Es + 2.5, kEase.suave); const gx = klerp(250, 800, p), gy = 905 - Math.sin(p * Math.PI) * 60;
            return <g transform={`translate(${gx - 60} ${gy})`}><ADNHebra T={T} x={0} y={0} largo={120} alto={34} vueltas={1.5} colores={[KC.gold2, KC.gold]} /></g>; })()}
        </SvgCapa>
      </Escena>
      {/* 9b · la prueba de campo de 3 años */}
      <Escena T={T} a={EsB} b={K.Ap} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Suelo y={1150} />
          {[0, 1, 2, 3].map((i) => <Mata key={'c' + i} T={T} x={90 + i * 120} y={1150} s={0.36} racimo={false} amarillo={kprog(T, EsB + 0.8 + i * 0.4, EsB + 3.2 + i * 0.4)} seed={3 + i} />)}
          {[0, 1, 2, 3].map((i) => <Mata key={'m' + i} T={T} x={620 + i * 120} y={1150} s={0.36} racimo={false} brillo={kprog(T, EsB + 2.0, EsB + 3.0)} seed={7 + i} />)}
          <line x1={540} y1={760} x2={540} y2={1150} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" />
          <text x={270} y={810} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>Cavendish común</text>
          <text x={800} y={810} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>mejor línea con el gen</text>
          <text x={800} y={600} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.gold} stroke={KC.ink} strokeWidth={5} paintOrder="stroke" opacity={kprog(T, EsB + 0.5, EsB + 0.8)}>{'año ' + Math.min(3, 1 + Math.floor(kprog(T, EsB + 0.6, EsB + 3.6) * 3))}</text>
        </SvgCapa>
      </Escena>
      {/* 10 · 2024: otra línea con ese gen, aprobada */}
      <Escena T={T} a={K.Ap} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g transform={`translate(${klerp(900, 0, kprog(T, K.Ap, K.Ap + 0.8, kEase.sale))} 0)`}><CajaExport x={540} y={980} s={1.15} texto="QCAV-4" color={KC.mint} /></g>
          <Sello T={T} at={K.Ap + 1.4} x={320} y={700} texto="OGTR" sub="cultivo" color={KC.blue} rot={-10} />
          <Sello T={T} at={K.Ap + 2.2} x={770} y={720} texto="FSANZ" sub="alimento" color={KC.red} rot={8} />
        </SvgCapa>
      </Escena>
      {/* 11 · dato curioso: el Cavendish ya tiene genes así, casi apagados */}
      <Escena T={T} a={K.Cu} b={K.Ci} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 30% 45%, #1b2333 0%, ${KC.noche} 72%)` }}></div>
        <SvgCapa>
          <CelulaGenes T={T} x={290} y={760} r={215} a={K.Cu} />
          <Dial T={T} x={290} y={1085} r={80} v={0.1 * kprog(T, K.Cu + 0.6, K.Cu + 1.6, kEase.sale)} />
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: el mismo plátano, con un gen de defensa */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ManoPlatano T={T} x={300} y={1010} piel="#f1b48f" rot={6} seed={1} escudo={kprog(T, K.Ci + 1.2, K.Ci + 2.2, kEase.sale)} />
          <ManoPlatano T={T} x={790} y={1060} piel="#b5784f" rot={-6} seed={4} escudo={kprog(T, K.Ci + 1.5, K.Ci + 2.5, kEase.sale)} />
          <text x={300} y={1140} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>tú</text>
          <text x={790} y={1150} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>tu vecino</text>
        </SvgCapa>
      </Escena>

      {/* textos y etiquetas */}
      <Chip T={T} at={K.G + 1.5} until={K.Cv - 0.3} texto="= el mismo clon" y={1500} tam={52} borde={KC.pink} />
      <Etq T={T} at={K.Cv + 0.4} until={K.Se - 0.3} x={250} y={470} texto="Cavendish" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Cv + 0.8} until={K.Se - 0.3} x={250} y={520} texto="Musa acuminata (AAA)" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Cv + 1.4} until={K.Se - 0.3} texto="casi todo lo que se exporta" y={1500} tam={44} borde={KC.cyan} />
      <Chip T={T} at={K.Se + 0.6} until={mitadSe - 0.1} texto="sin semillas útiles" y={1500} tam={46} borde={KC.yellow} />
      <Chip T={T} at={mitadSe + 0.2} until={K.Hi - 0.3} texto="3 juegos de cromosomas = triploide" y={1500} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Hi + 0.4} until={K.Hi + 2.0} texto="un brote (hijuelo)" x={300} y={430} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Hi + 2.4} until={K.Pr - 0.3} texto="o cultivo de tejidos" x={740} y={360} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Hi + 1.6} until={K.Pr - 0.3} texto="copias de la misma planta" y={1500} tam={42} borde={KC.leaf} />
      <Chip T={T} at={K.Pr + 1.2} until={K.Ho - 0.3} texto="mismo clon = mismo riesgo" y={1500} tam={44} borde={KC.red} />
      <Etq T={T} at={K.Ho + 0.7} until={K.Ra - 0.3} x={1040} y={430} texto="Fusarium oxysporum f. sp. cubense" it lado="izq" tam={32} color={HONGO} />
      <Etq T={T} at={K.Ho + 1.0} until={K.Ra - 0.3} x={785} y={620} texto="macroconidio" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Ho + 1.6} until={K.Ra - 0.3} x={500} y={760} texto="microconidio" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ho + 2.0} until={K.Ra - 0.3} x={820} y={1200} texto="clamidospora" lado="izq" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Ho + 0.4} until={K.Ra - 0.3} texto="raza tropical 4 (TR4)" y={1500} tam={46} borde={HONGO} />
      <EscalaFija T={T} at={K.Ho + 0.4} until={K.Ra - 0.3} px={86} texto="10 µm (aprox.)" />
      <Chip T={T} at={K.Ra + 1.0} until={K.GM - 0.3} texto="invade el xilema: los tubos del agua" y={1500} tam={36} borde={HONGO} />
      <Chip T={T} at={K.Ra + 2.4} until={K.GM - 0.3} texto="la planta se marchita" x={380} y={420} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.GM + 0.4} until={K.Am - 0.3} texto="Gros Michel · raza 1" y={420} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.GM + 2.6} until={K.Am - 0.3} texto="mediados de los 50: la exportación cambia a Cavendish" y={1500} tam={30} borde={KC.pink} />
      <Chip T={T} at={K.Am + 4.0} until={K.Es - 0.3} texto="México: sin registros (SENASICA, feb 2026)" y={1500} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Am + 0.3} until={K.Am + 3.9} texto="TR4 en América" y={1500} tam={46} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={EsB - 0.3} anio="2012–2015" quien="Territorio del Norte, Australia" revista="Dale et al. · Nature Communications 2017" y={590} />
      <Etq T={T} at={K.Es + 1.2} until={EsB - 0.3} x={640} y={1010} texto="gen RGA2" lado="izq" it tam={36} color={KC.ink} />
            <Medidor T={T} at={EsB + 3.0} until={K.Ap - 0.3} valor={0} etiqueta="mejor línea · enfermas en 3 años" texto={() => '0 %'} y={1480} color={KC.leaf} />
      <Chip T={T} at={K.Ap + 0.6} until={K.Ap + 2.0} texto="otra línea, el mismo gen" y={430} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Ap + 2.6} until={K.Cu - 0.3} texto="Australia · febrero 2024" y={1500} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.Cu + 0.4} until={K.Ci - 0.3} x={60} y={470} texto="genes parecidos a RGA2" tam={32} color={KC.gold2} />
      <Chip T={T} at={K.Cu + 1.0} until={K.Ci - 0.3} texto="≈10 veces menos activos que en la mejor línea" y={1500} tam={30} borde={KC.gold2} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="clon + un gen de defensa" y={1500} tam={46} borde={KC.gold2} />
      <EscalaFija T={T} at={K.G + 0.6} until={K.Cv - 0.3} px={190} texto="10 cm (aprox.)" color={KC.ink} />
      <EscalaFija T={T} at={K.Hi + 0.3} until={K.Ho - 0.3} px={110} texto="1 m (aprox.)" color={KC.ink} />
      <EscalaFija T={T} at={K.Ci + 0.3} until={K.Ou - 0.1} px={190} texto="10 cm (aprox.)" color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cv - 0.1} texto="No es único: *es un clon.*" />
      <Subtitulo T={T} idx={1} at={K.Cv + 0.1} until={K.Se - 0.1} texto="Casi todo lo exportado: *Cavendish.*" />
      <Subtitulo T={T} idx={2} at={K.Se + 0.1} until={K.Hi - 0.1} texto="Tres juegos, *sin semillas útiles.*" />
      <Subtitulo T={T} idx={3} at={K.Hi + 0.1} until={K.Pr - 0.1} texto="Sale de un *brote* o un *pedacito.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Ho - 0.1} texto="Si cae uno, *caen todos.*" />
      <Subtitulo T={T} idx={5} at={K.Ho + 0.1} until={K.Ra - 0.1} texto="Un hongo: *Fusarium TR4.*" />
      <Subtitulo T={T} idx={6} at={K.Ra + 0.1} until={K.GM - 0.1} texto="Invade *los tubos del agua.*" />
      <Subtitulo T={T} idx={7} at={K.GM + 0.1} until={K.Am - 0.1} texto="Sacó al *Gros Michel* de la exportación." />
      <Subtitulo T={T} idx={8} at={K.Am + 0.1} until={K.Es - 0.1} texto="Llegó a América. *México, aún no.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Ap - 0.1} texto="Un gen silvestre: *tres años sana.*" />
      <Subtitulo T={T} idx={10} at={K.Ap + 0.1} until={K.Cu - 0.1} texto="2024: *aprobada en Australia.*" />
      <Subtitulo T={T} idx={11} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="Ya los tiene, *casi apagados.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Enseñarle a *reconocer al enemigo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Se + 0.3, K.Hi - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pr + 0.05, K.Ho + 0.6, 'avatar_07_pensativo_puno', 'izq-alto'],
        [K.Ra + 0.6, K.GM - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Am + 1.0, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [EsB + 1.6, K.Ap - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Cu + 0.1, K.Ci - 0.1, 'avatar_04_bajando_lentes', 'grande'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="22" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlatanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Platano22 /></CompositionStage></div>;
}
window.PlatanoApp = PlatanoApp;
