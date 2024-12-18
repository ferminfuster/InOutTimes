// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Manejar el formulario de login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorContainer = document.getElementById("error-container");

  try {
    // Iniciar sesión con correo y contraseña
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Obtener el usuario actual
    const user = userCredential.user;
    
    // Obtener los datos del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (userData.rol === "user") {
        // Mostrar el alert antes de redirigir
        alert("Inicio de sesión exitoso como usuario.");
        // Redirigir a la página de dashboard de usuario
        window.location.href = "dashboard.html";
      } else if (userData.rol === "admin") {
        // Mostrar el alert antes de redirigir
        alert("Inicio de sesión exitoso como administrador.");
        // Redirigir a la página de dashboard de administrador
        window.location.href = "dashboard.html";
      } else if (userData.rol === "root") {
        // Mostrar el alert antes de redirigir
        alert("Inicio de sesión exitoso como root");
        // Redirigir a la página de dashboard de administrador
        window.location.href = "admin.html";
      } else {
        // Si el rol no está definido o no es válido, redirigir a la página principal
        alert("Rol no válido. Redirigiendo a la página principal.");
        window.location.href = "index.html";
      }
    } else {
      // Si no se encuentra el documento del usuario, redirigir a la página principal
      alert("Usuario no encontrado. Redirigiendo a la página principal.");
      window.location.href = "index.html";
    }
    
  } catch (error) {
    // Mostrar error si ocurre un fallo en la autenticación
    errorContainer.textContent = `Error: ${error.message}`;
  }
});

// Manejar recuperación de contraseña
document.getElementById("forgot-password").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = prompt("Por favor, introduce tu correo electrónico para recuperar la contraseña:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
});

