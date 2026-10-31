// Shot Científico #57 · El agua es azul (y no por el cielo) — NARRADO (N1 "Por dentro" + N5 Braun y Smirnov 1993).
// Datos: Braun y Smirnov 1993 (J. Chem. Educ.), NOAA, USGS. Ver guion.md y verificacion.md. El dibujo es esquemático.
const AZ1 = '#1f86e0', AZ2 = '#0a2f7a', AZ3 = '#041633';
const ARCO = ['#ff3b2f', '#ff8a1f', '#ffe11a', '#2fe0a8', '#00d2ff', '#2346ff', '#7a4dff'];
const ABS = [5.2, 3.4, 2.2, 1.3, 0.55, 0.35, 0.8];           // absorción esquemática por color (rojo la más alta)

function hexMezcla(a, b, f) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(klerp(v, B[i], kclamp(f, 0, 1))).toString(16).padStart(2, '0')).join('');
}
// Mar visto de frente: superficie con olas que se mueven desde y0 hasta abajo.
function Mar({ T, id, y0 = 900, alto = KH, c1 = AZ1, c2 = AZ2, brillo = 0 }) {
  const ola = Array.from({ length: 28 }, (_, i) => { const x = i * 42 - 40; return `${x},${(y0 + Math.sin(T * 2.2 + i * 0.7) * 14).toFixed(1)}`; }).join(' ');
  return <g>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient></defs>
    <polygon points={`-40,${alto} ${ola} ${KW + 40},${alto}`} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {Array.from({ length: 9 }, (_, i) => { const yy = y0 + 70 + (i % 3) * 120 + Math.floor(i / 3) * 40, xx = ((i * 260 + T * 60 * (i % 2 ? 1 : -1)) % 1300 + 1300) % 1300 - 110;
      return <path key={i} d={`M ${xx} ${yy} q 30 -18 60 0 q 30 18 60 0`} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.35 + 0.3 * brillo} />; })}
  </g>;
}
function Ojo({ x, y, s = 1, rot = 0, iris = KC.blue }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -110 0 Q 0 -90 110 0 Q 0 90 -110 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle r={42} fill={iris} stroke={KC.ink} strokeWidth={7} /><circle r={18} fill={KC.ink} /><circle cx={-12} cy={-14} r={8} fill="#fff" />
    <path d="M -100 -40 Q 0 -120 100 -40" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Rayo de luz (banda) de (x1,y1) a (x2,y2) que se dibuja con p.
function Rayo({ x1, y1, x2, y2, p = 1, color = '#fff', ancho = 34, o = 1 }) {
  if (p <= 0.01) return null;
  const X = klerp(x1, x2, p), Y = klerp(y1, y2, p);
  return <g opacity={o}><line x1={x1} y1={y1} x2={X} y2={Y} stroke={KC.ink} strokeWidth={ancho + 10} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={X} y2={Y} stroke={color} strokeWidth={ancho} strokeLinecap="round" /></g>;
}
function Vaso({ x, y, s = 1, tinte = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -100 -60 L -80 200 L 80 200 L 100 -60 Z" fill={hexMezcla('#e6f7ff', '#4aa8ff', tinte)} opacity=".75" />
    <path d="M -100 -60 Q 0 -45 100 -60" fill="none" stroke="#fff" strokeWidth={6} />
    <path d="M -115 -160 L -80 200 L 80 200 L 115 -160" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
    <path d="M -75 -120 L -55 160" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".8" />
  </g>;
}
// Molécula de agua que vibra: estira los enlaces y abre/cierra el ángulo. amp 0..1.
function MoleculaAgua({ x, y, s = 1, T = 0, amp = 0.3, brillo = 0 }) {
  const est = 1 + 0.16 * amp * Math.sin(T * 26), est2 = 1 + 0.16 * amp * Math.sin(T * 26 + Math.PI), ang = (52 + 9 * amp * Math.sin(T * 17)) * Math.PI / 180;
  const H1 = [-Math.sin(ang) * 150 * est, Math.cos(ang) * 150 * est], H2 = [Math.sin(ang) * 150 * est2, Math.cos(ang) * 150 * est2];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle r={260} fill={KC.cyan} opacity={0.25 * brillo} />}
    {[H1, H2].map(([hx, hy], i) => <g key={i}><line x1={0} y1={0} x2={hx} y2={hy} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" /><line x1={0} y1={0} x2={hx} y2={hy} stroke="#ddd" strokeWidth={20} strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={56} fill="#fff" stroke={KC.ink} strokeWidth={9} /><text x={hx} y={hy + 18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>H</text></g>)}
    <circle r={92} fill={KC.pink} stroke={KC.ink} strokeWidth={10} /><circle cx={-28} cy={-30} r={20} fill="#fff" opacity=".5" />
    <text y={26} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">O</text>
  </g>;
}
// Onda de luz que viaja de x0 a x1 (fase p 0..1); se corta en `corte` (absorbida).
function OndaLuz({ T, x0, x1, y, color, p = 1, corte = 1, amp = 34, lam = 90, o = 1 }) {
  const fin = klerp(x0, x1, Math.min(p, corte)); if (fin - x0 < 4) return null;
  const pts = []; for (let x = x0; x <= fin; x += 8) pts.push(`${x},${(y + Math.sin((x - T * 320) / lam * Math.PI * 2) * amp).toFixed(1)}`);
  return <g opacity={o}><polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g>;
}
function Buzo({ x, y, s = 1, T = 0, traje = KC.red }) {
  const pat = Math.sin(T * 6) * 12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -30 150 L ${-60 + pat} 260 L ${-10 + pat} 255 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M 30 150 L ${60 - pat} 260 L ${10 - pat} 255 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-75} y={-40} width={42} height={150} rx={20} fill="#9aa4b4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-50} y={-60} width={100} height={220} rx={44} fill={traje} stroke={KC.ink} strokeWidth={8} />
    <circle cy={-110} r={56} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-46} y={-136} width={92} height={46} rx={18} fill="#9fe3ff" stroke={KC.ink} strokeWidth={7} />
    <path d="M 46 -112 Q 80 -140 70 -200" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    {[0, 1, 2].map((i) => { const f = ((T * 0.7 + i / 3) % 1); return <circle key={i} cx={70 + Math.sin(f * 9) * 10} cy={-210 - f * 260} r={8 + f * 10} fill="none" stroke="#dff6ff" strokeWidth={4} opacity={1 - f} />; })}
  </g>;
}
// Bloque de hielo de glaciar: blanco por fuera y azul profundo en las grietas.
function Glaciar({ x, y, s = 1, T = 0, azul = 1 }) {
  const c = hexMezcla('#cfefff', '#1e74d8', azul), c2 = hexMezcla('#e8f8ff', '#0b3f9c', azul);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -420 260 L -400 -120 L -260 -260 L -60 -200 L 120 -300 L 330 -170 L 420 -60 L 430 260 Z" fill="#f4fbff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -380 260 L -360 -60 L -240 -170 L -80 -120 L 100 -210 L 300 -100 L 380 0 L 390 260 Z" fill={c} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[[-220, -120, 180], [-20, -90, 230], [200, -70, 200]].map(([gx, gy, h], i) => <path key={i} d={`M ${gx} ${gy} L ${gx + 30} ${gy + h * 0.5} L ${gx - 10} ${gy + h} L ${gx + 40} ${gy + h + 120}`} fill="none" stroke={c2} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />)}
    <path d="M -400 -120 L -260 -260 L -60 -200 L 120 -300 L 330 -170" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(T * 3)} />
  </g>;
}

function AguaAzul() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el mar bajo el cielo; ¿solo reflejo? */}
      <Escena T={T} a={K.Gancho} b={K.Luz} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SolDibujo x={330} y={420} r={70} T={T} />
          <Nube x={300} y={640} s={0.8} />
          <Mar T={T} id="marA" y0={880} />
          <FlechaRecta x1={480} y1={560} x2={480} y2={860} p={kprog(T, K.Gancho + 0.15, K.Gancho + 0.8, kEase.sale)} color="#fff" />
          <TextoSvg x={250} y={800} tam={64} color="#fff" o={kprog(T, K.Gancho + 0.5, K.Gancho + 0.9)}>¿REFLEJO?</TextoSvg>
          <line x1={110} y1={810} x2={klerp(110, 270, kprog(T, K.Gancho + 1.6, K.Gancho + 2.0, kEase.sale))} y2={770} stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={T > K.Gancho + 1.6 ? 1 : 0} />
          <TextoSvg x={540} y={1130} tam={110} color={KC.yellow} rot={-3} s={klerp(0.4, 1, kprog(T, K.Gancho + 2.4, K.Gancho + 2.9, kEase.rebote))} o={kprog(T, K.Gancho + 2.4, K.Gancho + 2.6)}>EL AGUA ES AZUL</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 1 · la luz del Sol trae todos los colores */}
      <Escena T={T} a={K.Luz} b={K.Rojo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <SolDibujo x={200} y={470} r={90} T={T} />
          <Rayo x1={290} y1={540} x2={560} y2={800} p={kprog(T, K.Luz + 0.05, K.Luz + 0.6, kEase.sale)} ancho={44} />
          {ARCO.map((c, i) => <Rayo key={i} x1={560} y1={800} x2={980} y2={640 + i * 75} p={kprog(T, K.Luz + 0.7 + i * 0.07, K.Luz + 1.4 + i * 0.07, kEase.sale)} color={c} ancho={30} />)}
          <circle cx={560} cy={800} r={26} fill="#fff" stroke={KC.ink} strokeWidth={8} />
        </Lienzo>
        <Chip T={T} at={K.Luz + 0.3} until={K.Rojo - 0.1} texto="luz blanca = todos los colores" x={540} y={1150} tam={42} borde={KC.ink} />
      </Escena>
      {/* 2 · por dentro del agua: el rojo se apaga primero */}
      <Escena T={T} a={K.Rojo} b={K.Regresa} fondo={AZ3}>
        <Lienzo>
          <defs><linearGradient id="profR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={AZ1} /><stop offset="1" stopColor={AZ3} /></linearGradient></defs>
          <rect x={0} y={0} width={KW} height={440} fill={KC.cyan} />
          <rect x={0} y={440} width={KW} height={KH - 440} fill="url(#profR)" />
          <Rayo x1={880} y1={170} x2={590} y2={430} ancho={60} p={kprog(T, K.Rojo - 0.3, K.Rojo + 0.2)} />
          {ARCO.map((c, i) => { const x = 300 + i * 90, L = 760 * kprog(T, K.Rojo + 0.2, K.Rojo + 3.2, kEase.suave);
            return <g key={i}>{Array.from({ length: 24 }, (_, j) => { const y = 450 + j * 32; if (y - 450 > L) return null;
              return <rect key={j} x={x - 26} y={y} width={52} height={33} fill={c} opacity={Math.exp(-ABS[i] * (j / 24))} />; })}</g>; })}
          <line x1={0} y1={440} x2={KW} y2={440} stroke={KC.ink} strokeWidth={10} />
          <FlechaRecta x1={140} y1={520} x2={140} y2={1160} p={kprog(T, K.Rojo + 0.4, K.Rojo + 1.4, kEase.sale)} color="#fff" grosor={12} />
          <text x={205} y={1170} style={{ font:`900 40px ${KF.texto}` }} fill="#fff" opacity={kprog(T, K.Rojo + 1.2, K.Rojo + 1.6)} transform="rotate(-90 205 1170)">más hondo</text>
        </Lienzo>
        <Etq T={T} at={K.Rojo + 2.2} until={K.Regresa - 0.2} x={330} y={880} texto="el rojo se apaga" lado="der" color="#fff" />
        <Chip T={T} at={K.Rojo + 0.6} until={K.Regresa - 0.1} texto="POR DENTRO · LUZ EN EL AGUA" x={380} y={330} tam={34} mono borde={KC.cyan} />
      </Escena>
      {/* 3 · regresa luz azulada a tus ojos */}
      <Escena T={T} a={K.Regresa} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Mar T={T} id="marR" y0={880} />
          <Rayo x1={180} y1={380} x2={420} y2={1000} p={kprog(T, K.Regresa - 0.2, K.Regresa + 0.5, kEase.sale)} ancho={36} />
          <Rayo x1={460} y1={1000} x2={720} y2={600} p={kprog(T, K.Regresa + 0.6, K.Regresa + 1.4, kEase.sale)} color={KC.cyan} ancho={36} />
          <Ojo x={800} y={520} s={1.1} rot={-20} iris={KC.blue} />
        </Lienzo>
        <Chip T={T} at={K.Regresa + 1.2} until={K.Pregunta - 0.1} texto="luz azulada" x={540} y={420} tam={46} borde={KC.cyan} />
      </Escena>
      {/* 4 · ¿y el vaso transparente? */}
      <Escena T={T} a={K.Pregunta} b={K.Poquita} fondo={KC.lilac} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Vaso x={270} y={950} s={1.25} tinte={0} />
          <TextoSvg x={270} y={720} tam={300} color={KC.yellow} rot={Math.sin(T * 3) * 6} s={klerp(0.5, 1, kprog(T, K.Pregunta + 0.1, K.Pregunta + 0.5, kEase.rebote))}>?</TextoSvg>
        </Lienzo>
        <Etq T={T} at={K.Pregunta + 0.6} until={K.Poquita - 0.1} x={110} y={460} texto="se ve transparente" lado="der" color="#fff" />
      </Escena>
      {/* 5 · es muy poquita: con metros de agua aparece el color */}
      <Escena T={T} a={K.Poquita} b={K.Alberca} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Vaso x={190} y={650} s={0.8} tinte={0.05} />
          {(() => { const p = kprog(T, K.Poquita + 0.8, K.Poquita + 3.2, kEase.suave), L = 840 * p;
            return <g>
              <defs><linearGradient id="tubo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e9f8ff" /><stop offset="0.5" stopColor="#62b8ff" /><stop offset="1" stopColor={AZ2} /></linearGradient></defs>
              <rect x={120} y={930} width={Math.max(10, L)} height={150} fill="url(#tubo)" />
              <rect x={120} y={930} width={840} height={150} rx={20} fill="none" stroke={KC.ink} strokeWidth={10} opacity={kprog(T, K.Poquita + 0.5, K.Poquita + 0.8)} />
              <Rayo x1={60} y1={1005} x2={120 + Math.max(10, L)} y2={1005} p={p > 0 ? 1 : 0} ancho={14} o={0.8} />
            </g>; })()}
          <TextoSvg x={140} y={900} tam={44} color="#fff" ancla="start" fuente="texto" o={kprog(T, K.Poquita + 0.6, K.Poquita + 1)}>poquita agua</TextoSvg>
          <TextoSvg x={960} y={900} tam={52} color={KC.cyan} ancla="end" o={kprog(T, K.Poquita + 2.8, K.Poquita + 3.2)}>METROS DE AGUA → AZUL</TextoSvg>
        </Lienzo>
        <Etq T={T} at={K.Poquita + 0.3} until={K.Alberca - 0.2} x={320} y={640} texto="un vaso: casi sin color" lado="der" color={KC.ink} />
      </Escena>
      {/* 6 · alberca honda, techada, con fondo blanco */}
      <Escena T={T} a={K.Alberca} b={K.Buzo} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <path d="M 40 640 L 540 400 L 1040 640 Z" fill={KC.red} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          <rect x={80} y={640} width={920} height={40} fill="#ddd" stroke={KC.ink} strokeWidth={8} />
          {[300, 540, 780].map((x) => <g key={x}><line x1={x} y1={680} x2={x} y2={720} stroke={KC.ink} strokeWidth={6} /><circle cx={x} cy={735} r={18} fill="#fff6c8" stroke={KC.ink} strokeWidth={6} /></g>)}
          {(() => { const p = kprog(T, K.Alberca + 0.4, K.Alberca + 2.2, kEase.suave), top = klerp(1180, 820, p);
            return <g>
              <defs><linearGradient id="alb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd6ff" /><stop offset="1" stopColor="#0f66d0" /></linearGradient></defs>
              <path d="M 140 800 L 140 1190 L 940 1190 L 940 800" fill="#fbfbfb" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
              <rect x={146} y={top} width={788} height={1184 - top} fill="url(#alb)" opacity={0.92} />
              <path d={`M 146 ${top} ${Array.from({ length: 21 }, (_, i) => `L ${146 + i * 39.4} ${top + Math.sin(T * 3 + i) * 6}`).join(' ')}`} fill="none" stroke="#fff" strokeWidth={6} opacity={p} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Alberca + 0.3} until={K.Buzo - 0.1} texto="techada" x={540} y={560} tam={38} borde={KC.ink} />
        <Etq T={T} at={K.Alberca + 1.2} until={K.Buzo - 0.2} x={950} y={1150} texto="fondo blanco" lado="izq" color="#fff" />
        <Etq T={T} at={K.Alberca + 2.0} until={K.Buzo - 0.2} x={140} y={860} texto="honda" lado="der" color="#fff" />
      </Escena>
      {/* 7 · el buzo baja: el rojo se pierde primero */}
      <Escena T={T} a={K.Buzo} b={K.Estudio} fondo={AZ3}>
        {(() => { const p = kprog(T, K.Buzo, K.Estudio, kEase.suave);
          return <Lienzo>
            <defs><linearGradient id="hondo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hexMezcla(AZ1, AZ2, p)} /><stop offset="1" stopColor={hexMezcla(AZ2, AZ3, p)} /></linearGradient></defs>
            <rect width={KW} height={KH} fill="url(#hondo)" />
            {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${150 + i * 160} 0 L ${250 + i * 160} 0 L ${200 + i * 170} 1200 L ${120 + i * 160} 1200 Z`} fill="#fff" opacity={0.07 * (1 - p)} />)}
            <Buzo x={820} y={klerp(690, 880, p)} s={1.25} T={T} traje={hexMezcla(KC.red, '#3b3f63', kprog(T, K.Buzo + 0.8, K.Buzo + 4))} />
            {ARCO.map((c, i) => { const r = [0, 1, 2, 3, 5, 6, 4][i]; return <rect key={i} x={100} y={430 + i * 100} width={130} height={80} rx={16} fill={hexMezcla(c, '#23305a', [1, 0.9, 0.8, 0.65, 0.45, 0.25, 0.55][i] * kprog(T, K.Buzo + 0.6 + r * 0.5, K.Buzo + 1.4 + r * 0.5))} stroke={KC.ink} strokeWidth={7} />; })}
          </Lienzo>; })()}
        <Etq T={T} at={K.Buzo + 1.6} until={K.Estudio - 0.2} x={240} y={470} texto="rojo: de lo primero en perderse" lado="der" color="#fff" tam={30} />
        <Chip T={T} at={K.Buzo + 0.3} until={K.Estudio - 0.1} texto="más hondo = más azul" x={600} y={360} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 8 · el estudio: la molécula vibra y se come el rojo */}
      <Escena T={T} a={K.Estudio} b={K.Unico} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        {T > K.Estudio + 2.6 && <Lienzo o={kprog(T, K.Estudio + 2.6, K.Estudio + 3.1)}>
          <OndaLuz T={T} x0={-20} x1={1100} y={640} color={KC.red} p={kprog(T, K.Estudio + 3.0, K.Estudio + 4.0)} corte={0.46} />
          <OndaLuz T={T} x0={-20} x1={1100} y={1080} color={KC.cyan} p={kprog(T, K.Estudio + 3.4, K.Estudio + 5.0)} amp={28} lam={70} />
          <MoleculaAgua x={600} y={720} s={1.15} T={T} amp={0.25 + 0.75 * kprog(T, K.Estudio + 3.8, K.Estudio + 4.4)} />
        </Lienzo>}
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.5} anio="1993" quien="Charles Braun y Sergei Smirnov" revista="Journal of Chemical Education" x={540} y={760} />
        <Etq T={T} at={K.Estudio + 4.2} until={K.Unico - 0.2} x={560} y={480} texto="el rojo se absorbe" lado="der" color={KC.red} />
        <Etq T={T} at={K.Estudio + 4.8} until={K.Unico - 0.2} x={260} y={985} texto="el azul pasa" lado="der" color={KC.cyan} />
        <Chip T={T} at={K.Estudio + 3.2} until={K.Unico - 0.1} texto="AL MICROSCOPIO · MOLÉCULA DE AGUA" x={540} y={380} tam={30} mono borde={KC.cyan} />
      </Escena>
      {/* 9 · caso casi único */}
      <Escena T={T} a={K.Unico} b={K.Cielo} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <MoleculaAgua x={790} y={820} s={0.85} T={T} amp={0.8} brillo={kprog(T, K.Unico + 0.8, K.Unico + 1.6)} />
          <TextoSvg x={790} y={1150} tam={70} color={KC.cyan} o={kprog(T, K.Unico + 1.8, K.Unico + 2.2)}>COLOR = VIBRACIÓN</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Unico + 0.15} until={K.Cielo - 0.1} texto="caso casi único en la naturaleza" x={540} y={440} tam={44} borde={KC.gold} />
      </Escena>
      {/* 10 · el reflejo del cielo también ayuda: depende del ángulo */}
      <Escena T={T} a={K.Cielo} b={K.Hielo} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          {/* arriba: mar visto de lado → más reflejo */}
          <g opacity={kprog(T, K.Cielo, K.Cielo + 0.4)}>
            <rect x={60} y={360} width={960} height={400} rx={30} fill="#bfeaff" stroke={KC.ink} strokeWidth={9} />
            <rect x={60} y={600} width={960} height={160} fill={hexMezcla('#8fd3ff', AZ1, 0.35)} stroke={KC.ink} strokeWidth={9} />
            <Rayo x1={140} y1={420} x2={560} y2={600} p={kprog(T, K.Cielo + 0.5, K.Cielo + 1.1, kEase.sale)} ancho={26} />
            <Rayo x1={560} y1={600} x2={880} y2={470} p={kprog(T, K.Cielo + 1.1, K.Cielo + 1.6, kEase.sale)} ancho={26} />
            <Ojo x={930} y={450} s={0.45} rot={150} />
            <text x={90} y={735} style={{ font:`900 38px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">de lado: más reflejo del cielo</text>
          </g>
          {/* abajo: visto desde arriba → más color del agua */}
          <g opacity={kprog(T, K.Cielo + 2.0, K.Cielo + 2.4)}>
            <rect x={60} y={800} width={960} height={400} rx={30} fill={AZ1} stroke={KC.ink} strokeWidth={9} />
            <rect x={60} y={940} width={960} height={260} fill={AZ2} stroke={KC.ink} strokeWidth={9} />
            <Rayo x1={540} y1={1150} x2={540} y2={900} p={kprog(T, K.Cielo + 2.4, K.Cielo + 3.0, kEase.sale)} color={KC.cyan} ancho={30} />
            <Ojo x={540} y={860} s={0.45} rot={0} />
            <text x={90} y={1175} style={{ font:`900 38px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">desde arriba: más color del agua</text>
          </g>
        </Lienzo>
      </Escena>
      {/* 11 · hielo grueso de glaciar: azul */}
      <Escena T={T} a={K.Hielo} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Montana x={250} y={760} ancho={600} alto={360} color="#8a7b9e" />
          <Montana x={800} y={760} ancho={700} alto={420} color="#7a6d92" />
          <Glaciar x={540} y={920} s={1.15} T={T} azul={kprog(T, K.Hielo + 0.4, K.Hielo + 2.2, kEase.suave)} />
        </Lienzo>
        <Chip T={T} at={K.Hielo + 0.4} until={K.Cierre - 0.1} texto="hielo grueso = mucha agua" x={540} y={440} tam={42} borde={KC.cyan} />
      </Escena>
      {/* 12 · cierre: el mismo mar; el azul sale del agua */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <SolDibujo x={330} y={420} r={70} T={T} />
          <Nube x={300} y={640} s={0.8} />
          <Mar T={T} id="marC" y0={880} c1="#2a97ff" c2="#082a78" brillo={1} />
          {[300, 540, 780].map((x, i) => <FlechaRecta key={x} x1={x} y1={1180} x2={x} y2={960} p={kprog(T, K.Cierre + 0.2 + i * 0.15, K.Cierre + 0.8 + i * 0.15, kEase.sale)} color={KC.cyan} />)}
          <TextoSvg x={540} y={1130} tam={100} color={KC.yellow} rot={-3} s={klerp(0.4, 1, kprog(T, K.Cierre + 0.9, K.Cierre + 1.4, kEase.rebote))} o={kprog(T, K.Cierre + 0.9, K.Cierre + 1.1)}>EL AGUA YA ES AZUL</TextoSvg>
        </Lienzo>
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Luz - 0.1} texto="No es solo el cielo: *el agua es azul.*" />
      <Subtitulo T={T} idx={1} at={K.Luz + 0.1} until={K.Rojo - 0.1} texto="La luz del Sol: *todos los colores.*" />
      <Subtitulo T={T} idx={2} at={K.Rojo + 0.1} until={K.Regresa - 0.1} texto="El agua se *come el rojo.*" />
      <Subtitulo T={T} idx={3} at={K.Regresa + 0.1} until={K.Pregunta - 0.1} texto="A tus ojos llega *luz azulada.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Poquita - 0.1} texto="¿Y el *vaso transparente?*" />
      <Subtitulo T={T} idx={5} at={K.Poquita + 0.1} until={K.Alberca - 0.1} texto="Se nota con *metros de agua.*" />
      <Subtitulo T={T} idx={6} at={K.Alberca + 0.1} until={K.Buzo - 0.1} texto="Alberca honda: *azul aunque esté techada.*" />
      <Subtitulo T={T} idx={7} at={K.Buzo + 0.1} until={K.Estudio - 0.1} texto="Más hondo, *más azul.*" />
      <Subtitulo T={T} idx={8} at={K.Estudio + 0.1} until={K.Unico - 0.1} texto="1993: el rojo se va *por cómo vibran.*" />
      <Subtitulo T={T} idx={9} at={K.Unico + 0.1} until={K.Cielo - 0.1} texto="Un color que sale *de la vibración.*" />
      <Subtitulo T={T} idx={10} at={K.Cielo + 0.1} until={K.Hielo - 0.1} texto="El reflejo ayuda: *depende del ángulo.*" />
      <Subtitulo T={T} idx={11} at={K.Hielo + 0.1} until={K.Cierre - 0.1} texto="Glaciares azules: *es agua, y mucha.*" />
      <Subtitulo T={T} idx={12} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="El agua *ya es azul.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.Regresa + 0.3, K.Pregunta - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Pregunta + 0.05, K.Poquita + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Alberca + 1.0, K.Buzo - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Estudio + 3.0, K.Unico - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Unico + 0.6, K.Cielo - 0.1, 'avatar_11_sorprendido', 'grande-izq'],
        [K.Hielo + 0.5, K.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="57" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function AguaAzulApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AguaAzul /></CompositionStage></div>;
}
window.AguaAzulApp = AguaAzulApp;
