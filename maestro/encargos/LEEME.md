# Encargos locales temporales

Cuando el admin maestro (nube) necesita algo que solo se puede hacer en la PC de Robert, escribe aquí un archivo
`<AAAAMMDD>-<tema>.md` y lo sube a main con `[sin render]`.

Plantilla:
```
# Encargo: <tema>
Pedido por: admin maestro (nube), <fecha>
Qué hacer: <pasos concretos>
Qué entregar y dónde: <rama / carpeta / Sala>
Límites: no tocar nada más; contraseñas solo Robert.
Al terminar: escribe abajo "ESTADO: HECHO — <una línea>", haz push y archiva esta sesión (archive_session "self").
```

Para lanzarlo: en la app de escritorio, nueva sesión de Code en el clon del repo con
"Haz el encargo maestro/encargos/<archivo>.md". La sesión no se fija ni enciende Remote Control.
