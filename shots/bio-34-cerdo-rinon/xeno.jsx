// Shot Biotecnológico #34 · "Ese riñón no es de una persona: es de un cerdo" (xenotrasplante, eGenesis 69 ediciones) — NARRADO (N1 + N4).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos.
// 69 ediciones (Anand et al., Nature 2023) = 3 genes de azúcares borrados + 7 genes humanos + 59 copias de retrovirus del cerdo apagadas.

const RIN = '#c0563f', RIN2 = '#e07a5f', RIN_MORADO = '#4b2a4f', ARTERIA = '#e23b3b', VENA = '#3a6fd8', URETER = '#f2d16b';
const CERDO = '#55545e', CERDO2 = '#77767f';                      // el cerdo miniatura Yucatán es gris pizarra, casi sin pelo
const AZ = [KC.gold2, KC.pink, KC.cyan];                          // α-Gal · Neu5Gc · Sd(a)
const HUM = ['#ff8a1f', '#ffe11a', '#2fe0a8', '#00d2ff', '#b18cff', '#ff6b5a', '#f6f3ec'];  // 7 proteínas humanas
const PERV = '#ff3b2f';

function XSvg({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- riñón (vista de frente, hilio a la izquierda) ----------
   morado 0..1 (rechazo) · brillo 0..1 (latido de la sangre que pasa) · apaga 0..1 (deja de funcionar) */
function Rinon({ T = 0, x, y, s = 1, rot = 0, morado = 0, brillo = 0, apaga = 0, color = RIN, vasos = true }) {
  const c = mixHex(mixHex(color, RIN_MORADO, morado), '#6b5a55', apaga);
  const lat = 1 + 0.02 * brillo * Math.max(0, Math.sin(T * 7));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * lat})`}>
    {vasos && <g strokeLinecap="round" fill="none">
      <path d="M -40 -22 C -110 -30 -150 -70 -210 -80" stroke={KC.ink} strokeWidth={30} /><path d="M -40 -22 C -110 -30 -150 -70 -210 -80" stroke={ARTERIA} strokeWidth={20} />
      <path d="M -40 8 C -110 10 -160 -10 -215 -20" stroke={KC.ink} strokeWidth={32} /><path d="M -40 8 C -110 10 -160 -10 -215 -20" stroke={VENA} strokeWidth={22} />
      <path d="M -42 34 C -90 70 -80 160 -110 260" stroke={KC.ink} strokeWidth={20} /><path d="M -42 34 C -90 70 -80 160 -110 260" stroke={URETER} strokeWidth={11} />
    </g>}
    <path d="M 0 -170 C 115 -175 165 -90 155 0 C 148 95 100 175 0 170 C -70 168 -112 120 -92 70 C -74 32 -42 22 -42 0 C -42 -22 -74 -32 -92 -70 C -112 -120 -70 -168 0 -170 Z"
      fill={c} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 20 -135 C 95 -130 125 -70 122 -10" stroke="rgba(255,255,255,.45)" strokeWidth={14} fill="none" strokeLinecap="round" />
    {[[-10, -80], [40, -30], [30, 40], [-10, 100], [70, 90]].map(([a, b], i) => <circle key={i} cx={a + 20} cy={b} r={9} fill={mixHex(RIN2, RIN_MORADO, morado)} opacity={0.6} />)}
    {brillo > 0 && <path d="M 0 -170 C 115 -175 165 -90 155 0 C 148 95 100 175 0 170" stroke={KC.gold2} strokeWidth={8} fill="none" opacity={brillo * (0.4 + 0.4 * Math.max(0, Math.sin(T * 7)))} />}
  </g>;
}

/* ---------- cerdo miniatura Yucatán (de perfil, mirando a la derecha); la cola se mueve ---------- */
function Cerdo({ T = 0, x, y, s = 1 }) {
  const cola = Math.sin(T * 9) * 14, pata = Math.sin(T * 2) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -205 -30 q -40 ${-20 + cola} -30 -60 q 14 -26 -10 -30`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
    {[[-150, 0], [-95, 4], [95, 4], [150, 0]].map(([px, d], i) => <rect key={i} x={px - 22} y={70 + (i % 2 ? pata : -pata)} width={44} height={95} rx={14} fill={CERDO} stroke={KC.ink} strokeWidth={8} />)}
    <ellipse cx={0} cy={0} rx={220} ry={125} fill={CERDO} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={-30} cy={-50} rx={130} ry={40} fill={CERDO2} opacity={0.6} />
    <circle cx={205} cy={-50} r={95} fill={CERDO} stroke={KC.ink} strokeWidth={10} />
    <path d="M 160 -130 L 215 -205 L 245 -125 Z" fill={CERDO2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={295} cy={-30} rx={38} ry={46} fill="#8b8a93" stroke={KC.ink} strokeWidth={8} />
    <circle cx={290} cy={-42} r={7} fill={KC.ink} /><circle cx={302} cy={-18} r={7} fill={KC.ink} />
    <circle cx={228} cy={-80} r={11} fill={KC.white} /><circle cx={232} cy={-80} r={6} fill={KC.ink} />
  </g>;
}

/* ---------- charola de trasplante con hielo ---------- */
function Charola({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -330 40 L 330 40 L 290 130 L -290 130 Z" fill="#b8c2cc" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-345} y={20} width={690} height={34} rx={14} fill="#dfe6ec" stroke={KC.ink} strokeWidth={9} />
    {[[-250, 0], [-170, 10], [170, 8], [255, -2], [-90, 18], [95, 16]].map(([a, b], i) => <rect key={i} x={a - 34} y={b - 34} width={68} height={58} rx={12} fill="rgba(220,245,255,.9)" stroke="#7fb3d0" strokeWidth={5} transform={`rotate(${i * 23 - 40} ${a} ${b})`} />)}
  </g>;
}

/* ---------- silueta de persona (de frente); los riñones van en la espalda baja ---------- */
function Persona({ x, y, s = 1, color = '#f1b48f', o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-330} r={95} fill={color} stroke={KC.ink} strokeWidth={10} />
    <path d="M -170 -200 Q 0 -250 170 -200 L 200 140 Q 0 180 -200 140 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -170 -190 L -250 120" stroke={KC.ink} strokeWidth={60} strokeLinecap="round" /><path d="M -170 -190 L -250 120" stroke={color} strokeWidth={44} strokeLinecap="round" />
    <path d="M 170 -190 L 250 120" stroke={KC.ink} strokeWidth={60} strokeLinecap="round" /><path d="M 170 -190 L 250 120" stroke={color} strokeWidth={44} strokeLinecap="round" />
  </g>;
}
function MiniPersona({ x, y, s = 1, color }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle cx={0} cy={-14} r={9} fill={color} /><path d="M -12 22 L -12 4 Q 0 -6 12 4 L 12 22 Z" fill={color} /></g>;
}

/* ---------- célula de cerdo al microscopio: membrana con azúcares, anticuerpos y proteínas humanas ----------
   azucar 0..1 (se borran) · anticuerpos 0..1 (bajan y se pegan) · humanos 0..1 (aparecen los 7 escudos) */
function Membrana({ T, y0 = 1020, azucar = 1, anticuerpos = 0, humanos = 0, w = KW }) {
  const R = krng(11);
  const pies = Array.from({ length: 12 }, (_, i) => ({ x: 70 + i * 85 + (R() - 0.5) * 20, k: i % 3 }));
  const yM = (x) => y0 + Math.sin(x / 160 + T * 0.6) * 14;
  return <g>
    <path d={`M 0 ${yM(0)} ${Array.from({ length: 28 }, (_, i) => { const x = (i + 1) * 40; return `L ${x} ${yM(x)}`; }).join(' ')} L ${w} 1920 L 0 1920 Z`} fill="#3a1f3a" />
    <path d={`M 0 ${yM(0)} ${Array.from({ length: 28 }, (_, i) => { const x = (i + 1) * 40; return `L ${x} ${yM(x)}`; }).join(' ')}`} stroke="#ffb3c7" strokeWidth={18} fill="none" />
    <path d={`M 0 ${yM(0) + 22} ${Array.from({ length: 28 }, (_, i) => { const x = (i + 1) * 40; return `L ${x} ${yM(x) + 22}`; }).join(' ')}`} stroke="#ff8fb0" strokeWidth={8} fill="none" opacity={0.7} />
    {/* núcleo y citoplasma */}
    <ellipse cx={540} cy={y0 + 260} rx={190} ry={120} fill="#5a2d5c" stroke="#b47bb8" strokeWidth={6} />
    {/* azúcares en tallitos: hexágono (α-Gal), rombo (Neu5Gc), triángulo (Sd(a)) */}
    {azucar > 0 && pies.map((p, i) => { const yy = yM(p.x), sw = Math.sin(T * 2 + i) * 6, h = 90 * azucar;
      return <g key={i} opacity={azucar}>
        <line x1={p.x} y1={yy} x2={p.x + sw} y2={yy - h} stroke="#e8e0f0" strokeWidth={6} />
        <g transform={`translate(${p.x + sw} ${yy - h})`}>
          {p.k === 0 && <polygon points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12" fill={AZ[0]} stroke={KC.ink} strokeWidth={4} />}
          {p.k === 1 && <polygon points="0,-26 22,0 0,26 -22,0" fill={AZ[1]} stroke={KC.ink} strokeWidth={4} />}
          {p.k === 2 && <polygon points="0,-24 23,18 -23,18" fill={AZ[2]} stroke={KC.ink} strokeWidth={4} />}
        </g>
        {anticuerpos > 0 && <g transform={`translate(${p.x + sw} ${klerp(yy - 640, yy - h - 34, anticuerpos)}) rotate(180)`}><Anticuerpo s={0.9} /></g>}
      </g>; })}
    {humanos > 0 && HUM.map((c, i) => { const x = 110 + i * 140, yy = yM(x), on = kclamp(humanos * 7 - i, 0, 1);
      return on > 0 ? <g key={i} transform={`translate(${x} ${yy}) scale(${on})`}>
        <path d="M -30 0 L -30 -70 Q 0 -96 30 -70 L 30 0 Z" fill={c} stroke={KC.ink} strokeWidth={6} />
        <text x={0} y={-30} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>H</text>
      </g> : null; })}
  </g>;
}
function Anticuerpo({ s = 1 }) {
  return <g transform={`scale(${s})`} strokeLinecap="round">
    <path d="M 0 0 L 0 -50 M 0 -50 L -30 -90 M 0 -50 L 30 -90" stroke={KC.ink} strokeWidth={22} fill="none" />
    <path d="M 0 0 L 0 -50 M 0 -50 L -30 -90 M 0 -50 L 30 -90" stroke="#f6f3ec" strokeWidth={12} fill="none" />
  </g>;
}

/* ---------- tijeras de Cas9 ---------- */
function Tijeras({ x, y, s = 1, abre = 0 }) {
  const a = 8 + abre * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 120 -10 L 0 14 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={6} /><circle cx={-40} cy={-8} r={26} fill="none" stroke={KC.lilac} strokeWidth={14} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 120 10 L 0 -14 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={6} /><circle cx={-40} cy={8} r={26} fill="none" stroke={KC.lilac} strokeWidth={14} /></g>
    <circle r={9} fill={KC.ink} />
  </g>;
}

/* ---------- retrovirus dormido (PERV) con candado ---------- */
function Perv({ x, y, s = 1, apaga = 0, T = 0 }) {
  const c = mixHex(PERV, '#5d6470', apaga);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + T * 0.5 * (1 - apaga); return <line key={i} x1={Math.cos(a) * 18} y1={Math.sin(a) * 18} x2={Math.cos(a) * 28} y2={Math.sin(a) * 28} stroke={c} strokeWidth={5} strokeLinecap="round" />; })}
    <circle r={19} fill={c} stroke={KC.ink} strokeWidth={4} />
    {apaga > 0.5 && <g transform="translate(0 2)"><path d="M -8 -4 L -8 -11 Q 0 -20 8 -11 L 8 -4" stroke={KC.gold2} strokeWidth={4} fill="none" /><rect x={-11} y={-5} width={22} height={16} rx={3} fill={KC.gold2} stroke={KC.ink} strokeWidth={2} /></g>}
    {apaga <= 0.5 && <circle r={30 + Math.sin(T * 6) * 4} fill="none" stroke={PERV} strokeWidth={3} opacity={0.5} />}
  </g>;
}

/* ---------- contador de las 69 ediciones (N4: la imagen que se llena) ---------- */
function Contador69({ T, at, until, f3 = 0, f7 = 0, f59 = 0, y = 1440 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), cols = 23, sz = 32, gap = 6, x0 = (KW - cols * (sz + gap) + gap) / 2;
  const n3 = Math.round(3 * f3), n7 = Math.round(7 * f7), n59 = Math.round(59 * f59), tot = n3 + n7 + n59;
  return <div style={{ position:'absolute', left:0, top:y, width:KW, zIndex:40, opacity:e.o, transform:`translateY(${e.y}px)` }}>
    <svg width={KW} height={190}>
      <rect x={x0 - 18} y={0} width={cols * (sz + gap) + 30} height={3 * (sz + gap) + 24} rx={20} fill="rgba(14,15,18,.82)" stroke={KC.gold} strokeWidth={4} />
      {Array.from({ length: 69 }, (_, i) => { const cx = x0 + (i % cols) * (sz + gap), cy = 12 + Math.floor(i / cols) * (sz + gap);
        const col = i < 3 ? (i < n3 ? KC.gold2 : null) : i < 10 ? (i - 3 < n7 ? KC.cyan : null) : (i - 10 < n59 ? KC.mint : null);
        return <rect key={i} x={cx} y={cy} width={sz} height={sz} rx={7} fill={col || 'rgba(255,255,255,.12)'} stroke={col ? KC.ink : 'none'} strokeWidth={3} />; })}
    </svg>
    <div style={{ position:'absolute', left:0, right:0, top:142, textAlign:'center', font:`700 30px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>
      <span style={{ color:KC.gold2 }}>{n3} borrados</span> · <span style={{ color:KC.cyan }}>{n7} humanos</span> · <span style={{ color:KC.mint }}>{n59} virus apagados</span> = <b>{tot}</b>
    </div>
  </div>;
}

/* ---------- barra de escala sencilla ---------- */
function BarraEscala({ T, at, until, px = 200, texto, x = 60, y = 1690, color = KC.texto }) {
  if (!kvisible(T, at, until, 0.3)) return null;
  const e = kentrada(T, at, until, 'fundido');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:39, opacity:e.o }}>
    <div style={{ width:px, height:10, background:color, borderRadius:3, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
    <div style={{ font:`700 30px ${KF.mono}`, color, textShadow:KSOMBRA, marginTop:6 }}>{texto}</div>
  </div>;
}

/* ---------- máquina de diálisis ---------- */
function Dialisis({ x, y, s = 1, on = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-200} width={220} height={360} rx={24} fill="#e9eef2" stroke={KC.ink} strokeWidth={9} />
    <rect x={-80} y={-170} width={160} height={90} rx={10} fill={on ? '#0d1424' : '#3b3f46'} stroke={KC.ink} strokeWidth={6} />
    {on > 0 && <path d={`M -70 -125 ${Array.from({ length: 14 }, (_, i) => `L ${-70 + i * 11} ${-125 + (i % 4 === 2 ? -28 : 0) * Math.max(0, Math.sin(T * 5 + i))}`).join(' ')}`} stroke={KC.mint} strokeWidth={4} fill="none" />}
    <circle cx={-40} cy={-30} r={30} fill="#cfd6dc" stroke={KC.ink} strokeWidth={6} /><circle cx={40} cy={-30} r={30} fill="#cfd6dc" stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={20} width={60} height={110} rx={10} fill="#fff4d6" stroke={KC.ink} strokeWidth={6} />
    <path d="M 110 -60 C 200 -60 200 60 260 60" stroke={ARTERIA} strokeWidth={10} fill="none" opacity={on ? 1 : 0.35} />
    <path d="M 110 -20 C 180 -20 190 100 260 100" stroke={VENA} strokeWidth={10} fill="none" opacity={on ? 1 : 0.35} />
    {!on && <g><line x1={-120} y1={-210} x2={120} y2={170} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>}
  </g>;
}

/* ---------- calendario que pasa hojas ---------- */
function Calendario({ x, y, s = 1, dia = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-190} width={340} height={360} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    <rect x={-170} y={-190} width={340} height={90} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={10} />
    {[-90, 90].map((a) => <rect key={a} x={a - 12} y={-220} width={24} height={60} rx={10} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />)}
    <text x={0} y={-126} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.white}>DÍA</text>
    <text x={0} y={90} textAnchor="middle" style={{ font:`400 190px ${KF.titulo}` }} fill={KC.ink}>{Math.round(dia)}</text>
  </g>;
}

function Xeno() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Espera, R: CUES.Rechazo, Az: CUES.Azucares, B: CUES.Borrar, P: CUES.Pregunta, H: CUES.Humanos, V: CUES.Virus,
    S: CUES.Slayman, A: CUES.Andrews, D: CUES.Dias, Pu: CUES.Puente, C: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  // contador de ediciones
  const f3 = kprog(T, K.B + 0.8, K.B + 2.2), f7 = kprog(T, K.H + 1.2, K.H + 3.6), f59 = kprog(T, K.V + 0.4, K.V + 2.8);
  const sube = kprog(T, K.G, K.G + 0.6, kEase.sale);                         // el riñón sube a la charola desde el cuadro 0
  const llenaGente = kprog(T, K.E + 0.4, K.E + 3.4);
  const entra = kprog(T, K.R + 0.2, K.R + 1.2, kEase.suave), morado = kprog(T, K.R + 1.4, K.R + 3.6);
  const R = krng(3);
  const pervs = Array.from({ length: 59 }, (_, i) => { const fila = i % 3; return { x: 80 + (Math.floor(i / 3) * 47) + R() * 10, y: 600 + fila * 200 + (R() - 0.5) * 40, t: K.V + 0.4 + (i / 59) * 2.4 }; });
  const diasP = kprog(T, K.D + 0.3, K.D + 3.0, kEase.suave);
  const puente = kprog(T, K.Pu + 0.6, K.Pu + 2.6, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el riñón en la charola y el cerdito detrás */}
      <Escena T={T} a={K.G} b={K.E} zoom={0.06}>
        <FondoMarca color={KC.pink} T={T} />
        <XSvg>
          <Cerdo T={T} x={330} y={640} s={0.62} />
          <Charola x={540} y={1060} s={1.05} />
          <Rinon T={T} x={600} y={klerp(1300, 930, sube)} s={1.05} rot={-8} brillo={1} />
        </XSvg>
      </Escena>
      {/* 1 · la lista de espera en México: 160 figuras = 16,041 personas */}
      <Escena T={T} a={K.E} b={K.R} zoom={0.03}>
        <FondoMarca color={KC.yellow} T={T} />
        <XSvg>
          {Array.from({ length: 160 }, (_, i) => { const on = i / 160 < llenaGente; const cx = 104 + (i % 20) * 46, cy = 900 + Math.floor(i / 20) * 44;
            return <MiniPersona key={i} x={cx} y={cy} s={1.1} color={on ? KC.ink : 'rgba(22,18,15,.15)'} />; })}
        </XSvg>
      </Escena>
      {/* 2 · rechazo: un riñón de cerdo sin editar se pone morado */}
      <Escena T={T} a={K.R} b={K.Az} zoom={0.04}>
        <FondoMarca color={KC.orange} patron="rayas" T={T} />
        <XSvg>
          <Persona x={540} y={1000} s={1.15} />
          <Rinon T={T} x={klerp(980, 640, entra)} y={klerp(700, 1040, entra)} s={0.42} morado={morado} vasos={false} />
          <g transform="translate(260 640)">
            <circle r={110} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
            <line x1={0} y1={0} x2={Math.sin(T * 4) * 80} y2={-Math.cos(T * 4) * 80} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
            <line x1={0} y1={0} x2={Math.sin(T * 0.6) * 55} y2={-Math.cos(T * 0.6) * 55} stroke={KC.red} strokeWidth={12} strokeLinecap="round" />
            <circle r={12} fill={KC.ink} />
          </g>
        </XSvg>
      </Escena>
      {/* 3 · azúcares: Lupa sobre el riñón, luego la membrana de cerca */}
      <Escena T={T} a={K.Az} b={K.B} zoom={0.02}>
        <FondoMarca color={KC.pink} T={T} />
        <XSvg><Rinon T={T} x={540} y={1180} s={0.8} brillo={0.4} /></XSvg>
      </Escena>
      {/* 4–7 · micro: ADN y membrana (fondo oscuro) */}
      <Escena T={T} a={K.B} b={K.S} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <XSvg>
          {/* Borrar: tres genes de azúcares que se cortan */}
          {T < K.P + 0.5 && <g opacity={1 - kprog(T, K.P, K.P + 0.5)}>
            <ADNHebra T={T} x={90} y={760} largo={900} alto={90} vueltas={4} resalta={(u) => [0.15, 0.5, 0.85].some((c) => Math.abs(u - c) < 0.05) && T < K.B + 0.8} />
            {[0.15, 0.5, 0.85].map((c, i) => { const t0 = K.B + 0.8 + i * 0.5, ab = Math.abs(Math.sin((T - t0) * 9)) * kprog(T, t0 - 0.4, t0) * (1 - kprog(T, t0 + 0.3, t0 + 0.5));
              const gen = ['GGTA1', 'CMAH', 'B4GALNT2'][i];
              return <g key={i}>
                {T > t0 - 0.6 && T < t0 + 0.8 && <Tijeras x={90 + c * 900 - 120} y={760} s={1} abre={ab} />}
                <text x={90 + c * 900} y={660} textAnchor="middle" style={{ font:`italic 700 32px ${KF.mono}` }} fill={T > t0 ? '#8a8f99' : KC.gold2} textDecoration={T > t0 ? 'line-through' : 'none'}>{gen}</text>
                {T > t0 && <text x={90 + c * 900} y={880} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.red}>✕</text>}
              </g>; })}
          </g>}
          {/* Pregunta: la célula ya sin azúcares y un ? grande */}
          {T > K.P - 0.3 && T < K.H + 0.4 && <g opacity={kprog(T, K.P - 0.3, K.P + 0.2) * (1 - kprog(T, K.H, K.H + 0.4))}>
            <Membrana T={T} y0={1050} azucar={0} />
            <text x={270} y={900} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 760)`}>?</text>
          </g>}
          {/* Humanos: paquete de 7 genes entra al ADN y salen 7 escudos */}
          {T > K.H - 0.3 && T < K.V + 0.4 && <g opacity={kprog(T, K.H - 0.3, K.H + 0.2) * (1 - kprog(T, K.V, K.V + 0.4))}>
            <ADNHebra T={T} x={90} y={740} largo={900} alto={80} vueltas={4} resalta={(u) => u > 0.42 && u < 0.58 && T > K.H + 1.2} />
            {HUM.map((c, i) => { const p = kprog(T, K.H + 0.2 + i * 0.12, K.H + 1.2 + i * 0.12, kEase.suave);
              return <rect key={i} x={klerp(-120 + i * 70, 470 + (i % 4) * 34, p)} y={klerp(500, 720 + Math.floor(i / 4) * 28, p) - 14} width={30} height={24} rx={6} fill={c} stroke={KC.ink} strokeWidth={4} opacity={1 - kprog(T, K.H + 1.4, K.H + 1.8)} />; })}
            <Membrana T={T} y0={1050} azucar={0} humanos={kprog(T, K.H + 1.6, K.H + 4.0)} />
            {T > K.H + 2.6 && <g opacity={1 - kprog(T, K.H + 4.2, K.H + 5)}>{[200, 470, 760].map((x, i) => <g key={i} transform={`translate(${x + Math.sin(T * 2 + i) * 20} ${klerp(820, 920, kprog(T, K.H + 2.6, K.H + 3.4))}) rotate(180)`} opacity={0.5}><Anticuerpo s={0.8} /></g>)}</g>}
          </g>}
          {/* Virus: 59 retrovirus dormidos en tres tramos de ADN se apagan con candado */}
          {T > K.V - 0.3 && <g opacity={kprog(T, K.V - 0.3, K.V + 0.2)}>
            {[600, 800, 1000].map((y, i) => <ADNHebra key={i} T={T + i} x={60} y={y} largo={960} alto={50} vueltas={5} grosor={5} />)}
            {pervs.map((p, i) => <Perv key={i} x={p.x} y={p.y} s={0.85} T={T} apaga={kprog(T, p.t, p.t + 0.25)} />)}
          </g>}
        </XSvg>
      </Escena>
      {/* 8 · Slayman, 2024 */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.03}>
        <FondoMarca color={KC.lilac} T={T} />
        <XSvg>
          <g transform="translate(540 1110)">
            <rect x={-420} y={-14} width={840} height={28} rx={14} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={6} />
            <rect x={-420} y={-14} width={840 * kprog(T, K.S + 3.0, K.S + 5.2, kEase.suave)} height={28} rx={14} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
            <text x={-420} y={-40} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>marzo 2024</text>
            <text x={420} y={-40} textAnchor="end" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.S + 4.8, K.S + 5.2)}>casi 2 meses</text>
            {T > K.S + 5.2 && <g transform={`translate(420 0) scale(${1 + 0.08 * Math.max(0, Math.sin(T * 6))})`}><path d="M 0 30 C -60 -10 -50 -60 0 -36 C 50 -60 60 -10 0 30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /></g>}
          </g>
        </XSvg>
      </Escena>
      {/* 9 · Andrews, enero de 2025: Lupa POR DENTRO del abdomen */}
      <Escena T={T} a={K.A} b={K.D} zoom={0.03}>
        <FondoMarca color={KC.cyan} T={T} />
        <XSvg><Persona x={330} y={1040} s={1.0} /></XSvg>
      </Escena>
      {/* 10 · 271 días sin diálisis */}
      <Escena T={T} a={K.D} b={K.Pu} zoom={0.03}>
        <FondoMarca color={KC.yellow} T={T} />
        <XSvg>
          <Calendario x={330} y={930} s={1.05} dia={271 * diasP} />
          <Dialisis x={780} y={960} s={0.95} on={0} T={T} />
          <Rinon T={T} x={760} y={680} s={0.42} brillo={1 - kprog(T, K.D + 3.0, K.D + 3.8)} apaga={kprog(T, K.D + 3.0, K.D + 3.8)} vasos={false} />
        </XSvg>
      </Escena>
      {/* 11 · el puente */}
      <Escena T={T} a={K.Pu} b={K.C} zoom={0.03}>
        <FondoMarca color={KC.mint} T={T} />
        <XSvg>
          <Dialisis x={190} y={1020} s={0.7} on={1} T={T} />
          <path d={`M 230 900 Q 540 ${klerp(900, 560, puente)} 860 900`} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" strokeDasharray="1600" strokeDashoffset={1600 * (1 - puente)} />
          <path d={`M 230 900 Q 540 ${klerp(900, 560, puente)} 860 900`} stroke={KC.gold2} strokeWidth={20} fill="none" strokeLinecap="round" strokeDasharray="1600" strokeDashoffset={1600 * (1 - puente)} />
          {puente > 0.5 && [0.2, 0.35, 0.5, 0.65, 0.8].map((u, i) => { const xx = 230 + u * 630, yy = (1 - u) * (1 - u) * 900 + 2 * (1 - u) * u * klerp(900, 560, puente) + u * u * 900; return <line key={i} x1={xx} y1={yy} x2={xx} y2={960} stroke={KC.ink} strokeWidth={10} opacity={kprog(T, K.Pu + 1.6 + i * 0.1, K.Pu + 1.9 + i * 0.1)} />; })}
          <Rinon T={T} x={540} y={klerp(900, 700, puente) - 30} s={0.32} color="#8a6a66" vasos={false} />
          <Rinon T={T} x={900} y={1000} s={0.5} color="#e0786a" brillo={kprog(T, K.Pu + 2.4, K.Pu + 3.0)} vasos={false} />
        </XSvg>
      </Escena>
      {/* 12 · cierre: la charola del inicio, ahora con el puente detrás */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoMarca color={KC.pink} T={T} />
        <XSvg>
          <path d="M 120 760 Q 540 430 960 760" stroke={KC.gold2} strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.85} />
          <Cerdo T={T} x={170} y={600} s={0.36} />
          {Array.from({ length: 12 }, (_, i) => <MiniPersona key={i} x={340 + (i % 6) * 52} y={640 + Math.floor(i / 6) * 56} s={1.1} color={KC.ink} />)}
          <Charola x={540} y={1060} s={1.05} />
          <Rinon T={T} x={600} y={930} s={1.05} rot={-8} brillo={1} />
        </XSvg>
      </Escena>

      {/* Lupas */}
      <Lupa T={T} at={K.Az + 0.3} until={K.B - 0.1} x={540} y={760} r={300} fx={560} fy={1150} tinte={KC.pink} etiqueta="AL MICROSCOPIO · CÉLULA DE CERDO"
        interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="0 380 1080 1080"><rect x={0} y={380} width={1080} height={1080} fill="#16101c" />
          <Membrana T={t} y0={1000} azucar={1} anticuerpos={kprog(t, K.Az + 1.6, K.Az + 3.2, kEase.suave)} /></svg>} />
      <Lupa T={T} at={K.A + 0.3} until={K.D - 0.1} x={730} y={880} r={220} fx={360} fy={1010} tinte={KC.gold2} etiqueta="POR DENTRO · RIÑÓN"
        interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="-300 -300 600 600"><rect x={-300} y={-300} width={600} height={600} fill="#3a1520" />
          <Rinon T={t} x={30} y={0} s={1.1} brillo={1} /></svg>} />

      {/* escala, chips y tarjetas */}
      <BarraEscala T={T} at={K.G} until={K.E - 0.2} px={160} texto="≈ 5 cm" />
      <BarraEscala T={T} at={K.R} until={K.Az - 0.2} px={140} texto="≈ 30 cm" />
      <BarraEscala T={T} at={K.Az + 0.8} until={K.S - 0.2} px={200} texto="≈ 10 µm (esquemático)" />
      <BarraEscala T={T} at={K.D} until={K.C - 0.2} px={160} texto="≈ 5 cm" />
      <BarraEscala T={T} at={K.C} until={K.O - 0.1} px={160} texto="≈ 5 cm" />
      <Chip T={T} at={K.G + 0.2} until={K.E - 0.3} texto="69 cambios en su ADN" y={1500} tam={50} borde={KC.gold} />
      <Etq T={T} at={K.G + 1.4} until={K.E - 0.3} x={60} y={420} texto="cerdo miniatura Yucatán" tam={32} color={KC.ink} />
      <NumeroGigante T={T} at={K.E + 0.2} until={K.R - 0.3} valor={16041} dur={2.6} etiqueta="esperan un riñón en México" y={640} tam={210} color={KC.white} />
      <Chip T={T} at={K.E + 1.0} until={K.R - 0.3} texto="CENATRA · corte al 3 oct 2026" x={380} y={1480} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.E + 3.0} until={K.R - 0.3} x={60} y={1580} texto="cada figura = 100 personas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 1.6} until={K.Az - 0.3} texto="riñón de cerdo SIN editar" x={400} y={470} tam={36} borde={KC.red} />
      <Chip T={T} at={K.R + 2.4} until={K.Az - 0.3} texto="rechazo: en minutos u horas" y={1500} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Az + 1.2} until={K.B - 0.2} x={60} y={1490} texto="3 azúcares del cerdo" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.Az + 2.0} until={K.B - 0.2} x={1020} y={1560} texto="tus anticuerpos" lado="izq" tam={32} color={KC.texto} />
      <Chip T={T} at={K.B + 0.2} until={K.P - 0.2} texto="CRISPR: 3 genes borrados" y={470} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.H + 0.4} until={K.V - 0.2} texto="+7 genes humanos" x={400} y={470} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.H + 3.2} until={K.V - 0.2} x={60} y={1180} texto="defensas · inflamación · coágulos" tam={30} color={KC.cyan} />
      <Chip T={T} at={K.V + 0.2} until={K.S - 0.2} texto="59 retrovirus del cerdo, apagados" y={470} tam={38} borde={KC.mint} />
      <Contador69 T={T} at={K.B + 0.5} until={K.S - 0.3} f3={f3} f7={f7} f59={f59} />
      <TarjetaEstudio T={T} at={K.S + 0.3} until={K.A - 0.3} anio="2024" quien="Richard Slayman · Boston" revista="primer paciente vivo con riñón de cerdo editado" x={430} y={820} />
      <Chip T={T} at={K.S + 5.4} until={K.A - 0.3} texto="murió por su corazón, no por el riñón" y={1500} tam={36} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.A + 0.2} until={K.D - 0.3} anio="2025" quien="Tim Andrews · Boston" revista="25 ene 2025 · Hospital General de Massachusetts" y={470} />
      <Chip T={T} at={K.D + 0.4} until={K.Pu - 0.3} texto="25 ene → 23 oct 2025" y={1500} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.D + 3.2} until={K.Pu - 0.3} x={560} y={560} texto="empezó a fallar" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pu + 0.3} until={K.C - 0.3} texto="ene 2026 · riñón humano" y={470} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.Pu + 1.8} until={K.C - 0.3} texto="2025 · la FDA autorizó los primeros ensayos" y={1500} tam={34} borde={KC.blue} />
      <Etq T={T} at={K.Pu + 0.8} until={K.C - 0.3} x={60} y={760} texto="diálisis" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pu + 2.6} until={K.C - 0.3} x={1020} y={860} texto="riñón humano" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 0.6} until={K.O - 0.1} texto="un puente para quien espera" y={1500} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.05} until={K.E - 0.1} texto="No es de una persona: *es de un cerdo.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.R - 0.1} texto="Más de 16 mil *esperan un riñón.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Az - 0.1} texto="Tu cuerpo *lo destruye.*" />
      <Subtitulo T={T} idx={3} at={K.Az + 0.1} until={K.B - 0.1} texto="Tres azúcares: *enemigos.*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.P - 0.1} texto="CRISPR *borra tres genes.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Eso *basta?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.V - 0.1} texto="Siete *genes humanos.*" />
      <Subtitulo T={T} idx={7} at={K.V + 0.1} until={K.S - 0.1} texto="59 virus *apagados.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.A - 0.1} texto="2024: *el primer paciente vivo.*" />
      <Subtitulo T={T} idx={9} at={K.A + 0.1} until={K.D - 0.1} texto="2025: *Tim Andrews.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.Pu - 0.1} texto="271 días *sin diálisis.*" />
      <Subtitulo T={T} idx={11} at={K.Pu + 0.1} until={K.C - 0.1} texto="El de cerdo *fue su puente.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.O - 0.1} texto="Un puente *para quien espera.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Espera - 0.1, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Espera + 0.5, CUES.Rechazo - 0.3, 'avatar_10_serio_molesto', 'bajo-der'],
        [CUES.Rechazo + 0.6, CUES.Azucares - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Humanos + 0.4, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Humanos + 1.8, CUES.Virus - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Slayman + 0.8, CUES.Andrews - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Dias + 0.4, CUES.Puente - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Puente + 0.3, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="34" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function XenoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Xeno /></CompositionStage></div>;
}
window.XenoApp = XenoApp;
