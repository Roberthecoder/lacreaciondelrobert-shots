// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Ambiental #47 · ¿Una pila contamina 600 mil litros de agua? De dónde salió el dato — NARRADO (N2 el número + mito "¿Por qué NO…?").
// Datos: notas que repiten la cifra (Opinión 2012, RPP 2015, Infobae 2019), Public Law 104-142 (EE. UU., 1996), EPA "Used Household Batteries",
// Convenio de Minamata (Anexo A), Karnchanawong y Limpiteeprakan 2009 (Waste Management, Chiang Mai) y LGPGIR (México). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (recortes sin nombres de medios reales; columnas de prueba = lisímetros).

const AGUA = '#3aa0ff', TURBIA = '#7d7a3e';
// Garrafón de agua de 20 L. (x, y) = centro de la base. tinte 0..1 = qué tan turbia está el agua.
function Garrafon({ x, y, tinte = 0, T = 0, s = 1, children }) {
  const col = mixHex(AGUA, TURBIA, kclamp(tinte, 0, 1));
  const cuerpo = 'M -150 0 Q -170 0 -170 -30 L -170 -300 Q -170 -350 -110 -370 L -60 -385 L -60 -420 L 60 -420 L 60 -385 L 110 -370 Q 170 -350 170 -300 L 170 -30 Q 170 0 150 0 Z';
  const ola = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={`gf${Math.round(x)}`}><path d={cuerpo} /></clipPath></defs>
    <path d={cuerpo} fill="rgba(255,255,255,.55)" />
    <g clipPath={`url(#gf${Math.round(x)})`}>
      <path d={`M -180 -330 Q -90 ${-345 + ola} 0 -330 T 180 -330 L 180 10 L -180 10 Z`} fill={col} opacity={0.9} />
      {[-110, -40, 50, 120].map((bx, i) => <circle key={i} cx={bx} cy={-60 - ((T * 70 + i * 60) % 240)} r={7 + (i % 2) * 4} fill="#fff" opacity={0.45} />)}
      {children}
    </g>
    <path d={cuerpo} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-250, -170, -90].map((yy) => <path key={yy} d={`M -170 ${yy} Q 0 ${yy + 24} 170 ${yy}`} stroke={KC.ink} strokeWidth={4} fill="none" opacity={0.35} />)}
    <rect x={-70} y={-445} width={140} height={34} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={-260} width={50} height={150} rx={20} fill="#fff" opacity={0.35} />
  </g>;
}
// Pila AA (cilindro): polo + arriba con botón, banda de color, "1.5 V". (x, y) = centro.
function PilaAA({ x, y, s = 1, rot = 0, o = 1, banda = KC.orange, cuerpo = '#26221e', texto = 'AA', sub = '1.5 V', sy = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s} ${s * sy})`} opacity={o}>
    <rect x={-16} y={-150} width={32} height={22} rx={6} fill="#cfd5dc" stroke={KC.ink} strokeWidth={5} />
    <rect x={-48} y={-132} width={96} height={264} rx={18} fill={cuerpo} stroke={KC.ink} strokeWidth={7} />
    <rect x={-48} y={-132} width={96} height={86} rx={18} fill={banda} stroke={KC.ink} strokeWidth={7} />
    <rect x={-48} y={-60} width={96} height={14} fill={banda} />
    <rect x={-34} y={-120} width={14} height={236} rx={7} fill="#fff" opacity={0.25} />
    <text x={0} y={-80} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>+</text>
    <text x={4} y={20} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff">{texto}</text>
    <text x={4} y={70} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">{sub}</text>
    <rect x={-40} y={120} width={80} height={12} rx={4} fill="#9aa3ad" />
  </g>;
}
// Pila de botón (disco plano visto de lado y un poco desde arriba). (x, y) = centro.
function PilaBoton({ x, y, s = 1, o = 1, color = '#cfd5dc', texto = '', sub = '', sy = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s} ${s * sy})`} opacity={o}>
    <path d="M -80 -6 L -80 18 A 80 26 0 0 0 80 18 L 80 -6 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-6} rx={80} ry={26} fill={color} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-20} cy={-12} rx={36} ry={9} fill="#fff" opacity={0.5} />
    {texto && <text x={0} y={2} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#0b1020">{texto}</text>}
    {sub && <text x={0} y={60} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill={KC.ink}>{sub}</text>}
  </g>;
}
// Recorte de periódico (esquema, sin nombres de medios). e = entrada 0..1, marca 0..1 = "fuente: ¿?" en rojo.
function Recorte({ x, y, rot = 0, cifra, e = 1, marca = 0 }) {
  if (e <= 0) return null;
  const caida = (1 - e) * -500;
  return <g transform={`translate(${x} ${y + caida}) rotate(${rot + (1 - e) * 25})`} opacity={kclamp(e * 2, 0, 1)}>
    <path d="M -180 -125 L -150 -132 L -110 -124 L -60 -133 L 0 -126 L 60 -134 L 120 -125 L 180 -131 L 184 -60 L 178 20 L 184 128 L 120 122 L 40 130 L -40 123 L -120 131 L -182 125 L -176 40 L -184 -40 Z"
      fill="#fbf7ec" stroke={KC.ink} strokeWidth={6} />
    {[0, 1].map((i) => <rect key={i} x={-150} y={-105 + i * 20} width={i ? 200 : 300} height={11} rx={4} fill="#3a3530" opacity={0.85} />)}
    <text x={0} y={18} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill="#0b1020">{cifra}</text>
    <text x={0} y={52} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#5a524a">litros de agua</text>
    {[0, 1].map((i) => <rect key={i} x={-150} y={70 + i * 16} width={300 - i * 70} height={8} rx={3} fill="#9b948a" />)}
    <rect x={-150} y={104} width={210} height={20} rx={5} fill={marca > 0 ? mixHex('#fbf7ec', '#ffb3ac', marca) : '#fbf7ec'} />
    <text x={-146} y={120} style={{ font:`700 18px ${KF.mono}` }} fill={marca > 0.3 ? KC.red : '#9b948a'}>fuente: ¿?</text>
  </g>;
}
// Lupa dibujada (solo el aro y el mango).
function LupaDibujo({ x, y, r = 90 }) {
  return <g transform={`translate(${x} ${y})`}>
    <line x1={r * 0.7} y1={r * 0.7} x2={r * 1.7} y2={r * 1.7} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <line x1={r * 0.8} y1={r * 0.8} x2={r * 1.6} y2={r * 1.6} stroke={KC.orange} strokeWidth={16} strokeLinecap="round" />
    <circle r={r} fill="rgba(200,240,255,.35)" stroke={KC.ink} strokeWidth={14} />
    <path d={`M ${-r * 0.55} ${-r * 0.3} A ${r * 0.6} ${r * 0.6} 0 0 1 ${-r * 0.2} ${-r * 0.6}`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Sello (div): titulo + sub, entra "golpeando" (escala 1.6 → 1).
function Sello({ T, at, until, x, y, titulo, sub, color = KC.red, rot = -3 }) {
  if (!kvisible(T, at, until)) return null;
  const p = kprog(T, at, at + 0.25, kEase.sale), o = 1 - kprog(T, until - 0.1, until + 0.3);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${1.6 - 0.6 * p})`, opacity:p * o,
    border:`8px solid ${color}`, borderRadius:22, padding:'12px 30px', background:'rgba(255,255,255,.88)', textAlign:'center', boxShadow:'0 10px 26px rgba(0,0,0,.35)' }}>
    <div style={{ font:`400 64px/1 ${KF.titulo}`, color, letterSpacing:'.02em', whiteSpace:'nowrap' }}>{titulo}</div>
    {sub && <div style={{ font:`900 30px ${KF.texto}`, color:'#0b1020', marginTop:8, whiteSpace:'nowrap' }}>{sub}</div>}
  </div>;
}
// Columna de prueba (lisímetro, esquema): tubo con capas de basura y n pilas; vaso abajo que se llena (lleno 0..1).
function Columna({ x, y0 = 730, h = 280, n = 0, seed = 1, lleno = 0, tinte = 0 }) {
  const r = krng(seed), w = 150;
  const basura = Array.from({ length: 16 }, () => ({ x: -w / 2 + 16 + r() * (w - 32), y: y0 + 30 + r() * (h - 70), rx: 14 + r() * 14, ry: 8 + r() * 8, c: ['#8a6a48', '#a7a29b', '#6f8a5a', '#c9b28a'][Math.floor(r() * 4)] }));
  const pilas = Array.from({ length: n }, (_, i) => ({ x: -w / 2 + 22 + r() * (w - 44), y: y0 + 40 + r() * (h - 90), rot: r() * 180 }));
  return <g transform={`translate(${x} 0)`}>
    <rect x={-w / 2} y={y0} width={w} height={h} rx={14} fill="rgba(255,255,255,.55)" />
    <rect x={-w / 2 + 6} y={y0 + h - 34} width={w - 12} height={28} fill="#b8a98f" />
    {basura.map((b, i) => <ellipse key={i} cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill={b.c} stroke={KC.ink} strokeWidth={3} />)}
    {pilas.map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}><rect x={-9} y={-24} width={18} height={48} rx={5} fill="#26221e" stroke={KC.ink} strokeWidth={3} /><rect x={-9} y={-24} width={18} height={15} rx={5} fill={KC.orange} /></g>)}
    <rect x={-w / 2} y={y0} width={w} height={h} rx={14} fill="none" stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={y0 + h} width={20} height={22} fill="#cfd5dc" stroke={KC.ink} strokeWidth={4} />
    <g transform={`translate(0 ${y0 + h + 34})`}>
      <path d="M -50 0 L -42 78 Q -42 86 -34 86 L 34 86 Q 42 86 42 78 L 50 0" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${-45 + 3 * (1 - lleno)} ${84 - 80 * lleno} L 43 ${84 - 80 * lleno} L 40 84 L -40 84 Z`} fill={mixHex('#d9ecff', '#a87a3a', tinte)} opacity={lleno > 0 ? 0.9 : 0} />
    </g>
  </g>;
}
// Gotas con letra (Mn, Zn) que caen de y0 a y1 cada `cada` s.
function GotasMetal({ T, x, y0, y1, desde, hasta, cada = 0.6, letras = [] }) {
  const out = [];
  for (let k = 0; ; k++) { const t0 = desde + k * cada; if (t0 > T || t0 > hasta) break; const u = (T - t0) / 0.7; if (u > 1) continue;
    const L = letras.length ? letras[k % letras.length] : null;
    out.push(<g key={k} transform={`translate(${x} ${klerp(y0, y1, u * u)})`}>
      <path d="M 0 -20 Q 13 0 0 13 Q -13 0 0 -20 Z" fill={L ? '#c98a3a' : '#9fc9ef'} stroke={KC.ink} strokeWidth={3} />
      {L && <text x={18} y={8} style={{ font:`900 26px ${KF.texto}` }} fill="#fff" stroke="#0b1020" strokeWidth={6} paintOrder="stroke">{L}</text>}
    </g>); }
  return <g>{out}</g>;
}
// Bote de basura (base en y).
function Bote({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -280 L 120 -280 L 100 0 L -100 0 Z" fill="#8f99a3" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-50, 0, 50].map((xx) => <line key={xx} x1={xx} y1={-240} x2={xx * 0.85} y2={-30} stroke={KC.ink} strokeWidth={5} opacity={0.5} />)}
    <rect x={-138} y={-312} width={276} height={36} rx={12} fill="#6c757e" stroke={KC.ink} strokeWidth={8} />
    <rect x={-30} y={-334} width={60} height={24} rx={8} fill="#6c757e" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Contenedor de acopio de pilas (base en y).
function Acopio({ x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <circle cx={0} cy={-150} r={200} fill={KC.yellow} opacity={0.35 * brillo} />}
    <rect x={-120} y={-300} width={240} height={300} rx={18} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
    <rect x={-70} y={-270} width={140} height={22} rx={11} fill="#0b1020" />
    <text x={0} y={-180} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill="#fff" stroke="#0b1020" strokeWidth={5} paintOrder="stroke">ACOPIO</text>
    <text x={0} y={-128} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff" stroke="#0b1020" strokeWidth={5} paintOrder="stroke">DE PILAS</text>
    <g transform="translate(0 -60) scale(.28)"><PilaAA x={-60} y={0} rot={-90} /><PilaAA x={60} y={40} rot={-90} banda={KC.yellow} /></g>
  </g>;
}
// Llama y chispas (fuego por pila dañada).
function Fuego({ T, x, y, s = 1, o = 1 }) {
  const f = 1 + 0.12 * Math.sin(T * 22), g = 1 + 0.1 * Math.sin(T * 17 + 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M 0 ${-150 * f} Q 60 -90 55 -30 Q 50 10 0 12 Q -50 10 -55 -30 Q -60 -80 -20 -110 Q -10 -60 10 -70 Q 30 -100 0 ${-150 * f} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 ${-80 * g} Q 30 -40 25 -10 Q 15 8 0 8 Q -15 8 -25 -10 Q -28 -40 0 ${-80 * g} Z`} fill={KC.yellow} />
    {Array.from({ length: 6 }, (_, i) => { const a = i * 1.05 + T * 3, rr = 80 + ((T * 160 + i * 40) % 90); return <path key={i} d="M 0 -12 L 4 -4 L 12 0 L 4 4 L 0 12 L -4 4 L -12 0 L -4 -4 Z" transform={`translate(${Math.cos(a) * rr} ${-60 + Math.sin(a) * rr * 0.6})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />; })}
  </g>;
}
// Tache rojo y palomita.
function Tache({ x, y, p = 1, r = 90 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y})`} opacity={kclamp(p * 3, 0, 1)}>
    <line x1={-r} y1={-r} x2={-r + 2 * r * kclamp(p * 2, 0, 1)} y2={-r + 2 * r * kclamp(p * 2, 0, 1)} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
    {p > 0.5 && <line x1={r} y1={-r} x2={r - 2 * r * kclamp(p * 2 - 1, 0, 1)} y2={-r + 2 * r * kclamp(p * 2 - 1, 0, 1)} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />}
  </g>;
}
function Palomita({ x, y, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}>
    <circle r={46} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M -22 2 L -6 18 L 24 -16" stroke="#fff" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function PilasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ci: CUES.Cifras, F: CUES.Fuente, M: CUES.Mercurio, Le: CUES.Leyes, P: CUES.Pregunta, Es: CUES.Estudio, Esc: CUES.Escurre, Li: CUES.Litio, Mx: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const GX = 540, GY = 1340, GS = 1.95;   // garrafón del gancho: llena el cuadro
  const CX = 300, CY = 1330, CS = 1.5;      // garrafón del cierre (comparte cuadro con el acopio)

  // gancho: la pila cae al garrafón y el agua se enturbia
  const caeG = kprog(T, K.G - 0.3, K.G + 0.45, kEase.entra);
  const tinteG = kprog(T, K.G + 0.5, K.G + 2.4, kEase.suave);
  const pilaG = <PilaAA x={GX + 40} y={klerp(120, GY - 250, caeG)} rot={klerp(-40, 70, caeG)} s={1.05} />;
  const pilaFondo = <PilaAA x={20} y={-120} rot={70} s={0.5} />;   // la pila ya dentro del garrafón (coordenadas del garrafón)
  const splash = (t0) => { const u = kprog(T, t0, t0 + 0.6); return u > 0 && u < 1 ? Array.from({ length: 7 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 6);
    return <circle key={i} cx={GX - Math.cos(a) * 340 * u} cy={GY - 420 * GS - Math.sin(a) * 300 * u + 420 * u * u} r={28 * (1 - u) + 8} fill={AGUA} stroke={KC.ink} strokeWidth={3} />; }) : null; };
  // cierre: el agua vuelve a azul y la pila vuela al acopio
  const tinteC = 1 - kprog(T, K.C + 0.3, K.C + 1.8, kEase.suave);
  const vuela = kprog(T, K.C + 1.6, K.C + 2.6, kEase.suave);
  // recortes
  const eR = (t0) => kprog(T, t0, t0 + 0.55, kEase.sale);
  // la lupa recorre el renglón "fuente: ¿?" de cada recorte (arriba → en medio → abajo)
  const RUTA = [[0, 120, 640], [0.22, 250, 800], [0.58, 670, 1100], [0.94, 320, 1390], [1, 380, 1400]];
  const uL = kprog(T, K.F + 0.1, K.F + 3.2, kEase.suave);
  let lupaX = RUTA[0][1], lupaY = RUTA[0][2];
  for (let i = 1; i < RUTA.length; i++) if (uL >= RUTA[i - 1][0]) { const f = kclamp((uL - RUTA[i - 1][0]) / (RUTA[i][0] - RUTA[i - 1][0]), 0, 1); lupaX = klerp(RUTA[i - 1][1], RUTA[i][1], f); lupaY = klerp(RUTA[i - 1][2], RUTA[i][2], f); }
  const marcaR = (u0) => kclamp((uL - u0 + 0.1) / 0.12, 0, 1) * (T > K.F ? 1 : 0);
  const RK = 1.5;   // recortes 1.5× (540 px de ancho cada uno)
  const rec = (x, y, props) => <g transform={`translate(${x} ${y}) scale(${RK})`}><Recorte x={0} y={0} {...props} /></g>;
  // estudio: columnas
  const col = kprog(T, K.Es - 0.4, K.Es + 0.3, kEase.sale);   // las columnas están desde que empieza la escena
  const llena = (k) => kprog(T, K.Esc + 0.2, K.Esc + 4.2) * k;
  // litio: prensa
  const baja = kprog(T, K.Li + 1.0, K.Li + 1.5, kEase.entra), aplasta = kprog(T, K.Li + 1.35, K.Li + 1.6);
  const sube = kprog(T, K.Li + 1.8, K.Li + 2.3, kEase.suave);
  const prensa = klerp(120, 690, baja) + aplasta * 100 - sube * 650;
  const fuego = kprog(T, K.Li + 1.9, K.Li + 2.3, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pila cae al garrafón */}
      <Escena T={T} a={K.G} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Garrafon x={GX} y={GY} s={GS} tinte={tinteG} T={T}>{caeG >= 1 && pilaFondo}</Garrafon>{caeG < 1 && pilaG}{splash(K.G + 0.42)}</>)}
        <EscalaFija texto="esquema" largo={0} x={130} y={1500} color={KC.ink} />
      </Escena>
      {/* 2-3 · recortes con cifras distintas y sin fuente */}
      <Escena T={T} a={K.Ci} b={K.M}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{rec(330, 650, { rot: -6, cifra: '3,000', e: eR(K.Ci + 0.3), marca: marcaR(0.22) })}
          {rec(750, 950, { rot: 5, cifra: '167,000', e: eR(K.Ci + 1.9), marca: marcaR(0.58) })}
          {rec(400, 1240, { rot: -2, cifra: '175,000', e: eR(K.Ci + 3.6), marca: marcaR(0.94) })}
          {T > K.F && <LupaDibujo x={lupaX} y={lupaY} r={125} />}</>)}
        <EscalaFija texto="recortes: esquema" largo={0} x={130} y={1500} color={KC.ink} />
      </Escena>
      {/* 4 · la cifra gigante se la cuelgan a las pilas de mercurio */}
      <Escena T={T} a={K.M} b={K.Le}>
        <FondoLunares color={KC.yellow} />
        {svg(<><line x1={540} y1={600} x2={540} y2={850} stroke={KC.ink} strokeWidth={8} strokeDasharray="16 10" />
          <PilaBoton x={540} y={1000} s={4.6} texto="Hg" color="#d8dde3" /></>)}
        <Etq T={T} at={K.M + 0.8} until={K.Le - 0.2} x={360} y={1290} texto="pila de mercurio" tam={44} color={KC.ink} />
      </Escena>
      {/* 5 · leyes: EE. UU. 1996 y Minamata 2020 */}
      <Escena T={T} a={K.Le} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<><PilaBoton x={310} y={640} s={2.9} texto="Hg" color="#d8dde3" /><Tache x={310} y={640} r={170} p={kprog(T, K.Le + 5.6, K.Le + 6.1)} />
          <PilaAA x={800} y={620} s={1.75} /><g transform="translate(930 370) scale(1.7)"><Palomita x={0} y={0} p={kprog(T, K.Le + 1.3, K.Le + 1.7, kEase.rebote)} /></g></>)}
        <Sello T={T} at={K.Le + 0.6} until={K.P - 0.2} x={540} y={1100} titulo="EE. UU. · 1996" sub="alcalinas comunes sin mercurio agregado" />
        <Sello T={T} at={K.Le + 5.0} until={K.P - 0.2} x={540} y={1330} titulo="MINAMATA · 2020" sub="límite para fabricar casi todas las de mercurio" color={KC.blue} rot={2} />
      </Escena>
      {/* 6 · pregunta: ¿a la basura? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<><Bote x={430} y={1500} s={2.2} /><PilaAA x={430} y={500 + Math.sin(T * 3) * 18} s={1.35} rot={12 + Math.sin(T * 2) * 6} />
          <text x={900} y={1180} textAnchor="middle" style={{ font:`400 380px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 8} 900 1060)`}>?</text></>)}
      </Escena>
      {/* 7-8 · estudio de Chiang Mai: columnas de prueba y lo que escurre */}
      <Escena T={T} a={K.Es} b={K.Li} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {svg(<g opacity={col} transform={`translate(540 ${930 + (1 - col) * 60}) scale(1.15) translate(-540 -885)`}>
          <Columna x={230} y0={600} h={480} n={0} seed={3} lleno={llena(0.25)} tinte={0.05} />
          <Columna x={540} y0={600} h={480} n={5} seed={5} lleno={llena(0.45)} tinte={0.4} />
          <Columna x={850} y0={600} h={480} n={14} seed={8} lleno={llena(0.8)} tinte={0.9} />
          {[['sin pilas', 230], ['con pilas', 540], ['más pilas', 850]].map(([t, x]) => <text key={t} x={x} y={582} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{t}</text>)}
          <GotasMetal T={T} x={230} y0={1105} y1={1180} desde={K.Esc + 0.2} hasta={K.Li} cada={1.4} />
          <GotasMetal T={T} x={540} y0={1105} y1={1180} desde={K.Esc + 0.3} hasta={K.Li} cada={0.9} letras={['Zn', null]} />
          <GotasMetal T={T} x={850} y0={1105} y1={1180} desde={K.Esc + 0.2} hasta={K.Li} cada={0.5} letras={['Mn', 'Zn']} />
        </g>)}
        <EscalaFija texto="esquema · columnas de prueba (lisímetros)" largo={0} x={130} y={1500} color={KC.ink} />
      </Escena>
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="2009" quien="Chiang Mai, Tailandia" revista="Waste Management" x={540} y={330} />
      {/* 9 · litio: si se dañan, fuego */}
      <Escena T={T} a={K.Li} b={K.Mx}>
        <FondoLunares color={KC.pink} />
        {svg(<g transform="translate(540 1180) scale(1.35) translate(-502 -1080)"><rect x={170} y={900} width={260} height={180} rx={12} fill="#c9a256" stroke={KC.ink} strokeWidth={7} />
          <PilaBoton x={300} y={856 + 20 * aplasta} s={1.6} texto="Li" color="#e3e7ec" sy={1 - 0.5 * aplasta} />
          <PilaAA x={700} y={1080 - 150 * (1 - 0.35 * aplasta)} s={1} banda={KC.leaf} cuerpo="#1f6b3a" texto="Li-ion" sub="recargable" sy={1 - 0.35 * aplasta} />
          {fuego > 0 && <><Fuego T={T} x={300} y={850} s={0.8 * fuego} /><Fuego T={T} x={700} y={900} s={1.1 * fuego} /></>}
          <rect x={52} y={prensa} width={900} height={90} rx={16} fill="#8f99a3" stroke={KC.ink} strokeWidth={8} />
          <rect x={462} y={-900} width={80} height={prensa + 900} fill="#6c757e" stroke={KC.ink} strokeWidth={8} />
          <text x={300} y={1125} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>botón de litio</text>
          <text x={700} y={1125} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>recargable Li-ion</text></g>)}
      </Escena>
      <Chip T={T} at={K.Li + 1.9} until={K.Mx - 0.2} texto="dañadas: chispa o incendio" y={1440} x={540} tam={44} borde={KC.red} />
      {/* 10 · México: plan de manejo y residuo peligroso */}
      <Escena T={T} a={K.Mx} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={60} y={690} ancho={1220} conCA={false} />)}
      </Escena>
      <Chip T={T} at={K.Mx + 0.3} until={K.C - 0.2} texto="México · LGPGIR" y={470} x={540} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 1.0} until={K.C - 0.2} texto="pilas → plan de manejo" y={1420} x={540} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.Mx + 2.8} until={K.C - 0.2} texto="mercurio o níquel-cadmio → residuo peligroso" y={1520} x={540} tam={38} borde={KC.red} />
      {/* 11 · cierre: regreso al garrafón, agua limpia y la pila al acopio */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Garrafon x={CX} y={CY} s={CS} tinte={tinteC} T={T}>{vuela <= 0 && pilaFondo}</Garrafon>
          <Acopio x={820} y={CY} s={1.5} brillo={kprog(T, K.C + 2.5, K.C + 3.0)} />
          {vuela > 0 && vuela < 1 && <PilaAA x={klerp(CX + 30, 820, vuela)} y={klerp(CY - 180, 930, vuela) - Math.sin(vuela * Math.PI) * 560} rot={70 + vuela * 380} s={0.75} />}</>)}
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.Ci - 0.2} valor={600000} dur={1.4} sufijo=" L" etiqueta="¿una pila contamina…" x={540} y={255} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.G + 2.6} until={K.Ci - 0.2} texto="¿de dónde salió?" y={1510} x={540} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.4} until={K.F - 0.1} texto="lo que dicen distintas notas:" y={330} x={540} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.F + 0.6} until={K.M - 0.2} texto="¿qué estudio? ¿cómo se midió?" y={330} x={540} tam={42} borde={KC.red} />
      <NumeroGigante T={T} at={K.M + 0.3} until={K.Le - 0.2} valor={600000} dur={0.6} desde={600000} sufijo=" L" x={540} y={500} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Esc + 0.6} until={K.Li - 0.2} texto="más pilas → más manganeso (Mn) y zinc (Zn)" y={1410} x={540} tam={38} borde={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 1.1} until={K.Ou - 0.1} texto="600,000 L" x={540} y={440} tam={84} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou - 0.1} texto="no la tires: llévala a acopio" y={1470} x={540} tam={44} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ci - 0.1} texto="¿Una pila contamina *600 mil litros?*" />
      <Subtitulo T={T} idx={1} at={K.Ci + 0.1} until={K.F - 0.1} texto="3 mil, 167 mil, *175 mil…*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.M - 0.1} texto="¿Qué estudio? *¿Cómo se midió?*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.Le - 0.1} texto="La cifra gigante: *pilas de mercurio.*" />
      <Subtitulo T={T} idx={4} at={K.Le + 0.1} until={K.P - 0.1} texto="EE. UU. 1996 y *Minamata 2020.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Ya la puedes *tirar a la basura?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Esc - 0.1} texto="Tailandia, 2009: *rellenos de prueba.*" />
      <Subtitulo T={T} idx={7} at={K.Esc + 0.1} until={K.Li - 0.1} texto="Más pilas: *más manganeso y zinc.*" />
      <Subtitulo T={T} idx={8} at={K.Li + 0.1} until={K.Mx - 0.1} texto="Las de litio: *riesgo de incendio.*" />
      <Subtitulo T={T} idx={9} at={K.Mx + 0.1} until={K.C - 0.1} texto="México: *plan de manejo.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Sin fuente clara. *Llévala a acopio.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cifras + 2.5, CUES.Fuente - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Mercurio + 0.1, CUES.Leyes - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Leyes + 4.0, CUES.Leyes + 7.7, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio - 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Escurre + 0.4, CUES.Litio - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Mexico + 0.5, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="47" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PilasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PilasShot /></CompositionStage></div>;
}
window.PilasApp = PilasApp;
