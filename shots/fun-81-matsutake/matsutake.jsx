// Shot Fungi Mati #81 · Este hongo blanco no es un champiñón: viaja de México a Japón — NARRADO (N1 Por dentro + número de Japón).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Todos los textos en pantalla están en TXT (abajo) para cambiarlos fácil tras la verificación.

const TXT = {
  ganchoEtq: 'matsutake mexicano', champi: 'champiñón', aJapon: 'rumbo a Japón',
  nombres: ['hongo blanco', 'hongo blanco de ocote', 'hongo canela'], olor: 'olor especiado',
  especie: 'Tricholoma mesoamericanum', especieChip: 'descrito en 2017 · solo en México',
  primo: 'Tricholoma matsutake', primoChip: 'su primo de Japón', pinoRojo: 'pino rojo japonés',
  numEtq: 'cosecha de Japón al año', numChip: 'inicios de los años 40', arroz: 'arroz con matsutake',
  escEtq: 'en 2020: menos de', escChip1: 'marchitamiento del pino (nematodo)', escChip2: 'bosques sin manejo',
  expChip: 'desde 1985 · empresas japonesas', mexico: 'México', japon: 'Japón',
  dentro: 'BAJO TIERRA · ECTOMICORRIZA', raiz: 'raíz de pino', manto: 'hifas que la envuelven',
  agua: 'agua y minerales → pino', azucar: 'azúcar → hongo',
  cultivo: 'cultivo: casi sin éxito', cultivo2: 'el micelio crece; el hongo, no', frasco: 'micelio en frasco',
  estAnio: '2015', estQuien: 'Cofre de Perote, Veracruz', estRev: '~100 alumnos de telesecundaria · Ciencias UNAM, 2019',
  takechi: '¡TAKECHI!', takechiChip: 'nombre local: takechi', tele: 'Señorita Cometa · Canal 5', takeshi: '«Takeshi» → «takechi»',
  cuidado: 'rastrillar expone y mata el micelio', micelio: 'micelio',
  cierre: 'vive aquí: abrazado a un pino', lupa: 'POR DENTRO · MICORRIZA',
};

const MT = { blanco:'#f6f1e6', crema:'#efe4cc', sombra:'#d8c7a6', escama:'#a8723f', escama2:'#7d4f2a', lam:'#efe7d4',
  aguja:'#5a7a2a', aguja2:'#a0782e', tierra:'#6b4426', tierra2:'#4a2e18', corteza:'#7a4a22', cortezaR:'#b5532c', hoja:'#4e9a3a', hoja2:'#3a7d2c',
  hifa:'#fff4d6', aguaC:'#5cc8ff', azucarC:'#ffd43b' };

// Subtítulo con *dorado* y _cursiva_ (los nombres científicos van en cursiva también en el subtítulo).
function SubM({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, ita = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: ita ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Matsutake (Tricholoma mesoamericanum), de perfil. Base del pie en (x, y) = nivel del suelo.
// abre 0 = botón (sombrero cerrado, velo blanco unido al pie) → 1 = adulto (sombrero convexo con escamas pardas, anillo, pie con escamas).
// sombrero/escama permiten dibujar al primo japonés (T. matsutake, sombrero pardo).
function Matsutake({ x, y, s = 1, abre = 1, crece = 1, rot = 0, sombrero = MT.blanco, escama = MT.escama, pie = MT.blanco, seed = 3 }) {
  if (crece <= 0) return null;
  const a = kclamp(abre, 0, 1), c = kEase.sale(kclamp(crece, 0, 1));
  const D = klerp(150, 270, a), H = klerp(78, 160, a) * c, sw = klerp(78, 82, a), sb = klerp(70, 62, a);
  const capH = D * klerp(0.5, 0.3, a), y0 = -H;            // y0 = donde el sombrero se une al pie
  const mg = klerp(26, 4, a);                                // margen enrollado hacia abajo (botón)
  const g = krng(seed);
  const esc = Array.from({ length: 26 }, () => [g() * 2 - 1, g() * 0.95 + 0.05, 0.6 + g() * 0.8]);
  const escPie = Array.from({ length: 10 }, () => [g() * 2 - 1, g()]);
  const ringY = y0 + H * 0.28;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {/* pie grueso, se adelgaza hacia abajo */}
    <path d={`M ${-sb / 2} 30 C ${-sb / 2 - 6} ${-H * 0.3}, ${-sw / 2 - 4} ${-H * 0.7}, ${-sw / 2} ${y0} L ${sw / 2} ${y0} C ${sw / 2 + 4} ${-H * 0.7}, ${sb / 2 + 6} ${-H * 0.3}, ${sb / 2} 30 Z`} fill={pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* escamas pardas del pie (debajo del anillo), solo en el adulto */}
    {a > 0.3 && escPie.map(([u, v], i) => <path key={i} d={`M ${u * sw * 0.36} ${ringY + 16 + v * (H * 0.62)} l 9 6 l -14 3 Z`} fill={escama} opacity={kprog(a, 0.3, 0.8) * 0.9} />)}
    {/* velo: en el botón une el borde del sombrero con el pie; en el adulto queda como anillo */}
    {a < 0.65 && <path d={`M ${-D / 2 + 10} ${y0 + mg} Q ${-sw / 2 - 6} ${y0 + mg + 16} ${-sw / 2} ${y0 + mg + 24} L ${sw / 2} ${y0 + mg + 24} Q ${sw / 2 + 6} ${y0 + mg + 16} ${D / 2 - 10} ${y0 + mg} Z`} fill="#fbf8f1" stroke={KC.ink} strokeWidth={4} opacity={1 - kprog(a, 0.4, 0.65)} />}
    {a > 0.4 && <path d={`M ${-sw / 2 - 8} ${ringY} Q 0 ${ringY + 22} ${sw / 2 + 8} ${ringY} L ${sw / 2 + 2} ${ringY - 14} Q 0 ${ringY - 4} ${-sw / 2 - 2} ${ringY - 14} Z`} fill="#fbf8f1" stroke={KC.ink} strokeWidth={4} opacity={kprog(a, 0.4, 0.7)} />}
    {/* láminas (se ven al abrir) */}
    {a > 0.45 && <path d={`M ${-D / 2 + 6} ${y0 + mg - 2} Q 0 ${y0 + mg + D * 0.08} ${D / 2 - 6} ${y0 + mg - 2}`} fill={MT.lam} stroke={KC.ink} strokeWidth={4} opacity={kprog(a, 0.45, 0.7)} />}
    {/* sombrero: convexo, con el margen enrollado en el botón */}
    <path d={`M ${-D / 2} ${y0 + mg} C ${-D / 2 - 4} ${y0 - capH * 0.9}, ${-D * 0.25} ${y0 - capH * 1.25}, 0 ${y0 - capH * 1.25} C ${D * 0.25} ${y0 - capH * 1.25}, ${D / 2 + 4} ${y0 - capH * 0.9}, ${D / 2} ${y0 + mg} Q 0 ${y0 + mg - D * 0.05} ${-D / 2} ${y0 + mg} Z`}
      fill={sombrero} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* escamitas fibrosas pardas, más densas al centro, que aparecen al madurar */}
    {esc.map(([u, v, k], i) => { const yy = y0 - capH * (0.15 + 0.95 * v) + 4, xx = u * D * 0.46 * Math.sqrt(1 - v * 0.75); const o = (0.25 + 0.75 * a) * (0.5 + 0.5 * v);
      return <path key={i} d={`M ${xx - 7 * k} ${yy} q ${7 * k} ${-6 * k} ${15 * k} ${1} q ${-7 * k} ${4 * k} ${-15 * k} ${-1} Z`} fill={i % 3 ? escama : MT.escama2} opacity={o} />; })}
    <path d={`M ${-D * 0.3} ${y0 - capH * 0.85} Q ${-D * 0.08} ${y0 - capH * 1.12} ${D * 0.12} ${y0 - capH * 1.05}`} stroke="#fff" strokeWidth={9} fill="none" opacity=".55" strokeLinecap="round" />
  </g>;
}

// Capa de acículas de pino (en pares) sobre el suelo, de x0 a x1 a la altura y. tapa = cuánto se han ido (0..1, se las lleva el viento a la izq).
function Aciculas({ x0 = 0, x1 = KW, y, n = 120, seed = 7, tapa = 0, color = MT.aguja2 }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const xx = klerp(x0, x1, g()), yy = y + g() * 34 - 6, an = g() * 50 - 25, L = 40 + g() * 40, d = g();
    const off = tapa * (300 + d * 500); if (tapa > 0 && Math.abs(xx - 400) < 160 && d < tapa * 1.2) return null;
    return <g key={i} transform={`translate(${xx - off} ${yy}) rotate(${an})`} opacity={1 - tapa * 0.2}>
      <line x1={0} y1={0} x2={L} y2={-3} stroke={i % 4 ? color : MT.aguja} strokeWidth={4} strokeLinecap="round" />
      <line x1={0} y1={0} x2={L * 0.9} y2={6} stroke={i % 4 ? color : MT.aguja} strokeWidth={4} strokeLinecap="round" />
    </g>; })}</g>;
}

// Suelo de bosque: franja de tierra desde y hasta el fondo de la pantalla.
function SueloBosque({ y = 1180, color = MT.tierra }) {
  return <g><rect x={-40} y={y} width={KW + 80} height={KH - y + 40} fill={color} />
    <path d={`M -40 ${y} Q 270 ${y - 14} 540 ${y} T 1120 ${y}`} fill={color} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={(i * 137) % KW} cy={y + 60 + (i * 53) % 400} r={6 + (i % 4) * 3} fill={MT.tierra2} opacity=".6" />)}
  </g>;
}

// Pino (de perfil): tronco alto y penachos de acículas. seca 0..1 = las acículas se vuelven color óxido (marchitamiento).
function Pino({ x, y, s = 1, T = 0, seed = 1, corteza = MT.corteza, seca = 0, alto = 820 }) {
  const g = krng(seed), v1 = mixHex('#2f8f3a', '#b9652a', seca), v2 = mixHex('#49b04f', '#d98a3c', seca);
  const pen = Array.from({ length: 7 }, (_, i) => [(g() - 0.5) * 300 * (0.5 + i / 9), -alto * (0.42 + i * 0.085), 110 - i * 9 + g() * 30]);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.3) * 0.8})`}>
    <path d={`M -34 0 L -16 ${-alto} L 16 ${-alto} L 34 0 Z`} fill={corteza} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.2, 0.4, 0.6, 0.8].map((k, i) => <path key={i} d={`M -20 ${-alto * k} l 14 -12 M 6 ${-alto * k + 30} l 12 -10`} stroke={KC.ink} strokeWidth={3} opacity=".5" />)}
    {pen.map(([px, py, r], i) => <g key={i}>
      <line x1={0} y1={py + 30} x2={px * 0.8} y2={py + 6} stroke={corteza} strokeWidth={14} strokeLinecap="round" />
      {[0, 1].map((capa) => Array.from({ length: 15 }, (_, k) => { const an = Math.PI * (1.05 + (k / 14) * 0.9), L = r * (0.75 + ((k * 7) % 5) * 0.08);
        return <line key={capa + '-' + k} x1={px} y1={py + r * 0.18} x2={px + Math.cos(an) * L} y2={py + r * 0.18 + Math.sin(an) * L * 0.62} stroke={capa ? (k % 2 ? v2 : v1) : KC.ink} strokeWidth={capa ? 7 : 12} strokeLinecap="round" />; }))}
      {[0, 1].map((capa) => Array.from({ length: 9 }, (_, k) => { const an = Math.PI * (0.15 + (k / 8) * 0.7), L = r * 0.55;
        return <line key={'b' + capa + '-' + k} x1={px} y1={py + r * 0.18} x2={px + Math.cos(an) * L} y2={py + r * 0.18 + Math.sin(an) * L * 0.5} stroke={capa ? v1 : KC.ink} strokeWidth={capa ? 7 : 12} strokeLinecap="round" />; }))}
    </g>)}
  </g>;
}

// Encino (de perfil): copa redondeada.
function Encino({ x, y, s = 1, T = 0, seed = 4 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.25) * 0.6})`}>
    <path d="M -30 0 Q -20 -180 -10 -300 L 10 -300 Q 20 -180 30 0 Z" fill={MT.corteza} stroke={KC.ink} strokeWidth={6} />
    {[[-90, -330, 120], [70, -350, 130], [0, -440, 140], [-120, -430, 100], [130, -450, 100]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? MT.hoja : MT.hoja2} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}

// Avioncito de papel. (x, y) centro; ang en grados.
function Avion({ x, y, ang = -15, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 60 0 L -50 -34 L -24 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 60 0 L -24 0 L -40 26 Z" fill="#dfe8f2" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}

// Tazón de arroz con rebanadas de matsutake (esquemático).
function Tazon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-60} rx={140} ry={44} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 24 }, (_, i) => <ellipse key={i} cx={-110 + (i * 37) % 220} cy={-70 + (i * 13) % 24} rx={9} ry={5} fill="#f2ead8" stroke="#cfc3a8" strokeWidth={2} />)}
    {[[-50, -78, -20], [10, -84, 10], [60, -72, 30]].map(([a, b, r], i) => <g key={i} transform={`translate(${a} ${b}) rotate(${r})`}><path d="M -26 10 Q -28 -20 0 -24 Q 28 -20 26 10 L 12 10 L 10 26 L -10 26 L -12 10 Z" fill="#e9d6b0" stroke={KC.ink} strokeWidth={4} /></g>)}
    <path d="M -140 -60 Q -130 40 0 50 Q 130 40 140 -60 Z" fill="#2b3f8a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -100 -20 Q 0 0 100 -20" stroke="#e8a62a" strokeWidth={8} fill="none" />
  </g>;
}

// Caja de exportación (cartón) con hongos blancos envueltos en papel.
function Caja({ x, y, s = 1, llena = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-70, 0, 70].map((dx, i) => kprog(llena, i * 0.25, i * 0.25 + 0.3) > 0 && <g key={i} transform={`translate(${dx} ${-90 + (1 - kprog(llena, i * 0.25, i * 0.25 + 0.3)) * -120})`}>
      <path d="M -34 40 L -30 -20 Q 0 -44 30 -20 L 34 40 Z" fill="#fffdf6" stroke={KC.ink} strokeWidth={4} />
      <path d="M -26 -18 Q 0 -60 26 -18 Z" fill={MT.blanco} stroke={KC.ink} strokeWidth={4} />
    </g>)}
    <path d="M -130 -60 L 130 -60 L 120 60 L -120 60 Z" fill="#c8924f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -130 -60 L -150 -95 L 110 -95 L 130 -60" fill="#d9a865" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-60} y={-20} width={120} height={46} rx={6} fill="#fff4dc" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={12} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>→ JP</text>
  </g>;
}

// Silueta esquemática de Japón (Honshu + Hokkaido + Kyushu/Shikoku), ~200 px de alto.
function Japon({ x, y, s = 1, color = '#ffe9a8' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 120 -40 Q 150 -70 170 -50 Q 175 -20 150 -5 Q 125 0 120 -40 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M 128 10 Q 140 20 132 50 Q 120 90 90 120 Q 60 150 20 160 Q -10 165 -25 150 Q 0 140 30 125 Q 70 100 95 60 Q 110 30 128 10 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -40 158 Q -20 170 -30 195 Q -50 205 -58 185 Q -55 165 -40 158 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -8 170 Q 15 172 10 184 Q -5 190 -12 180 Z" fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Raíz de pino con puntas cortas en Y (las de pino se ramifican de dos en dos) envueltas por el manto de hifas. En el sistema de coordenadas local.
// manto 0..1 = cuánto las envuelve el hongo; red 0..1 = hifas que salen al suelo.
const RAIZ_PUNTAS = [[-260, 120, -150], [-150, 60, -120], [-40, 150, -170], [70, 60, -110], [170, 150, -160], [270, 70, -120]];
function RaizMicorriza({ T, x, y, s = 1, manto = 1, red = 1, flujo = 0 }) {
  const raiz = 'M -420 -40 Q -200 10 0 -10 Q 200 -30 420 20';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {red > 0 && RAIZ_PUNTAS.map(([px, py, an], i) => <RedHifas key={'h' + i} T={T} x={px} y={py + 40} g={red} seed={11 + i} n={70} escala={0.26} ancho={2.4} rot={an + 90} color={MT.hifa} />)}
    <path d={raiz} stroke="#3a2412" strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d={raiz} stroke="#b07a46" strokeWidth={34} fill="none" strokeLinecap="round" />
    {RAIZ_PUNTAS.map(([px, py], i) => { const bx = px * 0.98, by = -10 + Math.sin(px / 140) * 12; const Y = `M ${bx} ${by} L ${px} ${py - 40} M ${px} ${py - 40} L ${px - 22} ${py + 34} M ${px} ${py - 40} L ${px + 22} ${py + 34}`;
      return <g key={i}>
        <path d={Y} stroke="#3a2412" strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d={Y} stroke="#c58a52" strokeWidth={20} fill="none" strokeLinecap="round" />
        {manto > 0 && <path d={`M ${px} ${py - 30} L ${px - 22} ${py + 34} M ${px} ${py - 30} L ${px + 22} ${py + 34}`} stroke={MT.hifa} strokeWidth={22 + 6 * manto} fill="none" strokeLinecap="round" opacity={manto} style={{ filter:`drop-shadow(0 0 ${8 * manto}px #fff4d6)` }} />}
      </g>; })}
    {flujo > 0 && RAIZ_PUNTAS.map(([px, py], i) => [0, 1, 2].map((k) => { const u = ((T * 0.45 + k / 3 + i * 0.17) % 1);
      const ax = px + (i % 2 ? 1 : -1) * 150, ay = py + 210;            // lejos, en el suelo
      return <g key={i + '-' + k} opacity={flujo}>
        <circle cx={klerp(ax, px, u)} cy={klerp(ay, py, u)} r={11} fill={MT.aguaC} stroke={KC.ink} strokeWidth={3} />
        <rect x={klerp(px, ax, (u + 0.5) % 1) - 10} y={klerp(py - 40, ay, (u + 0.5) % 1) - 10} width={20} height={20} rx={4} fill={MT.azucarC} stroke={KC.ink} strokeWidth={3} transform={`rotate(45 ${klerp(px, ax, (u + 0.5) % 1)} ${klerp(py - 40, ay, (u + 0.5) % 1)})`} />
      </g>; }))}
  </g>;
}

// Frasco de laboratorio con micelio que crece pero el hongo no sale (primordio chiquito).
function FrascoLab({ T, x, y, s = 1, g = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-420} width={300} height={420} rx={40} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-130} y={-200} width={260} height={180} rx={20} fill="#c9a56a" stroke={KC.ink} strokeWidth={5} />
    <clipPath id="clipFrasco"><rect x={-130} y={-200} width={260} height={180} rx={20} /></clipPath>
    <g clipPath="url(#clipFrasco)"><RedHifas T={T} x={0} y={-110} g={g} seed={5} n={160} escala={0.3} ancho={3} circ color={MT.hifa} /></g>
    <ellipse cx={0} cy={-200} rx={130 * g} ry={14} fill={MT.hifa} opacity={0.8 * g} />
    {g > 0.7 && <ellipse cx={30} cy={-212} rx={10} ry={8} fill="#fffaf0" stroke={KC.ink} strokeWidth={3} />}
    <rect x={-110} y={-470} width={220} height={60} rx={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={-390} width={22} height={300} rx={10} fill="#fff" opacity=".45" />
  </g>;
}

// Salón de telesecundaria: pizarrón con la foto del hongo y alumnos de espaldas. salto 0..1 = gritan (brincan).
function Salon({ T, salto = 0, foto = 1 }) {
  const filas = [[1030, 6, 150], [1140, 6, 160], [1250, 5, 190]];
  return <g>
    <rect x={120} y={600} width={840} height={360} rx={14} fill="#1f5a3d" stroke="#7a4a22" strokeWidth={22} />
    <rect x={120} y={600} width={840} height={360} rx={14} fill="none" stroke={KC.ink} strokeWidth={6} />
    {foto > 0 && <g transform={`translate(540 790) rotate(-3) scale(${kEase.rebote(foto)})`}>
      <rect x={-150} y={-150} width={300} height={290} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <rect x={-130} y={-130} width={260} height={210} fill="#bfe3b4" />
      <rect x={-130} y={40} width={260} height={40} fill={MT.tierra} />
      <Matsutake x={0} y={52} s={0.62} abre={0.8} />
    </g>}
    {filas.map(([yy, n, paso], f) => Array.from({ length: n }, (_, i) => { const xx = 540 + (i - (n - 1) / 2) * paso + (f % 2 ? 40 : 0);
      const b = salto * Math.abs(Math.sin(T * 9 + i * 1.3 + f)) * 26;
      const pelo = ['#2a1a12', '#3b2414', '#141010', '#5a3418'][(i + f) % 4];
      return <g key={f + '-' + i} transform={`translate(${xx} ${yy - b})`}>
        <path d="M -70 120 Q -70 40 0 40 Q 70 40 70 120 Z" fill={['#f4efe4', '#2346ff', '#ff8a1f', '#2fe0a8', '#b18cff'][(i + f * 2) % 5]} stroke={KC.ink} strokeWidth={5} />
        <circle cx={0} cy={0} r={46} fill={pelo} stroke={KC.ink} strokeWidth={5} />
        {salto > 0.3 && i % 2 === 0 && <line x1={40} y1={30} x2={70 + Math.sin(T * 9 + i) * 8} y2={-60} stroke="#c98b5a" strokeWidth={18} strokeLinecap="round" />}
      </g>; }))}
  </g>;
}

// Tele vieja con un cometa en la pantalla (sin personajes de la serie).
function Tele({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-40} y1={-150} x2={-90} y2={-240} stroke={KC.ink} strokeWidth={6} /><line x1={40} y1={-150} x2={90} y2={-240} stroke={KC.ink} strokeWidth={6} />
    <rect x={-190} y={-150} width={380} height={290} rx={30} fill="#9a6a3a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-160} y={-125} width={260} height={230} rx={24} fill="#1b2a5a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-140 + (i * 53) % 230} cy={-100 + (i * 37) % 190} r={3} fill="#fff" opacity={0.5 + 0.5 * Math.sin(T * 5 + i)} />)}
    {(() => { const u = (T * 0.5) % 1, cx = klerp(-130, 80, u), cy = klerp(-90, 70, u); return <g>
      <path d={`M ${cx} ${cy} L ${cx - 70} ${cy - 54} L ${cx - 60} ${cy - 66} Z`} fill={KC.gold2} opacity=".7" />
      <circle cx={cx} cy={cy} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>; })()}
    <circle cx={150} cy={-60} r={18} fill="#d9a865" stroke={KC.ink} strokeWidth={5} /><circle cx={150} cy={0} r={18} fill="#d9a865" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Rastrillo.
function Rastrillo({ x, y, rot = -20, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <line x1={0} y1={0} x2={420} y2={-420} stroke="#c58a52" strokeWidth={20} strokeLinecap="round" />
    <line x1={0} y1={0} x2={420} y2={-420} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" opacity=".4" />
    <rect x={-120} y={-14} width={240} height={26} rx={8} fill="#8a8f99" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-110 + i * 27.5} y1={10} x2={-110 + i * 27.5} y2={64} stroke="#6a6f78" strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}

// Mundo del gancho y del cierre: mismo pino, mismas acículas, mismo hongo (ya maduro en el cierre).
function MundoGancho({ T, abre = 0, crece = 1, tapa = 0 }) {
  return <>
    <Pino x={70} y={1190} s={1.15} T={T} seed={2} />
    <Encino x={1010} y={1190} s={0.9} T={T} />
    <SueloBosque y={1180} />
    <Matsutake x={400} y={1196} s={1.45} abre={abre} crece={crece} seed={8} />
    <Aciculas x0={-40} x1={KW + 40} y={1172} n={110} seed={7} tapa={tapa} />
  </>;
}

function MatsutakeShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Bosque, Es: CUES.Especie, J: CUES.Japon, Ec: CUES.Escasez, Ex: CUES.Exporta, P: CUES.Pregunta, M: CUES.Micorriza,
    S: CUES.SinArbol, E: CUES.Estudio, Tk: CUES.Takechi, Cu: CUES.Cuidado, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const tapa = kprog(T, K.G + 0.05, K.G + 0.9, kEase.sale);                 // el viento se lleva las acículas (algo se mueve en 0.3 s)
  const sube = 0.75 + 0.25 * kprog(T, K.G, K.G + 0.6, kEase.rebote);          // el botón asoma
  const avU = kprog(T, K.G + 3.3, K.B + 0.2, kEase.suave);                   // avioncito rumbo a Japón
  const mx = mxProy;
  const ESTADOS = [[-99.6, 19.3], [-101.9, 19.4], [-98.8, 20.4], [-98.1, 19.0], [-97.1, 19.5], [-96.7, 17.1]];
  const MAP = { x: 30, y: 640, w: 640 }, ms = MAP.w / 1000;
  const mp = (lon, lat) => { const [a, b] = mx(lon, lat); return [MAP.x + a * ms, MAP.y + b * ms]; };
  const [ox, oy] = mp(-98.6, 19.4), jx = 900, jy = 700;
  const ruta = kprog(T, K.Ex + 0.6, K.Ex + 2.6, kEase.suave);
  const arc = (u) => [klerp(ox, jx, u), klerp(oy, jy, u) - Math.sin(Math.PI * u) * 300];
  const seca = kprog(T, K.Ec + 0.6, K.Ec + 2.6);
  const raspa = kprog(T, K.Cu + 0.3, K.Cu + 1.5, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el viento destapa el botón blanco entre las acículas; el champiñón se tacha; avioncito a Japón */}
      <Escena T={T} a={K.G} b={K.B} zoom={0.04} origen="40% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MundoGancho T={T} abre={0} crece={sube} tapa={tapa} />
          <g opacity={kprog(T, K.G + 0.8, K.G + 1.2)}><Champinon x={150} y={900} s={0.55} abre={1} /></g>
          {T > K.G + 1.6 && <path d="M 80 640 L 230 860 M 230 640 L 80 860" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.G + 1.6, K.G + 1.9)} />}
          {avU > 0 && (() => { const ax = klerp(400, 1150, avU), ay = klerp(900, 380, avU) - Math.sin(Math.PI * avU) * 120; return <Avion x={ax} y={ay} ang={-30} s={1.2} />; })()}
        </>)}
      </Escena>
      {/* 2 · bosque de pino-encino: el hongo adulto; nombres comunes y científico */}
      <Escena T={T} a={K.B} b={K.J} zoom={0.05} origen="40% 70%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Pino x={130} y={1190} s={1.1} T={T} seed={3} />
          <Encino x={620} y={1190} s={0.8} T={T} seed={5} />
          <Pino x={980} y={1190} s={1.25} T={T} seed={6} />
          <SueloBosque y={1180} />
          <Matsutake x={420} y={1196} s={1.6} abre={kprog(T, K.B, K.B + 2.2, kEase.sale) * 0.9 + 0.1} seed={8} />
          <Matsutake x={700} y={1200} s={0.9} abre={0.15} seed={4} />
          <Aciculas x0={-40} x1={KW + 40} y={1172} n={110} seed={9} />
          {/* rizos de olor (hongo canela) */}
          {T > K.B + 3.0 && [0, 1, 2].map((i) => { const u = ((T - K.B - 3.0) * 0.6 + i / 3) % 1; return <path key={i} d={`M ${380 + i * 40} ${880 - u * 200} q 20 -30 0 -60 q -20 -30 0 -60`} stroke={KC.orange} strokeWidth={8} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u) * kprog(T, K.B + 3.0, K.B + 3.4)} />; })}
        </>)}
      </Escena>
      {/* 3 · Japón: pino rojo, su primo T. matsutake, arroz; luego los pinos se secan */}
      <Escena T={T} a={K.J} b={K.Ex} zoom={0.04}>
        <FondoLunares color={T < K.Ec ? KC.pink : mixHex(KC.pink, '#c9a26a', seca)} />
        {fsvg(<>
          <Pino x={120} y={1190} s={1.05} T={T} seed={12} corteza={MT.cortezaR} seca={seca} />
          <Pino x={560} y={1190} s={0.85} T={T} seed={13} corteza={MT.cortezaR} seca={seca * 0.9} />
          <Pino x={1000} y={1190} s={1.1} T={T} seed={14} corteza={MT.cortezaR} seca={seca} />
          <SueloBosque y={1180} color="#7a5232" />
          {/* matorral que invade el bosque descuidado */}
          {T > K.Ec && [[260, 1185], [420, 1190], [760, 1185], [880, 1192]].map(([bx, by], i) => <g key={i} transform={`translate(${bx} ${by}) scale(${kprog(T, K.Ec + 2.4 + i * 0.2, K.Ec + 3.2 + i * 0.2, kEase.rebote)})`}>
            {[-40, 0, 40].map((dx, k) => <ellipse key={k} cx={dx} cy={-50 - (k % 2) * 20} rx={60} ry={50} fill={k % 2 ? '#3f8f3a' : '#2f7a30'} stroke={KC.ink} strokeWidth={5} />)}</g>)}
          <g opacity={1 - kprog(T, K.Ec + 0.4, K.Ec + 1.6)}><Matsutake x={330} y={1196} s={1.2} abre={0.7} sombrero="#b8895a" escama="#6e4524" pie="#f3ead8" seed={5} /></g>
          <g opacity={kprog(T, K.J + 2.2, K.J + 2.7) * (1 - kprog(T, K.Ec - 0.3, K.Ec + 0.2))}><Tazon x={800} y={1150} s={1.1} /></g>
        </>)}
      </Escena>
      {/* 4 · exportación: mapa México → Japón y cajas */}
      <Escena T={T} a={K.Ex} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMexico x={MAP.x} y={MAP.y} ancho={MAP.w} conCA={false} />
          {ESTADOS.map(([lo, la], i) => { const [px, py] = mp(lo, la); const k = kprog(T, K.Ex + 0.3 + i * 0.12, K.Ex + 0.6 + i * 0.12, kEase.rebote); return <circle key={i} cx={px} cy={py} r={13 * k} fill={MT.blanco} stroke={KC.ink} strokeWidth={4} />; })}
          <Japon x={jx} y={jy - 120} s={1.1} />
          {ruta > 0 && <path d={'M ' + Array.from({ length: 41 }, (_, i) => arc((i / 40) * ruta).map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" fill="none" />}
          {ruta > 0 && ruta < 1 && (() => { const [a, b] = arc(ruta), [c, d] = arc(Math.min(1, ruta + 0.01)); return <Avion x={a} y={b} ang={Math.atan2(d - b, c - a) * 180 / Math.PI} s={0.9} />; })()}
          {[230, 540, 850].map((cx, i) => <Caja key={i} x={cx} y={1130} s={0.95} llena={kprog(T, K.Ex + 1.4 + i * 0.4, K.Ex + 2.6 + i * 0.4)} />)}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿por qué no lo siembran? */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={60} y={1050} width={380} height={90} rx={14} fill="#2f6fd6" stroke={KC.ink} strokeWidth={7} />
          {[110, 190, 270, 350].map((cx, i) => <Champinon key={i} x={cx} y={1070} s={0.36} abre={0.6} />)}
          <SueloBosque y={1180} />
          <Matsutake x={300} y={1196} s={1.1} abre={0.8} seed={8} />
          <Interrogacion T={T} x={330} y={820} tam={380} />
        </>)}
      </Escena>
      {/* 6 · bajo tierra: ectomicorriza en la raíz del pino (fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.S} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#160f0a' }}></div>
        <Ambiente T={T} n={20} color="rgba(255,230,190,.18)" />
        {fsvg(<RaizMicorriza T={T} x={540} y={680} s={1.15} manto={kprog(T, K.M + 0.6, K.M + 2.0)} red={kprog(T, K.M + 0.3, K.M + 3.0)} flujo={kprog(T, K.M + 3.2, K.M + 3.8)} />)}
      </Escena>
      {/* 7 · sin árbol vivo no hay hongo: frasco de laboratorio */}
      <Escena T={T} a={K.S} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<FrascoLab T={T} x={340} y={1170} s={1.25} g={kprog(T, K.S + 0.2, K.S + 2.4)} />)}
      </Escena>
      {/* 8–9 · el estudio del Cofre de Perote: ¡takechi! */}
      <Escena T={T} a={K.E} b={K.Cu} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Salon T={T} foto={kprog(T, K.E + 3.6, K.E + 4.3)} salto={kprog(T, K.Tk, K.Tk + 0.2) * (1 - kprog(T, K.Tk + 2.2, K.Tk + 2.8))} />)}
        {fsvg(<g opacity={kprog(T, K.Tk + 2.3, K.Tk + 2.8)}><Tele T={T} x={320} y={890} s={1} /></g>, 21)}
      </Escena>
      {/* 10 · cuidado: no rastrillar la hojarasca */}
      <Escena T={T} a={K.Cu} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pino x={900} y={1000} s={0.9} T={T} seed={21} />
          <rect x={-40} y={990} width={KW + 80} height={KH} fill={MT.tierra} />
          {/* micelio bajo la hojarasca: se seca si queda expuesto */}
          <clipPath id="clipSuelo"><rect x={0} y={1000} width={KW} height={240} /></clipPath>
          <g clipPath="url(#clipSuelo)"><RedHifas T={T} x={420} y={1060} g={1} seed={9} n={220} escala={0.34} ancho={4} circ color={mixHex(MT.hifa, '#8a7f70', kprog(T, K.Cu + 1.4, K.Cu + 2.8))} /></g>
          {/* hojarasca (acículas) que el rastrillo arrastra a la derecha */}
          <g transform={`translate(${raspa * 520} 0)`}><Aciculas x0={-40} x1={KW} y={980} n={160} seed={31} /></g>
          <Aciculas x0={-40} x1={KW} y={990} n={40} seed={33} />
          <Rastrillo x={klerp(150, 640, raspa)} y={960} rot={-8} />
          {T > K.Cu + 1.6 && <path d="M 500 760 L 780 1040 M 780 760 L 500 1040" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={kprog(T, K.Cu + 1.6, K.Cu + 1.9)} />}
        </>)}
      </Escena>
      {/* 11 · cierre: la misma imagen del inicio, ya adulto; la lupa muestra que vive abrazado a la raíz */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="40% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MundoGancho T={T} abre={0.9} crece={1} tapa={0} />
          {(() => { const u = kprog(T, K.C + 2.6, K.C + 4.2, kEase.suave); if (u <= 0) return null; return <Avion x={klerp(1150, 560, u)} y={klerp(380, 1150, u) - Math.sin(Math.PI * u) * 120} ang={klerp(200, 170, u)} s={1.1} />; })()}
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.4} until={K.Ou - 0.2} x={330} y={600} r={170} fx={400} fy={1210} interior={(t, r) =>
        <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#160f0a" /><RaizMicorriza T={t} x={r} y={r - 30} s={0.42} manto={1} red={1} flujo={1} /></svg>} etiqueta={TXT.lupa} tinte={KC.gold2} />

      {/* textos */}
      <Etq T={T} at={K.G + 0.5} until={K.B - 0.3} x={490} y={900} texto={TXT.ganchoEtq} tam={36} color={KC.texto} />
      <Chip T={T} at={K.G + 1.0} until={K.B - 0.3} texto={'✗ ' + TXT.champi} x={170} y={1000} tam={32} borde={KC.red} />
      <Chip T={T} at={K.G + 3.4} until={K.B - 0.1} texto={TXT.aJapon + ' ✈'} x={760} y={480} tam={38} borde={KC.cyan} />
      {TXT.nombres.map((n, i) => <Chip key={i} T={T} at={K.B + 0.6 + i * 0.9} until={K.Es - 0.2} texto={n} x={330} y={430 + i * 100} tam={38} borde={i === 2 ? KC.orange : KC.gold} />)}
      <Etq T={T} at={K.B + 3.0} until={K.Es - 0.2} x={560} y={760} texto={TXT.olor} tam={28} color={KC.texto} />
      <Etq T={T} at={K.Es + 0.1} until={K.J - 0.3} x={50} y={500} texto={TXT.especie} it tam={46} color={KC.texto} />
      <Chip T={T} at={K.Es + 0.6} until={K.J - 0.3} texto={TXT.especieChip} x={540} y={600} tam={34} borde={KC.gold} />
      <NumeroGigante T={T} at={K.J + 1.4} until={K.Ec - 0.05} valor={12000} dur={1.4} sufijo=" t" etiqueta={TXT.numEtq} x={350} y={540} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.J + 2.2} until={K.Ec - 0.2} texto={TXT.numChip} x={350} y={700} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.J + 0.9} until={K.Ec - 0.2} x={60} y={930} texto={TXT.primoChip} tam={28} color={KC.texto} />
      <Etq T={T} at={K.J + 0.6} until={K.Ec - 0.2} x={60} y={880} texto={TXT.primo} it tam={34} color={KC.texto} />
      <Etq T={T} at={K.J + 2.8} until={K.Ec - 0.2} x={1030} y={990} lado="izq" texto={TXT.arroz} tam={26} color={KC.texto} />
      <NumeroGigante T={T} at={K.Ec} until={K.Ex - 0.3} valor={100} desde={12000} dur={1.2} sufijo=" t" etiqueta={TXT.escEtq} x={350} y={540} tam={150} color={KC.red} />
      <Chip T={T} at={K.Ec + 1.6} until={K.Ex - 0.3} texto={TXT.escChip1} x={480} y={760} tam={30} borde={KC.orange} />
      <Chip T={T} at={K.Ec + 2.6} until={K.Ex - 0.3} texto={TXT.escChip2} x={480} y={850} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Ex + 0.2} until={K.P - 0.3} texto={TXT.expChip} x={540} y={420} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Ex + 0.5} until={K.P - 0.3} x={60} y={600} texto={TXT.mexico} tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ex + 2.4} until={K.P - 0.3} x={1030} y={920} lado="izq" texto={TXT.japon} tam={34} color={KC.texto} />
      <Chip T={T} at={K.M + 0.1} until={K.S - 0.3} texto={TXT.dentro} x={540} y={420} tam={32} borde={KC.gold2} mono />
      <Etq T={T} at={K.M + 0.5} until={K.S - 0.3} x={60} y={600} texto={TXT.raiz} tam={30} color="#e7b57e" />
      <Etq T={T} at={K.M + 1.6} until={K.S - 0.3} x={1030} y={980} lado="izq" texto={TXT.manto} tam={30} color={MT.hifa} />
      <Etq T={T} at={K.M + 3.2} until={K.S - 0.3} x={60} y={1120} texto={'● ' + TXT.agua} tam={30} color={MT.aguaC} />
      <Etq T={T} at={K.M + 3.8} until={K.S - 0.3} x={60} y={1180} texto={'◆ ' + TXT.azucar} tam={30} color={MT.azucarC} />
      <Chip T={T} at={K.S + 0.4} until={K.E - 0.3} texto={TXT.cultivo} x={340} y={430} tam={38} borde={KC.red} />
      <Etq T={T} at={K.S + 1.6} until={K.E - 0.3} x={60} y={530} texto={TXT.cultivo2} tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.5} anio={TXT.estAnio} quien={TXT.estQuien} revista={TXT.estRev} x={540} y={600} />
      {(() => { if (!kvisible(T, K.Tk, K.Tk + 2.4)) return null; const e = kentrada(T, K.Tk, K.Tk + 2.4, 'pop');
        return <div style={{ position:'absolute', left:360, top:470, zIndex:44, transform:`translate(-50%,-50%) scale(${e.s}) rotate(${-4 + Math.sin(T * 14) * 2}deg)`, opacity:e.o,
          background:'#fff', border:`8px solid ${KC.ink}`, borderRadius:60, padding:'10px 46px', font:`400 120px/1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`3px ${KC.ink}`, boxShadow:`12px 12px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{TXT.takechi}</div>; })()}
      <Chip T={T} at={K.Tk + 2.4} until={K.Cu - 0.3} texto={TXT.takechiChip} x={340} y={430} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Tk + 3.0} until={K.Cu - 0.3} texto={TXT.takeshi} x={340} y={520} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Tk + 3.0} until={K.Cu - 0.3} texto={TXT.tele} x={340} y={610} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 1.8} until={K.C - 0.3} texto={TXT.cuidado} x={380} y={450} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Cu + 1.2} until={K.C - 0.3} x={60} y={1050} texto={TXT.micelio} tam={30} color={MT.hifa} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto={TXT.cierre} x={380} y={380} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.B} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.B} until={K.J} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.J} until={K.Ex} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Ex} until={K.P} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.P} until={K.M} texto="5 cm" largo={125} />
      <BarraEscala T={T} at={K.M} until={K.S} texto="1 mm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.S} until={K.E} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Cu} until={K.C} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubM T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="No es un champiñón: *es matsutake.*" />
      <SubM T={T} idx={1} at={K.B + 0.1} until={K.Es - 0.1} texto="Hongo blanco, *de ocote o canela.*" />
      <SubM T={T} idx={2} at={K.Es + 0.1} until={K.J - 0.1} texto="Su nombre: *_Tricholoma mesoamericanum._*" />
      <SubM T={T} idx={3} at={K.J + 0.1} until={K.Ec - 0.1} texto="Japón, años 40: *12 000 toneladas* al año." />
      <SubM T={T} idx={4} at={K.Ec + 0.1} until={K.Ex - 0.1} texto="En 2020, *menos de 100.*" />
      <SubM T={T} idx={5} at={K.Ex + 0.1} until={K.P - 0.1} texto="Desde los ochenta, *rumbo a Japón.*" />
      <SubM T={T} idx={6} at={K.P + 0.1} until={K.M - 0.1} texto="¿Por qué *no lo siembran?*" />
      <SubM T={T} idx={7} at={K.M + 0.1} until={K.S - 0.1} texto="Envuelve las *raíces vivas* del pino." />
      <SubM T={T} idx={8} at={K.S + 0.1} until={K.E - 0.1} texto="Sin árbol vivo, *no hay hongo.*" />
      <SubM T={T} idx={9} at={K.E + 0.1} until={K.Tk - 0.1} texto="2015, Cofre de Perote: *cien estudiantes.*" />
      <SubM T={T} idx={10} at={K.Tk + 0.1} until={K.Cu - 0.1} texto="Gritaron: *¡takechi!*" />
      <SubM T={T} idx={11} at={K.Cu + 0.1} until={K.C - 0.1} texto="Rastrillar *mata su micelio.*" />
      <SubM T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Vive aquí, *abrazado a un pino.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.2, 'avatar_11_sorprendido', 'gancho'],
        [K.B + 0.4, K.Es - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.J + 1.5, K.Ec - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ec + 1.2, K.Ex - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.M + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 0.5, K.E - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Tk + 0.2, K.Cu - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Cu + 0.2, K.C - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="81" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

window.MatsutakeApp = kApp(MatsutakeShot);
