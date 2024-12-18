import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBF7gSoZD2mebyD_Kwl-sq5y1ZfErYZfrs",
  authDomain: "inouttime-25fe6.firebaseapp.com",
  projectId: "inouttime-25fe6",
  storageBucket: "inouttime-25fe6.firebasestorage.app",
  messagingSenderId: "652540896490",
  appId: "1:652540896490:web:3126fd620a097e7ab52393",
  measurementId: "G-DDB4BPZ5Z6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Obtener los datos del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Verificar si el rol del usuario es root
      if (userData.rol === "root") {
        content.style.display = "block";
        // Mostrar los datos del usuario en la página (si es necesario)
        //document.getElementById("nombreUser").textContent = userData.nombre || "No disponible";
        //document.getElementById("emailUser").textContent = userData.email || "No disponible";
        //document.getElementById("empresaUser").textContent = userData.empresa || "No disponible";
        alert("Inicio de session correcto eres 'root' tienes acceso a esta página.");
        // Mostrar los botones o elementos de administrador solo si el rol es root
        //document.getElementById("admin-buttons").style.display = "block"; // Aseguramos que los botones del admin se muestren
      } else {
        // Si el usuario no es root, redirigir al login o a una página de acceso denegado
        alert("Acceso denegado. Solo los usuarios con rol 'root' tienen acceso a esta página.");
        window.location.href = "login.html";
      }
    } else {
      console.log("No se encontraron datos para este usuario.");
      alert("Usuario no autorizado.");
      window.location.href = "login.html";
    }
  } else {
    // Si no hay un usuario logueado, redirigir al login
    alert("Usuario no autorizado.");
    window.location.href = "login.html";
  }
});

// Función para cerrar sesión
function LogOut() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

// Asignar la función al objeto window para que sea accesible globalmente
window.LogOut = LogOut;


// Funciones para modales y gestión

// Función para abrir modal de empresa
function abrirModalEmpresa() {
  const modal = document.getElementById('modalCrearEmpresa');
  if (modal) {
      modal.style.display = 'block';
  } else {
      console.error('Modal de crear empresa no encontrado');
  }
}

// Función para abrir modal de usuario
function abrirModalUsuario() {
  const modal = document.getElementById('modalCrearUsuario');
  if (modal) {
      modal.style.display = 'block';
  } else {
      console.error('Modal de crear usuario no encontrado');
  }
}

// Función para cerrar modal
function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.style.display = 'none';
  } else {
      console.error(`Modal ${modalId} no encontrado`);
  }
}

// Función para crear empresa
function crearEmpresa(event) {
  event.preventDefault();
  
  // Recoger datos del formulario
  const nombreEmpresa = document.getElementById('nombreEmpresa').value;
  const cifEmpresa = document.getElementById('cifEmpresa').value;
  const direccionEmpresa = document.getElementById('direccionEmpresa').value;
  const telefonoEmpresa = document.getElementById('telefonoEmpresa').value;

  // Aquí iría la lógica para enviar los datos al backend
  console.log('Crear Empresa:', {
      nombre: nombreEmpresa,
      cif: cifEmpresa,
      direccion: direccionEmpresa,
      telefono: telefonoEmpresa
  });

  // Cerrar modal
  cerrarModal('modalCrearEmpresa');
}

// Funciones adicionales de gestión
function gestionarUsuarios() {
  alert('Funcionalidad de gestión de usuarios pendiente de implementar');
}

function verInformesAdmin() {
  alert('Funcionalidad de informes administrativos pendiente de implementar');
}

// Hacer funciones globales INMEDIATAMENTE DESPUÉS DE DEFINIRLAS
window.abrirModalEmpresa = abrirModalEmpresa;
window.abrirModalUsuario = abrirModalUsuario;
window.cerrarModal = cerrarModal;
window.crearEmpresa = crearEmpresa;
window.gestionarUsuarios = gestionarUsuarios;
window.verInformesAdmin = verInformesAdmin;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Añadir event listeners a los formularios
  const formEmpresa = document.getElementById('formCrearEmpresa');
  if (formEmpresa) {
      formEmpresa.addEventListener('submit', crearEmpresa);
  }
});