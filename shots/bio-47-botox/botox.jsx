// Shot Biotecnológico #47 · El veneno más potente también es medicina (toxina botulínica) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todo el dibujo es esquemático y no está a escala.
const PIEL = '#f1b48f', PIEL2 = '#d98f6b', TOX = '#ff3b2f', SNAP = '#F4C25A', VES = '#7fdcff', MUS = '#e36b6b';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Calavera de advertencia (dentro de un <g>)
function Calavera({ x, y, s = 1, color = KC.ink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-8} r={34} fill="#fff" stroke={color} strokeWidth={5} />
    <rect x={-18} y={16} width={36} height={22} rx={6} fill="#fff" stroke={color} strokeWidth={5} />
    <circle cx={-13} cy={-10} r={9} fill={color} /><circle cx={13} cy={-10} r={9} fill={color} />
    <path d="M -3 8 L 0 1 L 3 8 Z" fill={color} />
    <line x1={-7} y1={22} x2={-7} y2={36} stroke={color} strokeWidth={3} /><line x1={7} y1={22} x2={7} y2={36} stroke={color} strokeWidth={3} />
  </g>;
}
function CruzMedica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -12 -36 H 12 V -12 H 36 V 12 H 12 V 36 H -12 V 12 H -36 V -12 H -12 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}

// Frasquito de vidrio con tapa de aluminio y polvo blanco. etq 0..1 voltea la etiqueta (arrugas → calavera). cruz: calavera + cruz.
function Frasco({ T = 0, x, y, s = 1, etq = 0, cruz = false, rot = 0, polvo = 1 }) {
  const gira = Math.abs(Math.cos(Math.PI * etq));
  const atras = etq > 0.5;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={168} rx={120} ry={18} fill="rgba(0,0,0,.18)" />
    {/* cuerpo */}
    <path d="M -95 -70 Q -95 -100 -60 -110 L -50 -150 L 50 -150 L 60 -110 Q 95 -100 95 -70 L 95 140 Q 95 165 70 165 L -70 165 Q -95 165 -95 140 Z" fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={9} />
    {/* polvo (pastilla liofilizada) */}
    <path d={`M -82 ${150 - 60 * polvo} Q 0 ${135 - 60 * polvo} 82 ${150 - 60 * polvo} L 82 140 Q 82 154 68 154 L -68 154 Q -82 154 -82 140 Z`} fill="#fbfaf6" stroke="#c9c3b6" strokeWidth={4} opacity={polvo > 0.02 ? 1 : 0} />
    <rect x={-76} y={-92} width={22} height={200} rx={11} fill="#fff" opacity={0.55} />
    {/* tapa */}
    <rect x={-66} y={-196} width={132} height={52} rx={12} fill="#c7ccd2" stroke={KC.ink} strokeWidth={8} />
    <rect x={-56} y={-222} width={112} height={30} rx={10} fill={KC.coral} stroke={KC.ink} strokeWidth={7} />
    {/* etiqueta que se voltea */}
    <g transform={`scale(${Math.max(gira, 0.02)} 1)`}>
      <rect x={-96} y={-40} width={192} height={130} rx={10} fill={atras ? KC.yellow : '#fff'} stroke={KC.ink} strokeWidth={6} />
      {!atras && <g>
        <text x={0} y={2} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>arrugas</text>
        {[0, 1, 2].map((k) => <path key={k} d={`M -60 ${30 + k * 16} q 15 -8 30 0 t 30 0 t 30 0 t 30 0`} fill="none" stroke="#b9a89a" strokeWidth={4} />)}
      </g>}
      {atras && !cruz && <Calavera x={0} y={22} s={1.15} />}
      {atras && cruz && <g><Calavera x={-46} y={22} s={0.95} /><CruzMedica x={48} y={24} s={0.9} /></g>}
    </g>
    <circle cx={60 + Math.sin(T * 2) * 6} cy={-60} r={7} fill="#fff" opacity={0.8} />
  </g>;
}

// Cara de frente. desvio 0..1: un ojo se desvía hacia la nariz (estrabismo). parpado 0..1: el párpado se cierra.
function Cara({ T = 0, x, y, r = 160, desvio = 0, parpado = 0, parpadoDer = null, gesto = 0 }) {
  const ojo = (lx, des, pp) => {
    const ex = lx, ey = -r * 0.08, rw = r * 0.2, rh = r * 0.13;
    const ix = ex + des, iris = r * 0.095;
    return <g>
      <clipPath id={`co${Math.round(lx)}${Math.round(r)}`}><ellipse cx={ex} cy={ey} rx={rw} ry={rh} /></clipPath>
      <ellipse cx={ex} cy={ey} rx={rw} ry={rh} fill="#fff" stroke={KC.ink} strokeWidth={r * 0.03} />
      <g clipPath={`url(#co${Math.round(lx)}${Math.round(r)})`}>
        <circle cx={ix} cy={ey} r={iris} fill="#6b4226" /><circle cx={ix} cy={ey} r={iris * 0.5} fill={KC.ink} />
        <circle cx={ix + iris * 0.35} cy={ey - iris * 0.35} r={iris * 0.25} fill="#fff" />
        <rect x={ex - rw - 4} y={ey - rh - 4} width={rw * 2 + 8} height={(rh * 2 + 8) * pp} fill={PIEL2} />
      </g>
      {pp > 0.05 && <line x1={ex - rw} x2={ex + rw} y1={ey - rh + (rh * 2) * pp} y2={ey - rh + (rh * 2) * pp} stroke={KC.ink} strokeWidth={r * 0.025} strokeLinecap="round" />}
      <path d={`M ${ex - rw * 1.1} ${ey - rh * 1.9 - gesto * r * 0.05} Q ${ex} ${ey - rh * 2.6} ${ex + rw * 1.1} ${ey - rh * 1.9 + gesto * r * 0.05}`} fill="none" stroke="#5a3a26" strokeWidth={r * 0.045} strokeLinecap="round" />
    </g>;
  };
  const pd = parpadoDer == null ? parpado : parpadoDer;
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={-r * 0.98} cy={0} rx={r * 0.16} ry={r * 0.24} fill={PIEL} stroke={KC.ink} strokeWidth={r * 0.04} />
    <ellipse cx={r * 0.98} cy={0} rx={r * 0.16} ry={r * 0.24} fill={PIEL} stroke={KC.ink} strokeWidth={r * 0.04} />
    <ellipse cx={0} cy={0} rx={r} ry={r * 1.12} fill={PIEL} stroke={KC.ink} strokeWidth={r * 0.05} />
    <path d={`M ${-r * 0.98} ${-r * 0.25} Q ${-r * 1.05} ${-r * 1.25} 0 ${-r * 1.18} Q ${r * 1.05} ${-r * 1.25} ${r * 0.98} ${-r * 0.25} Q ${r * 0.7} ${-r * 0.85} 0 ${-r * 0.78} Q ${-r * 0.7} ${-r * 0.85} ${-r * 0.98} ${-r * 0.25} Z`} fill="#3b2a20" stroke={KC.ink} strokeWidth={r * 0.04} />
    {ojo(-r * 0.4, 0, parpado)}
    {ojo(r * 0.4, -desvio * r * 0.11, pd)}
    <path d={`M 0 ${r * 0.0} Q ${-r * 0.1} ${r * 0.28} ${r * 0.02} ${r * 0.32}`} fill="none" stroke={PIEL2} strokeWidth={r * 0.04} strokeLinecap="round" />
    <path d={`M ${-r * 0.28} ${r * 0.55} Q 0 ${r * 0.66} ${r * 0.28} ${r * 0.55}`} fill="none" stroke={KC.ink} strokeWidth={r * 0.045} strokeLinecap="round" />
  </g>;
}

// Jeringa con aguja finísima. (x, y) = punta de la aguja; ang = dirección hacia donde apunta la aguja (grados).
function Jeringa({ x, y, ang = 180, s = 1, o = 1, empuja = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={-110} y2={0} stroke="#9aa3ad" strokeWidth={4} />
    <rect x={-330} y={-26} width={220} height={52} rx={8} fill="rgba(230,245,255,.9)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-330 + 20 + empuja * 120} y={-20} width={190 - empuja * 120} height={40} fill="rgba(255,255,255,.55)" />
    <rect x={-330 + empuja * 120 - 8} y={-30} width={14} height={60} fill="#6f7a84" stroke={KC.ink} strokeWidth={4} />
    <rect x={-420 + empuja * 120} y={-6} width={90} height={12} fill="#6f7a84" stroke={KC.ink} strokeWidth={4} />
    <rect x={-440 + empuja * 120} y={-34} width={20} height={68} rx={6} fill="#6f7a84" stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={-290 + k * 45} y1={-26} x2={-290 + k * 45} y2={-8} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}

// Bacilo de Clostridium botulinum con espora oval SUBTERMINAL (cerca de un extremo, no en la punta) que abulta un poco la célula.
function Clostridium({ T = 0, x, y, L = 300, W = 70, rot = 0, seed = 1, espora = 1 }) {
  const sx = L / 2 - W * 1.05, bul = espora ? 1.16 : 1;
  const g = krng(seed), gr = Array.from({ length: 7 }, () => [(g() - 0.5) * (L - W * 2.6) - W * 0.3, (g() - 0.5) * W * 0.5, 3 + g() * 4]);
  const ola = mece(T, seed, 0.4) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${rot + ola})`}>
    {/* contorno (las dos formas con borde, luego el relleno encima para que se fundan) */}
    <rect x={-L / 2} y={-W / 2} width={L} height={W} rx={W / 2} fill="none" stroke="#e9fff4" strokeWidth={10} />
    {espora > 0 && <ellipse cx={sx} cy={0} rx={W * 0.62} ry={(W / 2) * bul} fill="none" stroke="#e9fff4" strokeWidth={10} />}
    <rect x={-L / 2} y={-W / 2} width={L} height={W} rx={W / 2} fill="#3fbf8a" />
    {espora > 0 && <ellipse cx={sx} cy={0} rx={W * 0.62} ry={(W / 2) * bul} fill="#3fbf8a" />}
    <rect x={-L / 2 + W * 0.4} y={-W / 2 + 8} width={L - W * 1.6} height={W * 0.16} rx={W * 0.08} fill="#fff" opacity={0.25} />
    {gr.map(([a, b, c], i) => <circle key={i} cx={a} cy={b} r={c} fill="#0b3d2a" opacity={0.35} />)}
    {espora > 0 && <ellipse cx={sx} cy={0} rx={W * 0.42} ry={W * 0.3} fill="#f6fff9" stroke="#0b3d2a" strokeWidth={4} opacity={espora} />}
  </g>;
}

// Lata abultada (la tapa y el fondo se inflan hacia afuera)
function Lata({ T = 0, x, y, s = 1, abulta = 1 }) {
  const b = 26 + abulta * (20 + Math.sin(T * 3) * 4);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={170 + b * 0.6} rx={150} ry={20} fill="rgba(0,0,0,.18)" />
    <path d={`M -120 -130 Q 0 ${-130 - b * 2} 120 -130 L 120 130 Q 0 ${130 + b * 2} -120 130 Z`} fill="#c7ccd2" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-80} width={240} height={160} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>conserva</text>
    <path d="M -70 30 q 35 -30 70 0 t 70 0" fill="none" stroke={KC.ink} strokeWidth={6} />
    <path d={`M -120 -130 Q 0 ${-130 - b * 2} 120 -130`} fill="none" stroke="#fff" strokeWidth={5} opacity={0.6} transform="translate(0 12)" />
  </g>;
}

// Brazo de lado: hombro a la derecha, codo en (ex, ey); flex 0..1 dobla el antebrazo hacia arriba y saca el bíceps.
function Brazo({ T, flex = 0, ex = 330, ey = 1080 }) {
  const a = klerp(196, 102, flex) * Math.PI / 180, L = 470;
  const hx = ex + Math.cos(a) * L, hy = ey - Math.sin(a) * L;
  return <g>
    <line x1={ex} y1={ey} x2={1200} y2={ey + 30} stroke={KC.ink} strokeWidth={232} strokeLinecap="round" />
    <line x1={ex} y1={ey} x2={1200} y2={ey + 30} stroke={PIEL} strokeWidth={214} strokeLinecap="round" />
    <ellipse cx={720} cy={ey - 80 - flex * 30} rx={250} ry={60 + flex * 60} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <rect x={720} y={ey - 120} width={500} height={240} fill={PIEL} />
    <line x1={ex} y1={ey} x2={hx} y2={hy} stroke={KC.ink} strokeWidth={192} strokeLinecap="round" />
    <line x1={ex} y1={ey} x2={hx} y2={hy} stroke={PIEL} strokeWidth={174} strokeLinecap="round" />
    <circle cx={hx} cy={hy} r={100} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${hx - 60} ${hy - 40} q 30 -30 60 0 M ${hx - 40} ${hy + 10} q 30 -30 60 0`} fill="none" stroke={PIEL2} strokeWidth={8} strokeLinecap="round" />
    <path d={`M 940 ${ey - 170} L 1090 ${ey - 170} L 1090 ${ey + 170} L 940 ${ey + 170} Q 900 ${ey} 940 ${ey - 170} Z`} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
  </g>;
}

// Por dentro: punta del nervio (vesículas con acetilcolina, amarradas por la SNAP-25) y la fibra del músculo.
// Coordenadas locales 0..2r. K = cues. cortes = momentos en que se corta la SNAP-25 de cada vesícula.
function NervioPorDentro({ T, r, K }) {
  const S = 2 * r, cx = r, my = r * 1.18, fibra = r * 1.42;
  const cortes = [K.Co + 1.5, K.Co + 2.0, K.Co + 2.5];
  const docks = [cx - r * 0.42, cx, cx + r * 0.42];
  const per = 1.3;
  // contracción del músculo: picos tras cada liberación (antes de que la toxina corte)
  let contr = 0;
  const lib = [];
  docks.forEach((dx, i) => {
    for (let k = 0; k < 10; k++) {
      const t0 = K.Ne + 0.5 + i * 0.42 + k * per;
      if (t0 > cortes[i] - 0.4 || t0 > T + 0.01) break;
      const u = T - t0;
      if (u >= 0 && u < 1.2) { lib.push([dx, u, i * 10 + k]); contr = Math.max(contr, Math.exp(-Math.pow((u - 0.55) / 0.3, 2))); }
    }
  });
  const relaja = kprog(T, K.Si, K.Si + 1.2);
  const paso = 34 * (1 - contr * 0.35) + relaja * 6;
  const tox = kprog(T, K.Co + 0.1, K.Co + 1.3, kEase.suave);
  const tx = klerp(-r * 0.2, cx - r * 0.2, tox), ty = klerp(r * 0.35, my - r * 0.3, tox);
  const tijera = T > K.Co + 1.3 ? Math.abs(Math.sin((T - K.Co) * 9)) : 0.3;
  const objetivo = cortes.findIndex((c) => T < c + 0.15);
  const lxT = objetivo >= 0 && T > K.Co + 1.3 ? klerp(tx, docks[objetivo], kprog(T, cortes[objetivo] - 0.45, cortes[objetivo] - 0.05)) : tx;
  return <svg width={S} height={S} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={S} height={S} fill="#0b1220" />
    {/* fibra muscular con estrías */}
    <rect x={-20} y={fibra} width={S + 40} height={S - fibra + 20} fill={mixHex(MUS, '#a65a5a', relaja)} />
    {Array.from({ length: 40 }, (_, i) => { const xx = cx + (i - 20) * paso; return <rect key={i} x={xx - 5} y={fibra + 18} width={10} height={S - fibra} fill="#8f2f3a" opacity={0.65} />; })}
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${cx - r * 0.75 + i * r * 0.19 - 14} ${fibra} q 14 16 28 0`} fill="none" stroke="#ffd0d0" strokeWidth={5} />)}
    {/* axón y terminal */}
    <path d={`M ${cx - 46} -10 L ${cx - 46} ${r * 0.35} Q ${cx - r * 0.9} ${r * 0.45} ${cx - r * 0.85} ${my - 40} Q ${cx - r * 0.8} ${my} ${cx - r * 0.5} ${my} L ${cx + r * 0.5} ${my} Q ${cx + r * 0.8} ${my} ${cx + r * 0.85} ${my - 40} Q ${cx + r * 0.9} ${r * 0.45} ${cx + 46} ${r * 0.35} L ${cx + 46} -10 Z`} fill="#3a3355" stroke="#ffcf5a" strokeWidth={8} />
    {/* vesículas sueltas dentro */}
    {[[cx - r * 0.35, r * 0.62], [cx + r * 0.1, r * 0.55], [cx + r * 0.4, r * 0.72], [cx - r * 0.05, r * 0.8]].map(([vx, vy], i) =>
      <g key={i} transform={`translate(${vx + mece(T, i + 3, 0.5) * 6} ${vy + mece(T, i + 7, 0.4) * 6})`}>
        <circle r={24} fill={VES} stroke="#e8fbff" strokeWidth={4} opacity={0.9} />
        {[[-7, -5], [6, -6], [0, 7]].map(([a, b], j) => <circle key={j} cx={a} cy={b} r={4} fill="#1d3b6a" />)}
      </g>)}
    {/* vesículas amarradas a la membrana por la SNAP-25 */}
    {docks.map((dx, i) => {
      const cort = T >= cortes[i], abre = kprog(T, cortes[i], cortes[i] + 0.5, kEase.sale);
      const vy = my - 42;
      const activa = lib.filter((l) => l[0] === dx).map((l) => l[1])[0];
      const fusion = activa != null ? Math.max(0, 1 - Math.abs(activa - 0.25) / 0.25) : 0;
      return <g key={i}>
        {!cort ? <g>
          <path d={`M ${dx - 14} ${vy + 18} Q ${dx - 24} ${my - 8} ${dx - 18} ${my}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M ${dx + 14} ${vy + 18} Q ${dx + 24} ${my - 8} ${dx + 18} ${my}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
        </g> : <g opacity={1 - abre * 0.3}>
          <path d={`M ${dx - 14} ${vy + 18} q ${-10 - abre * 18} 6 ${-16 - abre * 20} ${8 - abre * 14}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M ${dx - 18} ${my} q ${-6 - abre * 12} -6 ${-10 - abre * 16} ${-4 - abre * 4}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M ${dx + 14} ${vy + 18} q ${10 + abre * 18} 6 ${16 + abre * 20} ${8 - abre * 14}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M ${dx + 18} ${my} q ${6 + abre * 12} -6 ${10 + abre * 16} ${-4 - abre * 4}`} stroke={SNAP} strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>}
        <g transform={`translate(${dx} ${vy + fusion * 14})`}>
          <circle r={28} fill={VES} stroke="#e8fbff" strokeWidth={4} />
          {fusion < 0.5 && [[-8, -6], [8, -7], [0, 8]].map(([a, b], j) => <circle key={j} cx={a} cy={b} r={5} fill="#1d3b6a" />)}
        </g>
      </g>;
    })}
    {/* acetilcolina que cruza hacia el músculo */}
    {lib.map(([dx, u, k]) => { const g = krng(k + 11); return Array.from({ length: 6 }, (_, j) => { const ang = (g() - 0.5) * 1.2, d = kprog(u, 0.25, 0.9, kEase.sale);
      return <circle key={`${k}-${j}`} cx={dx + Math.sin(ang) * 60 * d} cy={my + 8 + (fibra - my - 4) * d} r={6} fill="#9cf7ff" opacity={1 - kprog(u, 0.95, 1.2)} />; }); })}
    {/* toxina: cadena pesada (azul) + cadena ligera que corta (roja) */}
    {T > K.Co - 0.1 && <g opacity={kprog(T, K.Co - 0.1, K.Co + 0.3)}>
      <g transform={`translate(${tx} ${ty}) rotate(${-25 + Math.sin(T * 2) * 5})`}>
        <rect x={-70} y={-16} width={110} height={32} rx={16} fill="#5b7cff" stroke="#e8f0ff" strokeWidth={4} />
      </g>
      <g transform={`translate(${lxT} ${klerp(ty, my - 2, objetivo >= 0 && T > K.Co + 1.3 ? 1 : 0)})`}>
        <path d={`M 0 0 L ${30} ${-14 - tijera * 14} A 32 32 0 1 0 ${30} ${14 + tijera * 14} Z`} fill={TOX} stroke="#fff" strokeWidth={4} />
      </g>
      {T > K.Co + 1.3 && objetivo >= 0 && <line x1={tx} y1={ty} x2={lxT} y2={my - 2} stroke="#e8f0ff" strokeWidth={3} strokeDasharray="6 6" />}
    </g>}
    {/* rótulos */}
    <text x={cx} y={r * 0.22} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#ffcf5a">punta del nervio</text>
    <text x={cx} y={S - 30} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#ffe0e0">músculo</text>
    {T < K.Co && <text x={cx + r * 0.55} y={r * 0.5} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={VES}>vesícula</text>}
    {T >= K.Co + 0.8 && <text x={cx + r * 0.62} y={my + 40} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={SNAP}>SNAP-25</text>}
    {T >= K.Co && T < K.Si && <text x={tx} y={ty - 34} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#ffb3ad">toxina</text>}
  </svg>;
}

// Mono (cabeza esquemática de macaco)
function Mono({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 4})`}>
    <circle cx={-150} cy={-10} r={50} fill="#a8774f" stroke={KC.ink} strokeWidth={8} /><circle cx={150} cy={-10} r={50} fill="#a8774f" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-150} cy={-10} r={24} fill="#e9b9a0" /><circle cx={150} cy={-10} r={24} fill="#e9b9a0" />
    <ellipse cx={0} cy={0} rx={150} ry={160} fill="#a8774f" stroke={KC.ink} strokeWidth={9} />
    <path d="M -95 -40 Q -100 -110 0 -105 Q 100 -110 95 -40 Q 120 60 60 110 Q 0 140 -60 110 Q -120 60 -95 -40 Z" fill="#e9b9a0" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-42} cy={-40} r={20} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={42} cy={-40} r={20} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-40} cy={-38} r={9} fill={KC.ink} /><circle cx={40} cy={-38} r={9} fill={KC.ink} />
    <ellipse cx={-12} cy={20} rx={7} ry={5} fill={KC.ink} /><ellipse cx={12} cy={20} rx={7} ry={5} fill={KC.ink} />
    <path d="M -40 70 Q 0 92 40 70" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}

// Sello circular
function Sello({ x, y, T, at, texto1, texto2 }) {
  const p = kprog(T, at, at + 0.35, kEase.rebote);
  if (T < at) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(2.2, 1, p)}) rotate(-12)`} opacity={kprog(T, at, at + 0.15)}>
    <circle r={150} fill="rgba(255,255,255,.85)" stroke={KC.red} strokeWidth={12} />
    <circle r={124} fill="none" stroke={KC.red} strokeWidth={5} strokeDasharray="10 8" />
    <text y={-12} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.red}>{texto1}</text>
    <text y={52} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>{texto2}</text>
  </g>;
}

// Cabeza con dolor (migraña) y torso con brazo arriba y gotas de sudor
function CabezaDolor({ T, x, y, s = 1, o = 1 }) {
  const late = 1 + 0.08 * Math.max(0, Math.sin(T * 7));
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Cara T={T} x={0} y={0} r={140} gesto={1} parpado={0.35} />
    {[[-170, -150, -20], [170, -150, 20], [0, -210, 0]].map(([a, b, rr], i) => <path key={i} transform={`translate(${a} ${b}) rotate(${rr}) scale(${late})`} d="M -10 -40 L 18 -6 L 2 -2 L 14 36 L -18 -4 L -2 -8 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
  </g>;
}
function TorsoSudor({ T, x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -130 220 L -130 20 Q -130 -60 -40 -70 L 60 -70 Q 140 -60 140 20 L 140 220 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={9} />
    <path d="M 80 -40 Q 150 -120 170 -330" stroke={KC.ink} strokeWidth={92} fill="none" strokeLinecap="round" />
    <path d="M 80 -40 Q 150 -120 170 -330" stroke={PIEL} strokeWidth={76} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-150} r={78} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -78 -170 Q -60 -240 0 -232 Q 60 -240 78 -170 Q 40 -200 0 -196 Q -40 -200 -78 -170 Z" fill="#3b2a20" />
    <ellipse cx={105} cy={-30} rx={34} ry={22} fill={PIEL2} />
    {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.9 + i * 0.25) % 1); return <path key={i} d="M 0 -16 Q 12 0 0 10 Q -12 0 0 -16 Z" transform={`translate(${100 + (i % 2) * 24} ${-10 + u * 150}) scale(1.4)`} fill="#7fc8ff" stroke={KC.ink} strokeWidth={2.5} opacity={1 - u} />; })}
  </g>;
}

// Calendario que pasa hojas
function Calendario({ T, x, y, at, n = 4 }) {
  const k = Math.min(n, Math.floor(Math.max(0, T - at) / 0.8));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-110} width={240} height={230} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-110} width={240} height={60} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {[-60, 60].map((a) => <rect key={a} x={a - 8} y={-136} width={16} height={46} rx={8} fill="#6f7a84" stroke={KC.ink} strokeWidth={4} />)}
    <text x={0} y={-66} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">MES</text>
    <text x={0} y={66} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{k + 1}</text>
  </g>;
}

// Justinus Kerner (retrato esquemático, ropa de principios del siglo XIX)
function Kerner({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.2) * 2})`}>
    <path d="M -230 330 Q -230 120 -110 90 L 110 90 Q 230 120 230 330 Z" fill="#2c2f4a" stroke={KC.ink} strokeWidth={9} />
    <path d="M -60 90 L 0 200 L 60 90 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 100 Q 0 140 50 100 L 30 150 Q 0 130 -30 150 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 92 L -110 90 L -60 200 Z M 40 92 L 110 90 L 60 200 Z" fill="#3c4064" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-30} rx={110} ry={130} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -112 -40 Q -130 -190 0 -175 Q 130 -190 112 -40 Q 100 -120 30 -130 Q -60 -150 -112 -40 Z" fill="#8a5a3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -108 -20 Q -112 40 -88 70 L -80 0 Z M 108 -20 Q 112 40 88 70 L 80 0 Z" fill="#8a5a3a" />
    <circle cx={-40} cy={-40} r={9} fill={KC.ink} /><circle cx={40} cy={-40} r={9} fill={KC.ink} />
    <path d="M -60 -70 q 20 -10 40 0 M 20 -70 q 20 -10 40 0" stroke="#5a3a26" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 0 -30 Q -12 10 4 14" stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -30 50 Q 0 60 30 50" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
function Salchicha({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -170 0 Q -170 -60 -100 -60 L 100 -60 Q 170 -60 170 0 Q 170 60 100 60 L -100 60 Q -170 60 -170 0 Z" fill="#b5523a" stroke={KC.ink} strokeWidth={9} />
    <path d="M -110 -30 Q 0 -44 110 -30" stroke="#fff" strokeWidth={8} opacity={0.4} fill="none" strokeLinecap="round" />
    {[-90, -20, 50, 110].map((a, i) => <circle key={i} cx={a} cy={10 + (i % 2) * 14} r={7} fill="#f2c9a8" />)}
    <path d="M -170 0 l -30 -14 M -170 0 l -30 14 M 170 0 l 30 -14 M 170 0 l 30 14" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
function Libro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-8)`}>
    <rect x={-120} y={-150} width={240} height={300} rx={12} fill="#7a3b2a" stroke={KC.ink} strokeWidth={9} />
    <rect x={-96} y={-120} width={192} height={240} rx={6} fill="none" stroke={KC.gold2} strokeWidth={5} />
    <text x={0} y={-30} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>1817</text>
    <text x={0} y={20} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.gold2}>VENENO</text>
    <text x={0} y={70} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>1822</text>
  </g>;
}
// Embudo con filtro
function Filtro({ T, x, y, s = 1, gotea = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -70 L 110 -70 L 20 40 L 20 110 L -20 110 L -20 40 Z" fill="rgba(230,245,255,.85)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -90 -60 L 90 -60 L 0 30 Z" fill="#fbfaf6" stroke="#b9b3a6" strokeWidth={4} />
    <path d="M -80 -60 Q 0 -40 80 -60" fill="#e6b76a" opacity={0.6 + 0.2 * Math.sin(T * 3)} />
  </g>;
}

function Botox() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ba: CUES.Bacteria, Do: CUES.Dosis, Ne: CUES.Nervio, Co: CUES.Corte, Si: CUES.Silencio, Pr: CUES.Pregunta, Es: CUES.Estudio,
    Ap: CUES.Aprobacion, Us: CUES.Usos, Fa: CUES.Fabrica, Cl: CUES.Clave, Ke: CUES.Kerner, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const flip0 = kprog(T, K.G + 1.6, K.G + 2.3, kEase.suave);
  // brazo: se dobla y se estira mientras hay órdenes; flojo cuando ya no
  const flexBrazo = T < K.Co + 2.2 ? 0.5 + 0.5 * Math.sin((T - K.Ne) * 2.4 - 1.2) * (T > K.Ne + 0.3 ? 1 : 0.2) : klerp(0.5, 0, kprog(T, K.Co + 2.2, K.Si + 1.0, kEase.suave));
  // espasmo del párpado (blefaroespasmo) hasta la inyección
  const espasmo = (t0) => kclamp(0.55 + 0.45 * Math.sin(T * 13) * Math.sin(T * 3.1), 0, 1);
  const inyCl = K.Cl + 1.0;
  const pdCl = T < inyCl + 0.6 ? espasmo() : klerp(espasmo(), 0.08, kprog(T, inyCl + 0.6, inyCl + 1.6));
  const alinea = kprog(T, K.Es + 3.6, K.Es + 5.2, kEase.suave);
  const pdAp = T < K.Ap + 2.4 ? espasmo() : 0.08;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frasquito y la cara */}
      <Escena T={T} a={K.G} b={K.Ba} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Frasco T={T} x={330} y={960} s={1.35} etq={flip0} rot={Math.sin(T * 1.6) * 4} />
          <Cara T={T} x={790} y={985} r={145} desvio={1} />
        </Capa>
      </Escena>
      {/* 1 · la bacteria (lata abultada + microscopio) */}
      <Escena T={T} a={K.Ba} b={K.Do} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa><Lata T={T} x={250} y={1020} s={1} abulta={1} /></Capa>
      </Escena>
      <Lupa T={T} at={K.Ba + 0.25} until={K.Do - 0.3} x={640} y={720} r={270} fx={250} fy={1000} tinte={KC.mint} etiqueta="AL MICROSCOPIO · BACTERIA"
        interior={(T, r) => <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
          <rect width={2 * r} height={2 * r} fill="#081a14" />
          <Clostridium T={T} x={r - 10 + Math.sin(T) * 10} y={r} L={330} W={78} rot={-12} seed={2} />
          <Clostridium T={T} x={r - 120} y={r - 160} L={250} W={64} rot={28} seed={5} espora={0} />
          <Clostridium T={T} x={r + 140} y={r + 170} L={260} W={66} rot={160} seed={7} />
          <Clostridium T={T} x={r + 150} y={r - 150} L={210} W={60} rot={70} seed={9} espora={0} />
          <line x1={r - 10 + 165 - 82} y1={r - 20} x2={r + 90} y2={r - 90} stroke="#f6fff9" strokeWidth={3} />
          <text x={r + 96} y={r - 96} style={{ font:`700 26px ${KF.mono}` }} fill="#f6fff9">espora</text>
          <text x={r} y={2 * r - 34} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#9fe8c8">esquema · no a escala</text>
        </svg>} />
      {/* 2 · la dosis */}
      <Escena T={T} a={K.Do} b={K.Ne} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <g transform="translate(600 1060)">
            <line x1={0} y1={-70} x2={0} y2={80} stroke={KC.ink} strokeWidth={14} />
            <rect x={-90} y={70} width={180} height={26} rx={10} fill="#6f7a84" stroke={KC.ink} strokeWidth={6} />
            <g transform={`rotate(${Math.sin(T * 1.3) * 1.2})`}>
              <line x1={-260} y1={-70} x2={260} y2={-70} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
              {[-1, 1].map((d) => <g key={d}><line x1={d * 250} y1={-70} x2={d * 250 - 70} y2={10} stroke={KC.ink} strokeWidth={4} /><line x1={d * 250} y1={-70} x2={d * 250 + 70} y2={10} stroke={KC.ink} strokeWidth={4} />
                <path d={`M ${d * 250 - 90} 10 Q ${d * 250} 60 ${d * 250 + 90} 10 Z`} fill="#c7ccd2" stroke={KC.ink} strokeWidth={6} /></g>)}
              <circle cx={-250} cy={14} r={3 + Math.max(0, Math.sin(T * 5)) * 2} fill={KC.red} />
              <circle cx={-250} cy={14} r={22 + Math.max(0, Math.sin(T * 5)) * 8} fill="none" stroke={KC.red} strokeWidth={4} opacity={0.7} />
            </g>
          </g>
        </Capa>
      </Escena>
      <NumeroGigante T={T} at={K.Do + 0.3} until={K.Ne - 0.3} valor={1} desde={1} prefijo="< " sufijo=" µg" x={600} y={800} tam={250} color={KC.red} />
      {/* 3–5 · el nervio por dentro */}
      <Escena T={T} a={K.Ne} b={K.Pr} zoom={0.02}>
        <FondoLunares color={KC.mint} />
        <Capa><Brazo T={T} flex={kclamp(flexBrazo, 0, 1)} /></Capa>
      </Escena>
      <Lupa T={T} at={K.Ne + 0.2} until={K.Pr - 0.35} x={680} y={700} r={290} fx={700} fy={960} tinte={KC.cyan} etiqueta="POR DENTRO · NERVIO Y MÚSCULO"
        interior={(T, r) => <NervioPorDentro T={T} r={r} K={K} />} />
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <text x={280} y={900} textAnchor="middle" style={{ font:`400 460px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 760)`}>?</text>
          <Frasco T={T} x={280} y={1080} s={0.7} etq={1} rot={Math.sin(T * 2) * 6} />
        </Capa>
      </Escena>
      {/* 7 · estudio: monos y ojos desviados */}
      <Escena T={T} a={K.Es} b={K.Ap}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          {T < K.Es + 2.75 && <g opacity={1 - kprog(T, K.Es + 2.45, K.Es + 2.75)}><Mono T={T} x={540} y={960} s={1.1} />
            <Jeringa x={720} y={940} ang={200} s={0.7} o={kprog(T, K.Es + 1.4, K.Es + 1.7)} empuja={kprog(T, K.Es + 1.8, K.Es + 2.3)} /></g>}
          {T >= K.Es + 2.6 && <g opacity={kprog(T, K.Es + 2.6, K.Es + 2.95)}>
            <Cara T={T} x={540} y={950} r={250} desvio={1 - alinea} />
            <Jeringa x={540 + 100 + 30 * (1 - kprog(T, K.Es + 2.9, K.Es + 3.3))} y={930} ang={190} s={0.8} o={kprog(T, K.Es + 2.9, K.Es + 3.1) * (1 - kprog(T, K.Es + 3.9, K.Es + 4.2))} empuja={kprog(T, K.Es + 3.3, K.Es + 3.8)} />
          </g>}
        </Capa>
      </Escena>
      {/* 8 · aprobación 1989 */}
      <Escena T={T} a={K.Ap} b={K.Us} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Sello T={T} at={K.Ap + 0.4} x={320} y={610} texto1="FDA" texto2="29 dic 1989" />
          <Cara T={T} x={290} y={900} r={160} desvio={0} />
          <Cara T={T} x={790} y={900} r={160} parpado={pdAp} />
          <text x={290} y={1110} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ap + 1.2, K.Ap + 1.6)}>estrabismo</text>
          <text x={790} y={1110} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ap + 2.0, K.Ap + 2.4)}>blefaroespasmo</text>
        </Capa>
      </Escena>
      {/* 9 · otros usos */}
      <Escena T={T} a={K.Us} b={K.Fa} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <CabezaDolor T={T} x={290} y={840} o={kprog(T, K.Us + 0.2, K.Us + 0.6)} />
          <TorsoSudor T={T} x={760} y={860} o={kprog(T, K.Us + 1.3, K.Us + 1.7)} />
          <text x={290} y={1110} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Us + 0.4, K.Us + 0.8)}>migraña crónica</text>
          <text x={760} y={1120} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Us + 1.5, K.Us + 1.9)}>sudor excesivo</text>
        </Capa>
      </Escena>
      {/* 10 · fabricación: tanque, filtro, frasquito */}
      <Escena T={T} a={K.Fa} b={K.Cl} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, transform:'translate(-110px, 0) scale(0.62)', transformOrigin:'540px 700px' }}>
          <MundoBiorreactor T={T} turbio={0.75} burbujas={1} rpm={70} fondo={KC.cyan} />
        </div>
        <Capa>
          <path d="M 720 820 Q 860 820 880 760" fill="none" stroke="#9aa4ae" strokeWidth={18} strokeLinecap="round" />
          <Filtro T={T} x={890} y={760} s={0.8} />
          <Goteo T={T} x={890} y0={860} y1={1010} cada={0.35} color="#f6e7b8" desde={K.Fa + 0.8} hasta={K.Cl} r={9} />
          <Frasco T={T} x={890} y={1120} s={0.55} etq={1} cruz polvo={kprog(T, K.Fa + 1.0, K.Fa + 3.2)} />
        </Capa>
      </Escena>
      {/* 11 · la clave es la dosis */}
      <Escena T={T} a={K.Cl} b={K.Ke} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Cara T={T} x={400} y={900} r={250} parpado={0.08} parpadoDer={pdCl} />
          <Jeringa x={500 + 160 - 40 * kprog(T, K.Cl + 0.3, K.Cl + 0.7)} y={800} ang={200} s={0.75} o={kprog(T, K.Cl + 0.2, K.Cl + 0.4) * (1 - kprog(T, inyCl + 0.4, inyCl + 0.7))} empuja={kprog(T, K.Cl + 0.7, inyCl)} />
          {T > inyCl && <circle cx={520} cy={815} r={klerp(20, 90, kprog(T, inyCl, inyCl + 0.6, kEase.sale))} fill="rgba(255,225,26,.18)" stroke={KC.gold} strokeWidth={6} strokeDasharray="12 8" opacity={1 - kprog(T, K.Cl + 2.4, K.Ke - 0.4)} />}
          {T > K.Cl + 2.0 && <Calendario T={T} x={850} y={1010} at={K.Cl + 2.1} n={3} />}
        </Capa>
      </Escena>
      {/* 12 · Kerner, hace dos siglos */}
      <Escena T={T} a={K.Ke} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#f1e3c2' }}></div>
        <Capa>
          <Kerner T={T} x={680} y={880} s={1} />
          <Libro x={260} y={860} s={0.85} />
          <Salchicha x={290} y={1130} s={0.9} rot={-6} />
          {T > K.Ke + 2.2 && <g transform={`translate(860 ${600 - kprog(T, K.Ke + 2.2, K.Ke + 2.8, kEase.rebote) * 30})`} opacity={kprog(T, K.Ke + 2.2, K.Ke + 2.6)}>
            <circle r={70} fill="#fff" stroke={KC.ink} strokeWidth={6} /><CruzMedica x={0} y={0} s={1.1} />
            <circle cx={-80} cy={70} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={-110} cy={110} r={9} fill="#fff" stroke={KC.ink} strokeWidth={4} />
          </g>}
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.12)" />
        </Capa>
      </Escena>
      {/* 13 · cierre: el frasquito y la cara del inicio, transformados */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Frasco T={T} x={330} y={960} s={1.35} etq={1} cruz rot={Math.sin(T * 1.6) * 4} />
          <Cara T={T} x={790} y={985} r={145} desvio={0} />
        </Capa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.G + 3.0} texto="¿solo para arrugas?" x={330} y={470} tam={44} />
      <Chip T={T} at={K.G + 2.4} until={K.Ba - 0.3} texto="uno de los venenos más potentes" y={1500} tam={40} borde={KC.red} />
      <Etiqueta T={T} at={K.Ba + 0.8} until={K.Do - 0.3} x={140} y={1500} texto="Clostridium botulinum" it tam={44} color={KC.ink} />
      <Chip T={T} at={K.Do + 0.6} until={K.Ne - 0.3} texto="dosis letal estimada · inyectada · adulto de 70 kg" y={1490} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Do + 1.0} until={K.Ne - 0.3} texto="(2001, estudios en primates)" y={1580} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Ne + 0.8} until={K.Co - 0.2} texto="acetilcolina = la orden" x={400} y={1480} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Co + 0.8} until={K.Si - 0.2} texto="corta la SNAP-25 (tipo A)" x={400} y={1480} tam={36} borde={SNAP} />
      <Chip T={T} at={K.Si + 0.5} until={K.Pr - 0.2} texto="sin orden = músculo flojo" x={400} y={1480} tam={36} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.85} until={K.Es + 2.4} anio="AÑOS 70" quien="Alan B. Scott" revista="oftalmólogo · San Francisco" x={540} y={560} />
      <Chip T={T} at={K.Es + 3.0} until={K.Ap - 0.3} texto="ojo desviado: estrabismo" y={1500} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Ap + 2.6} until={K.Us - 0.3} texto="párpado que se cierra solo" y={1500} tam={38} borde={KC.lilac} />
      <Chip T={T} at={K.Fa + 0.4} until={K.Cl - 0.3} texto="cultivo → se purifica → polvo" y={1500} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Cl + 1.4} until={K.Ke - 0.3} texto="dosis diminuta · solo donde se trata" y={1500} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Ke + 0.4} until={K.Ci - 0.3} texto="«veneno de las salchichas»" x={620} y={420} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Ke + 1.0} until={K.Ci - 0.3} texto="Justinus Kerner · 1817–1822" y={1500} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="veneno → medicina" y={1500} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ba - 0.1} texto="No solo arrugas: *un veneno.*" />
      <Subtitulo T={T} idx={1} at={K.Ba + 0.1} until={K.Do - 0.1} texto="La hace *una bacteria.*" />
      <Subtitulo T={T} idx={2} at={K.Do + 0.1} until={K.Ne - 0.1} texto="Menos de *una millonésima de gramo.*" />
      <Subtitulo T={T} idx={3} at={K.Ne + 0.1} until={K.Co - 0.1} texto="El mensajero: *acetilcolina.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.Si - 0.1} texto="Corta la *SNAP-25.*" />
      <Subtitulo T={T} idx={5} at={K.Si + 0.1} until={K.Pr - 0.1} texto="El músculo *se afloja.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cómo se volvió *medicina?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ap - 0.1} texto="Alan Scott: *monos, luego ojos.*" />
      <Subtitulo T={T} idx={8} at={K.Ap + 0.1} until={K.Us - 0.1} texto="1989: *estrabismo y párpado.*" />
      <Subtitulo T={T} idx={9} at={K.Us + 0.1} until={K.Fa - 0.1} texto="Migraña y *sudor excesivo.*" />
      <Subtitulo T={T} idx={10} at={K.Fa + 0.1} until={K.Cl - 0.1} texto="Se cultiva y *se purifica.*" />
      <Subtitulo T={T} idx={11} at={K.Cl + 0.1} until={K.Ke - 0.1} texto="La clave: *la dosis.*" />
      <Subtitulo T={T} idx={12} at={K.Ke + 0.1} until={K.Ci - 0.1} texto="Hace dos siglos: *Kerner.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Un veneno *vuelto medicina.*" />

      <Robert T={T} apariciones={ROBERT_BOTOX(CUES)} />
      <MarcaAgua T={T} tema="bioquimica" num="47" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Apariciones de Robert (también las usa la tabla de guion.md)
function ROBERT_BOTOX(C) {
  return [
    [C.Gancho - 0.45, C.Gancho + 5.3, 'avatar_11_sorprendido', 'gancho'],
    [C.Dosis + 0.6, C.Nervio - 0.45, 'avatar_10_serio_molesto', 'izq-alto'],
    [C.Corte + 0.4, C.Pregunta - 0.4, 'avatar_13_senalando_arriba', 'bajo-der'],
    [C.Pregunta + 0.05, C.Estudio + 0.45, 'avatar_06_pensativo_menton', 'grande'],
    [C.Aprobacion + 0.2, C.Usos - 0.45, 'avatar_04_bajando_lentes', 'arriba-der'],
    [C.Fabrica + 0.2, C.Clave - 0.2, 'avatar_02_apuntando_camara', 'izq-alto'],
    [C.Clave + 0.2, C.Kerner - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
    [C.Kerner + 0.3, C.Cierre - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
    [C.Cierre + 0.2, C.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho'],
  ];
}

function BotoxApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Botox /></CompositionStage></div>;
}
window.BotoxApp = BotoxApp;
