// Shot Biotecnológico #51 · Tu frijol fabrica su propio abono (Rhizobium, nódulos y nitrogenasa) — NARRADO (N1 por dentro + N5 inoculante).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala entre sí.
const VERDE = '#3fbf4a', VERDE_OSC = '#2a8a36', TALLO = '#4f9e3a', RAIZ = '#e8d2a6', NODULO = '#e7c08f', TIERRA = '#8a5a34',
  RIZO = '#7fd88a', NOD = '#ff6fa8', FLAV = '#ffe11a', AZUL_N = '#2f6bff', MOFE = '#b18cff', FEPROT = '#ff8a1f';

function CapaR({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- la mata de frijol (macro) ---------- */
// Foliolo ovado con punta (frijol: hoja trifoliada).
function Foliolo({ x, y, rot = 0, s = 1, color = VERDE }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 C 46 -24 58 -92 0 -150 C -58 -92 -46 -24 0 0 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 0 -6 L 0 -132" stroke={VERDE_OSC} strokeWidth={4} />
    {[-40, -70, -100].map((yy, i) => <g key={i}><path d={`M 0 ${yy} l 22 -18`} stroke={VERDE_OSC} strokeWidth={3} /><path d={`M 0 ${yy} l -22 -18`} stroke={VERDE_OSC} strokeWidth={3} /></g>)}
  </g>;
}
function Trifoliada({ T, x, y, rot = 0, s = 1, seed = 1 }) {
  const m = mece(T, seed, 0.4) * 5;
  return <g transform={`translate(${x} ${y}) rotate(${rot + m}) scale(${s})`}>
    <path d="M 0 0 L 0 -90" stroke={TALLO} strokeWidth={9} strokeLinecap="round" />
    <Foliolo x={0} y={-90} rot={0} />
    <Foliolo x={0} y={-80} rot={-72} s={0.85} />
    <Foliolo x={0} y={-80} rot={72} s={0.85} />
  </g>;
}
function Vaina({ x, y, rot = 0, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * p})`}>
    <path d="M 0 0 C 20 40 26 110 8 170 C 2 178 -10 176 -10 168 C 4 112 0 50 -14 6 Z" fill="#8fd16a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[40, 80, 120].map((yy) => <ellipse key={yy} cx={4} cy={yy} rx={7} ry={14} fill="#bfe89a" opacity=".8" />)}
  </g>;
}
// Raíces laterales con nódulos redondos (frijol y soya: nódulos determinados, esféricos).
const RAICES = (() => {
  const R = krng(51), out = [];
  [60, 115, 170, 230, 290].forEach((yy, i) => [-1, 1].forEach((l) => {
    const len = 150 + R() * 90 - i * 12, cx = l * len * 0.55, cy = yy + 40 + R() * 30, ex = l * len, ey = yy + 90 + R() * 50;
    const nods = [0.3, 0.55, 0.8].filter(() => R() > 0.2).map((u) => ({ u, r: 11 + R() * 9 }));
    out.push({ yy, l, cx, cy, ex, ey, nods, i });
  }));
  return out;
})();
const qpt = (r, u) => ({ x: (1 - u) * (1 - u) * (r.l * 8) + 2 * (1 - u) * u * r.cx + u * u * r.ex, y: (1 - u) * (1 - u) * r.yy + 2 * (1 - u) * u * r.cy + u * u * r.ey });
// Mata completa: origen = cuello de la raíz (nivel del suelo). nod 0..1 = nódulos visibles; brillo 0..1; vainas 0..1.
function Mata({ T, x, y, s = 1, nod = 1, brillo = 0, vainas = 0, tierra = 0, rot = 0 }) {
  const R = krng(7);
  const terrones = Array.from({ length: 14 }, () => [(R() - 0.5) * 260, 40 + R() * 260, 10 + R() * 18, R()]);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, 2, 0.3) * 1.2}) scale(${s})`}>
    {/* raíz principal y laterales */}
    <path d="M -12 0 C -14 140 -6 260 0 400 C 6 260 14 140 12 0 Z" fill={RAIZ} stroke={KC.ink} strokeWidth={7} />
    {RAICES.map((r, i) => <path key={i} d={`M ${r.l * 8} ${r.yy} Q ${r.cx} ${r.cy} ${r.ex} ${r.ey}`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" />)}
    {RAICES.map((r, i) => <path key={'c' + i} d={`M ${r.l * 8} ${r.yy} Q ${r.cx} ${r.cy} ${r.ex} ${r.ey}`} stroke={RAIZ} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {nod > 0 && RAICES.map((r, i) => r.nods.map((n, k) => { const p = qpt(r, n.u), q = kclamp(nod * 3 - (i * 0.1 + k * 0.15), 0, 1);
      return q > 0 && <g key={i + '_' + k} transform={`translate(${p.x} ${p.y}) scale(${kEase.rebote(q)})`}>
        {brillo > 0 && <circle r={n.r + 14 + Math.sin(T * 5 + i) * 4} fill={KC.gold2} opacity={0.45 * brillo} />}
        <circle r={n.r} fill={NODULO} stroke={KC.ink} strokeWidth={5} />
        <circle cx={-n.r * 0.35} cy={-n.r * 0.35} r={n.r * 0.3} fill="#fff" opacity=".5" />
      </g>; }))}
    {/* terrones que caen al arrancarla */}
    {tierra > 0 && terrones.map(([tx, ty, tr, d], i) => <circle key={i} cx={tx} cy={ty + tierra * (250 + d * 300)} r={tr} fill={TIERRA} stroke={KC.ink} strokeWidth={4} opacity={1 - kprog(tierra, 0.6, 1)} />)}
    {/* tallo, hojas y vainas */}
    <path d="M 0 0 C -10 -120 14 -260 0 -430" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 0 0 C -10 -120 14 -260 0 -430" stroke={TALLO} strokeWidth={12} fill="none" strokeLinecap="round" />
    <Trifoliada T={T} x={-4} y={-180} rot={-48} seed={3} />
    <Trifoliada T={T} x={6} y={-300} rot={44} seed={5} />
    <Trifoliada T={T} x={0} y={-425} rot={-6} s={0.95} seed={8} />
    <Vaina x={-6} y={-230} rot={30} p={vainas} />
    <Vaina x={6} y={-350} rot={-24} s={0.9} p={kprog(vainas, 0.3, 1)} />
    <Vaina x={2} y={-250} rot={-14} s={0.85} p={kprog(vainas, 0.5, 1)} />
  </g>;
}
function Puno({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -10 L -240 -60 L -250 40 L -80 50 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-80} y={-46} width={110} height={100} rx={34} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    {[-22, 6, 34].map((yy) => <path key={yy} d={`M 30 ${yy} q 18 4 0 22`} stroke={KC.ink} strokeWidth={5} fill="none" />)}
  </g>;
}

/* ---------- moléculas ---------- */
// N₂: dos N con triple enlace. enlaces = cuántas rayas quedan; sep = separación extra (al romperse).
function N2({ x, y, s = 1, rot = 0, enlaces = 3, sep = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[-14, 0, 14].slice(0, enlaces).map((dy, i) => <line key={i} x1={-20 - sep} x2={20 + sep} y1={dy} y2={dy} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />)}
    {[-1, 1].map((l) => <g key={l} transform={`translate(${l * (32 + sep)} 0)`}>
      <circle r={30} fill={AZUL_N} stroke={KC.ink} strokeWidth={6} />
      <text y={12} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill="#fff">N</text>
    </g>)}
  </g>;
}
function Par({ x, y, s = 1, rot = 0, color, letra }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((l) => <g key={l} transform={`translate(${l * 26} 0)`}><circle r={26} fill={color} stroke={KC.ink} strokeWidth={5} />
      <text y={10} textAnchor="middle" style={{ font:`400 28px ${KF.titulo}` }} fill="#fff">{letra}</text></g>)}
  </g>;
}
function NH3({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[-90, 30, 150].map((a) => { const r = a * Math.PI / 180; return <g key={a}><line x1={0} y1={0} x2={Math.cos(r) * 44} y2={Math.sin(r) * 44} stroke={KC.ink} strokeWidth={6} />
      <circle cx={Math.cos(r) * 46} cy={Math.sin(r) * 46} r={15} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>; })}
    <circle r={28} fill={AZUL_N} stroke={KC.ink} strokeWidth={6} />
    <text y={11} textAnchor="middle" style={{ font:`400 32px ${KF.titulo}` }} fill="#fff">N</text>
  </g>;
}
// Flavonoide (señal de la raíz): dos anillos hexagonales chiquitos.
function Flavo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g opacity={o}><Molecula x={x} y={y} s={s} rot={rot} color={FLAV} anillos={2} /></g>;
}
// Factor Nod (señal de la bacteria): cadena corta de anillos de azúcar + cola de grasa.
function FactorNod({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 22 - 44} y={-9} width={20} height={18} rx={5} fill={NOD} stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -46 0 q -10 -12 -20 0 t -20 0" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}

/* ---------- micro: el pelito de la raíz (dentro de la Lupa, cuadro de 660 × 660; 10 px ≈ 1 µm) ---------- */
function PeloRaiz({ T, K }) {
  const t = T;
  const curl = kprog(t, K.Re + 1.0, K.Re + 3.0, kEase.suave);       // se enrosca
  const hilo = kprog(t, K.Tu + 0.2, K.Tu + 2.6, kEase.suave);       // canal de infección
  const prim = kprog(t, K.Tu + 1.4, K.Tu + 3.2);                    // primordio del nódulo
  const R0 = 70, X0 = 300, Y0 = 250, TH = Math.PI * 1.55;
  const th = TH * curl, colaRecta = R0 * TH * (1 - curl);
  const pts = [[X0, 560], [X0, Y0]];
  if (colaRecta > 0) pts.push([X0, Y0 - colaRecta]);
  // si ya se enroscó: arco alrededor del centro (X0 + R0, Y0)
  const arco = [];
  for (let i = 0; i <= 24; i++) { const a = th * i / 24; arco.push([X0 + R0 - R0 * Math.cos(a), Y0 - R0 * Math.sin(a)]); }
  const d = curl > 0.01
    ? `M ${X0} 560 L ${X0} ${Y0} ` + arco.map(([a, b]) => `L ${a.toFixed(1)} ${b.toFixed(1)}`).join(' ')
    : `M ${X0} 560 L ${X0} ${(Y0 - colaRecta).toFixed(1)}`;
  const Rr = krng(9);
  const bac = Array.from({ length: 7 }, (_, i) => ({ sx: Rr() > 0.5 ? 700 : -40, sy: 80 + Rr() * 300, seed: i + 2, d: Rr() }));
  const flav = Array.from({ length: 12 }, (_, i) => ({ a: Rr() * Math.PI * 2, v: 120 + Rr() * 180, t0: K.Se + 0.3 + i * 0.22, y0: 300 + Rr() * 240 }));
  const nods = Array.from({ length: 10 }, (_, i) => ({ a: Rr() * Math.PI * 2, t0: K.Re + 0.1 + i * 0.12, b: i % 4 }));
  const atrap = { x: X0 + R0, y: Y0 };
  return <svg width="100%" height="100%" viewBox="0 0 660 660">
    <rect width={660} height={660} fill="#0c1a12" />
    {/* suelo: granitos */}
    {Array.from({ length: 18 }, (_, i) => { const g = krng(30 + i); return <circle key={i} cx={g() * 660} cy={g() * 520} r={6 + g() * 10} fill="#2a2418" opacity=".7" />; })}
    {/* epidermis y corteza de la raíz */}
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={i * 112 - 6} y={560} width={110} height={60} rx={14} fill="#d9c79a" stroke={KC.ink} strokeWidth={4} />)}
    {Array.from({ length: 7 }, (_, i) => <rect key={'c' + i} x={i * 100 - 30} y={622} width={98} height={50} rx={14} fill={prim > 0 && Math.abs(i * 100 + 19 - X0) < 160 ? mixHex('#c9b789', '#e8b9a0', prim) : '#c9b789'} stroke={KC.ink} strokeWidth={4} />)}
    {prim > 0 && [0, 1, 2, 3, 4].map((i) => <circle key={'p' + i} cx={X0 - 80 + i * 40} cy={640} r={14 * kprog(prim, i * 0.15, i * 0.15 + 0.3)} fill="#f2cdb6" stroke={KC.ink} strokeWidth={3} />)}
    {/* pelito de la raíz: una sola célula muy larga */}
    <path d={d} stroke={KC.ink} strokeWidth={84} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="#efe2bf" strokeWidth={70} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".35" transform="translate(-16 0)" />
    {/* flavonoides que salen de la raíz */}
    {flav.map((f, i) => { const u = kprog(t, f.t0, f.t0 + 2.2); if (u <= 0) return null;
      return <Flavo key={i} x={X0 + Math.cos(f.a) * f.v * u} y={f.y0 + Math.sin(f.a) * f.v * u * 0.6} s={0.32} rot={t * 40 + i * 30} o={1 - kprog(u, 0.75, 1)} />; })}
    {/* bacterias que se acercan */}
    {bac.map((b, i) => { const lleg = kprog(t, K.Se + 1.0 + b.d, K.Se + 3.6 + b.d, kEase.suave);
      const tx = X0 + 90 + (i - 3) * 40, ty = Y0 - 60 + (i % 3) * 90;
      let bx = klerp(b.sx, tx, lleg) + mece(t, b.seed, 0.6) * 8, by = klerp(b.sy, ty, lleg) + mece(t, b.seed + 4, 0.5) * 8;
      if (i === 3) { const a = kprog(t, K.Re + 0.2, K.Re + 1.4); bx = klerp(bx, atrap.x, a); by = klerp(by, atrap.y, a); }
      const enHilo = i === 3 && hilo > 0;
      if (enHilo) return null;
      return <Bacteria key={i} T={t} x={bx} y={by} largo={30} ancho={12} rot={i * 37 + t * 10} color={RIZO} seed={b.seed} nucleoide={false} />; })}
    {/* factores Nod (respuesta de las bacterias) */}
    {nods.map((n, i) => { const u = kprog(t, n.t0, n.t0 + 1.4); if (u <= 0 || u >= 1) return null;
      const ox = X0 + 90 + (n.b - 1.5) * 40, oy = Y0 - 20;
      return <FactorNod key={i} x={klerp(ox + Math.cos(n.a) * 40, X0, u)} y={klerp(oy + Math.sin(n.a) * 40, Y0 + 40, u)} s={0.7} rot={n.a * 57} o={1 - u * 0.6} />; })}
    {/* canal de infección: tubo que baja desde el rizo, con bacterias en fila */}
    {hilo > 0 && <g>
      <path d={`M ${atrap.x} ${atrap.y} Q ${X0 + 20} ${Y0 + 40} ${X0} ${Y0 + 80} L ${X0} ${klerp(Y0 + 80, 640, hilo)}`} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d={`M ${atrap.x} ${atrap.y} Q ${X0 + 20} ${Y0 + 40} ${X0} ${Y0 + 80} L ${X0} ${klerp(Y0 + 80, 640, hilo)}`} stroke="#ffd6e7" strokeWidth={16} fill="none" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, i) => { const yy = Y0 + 80 + ((t * 40 + i * 60) % 340); if (yy > klerp(Y0 + 80, 640, hilo) - 10) return null;
        return <rect key={i} x={X0 - 5} y={yy - 12} width={10} height={24} rx={5} fill={RIZO} stroke={KC.ink} strokeWidth={2} />; })}
    </g>}
    {/* barra de escala */}
    <g transform="translate(410 520)"><rect x={0} y={0} width={100} height={10} fill="#fff" /><text x={50} y={-10} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">10 µm</text></g>
  </svg>;
}

/* ---------- micro: célula del nódulo con bacteroides en sus simbiosomas ---------- */
function CelulaNodulo({ T, K }) {
  const t = T, R = krng(17);
  const sims = [];
  for (let i = 0; i < 22; i++) { const a = R() * Math.PI * 2, rr = 60 + R() * 200; sims.push({ x: 330 + Math.cos(a) * rr, y: 330 + Math.sin(a) * rr * 0.85, n: 2 + Math.floor(R() * 3), rot: R() * 180, t0: K.Ba + 0.2 + i * 0.07 }); }
  const fija = kprog(t, K.Ba + 1.8, K.Ba + 2.4);
  return <svg width="100%" height="100%" viewBox="0 0 660 660">
    <rect width={660} height={660} fill="#140e10" />
    {/* células vecinas */}
    {[[0, 0], [660, 0], [0, 660], [660, 660]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={200} fill="#2a1d1e" stroke="#4a3436" strokeWidth={6} />)}
    <path d="M 330 50 C 520 60 620 180 610 340 C 600 520 470 615 320 610 C 160 605 50 500 52 330 C 54 160 160 45 330 50 Z" fill="#f3e3c6" stroke={KC.ink} strokeWidth={8} />
    <circle cx={330} cy={330} r={46} fill="#c7a6d8" stroke={KC.ink} strokeWidth={5} />
    {sims.map((s, i) => { const q = kprog(t, s.t0, s.t0 + 0.5, kEase.rebote); if (q <= 0) return null;
      if (Math.hypot(s.x - 330, s.y - 330) < 70) return null;
      return <g key={i} transform={`translate(${s.x + mece(t, i, 0.3) * 3} ${s.y}) rotate(${s.rot}) scale(${q})`}>
        <ellipse rx={44} ry={30} fill="rgba(255,255,255,.55)" stroke="#8c6f5a" strokeWidth={3} strokeDasharray="6 4" />
        {Array.from({ length: s.n }, (_, k) => <rect key={k} x={-30} y={-22 + k * (44 / s.n) + 2} width={60} height={Math.max(10, 40 / s.n - 3)} rx={6} fill={mixHex('#7fd88a', '#2fe0a8', fija)} stroke={KC.ink} strokeWidth={3} />)}
      </g>; })}
    {/* N₂ que entra y NH₃ que sale, chiquitos */}
    {fija > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((t - K.Ba - 1.8) * 0.5 + i / 6) % 1;
      return <g key={i}><N2 x={klerp(-20, 200, u)} y={120 + i * 80} s={0.35} o={1 - u} /><NH3 x={klerp(460, 680, u)} y={140 + i * 75} s={0.35} o={u} /></g>; })}
    <g transform="translate(470 610)"><rect x={0} y={0} width={100} height={10} fill="#fff" /><text x={50} y={-10} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">10 µm</text></g>
  </svg>;
}

/* ---------- nitrogenasa (esquemática) ---------- */
// Proteína MoFe (dos lóbulos grandes) + proteína Fe (más chica) que se acopla arriba; núcleo FeMo-co que brilla.
function Nitrogenasa({ T, x, y, s = 1, acopla = 1, brilla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -40 C -250 -170 -60 -190 -10 -90 L -10 160 C -80 230 -250 200 -240 60 Z" fill={MOFE} stroke={KC.ink} strokeWidth={9} />
    <path d="M 230 -40 C 250 -170 60 -190 10 -90 L 10 160 C 80 230 250 200 240 60 Z" fill={mixHex(MOFE, '#ffffff', 0.18)} stroke={KC.ink} strokeWidth={9} />
    <g transform={`translate(0 ${klerp(-260, -150, acopla)})`}>
      <path d="M -120 -10 C -130 -110 130 -110 120 -10 C 110 40 -110 40 -120 -10 Z" fill={FEPROT} stroke={KC.ink} strokeWidth={8} />
      <circle cx={0} cy={-40} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    </g>
    <circle cx={0} cy={40} r={70 + brilla * 30 + Math.sin(T * 6) * 6 * brilla} fill={KC.gold2} opacity={0.35 + 0.3 * brilla} />
    <g transform="translate(0 40)">{[[-20, -14], [20, -14], [0, 18], [-28, 18], [28, 18], [0, -34]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={13} fill={i === 5 ? '#4a7a9a' : '#c46a2a'} stroke={KC.ink} strokeWidth={3} />)}</g>
  </g>;
}
function Martillo({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={260} rx={10} fill="#c98a4a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-60} width={180} height={70} rx={14} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

/* ---------- fábrica, termómetros, costal, medalla ---------- */
function Fabrica({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.35 + i / 5) % 1); return <circle key={i} cx={110 + u * 60 + Math.sin(T + i) * 10} cy={-330 - u * 260} r={30 + u * 50} fill="#e9e4dc" stroke={KC.ink} strokeWidth={5} opacity={1 - u} />; })}
    <rect x={80} y={-330} width={60} height={200} fill="#b4413a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -200 0 L -200 -150 L -120 -210 L -120 -150 L -40 -210 L -40 -150 L 40 -210 L 40 -150 L 200 -150 L 200 0 Z" fill="#9aa3b5" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-150, -70, 10, 90].map((wx) => <rect key={wx} x={wx} y={-110} width={50} height={50} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} opacity={0.7 + 0.3 * Math.sin(T * 3 + wx)} />)}
  </g>;
}
function Termo({ x, y, alto = 360, f = 0.5, color = KC.red, texto }) {
  return <g>
    <rect x={x - 26} y={y} width={52} height={alto} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 12} y={y + alto * (1 - f)} width={24} height={alto * f} rx={12} fill={color} />
    <circle cx={x} cy={y + alto + 30} r={44} fill={color} stroke={KC.ink} strokeWidth={7} />
    {texto && <text x={x} y={y - 22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
function Costal({ x, y, s = 1, tacha = 0, texto = 'UREA' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -150 Q 0 -180 110 -150 L 130 120 Q 0 150 -130 120 Z" fill="#f2ead6" stroke={KC.ink} strokeWidth={8} />
    <text y={10} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <text y={66} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>46-0-0</text>
    {tacha > 0 && <g stroke={KC.red} strokeWidth={22} strokeLinecap="round">
      <line x1={-140} y1={-150} x2={klerp(-140, 140, kprog(tacha, 0, 0.5))} y2={klerp(-150, 130, kprog(tacha, 0, 0.5))} />
      {tacha > 0.5 && <line x1={140} y1={-150} x2={klerp(140, -140, kprog(tacha, 0.5, 1))} y2={klerp(-150, 130, kprog(tacha, 0.5, 1))} />}
    </g>}
  </g>;
}
function Medalla({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 -230 L -20 -60 L 20 -60 L 60 -230 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <circle r={110} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <circle r={84} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
    <text y={18} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>2025</text>
  </g>;
}
// Bolsa de inoculante que se inclina y suelta polvito sobre las semillas.
function BolsaInoc({ T, x, y, inclina = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina * 70}) scale(${s})`}>
    <path d="M -90 -150 L 90 -150 L 110 140 L -110 140 Z" fill={KC.white} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -90 -150 L 90 -150 L 80 -190 L -80 -190 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={7} />
    <text y={-40} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>inoculante</text>
    {[[-30, 40], [10, 70], [40, 30], [-10, 100], [30, 110]].map(([a, b], i) => <rect key={i} x={a - 14} y={b - 6} width={28} height={12} rx={6} fill={RIZO} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 40 + T * 20} ${a} ${b})`} />)}
  </g>;
}
function SemillaSoya({ x, y, rot = 0, s = 1, cubre = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={34} ry={28} fill={mixHex('#f2dc9a', '#bfe8c4', cubre)} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-10} rx={12} ry={4} fill="#6b4a2a" />
    {cubre > 0.3 && <circle cx={10} cy={8} r={4} fill={RIZO} />}
  </g>;
}
// Frijol (semilla): forma de riñón.
function Frijol({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -120 -10 C -130 -90 -10 -110 40 -80 C 100 -110 150 -50 130 10 C 110 80 -10 100 -70 70 C -110 55 -118 30 -120 -10 Z" fill="#5a1f2b" stroke={KC.ink} strokeWidth={9} />
    <path d="M -10 -70 Q 10 -50 40 -62" stroke="#f6f3ec" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -80 -40 Q -60 -70 -20 -76" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".35" />
  </g>;
}
// Brasil esquemático (contorno simplificado a mano).
const BR = [[-60,5.2],[-56.5,1.9],[-51.6,4.2],[-50,0],[-44,-2.5],[-38.5,-3.7],[-35,-5.2],[-34.8,-7.5],[-37,-11],[-39,-13.5],[-39.2,-17.7],[-41,-22],[-44.5,-23.3],[-48.5,-26],[-48.6,-28.5],[-53.4,-33.7],[-57.6,-30.2],[-53.8,-27.1],[-54.6,-25.5],[-58.2,-20],[-58.1,-16.3],[-60.3,-13.6],[-65.3,-9.8],[-70,-11],[-73.9,-7.3],[-70,-4.3],[-69.6,-1],[-67,1.2],[-64,2],[-60,5.2]];
function MapaBrasil({ x, y, k = 13, color = '#9be27d' }) {
  const d = 'M ' + BR.map(([lo, la]) => `${((lo + 75) * k).toFixed(1)} ${((6 - la) * k).toFixed(1)}`).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y})`}><path d={d} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>;
}
function Soya({ x, y, s = 1, on = 0, T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y + mece(T, seed, 0.4) * 2}) scale(${s})`}>
    {[[-26, -10], [0, -34], [26, -10], [0, 0]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={26} fill={on ? VERDE : '#a7b48a'} stroke={KC.ink} strokeWidth={5} />)}
    {on > 0 && <circle cx={0} cy={-14} r={52} fill="none" stroke={KC.gold2} strokeWidth={5} opacity={0.6 * on} />}
  </g>;
}

/* ---------- el shot ---------- */
function Rhizobium() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ai: CUES.Aire, Se: CUES.Senal, Re: CUES.Respuesta, Tu: CUES.Tunel, Ba: CUES.Bacteroide, Pr: CUES.Pregunta, Ni: CUES.Nitrogenasa,
    Tr: CUES.Trueque, Fa: CUES.Fabrica, In: CUES.Inoculante, Br: CUES.Brasil, Et: CUES.Etli, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const arranca = kprog(T, K.G, K.G + 0.8, kEase.sale);
  const R = krng(78);
  const aire = Array.from({ length: 50 }, (_, i) => ({ x: 60 + R() * 960, y: 380 + R() * 820, tipo: i < 39 ? 'N' : i < 49 ? 'O' : 'Ar', v: 0.3 + R() * 0.6, ph: R() * 6, rot: R() * 180 }));
  // nitrogenasa: tiempos de los tres enlaces que se rompen
  const nI = K.Ni + 0.6, rompe = [K.Ni + 1.6, K.Ni + 2.1, K.Ni + 2.6];
  const enl = 3 - rompe.filter((t) => T >= t).length;
  const llega = kprog(T, nI, nI + 0.8, kEase.sale), sale = kprog(T, K.Ni + 3.0, K.Ni + 4.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: arrancan la mata y aparecen las bolitas */}
      <Escena T={T} a={K.G} b={K.Ai} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:klerp(1180, 1560, arranca), height:800, background:TIERRA }}></div>
        <CapaR>
          <Mata T={T} x={430} y={klerp(1180, 860, arranca)} s={0.95} nod={kprog(T, K.G + 0.4, K.G + 1.6)} tierra={kprog(T, K.G + 0.3, K.G + 2.4)} brillo={kprog(T, K.G + 2.2, K.G + 3.0)} />
          <Puno x={470} y={klerp(1180, 860, arranca) - 300} s={0.8} />
        </CapaR>
        <Ambiente T={T} n={16} color="rgba(255,255,255,.45)" />
      </Escena>
      {/* 1 · aire: 78 % nitrógeno */}
      <Escena T={T} a={K.Ai} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', left:0, right:0, top:1220, bottom:0, background:TIERRA }}></div>
        <CapaR>
          {aire.map((a, i) => { const q = kprog(T, K.Ai + i * 0.03, K.Ai + i * 0.03 + 0.4, kEase.rebote); const ax = a.x + Math.sin(T * a.v * 2 + a.ph) * 30, ay = a.y + Math.cos(T * a.v * 1.6 + a.ph) * 24;
            if (q <= 0) return null;
            return <g key={i} transform={`translate(${ax} ${ay}) scale(${q})`}>
              {a.tipo === 'N' ? <N2 x={0} y={0} s={0.55} rot={a.rot + T * 20} /> : a.tipo === 'O' ? <Par x={0} y={0} s={0.55} rot={a.rot + T * 20} color={KC.red} letra="O" /> : <circle r={16} fill="#9aa3b5" stroke={KC.ink} strokeWidth={4} />}
            </g>; })}
          <Mata T={T} x={540} y={1220} s={0.75} nod={0} />
          {/* las parejas rebotan contra la hoja */}
          {[0, 1, 2].map((i) => { const u = ((T - K.Ai - 1.6 - i * 0.7) % 2.1) / 2.1; if (T < K.Ai + 1.6 + i * 0.7) return null;
            const ex = 470 + i * 70, ey = 780 + i * 20; return <N2 key={i} x={ex - 140 + Math.abs(0.5 - u) * 280} y={ey - 180 * Math.sin(u * Math.PI)} s={0.7} rot={T * 60} />; })}
        </CapaR>
      </Escena>
      {/* 2–4 · la raíz por dentro: señal, respuesta, túnel */}
      <Escena T={T} a={K.Se} b={K.Ba} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:0, right:0, top:560, bottom:0, background:'#a87a4e' }}></div>
        <CapaR>
          <Mata T={T} x={540} y={560} s={1.4} nod={0} />
        </CapaR>
      </Escena>
      <Lupa T={T} at={K.Se + 0.1} until={K.Ba - 0.15} x={440} y={800} r={330} fx={640} fy={900} tinte={KC.mint} etiqueta="AL MICROSCOPIO · PELO DE LA RAÍZ"
        interior={(t) => <PeloRaiz T={t} K={K} />} />
      {/* 5 · nódulo por dentro */}
      <Escena T={T} a={K.Ba} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:0, right:0, top:420, bottom:0, background:'#a87a4e' }}></div>
        <CapaR><Mata T={T} x={540} y={300} s={1.6} nod={1} /></CapaR>
      </Escena>
      <Lupa T={T} at={K.Ba + 0.05} until={K.Pr - 0.15} x={560} y={790} r={340} fx={720} fy={560} tinte={KC.pink} etiqueta="POR DENTRO · NÓDULO"
        interior={(t) => <CelulaNodulo T={t} K={K} />} />
      {/* 6 · pregunta: una molécula muy dura */}
      <Escena T={T} a={K.Pr} b={K.Ni} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <CapaR>
          <N2 x={300} y={880} s={2.6} rot={Math.sin(T * 2) * 4} />
          {(() => { const u = ((T - K.Pr) * 1.6) % 1, gol = Math.abs(Math.sin(u * Math.PI)); return <Martillo x={330} y={640} rot={klerp(-70, 10, gol)} s={0.9} />; })()}
          <text x={300} y={1140} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} opacity={Math.abs(Math.sin((T - K.Pr) * 1.6 * Math.PI))}>¡TOC!</text>
        </CapaR>
      </Escena>
      {/* 7 · nitrogenasa: rompe el triple enlace */}
      <Escena T={T} a={K.Ni} b={K.Tr} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <CapaR>
          <Nitrogenasa T={T} x={500} y={940} s={1.05} acopla={kprog(T, K.Ni, K.Ni + 0.8, kEase.sale)} brilla={kprog(T, rompe[0] - 0.3, rompe[0])} />
          {sale < 1 && <N2 x={klerp(-120, 500, llega)} y={klerp(620, 982, llega)} s={0.9} rot={klerp(-40, 0, llega)} enlaces={enl} sep={enl === 0 ? 30 * sale : (3 - enl) * 4} o={1 - sale} />}
          {sale > 0 && <g><NH3 x={klerp(470, 820, sale)} y={klerp(982, 1180, sale)} s={0.9} rot={T * 30} /><NH3 x={klerp(530, 880, sale)} y={klerp(982, 760, sale)} s={0.9} rot={-T * 30} /></g>}
          {rompe.map((t, i) => { const u = kprog(T, t, t + 0.4); return u > 0 && u < 1 && <text key={i} x={500 + (i - 1) * 120} y={820 - u * 60} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} opacity={1 - u}>¡CLAC!</text>; })}
        </CapaR>
        <Ambiente T={T} n={20} color="rgba(177,140,255,.35)" />
      </Escena>
      {/* 8 · el trueque */}
      <Escena T={T} a={K.Tr} b={K.Fa} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:0, right:0, top:1000, bottom:0, background:TIERRA }}></div>
        <CapaR>
          <Mata T={T} x={540} y={1000} s={1.0} nod={1} brillo={0.6} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Tr) * 0.45 + i / 6) % 1; return T > K.Tr + 0.3 && <g key={i}>
            <circle cx={440 + Math.sin(u * 6) * 8} cy={klerp(620, 1100, u)} r={14} fill={KC.orange} stroke={KC.ink} strokeWidth={4} opacity={Math.sin(u * Math.PI)} />
            <NH3 x={650 + Math.sin(u * 6) * 8} y={klerp(1120, 620, u)} s={0.45} o={Math.sin(u * Math.PI) * kprog(T, K.Tr + 1.4, K.Tr + 1.8)} />
          </g>; })}
          <FlechaCurva x1={360} y1={600} x2={360} y2={1100} curva={60} color={KC.orange} p={kprog(T, K.Tr + 0.2, K.Tr + 1.0)} T={T} />
          <FlechaCurva x1={730} y1={1130} x2={730} y2={620} curva={60} color={KC.cyan} p={kprog(T, K.Tr + 1.4, K.Tr + 2.2)} T={T} />
        </CapaR>
      </Escena>
      {/* 9 · fábrica contra bacteria */}
      <Escena T={T} a={K.Fa} b={K.In} zoom={0.03}>
        <FondoLunares color={KC.coral} />
        <div style={{ position:'absolute', left:0, right:0, top:1180, bottom:0, background:'#9aa3b5' }}></div>
        <div style={{ position:'absolute', left:560, right:0, top:1050, bottom:0, background:TIERRA }}></div>
        <CapaR>
          <Fabrica T={T} x={290} y={1180} s={1.0} />
          <Termo x={120} y={700} alto={300} f={kprog(T, K.Fa + 0.4, K.Fa + 1.6, kEase.sale) * 0.9} color={KC.red} texto={`${Math.round(klerp(20, 450, kprog(T, K.Fa + 0.4, K.Fa + 1.6, kEase.sale)))} °C`} />
          <Termo x={980} y={720} alto={300} f={kprog(T, K.Fa + 2.0, K.Fa + 2.8) * 0.12} color={KC.cyan} texto="~25 °C" />
          <g transform={`translate(780 1130) scale(${kprog(T, K.Fa + 1.8, K.Fa + 2.4, kEase.rebote)})`}>
            <circle r={90} fill={NODULO} stroke={KC.ink} strokeWidth={8} /><circle r={110 + Math.sin(T * 5) * 6} fill="none" stroke={KC.gold2} strokeWidth={6} opacity=".7" />
            <path d="M -200 -40 Q -100 -90 -70 -50" stroke={RAIZ} strokeWidth={22} fill="none" strokeLinecap="round" />
          </g>
          <text x={290} y={1260} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>Haber-Bosch</text>
        </CapaR>
      </Escena>
      {/* 10 · Brasil: inoculante en la semilla de soya */}
      <Escena T={T} a={K.In} b={K.Br} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CapaR>
          <g opacity={kprog(T, K.In + 0.1, K.In + 0.6)}><MapaBrasil x={560} y={400} k={11} /></g>
          <circle cx={560 + (-51 + 75) * 11} cy={400 + (6 + 23.3) * 11} r={14 + Math.sin(T * 5) * 3} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.In + 0.6, K.In + 1.0)} />
          <BolsaInoc T={T} x={300} y={940} inclina={kprog(T, K.In + 2.0, K.In + 2.8, kEase.sale)} s={0.95} />
          {T > K.In + 2.6 && Array.from({ length: 22 }, (_, i) => { const u = ((T - K.In - 2.6) * 1.2 + i / 22) % 1; return <circle key={i} cx={470 + Math.sin(i * 7) * 40 + u * 60} cy={1000 + u * 160} r={6} fill={RIZO} stroke={KC.ink} strokeWidth={2} opacity={1 - u} />; })}
          {Array.from({ length: 13 }, (_, i) => <SemillaSoya key={i} x={480 + (i % 5) * 76 + (Math.floor(i / 5) % 2) * 36} y={1190 - Math.floor(i / 5) * 46} rot={i * 33} s={1} cubre={kprog(T, K.In + 3.0 + i * 0.08, K.In + 3.6 + i * 0.08)} />)}
        </CapaR>
      </Escena>
      {/* 11 · 85 % de los campos de soya y el premio */}
      <Escena T={T} a={K.Br} b={K.Et} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', left:0, right:0, top:760, bottom:0, background:'#c9a36b' }}></div>
        <CapaR>
          {Array.from({ length: 40 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), on = i < 34 && T > K.Br + 0.6 + (i / 40) * 1.4;
            return <Soya key={i} x={70 + c * 105 + (f % 2) * 50} y={830 + f * 110} s={0.75 + f * 0.08} on={on ? 1 : 0} T={T} seed={i} />; })}
          <g transform={`translate(0 ${(1 - kprog(T, K.Br + 2.4, K.Br + 3.0, kEase.rebote)) * -700})`}><Medalla x={800} y={560} s={1} rot={Math.sin(T * 2) * 5} /></g>
          <g opacity={kprog(T, K.Br + 0.8, K.Br + 1.2)}><Costal x={860} y={1060} s={0.8} tacha={kprog(T, K.Br + 1.4, K.Br + 2.2)} /></g>
        </CapaR>
      </Escena>
      {/* 12 · Rhizobium etli: etl = frijol */}
      <Escena T={T} a={K.Et} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <CapaR>
          <Frijol x={330} y={900} s={1.6} rot={Math.sin(T * 1.5) * 4} />
          <g transform={`translate(${klerp(1200, 760, kprog(T, K.Et + 0.3, K.Et + 1.2, kEase.sale))} 960)`}>
            <Bacteria T={T} x={0} y={0} largo={300} ancho={120} rot={-12} color={RIZO} seed={4} />
            <circle cx={-40} cy={-20} r={12} fill={KC.ink} /><circle cx={30} cy={-34} r={12} fill={KC.ink} />
            <path d="M -30 20 Q 0 44 40 10" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
          </g>
          <text x={540} y={700} textAnchor="middle" style={{ font:`400 ${klerp(80, 220, kprog(T, K.Et + 2.4, K.Et + 3.0, kEase.rebote))}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10}
            opacity={kprog(T, K.Et + 2.4, K.Et + 2.7)}>etl</text>
        </CapaR>
      </Escena>
      {/* 13 · cierre: la misma mata, ya con vainas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1560, bottom:0, background:TIERRA }}></div>
        <CapaR>
          {Array.from({ length: 10 }, (_, i) => { const u = ((T - K.Ci) * 0.5 + i / 10) % 1; return <N2 key={i} x={klerp(i % 2 ? 1080 : 0, 430 + (i % 2 ? 60 : -60), u)} y={klerp(500 + i * 40, 1000, u)} s={0.5} rot={T * 40 + i * 20} o={Math.sin(u * Math.PI)} />; })}
          <Mata T={T} x={430} y={860} s={0.95} nod={1} brillo={1} vainas={kprog(T, K.Ci + 0.2, K.Ci + 1.4, kEase.sale)} />
        </CapaR>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.G + 3.4} texto="¿plaga?" x={300} y={1500} tam={52} />
      <Chip T={T} at={K.G + 3.5} until={K.Ai - 0.3} texto="si se despega fácil: es nódulo" y={1500} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.G + 1.0} until={K.Ai - 0.3} x={60} y={420} texto="frijol · Phaseolus vulgaris" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ai + 0.3} until={K.Se - 0.3} valor={78} dur={1.2} sufijo=" %" etiqueta="del aire es nitrógeno (N₂)" x={560} y={620} tam={230} color={KC.yellow} />
      <Chip T={T} at={K.Ai + 2.0} until={K.Se - 0.2} texto="N≡N: la planta sola no lo usa" y={1500} tam={40} borde={AZUL_N} />
      <Etq T={T} at={K.Se + 0.9} until={K.Re - 0.2} x={60} y={1480} texto="flavonoides (señal de la raíz)" tam={32} color={FLAV} />
      <Etq T={T} at={K.Se + 2.0} until={K.Tu - 0.2} x={60} y={1540} texto="Rhizobium" it tam={34} color={RIZO} />
      <Etq T={T} at={K.Re + 0.3} until={K.Tu - 0.2} x={60} y={1480} texto="factores Nod (respuesta)" tam={32} color={NOD} />
      <Chip T={T} at={K.Tu + 0.4} until={K.Ba - 0.2} texto="canal de infección" y={1500} tam={42} borde={KC.pink} />
      <Chip T={T} at={K.Ba + 0.5} until={K.Pr - 0.2} texto="bacteroides en su membrana" y={1500} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Pr + 0.3} until={K.Ni - 0.2} texto="N≡N: triple enlace" y={1500} tam={44} borde={AZUL_N} />
      <Etq T={T} at={K.Ni + 0.4} until={K.Tr - 0.2} x={60} y={420} texto="nitrogenasa (esquema)" tam={32} color={MOFE} />
      <Chip T={T} at={K.Ni + 3.0} until={K.Tr - 0.2} texto="N₂ → 2 NH₃ (amoníaco)" y={1500} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.Tr + 0.6} until={K.Fa - 0.2} x={60} y={1480} texto="la planta: alimento" tam={32} color={KC.orange} />
      <Etq T={T} at={K.Tr + 1.6} until={K.Fa - 0.2} x={60} y={1540} texto="la bacteria: nitrógeno" tam={32} color={KC.cyan} />
      <Chip T={T} at={K.Fa + 0.8} until={K.In - 0.2} texto="350–500 °C · 150–300 bar" y={1500} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Fa + 2.4} until={K.In - 0.2} x={1020} y={1580} texto="nitrogenasa: temperatura ambiente" lado="izq" tam={28} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.In + 0.4} until={K.In + 2.2} anio="Brasil" quien="Mariangela Hungria" revista="Embrapa Soja · inoculantes" x={330} y={640} />
      <Etq T={T} at={K.In + 2.6} until={K.Br - 0.2} x={60} y={1480} texto="Bradyrhizobium (soya)" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.In + 3.2} until={K.Br - 0.2} texto="la bacteria va en la semilla" y={1560} tam={38} borde={KC.mint} />
      <Medidor T={T} at={K.Br + 0.3} until={K.Et - 0.3} valor={(t) => 0.85 * kprog(t, K.Br + 0.6, K.Br + 2.0, kEase.sale)} etiqueta="campos de soya de Brasil con inoculante" x={90} y={430} ancho={560} color={KC.mint} />
      <Chip T={T} at={K.Br + 1.4} until={K.Et - 0.3} texto="más de 30 millones de hectáreas" y={1500} tam={38} borde={KC.leaf} />
      <Etq T={T} at={K.Br + 3.0} until={K.Et - 0.3} x={1020} y={1580} texto="Premio Mundial de la Alimentación" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Et + 1.2} until={K.Ci - 0.2} x={1020} y={1140} texto="Rhizobium etli" it lado="izq" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Et + 2.8} until={K.Ci - 0.2} texto="náhuatl: etl = frijol" y={1500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Et + 3.4} until={K.Ci - 0.2} texto="descrita en 1993 · cepa de Guanajuato" y={1580} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 0.8} until={K.Ou} texto="N₂ del aire → nódulo → frijol" y={1500} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ai - 0.1} texto="No son plaga: *son fábricas de abono.*" />
      <Subtitulo T={T} idx={1} at={K.Ai + 0.1} until={K.Se - 0.1} texto="El aire: *78 % nitrógeno.*" />
      <Subtitulo T={T} idx={2} at={K.Se + 0.1} until={K.Re - 0.1} texto="La raíz *manda una señal.*" />
      <Subtitulo T={T} idx={3} at={K.Re + 0.1} until={K.Tu - 0.1} texto="El pelito *la atrapa.*" />
      <Subtitulo T={T} idx={4} at={K.Tu + 0.1} until={K.Ba - 0.1} texto="Entra por *un túnel.*" />
      <Subtitulo T={T} idx={5} at={K.Ba + 0.1} until={K.Pr - 0.1} texto="Ahora es *bacteroide.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ni - 0.1} texto="¿Cómo rompe *algo tan duro?*" />
      <Subtitulo T={T} idx={7} at={K.Ni + 0.1} until={K.Tr - 0.1} texto="Triple enlace → *amoníaco.*" />
      <Subtitulo T={T} idx={8} at={K.Tr + 0.1} until={K.Fa - 0.1} texto="Comida por *nitrógeno.*" />
      <Subtitulo T={T} idx={9} at={K.Fa + 0.1} until={K.In - 0.1} texto="Fábrica: *350 °C o más.*" />
      <Subtitulo T={T} idx={10} at={K.In + 0.1} until={K.Br - 0.1} texto="Bacterias *para la semilla.*" />
      <Subtitulo T={T} idx={11} at={K.Br + 0.1} until={K.Et - 0.1} texto="*85 %* de los campos de soya" />
      <Subtitulo T={T} idx={12} at={K.Et + 0.1} until={K.Ci - 0.1} texto="Etli: *de etl, frijol.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Tu frijol hace *su abono.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [K.Ai + 0.6, K.Se - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Re + 0.4, K.Tu - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ba + 0.8, K.Pr - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Pr + 0.05, K.Ni + 0.6, 'avatar_06_pensativo_menton', 'grande'],
        [K.Ni + 1.6, K.Tr - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Fa + 0.4, K.In - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Br + 0.3, K.Et - 0.2, 'avatar_02_apuntando_camara', 'grande-izq'],
        [K.Et + 0.8, K.Ci - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ci + 0.2, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="51" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RhizobiumApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Rhizobium /></CompositionStage></div>;
}
window.RhizobiumApp = RhizobiumApp;
