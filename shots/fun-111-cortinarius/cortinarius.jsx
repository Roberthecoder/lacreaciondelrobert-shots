// Shot Fungi Mati #111 · El veneno que avisa días después: Cortinarius y la orelanina — NARRADO
// Gancho 6 (mito peligroso) + formato N1 Por dentro con N3 (reloj de días). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No es guía de identificación ni consejo médico.

const CX = { cap:'#c4561c', cap2:'#e27a2c', cap3:'#8e3510', pie:'#e3b56e', pie2:'#f2d36b', lam:'#e9c45c', oxido:'#9a4a1e',
  porciniCap:'#7a4a24', porciniPie:'#efe2c4', poros:'#efe08a', rinon:'#b8322a', rinon2:'#d9564a', sarten:'#3a3d45', piel:'#f1c7a0', dial:'#3d7bff' };

// Cortinarius de perfil. Base del pie en (x, y). edad 0 = joven (sombrero convexo, cortina) · 1 = adulto (aplanado con umbo).
// cortina 0..1 = velo de telaraña entre la orilla y el pie · oxido 0..1 = láminas amarillentas → café óxido · crece 0..1.
function Cortinario({ T = 0, x, y, s = 1, edad = 1, cortina = 0, oxido = 0, crece = 1, rot = 0, seed = 1, corte = false }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece * 1.3, 0, 1));
  const h = 230 * k, w = klerp(150, 270, edad) * (0.5 + 0.5 * k), alto = klerp(115, 62, edad), umbo = klerp(0, 22, edad);
  const top = -h, ox = mece(T, seed, 0.4) * 2;
  const lam = mixHex(CX.lam, CX.oxido, oxido);
  const cap = `M ${-w / 2} ${top + 8} Q ${-w / 2 - 6} ${top - alto * 0.7} ${-w * 0.22} ${top - alto * 0.95} Q ${-w * 0.08} ${top - alto - umbo * 0.6} 0 ${top - alto - umbo} Q ${w * 0.08} ${top - alto - umbo * 0.6} ${w * 0.22} ${top - alto * 0.95} Q ${w / 2 + 6} ${top - alto * 0.7} ${w / 2} ${top + 8} Q 0 ${top + 2} ${-w / 2} ${top + 8} Z`;
  return <g transform={`translate(${x + ox} ${y}) rotate(${rot}) scale(${s})`}>
    {/* pie: amarillento, un poco más ancho abajo, con bandas amarillas (C. rubellus) */}
    <path d={`M -20 0 Q -26 ${top * 0.5} -15 ${top} L 15 ${top} Q 26 ${top * 0.5} 22 0 Q 0 8 -20 0 Z`} fill={CX.pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.25, 0.42, 0.6].map((u, i) => <path key={i} d={`M -20 ${top * u} Q 0 ${top * u + 10} 20 ${top * u - 4}`} stroke={CX.pie2} strokeWidth={6} fill="none" opacity={0.8} />)}
    {oxido > 0.3 && <path d={`M -14 ${top * 0.78} Q 0 ${top * 0.74} 14 ${top * 0.8}`} stroke={CX.oxido} strokeWidth={4} fill="none" opacity={oxido} />}
    {/* láminas (vistas un poco desde abajo) */}
    <path d={`M ${-w / 2 + 8} ${top + 8} Q 0 ${top + 26 + 14 * edad} ${w / 2 - 8} ${top + 8} Q 0 ${top + 2} ${-w / 2 + 8} ${top + 8} Z`} fill={lam} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 13 }, (_, i) => { const u = (i + 1) / 14, xx = klerp(-w / 2 + 12, w / 2 - 12, u); const yy = top + 8 + Math.sin(u * Math.PI) * (16 + 12 * edad);
      return <line key={i} x1={xx * 0.2} y1={top + 4} x2={xx} y2={yy} stroke={mixHex(lam, KC.ink, 0.45)} strokeWidth={2.5} />; })}
    {/* sombrero naranja rojizo, fibroso */}
    <path d={cap} fill={CX.cap} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M ${-w * 0.3} ${top - alto * 0.7} Q 0 ${top - alto - umbo * 0.9} ${w * 0.25} ${top - alto * 0.75}`} stroke={CX.cap2} strokeWidth={16} fill="none" opacity=".7" strokeLinecap="round" />
    {Array.from({ length: 11 }, (_, i) => { const u = (i + 0.5) / 11 - 0.5; return <path key={i} d={`M ${u * w * 0.25} ${top - alto - umbo * 0.8} Q ${u * w * 0.7} ${top - alto * 0.6} ${u * w * 0.95} ${top + 2}`} stroke={CX.cap3} strokeWidth={2.5} fill="none" opacity=".55" />; })}
    {/* cortina: velo como telaraña entre la orilla del sombrero y el pie */}
    {cortina > 0 && <g opacity={cortina}>
      {Array.from({ length: 16 }, (_, i) => { const lado = i % 2 ? 1 : -1, u = (i >> 1) / 8; const x0 = lado * (w / 2 - 4 - u * 30), y0 = top + 6 + u * 6; const x1 = lado * 16, y1 = top * klerp(0.72, 0.9, u);
        return <path key={i} d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + lado * 6} ${(y0 + y1) / 2 + 14} ${x1} ${y1}`} stroke="#fffaf0" strokeWidth={2.2} fill="none" opacity={0.75} />; })}
      {Array.from({ length: 7 }, (_, i) => { const yy = top + 14 + i * 7; return <path key={'c' + i} d={`M ${-w / 2 + 14 + i * 6} ${yy} Q 0 ${yy + 22} ${w / 2 - 14 - i * 6} ${yy}`} stroke="#fffaf0" strokeWidth={1.6} fill="none" opacity={0.55} />; })}
    </g>}
    {corte && <path d={`M -60 ${top - alto * 0.5} L 60 ${top - alto * 0.2}`} stroke={KC.red} strokeWidth={8} strokeDasharray="14 10" />}
  </g>;
}
// Porcini (Boletus edulis): pie grueso y abultado, sombrero café, por debajo poros (no láminas). Base en (x, y).
function Porcini({ T = 0, x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const k = kEase.rebote(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d="M -60 0 Q -95 -90 -40 -180 L 40 -180 Q 95 -90 60 0 Q 0 12 -60 0 Z" fill={CX.porciniPie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-30, -10, 10, 30].map((dx, i) => <path key={i} d={`M ${dx - 10} -150 L ${dx + 6} -120 L ${dx - 8} -90 L ${dx + 8} -60`} stroke="#c9b48a" strokeWidth={3} fill="none" />)}
    <path d="M -140 -176 Q 0 -150 140 -176 Q 0 -190 -140 -176 Z" fill={CX.poros} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-120 + i * 11.4} cy={-173 + Math.sin(i / 21 * Math.PI) * 8} r={2.6} fill="#b8a64a" />)}
    <path d="M -146 -176 Q -150 -290 0 -300 Q 150 -290 146 -176 Q 0 -168 -146 -176 Z" fill={CX.porciniCap} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -90 -250 Q 0 -285 80 -255" stroke="#a06a3a" strokeWidth={14} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
// Sartén vista un poco desde arriba con rebanadas de hongo que brincan. calor 0..1 = vapor.
function Sarten({ T, x, y, s = 1, calor = 1, rebanadas = 7 }) {
  const g = krng(11);
  const sl = Array.from({ length: rebanadas }, (_, i) => ({ dx: -150 + (i % 4) * 100 + g() * 30, dy: -30 + Math.floor(i / 4) * 70 + g() * 20, r: g() * 60 - 30, f: g() * 6 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={200} y={-18} width={260} height={36} rx={18} fill="#22242a" stroke={KC.ink} strokeWidth={6} transform="rotate(-8)" />
    <ellipse cx={0} cy={0} rx={250} ry={150} fill={CX.sarten} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={6} rx={214} ry={122} fill="#4a4e58" />
    {sl.map((q, i) => { const b = Math.max(0, Math.sin(T * 7 + q.f)) * 10 * calor; return <g key={i} transform={`translate(${q.dx} ${q.dy - b}) rotate(${q.r})`}>
      <path d="M -40 8 Q -42 -30 0 -34 Q 42 -30 40 8 Z" fill={CX.cap} stroke={KC.ink} strokeWidth={4} />
      <rect x={-9} y={6} width={18} height={30} rx={6} fill={CX.pie} stroke={KC.ink} strokeWidth={4} />
    </g>; })}
    {calor > 0 && [-120, -20, 90].map((dx, i) => { const u = ((T * 0.7 + i * 0.33) % 1); return <path key={i} d={`M ${dx} ${-90 - u * 160} q 18 -20 0 -40 q -18 -20 0 -40`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={(1 - u) * 0.6 * calor} strokeLinecap="round" />; })}
  </g>;
}
// Reloj de pared. horas = lo que avanzan las manecillas.
function Reloj({ x, y, r = 90, horas = 0 }) {
  const a = (horas / 12) * Math.PI * 2 - Math.PI / 2, m = horas * Math.PI * 2 - Math.PI / 2;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => { const b = i / 12 * Math.PI * 2; return <line key={i} x1={Math.cos(b) * r * 0.78} y1={Math.sin(b) * r * 0.78} x2={Math.cos(b) * r * 0.9} y2={Math.sin(b) * r * 0.9} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={0} y1={0} x2={Math.cos(a) * r * 0.5} y2={Math.sin(a) * r * 0.5} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.cos(m) * r * 0.75} y2={Math.sin(m) * r * 0.75} stroke={KC.red} strokeWidth={6} strokeLinecap="round" />
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Hoja de calendario con el día.
function Calendario({ x, y, s = 1, dia = 1, color = KC.red, texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-95} y={-100} width={190} height={200} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-95} y={-100} width={190} height={56} rx={20} fill={color} stroke={KC.ink} strokeWidth={8} />
    {[-50, 50].map((dx) => <rect key={dx} x={dx - 8} y={-120} width={16} height={40} rx={8} fill={KC.ink} />)}
    <text x={0} y={-58} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">{texto || 'DÍA'}</text>
    <text x={0} y={70} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{dia}</text>
  </g>;
}
// Riñón (forma de frijol). dano 0..1 = se apaga a gris.
function Rinon({ x, y, s = 1, dano = 0, latido = 0 }) {
  const c = mixHex(CX.rinon, '#6f6a66', dano), c2 = mixHex(CX.rinon2, '#8f8a86', dano), k = 1 + latido;
  return <g transform={`translate(${x} ${y}) scale(${s * k})`}>
    <path d="M -10 -110 Q -110 -120 -110 0 Q -110 120 -10 110 Q 50 105 40 50 Q 20 0 40 -50 Q 50 -105 -10 -110 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -70 -60 Q -88 0 -70 60" stroke={c2} strokeWidth={16} fill="none" strokeLinecap="round" opacity=".8" />
    <path d="M 40 0 Q 70 -6 92 -30 M 40 10 Q 74 20 92 44" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    {dano > 0.4 && <path d="M -40 -70 L -20 -40 L -45 -10 L -15 20 L -40 55" stroke={KC.ink} strokeWidth={5} fill="none" opacity={dano} />}
  </g>;
}
// Orelanina esquemática: dos anillos (bipiridina) con N→O y grupos OH.
function Orelanina({ x, y, s = 1, rot = 0, p = 1, color = KC.yellow }) {
  const hexa = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 46 * Math.cos(a)).toFixed(1)} ${(cy + 46 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const at = (tx, ax, ay, c) => <g><circle cx={ax} cy={ay} r={20} fill={KC.noche} stroke={c} strokeWidth={4} /><text x={ax} y={ay + 9} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={c}>{tx}</text></g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={p}>
    <path d={hexa(0, 0)} fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" />
    <path d={hexa(120, 0)} fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" />
    <line x1={40} y1={0} x2={80} y2={0} stroke={color} strokeWidth={8} />
    <line x1={20} y1={-40} x2={30} y2={-80} stroke={color} strokeWidth={6} /><line x1={100} y1={40} x2={90} y2={80} stroke={color} strokeWidth={6} />
    <line x1={-40} y1={-23} x2={-76} y2={-44} stroke={color} strokeWidth={6} /><line x1={-40} y1={23} x2={-76} y2={44} stroke={color} strokeWidth={6} />
    <line x1={160} y1={-23} x2={196} y2={-44} stroke={color} strokeWidth={6} /><line x1={160} y1={23} x2={196} y2={44} stroke={color} strokeWidth={6} />
    {at('O', 34, -96, KC.red)}{at('O', 86, 96, KC.red)}{at('OH', -92, -54, KC.cyan)}{at('OH', -92, 54, KC.cyan)}{at('OH', 212, -54, KC.cyan)}{at('OH', 212, 54, KC.cyan)}
    {at('N', 23, -40, KC.mint)}{at('N', 97, 40, KC.mint)}
  </g>;
}
// Túbulo del riñón en corte (al microscopio): dos filas de células alrededor del canal. dano 0..1 avanza de izquierda a derecha.
function Tubulo({ T, x, y, w = 960, dano = 0, toxina = 0 }) {
  const n = 9, cw = w / n;
  const fila = (yy, alto, sig) => Array.from({ length: n }, (_, i) => { const d = kclamp(dano * 1.6 - (i / n) * 0.8, 0, 1);
    const c = mixHex('#f08aa0', '#5d5a60', d), nu = mixHex('#7a2a8a', '#3a383d', d);
    return <g key={i} transform={`translate(${x + i * cw} ${yy})`}>
      <rect x={3} y={0} width={cw - 6} height={alto} rx={14} fill={c} stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={cw / 2} cy={alto * (sig > 0 ? 0.62 : 0.38)} rx={cw * 0.18 * (1 - d * 0.5)} ry={alto * 0.16 * (1 - d * 0.5)} fill={nu} opacity={1 - d * 0.6} />
      {/* borde en cepillo hacia el canal */}
      {Array.from({ length: 7 }, (_, j) => <line key={j} x1={10 + j * (cw - 20) / 6} y1={sig > 0 ? alto : 0} x2={10 + j * (cw - 20) / 6} y2={sig > 0 ? alto + 12 * (1 - d) : -12 * (1 - d)} stroke={c} strokeWidth={4} />)}
      {d > 0.5 && <path d={`M ${cw * 0.3} ${alto * 0.15} L ${cw * 0.5} ${alto * 0.45} L ${cw * 0.35} ${alto * 0.7} L ${cw * 0.6} ${alto * 0.9}`} stroke={KC.ink} strokeWidth={4} fill="none" opacity={d} />}
    </g>; });
  const g = krng(5);
  return <g>
    <rect x={x - 20} y={y - 4} width={w + 40} height={150} fill="#24324f" />
    {Array.from({ length: 22 }, (_, i) => { const u = ((T * 0.18 + g()) % 1); return <circle key={i} cx={x + u * w} cy={y + 20 + g() * 110} r={5 + g() * 5} fill="#7fb8ff" opacity=".45" />; })}
    {toxina > 0 && Array.from({ length: 14 }, (_, i) => { const u = kclamp(toxina * 1.5 - i * 0.04, 0, 1); const xx = x + 40 + (i * 67) % w, up = i % 2 ? -1 : 1;
      return <circle key={'t' + i} cx={xx + u * 20} cy={y + 72 + up * u * 110} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} opacity={u < 1 ? 1 : 1 - kclamp(dano * 2 - 0.3, 0, 0.8)} />; })}
    {fila(y - 190, 176, 1)}{fila(y + 156, 176, -1)}
  </g>;
}
// Persona (ícono) para contar casos. estado: 'normal' | 'dial' (gota azul de diálisis) | 'rojo' (falla renal grave).
function Persona({ x, y, s = 1, color = '#f6f3ec', gota = 0, rojo = 0 }) {
  const c = mixHex(color, KC.red, rojo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-46} r={20} fill={c} stroke={KC.ink} strokeWidth={5} />
    <path d="M -28 0 Q -30 -26 0 -24 Q 30 -26 28 0 Z" fill={c} stroke={KC.ink} strokeWidth={5} />
    {gota > 0 && <path d="M 30 -60 Q 44 -40 30 -32 Q 16 -40 30 -60 Z" fill={CX.dial} stroke={KC.ink} strokeWidth={3} transform={`translate(0 ${(1 - gota) * -30})`} opacity={gota} />}
  </g>;
}
// Máquina de diálisis esquemática con tubos.
function Dialisis({ T, x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <rect x={-110} y={-280} width={220} height={280} rx={22} fill="#e9eef5" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={-250} width={160} height={90} rx={10} fill="#1a2a44" stroke={KC.ink} strokeWidth={5} />
    <path d={`M -70 -205 ${Array.from({ length: 14 }, (_, i) => `L ${-70 + i * 10} ${-205 + Math.sin(i * 0.9 + T * 6) * 18}`).join(' ')}`} stroke={KC.mint} strokeWidth={4} fill="none" />
    <rect x={-30} y={-140} width={60} height={110} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-24} y={-90} width={48} height={54} rx={8} fill={CX.dial} />
    <path d="M 110 -200 Q 220 -220 230 -100" stroke={KC.red} strokeWidth={10} fill="none" />
    <path d="M 110 -120 Q 190 -100 230 -60" stroke={CX.dial} strokeWidth={10} fill="none" />
  </g>;
}
// Cruz de urgencias.
function Urgencias({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-60} width={340} height={120} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <path d="M -138 -12 h 24 v -24 h 24 v 24 h 24 v 24 h -24 v 24 h -24 v -24 h -24 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={52} y={16} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>URGENCIAS</text>
  </g>;
}

const GRID28 = Array.from({ length: 28 }, (_, i) => [140 + (i % 7) * 80, 900 + Math.floor(i / 7) * 92]);
const DIAL22 = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 19, 20, 21, 23, 24, 26]; // ilustrativo
const ROJO21 = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 22, 24, 25];   // ilustrativo (75 % = 21 de 28)

function CortinariusShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Cortina, Es: CUES.Esporas, To: CUES.Toxina, Tu: CUES.Tubulos, P: CUES.Pregunta, R: CUES.Revision,
    Su: CUES.Suecia, Fa: CUES.Falla, An: CUES.Antidoto, Ev: CUES.Evans, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const horas = 6 * kprog(T, K.G + 1.6, K.G + 3.4, kEase.suave);
  const diasG = 1 + Math.floor(13 * kprog(T, K.G + 4.6, K.G + 6.5));
  const diasC = 1 + Math.floor(7 * kprog(T, K.Ci + 4.0, K.Ci + 6.2));
  const rd = kprog(T, K.R + 1.2, K.R + 4.8, kEase.suave) * 14; // días que avanza la línea de tiempo
  const xd = (d) => 110 + d * 60;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la sartén, 6 horas sin nada… y el calendario sigue */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sarten T={T} x={430} y={1000} s={1.05} calor={1} />
          <g opacity={kprog(T, K.G + 1.4, K.G + 1.8) * (1 - kprog(T, K.G + 4.4, K.G + 4.8))}><Reloj x={220} y={560} r={110} horas={horas} /></g>
          {T > K.G + 4.4 && <g opacity={kprog(T, K.G + 4.4, K.G + 4.8)}><Calendario x={220} y={560} s={1.05} dia={diasG} /></g>}
        </>)}
      </Escena>
      {/* 2 · el hongo: joven con cortina y adulto */}
      <Escena T={T} a={K.Co} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1110} width={KW} height={120} fill="#6b4a2a" />
          <path d={`M 0 1110 ${Array.from({ length: 28 }, (_, i) => `L ${i * 40 + 20} ${1100 - (i % 3) * 10} L ${i * 40 + 40} 1110`).join(' ')}`} fill="#4f8a3a" stroke={KC.ink} strokeWidth={4} />
          <Cortinario T={T} x={290} y={1115} s={1.1} edad={0} cortina={kprog(T, K.Co + 1.0, K.Co + 2.0)} crece={kprog(T, K.Co, K.Co + 1.0)} seed={2} />
          <Cortinario T={T} x={700} y={1115} s={1.15} edad={1} oxido={0.6} crece={kprog(T, K.Co + 0.3, K.Co + 1.3)} seed={5} />
        </>)}
      </Escena>
      {/* 3 · esporada color óxido */}
      <Escena T={T} a={K.Es} b={K.To} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={150} y={760} width={560} height={420} rx={16} fill="#fbf7ee" stroke={KC.ink} strokeWidth={8} transform="rotate(-3 430 970)" />
          {(() => { const p = kprog(T, K.Es + 0.6, K.Es + 2.0, kEase.sale); return <g transform="translate(430 975)" opacity={p}>
            {Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 28} y1={Math.sin(a) * 28} x2={Math.cos(a) * 150 * p} y2={Math.sin(a) * 150 * p} stroke={CX.oxido} strokeWidth={5} opacity=".85" />; })}
            <circle r={150 * p} fill="none" stroke={CX.oxido} strokeWidth={3} opacity=".5" /><circle r={26} fill="#fbf7ee" />
          </g>; })()}
          <g transform={`translate(0 ${-kprog(T, K.Es + 0.3, K.Es + 0.9, kEase.sale) * 200})`}><Cortinario T={T} x={430} y={1210} s={1.1} edad={1} oxido={1} seed={4} /></g>
        </>)}
      </Escena>
      {/* 4 · por dentro: la orelanina viaja al riñón (fondo oscuro) */}
      <Escena T={T} a={K.To} b={K.Tu} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} />
        {fsvg(<>
          <Orelanina x={170} y={760} s={1.05} rot={Math.sin(T) * 4} p={kprog(T, K.To + 0.1, K.To + 0.8)} />
          <Rinon x={760} y={1020} s={1.15} latido={Math.max(0, Math.sin(T * 6)) * 0.03} dano={kprog(T, K.To + 1.8, K.To + 3.0) * 0.35} />
          {Array.from({ length: 8 }, (_, i) => { const u = kprog(T, K.To + 1.0 + i * 0.12, K.To + 2.0 + i * 0.12, kEase.suave); return u > 0 && u < 1 ?
            <circle key={i} cx={klerp(300, 740, u)} cy={klerp(860, 1010, u) - Math.sin(u * Math.PI) * 80 + (i % 3) * 14} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · al microscopio: el túbulo se daña sin hacer ruido */}
      <Escena T={T} a={K.Tu} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<Tubulo T={T} x={60} y={870} w={960} toxina={kprog(T, K.Tu + 0.4, K.Tu + 1.8)} dano={kprog(T, K.Tu + 1.6, K.Tu + 4.4)} />)}
      </Escena>
      {/* 6 · re-gancho: ¿cuánto tarda en avisar? */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Calendario x={290} y={1000} s={1.5} dia="?" /><Interrogacion T={T} x={290} y={760} tam={300} color={KC.yellow} /></>)}
      </Escena>
      {/* 7 · la revisión de 2001: línea de tiempo en días */}
      <Escena T={T} a={K.R} b={K.Su}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <line x1={xd(0)} y1={1060} x2={xd(14)} y2={1060} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          {Array.from({ length: 15 }, (_, d) => <g key={d} opacity={d <= rd + 0.01 ? 1 : 0.3}>
            <line x1={xd(d)} y1={1040} x2={xd(d)} y2={1080} stroke={KC.ink} strokeWidth={6} />
            {d % 2 === 0 && <text x={xd(d)} y={1125} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{d}</text>}
          </g>)}
          <text x={xd(14) + 20} y={1072} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>días</text>
          <rect x={xd(0)} y={1048} width={Math.max(0, xd(rd) - xd(0))} height={24} rx={12} fill={KC.red} opacity=".85" />
          {rd >= 3 && <g transform={`translate(${xd(3)} 960) scale(${kprog(T, K.R + 2.0, K.R + 2.4, kEase.rebote)})`}>
            <circle r={52} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /><text y={14} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>día 3</text></g>}
          {rd >= 8.5 && <g transform={`translate(${xd(8.5)} 930)`}><Rinon x={0} y={0} s={0.55 * kprog(T, K.R + 3.6, K.R + 4.0, kEase.rebote)} dano={0.6} /></g>}
        </>)}
      </Escena>
      {/* 8–9 · Suecia: 28 intoxicados, 22 con diálisis; 21 en falla renal grave */}
      <Escena T={T} a={K.Su} b={K.An}>
        <FondoLunares color={T < K.Fa ? KC.lilac : KC.coral} />
        {fsvg(<>
          {GRID28.map(([px, py], i) => { const on = kprog(T, K.Su + 0.3 + i * 0.03, K.Su + 0.6 + i * 0.03, kEase.rebote); if (on <= 0) return null;
            const di = DIAL22.indexOf(i), g = T < K.Fa && di >= 0 ? kprog(T, K.Su + 1.6 + di * 0.06, K.Su + 1.9 + di * 0.06) : 0;
            const ri = ROJO21.indexOf(i), r = ri >= 0 ? kprog(T, K.Fa + 0.4 + ri * 0.06, K.Fa + 0.7 + ri * 0.06) : 0;
            return <Persona key={i} x={px} y={py} s={on * 1.05} gota={g * (1 - kprog(T, K.Fa - 0.2, K.Fa))} rojo={r} />; })}
        </>)}
      </Escena>
      {/* 10 · sin antídoto: diálisis o trasplante */}
      <Escena T={T} a={K.An} b={K.Ev}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Dialisis T={T} x={320} y={1150} s={1.15} p={kprog(T, K.An + 0.9, K.An + 1.4)} />
          <Rinon x={800} y={1010} s={0.9} dano={0.7} latido={Math.max(0, Math.sin(T * 5)) * 0.03} />
        </>)}
      </Escena>
      {/* 11 · el caso de 2008: porcini (poros) ≠ Cortinarius (láminas) */}
      <Escena T={T} a={K.Ev} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={110} fill="#6b4a2a" />
          <Porcini T={T} x={250} y={1125} s={1.15} crece={kprog(T, K.Ev + 3.4, K.Ev + 4.0)} />
          <Cortinario T={T} x={760} y={1125} s={1.3} edad={1} oxido={0.8} crece={kprog(T, K.Ev + 3.8, K.Ev + 4.6)} seed={7} />
          {T > K.Ev + 4.6 && <text x={505} y={900} textAnchor="middle" style={{ font:`400 ${200 * kprog(T, K.Ev + 4.6, K.Ev + 5.0, kEase.rebote)}px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={8}>≠</text>}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma sartén del inicio, ahora con la respuesta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sarten T={T} x={430} y={990} s={1.05} calor={1 - kprog(T, K.Ci + 1.2, K.Ci + 2.2)} />
          <g opacity={kprog(T, K.Ci + 1.4, K.Ci + 1.8)}><Sello T={T} at={K.Ci + 1.4} x={430} y={980} texto="NO" color={KC.red} r={150} rot={-10} /></g>
          {T > K.Ci + 3.6 && <g opacity={kprog(T, K.Ci + 3.6, K.Ci + 4.0)}><Calendario x={200} y={620} s={0.9} dia={diasC} /></g>}
          {T > K.Ci + 6.2 && <g transform={`translate(0 0) scale(1)`} opacity={kprog(T, K.Ci + 6.2, K.Ci + 6.6)}><Urgencias x={480} y={505 + (1 - kprog(T, K.Ci + 6.2, K.Ci + 6.7, kEase.rebote)) * 60} s={1.1} /></g>}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.8} until={K.G + 3.3} texto="6 horas después: nada ✓" x={400} y={740} tam={36} borde={KC.leaf} />
      <MitoTachado T={T} at={K.G + 3.4} tacharEn={K.G + 4.1} until={K.Co - 0.3} texto="«ya estoy a salvo»" x={420} y={740} tam={46} />
      <Chip T={T} at={K.G + 4.8} until={K.Co - 0.3} texto="puede avisar DÍAS después" x={700} y={440} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Co + 1.2} until={K.Es - 0.3} x={60} y={470} texto="Cortinarius orellanus" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.Co + 1.5} until={K.Es - 0.3} x={60} y={525} texto="Cortinarius rubellus" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.Co + 2.0} until={K.Es - 0.3} x={60} y={640} texto="joven: cortina (velo de telaraña)" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Co + 2.6} until={K.Es - 0.3} x={60} y={690} texto="adulto: láminas que se vuelven óxido" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Es + 0.3} until={K.To - 0.3} x={60} y={480} texto="sombrero naranja rojizo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.2} until={K.To - 0.3} x={60} y={560} texto="esporada: café óxido" tam={40} color={KC.ink} />
      <Chip T={T} at={K.To + 0.1} until={K.Tu - 0.3} texto="POR DENTRO · LA TOXINA" x={440} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.To + 0.6} until={K.Tu - 0.3} x={60} y={600} texto="orelanina (esquema)" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.To + 1.8} until={K.Tu - 0.3} x={560} y={860} texto="riñón" tam={36} color={KC.texto} />
      <Chip T={T} at={K.Tu + 0.1} until={K.P - 0.3} texto="AL MICROSCOPIO · TÚBULO DEL RIÑÓN" x={440} y={470} tam={30} borde={KC.pink} mono />
      <Etq T={T} at={K.Tu + 0.8} until={K.P - 0.3} x={60} y={560} texto="aquí se forma la orina" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Tu + 2.4} until={K.P - 0.3} x={60} y={610} texto="células dañadas" tam={30} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.R + 0.2} until={K.R + 1.5} anio="2001" quien="revisión · 90 casos analizados" revista="Toxicon, 2001" x={540} y={620} />
      <Etq T={T} at={K.R + 2.1} until={K.Su - 0.3} x={60} y={470} texto="estómago: hacia el día 3" tam={32} color={KC.ink} />
      <NumeroGigante T={T} at={K.R + 3.6} until={K.Su - 0.3} valor={8.5} dec={1} dur={0.8} sufijo=" días" etiqueta="riñón: en la mitad, después de…" x={540} y={660} tam={150} color={KC.red} />
      <Chip T={T} at={K.R + 4.6} until={K.Su - 0.3} texto="mediana · fase renal" x={540} y={820} tam={30} borde={KC.ink} mono />
      <Chip T={T} at={K.Su + 0.2} until={K.Fa - 0.2} texto="oeste de Suecia · 1979–2012" x={380} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Su + 0.5} until={K.Fa - 0.2} x={60} y={560} texto="BMC Nephrology, 2017" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Su + 1.6} until={K.Fa - 0.2} valor={22} dur={1.3} sufijo=" de 28" etiqueta="necesitaron diálisis" x={380} y={690} tam={110} color={CX.dial} />
      <NumeroGigante T={T} at={K.Fa + 0.3} until={K.An - 0.3} valor={75} dur={1.3} sufijo=" %" etiqueta="falla renal más grave" x={380} y={690} tam={130} color={KC.red} />
      <Chip T={T} at={K.Fa + 1.4} until={K.An - 0.3} texto="etapa 5 de enfermedad renal crónica" x={380} y={470} tam={28} borde={KC.red} />
      <MitoTachado T={T} at={K.An + 0.1} tacharEn={K.An + 0.6} until={K.Ev - 0.3} texto="antídoto" x={540} y={470} tam={56} />
      <Chip T={T} at={K.An + 1.2} until={K.Ev - 0.3} texto="diálisis" x={320} y={620} tam={42} borde={CX.dial} />
      <Chip T={T} at={K.An + 2.0} until={K.Ev - 0.3} texto="o un trasplante" x={720} y={760} tam={42} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Ev + 0.3} until={K.Ev + 3.3} anio="2008" quien="Escocia · Nicholas Evans y 3 familiares" revista="autor de «The Horse Whisperer»" x={540} y={640} />
      <Etq T={T} at={K.Ev + 4.0} until={K.Ci - 0.3} x={60} y={560} texto="porcini: poros" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ev + 4.0} until={K.Ci - 0.3} x={60} y={605} texto="Boletus edulis" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ev + 4.4} until={K.Ci - 0.3} x={60} y={675} texto="venenoso: láminas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ev + 4.4} until={K.Ci - 0.3} x={60} y={720} texto="Cortinarius rubellus" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ev + 6.3} until={K.Ci - 0.3} texto="diálisis → un riñón de su hija" x={420} y={470} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Ci + 0.2} until={K.Ci + 3.4} texto="no hay truco casero" x={600} y={440} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ci + 6.8} texto="ante la duda, no lo comas" x={540} y={770} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 7.0} until={K.Ou} texto="di: «comí hongos silvestres»" x={540} y={770} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou} x={60} y={1500} texto="No es guía de identificación ni consejo médico." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Co} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Co} until={K.Es} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Es} until={K.To} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.To} until={K.Tu} texto="esquema · sin escala" largo={0} />
      <BarraEscala T={T} at={K.Tu} until={K.P} texto="20 µm" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.R} texto="10 cm" largo={120} />
      <BarraEscala T={T} at={K.R} until={K.Su} texto="1 día" largo={60} />
      <BarraEscala T={T} at={K.Ev} until={K.Ci} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="10 cm" largo={110} y={1560} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="Horas sin nada *no es estar a salvo.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Es - 0.1} texto="*Cortinarius:* de joven, una cortina de telaraña." />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.To - 0.1} texto="Naranja rojizo, *esporas color óxido.*" />
      <Subtitulo T={T} idx={3} at={K.To + 0.1} until={K.Tu - 0.1} texto="Orelanina: *daña los riñones.*" />
      <Subtitulo T={T} idx={4} at={K.Tu + 0.1} until={K.P - 0.1} texto="Al principio, *casi sin síntomas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.R - 0.1} texto="¿Cuánto tarda *en avisar?*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Su - 0.1} texto="2001, 90 casos: en la mitad, *8.5 días o más.*" />
      <Subtitulo T={T} idx={7} at={K.Su + 0.1} until={K.Fa - 0.1} texto="*22 de 28* necesitaron diálisis." />
      <Subtitulo T={T} idx={8} at={K.Fa + 0.1} until={K.An - 0.1} texto="*3 de cada 4:* falla renal grave." />
      <Subtitulo T={T} idx={9} at={K.An + 0.1} until={K.Ev - 0.1} texto="*Sin antídoto:* diálisis o trasplante." />
      <Subtitulo T={T} idx={10} at={K.Ev + 0.1} until={K.Ci - 0.1} texto="Evans, 2008: los confundieron *con porcini.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ci + 2.9} texto="Ante la duda, *no lo comas.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 3.0} until={K.Ou - 0.1} texto="¿Mal días después? *Urgencias.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Co + 0.5, K.Es + 2.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Tu + 0.6, K.Tu + 4.5, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.R + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Su + 0.4, K.Fa + 3.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ev + 3.6, K.Ev + 7.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ci + 3.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="111" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CortinariusApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CortinariusShot /></CompositionStage></div>;
}
window.CortinariusApp = CortinariusApp;
