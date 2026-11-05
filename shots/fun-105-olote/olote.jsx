// Shot Fungi Mati #105 · Ese olote no es basura: es comida… para un hongo — NARRADO (N1 Por dentro + pasos del cultivo).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const OL = { cob:'#e8c39a', cob2:'#c9976a', hueco:'#a8714c', medula:'#f6e6c8', grano:'#f2c230', seta:'#ddd4c4', setaOsc:'#a99c87', piel:'#f1b48f', piel2:'#d98f6b', manga:'#2346ff', agua:'#59b8f0', bagazo:'#d8b26a', bagazo2:'#b48a45' };

// Olote (el corazón de la mazorca, ya sin granos). Centro en (x, y), horizontal. granos 0..1 = granos que se quedaron pegados.
function Olote({ x, y, s = 1, rot = 0, granos = 0, burbujas = 0, T = 0, seed = 2 }) {
  const L = 180, W = 50, g = krng(seed);
  const ancho = (u) => klerp(W * 0.92, W * 0.62, (u + L) / (2 * L));
  const celdas = [];
  for (let i = 0; i < 17; i++) {
    const u = -L + 26 + i * ((2 * L - 62) / 16), w = ancho(u);
    for (let j = -2; j <= 2; j++) { const yy = j * w * 0.36 + (i % 2) * w * 0.18 - w * 0.09; if (Math.abs(yy) > w * 0.86) continue;
      celdas.push({ u, yy, k: 1 - Math.abs(j) * 0.18, r: g() }); }
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${-L} ${-W * 0.92} Q ${-L + 10} ${-W * 1.05} ${-L + 40} ${-W * 0.95} L ${L - 40} ${-W * 0.66} Q ${L + 26} ${-W * 0.5} ${L + 4} 0 Q ${L + 26} ${W * 0.5} ${L - 40} ${W * 0.66} L ${-L + 40} ${W * 0.95} Q ${-L + 10} ${W * 1.05} ${-L} ${W * 0.92} Z`} fill={OL.cob} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {celdas.map((c, i) => <ellipse key={i} cx={c.u} cy={c.yy} rx={8.5} ry={6.2 * c.k} fill={OL.hueco} opacity={0.75} />)}
    {celdas.map((c, i) => c.r < granos ? <rect key={'g' + i} x={c.u - 9} y={c.yy - 8 * c.k} width={18} height={16 * c.k} rx={5} fill={OL.grano} stroke={KC.ink} strokeWidth={2.5} /> : null)}
    <path d={`M ${-L + 40} ${-W * 0.62} L ${L - 50} ${-W * 0.42}`} stroke="#fff" strokeWidth={7} opacity=".35" strokeLinecap="round" />
    <ellipse cx={-L} cy={0} rx={16} ry={W * 0.9} fill={OL.medula} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-L} cy={0} rx={7} ry={W * 0.45} fill={OL.cob2} />
    {burbujas > 0 && Array.from({ length: 9 }, (_, k) => { const u = ((T * 0.5 + k / 9) % 1); return <circle key={'b' + k} cx={-L + 30 + k * 40 + Math.sin(T * 3 + k) * 6} cy={-W - u * 90} r={5 + (k % 3) * 3} fill="none" stroke="#fff" strokeWidth={3.5} opacity={burbujas * Math.sin(Math.PI * u)} />; })}
  </g>;
}
// Mano que sostiene algo (los dedos se dibujan encima: usar <Mano dedos/> después del objeto). (x, y) = centro de la palma.
function Mano({ x, y, rot = 0, s = 1, dedos = false }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {!dedos && <>
      <path d="M -60 40 L -260 260 L -170 330 L 10 90 Z" fill={OL.manga} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={0} cy={20} rx={70} ry={62} fill={OL.piel} stroke={KC.ink} strokeWidth={7} />
    </>}
    {dedos && <>
      {[-36, -8, 20, 46].map((dx, i) => <rect key={i} x={dx - 14} y={-40 + Math.abs(i - 1.5) * 6} width={28} height={70} rx={14} fill={OL.piel} stroke={KC.ink} strokeWidth={6} />)}
      <path d="M 50 40 Q 96 20 92 -14" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M 50 40 Q 96 20 92 -14" stroke={OL.piel} strokeWidth={22} fill="none" strokeLinecap="round" />
    </>}
  </g>;
}
// Bote de basura. Base en (x, y).
function Bote({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 L -130 -290 L 130 -290 L 110 0 Z" fill="#7d8a96" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-70, -25, 25, 70].map((dx) => <line key={dx} x1={dx * 0.92} y1={-30} x2={dx} y2={-260} stroke="#5d6873" strokeWidth={8} strokeLinecap="round" />)}
    <rect x={-146} y={-318} width={292} height={36} rx={14} fill="#95a2ad" stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -150 L -20 -130 L 20 -170" stroke="#fff" strokeWidth={0} />
  </g>;
}
// Báscula de platos. tilt en grados (positivo = baja el plato izquierdo).
function Balanza({ x, y, tilt = 0, izq, der }) {
  const a = (tilt * Math.PI) / 180, L = 300;
  const pl = [x - L * Math.cos(a), y + L * Math.sin(a)], pr = [x + L * Math.cos(a), y - L * Math.sin(a)];
  const plato = ([px, py], hijo, k) => <g key={k}>
    <line x1={px} y1={py} x2={px - 100} y2={py + 150} stroke={KC.ink} strokeWidth={5} /><line x1={px} y1={py} x2={px + 100} y2={py + 150} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${px - 130} ${py + 150} Q ${px} ${py + 215} ${px + 130} ${py + 150} Z`} fill="#c9d3dc" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g transform={`translate(${px} ${py + 150})`}>{hijo}</g>
  </g>;
  return <g>
    <rect x={x - 16} y={y} width={32} height={330} fill="#8a96a1" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${x - 150} ${y + 360} L ${x + 150} ${y + 360} L ${x + 110} ${y + 320} L ${x - 110} ${y + 320} Z`} fill="#8a96a1" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke="#b9c4ce" strokeWidth={10} strokeLinecap="round" />
    <circle cx={x} cy={y} r={20} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    {plato(pl, izq, 'i')}{plato(pr, der, 'd')}
  </g>;
}
// Cubeta con agua y olotes enteros flotando. Base en (x, y).
function Cubeta({ x, y, T = 0, olotes = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -170 -260 L -140 0 L 140 0 L 170 -260 Z" fill="#3b7dd8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-232} rx={160} ry={26} fill={OL.agua} stroke={KC.ink} strokeWidth={5} />
    {[[-70, -236, -8, 0.4], [40, -246, 10, 0.42], [-10, -226, 3, 0.4]].map(([a, b, r, s], i) => <g key={i} opacity={kclamp(olotes * 3 - i, 0, 1)}>
      <Olote x={a} y={b + Math.sin(T * 2 + i) * 4 - (1 - kclamp(olotes * 3 - i, 0, 1)) * 120} s={s} rot={r + Math.sin(T * 1.5 + i) * 3} seed={i + 3} /></g>)}
    <path d="M -160 -232 Q -80 -220 0 -232 Q 80 -244 160 -232 L 168 -222 Q 80 -214 0 -222 Q -80 -232 -168 -222 Z" fill={OL.agua} opacity=".7" />
    <path d="M -168 -260 Q 0 -390 168 -260" stroke={KC.ink} strokeWidth={7} fill="none" />
  </g>;
}
// Olla con agua caliente (burbujas y vapor). Base en (x, y). calor 0..1.
function Olla({ x, y, T = 0, calor = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    {calor > 0 && [-60, 0, 60].map((dx, i) => { const u = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${dx} ${-250 - u * 160} q 24 -30 0 -60 q -24 -30 0 -60`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={calor * 0.75 * Math.sin(Math.PI * u)} />; })}
    <rect x={-180} y={-250} width={360} height={250} rx={30} fill="#5d6873" stroke={KC.ink} strokeWidth={8} />
    <rect x={-215} y={-230} width={40} height={26} rx={10} fill="#3e464e" stroke={KC.ink} strokeWidth={6} />
    <rect x={175} y={-230} width={40} height={26} rx={10} fill="#3e464e" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-248} rx={176} ry={24} fill={OL.agua} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, k) => { const u = ((T * 1.4 + k / 8) % 1); return <circle key={k} cx={-130 + k * 37} cy={-248 + Math.sin(k) * 8} r={4 + u * 9} fill="none" stroke="#fff" strokeWidth={3} opacity={calor * (1 - u)} />; })}
    {[-30, 40].map((dx, i) => <g key={i} transform={`translate(${dx} ${-252}) rotate(${-20 + i * 30})`}><Olote x={0} y={0} s={0.42} seed={7 + i} /></g>)}
    <rect x={-150} y={-120} width={300} height={22} rx={11} fill="#7d8a96" opacity=".6" />
  </g>;
}
// Frasco de "semilla": granos de trigo cubiertos de micelio blanco. Base en (x, y).
function FrascoGrano({ x, y, rot = 0, s = 1, T = 0, seed = 4 }) {
  const g = krng(seed), gr = Array.from({ length: 46 }, () => ({ x: (g() - 0.5) * 150, y: -10 - g() * 210, a: g() * 180 }));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-95} y={-250} width={190} height={250} rx={26} fill="rgba(220,240,255,.35)" stroke={KC.ink} strokeWidth={7} />
    {gr.map((q, i) => <ellipse key={i} cx={q.x} cy={q.y} rx={13} ry={7} transform={`rotate(${q.a} ${q.x} ${q.y})`} fill="#d9b56a" stroke="#8a6a2c" strokeWidth={2} />)}
    {gr.map((q, i) => i % 2 ? <circle key={'m' + i} cx={q.x + 6} cy={q.y - 4} r={12} fill="#fbf7ee" opacity=".8" /> : null)}
    <rect x={-70} y={-280} width={140} height={36} rx={10} fill="rgba(220,240,255,.45)" stroke={KC.ink} strokeWidth={7} />
    <path d="M -70 -230 L -66 -30" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".4" />
  </g>;
}
// Grano de semilla suelto (con su pelusa de micelio).
function GranoSemilla({ x, y, a = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <ellipse rx={14} ry={8} fill="#d9b56a" stroke="#8a6a2c" strokeWidth={2} /><circle cx={6} cy={-4} r={11} fill="#fbf7ee" opacity=".85" />
  </g>;
}
// Bandeja con olotes remojados. Base en (x, y).
function Bandeja({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    {[[-80, -60, -6], [60, -64, 8], [-10, -98, 2], [110, -102, -10]].map(([a, b, r], i) => <Olote key={i} x={a} y={b} s={0.5} rot={r} seed={10 + i} />)}
    <path d="M -230 -70 L -200 0 L 200 0 L 230 -70 Z" fill="#8fa3b3" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Interior de la Lupa (POR DENTRO): fibras del olote y hifas tabicadas que sueltan enzimas. Cuadro de 2r × 2r.
function MicroFibra({ T, r, g = 1, corte = 0 }) {
  const S = 2 * r, k = S / 640;
  const fibras = [0, 1, 2].map((i) => ({ y0: 150 + i * 175, y1: 70 + i * 175 }));
  const hifas = [
    [[-20, 600], [120, 520], [250, 470], [360, 380], [470, 330]],
    [[-20, 600], [90, 430], [140, 290], [230, 170]],
    [[-20, 600], [220, 600], [380, 560], [560, 520]],
  ];
  const tramo = (pts, p) => { const Ls = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); Ls.push(d); tot += d; }
    let rest = tot * p; const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { if (rest >= Ls[i - 1]) { out.push(pts[i]); rest -= Ls[i - 1]; } else { const u = rest / Ls[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break; } } return out; };
  const puntas = [];
  return <svg width={S} height={S} viewBox="0 0 640 640" style={{ position:'absolute', left:0, top:0 }}>
    <rect width={640} height={640} fill="#120d0a" />
    {fibras.map((f, i) => Array.from({ length: 7 }, (_, j) => { // cada fibra se parte en pedazos que se separan y se encogen
      const nT = 6, piezas = [];
      for (let t = 0; t < nT; t++) { const u0 = t / nT, u1 = (t + 1) / nT, sep = corte * 26, enc = 1 - corte * 0.55 * ((t + i + j) % 3 === 0 ? 1 : 0.4);
        const xa = -40 + u0 * 720 + sep * t * 0.3, xb = -40 + u1 * 720 - sep + sep * t * 0.3, ya = klerp(f.y0, f.y1, u0) + (j - 3) * 9, yb = klerp(f.y0, f.y1, u1) + (j - 3) * 9;
        const cx = (xa + xb) / 2, cy = (ya + yb) / 2;
        piezas.push(<line key={t} x1={klerp(cx, xa, enc)} y1={klerp(cy, ya, enc)} x2={klerp(cx, xb, enc)} y2={klerp(cy, yb, enc)} stroke={j % 2 ? '#c98a3e' : '#a86d2c'} strokeWidth={8} strokeLinecap="round" opacity={0.95 - corte * 0.35 * ((t + j) % 2)} />); }
      return <g key={i + '-' + j}>{piezas}</g>; }))}
    {hifas.map((h, i) => { const p = kclamp(g * 1.3 - i * 0.15, 0, 1); if (p <= 0) return null; const pts = tramo(h, p), d = 'M' + pts.map((q) => q.join(' ')).join(' L '), tip = pts[pts.length - 1];
      puntas.push(tip);
      return <g key={i}>
        <path d={d} fill="none" stroke="rgba(47,224,168,.25)" strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke="#eafff7" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
        {pts.slice(1).map((q, m) => { const a = pts[m], an = Math.atan2(q[1] - a[1], q[0] - a[0]), n = Math.floor(Math.hypot(q[0] - a[0], q[1] - a[1]) / 70);
          return Array.from({ length: n }, (_, z) => { const u = (z + 0.5) / n, mx = klerp(a[0], q[0], u), my = klerp(a[1], q[1], u);
            return <line key={m + '-' + z} x1={mx - Math.sin(an) * 11} y1={my + Math.cos(an) * 11} x2={mx + Math.sin(an) * 11} y2={my - Math.cos(an) * 11} stroke="#6f9f92" strokeWidth={4} />; }); })}
        <circle cx={tip[0]} cy={tip[1]} r={14} fill="#fff" opacity={0.55 + 0.45 * Math.sin(T * 5 + i)} />
      </g>; })}
    {corte > 0 && puntas.map((tp, i) => Array.from({ length: 12 }, (_, z) => { const u = ((T * 0.7 + z / 12) % 1), ang = (z / 12) * Math.PI * 2 + i, d = 30 + u * 150;
      return <circle key={i + '.' + z} cx={tp[0] + Math.cos(ang) * d} cy={tp[1] + Math.sin(ang) * d * 0.8} r={z % 2 ? 8 : 10} fill={z % 2 ? KC.pink : KC.yellow} stroke={KC.ink} strokeWidth={2} opacity={kclamp(corte * 2, 0, 1) * Math.sin(Math.PI * u)} />; }))}
    <text x={125} y={105} style={{ font:`700 26px ${KF.mono}` }} fill="#f4c25a" stroke="#120d0a" strokeWidth={6} paintOrder="stroke">fibra: lignina + celulosa</text>
    <text x={140} y={145} style={{ font:`700 26px ${KF.mono}` }} opacity={kclamp(corte * 3, 0, 1)} stroke="#120d0a" strokeWidth={6} paintOrder="stroke"><tspan fill={KC.yellow}>● lacasas</tspan><tspan fill={KC.pink}> ● peroxidasas</tspan></text>
    <text x={215} y={600} style={{ font:`700 26px ${KF.mono}` }} fill="#eafff7" stroke="#120d0a" strokeWidth={6} paintOrder="stroke" opacity={kclamp(g * 2, 0, 1)}>hifa tabicada</text>
  </svg>;
}
// Racimo de setas Pleurotus color gris-crema: repisas en abanico que salen del mismo punto hacia un lado (lado 1 = derecha, -1 = izquierda).
function RacimoSeta({ T, x, y, s = 1, abre = 1, n = 6, seed = 3, lado = 1 }) {
  if (abre <= 0) return null;
  const g = krng(seed), hs = Array.from({ length: n }, (_, i) => ({ r: -38 + (i / Math.max(1, n - 1)) * 62 + (g() - 0.5) * 10, k: 0.65 + g() * 0.45, d: (i % 3) * 0.1, dy: (i - (n - 1) / 2) * 10 }));
  hs.sort((a, b) => a.k - b.k);
  return <g transform={`translate(${x} ${y}) scale(${lado} 1)`}>{hs.map((h, i) =>
    <SetaOstra key={i} y={h.dy} s={s * h.k} rot={h.r + mece(T, seed + i, 0.2) * 3} abre={kclamp(abre * 1.25 - h.d, 0, 1)} color={OL.seta} oscuro={OL.setaOsc} pie={0.7} />)}</g>;
}
// Corte en X sobre la bolsa.
function CorteX({ x, y, p = 1 }) {
  return <g opacity={p}><path d={`M ${x - 22} ${y - 22} L ${x + 22} ${y + 22} M ${x + 22} ${y - 22} L ${x - 22} ${y + 22}`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" /></g>;
}
// Manojo de paja (cebada).
function Paja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1={-90 + i * 4} y1={30 - (i % 3) * 4} x2={90 - i * 2} y2={-30 + (i % 4) * 5} stroke={i % 2 ? '#f2d16b' : '#d9b043'} strokeWidth={9} strokeLinecap="round" />)}
    <rect x={-12} y={-30} width={24} height={60} rx={6} fill="#b5442c" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Paloma({ x, y, s = 1, ok = true, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <circle r={50} fill={ok ? '#118a3a' : KC.red} stroke={KC.ink} strokeWidth={6} />
    {ok ? <path d="M -24 0 L -6 18 L 26 -18" stroke="#fff" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -20 -20 L 20 20 M 20 -20 L -20 20" stroke="#fff" strokeWidth={11} strokeLinecap="round" />}
  </g>;
}
// Bloque de sustrato agotado (ya cosechado).
function Bloque({ x, y, T = 0, seed = 9 }) {
  const g = krng(seed), pz = Array.from({ length: 40 }, () => ({ x: (g() - 0.5) * 240, y: -g() * 320, r: 10 + g() * 22 }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-140} y={-340} width={280} height={340} rx={40} fill="#cbb08a" stroke={KC.ink} strokeWidth={8} />
    {pz.map((q, i) => <circle key={i} cx={q.x} cy={q.y - 10} r={q.r} fill={i % 3 ? '#e9dfcc' : '#a8865a'} opacity=".8" />)}
    <rect x={-140} y={-340} width={280} height={340} rx={40} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Maceta({ x, y, T = 0, crece = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    {crece > 0 && <g transform={`scale(${crece})`}>
      <path d={`M 0 -150 Q ${-6 + mece(T, 3) * 6} -230 0 -300`} stroke="#2e8b3a" strokeWidth={10} fill="none" />
      <path d="M 0 -230 Q -80 -270 -100 -220 Q -50 -200 0 -230 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
      <path d="M 0 -270 Q 80 -320 100 -260 Q 50 -240 0 -270 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
    </g>}
    <path d="M -110 -160 L -85 0 L 85 0 L 110 -160 Z" fill="#c8643b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-124} y={-180} width={248} height={36} rx={10} fill="#d9774c" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-170} rx={100} ry={12} fill="#5b3a22" />
  </g>;
}
// Vaca esquemática, de perfil, mirando a la izquierda. Patas en y.
function Vaca({ x, y, T = 0, s = 1 }) {
  const mast = Math.sin(T * 9) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-90, -40, 60, 110].map((dx) => <rect key={dx} x={dx - 14} y={-110} width={28} height={110} rx={10} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-130} y={-260} width={280} height={170} rx={60} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -250 Q 0 -220 -20 -170 Q -70 -160 -80 -210 Z" fill={KC.ink} />
    <path d="M 70 -240 Q 120 -230 110 -170 Q 70 -160 60 -200 Z" fill={KC.ink} />
    <path d="M 150 -230 Q 190 -200 170 -150" stroke={KC.ink} strokeWidth={7} fill="none" />
    <g transform={`translate(-160 ${-190 + mast})`}>
      <rect x={-70} y={-50} width={110} height={100} rx={36} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
      <rect x={-80} y={10} width={70} height={46} rx={20} fill="#f2a5b5" stroke={KC.ink} strokeWidth={6} />
      <circle cx={-30} cy={-12} r={8} fill={KC.ink} />
      <path d="M 20 -50 L 40 -80 M -40 -50 L -50 -80" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    </g>
  </g>;
}
// Montaña de bagazo de agave (fibras). Base en (x, y).
function Bagazo({ x, y, T = 0, crece = 1, seed = 6 }) {
  const g = krng(seed), fb = Array.from({ length: 70 }, () => { const u = g(), v = g(); return { x: (u - 0.5) * 400 * (1 - v * 0.6), y: -v * 280 * crece, a: g() * 180, l: 30 + g() * 40 }; });
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -220 0 Q -120 ${-300 * crece} 0 ${-310 * crece} Q 120 ${-300 * crece} 220 0 Z`} fill={OL.bagazo2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {fb.map((f, i) => <line key={i} x1={f.x - f.l / 2 * Math.cos(f.a)} y1={f.y - f.l / 2 * Math.sin(f.a)} x2={f.x + f.l / 2 * Math.cos(f.a)} y2={f.y + f.l / 2 * Math.sin(f.a)} stroke={i % 2 ? OL.bagazo : '#f0d79a'} strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}
// Plato con setas.
function Plato({ x, y, T = 0, abre = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <RacimoSeta T={T} x={-70} y={-24} s={0.62} abre={abre} n={6} seed={8} />
    <ellipse cx={0} cy={0} rx={170} ry={40} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-4} rx={110} ry={22} fill="#eef1f4" />
  </g>;
}
// Foco (luz que se apaga).
function Foco({ x, y, on = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    {on > 0 && <circle r={90} fill={KC.yellow} opacity={0.35 * on} />}
    <circle r={46} fill={mixHex('#55606b', KC.yellow, on)} stroke={KC.ink} strokeWidth={6} />
    <rect x={-22} y={40} width={44} height={36} rx={6} fill="#8a96a1" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink }) {
  if (p <= 0) return null;
  const xe = klerp(x1, x2, p), ye = klerp(y1, y2, p), an = Math.atan2(y2 - y1, x2 - x1);
  return <g>
    <line x1={x1} y1={y1} x2={xe} y2={ye} stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray="22 16" />
    <path d={`M ${xe + Math.cos(an) * 26} ${ye + Math.sin(an) * 26} L ${xe + Math.cos(an + 2.5) * 30} ${ye + Math.sin(an + 2.5) * 30} L ${xe + Math.cos(an - 2.5) * 30} ${ye + Math.sin(an - 2.5) * 30} Z`} fill={color} />
  </g>;
}
const txt = (x, y, t, tam = 30, color = KC.ink, anchor = 'middle', o = 1, w = 700, f = KF.mono, it = false) =>
  <text x={x} y={y} textAnchor={anchor} opacity={o} style={{ font:`${it ? 'italic ' : ''}${w} ${tam}px ${f}` }} fill={color}>{t}</text>;

function OloteShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Numero, Pr: CUES.Preparar, Se: CUES.Semilla, Os: CUES.Oscuro, En: CUES.Enzimas, P: CUES.Pregunta, Fr: CUES.Fruto, E: CUES.Estudio, Ro: CUES.Robert, So: CUES.Sobra, Fu: CUES.Futuro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la mano avienta el olote hacia el bote; se frena en el aire y regresa al centro
  const lanza = kprog(T, K.G + 0.1, K.G + 0.85, kEase.sale), frena = kprog(T, K.G + 1.0, K.G + 2.0, kEase.suave);
  const oX = klerp(klerp(330, 700, lanza), 470, frena), oY = klerp(klerp(860, 760, lanza) - Math.sin(lanza * Math.PI) * 160, 820, frena);
  const oR = klerp(-10 + lanza * 520, 0, frena) + (frena > 0 ? Math.sin(T * 3) * 4 : 0);
  const manoRot = klerp(-20, 30, kprog(T, K.G, K.G + 0.35, kEase.sale)) - 30 * kprog(T, K.G + 0.35, K.G + 1.2);
  // semilla: el frasco se inclina y caen granos
  const inclina = kprog(T, K.Se + 0.3, K.Se + 1.1, kEase.sale);
  const nGr = 18;
  const col = kprog(T, K.Os + 0.5, K.Os + 3.4, kEase.suave);
  const BOLSA = { x: 330, y: 940 };
  const CORTES = [[-110, -150, -1], [110, -30, 1], [-90, 150, -1]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bote x={830} y={1200} />
          {txt(830, 1060, 'BASURA', 40, '#fff', 'middle', 1, 400, KF.titulo)}
          {frena > 0 && <circle cx={oX} cy={oY} r={240 * frena} fill="#fff" opacity={0.35 * frena} />}
          <Mano x={260} y={900} rot={manoRot} />
          <Olote x={oX} y={oY} s={1.05} rot={oR} />
          {lanza <= 0 && <Mano x={260} y={900} rot={manoRot} dedos />}
        </>)}
      </Escena>
      {/* 2 · el número: 1 kg de olote seco → 850 g de setas frescas */}
      <Escena T={T} a={K.N} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Balanza x={540} y={700} tilt={klerp(10, 4, kprog(T, K.N + 1.4, K.N + 3.2, kEase.suave))}
            izq={<g>{[[-60, -30, -8], [50, -34, 6], [0, -70, 2]].map(([a, b, r], i) => <Olote key={i} x={a} y={b} s={0.36} rot={r} seed={20 + i} />)}</g>}
            der={<RacimoSeta T={T} x={-80} y={-20} s={0.75} abre={kprog(T, K.N + 1.2, K.N + 3.2)} n={7} seed={5} />} />
          {txt(250, 1090, '1 kg de olote', 34, KC.ink)}{txt(250, 1130, 'SECO', 34, KC.red, 'middle', 1, 900, KF.texto)}
          {txt(830, 1090, '850 g de setas', 34, KC.ink, 'middle', kprog(T, K.N + 2.2, K.N + 2.6))}{txt(830, 1130, 'FRESCAS', 34, '#118a3a', 'middle', kprog(T, K.N + 2.2, K.N + 2.6), 900, KF.texto)}
        </>)}
      </Escena>
      {/* 3 · remojar y pasteurizar */}
      <Escena T={T} a={K.Pr} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cubeta x={210} y={1060} T={T} olotes={kprog(T, K.Pr + 0.1, K.Pr + 0.9)} />
          {txt(210, 1110, '1 · remojo (48 h)', 30)}
          <g opacity={kprog(T, K.Pr + 1.2, K.Pr + 1.6)}><g transform="translate(585 1060) scale(.9) translate(-585 -1060)"><Olla x={585} y={1060} T={T} calor={kprog(T, K.Pr + 1.5, K.Pr + 2.6)} /></g>
            {txt(585, 1110, '2 · pasteurizar', 30)}</g>
          <Flecha x1={375} y1={880} x2={420} y2={880} p={kprog(T, K.Pr + 1.0, K.Pr + 1.4)} />
        </>)}
        {T > K.Pr + 1.3 && <div style={{ opacity:kprog(T, K.Pr + 1.3, K.Pr + 1.7) }}><Termometro x={845} y={560} alto={420} valor={klerp(20, 70, kprog(T, K.Pr + 1.6, K.Pr + 2.8, kEase.sale))} max={100} rango={[68, 72]} marcas={[0, 70, 100]} /></div>}
      </Escena>
      {/* 4 · sembrar la semilla */}
      <Escena T={T} a={K.Se} b={K.Os} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Bandeja x={600} y={1150} />
          <FrascoGrano x={330} y={880} rot={-inclina * 115} T={T} />
          {Array.from({ length: nGr }, (_, i) => { const t0 = K.Se + 0.9 + i * 0.08, u = kprog(T, t0, t0 + 0.6); if (u <= 0) return null;
            const sx = 330 + Math.cos(-inclina * 2) * 0 + 220, sy = 760, ex = 470 + (i * 37) % 260, ey = 1040 + (i * 13) % 40;
            return <GranoSemilla key={i} x={klerp(sx, ex, u)} y={klerp(sy, ey, u * u)} a={i * 40 + u * 200} s={1.1} />; })}
        </>)}
      </Escena>
      {/* 5 · a oscuras, la bolsa se coloniza */}
      <Escena T={T} a={K.Os} b={K.En} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#2b3f63', KC.noche, kprog(T, K.Os + 0.2, K.Os + 0.6)) }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <BolsaCultivo T={T} x={540} y={900} w={380} h={560} col={col} />
          <Foco x={170} y={460} on={1 - kprog(T, K.Os + 0.2, K.Os + 0.35)} />
        </>)}
      </Escena>
      {/* 6 · por dentro: hifas y enzimas que desarman la fibra */}
      <Escena T={T} a={K.En} b={K.P} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        {fsvg(<BolsaCultivo T={T} x={170} y={1010} w={200} h={290} col={1} />)}
        <Lupa T={T} at={K.En + 0.1} until={K.P - 0.2} x={610} y={770} r={320} fx={200} fy={980} tinte={KC.mint} etiqueta="POR DENTRO · HIFAS Y FIBRA"
          interior={(t, r) => <MicroFibra T={t} r={r} g={kprog(t, K.En + 0.2, K.En + 2.2)} corte={kprog(t, K.En + 2.0, K.En + 4.4)} />} />
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Fr} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><BolsaCultivo T={T} x={280} y={1000} w={360} h={520} col={1} /><Interrogacion T={T} x={300} y={760} tam={340} /></>)}
      </Escena>
      {/* 8 · aire, luz y humedad: brotan los racimos */}
      <Escena T={T} a={K.Fr} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {[0, 1, 2, 3].map((i) => { const u = ((T * 0.8 + i / 4) % 1); return <path key={i} d={`M ${1000 - u * 380} ${560 + i * 90} q 40 -20 80 0 q 40 20 80 0`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={kprog(T, K.Fr + 0.4, K.Fr + 0.8) * Math.sin(Math.PI * u)} />; })}
          <BolsaCultivo T={T} x={BOLSA.x} y={BOLSA.y} w={420} h={620} col={1} />
          {CORTES.map(([dx, dy, l], i) => <CorteX key={i} x={BOLSA.x + dx} y={BOLSA.y + dy} p={kprog(T, K.Fr + 0.1 + i * 0.15, K.Fr + 0.3 + i * 0.15)} />)}
          {CORTES.map(([dx, dy, l], i) => <RacimoSeta key={'r' + i} T={T} lado={l} x={BOLSA.x + dx} y={BOLSA.y + dy} s={0.62} abre={kprog(T, K.Fr + 1.2 + i * 0.35, K.Fr + 3.2 + i * 0.3)} n={6} seed={11 + i} />)}
        </>)}
      </Escena>
      {/* 9 · el estudio de Hidalgo */}
      <Escena T={T} a={K.E} b={K.Ro} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.E + 2.8, K.E + 4.0, kEase.sale), B = 1060; return <>
            <line x1={120} y1={B} x2={960} y2={B} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.E + 2.6, K.E + 2.9)} />
            <rect x={210} y={B - 425 * u} width={240} height={425 * u} rx={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
            <rect x={630} y={B - 325 * u} width={240} height={325 * u} rx={10} fill="#7fd3f0" stroke={KC.ink} strokeWidth={7} />
            {u > 0.6 && <>{txt(330, B - 425 * u - 22, '85 %', 60, KC.ink, 'middle', kprog(T, K.E + 3.5, K.E + 3.9), 400, KF.titulo)}{txt(750, B - 325 * u - 22, '65 %', 60, KC.ink, 'middle', kprog(T, K.E + 3.5, K.E + 3.9), 400, KF.titulo)}</>}
            {u > 0.3 && <><Olote x={330} y={B - 70} s={0.5} rot={-4} seed={31} /><Paja x={750} y={B - 70} s={1.2} /></>}
            {txt(330, B + 44, 'olote', 32, KC.ink, 'middle', kprog(T, K.E + 2.9, K.E + 3.2))}
            {txt(750, B + 44, 'paja de cebada', 32, KC.ink, 'middle', kprog(T, K.E + 2.9, K.E + 3.2))}
            {txt(330, 520, 'eficiencia biológica', 30, KC.ink, 'middle', kprog(T, K.E + 3.0, K.E + 3.4))}
          </>; })()}
        </>)}
      </Escena>
      {/* 10 · lo que probó Robert */}
      <Escena T={T} a={K.Ro} b={K.So} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Olote x={270} y={1000} s={0.85} rot={-12} granos={0.55} burbujas={kprog(T, K.Ro + 0.8, K.Ro + 1.4)} T={T} seed={41} />
          <Paloma x={270} y={830} ok={false} p={kprog(T, K.Ro + 1.6, K.Ro + 2.0)} />
          {txt(270, 1110, 'mal desgranado:', 28, KC.ink, 'middle', kprog(T, K.Ro + 1.6, K.Ro + 2.0))}
          {txt(270, 1146, 'fermenta', 30, KC.red, 'middle', kprog(T, K.Ro + 1.6, K.Ro + 2.0), 900, KF.texto)}
          <Olote x={790} y={1020} s={0.85} rot={8} seed={42} />
          <RacimoSeta T={T} x={700} y={990} s={1.0} abre={kprog(T, K.Ro + 2.6, K.Ro + 4.0)} n={7} seed={17} />
          <Paloma x={950} y={1140} ok p={kprog(T, K.Ro + 3.6, K.Ro + 4.0)} />
          {txt(760, 1146, 'setas enormes', 30, KC.ink, 'middle', kprog(T, K.Ro + 3.6, K.Ro + 4.0), 900, KF.texto)}
        </>)}
      </Escena>
      {/* 11 · lo que sobra: composta o alimento */}
      <Escena T={T} a={K.So} b={K.Fu} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Bloque x={540} y={860} T={T} />
          {txt(540, 495, 'sustrato agotado', 32, KC.ink, 'middle', 1, 900, KF.texto)}
          <Flecha x1={430} y1={880} x2={300} y2={960} p={kprog(T, K.So + 0.8, K.So + 1.2)} />
          <Flecha x1={650} y1={880} x2={780} y2={960} p={kprog(T, K.So + 1.6, K.So + 2.0)} />
          <g opacity={kprog(T, K.So + 1.0, K.So + 1.3)}><Maceta x={210} y={1190} T={T} crece={kprog(T, K.So + 1.1, K.So + 2.0, kEase.rebote)} />{txt(210, 1230, 'composta', 32, KC.ink, 'middle', 1, 900, KF.texto)}</g>
          <g opacity={kprog(T, K.So + 1.8, K.So + 2.1)}><Vaca x={850} y={1190} T={T} s={0.78} />{txt(830, 1230, 'alimento animal', 32, KC.ink, 'middle', 1, 900, KF.texto)}</g>
        </>)}
      </Escena>
      {/* 12 · la meta a futuro de Robert */}
      <Escena T={T} a={K.Fu} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Bagazo x={290} y={1100} T={T} crece={kprog(T, K.Fu + 0.2, K.Fu + 1.2, kEase.sale)} />
          {txt(290, 1150, '1 tonelada', 44, KC.ink, 'middle', kprog(T, K.Fu + 1.0, K.Fu + 1.4), 400, KF.titulo)}
          {txt(290, 1190, 'de bagazo de agave', 28, KC.ink, 'middle', kprog(T, K.Fu + 1.2, K.Fu + 1.6))}
          <Flecha x1={530} y1={900} x2={650} y2={900} p={kprog(T, K.Fu + 2.0, K.Fu + 2.6)} color={KC.violet} />
          <g opacity={kprog(T, K.Fu + 2.4, K.Fu + 2.8)}><Plato x={810} y={1080} T={T} abre={kprog(T, K.Fu + 2.5, K.Fu + 3.8)} />
            {txt(810, 1170, 'hongos para comer', 28, KC.ink, 'middle', 1)}</g>
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo olote del inicio, ahora con setas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bote x={830} y={1200} />
          {txt(830, 1060, 'BASURA', 40, '#fff', 'middle', 1, 400, KF.titulo)}
          <circle cx={470} cy={820} r={240} fill="#fff" opacity={0.3} />
          <Mano x={260} y={900} rot={-10} />
          <Olote x={470} y={830} s={1.05} rot={0} />
          <RacimoSeta T={T} x={400} y={800} s={1.0} abre={kprog(T, K.C + 0.2, K.C + 1.8)} n={7} seed={23} />
          <Mano x={260} y={900} rot={-10} dedos />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.4} until={K.N - 0.3} texto="basura" x={250} y={450} tam={50} />
      <Chip T={T} at={K.G + 1.9} until={K.N - 0.3} texto="comida… ¿para quién?" x={330} y={1130} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.N + 0.4} until={K.Pr - 0.3} valor={850} dur={1.6} sufijo=" g" etiqueta="de setas frescas" x={340} y={470} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.N + 3.8} until={K.Pr - 0.3} texto="eficiencia biológica 85 % · Hidalgo, 2026" x={540} y={1205} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.Pr + 1.6} until={K.Se - 0.3} texto="70 °C · 1 hora" x={420} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Pr + 2.4} until={K.Se - 0.3} texto="pasteurizar, no esterilizar" x={420} y={1200} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Se + 0.5} until={K.Os - 0.3} texto="semilla = grano con micelio" x={360} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Se + 2.4} until={K.Os - 0.3} x={60} y={600} texto="seta" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Se + 2.6} until={K.Os - 0.3} x={60} y={655} texto="Pleurotus ostreatus" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Se + 3.0} until={K.Os - 0.3} texto="~5 % de semilla" x={830} y={1200} tam={30} borde={KC.gold} />
      {T < K.En + 0.2 && <div style={{ opacity:1 - kprog(T, K.En - 0.2, K.En + 0.2) }}><Contador T={T} at={K.Os + 0.5} desde={0} hasta={15} dur={2.9} sufijo=" días" x={540} y={420} tam={80} color={KC.texto} /></div>}
      <Chip T={T} at={K.Os + 1.0} until={K.En - 0.3} texto="a oscuras · ~25 °C" x={540} y={520} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.En + 0.6} until={K.P - 0.3} texto="pudrición blanca" x={780} y={395} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Fr + 0.4} until={K.E - 0.3} texto="aire fresco" x={870} y={500} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Fr + 0.9} until={K.E - 0.3} texto="luz 12 h" x={870} y={590} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.Fr + 1.4} until={K.E - 0.3} texto="humedad 85–90 %" x={870} y={680} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Fr + 1.9} until={K.E - 0.3} texto="18–22 °C" x={870} y={770} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Fr + 2.6} until={K.E - 0.3} x={640} y={880} texto="Pleurotus ostreatus" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Fr + 3.0} until={K.E - 0.3} x={640} y={935} texto="en repisa, pie de lado" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.5} anio="2026" quien="Hidalgo, México · López-López et al." revista="Agroindustrial Science, 2026" x={540} y={760} />
      <Chip T={T} at={K.E + 4.6} until={K.Ro - 0.3} texto="cosecha: 19 días" x={330} y={1190} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.E + 6.2} until={K.Ro - 0.3} texto="26 días" x={750} y={1190} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ro + 0.3} until={K.So - 0.3} texto="lo que probé yo" x={330} y={460} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ro + 3.0} until={K.So - 0.3} texto="+ cal de nixtamal" x={330} y={545} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.Fu + 0.3} until={K.C - 0.3} texto="mi meta a futuro" x={330} y={460} tam={36} borde={KC.violet} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="no era basura" x={300} y={460} tam={40} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.Se} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Se} until={K.Os} texto="5 cm" largo={90} />
      <BarraEscala T={T} at={K.Os} until={K.En} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.En + 0.6} until={K.P} texto="10 µm (dentro de la lupa)" largo={110} />
      <BarraEscala T={T} at={K.P} until={K.Fr} texto="10 cm" largo={120} />
      <BarraEscala T={T} at={K.Fr} until={K.E} texto="5 cm" largo={80} />
      <BarraEscala T={T} at={K.Ro} until={K.So} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es basura: *es comida.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Pr - 0.1} texto="*850 g* de setas por kilo" />
      <Subtitulo T={T} idx={2} at={K.Pr + 0.1} until={K.Se - 0.1} texto="Remojar y *pasteurizar.*" />
      <Subtitulo T={T} idx={3} at={K.Se + 0.1} until={K.Os - 0.1} texto="Se siembra *la semilla.*" />
      <Subtitulo T={T} idx={4} at={K.Os + 0.1} until={K.En - 0.1} texto="*Dos semanas* a oscuras." />
      <Subtitulo T={T} idx={5} at={K.En + 0.1} until={K.P - 0.1} texto="Enzimas *contra la fibra.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Fr - 0.1} texto="¿Y *las setas?*" />
      <Subtitulo T={T} idx={7} at={K.Fr + 0.1} until={K.E - 0.1} texto="Aire, luz y *humedad.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ro - 0.1} texto="Olote: *19 días.* Paja: 26." />
      <Subtitulo T={T} idx={9} at={K.Ro + 0.1} until={K.So - 0.1} texto="Con granos, *fermentan.*" />
      <Subtitulo T={T} idx={10} at={K.So + 0.1} until={K.Fu - 0.1} texto="Composta o *alimento.*" />
      <Subtitulo T={T} idx={11} at={K.Fu + 0.1} until={K.C - 0.1} texto="*1 tonelada* de bagazo" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="*Tu próxima comida.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.2, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.6, K.N + 4.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Se + 0.3, K.Se + 4.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.En + 0.2, K.En + 4.6, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.P + 0.05, K.Fr + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.7, K.E + 7.7, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ro + 0.2, K.Ro + 5.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Fu + 0.3, K.Fu + 4.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="105" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OloteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OloteShot /></CompositionStage></div>;
}
window.OloteApp = OloteApp;
