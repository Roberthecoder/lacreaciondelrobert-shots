// Shot Fungi Mati #46 · La primera estatina la hizo un moho: Akira Endo y la compactina — NARRADO (N1 "Por dentro", gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const VERDEAZUL = '#3fa98f', VERDEAZUL2 = '#7fd6bd', CANELA = '#c99a5b', COLES = '#ffd23a';

// Pastilla blanca (ovalada, con ranura).
function Pastilla({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={96} ry={50} fill="#c9c4b8" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={96} ry={50} fill="#fbfaf6" stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={-44} x2={0} y2={44} stroke="#cfc9bb" strokeWidth={6} />
    <ellipse cx={-40} cy={-20} rx={26} ry={10} fill="#fff" />
  </g>;
}
// Grano de arroz (largo y redondeado).
function Grano({ x, y, r = 0, s = 1, color = '#fffaf0' }) {
  return <ellipse cx={x} cy={y} rx={22 * s} ry={9 * s} transform={`rotate(${r} ${x} ${y})`} fill={color} stroke={KC.ink} strokeWidth={3} />;
}
const GRANOS = (() => { const g = krng(46); return Array.from({ length: 46 }, () => [(g() - 0.5) * 400, -g() * 70 - 10, g() * 180]); })();
// Plato hondo con arroz. rojo 0..1 = el arroz se tiñe (levadura roja); moho 0..1 = colonias azul verdosas.
function PlatoArroz({ T, x, y, s = 1, rojo = 0, moho = 0 }) {
  const c = mixHex('#fffaf0', '#c4262e', rojo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -30 Q -230 -20 -220 0 Q -160 110 0 115 Q 160 110 220 0 Q 230 -20 230 -30 Z" fill="#2c6fd6" stroke={KC.ink} strokeWidth={8} />
    <path d="M -180 40 Q 0 70 180 40" stroke="#fff" strokeWidth={8} fill="none" opacity=".6" />
    <path d="M -215 -30 Q -200 -105 0 -112 Q 200 -105 215 -30 Z" fill={c} stroke={KC.ink} strokeWidth={5} />
    {GRANOS.map(([gx, gy, gr], i) => Math.abs(gx) < 190 - Math.abs(gy) * 0.6 ? <Grano key={i} x={gx} y={gy - 20} r={gr} color={c} /> : null)}
    {moho > 0 && [[-110, -70, 0], [40, -60, 0.2], [130, -80, 0.4], [-30, -95, 0.6]].map(([mx, my, t0], i) => { const k = kprog(moho, t0, t0 + 0.5); return k > 0 ? <g key={i}>
      <circle cx={mx} cy={my} r={34 * k} fill={VERDEAZUL} stroke={KC.ink} strokeWidth={4} /><circle cx={mx} cy={my} r={16 * k} fill={VERDEAZUL2} /></g> : null; })}
    <rect x={-250} y={-44} width={500} height={20} rx={10} fill="#5b94ea" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Bolsa de arroz de tienda.
function BolsaArroz({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 L -130 -360 Q 0 -390 130 -360 L 150 0 Q 0 30 -150 0 Z" fill="#f2e2b6" stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 -360 Q -100 -420 -60 -380 Q -20 -430 20 -385 Q 60 -430 100 -380 L 130 -360" fill="#e9d39a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-100} y={-250} width={200} height={110} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-178} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff">米</text>
    {Array.from({ length: 9 }, (_, i) => <Grano key={i} x={-90 + (i % 5) * 45} y={-90 + Math.floor(i / 5) * 40} r={i * 40} s={0.9} />)}
  </g>;
}
// Silueta esquemática de cuerpo con hígado. luz 0..1 = el hígado brilla.
function CuerpoHigado({ T, x, y, s = 1, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-330} r={80} fill="#f2c29b" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -230 Q -170 -150 -150 120 L 150 120 Q 170 -150 150 -230 Q 0 -260 -150 -230 Z" fill="#8fb6ff" stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 -80 Q -120 -150 -20 -150 Q 100 -160 110 -110 Q 90 -60 30 -50 Q -60 -30 -110 -80 Z" fill={mixHex('#a0442e', '#e2603f', luz)} stroke={KC.ink} strokeWidth={6}
      style={luz ? { filter:`drop-shadow(0 0 ${18 * luz}px ${COLES})` } : null} />
  </g>;
}
// Riñón.
function Rinon({ x, y, s = 1, color = '#b0413e' }) {
  return <path d="M 0 -70 Q 60 -80 70 -10 Q 75 60 10 72 Q -40 78 -45 40 Q -20 20 -30 0 Q -60 -20 -40 -50 Q -25 -70 0 -70 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={6} />;
}
// Molécula esquemática tipo estatina: dos anillos fusionados + anillo lactona con cadena. metilo = palito extra (lovastatina/monacolina K).
function Molecula({ x, y, s = 1, color = KC.leaf, rot = 0, metilo = false, o = 1 }) {
  const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={hex(-35, 0, 40)} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={hex(35, 0, 40)} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 -40 L 10 -90 L 50 -110" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d={hex(88, -120, 34)} fill={mixHex(color, '#ffffff', 0.35)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -55 34 L -60 80 L -100 100" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    {metilo && <path d="M 70 20 L 100 50" stroke={KC.red} strokeWidth={9} strokeLinecap="round" />}
  </g>;
}
// Pieza HMG-CoA (la que usa la enzima): forma parecida, en amarillo.
function PiezaHMG({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 -30 L 0 -50 L 40 -30 L 40 20 L 0 40 L -40 20 Z" fill={COLES} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 40 -5 L 90 -5 L 110 20" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Enzima HMG-CoA reductasa (esquemática): una "máquina" con un hueco arriba.
function Enzima({ T, x, y, s = 1, color = '#b18cff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -60 Q -210 -150 -120 -160 L -70 -160 Q -60 -90 0 -90 Q 60 -90 70 -160 L 120 -160 Q 210 -150 200 -60 Q 210 120 0 140 Q -210 120 -200 -60 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-90} cy={20} r={14} fill={KC.ink} /><circle cx={90} cy={20} r={14} fill={KC.ink} />
    <path d={`M -40 70 Q 0 ${85 + Math.sin(T * 3) * 6} 40 70`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Penicillium: pincel biverticilado (pie → métulas → fiálides → cadenas de esporas globosas). crece 0..1.
function Pincel({ x, y, s = 1, crece = 1, color = VERDEAZUL }) {
  if (crece <= 0) return null;
  const pie = 220 * kprog(crece, 0, 0.35), met = kprog(crece, 0.3, 0.5), fia = kprog(crece, 0.45, 0.65), esp = kprog(crece, 0.6, 1);
  const tope = -pie;
  const metulas = [-22, 0, 22];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 0 ${tope}`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" /><path d={`M 0 0 L 0 ${tope}`} stroke="#eef6f0" strokeWidth={12} strokeLinecap="round" />
    {metulas.map((ang, i) => { const a = (ang - 90) * Math.PI / 180, L = 70 * met; const mx = Math.cos(a) * L, my = tope + Math.sin(a) * L;
      return met > 0 ? <g key={i}>
        <line x1={0} y1={tope} x2={mx} y2={my} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" /><line x1={0} y1={tope} x2={mx} y2={my} stroke="#eef6f0" strokeWidth={11} strokeLinecap="round" />
        {[-14, 0, 14].map((b, j) => { const a2 = (ang + b - 90) * Math.PI / 180, L2 = 46 * fia; const fx = mx + Math.cos(a2) * L2, fy = my + Math.sin(a2) * L2;
          return fia > 0 ? <g key={j}>
            <line x1={mx} y1={my} x2={fx} y2={fy} stroke={KC.ink} strokeWidth={15} strokeLinecap="round" /><line x1={mx} y1={my} x2={fx} y2={fy} stroke="#eef6f0" strokeWidth={8} strokeLinecap="round" />
            {Array.from({ length: Math.floor(6 * esp) }, (_, k) => <circle key={k} cx={fx + Math.cos(a2) * (14 + k * 19)} cy={fy + Math.sin(a2) * (14 + k * 19)} r={9} fill={color} stroke={KC.ink} strokeWidth={3} />)}
          </g> : null; })}
      </g> : null; })}
  </g>;
}
// Aspergillus terreus: pie liso, vesícula, biseriado en la mitad de arriba, y cabezuela compacta en COLUMNA (cadenas paralelas).
function ColumnaTerreus({ x, y, s = 1, crece = 1, color = CANELA }) {
  if (crece <= 0) return null;
  const pie = 200 * kprog(crece, 0, 0.35), col = kprog(crece, 0.4, 1);
  const vy = -pie;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L 0 ${vy}`} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" /><path d={`M 0 0 L 0 ${vy}`} stroke="#f7f1e6" strokeWidth={10} strokeLinecap="round" />
    {pie > 190 && <>
      {Array.from({ length: 7 }, (_, i) => { const xx = -36 + i * 12; const n = Math.floor(14 * col); return <g key={i}>
        <line x1={xx * 0.7} y1={vy - 24} x2={xx} y2={vy - 44} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
        {Array.from({ length: n }, (_, k) => <circle key={k} cx={xx} cy={vy - 52 - k * 13} r={6.5} fill={color} stroke={KC.ink} strokeWidth={2} />)}
      </g>; })}
      <ellipse cx={0} cy={vy - 14} rx={30} ry={22} fill="#f7f1e6" stroke={KC.ink} strokeWidth={6} />
    </>}
  </g>;
}
// Silueta de Akira Endo (esquemática, sin rostro) con un foco de idea.
function Silueta({ T, x, y, s = 1, foco = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-260} r={90} fill="#2b2f3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -190 60 Q -190 -140 0 -150 Q 190 -140 190 60 Z" fill="#2b2f3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -150 L 0 -60 L 40 -150" fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
    {foco > 0 && <g transform={`translate(150 -420) scale(${kEase.rebote(foco)})`}>
      {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={Math.cos(a) * 70} y1={Math.sin(a) * 70 - 10} x2={Math.cos(a) * 100} y2={Math.sin(a) * 100 - 10} stroke={KC.yellow} strokeWidth={9} strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(T * 8)} />; })}
      <circle cx={0} cy={-10} r={52} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
      <rect x={-22} y={38} width={44} height={30} rx={6} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Caja de Petri chiquita en la pared de la búsqueda.
function MiniPetri({ x, y, r = 34, color = '#fff4d6', brilla = 0 }) {
  return <g transform={`translate(${x} ${y})`} style={brilla ? { filter:`drop-shadow(0 0 ${14 * brilla}px ${KC.yellow})` } : null}>
    <circle r={r} fill="#f5e7b8" stroke={KC.ink} strokeWidth={4} />
    <circle r={r * 0.55} fill={color} stroke="rgba(0,0,0,.25)" strokeWidth={2} />
  </g>;
}
// Gota de sangre con bolitas de colesterol.
function GotaSangre({ T, x, y, s = 1, n = 8 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -150 Q 110 0 100 60 Q 90 140 0 145 Q -90 140 -100 60 Q -110 0 0 -150 Z" fill="#d62b3a" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={Math.sin(i * 2.1) * 55} cy={40 + Math.cos(i * 1.7) * 55 + Math.sin(T * 2 + i) * 4} r={14} fill={COLES} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

function EstatinasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Higado, E: CUES.Enzima, I: CUES.Idea, B: CUES.Busqueda, A: CUES.Arroz, P: CUES.Pregunta, F: CUES.Freno, R: CUES.Receptores, S: CUES.Estudio, M: CUES.Monascus, Ig: CUES.Igual, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const AM = K.A + 2.3; // del grano al microscopio
  // gancho: la pastilla cae y rebota
  const cae = kprog(T, K.G, K.G + 0.6, kEase.rebote);
  // freno: la compactina entra al hueco antes que la pieza amarilla
  const entra = kprog(T, K.F + 0.6, K.F + 1.8, kEase.sale), rebota = kprog(T, K.F + 1.6, K.F + 2.4, kEase.sale);
  const menos = kprog(T, K.F + 2.2, K.F + 3.4);
  // receptores
  const nRec = Math.floor(2 + 7 * kprog(T, K.R + 0.2, K.R + 2.0));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pastilla y el plato de arroz; brota el moho */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoArroz T={T} x={330} y={980} s={1.0} />
          <RedHifas T={T} x={760} y={960} g={kprog(T, K.G + 1.6, K.G + 4.2)} seed={7} n={180} escala={0.2} color={VERDEAZUL} ancho={5} />
          <Pastilla x={760} y={klerp(420, 960, cae)} s={1.25} rot={klerp(-40, -8, cae)} />
        </>)}
      </Escena>
      {/* 2 · tu hígado fabrica colesterol */}
      <Escena T={T} a={K.H} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <CuerpoHigado T={T} x={290} y={1000} s={1.1} luz={kprog(T, K.H + 0.2, K.H + 0.8)} />
          {Array.from({ length: 12 }, (_, i) => { const u = kprog(T, K.H + 0.5 + i * 0.12, K.H + 1.4 + i * 0.12, kEase.sale); return u > 0 ? <circle key={i} cx={300 + u * (60 + (i % 4) * 30) + Math.cos(i * 2.4) * 30} cy={880 - u * (60 + (i % 3) * 50)} r={16} fill={COLES} stroke={KC.ink} strokeWidth={4} /> : null; })}
          <g opacity={kprog(T, K.H + 1.4, K.H + 1.9)}>
            <text x={640} y={940} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={8}>&gt;</text>
            <ellipse cx={880} cy={980} rx={130} ry={34} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            {[[850, 950], [890, 945], [920, 958]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={16} fill={COLES} stroke={KC.ink} strokeWidth={4} />)}
          </g>
        </>)}
      </Escena>
      {/* 3 · treinta pasos; uno marca el ritmo (AL MICROSCOPIO) */}
      <Escena T={T} a={K.E} b={K.I}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {Array.from({ length: 30 }, (_, i) => { const on = kprog(T, K.E + 0.2 + i * 0.07, K.E + 0.4 + i * 0.07); const clave = i === 2; const big = clave ? kprog(T, K.E + 2.4, K.E + 3.0, kEase.rebote) : 0;
            const cx = 150 + (i % 6) * 156, cy = 730 + Math.floor(i / 6) * 76;
            return <g key={i} opacity={0.25 + 0.75 * on}><rect x={cx - 60} y={cy - 36} width={120} height={72} rx={14} fill={clave && big > 0 ? KC.lilac : on > 0.5 ? '#2fe0a8' : '#33405a'} stroke={KC.ink} strokeWidth={5} />
              <text x={cx} y={cy + 14} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{i + 1}</text></g>; })}
          {kprog(T, K.E + 2.4, K.E + 3.0) > 0 && <g opacity={kprog(T, K.E + 2.4, K.E + 2.8)}>
            <Enzima T={T} x={860} y={1110} s={0.45 * kprog(T, K.E + 2.4, K.E + 3.0, kEase.rebote)} />
          </g>}
        </>)}
      </Escena>
      {/* 4 · Akira Endo sospecha de los hongos */}
      <Escena T={T} a={K.I} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Silueta T={T} x={330} y={1150} s={1.1} foco={kprog(T, K.I + 1.6, K.I + 2.3)} />
          <Seta x={760} y={1150} s={1.3} crece={kprog(T, K.I + 2.4, K.I + 3.2)} sombrero="#d9534f" />
          <Seta x={900} y={1150} s={0.9} crece={kprog(T, K.I + 2.7, K.I + 3.5)} sombrero={KC.orange} escamas={false} />
          <Petri x={830} y={830} r={90}><Colonia cx={0} cy={0} r={60 * kprog(T, K.I + 2.9, K.I + 3.8)} color={VERDEAZUL2} seed={3} /></Petri>
          <text x={800} y={740} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.I + 3.4, K.I + 3.8)}>?</text>
        </>)}
      </Escena>
      {/* 5 · miles de hongos; tras 3,800, la citrinina daña riñones */}
      <Escena T={T} a={K.B} b={K.A}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {Array.from({ length: 48 }, (_, i) => { const on = kprog(T, K.B + 0.1 + i * 0.035, K.B + 0.3 + i * 0.035, kEase.rebote); const hit = i === 41; const br = hit ? kprog(T, K.B + 2.0, K.B + 2.4) : 0;
            return on > 0 ? <g key={i} transform={`translate(${110 + (i % 8) * 123} ${720 + Math.floor(i / 8) * 82}) scale(${on})`}><MiniPetri x={0} y={0} color={hit && br > 0 ? KC.yellow : ['#fff4d6', '#cfe8a9', '#f4c1a1', '#d9d0f2'][i % 4]} brilla={br} /></g> : null; })}
          {kprog(T, K.B + 2.7, K.B + 3.1) > 0 && <g opacity={kprog(T, K.B + 2.7, K.B + 3.0)}>
            <rect x={560} y={830} width={420} height={210} rx={30} fill="rgba(14,15,18,.82)" stroke={KC.red} strokeWidth={6} />
            <Rinon x={680} y={915} s={1.1 * kprog(T, K.B + 2.7, K.B + 3.1, kEase.rebote)} />
            <path d="M 620 860 L 740 970 M 740 860 L 620 970" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.B + 3.1, K.B + 3.3)} />
          </g>}
        </>)}
      </Escena>
      {/* 6a · la bolsa de arroz de una tienda de Kioto; el grano con moho */}
      <Escena T={T} a={K.A} b={AM} zoom={0.12} origen="70% 50%">
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <BolsaArroz x={290} y={1150} s={1.15} />
          <g transform={`translate(740 900) scale(${kprog(T, K.A + 0.3, K.A + 0.9, kEase.rebote)})`}>
            <circle r={210} fill="#fffaf0" stroke={KC.ink} strokeWidth={10} />
            <ellipse cx={0} cy={0} rx={170} ry={70} fill="#fffaf0" stroke={KC.ink} strokeWidth={6} transform="rotate(-20)" />
            <Colonia cx={30} cy={-10} r={70 * kprog(T, K.A + 0.8, K.A + 1.8)} color={VERDEAZUL} seed={9} />
            <Colonia cx={30} cy={-10} r={34 * kprog(T, K.A + 1.0, K.A + 1.9)} color={VERDEAZUL2} seed={4} />
          </g>
        </>)}
      </Escena>
      {/* 6b · AL MICROSCOPIO · el pincel de Penicillium citrinum */}
      <Escena T={T} a={AM} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<Pincel x={620} y={1160} s={1.6} crece={kprog(T, AM, AM + 2.0)} />)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.F} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Interrogacion T={T} x={270} y={1000} tam={460} /><GotaSangre T={T} x={260} y={560 + 0} s={0.7} /></>)}
      </Escena>
      {/* 8 · la molécula del moho le gana el lugar a la pieza HMG-CoA */}
      <Escena T={T} a={K.F} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Enzima T={T} x={540} y={900} s={1.2} />
          <Molecula x={klerp(180, 540, entra)} y={klerp(560, 770, entra)} s={0.75} rot={klerp(-30, 0, entra)} color={KC.leaf} />
          <PiezaHMG x={klerp(900, 820, rebota) + (rebota > 0 ? 0 : Math.sin(T * 3) * 8)} y={klerp(600, 560, rebota) - (rebota > 0 ? Math.sin(rebota * Math.PI) * 60 : 0)} s={1.1} rot={rebota * 40} />
          {/* fila de colesterol que sale de la enzima y se adelgaza */}
          {Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.6 + i / 7) % 1); const vis = i < 7 - Math.round(menos * 5); return vis ? <circle key={i} cx={760 + u * 300} cy={1060 + Math.sin(u * 6) * 10} r={16} fill={COLES} stroke={KC.ink} strokeWidth={4} opacity={1 - u * 0.5} /> : null; })}
        </>)}
      </Escena>
      {/* 9 · más receptores jalan colesterol de la sangre */}
      <Escena T={T} a={K.R} b={K.S}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <path d="M -100 520 Q 480 560 520 900 Q 480 1240 -100 1280 Z" fill="#a0442e" stroke={KC.ink} strokeWidth={9} />
          <circle cx={150} cy={900} r={110} fill="#6a2a5c" stroke={KC.ink} strokeWidth={6} />
          <path d="M 700 400 Q 640 900 700 1280 L 1180 1280 L 1180 400 Z" fill="#7a1420" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 9 }, (_, i) => { if (i >= nRec) return null; const t = 0.12 + i * 0.095; const yy = klerp(600, 1200, t); const xx = 520 - Math.pow((yy - 900) / 380, 2) * 120 + (i % 2) * 6;
            return <g key={i} transform={`translate(${xx} ${yy}) scale(${kprog(T, K.R + 0.2 + i * 0.2, K.R + 0.5 + i * 0.2, kEase.rebote)})`}>
              <path d="M 0 0 L 34 0 M 34 0 L 56 -18 M 34 0 L 56 18" stroke={KC.mint} strokeWidth={10} strokeLinecap="round" fill="none" />
            </g>; })}
          {Array.from({ length: 12 }, (_, i) => { const u = kclamp(((T - K.R - 1.2) * 0.45 + i / 12) % 1, 0, 1); const yy = 560 + (i * 61) % 680; const xx = klerp(1000 - (i % 3) * 70, 540, u);
            return T > K.R + 1.2 ? <circle key={i} cx={xx} cy={yy} r={17} fill={COLES} stroke={KC.ink} strokeWidth={4} opacity={1 - kprog(u, 0.85, 1)} /> : <circle key={i} cx={980 - (i % 3) * 70} cy={yy} r={17} fill={COLES} stroke={KC.ink} strokeWidth={4} />; })}
        </>)}
      </Escena>
      {/* 10 · 1973, Tokio: compactina (Penicillium) · Merck: lovastatina (Aspergillus terreus) */}
      <Escena T={T} a={K.S} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.S + 2.6, K.S + 3.1)}>
            <rect x={60} y={620} width={440} height={500} rx={30} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <rect x={580} y={620} width={440} height={500} rx={30} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
            <Pincel x={280} y={1090} s={0.8} crece={kprog(T, K.S + 2.8, K.S + 3.8)} />
            <ColumnaTerreus x={800} y={1090} s={0.85} crece={kprog(T, K.S + 3.6, K.S + 4.8)} />
            <path d="M 500 870 L 580 870" stroke={KC.ink} strokeWidth={10} strokeDasharray="14 10" opacity={kprog(T, K.S + 4.6, K.S + 5.0)} />
          </g>
        </>)}
      </Escena>
      {/* 11–12 · el arroz de levadura roja: monacolina K = lovastatina */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <PlatoArroz T={T} x={420} y={1120} s={1.15} rojo={kprog(T, K.M + 0.3, K.M + 1.8)} />
          {T < K.Ig + 0.3 && <Molecula x={760} y={760} s={1.0 * kprog(T, K.M + 2.4, K.M + 3.0, kEase.rebote)} color={KC.leaf} metilo o={1 - kprog(T, K.Ig - 0.1, K.Ig + 0.3)} />}
          {T > K.Ig - 0.3 && (() => { const j = kprog(T, K.Ig + 0.3, K.Ig + 1.4, kEase.suave); return <g opacity={kprog(T, K.Ig - 0.3, K.Ig + 0.2)}>
            <Molecula x={klerp(300, 540, j)} y={780} s={0.9} color={KC.leaf} metilo />
            <Molecula x={klerp(800, 540, j)} y={780} s={0.9} color={KC.yellow} metilo o={1 - j * 0.45} />
            {j > 0.95 && <circle cx={540} cy={760} r={190 + 40 * kprog(T, K.Ig + 1.4, K.Ig + 1.9)} fill="none" stroke="#fff" strokeWidth={10} opacity={1 - kprog(T, K.Ig + 1.4, K.Ig + 1.9)} />}
          </g>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma pastilla y el mismo plato; el moho sale del arroz hacia la pastilla */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoArroz T={T} x={330} y={980} s={1.0} moho={kprog(T, K.C + 0.3, K.C + 2.0)} />
          <RedHifas T={T} x={760} y={960} g={kprog(T, K.C + 2.6, K.C + 4.5)} seed={7} n={180} escala={0.2} color={VERDEAZUL} ancho={5} />
          <Pastilla x={760} y={960} s={1.25} rot={-8} />
          <Cordon x1={420} y1={900} x2={700} y2={930} p={kprog(T, K.C + 1.5, K.C + 3.0)} onda={22} color={VERDEAZUL} ancho={10} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.4} until={K.H - 0.3} texto="lo inventó un químico" x={330} y={760} tam={44} />
      <Chip T={T} at={K.G + 3.0} until={K.H - 0.2} texto="✓ la hizo un moho" x={330} y={620} tam={44} borde={VERDEAZUL} />
      <Etq T={T} at={K.G + 0.8} until={K.H - 0.3} x={700} y={1070} texto="estatina" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 0.6} until={K.E - 0.3} x={170} y={1060} texto="hígado" tam={32} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.E - 0.3} x={60} y={520} texto="colesterol" tam={32} color={KC.ink} />
      <Chip T={T} at={K.H + 1.6} until={K.E - 0.3} texto="hecho en tu hígado > de la comida" x={540} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.2} until={K.I - 0.3} texto="AL MICROSCOPIO · célula del hígado" x={460} y={480} tam={30} borde={KC.lilac} mono />
      <Etq T={T} at={K.E + 1.2} until={K.I - 0.3} x={60} y={660} texto="30 pasos para armar colesterol" tam={30} />
      <Etq T={T} at={K.E + 2.8} until={K.I - 0.3} x={60} y={1110} texto="HMG-CoA reductasa" tam={30} color={KC.lilac} />
      <Chip T={T} at={K.I + 0.4} until={K.B - 0.3} texto="Akira Endo · Sankyo, Tokio" x={400} y={480} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.I + 0.8} until={K.B - 0.3} x={60} y={1220} texto="silueta esquemática" tam={24} color={KC.ink} />
      <Chip T={T} at={K.I + 2.4} until={K.B - 0.3} texto="¿algún hongo la frena?" x={420} y={600} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.B + 0.2} until={K.A - 0.3} texto="miles de hongos probados" x={400} y={480} tam={36} borde={KC.ink} />
      <NumeroGigante T={T} at={K.B + 0.4} until={K.A - 0.3} valor={3800} dur={1.6} etiqueta="hongos" x={380} y={600} tam={120} color={KC.yellow} />
      <Etq T={T} at={K.B + 2.4} until={K.A - 0.3} x={560} y={790} texto="citrinina" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.B + 3.0} until={K.A - 0.3} x={1000} y={1010} lado="izq" texto="tóxica para el riñón" tam={26} color={KC.texto} />
      <Chip T={T} at={K.A + 0.4} until={AM - 0.2} texto="arroz de una tienda de Kioto" x={420} y={480} tam={34} borde={KC.ink} />
      <Chip T={T} at={AM + 0.1} until={K.P - 0.3} texto="AL MICROSCOPIO · su “pincel”" x={420} y={480} tam={30} borde={VERDEAZUL} mono />
      <Etq T={T} at={AM + 0.4} until={K.P - 0.3} x={60} y={1010} texto="Penicillium citrinum" it tam={36} color={VERDEAZUL2} />
      <Etq T={T} at={AM + 0.8} until={K.P - 0.3} x={60} y={1060} texto="moho azul verdoso" tam={28} />
      <Etq T={T} at={AM + 1.6} until={K.P - 0.3} x={60} y={640} texto="esporas redondas" lado="izq" tam={26} color={VERDEAZUL2} />
      <Etq T={T} at={K.F + 0.3} until={K.R - 0.3} x={60} y={1120} texto="HMG-CoA reductasa" tam={30} color={KC.lilac} />
      <Etq T={T} at={K.F + 0.5} until={K.R - 0.3} x={1040} y={480} texto="HMG-CoA (su pieza)" lado="izq" tam={28} color={COLES} />
      <Etq T={T} at={K.F + 0.6} until={K.R - 0.3} x={60} y={520} texto="compactina (del moho)" tam={28} color={KC.leaf} />
      <Chip T={T} at={K.F + 2.4} until={K.R - 0.3} texto="se parece y le gana el lugar" x={540} y={380} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.R + 0.3} until={K.S - 0.3} x={60} y={480} texto="célula del hígado" tam={30} />
      <Etq T={T} at={K.R + 0.6} until={K.S - 0.3} x={1040} y={720} texto="sangre" lado="izq" tam={30} />
      <Etq T={T} at={K.R + 1.0} until={K.S - 0.3} x={1040} y={1140} lado="izq" texto="receptores LDL" tam={30} color={KC.mint} />
      <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 2.6} anio="1973" quien="Tokio · compactina" revista="Endo, 2010" x={400} y={700} />
      <Chip T={T} at={K.S + 2.8} until={K.M - 0.3} texto="1973 · Tokio · compactina" x={280} y={570} tam={28} borde={VERDEAZUL} />
      <Chip T={T} at={K.S + 3.6} until={K.M - 0.3} texto="Merck · lovastatina" x={800} y={570} tam={28} borde={CANELA} />
      <Etq T={T} at={K.S + 3.0} until={K.M - 0.3} x={90} y={670} texto="Penicillium citrinum" it tam={24} color={VERDEAZUL2} />
      <Etq T={T} at={K.S + 3.8} until={K.M - 0.3} x={990} y={670} texto="Aspergillus terreus" it lado="izq" tam={24} color={CANELA} />
      <Chip T={T} at={K.S + 4.6} until={K.M - 0.3} texto="moléculas primas" x={540} y={450} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.M + 1.2} until={K.Ig - 0.3} x={60} y={900} texto="arroz de levadura roja · moho" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.6} until={K.Ig - 0.3} x={60} y={950} texto="Monascus" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 2.6} until={K.Ig - 0.3} x={1040} y={560} texto="monacolina K" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ig + 0.1} until={K.C - 0.3} x={60} y={560} texto="monacolina K" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ig + 0.1} until={K.C - 0.3} x={1040} y={1000} texto="lovastatina" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ig + 1.4} until={K.C - 0.2} texto="= misma molécula" x={540} y={460} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="la primera estatina nació en un moho" x={540} y={720} tam={34} borde={VERDEAZUL} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="no es consejo médico" x={540} y={800} tam={24} borde={KC.ink} mono />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.H} until={K.E} texto="20 cm · esquemático" largo={120} />
      <BarraEscala T={T} at={K.E} until={K.I} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.I} until={K.B} texto="50 cm" largo={160} />
      <BarraEscala T={T} at={K.B} until={K.A} texto="10 cm" largo={140} />
      <BarraEscala T={T} at={K.A} until={AM} texto="5 mm" largo={160} />
      <BarraEscala T={T} at={AM} until={K.P} texto="10 µm" largo={180} />
      <BarraEscala T={T} at={K.P} until={K.F} texto="5 mm" largo={120} />
      <BarraEscala T={T} at={K.F} until={K.R} texto="1 nm · esquemático" largo={90} />
      <BarraEscala T={T} at={K.R} until={K.S} texto="5 µm · esquemático" largo={120} />
      <BarraEscala T={T} at={K.S} until={K.M} texto="100 µm (A. terreus)" largo={110} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="La primera estatina *la hizo un moho.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.E - 0.1} texto="Tu hígado *fabrica colesterol.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.I - 0.1} texto="Uno marca el ritmo: *HMG-CoA reductasa.*" />
      <Subtitulo T={T} idx={3} at={K.I + 0.1} until={K.B - 0.1} texto="Akira Endo: *¿algún hongo la frena?*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.A - 0.1} texto="Tras 3,800 hongos… *dañaba riñones.*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Un moho azul verdoso *en arroz de Kioto.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.F - 0.1} texto="¿Cómo baja *el colesterol de tu sangre?*" />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.R - 0.1} texto="Le gana el lugar: *tu hígado hace menos.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.S - 0.1} texto="Más receptores *jalan colesterol.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.M - 0.1} texto="1973: compactina. *Luego, lovastatina.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.Ig - 0.1} texto="Arroz de levadura roja: *monacolina K.*" />
      <Subtitulo T={T} idx={11} at={K.Ig + 0.1} until={K.C - 0.1} texto="Monacolina K = *lovastatina.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="La primera estatina *nació en un moho.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [K.E + 0.5, K.I - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.B + 0.4, K.A - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.F + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.4, K.S - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.S + 0.3, K.S + 2.6, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.M + 0.4, K.Ig - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ig + 0.1, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="46" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EstatinasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EstatinasShot /></CompositionStage></div>;
}
window.EstatinasApp = EstatinasApp;
