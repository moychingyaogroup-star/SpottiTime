import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-NCuIXJCA_0Jtnd63tQm80Ja0_txxdtc",
  authDomain: "sunwayproject-4ae5a.firebaseapp.com",
  projectId: "sunwayproject-4ae5a",
  storageBucket: "sunwayproject-4ae5a.firebasestorage.app",
  messagingSenderId: "988512842099",
  appId: "1:988512842099:web:a33f2418cc081843ced506",
  measurementId: "G-FSZFL2JBWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login function
window.loginWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Logged in:", result.user);
        }).catch((error) => {
            console.error("Login error:", error);
            alert("Error logging in: " + error.message);
        });
};

// Logout function
window.logoutFromGoogle = () => {
    signOut(auth).then(() => {
        console.log("Logged out");
    }).catch((error) => {
        console.error("Logout error:", error);
    });
};

// Listen for auth state changes and dispatch event
onAuthStateChanged(auth, (user) => {
    const event = new CustomEvent('authStateChanged', { detail: { user: user } });
    window.dispatchEvent(event);
});
