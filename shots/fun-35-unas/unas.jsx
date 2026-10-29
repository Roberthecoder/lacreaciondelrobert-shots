// Shot Fungi Mati #35 · Hongos en las uñas (onicomicosis): por qué tarda tanto — NARRADO (N1 "Por dentro", gancho 4 "un número que contradice").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (no es un caso clínico real). No es consejo médico.
const PIEL_U = '#f2b48f', PIEL_U2 = '#d9906b', UNA_SANA = '#ffd3cf', UNA_SANA2 = '#ffb7b0', UNA_MALA = '#d9b23a', UNA_MALA2 = '#a8862a';

// Dedo gordo del pie visto desde arriba (la punta hacia arriba). (x, y) = centro de la punta del dedo.
// sano 0..1 = cuánta uña nueva y sana ya creció desde la raíz (abajo) · mala 0..1 = qué tan dañada está la uña vieja
// quiebra 0..1 = borde que se desmorona · grueso 0..1 = rayas de engrosamiento · id = único por instancia (clipPath).
function Dedo({ T = 0, x, y, s = 1, sano = 0, mala = 1, quiebra = 0, grueso = 0, id = 'd', mueve = 0 }) {
  const w = 380, nw = 290, yt = 70, yb = 440;
  const lim = yb - sano * (yb - yt);                         // frontera entre uña sana (abajo) y vieja (arriba)
  const colV = mixHex(UNA_SANA, UNA_MALA, mala), colV2 = mixHex(UNA_SANA2, UNA_MALA2, mala);
  const una = `M ${-nw / 2} ${yb} L ${-nw / 2} ${yt + 70} Q ${-nw / 2} ${yt} 0 ${yt} Q ${nw / 2} ${yt} ${nw / 2} ${yt + 70} L ${nw / 2} ${yb} Q 0 ${yb - 40} ${-nw / 2} ${yb} Z`;
  const rot = mueve * Math.sin(T * 5) * 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot} 0 900) scale(${s})`}>
    <defs><clipPath id={'cl-' + id}><path d={una} /></clipPath></defs>
    <path d={`M ${-w / 2} 1100 L ${-w / 2} 210 Q ${-w / 2} -10 0 -10 Q ${w / 2} -10 ${w / 2} 210 L ${w / 2} 1100 Z`} fill={PIEL_U} stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${-w / 2 + 30} 760 Q 0 800 ${w / 2 - 30} 760`} stroke={PIEL_U2} strokeWidth={6} fill="none" />
    <g clipPath={`url(#cl-${id})`}>
      <rect x={-nw} y={yt - 20} width={nw * 2} height={lim - yt + 20} fill={colV} />
      {grueso > 0 && [-90, -40, 10, 60, 100].map((dx, i) => <path key={i} d={`M ${dx} ${yt} L ${dx + 8} ${lim}`} stroke={colV2} strokeWidth={14} opacity={grueso} />)}
      {grueso > 0 && Array.from({ length: 7 }, (_, i) => <circle key={'m' + i} cx={-110 + (i * 47) % 230} cy={yt + 30 + ((i * 61) % 200)} r={10 + (i % 3) * 5} fill={UNA_MALA2} opacity={grueso * 0.7} />)}
      <rect x={-nw} y={lim} width={nw * 2} height={yb - lim + 40} fill={UNA_SANA} />
      <path d={`M ${-nw / 2 + 30} ${yb - 30} Q 0 ${yb - 110} ${nw / 2 - 30} ${yb - 30}`} fill="#fff1ee" opacity=".9" />
      {sano > 0.02 && sano < 0.98 && <path d={`M ${-nw} ${lim} L ${nw} ${lim}`} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 8" opacity=".55" />}
      <path d={`M ${-nw / 2 + 40} ${yt + 40} Q ${-nw / 2 + 30} ${yt + 160} ${-nw / 2 + 50} ${yt + 260}`} stroke="#fff" strokeWidth={12} fill="none" opacity=".5" strokeLinecap="round" />
    </g>
    <path d={una} fill="none" stroke={KC.ink} strokeWidth={7} />
    {quiebra > 0 && <path d={`M ${-nw / 2 + 10} ${yt + 40} L ${-80} ${yt + 70} L ${-50} ${yt + 30} L ${-10} ${yt + 80} L ${30} ${yt + 25} L ${70} ${yt + 75} L ${110} ${yt + 35} L ${nw / 2 - 10} ${yt + 60}`} stroke={KC.ink} strokeWidth={6} fill="none" opacity={quiebra} strokeLinejoin="round" />}
    {quiebra > 0 && [0, 1, 2, 3].map((k) => { const u = ((T * 0.6 + k / 4) % 1); return <path key={k} d="M 0 0 l 22 -6 l 6 14 l -20 8 z" transform={`translate(${-80 + k * 55} ${yt + 20 - u * 120}) rotate(${u * 140})`} fill={UNA_MALA} stroke={KC.ink} strokeWidth={3} opacity={quiebra * (1 - u)} />; })}
    <path d={`M ${-nw / 2 - 18} ${yb + 6} Q 0 ${yb - 52} ${nw / 2 + 18} ${yb + 6}`} stroke={PIEL_U2} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}

// Cajita de pastillas (blíster).
function Blister({ x, y, s = 1, rot = 0, usadas = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-120} y={-80} width={240} height={160} rx={18} fill="#e9eef4" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => { const cx = -84 + (i % 4) * 56, cy = -36 + Math.floor(i / 4) * 72; return <g key={i}>
      <ellipse cx={cx} cy={cy} rx={20} ry={26} fill={i < usadas ? '#c9d0d8' : '#fff'} stroke={KC.ink} strokeWidth={4} />
      {i >= usadas && <ellipse cx={cx} cy={cy} rx={11} ry={16} fill={KC.coral} stroke={KC.ink} strokeWidth={3} />}</g>; })}
  </g>;
}

// Calendario que se va llenando (n casillas = meses o semanas).
function Calendario({ x, y, n = 18, cols = 6, lleno = 0, titulo, color = KC.mint, tam = 64 }) {
  const filas = Math.ceil(n / cols), W = cols * tam + 40, H = filas * tam + 110;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={W} height={H} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={0} width={W} height={70} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.75].map((u, i) => <rect key={i} x={W * u - 8} y={-20} width={16} height={40} rx={8} fill="#999" stroke={KC.ink} strokeWidth={4} />)}
    <text x={W / 2} y={50} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">{titulo}</text>
    {Array.from({ length: n }, (_, i) => { const on = lleno * n > i; return <rect key={i} x={20 + (i % cols) * tam + 4} y={90 + Math.floor(i / cols) * tam + 4} width={tam - 8} height={tam - 8} rx={8} fill={on ? color : '#eee'} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}

// Hifa septada horizontal que crece de (x, y) hacia la derecha. p 0..1 · con microconidios en gota a los lados.
function Hifa({ T, x, y, largo = 800, p = 1, conidios = 1, color = KC.gold2, ancho = 22, fase = 0 }) {
  const L = largo * p; if (L < 4) return null;
  const pts = []; for (let u = 0; u <= L; u += 20) pts.push([x + u, y + Math.sin((u / 140) + fase) * 14]);
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" />
    {pts.filter((_, i) => i % 4 === 3).map(([px, py], i) => <line key={'s' + i} x1={px} y1={py - ancho / 2 + 2} x2={px} y2={py + ancho / 2 - 2} stroke={KC.ink} strokeWidth={4} />)}
    {conidios > 0 && pts.filter((_, i) => i % 5 === 2 && i * 20 < L - 60).map(([px, py], i) => { const ar = i % 2 ? 1 : -1, k = conidios;
      return <g key={'c' + i} transform={`translate(${px} ${py + ar * (ancho / 2)}) scale(${k})`}>
        <line x1={0} y1={0} x2={ar * 4} y2={ar * 12} stroke={KC.ink} strokeWidth={4} />
        <path d={`M ${ar * 4} ${ar * 10} Q ${ar * 4 - 13} ${ar * 30} ${ar * 4} ${ar * 40} Q ${ar * 4 + 13} ${ar * 30} ${ar * 4} ${ar * 10} Z`} fill="#fff4d6" stroke={KC.ink} strokeWidth={3.5} />
      </g>; })}
  </g>;
}

// Corte de lado del dedo (la punta a la derecha): piel, hueso, lecho, raíz (matriz) y lámina de la uña.
// hifas 0..1 = el hongo entra por debajo de la punta y avanza · sano 0..1 = uña nueva que sale de la raíz · raiz 0..1 = brillo de la matriz
function CorteDedo({ T, hifas = 0, sano = 0, raiz = 0, mala = 1 }) {
  const X0 = 330, X1 = 940, Y = 830;                         // lámina: de la raíz (X0) al borde libre (X1)
  const xb = X0 + sano * (X1 - X0);
  const xh = X1 - hifas * 470;
  const gruesa = 22 + 16 * mala;
  return fsvg(<>
    <path d="M -20 760 L 300 760 Q 360 760 380 800 L 840 800 Q 990 800 1010 930 Q 1000 1120 820 1130 L -20 1130 Z" fill={PIEL_U} stroke={KC.ink} strokeWidth={9} />
    <path d="M 120 905 Q 400 880 760 885 Q 870 895 865 965 Q 850 1035 740 1030 Q 420 1035 120 1035 Z" fill="#f3ead2" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${X0 + 20} ${Y + 18} L ${X1 - 40} ${Y + 18}`} stroke="#e98e86" strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={X0 + 10} cy={Y + 30} rx={50} ry={22} fill={mixHex('#e98e86', KC.yellow, raiz)} stroke={KC.ink} strokeWidth={5} style={raiz > 0 ? { filter:`drop-shadow(0 0 ${18 * raiz}px ${KC.yellow})` } : null} />
    {/* lámina: parte sana (de la raíz a xb) y parte vieja dañada (de xb al borde libre) */}
    <rect x={X0} y={Y - 22} width={Math.max(0, xb - X0)} height={22} rx={6} fill={UNA_SANA} stroke={KC.ink} strokeWidth={5} />
    {xb < X1 && <rect x={xb} y={Y - gruesa} width={X1 - xb} height={gruesa} rx={8} fill={mixHex(UNA_SANA, UNA_MALA, kclamp((X1 - xh) > 0 ? mala : 0, 0, 1))} stroke={KC.ink} strokeWidth={5} />}
    {xb < X1 && mala > 0 && hifas > 0 && Array.from({ length: 8 }, (_, i) => { const px = Math.max(xb, xh) + ((i * 53) % Math.max(10, X1 - Math.max(xb, xh))); return <circle key={i} cx={px} cy={Y - gruesa / 2} r={5} fill={UNA_MALA2} />; })}
    <path d="M 240 760 Q 330 770 390 812" stroke={KC.ink} strokeWidth={8} fill="none" />
    {hifas > 0 && <Cordon x1={X1 - 5} y1={Y + 14} x2={X1 - 5 - 470 * hifas} y2={Y + 14} p={1} onda={4} ancho={12} color="#fffaf0" punta={KC.yellow} />}
    {hifas > 0 && <Cordon x1={X1 - 30} y1={Y - 6} x2={X1 - 30 - 380 * hifas} y2={Y - 10} p={1} onda={5} ancho={9} color="#fffaf0" punta={KC.yellow} />}
  </>);
}

// Persona (ícono) con una marquita en la uña.
function PersonaU({ x, y, s = 1, color = '#8fb6ff', marca = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-62} r={26} fill="#f2c29b" stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    {marca > 0 && <g opacity={marca}><circle cx={34} cy={-6} r={12} fill={UNA_SANA} stroke={KC.ink} strokeWidth={3} /><line x1={26} y1={-2} x2={42} y2={-2} stroke={KC.red} strokeWidth={4} /></g>}
  </g>;
}

// Regla con una uña que crece: la marca roja se aleja de la cutícula. mm = cuánto avanza (1 mm = 150 px).
function ReglaUna({ x, y, mm, p, titulo, valor, color }) {
  const px = 150, L = mm * px * p;
  return <g transform={`translate(${x} ${y})`}>
    <text x={0} y={-90} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{titulo} <tspan fill={KC.ink}>· {valor}</tspan></text>
    <rect x={0} y={-60} width={860} height={70} rx={14} fill={UNA_SANA} stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={-60} width={40} height={70} rx={10} fill={PIEL_U2} stroke={KC.ink} strokeWidth={5} />
    <line x1={40 + L} y1={-66} x2={40 + L} y2={16} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    {L > 10 && <path d={`M 50 -25 L ${30 + L} -25`} stroke={KC.red} strokeWidth={4} strokeDasharray="10 8" />}
    <rect x={0} y={20} width={860} height={40} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, i) => <g key={i}><line x1={40 + i * px} y1={20} x2={40 + i * px} y2={50} stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 9 }, (_, k) => <line key={k} x1={40 + i * px + (k + 1) * 15} y1={20} x2={40 + i * px + (k + 1) * 15} y2={k === 4 ? 42 : 34} stroke={KC.ink} strokeWidth={2} />)}</g>)}
  </g>;
}

// Chancla vista desde arriba.
function Chancla({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -170 Q 0 -210 70 -170 Q 95 -40 75 120 Q 0 190 -75 120 Q -95 -40 -70 -170 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 -150 L -64 -40 M 0 -150 L 64 -40" stroke={KC.yellow} strokeWidth={16} strokeLinecap="round" />
    <circle cx={0} cy={-150} r={10} fill={KC.ink} />
  </g>;
}

function UnasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Culpable, En: CUES.Entrada, Q: CUES.Queratina, D: CUES.Dano, P: CUES.Pregunta, R: CUES.Raiz, E: CUES.Estudio, Re: CUES.Resultado, Ti: CUES.Tiempo, Rg: CUES.Regresa, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G + 0.15, K.G + 0.85, kEase.rebote);
  const NAIL = { x: 470, y: 600 };                          // punta del dedo grande en las escenas macro
  const lupaInterior = (Tl, r) => <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#1d1408" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={(k % 2) * -60} y={20 + k * 44} width={r * 2 + 80} height={36} rx={10} fill="#e8cf8a" opacity=".28" />)}
    <Hifa T={Tl} x={10} y={r - 40} largo={r * 2} p={kprog(Tl, K.Cu, K.Cu + 1.6)} conidios={kprog(Tl, K.Cu + 1.0, K.Cu + 2.0)} ancho={16} />
    <Hifa T={Tl} x={-20} y={r + 70} largo={r * 2} p={kprog(Tl, K.Cu + 0.4, K.Cu + 2.0)} conidios={kprog(Tl, K.Cu + 1.4, K.Cu + 2.4)} ancho={16} fase={2} />
  </svg>;
  // micro: ladrillos de queratina (onicocitos aplanados) que se deshacen cerca de las hifas
  const digiere = kprog(T, K.Q + 1.0, K.D - 0.2);
  const ladrillos = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) { const x = c * 260 - (r % 2) * 130 - 40, y = 600 + r * 50;
    const cerca = (Math.abs(y + 22 - 730) < 60 || Math.abs(y + 22 - 910) < 60);
    ladrillos.push(<rect key={r + '-' + c} x={x} y={y} width={250} height={46} rx={12} fill="#f0d79a" stroke="#a88b55" strokeWidth={3} opacity={1 - (cerca ? digiere * 0.8 : 0)} />); }
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: el dedo con la uña dañada, la pastilla y el tiempo; luego la lupa */}
      <Escena T={T} a={K.G} b={K.En} zoom={0.06} origen="45% 40%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Dedo T={T} x={NAIL.x} y={NAIL.y} id="g" mala={1} grueso={1} quiebra={0.4} mueve={1 - kprog(T, K.G + 1.5, K.G + 2.5)} />
          <Blister x={klerp(160, 200, cae)} y={klerp(-200, 1060, cae)} rot={klerp(-60, -14, cae)} s={0.95} usadas={Math.floor(8 * kprog(T, K.G + 1.0, K.G + 3.0))} />
          {T > K.G + 3.9 && T < K.Cu + 0.4 && <g opacity={kprog(T, K.G + 3.9, K.G + 4.3) * (1 - kprog(T, K.Cu - 0.2, K.Cu + 0.3))}><Calendario x={700} y={800} n={12} cols={4} tam={66} lleno={kprog(T, K.G + 4.0, K.Cu)} titulo="MESES" color={KC.orange} /></g>}
        </>)}
      </Escena>
      <Lupa T={T} at={K.Cu + 0.05} until={K.En - 0.3} x={760} y={900} r={190} fx={NAIL.x} fy={NAIL.y + 180} interior={lupaInterior} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · HONGO" />
      {/* 3 · por dónde entra: corte de lado del dedo */}
      <Escena T={T} a={K.En} b={K.Q}>
        <FondoLunares color={KC.cyan} />
        <CorteDedo T={T} hifas={kprog(T, K.En + 0.6, K.Q, kEase.suave)} mala={kprog(T, K.En + 1.2, K.Q)} />
      </Escena>
      {/* 4 · al microscopio: digiere la queratina */}
      <Escena T={T} a={K.Q} b={K.D}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {ladrillos}
          <Hifa T={T} x={-40} y={730} largo={1200} p={kprog(T, K.Q - 0.3, K.Q + 2.0)} conidios={kprog(T, K.Q + 1.2, K.Q + 2.2)} />
          <Hifa T={T} x={-40} y={910} largo={1200} p={kprog(T, K.Q + 0.2, K.Q + 2.6)} conidios={kprog(T, K.Q + 1.6, K.Q + 2.8)} fase={2.3} />
          {digiere > 0 && Array.from({ length: 34 }, (_, i) => { const u = ((T * 0.8 + i / 34) % 1); const yy = (i % 2 ? 730 : 910) + (i % 3 - 1) * 34 + Math.sin(T * 3 + i) * 10;
            return <circle key={'e' + i} cx={(i * 61) % 1060 + 10} cy={yy} r={6} fill={KC.cyan} opacity={digiere * (1 - u)} />; })}
        </>)}
      </Escena>
      {/* 5 · el daño: color, grosor, se quiebra */}
      <Escena T={T} a={K.D} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Dedo T={T} x={NAIL.x} y={NAIL.y} id="d" mala={1} grueso={kprog(T, K.D + 0.6, K.D + 1.2)} quiebra={kprog(T, K.D + 1.3, K.D + 1.9)} />)}
      </Escena>
      {/* 6 · pregunta: el hongo se fue, la uña sigue fea */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Dedo T={T} x={720} y={760} s={0.62} id="p" mala={1} grueso={1} quiebra={1} />
          <Interrogacion T={T} x={790} y={700} tam={380} />
        </>)}
      </Escena>
      {/* 7 · la raíz fabrica uña nueva y empuja a la vieja */}
      <Escena T={T} a={K.R} b={K.E}>
        <FondoLunares color={KC.cyan} />
        <CorteDedo T={T} hifas={0} sano={kprog(T, K.R + 1.0, K.E + 0.3, kEase.suave) * 0.6} raiz={kprog(T, K.R + 0.2, K.R + 0.8) * (0.7 + 0.3 * Math.sin(T * 6))} mala={1} />
        {fsvg(<path d={`M ${400 + kprog(T, K.R + 1.0, K.E) * 300} 700 l 120 0 m -30 -26 l 30 26 l -30 26`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.R + 1.2, K.R + 1.6)} />)}
      </Escena>
      {/* 8 · el estudio: 22 jóvenes marcan sus uñas */}
      <Escena T={T} a={K.E} b={K.Re}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{Array.from({ length: 22 }, (_, i) => { const on = kprog(T, K.E + 1.4 + i * 0.07, K.E + 1.7 + i * 0.07, kEase.rebote);
          return on > 0 ? <PersonaU key={i} x={100 + (i % 11) * 88} y={900 + Math.floor(i / 11) * 160} s={on * 0.85} color={i % 3 ? '#8fb6ff' : KC.pink} marca={kprog(T, K.E + 3.0 + i * 0.05, K.E + 3.3 + i * 0.05)} /> : null; })}</>)}
      </Escena>
      {/* 9 · resultado: manos 3.47 mm/mes · pies 1.62 mm/mes */}
      <Escena T={T} a={K.Re} b={K.Ti}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ReglaUna x={110} y={860} mm={3.47} p={kprog(T, K.Re + 0.3, K.Re + 2.2, kEase.suave)} titulo="MANOS" valor="3.47 mm/mes" color={KC.mint} />
          <ReglaUna x={110} y={1120} mm={1.62} p={kprog(T, K.Re + 2.4, K.Re + 4.2, kEase.suave)} titulo="PIES" valor="1.62 mm/mes" color={KC.orange} />
        </>)}
      </Escena>
      {/* 10 · el tiempo: la uña se renueva de la raíz a la punta */}
      <Escena T={T} a={K.Ti} b={K.Rg} zoom={0.04} origen="45% 40%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Dedo T={T} x={NAIL.x - 90} y={NAIL.y} id="t" mala={1} grueso={1 - kprog(T, K.Ti, K.Rg)} quiebra={0} sano={kprog(T, K.Ti + 0.2, K.Rg + 0.2, kEase.suave) * 0.85} />
          <Calendario x={640} y={700} n={18} cols={3} tam={74} lleno={kprog(T, K.Ti + 0.2, K.Rg)} titulo="18 MESES" />
        </>)}
      </Escena>
      {/* 11 · regresa: 1 de cada 4 o 5 */}
      <Escena T={T} a={K.Rg} b={K.S}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>{[0, 1, 2, 3, 4].map((i) => { const m = i === 2 ? kprog(T, K.Rg + 1.4, K.Rg + 2.4) : 0;
          return <Dedo key={i} T={T} x={140 + i * 200} y={800} s={0.44} id={'r' + i} mala={m} grueso={m} quiebra={0} sano={0} />; })}</>)}
      </Escena>
      {/* 12 · lo que ayuda */}
      <Escena T={T} a={K.S} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'#bfeaf5', backgroundImage:'linear-gradient(#ffffff 4px, transparent 4px), linear-gradient(90deg, #ffffff 4px, transparent 4px)', backgroundSize:'120px 120px' }}></div>
        {fsvg(<>
          {Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.9 + i / 10) % 1); return <circle key={i} cx={100 + i * 95} cy={300 + u * 1100} r={9} fill="#7fd3ff" opacity={0.7 * (1 - u)} />; })}
          <Chancla x={380} y={klerp(-300, 840, kprog(T, K.S + 0.2, K.S + 0.8, kEase.rebote))} rot={-8} />
          <Chancla x={600} y={klerp(-300, 860, kprog(T, K.S + 0.4, K.S + 1.0, kEase.rebote))} rot={8} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo dedo del inicio, ya con uña nueva */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 40%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Dedo T={T} x={NAIL.x} y={NAIL.y} id="c" mala={1} grueso={0} quiebra={0} sano={klerp(0.86, 1, kprog(T, K.C + 1.2, K.C + 3.6, kEase.suave))} />
          <Blister x={200} y={1060} rot={-14} s={0.95} usadas={8} />
          <Calendario x={700} y={940} n={18} cols={6} tam={50} lleno={1} titulo="18 MESES" />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.9} until={K.Cu - 0.2} texto="pastilla: 12 semanas ✓" x={330} y={430} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.G + 3.6} until={K.Cu - 0.2} texto="¿uña sana? 1 año o más" x={330} y={520} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Cu + 0.8} until={K.En - 0.3} x={60} y={470} texto="dermatofito" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Cu + 1.3} until={K.En - 0.3} x={60} y={530} texto="Trichophyton rubrum" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.En + 0.2} until={K.Q - 0.3} texto="POR DENTRO · DEDO GORDO" x={420} y={470} tam={32} mono borde={KC.ink} />
      <Etq T={T} at={K.En + 0.5} until={K.Q - 0.3} x={900} y={720} texto="uña" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.En + 0.9} until={K.Q - 0.3} x={950} y={890} texto="entra por aquí" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.En + 1.3} until={K.Q - 0.3} x={340} y={1090} texto="raíz (matriz)" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.2} until={K.D - 0.3} texto="AL MICROSCOPIO · LA UÑA" x={420} y={470} tam={32} mono borde={KC.cyan} />
      <Etq T={T} at={K.Q + 0.6} until={K.D - 0.3} x={40} y={560} texto="queratina = proteína dura" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Q + 1.2} until={K.D - 0.3} x={40} y={1145} texto="hifa con tabiques" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Q + 1.8} until={K.D - 0.3} x={1040} y={1095} texto="enzimas" lado="izq" tam={28} color={KC.cyan} />
      <Etq T={T} at={K.Q + 1.6} until={K.D - 0.3} x={40} y={1095} texto="microconidios (en gota)" tam={28} color={KC.texto} />
      <Chip T={T} at={K.D + 0.2} until={K.P - 0.3} texto="color" x={850} y={560} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.D + 0.7} until={K.P - 0.3} texto="grosor" x={850} y={680} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.D + 1.3} until={K.P - 0.3} texto="se quiebra" x={850} y={800} tam={40} borde={KC.red} />
      <Chip T={T} at={K.P + 0.2} until={K.R - 0.3} texto="hongo: fuera ✓" x={780} y={440} tam={38} borde={KC.leaf} />
      <Etq T={T} at={K.R + 0.4} until={K.E - 0.3} x={60} y={1090} texto="raíz (matriz): aquí nace la uña" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 1.4} until={K.E - 0.3} texto="uña nueva → empuja a la vieja" x={420} y={600} tam={32} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Re - 0.3} anio="2010" quien="Estados Unidos · 22 jóvenes" revista="Yaemsiri et al., JEADV" x={400} y={590} />
      <Chip T={T} at={K.Ti + 0.2} until={K.Rg - 0.3} texto="12–18 meses" x={330} y={470} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Rg + 0.6} until={K.S - 0.3} texto="20–25 % regresa" x={380} y={470} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Rg + 0.6} until={K.S - 0.3} texto="por lo general antes de 2 años" x={380} y={560} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.8} until={K.C - 0.3} texto="✓ no andes descalzo en lugares públicos" x={480} y={1060} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.0} until={K.C - 0.3} texto="✓ ¿pie de atleta? trátalo pronto" x={480} y={1150} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="uña nueva del pie: hasta 18 meses" x={390} y={470} tam={32} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.En} texto="1 cm" largo={200} />
      <BarraEscala T={T} at={K.En} until={K.Q} texto="1 cm" largo={300} />
      <BarraEscala T={T} at={K.Q} until={K.D} texto="10 µm" largo={90} />
      <BarraEscala T={T} at={K.D} until={K.R} texto="1 cm" largo={200} />
      <BarraEscala T={T} at={K.R} until={K.E} texto="1 cm" largo={300} />
      <BarraEscala T={T} at={K.E} until={K.Re} texto="1 m" largo={54} />
      <BarraEscala T={T} at={K.Re} until={K.Ti} texto="1 mm" largo={150} />
      <BarraEscala T={T} at={K.Ti} until={K.Rg} texto="1 cm" largo={200} />
      <BarraEscala T={T} at={K.Rg} until={K.S} texto="1 cm" largo={88} />
      <BarraEscala T={T} at={K.S} until={K.C} texto="10 cm" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="Pastilla: 12 semanas. ¿Uña sana? *Un año o más.*" />
      <Subtitulo T={T} idx={1} at={K.Cu + 0.1} until={K.En - 0.1} texto="Suele ser un dermatofito: *Trichophyton rubrum.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Q - 0.1} texto="Lo más común: entra por la punta, *debajo de la uña.*" />
      <Subtitulo T={T} idx={3} at={K.Q + 0.1} until={K.D - 0.1} texto="Digiere la *queratina* con enzimas." />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.P - 0.1} texto="Cambia de color, *se engruesa y se quiebra.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.R - 0.1} texto="Si el hongo se fue, *¿por qué sigue fea?*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.E - 0.1} texto="La raíz fabrica *uña nueva* y la empuja." />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Re - 0.1} texto="2010, Estados Unidos: *22 jóvenes.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Ti - 0.1} texto="Manos: 3.47 mm al mes. *Pies: 1.62.*" />
      <Subtitulo T={T} idx={9} at={K.Ti + 0.1} until={K.Rg - 0.1} texto="Una uña del pie: *12 a 18 meses.*" />
      <Subtitulo T={T} idx={10} at={K.Rg + 0.1} until={K.S - 0.1} texto="1 de cada 4 o 5 veces *regresa.*" />
      <Subtitulo T={T} idx={11} at={K.S + 0.1} until={K.C - 0.1} texto="No andes descalzo; *trata el pie de atleta.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Uña nueva del pie: *hasta año y medio.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Cu + 0.3, K.En - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Q + 0.4, K.D - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.R + 0.4, 'avatar_07_pensativo_puno', 'grande-izq'],
        [K.R + 2.2, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Re + 2.5, K.Ti - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Rg + 0.3, K.S - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.S + 0.4, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 1.4, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="35" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function UnasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><UnasShot /></CompositionStage></div>;
}
window.UnasApp = UnasApp;
