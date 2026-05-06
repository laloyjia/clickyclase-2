/* ============================================
   Click&Clase - Autenticacion (auth.js)
   ============================================
   PASO 1: Login y registro LOCAL (sin servidor)

   IMPORTANTE: Este es un login TEMPORAL para probar
   la interfaz. En el PASO 3 conectaremos Firebase
   para tener un login REAL y seguro.

   POR AHORA:
   - Los usuarios se guardan en el navegador (localStorage)
   - Si borras los datos del navegador, se pierden
   - No es seguro para produccion (es solo para practicar)
   ============================================ */

// ============================
// ELEMENTOS DEL DOM
// ============================
// Obtenemos referencias a los elementos HTML que necesitamos

// Formulario de login
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const errorMessage = document.getElementById('errorMessage');

// Formulario de registro
const registerForm = document.getElementById('registerForm');
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regRole = document.getElementById('regRole');
const regCode = document.getElementById('regCode');
const regErrorMessage = document.getElementById('regErrorMessage');

// Botones para cambiar entre login y registro
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const registerCard = document.getElementById('registerCard');


// ============================
// CODIGOS DE CURSO VALIDOS
// ============================
// El profesor da estos codigos a sus alumnos
// Puedes cambiarlos o agregar mas
const VALID_CODES = {
    'ELECTRO2026': { curso: '3ro Medio A', year: 2026 },
    'ELECTRO4M':   { curso: '4to Medio A', year: 2026 },
    'PROFE2026':   { curso: 'Profesor',    year: 2026 },
};


// ============================
// USUARIO PROFESOR POR DEFECTO
// ============================
// Creamos un profesor de prueba si no existe
function initDefaultUsers() {
    const users = getUsers();

    // Si no hay usuarios, crear el profesor por defecto
    if (users.length === 0) {
        users.push({
            name: 'Prof. Eduardo',
            email: 'profesor@electrolearn.cl',
            password: 'admin2026',    // Cambiar en produccion!
            role: 'profesor',
            curso: 'Profesor',
            xp: 0,
            level: 'Maestro',
            badges: ['Fundador'],
            createdAt: new Date().toISOString()
        });
        saveUsers(users);
        console.log('Usuario profesor creado: profesor@electrolearn.cl / admin2026');
    }
}


// ============================
// FUNCIONES DE ALMACENAMIENTO
// ============================
// Por ahora usamos localStorage (en Paso 3 sera Firebase)

function getUsers() {
    // Lee la lista de usuarios del navegador
    const data = localStorage.getItem('electrolearn_users');
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    // Guarda la lista de usuarios en el navegador
    localStorage.setItem('electrolearn_users', JSON.stringify(users));
}

function setCurrentUser(user) {
    // Guarda el usuario actual (el que esta logueado)
    localStorage.setItem('electrolearn_current', JSON.stringify(user));
}

function getCurrentUser() {
    // Obtiene el usuario logueado
    const data = localStorage.getItem('electrolearn_current');
    return data ? JSON.parse(data) : null;
}

function logout() {
    // Cierra sesion
    localStorage.removeItem('electrolearn_current');
    window.location.href = 'index.html';
}


// ============================
// MOSTRAR ERRORES
// ============================
function showError(element, message) {
    element.textContent = message;
    element.classList.add('visible');

    // El error desaparece despues de 4 segundos
    setTimeout(() => {
        element.classList.remove('visible');
    }, 4000);
}


// ============================
// CAMBIAR ENTRE LOGIN Y REGISTRO
// ============================
if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Ocultar login, mostrar registro
        loginForm.parentElement.style.display = 'none';
        registerCard.style.display = 'block';

        // Animacion
        registerCard.style.animation = 'none';
        registerCard.offsetHeight; // Forzar re-render
        registerCard.style.animation = 'slideUp 0.6s ease';
    });
}

if (showLoginBtn) {
    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Ocultar registro, mostrar login
        registerCard.style.display = 'none';
        loginForm.parentElement.style.display = 'block';
    });
}


// ============================
// PROCESO DE LOGIN
// ============================
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();   // Evita que la pagina se recargue

        const email = loginEmail.value.trim().toLowerCase();
        const password = loginPassword.value;

        // Buscar el usuario en la "base de datos"
        const users = getUsers();
        const user = users.find(u =>
            u.email === email && u.password === password
        );

        if (user) {
            // Login exitoso!
            setCurrentUser(user);

            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Error: usuario o contrasena incorrectos
            showError(errorMessage, 'Correo o contrasena incorrectos');
            loginPassword.value = '';   // Limpiar contrasena
        }
    });
}


// ============================
// PROCESO DE REGISTRO
// ============================
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = regName.value.trim();
        const email = regEmail.value.trim().toLowerCase();
        const password = regPassword.value;
        const role = regRole.value;
        const code = regCode.value.trim().toUpperCase();

        // --- VALIDACIONES ---

        // 1. Verificar codigo del curso
        if (!VALID_CODES[code]) {
            showError(regErrorMessage, 'Codigo de curso invalido. Pidelo a tu profesor.');
            return;
        }

        // 2. Verificar que el email no exista
        const users = getUsers();
        if (users.find(u => u.email === email)) {
            showError(regErrorMessage, 'Este correo ya esta registrado.');
            return;
        }

        // 3. Verificar contrasena minima
        if (password.length < 6) {
            showError(regErrorMessage, 'La contrasena debe tener al menos 6 caracteres.');
            return;
        }

        // --- CREAR USUARIO ---
        const newUser = {
            name: name,
            email: email,
            password: password,        // En produccion NUNCA guardar asi!
            role: role,
            curso: VALID_CODES[code].curso,
            xp: 0,                     // Puntos de experiencia (gamificacion)
            level: 'Aprendiz',         // Nivel inicial
            badges: ['Novato'],        // Primera medalla
            completedQuizzes: [],      // Quizzes completados
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Login automatico despues de registrarse
        setCurrentUser(newUser);
        window.location.href = 'dashboard.html';
    });
}


// ============================
// VERIFICAR SI YA ESTA LOGUEADO
// ============================
// Si el usuario ya inicio sesion, redirigir al dashboard
function checkAuth() {
    const user = getCurrentUser();
    const currentPage = window.location.pathname.split('/').pop();

    if (user && currentPage === 'index.html') {
        // Ya esta logueado, ir al dashboard
        window.location.href = 'dashboard.html';
    }
}


// ============================
// INICIALIZACION
// ============================
// Esto se ejecuta cuando la pagina carga
initDefaultUsers();
checkAuth();
