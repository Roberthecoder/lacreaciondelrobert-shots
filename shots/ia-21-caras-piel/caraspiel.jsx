// Shot IA #21 · La misma app de caras falla más con unas que con otras — NARRADO (N2 "El número").
// Datos: Buolamwini y Gebru, "Gender Shades", PMLR 81 (2018); Raji y Buolamwini, AIES 2019; NIST FRVT parte 3, NISTIR 8280 (2019);
// ACLU, Williams v. City of Detroit (2020–2024). Ver guion.md y verificacion.md. Caras y escenas esquemáticas.
const PIEL_CLARA = '#f6cfae', PIEL_OSCURA = '#7a4a2c', PIEL_MEDIA = '#c98d5f';

// Cara dibujada (busto). tipo 'h' (pelo corto) o 'm' (pelo rizado y aretes). x,y = centro de la cabeza.
function Cara({ x, y, s = 1, piel = PIEL_CLARA, pelo = '#3a2618', tipo = 'h', camisa = KC.blue, T = 0, seed = 1, boca = 'sonrisa' }) {
  const parp = ((T + seed * 0.7) % 3.4) < 0.12, mx = Math.sin(T * 1.3 + seed) * 4;
  const sombra = mixHex(piel, '#000000', 0.18), labio = tipo === 'm' ? mixHex(piel, '#a0303a', 0.45) : mixHex(piel, '#7a2a20', 0.3);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* hombros */}
    <path d="M -190 300 Q -180 175 -60 150 L 60 150 Q 180 175 190 300 Z" fill={camisa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -45 120 L -45 165 Q 0 195 45 165 L 45 120 Z" fill={sombra} stroke={KC.ink} strokeWidth={7} />
    {/* pelo de atrás */}
    {tipo === 'm' && <g>
      {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 128} cy={-55 + Math.sin(a) * 120} r={52} fill={pelo} stroke={KC.ink} strokeWidth={7} />; })}
      <circle cx={0} cy={-55} r={140} fill={pelo} />
    </g>}
    {/* orejas */}
    <ellipse cx={-108} cy={-15} rx={20} ry={30} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={108} cy={-15} rx={20} ry={30} fill={piel} stroke={KC.ink} strokeWidth={7} />
    {tipo === 'm' && <><circle cx={-112} cy={22} r={11} fill={KC.gold} stroke={KC.ink} strokeWidth={4} /><circle cx={112} cy={22} r={11} fill={KC.gold} stroke={KC.ink} strokeWidth={4} /></>}
    {/* cabeza */}
    <ellipse cx={0} cy={-20} rx={104} ry={128} fill={piel} stroke={KC.ink} strokeWidth={8} />
    {/* pelo de enfrente */}
    {tipo === 'h' && <path d="M -106 -40 Q -112 -150 -10 -158 Q 96 -160 108 -50 Q 80 -100 20 -104 Q -50 -108 -106 -40 Z" fill={pelo} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    {tipo === 'm' && <path d="M -100 -60 Q -70 -140 0 -142 Q 74 -140 100 -60 Q 60 -110 0 -108 Q -60 -110 -100 -60 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />}
    {/* cejas */}
    <path d={`M -64 -52 Q -40 -64 -18 -54`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M 18 -54 Q 40 -64 64 -52`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    {/* ojos */}
    {parp ? <><line x1={-62} y1={-22} x2={-22} y2={-22} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" /><line x1={22} y1={-22} x2={62} y2={-22} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" /></>
      : <>{[-42, 42].map((ex) => <g key={ex}><ellipse cx={ex} cy={-22} rx={22} ry={17} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={ex + mx} cy={-21} r={10} fill="#2a1a10" /><circle cx={ex + mx + 3} cy={-25} r={3.5} fill="#fff" /></g>)}</>}
    {/* nariz y boca */}
    <path d="M 0 -6 Q -14 30 -4 36 Q 6 40 14 34" stroke={sombra} strokeWidth={6} fill="none" strokeLinecap="round" />
    {boca === 'sonrisa' && <path d="M -36 62 Q 0 90 36 62 Q 0 74 -36 62 Z" fill={labio} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
    {boca === 'seria' && <path d="M -30 70 Q 0 64 30 70" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
    {boca === 'o' && <ellipse cx={0} cy={70} rx={14} ry={18} fill="#5a1d1d" stroke={KC.ink} strokeWidth={6} />}
    <ellipse cx={-62} cy={30} rx={18} ry={10} fill={KC.pink} opacity=".25" /><ellipse cx={62} cy={30} rx={18} ry={10} fill={KC.pink} opacity=".25" />
  </g>;
}

// Recuadro de detección de cara: esquinas, línea láser que barre y etiqueta arriba.
function Escaneo({ x, y, w = 300, h = 360, T, at = 0, color = KC.cyan, etiqueta, ok = null, tam = 34 }) {
  const e = kprog(T, at, at + 0.35, kEase.sale); if (e <= 0) return null;
  const c = 46, x0 = x - w / 2, y0 = y - h / 2, barre = y0 + ((T - at) * 260) % h;
  const esq = [[x0, y0, 1, 1], [x0 + w, y0, -1, 1], [x0, y0 + h, 1, -1], [x0 + w, y0 + h, -1, -1]];
  const col = ok === true ? KC.mint : ok === false ? KC.red : color;
  return <g opacity={e}>
    {esq.map(([px, py, sx, sy], i) => <path key={i} d={`M ${px} ${py + sy * c} L ${px} ${py} L ${px + sx * c} ${py}`} stroke={col} strokeWidth={10} fill="none" strokeLinecap="round" />)}
    {ok == null && <rect x={x0 + 8} y={barre} width={w - 16} height={6} fill={col} opacity=".8" />}
    {etiqueta && <g transform={`translate(${x} ${y0 - 34})`}>
      <rect x={-(etiqueta.length * tam * 0.33 + 26)} y={-30} width={etiqueta.length * tam * 0.66 + 52} height={60} rx={30} fill={KC.ink} stroke={col} strokeWidth={5} />
      <text y={tam * 0.35} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={col}>{etiqueta}</text>
    </g>}
  </g>;
}

// Escáner (computadora con pantalla) con nombre debajo.
function Programa({ x, y, s = 1, T = 0, pantalla = '', nombre = '', color = KC.cyan, v2 = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-110} width={280} height={210} rx={24} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-112} y={-84} width={224} height={140} rx={14} fill="#0d1424" />
    <rect x={-112} y={-84 + ((T * 110) % 140)} width={224} height={5} fill={color} opacity=".6" />
    <text y={4} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={color}>{pantalla}</text>
    <rect x={-40} y={100} width={80} height={30} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
    <text y={180} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{nombre}</text>
    {v2 > 0 && <g transform={`translate(120 -110) scale(${klerp(1.8, 1, v2)})`} opacity={Math.min(1, v2 * 2)}>
      <circle r={44} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      <text y={14} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill={KC.ink}>v2</text>
    </g>}
  </g>;
}

// Barras horizontales con escala propia (max = valor que llena la barra).
function Barras({ T, at, until, filas, top = 700, max = 40, ancho = 640, left = 70 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left, top, width:960, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale), v = f.desde != null ? klerp(f.desde, f.valor, kprog(T, f.baja, f.baja + 1.2, kEase.sale)) : f.valor * g;
      return <div key={i} style={{ marginBottom:24, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 ${f.tam || 38}px ${KF.texto}`, color:f.tinta || KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, ancho * v / max), height:f.alto || 76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 ${f.num || 70}px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{f.texto || `${kformato(v, f.dec == null ? 1 : f.dec)} %`}</div>
        </div>
      </div>; })}
  </div>;
}

// Álbum de caras: cuadrícula de caritas; las primeras `claras` de piel clara (fracción real del banco de pruebas).
function Album({ T, at, x, y, titulo, claras, total = 50, cols = 10, pct }) {
  const e = kprog(T, at, at + 0.4, kEase.sale); if (e <= 0) return null;
  const tonos = [PIEL_CLARA, '#f0c39b', '#e8b58c'], osc = [PIEL_OSCURA, '#5c3620', PIEL_MEDIA];
  const r = krng(7), orden = Array.from({ length: total }, (_, i) => i).sort(() => r() - 0.5);
  const n = Math.round(total * kprog(T, at + 0.3, at + 2.2));
  return <g transform={`translate(${x} ${y})`} opacity={e}>
    <rect x={-20} y={-80} width={cols * 82 + 30} height={Math.ceil(total / cols) * 82 + 110} rx={24} fill="#1b2438" stroke={KC.cyan} strokeWidth={5} />
    <text x={0} y={-30} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>
    <text x={cols * 82 - 10} y={-30} textAnchor="end" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.yellow}>{pct}</text>
    {orden.slice(0, n).map((k, j) => { const c = k % cols, f = Math.floor(k / cols), clara = k < claras;
      return <g key={k} transform={`translate(${c * 82 + 34} ${f * 82 + 34})`}>
        <circle r={32} fill={clara ? tonos[k % 3] : osc[k % 3]} stroke={KC.ink} strokeWidth={4} />
        <circle cx={-10} cy={-4} r={4} fill={KC.ink} /><circle cx={10} cy={-4} r={4} fill={KC.ink} />
        <path d="M -10 12 Q 0 18 10 12" stroke={KC.ink} strokeWidth={3} fill="none" />
      </g>; })}
  </g>;
}

// Foto borrosa de cámara de seguridad.
function FotoCamara({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-140} width={340} height={280} rx={12} fill="#5b6270" stroke={KC.ink} strokeWidth={8} />
    <g filter="url(#borroso)">
      <rect x={-150} y={40} width={300} height={80} fill="#40454f" />
      <circle cx={10} cy={-30} r={52} fill="#3a2a22" /><path d="M -70 120 Q -60 30 10 20 Q 80 30 90 120 Z" fill="#2a2d33" />
    </g>
    <text x={-150} y={-108} style={{ font:`700 22px ${KF.mono}` }} fill="#e8e8e8">CAM 02 · REC</text>
    <circle cx={140} cy={-115} r={9} fill={KC.red} opacity={0.4 + 0.6 * ((T * 2) % 1 < 0.5 ? 1 : 0)} />
  </g>;
}
// Licencia de manejo esquemática con cara.
function Licencia({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-130} width={420} height={260} rx={22} fill="#e9f1ff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-210} y={-130} width={420} height={50} rx={22} fill={KC.blue} />
    <text x={0} y={-95} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill="#fff">LICENCIA DE MANEJO</text>
    <rect x={-185} y={-65} width={150} height={175} rx={10} fill="#cfd8e6" stroke={KC.ink} strokeWidth={5} />
    <Cara x={-110} y={10} s={0.42} piel={PIEL_OSCURA} pelo="#1d140e" tipo="h" camisa="#4a5a70" T={T} seed={5} boca="seria" />
    {[ -40, 0, 40, 80 ].map((ly, i) => <rect key={i} x={-10} y={ly - 40} width={170 - i * 25} height={14} rx={7} fill="#9fb0c9" />)}
  </g>;
}
// Reloj de pared con aguja que gira y horas que corren.
function Reloj({ x, y, s = 1, horas = 0 }) {
  const a = horas * 360 / 12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={120} fill="#fffdf6" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-100} x2={0} y2={-84} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-60} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" transform={`rotate(${a})`} />
    <line x1={0} y1={0} x2={0} y2={-92} stroke={KC.red} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a * 12})`} />
    <circle r={10} fill={KC.ink} />
  </g>;
}
// Medidor de "veces más": ×1, ×10, ×100.
function Veces({ T, at, until, y = 980 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const pasos = [{ v: '×1', h: 20, t: at + 0.2 }, { v: '×10', h: 100, t: at + 1.2 }, { v: '×100+', h: 280, t: at + 2.2 }];
  return <div style={{ position:'absolute', left:150, top:y, width:780, height:380, zIndex:40, opacity:e.o, display:'flex', alignItems:'flex-end', justifyContent:'space-around', borderBottom:`8px solid ${KC.ink}` }}>
    {pasos.map((p, i) => { const g = kprog(T, p.t, p.t + 0.7, kEase.sale);
      return <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', opacity: T >= p.t ? 1 : 0 }}>
        <div style={{ font:`400 64px ${KF.titulo}`, color: i === 2 ? KC.red : KC.ink, marginBottom:8 }}>{p.v}</div>
        <div style={{ width:150, height:Math.max(8, p.h * g), background: i === 2 ? KC.red : i === 1 ? KC.orange : KC.mint, border:`6px solid ${KC.ink}`, borderBottom:'none', borderRadius:'14px 14px 0 0' }}></div>
      </div>; })}
  </div>;
}

function CarasPiel() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, N: CUES.Numeros, P: CUES.Pregunta, D: CUES.Datos, M: CUES.Mejora, Ni: CUES.Nist, W: CUES.Williams, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs><filter id="borroso"><feGaussianBlur stdDeviation="9" /></filter></defs>{c}</svg>;
  const horas = 30 * kprog(T, K.W + 2.6, K.W + 5.4, kEase.suave);
  const duo = (t0, final) => <>
    <Cara x={290} y={880} s={0.9} piel={PIEL_CLARA} pelo="#5a3b22" tipo="h" camisa={KC.blue} T={T} seed={1} />
    <Cara x={790} y={880} s={0.9} piel={PIEL_OSCURA} pelo="#1d140e" tipo="m" camisa={KC.orange} T={T} seed={2} />
    <Escaneo x={290} y={855} w={280} h={350} T={T} at={t0} ok={T > t0 + 1.6 ? true : null} etiqueta={T > t0 + 1.6 ? (final ? 'error: 0.3 %' : '✔ hombre') : null} />
    <Escaneo x={790} y={855} w={310} h={370} T={T} at={t0 + 0.2} ok={T > t0 + 2.6 ? false : null} etiqueta={T > t0 + 2.6 ? (final ? 'error: 34.7 %' : '✘ «hombre»') : null} />
  </>;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú y el de al lado frente al mismo programa */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.pink} />
        {svg(duo(K.G + 0.15, false))}
      </Escena>
      <Chip T={T} at={K.G + 3.8} until={K.E - 0.2} texto="a ti: 1 de cada 3 veces" x={330} y={420} tam={44} borde={KC.red} />
      <Chip T={T} at={K.G + 4.6} until={K.E - 0.2} texto="mismo programa" x={330} y={530} tam={34} borde={KC.ink} />

      {/* 2 · el estudio */}
      <Escena T={T} a={K.E} b={K.N}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{['IBM', 'Microsoft', 'Face++'].map((n, i) => <g key={n} opacity={kprog(T, K.E + 2.2 + i * 0.2, K.E + 2.5 + i * 0.2)}>
          <Programa x={200 + i * 340} y={930} s={0.85} T={T + i} pantalla="¿H o M?" nombre={n} /></g>)}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.N - 0.3} anio="2018" quien="«Gender Shades»" revista="Buolamwini y Gebru · PMLR 81" x={420} y={600} />
      <Chip T={T} at={K.E + 3.6} until={K.N - 0.3} texto="1,270 fotos de parlamentarios · 6 países" y={1150} tam={34} borde={KC.ink} />

      {/* 3 · los números */}
      <Escena T={T} a={K.N} b={K.P}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Chip T={T} at={K.N + 0.2} until={K.P - 0.2} texto="error al adivinar el género" x={340} y={420} tam={36} borde={KC.ink} />
      <Barras T={T} at={K.N + 0.4} until={K.P - 0.2} top={700} max={40} filas={[
        { valor: 0.8, etiqueta: 'hombres de piel clara (el peor de los 3)', color: KC.blue, tam: 34 },
        { valor: 34.7, etiqueta: 'mujeres de piel oscura (el peor de los 3)', color: KC.red, at: K.N + 3.4, tam: 34 }]} />

      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.D} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={290} y={1060} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 880)`}>?</text>
          <g transform={`translate(300 1120)`}><Robotito x={0} y={0} s={0.55} T={T} cara="duda" /></g>
        </>)}
      </Escena>

      {/* 5 · los datos de referencia (por dentro de la máquina) */}
      <Escena T={T} a={K.D} b={K.M}>
        <FondoCircuito T={T} />
        {svg(<>
          <Album T={T} at={K.D + 2.4} x={120} y={540} titulo="IJB-A" claras={24} total={30} cols={10} pct="79.6 % claras" />
          <Album T={T} at={K.D + 3.6} x={120} y={900} titulo="Adience" claras={26} total={30} cols={10} pct="86.2 % claras" />
        </>)}
      </Escena>
      <Chip T={T} at={K.D + 0.2} until={K.M - 0.2} texto="HIPÓTESIS" x={260} y={400} tam={44} borde={KC.yellow} color={KC.yellow} />
      <Chip T={T} at={K.D + 1.0} until={K.D + 2.4} texto="aprende de ejemplos…" x={540} y={760} tam={46} borde={KC.cyan} />

      {/* 6 · mejoraron */}
      <Escena T={T} a={K.M} b={K.Ni}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <Chip T={T} at={K.M + 0.2} until={K.Ni - 0.2} texto="mujeres de piel oscura · error" x={360} y={420} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.5} until={K.Ni - 0.2} texto="2017 → agosto de 2018" x={360} y={510} tam={30} borde={KC.ink} />
      <Barras T={T} at={K.M + 0.6} until={K.Ni - 0.2} top={680} max={40} alto={56} filas={[
        { valor: 16.97, desde: 34.7, baja: K.M + 1.6, etiqueta: 'IBM', color: KC.red, tam: 34, num: 58, alto: 56 },
        { valor: 4.1, desde: 34.5, baja: K.M + 1.9, etiqueta: 'Face++', color: KC.orange, tam: 34, num: 58, alto: 56 },
        { valor: 1.52, desde: 20.8, baja: K.M + 2.2, etiqueta: 'Microsoft', color: KC.blue, tam: 34, num: 58, alto: 56 }]} />

      {/* 7 · NIST */}
      <Escena T={T} a={K.Ni} b={K.W}>
        <FondoLunares color={KC.yellow} />
        {svg(<g opacity={kprog(T, K.Ni + 4.6, K.Ni + 5.0)}>
          <Cara x={260} y={590} s={0.55} piel={PIEL_OSCURA} pelo="#1d140e" tipo="m" camisa={KC.teal} T={T} seed={3} />
          <Cara x={820} y={590} s={0.55} piel={PIEL_MEDIA} pelo="#2a1a10" tipo="m" camisa={KC.pink} T={T} seed={4} />
          <g opacity={kprog(T, K.Ni + 5.3, K.Ni + 5.6)}>
            <line x1={390} y1={590} x2={690} y2={590} stroke={KC.red} strokeWidth={10} strokeDasharray="22 14" />
            <rect x={455} y={550} width={170} height={80} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <text x={540} y={605} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill="#fff">= ✔</text>
          </g>
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Ni + 0.2} until={K.Ni + 4.4} anio="2019" quien="NIST (EE. UU.)" revista="189 algoritmos · 18.27 millones de fotos" x={390} y={720} />
      <Chip T={T} at={K.Ni + 5.6} until={K.W - 0.2} texto="«la misma persona»… y no" x={540} y={380} tam={38} borde={KC.red} />
      <Veces T={T} at={K.Ni + 6.4} until={K.W - 0.2} y={760} />

      {/* 8 · Robert Williams */}
      <Escena T={T} a={K.W} b={K.C}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          <g opacity={kprog(T, K.W + 0.2, K.W + 0.6)}><FotoCamara x={290} y={760} s={0.9} T={T} /></g>
          <g opacity={kprog(T, K.W + 1.0, K.W + 1.4)}>
            <path d="M 470 760 L 560 760" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><path d="M 545 735 L 575 760 L 545 785" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
            <Licencia x={790} y={760} s={0.85} T={T} />
          </g>
          {T > K.W + 1.8 && <g transform={`translate(790 760) rotate(-12) scale(${klerp(2, 1, kprog(T, K.W + 1.8, K.W + 2.1, kEase.sale))})`}>
            <rect x={-200} y={-46} width={400} height={92} rx={14} fill="rgba(255,59,47,.15)" stroke={KC.red} strokeWidth={9} />
            <text y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.red}>COINCIDENCIA</text>
          </g>}
          <g opacity={kprog(T, K.W + 2.5, K.W + 2.9)}><Reloj x={300} y={1060} s={0.75} horas={horas} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.W + 0.2} until={K.C - 0.2} texto="Detroit · enero de 2020" x={330} y={470} tam={36} borde={KC.ink} />
      {T >= K.W + 2.5 && T < K.C + 0.3 && <div style={{ position:'absolute', left:470, top:1010, zIndex:41, font:`400 110px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, opacity:kprog(T, K.W + 2.5, K.W + 2.9) * (1 - kprog(T, K.C - 0.1, K.C + 0.3)) }}>{Math.round(horas)} horas</div>}
      <Chip T={T} at={K.W + 5.2} until={K.C - 0.2} texto="2024: prohibido arrestar solo por esto" x={540} y={928} tam={30} borde={KC.leaf} />

      {/* 9 · cierre: las mismas dos caras */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(duo(K.C + 0.1, true))}
      </Escena>
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="mismo programa (IBM, 2017)" x={330} y={460} tam={30} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Mismo programa… *a ti te falló más.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.N - 0.1} texto="2018: *¿hombre o mujer?*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.P - 0.1} texto="Menos de *1 %* contra casi *35 %.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.D - 0.1} texto="¿Una máquina *con favoritos?*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.M - 0.1} texto="Caras de prueba: *la mayoría, piel clara.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Ni - 0.1} texto="En siete meses: *fallaban menos.*" />
      <Subtitulo T={T} idx={6} at={K.Ni + 0.1} until={K.W - 0.1} texto="Confundir a dos: *de 10 a 100+ veces.*" />
      <Subtitulo T={T} idx={7} at={K.W + 0.1} until={K.C - 0.1} texto="Robert Williams: *30 horas detenido.*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={K.Ou - 0.1} texto="Quizá *no te ve igual.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 2.7, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 3.4, CUES.Numeros - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Numeros + 3.8, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Datos - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Datos + 0.3, CUES.Datos + 2.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Mejora + 2.4, CUES.Nist - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Nist + 1.0, CUES.Nist + 4.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Williams + 3.0, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Cierre + 2.4, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="21" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CarasPielApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CarasPiel /></CompositionStage></div>;
}
window.CarasPielApp = CarasPielApp;
