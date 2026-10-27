// Largo #00 · ¿Qué es La Creación del Robert? — horizontal 1920×1080, 100 % animado.
// Cada escena tiene su mundo dibujado; las fotos reales (restauradas y recortadas, assets/fotos/) entran con movimiento.
// Tiempos: window.OM_SCENES (escenas) y window.LINEAS (una línea del guion por subtítulo), ambos de escenas.mjs.
// En la versión narrada, narrar.mjs ajusta las escenas a la voz y pone window.SUBS (los subtítulos siguen a la voz).
const W = 1920, H = 1080;
const ESC = (() => { const K = {}; let a = 0; for (const s of JSON.parse(window.OM_SCENES)) { const d = s.nat || s.dur; K[s.name] = { t0: a, dur: d }; a += d; } K.total = a; return K; })();
const LN = window.LINEAS || [];
const S = (n) => ESC[n].t0, F = (n) => ESC[n].t0 + ESC[n].dur;
const L = (i) => LN[i].at, LE = (i) => LN[i].until;
const FOTO = (n) => 'assets/fotos/' + n + '.webp';
const ST = (n) => 'assets/stickers/avatar_' + n + '.webp';
const C = { ...KC, sky: '#7fd4ff', grass: '#3fbf5a', soil: '#8a5a33', pot: '#d9643a', leaf: '#2fae4f', leaf2: '#7ee07a', wood: '#b9824e', gris: '#9a9aa2', noche: '#0E0F12' };
const SOMBRA_T = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const sombra = 'drop-shadow(0 18px 26px rgba(0,0,0,.45))';

/* ---------- piezas base ---------- */
// Escena con fundido y empujón de cámara (nunca corte seco). Solo se dibuja cerca de su tiempo.
function Escena({ T, n, fondo, patron = 'puntos', children, color2 = 'rgba(255,255,255,.22)' }) {
  const a = S(n) - 0.5, b = F(n) + 0.5;
  if (T < a || T > b) return null;
  const i = kprog(T, a, a + 0.9, kEase.suave), o = 1 - kprog(T, b - 0.9, b, kEase.suave);
  const z = klerp(1.07, 1, i) * klerp(1, 0.97, 1 - o) * (1 + 0.012 * Math.sin((T - a) * 0.25));
  const bg = patron === 'puntos' ? { backgroundImage: `radial-gradient(circle, ${color2} 6px, transparent 7px)`, backgroundSize: '64px 64px', backgroundPosition: `${(T * 14) % 64}px ${(T * 9) % 64}px` }
    : patron === 'rayas' ? { backgroundImage: `repeating-linear-gradient(-45deg, ${color2} 0 24px, transparent 24px 64px)`, backgroundPosition: `${(T * 20) % 90}px 0` }
    : patron === 'cuadros' ? { backgroundImage: `linear-gradient(${color2} 2px, transparent 2px), linear-gradient(90deg, ${color2} 2px, transparent 2px)`, backgroundSize: '60px 60px', backgroundPosition: `${(T * 10) % 60}px ${(T * 6) % 60}px` } : {};
  return <div style={{ position:'absolute', inset:0, overflow:'hidden', opacity:Math.min(i, o), background:fondo }}>
    <div style={{ position:'absolute', inset:0, ...bg }}></div>
    <div style={{ position:'absolute', inset:0, transform:`scale(${z})`, transformOrigin:'50% 45%' }}>{children}</div>
  </div>;
}
// Foto real: entra deslizando con rebote, flota suave (nunca quieta) y sale. marco = polaroid; si no, recorte con sombra.
function Foto({ T, n, at, until, x, y, w, rot = 0, desde = 'abajo', marco = true, pie, z = 20, seed = 1 }) {
  if (T < at - 0.05 || T > until + 0.6) return null;
  const i = kprog(T, at, at + 0.7, kEase.rebote), o = kprog(T, until, until + 0.55, kEase.suave);
  const d = { izq: [-1300, 0], der: [1300, 0], abajo: [0, 900], arriba: [0, -900], pop: [0, 0] }[desde];
  const tx = d[0] * (1 - i) + (desde === 'izq' ? -1 : 1) * o * 60, ty = d[1] * (1 - i) + o * 700;
  const s = (desde === 'pop' ? klerp(0.3, 1, i) : 1) * (1 + 0.035 * kprog(T, at, until + 0.5));
  const r = rot + (1 - i) * (desde === 'izq' ? -14 : 14) + mece(T, seed, 0.12) * 1.6 + o * 18;
  const fy = mece(T, seed + 3, 0.15) * 7;
  return <div style={{ position:'absolute', left:x - w / 2, top:y, width:w, zIndex:z, opacity:kprog(T, at, at + 0.15) * (1 - o),
    transform:`translate(${tx}px, ${ty + fy}px) rotate(${r}deg) scale(${s})`, transformOrigin:'50% 50%' }}>
    {marco ? <div style={{ background:'#fffdf8', padding:'12px 12px ' + (pie ? 8 : 14) + 'px', borderRadius:6, boxShadow:'0 22px 40px rgba(0,0,0,.42)' }}>
      <img src={FOTO(n)} style={{ width:'100%', display:'block', borderRadius:2 }} />
      {pie && <div style={{ font:`700 22px ${KF.texto}`, color:'#2a2622', textAlign:'center', paddingTop:6 }}>{pie}</div>}
    </div> : <img src={FOTO(n)} style={{ width:'100%', display:'block', filter:sombra }} />}
  </div>;
}
// Píldora de texto (etiquetas: nombre común + científico en cursiva).
function Pill({ T, at, until, x, y, children, fondo = 'rgba(14,15,18,.86)', color = '#fff', tam = 30, borde = KC.gold, z = 30 }) {
  if (T < at || T > until + 0.4) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:z, transform:`translate(-50%, ${e.y * 0.5}px) scale(${e.s})`, opacity:e.o,
    background:fondo, color, font:`800 ${tam}px/1.15 ${KF.texto}`, padding:'10px 22px', borderRadius:999, border:`3px solid ${borde}`, whiteSpace:'nowrap', boxShadow:'0 10px 24px rgba(0,0,0,.3)' }}>{children}</div>;
}
// Título grande.
function Titulo({ T, at, until, x = W / 2, y = 120, children, tam = 110, color = '#fff', z = 30 }) {
  if (T < at || T > until + 0.4) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:z, transform:`translate(-50%, ${e.y}px) scale(${e.s})`, opacity:e.o, whiteSpace:'nowrap',
    font:`400 ${tam}px/1 ${KF.titulo}`, color, textShadow:'0 6px 0 rgba(0,0,0,.75), 0 0 30px rgba(0,0,0,.35)', letterSpacing:'.01em' }}>{children}</div>;
}
// Número que cuenta.
function Cuenta({ T, at, until, desde = 0, hasta, dur = 1.4, x, y, tam = 120, color = KC.yellow, pre = '', suf = '', etiqueta, z = 30 }) {
  if (T < at || T > until + 0.4) return null;
  const e = kentrada(T, at, until, 'pop'), v = klerp(desde, hasta, kprog(T, at, at + dur, kEase.suave));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:z, transform:`translate(-50%, ${e.y * 0.5}px) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`400 ${tam}px/1 ${KF.titulo}`, color, textShadow:'0 6px 0 rgba(0,0,0,.8)' }}>{pre}{kformato(Math.round(v))}{suf}</div>
    {etiqueta && <div style={{ font:`800 28px ${KF.texto}`, color:'#fff', textShadow:SOMBRA_T, marginTop:6 }}>{etiqueta}</div>}
  </div>;
}
// Robert (stickers) en horizontal. lado: der/izq (abajo, medio cuerpo), presentador (grande a la derecha), arriba-der.
const LADOS_H = { der: { left:1090, top:690, width:380 }, izq: { left:470, top:690, width:380 }, presentador: { left:1340, top:330, width:600 },
  'arriba-der': { left:1600, top:150, width:300 }, gancho: { left:1360, top:300, width:560 }, 'abajo-der': { left:1520, top:660, width:400 }, 'abajo-izq': { left:20, top:660, width:400 } };
function RobertH({ T, ap }) {
  return <>{ap.map(([at, until, pose, lado], k) => {
    if (T < at || T > until + 0.45) return null;
    const P = LADOS_H[lado];
    const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
    const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
    const ty = (1 - i) * 700 + o * 700, rr = mece(T, k + 2, 0.2) * 1.5;
    return <img key={k} src={ST(pose)} style={{ position:'absolute', left:P.left, top:P.top, width:P.width, zIndex:46, transformOrigin:'50% 100%',
      transform:`translateY(${ty}px) rotate(${rr}deg) scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 20px 30px rgba(0,0,0,.5))' }} />;
  })}</>;
}
// Subtítulo: una línea, con su palabra clave resaltada. Fuera del tercio inferior (termina en y = 712).
const CLAVE = ['semillas', 'agave', 'Robert', 'crecer', 'videojuego', 'tianguis', 'YouTube', 'números', 'ONMAPS', 'Vietnam', 'beca', 'hongos', 'recámara',
  'llama', 'campana', 'tuppers', 'peróxido', 'esporas', 'mal', 'desastre', 'rosa', 'brillan', 'reishi', 'ultravioleta', 'Inventor', 'cinco', 'seco', '4,700',
  'basura', 'platino', 'Biotecnología', 'cepario', 'granja', 'Fungi', 'seis', 'beVisioneers', 'tonelada', 'Robert?', 'fuente', 'Shots', 'semana', 'vida'];
function SubH({ T, idx }) {
  const o = window.SUBS && window.SUBS[idx]; const at = o ? o.at : L(idx), until = o ? o.until : LE(idx);
  if (T < at || T > until) return null;
  const sale = kprog(T, until - 0.2, until, kEase.suave), entra = kprog(T, at, at + 0.25, kEase.sale);
  const clave = CLAVE[idx];
  const pal = LN[idx].texto.split(' ').map((w, i) => {
    const on = clave && w.replace(/[.,:;¿?…]/g, '') === clave.replace(/[¿?]/g, '');
    const e = kprog(T, at + i * 0.03, at + i * 0.03 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 16}px)`, padding: on ? '0 .16em' : 0,
      background: on ? KC.gold2 : 'transparent', color: on ? KC.dark : '#fff', borderRadius:8, textShadow: on ? 'none' : '0 3px 0 rgba(0,0,0,.7)' }}>{w}</span>;
  });
  return <div style={{ position:'absolute', left:0, right:0, top:712, zIndex:58, display:'flex', justifyContent:'center', opacity:1 - sale, transform:'translateY(-100%)' }}>
    <div style={{ maxWidth:1500, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:4, padding:'10px 26px 14px',
      background:`rgba(10,11,14,${0.7 * entra})`, borderRadius:22, font:`900 44px/1.16 ${KF.texto}`, textAlign:'center' }}>{pal}</div>
  </div>;
}
// Logo + capítulo arriba a la izquierda.
const CAPS = [['E01', 1, 'La semilla'], ['E04', 2, 'Los números'], ['E06', 3, 'Mi recámara-laboratorio'], ['E11', 4, 'Inventos'], ['E13', 5, 'De basura a comida'],
  ['E14', 6, 'La universidad'], ['E15', 7, 'Fungi Mati'], ['E17', 8, 'Lo que viene'], ['E18', 9, 'El canal']];
function MarcaH({ T }) {
  if (T > S('Outro')) return null;
  let cap = CAPS[0]; for (const c of CAPS) if (T >= S(c[0]) - 0.3) cap = c;
  const t0 = S(cap[0]) - 0.3, e = kprog(T, t0, t0 + 0.5, kEase.rebote);
  return <div style={{ position:'absolute', left:30, top:26, zIndex:55, display:'flex', alignItems:'center', gap:14 }}>
    <div style={{ background:'#fff', borderRadius:16, padding:6, boxShadow:'0 8px 20px rgba(0,0,0,.35)' }}><img src="assets/logo_color.svg" style={{ width:64, height:64, display:'block' }} /></div>
    <div style={{ opacity:e, transform:`translateX(${(1 - e) * -30}px)`, background:'rgba(14,15,18,.82)', color:'#fff', borderRadius:12, padding:'6px 14px', font:`800 24px ${KF.texto}` }}>
      <span style={{ color:KC.gold, fontFamily:KF.mono }}>{String(cap[1]).padStart(2, '0')}</span> · {cap[2]}</div>
  </div>;
}

/* ---------- dibujos reutilizables (SVG) ---------- */
function Maceta({ x, y, s = 1, color = C.pot }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 L 70 0 L 55 110 L -55 110 Z" fill={color} stroke={KC.ink} strokeWidth="7" strokeLinejoin="round" />
    <rect x="-82" y="-22" width="164" height="30" rx="8" fill={color} stroke={KC.ink} strokeWidth="7" />
    <ellipse cx="0" cy="-20" rx="70" ry="10" fill={C.soil} />
  </g>;
}
// Planta que crece (g de 0 a 1), con hojas que se abren y se mecen.
function Planta({ T, x, y, g, alto = 260, hojas = 6, seed = 1 }) {
  if (g <= 0) return null;
  const h = alto * g, m = mece(T, seed, 0.3) * 10 * g;
  const pts = Array.from({ length: hojas }, (_, k) => (k + 1) / (hojas + 1)).filter((q) => q < g + 0.05);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 Q ${m * 0.5} ${-h * 0.5} ${m} ${-h}`} stroke="#2d7d33" strokeWidth={10} fill="none" strokeLinecap="round" />
    {pts.map((q, k) => { const lx = m * q, ly = -h * q * (alto * g / h), sd = k % 2 ? 1 : -1, a = kclamp((g - q) * 5, 0, 1);
      return <ellipse key={k} cx={lx + sd * 34 * a} cy={-alto * g * q} rx={40 * a} ry={16 * a} fill={k % 2 ? C.leaf : C.leaf2} stroke={KC.ink} strokeWidth="5"
        transform={`rotate(${sd * -28 + mece(T, k + seed, 0.4) * 8} ${lx} ${-alto * g * q})`} />; })}
    {g > 0.95 && <circle cx={m} cy={-h - 6} r={18 * kclamp((g - 0.95) * 20, 0, 1)} fill={KC.yellow} stroke={KC.ink} strokeWidth="5" />}
  </g>;
}
function Seta({ x, y, s = 1, color = '#f2e6d8', pie = '#efe4d2', rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -12 0 L -9 -48 L 9 -48 L 12 0 Z" fill={pie} stroke={KC.ink} strokeWidth="5" />
    <path d="M -46 -44 Q 0 -96 46 -44 Q 0 -32 -46 -44 Z" fill={color} stroke={KC.ink} strokeWidth="5" />
  </g>;
}
function Hex({ x, y, r = 60, fill = KC.gold, stroke = KC.ink, sw = 6, children, o = 1, s = 1 }) {
  const d = 'M ' + [0, 60, 120, 180, 240, 300].map((a) => `${(r * Math.cos(a * Math.PI / 180)).toFixed(1)},${(r * Math.sin(a * Math.PI / 180)).toFixed(1)}`).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d={d} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />{children}</g>;
}
function Svg({ children, z = 5 }) { return <svg width={W} height={H} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>; }
function Medalla({ x, y, s = 1, color = '#f4c430', texto = '', cinta = KC.blue }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -120 L -10 -30 L 10 -30 L 30 -120" fill={cinta} stroke={KC.ink} strokeWidth="6" />
    <circle cx="0" cy="0" r="48" fill={color} stroke={KC.ink} strokeWidth="7" />
    <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="5" />
    <text x="0" y="12" textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
  </g>;
}

/* ---------- ESCENAS ---------- */
function E01({ T }) {
  const t0 = S('E01');
  const caida = kprog(T, t0 + 0.05, t0 + 0.9, kEase.suave);                 // la semilla sale volando del frasco al segundo 0
  const sx = klerp(560, 960, caida), sy = klerp(330, 700, caida) - Math.sin(caida * Math.PI) * 260;
  const g = kprog(T, t0 + 1.0, L(1) + 1.5, kEase.sale);
  const logo = kprog(T, L(2) - 0.2, L(2) + 0.7, kEase.rebote);
  return <Escena T={T} n="E01" fondo={`linear-gradient(${C.sky}, #c9f0ff)`} color2="rgba(255,255,255,.35)">
    <Svg>
      <rect x="0" y="880" width={W} height="200" fill={C.grass} stroke={KC.ink} strokeWidth="8" />
      {/* frasco de semillas de la cocina de mamá, se inclina */}
      <g transform={`translate(520 360) rotate(${klerp(0, 38, kprog(T, t0, t0 + 0.4, kEase.sale))})`}>
        <rect x="-70" y="-110" width="140" height="190" rx="26" fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth="7" />
        <rect x="-78" y="-138" width="156" height="34" rx="8" fill={KC.red} stroke={KC.ink} strokeWidth="7" />
        {Array.from({ length: 22 }, (_, k) => <ellipse key={k} cx={-50 + (k % 6) * 20} cy={60 - Math.floor(k / 6) * 22} rx="10" ry="7" fill="#7a3b1e" stroke={KC.ink} strokeWidth="2" />)}
      </g>
      <text x="520" y="520" textAnchor="middle" style={{ font:`800 30px ${KF.texto}` }} fill={KC.ink} opacity={1 - g}>la cocina de mamá</text>
      {caida < 1 && <ellipse cx={sx} cy={sy} rx="13" ry="9" fill="#7a3b1e" stroke={KC.ink} strokeWidth="3" transform={`rotate(${caida * 720} ${sx} ${sy})`} />}
      <Planta T={T} x={960} y={700} g={g * (1 - logo)} alto={300} />
      <Maceta x={960} y={712} s={1.1} />
    </Svg>
    {logo > 0 && <div style={{ position:'absolute', left:960 - 170, top:150, width:340, zIndex:12, transform:`scale(${logo})`, background:'#fff', borderRadius:40, padding:20, boxShadow:'0 24px 50px rgba(0,0,0,.35)' }}>
      <img src="assets/logo_color.svg" style={{ width:'100%', display:'block' }} /></div>}
    <Titulo T={T} at={L(2) + 0.3} until={F('E01') - 0.2} y={40} tam={92} x={960}>LA CREACIÓN DEL ROBERT</Titulo>
    <Pill T={T} at={L(0) + 1.4} until={L(1) - 0.2} x={960} y={760} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>3 años</Pill>
    <Foto T={T} n="01_robert_hablando" at={L(1)} until={F('E01') - 0.3} x={300} y={600} w={420} rot={-3} desde="izq" marco={false} seed={2} />
    <Pill T={T} at={L(1) + 0.6} until={L(2) - 0.1} x={960} y={760}>hongos sobre <b>bagazo de agave</b></Pill>
  </Escena>;
}
function E02({ T }) {
  const t0 = S('E02'), f = F('E02');
  const barra = kprog(T, t0 + 0.6, L(4), kEase.sale), planta = kprog(T, t0 + 0.6, f - 1.5, (p) => p);
  const gana = kprog(T, f - 2.2, f - 1.6, kEase.rebote);
  const dia = Math.max(1, Math.round(planta * 21));
  return <Escena T={T} n="E02" fondo={KC.mint} patron="cuadros">
    <Svg>
      {/* consola de videojuego */}
      <g transform="translate(560 170)">
        <rect x="-230" y="0" width="460" height="300" rx="26" fill="#22252b" stroke={KC.ink} strokeWidth="8" />
        <rect x="-200" y="28" width="400" height="200" rx="10" fill="#3b2f7a" />
        <text x="0" y="100" textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">NIVEL {Math.round(barra * 99)}</text>
        <rect x="-160" y="140" width="320" height="34" rx="8" fill="#16131f" stroke="#fff" strokeWidth="3" />
        <rect x="-156" y="144" width={312 * barra} height="26" rx="6" fill={KC.pink} />
        <text x="0" y="272" textAnchor="middle" style={{ font:`800 26px ${KF.texto}` }} fill="#9aa">videojuego</text>
      </g>
      {/* la planta: lenta pero gana */}
      <Planta T={T} x={1300} y={470} g={planta} alto={300} seed={4} />
      <Maceta x={1300} y={482} />
      <text x="1300" y="640" textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>DÍA {dia}</text>
      {gana > 0 && <g transform={`translate(1300 ${100 - 20 * gana}) scale(${gana})`}>
        <path d="M -60 30 L -70 -30 L -30 0 L 0 -45 L 30 0 L 70 -30 L 60 30 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth="7" strokeLinejoin="round" /></g>}
    </Svg>
    <Pill T={T} at={f - 2.0} until={f - 0.2} x={1300} y={160} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>¡GANA LA PLANTA!</Pill>
    <Foto T={T} n="02_nino_pina" at={t0 + 0.4} until={f - 0.4} x={210} y={300} w={330} rot={-3} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="02_nino_invernadero_jitomate" at={L(3) + 2.2} until={f - 0.4} x={1700} y={110} w={360} rot={4} desde="der" pie="En el invernadero" seed={2} />
    <Foto T={T} n="02_nino_calabazas" at={L(4) + 0.8} until={f - 0.4} x={260} y={740} w={420} rot={2} desde="abajo" marco={false} seed={3} />
    <Foto T={T} n="02_nino_trasplantando" at={L(4) + 2.8} until={f - 0.4} x={1680} y={560} w={380} rot={-4} desde="der" pie="Trasplantando" seed={4} />
  </Escena>;
}
function E03({ T }) {
  const t0 = S('E03'), f = F('E03');
  const nMac = Math.floor(kprog(T, t0 + 0.5, L(6) - 0.5) * 7);
  const tele = kprog(T, L(6), L(6) + 0.6, kEase.rebote), dormir = kprog(T, L(6) + 4, L(6) + 5.5, kEase.suave);
  return <Escena T={T} n="E03" fondo={KC.pink} patron="rayas" color2="rgba(255,255,255,.14)">
    <Svg>
      {/* puesto del tianguis que se arma solo */}
      <g transform={`translate(0 ${(1 - kprog(T, t0, t0 + 0.7, kEase.rebote)) * -500})`}>
        {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M ${430 + k * 70} 140 L ${500 + k * 70} 140 L ${500 + k * 70} 200 Q ${465 + k * 70} 230 ${430 + k * 70} 200 Z`} fill={k % 2 ? '#fff' : KC.orange} stroke={KC.ink} strokeWidth="5" />)}
        <rect x="430" y="120" width="560" height="24" fill={KC.ink} />
      </g>
      <rect x="440" y="470" width="540" height="40" rx="6" fill={C.wood} stroke={KC.ink} strokeWidth="7" />
      <line x1="470" y1="510" x2="470" y2="590" stroke={KC.ink} strokeWidth="10" /><line x1="950" y1="510" x2="950" y2="590" stroke={KC.ink} strokeWidth="10" />
      {Array.from({ length: 7 }, (_, k) => k < nMac && <g key={k} transform={`translate(${490 + k * 72} 470)`}>
        <path d="M -24 -40 L 24 -40 L 18 0 L -18 0 Z" fill={C.pot} stroke={KC.ink} strokeWidth="4" />
        {[0, 1, 2, 3, 4].map((j) => <ellipse key={j} cx={(j - 2) * 8} cy={-52 - (j % 2) * 8} rx="9" ry="20" fill={k % 2 ? '#6fcf8a' : '#93d36a'} stroke={KC.ink} strokeWidth="3" transform={`rotate(${(j - 2) * 24} ${(j - 2) * 8} -44)`} />)}
        <text x="0" y="-98" textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>${10 + k * 5}</text>
      </g>)}
      {/* pantallita de YouTube que se apaga con un bostezo */}
      {tele > 0 && <g transform={`translate(1350 330) scale(${tele})`}>
        <rect x="-220" y="-150" width="440" height="290" rx="24" fill="#fff" stroke={KC.ink} strokeWidth="8" />
        <rect x="-200" y="-130" width="400" height="210" rx="10" fill={`rgba(0,0,0,${0.15 + dormir * 0.75})`} />
        <path d="M -30 -60 L 40 -25 L -30 10 Z" fill={KC.red} opacity={1 - dormir} />
        <text x="0" y="122" textAnchor="middle" style={{ font:`800 24px ${KF.texto}` }} fill={KC.ink}>3º de primaria</text>
        {dormir > 0 && [0, 1, 2].map((k) => <text key={k} x={60 + k * 40} y={-60 - k * 40 - ((T * 30) % 30)} style={{ font:`400 ${40 + k * 12}px ${KF.titulo}` }} fill="#fff" opacity={dormir}>z</text>)}
      </g>}
    </Svg>
    <Pill T={T} at={t0 + 1.2} until={L(6) - 0.2} x={710} y={70} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>Vivero improvisado</Pill>
    <Foto T={T} n="03_vivero_tianguis" at={t0 + 1.6} until={L(6) + 1} x={250} y={170} w={380} rot={-4} desde="izq" pie="En el tianguis" seed={1} />
    <Foto T={T} n="03_plantitas_macetas" at={L(5) + 2.6} until={f - 0.4} x={1640} y={720} w={420} rot={3} desde="der" marco={false} seed={2} />
    <Foto T={T} n="03_canal_youtube_viejo" at={L(6) + 1.2} until={f - 0.4} x={300} y={600} w={360} rot={5} desde="abajo" pie="Mi canal viejo" seed={3} />
  </Escena>;
}
function E04({ T }) {
  const t0 = S('E04'), f = F('E04');
  const NUM = ['1', '2', '3', 'π', '√', '7', '+', '9', '%', '∞'];
  const mapa = kprog(T, L(9) - 0.3, L(9) + 0.4, kEase.sale), vuelo = kprog(T, L(9) + 0.4, L(9) + 3.6, kEase.suave);
  const px = klerp(560, 1480, vuelo), py = 330 - Math.sin(vuelo * Math.PI) * 170;
  return <Escena T={T} n="E04" fondo={KC.cyan} patron="cuadros" color2="rgba(255,255,255,.35)">
    <Svg>
      {mapa < 1 && <g opacity={1 - mapa}>
        <rect x="430" y="520" width="1060" height="40" fill={C.soil} stroke={KC.ink} strokeWidth="6" />
        {NUM.map((n, k) => { const g = kprog(T, t0 + 0.3 + k * 0.28, t0 + 1.1 + k * 0.28, kEase.rebote), x = 480 + k * 106, h = 120 + (k % 3) * 70;
          return <g key={k}><line x1={x} y1={520} x2={x} y2={520 - h * g} stroke="#2d7d33" strokeWidth="8" />
            <g transform={`translate(${x} ${520 - h * g - 40}) scale(${g}) rotate(${mece(T, k, 0.3) * 8})`}><circle r="40" fill={k % 2 ? KC.yellow : '#fff'} stroke={KC.ink} strokeWidth="6" />
              <text y="16" textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{n}</text></g></g>; })}
      </g>}
      {/* medallas ONMAPS 2017 y 2018 */}
      {[0, 1].map((k) => { const g = kprog(T, L(8) + 0.4 + k * 0.6, L(8) + 1.0 + k * 0.6, kEase.rebote), o = 1 - kprog(T, L(9) - 0.5, L(9));
        return g > 0 && <g key={k} opacity={o}><Medalla x={1600 + k * 170} y={250 - (1 - g) * 400} texto={k ? '2018' : '2017'} s={1.1} cinta={KC.pink} /></g>; })}
      {/* mapa: México → Vietnam */}
      {mapa > 0 && <g opacity={mapa}>
        <path d="M 330 230 Q 420 160 560 250 Q 620 330 560 400 Q 470 380 400 320 Z" fill={C.grass} stroke={KC.ink} strokeWidth="6" />
        <path d="M 1380 230 Q 1470 200 1540 260 Q 1560 360 1480 420 Q 1440 360 1400 330 Z" fill={C.grass} stroke={KC.ink} strokeWidth="6" />
        <path d={`M 560 330 Q 1020 ${330 - 340} 1480 330`} stroke={KC.ink} strokeWidth="5" strokeDasharray="14 14" fill="none" />
        <circle cx="560" cy="330" r="14" fill={KC.red} stroke={KC.ink} strokeWidth="4" /><circle cx="1480" cy="330" r="14" fill={KC.red} stroke={KC.ink} strokeWidth="4" />
        <text x="480" y="470" style={{ font:`800 34px ${KF.texto}` }} fill={KC.ink}>México</text>
        <text x="1400" y="490" style={{ font:`800 34px ${KF.texto}` }} fill={KC.ink}>Vietnam · 2019</text>
        <g transform={`translate(${px} ${py}) rotate(${klerp(-25, 25, vuelo)})`}><path d="M -46 0 L 46 -4 L -30 30 L -18 4 Z" fill="#fff" stroke={KC.ink} strokeWidth="5" strokeLinejoin="round" /></g>
        <Medalla x={1020} y={260 + (1 - kprog(T, L(9) + 3.6, L(9) + 4.2, kEase.rebote)) * 600} texto="SASMO" color="#cd7f32" cinta={KC.blue} s={0.95} />
      </g>}
    </Svg>
    <Titulo T={T} at={L(8)} until={L(9) - 0.4} x={960} y={600} tam={84} color={KC.yellow}>ORO · ONMAPS JALISCO</Titulo>
    <Pill T={T} at={L(8) + 4.2} until={L(9) - 0.4} x={700} y={110}>SASMO</Pill>
    <Pill T={T} at={L(8) + 4.6} until={L(9) - 0.4} x={960} y={110}>SIMOC</Pill>
    <Pill T={T} at={L(8) + 5.0} until={L(9) - 0.4} x={1220} y={110}>VANDA</Pill>
    <Foto T={T} n="04_sasmo_medalla" at={L(8) + 4.2} until={L(9) + 0.2} x={240} y={300} w={330} rot={-6} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="04_sasmo_oro_certificado" at={L(8) + 5.4} until={f - 0.4} x={1650} y={560} w={420} rot={4} desde="der" pie="SASMO 2021 · oro" seed={2} />
    <Foto T={T} n="04_vanda_plata_2020" at={L(9) + 4.2} until={f - 0.4} x={300} y={700} w={420} rot={-3} desde="abajo" pie="VANDA 2020 · plata" seed={3} />
    <Foto T={T} n="04_medallas_olimpiadas_2021" at={L(9) + 4.6} until={f - 0.4} x={1640} y={110} w={380} rot={-4} desde="arriba" seed={4} />
  </Escena>;
}
function E05({ T }) {
  const t0 = S('E05'), f = F('E05');
  const llave = kprog(T, t0 + 1.4, t0 + 2.2, kEase.suave), viaje = kprog(T, t0 + 2.2, t0 + 3.6, kEase.suave), abre = kprog(T, t0 + 3.6, t0 + 4.6, kEase.sale);
  const kx = klerp(560, 1150, viaje), ky = klerp(330, 360, viaje);
  return <Escena T={T} n="E05" fondo={KC.yellow}>
    <Svg>
      {/* puerta del Tec */}
      <g transform="translate(1180 120)">
        <rect x="-20" y="-20" width="320" height="500" fill="#eee" stroke={KC.ink} strokeWidth="8" />
        <rect x="0" y="0" width="280" height="460" fill="#fff6c9" />
        <g transform={`skewY(${-abre * 12}) scale(${1 - abre * 0.75} 1)`}><rect x="0" y="0" width="280" height="460" fill={KC.blue} stroke={KC.ink} strokeWidth="7" />
          <circle cx="240" cy="240" r="12" fill={KC.yellow} stroke={KC.ink} strokeWidth="4" /></g>
        <text x="140" y="-40" textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>TEC DE MONTERREY</text>
        {abre > 0 && Array.from({ length: 6 }, (_, k) => <line key={k} x1="140" y1="230" x2={140 + Math.cos(k) * 400 * abre} y2={230 + Math.sin(k * 1.3) * 300 * abre} stroke="#fff" strokeWidth="10" opacity={0.6 * abre} />)}
      </g>
      {/* medalla que se vuelve llave */}
      <g transform={`translate(${kx} ${ky + mece(T, 2, 0.4) * 8}) rotate(${mece(T, 1, 0.3) * 12 + viaje * 90})`}>
        <g opacity={1 - llave}><Medalla x={0} y={0} texto="ORO" s={1.4} cinta={KC.pink} /></g>
        <g opacity={llave} transform={`scale(${llave})`}><circle cx="-60" cy="0" r="40" fill={KC.gold} stroke={KC.ink} strokeWidth="7" /><circle cx="-60" cy="0" r="14" fill={KC.yellow} stroke={KC.ink} strokeWidth="5" />
          <rect x="-20" y="-12" width="120" height="24" fill={KC.gold} stroke={KC.ink} strokeWidth="6" /><rect x="70" y="10" width="14" height="30" fill={KC.gold} stroke={KC.ink} strokeWidth="5" /><rect x="44" y="10" width="14" height="22" fill={KC.gold} stroke={KC.ink} strokeWidth="5" /></g>
      </g>
    </Svg>
    <Titulo T={T} at={t0 + 4.4} until={f - 0.2} x={700} y={470} tam={90} color={KC.ink}>BECA COMPLETA</Titulo>
    <Foto T={T} n="05_reconocimiento_prepatec" at={t0 + 0.4} until={f - 0.4} x={240} y={170} w={360} rot={-3} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="05_graduacion_prepatec" at={t0 + 4.8} until={f - 0.4} x={1680} y={560} w={300} rot={4} desde="der" pie="Graduación PrepaTec 2024" seed={2} />
    <Foto T={T} n="05_graduacion_borrego" at={t0 + 5.6} until={f - 0.4} x={330} y={700} w={300} rot={-5} desde="abajo" seed={3} />
  </Escena>;
}
function E06({ T }) {
  const t0 = S('E06'), f = F('E06');
  const n = Math.floor(kprog(T, L(12) - 0.3, f - 0.6) * 24);
  return <Escena T={T} n="E06" fondo="#c9b6ff" patron="puntos">
    <Svg>
      <rect x="0" y="560" width={W} height="520" fill="#a98a6a" />
      {/* cama y escritorio */}
      <rect x="440" y="420" width="420" height="120" rx="20" fill="#5aa0ff" stroke={KC.ink} strokeWidth="7" /><rect x="440" y="380" width="110" height="60" rx="16" fill="#fff" stroke={KC.ink} strokeWidth="6" />
      <rect x="430" y="530" width="440" height="40" fill={C.wood} stroke={KC.ink} strokeWidth="6" />
      {/* repisas que se llenan de frascos */}
      {[0, 1, 2].map((r) => <rect key={r} x="990" y={200 + r * 130} width="460" height="16" fill={C.wood} stroke={KC.ink} strokeWidth="5" />)}
      {Array.from({ length: 24 }, (_, k) => k < n && <g key={k} transform={`translate(${1015 + (k % 8) * 56} ${200 + Math.floor(k / 8) * 130}) scale(${kclamp((n - k) * 0.5, 0, 1)})`}>
        <rect x="-20" y="-70" width="40" height="70" rx="8" fill="rgba(230,245,255,.85)" stroke={KC.ink} strokeWidth="4" />
        <rect x="-16" y="-34" width="32" height="32" rx="4" fill={k % 3 ? '#f1e6c8' : '#fff'} /><rect x="-22" y="-80" width="44" height="12" rx="3" fill={k % 2 ? KC.red : KC.blue} stroke={KC.ink} strokeWidth="3" /></g>)}
      {/* "10" con setas */}
      <g transform={`translate(700 ${230 + (1 - kprog(T, t0 + 0.2, t0 + 0.8, kEase.rebote)) * -500})`}>
        <text x="0" y="40" textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth="6">10</text>
        <Seta x={-150} y={20} s={1.1} color="#ff8fb3" rot={-12} /><Seta x={150} y={10} s={0.9} color="#ffd36b" rot={10} />
      </g>
    </Svg>
    <Pill T={T} at={t0 + 0.6} until={L(12)} x={700} y={300} fondo={KC.pink} borde={KC.ink}>años: me enamoré de los hongos</Pill>
    <Pill T={T} at={L(12) + 0.5} until={f - 0.3} x={1220} y={80} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>Mi recámara = mi laboratorio</Pill>
    <Foto T={T} n="06_recamara_laboratorio" at={L(12) + 0.2} until={f - 0.4} x={220} y={140} w={320} rot={-4} desde="izq" seed={1} />
    <Foto T={T} n="06_durmiendo_junto_experimentos" at={L(12) + 1.6} until={f - 0.4} x={1640} y={640} w={420} rot={3} desde="der" pie="Durmiendo junto a los experimentos" seed={2} />
    <Foto T={T} n="06_anaquel_cultivos" at={t0 + 1.2} until={L(12) + 1.2} x={1680} y={150} w={260} rot={2} desde="der" marco={false} seed={3} />
    <Foto T={T} n="06_frascos_grano" at={L(12) + 2.8} until={f - 0.4} x={300} y={760} w={460} rot={-2} desde="abajo" marco={false} seed={4} />
  </Escena>;
}
function E07({ T }) {
  const t0 = S('E07'), f = F('E07');
  const paso = T < L(14) ? 0 : T < L(14) + 2.3 ? 1 : T < L(15) ? 2 : 3;
  const est = [0.3, 0.55, 0.85, 0.85][paso], estV = klerp(0.1, est, kprog(T, t0, t0 + 1.5));
  const fl = 1 + mece(T * 3, 1, 1) * 0.15;
  return <Escena T={T} n="E07" fondo={KC.orange} patron="rayas" color2="rgba(255,255,255,.12)">
    <Svg>
      <rect x="430" y="470" width="1060" height="36" rx="8" fill={C.wood} stroke={KC.ink} strokeWidth="7" />
      {paso === 0 && <g>
        <rect x="620" y="240" width="380" height="230" rx="18" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth="7" />
        <rect x="1080" y="400" width="60" height="70" fill="#555" stroke={KC.ink} strokeWidth="5" />
        <path d={`M 1110 400 Q ${1090 - 6 * fl} ${360 - 30 * fl} 1110 ${300 - 30 * fl} Q ${1130 + 6 * fl} ${360 - 30 * fl} 1110 400 Z`} fill="#4aa8ff" stroke="#1d5fd1" strokeWidth="4" />
        <text x="810" y="210" textAnchor="middle" style={{ font:`800 30px ${KF.texto}` }} fill={KC.ink}>contenedor de plástico + llama</text></g>}
      {paso === 1 && <g>
        <rect x="600" y="220" width="440" height="250" rx="18" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth="8" />
        <circle cx="720" cy="380" r="46" fill="#333" stroke={KC.ink} strokeWidth="6" /><circle cx="920" cy="380" r="46" fill="#333" stroke={KC.ink} strokeWidth="6" />
        <text x="820" y="200" textAnchor="middle" style={{ font:`800 32px ${KF.texto}` }} fill={KC.ink}>caja de guantes</text></g>}
      {paso === 2 && <g>
        <rect x="600" y="160" width="460" height="310" rx="14" fill="#22252b" stroke={KC.ink} strokeWidth="8" />
        <rect x="630" y="260" width="400" height="200" fill="rgba(255,255,255,.75)" />
        <circle cx="830" cy="210" r="34" fill="#444" stroke="#aaa" strokeWidth="4" /><g transform={`translate(830 210) rotate(${T * 720})`}><path d="M 0 0 L 28 -8 L 28 8 Z M 0 0 L -28 8 L -28 -8 Z" fill="#ccc" /></g>
        {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={660 + k * 85} y1={280 + ((T * 160 + k * 40) % 160)} x2={660 + k * 85} y2={310 + ((T * 160 + k * 40) % 160)} stroke="#4aa8ff" strokeWidth="5" />)}
        <text x="830" y="140" textAnchor="middle" style={{ font:`800 32px ${KF.texto}` }} fill={KC.ink}>campana de flujo casera</text></g>}
      {paso === 3 && <g>
        <path d="M 600 470 L 600 300 Q 600 250 650 250 L 850 250 Q 900 250 900 300 L 900 470 Z" fill="#c8cdd4" stroke={KC.ink} strokeWidth="8" />
        <rect x="610" y="230" width="280" height="30" rx="10" fill="#9aa1a8" stroke={KC.ink} strokeWidth="7" />
        {[0, 1, 2].map((k) => <path key={k} d={`M ${700 + k * 50} 220 q -20 -40 0 -80 q 20 -40 0 -80`} stroke="#fff" strokeWidth="8" fill="none" opacity={0.5 + 0.5 * Math.sin(T * 4 + k)} transform={`translate(0 ${-((T * 30 + k * 20) % 40)})`} />)}
        <text x="750" y="140" textAnchor="middle" style={{ font:`800 30px ${KF.texto}` }} fill={KC.ink}>olla de presión = autoclave</text>
        {[0, 1, 2].map((k) => <g key={k} transform={`translate(${1040 + k * 120} 440)`}><ellipse rx="52" ry="18" fill="#fff" stroke={KC.ink} strokeWidth="5" /><ellipse rx="40" ry="11" fill="#ffd6e4" /></g>)}
        <text x="1160" y="380" textAnchor="middle" style={{ font:`800 30px ${KF.texto}` }} fill={KC.ink}>tuppers = cajas de Petri</text></g>}
    </Svg>
    <MedidorH T={T} at={t0 + 0.3} until={L(15) - 0.2} etiqueta="ESTERILIDAD (esquema)" valor={() => estV} color={KC.mint} />
    <Pill T={T} at={t0 + 0.3} until={f - 0.3} x={1300} y={70} fondo={KC.ink}>PASO {Math.min(3, paso + 1)} / 3</Pill>
    <Foto T={T} n="07_trabajando_junto_llama" at={L(13) + 0.6} until={L(14) + 1} x={230} y={120} w={300} rot={-4} desde="izq" seed={1} />
    <Foto T={T} n="07_mesa_esteril" at={L(13) + 2.2} until={L(14) + 2} x={1680} y={150} w={300} rot={3} desde="der" seed={2} />
    <Foto T={T} n="07_campana_flujo_casera" at={L(14) + 2.2} until={f - 0.4} x={1650} y={640} w={420} rot={-3} desde="der" pie="Mi campana de flujo" seed={3} />
    <Foto T={T} n="07_olla_presion_placas" at={L(15) + 0.4} until={f - 0.4} x={250} y={620} w={340} rot={4} desde="abajo" seed={4} />
    <Foto T={T} n="07_tupper_como_petri" at={L(15) + 2.2} until={f - 0.4} x={1700} y={150} w={300} rot={-2} desde="arriba" marco={false} seed={5} />
  </Escena>;
}
// Medidor horizontal propio (el del kit es vertical).
function MedidorH({ T, at, until, etiqueta, valor, color }) {
  if (T < at || T > until + 0.4) return null;
  const e = kentrada(T, at, until, 'sube'), v = valor(T);
  return <div style={{ position:'absolute', left:520, top:518, width:560, zIndex:30, opacity:e.o, transform:`translateY(${e.y * 0.4}px)` }}>
    <div style={{ font:`800 22px ${KF.mono}`, color:'#fff', textShadow:SOMBRA_T, marginBottom:6 }}>{etiqueta} · {Math.round(v * 100)} %</div>
    <div style={{ height:24, background:'rgba(0,0,0,.45)', borderRadius:12, border:'3px solid #fff' }}><div style={{ width:`${v * 100}%`, height:'100%', background:color, borderRadius:10 }}></div></div>
  </div>;
}
function E08({ T }) {
  const t0 = S('E08'), f = F('E08');
  const apaga = kprog(T, t0 + 1.4, t0 + 2.4, kEase.suave), botella = kprog(T, t0 + 3.6, t0 + 4.3, kEase.rebote);
  return <Escena T={T} n="E08" fondo={KC.yellow} patron="puntos" color2="rgba(255,255,255,.4)">
    <Svg>
      <rect x="430" y="470" width="1060" height="36" rx="8" fill={C.wood} stroke={KC.ink} strokeWidth="7" />
      {/* mechero que se apaga */}
      <g transform="translate(700 470)">
        <path d="M -60 0 L -40 -110 L 40 -110 L 60 0 Z" fill="rgba(220,240,255,.8)" stroke={KC.ink} strokeWidth="6" />
        <rect x="-50" y={-110 + 100 * apaga} width="100" height={100 - 100 * apaga} fill="rgba(120,200,255,.5)" />
        <rect x="-10" y="-150" width="20" height="40" fill="#ddd" stroke={KC.ink} strokeWidth="4" />
        {apaga < 1 && <path d={`M 0 -150 Q -22 -190 0 ${-240 + 60 * apaga} Q 22 -190 0 -150 Z`} fill={KC.orange} stroke={KC.red} strokeWidth="4" opacity={1 - apaga} transform={`scale(${1 - apaga * 0.8} 1)`} />}
        {apaga > 0.6 && [0, 1, 2].map((k) => <circle key={k} cx={Math.sin(T * 2 + k) * 14} cy={-170 - ((T * 60 + k * 30) % 120)} r={10 + k * 4} fill="#999" opacity={0.4} />)}
        <text x="0" y="60" textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>ALCOHOL {Math.round(100 * (1 - apaga))} %</text>
      </g>
      {/* botella de peróxido con brillo */}
      {botella > 0 && <g transform={`translate(1150 470) scale(${botella})`}>
        <rect x="-60" y="-200" width="120" height="200" rx="22" fill="#6b3b17" stroke={KC.ink} strokeWidth="7" />
        <rect x="-26" y="-240" width="52" height="44" fill="#fff" stroke={KC.ink} strokeWidth="6" />
        <rect x="-50" y="-140" width="100" height="70" rx="6" fill="#fff" stroke={KC.ink} strokeWidth="4" />
        <text x="0" y="-95" textAnchor="middle" style={{ font:`400 36px ${KF.titulo}` }} fill={KC.ink}>H₂O₂</text>
        {[0, 1, 2, 3, 4, 5].map((k) => { const a = k * 1.05 + T; return <path key={k} d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z" fill="#fff" stroke={KC.ink} strokeWidth="2"
          transform={`translate(${Math.cos(a) * 130} ${-110 + Math.sin(a) * 130}) scale(${0.6 + 0.4 * Math.sin(T * 5 + k)})`} />; })}
      </g>}
    </Svg>
    <Titulo T={T} at={t0 + 0.4} until={t0 + 3.4} x={960} y={80} tam={84} color={KC.ink}>LABORATORIO DE BAJO PRESUPUESTO</Titulo>
    <Pill T={T} at={t0 + 4.4} until={f - 0.3} x={1150} y={90} fondo={KC.ink}>peróxido de hidrógeno</Pill>
    <Foto T={T} n="08_alcohol_botella" at={t0 + 0.8} until={t0 + 4.2} x={240} y={180} w={260} rot={-4} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="08_cultivo_limpiado_peroxido" at={t0 + 4.6} until={f - 0.4} x={1680} y={330} w={320} rot={4} desde="der" pie="Limpiando un cultivo con peróxido" seed={2} />
  </Escena>;
}
function E09({ T }) {
  const t0 = S('E09'), f = F('E09');
  const sat = kprog(T, L(19) + 0.8, L(19) + 1.2, kEase.rebote);
  return <Escena T={T} n="E09" fondo={C.noche} patron="puntos" color2="rgba(47,224,168,.12)">
    <Svg>
      {/* el frasco contaminado, con esporas que vuelan */}
      <g transform={`translate(960 ${300 + mece(T, 3, 0.2) * 6})`}>
        <rect x="-120" y="-150" width="240" height="300" rx="36" fill="rgba(220,240,255,.18)" stroke="#e8f4ff" strokeWidth="7" />
        <rect x="-130" y="-186" width="260" height="44" rx="10" fill={KC.red} stroke="#fff" strokeWidth="5" />
        {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={-90 + (k * 37) % 180} cy={120 - ((k * 53) % 240) * kprog(T, t0 + 0.3, t0 + 3)} r={10 + (k % 4) * 4} fill={k % 3 ? '#2a6b39' : '#111'} opacity="0.85" />)}
      </g>
      {Array.from({ length: 70 }, (_, k) => { const a = k * 2.399, sp = 60 + (k % 7) * 30, tt = Math.max(0, T - t0 - 1.2 - (k % 10) * 0.12), r = (tt * sp) % 900;
        return tt > 0 && <circle key={k} cx={960 + Math.cos(a) * r} cy={150 + Math.sin(a) * r * 0.6} r={3 + (k % 3) * 2} fill={k % 2 ? '#7cf2a4' : '#c9ffd9'} opacity={0.8 * (1 - r / 900)} />; })}
      {sat > 0 && <g transform={`translate(1380 330) rotate(-14) scale(${klerp(2, 1, sat)})`} opacity={sat}><rect x="-170" y="-58" width="340" height="116" rx="12" fill="none" stroke={KC.red} strokeWidth="10" />
        <text x="0" y="32" textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.red}>SÁTIRA</text></g>}
    </Svg>
    <Cuenta T={T} at={t0 + 1.4} until={L(18) - 0.3} hasta={1000000000} dur={2.4} x={960} y={448} tam={60} color={KC.mint} etiqueta="esporas (miles de millones, no las que quería)" />
    <Pill T={T} at={L(18) + 0.3} until={L(19) - 0.2} x={960} y={470} fondo={KC.mint} color={KC.ink} borde={KC.ink}>Aquí también subo lo que sale mal</Pill>
    <Foto T={T} n="09_frasco_contaminado_2023" at={t0 + 0.6} until={L(18) + 1} x={250} y={130} w={260} rot={-4} desde="izq" pie="El frasco (2023)" seed={1} />
    <Foto T={T} n="09_frasco_moho" at={L(17) + 2.4} until={L(19)} x={1680} y={140} w={280} rot={3} desde="der" marco={false} seed={2} />
    <Foto T={T} n="09_bloque_mohos" at={L(18) + 0.4} until={f - 0.4} x={260} y={640} w={340} rot={4} desde="abajo" seed={3} />
    <Foto T={T} n="09_placas_contaminadas" at={L(18) + 1.6} until={L(19) + 0.6} x={1650} y={680} w={400} rot={-3} desde="der" seed={4} />
    <Foto T={T} n="09_robert_tutorial_satirico" at={L(19)} until={f - 0.4} x={1380} y={380} w={340} rot={0} desde="pop" marco={false} seed={5} z={22} />
  </Escena>;
}
function E10({ T }) {
  const t0 = S('E10'), f = F('E10');
  const osc = kprog(T, L(21) - 0.2, L(21) + 0.6) * (1 - kprog(T, L(22) + 0.4, L(22) + 1.2));
  const LOG = [[L(20), 'Seta rosa', 'Pleurotus djamor', '#ff8fb3'], [L(21), 'Hongos y bacterias que brillan', 'Panellus stipticus · Aliivibrio fischeri', '#7cf2a4'], [L(22), 'Reishi en un tronco con mohos', 'Ganoderma lucidum', '#c0542b']];
  return <Escena T={T} n="E10" fondo={KC.lilac} patron="puntos">
    {LOG.map(([at, t, sp, col], k) => { const e = kentrada(T, at, f - 0.4, 'pop'), luz = kprog(T, at + 0.2, at + 0.7);
      return T >= at && <div key={k} style={{ position:'absolute', left:560, top:110 + k * 150, width:800, zIndex:12, opacity:e.o, transform:`scale(${e.s})`,
        background:`rgba(14,15,18,${0.85})`, border:`4px solid ${luz > 0.5 ? col : '#555'}`, borderRadius:24, padding:'16px 26px', display:'flex', alignItems:'center', gap:22,
        boxShadow: luz > 0.5 ? `0 0 ${30 + 20 * Math.sin(T * 4)}px ${col}` : 'none' }}>
        <div style={{ font:`400 64px ${KF.titulo}`, color:col }}>★</div>
        <div><div style={{ font:`900 36px ${KF.texto}`, color:'#fff' }}>{t}</div><div style={{ font:`italic 600 26px ${KF.texto}`, color:'#ddd' }}>{sp}</div></div>
      </div>; })}
    <div style={{ position:'absolute', inset:0, zIndex:15, background:`rgba(5,8,20,${0.82 * osc})`, pointerEvents:'none' }}></div>
    {osc > 0.05 && <Svg z={16}>{Array.from({ length: 30 }, (_, k) => <circle key={k} cx={(k * 197) % W} cy={(k * 131) % 560 + 80} r={4 + (k % 3) * 3} fill="#9dffb8" opacity={osc * (0.4 + 0.6 * Math.abs(Math.sin(T * 2 + k)))} />)}</Svg>}
    <Foto T={T} n="10_seta_rosa" at={L(20) + 0.4} until={L(21) + 0.4} x={250} y={120} w={300} rot={-4} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="10_robert_seta_rosa" at={L(20) + 2.2} until={L(21) + 1} x={1650} y={150} w={400} rot={3} desde="der" pie="De la impresión de esporas a la cosecha" seed={2} />
    <Foto T={T} n="10_panellus_brilla" at={L(21) + 0.6} until={L(22) + 0.2} x={250} y={420} w={240} rot={-3} desde="izq" pie="Panellus brillando" seed={3} z={20} />
    <Foto T={T} n="10_aliivibrio_placa" at={L(21) + 1.8} until={L(22) + 0.6} x={1680} y={560} w={300} rot={2} desde="der" marco={false} seed={4} z={20} />
    <Foto T={T} n="10_reishi_tronco" at={L(22) + 0.6} until={f - 0.4} x={300} y={700} w={440} rot={-3} desde="abajo" pie="Reishi en tronco (2025)" seed={5} z={20} />
  </Escena>;
}
function E11({ T }) {
  const t0 = S('E11'), f = F('E11');
  return <Escena T={T} n="E11" fondo={KC.cyan} patron="rayas" color2="rgba(255,255,255,.18)">
    <Svg>
      {/* tubo con luz ultravioleta */}
      <rect x="560" y="210" width="800" height="200" rx="100" fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth="8" />
      <rect x="760" y="230" width="400" height="160" rx="20" fill="#7b2cff" opacity={0.35 + 0.15 * Math.sin(T * 8)} />
      {[0, 1, 2].map((k) => <rect key={k} x={790 + k * 130} y="240" width="80" height="140" rx="40" fill="#c9a2ff" opacity={0.5 + 0.3 * Math.sin(T * 6 + k)} />)}
      {Array.from({ length: 16 }, (_, k) => { const x = 420 + ((T - t0) * 160 + k * 90) % 1200, y = 270 + (k * 37) % 90, dentro = x > 760, vivo = x < 1160;
        return <g key={k} transform={`translate(${x} ${y}) rotate(${T * 90 + k * 20})`}>
          {x < 1160 ? <><circle r="18" fill={dentro ? '#888' : KC.red} stroke={KC.ink} strokeWidth="4" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => <line key={j} x1="0" y1="0" x2={Math.cos(j * 0.785) * 28} y2={Math.sin(j * 0.785) * 28} stroke={dentro ? '#888' : KC.red} strokeWidth="4" />)}</>
            : <circle r="8" fill="#fff" stroke={KC.ink} strokeWidth="3" />}
        </g>; })}
      <text x="960" y="460" textAnchor="middle" style={{ font:`800 32px ${KF.texto}` }} fill={KC.ink}>aire con virus → luz ultravioleta → aire limpio (esquema)</text>
    </Svg>
    <Pill T={T} at={L(23) + 1.2} until={L(24) - 0.2} x={960} y={110} fondo={KC.ink}>15 años · en plena pandemia</Pill>
    <Pill T={T} at={L(24)} until={f - 0.3} x={960} y={110} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>16 años · Joven Inventor · modelo de utilidad</Pill>
    <Foto T={T} n="11_filtro_uv_render" at={L(23) + 2.6} until={f - 0.4} x={260} y={130} w={420} rot={-3} desde="izq" pie="Filtro portátil con luz UV" seed={1} />
    <Foto T={T} n="11_filtro_uv_diagrama" at={L(23) + 4.4} until={L(24) + 2} x={1650} y={140} w={420} rot={3} desde="der" seed={2} />
    <Foto T={T} n="11_joven_inventor_jalisco" at={L(24) + 0.8} until={f - 0.4} x={1640} y={600} w={460} rot={-2} desde="der" pie="Gobierno de Jalisco, 2022" seed={3} />
  </Escena>;
}
function E12({ T }) {
  const t0 = S('E12'), f = F('E12');
  const moneda = kprog(T, L(25) + 2.2, L(25) + 3.4, kEase.sale);
  const piezas = [kprog(T, L(26), L(26) + 0.6, kEase.rebote), kprog(T, L(26) + 0.6, L(26) + 1.2, kEase.rebote), kprog(T, L(26) + 1.2, L(26) + 1.8, kEase.rebote)];
  const mapa = kprog(T, L(27) + 3.5, L(27) + 4.2, kEase.sale);
  const nPts = Math.floor(kprog(T, L(27) + 4.2, L(27) + 7.5) * 32);
  return <Escena T={T} n="E12" fondo={KC.pink} patron="puntos">
    <Svg>
      {mapa < 1 && <g opacity={1 - mapa}>
        {/* hospital */}
        <g transform="translate(560 140)"><rect x="0" y="80" width="300" height="300" fill="#fff" stroke={KC.ink} strokeWidth="8" /><rect x="90" y="0" width="120" height="100" fill="#fff" stroke={KC.ink} strokeWidth="8" />
          <rect x="135" y="18" width="30" height="66" fill={KC.red} /><rect x="117" y="36" width="66" height="30" fill={KC.red} />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={30 + (k % 3) * 90} y={130 + Math.floor(k / 3) * 100} width="60" height="60" fill={C.sky} stroke={KC.ink} strokeWidth="5" />)}
          <text x="150" y="420" textAnchor="middle" style={{ font:`800 28px ${KF.texto}` }} fill={KC.ink}>Hospital Civil</text></g>
        {/* moneda de 5 pesos que gira y cae */}
        {T > L(25) + 2 && <g transform={`translate(1000 ${120 + moneda * 300}) scale(${Math.cos(T * 9)} 1)`}><circle r="56" fill="#c9a43a" stroke={KC.ink} strokeWidth="7" /><circle r="34" fill="#d8d8d8" stroke={KC.ink} strokeWidth="5" />
          <text y="16" textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>$5</text></g>}
        {/* baño seco que se arma por piezas */}
        <g transform="translate(1250 470)">
          <g transform={`translate(0 ${(1 - piezas[0]) * -600})`}><rect x="-90" y="-200" width="180" height="200" fill="none" stroke="#ddd" strokeWidth="14" /><rect x="-90" y="-200" width="180" height="200" fill="none" stroke={KC.ink} strokeWidth="5" /></g>
          <g transform={`translate(0 ${(1 - piezas[1]) * -600})`}><path d="M -70 -110 L 70 -110 L 55 -10 L -55 -10 Z" fill={KC.red} stroke={KC.ink} strokeWidth="6" /></g>
          <g transform={`translate(0 ${(1 - piezas[2]) * -600})`}><ellipse cx="0" cy="-200" rx="100" ry="34" fill="#fff" stroke={KC.ink} strokeWidth="7" /><ellipse cx="0" cy="-200" rx="56" ry="16" fill="#555" /></g>
          <text x="0" y="50" textAnchor="middle" style={{ font:`800 28px ${KF.texto}` }} fill={KC.ink} opacity={piezas[2]}>baño seco de bajo costo</text>
        </g>
      </g>}
      {mapa > 0 && <g opacity={mapa}>
        <ellipse cx="960" cy="320" rx="520" ry="250" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth="6" />
        {Array.from({ length: 32 }, (_, k) => { const a = k * 2.399, r = 60 + (k * 53) % 200; const x = 960 + Math.cos(a) * r * 2.2, y = 320 + Math.sin(a) * r * 0.95;
          return k < nPts && <circle key={k} cx={x} cy={y} r={12 * kclamp((nPts - k) * 0.4, 0, 1.2)} fill={KC.yellow} stroke={KC.ink} strokeWidth="4" />; })}
      </g>}
    </Svg>
    <Cuenta T={T} at={L(27) + 4.2} until={f - 0.3} hasta={4700} dur={3} x={760} y={230} tam={80} color="#fff" pre="+" etiqueta="estudiantes" />
    <Cuenta T={T} at={L(27) + 4.6} until={f - 0.3} hasta={32} dur={3} x={1160} y={230} tam={80} color={KC.yellow} etiqueta="países" />
    <Pill T={T} at={L(27) + 0.3} until={L(27) + 3.6} x={760} y={90} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>1.er lugar nacional · PrepApps</Pill>
    <Pill T={T} at={L(27) + 1.6} until={L(27) + 3.6} x={1220} y={170} fondo={KC.ink}>1.er lugar internacional · Jacobs Teen Innovation Challenge</Pill>
    <Foto T={T} n="12_bano_seco" at={L(26) + 1.8} until={L(27) + 3.4} x={1680} y={120} w={260} rot={3} desde="der" marco={false} seed={1} />
    <Foto T={T} n="12_robert_cargando_bano_seco" at={L(26) + 2.4} until={L(27) + 3.4} x={260} y={330} w={300} rot={-3} desde="izq" marco={false} seed={2} />
    <Foto T={T} n="12_prepapps_primer_lugar" at={L(27) + 0.6} until={f - 0.4} x={240} y={140} w={300} rot={-4} desde="izq" pie="PrepApps · 1.er lugar nacional" seed={3} />
    <Foto T={T} n="12_bano_seco_nacional" at={L(27) + 2.4} until={f - 0.4} x={1660} y={650} w={420} rot={3} desde="der" pie="Etapa nacional, Monterrey 2023" seed={4} />
    <Foto T={T} n="12_jacobs_challenge" at={L(27) + 4.8} until={f - 0.4} x={290} y={760} w={420} rot={-2} desde="abajo" seed={5} />
  </Escena>;
}
function E13({ T }) {
  const t0 = S('E13'), f = F('E13');
  const tl = kprog(T, t0 + 0.6, L(29) - 0.5), dia = Math.round(tl * 28);
  const mic = kclamp(tl * 2.2, 0, 1), setas = kclamp((tl - 0.45) * 2.5, 0, 1), plato = kclamp((tl - 0.85) * 7, 0, 1) * (1 - kprog(T, L(29), L(29) + 0.5));
  return <Escena T={T} n="E13" fondo={KC.mint} patron="cuadros">
    <Svg>
      {T < L(29) && plato < 1 && <g opacity={1 - plato} transform="translate(960 480)">
        {/* residuo agrícola en bolsa que se coloniza */}
        <path d="M -150 0 L -130 -300 Q 0 -340 130 -300 L 150 0 Z" fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth="7" />
        {Array.from({ length: 40 }, (_, k) => <rect key={k} x={-120 + (k * 47) % 240} y={-280 + (k * 71) % 270} width="34" height="8" rx="3" fill="#c9963e" transform={`rotate(${k * 37} ${-120 + (k * 47) % 240} ${-280 + (k * 71) % 270})`} />)}
        <path d="M -140 0 L -128 -290 Q 0 -330 128 -290 L 140 0 Z" fill="#fff" opacity={mic * 0.85} />
        {[[-160, -120, 1], [160, -170, 0.9], [-150, -230, 0.8], [165, -60, 1.1]].map(([x, y, s], k) => <Seta key={k} x={x} y={y} s={s * setas} rot={x < 0 ? -70 : 70} color="#e9dfd2" />)}
      </g>}
      {plato > 0 && <g transform={`translate(960 400) scale(${plato})`}>
        <ellipse rx="230" ry="80" fill="#fff" stroke={KC.ink} strokeWidth="8" /><ellipse rx="170" ry="54" fill="#f3f3f3" />
        {[-90, -30, 30, 90].map((x, k) => <Seta key={k} x={x} y={10} s={0.8} rot={(k - 1.5) * 15} color="#e9dfd2" />)}
      </g>}
    </Svg>
    <Titulo T={T} at={L(28) + 0.4} until={L(29) - 0.3} x={960} y={50} tam={80} color={KC.ink}>DE BASURA A COMIDA</Titulo>
    <Pill T={T} at={t0 + 0.8} until={L(29) - 0.4} x={1340} y={300} fondo={KC.ink}>DÍA {dia} · menos de un mes</Pill>
    {[[L(29) + 0.3, 'PLATINO', 'INFOMATRIX', '#e5e4e2'], [L(29) + 1.8, 'ORO', 'Feria de Ciencias de Jalisco', '#f4c430'], [L(29) + 3.6, 'FINALISTA', 'Rise', KC.pink]].map(([at, a, b, col], k) => {
      const e = kentrada(T, at, f - 0.4, 'pop');
      return T >= at && <div key={k} style={{ position:'absolute', left:560 + k * 300, top:130, width:260, zIndex:14, opacity:e.o, transform:`scale(${e.s}) rotate(${(k - 1) * 4}deg)`, textAlign:'center' }}>
        <svg width="260" height="200"><Medalla x={130} y={130} s={1.1} color={col} cinta={[KC.blue, KC.red, KC.violet][k]} /></svg>
        <div style={{ font:`400 46px ${KF.titulo}`, color:KC.ink }}>{a}</div><div style={{ font:`800 24px ${KF.texto}`, color:KC.ink }}>{b}</div></div>; })}
    <Foto T={T} n="13_robert_bolsas_setas" at={t0 + 0.6} until={L(29) + 0.4} x={260} y={240} w={380} rot={-3} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="13_robert_cartel" at={L(28) + 3.6} until={L(29) + 1} x={1650} y={160} w={300} rot={3} desde="der" marco={false} seed={2} />
    <Foto T={T} n="13_platino_infomatrix" at={L(29) + 0.8} until={f - 0.4} x={250} y={620} w={400} rot={-4} desde="abajo" seed={3} />
    <Foto T={T} n="13_oro_fecijal" at={L(29) + 2.2} until={f - 0.4} x={1660} y={640} w={400} rot={3} desde="der" seed={4} />
    <Foto T={T} n="13_robert_medalla" at={L(29) + 3.0} until={f - 0.4} x={1650} y={90} w={280} rot={-2} desde="arriba" marco={false} seed={5} z={18} />
  </Escena>;
}
function E14({ T }) {
  const t0 = S('E14'), f = F('E14');
  const zoom = kprog(T, t0 + 0.5, L(31) + 1.2, kEase.suave);
  const ESC_T = ['1 m', '1 mm', '1 µm', '1 nm'], ei = Math.min(3, Math.floor(zoom * 4));
  const cep = Math.floor(kprog(T, L(31) + 2.5, f - 0.8) * 30);
  return <Escena T={T} n="E14" fondo={KC.blue} patron="puntos" color2="rgba(255,255,255,.14)">
    <Svg>
      {/* microscopio */}
      <g transform="translate(560 160)"><rect x="-20" y="320" width="200" height="40" rx="10" fill="#ddd" stroke={KC.ink} strokeWidth="7" />
        <path d="M 120 320 Q 160 220 100 140" stroke="#ddd" strokeWidth="34" fill="none" /><path d="M 120 320 Q 160 220 100 140" stroke={KC.ink} strokeWidth="4" fill="none" />
        <rect x="40" y="20" width="56" height="170" rx="14" fill="#fff" stroke={KC.ink} strokeWidth="7" transform="rotate(-20 68 105)" /><rect x="0" y="240" width="150" height="16" fill="#ddd" stroke={KC.ink} strokeWidth="5" /></g>
      {/* círculos de acercamiento */}
      {cep === 0 && [0, 1, 2, 3].map((k) => { const v = kclamp(zoom * 4 - k, 0, 1); return v > 0 && <g key={k} transform={`translate(${900 + k * 150} ${300 - k * 10}) scale(${v})`}>
        <circle r={110 - k * 10} fill={['#fff', '#d6f5ff', '#1a2a55', '#0E0F12'][k]} stroke="#fff" strokeWidth="6" />
        {k === 0 && <Seta x={0} y={50} s={0.9} color="#e9dfd2" />}
        {k === 1 && Array.from({ length: 10 }, (_, j) => <path key={j} d={`M ${-60 + j * 12} 40 q 20 -40 ${10 + j * 2} -80`} stroke="#fff" strokeWidth="4" fill="none" />)}
        {k === 1 && <path d="M -60 40 q 40 -60 80 -20 t 40 -40" stroke="#8fb3c9" strokeWidth="6" fill="none" />}
        {k === 2 && [0, 1, 2, 3].map((j) => <ellipse key={j} cx={-40 + j * 26} cy={(j % 2) * 30 - 10} rx="14" ry="22" fill="#7cf2a4" opacity="0.8" />)}
        {k === 3 && Array.from({ length: 30 }, (_, j) => <circle key={j} cx={Math.cos(j) * 60 * Math.sin(j * 3)} cy={Math.sin(j) * 60 * Math.cos(j * 2)} r="5" fill="#ffd36b" />)}
      </g>; })}
      {/* el cepario: una biblioteca de tubos */}
      {cep > 0 && Array.from({ length: 30 }, (_, k) => k < cep && <g key={k} transform={`translate(${880 + (k % 10) * 54} ${150 + Math.floor(k / 10) * 140}) scale(${kclamp((cep - k) * 0.5, 0, 1)})`}>
        <rect x="-16" y="-50" width="32" height="100" rx="16" fill="rgba(230,245,255,.9)" stroke={KC.ink} strokeWidth="4" />
        <rect x="-16" y="10" width="32" height="40" rx="10" fill={['#ffd36b', '#ff8fb3', '#7cf2a4', '#fff'][k % 4]} /><rect x="-19" y="-64" width="38" height="18" rx="4" fill={[KC.red, KC.blue, KC.orange, KC.violet][k % 4]} stroke={KC.ink} strokeWidth="3" /></g>)}
    </Svg>
    {cep === 0 && <Pill T={T} at={t0 + 0.8} until={L(31) + 2.2} x={1180} y={470} fondo={KC.ink}>escala: {ESC_T[ei]}</Pill>}
    <Pill T={T} at={L(30) + 0.3} until={f - 0.3} x={960} y={60} fondo={KC.yellow} color={KC.ink} borde={KC.ink}>Ingeniería en Biotecnología</Pill>
    <Pill T={T} at={L(31) + 1.2} until={L(31) + 3.6} x={1180} y={470} fondo={KC.pink} borde={KC.ink}>MIT.nano · curso de nanotecnología</Pill>
    <Pill T={T} at={L(31) + 3.8} until={f - 0.3} x={1150} y={470} fondo={KC.mint} color={KC.ink} borde={KC.ink}>Cepario · Carrillo Biorefinery Lab</Pill>
    <Foto T={T} n="14_excelencia_98_72" at={L(30) + 2.6} until={L(31) + 2} x={250} y={130} w={300} rot={-4} desde="izq" pie="Excelencia Académica" seed={1} />
    <Foto T={T} n="14_robert_seta_gigante" at={t0 + 0.6} until={L(30) + 3} x={1650} y={120} w={420} rot={2} desde="der" marco={false} seed={2} />
    <Foto T={T} n="14_robert_campana_tec" at={L(31) + 3.6} until={f - 0.4} x={1680} y={120} w={380} rot={3} desde="der" marco={false} seed={3} />
    <Foto T={T} n="14_cepario_placas" at={L(31) + 4.6} until={f - 0.4} x={270} y={640} w={400} rot={-3} desde="abajo" pie="Cepas del laboratorio" seed={4} />
    <Foto T={T} n="14_robert_placa" at={L(31) + 5.4} until={f - 0.4} x={1660} y={620} w={320} rot={4} desde="der" seed={5} />
  </Escena>;
}
function E15({ T }) {
  const t0 = S('E15'), f = F('E15');
  const color = kprog(T, L(32) + 1.4, L(32) + 3.4, kEase.suave);
  const nEst = Math.floor(kprog(T, L(33) + 0.4, L(33) + 3.4) * 50), logo = kprog(T, L(33) + 6.5, L(33) + 7.3, kEase.rebote);
  return <Escena T={T} n="E15" fondo={`linear-gradient(${C.gris}, ${C.gris})`} patron="ninguno">
    <div style={{ position:'absolute', inset:0, background:KC.mint, opacity:color }}></div>
    <Svg>
      <g transform="translate(560 120)" style={{ filter:`saturate(${color})` }}>
        <rect x="0" y="60" width="800" height="360" fill="none" stroke={KC.ink} strokeWidth="8" />
        <path d={`M 0 60 L 800 60 L 800 ${color > 0.5 ? 60 : 160} Q 400 ${color > 0.5 ? 90 : 260} 0 ${color > 0.5 ? 60 : 120} Z`} fill={color > 0.5 ? '#2e2e2e' : '#bbb'} opacity="0.85" />
        {color > 0.3 && Array.from({ length: 8 }, (_, k) => <g key={k} transform={`translate(${70 + k * 95} ${110 + (1 - kprog(T, L(32) + 2 + k * 0.2, L(32) + 2.6 + k * 0.2, kEase.rebote)) * -300})`}>
          <line x1="0" y1="-50" x2="0" y2="0" stroke={KC.ink} strokeWidth="4" /><rect x="-26" y="0" width="52" height="110" rx="14" fill="#222" stroke={KC.ink} strokeWidth="4" />
          <Seta x={-24} y={50} s={0.45} rot={-80} color="#e9dfd2" /><Seta x={24} y={80} s={0.4} rot={80} color="#e9dfd2" /></g>)}
      </g>
      {/* 50 estudiantes */}
      {Array.from({ length: 50 }, (_, k) => k < nEst && <g key={k} transform={`translate(${600 + (k % 25) * 30} ${525 + Math.floor(k / 25) * 28})`}>
        <circle cx={0} cy={-36 - Math.floor(k / 25) * 0} r="9" fill={['#ffd36b', '#ff8fb3', '#7cf2a4', '#5aa0ff'][k % 4]} stroke={KC.ink} strokeWidth="3" /></g>)}
    </Svg>
    <Cuenta T={T} at={L(33) + 0.4} until={L(33) + 6.2} hasta={50} dur={3} x={960} y={40} tam={74} color="#fff" etiqueta="estudiantes" />
    <Pill T={T} at={L(33) + 3.6} until={L(33) + 6.4} x={1300} y={130} fondo={KC.violet}>💬 tutor de inteligencia artificial</Pill>
    <Pill T={T} at={L(32) + 0.6} until={L(33)} x={960} y={50} fondo={KC.blue}>Fondo Ruta Azul</Pill>
    {logo > 0 && <div style={{ position:'absolute', left:960, top:250, zIndex:25, transform:`translate(-50%, 0) scale(${logo})`, background:'#fff', borderRadius:30, padding:'18px 40px', border:`6px solid ${KC.ink}`,
      font:`400 96px ${KF.titulo}`, color:'#2f8f4e', boxShadow:'0 20px 40px rgba(0,0,0,.35)' }}>🍄 FUNGI MATI</div>}
    <Foto T={T} n="15_granja_antes" at={L(32) + 0.2} until={L(32) + 3.6} x={260} y={150} w={360} rot={-4} desde="izq" pie="Antes" seed={1} />
    <Foto T={T} n="15_granja_despues" at={L(32) + 2.6} until={f - 0.4} x={1650} y={150} w={360} rot={3} desde="der" pie="Después" seed={2} />
    <Foto T={T} n="15_curso_estudiantes" at={L(33) + 0.8} until={f - 0.4} x={280} y={640} w={440} rot={-3} desde="abajo" pie="El curso con 50 estudiantes" seed={3} />
    <Foto T={T} n="15_robert_cosecha" at={L(33) + 4.4} until={f - 0.4} x={1640} y={560} w={420} rot={2} desde="der" marco={false} seed={4} />
    <Foto T={T} n="15_cosecha_granja" at={L(32) + 4} until={L(33) + 4} x={300} y={300} w={300} rot={5} desde="izq" seed={5} z={18} />
  </Escena>;
}
function E16({ T }) {
  const t0 = S('E16'), f = F('E16');
  const tarjeta = (at, anio, titulo, linea, col, x) => { if (T < at) return null; const e = kentrada(T, at, f - 0.4, 'pop');
    return <div style={{ position:'absolute', left:x, top:110, width:440, zIndex:12, opacity:e.o, transform:`translateY(${e.y}px) scale(${e.s}) rotate(${mece(T, x, 0.1) * 1.5}deg)`,
      background:'#fff', borderRadius:28, border:`6px solid ${KC.ink}`, padding:'26px 30px', boxShadow:'0 20px 40px rgba(0,0,0,.3)' }}>
      <div style={{ font:`400 88px/1 ${KF.titulo}`, color:col }}>{anio}</div>
      <div style={{ font:`900 34px/1.15 ${KF.texto}`, color:KC.ink, marginTop:10 }}>{titulo}</div>
      <div style={{ font:`700 26px/1.25 ${KF.texto}`, color:'#444', marginTop:10 }}>{linea}</div></div>; };
  return <Escena T={T} n="E16" fondo={KC.yellow} patron="rayas" color2="rgba(255,255,255,.25)">
    {tarjeta(L(34) + 0.5, '2026', 'Equitech Futures', 'Fungi Mati entre los 6 mejores de más de 100 proyectos', KC.pink, 470)}
    {tarjeta(L(35) + 0.3, '2026', 'beVisioneers', 'La beca de Mercedes-Benz, entre unas 20,000 personas', KC.blue, 1010)}
    <Foto T={T} n="16_rise_spotlight" at={L(34) + 1.4} until={f - 0.4} x={230} y={160} w={300} rot={-4} desde="izq" seed={1} />
    <Foto T={T} n="16_bevisioneers" at={L(35) + 1.2} until={f - 0.4} x={1680} y={600} w={380} rot={3} desde="der" seed={2} />
  </Escena>;
}
function E17({ T }) {
  const t0 = S('E17'), f = F('E17');
  const deshace = kprog(T, L(36) + 1.6, L(36) + 3.4, kEase.suave), brota = kprog(T, L(36) + 3.6, L(36) + 5.4, kEase.rebote);
  return <Escena T={T} n="E17" fondo={`linear-gradient(#ffb347, ${KC.orange})`} patron="puntos" color2="rgba(255,255,255,.18)">
    <Svg>
      <rect x="0" y="560" width={W} height="520" fill="#c27a3e" />
      {/* agave que se deshace en fibras */}
      <g transform="translate(960 520)">
        {Array.from({ length: 11 }, (_, k) => { const a = -150 + k * 12, l = 230 - Math.abs(k - 5) * 18;
          return <path key={k} d={`M 0 0 L ${Math.cos(a * Math.PI / 180) * l} ${Math.sin(a * Math.PI / 180) * l}`} stroke={deshace > 0.5 ? '#d6a65a' : '#4f9e7a'} strokeWidth={deshace > 0.5 ? 8 : 30} strokeLinecap="round"
            transform={`translate(${deshace * Math.cos(k) * 160} ${deshace * (60 + (k % 3) * 20)}) rotate(${deshace * (k - 5) * 14 + mece(T, k, 0.3) * 3})`} />; })}
        {[[-120, 40], [-40, 30], [50, 36], [130, 42], [0, 20]].map(([x, y], k) => <Seta key={k} x={x} y={y} s={brota * (0.9 + (k % 2) * 0.3)} color="#efe6d6" rot={(k - 2) * 8} />)}
      </g>
    </Svg>
    <Cuenta T={T} at={L(36) + 0.6} until={f - 0.3} hasta={1} dur={0.5} x={600} y={120} tam={110} color="#fff" suf=" t" etiqueta="de bagazo de agave" />
    <Pill T={T} at={L(36) + 3.0} until={f - 0.3} x={1300} y={150} fondo={KC.red} borde="#fff" tam={44}>PRÓXIMAMENTE</Pill>
    <Foto T={T} n="17_bagazo_destileria" at={t0 + 0.4} until={f - 0.4} x={240} y={170} w={340} rot={-4} desde="izq" pie="Bagazo afuera de una tequilera" seed={1} />
    <Foto T={T} n="17_bloques_sustrato" at={L(36) + 3.6} until={f - 0.4} x={1680} y={560} w={380} rot={3} desde="der" marco={false} seed={2} />
  </Escena>;
}
const HEXS = [[0, -95.3, '#2563a8'], [-82.5, -47.6, '#d13b3b'], [-82.5, 47.6, '#3fa356'], [0, 95.3, '#f2a71b']];
function E18({ T }) {
  const t0 = S('E18'), f = F('E18');
  const arma = kprog(T, t0 + 0.6, L(38) - 0.2), logo = kprog(T, L(38) - 0.4, L(38) + 0.4, kEase.suave);
  return <Escena T={T} n="E18" fondo={KC.paper} patron="cuadros" color2="rgba(0,0,0,.06)">
    <Svg>
      <g transform="translate(960 330) scale(1.5)" opacity={1 - logo}>
        {HEXS.map(([x, y, col], k) => { const p = kEase.rebote(kclamp(arma * 4 - k, 0, 1)); const a = k * 1.7;
          return <Hex key={k} x={x + Math.cos(a) * 600 * (1 - p)} y={y + Math.sin(a) * 400 * (1 - p)} r={55} fill={col} o={p} />; })}
      </g>
    </Svg>
    {logo > 0 && <img src="assets/logo_color.svg" style={{ position:'absolute', left:960 - 255, top:330 - 270, width:510, zIndex:8, opacity:logo, transform:`scale(${klerp(0.9, 1, logo) + 0.02 * Math.sin(T * 2)})` }} />}
    <Titulo T={T} at={L(37)} until={L(38) - 0.3} x={960} y={580} tam={70} color={KC.ink}>¿QUÉ ES LA CREACIÓN DEL ROBERT?</Titulo>
    <div style={{ position:'absolute', left:1350, top:230, zIndex:20, opacity:kprog(T, L(38) + 1.2, L(38) + 1.7), transform:`rotate(3deg) scale(${klerp(0.6, 1, kprog(T, L(38) + 1.2, L(38) + 1.8, kEase.rebote))})`,
      background:'#fff', border:`5px solid ${KC.ink}`, borderRadius:18, padding:'18px 24px', width:420, boxShadow:'0 16px 30px rgba(0,0,0,.25)' }}>
      <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink }}>✔ Cada dato</div>
      <div style={{ font:`700 24px ${KF.mono}`, color:'#555', marginTop:8 }}>Fuente: artículo publicado, año, revista</div></div>
  </Escena>;
}
const SERIES = [['Biotecnología', KC.pink], ['Hongos · Fungi Mati', '#2f8f4e'], ['Ambiente', KC.teal], ['Inteligencia artificial', KC.violet], ['Química', KC.orange], ['Ciencia en general', KC.blue]];
function E19({ T }) {
  const t0 = S('E19'), f = F('E19'), d = LE(39) - L(39);
  const sem = kprog(T, L(40), L(40) + 0.6, kEase.rebote);
  return <Escena T={T} n="E19" fondo={KC.violet} patron="puntos" color2="rgba(255,255,255,.1)">
    <img src="assets/logo_color.svg" style={{ position:'absolute', left:960 - 160, top:330 - 170, width:320, zIndex:8, transform:`scale(${1 + 0.03 * Math.sin(T * 2)}) rotate(${mece(T, 1, 0.1) * 3}deg)`, filter:'drop-shadow(0 0 30px rgba(255,255,255,.35))' }} />
    <Svg>
      {SERIES.map(([n, col], k) => { const a = -Math.PI / 2 + k * Math.PI / 3, x = 960 + Math.cos(a) * 470, y = 330 + Math.sin(a) * 230;
        const on = kprog(T, L(39) + 1 + k * (d - 1.5) / 6, L(39) + 1.4 + k * (d - 1.5) / 6, kEase.rebote);
        return <g key={k}><line x1="960" y1="330" x2={x} y2={y} stroke="#fff" strokeWidth="4" strokeDasharray="10 10" opacity={on * 0.6} />
          <Hex x={x} y={y} r={92} fill={on > 0.5 ? col : '#3a2a6e'} stroke="#fff" sw={6} s={klerp(0.5, 1, on)} o={0.3 + 0.7 * on}>
            <foreignObject x="-86" y="-40" width="172" height="80"><div style={{ font:`900 22px/1.1 ${KF.texto}`, color:'#fff', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', height:80 }}>{n}</div></foreignObject></Hex></g>; })}
    </Svg>
    {sem > 0 && <div style={{ position:'absolute', left:960, top:470, zIndex:20, transform:`translate(-50%, 0) scale(${sem})`, background:KC.yellow, color:KC.ink, borderRadius:20, border:`5px solid ${KC.ink}`,
      padding:'12px 30px', font:`400 54px ${KF.titulo}` }}>▶ CADA SEMANA · VIDEO LARGO</div>}
  </Escena>;
}
function E20({ T }) {
  const t0 = S('E20'), f = F('E20');
  const arbol = kprog(T, t0 + 0.3, t0 + 4, kEase.sale);
  const MAG = ['MAGNÍFICO DÍA', 'MAGNÍFICA SEMANA', 'MAGNÍFICO MES', 'MAGNÍFICO AÑO', 'MAGNÍFICA VIDA'];
  const pal = (LE(41) - L(41));
  return <Escena T={T} n="E20" fondo={`linear-gradient(${C.sky}, #e6f8ff)`} color2="rgba(255,255,255,.35)">
    <Svg>
      <rect x="0" y="880" width={W} height="200" fill={C.grass} stroke={KC.ink} strokeWidth="8" />
      <g transform="translate(960 880)">
        <path d={`M -30 0 L -22 ${-380 * arbol} L 22 ${-380 * arbol} L 30 0 Z`} fill="#7a4a2a" stroke={KC.ink} strokeWidth="7" />
        {[[-150, -420, 160], [150, -430, 170], [0, -520, 190], [-60, -330, 130], [90, -330, 130]].map(([x, y, r], k) => { const g = kclamp(arbol * 1.4 - k * 0.1, 0, 1);
          return <circle key={k} cx={x * g} cy={y * arbol} r={r * g} fill={k % 2 ? C.leaf : C.leaf2} stroke={KC.ink} strokeWidth="7" transform={`rotate(${mece(T, k, 0.2) * 2})`} />; })}
        {arbol > 0.9 && [[-120, -460], [100, -500], [10, -600], [180, -380]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={16} fill={KC.red} stroke={KC.ink} strokeWidth="4" />)}
      </g>
    </Svg>
    {MAG.map((m, k) => { const at = L(41) + 1.6 + k * (pal - 2.2) / 5; const e = kentrada(T, at, F('E20') + 0.3, 'pop');
      return T >= at && <div key={k} style={{ position:'absolute', left:[330, 1560, 330, 1560, 960][k], top:[140, 140, 420, 420, 40][k], zIndex:20, opacity:e.o,
        transform:`translate(-50%, 0) scale(${e.s * (k === 4 ? 1.25 : 1)}) rotate(${(k % 2 ? 4 : -4)}deg)`, background:k === 4 ? KC.pink : '#fff', color:k === 4 ? '#fff' : KC.ink,
        border:`5px solid ${KC.ink}`, borderRadius:20, padding:'10px 26px', font:`400 54px ${KF.titulo}`, whiteSpace:'nowrap' }}>{m}</div>; })}
    <Foto T={T} n="20_robert_sonriendo_bolsas" at={t0 + 0.6} until={L(41) + 3} x={300} y={560} w={380} rot={-3} desde="izq" marco={false} seed={1} />
    <Foto T={T} n="20_robert_seta_final" at={L(41) + 3.2} until={F('E20') + 2} x={1640} y={560} w={400} rot={3} desde="der" marco={false} seed={2} />
  </Escena>;
}
// Cierre de marca (horizontal): logo, nombre, usuario y Robert apuntando a cámara.
function CierreH({ T }) {
  const at = S('Outro') - 0.2; if (T < at) return null;
  const osc = kprog(T, at, at + 0.7, kEase.suave), s = klerp(0.5, 1, kprog(T, at + 0.2, at + 0.8, kEase.rebote)), t2 = kprog(T, at + 0.6, at + 1.1, kEase.sale);
  return <div style={{ position:'absolute', inset:0, zIndex:70, background:`rgba(8,9,12,${0.82 * osc})`, display:'flex', alignItems:'center', justifyContent:'center', gap:60 }}>
    <div style={{ background:'#fff', borderRadius:44, padding:22, transform:`scale(${s})`, opacity:osc }}><img src="assets/logo_color.svg" style={{ width:300, height:300, display:'block' }} /></div>
    <div style={{ opacity:t2, transform:`translateX(${(1 - t2) * 40}px)` }}>
      <div style={{ font:`400 110px/1 ${KF.titulo}`, color:'#fff' }}>La Creación del Robert</div>
      <div style={{ font:`900 46px ${KF.texto}`, color:KC.gold2, marginTop:16 }}>Suscríbete para más ciencia</div>
      <div style={{ font:`700 34px ${KF.mono}`, color:'rgba(246,243,236,.8)', marginTop:12 }}>@lacreaciondelrobert</div></div>
    <img src={ST('02_apuntando_camara')} style={{ position:'absolute', right:30, bottom:-30, width:440, opacity:osc, transform:`translateY(${(1 - kprog(T, at + 0.3, at + 0.9, kEase.rebote)) * 600}px)`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />
  </div>;
}

// Robert (stickers) en todo el video: cada 8–10 s, poses distintas, nunca la misma dos veces seguidas.
function apariciones() {
  const a = (n, dt, d, pose, lado) => [S(n) + dt, S(n) + dt + d, pose, lado];
  return [
    [0, 4.2, '05_sonriendo_dientes_uniformes', 'gancho'],
    a('E01', 11.4, 3.2, '13_senalando_arriba', 'der'),
    a('E02', 3.2, 4, '11_sorprendido', 'der'),
    a('E03', 8.2, 4, '03_aburrido_manos_mejillas', 'izq'),
    a('E04', 1.2, 3.4, '06_pensativo_menton', 'der'),
    a('E04', 12.6, 4, '11_sorprendido', 'presentador'),
    a('E05', 2.4, 3.6, '04_bajando_lentes', 'izq'),
    a('E06', 1.0, 3.2, '05_sonriendo_dientes_uniformes', 'der'),
    a('E07', 5.2, 4, '07_pensativo_puno', 'izq'),
    a('E08', 1.6, 3.2, '04_bajando_lentes', 'der'),
    a('E09', 2.2, 4.4, '10_serio_molesto', 'presentador'),
    a('E09', 13.6, 3.2, '08_recostado_mano', 'izq'),
    a('E10', 6.2, 4, '13_senalando_arriba', 'der'),
    a('E11', 1.6, 3.4, '06_pensativo_menton', 'izq'),
    a('E12', 1.2, 4, '12_perfil_serio', 'der'),
    a('E12', 14.2, 4.6, '11_sorprendido', 'presentador'),
    a('E13', 5.4, 4, '05_sonriendo_dientes_uniformes', 'der'),
    a('E14', 6.4, 3.6, '07_pensativo_puno', 'izq'),
    a('E15', 7.6, 4, '13_senalando_arriba', 'der'),
    a('E16', 4.2, 4, '04_bajando_lentes', 'izq'),
    a('E17', 1.4, 3.6, '06_pensativo_menton', 'der'),
    a('E18', 1.4, 4, '07_pensativo_puno', 'izq'),
    a('E19', 6.2, 4, '13_senalando_arriba', 'der'),
    a('E20', 1.0, 4, '05_sonriendo_dientes_uniformes', 'izq'),
  ];
}

function Largo00() {
  const { T } = useComposition();
  const ap = React.useMemo(apariciones, []);
  return <div style={{ position:'absolute', left:0, top:0, width:W, height:H, overflow:'hidden', background:'#000' }}>
    <E01 T={T} /><E02 T={T} /><E03 T={T} /><E04 T={T} /><E05 T={T} /><E06 T={T} /><E07 T={T} /><E08 T={T} /><E09 T={T} /><E10 T={T} />
    <E11 T={T} /><E12 T={T} /><E13 T={T} /><E14 T={T} /><E15 T={T} /><E16 T={T} /><E17 T={T} /><E18 T={T} /><E19 T={T} /><E20 T={T} />
    {LN.map((_, i) => <SubH key={i} T={T} idx={i} />)}
    <RobertH T={T} ap={ap} />
    <MarcaH T={T} />
    <CierreH T={T} />
  </div>;
}
function Largo00App() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Largo00 /></CompositionStage>
  </div>;
}
window.Largo00App = Largo00App;
