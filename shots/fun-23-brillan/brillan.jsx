// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Fungi Mati #23 · Esa madera no está embrujada: hongos que brillan — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Química (Kotlobay et al. 2018): ácido cafeico →(hispidina sintasa)→ hispidina →(H3H)→ 3-hidroxihispidina (luciferina)
// →(luciferasa + O₂: luz verde)→ oxiluciferina →(CPH)→ ácido cafeico.

const LUZ = '#9dff6a', LUZ2 = '#d8ffb8', NOCHE1 = '#0b1630', NOCHE2 = '#12322c';

// Halo de luz verde (para todo lo que brilla).
const halo = (b, px = 18) => ({ filter: `drop-shadow(0 0 ${px * b}px ${LUZ}) drop-shadow(0 0 ${px * 0.4 * b}px ${LUZ})` });

// Bosque de noche: degradado, luna, troncos al fondo, suelo con hojarasca.
// modo cine (pase a mano): `suelo` baja la línea del piso para que el sujeto pueda ir grande y al centro del cuadro.
function BosqueNoche({ T, palmas = false, suelo = 1150 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${NOCHE1} 0%, #102446 45%, ${NOCHE2} 100%)` }}></div>
    {fsvg(<>
      {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 3); return <circle key={i} cx={g() * KW} cy={330 + g() * (suelo - 850)} r={2 + g() * 3} fill="#fff" opacity={0.3 + 0.5 * (0.5 + 0.5 * Math.sin(T * 2 + i))} />; })}
      <circle cx={860} cy={420} r={70} fill="#f4efd0" opacity=".9" /><circle cx={885} cy={405} r={66} fill="#102446" opacity=".55" />
      {!palmas && [[80, 70], [300, 50], [760, 60], [990, 80]].map(([x, w], i) => <rect key={i} x={x - w / 2} y={360} width={w} height={suelo - 250} fill="#08101f" opacity=".85" />)}
      {palmas && [[130, 1.0], [960, 1.1], [560, 0.75]].map(([x, s], i) => <Palma key={i} T={T} x={x} y={suelo + 30} s={s * (suelo > 1200 ? 1.28 : 1)} seed={i} />)}
      <rect x={0} y={suelo} width={KW} height={800} fill="#131216" />
      <path d={`M 0 ${suelo} ${Array.from({ length: 19 }, (_, i) => `Q ${i * 60 + 30} ${suelo - 20 + (i % 3) * 8} ${i * 60 + 60} ${suelo}`).join(' ')} L 1080 ${suelo + 30} L 0 ${suelo + 30} Z`} fill="#2a1d14" />
    </>, 5)}
  </>;
}

// Palma (babasú) de silueta: tronco y abanico de hojas largas.
function Palma({ T, x, y, s = 1, seed = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity=".9">
    <path d="M -18 0 Q -10 -300 6 -560 L 26 -560 Q 14 -300 18 0 Z" fill="#0a1426" />
    {Array.from({ length: 9 }, (_, i) => { const a = -170 + i * 20 + mece(T, seed + i, 0.25) * 4; const r = (a * Math.PI) / 180;
      return <path key={i} d={`M 16 -560 Q ${16 + Math.cos(r) * 160} ${-560 + Math.sin(r) * 160 - 70} ${16 + Math.cos(r) * 330} ${-560 + Math.sin(r) * 330 + 60}`} stroke="#0a1426" strokeWidth={22} fill="none" strokeLinecap="round" />; })}
  </g>;
}

// Tronco podrido tirado; abre = 0..1 se parte en dos y por dentro brilla el micelio. brillo 0..1.
function Tronco({ T, x = 540, y = 1000, s = 1, abre = 1, brillo = 1 }) {
  const sep = 70 * kEase.sale(abre), rot = 9 * kEase.sale(abre);
  const mitad = (lado) => <g transform={`translate(${lado * sep} ${-10 * abre}) rotate(${lado * rot})`}>
    <path d={`M ${lado * 20} -95 L ${lado * 430} -90 Q ${lado * 470} 0 ${lado * 430} 90 L ${lado * 20} 95 Z`} fill="#6b4a2e" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-60, -20, 25, 60].map((dy, i) => <path key={i} d={`M ${lado * (60 + i * 30)} ${dy} Q ${lado * 240} ${dy - 10} ${lado * 400} ${dy + 6}`} stroke="#4a311d" strokeWidth={6} fill="none" />)}
    <ellipse cx={lado * 432} cy={0} rx={38} ry={90} fill="#8a6440" stroke={KC.ink} strokeWidth={7} />
    {[30, 55, 75].map((r, i) => <ellipse key={i} cx={lado * 432} cy={0} rx={r * 0.4} ry={r} fill="none" stroke="#5e4029" strokeWidth={3} />)}
    {/* cara partida: madera clara, con micelio que brilla */}
    <path d={`M ${lado * 20} -95 Q ${lado * -10} -40 ${lado * 22} 0 Q ${lado * -6} 50 ${lado * 20} 95`} fill="none" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={lado * 8} cy={0} rx={34} ry={92} fill={mixHex('#c9a77a', LUZ, 0.75 * brillo)} stroke={KC.ink} strokeWidth={6} style={halo(brillo, 26)} />
    {brillo > 0 && <g style={halo(brillo, 10)}>
      {[-60, -25, 15, 50].map((dy, i) => <path key={i} d={`M ${lado * 8} ${dy} q ${lado * 14} 10 ${lado * 4} 22 t ${lado * 6} 18`} stroke={LUZ2} strokeWidth={4} fill="none" opacity={brillo} />)}
    </g>}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && abre > 0.2 && <ellipse cx={0} cy={0} rx={260 * brillo} ry={190 * brillo} fill={LUZ} opacity={0.16 * brillo * (0.85 + 0.15 * Math.sin(T * 2.2))} />}
    {mitad(-1)}{mitad(1)}
  </g>;
}

// Fantasmita de caricatura (lo "embrujado").
function Fantasma({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  const f = Math.sin(T * 3) * 12;
  return <g transform={`translate(${x} ${y + f}) scale(${s})`} opacity={o}>
    <path d="M -80 60 L -80 -30 Q -80 -120 0 -120 Q 80 -120 80 -30 L 80 60 Q 60 40 40 60 Q 20 80 0 60 Q -20 40 -40 60 Q -60 80 -80 60 Z" fill="#f4f6ff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={-28} cy={-40} rx={12} ry={18} fill={KC.ink} /><ellipse cx={28} cy={-40} rx={12} ry={18} fill={KC.ink} />
    <ellipse cx={0} cy={0} rx={16} ry={20} fill={KC.ink} />
  </g>;
}

// Mycena: setita de sombrero acampanado y pie delgado; el sombrero brilla.
function Mycena({ T, x, y, s = 1, b = 1, crece = 1, seed = 0 }) {
  if (crece <= 0) return null;
  const h = 120 * kEase.sale(crece), ladea = mece(T, seed + 2, 0.3) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${ladea})`} style={halo(b, 14)}>
    <path d={`M -5 0 Q -8 ${-h * 0.5} -3 ${-h} L 3 ${-h} Q 8 ${-h * 0.5} 5 0 Z`} fill={mixHex('#d9d2c0', LUZ, 0.6 * b)} stroke={KC.ink} strokeWidth={4} />
    <path d={`M -36 ${-h + 6} Q -38 ${-h - 60} 0 ${-h - 64} Q 38 ${-h - 60} 36 ${-h + 6} Q 0 ${-h - 6} -36 ${-h + 6} Z`} fill={mixHex('#c9b89a', LUZ, 0.85 * b)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {[-22, -10, 2, 14, 26].map((dx, i) => <line key={i} x1={dx * 0.9} y1={-h - 50 + Math.abs(dx)} x2={dx} y2={-h + 2} stroke={KC.ink} strokeWidth={2} opacity=".35" />)}
  </g>;
}

// Panellus: setas en repisa (forma de riñón) pegadas de lado a un tronco.
function Repisa({ x, y, s = 1, b = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={halo(b, 14)}>
    <path d="M 0 -18 Q 70 -60 120 -20 Q 140 10 100 30 Q 50 44 0 18 Z" fill={mixHex('#d8b07a', LUZ, 0.8 * b)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.25, 0.45, 0.65, 0.85].map((u, i) => <path key={i} d={`M 6 0 Q ${60 * u + 20} ${10} ${110 * u + 6} ${24 - u * 10}`} stroke={KC.ink} strokeWidth={2} fill="none" opacity=".35" />)}
  </g>;
}

// Abanico de micelio (Armillaria) bajo la corteza.
function Abanico({ x, y, s = 1, b = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={halo(b, 14)}>
    <path d="M 0 0 L -70 -150 Q 0 -190 70 -150 Z" fill={mixHex('#f3efe4', LUZ, 0.7 * b)} opacity=".95" />
    {Array.from({ length: 9 }, (_, i) => { const a = -1.15 + i * 0.29; return <path key={i} d={`M 0 0 Q ${Math.sin(a) * 60} ${-90} ${Math.sin(a) * 160 * 0.55} ${-Math.cos(a) * 160}`} stroke={mixHex('#fffaf0', LUZ2, b)} strokeWidth={4} fill="none" />; })}
  </g>;
}

// Viñeta redonda (para mostrar cada hongo en la oscuridad).
function Vineta({ x, y, r = 160, children, e = 1 }) {
  if (e <= 0) return null;
  const id = 'vin' + x;
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
    <circle r={r} fill="#0c1a2e" />
    <g clipPath={`url(#${id})`}>{children}</g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={10} /><circle r={r - 8} fill="none" stroke={LUZ} strokeWidth={4} opacity=".6" />
  </g>;
}

// Hongo genérico chiquito (para la cuadrícula de "casi ninguno brilla").
function HongoMini({ x, y, s = 1, b = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={b ? halo(b, 12) : null}>
    <rect x={-8} y={-30} width={16} height={32} rx={5} fill={b ? LUZ2 : '#d7dbe2'} stroke={KC.ink} strokeWidth={4} />
    <path d="M -34 -26 Q -32 -66 0 -68 Q 32 -66 34 -26 Z" fill={b ? LUZ : '#9aa2ae'} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}

/* ---------- moléculas (esquemáticas) ---------- */
const hexPath = (r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }).join(' ') + ' Z';
// tipo: 'cafeico' (anillo + cola), 'hispidina' (anillo + puente + segundo anillo), 'luciferina' (= hispidina con un OH extra dorado), 'oxi' (anillo + cola, pálida)
function Mol({ x, y, s = 1, tipo = 'cafeico', color = KC.yellow, b = 0, extra = 1 }) {
  const anillo = (cx, c) => <g transform={`translate(${cx} 0)`}><path d={hexPath(40)} fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /><path d={hexPath(24)} fill="none" stroke={KC.ink} strokeWidth={3} opacity=".5" /></g>;
  const oh = (cx, cy, c = '#fff', k = 1) => <g transform={`translate(${cx} ${cy}) scale(${k})`}><circle r={20} fill={c} stroke={KC.ink} strokeWidth={4} /><text y={7} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill={KC.ink}>OH</text></g>;
  const dos = tipo === 'hispidina' || tipo === 'luciferina';
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={b ? halo(b, 22) : null}>
    {dos ? <>
      <path d="M -40 0 L 0 -16 L 40 0" stroke={KC.ink} strokeWidth={8} fill="none" />
      {anillo(-80, color)}{anillo(80, mixHex(color, '#ffffff', 0.25))}
      <text x={80} y={8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>O</text>
      {oh(-128, -34)}{oh(-128, 34)}
      {tipo === 'luciferina' && oh(118, -44, KC.gold2, extra)}
    </> : <>
      {anillo(-50, color)}
      <path d="M -10 0 L 20 -22 L 50 0 L 80 -22" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinejoin="round" />
      <circle cx={92} cy={-22} r={14} fill={tipo === 'oxi' ? '#ffb3c7' : KC.red} stroke={KC.ink} strokeWidth={4} />
      {oh(-98, -34)}{oh(-98, 34)}
    </>}
  </g>;
}
// Luciferasa: "pac-man" que muerde.
function Luciferasa({ T, x, y, s = 1, boca = 0.5 }) {
  const a = 0.15 + 0.55 * boca;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${60 * Math.cos(a)} ${-60 * Math.sin(a)} A 60 60 0 1 0 ${60 * Math.cos(a)} ${60 * Math.sin(a)} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-6} cy={-30} r={9} fill={KC.ink} />
  </g>;
}
function O2({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-18} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cx={18} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <text y={8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">O₂</text>
  </g>;
}
// Flecha que se dibuja (p 0..1) de (x1,y1) a (x2,y2) con curva c.
function Flecha({ x1, y1, x2, y2, p = 1, c = 0, color = '#ffffff' }) {
  if (p <= 0) return null;
  const mx = (x1 + x2) / 2 + c, my = (y1 + y2) / 2 - c * 0.2;
  const L = 900;
  const ex = klerp(klerp(x1, mx, p), klerp(mx, x2, p), p), ey = klerp(klerp(y1, my, p), klerp(my, y2, p), p);
  const tx = klerp(mx, x2, p) - klerp(x1, mx, p), ty = klerp(my, y2, p) - klerp(y1, my, p), an = Math.atan2(ty, tx) * 57.3;
  return <g>
    <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} stroke={color} strokeWidth={8} fill="none" strokeDasharray={`${p * L} ${L}`} strokeLinecap="round" opacity=".85" />
    <path d="M -16 -12 L 6 0 L -16 12" transform={`translate(${ex} ${ey}) rotate(${an})`} stroke={color} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Destello de luz (rayos).
function Destello({ x, y, k = 1, T }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={200 * k} fill={LUZ} opacity={0.35 * (1 - k * 0.5)} />
    <circle r={90 * k} fill={LUZ2} opacity={0.8} style={halo(1, 30)} />
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2 + T * 0.4; return <line key={i} x1={Math.cos(a) * 110 * k} y1={Math.sin(a) * 110 * k} x2={Math.cos(a) * (170 + 30 * Math.sin(T * 6 + i)) * k} y2={Math.sin(a) * (170 + 30 * Math.sin(T * 6 + i)) * k} stroke={LUZ} strokeWidth={10} strokeLinecap="round" />; })}
  </g>;
}

/* ---------- el experimento de Brasil ---------- */
// Hongo falso de acrílico con foco LED verde (encendido) o apagado. Con pegamento.
function HongoFalso({ T, x, y, s = 1, on = 1 }) {
  const b = on * (0.88 + 0.12 * Math.sin(T * 5 + x));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0 && <ellipse cx={0} cy={-90} rx={150} ry={120} fill={LUZ} opacity={0.22 * b} />}
    <rect x={-16} y={-80} width={32} height={80} rx={8} fill={on ? 'rgba(200,255,180,.85)' : 'rgba(200,210,225,.55)'} stroke={KC.ink} strokeWidth={5} />
    <path d="M -80 -76 Q -78 -150 0 -154 Q 78 -150 80 -76 Q 0 -90 -80 -76 Z" fill={on ? 'rgba(170,255,140,.9)' : 'rgba(190,200,215,.6)'} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" style={on ? halo(b, 22) : null} />
    <circle cx={0} cy={-110} r={14} fill={on ? '#ffffff' : '#7a8290'} stroke={KC.ink} strokeWidth={3} />
    <path d="M -60 -120 Q -50 -140 -30 -146" stroke="#fff" strokeWidth={6} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
function Mosca({ x, y, s = 1, rot = 0, T = 0 }) {
  const w = Math.sin(T * 60) * 0.3;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={-10} cy={-12} rx={16} ry={9} fill="#dfefff" opacity=".85" stroke={KC.ink} strokeWidth={2} transform={`rotate(${-30 + w * 30} -2 -4)`} />
    <ellipse cx={10} cy={-12} rx={16} ry={9} fill="#dfefff" opacity=".85" stroke={KC.ink} strokeWidth={2} transform={`rotate(${30 - w * 30} 2 -4)`} />
    <ellipse cx={0} cy={0} rx={10} ry={16} fill="#2b2b33" stroke={KC.ink} strokeWidth={3} /><circle cx={0} cy={-16} r={8} fill="#a3262a" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Escarabajo({ x, y, s = 1, rot = 0, color = '#3a2a1a', vuela = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((l) => [-8, 2, 12].map((dy, i) => <line key={l + '' + i} x1={l * 10} y1={dy} x2={l * 24} y2={dy + 6} stroke={KC.ink} strokeWidth={3} />))}
    {vuela > 0 && [-1, 1].map((l) => <ellipse key={'a' + l} cx={l * 20} cy={-6} rx={22} ry={10} fill="#e6f2ff" opacity=".8" transform={`rotate(${l * (20 + Math.sin(T * 50) * 25)} ${l * 6} -6)`} />)}
    <ellipse cx={0} cy={4} rx={15} ry={20} fill={color} stroke={KC.ink} strokeWidth={3} /><line x1={0} y1={-14} x2={0} y2={22} stroke={KC.ink} strokeWidth={2} />
    <circle cx={0} cy={-18} r={8} fill={color} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Chinche({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -22 L 18 -6 L 12 20 L -12 20 L -18 -6 Z" fill="#4e7a2a" stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M 0 -6 L 12 18 L -12 18 Z" fill="#3a5c1f" />
  </g>;
}
function Hormiga({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((l) => [-4, 4, 12].map((dy, i) => <line key={l + '' + i} x1={0} y1={dy} x2={l * 16} y2={dy + 8} stroke={KC.ink} strokeWidth={2} />))}
    <circle cx={0} cy={-14} r={6} fill="#5a2a1a" stroke={KC.ink} strokeWidth={2} /><circle cx={0} cy={0} r={6} fill="#5a2a1a" stroke={KC.ink} strokeWidth={2} /><ellipse cx={0} cy={15} rx={8} ry={10} fill="#5a2a1a" stroke={KC.ink} strokeWidth={2} />
  </g>;
}

// Neonothopanus gardneri: seta en forma de embudo (amarillo-naranja de día), brilla verde.
function Gardneri({ T, x, y, s = 1, b = 1 }) {
  const bb = b * (0.9 + 0.1 * Math.sin(T * 2));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-170} rx={240} ry={170} fill={LUZ} opacity={0.18 * bb} />
    <g style={halo(bb, 22)}>
      <path d="M -20 0 Q -16 -90 -12 -150 L 12 -150 Q 16 -90 20 0 Z" fill={mixHex('#f0d27a', LUZ, 0.6 * bb)} stroke={KC.ink} strokeWidth={6} />
      <path d="M -170 -230 Q -90 -190 -12 -150 L 12 -150 Q 90 -190 170 -230 Q 90 -262 0 -258 Q -90 -262 -170 -230 Z" fill={mixHex('#e8a93a', LUZ, 0.8 * bb)} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[-120, -70, -25, 25, 70, 120].map((dx, i) => <path key={i} d={`M ${dx} ${-222 + Math.abs(dx) * -0.05} Q ${dx * 0.5} -190 ${dx * 0.1} -156`} stroke={KC.ink} strokeWidth={2} fill="none" opacity=".35" />)}
    </g>
  </g>;
}

// Dinosaurio saurópodo de caricatura.
function Dino({ T, x, y, s = 1 }) {
  const cuello = Math.sin(T * 1.2) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -160 -60 Q -120 -140 0 -140 Q 90 -140 120 -100 Q 150 -190 ${180 + cuello} -270 Q ${200 + cuello} -300 ${230 + cuello} -290 Q ${250 + cuello} -270 ${226 + cuello} -250 Q 180 -170 170 -70 Q 160 -20 110 -20 L 110 40 L 70 40 L 70 -20 L -60 -20 L -60 40 L -100 40 L -100 -30 Q -200 -40 -300 10 Q -200 -70 -160 -60 Z`} fill="#4fae6b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={222 + cuello} cy={-278} r={6} fill={KC.ink} />
    {[[-100, -110], [-30, -125], [40, -120]].map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r={12} fill="#3d8f56" />)}
  </g>;
}
// Nube (bosque de niebla).
function Nube({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -70 20 Q -90 -20 -50 -26 Q -40 -60 0 -54 Q 30 -76 56 -44 Q 96 -44 86 -6 Q 100 22 70 26 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}

function BrillanShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Quienes, R: CUES.Raro, Cf: CUES.Cafeico, Lf: CUES.Luciferina, Lc: CUES.Luciferasa, P: CUES.Pregunta, E: CUES.Estudio, Tr: CUES.Trampas, H: CUES.Hipotesis, Rj: CUES.Reloj, J: CUES.Jurasico, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const abre = kprog(T, K.G + 0.2, K.G + 0.9, kEase.sale);
  const brilloG = kprog(T, K.G + 0.35, K.G + 1.0);
  const fant = kprog(T, K.G + 0.9, K.G + 1.3) * (1 - kprog(T, K.G + 3.0, K.G + 3.5));
  // estaciones del ciclo (micro)
  const A = [300, 720], B = [760, 720], Cc = [760, 1130], D = [300, 1130];   // modo cine: el ciclo ocupa más alto del cuadro (antes 755 y 1010)
  const flash = kprog(T, K.Lc + 1.3, K.Lc + 1.8, kEase.sale) * (1 - kprog(T, K.Lc + 3.4, K.P, kEase.suave) * 0.6);
  // trampas: 14 íconos encendidos (cada uno ≈ 3 insectos) y 4 apagados. Casi todos moscas y escarabajos.
  const BICHOS_ON = ['m', 'e', 'm', 'm', 'e', 'm', 'e', 'm', 'e', 'c', 'm', 'e', 'h', 'm'];
  const BICHOS_OFF = ['m', 'e', 'm', 'c'];
  const bicho = (tipo, x, y, k, i) => { const r = (i * 47) % 60 - 30; return tipo === 'm' ? <Mosca key={i} x={x} y={y} s={k} rot={r} T={T} /> : tipo === 'e' ? <Escarabajo key={i} x={x} y={y} s={k} rot={r} /> : tipo === 'c' ? <Chinche key={i} x={x} y={y} s={k} rot={r} /> : <Hormiga key={i} x={x} y={y} s={k} rot={r} />; };
  // modo cine: hongos falsos más grandes (s 1.45) y más abajo; los insectos caen sobre sus sombreros en la misma proporción
  const posOn = (i) => { const tr = i % 2, k = Math.floor(i / 2); return [(tr ? 400 : 160) + (((k * 37) % 90) - 45) * 1.35, 1034 + ((k * 53) % 60) * 1.35]; };
  const posOff = (i) => [(i % 2 ? 920 : 690) + ((i * 23) % 40 - 20) * 1.35, 1075 + ((i * 31) % 40) * 1.35];
  // reloj circadiano (time-lapse: un ciclo ≈ 1.4 s de pantalla = ≈ 22 h)
  const ciclo = (t) => 0.5 + 0.5 * Math.sin(((t - K.Rj) / 1.4) * Math.PI * 2 - Math.PI / 2);
  const bRel = T >= K.Rj ? ciclo(T) : 0;
  const pGraf = kprog(T, K.Rj + 0.3, K.J - 0.2);
  // cierre: escarabajo que llega a la luz
  const vuelo = kprog(T, K.C + 0.8, K.C + 3.6, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tronco se parte y brilla */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06} origen="50% 55%">
        {/* modo cine (pase a mano): el tronco llena el cuadro de borde a borde y queda al centro (antes s 1.1 en y 940) */}
        <BosqueNoche T={T} suelo={1300} />
        <Ambiente T={T} n={16} color="rgba(157,255,106,.55)" tam={[3, 7]} vel={10} area={{ x: 0, y: 760, w: KW, h: 700 }} o={brilloG} />
        {fsvg(<>
          <Tronco T={T} x={540} y={1090} s={1.9} abre={abre} brillo={brilloG} />
          <Fantasma T={T} x={300} y={690} s={1.3} o={fant} />
          {fant > 0 && <path d="M 160 540 L 440 830 M 440 540 L 160 830" stroke={KC.red} strokeWidth={26} strokeLinecap="round" opacity={kprog(T, K.G + 2.3, K.G + 2.6) * fant} />}
        </>)}
      </Escena>
      {/* 2 · quiénes brillan */}
      <Escena T={T} a={K.Q} b={K.R} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${NOCHE1}, #1b1446)` }}></div>
        <FondoLunares color="transparent" punto="rgba(157,255,106,.10)" />
        {fsvg(<>
          {/* modo cine (pase a mano): las tres viñetas pasan de una fila chica a un zigzag grande (escala 1.4); las tres están desde
              el inicio, atenuadas, y cada una se enciende cuando la voz la nombra (antes entraban hasta 1.4 s después) */}
          <g transform="translate(300 590) scale(1.4) translate(-190 -760)" opacity={0.3 + 0.7 * kprog(T, K.Q + 0.2, K.Q + 0.6)}><Vineta x={190} y={760} e={kprog(T, K.Q + 0.02, K.Q + 0.4, kEase.rebote)}>
            <rect x={-200} y={-200} width={400} height={400} fill="#5a3b24" />
            <path d="M -200 -130 L 200 -150 L 200 -200 L -200 -200 Z" fill="#3a2614" />
            <Abanico x={-40} y={130} s={0.9} rot={-15} b={1} /><Abanico x={60} y={150} s={1.0} rot={20} b={1} />
          </Vineta></g>
          <g transform="translate(780 880) scale(1.4) translate(-540 -760)" opacity={0.3 + 0.7 * kprog(T, K.Q + 0.8, K.Q + 1.2)}><Vineta x={540} y={760} e={kprog(T, K.Q + 0.1, K.Q + 0.5, kEase.rebote)}>
            <rect x={-200} y={80} width={400} height={200} fill="#2a1d14" />
            <Mycena T={T} x={-60} y={100} s={1.1} seed={1} /><Mycena T={T} x={20} y={95} s={1.4} seed={2} /><Mycena T={T} x={90} y={100} s={0.9} seed={3} />
          </Vineta></g>
          <g transform="translate(300 1180) scale(1.4) translate(-890 -760)" opacity={0.3 + 0.7 * kprog(T, K.Q + 1.4, K.Q + 1.8)}><Vineta x={890} y={760} e={kprog(T, K.Q + 0.18, K.Q + 0.58, kEase.rebote)}>
            <rect x={-200} y={-200} width={130} height={400} fill="#5a3b24" />
            <Repisa x={-70} y={-60} s={1.1} rot={-6} /><Repisa x={-70} y={20} s={1.3} rot={4} /><Repisa x={-70} y={100} s={0.9} rot={-2} />
          </Vineta></g>
          {[['Armillaria', 'micelio bajo la corteza', 760, 560, 0.2], ['Mycena', 'setas', 780, 1170, 0.8], ['Panellus', 'setas en repisa', 760, 1300, 1.4]].map(([n, d, x, y, t0], i) =>
            <g key={i} opacity={kprog(T, K.Q + t0 + 0.3, K.Q + t0 + 0.6)}>
              <text x={x} y={y} textAnchor="middle" style={{ font:`italic 700 52px ${KF.mono}` }} fill={LUZ}>{n}</text>
              <text x={x} y={y + 48} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{d}</text>
            </g>)}
        </>)}
      </Escena>
      {/* 3 · es rarísimo */}
      <Escena T={T} a={K.R} b={K.Cf} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {Array.from({ length: 40 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8); const on = kprog(T, K.R + 0.1 + i * 0.02, K.R + 0.4 + i * 0.02, kEase.rebote);
            const brilla = (i === 13 || i === 30) ? kprog(T, K.R + 1.5, K.R + 2.0) * (0.85 + 0.15 * Math.sin(T * 4 + i)) : 0;
            return on > 0 ? <HongoMini key={i} x={132 + c * 117} y={850 + f * 135} s={on * 1.35} b={brilla} /> : null; })}   {/* modo cine: cuadrícula más grande y más alta (antes 760 + f·100, s 1.05) */}
        </>)}
      </Escena>
      {/* 4–6 · por dentro: el ciclo del ácido cafeico dentro de una hifa */}
      <Escena T={T} a={K.Cf} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {/* modo cine (pase a mano): la hifa y el ciclo crecen a lo alto (antes y 580–1170) y las moléculas van más grandes */}
          <rect x={40} y={530} width={1000} height={810} rx={240} fill="rgba(255,244,214,.06)" stroke="rgba(255,244,214,.35)" strokeWidth={10} />
          {[[170, 610], [930, 1290], [520, 560], [960, 620]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill="rgba(255,255,255,.15)" />)}
          {/* A: ácido cafeico */}
          {T > K.Cf + 0.4 && <Mol x={A[0]} y={A[1]} s={kprog(T, K.Cf + 0.4, K.Cf + 0.8, kEase.rebote) * 1.65} tipo="cafeico" color={KC.yellow} />}
          <Flecha x1={A[0] + 160} y1={A[1] - 50} x2={B[0] - 190} y2={B[1] - 50} c={0} p={kprog(T, K.Cf + 1.8, K.Cf + 2.5)} />
          {T > K.Cf + 2.4 && <Mol x={B[0]} y={B[1]} s={kprog(T, K.Cf + 2.4, K.Cf + 2.8, kEase.rebote) * 1.38} tipo="hispidina" color={KC.orange} />}
          {/* B → C: +OH */}
          <Flecha x1={B[0] + 130} y1={B[1] + 95} x2={Cc[0] + 130} y2={Cc[1] - 100} c={80} p={kprog(T, K.Lf + 0.2, K.Lf + 0.9)} />
          {T > K.Lf + 0.1 && T < K.Lf + 1.1 && <g transform={`translate(${klerp(980, B[0] + 163, kprog(T, K.Lf + 0.1, K.Lf + 0.9))} ${klerp(500, B[1] - 61, kprog(T, K.Lf + 0.1, K.Lf + 0.9))}) scale(1.15)`}><circle r={22} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /><text y={7} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill={KC.ink}>OH</text></g>}
          {T > K.Lf + 0.9 && T < K.Lc + 1.4 && <Mol x={Cc[0]} y={Cc[1]} s={kprog(T, K.Lf + 0.9, K.Lf + 1.3, kEase.rebote) * 1.38 * (1 - kprog(T, K.Lc + 1.0, K.Lc + 1.4))} tipo="luciferina" color={LUZ} b={0.4 + 0.3 * Math.sin(T * 4)} />}
          {/* C → D: luciferasa + O2 → luz */}
          {T > K.Lc + 0.1 && T < K.Lc + 1.6 && <Luciferasa T={T} x={klerp(500, Cc[0] - 235, kprog(T, K.Lc + 0.1, K.Lc + 0.7, kEase.sale))} y={Cc[1]} s={1.3 * kprog(T, K.Lc + 0.1, K.Lc + 0.4, kEase.rebote) * (1 - kprog(T, K.Lc + 1.3, K.Lc + 1.6))} boca={0.5 + 0.5 * Math.sin(T * 14)} />}
          {T > K.Lc + 0.4 && T < K.Lc + 1.4 && <O2 x={klerp(540, Cc[0] - 215, kprog(T, K.Lc + 0.4, K.Lc + 1.1))} y={klerp(1340, Cc[1] + 50, kprog(T, K.Lc + 0.4, K.Lc + 1.1))} s={1.25 * (1 - kprog(T, K.Lc + 1.1, K.Lc + 1.4))} />}
          <Flecha x1={Cc[0] - 200} y1={Cc[1] + 95} x2={D[0] + 190} y2={D[1] + 95} c={0} p={kprog(T, K.Lc + 1.0, K.Lc + 1.4)} color={LUZ} />
          <Destello x={D[0]} y={D[1]} k={flash * 0.95} T={T} />
          {T > K.Lc + 2.2 && <Mol x={D[0] + 20} y={D[1] + 2} s={kprog(T, K.Lc + 2.2, K.Lc + 2.6, kEase.rebote) * 1.5} tipo="oxi" color="#ffd6e2" />}
          {/* D → A: se recicla */}
          <Flecha x1={D[0] - 180} y1={D[1] - 95} x2={A[0] - 180} y2={A[1] + 100} c={-60} p={kprog(T, K.Lc + 2.6, K.Lc + 3.3)} color={KC.mint} />
          {/* nombres */}
          {[['ácido cafeico', A[0], A[1] + 125, K.Cf + 0.6, KC.yellow], ['hispidina', B[0], B[1] - 110, K.Cf + 2.6, KC.orange], ['luciferina', Cc[0], Cc[1] + 130, K.Lf + 1.1, LUZ], ['(3-hidroxihispidina)', Cc[0] - 40, Cc[1] - 112, K.Lf + 1.4, KC.texto]].map(([t, x, y, at, col], i) =>
            T > at && (i !== 2 && i !== 3 || T < K.Lc + 1.3) ? <text key={i} x={x} y={y} textAnchor="middle" opacity={kprog(T, at, at + 0.3)} style={{ font:`700 ${i === 3 ? 30 : 46}px ${KF.mono}` }} fill={col} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{t}</text> : null)}
          {[['hispidina sintasa', 530, 632, K.Cf + 2.0], ['H3H', 985, 925, K.Lf + 0.5], ['luciferasa + O₂', 530, 1290, K.Lc + 0.4], ['se recicla', 225, 925, K.Lc + 2.9]].map(([t, x, y, at], i) =>
            T > at ? <text key={i} x={x} y={y} textAnchor="middle" opacity={kprog(T, at, at + 0.3)} style={{ font:`700 30px ${KF.mono}` }} fill={i === 3 ? KC.mint : KC.cyan} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{t}</text> : null)}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {/* modo cine: la pregunta al centro (antes a la izquierda, junto al sticker que ya no sale) */}
        {fsvg(<><Interrogacion T={T} x={560} y={1140} color={LUZ} /><Mycena T={T} x={360} y={1230} s={1.9} b={0.6 + 0.4 * Math.sin(T * 3)} seed={5} /></>)}
      </Escena>
      {/* 8–9 · el experimento: Piauí, Brasil (2013) */}
      <Escena T={T} a={K.E} b={K.H} zoom={0.04}>
        {/* modo cine (pase a mano): los hongos falsos están en el bosque desde que empieza la escena (antes entraban a los 2.6 s y
            solo había tarjeta), más grandes (s 1.45) y más abajo; el foco verde se sigue encendiendo en el mismo momento */}
        <BosqueNoche T={T} palmas suelo={1300} />
        {fsvg(<>
          {[160, 400].map((x, i) => <HongoFalso key={'on' + i} T={T} x={x} y={1290} s={1.45 * kprog(T, K.E + 0.1 + i * 0.12, K.E + 0.5 + i * 0.12, kEase.rebote)} on={kprog(T, K.E + 3.3, K.E + 3.6)} />)}
          {[690, 920].map((x, i) => <HongoFalso key={'off' + i} T={T} x={x} y={1290} s={1.45 * kprog(T, K.E + 0.3 + i * 0.12, K.E + 0.7 + i * 0.12, kEase.rebote)} on={0} />)}
          {BICHOS_ON.map((t, i) => { const at = K.Tr + 0.1 + i * 0.13; if (T < at) return null; const [x, y] = posOn(i); const u = kprog(T, at, at + 0.5, kEase.sale);
            return bicho(t, klerp(x + (i % 2 ? 300 : -300), x, u), klerp(y - 500, y - 70, u), 1.9, i); })}
          {BICHOS_OFF.map((t, i) => { const at = K.Tr + 0.4 + i * 0.45; if (T < at) return null; const [x, y] = posOff(i); const u = kprog(T, at, at + 0.5, kEase.sale);
            return bicho(t, klerp(x + 300, x, u), klerp(y - 500, y - 70, u), 1.9, 100 + i); })}
        </>)}
      </Escena>
      {/* 10 · hipótesis: los insectos se llevan las esporas */}
      <Escena T={T} a={K.H} b={K.Rj} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {/* modo cine (pase a mano): la seta va grande y al centro (antes s 1.3 a la izquierda); suelo oscuro sin marco claro;
              el escarabajo y sus esporas también crecen y la palabra "esporas" viaja con él (antes era una etiqueta suelta arriba) */}
          <rect x={0} y={1360} width={KW} height={800} fill="#1c1512" />
          <line x1={0} y1={1360} x2={KW} y2={1360} stroke="#4a382c" strokeWidth={8} />
          <Gardneri T={T} x={440} y={1360} s={2.1} b={1} />
          {(() => { const u = kprog(T, K.H + 0.9, K.H + 3.4, kEase.suave); const x = klerp(470, 930, u), y = klerp(790, 640, u) - Math.sin(u * Math.PI) * 150;
            return <g>
              <path d={`M 470 790 Q 660 ${640 - 330} ${x} ${y}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeDasharray="14 14" opacity={u > 0 ? 0.5 : 0} />
              <Escarabajo x={x} y={y} s={3.4} rot={60 + u * 20} vuela={u > 0 ? 1 : 0} T={T} color="#2a3a5a" />
              {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={x + Math.cos(i * 0.9) * 54} cy={y + Math.sin(i * 0.9) * 48 + 10} r={10} fill="#fff3c4" stroke="#0b1020" strokeWidth={3} opacity={kprog(T, K.H + 0.5 + i * 0.05, K.H + 0.8 + i * 0.05)} />)}
              <text x={x - 150} y={y + 40} textAnchor="end" opacity={kprog(T, K.H + 1.4, K.H + 1.7)} style={{ font:`700 34px ${KF.mono}` }} fill="#fff3c4">esporas</text>
            </g>; })()}
        </>)}
      </Escena>
      {/* 11 · el reloj de casi un día (micelio en caja de Petri, laboratorio) */}
      <Escena T={T} a={K.Rj} b={K.J} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {/* modo cine (pase a mano): la caja de Petri va grande y arriba (antes r 150 en un panel de 400 px de alto) y la gráfica
              de brillo debajo, a todo lo ancho */}
          <g style={halo(bRel, 26)}>
            <Petri x={540} y={700} r={225} medio="#2a3140">
              <Colonia cx={0} cy={0} r={177} color={mixHex('#3a4456', LUZ, bRel)} seed={4} />
              <Colonia cx={0} cy={0} r={90} color={mixHex('#4b5568', LUZ2, bRel)} seed={7} />
            </Petri>
          </g>
          <rect x={90} y={1040} width={900} height={440} rx={36} fill="#0c1424" stroke={KC.ink} strokeWidth={8} />
          <line x1={170} y1={1410} x2={950} y2={1410} stroke="#ffffff" strokeWidth={4} opacity=".6" />
          <line x1={170} y1={1410} x2={170} y2={1095} stroke="#ffffff" strokeWidth={4} opacity=".6" />
          {(() => { const n = 60, pts = []; for (let i = 0; i <= n * pGraf; i++) { const u = i / n; pts.push([170 + u * 765, 1390 - 265 * ciclo(K.Rj + u * 4.2)]); }
            return pts.length > 1 ? <path d={'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={LUZ} strokeWidth={8} fill="none" strokeLinecap="round" style={halo(0.6, 10)} /> : null; })()}
          {[0, 1, 2].map((d) => <text key={d} x={170 + (d + 0.5) * 255} y={1455} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#cfd6e4" opacity={kprog(T, K.Rj + 0.6 + d * 0.9, K.Rj + 0.9 + d * 0.9)}>{'≈ día ' + (d + 1)}</text>)}
          <text x={186} y={1086} style={{ font:`700 28px ${KF.mono}` }} fill="#cfd6e4">brillo</text>
        </>)}
      </Escena>
      {/* 12 · hace unos 160 millones de años */}
      <Escena T={T} a={K.J} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* modo cine (pase a mano): la viñeta del Jurásico va al centro y más grande (antes r 260 a la izquierda) */}
          <g transform="translate(540 850) scale(1.5)">
            <defs><clipPath id="vjur"><circle r={260} /></clipPath></defs>
            <circle r={260} fill="#0d1a33" />
            <g clipPath="url(#vjur)">
              <rect x={-300} y={130} width={600} height={200} fill="#2a1d14" />
              <Dino T={T} x={-60} y={150} s={kprog(T, K.J + 0.25, K.J + 0.75, kEase.rebote) * 0.85} />
              <rect x={60} y={110} width={200} height={40} rx={18} fill="#6b4a2e" stroke={KC.ink} strokeWidth={5} />
              <Mycena T={T} x={120} y={115} s={0.8} seed={8} crece={kprog(T, K.J + 0.05, K.J + 0.55)} /><Mycena T={T} x={170} y={112} s={1.0} seed={9} crece={kprog(T, K.J + 0.12, K.J + 0.62)} /><Mycena T={T} x={215} y={115} s={0.7} seed={10} crece={kprog(T, K.J + 0.2, K.J + 0.7)} />
            </g>
            <circle r={260} fill="none" stroke={KC.ink} strokeWidth={10} />
          </g>
          {(() => { const u = kprog(T, K.J + 0.2, K.J + 2.2, kEase.suave), xm = klerp(980, 110, u);
            return <g opacity={kprog(T, K.J, K.J + 0.3)}>
              <line x1={100} y1={1350} x2={990} y2={1350} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
              <line x1={xm} y1={1350} x2={990} y2={1350} stroke={LUZ} strokeWidth={8} strokeLinecap="round" />
              <circle cx={xm} cy={1350} r={20} fill={LUZ} stroke={KC.ink} strokeWidth={5} />
              <text x={990} y={1318} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>hoy</text>
            </g>; })()}
        </>)}
      </Escena>
      {/* 13 · México: bosques de niebla */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {/* modo cine (pase a mano): el mapa ocupa todo el ancho (antes México medía 743 px y estaba cargado a la izquierda) */}
        {fsvg(<MapaMexico x={0} y={600} ancho={1390} conCA={false}>
          {[[-97.0, 18.6], [-96.6, 17.4], [-93.0, 16.9], [-99.0, 20.9], [-98.0, 19.9], [-92.4, 15.6]].map(([lo, la], i) => { const [px, py] = mxProy(lo, la); const k = kprog(T, K.M + 1.2 + i * 0.35, K.M + 1.5 + i * 0.35, kEase.rebote);
            return <g key={i}><Nube x={px - 10} y={py - 70} s={0.55} o={kprog(T, K.M + 0.4, K.M + 0.9)} />{k > 0 && <Mycena T={T} x={px} y={py + 30} s={0.75 * k} seed={20 + i} />}</g>; })}
        </MapaMexico>)}
      </Escena>
      {/* 14 · cierre: el mismo tronco del inicio, ahora llega un escarabajo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="50% 55%">
        {/* modo cine (pase a mano): el mismo encuadre grande del gancho */}
        <BosqueNoche T={T} suelo={1300} />
        <Ambiente T={T} n={16} color="rgba(157,255,106,.55)" tam={[3, 7]} vel={10} area={{ x: 0, y: 760, w: KW, h: 700 }} />
        {fsvg(<>
          <Tronco T={T} x={540} y={1090} s={1.9} abre={1} brillo={1} />
          <Escarabajo x={klerp(1100, 640, vuelo)} y={klerp(600, 1075, vuelo) - Math.sin(vuelo * Math.PI) * 80} s={3.0} rot={-120 + vuelo * 60} vuela={vuelo < 0.98 ? 1 : 0} T={T} color="#2a3a5a" />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.3} until={K.G + 2.9} texto="¿embrujada?" x={300} y={440} tam={42} borde={KC.lilac} />
      <Chip T={T} at={K.G + 3.0} until={K.Q - 0.2} texto="no: es un hongo" x={540} y={760} tam={46} borde={LUZ} />
      <Etq T={T} at={K.G + 1.6} until={K.Q - 0.2} x={1040} y={1350} lado="izq" texto="madera podrida" tam={30} />
      <Chip T={T} at={K.Q + 0.3} until={K.R - 0.2} texto="hongos que brillan" x={300} y={300} tam={40} borde={LUZ} />
      <NumeroGigante T={T} at={K.R + 0.4} until={K.Cf - 0.2} valor={100} prefijo="≈ " etiqueta="especies que brillan" x={540} y={520} tam={210} color={LUZ} />
      <Etq T={T} at={K.R + 0.8} until={K.Cf - 0.2} x={60} y={1480} texto="esquema · no a escala" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Cf + 1.0} until={K.Lf - 0.2} texto="una sustancia muy común" x={400} y={400} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Cf + 0.3} until={K.P - 0.3} x={640} y={490} texto="dentro de una hifa" tam={26} color={LUZ2} />
      <Chip T={T} at={K.Lf + 1.7} until={K.Lc - 0.2} texto="luciferina = el combustible" x={400} y={400} tam={34} borde={LUZ} />
      <Chip T={T} at={K.Lc + 1.7} until={K.P - 0.2} texto="luz verde · ≈ 520–530 nm" x={400} y={400} tam={36} borde={LUZ} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2013" quien={<>Piauí, Brasil · <i>Neonothopanus gardneri</i></>} revista="Oliveira et al., Current Biology, 2015" x={430} y={520} />
      <Etq T={T} at={K.E + 3.0} until={K.Tr - 0.1} x={60} y={1010} texto="acrílico + foco verde" tam={30} color={LUZ2} />
      <Chip T={T} at={K.E + 3.5} until={K.H - 0.2} texto="5 noches · 19 trampas de cada tipo" x={400} y={470} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Tr + 0.2} until={K.H - 0.2} valor={42} dur={2.0} etiqueta="encendidos" x={280} y={770} tam={180} color={LUZ} />
      <NumeroGigante T={T} at={K.Tr + 0.4} until={K.H - 0.2} valor={12} dur={1.8} etiqueta="apagados" x={805} y={770} tam={180} color="#c9ced8" />
      <Chip T={T} at={K.H + 0.3} until={K.Rj - 0.2} texto="HIPÓTESIS" x={400} y={380} tam={52} borde={KC.yellow} />
      <Etq T={T} at={K.H + 0.5} until={K.Rj - 0.2} x={500} y={1240} texto="Neonothopanus gardneri" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Rj + 0.4} until={K.J - 0.2} texto="≈ 22 h por ciclo · a 25 °C" x={400} y={390} tam={36} borde={LUZ} />
      <Etq T={T} at={K.Rj + 0.8} until={K.J - 0.2} x={60} y={1005} texto="micelio en caja de Petri (laboratorio)" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Rj + 1.2} until={K.J - 0.2} x={60} y={962} texto="Neonothopanus gardneri" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.J + 1.4} until={K.M - 0.2} texto="estimación · Jurásico tardío" x={400} y={390} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.J + 2.0} until={K.M - 0.2} x={110} y={1415} texto="hace ≈ 160 millones de años" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 0.6} until={K.C - 0.2} texto="6 especies nuevas de Mycena" x={540} y={470} tam={36} borde={LUZ} />
      <Etq T={T} at={K.M + 1.0} until={K.C - 0.2} x={1020} y={1380} lado="izq" texto="bosques de niebla · ubicación esquemática · Mycologia, 2019" tam={24} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="no está embrujada: está viva" x={420} y={640} tam={40} borde={LUZ} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Q} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Q} until={K.R} texto="1 cm" largo={120} />
      <BarraEscala T={T} at={K.R} until={K.Cf} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Cf} until={K.P} texto="1 µm (moléculas no a escala)" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="1 cm" largo={120} />
      <BarraEscala T={T} at={K.E} until={K.H} texto="10 cm" largo={230} />
      <BarraEscala T={T} at={K.H} until={K.Rj} texto="5 cm" largo={250} />
      <BarraEscala T={T} at={K.Rj} until={K.J} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.J} until={K.M} texto="1 m" largo={140} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="500 km" largo={115} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No está embrujada: *brilla un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.R - 0.1} texto="Armillaria, Mycena, *Panellus.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Cf - 0.1} texto="Solo unas *cien especies.*" />
      <Subtitulo T={T} idx={3} at={K.Cf + 0.1} until={K.Lf - 0.1} texto="Ácido cafeico → *hispidina.*" />
      <Subtitulo T={T} idx={4} at={K.Lf + 0.1} until={K.Lc - 0.1} texto="Sale la luciferina: *el combustible.*" />
      <Subtitulo T={T} idx={5} at={K.Lc + 0.1} until={K.P - 0.1} texto="Luciferasa + oxígeno = *luz verde.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Para qué *brillar?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Tr - 0.1} texto="2013, Brasil: *hongos falsos con foco.*" />
      <Subtitulo T={T} idx={8} at={K.Tr + 0.1} until={K.H - 0.1} texto="Encendidos: 42. *Apagados: 12.*" />
      <Subtitulo T={T} idx={9} at={K.H + 0.1} until={K.Rj - 0.1} texto="¿Se llevan *sus esporas?*" />
      <Subtitulo T={T} idx={10} at={K.Rj + 0.1} until={K.J - 0.1} texto="Un reloj de *casi un día.*" />
      <Subtitulo T={T} idx={11} at={K.J + 0.1} until={K.M - 0.1} texto="Hace unos *160 millones de años.*" />
      <Subtitulo T={T} idx={12} at={K.M + 0.1} until={K.C - 0.1} texto="México: *6 especies nuevas.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="No está embrujada: *está viva.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.3, K.Cf - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Lf + 0.3, K.Lc - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.P + 0.05, K.E - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tr + 0.3, K.H - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Rj + 0.3, K.J - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.J + 0.5, K.M - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.M + 0.5, K.C - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="23" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BrillanApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BrillanShot /></CompositionStage></div>;
}
window.BrillanApp = BrillanApp;
