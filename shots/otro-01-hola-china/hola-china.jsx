// Shot Otro 01 · Hola, China — presentación MUDA de Robert para RedNote (小红书). Sin voz: música y efectos de gen-audio.mjs.
// Letreros en chino simplificado con una línea chica en español. Guion y textos: guion.md / narracion.json / zh/publicacion.md.
// Dibujos esquemáticos: el globo no dibuja fronteras (solo dos manchas de tierra y dos pines), sin banderas ni símbolos políticos.
// Escenas en compases de la música (116 bpm, 1 compás = 2.069 s): Hola 2 · Ciencia 2 · Neta 3 · Amigos 2 · China 3 · Outro 1.5.
const ZH = "'WenQuanYi Zen Hei', 'Noto Sans CJK SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const TINTA = KC.ink;

// Robert: lados propios (debajo de los letreros y de los dibujos: nunca tapan el texto). Misma animación que el Sticker del kit.
const LADOS = {
  'r-der': { left: 650, top: 1300, width: 420 },
  'r-izq': { left: 10, top: 1300, width: 420 },
  'r-grande': { left: 380, top: 1250, width: 660 },
};
function RobertAqui({ T, apariciones, base = 'assets/stickers/' }) {
  return <><Precarga srcs={[...new Set(apariciones.map((a) => `${base}${a[2]}.png`))]} />{apariciones.map(([at, until, pose, lado], k) => {
    if (T < at || T > until + 0.45) return null;
    const L = LADOS[lado];
    const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
    const w = T > at + 0.35 ? Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 : 0;
    const resp = Math.sin(T * 2.2 + k) * 0.012;
    return <img key={k} src={`${base}${pose}.png`} alt="" style={{ position: 'absolute', left: L.left, top: L.top, width: L.width, zIndex: 46, transformOrigin: '50% 100%',
      transform: `translateY(${(1 - i) * 800 + o * 800}px) scale(${1 - w + resp}, ${1 + w + resp})`, filter: 'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
  })}</>;
}

/* ---------- LETRERO: chino grande + español chico. *palabra* = resaltada en dorado ---------- */
function LineaZH({ T, at, zh, es, tam = 86 }) {
  const e = kentrada(T, at, null, 'pop');
  if (T < at) return null;
  const partes = zh.split('*').map((p, i) => i % 2
    ? <span key={i} style={{ background: KC.gold2, color: KC.dark, borderRadius: 12, padding: '0 .14em', margin: '0 .04em', textShadow: 'none' }}>{p}</span>
    : <span key={i}>{p}</span>);
  return <div style={{ opacity: e.o, transform: `translateY(${e.y * 0.5}px) scale(${e.s})`, transformOrigin: '50% 50%', textAlign: 'center', margin: '6px 0' }}>
    <div style={{ font: `700 ${tam}px/1.25 ${ZH}`, color: KC.texto, letterSpacing: '.02em', textShadow: '0 4px 0 rgba(0,0,0,.5)' }}>{partes}</div>
    {es && <div style={{ font: `800 38px/1.2 ${KF.texto}`, color: KC.gold2, marginTop: 6, opacity: kprog(T, at + 0.25, at + 0.6) }}>{es}</div>}
  </div>;
}
function Letrero({ T, at, until, lineas, y = 400, tam }) {
  if (!kvisible(T, at, until, 0.4)) return null;
  const ent = kprog(T, at, at + 0.3, kEase.sale), sal = kprog(T, until, until + 0.3, kEase.suave);
  return <div style={{ position: 'absolute', left: 0, right: 0, top: y, zIndex: 48, display: 'flex', justifyContent: 'center', opacity: 1 - sal, transform: `translateY(${-sal * 30}px)` }}>
    <div style={{ maxWidth: 980, padding: '22px 34px 26px', borderRadius: 34, background: `rgba(14,15,18,${0.78 * ent})`, boxShadow: `0 14px 40px rgba(0,0,0,${0.35 * ent})`, transform: `scale(${klerp(0.92, 1, ent)})` }}>
      {lineas.map((l, i) => <LineaZH key={i} T={T} at={l.at} zh={l.zh} es={l.es} tam={l.tam || tam} />)}
    </div>
  </div>;
}

/* ---------- piezas de dibujo (dentro de <svg>) ---------- */
const svgCapa = (c, z = 10) => <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0, zIndex: z }}>{c}</svg>;
const circ = (cx, cy, r) => `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
// Papel picado: banderita de papel con figuras recortadas (huecos con evenodd) y borde inferior en picos.
function Picado({ x, y, w = 112, h = 132, color, rot = 0 }) {
  const picos = Array.from({ length: 7 }, (_, i) => `L ${w - (i * w) / 6} ${h - (i % 2 ? 0 : 14)}`).join(' ');
  const fuera = `M 0 0 L ${w} 0 L ${w} ${h - 14} ${picos} Z`;
  const cx = w / 2, cy = h * 0.46;
  const huecos = `M ${cx} ${cy - 26} L ${cx + 20} ${cy} L ${cx} ${cy + 26} L ${cx - 20} ${cy} Z ` +
    [[0.2, 0.2], [0.8, 0.2], [0.2, 0.72], [0.8, 0.72]].map(([u, v]) => circ(w * u, h * v, 8)).join(' ') +
    ` M ${cx - 6} ${h * 0.12} L ${cx + 6} ${h * 0.12} L ${cx} ${h * 0.2} Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={fuera + ' ' + huecos} fill={color} fillRule="evenodd" stroke="rgba(0,0,0,.18)" strokeWidth={2} />
  </g>;
}
const PICADO_COL = [KC.pink, KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac];
function TiraPicado({ T, y = 40, n = 8, x0 = 6, paso = 134, desde = 0, colores = PICADO_COL, aparece = 1 }) {
  return <g>
    <path d={`M -20 ${y} Q 540 ${y + 26} 1100 ${y}`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.85} />
    {Array.from({ length: n }, (_, i) => {
      const u = kprog(aparece, i / n * 0.7, i / n * 0.7 + 0.3, kEase.rebote);
      if (u <= 0) return null;
      const x = x0 + i * paso, yy = y + Math.sin((x / 1080) * Math.PI) * 13;
      return <g key={i} transform={`translate(0 ${(1 - u) * -160})`}><Picado x={x} y={yy} color={colores[(i + desde) % colores.length]} rot={mece(T, i + 3, 0.6) * 5} /></g>;
    })}
  </g>;
}
// Farolito de papel (esquemático): cuerpo rojo con costillas, tapas doradas y borla. luz 0..1 = brillo.
function Farol({ T, x, y, s = 1, luz = 1, seed = 1 }) {
  const r = mece(T, seed, 0.4) * 5;
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <line x1={0} y1={-90} x2={0} y2={-58} stroke={TINTA} strokeWidth={4} />
    {luz > 0 && <circle cx={0} cy={0} r={95} fill="#ffcf6b" opacity={0.35 * luz} />}
    <rect x={-26} y={-62} width={52} height={14} rx={4} fill={KC.gold} stroke={TINTA} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={56} ry={52} fill={mixHex('#d8342c', '#ff6a3d', 0.35 * luz)} stroke={TINTA} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={30} ry={52} fill="none" stroke="rgba(120,10,10,.55)" strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={8} ry={52} fill="none" stroke="rgba(120,10,10,.55)" strokeWidth={4} />
    <ellipse cx={-18} cy={-18} rx={10} ry={20} fill="#fff" opacity={0.25 + 0.2 * luz} />
    <rect x={-26} y={48} width={52} height={14} rx={4} fill={KC.gold} stroke={TINTA} strokeWidth={4} />
    {[-10, 0, 10].map((dx) => <line key={dx} x1={dx} y1={62} x2={dx * 1.3} y2={104} stroke={KC.gold} strokeWidth={5} strokeLinecap="round" />)}
  </g>;
}
// Destello de 4 puntas.
function Destello({ x, y, s = 1, o = 1, color = '#fff' }) {
  if (o <= 0.01) return null;
  return <path d="M 0 -30 Q 4 -4 30 0 Q 4 4 0 30 Q -4 4 -30 0 Q -4 -4 0 -30 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} opacity={o} />;
}
function Destellos({ T, at, x, y, n = 6, radio = 120, seed = 2, color = '#fff' }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + g(), d = radio * (0.6 + g() * 0.5), t0 = at + i * 0.06, u = kprog(T, t0, t0 + 0.7);
    return <Destello key={i} x={x + Math.cos(a) * d * kEase.sale(u)} y={y + Math.sin(a) * d * kEase.sale(u)} s={0.5 + 0.6 * Math.sin(Math.PI * u)} o={Math.sin(Math.PI * u)} color={color} />;
  })}</g>;
}
// Chip con texto chino + español chico.
function ChipZH({ T, at, until, x, y, zh, es, borde = KC.gold, tam = 44 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position: 'absolute', left: x, top: y, zIndex: 42, transform: `translate(-50%,-50%) translateY(${e.y * 0.4}px) scale(${e.s})`, opacity: e.o,
    background: 'rgba(14,15,18,.85)', border: `4px solid ${borde}`, borderRadius: 26, padding: '10px 26px 12px', textAlign: 'center', whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
    <div style={{ font: `700 ${tam}px/1.15 ${ZH}`, color: KC.texto }}>{zh}</div>
    {es && <div style={{ font: `800 24px ${KF.texto}`, color: KC.gold2, marginTop: 2 }}>{es}</div>}
  </div>;
}
// Logo sin badge (para un video de presentación no lleva número).
function LogoEsquina({ T, hasta }) {
  if (T >= hasta) return null;
  return <div style={{ position: 'absolute', left: 38, top: 180, zIndex: 50, background: '#fff', borderRadius: 20, padding: 8, boxShadow: '0 12px 30px rgba(0,0,0,.45)' }}>
    <img src="assets/logo_color.svg" alt="La Creación del Robert" style={{ width: 92, height: 92, display: 'block' }} />
  </div>;
}
// Persona esquemática (amigos): cabeza + hombros.
function Persona({ x, y, s = 1, color, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={0} r={62} fill="#fff" stroke={TINTA} strokeWidth={6} />
    <circle cx={0} cy={-12} r={20} fill={color} stroke={TINTA} strokeWidth={5} />
    <path d="M -34 40 Q -34 12 0 12 Q 34 12 34 40 Z" fill={color} stroke={TINTA} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}
function Corazon({ x, y, s = 1, o = 1, color = KC.pink }) {
  if (o <= 0.01) return null;
  return <path d="M 0 12 C -30 -8 -18 -30 0 -16 C 18 -30 30 -8 0 12 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={TINTA} strokeWidth={3} opacity={o} />;
}
// Avión esquemático (apunta a la derecha).
function Avion({ x, y, ang = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 46 0 Q 40 -8 22 -8 L 4 -8 L -16 -40 L -30 -40 L -20 -8 L -38 -8 L -48 -22 L -58 -22 L -52 0 L -58 22 L -48 22 L -38 8 L -20 8 L -30 40 L -16 40 L 4 8 L 22 8 Q 40 8 46 0 Z"
      fill="#fff" stroke={TINTA} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}

/* ---------- tiempos (author time = compases de la música) ---------- */
const COMPAS = 240 / 116;

function HolaChina() {
  const { T, CUES } = useComposition();
  const H = CUES.Hola, C = CUES.Ciencia, N = CUES.Neta, A = CUES.Amigos, Z = CUES.China, O = CUES.Outro;
  const FIN = O + 1.5 * COMPAS;

  /* 1 · HOLA — México resaltado, papel picado que cae al cuadro 0 */
  const mxLlena = kprog(T, H + 1.4, H + 2.2, kEase.sale);
  const ondas = (cx, cy) => [0, 1, 2].map((k) => { const u = ((T * 1.6 + k / 3) % 1); return <path key={k} d={`M ${cx + 20 + u * 40} ${cy - 40 - u * 30} q ${30 + u * 20} ${40} 0 ${90 + u * 50}`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={(1 - u) * kprog(T, 0, 0.3) * (1 - kprog(T, C - 0.6, C - 0.2))} />; });

  /* 2 · CIENCIA — pantalla con animaciones que se encienden una por una */
  const pant = { x: 150, y: 760, w: 780, h: 470 };
  const enc = (k) => kprog(T, C + 0.5 + k * 0.75, C + 0.9 + k * 0.75, kEase.rebote);

  /* 3 · NETA — 「中文」 con signos de pregunta, luego voz en español → letreros traducidos */
  const n2 = N + 2.7;                                   // segunda frase de la neta
  const preg = (k) => kprog(T, N + 0.5 + k * 0.25, N + 0.8 + k * 0.25, kEase.rebote) * (1 - kprog(T, n2 - 0.3, n2));
  const flecha = kprog(T, n2 + 0.9, n2 + 1.6, kEase.suave);

  /* 4 · AMIGOS — red de amigos que se conecta al centro */
  const AMI = [[540, 960], [250, 830], [830, 830], [210, 1110], [870, 1110], [400, 1230], [680, 1230]];
  const ami = (k) => kprog(T, A + 0.4 + k * 0.32, A + 0.75 + k * 0.32, kEase.rebote);
  const linea = (k) => kprog(T, A + 0.55 + k * 0.32, A + 0.95 + k * 0.32, kEase.sale);
  const AMI_COL = [KC.pink, KC.cyan, KC.yellow, KC.mint, KC.orange, KC.lilac];

  /* 5 · CHINA — globo con dos pines y un avión que cruza el Pacífico (sueño) */
  const G = { cx: 540, cy: 960, r: 330 }, GS = 0.88, gx = (x) => G.cx + (x - G.cx) * GS, gy = (y) => G.cy + 10 + (y - G.cy) * GS;
  const MXP = { x: 770, y: 1030 }, CNP = { x: 318, y: 870 };
  const ctrl = { x: 560, y: 600 };
  const z2 = Z + 3.0;                                   // «希望有一天能去中国看看»
  const vuelo = kprog(T, z2 + 0.4, z2 + 2.6, kEase.suave);
  const bez = (t) => ({ x: (1 - t) ** 2 * MXP.x + 2 * (1 - t) * t * ctrl.x + t * t * CNP.x, y: (1 - t) ** 2 * (MXP.y - 20) + 2 * (1 - t) * t * ctrl.y + t * t * (CNP.y - 20) });
  const av = bez(vuelo), av2 = bez(Math.min(1, vuelo + 0.01));
  const avAng = Math.atan2(av2.y - av.y, av2.x - av.x) * 180 / Math.PI;
  const rastro = Array.from({ length: 41 }, (_, i) => bez((i / 40) * vuelo)).map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const luz = kprog(T, Z + 0.3, Z + 1.2);
  const latido = (t0) => 1 + 0.12 * Math.sin(Math.max(0, T - t0) * 6) * Math.exp(-Math.max(0, T - t0) * 0.6);
  const Pin = ({ x, y, color, at }) => { const u = kprog(T, at, at + 0.45, kEase.rebote); if (u <= 0) return null;
    return <g transform={`translate(${x} ${y}) scale(${u * latido(at)})`}><path d="M 0 0 C -10 -18 -30 -30 -30 -52 A 30 30 0 1 1 30 -52 C 30 -30 10 -18 0 0 Z" fill={color} stroke={TINTA} strokeWidth={5} /><circle cx={0} cy={-52} r={11} fill="#fff" stroke={TINTA} strokeWidth={4} /></g>; };

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: KC.dark }}>
      {/* 1 · HOLA */}
      <Escena T={T} a={H - 1} b={C} zoom={0.04} origen="50% 55%">
        <FondoMarca color={KC.pink} patron="puntos" T={T} />
        {svgCapa(<>
          <TiraPicado T={T} y={34} aparece={kprog(T, 0, 0.9)} />
          <g opacity={kprog(T, 0.1, 0.5)} transform={`translate(0 ${(1 - kprog(T, 0.1, 0.6, kEase.sale)) * 60})`}>
            <MapaMexico x={130} y={850} ancho={820} color={mixHex('#ffe9a8', KC.yellow, mxLlena)} centro="#f7c4d6" />
          </g>
          {mxLlena > 0 && <Destellos T={T} at={H + 1.5} x={560} y={1020} n={8} radio={260} seed={4} />}
          {ondas(600, 1400)}
        </>, 5)}
        <ChipZH T={T} at={H + 1.6} until={C - 0.3} x={560} y={1190} zh="墨西哥" es="México" borde={KC.yellow} />
      </Escena>

      {/* 2 · CIENCIA */}
      <Escena T={T} a={C} b={N} zoom={0.04}>
        <FondoMarca color={KC.yellow} patron="rayas" T={T} />
        {svgCapa(<>
          <g opacity={kprog(T, C - 0.2, C + 0.3)} transform={`translate(0 ${(1 - kprog(T, C - 0.2, C + 0.4, kEase.sale)) * 80})`}>
            <rect x={pant.x} y={pant.y} width={pant.w} height={pant.h} rx={40} fill={KC.dark} stroke={TINTA} strokeWidth={8} />
            <rect x={pant.x + 30} y={pant.y + pant.h - 46} width={pant.w - 60} height={12} rx={6} fill="rgba(255,255,255,.18)" />
            <rect x={pant.x + 30} y={pant.y + pant.h - 46} width={(pant.w - 60) * kprog(T, C, N)} height={12} rx={6} fill={KC.pink} />
            <path d={`M ${pant.x + 40} ${pant.y + 34} l 26 16 l -26 16 Z`} fill={KC.pink} />
            {/* ADN que gira */}
            <g opacity={enc(0)} transform={`translate(${pant.x + 60} ${pant.y + 200}) scale(${enc(0)})`}>
              <ADNHebra T={T} x={0} y={0} largo={250} alto={110} vueltas={1.6} grosor={8} />
            </g>
            {/* champiñones que crecen (los hongos de Robert) */}
            <g opacity={kprog(T, C + 1.25, C + 1.4)}>
              <Champinon x={pant.x + 420} y={pant.y + 370} s={0.95} crece={kprog(T, C + 1.25, C + 2.0, kEase.sale)} abre={kprog(T, C + 1.7, C + 2.5, kEase.sale)} />
              <Champinon x={pant.x + 530} y={pant.y + 375} s={0.7} rot={8} crece={kprog(T, C + 1.45, C + 2.2, kEase.sale)} abre={kprog(T, C + 1.9, C + 2.7, kEase.sale)} />
            </g>
            {/* molécula que gira */}
            <g opacity={enc(2)} transform={`translate(${pant.x + 640} ${pant.y + 175}) scale(${enc(2) * 0.95})`}>
              <Molecula x={0} y={0} rot={T * 40} anillos={2} cola={1} color={KC.cyan} brillo={0.5 + 0.5 * Math.sin(T * 4)} />
            </g>
          </g>
          <Destellos T={T} at={C + 0.55} x={pant.x + 185} y={pant.y + 200} n={5} radio={110} seed={3} />
          <Destellos T={T} at={C + 1.3} x={pant.x + 470} y={pant.y + 260} n={5} radio={110} seed={5} />
          <Destellos T={T} at={C + 2.05} x={pant.x + 660} y={pant.y + 175} n={5} radio={100} seed={8} />
        </>, 5)}
      </Escena>

      {/* 3 · NETA */}
      <Escena T={T} a={N} b={A} zoom={0.03}>
        <FondoMarca color={KC.cyan} patron="puntos" T={T} />
        {/* 「中文」 que tiembla con signos de pregunta */}
        {T < n2 + 0.4 && <div style={{ position: 'absolute', left: 540, top: 1000, zIndex: 6, opacity: 1 - kprog(T, n2 - 0.3, n2 + 0.1),
          transform: `translate(-50%,-50%) rotate(${Math.sin(T * 9) * 3 * kprog(T, N + 0.4, N + 0.7)}deg) scale(${kentrada(T, N + 0.2, null).s})`,
          background: '#fff', border: `8px solid ${TINTA}`, borderRadius: 40, padding: '20px 54px', font: `700 170px/1 ${ZH}`, color: KC.dark, boxShadow: '0 16px 0 rgba(0,0,0,.25)' }}>中文</div>}
        {[[300, 820, -14], [790, 840, 12], [830, 1160, -6]].map(([x, y, r], k) => { const u = preg(k); return u > 0 &&
          <div key={k} style={{ position: 'absolute', left: x, top: y, zIndex: 7, transform: `translate(-50%,-50%) rotate(${r + Math.sin(T * 4 + k) * 8}deg) scale(${u})`, font: `400 150px/1 ${KF.titulo}`, color: KC.yellow, WebkitTextStroke: `6px ${TINTA}` }}>?</div>; })}
        {/* voz en español → letreros en chino */}
        {T > n2 && <>
          <div style={{ position: 'absolute', left: 270, top: 980, zIndex: 6, transform: `translate(-50%,-50%) scale(${kentrada(T, n2 + 0.2, null).s})`, opacity: kentrada(T, n2 + 0.2, null).o }}>
            <div style={{ background: '#fff', border: `7px solid ${TINTA}`, borderRadius: 50, padding: '22px 34px', whiteSpace: 'nowrap', font: `900 70px/1 ${KF.texto}`, color: KC.dark, position: 'relative' }}>¡Hola!
              <div style={{ position: 'absolute', left: 50, bottom: -38, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `40px solid ${TINTA}` }}></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 810, top: 980, zIndex: 6, transform: `translate(-50%,-50%) rotate(-3deg) scale(${kentrada(T, n2 + 1.5, null).s})`, opacity: kentrada(T, n2 + 1.5, null).o,
            background: KC.yellow, border: `7px solid ${TINTA}`, borderRadius: 20, padding: '18px 30px', whiteSpace: 'nowrap', font: `700 76px/1 ${ZH}`, color: KC.dark, boxShadow: '0 12px 0 rgba(0,0,0,.25)' }}>你好！</div>
          {svgCapa(<>
            {[0, 1, 2].map((k) => { const u = ((T - n2) * 1.4 + k / 3) % 1; return T > n2 + 0.4 && <path key={k} d={`M ${150 - u * 30} ${1080 + u * 10} q ${-20 - u * 20} 30 0 ${60 + u * 30}`} stroke={TINTA} strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
            <FlechaCurva x1={420} y1={930} x2={640} y2={930} p={flecha} curva={-70} color="#fff" grosor={10} T={T} />
          </>, 7)}
          <ChipZH T={T} at={n2 + 0.5} until={A - 0.2} x={270} y={1165} zh="西班牙语" es="voz en español" borde={KC.pink} tam={38} />
          <ChipZH T={T} at={n2 + 1.8} until={A - 0.2} x={810} y={1165} zh="翻译" es="traducción" borde={KC.yellow} tam={38} />
        </>}
      </Escena>

      {/* 4 · AMIGOS */}
      <Escena T={T} a={A} b={Z} zoom={0.04}>
        <FondoMarca color={KC.mint} patron="puntos" T={T} />
        {svgCapa(<>
          {AMI.slice(1).map(([x, y], k) => { const p = linea(k + 1); return p > 0 && <line key={k} x1={AMI[0][0]} y1={AMI[0][1]} x2={klerp(AMI[0][0], x, p)} y2={klerp(AMI[0][1], y, p)} stroke={TINTA} strokeWidth={8} strokeDasharray="20 12" strokeDashoffset={-T * 40} strokeLinecap="round" />; })}
          {kprog(T, A + 2.6, A + 3.2) > 0 && [[1, 2], [3, 5], [4, 6], [1, 3], [2, 4], [5, 6]].map(([i, j], k) => { const p = kprog(T, A + 2.6 + k * 0.08, A + 3.0 + k * 0.08, kEase.sale);
            return <line key={'e' + k} x1={AMI[i][0]} y1={AMI[i][1]} x2={klerp(AMI[i][0], AMI[j][0], p)} y2={klerp(AMI[i][1], AMI[j][1], p)} stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.85} />; })}
          {AMI.map(([x, y], k) => { const u = ami(k); return u > 0 && <Persona key={k} x={x} y={y + Math.sin(T * 2 + k) * 6} s={(k ? 0.9 : 1.15) * u} color={k ? AMI_COL[k % AMI_COL.length] : KC.gold} />; })}
          {AMI.slice(1).map(([x, y], k) => { const t0 = A + 1.0 + k * 0.32, u = kprog(T, t0, t0 + 1.1); return <Corazon key={k} x={(x + AMI[0][0]) / 2} y={(y + AMI[0][1]) / 2 - u * 90} s={1.4 + u} o={Math.sin(Math.PI * u)} color={k % 2 ? KC.pink : KC.red} />; })}
        </>, 5)}
        <ChipZH T={T} at={A + 1.4} until={Z - 0.2} x={250} y={700} zh="朋友" es="amigos" borde={KC.pink} tam={40} />
        <ChipZH T={T} at={A + 2.0} until={Z - 0.2} x={830} y={700} zh="合作" es="alianzas" borde={KC.yellow} tam={40} />
      </Escena>

      {/* 5 · CHINA (fascinación y sueño): papel picado y farolitos en el mismo hilo */}
      <Escena T={T} a={Z} b={FIN + 1} zoom={0.04}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${KC.orange} 0%, ${KC.pink} 55%, ${KC.lilac} 100%)` }}></div>
        <FondoMarca color="transparent" patron="puntos" T={T} />
        {svgCapa(<>
          <defs><clipPath id="globoClip"><circle cx={G.cx} cy={G.cy} r={G.r} /></clipPath>
            <radialGradient id="mar" cx="40%" cy="35%" r="75%"><stop offset="0%" stopColor="#7fdcff" /><stop offset="100%" stopColor="#1f7fd6" /></radialGradient></defs>
          <g transform={`translate(${G.cx} ${G.cy + 10}) scale(${GS}) translate(${-G.cx} ${-G.cy})`}>
          <circle cx={G.cx} cy={G.cy} r={G.r + 30} fill="#fff" opacity={0.18 + 0.06 * Math.sin(T * 2)} />
          <circle cx={G.cx} cy={G.cy} r={G.r} fill="url(#mar)" stroke={TINTA} strokeWidth={8} />
          <g clipPath="url(#globoClip)">
            {/* tierra esquemática: Asia oriental (izq.) y América del Norte (der.), sin fronteras */}
            <path d="M 150 600 C 260 610 360 690 380 770 C 395 840 345 880 372 950 C 400 1030 330 1110 250 1110 C 180 1060 150 880 150 600 Z" fill="#bfe3b4" stroke={TINTA} strokeWidth={6} />
            <path d="M 760 630 C 840 640 900 760 890 860 C 880 940 815 975 790 1035 C 780 1075 830 1120 850 1170 C 805 1180 742 1100 735 1040 C 725 960 700 900 715 820 C 725 740 715 660 760 630 Z" fill="#ffe9a8" stroke={TINTA} strokeWidth={6} />
            {[0, 1, 2].map((k) => <ellipse key={k} cx={G.cx} cy={G.cy} rx={G.r * (0.35 + k * 0.3)} ry={G.r} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={3} />)}
            {[-1, 0, 1].map((k) => <line key={k} x1={G.cx - G.r} x2={G.cx + G.r} y1={G.cy + k * 140} y2={G.cy + k * 140} stroke="rgba(255,255,255,.25)" strokeWidth={3} />)}
          </g>
          <Pin x={MXP.x} y={MXP.y} color={KC.pink} at={Z + 0.2} />
          <Pin x={CNP.x} y={CNP.y} color={KC.red} at={Z + 0.6} />
          <Destellos T={T} at={Z + 0.8} x={CNP.x} y={CNP.y - 50} n={7} radio={130} seed={11} color="#fff6c2" />
          <Destellos T={T} at={Z + 1.9} x={CNP.x} y={CNP.y - 50} n={6} radio={110} seed={12} color="#fff" />
          {vuelo > 0 && <path d={rastro} stroke="#fff" strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" fill="none" />}
          {vuelo > 0 && vuelo < 1 && <Avion x={av.x} y={av.y} ang={avAng} s={1.1} />}
          {vuelo >= 1 && <Avion x={CNP.x + 10} y={CNP.y - 110} ang={180 + Math.sin(T * 3) * 4} s={1.1 * (1 - kprog(T, z2 + 2.6, z2 + 3.0))} />}
          <Destellos T={T} at={z2 + 2.6} x={CNP.x} y={CNP.y - 60} n={10} radio={170} seed={13} color={KC.yellow} />
          </g>
          {/* hilo con papel picado y farolitos, juntos */}
          <path d="M -20 70 Q 540 120 1100 70" stroke="#fff" strokeWidth={4} fill="none" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = 20 + i * 134, y = 70 + Math.sin((x / 1080) * Math.PI) * 25, u = kprog(T, Z - 0.3 + i * 0.07, Z + 0.2 + i * 0.07, kEase.rebote);
            if (u <= 0) return null;
            return <g key={i} transform={`translate(0 ${(1 - u) * -200})`}>{i % 2
              ? <Farol T={T} x={x + 56} y={y + 90} s={0.8} luz={luz * (0.85 + 0.15 * Math.sin(T * 3 + i))} seed={i} />
              : <Picado x={x} y={y} color={PICADO_COL[(i / 2) % PICADO_COL.length]} rot={mece(T, i + 5, 0.6) * 5} />}</g>; })}
        </>, 5)}
        <ChipZH T={T} at={Z + 0.7} until={O - 0.2} x={gx(CNP.x - 20)} y={gy(CNP.y + 75)} zh="中国" es="China" borde={KC.red} tam={40} />
        <ChipZH T={T} at={Z + 0.3} until={O - 0.2} x={gx(MXP.x + 30)} y={gy(MXP.y + 75)} zh="墨西哥" es="México" borde={KC.pink} tam={40} />
      </Escena>

      {/* letreros (narracion.json, en orden) */}
      <Letrero T={T} at={H + 0.12} until={C - 0.2} lineas={[
        { at: H + 0.12, zh: '你好！我是 *Robert*', es: '¡Hola! Soy Robert' },
        { at: H + 1.3, zh: '我来自*墨西哥*', es: 'Soy de México' }]} />
      <Letrero T={T} at={C + 0.1} until={N - 0.2} lineas={[{ at: C + 0.1, zh: '我用动画做*科普*', es: 'Divulgo ciencia con animaciones' }]} />
      <Letrero T={T} at={N + 0.1} until={n2 - 0.15} lineas={[{ at: N + 0.1, zh: '说实话，我*不会说中文*', es: 'La neta: no hablo chino' }]} />
      <Letrero T={T} at={n2 + 0.05} until={A - 0.2} tam={74} lineas={[
        { at: n2 + 0.05, zh: '视频里的中文是*翻译*的', es: 'Los letreros en chino son traducción' },
        { at: n2 + 0.9, zh: '我说的是*西班牙语*', es: 'y mi voz es en español' }]} />
      <Letrero T={T} at={A + 0.1} until={Z - 0.2} tam={76} lineas={[{ at: A + 0.1, zh: '想在这里*交朋友*、*找合作*', es: 'Quiero hacer amigos y alianzas aquí' }]} />
      <Letrero T={T} at={Z + 0.1} until={z2 - 0.15} lineas={[{ at: Z + 0.1, zh: '我对*中国*特别着迷', es: 'Me fascina China' }]} />
      <Letrero T={T} at={z2 + 0.05} until={O - 0.1} tam={76} lineas={[{ at: z2 + 0.05, zh: '希望有一天能*去中国*看看', es: 'Algún día me encantaría ir' }]} />

      <RobertAqui T={T} apariciones={[
        [-0.6, C - 0.25, 'avatar_05_sonriendo_dientes_uniformes', 'r-der'],
        [C - 0.05, N - 0.25, 'avatar_13_senalando_arriba', 'r-izq'],
        [N - 0.05, n2 - 0.15, 'avatar_06_pensativo_menton', 'r-der'],
        [n2, A - 0.25, 'avatar_04_bajando_lentes', 'r-izq'],
        [A - 0.05, Z - 0.25, 'avatar_02_apuntando_camara', 'r-der'],
        [Z - 0.05, z2 - 0.15, 'avatar_11_sorprendido', 'r-izq'],
        [z2, O - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'r-grande']]} />
      <LogoEsquina T={T} hasta={O} />
      <CierreMarca T={T} at={O} logo="assets/logo_color.svg" usuario=""
        frase={<span><span style={{ font: `700 54px ${ZH}`, color: KC.gold2 }}>关注我，一起探索科学！</span><br /><span style={{ font: `800 32px ${KF.texto}`, color: 'rgba(246,243,236,.8)' }}>Sígueme y exploremos la ciencia juntos</span></span>}
        robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HolaChinaApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HolaChina /></CompositionStage></div>;
}
window.HolaChinaApp = HolaChinaApp;
