// Shot IA #49 · ELIZA: el "psicólogo" de unas cuantas reglas — NARRADO (N1 "Por dentro" + N6 "Guía en pasos").
// Datos: Weizenbaum, Communications of the ACM 9(1):36–45 (1966); Weizenbaum, Computer Power and Human Reason (1976);
// Hofstadter (1995); Lane et al., arXiv:2501.06707 (2025). Ver guion.md y verificacion.md.
// ELIZA se usaba con máquina de escribir / teletipo que imprimía en papel (tinta negra), no con pantalla.
const TINTA = '#1b1a17', PAPEL = '#fffdf2', CREMA = '#e9dcbc', CREMA2 = '#d4c39b', TRAJE = '#2b3a8a';

// Teletipo de los 60: cuerpo crema, rodillo, teclado redondo y papel continuo que sale por arriba con tinta negra.
// papel = alto del papel (px), lineas = [{ t, may }] (may = respuesta de la máquina en MAYÚSCULAS), barras = renglones sin texto.
function Teletipo({ x, y, s = 1, T = 0, papel = 160, lineas = [], barras = 0, tam = 22, ancho = 360 }) {
  const w = ancho / 2, top = -70 - papel, r = krng(7);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {papel > 0 && <g>
      <rect x={-w} y={top} width={ancho} height={papel + 10} fill={PAPEL} stroke={KC.ink} strokeWidth={6} />
      {[0, 1].map((k) => Array.from({ length: Math.floor(papel / 34) }, (_, i) => <circle key={`${k}-${i}`} cx={k ? w - 16 : -w + 16} cy={top + 20 + i * 34} r={6} fill="#d9d0bb" />))}
      {lineas.map((l, i) => <text key={i} x={-w + 38} y={top + 40 + i * tam * 1.55} style={{ font:`700 ${tam}px ${KF.mono}` }} fill={TINTA}>{l.may ? l.t.toUpperCase() : l.t}</text>)}
      {Array.from({ length: barras }, (_, i) => <rect key={'b' + i} x={-w + 38} y={top + 28 + i * 26} width={(ancho - 90) * (0.45 + r() * 0.55)} height={9} rx={3} fill={TINTA} opacity={i % 2 ? 0.8 : 0.45} />)}
    </g>}
    <rect x={-w - 40} y={-80} width={ancho + 80} height={34} rx={14} fill="#3a3632" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-w - 52} cy={-63} r={18} fill={CREMA2} stroke={KC.ink} strokeWidth={6} /><circle cx={w + 52} cy={-63} r={18} fill={CREMA2} stroke={KC.ink} strokeWidth={6} />
    <rect x={-w - 70} y={-50} width={ancho + 140} height={140} rx={30} fill={CREMA} stroke={KC.ink} strokeWidth={8} />
    <rect x={-w - 30} y={-28} width={120} height={18} rx={6} fill={CREMA2} />
    <path d={`M ${-w - 80} 90 L ${w + 80} 90 L ${w + 110} 190 L ${-w - 110} 190 Z`} fill={CREMA2} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[0, 1, 2].map((fi) => Array.from({ length: 9 - fi }, (_, k) => { const n = 9 - fi, kx = (k - (n - 1) / 2) * ((ancho + 120) / 9.5);
      const baja = Math.sin(T * 14 + k * 1.7 + fi) > 0.93 ? 3 : 0;
      return <circle key={`${fi}-${k}`} cx={kx} cy={115 + fi * 28 + baja} r={11} fill="#2b2826" stroke="#000" strokeWidth={2} />; }))}
  </g>;
}

// Diván con una persona acostada (silueta neutra) que cuenta sus cosas.
function Divan({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 1.6) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -290 -40 Q -300 -150 -230 -150 Q -190 -150 -190 -90 L -190 -40 Z" fill="#b5542c" stroke={KC.ink} strokeWidth={8} />
    <rect x={-290} y={-50} width={540} height={80} rx={26} fill="#c9663a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-270} y={30} width={22} height={50} fill={KC.ink} /><rect x={210} y={30} width={22} height={50} fill={KC.ink} />
    <g transform={`translate(0 ${b})`}>
      <rect x={-170} y={-118} width={300} height={74} rx={34} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
      <rect x={110} y={-104} width={130} height={48} rx={22} fill="#3a4a6b" stroke={KC.ink} strokeWidth={7} />
      <circle cx={-205} cy={-112} r={44} fill="#e8a77f" stroke={KC.ink} strokeWidth={7} />
      <path d="M -248 -120 Q -240 -165 -195 -158 Q -165 -150 -170 -125 Q -200 -140 -248 -120 Z" fill="#3b2a20" stroke={KC.ink} strokeWidth={5} />
      <path d="M -120 -110 Q -150 -190 -100 -210" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" fill="none" />
      <path d="M -120 -110 Q -150 -190 -100 -210" stroke="#e8a77f" strokeWidth={14} strokeLinecap="round" fill="none" />
    </g>
  </g>;
}

// El "psicólogo": traje y libreta en un sillón… con un teletipo por cabeza. traje 0..1 (en el cierre se desvanece y quedan las reglas).
function Psicologo({ x, y, s = 1, T = 0, traje = 1, reglas = 0 }) {
  const lad = Math.sin(T * 1.3) * 2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g opacity={traje}>
      <rect x={-120} y={-240} width={240} height={280} rx={40} fill="#7a3b5a" stroke={KC.ink} strokeWidth={8} />
      <rect x={-150} y={20} width={300} height={80} rx={26} fill="#8f4a6c" stroke={KC.ink} strokeWidth={8} />
      <rect x={-130} y={95} width={20} height={70} fill={KC.ink} /><rect x={110} y={95} width={20} height={70} fill={KC.ink} />
      <path d="M -85 -150 Q -90 -175 -40 -180 L 40 -180 Q 90 -175 85 -150 L 75 40 L -75 40 Z" fill={TRAJE} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -30 -180 L 0 -110 L 30 -180 Z" fill={KC.white} stroke={KC.ink} strokeWidth={5} />
      <path d="M 0 -165 L -12 -140 L 0 -80 L 12 -140 Z" fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <rect x={-60} y={20} width={190} height={52} rx={22} fill={TRAJE} stroke={KC.ink} strokeWidth={7} />
      <rect x={100} y={40} width={50} height={140} rx={20} fill={TRAJE} stroke={KC.ink} strokeWidth={7} />
      <path d="M 95 175 L 175 175 Q 185 195 165 200 L 95 200 Z" fill={KC.ink} />
      <g transform={`rotate(${-12 + lad} 40 -40)`}>
        <rect x={10} y={-90} width={110} height={140} rx={8} fill={PAPEL} stroke={KC.ink} strokeWidth={6} />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={25} y1={-60 + k * 26} x2={100} y2={-60 + k * 26} stroke={TINTA} strokeWidth={4} opacity=".5" />)}
      </g>
      <path d="M -70 -140 Q -110 -60 -10 -20" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M -70 -140 Q -110 -60 -10 -20" stroke={TRAJE} strokeWidth={22} fill="none" strokeLinecap="round" />
      <rect x={-14} y={-205} width={28} height={30} fill="#d9c9a3" stroke={KC.ink} strokeWidth={5} />
      <Teletipo x={0} y={-236} s={0.34} T={T} papel={150} barras={4} ancho={340} />
    </g>
    {reglas > 0 && [
      ['SI «mi» → «tu»', -330, -260, -6], ['SI «triste» → «SIENTO…»', -300, -130, 4], ['SI nada → «SIGA, POR FAVOR»', -400, 0, -3]].map(([t, cx, cy, rot], i) => {
      const e = kprog(reglas, i * 0.2, i * 0.2 + 0.5, kEase.sale);
      return <g key={i} transform={`translate(${cx} ${cy + (1 - e) * 60}) rotate(${rot})`} opacity={e}>
        <rect x={0} y={-36} width={t.length * 17 + 40} height={64} rx={12} fill={PAPEL} stroke={KC.ink} strokeWidth={6} />
        <text x={20} y={8} style={{ font:`700 28px ${KF.mono}` }} fill={TINTA}>{t}</text>
      </g>; })}
  </g>;
}

// Corazón y candado (los secretos que la gente le contaba).
function Corazon({ x, y, s = 1, o = 1, color = KC.pink }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o} d="M 0 18 C -40 -10 -30 -42 -8 -38 C 0 -36 0 -30 0 -26 C 0 -30 0 -36 8 -38 C 30 -42 40 -10 0 18 Z" fill={color} stroke={KC.ink} strokeWidth={4} />;
}
function Candado({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -16 -6 L -16 -22 Q 0 -44 16 -22 L 16 -6" stroke={KC.ink} strokeWidth={7} fill="none" />
    <rect x={-24} y={-8} width={48} height={38} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={9} r={5} fill={KC.ink} />
  </g>;
}
// Secretos que viajan en arco de (x0,y0) a (x1,y1).
function Secretos({ T, x0, y0, x1, y1, n = 6, vel = 0.32, alto = 220, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, k) => { const u = (T * vel + k / n) % 1;
    const px = klerp(x0, x1, u), py = klerp(y0, y1, u) - Math.sin(Math.PI * u) * alto, a = Math.sin(Math.PI * u);
    return k % 3 === 2 ? <Candado key={k} x={px} y={py} s={0.9} o={a} /> : <Corazon key={k} x={px} y={py} s={1.1} o={a} color={k % 2 ? KC.pink : KC.red} />; })}</g>;
}

// Escena del consultorio (gancho y cierre).
function Consultorio({ T, traje = 1, reglas = 0, secretos = 1 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={1180} width={KW} height={740} fill="#7fd9b8" />
    <line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={8} />
    <Divan x={330} y={1120} s={1} T={T} />
    <Psicologo x={790} y={1000} s={0.95} T={T} traje={traje} reglas={reglas} />
    <Secretos T={T} x0={150} y0={960} x1={780} y1={720} o={secretos} />
  </svg>;
}

// Hoja de teletipo (HTML) con el diálogo real del artículo de 1966, que se escribe letra por letra.
function HojaDialogo({ T, at, until, lineas, x = 150, y = 650, ancho = 780, tam = 34, resalta = [] }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:30, opacity:e.o, transform:`translateY(${e.y}px)`,
    boxSizing:'border-box', background:PAPEL, border:`6px solid ${KC.ink}`, borderRadius:6, padding:'22px 64px 26px', boxShadow:`12px 12px 0 ${KC.ink}`,
    backgroundImage:'radial-gradient(circle, #d9d0bb 7px, transparent 8px), radial-gradient(circle, #d9d0bb 7px, transparent 8px)',
    backgroundSize:'34px 34px, 34px 34px', backgroundPosition:'6px 10px, calc(100% - 6px) 10px', backgroundRepeat:'repeat-y, repeat-y' }}>
    {lineas.map((l, i) => { if (T < l.at) return null;
      const n = Math.floor(l.t.length * kprog(T, l.at, l.at + Math.min(0.9, l.t.length * 0.03)));
      const res = resalta.includes(i) && T > l.at + 0.6;
      return <div key={i} style={{ font:`700 ${tam}px/1.3 ${KF.mono}`, color:TINTA, marginBottom:10, whiteSpace:'pre-wrap',
        background: res ? 'rgba(255,225,26,.75)' : 'transparent', borderRadius:6, padding:'0 6px', marginLeft:-6 }}>{l.t.slice(0, n)}{n < l.t.length ? '▌' : ''}</div>; })}
  </div>;
}

// Bote (ejemplo del barco).
function Bote({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2.2) * 8, r = Math.sin(T * 1.7) * 4;
  return <g transform={`translate(${x} ${y + b}) rotate(${r}) scale(${s})`}>
    <path d="M -120 0 L 120 0 L 80 60 L -80 60 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={0} y1={0} x2={0} y2={-150} stroke={KC.ink} strokeWidth={7} />
    <path d="M 6 -145 L 90 -20 L 6 -20 Z" fill={KC.white} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -150 70 q 25 -18 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" stroke={KC.blue} strokeWidth={7} fill="none" />
  </g>;
}
// Burbuja de diálogo (HTML).
function Burbuja({ T, at, until, texto, x, y, ancho = 520, lado = 'izq', fondo = KC.white, tam = 40, cursiva = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:40, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o }}>
    <div style={{ position:'relative', background:fondo, border:`6px solid ${KC.ink}`, borderRadius:30, padding:'18px 28px', font:`${cursiva ? 'italic ' : ''}900 ${tam}px/1.2 ${KF.texto}`, color:KC.ink, boxShadow:`8px 8px 0 ${KC.ink}`, textAlign:'center' }}>
      {texto}
      <div style={{ position:'absolute', bottom:-30, [lado === 'izq' ? 'left' : 'right']:60, width:0, height:0, borderLeft:'22px solid transparent', borderRight:'22px solid transparent', borderTop:`32px solid ${KC.ink}` }}></div>
    </div>
  </div>;
}

// Oficina de los 60 (siluetas): ella teclea en el teletipo; él (Weizenbaum, caricatura sin rasgos) junto a la puerta.
function Oficina({ T, K }) {
  const sale = kprog(T, K.S + 4.0, K.S + 5.0, kEase.suave), puerta = kprog(T, K.S + 4.7, K.S + 5.4, kEase.sale);
  const teclea = Math.sin(T * 18) > 0 ? 4 : 0;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={0} width={KW} height={1180} fill="#f6e3b0" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={i * 96} y1={0} x2={i * 96} y2={1180} stroke="#e9cf8d" strokeWidth={10} />)}
    <rect x={0} y={1180} width={KW} height={740} fill="#9c6b45" />
    <line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={8} />
    {/* puerta */}
    <rect x={860} y={700} width={220} height={480} fill="#3a2a20" stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(860 700) scale(${klerp(0.25, 1, puerta)} 1)`}>
      <rect x={0} y={0} width={220} height={480} fill="#b77a4a" stroke={KC.ink} strokeWidth={8} />
      <circle cx={190} cy={250} r={12} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    </g>
    {/* escritorio + teletipo */}
    <rect x={90} y={1000} width={560} height={40} rx={8} fill="#7a4f30" stroke={KC.ink} strokeWidth={8} />
    <rect x={120} y={1040} width={30} height={140} fill={KC.ink} /><rect x={590} y={1040} width={30} height={140} fill={KC.ink} />
    <Teletipo x={420} y={880} s={0.55} T={T * 1.4} papel={170} barras={5} ancho={340} />
    {/* ella: cabello recogido, suéter morado, de espaldas-perfil */}
    <g transform={`translate(190 ${880 + teclea * 0})`}>
      <rect x={-40} y={60} width={110} height={60} rx={14} fill="#5b4636" stroke={KC.ink} strokeWidth={6} />
      <rect x={20} y={110} width={20} height={190} fill={KC.ink} />
      <path d="M -50 -40 Q -60 -90 0 -95 Q 60 -90 55 -40 L 50 70 L -45 70 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
      <path d={`M 40 -60 Q 110 -40 150 ${-10 + teclea}`} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" fill="none" />
      <path d={`M 40 -60 Q 110 -40 150 ${-10 + teclea}`} stroke={KC.lilac} strokeWidth={18} strokeLinecap="round" fill="none" />
      <circle cx={6} cy={-140} r={46} fill="#c98f6a" stroke={KC.ink} strokeWidth={7} />
      <path d="M -40 -150 Q -30 -195 15 -188 Q 50 -180 50 -150 Q 20 -170 -40 -150 Z" fill="#8a4b2a" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-38} cy={-170} r={24} fill="#8a4b2a" stroke={KC.ink} strokeWidth={5} />
    </g>
    {/* él: saco gris, lentes, bigote (caricatura) */}
    <g transform={`translate(${klerp(760, 990, sale)} 900)`} opacity={1 - sale}>
      <rect x={-34} y={110} width={26} height={170} fill="#3b3b44" stroke={KC.ink} strokeWidth={5} />
      <rect x={8} y={110} width={26} height={170} fill="#3b3b44" stroke={KC.ink} strokeWidth={5} />
      <path d="M -60 -60 Q -60 -95 0 -98 Q 60 -95 60 -60 L 55 120 L -55 120 Z" fill="#8c8f99" stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-145} r={46} fill="#e8b48f" stroke={KC.ink} strokeWidth={7} />
      <path d="M -44 -160 Q -40 -200 0 -196 Q 42 -200 44 -160 Q 20 -178 -44 -160 Z" fill="#2b2b2b" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-17} cy={-148} r={13} fill="none" stroke={KC.ink} strokeWidth={5} /><circle cx={17} cy={-148} r={13} fill="none" stroke={KC.ink} strokeWidth={5} />
      <path d="M -18 -124 Q 0 -114 18 -124" stroke="#2b2b2b" strokeWidth={8} strokeLinecap="round" fill="none" />
    </g>
  </svg>;
}

// Calendario que pasa hojas ("por meses").
function Calendario({ T, at, x, y, s = 1 }) {
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO'], i = Math.min(meses.length - 1, Math.max(0, Math.floor((T - at) * 3.2)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-80} width={180} height={170} rx={16} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-80} width={180} height={52} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={50} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{meses[i]}</text>
  </g>;
}

// Lluvia de "¡espía!": burbujas rojas que aparecen alrededor.
const ESPIA = [[620, 640, -8], [880, 760, 6], [420, 860, -4], [760, 960, 8], [240, 760, 5], [930, 1080, -6], [560, 1110, 3], [300, 1000, -7]];

// Letras (símbolos) que forman un corazón (efecto ELIZA).
function LetrasCorazon({ T, at, cx = 400, cy = 880, R = 17, n = 46 }) {
  const r = krng(11), letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?!.,;:'.split('');
  const g = kprog(T, at, at + 1.6, kEase.suave);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: n }, (_, i) => { const th = (i / n) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(th), 3), hy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th));
      const sx = 80 + r() * 920, sy = 520 + r() * 680, l = letras[Math.floor(r() * letras.length)];
      const px = klerp(sx + Math.sin(T * 0.8 + i) * 18, cx + hx * R, g), py = klerp(sy + Math.cos(T * 0.7 + i) * 18, cy + hy * R, g);
      return <text key={i} x={px} y={py} textAnchor="middle" style={{ font:`700 ${42 + (i % 3) * 8}px ${KF.mono}` }} fill={g > 0.95 ? KC.pink : KC.texto} opacity={0.9}>{l}</text>; })}
  </svg>;
}

// Papel continuo (fan-fold) que sale de una caja de archivo.
function CajaArchivo({ T, K }) {
  const sube = kprog(T, K.C + 0.4, K.C + 2.6, kEase.sale), n = 4, alto = 110;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: n }, (_, i) => { const v = kclamp(sube * n - i, 0, 1); if (v <= 0) return null;
      const yb = 1010 - i * alto * 0.92, sk = i % 2 ? 14 : -14;
      return <g key={i} opacity={v} transform={`translate(600 ${yb + (1 - v) * 60})`}>
        <path d={`M ${-200 + sk} ${-alto} L ${200 + sk} ${-alto} L ${200 - sk} 0 L ${-200 - sk} 0 Z`} fill={i % 2 ? '#f1f7ea' : PAPEL} stroke={KC.ink} strokeWidth={5} />
        {[-1, 1].map((sd) => [0.2, 0.5, 0.8].map((f) => <circle key={`${sd}${f}`} cx={sd * 178 + sk * (1 - 2 * f)} cy={-alto * f} r={6} fill="#d9d0bb" />))}
        {[0.25, 0.5, 0.75].map((f, k) => <rect key={k} x={-150 + sk * (1 - 2 * f)} y={-alto * f - 5} width={120 + ((i * 3 + k) * 37) % 150} height={10} rx={3} fill={TINTA} opacity=".75" />)}
      </g>; })}
    <path d="M 360 1020 L 840 1020 L 820 1190 L 380 1190 Z" fill="#c8a06a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={340} y={990} width={520} height={50} rx={8} fill="#b38a55" stroke={KC.ink} strokeWidth={8} />
    <rect x={470} y={1070} width={260} height={80} rx={8} fill={PAPEL} stroke={KC.ink} strokeWidth={5} />
    <text x={600} y={1104} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={TINTA}>ARCHIVO MIT</text>
    <text x={600} y={1136} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={TINTA}>papeles de Weizenbaum</text>
  </svg>;
}

// Sello rojo.
function Sello({ T, at, until, texto, x, y, rot = -10, tam = 64 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const e = kprog(T, at, at + 0.35, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, e)})`, opacity:Math.min(1, e * 2) * (until != null ? 1 - kprog(T, until, until + 0.35) : 1),
    border:`9px solid ${KC.red}`, borderRadius:18, padding:'6px 26px', font:`400 ${tam}px ${KF.titulo}`, color:KC.red, background:'rgba(255,59,47,.1)', whiteSpace:'nowrap' }}>{texto}</div>;
}

function Eliza() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Dialogo, R: CUES.Reglas, E: CUES.Estudio, P: CUES.Pregunta, S: CUES.Secretaria, Es: CUES.Espiar, Ef: CUES.Efecto, C: CUES.Codigo, H: CUES.Hoy, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const R2 = K.R + 4.4; // segunda línea de "Reglas" (deprimida)
  // pasos del truco
  const p1 = K.R + 0.2, p2 = K.R + 1.7, p3 = K.R + 3.1;
  const cambia = kprog(T, p2 + 0.3, p2 + 0.8, kEase.sale);
  const fichas = [['mi', 'tu'], ['novio'], ['me', 'te'], ['hizo'], ['venir'], ['aquí']];
  const fx = [250, 450, 690, 330, 560, 780], fy = [860, 860, 860, 990, 990, 990];
  const junta = kprog(T, p3 + 0.2, p3 + 1.0, kEase.suave);
  const cae = kprog(T, R2 + 1.4, R2 + 2.1, kEase.rebote);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el psicólogo con cabeza de teletipo */}
      <Escena T={T} a={K.G} b={K.D}>
        <FondoLunares color={KC.mint} />
        <Consultorio T={T} />
      </Escena>
      {/* rayos X: adentro solo hay reglas */}
      {kvisible(T, K.G + 1.6, K.D - 0.3) && (() => { const e = kentrada(T, K.G + 1.6, K.D - 0.3, 'pop');
        return <div style={{ position:'absolute', left:60, top:470, width:500, zIndex:35, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'90% 100%' }}>
          <div style={{ background:KC.noche, border:`7px solid ${KC.white}`, borderRadius:30, padding:'18px 22px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
            <div style={{ font:`900 28px ${KF.texto}`, color:KC.cyan, marginBottom:10 }}>RAYOS X · ADENTRO:</div>
            {['SI «mi» → «tu»', 'SI «triste» → «SIENTO…»', 'SI nada → «SIGA»'].map((t, i) => <div key={i} style={{ opacity:kprog(T, K.G + 2.0 + i * 0.35, K.G + 2.3 + i * 0.35), font:`700 30px ${KF.mono}`, color:TINTA, background:PAPEL, borderRadius:10, padding:'6px 14px', marginBottom:10, border:`4px solid ${KC.ink}` }}>{t}</div>)}
          </div>
        </div>; })()}

      {/* 1 · diálogo real (1966, traducido) en papel de teletipo */}
      <Escena T={T} a={K.D} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<Teletipo x={540} y={1100} s={0.8} T={T} papel={0} ancho={640} />)}
      </Escena>
      <Chip T={T} at={K.D + 0.2} until={K.R - 0.2} texto="diálogo real · artículo de 1966 (traducido)" x={650} y={600} tam={30} borde={KC.ink} />
      <HojaDialogo T={T} at={K.D} until={K.R - 0.2} x={170} y={670} ancho={800} tam={31} resalta={[4, 5]} lineas={[
        { at: K.D + 0.2, t: 'Los hombres son todos iguales.' },
        { at: K.D + 0.9, t: 'EN QUÉ SENTIDO' },
        { at: K.D + 1.4, t: 'Siempre nos andan molestando por algo.' },
        { at: K.D + 2.1, t: 'PUEDES PENSAR EN UN EJEMPLO' },
        { at: K.D + 2.6, t: 'Pues, mi novio me hizo venir aquí.' },
        { at: K.D + 3.8, t: 'TU NOVIO TE HIZO VENIR AQUÍ' }]} />

      {/* 2 · el truco en 3 pasos (por dentro de la máquina) */}
      <Escena T={T} a={K.R} b={K.E}>
        <FondoCircuito T={T} />
        {svg(<>
          {T < R2 + 0.2 && fichas.map((f, i) => { const tiene = f.length > 1, brilla = tiene && T > p1 + 0.4;
            const tx = klerp(fx[i], 220 + i * 128, junta), ty = klerp(fy[i], 1070, junta);
            const flip = tiene ? Math.abs(Math.cos(Math.PI * cambia)) : 1;
            const txt = tiene && cambia > 0.5 ? f[1] : f[0];
            return <g key={i} transform={`translate(${tx} ${ty}) scale(${flip} 1)`}><Ficha x={0} y={0} texto={txt} tam={junta > 0.5 ? 34 : 50} color={brilla ? KC.yellow : '#e8edf5'} /></g>; })}
          {junta > 0.9 && T < R2 + 0.2 && <text x={540} y={960} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.cyan}>↓ te regresa tu frase ↓</text>}
        </>)}
      </Escena>
      <Pasos T={T} y={400} hasta={R2 - 0.1} pasos={[{ at: p1, texto: 'busca palabras clave' }, { at: p2, texto: 'cambia «mi» → «tu» y «me» → «te»' }, { at: p3, texto: 'te regresa tu propia frase' }]} total={3} />
      {kvisible(T, R2, K.E - 0.2) && (() => { const e = kentrada(T, R2, K.E - 0.2, 'pop');
        return <div style={{ position:'absolute', left:70, right:70, top:700, zIndex:40, opacity:e.o, transform:`scale(${e.s})` }}>
          <div style={{ background:PAPEL, border:`7px solid ${KC.ink}`, borderRadius:24, padding:'20px 30px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
            <div style={{ font:`900 30px ${KF.texto}`, color:'#7a6f5f' }}>REGLA DEL GUION «DOCTOR» (traducida)</div>
            <div style={{ font:`700 36px/1.35 ${KF.mono}`, color:TINTA, marginTop:10 }}>SI: … estás (triste · infeliz · <span style={{ background: cae > 0.2 ? KC.yellow : 'transparent' }}>deprimida</span> · enferma) …</div>
            <div style={{ font:`700 36px/1.35 ${KF.mono}`, color:TINTA, marginTop:6 }}>→ SIENTO OÍR QUE ESTÁS <span style={{ display:'inline-block', minWidth:250, borderBottom:`5px solid ${TINTA}`, background: cae > 0.5 ? KC.yellow : 'transparent', transform:`translateY(${(1 - cae) * -80}px)`, opacity: cae > 0.05 ? 1 : 0.0 }}>DEPRIMIDA</span></div>
          </div>
        </div>; })()}
      <HojaDialogo T={T} at={R2 + 2.2} until={K.E - 0.2} x={110} y={1000} ancho={860} tam={27} lineas={[
        { at: R2 + 2.3, t: 'Dice que estoy deprimida casi todo el tiempo.' },
        { at: R2 + 3.0, t: 'SIENTO OÍR QUE ESTÁS DEPRIMIDA' }]} />

      {/* 3 · quién y cuándo */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<g opacity={kprog(T, K.E + 3.0, K.E + 3.4)}><Bote x={850} y={1080} s={0.75} T={T} /></g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="1966" quien="ELIZA · Joseph Weizenbaum · MIT" revista="Communications of the ACM, vol. 9, núm. 1" y={700} />
      <Chip T={T} at={K.E + 3.0} until={K.P - 0.2} texto="así respondería un psiquiatra, según Weizenbaum:" x={540} y={720} tam={30} borde={KC.ink} />
      <Burbuja T={T} at={K.E + 3.3} until={K.P - 0.2} texto="«Me fui a dar un paseo en barco.»" x={430} y={850} ancho={640} lado="izq" tam={38} />
      <Burbuja T={T} at={K.E + 4.1} until={K.P - 0.2} texto="«Háblame de barcos.»" x={420} y={1040} ancho={460} lado="der" fondo={KC.yellow} tam={42} />

      {/* 4 · re-gancho */}
      <Escena T={T} a={K.P} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Teletipo x={280} y={1080} s={0.6} T={T} papel={120} barras={3} ancho={340} />
          <text x={280} y={860} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 700)`}>?</text>
        </>)}
      </Escena>

      {/* 5 · la secretaria */}
      <Escena T={T} a={K.S} b={K.Es}>
        <Oficina T={T} K={K} />
        {svg(<g opacity={kprog(T, K.S + 0.3, K.S + 0.6) * (1 - kprog(T, K.S + 2.6, K.S + 2.9))}><Calendario T={T} at={K.S + 0.3} x={880} y={500} s={1.2} /></g>)}
      </Escena>
      <Chip T={T} at={K.S + 0.4} until={K.S + 2.6} texto="lo vio programarla por meses" x={420} y={500} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.S + 2.9} until={K.Es - 0.2} texto="a los pocos mensajes…" x={360} y={690} tam={38} borde={KC.ink} />

      {/* 6 · lo acusaron de espiar */}
      <Escena T={T} a={K.Es} b={K.Ef}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        {svg(<>
          <circle cx={900} cy={480} r={70} fill={KC.gold2} stroke={KC.ink} strokeWidth={7} /><circle cx={930} cy={460} r={62} fill={KC.violet} />
          <g transform="translate(330 1060)">
            {[0, 1, 2].map((k) => <g key={k} transform={`translate(${(k - 1) * 120} ${k === 1 ? -30 : 0})`}>
              <rect x={-50} y={-40} width={100} height={120} rx={10} fill={PAPEL} stroke={KC.ink} strokeWidth={6} />
              {[0, 1, 2].map((j) => <rect key={j} x={-32} y={-20 + j * 26} width={64 - j * 10} height={8} fill={TINTA} opacity=".6" />)}
            </g>)}
            <g opacity={kprog(T, K.Es + 2.6, K.Es + 3.0)} transform={`translate(0 ${-20 + (1 - kprog(T, K.Es + 2.6, K.Es + 3.0, kEase.rebote)) * -80})`}><Candado x={0} y={0} s={3.2} /></g>
          </g>
          <g transform={`translate(780 ${1000})`}>
            <rect x={-34} y={90} width={26} height={150} fill="#3b3b44" stroke={KC.ink} strokeWidth={5} /><rect x={8} y={90} width={26} height={150} fill="#3b3b44" stroke={KC.ink} strokeWidth={5} />
            <path d="M -60 -70 Q -60 -105 0 -108 Q 60 -105 60 -70 L 55 100 L -55 100 Z" fill="#8c8f99" stroke={KC.ink} strokeWidth={7} />
            <circle cx={0} cy={-155} r={46} fill="#e8b48f" stroke={KC.ink} strokeWidth={7} />
            <path d="M -44 -170 Q -40 -210 0 -206 Q 42 -210 44 -170 Q 20 -188 -44 -170 Z" fill="#2b2b2b" stroke={KC.ink} strokeWidth={5} />
            <circle cx={-17} cy={-158} r={13} fill="none" stroke={KC.ink} strokeWidth={5} /><circle cx={17} cy={-158} r={13} fill="none" stroke={KC.ink} strokeWidth={5} />
            <path d="M -18 -130 Q 0 -138 18 -130" stroke="#2b2b2b" strokeWidth={8} strokeLinecap="round" fill="none" />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Es + 0.2} until={K.Es + 1.5} texto="propuesta: revisar las pláticas de una noche" x={540} y={720} tam={30} borde={KC.cyan} />
      {ESPIA.map(([x, y, rot], i) => { const a = K.Es + 1.5 + i * 0.16; if (!kvisible(T, a, K.Ef - 0.2)) return null; const e = kentrada(T, a, K.Ef - 0.2, 'pop');
        return <div key={i} style={{ position:'absolute', left:x, top:y, zIndex:40, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${e.s})`, opacity:e.o,
          background:KC.red, color:KC.white, border:`6px solid ${KC.ink}`, borderRadius:26, padding:'8px 24px', font:`400 54px ${KF.titulo}`, boxShadow:`6px 6px 0 ${KC.ink}` }}>¡ESPÍA!</div>; })}

      {/* 7 · efecto ELIZA */}
      <Escena T={T} a={K.Ef} b={K.C}>
        <FondoLunares color={KC.noche} punto="rgba(255,255,255,.06)" />
        <LetrasCorazon T={T} at={K.Ef + 0.6} cx={420} cy={900} />
      </Escena>
      {kvisible(T, K.Ef + 0.2, K.C - 0.2) && (() => { const e = kentrada(T, K.Ef + 0.2, K.C - 0.2, 'pop');
        return <div style={{ position:'absolute', left:70, top:410, zIndex:41, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'0 50%', font:`400 110px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`6px 6px 0 ${KC.ink}` }}>EFECTO ELIZA</div>; })()}
      <Chip T={T} at={K.Ef + 2.3} until={K.C - 0.2} texto="…pero solo son símbolos" x={420} y={1160} tam={34} borde={KC.pink} />

      {/* 8 · el código perdido */}
      <Escena T={T} a={K.C} b={K.H}>
        <FondoLunares color={KC.yellow} />
        <CajaArchivo T={T} K={K} />
      </Escena>
      <NumeroGigante T={T} at={K.C + 0.6} until={K.H - 0.2} valor={50} dur={1.2} sufijo="+" etiqueta="" x={250} y={500} tam={190} color={KC.orange} />
      <Chip T={T} at={K.C + 1.0} until={K.H - 0.2} texto="años sin verse" x={250} y={640} tam={32} borde={KC.ink} />
      <Sello T={T} at={K.C + 3.3} texto="2021 · ENCONTRADO" until={K.H - 0.2} x={600} y={800} rot={-9} tam={58} />

      {/* 9 · hoy */}
      <Escena T={T} a={K.H} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<Secretos T={T} x0={520} y0={900} x1={900} y1={780} n={5} alto={160} />)}
      </Escena>
      {T > K.H - 0.4 && T < K.Ci + 0.4 && <div style={{ opacity:kprog(T, K.H - 0.4, K.H + 0.05) * (1 - kprog(T, K.Ci - 0.05, K.Ci + 0.4)) }}>
        <CelularChat T={T} x={380} y={870} s={0.7} tam={36} mensajes={[{ at: K.H + 0.3, yo: true, texto: 'Tuve un día horrible.' }, { at: K.H + 1.3, texto: 'Lamento que te sientas así. ¿Quieres contarme qué pasó?' }]} escribe={[K.H + 0.7, K.H + 1.3]} />
      </div>}
      <Chip T={T} at={K.H + 1.8} until={K.Ci - 0.2} texto="chat ilustrativo" x={830} y={1120} tam={28} borde={KC.ink} />

      {/* 10 · cierre: el mismo consultorio, ya sin disfraz */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.mint} />
        <Consultorio T={T} traje={1 - kprog(T, K.Ci + 1.6, K.Ci + 2.4, kEase.suave)} reglas={kprog(T, K.Ci + 2.0, K.Ci + 3.4)} secretos={1 - kprog(T, K.Ci + 1.6, K.Ci + 2.4)} />
      </Escena>
      <Chip T={T} at={K.Ci + 3.0} until={K.Ou} texto="unas cuantas reglas" x={330} y={620} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="No es un psicólogo: *son reglas.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.R - 0.1} texto="«Mi novio…» → *«Tu novio…»*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={R2 - 0.1} texto="Palabra clave y *«mi» → «tu».*" />
      <Subtitulo T={T} idx={3} at={R2 + 0.1} until={K.E - 0.1} texto="«deprimida» → *«Siento oír…»*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.P - 0.1} texto="ELIZA · Weizenbaum · MIT · *1966*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.S - 0.1} texto="¿Y si sabes *que es una máquina?*" />
      <Subtitulo T={T} idx={6} at={K.S + 0.1} until={K.Es - 0.1} texto="Le pidió *que saliera del cuarto.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ef - 0.1} texto="Lo acusaron de *espiar.*" />
      <Subtitulo T={T} idx={8} at={K.Ef + 0.1} until={K.C - 0.1} texto="*Efecto ELIZA:* ver comprensión en símbolos." />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.H - 0.1} texto="50+ años sin verse… *2021: apareció.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.Ci - 0.1} texto="Con chatbots *pasa igual.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No era psicólogo: *eran reglas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Dialogo + 2.6, CUES.Reglas - 0.15, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Reglas + 4.8, CUES.Estudio - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.2, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Secretaria - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Secretaria + 2.8, CUES.Espiar - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Espiar + 1.2, CUES.Efecto - 0.15, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Efecto + 0.5, CUES.Codigo - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Codigo + 2.5, CUES.Hoy - 0.15, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Hoy + 0.5, CUES.Cierre - 0.15, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="ia" num="49" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ElizaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Eliza /></CompositionStage></div>;
}
window.ElizaApp = ElizaApp;
