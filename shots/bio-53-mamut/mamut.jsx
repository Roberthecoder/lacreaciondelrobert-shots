// Shot Biotecnológico #53 · ¿Quieres revivir un mamut? Sigue estos pasos — NARRADO (N6 guía irónica en pasos + N2 número gigante).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala.
const MAR = '#7a4a26', MAR2 = '#5a3416', MARFIL = '#f3e6c4', HIELO = '#dff6ff', ELEF = '#9aa0a8', ELEF2 = '#7d838c', LANA = '#d9a24a';
const LETRAS = ['A', 'C', 'G', 'T'], COL_L = { A: KC.pink, C: KC.cyan, G: KC.yellow, T: KC.mint };

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Palomita, tache o reloj de arena (pendiente).
function Marca({ x, y, tipo = 'ok', s = 1, o = 1 }) {
  if (o <= 0) return null;
  const c = tipo === 'ok' ? KC.mint : tipo === 'no' ? KC.red : KC.yellow;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.5, 1, o)})`} opacity={o}>
    <circle r={70} fill={c} stroke={KC.ink} strokeWidth={8} />
    {tipo === 'ok' && <path d="M -34 0 L -10 26 L 36 -26" stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    {tipo === 'no' && <path d="M -28 -28 L 28 28 M 28 -28 L -28 28" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />}
    {tipo === 'espera' && <g><path d="M -26 -38 L 26 -38 L 0 0 L 26 38 L -26 38 L 0 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -12 30 L 12 30 L 0 16 Z" fill={MAR} /></g>}
  </g>;
}

// Bloque de hielo con colmillo y mechón de pelo; grietas que crecen (0..1).
function BloqueHielo({ T, x, y, s = 1, grieta = 0 }) {
  const R = krng(11);
  const grietas = [[-150, -120, -60, -20, -90, 60], [120, -130, 60, -40, 110, 30], [-20, 140, 30, 60, -40, 10]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={250} rx={340} ry={40} fill="rgba(0,0,0,.18)" />
    <path d="M -300 -190 L -120 -250 L 180 -230 L 310 -140 L 290 180 L 120 250 L -200 240 L -310 120 Z" fill={HIELO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -300 -190 L -120 -250 L 180 -230 L 310 -140 L 140 -150 L -150 -160 Z" fill="#ffffff" opacity=".7" />
    {/* colmillo curvo (marfil) */}
    <path d="M -200 120 Q -230 -60 -60 -120 Q 90 -160 170 -60 Q 110 -110 -40 -80 Q -170 -30 -150 130 Z" fill={MARFIL} stroke={KC.ink} strokeWidth={7} opacity=".92" />
    {/* mechón de pelo café */}
    {Array.from({ length: 14 }, (_, i) => { const bx = 60 + i * 9, m = mece(T, i + 3, 0.4) * 6;
      return <path key={i} d={`M ${bx} 60 Q ${bx + 20 + m} 120 ${bx + 4 + m} 190`} stroke={i % 3 ? MAR : MAR2} strokeWidth={7} fill="none" strokeLinecap="round" opacity=".9" />; })}
    {/* brillo y grietas */}
    <path d="M -240 -150 L -200 -60" stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".8" />
    {grieta > 0 && grietas.map((g, i) => { const k = kclamp(grieta * 3 - i, 0, 1); return <polyline key={i} points={`${g[0]},${g[1]} ${klerp(g[0], g[2], k)},${klerp(g[1], g[3], k)} ${klerp(g[0], g[4], k)},${klerp(g[1], g[5], k)}`} fill="none" stroke="#6aa9c4" strokeWidth={5} strokeLinejoin="round" />; })}
  </g>;
}

// Hoja del manual: título y 5 casillas. estados = ['no'|'ok'|'espera'|null] × 5.
function Manual({ x, y, s = 1, rot = -4, estados = [], o = 1 }) {
  const txt = ['célula viva', 'armar el genoma', 'comparar', 'editar con CRISPR', 'óvulos y mamá'];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={8} y={10} width={460} height={520} rx={18} fill={KC.ink} />
    <rect x={0} y={0} width={460} height={520} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <text x={230} y={66} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>CÓMO REVIVIR</text>
    <text x={230} y={118} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>UN MAMUT</text>
    {txt.map((t, i) => { const yy = 180 + i * 72, e = estados[i];
      return <g key={i}>
        <rect x={30} y={yy - 26} width={48} height={48} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} />
        {e === 'ok' && <path d={`M 40 ${yy} L 52 ${yy + 13} L 72 ${yy - 14}`} stroke={KC.teal} strokeWidth={9} fill="none" strokeLinecap="round" />}
        {e === 'no' && <path d={`M 40 ${yy - 14} L 68 ${yy + 14} M 68 ${yy - 14} L 40 ${yy + 14}`} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />}
        {e === 'espera' && <text x={54} y={yy + 14} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.orange}>…</text>}
        <text x={96} y={yy + 12} style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>{i + 1}. {t}</text>
      </g>; })}
  </g>;
}

// Insignia "PASO N / 5" a la izquierda (deja libre el lado de Robert).
function PasoBadge({ T, pasos }) {
  let i = -1; pasos.forEach((p, k) => { if (T >= p.at && T < p.until) i = k; });
  if (i < 0) return null;
  const p = pasos[i], s = klerp(1.35, 1, kprog(T, p.at, p.at + 0.4, kEase.rebote)), o = kprog(T, p.at, p.at + 0.2) * (1 - kprog(T, p.until - 0.25, p.until));
  return <div style={{ position:'absolute', left:60, top:320, zIndex:44, opacity:o }}>
    <div style={{ display:'inline-block', transform:`scale(${s})`, transformOrigin:'0 50%', background:KC.red, color:KC.paper, borderRadius:20, padding:'6px 26px 10px', font:`400 88px/1 ${KF.titulo}`, boxShadow:`10px 10px 0 ${KC.ink}` }}>PASO {p.n}<span style={{ fontSize:48, opacity:.75 }}> / 5</span></div>
    <div style={{ font:`900 44px/1.1 ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:18, maxWidth:600 }}>{p.texto}</div>
  </div>;
}

// Elefante asiático de perfil (orejas chicas, lomo arqueado, dos domos en la frente).
function ElefanteAsiatico({ T, x, y, s = 1, color = ELEF, panza = 0 }) {
  const tr = mece(T, 2, 0.35) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-110, -50, 70, 130].map((lx, i) => <rect key={i} x={lx - 30} y={40} width={60} height={150} rx={18} fill={i % 2 ? color : ELEF2} stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -190 40 Q -200 -110 -40 -130 Q 120 -140 170 -40 Q 190 60 140 80 L -170 80 Q -195 70 -190 40 Z" fill={color} stroke={KC.ink} strokeWidth={9} />
    {panza > 0 && <ellipse cx={-10} cy={70} rx={130 * panza} ry={40 * panza} fill={color} stroke={KC.ink} strokeWidth={8} />}
    <path d="M -190 20 Q -210 40 -205 70" stroke={KC.ink} strokeWidth={6} fill="none" />
    <path d="M 130 -60 Q 160 -170 230 -140 Q 290 -120 280 -50 Q 275 0 250 30" fill={color} stroke={KC.ink} strokeWidth={9} />
    <circle cx={195} cy={-150} r={30} fill={color} stroke={KC.ink} strokeWidth={7} /><circle cx={245} cy={-148} r={28} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M 150 -90 Q 120 -40 150 10 Q 190 -10 190 -70 Z" fill={ELEF2} stroke={KC.ink} strokeWidth={7} />
    <path d={`M 270 -40 Q 300 60 ${285 + tr} 160 Q ${280 + tr} 190 ${262 + tr} 180`} stroke={color} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d={`M 270 -40 Q 300 60 ${285 + tr} 160 Q ${280 + tr} 190 ${262 + tr} 180`} stroke={KC.ink} strokeWidth={4} fill="none" opacity=".4" />
    <circle cx={238} cy={-100} r={9} fill={KC.ink} />
  </g>;
}
// Mamut lanudo de perfil: cabeza alta en domo, joroba, lomo que baja, pelo largo, colmillos curvos, orejas chicas.
function MamutLanudo({ T, x, y, s = 1, o = 1 }) {
  const tr = mece(T, 5, 0.3) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-110, -50, 70, 130].map((lx, i) => <rect key={i} x={lx - 32} y={40} width={64} height={150} rx={18} fill={i % 2 ? MAR : MAR2} stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -190 60 Q -200 -40 -80 -90 Q 60 -170 170 -110 Q 230 -60 200 60 L -170 80 Z" fill={MAR} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 18 }, (_, i) => { const bx = -180 + i * 21, m = mece(T, i, 0.4) * 6; return <path key={i} d={`M ${bx} 60 Q ${bx + m} 120 ${bx + 6 + m} 160`} stroke={MAR2} strokeWidth={9} fill="none" strokeLinecap="round" />; })}
    <path d="M 150 -120 Q 200 -250 280 -190 Q 320 -140 300 -60 Q 290 0 260 30" fill={MAR} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={180} cy={-90} rx={24} ry={30} fill={MAR2} stroke={KC.ink} strokeWidth={6} />
    <path d={`M 290 -40 Q 320 60 ${300 + tr} 170`} stroke={MAR} strokeWidth={32} fill="none" strokeLinecap="round" />
    <path d="M 270 -20 Q 380 80 300 140 Q 260 160 250 120 Q 320 90 250 10 Z" fill={MARFIL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={258} cy={-130} r={9} fill={KC.ink} />
    <path d="M -190 0 Q -215 30 -205 70" stroke={MAR2} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Ratón de laboratorio; lana 0..1 = pelo largo, ondulado y dorado.
function Raton({ T, x, y, s = 1, lana = 0 }) {
  const cuerpo = mixHex('#c9c4bd', LANA, lana), resp = 1 + Math.sin(T * 5) * 0.015;
  const R = krng(4);
  const pelos = Array.from({ length: 46 }, () => [R() * 2 - 1, R()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -150 40 Q -260 70 -300 10 Q -330 -30 -300 -60`} stroke="#e7a7a7" strokeWidth={14} fill="none" strokeLinecap="round" />
    <g transform={`scale(${resp})`}>
      <ellipse cx={0} cy={0} rx={170 + lana * 30} ry={100 + lana * 26} fill={cuerpo} stroke={KC.ink} strokeWidth={9} />
      {lana > 0 && pelos.map(([u, v], i) => { const ang = u * Math.PI * 0.95 - Math.PI / 2, rx = 170 + lana * 30, ry = 100 + lana * 26;
        const px = Math.cos(ang) * rx * 0.95 - 20, py = Math.sin(ang) * ry * 0.95, L = 50 * lana * (0.7 + v * 0.6), m = mece(T, i, 0.5) * 6;
        return <path key={i} d={`M ${px} ${py} q ${Math.cos(ang) * L * 0.5 + 12 + m} ${Math.sin(ang) * L * 0.5 - 10} ${Math.cos(ang) * L + m} ${Math.sin(ang) * L + 8}`} stroke={i % 3 ? '#b7802e' : '#e9bf6a'} strokeWidth={7} fill="none" strokeLinecap="round" />; })}
    </g>
    <path d="M 130 -40 Q 230 -40 270 20 Q 230 60 140 50 Z" fill={cuerpo} stroke={KC.ink} strokeWidth={8} />
    <circle cx={150} cy={-80} r={42} fill="#e7b9b9" stroke={KC.ink} strokeWidth={7} />
    <circle cx={215} cy={-6} r={9} fill={KC.ink} /><circle cx={272} cy={22} r={10} fill="#e77" stroke={KC.ink} strokeWidth={4} />
    {[[-90, 90], [80, 90]].map(([px, py], i) => <ellipse key={i} cx={px} cy={py + lana * 20} rx={26} ry={14} fill="#e7a7a7" stroke={KC.ink} strokeWidth={5} />)}
    {[-10, 4, 18].map((d, i) => <path key={i} d={`M 262 ${18 + d * 0.3} q 40 ${d - 6} ${70} ${d + (lana ? Math.sin(i * 2 + T * 3) * 10 : 0)}`} stroke={KC.ink} strokeWidth={3} fill="none" />)}
  </g>;
}
// Bucardo: adulto (cuernos largos curvados hacia atrás) o cría recién nacida (sin cuernos).
function Bucardo({ T, x, y, s = 1, cria = false, o = 1, echado = 0 }) {
  const c = cria ? '#b88a5c' : '#8a6a4a';
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${echado * 8})`} opacity={o}>
    {[-80, -40, 50, 90].map((lx, i) => <rect key={i} x={lx - 14} y={30 - echado * 40} width={28} height={130 - echado * 70} rx={10} fill={i % 2 ? c : '#6d5236'} stroke={KC.ink} strokeWidth={6} />)}
    <ellipse cx={0} cy={0} rx={130} ry={70} fill={c} stroke={KC.ink} strokeWidth={8} />
    <path d="M 90 -30 Q 120 -110 170 -110 Q 220 -100 215 -60 Q 200 -20 150 -10 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    {!cria && <path d="M 150 -110 Q 120 -230 20 -230 Q 90 -200 120 -100 Z" fill="#5a4630" stroke={KC.ink} strokeWidth={6} />}
    <path d="M 150 -100 L 128 -128 L 160 -112 Z" fill={c} stroke={KC.ink} strokeWidth={5} />
    <circle cx={182} cy={-78} r={7} fill={KC.ink} />
    {!cria && <path d="M 200 -30 q 6 30 -4 46" stroke="#4a3622" strokeWidth={8} fill="none" />}
  </g>;
}
// Montañas de los Pirineos (fondo).
function Montanas({ o = 1 }) {
  return <g opacity={o}>
    <path d="M 0 900 L 220 560 L 380 760 L 600 480 L 820 760 L 960 600 L 1080 720 L 1080 1920 L 0 1920 Z" fill="#7fb7a6" stroke={KC.ink} strokeWidth={8} />
    <path d="M 600 480 L 660 570 L 620 560 L 580 600 L 550 555 Z M 220 560 L 270 640 L 200 620 Z" fill="#fff" />
    <rect x={0} y={1080} width={KW} height={840} fill="#5fa86a" />
  </g>;
}
// Pulmones por dentro: uno normal y uno chico y deforme.
function Pulmones({ T, r }) {
  const late = 1 + Math.sin(T * 2.2) * 0.02;
  return <svg width={2 * r} height={2 * r}>
    <rect width={2 * r} height={2 * r} fill="#1a0f14" />
    <g transform={`translate(${r} ${r}) scale(${(r / 200) * late})`}>
      <path d="M -8 -150 L -8 -60 M 8 -150 L 8 -60 M -8 -60 Q -40 -40 -60 -20 M 8 -60 Q 40 -40 60 -20" stroke="#f3d6d6" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -20 -40 Q -140 -60 -150 60 Q -150 150 -60 150 Q -20 140 -20 60 Z" fill="#f08a9a" stroke="#fff" strokeWidth={5} />
      <path d="M 30 -20 Q 90 -40 110 20 Q 130 60 90 70 Q 110 100 60 110 Q 30 100 30 40 Z" fill="#8a4a5a" stroke="#fff" strokeWidth={5} />
      <circle cx={80} cy={40} r={60 + Math.sin(T * 6) * 4} fill="none" stroke={KC.red} strokeWidth={6} strokeDasharray="12 10" />
    </g>
  </svg>;
}
// Células aplastadas del tejido congelado (al microscopio): núcleos rotos.
function CelulasRotas({ T, r }) {
  const R = krng(21);
  const c = Array.from({ length: 9 }, () => [R() * 2 * r, R() * 2 * r, 40 + R() * 30, R() * 180]);
  return <svg width={2 * r} height={2 * r}>
    <rect width={2 * r} height={2 * r} fill="#101a26" />
    {c.map(([x, y, w, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a + Math.sin(T + i) * 3})`}>
      <path d={`M ${-w} 0 Q ${-w * 0.4} ${-w * 0.5} ${w} -6 Q ${w * 0.5} ${w * 0.4} ${-w} 0 Z`} fill="#c9a9a0" stroke="#e8d6c8" strokeWidth={3} opacity=".8" />
      {[0, 1, 2].map((k) => <circle key={k} cx={-10 + k * 12} cy={-2 + (k % 2) * 6} r={5} fill="#5b3b6b" />)}
    </g>)}
  </svg>;
}
// Tira de genoma: n casillas con letras; cuántas se ven (f 0..1); difs = índices que brillan.
function TiraGenoma({ T, x, y, n = 16, w = 52, f = 1, seed = 3, difs = [], brilla = 0, cambia = {} }) {
  const R = krng(seed); const L = Array.from({ length: n }, () => LETRAS[Math.floor(R() * 4)]);
  return <g>{L.map((l, i) => { if (i / n >= f) return null; const lt = cambia[i] || l, d = difs.includes(i) && brilla > 0;
    return <g key={i} transform={`translate(${x + i * w} ${y})`}>
      <rect x={-w / 2 + 3} y={-30} width={w - 6} height={60} rx={8} fill={COL_L[lt]} stroke={d ? '#fff' : KC.ink} strokeWidth={d ? 7 + Math.sin(T * 8) * 2 : 4} opacity={d || !difs.length || !brilla ? 1 : 0.55} />
      <text x={0} y={14} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>{lt}</text>
    </g>; })}</g>;
}
// Pedacito de ADN (doble hélice corta) que flota.
function Pedacito({ T, x, y, largo, rot, seed }) {
  const m = mece(T, seed, 0.3);
  return <g transform={`translate(${x + m * 20} ${y + mece(T, seed + 4, 0.25) * 16}) rotate(${rot + m * 10})`}>
    {Array.from({ length: Math.max(2, Math.round(largo / 22)) }, (_, i) => { const px = -largo / 2 + i * 22, a = Math.sin(i * 0.9 + T * 2) * 18;
      return <g key={i}><line x1={px} y1={-a} x2={px} y2={a} stroke={[KC.pink, KC.cyan, KC.yellow, KC.mint][(i + seed) % 4]} strokeWidth={6} />
        <circle cx={px} cy={-a} r={6} fill="#e8f0ff" /><circle cx={px} cy={a} r={6} fill="#e8f0ff" /></g>; })}
  </g>;
}
// Tijeras CRISPR.
function Tijeras({ x, y, abre = 0, s = 1 }) {
  const a = 10 + abre * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 150 -10 L 150 10 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={6} /><circle cx={-50} cy={-14} r={30} fill="none" stroke={KC.lilac} strokeWidth={14} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 150 -10 L 150 10 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={6} /><circle cx={-50} cy={14} r={30} fill="none" stroke={KC.lilac} strokeWidth={14} /></g>
    <circle r={10} fill={KC.ink} />
  </g>;
}
// Calendario que pasa hojas: muestra el mes n.
function Calendario({ x, y, n, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-110} width={240} height={240} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-110} width={240} height={60} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-66} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">MES</text>
    <text x={0} y={90} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.ink}>{n}</text>
    {[-70, 0, 70].map((dx, i) => <rect key={i} x={dx - 8} y={-130} width={16} height={40} rx={6} fill={KC.ink} />)}
  </g>;
}

function Mamut() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P1: CUES.Paso1, Ro: CUES.Roto, P2: CUES.Paso2, P3: CUES.Paso3, P4: CUES.Paso4, Pr: CUES.Pregunta, Ra: CUES.Raton, Oj: CUES.Ojo, P5: CUES.Paso5, Bu: CUES.Bucardo, Pu: CUES.Pulmones, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.6, kEase.rebote);
  const R = krng(9);
  const trozos = Array.from({ length: 12 }, () => [140 + R() * 800, 560 + R() * 560, 50 + R() * 120, R() * 180]);
  const armado = kprog(T, K.P2 + 0.3, K.P2 + 3.2, kEase.suave);
  const lana = kprog(T, K.Ra + 2.4, K.Ra + 4.2, kEase.suave);
  const mes = Math.min(22, 1 + Math.floor(Math.max(0, T - (K.P5 + 0.8)) / 0.11));
  const corta = kprog(T, K.P4 + 1.0, K.P4 + 1.6);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el manual cae sobre el hielo */}
      <Escena T={T} a={K.G} b={K.P1} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <BloqueHielo T={T} x={560} y={1000} s={1.15} grieta={kprog(T, K.G + 0.3, K.G + 1.4)} />
          <Manual x={60} y={klerp(-560, 330, cae)} s={1} rot={klerp(-20, -4, cae)} estados={[]} />
        </SvgCapa>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.6)" />
      </Escena>
      {/* 1 · paso 1: buscar una célula viva */}
      <Escena T={T} a={K.P1} b={K.Ro} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <BloqueHielo T={T} x={540} y={1020} s={1.1} grieta={1} />
          <g transform={`translate(${klerp(900, 640, kprog(T, K.P1 + 0.2, K.P1 + 1.0, kEase.sale))} ${klerp(560, 880, kprog(T, K.P1 + 0.2, K.P1 + 1.0, kEase.sale))}) rotate(35)`}>
            <path d="M 0 0 L -14 -320 L 14 -320 Z" fill="#cfd6de" stroke={KC.ink} strokeWidth={6} /><path d="M 10 0 L 40 -320 L 60 -316 Z" fill="#cfd6de" stroke={KC.ink} strokeWidth={6} /></g>
          <Marca x={590} y={380} s={0.6} tipo="no" s={1} o={kprog(T, K.P1 + 2.6, K.P1 + 3.0)} />
        </SvgCapa>
        <Lupa T={T} at={K.P1 + 1.1} until={K.Ro - 0.3} x={300} y={850} r={190} fx={600} fy={960} interior={(Tl, r) => <CelulasRotas T={Tl} r={r} />} etiqueta="AL MICROSCOPIO · tejido" tinte={KC.cyan} />
      </Escena>
      {/* 2 · el ADN roto en pedacitos (micro, fondo oscuro) */}
      <Escena T={T} a={K.Ro} b={K.P2} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <g opacity={1 - kprog(T, K.Ro + 0.6, K.Ro + 1.2)}><Pedacito T={T} x={540} y={840} largo={720} rot={0} seed={1} /></g>
          {trozos.map(([x, y, l, r], i) => { const k = kprog(T, K.Ro + 0.6, K.Ro + 1.6, kEase.sale);
            return <g key={i} opacity={k}><Pedacito T={T} x={klerp(180 + i * 60, x, k)} y={klerp(840, y, k)} largo={l} rot={r * k} seed={i + 2} /></g>; })}
        </SvgCapa>
        <Ambiente T={T} n={30} color="rgba(160,210,255,.35)" />
      </Escena>
      {/* 3 · paso 2: armar el rompecabezas */}
      <Escena T={T} a={K.P2} b={K.P3} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          {trozos.map(([x, y, l, r], i) => { const fila = i % 3, col = Math.floor(i / 3), tx = 130 + col * 210, ty = 700 + fila * 150, k = kprog(T, K.P2 + 0.3 + i * 0.18, K.P2 + 1.2 + i * 0.18, kEase.suave);
            return <g key={i}><Pedacito T={T * (1 - k)} x={klerp(x, tx + 100, k)} y={klerp(y, ty, k)} largo={klerp(l, 190, k)} rot={klerp(r, 0, k)} seed={i + 2} /></g>; })}
          <rect x={90} y={620} width={900} height={480} rx={24} fill="none" stroke={KC.gold} strokeWidth={6} strokeDasharray="20 14" opacity={armado} />
          <Marca x={590} y={380} s={0.6} tipo="ok" o={kprog(T, K.P2 + 3.0, K.P2 + 3.4)} />
        </SvgCapa>
      </Escena>
      {/* 4 · paso 3: comparar con el elefante asiático */}
      <Escena T={T} a={K.P3} b={K.P4} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ElefanteAsiatico T={T} x={300} y={840} s={0.72} />
          <MamutLanudo T={T} x={790} y={840} s={0.72} o={kprog(T, K.P3 + 0.5, K.P3 + 1.0)} />
          <TiraGenoma T={T} x={130} y={1040} n={16} w={54} f={kprog(T, K.P3 + 1.4, K.P3 + 2.4)} seed={3} difs={[3, 9, 13]} brilla={kprog(T, K.P3 + 3.0, K.P3 + 3.2)} />
          <TiraGenoma T={T} x={130} y={1110} n={16} w={54} f={kprog(T, K.P3 + 1.6, K.P3 + 2.6)} seed={3} difs={[3, 9, 13]} brilla={kprog(T, K.P3 + 3.0, K.P3 + 3.2)} cambia={{ 3: 'T', 9: 'A', 13: 'C' }} />
          <Marca x={590} y={380} s={0.6} tipo="ok" o={kprog(T, K.P3 + 3.6, K.P3 + 4.0)} />
        </SvgCapa>
      </Escena>
      {/* 5 · paso 4: editar con CRISPR */}
      <Escena T={T} a={K.P4} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <ElefanteAsiatico T={T} x={540} y={760} s={0.62} color={mixHex(ELEF, '#8a6440', kprog(T, K.P4 + 2.4, K.P4 + 3.8))} />
          <TiraGenoma T={T} x={130} y={1060} n={16} w={54} f={1} seed={3} difs={[3, 9, 13]} brilla={corta} cambia={corta >= 1 ? { 3: 'T', 9: 'A', 13: 'C' } : {}} />
          <Tijeras x={klerp(-100, 300, kprog(T, K.P4 + 0.2, K.P4 + 1.0, kEase.sale))} y={990} abre={Math.abs(Math.sin(T * 6))} s={0.9} />
          <Marca x={590} y={380} s={0.6} tipo="espera" o={kprog(T, K.P4 + 3.4, K.P4 + 3.8)} />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ra} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={270} y={1080} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 880)`}>?</text></SvgCapa>
      </Escena>
      {/* 7–8 · el ratón lanudo */}
      <Escena T={T} a={K.Ra} b={K.P5} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <ellipse cx={540} cy={1070} rx={360} ry={50} fill="rgba(0,0,0,.18)" />
          <Raton T={T} x={520} y={960} s={1.25} lana={lana} />
          {lana > 0 && lana < 1 && Array.from({ length: 8 }, (_, i) => { const a = i * 0.8, d = 240 + lana * 120; return <circle key={i} cx={520 + Math.cos(a) * d} cy={940 + Math.sin(a) * d * 0.6} r={10 * (1 - lana)} fill="#fff" />; })}
        </SvgCapa>
      </Escena>
      {/* 9 · paso 5: óvulos, mamá elefanta y 22 meses */}
      <Escena T={T} a={K.P5} b={K.Bu} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <ElefanteAsiatico T={T} x={420} y={880} s={0.75} panza={kprog(T, K.P5 + 0.8, K.P5 + 3.3)} />
          <Calendario x={850} y={1010} n={mes} s={0.8} />
          <Marca x={590} y={380} s={0.6} tipo="espera" o={kprog(T, K.P5 + 3.6, K.P5 + 4.0)} />
        </SvgCapa>
      </Escena>
      {/* 10–11 · el bucardo de 2003 */}
      <Escena T={T} a={K.Bu} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#bfe6f2' }}></div>
        <SvgCapa>
          <Montanas />
          <Bucardo T={T} x={820} y={880} s={0.85} o={0.35 * (1 - kprog(T, K.Pu, K.Pu + 0.6))} />
          <Bucardo T={T} x={540} y={1150} s={1.0} cria echado={kprog(T, K.Pu + 0.8, K.Pu + 1.8, kEase.suave)} />
          <rect x={0} y={0} width={KW} height={KH} fill="#0d1424" opacity={0.45 * kprog(T, K.Pu, K.Pu + 0.8)} />
        </SvgCapa>
        <Lupa T={T} at={K.Pu + 0.4} until={K.Ci - 0.3} x={320} y={760} r={190} fx={560} fy={1130} interior={(Tl, r) => <Pulmones T={Tl} r={r} />} etiqueta="POR DENTRO · pulmones" tinte={KC.pink} />
      </Escena>
      {/* 12 · cierre: el hielo del inicio, con el ratón lanudo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <BloqueHielo T={T} x={560} y={1020} s={1.15} grieta={1} />
          <Manual x={60} y={330} rot={-4} estados={['no', 'ok', 'ok', 'espera', 'espera'].map((e, i) => (T > K.Ci + 0.6 + i * 0.35 ? e : null))} />
          <Raton T={T} x={700} y={klerp(600, 740, kprog(T, K.Ci + 2.0, K.Ci + 2.6, kEase.rebote))} s={0.55} lana={1} />
        </SvgCapa>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.6)" />
      </Escena>

      <PasoBadge T={T} pasos={[
        { n: 1, at: K.P1, until: K.P2, texto: 'consigue una célula viva' },
        { n: 2, at: K.P2, until: K.P3, texto: 'arma el genoma' },
        { n: 3, at: K.P3, until: K.P4, texto: 'compáralo con el elefante' },
        { n: 4, at: K.P4, until: K.Pr, texto: 'edita con CRISPR' },
        { n: 5, at: K.P5, until: K.Bu, texto: 'óvulos y mamá elefanta' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.P1 - 0.3} texto="5 pasos (de verdad)" x={540} y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.P1 + 3.0} until={K.Ro - 0.2} texto="2019: núcleos de 28 000 años no se dividieron" x={540} y={1500} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ro + 0.2} until={K.P2 - 0.2} texto="AL MICROSCOPIO · ADN de mamut" x={540} y={620} tam={36} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ro + 1.4} until={K.P2 - 0.2} x={60} y={1480} texto="pedacitos de 40 a 500 letras" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ro + 1.6} until={K.P2 - 0.2} x={60} y={1540} texto="(dibujo no a escala)" tam={26} color="rgba(246,243,236,.7)" />
      <Chip T={T} at={K.P2 + 2.6} until={K.P3 - 0.2} texto="2015 · genomas completos de 2 mamuts" x={540} y={1500} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.P2 + 2.8} until={K.P3 - 0.2} x={540} y={1570} texto="Current Biology" it tam={28} lado="der" color={KC.texto} />
      <Etq T={T} at={K.P3 + 0.4} until={K.P4 - 0.2} x={60} y={620} texto="elefante asiático" lado="der" tam={30} color={KC.ink} />
      <Etq T={T} at={K.P3 + 0.6} until={K.P4 - 0.2} x={60} y={660} texto="Elephas maximus" it lado="der" tam={26} color={KC.ink} />
      <Etq T={T} at={K.P3 + 1.0} until={K.P4 - 0.2} x={1040} y={620} texto="mamut lanudo" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.P3 + 1.2} until={K.P4 - 0.2} x={1040} y={660} texto="Mammuthus primigenius" it lado="izq" tam={26} color={KC.ink} />
      <Chip T={T} at={K.P3 + 3.2} until={K.P4 - 0.2} texto="su pariente vivo más cercano" x={540} y={1500} tam={38} borde={KC.yellow} />
      {['pelo', 'grasa', 'frío'].map((t, i) => <Chip key={t} T={T} at={K.P4 + 1.8 + i * 0.4} until={K.Pr - 0.2} texto={t} x={900} y={720 + i * 84} tam={36} borde={[KC.orange, KC.yellow, KC.cyan][i]} />)}
      <Chip T={T} at={K.P4 + 3.0} until={K.Pr - 0.2} texto="plan: aún no nace ningún elefante editado" x={480} y={1500} tam={30} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Ra + 0.9} until={K.Ra + 2.6} anio="2025" quien="Colossal · Texas" revista="ratón lanudo · preprint bioRxiv" x={420} y={620} />
      <Chip T={T} at={K.Ra + 2.8} until={K.Oj - 0.2} texto="ediciones en 7 genes · preprint" x={540} y={1500} tam={36} borde={LANA} />
      <MitoTachado T={T} at={K.Oj + 0.2} tacharEn={K.Oj + 1.4} until={K.P5 - 0.2} texto="ratón con ADN de mamut" x={380} y={500} tam={38} />
      <Chip T={T} at={K.Oj + 1.6} until={K.P5 - 0.2} texto="cambios en genes del propio ratón · cero genes de mamut" x={540} y={1500} tam={27} borde={KC.mint} />
      <NumeroGigante T={T} at={K.P5 + 2.6} until={K.Bu - 0.2} valor={22} desde={1} dur={1.0} sufijo=" meses" etiqueta="embarazo de una elefanta" x={540} y={1530} tam={120} color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Bu + 1.0} until={K.Bu + 3.6} anio="2003" quien="España y Francia" revista="bucardo clonado · Theriogenology 2009" x={400} y={640} />
      <Etq T={T} at={K.Bu + 0.3} until={K.Pu - 0.2} x={590} y={990} texto="Capra pyrenaica pyrenaica" it lado="der" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Bu + 3.7} until={K.Pu - 0.2} texto="óvulos de cabra doméstica" x={540} y={1500} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Bu + 0.4} until={K.Bu + 3.5} texto="el último bucardo murió en 2000" x={540} y={1500} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Pu + 0.8} until={K.Ci - 0.2} texto="vivió solo unos minutos" x={540} y={1500} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou - 0.1} texto="ningún mamut ha nacido (aún)" x={540} y={1500} tam={38} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P1 - 0.1} texto="¿Revivir un mamut? *Cinco pasos.*" />
      <Subtitulo T={T} idx={1} at={K.P1 + 0.1} until={K.Ro - 0.1} texto="Una célula viva: *no hay ninguna.*" />
      <Subtitulo T={T} idx={2} at={K.Ro + 0.1} until={K.P2 - 0.1} texto="Su ADN: *en pedacitos.*" />
      <Subtitulo T={T} idx={3} at={K.P2 + 0.1} until={K.P3 - 0.1} texto="Rompecabezas: *genoma completo.*" />
      <Subtitulo T={T} idx={4} at={K.P3 + 0.1} until={K.P4 - 0.1} texto="Contra el *elefante asiático.*" />
      <Subtitulo T={T} idx={5} at={K.P4 + 0.1} until={K.Pr - 0.1} texto="CRISPR: *pelo, grasa y frío.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ra - 0.1} texto="¿Ya funcionó *en algún animal?*" />
      <Subtitulo T={T} idx={7} at={K.Ra + 0.1} until={K.Oj - 0.1} texto="2025: *ratones lanudos.*" />
      <Subtitulo T={T} idx={8} at={K.Oj + 0.1} until={K.P5 - 0.1} texto="Genes de ratón, *sin ADN de mamut.*" />
      <Subtitulo T={T} idx={9} at={K.P5 + 0.1} until={K.Bu - 0.1} texto="Una mamá elefanta: *22 meses.*" />
      <Subtitulo T={T} idx={10} at={K.Bu + 0.1} until={K.Pu - 0.1} texto="2003: *clonaron un bucardo.*" />
      <Subtitulo T={T} idx={11} at={K.Pu + 0.1} until={K.Ci - 0.1} texto="Murió *a los minutos.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Por ahora: *un ratón muy peludo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.P1 + 0.3, 'avatar_11_sorprendido', 'gancho'],
        [K.P1 + 1.2, K.Ro - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P2 + 1.5, K.P3 - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P4 + 0.8, K.Pr - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pr + 0.05, K.Ra + 0.8, 'avatar_06_pensativo_menton', 'grande'],
        [K.Oj + 0.3, K.P5 - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Bu + 1.0, K.Pu - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="53" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MamutApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Mamut /></CompositionStage></div>;
}
window.MamutApp = MamutApp;
