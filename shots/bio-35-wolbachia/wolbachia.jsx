// Shot Biotecnológico #35 · El mosco que trae una bacteria contra el dengue (Wolbachia) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no a escala, salvo la barra de escala).
const WOL = '#7CFF6B', WOL2 = '#2fbf4a', VIRUS = '#ff4f9a', PIEL = '#f1b48f', PIEL2 = '#dd9670';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Mosco Aedes aegypti de perfil (mira a la izquierda). Origen = tórax. Patas a la altura y = +150·s.
// wol 0..1 = brillo de la bacteria en el abdomen. vuela = alas en movimiento. gris = silueta apagada.
function Mosco({ T = 0, x = 0, y = 0, s = 1, rot = 0, wol = 0, vuela = 1, flip = false, o = 1 }) {
  const ala = Math.sin(T * 90) * 14 * vuela;
  const pata = (pts, k, op = 1) => {
    const d = 'M ' + pts.map((p) => p.join(' ')).join(' L ');
    return <g key={k} opacity={op}>
      <path d={d} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} stroke="#2a2622" strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={'M ' + pts.slice(2).map((p) => p.join(' ')).join(' L ')} stroke="#fff" strokeWidth={5} fill="none" strokeDasharray="9 13" strokeLinecap="butt" />
    </g>;
  };
  const patas = [
    [[-30, 40], [-150, -20], [-235, 105], [-285, 150]],
    [[0, 48], [55, -25], [45, 110], [80, 150]],
    [[30, 40], [190, -30], [330, -110], [400, -150]],
  ];
  const segs = [0, 1, 2, 3, 4, 5, 6];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    {patas.map((p, i) => pata(p.map(([a, b]) => [a + 18, b - 10]), 'f' + i, 0.55))}
    {/* alas (detrás) */}
    <g transform={`rotate(${-8 + ala} 10 -30)`}>
      <path d="M 10 -30 Q 160 -120 330 -70 Q 200 -20 10 -30 Z" fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={4} />
      <path d="M 40 -40 Q 170 -85 300 -70" stroke="rgba(22,18,15,.45)" strokeWidth={2.5} fill="none" />
    </g>
    {/* abdomen segmentado con bandas blancas */}
    <path d="M 40 -10 Q 160 -40 330 10 Q 345 30 330 45 Q 170 60 40 40 Z" fill="#1f1b18" stroke={KC.ink} strokeWidth={8} />
    {segs.map((i) => <path key={i} d={`M ${70 + i * 38} ${-14 + i * 3} q 6 ${26 + i} 0 ${54 - i * 1.5}`} stroke="#f2f2f2" strokeWidth={6} fill="none" opacity={0.9} />)}
    {wol > 0 && <g opacity={wol}>
      {[[110, 12], [160, 6], [205, 20], [250, 14], [290, 26], [135, 28], [230, 32]].map(([bx, by], i) =>
        <g key={i}><circle cx={bx} cy={by} r={18 + Math.sin(T * 5 + i) * 4} fill={WOL} opacity={0.35} /><ellipse cx={bx} cy={by} rx={9} ry={6} fill={WOL} stroke={KC.ink} strokeWidth={2} transform={`rotate(${i * 40} ${bx} ${by})`} /></g>)}
    </g>}
    {/* tórax con la "lira" blanca */}
    <ellipse cx={0} cy={0} rx={72} ry={58} fill="#1f1b18" stroke={KC.ink} strokeWidth={8} />
    <path d="M -38 -30 Q -10 0 -30 34" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 30 -32 Q 6 0 26 34" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -6 -40 L -6 28 M 6 -40 L 6 28" stroke="#fff" strokeWidth={3.5} />
    {patas.map((p, i) => pata(p, 'p' + i))}
    {/* cabeza, ojo, antenas, palpos y probóscide */}
    <path d="M -100 -18 Q -170 -80 -190 -130 M -100 -18 Q -175 -60 -215 -88" stroke={KC.ink} strokeWidth={4} fill="none" />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${-120 - i * 16} ${-38 - i * 18} l -14 -8 M ${-120 - i * 16} ${-38 - i * 18} l 6 -14`} stroke={KC.ink} strokeWidth={2.5} />)}
    <path d="M -120 4 L -310 70" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <path d="M -118 8 L -175 26" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
    <circle cx={-98} cy={-6} r={36} fill="#1f1b18" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-104} cy={-10} r={24} fill="#3b3f4a" />
    <circle cx={-112} cy={-18} r={7} fill="#fff" opacity={0.8} />
  </g>;
}

// Mosco chiquito visto desde arriba (para el barrio y los cruces).
function MiniMosco({ T = 0, x, y, s = 1, color = '#8a8f99', glow = 0, rot = 0, sexo }) {
  const a = Math.sin(T * 70 + x) * 18;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {glow > 0 && <circle r={34} fill={WOL} opacity={0.35 * glow} />}
    <ellipse cx={-14} cy={-12} rx={20} ry={8} fill="rgba(230,245,255,.75)" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${-30 - a} 0 0)`} />
    <ellipse cx={-14} cy={12} rx={20} ry={8} fill="rgba(230,245,255,.75)" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${30 + a} 0 0)`} />
    <ellipse cx={-10} cy={0} rx={22} ry={6} fill={color} stroke={KC.ink} strokeWidth={3} />
    <circle cx={14} cy={0} r={8} fill={color} stroke={KC.ink} strokeWidth={3} />
    <path d="M 20 0 L 36 0" stroke={KC.ink} strokeWidth={3} />
    {sexo && <path d="M 18 -6 l 14 -12 M 18 6 l 14 12" stroke={KC.ink} strokeWidth={sexo === 'm' ? 4 : 2} />}
  </g>;
}

function Brazo({ y = 1080, alto = 260 }) {
  return <g>
    <path d={`M -40 ${y} Q 540 ${y - 40} 1120 ${y + 10} L 1120 ${y + alto} Q 540 ${y + alto + 30} -40 ${y + alto} Z`} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d={`M -40 ${y + alto - 60} Q 540 ${y + alto - 30} 1120 ${y + alto - 50}`} stroke={PIEL2} strokeWidth={14} fill="none" opacity={0.6} />
    {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M ${40 + i * 66} ${y + 30 + (i % 3) * 22} q 8 -14 20 -18`} stroke="#b0705a" strokeWidth={3} fill="none" />)}
  </g>;
}

function Wolbachia({ x, y, s = 1, rot = 0, T = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(T * 2 + x) * 8}) scale(${s})`} opacity={o}>
    <circle r={26} fill={WOL} opacity={0.25} />
    <rect x={-20} y={-11} width={40} height={22} rx={11} fill={WOL} stroke={KC.ink} strokeWidth={3.5} />
    <rect x={-12} y={-6} width={14} height={4} rx={2} fill="#fff" opacity={0.6} />
  </g>;
}

function Virus({ x, y, s = 1, T = 0, o = 1, apagado = 0 }) {
  const col = mixHex(VIRUS, '#6b6f7a', apagado);
  return <g transform={`translate(${x} ${y}) rotate(${T * 40}) scale(${s * (1 - apagado * 0.4)})`} opacity={o}>
    {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <g key={i}><line x1={Math.cos(a) * 18} y1={Math.sin(a) * 18} x2={Math.cos(a) * 28} y2={Math.sin(a) * 28} stroke={KC.ink} strokeWidth={4} /><circle cx={Math.cos(a) * 29} cy={Math.sin(a) * 29} r={4.5} fill={col} stroke={KC.ink} strokeWidth={2} /></g>; })}
    <circle r={19} fill={col} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-6} cy={-6} r={5} fill="#fff" opacity={0.5} />
  </g>;
}

// Mosca de la fruta (Drosophila melanogaster): ojos rojos, cuerpo café claro, abdomen con rayas.
function MoscaFruta({ x, y, s = 1, T = 0 }) {
  const a = Math.sin(T * 60) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={30} cy={-46} rx={70} ry={26} fill="rgba(230,245,255,.7)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-20 + a} 0 -10)`} />
    {[[-20, 30, -60, 80], [5, 34, 0, 88], [30, 30, 70, 82]].map(([a1, b1, a2, b2], i) => <path key={i} d={`M ${a1} ${b1} L ${(a1 + a2) / 2} ${b1 + 30} L ${a2} ${b2}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinejoin="round" />)}
    <ellipse cx={60} cy={10} rx={62} ry={38} fill="#e0b25c" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${50 + i * 26} ${-24} q 8 34 0 68`} stroke="#3a2a16" strokeWidth={9} fill="none" />)}
    <ellipse cx={-10} cy={0} rx={40} ry={34} fill="#d4a24e" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-56} cy={-4} r={30} fill="#c98a3a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-62} cy={-10} r={22} fill="#e0262f" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-68} cy={-16} r={6} fill="#fff" opacity={0.7} />
  </g>;
}

// Huevo de Aedes: alargado y negro.
function Huevo({ x, y, s = 1, rot = 0, wol = 0, T = 0, roto = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={62} ry={20} fill="#1f1b18" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-18} cy={-7} rx={22} ry={4} fill="#fff" opacity={0.25} />
    {wol > 0 && <g opacity={wol}><circle r={16 + Math.sin(T * 5) * 3} fill={WOL} opacity={0.5} /><ellipse rx={9} ry={6} fill={WOL} stroke={KC.ink} strokeWidth={2} /></g>}
    {roto > 0 && <g opacity={roto}><path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke={KC.red} strokeWidth={12} strokeLinecap="round" /></g>}
  </g>;
}

// Insectos chiquitos del desfile.
function Insecto({ tipo, x, y, T = 0 }) {
  const b = Math.sin(T * 3 + x) * 6;
  return <g transform={`translate(${x} ${y + b})`}>
    {tipo === 'mariposa' && <g>
      <path d="M 0 0 Q -90 -110 -100 -10 Q -80 40 0 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} transform={`scale(${0.75 + 0.25 * Math.abs(Math.cos(T * 4))} 1)`} />
      <path d="M 0 0 Q 90 -110 100 -10 Q 80 40 0 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} transform={`scale(${0.75 + 0.25 * Math.abs(Math.cos(T * 4))} 1)`} />
      <ellipse rx={10} ry={44} fill={KC.ink} />
    </g>}
    {tipo === 'escarabajo' && <g>
      {[-1, 1].map((k) => [-20, 5, 30].map((yy, i) => <path key={k + '' + i} d={`M ${k * 30} ${yy} l ${k * 34} ${8}`} stroke={KC.ink} strokeWidth={6} />))}
      <ellipse rx={46} ry={58} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <path d="M 0 -58 L 0 58" stroke={KC.ink} strokeWidth={5} />
      {[[-20, -10], [20, 10], [-18, 26], [18, -28]].map(([a, c], i) => <circle key={i} cx={a} cy={c} r={8} fill={KC.ink} />)}
      <circle cy={-66} r={20} fill={KC.ink} />
    </g>}
    {tipo === 'abeja' && <g>
      <ellipse cx={-6} cy={-46} rx={30} ry={18} fill="rgba(230,245,255,.75)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${Math.sin(T * 50) * 12} 0 -20)`} />
      <ellipse rx={56} ry={36} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      {[-20, 4, 28].map((xx, i) => <path key={i} d={`M ${xx} -34 q 8 34 0 68`} stroke={KC.ink} strokeWidth={10} fill="none" />)}
      <circle cx={-62} r={22} fill={KC.ink} />
    </g>}
    {tipo === 'mosca' && <g>
      <ellipse cx={10} cy={-36} rx={44} ry={16} fill="rgba(230,245,255,.75)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-20 + Math.sin(T * 60) * 10} 0 -10)`} />
      <ellipse cx={20} cy={4} rx={44} ry={28} fill="#4a5a6a" stroke={KC.ink} strokeWidth={6} />
      <circle cx={-34} cy={0} r={24} fill="#4a5a6a" stroke={KC.ink} strokeWidth={6} />
      <circle cx={-40} cy={-6} r={15} fill="#b8322f" stroke={KC.ink} strokeWidth={3} />
    </g>}
  </g>;
}

function Casa({ x, y, w = 120, h = 100, color = '#f4efe4', techo = KC.coral }) {
  const a = x + w * 0.3, b = x + w * 0.7, m = y + h / 2;
  return <g><rect x={x} y={y} width={w} height={h} fill={techo} stroke={KC.ink} strokeWidth={5} rx={4} />
    <path d={`M ${x} ${y} L ${a} ${m} L ${x} ${y + h} Z`} fill={color} opacity={0.55} />
    <path d={`M ${x + w} ${y} L ${b} ${m} L ${x + w} ${y + h} Z`} fill={color} opacity={0.55} />
    <path d={`M ${x} ${y} L ${a} ${m} L ${x} ${y + h} M ${x + w} ${y} L ${b} ${m} L ${x + w} ${y + h} M ${a} ${m} L ${b} ${m}`} stroke={KC.ink} strokeWidth={4} fill="none" /></g>;
}
// Barrio visto desde arriba con moscos que vuelan. frac(T) = fracción de moscos con Wolbachia.
function Barrio({ T, frac = 0, n = 26 }) {
  const R = krng(11);
  const casas = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) casas.push([110 + c * 230, 620 + r * 190, ['#f4efe4', '#ffd6e4', '#d9f7ff', '#fff3b0'][(r + c) % 4], [KC.coral, KC.blue, KC.teal, KC.orange][(r * 3 + c) % 4]]);
  const ms = Array.from({ length: n }, (_, i) => ({ x0: 100 + R() * 880, y0: 600 + R() * 760, ph: R() * 6, rad: 30 + R() * 60, k: R() }));
  return <g>
    <rect x={0} y={560} width={KW} height={840} fill="#bfe3b4" />
    {[0, 1, 2, 3, 4].map((i) => <rect key={'h' + i} x={0} y={590 + i * 190} width={KW} height={22} fill="#9aa3b5" />)}
    {[0, 1, 2, 3, 4].map((i) => <rect key={'v' + i} x={70 + i * 230} y={560} width={22} height={840} fill="#9aa3b5" />)}
    {casas.map(([x, y, c, t], i) => <Casa key={i} x={x} y={y} w={150} h={130} color={c} techo={t} />)}
    {ms.map((m, i) => { const verde = m.k < frac; const x = m.x0 + Math.cos(T * 1.3 + m.ph) * m.rad, y = m.y0 + Math.sin(T * 1.7 + m.ph) * m.rad * 0.7;
      return <MiniMosco key={i} T={T} x={x} y={y} s={1.1} rot={(T * 70 + m.ph * 57) % 360} color={verde ? WOL2 : '#6b6f7a'} glow={verde ? 1 : 0} />; })}
  </g>;
}

// Interior de la Lupa: una célula del mosco con Wolbachia; los virus entran y no logran copiarse.
function CelulaInterior(T, r, t0) {
  const R = krng(4);
  const wols = Array.from({ length: 16 }, () => { const a = R() * Math.PI * 2, d = 40 + R() * 150; return [r + Math.cos(a) * d, r + 30 + Math.sin(a) * d * 0.85, R() * 180]; });
  const virs = [[0.15, -0.7], [0.75, -0.4], [-0.6, -0.55], [0.9, 0.3], [-0.85, 0.2]];
  return <svg width={2 * r} height={2 * r}>
    <rect width={2 * r} height={2 * r} fill="#0b1a24" />
    <ellipse cx={r} cy={r + 30} rx={r * 0.82} ry={r * 0.72} fill="#3a2b52" stroke="#b18cff" strokeWidth={8} />
    <ellipse cx={r - 40} cy={r + 10} rx={70} ry={58} fill="#5a3f80" stroke="#d6c2ff" strokeWidth={5} />
    <text x={r - 40} y={r + 20} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#d6c2ff">núcleo</text>
    {wols.map(([x, y, rot], i) => <Wolbachia key={i} x={x} y={y} rot={rot} s={0.9} T={T} o={kprog(T, t0 + 0.2 + i * 0.05, t0 + 0.6 + i * 0.05)} />)}
    {virs.map(([dx, dy], i) => { const ti = t0 + 0.8 + i * 0.45, u = kprog(T, ti, ti + 1.2, kEase.suave), ap = kprog(T, ti + 1.1, ti + 1.8);
      const sx = r + dx * r * 1.25, sy = r + dy * r * 1.25, ex = r + dx * r * 0.45, ey = r + 30 + dy * r * 0.4;
      return T > ti ? <g key={i}>
        <Virus x={klerp(sx, ex, u)} y={klerp(sy, ey, u)} s={0.9} T={T} apagado={ap} />
        {ap > 0.2 && <path d={`M ${ex - 22} ${ey - 22} L ${ex + 22} ${ey + 22} M ${ex + 22} ${ey - 22} L ${ex - 22} ${ey + 22}`} stroke={KC.red} strokeWidth={8} strokeLinecap="round" opacity={ap} />}
      </g> : null; })}
    <line x1={r - 100} y1={2 * r - 70} x2={r + 100} y2={2 * r - 70} stroke="#fff" strokeWidth={8} />
    <text x={r} y={2 * r - 86} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">≈ 10 µm (esquema)</text>
  </svg>;
}

function Wolbachia35() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ba: CUES.Bacteria, Pr: CUES.Prestada, PD: CUES.PorDentro, Sa: CUES.Saliva, Pq: CUES.Pregunta, He: CUES.Herencia,
    Tr: CUES.Truco, Ga: CUES.Gana, Es: CUES.Estudio, Re: CUES.Resultado, Oj: CUES.Ojo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el mosco aterriza
  const aterriza = kprog(T, K.G - 0.2, K.G + 0.7, kEase.sale);
  const moscoX = klerp(260, 560, aterriza), moscoY = klerp(560, 930, aterriza);
  const brillo0 = kprog(T, K.G + 1.4, K.G + 2.4);
  // estudio: 24 zonas, 12 con Wolbachia (patrón fijo, esquemático)
  const ZONAS = [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1];
  const genera = Math.min(4, Math.floor(kprog(T, K.Ga + 0.3, K.Ga + 3.2) * 4.999));
  const fracGana = [0.15, 0.4, 0.7, 0.9, 0.96][genera];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el mosco aterriza en tu brazo */}
      <Escena T={T} a={K.G} b={K.Ba} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Brazo y={1080} />
          <Mosco T={T} x={moscoX} y={moscoY} s={0.95} rot={klerp(-18, 0, aterriza)} vuela={1 - kprog(T, K.G + 0.6, K.G + 0.9) * 0.9} wol={brillo0} />
        </SvgCapa>
      </Escena>
      {/* 1 · vive en muchísimos insectos, pero no en este */}
      <Escena T={T} a={K.Ba} b={K.Pr}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[['mosca', 170, 780], ['mariposa', 430, 760], ['escarabajo', 680, 790], ['abeja', 910, 780]].map(([t, x, y], i) => {
            const on = kprog(T, K.Ba + 0.3 + i * 0.35, K.Ba + 0.7 + i * 0.35, kEase.rebote);
            return <g key={i} opacity={kprog(T, K.Ba + i * 0.2, K.Ba + 0.3 + i * 0.2)}>
              <Insecto tipo={t} x={x} y={y} T={T} />
              <g transform={`translate(${x + 50} ${y - 70}) scale(${on})`}><circle r={30} fill={WOL} opacity={0.4} /><Wolbachia x={0} y={0} T={T} s={1.1} /></g>
            </g>; })}
          <g opacity={kprog(T, K.Ba + 2.2, K.Ba + 2.6)}>
            <Mosco T={T} x={560} y={1000} s={0.55} vuela={0.2} />
            <g transform={`translate(${780} ${900}) scale(${kprog(T, K.Ba + 2.6, K.Ba + 3.0, kEase.rebote)})`}>
              <circle r={48} fill="#fff" stroke={KC.ink} strokeWidth={6} /><path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke={KC.red} strokeWidth={11} strokeLinecap="round" /></g>
          </g>
        </SvgCapa>
      </Escena>
      {/* 2 · de la mosca de la fruta → células de mosco → huevo */}
      <Escena T={T} a={K.Pr} b={K.PD} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={kprog(T, K.Pr, K.Pr + 0.3)}><MoscaFruta x={230} y={760} s={1.25} T={T} /></g>
          <FlechaCurva x1={300} y1={860} x2={560} y2={960} p={kprog(T, K.Pr + 1.2, K.Pr + 1.8)} T={T} color={WOL} curva={-60} />
          {/* placa de cultivo con células de mosco */}
          <g opacity={kprog(T, K.Pr + 1.5, K.Pr + 2.0)}>
            <ellipse cx={720} cy={1000} rx={230} ry={90} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={720} cy={990} rx={200} ry={70} fill="#ffd6e4" stroke="rgba(22,18,15,.4)" strokeWidth={4} />
            {Array.from({ length: 12 }, (_, i) => { const cx = 580 + (i % 6) * 56, cy = 965 + Math.floor(i / 6) * 48, llena = kprog(T, K.Pr + 2.0 + i * 0.08, K.Pr + 2.3 + i * 0.08);
              return <g key={i}><circle cx={cx} cy={cy} r={22} fill="#ff9fc0" stroke={KC.ink} strokeWidth={3} /><circle cx={cx} cy={cy} r={7 * llena} fill={WOL} stroke={KC.ink} strokeWidth={1.5} /></g>; })}
          </g>
          <FlechaCurva x1={640} y1={1100} x2={420} y2={1180} p={kprog(T, K.Pr + 3.4, K.Pr + 4.0)} T={T} color={WOL} curva={-50} />
          {/* aguja de vidrio que entra en el huevito */}
          {T > K.Pr + 3.8 && <g>
            <Huevo x={300} y={1190} s={1.6} rot={-8} wol={kprog(T, K.Pr + 4.9, K.Pr + 5.4)} T={T} />
            <g transform={`translate(${klerp(560, 395, kprog(T, K.Pr + 4.0, K.Pr + 4.7, kEase.sale))} ${klerp(1080, 1170, kprog(T, K.Pr + 4.0, K.Pr + 4.7, kEase.sale))}) rotate(-28)`}>
              <path d="M 0 0 L 260 -16 L 260 16 Z" fill="rgba(220,240,255,.8)" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
              <path d="M 20 0 L 240 -6" stroke={WOL} strokeWidth={5} />
            </g>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 3 · por dentro: la bacteria le estorba al virus */}
      <Escena T={T} a={K.PD} b={K.Sa} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><Mosco T={T} x={380} y={1100} s={0.75} vuela={0.15} wol={1} /></SvgCapa>
        <Lupa T={T} at={K.PD + 0.1} until={K.Sa - 0.3} x={540} y={690} r={280} fx={530} fy={1110} interior={(t, r) => CelulaInterior(t, r, K.PD)} tinte={WOL} etiqueta="AL MICROSCOPIO · CÉLULA DEL MOSCO" />
      </Escena>
      {/* 4 · la saliva */}
      <Escena T={T} a={K.Sa} b={K.Pq} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <rect x={0} y={1000} width={KW} height={420} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
          <rect x={0} y={1000} width={KW} height={40} fill="#f7cdb2" />
          <Mosco T={T} x={595} y={555} s={1.6} rot={-71} vuela={0.3} wol={kprog(T, K.Sa + 1.5, K.Sa + 2.0)} />
          {[0, 1, 2].map((i) => { const ti = K.Sa + 0.4 + i * 1.1, u = ((T - ti) % 3.3) / 3.3; if (T < ti) return null; const yy = klerp(1070, 1220, u);
            const quita = kprog(T, K.Sa + 1.8, K.Sa + 2.8);
            return <g key={i} opacity={1 - u * 0.6}>
              <circle cx={540 + (i - 1) * 60 * u} cy={yy} r={50} fill="rgba(220,240,255,.8)" stroke={KC.ink} strokeWidth={5} />
              {i !== 1 && <Virus x={540 + (i - 1) * 60 * u} y={yy} s={0.8} T={T} o={1 - quita} />}
            </g>; })}
          <g transform="translate(840 1130)"><Wolbachia x={0} y={0} T={T} s={2.6} o={kprog(T, K.Sa + 1.5, K.Sa + 2.0)} /></g>
        </SvgCapa>
      </Escena>
      {/* 5 · ¿cómo llega a todos los moscos de tu colonia? */}
      <Escena T={T} a={K.Pq} b={K.He} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Barrio T={T} frac={0.04} />
          <text x={250} y={1080} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 250 900)`} opacity={kprog(T, K.Pq + 0.2, K.Pq + 0.6)}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · la mamá se la pasa en el huevo */}
      <Escena T={T} a={K.He} b={K.Tr}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={120} y={1020} width={840} height={260} fill="#7fc8ff" stroke={KC.ink} strokeWidth={8} />
          <path d={`M 120 1020 Q 540 ${1010 + Math.sin(T * 3) * 6} 960 1020`} stroke="#fff" strokeWidth={6} fill="none" />
          <Mosco T={T} x={640} y={760} s={0.7} wol={1} vuela={0.2} />
          {Array.from({ length: 6 }, (_, i) => { const ti = K.He + 0.4 + i * 0.3, u = kprog(T, ti, ti + 0.45, kEase.sale);
            return T > ti ? <Huevo key={i} x={220 + i * 120} y={klerp(900, 990, u)} s={0.8} rot={-10 + i * 4} wol={kprog(T, ti + 0.4, ti + 0.8)} T={T} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 7 · el truco: macho con Wolbachia × hembra sin ella → no nacen */}
      <Escena T={T} a={K.Tr} b={K.Ga}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[[0, WOL2, '#6b6f7a', false], [1, '#6b6f7a', WOL2, true], [2, WOL2, WOL2, true]].map(([fila, cm, ch, nacen]) => {
            const y = 720 + fila * 180, t0 = K.Tr + 0.2 + fila * 1.1, e = kprog(T, t0, t0 + 0.4);
            return <g key={fila} opacity={e}>
              <rect x={60} y={y - 75} width={960} height={150} rx={30} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
              <MiniMosco T={T} x={150} y={y} s={2.2} color={cm} glow={cm === WOL2 ? 1 : 0} sexo="m" />
              <text x={150} y={y + 66} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>macho</text>
              <text x={275} y={y + 20} textAnchor="middle" style={{ font:`900 64px ${KF.texto}` }} fill={KC.ink}>×</text>
              <MiniMosco T={T} x={400} y={y} s={2.2} color={ch} glow={ch === WOL2 ? 1 : 0} sexo="h" />
              <text x={400} y={y + 66} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>hembra</text>
              <text x={520} y={y + 18} textAnchor="middle" style={{ font:`900 56px ${KF.texto}` }} fill={KC.ink}>→</text>
              {[0, 1, 2].map((k) => <Huevo key={k} x={620 + k * 120} y={y} s={0.75} rot={-8} wol={nacen ? kprog(T, t0 + 0.5, t0 + 0.9) : 0} roto={nacen ? 0 : kprog(T, t0 + 0.6, t0 + 0.9)} T={T} />)}
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 8 · en pocas generaciones casi todos la traen */}
      <Escena T={T} a={K.Ga} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Barrio T={T} frac={fracGana} /></SvgCapa>
      </Escena>
      {/* 9 · Yogyakarta: 24 zonas, 12 con huevos de moscos con Wolbachia */}
      <Escena T={T} a={K.Es} b={K.Re}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <g opacity={kprog(T, K.Es + 2.4, K.Es + 2.8)}>
            <rect x={90} y={665} width={900} height={575} rx={24} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
            {ZONAS.map((z, i) => { const c = i % 6, r = Math.floor(i / 6), x = 122 + c * 142, y = 683 + r * 138, on = z ? kprog(T, K.Es + 3.0 + i * 0.06, K.Es + 3.3 + i * 0.06) : 0;
              return <g key={i}>
                <rect x={x} y={y} width={128} height={128} rx={12} fill={mixHex('#d8d2c4', '#9be89a', on)} stroke={KC.ink} strokeWidth={4} />
                {z === 1 && T > K.Es + 3.4 && [0, 1].map((k) => { const tt = K.Es + 3.4 + i * 0.05 + k * 0.3, u = kprog(T, tt, tt + 0.5, kEase.sale);
                  return <Huevo key={k} x={x + 40 + k * 50} y={klerp(y - 30, y + 70 + k * 18, u)} s={0.32} rot={20} T={T} wol={1} />; })}
              </g>; })}
          </g>
        </SvgCapa>
      </Escena>
      {/* 10 · resultado */}
      <Escena T={T} a={K.Re} b={K.Oj}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={600} y={590} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Re + 0.4, K.Re + 0.7)}>dengue con síntomas</text>
          <text x={540} y={930} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Re + 2.8, K.Re + 3.1)}>hospitalizados por dengue</text>
        </SvgCapa>
      </Escena>
      {/* 11 · no es transgénico */}
      <Escena T={T} a={K.Oj} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g transform="translate(0 0)"><ADNHebra T={T} x={70} y={880} largo={440} alto={110} vueltas={2.2} /></g>
          <text x={290} y={1010} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>genes del mosco</text>
          <text x={290} y={1052} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>sin cambios ✓</text>
          <text x={150} y={1150} textAnchor="middle" style={{ font:`900 70px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Oj + 1.2, K.Oj + 1.5)}>+</text>
          <g opacity={kprog(T, K.Oj + 1.2, K.Oj + 1.6)}><Wolbachia x={330} y={1130} T={T} s={2.6} /></g>
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: el mismo brazo del inicio, el mosco ya con su bacteria */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Brazo y={1080} />
          <Mosco T={T} x={560} y={930} s={0.95} vuela={0.1} wol={1} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.9} until={K.Ba - 0.3} x={160} y={700} texto="Aedes aegypti" it tam={40} color={KC.ink} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.9} texto="¿más peligroso?" x={300} y={500} tam={44} />
      <Chip T={T} at={K.G + 2.4} until={K.Ba - 0.3} texto="trae una bacteria: Wolbachia" y={1500} tam={40} borde={WOL2} />
      <Etq T={T} at={K.Ba + 0.5} until={K.Pr - 0.3} x={60} y={1500} texto="Wolbachia pipientis" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ba + 2.7} until={K.Pr - 0.3} texto="en Aedes aegypti: no" x={760} y={1180} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Pr + 0.4} until={K.Pr + 3.0} x={60} y={600} texto="mosca de la fruta · Drosophila" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Pr + 2.0} until={K.Pr + 3.7} texto="2 años en células de mosco" x={720} y={860} tam={34} borde={WOL2} />
      <Chip T={T} at={K.Pr + 3.9} until={K.PD - 0.3} texto="mosca → células → huevo de mosco" y={1500} tam={36} borde={WOL2} />
      <Etq T={T} at={K.PD + 1.0} until={K.Sa - 0.3} x={60} y={1500} texto="virus del dengue: casi no se copia" tam={32} color={KC.texto} />
      <Chip T={T} at={K.Sa + 1.6} until={K.Pq - 0.3} texto="menos virus en la saliva" y={1500} tam={42} borde={VIRUS} />
      <Etq T={T} at={K.Sa + 0.5} until={K.Pq - 0.3} x={590} y={880} texto="probóscide (trompa)" tam={32} color={KC.ink} />
      <Chip T={T} at={K.He + 0.6} until={K.Tr - 0.2} texto="se hereda dentro del huevo" y={1500} tam={40} borde={WOL2} />
      <Chip T={T} at={K.Tr + 1.0} until={K.Ga - 0.3} texto="✕ = no nacen · verde = traen Wolbachia" y={1500} tam={34} borde={KC.red} />
      <Medidor T={T} at={K.Ga + 0.2} until={K.Es - 0.3} valor={fracGana} etiqueta={`generación ${genera + 1}`} x={90} y={1440} color={WOL} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.4} anio="2017" quien="Yogyakarta, Indonesia" revista="ensayo AWED · 24 zonas al azar" y={900} />
      <Chip T={T} at={K.Es + 3.0} until={K.Re - 0.3} texto="12 zonas con huevos · 12 sin" y={1500} tam={40} borde={WOL2} />
      <NumeroGigante T={T} at={K.Re + 0.4} until={K.Oj - 0.3} valor={77} sufijo=" %" prefijo="−" y={720} tam={220} color={KC.yellow} />
      <NumeroGigante T={T} at={K.Re + 2.8} until={K.Oj - 0.3} valor={86} sufijo=" %" prefijo="−" y={1050} tam={200} color={WOL} />
      <Chip T={T} at={K.Re + 1.0} until={K.Oj - 0.3} texto="NEJM 2021 · zonas con vs. sin Wolbachia" y={1500} tam={32} borde={KC.gold} />
      <MitoTachado T={T} at={K.Oj + 0.1} tacharEn={K.Oj + 1.0} until={K.Ci - 0.2} texto="mosco transgénico" x={300} y={700} tam={44} />
      <Etq T={T} at={K.Ci + 0.6} until={K.Ou} x={160} y={700} texto="con Wolbachia" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="te pica, pero frena al dengue" y={1500} tam={40} borde={WOL2} />
      {(T < K.Ba - 0.2 || (T > K.Ci && T < K.Ou)) && <Escala T={T} z={1} pxPorMm={100} y={1640} color={KC.ink} objetivo={220} />}

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ba - 0.1} texto="Trae una bacteria que *frena al dengue.*" />
      <Subtitulo T={T} idx={1} at={K.Ba + 0.1} until={K.Pr - 0.1} texto="En muchos insectos, *pero no en este.*" />
      <Subtitulo T={T} idx={2} at={K.Pr + 0.1} until={K.PD - 0.1} texto="Mosca → células → *huevo de mosco.*" />
      <Subtitulo T={T} idx={3} at={K.PD + 0.1} until={K.Sa - 0.1} texto="Le estorba al virus *para copiarse.*" />
      <Subtitulo T={T} idx={4} at={K.Sa + 0.1} until={K.Pq - 0.1} texto="Menos virus *en su saliva.*" />
      <Subtitulo T={T} idx={5} at={K.Pq + 0.1} until={K.He - 0.1} texto="¿Cómo llega *a todos?*" />
      <Subtitulo T={T} idx={6} at={K.He + 0.1} until={K.Tr - 0.1} texto="La mamá: *dentro del huevo.*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Ga - 0.1} texto="Macho con ella × hembra sin: *no nacen.*" />
      <Subtitulo T={T} idx={8} at={K.Ga + 0.1} until={K.Es - 0.1} texto="Casi todos *la traen.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Re - 0.1} texto="Yogyakarta: *12 de 24.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Oj - 0.1} texto="*−77 %* dengue · *−86 %* hospitalizados" />
      <Subtitulo T={T} idx={11} at={K.Oj + 0.1} until={K.Ci - 0.1} texto="No es *transgénico.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Te pica, pero *frena al dengue.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Bacteria + 1.0, CUES.Prestada - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Prestada + 2.4, CUES.PorDentro - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Saliva + 0.4, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Herencia + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Truco + 0.6, CUES.Gana - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 2.8, CUES.Resultado - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Resultado + 0.4, CUES.Ojo - 0.3, 'avatar_02_apuntando_camara', 'izq-alto'],
        [CUES.Ojo + 0.05, CUES.Cierre - 0.1, 'avatar_04_bajando_lentes', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="35" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function WolbachiaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Wolbachia35 /></CompositionStage></div>;
}
window.WolbachiaApp = WolbachiaApp;
