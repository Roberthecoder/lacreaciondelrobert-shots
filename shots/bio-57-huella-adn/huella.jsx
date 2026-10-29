// Shot Biotecnológico #57 · La huella de ADN: tú contra el de al lado — NARRADO (N2 el número + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (bandas, bloques y letras no son la secuencia real).
const PIEL = '#f1b48f', BANDA = '#16233a', PELICULA = '#bcd3e6', ORO = KC.gold2;

function SvgH({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// posiciones de bandas (0..1, de arriba abajo), deterministas
function hBandas(seed, n = 10) {
  const R = krng(seed); const out = [];
  for (let i = 0; i < n; i++) out.push(0.05 + R() * 0.9);
  return out.sort((a, b) => a - b);
}
const B_MAMA = hBandas(11, 10), B_PAPA = hBandas(23, 10);
const B_HIJA = [...B_MAMA.filter((_, i) => i % 2 === 0), ...B_PAPA.filter((_, i) => i % 2 === 1)].sort((a, b) => a - b);
const B_TU = hBandas(41, 11), B_LADO = hBandas(57, 11), B_GEMELO = hBandas(73, 11);
const B_CRIMEN = hBandas(91, 9), B_SOSP = hBandas(103, 9);

// Persona esquemática (cabeza + torso + brazos), origen en los pies.
function Persona({ x, y, s = 1, ropa = KC.blue, pelo = KC.ink, mece: m = 0, sonrisa = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m})`}>
    <path d="M -120 0 L -110 -250 Q -100 -330 0 -335 Q 100 -330 110 -250 L 120 0 Z" fill={ropa} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -110 -250 Q -170 -170 -150 -60" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M -110 -250 Q -170 -170 -150 -60" stroke={ropa} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M 110 -250 Q 170 -170 150 -60" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M 110 -250 Q 170 -170 150 -60" stroke={ropa} strokeWidth={20} fill="none" strokeLinecap="round" />
    <rect x={-26} y={-370} width={52} height={50} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-445} r={88} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -88 -460 Q -80 -545 0 -540 Q 85 -545 90 -465 Q 40 -500 -88 -460 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-30} cy={-440} r={9} fill={KC.ink} /><circle cx={30} cy={-440} r={9} fill={KC.ink} />
    {sonrisa && <path d="M -30 -400 Q 0 -378 30 -400" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
  </g>;
}
// Carril de un gel / película: bandas horizontales. p = 0..1 cuánto se ha revelado; resalta(i) → dorado.
function Carril({ x, y, w = 96, h = 560, bandas, p = 1, fondo = 'rgba(255,255,255,.35)', color = BANDA, resalta, etq, etqColor = KC.ink }) {
  return <g>
    <rect x={x - w / 2} y={y} width={w} height={h} rx={10} fill={fondo} stroke={KC.ink} strokeWidth={4} />
    {bandas.map((b, i) => { const o = kclamp(p * bandas.length - i, 0, 1), r = resalta && resalta(i, b);
      return <rect key={i} x={x - w / 2 + 8} y={y + b * h - 7} width={w - 16} height={14} rx={6} fill={r ? ORO : color} opacity={o * (r ? 1 : 0.85)} stroke={r ? KC.ink : 'none'} strokeWidth={3} />; })}
    {etq && <text x={x} y={y + h + 46} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={etqColor}>{etq}</text>}
  </g>;
}
// Código de barras horizontal (bandas como barras verticales) — tu huella.
function Barras({ x, y, w = 360, h = 110, bandas, p = 1, color = KC.ink, fondo = '#fff' }) {
  return <g>
    <rect x={x - w / 2} y={y} width={w} height={h} rx={12} fill={fondo} stroke={KC.ink} strokeWidth={6} />
    {bandas.map((b, i) => <rect key={i} x={x - w / 2 + 14 + b * (w - 40)} y={y + 14} width={12} height={h - 28} fill={color} opacity={kclamp(p * bandas.length - i, 0, 1)} />)}
  </g>;
}
// Bloques repetidos de un minisatélite (la misma "frase" en fila). n = cuántos se ven (puede ser fraccional).
const FRASE = ['G', 'G', 'G', 'C', 'A', 'G', 'G'];
const LETRA_COLOR = { G: KC.mint, C: KC.cyan, A: KC.pink, T: KC.yellow };
function Bloques({ x, y, n, ancho = 104, alto = 60, borde = KC.ink, letras = true, tam = 18 }) {
  const out = [];
  for (let i = 0; i < Math.ceil(n); i++) {
    const o = kclamp(n - i, 0, 1), bx = x + i * (ancho + 6);
    out.push(<g key={i} opacity={o} transform={`translate(${bx} ${y + (1 - o) * -40})`}>
      <rect x={0} y={-alto / 2} width={ancho} height={alto} rx={10} fill={ORO} stroke={borde} strokeWidth={5} />
      {letras && FRASE.map((l, k) => <text key={k} x={8 + k * ((ancho - 16) / FRASE.length) + (ancho - 16) / FRASE.length / 2} y={tam / 2.8} textAnchor="middle" style={{ font:`700 ${tam}px ${KF.mono}` }} fill={KC.ink}>{l}</text>)}
    </g>);
  }
  return <g>{out}</g>;
}
// Tramo de ADN plano (dos rieles con escalones de colores) de x0 a x1.
function Riel({ x0, x1, y, alto = 50, T = 0 }) {
  const n = Math.max(2, Math.floor((x1 - x0) / 22));
  const cols = [KC.pink, KC.cyan, KC.yellow, KC.mint];
  return <g>
    {Array.from({ length: n }, (_, i) => <line key={i} x1={x0 + i * 22 + 11} x2={x0 + i * 22 + 11} y1={y - alto / 2} y2={y + alto / 2} stroke={cols[i % 4]} strokeWidth={8} />)}
    <line x1={x0} x2={x1} y1={y - alto / 2} y2={y - alto / 2} stroke={KC.texto} strokeWidth={8} />
    <line x1={x0} x2={x1} y1={y + alto / 2} y2={y + alto / 2} stroke={KC.texto} strokeWidth={8} />
  </g>;
}
function Tijeras({ x, y, s = 1, abre = 0, rot = 0 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 120 -8 L 120 8 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={5} /><circle cx={-40} cy={0} r={24} fill="none" stroke={KC.red} strokeWidth={12} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 120 -8 L 120 8 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={5} /><circle cx={-40} cy={0} r={24} fill="none" stroke={KC.red} strokeWidth={12} /></g>
    <circle r={7} fill={KC.ink} />
  </g>;
}
function Tubo({ x, y, s = 1, sangre = 1, etq, tapa = KC.violet, glow = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 && <rect x={-46} y={-190} width={92} height={260} rx={40} fill={KC.white} opacity={0.5 * glow} />}
    <rect x={-26} y={-150} width={52} height={200} rx={24} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-20} y={50 - 150 * sangre} width={40} height={150 * sangre - 6} rx={18} fill="#c81d3a" />
    <rect x={-32} y={-178} width={64} height={36} rx={8} fill={tapa} stroke={KC.ink} strokeWidth={6} />
    {etq && <g><rect x={-30} y={-110} width={60} height={60} rx={6} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />{etq}</g>}
  </g>;
}
function Maleta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -36 -120 L -36 -150 L 36 -150 L 36 -120" stroke={KC.ink} strokeWidth={12} fill="none" />
    <rect x={-90} y={-120} width={180} height={130} rx={18} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <line x1={-90} x2={90} y1={-60} y2={-60} stroke={KC.ink} strokeWidth={5} opacity=".5" />
  </g>;
}
function Sello({ x, y, texto, color = KC.red, p = 1, rot = -12, tam = 64 }) {
  if (p <= 0) return null;
  const s = klerp(2.2, 1, kEase.sale(kclamp(p, 0, 1)));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={kclamp(p * 3, 0, 1)}>
    <rect x={-texto.length * tam * 0.3 - 30} y={-tam * 0.75} width={texto.length * tam * 0.6 + 60} height={tam * 1.5} rx={16} fill="none" stroke={color} strokeWidth={10} />
    <text x={0} y={tam * 0.36} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:'.04em' }} fill={color}>{texto}</text>
  </g>;
}
// Electroferograma de un perfil STR moderno: picos de colores que crecen (p = 0..1).
function Picos({ x, y, w = 820, h = 300, p = 1 }) {
  const R = krng(8), cols = [KC.blue, KC.mint, KC.yellow, KC.red];
  const picos = Array.from({ length: 16 }, (_, i) => ({ u: 0.04 + (i / 16) * 0.92 + R() * 0.03, a: 0.45 + R() * 0.55, c: cols[i % 4] }));
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={x + 20} x2={x + w - 20} y1={y + h - 30} y2={y + h - 30} stroke={KC.ink} strokeWidth={3} opacity=".4" />
    {picos.map((k, i) => { const g = kclamp(p * 16 - i, 0, 1), ph = (h - 60) * k.a * kEase.sale(g), px = x + 20 + k.u * (w - 40);
      return <path key={i} d={`M ${px - 22} ${y + h - 30} Q ${px - 6} ${y + h - 30} ${px} ${y + h - 30 - ph} Q ${px + 6} ${y + h - 30} ${px + 22} ${y + h - 30}`} fill={k.c} fillOpacity=".55" stroke={k.c} strokeWidth={5} />; })}
  </g>;
}
function Hisopo({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-8} y={0} width={16} height={300} rx={8} fill="#f6f3ec" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-20} rx={30} ry={48} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={6} cy={-30} r={9} fill="#b5523b" opacity=".8" />
  </g>;
}
// Barra de 1000 cuadritos (40 × 25) con 4 distintos (0.4 %).
const DISTINTOS = [212, 487, 618, 903];
function MilCuadros({ T, x, y, w = 900, at = 0, vuela = 0, destino = [540, 900] }) {
  const c = 40, f = 25, cw = w / c, out = [];
  const llenado = kprog(T, at, at + 1.0);
  for (let i = 0; i < c * f; i++) {
    if (i / (c * f) > llenado) break;
    const cx = x + (i % c) * cw, cy = y + Math.floor(i / c) * cw, rosa = DISTINTOS.includes(i);
    if (rosa) {
      const late = 0.5 + 0.5 * Math.sin(T * 9 + i);
      const px = klerp(cx, destino[0] + (DISTINTOS.indexOf(i) - 1.5) * 40, vuela), py = klerp(cy, destino[1], vuela);
      out.push(<rect key={i} x={px - 2} y={py - 2} width={cw + 4} height={cw + 4} rx={4} fill={KC.pink} stroke={KC.ink} strokeWidth={3} opacity={0.7 + 0.3 * late} />);
    } else out.push(<rect key={i} x={cx + 2} y={cy + 2} width={cw - 4} height={cw - 4} rx={3} fill="rgba(22,18,15,.28)" opacity={1 - vuela * 0.7} />);
  }
  return <g>{out}</g>;
}
// Caja de luz con película de autorradiografía.
function CajaLuz({ x, y, w, h, luz = 1, children }) {
  return <g>
    <rect x={x - 26} y={y - 26} width={w + 52} height={h + 52} rx={20} fill="#6b7280" stroke={KC.ink} strokeWidth={10} />
    <rect x={x} y={y} width={w} height={h} fill={mixHex('#3a4150', '#fffbe8', luz)} />
    {children}
    <rect x={x - 26} y={y + h + 26} width={w + 52} height={40} rx={10} fill="#4b5563" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

function Huella() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cl: CUES.Clave, Pl: CUES.Placa, Ba: CUES.Bandas, Mi: CUES.Minisatelite, Re: CUES.Repeticiones, Pa: CUES.Patron, Pr: CUES.Pregunta,
    In: CUES.Inmigracion, Io: CUES.Inocente, Pi: CUES.Pitchfork, St: CUES.STR, Ge: CUES.Gemelos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const respira = (k = 1) => Math.sin(T * 1.6 + k) * 2;

  // película: carriles de la familia (mamá · hija · papá)
  const film = { x: 140, y: 470, w: 560, h: 700 };
  const pelBaja = kprog(T, K.Pl + 0.3, K.Pl + 1.6, kEase.sale);
  const revela = kprog(T, K.Pl + 2.0, K.Pl + 4.2);
  const lanes = [['mamá', B_MAMA, film.x + 120], ['hija', B_HIJA, film.x + 280], ['papá', B_PAPA, film.x + 440]];

  // patrón: los fragmentos corren por el gel
  const corre = kprog(T, K.Pa + 1.4, K.Pa + 3.6, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tú y el de al lado */}
      <Escena T={T} a={K.G} b={K.Cl} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgH>
          <Persona x={300} y={1180} s={0.78} ropa={KC.pink} mece={respira(0)} />
          <Persona x={790} y={1180} s={0.78} ropa={KC.blue} pelo="#7a4a22" mece={respira(2)} />
          {(() => { const p = kprog(T, K.G + 1.2, K.G + 3.0, kEase.suave), lx = klerp(860, 300, p), ly = 820 + Math.sin(p * Math.PI) * -60;
            return <g opacity={kprog(T, K.G + 1.0, K.G + 1.3)}><circle cx={lx} cy={ly} r={90} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={14} />
              <line x1={lx + 64} y1={ly + 64} x2={lx + 140} y2={ly + 140} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" /></g>; })()}
          {T > K.G + 3.0 && <circle cx={300} cy={840} r={150 + 20 * Math.sin(T * 14)} fill="none" stroke={KC.red} strokeWidth={12} opacity={0.5 + 0.5 * Math.sin(T * 14)} />}
          <text x={300} y={1080} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={3}>TÚ</text>
          <text x={790} y={1070} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={2}>EL DE AL LADO</text>
        </SvgH>
      </Escena>
      {/* 1 · la clave: 4 de cada 1000 */}
      <Escena T={T} a={K.Cl} b={K.Pl} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgH><MilCuadros T={T} x={90} y={420} at={K.Cl} /></SvgH>
      </Escena>
      {/* 2–3 · 1984: la película en la caja de luz y las bandas de una familia */}
      <Escena T={T} a={K.Pl} b={K.Mi} zoom={0.04} origen="40% 50%">
        <FondoLunares color={KC.yellow} />
        <SvgH>
          <CajaLuz x={film.x} y={film.y} w={film.w} h={film.h} luz={kprog(T, K.Pl + 1.4, K.Pl + 1.8)}>
            <g transform={`translate(0 ${(1 - pelBaja) * -900})`}>
              <rect x={film.x + 20} y={film.y + 20} width={film.w - 40} height={film.h - 40} rx={8} fill={PELICULA} opacity={0.92} />
              {lanes.map(([n, b, lx], i) => <Carril key={i} x={lx} y={film.y + 60} w={110} h={film.h - 150} bandas={b} p={revela} fondo="rgba(255,255,255,.18)"
                resalta={T > K.Ba + 0.8 ? (k, bb) => (n === 'hija' ? true : B_HIJA.includes(bb)) : null} etq={T > K.Ba ? n : null} />)}
              {T > K.Ba + 1.2 && B_HIJA.map((bb, i) => { const deMama = B_MAMA.includes(bb), lx0 = film.x + 280, lx1 = deMama ? film.x + 120 : film.x + 440, yy = film.y + 60 + bb * (film.h - 150);
                const p = kprog(T, K.Ba + 1.2 + i * 0.18, K.Ba + 1.6 + i * 0.18);
                return <line key={i} x1={lx0} y1={yy} x2={klerp(lx0, lx1, p)} y2={yy} stroke={deMama ? KC.pink : KC.blue} strokeWidth={6} strokeDasharray="10 8" />; })}
            </g>
          </CajaLuz>
          {/* gotas del revelador */}
          {T < K.Pl + 1.8 && [0, 1, 2].map((i) => { const ph = ((T - K.Pl) * 1.4 + i / 3) % 1; return <circle key={i} cx={film.x + 120 + i * 160} cy={film.y + 40 + ph * 300} r={10} fill="#7fc8ff" opacity={(1 - ph) * pelBaja} />; })}
        </SvgH>
      </Escena>
      {/* 4 · la gota de sangre y, por dentro, los minisatélites */}
      <Escena T={T} a={K.Mi} b={K.Re} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgH>
          <g transform={`translate(230 1040) rotate(-20)`}>
            <rect x={-70} y={-40} width={140} height={230} rx={70} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
            <path d="M -40 -10 Q 0 -30 40 -10" stroke="#d98f6b" strokeWidth={6} fill="none" />
          </g>
          <path d="M 225 920 Q 180 980 225 1010 Q 270 980 225 920 Z" fill="#c81d3a" stroke={KC.ink} strokeWidth={6} />
        </SvgH>
      </Escena>
      <Lupa T={T} at={K.Mi + 0.4} until={K.Re - 0.2} x={560} y={690} r={300} fx={225} fy={970} tinte={KC.gold2} etiqueta="AL MICROSCOPIO · ADN"
        interior={(t, r) => {
          const zoomIn = kprog(t, K.Mi + 1.6, K.Mi + 2.6, kEase.suave);
          return <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill={KC.noche} />
            <g opacity={1 - zoomIn}><ADNHebra T={t} x={40} y={r - 40} largo={r * 2 - 80} alto={90} vueltas={4} resalta={(u) => u > 0.35 && u < 0.72} /></g>
            <g opacity={zoomIn}>
              <Riel x0={20} x1={70} y={r - 20} />
              <Bloques x={76} y={r - 20} n={4.0 * kprog(t, K.Mi + 2.4, K.Mi + 3.4)} ancho={100} alto={70} tam={17} />
              <Riel x0={500} x1={r * 2 - 10} y={r - 20} />
              <text x={r} y={r + 110} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={ORO}>la misma «frase», en fila</text>
            </g>
          </svg>;
        }} />
      {/* 5 · cuántas repeticiones: tú 4, el de al lado 7 */}
      <Escena T={T} a={K.Re} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgH>
          {[['TÚ', 4, 820, KC.pink], ['EL DE AL LADO', 7, 1090, KC.cyan]].map(([n, k, yy, c], i) => {
            const nn = k * kprog(T, K.Re + 0.3 + i * 0.3, K.Re + 1.6 + i * 0.4);
            const corta = kprog(T, K.Pa + 0.4, K.Pa + 0.8);
            return <g key={i} opacity={1 - kprog(T, K.Pa + 1.0, K.Pa + 1.4)}>
              <text x={60} y={yy - 70} style={{ font:`400 46px ${KF.titulo}` }} fill={c}>{n}</text>
              <text x={1020} y={yy - 70} textAnchor="end" style={{ font:`700 36px ${KF.mono}` }} fill={c}>× {Math.floor(nn + 0.001)} repeticiones</text>
              <Riel x0={40} x1={110} y={yy} />
              <Bloques x={116} y={yy} n={nn} ancho={96} alto={64} tam={15} />
              <Riel x0={116 + k * 102} x1={1060} y={yy} />
              {T > K.Pa && <g>
                <Tijeras x={100 + corta * 6} y={yy - 100} s={0.7} abre={Math.abs(Math.sin((T - K.Pa) * 12)) * (1 - corta)} rot={90} />
                <Tijeras x={116 + k * 102 + 6} y={yy - 100} s={0.7} abre={Math.abs(Math.sin((T - K.Pa) * 12)) * (1 - corta)} rot={90} />
              </g>}
            </g>; })}
        </SvgH>
      </Escena>
      {/* 6 · el patrón: pedazos de distinto largo corren por el gel */}
      <Escena T={T} a={K.Pa + 0.9} b={K.Pr} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <SvgH>
          <rect x={250} y={600} width={580} height={600} rx={20} fill="rgba(180,220,255,.16)" stroke="#9ec9ff" strokeWidth={6} />
          <text x={540} y={1240} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#9ec9ff">GEL</text>
          <text x={270} y={1185} style={{ font:`700 28px ${KF.mono}` }} fill="#9ec9ff">+</text>
          <text x={800} y={640} style={{ font:`700 28px ${KF.mono}` }} fill="#9ec9ff">−</text>
          {[[400, 4, KC.pink, 'TÚ'], [680, 7, KC.cyan, 'AL LADO']].map(([gx, k, c, n], i) => {
            const dist = (k === 4 ? 520 : 260) * corre;
            return <g key={i}>
              <rect x={gx - 70} y={612} width={140} height={22} rx={6} fill="#0b1220" stroke="#9ec9ff" strokeWidth={3} />
              <g transform={`translate(${gx - (k * 28) / 2} ${650 + dist})`}>
                {Array.from({ length: k }, (_, j) => <rect key={j} x={j * 28} y={-14} width={24} height={28} rx={5} fill={ORO} stroke={KC.ink} strokeWidth={3} />)}
              </g>
              <text x={gx} y={570} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={c}>{n}</text>
            </g>; })}
        </SvgH>
      </Escena>
      {/* 7 · re-gancho: ¿sirve para atrapar a alguien? */}
      <Escena T={T} a={K.Pr} b={K.In} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgH>
          <Barras x={420} y={760} w={620} h={240} bandas={B_TU} p={kprog(T, K.Pr, K.Pr + 0.8)} />
          <text x={420} y={1240} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 420 1100)`}>?</text>
        </SvgH>
      </Escena>
      {/* 8 · 1985: el niño que iba a ser deportado */}
      <Escena T={T} a={K.In} b={K.Io} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgH>
          <Persona x={800} y={1180} s={0.72} ropa={KC.violet} pelo={KC.ink} mece={respira(1)} />
          <Persona x={330} y={1180} s={0.5} ropa={KC.yellow} pelo={KC.ink} mece={respira(3)} />
          <Maleta x={190} y={1180} s={0.8} />
          <text x={330} y={1110} textAnchor="middle" style={{ font:`400 36px ${KF.titulo}` }} fill={KC.ink}>NIÑO</text>
          <text x={800} y={1090} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={2}>MAMÁ</text>
          {T > K.In + 1.6 && <g>
            <Carril x={470} y={560} w={90} h={300} bandas={B_HIJA} p={kprog(T, K.In + 1.6, K.In + 2.6)} fondo="rgba(255,255,255,.7)" resalta={T > K.In + 2.8 ? (k, b) => B_MAMA.includes(b) : null} />
            <Carril x={630} y={560} w={90} h={300} bandas={B_MAMA} p={kprog(T, K.In + 1.8, K.In + 2.8)} fondo="rgba(255,255,255,.7)" resalta={T > K.In + 2.8 ? (k, b) => B_HIJA.includes(b) : null} />
          </g>}
          <Sello x={540} y={460} texto="DEPORTACIÓN" p={kprog(T, K.In + 0.3, K.In + 0.7)} rot={-10} tam={60} />
          {T > K.In + 3.0 && <line x1={280} y1={520} x2={800} y2={400} stroke={KC.red} strokeWidth={16 * kprog(T, K.In + 3.0, K.In + 3.3)} strokeLinecap="round" />}
        </SvgH>
      </Escena>
      {/* 9 · el sospechoso que confesó era inocente */}
      <Escena T={T} a={K.Io} b={K.Pi} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgH>
          <Carril x={380} y={620} w={130} h={500} bandas={B_CRIMEN} p={kprog(T, K.Io + 1.2, K.Io + 2.2)} fondo="rgba(255,255,255,.75)" etq="muestra del crimen" />
          <Carril x={700} y={620} w={130} h={500} bandas={B_SOSP} p={kprog(T, K.Io + 1.6, K.Io + 2.6)} fondo="rgba(255,255,255,.75)" etq="sospechoso" />
          {T > K.Io + 2.8 && <text x={540} y={920} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6}>≠</text>}
          <Sello x={560} y={500} texto="INOCENTE" color="#0a7d4a" p={kprog(T, K.Io + 3.3, K.Io + 3.7)} rot={-8} tam={70} />
        </SvgH>
      </Escena>
      {/* 10 · 1988: Pitchfork y el amigo que dio sangre por él */}
      <Escena T={T} a={K.Pi} b={K.St} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgH>
          {T < K.Pi + 3.9 && Array.from({ length: 10 }, (_, i) => { const t0 = K.Pi + 0.2 + i * 0.12, o = kprog(T, t0, t0 + 0.25, kEase.sale), esp = i === 6;
            return <g key={i} opacity={o * (1 - kprog(T, K.Pi + 3.5, K.Pi + 3.9))}><Tubo x={130 + i * 92} y={940 + (1 - o) * 60} s={0.8} glow={esp ? kprog(T, K.Pi + 1.6, K.Pi + 2.0) : 0}
              etq={esp && T > K.Pi + 1.6 ? <g><circle cx={0} cy={-80} r={20} fill="#c98b5e" stroke={KC.ink} strokeWidth={4} /><path d="M -14 -84 l 28 0" stroke={KC.ink} strokeWidth={4} /></g> : null} /></g>; })}
          {T > K.Pi + 1.6 && T < K.Pi + 3.9 && <g opacity={1 - kprog(T, K.Pi + 3.5, K.Pi + 3.9)}>
            <rect x={590} y={580} width={340} height={70} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
            <text x={760} y={628} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>«C. Pitchfork»</text>
            <line x1={600} y1={615} x2={920} y2={612} stroke={KC.red} strokeWidth={8 * kprog(T, K.Pi + 2.4, K.Pi + 2.7)} />
            <line x1={720} y1={650} x2={682} y2={760} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
          </g>}
          {T > K.Pi + 3.7 && <g opacity={kprog(T, K.Pi + 3.7, K.Pi + 4.1)}>
            <Carril x={380} y={600} w={130} h={520} bandas={B_CRIMEN} p={kprog(T, K.Pi + 3.8, K.Pi + 4.6)} fondo="rgba(255,255,255,.75)" etq="muestra del crimen" resalta={T > K.Pi + 4.9 ? () => true : null} />
            <Carril x={700} y={600} w={130} h={520} bandas={B_CRIMEN} p={kprog(T, K.Pi + 4.0, K.Pi + 4.8)} fondo="rgba(255,255,255,.75)" etq="Pitchfork" resalta={T > K.Pi + 4.9 ? () => true : null} />
            {T > K.Pi + 4.9 && <text x={540} y={910} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill="#0a7d4a" stroke={KC.ink} strokeWidth={6}>=</text>}
          </g>}
        </SvgH>
      </Escena>
      {/* 11 · hoy: STR copiados con PCR, hasta con rastros */}
      <Escena T={T} a={K.St} b={K.Ge} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgH>
          <Hisopo x={190} y={560} s={1.1} rot={-25} />
          {(() => { const ciclos = Math.floor(kclamp((T - K.St - 0.8) / 0.45, 0, 4)), n = Math.pow(2, ciclos);
            return <g>{Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(${400 + (i % 4) * 150} ${660 + Math.floor(i / 4) * 60})`} opacity={kprog(T, K.St + 0.8 + Math.log2(i + 1) * 0.45, K.St + 1.0 + Math.log2(i + 1) * 0.45)}>
              <Riel x0={0} x1={20} y={0} alto={30} /><Bloques x={22} y={0} n={3} ancho={26} alto={34} letras={false} /><Riel x0={110} x1={130} y={0} alto={30} />
            </g>)}</g>; })()}
          <Picos x={130} y={920} w={820} h={300} p={kprog(T, K.St + 2.6, K.St + 4.2)} />
        </SvgH>
      </Escena>
      {/* 12 · tu gemelo idéntico: la misma huella */}
      <Escena T={T} a={K.Ge} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <SvgH>
          <Persona x={170} y={1250} s={0.55} ropa={KC.mint} mece={respira(0)} />
          <Persona x={410} y={1250} s={0.55} ropa={KC.mint} mece={respira(0.3)} />
          <Barras x={290} y={500} w={420} h={110} bandas={B_GEMELO} p={kprog(T, K.Ge + 0.4, K.Ge + 1.2)} />
          <Barras x={290} y={680} w={420} h={110} bandas={B_GEMELO} p={kprog(T, K.Ge + 0.8, K.Ge + 1.6)} />
          {T > K.Ge + 1.8 && <text x={290} y={668} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>=</text>}
        </SvgH>
      </Escena>
      {/* 13 · cierre: las mismas dos personas, cada una con su huella */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgH>
          <Persona x={300} y={1180} s={0.78} ropa={KC.pink} mece={respira(0)} />
          <Persona x={790} y={1180} s={0.78} ropa={KC.blue} pelo="#7a4a22" mece={respira(2)} />
          <Barras x={300} y={980} w={250} h={80} bandas={B_TU} p={kprog(T, K.Ci + 0.6, K.Ci + 1.6)} />
          <Barras x={790} y={980} w={250} h={80} bandas={B_LADO} p={kprog(T, K.Ci + 0.9, K.Ci + 1.9)} />
          {DISTINTOS.map((d, i) => { const p = kprog(T, K.Ci + 1.8 + i * 0.12, K.Ci + 2.6 + i * 0.12, kEase.sale);
            return <rect key={i} x={klerp(120 + i * 230, 250 + i * 28, p)} y={klerp(440, 1080, p)} width={22} height={22} rx={4} fill={KC.pink} stroke={KC.ink} strokeWidth={3} />; })}
          {T > K.Ci + 2.7 && <g opacity={kprog(T, K.Ci + 2.7, K.Ci + 3.0)}><rect x={230} y={1070} width={140} height={56} rx={14} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            <text x={300} y={1113} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>TÚ</text></g>}
        </SvgH>
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G} until={K.Cl - 0.3} valor={99.6} desde={90} dur={1.0} dec={1} sufijo=" %" etiqueta="igual al de al lado" x={310} y={520} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.G + 1.0} until={K.Cl - 0.3} texto="NHGRI · 2023" x={310} y={700} tam={30} mono borde={KC.ink} />
      <Chip T={T} at={K.Cl + 0.4} until={K.Pl - 0.2} texto="1000 cuadritos · 4 distintos = 0.4 %" y={1050} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.Pl + 2.2} until={K.Mi - 0.2} texto="autorradiografía" x={420} y={395} tam={28} mono borde={KC.ink} />
      <Chip T={T} at={K.Pl + 0.6} until={K.Ba - 0.2} texto="1984 · Universidad de Leicester" y={1480} tam={36} borde={KC.ink} />
      <Etiqueta T={T} at={K.Ba + 1.6} until={K.Mi - 0.2} x={film.x + film.w + 40} y={film.y + 450} texto="de mamá" color={KC.pink} tam={34} />
      <Etiqueta T={T} at={K.Ba + 1.9} until={K.Mi - 0.2} x={film.x + film.w + 40} y={film.y + 520} texto="de papá" color={KC.blue} tam={34} />
      <Chip T={T} at={K.Mi + 2.8} until={K.Re - 0.2} texto="minisatélite = una frase repetida" y={1480} tam={36} borde={KC.gold} />
            <Etiqueta T={T} at={K.Pa + 2.6} until={K.Pr - 0.1} x={470} y={1140} texto="corto: llega lejos" color={KC.pink} tam={30} />
      <Etiqueta T={T} at={K.Pa + 2.9} until={K.Pr - 0.1} x={760} y={880} texto="largo: se queda" color={KC.cyan} tam={26} />
      <Chip T={T} at={K.In + 3.2} until={K.Io - 0.2} texto="1985 · primer caso resuelto con ADN" y={1480} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Io + 0.1} until={K.Io + 1.0} anio="1986" quien="Leicestershire, Inglaterra" revista="primer uso de ADN en un crimen" y={760} />
      <Chip T={T} at={K.Io + 1.2} until={K.Pi - 0.2} texto="Leicestershire · 1986" y={1480} tam={34} borde={KC.ink} />
      <Etiqueta T={T} at={K.Pi + 2.6} until={K.Pi + 3.6} x={560} y={1060} texto="sangre de un amigo" color={KC.ink} tam={30} />
      <Chip T={T} at={K.Pi + 4.9} until={K.St - 0.2} texto="1988 · primera condena por asesinato con ADN" y={1480} tam={30} borde={KC.ink} />
      <Etiqueta T={T} at={K.St + 0.4} until={K.Ge - 0.2} x={260} y={760} texto="un rastro" color={KC.ink} tam={30} />
      <Chip T={T} at={K.St + 1.0} until={K.Ge - 0.2} texto="STR = repeticiones cortas · PCR las copia" y={1480} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ge + 2.0} until={K.Ci - 0.2} texto="gemelos idénticos = misma huella" x={300} y={420} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ci} until={K.Ou} valor={99.6} desde={99.6} dur={0.1} dec={1} sufijo=" %" etiqueta="igual… pero" x={310} y={520} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Ci + 2.9} until={K.Ou} texto="tu 0.4 % = tu huella" y={1480} tam={40} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cl - 0.1} texto="99.6 % igual… *y te delata.*" />
      <Subtitulo T={T} idx={1} at={K.Cl + 0.1} until={K.Pl - 0.1} texto="La clave: *lo que cambia.*" />
      <Subtitulo T={T} idx={2} at={K.Pl + 0.1} until={K.Ba - 0.1} texto="1984: *el ADN de una familia.*" />
      <Subtitulo T={T} idx={3} at={K.Ba + 0.1} until={K.Mi - 0.1} texto="Un *código de barras* distinto." />
      <Subtitulo T={T} idx={4} at={K.Mi + 0.1} until={K.Re - 0.1} texto="Minisatélites: *una frase repetida.*" />
      <Subtitulo T={T} idx={5} at={K.Re + 0.1} until={K.Pa - 0.1} texto="Cuántas veces: *cambia en cada uno.*" />
      <Subtitulo T={T} idx={6} at={K.Pa + 0.1} until={K.Pr - 0.1} texto="Distinto largo = *tu patrón.*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.In - 0.1} texto="¿Sirve para *atrapar a alguien?*" />
      <Subtitulo T={T} idx={8} at={K.In + 0.1} until={K.Io - 0.1} texto="1985: *su mamá sí era su mamá.*" />
      <Subtitulo T={T} idx={9} at={K.Io + 0.1} until={K.Pi - 0.1} texto="Confesó… *y era inocente.*" />
      <Subtitulo T={T} idx={10} at={K.Pi + 0.1} until={K.St - 0.1} texto="1988: *atrapado por su ADN.*" />
      <Subtitulo T={T} idx={11} at={K.St + 0.1} until={K.Ge - 0.1} texto="STR + PCR: *basta un rastro.*" />
      <Subtitulo T={T} idx={12} at={K.Ge + 0.1} until={K.Ci - 0.1} texto="Tu gemelo: *tu misma huella.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Ese 0.4 % *lleva tu nombre.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Placa + 0.4, CUES.Bandas + 4.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Repeticiones + 0.3, CUES.Patron + 0.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Inmigracion + 0.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Inmigracion + 3.2, CUES.Inocente + 0.9, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Inocente + 1.3, CUES.Pitchfork - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pitchfork + 2.4, CUES.STR - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.STR + 1.0, CUES.Gemelos - 0.3, 'avatar_07_pensativo_puno', 'arriba-der'],
        [CUES.Gemelos + 0.05, CUES.Cierre - 0.2, 'avatar_02_apuntando_camara', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="57" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuellaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Huella /></CompositionStage></div>;
}
window.HuellaApp = HuellaApp;
