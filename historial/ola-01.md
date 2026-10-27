# Ola 01 — 280 shots nuevos en paralelo (27 oct 2026)

28 sesiones en la nube × 10 shots. Cada sesión tiene **un nicho propio** y **un rango de números propio**, para que ninguna repita tema ni número. Rama de cada sesión: `ola01/<clave>`.

Reglas comunes (además de `CLAUDE.md`):
- **Antes de elegir los 10 temas:** consulta `historial/temas.json` y las ramas `remaster/lote-*` y `ola01/*` ya subidas. Elige 10 temas de tu nicho que no estén.
- **Registro:** anota tus temas y sus derivados en `historial/nuevos/<clave>.json`.
- **Robert en pantalla en cada shot:** cumple la regla de `CLAUDE.md` (cuadro 0, cada 8–10 s, mínimo 6 apariciones y 18 s, una vez grande, cierre con Robert) y deja la tabla "Robert en pantalla" en `guion.md`.
- **El kit no se toca:** no edites `motor/kit/kit-robert.jsx`, porque 28 sesiones en paralelo chocarían. Si necesitas una pieza o un mundo nuevo, ponlo en un `.jsx` dentro de la carpeta de tu shot y cárgalo en su `.dc.html`.
- **Carpetas:** `shots/<prefijo>-<NN>-<tema>`, con estos prefijos: `bio`, `fun`, `amb`, `ia`, `cie`, `qui`.

| Clave | Serie | Nicho | Números |
|---|---|---|---|
| bio-a | Biotecnológico | Medicinas hechas por organismos (proteínas recombinantes, antibióticos, enzimas) | #10–19 |
| bio-b | Biotecnológico | Vacunas, anticuerpos y el sistema inmune como herramienta | #20–29 |
| bio-c | Biotecnológico | Alimentos y fermentaciones (queso, pan, cerveza, kombucha, carne cultivada) | #30–39 |
| bio-d | Biotecnológico | Plantas modificadas y agricultura biotecnológica | #40–49 |
| bio-e | Biotecnológico | Biorreactores, industria y bioprocesos cotidianos | #50–59 |
| bio-f | Biotecnológico | Diagnóstico, biosensores y genética forense | #60–69 |
| fun-a | Fungi Mati | Hongos comestibles y cómo se cultivan | #05–14 |
| fun-b | Fungi Mati | Hongos y salud (medicinas, toxinas, alergias, micosis) | #15–24 |
| fun-c | Fungi Mati | Hongos en los ecosistemas (micorrizas, descomponedores, simbiosis) | #25–34 |
| fun-d | Fungi Mati | Hongos raros y extremos (zombis, bioluminiscentes, gigantes) | #35–44 |
| fun-e | Fungi Mati | Micomateriales y biotecnología fúngica (cuero, ladrillos, empaques) | #45–54 |
| amb-a | Ambiental | Agua (Jalisco, lago de Chapala, acuíferos, tratamiento) | #05–14 |
| amb-b | Ambiental | Plásticos, residuos y reciclaje | #15–24 |
| amb-c | Ambiental | Clima, carbono y energía | #25–34 |
| amb-d | Ambiental | Biodiversidad e invasoras de México | #35–44 |
| amb-e | Ambiental | Suelos, agricultura y alimentación | #45–54 |
| ia-a | IA | La IA en la ciencia (AlphaFold, descubrimiento de fármacos, clima) | #01–10 |
| ia-b | IA | IA y salud | #11–20 |
| ia-c | IA | Críticas con datos (energía, agua, sesgos, desinformación, trabajo) | #21–30 |
| ia-d | IA | Cómo funciona la IA por dentro, explicada simple | #31–40 |
| cie-a | Científico | Tu cuerpo por dentro | #04–13 |
| cie-b | Científico | Física y química de tu casa | #14–23 |
| cie-c | Científico | Espacio y astronomía | #24–33 |
| cie-d | Científico | Animales increíbles | #34–43 |
| cie-e | Científico | Plantas que no parecen plantas | #44–53 |
| qui-a | Químico | Química de la cocina | #03–12 |
| qui-b | Químico | Química de la limpieza y la casa (siempre seguro, sin recetas peligrosas) | #13–22 |
| qui-c | Químico | Elementos y reacciones del laboratorio | #23–32 |
