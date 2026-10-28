// Shot IA #01 · Especial Día de Muertos: la IA que restaura las fotos de tu ofrenda — NARRADO (N2 "El número" + viaje N1).
// Guion y fuentes: guion.md. El dibujo es esquemático: la bisabuela, las caras y los pixeleados son ilustraciones, no fotos reales.
const SEPIA = { fondo:'#c9a77c', piel:'#dcb48a', pelo:'#e9e1d2', rebozo:'#6e5136', ojo:'#3a2a1c' };
const COLOR = { fondo:'#9cc7d9', piel:'#e2a67c', pelo:'#d9d6d2', ojo:'#2a1a12' };
const REBOZOS = [KC.red, KC.leaf, '#2f5fd8'];

// Papel picado colgando arriba y veladoras + cempasúchil abajo: la ofrenda.
function FondoOfrenda({ T, color = KC.orange }) {
  const cols = [KC.pink, KC.yellow, KC.cyan, KC.lilac, KC.mint, KC.magenta];
  return <div style={{ position:'absolute', inset:0 }}>
    <FondoLunares color={color} punto="rgba(255,236,170,.35)" />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <path d="M -20 70 Q 540 110 1100 70" stroke={KC.ink} strokeWidth={5} fill="none" />
      {Array.from({ length: 8 }, (_, i) => { const x = 20 + i * 135, sw = Math.sin(T * 2 + i) * 4;
        return <g key={i} transform={`translate(${x} 78) rotate(${sw} 60 0)`}>
          <path d="M 0 0 L 120 0 L 120 120 L 105 108 L 90 120 L 75 108 L 60 120 L 45 108 L 30 120 L 15 108 L 0 120 Z" fill={cols[i % 6]} stroke={KC.ink} strokeWidth={4} />
          <circle cx={60} cy={45} r={16} fill={color} /><path d="M 30 80 L 45 65 L 60 80 L 75 65 L 90 80" stroke={color} strokeWidth={8} fill="none" />
        </g>; })}
      {[110, 300, 780, 970].map((x, i) => { const f = 1 + 0.12 * Math.sin(T * 13 + i * 2);
        return <g key={i} transform={`translate(${x} 1690)`}>
          <rect x={-45} y={-80} width={90} height={160} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
          <path d={`M 0 ${-150 * f} Q 26 -110 0 -86 Q -26 -110 0 ${-150 * f} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
          <circle cx={0} cy={-104} r={7} fill={KC.orange} />
        </g>; })}
      {[205, 470, 610, 875].map((x, i) => <g key={i} transform={`translate(${x} ${1640 + (i % 2) * 70}) rotate(${T * 8 + i * 30})`}>
        {Array.from({ length: 12 }, (_, k) => <ellipse key={k} cx={0} cy={-34} rx={16} ry={30} fill={k % 2 ? '#ff9a1f' : '#ffb21f'} stroke={KC.ink} strokeWidth={3} transform={`rotate(${k * 30})`} />)}
        <circle r={20} fill="#e06a00" stroke={KC.ink} strokeWidth={3} />
      </g>)}
    </svg>
  </div>;
}

// Zona rota de la foto (abajo a la derecha: mejilla, oreja y hombro).
const HUECO = 'M 40 -20 L 92 -60 L 150 -40 L 175 30 L 175 250 L 20 250 L 60 170 L 30 110 L 70 60 Z';
// Retrato de la bisabuela (dibujo). color 0 = sepia, 1 = a color · dano = rayones/manchas/polvo/grano ·
// hueco = parte borrada · relleno = la IA la rellena · marca = contorno de lo inventado · rebozo = color elegido.
function Retrato({ id, T, x, y, s = 1, color = 0, dano = 0, hueco = 0, relleno = 0, marca = 0, rebozo = REBOZOS[2], escaneo = null, gris = 0, rot = 0 }) {
  const c = (a, b) => mixHex(a, b, color);
  const fondo = gris ? '#a9a9a9' : c(SEPIA.fondo, COLOR.fondo), piel = gris ? '#c8c8c8' : c(SEPIA.piel, COLOR.piel), pelo = gris ? '#eeeeee' : c(SEPIA.pelo, COLOR.pelo);
  const reb = gris ? '#555' : c(SEPIA.rebozo, rebozo);
  const r = krng(7);
  const rayas = Array.from({ length: 7 }, () => [r() * 360 - 180, r() * 460 - 230, r() * 140 - 70, r() * 200 + 60]);
  const manchas = Array.from({ length: 5 }, () => [r() * 300 - 150, r() * 400 - 200, 18 + r() * 34]);
  const polvo = Array.from({ length: 40 }, () => [r() * 360 - 180, r() * 460 - 230, 2 + r() * 4]);
  const grano = Array.from({ length: 160 }, () => [r() * 360 - 180, r() * 460 - 230]);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <rect x={-215} y={-275} width={430} height={550} rx={16} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <rect x={-195} y={-255} width={390} height={510} fill="#8a5a1c" stroke={KC.ink} strokeWidth={5} />
    <clipPath id={`cp-${id}`}><rect x={-180} y={-240} width={360} height={480} /></clipPath>
    <g clipPath={`url(#cp-${id})`}>
      <rect x={-180} y={-240} width={360} height={480} fill={fondo} />
      {/* rebozo y cuerpo */}
      <path d="M -180 240 L -170 120 Q -120 60 -40 70 L 40 70 Q 120 60 170 120 L 180 240 Z" fill={reb} stroke={KC.ink} strokeWidth={5} />
      <path d="M -60 70 L 0 170 L 60 70" stroke="rgba(0,0,0,.35)" strokeWidth={6} fill="none" />
      {/* cara */}
      <rect x={-28} y={30} width={56} height={50} fill={piel} />
      <ellipse cx={0} cy={-30} rx={92} ry={112} fill={piel} stroke={KC.ink} strokeWidth={5} />
      {/* chongo y pelo canoso */}
      <circle cx={0} cy={-158} r={46} fill={pelo} stroke={KC.ink} strokeWidth={5} />
      <path d="M -92 -40 Q -96 -150 0 -142 Q 96 -150 92 -40 Q 70 -110 0 -112 Q -70 -110 -92 -40 Z" fill={pelo} stroke={KC.ink} strokeWidth={5} />
      <circle cx={-34} cy={-30} r={9} fill={gris ? '#333' : c(SEPIA.ojo, COLOR.ojo)} /><circle cx={34} cy={-30} r={9} fill={gris ? '#333' : c(SEPIA.ojo, COLOR.ojo)} />
      <path d="M -54 -54 Q -34 -64 -16 -54 M 16 -54 Q 34 -64 54 -54" stroke={KC.ink} strokeWidth={4} fill="none" />
      <path d="M 0 -22 Q -8 6 4 10" stroke={KC.ink} strokeWidth={4} fill="none" />
      <path d="M -30 34 Q 0 52 30 34" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M -70 0 Q -60 -10 -50 0 M 50 0 Q 60 -10 70 0" stroke="rgba(0,0,0,.25)" strokeWidth={3} fill="none" />
      <circle cx={-92} cy={-8} r={7} fill={KC.gold} stroke={KC.ink} strokeWidth={3} /><circle cx={92} cy={-8} r={7} fill={KC.gold} stroke={KC.ink} strokeWidth={3} />
      {/* daño */}
      {dano > 0 && <g opacity={dano}>
        {grano.map(([gx, gy], i) => <rect key={'g' + i} x={gx} y={gy} width={3} height={3} fill={i % 2 ? '#fff' : '#000'} opacity={0.35} />)}
        {manchas.map(([mx, my, mr], i) => <ellipse key={'m' + i} cx={mx} cy={my} rx={mr} ry={mr * 0.7} fill="#5b3a14" opacity={0.45} />)}
        {rayas.map(([rx, ry, dx, dy], i) => <path key={'r' + i} d={`M ${rx} ${ry} q ${dx / 2} ${dy / 3} ${dx} ${dy}`} stroke="#fffaf0" strokeWidth={3} fill="none" opacity={0.9} />)}
        {polvo.map(([px, py, pr], i) => <circle key={'p' + i} cx={px} cy={py} r={pr} fill="#fffaf0" opacity={0.8} />)}
      </g>}
      {/* parte borrada (papel) que la IA rellena */}
      {hueco > 0 && <path d={HUECO} fill="#efe6d2" stroke="#b9a37f" strokeWidth={4} opacity={hueco * (1 - relleno)} />}
      {marca > 0 && <path d={HUECO} fill={KC.cyan} fillOpacity={0.18 * marca} stroke={KC.cyan} strokeWidth={7} strokeDasharray="16 10" strokeDashoffset={-T * 40} opacity={marca} />}
      {escaneo != null && <g><rect x={-180} y={-240 + escaneo * 480 - 30} width={360} height={30} fill={KC.cyan} opacity={0.25} /><line x1={-180} x2={180} y1={-240 + escaneo * 480} y2={-240 + escaneo * 480} stroke={KC.cyan} strokeWidth={6} /></g>}
    </g>
  </g>;
}

// Cara sencilla (para PULSE y las caras inventadas). peinado: 0 corto, 1 largo, 2 rizado.
function CaraSimple({ x, y, s = 1, piel = '#e2a67c', pelo = '#3a2a1c', fondo = '#9cc7d9', peinado = 0, ojos = '#2a1a12', sonrisa = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-150} width={300} height={300} rx={24} fill={fondo} stroke={KC.ink} strokeWidth={8} />
    <clipPath id={`cs-${x}-${y}`}><rect x={-150} y={-150} width={300} height={300} rx={24} /></clipPath>
    <g clipPath={`url(#cs-${x}-${y})`}>
      {peinado === 1 && <path d="M -95 -20 Q -110 -130 0 -125 Q 110 -130 95 -20 L 105 140 L -105 140 Z" fill={pelo} />}
      <path d="M -120 150 Q -110 70 0 70 Q 110 70 120 150 Z" fill={mixHex(fondo, '#203050', 0.6)} stroke={KC.ink} strokeWidth={5} />
      <rect x={-24} y={30} width={48} height={50} fill={piel} />
      <ellipse cx={0} cy={-15} rx={72} ry={90} fill={piel} stroke={KC.ink} strokeWidth={5} />
      {peinado === 0 && <path d="M -74 -30 Q -80 -112 0 -108 Q 80 -112 74 -30 Q 60 -80 0 -82 Q -60 -80 -74 -30 Z" fill={pelo} stroke={KC.ink} strokeWidth={4} />}
      {peinado === 1 && <path d="M -74 -20 Q -60 -100 0 -100 Q 60 -100 74 -20 Q 40 -80 -74 -20 Z" fill={pelo} stroke={KC.ink} strokeWidth={4} />}
      {peinado === 2 && Array.from({ length: 9 }, (_, k) => <circle key={k} cx={-64 + k * 16} cy={-92 + Math.abs(k - 4) * 6} r={22} fill={pelo} stroke={KC.ink} strokeWidth={3} />)}
      <circle cx={-26} cy={-18} r={8} fill={ojos} /><circle cx={26} cy={-18} r={8} fill={ojos} />
      <path d="M 0 -8 Q -6 14 4 18" stroke={KC.ink} strokeWidth={4} fill="none" />
      <path d={`M -24 38 Q 0 ${38 + 14 * sonrisa} 24 38`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  </g>;
}

// Versión pixeleada de una cara (n × n cuadros grandes) calculada con la misma geometría.
function Pixelado({ x, y, tam = 300, n = 8, piel = '#8a5a3c', pelo = '#1d1410', fondo = '#7d8fa6', ropa = '#22304a', o = 1 }) {
  const c = tam / n, cuadros = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const u = ((i + 0.5) / n) * 300 - 150, v = ((j + 0.5) / n) * 300 - 150;
    let col = fondo;
    if (v > 80 && Math.abs(u) < 120) col = ropa;
    if ((u / 72) ** 2 + ((v + 15) / 90) ** 2 < 1) col = v < -70 ? pelo : piel;
    if (Math.abs(u) < 26 && v > 30 && v < 80) col = piel;
    const k = ((i * 7 + j * 13) % 5) / 30;
    cuadros.push(<rect key={i + '-' + j} x={x - tam / 2 + i * c} y={y - tam / 2 + j * c} width={c + 0.5} height={c + 0.5} fill={mixHex(col, '#000000', k)} />);
  }
  return <g opacity={o}>{cuadros}<rect x={x - tam / 2} y={y - tam / 2} width={tam} height={tam} fill="none" stroke={KC.ink} strokeWidth={8} /></g>;
}

function Flecha({ x1, y1, x2, y2, p = 1, color = KC.yellow }) {
  const xe = klerp(x1, x2, p), ye = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  return p > 0 ? <g><line x1={x1} y1={y1} x2={xe} y2={ye} stroke={color} strokeWidth={12} strokeLinecap="round" />
    {p > 0.95 && <path d={`M ${x2} ${y2} l ${-36 * Math.cos(a - 0.5)} ${-36 * Math.sin(a - 0.5)} M ${x2} ${y2} l ${-36 * Math.cos(a + 0.5)} ${-36 * Math.sin(a + 0.5)}`} stroke={color} strokeWidth={12} strokeLinecap="round" />}</g> : null;
}
function Chispas({ T, x, y, o = 1 }) {
  return <g opacity={o}>{[0, 1, 2, 3].map((k) => { const a = k * 1.7 + T, rr = 150 + 20 * Math.sin(T * 3 + k), s = 0.6 + 0.4 * Math.sin(T * 6 + k);
    return <path key={k} transform={`translate(${x + Math.cos(a) * rr} ${y + Math.sin(a) * rr}) scale(${s})`} d="M 0 -26 L 7 -7 L 26 0 L 7 7 L 0 26 L -7 7 L -26 0 L -7 -7 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}

// Caras de StyleGAN (la IA en la que se apoya PULSE): casi siempre de piel clara. Esquemático.
const PIELES = ['#f1c6a6', '#efc09c', '#9a6646', '#eab894', '#f0c4a2', '#8a5a3c', '#f2c8a8', '#ecbd99', '#f4d0b6', '#e9b690', '#6b4430', '#f0c3a0'];
const PELOS = ['#3a2a1c', '#c9a050', '#1d1410', '#7a4a22', '#3a2a1c', '#1d1410', '#d8b060', '#5a3a1c', '#3a2a1c', '#1d1410', '#1d1410', '#a06030'];

function FotosOfrenda() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pi: CUES.Pierde, Ad: CUES.Adivina, Ap: CUES.Aprendio, Co: CUES.Color, P: CUES.Pregunta, E: CUES.Estudio, Ob: CUES.Obama, Se: CUES.Sesgo, Da: CUES.Danada, Or: CUES.Original, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const cae = kprog(T, K.G, K.G + 0.7, kEase.rebote);
  // color: cicla el rebozo (la IA "elige") y se queda en azul
  const ciclo = T < K.Co + 1.2 ? -1 : Math.min(2, Math.floor((T - K.Co - 1.2) / 0.6));
  const rebozoElegido = ciclo < 0 ? REBOZOS[2] : REBOZOS[ciclo];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la foto restaurada en la ofrenda; se marca lo inventado */}
      <Escena T={T} a={K.G} b={K.Pi} zoom={0.04}>
        <FondoOfrenda T={T} />
        {svg(<Retrato id="g" T={T} x={390} y={klerp(-400, 860, cae)} s={1.02} rot={klerp(-14, -3, cae)} color={1} marca={kprog(T, K.G + 2.4, K.G + 3.0) * (0.75 + 0.25 * Math.sin(T * 8))} escaneo={T < K.G + 2.4 ? ((T - K.G) / 2.4) % 1 : null} />)}
      </Escena>
      {/* 2 · lo que pierde una foto vieja */}
      <Escena T={T} a={K.Pi} b={K.Ad}>
        <FondoOfrenda T={T} color={KC.yellow} />
        {svg(<Retrato id="p" T={T} x={440} y={860} s={1.0} rot={-3} color={0} dano={kprog(T, K.Pi + 0.4, K.Pi + 3.0)} hueco={kprog(T, K.Pi + 2.6, K.Pi + 3.2)} />)}
      </Escena>
      {/* 3 · lo borrado ya no está: la IA lo adivina (oscuro: por dentro de la máquina) */}
      <Escena T={T} a={K.Ad} b={K.Ap}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <Retrato id="a" T={T} x={540} y={850} s={1.0} dano={1 - kprog(T, K.Ad + 2.6, K.Ad + 4.0)} hueco={1} relleno={kprog(T, K.Ad + 2.6, K.Ad + 4.0)} marca={kprog(T, K.Ad + 2.6, K.Ad + 3.2)} escaneo={T < K.Ad + 2.5 ? ((T - K.Ad) / 1.2) % 1 : null} />
          {T < K.Ad + 2.7 && <text x={640} y={1000} textAnchor="middle" style={{ font:`400 170px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Ad + 0.6, K.Ad + 1.0) * (0.6 + 0.4 * Math.sin(T * 9))}>?</text>}
        </>)}
      </Escena>
      {/* 4 · aprendió de muchísimas fotos */}
      <Escena T={T} a={K.Ap} b={K.Co}>
        <FondoCircuito T={T} color={KC.orange} />
        {svg(Array.from({ length: 18 }, (_, i) => { const at = K.Ap - 0.2 + i * 0.17, u = kprog(T, at, at + 1.1, kEase.suave); if (u <= 0 || u >= 1) return null;
          return <g key={i} transform={`translate(${klerp(-120, 330, u)} ${klerp(560 + (i % 6) * 110, 860, u)})`} opacity={1 - u * 0.6}><CaraSimple x={0} y={0} s={0.32} piel={PIELES[(i * 5) % 12]} pelo={PELOS[(i * 7) % 12]} peinado={i % 3} fondo={[KC.cyan, KC.pink, KC.yellow, KC.mint][i % 4]} /></g>; }))}
        <RedNeuronal T={T} x={330} y={620} ancho={420} alto={480} onda={((T - K.Ap) * 0.5) % 1} />
        {svg(<g opacity={kprog(T, K.Ap + 1.8, K.Ap + 2.3)}><Retrato id="ap" T={T} x={920} y={860} s={0.42} color={0.2} hueco={1} relleno={kprog(T, K.Ap + 2.2, K.Ap + 3.4)} marca={1} /></g>)}
      </Escena>
      {/* 5 · color: la foto en blanco y negro no guarda colores; la IA los elige */}
      <Escena T={T} a={K.Co} b={K.P}>
        <FondoOfrenda T={T} color={KC.mint} />
        {svg(<>
          <Retrato id="c" T={T} x={650} y={790} s={0.98} gris={T < K.Co + 1.2 ? 1 : 0} color={kprog(T, K.Co + 1.2, K.Co + 3.2)} rebozo={rebozoElegido} />
          {REBOZOS.map((col, i) => <circle key={i} cx={500 + i * 150} cy={1150} r={36 * kprog(T, K.Co + 1.0 + i * 0.6, K.Co + 1.3 + i * 0.6, kEase.rebote)} fill={col} stroke={ciclo === i ? KC.yellow : KC.ink} strokeWidth={ciclo === i ? 12 : 6} />)}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      {/* 7 · el estudio: PULSE inventa una cara nítida que encaje con la pixeleada */}
      <Escena T={T} a={K.E} b={K.Ob}>
        <FondoCircuito T={T} color={KC.cyan} />
        {svg(<>
          <g opacity={kprog(T, K.E + 3.4, K.E + 3.8)}><Pixelado x={250} y={1000} tam={300} piel="#d8a07a" pelo="#5a3a1c" /></g>
          <Flecha x1={430} y1={1000} x2={620} y2={1000} p={kprog(T, K.E + 4.0, K.E + 4.6)} />
          <g opacity={kprog(T, K.E + 4.6, K.E + 5.2)}><CaraSimple x={820} y={1000} s={1.0} piel="#e2a67c" pelo="#5a3a1c" peinado={0} /><Chispas T={T} x={820} y={1000} o={kprog(T, K.E + 4.8, K.E + 5.3)} /></g>
        </>)}
      </Escena>
      {/* 8 · Obama: la foto pixeleada → la cara de un hombre blanco (2020). Esquemático, sin retratar a nadie. */}
      <Escena T={T} a={K.Ob} b={K.Se}>
        <FondoCircuito T={T} color={KC.red} />
        {svg(<>
          <Pixelado x={260} y={900} tam={320} piel="#7a4a30" pelo="#1d1410" fondo="#6f86a8" ropa="#1a2236" />
          <Flecha x1={450} y1={900} x2={610} y2={900} p={kprog(T, K.Ob + 1.6, K.Ob + 2.2)} color={KC.red} />
          <g opacity={kprog(T, K.Ob + 2.2, K.Ob + 2.8)}><CaraSimple x={820} y={900} s={1.0} piel="#f3cdb2" pelo="#7a4a22" ojos="#2f6dff" fondo="#9cc7d9" sonrisa={0.3} /></g>
        </>)}
      </Escena>
      {/* 9 · se apoyaba en otra IA que generaba sobre todo caras blancas (unas 9 de 12 claras) */}
      <Escena T={T} a={K.Se} b={K.Da}>
        <FondoCircuito T={T} color={KC.lilac} />
        {svg(PIELES.map((p, i) => { const at = K.Se + 0.6 + i * 0.22, e = kprog(T, at, at + 0.3, kEase.rebote); const c = i % 4, r = Math.floor(i / 4);
          return e > 0 ? <g key={i} transform={`translate(${210 + c * 220} ${650 + r * 190}) scale(${e})`}><CaraSimple x={0} y={0} s={0.55} piel={p} pelo={PELOS[i]} peinado={i % 3} fondo={[KC.cyan, KC.pink, KC.yellow, KC.mint][(i + r) % 4]} /></g> : null; }))}
      </Escena>
      {/* 10 · más daño, más relleno: muchas caras distintas dan la misma foto pixeleada (fig. 3 de PULSE) */}
      <Escena T={T} a={K.Da} b={K.Or}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          {[0, 1, 2, 3].map((i) => { const at = K.Da + 0.4 + i * 0.35, e = kprog(T, at, at + 0.35, kEase.rebote);
            return <g key={i}><g transform={`translate(${390 + i * 190} 700) scale(${e})`}><CaraSimple x={0} y={0} s={0.52} piel={['#e2a67c', '#d8a07a', '#cf9670', '#e6ad84'][i]} pelo={['#5a3a1c', '#3a2a1c', '#7a4a22', '#4a2e18'][i]} peinado={i % 3} /></g>
              <Flecha x1={390 + i * 190} y1={800} x2={klerp(390 + i * 190, 675, 0.75)} y2={930} p={kprog(T, K.Da + 2.0 + i * 0.15, K.Da + 2.5 + i * 0.15)} color={KC.cyan} /></g>; })}
          <g opacity={kprog(T, K.Da + 2.6, K.Da + 3.0)}><Pixelado x={675} y={1060} tam={230} n={6} piel="#d8a07a" pelo="#4a2e18" /></g>
        </>)}
      </Escena>
      {/* 11 · guarda también la original */}
      <Escena T={T} a={K.Or} b={K.C}>
        <FondoOfrenda T={T} color={KC.pink} />
        {svg(<>
          <g transform={`translate(${klerp(-300, 0, kprog(T, K.Or, K.Or + 0.7, kEase.sale))} 0)`}><Retrato id="o1" T={T} x={290} y={880} s={0.6} rot={-4} dano={1} hueco={1} /></g>
          <g transform={`translate(${klerp(300, 0, kprog(T, K.Or + 0.2, K.Or + 0.9, kEase.sale))} 0)`}><Retrato id="o2" T={T} x={790} y={900} s={0.6} rot={4} color={1} marca={0.6} /></g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma foto del inicio, con lo inventado marcado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoOfrenda T={T} />
        {svg(<Retrato id="cz" T={T} x={390} y={860} s={1.02} rot={-3} color={1} marca={kprog(T, K.C + 1.0, K.C + 1.8) * (0.75 + 0.25 * Math.sin(T * 8))} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.Pi - 0.3} texto="Especial Día de Muertos" x={300} y={420} tam={30} borde={KC.pink} />
      <Etq T={T} at={K.G + 3.0} until={K.Pi - 0.3} x={40} y={1150} texto="inventado por la IA" tam={30} color={KC.cyan} />
      <Etq T={T} at={K.Pi + 0.6} until={K.Ad - 0.3} x={700} y={820} texto="rayones" tam={38} />
      <Etq T={T} at={K.Pi + 1.2} until={K.Ad - 0.3} x={700} y={890} texto="manchas" tam={38} />
      <Etq T={T} at={K.Pi + 1.8} until={K.Ad - 0.3} x={700} y={960} texto="polvo" tam={38} />
      <Etq T={T} at={K.Pi + 2.4} until={K.Ad - 0.3} x={700} y={1030} texto="grano" tam={38} />
      <Chip T={T} at={K.Ad + 0.3} until={K.Ap - 0.3} texto="lo borrado ya no está" y={470} tam={42} borde={KC.yellow} />
      <Etq T={T} at={K.Ad + 3.2} until={K.Ap - 0.3} x={760} y={1150} texto="adivinado" tam={32} color={KC.cyan} />
      <Chip T={T} at={K.Ap + 0.2} until={K.Co - 0.3} texto="aprende de muchísimas fotos" y={470} tam={40} borde={KC.orange} />
      <Etq T={T} at={K.Ap + 2.4} until={K.Co - 0.3} x={1040} y={1130} texto="lo más probable" lado="izq" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.Co + 0.2} until={K.P - 0.3} texto="blanco y negro: sin color" x={650} y={420} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Co + 1.2} until={K.P - 0.3} x={420} y={1150} texto="¿cuál?" lado="izq" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 2.3} until={K.Ob - 0.3} anio="2020" quien="Universidad Duke · PULSE" revista="presentado en CVPR 2020" y={600} />
      <Etq T={T} at={K.E + 3.6} until={K.Ob - 0.3} x={110} y={820} texto="foto pixeleada" tam={28} />
      <Etq T={T} at={K.E + 5.0} until={K.Ob - 0.3} x={1040} y={820} texto="cara inventada" lado="izq" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Ob + 0.4} until={K.Se - 0.3} x={110} y={700} texto="foto pixeleada de Obama" tam={28} />
      <Etq T={T} at={K.Ob + 2.6} until={K.Se - 0.3} x={1040} y={1065} texto="cara inventada" lado="izq" tam={28} color={KC.yellow} />
      <Chip T={T} at={K.Ob + 3.0} until={K.Se - 0.3} texto="2020: le devolvió un hombre blanco" y={1140} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Se + 0.2} until={K.Da - 0.3} texto="la IA de apoyo (StyleGAN)" y={470} tam={38} borde={KC.lilac} />
      <Etq T={T} at={K.Se + 3.4} until={K.Da - 0.3} x={60} y={1170} texto="sobre todo: caras blancas" tam={32} color={KC.yellow} />
      <Chip T={T} at={K.Da + 0.2} until={K.Or - 0.3} texto="menos información = más relleno" x={660} y={470} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Da + 3.0} until={K.Or - 0.3} x={545} y={1060} texto="la misma foto borrosa" lado="izq" tam={28} />
      <Etq T={T} at={K.Or + 0.8} until={K.C - 0.3} x={120} y={1130} texto="original" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Or + 1.0} until={K.C - 0.3} x={990} y={1160} texto="restaurada (IA)" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Or + 1.8} until={K.C - 0.3} texto="guarda la original" y={420} x={420} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="lo que la IA cree que era" x={420} y={420} tam={36} borde={KC.cyan} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pi - 0.1} texto="Una parte no es real: *la inventó.*" />
      <Subtitulo T={T} idx={1} at={K.Pi + 0.1} until={K.Ad - 0.1} texto="Rayones, manchas, *polvo y grano.*" />
      <Subtitulo T={T} idx={2} at={K.Ad + 0.1} until={K.Ap - 0.1} texto="No lo recupera: *lo adivina.*" />
      <Subtitulo T={T} idx={3} at={K.Ap + 0.1} until={K.Co - 0.1} texto="Rellena con *lo más probable.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.P - 0.1} texto="El color: *la IA lo elige.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si *adivina mal?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.Ob - 0.1} texto="PULSE *inventa una cara.*" />
      <Subtitulo T={T} idx={7} at={K.Ob + 0.1} until={K.Se - 0.1} texto="Obama → *un hombre blanco.*" />
      <Subtitulo T={T} idx={8} at={K.Se + 0.1} until={K.Da - 0.1} texto="Su IA de apoyo: *sobre todo caras blancas.*" />
      <Subtitulo T={T} idx={9} at={K.Da + 0.1} until={K.Or - 0.1} texto="Más daño: *más relleno.*" />
      <Subtitulo T={T} idx={10} at={K.Or + 0.1} until={K.C - 0.1} texto="Guarda *la original.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es lo que la IA *cree que era.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Pierde + 0.6, CUES.Adivina - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Color + 0.5, CUES.Pregunta - 0.1, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.7, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Obama + 0.8, CUES.Sesgo + 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Danada + 0.6, CUES.Original - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Original + 0.5, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FotosOfrendaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FotosOfrenda /></CompositionStage></div>;
}
window.FotosOfrendaApp = FotosOfrendaApp;
