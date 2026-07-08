# Crear los usuarios de prueba — electrolearn-prod

Crea 11 usuarios (uno por rol) en Firebase Authentication, con su rol asignado
y su documento en Firestore. Cada uno entra a su propio panel.

## Paso 1 — Crear la base de datos Firestore (si aún no existe)

En la consola de Firebase de **electrolearn-prod** → menú **Firestore Database** →
**Crear base de datos** → modo producción → región `southamerica-west1` (Santiago)
o la que prefieras.

## Paso 2 — Descargar la llave de servicio (service account)

En la consola de Firebase de **electrolearn-prod**:

1. Engranaje ⚙️ (arriba a la izquierda) → **Configuración del proyecto**.
2. Pestaña **Cuentas de servicio**.
3. Botón **Generar nueva clave privada** → **Generar clave**. Se descarga un `.json`.
4. **Renómbralo a `serviceAccountKey.json`** y muévelo a ESTA carpeta
   (`setup-usuarios/`).

> Esa llave es secreta: ya está en `.gitignore`, NO se sube a GitHub. No la compartas.

## Paso 3 — Instalar y ejecutar

```bash
cd "C:\Users\electronica9\Desktop\Proyectos AVANTI\electrolearn\setup-usuarios"
npm install
node crear-usuarios.mjs
```

Al terminar verás los 11 usuarios creados. Contraseña de todos: **`Demo1234!`**

## Los 11 usuarios

| Rol | Correo | Panel |
|-----|--------|-------|
| Administrador general | admin@clickyclase.cl | admin |
| Director | director@colegio-demo.cl | director |
| Encargado UTP | utp@colegio-demo.cl | utp |
| Profesor | profesor@colegio-demo.cl | profesor |
| Encargado de ambiente | ambiente@colegio-demo.cl | amb_enc |
| Profesional de ambiente | ambiente.prof@colegio-demo.cl | amb_prof |
| Encargado apoyo psicosocial | apoyo@colegio-demo.cl | aps_enc |
| Profesional apoyo psicosocial | apoyo.prof@colegio-demo.cl | aps_prof |
| Encargada PIE | pie.encargada@colegio-demo.cl | pie_enc |
| Educadora PIE | pie.educadora@colegio-demo.cl | pie_edu |
| Profesor independiente | profesor.independiente@clickyclase.cl | profesor (espacio propio) |

## Después

Cuando los usuarios estén creados, el siguiente paso es **conectar el login**:
que al entrar, cada usuario sea llevado automáticamente a su panel según su rol.
Eso lo hacemos en el código de la app (login + redirección).
