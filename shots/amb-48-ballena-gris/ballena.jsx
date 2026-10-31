// Shot Ambiental #48 · Un año de ballena gris en un mapa: 16 mil km que dependen del Ártico — NARRADO (N4 la imagen que se llena).
// Datos: NOAA Fisheries (ficha de especie, evento de mortandad inusual 2019-2023, notas del 18 jun 2025 y 15 jul 2026) y ficha IMMA
// de la UICN (lagunas de crianza). Ver guion.md y verificacion.md. Mapa, ruta y ballenas son esquemáticos.

// ---------- mapa esquemático del Pacífico norte (coordenadas de diseño; se escala con BG_MAP) ----------
const BG_SIBERIA = 'M -200 262 L 330 250 Q 395 290 385 345 L 300 420 Q 200 470 120 560 L -200 640 Z';
const BG_AMERICA = 'M 1300 240 L 480 240 Q 440 290 452 335 L 520 420 Q 470 480 380 540 Q 470 530 560 480 Q 650 460 720 520 Q 760 600 780 700 L 800 900 Q 830 1050 880 1120 Q 905 1210 960 1265 L 1012 1335 L 1040 1318 Q 1000 1235 958 1150 Q 1010 1160 1300 1320 Z';
const BG_RUTA = [[430,150],[418,240],[412,300],[415,345],[400,400],[380,460],[368,520],[400,552],[460,562],[530,556],[600,552],[660,566],[708,602],[738,652],[750,712],[757,780],[764,860],[774,940],[789,1010],[813,1075],[846,1135],[880,1188],[915,1234],[950,1280],[985,1318]];
const BG_LARGO = (() => { const c = [0]; for (let i = 1; i < BG_RUTA.length; i++) c.push(c[i - 1] + Math.hypot(BG_RUTA[i][0] - BG_RUTA[i - 1][0], BG_RUTA[i][1] - BG_RUTA[i - 1][1])); return c; })();
// punto de la ruta en la fracción p (0 = Ártico, 1 = Bahía Magdalena) y su ángulo
function bgRutaEn(p) {
  const L = BG_LARGO[BG_LARGO.length - 1] * kclamp(p, 0, 1);
  let i = 1; while (i < BG_LARGO.length - 1 && BG_LARGO[i] < L) i++;
  const a = BG_RUTA[i - 1], b = BG_RUTA[i], u = (L - BG_LARGO[i - 1]) / ((BG_LARGO[i] - BG_LARGO[i - 1]) || 1);
  return { x: klerp(a[0], b[0], u), y: klerp(a[1], b[1], u), ang: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, i };
}
function bgRutaParcial(p0, p1) {
  const A = bgRutaEn(p0), B = bgRutaEn(p1), pts = [[A.x, A.y]];
  for (let i = A.i; i < B.i; i++) pts.push(BG_RUTA[i]);
  pts.push([B.x, B.y]);
  return pts.map((q) => q.join(',')).join(' ');
}
const BG_LAGUNAS = [{ n: 'Ojo de Liebre', x: 912, y: 1200 }, { n: 'San Ignacio', x: 934, y: 1235 }, { n: 'Bahía Magdalena', x: 986, y: 1300 }];
// hielo y comida del Ártico. gris 0..1 = el Ártico se apaga; comida 0..1 = aparecen anfípodos.
function Hielo({ T, gris = 0, comida = 0 }) {
  const bl = [[60,150,110,40],[230,120,90,34],[380,95,70,26],[560,110,120,38],[760,140,100,34],[960,120,130,40],[150,215,70,22],[650,200,80,24],[1100,190,90,26]];
  return <g>
    {bl.map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y + Math.sin(T * 0.8 + i) * 3} rx={rx} ry={ry} fill={mixHex('#ffffff', '#9aa3ad', gris)} stroke={KC.ink} strokeWidth={4} />)}
    {comida > 0 && Array.from({ length: 9 }, (_, i) => <Anfipodo key={i} x={110 + i * 120 + Math.sin(T + i) * 6} y={175 + (i % 3) * 22} s={0.55} rot={i * 37} o={comida} />)}
  </g>;
}
function Mapa({ T, gris = 0, comida = 0, ruta = 0, rutaDesde = 0, ballena = null, lagunas = 0, puntos = 0, mexico = 0 }) {
  return <g>
    <Hielo T={T} gris={gris} comida={comida} />
    <path d={BG_SIBERIA} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} />
    <path d={BG_AMERICA} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} />
    {mexico > 0 && <path d="M 880 1120 Q 905 1210 960 1265 L 1012 1335 L 1040 1318 Q 1000 1235 958 1150 Q 1010 1160 1300 1320 L 1300 1110 Z" fill={KC.orange} opacity={0.55 * mexico} />}
    {ruta > 0 && <polyline points={bgRutaParcial(rutaDesde, ruta)} fill="none" stroke={KC.ink} strokeWidth={9} strokeDasharray="18 14" strokeLinecap="round" strokeDashoffset={-T * 30} />}
    {ruta > 0 && <polyline points={bgRutaParcial(rutaDesde, ruta)} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="18 14" strokeLinecap="round" strokeDashoffset={-T * 30} />}
    {lagunas > 0 && BG_LAGUNAS.map((l, i) => { const o = kclamp(lagunas * 3 - i, 0, 1); return <circle key={i} cx={l.x} cy={l.y} r={12 + 4 * Math.sin(T * 5 + i)} fill={KC.pink} stroke={KC.ink} strokeWidth={4} opacity={o} />; })}
    {puntos > 0 && BG_VARADAS.slice(0, Math.round(BG_VARADAS.length * puntos)).map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={3} />)}
    {ballena && <g transform={`translate(${ballena.x} ${ballena.y}) rotate(${ballena.ang}) scale(${ballena.s} ${Math.cos(ballena.ang * Math.PI / 180) < 0 ? -ballena.s : ballena.s})`}><BallenaGris T={T} /></g>}
  </g>;
}
// 69 varamientos (1 punto = 10): 35 EUA (347), 3 Canadá (27), 32 México (316), repartidos a lo largo de la costa (esquema)
const BG_VARADAS = (() => {
  const r = krng(48), out = [];
  const tramo = (p0, p1, n, dx) => { for (let k = 0; k < n; k++) { const q = bgRutaEn(klerp(p0, p1, (k + r()) / n)); out.push({ x: q.x + dx + r() * 18, y: q.y + (r() - 0.5) * 16 }); } };
  tramo(0.30, 0.44, 8, 8);    // Alaska
  tramo(0.47, 0.53, 3, 22);   // Canadá
  tramo(0.53, 0.75, 27, 22);  // EUA (WA-OR-CA)
  tramo(0.79, 1.0, 32, 14);   // México
  return out.sort((a, b) => a.y - b.y);
})();

// ---------- ballena gris de perfil (cabeza a la derecha, ~460 px de largo) ----------
// Sin aleta dorsal: joroba y "nudillos" en el último tercio del lomo; cabeza angosta y arqueada; manchas claras y percebes.
function BallenaGris({ T = 0, flaca = 0, color = '#8b96a1', cria = false }) {
  const ola = Math.sin(T * 3) * 6;
  return <g>
    <path d={`M -196 0 C -212 ${-4 + ola} -228 ${-30 + ola} -250 ${-52 + ola} C -262 ${-44 + ola} -268 ${-30 + ola} -262 ${-20 + ola} C -254 ${-10 + ola} -246 -4 -238 0 C -246 4 -254 ${10 + ola} -262 ${20 + ola} C -268 ${30 + ola} -262 ${44 + ola} -250 ${52 + ola} C -228 ${30 + ola} -212 4 -196 0 Z`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <g transform={`scale(1 ${1 - 0.18 * flaca})`}>
      <path d="M 200 2 C 190 -22 150 -38 90 -44 C 30 -50 -40 -46 -95 -34 C -140 -24 -175 -12 -200 -4 L -200 6 C -170 16 -130 30 -80 38 C -10 48 90 46 150 30 C 180 22 196 12 200 2 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-108 - i * 16} cy={-31 + i * 4.4} r={5} fill={color} stroke={KC.ink} strokeWidth={3} />)}
      {!cria && [[40,-30,18,7],[-30,-20,22,8],[-90,6,16,6],[10,18,14,5],[100,-20,10,4]].map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#dfe5ea" opacity=".85" />)}
      {!cria && [[150,-26],[160,-20],[140,-30],[170,-12]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#f4efe0" stroke={KC.ink} strokeWidth={2} />)}
      <path d="M 198 4 C 170 12 140 10 108 -2" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={112} cy={8} r={7} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={114} cy={8} r={3.5} fill={KC.ink} />
      {flaca > 0 && <><path d="M 78 -42 Q 58 -26 34 -44" stroke={KC.ink} strokeWidth={4} fill="none" opacity={flaca} />
        {[0, 1, 2].map((k) => <path key={k} d={`M ${20 - k * 26} -30 q -6 22 0 44`} stroke={KC.ink} strokeWidth={3} fill="none" opacity={0.6 * flaca} />)}</>}
    </g>
    <path d="M 80 30 C 70 60 50 80 30 86 C 40 66 55 46 60 32 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Anfípodo (crustáceo curvo, aplanado de lado, con muchas patas), ~70 px a s = 1.
function Anfipodo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={-20 + i * 7} y1={2} x2={-24 + i * 7} y2={14} stroke={KC.ink} strokeWidth={2.5} />)}
    <path d="M -32 2 C -30 -18 -8 -26 12 -22 C 28 -18 36 -6 34 6 C 24 0 8 -4 -6 -2 C -18 0 -26 8 -32 2 Z" fill="#ff9a5a" stroke={KC.ink} strokeWidth={3} />
    {[-18, -8, 2, 12, 22].map((sx, i) => <line key={i} x1={sx} y1={-20 + Math.abs(sx) * 0.1} x2={sx + 2} y2={-3} stroke={KC.ink} strokeWidth={1.8} />)}
    <path d="M 32 -10 l 22 -16 M 34 -4 l 26 -8" stroke={KC.ink} strokeWidth={2.5} fill="none" />
    <circle cx={26} cy={-10} r={2.5} fill={KC.ink} />
  </g>;
}
// Faro del punto de conteo (esquema).
function Faro({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 -60 L ${-220} ${-110 + Math.sin(T * 2) * 30} L ${-220} ${-10 + Math.sin(T * 2) * 30} Z`} fill={KC.yellow} opacity=".35" />
    <path d="M -40 120 L -26 -40 L 26 -40 L 40 120 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-33} y={10} width={66} height={22} fill={KC.red} /><rect x={-38} y={70} width={76} height={22} fill={KC.red} />
    <rect x={-30} y={-80} width={60} height={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <path d="M -38 -80 L 0 -112 L 38 -80 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function BallenaGrisShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Artico, Co: CUES.Comida, V: CUES.Viaje, L: CUES.Lagunas, P: CUES.Pregunta, Va: CUES.Varadas, Cr: CUES.Crias, Po: CUES.Poblacion, M: CUES.Misterio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const MAPA = 'translate(60 60) scale(0.85)';                       // mapa completo
  const bal = (p, s = 0.3) => { const q = bgRutaEn(p); return { x: q.x, y: q.y, ang: q.ang, s }; };
  // gancho: la ballena baja del Ártico a Baja California mientras se dibuja la ruta
  const pG = kprog(T, K.G + 0.1, K.A - 0.4, kEase.suave);
  // viaje: segunda bajada, rápida
  const pV = kprog(T, K.V + 0.1, K.L - 0.2, kEase.suave);
  // cierre: la ballena sigue nadando en bucle
  const pC = ((T - K.C) / 5.0) % 1;
  // conteo de crías (85) que pasan frente al faro
  const nCrias = Math.round(85 * kprog(T, K.Cr + 0.5, K.Cr + 5.5));
  // población: 27 íconos (1 = 1,000 ballenas)
  const vivas = T < K.M ? klerp(27, 13, kprog(T, K.Po + 1.6, K.Po + 3.2, kEase.suave)) : klerp(13, 17.75, kprog(T, K.M + 0.3, K.M + 2.2, kEase.suave));
  const icono = (i, x, y) => { const f = kclamp(vivas - i, 0, 1); return <g key={i} transform={`translate(${x} ${y}) scale(0.19)`} opacity={0.18 + 0.82 * f}><BallenaGris T={T + i} color={f > 0.5 ? '#8b96a1' : '#c9cfd5'} /></g>; };
  const rejilla = Array.from({ length: 27 }, (_, i) => icono(i, 150 + (i % 9) * 98, 800 + Math.floor(i / 9) * 110));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un año de su vida en un mapa */}
      <Escena T={T} a={K.G} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform={MAPA}><Mapa T={T} ruta={pG} ballena={bal(pG)} /></g>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el Ártico: mares de Bering y Chukchi */}
      <Escena T={T} a={K.A} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform="translate(420 760) scale(1.9) translate(-410 -330)"><Mapa T={T} comida={kprog(T, K.A + 1.0, K.A + 2.0)} ruta={0.2} ballena={{ x: 395 + Math.sin(T) * 10, y: 455, ang: 0, s: 0.14 }} />
          <text x={418} y={205} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>Mar de Chukchi</text>
          <text x={300} y={505} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>Mar de Bering</text></g>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · cómo come: de lado, lodo del fondo, barbas, anfípodos */}
      <Escena T={T} a={K.Co} b={K.V} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#123a5c, #0d1424 70%)' }}></div>
        {svg(<>
          <path d="M 0 1000 Q 270 970 540 990 T 1080 985 L 1080 1920 L 0 1920 Z" fill="#6b4a2e" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, i) => <Anfipodo key={i} x={60 + i * 105} y={1030 + (i % 3) * 30} s={0.6} rot={i * 25} o={0.9} />)}
          <g transform={`translate(640 ${840 + Math.sin(T * 1.5) * 6}) scale(-1.25 ${1.25 * klerp(1, 0.75, kprog(T, K.Co + 0.2, K.Co + 1.2))}) rotate(22)`}><BallenaGris T={T} /></g>
          {Array.from({ length: 9 }, (_, i) => { const u = ((T - K.Co) * 0.6 + i / 9) % 1; return <circle key={i} cx={400 + Math.sin(i * 2) * 60 + u * 80} cy={985 - u * 160} r={20 + u * 50} fill="#8a6a48" opacity={0.55 * (1 - u)} />; })}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      <Lupa T={T} at={K.Co + 2.0} until={K.V - 0.2} x={300} y={560} r={210} fx={395} fy={950} zoom={6} tinte={KC.yellow} etiqueta="BARBAS"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1d2b3a" />
          {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M ${30 + i * 36} 0 L ${44 + i * 36} 0 L ${40 + i * 36} ${r * 2 - 40} Q ${34 + i * 36} ${r * 2 - 20} ${28 + i * 36} ${r * 2 - 40} Z`} fill="#e8d7a0" stroke={KC.ink} strokeWidth={3} />)}
          {Array.from({ length: 14 }, (_, i) => { const u = ((t * 0.8 + i / 14) % 1); return <circle key={i} cx={u * r * 2} cy={60 + (i * 53) % (r * 2 - 120)} r={6} fill="#8a6a48" />; })}
          {[[110, 140, 20], [250, 220, 160], [170, 300, 80]].map(([x, y, rot], i) => <Anfipodo key={i} x={x} y={y} s={0.9} rot={rot} />)}</svg>} />
      {/* 4 · el viaje al sur, pegada a la costa */}
      <Escena T={T} a={K.V} b={K.L}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform={MAPA}><Mapa T={T} ruta={pV} ballena={bal(pV)} /></g>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · las lagunas de Baja California Sur */}
      <Escena T={T} a={K.L} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<><g transform="translate(600 800) scale(2.6) translate(-930 -1230)"><Mapa T={T} ruta={1} rutaDesde={0.7} lagunas={kprog(T, K.L + 0.4, K.L + 2.6)} /></g>
          <g opacity={kprog(T, K.L + 2.8, K.L + 3.4)}>
            <g transform={`translate(${300 + Math.sin(T) * 12} 1060) scale(0.5)`}><BallenaGris T={T} /></g>
            <g transform={`translate(${430 + Math.sin(T + 1) * 12} 1100) scale(0.22)`}><BallenaGris T={T + 1} cria color="#6f7a85" /></g></g></>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Va} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={280} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 820)`}>?</text>
          {Array.from({ length: 5 }, (_, i) => <Anfipodo key={i} x={120 + i * 80} y={1100 + (i % 2) * 30} s={0.8} rot={i * 40} o={1 - kprog(T, K.P + 0.6 + i * 0.25, K.P + 1.2 + i * 0.25)} />)}</>)}
      </Escena>
      {/* 7 · 690 varadas, 316 en México */}
      <Escena T={T} a={K.Va} b={K.Cr}>
        <FondoLunares color={KC.cyan} />
        {svg(<><g transform={MAPA}><Mapa T={T} gris={0.7} ruta={1} puntos={kprog(T, K.Va + 0.4, K.Va + 3.0)} mexico={kprog(T, K.Va + 3.2, K.Va + 3.8)} /></g>
          <g opacity={kprog(T, K.Va + 4.0, K.Va + 4.6)} transform="translate(300 1110) scale(0.42)"><BallenaGris T={0} flaca={1} color="#a3acb5" /></g></>)}
        <EscalaFija texto="mapa esquemático · 1 punto = 10 ballenas" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · 85 crías frente al faro (centro de California, 2025) */}
      <Escena T={T} a={K.Cr} b={K.Po}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <path d="M 760 0 Q 720 400 780 760 Q 820 1000 760 1300 L 1080 1300 L 1080 0 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} />
          <Faro x={850} y={900} T={T} />
          {Array.from({ length: 4 }, (_, i) => { const u = ((T - K.Cr) * 0.32 + i / 4) % 1, yy = 1300 - u * 1200;
            return T > K.Cr + 0.3 && <g key={i} opacity={Math.min(1, u * 6, (1 - u) * 6)}>
              <g transform={`translate(500 ${yy}) rotate(-90) scale(0.4)`}><BallenaGris T={T + i} /></g>
              <g transform={`translate(575 ${yy + 70}) rotate(-90) scale(0.18)`}><BallenaGris T={T + i} cria color="#6f7a85" /></g></g>; })}
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · población: ~27,000 (2016) → ~13,000 (2025) */}
      <Escena T={T} a={K.Po} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{rejilla}</>)}
      </Escena>
      {/* 10 · misterio: ~17,750 en 2026 */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{rejilla}</>)}
      </Escena>
      {/* 11 · cierre: el mismo mapa, ruta completa y un Ártico lleno de comida */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform={MAPA}><Mapa T={T} ruta={1} comida={kprog(T, K.C + 0.8, K.C + 2.2)} lagunas={1} ballena={bal(pC)} /></g>)}
        <EscalaFija texto="mapa esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.8} until={K.A - 0.2} valor={16000} dur={4} etiqueta="ida y vuelta:" sufijo=" km" x={330} y={880} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.G + 0.3} until={K.A - 0.2} texto="1 año de ballena gris" y={1130} x={330} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.A + 0.3} until={K.Co - 0.2} texto="verano: a comer en el Ártico" y={300} x={560} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.4} until={K.Co - 0.2} x={140} y={1130} texto="anfípodos" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.3} until={K.V - 0.2} texto="se pone de lado y chupa lodo" y={300} x={540} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.Co + 2.6} until={K.V - 0.2} texto="130 a 180 barbas por lado" y={830} x={300} tam={26} borde={KC.yellow} />
      <Etq T={T} at={K.Co + 3.2} until={K.V - 0.2} x={130} y={1100} texto="anfípodos (crustáceos)" lado="der" tam={30} color={KC.texto} />
      <Chip T={T} at={K.V + 0.3} until={K.L - 0.2} texto="del Ártico a Baja California Sur" y={1130} x={380} tam={30} borde={KC.ink} />
      {BG_LAGUNAS.map((l, i) => { const sx = 600 + 2.6 * (l.x - 930), sy = 800 + 2.6 * (l.y - 1230);
        return <Etq key={i} T={T} at={K.L + 0.6 + i * 0.7} until={K.P - 0.2} x={sx - 24} y={sy} texto={l.n} lado="izq" tam={32} color={KC.ink} />; })}
      <Chip T={T} at={K.L + 3.0} until={K.P - 0.2} texto="enero y febrero: nacen las crías" y={300} x={480} tam={30} borde={KC.pink} />
      <Chip T={T} at={K.Va + 0.3} until={K.Cr - 0.2} texto="2019–2023 · mortandad inusual (NOAA)" y={300} x={560} tam={26} borde={KC.red} />
      <NumeroGigante T={T} at={K.Va + 0.4} until={K.Cr - 0.2} valor={690} dur={2.6} etiqueta="varadas:" x={330} y={860} tam={130} color={KC.red} />
      <Etq T={T} at={K.Va + 3.4} until={K.Cr - 0.2} x={830} y={1060} texto="316 en México" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Va + 4.2} until={K.Cr - 0.2} x={420} y={1180} texto="muchas de las revisadas: desnutrición" lado="der" tam={22} color={KC.ink} />
      <NumeroGigante T={T} at={K.Cr + 0.5} until={K.Po - 0.2} valor={nCrias} desde={nCrias} dur={0.01} etiqueta="crías estimadas, 2025:" x={300} y={560} tam={200} color={KC.yellow} />
      <Etq T={T} at={K.Cr + 1.0} until={K.Po - 0.2} x={1060} y={1090} texto="centro de California" lado="izq" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Cr + 4.0} until={K.Po - 0.2} texto="lo más bajo desde 1994" y={860} x={300} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Cr + 5.0} until={K.Po - 0.2} texto="rango estimado: 56 a 294" y={960} x={300} tam={24} borde={KC.ink} mono />
      <NumeroGigante T={T} at={K.Po + 0.2} until={K.Po + 1.6} valor={27000} desde={27000} dur={0.01} prefijo="≈" etiqueta="hacia 2016:" x={640} y={500} tam={150} color={KC.yellow} />
      <NumeroGigante T={T} at={K.Po + 1.6} until={K.M - 0.2} valor={13000} desde={27000} dur={1.6} prefijo="≈" etiqueta="2025:" x={640} y={500} tam={150} color={KC.red} />
      <Etq T={T} at={K.Po + 0.6} until={K.C - 0.2} x={140} y={1095} texto="1 ícono = 1,000 ballenas" lado="der" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.M + 0.2} until={K.C - 0.2} valor={17750} desde={13000} dur={2.0} prefijo="≈" etiqueta="2026:" x={400} y={500} tam={150} color={KC.mint} />
      <Chip T={T} at={K.M + 2.8} until={K.C - 0.2} texto="al parecer, más de lo que explican sus crías" y={700} x={420} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.M + 4.0} until={K.C - 0.2} texto="pregunta abierta (NOAA, jul 2026)" y={300} x={480} tam={26} borde={KC.yellow} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="16,000 km · un Ártico con comida" y={1130} x={420} tam={30} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Un año de ballena gris: *16,000 km.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.Co - 0.1} texto="Verano: *Bering y Chukchi.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.V - 0.1} texto="Lodo, barbas y *anfípodos.*" />
      <Subtitulo T={T} idx={3} at={K.V + 0.1} until={K.L - 0.1} texto="Baja por la costa *hasta Baja California Sur.*" />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.P - 0.1} texto="En las lagunas *nacen sus crías.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Va - 0.1} texto="¿Y si el Ártico *deja de darle de comer?*" />
      <Subtitulo T={T} idx={6} at={K.Va + 0.1} until={K.Cr - 0.1} texto="2019–2023: *690 varadas.*" />
      <Subtitulo T={T} idx={7} at={K.Cr + 0.1} until={K.Po - 0.1} texto="2025: *85 crías,* lo más bajo desde 1994." />
      <Subtitulo T={T} idx={8} at={K.Po + 0.1} until={K.M - 0.1} texto="De 27 mil *a 13 mil.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="2026: casi 18 mil. *¿Por qué?*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Su vida depende *del Ártico.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Artico + 0.6, CUES.Comida - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Comida + 2.6, CUES.Viaje - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Lagunas + 2.0, CUES.Pregunta - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Varadas + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Varadas + 2.5, CUES.Crias - 0.1, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Crias + 3.0, CUES.Poblacion - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Poblacion + 1.2, CUES.Misterio - 0.1, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Misterio + 2.0, CUES.Cierre - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_04_bajando_lentes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="48" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BallenaGrisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BallenaGrisShot /></CompositionStage></div>;
}
window.BallenaGrisApp = BallenaGrisApp;
