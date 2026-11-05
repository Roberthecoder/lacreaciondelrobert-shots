// Shot Fungi Mati #136 · Esta medicina para el algodoncillo salió de la tierra y viajó por correo — NARRADO.
// Formato N1 Por dentro + N5 El experimento. Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const NX = { ambar:'#b8621b', ambar2:'#e39a4f', vidrio:'rgba(210,235,245,.55)', carton:'#c8934f', carton2:'#a87434', cinta:'#e9d6a8',
  cultivo:'#e9dcb6', lengua:'#ff8fa3', labio:'#e0485e', boca:'#7a1427', placa:'#fffaf0', ergo:'#F4C25A', coles:'#5aa8ff', nist:'#ff6b5a',
  lip:'#9fb4d8', bata:'#f7f4ee', sil:'#2d2a3e', sil2:'#4a3a2a', tierra:'#6b4426', strep:'#c9f2d0', espora:'#7fe0a0', moneda:'#F4C25A' };

// Frasquito gotero genérico de nistatina (sin marca). Base en (x, y). etiqueta2 = segunda etiqueta del cierre (0..1).
function Frasquito({ T = 0, x, y, s = 1, rot = 0, etiqueta2 = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-95} y={-270} width={190} height={270} rx={40} fill={NX.ambar} stroke={KC.ink} strokeWidth={8} />
    <rect x={-72} y={-250} width={22} height={220} rx={11} fill={NX.ambar2} opacity=".6" />
    <rect x={-40} y={-318} width={80} height={56} rx={10} fill={NX.ambar} stroke={KC.ink} strokeWidth={7} />
    <rect x={-52} y={-360} width={104} height={50} rx={12} fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
    <path d="M -26 -360 Q -30 -430 0 -436 Q 30 -430 26 -360 Z" fill="#ff8a8a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-84} y={-205} width={168} height={130} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-150} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>NISTATINA</text>
    <text x={0} y={-112} textAnchor="middle" style={{ font:`700 19px ${KF.mono}` }} fill="#5a524a">suspensión oral</text>
    {etiqueta2 > 0 && <g opacity={etiqueta2} transform={`translate(0 ${-140}) rotate(-5) scale(${klerp(1.3, 1, etiqueta2)})`}>
      <rect x={-104} y={-74} width={208} height={150} rx={12} fill="#fffbe8" stroke={KC.ink} strokeWidth={6} />
      {['tierra', 'correo', 'Hazen y Brown'].map((t, i) => <text key={i} x={0} y={-30 + i * 44} textAnchor="middle" style={{ font:`700 ${i === 2 ? 21 : 32}px ${KF.mono}` }} fill={i === 2 ? KC.red : KC.ink}>{t}</text>)}
    </g>}
  </g>;
}

// Frasco de vidrio tipo mason con el cultivo (líquido turbio con grumitos blancos). Base en (x, y).
function FrascoMason({ T = 0, x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -80 -200 Q -96 -190 -96 -160 L -96 -20 Q -96 0 -76 0 L 76 0 Q 96 0 96 -20 L 96 -160 Q 96 -190 80 -200 Z" fill={NX.vidrio} stroke={KC.ink} strokeWidth={7} />
    <path d="M -88 -110 L -88 -22 Q -88 -8 -74 -8 L 74 -8 Q 88 -8 88 -22 L 88 -110 Q 0 -98 -88 -110 Z" fill={NX.cultivo} opacity=".95" />
    {[[-40, -60, 14], [10, -40, 18], [45, -75, 12], [-15, -85, 10], [30, -25, 9], [-55, -30, 11]].map(([a, b, r], i) =>
      <circle key={i} cx={a + Math.sin(T * 1.3 + i) * 3} cy={b} r={r} fill="#fffaf0" stroke="rgba(0,0,0,.18)" strokeWidth={2} />)}
    <rect x={-62} y={-185} width={14} height={150} rx={7} fill="#fff" opacity=".45" />
    <rect x={-84} y={-236} width={168} height={40} rx={8} fill="#b9c0c8" stroke={KC.ink} strokeWidth={7} />
    {[-60, -30, 0, 30, 60].map((d) => <line key={d} x1={d} y1={-230} x2={d} y2={-202} stroke="#8a929c" strokeWidth={4} />)}
  </g>;
}

// Caja de correo de cartón con estampilla y matasellos. abre 0..1 levanta las solapas. (x, y) = base al centro.
function CajaCorreo({ x, y, s = 1, rot = 0, abre = 0, children }) {
  const a = abre * 110;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {children}
    <rect x={-150} y={-190} width={300} height={190} rx={10} fill={NX.carton} stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-120} width={300} height={34} fill={NX.cinta} opacity=".8" />
    <g transform="translate(70 -70)"><rect x={-38} y={-46} width={76} height={92} fill="#fff" stroke={KC.ink} strokeWidth={5} strokeDasharray="6 4" />
      <rect x={-28} y={-36} width={56} height={56} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><circle cx={0} cy={-8} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>
    {[0, 1, 2].map((k) => <path key={k} d={`M -10 ${-96 + k * 16} q 18 -10 36 0 t 36 0 t 36 0`} stroke="#333" strokeWidth={3} fill="none" opacity=".6" />)}
    <text x={-80} y={-30} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CORREO</text>
    <g transform={`translate(-150 -190) rotate(${-a})`}><rect x={0} y={-12} width={150} height={14} fill={NX.carton2} stroke={KC.ink} strokeWidth={6} /></g>
    <g transform={`translate(150 -190) rotate(${a})`}><rect x={-150} y={-12} width={150} height={14} fill={NX.carton2} stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}

// Boca abierta esquemática (de frente) con lengua; placas blancas (algodoncillo) que aparecen con 'placas' 0..1.
const PLACAS = [[-120, 40, 34, 20], [-40, 70, 42, 22], [60, 30, 30, 18], [130, 60, 36, 20], [0, 10, 26, 15], [-170, -10, 22, 14], [180, -20, 24, 14], [-80, -50, 20, 12], [100, -60, 22, 12]];
function Boca({ x, y, s = 1, placas = 0, abre = 1 }) {
  const h = 150 + 60 * abre;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={300} ry={h + 40} fill={NX.labio} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={4} rx={262} ry={h} fill={NX.boca} stroke={KC.ink} strokeWidth={6} />
    {[-150, -90, -30, 30, 90, 150].map((d, i) => <rect key={i} x={d - 28} y={-h + 4 + Math.abs(d) * 0.22} width={56} height={58} rx={12} fill="#fffdf6" stroke={KC.ink} strokeWidth={5} />)}
    <path d={`M -220 ${h * 0.25} Q -230 ${h * 0.95} 0 ${h * 0.98} Q 230 ${h * 0.95} 220 ${h * 0.25} Q 0 ${-h * 0.25} -220 ${h * 0.25} Z`} fill={NX.lengua} stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 ${h * 0.12} L 0 ${h * 0.7}`} stroke="#d96a80" strokeWidth={6} strokeLinecap="round" />
    {PLACAS.map(([a, b, rx, ry], i) => { const p = kEase.rebote(kclamp(placas * 1.8 - i * 0.09, 0, 1)); return p > 0 ? <ellipse key={i} cx={a} cy={h * 0.35 + b * 0.7} rx={rx * p} ry={ry * p} fill={NX.placa} stroke="rgba(0,0,0,.25)" strokeWidth={3} transform={`rotate(${(i * 37) % 40 - 20} ${a} ${h * 0.35 + b * 0.7})`} /> : null; })}
  </g>;
}

// Levadura de Candida (óvalo con núcleo); brote 0..1 = yema que sale; largo > 1 = célula alargada (pseudohifa).
function Yeast({ x, y, s = 1, rot = 0, brote = 0, largo = 1, color = '#f3ead2' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={50 * largo} ry={38} fill={color} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-6} cy={0} rx={14} ry={12} fill="#b18cff" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={18 * largo} cy={-8} rx={10} ry={8} fill="rgba(0,210,255,.35)" />
    {brote > 0 && <ellipse cx={50 * largo + 18 * brote} cy={-6} rx={26 * brote} ry={20 * brote} fill={color} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
const LEV = [[300, 760, 0, 1], [470, 820, 30, 1], [380, 960, -20, 1], [620, 900, 60, 2], [230, 1030, 10, 2], [540, 1060, -40, 2], [720, 1060, 15, 3], [160, 850, 80, 3],
  [650, 760, -60, 3], [450, 1130, 45, 4], [820, 950, -10, 4], [300, 1140, 70, 4], [860, 820, 30, 5], [130, 1140, -30, 5]];

// Membrana esquemática: bicapa de lípidos con esteroles (ergosterol dorado o colesterol azul). (x0, y) = centro de la bicapa.
function Membrana({ T, y, esterol = NX.ergo, poro = 0, x0 = 0, w = KW, cabeza = '#9fb4d8' }) {
  const n = Math.floor(w / 36), pc = KW / 2;
  const hueco = (cx) => (poro > 0 && Math.abs(cx - pc) < 70 * poro);
  return <g>
    {Array.from({ length: n }, (_, i) => { const cx = x0 + 18 + i * 36; if (hueco(cx)) return null; const d = Math.sin(T * 2 + i) * 2;
      return <g key={i}>
        <line x1={cx - 5} y1={y - 52 + d} x2={cx - 5} y2={y - 6} stroke="#d8c9a8" strokeWidth={4} /><line x1={cx + 5} y1={y - 52 + d} x2={cx + 5} y2={y - 6} stroke="#d8c9a8" strokeWidth={4} />
        <line x1={cx - 5} y1={y + 52 - d} x2={cx - 5} y2={y + 6} stroke="#d8c9a8" strokeWidth={4} /><line x1={cx + 5} y1={y + 52 - d} x2={cx + 5} y2={y + 6} stroke="#d8c9a8" strokeWidth={4} />
        <circle cx={cx} cy={y - 64 + d} r={15} fill={cabeza} stroke={KC.ink} strokeWidth={3} /><circle cx={cx} cy={y + 64 - d} r={15} fill={cabeza} stroke={KC.ink} strokeWidth={3} />
      </g>; })}
    {Array.from({ length: Math.floor(n / 3) }, (_, i) => { const cx = x0 + 36 + i * 108; if (hueco(cx)) return null;
      return <g key={'e' + i}><rect x={cx - 9} y={y - 46} width={18} height={40} rx={6} fill={esterol} stroke={KC.ink} strokeWidth={3} /><rect x={cx - 9} y={y + 6} width={18} height={40} rx={6} fill={esterol} stroke={KC.ink} strokeWidth={3} /></g>; })}
  </g>;
}
// Molécula de nistatina esquemática: barrita larga con anillo (cadena de polieno).
function Nist({ x, y, rot = 90, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-9} width={120} height={18} rx={9} fill={NX.nist} stroke={KC.ink} strokeWidth={3} />
    {[-40, -20, 0, 20, 40].map((d) => <line key={d} x1={d} y1={-9} x2={d} y2={9} stroke="#ffd0c8" strokeWidth={3} />)}
    <circle cx={66} cy={0} r={11} fill="#ffd0c8" stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Silueta genérica de científica con bata (sin rasgos inventados). (x, y) = pies.
function Cientifica({ x, y, s = 1, color = NX.sil, T = 0, seed = 1 }) {
  const b = Math.sin(T * 2 + seed) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -95 0 L -80 -250 Q -70 -300 0 -305 Q 70 -300 80 -250 L 95 0 Z`} fill={NX.bata} stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -300 L -26 -230 L 0 -160 L 26 -230 Z" fill={color} />
    <line x1={0} y1={-160} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
    <rect x={-58} y={-150} width={34} height={26} rx={4} fill="none" stroke={KC.ink} strokeWidth={4} />
    <rect x={-22} y={-372} width={44} height={60} rx={14} fill={color} />
    <circle cx={0} cy={-395 + b} r={62} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-462 + b} r={26} fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Caja Petri con levadura (césped crema) y un halo transparente alrededor del disco de prueba (halo 0..1).
function PetriHalo({ x, y, r = 170, halo = 0, T = 0 }) {
  return <Petri x={x} y={y} r={r} medio="#f5e7b8">
    {Array.from({ length: 70 }, (_, i) => { const g = krng(i + 9), a = g() * 6.283, rr = Math.sqrt(g()) * (r - 18), cx = Math.cos(a) * rr, cy = Math.sin(a) * rr;
      const d = Math.hypot(cx - 0, cy - 0); if (d < 90 * halo + 20) return null; return <circle key={i} cx={cx} cy={cy} r={8} fill="#fffaf0" stroke="rgba(0,0,0,.2)" strokeWidth={2} />; })}
    {halo > 0 && <circle r={90 * halo + 14} fill="none" stroke={KC.gold} strokeWidth={5} strokeDasharray="10 8" opacity={halo} />}
    <circle r={22} fill="#fff8d0" stroke={KC.ink} strokeWidth={4} />
  </Petri>;
}

// Mapa esquemático del estado de Nueva York: Nueva York (ciudad) abajo a la derecha y Albany arriba, junto al río Hudson.
const NYC = [610, 1130], ALB = [575, 690];
function MapaNY({ T }) {
  const c = 'M 90 760 L 140 700 L 300 690 L 400 610 L 470 560 L 560 520 L 640 520 L 660 600 L 650 700 L 650 960 L 660 1060 L 640 1110 L 600 1100 L 560 1040 L 420 1000 L 260 980 L 120 980 L 90 900 Z';
  return <g>
    <path d={c} fill="#fff3c4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 640 1135 Q 720 1120 820 1100 L 830 1118 Q 720 1146 640 1152 Z" fill="#fff3c4" stroke={KC.ink} strokeWidth={5} />
    <path d="M 610 1130 Q 600 1000 585 900 Q 570 800 578 690" stroke="#4aa3ff" strokeWidth={9} fill="none" strokeLinecap="round" />
    <text x={120} y={850} style={{ font:`700 24px ${KF.mono}` }} fill="#8a7a50">estado de Nueva York</text>
    {[ALB, NYC].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}

// Streptomyces: filamentos muy finos y ramificados con cadenas de esporas. g 0..1 crece.
const STREP = (() => { const g = krng(77), segs = []; const rama = (x, y, a, L, d, t0) => { if (d > 4) return; const x2 = x + Math.cos(a) * L, y2 = y + Math.sin(a) * L; segs.push({ x, y, x2, y2, t0, d });
  const n = d < 2 ? 2 : 1; for (let k = 0; k < n; k++) rama(x + (x2 - x) * (0.5 + k * 0.4), y + (y2 - y) * (0.5 + k * 0.4), a + (g() < 0.5 ? -1 : 1) * (0.5 + g() * 0.5), L * 0.7, d + 1, t0 + 0.18 + g() * 0.1); };
  [[120, 1100, -0.5], [100, 900, -0.1], [160, 1180, -0.9]].forEach(([x, y, a]) => rama(x, y, a, 330, 0, 0)); return segs; })();
function Strep({ T, g = 1, esporas = 0 }) {
  return <g>
    {STREP.map((sg, i) => { const u = kclamp((g - sg.t0) / 0.3, 0, 1); if (u <= 0) return null;
      return <line key={i} x1={sg.x} y1={sg.y} x2={klerp(sg.x, sg.x2, u)} y2={klerp(sg.y, sg.y2, u)} stroke={NX.strep} strokeWidth={9} strokeLinecap="round" />; })}
    {STREP.filter((sg) => sg.d >= 3).map((sg, i) => { const e = kclamp(esporas * 1.5 - i * 0.04, 0, 1); if (e <= 0) return null; const a = Math.atan2(sg.y2 - sg.y, sg.x2 - sg.x);
      return <g key={'s' + i}>{Array.from({ length: 6 }, (_, k) => k / 6 < e ? <circle key={k} cx={sg.x2 + Math.cos(a) * (k + 1) * 20} cy={sg.y2 + Math.sin(a) * (k + 1) * 20 + Math.sin(T * 2 + k) * 1.5} r={9} fill={NX.espora} stroke={KC.ink} strokeWidth={2.5} /> : null)}</g>; })}
  </g>;
}

// Moneda.
function Moneda({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={40} ry={40} fill={NX.moneda} stroke={KC.ink} strokeWidth={5} /><ellipse rx={27} ry={27} fill="none" stroke="#b07a18" strokeWidth={4} />
    <text y={13} textAnchor="middle" style={{ font:`400 36px ${KF.titulo}` }} fill="#8a5a10">$</text>
  </g>;
}

function NistatinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bo: CUES.Boca, Ca: CUES.Candida, Pa: CUES.Parecidas, Er: CUES.Ergosterol, Co: CUES.Colesterol, P: CUES.Pregunta, H: CUES.Hazen,
    Cr: CUES.Correo, Br: CUES.Brown, St: CUES.Streptomyces, R: CUES.Regalias, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.75, kEase.rebote);
  const abre = kprog(T, K.G + 1.4, K.G + 2.0, kEase.sale), sube = kprog(T, K.G + 1.9, K.G + 2.8, kEase.sale);
  // viaje del paquete por correo (ida en Correo, regreso en Brown)
  const ida = kprog(T, K.Cr + 1.0, K.Cr + 3.6, kEase.suave);
  const pk = [klerp(NYC[0], ALB[0], ida) + Math.sin(ida * Math.PI) * -120, klerp(NYC[1], ALB[1], ida)];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el frasquito cae; la caja de correo se abre y sale el frasco con el cultivo */}
      <Escena T={T} a={K.G} b={K.Bo} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={300} cy={1185} rx={150 * cae} ry={18} fill="rgba(0,0,0,.18)" />
          <Frasquito T={T} x={300} y={klerp(500, 1180, cae)} s={1.05} rot={(1 - cae) * -18 + Math.sin(T * 4) * 2 * kprog(T, K.G + 0.8, K.G + 1.4)} />
          <CajaCorreo x={760} y={1180} s={1.0} abre={abre}>
            <FrascoMason T={T} x={0} y={-60 - 230 * sube} s={0.9} rot={Math.sin(T * 3) * 3 * sube} />
          </CajaCorreo>
        </>)}
      </Escena>
      {/* 2 · la boca con algodoncillo */}
      <Escena T={T} a={K.Bo} b={K.Ca} zoom={0.08} origen="40% 50%">
        <FondoLunares color={KC.pink} />
        {fsvg(<Boca x={400} y={930} s={1.0} placas={kprog(T, K.Bo + 0.6, K.Bo + 2.6)} abre={0.9 + 0.1 * Math.sin(T * 2)} />)}
      </Escena>
      {/* 3 · al microscopio: Candida que se multiplica */}
      <Escena T={T} a={K.Ca} b={K.Pa} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {LEV.map(([lx, ly, r, ola], i) => { const t0 = K.Ca + 0.1 + (ola - 1) * 0.5 + (i % 3) * 0.08, p = kprog(T, t0, t0 + 0.4, kEase.rebote); if (p <= 0) return null;
            return <Yeast key={i} x={lx + mece(T, i, 0.3) * 6} y={ly + mece(T, i + 5, 0.3) * 6} s={p * 0.95} rot={r} largo={i % 5 === 3 ? 1.8 : 1} brote={kprog(T, t0 + 0.5, t0 + 1.4)} />; })}
        </>)}
      </Escena>
      {/* 4 · se parecen: levadura y célula humana, las dos con núcleo */}
      <Escena T={T} a={K.Pa} b={K.Er} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {(() => { const p = kprog(T, K.Pa + 0.2, K.Pa + 0.8, kEase.rebote), q = kprog(T, K.Pa + 0.7, K.Pa + 1.3, kEase.rebote); return <>
            <g transform={`translate(280 960) scale(${p})`}>
              <ellipse rx={190} ry={150} fill="#f3ead2" stroke={KC.gold} strokeWidth={16} /><ellipse rx={190} ry={150} fill="none" stroke={KC.ink} strokeWidth={5} />
              <ellipse cx={-30} cy={0} rx={60} ry={52} fill="#b18cff" stroke={KC.ink} strokeWidth={5} /><ellipse cx={80} cy={-40} rx={40} ry={32} fill="rgba(0,210,255,.35)" stroke={KC.ink} strokeWidth={3} />
            </g>
            <g transform={`translate(790 960) scale(${q})`}>
              <path d={`M -170 -40 Q -150 -150 -20 -150 Q 140 -160 170 -30 Q 190 110 40 150 Q -120 170 -170 60 Z`} fill="#ffd2c4" stroke={KC.coles} strokeWidth={10} />
              <path d={`M -170 -40 Q -150 -150 -20 -150 Q 140 -160 170 -30 Q 190 110 40 150 Q -120 170 -170 60 Z`} fill="none" stroke={KC.ink} strokeWidth={5} />
              <ellipse cx={0} cy={0} rx={62} ry={56} fill="#b18cff" stroke={KC.ink} strokeWidth={5} />
            </g>
          </>; })()}
        </>)}
      </Escena>
      {/* 5 · la nistatina se pega al ergosterol y abre un poro (membrana del hongo) */}
      <Escena T={T} a={K.Er} b={K.Co} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {(() => { const llega = kprog(T, K.Er + 0.3, K.Er + 1.8, kEase.sale), poro = kprog(T, K.Er + 1.9, K.Er + 2.6, kEase.sale), sale = kprog(T, K.Er + 2.5, K.Er + 4.2);
            const pc = KW / 2, ym = 1010; return <>
            <rect x={0} y={ym + 80} width={KW} height={260} fill="rgba(243,234,210,.10)" />
            <Membrana T={T} y={ym} esterol={NX.ergo} poro={poro} />
            {[-1, 1].map((sgn) => [0, 1].map((k) => { const fx = pc + sgn * (34 + k * 22), fy = klerp(620 + k * 40, ym, llega); return <Nist key={sgn + '' + k} x={klerp(pc + sgn * (240 + k * 120), fx, llega)} y={fy} rot={klerp(30 * sgn, 90, llega)} s={1.1} />; }))}
            {Array.from({ length: 12 }, (_, i) => { const u = kclamp(sale * 1.6 - i * 0.07, 0, 1); if (u <= 0 || u >= 1) return null;
              return <g key={i} opacity={1 - u * 0.6}><circle cx={pc + Math.sin(i * 2.1) * 24 + u * Math.sin(i) * 160} cy={klerp(ym + 140, 760, u)} r={20} fill={KC.violet} stroke={KC.lilac} strokeWidth={4} />
                <text x={pc + Math.sin(i * 2.1) * 24 + u * Math.sin(i) * 160} y={klerp(ym + 140, 760, u) + 9} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">K⁺</text></g>; })}
          </>; })()}
        </>)}
      </Escena>
      {/* 6 · tu célula: colesterol; se pega menos */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#101a2e' }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <rect x={0} y={1090} width={KW} height={260} fill="rgba(255,210,196,.10)" />
          <Membrana T={T} y={1010} esterol={KC.coles} cabeza="#ffc2b0" />
          {[[260, 0], [460, 1], [700, 2], [880, 3], [580, 4]].map(([nx, k]) => { const u = kprog(T, K.Co + 0.2 + k * 0.15, K.Co + 1.6 + k * 0.15, kEase.suave), pega = k === 1;
            const y = pega ? klerp(620, 930, u) : klerp(620, 900, Math.sin(u * Math.PI * 0.9)) - u * 60; return <Nist key={k} x={nx + (pega ? 0 : u * (k % 2 ? 60 : -60))} y={y} rot={pega ? klerp(40, 90, u) : 40 + u * 200} s={1.1} o={pega ? 1 : 1 - u * 0.4} />; })}
        </>)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Frasquito T={T} x={270} y={1170} s={1.15} rot={Math.sin(T * 4) * 4} /><Interrogacion T={T} x={270} y={690} tam={340} /></>)}
      </Escena>
      {/* 8 · Hazen en Nueva York: muestras de tierra y pruebas contra hongos */}
      <Escena T={T} a={K.H} b={K.Cr} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cientifica x={250} y={1190} s={0.88} T={T} color={NX.sil} seed={1} />
          {[0, 1, 2].map((k) => { const p = kprog(T, K.H + 1.2 + k * 0.4, K.H + 1.6 + k * 0.4, kEase.rebote); return p > 0 ? <g key={k} transform={`translate(${560 + k * 140} 1190) scale(${p})`}>
            <path d="M -55 0 L -45 -110 L 45 -110 L 55 0 Z" fill="#e9d6a8" stroke={KC.ink} strokeWidth={5} /><path d="M -45 -60 L 45 -60 L 50 -2 L -50 -2 Z" fill={NX.tierra} />
            <text y={-78} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>tierra {k + 1}</text></g> : null; })}
          <PetriHalo x={780} y={900} r={125} T={T} halo={kprog(T, K.H + 3.6, K.H + 5.2, kEase.sale)} />
        </>)}
      </Escena>
      {/* 9 · por correo: de Nueva York a Albany */}
      <Escena T={T} a={K.Cr} b={K.Br} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <MapaNY T={T} />
          <path d={`M ${NYC[0]} ${NYC[1]} Q ${NYC[0] - 240} ${(NYC[1] + ALB[1]) / 2} ${ALB[0]} ${ALB[1]}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="16 12" opacity={kprog(T, K.Cr + 0.6, K.Cr + 1.0)} />
          {T > K.Cr + 0.8 && <CajaCorreo x={pk[0]} y={pk[1] + 40} s={0.42} rot={Math.sin(T * 6) * 4 * (ida > 0 && ida < 1 ? 1 : 0)} abre={kprog(T, K.Cr + 3.8, K.Cr + 4.3)}>
            <FrascoMason T={T} x={0} y={-60 - 200 * kprog(T, K.Cr + 4.1, K.Cr + 4.8, kEase.sale)} s={0.9} /></CajaCorreo>}
          <Cientifica x={440} y={680} s={0.45} T={T} color={NX.sil2} seed={2} />
        </>)}
      </Escena>
      {/* 10 · Brown aísla la sustancia y la regresa; halo en la caja Petri */}
      <Escena T={T} a={K.Br} b={K.St} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Cientifica x={210} y={1190} s={0.95} T={T} color={NX.sil2} seed={2} />
          <g transform="translate(470 1190)">
            <path d="M -30 -230 L -30 -140 L -95 -10 Q -100 0 -88 0 L 88 0 Q 100 0 95 -10 L 30 -140 L 30 -230 Z" fill={NX.vidrio} stroke={KC.ink} strokeWidth={7} />
            <path d="M -60 -70 L 60 -70 L 92 -6 L -92 -6 Z" fill="#f2d36b" opacity=".9" />
            {[0, 1, 2].map((k) => { const u = ((T * 0.8 + k * 0.33) % 1); return <circle key={k} cx={-20 + k * 20} cy={-20 - u * 150} r={7 + k * 2} fill="none" stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
          </g>
          {(() => { const v = kprog(T, K.Br + 0.9, K.Br + 2.2, kEase.suave); return <CajaCorreo x={klerp(560, 1250, v)} y={1190 - Math.sin(v * Math.PI) * 120} s={0.45} rot={v * 10} />; })()}
          <PetriHalo x={780} y={870} r={150} T={T} halo={kprog(T, K.Br + 2.0, K.Br + 3.4, kEase.sale)} />
        </>)}
      </Escena>
      {/* 11 · Streptomyces noursei: una bacteria filamentosa del suelo */}
      <Escena T={T} a={K.St} b={K.R} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#0f1a12' }}></div>
        <Ambiente T={T} n={18} color="rgba(201,242,208,.25)" />
        {fsvg(<>
          {[[80, 1250, 40], [300, 1230, 30], [520, 1260, 46], [760, 1240, 34], [950, 1255, 40], [200, 760, 22], [870, 700, 26]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#5b3a22" opacity=".7" />)}
          <g transform="translate(0 110)"><Strep T={T} g={kprog(T, K.St + 0.1, K.St + 2.6)} esporas={kprog(T, K.St + 2.4, K.St + 4.2)} /></g>
        </>)}
      </Escena>
      {/* 12 · nistatina = New York State; las regalías a la ciencia */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {(() => { const p = kprog(T, K.R + 3.0, K.R + 3.5, kEase.rebote); return p > 0 ? <g transform={`translate(330 1180) scale(${p})`}>
            <rect x={-200} y={-200} width={400} height={200} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <rect x={-60} y={-214} width={120} height={20} rx={8} fill={KC.ink} />
            <text x={0} y={-118} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Research Corporation</text>
            <text x={0} y={-66} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">Fondo Brown-Hazen</text></g> : null; })()}
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.R + 3.3 + i * 0.12, u = kprog(T, t0, t0 + 0.6); if (u <= 0 || u >= 1) return null;
            return <Moneda key={i} x={330 + Math.sin(i * 1.7) * 120} y={klerp(700, 990, u * u)} rot={u * 360} s={0.9} />; })}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo frasquito y la misma caja, ya "leídos" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={300} cy={1185} rx={150} ry={18} fill="rgba(0,0,0,.18)" />
          <Frasquito T={T} x={300} y={1180} s={1.05} etiqueta2={kprog(T, K.C + 0.5, K.C + 1.0, kEase.sale)} />
          <CajaCorreo x={760} y={1180} abre={1}><FrascoMason T={T} x={0} y={-290} s={0.9} /></CajaCorreo>
          <g transform="translate(540 650) scale(0.5)" opacity={kprog(T, K.C + 1.4, K.C + 1.9)}><PetriHalo x={0} y={0} r={150} T={T} halo={1} /></g>
        </>)}
      </Escena>

      {/* NY · STATE (letras grandes en Regalías) */}
      {kvisible(T, K.R + 0.2, K.R + 2.9) && (() => { const e = kentrada(T, K.R + 0.2, K.R + 2.9, 'pop'), u = kprog(T, K.R + 1.2, K.R + 1.8, kEase.sale);
        return <div style={{ position:'absolute', left:0, right:0, top:470, zIndex:41, textAlign:'center', opacity:e.o, transform:`scale(${e.s})` }}>
          <div style={{ font:`400 150px/1 ${KF.titulo}`, color:KC.paper, WebkitTextStroke:`5px ${KC.ink}`, textShadow:`6px 6px 0 ${KC.ink}` }}><span style={{ color:KC.yellow }}>NY</span>STATIN</div>
          <div style={{ font:`900 52px ${KF.texto}`, color:KC.ink, marginTop:10, opacity:u }}><span style={{ background:KC.yellow, padding:'0 8px', borderRadius:8 }}>N</span>ew <span style={{ background:KC.yellow, padding:'0 8px', borderRadius:8 }}>Y</span>ork <span style={{ background:KC.yellow, padding:'0 8px', borderRadius:8 }}>Stat</span>e</div>
        </div>; })()}

      {/* textos */}
      <Chip T={T} at={K.G + 2.3} until={K.Bo - 0.3} texto="un microbio de la tierra, por correo" x={540} y={1440} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Bo + 0.8} until={K.Ca - 0.3} x={60} y={490} texto="algodoncillo · candidiasis oral" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Bo + 1.6} until={K.Ca - 0.3} x={60} y={550} texto="Candida" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.1} until={K.Pa - 0.3} texto="AL MICROSCOPIO · LEVADURAS" x={420} y={480} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ca + 0.6} until={K.Pa - 0.3} x={60} y={560} texto="Candida albicans" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ca + 1.4} until={K.Pa - 0.3} x={60} y={612} texto="se multiplica por yemas" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.Pa + 0.6} until={K.Er - 0.3} x={110} y={760} texto="hongo" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Pa + 1.1} until={K.Er - 0.3} x={610} y={770} texto="tu célula" tam={34} color={KC.coles} />
      <Chip T={T} at={K.Pa + 1.8} until={K.Er - 0.3} texto="las dos tienen núcleo" x={540} y={1170} tam={36} borde={KC.lilac} />
      <Chip T={T} at={K.Er + 0.1} until={K.P - 0.3} texto="POR DENTRO · LA MEMBRANA" x={400} y={480} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Er + 0.5} until={K.Co - 0.3} x={60} y={560} texto="nistatina" tam={34} color={NX.nist} />
      <Etq T={T} at={K.Er + 1.0} until={K.Co - 0.3} x={60} y={620} texto="ergosterol (hongo)" tam={34} color={NX.ergo} />
      <Etq T={T} at={K.Er + 2.4} until={K.Co - 0.3} x={60} y={680} texto="poro: se escapa el potasio" tam={28} color={KC.lilac} />
      <Etq T={T} at={K.Er + 0.5} until={K.Co - 0.3} x={60} y={1150} texto="adentro del hongo" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Co + 0.3} until={K.P - 0.3} x={60} y={560} texto="colesterol (tu célula)" tam={34} color={KC.coles} />
      <Chip T={T} at={K.Co + 1.4} until={K.P - 0.3} texto="se pega menos" x={540} y={760} tam={44} borde={KC.coles} />
      <Etq T={T} at={K.H + 0.4} until={K.Cr - 0.3} x={40} y={700} texto="Elizabeth Lee Hazen · microbióloga" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.H + 0.3} until={K.H + 3.4} anio="1948" quien="Depto. de Salud del Estado de NY" revista="Nueva York (ciudad) · 1948–1950" x={660} y={440} />
      <Chip T={T} at={K.H + 3.7} until={K.Cr - 0.3} texto="¿mata hongos? → halo sin levadura" x={600} y={580} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Cr + 0.4} until={K.Br - 0.3} x={640} y={1150} texto="Nueva York" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cr + 0.4} until={K.Br - 0.3} x={600} y={700} texto="Albany" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cr + 1.2} until={K.Br - 0.3} x={60} y={380} texto="Rachel Fuller Brown · química" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Cr + 1.8} until={K.Br - 0.3} valor={240} dur={1.4} prefijo="≈" sufijo=" km" etiqueta="(150 millas)" x={830} y={900} tam={100} color={KC.yellow} />
      <Etq T={T} at={K.Br + 0.3} until={K.St - 0.3} x={60} y={420} texto="Albany: aísla la sustancia" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Br + 1.0} until={K.St - 0.3} x={60} y={480} texto="→ de regreso a Nueva York" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Br + 2.3} until={K.St - 0.3} texto="halo: el hongo no crece" x={760} y={640} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.St + 0.5} until={K.R - 0.3} x={60} y={480} texto="Streptomyces noursei" it tam={40} color={NX.espora} />
      <Chip T={T} at={K.St + 1.4} until={K.R - 0.3} texto="bacteria (actinomiceto), no hongo" x={540} y={1470} tam={34} borde={NX.espora} />
      <Etq T={T} at={K.St + 2.6} until={K.R - 0.3} x={60} y={545} texto="cadenas de esporas" tam={26} color={KC.texto} />
      <Chip T={T} at={K.St + 3.2} until={K.R - 0.3} texto="de la tierra de unos amigos de Hazen (Nourse)" x={540} y={1560} tam={26} borde={KC.gold2} />
      <NumeroGigante T={T} at={K.R + 3.5} until={K.C - 0.3} valor={13.4} dec={1} dur={1.2} prefijo="US$" sufijo=" mill." etiqueta="regalías 1955–1976" x={370} y={580} tam={98} color={KC.yellow} />
      <Chip T={T} at={K.R + 4.8} until={K.C - 0.3} texto="para la investigación" x={760} y={1060} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="tierra + correo + 2 científicas" x={390} y={470} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1480} texto="No es consejo médico. Si tienes síntomas," tam={22} color={KC.ink} />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1515} texto="platícalo con tu médico." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Bo} texto="5 cm" largo={110} y={1530} color={KC.ink} />
      <BarraEscala T={T} at={K.Bo} until={K.Ca} texto="1 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.Ca} until={K.Pa} texto="5 µm" largo={100} />
      <BarraEscala T={T} at={K.Pa} until={K.Er} texto="esquemático · no a escala" largo={0} />
      <BarraEscala T={T} at={K.Er} until={K.P} texto="5 nm (esquemático)" largo={130} y={1440} />
      <BarraEscala T={T} at={K.Cr} until={K.Br} texto="mapa esquemático" largo={0} y={1440} color={KC.ink} />
      <BarraEscala T={T} at={K.St} until={K.R} texto="10 µm" largo={200} y={1640} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1580} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bo - 0.1} texto="Esta medicina salió de *la tierra* y viajó *por correo.*" />
      <Subtitulo T={T} idx={1} at={K.Bo + 0.1} until={K.Ca - 0.1} texto="Algodoncillo: un hongo, *Candida.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Pa - 0.1} texto="Vive en ti… y a veces *crece de más.*" />
      <Subtitulo T={T} idx={3} at={K.Pa + 0.1} until={K.Er - 0.1} texto="Sus células *se parecen* a las tuyas." />
      <Subtitulo T={T} idx={4} at={K.Er + 0.1} until={K.Co - 0.1} texto="Se pega al *ergosterol* y abre *poros.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.P - 0.1} texto="Al *colesterol* se pega menos." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.H - 0.1} texto="¿Y quién *la encontró?*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.Cr - 0.1} texto="1948: *Elizabeth Hazen* busca en la tierra." />
      <Subtitulo T={T} idx={8} at={K.Cr + 0.1} until={K.Br - 0.1} texto="En frascos, por correo, a *Rachel Brown.*" />
      <Subtitulo T={T} idx={9} at={K.Br + 0.1} until={K.St - 0.1} texto="Brown la aislaba y *se la regresaba.*" />
      <Subtitulo T={T} idx={10} at={K.St + 0.1} until={K.R - 0.1} texto="Una bacteria, *no un hongo.*" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.C - 0.1} texto="Sus regalías: *para la ciencia.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tierra, correo y *dos científicas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Bo + 0.6, K.Ca - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pa + 0.3, K.Er - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Er + 2.2, K.Co - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.H + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Cr + 1.0, K.Br - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.St + 1.0, K.R - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.R + 4.4, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="136" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NistatinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NistatinaShot /></CompositionStage></div>;
}
window.NistatinaApp = NistatinaApp;
