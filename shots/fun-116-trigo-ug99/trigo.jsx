// Shot Fungi Mati #116 · Este arbusto no es solo de adorno: ahí se aparea el hongo que puede dejarte sin pan — NARRADO
// (formato N1 · POR DENTRO; gancho 1 «Esto no es X: es Y» sobre el arbusto). Guion y fuentes: guion.md · verificacion.md.
// Roya del tallo del trigo (Puccinia graminis f. sp. tritici), agracejo (Berberis vulgaris) y la raza Ug99. El dibujo es esquemático.

const TG = { tallo:'#d8b04a', tallo2:'#b8902e', hoja:'#7bb33a', espiga:'#e9b949', arista:'#c99a2e', roya:'#b5432a', roya2:'#d9763f', ladrillo:'#c0512b',
  hojaAg:'#4c9a3a', hojaAg2:'#6dbb4f', baya:'#d7262e', tierra:'#7a4a22', pan:'#d9893b', pan2:'#f1c27d', tortilla:'#f3e3bf', telio:'#2b1a12', hialino:'#efe3cf' };

// ---------- piezas del mundo ----------
// Planta de trigo: base del tallo en (x, y). roya 0..1 = rayitas color ladrillo en el tallo.
function Trigo({ T, x, y, h = 520, s = 1, seed = 1, roya = 0, gris = 0 }) {
  const sw = mece(T, seed, 0.32) * 3.5;
  const tallo = mixHex(TG.tallo, '#9a8a6a', gris), esp = mixHex(TG.espiga, '#a89a7a', gris);
  const top = -h;
  return <g transform={`translate(${x} ${y}) rotate(${sw}) scale(${s})`}>
    <path d={`M 0 0 Q 6 ${-h / 2} 0 ${top}`} stroke={KC.ink} strokeWidth={15} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q 6 ${-h / 2} 0 ${top}`} stroke={tallo} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M 2 ${-h * 0.3} Q 60 ${-h * 0.5} 110 ${-h * 0.38}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={`M 2 ${-h * 0.3} Q 60 ${-h * 0.5} 110 ${-h * 0.38}`} stroke={mixHex(TG.hoja, '#8f9a6a', gris)} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M 2 ${-h * 0.55} Q -50 ${-h * 0.72} -96 ${-h * 0.6}`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" />
    <path d={`M 2 ${-h * 0.55} Q -50 ${-h * 0.72} -96 ${-h * 0.6}`} stroke={mixHex(TG.hoja, '#8f9a6a', gris)} strokeWidth={7} fill="none" strokeLinecap="round" />
    {roya > 0 && [0.16, 0.26, 0.4, 0.5, 0.62, 0.7, 0.8].map((v, k) => k < 7 * roya ? <ellipse key={k} cx={(k % 2 ? 3 : -2)} cy={-h * v} rx={4.5} ry={12} fill={TG.roya} stroke={KC.ink} strokeWidth={1.5} /> : null)}
    {Array.from({ length: 8 }, (_, i) => { const yy = top - 6 - i * 15, dx = i % 2 ? 9 : -9, r = i % 2 ? 22 : -22;
      return <g key={i}>
        <line x1={dx} y1={yy} x2={dx + (i % 2 ? 26 : -26)} y2={yy - 46} stroke={mixHex(TG.arista, '#9a8a6a', gris)} strokeWidth={2.5} />
        <ellipse cx={dx} cy={yy} rx={10} ry={14} fill={esp} stroke={KC.ink} strokeWidth={3} transform={`rotate(${r} ${dx} ${yy})`} />
      </g>; })}
  </g>;
}
const CAMPO_ATRAS = Array.from({ length: 14 }, (_, i) => [470 + i * 46, 1080, 440 + (i * 37) % 60, i + 11]);
const CAMPO_FRENTE = Array.from({ length: 12 }, (_, i) => [455 + i * 56, 1175, 500 + (i * 53) % 70, i + 31]);
function Campo({ T, roya = 0, gris = 0 }) {
  return <g>
    <rect x={380} y={1060} width={760} height={200} fill="#c9a24a" opacity=".55" />
    {CAMPO_ATRAS.map(([x, y, h, sd], i) => <Trigo key={'a' + i} T={T} x={x} y={y} h={h} s={0.85} seed={sd} roya={roya} gris={gris} />)}
    {CAMPO_FRENTE.map(([x, y, h, sd], i) => <Trigo key={'f' + i} T={T} x={x} y={y} h={h} seed={sd} roya={roya} gris={gris} />)}
  </g>;
}
// Agracejo (Berberis vulgaris): tallos arqueados, hojas ovaladas en grupos, espinas de tres y racimos colgantes de bayas rojas alargadas.
// Base en (x, y). frutos 0..1.
const AG_TALLOS = [-62, -46, -30, -14, 2, 18, 34, 50, 64];
function Agracejo({ T, x, y, s = 1, seed = 2, frutos = 1, viento = 1 }) {
  const qp = (P0, C, P1, u) => [(1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * C[0] + u * u * P1[0], (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * C[1] + u * u * P1[1]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {AG_TALLOS.map((a0, k) => {
      const a = (a0 + mece(T, seed + k, 0.45) * 3 * viento) * Math.PI / 180, L = 380 + ((k * 47) % 90);
      const P0 = [0, 0], P1 = [Math.sin(a) * L * 1.05, -Math.cos(a) * L * 0.9 + Math.abs(Math.sin(a)) * 120], C = [Math.sin(a) * L * 0.45, -Math.cos(a) * L * 1.05 - 40];
      const d = `M 0 0 Q ${C[0].toFixed(1)} ${C[1].toFixed(1)} ${P1[0].toFixed(1)} ${P1[1].toFixed(1)}`;
      return <g key={k}>
        <path d={d} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinecap="round" />
        <path d={d} stroke="#8a5a2e" strokeWidth={7} fill="none" strokeLinecap="round" />
        {[0.38, 0.58, 0.76, 0.94].map((u, j) => { const [px, py] = qp(P0, C, P1, u); const g = (k * 4 + j) * 37;
          return <g key={j} transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}>
            <path d="M 0 0 L -9 12 M 0 0 L 0 15 M 0 0 L 9 12" stroke={KC.ink} strokeWidth={2.5} />
            {[-50, 10, 70].map((r, q) => <ellipse key={q} cx={0} cy={-20} rx={11} ry={22} fill={(g + q) % 3 ? TG.hojaAg : TG.hojaAg2} stroke={KC.ink} strokeWidth={3} transform={`rotate(${r + (g % 30) - 15})`} />)}
            {frutos > 0 && (k + j) % 3 === 1 && j > 0 && <g opacity={frutos}>
              <path d="M 0 4 Q 4 30 0 64" stroke="#6a3a1a" strokeWidth={3} fill="none" />
              {Array.from({ length: 7 }, (_, b) => <ellipse key={b} cx={(b % 2 ? 7 : -7)} cy={16 + b * 8} rx={5.5} ry={9} fill={TG.baya} stroke={KC.ink} strokeWidth={2} transform={`rotate(${b % 2 ? -20 : 20} ${(b % 2 ? 7 : -7)} ${16 + b * 8})`} />)}
            </g>}
          </g>; })}
      </g>; })}
  </g>;
}
// Pan (bolillo) y tortilla de harina. fantasma 0..1 = se desvanecen ("sin pan").
function PanTortilla({ x, y, s = 1, fantasma = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - fantasma * 0.72} style={{ filter:`grayscale(${fantasma})` }}>
    <ellipse cx={170} cy={14} rx={130} ry={36} fill={TG.tortilla} stroke={KC.ink} strokeWidth={6} strokeDasharray={fantasma > 0.5 ? '16 10' : null} />
    {[[120, 6], [190, 18], [230, 2], [150, 26], [205, -6]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={9} ry={4} fill="#c7924e" opacity=".8" />)}
    <path d="M -120 10 Q -120 -60 0 -62 Q 120 -60 120 10 Q 0 34 -120 10 Z" fill={TG.pan} stroke={KC.ink} strokeWidth={6} strokeDasharray={fantasma > 0.5 ? '16 10' : null} />
    <path d="M -60 -30 Q 0 -52 60 -30" stroke={TG.pan2} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Pústula de roya en el tallo (vertical). p 0..1: mancha clorótica → abultamiento → la epidermis se rompe y sale el polvo ladrillo.
function Pustula({ T, x, y, len = 160, w = 54, p = 0 }) {
  if (p <= 0) return null;
  const mancha = kprog(p, 0, 0.3), bulto = kprog(p, 0.3, 0.55), abre = kprog(p, 0.55, 0.85, kEase.sale);
  const L = len * (0.4 + 0.6 * mancha);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={w * 0.55 + 6} ry={L / 2 + 6} fill="#e3e07a" opacity={0.75 * mancha} />
    {bulto > 0 && <ellipse rx={w / 2} ry={L / 2} fill="#9bd06a" stroke="#4e8a2e" strokeWidth={3} opacity={bulto} />}
    {abre > 0 && <>
      <ellipse rx={w * 0.42 * abre} ry={L / 2 - 4} fill={TG.ladrillo} stroke={KC.ink} strokeWidth={3} />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={((i * 37) % 21 - 10) * abre} cy={((i * 53) % (L - 20)) - L / 2 + 10} r={3.2} fill={TG.roya2} />)}
      <path d={`M ${-w * 0.42 * abre - 2} ${-L / 2 + 4} Q ${-w * 0.42 * abre - 16} 0 ${-w * 0.42 * abre - 2} ${L / 2 - 4}`} stroke="#d9f0b4" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M ${w * 0.42 * abre + 2} ${-L / 2 + 4} Q ${w * 0.42 * abre + 16} 0 ${w * 0.42 * abre + 2} ${L / 2 - 4}`} stroke="#d9f0b4" strokeWidth={7} fill="none" strokeLinecap="round" />
    </>}
  </g>;
}
// Uredospora (al microscopio): elíptica, color ladrillo, pared con espinitas finas (equinulada), sobre su pedicelo.
function Uredospora({ x, y, s = 1, rot = 0, pedicelo = true, o = 1 }) {
  const rx = 70, ry = 46;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {pedicelo && <path d={`M 0 ${rx - 4} Q 4 ${rx + 40} 0 ${rx + 100}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" />}
    {pedicelo && <path d={`M 0 ${rx - 4} Q 4 ${rx + 40} 0 ${rx + 100}`} stroke={TG.hialino} strokeWidth={6} fill="none" strokeLinecap="round" />}
    {Array.from({ length: 34 }, (_, i) => { const a = (i / 34) * Math.PI * 2; const c = Math.cos(a), sn = Math.sin(a);
      return <line key={i} x1={c * ry} y1={sn * rx} x2={c * (ry + 7)} y2={sn * (rx + 7)} stroke="#f0b48a" strokeWidth={2.5} strokeLinecap="round" />; })}
    <ellipse rx={ry} ry={rx} fill={TG.ladrillo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-14} cy={-22} rx={11} ry={24} fill="#e89a6a" opacity=".55" transform="rotate(12 -14 -22)" />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * (ry - 10) * ((i % 5) / 5 + 0.15)} cy={Math.sin(i * 2.4) * (rx - 14) * ((i % 5) / 5 + 0.15)} r={2.6} fill="#7a2a12" opacity=".7" />)}
  </g>;
}
// Teliospora: dos células, oscura, pared gruesa y ápice redondeado, con pedicelo.
function Teliospora({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 30 L 0 70" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><path d="M 0 30 L 0 70" stroke={TG.hialino} strokeWidth={5} strokeLinecap="round" />
    <path d="M -15 30 Q -20 0 -16 -8 Q -22 -36 0 -46 Q 22 -36 16 -8 Q 20 0 15 30 Q 0 36 -15 30 Z" fill={TG.telio} stroke={KC.ink} strokeWidth={4} />
    <line x1={-17} y1={-6} x2={17} y2={-6} stroke="#8a5a3a" strokeWidth={3} />
    <ellipse cx={-6} cy={-28} rx={4} ry={8} fill="#6a4a3a" />
  </g>;
}
// Hoja de agracejo (mini), para la rueda del ciclo.
function HojaAg({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 40 L 0 20" stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 20 Q -30 0 -18 -30 Q 0 -50 18 -30 Q 30 0 0 20 Z" fill={TG.hojaAg2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Dibujito de cada tipo de espora (rueda del ciclo).
function IconoEspora({ tipo }) {
  if (tipo === 0) return <Uredospora x={0} y={0} s={0.42} pedicelo={false} />;
  if (tipo === 1) return <Teliospora x={0} y={-6} s={0.95} />;
  if (tipo === 2) return <g>{[[-18, 6], [6, -14], [16, 14]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={9} ry={13} fill={TG.hialino} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 40 - 30} ${a} ${b})`} />)}</g>;
  if (tipo === 3) return <g><HojaAg x={0} y={0} s={0.85} /><path d="M -12 -10 Q 0 -22 12 -10" stroke="#ff9b2a" strokeWidth={5} fill="none" />{[[-6, -24], [4, -28], [12, -22]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3.5} fill="#ff9b2a" stroke={KC.ink} strokeWidth={1.5} />)}</g>;
  return <g><HojaAg x={0} y={0} s={0.85} rot={180} /><path d="M -14 14 Q -14 34 0 34 Q 14 34 14 14 Z" fill="#ffc23a" stroke={KC.ink} strokeWidth={3} />{[[-6, 20], [4, 22], [0, 28]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill="#ff9b2a" stroke={KC.ink} strokeWidth={1.2} />)}</g>;
}
// Arbusto chiquito para la campaña de 1918 (con raíces cuando lo arrancan).
function MiniArbusto({ x, y, s = 1, arranca = 0 }) {
  const up = kEase.sale(arranca);
  return <g transform={`translate(${x + up * 60} ${y - up * 260}) rotate(${up * 70}) scale(${s})`} opacity={1 - kprog(arranca, 0.6, 1)}>
    {arranca > 0 && <path d="M 0 0 L -14 30 M 0 0 L 4 38 M 0 0 L 16 26 M -6 18 L -22 34" stroke="#6a3a1a" strokeWidth={4} fill="none" strokeLinecap="round" />}
    {[-40, -15, 10, 35].map((a, k) => <path key={k} d={`M 0 0 Q ${a * 0.8} -50 ${a * 1.6} -70`} stroke="#8a5a2e" strokeWidth={6} fill="none" />)}
    {[[-55, -70], [-22, -88], [10, -92], [45, -78], [-35, -50], [28, -55]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={22} ry={16} fill={i % 2 ? TG.hojaAg : TG.hojaAg2} stroke={KC.ink} strokeWidth={4} />)}
    {[[-30, -62], [20, -70], [40, -60]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={5} ry={8} fill={TG.baya} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Mapa esquemático de África (lon/lat aproximados). k = px por grado.
const AFRICA = [[-17, 21], [-16, 12], [-12, 7.5], [-8, 4.5], [-3, 5], [2, 6], [6, 4.3], [9, 4], [10, 2], [9, -1], [12, -5], [13, -9], [12, -14], [12, -18], [15, -27], [18, -33], [20, -35], [25, -34], [28, -33], [33, -27], [35, -24], [35, -20], [40, -16], [40, -10], [39, -6], [41, -2], [45, 2], [51, 11], [44, 11], [43, 12.5], [39, 18], [37, 22], [35, 28], [32, 31], [25, 32], [20, 31], [15, 32], [11, 37], [3, 37], [-2, 35], [-6, 36], [-9, 32], [-10, 29], [-13, 27]];
function MapaAfrica({ x, y, k = 5.2, children }) {
  const P = (lon, lat) => [(lon + 18) * k, (38 - lat) * k];
  const d = 'M ' + AFRICA.map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {children && children(P)}
  </g>;
}
// Parcela de trigo vista de frente (campo de pruebas), con su letrero.
function Parcela({ T, x, y, roya = 0, letrero = 'Sr31', seed = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-95} y={-20} width={190} height={40} rx={6} fill="#8a5a2e" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, i) => <Trigo key={i} T={T} x={-75 + i * 30} y={0} h={170} s={0.5} seed={seed * 7 + i} roya={roya} gris={roya * 0.35} />)}
    {roya > 0 && Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-80 + ((i * 41) % 160)} cy={-30 - ((i * 29) % 80) - roya * 20} r={4} fill={TG.roya2} opacity={roya * 0.8} />)}
    <rect x={-48} y={36} width={96} height={46} rx={6} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={70} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{letrero}</text>
  </g>;
}
// Globo terráqueo esquemático con trigales.
function Globo({ T, x, y, r = 230 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#5fb7ff" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.75} ${-r * 0.35} Q ${-r * 0.4} ${-r * 0.75} ${-r * 0.05} ${-r * 0.5} Q ${-r * 0.2} ${-r * 0.15} ${-r * 0.5} ${-r * 0.05} Q ${-r * 0.8} ${-r * 0.05} ${-r * 0.75} ${-r * 0.35} Z`} fill="#8fd16a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r * 0.1} ${-r * 0.7} Q ${r * 0.6} ${-r * 0.8} ${r * 0.8} ${-r * 0.3} Q ${r * 0.6} ${r * 0.1} ${r * 0.25} ${-r * 0.05} Q ${r * 0.05} ${-r * 0.35} ${r * 0.1} ${-r * 0.7} Z`} fill="#8fd16a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-r * 0.35} ${r * 0.2} Q ${-r * 0.05} ${r * 0.15} ${-r * 0.05} ${r * 0.5} Q ${-r * 0.2} ${r * 0.85} ${-r * 0.35} ${r * 0.6} Q ${-r * 0.5} ${r * 0.4} ${-r * 0.35} ${r * 0.2} Z`} fill="#8fd16a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${r * 0.3} ${r * 0.25} Q ${r * 0.7} ${r * 0.2} ${r * 0.6} ${r * 0.55} Q ${r * 0.4} ${r * 0.7} ${r * 0.3} ${r * 0.25} Z`} fill="#8fd16a" stroke={KC.ink} strokeWidth={5} />
    {[[-0.55, -0.3], [-0.3, -0.45], [0.35, -0.55], [0.55, -0.35], [-0.2, 0.45], [0.45, 0.4]].map(([a, b], i) => <Trigo key={i} T={T} x={a * r} y={b * r + 20} h={70} s={0.6} seed={i + 50} />)}
    <ellipse cx={-r * 0.4} cy={-r * 0.55} rx={r * 0.25} ry={r * 0.1} fill="#fff" opacity=".3" transform={`rotate(-30 ${-r * 0.4} ${-r * 0.55})`} />
  </g>;
}
// Escudo del gen de resistencia; grieta 0..1.
function Escudo({ x, y, s = 1, grieta = 0, texto = 'Sr31' }) {
  const sep = kEase.sale(kprog(grieta, 0.5, 1)) * 26;
  const forma = 'M 0 -130 L 110 -90 Q 110 60 0 130 Q -110 60 -110 -90 Z';
  const mitad = (lado) => <g transform={`translate(${lado * sep} ${sep * 0.4}) rotate(${lado * sep * 0.3})`}>
    <clipPath id={`esc${lado}`}><path d={lado < 0 ? 'M -200 -200 L 8 -200 L -14 -40 L 16 30 L -6 200 L -200 200 Z' : 'M 200 -200 L 8 -200 L -14 -40 L 16 30 L -6 200 L 200 200 Z'} /></clipPath>
    <g clipPath={`url(#esc${lado})`}>
      <path d={forma} fill={KC.gold2} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      <path d="M 0 -104 L 84 -74 Q 84 44 0 102 Q -84 44 -84 -74 Z" fill="none" stroke="#fff3c2" strokeWidth={5} opacity=".7" />
      <text x={0} y={24} textAnchor="middle" style={{ font:`900 66px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    </g>
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {mitad(-1)}{mitad(1)}
    {grieta > 0 && grieta < 0.6 && <path d="M 8 -130 L -14 -40 L 16 30 L -6 130" stroke={KC.ink} strokeWidth={7} fill="none" strokeDasharray={`${grieta / 0.5 * 300} 400`} />}
  </g>;
}
// Campana de alarma que suena.
function Campana({ T, x, y, at, s = 1 }) {
  const on = T >= at, rot = on ? Math.sin((T - at) * 28) * 18 * Math.exp(-(T - at) * 0.9) : 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${rot} 0 -70)`}>
      <path d="M -70 30 Q -70 -60 0 -70 Q 70 -60 70 30 L 86 52 L -86 52 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <circle cx={0} cy={-78} r={12} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
      <circle cx={rot * 0.8} cy={66} r={16} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    </g>
    {on && [0, 1, 2].map((k) => { const u = ((T - at) * 1.6 + k / 3) % 1; return <g key={k} opacity={1 - u}>
      <path d={`M ${-100 - u * 60} ${-40} Q ${-130 - u * 60} 0 ${-100 - u * 60} 40`} stroke={KC.red} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M ${100 + u * 60} ${-40} Q ${130 + u * 60} 0 ${100 + u * 60} 40`} stroke={KC.red} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>; })}
  </g>;
}
// Célula del hongo (dicariótica, al microscopio) con sus dos núcleos.
function Celula({ x, y, w = 330, h = 160, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="rgba(255,231,200,.12)" stroke="#f3c79a" strokeWidth={8} />
    {children}
  </g>;
}
function Nucleo({ x, y, color, r = 34 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} style={{ filter:`drop-shadow(0 0 10px ${color})` }} /><circle cx={-8} cy={-10} r={8} fill="#fff" opacity=".45" /></g>;
}
// Anemómetro de cazoletas (vigilar el viento).
function Anemometro({ T, x, y, h = 420 }) {
  const a = T * 6;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-7} y={-h} width={14} height={h} fill="#8a8f99" stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2].map((k) => { const an = a + k * 2.094, cx = Math.cos(an) * 70, sc = Math.sin(an); return <g key={k}>
      <line x1={0} y1={-h} x2={cx} y2={-h + sc * 10} stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={cx} cy={-h + sc * 10} rx={20 * Math.abs(Math.cos(an)) + 8} ry={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    </g>; })}
    <circle cx={0} cy={-h} r={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Lupa simple (círculo con mango).
function LupaSimple({ x, y, r = 80 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="rgba(255,255,255,.3)" stroke={KC.ink} strokeWidth={12} />
    <line x1={r * 0.7} y1={r * 0.7} x2={r * 1.6} y2={r * 1.6} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
  </g>;
}
// Rótulo con fondo de papel (se lee sobre el trigal): nombre común + científico en cursiva. der = alineado a la derecha en x.
function Rotulo({ T, at, until, x, y, texto, sub, der = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translate(${der ? '-100%' : '0'}, ${e.y * 0.3 - 50}%)`, textAlign: der ? 'right' : 'left',
    background:'rgba(255,251,236,.93)', border:`4px solid ${KC.ink}`, borderRadius:16, padding:'8px 18px', boxShadow:'6px 6px 0 rgba(0,0,0,.35)' }}>
    <div style={{ font:`900 36px/1.1 ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>{texto}</div>
    {sub && <div style={{ font:`italic 700 27px/1.25 ${KF.mono}`, color:'#4a3f36', whiteSpace:'nowrap' }}>{sub}</div>}
  </div>;
}
// Texto grande con contorno (para "Ug99").
function TextoGrande({ T, at, until, texto, x, y, tam = 170, color = KC.red }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, font:`400 ${tam}px/0.95 ${KF.titulo}`, color,
    WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>;
}

// ---------- posiciones fijas ----------
const CICLO_C = [540, 860], CICLO_R = 240;
const CICLO = [
  { n:'uredosporas', d:'en el trigo · ladrillo', ang:-90, lab:[-1, 0] },
  { n:'teliosporas', d:'negras, de 2 células', d2:'pasan el invierno', ang:-18, lab:[0, 1] },
  { n:'basidiosporas', d:'infectan el agracejo', ang:54, lab:[1, 0] },
  { n:'picniosporas', d:'hoja: cara de arriba', ang:126, lab:[-1, 0] },
  { n:'ecidiosporas', d:'cara de abajo, en tacitas', d2:'→ vuelven al trigo', ang:198, lab:[0, 1] },
];
const cicloXY = (ang) => [CICLO_C[0] + Math.cos(ang * Math.PI / 180) * CICLO_R, CICLO_C[1] + Math.sin(ang * Math.PI / 180) * CICLO_R];
const ARB2 = Array.from({ length: 12 }, (_, i) => [130 + (i % 6) * 165, i < 6 ? 800 : 915]);
const PARCELAS = [[180, 990], [420, 990], [660, 990], [900, 990]];

function TrigoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Agracejo, Pu: CUES.Pustula, E: CUES.Esporas, Ci: CUES.Ciclo, Ca: CUES.Campana, P: CUES.Pregunta, U: CUES.Uganda, S: CUES.Sr31, B: CUES.Borlaug, N: CUES.Nucleo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const PUST = [[430, 520, 190, 0.2], [500, 700, 150, 0.7], [410, 880, 230, 1.1], [510, 1060, 170, 1.5], [450, 400, 120, 1.9]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho y nombres: el agracejo junto al trigal; tu pan y tu tortilla se desvanecen */}
      <Escena T={T} a={K.G} b={K.Pu} zoom={0.18} origen="78% 52%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Campo T={T} roya={kprog(T, K.A + 0.6, K.A + 2.6)} />
          <g transform={`translate(0 ${(1 - kprog(T, K.G, K.G + 0.6, kEase.sale)) * 30})`}><Agracejo T={T} x={260} y={1170} s={0.78} viento={1 + kprog(T, K.G, K.G + 0.8) * 1.5} /></g>
          <rect x={0} y={1160} width={KW} height={760} fill="#c9a24a" />
          <line x1={0} y1={1160} x2={KW} y2={1160} stroke={KC.ink} strokeWidth={6} />
          {T < K.A + 0.4 && <g opacity={kprog(T, K.G + 0.2, K.G + 0.6) * (1 - kprog(T, K.A, K.A + 0.4))}>
            <PanTortilla x={600} y={1138} s={0.9 * klerp(0.6, 1, kprog(T, K.G + 0.2, K.G + 0.7, kEase.rebote))} fantasma={kprog(T, K.G + 3.4, K.G + 4.4)} />
          </g>}
        </>)}
      </Escena>
      {/* 2 · la pústula revienta la piel del tallo */}
      <Escena T={T} a={K.Pu} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={330} y={250} width={240} height={1100} rx={20} fill="#8cc75a" stroke={KC.ink} strokeWidth={8} />
          {[365, 410, 455, 500, 540].map((xx, i) => <line key={i} x1={xx} y1={262} x2={xx} y2={1340} stroke="#6fae44" strokeWidth={5} />)}
          <rect x={322} y={760} width={256} height={46} rx={14} fill="#a8d873" stroke={KC.ink} strokeWidth={6} />
          {PUST.map(([px, py, len, d], i) => <Pustula key={i} T={T} x={px} y={py} len={len} w={58} p={kprog(T, K.Pu + d * 0.55, K.Pu + d * 0.55 + 1.3)} />)}
          {PUST.map(([px, py, len, d], i) => { const t0 = K.Pu + d * 0.55 + 1.1; if (T < t0) return null; return Array.from({ length: 7 }, (_, k) => { const u = kprog(T, t0 + k * 0.08, t0 + k * 0.08 + 1.6);
            if (u <= 0 || u >= 1) return null; const ang = (k / 7) * Math.PI - Math.PI / 2 + (i % 2 ? 0.3 : -0.3);
            return <circle key={i + '-' + k} cx={px + Math.cos(ang) * u * 220 + u * 60} cy={py - u * 120 + Math.sin(ang) * u * 80} r={6 * (1 - u) + 2} fill={TG.roya2} opacity={1 - u} />; }); })}
        </>)}
      </Escena>
      {/* 3 · al microscopio: uredosporas con espinitas que se lleva el viento */}
      <Escena T={T} a={K.E} b={K.Ci} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <path d="M 0 1130 Q 200 1080 360 1120 L 400 1060 L 440 1120 Q 700 1080 1080 1130 L 1080 1300 L 0 1300 Z" fill="#3c6b2a" stroke="#d9f0b4" strokeWidth={6} />
          {[[200, 960, -8], [360, 925, 5], [520, 970, -3], [680, 930, 7], [840, 965, -6], [280, 790, 4], [600, 785, -6], [440, 760, 6]].map(([x0, y0, r], i) => {
            const vuela = kprog(T, K.E + 1.9 + i * 0.15, K.E + 3.9 + i * 0.15, kEase.suave);
            const xx = x0 + vuela * (700 + i * 40), yy = y0 - vuela * (420 + (i % 3) * 120);
            return <Uredospora key={i} x={xx} y={yy} s={0.9} rot={r + vuela * 90} pedicelo={vuela < 0.05} o={1 - kprog(vuela, 0.8, 1)} />; })}
          {T > K.E + 1.9 && [0, 1, 2, 3].map((k) => { const u = ((T - K.E - 1.9) * 0.9 + k * 0.25) % 1; return <path key={k} d={`M ${-100 + u * 1300} ${560 + k * 120} q 90 -30 180 0 t 180 0`} stroke="rgba(180,220,255,.55)" strokeWidth={6} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI)} />; })}
        </>)}
      </Escena>
      {/* 4 · el ciclo: cinco tipos de esporas, dos hospederos */}
      <Escena T={T} a={K.Ci} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <circle cx={CICLO_C[0]} cy={CICLO_C[1]} r={CICLO_R} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray={`${kprog(T, K.Ci + 0.1, K.Ci + 2.6) * 1666} 2000`} transform={`rotate(-90 ${CICLO_C[0]} ${CICLO_C[1]})`} />
          {CICLO.map((c, i) => { const [cx, cy] = cicloXY(c.ang + 36); const on = kprog(T, K.Ci + 0.5 + i * 0.45, K.Ci + 0.8 + i * 0.45);
            return on > 0 ? <path key={'f' + i} d="M -18 -14 L 8 0 L -18 14" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${cx} ${cy}) rotate(${c.ang + 36 + 90})`} opacity={on} /> : null; })}
          {CICLO.map((c, i) => { const [cx, cy] = cicloXY(c.ang); const on = kprog(T, K.Ci + 0.3 + i * 0.45, K.Ci + 0.75 + i * 0.45, kEase.rebote);
            return on > 0 ? <g key={i} transform={`translate(${cx} ${cy}) scale(${on})`}>
              <circle r={64} fill={i < 2 ? '#fff3c2' : '#d8f5c8'} stroke={KC.ink} strokeWidth={7} />
              <IconoEspora tipo={i} />
              <circle cx={-46} cy={-46} r={20} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
              <text x={-46} y={-36} textAnchor="middle" style={{ font:`400 28px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
            </g> : null; })}
          {/* en el centro: el cruce en el agracejo y las razas nuevas */}
          {(() => { const u = kprog(T, K.Ci + 2.7, K.Ci + 3.3, kEase.suave), r3 = kprog(T, K.Ci + 3.3, K.Ci + 3.8, kEase.rebote); return <g>
            <HojaAg x={540} y={830} s={1.3} />
            <circle cx={klerp(470, 528, u)} cy={760} r={18} fill={KC.pink} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Ci + 2.5, K.Ci + 2.7)} />
            <circle cx={klerp(610, 552, u)} cy={760} r={18} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Ci + 2.5, K.Ci + 2.7)} />
            {r3 > 0 && [[512, 935, KC.pink], [540, 945, '#9a7bff'], [568, 935, KC.cyan]].map(([a, b, c], i) => <g key={i} transform={`translate(${a} ${b}) scale(${r3 * 0.2})`}><ellipse rx={46} ry={70} fill={c} stroke={KC.ink} strokeWidth={9} transform="rotate(90)" /></g>)}
          </g>; })()}
        </>)}
        {CICLO.map((c, i) => { const [cx, cy] = cicloXY(c.ang); const on = kprog(T, K.Ci + 0.45 + i * 0.45, K.Ci + 0.8 + i * 0.45);
          const left = c.lab[0] < 0 ? cx - 80 : c.lab[0] > 0 ? cx + 80 : cx, top = c.lab[1] > 0 ? cy + 76 : c.lab[1] < 0 ? cy - 76 : cy;
          const tx = c.lab[0] < 0 ? '-100%' : c.lab[0] > 0 ? '0%' : '-50%', ty = c.lab[1] > 0 ? '0%' : c.lab[1] < 0 ? '-100%' : '-50%';
          return on > 0 ? <div key={i} style={{ position:'absolute', left, top, zIndex:30, transform:`translate(${tx}, ${ty})`, opacity:on, textAlign: c.lab[0] < 0 ? 'right' : c.lab[0] > 0 ? 'left' : 'center',
            background:'rgba(255,255,255,.88)', border:`4px solid ${KC.ink}`, borderRadius:16, padding:'6px 14px' }}>
            <div style={{ font:`900 30px/1.1 ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>{c.n}</div>
            <div style={{ font:`700 21px/1.25 ${KF.mono}`, color:'#4a3f36', whiteSpace:'nowrap' }}>{c.d}</div>
            {c.d2 && <div style={{ font:`700 21px/1.25 ${KF.mono}`, color:'#4a3f36', whiteSpace:'nowrap' }}>{c.d2}</div>}
          </div> : null; })}
      </Escena>
      {/* 5 · la campaña: desde 1918, más de 500 millones de agracejos destruidos en EE. UU. */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={0} y={930} width={KW} height={30} fill={TG.tierra} opacity=".35" />
          {ARB2.map(([x, y], i) => { const a0 = K.Ca + 1.2 + i * 0.16; return <g key={i}>
            <ellipse cx={x} cy={y + 4} rx={60} ry={14} fill={TG.tierra} stroke={KC.ink} strokeWidth={4} />
            <MiniArbusto x={x} y={y} s={0.95} arranca={kprog(T, a0, a0 + 1.0)} />
            {T > a0 && T < a0 + 0.6 && [0, 1, 2, 3, 4].map((k) => { const u = kprog(T, a0, a0 + 0.6); return <circle key={k} cx={x + (k - 2) * 18 * (1 + u * 2)} cy={y - u * 40 * (k % 2 + 1)} r={7 * (1 - u) + 2} fill="#8a5a2e" />; })}
          </g>; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si el hongo ya no necesitara al arbusto? */}
      <Escena T={T} a={K.P} b={K.U} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Agracejo T={T} x={250} y={1200} s={0.62} seed={9} />
          <rect x={0} y={1195} width={KW} height={760} fill="#c9a24a" /><line x1={0} y1={1195} x2={KW} y2={1195} stroke={KC.ink} strokeWidth={6} />
          <Interrogacion T={T} x={250} y={640} tam={340} />
          {Array.from({ length: 6 }, (_, k) => { const u = ((T - K.P) * 0.45 + k / 6) % 1; return <Uredospora key={k} x={-80 + u * 1250} y={420 + (k % 3) * 40 + Math.sin(u * 8 + k) * 20} s={0.32} rot={u * 300} pedicelo={false} />; })}
        </>)}
      </Escena>
      {/* 7 · Uganda, febrero de 1999: trigos con Sr31 se llenan de roya */}
      <Escena T={T} a={K.U} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaAfrica x={40} y={420} k={5.2}>{(P) => { const [ux, uy] = P(29.9, -1.3); const pul = kprog(T, K.U + 0.4, K.U + 0.9, kEase.rebote);
            return <g><circle cx={ux} cy={uy} r={34 * pul + Math.sin(T * 6) * 3 * pul} fill="none" stroke={KC.red} strokeWidth={6} /><circle cx={ux} cy={uy} r={12 * pul} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>; }}</MapaAfrica>
          {PARCELAS.map(([x, y], i) => <Parcela key={i} T={T} x={x} y={y} seed={i + 1} roya={kprog(T, K.U + 2.2 + i * 0.3, K.U + 3.2 + i * 0.3)} />)}
        </>)}
      </Escena>
      {/* 8 · Sr31 protegía trigo en gran parte del mundo; la raza nueva: Ug99 */}
      <Escena T={T} a={K.S} b={K.B} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Globo T={T} x={540} y={900} r={240} />
          <Escudo x={540} y={890} s={1.05 * klerp(0.4, 1, kprog(T, K.S + 0.2, K.S + 0.7, kEase.rebote))} grieta={kprog(T, K.S + 2.0, K.S + 3.0)} />
          {T > K.S + 2.6 && Array.from({ length: 10 }, (_, k) => { const u = kprog(T, K.S + 2.6 + k * 0.05, K.S + 4.0 + k * 0.05); return <circle key={k} cx={540 + Math.cos(k * 0.63) * (120 + u * 260)} cy={890 + Math.sin(k * 0.63) * (120 + u * 200)} r={8 * (1 - u) + 2} fill={TG.roya2} opacity={1 - u} />; })}
        </>)}
      </Escena>
      {/* 9 · Borlaug: en México creó con su equipo trigos resistentes a la roya; en 2005 dio la alarma */}
      <Escena T={T} a={K.B} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MapaMexico x={60} y={420} ancho={520} conCA={false}>
            {(() => { const [cx, cy] = mxProy(-98.85, 19.53); const on = kprog(T, K.B + 0.5, K.B + 0.9, kEase.rebote); return <g>
              {[[-110, 28.5], [-104, 26], [-101, 21], [-106, 31]].map(([lo, la], i) => { const [a, b] = mxProy(lo, la); const c = kprog(T, K.B + 1.0 + i * 0.2, K.B + 1.6 + i * 0.2, kEase.sale); return c > 0 ? <Trigo key={i} T={T} x={a} y={b} h={150 * c} s={0.9} seed={i + 70} /> : null; })}
              <circle cx={cx} cy={cy} r={16 * on} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
            </g>; })()}
          </MapaMexico>
          <Campana T={T} x={900} y={850} at={K.B + 2.3} s={0.9} />
        </>)}
      </Escena>
      {/* 10 · por dentro: Ug99 habría nacido cuando dos hongos se intercambiaron un núcleo */}
      <Escena T={T} a={K.N} b={K.C} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {(() => { const puente = kprog(T, K.N + 2.4, K.N + 3.0), viaja = kprog(T, K.N + 3.0, K.N + 4.4, kEase.suave), ug = kprog(T, K.N + 4.4, K.N + 4.9);
            return <g>
              <Celula x={290} y={900} w={360} h={170}>
                <Nucleo x={-75} y={0} color="#4d8bff" />
                <Nucleo x={klerp(75, 520, viaja)} y={Math.sin(viaja * Math.PI) * -26} color="#7fd4ff" />
              </Celula>
              <Celula x={790} y={900} w={360} h={170}>
                <Nucleo x={75} y={0} color="#ff9b2a" />
                <Nucleo x={klerp(-75, -520, viaja)} y={Math.sin(viaja * Math.PI) * 26} color={KC.gold2} />
              </Celula>
              {puente > 0 && <rect x={470} y={900 - 38 * puente} width={140} height={76 * puente} fill="rgba(255,231,200,.12)" stroke="#f3c79a" strokeWidth={6} />}
              {ug > 0 && <rect x={100} y={805} width={380} height={190} rx={95} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={ug} style={{ filter:`drop-shadow(0 0 14px ${KC.gold2})` }} />}
            </g>; })()}
        </>)}
      </Escena>
      {/* 11 · cierre: el mismo agracejo y el mismo trigal, ahora vigilados; tu pan y tu tortilla de vuelta */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Campo T={T} />
          <Anemometro T={T} x={560} y={1090} h={420 * kprog(T, K.C + 0.4, K.C + 1.1, kEase.sale)} />
          <Agracejo T={T} x={260} y={1170} s={0.78} />
          <rect x={0} y={1160} width={KW} height={760} fill="#c9a24a" />
          <line x1={0} y1={1160} x2={KW} y2={1160} stroke={KC.ink} strokeWidth={6} />
          <g opacity={kprog(T, K.C + 1.3, K.C + 1.7)} transform={`translate(${klerp(1150, 900, kprog(T, K.C + 1.3, K.C + 2.0, kEase.sale))} 760)`}><LupaSimple x={0} y={0} r={74} /></g>
          <g opacity={kprog(T, K.C + 4.0, K.C + 4.4)}><PanTortilla x={600} y={1138} s={0.9 * klerp(0.6, 1, kprog(T, K.C + 4.0, K.C + 4.5, kEase.rebote))} /></g>
        </>)}
      </Escena>

      {/* ---------- textos ---------- */}
      <Chip T={T} at={K.G + 0.5} until={K.A - 0.3} texto="¿solo de adorno?" x={300} y={420} tam={40} borde={KC.red} />
      <Rotulo T={T} at={K.A + 0.1} until={K.Pu - 0.3} x={60} y={450} texto="agracejo" sub="Berberis vulgaris" />
      <Rotulo T={T} at={K.A + 1.0} until={K.Pu - 0.3} x={1040} y={640} der texto="roya del tallo del trigo" sub="Puccinia graminis f. sp. tritici" />
      <Etq T={T} at={K.Pu + 1.4} until={K.E - 0.3} x={578} y={700} texto="pústula" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Pu + 1.9} until={K.E - 0.3} x={578} y={880} texto="la piel del tallo, rota" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pu + 2.4} until={K.E - 0.3} x={578} y={1060} texto="polvo color ladrillo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pu + 0.3} until={K.E - 0.3} texto="8–10 días después de infectar" x={420} y={1105} tam={32} borde={TG.ladrillo} />
      <Chip T={T} at={K.E + 0.1} until={K.Ci - 0.3} texto="AL MICROSCOPIO · UREDOSPORAS" x={540} y={410} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.E + 0.8} until={K.E + 2.2} x={760} y={760} texto="espinitas" tam={30} />
      <Etq T={T} at={K.E + 1.2} until={K.E + 2.2} x={290} y={1050} lado="izq" texto="pedicelo" tam={28} />
      <Etq T={T} at={K.E + 2.4} until={K.Ci - 0.3} x={60} y={1050} texto="el viento se las lleva" tam={30} />
      <Chip T={T} at={K.Ci + 0.1} until={K.Ci + 3.0} texto="5 tipos de esporas · 2 plantas" x={400} y={410} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 3.4} until={K.Ca - 0.3} texto="en el agracejo: razas nuevas" x={400} y={410} tam={32} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.Ca + 0.2} until={K.P - 0.3} anio="1918" quien="EE. UU. vs. agracejo" revista="hasta 1980 · Plant Dis. 2005" x={340} y={515} />
      <NumeroGigante T={T} at={K.Ca + 1.3} until={K.P - 0.3} valor={500} dur={2.6} prefijo="+" sufijo=" millones" etiqueta="de agracejos destruidos" x={540} y={1045} tam={110} color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.U + 0.6} until={K.S - 0.3} anio="1999" quien="Kalengyere, Uganda" revista="feb. 1999 · Plant Disease, 2000" x={730} y={560} />
      <Etq T={T} at={K.U + 0.9} until={K.S - 0.3} x={262} y={624} lado="izq" texto="Uganda" tam={30} color={KC.ink} />
      <Chip T={T} at={K.U + 2.6} until={K.S - 0.3} texto="trigos con el gen Sr31: con roya" x={540} y={1150} tam={32} borde={TG.ladrillo} />
      <TextoGrande T={T} at={K.S + 2.3} until={K.B - 0.3} texto="Ug99" x={330} y={470} tam={170} color={TG.roya2} />
      <Etq T={T} at={K.S + 2.8} until={K.B - 0.3} x={60} y={590} texto="Ug = Uganda · 99 = 1999" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 0.5} until={K.S + 2.2} x={60} y={470} texto="gen de resistencia Sr31" tam={30} color={KC.ink} />
      <Etq T={T} at={K.B + 0.9} until={K.N - 0.3} x={60} y={700} texto="● CIMMYT · México" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 1.6} until={K.N - 0.3} x={60} y={745} texto="Norman Borlaug y su equipo:" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 1.9} until={K.N - 0.3} x={60} y={790} texto="trigos resistentes a la roya" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.B + 2.4} until={K.N - 0.3} anio="2005" quien="Borlaug da la alarma" revista="nace la Global Rust Initiative (hoy BGRI)" x={470} y={1000} />
      <Chip T={T} at={K.N + 0.1} until={K.C - 0.3} texto="POR DENTRO · DOS NÚCLEOS" x={420} y={370} tam={32} borde={KC.gold} mono />
      <TarjetaEstudio T={T} at={K.N + 0.3} until={K.N + 2.6} anio="2019" quien="Nature Communications" revista="Minnesota, Australia y Sudáfrica" x={600} y={600} />
      <Etq T={T} at={K.N + 0.9} until={K.C - 0.3} x={110} y={1040} texto="hongo 1" tam={28} />
      <Etq T={T} at={K.N + 1.2} until={K.C - 0.3} x={610} y={1040} texto="hongo 2" tam={28} />
      <Etq T={T} at={K.N + 4.6} until={K.C - 0.3} x={110} y={760} texto="Ug99: un núcleo de cada uno" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.N + 5.2} until={K.C - 0.3} texto="sin pasar por el agracejo" x={540} y={1130} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="EN LA MIRA" x={270} y={760} tam={40} borde={KC.red} />
      <Etq T={T} at={K.C + 0.9} until={K.Ou} x={545} y={600} lado="izq" texto="se vigila el viento" tam={28} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Pu} texto="50 cm" largo={220} color={KC.ink} />
      <BarraEscala T={T} at={K.Pu} until={K.E} texto="5 mm" largo={300} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Ci} texto="20 µm" largo={90} />
      <BarraEscala T={T} at={K.Ci} until={K.Ca} texto="ciclo esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.U} until={K.S} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.B} until={K.N} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.C} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={220} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Este arbusto puede *dejarte sin pan.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.Pu - 0.1} texto="Agracejo y *roya del tallo* del trigo." />
      <Subtitulo T={T} idx={2} at={K.Pu + 0.1} until={K.E - 0.1} texto="Revienta el tallo: *polvo ladrillo.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Ci - 0.1} texto="Esporas que viajan *con el viento.*" />
      <Subtitulo T={T} idx={4} at={K.Ci + 0.1} until={K.Ca - 0.1} texto="En el agracejo saca *razas nuevas.*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.P - 0.1} texto="Desde 1918: *+500 millones* de arbustos." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.U - 0.1} texto="¿Y si ya *no necesitara* al arbusto?" />
      <Subtitulo T={T} idx={7} at={K.U + 0.1} until={K.S - 0.1} texto="1999, Uganda: roya en trigos *con Sr31.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.B - 0.1} texto="La raza nueva: *Ug99.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.N - 0.1} texto="2005: Borlaug *da la alarma.*" />
      <Subtitulo T={T} idx={10} at={K.N + 0.1} until={K.C - 0.1} texto="Ug99 habría nacido *sin cruzarse.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ahí se juega *tu pan y tu tortilla.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_13_senalando_arriba', 'gancho'],
        [K.Pu + 0.5, K.Pu + 3.6, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ci + 0.0, K.Ci + 3.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ca + 0.4, K.Ca + 4.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.P + 2.9, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 0.3, K.S + 3.9, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.B + 0.6, K.B + 5.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.N + 2.9, K.N + 6.8, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.6, K.C + 6.0, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="116" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TrigoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TrigoShot /></CompositionStage></div>;
}
window.TrigoApp = TrigoApp;
window.MiApp = TrigoApp;
