// gancho.js — se inyecta en la página del shot ANTES de que cargue React (render.mjs --idioma / textos.mjs).
// Engancha React.createElement para:
//   · recolectar (window.__IDIOMA_MODO = 'recolectar'): anota cada texto visible (hijos de texto y props de texto) → window.__TEXTOS
//   · traducir   (window.__IDIOMA_DIC = {español: traducción}): cambia cada texto que esté en el diccionario.
// Solo toca hijos de texto y las props de la lista PROPS (las demás props pueden ser lógica: pose, lado, tema…).
(() => {
  const PROPS = new Set(['texto', 'etiqueta', 'titulo', 'subtitulo', 'label', 'nombre', 'pregunta', 'respuesta', 'cientifico',
    'comun', 'linea', 'frase', 'rotulo', 'leyenda', 'title', 'unidad', 'valor', 'cita', 'fuente', 'nota', 'arriba', 'abajo', 'texto2', 'sub']);
  const LETRAS = /[A-Za-zÁÉÍÓÚÑáéíóúñü¿¡]/;
  window.__TEXTOS = window.__TEXTOS || {};
  const anota = (s, donde) => { if (typeof s === 'string' && LETRAS.test(s)) { const k = s; (window.__TEXTOS[k] = window.__TEXTOS[k] || new Set()).add(donde); } };
  // Además del diccionario exacto: "__reglas": [["^día (\\d+)$", "第$1天"], …] para contadores animados (cada cuadro da otro número)
  // y "__millones": true para pasar «1,400 millones» → «14亿» y «3 millones» → «300万» (la forma natural en chino).
  const millones = (s) => s.replace(/([\d,.]+)\s*millones/g, (m, n) => {
    const v = parseFloat(n.replace(/,/g, '')) * 1e6;
    return v >= 1e8 ? `${+(v / 1e8).toFixed(2)}亿` : v >= 1e4 ? `${+(v / 1e4).toFixed(2)}万` : `${+v.toFixed(0)}`;
  });
  const tr = (s) => {
    const d = window.__IDIOMA_DIC;
    if (!d || typeof s !== 'string') return s;
    if (Object.prototype.hasOwnProperty.call(d, s) && d[s] != null && typeof d[s] === 'string') return d[s];
    let t = s;
    for (const [re, rep] of d.__reglas || []) t = t.replace(new RegExp(re), rep);
    if (d.__millones) t = millones(t);
    return t;
  };
  const patch = (R) => {
    if (!R || R.__idioma) return R;
    const ce = R.createElement;
    R.createElement = function (type, props, ...kids) {
      const nombre = typeof type === 'string' ? type : (type && (type.name || type.displayName)) || '?';
      if (props) {
        let np = null;
        for (const k of Object.keys(props)) {
          // listas de renglones, p. ej. lines={[{ t:'…' }, { t:'…' }]} (Headline de los primeros shots)
          if (Array.isArray(props[k]) && props[k].some((o) => o && typeof o === 'object' && (typeof o.t === 'string' || typeof o.texto === 'string'))) {
            const arr = props[k].map((o) => {
              if (!o || typeof o !== 'object') return o;
              let n = o;
              for (const f of ['t', 'texto']) if (typeof o[f] === 'string') {
                if (window.__IDIOMA_MODO === 'recolectar') anota(o[f], `${nombre}.${k}[].${f}`);
                const t = tr(o[f]); if (t !== o[f]) n = { ...n, [f]: t };
              }
              return n;
            });
            if (arr.some((o, i) => o !== props[k][i])) { np = np || { ...props }; np[k] = arr; }
            continue;
          }
          if (!PROPS.has(k) || typeof props[k] !== 'string') continue;
          if (window.__IDIOMA_MODO === 'recolectar') anota(props[k], `${nombre}.${k}`);
          const t = tr(props[k]); if (t !== props[k]) { np = np || { ...props }; np[k] = t; }
        }
        if (np) props = np;
      }
      // Contador armado por partes: {cifra}{' millones…'} → se unen para convertir a 万/亿 con "__millones": true.
      const d = window.__IDIOMA_DIC;
      if (d && d.__millones && kids.length > 1) {
        const k2 = [];
        for (let i = 0; i < kids.length; i++) {
          const a = kids[i], b = kids[i + 1];
          const num = typeof a === 'number' || (typeof a === 'string' && /^[\d.,]+$/.test(a.trim()));
          const m = typeof b === 'string' && b.match(/^\s*(mil millones|millones|mill\.|M|mil)(?![\wáéíóú])/);
          if (num && m) {
            const f = { 'mil millones': 1000, 'millones': 1, 'mill.': 1, 'M': 1, 'mil': 0.001 }[m[1]];
            const n = +(parseFloat(String(a).replace(/,/g, '')) * f).toPrecision(12);
            k2.push(`${n} millones` + b.slice(m[0].length)); i++;
          } else k2.push(a);
        }
        kids = k2;
      }
      // Texto + número armados por partes ({'día '}{n}, {n}{' días'}): si una __reglas atrapa la unión, se unen (p. ej. «第n天»).
      if (d && d.__reglas && kids.length > 1) {
        const k3 = [];
        for (let i = 0; i < kids.length; i++) {
          const a = kids[i], b = kids[i + 1];
          const ok = (x, y) => (typeof x === 'string' || typeof x === 'number') && (typeof y === 'string' || typeof y === 'number') && (typeof x === 'number' || typeof y === 'number');
          if (ok(a, b)) {
            const j = `${a}${b}`;
            if (d.__reglas.some(([re]) => new RegExp(re).test(j))) { k3.push(j); i++; continue; }
          }
          k3.push(a);
        }
        kids = k3;
      }
      kids = kids.map((c) => { if (typeof c !== 'string') return c; if (window.__IDIOMA_MODO === 'recolectar') anota(c, `${nombre}>texto`); return tr(c); });
      return ce.call(this, type, props, ...kids);
    };
    R.__idioma = true; return R;
  };
  // El UMD de React hace «global.React = {}» y LUEGO llena createElement: por eso se engancha al leerlo, no al asignarlo.
  let real = window.React;
  Object.defineProperty(window, 'React', { configurable: true,
    get: () => (real && !real.__idioma && typeof real.createElement === 'function' ? patch(real) : real),
    set: (v) => { real = v; } });
})();
