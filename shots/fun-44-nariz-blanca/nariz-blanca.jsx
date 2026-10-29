// Shot Fungi Mati #44 · El hongo que no deja dormir a los murciélagos (síndrome de nariz blanca) — NARRADO (N1 «Por dentro», gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const NB = { piel:'#8a5a3a', piel2:'#9a6844', ala:'#4a3328', oreja:'#6b4a35', rosa:'#e9a38e', roca:'#5d6b80', roca2:'#46536a', hongo:'#ffffff', grasa:'#ffd36b' };

// Techo de cueva (roca) con borde irregular; los murciélagos cuelgan de y ≈ 380.
function TechoCueva({ y = 380, seed = 7 }) {
  const g = krng(seed); let d = `M 0 0 L ${KW} 0 L ${KW} ${y}`;
  for (let x = KW; x >= 0; x -= 60) d += ` L ${x} ${y + (g() - 0.5) * 40}`;
  d += ' Z';
  return <g><path d={d} fill={NB.roca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${80 + i * 150} ${y - 60} q 30 -30 70 -10`} stroke={NB.roca2} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    {[180, 520, 880].map((x, i) => <path key={'e' + i} d={`M ${x - 22} ${y + 6} L ${x} ${y + 70 + i * 10} L ${x + 22} ${y + 6} Z`} fill={NB.roca2} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}

// Pelusa blanca del hongo: mechones alrededor de puntos (x, y). cant 0..1.
function Pelusa({ pts, cant, seed = 1, r = 8 }) {
  if (cant <= 0) return null;
  const g = krng(seed), out = [];
  pts.forEach(([x, y], i) => { const n = 5; for (let k = 0; k < n; k++) { const on = cant * n - k; if (on <= 0) break;
    const a = g() * 6.283, d = g() * r * 1.4, rr = r * (0.55 + g() * 0.6) * Math.min(1, on);
    out.push(<circle key={i + '_' + k} cx={x + Math.cos(a) * d} cy={y + Math.sin(a) * d} r={rr} fill={NB.hongo} opacity={0.92} />); } });
  return <g style={{ filter:'drop-shadow(0 0 4px rgba(255,255,255,.8))' }}>{out}</g>;
}

// Murciélago (Myotis) colgado de cabeza, alas plegadas. Patas en (x, y). Cabeza abajo: hocico hacia el pecho, orejas hacia el suelo.
// hongo 0..1 = pelusa blanca en hocico, orejas y alas · ojos 0..1 (0 dormido) · flaco 0..1 (sin grasa, se pone gris).
function Murcielago({ T = 0, x, y, s = 1, hongo = 0, ojos = 0, flaco = 0, sacude = 0, seed = 1 }) {
  const rot = Math.sin(T * 1.3 + seed) * 2 + Math.sin(T * 38) * 6 * sacude;
  const piel = mixHex(NB.piel, '#8c8c8c', flaco * 0.7), cab = mixHex(NB.piel2, '#9a9a9a', flaco * 0.7);
  const rx = 40 * (1 - 0.3 * flaco);
  // ala plegada (lado izquierdo; la derecha es espejo): borde de afuera festoneado entre los dedos
  const ala = 'M -10 22 Q -60 26 -84 70 Q -70 92 -96 118 Q -78 140 -100 172 Q -80 196 -92 232 L -58 262 Q -40 200 -26 120 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -12 -2 q -8 14 0 26 M 12 -2 q 8 14 0 26" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={ala} fill={NB.ala} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={ala} fill={NB.ala} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform="scale(-1 1)" />
    <path d="M -30 40 L -62 250 M 30 40 L 62 250" stroke="#2c1e17" strokeWidth={7} strokeLinecap="round" />
    <ellipse cx={0} cy={140} rx={rx} ry={104} fill={piel} stroke={KC.ink} strokeWidth={6} />
    <path d="M -14 70 l 6 10 M 10 100 l 6 10 M -16 150 l 6 10 M 12 190 l 6 10" stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeLinecap="round" />
    <path d="M -62 250 q -12 6 -8 18 M 62 250 q 12 6 8 18" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -30 288 L -74 370 L -4 306 Z" fill={NB.oreja} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 30 288 L 74 370 L 4 306 Z" fill={NB.oreja} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -28 300 L -60 352 L -12 308 Z M 28 300 L 60 352 L 12 308 Z" fill={NB.rosa} />
    <circle cx={0} cy={268} r={50} fill={cab} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={232} rx={26} ry={20} fill={mixHex('#c48a66', '#b0b0b0', flaco * 0.7)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -10 222 q 10 8 20 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    {ojos > 0.5
      ? <g><circle cx={-20} cy={270} r={9} fill={KC.ink} /><circle cx={20} cy={270} r={9} fill={KC.ink} /><circle cx={-17} cy={267} r={3} fill="#fff" /><circle cx={23} cy={267} r={3} fill="#fff" /></g>
      : <path d="M -30 268 q 9 7 18 0 M 12 268 q 9 7 18 0" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
    <Pelusa cant={hongo} seed={seed * 3 + 1} r={9} pts={[[0, 220], [-16, 228], [16, 228], [0, 244], [-24, 238], [24, 238]]} />
    <Pelusa cant={hongo} seed={seed * 3 + 2} r={7} pts={[[-70, 362], [-52, 334], [70, 362], [52, 334], [-36, 304], [36, 304]]} />
    <Pelusa cant={hongo * 0.85} seed={seed * 3 + 3} r={8} pts={[[-90, 116], [-96, 172], [-88, 230], [90, 116], [96, 172], [88, 230], [-80, 70], [80, 70]]} />
  </g>;
}
// Conidio curvo (espora en forma de media luna) de P. destructans.
function Conidio({ x, y, s = 1, rot = 0 }) {
  return <path d="M -22 4 Q 0 -22 22 4 Q 0 -8 -22 4 Z" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill="#eaf3ff" stroke={KC.ink} strokeWidth={3 / s} strokeLinejoin="round" />;
}
// Copos de escarcha que caen.
function Copos({ T, n = 22, seed = 4, desde = 0, hasta = 99 }) {
  if (T < desde || T > hasta + 1) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x = g() * KW, v = 120 + g() * 160, f = g() * 3; const yy = 360 + (((T - desde) * v + f * 400) % 1100);
    return <path key={i} d="M 0 -12 L 0 12 M -10 -6 L 10 6 M -10 6 L 10 -6" transform={`translate(${x + Math.sin(T * 2 + i) * 14} ${yy})`} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.85 * (1 - kprog(T, hasta, hasta + 0.6))} />; })}</g>;
}
// Termómetro: nivel 0..1.
function Termometro({ x, y, alto = 360, nivel, color = KC.red, titulo }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={0} width={52} height={alto} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-14} y={alto - 20 - (alto - 40) * nivel} width={28} height={(alto - 40) * nivel + 20} rx={14} fill={color} />
    <circle cx={0} cy={alto + 28} r={44} fill={color} stroke={KC.ink} strokeWidth={6} />
    {titulo && <text x={0} y={alto + 112} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>}
  </g>;
}
// Estrellita de "¡despierta!".
function Despertar({ x, y, s = 1, color = KC.orange }) {
  if (s <= 0) return null;
  return <path d="M 0 -26 L 7 -8 L 26 -8 L 11 4 L 17 24 L 0 12 L -17 24 L -11 4 L -26 -8 L -7 -8 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />;
}
// Fila de grasa: línea de tiempo invierno → primavera, despertares y barra de grasa que se gasta.
function FilaGrasa({ T, a, dur, y, wakes, titulo, enfermo = false }) {
  const u = kprog(T, a, a + dur);
  let fat = 1; const cada = enfermo ? 0.13 : 0.2;
  wakes.forEach((w) => { fat -= cada * kprog(u, w, w + 0.05); }); fat -= 0.05 * u; fat = Math.max(0, fat);
  const x0 = 260, x1 = 960, o = kprog(T, a - 0.4, a);
  return <g opacity={o}>
    <text x={x0} y={y - 40} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={KC.ink} strokeWidth={5} />
    <text x={x0} y={y + 34} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>invierno</text>
    <text x={x1} y={y + 34} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>primavera</text>
    <g transform={`translate(${x1 + 40} ${y})`}>{[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx={0} cy={-12} rx={8} ry={13} fill={KC.pink} stroke={KC.ink} strokeWidth={3} transform={`rotate(${r})`} />)}<circle r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>
    {wakes.map((w, i) => <Despertar key={i} x={klerp(x0, x1, w)} y={y - 2} s={kprog(u, w, w + 0.04, kEase.rebote) * 0.9} />)}
    <circle cx={klerp(x0, x1, u)} cy={y} r={11} fill={KC.ink} />
    <rect x={x0} y={y + 52} width={x1 - x0} height={54} rx={14} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={5} />
    {fat > 0 && <rect x={x0 + 5} y={y + 57} width={(x1 - x0 - 10) * fat} height={44} rx={10} fill={NB.grasa} />}
    <text x={x0 + 18} y={y + 90} style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>grasa</text>
  </g>;
}
// Calendario de días seguidos dormido.
function Calendario({ T, at, y, n, titulo }) {
  const o = kprog(T, at - 0.2, at + 0.2);
  return <g opacity={o}>
    <text x={90} y={y - 22} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
    {Array.from({ length: n }, (_, i) => { const on = kprog(T, at + i * 0.09, at + i * 0.09 + 0.2, kEase.rebote); return on > 0 ? <g key={i} transform={`translate(${90 + i * 50 + 21} ${y + 21}) scale(${on})`}>
      <rect x={-21} y={-21} width={42} height={42} rx={8} fill={KC.noche} stroke={KC.ink} strokeWidth={4} />
      <text y={9} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#9ad7ff">z</text></g> : null; })}
    <Despertar x={90 + n * 50 + 24} y={y + 21} s={kprog(T, at + n * 0.09, at + n * 0.09 + 0.3, kEase.rebote)} />
  </g>;
}

function NarizBlancaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Cueva, H: CUES.Hongo, P: CUES.Piel, D: CUES.Despierta, Q: CUES.Pregunta, Gr: CUES.Grasa, E: CUES.Estudio, F: CUES.Foto, Mi: CUES.Millones, Eu: CUES.Europa, Mx: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const FOL = [150, 330, 510, 690];
  const ESPECIES = [['Myotis lucifugus', 220], ['Myotis septentrionalis', 540], ['Perimyotis subflavus', 860]];
  const oax = mxProy(-97.4, 17.1);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: «eso blanco no es escarcha» */}
      <Escena T={T} a={K.G} b={K.Cu} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <TechoCueva />
          <Murcielago T={T} x={380} y={380} s={1.85} hongo={1} seed={1} />
          <Copos T={T} desde={0} hasta={K.G + 2.2} />
          <Sello T={T} at={K.G + 2.6} x={800} y={930} texto="HONGO" color={KC.red} r={105} />
        </>)}
      </Escena>
      {/* 2 · la cueva: muchos colgados, el cuerpo casi tan frío como la roca */}
      <Escena T={T} a={K.Cu} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <TechoCueva />
          {[100, 250, 820, 960].map((x, i) => <Murcielago key={i} T={T} x={x} y={385} s={0.5} seed={i + 3} />)}
          <Murcielago T={T} x={540} y={385} s={0.8} hongo={0.8} seed={2} />
          <Termometro x={330} y={650} alto={300} nivel={0.22} color={KC.blue} titulo="cueva" />
          <Termometro x={740} y={650} alto={300} nivel={klerp(0.85, 0.28, kprog(T, K.Cu + 0.6, K.Cu + 2.6, kEase.suave))} color={KC.red} titulo="su cuerpo" />
        </>)}
      </Escena>
      {/* 3 · el hongo al microscopio: hifas y conidios curvos */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <RedHifas T={T} x={540} y={780} g={kprog(T, K.H - 0.3, K.H + 2.6)} seed={5} n={260} escala={0.32} color="#f4f1e6" ancho={4} brillo={0.6} />
          {Array.from({ length: 9 }, (_, i) => { const on = kprog(T, K.H + 0.8 + i * 0.12, K.H + 1.1 + i * 0.12, kEase.rebote); return on > 0 ? <Conidio key={i} x={260 + (i % 3) * 270 + Math.sin(T + i) * 10} y={640 + Math.floor(i / 3) * 150 + Math.cos(T * 1.3 + i) * 10} s={1.8 * on} rot={i * 40 + T * 10} /> : null; })}
        </>)}
      </Escena>
      {/* 4 · por dentro de la piel del ala: las hifas entran a los folículos y glándulas */}
      <Escena T={T} a={K.P} b={K.D}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <rect x={0} y={700} width={KW} height={460} fill="#b97c68" stroke={KC.ink} strokeWidth={6} />
          <rect x={0} y={640} width={KW} height={60} fill="#e7b7a0" stroke={KC.ink} strokeWidth={6} />
          {FOL.map((x, i) => <g key={i}>
            <path d={`M ${x - 24} 640 L ${x - 24} 960 Q ${x} 1000 ${x + 24} 960 L ${x + 24} 640`} fill="#d79a84" stroke={KC.ink} strokeWidth={5} />
            <line x1={x} y1={960} x2={x + 10} y2={520} stroke="#5a3a28" strokeWidth={8} strokeLinecap="round" />
            <ellipse cx={x + 62} cy={870} rx={30} ry={22} fill="#f0d27a" stroke={KC.ink} strokeWidth={4} />
            {(() => { const p = kprog(T, K.P + 0.5 + i * 0.25, K.P + 2.6 + i * 0.25); if (p <= 0) return null; const yy = klerp(630, 940, p);
              return <g stroke="#ffffff" strokeWidth={5} fill="none" strokeLinecap="round" style={{ filter:'drop-shadow(0 0 5px #fff)' }}>
                <path d={`M ${x - 40} 630 Q ${x - 8} ${(630 + yy) / 2} ${x - 12} ${yy}`} />
                <path d={`M ${x + 40} 630 Q ${x + 14} ${(630 + yy) / 2} ${x + 10} ${yy - 20}`} />
                {p > 0.6 && <path d={`M ${x + 14} 860 Q ${x + 40} 850 ${x + 52} ${klerp(860, 875, (p - 0.6) / 0.4)}`} />}
              </g>; })()}
          </g>)}
          {Array.from({ length: 10 }, (_, i) => <Conidio key={i} x={60 + i * 100} y={625 + Math.sin(i * 2) * 6} s={0.7} rot={i * 33} />)}
          <Murcielago T={T} x={930} y={720} s={0.8} hongo={1} seed={6} />
          {[[930, 906, 0], [876, 1006, 1], [858, 830, 2]].map(([x, y, i]) => <circle key={i} cx={x} cy={y} r={30 + 8 * Math.sin(T * 6 + i)} fill="none" stroke={KC.yellow} strokeWidth={5} opacity={kprog(T, K.P + 0.6 + i * 0.5, K.P + 0.9 + i * 0.5)} />)}
        </>)}
      </Escena>
      {/* 5 · se despierta más seguido */}
      <Escena T={T} a={K.D} b={K.Q} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <TechoCueva />
          <Murcielago T={T} x={420} y={380} s={1.7} hongo={1} ojos={T > K.D + 0.2 ? 1 : 0} sacude={kprog(T, K.D + 0.2, K.D + 0.4) * (1 - kprog(T, K.D + 1.4, K.D + 1.8))} seed={1} />
          {[[700, 820], [180, 900], [680, 1060], [220, 1100]].map(([x, y], i) => <Despertar key={i} x={x} y={y} s={kprog(T, K.D + 0.25 + i * 0.35, K.D + 0.45 + i * 0.35, kEase.rebote) * 1.6} />)}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Q} b={K.Gr} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7 · la grasa: sano vs. enfermo */}
      <Escena T={T} a={K.Gr} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Murcielago T={T} x={130} y={610} s={0.5} hongo={0} ojos={0} seed={8} />
          <FilaGrasa T={T} a={K.Gr + 0.4} dur={3.4} y={700} wakes={[0.25, 0.55, 0.82]} titulo="SANO" />
          {T > K.Gr + 3.6 && <Murcielago T={T} x={130} y={840} s={0.5} hongo={1} ojos={0} flaco={kprog(T, K.Gr + 6.0, K.Gr + 7.0)} seed={9} />}
          {T > K.Gr + 3.6 && <FilaGrasa T={T} a={K.Gr + 4.0} dur={3.9} y={930} wakes={[0.08, 0.17, 0.26, 0.35, 0.44, 0.53, 0.62, 0.7]} titulo="ENFERMO" enfermo />}
        </>)}
      </Escena>
      {/* 8 · el estudio de 2012: días seguidos dormidos */}
      <Escena T={T} a={K.E} b={K.F}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Calendario T={T} at={K.E + 3.2} y={780} n={16} titulo="sanos: unos 16 días seguidos" />
          <Calendario T={T} at={K.E + 5.2} y={1040} n={8} titulo="enfermos que murieron: unos 8" />
        </>)}
      </Escena>
      {/* 9 · la primera foto: Nueva York, 2006 */}
      <Escena T={T} a={K.F} b={K.Mi}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g transform={`translate(0 ${(1 - kprog(T, K.F, K.F + 0.6, kEase.sale)) * -700}) rotate(-3 540 830)`}>
          <rect x={240} y={500} width={600} height={680} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={8} />
          <rect x={280} y={540} width={520} height={480} fill="#2b3240" stroke={KC.ink} strokeWidth={5} />
          <path d="M 280 540 L 800 540 L 800 600 L 280 600 Z" fill={NB.roca2} />
          <Murcielago T={T} x={540} y={590} s={1.1} hongo={1} seed={1} />
          <text x={540} y={1100} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.ink}>Nueva York · feb 2006</text>
        </g>)}
        <div style={{ position:'absolute', inset:0, background:'#fff', zIndex:30, opacity:kprog(T, K.F + 0.15, K.F + 0.25) * (1 - kprog(T, K.F + 0.25, K.F + 0.8)) }}></div>
      </Escena>
      {/* 10 · millones; tres especies cayeron más del 90 % */}
      <Escena T={T} a={K.Mi} b={K.Eu}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={kprog(T, K.Mi, K.Mi + 0.3) * (1 - kprog(T, K.Mi + 2.0, K.Mi + 2.4))} transform={`translate(540 760) scale(${klerp(0.7, 1, kprog(T, K.Mi, K.Mi + 0.5, kEase.rebote))})`}>
            <text textAnchor="middle" style={{ font:`400 190px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>MILLONES</text>
            <text y={90} textAnchor="middle" style={{ font:`900 52px ${KF.texto}` }} fill={KC.ink}>de murciélagos muertos</text>
          </g>
          {T > K.Mi + 2.2 && <g opacity={kprog(T, K.Mi + 2.2, K.Mi + 2.6)}>
            <text x={400} y={790} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>conteos hasta 2018 · Cheng et al. 2021</text>
            <line x1={70} y1={1080} x2={1010} y2={1080} stroke={KC.ink} strokeWidth={6} />
            {ESPECIES.map(([n, x], i) => { const h = 250 * klerp(1, 0.08, kprog(T, K.Mi + 3.0 + i * 0.4, K.Mi + 4.2 + i * 0.4, kEase.suave));
              return <g key={i}><rect x={x - 70} y={1080 - h} width={140} height={h} fill={KC.coral} stroke={KC.ink} strokeWidth={6} />
                <rect x={x - 70} y={830} width={140} height={250} fill="none" stroke={KC.ink} strokeWidth={3} strokeDasharray="12 10" />
                <text x={x} y={1118} textAnchor="middle" style={{ font:`italic 700 23px ${KF.mono}` }} fill={KC.ink}>{n}</text></g>; })}
          </g>}
        </>)}
      </Escena>
      {/* 11 · Europa: el mismo hongo sin matanzas; el ADN apunta a que vino de ahí */}
      <Escena T={T} a={K.Eu} b={K.Mx}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <path d="M 120 380 L 660 380 L 660 420 L 120 420 Z" fill={NB.roca} stroke={KC.ink} strokeWidth={6} />
          <Murcielago T={T} x={390} y={418} s={1.15} hongo={0.35} seed={4} />
          <g opacity={kprog(T, K.Eu + 2.4, K.Eu + 2.8)}>
            <ellipse cx={230} cy={1070} rx={170} ry={80} fill="#bfe3b4" stroke={KC.ink} strokeWidth={6} />
            <text x={230} y={1082} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>América</text>
            <ellipse cx={850} cy={1070} rx={170} ry={80} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
            <text x={850} y={1082} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Europa</text>
            <path d={`M 680 1050 Q 540 ${960} ${klerp(680, 410, kprog(T, K.Eu + 2.8, K.Eu + 3.8))} 1050`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="20 14" strokeLinecap="round" />
            <text x={540} y={960} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Eu + 3.2, K.Eu + 3.5)}>ADN ?</text>
          </g>
        </>)}
      </Escena>
      {/* 12 · México: reportado en 2025 en una cueva de Oaxaca */}
      <Escena T={T} a={K.Mx} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<MapaMexico x={40} y={450} ancho={1000} conCA={false}>
          {kprog(T, K.Mx + 1.2, K.Mx + 1.5) > 0 && <g transform={`translate(${oax[0]} ${oax[1]})`}>
            <circle r={18 + 26 * ((T * 1.2) % 1)} fill="none" stroke={KC.red} strokeWidth={6} opacity={1 - ((T * 1.2) % 1)} />
            <circle r={18 * kprog(T, K.Mx + 1.2, K.Mx + 1.5, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          </g>}
        </MapaMexico>)}
      </Escena>
      {/* 13 · cierre: el mismo murciélago del inicio; ya sabemos que no es escarcha */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <TechoCueva />
          <Murcielago T={T} x={380} y={380} s={1.85} hongo={1} ojos={T > K.C + 0.6 ? 1 : 0} seed={1} />
          <g opacity={1 - kprog(T, K.C + 1.6, K.C + 2.0)}>
            <text x={760} y={1020} style={{ font:`400 90px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={5}>z z z</text>
            <path d="M 740 1000 L 990 960" stroke={KC.red} strokeWidth={14} strokeLinecap="round" strokeDasharray="400" strokeDashoffset={400 * (1 - kprog(T, K.C + 0.6, K.C + 1.0))} />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.2} until={K.G + 3.0} texto="¿escarcha?" x={380} y={1115} tam={46} />
      <Etq T={T} at={K.G + 3.2} until={K.Cu - 0.3} x={600} y={1060} texto="murciélago café" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.5} until={K.Cu - 0.3} x={600} y={1115} texto="Myotis lucifugus" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Cu + 0.5} until={K.H - 0.3} texto="cueva: 2–14 °C" x={540} y={590} tam={38} borde={KC.blue} />
      <Chip T={T} at={K.H + 0.2} until={K.P - 0.3} texto="AL MICROSCOPIO · el hongo" x={330} y={430} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.H + 1.6} until={K.P - 0.3} texto="le gusta el frío" x={330} y={520} tam={34} borde={KC.blue} />
      <Etq T={T} at={K.H + 0.6} until={K.P - 0.3} x={60} y={1085} texto="Pseudogymnoascus destructans" it tam={34} color={KC.yellow} />
      <Etq T={T} at={K.H + 1.4} until={K.P - 0.3} x={60} y={1138} texto="esporas curvas (conidios)" tam={28} />
      <Chip T={T} at={K.P + 0.1} until={K.D - 0.3} texto="AL MICROSCOPIO · piel del ala" x={540} y={430} tam={32} borde={KC.cyan} />
      <Etq T={T} at={K.P + 1.0} until={K.D - 0.3} x={60} y={560} texto="hifas" tam={30} color="#ffffff" />
      <Etq T={T} at={K.P + 1.6} until={K.D - 0.3} x={60} y={1100} texto="folículos del pelo y glándulas" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.P + 2.0} until={K.D - 0.3} texto="hocico · orejas · alas" x={700} y={540} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.Gr + 1.6} until={K.Gr + 3.9} texto="sano: la mayor parte, en despertar" x={420} y={520} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Gr + 6.6} until={K.E - 0.3} texto="enfermo: sin grasa antes de la primavera" x={540} y={1110} tam={28} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2012" quien="murciélagos silvestres de EE. UU." revista="Reeder et al., PLOS ONE" y={700} />
      <Chip T={T} at={K.Mi + 2.6} until={K.Eu - 0.3} texto="más del 90 %" x={400} y={700} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Eu + 1.0} until={K.Mx - 0.3} texto="Europa: sin matanzas" x={390} y={870} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Eu + 0.4} until={K.Mx - 0.3} x={60} y={330} texto="murciélago europeo con el hongo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Mx + 1.4} until={K.C - 0.3} texto="Oaxaca: hongo reportado en 2025" x={540} y={1000} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 2.2} until={K.C - 0.3} texto="si ves uno enfermo, no lo toques" x={540} y={1095} tam={32} borde={KC.red} />
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 0.7} until={K.Ou - 0.2} texto="¿escarcha?" x={380} y={1115} tam={46} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Cu} texto="2 cm" largo={210} />
      <BarraEscala T={T} at={K.Cu} until={K.H} texto="5 cm" largo={225} />
      <BarraEscala T={T} at={K.H} until={K.P} texto="10 µm" largo={80} />
      <BarraEscala T={T} at={K.P} until={K.D} texto="50 µm" largo={160} />
      <BarraEscala T={T} at={K.D} until={K.Q} texto="2 cm" largo={190} />
      <BarraEscala T={T} at={K.F} until={K.Mi} texto="2 cm" largo={125} />
      <BarraEscala T={T} at={K.Eu} until={K.Mx} texto="2 cm" largo={130} />
      <BarraEscala T={T} at={K.Mx} until={K.C} texto="500 km" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={210} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="No es escarcha: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Cu + 0.1} until={K.H - 0.1} texto="Hiberna *casi tan frío como la roca.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.P - 0.1} texto="Un hongo *del frío.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.D - 0.1} texto="Se mete en *hocico, orejas y alas.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.Q - 0.1} texto="Y lo hace *despertar más seguido.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.Gr - 0.1} texto="¿Qué tiene de malo *despertarse?*" />
      <Subtitulo T={T} idx={6} at={K.Gr + 0.1} until={K.E - 0.1} texto="Despertar *cuesta mucha grasa.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.F - 0.1} texto="Sanos, *unos 16 días;* los que murieron, *unos 8.*" />
      <Subtitulo T={T} idx={8} at={K.F + 0.1} until={K.Mi - 0.1} texto="Primera foto: *Nueva York, 2006.*" />
      <Subtitulo T={T} idx={9} at={K.Mi + 0.1} until={K.Eu - 0.1} texto="Ya mató a *millones* de murciélagos." />
      <Subtitulo T={T} idx={10} at={K.Eu + 0.1} until={K.Mx - 0.1} texto="En Europa *no causa matanzas.*" />
      <Subtitulo T={T} idx={11} at={K.Mx + 0.1} until={K.C - 0.1} texto="¿Y en México? *Oaxaca, 2025.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es un hongo *que no lo deja dormir.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.4, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.D + 0.2, K.Q - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Q + 0.05, K.Gr + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.Gr + 4.6, K.E - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.E + 3.3, K.F - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Mi + 2.4, K.Eu - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Eu + 0.6, K.Mx - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Mx + 0.6, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="44" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NarizBlancaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NarizBlancaShot /></CompositionStage></div>;
}
window.NarizBlancaApp = NarizBlancaApp;
