// Shot Fungi Mati #119 · Esos puntitos cafés en la hoja pueden ser tu planta sacrificándose — NARRADO (N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Hongo atacante (escenas 2–8): moho de la hoja del jitomate, Cladosporium fulvum (biotrofo: entra por estomas y crece ENTRE las células).
// Alternaria brassicicola solo aparece en el estudio de 2007 (Miya et al., PNAS), como "otro hongo".

const DX = { hoja:'#3fae4a', hoja2:'#2f8f3c', vena:'#b8e6a0', cafe:'#7a4a1f', cafe2:'#4a2a10', halo:'#e8d36a', citop:'#173f2a', cloro:'#46c25a', grana:'#9be38a',
  pared:'#9cc98f', membrana:'#ffd84a', hifa:'#e9dca6', hifaIn:'#f7f0d6', quitina:'#F4C25A', ros:'#ff5a3a', callosa:'#dfe9ff', quitinasa:'#2fd3c8',
  efector:'#ff4fa0', avr4:'#ff9b2f', guardia:'#ff3b2f', conidio:'#b49a4a', maceta:'#c8643a', maceta2:'#9b4524', jitomate:'#e8392b' };

// ---------- textos con cursiva: *así* = cursiva ----------
function partesIt(texto) { return texto.split('*').map((p, i) => <tspan key={i} fontStyle={i % 2 ? 'italic' : 'normal'}>{p}</tspan>); }
function spansIt(texto) { return texto.split('*').map((p, i) => <span key={i} style={{ fontStyle: i % 2 ? 'italic' : 'normal' }}>{p}</span>); }
// Etiqueta con línea (como Etq) que admite cursivas parciales con *…*.
function EtqIt({ T, at, until, x, y, texto, lado = 'der', color = KC.texto, tam = 30 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:60 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>
    <div style={{ font:`700 ${tam}px ${KF.mono}`, color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{spansIt(texto)}</div>
  </div>;
}
// Subtítulo del kit con cursivas: _palabra_ = cursiva; *palabras* = resaltado dorado. Usa window.SUBS[idx] en la narrada.
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 60 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
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

// ---------- HOJA DE JITOMATE (un folíolo): ovado, punta aguda, borde aserrado irregular, base un poco asimétrica ----------
function hojaBorde(L, W, dientes, lado) {
  const N = 90, pts = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N, base = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.72)), 0.85) * (1 - 0.2 * u) * (lado > 0 ? 1 : 0.92);
    const f = (u * dientes + (lado > 0 ? 0 : 0.4)) % 1, diente = u > 0.06 && u < 0.97 ? 1 + 0.09 * (1 - f) * (1 - u * 0.5) : 1;
    pts.push([lado * W * base * diente, -L * u]);
  }
  return pts;
}
const HOJA_L = 760, HOJA_W = 290;
const HOJA_PATH = (() => {
  const d = hojaBorde(HOJA_L, HOJA_W, 15, 1), i = hojaBorde(HOJA_L, HOJA_W, 15, -1).reverse();
  return 'M 0 0 ' + d.map((p) => 'L ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' ' + i.map((p) => 'L ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z';
})();
// puntitos (respuesta hipersensible) en coordenadas de la hoja
const PUNTOS = [[-90, -250, 13], [70, -320, 11], [-40, -430, 14], [110, -470, 10], [-120, -560, 11], [30, -580, 12], [-70, -170, 10], [140, -230, 11], [0, -360, 9], [-150, -390, 10], [80, -640, 9]];
function HojaJitomate({ T, x, y, s = 1, rot = 0, nPuntos = 0, puertas = 0, resalta = -1, rojo = 0 }) {
  const m = Math.sin(T * 1.3) * 1.5;
  return <g transform={`translate(${x} ${y}) rotate(${rot + m}) scale(${s})`}>
    <defs><linearGradient id="dxHoja" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={DX.hoja2} /><stop offset="50%" stopColor={DX.hoja} /><stop offset="100%" stopColor={DX.hoja2} /></linearGradient></defs>
    <path d="M 0 0 L 0 90" stroke={DX.hoja2} strokeWidth={22} strokeLinecap="round" />
    <path d="M 0 0 L 0 90" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" opacity=".0" />
    <path d={HOJA_PATH} fill="url(#dxHoja)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {rojo > 0 && <path d={HOJA_PATH} fill={KC.red} opacity={rojo * 0.25} />}
    <path d={`M 0 0 L 0 ${-HOJA_L * 0.96}`} stroke={DX.vena} strokeWidth={9} strokeLinecap="round" />
    {[0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.85].map((u, k) => [1, -1].map((ld) => {
      const w = HOJA_W * Math.pow(Math.sin(Math.PI * Math.pow(u + 0.1, 0.72)), 0.85) * (1 - 0.2 * u) * 0.8;
      return <path key={k + '' + ld} d={`M 0 ${-HOJA_L * u} Q ${ld * w * 0.5} ${-HOJA_L * (u + 0.03)} ${ld * w} ${-HOJA_L * (u + 0.11)}`} stroke={DX.vena} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity=".85" />;
    }))}
    {PUNTOS.map(([px, py, r], k) => { const q = kclamp(nPuntos - k, 0, 1); if (q <= 0) return null; const e = kEase.rebote(q);
      const pu = kclamp(puertas * PUNTOS.length - k, 0, 1);
      return <g key={k} transform={`translate(${px} ${py})`}>
        <circle r={r * 1.9 * e} fill={DX.halo} opacity=".45" />
        <circle r={r * e} fill={DX.cafe} stroke={DX.cafe2} strokeWidth={3} />
        <circle r={r * 0.45 * e} fill={DX.cafe2} />
        {k === resalta && <circle r={r * 3.2 + Math.sin(T * 6) * 3} fill="none" stroke={KC.yellow} strokeWidth={5} />}
        {pu > 0 && <g transform={`translate(0 ${-r * 0.2})`}>
          <rect x={-15} y={-22} width={30} height={40} rx={4} fill="none" stroke={KC.ink} strokeWidth={4} />
          <g transform={`translate(-15 0) scale(${kEase.sale(pu)} 1)`}><rect x={0} y={-22} width={30} height={40} rx={4} fill={KC.paper} stroke={KC.ink} strokeWidth={4} /><circle cx={23} cy={0} r={3} fill={KC.ink} /></g>
        </g>}
      </g>; })}
  </g>;
}
// Jitomatera en maceta (macro: "tu planta").
function Jitomatera({ T, x, y, s = 1 }) {
  const m = Math.sin(T * 1.1) * 2;
  const hojita = (hx, hy, r, k) => <ellipse key={k} cx={hx} cy={hy} rx={34} ry={16} transform={`rotate(${r} ${hx} ${hy})`} fill={DX.hoja} stroke={KC.ink} strokeWidth={4} />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${m} 0 -120)`}>
      <path d="M 0 -120 Q -10 -260 6 -390" stroke={DX.hoja2} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M 0 -200 Q -60 -230 -110 -220" stroke={DX.hoja2} strokeWidth={8} fill="none" />
      <path d="M 2 -280 Q 60 -300 110 -290" stroke={DX.hoja2} strokeWidth={8} fill="none" />
      {[[-60, -232, -20], [-104, -222, 10], [-80, -200, 30], [60, -302, 20], [104, -292, -10], [80, -272, -30], [6, -400, -80], [-26, -370, -50], [34, -372, 50]].map(([a, b, r], k) => hojita(a, b, r, k))}
      <circle cx={-40} cy={-175} r={26} fill={DX.jitomate} stroke={KC.ink} strokeWidth={5} /><path d="M -50 -200 L -40 -192 L -30 -200" stroke={DX.hoja2} strokeWidth={5} fill="none" />
      <circle cx={34} cy={-245} r={22} fill={DX.jitomate} stroke={KC.ink} strokeWidth={5} />
    </g>
    <path d="M -90 -120 L 90 -120 L 70 20 L -70 20 Z" fill={DX.maceta} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-100} y={-140} width={200} height={34} rx={8} fill={DX.maceta2} stroke={KC.ink} strokeWidth={7} />
  </g>;
}

// ---------- GLÓBULO BLANCO y CÉLULAS DE LA HOJA (escena 1) ----------
function GloboBlanco({ x, y, r = 140, tache = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#efe6ff" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * r * 0.75 * ((i % 3) / 3 + 0.4)} cy={Math.sin(i * 2.4) * r * 0.75 * ((i % 3) / 3 + 0.4)} r={5} fill="#c9a8ff" />)}
    {[[-40, -20], [10, -45], [45, 0], [10, 40]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={38} ry={30} fill="#7b4fd1" stroke={KC.ink} strokeWidth={5} />)}
    {tache > 0 && <path d={`M ${-r} ${-r} L ${r} ${r} M ${r} ${-r} L ${-r} ${r}`} stroke={KC.red} strokeWidth={20} strokeLinecap="round" opacity={tache} transform={`scale(${klerp(1.4, 1, tache)})`} />}
  </g>;
}
function CeldaHoja({ x, y, w = 110, h = 90, luz = 0, cafe = 0, T = 0, k = 0 }) {
  const enc = Math.min(1, w, h) * 0 + 1;
  const sh = 1 - cafe * 0.14;
  return <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${sh})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22} fill={mixHex('#2f8f3c', '#5a3416', cafe)} stroke={luz > 0 ? mixHex(KC.ink, KC.gold2, luz) : KC.ink} strokeWidth={luz > 0 ? 6 + 3 * luz : 6} />
    {cafe < 0.8 && [[-0.28, -0.2], [0.22, -0.25], [-0.05, 0.22], [0.3, 0.2], [-0.32, 0.25]].map(([a, b], i) => <ellipse key={i} cx={a * w} cy={b * h} rx={w * 0.11} ry={h * 0.09} fill={DX.cloro} stroke={DX.grana} strokeWidth={2} opacity={1 - cafe} />)}
    {luz > 0 && <g transform={`translate(${w * 0.32} ${-h * 0.3}) scale(${kEase.rebote(luz) * 0.9})`}>
      <path d="M 0 -18 L 15 -12 L 13 6 Q 9 16 0 21 Q -9 16 -13 6 L -15 -12 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />
    </g>}
    {enc && null}
  </g>;
}

// ---------- AL MICROSCOPIO: envés con estoma, conidio de C. fulvum que germina y entra por el estoma ----------
// Escala: ~8.7 px por µm (un estoma de ~30 µm ≈ 260 px; conidio ~17 × 6 µm). Esquemático.
const EST = { x: 560, y: 960 };
const TUBO = (() => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const x = klerp(300, EST.x, u), y = klerp(770, EST.y - 10, u) + Math.sin(u * Math.PI) * -60 + Math.sin(u * 9) * 8; pts.push([x, y]); } return pts; })();
function Enves({ T, tubo = 0, conidio = 1, cayo = 1 }) {
  const g = krng(11);
  const filas = [640, 720, 800, 880, 1060, 1150];
  return <g>
    <rect x={0} y={600} width={KW} height={620} fill="#bfe8a6" />
    {filas.map((fy, r) => <path key={'f' + r} d={'M 0 ' + fy + ' ' + Array.from({ length: 28 }, (_, i) => `Q ${i * 40 + 20} ${fy + (i % 2 ? 14 : -14)} ${i * 40 + 40} ${fy}`).join(' ')} stroke="#7fb86a" strokeWidth={5} fill="none" />)}
    {filas.slice(0, -1).map((fy, r) => Array.from({ length: 7 }, (_, i) => { const xx = 80 + i * 150 + (r % 2) * 70 + g() * 30; const y2 = filas[r + 1]; if (Math.abs(xx - EST.x) < 190 && fy > 800 && fy < 1100) return null;
      return <path key={r + '-' + i} d={`M ${xx} ${fy} Q ${xx + 18} ${(fy + y2) / 2} ${xx - 6} ${y2}`} stroke="#7fb86a" strokeWidth={5} fill="none" />; }))}
    {/* estoma: dos células oclusivas en forma de frijol alrededor del poro */}
    <g transform={`translate(${EST.x} ${EST.y})`}>
      <ellipse rx={175} ry={190} fill="#a9dc93" stroke="#7fb86a" strokeWidth={5} />
      <path d="M 0 -135 Q -110 -130 -110 0 Q -110 130 0 135 Q -36 0 0 -135 Z" fill="#7fd26a" stroke={KC.ink} strokeWidth={6} />
      <path d="M 0 -135 Q 110 -130 110 0 Q 110 130 0 135 Q 36 0 0 -135 Z" fill="#7fd26a" stroke={KC.ink} strokeWidth={6} />
      {[-62, 62].map((cx) => [-60, -10, 40, 80].map((cy, i) => <ellipse key={cx + '_' + i} cx={cx + (cx > 0 ? -6 : 6) * (i % 2)} cy={cy} rx={13} ry={9} fill={DX.cloro} stroke={DX.grana} strokeWidth={2} />))}
      <path d="M 0 -118 Q -24 0 0 118 Q 24 0 0 -118 Z" fill="#1a2a14" />
    </g>
    {/* tubo germinativo / hifa corredora que va al poro */}
    {tubo > 0 && (() => { const p = kParcial(TUBO, tubo); const d = 'M ' + p.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
      return <g><path d={d} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" /><path d={d} stroke={DX.hifa} strokeWidth={20} fill="none" strokeLinecap="round" /></g>; })()}
    {/* conidio: elipsoide, claro a café olivo, con un tabique (2 células) */}
    {conidio > 0 && <g transform={`translate(${klerp(300, 290, cayo)} ${klerp(300, 760, kEase.sale(cayo))}) rotate(${klerp(-50, -14, cayo)})`} opacity={conidio}>
      <ellipse cx={-70} cy={0} rx={78} ry={27} fill={DX.conidio} stroke={KC.ink} strokeWidth={6} />
      <line x1={-70} y1={-26} x2={-70} y2={26} stroke={KC.ink} strokeWidth={4} />
      <ellipse cx={-110} cy={-8} rx={18} ry={6} fill="#fff" opacity=".35" />
      <circle cx={-148} cy={0} r={5} fill={KC.ink} />
    </g>}
  </g>;
}

// ---------- POR DENTRO: corte con la hifa entre dos células (escenas 3–5 y 7) ----------
const HIFA_Y = 690, PARED_Y = 770, MEMB_Y = 794;
const REC_X = [190, 400, 640, 870];
const hifaY = (x) => HIFA_Y + Math.sin(x / 130) * 8;
function CorteCelula({ T, quit = 0, frag = 0, capt = 0, alarma = 0, ros = 0, callosa = 0, qnasa = 0, efect = 0, avr4 = 0, guardia = 0, apaga = 0 }) {
  const g = krng(7);
  const hd = 'M -60 ' + hifaY(-60) + ' ' + Array.from({ length: 30 }, (_, i) => { const x = -60 + (i + 1) * 42; return `L ${x} ${hifaY(x).toFixed(1)}`; }).join(' ');
  const al = alarma * (1 - apaga) * (0.75 + 0.25 * Math.sin(T * 9));
  const cloros = Array.from({ length: 16 }, () => [80 + g() * 900, 850 + g() * 270, g() * 180]);
  return <g>
    {/* célula de arriba (solo su orilla de abajo) */}
    <rect x={40} y={470} width={1000} height={185} rx={40} fill={DX.citop} stroke={DX.pared} strokeWidth={16} />
    {[[150, 610], [330, 600], [520, 615], [760, 605], [930, 612]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={34} ry={16} fill={DX.cloro} stroke={DX.grana} strokeWidth={2} />)}
    {/* célula de abajo: pared, membrana, citoplasma */}
    <rect x={40} y={PARED_Y} width={1000} height={400} rx={40} fill={DX.citop} stroke={DX.pared} strokeWidth={18} />
    <rect x={58} y={MEMB_Y - 6} width={964} height={370} rx={30} fill="none" stroke={DX.membrana} strokeWidth={4} />
    <rect x={64} y={MEMB_Y} width={952} height={358} rx={26} fill="none" stroke={DX.membrana} strokeWidth={3} opacity=".7" />
    {cloros.map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={36} ry={17} transform={`rotate(${r} ${a} ${b})`} fill={DX.cloro} stroke={DX.grana} strokeWidth={2} />)}
    <circle cx={820} cy={1060} r={62} fill="#6a5bb0" stroke={KC.ink} strokeWidth={5} /><circle cx={835} cy={1050} r={18} fill="#3c2f7a" />
    {al > 0 && <rect x={64} y={MEMB_Y} width={952} height={358} rx={26} fill={KC.red} opacity={al * 0.4} />}
    {/* callosa: engrosamiento (papila) bajo la pared, junto a la hifa */}
    {callosa > 0 && <g><ellipse cx={540} cy={MEMB_Y + 4} rx={120 * kEase.sale(callosa)} ry={42 * kEase.sale(callosa)} fill={DX.callosa} stroke={KC.ink} strokeWidth={5} />
      {[-60, -20, 20, 60].map((dx) => <line key={dx} x1={540 + dx * callosa} y1={MEMB_Y - 20} x2={540 + dx * callosa * 1.1} y2={MEMB_Y + 25} stroke="#a9b9e8" strokeWidth={3} />)}</g>}
    {/* receptores en la membrana: brazos afuera, cinasa adentro */}
    {REC_X.map((rx, i) => { const c = kclamp(capt * 4 - i * 0.6, 0, 1), a = klerp(32, 8, kEase.sale(c)), col = c > 0.6 ? KC.gold2 : '#7fe0ff';
      return <g key={i} transform={`translate(${rx} ${MEMB_Y})`}>
        <line x1={0} y1={-8} x2={0} y2={26} stroke={KC.ink} strokeWidth={14} /><line x1={0} y1={-8} x2={0} y2={26} stroke={col} strokeWidth={8} />
        {[-1, 1].map((ld) => <path key={ld} d={`M 0 -8 Q ${ld * 26} -14 ${ld * Math.sin(a * Math.PI / 180) * 46} ${-8 - Math.cos(a * Math.PI / 180) * 46}`} stroke={col} strokeWidth={9} fill="none" strokeLinecap="round" />)}
        <ellipse cx={0} cy={40} rx={26} ry={18} fill={col} stroke={KC.ink} strokeWidth={4} />
        {c > 0.6 && <circle cx={0} cy={40} r={30 + Math.sin(T * 8) * 4} fill="none" stroke={KC.gold2} strokeWidth={3} opacity=".7" />}
      </g>; })}
    {/* guardián (receptor de resistencia Cf-4): proteína de superficie con brazos rizados que reconoce a Avr4 */}
    {guardia > 0 && <g transform={`translate(760 ${MEMB_Y}) scale(${kEase.rebote(kclamp(guardia * 3, 0, 1)) * 1.6})`}>
      <line x1={0} y1={0} x2={0} y2={30} stroke={DX.guardia} strokeWidth={10} />
      <path d="M 0 0 C -40 -10 -40 -40 -10 -44 C 20 -48 30 -20 10 -14" stroke={DX.guardia} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M 0 0 C 40 -10 44 -36 18 -40" stroke={DX.guardia} strokeWidth={9} fill="none" strokeLinecap="round" />
    </g>}
    {/* hifa del moho entre las dos células (crece por el espacio de afuera) */}
    <path d={hd} stroke={KC.ink} strokeWidth={70} fill="none" />
    <path d={hd} stroke={DX.hifa} strokeWidth={58} fill="none" />
    <path d={hd} stroke={DX.hifaIn} strokeWidth={34} fill="none" />
    {[150, 430, 710, 990].map((sx) => <line key={sx} x1={sx} y1={hifaY(sx) - 28} x2={sx} y2={hifaY(sx) + 28} stroke={KC.ink} strokeWidth={4} />)}
    {/* fibras de quitina en la pared de la hifa */}
    {quit > 0 && Array.from({ length: 38 }, (_, i) => { const x = -20 + i * 30; const y = hifaY(x); const b = 0.6 + 0.4 * Math.sin(T * 6 + i);
      return <g key={i} opacity={quit * b}><line x1={x} y1={y - 26} x2={x + 16} y2={y - 22} stroke={DX.quitina} strokeWidth={5} /><line x1={x} y1={y + 22} x2={x + 16} y2={y + 26} stroke={DX.quitina} strokeWidth={5} /></g>; })}
    {/* Avr4 se pega a la quitina como escudo */}
    {avr4 > 0 && Array.from({ length: 16 }, (_, i) => { const x = 220 + i * 40; const q = kclamp(avr4 * 16 - i, 0, 1); if (q <= 0) return null;
      return <circle key={i} cx={x} cy={hifaY(x) + 30} r={11 * kEase.rebote(q)} fill={DX.avr4} stroke={KC.ink} strokeWidth={3} />; })}
    {/* pedacitos de quitina que bajan a los receptores */}
    {frag > 0 && REC_X.map((rx, i) => { const q = kclamp(frag * 1.6 - i * 0.2, 0, 1); if (q <= 0) return null; const yy = klerp(hifaY(rx) + 30, MEMB_Y - 40, kEase.suave(q));
      return <g key={i} transform={`translate(${rx + Math.sin(T * 3 + i) * 6 * (1 - q)} ${yy})`}>
        {[-11, 11].map((dx) => <polygon key={dx} points={[0, 60, 120, 180, 240, 300].map((a) => `${dx + 10 * Math.cos((a + 30) * Math.PI / 180)},${10 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ')} fill={DX.quitina} stroke={KC.ink} strokeWidth={2.5} />)}
      </g>; })}
    {/* especies reactivas de oxígeno: chispas que salen de la célula hacia la hifa */}
    {ros > 0 && Array.from({ length: 18 }, (_, i) => { const ph = ((T * 0.9 + i / 18) % 1), x = 90 + ((i * 137) % 900), y = klerp(MEMB_Y - 10, HIFA_Y + 20, ph);
      const o = ros * Math.sin(Math.PI * ph);
      return <path key={i} d={`M ${x} ${y - 12} L ${x + 4} ${y - 4} L ${x + 12} ${y} L ${x + 4} ${y + 4} L ${x} ${y + 12} L ${x - 4} ${y + 4} L ${x - 12} ${y} L ${x - 4} ${y - 4} Z`} fill={DX.ros} stroke="#ffd2a0" strokeWidth={2} opacity={o} />; })}
    {/* quitinasas: tijeritas que suben y muerden la pared de la hifa */}
    {qnasa > 0 && [260, 520, 780, 960, 120].map((qx, i) => { const q = kclamp(qnasa * 1.5 - i * 0.12, 0, 1); if (q <= 0) return null;
      const rebota = avr4 > 0.3 && qx > 200 && qx < 860; const yy = rebota ? klerp(MEMB_Y - 30, hifaY(qx) + 56, Math.sin(Math.PI * q) * 0.8) : klerp(MEMB_Y - 30, hifaY(qx) + 40, kEase.sale(q));
      const boca = 20 + 18 * Math.abs(Math.sin(T * 10 + i));
      return <g key={i}>
        {!rebota && q > 0.8 && <rect x={qx - 18} y={hifaY(qx) + 20} width={36} height={12} fill={KC.dark} />}
        <path d={`M ${qx} ${yy} L ${qx + 20 * Math.cos(-boca * Math.PI / 180)} ${yy + 20 * Math.sin(-boca * Math.PI / 180)} A 20 20 0 1 0 ${qx + 20 * Math.cos(boca * Math.PI / 180)} ${yy + 20 * Math.sin(boca * Math.PI / 180)} Z`} transform={`rotate(-90 ${qx} ${yy})`} fill={DX.quitinasa} stroke={KC.ink} strokeWidth={4} />
      </g>; })}
    {/* efectores: bolitas que suelta la hifa al espacio de afuera */}
    {efect > 0 && [300, 470, 640, 820, 960, 160].map((ex, i) => { const q = kclamp(efect * 1.4 - i * 0.1, 0, 1); if (q <= 0) return null;
      const yy = klerp(hifaY(ex) + 30, PARED_Y - 18, kEase.sale(q)), xx = ex + Math.sin(T * 2 + i) * 14;
      return <circle key={i} cx={xx} cy={yy} r={12} fill={DX.efector} stroke={KC.ink} strokeWidth={3} />; })}
    {guardia > 0.5 && <circle cx={760} cy={MEMB_Y - 30} r={13} fill={DX.avr4} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}

// ---------- TEJIDO DE LA HOJA: la hifa entre células; las atacadas mueren (respuesta hipersensible) ----------
const TJ = { x0: 75, y0: 650, w: 150, h: 120, gx: 16, gy: 16, cols: 6, filas: 4 };
const gapX = (c) => TJ.x0 + TJ.w + c * (TJ.w + TJ.gx) + TJ.gx / 2;   // hueco entre la columna c y la c+1
const gapY = (r) => TJ.y0 + TJ.h + r * (TJ.h + TJ.gy) + TJ.gy / 2;
const RUTA = [[gapX(1), 560], [gapX(1), gapY(0)], [gapX(2), gapY(0)], [gapX(2), gapY(1)], [gapX(1), gapY(1)], [gapX(1), gapY(2) - 30]];
const ATACADAS = [[1, 0], [2, 0], [1, 1], [2, 1], [3, 0], [3, 1], [2, 2]];
function Tejido({ T, hifa = 1, hr = 0 }) {
  const p = kParcial(RUTA, hifa); const d = 'M ' + p.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g>
    {Array.from({ length: TJ.cols * TJ.filas }, (_, k) => { const c = k % TJ.cols, r = Math.floor(k / TJ.cols); const ai = ATACADAS.findIndex(([a, b]) => a === c && b === r);
      const caf = ai >= 0 ? kclamp(hr * 2.2 - ai * 0.18, 0, 1) : 0;
      return <CeldaHoja key={k} x={TJ.x0 + c * (TJ.w + TJ.gx)} y={TJ.y0 + r * (TJ.h + TJ.gy)} w={TJ.w} h={TJ.h} cafe={caf} T={T} />; })}
    <path d={d} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={mixHex(DX.hifa, '#8a8a80', kclamp(hr * 1.5 - 0.5, 0, 1))} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* la epidermis con su estoma arriba */}
    <rect x={40} y={590} width={1000} height={36} rx={14} fill="#bfe8a6" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={gapX(1)} cy={606} rx={46} ry={20} fill="#7fd26a" stroke={KC.ink} strokeWidth={5} /><ellipse cx={gapX(1)} cy={606} rx={12} ry={8} fill="#1a2a14" />
  </g>;
}

// ---------- ARABIDOPSIS: roseta y hoja con mancha de Alternaria ----------
function Roseta({ T, x, y, s = 1, alarma = 0, gris = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {alarma > 0 && <circle r={190 + Math.sin(T * 8) * 8} fill={KC.red} opacity={alarma * 0.25} />}
    {Array.from({ length: 11 }, (_, i) => { const a = i * 360 / 11 + (i % 2) * 12, L = i % 2 ? 130 : 160;
      return <g key={i} transform={`rotate(${a + Math.sin(T * 1.2 + i) * 1.5})`}>
        <path d={`M 0 0 L 0 ${-L * 0.45} Q ${-40} ${-L * 0.7} 0 ${-L} Q 40 ${-L * 0.7} 0 ${-L * 0.45}`} fill={mixHex('#4cb050', '#8aa08a', gris)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        <line x1={0} y1={-10} x2={0} y2={-L * 0.9} stroke={DX.vena} strokeWidth={3} />
      </g>; })}
    <circle r={16} fill="#3c8f3f" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function HojaArabidopsis({ T, x, y, s = 1, mancha = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 0 -160 Q -170 -260 0 -470 Q 170 -260 0 -160" fill="#4cb050" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={0} y1={-10} x2={0} y2={-440} stroke={DX.vena} strokeWidth={5} />
    {mancha > 0 && <g transform="translate(-10 -300)">
      <circle r={mancha * 1.25} fill={DX.halo} opacity=".6" />
      <circle r={mancha} fill="#5a3a1e" stroke="#2e1a0a" strokeWidth={3} />
      {[0.72, 0.45, 0.2].map((f, i) => <circle key={i} r={mancha * f} fill="none" stroke="#2e1a0a" strokeWidth={3} opacity=".8" />)}
    </g>}
  </g>;
}

// ---------- PLANTA CON ALARMA A DISTANCIA (escena 11) ----------
const TALLO = [[380, 1190], [372, 1060], [384, 940], [376, 820], [380, 690]];
const HOJAS_P = [{ y: 1060, lado: -1, atac: true }, { y: 940, lado: 1 }, { y: 820, lado: -1 }, { y: 700, lado: 1 }];
function HojaCompuesta({ x, y, lado, s = 1, rojo = 0, escudo = 0, sa = 0, T = 0, atac = false }) {
  const fol = (u, k) => { const px = lado * 230 * u, py = -30 * u; return <g key={k}>
    {[-1, 1].map((ld) => <ellipse key={ld} cx={px} cy={py + ld * 40} rx={40} ry={22} transform={`rotate(${ld * 30 * lado} ${px} ${py + ld * 40})`} fill={DX.hoja} stroke={KC.ink} strokeWidth={4} />)}</g>; };
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 1.2 + y) * 2}) scale(${s})`}>
    {escudo > 0 && <ellipse cx={lado * 140} cy={-20} rx={190} ry={95} fill={KC.cyan} opacity={0.25 * escudo} stroke={KC.cyan} strokeWidth={5} />}
    <path d={`M 0 0 Q ${lado * 120} -20 ${lado * 260} -40`} stroke={DX.hoja2} strokeWidth={8} fill="none" />
    {[0.3, 0.6].map(fol)}
    <ellipse cx={lado * 280} cy={-44} rx={52} ry={28} fill={DX.hoja} stroke={KC.ink} strokeWidth={4} />
    {rojo > 0 && <ellipse cx={lado * 150} cy={-24} rx={170} ry={70} fill={KC.red} opacity={0.3 * rojo * (0.7 + 0.3 * Math.sin(T * 8))} />}
    {atac && [[0.32, -36], [0.6, 30], [1.2, -44]].map(([u, dy], k) => <circle key={k} cx={lado * 230 * u} cy={dy - 30 * u} r={8} fill={DX.cafe} stroke={DX.cafe2} strokeWidth={2} />)}
    {sa > 0 && <g transform={`translate(${lado * 150} -90) scale(${kEase.rebote(sa) * 0.42})`}><AcidoSalicilico /></g>}
  </g>;
}
function AcidoSalicilico({ etiquetas = false }) {
  const R = 70, hex = [0, 60, 120, 180, 240, 300].map((a) => [R * Math.cos((a - 90) * Math.PI / 180), R * Math.sin((a - 90) * Math.PI / 180)]);
  const v1 = hex[0], v2 = hex[1];
  return <g>
    <polygon points={hex.map((p) => p.join(',')).join(' ')} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle r={R * 0.55} fill="none" stroke={KC.ink} strokeWidth={5} />
    <line x1={v1[0]} y1={v1[1]} x2={v1[0]} y2={v1[1] - 60} stroke={KC.ink} strokeWidth={7} />
    <line x1={v2[0]} y1={v2[1]} x2={v2[0] + 55} y2={v2[1] - 30} stroke={KC.ink} strokeWidth={7} />
    <text x={v1[0]} y={v1[1] - 72} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>COOH</text>
    <text x={v2[0] + 62} y={v2[1] - 24} textAnchor="start" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>OH</text>
  </g>;
}
function Pastilla({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={14} rx={92} ry={36} fill="#cfcac0" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={92} ry={36} fill="#fbfaf6" stroke={KC.ink} strokeWidth={6} />
    <line x1={-56} y1={0} x2={56} y2={0} stroke="#cfcac0" strokeWidth={6} />
  </g>;
}
// Foco de alarma (re-gancho)
function Alarma({ T, x, y, s = 1, on = 1 }) {
  const b = on * (0.6 + 0.4 * Math.sin(T * 14));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {b > 0.05 && Array.from({ length: 8 }, (_, i) => <line key={i} x1={Math.cos(i * Math.PI / 4) * 160} y1={-90 + Math.sin(i * Math.PI / 4) * 160} x2={Math.cos(i * Math.PI / 4) * 220} y2={-90 + Math.sin(i * Math.PI / 4) * 220} stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={b} />)}
    <path d="M -110 0 L -110 -100 Q -110 -210 0 -210 Q 110 -210 110 -100 L 110 0 Z" fill={mixHex('#8d8d8d', KC.red, on)} stroke={KC.ink} strokeWidth={9} />
    <path d="M -70 -110 Q -70 -170 -20 -175" stroke="#fff" strokeWidth={14} fill="none" opacity={0.25 + 0.4 * on} strokeLinecap="round" />
    <rect x={-150} y={0} width={300} height={70} rx={16} fill="#3a3a44" stroke={KC.ink} strokeWidth={9} />
  </g>;
}

function DefensaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, SG: CUES.SinGlobulos, Es: CUES.Espora, Q: CUES.Quitina, R: CUES.Receptor, A: CUES.Alarma, P: CUES.Pregunta, Ef: CUES.Efectores,
    S: CUES.Sacrificio, E: CUES.Estudio, M: CUES.Manchas, As: CUES.Aspirina, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const zS = klerp(1.18, 0.9, kprog(T, K.S + 2.6, K.S + 4.6, kEase.suave));
  const nPuntosG = kprog(T, K.G + 0.15, K.G + 2.6) * PUNTOS.length;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la hoja de tu jitomate se llena de puntitos cafés */}
      <Escena T={T} a={K.G} b={K.SG} zoom={0.06} origen="35% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Jitomatera T={T} x={860} y={1170} s={0.78} />
          <path d="M 760 980 Q 620 900 560 900" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" fill="none" />
          <HojaJitomate T={T} x={330} y={1190} s={0.92} rot={8} nPuntos={nPuntosG} />
        </>)}
      </Escena>
      {/* 1 · sin glóbulos blancos: cada célula se defiende */}
      <Escena T={T} a={K.SG} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <GloboBlanco x={250} y={850} r={150} tache={kprog(T, K.SG + 1.0, K.SG + 1.4, kEase.sale)} />
          {Array.from({ length: 12 }, (_, k) => { const c = k % 3, r = Math.floor(k / 3);
            return <CeldaHoja key={k} x={520 + c * 160} y={720 + r * 100} w={146} h={88} luz={kprog(T, K.SG + 1.8 + k * 0.12, K.SG + 2.2 + k * 0.12)} T={T} />; })}
        </>)}
      </Escena>
      {/* 2 · al microscopio: el conidio cae en el envés, germina y su hifa entra por el estoma */}
      <Escena T={T} a={K.Es} b={K.Q} zoom={0.07} origen="50% 52%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<Enves T={T} cayo={kprog(T, K.Es + 0.1, K.Es + 1.1)} tubo={kprog(T, K.Es + 1.4, K.Es + 4.0, kEase.suave)} />)}
      </Escena>
      {/* 3–5 · por dentro: quitina → receptores → alarma */}
      <Escena T={T} a={K.Q} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<CorteCelula T={T} quit={kprog(T, K.Q + 0.3, K.Q + 0.9)} frag={kprog(T, K.Q + 1.2, K.R + 1.2)} capt={kprog(T, K.R + 0.6, K.R + 2.0)}
          alarma={kprog(T, K.A, K.A + 0.4)} ros={kprog(T, K.A + 0.4, K.A + 1.0)} callosa={kprog(T, K.A + 1.7, K.A + 2.6)} qnasa={kprog(T, K.A + 3.0, K.A + 4.6)} />)}
      </Escena>
      {/* 6 · re-gancho: ¿y si el hongo apaga la alarma? */}
      <Escena T={T} a={K.P} b={K.Ef} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Alarma T={T} x={270} y={1000} s={1.1} on={1 - kprog(T, K.P + 0.6, K.P + 1.4)} /><Interrogacion T={T} x={270} y={720} tam={300} /></>)}
      </Escena>
      {/* 7 · efectores; Avr4 tapa la quitina; el guardián Cf-4 lo reconoce y vuelve la alarma */}
      <Escena T={T} a={K.Ef} b={K.S} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<CorteCelula T={T} quit={1} capt={1} callosa={1} efect={kprog(T, K.Ef + 0.2, K.Ef + 1.6)} avr4={kprog(T, K.Ef + 1.2, K.Ef + 2.4)}
          qnasa={kprog(T, K.Ef + 1.6, K.Ef + 3.0)} alarma={1} apaga={kprog(T, K.Ef + 0.6, K.Ef + 1.6) * (1 - kprog(T, K.Ef + 4.1, K.Ef + 4.5))} guardia={kprog(T, K.Ef + 3.2, K.Ef + 4.2)} />)}
      </Escena>
      {/* 8 · respuesta hipersensible: las células atacadas mueren; el hongo se detiene */}
      <Escena T={T} a={K.S} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {(() => { const z = zS;
          return <div style={{ position:'absolute', inset:0, transform:`scale(${z})`, transformOrigin:'30% 42%' }}>
            {fsvg(<Tejido T={T} hifa={klerp(0.55, 0.82, kprog(T, K.S - 0.3, K.S + 1.0))} hr={kprog(T, K.S + 0.6, K.S + 2.4)} />)}</div>; })()}
      </Escena>
      {/* 9–10 · el estudio de 2007 (Arabidopsis) y otro hongo: Alternaria */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Roseta T={T} x={290} y={940} s={0.95} alarma={kprog(T, K.E + 3.2, K.E + 3.6)} />
          <Roseta T={T} x={790} y={940} s={0.95} />
          {[290, 790].map((rx, j) => Array.from({ length: 4 }, (_, i) => { const q = kprog(T, K.E + 2.2 + i * 0.12, K.E + 3.1 + i * 0.12); if (q <= 0 || q >= 1) return null;
            return <polygon key={j + '-' + i} transform={`translate(${rx - 60 + i * 40} ${klerp(700, 900, kEase.suave(q))})`} points={[0, 60, 120, 180, 240, 300].map((a) => `${12 * Math.cos((a + 30) * Math.PI / 180)},${12 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ')} fill={DX.quitina} stroke={KC.ink} strokeWidth={3} />; }))}
        </>)}
      </Escena>
      <Escena T={T} a={K.M} b={K.As} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <HojaArabidopsis T={T} x={290} y={1190} s={1.05} mancha={klerp(4, 58, kprog(T, K.M + 0.6, K.M + 3.4, kEase.suave))} />
          <HojaArabidopsis T={T} x={790} y={1190} s={1.05} mancha={klerp(4, 70, kprog(T, K.M + 0.6, K.M + 3.4, kEase.suave))} />
        </>)}
      </Escena>
      {/* 11 · la alarma viaja: señal por el tallo; en las hojas sanas sube el ácido salicílico */}
      <Escena T={T} a={K.As} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <path d={'M ' + TALLO.map((p) => p.join(' ')).join(' L ')} stroke={DX.hoja2} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 320 1190 L 440 1190 L 425 1260 L 335 1260 Z" fill={DX.maceta} stroke={KC.ink} strokeWidth={6} />
          {HOJAS_P.map((h, i) => { const llega = K.As + 0.8 + i * 0.55; const sa = h.atac ? 0 : kprog(T, llega, llega + 0.4);
            return <HojaCompuesta key={i} T={T} x={380} y={h.y} lado={h.lado} s={0.85} atac={h.atac} rojo={h.atac ? 1 : 0} escudo={h.atac ? 0 : kprog(T, llega + 0.3, llega + 0.8)} sa={sa} />; })}
          {(() => { const q = kprog(T, K.As + 0.4, K.As + 2.6); if (q <= 0 || q >= 1) return null; const pts = kParcial([[372, 1060], [384, 940], [376, 820], [380, 690]], q); const p = pts.at(-1);
            return <g><circle cx={p[0]} cy={p[1]} r={30} fill={KC.yellow} opacity=".45" /><circle cx={p[0]} cy={p[1]} r={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>; })()}
          <g transform="translate(850 840)" opacity={kprog(T, K.As + 2.6, K.As + 3.0)}><g transform={`scale(${kEase.rebote(kprog(T, K.As + 2.6, K.As + 3.1)) * 0.95})`}><AcidoSalicilico /></g></g>
          <g opacity={kprog(T, K.As + 3.4, K.As + 3.8)}><Pastilla x={850} y={1045} s={0.8} /></g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma hoja del inicio; cada puntito es una puerta cerrada */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="35% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Jitomatera T={T} x={860} y={1170} s={0.78} />
          <path d="M 760 980 Q 620 900 560 900" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" fill="none" />
          <HojaJitomate T={T} x={330} y={1190} s={0.92} rot={8} nPuntos={PUNTOS.length} puertas={kprog(T, K.C + 0.8, K.C + 3.4)} />
        </>)}
      </Escena>

      {/* textos y etiquetas */}
      <Chip T={T} at={K.G + 0.9} until={K.SG - 0.3} texto="¿el hongo ganando?" x={300} y={420} tam={36} borde={KC.red} />
      <Chip T={T} at={K.G + 3.3} until={K.SG - 0.3} texto="¿o tu planta sacrificándose?" x={330} y={510} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.G + 3.2} until={K.SG - 0.3} x={640} y={700} texto="tu jitomate" tam={28} color={KC.ink} />
      <Etq T={T} at={K.SG + 0.4} until={K.Es - 0.3} x={60} y={600} texto="glóbulo blanco" tam={30} color={KC.ink} />
      <Etq T={T} at={K.SG + 0.6} until={K.Es - 0.3} x={60} y={645} texto="(tu cuerpo sí tiene)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.SG + 1.1} until={K.Es - 0.3} texto="tu planta: no tiene" x={250} y={1080} tam={30} borde={KC.red} />
      <Etq T={T} at={K.SG + 1.8} until={K.Es - 0.3} x={520} y={1150} texto="células de la hoja" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.1} until={K.Q - 0.3} texto="AL MICROSCOPIO · ENVÉS DE LA HOJA" x={540} y={420} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Es + 0.9} until={K.Q - 0.3} x={60} y={490} texto="moho de la hoja del jitomate" tam={28} color={KC.yellow} />
      <EtqIt T={T} at={K.Es + 1.2} until={K.Q - 0.3} x={60} y={535} texto="conidio de *Cladosporium fulvum*" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.Es + 2.4} until={K.Q - 0.3} x={40} y={1050} texto="estoma" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Es + 2.6} until={K.Q - 0.3} x={40} y={1095} texto="(poro de la hoja)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.05} until={K.A - 0.3} texto="POR DENTRO · LA HOJA EN CORTE" x={400} y={380} tam={28} borde={KC.cyan} mono />
      <Etq T={T} at={K.Q + 0.4} until={K.A - 0.3} x={60} y={505} texto="la hifa crece entre las células" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Q + 0.8} until={K.A - 0.3} x={60} y={548} texto="su pared: quitina" tam={28} color={KC.gold2} />
      <EtqIt T={T} at={K.R + 0.4} until={K.A + 4.8} x={80} y={1125} texto="receptores (LYK5 + CERK1 en *Arabidopsis*)" tam={26} color="#7fe0ff" />
      <Chip T={T} at={K.A + 0.3} until={K.P - 0.3} texto="oxígeno reactivo" x={250} y={390} tam={32} borde={DX.ros} />
      <Chip T={T} at={K.A + 1.8} until={K.P - 0.3} texto="callosa: refuerza la pared" x={320} y={470} tam={30} borde={DX.callosa} />
      <Chip T={T} at={K.A + 3.1} until={K.P - 0.3} texto="quitinasas: cortan la quitina" x={330} y={550} tam={30} borde={DX.quitinasa} />
      <Etq T={T} at={K.Ef + 0.4} until={K.S - 0.3} x={60} y={340} texto="efectores del hongo" tam={30} color={DX.efector} />
      <Etq T={T} at={K.Ef + 1.4} until={K.S - 0.3} x={60} y={378} texto="Avr4: le tapa la quitina" tam={28} color={DX.avr4} />
      <EtqIt T={T} at={K.Ef + 3.3} until={K.S - 0.3} x={60} y={416} texto="guardián: receptor del gen *Cf-4*" tam={28} color={DX.guardia} />
      <Chip T={T} at={K.Ef + 4.2} until={K.S - 0.3} texto="¡alarma otra vez!" x={540} y={1110} tam={32} borde={KC.red} />
      <Chip T={T} at={K.S + 0.6} until={K.E - 0.3} texto="respuesta hipersensible" x={300} y={380} tam={30} borde={KC.red} mono />
      <Etq T={T} at={K.S + 1.6} until={K.E - 0.3} x={60} y={440} texto="solo frena a hongos" tam={26} color={KC.texto} />
      <Etq T={T} at={K.S + 1.6} until={K.E - 0.3} x={60} y={478} texto="que comen de células vivas" tam={26} color={KC.texto} />
      <Chip T={T} at={K.S + 3.0} until={K.E - 0.3} texto="unas pocas células" x={790} y={470} tam={30} borde={KC.gold2} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="2007" quien="Universidad Meiji, Japón" revista="PNAS, 2007 · con RIKEN" x={360} y={560} />
      <EtqIt T={T} at={K.E + 1.4} until={K.M - 0.3} x={140} y={750} texto="*Arabidopsis* normal" tam={26} color={KC.ink} />
      <Etq T={T} at={K.E + 1.8} until={K.M - 0.3} x={640} y={750} texto="sin CERK1" tam={26} color={KC.ink} />
      <Chip T={T} at={K.E + 3.4} until={K.M - 0.3} texto="¡alarma!" x={290} y={1140} tam={30} borde={KC.red} />
      <Chip T={T} at={K.E + 3.8} until={K.M - 0.3} texto="sin alarma" x={790} y={1140} tam={30} borde={KC.ink} />
      <EtqIt T={T} at={K.M + 0.2} until={K.As - 0.3} x={60} y={420} texto="otro hongo: *Alternaria brassicicola*" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 0.8} until={K.As - 0.3} x={60} y={465} texto="la mancha = el hongo avanzando" tam={26} color={KC.ink} />
      <Etq T={T} at={K.M + 0.4} until={K.As - 0.3} x={150} y={600} texto="normal" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 0.4} until={K.As - 0.3} x={650} y={600} texto="sin CERK1" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 2.6} until={K.As - 0.3} texto="≈20 % más grandes · 6 días" x={540} y={1140} tam={30} borde={KC.red} />
      <Etq T={T} at={K.As + 0.5} until={K.C - 0.3} x={60} y={1150} texto="hoja atacada" tam={26} color={KC.ink} />
      <Etq T={T} at={K.As + 0.9} until={K.As + 2.8} x={400} y={760} texto="señal" tam={30} color={KC.ink} />
      <Etq T={T} at={K.As + 1.6} until={K.C - 0.3} x={60} y={530} texto="hojas sanas: se preparan" tam={26} color={KC.ink} />
      <Etq T={T} at={K.As + 2.8} until={K.C - 0.3} x={690} y={965} texto="ácido salicílico" tam={26} color={KC.ink} />
      <Etq T={T} at={K.As + 3.6} until={K.C - 0.3} x={640} y={1100} texto="pariente: la aspirina" tam={24} color={KC.ink} />
      <Etq T={T} at={K.As + 3.9} until={K.C - 0.3} x={640} y={1140} texto="(ácido acetilsalicílico)" tam={22} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="cada puntito: una puerta cerrada" x={420} y={420} tam={28} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.SG} texto="1 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.SG} until={K.Es} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.Q} texto="20 µm" largo={174} />
      <BarraEscala T={T} at={K.Q} until={K.S} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.S} until={K.E} texto="20 µm" largo={110 * zS} />
      <BarraEscala T={T} at={K.E} until={K.M} texto="2 cm" largo={130} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.As} texto="1 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.As} until={K.C} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={110} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json); _x_ = cursiva, *x* = resaltado */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.SG - 0.1} texto="¿El hongo ganando? *O tu planta sacrificándose.*" />
      <SubIt T={T} idx={1} at={K.SG + 0.1} until={K.Es - 0.1} texto="Sin glóbulos blancos: *cada célula puede defenderse.*" />
      <SubIt T={T} idx={2} at={K.Es + 0.1} until={K.Q - 0.1} texto="Su hifa entra *por un poro* de la hoja." />
      <SubIt T={T} idx={3} at={K.Q + 0.1} until={K.R - 0.1} texto="La *quitina* de su pared la delata." />
      <SubIt T={T} idx={4} at={K.R + 0.1} until={K.A - 0.1} texto="*Receptores* que la atrapan." />
      <SubIt T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Alarma: *oxígeno reactivo, callosa y quitinasas.*" />
      <SubIt T={T} idx={6} at={K.P + 0.1} until={K.Ef - 0.1} texto="¿Y si el hongo *apaga la alarma?*" />
      <SubIt T={T} idx={7} at={K.Ef + 0.1} until={K.S - 0.1} texto="Con el *gen de resistencia* indicado, los reconoce." />
      <SubIt T={T} idx={8} at={K.S + 0.1} until={K.E - 0.1} texto="Las células atacadas *se matan solas.*" />
      <SubIt T={T} idx={9} at={K.E + 0.1} until={K.M - 0.1} texto="2007, Japón: _Arabidopsis_ *sin CERK1.*" />
      <SubIt T={T} idx={10} at={K.M + 0.1} until={K.As - 0.1} texto="Con _Alternaria:_ manchas *≈20 % más grandes.*" />
      <SubIt T={T} idx={11} at={K.As + 0.1} until={K.C - 0.1} texto="En las hojas sanas sube el *ácido salicílico.*" />
      <SubIt T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu planta, *cerrándole la puerta* al hongo." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.SG + 0.4, K.SG + 3.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.A - 0.4, K.A + 3.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Ef + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.S + 0.0, K.S + 3.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.E + 1.6, K.E + 5.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.As + 0.1, K.As + 4.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="119" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DefensaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><DefensaShot /></CompositionStage></div>;
}
window.DefensaApp = DefensaApp;
window.MiApp = DefensaApp;
