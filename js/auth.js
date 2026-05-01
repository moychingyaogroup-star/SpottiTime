import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace with your app's Firebase project configuration
// To get this configuration:
// 1. Go to the Firebase Console (https://console.firebase.google.com/)
// 2. Create a new project or open an existing one
// 3. Register your web app (</> icon) to get your config object
// 4. Enable Google Authentication in Build -> Authentication -> Sign-in method
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
