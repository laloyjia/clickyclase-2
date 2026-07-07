# Emulador local Firebase para pruebas de Click&Clase

Este documento explica cómo probar la Fase 0 (y siguientes) de manera
100% local, sin tocar producción.

## Requisitos

Firebase CLI instalado (ya lo tenés). Nada más.

## Iniciar el emulador

Desde la raíz del proyecto en Git Bash:

```bash
firebase emulators:start --project electrolearn-prod
```

Al iniciar te muestra una tabla con los servicios emulados:

| Servicio  | Puerto | URL local                     |
|-----------|--------|-------------------------------|
| Auth      | 9099   | http://localhost:9099         |
| Functions | 5001   | http://localhost:5001         |
| Firestore | 8080   | http://localhost:8080         |
| Hosting   | 5050   | http://localhost:5050         |
| UI        | 4000   | http://localhost:4000         |

Todo lo que hagas queda contenido en tu maquina, no toca la data real
de clickyclase.cl.

## Ver la UI del emulador

Abrí en el navegador: <http://localhost:4000>

Ahí podés:

- Ver todos los documentos Firestore que se crean.
- Ver usuarios Auth simulados.
- Ver logs de Cloud Functions locales.
- Importar/exportar datasets de prueba.

## Probar Click&Clase con el emulador

Abrí en el navegador: <http://localhost:5050>

Ese es tu Click&Clase corriendo local. El login y toda la data corren
contra los emuladores, no contra Firebase real.

## Crear usuarios de prueba con roles múltiples

Para probar los distintos paneles necesitás usuarios de test con
distintos roles. Podés crearlos desde la UI del emulador (Auth →
Add user) y después editar el doc Firestore correspondiente.

### Roles disponibles en Fase 0

| roleId          | Panel destino                | Descripción                     |
|-----------------|------------------------------|---------------------------------|
| admin           | admin.html                   | Admin plataforma                |
| director        | panel-director.html          | Director del colegio            |
| rector          | panel-rector.html            | Rector                          |
| admin_colegio   | panel-admin-colegio.html     | Admin operativo del colegio     |
| utp             | panel-utp.html               | Jefe UTP                        |
| encargado_area  | panel-utp.html               | Encargado de ciclo/área         |
| profesor        | panel-profesor.html          | Docente de aula                 |
| jefe_curso      | panel-profesor.html          | Docente + jefe de curso         |
| amb_enc         | panel-ambiente.html          | Encargado Convivencia           |
| amb_prof        | panel-ambiente-prof.html     | Profesional Convivencia         |
| aps_enc         | panel-apoyo.html             | Encargado Apoyo Psicosocial     |
| aps_prof        | panel-apoyo-prof.html        | Profesional Apoyo Psicosocial   |
| pie_enc         | panel-pie.html               | Coordinador/a PIE               |
| pie_edu         | panel-pie-edu.html           | Educador/a Diferencial          |

### Ejemplo: crear un usuario con roles múltiples

Después de crear el user en Auth (email + password), en la UI del
emulador andá a Firestore → colección `usuarios` → doc con el UID del
user. Editá el doc y agregá:

```json
{
  "uid": "<UID>",
  "email": "utp.jefe@salesianostalca.cl",
  "nombre": "María González",
  "liceoSlug": "salesianos-talca",
  "roles": {
    "utp": {},
    "profesor": { "asignaturas": ["MAT","FIS"] },
    "jefe_curso": { "cursos": ["3M-A"] }
  }
}
```

Este usuario tiene 3 roles simultáneos. Al loguearse va al panel UTP
(el de mayor prioridad), pero desde el switcher puede cambiar a
Profesor o Jefe de Curso sin cerrar sesión.

### Retrocompatibilidad con role string

Un doc legacy con solo `role: "admin"` sigue funcionando sin cambios.
El sistema lo trata como `roles: { admin: {} }` internamente.

## Testing manual de Fase 0

1. Iniciá el emulador y abrí <http://localhost:5050/login.html>.
2. Loguéate con un user creado en el paso anterior.
3. Verificá que te redirige al panel correcto según el rol principal.
4. Verificá que si intentás abrir un panel al que no tenés acceso
   (ej: entrar a `/panel-director.html` como profesor), te redirige
   automáticamente a tu panel principal.
5. Si tenés múltiples roles, el switcher debería aparecer en el header
   (fases próximas lo integrarán al layout común).

## Parar el emulador

`Ctrl+C` en la terminal donde arrancó. Todos los datos se pierden
(a menos que hagas `firebase emulators:export`).

## Persistir datos entre sesiones (opcional)

Para exportar el estado actual y reimportarlo la próxima vez:

```bash
firebase emulators:export ./firebase-data-local
firebase emulators:start --import=./firebase-data-local
```
