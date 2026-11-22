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
function FondoMarca({ color = '#1b2a44', patron = 'puntos', T }) {
  const comp = typeof useComposition === 'function' ? useComposition() : null;
  const t = T != null && T !== 0 ? T : (comp ? comp.T : 0);
  const tinte = patron === 'oscuro' ? '#18233a' : cineMix(color, CINE.fondo, 0.8);
  const seed = [...String(color)].reduce((a, ch) => a + ch.charCodeAt(0), 3);
  return <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 60% at 50% 46%, ${tinte} 0%, ${CINE.fondo} 62%, ${CINE.borde} 100%)` }}>
    <Ambiente T={t} n={26} seed={seed} color="rgba(223,231,255,.2)" tam={[3, 9]} vel={16} />
  </div>;
}

// La cámara nunca está quieta: toda escena avanza hacia el sujeto al menos 10 %.
const EscenaKit = window.Escena;
function Escena(p) { return EscenaKit({ ...p, zoom: Math.max(p.zoom == null ? 0.05 : p.zoom, 0.1) }); }

function Subtitulo({ T, at, until, texto, idx, color = CINE.acento, tam = 50 }) {
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
  st.textContent = 'svg text{paint-order:stroke;stroke:rgba(7,10,18,.88);stroke-width:5px;stroke-linejoin:round}';
  document.head.appendChild(st);
}

function MarcaAgua({ T, num, hasta, tema, logo }) {
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

// La barra de escala sube a la esquina superior derecha para no chocar con el subtítulo.
const EscalaKit = window.Escala;
function Escala(p) { return EscalaKit({ ...p, x: 800, y: 232 }); }

// Variantes de otros kits (fungi-kit, series C y D): mismo trato. Por eso cine.jsx va al final de los kits.
function FondoLunares({ color }) { return FondoMarca({ color, patron: 'puntos' }); }
const BarraKit = window.BarraEscala;
function BarraEscala(p) { return BarraKit ? BarraKit({ ...p, x: 800, y: 232 }) : null; }

Object.assign(window, { CINE, cineMix, FondoMarca, FondoLunares, Escena, Sticker, RobertF, Subtitulo, Robert, MarcaAgua, TarjetaEstudio, MitoTachado, Escala, BarraEscala });
