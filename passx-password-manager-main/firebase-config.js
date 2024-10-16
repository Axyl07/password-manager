// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZydKBDJ1F6MtkzajWvOoCPUyi8cO-2ls",
    authDomain: "password-manager-e89ba.firebaseapp.com",
    projectId: "password-manager-e89ba",
    storageBucket: "password-manager-e89ba.appspot.com",
    messagingSenderId: "221635941232",
    appId: "1:221635941232:web:072eade0265bf08c6b75b5",
    // measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
