// Shot Fungi Mati #28 · Ese champiñón está disparando: la gota de Buller — NARRADO (gancho 1 "Esto no es X: es Y" + N3 Capítulos).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Morfología: Agaricus campestris (sombrero blanco, laminillas libres rosadas → café chocolate, pie blanco con anillo delgado,
// sin volva); basidios en forma de mazo con 4 esterigmas; esporas cafés elipsoides con apéndice hilar en la base.

const GB = { gill:'#c9826f', gill2:'#7a4a3a', espora:'#7b4a2e', espora2:'#a8693f', agua:'#9fe6ff', agua2:'#dff7ff', carne:'#efe2cf', carne2:'#d8c3a8', pasto:'#3fbf4a', tierra:'#6b4a2b' };

// Champiñón de campo de perfil. Base del pie en (x, y). esporas 0..1 = lluvia fina que cae de las laminillas.
function Campestris({ T, x, y, s = 1, esporas = 0, gotitas = false, chispas = 0, seed = 3 }) {
  const g = krng(seed); const P = Array.from({ length: 46 }, () => [g() * 420 - 210, g(), g()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -38 0 Q -46 -6 -40 -20 L -30 -300 L 30 -300 L 40 -20 Q 46 -6 38 0 Z" fill="#fbf8f1" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -32 -232 Q -64 -212 -54 -196 Q 0 -206 54 -196 Q 64 -212 32 -232 Z" fill="#fbf8f1" stroke={KC.ink} strokeWidth={5} />
    <path d="M -236 -300 Q 0 -232 236 -300 Q 0 -262 -236 -300 Z" fill={GB.gill} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 19 }, (_, i) => { const u = -1 + (i + 0.5) * 2 / 19; return <line key={i} x1={u * 228} y1={-300 + Math.abs(u) * 2} x2={u * 130} y2={-268 + Math.abs(u) * 10} stroke={GB.gill2} strokeWidth={4} />; })}
    <path d="M -246 -300 Q -250 -520 0 -540 Q 250 -520 246 -300 Q 0 -286 -246 -300 Z" fill="#fffdf8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 -470 Q -40 -520 90 -490" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
    {[[-120, -400], [-40, -440], [60, -420], [140, -380], [-170, -350], [10, -360]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={16} ry={6} fill="#e9e1d2" />)}
    {esporas > 0 && P.map(([px, v, w], i) => { const u = ((T * (0.35 + v * 0.3) + w) % 1); const yy = -272 + u * 520; return <circle key={i} cx={px * (1 - u * 0.15) + Math.sin(T * 2 + i) * 6} cy={yy} r={gotitas ? 5 : 4} fill={GB.espora} stroke={gotitas ? GB.agua : 'none'} strokeWidth={2} opacity={esporas * (u < 0.08 ? u / 0.08 : 1) * (1 - kprog(u, 0.8, 1))} />; })}
    {chispas > 0 && P.slice(0, 18).map(([px, v, w], i) => { const u = ((T * 1.4 + w) % 1); return <g key={i} opacity={chispas * (1 - u)} transform={`translate(${px * 0.95} ${-275 + u * 30})`}>
      <path d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="#fff" stroke={KC.ink} strokeWidth={1.5} transform={`scale(${0.6 + u})`} /></g>; })}
  </g>;
}

// Pasto y suelo del prado.
function Prado({ T, y = 1150 }) {
  return <g>
    <rect x={0} y={y} width={KW} height={KH - y} fill={GB.tierra} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 34 }, (_, i) => { const x = i * 33 + 6, h = 40 + (i * 37) % 50; return <path key={i} d={`M ${x - 9} ${y + 4} Q ${x + mece(T, i, 0.3) * 8} ${y - h} ${x + 9 + mece(T, i + 2, 0.3) * 10} ${y - h - 6} Q ${x + 4} ${y - h * 0.5} ${x + 9} ${y + 4} Z`} fill={i % 3 ? GB.pasto : '#2e9e3a'} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}

// Espora (local): punta del esterigma en (0,0); cuerpo hacia +x; cara adaxial = -y.
// gota 0..1 (gota de Buller), capa 0..1 (capa de agua sobre la espora), fusion 0..1, cm = mostrar el centro de masa.
function Espora({ gota = 0, capa = 0, fusion = 0, cm = 0, s = 1 }) {
  const rB = 58 * Math.sqrt(gota) * (1 - fusion * 0.85);
  const bx = klerp(26, 190, kEase.sale(fusion)), by = klerp(-34, -112, kEase.sale(fusion));
  const h = 20 * capa + 26 * fusion;
  const cmx = klerp(205, 214, fusion), cmy = klerp(10, -26, kEase.sale(fusion));
  return <g transform={`scale(${s})`}>
    <path d="M 0 0 Q 8 -16 34 -24" stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M 0 0 Q 8 -16 34 -24" stroke={GB.espora2} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M 30 -20 C 40 -96 150 -112 250 -104 C 360 -96 410 -40 400 24 C 390 100 290 140 190 134 C 90 128 24 70 30 -20 Z" fill={GB.espora} stroke={KC.ink} strokeWidth={8} />
    <path d="M 120 -70 Q 220 -92 320 -66" stroke={GB.espora2} strokeWidth={14} fill="none" strokeLinecap="round" opacity=".7" />
    {h > 0.5 && <path d={`M 90 -96 Q 210 ${-112 - h * 2.2} 330 -88 Q 210 -108 90 -96 Z`} fill={GB.agua} stroke={KC.ink} strokeWidth={4} opacity=".92" />}
    {rB > 1 && <g><circle cx={bx} cy={by} r={rB} fill={GB.agua} stroke={KC.ink} strokeWidth={5} opacity=".95" />
      <ellipse cx={bx - rB * 0.35} cy={by - rB * 0.35} rx={rB * 0.25} ry={rB * 0.15} fill="#fff" /></g>}
    {cm > 0 && <g opacity={cm}><circle cx={cmx} cy={cmy} r={16} fill={KC.red} stroke="#fff" strokeWidth={5} /><circle cx={cmx} cy={cmy} r={4} fill="#fff" /></g>}
  </g>;
}

// Basidio (mazo) que sale de la laminilla hacia +x desde (x,y). esporas = cuántas (0..4) se ven; tam = escala.
function Basidio({ x, y, s = 1, rot = 0, esporas = 4, crece = 1, color = '#f4e6d2', dispara = [] }) {
  const L = 230;
  const ang = [-52, -18, 18, 52];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 -26 C ${L * 0.5} -28 ${L * 0.7} -66 ${L} -60 Q ${L + 44} 0 ${L} 60 C ${L * 0.7} 66 ${L * 0.5} 28 0 26 Z`} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={L * 0.62} cy={0} r={16} fill="#d7b9a0" stroke={KC.ink} strokeWidth={3} opacity=".7" />
    {ang.map((a, i) => { const r = a * Math.PI / 180, bx = L + 20 + Math.cos(r) * 10, by = Math.sin(r) * 48;
      const tx = bx + Math.cos(r) * 58, ty = by + Math.sin(r) * 58; const k = kclamp(esporas - i, 0, 1) * crece;
      const fue = dispara[i] || 0;
      return <g key={i}>
        <path d={`M ${bx} ${by} Q ${bx + Math.cos(r) * 34} ${by + Math.sin(r) * 34 - 6} ${tx} ${ty}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={`M ${bx} ${by} Q ${bx + Math.cos(r) * 34} ${by + Math.sin(r) * 34 - 6} ${tx} ${ty}`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
        {k > 0 && fue < 1 && <g transform={`translate(${tx + fue * 900} ${ty}) rotate(${a * 0.6}) scale(${0.2 * kEase.rebote(k)})`}><Espora /></g>}
      </g>; })}
  </g>;
}

// Laminilla en corte (pared con células) vertical. lado: 'der' = los basidios salen hacia la derecha.
function Pared({ x, y0, y1, ancho = 150, lado = 'der' }) {
  const n = Math.floor((y1 - y0) / 60);
  return <g>
    <rect x={x} y={y0} width={ancho} height={y1 - y0} fill={GB.carne} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: n }, (_, i) => <path key={i} d={`M ${x + 10} ${y0 + 30 + i * 60} Q ${x + ancho / 2} ${y0 + 10 + i * 60 + (i % 2) * 20} ${x + ancho - 10} ${y0 + 34 + i * 60}`} stroke={GB.carne2} strokeWidth={6} fill="none" />)}
  </g>;
}

// Hongo de oreja (Auricularia) y levadura (Itersonilia), esquemáticos.
function Oreja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 -90 C 80 -110 120 -20 90 50 C 60 110 -30 110 -60 60 C -90 10 -70 -70 -10 -90 Z" fill="#8a5232" stroke={KC.ink} strokeWidth={6} />
    <path d="M -20 -50 C 30 -60 60 -10 40 40 C 20 70 -20 60 -30 30" stroke="#b7754b" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
function Levadura({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-50, 10, -20], [20, -20, 15], [60, 40, 40], [-10, 50, -5]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={40} ry={26} transform={`rotate(${r} ${a} ${b})`} fill="#f2d9a0" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Repisa de poros (poliporo) y coral, para el mosaico de especies.
function Repisa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-110} width={30} height={200} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
    <path d="M -60 -60 Q 40 -100 90 -40 Q 40 -10 -60 -10 Z" fill="#d9a35a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 20 Q 30 -10 70 30 Q 30 50 -60 50 Z" fill="#c98b45" stroke={KC.ink} strokeWidth={6} />
    {[-40, -10, 20, 50].map((a, i) => <circle key={i} cx={a} cy={-16} r={4} fill={KC.ink} />)}
  </g>;
}
function Coral({ x, y, s = 1 }) {
  const ramas = [[0, 0, 0, -90], [0, -50, -40, -100], [0, -50, 40, -110], [-40, -100, -60, -140], [-40, -100, -20, -150], [40, -110, 20, -160], [40, -110, 66, -150]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />)}
    {ramas.map(([a, b, c, d], i) => <line key={'c' + i} x1={a} y1={b} x2={c} y2={d} stroke="#f2e2a8" strokeWidth={14} strokeLinecap="round" />)}
  </g>;
}
function SetaSil({ x, y, s = 1, color = '#e9c08a' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 0 L -10 -90 L 10 -90 L 14 0 Z" fill="#f3e6c4" stroke={KC.ink} strokeWidth={5} />
    <path d="M -80 -88 Q 0 -60 80 -88 Z" fill={GB.gill} stroke={KC.ink} strokeWidth={4} />
    <path d="M -84 -88 Q -80 -170 0 -172 Q 80 -170 84 -88 Q 0 -80 -84 -88 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function GotaBullerShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Basidio, Go: CUES.Gota, Bu: CUES.Buller, F: CUES.Fusion, D: CUES.Disparo, P: CUES.Pregunta, E: CUES.Estudio, Fz: CUES.Fuerza, Ca: CUES.Caida, Fr: CUES.Frena, Es: CUES.Especies, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // ---- la espora grande (capítulos 1–3) ----
  const gota = kprog(T, K.Go + 2.4, K.F + 1.8, (p) => p);
  const capa = kprog(T, K.Bu + 1.6, K.Bu + 3.4, kEase.sale);
  const fus = kprog(T, K.F + 1.8, K.F + 2.05, kEase.sale);
  const cm = kprog(T, K.D + 1.0, K.D + 1.4);
  const vuelo = kprog(T, K.D + 2.6, K.D + 3.6, (p) => 1 - Math.exp(-p * 4.5));
  const flash = kprog(T, K.F + 1.8, K.F + 1.9) * (1 - kprog(T, K.F + 1.9, K.F + 2.4));
  const SX = 250, SY = 1000, SR = -28, SS = 1.25; // punta del esterigma y giro de la espora grande
  const loc = (lx, ly) => { const r = SR * Math.PI / 180; lx *= SS; ly *= SS; return [SX + lx * Math.cos(r) - ly * Math.sin(r), SY + lx * Math.sin(r) + ly * Math.cos(r)]; };
  const [hx, hy] = loc(26, -34);

  // ---- caída entre laminillas ----
  const GL = 250, GR = 830; // caras internas de las dos laminillas
  const tray = (t0, y0, dir, D) => { const t = T - t0; if (t < 0) return null; const tx = 1 - Math.exp(-t / 0.22); const x = dir > 0 ? GL + 38 + D * tx : GR - 38 - D * tx; const caeT = Math.max(0, t - 0.9); return [x, y0 + caeT * 260]; };
  const LANZ = [[K.Ca + 1.2, 580, 1, 150], [K.Ca + 2.4, 700, -1, 130], [K.Ca + 3.2, 840, 1, 160], [K.Ca + 4.0, 620, -1, 120], [K.Ca + 4.6, 940, 1, 140], [K.Fr + 0.2, 760, -1, 150], [K.Fr + 0.8, 600, 1, 130], [K.Fr + 1.4, 1000, -1, 120]];

  const zoomG = kprog(T, K.B - 0.8, K.B + 0.3, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el champiñón en el pasto; bajo el sombrero, chispitas: está disparando */}
      <Escena T={T} a={K.G} b={K.B} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${1 + zoomG * 5})`, transformOrigin:'380px 860px' }}>
          {fsvg(<><Prado T={T} /><Campestris T={T} x={380} y={1150} s={1.05} chispas={kprog(T, K.G + 0.15, K.G + 0.5)} esporas={kprog(T, K.G + 0.3, K.G + 1.2)} /></>)}
        </div>
      </Escena>

      {/* 1 · al microscopio: la laminilla y sus basidios */}
      <Escena T={T} a={K.B} b={K.Go} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Pared x={-20} y0={360} y1={1240} ancho={150} />
          {[450, 1130].map((yy, i) => <ellipse key={i} cx={190} cy={yy} rx={70} ry={42} fill="#e8dccb" stroke={KC.ink} strokeWidth={5} />)}
          <Basidio x={124} y={600} s={1.3} esporas={kprog(T, K.B + 0.9, K.B + 2.3) * 4} />
          <Basidio x={124} y={980} s={1.2} esporas={kprog(T, K.B + 1.3, K.B + 2.7) * 4} />
          <Basidio x={124} y={790} s={0.7} esporas={0} color="#efe0ca" />
        </>)}
      </Escena>

      {/* 2–5 · la espora grande: gota → fusión → disparo */}
      <Escena T={T} a={K.Go} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <circle cx={-60} cy={1150} r={220} fill="#f4e6d2" stroke={KC.ink} strokeWidth={8} />
          <path d={`M 100 1060 Q 170 1040 ${SX} ${SY}`} stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
          <path d={`M 100 1060 Q 170 1040 ${SX} ${SY}`} stroke="#f4e6d2" strokeWidth={32} fill="none" strokeLinecap="round" />
          {/* azúcares que salen de la base de la espora */}
          {Array.from({ length: 6 }, (_, i) => { const on = kprog(T, K.Go + 1.2 + i * 0.18, K.Go + 1.6 + i * 0.18, kEase.rebote); const fade = 1 - kprog(T, K.Bu + 1.0, K.Bu + 1.6);
            return on > 0 ? <polygon key={i} points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" transform={`translate(${hx - 40 + (i % 3) * 40} ${hy - 30 - Math.floor(i / 3) * 34}) scale(${on})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} opacity={fade} /> : null; })}
          {/* vapor de agua que llega y se condensa */}
          {Array.from({ length: 22 }, (_, i) => { const t0 = K.Go + 2.2 + i * 0.32; const u = kprog(T, t0, t0 + 1.4, kEase.suave); if (u <= 0 || u >= 1 || T > K.F + 1.8) return null;
            const a = i * 2.4, R = 520; const sx = hx + Math.cos(a) * R, sy = hy + Math.sin(a) * R * 0.8;
            return <circle key={i} cx={klerp(sx, hx, u)} cy={klerp(sy, hy, u)} r={9} fill={GB.agua2} stroke={GB.agua} strokeWidth={3} opacity={1 - u * 0.4} />; })}
          {/* la espora (sale volando en el disparo) */}
          <g transform={`translate(${SX + vuelo * 420} ${SY - vuelo * 260}) rotate(${SR + vuelo * 25}) scale(${1 - vuelo * 0.35})`}>
            <Espora s={SS} gota={gota} capa={capa} fusion={fus} cm={cm * (1 - kprog(T, K.D + 3.0, K.D + 3.3))} />
          </g>
          {vuelo > 0 && vuelo < 0.97 && [0, 1, 2, 3].map((k) => <line key={k} x1={SX + vuelo * 420 - 40 - k * 60} y1={SY - vuelo * 260 - 90 + k * 40} x2={SX + vuelo * 420 - 240 - k * 60} y2={SY - vuelo * 260 - 40 + k * 40} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.7 - k * 0.15} />)}
          {flash > 0 && <circle cx={loc(110, -90)[0]} cy={loc(110, -90)[1]} r={60 + flash * 120} fill="none" stroke="#fff" strokeWidth={10} opacity={flash} />}
        </>)}
      </Escena>

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>

      {/* 7 · el estudio de 2005 */}
      <Escena T={T} a={K.E} b={K.Fz}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T > K.E + 1.6 && <g opacity={kprog(T, K.E + 1.6, K.E + 2.0)}>
            <rect x={40} y={740} width={1000} height={200} rx={10} fill={KC.ink} />
            {Array.from({ length: 22 }, (_, i) => <g key={i}><rect x={52 + i * 45} y={750} width={26} height={16} rx={3} fill="#fff" /><rect x={52 + i * 45} y={914} width={26} height={16} rx={3} fill="#fff" /></g>)}
            {[0, 1, 2, 3].map((k) => { const on = kprog(T, K.E + 2.0 + k * 0.35, K.E + 2.2 + k * 0.35); return <g key={k} opacity={on}>
              <rect x={70 + k * 240} y={776} width={220} height={128} fill="#16233d" stroke="#fff" strokeWidth={3} />
              <path d={`M ${90 + k * 240} 880 Q ${110 + k * 240} 845 ${130 + k * 240} 840`} stroke="#f4e6d2" strokeWidth={10} fill="none" strokeLinecap="round" />
              <ellipse cx={150 + k * 240 + k * k * 12} cy={830 - k * 6} rx={22} ry={15} fill={GB.espora} stroke="#fff" strokeWidth={2} />
              {k < 2 && <circle cx={132 + k * 240 + k * 10} cy={824} r={9 - k * 4} fill={GB.agua} />}
            </g>; })}
          </g>}
          {T > K.E + 3.0 && <g opacity={kprog(T, K.E + 3.0, K.E + 3.4)}><Levadura x={150} y={1050} s={0.8} /><Oreja x={620} y={1050} s={0.75} /></g>}
        </>)}
      </Escena>

      {/* 8 · más de 10,000 g */}
      <Escena T={T} a={K.Fz} b={K.Ca} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g transform="translate(250 520)">
          {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={-220 - k * 10} y1={-60 + k * 30} x2={-60} y2={-60 + k * 30} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.4 + 0.5 * Math.abs(Math.sin(T * 9 + k))} />)}
          <g transform={`translate(${Math.sin(T * 30) * 3} 0) rotate(-8) scale(0.5)`}><Espora gota={0} capa={0} fusion={1} /></g>
        </g>)}
      </Escena>

      {/* 9–10 · la caída entre dos laminillas */}
      <Escena T={T} a={K.Ca} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <rect x={60} y={440} width={960} height={70} fill={GB.carne} stroke={KC.ink} strokeWidth={7} />
          <path d={`M 60 500 L ${GL} 500 L ${GL} 1090 Q ${(60 + GL) / 2} 1140 60 1090 Z`} fill={GB.gill} stroke={KC.ink} strokeWidth={7} />
          <path d={`M ${GR} 500 L 1020 500 L 1020 1090 Q ${(GR + 1020) / 2} 1140 ${GR} 1090 Z`} fill={GB.gill} stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 19 }, (_, i) => <g key={i}><path d={`M ${GL} ${520 + i * 31} q 22 -6 30 0 q -8 8 -30 4`} fill="#f4e6d2" stroke={KC.ink} strokeWidth={2} />
            <path d={`M ${GR} ${520 + i * 31} q -22 -6 -30 0 q 8 8 30 4`} fill="#f4e6d2" stroke={KC.ink} strokeWidth={2} /></g>)}
          {/* camino imposible: si volara de más, chocaría */}
          {T > K.Ca + 2.0 && T < K.Fr && <g opacity={kprog(T, K.Ca + 2.0, K.Ca + 2.4) * (1 - kprog(T, K.Fr - 0.6, K.Fr))}>
            <line x1={GL + 40} y1={580} x2={GR - 10} y2={580} stroke={KC.red} strokeWidth={6} strokeDasharray="16 14" />
            <path d={`M ${GR - 50} 550 l 50 60 M ${GR} 550 l -50 60`} stroke={KC.red} strokeWidth={12} strokeLinecap="round" />
          </g>}
          {/* regla de lo que vuela */}
          {T > K.Ca + 1.6 && <g opacity={kprog(T, K.Ca + 1.6, K.Ca + 2.0)}>
            <line x1={GL + 38} y1={545} x2={GL + 38 + 150} y2={545} stroke={KC.yellow} strokeWidth={6} />
            <line x1={GL + 38} y1={530} x2={GL + 38} y2={560} stroke={KC.yellow} strokeWidth={6} /><line x1={GL + 188} y1={530} x2={GL + 188} y2={560} stroke={KC.yellow} strokeWidth={6} />
          </g>}
          {LANZ.map(([t0, y0, dir, D], i) => { const p = tray(t0, y0, dir, D); if (!p) return null; const [x, y] = p; if (y > 1500) return null;
            const t = T - t0, x0 = dir > 0 ? GL + 38 : GR - 38;
            return <g key={i}>
              {i === 0 && <path d={`M ${x0} ${y0} L ${x} ${y0} L ${x} ${y}`} stroke={KC.yellow} strokeWidth={4} strokeDasharray="8 8" fill="none" opacity=".8" />}
              <ellipse cx={x} cy={y} rx={13} ry={9} fill={GB.espora2} stroke="#fff" strokeWidth={2} transform={`rotate(${dir > 0 ? 0 : 180} ${x} ${y})`} />
              {t < 0.15 && <circle cx={x0} cy={y0} r={18 + t * 200} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - t / 0.15} />}
            </g>; })}
        </>)}
      </Escena>

      {/* 11 · decenas de miles de especies */}
      <Escena T={T} a={K.Es} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[[200, 800, 'seta'], [540, 800, 'repisa'], [880, 800, 'oreja'], [200, 1120, 'coral'], [540, 1120, 'seta2'], [880, 1120, 'levadura']].map(([x, y, t], i) => {
            const on = kprog(T, K.Es + 0.4 + i * 0.22, K.Es + 0.75 + i * 0.22, kEase.rebote); if (on <= 0) return null;
            return <g key={i} transform={`translate(${x} ${y}) scale(${on})`}>
              <circle r={140} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
              {t === 'seta' && <SetaSil x={0} y={90} s={1} />}
              {t === 'seta2' && <SetaSil x={0} y={90} s={0.9} color="#c66a3a" />}
              {t === 'repisa' && <Repisa x={10} y={10} s={1} />}
              {t === 'oreja' && <Oreja x={-10} y={0} s={0.9} />}
              {t === 'coral' && <Coral x={0} y={90} s={1} />}
              {t === 'levadura' && <Levadura x={0} y={0} s={1} />}
              {[0, 1, 2].map((k) => { const u = ((T * 0.9 + k / 3 + i * 0.17) % 1); return <circle key={k} cx={-40 + k * 40} cy={60 + u * 70} r={5} fill={GB.espora} opacity={1 - u} />; })}
            </g>; })}
        </>)}
      </Escena>

      {/* 12 · cierre: el mismo champiñón, ahora con su lluvia de esporas, cada una con su gotita */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<><Prado T={T} /><Campestris T={T} x={380} y={1150} s={1.05} esporas={kprog(T, K.C + 0.3, K.C + 1.5)} gotitas chispas={0.6} /></>)}
      </Escena>

      {/* capítulos */}
      {T < K.P && <Capitulo T={T} caps={[{ at: K.Go, titulo:'LA GOTA' }, { at: K.F, titulo:'LA FUSIÓN' }, { at: K.D, titulo:'EL DISPARO' }]} />}
      {T >= K.Ca && T < K.Es && <Capitulo T={T} caps={[{ at: K.Go, titulo:'LA GOTA' }, { at: K.F, titulo:'LA FUSIÓN' }, { at: K.D, titulo:'EL DISPARO' }, { at: K.Ca, titulo:'LA CAÍDA' }]} />}

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.25} tacharEn={K.G + 1.3} until={K.G + 1.9} texto="¿quieto?" x={330} y={470} tam={52} />
      <Chip T={T} at={K.G + 1.9} until={K.B - 0.3} texto="¡está disparando!" x={330} y={470} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 1.2} until={K.B - 0.5} x={430} y={960} texto="champiñón de campo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.G + 1.6} until={K.B - 0.5} x={430} y={1010} texto="Agaricus campestris" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 0.2} until={K.Go - 0.3} texto="AL MICROSCOPIO · una laminilla" x={420} y={350} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.B + 0.6} until={K.Go - 0.3} x={150} y={1160} texto="laminilla" tam={28} color={GB.carne} />
      <Etq T={T} at={K.B + 1.2} until={K.Go - 0.3} x={400} y={1110} texto="basidio" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.B + 2.2} until={K.Go - 0.3} x={560} y={795} texto="esterigma (la puntita)" tam={28} />
      <Etq T={T} at={K.B + 2.6} until={K.Go - 0.3} x={690} y={760} texto="espora" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Go + 1.3} until={K.Bu - 0.2} x={hx + 10} y={hy - 150} texto="azúcares" lado="izq" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Go + 2.6} until={K.Bu - 0.2} x={620} y={520} texto="agua del aire" tam={30} color={GB.agua} />
      <Etq T={T} at={K.Bu + 0.4} until={K.F + 1.6} x={30} y={hy - 210} texto="gota de Buller" tam={30} color={GB.agua} />
      <Etq T={T} at={K.Bu + 2.2} until={K.F + 1.6} x={loc(330, -100)[0] + 30} y={loc(330, -100)[1] - 30} texto="capa de agua" tam={30} color={GB.agua} />
      <Etq T={T} at={K.Go + 0.6} until={K.D + 2.4} x={loc(400, 40)[0] + 10} y={loc(400, 40)[1] + 70} texto="espora" tam={28} color={KC.gold2} />
      <Medidor T={T} at={K.Go + 2.4} until={K.F + 2.2} valor={gota} etiqueta="GOTA DE BULLER" texto={(v) => (v < 0.999 ? 'crece…' : '¡toca la capa!')} x={180} y={1100} ancho={820} color={GB.agua} />
      <Chip T={T} at={K.F + 2.6} until={K.D - 0.3} texto="< 4 µs (medido en un hongo de oreja y levaduras, 2009)" x={540} y={1130} tam={24} borde={KC.cyan} />
      <Etq T={T} at={K.D + 1.1} until={K.D + 2.6} x={loc(214, -26)[0] - 60} y={loc(214, -26)[1] + 250} texto="centro de masa" tam={30} color={KC.red} />
      <Chip T={T} at={K.D + 3.3} until={K.P - 0.2} texto="catapulta de tensión superficial" x={540} y={1130} tam={34} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Fz - 0.3} anio="2005" quien="Pringle y colegas · EE. UU." revista="Mycologia, 2005" x={400} y={470} />
      <Chip T={T} at={K.E + 1.8} until={K.Fz - 0.3} texto="hasta 100,000 cuadros por segundo" x={540} y={690} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.E + 3.3} until={K.Fz - 0.3} x={240} y={1075} texto="Itersonilia perplexans" it tam={22} color={KC.ink} />
      <Etq T={T} at={K.E + 3.3} until={K.Fz - 0.3} x={240} y={1025} texto="levadura" tam={26} color={KC.ink} />
      <Etq T={T} at={K.E + 3.6} until={K.Fz - 0.3} x={690} y={1025} texto="hongo de oreja" tam={26} color={KC.ink} />
      <Etq T={T} at={K.E + 3.6} until={K.Fz - 0.3} x={690} y={1075} texto="Auricularia auricula" it tam={22} color={KC.ink} />
      <NumeroGigante T={T} at={K.Fz + 0.3} until={K.Ca - 0.3} valor={10000} dur={1.0} prefijo="+" sufijo=" g" etiqueta="más de" x={540} y={830} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Fz + 1.2} until={K.Ca - 0.3} texto="g = la gravedad de la Tierra" x={540} y={1030} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Fz + 1.9} until={K.Ca - 0.3} texto="≈3,000 a 14,000 g según la especie (2009)" x={540} y={1120} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 0.6} until={K.Es - 0.3} x={40} y={1160} texto="laminilla" tam={26} color={GB.carne} />
      <Etq T={T} at={K.Ca + 1.0} until={K.Es - 0.3} x={1040} y={1160} texto="laminilla de enfrente" lado="izq" tam={26} color={GB.carne} />
      <Chip T={T} at={K.Ca + 1.7} until={K.Fr - 0.2} texto="< 0.1 mm" x={GL + 113} y={640} tam={30} borde={KC.yellow} mono />
      <Chip T={T} at={K.Ca + 2.6} until={K.Fr - 0.2} texto="no choca con la de enfrente" x={540} y={1100} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Fr + 0.4} until={K.Es - 0.2} texto="frena y cae por gravedad ↓" x={540} y={1100} tam={30} borde={KC.yellow} />
      <div style={{ position:'absolute', left:0, right:0, top:470, zIndex:42, textAlign:'center', opacity: kprog(T, K.Es + 0.2, K.Es + 0.5) * (1 - kprog(T, K.C - 0.3, K.C)), display: T > K.Es && T < K.C ? 'block' : 'none' }}>
        <div style={{ display:'inline-block', font:`400 92px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`6px 6px 0 ${KC.ink}`, transform:`scale(${klerp(0.7, 1, kprog(T, K.Es + 0.2, K.Es + 0.6, kEase.rebote))})` }}>DECENAS DE MILES</div>
        <div style={{ font:`900 46px ${KF.texto}`, color:KC.ink, marginTop:10 }}>de especies disparan así</div>
      </div>
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="una catapulta de agua por espora" x={360} y={470} tam={34} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.B - 0.4} texto="5 cm" largo={300} color={KC.ink} />
      <BarraEscala T={T} at={K.B} until={K.Go} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.Go} until={K.P} texto="2 µm" largo={104} />
      <BarraEscala T={T} at={K.Ca} until={K.Es} texto="0.1 mm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={300} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="Ese champiñón *está disparando.*" />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.Go - 0.1} texto="Los basidios *cargan las esporas.*" />
      <Subtitulo T={T} idx={2} at={K.Go + 0.1} until={K.Bu - 0.1} texto="Azúcares + agua del aire: *la gota.*" />
      <Subtitulo T={T} idx={3} at={K.Bu + 0.1} until={K.F - 0.1} texto="La *gota de Buller* y otra capa de agua." />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.D - 0.1} texto="Se tocan y se juntan *en un instante.*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.P - 0.1} texto="El peso se mueve: *¡catapulta!*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Con cuánta *fuerza* sale?" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Fz - 0.1} texto="2005: otros hongos a *100,000 cuadros/s.*" />
      <Subtitulo T={T} idx={8} at={K.Fz + 0.1} until={K.Ca - 0.1} texto="Más de *10,000 veces* la gravedad." />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.Fr - 0.1} texto="Menos de *0.1 mm*: no choca." />
      <Subtitulo T={T} idx={10} at={K.Fr + 0.1} until={K.Es - 0.1} texto="Frena y *cae derecho.*" />
      <Subtitulo T={T} idx={11} at={K.Es + 0.1} until={K.C - 0.1} texto="*Decenas de miles* de especies." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Cada espora: *una catapulta de agua.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.5, 'avatar_11_sorprendido', 'gancho'],
        [K.B + 0.5, K.Go - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Bu + 0.6, K.F + 1.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.D + 0.4, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.E + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.4, K.Fz - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Fz + 0.4, K.Ca - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ca + 2.4, K.Fr + 2.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.4, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="28" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GotaBullerApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GotaBullerShot /></CompositionStage></div>;
}
window.GotaBullerApp = GotaBullerApp;
