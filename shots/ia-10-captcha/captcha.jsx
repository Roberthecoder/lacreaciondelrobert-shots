// Shot IA #10 · Tú contra un bot: ¿quién resuelve mejor los captchas? — NARRADO (N2 "El número" + giro histórico).
// Datos: Searles et al., USENIX Security 2023 (UC Irvine); Goodfellow et al., ICLR 2014 (Google); von Ahn et al., Science 2008;
// Google (TechCrunch 2012; Security Blog 2014); documentación de reCAPTCHA v3. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const AZUL = '#2f6dff';

// Letras chuecas de un captcha (cada letra con su giro y desplazamiento), con raya que las cruza.
function LetrasChuecas({ x, y, texto = 'xK7pQ', tam = 78, seed = 4, color = '#2b3a8a', T = 0, tiembla = 0 }) {
  const r = krng(seed), n = texto.length, paso = tam * 0.72;
  const letras = texto.split('').map((c, i) => ({ c, rot: (r() - 0.5) * 50, dy: (r() - 0.5) * tam * 0.5, sk: (r() - 0.5) * 30 }));
  return <g transform={`translate(${x} ${y})`}>
    {letras.map((l, i) => <text key={i} x={(i - (n - 1) / 2) * paso} y={l.dy + Math.sin(T * 5 + i) * tiembla} textAnchor="middle"
      transform={`rotate(${l.rot} ${(i - (n - 1) / 2) * paso} ${l.dy}) skewX(${l.sk})`} style={{ font:`italic 700 ${tam}px Georgia, serif` }} fill={color} stroke={KC.ink} strokeWidth={1.5}>{l.c}</text>)}
    <path d={`M ${-n * paso / 2 - 10} ${tam * 0.05} q ${n * paso / 4} ${-tam * 0.5} ${n * paso / 2} 0 t ${n * paso / 2} 0`} stroke={color} strokeWidth={5} fill="none" opacity=".8" />
  </g>;
}
// Tarjeta de captcha de letras: imagen con letras chuecas + cajita donde se teclea (escrito 0..1) + palomita (ok 0..1).
function TarjetaCaptcha({ x, y, s = 1, texto = 'xK7pQ', escrito = 0, ok = 0, T = 0, seed = 4, fondo = '#e9f1ff' }) {
  const n = Math.floor(texto.length * kclamp(escrito, 0, 1)), cursor = (T % 0.8) < 0.4 && escrito < 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-170} width={420} height={340} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-180} y={-140} width={360} height={170} rx={12} fill={fondo} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={-160 + i * 55} cy={-100 + ((i * 37) % 90)} r={6 + (i % 3) * 4} fill={KC.lilac} opacity=".35" />)}
    <LetrasChuecas x={0} y={-30} texto={texto} tam={70} seed={seed} T={T} tiembla={2} />
    <rect x={-180} y={60} width={360} height={80} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={-160} y={115} style={{ font:`700 46px ${KF.mono}` }} fill={KC.ink}>{texto.slice(0, n)}{cursor ? '|' : ''}</text>
    {ok > 0 && <g transform={`translate(170 -150) scale(${klerp(0.3, 1, kEase.rebote(ok))})`} opacity={Math.min(1, ok * 3)}>
      <circle r={52} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
      <path d="M -24 2 L -6 22 L 26 -18" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
  </g>;
}
// Anillo de tiempo que se va llenando (sin números: es esquema).
function AnilloTiempo({ x, y, r = 46, p = 0, color = KC.red, parado = false }) {
  const L = 2 * Math.PI * r;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle r={r - 12} fill="none" stroke={color} strokeWidth={14} strokeDasharray={`${L * kclamp(p, 0, 1) * 0.84} ${L}`} transform="rotate(-90)" />
    <line x1={0} y1={0} x2={Math.sin(p * 6.283) * (r - 16)} y2={-Math.cos(p * 6.283) * (r - 16)} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <rect x={-10} y={-r - 18} width={20} height={14} rx={4} fill={KC.ink} />
    {parado && <circle r={8} fill={KC.ink} />}
  </g>;
}
// Mano con cursor (tú).
function Cursor({ x, y, s = 1, clic = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (1 - 0.15 * clic)})`}>
    <path d="M 0 0 L 0 70 L 18 54 L 32 86 L 46 80 L 32 48 L 56 48 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Casilla "No soy un robot" (esquemática, sin marca). check 0..1 · brillo 0..1 (halo).
function Casilla({ x, y, s = 1, check = 0, brillo = 0, T = 0, texto = 'No soy un robot' }) {
  const h = 0.6 + 0.4 * Math.sin(T * 4);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <rect x={-330} y={-110} width={660} height={220} rx={50} fill="none" stroke={KC.yellow} strokeWidth={22} opacity={brillo * h} style={{ filter:'blur(6px)' }} />}
    {brillo > 0 && <rect x={-316} y={-96} width={632} height={192} rx={42} fill="none" stroke={KC.white} strokeWidth={6} opacity={brillo * 0.8} strokeDasharray="18 16" strokeDashoffset={-T * 60} />}
    <rect x={-290} y={-75} width={580} height={150} rx={20} fill="#f9f9f9" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-34} width={68} height={68} rx={10} fill="#fff" stroke={check > 0.5 ? KC.leaf : '#8a8a8a'} strokeWidth={6} />
    {check > 0 && <path d={`M -238 2 L -220 22 L -192 -18`} stroke={KC.leaf} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="80" strokeDashoffset={80 * (1 - kclamp(check, 0, 1))} />}
    <text x={-150} y={16} style={{ font:`800 46px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Libro abierto escaneado, con una palabra borrosa (borrosa 0..1 = cuánto se ve el "???").
function Libro({ x, y, s = 1, seed = 7, borrosa = 1, resalta = 0 }) {
  const r = krng(seed), lineas = (x0) => Array.from({ length: 9 }, (_, i) => {
    const yy = -150 + i * 38, l = 230 + r() * 50;
    return <line key={x0 + '-' + i} x1={x0} y1={yy} x2={x0 + l} y2={yy} stroke="#5b4a33" strokeWidth={9} strokeLinecap="round" opacity=".55" strokeDasharray={`${30 + r() * 40} 14 ${20 + r() * 30} 14`} />; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -340 -220 Q -170 -250 0 -205 Q 170 -250 340 -220 L 340 220 Q 170 190 0 235 Q -170 190 -340 220 Z" fill="#f1e2c0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <line x1={0} y1={-205} x2={0} y2={235} stroke={KC.ink} strokeWidth={6} />
    {lineas(-310)}{lineas(30)}
    <g transform="translate(150 -36)">
      <rect x={-80} y={-34} width={160} height={58} rx={10} fill={resalta > 0 ? KC.yellow : '#e6d3a8'} stroke={resalta > 0 ? KC.ink : 'none'} strokeWidth={5} opacity={0.4 + 0.6 * Math.max(resalta, 0.4)} />
      <text y={12} textAnchor="middle" style={{ font:`italic 700 40px Georgia, serif`, filter:`blur(${2.5 * borrosa}px)` }} fill="#3b2a14">upon</text>
    </g>
  </g>;
}
// Pila de libros que crece (n libros visibles).
function PilaLibros({ x, y, n = 0, max = 9 }) {
  const cols = [KC.red, AZUL, KC.mint, KC.orange, KC.lilac, KC.teal, KC.pink, KC.gold, KC.cyan];
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: Math.min(max, Math.ceil(n)) }, (_, i) => {
    const o = kclamp(n - i, 0, 1);
    return <g key={i} opacity={o} transform={`translate(${(i % 2 ? 10 : -12)} ${-i * 52 - (1 - o) * 60})`}>
      <rect x={-150} y={-46} width={300} height={46} rx={8} fill={cols[i % cols.length]} stroke={KC.ink} strokeWidth={6} />
      <line x1={-120} y1={-23} x2={120} y2={-23} stroke={KC.ink} strokeWidth={3} opacity=".4" />
    </g>; })}</g>;
}
// Fachada de casa con número (para Street View).
function Casa({ x, y, s = 1, numero = '742' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-160} width={600} height={400} fill="#f6c58f" stroke={KC.ink} strokeWidth={9} />
    <path d="M -340 -150 L 0 -360 L 340 -150 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-70} y={40} width={140} height={200} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} /><circle cx={40} cy={145} r={9} fill={KC.gold} />
    {[-210, 140].map((wx) => <g key={wx}><rect x={wx} y={-90} width={110} height={110} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} /><line x1={wx + 55} y1={-90} x2={wx + 55} y2={20} stroke={KC.ink} strokeWidth={5} /><line x1={wx} y1={-35} x2={wx + 110} y2={-35} stroke={KC.ink} strokeWidth={5} /></g>)}
    <rect x={-60} y={-30} width={120} height={56} rx={8} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
    <text y={14} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{numero}</text>
    <rect x={-360} y={240} width={720} height={30} fill="#8d8d8d" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Barras de rango (personas 50–85 %, bots > 96 %).
function Marcador({ T, at, until, top = 700 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const g1 = kprog(T, at + 0.3, at + 1.5, kEase.sale), g2 = kprog(T, at + 3.4, at + 4.6, kEase.sale), W = 760;
  const Fila = ({ titulo, sub, a, b, g, color, texto, vis }) => <div style={{ marginBottom:56, opacity: vis }}>
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', width:W + 60 }}>
      <div style={{ font:`900 44px ${KF.texto}`, color:KC.ink }}>{titulo} <span style={{ font:`700 26px ${KF.mono}`, color:'#3a3a3a' }}>{sub}</span></div>
      <div style={{ font:`400 64px ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}` }}>{texto}</div>
    </div>
    <div style={{ position:'relative', height:80, marginTop:8, width:W, background:'rgba(255,255,255,.7)', border:`6px solid ${KC.ink}`, borderRadius:18 }}>
      <div style={{ position:'absolute', left: W * a / 100 * g, top:0, bottom:0, width: Math.max(8, W * (b - a) / 100 * g), background:color, borderLeft:`5px solid ${KC.ink}`, borderRight:`5px solid ${KC.ink}` }}></div>
      {[0, 25, 50, 75, 100].map((t) => <div key={t} style={{ position:'absolute', left: W * t / 100 - 2, bottom:-34, font:`700 22px ${KF.mono}`, color:'#333' }}>{t}</div>)}
    </div>
  </div>;
  return <div style={{ position:'absolute', left:90, top, width:900, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <Fila titulo="personas" sub="(2023, acierto)" a={50} b={85} g={g1} color={KC.red} texto="50–85 %" vis={1} />
    <Fila titulo="bots" sub="(la mayoría)" a={96} b={100} g={g2} color={AZUL} texto="más de 96 %" vis={T >= at + 3.2 ? 1 : 0} />
  </div>;
}
// Mini cuadrícula de captchas resueltos (cada cuadrito = un montón de captchas).
function MiniCaptchas({ T, x, y, cols = 14, filas = 7, p = 0 }) {
  const N = cols * filas, k = Math.floor(N * p), out = [];
  for (let i = 0; i < N; i++) { const c = i % cols, r = Math.floor(i / cols);
    out.push(<g key={i} transform={`translate(${x + c * 64} ${y + r * 56})`}>
      <rect width={54} height={44} rx={6} fill={i < k ? KC.paper : 'rgba(255,255,255,.25)'} stroke={KC.ink} strokeWidth={3} />
      {i < k && <path d="M 12 22 q 8 -12 15 0 t 15 0" stroke={i % 3 ? AZUL : KC.red} strokeWidth={4} fill="none" />}
    </g>); }
  return <>{out}</>;
}

function Captcha() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Marcador, E: CUES.Estudio, L: CUES.Letras, P: CUES.Pregunta, Li: CUES.Libros, Ca: CUES.Calle, Mo: CUES.Movimiento, Cf: CUES.Calificacion, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const Li2 = K.Li + (K.Ca - K.Li) * 0.67; // segunda línea de "Libros"
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: tú tecleas lento, el bot termina casi al instante
  const tuEscrito = kprog(T, K.G + 0.3, K.G + 6, (p) => p), botEscrito = kprog(T, K.G + 0.15, K.G + 0.75);
  const pasa = (t0, t1) => kprog(T, t0, t1, kEase.sale);
  const vScore = 0.12 + 0.8 * kprog(T, K.Cf + 1.0, K.Cf + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú contra un bot */}
      <Escena T={T} a={K.G} b={K.Ma}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <line x1={540} y1={760} x2={540} y2={1190} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 18" />
          <TarjetaCaptcha x={275} y={1010} s={0.9} texto="xK7pQ" escrito={tuEscrito} ok={0} T={T} seed={4} />
          <Cursor x={300} y={1090} s={1.1} clic={Math.max(0, Math.sin(T * 9)) * 0.6} />
          <AnilloTiempo x={410} y={790} p={kprog(T, K.G, K.G + 8)} color={KC.red} />
          <TarjetaCaptcha x={805} y={1010} s={0.9} texto="xK7pQ" escrito={botEscrito} ok={pasa(K.G + 0.8, K.G + 1.2)} T={T} seed={4} />
          <AnilloTiempo x={940} y={790} p={Math.min(kprog(T, K.G, K.G + 8), 0.1)} color={AZUL} parado={T > K.G + 0.8} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.05} until={K.Ma - 0.2} texto="TÚ" x={150} y={790} tam={52} borde={KC.red} />
      <Chip T={T} at={K.G + 0.15} until={K.Ma - 0.2} texto="BOT" x={690} y={790} tam={52} borde={AZUL} />
      {/* 2 · marcador */}
      <Escena T={T} a={K.Ma} b={K.E}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Marcador T={T} at={K.Ma + 0.2} until={K.E - 0.2} top={690} />
      <Chip T={T} at={K.Ma + 3.4} until={K.E - 0.2} texto="bots: estudios 2014–2021" x={650} y={520} tam={34} borde={AZUL} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.L}>
        <FondoLunares color={KC.lilac} />
        {svg(<MiniCaptchas T={T} x={92} y={870} p={kprog(T, K.E + 1.6, K.E + 4.6, kEase.suave)} />)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.L - 0.3} anio="2023" quien="Universidad de California, Irvine" revista="Searles et al. · USENIX Security" x={650} y={560} />
      <Chip T={T} at={K.E + 1.4} until={K.L - 0.3} texto="1,400 personas · 14,000 captchas" x={540} y={800} tam={38} borde={KC.ink} />
      {/* 4 · letras chuecas: la IA de Google */}
      <Escena T={T} a={K.L} b={K.P}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={250} y={600} ancho={580} alto={320} capas={[3, 5, 5, 3]} onda={((T - K.L) * 0.6) % 1} />
        {svg(<>
          <g opacity={pasa(K.L + 0.2, K.L + 0.7)}><rect x={30} y={650} width={200} height={220} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <LetrasChuecas x={130} y={775} texto="Rq4" tam={66} seed={9} T={T} tiembla={3} /></g>
          <g opacity={pasa(K.L + 1.4, K.L + 1.9)}><rect x={850} y={650} width={200} height={220} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <text x={950} y={785} textAnchor="middle" style={{ font:`700 66px ${KF.mono}` }} fill={KC.ink}>Rq4</text></g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.L + 2.4} until={K.P - 0.2} valor={99.8} dec={1} dur={1.1} sufijo=" %" etiqueta="de acierto (las más difíciles)" x={540} y={1040} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.L + 0.6} until={K.P - 0.2} texto="2014 · IA de Google" x={360} y={470} tam={38} borde={KC.cyan} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Li} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={280} y={900} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 740)`}>?</text>
          <Casilla x={330} y={1080} s={0.7} T={T} />
        </>)}
      </Escena>
      {/* 6 · libros escaneados */}
      <Escena T={T} a={K.Li} b={K.Ca}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <g opacity={1 - pasa(Li2 - 0.4, Li2)}>
            <Libro x={540} y={760} s={0.95} borrosa={1 - pasa(K.Li + 5.2, K.Li + 6.0)} resalta={pasa(K.Li + 1.2, K.Li + 1.6)} />
            <g opacity={pasa(K.Li + 1.6, K.Li + 2.0) * (1 - pasa(K.Li + 5.6, K.Li + 6.0))}><rect x={650} y={600} width={170} height={56} rx={28} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
              <text x={735} y={640} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">¿???</text></g>
            <TarjetaCaptcha x={klerp(690, 540, pasa(K.Li + 2.2, K.Li + 3.0))} y={klerp(724, 1060, pasa(K.Li + 2.2, K.Li + 3.0))} s={klerp(0.2, 0.75, pasa(K.Li + 2.2, K.Li + 3.0))}
              texto="upon" escrito={kprog(T, K.Li + 3.2, K.Li + 4.8)} ok={pasa(K.Li + 4.9, K.Li + 5.3)} T={T} seed={11} fondo="#f1e2c0" />
          </g>
          <g opacity={pasa(Li2 - 0.3, Li2 + 0.2)}><PilaLibros x={260} y={1180} n={9 * kprog(T, Li2, Li2 + 3.0, kEase.sale)} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Li + 0.4} until={K.Li + 5.0} texto="libros escaneados que la computadora no leía" x={540} y={480} tam={32} borde={KC.ink} />
      <NumeroGigante T={T} at={Li2 + 0.1} until={K.Ca - 0.2} valor={440} dur={1.6} sufijo=" millones" etiqueta="" x={710} y={780} tam={120} color={KC.orange} />
      <Chip T={T} at={Li2 + 0.8} until={K.Ca - 0.2} texto="de palabras transcritas (2008)" x={710} y={900} tam={36} borde={KC.orange} />
      <Chip T={T} at={Li2 + 1.4} until={K.Ca - 0.2} texto="von Ahn et al. · Science 2008" x={710} y={1000} tam={28} mono borde={KC.ink} />
      {/* 7 · Street View */}
      <Escena T={T} a={K.Ca} b={K.Mo}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Casa x={540} y={900} s={1.0} />
          <rect x={540 - klerp(330, 110, pasa(K.Ca + 0.8, K.Ca + 1.6))} y={900 - 30 - klerp(300, 70, pasa(K.Ca + 0.8, K.Ca + 1.6))} width={2 * klerp(330, 110, pasa(K.Ca + 0.8, K.Ca + 1.6))} height={2 * klerp(300, 70, pasa(K.Ca + 0.8, K.Ca + 1.6))}
            fill="none" stroke={KC.red} strokeWidth={10} strokeDasharray="26 14" rx={16} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ca + 0.3} until={K.Mo - 0.2} texto="2012 · experimento de Google" x={340} y={470} tam={36} borde={KC.ink} />
      {/* 8 · la casilla mira cómo la usas */}
      <Escena T={T} a={K.Mo} b={K.Cf}>
        <FondoLunares color={KC.pink} />
        {svg(<Casilla x={540} y={800} s={1.25} T={T} brillo={pasa(K.Mo + 0.6, K.Mo + 1.2)} check={pasa(K.Mo + 3.0, K.Mo + 3.4)} />)}
      </Escena>
      <Chip T={T} at={K.Mo + 0.3} until={K.Cf - 0.2} texto="desde 2014" x={540} y={560} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Mo + 1.8} until={K.Cf - 0.2} texto="antes" x={250} y={1030} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Mo + 2.6} until={K.Cf - 0.2} texto="durante" x={540} y={1030} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Mo + 3.4} until={K.Cf - 0.2} texto="después" x={830} y={1030} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Mo + 1.0} until={K.Cf - 0.2} texto="esquema" x={900} y={680} tam={24} mono borde={KC.texto} />
      {/* 9 · versión tres: una calificación */}
      <Escena T={T} a={K.Cf} b={K.C}>
        <FondoCircuito T={T} color={KC.lilac} />
      </Escena>
      <Chip T={T} at={K.Cf + 0.2} until={K.C - 0.2} texto="versión 3 · sin pruebas" x={380} y={470} tam={40} borde={KC.lilac} />
      <Medidor T={T} at={K.Cf + 0.6} until={K.C - 0.2} y={760} etiqueta="0.0 = bot" color={vScore > 0.5 ? KC.mint : KC.red} valor={vScore} texto={(v) => `${(v).toFixed(1)} · 1.0 = humano`} />
      {T > K.Cf - 0.5 && T < K.C + 0.5 && svg(<g opacity={pasa(K.Cf + 0.9, K.Cf + 1.3) * (1 - pasa(K.C - 0.2, K.C + 0.3))}>
        <Robotito x={220} y={1040} s={0.6} T={T} cara="duda" color={KC.red} />
        <text x={220} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>0.0</text>
        <Cursor x={830} y={980} s={1.3} />
        <text x={860} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>1.0</text>
      </g>, 41)}
      {/* 10 · cierre: la misma pantalla del inicio */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <line x1={540} y1={760} x2={540} y2={1190} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 18" />
          <g opacity={1 - pasa(K.C + 1.0, K.C + 1.6)}><TarjetaCaptcha x={275} y={1010} s={0.9} texto="xK7pQ" escrito={0.4} T={T} seed={4} /></g>
          <g opacity={pasa(K.C + 1.0, K.C + 1.6)}><Casilla x={275} y={1010} s={0.62} T={T} brillo={1} check={pasa(K.C + 1.8, K.C + 2.2)} texto="No soy robot" /></g>
          <TarjetaCaptcha x={805} y={1010} s={0.9} texto="xK7pQ" escrito={1} ok={1} T={T} seed={4} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.1} until={K.Ou} texto="TÚ" x={150} y={790} tam={52} borde={KC.red} />
      <Chip T={T} at={K.C + 0.1} until={K.Ou} texto="BOT" x={690} y={790} tam={52} borde={AZUL} />
      <Chip T={T} at={K.C + 2.3} until={K.Ou} texto="cómo te portas ✔" x={275} y={1110} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="Tú contra un bot: *casi siempre gana él.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.E - 0.1} texto="Personas *50–85 %* · bots: *la mayoría, +96 %*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.L - 0.1} texto="UC Irvine, 2023: *1,400 personas.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.P - 0.1} texto="IA de Google, 2014: *99.8 %.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Li - 0.1} texto="¿Para qué *te los siguen poniendo?*" />
      <Subtitulo T={T} idx={5} at={K.Li + 0.1} until={Li2 - 0.1} texto="Hace años tecleabas *palabras de libros.*" />
      <Subtitulo T={T} idx={6} at={Li2 + 0.1} until={K.Ca - 0.1} texto="Para 2008: *440 millones de palabras.*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.Mo - 0.1} texto="Luego: *números de casas.*" />
      <Subtitulo T={T} idx={8} at={K.Mo + 0.1} until={K.Cf - 0.1} texto="Mira *cómo usas la casilla.*" />
      <Subtitulo T={T} idx={9} at={K.Cf + 0.1} until={K.C - 0.1} texto="Versión 3: *de 0 (bot) a 1 (humano).*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu prueba: *cómo te portas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Marcador + 3.6, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Estudio + 2.0, CUES.Letras - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Letras + 2.6, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Libros + 1.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Libros + 5.4, CUES.Libros + 8.4, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Calle + 0.4, CUES.Movimiento - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Movimiento + 2.0, CUES.Calificacion - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Calificacion + 1.0, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CaptchaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Captcha /></CompositionStage></div>;
}
window.CaptchaApp = CaptchaApp;
