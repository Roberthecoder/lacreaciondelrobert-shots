# Encargos locales temporales (puente nube → PC)

El admin maestro vive en la nube. Cuando necesita algo que solo se puede hacer en la PC de Robert (programas locales, archivos de la
PC, navegador cuando la nube no tiene `remote-devices`), deja aquí un encargo. Un **entorno local temporal** lo toma, lo hace,
contesta en el mismo archivo y se archiva solo. No hay chats locales permanentes.

## Cómo llega el encargo a la PC
1. **Puente automático (preferido):** la tarea programada de la app de escritorio "Puente local del admin maestro" (texto completo en
   `maestro/encargos/PUENTE-tarea-programada.md`). Cada 20 min abre una sesión local nueva; si no hay encargos `PENDIENTE`, se archiva
   en segundos; si hay, toma uno, lo hace y se archiva. Solo corre mientras la app de Claude está abierta en la PC.
2. **Inmediato:** si el maestro de nube tiene `enable__mcp__remote-devices__computer`, puede abrir la app de escritorio y pulsar
   «Ejecutar ahora» en esa tarea programada (o Robert lo hace a mano).

## Formato (archivo `<AAAAMMDD-HHMM>-<tema>.md`, push a main con `[sin render]`)
```
# Encargo: <tema>
Pedido por: admin maestro (nube), <fecha>
ESTADO: PENDIENTE
Qué hacer: <pasos concretos>
Qué entregar y dónde: <rama / carpeta / Sala / datos en "## Resultado">
Límites: no tocar nada más; contraseñas y captchas solo Robert.
```
El puente cambia el estado a `EN PROCESO (puente local, <hora>)` (candado), luego a `HECHO — <una línea>` o `BLOQUEADO — <motivo>`, y
agrega `## Resultado`. El maestro lee la respuesta con `git fetch && git show origin/main:maestro/encargos/<archivo>`.
