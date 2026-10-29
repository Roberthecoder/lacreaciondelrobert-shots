// Shot Químico #59 · ¿Por qué NO barrer ni aspirar el mercurio de un termómetro roto? — NARRADO (N1 por dentro + medidor).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const HG = '#c9d1db', HG_OSC = '#6f7b88', VAPOR = 'rgba(200,225,255,.55)', GUANTE = '#3f7bff', CARTON = '#c8955a';

// Degradado plateado de las gotas de mercurio (una vez por capa SVG).
function HgDefs() {
  return <defs>
    <radialGradient id="hgGrad" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor="#ffffff" /><stop offset="35%" stopColor="#dfe5ec" /><stop offset="75%" stopColor="#8d99a6" /><stop offset="100%" stopColor="#4f5964" />
    </radialGradient>
  </defs>;
}
// Gota de mercurio (bolita plateada con brillo).
function Gota({ x, y, r = 20, o = 1 }) {
  if (o <= 0 || r <= 0) return null;
  return <g opacity={o}>
    <ellipse cx={x + r * 0.15} cy={y + r * 0.75} rx={r * 0.95} ry={r * 0.3} fill="rgba(0,0,0,.18)" />
    <circle cx={x} cy={y} r={r} fill="url(#hgGrad)" stroke={KC.ink} strokeWidth={Math.max(2, r / 7)} />
    <ellipse cx={x - r * 0.35} cy={y - r * 0.4} rx={r * 0.28} ry={r * 0.18} fill="#fff" opacity={0.9} />
  </g>;
}
// Piso de losetas (vista desde arriba).
function Piso({ color = KC.yellow, claro = '#fff3a6', paso = 180 }) {
  const out = [];
  for (let r = 0; r < Math.ceil(KH / paso); r++) for (let c = 0; c < Math.ceil(KW / paso) + 1; c++) if ((r + c) % 2) out.push(<rect key={`${r}-${c}`} x={c * paso} y={r * paso} width={paso} height={paso} fill={claro} />);
  return <g><rect width={KW} height={KH} fill={color} />{out}
    {Array.from({ length: Math.ceil(KW / paso) + 1 }, (_, i) => <line key={'v' + i} x1={i * paso} x2={i * paso} y1={0} y2={KH} stroke="rgba(0,0,0,.12)" strokeWidth={4} />)}
    {Array.from({ length: Math.ceil(KH / paso) + 1 }, (_, i) => <line key={'h' + i} y1={i * paso} y2={i * paso} x1={0} x2={KW} stroke="rgba(0,0,0,.12)" strokeWidth={4} />)}</g>;
}
// Termómetro clínico de vidrio. roto 0..1 separa las dos mitades.
function TermoHg({ x, y, s = 1, rot = 0, roto = 0 }) {
  const mitad = (lado) => {
    const d = roto * (lado < 0 ? -1 : 1);
    return <g transform={`translate(${d * 60} ${d * 25}) rotate(${d * 14})`}>
      {lado < 0 ? <g>
        <path d="M -300 -30 L 0 -30 L 0 30 L -300 30 Q -330 30 -330 0 Q -330 -30 -300 -30 Z" fill="rgba(235,248,255,.85)" stroke={KC.ink} strokeWidth={8} />
        <rect x={-310} y={-9} width={roto > 0 ? 200 : 310} height={18} rx={9} fill={HG} />
        <circle cx={-330} cy={0} r={42} fill="url(#hgGrad)" stroke={KC.ink} strokeWidth={8} />
      </g> : <g>
        <path d="M 0 -30 L 290 -30 Q 320 -30 320 0 Q 320 30 290 30 L 0 30 Z" fill="rgba(235,248,255,.85)" stroke={KC.ink} strokeWidth={8} />
        {roto === 0 && <rect x={0} y={-9} width={60} height={18} rx={9} fill={HG} />}
        {[40, 90, 140, 190, 240].map((m, i) => <g key={i}><line x1={m} x2={m} y1={-30} y2={-12} stroke={KC.ink} strokeWidth={4} />
          <text x={m} y={22} textAnchor="middle" style={{ font:`700 16px ${KF.mono}` }} fill={KC.ink}>{36 + i}</text></g>)}
      </g>}
    </g>;
  };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {mitad(-1)}{mitad(1)}
    {roto > 0 && [[-14, -50, 20], [10, 46, -30], [30, -60, 50], [-30, 50, 10]].map(([dx, dy, r], i) =>
      <path key={i} d="M 0 -12 L 10 8 L -9 6 Z" transform={`translate(${dx * (1 + roto * 2)} ${dy * (1 + roto)}) rotate(${r + roto * 90})`} fill="rgba(235,248,255,.9)" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Escoba (vista de arriba, de lado).
function Escoba({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-12} y={-360} width={24} height={300} rx={10} fill="#b07a3c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -70 L 50 -70 L 110 90 L -110 90 Z" fill="#ffd23f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-80, -40, 0, 40, 80].map((dx) => <line key={dx} x1={dx * 0.5} y1={-60} x2={dx} y2={86} stroke="#c99a12" strokeWidth={5} />)}
    <rect x={-56} y={-90} width={112} height={30} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Aspiradora de trineo (de lado). calor 0..1 pone el motor al rojo; corte = muestra el motor.
function Aspiradora({ T, x, y, s = 1, calor = 0, corte = 0, gris = 0, manguera = true }) {
  const giro = T * 900 * (0.3 + calor);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {manguera && <path d="M -170 -40 Q -320 -160 -330 40 L -340 150" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />}
    {manguera && <path d="M -170 -40 Q -320 -160 -330 40 L -340 150" fill="none" stroke="#5a6170" strokeWidth={18} strokeLinecap="round" />}
    {manguera && <rect x={-420} y={140} width={160} height={36} rx={10} fill="#5a6170" stroke={KC.ink} strokeWidth={7} />}
    <path d="M -190 60 Q -200 -110 -40 -120 L 120 -120 Q 210 -110 210 0 L 210 60 Q 200 100 150 100 L -150 100 Q -190 100 -190 60 Z" fill={mixHex('#ff3b2f', '#8a8f99', gris)} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-120} y={-150} width={200} height={34} rx={14} fill="#2d3340" stroke={KC.ink} strokeWidth={7} />
    {corte > 0 && <g opacity={corte}>
      <rect x={-120} y={-90} width={260} height={160} rx={20} fill="#1d2230" stroke={KC.ink} strokeWidth={6} />
      <circle cx={70} cy={-10} r={60} fill={mixHex('#3a4150', '#ff5a1f', calor)} stroke={KC.ink} strokeWidth={6} />
      {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={70} y1={-10} x2={70 + Math.cos((giro + k * 60) * Math.PI / 180) * 50} y2={-10 + Math.sin((giro + k * 60) * Math.PI / 180) * 50} stroke={KC.ink} strokeWidth={8} />)}
      <rect x={-100} y={-70} width={110} height={120} rx={14} fill="rgba(255,255,255,.15)" stroke="#9aa3b5" strokeWidth={4} strokeDasharray="10 8" />
      <text x={-45} y={70} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#cfd6e0">bolsa</text>
    </g>}
    <circle cx={-130} cy={105} r={34} fill="#2d3340" stroke={KC.ink} strokeWidth={7} />
    <circle cx={140} cy={105} r={34} fill="#2d3340" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((k) => <rect key={k} x={212} y={-60 + k * 30} width={18} height={14} rx={5} fill="#2d3340" />)}
  </g>;
}
// Señal "NO" (círculo rojo con diagonal) sobre algo.
function SenalNo({ x, y, r = 150, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(1.6, 1, o)})`} opacity={o}>
    <circle r={r} fill="none" stroke={KC.red} strokeWidth={r / 6} />
    <line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={KC.red} strokeWidth={r / 6} strokeLinecap="round" />
  </g>;
}
// Puntitos de vapor que suben (casi invisibles: "no lo ves").
function Vapor({ T, x, y, w = 200, h = 400, n = 30, seed = 3, vel = 60, o = 1, color = VAPOR, r = 7, dir = -1 }) {
  if (o <= 0) return null;
  const R = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const bx = R() * w, ph = R(), v = vel * (0.6 + R() * 0.8), rr = r * (0.6 + R() * 0.8);
    const u = ((T * v / h) + ph) % 1;
    return <circle key={i} cx={x - w / 2 + bx + Math.sin(T * 2 + ph * 9) * 14} cy={y + dir * u * h} r={rr} fill={color} opacity={Math.sin(Math.PI * u)} />; })}</g>;
}
// Persona de lado (adulto o niño gateando).
function Adulto({ x, y, s = 1, color = KC.blue }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-560} r={60} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -480 Q 0 -500 70 -480 L 80 -220 L -80 -220 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 -220 L -50 0 M 50 -220 L 50 0" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
  </g>;
}
function Nino({ x, y, s = 1, T = 0, color = KC.orange }) {
  const p = Math.sin(T * 5) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -90 -40 L -110 ${0} M 60 -40 L ${70 + p} 0`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <ellipse cx={-10} cy={-70} rx={100} ry={45} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={120} cy={-70} r={42} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <circle cx={140} cy={-80} r={6} fill={KC.ink} />
  </g>;
}
// Perrito esquemático (de lado).
function Perro({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -60 -20 L -64 20 M -30 -20 L -30 20 M 30 -20 L 32 20 M 56 -20 L 60 20`} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={0} cy={-36} rx={72} ry={30} fill="#d9a066" stroke={KC.ink} strokeWidth={6} />
    <circle cx={74} cy={-66} r={28} fill="#d9a066" stroke={KC.ink} strokeWidth={6} />
    <path d={`M -70 -46 Q -100 ${-80 + Math.sin(T * 12) * 10} -90 -90`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Mano con guante (vista de arriba).
function Guante({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-36, -12, 12, 36].map((dx, i) => <rect key={i} x={dx - 11} y={-110 + Math.abs(dx) * 0.5} width={22} height={70} rx={11} fill={GUANTE} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-52} y={-60} width={104} height={100} rx={30} fill={GUANTE} stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={-30} width={36} height={22} rx={11} fill={GUANTE} stroke={KC.ink} strokeWidth={5} transform="rotate(-30 -52 -20)" />
    <rect x={-48} y={30} width={96} height={40} rx={8} fill="#2c5bd6" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Gotero.
function Gotero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -12 -150 L 12 -150 L 10 -10 L 0 10 L -10 -10 Z" fill="rgba(235,248,255,.9)" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-176} rx={26} ry={32} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Reloj.
function Reloj({ T, x, y, r = 90, vel = 720, texto }) {
  const a = T * vel;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 8} x2={0} y2={-r + 22} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.7} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${a})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={KC.red} strokeWidth={10} strokeLinecap="round" transform={`rotate(${a / 12})`} />
    <circle r={9} fill={KC.ink} />
    {texto && <text y={r + 62} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} stroke="#fff" strokeWidth={3} paintOrder="stroke">{texto}</text>}
  </g>;
}
// Bolsa con cierre hermético, con las gotas adentro y etiqueta.
function BolsaHg({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={320} rx={18} fill="rgba(230,245,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-170} width={300} height={34} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    {[[-60, 100], [-20, 112], [30, 104], [70, 114], [0, 80], [-45, 72], [45, 76]].map(([dx, dy], i) => <Gota key={i} x={dx} y={dy} r={16 + (i % 3) * 3} />)}
    <rect x={-120} y={-110} width={240} height={110} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-66} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.red}>RESIDUO DE</text>
    <text x={0} y={-26} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.red}>MERCURIO</text>
  </g>;
}

function Mercurio() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, P: CUES.Pulmon, E: CUES.Escoba, A: CUES.Aspiradora, Pr: CUES.Pregunta, Es: CUES.Estudio, H: CUES.QueHacer, D: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const GAR = K.Es + 4.2;                         // cambio a la escena del garaje
  // gancho: el termómetro cae y se rompe
  const cae = kprog(T, K.G - 0.3, K.G + 0.3, kEase.entra || ((p) => p * p));
  const roto = kprog(T, K.G + 0.32, K.G + 0.7, kEase.sale);
  const R = krng(11);
  const gotas = Array.from({ length: 9 }, (_, i) => [300 + R() * 520, 860 + R() * 300, 12 + R() * 22, i * 0.07]);
  const salen = (i) => kprog(T, K.G + 0.4 + gotas[i][3], K.G + 1.4 + gotas[i][3], kEase.sale);
  const X0 = 360, Y0 = 1010;                     // de donde salen (bulbo)
  // escoba
  const barre = kprog(T, K.E + 0.4, K.E + 1.6, kEase.suave);
  const R2 = krng(4);
  const gotitas = Array.from({ length: 22 }, () => [(R2() - 0.5) * 520, (R2() - 0.5) * 300, 6 + R2() * 7]);
  // aspiradora
  const succion = kprog(T, K.A + 0.3, K.A + 1.4);
  const calor = kprog(T, K.A + 1.0, K.A + 2.2);
  const avienta = kprog(T, K.A + 1.8, K.A + 2.6);
  // qué hacer: pasos (tiempos atados a la frase)
  const PS = [K.H + 1.9, K.H + 3.6, K.H + 4.6, K.H + 5.6, K.H + 7.5];
  const paso = PS.filter((t) => T >= t).length;
  const R3 = krng(7);
  const gotasCuarto = Array.from({ length: 8 }, () => [470 + R3() * 220, 860 + R3() * 150, 10 + R3() * 10]);
  const junta = kprog(T, PS[3], PS[3] + 1.5, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el termómetro se rompe en el piso */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <SvgCapa><HgDefs /><Piso />
          {gotas.map(([x, y, r], i) => <Gota key={i} x={klerp(X0, x, salen(i))} y={klerp(Y0, y, salen(i))} r={r * kprog(T, K.G + 0.35, K.G + 0.6)} />)}
          <TermoHg x={540} y={klerp(-300, 1010, cae)} rot={klerp(-40, -8, cae)} roto={roto} />
          <g opacity={kprog(T, K.G + 1.8, K.G + 2.2)} transform={`translate(${klerp(-200, 0, kprog(T, K.G + 1.8, K.G + 2.3, kEase.sale))} 0)`}>
            <Escoba x={230} y={640} s={0.85} rot={-20} /><SenalNo x={230} y={560} r={150} o={kprog(T, K.G + 2.4, K.G + 2.8, kEase.sale)} /></g>
          <g opacity={kprog(T, K.G + 2.8, K.G + 3.2)} transform={`translate(${klerp(300, 0, kprog(T, K.G + 2.8, K.G + 3.3, kEase.sale))} 0)`}>
            <Aspiradora T={T} x={760} y={1580} s={0.75} /><SenalNo x={720} y={1560} r={170} o={kprog(T, K.G + 3.4, K.G + 3.8, kEase.sale)} /></g>
        </SvgCapa>
      </Escena>
      {/* 1 · qué es: por dentro de una gota */}
      <Escena T={T} a={K.Q} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><HgDefs />
          <clipPath id="clipGota"><circle cx={540} cy={1020} r={300} /></clipPath>
          <circle cx={540} cy={1020} r={300} fill="url(#hgGrad)" stroke={KC.texto} strokeWidth={8} />
          <g clipPath="url(#clipGota)" opacity={kprog(T, K.Q + 0.4, K.Q + 1.2)}>
            {Array.from({ length: 15 }, (_, r) => Array.from({ length: 15 }, (_, c) => { const x = 220 + c * 46 + (r % 2) * 23, y = 720 + r * 40;
              return <circle key={`${r}-${c}`} cx={x + Math.sin(T * 6 + r + c) * 2} cy={y + Math.cos(T * 5 + r * c) * 2} r={19} fill="#aab4c0" stroke="#4f5964" strokeWidth={3} />; }))}
          </g>
          <Vapor T={T} x={540} y={720} w={460} h={520} n={34} seed={5} vel={110} o={kprog(T, K.Q + 1.6, K.Q + 2.4)} r={12} color="rgba(190,215,240,.5)" />
          <text x={540} y={1400} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="rgba(246,243,236,.7)">POR DENTRO · átomos de mercurio</text>
        </SvgCapa>
      </Escena>
      {/* 2 · pulmón */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><HgDefs />
          <g transform="translate(300 860)">
            <path d="M -120 -260 Q -150 -420 0 -440 Q 150 -440 150 -300 L 180 -250 L 150 -230 L 150 -170 Q 120 -140 60 -150 L 60 -90 L 230 -40 L 230 420 L -230 420 L -230 -40 L -60 -90 L -60 -150 Q -120 -170 -120 -260 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
            <path d="M -20 -40 Q -170 0 -160 220 Q -140 300 -40 260 Q -20 120 -20 -40 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={7} />
            <path d="M 20 -40 Q 170 0 160 220 Q 140 300 40 260 Q 20 120 20 -40 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={7} />
            <path d="M 0 -150 L 0 -40" stroke={KC.ink} strokeWidth={14} />
          </g>
          {Array.from({ length: 18 }, (_, i) => { const t0 = K.P + 0.2 + i * 0.22, u = kprog(T, t0, t0 + 1.6);
            if (u <= 0 || u >= 1) return null;
            const pts = [[1000, 600], [460, 650], [300, 750], [300 + ((i % 2) ? 80 : -80), 1020]];
            const seg = Math.min(2, Math.floor(u * 3)), f = u * 3 - seg, [ax, ay] = pts[seg], [bx, by] = pts[seg + 1];
            return <circle key={i} cx={klerp(ax, bx, f)} cy={klerp(ay, by, f)} r={10} fill="rgba(200,225,255,.85)" />; })}
          <g opacity={kprog(T, K.P + 1.6, K.P + 2.2)}>
            <line x1={380} y1={1020} x2={640} y2={950} stroke={KC.texto} strokeWidth={4} strokeDasharray="10 8" />
            <circle cx={800} cy={940} r={190} fill="#ffc2cc" stroke={KC.texto} strokeWidth={8} />
            <path d="M 640 1020 Q 800 1090 960 1020 L 960 1100 Q 800 1150 640 1100 Z" fill="#d7263d" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 8 }, (_, i) => { const t0 = K.P + 2.2 + i * 0.3, u = kprog(T, t0, t0 + 1.2); if (u <= 0) return null;
              return <circle key={i} cx={700 + i * 28} cy={klerp(840, 1070, u)} r={10} fill={mixHex('#c8e1ff', '#ffe0e0', u)} stroke={u > 0.8 ? KC.ink : 'none'} strokeWidth={2} />; })}
            <text x={800} y={830} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>pulmón</text>
            <text x={800} y={1085} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">sangre</text>
          </g>
        </SvgCapa>
      </Escena>
      {/* 3 · la escoba */}
      <Escena T={T} a={K.E} b={K.A} zoom={0.04}>
        <SvgCapa><HgDefs /><Piso />
          {barre < 0.5 ? <Gota x={540} y={950} r={60} /> : gotitas.map(([dx, dy, r], i) => <Gota key={i} x={540 + dx * kprog(T, K.E + 1.0, K.E + 1.8, kEase.sale)} y={950 + dy * kprog(T, K.E + 1.0, K.E + 1.8, kEase.sale)} r={r} />)}
          <Escoba x={klerp(1100, 100, barre)} y={1060} s={1} rot={-70 + Math.sin(T * 10) * 6} />
          {T > K.E + 2.0 && gotitas.map(([dx, dy], i) => <path key={i} d={`M ${540 + dx} ${950 + dy - 20} l 0 ${-30 - ((T * 60 + i * 13) % 40)}`} stroke="rgba(60,90,140,.6)" strokeWidth={4} strokeLinecap="round" opacity={kprog(T, K.E + 2.0, K.E + 2.4)} />)}
        </SvgCapa>
      </Escena>
      {/* 4 · la aspiradora (en corte) */}
      <Escena T={T} a={K.A} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><HgDefs />
          {Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.A + 0.3 + i * 0.12, K.A + 1.2 + i * 0.12); if (u >= 1) return null;
            return <Gota key={i} x={klerp(250 + i * 20, 230, u)} y={klerp(1210, 1130, u)} r={14 * (1 - u * 0.5)} />; })}
          <Aspiradora T={T} x={620} y={980} s={1.25} calor={calor} corte={kprog(T, K.A + 0.6, K.A + 1.0)} gris={kprog(T, K.A + 3.0, K.A + 3.8) * 0.6} />
          <Vapor T={T} x={980} y={900} w={160} h={520} n={30} seed={9} vel={160} o={avienta} r={12} color="rgba(255,255,255,.75)" />
          {calor > 0.3 && <text x={710} y={790} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.orange} stroke={KC.ink} strokeWidth={4} paintOrder="stroke" opacity={calor}>CALOR</text>}
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={270} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 900)`}>?</text>
          <Reloj T={T} x={270} y={1450} r={110} vel={1800} />
        </SvgCapa>
      </Escena>
      {/* 6a · 2004: la familia aspira el mercurio */}
      <Escena T={T} a={K.Es} b={GAR} zoom={0.04}>
        <SvgCapa><HgDefs /><Piso color={KC.lilac} claro="#cdb6ff" />
          {Array.from({ length: 6 }, (_, i) => { const u = kprog(T, K.Es + 1.5 + i * 0.3, K.Es + 2.2 + i * 0.3); return u < 1 ? <Gota key={i} x={klerp(180 + i * 50, 180, u)} y={klerp(1150 + (i % 2) * 40, 1170, u)} r={16} /> : null; })}
          <Aspiradora T={T} x={640} y={1000} s={1} />
        </SvgCapa>
      </Escena>
      {/* 6b · un mes después, en el garaje */}
      <Escena T={T} a={GAR} b={K.H} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#9fb3c8' }}></div>
        <SvgCapa><HgDefs />
          {Array.from({ length: 6 }, (_, i) => <rect key={i} x={0} y={380 + i * 130} width={KW} height={8} fill="rgba(0,0,0,.08)" />)}
          <rect x={0} y={1180} width={KW} height={KH - 1180} fill="#6f7f90" />
          {Array.from({ length: 26 }, (_, i) => { const R4 = krng(i + 30); return <path key={i} d="M 0 -14 L 4 0 L 0 14 L -4 0 Z M -14 0 L 0 4 L 14 0 L 0 -4 Z" transform={`translate(${R4() * KW} ${360 + R4() * 820}) scale(${0.8 + R4()})`} fill="#ffffff" opacity={0.7} />; })}
          {(() => { const tira = kprog(T, K.Es + 10.2, K.Es + 11.6, kEase.entra || ((p) => p * p));
            return <g>
              <g transform={`translate(${klerp(0, 260, tira)} ${klerp(0, 260, tira)}) rotate(${tira * 20} 560 1050)`}>
                <Aspiradora T={T} x={560} y={1050} s={1} gris={0.4} />
                <Vapor T={T} x={560} y={930} w={360} h={420} n={26} seed={12} vel={60} o={kprog(T, K.Es + 5.6, K.Es + 6.4) * (1 - tira)} r={11} color="rgba(255,255,255,.8)" />
              </g>
              <Marca x={560} y={900} ok={false} s={1.1} o={kprog(T, K.Es + 9.8, K.Es + 10.2) * (1 - tira)} />
              <g opacity={kprog(T, K.Es + 9.9, K.Es + 10.3)}>
                <path d="M 700 1380 L 1000 1380 L 970 1660 L 730 1660 Z" fill="#3d4a57" stroke={KC.ink} strokeWidth={8} />
                <rect x={680} y={1350} width={340} height={40} rx={10} fill="#2d3640" stroke={KC.ink} strokeWidth={7} />
                <text x={850} y={1540} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff">RELLENO</text>
                <text x={850} y={1580} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff">SANITARIO</text>
              </g>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 7 · qué hacer (EPA) */}
      <Escena T={T} a={K.H} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><HgDefs />
          <rect x={70} y={420} width={940} height={760} rx={20} fill="#fff3a6" stroke={KC.ink} strokeWidth={12} />
          {/* puerta (izquierda) */}
          <rect x={58} y={900} width={24} height={200} fill="#fff3a6" />
          <path d={`M 70 900 L ${70 + 180 * Math.cos(kprog(T, PS[0] - 0.4, PS[0]) * 1.2)} ${900 + 180 * Math.sin(kprog(T, PS[0] - 0.4, PS[0]) * 1.2)}`} stroke="#8a5a2b" strokeWidth={14} strokeLinecap="round" />
          {/* ventana (arriba) */}
          {(() => { const ab = kprog(T, PS[1], PS[1] + 0.5, kEase.sale); return <g>
            <rect x={240} y={404} width={300} height={34} fill={mixHex('#8fd3ff', '#e9f8ff', ab)} stroke={KC.ink} strokeWidth={6} />
            <rect x={240 + ab * 150} y={398} width={150} height={46} fill="#5aa9e6" stroke={KC.ink} strokeWidth={6} />
            {ab > 0.5 && [0, 1, 2].map((k) => <path key={k} d={`M ${300 + k * 80} ${300 - ((T * 120 + k * 30) % 60)} q 20 30 0 60`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.9} />)}
          </g>; })()}
          {gotasCuarto.map(([x, y, r], i) => <Gota key={i} x={klerp(x, 560 + (i % 3) * 18, junta)} y={klerp(y, 930 + Math.floor(i / 3) * 16, junta)} r={r * (1 - kprog(T, PS[3] + 1.6, PS[3] + 2.0) * 0.999)} />)}
          {/* la familia sale sin pisar las gotas */}
          {[[0, 'a'], [0.25, 'n'], [0.45, 'p']].map(([d, q], i) => { const u = kprog(T, PS[0] + d, PS[0] + d + 1.3, kEase.suave); if (u >= 1) return null;
            const x = klerp(820 - i * 40, 40, u), y = klerp(1080, 1000, u) + Math.abs(Math.sin(T * 9)) * -8;
            return q === 'a' ? <Adulto key={i} x={x} y={y + 60} s={0.42} /> : q === 'n' ? <Nino key={i} x={x} y={y + 40} s={0.5} T={T} /> : <Perro key={i} x={x} y={y + 40} s={0.7} T={T} />; })}
          {/* guantes, cartón y gotero */}
          {T > PS[2] && <g opacity={kprog(T, PS[2], PS[2] + 0.3) * (1 - kprog(T, PS[4] - 0.2, PS[4] + 0.2))}>
            <g transform={`translate(${klerp(840, 700, junta)} 0)`}>
              <rect x={-10} y={800} width={40} height={240} rx={6} fill={CARTON} stroke={KC.ink} strokeWidth={6} opacity={T > PS[3] ? 1 : 0} />
              <Guante x={60} y={940} s={0.9} rot={90} />
            </g>
            {T > PS[3] + 1.0 && <g transform={`translate(565 ${klerp(760, 900, kprog(T, PS[3] + 1.0, PS[3] + 1.5))})`}><Gotero x={0} y={0} s={1} /><Guante x={0} y={-150} s={0.75} rot={0} /></g>}
          </g>}
          {T > PS[4] && <g opacity={kprog(T, PS[4], PS[4] + 0.3)}><Reloj T={T} x={700} y={760} r={110} vel={2000} texto="≥ 24 h" /></g>}
        </SvgCapa>
        <div style={{ position:'absolute', left:0, right:0, top:1600, display:'flex', justifyContent:'center', gap:22, zIndex:41 }}>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ width:46, height:46, borderRadius:23, border:`5px solid ${KC.ink}`, background: k < paso ? KC.yellow : 'rgba(255,255,255,.5)', display:'flex', alignItems:'center', justifyContent:'center', font:`900 28px ${KF.texto}`, color:KC.ink }}>{k < paso ? '✓' : k + 1}</div>)}
        </div>
        <div style={{ position:'absolute', left:0, right:0, top:1680, textAlign:'center', font:`700 30px ${KF.mono}`, color:KC.ink, zIndex:41 }}>Fuente: EPA (EE. UU.)</div>
      </Escena>
      {/* 8 · el vapor se queda abajo */}
      <Escena T={T} a={K.D} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={0} y={1160} width={KW} height={KH - 1160} fill="#8a6a4a" />
          <rect x={0} y={1160 - 150 * kprog(T, K.D + 0.6, K.D + 2.0)} width={KW} height={150 * kprog(T, K.D + 0.6, K.D + 2.0)} fill="rgba(255,255,255,.5)" />
          <Vapor T={T} x={760} y={500} w={640} h={640} n={40} seed={14} vel={140} o={1} r={11} color="rgba(255,255,255,.9)" dir={1} />
          <Adulto x={650} y={1160} s={1} color={KC.blue} />
          <Nino x={860} y={1160} s={0.9} T={T} />
          <line x1={0} y1={1010} x2={KW} y2={1010} stroke="#fff" strokeWidth={5} strokeDasharray="16 12" opacity={kprog(T, K.D + 1.6, K.D + 2.0)} />
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: el piso del inicio, ya limpio y ventilado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <SvgCapa><HgDefs /><Piso />
          <rect x={160} y={300} width={460} height={90} fill="#e9f8ff" stroke={KC.ink} strokeWidth={9} />
          <rect x={390} y={292} width={230} height={106} fill="#5aa9e6" stroke={KC.ink} strokeWidth={8} />
          <Vapor T={T} x={390} y={760} w={260} h={460} n={26} seed={21} vel={170} o={1} r={13} color="rgba(255,138,31,.95)" />
          <BolsaHg x={420} y={1000} s={1.1} />
          <TermoHg x={820} y={860} s={0.45} rot={-20} roto={1} />
          <g transform="translate(560 1530) scale(.55)"><Escoba x={-140} y={60} s={1} rot={-20} /><SenalNo x={-140} y={-40} r={170} /></g>
          <g transform="translate(620 1530) scale(.5)"><Aspiradora T={T} x={300} y={0} s={1} manguera={false} /><SenalNo x={300} y={0} r={240} /></g>
        </SvgCapa>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.Q + 0.4} until={K.Q + 2.6} texto="Hg · mercurio: metal líquido" y={1480} tam={42} borde={HG} />
      <Chip T={T} at={K.Q + 2.8} until={K.P - 0.3} texto="gas sin color · sin olor" y={1480} tam={42} borde="#bfe8ff" />
      <Chip T={T} at={K.Q + 1.2} until={K.P - 0.3} texto="ambiente: 20–25 °C" y={1590} tam={38} borde={KC.orange} />
      <Medidor T={T} at={K.P + 2.0} until={K.E - 0.3} valor={(t) => klerp(0, 0.85, kprog(t, K.P + 2.2, K.P + 3.6, kEase.sale))} etiqueta="vapor que absorbe un adulto" texto={(v) => v < 0.69 ? Math.round(v * 100) + ' %' : '69–85 %'} y={1440} color={KC.orange} />
      <Etq T={T} at={K.P + 2.6} until={K.E - 0.3} x={90} y={1560} texto="ATSDR 2024 · adultos" tam={30} color={KC.texto} />
      <Chip T={T} at={K.E + 2.0} until={K.A - 0.3} texto="gotitas chicas → más vapor" y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={K.A + 1.2} until={K.Pr - 0.2} texto="calienta · avienta al aire" y={1500} tam={42} borde={KC.orange} />
      <Chip T={T} at={K.A + 3.0} until={K.Pr - 0.2} texto="queda contaminada" y={1600} tam={36} borde={HG} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.9} anio="2004" quien="St. Louis, Michigan (EE. UU.)" revista="Depto. de Salud de Michigan · ATSDR" y={600} />
      <Chip T={T} at={K.Es + 1.4} until={GAR - 0.2} texto="aspiraron el mercurio" y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={GAR + 0.3} until={K.H - 0.3} texto="ENE 2004 → 3 FEB 2004" x={760} y={470} tam={36} borde={KC.gold} mono />
      <Chip T={T} at={GAR + 1.3} until={K.H - 0.3} texto="garaje: −7 a −1 °C" x={760} y={570} tam={36} borde="#bfe8ff" />
      <Chip T={T} at={K.Es + 6.6} until={K.Es + 9.6} texto="2000 ng/m³ junto a la aspiradora" y={1500} tam={36} borde={KC.yellow} mono />
      <Chip T={T} at={K.Es + 9.8} until={K.H - 0.3} texto="Salud de Michigan: inutilizarla y tirarla" y={1720} tam={32} borde={KC.red} />
      <Chip T={T} at={K.H + 0.2} until={PS[0] - 0.2} texto="sin pánico" y={1480} tam={46} borde={KC.gold} />
      {['que salgan todos (y las mascotas)', 'abre las ventanas', 'ponte guantes', 'cartón y gotero', 'ventila al menos 24 h'].map((t, k) =>
        <Chip key={k} T={T} at={PS[k]} until={(PS[k + 1] || K.D) - 0.15} texto={`${k + 1} · ${t}`} y={1480} tam={k === 0 ? 36 : 42} borde={KC.blue} />)}
      <Chip T={T} at={K.D + 1.6} until={K.Ci - 0.2} texto="↓ más pesado que el aire" y={1500} tam={42} borde="#bfe8ff" />
      <Etq T={T} at={K.D + 2.2} until={K.Ci - 0.2} x={1060} y={985} texto="nariz del niño" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="bolsa hermética · nunca de vidrio" y={1720} tam={34} borde={KC.blue} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="¿Por qué *NO barrer ni aspirar?*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.P - 0.1} texto="Metal líquido que *suelta gas.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.1} until={K.E - 0.1} texto="Al respirarlo: *69 a 85 %.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.A - 0.1} texto="Gotitas chicas: *más evaporación.*" />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.Pr - 0.1} texto="La aspiradora *lo calienta.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cuánto tiempo *sigue soltando?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.H - 0.1} texto="Un mes después: *seguía soltando vapor.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.D - 0.1} texto="Sin pánico: *lo que dice la EPA.*" />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={K.Ci - 0.1} texto="El vapor *se queda abajo.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Lo peligroso: *lo que no ves.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Pulmon - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pulmon + 1.2, CUES.Escoba - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Escoba + 1.0, CUES.Aspiradora - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.4, CUES.Estudio + 11.8, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.QueHacer + 0.5, CUES.QueHacer + 8.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 0.2, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="59" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MercurioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Mercurio /></CompositionStage></div>;
}
window.MercurioApp = MercurioApp;
