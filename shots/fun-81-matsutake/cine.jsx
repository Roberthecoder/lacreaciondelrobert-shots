// MODO CINE (22 nov 2026) — capa de estilo que se carga DESPUÉS de todos los kits (kit-robert, fungi-kit…) y antes del .jsx del shot.
// Por qué existe: la comparación con 1Cell1Life / 1Bit1Pixel (mismos ganchos y duración que nosotros,
// mediana de 126 mil vistas por Short contra ~800 nuestras) mostró que la diferencia está en la imagen:
// ellos usan fondo oscuro continuo, un solo punto de atención, casi nada de texto y nadie tapando la escena.
// Esta capa cambia eso de raíz sin tocar la voz ni los tiempos:
//   1. Todos los fondos pasan a oscuro, con un tinte leve del color de marca de la escena.
//   2. Subtítulo chico, sin caja, debajo del sujeto (ya no tapa el dibujo).
//   3. Robert sale solo en la tarjeta de cierre (el sticker tapaba ~30 % del tiempo el punto de atención).
//   4. Tarjetas y chips de papel pasan a vidrio oscuro; contornos negros pasan a línea clara.
// Para apagarla en un shot: quitar ./cine.jsx de la línea <x-import> de su .dc.html.

const CINE = { fondo: '#0a0f1c', borde: '#070a12', linea: '#dfe7ff', texto: '#f3f6ff', acento: '#ffd166' };
// Interruptores (22 nov 2026, tras revisar tres videos de la referencia cuadro por cuadro: no llevan subtítulo quemado ni
// logo durante el video, y sus trazos tienen un resplandor suave). Cambiar aquí afecta a todos los shots al re-renderizar.
const CINE_OPC = { subtitulos: false, logo: true, resplandor: true, volumen: true };
const CINE_ENC = { max: 1.7, ancho: 0.93, alto: 0.72, centroY: 0.47, bajar: 0.17 };
// Referencia 22 nov 2026 (6 videos revisados segundo a segundo: 1Cell1Life óvulo/zinc, barba/calvicie, piojo; 1Bit1Pixel vida en
// semanas, ir a 120, granjero): paleta apagada, etiquetas de texto chico monoespaciado con borde fino, números grandes blancos con
// una línea chica abajo y la barra de escala siempre abajo a la izquierda.
const CINE_REF = { saturacion: 0.8, escalaX: 60, escalaY: 1500 };
const CINE_VOL = { suave: 8, relieve: 9, brillo: 0.5, halo: 12, haloFuerza: 0.5 };

function cineMix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  if (!/^#[0-9a-f]{6}$/i.test(a) || !/^#[0-9a-f]{6}$/i.test(b)) return b;
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

// Los contornos del kit usan KC.ink (negro). Sobre fondo oscuro se pierden: pasan a línea clara.
KC.ink = CINE.linea;
KC.paper = '#131b2e';

// Fondo oscuro con motas que flotan despacio: ninguna escena se queda sin movimiento (como en la referencia).
// Escenas de «Pregunta» (el re-gancho de ~2 s): en casi todos los shots eran una lámina (un signo de interrogación sobre
// un fondo vacío). Ahora la escena anterior se queda en pantalla, atenuada bajo un velo, y la pregunta va encima:
// el sujeto del video nunca desaparece. CineCtx le avisa al fondo que debe ser velo y no fondo opaco.
const CineCtx = React.createContext({ velo: false, a: null });

function FondoMarca({ color = '#1b2a44', patron = 'puntos', T }) {
  const ctx = React.useContext(CineCtx);
  const comp = typeof useComposition === 'function' ? useComposition() : null;
  if (ctx && ctx.velo) return <div style={{ position:'absolute', inset:0, background:'rgba(8,12,22,.46)' }}></div>;
  // Disolvencia larga: el fondo de una escena nueva tarda ~1.2 s en volverse sólido, y mientras tanto la escena anterior
  // (que dura 0.9 s más) se sigue viendo detrás. Así no hay pantalla vacía mientras entra el dibujo nuevo.
  const tt = T != null && T !== 0 ? T : (comp ? comp.T : 0);
  const solido = ctx && ctx.a != null && ctx.a > 0.5 ? 0.25 + 0.75 * kprog(tt, ctx.a + 0.25, ctx.a + 1.2, kEase.suave) : 1;
  const t = T != null && T !== 0 ? T : (comp ? comp.T : 0);
  const tinte = patron === 'oscuro' ? '#18233a' : cineMix(color, CINE.fondo, 0.8);
  const seed = [...String(color)].reduce((a, ch) => a + ch.charCodeAt(0), 3);
  return <div style={{ position:'absolute', inset:0, opacity:solido, background:`radial-gradient(ellipse 90% 60% at 50% 46%, ${tinte} 0%, ${CINE.fondo} 62%, ${CINE.borde} 100%)` }}>
    <Ambiente T={t} n={26} seed={seed} color="rgba(223,231,255,.2)" tam={[3, 9]} vel={16} />
  </div>;
}

// La cámara nunca está quieta (toda escena avanza al menos 10 %) y la escena previa a una «Pregunta» dura hasta que
// la pregunta termina. Vale para Escena y sus variantes de otros kits.
function cineEscena(Kit) {
  return function EscenaCine(p) {
    const comp = typeof useComposition === 'function' ? useComposition() : null;
    let b = p.b, velo = false, gancho = false;
    if (comp && comp.CUES) {
      const cs = Object.entries(comp.CUES).sort((x, y) => x[1] - y[1]);
      const iA = cs.findIndex((c) => Math.abs(c[1] - p.a) < 0.08), iB = cs.findIndex((c) => Math.abs(c[1] - p.b) < 0.08);
      if (iA >= 0 && /^Pregunta/i.test(cs[iA][0])) velo = true;
      if (iA >= 0 && /^Gancho/i.test(cs[iA][0])) gancho = true;
      if (!velo && iB >= 0 && /^Pregunta/i.test(cs[iB][0]) && cs[iB + 1]) b = cs[iB + 1][1];
      else if (!velo && iB >= 0 && !/^Outro/i.test(cs[iB][0])) b = p.b + 0.9;   // disolvencia larga hacia la escena que sigue
    }
    // El gancho es donde se decide si la gente se queda: ahí la cámara entra más (20 %).
    const zf = Math.max(p.zoom == null ? 0.05 : p.zoom, gancho ? 0.2 : 0.1);
    // Encuadre automático: motor/kit/encuadrar.py midió, escena por escena, la caja que ocupa el dibujo; aquí se agranda
    // y se centra para que el sujeto llene el cuadro (regla del modo cine), sin que nada se salga.
    let enc = null;
    const E = window.CINE_ENCUADRE;
    if (E && !window.CINE_SIN_ENCUADRE && comp && comp.CUES) {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0;
      Object.entries(comp.CUES).forEach(([nom, t]) => { const c = E[nom]; if (c && t >= p.a - 0.08 && t < p.b - 0.08) { x0 = Math.min(x0, c[0]); y0 = Math.min(y0, c[1]); x1 = Math.max(x1, c[2]); y1 = Math.max(y1, c[3]); n++; } });
      if (n) {
        const w = Math.max(40, x1 - x0), h = Math.max(40, y1 - y0);
        const k = Math.min(CINE_ENC.max, (KW * CINE_ENC.ancho) / (w * (1 + zf)), (KH * CINE_ENC.alto) / (h * (1 + zf)));
        const kk = k >= 1.06 ? k : 1, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
        const dx = Math.min(0, Math.max(KW * (1 - kk), KW / 2 - kk * cx));
        // Hacia abajo sí se permite bajar el dibujo aunque no se agrande: los shots dejaban libre la franja del subtítulo
        // viejo y por eso todo quedaba en la mitad de arriba. La franja que se descubre arriba se rellena con el fondo.
        const dy = Math.min(KH * CINE_ENC.bajar, Math.max(KH * (1 - kk), KH * CINE_ENC.centroY - kk * cy));
        if (kk > 1 || dy > 24) enc = { k: kk, dx, dy: dy > 0 && dy <= 24 ? 0 : dy };
      }
    }
    const hijos = enc ? <React.Fragment>{enc.dy > 0 ? <div style={{ position:'absolute', inset:0, background:CINE.fondo }}></div> : null}<div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transform:`translate(${enc.dx}px,${enc.dy}px) scale(${enc.k})`, transformOrigin:'0 0' }}>{p.children}</div></React.Fragment> : p.children;
    // El `fondo` de color de la Escena se veía como un destello saturado al entrar (durante la disolvencia): pasa a su versión oscura.
    const fondo = (typeof p.fondo === 'string' && /^#[0-9a-f]{6}$/i.test(p.fondo)) ? cineMix(p.fondo, CINE.fondo, 0.82) : p.fondo;
    const el = Kit({ ...p, b, fondo, zoom: window.CINE_MIDIENDO ? 0 : zf, children: hijos });
    return el ? <CineCtx.Provider value={{ velo, a: p.a, enc }}>{el}</CineCtx.Provider> : null;
  };
}
const Escena = cineEscena(window.Escena);
const CINE_ESCENAS = { Escena };
['EscenaC', 'EscenaD', 'EscenaFundido'].forEach((n) => { if (typeof window[n] === 'function') CINE_ESCENAS[n] = cineEscena(window[n]); });

// Mundos del kit que traían cielo o fondo de color: pasan a su versión oscura.
const CINE_MUNDOS = {};
[['MundoPiel', 'fondo', '#00d2ff'], ['MundoPanMacro', 'fondo', '#ffd92e'], ['MundoSuelo', 'cielo', '#2fe6a7'], ['MundoBiorreactor', 'fondo', '#00d2ff']].forEach(([n, k, d]) => {
  const W = window[n]; if (typeof W === 'function') CINE_MUNDOS[n] = (p) => W({ ...p, [k]: cineMix((p && typeof p[k] === 'string' && /^#[0-9a-f]{6}$/i.test(p[k])) ? p[k] : d, CINE.fondo, 0.78) });
});

function Subtitulo({ T, at, until, texto, idx, color = CINE.acento, tam = 50 }) {
  if (!CINE_OPC.subtitulos) return null;
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); }
    const acc = on; if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    const t0 = at + i * 0.04, e = kprog(T, t0, t0 + 0.25, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 12}px)`, color: acc ? color : CINE.texto }}>{p}</span>;
  });
  // Va en la franja que todos los shots ya dejaban libre para el subtítulo viejo (termina en y≈1350), sin la caja.
  return <div style={{ position:'absolute', left:0, right:0, bottom:570, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:900, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:4,
      font:`800 ${tam}px/1.16 ${KF.texto}`, textAlign:'center', textShadow:'0 2px 0 rgba(0,0,0,.9), 0 0 22px rgba(4,6,12,.95), 0 0 44px rgba(4,6,12,.9)' }}>{palabras}</div>
  </div>;
}

// Robert ya no entra durante el video: solo en la tarjeta de cierre (CierreMarca robert=…). Muchos shots lo ponen con
// <Sticker> directo (o <RobertF>), así que también se apagan.
function Robert() { return null; }
function Sticker() { return null; }
function RobertF() { return null; }

// Texto dentro de los dibujos (SVG): con KC.ink claro, una palabra sobre una pieza blanca (una etiqueta, un frasco) se
// perdería. Un contorno oscuro fino la deja legible sobre cualquier color.
if (typeof document !== 'undefined' && !document.getElementById('cine-css')) {
  const st = document.createElement('style'); st.id = 'cine-css';
  st.textContent = 'svg text{paint-order:stroke;stroke:rgba(7,10,18,.88);stroke-width:5px;stroke-linejoin:round}'
    + (CINE_OPC.resplandor ? ' [data-om-exportable-video-with-duration-secs] svg{filter:' + (CINE_OPC.volumen ? 'url(#cine-vol)' : 'drop-shadow(0 0 7px rgba(150,195,255,.30))') + ' saturate(' + CINE_REF.saturacion + ')}' : '');
  document.head.appendChild(st);
}

// Volumen y línea luminosa (22 nov 2026): la referencia dibuja con sombreado y contornos que brillan; las piezas de los
// shots son rellenos planos. Este filtro se aplica a cada dibujo (SVG) completo y le da, sin tocar ningún shot:
// 1) relieve: luz desde arriba a la izquierda, calculada con la silueta y con los cambios de brillo de adentro;
// 2) brillo especular suave en los bordes que miran a la luz;
// 3) halo del color de cada pieza (no azul fijo), que es lo que hace que la línea "brille" sobre el fondo oscuro.
if (typeof document !== 'undefined' && CINE_OPC.volumen && !document.getElementById('cine-vol-svg')) {
  const d = document.createElement('div'); d.id = 'cine-vol-svg';
  d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML = '<svg width="0" height="0"><defs><filter id="cine-vol" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">'
    + '<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .21 .72 .07 .55 0" result="lum"/>'
    + '<feComposite in="lum" in2="SourceAlpha" operator="in" result="lumIn"/>'
    + '<feGaussianBlur in="lumIn" stdDeviation="' + CINE_VOL.suave + '" result="h"/>'
    + '<feDiffuseLighting in="h" surfaceScale="' + CINE_VOL.relieve + '" diffuseConstant="1.45" lighting-color="#ffffff" result="dif"><feDistantLight azimuth="232" elevation="56"/></feDiffuseLighting>'
    + '<feComposite in="dif" in2="SourceAlpha" operator="in" result="difIn"/>'
    + '<feBlend in="SourceGraphic" in2="difIn" mode="multiply" result="sombra"/>'
    + '<feComposite in="sombra" in2="SourceAlpha" operator="in" result="sombraIn"/>'
    + '<feSpecularLighting in="h" surfaceScale="' + CINE_VOL.relieve + '" specularConstant="' + CINE_VOL.brillo + '" specularExponent="18" lighting-color="#dbe8ff" result="spec"><feDistantLight azimuth="232" elevation="48"/></feSpecularLighting>'
    // una superficie plana también refleja un poco (≈14 %): se resta para que el brillo quede solo en los bordes y las piezas oscuras no se agrisen
    + '<feColorMatrix in="spec" type="matrix" values="2.4 0 0 0 -0.6  0 2.4 0 0 -0.6  0 0 2.4 0 -0.6  0 0 0 2.4 -0.6" result="spec2"/>'
    + '<feComposite in="spec2" in2="SourceAlpha" operator="in" result="specIn"/>'
    + '<feComposite in="sombraIn" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="luz"/>'
    + '<feGaussianBlur in="SourceGraphic" stdDeviation="' + CINE_VOL.halo + '" result="g"/>'
    + '<feColorMatrix in="g" type="matrix" values="1.25 0 0 0 0  0 1.25 0 0 0  0 0 1.25 0 0  0 0 0 ' + CINE_VOL.haloFuerza + ' 0" result="haloC"/>'
    + '<feMerge><feMergeNode in="haloC"/><feMergeNode in="luz"/></feMerge>'
    + '</filter></defs></svg>';
  (document.body || document.documentElement).appendChild(d);
}

function MarcaAgua({ T, num, hasta, tema, logo }) {
  if (!CINE_OPC.logo) return null;
  logo = logo || klogo(tema);
  if (hasta != null && T >= hasta) return null;
  return <div style={{ position:'absolute', left:40, top:190, zIndex:50, opacity:.8 }}>
    <div style={{ background:'#fff', borderRadius:16, padding:6 }}><img src={logo} alt="La Creación del Robert" style={{ width:66, height:66, display:'block' }} /></div>
  </div>;
}

function TarjetaEstudio({ T, at, until, anio, quien, revista, x = KW / 2, y = 600 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:'rgba(16,23,40,.88)', border:`3px solid rgba(223,231,255,.35)`, borderRadius:26, padding:'18px 44px 22px', textAlign:'center', boxShadow:'0 24px 60px rgba(0,0,0,.6)' }}>
    <div style={{ font:`400 104px/1 ${KF.titulo}`, color:CINE.acento }}>{anio}</div>
    {quien && <div style={{ font:`800 32px ${KF.texto}`, color:CINE.texto, marginTop:6 }}>{quien}</div>}
    {revista && <div style={{ font:`700 21px ${KF.mono}`, color:'rgba(223,231,255,.6)', marginTop:8, fontStyle:'italic' }}>{revista}</div>}
  </div>;
}

function MitoTachado({ T, at, tacharEn, until, texto, x = KW / 2, y = 760, tam = 46 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), raya = kprog(T, tacharEn, tacharEn + 0.35, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s}) rotate(${raya * -3}deg)`, opacity:e.o }}>
    <div style={{ position:'relative', background:'rgba(16,23,40,.9)', color:CINE.texto, border:'3px solid rgba(223,231,255,.5)', borderRadius:18, padding:'12px 30px', font:`800 ${tam}px ${KF.texto}`, whiteSpace:'nowrap', opacity:1 - raya * 0.35 }}>
      {texto}
      <div style={{ position:'absolute', left:-12, top:'50%', height:10, width:`calc(${raya * 100}% + 24px)`, background:KC.red, borderRadius:6, transform:'translateY(-50%) rotate(-4deg)' }}></div>
    </div>
  </div>;
}

// La barra de escala va abajo a la izquierda, siempre, como en 1Cell1Life (ya no hay subtítulo con el que choque).
const EscalaKit = window.Escala;
function cineFija(el, enc) {   // deshace el encuadre para una pieza que debe quedarse en su esquina
  return enc && el ? <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transform:`scale(${1 / enc.k}) translate(${-enc.dx}px,${-enc.dy}px)`, transformOrigin:'0 0', pointerEvents:'none' }}>{el}</div> : el;
}
function Escala(p) {
  if (window.CINE_MIDIENDO) return null;
  const enc = React.useContext(CineCtx).enc;
  return cineFija(EscalaKit({ ...p, z: (p.z == null ? 1 : p.z) * (enc ? enc.k : 1), x: CINE_REF.escalaX, y: CINE_REF.escalaY }), enc);
}

// Variantes de otros kits (fungi-kit, series C y D): mismo trato. Por eso cine.jsx va al final de los kits.
function FondoLunares({ color }) { return FondoMarca({ color, patron: 'puntos' }); }
const BarraKit = window.BarraEscala;
function BarraEscala(p) {
  if (!BarraKit || window.CINE_MIDIENDO) return null;
  const enc = React.useContext(CineCtx).enc, L = (p.largo == null ? 200 : p.largo) * (enc ? enc.k : 1);
  return cineFija(BarraKit({ ...p, largo: L, x: CINE_REF.escalaX, y: CINE_REF.escalaY }), enc);
}

// Chips, etiquetas y números grandes al estilo de la referencia (22 nov 2026).
function cineClaro(c) {   // un color de texto oscuro se vuelve claro sobre el fondo oscuro
  const m = /^#([0-9a-f]{6})$/i.exec(String(c || ''));
  if (!m) return CINE.texto;
  const n = parseInt(m[1], 16), l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return l < 110 ? CINE.texto : c;
}
function Chip({ T, at, until, texto, x = KW / 2, y = 420, color, borde = CINE.acento, tam = 40 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) translateY(${e.y * 0.3}px)`, opacity:e.o,
    background:'rgba(10,15,28,.74)', color:cineClaro(color || borde), border:`2px solid ${borde}`, borderRadius:10,
    padding:'8px 18px', font:`600 ${Math.round(Math.min(34, tam * 0.72))}px/1.15 ${KF.mono}`, whiteSpace:'nowrap' }}>{texto}</div>;
}
function Etiqueta({ T, at, until, x, y, texto, it = false, lado = 'der', color = CINE.texto, tam = 34 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:10,
    flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:64 * kprog(T, at, at + 0.4, kEase.sale), height:2, background:cineClaro(color), opacity:.8 }}></div>
    <div style={{ font:`700 ${Math.round(tam * 0.82)}px ${it ? KF.mono : KF.texto}`, fontStyle: it ? 'italic' : 'normal', textTransform: it ? 'none' : 'uppercase',
      letterSpacing: it ? 0 : '.04em', color:cineClaro(color), whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}
function NumeroGigante({ T, at, until, valor, desde = 0, dur = 0.9, dec = 0, prefijo = '', sufijo = '', etiqueta, x = KW / 2, y = 560, tam = 300 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), v = klerp(desde, valor, kprog(T, at, at + dur, kEase.sale));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) translateY(${e.y * 0.3}px)`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`800 ${Math.round(tam * 0.62)}px/0.95 ${KF.texto}`, color:CINE.texto, letterSpacing:'-.01em', whiteSpace:'nowrap' }}>{prefijo}{kformato(v, dec)}{sufijo}</div>
    {etiqueta && <div style={{ font:`500 30px ${KF.mono}`, color:'rgba(223,231,255,.72)', marginTop:12 }}>{etiqueta}</div>}
  </div>;
}

Object.assign(window, { Chip, Etiqueta, NumeroGigante, CINE_REF });
Object.assign(window, CINE_ESCENAS, CINE_MUNDOS, { CINE, CINE_OPC, cineMix, CineCtx, FondoMarca, FondoLunares, Sticker, RobertF, Subtitulo, Robert, MarcaAgua, TarjetaEstudio, MitoTachado, Escala, BarraEscala });
