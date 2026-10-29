// Shot Químico #23 · Ese limón no te da electricidad (la pila de limón) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const ZN = '#b9c2cc', ZN_GASTO = '#959ca4', ACERO = '#5d646c', CU = '#d8793a', CU_OSC = '#a9531f', LIMON = '#ffd21a', JUGO = '#fff4a8', ELEC = '#ffe11a';

// Punto a lo largo de una polilínea (u = 0..1 por longitud).
function lp_punto(P, u) {
  const L = []; let tot = 0;
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = ((u % 1) + 1) % 1 * tot;
  for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const k = L[i] ? r / L[i] : 0; return [klerp(P[i][0], P[i + 1][0], k), klerp(P[i][1], P[i + 1][1], k)]; } r -= L[i]; }
  return P[P.length - 1];
}
function Electrones({ T, P, n = 8, vel = 0.3, o = 1, r = 11 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const [x, y] = lp_punto(P, T * vel + i / n);
    return <g key={i}><circle cx={x} cy={y} r={r + 6} fill={ELEC} opacity={0.3} /><circle cx={x} cy={y} r={r} fill={ELEC} stroke={KC.ink} strokeWidth={3} /></g>; })}</g>;
}
// Limón entero (centro x, y). corte = 0..1 muestra el interior (rayos X).
function Limon({ x, y, s = 1, rot = 0, corte = 0, o = 1 }) {
  const id = `lm${Math.round(x)}${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -300 0 Q -290 -22 -262 -30 Q -230 -185 0 -190 Q 230 -185 262 -30 Q 290 -22 300 0 Q 290 22 262 30 Q 230 185 0 190 Q -230 185 -262 30 Q -290 22 -300 0 Z" fill={LIMON} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[[-150, -90], [-60, -130], [60, -120], [160, -80], [-190, 40], [-90, 110], [30, 140], [140, 100], [200, 20], [-20, -40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill="#e3b400" opacity={1 - corte} />)}
    <ellipse cx={-90} cy={-100} rx={90} ry={34} fill="#fff" opacity={0.35 * (1 - corte)} transform="rotate(-12 -90 -100)" />
    {corte > 0 && <g opacity={corte}>
      <ellipse rx={238} ry={160} fill="#fffbe0" stroke="#f3e08a" strokeWidth={8} />
      {Array.from({ length: 10 }, (_, i) => { const a0 = i * 36 * Math.PI / 180, a1 = (i * 36 + 32) * Math.PI / 180;
        return <path key={i} d={`M ${Math.cos(a0) * 26} ${Math.sin(a0) * 18} L ${Math.cos(a0) * 222} ${Math.sin(a0) * 148} A 222 148 0 0 1 ${Math.cos(a1) * 222} ${Math.sin(a1) * 148} Z`} fill={JUGO} stroke="#f6e27a" strokeWidth={4} />; })}
      <ellipse rx={30} ry={20} fill="#fffbe0" />
    </g>}
  </g>;
}
// Clavo galvanizado vertical (punta hacia abajo). Origen = punta del clavo dentro del limón. gasto = 0..1 (un poco opaco en la punta).
function Clavo({ x, y, s = 1, rot = 0, gasto = 0, largo = 430 }) {
  const cab = -largo;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -14 ${cab + 14} L 14 ${cab + 14} L 14 -40 L 0 0 L -14 -40 Z`} fill={ZN} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {gasto > 0 && <g opacity={gasto}>
      <path d="M -14 -150 L 14 -150 L 14 -40 L 0 0 L -14 -40 Z" fill={ZN_GASTO} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[[-5, -120], [6, -90], [-4, -62], [5, -132]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3} fill="#6f757c" />)}
    </g>}
    <line x1={-6} y1={cab + 24} x2={-6} y2={-50} stroke="#fff" strokeWidth={4} opacity={0.5} />
    <rect x={-46} y={cab} width={92} height={22} rx={8} fill={ZN} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tira de cobre vertical. Origen = punta de abajo.
function Cobre({ x, y, s = 1, largo = 430 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-17} y={-largo} width={34} height={largo} rx={8} fill={CU} stroke={KC.ink} strokeWidth={6} />
    <line x1={-6} y1={-largo + 12} x2={-6} y2={-14} stroke="#ffc59a" strokeWidth={5} opacity={0.7} />
  </g>;
}
// Voltímetro digital (centro x, y). texto = lectura.
function Voltimetro({ x, y, s = 1, texto = '0.0 V', brillo = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-135} y={-105} width={270} height={210} rx={30} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-105} y={-78} width={210} height={98} rx={12} fill="#1b2a20" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-8} textAnchor="middle" style={{ font:`700 62px ${KF.mono}` }} fill="#7dff9a" opacity={0.4 + 0.6 * brillo}>{texto}</text>
    <circle cx={-70} cy={70} r={16} fill={KC.ink} /><circle cx={70} cy={70} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={82} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>V</text>
  </g>;
}
// La pila de limón completa, en coordenadas locales: limón en (0,0), clavo en x = -130, cobre en x = 130, voltímetro arriba a la izquierda.
// clavoDy: cuánto se ha sacado el clavo (negativo = arriba). valor: lectura. flujo: 0..1 electrones por el cable.
function PilaLimon({ T, x, y, s = 1, valor = 0, flujo = 0, clavoDy = 0, gasto = 0, conecta = 1, dec = 1, vm = [-230, -560] }) {
  const id = `pl${Math.round(x)}`;
  const N0 = [-130, -330 + clavoDy];
  const COM = [vm[0] - 70, vm[1] + 86], ROJO = [vm[0] + 70, vm[1] + 86];
  const P = [N0, [-130, -420 + Math.min(0, clavoDy)], [COM[0], -420 + Math.min(0, clavoDy)], COM, ROJO, [ROJO[0], -440], [130, -440], [130, -330]];
  const cableN = `M ${N0[0]} ${N0[1]} L -130 ${-420 + Math.min(0, clavoDy)} L ${COM[0]} ${-420 + Math.min(0, clavoDy)} L ${COM[0]} ${COM[1]}`;
  const cableC = `M 130 -330 L 130 -440 L ${ROJO[0]} -440 L ${ROJO[0]} ${ROJO[1]}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Limon x={0} y={0} />
    <clipPath id={id}><rect x={-400} y={-1400} width={800} height={1240} /></clipPath>
    <g clipPath={`url(#${id})`}><Clavo x={-130} y={60 + clavoDy} gasto={gasto} largo={390} /><Cobre x={130} y={60} largo={390} /></g>
    <ellipse cx={-130} cy={-166} rx={26} ry={9} fill="#b88a00" /><ellipse cx={130} cy={-160} rx={24} ry={9} fill="#b88a00" />
    {clavoDy < -230 && <Clavo x={-130} y={60 + clavoDy} gasto={gasto} largo={390} />}
    <g opacity={conecta}>
      <path d={cableN} fill="none" stroke={KC.ink} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
      <path d={cableC} fill="none" stroke={KC.red} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
      <path d={cableC} fill="none" stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" opacity={0.5} />
      <circle cx={N0[0]} cy={N0[1]} r={14} fill="#7a7f86" stroke={KC.ink} strokeWidth={4} />
      <circle cx={130} cy={-330} r={14} fill="#7a7f86" stroke={KC.ink} strokeWidth={4} />
    </g>
    <Electrones T={T} P={P} o={flujo} />
    <Voltimetro x={vm[0]} y={vm[1]} texto={`${valor.toFixed(dec)} V`} brillo={conecta} />
  </g>;
}
// Vaso con ácido y las dos tiras (el "limón simulado" de Goodisman).
function VasoPila({ T, x, y, s = 1, burbujas = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <VasoLab x={0} y={0} liquido="#f3f7c8" nivel={0.62} ancho={300} alto={320}>
      <Burbujas T={T} x={35} y={-195} w={50} h={185} n={16} f={burbujas} color="rgba(60,90,120,.85)" rmax={9} vel={120} seed={4} />
      <Burbujas T={T} x={-75} y={-195} w={30} h={185} n={6} f={burbujas} color="rgba(60,90,120,.7)" rmax={4} vel={90} seed={9} />
    </VasoLab>
    <rect x={-80} y={-380} width={40} height={350} rx={6} fill={ZN} stroke={KC.ink} strokeWidth={6} />
    <rect x={40} y={-380} width={40} height={350} rx={6} fill={CU} stroke={KC.ink} strokeWidth={6} />
    <text x={-60} y={-395} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>Zn</text>
    <text x={60} y={-395} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>Cu</text>
  </g>;
}
function Ion({ x, y, txt, color, r = 30, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r + 10} fill={color} opacity={0.25} /><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text x={x} y={y + r * 0.32} textAnchor="middle" style={{ font:`700 ${r * 0.85}px ${KF.mono}` }} fill={KC.ink}>{txt}</text></g>;
}
function LED({ x, y, s = 1, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && <circle cx={0} cy={-60} r={90 + 70 * luz} fill="#ff3b2f" opacity={0.35 * luz} />}
    {luz > 0 && <circle cx={0} cy={-60} r={60 + 30 * luz} fill="#ffd0c8" opacity={0.45 * luz} />}
    <path d="M -50 0 L -50 -70 Q -50 -125 0 -125 Q 50 -125 50 -70 L 50 0 Z" fill={mixHex('#9e1b14', '#ff5a4a', luz)} stroke={KC.ink} strokeWidth={7} />
    <rect x={-62} y={-4} width={124} height={22} rx={6} fill={mixHex('#9e1b14', '#ff5a4a', luz)} stroke={KC.ink} strokeWidth={6} />
    <line x1={-22} y1={18} x2={-22} y2={110} stroke="#8a8f99" strokeWidth={8} /><line x1={22} y1={18} x2={22} y2={90} stroke="#8a8f99" strokeWidth={8} />
  </g>;
}
function Tenedor({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={230} rx={12} fill="#d9dde2" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 0 L -40 -110 M -13 0 L -13 -110 M 13 0 L 13 -110 M 40 0 L 40 -110" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <path d="M -40 0 L -40 -110 M -13 0 L -13 -110 M 13 0 L 13 -110 M 40 0 L 40 -110" stroke="#d9dde2" strokeWidth={9} strokeLinecap="round" />
    <path d="M -46 -10 Q 0 40 46 -10" fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Flecha({ T, x, y, rot = 0, o = 1, color = KC.red }) {
  if (o <= 0) return null;
  const b = Math.sin(T * 9) * 12;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) translate(${b} 0)`} opacity={o}>
    <path d="M -150 -22 L -10 -22 L -10 -60 L 70 0 L -10 60 L -10 22 L -150 22 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}

function Limones() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Z: CUES.Zinc, Ca: CUES.Cable, J: CUES.Jugo, Pr: CUES.Pregunta, Es: CUES.Estudio, Vo: CUES.Voltaje, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el clavo entra, se conecta y el voltímetro salta a 0.9 V
  const entra = kprog(T, K.G, K.G + 0.4, kEase.sale);
  const conecta = kprog(T, K.G + 0.45, K.G + 0.6);
  const lectura = klerp(0, 0.9, kprog(T, K.G + 0.6, K.G + 1.1, kEase.sale));
  // cierre: se saca el clavo y se vuelve a meter
  const saca = kprog(T, K.Ci + 0.6, K.Ci + 1.3, kEase.suave) * (1 - kprog(T, K.Ci + 4.0, K.Ci + 4.6, kEase.suave));
  const fuera = saca > 0.2;
  // Zn que se disuelven (escena micro)
  const zn = Array.from({ length: 6 }, (_, i) => ({ t0: K.Z + 0.6 + i * 0.55, y: 790 + i * 62, dx: 420 + ((i * 137) % 300), dy: ((i * 71) % 120) - 60 }));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la pila de limón y el voltímetro */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <PilaLimon T={T} x={500} y={1080} clavoDy={-260 * (1 - entra)} conecta={conecta} valor={lectura} flujo={kprog(T, K.G + 0.7, K.G + 1.2)} vm={[-230, -540]} />
          <Flecha T={T} x={170} y={830} rot={20} o={kprog(T, K.G + 2.2, K.G + 2.5)} />
          <g transform="translate(70 360)"><line x1={0} y1={0} x2={370} y2={0} stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={-14} x2={0} y2={14} stroke={KC.ink} strokeWidth={8} /><line x1={370} y1={-14} x2={370} y2={14} stroke={KC.ink} strokeWidth={8} />
            <text x={185} y={-18} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>5 cm</text></g>
        </SvgCapa>
      </Escena>
      {/* 1 · clavo galvanizado y alambre de cobre */}
      <Escena T={T} a={K.Q} b={K.Z}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g transform={`translate(${klerp(-300, 0, kprog(T, K.Q, K.Q + 0.5, kEase.sale))} 0)`}>
            <Clavo x={880} y={860} s={1.6} rot={90} largo={430} />
            {(() => { const p = kprog(T, K.Q + 1.0, K.Q + 1.6, kEase.sale); return <g opacity={p}>
              <rect x={560} y={838} width={170 * p} height={44} fill={ACERO} stroke={KC.ink} strokeWidth={5} />
              <path d={`M ${560 + 170 * p} 838 q 30 -60 70 -40`} fill="none" stroke={ZN} strokeWidth={14} strokeLinecap="round" />
              <path d={`M ${560 + 170 * p} 838 q 30 -60 70 -40`} fill="none" stroke={KC.ink} strokeWidth={3} />
            </g>; })()}
          </g>
          <g transform={`translate(${klerp(400, 0, kprog(T, K.Q + 2.3, K.Q + 2.8, kEase.sale))} 0)`}>
            <rect x={200} y={1068} width={680} height={40} rx={14} fill={CU} stroke={KC.ink} strokeWidth={7} />
            <line x1={214} y1={1080} x2={866} y2={1080} stroke="#ffc59a" strokeWidth={5} opacity={0.7} />
          </g>
          {[[150, 860, '−', ZN, K.Q + 1.8], [150, 1088, '+', KC.red, K.Q + 3.0]].map(([x, y, t, c, at], i) => { const e = kprog(T, at, at + 0.35, kEase.rebote);
            return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}><circle r={46} fill={c} stroke={KC.ink} strokeWidth={7} /><text y={22} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>{t}</text></g>; })}
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: el zinc se oxida y se disuelve */}
      <Escena T={T} a={K.Z} b={K.Ca} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={0} width={KW} height={KH} fill={LIMON} opacity={0.07} />
          <rect x={0} y={700} width={250} height={520} fill="#3d434b" />
          {Array.from({ length: 24 }, (_, i) => { const c = i % 3, f = Math.floor(i / 3); return <Atomo key={i} x={50 + c * 80} y={735 + f * 64} r={28} color="#8a929c" />; })}
          {zn.map((z, i) => { const sale = kprog(T, z.t0, z.t0 + 1.6, kEase.suave), e = kprog(T, z.t0 - 0.1, z.t0 + 0.6, kEase.sale);
            const x = klerp(300, 300 + z.dx, sale), y = z.y + z.dy * sale;
            return <g key={i}>
              {[0, 1].map((k) => <circle key={k} cx={klerp(300, 120 + k * 40, e)} cy={z.y + (k ? 18 : -18) + Math.sin(T * 8 + k) * 3} r={12} fill={ELEC} stroke={KC.ink} strokeWidth={3} opacity={T < z.t0 - 0.1 ? 0 : 1 - kprog(T, z.t0 + 0.6, z.t0 + 1.0)} />)}
              <Ion x={x} y={y + Math.sin(T * 2 + i) * 6} txt={sale > 0.05 ? 'Zn²⁺' : 'Zn'} color={sale > 0.05 ? '#9fe8ff' : ZN} r={34} />
            </g>; })}
          <text x={125} y={1270} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>clavo</text>
          <text x={700} y={1270} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>jugo de limón</text>
          <g transform="translate(700 660)"><line x1={0} y1={0} x2={90} y2={0} stroke={KC.texto} strokeWidth={6} /><text x={110} y={10} style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>≈ 1 nm · esquema</text></g>
        </SvgCapa>
      </Escena>
      {/* 3 · los electrones por el cable */}
      <Escena T={T} a={K.Ca} b={K.J}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <PilaLimon T={T} x={660} y={1080} valor={0.9} flujo={1} vm={[-210, -540]} />
          <Flecha T={T} x={270} y={460} rot={0} o={kprog(T, K.Ca + 1.0, K.Ca + 1.3) * (1 - kprog(T, K.Ca + 3.2, K.Ca + 3.6))} color={ELEC} />
        </SvgCapa>
      </Escena>
      {/* 4 · el jugo es el electrolito (rayos X) */}
      <Escena T={T} a={K.J} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Limon x={520} y={980} s={1.4} corte={kprog(T, K.J, K.J + 0.8)} />
          <Clavo x={370} y={1140} largo={460} /><Cobre x={670} y={1140} largo={460} />
          <path d="M 370 690 Q 520 540 670 690" fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
          {Array.from({ length: 5 }, (_, i) => { const u = (T * 0.35 + i / 5) % 1; return <g key={i}>
            <Ion x={klerp(400, 640, u)} y={880 + i * 50} txt="H⁺" color="#ff8a8a" r={24} o={kprog(T, K.J + 0.8, K.J + 1.2)} />
            <Ion x={klerp(640, 400, (u + 0.5) % 1)} y={905 + i * 50} txt="−" color={KC.lilac} r={22} o={kprog(T, K.J + 0.8, K.J + 1.2)} /></g>; })}
          {(() => { const on = kprog(T, K.J + 2.6, K.J + 3.0); const P = [[370, 690], [445, 625], [520, 610], [595, 625], [670, 690], [670, 1000], [370, 1000], [370, 690]];
            const [x, y] = lp_punto(P, (T - K.J) * 0.45); return on > 0 && <g opacity={on}><circle cx={x} cy={y} r={46} fill="#fff" opacity={0.45} /><circle cx={x} cy={y} r={22} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>; })()}
        </SvgCapa>
      </Escena>
      {/* 5 · re-gancho: ¿qué pasa en el cobre? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Cobre x={170} y={1180} s={1.4} largo={430} />
          {Array.from({ length: 9 }, (_, i) => { const e = kprog(T, K.Pr + i * 0.15, K.Pr + i * 0.15 + 0.4, kEase.sale);
            return <circle key={i} cx={klerp(170, 210 + (i % 3) * 32, e)} cy={klerp(560, 1020 + Math.floor(i / 3) * 40, e)} r={13} fill={ELEC} stroke={KC.ink} strokeWidth={3} opacity={e} />; })}
          <text x={390} y={1110} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 390 900)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · 2001, Syracuse: limón simulado y gas hidrógeno */}
      <Escena T={T} a={K.Es} b={K.Vo}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <VasoPila T={T} x={540} y={1180} s={1.25} burbujas={kprog(T, K.Es + 2.4, K.Es + 4.0)} />
          {(() => { const z = kprog(T, K.Es + 4.0, K.Es + 4.5, kEase.sale); if (z <= 0) return null;
            const c = ((T - K.Es - 4.5) % 2.2 + 2.2) % 2.2, junta = kprog(c, 0.3, 1.0, kEase.suave), sube = kprog(c, 1.1, 2.1);
            return <g opacity={z}>
              <line x1={615} y1={900} x2={700} y2={760} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" />
              <circle cx={760} cy={560} r={200 * z} fill={KC.noche} stroke={KC.ink} strokeWidth={9} />
              <clipPath id="lupaH"><circle cx={760} cy={560} r={195 * z} /></clipPath>
              <g clipPath="url(#lupaH)">
                <rect x={560} y={360} width={70} height={400} fill={CU} />
                {sube <= 0 ? <g>
                  <Ion x={klerp(900, 700, junta)} y={500} txt="H⁺" color="#ff8a8a" r={26} />
                  <Ion x={klerp(900, 700, junta)} y={620} txt="H⁺" color="#ff8a8a" r={26} />
                  <circle cx={klerp(630, 690, junta)} cy={530} r={11} fill={ELEC} stroke={KC.ink} strokeWidth={3} />
                  <circle cx={klerp(630, 690, junta)} cy={590} r={11} fill={ELEC} stroke={KC.ink} strokeWidth={3} />
                </g> : <g transform={`translate(${720} ${klerp(560, 380, sube)})`}>
                  <circle r={62} fill="rgba(255,255,255,.15)" stroke="#bfe8ff" strokeWidth={4} />
                  <Atomo x={-22} y={0} r={26} color="#fff" letra="H" /><Atomo x={22} y={0} r={26} color="#fff" letra="H" />
                </g>}
              </g>
            </g>; })()}
          <text x={540} y={1250} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Es + 3.6, K.Es + 4.0)}>"limón simulado": ácido</text>
        </SvgCapa>
      </Escena>
      {/* 7 · el voltaje: 0.91 V, ni un volt */}
      <Escena T={T} a={K.Vo} b={K.Da}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <path d="M 510 1180 L 510 870 L 500 840 M 610 1180 L 610 870 L 620 840" fill="none" stroke={KC.ink} strokeWidth={12} transform="translate(0 -300) translate(0 300)" opacity={0} />
          <path d="M 495 822 L 495 760 L 470 760" fill="none" stroke={KC.ink} strokeWidth={14} strokeLinejoin="round" />
          <path d="M 645 822 L 645 760 L 650 760" fill="none" stroke={KC.red} strokeWidth={14} strokeLinejoin="round" />
          <VasoPila T={T} x={570} y={1190} s={0.95} burbujas={0.8} />
          <Voltimetro x={560} y={630} s={1.25} texto={`${klerp(0, 0.91, kprog(T, K.Vo + 1.3, K.Vo + 2.8, kEase.sale)).toFixed(2)} V`} />
          {(() => { const top = 600, bot = 1180, h = bot - top, yv = (v) => bot - h * v / 1.2, f = kprog(T, K.Vo + 1.3, K.Vo + 2.8, kEase.sale);
            return <g>
              <rect x={900} y={top} width={80} height={h} rx={18} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
              <rect x={908} y={yv(0.91 * f)} width={64} height={bot - 8 - yv(0.91 * f)} rx={12} fill={KC.mint} />
              <line x1={880} x2={1000} y1={yv(1)} y2={yv(1)} stroke={KC.red} strokeWidth={8} strokeDasharray="16 8" />
              <text x={870} y={yv(1) + 12} textAnchor="end" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={2}>1 V</text>
              <text x={870} y={yv(0.91 * f) + 40} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={f}>0.91</text>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 8 · 4 o 5 limones para un LED · ese limón ya no se come */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {(() => { const o = 1 - kprog(T, K.Da + 3.3, K.Da + 3.7); const xs = [140, 340, 540, 740, 940];
            const luz = kprog(T, K.Da + 1.2, K.Da + 2.6, kEase.suave) * (0.92 + 0.08 * Math.sin(T * 9));
            return o > 0 && <g opacity={o}>
              {xs.map((x, i) => { const e = kprog(T, K.Da + i * 0.15, K.Da + i * 0.15 + 0.35, kEase.rebote); return <g key={i} transform={`translate(${x} 1050) scale(${e}) translate(${-x} -1050)`}>
                <Limon x={x} y={1050} s={0.3} />
                <rect x={x - 46} y={960} width={10} height={60} fill={ZN} stroke={KC.ink} strokeWidth={3} /><rect x={x + 36} y={960} width={10} height={60} fill={CU} stroke={KC.ink} strokeWidth={3} />
              </g>; })}
              {xs.slice(0, 4).map((x, i) => <path key={i} d={`M ${x + 41} 960 Q ${x + 100} 900 ${x + 159} 960`} fill="none" stroke={KC.ink} strokeWidth={7} opacity={kprog(T, K.Da + 0.8, K.Da + 1.1)} />)}
              <path d={`M 99 960 Q 99 790 518 800`} fill="none" stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Da + 1.0, K.Da + 1.2)} />
              <path d={`M 981 960 Q 981 780 562 790`} fill="none" stroke={KC.red} strokeWidth={8} opacity={kprog(T, K.Da + 1.0, K.Da + 1.2)} />
              <LED x={540} y={700} s={1.1} luz={luz} />
            </g>; })()}
          {(() => { const e = kprog(T, K.Da + 3.4, K.Da + 3.8, kEase.rebote); return e > 0 && <g>
            <g transform={`translate(780 980) scale(${e}) translate(-780 -980)`}><Limon x={780} y={980} s={0.75} rot={-10} />
              <rect x={690} y={870} width={12} height={70} fill={ZN} stroke={KC.ink} strokeWidth={4} /><rect x={850} y={870} width={12} height={70} fill={CU} stroke={KC.ink} strokeWidth={4} />
              <Tenedor x={930} y={780} s={0.9} rot={-35} /></g>
            <Marca x={790} y={720} ok={false} s={1.1} o={kprog(T, K.Da + 3.9, K.Da + 4.3)} />
          </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: el limón del inicio, el clavo un poco gastado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <PilaLimon T={T} x={480} y={1080} clavoDy={-380 * saca} gasto={kprog(T, K.Ci + 1.2, K.Ci + 1.8)} valor={fuera ? 0 : 0.9} flujo={fuera ? 0 : 1} vm={[-230, -540]} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.G + 2.6} texto="¿electricidad del limón?" x={540} y={1500} tam={44} />
      <Chip T={T} at={K.G + 2.7} until={K.Q - 0.3} texto="se gasta el clavo" y={1500} tam={46} borde={KC.red} />
      <Etq T={T} at={K.Q + 1.3} until={K.Z - 0.3} x={560} y={950} texto="capa de zinc (Zn) sobre acero" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.3} until={K.Q + 2.6} texto="clavo galvanizado" y={1500} tam={46} borde={ZN} />
      <Etq T={T} at={K.Q + 2.8} until={K.Z - 0.3} x={560} y={1150} texto="alambre de cobre (Cu)" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Q + 3.6} until={K.Z - 0.3} texto="los dos, en el mismo limón" y={1500} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Z + 1.0} until={K.Ca - 0.3} texto="Zn → Zn²⁺ + 2e⁻" y={1500} tam={48} mono borde="#9fe8ff" />
      <Etq T={T} at={K.Z + 2.0} until={K.Ca - 0.3} x={140} y={600} texto="e⁻ = electrones" tam={32} color={ELEC} />
      <Chip T={T} at={K.Ca + 0.6} until={K.J - 0.3} texto="electrones por el cable = corriente" y={1500} tam={36} borde={ELEC} />
      <Chip T={T} at={K.J + 1.2} until={K.Pr - 0.3} texto="jugo ácido = electrolito" y={1500} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.J + 1.0} until={K.Pr - 0.3} x={1020} y={1260} texto="iones" lado="izq" tam={34} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.3} until={K.Es + 3.7} anio="2001" quien="Goodisman · Syracuse University" revista="J Chem Educ · limones simulados con ácido" y={640} />
      <Chip T={T} at={K.Es + 4.6} until={K.Vo - 0.3} texto="en el cobre: 2H⁺ + 2e⁻ → H₂" y={1500} tam={42} mono borde="#bfe8ff" />
      <Chip T={T} at={K.Vo + 2.9} until={K.Da - 0.3} texto="ácido cítrico 4 % · Goodisman 2001" y={1500} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Da + 1.4} until={K.Da + 3.2} texto="5 limones en fila ≈ 2.5–3 V" y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Da + 4.0} until={K.Ci - 0.3} texto="ese limón ya no se come" y={1500} tam={44} borde={KC.red} />
      <Etq T={T} at={K.Ci + 1.6} until={K.Ci + 3.8} x={380} y={820} texto="un poco gastado · pierde zinc" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ci + 3.9} until={K.Ou} texto="zinc + ácido → la energía" y={1500} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es el limón: *es el clavo.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Z - 0.1} texto="Clavo de *zinc,* alambre de *cobre.*" />
      <Subtitulo T={T} idx={2} at={K.Z + 0.1} until={K.Ca - 0.1} texto="El zinc *suelta electrones.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.J - 0.1} texto="Por el cable: *la corriente.*" />
      <Subtitulo T={T} idx={4} at={K.J + 0.1} until={K.Pr - 0.1} texto="El jugo: *el electrolito.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y qué pasa *en el cobre?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Vo - 0.1} texto="En el cobre: *gas hidrógeno.*" />
      <Subtitulo T={T} idx={7} at={K.Vo + 0.1} until={K.Da - 0.1} texto="0.91 volts: *ni uno.*" />
      <Subtitulo T={T} idx={8} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Un LED: *4 o 5 limones.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La energía: *el zinc del clavo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Zinc - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Zinc + 1.4, CUES.Cable - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cable + 1.0, CUES.Jugo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Jugo + 1.2, CUES.Pregunta - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.0, CUES.Voltaje - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Voltaje + 1.0, CUES.Dato - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Dato + 0.4, CUES.Dato + 3.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 3.4, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'grande-izq'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="23" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LimonApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Limones /></CompositionStage></div>;
}
window.LimonApp = LimonApp;
