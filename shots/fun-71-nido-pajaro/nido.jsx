// Shot Fungi Mati #71 · Esos no son huevitos en un nido: el hongo nido de pájaro (Cyathus) — NARRADO (gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const NP = { cafe:'#7a5230', cafe2:'#a8784a', cafeOsc:'#3b2a1c', pelo:'#5e3d22', huevo:'#b9bec4', huevo2:'#e8ecef', huevoSom:'#6f767d',
  madera:'#8a5a2e', madera2:'#6a4220', gota:'#5fb7ff', gota2:'#cfeaff', pasto:'#3fbf4a', pasto2:'#2c8f37', venado:'#a8693a', venado2:'#7d4a24' };

// Peridiolo (huevito) lenticular visto de lado/arriba. (x, y) centro.
function Huevito({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={3} rx={22} ry={11} fill={NP.huevoSom} />
    <ellipse cx={0} cy={0} rx={22} ry={11} fill={NP.huevo} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={-6} cy={-4} rx={9} ry={3.5} fill={NP.huevo2} opacity=".9" />
  </g>;
}
// Posiciones de los huevitos dentro del fondo de la copa (unidades de rx/ry del borde).
const HUEVOS7 = [[-0.36, 0.05], [0.0, -0.12], [0.36, 0.02], [-0.18, 0.32], [0.18, 0.3], [-0.42, -0.28], [0.4, -0.3]];
// Copa (peridio) en embudo, vista un poco desde arriba. Base (pie) en (x, y). R = radio del borde. huevos = cuáles quedan.
function Copa({ T = 0, x, y, s = 1, R = 130, H = 210, huevos = [0, 1, 2, 3, 4, 5, 6], tiembla = 0 }) {
  const ry = R * 0.36, top = -H, base = R * 0.16;
  const pelos = Array.from({ length: 22 }, (_, i) => { const u = i / 21, yy = klerp(top + 8, -12, u), w = klerp(R, base, Math.pow(u, 0.8)); return [w, yy]; });
  const dx = Math.sin(T * 40) * 3 * tiembla;
  return <g transform={`translate(${x + dx} ${y}) scale(${s})`}>
    {/* cuerpo de afuera, peludito */}
    <path d={`M ${-R} ${top} C ${-R * 0.9} ${top * 0.45} ${-base * 1.4} ${-30} ${-base} 0 L ${base} 0 C ${base * 1.4} ${-30} ${R * 0.9} ${top * 0.45} ${R} ${top} Z`} fill={NP.cafe} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {pelos.map(([w, yy], i) => <g key={i}>
      <line x1={-w * 0.98} y1={yy} x2={-w * 0.98 - 9} y2={yy + 7} stroke={NP.pelo} strokeWidth={3} />
      <line x1={w * 0.98} y1={yy} x2={w * 0.98 + 9} y2={yy + 7} stroke={NP.pelo} strokeWidth={3} />
      {i % 3 === 0 && <line x1={-w * 0.4} y1={yy} x2={-w * 0.4 - 6} y2={yy + 8} stroke={NP.pelo} strokeWidth={3} opacity=".7" />}
      {i % 3 === 1 && <line x1={w * 0.35} y1={yy} x2={w * 0.35 + 6} y2={yy + 8} stroke={NP.pelo} strokeWidth={3} opacity=".7" />}
    </g>)}
    {/* boca: interior oscuro con estrías */}
    <ellipse cx={0} cy={top} rx={R} ry={ry} fill={NP.cafeOsc} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={top + ry * 0.25} rx={R * 0.78} ry={ry * 0.7} fill="#2a1d13" />
    {Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * R * 0.95} y1={top + Math.sin(a) * ry * 0.95} x2={Math.cos(a) * R * 0.45} y2={top + ry * 0.2 + Math.sin(a) * ry * 0.45} stroke="#5a4129" strokeWidth={3} />; })}
    <ellipse cx={0} cy={top} rx={R} ry={ry} fill="none" stroke={NP.cafe2} strokeWidth={5} />
    {HUEVOS7.map(([u, v], i) => huevos.includes(i) ? <Huevito key={i} x={u * R} y={top + ry * 0.22 + v * ry} s={R / 130} rot={u * 18} /> : null)}
  </g>;
}
// Tronco/pedazo de madera horizontal.
function Madera({ x, y, w = 900, h = 120 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={26} fill={NP.madera} stroke={KC.ink} strokeWidth={7} />
    {[26, 54, 86].map((yy, i) => <path key={i} d={`M 40 ${yy} Q ${w * 0.45} ${yy - 12} ${w - 30} ${yy + 5}`} stroke={NP.madera2} strokeWidth={5} fill="none" />)}
  </g>;
}
// Gota de lluvia (punta arriba). (x, y) = centro de la panza.
function Gota({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -34 C 8 -18 20 -6 20 8 A 20 20 0 1 1 -20 8 C -20 -6 -8 -18 0 -34 Z" fill={NP.gota} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-7} cy={6} rx={5} ry={8} fill={NP.gota2} opacity=".8" />
  </g>;
}
// Corona de salpicadura: gotitas que salen del punto (x, y) en el tiempo 0..1.
function Salpica({ x, y, p, n = 9, r = 160, s = 1 }) {
  if (p <= 0 || p >= 1) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const a = Math.PI * (0.12 + 0.76 * i / (n - 1)); const vx = Math.cos(a) * r, vy = -Math.sin(a) * r * 1.1;
      const px = vx * p, py = vy * p + 260 * p * p; return <circle key={i} cx={px} cy={py} r={9 * (1 - p * 0.6)} fill={NP.gota} stroke={KC.ink} strokeWidth={2} />; })}
    <ellipse cx={0} cy={0} rx={60 * p + 10} ry={14 * p + 4} fill="none" stroke={NP.gota} strokeWidth={6 * (1 - p)} />
  </g>;
}
// Bolita del cordón enrollado (va pegada al huevito en vuelo).
function Ovillo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={0} rx={9 - k * 2} ry={6 - k} fill="none" stroke="#efe2c4" strokeWidth={2.5} transform={`rotate(${k * 50})`} />)}
  </g>;
}
// Peridiolo en corte (grande, al microscopio), con esporas adentro, cordón enrollado y punta pegajosa.
const ESPORAS = (() => { const r = krng(71); return Array.from({ length: 150 }, () => { let a, b; do { a = r() * 2 - 1; b = r() * 2 - 1; } while (a * a + b * b > 1); return [a, b, r()]; }); })();
function PeridioloCorte({ T, x, y, s = 1, esporas = 1, cordon = 1, punta = 1 }) {
  const RX = 250, RY = 120;
  const k = Math.ceil(ESPORAS.length * esporas);
  const vueltas = 7, hy0 = RY + 10, hy1 = RY + 10 + 250 * cordon;
  const hel = Array.from({ length: 140 }, (_, i) => { const u = i / 139; const yy = klerp(hy0, hy1, u); return [Math.sin(u * vueltas * Math.PI * 2 + T * 0.6) * 46, yy]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cordon > 0 && <path d={'M ' + hel.map(([a, b]) => a.toFixed(1) + ' ' + b.toFixed(1)).join(' L ')} stroke="#efe2c4" strokeWidth={10} fill="none" strokeLinecap="round" />}
    {cordon > 0 && punta > 0 && <g transform={`translate(0 ${hy1 + 30})`} opacity={punta} style={{ filter:`drop-shadow(0 0 ${16 * punta}px ${KC.yellow})` }}>
      {Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return <path key={i} d={`M 0 0 Q ${Math.cos(a) * 30} ${Math.sin(a) * 30 + 10} ${Math.cos(a + 0.6) * 46} ${Math.sin(a + 0.6) * 36}`} stroke={KC.yellow} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
      <circle r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    </g>}
    <ellipse cx={0} cy={6} rx={RX + 14} ry={RY + 14} fill="#4a5056" />
    <ellipse cx={0} cy={0} rx={RX + 14} ry={RY + 14} fill={NP.huevo} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={RX - 14} ry={RY - 16} fill="#f3ead2" stroke="#8b8f94" strokeWidth={5} />
    {ESPORAS.slice(0, k).map(([a, b, c], i) => <ellipse key={i} cx={a * (RX - 40)} cy={b * (RY - 34)} rx={7} ry={4.5} fill={KC.gold} opacity={0.6 + 0.4 * c} transform={`rotate(${c * 180} ${a * (RX - 40)} ${b * (RY - 34)})`} />)}
  </g>;
}
// Velocímetro simple: aguja de 0 a 'v' (0..1).
function Velocimetro({ x, y, v = 0 }) {
  const a = Math.PI * (1 - v);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 0 A 110 110 0 0 1 110 0" fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => { const b = Math.PI * (1 - i / 5); return <line key={i} x1={Math.cos(b) * 86} y1={-Math.sin(b) * 86} x2={Math.cos(b) * 104} y2={-Math.sin(b) * 104} stroke={KC.ink} strokeWidth={5} />; })}
    <path d={`M -86 0 A 86 86 0 0 1 ${(Math.cos(Math.PI * 0.8) * 86).toFixed(1)} ${(-Math.sin(Math.PI * 0.8) * 86).toFixed(1)}`} stroke={KC.mint} strokeWidth={10} fill="none" />
    <line x1={0} y1={0} x2={Math.cos(a) * 92} y2={-Math.sin(a) * 92} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
  </g>;
}
// Cámara de cine esquemática.
function CamaraCine({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-40} cy={-120} r={52} fill="#3a3f47" stroke={KC.ink} strokeWidth={6} transform={`rotate(${T * 200} -40 -120)`} />
    <circle cx={60} cy={-120} r={52} fill="#3a3f47" stroke={KC.ink} strokeWidth={6} />
    <rect x={-110} y={-70} width={220} height={130} rx={16} fill="#22262c" stroke={KC.ink} strokeWidth={7} />
    <path d="M 110 -40 L 190 -80 L 190 70 L 110 30 Z" fill="#454b54" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-70} cy={-40} r={10} fill={KC.red} opacity={0.5 + 0.5 * Math.sin(T * 8)} />
    <line x1={0} y1={60} x2={-60} y2={200} stroke={KC.ink} strokeWidth={10} /><line x1={0} y1={60} x2={60} y2={200} stroke={KC.ink} strokeWidth={10} />
  </g>;
}
// Brizna de pasto (tallo) vertical de (x, y0) a (x, y1).
function Tallo({ x, y0, y1, T, seed = 1, ancho = 16 }) {
  const m = mece(T, seed, 0.4) * 10;
  return <path d={`M ${x - ancho / 2} ${y0} Q ${x + m} ${(y0 + y1) / 2} ${x + m * 1.6} ${y1} Q ${x + m + ancho / 2} ${(y0 + y1) / 2} ${x + ancho / 2} ${y0} Z`} fill={NP.pasto} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />;
}
// Cabeza de venado (de perfil, mirando a la izquierda). (x, y) = punta del hocico. mastica 0..1.
function Venado({ x, y, mastica = 0, s = 1 }) {
  const mand = Math.abs(Math.sin(mastica * Math.PI * 6)) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 200 -130 Q 250 -40 300 140 L 470 140 Q 360 -20 300 -150 Z" fill={NP.venado2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 0 ${10 + mand} Q 40 ${46 + mand} 130 ${40 + mand} L 140 10 Z`} fill={NP.venado2} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 0 Q -6 -40 60 -70 Q 160 -140 260 -150 Q 330 -120 320 -40 Q 300 20 200 30 Q 90 40 0 20 Z" fill={NP.venado} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={14} cy={-6} rx={18} ry={14} fill={KC.ink} />
    <ellipse cx={170} cy={-80} rx={16} ry={12} fill={KC.ink} /><circle cx={165} cy={-84} r={4} fill="#fff" />
    <path d="M 250 -150 Q 270 -240 330 -260 Q 320 -190 290 -140 Z" fill={NP.venado} stroke={KC.ink} strokeWidth={6} />
    <path d="M 262 -160 Q 280 -215 316 -238" stroke="#f0c9a0" strokeWidth={8} fill="none" />
  </g>;
}
// Tarjetita con dibujo (para "dónde crece").
function Tarjeta({ x, y, w = 300, h = 330, titulo, o = 1, s = 1, children }) {
  return <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s}) translate(${-w / 2} ${-h / 2})`} opacity={o}>
    <rect x={0} y={0} width={w} height={h} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    {children}
    <text x={w / 2} y={h - 24} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
  </g>;
}

const NIDO_PUNTOS = [['Sonora', -110.9, 29.1], ['Jalisco', -103.3, 20.7], ['Hidalgo', -98.8, 20.1], ['Veracruz', -96.6, 19.4], ['Tabasco', -92.9, 18.0], ['Chiapas', -92.6, 16.6], ['Yucatán', -89.4, 20.8]];

function NidoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, D: CUES.Donde, Hu: CUES.Huevito, P: CUES.Pregunta, Go: CUES.Gota, V: CUES.Vuelo, E: CUES.Estudio, En: CUES.Energia, F: CUES.Freno, He: CUES.Herbivoro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: una gota cae junto a la copa y salpica (algo se mueve antes del segundo 1)
  const g1 = kprog(T, K.G, K.G + 0.75);
  // lluvia ligera (gancho y cierre)
  const lluvia = (t0, n, seed) => Array.from({ length: n }, (_, i) => { const r = krng(seed + i); const per = 0.9 + r() * 0.5, off = r() * per, x = 60 + r() * 960;
    const u = ((T - t0 + off) % per) / per; return <line key={i} x1={x} y1={300 + u * 900} x2={x - 6} y2={330 + u * 900} stroke="rgba(255,255,255,.75)" strokeWidth={5} strokeLinecap="round" />; });
  // GOTA: la gota pega en el borde y el huevito sale disparado
  const golpe = K.Go + 1.25;
  const caeG = kprog(T, K.Go + 0.2, golpe, kEase.entra || ((p) => p * p));
  const vuela = Math.max(0, T - (golpe + 0.1));
  const COPA_G = { x: 540, y: 1150, R: 150, H: 240, s: 1.7 };
  const borde = [COPA_G.x - COPA_G.R * COPA_G.s * 0.55, COPA_G.y - COPA_G.H * COPA_G.s];
  const hv = [borde[0] + 40 + vuela * 190, borde[1] - vuela * 760 + 0.5 * 900 * vuela * vuela];
  // VUELO: arco de 1 m (máximo estimado)
  const arco = (u) => [170 + u * 760, 1000 - Math.sin(u * Math.PI) * 430 - (1 - u) * 60];
  const uv = kprog(T, K.V + 0.4, K.V + 2.6, kEase.suave);
  // FRENO: la punta se pega al tallo, el cordón se desenrolla y lo columpia
  const ANC = [706, 700];
  const tc = K.F + 1.5;
  let pf, Lc = 0;
  if (T < tc) { const u = kprog(T, K.F + 0.1, tc); pf = [klerp(-60, ANC[0], u), ANC[1] + 160 - Math.sin(u * Math.PI * 0.9) * 200 + u * -40]; }
  else { Lc = 250 * kprog(T, tc, tc + 0.7, kEase.sale); const th = 1.15 * Math.exp(-(T - tc) * 0.9) * Math.cos((T - tc) * 3.2); pf = [ANC[0] + Lc * Math.sin(th), ANC[1] + Lc * Math.cos(th)]; }
  const comido = kprog(T, K.He + 2.2, K.He + 2.5);
  const venX = klerp(1300, ANC[0] + 40, kprog(T, K.He + 0.6, K.He + 1.8, kEase.sale));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y el hongo: la copa en la madera */}
      <Escena T={T} a={K.G} b={K.D} zoom={0.06} origen="40% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {T < K.H && lluvia(K.G, 14, 3)}
          <Madera x={-40} y={1080} w={1160} h={150} />
          <Copa T={T} x={380} y={1090} s={1.55} R={150} H={240} />
          {g1 < 1 && <Gota x={110} y={klerp(260, 1060, g1 * g1)} s={1.3} />}
          <Salpica x={110} y={1085} p={kprog(T, K.G + 0.75, K.G + 1.35)} s={0.8} />
        </>)}
      </Escena>
      {/* 3 · dónde crece: tarjetas y mapa */}
      <Escena T={T} a={K.D} b={K.Hu} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {T < K.D + 3.6 && [0, 1, 2].map((i) => { const e = kprog(T, K.D + 0.2 + i * 0.8, K.D + 0.6 + i * 0.8, kEase.rebote); const out = kprog(T, K.D + 3.1, K.D + 3.5);
            if (e <= 0) return null;
            return <Tarjeta key={i} x={45 + i * 340} y={540} w={310} h={360} s={e} o={1 - out} titulo={['madera podrida', 'estiércol viejo', 'astillas'][i]}>
              {i === 0 && <><rect x={30} y={190} width={250} height={70} rx={20} fill="#6b4a2a" stroke={KC.ink} strokeWidth={5} /><path d="M 50 210 L 120 205 M 160 230 L 250 222" stroke="#3b2a1c" strokeWidth={4} /></>}
              {i === 1 && <path d="M 30 255 Q 40 190 110 185 Q 160 160 210 185 Q 280 190 280 255 Z" fill="#6a5232" stroke={KC.ink} strokeWidth={5} />}
              {i === 2 && Array.from({ length: 14 }, (_, k) => <rect key={k} x={30 + (k % 7) * 36} y={205 + Math.floor(k / 7) * 26} width={34} height={16} rx={4} fill={k % 2 ? '#d9a35a' : '#b97f3c'} stroke={KC.ink} strokeWidth={3} transform={`rotate(${(k * 37) % 30 - 15} ${47 + (k % 7) * 36} ${213 + Math.floor(k / 7) * 26})`} />)}
              {[[100, 195], [165, 188], [225, 196]].map(([cx, cy], k) => <Copa key={k} x={cx} y={cy} s={0.28} R={150} H={240} />)}
            </Tarjeta>; })}
          {T > K.D + 3.1 && <g opacity={kprog(T, K.D + 3.1, K.D + 3.6)}>
            <MapaMexico x={90} y={540} ancho={900} conCA={false}>
              {NIDO_PUNTOS.map(([n, lo, la], i) => { const [px, py] = mxProy(lo, la); const k = kEase.rebote(kprog(T, K.D + 3.7 + i * 0.18, K.D + 4.0 + i * 0.18));
                return <circle key={n} cx={px} cy={py} r={18 * k} fill={NP.cafe} stroke={KC.ink} strokeWidth={4} />; })}
            </MapaMexico>
          </g>}
        </>)}
      </Escena>
      {/* 4 · por dentro: el huevito en corte */}
      <Escena T={T} a={K.Hu} b={K.P} zoom={0.05} origen="40% 45%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<PeridioloCorte T={T} x={380} y={720} s={kEase.sale(kprog(T, K.Hu, K.Hu + 0.6))} esporas={kprog(T, K.Hu + 0.4, K.Hu + 1.6)} cordon={kprog(T, K.Hu + 2.0, K.Hu + 3.0, kEase.sale)} punta={kprog(T, K.Hu + 3.2, K.Hu + 3.7)} />)}
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Go} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Madera x={-40} y={1100} w={700} h={130} /><Copa T={T} x={270} y={1110} s={1.15} R={150} H={240} tiembla={0.3} /><Interrogacion T={T} x={270} y={640} tam={300} /></>)}
      </Escena>
      {/* 6 · la gota pega en el borde: el huevito sale disparado */}
      <Escena T={T} a={K.Go} b={K.V} zoom={0.03} origen="50% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Madera x={-40} y={1140} w={1160} h={140} />
          <Copa T={T} x={COPA_G.x} y={COPA_G.y} s={COPA_G.s} R={COPA_G.R} H={COPA_G.H} huevos={T > golpe + 0.1 ? [1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4, 5, 6]} tiembla={kprog(T, golpe, golpe + 0.1) * (1 - kprog(T, golpe + 0.2, golpe + 0.6))} />
          {T < golpe && <Gota x={borde[0] - 10} y={klerp(250, borde[1] - 30, caeG)} s={1.6} />}
          <Salpica x={borde[0]} y={borde[1]} p={kprog(T, golpe, golpe + 0.8)} s={1.3} />
          {T > golpe + 0.1 && hv[1] > 380 && <g><Huevito x={hv[0]} y={hv[1]} s={2.2} rot={vuela * 400} /><Ovillo x={hv[0] - 18} y={hv[1] + 26} s={1.6} /></g>}
          {T > golpe + 0.1 && <path d={Array.from({ length: 20 }, (_, i) => { const t = vuela * i / 19; return `${i ? 'L' : 'M'} ${(borde[0] + 40 + t * 190).toFixed(1)} ${(borde[1] - t * 760 + 450 * t * t).toFixed(1)}`; }).join(' ')} stroke="#fff" strokeWidth={5} strokeDasharray="10 12" fill="none" opacity=".8" />}
        </>)}
      </Escena>
      {/* 7 · vuelo: 1–5 m/s, hasta ≈ 1 m */}
      <Escena T={T} a={K.V} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1010} width={KW} height={400} fill="#6b4a2a" />
          <line x1={0} y1={1010} x2={KW} y2={1010} stroke={KC.ink} strokeWidth={8} />
          <Copa T={T} x={150} y={1015} s={0.5} R={150} H={240} huevos={[1, 2, 3, 4, 5, 6]} />
          <path d={Array.from({ length: 41 }, (_, i) => { const [a, b] = arco(i / 40 * uv); return `${i ? 'L' : 'M'} ${a.toFixed(1)} ${b.toFixed(1)}`; }).join(' ')} stroke="#fff" strokeWidth={6} strokeDasharray="12 12" fill="none" />
          {(() => { const [a, b] = arco(uv); return <g><Huevito x={a} y={b - 8} s={1.4} rot={uv * 600} /><Ovillo x={a - 10} y={b + 10} s={1.1} /></g>; })()}
          {/* regla en el piso */}
          <g opacity={kprog(T, K.V + 2.4, K.V + 2.8)}>
            <rect x={170} y={1030} width={760 * kprog(T, K.V + 2.4, K.V + 3.0, kEase.sale)} height={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 11 }, (_, i) => i / 10 <= kprog(T, K.V + 2.4, K.V + 3.0) ? <line key={i} x1={170 + i * 76} y1={1030} x2={170 + i * 76} y2={i % 5 ? 1050 : 1065} stroke={KC.ink} strokeWidth={4} /> : null)}
          </g>
          <g opacity={kprog(T, K.V + 0.3, K.V + 0.7)}><Velocimetro x={800} y={560} v={0.2 + 0.6 * kprog(T, K.V + 0.5, K.V + 1.5, kEase.sale) + Math.sin(T * 9) * 0.02} /></g>
        </>)}
      </Escena>
      {/* 8 · el estudio: cámara superlenta */}
      <Escena T={T} a={K.E} b={K.En} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <CamaraCine x={250} y={1110} s={0.7} T={T} />
          <Madera x={560} y={1150} w={560} h={110} /><Copa T={T} x={800} y={1160} s={0.7} R={150} H={240} />
          {/* tira de película con el huevito a distintas alturas */}
          <g transform={`translate(${-((T - K.E) * 160) % 200} 0)`} opacity={kprog(T, K.E + 2.4, K.E + 2.8)}>
            {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`translate(${i * 200 - 60} 770)`}>
              <rect x={0} y={0} width={190} height={150} fill="#1b1d22" stroke={KC.ink} strokeWidth={4} />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={10 + k * 45} y={6} width={22} height={12} rx={3} fill="#f4efe4" />)}
              <rect x={14} y={26} width={162} height={100} fill="#cfeaff" />
              <Huevito x={95} y={115 - (i % 4) * 22} s={0.7} />
            </g>)}
          </g>
        </>)}
      </Escena>
      {/* 9 · energía: menos del 2 % */}
      <Escena T={T} a={K.En} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Gota x={180} y={820} s={2.4} />
          {(() => { const u = kprog(T, K.En + 0.3, K.En + 1.2, kEase.sale), d = kprog(T, K.En + 1.6, K.En + 2.4, kEase.sale); return <>
            <rect x={320} y={760} width={600 * u} height={110} fill={NP.gota} stroke={KC.ink} strokeWidth={7} />
            <rect x={320 + 600 * u - 12 + d * 40} y={760 - d * 120} width={12} height={110} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
            {d > 0 && <Huevito x={346 + 600 * u + d * 20} y={720 - d * 30} s={1.6} />}
          </>; })()}
          <text x={320} y={920} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>energía de la gota (100 %)</text>
        </>)}
      </Escena>
      {/* 10–11 · el cordón frena; el venado */}
      <Escena T={T} a={K.F} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1150} width={KW} height={200} fill="#6b4a2a" />
          {[[120, 520, 2], [260, 600, 5], [430, 470, 7], [ANC[0], 430, 1], [880, 560, 9], [990, 500, 4]].map(([x, y1, sd], i) => <Tallo key={i} x={x} y0={1160} y1={y1} T={i === 3 ? 0 : T} seed={sd} />)}
          {/* cordón */}
          {T > tc && comido < 1 && <path d={`M ${ANC[0]} ${ANC[1]} Q ${(ANC[0] + pf[0]) / 2 + 14} ${(ANC[1] + pf[1]) / 2} ${pf[0]} ${pf[1]}`} stroke="#efe2c4" strokeWidth={5} fill="none" />}
          {T > tc && comido < 1 && <g transform={`translate(${ANC[0]} ${ANC[1]})`} style={{ filter:`drop-shadow(0 0 10px ${KC.yellow})` }}><circle r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>}
          {comido < 1 && T > K.F + 0.1 && <g opacity={1 - comido}><Huevito x={pf[0]} y={pf[1] + 10} s={2.2} rot={T < tc ? (T - K.F) * 300 : 0} />{T < tc && <Ovillo x={pf[0] - 26} y={pf[1] - 6} s={1.8} />}</g>}
          {T > K.He && <Venado x={venX} y={ANC[1] + 270} s={1.15} mastica={kprog(T, K.He + 1.8, K.He + 3.4)} />}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma copa del inicio, con un huevito menos, bajo la lluvia */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {lluvia(K.C, 18, 40)}
          <Madera x={-40} y={1080} w={1160} h={150} />
          <Copa T={T} x={380} y={1090} s={1.55} R={150} H={240} huevos={[1, 2, 3, 4, 5, 6]} />
          {(() => { const per = 1.1, u = ((T - K.C) % per) / per; return <><Gota x={110} y={klerp(260, 1060, u * u)} s={1.2} o={u < 0.95 ? 1 : 0} /></>; })()}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.4} until={K.H - 0.2} texto="no son huevos" x={300} y={470} tam={44} borde={KC.red} />
      <Etq T={T} at={K.H + 0.3} until={K.D - 0.3} x={60} y={480} texto="hongo nido de pájaro" tam={38} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.D - 0.3} x={60} y={540} texto="Cyathus" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 1.6} until={K.D - 0.3} x={640} y={1040} texto="7–10 mm de alto" tam={28} color={KC.ink} />
      <Chip T={T} at={K.D + 0.1} until={K.D + 3.3} texto="¿DÓNDE CRECE?" x={540} y={460} tam={38} borde={KC.ink} mono />
      <Chip T={T} at={K.D + 3.5} until={K.Hu - 0.3} texto="algunos registros en México" x={540} y={440} tam={36} borde={NP.cafe} />
      <Etq T={T} at={K.D + 3.9} until={K.Hu - 0.3} x={262} y={600} texto="Sonora" tam={30} color={KC.ink} />
      <Etq T={T} at={K.D + 4.9} until={K.Hu - 0.3} x={690} y={880} texto="Yucatán" tam={30} lado="izq" color={KC.ink} />
      <Chip T={T} at={K.Hu + 0.2} until={K.P - 0.3} texto="POR DENTRO · UN HUEVITO" x={380} y={400} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hu + 1.0} until={K.P - 0.3} x={110} y={545} texto="paquete de esporas" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Hu + 2.4} until={K.P - 0.3} x={440} y={980} texto="cordón enrollado" tam={30} color={'#efe2c4'} />
      <Etq T={T} at={K.Hu + 3.4} until={K.P - 0.3} x={440} y={1130} texto="punta pegajosa" tam={30} color={KC.yellow} />
      <Chip T={T} at={K.Go + 2.0} until={K.V - 0.3} texto="el borde: el mejor golpe" x={540} y={1050} tam={36} borde={NP.gota} />
      <Etq T={T} at={K.Go + 0.4} until={golpe} x={borde[0] + 50} y={460} texto="gota de lluvia" tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 0.6} until={K.E - 0.3} texto="1–5 m/s" x={800} y={420} tam={48} borde={KC.red} />
      <Etq T={T} at={K.V + 2.9} until={K.E - 0.3} x={170} y={1120} texto="hasta ≈ 1 m (máximo estimado)" tam={30} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.En - 0.3} anio="2013" quien="Miami University (Ohio)" revista="Fungal Biology, 2013 · video de alta velocidad" x={540} y={560} />
      <NumeroGigante T={T} at={K.En + 1.6} until={K.F - 0.3} valor={2} dur={0.4} prefijo="< " sufijo=" %" etiqueta="para lanzar el huevito" x={380} y={540} tam={170} color={KC.gold2} />
      <Etq T={T} at={K.F + 1.6} until={K.He - 0.2} x={ANC[0] + 30} y={ANC[1] - 40} texto="se pega" tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 2.6} until={K.He - 0.2} texto="el cordón lo frena" x={330} y={460} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.He + 2.4} until={K.C - 0.2} texto="hipótesis: viajan en la panza" x={640} y={430} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.He + 1.2} until={K.C - 0.2} x={560} y={520} texto="herbívoro (ilustrativo)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="espera la lluvia" x={330} y={470} tam={42} borde={NP.gota} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.D} texto="1 cm" largo={300} />
      <BarraEscala T={T} at={K.Hu} until={K.P} texto="1 mm" largo={250} />
      <BarraEscala T={T} at={K.P} until={K.Go} texto="1 cm" largo={220} />
      <BarraEscala T={T} at={K.Go} until={K.V} texto="1 cm" largo={330} />
      <BarraEscala T={T} at={K.V} until={K.E} texto="10 cm" largo={76} />
      <BarraEscala T={T} at={K.D + 3.4} until={K.Hu} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={300} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No son huevitos: son *cápsulas de esporas.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.D - 0.1} texto="Hongo nido de pájaro: *_Cyathus._*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.Hu - 0.1} texto="Madera, estiércol, astillas… *de Sonora a Yucatán.*" />
      <Subtitulo T={T} idx={3} at={K.Hu + 0.1} until={K.P - 0.1} texto="Un *paquete de esporas* con cordón." />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Go - 0.1} texto="¿Cómo sale *sin patas ni alas?*" />
      <Subtitulo T={T} idx={5} at={K.Go + 0.1} until={K.V - 0.1} texto="Una gota en el borde *lo lanza.*" />
      <Subtitulo T={T} idx={6} at={K.V + 0.1} until={K.E - 0.1} texto="1 a 5 m/s, *hasta ≈ 1 metro.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.En - 0.1} texto="2013: grabado en *cámara superlenta.*" />
      <Subtitulo T={T} idx={8} at={K.En + 0.1} until={K.F - 0.1} texto="Usa *menos del 2 %* de la energía de la gota." />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.He - 0.1} texto="La punta se pega y *el cordón lo frena.*" />
      <Subtitulo T={T} idx={10} at={K.He + 0.1} until={K.C - 0.1} texto="Donde comen los animales: *se cree* que así viajan." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No espera a un pájaro: *espera la lluvia.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.5, K.D - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Hu + 0.5, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Go - 0.35, 'avatar_07_pensativo_puno', 'grande'],
        [K.V + 0.3, K.E - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [K.En + 0.3, K.F - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.He + 0.4, K.C - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="71" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NidoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NidoShot /></CompositionStage></div>;
}
window.NidoApp = NidoApp;
