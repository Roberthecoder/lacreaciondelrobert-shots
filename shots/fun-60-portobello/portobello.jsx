// Shot Fungi Mati #60 · Ese portobello no es otro hongo: es un champiñón que dejaron crecer — NARRADO (N1 "Por dentro" + capítulos N3).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PB = { cafe:'#8a5a3a', cafe2:'#6b4228', cafeLam:'#3b2218', crema:'#e9d6b4', blanco:'#f6f0e4', blancoS:'#d9ccb4',
  rosa:'#f2a7b0', lamOsc:'#3a2016', espora:'#4a2a18', unicel:'#f7f5ef', composta:'#6a4526', composta2:'#4a2e18', cobertura:'#2e2420' };

// Subtítulo con *resaltado* y _cursiva_ (para nombres científicos). Misma caja y lugar que Subtitulo del kit.
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Champiñón de perfil con colores: tipo 'blanco' | 'cafe'. abre 0 = botón cerrado, 1 = portobello abierto. lam = color de láminas.
function Hongo({ x, y, s = 1, tipo = 'cafe', crece = 1, abre = 0, rot = 0, lam }) {
  const c = tipo === 'blanco' ? { sombrero:PB.blanco, sombra:PB.blancoS, pie:'#fbf7ee' } : tipo === 'crema' ? { sombrero:PB.crema, sombra:'#c9ae84', pie:'#f6eedf' } : { sombrero:PB.cafe, sombra:PB.cafe2, pie:'#efe4d2' };
  return <Champinon x={x} y={y} s={s} crece={crece} abre={abre} rot={rot} sombrero={c.sombrero} sombra={c.sombra} pie={c.pie} lam={lam || (abre > 0.5 ? PB.cafeLam : PB.rosa)} />;
}
// Portobello visto desde abajo: láminas en abanico (libres del pie), anillo delgado y pie al centro. lam = color.
function Bajo({ x, y, r = 180, lam = PB.cafeLam, borde = PB.cafe, n = 64, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill={borde} stroke={KC.ink} strokeWidth={7} />
    <circle r={r * 0.92} fill={lam} stroke={KC.ink} strokeWidth={3} />
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, r0 = i % 2 ? r * 0.5 : r * 0.27; return <line key={i} x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * r * 0.9} y2={Math.sin(a) * r * 0.9} stroke="rgba(0,0,0,.45)" strokeWidth={2.5} />; })}
    <circle r={r * 0.24} fill="none" stroke="#f3e9d8" strokeWidth={5} opacity=".9" />
    <circle r={r * 0.17} fill="#efe4d2" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Charola del súper (unicel genérico, sin marca).
function Charola({ x, y, w = 900, h = 300 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 + 14} y={-h / 2 + 22} width={w} height={h} rx={34} fill="rgba(0,0,0,.18)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill={PB.unicel} stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2 + 30} y={-h / 2 + 30} width={w - 60} height={h - 60} rx={22} fill="#ebe7dc" stroke="#cfc9bb" strokeWidth={4} />
  </g>;
}
// Basidio en forma de mazo con n esterigmas y n esporas ovaladas (café oscuro, lisas). Base en (x, y), apunta hacia arriba.
function Basidio({ x, y, s = 1, n = 2, esp = 1, rot = 0, nucleos, color = '#f3e7cf' }) {
  const puntas = n === 2 ? [-26, 26] : [-36, -12, 12, 36];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -18 0 C -20 -60 -46 -110 -44 -150 Q -40 -190 0 -192 Q 40 -190 44 -150 C 46 -110 20 -60 18 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    {puntas.map((dx, i) => { const e = kclamp(esp * puntas.length - i * 0.6, 0, 1); return <g key={i}>
      <path d={`M ${dx * 0.7} -186 Q ${dx * 0.9} -206 ${dx} -222`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" opacity={kclamp(esp * 3, 0, 1)} />
      {e > 0 && <ellipse cx={dx * 1.05} cy={-246} rx={15 * e} ry={22 * e} transform={`rotate(${dx * 0.5} ${dx * 1.05} -246)`} fill={PB.espora} stroke={KC.ink} strokeWidth={3} />}
    </g>; })}
    {nucleos}
  </g>;
}
// Gráfica esquemática que sube (1925 → 1933).
function Grafica({ x, y, w = 760, h = 300, p = 1 }) {
  const pts = Array.from({ length: 41 }, (_, i) => { const u = i / 40; return [u * w, -h * (u * u * 0.6 + u * 0.35)]; });
  const k = Math.max(2, Math.ceil(pts.length * p));
  return <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={0} x2={w} y2={0} stroke={KC.ink} strokeWidth={7} /><line x1={0} y1={0} x2={0} y2={-h - 20} stroke={KC.ink} strokeWidth={7} />
    <path d={'M ' + pts.slice(0, k).map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={KC.white} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={'M ' + pts.slice(0, k).map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <text x={0} y={46} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1925</text>
    <text x={w} y={46} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={kprog(p, 0.85, 1)}>1933</text>
  </g>;
}
// Frasco de laboratorio (cultivo de esporas).
function Matraz({ x, y, s = 1, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -260 L 40 -260 L 40 -170 L 130 -10 Q 140 20 110 20 L -110 20 Q -140 20 -130 -10 L -40 -170 Z" fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -112 ${10 - 60 * lleno} L 112 ${10 - 60 * lleno} L 120 0 Q 124 12 110 12 L -110 12 Q -124 12 -120 0 Z`} fill="#f1d27a" opacity={lleno > 0 ? 0.9 : 0} />
    {lleno > 0.3 && <path d={`M -80 ${-30 * lleno} Q -30 ${-60 * lleno} 0 ${-34 * lleno} Q 40 ${-62 * lleno} 82 ${-28 * lleno}`} stroke="#fffaf0" strokeWidth={6} fill="none" opacity={lleno} />}
    <rect x={-52} y={-290} width={104} height={36} rx={10} fill="#e8e0d0" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// cama de champiñones cafés (posiciones fijas) con el blanco en el índice 4
const CAMA = [[150, 1080, 0.62], [270, 1100, 0.7], [390, 1075, 0.58], [500, 1105, 0.68], [610, 1080, 0.72], [730, 1100, 0.62], [850, 1078, 0.66], [960, 1102, 0.6]];

function PortobelloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Es: CUES.Especie, Cu: CUES.Cultivo, Cr: CUES.Cremini, Ab: CUES.Abre, La: CUES.Laminas, P: CUES.Pregunta, B: CUES.Basidio, N: CUES.Nucleos, E: CUES.Estudio, L: CUES.Lambert, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la charola entra y el portobello se voltea (se ven las láminas)
  const entra = kprog(T, K.G - 0.5, K.G + 0.5, kEase.sale);
  const volteo = kprog(T, K.G + 0.35, K.G + 1.05, kEase.suave);
  const abrir = kprog(T, K.Ab + 0.3, K.Ab + 3.6, kEase.suave);
  const lamCol = mixHex(PB.rosa, PB.lamOsc, kprog(T, K.La + 0.4, K.La + 2.6, kEase.suave));
  // núcleos: 4 tras la meiosis que se reparten de dos en dos
  const NUC = ['#ff2d78', '#2fe0a8', '#ffe11a', '#00d2ff'];
  const rep = kprog(T, K.N + 0.6, K.N + 2.0, kEase.suave);
  const cae = kprog(T, K.N + 2.6, K.N + 3.4, kEase.suave), germ = kprog(T, K.N + 3.4, K.N + 4.9);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · charola del súper: blanco, cremini y portobello; luego, una sola especie */}
      <Escena T={T} a={K.G} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={`translate(${(1 - entra) * -700} 0)`}>
          <Charola x={470} y={1050} w={860} h={330} />
          <Hongo x={170} y={1130} s={0.62} tipo="blanco" />
          <Hongo x={250} y={1150} s={0.55} tipo="blanco" rot={8} />
          <Hongo x={400} y={1130} s={0.62} tipo="cafe" />
          <Hongo x={470} y={1150} s={0.55} tipo="cafe" rot={-6} />
          {volteo < 0.5 ? <g transform={`translate(720 1150) scale(1 ${1 - volteo * 2})`}><Hongo x={0} y={0} s={1.15} tipo="cafe" abre={1} /></g>
            : <g transform={`translate(720 ${1010}) scale(1 ${(volteo - 0.5) * 2})`}><Bajo x={0} y={0} r={150} /></g>}
          {/* llave: una sola especie */}
          {T > K.Es + 0.4 && <path d={`M 130 ${880} Q 130 850 170 850 L ${klerp(170, 820, kprog(T, K.Es + 0.4, K.Es + 1.2, kEase.sale))} 850`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />}
          {T > K.Es + 1.1 && <path d="M 820 850 Q 860 850 860 880" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" opacity={kprog(T, K.Es + 1.1, K.Es + 1.3)} />}
        </g>)}
      </Escena>
      {/* 2 · cultivo: composta + micelio + capa de cobertura + primordios */}
      <Escena T={T} a={K.Cu} b={K.Cr} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={80} y={800} width={920} height={380} rx={20} fill={PB.composta} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 60 }, (_, i) => { const g = krng(i + 11); const xx = 110 + g() * 860, yy = 880 + g() * 280, a = g() * 3; return <line key={i} x1={xx} y1={yy} x2={xx + Math.cos(a) * 50} y2={yy + Math.sin(a) * 18} stroke="#d9b45a" strokeWidth={5} strokeLinecap="round" />; })}
          <g opacity={kprog(T, K.Cu + 0.8, K.Cu + 1.4)}><RedHifas T={T} x={540} y={1000} g={kprog(T, K.Cu + 0.8, K.Cu + 3.0)} seed={5} n={260} escala={0.42} ancho={3.5} /></g>
          <rect x={80} y={800 - 110 * kprog(T, K.Cu + 2.0, K.Cu + 2.6, kEase.sale)} width={920} height={110 * kprog(T, K.Cu + 2.0, K.Cu + 2.6, kEase.sale)} rx={16} fill={PB.cobertura} stroke={KC.ink} strokeWidth={7} />
          {[200, 330, 470, 620, 760, 880].map((xx, i) => <Hongo key={i} x={xx} y={698} s={0.42} tipo={i % 2 ? 'cafe' : 'blanco'} crece={kprog(T, K.Cu + 2.9 + i * 0.12, K.Cu + 4.4 + i * 0.12) * 0.55} />)}
        </>)}
      </Escena>
      {/* 3 · cremini: el café cerrado, cortado */}
      <Escena T={T} a={K.Cr} b={K.Ab} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={80} y={1000} width={920} height={160} rx={16} fill={PB.cobertura} stroke={KC.ink} strokeWidth={7} />
          <g transform={`translate(${kprog(T, K.Cr + 0.9, K.Cr + 1.6, kEase.sale) * 90} ${-kprog(T, K.Cr + 0.9, K.Cr + 1.6, kEase.sale) * 160}) rotate(${kprog(T, K.Cr + 0.9, K.Cr + 1.6) * 14} 470 1000)`}>
            <Hongo x={470} y={1000} s={1.6} tipo="cafe" />
          </g>
          {/* cuchillito */}
          <g transform={`translate(${klerp(1100, 560, kprog(T, K.Cr + 0.2, K.Cr + 0.9, kEase.sale))} 990) rotate(-4)`}>
            <rect x={0} y={-16} width={260} height={32} rx={6} fill="#d9dde3" stroke={KC.ink} strokeWidth={6} />
            <rect x={250} y={-22} width={180} height={44} rx={14} fill="#3b2a1e" stroke={KC.ink} strokeWidth={6} />
          </g>
        </>)}
      </Escena>
      {/* 4 · madurar: el sombrero se abre (3 → 15 cm) */}
      <Escena T={T} a={K.Ab} b={K.La} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={60} y={1120} width={960} height={90} rx={14} fill={PB.cobertura} stroke={KC.ink} strokeWidth={7} />
          <Hongo x={420} y={1124} s={klerp(1.1, 2.0, abrir)} tipo="cafe" abre={abrir} lam={mixHex(PB.rosa, PB.cafeLam, abrir)} />
          {/* medidor del diámetro */}
          {(() => { const rr = 150 * klerp(1.1, 2.0, abrir) * klerp(0.72, 1, abrir) * kclamp(abrir * 4, 0.25, 1) ; const yy = 1124 - klerp(150, 150, 1) * klerp(1.1, 2.0, abrir) - 70 * klerp(1.1, 2.0, abrir) - 40;
            return <g opacity={kprog(T, K.Ab + 0.3, K.Ab + 0.7)}>
              <line x1={420 - rr} y1={yy} x2={420 + rr} y2={yy} stroke={KC.ink} strokeWidth={7} />
              <line x1={420 - rr} y1={yy - 20} x2={420 - rr} y2={yy + 20} stroke={KC.ink} strokeWidth={7} /><line x1={420 + rr} y1={yy - 20} x2={420 + rr} y2={yy + 20} stroke={KC.ink} strokeWidth={7} />
              <rect x={330} y={yy - 92} width={180} height={64} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <text x={420} y={yy - 46} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{Math.round(klerp(3, 15, abrir))} cm</text>
            </g>; })()}
        </>)}
      </Escena>
      {/* 5 · láminas desde abajo: de rosadas a café oscuro */}
      <Escena T={T} a={K.La} b={K.P} zoom={0.25} origen="50% 46%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Bajo x={540} y={880} r={330} lam={lamCol} rot={T * 4} /></>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué bisporus? */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <text x={440} y={760} textAnchor="middle" style={{ font:`italic 400 170px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>bi·sporus</text>
          <text x={440} y={840} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.P + 0.5, K.P + 0.9)}>bi = dos · spora = espora</text>
          <Interrogacion T={T} x={300} y={1150} tam={300} />
        </>)}
      </Escena>
      {/* 7 · por dentro: la lámina con basidios de 2 esporas */}
      <Escena T={T} a={K.B} b={K.N} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {/* tejido de la lámina (abajo) y la empalizada de basidios */}
          <rect x={-20} y={1060} width={1120} height={160} fill="#5a3a2a" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 9 }, (_, i) => { const xx = 80 + i * 115, on = kprog(T, K.B + 0.3 + i * 0.08, K.B + 0.7 + i * 0.08, kEase.rebote);
            return on > 0 ? <Basidio key={i} x={xx} y={1066} s={0.78 * on} n={2} esp={kprog(T, K.B + 1.2 + i * 0.1, K.B + 2.0 + i * 0.1)} /> : null; })}
          {/* comparación: otros Agaricus, 4 esporas */}
          <g opacity={kprog(T, K.B + 3.0, K.B + 3.5)}>
            <rect x={70} y={430} width={300} height={330} rx={24} fill="rgba(255,255,255,.08)" stroke={KC.lilac} strokeWidth={4} strokeDasharray="12 8" />
            <Basidio x={220} y={720} s={0.95} n={4} esp={1} color="#e3d8f5" />
          </g>
        </>)}
      </Escena>
      {/* 8 · núcleos: 4 núcleos → 2 por espora; la espora germina */}
      <Escena T={T} a={K.N} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Basidio x={430} y={1130} s={2.1} n={2} esp={1} nucleos={<>
            {NUC.map((c, i) => { const izq = i % 2 === 0; const x0 = [-22, 22, -22, 22][i], y0 = [-90, -90, -50, -50][i];
              const x1 = (izq ? -27 : 27) + (i < 2 ? -6 : 6), y1 = -246 + (i < 2 ? -8 : 8);
              const pairX = (i === 0 || i === 3) ? -27 : 27; // cada espora recibe dos núcleos distintos (no hermanos)
              const xf = pairX + (i < 2 ? -6 : 6);
              return <circle key={i} cx={klerp(x0, xf, rep)} cy={klerp(y0, y1, rep)} r={10} fill={c} stroke={KC.ink} strokeWidth={2.5} />; })}
          </>} />
          {/* una espora cae y germina */}
          {cae > 0 && <g>
            <ellipse cx={720} cy={klerp(560, 1150, cae)} rx={30} ry={44} fill={PB.espora} stroke={KC.ink} strokeWidth={4} />
            <circle cx={712} cy={klerp(560, 1150, cae) - 8} r={9} fill={NUC[0]} /><circle cx={728} cy={klerp(560, 1150, cae) + 10} r={9} fill={NUC[1]} />
          </g>}
          {germ > 0 && <RedHifas T={T} x={720} y={1170} g={germ} seed={9} n={140} escala={0.24} ancho={3.5} />}
          {germ > 0.6 && <Hongo x={900} y={1180} s={0.5} tipo="cafe" crece={kprog(germ, 0.6, 1)} />}
        </>)}
      </Escena>
      {/* 9 · 1925: un champiñón blanco entre los cafés */}
      <Escena T={T} a={K.E} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={60} y={1080} width={960} height={110} rx={14} fill={PB.composta} stroke={KC.ink} strokeWidth={7} />
          {CAMA.map(([xx, yy, ss], i) => <Hongo key={i} x={xx} y={yy} s={ss} tipo={i === 4 ? 'blanco' : 'cafe'} crece={kprog(T, K.E + 1.6 + i * 0.08, K.E + 2.3 + i * 0.08)} />)}
          {T > K.E + 3.2 && <circle cx={610} cy={980} r={110 + 10 * Math.sin(T * 6)} fill="none" stroke={KC.white} strokeWidth={8} opacity={0.5 + 0.4 * Math.sin(T * 6)} />}
        </>)}
      </Escena>
      {/* 10 · Lambert lo cultiva desde sus esporas; para 1933 dominaba el mercado */}
      <Escena T={T} a={K.L} b={K.D} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Hongo x={230} y={1100} s={1.1} tipo="blanco" abre={0.7} lam={PB.rosa} />
          {Array.from({ length: 8 }, (_, i) => { const u = kclamp((T - K.L - 0.4 - i * 0.18) / 1.1, 0, 1); return u > 0 && u < 1 ? <ellipse key={i} cx={klerp(230, 420, u) + Math.sin(i + u * 6) * 14} cy={klerp(950, 1010, u)} rx={7} ry={10} fill={PB.espora} /> : null; })}
          <Matraz x={470} y={1120} s={0.8} lleno={kprog(T, K.L + 1.2, K.L + 2.4)} />
          <g opacity={kprog(T, K.L + 2.4, K.L + 2.8)}><Grafica x={150} y={720} w={760} h={190} p={kprog(T, K.L + 2.5, K.L + 4.2, kEase.suave)} /></g>
        </>)}
      </Escena>
      {/* 11 · antes, cafés o crema: el blanco era el raro; «portobello», nombre comercial */}
      <Escena T={T} a={K.D} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {[0, 1, 2, 3, 4, 5].map((i) => <Hongo key={i} x={130 + i * 160} y={T < K.D + 2.6 ? 1000 : klerp(1000, 760, kprog(T, K.D + 2.6, K.D + 3.0))} s={0.62} tipo={i === 3 ? 'blanco' : i % 2 ? 'crema' : 'cafe'} crece={kprog(T, K.D + 0.1 + i * 0.1, K.D + 0.6 + i * 0.1)} />)}
          <g opacity={kprog(T, K.D + 2.7, K.D + 3.1)} transform={`translate(380 1080) rotate(-5) scale(${klerp(0.6, 1, kprog(T, K.D + 2.7, K.D + 3.2, kEase.rebote))})`}>
            <rect x={-300} y={-80} width={600} height={160} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <circle cx={-250} cy={0} r={18} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} />
            <text x={20} y={22} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>PORTOBELLO</text>
          </g>
          <Sello T={T} at={K.D + 3.6} x={770} y={1070} texto="MARKETING" color={KC.red} r={120} rot={12} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma charola, ahora como la vida de un solo hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Charola x={470} y={1050} w={860} h={330} />
          <Hongo x={170} y={1150} s={0.5} tipo="cafe" crece={0.8} />
          <Hongo x={410} y={1150} s={0.68} tipo="cafe" abre={0.1} />
          <Hongo x={700} y={1155} s={1.05} tipo="cafe" abre={1} />
          {[[230, 300], [490, 560]].map(([a, b], i) => { const p = kprog(T, K.C + 0.5 + i * 0.5, K.C + 0.9 + i * 0.5, kEase.sale); return <g key={i} opacity={p}>
            <path d={`M ${a} 960 Q ${(a + b) / 2} ${920} ${klerp(a, b + 30, p)} 960`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d={`M ${b + 30} 960 l -24 -16 m 24 16 l -26 8`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
            <text x={(a + b) / 2 + 15} y={910} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>días</text>
          </g>; })}
          <g opacity={kprog(T, K.C + 2.0, K.C + 2.4)}><Hongo x={960} y={870} s={0.5} tipo="blanco" /></g>
        </>)}
      </Escena>

      {/* capítulos */}
      <Capitulo T={T} caps={[{ at: K.Cu, titulo:'cultivo' }, { at: K.Ab, titulo:'madurar' }, { at: K.B, titulo:'por dentro' }]} hasta={K.E} />

      {/* textos: gancho y especie */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.Es - 0.2} texto="¿otro hongo?" x={300} y={520} tam={50} />
      <Chip T={T} at={K.G + 2.0} until={K.Es - 0.2} texto="el mismo, más grande" x={330} y={640} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Es + 0.2} until={K.Cu - 0.3} x={110} y={1260} texto="blanco" tam={30} />
      <Etq T={T} at={K.Es + 0.5} until={K.Cu - 0.3} x={360} y={1260} texto="café" tam={30} />
      <Etq T={T} at={K.Es + 0.8} until={K.Cu - 0.3} x={600} y={1260} texto="portobello" tam={30} />
      <Chip T={T} at={K.Es + 1.3} until={K.Cu - 0.3} texto="una sola especie" x={330} y={720} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.Es + 1.8} until={K.Cu - 0.3} x={110} y={800} texto="Agaricus bisporus" it tam={44} />
      {/* cultivo */}
      <Etq T={T} at={K.Cu + 0.4} until={K.Cr - 0.3} x={100} y={1215} texto="composta: paja + estiércol de caballo" tam={28} />
      <Etq T={T} at={K.Cu + 1.4} until={K.Cr - 0.3} x={560} y={1000} texto="micelio" tam={30} />
      <Etq T={T} at={K.Cu + 2.3} until={K.Cr - 0.3} x={100} y={640} texto="capa de cobertura (tierra / turba)" tam={28} />
      {/* cremini */}
      <Etq T={T} at={K.Cr + 0.5} until={K.Ab - 0.3} x={110} y={560} texto="cremini" tam={50} />
      <Etq T={T} at={K.Cr + 0.9} until={K.Ab - 0.3} x={110} y={630} texto="botón café, cerrado" tam={30} />
      {/* madurar */}
      <Etq T={T} at={K.Ab + 2.8} until={K.La - 0.3} x={100} y={470} texto="portobello" tam={50} />
      <Etq T={T} at={K.Ab + 3.4} until={K.La - 0.3} x={640} y={1080} texto="anillo delgado" tam={26} />
      {/* láminas */}
      <Chip T={T} at={K.La + 0.3} until={K.P - 0.3} texto="láminas" x={540} y={460} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.La + 1.6} until={K.P - 0.3} texto="rosadas → café oscuro" x={540} y={1290} tam={34} borde={KC.ink} mono />
      {/* basidios */}
      <Etq T={T} at={K.B + 0.8} until={K.N - 0.3} x={420} y={600} texto="basidios" tam={40} />
      <Etq T={T} at={K.B + 1.8} until={K.N - 0.3} x={420} y={660} texto="2 esporas cada uno" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.B + 3.2} until={K.N - 0.3} x={90} y={400} texto="otros Agaricus: 4" it tam={28} color={KC.lilac} />
      <Chip T={T} at={K.B + 3.9} until={K.N - 0.3} texto="≈ 9 de cada 10 basidios: 2 esporas" x={540} y={1290} tam={30} borde={KC.gold} />
      {/* núcleos */}
      <Etq T={T} at={K.N + 0.3} until={K.E - 0.3} x={60} y={470} texto="4 núcleos tras la meiosis" tam={30} />
      <Chip T={T} at={K.N + 2.0} until={K.E - 0.3} texto="≈ 9 de cada 10 esporas: 2 núcleos distintos" x={540} y={560} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.N + 3.8} until={K.E - 0.3} x={600} y={1260} texto="micelio fértil (esquema)" tam={26} />
      {/* 1925 */}
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.E + 3.0} anio="1925" quien="Coatesville, Pensilvania" revista="Keystone Mushroom Farm · EE. UU." x={500} y={640} />
      <Etq T={T} at={K.E + 3.3} until={K.L - 0.3} x={650} y={880} texto="el blanco" tam={34} lado="izq" />
      {/* Lambert */}
      <Chip T={T} at={K.L + 0.4} until={K.D - 0.3} texto="Louis F. Lambert" x={420} y={460} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.L + 1.5} until={K.D - 0.3} x={600} y={1180} texto="cultivo de sus esporas" tam={26} />
      <Chip T={T} at={K.L + 2.6} until={K.D - 0.3} texto="cepa «Snow White»" x={420} y={560} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.L + 3.6} until={K.D - 0.3} x={150} y={790} texto="esquemático" tam={22} />
      {/* dato */}
      <Chip T={T} at={K.D + 0.6} until={K.D + 2.5} texto="antes: cafés o crema" x={400} y={500} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.D + 1.4} until={K.D + 2.5} texto="el raro" x={610} y={1100} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.D + 3.8} until={K.C - 0.3} texto="nombre de mercadotecnia" x={400} y={500} tam={38} borde={KC.red} />
      {/* cierre */}
      <Etq T={T} at={K.C + 0.4} until={K.Ou} x={60} y={1240} texto="botón" tam={26} />
      <Etq T={T} at={K.C + 0.9} until={K.Ou} x={330} y={1240} texto="cremini" tam={26} />
      <Etq T={T} at={K.C + 1.4} until={K.Ou} x={600} y={1240} texto="portobello" tam={26} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={60} y={560} texto="un solo hongo: Agaricus bisporus" tam={34} it />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="variante de 1925" x={830} y={720} tam={28} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Cu} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Cu} until={K.Cr} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.Cr} until={K.Ab} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.Ab} until={K.La} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.La} until={K.P} texto="5 cm" largo={220} />
      <BarraEscala T={T} at={K.B} until={K.N} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.N} until={K.E} texto="10 µm (esquema)" largo={260} />
      <BarraEscala T={T} at={K.E} until={K.D} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.Es - 0.1} texto="No es otro hongo: *lo dejaron crecer.*" />
      <SubIt T={T} idx={1} at={K.Es + 0.1} until={K.Cu - 0.1} texto="Blanco, café y portobello: *una sola especie.*" />
      <SubIt T={T} idx={2} at={K.Cu + 0.1} until={K.Cr - 0.1} texto="Composta de paja y estiércol, *con tierra encima.*" />
      <SubIt T={T} idx={3} at={K.Cr + 0.1} until={K.Ab - 0.1} texto="El café cerradito: *cremini.*" />
      <SubIt T={T} idx={4} at={K.Ab + 0.1} until={K.La - 0.1} texto="Madura y se abre: *hasta 15 cm.*" />
      <SubIt T={T} idx={5} at={K.La + 0.1} until={K.P - 0.1} texto="Ahí nacen *las esporas.*" />
      <SubIt T={T} idx={6} at={K.P + 0.1} until={K.B - 0.1} texto="¿Por qué *_bisporus?_*" />
      <SubIt T={T} idx={7} at={K.B + 0.1} until={K.N - 0.1} texto="Basidios de *dos esporas,* no de cuatro." />
      <SubIt T={T} idx={8} at={K.N + 0.1} until={K.E - 0.1} texto="Casi cada espora: *dos núcleos distintos.*" />
      <SubIt T={T} idx={9} at={K.E + 0.1} until={K.L - 0.1} texto="1925: un champiñón *blanco* entre los cafés." />
      <SubIt T={T} idx={10} at={K.L + 0.1} until={K.D - 0.1} texto="Para 1933, *dominaba el mercado.*" />
      <SubIt T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="Portobello: *nombre de mercadotecnia.*" />
      <SubIt T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un cremini que *nadie cortó a tiempo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Es + 0.4, K.Es + 3.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cu + 2.2, K.Cr + 1.5, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Ab + 0.8, K.Ab + 4.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.B + 0.3, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.B + 2.2, K.B + 5.4, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.E + 0.3, K.E + 4.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.D + 0.3, K.D + 5.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="60" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PortobelloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PortobelloShot /></CompositionStage></div>;
}
window.PortobelloApp = PortobelloApp;
