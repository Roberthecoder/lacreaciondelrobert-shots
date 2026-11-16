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
  const tr = (s) => { const d = window.__IDIOMA_DIC; return (d && typeof s === 'string' && Object.prototype.hasOwnProperty.call(d, s) && d[s] != null) ? d[s] : s; };
  const patch = (R) => {
    if (!R || R.__idioma) return R;
    const ce = R.createElement;
    R.createElement = function (type, props, ...kids) {
      const nombre = typeof type === 'string' ? type : (type && (type.name || type.displayName)) || '?';
      if (props) {
        let np = null;
        for (const k of Object.keys(props)) {
          if (!PROPS.has(k) || typeof props[k] !== 'string') continue;
          if (window.__IDIOMA_MODO === 'recolectar') anota(props[k], `${nombre}.${k}`);
          const t = tr(props[k]); if (t !== props[k]) { np = np || { ...props }; np[k] = t; }
        }
        if (np) props = np;
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
