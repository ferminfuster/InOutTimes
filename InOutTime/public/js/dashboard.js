import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";


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

      // Mostrar los datos del usuario en la página
      document.getElementById("nombreUser").textContent = userData.nombre || "No disponible";
      document.getElementById("emailUser").textContent = userData.email || "No disponible";
      document.getElementById("empresaUser").textContent = userData.empresa || "No disponible";

      // Mostrar u ocultar elementos según el rol
      if (userData.rol === "admin") {
        // Mostrar los botones solo para administradores
        document.getElementById("admin-buttons").style.display = "block";  // Aseguramos que los botones del admin se muestren
      } else {
        // Ocultar los botones de administrador para los usuarios comunes
        document.getElementById("admin-buttons").style.display = "none";
      }
    } else {
      console.log("No se encontraron datos para este usuario.");
      alert("Usuario no autorizado.");
      window.location.href = "login.html";
    }
  } else {
    // Si no hay un usuario logueado, redirigir al login y mostrar una alerta
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

// Funciones para botones de administración
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const dni = document.getElementById("dni").value;
  const empresa = document.getElementById("empresa").value;

  // Crear un nuevo documento en Firestore
  setDoc(doc(db, "usuarios", dni), {
    nombre: nombre,
    apellidos: apellidos,
    dni: dni,
    empresa: empresa,
    rol: "user", // O "admin" dependiendo de la selección
    activo: true
  }).then(() => {
    alert("Usuario creado exitosamente");
    cerrarModal();
  }).catch((error) => {
    console.error("Error al crear usuario:", error);
  });
}


export function eliminarUsuario() {
  alert("Eliminar usuario.");
}

function resetearUsuario() {
  alert("Resetear contraseña de usuario.");
}

function verInformes() {
  alert("Ver informes globales.");
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("modalCrearUsuario").style.display = "none";
}

// Asignar la función al objeto window para que sea accesible globalmente
window.crearUsuario = crearUsuario;