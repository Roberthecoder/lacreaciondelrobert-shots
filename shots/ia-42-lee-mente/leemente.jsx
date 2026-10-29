// Shot IA #42 · ¿Una IA puede leer tu mente? Solo si tú te dejas — NARRADO (N5 "El experimento").
// Datos: Tang, LeBel, Jain y Huth, "Semantic reconstruction of continuous language from non-invasive brain recordings",
// Nature Neuroscience 26:858–866 (2023), UT Austin. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const PIEL = '#f1b48f', PIEL2 = '#c98a63', PELO = '#2b1d16';

// Texto que se escribe solo (máquina de escribir).
function tecleo(texto, T, a, b) { const n = Math.round(texto.length * kprog(T, a, b)); return texto.slice(0, n); }
// Letras revueltas que cambian 10 veces por segundo.
function revuelto(T, n = 26, seed = 1) { const r = krng(Math.floor(T * 10) + seed * 97), ab = 'qzxkwjv#@%&¿?ñtrbm'; let s = '';
  for (let i = 0; i < n; i++) s += (i % 6 === 5) ? ' ' : ab[Math.floor(r() * ab.length)]; return s; }

// Cerebro de perfil (mirando a la derecha) con zonas que se encienden. zonas: [{ x, y, at, color }]
function Cerebro({ x, y, s = 1, T = 0, zonas = [], color = '#ff9ec4' }) {
  const giros = ['M -180 -30 C -140 -80 -90 -40 -60 -90', 'M -150 40 C -100 0 -70 50 -20 10', 'M -40 -130 C -10 -80 30 -120 60 -70', 'M 30 -10 C 70 -60 110 -10 150 -50',
    'M 60 70 C 100 30 150 80 190 20', 'M -90 90 C -50 60 -10 100 30 70', 'M -200 20 C -190 -20 -170 -40 -150 -60', 'M 100 -130 C 130 -110 160 -100 190 -60'];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 70 120 C 90 170 70 220 60 250 L 20 250 C 30 210 30 170 20 130 Z" fill="#e58aa9" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={110} cy={135} rx={80} ry={45} fill="#e58aa9" stroke={KC.ink} strokeWidth={7} />
    <path d="M -230 40 C -250 -80 -150 -175 -20 -172 C 120 -180 232 -100 230 10 C 234 80 190 120 120 118 C 80 150 20 140 -10 122 C -60 150 -150 140 -190 102 C -225 86 -232 62 -230 40 Z"
      fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {giros.map((d, i) => <path key={i} d={d} stroke="#c2577f" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {zonas.map((z, i) => { const p = kprog(T, z.at, z.at + 0.4, kEase.sale); if (p <= 0) return null; const l = 0.75 + 0.25 * Math.sin(T * 6 + i);
      return <g key={i} opacity={p}><circle cx={z.x} cy={z.y} r={62 * l} fill={z.color || KC.yellow} opacity=".35" /><circle cx={z.x} cy={z.y} r={30} fill={z.color || KC.yellow} stroke={KC.ink} strokeWidth={5} /></g>; })}
  </g>;
}

// Cabeza de perfil (mira a la derecha; espejo = mira a la izquierda). cerebro 0..1 lo deja ver como rayos X.
function Cabeza({ x, y, s = 1, T = 0, piel = PIEL, pelo = PELO, ojos = 'abiertos', cerebro = 0, espejo = false, casco = 0 }) {
  const parp = ojos === 'abiertos' && (T % 3.4) < 0.12;
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`}>
    <path d="M -150 -40 C -160 -180 -60 -245 40 -235 C 150 -225 205 -130 192 -40 L 232 38 L 192 58 L 202 108 C 202 150 172 172 122 166 L 112 232 L -100 232 L -112 120 C -160 80 -150 20 -150 -40 Z"
      fill={piel} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -152 -30 C -170 -190 -50 -262 60 -240 C 150 -222 200 -150 196 -96 C 150 -130 90 -150 40 -120 C 0 -90 -40 -90 -70 -60 C -100 -40 -120 -20 -152 -30 Z" fill={pelo} stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 0 C -70 -10 -80 50 -50 60" stroke={KC.ink} strokeWidth={7} fill={PIEL2} />
    {ojos === 'cerrados' || parp ? <path d="M 100 -30 Q 125 -18 150 -30" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      : <><ellipse cx={128} cy={-30} rx={14} ry={18} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={134} cy={-28} r={8} fill={KC.ink} /></>}
    <path d="M 170 120 Q 190 125 200 112" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {cerebro > 0 && <g opacity={cerebro} clipPath="url(#craneo)"><Cerebro x={10} y={-85} s={0.62} T={T} /></g>}
    {casco > 0 && <g opacity={casco}>
      <path d="M -165 -40 C -175 -220 -40 -275 60 -255 C 170 -235 215 -150 205 -60" stroke="#8a95ad" strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M -165 -40 C -175 -220 -40 -275 60 -255 C 170 -235 215 -150 205 -60" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="2 34" strokeLinecap="round" />
      <line x1={20} y1={-262} x2={20} y2={-320} stroke={KC.ink} strokeWidth={8} /><circle cx={20} cy={-330} r={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    </g>}
  </g>;
}

// Globo de pensamiento con bolitas que bajan hacia la cabeza (hacia). children = lo que se piensa.
function Globo({ x, y, rx = 230, ry = 150, hacia = [0, 300], o = 1, fill = '#fff', children }) {
  const b = 14, bumps = Array.from({ length: b }, (_, i) => { const a = (i / b) * Math.PI * 2; return [Math.cos(a) * rx * 0.9, Math.sin(a) * ry * 0.88]; });
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {[0.25, 0.5, 0.78].map((k, i) => <circle key={i} cx={hacia[0] * k} cy={ry * 0.9 + (hacia[1] - ry * 0.9) * k} r={26 - i * 7} fill={fill} stroke={KC.ink} strokeWidth={6} />)}
    {bumps.map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={Math.min(rx, ry) * 0.42} fill={fill} stroke={KC.ink} strokeWidth={8} />)}
    <ellipse cx={0} cy={0} rx={rx * 0.92} ry={ry * 0.86} fill={fill} />
    {children}
  </g>;
}

// Candado: cerrado 0 = abierto (arco arriba), 1 = cerrado.
function Candado({ x, y, s = 1, cerrado = 1, brillo = 0, T = 0 }) {
  const up = (1 - cerrado) * 40;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle r={150 + 10 * Math.sin(T * 6)} fill={KC.yellow} opacity={0.35 * brillo} />}
    <path d={`M -48 ${-10 - up} L -48 ${-60 - up} A 48 48 0 0 1 48 ${-60 - up} L 48 ${-10 - up * 0.2}`} stroke="#7f8ba3" strokeWidth={22} fill="none" />
    <path d={`M -48 ${-10 - up} L -48 ${-60 - up} A 48 48 0 0 1 48 ${-60 - up} L 48 ${-10 - up * 0.2}`} stroke={KC.ink} strokeWidth={5} fill="none" />
    <rect x={-80} y={-20} width={160} height={130} rx={22} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={32} r={16} fill={KC.ink} /><rect x={-6} y={36} width={12} height={34} rx={4} fill={KC.ink} />
  </g>;
}

// Foco (idea) dentro del globo.
function Foco({ x, y, s = 1, T = 0, encendido = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {encendido > 0 && [0, 1, 2, 3, 4, 5, 6, 7].map((k) => <line key={k} x1={0} y1={-95} x2={0} y2={-120 - 8 * Math.sin(T * 5 + k)} stroke={KC.orange} strokeWidth={8} strokeLinecap="round" transform={`rotate(${k * 45 - 157} 0 -10)`} opacity={encendido} />)}
    <path d="M -50 -40 A 60 60 0 1 1 50 -40 C 40 -10 30 0 28 30 L -28 30 C -30 0 -40 -10 -50 -40 Z" fill={encendido > 0.5 ? KC.yellow : '#ddd'} stroke={KC.ink} strokeWidth={7} />
    <rect x={-28} y={30} width={56} height={34} rx={8} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Resonador (vista de frente) con la persona acostada (se ven sus pies) y ondas de radio.
function Resonador({ x, y, s = 1, T = 0, zumba = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {zumba > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.9 + k / 3) % 1); return <rect key={k} x={-260 - 70 * u} y={-260 - 70 * u} width={520 + 140 * u} height={520 + 140 * u} rx={120 + 40 * u} fill="none" stroke={KC.blue} strokeWidth={6} opacity={(1 - u) * 0.6 * zumba} />; })}
    <rect x={-260} y={-260} width={520} height={520} rx={120} fill="#f4f6fb" stroke={KC.ink} strokeWidth={10} />
    <rect x={-230} y={190} width={460} height={40} rx={14} fill="#dfe4ee" />
    <text x={0} y={225} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#6a7385">fMRI</text>
    <circle r={165} fill="#283247" stroke={KC.ink} strokeWidth={10} />
    <circle r={150} fill="#1d2536" />
    <path d="M -150 70 L 150 70 L 240 330 L -240 330 Z" fill="#cfd6e3" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 70 L 120 70 L 120 40 C 60 20 -60 20 -120 40 Z" fill="#7fb2ff" stroke={KC.ink} strokeWidth={6} />
    {[-48, 48].map((fx) => <ellipse key={fx} cx={fx} cy={20} rx={30} ry={46} fill={PIEL} stroke={KC.ink} strokeWidth={6} />)}
    <g transform={`translate(0 -70)`} opacity={0.9}>
      <path d="M -50 10 A 50 50 0 0 1 50 10" stroke={KC.pink} strokeWidth={10} fill="none" />
      <rect x={-64} y={4} width={26} height={40} rx={10} fill={KC.pink} stroke={KC.ink} strokeWidth={4} /><rect x={38} y={4} width={26} height={40} rx={10} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}

// Personita (para contar a las 3 personas).
function Persona({ x, y, s = 1, color = KC.pink, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-70} r={36} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    <path d="M -55 40 C -55 -20 55 -20 55 40 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Monitor que escribe (HTML para que el texto se acomode solo).
function Pantalla({ T, at, until, x = 540, y = 1000, w = 860, h = 230, texto = '', cursor = true, color = KC.mint, titulo, tam = 40, mono = true }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, height:h, zIndex:40, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:'#0d1424', border:`8px solid ${KC.ink}`, borderRadius:26, boxShadow:'0 18px 40px rgba(0,0,0,.45)', padding:'18px 28px', boxSizing:'border-box', overflow:'hidden' }}>
    {titulo && <div style={{ font:`700 24px ${KF.mono}`, color:'#7f8ba3', marginBottom:10 }}>{titulo}</div>}
    <div style={{ font:`700 ${tam}px/1.25 ${mono ? KF.mono : KF.texto}`, color }}>{texto}{cursor && (T % 0.8) < 0.45 ? '▌' : ''}</div>
  </div>;
}

// Tarjeta de frase (lo que oyó / lo que escribió).
function TarjetaFrase({ T, at, until, y, etiqueta, texto, color = KC.paper, acento = KC.blue, icono }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:60, right:60, top:y, zIndex:41, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:color, border:`7px solid ${KC.ink}`, borderRadius:28, padding:'20px 32px 24px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ display:'flex', alignItems:'center', gap:14, font:`900 30px ${KF.texto}`, color:acento, textTransform:'uppercase', letterSpacing:'.03em' }}>{icono}{etiqueta}</div>
    <div style={{ font:`900 50px/1.18 ${KF.texto}`, color:KC.ink, marginTop:10, minHeight:118 }}>{texto}</div>
  </div>;
}
const IcoOreja = () => <svg width="44" height="44" viewBox="-30 -30 60 60"><path d="M -14 22 C -24 0 -22 -24 2 -24 C 22 -24 24 -4 14 6 C 6 14 8 22 -2 24" stroke={KC.ink} strokeWidth="6" fill={PIEL} strokeLinecap="round" /></svg>;
const IcoPantalla = () => <svg width="44" height="44" viewBox="-30 -30 60 60"><rect x="-26" y="-22" width="52" height="36" rx="6" fill="#0d1424" stroke={KC.ink} strokeWidth="5" /><rect x="-14" y="-12" width="22" height="5" fill={KC.mint} /><rect x="-6" y="16" width="12" height="10" fill={KC.ink} /></svg>;

// Volante (para la licencia de manejo).
function Volante({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2) * 18})`}>
    <circle r={80} fill="none" stroke={KC.ink} strokeWidth={26} /><circle r={80} fill="none" stroke="#3a3f4b" strokeWidth={16} />
    <circle r={24} fill="#3a3f4b" stroke={KC.ink} strokeWidth={6} />
    {[90, 210, 330].map((a) => <rect key={a} x={-8} y={0} width={16} height={74} fill="#3a3f4b" stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
  </g>;
}
// Licencia de manejo (tarjeta genérica) con un "aún no".
function Licencia({ x, y, s = 1, rot = -8 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <rect x={-120} y={-75} width={240} height={150} rx={16} fill="#bfe3ff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-100} y={-50} width={70} height={90} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={-65} cy={-18} r={18} fill={PIEL} /><path d="M -92 34 C -92 4 -38 4 -38 34 Z" fill={KC.blue} />
    {[-40, -15, 10].map((ly) => <rect key={ly} x={-10} y={ly} width={95} height={12} rx={5} fill="#7aa7d6" />)}
    <text x={30} y={60} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.red}>AÚN NO</text>
  </g>;
}

// "?" gigante con un ojo espía.
function OjoEspia({ x, y, s = 1, T = 0 }) {
  const mira = Math.sin(T * 2.4) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 Q 0 -90 110 0 Q 0 90 -110 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <circle cx={mira} cy={0} r={40} fill={KC.blue} stroke={KC.ink} strokeWidth={6} /><circle cx={mira} cy={0} r={18} fill={KC.ink} /><circle cx={mira + 12} cy={-12} r={7} fill="#fff" />
  </g>;
}

// Animalitos que se imaginan (sabotaje).
function Animal({ tipo, x, y, s = 1, o = 1, T = 0 }) {
  const b = Math.sin(T * 4 + x) * 5;
  const cuerpos = {
    gato: <><path d="M -48 -20 L -40 -78 L -8 -44 Z M 48 -20 L 40 -78 L 8 -44 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle r={52} fill={KC.orange} stroke={KC.ink} strokeWidth={7} /><circle cx={-18} cy={-6} r={7} fill={KC.ink} /><circle cx={18} cy={-6} r={7} fill={KC.ink} />
      <path d="M -8 12 L 8 12 L 0 20 Z" fill={KC.pink} /><path d="M -60 14 L -26 18 M -60 28 L -26 24 M 60 14 L 26 18 M 60 28 L 26 24" stroke={KC.ink} strokeWidth={4} /></>,
    perro: <><ellipse cx={-50} cy={0} rx={20} ry={42} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} /><ellipse cx={50} cy={0} rx={20} ry={42} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
      <circle r={50} fill="#c98a4b" stroke={KC.ink} strokeWidth={7} /><circle cx={-17} cy={-10} r={7} fill={KC.ink} /><circle cx={17} cy={-10} r={7} fill={KC.ink} />
      <ellipse cx={0} cy={14} rx={14} ry={10} fill={KC.ink} /><path d="M -12 30 Q 0 40 12 30" stroke={KC.ink} strokeWidth={5} fill="none" /></>,
    pez: <><path d="M 40 0 L 84 -34 L 84 34 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" /><ellipse rx={60} ry={38} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
      <circle cx={-30} cy={-8} r={7} fill={KC.ink} /><path d="M 0 -30 Q 10 0 0 30" stroke={KC.ink} strokeWidth={4} fill="none" /></>,
    ajolote: <>{[-1, 1].map((sd) => [-28, 0, 28].map((gy) => <path key={`${sd}${gy}`} d={`M ${sd * 50} ${gy * 0.6} q ${sd * 22} ${gy * 0.5 - 10} ${sd * 44} ${gy * 0.9}`} stroke={KC.magenta} strokeWidth={10} fill="none" strokeLinecap="round" />))}
      <ellipse rx={58} ry={44} fill="#ffb6cf" stroke={KC.ink} strokeWidth={7} /><circle cx={-22} cy={-8} r={7} fill={KC.ink} /><circle cx={22} cy={-8} r={7} fill={KC.ink} />
      <path d="M -20 14 Q 0 28 20 14" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" /></>,
  };
  return <g transform={`translate(${x} ${y + b}) scale(${s})`} opacity={o}>{cuerpos[tipo]}</g>;
}

// Pantalla de cine mudo con una escena animada genérica (luna, barquito, estrellas) y bocina tachada.
function CineMudo({ x, y, s = 1, T = 0 }) {
  const meci = Math.sin(T * 1.8) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-400} y={-240} width={800} height={480} rx={30} fill="#2b3445" stroke={KC.ink} strokeWidth={10} />
    <clipPath id="cineClip"><rect x={-370} y={-210} width={740} height={420} rx={16} /></clipPath>
    <g clipPath="url(#cineClip)">
      <rect x={-370} y={-210} width={740} height={420} fill="#1b2a5a" />
      {Array.from({ length: 18 }, (_, i) => { const r = krng(i + 3); const sx = -360 + r() * 720, sy = -200 + r() * 220; return <circle key={i} cx={sx} cy={sy} r={3 + r() * 4} fill="#fff" opacity={0.5 + 0.5 * Math.sin(T * 3 + i)} />; })}
      <circle cx={170} cy={-90} r={80} fill="#fff4c2" stroke={KC.ink} strokeWidth={6} /><circle cx={140} cy={-110} r={14} fill="#eadb9a" /><circle cx={195} cy={-60} r={10} fill="#eadb9a" />
      <path d={`M -370 120 Q -280 ${100 + meci} -190 120 T -10 120 T 170 120 T 370 120 L 370 210 L -370 210 Z`} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
      <g transform={`translate(-120 ${108 + meci}) rotate(${meci})`}>
        <path d="M -80 0 L 80 0 L 55 40 L -55 40 Z" fill="#a0612f" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
        <line x1={0} y1={0} x2={0} y2={-110} stroke={KC.ink} strokeWidth={6} /><path d="M 4 -105 L 70 -20 L 4 -20 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
      </g>
    </g>
    <g transform="translate(330 -280)">
      <circle r={52} fill="#fff" stroke={KC.ink} strokeWidth={7} />
      <path d="M -26 -12 L -12 -12 L 6 -28 L 6 28 L -12 12 L -26 12 Z" fill={KC.ink} />
      <path d="M 14 -14 L 34 14 M 34 -14 L 14 14" stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
    </g>
  </g>;
}

function LeeMente() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Es: CUES.Escaner, A: CUES.Aprende, Ej: CUES.Ejemplo, P: CUES.Pregunta, Aj: CUES.Ajeno, Sa: CUES.Sabotaje, Ex: CUES.Extra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}><defs><clipPath id="craneo"><path d="M -150 -40 C -160 -180 -60 -245 40 -235 C 150 -225 205 -130 192 -40 L 150 60 L -140 60 Z" /></clipPath></defs>{c}</svg>;

  // Gancho: un rayo de la máquina va hacia el pensamiento y rebota contra el candado.
  const viaje = kprog(T, K.G + 0.15, K.G + 1.25, kEase.sale), choque = kprog(T, K.G + 1.25, K.G + 1.6, kEase.sale);
  const tiembla = T > K.G + 1.25 && T < K.G + 1.9 ? Math.sin(T * 70) * 8 * (1 - kprog(T, K.G + 1.25, K.G + 1.9)) : 0;
  const rayo = (desde, hasta, p, color) => { const [x0, y0] = desde, [x1, y1] = hasta; const xm = klerp(x0, x1, p), ym = klerp(y0, y1, p);
    return <><line x1={x0} y1={y0} x2={xm} y2={ym} stroke={color} strokeWidth={14} strokeLinecap="round" strokeDasharray="4 26" /><circle cx={xm} cy={ym} r={18} fill={color} stroke={KC.ink} strokeWidth={5} /></>; };

  // Sabotaje: el medidor de aciertos cae de ~55 % a ~2 %.
  const caida = kprog(T, K.Sa + 2.9, K.Sa + 4.3, kEase.suave);
  const animales = [['gato', -120, -30, K.Sa + 1.0], ['ajolote', 30, -60, K.Sa + 1.6], ['perro', 140, 10, K.Sa + 2.2], ['pez', -20, 60, K.Sa + 2.8]];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la máquina quiere tu pensamiento y choca con un candado */}
      <Escena T={T} a={K.G} b={K.Es}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cabeza x={330} y={1010} s={1.05} T={T} casco={kprog(T, K.G, K.G + 0.3)} />
          <Globo x={330} y={560} hacia={[40, 300]}><Foco x={0} y={10} s={0.95} T={T} /></Globo>
          {choque > 0 && <g transform={`translate(${tiembla} 0)`}><Candado x={470} y={640} s={klerp(0.3, 0.85, choque)} T={T} /></g>}
          {choque <= 0 && rayo([770, 930], [520, 640], viaje, KC.cyan)}
          {choque > 0 && T < K.G + 2.4 && rayo([520, 640], [700, 900], kprog(T, K.G + 1.3, K.G + 2.2, kEase.sale), KC.red)}
          <Robotito x={830} y={1080} s={0.8} T={T} cara={T > K.G + 1.3 ? 'duda' : 'seguro'} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 3.8} until={K.Es - 0.2} texto="desde afuera · por ahora" x={330} y={345} tam={32} borde={KC.ink} />

      {/* 2 · el escáner: 3 personas, 16 horas de historias */}
      <Escena T={T} a={K.Es} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Resonador x={440} y={900} s={0.95} T={T} zumba={kprog(T, K.Es + 0.2, K.Es + 0.8)} />
          {[0, 1, 2].map((i) => { const p = kprog(T, K.Es + 0.8 + i * 0.35, K.Es + 1.2 + i * 0.35, kEase.rebote); return <Persona key={i} x={170 + i * 150} y={520} s={0.9 * p} color={[KC.pink, KC.yellow, KC.mint][i]} o={Math.min(1, p * 2)} />; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.Es + 1.0} until={K.A - 0.2} texto="3 personas" x={320} y={380} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Es + 3.0} until={K.A - 0.2} valor={16} dur={1.6} sufijo=" h" x={890} y={960} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.Es + 3.6} until={K.A - 0.2} texto="de historias en audio" x={850} y={1100} tam={28} borde={KC.ink} />

      {/* 3 · por dentro: la IA aprende el cerebro de cada una y luego escribe */}
      <Escena T={T} a={K.A} b={K.Ej}>
        <FondoCircuito T={T} />
        {svg(<>
          <Cerebro x={660} y={580} s={1.0} T={T} zonas={[{ x: -120, y: -40, at: K.A + 0.4 }, { x: 60, y: -90, at: K.A + 0.9, color: KC.cyan }, { x: 140, y: 40, at: K.A + 1.4, color: KC.mint }, { x: -40, y: 70, at: K.A + 1.9, color: KC.orange }]} />
        </>)}
        <RedNeuronal T={T} x={380} y={850} ancho={560} alto={130} capas={[3, 4, 4, 3]} onda={((T - K.A) * 0.7) % 1} o={kprog(T, K.A + 1.0, K.A + 1.6)} />
      </Escena>
      <Chip T={T} at={K.A + 1.2} until={K.A + 3.4} texto="un decodificador para cada persona" x={600} y={380} tam={30} borde={KC.cyan} />
      <Pantalla T={T} at={K.A + 3.8} until={K.Ej - 0.1} y={1085} h={170} titulo="historia nueva → texto" texto={tecleo('ella ni siquiera…', T, K.A + 4.6, K.A + 6.6)} />

      {/* 4 · el ejemplo real: no las palabras, la idea */}
      <Escena T={T} a={K.Ej} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.Ej + 0.8, K.Ej + 1.3) * (1 - kprog(T, K.Ej + 6.8, K.Ej + 7.2))}><Licencia x={850} y={350} s={0.8} /></g>
          <g opacity={kprog(T, K.Ej + 4.0, K.Ej + 4.5)}><Volante x={900} y={1110} s={0.75} T={T} /></g>
        </>)}
      </Escena>
      <TarjetaFrase T={T} at={K.Ej + 0.3} until={K.Ej + 6.9} y={570} etiqueta="lo que oyó" icono={<IcoOreja />} texto="«Todavía no tengo licencia de manejo»." />
      <TarjetaFrase T={T} at={K.Ej + 3.3} until={K.P - 0.2} y={900} etiqueta="lo que escribió la máquina" icono={<IcoPantalla />} acento={KC.teal} color="#e9fff6"
        texto={tecleo('«Ella ni siquiera ha empezado a aprender a manejar».', T, K.Ej + 3.6, K.Ej + 6.4)} />
      <Chip T={T} at={K.Ej + 4.2} until={K.Ej + 6.9} texto="ejemplo real del estudio (traducido)" x={540} y={1090} tam={26} borde={KC.ink} />
      <MitoTachado T={T} at={K.Ej + 7.3} tacharEn={K.Ej + 7.9} until={K.P - 0.2} texto="mismas palabras" x={340} y={480} tam={44} />
      <Chip T={T} at={K.Ej + 8.3} until={K.P - 0.2} texto="= la misma idea ✔" x={340} y={600} tam={44} borde={KC.leaf} />

      {/* 5 · re-gancho y el estudio */}
      <Escena T={T} a={K.P} b={K.Aj} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<g opacity={1 - kprog(T, K.P + 2.5, K.P + 2.9)}>
          <text x={300} y={1080} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>
          <OjoEspia x={300} y={720} s={0.6} T={T} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.P + 2.8} until={K.Aj - 0.2} anio="2023" quien="Universidad de Texas en Austin" revista="Tang, LeBel, Jain y Huth · Nature Neuroscience" y={700} />
      <Chip T={T} at={K.P + 3.5} until={K.Aj - 0.2} texto="resonancia · sin cirugía" y={1010} tam={36} borde={KC.ink} />

      {/* 6 · prueba 1: el cerebro de alguien con quien no se entrenó */}
      <Escena T={T} a={K.Aj} b={K.Sa}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Cabeza x={300} y={930} s={0.78} T={T} piel="#8d5a3b" pelo="#c9a227" casco={1} />
          <path d={`M 330 690 C 420 600 520 640 560 700`} stroke={KC.ink} strokeWidth={10} fill="none" strokeDasharray="18 12" />
        </>)}
      </Escena>
      <Chip T={T} at={K.Aj + 0.2} until={K.Sa - 0.2} texto="Prueba 1 · otro cerebro" x={700} y={400} tam={36} borde={KC.ink} />
      <Pantalla T={T} at={K.Aj + 0.6} until={K.Sa - 0.2} x={760} y={760} w={520} h={220} color={KC.red} titulo="decodificador de otra persona" cursor={false} tam={40} texto={T > K.Aj + 1.0 ? revuelto(T, 22, 2) : ''} />
      <Medidor T={T} at={K.Aj + 1.6} until={K.Sa - 0.2} y={1040} etiqueta="aciertos" color={KC.red} valor={(t) => 0.06 * kprog(t, K.Aj + 1.8, K.Aj + 2.6, kEase.sale)} texto={() => 'apenas más que el azar'} />

      {/* 7 · prueba 2: sabotaje pensando en animales */}
      <Escena T={T} a={K.Sa} b={K.Ex}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Cabeza x={810} y={1005} s={0.78} T={T} ojos="cerrados" espejo casco={1} />
          <Globo x={760} y={620} rx={220} ry={150} hacia={[40, 210]}>
            {animales.map(([t, ax, ay, at]) => { const p = kprog(T, at, at + 0.35, kEase.rebote); return p > 0 ? <Animal key={t} tipo={t} x={ax} y={ay} s={0.75 * p} T={T} /> : null; })}
          </Globo>
        </>)}
      </Escena>
      <Chip T={T} at={K.Sa + 0.2} until={K.Sa + 2.1} texto="Prueba 2 · ¡sabotaje!" x={330} y={420} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Sa + 0.7} until={K.Sa + 2.1} texto="«nombra animales en tu mente»" x={330} y={800} tam={28} borde={KC.ink} />
      <Medidor T={T} at={K.Sa + 2.6} until={K.Ex - 0.2} x={330} ancho={700} y={330} etiqueta="aciertos del decodificador" color={caida > 0.5 ? KC.red : KC.leaf}
        valor={(t) => klerp(0.55, 0.02, kprog(t, K.Sa + 2.9, K.Sa + 4.3, kEase.suave))} texto={() => caida < 0.5 ? 'escuchando: ~55 %' : 'saboteando: 0–3 %'} />

      {/* 8 · lo raro: cortos animados sin sonido */}
      <Escena T={T} a={K.Ex} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<CineMudo x={560} y={930} s={0.95} T={T} />)}
      </Escena>
      <Chip T={T} at={K.Ex + 0.4} until={K.C - 0.2} texto="cortos animados · sin sonido" x={640} y={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ex + 1.8} until={K.C - 0.2} texto="la máquina describió lo que pasaba" x={560} y={1200} tam={28} borde={KC.teal} />

      {/* 9 · cierre: la misma cabeza; el candado se cierra */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cabeza x={330} y={1010} s={1.05} T={T} casco={1 - kprog(T, K.C + 3.0, K.C + 3.6)} />
          <Globo x={330} y={560} hacia={[40, 300]}><Foco x={0} y={10} s={0.95} T={T} /></Globo>
          <Candado x={470} y={640} s={0.85} cerrado={kprog(T, K.C + 0.8, K.C + 1.2, kEase.rebote)} brillo={kprog(T, K.C + 1.2, K.C + 1.8)} T={T} />
          <g opacity={1 - kprog(T, K.C + 1.4, K.C + 2.2)}><Robotito x={830 + 300 * kprog(T, K.C + 1.4, K.C + 2.4, kEase.suave)} y={1080} s={0.8} T={T} cara="duda" /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="privacidad mental ✔" x={330} y={345} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="los autores piden reglas que la protejan" x={540} y={1110} tam={28} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Es - 0.1} texto="¿Por qué no te *leen la mente* desde afuera?" />
      <Subtitulo T={T} idx={1} at={K.Es + 0.1} until={K.A - 0.1} texto="3 personas · *16 horas* de historias." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Ej - 0.1} texto="La IA aprendió *su cerebro*… y escribía." />
      <Subtitulo T={T} idx={3} at={K.Ej + 0.1} until={K.Ej + 7.4} texto="Oyó una frase… *escribió otra parecida.*" />
      <Subtitulo T={T} idx={4} at={K.Ej + 7.5} until={K.P - 0.1} texto="No las palabras: *la idea.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Aj - 0.1} texto="¿Ya pueden *espiarte?* Austin, 2023." />
      <Subtitulo T={T} idx={6} at={K.Aj + 0.1} until={K.Sa - 0.1} texto="Otro cerebro: *casi puro azar.*" />
      <Subtitulo T={T} idx={7} at={K.Sa + 0.1} until={K.Ex - 0.1} texto="Pensó en animales: *casi no le atinó.*" />
      <Subtitulo T={T} idx={8} at={K.Ex + 0.1} until={K.C - 0.1} texto="También describió *cortos sin sonido.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Desde afuera, tu mente *sigue siendo tuya.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Escaner + 2.2, CUES.Aprende - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Aprende + 3.5, CUES.Ejemplo - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Ejemplo + 7.2, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Pregunta + 2.65, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ajeno + 1.0, CUES.Sabotaje - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Sabotaje + 2.1, CUES.Extra - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Extra + 1.0, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 1.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="42" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LeeMenteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LeeMente /></CompositionStage></div>;
}
window.LeeMenteApp = LeeMenteApp;
