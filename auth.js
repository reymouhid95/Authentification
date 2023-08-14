// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMDonax4cLSlnK_f8vesFGoz7oCmc6qxU",
  authDomain: "authentification-45810.firebaseapp.com",
  databaseURL:
    "https://authentification-45810-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentification-45810",
  storageBucket: "authentification-45810.appspot.com",
  messagingSenderId: "352190920736",
  appId: "1:352190920736:web:5a525a7c783b37e8cc6445",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Éléments du formulaire
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpButton = document.getElementById("signup");
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const resetPasswordButton = document.getElementById("reset-password");

// Inscription
signUpButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log();
      ("User signed up successfully");
    })
    .catch((error) => {
      console.log();
      "Sign up error:", error.message;
    });
});

// Connexion
loginButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User logged in successfully");
      toggleButtons(true);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
});

// Déconnexion
logoutButton.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      console.log("User logged out successfully");
      toggleButtons(false);
      console.log();
      ("Logout successfully");
    })
    .catch((error) => {
      console.log();
      "Logout error:", error.message;
    });
});

// Réinitialisation du mot de passe
resetPasswordButton.addEventListener("click", () => {
  const email = emailInput.value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent");
    })
    .catch((error) => {
      console.error("Password reset error:", error.message);
    });
});

// Vérifie l'état de l'authentification à chaque chargement de page
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
    toggleButtons(true);
  } else {
    console.log("User is logged out");
    toggleButtons(false);
  }
});

// Afficher/masquer les boutons en fonction de l'état d'authentification
function toggleButtons(isLoggedIn) {
  if (isLoggedIn) {
    signUpButton.style.display = "none";
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    signUpButton.style.display = "block";
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  }
}
