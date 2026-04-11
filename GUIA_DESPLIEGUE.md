# 🚀 Guía de Despliegue — ElectroLearn
## Firebase + Vercel · Paso a Paso

---

## PASO 1 — Configurar Firebase

### 1.1 Ir a la consola de Firebase
1. Abre [https://console.firebase.google.com](https://console.firebase.google.com)
2. Inicia sesión con tu cuenta de Google
3. Selecciona el proyecto **"planificatuclase"**

---

### 1.2 Activar Authentication
1. En el menú izquierdo → **Authentication**
2. Clic en **"Comenzar"** (o "Get started")
3. Pestaña **"Sign-in method"**
4. Clic en **"Correo electrónico / contraseña"**
5. Activa el primer toggle (Email/Password) → **Guardar**

---

### 1.3 Crear Firestore Database
1. En el menú izquierdo → **Firestore Database**
2. Clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de producción"** → Siguiente
4. Elige la región: **`us-east1`** (más cercana a Chile con buena latencia) → Listo
5. Espera 1-2 minutos mientras se crea

---

### 1.4 Subir las reglas de seguridad
1. En Firestore → pestaña **"Reglas"**
2. Borra todo el contenido actual
3. Copia y pega el contenido del archivo `firestore.rules` que está en tu carpeta
4. Clic en **"Publicar"**

---

### 1.5 Obtener la configuración de tu app
1. En la consola de Firebase, clic en el ícono ⚙️ (configuración) → **"Configuración del proyecto"**
2. Baja hasta la sección **"Tus apps"**
3. Si no tienes ninguna app web, clic en **`</>`** (agregar app web)
   - Nombre: `electrolearn-web`
   - **No** marques Firebase Hosting (usaremos Vercel)
   - Clic en **"Registrar app"**
4. Verás un bloque de código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "planificatuclase.firebaseapp.com",
  projectId: "planificatuclase",
  storageBucket: "planificatuclase.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

5. **Copia estos valores**

---

### 1.6 Pegar la configuración en el proyecto
1. Abre el archivo `electrolearn/js/firebase-config.js` en un editor de texto (puede ser el Bloc de Notas o VS Code)
2. Reemplaza los valores de `FIREBASE_CONFIG` con los que copiaste:

```javascript
var FIREBASE_CONFIG = {
  apiKey:            "AIzaSy....",          // ← pega aquí
  authDomain:        "planificatuclase.firebaseapp.com",
  projectId:         "planificatuclase",
  storageBucket:     "planificatuclase.appspot.com",
  messagingSenderId: "123456789",           // ← pega aquí
  appId:             "1:123456789:web:..."  // ← pega aquí
};
```

3. Guarda el archivo

---

### 1.7 Crear tu cuenta de administrador
1. En Firebase Console → **Authentication** → **Users**
2. Clic en **"Agregar usuario"**
3. Ingresa:
   - Email: `profesor@electrolearn.cl`
   - Contraseña: (elige una contraseña segura)
4. Clic en **"Agregar usuario"**
5. Anota el **UID** que aparece (lo necesitarás)

---

### 1.8 Crear el perfil admin en Firestore
1. En Firebase Console → **Firestore Database** → **Datos**
2. Clic en **"+ Iniciar colección"**
3. ID de colección: `usuarios`
4. Clic en **"Siguiente"**
5. ID del documento: pega el **UID** del paso anterior
6. Agrega estos campos:
   - `uid` (string): [el UID]
   - `email` (string): `profesor@electrolearn.cl`
   - `nombre` (string): `Eduardo Yáñez`
   - `role` (string): `admin`
   - `activo` (boolean): `true`
   - `xp` (number): `0`
   - `creadoEn` (string): `2026-01-01T00:00:00.000Z`
7. Clic en **"Guardar"**

---

## PASO 2 — Subir el código a GitHub

### 2.1 Instalar Git (si no lo tienes)
- Descarga desde: [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Instala con las opciones por defecto

### 2.2 Crear repositorio en GitHub
1. Ve a [https://github.com](https://github.com) → inicia sesión
2. Clic en **"New repository"** (botón verde)
3. Nombre: `electrolearn`
4. Visibilidad: **Private** (para proteger tu código)
5. **No** marques ninguna opción adicional
6. Clic en **"Create repository"**

### 2.3 Subir tu código
Abre una terminal (símbolo del sistema o PowerShell) en la carpeta `electrolearn`:

```bash
# 1. Inicializar el repositorio
git init

# 2. Agregar todos los archivos
git add .

# 3. Primer commit
git commit -m "ElectroLearn v2.0 - Firebase + Multi-subject"

# 4. Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/electrolearn.git

# 5. Subir el código
git branch -M main
git push -u origin main
```

> Si te pide usuario y contraseña de GitHub, usa tu correo y un token de acceso
> (GitHub Settings → Developer Settings → Personal Access Tokens → Tokens Classic → New token)

---

## PASO 3 — Desplegar en Vercel

### 3.1 Crear cuenta en Vercel
1. Ve a [https://vercel.com](https://vercel.com)
2. Clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza Vercel para acceder a tus repositorios

### 3.2 Importar el proyecto
1. En el dashboard de Vercel → clic en **"New Project"**
2. En la lista de repositorios, busca **"electrolearn"**
3. Clic en **"Import"**
4. En la pantalla de configuración:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (dejar por defecto)
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío)
5. Clic en **"Deploy"**

### 3.3 Esperar el despliegue
- Vercel tomará 30-60 segundos
- Recibirás una URL del tipo: `electrolearn-xxxx.vercel.app`
- ¡Tu plataforma ya está en línea! 🎉

### 3.4 Configurar dominio personalizado (opcional)
Si quieres usar un dominio propio (ej: `electrolearn.cl`):
1. En el proyecto de Vercel → **Settings** → **Domains**
2. Ingresa tu dominio y sigue las instrucciones para configurar los DNS

---

## PASO 4 — Configuración final del dominio en Firebase

Cuando tengas la URL de Vercel, debes agregarla como dominio autorizado en Firebase:

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Clic en **"Add domain"**
3. Ingresa tu URL de Vercel: `electrolearn-xxxx.vercel.app`
4. Si tienes dominio propio, agrégalo también
5. Clic en **"Add"**

---

## PASO 5 — Probar la plataforma

### Checklist de pruebas
- [ ] Abrir la URL de Vercel en el navegador
- [ ] Iniciar sesión como `profesor@electrolearn.cl`
- [ ] Verificar que se carga el Dashboard
- [ ] Ir a **Admin** → crear un profesor de prueba
- [ ] Cerrar sesión e iniciar como el nuevo profesor
- [ ] Crear una planificación y verificar que se guarda en Firebase
- [ ] Verificar en Firestore Console que aparece el documento

---

## PASO 6 — Mantener el proyecto actualizado

Cada vez que hagas cambios en los archivos, sube las actualizaciones a GitHub y Vercel desplegará automáticamente:

```bash
# Agregar cambios
git add .

# Commit con descripción de los cambios
git commit -m "Descripción de lo que cambié"

# Subir a GitHub (Vercel se actualiza automáticamente)
git push
```

---

## 🆘 Solución de Problemas Comunes

### Error: "Firebase no configurado"
→ Verifica que `js/firebase-config.js` tenga los valores correctos de tu proyecto

### Error: "Permission denied" en Firestore
→ Verifica que hayas publicado las reglas de `firestore.rules`

### Error: "CORS" o pantalla en blanco
→ Agrega tu dominio de Vercel en Firebase Authentication → Authorized domains

### Los profesores no pueden iniciar sesión
→ Verifica que su cuenta esté en Authentication Y que su documento en Firestore tenga `activo: true`

### Cambios no se reflejan en Vercel
→ Verifica que hayas hecho `git push` y espera 1-2 minutos para el redeploy automático

---

## 📋 Resumen de la arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL                            │
│  (Hosting estático — sin servidor)                  │
│                                                      │
│  index.html → dashboard.html → planificacion.html   │
│  material.html → biblioteca.html → admin.html        │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│               FIREBASE (Google Cloud)                │
│                                                      │
│  Authentication: Login/registro de usuarios          │
│  Firestore DB:   usuarios, materiales, evaluaciones  │
│                  planificaciones, codigos_acceso      │
└─────────────────────────────────────────────────────┘
```

---

*Guía generada para ElectroLearn v2.0 · Proyecto planificatuclase*
