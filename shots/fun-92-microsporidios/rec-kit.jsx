// rec-kit.jsx — piezas compartidas del lote Fungi Mati #90–#94 (récords, rarezas y evolución; 5 nov 2026).
// Se carga después de kit-robert.jsx y fungi-kit.jsx.

// Subtítulo como el del kit, pero con cursiva: *palabra* = resaltada en dorado · _palabra_ = cursiva (nombres científicos).
// Ambas marcas pueden abarcar varias palabras y combinarse: "*_Wallemia ichthyophaga_*".
function Sub({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    for (let k = 0; k < 2; k++) { if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); } }
    const acc = on, cur = it;
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0,
      fontStyle: cur ? 'italic' : 'normal', background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Etiqueta de texto libre (sin línea) que puede mezclar cursiva: partes = [['texto normal', false], ['Nombre', true]].
function EtqMix({ T, at, until, x, y, partes, color = KC.texto, tam = 34, centro = false, sombra = true }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, transform:`translate(${centro ? '-50%' : 0}, calc(-50% + ${e.y || 0}px))`,
    font:`700 ${tam}px ${KF.mono}`, color, whiteSpace:'nowrap', textShadow: sombra ? '0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)' : 'none' }}>
    {partes.map(([t, it], i) => <span key={i} style={{ fontStyle: it ? 'italic' : 'normal' }}>{t}</span>)}
  </div>;
}

Object.assign(window, { Sub, EtqMix });
