// Shot Químico #26 · Esa compresa no fabrica frío: le roba calor a tu piel (compresa fría instantánea) — NARRADO (N1 por dentro + N5 termómetro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PIEL = '#f1b48f', PIEL_FRIA = '#c9c6e6', AGUA = '#7fc8ff', NH4 = KC.lilac, NO3 = KC.orange, CALOR = '#ff3b2f';

// Rodilla (sin herida). frio 0..1 la pinta un poco azulada.
function Rodilla({ x, y, s = 1, frio = 0 }) {
  const c = mixHex(PIEL, PIEL_FRIA, frio * 0.6);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -260 Q -200 -320 -40 -300 Q 160 -270 260 -120 Q 330 0 260 140 Q 160 300 -60 320 Q -260 330 -320 200 Z" fill={c} stroke={KC.ink} strokeWidth={10} />
    <path d="M -120 40 Q 0 90 120 40" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Trapo de cocina a rayas, entre la compresa y la piel.
function Trapo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -270 -60 Q -130 -90 0 -66 Q 140 -44 270 -70 L 280 60 Q 140 84 0 64 Q -140 44 -280 70 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-180, -60, 60, 180].map((dx) => <path key={dx} d={`M ${dx - 14} -62 L ${dx + 14} -62 L ${dx + 14} 62 L ${dx - 14} 62 Z`} fill={KC.red} opacity={0.75} />)}
  </g>;
}
// Gránulos blancos dentro de un rectángulo. f = cuánto queda sin disolver (1 = todo).
function Granos({ x, y, w, h, n = 40, f = 1, seed = 4, r = 9 }) {
  if (f <= 0.02) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const gx = x + R() * w, gy = y + R() * h, rr = r * (0.6 + R() * 0.6);
    return <rect key={i} x={gx - rr * f} y={gy - rr * f} width={rr * 2 * f} height={rr * 2 * f} rx={2} fill="#fff" stroke="#9aa3b5" strokeWidth={2} transform={`rotate(${R() * 90} ${gx} ${gy})`} />; })}</g>;
}
// Compresa fría instantánea (genérica, sin marca). corte = 0..1 deja ver la bolsita de adentro.
// rompe = 0..1 la bolsita de agua se rompe y el agua llena la bolsa; disuelto = 0..1 los gránulos se deshacen.
function Compresa({ x, y, s = 1, rot = 0, frio = 0, corte = 0, rompe = 0, disuelto = 0, aplasta = 0, roto = 0 }) {
  const W = 220, H = 150;
  const zig = (yy) => Array.from({ length: 23 }, (_, i) => `${-W + i * (2 * W / 22)} ${yy + (i % 2 ? 10 : -10)}`).join(' L ');
  const cuerpo = mixHex('#ffffff', '#d6f0ff', frio);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + aplasta * 0.06)} ${s * (1 - aplasta * 0.08)})`}>
    <rect x={-W} y={-H} width={2 * W} height={2 * H} rx={50} fill={cuerpo} stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${zig(-H + 4)}`} fill="none" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${zig(H - 4)}`} fill="none" stroke={KC.ink} strokeWidth={5} />
    {corte > 0 && <g opacity={corte}>
      {/* agua que se derrama y llena la bolsa */}
      <rect x={-W + 14} y={-H + 26} width={2 * W - 28} height={2 * H - 52} rx={40} fill={AGUA} opacity={0.75 * rompe} />
      <Granos x={-W + 30} y={-H + 40} w={2 * W - 60} h={2 * H - 80} n={46} f={1 - disuelto} />
      {/* bolsita de agua */}
      {rompe < 1 && <g opacity={1 - rompe}>
        <rect x={-110 - rompe * 40} y={-58} width={110} height={116} rx={30} fill={AGUA} stroke="#1f5fa8" strokeWidth={6} />
        <rect x={0 + rompe * 40} y={-58} width={110} height={116} rx={30} fill={AGUA} stroke="#1f5fa8" strokeWidth={6} />
      </g>}
    </g>}
    {corte < 1 && <g opacity={1 - corte}>
      <rect x={-W + 30} y={-56} width={2 * W - 60} height={112} rx={18} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
      <text x={30} y={18} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill="#fff">COMPRESA FRÍA</text>
      <g transform="translate(-150 0)" stroke="#fff" strokeWidth={7} strokeLinecap="round">
        {[0, 60, 120].map((a) => <line key={a} x1={-30 * Math.cos(a * Math.PI / 180)} y1={-30 * Math.sin(a * Math.PI / 180)} x2={30 * Math.cos(a * Math.PI / 180)} y2={30 * Math.sin(a * Math.PI / 180)} />)}
      </g>
    </g>}
    {roto > 0 && <path d={`M ${W - 10} ${-H + 20} L ${W - 60} ${-H + 60} L ${W - 30} ${-H + 90} L ${W - 80} ${-H + 130}`} fill="none" stroke={KC.ink} strokeWidth={8} opacity={roto} />}
  </g>;
}
// Mano esquemática que aprieta desde arriba.
function Mano({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-250} width={120} height={150} rx={30} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    {[-66, -22, 22, 66].map((dx, i) => <rect key={i} x={dx - 22} y={-120} width={44} height={i % 3 ? 130 : 112} rx={22} fill={PIEL} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-80} y={-130} width={160} height={70} rx={30} fill={PIEL} />
  </g>;
}
// Flecha de calor ondulada que sube de (x, y0) a (x, y1).
function Calor({ T, x, y0, y1, o = 1, ph = 0, ancho = 10 }) {
  if (o <= 0) return null;
  const n = 14, pts = Array.from({ length: n + 1 }, (_, i) => { const yy = klerp(y0, y1, i / n); return `${x + Math.sin(i * 1.2 + T * 6 + ph) * 14} ${yy}`; }).join(' L ');
  return <g opacity={o}>
    <path d={`M ${pts}`} fill="none" stroke={CALOR} strokeWidth={ancho} strokeLinecap="round" strokeDasharray="34 16" strokeDashoffset={T * 90} />
    <path d={`M ${x - 22} ${y1 + 26} L ${x} ${y1 - 6} L ${x + 22} ${y1 + 26}`} fill="none" stroke={CALOR} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Ion del cristal.
function Ion({ x, y, tipo, s = 1, o = 1 }) {
  const nh = tipo === 'nh4';
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={42} fill={nh ? NH4 : NO3} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-14} cy={-14} r={9} fill="#fff" opacity={0.5} />
    <text y={11} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{nh ? 'NH₄⁺' : 'NO₃⁻'}</text>
  </g>;
}
// Urea: CO(NH2)2
const UREA = { atomos: [[0, 0, 40, '#9a9a9a', 'C'], [0, -84, 38, QA.O, 'O'], [-78, 46, 36, QA.N, 'N'], [78, 46, 36, QA.N, 'N'],
  [-128, 14, 22, QA.H, 'H'], [-94, 108, 22, QA.H, 'H'], [128, 14, 22, QA.H, 'H'], [94, 108, 22, QA.H, 'H']],
  enlaces: [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 6], [3, 7]] };
function Rinon({ x, y, s = 1, flip = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * flip} ${s})`}>
    <path d="M 0 -90 Q 70 -100 76 -20 Q 80 70 10 90 Q -40 100 -46 50 Q -20 30 -20 0 Q -20 -30 -46 -50 Q -46 -86 0 -90 Z" fill="#b8434e" stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 0 Q -60 0 -70 60" fill="none" stroke="#f0c040" strokeWidth={8} />
  </g>;
}
function Frasco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-120} width={100} height={30} rx={6} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-90} width={120} height={170} rx={16} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-54} y={-20} width={108} height={94} rx={12} fill="#f6d84a" />
  </g>;
}
function Bote({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -160 L 150 -160 L 120 160 L -120 160 Z" fill="#8a94a6" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-70, 0, 70].map((dx) => <line key={dx} x1={dx} y1={-120} x2={dx * 0.85} y2={130} stroke={KC.ink} strokeWidth={6} opacity={0.5} />)}
    <rect x={-170} y={-190} width={340} height={36} rx={12} fill="#6b7486" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

function Compresa26() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ad: CUES.Adentro, Ap: CUES.Aprieta, Cr: CUES.Cristal, Ro: CUES.Robo, Pr: CUES.Pregunta, De: CUES.Desorden, Te: CUES.Termometro, Es: CUES.Estudio, Ur: CUES.Urea, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const aprieta = kprog(T, K.G + 0.05, K.G + 0.4, kEase.sale) * (1 - kprog(T, K.G + 0.7, K.G + 1.1));
  const calorG = kprog(T, K.G + 1.9, K.G + 2.5);
  const segB = K.Es + 8.6;
  // cristal: orden en que se sueltan los iones
  const cols = 6, filas = 4, paso = 104, gx0 = 470 - (cols - 1) * paso / 2, gy0 = 630;
  const red = Array.from({ length: cols * filas }, (_, i) => ({ c: i % cols, f: Math.floor(i / cols), tipo: (i % cols + Math.floor(i / cols)) % 2 ? 'no3' : 'nh4' }));
  const sale = [0, 5, 18, 23, 1, 12, 17, 6, 11, 2];
  const destinos = [[120, 560], [900, 1040], [110, 1040], [960, 780], [380, 1060], [90, 800], [990, 920], [640, 1060], [240, 1070], [800, 1070]];
  const R = krng(11);
  const revuelto = Array.from({ length: 12 }, () => [R(), R(), R() * 6]);
  const tempV = klerp(27.4, 7.6, kprog(T, K.Te + 2.0, K.Te + 5.6, kEase.suave));
  const empana = kprog(T, K.Te + 3.0, K.Te + 5.8);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mano aprieta la compresa sobre el trapo y la rodilla */}
      <Escena T={T} a={K.G} b={K.Ad} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Rodilla x={540} y={1100} s={1.1} frio={calorG * 0.5} />
          <Trapo x={540} y={1000} s={1} />
          <Compresa x={540} y={880} s={1} aplasta={aprieta} frio={calorG} />
          <g transform={`translate(0 ${klerp(-220, 0, kprog(T, K.G - 0.3, K.G + 0.3, kEase.sale)) - aprieta * -30})`} opacity={1 - kprog(T, K.G + 1.1, K.G + 1.5)}>
            <Mano x={470} y={760 + aprieta * 30} s={1.1} />
          </g>
          {[380, 540, 700].map((x, i) => <Calor key={i} T={T} x={x} y0={1210} y1={1010} o={calorG} ph={i * 2} />)}
        </SvgCapa>
      </Escena>
      {/* 1 · adentro: lupa de rayos X */}
      <Escena T={T} a={K.Ad} b={K.Ap} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><Compresa x={540} y={1030} s={1.25} /></SvgCapa>
        <Lupa T={T} at={K.Ad + 0.3} until={K.Ap - 0.3} x={540} y={900} r={250} fx={540} fy={1030} tinte={KC.cyan} etiqueta="bolsita de agua + polvo" interior={(t, r) =>
          <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(0.95)`}>
            <rect x={-220} y={-150} width={440} height={300} rx={50} fill="#e8f6ff" opacity={0.2} stroke="#bfe8ff" strokeWidth={4} />
            <Granos x={-200} y={-120} w={400} h={240} n={60} f={1} />
            <rect x={-110} y={-58} width={220} height={116} rx={30} fill={AGUA} stroke="#1f5fa8" strokeWidth={6} />
            <text y={14} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>H₂O</text>
          </g></svg>} />
      </Escena>
      {/* 2 · se rompe la bolsita */}
      <Escena T={T} a={K.Ap} b={K.Cr} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Compresa x={540} y={960} s={1.7} corte={1} rompe={kprog(T, K.Ap + 0.9, K.Ap + 1.6, kEase.sale)} disuelto={kprog(T, K.Ap + 1.6, K.Cr + 1, kEase.suave) * 0.6} aplasta={kprog(T, K.Ap + 0.6, K.Ap + 0.9) * (1 - kprog(T, K.Ap + 1.2, K.Ap + 1.6))} />
        </SvgCapa>
        <div style={{ position:'absolute', inset:0 }}><SvgCapa><Onomato T={T} at={K.Ap + 0.9} until={K.Ap + 2.2} x={540} y={700} texto="¡POP!" tam={130} /></SvgCapa></div>
      </Escena>
      {/* 3 · el cristal se deshace (micro) */}
      <Escena T={T} a={K.Cr} b={K.Ro} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Ambiente T={T} n={30} color="rgba(127,200,255,.25)" />
          {red.map((d, i) => { const k = sale.indexOf(i), x0 = gx0 + d.c * paso, y0 = gy0 + d.f * paso;
            if (k < 0) return <Ion key={i} x={x0 + Math.sin(T * 5 + i) * 3} y={y0 + Math.cos(T * 4 + i) * 3} tipo={d.tipo} />;
            const t0 = K.Cr + 0.6 + k * 0.42, p = kprog(T, t0, t0 + 1.2, kEase.suave), [dx, dy] = destinos[k];
            const x = klerp(x0, dx, p), y = klerp(y0, dy, p);
            return <g key={i}>
              <Ion x={x} y={y} tipo={d.tipo} s={klerp(1, 0.8, p)} />
              {p > 0.1 && [0, 1, 2, 3, 4].map((j) => { const a = j / 5 * Math.PI * 2 + T * 1.5; return <Mol key={j} tipo="agua" x={x + Math.cos(a) * 78} y={y + Math.sin(a) * 78} s={0.42} rot={a * 57} o={kprog(T, t0 + 0.2, t0 + 0.8)} />; })}
            </g>; })}
          {/* barra de escala */}
          <line x1={80} y1={1740} x2={80 + paso * 2} y2={1740} stroke={KC.texto} strokeWidth={8} />
          <text x={80 + paso} y={1720} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>≈ 1 nm · esquema</text>
          {/* energía: separar cuesta más de lo que regresa el agua */}
          {[['separar: cuesta', KC.red, 1.0, 2.6], ['rodear con agua: regresa', KC.mint, 0.82, 3.4]].map(([t, c, l, d], i) => { const p = kprog(T, K.Cr + d, K.Cr + d + 0.7, kEase.sale);
            return <g key={i} opacity={kprog(T, K.Cr + d, K.Cr + d + 0.2)}>
              <text x={90} y={1442 + i * 120} style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto}>{t}</text>
              <rect x={90} y={1458 + i * 120} width={880 * l * p} height={44} rx={22} fill={c} stroke={KC.ink} strokeWidth={5} />
            </g>; })}
        </SvgCapa>
      </Escena>
      {/* 4 · el calor sale del agua y de tu rodilla (corte por capas) */}
      <Escena T={T} a={K.Ro} b={K.Pr} zoom={-0.06}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={60} y={620} width={960} height={230} rx={40} fill={AGUA} stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 16 }, (_, i) => <Ion key={i} x={130 + (i % 8) * 116 + Math.sin(T * 3 + i) * 10} y={690 + Math.floor(i / 8) * 90 + Math.cos(T * 2.6 + i) * 8} tipo={i % 2 ? 'no3' : 'nh4'} s={0.62} />)}
          <Trapo x={540} y={905} s={1.85} />
          <rect x={40} y={985} width={1000} height={240} fill={mixHex(PIEL, PIEL_FRIA, kprog(T, K.Ro + 0.5, K.Pr))} stroke={KC.ink} strokeWidth={9} />
          {[200, 420, 660, 880].map((x, i) => <Calor key={i} T={T} x={x} y0={1180} y1={780} o={kprog(T, K.Ro + 0.3 + i * 0.15, K.Ro + 0.8 + i * 0.15)} ph={i} ancho={12} />)}
        </SvgCapa>
        <Etq T={T} at={K.Ro + 0.2} until={K.Pr - 0.2} x={1010} y={580} texto="agua + iones" lado="izq" tam={32} color={KC.ink} />
        <Etq T={T} at={K.Ro + 0.6} until={K.Pr - 0.2} x={1010} y={1120} texto="tu rodilla" lado="izq" tam={34} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.De} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text>
          {[[160, 1180, 'nh4'], [260, 1170, 'no3'], [360, 1185, 'nh4']].map(([x, y, t], i) => <Ion key={i} x={x} y={y + Math.sin(T * 3 + i) * 6} tipo={t} s={0.8} />)}
        </SvgCapa>
      </Escena>
      {/* 6 · el desorden gana */}
      <Escena T={T} a={K.De} b={K.Te}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {(() => { const ap = kprog(T, K.De + 0.6, K.De + 1.2, kEase.sale), tilt = 14 * kprog(T, K.De + 2.0, K.De + 2.9, kEase.rebote || kEase.sale);
            return <g opacity={ap}>
              <rect x={70} y={620} width={440} height={400} rx={30} fill="rgba(255,255,255,.06)" stroke={KC.texto} strokeWidth={5} />
              <rect x={570} y={620} width={440} height={400} rx={30} fill="rgba(127,200,255,.25)" stroke={AGUA} strokeWidth={5} />
              {Array.from({ length: 12 }, (_, i) => <Ion key={i} x={150 + (i % 4) * 92} y={710 + Math.floor(i / 4) * 110} tipo={(i % 4 + Math.floor(i / 4)) % 2 ? 'no3' : 'nh4'} s={0.85} />)}
              {revuelto.map(([u, v, ph], i) => <Ion key={'r' + i} x={630 + u * 320 + Math.sin(T * 2 + ph) * 20} y={680 + v * 280 + Math.cos(T * 1.7 + ph) * 20} tipo={i % 2 ? 'no3' : 'nh4'} s={0.75} />)}
              <text x={290} y={600} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>cristal: ordenado</text>
              <text x={790} y={600} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={AGUA}>disuelto: revuelto</text>
              <path d="M 540 1110 L 500 1190 L 580 1190 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
              <g transform={`rotate(${tilt} 540 1110)`}>
                <rect x={240} y={1100} width={600} height={18} rx={9} fill={KC.texto} stroke={KC.ink} strokeWidth={4} />
                <rect x={170} y={1060} width={180} height={50} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
                <text x={260} y={1096} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>energía</text>
                <rect x={730} y={1060} width={190} height={50} rx={14} fill={AGUA} stroke={KC.ink} strokeWidth={5} />
                <text x={825} y={1096} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>desorden</text>
              </g>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 7 · la demostración con termómetro */}
      <Escena T={T} a={K.Te} b={K.Es}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <VasoLab x={380} y={1190} s={1.35} liquido={mixHex('#bfe6ff', '#e6f6ff', empana)} nivel={0.5}>
            <Granos x={-100} y={-140} w={200} h={130} n={26} f={1 - kprog(T, K.Te + 1.0, K.Te + 5.5) * 0.85} seed={9} r={8} />
          </VasoLab>
          {Array.from({ length: 22 }, (_, i) => { const R2 = krng(30 + i), lado = i % 2 ? 1 : -1, yy = 840 + R2() * 340;
            return <ellipse key={i} cx={380 + lado * (152 + R2() * 6)} cy={yy} rx={7} ry={10} fill="#ffffff" stroke="#7aa7c7" strokeWidth={2} opacity={kprog(T, K.Te + 3.0 + i * 0.1, K.Te + 3.4 + i * 0.1)} />; })}
          {/* termómetro */}
          <rect x={790} y={640} width={60} height={520} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
          <circle cx={820} cy={1190} r={56} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
          <rect x={806} y={1150 - (tempV / 30) * 480} width={28} height={(tempV / 30) * 480 + 20} fill={KC.red} />
          {[0, 10, 20, 30].map((v) => <g key={v}><line x1={850} x2={880} y1={1150 - v / 30 * 480} y2={1150 - v / 30 * 480} stroke={KC.ink} strokeWidth={5} />
            <text x={890} y={1160 - v / 30 * 480} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>)}
        </SvgCapa>
        <div style={{ position:'absolute', left:820, top:575, transform:'translate(-50%,-50%)', zIndex:41, font:`400 96px ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`3px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{kformato(tempV, 1)} °C</div>
      </Escena>
      {/* 8 · 1988, Los Ángeles · y qué hacer si se rompe */}
      <Escena T={T} a={K.Es} b={segB + 0.2}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.Es + 3.4 && Array.from({ length: 5 }, (_, i) => <Personita key={i} x={170 + i * 150} y={960} s={2.4} color={KC.yellow} o={kprog(T, K.Es + 3.6 + i * 0.25, K.Es + 3.9 + i * 0.25)} />)}
        </SvgCapa>
      </Escena>
      <Escena T={T} a={segB} b={K.Ur}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Bote x={560} y={960} s={1} />
          {(() => { const c = kprog(T, segB + 0.6, segB + 1.6, kEase.suave); return c < 1 &&
            <g opacity={1 - kprog(T, segB + 1.4, segB + 1.6)}><Compresa x={560} y={klerp(560, 830, c)} s={0.7} rot={klerp(-10, 25, c)} roto={1} /></g>; })()}
          <Marca x={830} y={700} ok={true} s={0.9} o={kprog(T, segB + 1.6, segB + 2.0)} />
        </SvgCapa>
      </Escena>
      {/* 9 · urea */}
      <Escena T={T} a={K.Ur} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Molecula {...UREA} x={340} y={960} s={1.5} rot={Math.sin(T) * 6} o={kprog(T, K.Ur, K.Ur + 0.5)} />
          <text x={630} y={975} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Ur + 2.2, K.Ur + 2.6)}>=</text>
          <g opacity={kprog(T, K.Ur + 2.4, K.Ur + 3.0)}>
            <Rinon x={790} y={820} s={0.9} flip={-1} /><Rinon x={950} y={820} s={0.9} />
            <Frasco x={870} y={1110} s={1} />
          </g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la rodilla del inicio, ahora con el calor saliendo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Rodilla x={540} y={1100} s={1.1} frio={0.6} />
          <Trapo x={540} y={1000} s={1} />
          <Compresa x={540} y={880} s={1} frio={1} />
          {[300, 420, 540, 660, 780].map((x, i) => <Calor key={i} T={T} x={x} y0={1250} y1={980} o={kprog(T, K.Ci + 0.3 + i * 0.12, K.Ci + 0.8 + i * 0.12)} ph={i * 1.7} />)}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.6} texto="fabrica frío" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 2.0} until={K.Ad - 0.3} texto="roba calor" x={300} y={600} tam={46} borde={CALOR} />
      <Chip T={T} at={K.Ad + 2.4} until={K.Ap - 0.2} texto="nitrato de amonio · NH₄NO₃" x={540} y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Ad + 3.8} until={K.Ap - 0.2} texto="o urea · CO(NH₂)₂" x={540} y={1610} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Ap + 1.7} until={K.Cr - 0.2} texto="el polvo se disuelve" x={540} y={1500} tam={44} borde={AGUA} />
      <Chip T={T} at={K.Cr + 4.4} until={K.Ro - 0.2} texto="+25.7 kJ por mol" x={330} y={430} tam={42} borde={KC.red} mono />
      <Chip T={T} at={K.Ro + 0.8} until={K.Pr - 0.2} texto="el calor viaja → al polvo" x={540} y={1500} tam={42} borde={CALOR} />
      <Chip T={T} at={K.De + 2.6} until={K.Te - 0.2} texto="el desorden gana" x={540} y={1500} tam={46} borde={AGUA} />
      <Chip T={T} at={K.Te + 0.4} until={K.Es - 0.2} texto="100 g NH₄NO₃ + 50 mL H₂O" x={540} y={1500} tam={40} borde={KC.blue} mono />
      <Chip T={T} at={K.Te + 1.2} until={K.Es - 0.2} texto="demostración · G. Bodner (Purdue)" x={540} y={1610} tam={28} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.4} anio="1988" quien="LAC+USC Medical Center · Los Ángeles" revista="Challoner y McCarron · J Emerg Med" x={540} y={900} />
      <Chip T={T} at={K.Es + 3.8} until={segB - 0.2} texto="5 personas se tragaron el polvo" x={540} y={760} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Es + 6.2} until={segB - 0.2} texto="dolor de estómago" x={540} y={1500} tam={42} borde={KC.orange} />
      <Chip T={T} at={K.Es + 7.2} until={segB - 0.2} texto="presión algo baja" x={540} y={1610} tam={42} borde={KC.orange} />
      <Chip T={T} at={segB + 0.4} until={K.Ur - 0.2} texto="si se rompe: a la basura" x={540} y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={segB + 1.7} until={K.Ur - 0.2} texto="si la usa un niño: vigílalo" x={540} y={1610} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.Ur + 0.6} until={K.Ci - 0.3} x={110} y={690} texto="urea · CO(NH₂)₂" lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ur + 2.8} until={K.Ci - 0.2} texto="la misma molécula de tu orina" x={540} y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="calor de tu piel → disuelve el cristal" x={540} y={1500} tam={34} borde={CALOR} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="con un trapo, no directo" x={300} y={600} tam={30} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ad - 0.1} texto="No fabrica frío: *roba calor.*" />
      <Subtitulo T={T} idx={1} at={K.Ad + 0.1} until={K.Ap - 0.1} texto="Agua y *un polvo blanco.*" />
      <Subtitulo T={T} idx={2} at={K.Ap + 0.1} until={K.Cr - 0.1} texto="La bolsita *se rompe.*" />
      <Subtitulo T={T} idx={3} at={K.Cr + 0.1} until={K.Ro - 0.1} texto="Soltar el cristal *cuesta energía.*" />
      <Subtitulo T={T} idx={4} at={K.Ro + 0.1} until={K.Pr - 0.1} texto="La jala *de tu rodilla.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.De - 0.1} texto="¿Por qué *se disuelve?*" />
      <Subtitulo T={T} idx={6} at={K.De + 0.1} until={K.Te - 0.1} texto="El *desorden gana.*" />
      <Subtitulo T={T} idx={7} at={K.Te + 0.1} until={K.Es - 0.1} texto="De 27 a *casi 8 grados.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Ur - 0.1} texto="1988: tragarlo *sí hizo daño.*" />
      <Subtitulo T={T} idx={9} at={K.Ur + 0.1} until={K.Ci - 0.1} texto="Urea: *la de tu orina.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El frío: *tu calor yéndose.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Adentro + 1.0, CUES.Aprieta - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cristal + 0.5, CUES.Robo - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Desorden + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Termometro + 0.8, CUES.Estudio - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Estudio + 0.6, CUES.Estudio + 8.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 8.8, CUES.Urea - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Urea + 0.3, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="26" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CompresaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Compresa26 /></CompositionStage></div>;
}
window.CompresaApp = CompresaApp;
