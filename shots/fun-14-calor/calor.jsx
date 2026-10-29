// Shot Fungi Mati #14 · Tu escudo de 37 grados: por qué casi ningún hongo te toca — NARRADO (gancho 2 "tú contra la hormiga" + N2 "El número").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Viaje: la hormiga y tú (pink) → tu termómetro → hongos que no aguantan 37 °C → las cajas de la colección (fondo oscuro)
// → hipótesis → Candida auris (micro) → defensas → la misma imagen del inicio, con el escudo completo.

// ---------- piezas propias ----------
// Hormiga carpintera de perfil (mira a la derecha). (x, y) = centro del cuerpo; paso = fase de la caminata.
function Hormiga14({ T, x, y, s = 1, paso = 0, camina = 1, hilos = 0, flip = false }) {
  const ph = paso * Math.PI * 2;
  const cuerpo = '#3a2018', brillo = 'rgba(255,255,255,.22)';
  const patas = (lejos) => [[10, -0.55], [36, 0], [62, 0.55]].map(([hx, base], i) => {
    const f = ph + (i % 2 ? Math.PI : 0) + (lejos ? Math.PI : 0);
    const a = base + Math.sin(f) * 0.35 * camina, lift = Math.max(0, Math.cos(f)) * 12 * camina;
    const kx = hx + Math.sin(a) * 50, ky = 30 - lift * 0.4, fx = kx + Math.sin(a) * 42, fy = ky + 52 - lift;
    return <polyline key={(lejos ? 'l' : 'c') + i} points={`${hx + (lejos ? 8 : 0)},${lejos ? 2 : 8} ${kx},${ky} ${fx},${fy}`} fill="none" stroke={lejos ? '#5a3524' : KC.ink} strokeWidth={lejos ? 8 : 10} strokeLinecap="round" strokeLinejoin="round" />;
  });
  const ant = Math.sin(T * 7) * 4;
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {patas(true)}
    <ellipse cx={-80} cy={0} rx={70} ry={50} fill={cuerpo} stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -46 Q -42 0 -60 46" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={5} />
    <path d="M -100 -48 Q -84 0 -100 48" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={5} />
    <ellipse cx={-96} cy={-22} rx={28} ry={11} fill={brillo} />
    <ellipse cx={-8} cy={2} rx={13} ry={12} fill={cuerpo} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={38} cy={-4} rx={44} ry={22} fill={cuerpo} stroke={KC.ink} strokeWidth={7} transform="rotate(-8 38 -4)" />
    <ellipse cx={108} cy={-14} rx={36} ry={30} fill={cuerpo} stroke={KC.ink} strokeWidth={7} />
    <circle cx={120} cy={-22} r={6} fill="#fff" opacity=".7" />
    <path d="M 138 -2 L 158 6 L 140 12" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 1].map((k) => <polyline key={k} points={`${112 + k * 8},-40 ${128 + k * 10},${-82 + ant} ${168 + k * 8},${-92 + k * 8 - ant}`} fill="none" stroke={k ? '#5a3524' : KC.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />)}
    {patas(false)}
    {hilos > 0 && <g opacity={hilos}>
      {['M -130 -10 C -100 -40 -70 20 -40 -10', 'M -120 20 C -90 0 -60 40 -30 14', 'M -10 0 C 10 -20 30 10 60 -10', 'M 40 6 C 60 30 80 -10 100 0', 'M 80 -20 C 96 -40 110 -30 124 -44'].map((d, i) =>
        <path key={i} d={d} fill="none" stroke={KC.gold2} strokeWidth={5} strokeLinecap="round" strokeDasharray={`${200 * hilos} 400`} />)}
    </g>}
  </g>;
}
// Persona (silueta amable). (x, y) = pies; alto ≈ 330·s.
function Gente({ x, y, s = 1, camisa = KC.blue, piel = '#f2c29b', brillo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={-170} rx={150} ry={210} fill="url(#calorBrillo)" opacity={brillo * (0.8 + 0.2 * Math.sin(T * 4))} />}
    <path d="M -95 0 L -95 -120 Q -95 -190 0 -192 Q 95 -190 95 -120 L 95 0 Z" fill={camisa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-22} y={-215} width={44} height={30} fill={piel} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-268} r={66} fill={piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -66 -280 Q -60 -350 0 -342 Q 60 -350 66 -282 Q 30 -312 -66 -280 Z" fill="#3b2a20" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={-262} r={7} fill={KC.ink} /><circle cx={22} cy={-262} r={7} fill={KC.ink} />
    <path d="M -20 -232 Q 0 -218 20 -232" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Gradientes compartidos (van una vez por svg que los use).
const DEFS14 = <defs>
  <radialGradient id="calorBrillo"><stop offset="0%" stopColor="#ffb347" stopOpacity=".85" /><stop offset="100%" stopColor="#ff8a1f" stopOpacity="0" /></radialGradient>
  <radialGradient id="escudoG"><stop offset="70%" stopColor="#ff8a1f" stopOpacity="0" /><stop offset="100%" stopColor="#ff8a1f" stopOpacity=".45" /></radialGradient>
</defs>;
// Termómetro vertical. (x, y) = centro del bulbo. f = 0..1 llenado. marcas = [[f, texto]].
function Termo({ x, y, alto = 480, f = 0.5, color = KC.red, marcas = [], s = 1 }) {
  const h = alto - 60, top = -alto;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={top} width={60} height={alto} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-14} y={-40 - h * kclamp(f, 0, 1)} width={28} height={h * kclamp(f, 0, 1) + 40} rx={14} fill={color} />
    <circle r={52} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-16} cy={-16} r={12} fill="#fff" opacity=".5" />
    {marcas.map(([mf, t], i) => <g key={i}><line x1={30} y1={-40 - h * mf} x2={56} y2={-40 - h * mf} stroke={KC.ink} strokeWidth={6} />
      <text x={66} y={-40 - h * mf + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text></g>)}
  </g>;
}
// Escudo de calor alrededor de algo (elipse que respira). p = 0..1 encendido.
function EscudoCalor({ T, cx, cy, rx, ry, p = 1, color = KC.orange, texto }) {
  if (p <= 0) return null;
  const k = 1 + Math.sin(T * 5) * 0.015;
  return <g opacity={kclamp(p * 1.4, 0, 1)}>
    <ellipse cx={cx} cy={cy} rx={rx * p * k} ry={ry * p * k} fill="url(#escudoG)" stroke={color} strokeWidth={12} strokeDasharray="34 16" strokeDashoffset={-T * 40} />
    <ellipse cx={cx} cy={cy} rx={Math.max(0, rx * p * k - 18)} ry={Math.max(0, ry * p * k - 18)} fill="none" stroke="#ffd29a" strokeWidth={4} opacity=".7" />
    {texto && p > 0.9 && <g transform={`translate(${cx - rx * k + 10} ${cy + 40})`}>
      <rect x={-92} y={-34} width={184} height={64} rx={32} fill={color} stroke={KC.ink} strokeWidth={6} />
      <text y={14} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{texto}</text></g>}
  </g>;
}
// Esporas que vuelan hacia un escudo y rebotan. (x0, y0) de dónde salen; (cx, cy, rx, ry) el escudo.
function Rebotes({ T, t0, t1, x0, y0, cx, cy, rx, ry, n = 6, per = 1.4, color = '#9fe07a' }) {
  if (T < t0 || T > t1) return null;
  return <g>{Array.from({ length: n }, (_, i) => {
    const u = ((T - t0) / per + i / n) % 1, ang = Math.PI + (i - n / 2) * 0.22;
    const hx = cx + Math.cos(ang) * rx, hy = cy + Math.sin(ang) * ry;
    const sx = x0 + (i % 3) * 30, sy = y0 + i * 40 - 100;
    let px, py, o = 1;
    if (u < 0.55) { const v = u / 0.55; px = klerp(sx, hx, v); py = klerp(sy, hy, v); }
    else { const v = (u - 0.55) / 0.45; px = hx - v * 160; py = hy + v * v * 260 - v * 60; o = 1 - v; }
    return <g key={i} opacity={o * kprog(T, t0, t0 + 0.3) * (1 - kprog(T, t1 - 0.3, t1))}>
      <ellipse cx={px} cy={py} rx={13} ry={9} fill={color} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 40} ${px} ${py})`} />
      {u > 0.55 && u < 0.62 && <circle cx={hx} cy={hy} r={26} fill="none" stroke="#fff" strokeWidth={5} />}
    </g>;
  })}</g>;
}
function Sol({ x, y, r = 70, T }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 20})`}>
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={r + 14} x2={0} y2={r + 44} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Nube({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 30 Q -130 -20 -70 -26 Q -60 -80 0 -70 Q 50 -100 80 -40 Q 140 -40 120 30 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Caja Petri chica de la colección: viva = colonia de color; apagada = gris.
function Caja14({ x, y, r = 34, viva = 1, color = '#fff2c4', seed = 1, flash = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 6} fill="rgba(255,255,255,.12)" stroke={flash > 0 ? KC.red : '#8892a6'} strokeWidth={flash > 0 ? 6 : 4} />
    <circle r={r} fill={mixHex('#2a3142', '#3b4458', viva)} />
    {viva > 0.02 && <g opacity={viva}><Colonia cx={0} cy={0} r={r * 0.72} color={color} seed={seed} /></g>}
  </g>;
}
// Sello con texto largo (HIPÓTESIS) que cae con golpe.
function Sello14({ T, at, x, y, texto, color = KC.red, r = 130, rot = -12 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), tam = Math.min(r * 0.62, (r * 1.7) / (texto.length * 0.52));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <circle r={r} fill="rgba(255,255,255,.55)" stroke={color} strokeWidth={14} />
    <circle r={r - 20} fill="none" stroke={color} strokeWidth={5} />
    <text y={tam * 0.35} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}
// Levadura (Candida auris): células ovaladas, algunas con yema.
function Levadura({ x, y, s = 1, rot = 0, yema = 0, T = 0, seed = 1 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.5 + seed) * 4}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={46} ry={34} fill="#f3e6c4" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-6} cy={-4} rx={16} ry={12} fill="#d9c48f" />
    {yema > 0 && <ellipse cx={46 + 14 * yema} cy={-10} rx={22 * yema} ry={17 * yema} fill="#f3e6c4" stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
// Globo terráqueo esquemático.
function Globo({ x, y, r = 220, calor = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={mixHex('#3fa9f5', '#e5743a', calor * 0.5)} stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${-r * 0.6} ${-r * 0.5} Q ${-r * 0.2} ${-r * 0.8} ${r * 0.1} ${-r * 0.45} Q ${-r * 0.05} ${-r * 0.1} ${-r * 0.35} ${r * 0.05} Q ${-r * 0.7} ${-r * 0.1} ${-r * 0.6} ${-r * 0.5} Z`} fill={mixHex('#5fd16a', '#c9a33c', calor)} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${r * 0.25} ${-r * 0.1} Q ${r * 0.7} ${-r * 0.2} ${r * 0.65} ${r * 0.3} Q ${r * 0.4} ${r * 0.7} ${r * 0.2} ${r * 0.4} Q ${r * 0.05} ${r * 0.1} ${r * 0.25} ${-r * 0.1} Z`} fill={mixHex('#5fd16a', '#c9a33c', calor)} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-r * 0.4} cy={-r * 0.45} rx={r * 0.18} ry={r * 0.08} fill="#fff" opacity=".35" transform={`rotate(-30 ${-r * 0.4} ${-r * 0.45})`} />
  </g>;
}
// Mamíferos (siluetas) para la hipótesis.
function Raton({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 Q -80 -60 -10 -62 Q 50 -62 70 -20 L 90 -14 L 70 0 Z" fill="#b9b2c9" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={20} cy={-62} r={20} fill="#e9b7c9" stroke={KC.ink} strokeWidth={5} /><circle cx={56} cy={-26} r={5} fill={KC.ink} />
    <path d="M -70 -10 Q -120 -20 -130 20" fill="none" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Perro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-110} width={150} height={70} rx={34} fill="#d79a5b" stroke={KC.ink} strokeWidth={6} />
    {[-76, -40, 10, 40].map((lx, i) => <rect key={i} x={lx} y={-50} width={20} height={50} rx={8} fill="#d79a5b" stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={74} cy={-130} r={40} fill="#d79a5b" stroke={KC.ink} strokeWidth={6} />
    <path d="M 52 -160 Q 34 -130 46 -104" fill="#9a6232" stroke={KC.ink} strokeWidth={5} />
    <circle cx={88} cy={-136} r={6} fill={KC.ink} /><circle cx={112} cy={-124} r={8} fill={KC.ink} />
    <path d="M -90 -96 Q -120 -130 -112 -150" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Glóbulo blanco (defensas): célula con núcleo en lóbulos.
function Globulo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={34} fill="#dfe9ff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -16 -6 Q -18 -20 -4 -16 Q 6 -24 14 -12 Q 24 -2 12 6 Q 4 18 -8 10 Q -22 10 -16 -6 Z" fill="#6c63d9" />
  </g>;
}

// Umbrales de las 50 cajas (esquema del 6 % por grado): 10 se apagan entre 25 y 30 °C, 3 por cada grado de 31 a 40, y 10 siguen.
const CAJAS14 = (() => {
  const g = krng(14), umb = [];
  for (let i = 0; i < 10; i++) umb.push(25.5 + i * 0.45);
  for (let j = 0; j < 30; j++) umb.push(30.5 + Math.floor(j / 3));
  for (let i = 0; i < 10; i++) umb.push(99);
  for (let i = umb.length - 1; i > 0; i--) { const k = Math.floor(g() * (i + 1)); [umb[i], umb[k]] = [umb[k], umb[i]]; }
  const cols = ['#fff2c4', '#c8f0a8', '#ffd0e0', '#d6e6ff', '#ffe08a'];
  return umb.map((u, i) => ({ u, x: 112 + (i % 10) * 95, y: 760 + Math.floor(i / 10) * 88, c: cols[Math.floor(g() * cols.length)], seed: i + 3 }));
})();

function CalorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Hm: CUES.Hormiga, Tu: CUES.Tu, Ho: CUES.Hongos, P: CUES.Pregunta, E: CUES.Estudio, R: CUES.Resultado, Gr: CUES.Grado, F: CUES.Fiebre, Hi: CUES.Hipotesis, A: CUES.Auris, Cl: CUES.Clima, D: CUES.Defensas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // temperatura de la "incubadora" (escena de las cajas)
  let temp = 25;
  if (T >= K.R) temp = klerp(25, 37, kprog(T, K.R + 0.2, K.R + 1.4, kEase.suave));
  if (T >= K.Gr) {
    temp = klerp(37, 30, kprog(T, K.Gr, K.Gr + 0.6, kEase.suave));
    if (T >= K.Gr + 0.8) temp = Math.min(40, 30 + Math.floor((T - K.Gr - 0.8) / 0.35) + 1);
  }
  if (T >= K.F) { temp = klerp(40, 37, kprog(T, K.F, K.F + 0.5, kEase.suave)); if (T >= K.F + 0.8) temp = Math.min(39, 37 + Math.floor((T - K.F - 0.8) / 0.45) + 1); }
  const vivas = CAJAS14.filter((c) => c.u > temp).length;
  const fT = (t) => (t - 24) / (41 - 24);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la hormiga con su hongo zombi y tú con tu escudo de calor */}
      <Escena T={T} a={K.G} b={K.Hm} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>{DEFS14}
          <rect x={0} y={1180} width={KW} height={800} fill="#7a4a2b" stroke={KC.ink} strokeWidth={8} />
          <Hormiga14 T={T} x={klerp(230, 300, kprog(T, K.G, K.G + 2.4, kEase.sale))} y={1112} s={1.3} paso={T * 1.6} camina={1 - kprog(T, K.G + 2.2, K.G + 2.6)} hilos={kprog(T, K.G + 0.2, K.G + 1.4)} />
          <Gente x={790} y={1180} s={1.3} brillo={kprog(T, K.G + 1.6, K.G + 2.4)} T={T} />
          <EscudoCalor T={T} cx={790} cy={960} rx={250} ry={380} p={kprog(T, K.G + 2.2, K.G + 3.0, kEase.rebote)} />
          <Rebotes T={T} t0={K.G + 3.0} t1={K.Hm + 0.3} x0={60} y0={640} cx={790} cy={960} rx={250} ry={380} n={5} />
        </>)}
      </Escena>
      {/* 1 · la hormiga toma su calor de afuera */}
      <Escena T={T} a={K.Hm} b={K.Tu} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {(() => { const nx = klerp(-200, 520, kprog(T, K.Hm + 0.3, K.Hm + 2.6)); const sombra = kclamp(1 - Math.abs(nx - 260) / 220, 0, 1);
          return fsvg(<>
            <Sol x={260} y={640} T={T} />
            <Nube x={nx} y={650} s={1.1} />
            <path d="M -20 1170 Q 400 1080 1100 1020" fill="none" stroke="#2f7a2c" strokeWidth={30} strokeLinecap="round" />
            <path d="M 700 1050 Q 880 900 1060 960 Q 900 1080 700 1050 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
            <Hormiga14 T={T} x={430} y={1050} s={1.0} paso={T * 1.4} camina={0.8} />
            <Termo x={860} y={820} alto={420} f={0.35 + 0.3 * (1 - sombra) * kprog(T, K.Hm, K.Hm + 0.6)} color={KC.red} />
          </>); })()}
      </Escena>
      {/* 2 · tú: 37 °C de día y de noche */}
      <Escena T={T} a={K.Tu} b={K.Ho} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{DEFS14}
          <Sol x={170} y={760} r={56} T={T} />
          <Nube x={klerp(-120, 420, kprog(T, K.Tu, K.Tu + 2.6))} y={770} s={0.9} />
          <Gente x={470} y={1190} s={1.12} brillo={1} T={T} />
          <Termo x={860} y={1120} alto={460} f={kprog(T, K.Tu, K.Tu + 0.8, kEase.sale) * fT(37) * 1.0} color={KC.orange} marcas={[[fT(37), '37']]} />
        </>)}
      </Escena>
      {/* 3 · los hongos crecen a temperatura ambiente; a 37 °C, pocos */}
      <Escena T={T} a={K.Ho} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {(() => { const w = kprog(T, K.Ho + 1.9, K.Ho + 3.0, kEase.suave), crece = kprog(T, K.Ho, K.Ho + 1.2);
          const somb = ['#c98b2b', '#e8336d', '#f3e6c4', '#8a5a2b', '#b18cff', '#ff8a1f'];
          return fsvg(<>
            <rect x={0} y={1120} width={KW} height={900} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
            <rect x={0} y={560} width={KW} height={560} fill={KC.orange} opacity={w * 0.35} />
            {somb.map((c, i) => { const vive = i === 3; const ww = vive ? 0 : w;
              return <Seta key={i} x={130 + i * 165} y={1120} s={1.15 - ww * 0.35} crece={crece * (1 - ww * 0.4)} rot={(i % 2 ? 1 : -1) * 38 * ww + mece(T, i, 0.4) * 2} sombrero={mixHex(c, '#8d8d8d', ww)} pie={mixHex('#f3e6c4', '#9a9a9a', ww)} escamas={i % 2 === 0} anillo={i !== 2} />; })}
          </>); })()}
      </Escena>
      {/* 4 · re-gancho */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={280} y={1080} /><Termo x={300} y={1150} alto={300} f={fT(37)} s={0.6} color={KC.orange} /></>)}
      </Escena>
      {/* 5–8 · la colección: 50 cajas como esquema de 4 802 cepas */}
      <Escena T={T} a={K.E} b={K.Hi} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {CAJAS14.map((c, i) => { const on = kprog(T, K.E + 2.6 + i * 0.03, K.E + 2.9 + i * 0.03, kEase.rebote); if (on <= 0) return null;
            const viva = c.u > temp ? 1 : 0; const recien = T >= K.R && c.u <= temp && c.u > temp - 1 && T > K.Gr + 0.8 ? 1 : 0;
            return <g key={i} transform={`translate(${c.x} ${c.y}) scale(${on}) translate(${-c.x} ${-c.y})`}><Caja14 x={c.x} y={c.y} viva={viva} color={c.c} seed={c.seed} flash={recien} /></g>; })}
          {T > K.R - 0.2 && <g opacity={kprog(T, K.R - 0.2, K.R + 0.2)}>
            <rect x={90} y={612} width={560} height={40} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            {T > K.F && <rect x={90 + 560 * (38 - 24) / 17} y={606} width={560 * 2 / 17} height={52} rx={10} fill={KC.red} opacity={0.45 * kprog(T, K.F + 0.6, K.F + 1.0)} />}
            {T > K.F && <text x={90 + 560 * (39 - 24) / 17} y={598} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.red} opacity={kprog(T, K.F + 0.6, K.F + 1.0)}>fiebre</text>}
            <rect x={98} y={620} width={(544) * kclamp((temp - 24) / 17, 0, 1)} height={24} rx={12} fill={KC.orange} />
            {[25, 30, 35, 40].map((t) => <g key={t}><line x1={90 + 560 * (t - 24) / 17} y1={652} x2={90 + 560 * (t - 24) / 17} y2={676} stroke="#fff" strokeWidth={4} />
              <text x={90 + 560 * (t - 24) / 17} y={706} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">{t}</text></g>)}
          </g>}
        </>)}
        {T > K.R - 0.2 && <div style={{ position:'absolute', left:90, top:530, zIndex:41, font:`400 64px ${KF.titulo}`, color:KC.gold2, textShadow:KSOMBRA, opacity:kprog(T, K.R - 0.2, K.R + 0.2) }}>{kformato(temp, 0)} °C</div>}
        {T > K.E + 2.6 && <div style={{ position:'absolute', right:60, bottom:470, zIndex:41, font:`700 30px ${KF.mono}`, color:'#fff', textShadow:KSOMBRA }}>esquema · siguen creciendo: {vivas} de 50</div>}
      </Escena>
      {/* 9 · hipótesis: la sangre caliente */}
      <Escena T={T} a={K.Hi} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>{DEFS14}
          <rect x={0} y={1180} width={KW} height={800} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={640} cy={1120} rx={170} ry={110} fill="url(#calorBrillo)" opacity={0.9} />
          <Raton x={640} y={1180} s={1.2} />
          <ellipse cx={880} cy={1020} rx={210} ry={200} fill="url(#calorBrillo)" opacity={kprog(T, K.Hi + 0.6, K.Hi + 1.2)} />
          {T > K.Hi + 0.6 && <Perro x={850} y={1180} s={1.3 * kprog(T, K.Hi + 0.6, K.Hi + 1.1, kEase.rebote)} />}
          <Rebotes T={T} t0={K.Hi + 1.0} t1={K.A + 0.3} x0={980} y0={760} cx={820} cy={1080} rx={-200} ry={150} n={5} />
          <Sello14 T={T} at={K.Hi + 1.6} x={790} y={700} texto="HIPÓTESIS" color={KC.violet} r={130} />
        </>)}
      </Escena>
      {/* 10 · Candida auris (micro, fondo oscuro) */}
      <Escena T={T} a={K.A} b={K.Cl} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          {[[300, 820, 1.2, 10, 1], [470, 900, 1.0, -20, 0], [360, 1010, 1.1, 30, 1], [180, 960, 0.9, -40, 0], [540, 1060, 1.0, 5, 1], [250, 700, 0.85, 50, 0], [480, 740, 0.95, -10, 0]].map(([x, y, s, r, b], i) =>
            <Levadura key={i} x={x * 1.1 - 20} y={y * 1.15 - 120} s={1.6 * s * kprog(T, K.A + 0.2 + i * 0.12, K.A + 0.6 + i * 0.12, kEase.rebote)} rot={r} yema={b ? kprog(T, K.A + 1.4, K.A + 3.0) : 0} T={T} seed={i} />)}
          <Termo x={860} y={1130} alto={440} f={kprog(T, K.A + 0.5, K.A + 1.6, kEase.sale) * fT(40)} color={KC.red} marcas={[[fT(37), '37'], [fT(40), '40']]} />
        </>)}
      </Escena>
      {/* 11 · ¿el calentamiento global la hizo adaptarse? (hipótesis) */}
      <Escena T={T} a={K.Cl} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Globo x={420} y={960} r={220} calor={kprog(T, K.Cl + 2.4, K.Cl + 4.4)} T={T} />
          <Termo x={830} y={1150} alto={420} f={klerp(0.35, 0.8, kprog(T, K.Cl + 2.4, K.Cl + 4.4))} color={KC.red} />
          {[0, 1, 2].map((i) => { const u = (T * 0.8 + i / 3) % 1; return <path key={i} d="M 0 30 L 0 -30 M -18 -12 L 0 -30 L 18 -12" transform={`translate(${200 + i * 220} ${1210 - u * 80})`} stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={(1 - u) * kprog(T, K.Cl + 2.4, K.Cl + 2.8)} />; })}
          <Sello14 T={T} at={K.Cl + 3.2} x={640} y={700} texto="HIPÓTESIS" color={KC.violet} r={130} rot={10} />
        </>)}
      </Escena>
      {/* 12 · el escudo doble: calor y defensas */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>{DEFS14}
          <Gente x={440} y={1180} s={1.05} brillo={1} T={T} />
          <EscudoCalor T={T} cx={440} cy={1000} rx={250} ry={320} p={kprog(T, K.D + 0.3, K.D + 1.0, kEase.rebote)} />
          {Array.from({ length: 7 }, (_, i) => { const a = T * 0.9 + i * (Math.PI * 2 / 7), on = kprog(T, K.D + 1.6 + i * 0.1, K.D + 2.0 + i * 0.1, kEase.rebote);
            return on > 0 ? <Globulo key={i} x={440 + Math.cos(a) * 190} y={1000 + Math.sin(a) * 250} s={on} /> : null; })}
          <Rebotes T={T} t0={K.D + 2.4} t1={K.C + 0.3} x0={980} y0={700} cx={440} cy={1000} rx={-250} ry={320} n={4} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma imagen del inicio, ya con el escudo completo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>{DEFS14}
          <rect x={0} y={1180} width={KW} height={800} fill="#7a4a2b" stroke={KC.ink} strokeWidth={8} />
          <Hormiga14 T={T} x={300} y={1112} s={1.3} paso={T * 1.6} camina={0.5} hilos={1} />
          <Gente x={790} y={1180} s={1.3} brillo={1} T={T} />
          <EscudoCalor T={T} cx={790} cy={960} rx={250} ry={380} p={1} texto="37 °C" />
          {Array.from({ length: 5 }, (_, i) => { const a = T * 0.9 + i * (Math.PI * 2 / 5); return <Globulo key={i} x={790 + Math.cos(a) * 200} y={960 + Math.sin(a) * 300} s={0.7 * kprog(T, K.C + 0.6 + i * 0.1, K.C + 1.0 + i * 0.1, kEase.rebote)} />; })}
          <Rebotes T={T} t0={K.C + 1.0} t1={FIN} x0={60} y0={640} cx={790} cy={960} rx={250} ry={380} n={5} />
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.2} until={K.Hm - 0.3} x={60} y={820} texto="hongo zombi" color={KC.ink} tam={32} />
      <Etq T={T} at={K.G + 1.6} until={K.Hm - 0.3} x={60} y={870} texto="Ophiocordyceps" it color={KC.ink} tam={32} />
      <Chip T={T} at={K.G + 2.8} until={K.Hm - 0.3} texto="tu calor: un escudo" x={330} y={520} tam={40} borde={KC.orange} />
      <Etq T={T} at={K.Hm + 0.5} until={K.Tu - 0.3} x={70} y={920} texto="hormiga carpintera" color={KC.ink} tam={32} />
      <Etq T={T} at={K.Hm + 0.9} until={K.Tu - 0.3} x={70} y={970} texto="Camponotus" it color={KC.ink} tam={32} />
      <Chip T={T} at={K.Hm + 1.0} until={K.Tu - 0.3} texto="su calor viene de afuera" x={440} y={470} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Tu + 0.3} until={K.Ho - 0.3} valor={37} desde={30} dur={0.8} sufijo=" °C" etiqueta="tú, todo el día" x={380} y={500} tam={190} color={KC.orange} />
      <Chip T={T} at={K.Ho + 0.4} until={K.Ho + 1.9} texto="temperatura ambiente: crecen" x={460} y={470} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Ho + 2.1} until={K.P - 0.3} texto="a 37 °C: pocos" x={420} y={470} tam={46} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.5} anio="2009" quien="colección de Utrecht, Países Bajos" revista="Robert y Casadevall · J Infect Dis" x={500} y={600} />
      <NumeroGigante T={T} at={K.E + 2.7} until={K.R - 0.2} valor={4802} desde={0} dur={1.4} sufijo="" etiqueta="cepas de hongos" x={420} y={500} tam={130} color={KC.gold2} />
      <Chip T={T} at={K.R + 1.4} until={K.Gr - 0.3} texto="a 37 °C: la mayoría no crece" x={430} y={440} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.Gr + 1.0} until={K.F - 0.3} texto="cada grado: −6 % más" x={420} y={440} tam={40} borde={KC.red} />
      <Chip T={T} at={K.F + 0.9} until={K.Hi - 0.3} texto="fiebre: ¿más escudo?" x={420} y={440} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Hi + 0.4} until={K.A - 0.3} texto="sangre caliente = defensa" x={720} y={470} tam={34} borde={KC.violet} />
      <Etq T={T} at={K.A + 0.8} until={K.Cl - 0.3} x={60} y={470} texto="levadura" tam={32} />
      <Etq T={T} at={K.A + 1.1} until={K.Cl - 0.3} x={60} y={525} texto="Candida auris" it tam={36} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Cl + 0.2} until={K.Cl + 2.3} anio="2019" quien="Casadevall y col." revista="mBio" x={360} y={580} />
      <Chip T={T} at={K.Cl + 2.6} until={K.D - 0.3} texto="¿se adaptó al calor?" x={400} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.D + 1.0} until={K.C - 0.3} x={705} y={770} texto="calor" tam={34} color={KC.ink} />
      <Etq T={T} at={K.D + 2.0} until={K.C - 0.3} x={705} y={850} texto="defensas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.D + 3.0} until={K.C - 0.3} texto="infecciones graves: raras" x={400} y={470} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="el zombi: cosa de hormigas" x={380} y={470} tam={36} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Hm} texto="hormiga ≈ 1 cm (no a escala)" largo={300} />
      <BarraEscala T={T} at={K.Hm} until={K.Tu} texto="1 cm" largo={290} />
      <BarraEscala T={T} at={K.Tu} until={K.Ho} texto="50 cm" largo={190} />
      <BarraEscala T={T} at={K.Ho} until={K.E} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.E} until={K.Hi} texto="10 cm" largo={78} />
      <BarraEscala T={T} at={K.Hi} until={K.A} texto="10 cm" largo={120} />
      <BarraEscala T={T} at={K.A} until={K.Cl} texto="5 µm" largo={180} />
      <BarraEscala T={T} at={K.Cl} until={K.D} texto="5 000 km" largo={170} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="50 cm" largo={180} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="hormiga ≈ 1 cm (no a escala)" largo={300} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Hm - 0.1} texto="Tu calor frena *a la mayoría* de los hongos." />
      <Subtitulo T={T} idx={1} at={K.Hm + 0.1} until={K.Tu - 0.1} texto="La hormiga toma su calor *de afuera.*" />
      <Subtitulo T={T} idx={2} at={K.Tu + 0.1} until={K.Ho - 0.1} texto="Tú vives cerca de *37 grados.*" />
      <Subtitulo T={T} idx={3} at={K.Ho + 0.1} until={K.P - 0.1} texto="A 37 grados, *crecen pocos.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuántos frena *tu calor?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="2009: datos de *4 802 cepas.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Gr - 0.1} texto="A 37 °C, la mayoría *no crece.*" />
      <Subtitulo T={T} idx={7} at={K.Gr + 0.1} until={K.F - 0.1} texto="Cada grado: *otro 6 %* fuera." />
      <Subtitulo T={T} idx={8} at={K.F + 0.1} until={K.Hi - 0.1} texto="La fiebre *podría excluir más.*" />
      <Subtitulo T={T} idx={9} at={K.Hi + 0.1} until={K.A - 0.1} texto="Hipótesis: *sangre caliente* como defensa." />
      <Subtitulo T={T} idx={10} at={K.A + 0.1} until={K.Cl - 0.1} texto="Candida auris *crece a 40 °C.*" />
      <Subtitulo T={T} idx={11} at={K.Cl + 0.1} until={K.D - 0.1} texto="¿El calentamiento? *Otra hipótesis.*" />
      <Subtitulo T={T} idx={12} at={K.D + 0.1} until={K.C - 0.1} texto="Escudo doble: *calor y defensas.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu escudo: *37 grados.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Tu + 0.2, K.Ho - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.3, K.Gr - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.F + 0.2, K.Hi - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Hi + 0.4, K.A - 0.2, 'avatar_06_pensativo_menton', 'grande-izq'],
        [K.A + 0.3, K.Cl + 2.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.D + 0.4, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CalorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CalorShot /></CompositionStage></div>;
}
window.CalorApp = CalorApp;
