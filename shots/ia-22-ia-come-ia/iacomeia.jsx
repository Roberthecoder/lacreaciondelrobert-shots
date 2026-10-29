// Shot IA #22 · La IA que aprendió de otra IA y terminó hablando de liebres — NARRADO (N4 "imagen que se degrada" + N1 "por dentro").
// Datos: Shumailov, Shumaylov, Zhao, Papernot, Anderson y Gal, "AI models collapse when trained on recursively generated data",
// Nature 631:755–759 (2024), Example 1 (OPT-125m, wikitext2). Matiz: Gerstgrasser et al., arXiv:2404.01413 (Stanford, 2024).
// Ver guion.md y verificacion.md. Todo es esquemático; la fotocopia es una analogía.
const PAPEL = '#fffdf6', TINTA = '#1f2a6b', LIEBRE = '#b98a5a', LIEBRE2 = '#8e623a';
const COLAS = [['#1d1d22', 'negra'], ['#ffffff', 'blanca'], [KC.blue, 'azul'], [KC.red, 'roja'], [KC.yellow, 'amarilla']];

// Hoja de texto que se "fotocopia": gris 0..1 la borra, la vuelve gris y le pone manchas. chars = cuántas letras ya se escribieron.
function Hoja({ x, y, s = 1, rot = 0, titulo, colorTit = KC.cyan, lineas = [], chars = null, gris = 0, id = 'h', pie, tam = 27, children, o = 1 }) {
  const r = krng(id.length * 7 + 3);
  let resto = chars == null ? Infinity : chars;
  const fondo = mixHex(PAPEL, '#bdb8ad', gris), tinta = mixHex(TINTA, '#6b6b6b', gris), tit = mixHex(colorTit, '#9a9a9a', gris);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <defs><filter id={`f-${id}`} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={gris * 2.4} /></filter></defs>
    <rect x={-216} y={-272} width={440} height={560} rx={16} fill="rgba(0,0,0,.25)" />
    <g filter={gris > 0.02 ? `url(#f-${id})` : undefined}>
      <rect x={-220} y={-280} width={440} height={560} rx={16} fill={fondo} stroke={KC.ink} strokeWidth={8} />
      <rect x={-220} y={-280} width={440} height={76} rx={16} fill={tit} stroke={KC.ink} strokeWidth={8} />
      <text x={0} y={-228} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{titulo}</text>
      {lineas.map((l, i) => { const vis = l.slice(0, Math.max(0, Math.min(l.length, resto))); resto -= l.length;
        return <text key={i} x={-192} y={-160 + i * 40} style={{ font:`700 ${tam}px ${KF.mono}` }} fill={tinta}>{vis}</text>; })}
      {children}
      {pie && <text x={0} y={262} textAnchor="middle" style={{ font:`italic 700 19px ${KF.mono}` }} fill={mixHex('#7a6f63', '#888888', gris)}>{pie}</text>}
    </g>
    {gris > 0.05 && Array.from({ length: Math.round(70 * gris) }, (_, i) => <circle key={i} cx={-210 + r() * 420} cy={-270 + r() * 540} r={1.5 + r() * 4} fill="#3a3a3a" opacity={0.25 + r() * 0.4} />)}
  </g>;
}
// Torre de iglesia de estilo Perpendicular (inglés): almenas, pináculos y ventanas altas en punta.
function Torre({ x, y, s = 1 }) {
  const piedra = '#d9c9a3';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-230} width={140} height={230} fill={piedra} stroke={KC.ink} strokeWidth={6} />
    {[-70, -35, 0, 35].map((bx) => <rect key={bx} x={bx + 4} y={-252} width={22} height={22} fill={piedra} stroke={KC.ink} strokeWidth={5} />)}
    {[-78, 62].map((px) => <path key={px} d={`M ${px} -230 L ${px + 8} -290 L ${px + 16} -230 Z`} fill={piedra} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    {[-30, 30].map((wx) => <path key={wx} d={`M ${wx - 18} -60 L ${wx - 18} -160 Q ${wx} -195 ${wx + 18} -160 L ${wx + 18} -60 Z`} fill="#3b4a6b" stroke={KC.ink} strokeWidth={5} />)}
    {[-30, 30].map((wx) => <line key={wx} x1={wx} y1={-60} x2={wx} y2={-170} stroke={piedra} strokeWidth={4} />)}
    <path d="M -20 0 L -20 -34 Q 0 -54 20 -34 L 20 0 Z" fill="#5b3a22" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Basílica con cúpula (esquemática).
function Basilica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-60} width={240} height={60} fill="#efe3c4" stroke={KC.ink} strokeWidth={6} />
    {[-90, -50, -10, 30, 70].map((cx) => <rect key={cx} x={cx} y={-56} width={14} height={56} fill="#d9c9a3" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-60} y={-90} width={120} height={30} fill="#efe3c4" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 -90 Q -60 -170 0 -175 Q 60 -170 60 -90 Z" fill="#9fc3b5" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={-175} x2={0} y2={-205} stroke={KC.ink} strokeWidth={6} /><line x1={-10} y1={-195} x2={10} y2={-195} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Liebre (jackrabbit) con orejas largas y su cola de color; brinca.
function Liebre({ x, y, s = 1, cola = KC.white, T = 0, fase = 0, brinco = 1, voltea = false }) {
  const h = -Math.abs(Math.sin(T * 5 + fase)) * 34 * brinco, inc = Math.sin(T * 5 + fase) * 6 * brinco;
  return <g transform={`translate(${x} ${y + h}) scale(${voltea ? -s : s} ${s}) rotate(${-inc})`}>
    <ellipse cx={0} cy={6} rx={60} ry={10} fill="rgba(0,0,0,.18)" transform={`translate(0 ${-h})`} />
    <ellipse cx={-30} cy={-14} rx={30} ry={22} fill={LIEBRE2} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-34} rx={58} ry={34} fill={LIEBRE} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={34} cy={-6} rx={20} ry={8} fill={LIEBRE2} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={30} cy={-88} rx={10} ry={44} fill={LIEBRE} stroke={KC.ink} strokeWidth={5} transform="rotate(-12 30 -60)" />
    <ellipse cx={48} cy={-86} rx={10} ry={44} fill={LIEBRE} stroke={KC.ink} strokeWidth={5} transform="rotate(14 48 -60)" />
    <ellipse cx={30} cy={-88} rx={4} ry={30} fill="#f1a9a0" transform="rotate(-12 30 -60)" />
    <circle cx={50} cy={-52} r={26} fill={LIEBRE} stroke={KC.ink} strokeWidth={6} />
    <circle cx={58} cy={-58} r={5} fill={KC.ink} /><circle cx={74} cy={-48} r={4} fill="#5b3a22" />
    <circle cx={-60} cy={-40} r={17} fill={cola} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Fotocopiadora: la luz barre el vidrio y saca la copia por la derecha.
function Fotocopiadora({ x, y, s = 1, T = 0, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-60} width={460} height={230} rx={22} fill="#dfe3ea" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-110} width={500} height={56} rx={14} fill="#c7ccd6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-210} y={-30} width={420} height={36} rx={8} fill="#2b3445" stroke={KC.ink} strokeWidth={5} />
    {luz > 0 && <rect x={-210 + ((T * 260) % 400)} y={-30} width={22} height={36} fill={KC.mint} opacity={0.9} />}
    {[0, 1, 2].map((k) => <rect key={k} x={-200} y={40 + k * 40} width={300} height={26} rx={6} fill="#c7ccd6" stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={160} cy={60} r={16} fill={luz > 0 ? KC.mint : '#7f8ba3'} stroke={KC.ink} strokeWidth={5} />
    <rect x={130} y={100} width={70} height={40} rx={8} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
    <rect x={230} y={10} width={90} height={18} rx={4} fill="#c7ccd6" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Curva de campana: sigma (1 = la original) se encoge; las colas ("lo raro") se pintan de rosa.
function Campana({ sigma = 1, x0 = 540, base = 1080, px = 140, alt = 300, colas = 1, color = KC.cyan }) {
  const f = (u) => alt * Math.min(2.6, Math.pow(1 / sigma, 0.75)) * Math.exp(-(u * u) / (2 * sigma * sigma));
  const pts = []; for (let u = -3.2; u <= 3.2001; u += 0.05) pts.push([x0 + u * px, base - f(u)]);
  const linea = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const cola = (a, b) => { const q = pts.filter(([X]) => X >= x0 + a * px && X <= x0 + b * px); if (!q.length) return '';
    return `M ${q[0][0]} ${base} L ` + q.map((p) => p.join(' ')).join(' L ') + ` L ${q[q.length - 1][0]} ${base} Z`; };
  return <g>
    <line x1={x0 - 3.4 * px} y1={base} x2={x0 + 3.4 * px} y2={base} stroke={KC.texto} strokeWidth={5} strokeOpacity=".6" />
    <path d={linea + ` L ${x0 + 3.2 * px} ${base} L ${x0 - 3.2 * px} ${base} Z`} fill={color} fillOpacity=".18" />
    <path d={cola(-3.2, -1.6)} fill={KC.pink} opacity={colas} /><path d={cola(1.6, 3.2)} fill={KC.pink} opacity={colas} />
    <path d={linea} stroke={color} strokeWidth={8} fill="none" strokeLinejoin="round" />
  </g>;
}
// Globo "internet" con meridianos.
function Globo({ x, y, r = 230, T = 0 }) {
  const g = (T * 20) % 360;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#7fd3ff" stroke={KC.ink} strokeWidth={9} />
    {[0.35, 0.7].map((k) => <ellipse key={k} rx={r * k * Math.abs(Math.cos((g + k * 90) * Math.PI / 180)) + 4} ry={r} fill="none" stroke={KC.ink} strokeWidth={4} strokeOpacity=".5" />)}
    {[-0.5, 0, 0.5].map((k) => <ellipse key={k} cy={k * r} rx={r * Math.sqrt(1 - k * k)} ry={r * 0.12} fill="none" stroke={KC.ink} strokeWidth={4} strokeOpacity=".5" />)}
  </g>;
}
// Hojita con sello "IA" (texto hecho por IA) o sin sello (texto humano).
function Hojita({ x, y, s = 1, ia = true, o = 1, color }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-30} y={-38} width={60} height={76} rx={7} fill={color || (ia ? '#e9e6df' : PAPEL)} stroke={KC.ink} strokeWidth={5} />
    {[-20, -6, 8].map((ly) => <line key={ly} x1={-18} y1={ly} x2={18} y2={ly} stroke={TINTA} strokeWidth={3} opacity=".5" />)}
    {ia && <g transform="rotate(-14)"><rect x={-24} y={6} width={48} height={26} rx={5} fill="rgba(255,59,47,.15)" stroke={KC.red} strokeWidth={4} />
      <text y={27} textAnchor="middle" style={{ font:`400 22px ${KF.titulo}` }} fill={KC.red}>IA</text></g>}
  </g>;
}
// Pila de hojas (para reemplazar vs. acumular). capas = [{ color, ia }] de abajo hacia arriba.
function Pila({ x, base, capas, T, at0, paso, h = 46 }) {
  return <g>{capas.map((c, i) => { const e = kprog(T, at0 + i * paso, at0 + i * paso + 0.35, kEase.sale); if (e <= 0) return null;
    return <g key={i} transform={`translate(${x} ${base - i * h - (1 - e) * 120})`} opacity={e}>
      <rect x={-170} y={-h} width={340} height={h - 6} rx={8} fill={c.color} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-h / 2 + 7} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{c.texto}</text>
    </g>; })}</g>;
}

const TXT = {
  entrada: ['…las torres de las', 'iglesias parroquiales', 'se diseñaron según', 'los primeros ejemplos', 'del estilo', 'Perpendicular.'],
  gen1: ['…como la Basílica de', 'San Pedro en Roma o', 'la Basílica de San', 'Pedro en Buenos Aires.'],
  gen5: ['…traducido a más de', '100 idiomas: inglés,', 'francés, alemán,', 'italiano, español,', 'portugués, neerlandés,', 'sueco, noruego,', 'polaco, húngaro,', 'eslovaco, lituano…'],
  gen9: ['…hogar de algunas de', 'las mayores', 'poblaciones de liebres', 'de cola negra, liebres', 'de cola blanca, liebres', 'de cola azul, liebres', 'de cola roja, liebres', 'de cola amarill—'],
  gen9en: ['…populations of', 'black-tailed', 'jackrabbits, white-', 'tailed jackrabbits,', 'blue-tailed', 'jackrabbits, red-', 'tailed jackrabbits,', 'yellow-'],
};
const largo = (a) => a.reduce((s, l) => s + l.length, 0);

function IAComeIA() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fotocopia, E: CUES.Estudio, Gn: CUES.Generaciones, L: CUES.Liebres, P: CUES.Pregunta, C: CUES.Colas, I: CUES.Internet, A: CUES.Acumular, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sub = (i, f) => (window.SUBS && window.SUBS[i]) ? window.SUBS[i].at : f;
  const S1 = sub(1, K.G + 0.655 * (K.F - K.G)), S4 = sub(4, K.E + 0.52 * (K.Gn - K.E)), S9 = sub(9, K.C + 0.56 * (K.I - K.C));
  const S5b = K.Gn + 0.68 * (K.L - K.Gn); // "en la quinta…" dentro de la línea 5
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // gancho: la hoja Gen 9 se escribe sola desde el cuadro 0
  const chars9 = largo(TXT.gen9) * kprog(T, K.G, K.G + 4.2);
  const atras = kprog(T, S1 - 0.2, S1 + 0.8, kEase.suave);   // la cámara retrocede: aparece el texto de entrada
  // fotocopias
  const copias = [0, 1, 2, 3].map((k) => kprog(T, K.F + 0.4 + k * 0.6, K.F + 0.8 + k * 0.6, kEase.sale));
  // generaciones
  const gen = T < S5b ? 1 : 5;
  const chars5 = largo(TXT.gen5) * kprog(T, S5b, S5b + 1.8);
  // colas: 9 generaciones que encogen la campana
  const pc = kprog(T, K.C + 0.6, S9 - 0.3, kEase.suave), genC = Math.round(pc * 9), sigma = klerp(1, 0.32, pc);
  // internet: hojitas con sello IA que llenan el globo
  const rI = krng(8), puntos = Array.from({ length: 26 }, () => { const a = rI() * Math.PI * 2, d = Math.sqrt(rI()) * 170; return [Math.cos(a) * d, Math.sin(a) * d]; });
  const nI = Math.round(26 * kprog(T, K.I + 0.4, K.I + 3.0, kEase.suave));
  // acumular: 5 pasos
  const pasoA = 0.7, a0 = K.A + 0.9, kA = Math.max(0, Math.min(4, Math.floor((T - a0) / pasoA)));
  const reempl = [{ color: mixHex('#9fd2ff', '#9a9a9a', kA / 4), texto: kA === 0 ? 'humanos' : `IA gen ${kA}` }];
  const acum = [{ color: '#9fd2ff', texto: 'humanos' }, { color: '#e9e6df', texto: 'IA gen 1' }, { color: '#e9e6df', texto: 'IA gen 2' }, { color: '#e9e6df', texto: 'IA gen 3' }, { color: '#e9e6df', texto: 'IA gen 4' }];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la hoja de la generación 9 llena de liebres */}
      <Escena T={T} a={K.G} b={K.F} zoom={0}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={atras}>
            <Hoja id="ent" x={790} y={klerp(900, 820, atras)} s={0.72} rot={4} titulo="texto de entrada" colorTit={KC.mint} lineas={TXT.entrada} tam={25} pie="(traducido del inglés)">
              <Torre x={0} y={250} s={0.62} />
            </Hoja>
            <path d={`M 640 ${1110} Q 540 1180 440 1110`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="18 12" />
            <path d="M 452 1090 L 436 1112 L 462 1122" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
          <Hoja id="g9" x={klerp(330, 290, atras)} y={klerp(860, 820, atras)} s={klerp(0.98, 0.72, atras)} rot={-3} titulo="Generación 9" colorTit={KC.pink} lineas={TXT.gen9} chars={chars9} tam={25} pie="(traducido del inglés)" />
          {COLAS.map(([c], i) => { const e = kprog(T, K.G + 0.2 + i * 0.55, K.G + 0.6 + i * 0.55, kEase.sale); if (e <= 0) return null;
            const x = klerp(330, 120 + i * 150 + (i > 2 ? 60 : 0), e), y = klerp(860, 1120, e);
            return <g key={i} opacity={1 - atras * 0.25}><Liebre x={x} y={y} s={0.62} cola={c} T={T} fase={i * 1.3} /></g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={S1 + 0.6} until={K.F - 0.2} texto="9 generaciones después" x={540} y={470} tam={30} borde={KC.ink} />

      {/* 2 · analogía: fotocopia de fotocopia */}
      <Escena T={T} a={K.F} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Fotocopiadora x={420} y={680} s={1.0} T={T} luz={1} />
          {copias.map((e, k) => e > 0 && <g key={k} transform={`translate(${klerp(660, 160 + k * 253, e)} ${klerp(700, 1000, e)})`}>
            <Hoja id={`c${k}`} x={0} y={0} s={0.5} rot={(k - 1.5) * 3} titulo={k === 0 ? 'original' : `copia ${k}`} colorTit={KC.mint} gris={k * 0.3} lineas={TXT.entrada.slice(0, 3)}>
              <Torre x={0} y={250} s={0.62} />
            </Hoja></g>)}
        </>)}
      </Escena>
      <Chip T={T} at={K.F + 0.2} until={K.E - 0.2} texto="analogía" x={260} y={470} tam={34} borde={KC.ink} />

      {/* 3 · el estudio: cada generación aprende de la anterior */}
      <Escena T={T} a={K.E} b={K.Gn}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[0, 1, 2, 3].map((k) => { const e = kprog(T, S4 - 0.2 + k * 0.45, S4 + 0.2 + k * 0.45, kEase.sale); if (e <= 0) return null;
          const x = 150 + k * 260;
          return <g key={k} opacity={e}>
            <Robotito x={x} y={900} s={0.48} T={T + k} cara={k === 3 ? 'duda' : 'feliz'} color={mixHex(KC.cyan, '#9a9a9a', k * 0.25)} />
            <text x={x} y={1020} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{k === 3 ? 'Gen 3 …' : `Gen ${k}`}</text>
            {k < 3 && <g opacity={kprog(T, S4 + 0.1 + k * 0.45, S4 + 0.4 + k * 0.45)}>
              <Hojita x={x + 130 + Math.sin(T * 4 + k) * 8} y={820} s={0.8} ia />
              <path d={`M ${x + 70} 880 L ${x + 190} 880`} stroke={KC.ink} strokeWidth={7} /><path d={`M ${x + 176} 866 L ${x + 194} 880 L ${x + 176} 894`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
            </g>}
          </g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={S4 - 0.3} anio="2024" quien="Oxford · Cambridge · Imperial · Toronto · Edimburgo" revista="Shumailov, Shumaylov, Zhao, Papernot, Anderson y Gal · Nature" y={760} />
      <Chip T={T} at={S4 + 0.4} until={K.Gn - 0.2} texto="modelo pequeño: OPT-125m (Meta)" x={600} y={720} tam={32} borde={KC.ink} />
      <Chip T={T} at={S4 + 1.6} until={K.Gn - 0.2} texto="aprende de los textos de la anterior" x={540} y={1105} tam={32} borde={KC.ink} />

      {/* 4 · generaciones 1 y 5 */}
      <Escena T={T} a={K.Gn} b={K.L}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {gen === 1 && <Hoja id="g1" x={700} y={870} s={0.9} rot={2} titulo="Generación 1" colorTit={KC.orange} gris={0.12} lineas={TXT.gen1} tam={25} pie="(traducido del inglés)">
            <Basilica x={0} y={220} s={0.85} />
          </Hoja>}
          {gen === 5 && <Hoja id="g5" x={700} y={870} s={0.9} rot={-2} titulo="Generación 5" colorTit={KC.lilac} gris={0.4} lineas={TXT.gen5} chars={chars5} tam={24} pie="(traducido del inglés)" />}
          {gen === 1 && <g opacity={kprog(T, K.Gn + 1.4, K.Gn + 1.9)}>
            <g transform="translate(200 840)"><path d="M 0 0 C -40 -50 -40 -90 0 -100 C 40 -90 40 -50 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle cy={-66} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>
            <text x={200} y={890} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>Roma</text>
          </g>}
          {gen === 1 && <g opacity={kprog(T, K.Gn + 2.4, K.Gn + 2.9)}>
            <g transform="translate(220 1060)"><path d="M 0 0 C -40 -50 -40 -90 0 -100 C 40 -90 40 -50 0 0 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={6} /><circle cy={-66} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>
            <text x={220} y={1110} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>¿Buenos Aires?</text>
          </g>}
        </>)}
      </Escena>
      <Chip T={T} at={K.Gn + 0.15} until={K.L - 0.2} texto={`generación ${gen}`} x={700} y={330} tam={40} borde={gen === 1 ? KC.orange : KC.lilac} />
      {gen === 5 && ['inglés', 'francés', 'alemán', 'italiano', 'español'].map((t, i) =>
        <Chip key={t} T={T} at={S5b + 0.3 + i * 0.3} until={K.L - 0.2} texto={t} x={190 + (i % 2) * 40} y={760 + i * 92} tam={32} borde={KC.lilac} />)}

      {/* 5 · generación 9: las liebres de colores */}
      <Escena T={T} a={K.L} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Hoja id="g9en" x={330} y={620} s={0.68} rot={-3} titulo="Gen 9 · original" colorTit={KC.pink} gris={0.4} lineas={TXT.gen9en} tam={25} pie="(texto real del estudio, en inglés)" />
          {COLAS.map(([c], i) => { const at = K.L + 0.2 + i * 0.55, e = kprog(T, at, at + 0.4, kEase.rebote); if (e <= 0) return null;
            return <g key={i} transform={`translate(${130 + i * 205} 1010) scale(${e})`}><Liebre x={0} y={0} s={0.7} cola={c} T={T} fase={i} /></g>; })}
        </>)}
      </Escena>
      {COLAS.map(([c, n], i) => <Chip key={n} T={T} at={K.L + 0.4 + i * 0.55} until={K.P - 0.2} texto={n} x={130 + i * 205} y={1095} tam={26} borde={c === '#ffffff' ? KC.ink : c} fondo={c === '#1d1d22' || c === KC.blue || c === KC.red ? c : KC.paper} color={c === '#1d1d22' || c === KC.blue || c === KC.red ? KC.texto : KC.ink} />)}

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.C} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>

      {/* 7 · por dentro: las colas desaparecen */}
      <Escena T={T} a={K.C} b={K.I}>
        <FondoCircuito T={T} />
        {svg(<>
          <g opacity={kprog(T, K.C + 0.2, K.C + 0.6) * (1 - pc)}><Campana sigma={1} colas={0} color="rgba(246,243,236,.6)" base={1100} /></g>
          <Campana sigma={sigma} colas={1 - pc} base={1100} />
          {T > S9 && [[-2.6, 0.32], [2.4, 0.5], [-1.9, 0.62], [2.9, 0.2], [1.8, 0.75]].map(([u, h], i) => { const e = kprog(T, S9 + 0.2 + i * 0.25, S9 + 0.45 + i * 0.25, kEase.rebote);
            return <circle key={i} cx={540 + u * 140} cy={1100 - h * 300} r={18 * e} fill={KC.red} stroke={KC.ink} strokeWidth={4} />; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.4} until={K.I - 0.2} texto={`generación ${genC}`} x={600} y={560} tam={38} borde={KC.cyan} />
      <Etq T={T} at={K.C + 0.8} until={K.C + 0.8 + (S9 - K.C) * 0.55} x={170} y={960} texto="lo raro" color={KC.pink} lado="der" tam={36} />
      <Etq T={T} at={K.C + 0.8} until={K.C + 0.8 + (S9 - K.C) * 0.55} x={910} y={960} texto="lo raro" color={KC.pink} lado="izq" tam={36} />
      <Chip T={T} at={S9 + 0.5} until={K.I - 0.2} texto="errores heredados" x={540} y={680} tam={38} borde={KC.red} />
      <Chip T={T} at={K.C + 1.0} until={K.I - 0.2} texto="esquema" x={900} y={1150} tam={24} borde={KC.texto} />

      {/* 8 · internet se llena de texto de IA */}
      <Escena T={T} a={K.I} b={K.A}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Globo x={360} y={800} r={230} T={T} />
          {puntos.slice(0, nI).map(([dx, dy], i) => <Hojita key={i} x={360 + dx} y={800 + dy} s={0.55} ia />)}
          <g opacity={kprog(T, K.I + 2.6, K.I + 3.2)}>
            <path d="M 560 960 Q 700 1060 760 1000" stroke={KC.ink} strokeWidth={9} fill="none" strokeDasharray="20 12" />
            <path d="M 742 990 L 764 998 L 756 1020" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
            <Robotito x={870} y={1000} s={0.55} T={T} cara="duda" color={mixHex(KC.cyan, '#9a9a9a', 0.4)} />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.I + 0.3} until={K.A - 0.2} texto="internet" x={360} y={510} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.I + 3.0} until={K.A - 0.2} texto="próxima IA" x={860} y={1115} tam={34} borde={KC.ink} />

      {/* 9 · el matiz: acumular en vez de reemplazar */}
      <Escena T={T} a={K.A} b={K.Ci}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <Pila x={270} base={1080} capas={reempl} T={T} at0={a0} paso={pasoA} h={66} />
          <Pila x={810} base={1080} capas={acum} T={T} at0={a0} paso={pasoA} h={66} />
          <line x1={540} y1={640} x2={540} y2={1090} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 12" opacity=".4" />
        </>)}
      </Escena>
      <Chip T={T} at={K.A + 0.3} until={K.Ci - 0.2} texto="reemplazar" x={270} y={690} tam={38} borde={KC.red} />
      <Chip T={T} at={K.A + 0.5} until={K.Ci - 0.2} texto="acumular" x={810} y={690} tam={38} borde={KC.mint} />
      <Chip T={T} at={a0 + 4 * pasoA + 0.3} until={K.Ci - 0.2} texto="colapsa ✗" x={270} y={880} tam={40} borde={KC.red} />
      <Chip T={T} at={a0 + 4 * pasoA + 0.5} until={K.Ci - 0.2} texto="no colapsa ✔" x={810} y={590} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.A + 0.6} until={K.Ci - 0.2} texto="Gerstgrasser et al. · Stanford · 2024" x={540} y={1150} tam={28} borde={KC.ink} />

      {/* 10 · cierre: la misma hoja, y la IA frente a su espejo */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Hoja id="g9b" x={300} y={820} s={0.82} rot={-3} titulo="Generación 9" colorTit={KC.pink} lineas={TXT.gen9} tam={25} gris={0.25} pie="(traducido del inglés)" />
          {COLAS.map(([c], i) => <Liebre key={i} x={110 + i * 190} y={1130} s={0.5} cola={c} T={T} fase={i * 1.1} />)}
          <g opacity={kprog(T, K.Ci + 1.0, K.Ci + 1.6)}>
            <rect x={640} y={720} width={340} height={360} rx={30} fill="#cfe9f5" stroke={KC.ink} strokeWidth={9} />
            {[1, 0.7, 0.49, 0.34].map((k, i) => <g key={i} opacity={1 - i * 0.22}><Robotito x={810} y={930} s={0.55 * k} T={T + i * 0.3} cara="duda" color={mixHex(KC.cyan, '#9a9a9a', i * 0.3)} /></g>)}
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ci + 1.8} until={K.Ou} texto="copias de copias" x={470} y={470} tam={36} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={S1 - 0.1} texto="No está obsesionada: *es la generación 9.*" />
      <Subtitulo T={T} idx={1} at={S1} until={K.F - 0.1} texto="Le pidieron seguir: *torres de iglesias.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.E - 0.1} texto="Fotocopia de fotocopia: *cada copia pierde.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={S4 - 0.1} texto="Oxford y Cambridge · *Nature, 2024.*" />
      <Subtitulo T={T} idx={4} at={S4} until={K.Gn - 0.1} texto="Cada una aprende *de la anterior.*" />
      <Subtitulo T={T} idx={5} at={K.Gn + 0.1} until={K.L - 0.1} texto={gen === 1 ? 'Gen 1: *¿San Pedro en Buenos Aires?*' : 'Gen 5: *listas de idiomas.*'} />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.P - 0.1} texto="Gen 9: *liebres de colores.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.C - 0.1} texto="¿Por qué *se descompone?*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={S9 - 0.1} texto="Lo raro *se olvida.*" />
      <Subtitulo T={T} idx={9} at={S9} until={K.I - 0.1} texto="Y se cuelan *errores heredados.*" />
      <Subtitulo T={T} idx={10} at={K.I + 0.1} until={K.A - 0.1} texto="IA en internet → *datos contaminados.*" />
      <Subtitulo T={T} idx={11} at={K.A + 0.1} until={K.Ci - 0.1} texto="Si sumas sin borrar: *no colapsa.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una IA que aprendió *de copias de copias.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Fotocopia + 0.4, CUES.Estudio - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [S4 + 0.3, CUES.Generaciones - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Generaciones + 0.8, CUES.Liebres - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Liebres + 0.6, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Colas + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [S9 + 0.6, CUES.Internet - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Internet + 0.8, CUES.Acumular - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Acumular + 3.6, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="22" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function IAComeIAApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><IAComeIA /></CompositionStage></div>;
}
window.IAComeIAApp = IAComeIAApp;
