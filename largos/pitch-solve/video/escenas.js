// escenas.js — pitch de Fungi Mati para MIT Solve, escena por escena.
// El texto de cada línea, unido con espacios, es exactamente guion_3min.md (la voz dice "México" con acento; el subtítulo, "Mexico").
// Una línea sin "v" continúa el visual anterior. Visual "ilus" = escena animada de cine-pitch.jsx (ILUSC).
window.CAPS = (() => {
const R_ = (n) => 'robert/' + n, W_ = (n) => 'web/' + n;
return [
  { num: 1, titulo: 'The residue', tarjeta: false, lineas: [
    { t: 'Every year, the tequila industry in Jalisco, Mexico, leaves behind about nine hundred thousand tonnes of agave bagasse: the fibre that remains after the sugars are extracted.', v: { tipo: 'ilus', id: 'agave_intro' } },
    { t: 'Most of it is burned, or dumped and left to rot in open piles.', v: { tipo: 'ilus', id: 'bagazo_pila' } },
    { t: 'Distilleries pay two hundred to five hundred pesos per tonne just to have it hauled away; small agave growers often burn it in the field.', v: { tipo: 'ilus', id: 'costo' } },
    { t: 'Either way, carbon dioxide, particulates and methane end up in rural communities.', v: { tipo: 'ilus', id: 'gases' } },
  ] },
  { num: 2, titulo: 'Fungi Mati', tarjeta: false, lineas: [
    { t: 'My name is Roberto Navarro.', v: { tipo: 'foto', foto: R_('robert_seta_ostra_2026'), foco: [0.45, 0.35], lado: 'izq', texto: 'Roberto Navarro', sub: 'Biotechnology engineering · Tec de Monterrey' } },
    { t: 'I am a biotechnology engineering student in Zapopan, and I have grown mushrooms since I was ten.', v: { tipo: 'fotos', fotos: [R_('setas_2'), R_('frasco_esporas'), R_('lab_tec_selfie_bata_setas')], etiqueta: 'GROWING MUSHROOMS SINCE AGE TEN' } },
    { t: 'Fungi Mati turns that bagasse into gourmet mushrooms in four to six weeks.', v: { tipo: 'ilus', id: 'titulo' } },
  ] },
  { num: 3, titulo: 'How it works', tarjeta: false, lineas: [
    { t: 'A local supplier compacts the bagasse into pellets that store for months.', v: { tipo: 'ilus', id: 'pellets' } },
    { t: 'I hydrate and pasteurize them, add twenty percent soybean hull, and inoculate them with oyster mushroom mycelium.', v: { tipo: 'ilus', id: 'proceso' } },
    { t: 'Its enzymes break down lignin and cellulose, and the fibre becomes food.', v: { tipo: 'ilus', id: 'micro' } },
    { t: 'What is left goes back to the soil as compost.', v: { tipo: 'ilus', id: 'composta' } },
    { t: 'That speed is the point.', v: { tipo: 'ilus', id: 'carrera' } },
    { t: 'In the time compost takes to half-break down, the same fibre has already become a food that sells by the kilogram.' },
    { t: 'And pelletized bagasse costs about half of a conventional substrate.', v: { tipo: 'ilus', id: 'mitad' } },
  ] },
  { num: 4, titulo: 'The pilot', tarjeta: false, lineas: [
    { t: "In 2026, with a grant from Tec de Monterrey, I turned an abandoned space at my university's high school into a permanent mushroom farm.", v: { tipo: 'ilus', id: 'antes_despues' } },
    { t: 'I taught fifty students to grow there, and every harvest went back to that community: eighty-five people in total.', v: { tipo: 'ilus', id: 'pilot_numeros' } },
    { t: 'Fungi Mati already sells grow kits and courses.', v: { tipo: 'fotos', fotos: [R_('robert_kits_seta_gris_2023'), R_('pas_kits_seta_gris')], etiqueta: 'GROW KITS AND COURSES' } },
  ] },
  { num: 5, titulo: 'AI tutor', tarjeta: false, lineas: [
    { t: 'Half of those students learned with an AI tutor I built on ChatGPT with my own materials; the other half learned the traditional way.', v: { tipo: 'ilus', id: 'tutor' } },
    { t: 'The next version will be a chatbot built on Claude, guiding growers in any language, at any hour.', v: { tipo: 'ilus', id: 'chatbot' } },
  ] },
  { num: 6, titulo: 'Strain research', tarjeta: false, lineas: [
    { t: 'At the Carrillo Biorefinery Lab of Tec de Monterrey, where I run the fungal strain collection under Dr. Danay Carrillo Nieves,', v: { tipo: 'fotos', fotos: [R_('lab_tec_cepario_placas'), R_('carrillo_lab_cultivo_agar_azul')], etiqueta: 'CARRILLO BIOREFINERY LAB · TEC DE MONTERREY' } },
    { t: 'an approved project will test whether crossing two oyster mushroom strains yields one better adapted to bagasse.', v: { tipo: 'ilus', id: 'cruza' } },
    { t: 'It is exploratory, but if it works, the method travels to coffee pulp, corn stover or sugarcane bagasse.', v: { tipo: 'ilus', id: 'residuos' } },
  ] },
  { num: 7, titulo: 'The home farm', tarjeta: false, lineas: [
    { t: 'With a five thousand dollar award from Equitech Futures,', v: { tipo: 'ilus', id: 'premio' } },
    { t: 'I am building a production farm at home, with a pressure canner, a flow hood and a humidified fruiting room.', v: { tipo: 'fotos', fotos: [R_('olla_presion_placas'), R_('campana_flujo_trabajando'), R_('frascos_grano_microscopio')], etiqueta: 'THE HOME FARM · ZAPOPAN' } },
    { t: 'Next comes my first full tonne of pellets.', v: { tipo: 'ilus', id: 'cuarto' } },
  ] },
  { num: 8, titulo: 'Year one', tarjeta: false, lineas: [
    { t: 'Year one: one tonne of bagasse diverted from burning, and at least six hundred kilograms of mushrooms sold to Guadalajara restaurants through a distributor I already have.', v: { tipo: 'ilus', id: 'metas' } },
  ] },
  { num: 9, titulo: 'Why Solve', tarjeta: false, lineas: [
    { t: 'From Solve, I need three things: help with offtake agreements with restaurants; connections to the tequila industry, because reaching distilleries has been the hardest part; and mentors who have taken a bio-based product from one pilot to many.', v: { tipo: 'ilus', id: 'pedidos' } },
  ] },
  { num: 0, titulo: 'Fungi Mati', tarjeta: false, lineas: [
    { t: 'Fungi Mati: fungi, and mati, a Nahuatl word for knowing.', v: { tipo: 'ilus', id: 'nombre' } },
    { t: 'Turning the one residue Jalisco has too much of into food, in weeks.', v: { tipo: 'ilus', id: 'cierre' } },
    { t: '', d: 5, v: { tipo: 'ilus', id: 'final' } },
  ] },
];
})();
