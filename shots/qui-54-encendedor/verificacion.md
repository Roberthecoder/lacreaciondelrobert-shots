# Verificación de hechos · qui-54-encendedor

29 oct 2026 · verificación independiente (agente que no escribió el guion).

**Cálculos propios de presión de vapor** (ecuación de Antoine de NIST, `log10(P/bar) = A − B/(T + C)`, T en K; coeficientes abiertos en la página NIST de cada compuesto):

| Compuesto (coeficientes NIST) | 20 °C (293.15 K) | 24 °C | 50 °C (323.15 K) | 50 °C ÷ 20 °C |
|---|---|---|---|---|
| n-butano · 272.66–425 K · A 4.35576 · B 1175.581 · C −2.071 (Das, Reed, et al., 1973) | **2.075 bar = 2.05 atm** | 2.35 bar | **4.95 bar = 4.88 atm** | **2.38** |
| isobutano · 261.31–408.12 K · A 4.3281 · B 1132.108 · C 0.918 (Das, Reed, et al., 1973) | 3.01 bar | — | 6.83 bar | 2.27 |

Con los mismos coeficientes, el butano llega a 1 atm a 272.3 K (−0.8 °C). Las presiones son **absolutas**. La presión manométrica (por encima del aire) a 20 °C sería ≈ 1.05 atm. "El doble de la presión del aire" se refiere a la absoluta, así que es correcto.

| # | Afirmación (voz o pantalla) | Veredicto | Fuente | Frase textual | Año del dato |
|---|---|---|---|---|---|
| 1 | Voz: "Ese encendedor no está lleno de gas: trae un líquido…" | ✅ | 16 CFR § 1210.2(b), eCFR (vigente 2026) | "Its fuel is butane, isobutane, propane, or other liquified hydrocarbon, or a mixture containing any of these" | 2026 (texto vigente) |
| 2 | Voz: "Es butano, isobutano o mezcla con propano." | ✅ (corregida: «Es butano, isobutano o mezcla con propano») | 16 CFR § 1210.2(b); MSDS BIC Megalighter v7 | CFR: "butane, isobutane, propane, … or a mixture"; BIC: "Petroleum gases, liquefied, sweetened : 19.5 % Propane & 80.5 % Isobutane" | 2026 / 2010 |
| 3 | Voz: "Al aire libre son gases" | ✅ | NIST WebBook (butano, isobutano) | butano "T boil 273. ± 1. K"; isobutano "T boil 262. ± 2. K" (los dos hierven por debajo de la temperatura ambiente) | promedios NIST |
| 4 | Voz: "el butano hierve a casi cero grados" / pantalla "≈ −0.5 °C" | ✅ (corregida: pantalla «≈ −0.5 °C») | NIST WebBook, butano, cambio de fase | "T boil 273. ± 1. K … Average of 33 values"; "22.44 272.7 … Majer and Svoboda, 1985" (272.7 K = −0.45 °C). Aston y Messerly (1940) dan 272.05 K (−1.1 °C) a 101.325 kPa. En pantalla conviene "≈ −0.5 °C". | 1940–1985 (constante física) |
| 5 | Pantalla: "butano C₄H₁₀", cadena de 4 carbonos; isobutano ramificado | ✅ | NIST WebBook | Butane, fórmula C4H10, CAS 106-97-8; isobutano CAS 75-28-5 | — |
| 6 | Voz: "a 20 grados, el butano empuja al doble de la presión del aire y sigue líquido"; pantalla "20 °C → ≈ 2 atm" vs "aire: 1 atm" | ✅ | NIST, coeficientes de Antoine (cálculo propio) | "272.66 to 425. 4.35576 1175.581 -2.071 Das, Reed, et al., 1973" → 2.075 bar = 2.05 atm | coeficientes de 1973 (constante física) |
| 7 | Voz: "El botón abre una válvula: baja la presión y el líquido hierve" | ✅ | Sciencing, "How Do Butane Lighters Work?" (act. 2022) | "Butane lighters work by releasing liquid butane, stored in a pressurized chamber, in a narrow stream of gas… just as quickly returns to gas with reduced pressure" | 2022 |
| 8 | Voz: "Una rueda raspa una piedrita… y el gas arde" | ✅ | Sciencing (ídem); Wikipedia "Ferrocerium" | "A spark, made by striking a flint with steel or by compressing piezoelectric crystal, ignites the gas" | 2022 |
| 9 | Voz: "o un cristal golpeado da una chispa eléctrica" | ✅ | Wikipedia "Piezo ignition" (no pude abrir la patente US 4,608,508: Google Patents dio 503) | "a small, spring-loaded hammer which, when a button is pressed, hits a crystal of PZT. This sudden forceful deformation produces a high voltage and subsequent electrical discharge, which ignites the gas" | vigente |
| 10 | Pantalla: flama azul abajo, amarilla arriba | ✅ (dibujo) | Física de la combustión; es esquemático | — | — |
| 11 | Voz: "Para hervir, el líquido roba calor: por eso se enfría si lo usas mucho" | ✅ | NIST WebBook, butano (entalpía de vaporización positiva) | "Δvap H° 22.4 kJ/mol … Reid, 1972" (para evaporarse absorbe 22.4 kJ por mol; ese calor sale del líquido y de la pared) | 1972 (constante física) |
| 12 | Voz: "a 50 grados, el butano empuja más del doble que a 20"; pantalla "20 °C ≈ 2 atm → 50 °C ≈ 5 atm" | ✅ | NIST, Antoine (cálculo propio) | 4.95 bar (4.88 atm) contra 2.075 bar: 2.38 veces | 1973 (constante física) |
| 13 | Pantalla: chip del empaque "No exponer a más de 50 °C ni al sol prolongado" | ✅ | MSDS BIC Megalighter, versión 7 (25/5/2010), PDF abierto | "Never expose to heat above 50°C or to prolonged sunlight" · "May explode or ignite : … - above 50 °C" | 2010 |
| 14 | Voz: "En 2002, la agencia de seguridad de productos de Estados Unidos calculó…" | ✅ (corregida: «la agencia de seguridad de productos de Estados Unidos») | PubMed 12226114, *Inj Prev* 8(3):192–6 | "Hazard Analysis Division, Directorate for Epidemiology, US Consumer Product Safety Commission" | 2002 |
| 15 | Voz: "…que su norma de encendedores difíciles para niños evitó unos 3 mil 300 incendios en 1998" | ✅ | PubMed 12226114 (resumen abierto) | "an estimated 3300 fires, 100 deaths, 660 injuries, and $52.5 million in property loss were prevented by the standard in 1998" | 1998 (publicado 2002) |
| 16 | Pantalla: TarjetaEstudio "2002 · Smith, Greene y Singh · CPSC · *Injury Prevention*" | ✅ | PubMed 12226114 | "Inj Prev. 2002 Sep;8(3):192-6 … Smith LE, Greene MA, Singh HA" | 2002 |
| 17 | Pantalla: encendedor con seguro (difícil para niños menores de 5) | ✅ | 16 CFR § 1210.1 / 1210.3 | "resistant to successful operation by children younger than 5 years of age"; "at least 85 percent of the child-test panel" | vigente |
| 18 | Pantalla: chip "norma vigente desde 1994" | ✅ (corregida: «norma vigente desde 1994») | 16 CFR § 1210.1 | La norma se publicó en 1993 ("58 FR …, July 12, 1993") y aplica a los encendedores "manufactured or imported after July 12, 1994" | 1993/1994 |
| 19 | Voz: "esa piedrita no es pedernal" | ✅ | Wikipedia "Ferrocerium" (cita *Ullmann's*, 2000) | "The ferrocerium is referred to as a 'flint' in this case… However, ferrocerium and natural flint have opposite mechanical operation" | 2000 |
| 20 | Voz: "Es ferrocerio, hierro con cerio y otros metales raros"; pantalla "ferrocerio = Fe + Ce + La…" y "aleación de Auer, 1903: Fe + Ce" | ✅ (corregida: «hierro con cerio y otros metales raros»; rótulo «aleación de Auer, 1903: Fe + Ce») | Austria-Forum "Auer-Licht"; Wikipedia "Ferrocerium" | Auer: "Er legiert geschmolzenes Cer mit Eisen (70:30)". Hoy: "approximately 20.8% iron, 41.8% cerium, … plus 24.2% lanthanum" | 1903 / 2008 |
| 21 | Voz: "inventado por el austriaco Auer von Welsbach en 1903"; tarjeta "1903 · Carl Auer von Welsbach · Austria" | ✅ | Austria-Forum "Auer-Licht"; patente FR6502E (Google Patents, abierta) | "Wir schreiben das Jahr 1903 … Er legiert geschmolzenes Cer mit Eisen (70:30) und erhält das 'funkensprühende Cereisen'"; FR6502E "Prior art date 1903-10-31"; Wikipedia: "invented in 1903 by the Austrian chemist Carl Auer von Welsbach" | 1903 |
| 22 | Pantalla: la rueda arranca virutas que brillan al aire | ✅ | Wikipedia "Ferrocerium" | "friction produces hot fragments that oxidize rapidly when exposed to the oxygen in the air, producing sparks" | vigente |
| 23 | Voz: "es un líquido apretado, esperando hervir" (cierre) | ✅ | Igual que #1 y #6 | — | — |
| 24 | Pantalla (cierre, rayos X): etiqueta "butano líquido · ≈ 2 atm (butano puro)" | ✅ (corregida: «butano líquido · ≈ 2 atm (butano puro)»; manómetros de Presion y Sol rotulados «butano») | MSDS BIC; NIST, Antoine | El encendedor BIC trae 80.5 % isobutano + 19.5 % propano: a 20 °C serían ≈ 3 bar del isobutano solo y ≈ 4 bar con la mezcla (estimación por Raoult). "≈ 2 atm" vale solo para butano puro. | 2010 / 1973 |

## Correcciones necesarias

1. **#2 "Es butano o isobutano."** Muchos encendedores (el BIC de la MSDS, por ejemplo) traen mezcla con propano. Propuesta: **"Es butano, isobutano o una mezcla con propano."** (casi el mismo largo). Otra opción: "Casi siempre es butano o isobutano."
2. **#14 "la agencia de seguridad de Estados Unidos".** Es vago: suena a otra agencia. Propuesta: **"la agencia de seguridad de productos de Estados Unidos"**.
3. **#18 chip "norma de 1994".** Propuesta: **"norma vigente desde 1994"** (se publicó en 1993).
4. **#20 "hierro con cerio" / "Fe + Ce".** Es correcto para el invento de 1903, pero la piedrita de hoy lleva además lantano y otras tierras raras. Propuesta de voz: **"Es ferrocerio, hierro con cerio y otros metales raros…"**. En pantalla: "Fe + Ce + La…", o dejar "Fe + Ce" y rotular "aleación de Auer, 1903".
5. **#24 etiqueta del cierre "butano líquido · ≈ 2 atm".** Propuesta: **"butano líquido · ≈ 2 atm (butano puro)"** o **"líquido a 2–4 atm"**. En la escena Sol (#12), el manómetro debe decir que es **butano** ("butano: 20 °C ≈ 2 atm → 50 °C ≈ 5 atm").
6. Menor (#4): en pantalla mejor **"≈ −0.5 °C"** (las mediciones van de −1.1 a −0.45 °C).

## Correcciones aplicadas

1. #2 · Voz: «Es butano o isobutano.» → «Es butano, isobutano o mezcla con propano: gases al aire libre; …» (fuente: 16 CFR § 1210.2(b); MSDS BIC).
2. #14 · Voz: «la agencia de seguridad de Estados Unidos» → «la agencia de seguridad de productos de Estados Unidos» (CPSC).
3. #18 · Pantalla: «norma de 1994» → «norma vigente desde 1994».
4. #20 · Voz: «hierro con cerio» → «hierro con cerio y otros metales raros»; pantalla «Fe + Ce + La…» y rótulo «aleación de Auer, 1903: Fe + Ce».
5. #24 · Pantalla del cierre: «butano líquido · ≈ 2 atm (butano puro)»; manómetros de Presion («butano puro: 20 °C → ≈ 2 atm») y Sol («butano: 20 °C ≈ 2 atm → 50 °C ≈ 5 atm»).
6. #4 · Pantalla: «≈ −0.5 °C».

Ajustes de largo sin tocar datos (para 61.2–61.8 s): «Adentro siguen líquidos, apretados: a 20 grados, el butano empuja al doble que el aire.» (misma cifra: 2.05 atm absolutas contra 1 atm); «Al hervir, roba calor…»; «…o un cristal golpeado da una chispa, y el gas arde.»; cierre sin «Así que». Texto final: 952 caracteres, total estimado 61.4 s. Todas las afirmaciones quedan ✅.

VEREDICTO: APROBADO
