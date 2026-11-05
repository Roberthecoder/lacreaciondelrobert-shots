// Shot Fungi Mati #120 · Esa seta no salió tarde: el calendario de los hongos cambió — NARRADO
// (gancho 1 «Esto no es X: es Y» · formato N2 El número + N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Badge de 3 dígitos: MarcaAgua del kit con num="120" (se revisó en la hoja de cuadros que no se sale).

const TH = { cafe:'#8a5a2b', cafe2:'#5e3a1a', musgo:'#4caf50', azufre:'#f1d53a', azufre2:'#e29a2a', lamVerde:'#8f9a3c', papel:'#fffbe8', marca:'#2fbf5a', viejo:'#9a8f80' };

// Calendario de pared genérico (sin mes real): 5 semanas × 7 días. Los días ini..fin (0..34) van marcados = "días con setas".
// hoja 0..1 = la hoja de arriba se arranca y vuela (time-lapse del calendario).
function CalPared({ x, y, s = 1, ini = 10, fin = 20, hoja = 0, titulo = 'TEMPORADA DE HONGOS', nota, notaP = 0, color = TH.marca }) {
  const W = 400, H = 430, cw = 50, ch = 54, ox = 25, oy = 120;
  const celdas = Array.from({ length: 35 }, (_, i) => i);
  const vuela = hoja > 0 && hoja < 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={6} y={10} width={W} height={H} rx={18} fill={KC.ink} />
    <rect x={0} y={0} width={W} height={H} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={0} width={W} height={84} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[90, 200, 310].map((ax) => <rect key={ax} x={ax} y={-22} width={14} height={44} rx={7} fill="#c9c2b0" stroke={KC.ink} strokeWidth={4} />)}
    <text x={W / 2} y={56} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.paper}>{titulo}</text>
    {celdas.map((i) => { const c = i % 7, r = Math.floor(i / 7), on = i >= ini && i <= fin;
      return <g key={i}>
        <rect x={ox + c * cw + 3} y={oy + r * ch + 3} width={cw - 6} height={ch - 8} rx={8} fill={on ? color : '#ece5d6'} stroke={KC.ink} strokeWidth={on ? 3 : 1.5} />
        <text x={ox + c * cw + cw / 2} y={oy + r * ch + 34} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={on ? KC.ink : '#8d8576'}>{i + 1 <= 31 ? i + 1 : ''}</text>
      </g>; })}
    {vuela && <g transform={`translate(${hoja * 380} ${-hoja * 260}) rotate(${hoja * 40} 200 0)`} opacity={1 - hoja}>
      <rect x={0} y={84} width={W} height={H - 84} rx={10} fill="#f8f3e6" stroke={KC.ink} strokeWidth={5} />
    </g>}
    {nota && notaP > 0 && <g transform="rotate(-6 200 250)" opacity={notaP}>
      <rect x={-20} y={180} width={440} height={120} rx={14} fill={TH.papel} stroke={KC.ink} strokeWidth={6} />
      {nota.map((t, i) => <text key={i} x={200} y={232 + i * 48} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={i ? KC.red : KC.ink}>{t}</text>)}
    </g>}
  </g>;
}

// Piso del bosque (vista de frente): pasto, hojarasca y un tronco caído.
function PisoBosque({ y = 1150, T = 0 }) {
  const g = krng(31);
  const hojas = Array.from({ length: 22 }, () => ({ x: g() * 1080, r: g() * 40 - 20, s: 0.6 + g() * 0.6, c: ['#d9822b', '#b5651d', '#e0a43a', '#8a5a2b'][Math.floor(g() * 4)] }));
  return <g>
    <rect x={-200} y={y} width={1480} height={900} fill="#6b4a32" stroke={KC.ink} strokeWidth={8} />
    <rect x={-200} y={y + 60} width={1480} height={900} fill="#4e3422" />
    {Array.from({ length: 40 }, (_, i) => { const bx = i * 28 + 4; return <path key={i} d={`M ${bx} ${y + 4} q ${4 + mece(T, i, 0.3) * 4} -26 ${10} -40`} stroke="#2f9e44" strokeWidth={5} fill="none" strokeLinecap="round" />; })}
    <g transform={`translate(560 ${y - 70})`}>
      <rect x={0} y={0} width={560} height={110} rx={30} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
      {[28, 56, 82].map((yy, i) => <path key={i} d={`M 50 ${yy} Q 280 ${yy - 12} 540 ${yy + 4}`} stroke="#5a3416" strokeWidth={6} fill="none" />)}
      <ellipse cx={0} cy={55} rx={36} ry={55} fill="#d9a86a" stroke={KC.ink} strokeWidth={8} />
      <ellipse cx={0} cy={55} rx={20} ry={32} fill="none" stroke="#a8743c" strokeWidth={4} />
      <path d="M 120 0 q 30 -16 70 -6 q 40 10 90 -2" stroke={TH.musgo} strokeWidth={12} fill="none" strokeLinecap="round" />
    </g>
    {hojas.map((h, i) => <ellipse key={i} cx={h.x} cy={y + 2} rx={30 * h.s} ry={10 * h.s} transform={`rotate(${h.r} ${h.x} ${y + 2})`} fill={h.c} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}

// Canasta de recolector (cierre).
function Canasta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -70 Q 0 -230 110 -70" stroke="#8a5a2b" strokeWidth={14} fill="none" />
    <path d="M -130 -70 L 130 -70 L 100 40 L -100 40 Z" fill="#c98b4a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-36, -6, 24].map((yy) => <line key={yy} x1={-124 + (yy + 70) * 0.27} y1={yy} x2={124 - (yy + 70) * 0.27} y2={yy} stroke="#8a5a2b" strokeWidth={5} />)}
  </g>;
}

// Esporas alargadas que caen de las láminas (esquemáticas).
function Esporas({ T, x, y, desde, n = 18, ancho = 220, caida = 380 }) {
  if (T < desde) return null;
  const g = krng(77);
  return <g>{Array.from({ length: n }, (_, i) => { const t0 = desde + g() * 1.6, dx = (g() - 0.5) * ancho, vel = 0.6 + g() * 0.6; const u = (T - t0) * vel;
    if (u <= 0 || u > 1.6) return null;
    return <ellipse key={i} cx={x + dx + mece(T, i, 0.6) * 18} cy={y + u * caida} rx={5} ry={10} fill="#6b3d1e" stroke={KC.ink} strokeWidth={1.5} opacity={1 - kprog(u, 1.2, 1.6)} transform={`rotate(${mece(T, i + 5, 0.5) * 40} ${x + dx} ${y + u * caida})`} />; })}</g>;
}

// Penacho de azufre (Hypholoma fasciculare): ramillete de setas amarillo azufre con el centro más naranja, sobre un tocón.
function Azufre({ T, x, y, at, s = 1 }) {
  const pts = [[-90, 0, 0.8, -22], [-40, -6, 1.0, -8], [10, -10, 1.1, 4], [60, -4, 0.95, 16], [105, 2, 0.75, 28], [-10, 6, 0.7, -2]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 0 L -150 -120 Q 0 -150 150 -120 L 170 0 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-122} rx={152} ry={30} fill="#d9a86a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-122} rx={90} ry={16} fill="none" stroke="#a8743c" strokeWidth={4} />
    <g transform="translate(0 -128)">
      {pts.map(([dx, dy, k, r], i) => { const c = kprog(T, at + i * 0.12, at + i * 0.12 + 0.7); if (c <= 0) return null;
        return <g key={i}>
          <Seta x={dx} y={dy} s={k} rot={r + mece(T, i + 2, 0.4) * 2} crece={c} sombrero={TH.azufre} pie="#e9d76e" escamas={false} anillo={false} alto={130} ancho={120} laminas={TH.lamVerde} />
          {c > 0.7 && <ellipse cx={dx + Math.sin(r * Math.PI / 180) * 130 * k} cy={dy - 130 * k - 34 * k} rx={18 * k} ry={10 * k} fill={TH.azufre2} opacity=".85" />}
        </g>; })}
    </g>
  </g>;
}

// Silueta muy esquemática de Gran Bretaña con un punto en el sur (Salisbury).
function MapaGB({ x, y, s = 1, punto = 1 }) {
  const d = 'M 120 0 Q 150 20 140 60 Q 175 90 160 130 Q 200 170 190 220 Q 230 260 220 300 Q 260 330 250 370 Q 200 380 150 375 Q 90 390 60 370 Q 100 340 90 300 Q 60 270 80 230 Q 50 190 70 150 Q 40 110 70 70 Q 80 20 120 0 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={160} cy={345} r={16 * kEase.rebote(kclamp(punto, 0, 1))} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Silueta esquemática de Noruega (alargada, costa recortada).
function MapaNoruega({ x, y, s = 1, punto = 1 }) {
  const d = 'M 300 0 Q 340 30 330 80 Q 300 110 280 150 Q 250 200 230 260 Q 200 320 190 380 Q 170 430 150 480 Q 120 540 80 560 Q 30 580 20 540 Q 10 500 40 470 Q 60 420 90 380 Q 120 320 150 270 Q 190 200 220 140 Q 250 80 300 0 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[60, 520], [110, 440], [170, 330], [230, 210]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={11 * kEase.rebote(kclamp(punto * 1.5 - i * 0.15, 0, 1))} fill={KC.blue} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}

// Franja de meses (eje de calendario). meses = etiquetas; x0..x1 en pantalla.
function EjeMeses({ x0, x1, y, meses, color = KC.ink }) {
  const w = (x1 - x0) / meses.length;
  return <g>
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={color} strokeWidth={6} />
    {meses.map((m, i) => <g key={i}>
      <line x1={x0 + i * w} y1={y - 10} x2={x0 + i * w} y2={y + 10} stroke={color} strokeWidth={4} />
      <text x={x0 + i * w + w / 2} y={y + 42} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={color}>{m}</text>
    </g>)}
  </g>;
}

// Hifas de cerca dentro de un círculo (inserto): tubos con septos que crecen. p 0..1.
function InsertoHifas({ T, cx, cy, r = 190, p = 1 }) {
  const rutas = [[[-200, 60], [-80, 20], [20, -30], [120, -90], [210, -120]], [[-80, 20], [-40, 110], [10, 200]], [[20, -30], [80, 40], [200, 70]], [[-200, -80], [-110, -110], [-20, -170]]];
  const id = 'insH' + Math.round(cx);
  return <g opacity={kprog(p, 0, 0.1)}>
    <defs><clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
    <circle cx={cx} cy={cy} r={r} fill="#0b1220" />
    <g clipPath={`url(#${id})`} transform={`translate(${cx} ${cy})`}>
      {rutas.map((ru, i) => { const q = kclamp(p * 1.3 - i * 0.15, 0, 1); if (q <= 0) return null; const k = Math.max(2, Math.ceil(ru.length * q)); const pts = ru.slice(0, k);
        const d = 'M ' + pts.map((z) => z.join(' ')).join(' L ');
        return <g key={i}>
          <path d={d} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke="#eafff7" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {pts.slice(1).map((z, j) => { const a = pts[j], mx = (a[0] + z[0]) / 2, my = (a[1] + z[1]) / 2, an = Math.atan2(z[1] - a[1], z[0] - a[0]);
            return <g key={j}><line x1={mx - Math.sin(an) * 13} y1={my + Math.cos(an) * 13} x2={mx + Math.sin(an) * 13} y2={my - Math.cos(an) * 13} stroke="#8fbfb0" strokeWidth={4} />
              <circle cx={klerp(a[0], z[0], 0.3)} cy={klerp(a[1], z[1], 0.3) + mece(T, i * 5 + j, 0.3) * 3} r={5} fill={KC.lilac} /></g>; })}
        </g>; })}
    </g>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={KC.mint} strokeWidth={8} />
  </g>;
}

// Gota de humedad que se llena (nivel 0..1).
function GotaHumedad({ x, y, nivel = 0, s = 1 }) {
  const d = 'M 0 -110 C 40 -50 70 -10 70 30 C 70 75 38 100 0 100 C -38 100 -70 75 -70 30 C -70 -10 -40 -50 0 -110 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="gotaClip"><path d={d} /></clipPath></defs>
    <path d={d} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={100 - 210 * nivel} width={160} height={220} fill={KC.cyan} clipPath="url(#gotaClip)" />
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// barras de la temporada (Numero): px por día
const PXD = 8.6;
// especies del calendario (Calendario): inicio y fin en "días desde el 1 de agosto"; antes (gris) y ahora (color)
const SP = (() => { const g = krng(120); return Array.from({ length: 26 }, () => { const a = 40 + g() * 50, l = 18 + g() * 25; return { a, b: a + l, da: 6 + g() * 14, db: 6 + g() * 16, prim: g() < 0.35 }; }); })();

function TemporadaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Numero, S: CUES.Seta, M: CUES.Micelio, Se: CUES.Senal, P: CUES.Pregunta, Li: CUES.Libreta, E: CUES.Estudio, Ca: CUES.Calendario, D: CUES.DosVeces, No: CUES.Noruega, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la seta brota y el calendario pasa hojas; la marca se recorre (empieza antes, termina después)
  const brota = kprog(T, K.G + 0.1, K.G + 1.0);
  const corre = kprog(T, K.G + 1.2, K.G + 3.0, kEase.suave);
  const hojaG = ((T - K.G - 0.5) % 0.7) / 0.7;
  // micelio: la cámara baja al suelo
  const baja = kprog(T, K.M - 0.2, K.M + 1.6, kEase.suave);
  const supM = klerp(1150, 520, baja);
  const senalP = kprog(T, K.Se + 0.4, K.Se + 2.6);
  const libre = kprog(T, K.Se + 2.4, K.Se + 3.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: claro del bosque, la seta brota y el calendario cambia */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PisoBosque y={1150} T={T} />
          <CalPared x={70} y={430} s={1} ini={Math.round(klerp(12, 7, corre))} fin={Math.round(klerp(18, 26, corre))} hoja={T > K.G + 0.5 && T < K.G + 3.0 ? hojaG : 0} />
          <Seta x={360} y={1152} s={1.7} crece={brota} rot={mece(T, 3, 0.4) * 2} />
          {brota > 0 && brota < 1 && <circle cx={360} cy={1150} r={30 + brota * 90} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - brota} />}
        </>)}
      </Escena>
      {/* 2 · el número: 33 días en los 50 → más del doble en los 2000 (sur de Inglaterra) */}
      <Escena T={T} a={K.N} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaGB x={800} y={760} s={0.62} punto={kprog(T, K.N + 0.3, K.N + 0.8)} />
          {(() => { const b1 = kprog(T, K.N + 1.0, K.N + 1.8, kEase.sale), b2 = kprog(T, K.N + 1.3, K.N + 2.1, kEase.sale), b2b = kprog(T, K.N + 4.0, K.N + 5.4, kEase.sale);
            const w1 = 33 * PXD * b1, w2 = klerp(33, 69, b2b) * PXD * b2;
            return <>
              <text x={80} y={860} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>años 50</text>
              <rect x={80} y={880} width={w1} height={70} rx={14} fill={TH.viejo} stroke={KC.ink} strokeWidth={6} />
              <text x={80} y={1030} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>años 2000</text>
              <rect x={80} y={1050} width={w2} height={70} rx={14} fill={TH.marca} stroke={KC.ink} strokeWidth={6} />
              {b2b > 0.05 && <path d={`M ${80 + 33 * PXD} 1040 L ${80 + 33 * PXD} 1130`} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />}
            </>; })()}
        </>)}
      </Escena>
      {/* 3 · la seta: lo que cortas es solo la parte que suelta esporas */}
      <Escena T={T} a={K.S} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <PisoBosque y={1150} T={T} />
          {(() => { const corte = kprog(T, K.S + 0.6, K.S + 1.2, kEase.sale); return <>
            <g transform={`translate(${corte * 60} ${-corte * 120}) rotate(${corte * 10} 400 1100)`}>
              <Seta x={400} y={1152 - corte * 20} s={2.4} crece={1} />
            </g>
            {corte > 0 && <rect x={386} y={1128} width={30} height={24} fill={FK.crema} stroke={KC.ink} strokeWidth={4} />}
            <Esporas T={T} x={400 + corte * 60} y={760} desde={K.S + 1.4} n={22} ancho={260} caida={330} />
          </>; })()}
        </>)}
      </Escena>
      {/* 4–5 · por dentro: bajamos al suelo; el micelio y la señal (fondo oscuro: lo microscópico) */}
      <Escena T={T} a={K.M} b={K.P} zoom={0.03}>
        <MundoSuelo T={T} red={kprog(T, K.M + 0.3, K.M + 3.4)} brillo={kprog(T, K.M + 1.0, K.M + 2.0) * 0.8} sup={supM} cielo={KC.pink} seed={12} escala={0.42} ox={540} />
        <div style={{ position:'absolute', left:0, top:supM + 10, width:KW, height:KH, background:'rgba(13,20,36,.55)', opacity:baja }}></div>
        {fsvg(<>
          {/* trocito de madera enterrada */}
          <g transform={`translate(760 ${supM + 330})`} opacity={kprog(T, K.M + 1.2, K.M + 1.8)}>
            <rect x={-120} y={-40} width={260} height={80} rx={24} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={-120} cy={0} rx={20} ry={40} fill="#d9a86a" stroke={KC.ink} strokeWidth={6} />
          </g>
          {T < K.Se + 0.3 && <InsertoHifas T={T} cx={330} cy={supM + 520} r={185} p={kprog(T, K.M + 2.0, K.M + 3.6)} />}
          {/* la señal: termómetro y gota que suben; el nudo de hifas se enciende y la seta empuja */}
          {T > K.Se - 0.2 && <g opacity={kprog(T, K.Se - 0.2, K.Se + 0.3)}>
            <g transform="translate(120 340)">
              <rect x={-30} y={0} width={60} height={300} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={7} />
              <rect x={-14} y={300 - 280 * senalP} width={28} height={280 * senalP} rx={14} fill={KC.red} />
              <circle cx={0} cy={330} r={46} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
              <path d="M 40 70 L 70 70" stroke={KC.ink} strokeWidth={6} /><text x={78} y={80} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>señal</text>
            </g>
            <GotaHumedad x={380} y={500} nivel={senalP} s={0.95} />
            {(() => { const nudo = kprog(T, K.Se + 2.4, K.Se + 3.0), sube = kprog(T, K.Se + 2.8, K.Se + 3.8, kEase.sale);
              return <>
                <circle cx={620} cy={supM + 70} r={22 + 10 * nudo + Math.sin(T * 8) * 3 * nudo} fill={KC.gold2} opacity={nudo} style={{ filter:`drop-shadow(0 0 ${18 * nudo}px ${KC.gold})` }} />
                <Seta x={620} y={supM + 6} s={1.1} crece={sube * 0.9} />
              </>; })()}
          </g>}
          {/* si el clima cambia: la marca de la señal se recorre en el calendario */}
          {T > K.Se + 3.6 && (() => { const o = kprog(T, K.Se + 3.6, K.Se + 4.1), mv = kprog(T, K.Se + 4.6, K.Se + 5.8, kEase.suave), x0 = 120, x1 = 960, w = (x1 - x0) / 5, xm = klerp(x0 + w * 1.6, x0 + w * 2.5, mv);
            return <g opacity={o} transform={`translate(0 ${supM + 330})`}>
              <rect x={x0 - 30} y={-80} width={x1 - x0 + 60} height={190} rx={22} fill="rgba(14,15,18,.85)" stroke={KC.mint} strokeWidth={5} />
              <EjeMeses x0={x0} x1={x1} y={40} meses={['AGO', 'SEP', 'OCT', 'NOV', 'DIC']} color={KC.texto} />
              {mv > 0.05 && <rect x={x0 + w * 1.6 - 18} y={-50} width={36} height={70} rx={10} fill="none" stroke={KC.texto} strokeWidth={4} strokeDasharray="8 6" opacity=".6" />}
              <rect x={xm - 18} y={-50} width={36} height={70} rx={10} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
              {mv > 0.1 && <path d={`M ${x0 + w * 1.6 + 26} -15 L ${xm - 26} -15`} stroke={KC.gold2} strokeWidth={6} markerEnd="" />}
            </g>; })()}
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Li} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} tam={520} />)}
      </Escena>
      {/* 7–8 · la libreta de Edward Gange y el estudio de 2007 */}
      <Escena T={T} a={K.Li} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {(() => { const enc = kprog(T, K.E + 0.2, K.E + 1.0, kEase.suave); const filas = Math.floor(kprog(T, K.Li + 0.5, K.E, (p) => p) * 9);
            return <g transform={`translate(${klerp(80, 60, enc)} ${klerp(560, 900, enc)}) scale(${klerp(1, 0.62, enc)}) rotate(${-3 + enc * 3})`}>
              <rect x={8} y={12} width={480} height={560} rx={16} fill={KC.ink} />
              <rect x={0} y={0} width={480} height={560} rx={16} fill={TH.papel} stroke={KC.ink} strokeWidth={7} />
              <rect x={0} y={0} width={46} height={560} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: 9 }, (_, i) => <g key={i}>
                <line x1={66} y1={70 + i * 54} x2={460} y2={70 + i * 54} stroke="#c9d6f0" strokeWidth={3} />
                {i < filas && <>
                  <text x={70} y={62 + i * 54} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>{`${1950 + i * 7}`}</text>
                  <path d={`M 150 ${54 + i * 54} q 20 -12 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} stroke="#3a3a7a" strokeWidth={4} fill="none" />
                  <g transform={`translate(420 ${62 + i * 54}) scale(.32)`}><Seta x={0} y={0} crece={1} escamas={false} anillo={false} /></g>
                </>}
              </g>)}
            </g>; })()}
          {/* la libreta se vuelve gráfica: puntos que suben */}
          {T > K.E + 1.0 && <g opacity={kprog(T, K.E + 1.0, K.E + 1.6)}>
            <rect x={420} y={880} width={560} height={300} rx={18} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={6} />
            <line x1={460} y1={1140} x2={950} y2={1140} stroke={KC.ink} strokeWidth={5} />
            <line x1={460} y1={1140} x2={460} y2={910} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 12 }, (_, i) => { const on = kprog(T, K.E + 1.4 + i * 0.12, K.E + 1.6 + i * 0.12); return <circle key={i} cx={490 + i * 38} cy={1110 - i * 14 - Math.sin(i * 2.1) * 12} r={11 * on} fill={TH.marca} stroke={KC.ink} strokeWidth={3} />; })}
            <text x={700} y={1172} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>1950 → 2005 · esquemático</text>
          </g>}
        </>)}
      </Escena>
      {/* 9–10 · el calendario de 315 especies; y dos veces al año */}
      <Escena T={T} a={K.Ca} b={K.No} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {(() => { const abre = kprog(T, K.Ca + 1.6, K.Ca + 4.2, kEase.suave), ano = kprog(T, K.D - 0.1, K.D + 0.8, kEase.suave);
            // eje: AGO–DIC (5 meses) → todo el año (12 meses)
            const x0 = 110, x1 = 980, dias = klerp(153, 365, ano), off = klerp(212, 0, ano); // off = día del año donde empieza el eje (1 ago ≈ 212)
            const px = (d) => x0 + (d + 212 - off) / dias * (x1 - x0);
            const meses = ano < 0.5 ? ['AGO', 'SEP', 'OCT', 'NOV', 'DIC'] : ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
            return <g opacity={1 - kprog(T, K.D + 0.6, K.D + 1.0) * 0.75}>
              <rect x={x0 - 40} y={700} width={x1 - x0 + 80} height={480} rx={22} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} />
              {SP.map((sp, i) => { const a = sp.a - sp.da * abre, b = sp.b + sp.db * abre, yy = 730 + i * 14;
                return <g key={i}>
                  <line x1={px(a)} y1={yy} x2={px(b)} y2={yy} stroke={mixHex(TH.viejo, KC.violet, abre)} strokeWidth={9} strokeLinecap="round" />
                  {sp.prim && ano > 0.6 && <line x1={px(-130)} y1={yy} x2={px(-130 + 20 * kprog(T, K.D + 0.6 + i * 0.03, K.D + 1.0 + i * 0.03))} y2={yy} stroke={KC.pink} strokeWidth={9} strokeLinecap="round" />}
                </g>; })}
              <EjeMeses x0={x0} x1={x1} y={1110} meses={meses} />
              {abre > 0.2 && abre < 1.01 && T < K.D && <>
                <path d={`M ${px(48)} 1090 L ${px(30)} 1090`} stroke={KC.blue} strokeWidth={8} /><path d={`M ${px(30) - 2} 1090 l 18 -12 l 0 24 Z`} fill={KC.blue} />
                <path d={`M ${px(75)} 1090 L ${px(95)} 1090`} stroke={KC.red} strokeWidth={8} /><path d={`M ${px(95) + 2} 1090 l -18 -12 l 0 24 Z`} fill={KC.red} />
              </>}
            </g>; })()}
          {T > K.D + 0.5 && <Azufre T={T} x={420} y={1170} at={K.D + 0.6} s={1.15} />}
        </>)}
      </Escena>
      {/* 11 · Noruega: la fructificación de otoño se atrasó */}
      <Escena T={T} a={K.No} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaNoruega x={60} y={560} s={0.95} punto={kprog(T, K.No + 0.2, K.No + 1.0)} />
          {(() => { const mv = kprog(T, K.No + 2.6, K.No + 4.0, kEase.suave), x0 = 420, x1 = 1010, w = (x1 - x0) / 5, d2x = (d) => x0 + d / 153 * (x1 - x0), base = 52, xm = d2x(base + 12.9 * mv);
            return <g opacity={kprog(T, K.No + 2.2, K.No + 2.6)}>
              <rect x={x0 - 24} y={880} width={x1 - x0 + 40} height={210} rx={20} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} />
              <EjeMeses x0={x0} x1={x1} y={1020} meses={['AGO', 'SEP', 'OCT', 'NOV', 'DIC']} />
              <line x1={d2x(base)} y1={910} x2={d2x(base)} y2={1000} stroke={TH.viejo} strokeWidth={6} strokeDasharray="8 6" />
              <circle cx={xm} cy={955} r={26} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
              {mv > 0.1 && <path d={`M ${d2x(base) + 6} 955 L ${xm - 30} 955`} stroke={KC.ink} strokeWidth={5} />}
            </g>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo claro del inicio, el calendario ya cambiado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PisoBosque y={1150} T={T} />
          <CalPared x={70} y={430} s={1} ini={7} fin={26} nota={['su calendario lo marca', 'sobre todo el clima']} notaP={kprog(T, K.C + 2.2, K.C + 2.8)} />
          <Seta x={360} y={1152} s={1.7} crece={1} rot={mece(T, 3, 0.4) * 2} />
          <Canasta x={180} y={1190} s={0.8 * kprog(T, K.C + 0.8, K.C + 1.3, kEase.rebote)} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.4} until={K.N - 0.3} texto="NO SALIÓ TARDE" x={270} y={960} tam={46} borde={KC.red} />
      <Chip T={T} at={K.N + 0.1} until={K.S - 0.3} texto="SUR DE INGLATERRA" x={300} y={360} tam={30} borde={KC.ink} mono />
      <NumeroGigante T={T} at={K.N + 0.6} until={K.N + 3.9} valor={33} dur={0.9} sufijo=" días" etiqueta="temporada de setas, años 50" x={380} y={600} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.N + 4.0} until={K.S - 0.3} texto="unos 33 días → más del doble" x={420} y={600} tam={40} borde={TH.marca} />
      <Etq T={T} at={K.N + 1.0} until={K.S - 0.3} x={800} y={1010} texto="Salisbury" tam={26} color={KC.ink} lado="izq" />
      <Etq T={T} at={K.S + 0.4} until={K.M - 0.3} x={600} y={560} texto="seta = cuerpo fructífero" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 1.6} until={K.M - 0.3} x={600} y={900} texto="esporas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 0.5} until={K.Se - 0.3} texto="POR DENTRO · EL SUELO" x={380} y={420} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={K.M + 1.4} until={K.Se - 0.3} x={80} y={supM + 200} texto="micelio · red de hifas" tam={30} color={KC.mint} />
      <Etq T={T} at={K.M + 1.8} until={K.Se - 0.3} x={900} y={supM + 260} texto="madera" tam={28} color={KC.texto} lado="izq" />
      <Etq T={T} at={K.M + 2.4} until={K.Se + 0.2} x={540} y={supM + 470} texto="hifa (un hilo)" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Se + 0.5} until={K.Se + 3.6} x={480} y={420} texto="temperatura + humedad" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Se + 2.6} until={K.Se + 3.6} x={680} y={supM - 200} texto="primordio: la seta empieza" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Se + 4.2} until={K.P - 0.3} texto="clima distinto → otra fecha" x={460} y={supM + 180} tam={36} borde={KC.gold2} />
      <Etq T={T} at={K.Li + 0.3} until={K.E - 0.2} x={80} y={500} texto="Edward Gange · aficionado" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.Li + 2.8} until={K.E - 0.2} valor={52000} desde={0} dur={2.4} etiqueta="registros" x={800} y={880} tam={110} color={TH.marca} />
      <Chip T={T} at={K.Li + 1.6} until={K.E - 0.2} texto="Salisbury · 1950–2005" x={800} y={1040} tam={30} borde={KC.ink} mono />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.Ca - 0.3} anio="2007" quien="Gange, Gange, Sparks y Boddy" revista="Science, 2007 · 56 años de registros" x={540} y={600} />
      <Chip T={T} at={K.Ca + 0.3} until={K.D - 0.2} texto="315 especies · en promedio" x={380} y={480} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 2.2} until={K.D - 0.2} x={110} y={600} texto="← primera seta: antes" tam={28} color={KC.blue} />
      <Etq T={T} at={K.Ca + 2.6} until={K.D - 0.2} x={110} y={645} texto="última seta: después →" tam={28} color={KC.red} />
      <Chip T={T} at={K.D + 0.4} until={K.No - 0.3} texto="muchas: 2 veces al año" x={380} y={520} tam={38} borde={KC.pink} />
      <Etq T={T} at={K.D + 1.0} until={K.No - 0.3} x={620} y={1010} texto="penacho de azufre" tam={26} color={KC.ink} />
      <Etq T={T} at={K.D + 1.2} until={K.No - 0.3} x={620} y={1050} texto="Hypholoma fasciculare" it tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.No + 0.3} until={K.No + 2.2} anio="2008" quien="Kauserud y col. · Noruega" revista="PNAS, 2008 · ≈34,500 registros de herbario" x={560} y={620} />
      <Etq T={T} at={K.No + 0.6} until={K.C - 0.3} x={330} y={530} texto="Noruega" tam={30} color={KC.ink} />
      <Chip T={T} at={K.No + 3.0} until={K.C - 0.3} texto="setas de otoño: +12.9 días" x={700} y={800} tam={34} borde={KC.blue} />
      <Etq T={T} at={K.No + 3.4} until={K.C - 0.3} x={460} y={1140} texto="promedio desde 1980" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="el calendario cambió" x={300} y={960} tam={40} borde={TH.marca} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.S} texto="1 día = una rayita" largo={PXD} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.M} texto="5 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.M + 2.0} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.M + 2.0} until={K.Se + 0.3} texto="inserto: 10 µm (esquemático)" largo={70} />
      <BarraEscala T={T} at={K.Se + 0.3} until={K.P} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.Li} until={K.Ca} texto="libreta: esquemática" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ca} until={K.D} texto="eje: días del año" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.D} until={K.No} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.No} until={K.C} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={150} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No salió tarde: *el calendario cambió.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.S - 0.1} texto="Unos 33 días… y luego *más del doble.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.M - 0.1} texto="Cortas solo la seta: *suelta esporas.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.Se - 0.1} texto="El hongo de verdad: *el micelio.*" />
      <Subtitulo T={T} idx={4} at={K.Se + 0.1} until={K.Se + 3.6} texto="Temperatura y humedad: *la señal.*" />
      <Subtitulo T={T} idx={5} at={K.Se + 3.7} until={K.P - 0.1} texto="Otro clima, *otra fecha.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Li - 0.1} texto="¿Y cómo *lo sabemos?*" />
      <Subtitulo T={T} idx={7} at={K.Li + 0.1} until={K.E - 0.1} texto="56 años de notas: *52 mil registros.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ca - 0.1} texto="2007: analizados en *Science.*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.D - 0.1} texto="Empieza *antes,* termina *después.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.No - 0.1} texto="Muchas: *dos veces al año.*" />
      <Subtitulo T={T} idx={11} at={K.No + 0.1} until={K.C - 0.1} texto="Noruega: *casi 13 días* más tarde." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo marca sobre todo *el clima.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 4.0, K.N + 6.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.6, K.M + 4.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Se + 4.0, K.Se + 7.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Li - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Li + 3.5, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ca + 2.0, K.Ca + 5.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.D + 0.1, K.No - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.No + 2.3, K.C - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.8, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="120" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TemporadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TemporadaShot /></CompositionStage></div>;
}
window.TemporadaApp = TemporadaApp;
