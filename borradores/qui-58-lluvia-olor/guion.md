# Shot Químico #58 · Ese olor no es la lluvia (geosmina y petricor)

- **Serie:** Shot Químico · **Logo:** química (matraz) · **Badge:** #58 · rama `pedido300/qui`.
- **Formato:** N1 "Por dentro" (la banqueta de tierra seca bajo las primeras gotas → la bacteria, la molécula y la burbuja que revienta → la misma tierra, ya mojada, con el olor subiendo) + N5 "El experimento" (Joung y Buie, MIT, 2015, cámara rápida).
- **Gancho (de los 7):** #1 "Esto no es X: es Y": "Ese olor a tierra mojada no es la lluvia: es sobre todo una molécula que fabrican bacterias del suelo."
- **Seguridad:** nada que hacer en casa; no hay riesgos ni consejos de salud.
- **Duración:** voz 955 caracteres / 168 palabras (≈ 58.1 s) + cierre 3.5 s → **61.6 s** (`estimar-escenas.mjs`).
- **Estado:** guion verificado (`verificacion.md`), animación en proceso, voz pendiente de aprobación de Robert.

## Versión narrada

| # | Escena | Voz | Lo que se ve |
|---|---|---|---|
| 0 | Gancho | Ese olor a tierra mojada no es la lluvia: es sobre todo una molécula que fabrican bacterias del suelo. | Fondo amarillo. Desde el cuadro 0 caen las primeras gotas gordas sobre un macetón/jardinera de tierra café clara y seca; cada gota deja una mancha oscura. Una nariz caricatura aspira y salen tres rayitas de olor. Texto "¿lluvia?" que se tacha y cambia a "bacterias". Barra de escala "10 cm". |
| 1 | Que | Se llama geosmina; la hacen bacterias como *Streptomyces* al formar esporas. | Zoom con `Lupa` (rayos X) al suelo → fondo noche: filamentos ramificados de *Streptomyces* (hifas delgadas) que en las puntas forman cadenas de esporas; de esas cadenas salen moléculas de geosmina (dos anillos unidos con un –OH) que brillan. Etiqueta "geosmina · C₁₂H₂₂O". Barra "10 µm". |
| 2 | Nariz | Tu nariz la detecta en cantidades ridículas: 4 a 10 nanogramos por litro de agua. | Regresa la nariz grande de perfil; medidor "umbral de olor: 4–10 ng/L" que se llena; un vaso de agua con una nube muy tenue de puntitos (geosmina diluida) y "1 ng = 0.000 000 001 g". |
| 3 | Cuchara | Es como notar una cucharadita disuelta en 200 albercas olímpicas. | Una cucharadita cae en una alberca olímpica vista desde arriba; la cámara se aleja y la alberca se multiplica en una cuadrícula que cuenta hasta "×200". |
| 4 | Pregunta | ¿Y cómo brinca de la tierra a tu nariz? | **Re-gancho.** Una molécula de geosmina atorada en un grano de tierra; flecha punteada hacia la nariz con "?" gigante. |
| 5 | Estudio | En 2015, en el MIT, filmaron en cámara rápida unos 600 experimentos de gotas sobre tierra y otros materiales. | Tarjeta "2015 · Joung y Buie · MIT, EUA"; una cámara de alta velocidad apunta a un platito de tierra; un gotero suelta una gota; contador "≈ 600 experimentos". |
| 6 | Burbujas | Al pegar, la gota atrapa burbujitas de aire; suben, revientan y lanzan chorritos que se hacen gotitas. | Cámara lenta en corte lateral: la gota (≈ 2 mm, barra "1 mm") se aplasta sobre los granos porosos; aparecen burbujitas en la base, crecen con el aire que sale de los poros, suben, revientan arriba y lanzan chorritos que se parten en gotitas. "pop" en cada burbuja. |
| 7 | Aerosol | Esas gotitas sacan al aire pedacitos del suelo; los autores sospechan que así viaja el olor. | Las gotitas flotan como nube fina (etiqueta "aerosol"); dentro de algunas va un puntito de tierra; chip "hipótesis" junto a una geosmina dentro de una gotita. |
| 8 | Llovizna | Lo vieron con lluvia ligera y moderada; con aguacero fuerte, no. | Dos paneles: llovizna (gotas lentas, nube de gotitas ✓) vs aguacero (gotas rápidas que salpican, sin nube ✗). Medidor de velocidad de gota "< 4 m/s" vs "> 7 m/s". |
| 9 | Colembolos | Lo curioso: en 2020 vieron que la geosmina atrae a colémbolos, bichitos que comen la colonia y reparten sus esporas. | Fondo noche: un colémbolo (cuerpo alargado, antenas, sin alas, "≈ 1–3 mm") sigue el rastro de geosmina hasta la colonia, mordisquea y se va con esporas pegadas al cuerpo y en sus bolitas de popó. Tarjeta "2020 · Becher et al. · Univ. de Lund y equipo internacional". |
| 10 | Cierre | Así que ese olor a lluvia no es la lluvia: es, sobre todo, el aroma de bacterias de la tierra pidiendo aventón. | **Regreso a la jardinera del inicio**, ya oscura y mojada; de la tierra suben las rayitas de olor con etiqueta "geosmina", y un colémbolo con un letrerito de "aventón" pasa por la orilla. |
| — | Outro | (sin voz) | `CierreMarca` con el logo de química y Robert señalando. |

**Música:** cama grave y húmeda, continua, debajo de la voz; efectos en el mismo cuadro: golpe de cada gota, aspirada de la nariz, "pop" de cada burbuja, chorrito, gotita que cae en la alberca, tarjeta, aguacero, pasitos del colémbolo.

## Fuentes (cada dato y cifra se abrió en la fuente original el 29 oct 2026)

1. **Burbujas en la gota, chorritos que se rompen en gotitas, cámara rápida, ~600 experimentos, MIT, lluvia ligera/moderada sí y fuerte no, "petricor"** — Joung Y.S., Buie C.R. "Aerosol generation by raindrop impact on soil." *Nature Communications* 6:6083 (publicado el 14 ene 2015). Department of Mechanical Engineering, Massachusetts Institute of Technology. PMID 25586153 · DOI 10.1038/ncomms7083.
   > "High-speed imaging provides visual proof of aerosol generation when liquid water droplets hit soil at velocities consistent with rainfall."
   > "In total we conducted roughly 600 experiments. Experiments were performed on 16 different soils"
   > "Tiny bubbles are trapped at the droplet/surface interface because the droplet expansion speed is faster than the water-absorption speed of the surface" · "The bubbles grow with air supplied from the porous media as it absorbs the liquid and displaces trapped air" · "Finally, the bubbles burst when they meet the air–water interface of the droplet (Fig. 2g), ejecting small jets that breakup into tiny droplets."
   > "We demonstrate that droplets can release aerosols when they influence porous surfaces, and these aerosols can deliver elements of the porous medium to the environment."
   > "this work could have widespread implications ranging from remediating the spread of disease-causing microbes to the earthy smell known as 'petrichor' present after a rain shower on a hot day"
   > "We verified aerosol generation experimentally for conditions consistent with light and moderate rain on soil with similar water-absorption properties as clay and sandy clay soil. Aerosol generation was not observed on sand or during conditions consistent with heavy rainfall." · "light rain (U o <4.0 ms −1) to heavy rain (U o >7.0 ms −1)" · "the diameter of a typical raindrop is 1–3 mm"
   - Nota de MIT News (14 ene 2015, "Rainfall can release aerosols, study finds"): los autores sospechan que esos aerosoles pueden llevar compuestos aromáticos, bacterias y virus del suelo → por eso la voz dice "sospechan".
2. **Umbral de olor humano 4–10 ng/L; "una cucharadita en 200 albercas olímpicas"; *Streptomyces* produce geosmina** — Ball L., Frey T., Haag F., Frank S., Hoffmann S., Laska M., Steinhaus M., Neuhaus K., Krautwurst D. "Geosmin, a Food- and Water-Deteriorating Sesquiterpenoid and Ambivalent Semiochemical, Activates Evolutionary Conserved Receptor OR11A1." *J Agric Food Chem* 72(28):15865–15874 (2024). PMC11261619.
   > "A rather low human odor detection threshold (OT) (orthonasally in water) for geosmin has been determined between 4 and 10 ng/L, which is about one teaspoon in 200 Olympic swimming pools."
   > "Typical geosmin-producing bacteria include Streptomyces species, such as S. albus and S. albidoflavus."
   > "As the smell of geosmin is associated with rain, and, thus, freshwater"
3. **La geosmina se hace al formar esporas; atrae a colémbolos que comen la colonia y reparten esporas** — Becher P.G., Verschut V., Bibb M.J., … Buttner M.J., Flärdh K. "Developmentally regulated volatiles geosmin and 2-methylisoborneol attract a soil arthropod to Streptomyces bacteria promoting spore dispersal." *Nature Microbiology* 5:821–829 (2020). PMID 32251369 · DOI 10.1038/s41564-020-0697-x.
   > "the genes for geosmin and 2-MIB synthases are under the direct control of sporulation-specific transcription factors, constraining emission of the odorants to sporulating colonies."
   > "F. candida feeds on the Streptomyces colonies and disseminates spores both via faecal pellets and through adherence to its hydrophobic cuticle."
   > "The conservation of geosmin biosynthesis genes among virtually all species of Streptomyces bacteria"
   - Comunicado de Lund University (15 abr 2020): "The earthy smell comes from geosmin, a substance produced by soil bacteria of the Streptomyces genus." · "researchers from Sweden, the UK and Hungary" · "millimetre-long insect-like organisms".
4. **El petricor es una mezcla; la geosmina es su compuesto característico** — Ghirardo A., Poodiack B., Siebner H., Jaffe M., Weber B., Schnitzler J., Bonkowski M., Gillor O., Guenther A. "Dryland Soil Rewetting Induces Strong Volatile Organic Compound Emissions With Potential to Form Ozone and Aerosols." *Global Change Biology* (2026). PMC13644907.
   > "Petrichor consisted of a complex bouquet of 58 VOCs" · "a VOC blend typically associated with geosmin and 2-methylisoborneol (2-MIB) produced by Actinomycetota" · "Geosmin, a characteristic volatile often identified with petrichor, was also detected in the blend of volatiles after rewetting"

## Notas
- El dibujo es esquemático (la nariz, las hifas, las burbujas y el colémbolo no van a escala entre escenas; cada escena lleva su barra).
- Matiz para la descripción: el petricor es una mezcla de decenas de compuestos (58 en el estudio de 2026 en el Néguev); la geosmina sale en poca cantidad, pero se nota porque la nariz la detecta en trazas. Por eso la voz dice "una molécula" (la característica) y no "la única".
- El umbral de 4–10 ng/L es en agua, oliendo por la nariz (ortonasal); viene de mediciones citadas por la revisión de 2024.
- El MIT no midió geosmina dentro de las gotitas: que el olor viaje así es la hipótesis de los autores (la voz dice "sospechan").
- Los ~600 experimentos fueron sobre 28 materiales porosos (16 suelos y placas de laboratorio); por eso la voz dice "sobre tierra y otros materiales".
- La geosmina también la producen otros microbios (cianobacterias, algunos hongos); la voz dice "bacterias como las *Streptomyces*".
