// Shot IA #28 · La IA de sepsis que no vio 2 de cada 3 casos — NARRADO (N2 "El número").
// Datos: Wong et al., JAMA Internal Medicine 181(8):1065-1070 (2021) · OMS, hoja "Sepsis" · Adams et al., Nature Medicine 28:1455-1460 (2022).
// Ver guion.md y verificacion.md. Todo es esquemático y función de T.
const PIEL = '#f1b48f', COBIJA = '#7fb8ff', GRIS = '#b9b3a8';

// Campana de alarma (centrada en 0,0). on: 0..1 la enciende (roja, con ondas).
function Campana({ x, y, s = 1, on = 1, T = 0 }) {
  const w = on > 0.5 ? Math.sin(T * 30) * 10 : 0;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${w})`}>
    {on > 0.5 && [0, 1].map((k) => <g key={k} opacity={0.5 + 0.5 * Math.sin(T * 10 + k)}>
      <path d={`M ${-44 - k * 14} -30 Q ${-58 - k * 14} -4 ${-44 - k * 14} 22`} stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={`M ${44 + k * 14} -30 Q ${58 + k * 14} -4 ${44 + k * 14} 22`} stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" /></g>)}
    <path d="M -28 14 Q -28 -34 0 -36 Q 28 -34 28 14 L 38 26 L -38 26 Z" fill={on > 0.5 ? KC.yellow : '#d8d2c6'} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={34} r={9} fill={KC.ink} />
  </g>;
}
// Cama de hospital con paciente y monitor (el ECG corre). alarma 0..1 prende la luz del monitor.
function Cama({ x, y, s = 1, T = 0, alarma = 0, tinte = 0 }) {
  const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60, ph = (u * 3 + T * 1.2) % 1; let v = 0;
    if (ph > 0.40 && ph < 0.44) v = -40 * Math.sin((ph - 0.40) / 0.04 * Math.PI); else if (ph > 0.44 && ph < 0.47) v = 18 * Math.sin((ph - 0.44) / 0.03 * Math.PI); else if (ph > 0.6 && ph < 0.7) v = -8 * Math.sin((ph - 0.6) / 0.1 * Math.PI);
    pts.push(`${262 + u * 176},${-262 + v}`); }
  const luz = alarma > 0.5 && Math.sin(T * 14) > 0 ? KC.red : (alarma > 0.5 ? '#7a1f1f' : '#5c6470');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* monitor */}
    <line x1={350} y1={60} x2={350} y2={-190} stroke={KC.ink} strokeWidth={10} />
    <rect x={310} y={52} width={80} height={16} rx={6} fill={KC.ink} />
    <rect x={244} y={-340} width={212} height={150} rx={18} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={258} y={-326} width={184} height={122} rx={10} fill="#0d1424" />
    <polyline points={pts.join(' ')} fill="none" stroke={alarma > 0.5 ? KC.red : KC.mint} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={350} cy={-362} r={20} fill={luz} stroke={KC.ink} strokeWidth={6} />
    {alarma > 0.5 && luz === KC.red && <circle cx={350} cy={-362} r={40} fill={KC.red} opacity=".25" />}
    {/* cama */}
    <rect x={-300} y={-150} width={26} height={250} rx={10} fill="#d7dde6" stroke={KC.ink} strokeWidth={7} />
    <rect x={232} y={-70} width={22} height={170} rx={9} fill="#d7dde6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-290} y={-6} width={540} height={46} rx={14} fill="#eef2f7" stroke={KC.ink} strokeWidth={8} />
    <rect x={-280} y={40} width={520} height={18} fill="#9aa6b6" stroke={KC.ink} strokeWidth={6} />
    {[-250, 210].map((lx) => <g key={lx}><line x1={lx} y1={58} x2={lx} y2={100} stroke={KC.ink} strokeWidth={8} /><circle cx={lx} cy={108} r={12} fill={KC.ink} /></g>)}
    {/* paciente */}
    <ellipse cx={-200} cy={-26} rx={70} ry={30} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-190} cy={-62} r={44} fill={mixHex(PIEL, '#e88f7a', tinte)} stroke={KC.ink} strokeWidth={7} />
    <path d="M -218 -100 Q -190 -122 -160 -98" stroke="#3b2a20" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M -206 -58 Q -200 -54 -194 -58 M -182 -58 Q -176 -54 -170 -58" stroke={KC.ink} strokeWidth={4} fill="none" />
    <path d="M -140 -6 Q -140 -64 -60 -60 L 230 -50 Q 250 -24 236 -6 Z" fill={COBIJA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -100 -40 L 220 -32" stroke="#fff" strokeWidth={6} opacity=".6" />
  </g>;
}
// Silueta de paciente. estado: 'neutro' | 'alerta' (campana encendida) | 'perdido' (punteado con "?") | 'estrella'.
function Paciente({ x, y, s = 1, estado = 'neutro', T = 0, o = 1, color }) {
  const perdido = estado === 'perdido', fill = color || (estado === 'alerta' ? KC.coral : perdido ? '#e9e4da' : estado === 'estrella' ? KC.gold2 : '#d8d2c6');
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-62} r={34} fill={fill} stroke={KC.ink} strokeWidth={7} strokeDasharray={perdido ? '12 9' : 'none'} />
    <path d="M -64 48 Q -64 -18 0 -18 Q 64 -18 64 48 Z" fill={fill} stroke={KC.ink} strokeWidth={7} strokeDasharray={perdido ? '12 9' : 'none'} strokeLinejoin="round" />
    {perdido && <text x={0} y={34} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity=".55">?</text>}
    {estado === 'alerta' && <Campana x={0} y={-150} s={0.8} on={1} T={T} />}
    {estado === 'estrella' && <path d="M 0 -170 L 12 -140 L 44 -138 L 19 -118 L 28 -86 L 0 -104 L -28 -86 L -19 -118 L -44 -138 L -12 -140 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" transform="translate(0 30) scale(.8)" />}
  </g>;
}
// Cuerpo esquemático en "rayos X": infección en el brazo, glóbulos blancos que se desbordan, órganos que se dañan.
function Cuerpo({ T, bact = 0, glob = 0, inflama = 0, seed = 7 }) {
  const r = krng(seed), pul = inflama * (0.6 + 0.4 * Math.sin(T * 7));
  const org = (c) => mixHex(c, '#ff1e1e', pul);
  const cel = Array.from({ length: 46 }, () => ({ x: 300 + r() * 220, y: 640 + r() * 400, ph: r() * 6, d: r() }));
  const bac = Array.from({ length: 9 }, () => ({ x: 150 + r() * 70, y: 880 + r() * 60, rot: r() * 180, d: r() }));
  return <g>
    <g fill="rgba(0,210,255,.10)" stroke={KC.cyan} strokeWidth={7} strokeLinejoin="round">
      <circle cx={410} cy={520} r={74} />
      <path d="M 380 590 L 440 590 L 445 625 L 520 640 Q 560 650 560 700 L 560 1010 Q 560 1040 530 1040 L 290 1040 Q 260 1040 260 1010 L 260 700 Q 260 650 300 640 L 375 625 Z" />
      <path d="M 268 660 Q 200 700 180 800 L 150 930 Q 146 960 176 962 Q 196 962 204 930 L 236 830 Q 248 790 262 770" />
      <path d="M 552 660 Q 620 700 640 800 L 668 930 Q 672 960 642 962 Q 622 962 616 930 L 584 830 Q 572 790 558 770" />
      <path d="M 300 1040 L 290 1180 M 520 1040 L 530 1180" />
    </g>
    {/* órganos */}
    <ellipse cx={360} cy={720} rx={52} ry={86} fill={org('#ff9cc0')} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={462} cy={720} rx={52} ry={86} fill={org('#ff9cc0')} stroke={KC.ink} strokeWidth={6} />
    <path d="M 420 760 q -38 -40 -18 -66 q 16 -18 34 2 q 18 -20 34 -2 q 20 26 -18 66 l -16 16 Z" fill={org('#ff4d6d')} stroke={KC.ink} strokeWidth={6} transform={`translate(${-8} ${0}) scale(1)`} />
    <ellipse cx={350} cy={905} rx={30} ry={46} fill={org('#c9744a')} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={470} cy={905} rx={30} ry={46} fill={org('#c9744a')} stroke={KC.ink} strokeWidth={6} />
    <path d="M 340 820 Q 410 800 480 822 Q 470 852 410 846 Q 352 852 340 820 Z" fill={org('#a8573a')} stroke={KC.ink} strokeWidth={6} />
    {/* herida e infección */}
    <path d="M 168 900 l 30 12" stroke={KC.red} strokeWidth={8} strokeLinecap="round" opacity={Math.min(1, bact * 3)} />
    {bac.map((b, i) => b.d < bact && <Bacteria key={i} x={b.x + Math.sin(T * 2 + i) * 6} y={b.y} rot={b.rot + T * 20} s={0.32} color={KC.lilac} T={T} seed={i + 2} />)}
    {/* glóbulos blancos */}
    {cel.map((c, i) => c.d < glob && <g key={i} transform={`translate(${c.x + Math.sin(T * 3 + c.ph) * 10} ${c.y + Math.cos(T * 2.4 + c.ph) * 10})`}>
      <circle r={17} fill="#f8f8ff" stroke={KC.ink} strokeWidth={4} /><path d="M -7 -3 q 4 -8 9 0 q 5 8 -2 9" stroke="#7a4fd6" strokeWidth={5} fill="none" /></g>)}
  </g>;
}
// Regla de calificación (AUC) de 0.5 (azar) a 1.0 (perfecto).
function Regla({ T, at, until, aguja, banda }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), X = (v) => 120 + (v - 0.5) / 0.5 * 840, Y = 860;
  const av = aguja ? klerp(0.5, aguja.valor, kprog(T, aguja.at, aguja.at + 1.2, kEase.sale)) : null, bo = banda ? kprog(T, banda.at, banda.at + 0.5) : 0;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:40, opacity:e.o }}>
    <rect x={X(0.5)} y={Y - 18} width={840} height={36} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {banda && <g opacity={bo}>
      <rect x={X(banda.de)} y={Y - 30} width={X(banda.a) - X(banda.de)} height={60} rx={10} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
      <text x={(X(banda.de) + X(banda.a)) / 2} y={Y - 124} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>lo que decía el fabricante</text>
      <text x={(X(banda.de) + X(banda.a)) / 2} y={Y - 48} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.teal} stroke={KC.ink} strokeWidth={1.5}>0.76–0.83</text>
    </g>}
    {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((v) => <g key={v}><line x1={X(v)} y1={Y + 22} x2={X(v)} y2={Y + 44} stroke={KC.ink} strokeWidth={5} />
      <text x={X(v)} y={Y + 84} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{v.toFixed(1)}</text></g>)}
    <text x={X(0.5)} y={Y + 128} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#6b6358">azar</text>
    <text x={X(1.0)} y={Y + 128} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#6b6358">perfecto</text>
    {aguja && T >= aguja.at && <g transform={`translate(${X(av)} ${Y})`}>
      <path d="M 0 -6 L -26 -64 L 26 -64 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform="rotate(180) translate(0 -10)" />
      <line x1={0} y1={-30} x2={0} y2={30} stroke={KC.red} strokeWidth={8} />
      <text x={0} y={240} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4}>{av.toFixed(2)}</text>
      <text x={0} y={290} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>en la prueba por fuera</text>
    </g>}
  </svg>;
}
// Cama chiquita (para la cuadrícula de alertas). on: alerta encendida.
function Camita({ x, y, on = false, T = 0 }) {
  const c = on ? (Math.sin(T * 12 + x) > -0.3 ? KC.red : '#a82a20') : '#ffffff';
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-32} y={-4} width={64} height={16} rx={5} fill={c} stroke={KC.ink} strokeWidth={4} />
    <rect x={-36} y={-20} width={8} height={40} rx={3} fill={KC.ink} />
    <circle cx={-18} cy={-12} r={8} fill={on ? '#ffd0cc' : PIEL} stroke={KC.ink} strokeWidth={3} />
    <line x1={-30} y1={12} x2={-30} y2={22} stroke={KC.ink} strokeWidth={4} /><line x1={28} y1={12} x2={28} y2={22} stroke={KC.ink} strokeWidth={4} />
    {on && <circle cx={22} cy={-18} r={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Médico que confirma la alerta (palomita) junto a un reloj de "< 3 h".
function Medico({ x, y, s = 1, ok = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 170 Q -90 40 0 40 Q 90 40 90 170 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -20 44 L 0 110 L 20 44" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -50 70 Q -60 130 -20 140 M -20 140 a 12 12 0 1 0 0.1 0" stroke={KC.ink} strokeWidth={6} fill="none" />
    <circle cx={0} cy={-20} r={56} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -52 -36 Q -40 -86 0 -84 Q 44 -86 54 -36 Q 30 -60 -52 -36 Z" fill="#3b2a20" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-20} cy={-16} r={6} fill={KC.ink} /><circle cx={20} cy={-16} r={6} fill={KC.ink} />
    <path d="M -18 10 Q 0 22 18 10" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    {ok > 0 && <g transform={`translate(120 -60) scale(${klerp(1.6, 1, ok)})`} opacity={Math.min(1, ok * 2)}>
      <circle r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
      <path d="M -20 0 L -6 16 L 22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
  </g>;
}
function Reloj({ x, y, s = 1, T = 0, txt = '< 3 h' }) {
  const a = (T * 120) % 360;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={80} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-66} x2={0} y2={-56} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-52} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${a})`} />
    <line x1={0} y1={0} x2={0} y2={-34} stroke={KC.red} strokeWidth={7} strokeLinecap="round" transform={`rotate(${a / 12})`} />
    <circle r={8} fill={KC.ink} />
    <text y={124} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>{txt}</text>
  </g>;
}
// Lupa que revisa algo.
function LupaIcono({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={70} width={28} height={130} rx={12} fill="#6b3f1f" stroke={KC.ink} strokeWidth={7} />
    <circle r={80} fill="rgba(180,230,255,.35)" stroke={KC.ink} strokeWidth={14} />
    <path d="M -40 -30 Q -30 -54 -6 -60" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Sello.
function Sello({ T, x, y, texto, color = KC.leaf, p = 1, rot = -10, tam = 54, until = Infinity }) {
  if (p <= 0 || T > until + 0.4) return null;
  const fuera = 1 - kprog(T, until, until + 0.4);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.0, 1, p)})`, opacity:Math.min(1, p * 2) * fuera,
    border:`8px solid ${color}`, color, borderRadius:20, padding:'8px 28px', font:`400 ${tam}px ${KF.titulo}`, background:'rgba(255,255,255,.88)', whiteSpace:'nowrap', boxShadow:'0 10px 26px rgba(0,0,0,.3)' }}>{texto}</div>;
}
// Texto grande "2 de 3".
function DosDeTres({ T, at, until, x = 800, y = 600, color = KC.red, etiqueta = 'casos sin detectar' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`400 170px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`6px ${KC.ink}`, textShadow:`7px 7px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>2 de 3</div>
    <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, background:'rgba(255,255,255,.9)', border:`4px solid ${KC.ink}`, borderRadius:999, padding:'6px 24px', marginTop:10, display:'inline-block' }}>{etiqueta}</div>
  </div>;
}

function Sepsis() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.Sepsis, E: CUES.Estudio, C: CUES.Calificacion, P: CUES.Pregunta, A: CUES.Alertas, Ta: CUES.Tarde, Co: CUES.Contraste, L: CUES.Leccion, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // tres pacientes del gancho (y del cierre)
  const tres = (t0, cierre) => { const p = (k) => kprog(T, t0 + k * 0.25, t0 + 0.3 + k * 0.25, kEase.sale);
    const roja = cierre ? kprog(T, K.Ci + 1.4, K.Ci + 1.8) : 0;
    return <>
      <g opacity={p(0)}><Paciente x={240} y={1050} s={0.95} estado="alerta" T={T} /></g>
      <g opacity={p(1)}><Paciente x={540} y={1050} s={0.95} estado={roja > 0.5 ? 'neutro' : 'perdido'} color={roja > 0.5 ? KC.red : null} /></g>
      <g opacity={p(2)}><Paciente x={840} y={1050} s={0.95} estado={roja > 0.5 ? 'neutro' : 'perdido'} color={roja > 0.5 ? KC.red : null} /></g>
      {roja > 0.5 && [540, 840].map((px) => <text key={px} x={px} y={900} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={0.6 + 0.4 * Math.sin(T * 8)}>!</text>)}
    </>; };
  const alertN = Math.round(18 * kprog(T, K.A + 0.9, K.A + 2.6, kEase.suave));
  const alertIdx = [3, 17, 22, 28, 34, 41, 46, 53, 59, 62, 68, 71, 77, 84, 88, 90, 95, 99];
  const estN = Math.round(7 * kprog(T, K.Ta + 0.9, K.Ta + 2.2, kEase.suave));
  const estIdx = [8, 23, 37, 44, 61, 75, 92];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cama vigilada y los tres pacientes */}
      <Escena T={T} a={K.G} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cama x={250} y={780} s={0.7} T={T} alarma={T > K.G + 0.4 ? 1 : 0} />
          {T > K.G + 3.6 && tres(K.G + 3.6, false)}
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.5} until={K.G + 3.4} texto="IA en cientos de hospitales" x={330} y={430} tam={36} borde={KC.ink} />
      <DosDeTres T={T} at={K.G + 4.7} until={K.S - 0.2} x={805} y={760} />
      {/* 2 · qué es la sepsis (por dentro del cuerpo) */}
      <Escena T={T} a={K.S} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<Cuerpo T={T} bact={kprog(T, K.S + 0.2, K.S + 1.2)} glob={kprog(T, K.S + 1.4, K.S + 3.4, kEase.suave)} inflama={kprog(T, K.S + 3.0, K.S + 4.2)} />)}
      </Escena>
      <Etq T={T} at={K.S + 0.6} until={K.E - 0.2} x={70} y={1050} texto="infección" color={KC.lilac} />
      <Etq T={T} at={K.S + 1.8} until={K.E - 0.2} x={560} y={760} texto="tu defensa se desborda" tam={27} />
      <Etq T={T} at={K.S + 3.2} until={K.E - 0.2} x={560} y={900} texto="daña tus órganos" color={KC.coral} tam={27} />
      <Chip T={T} at={K.S + 4.6} until={K.E - 0.2} texto="tratarla pronto es clave" x={540} y={1130} tam={38} borde={KC.mint} />
      {/* 3 · el estudio por fuera */}
      <Escena T={T} a={K.E} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 12 }, (_, i) => <g key={i} opacity={kprog(T, K.E + 2.2 + i * 0.12, K.E + 2.5 + i * 0.12)}><Camita x={150 + (i % 6) * 156} y={1080 + Math.floor(i / 6) * 56} T={T} /></g>)}</>)}
      </Escena>
      <Chip T={T} at={K.E + 0.3} until={K.C - 0.2} texto="prueba por fuera" x={330} y={400} tam={38} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.E + 0.5} until={K.C - 0.3} anio="2021" quien="Universidad de Michigan" revista="Wong et al. · JAMA Internal Medicine" x={400} y={660} />
      {T < K.C + 0.3 && <div style={{ opacity:1 - kprog(T, K.C - 0.2, K.C + 0.3) }}><Contador T={T} at={K.E + 2.2} hasta={38455} dur={1.8} x={540} y={940} tam={76} color={KC.ink} /></div>}
      {T > K.E + 2.2 && T < K.C + 0.3 && <div style={{ position:'absolute', left:0, right:0, top:985, textAlign:'center', zIndex:41, opacity:kprog(T, K.E + 2.4, K.E + 2.8) * (1 - kprog(T, K.C - 0.2, K.C + 0.3)), font:`900 38px ${KF.texto}`, color:KC.ink }}>hospitalizaciones revisadas</div>}
      {/* 4 · la calificación */}
      <Escena T={T} a={K.C} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      <Chip T={T} at={K.C + 0.2} until={K.C + 4.3} texto="calificación para detectar sepsis" x={540} y={460} tam={36} borde={KC.ink} />
      <Regla T={T} at={K.C + 0.3} until={K.P - 0.2} aguja={{ at: K.C + 0.6, valor: 0.63 }} banda={{ at: K.C + 3.6, de: 0.76, a: 0.83 }} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.A} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>
          <Campana x={150} y={500} s={1.1} on={1} T={T} /><Campana x={430} y={420} s={0.9} on={1} T={T + 0.3} />
        </>)}
      </Escena>
      {/* 6 · alertas de más */}
      <Escena T={T} a={K.A} b={K.Ta}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{Array.from({ length: 100 }, (_, i) => <Camita key={i} x={130 + (i % 10) * 92} y={690 + Math.floor(i / 10) * 50} on={alertIdx.indexOf(i) > -1 && alertIdx.indexOf(i) < alertN} T={T} />)}</>)}
      </Escena>
      <Chip T={T} at={K.A + 0.9} until={K.A + 3.1} texto={`${alertN} de cada 100 hospitalizados`} x={390} y={450} tam={36} borde={KC.red} />
      <Chip T={T} at={K.A + 3.2} until={K.Ta - 0.2} texto="fatiga de alertas" x={360} y={450} tam={46} borde={KC.red} />
      <Chip T={T} at={K.A + 3.6} until={K.Ta - 0.2} texto="tantas alarmas cansan" x={360} y={560} tam={30} borde={KC.ink} />
      {/* 7 · solo 7 de cada 100 */}
      <Escena T={T} a={K.Ta} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{Array.from({ length: 100 }, (_, i) => { const on = estIdx.indexOf(i) > -1 && estIdx.indexOf(i) < estN;
          return <Paciente key={i} x={135 + (i % 10) * 90} y={720 + Math.floor(i / 10) * 46} s={0.32} estado={on ? 'estrella' : 'neutro'} o={on ? 1 : 0.55} />; })}</>)}
      </Escena>
      <Chip T={T} at={K.Ta + 0.4} until={K.Co - 0.2} texto="100 casos de sepsis" x={330} y={440} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ta + 1.0} until={K.Co - 0.2} texto={`${estN} sin antibiótico a tiempo`} x={360} y={550} tam={34} borde={KC.gold} />
      {/* 8 · contraste: TREWS */}
      <Escena T={T} a={K.Co} b={K.L}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={kprog(T, K.Co + 2.2, K.Co + 2.6)}><Reloj x={200} y={960} s={0.95} T={T} /></g>
          <g opacity={kprog(T, K.Co + 3.0, K.Co + 3.4)}><Medico x={540} y={940} s={0.95} ok={kprog(T, K.Co + 3.8, K.Co + 4.2, kEase.sale)} T={T} /></g>
          <g opacity={kprog(T, K.Co + 4.6, K.Co + 5.0)} transform={`translate(860 ${930 + 30 * kprog(T, K.Co + 4.6, K.Co + 5.6, kEase.sale)})`}>
            <path d="M -36 -110 L 36 -110 L 36 10 L 80 10 L 0 100 L -80 10 L -36 10 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          </g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Co + 0.3} until={K.L - 0.3} anio="2022" quien="Johns Hopkins · TREWS" revista="Adams et al. · Nature Medicine" x={380} y={560} />
      <Chip T={T} at={K.Co + 4.8} until={K.L - 0.2} texto="menos muertes (asociación)" x={760} y={1150} tam={30} borde={KC.leaf} />
      <Sello T={T} until={K.L - 0.2} x={380} y={770} texto="estudio de sus creadores" color={KC.red} tam={46} p={kprog(T, K.Co + 6.6, K.Co + 7.0, kEase.sale)} rot={-4} />
      {/* 9 · la lección */}
      <Escena T={T} a={K.L} b={K.Ci}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Robotito x={600} y={860} s={1.15} T={T} cara="seguro" />
          <g opacity={kprog(T, K.L + 0.8, K.L + 1.2)}><LupaIcono x={klerp(980, 700, kprog(T, K.L + 0.8, K.L + 2.2, kEase.suave))} y={800} s={0.9} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.L + 0.3} until={K.Ci - 0.2} texto="«según quien la vende»" x={600} y={1110} tam={34} borde={KC.ink} />
      <Sello T={T} until={K.Ci - 0.2} x={600} y={640} texto="probada por fuera ✔" p={kprog(T, K.L + 2.4, K.L + 2.8, kEase.sale)} />
      {/* 10 · cierre: la misma cama y los mismos tres */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cama x={250} y={780} s={0.7} T={T} alarma={1} />
          {tres(K.Ci - 1, true)}
        </>)}
      </Escena>
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="2 de cada 3, sin aviso" x={330} y={430} tam={36} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.S - 0.1} texto="No vio *2 de cada 3* casos" />
      <Subtitulo T={T} idx={1} at={K.S + 0.1} until={K.E - 0.1} texto="Tu defensa *daña tus órganos*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.C - 0.1} texto="Michigan, 2021: *por fuera*" />
      <Subtitulo T={T} idx={3} at={K.C + 0.1} until={K.P - 0.1} texto="Sacó *0.63*. Decían *0.83*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.A - 0.1} texto="¿Avisar de más *es mejor?*" />
      <Subtitulo T={T} idx={5} at={K.A + 0.1} until={K.Ta - 0.1} texto="Tantas alarmas *cansan*" />
      <Subtitulo T={T} idx={6} at={K.Ta + 0.1} until={K.Co - 0.1} texto="Solo *7 de cada 100*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.L - 0.1} texto="¿Quién *lo midió?*" />
      <Subtitulo T={T} idx={8} at={K.L + 0.1} until={K.Ci - 0.1} texto="Pruébala *por fuera*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Así *no te cuida*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Sepsis + 2.0, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Calificacion - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Calificacion + 4.5, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Alertas + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Alertas + 3.5, CUES.Tarde - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Tarde + 2.2, CUES.Contraste - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Contraste + 6.6, CUES.Leccion - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Leccion + 0.4, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="28" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SepsisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Sepsis /></CompositionStage></div>;
}
window.SepsisApp = SepsisApp;
