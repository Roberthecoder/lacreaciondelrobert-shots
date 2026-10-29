// Shot IA #30 · Tu teclado aprende de ti sin llevarse lo que escribes — NARRADO (N1 "Por dentro").
// Datos: Hard et al. (Google, arXiv:1811.03604, 2018) · McMahan y Ramage (blog de Google, 2017) · Apple, "Learning with Privacy at Scale" (2017)
// · Zhu, Liu y Han, "Deep Leakage from Gradients" (MIT, NeurIPS 2019). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// ---------- utilidades del shot ----------
// Texto que se va tecleando: devuelve lo escrito hasta T y la tecla que se está pulsando.
function escribe(T, t0, frase, cps = 10) {
  const n = Math.max(0, Math.min(frase.length, Math.floor((T - t0) * cps)));
  const pulsando = T >= t0 && T < t0 + frase.length / cps + 0.08 && n > 0 ? frase[n - 1] : null;
  return { txt: frase.slice(0, n), tecla: pulsando };
}
const SVGL = ({ children, z = 30 }) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;

// Candado (cerrado 0..1 baja el arco).
function Candado({ x, y, s = 1, cerrado = 1, color = KC.ink, cuerpo = KC.gold }) {
  const dy = (1 - cerrado) * -16;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -18 ${-6 + dy} V ${-26 + dy} A 18 18 0 0 1 18 ${-26 + dy} V ${-6 + dy}`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />
    <rect x={-30} y={-10} width={60} height={50} rx={10} fill={cuerpo} stroke={color} strokeWidth={6} />
    <circle cx={0} cy={10} r={6} fill={color} /><rect x={-3} y={12} width={6} height={14} fill={color} />
  </g>;
}
// Destello de 4 puntas.
const Destello = ({ x, y, r = 16, color = KC.yellow, rot = 0, o = 1 }) => <path transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}
  d={`M 0 ${-r} Q ${r * 0.18} ${-r * 0.18} ${r} 0 Q ${r * 0.18} ${r * 0.18} 0 ${r} Q ${-r * 0.18} ${r * 0.18} ${-r} 0 Q ${-r * 0.18} ${-r * 0.18} 0 ${-r} Z`} fill={color} stroke={KC.ink} strokeWidth={3} />;
// Paquetito de "lo aprendido": cubo dorado con brillitos (y candado opcional).
function Paquete({ x, y, s = 1, T = 0, candado = 0, brillo = 1 }) {
  const b = Math.sin(T * 3) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <circle r={110} fill={KC.yellow} opacity={0.18 * brillo} />
    <path d="M -60 -30 L 0 -62 L 60 -30 L 0 2 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -60 -30 L 0 2 L 0 72 L -60 40 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 60 -30 L 0 2 L 0 72 L 60 40 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -30 -46 L 30 -14 M 30 -46 L -30 -14" stroke={KC.ink} strokeWidth={4} opacity=".35" />
    {candado > 0 && <g opacity={Math.min(1, candado * 2)}><Candado x={30} y={30} s={0.55 * klerp(1.6, 1, candado)} cerrado={kclamp(candado * 1.4 - 0.4, 0, 1)} cuerpo={KC.paper} /></g>}
    {brillo > 0 && [0, 1, 2, 3].map((k) => { const a = T * 1.6 + k * Math.PI / 2; return <Destello key={k} x={Math.cos(a) * 100} y={Math.sin(a) * 86} r={14 + 5 * Math.sin(T * 5 + k)} rot={T * 60} o={brillo} />; })}
  </g>;
}

// Celular grande en HTML: chat arriba, caja de texto, barra de sugerencias y teclado.
const FILAS = ['qwertyuiop', 'asdfghjklñ', 'zxcvbnm'];
function Telefono({ T, x, y, s = 1, texto = '', tecla = null, sugs = null, sugOn = -1, sugAt = 0, chat = [], candado = 0, o = 1 }) {
  if (o <= 0.001) return null;
  return <div style={{ position:'absolute', left:x, top:y, width:520, height:960, transform:`translate(-50%,-50%) scale(${s})`, zIndex:20, opacity:o,
    background:'#f7f5f0', border:`12px solid ${KC.ink}`, borderRadius:66, boxShadow:'18px 22px 0 rgba(0,0,0,.35)', overflow:'hidden' }}>
    <div style={{ position:'absolute', left:170, top:14, width:156, height:30, borderRadius:16, background:KC.ink }}></div>
    {/* chat */}
    <div style={{ position:'absolute', left:22, right:22, top:70, height:330, display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:14 }}>
      {chat.filter((m) => T >= m.at).map((m, i) => { const e = kprog(T, m.at, m.at + 0.35, kEase.sale);
        return <div key={i} style={{ alignSelf:'flex-end', position:'relative', maxWidth:400, opacity:e, transform:`translateY(${(1 - e) * 40}px) scale(${0.8 + 0.2 * e})`, transformOrigin:'100% 100%',
          background:KC.cyan, color:KC.ink, border:`5px solid ${KC.ink}`, borderRadius:'30px 30px 8px 30px', padding:'14px 24px', font:`900 38px/1.15 ${KF.texto}` }}>
          {m.texto}
          {candado > 0 && <svg width={90} height={100} viewBox="-45 -55 90 100" style={{ position:'absolute', left:-58, top:-34, transform:`scale(${klerp(1.7, 1, candado)})`, opacity:Math.min(1, candado * 2) }}>
            <Candado x={0} y={0} s={1} cerrado={kclamp(candado * 1.4 - 0.4, 0, 1)} /></svg>}
        </div>; })}
    </div>
    {/* caja de texto */}
    <div style={{ position:'absolute', left:20, right:20, top:420, height:76, borderRadius:38, background:'#fff', border:`5px solid ${KC.ink}`, display:'flex', alignItems:'center', padding:'0 26px',
      font:`800 38px ${KF.texto}`, color:KC.ink }}>
      {texto}<span style={{ display:'inline-block', width:4, height:42, marginLeft:4, background:KC.blue, opacity:(T % 1) < 0.55 ? 1 : 0 }}></span>
    </div>
    {/* sugerencias */}
    <div style={{ position:'absolute', left:12, right:12, top:514, height:70, display:'flex', borderBottom:'3px solid #d9d3c6' }}>
      {[0, 1, 2].map((k) => { const sv = sugs && T >= sugAt + k * 0.08, on = k === sugOn && sv, e = sv ? kprog(T, sugAt + k * 0.08, sugAt + k * 0.08 + 0.3, kEase.sale) : 0;
        return <div key={k} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', borderLeft: k ? '3px solid #d9d3c6' : 'none' }}>
          {sv && <span style={{ font:`900 ${on ? 38 : 32}px ${KF.texto}`, color:KC.ink, opacity:e, background: on ? KC.gold2 : 'transparent', borderRadius:16, padding: on ? '4px 16px' : 0,
            border: on ? `4px solid ${KC.ink}` : 'none', boxShadow: on ? `0 0 ${20 + 10 * Math.sin(T * 6)}px ${KC.gold}` : 'none' }}>{sugs[k]}</span>}
        </div>; })}
    </div>
    {/* teclado */}
    <div style={{ position:'absolute', left:0, right:0, top:592, bottom:0, background:'#e3ded3', padding:'16px 8px 0' }}>
      {FILAS.map((f, r) => <div key={r} style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:12 }}>
        {f.split('').map((c) => { const on = tecla === c;
          return <div key={c} style={{ width:42, height:64, borderRadius:10, background: on ? KC.gold2 : '#fff', border:`3px solid ${on ? KC.ink : '#bdb6a8'}`,
            transform:`translateY(${on ? 3 : 0}px) scale(${on ? 1.18 : 1})`, display:'flex', alignItems:'center', justifyContent:'center', font:`700 28px ${KF.mono}`, color:KC.ink }}>{c}</div>; })}
      </div>)}
      <div style={{ display:'flex', justifyContent:'center' }}><div style={{ width:290, height:60, borderRadius:12, background: tecla === ' ' ? KC.gold2 : '#fff', border:'3px solid #bdb6a8' }}></div></div>
    </div>
  </div>;
}
// Celular chiquito en SVG (para la vista de lejos y la escena de Apple). brillo 0..1 lo enciende en dorado.
function MiniCel({ x, y, s = 1, brillo = 0, pantalla = '#1d2b4a', children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0.02 && <circle r={110} fill={KC.yellow} opacity={0.45 * brillo} />}
    <rect x={-60} y={-110} width={120} height={220} rx={22} fill={KC.ink} />
    <rect x={-50} y={-96} width={100} height={192} rx={14} fill={mixHex(pantalla, KC.gold2, brillo * 0.8)} />
    <rect x={-18} y={-104} width={36} height={6} rx={3} fill="#444" />
    {children}
  </g>;
}
// Servidor (gabinete) con lucecitas.
function Servidor({ x, y, s = 1, T = 0, mezcla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-170} width={280} height={340} rx={22} fill="#2b3445" stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(0 ${-110 + k * 100})`}>
      <rect x={-112} y={-34} width={224} height={72} rx={12} fill="#18202e" stroke={KC.ink} strokeWidth={5} />
      {[0, 1, 2].map((j) => <circle key={j} cx={-80 + j * 30} cy={2} r={9} fill={[KC.mint, KC.yellow, KC.cyan][j]} opacity={0.35 + 0.65 * ((Math.sin(T * 7 + k * 2 + j * 1.3) > 0) ? 1 : 0)} />)}
      {[0, 1, 2, 3].map((j) => <line key={j} x1={10 + j * 22} y1={-16} x2={10 + j * 22} y2={20} stroke="#56627a" strokeWidth={6} strokeLinecap="round" />)}
    </g>)}
    {mezcla > 0 && <g opacity={Math.min(1, mezcla * 3) * (1 - kprog(mezcla, 0.85, 1))}>
      {[0, 1, 2, 3, 4, 5].map((k) => { const a = T * 6 + k * Math.PI / 3, r = 150 * (1 - mezcla * 0.6); return <circle key={k} cx={Math.cos(a) * r} cy={Math.sin(a) * r * 0.5 - 220} r={16} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />; })}
    </g>}
  </g>;
}
// Íconos de las condiciones: cargando, sin usarse, wifi.
function Icono({ x, y, s = 1, tipo }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={78} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {tipo === 'enchufe' && <g><rect x={-30} y={-24} width={60} height={50} rx={12} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      <line x1={-14} y1={-24} x2={-14} y2={-48} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" /><line x1={14} y1={-24} x2={14} y2={-48} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <path d="M 0 26 Q 0 50 26 52" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" /></g>}
    {tipo === 'luna' && <g><path d="M 18 -44 A 46 46 0 1 0 30 34 A 36 36 0 1 1 18 -44 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
      <text x={22} y={-14} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>z</text><text x={40} y={-36} style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>z</text></g>}
    {tipo === 'wifi' && <g transform="translate(0 20)">{[60, 40, 20].map((r, k) => <path key={k} d={`M ${-r} ${-r * 0.55} A ${r} ${r} 0 0 1 ${r} ${-r * 0.55}`} transform={`translate(0 ${-r * 0.45})`} stroke={KC.blue} strokeWidth={10} fill="none" strokeLinecap="round" />)}
      <circle cx={0} cy={8} r={9} fill={KC.blue} /></g>}
  </g>;
}
// Dado que revuelve.
function Dado({ x, y, s = 1, rot = 0 }) {
  const P = [[-28, -28], [28, -28], [0, 0], [-28, 28], [28, 28]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-62} y={-62} width={124} height={124} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {P.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={11} fill={KC.ink} />)}
  </g>;
}
// Caritas (en vez de emojis, que el navegador del render no dibuja).
function Carita({ x, y, r = 30, tipo = 0 }) {
  if (tipo === 1) return <path transform={`translate(${x} ${y}) scale(${r / 30})`} d="M 0 26 C -40 -2 -26 -34 0 -14 C 26 -34 40 -2 0 26 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={4} />;
  if (tipo === 2) return <g transform={`translate(${x} ${y}) scale(${r / 30})`}><path d="M 0 -30 L 9 -9 L 30 -9 L 13 5 L 19 28 L 0 14 L -19 28 L -13 5 L -30 -9 L -9 -9 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /></g>;
  return <g transform={`translate(${x} ${y}) scale(${r / 30})`}><circle r={28} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-10} cy={-6} r={4} fill={KC.ink} /><circle cx={10} cy={-6} r={4} fill={KC.ink} />
    <path d={tipo === 3 ? 'M -14 10 Q 0 2 14 10' : 'M -14 6 Q 0 22 14 6'} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" /></g>;
}
// Ventana "por dentro" circular, unida con línea punteada a su origen.
function Ventana({ T, at, until, x, y, r, fx, fy, etiqueta, children }) {
  if (!kvisible(T, at, until)) return null;
  const e = kprog(T, at, at + 0.5, kEase.sale) * (1 - kprog(T, until, until + 0.4));
  return <>
    <SVGL z={24}><line x1={fx} y1={fy} x2={klerp(fx, x, e)} y2={klerp(fy, y, e)} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 12" /><circle cx={fx} cy={fy} r={14} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} /></SVGL>
    <div style={{ position:'absolute', left:x - r, top:y - r, width:2 * r, height:2 * r, borderRadius:'50%', overflow:'hidden', zIndex:25, background:KC.noche,
      border:`10px solid ${KC.ink}`, boxShadow:`0 0 0 8px ${KC.paper}, 0 24px 40px rgba(0,0,0,.4)`, transform:`scale(${e})` }}>{children}</div>
    <Chip T={T} at={at + 0.3} until={until} texto={etiqueta} x={x} y={y - r - 46} tam={28} mono borde={KC.cyan} />
  </>;
}
// Barras horizontales compactas (porcentaje sobre un máximo).
function Barras({ T, at, until, filas, top = 660, max = 20 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.0, kEase.sale);
      return <div key={i} style={{ marginBottom: f.sep ? 0 : 10, opacity: kprog(T, a0, a0 + 0.25) }}>
        <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink, marginBottom:2 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:Math.max(14, 640 * f.valor / max * g), height:50, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:14 }}></div>
          <div style={{ font:`400 52px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{kformato(f.valor * g, 1)} %</div>
        </div>
      </div>; })}
  </div>;
}

function Teclado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pd: CUES.Prediccion, Es: CUES.Estudia, Pq: CUES.Paquete, Pm: CUES.Promedio, P: CUES.Pregunta, E: CUES.Estudio, R: CUES.Resultado, A: CUES.Apple, M: CUES.Matiz, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // --- celular del gancho y la predicción (capa continua de 0 a Estudia) ---
  const w1 = escribe(T, K.G + 0.05, 'te quiero', 11), w2 = escribe(T, K.Pd + 0.15, 'te quiero', 11);
  const enPd = T >= K.Pd + 0.1;
  const tel1 = {
    texto: enPd ? w2.txt : (T < K.G + 1.75 ? w1.txt : ''), tecla: enPd ? w2.tecla : w1.tecla,
    sugs: ['y', 'mucho', 'también'], sugAt: enPd ? K.Pd + 1.2 : K.G + 1.0, sugOn: enPd ? (T > K.Pd + 1.6 ? 1 : -1) : (T > K.G + 1.35 && T < K.G + 1.75 ? 1 : -1),
    chat: [{ at: K.G + 1.75, texto: 'te quiero mucho' }], candado: kprog(T, K.G + 2.2, K.G + 2.6, kEase.sale),
  };
  if (enPd && T < K.Pd + 1.2) tel1.sugs = T < K.Pd + 0.15 ? null : tel1.sugs;
  const oTel1 = 1 - kprog(T, K.Es - 0.35, K.Es + 0.1);
  // paquete que sale volando en el gancho
  const pqG = kprog(T, K.G + 2.8, K.G + 3.4, kEase.sale), pqGsale = kprog(T, K.G + 4.0, K.G + 4.6, kEase.entra || kEase.suave);
  // cierre
  const pqC = kprog(T, K.C + 1.2, K.C + 1.8, kEase.sale), pqCsale = kprog(T, K.C + 3.6, K.C + 4.3, kEase.suave);

  // --- vista de lejos: celulares y servidor ---
  const cels = [[130, 900], [270, 965], [410, 1005], [540, 1020], [670, 1005], [810, 965], [950, 900]];
  const SV = [540, 500];
  const fichas = ['te quiero', 'ya llegué', 'nos vemos'];
  const frase = ['nos', 'vemos', 'el', 'lunes'];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho */}
      <Escena T={T} a={K.G} b={K.Pd}><FondoLunares color={KC.yellow} /></Escena>
      {/* 2 · predicción */}
      <Escena T={T} a={K.Pd} b={K.Es}><FondoLunares color={KC.mint} /></Escena>
      <Telefono T={T} x={380} y={780} s={0.8} o={oTel1} {...tel1} />
      {T < K.Pd + 0.2 && pqG > 0 && <SVGL z={35}><Paquete x={380} y={klerp(460, 330, pqG) - 700 * pqGsale} s={klerp(0.3, 0.95, pqG)} T={T} brillo={pqG} /></SVGL>}
      <Ventana T={T} at={K.Pd + 2.3} until={K.Es - 0.3} x={820} y={1000} r={185} fx={545} fy={870} etiqueta="POR DENTRO · el modelo">
        <RedNeuronal T={T} x={60} y={80} ancho={250} alto={210} capas={[3, 5, 5, 3]} onda={((T - K.Pd) * 0.7) % 1} />
      </Ventana>

      {/* 3 · estudia: por dentro del celular */}
      <Escena T={T} a={K.Es} b={K.Pq}>
        <FondoCircuito T={T} />
        <SVGL>
          {[['enchufe', 300, 'cargando'], ['luna', 540, 'sin usarse'], ['wifi', 780, 'wifi']].map(([t, x, et], k) => { const e = kprog(T, K.Es + 0.2 + k * 0.6, K.Es + 0.6 + k * 0.6, kEase.rebote);
            return <g key={t} opacity={Math.min(1, e * 2)}><Icono x={x} y={400} s={0.85 * e} tipo={t} />
              <text x={x} y={505} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{et}</text></g>; })}
          <rect x={250} y={560} width={580} height={500} rx={60} fill="rgba(0,210,255,.06)" stroke={KC.cyan} strokeWidth={6} strokeDasharray="20 14" opacity={kprog(T, K.Es + 1.5, K.Es + 2)} />
          {fichas.map((f, k) => { const t0 = K.Es + 2.0 + k * 0.7, u = kprog(T, t0, t0 + 1.1, kEase.suave);
            return T >= t0 && <Ficha key={f} x={klerp(-120, 360, u)} y={650 + k * 150} texto={f} tam={34} o={1 - kprog(T, t0 + 1.0, t0 + 1.3)} color={KC.cyan} />; })}
        </SVGL>
        <RedNeuronal T={T} x={330} y={590} ancho={420} alto={420} capas={[4, 6, 6, 4]} onda={T > K.Es + 2.2 ? ((T - K.Es) * 0.8) % 1 : null} o={kprog(T, K.Es + 1.6, K.Es + 2.1)} />
      </Escena>
      <Chip T={T} at={K.Es + 2.6} until={K.Pq - 0.2} texto="se entrena en tu celular" x={540} y={1130} tam={34} borde={KC.cyan} />

      {/* 4 · el paquetito cifrado */}
      <Escena T={T} a={K.Pq} b={K.Pm} zoom={0.03}>
        <FondoCircuito T={T} color={KC.gold2} />
        <RedNeuronal T={T} x={330} y={560} ancho={420} alto={460} capas={[4, 6, 6, 4]} onda={((T - K.Pq) * 0.8) % 1} o={1 - kprog(T, K.Pq + 0.2, K.Pq + 1.0)} />
        <SVGL>
          {(() => { const g = kprog(T, K.Pq + 0.5, K.Pq + 1.2, kEase.rebote), mv = kprog(T, K.Pq + 2.4, K.Pq + 3.1, kEase.sale);
            return g > 0 && <Paquete x={klerp(540, 790, mv)} y={klerp(790, 760, mv)} s={1.3 * g} T={T} candado={kprog(T, K.Pq + 1.4, K.Pq + 1.8, kEase.sale)} />; })()}
          {[['te quiero mucho', 870], ['ya llegué', 990]].map(([t, yy], k) => { const e = kprog(T, K.Pq + 2.6 + k * 0.25, K.Pq + 3.0 + k * 0.25, kEase.sale);
            return e > 0 && <g key={t} opacity={e} transform={`translate(${klerp(-80, 0, e)} 0)`}>
              <rect x={70} y={yy - 44} width={t.length * 22 + 60} height={84} rx={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
              <text x={100} y={yy + 12} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{t}</text>
              <Candado x={t.length * 22 + 130} y={yy - 6} s={0.7} cuerpo={KC.paper} cerrado={kprog(T, K.Pq + 3.1 + k * 0.25, K.Pq + 3.4 + k * 0.25)} />
            </g>; })}
        </SVGL>
      </Escena>
      <Chip T={T} at={K.Pq + 1.3} until={K.Pq + 2.3} texto="actualización · chiquita y cifrada" x={540} y={1050} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Pq + 3.2} until={K.Pm - 0.2} texto="tus frases: no salen" x={300} y={1120} tam={34} borde={KC.cyan} />

      {/* 5 · el servidor promedia */}
      <Escena T={T} a={K.Pm} b={K.P}>
        <FondoLunares color={KC.cyan} />
        <SVGL>
          <Servidor x={SV[0]} y={SV[1]} s={0.9} T={T} mezcla={kprog(T, K.Pm + 1.8, K.Pm + 2.8)} />
          {cels.map(([cx, cy], k) => { const t0 = K.Pm + 0.3 + k * 0.16, u = kprog(T, t0, t0 + 0.9, kEase.suave), b0 = K.Pm + 2.9 + k * 0.06, ub = kprog(T, b0, b0 + 0.8, kEase.suave);
            return <g key={k}>
              <MiniCel x={cx} y={cy} s={0.72} brillo={kprog(T, b0 + 0.7, b0 + 0.9) * (1 - kprog(T, b0 + 1.6, b0 + 2.2)) + (T > b0 + 0.8 ? 0.25 : 0)} />
              {u > 0 && u < 1 && <Paquete x={klerp(cx, SV[0], u)} y={klerp(cy - 90, SV[1] + 60, u)} s={0.32} T={T} brillo={0} candado={1} />}
              {ub > 0 && ub < 1 && <g transform={`translate(${klerp(SV[0], cx, ub)} ${klerp(SV[1] + 120, cy - 80, ub)})`}><circle r={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /><Destello x={0} y={0} r={18} color={KC.paper} rot={T * 90} /></g>}
            </g>; })}
        </SVGL>
      </Escena>
      <Chip T={T} at={K.Pm + 0.4} until={K.P - 0.2} texto="100 a 500 celulares por ronda" x={620} y={330} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Pm + 1.9} until={K.Pm + 2.9} texto="promedio" x={540} y={735} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Pm + 3.0} until={K.P - 0.2} texto="modelo mejor ✔" x={540} y={735} tam={40} borde={KC.leaf} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        <SVGL><text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text></SVGL>
      </Escena>

      {/* 7 · el estudio */}
      <Escena T={T} a={K.E} b={K.R}><FondoLunares color={KC.lilac} /></Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.R - 0.3} anio="2018" quien="Google · teclado Gboard" revista="Hard et al. · arXiv:1811.03604" y={560} />
      <NumeroGigante T={T} at={K.E + 2.0} until={K.R - 0.3} valor={1.5} dec={1} dur={0.8} sufijo=" millones" etiqueta="de celulares" y={880} tam={110} color={KC.yellow} />
      <NumeroGigante T={T} at={K.E + 3.4} until={K.R - 0.3} valor={600} dur={1.0} sufijo=" millones" etiqueta="de frases" y={1080} tam={110} color={KC.mint} />

      {/* 8 · resultado */}
      <Escena T={T} a={K.R} b={K.A}><FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" /></Escena>
      <Chip T={T} at={K.R + 0.2} until={K.A - 0.2} texto="aciertos de la 1.ª sugerencia" x={350} y={380} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.R + 0.5} until={K.A - 0.2} texto="probados con textos del servidor" x={350} y={470} tam={24} mono borde={KC.texto} />
      <Barras T={T} at={K.R + 0.5} until={K.A - 0.2} top={625} filas={[
        { valor: 16.5, etiqueta: 'entrenado en servidores', color: '#7f8ba3' },
        { valor: 16.4, etiqueta: 'federado (en los celulares)', color: KC.mint, at: K.R + 1.0, sep: true },
      ]} />
      <Chip T={T} at={K.R + 2.0} until={K.A - 0.2} texto="probados con textos de los celulares" x={390} y={865} tam={24} mono borde={KC.texto} />
      <Barras T={T} at={K.R + 2.1} until={K.A - 0.2} top={900} filas={[
        { valor: 15.0, etiqueta: 'entrenado en servidores', color: '#7f8ba3' },
        { valor: 15.8, etiqueta: 'federado (en los celulares)', color: KC.mint, at: K.R + 2.6 },
      ]} />

      {/* 9 · Apple */}
      <Escena T={T} a={K.A} b={K.M}><FondoLunares color={KC.pink} /></Escena>
      <SVGL z={22}>{T > K.A - 0.4 && T < K.M + 0.4 && (() => { const o = kprog(T, K.A - 0.4, K.A + 0.1) * (1 - kprog(T, K.M - 0.1, K.M + 0.4));
        const pts = Array.from({ length: 14 }, (_, k) => { const t0 = K.A + 2.0 + k * 0.28, u = kprog(T, t0, t0 + 1.6); return { k, u, t0 }; });
        const col = [KC.yellow, KC.pink, KC.cyan, KC.mint, KC.orange];
        return <g opacity={o}>
          <MiniCel x={790} y={790} s={2.0} pantalla="#fffdf6">
            {[0, 1, 2, 3].map((t, k) => <Carita key={k} x={-30 + (k % 2) * 60} y={-50 + Math.floor(k / 2) * 66} r={22} tipo={t} />)}
          </MiniCel>
          <Dado x={470} y={790} s={1} rot={T > K.A + 2 ? (T - K.A) * 240 : 0} />
          {pts.map(({ k, u }) => u > 0 && u < 1 && (() => { const a = u < 0.5 ? u / 0.5 : 1, b = u < 0.5 ? 0 : (u - 0.5) / 0.5;
            const x = u < 0.5 ? klerp(680, 470, a) : klerp(470, 150, b), y = u < 0.5 ? 790 : klerp(790, 790 + ((k * 53) % 160) - 80, b);
            return <g key={k} transform={`translate(${x} ${y})`}>{u < 0.5 ? <Carita x={0} y={0} r={18} tipo={k % 4} /> : <circle r={16} fill={col[(k * 7) % 5]} stroke={KC.ink} strokeWidth={4} />}</g>; })())}
          <g opacity={kprog(T, K.A + 1.6, K.A + 2.0)}><circle cx={150} cy={790} r={70} fill={KC.paper} stroke={KC.ink} strokeWidth={7} /><text x={150} y={805} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Apple</text></g>
        </g>; })()}</SVGL>
      <Chip T={T} at={K.A + 0.6} until={K.M - 0.2} texto="si aceptas compartir" x={760} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.A + 2.4} until={K.M - 0.2} texto="se revuelve al azar antes de salir" x={540} y={1135} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.A + 3.6} until={K.M - 0.2} texto="privacidad diferencial · 2017" x={540} y={1060} tam={26} mono borde={KC.texto} />

      {/* 10 · el matiz: no es privacidad perfecta */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoCircuito T={T} color={KC.red} />
        <SVGL><Paquete x={430} y={600} s={1.1} T={T} candado={1} brillo={0.6} /></SVGL>
        <SVGL>{(() => { let xx = 140; return frase.map((w, k) => { const tw = Math.max(70, w.length * 34 * 0.62 + 40), cx = xx + tw / 2; xx += tw + 22;
          const t0 = K.M + 1.8 + k * 0.5, e = kprog(T, t0, t0 + 0.4, kEase.rebote), rv = T > t0 + 1.4 + k * 0.4;
          const u = kprog(T, t0, t0 + 0.6, kEase.sale);
          return e > 0 && <Ficha key={k} x={klerp(430, cx + 40, u)} y={klerp(620, 860, u)} s={e} texto={rv ? w : '?'} tam={44} color={rv ? KC.yellow : '#7f8ba3'} />; }); })()}</SVGL>
      </Escena>
      <Chip T={T} at={K.M + 0.8} until={K.C - 0.2} texto="MIT · 2019" x={330} y={400} tam={40} borde={KC.red} />
      <Chip T={T} at={K.M + 4.4} until={K.C - 0.2} texto="en pruebas de laboratorio" x={540} y={1000} tam={36} borde={KC.red} />
      <Chip T={T} at={K.M + 4.8} until={K.C - 0.2} texto="frase de ejemplo" x={540} y={1090} tam={24} mono borde={KC.texto} />

      {/* 11 · cierre: el mismo celular del inicio */}
      <Escena T={T} a={K.C} b={FIN}><FondoLunares color={KC.yellow} /></Escena>
      <Telefono T={T} x={380} y={780} s={0.8} o={kprog(T, K.C - 0.4, K.C + 0.1)} texto="te quiero" sugs={['y', 'mucho', 'también']} sugAt={K.C} sugOn={1}
        chat={[{ at: K.C - 1, texto: 'te quiero mucho' }]} candado={kprog(T, K.C + 0.4, K.C + 0.8, kEase.sale)} />
      {pqC > 0 && <SVGL z={35}><Paquete x={380} y={klerp(460, 330, pqC) - 700 * pqCsale} s={klerp(0.3, 0.95, pqC)} T={T} brillo={pqC} /></SVGL>}
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="se queda: tus frases" x={790} y={770} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="viaja: lo aprendido" x={380} y={300} tam={32} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pd - 0.1} texto="Hay teclados que *no mandan* lo que escribes." />
      <Subtitulo T={T} idx={1} at={K.Pd + 0.1} until={K.Es - 0.1} texto="«te quiero» → *«mucho»*, calculado *en tu celular.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.Pq - 0.1} texto="Cargando, quieto y con wifi: *entrena.*" />
      <Subtitulo T={T} idx={3} at={K.Pq + 0.1} until={K.Pm - 0.1} texto="Una actualización *chiquita y cifrada.*" />
      <Subtitulo T={T} idx={4} at={K.Pm + 0.1} until={K.P - 0.1} texto="Cientos de celulares: *se promedian.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Aprende igual *sin ver tus mensajes?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.R - 0.1} texto="Google, 2018: *1.5 millones de celulares.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.A - 0.1} texto="Atinó *igual o un poco más.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.M - 0.1} texto="Apple, 2017: *revuelve los datos al azar.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="No es perfecta: *reconstruyeron frases.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tus frases se quedan. *Viaja lo aprendido.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Prediccion - 0.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Prediccion + 1.4, CUES.Estudia - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Paquete + 0.4, CUES.Promedio - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Resultado + 0.9, CUES.Apple - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Apple + 0.4, CUES.Apple + 5.0, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Matiz + 0.5, CUES.Matiz + 6.5, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="30" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TecladoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Teclado /></CompositionStage></div>;
}
window.TecladoApp = TecladoApp;
