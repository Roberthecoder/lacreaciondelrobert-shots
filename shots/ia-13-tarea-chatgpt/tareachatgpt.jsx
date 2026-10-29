// Shot IA #13 · Estudiar con ChatGPT: mejor en la tarea, peor en el examen — NARRADO (N2 "El número" + consejo útil).
// Datos: Bastani, Bastani, Sungu, Ge, Kabakcı y Mariman, "Generative AI without guardrails can harm learning: Evidence from
// high school mathematics", PNAS 122(26): e2422633122 (2025). Ver guion.md y verificacion.md. Los ejercicios y chats son ilustrativos.
const AZUL = '#2f6dff';
const EJERCICIOS = ['2x + 3 = 11', '5x − 4 = 21', 'x/3 + 2 = 6', '3(x − 1) = 12'];

// Palomita / tache dibujados (p 0..1 = cuánto se ha trazado).
function Marca({ x, y, tipo = 'ok', p = 1, s = 1 }) {
  if (p <= 0) return null;
  const c = tipo === 'ok' ? KC.leaf : KC.red;
  const d = tipo === 'ok' ? 'M -26 0 L -8 20 L 28 -24' : 'M -22 -22 L 22 22 M 22 -22 L -22 22';
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(1.6, 1, kEase.sale(Math.min(1, p * 1.4)))})`} opacity={Math.min(1, p * 3)}>
    <path d={d} stroke={c} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="120" strokeDashoffset={120 * (1 - p)} />
  </g>;
}
// Hoja de ejercicios / examen. marcas: [{ at, tipo }] por renglón. titulo cambia entre PRÁCTICA y EXAMEN.
function Hoja({ x, y, s = 1, T, titulo = 'PRÁCTICA', colorTitulo = AZUL, marcas = [], sello, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-210} y={-280} width={420} height={560} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <line x1={-160} y1={-280} x2={-160} y2={280} stroke={KC.pink} strokeWidth={4} opacity=".6" />
    <text x={-130} y={-200} style={{ font:`400 60px ${KF.titulo}` }} fill={colorTitulo}>{titulo}</text>
    {EJERCICIOS.map((e, i) => <text key={i} x={-130} y={-110 + i * 100} style={{ font:`700 34px ${KF.mono}` }} fill="#2b3a8a">{e}</text>)}
    {marcas.map((m, i) => <Marca key={i} x={150} y={-122 + i * 100} tipo={m.tipo} p={kprog(T, m.at, m.at + 0.3)} />)}
    {sello}
  </g>;
}
// Laptop con un chat en la pantalla. mensajes: [{ at, yo, texto }]. cerrar 0..1 la apaga.
function Laptop({ x, y, s = 1, T, mensajes = [], escribe, cerrar = 0, color = '#2b3445' }) {
  const vis = mensajes.filter((m) => T >= m.at).slice(-3);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-270} y={-200} width={540} height={330} rx={22} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-245} y={-176} width={490} height={282} rx={10} fill={cerrar > 0.5 ? '#0b0d12' : '#f3f5fa'} />
    {cerrar <= 0.5 && <>
      <rect x={-245} y={-176} width={490} height={40} fill="#dfe4ee" />
      <circle cx={-220} cy={-156} r={8} fill={KC.red} /><circle cx={-196} cy={-156} r={8} fill={KC.yellow} /><circle cx={-172} cy={-156} r={8} fill={KC.mint} />
      {vis.map((m, i) => { const e = kprog(T, m.at, m.at + 0.3, kEase.sale), w = Math.min(440, m.texto.length * 15.5 + 40), yy = -112 + i * 72;
        const bx = m.yo ? 230 - w : -230;
        return <g key={`${m.at}`} opacity={e} transform={`translate(0 ${(1 - e) * 20})`}>
          <rect x={bx} y={yy} width={w} height={56} rx={20} fill={m.yo ? KC.cyan : '#e6e9f2'} stroke={KC.ink} strokeWidth={3} />
          <text x={bx + 20} y={yy + 38} style={{ font:`800 27px ${KF.texto}` }} fill={KC.ink}>{m.texto}</text>
        </g>; })}
      {escribe && T >= escribe[0] && T < escribe[1] && [0, 1, 2].map((k) => <circle key={k} cx={-200 + k * 26} cy={90} r={9} fill="#7a8399" opacity={0.3 + 0.7 * Math.max(0, Math.sin(T * 8 - k))} />)}
    </>}
    <path d="M -320 130 L 320 130 L 350 170 L -350 170 Z" fill="#9aa4b8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-60} y={132} width={120} height={14} rx={6} fill="#6b7489" />
  </g>;
}
// Foco de "pista" que se enciende (luz 0..1).
function Foco({ x, y, s = 1, luz = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {luz > 0 && [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = k * 45 * Math.PI / 180, r1 = 92, r2 = 124 + 8 * Math.sin(T * 6 + k);
      return <line key={k} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1 - 20} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2 - 20} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" opacity={luz} />; })}
    <path d="M 0 -100 C 60 -100 86 -56 80 -16 C 74 22 44 40 40 70 L -40 70 C -44 40 -74 22 -80 -16 C -86 -56 -60 -100 0 -100 Z" fill={mixHex('#fff7c2', KC.yellow, luz)} stroke={KC.ink} strokeWidth={8} />
    <path d="M -20 60 L -12 0 L 0 18 L 12 0 L 20 60" stroke={KC.orange} strokeWidth={5} fill="none" opacity={0.5 + luz * 0.5} />
    <rect x={-42} y={70} width={84} height={22} rx={6} fill="#9aa4b8" stroke={KC.ink} strokeWidth={6} />
    <rect x={-36} y={92} width={72} height={20} rx={6} fill="#7a8399" stroke={KC.ink} strokeWidth={6} />
    <path d="M -18 112 L 18 112 L 8 126 L -8 126 Z" fill={KC.ink} />
  </g>;
}
// Libro y cuaderno (el grupo sin IA).
function LibroCuaderno({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-40} width={220} height={150} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={8} transform="rotate(-8)" />
    <rect x={-150} y={-20} width={180} height={20} fill="#fffdf6" transform="rotate(-8)" />
    <text x={-140} y={70} transform="rotate(-8)" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.paper}>MATE</text>
    <rect x={-10} y={-90} width={180} height={230} rx={10} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} transform="rotate(6)" />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={10} y1={-50 + k * 36} x2={150} y2={-50 + k * 36} stroke="#2b3a8a" strokeWidth={4} opacity=".55" transform="rotate(6)" />)}
    {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={-10} cy={-70 + k * 38} r={9} fill="#cfd5e2" stroke={KC.ink} strokeWidth={4} transform="rotate(6)" />)}
  </g>;
}
// Muleta.
function Muleta({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -260 Q 0 -300 70 -260" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M -70 -260 Q 0 -300 70 -260" stroke="#cfd5e2" strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M -60 -250 L -16 120 M 60 -250 L 16 120" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
    <path d="M -60 -250 L -16 120 M 60 -250 L 16 120" stroke="#b07a46" strokeWidth={14} strokeLinecap="round" />
    <rect x={-46} y={-80} width={92} height={26} rx={10} fill="#cfd5e2" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 110 L 0 300" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" /><path d="M 0 110 L 0 300" stroke="#b07a46" strokeWidth={16} strokeLinecap="round" />
    <rect x={-22} y={290} width={44} height={36} rx={10} fill="#1d1d22" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Moneda que gira (acierta / falla): la mitad de las veces.
function Moneda({ x, y, s = 1, T }) {
  const c = Math.cos(T * 7), cara = c >= 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={200} rx={130} ry={22} fill="rgba(0,0,0,.18)" />
    <g transform={`scale(${Math.max(0.06, Math.abs(c))} 1)`}>
      <circle r={150} fill={cara ? KC.gold2 : '#d9d2c4'} stroke={KC.ink} strokeWidth={10} />
      <circle r={118} fill="none" stroke={KC.ink} strokeWidth={5} opacity=".35" />
      <path d={cara ? 'M -56 0 L -16 42 L 62 -48' : 'M -48 -48 L 48 48 M 48 -48 L -48 48'} stroke={cara ? KC.leaf : KC.red} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>;
}
// Estudiante esquemático (de frente) con globo de pensamiento.
function Estudiante({ x, y, s = 1, T = 0, globo, globoO = 1 }) {
  const b = Math.sin(T * 2.4) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 330 Q -170 120 0 110 Q 170 120 170 330 Z" fill={AZUL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -60 118 L 0 190 L 60 118" fill="#fffdf6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g transform={`translate(0 ${b})`}>
      <circle cx={0} cy={0} r={110} fill="#e9b48a" stroke={KC.ink} strokeWidth={9} />
      <path d="M -112 -10 Q -120 -120 0 -122 Q 116 -122 112 -16 Q 70 -70 10 -64 Q -50 -90 -112 -10 Z" fill="#2a1d16" stroke={KC.ink} strokeWidth={7} />
      <circle cx={-38} cy={10} r={11} fill={KC.ink} /><circle cx={38} cy={10} r={11} fill={KC.ink} />
      <path d="M -40 52 Q 0 78 40 52" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
    {globo && <g opacity={globoO}>
      <circle cx={120} cy={-150} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <circle cx={160} cy={-200} r={22} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <rect x={60} y={-420} width={420} height={170} rx={80} fill="#fff" stroke={KC.ink} strokeWidth={7} />
      <text x={270} y={-352} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>{globo[0]}</text>
      <text x={270} y={-300} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.leaf}>{globo[1]}</text>
    </g>}
  </g>;
}
// Personita diminuta (para la multitud de casi mil estudiantes).
function Multitud({ T, at, x = 100, y = 760, cols = 40, filas = 25, paso = 22, dur = 2.4 }) {
  const N = cols * filas, k = Math.round(N * kprog(T, at, at + dur, kEase.suave)), out = [];
  const colores = [KC.yellow, KC.mint, KC.cyan, KC.pink, KC.orange];
  for (let i = 0; i < k; i++) { const c = i % cols, r = Math.floor(i / cols), px = x + c * paso, py = y + r * (paso + 2);
    out.push(<g key={i}><circle cx={px} cy={py - 5} r={4.6} fill={KC.ink} /><rect x={px - 6} y={py} width={12} height={10} rx={4} fill={colores[(i * 7) % 5]} stroke={KC.ink} strokeWidth={1.5} /></g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>{out}</svg>;
}
// Barras horizontales (calificación del examen, relativa al grupo sin IA = 100).
function BarrasH({ T, at, until, filas, top = 780, max = 100 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.1, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 620 * f.valor / max * g), height:80, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 66px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}`, opacity:g, whiteSpace:'nowrap' }}>{f.texto}</div>
        </div>
      </div>; })}
  </div>;
}
// Número tachable (para el cierre: el −17 % se tacha).
function NumeroTachado({ T, at, until, tachaEn, texto, x, y, tam = 170, color = KC.red }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), r = kprog(T, tachaEn, tachaEn + 0.35, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o * (1 - r * 0.35) }}>
    <div style={{ position:'relative', font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>
      {texto}
      <div style={{ position:'absolute', left:-16, top:'48%', height:18, width:`calc(${r * 100}% + 32px)`, background:KC.ink, borderRadius:9, transform:'rotate(-8deg)' }}></div>
    </div>
  </div>;
}

function TareaChatGPT() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Mito, E: CUES.Estudio, Gr: CUES.Grupos, Ex: CUES.Examen, P: CUES.Pregunta, Mu: CUES.Muleta, Er: CUES.Errores, Tu: CUES.Tutor, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: la práctica se vuelve examen
  const fase = kprog(T, K.G + 4.7, K.G + 5.2, kEase.suave);
  const marcasPractica = [0, 1, 2, 3].map((i) => ({ at: K.G + 0.35 + i * 0.6, tipo: 'ok' }));
  const marcasExamen = [{ at: K.G + 5.6, tipo: 'ok' }, { at: K.G + 6.0, tipo: 'mal' }, { at: K.G + 6.4, tipo: 'mal' }, { at: K.G + 6.8, tipo: 'ok' }];
  const exA = K.Ex + 3.35; // segunda frase del examen
  const erB = K.Er + 3.5;  // segunda frase de errores
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la tarea con chat sale perfecta… y el examen no */}
      <Escena T={T} a={K.G} b={K.Mi}>
        <FondoLunares color={mixHex(KC.yellow, '#ffb3a8', fase)} />
        {svg(<>
          <g opacity={1 - fase} transform={`translate(${-fase * 300} 0)`}>
            <Laptop x={330} y={560} s={0.78} T={T} escribe={[K.G, K.G + 0.3]}
              mensajes={[{ at: K.G - 1, yo: true, texto: '¿Cuál es la respuesta?' }, { at: K.G + 0.25, yo: false, texto: 'x = 4  ✔' }, { at: K.G + 1.4, yo: false, texto: 'x = 5  ✔' }]} />
          </g>
          {fase < 1 && <g opacity={1 - fase}><Hoja x={330} y={1000} s={0.76} T={T} marcas={marcasPractica} /></g>}
          {fase > 0 && <g opacity={fase}><Hoja x={330} y={klerp(1060, 920, fase)} s={klerp(0.76, 0.9, fase)} T={T} titulo="EXAMEN" colorTitulo={KC.red} marcas={marcasExamen} rot={-2} /></g>}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 2.6} until={K.G + 4.8} prefijo="+" valor={48} dur={0.9} sufijo=" %" x={790} y={900} tam={160} color={KC.mint} />
      <Chip T={T} at={K.G + 2.9} until={K.G + 4.8} texto="en la práctica, con IA" x={790} y={1040} tam={34} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.G + 5.1} until={K.Mi - 0.1} prefijo="−" valor={17} dur={0.7} sufijo=" %" x={800} y={900} tam={160} color={KC.red} />
      <Chip T={T} at={K.G + 5.4} until={K.Mi - 0.1} texto="en el examen, sin IA" x={800} y={1040} tam={34} borde={KC.red} />
      <Chip T={T} at={K.G + 6.2} until={K.Mi - 0.1} texto="vs. quienes no usaron IA" x={800} y={1110} tam={26} borde={KC.ink} />

      {/* 2 · el mito */}
      <Escena T={T} a={K.Mi} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<Hoja x={540} y={1000} s={0.72} T={T} marcas={[0, 1, 2, 3].map(() => ({ at: K.Mi - 2, tipo: 'ok' }))}
          sello={<g transform="translate(20 150) rotate(-12)" opacity={kprog(T, K.Mi + 0.2, K.Mi + 0.5)}>
            <rect x={-170} y={-50} width={340} height={100} rx={16} fill="rgba(63,191,74,.14)" stroke={KC.leaf} strokeWidth={9} />
            <text y={22} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.leaf}>TERMINADA</text></g>} />)}
      </Escena>
      <MitoTachado T={T} at={K.Mi + 0.1} tacharEn={K.Mi + 1.1} until={K.E - 0.15} texto="tarea terminada = aprendí" y={560} tam={52} />

      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Gr}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.9} anio="2023" quien="Prepa en Turquía · otoño" revista="Bastani, Bastani, Sungu y col. · PNAS (2025)" y={540} />
      {T > K.E - 0.3 && T < K.Gr + 0.5 && <div style={{ opacity: kprog(T, K.E, K.E + 0.3) * (1 - kprog(T, K.Gr - 0.05, K.Gr + 0.45)) }}>
        <Multitud T={T} at={K.E + 0.6} x={112} y={780} />
      </div>}
      <Chip T={T} at={K.E + 3.1} until={K.Gr - 0.15} texto="casi 1,000 estudiantes de mate" x={500} y={690} tam={40} borde={KC.ink} />

      {/* 4 · los tres grupos */}
      <Escena T={T} a={K.Gr} b={K.Ex}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          {[[190, K.Gr + 0.3], [540, K.Gr + 2.3], [890, K.Gr + 3.8]].map(([cx, at], i) => { const e = kprog(T, at, at + 0.45, kEase.rebote);
            return <g key={i} opacity={Math.min(1, e * 2)} transform={`translate(${cx} ${980 + (1 - e) * 120})`}>
              <rect x={-160} y={-230} width={320} height={420} rx={26} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
              {i === 0 && <Laptop x={0} y={-30} s={0.5} T={T} mensajes={[{ at: K.Gr - 5, yo: true, texto: '¿Respuesta?' }, { at: K.Gr + 0.8, yo: false, texto: 'x = 4' }]} />}
              {i === 1 && <><Laptop x={0} y={-30} s={0.5} T={T} mensajes={[{ at: K.Gr - 5, yo: true, texto: '¿Respuesta?' }, { at: K.Gr + 2.8, yo: false, texto: 'Te doy una pista…' }]} />
                <Foco x={110} y={-170} s={0.42} luz={kprog(T, K.Gr + 2.9, K.Gr + 3.2)} T={T} /></>}
              {i === 2 && <LibroCuaderno x={-10} y={-30} s={0.7} />}
              <text x={0} y={130} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{['chat tipo', 'tutor', 'sin IA'][i]}</text>
              <text x={0} y={170} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{['ChatGPT', 'de IA', 'libro y apuntes'][i]}</text>
            </g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.Gr + 0.3} until={K.Gr + 2.2} texto="GPT Base (sobre GPT-4)" x={540} y={620} tam={34} mono borde={KC.ink} />
      <Chip T={T} at={K.Gr + 2.3} until={K.Gr + 3.7} texto="GPT Tutor (pistas)" x={540} y={620} tam={34} mono borde={KC.gold} />
      <Chip T={T} at={K.Gr + 3.8} until={K.Ex - 0.15} texto="3 grupos · la misma clase" x={540} y={620} tam={34} borde={KC.ink} />

      {/* 5 · el examen: sin nada */}
      <Escena T={T} a={K.Ex} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          {(() => { const v = kprog(T, K.Ex + 0.3, K.Ex + 1.3, kEase.entra || kEase.suave), o = 1 - kprog(T, K.Ex + 1.0, K.Ex + 1.4);
            return <g opacity={o}>
              <g transform={`translate(${klerp(260, -260, v)} ${klerp(560, 420, v)}) rotate(${v * -30})`}><Laptop x={0} y={0} s={0.5} T={T} cerrar={1} /></g>
              <g transform={`translate(${klerp(820, 1360, v)} ${klerp(560, 420, v)}) rotate(${v * 30})`}><LibroCuaderno x={0} y={0} s={0.7} /></g>
            </g>; })()}
          {(() => { const o = 1 - kprog(T, exA - 0.3, exA + 0.1);
            return o > 0 && <g opacity={o}><Hoja x={540} y={930} s={0.78} T={T} titulo="EXAMEN" colorTitulo={KC.red} />
              <g transform={`translate(${760 + Math.sin(T * 9) * 10} ${1050}) rotate(35)`}>
                <rect x={-14} y={-160} width={28} height={220} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
                <path d="M -14 60 L 0 100 L 14 60 Z" fill="#e9c08a" stroke={KC.ink} strokeWidth={5} />
              </g></g>; })()}
        </>)}
      </Escena>
      <Chip T={T} at={K.Ex + 1.2} until={exA - 0.3} texto="ni compu ✕" x={300} y={520} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Ex + 2.0} until={exA - 0.3} texto="ni apuntes ✕" x={780} y={520} tam={42} borde={KC.red} />
      <Chip T={T} at={exA + 0.1} until={K.P - 0.15} texto="calificación del examen" x={640} y={700} tam={36} borde={KC.ink} />
      <BarrasH T={T} at={exA + 0.3} until={K.P - 0.15} top={780} filas={[
        { valor: 100, texto: 'referencia', etiqueta: 'sin IA (libro y apuntes)', color: AZUL },
        { valor: 83, texto: '−17 %', etiqueta: 'practicaron con chat tipo ChatGPT', color: KC.red, at: exA + 1.3 }]} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Mu} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={280} y={1100} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text>)}
      </Escena>

      {/* 7 · la muleta: pedían la respuesta y copiaban */}
      <Escena T={T} a={K.Mu} b={K.Er}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.22)" />
        {svg(<>
          <g opacity={kprog(T, K.Mu + 1.3, K.Mu + 1.7) * (1 - kprog(T, K.Mu + 4.1, K.Mu + 4.5))}>
            <Hoja x={800} y={800} s={0.5} T={T} marcas={[0, 1, 2, 3].map((i) => ({ at: K.Mu + 1.9 + i * 0.5, tipo: 'ok' }))} rot={4} />
            <text x={800} y={1000} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>copiado…</text>
          </g>
          {(() => { const e = kprog(T, K.Mu + 4.3, K.Mu + 4.8, kEase.rebote); return e > 0 && <g opacity={Math.min(1, e * 2)}><Muleta x={790 + (1 - e) * 300} y={800} s={0.95} rot={10 - e * 4} /></g>; })()}
        </>)}
      </Escena>
      {T > K.Mu - 0.45 && T < K.Er + 0.45 && <div style={{ opacity: kprog(T, K.Mu - 0.45, K.Mu + 0.05) * (1 - kprog(T, K.Er - 0.05, K.Er + 0.45)) }}>
        <CelularChat T={T} x={320} y={860} s={0.62} tam={34} escribe={[K.Mu + 0.7, K.Mu + 1.0]} mensajes={[
          { at: K.Mu + 0.2, yo: true, texto: '¿Cuál es la respuesta?' }, { at: K.Mu + 1.0, yo: false, texto: 'x = 4' },
          { at: K.Mu + 1.6, yo: true, texto: '¿Cuál es la respuesta?' }, { at: K.Mu + 2.2, yo: false, texto: 'x = 5' },
          { at: K.Mu + 2.8, yo: true, texto: '¿Cuál es la respuesta?' }, { at: K.Mu + 3.4, yo: false, texto: 'x = 12' },
          { at: K.Mu + 4.0, yo: true, texto: '¿Cuál es la respuesta?' }]} />
      </div>}
      <Chip T={T} at={K.Mu + 0.6} until={K.Er - 0.15} texto="el mensaje más común" x={760} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Mu + 4.6} until={K.Er - 0.15} texto="«muleta»" x={790} y={1150} tam={44} borde={KC.ink} />

      {/* 8 · errores y percepción */}
      <Escena T={T} a={K.Er} b={K.Tu}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g opacity={1 - kprog(T, erB - 0.3, erB + 0.1)}><Moneda x={290} y={900} s={0.95} T={T} /></g>
          <g opacity={kprog(T, erB, erB + 0.4)}>
            <Estudiante x={420} y={880} s={0.95} T={T} globo={['¿Aprendí menos?', '¡Para nada!']} globoO={kprog(T, erB + 0.5, erB + 0.9)} />
            <Hoja x={850} y={1010} s={0.38} T={T} titulo="EXAMEN" colorTitulo={KC.red} rot={8} />
          </g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Er + 0.4} until={erB - 0.2} valor={51} dur={0.9} sufijo=" %" x={760} y={860} tam={210} color={KC.yellow} />
      <Chip T={T} at={K.Er + 0.8} until={erB - 0.2} texto="respuestas correctas" x={760} y={1020} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Er + 1.4} until={erB - 0.2} texto="el chat (GPT-4) en 2023 · 57 ejercicios" x={540} y={1150} tam={26} mono borde={KC.ink} />
      <Chip T={T} at={erB + 1.2} until={K.Tu - 0.15} texto="−17 %" x={850} y={1180} tam={44} borde={KC.red} />

      {/* 9 · el tutor: pistas, no respuestas */}
      <Escena T={T} a={K.Tu} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<g opacity={1 - kprog(T, K.Tu + 3.0, K.Tu + 3.4)}>
          <Robotito x={400} y={860} s={1.0} T={T} cara="feliz" />
          <Foco x={720} y={700} s={0.9} luz={kprog(T, K.Tu + 0.8, K.Tu + 1.1)} T={T} />
        </g>)}
      </Escena>
      <Chip T={T} at={K.Tu + 1.2} until={K.Tu + 3.0} texto="pistas ✔" x={300} y={1130} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.Tu + 1.9} until={K.Tu + 3.0} texto="respuestas ✕" x={760} y={1130} tam={46} borde={KC.red} />
      <Chip T={T} at={K.Tu + 3.3} until={K.C - 0.15} texto="calificación del examen" x={540} y={700} tam={36} borde={KC.ink} />
      <BarrasH T={T} at={K.Tu + 3.4} until={K.C - 0.15} top={780} filas={[
        { valor: 100, texto: 'referencia', etiqueta: 'sin IA (libro y apuntes)', color: AZUL },
        { valor: 99, texto: '≈ igual', etiqueta: 'practicaron con el tutor de IA', color: KC.leaf, at: K.Tu + 4.1 }]} />

      {/* 10 · cierre: la misma laptop y hoja, ahora con pistas */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Laptop x={330} y={560} s={0.78} T={T} escribe={[K.C + 0.9, K.C + 1.3]}
            mensajes={[{ at: K.C + 0.4, yo: true, texto: 'Dame una pista' }, { at: K.C + 1.3, yo: false, texto: 'Resta 3 a los dos lados' }]} />
          <Hoja x={330} y={1000} s={0.76} T={T} titulo="EXAMEN" colorTitulo={KC.leaf} marcas={[0, 1, 2, 3].map((i) => ({ at: K.C + 2.0 + i * 0.45, tipo: 'ok' }))} />
        </>)}
      </Escena>
      <NumeroTachado T={T} at={K.C + 0.6} until={K.Ou} tachaEn={K.C + 2.9} texto="−17 %" x={800} y={900} />
      <Chip T={T} at={K.C + 3.2} until={K.Ou} texto="pistas, no respuestas ✔" x={790} y={1090} tam={36} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="*+48 %*… y luego *−17 %*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.E - 0.1} texto="Terminar *no es* aprender." />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Gr - 0.1} texto="*Casi mil* alumnos, 2023" />
      <Subtitulo T={T} idx={3} at={K.Gr + 0.1} until={K.Ex - 0.1} texto="Chat, tutor *o puro libro*" />
      <Subtitulo T={T} idx={4} at={K.Ex + 0.1} until={exA - 0.05} texto="Examen *sin nada.*" />
      <Subtitulo T={T} idx={5} at={exA} until={K.P - 0.1} texto="Con el chat: *−17 %*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Mu - 0.1} texto="¿Cómo te *quita puntos?*" />
      <Subtitulo T={T} idx={7} at={K.Mu + 0.1} until={K.Er - 0.1} texto="*Copiaban* la respuesta." />
      <Subtitulo T={T} idx={8} at={K.Er + 0.1} until={erB - 0.05} texto="Acertaba *la mitad.*" />
      <Subtitulo T={T} idx={9} at={erB} until={K.Tu - 0.1} texto="Y ellos *ni lo notaron.*" />
      <Subtitulo T={T} idx={10} at={K.Tu + 0.1} until={K.C - 0.1} texto="Pistas, *no respuestas.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="El examen *lo haces tú.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 3.1, CUES.Grupos - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Examen + 3.45, CUES.Pregunta - 0.15, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Muleta + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Errores + 0.2, CUES.Errores + 3.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Errores + 3.6, CUES.Tutor - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Tutor + 3.3, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TareaChatGPTApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TareaChatGPT /></CompositionStage></div>;
}
window.TareaChatGPTApp = TareaChatGPTApp;
